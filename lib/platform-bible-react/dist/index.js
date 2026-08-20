var Vi = Object.defineProperty;
var Li = (t, e, r) => e in t ? Vi(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var Wt = (t, e, r) => Li(t, typeof e != "symbol" ? e + "" : e, r);
import { c as v, g as Me, a as Ua, C as ze, A as pe, P as Pe, b as rr, B as Y, d as Ve, e as Le, f as Be, h as Te, i as Bi, k as ji, j as Fi, E as Ui, l as Ka, r as ye, m as Ki, n as wn, o as ta, p as ea, L as zt, R as qa, q as Gr, D as Ca, s as Ea, t as Ta, u as Sa, T as un, v as Lr, w as Bt, x as Ga, y as jt, z as Ft, F as Ut, G as pn, H as Ha, I as Qe, J as Nr, K as je, M as Fe, N as Ue, S as Cr, O as sr, Q as qi, U as Sr, V as er, W as $e, Z as ar, X as Oe, Y as cr, _ as Ya, $ as Wa, a0 as Hr, a1 as Xa, a2 as hn, a3 as Gi, a4 as Hi, a5 as Yi, a6 as za, a7 as gn, a8 as ra, a9 as fn, aa as Wi, ab as Xi, ac as Ji, ad as Zi, ae as mn, af as Qi, ag as ca, ah as yo, ai as la, aj as ts, ak as es, al as rs, am as as, an as os, ao as zr, ap as Ja, aq as ns, ar as is } from "./resizable-igqVCae1.js";
import { as as cg, at as lg, au as dg, av as wg, aw as ug, ax as pg, ay as hg, az as gg, aA as fg, aB as mg, aC as vg, aD as bg, aE as xg, aF as yg, aG as kg, aH as _g, aI as Ng, aJ as Cg, aK as Eg, aL as Tg, aM as Sg, aN as zg, aO as Rg, aP as Dg, aQ as Mg } from "./resizable-igqVCae1.js";
import { jsx as a, jsxs as u, Fragment as lt } from "react/jsx-runtime";
import { Canon as vt } from "@sillsdev/scripture";
import { Check as Ie, Clock as ko, ChevronsLeft as _o, ChevronsRight as No, ChevronLeft as Ra, ChevronRight as Da, ArrowLeft as ss, ArrowRight as cs, ChevronDown as wr, BoldIcon as ls, ItalicIcon as ds, X as Za, AtSign as vn, Pencil as ws, Trash2 as us, ArrowUp as bn, MoreHorizontal as ps, MailOpen as hs, Mail as gs, ChevronUp as fs, FilterIcon as ms, ArrowLeftIcon as vs, ChevronLeftIcon as bs, ChevronRightIcon as xs, ArrowRightIcon as ys, Copy as xn, Filter as ks, User as _s, Link as Ns, CircleHelp as Cs, Undo as Es, Redo as Ts, SquareX as yn, FunctionSquare as kn, SquareSigma as _n, Ban as Ss, AlertCircle as Ma, CircleCheckIcon as zs, CircleXIcon as Rs, CircleHelpIcon as Ds, ArrowUpIcon as Ms, ArrowDownIcon as Os, ScrollText as $s, ChevronsUpDown as Is, MenuIcon as As, Menu as Ps, EllipsisVertical as Vs, MoreVertical as Ls } from "lucide-react";
import { Section as ut, getChaptersForBook as Bs, formatScrRef as Ce, getSectionForBook as yr, formatRelativeDate as js, formatReplacementString as tr, sanitizeHtml as Qa, NumberFormat as Nn, formatBytes as Fs, getCurrentLocale as Us, usfmMarkers as Br, getFormatCallerFunction as Ks, deepEqual as qs, isString as Co, compareScrRefs as Oa, scrRefToBBBCCCVVV as da, defaultScrRef as wa, formatScrRefRange as Gs, getLocalizeKeyForScrollGroupId as Eo, formatReplacementStringToArray as To, collectUsjMarkers as Hs } from "platform-bible-utils";
import Jt, { useRef as K, useMemo as I, useState as N, useCallback as L, useEffect as G, useImperativeHandle as Ys, useLayoutEffect as ne, createContext as to, useContext as Cn, Component as Ws, createElement as So, Suspense as Xs, forwardRef as En, useId as zo, Fragment as aa } from "react";
import { IconSelector as Tn, IconCheck as oa, IconChevronDown as Js, IconChevronUp as Zs, IconLayoutSidebar as Qs, IconLayoutSidebarRight as tc, IconChevronRight as Sn, IconSearch as ec, IconLoader as rc, IconAlertOctagon as ac, IconAlertTriangle as oc, IconInfoCircle as nc, IconCircleCheck as ic } from "@tabler/icons-react";
import { createEditor as zn, $getRoot as Ae, $createParagraphNode as Rr, $getSelection as ee, HISTORY_MERGE_TAG as eo, ParagraphNode as Rn, TextNode as Dn, $getPreviousSelection as sc, $isRangeSelection as be, $caretFromPoint as cc, $getSiblingCaret as Mn, $getChildCaret as lc, $getAdjacentChildCaret as dc, $isChildCaret as wc, $normalizeCaret as uc, $setSelectionFromCaretRange as pc, $getCollapsedCaretRange as hc, $getCaretInDirection as Ro, $splitAtPointCaretNext as gc, $isTextPointCaret as fc, $findMatchingParent as On, $isElementNode as Er, mergeRegister as Se, getDOMTextNode as mc, isHTMLElement as vc, CLEAR_EDITOR_COMMAND as $n, COMMAND_PRIORITY_EDITOR as ro, shallowMergeConfig as bc, defineExtension as se, safeCast as or, createState as xc, FORMAT_TEXT_COMMAND as In, $isNodeSelection as An, COMMAND_PRIORITY_LOW as Pn, RootNode as yc, LineBreakNode as kc, TabNode as _c, $isEditorState as Nc, createCommand as Cc, CLICK_COMMAND as Ec, isDOMNode as Tc, $getNodeFromDOMNode as Sc, $createNodeSelection as zc, $setSelection as Rc, $getEditor as Dc, DecoratorNode as $a, $getState as Mc, toggleTextFormatType as Do, TEXT_TYPE_TO_FORMAT as Oc, $setState as $c, addClassNamesToElement as Vn, $create as Ic, $getNodeByKey as Ac, removeClassNamesFromElement as Pc, KEY_TAB_COMMAND as Vc, $isBlockElementNode as Lc, $createRangeSelection as Bc, $normalizeSelection__EXPERIMENTAL as jc, OUTDENT_CONTENT_COMMAND as Fc, INDENT_CONTENT_COMMAND as Mo, INSERT_TAB_COMMAND as Uc, COMMAND_PRIORITY_CRITICAL as ao, $isDecoratorNode as Kc, $isParagraphNode as qc, $isTextNode as Ia, SELECTION_CHANGE_COMMAND as Ln, $insertNodes as Gc } from "lexical";
import { HeadingNode as Hc, QuoteNode as Yc, registerRichText as Wc } from "@lexical/rich-text";
import { flushSync as Xc, createPortal as Jc } from "react-dom";
import { $isTableSelection as Zc } from "@lexical/table";
import { createHeadlessEditor as Bn } from "@lexical/headless";
import { $generateHtmlFromNodes as Qc, $generateNodesFromDOM as tl } from "@lexical/html";
import { Avatar as oo, Select as Zt, Checkbox as Oo, Slot as Dr, Tabs as he, Menubar as ke, ContextMenu as At, Progress as $o, Slider as Or, Switch as Io } from "radix-ui";
import { useReactTable as jn, getFilteredRowModel as el, getSortedRowModel as Fn, getPaginationRowModel as rl, getCoreRowModel as Un, flexRender as kr, getGroupedRowModel as al, getExpandedRowModel as ol } from "@tanstack/react-table";
import nl from "markdown-to-jsx";
import { filterAndRankItems as Ao, GENERATOR_NOTE_CALLER as Aa, HIDDEN_NOTE_CALLER as Pa, getDefaultViewOptions as il, isInsertEmbedOpOfType as $r, getMarkerMenuItems as sl, defaultStyleInfo as cl, Editorial as ll } from "@eten-tech-foundation/platform-editor";
import { cva as no } from "class-variance-authority";
import { useHotkeys as dl } from "react-hotkeys-hook";
import { Drawer as Ke } from "vaul";
import { useTheme as wl } from "next-themes";
import { Toaster as ul } from "sonner";
import { toast as $g } from "sonner";
function rp({ className: t, ...e }) {
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
function Kn({
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
  const p = K(!1), h = () => {
    w || (p.current || o == null || o(e), setTimeout(() => {
      p.current = !1;
    }, 100));
  }, g = (m) => {
    if (w) {
      m.preventDefault();
      return;
    }
    p.current = !0, n ? n(m) : o == null || o(e);
  }, f = I(
    () => Me(e, l),
    [e, l]
  ), x = I(
    () => Ua(e, l),
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
        ze,
        {
          ref: t,
          value: d || `${e} ${vt.bookIdToEnglishName(e)}`,
          onSelect: h,
          onMouseDown: g,
          role: "option",
          "aria-selected": r,
          "aria-disabled": w || void 0,
          "aria-label": `${vt.bookIdToEnglishName(e)} (${e.toLocaleUpperCase()})`,
          disabled: w,
          className: v(s, w && "tw:cursor-not-allowed tw:opacity-50"),
          children: [
            c && /* @__PURE__ */ a(
              Ie,
              {
                className: v(
                  "tw:me-2 tw:h-4 tw:w-4 tw:shrink-0",
                  r ? "tw:opacity-100" : "tw:opacity-0"
                )
              }
            ),
            /* @__PURE__ */ a("span", { className: "tw:min-w-0 tw:flex-1", children: f }),
            /* @__PURE__ */ a("span", { className: "tw:ms-2 tw:shrink-0 tw:text-xs tw:text-muted-foreground", children: x })
          ]
        }
      )
    }
  );
}
function qn(t, e, r) {
  return `${t} ${pe[t]}${e ? ` ${Ua(t, e)} ${Me(t, e)}` : ""}`;
}
function pl({
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
  const [h, g] = N(!1), f = w !== void 0, x = f ? w : h, m = (T) => {
    f || g(T), p == null || p(T);
  };
  if (t.length === 0)
    return;
  const E = (T) => {
    e(T), m(!1);
  };
  return /* @__PURE__ */ u(Pe, { open: x, onOpenChange: m, children: [
    /* @__PURE__ */ a(rr, { asChild: !0, children: /* @__PURE__ */ a(
      Y,
      {
        variant: d,
        size: "icon",
        className: l,
        "aria-label": n,
        children: /* @__PURE__ */ a(ko, { className: "tw:h-4 tw:w-4" })
      }
    ) }),
    /* @__PURE__ */ a(Ve, { id: s, className: "tw:w-[300px] tw:p-0", align: "start", children: /* @__PURE__ */ a(Le, { children: /* @__PURE__ */ a(Be, { children: /* @__PURE__ */ a(Te, { heading: i, children: t.map((T) => /* @__PURE__ */ u(
      ze,
      {
        onSelect: () => E(T),
        className: v("tw:flex tw:items-center", c),
        children: [
          /* @__PURE__ */ a(ko, { className: "tw:mr-2 tw:h-4 tw:w-4 tw:opacity-50" }),
          /* @__PURE__ */ a("span", { children: r(T) })
        ]
      },
      o(T)
    )) }) }) }) })
  ] });
}
function ap(t, e, r = (n, i) => n === i, o = 15) {
  return (n) => {
    const i = t.filter(
      (c) => !r(c, n)
    ), s = [n, ...i.slice(0, o - 1)];
    e(s);
  };
}
function Ir(t, e) {
  return !e || e.book === t.book && e.chapterNum === t.chapterNum && e.verseNum === t.verseNum;
}
function hl(t, e, r, o) {
  const n = I(
    () => Bi(t, e),
    [t, e]
  ), i = I(
    () => ji(t, e),
    [t, e]
  ), s = I(
    () => Fi(t, e),
    [t, e]
  ), c = I(
    () => Ui(t, e),
    [t, e]
  ), l = L(
    (d) => {
      d && o(d);
    },
    [o]
  );
  return I(() => [
    {
      onClick: () => l(n),
      disabled: Ir(t, n),
      title: "Previous chapter",
      icon: r === "ltr" ? _o : No
    },
    {
      onClick: () => l(s),
      disabled: Ir(t, s),
      title: "Previous verse",
      icon: r === "ltr" ? Ra : Da
    },
    {
      onClick: () => l(c),
      disabled: Ir(t, c),
      title: "Next verse",
      icon: r === "ltr" ? Da : Ra
    },
    {
      onClick: () => l(i),
      disabled: Ir(t, i),
      title: "Next chapter",
      icon: r === "ltr" ? No : _o
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
const jr = {
  // Matches start of string (`^`), one or more non-colon/space words, optionally followed by space and more words (`([^:\s]+(?:\s+[^:\s]+)*)`), end of string (`$`), case-insensitive (`i`)
  BOOK_ONLY: /^([^:\s]+(?:\s+[^:\s]+)*)$/i,
  // Same as above, but followed by a space and a chapter number (`\s+(\d+)`)
  BOOK_CHAPTER: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,
  // Same as above, but followed by a colon and optionally a verse number (`:(\d*)`)
  BOOK_CHAPTER_VERSE: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i
}, gl = [
  jr.BOOK_ONLY,
  jr.BOOK_CHAPTER,
  jr.BOOK_CHAPTER_VERSE
];
function fl(t) {
  return jr.BOOK_CHAPTER_VERSE.test(t.trim());
}
function Po(t, e) {
  return vt.bookIdToNumber(t) < vt.bookIdToNumber(e.book);
}
function ml(t, e, r) {
  const o = vt.bookIdToNumber(t) - vt.bookIdToNumber(r.book);
  return o < 0 ? !0 : o > 0 ? !1 : e < r.chapterNum;
}
function ua(t, e, r, o) {
  const n = vt.bookIdToNumber(t) - vt.bookIdToNumber(o.book);
  return n < 0 ? !0 : n > 0 ? !1 : e < o.chapterNum ? !0 : e > o.chapterNum ? !1 : r < o.verseNum;
}
function Vo(t) {
  const e = /^[a-zA-Z]$/.test(t), r = /^[0-9]$/.test(t);
  return { isLetter: e, isDigit: r };
}
function lr(t) {
  return Bs(vt.bookIdToNumber(t));
}
function vl(t, e, r) {
  if (!t.trim() || e.length === 0) return;
  const o = gl.reduce(
    (n, i) => {
      if (n) return n;
      const s = i.exec(t.trim());
      if (s) {
        const [c, l = void 0, d = void 0] = s.slice(1);
        let w;
        const p = e.filter((h) => Ka(h, c, r));
        if (p.length === 1 && ([w] = p), !w && l) {
          if (vt.isBookIdValid(c)) {
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
          const g = ((f) => Object.keys(pe).find(
            (x) => pe[x].toLowerCase() === f.toLowerCase()
          ))(c);
          if (g && e.includes(g) && (w = g), !w && r) {
            const f = Array.from(r.entries()).find(
              ([, x]) => x.localizedName.toLowerCase() === c.toLowerCase()
            );
            f && e.includes(f[0]) && ([w] = f);
          }
        }
        if (w) {
          let h = l ? parseInt(l, 10) : void 0;
          h && h > lr(w) && (h = Math.max(lr(w), 1));
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
function Gn({
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
    return /* @__PURE__ */ a(Te, { children: /* @__PURE__ */ a("div", { className: v("tw:grid tw:grid-cols-6 tw:gap-1", c), children: Array.from({ length: t }, (l, d) => d + 1).map((l) => {
      const d = (n == null ? void 0 : n(l)) ?? !1;
      return /* @__PURE__ */ a(
        ze,
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
function Lo({
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
      Gn,
      {
        count: lr(t),
        valueBuilder: (c) => `${t} ${pe[t] || ""} ${c}`,
        onSelect: r,
        itemRef: o,
        isDisabled: i,
        isDimmed: n,
        isSelected: (c) => t === e.book && c === e.chapterNum,
        className: s
      }
    );
}
function Bo({
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
      Gn,
      {
        count: r,
        valueBuilder: (d) => `${t} ${pe[t] || ""} ${e}:${d}`,
        onSelect: n,
        itemRef: i,
        isDisabled: c,
        isDimmed: s,
        isSelected: (d) => t === o.book && e === o.chapterNum && d === o.verseNum,
        className: l
      }
    );
}
function pa({
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
  onOpenChange: x,
  onCloseAutoFocus: m,
  modal: E = !1,
  align: T = "center",
  ref: k,
  disabled: z
}) {
  const F = ye(), [D, $] = N(!1), [P, S] = N(""), [V, W] = N(""), [_, rt] = N("books"), [U, Z] = N(void 0), [M, O] = N(
    void 0
  ), [J, ot] = N(void 0), [Pt, Ot] = N(!1), Kt = K(null), H = K(!1), nt = K(void 0), pt = K(void 0), st = K(void 0), gt = K(void 0), qt = K({}), Ct = K({}), bt = L(
    (y) => {
      e(y), c && c(y);
    },
    [e, c]
  ), xt = I(() => o ? o() : Ki, [o]), Gt = I(() => ({
    [ut.OT]: xt.filter((X) => vt.isBookOT(X)),
    [ut.NT]: xt.filter((X) => vt.isBookNT(X)),
    [ut.DC]: xt.filter((X) => vt.isBookDC(X)),
    [ut.Extra]: xt.filter((X) => vt.extraBooks().includes(X))
  }), [xt]), yt = I(() => Object.values(Gt).flat(), [Gt]), Vt = I(() => {
    if (!V.trim()) return Gt;
    const y = {
      [ut.OT]: [],
      [ut.NT]: [],
      [ut.DC]: [],
      [ut.Extra]: []
    };
    return [ut.OT, ut.NT, ut.DC, ut.Extra].forEach((it) => {
      y[it] = Gt[it].filter((Lt) => Ka(Lt, V, n));
    }), y;
  }, [Gt, V, n]), R = I(
    () => vl(V, yt, n),
    [V, yt, n]
  ), kt = K(!1);
  G(() => {
    if (!kt.current) {
      kt.current = !0;
      return;
    }
    x == null || x(D);
  }, [D, x]);
  const _t = L(() => {
    if (R) {
      const y = R.chapterNum ?? 1, X = R.verseNum ?? 1;
      if (w && ua(R.book, y, X, w))
        return;
      bt({
        book: R.book,
        chapterNum: y,
        verseNum: X
      }), $(!1), W(""), S("");
    }
  }, [bt, R, w]), re = L(
    (y) => {
      const X = M ?? (R == null ? void 0 : R.book), it = J ?? (R == null ? void 0 : R.chapterNum);
      !X || !it || (bt({
        book: X,
        chapterNum: it,
        verseNum: y
      }), $(!1));
    },
    [bt, M, J, R]
  ), qe = L(
    (y) => {
      if (w && Po(y, w)) return;
      if (lr(y) <= 1) {
        bt({
          book: y,
          chapterNum: 1,
          verseNum: 1
        }), $(!1), W("");
        return;
      }
      Z(y), rt("chapters");
    },
    [bt, w]
  ), ce = L(
    (y) => {
      const X = _ === "chapters" ? U : R == null ? void 0 : R.book;
      if (X) {
        if (d && d(X, y) > 1) {
          O(X), ot(y), rt("verses"), S("");
          return;
        }
        bt({
          book: X,
          chapterNum: y,
          verseNum: 1
        }), $(!1);
      }
    },
    [bt, _, U, R, d]
  ), le = L(
    (y) => {
      bt(y), $(!1), W("");
    },
    [bt]
  ), Ge = hl(t, yt, F, e), Et = L(() => {
    rt("books"), Z(void 0), O(void 0), ot(void 0), setTimeout(() => {
      pt.current && pt.current.focus();
    }, 0);
  }, []), ae = L(() => {
    const y = M;
    O(void 0), ot(void 0), y ? (Z(y), rt("chapters"), S("")) : Et();
  }, [M, Et]), Rt = L((y) => {
    $(y), y && (rt("books"), Z(void 0), O(void 0), ot(void 0), W(""));
  }, []);
  G(() => {
    z && Rt(!1);
  }, [z, Rt]);
  const [Dt, Ht] = N(0);
  G(() => {
    var y;
    Dt !== 0 && ((y = pt.current) == null || y.focus());
  }, [Dt]), Ys(
    k,
    () => ({
      open: () => {
        z || (Rt(!0), Ht((y) => y + 1));
      }
    }),
    [Rt, z]
  );
  const { otLong: oe, ntLong: Qt, dcLong: ge, extraLong: C } = {
    otLong: i == null ? void 0 : i["%scripture_section_ot_long%"],
    ntLong: i == null ? void 0 : i["%scripture_section_nt_long%"],
    dcLong: i == null ? void 0 : i["%scripture_section_dc_long%"],
    extraLong: i == null ? void 0 : i["%scripture_section_extra_long%"]
  }, B = L(
    (y) => wn(y, oe, Qt, ge, C),
    [oe, Qt, ge, C]
  ), tt = L(
    (y) => R ? !!R.chapterNum && !y.toString().includes(R.chapterNum.toString()) : !1,
    [R]
  ), q = I(
    () => Ce(
      t,
      n ? Me(t.book, n) : "English"
    ),
    [t, n]
  ), b = L((y) => (X) => {
    qt.current[y] = X;
  }, []), Q = L((y) => (X) => {
    Ct.current[y] = X;
  }, []), j = I(
    () => fl(V),
    [V]
  ), at = I(() => !d || !R || !R.chapterNum || !j ? !1 : d(R.book, R.chapterNum) > 0, [d, R, j]), dt = L(
    (y) => w ? Po(y, w) : !1,
    [w]
  ), ht = L(
    (y) => (X) => w ? ml(y, X, w) : !1,
    [w]
  ), ft = L(
    (y, X) => (it) => w ? ua(y, X, it, w) : !1,
    [w]
  ), Nt = (i == null ? void 0 : i["%webView_bookChapterControl_selectChapter%"]) ?? "Select Chapter", $t = (i == null ? void 0 : i["%webView_bookChapterControl_selectVerse%"]) ?? "Select Verse", He = L(
    (y) => {
      (y.key === "Home" || y.key === "End") && y.stopPropagation(), p && p.includes(y.key) && R && R.chapterNum !== void 0 && R.verseNum !== void 0 && (y.preventDefault(), y.stopPropagation(), _t());
    },
    [p, R, _t]
  ), de = L(
    (y) => {
      var Ne, Re, We;
      if (y.ctrlKey) return;
      const { isLetter: X, isDigit: it } = Vo(y.key);
      if ((_ === "chapters" || _ === "verses") && (y.key === " " || y.key === "Enter")) {
        const Mt = y.target instanceof HTMLElement ? y.target : void 0;
        if (!!(Mt != null && Mt.closest(
          'button, a, input, select, textarea, [role="button"]'
        ))) {
          y.stopPropagation();
          return;
        }
        const St = (Ne = nt.current) == null ? void 0 : Ne.querySelector(
          '[cmdk-item][data-selected="true"]:not([data-disabled="true"])'
        );
        if (St) {
          y.preventDefault(), y.stopPropagation(), St.click();
          return;
        }
      }
      if ((_ === "chapters" || _ === "verses") && (X || it)) {
        y.preventDefault(), y.stopPropagation();
        return;
      }
      if (_ === "chapters" && y.key === "Backspace") {
        y.preventDefault(), y.stopPropagation(), Et();
        return;
      }
      if (_ === "verses" && y.key === "Backspace") {
        y.preventDefault(), y.stopPropagation(), ae();
        return;
      }
      const Lt = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(y.key);
      if (_ === "verses" && Lt) {
        const Mt = M, Tt = J;
        if (!Mt || !Tt || !d) return;
        const St = d(Mt, Tt);
        if (!St) return;
        (Re = nt.current) == null || Re.focus();
        const mt = (() => {
          if (!P) return 1;
          const Xe = P.match(/:(\d+)$/);
          return Xe ? parseInt(Xe[1], 10) : 0;
        })();
        let Yt = mt;
        const fe = 6;
        switch (y.key) {
          case "ArrowLeft":
            mt !== 0 && (Yt = mt > 1 ? mt - 1 : St);
            break;
          case "ArrowRight":
            mt !== 0 && (Yt = mt < St ? mt + 1 : 1);
            break;
          case "ArrowUp":
            Yt = mt === 0 ? St : Math.max(1, mt - fe);
            break;
          case "ArrowDown":
            Yt = mt === 0 ? 1 : Math.min(St, mt + fe);
            break;
          default:
            return;
        }
        Yt !== mt && (y.preventDefault(), y.stopPropagation(), S(
          `${Mt} ${pe[Mt] || ""} ${Tt}:${Yt}`
        ), setTimeout(() => {
          const Xe = Ct.current[Yt];
          Xe && Xe.scrollIntoView({ block: "nearest", behavior: "smooth" });
        }, 0));
        return;
      }
      if ((_ === "chapters" || _ === "books" && R) && Lt) {
        const Mt = _ === "chapters" ? U : R == null ? void 0 : R.book;
        if (!Mt) return;
        _ === "chapters" && ((We = nt.current) == null || We.focus());
        const Tt = (() => {
          if (!P) return 1;
          const fe = P.match(/(\d+)$/);
          return fe ? parseInt(fe[1], 10) : 0;
        })(), St = lr(Mt);
        if (!St) return;
        let mt = Tt;
        const Yt = 6;
        switch (y.key) {
          case "ArrowLeft":
            Tt !== 0 && (mt = Tt > 1 ? Tt - 1 : St);
            break;
          case "ArrowRight":
            Tt !== 0 && (mt = Tt < St ? Tt + 1 : 1);
            break;
          case "ArrowUp":
            mt = Tt === 0 ? St : Math.max(1, Tt - Yt);
            break;
          case "ArrowDown":
            mt = Tt === 0 ? 1 : Math.min(St, Tt + Yt);
            break;
          default:
            return;
        }
        mt !== Tt && (y.preventDefault(), y.stopPropagation(), S(
          `${Mt} ${pe[Mt] || ""} ${mt}`
        ), setTimeout(() => {
          const fe = qt.current[mt];
          fe && fe.scrollIntoView({ block: "nearest", behavior: "smooth" });
        }, 0));
      }
    },
    [
      _,
      R,
      Et,
      ae,
      U,
      M,
      J,
      d,
      P
    ]
  ), Ye = L((y) => {
    var Lt;
    if (y.shiftKey || y.key === "Tab" || y.key === " ") return;
    if (y.key === "Enter") {
      y.stopPropagation();
      return;
    }
    if (y.key === "ArrowUp" || y.key === "ArrowDown") {
      (Lt = pt.current) == null || Lt.focus();
      return;
    }
    const { isLetter: X, isDigit: it } = Vo(y.key);
    (X || it) && (y.preventDefault(), W((Ne) => Ne + y.key), pt.current.focus(), Ot(!1));
  }, []);
  return ne(() => {
    const y = setTimeout(() => {
      if (D && _ === "books" && st.current && gt.current) {
        const X = st.current, it = gt.current, Lt = it.offsetTop, Ne = X.clientHeight, Re = it.clientHeight, We = Lt - Ne / 2 + Re / 2;
        X.scrollTo({
          top: Math.max(0, We),
          behavior: "smooth"
        }), S(qn(t.book));
      }
    }, 0);
    return () => {
      clearTimeout(y);
    };
  }, [D, _, V, R, t.book]), ne(() => {
    if (_ === "chapters" && U) {
      const y = U === t.book, X = y ? t.chapterNum : 1;
      S(
        `${U} ${pe[U] || ""} ${X}`
      ), setTimeout(() => {
        if (st.current)
          if (y) {
            const it = qt.current[t.chapterNum];
            it && it.scrollIntoView({ block: "center", behavior: "smooth" });
          } else
            st.current.scrollTo({ top: 0 });
        nt.current && nt.current.focus();
      }, 0);
    }
  }, [_, U, R, t.book, t.chapterNum]), ne(() => {
    if (_ === "verses" && M && J !== void 0) {
      const y = M === t.book && J === t.chapterNum, X = y ? t.verseNum : 1;
      S(
        `${M} ${pe[M] || ""} ${J}:${X}`
      ), setTimeout(() => {
        if (st.current)
          if (y) {
            const it = Ct.current[t.verseNum];
            it && it.scrollIntoView({ block: "center", behavior: "smooth" });
          } else
            st.current.scrollTo({ top: 0 });
        nt.current && nt.current.focus();
      }, 0);
    }
  }, [
    _,
    M,
    J,
    t.book,
    t.chapterNum,
    t.verseNum
  ]), /* @__PURE__ */ u(Pe, { open: D, onOpenChange: Rt, modal: E, children: [
    /* @__PURE__ */ a(rr, { asChild: !0, children: /* @__PURE__ */ u(
      Y,
      {
        ref: Kt,
        "aria-label": "book-chapter-trigger",
        variant: g,
        role: "combobox",
        "aria-expanded": D,
        disabled: z,
        className: v(
          "tw:h-8 tw:w-full tw:min-w-16 tw:max-w-48 tw:overflow-hidden tw:px-1",
          r
        ),
        onClick: (y) => {
          H.current && (H.current = !1, y.preventDefault());
        },
        children: [
          h ?? /* @__PURE__ */ a("span", { className: "tw:truncate", children: q }),
          f && /* @__PURE__ */ a(
            Tn,
            {
              "data-testid": "book-chapter-control-chevron",
              className: "tw:ms-2 tw:size-4 tw:shrink-0 tw:opacity-50"
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ a(
      Ve,
      {
        id: l,
        forceMount: !0,
        className: "tw:w-[280px] tw:p-0",
        align: T,
        onKeyDownCapture: de,
        onKeyDown: (y) => y.stopPropagation(),
        onPointerDownOutside: (y) => {
          const { target: X } = y;
          D && Kt.current && X instanceof Node && Kt.current.contains(X) && (H.current = !0, Rt(!1));
        },
        onCloseAutoFocus: m,
        children: /* @__PURE__ */ u(
          Le,
          {
            ref: nt,
            loop: !0,
            value: P,
            onValueChange: S,
            shouldFilter: !1,
            children: [
              _ === "books" ? /* @__PURE__ */ u("div", { className: "tw:flex tw:items-end", children: [
                /* @__PURE__ */ u("div", { className: "tw:relative tw:flex-1", children: [
                  /* @__PURE__ */ a(
                    ta,
                    {
                      ref: pt,
                      value: V,
                      onValueChange: W,
                      onKeyDown: He,
                      onFocus: () => Ot(!1),
                      className: s && s.length > 0 ? "tw:!pr-10" : "",
                      spaceSelectsHighlightedItem: !0
                    }
                  ),
                  s && s.length > 0 && /* @__PURE__ */ a(
                    pl,
                    {
                      recentSearches: s,
                      onSearchItemSelect: le,
                      renderItem: (y) => Ce(y, "English"),
                      getItemKey: (y) => `${y.book}-${y.chapterNum}-${y.verseNum}`,
                      ariaLabel: i == null ? void 0 : i["%history_recentSearches_ariaLabel%"],
                      groupHeading: i == null ? void 0 : i["%history_recent%"]
                    }
                  )
                ] }),
                /* @__PURE__ */ a("div", { className: "tw:flex tw:items-center tw:gap-1 tw:border-b tw:pe-2", children: Ge.map(
                  ({ onClick: y, disabled: X, title: it, icon: Lt }) => /* @__PURE__ */ a(
                    Y,
                    {
                      variant: "ghost",
                      size: "sm",
                      onClick: () => {
                        Ot(!0), y();
                      },
                      disabled: X,
                      className: "tw:h-10 tw:w-4 tw:p-0",
                      title: it,
                      onKeyDown: Ye,
                      children: /* @__PURE__ */ a(Lt, {})
                    },
                    it
                  )
                ) })
              ] }) : /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:border-b tw:px-3 tw:py-2", children: [
                /* @__PURE__ */ a(
                  Y,
                  {
                    variant: "ghost",
                    size: "sm",
                    onClick: _ === "verses" ? ae : Et,
                    className: "tw:mr-2 tw:h-6 tw:w-6 tw:p-0",
                    tabIndex: -1,
                    children: F === "ltr" ? /* @__PURE__ */ a(ss, { className: "tw:h-4 tw:w-4" }) : /* @__PURE__ */ a(cs, { className: "tw:h-4 tw:w-4" })
                  }
                ),
                _ === "chapters" && U && /* @__PURE__ */ a("span", { tabIndex: -1, className: "tw:text-sm tw:font-medium", children: Me(U, n) }),
                _ === "verses" && M && J !== void 0 && /* @__PURE__ */ a("span", { tabIndex: -1, className: "tw:text-sm tw:font-medium", children: `${Me(M, n)} ${J}` }),
                /* @__PURE__ */ a(
                  "span",
                  {
                    tabIndex: -1,
                    className: "tw:ms-auto tw:text-sm tw:font-medium tw:text-muted-foreground",
                    children: _ === "verses" ? $t : Nt
                  }
                )
              ] }),
              !Pt && /* @__PURE__ */ u(Be, { ref: st, children: [
                _ === "books" && /* @__PURE__ */ u(lt, { children: [
                  !R && Object.entries(Vt).map(([y, X]) => {
                    if (X.length !== 0)
                      return (
                        // We are mapping over filteredBooksByType, which uses Section as key type
                        // eslint-disable-next-line no-type-assertion/no-type-assertion
                        /* @__PURE__ */ a(Te, { heading: B(y), children: X.map((it) => /* @__PURE__ */ a(
                          Kn,
                          {
                            bookId: it,
                            onSelect: (Lt) => qe(Lt),
                            section: yr(it),
                            commandValue: `${it} ${pe[it]}`,
                            ref: it === t.book ? gt : void 0,
                            localizedBookNames: n,
                            disabled: dt(it)
                          },
                          it
                        )) }, y)
                      );
                  }),
                  R && /* @__PURE__ */ a(Te, { children: /* @__PURE__ */ a(
                    ze,
                    {
                      value: `${R.book} ${pe[R.book]} ${R.chapterNum || ""}:${R.verseNum || ""})}`,
                      onSelect: _t,
                      disabled: !!w && ua(
                        R.book,
                        R.chapterNum ?? 1,
                        R.verseNum ?? 1,
                        w
                      ),
                      className: "tw:font-semibold tw:text-primary",
                      children: Ce(
                        {
                          book: R.book,
                          chapterNum: R.chapterNum ?? 1,
                          verseNum: R.verseNum ?? 1
                        },
                        n ? Ua(R.book, n) : void 0
                      )
                    },
                    "top-match"
                  ) }),
                  R && at && R.chapterNum && d && /* @__PURE__ */ u(lt, { children: [
                    /* @__PURE__ */ u("div", { className: "tw:mb-2 tw:flex tw:items-center tw:justify-between tw:px-3 tw:text-sm tw:font-medium tw:text-muted-foreground", children: [
                      /* @__PURE__ */ a("span", { children: `${Me(R.book, n)} ${R.chapterNum}` }),
                      /* @__PURE__ */ a("span", { children: $t })
                    ] }),
                    /* @__PURE__ */ a(
                      Bo,
                      {
                        bookId: R.book,
                        chapterNum: R.chapterNum,
                        endVerse: d(R.book, R.chapterNum),
                        scrRef: t,
                        onVerseSelect: re,
                        setVerseRef: Q,
                        isVerseDisabled: ft(R.book, R.chapterNum),
                        className: "tw:px-4 tw:pb-4"
                      }
                    )
                  ] }),
                  R && !at && lr(R.book) > 1 && /* @__PURE__ */ u(lt, { children: [
                    /* @__PURE__ */ u("div", { className: "tw:mb-2 tw:flex tw:items-center tw:justify-between tw:px-3 tw:text-sm tw:font-medium tw:text-muted-foreground", children: [
                      /* @__PURE__ */ a("span", { children: Me(R.book, n) }),
                      /* @__PURE__ */ a("span", { children: Nt })
                    ] }),
                    /* @__PURE__ */ a(
                      Lo,
                      {
                        bookId: R.book,
                        scrRef: t,
                        onChapterSelect: ce,
                        setChapterRef: b,
                        isChapterDimmed: tt,
                        isChapterDisabled: ht(R.book),
                        className: "tw:px-4 tw:pb-4"
                      }
                    )
                  ] })
                ] }),
                _ === "chapters" && U && /* @__PURE__ */ a(
                  Lo,
                  {
                    bookId: U,
                    scrRef: t,
                    onChapterSelect: ce,
                    setChapterRef: b,
                    isChapterDisabled: ht(U),
                    className: "tw:p-4"
                  }
                ),
                _ === "verses" && M && J !== void 0 && d && /* @__PURE__ */ a(
                  Bo,
                  {
                    bookId: M,
                    chapterNum: J,
                    endVerse: d(M, J),
                    scrRef: t,
                    onVerseSelect: re,
                    setVerseRef: Q,
                    isVerseDisabled: ft(
                      M,
                      J
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
const op = Object.freeze([
  "%scripture_section_ot_long%",
  "%scripture_section_nt_long%",
  "%scripture_section_dc_long%",
  "%scripture_section_extra_long%",
  "%history_recent%",
  "%history_recentSearches_ariaLabel%",
  "%webView_bookChapterControl_selectChapter%",
  "%webView_bookChapterControl_selectVerse%"
]);
function bl(t) {
  return typeof t == "string" ? t : typeof t == "number" ? t.toString() : t.label;
}
function jo({
  id: t,
  options: e = [],
  className: r,
  buttonClassName: o,
  popoverContentClassName: n,
  popoverContentStyle: i,
  value: s,
  onChange: c = () => {
  },
  getOptionLabel: l = bl,
  getButtonLabel: d,
  icon: w = void 0,
  buttonPlaceholder: p = "",
  textPlaceholder: h = "",
  commandEmptyMessage: g = "No option found",
  buttonVariant: f = "outline",
  alignDropDown: x = "start",
  isDisabled: m = !1,
  ariaLabel: E,
  ...T
}) {
  const [k, z] = N(!1), F = d ?? l, D = (P) => P.length > 0 && typeof P[0] == "object" && "options" in P[0], $ = (P, S) => {
    const V = l(P), W = typeof P == "object" && "secondaryLabel" in P ? P.secondaryLabel : void 0, _ = `${S ?? ""}${V}${W ?? ""}`;
    return /* @__PURE__ */ u(
      ze,
      {
        value: V,
        onSelect: () => {
          c(P), z(!1);
        },
        className: "tw:gap-1.5!",
        children: [
          /* @__PURE__ */ a(
            Ie,
            {
              className: v("tw:h-4 tw:w-4 tw:shrink-0", {
                "tw:opacity-0": !s || l(s) !== V
              })
            }
          ),
          /* @__PURE__ */ u("span", { className: "tw:flex-1 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap", children: [
            V,
            W && /* @__PURE__ */ u("span", { className: "tw:text-muted-foreground", children: [
              " · ",
              W
            ] })
          ] })
        ]
      },
      _
    );
  };
  return /* @__PURE__ */ u(Pe, { open: k, onOpenChange: z, ...T, children: [
    /* @__PURE__ */ a(rr, { asChild: !0, children: /* @__PURE__ */ u(
      Y,
      {
        variant: f,
        role: "combobox",
        "aria-expanded": k,
        "aria-label": E,
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
                children: s ? F(s) : p
              }
            )
          ] }),
          /* @__PURE__ */ a(wr, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ a(
      Ve,
      {
        align: x,
        className: v("tw:w-[200px] tw:p-0", n),
        style: i,
        children: /* @__PURE__ */ u(Le, { children: [
          /* @__PURE__ */ a(
            ta,
            {
              placeholder: h,
              className: "tw:text-inherit",
              spaceSelectsHighlightedItem: !0
            }
          ),
          /* @__PURE__ */ a(ea, { children: g }),
          /* @__PURE__ */ a(Be, { children: D(e) ? e.map((P) => /* @__PURE__ */ a(Te, { heading: P.groupHeading, children: P.options.map((S) => $(S, P.groupHeading)) }, P.groupHeading)) : /* @__PURE__ */ a(Te, { children: e.map((P) => $(P)) }) })
        ] })
      }
    )
  ] });
}
function xl({
  startChapter: t,
  endChapter: e,
  handleSelectStartChapter: r,
  handleSelectEndChapter: o,
  isDisabled: n = !1,
  chapterCount: i
}) {
  const s = I(
    () => Array.from({ length: i }, (d, w) => w + 1),
    [i]
  );
  return /* @__PURE__ */ u(lt, { children: [
    /* @__PURE__ */ a(zt, { htmlFor: "start-chapters-combobox", children: "Chapters" }),
    /* @__PURE__ */ a(
      jo,
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
    /* @__PURE__ */ a(zt, { htmlFor: "end-chapters-combobox", children: "to" }),
    /* @__PURE__ */ a(
      jo,
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
var Va = /* @__PURE__ */ ((t) => (t.CurrentBook = "current book", t.ChooseBooks = "choose books", t))(Va || {});
((t) => {
  t.CURRENT_BOOK = "current book", t.CHOOSE_BOOKS = "choose books";
})(Va || (Va = {}));
const np = Object.freeze([
  "%webView_bookSelector_currentBook%",
  "%webView_bookSelector_choose%",
  "%webView_bookSelector_chooseBooks%"
]), ha = (t, e) => t[e] ?? e;
function ip({
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
  const w = ha(d, "%webView_bookSelector_currentBook%"), p = ha(d, "%webView_bookSelector_choose%"), h = ha(d, "%webView_bookSelector_chooseBooks%"), [g, f] = N(
    "current book"
    /* CurrentBook */
  ), x = (m) => {
    f(m), t(m);
  };
  return /* @__PURE__ */ a(
    qa,
    {
      className: "pr-twp tw:flex",
      value: g,
      onValueChange: (m) => x(m),
      children: /* @__PURE__ */ u("div", { className: "tw:flex tw:w-full tw:flex-col tw:gap-4", children: [
        /* @__PURE__ */ u("div", { className: "tw:grid tw:grid-cols-[25%_25%_50%]", children: [
          /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center", children: [
            /* @__PURE__ */ a(Gr, {
              value: "current book"
              /* CurrentBook */
            }),
            /* @__PURE__ */ a(zt, { className: "tw:ms-1", children: w })
          ] }),
          /* @__PURE__ */ a(zt, { className: "tw:flex tw:items-center", children: e }),
          /* @__PURE__ */ a("div", { className: "tw:flex tw:items-center tw:justify-end", children: /* @__PURE__ */ a(
            xl,
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
            /* @__PURE__ */ a(Gr, {
              value: "choose books"
              /* ChooseBooks */
            }),
            /* @__PURE__ */ a(zt, { className: "tw:ms-1", children: h })
          ] }),
          /* @__PURE__ */ a(zt, { className: "tw:flex tw:items-center", children: o.map((m) => vt.bookIdToEnglishName(m)).join(", ") }),
          /* @__PURE__ */ a(
            Y,
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
const Hn = to(null);
function yl(t, e) {
  return { getTheme: function() {
    return e ?? null;
  } };
}
function _e() {
  const t = Cn(Hn);
  return t == null && function(e, ...r) {
    const o = new URL("https://lexical.dev/docs/error"), n = new URLSearchParams();
    n.append("code", e);
    for (const i of r) n.append("v", i);
    throw o.search = n.toString(), Error(`Minified Lexical error #${e}; visit ${o.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
  }(8), t;
}
const Yn = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, kl = Yn ? ne : G, Ar = { tag: eo };
function _l({ initialConfig: t, children: e }) {
  const r = I(() => {
    const { theme: o, namespace: n, nodes: i, onError: s, editorState: c, html: l } = t, d = yl(null, o), w = zn({ editable: t.editable, html: l, namespace: n, nodes: i, onError: (p) => s(p, w), theme: o });
    return function(p, h) {
      if (h !== null) {
        if (h === void 0) p.update(() => {
          const g = Ae();
          if (g.isEmpty()) {
            const f = Rr();
            g.append(f);
            const x = Yn ? document.activeElement : null;
            (ee() !== null || x !== null && x === p.getRootElement()) && f.select();
          }
        }, Ar);
        else if (h !== null) switch (typeof h) {
          case "string": {
            const g = p.parseEditorState(h);
            p.setEditorState(g, Ar);
            break;
          }
          case "object":
            p.setEditorState(h, Ar);
            break;
          case "function":
            p.update(() => {
              Ae().isEmpty() && h(p);
            }, Ar);
        }
      }
    }(w, c), [w, d];
  }, []);
  return kl(() => {
    const o = t.editable, [n] = r;
    n.setEditable(o === void 0 || o);
  }, []), a(Hn.Provider, { value: r, children: e });
}
const Nl = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? ne : G;
function Cl({ ignoreHistoryMergeTagChange: t = !0, ignoreSelectionChange: e = !1, onChange: r }) {
  const [o] = _e();
  return Nl(() => {
    if (r) return o.registerUpdateListener(({ editorState: n, dirtyElements: i, dirtyLeaves: s, prevEditorState: c, tags: l }) => {
      e && i.size === 0 && s.size === 0 || t && l.has(eo) || c.isEmpty() || r(n, o, l);
    });
  }, [o, t, e, r]), null;
}
const io = {
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
}, so = [
  Hc,
  Rn,
  Dn,
  Yc
], El = to(null), ga = {
  didCatch: !1,
  error: null
};
class Tl extends Ws {
  constructor(e) {
    super(e), this.resetErrorBoundary = this.resetErrorBoundary.bind(this), this.state = ga;
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
      }), this.setState(ga);
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
    if (o && r.error !== null && Sl(e.resetKeys, n)) {
      var i, s;
      (i = (s = this.props).onReset) === null || i === void 0 || i.call(s, {
        next: n,
        prev: e.resetKeys,
        reason: "keys"
      }), this.setState(ga);
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
        c = So(o, l);
      else if (n !== void 0)
        c = n;
      else
        throw s;
    }
    return So(El.Provider, {
      value: {
        didCatch: i,
        error: s,
        resetErrorBoundary: this.resetErrorBoundary
      }
    }, c);
  }
}
function Sl() {
  let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  return t.length !== e.length || t.some((r, o) => !Object.is(r, e[o]));
}
function zl({ children: t, onError: e }) {
  return a(Tl, { fallback: a("div", { style: { border: "1px solid #f00", color: "#f00", padding: "8px" }, children: "An error was thrown." }), onError: e, children: t });
}
const Rl = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? ne : G;
function Dl(t) {
  return { initialValueFn: () => t.isEditable(), subscribe: (e) => t.registerEditableListener(e) };
}
function Ml() {
  return function(t) {
    const [e] = _e(), r = I(() => t(e), [e, t]), [o, n] = N(() => r.initialValueFn()), i = K(o);
    return Rl(() => {
      const { initialValueFn: s, subscribe: c } = r, l = s();
      return i.current !== l && (i.current = l, n(l)), c((d) => {
        i.current = d, n(d);
      });
    }, [r, t]), o;
  }(Dl);
}
function Ol(t, e) {
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
function Yr(t, ...e) {
  const r = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const n of e) o.append("v", n);
  throw r.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
const Wn = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, $l = Wn && "documentMode" in document ? document.documentMode : null;
!(!Wn || !("InputEvent" in window) || $l) && "getTargetRanges" in new window.InputEvent("input");
function ve(t) {
  return `${t}px`;
}
const Il = { attributes: !0, characterData: !0, childList: !0, subtree: !0 };
function Al(t, e, r) {
  let o = null, n = null, i = null, s = [];
  const c = document.createElement("div");
  function l() {
    o === null && Yr(182), n === null && Yr(183);
    const { left: p, top: h } = n.getBoundingClientRect(), g = Ol(t, e);
    var f, x;
    c.isConnected || (x = c, (f = n).insertBefore(x, f.firstChild));
    let m = !1;
    for (let E = 0; E < g.length; E++) {
      const T = g[E], k = s[E] || document.createElement("div"), z = k.style;
      z.position !== "absolute" && (z.position = "absolute", m = !0);
      const F = ve(T.left - p);
      z.left !== F && (z.left = F, m = !0);
      const D = ve(T.top - h);
      z.top !== D && (k.style.top = D, m = !0);
      const $ = ve(T.width);
      z.width !== $ && (k.style.width = $, m = !0);
      const P = ve(T.height);
      z.height !== P && (k.style.height = P, m = !0), k.parentNode !== c && (c.append(k), m = !0), s[E] = k;
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
    if (!vc(g)) return d();
    d(), o = h, n = g, i = new MutationObserver((f) => {
      const x = t.getRootElement(), m = x && x.parentElement;
      if (x !== o || m !== n) return p();
      for (const E of f) if (!c.contains(E.target)) return l();
    }), i.observe(g, Il), l();
  });
  return () => {
    w(), d();
  };
}
function Fo(t, e, r) {
  if (t.type !== "text" && Er(e)) {
    const o = e.getDOMSlot(r);
    return [o.element, o.getFirstChildOffset() + t.offset];
  }
  return [mc(r) || r, t.offset];
}
function Pl(t) {
  for (const e of t) {
    const r = e.style;
    r.background !== "Highlight" && (r.background = "Highlight"), r.color !== "HighlightText" && (r.color = "HighlightText"), r.marginTop !== ve(-1.5) && (r.marginTop = ve(-1.5)), r.paddingTop !== ve(4) && (r.paddingTop = ve(4)), r.paddingBottom !== ve(0) && (r.paddingBottom = ve(0));
  }
}
function Vl(t, e = Pl) {
  let r = null, o = null, n = null, i = null, s = null, c = null, l = () => {
  };
  function d(w) {
    w.read(() => {
      const p = ee();
      if (!be(p)) return r = null, n = null, i = null, c = null, l(), void (l = () => {
      });
      const [h, g] = function(P) {
        const S = P.getStartEndPoints();
        return P.isBackward() ? [S[1], S[0]] : S;
      }(p), f = h.getNode(), x = f.getKey(), m = h.offset, E = g.getNode(), T = E.getKey(), k = g.offset, z = t.getElementByKey(x), F = t.getElementByKey(T), D = r === null || z !== o || m !== n || x !== r.getKey(), $ = i === null || F !== s || k !== c || T !== i.getKey();
      if ((D || $) && z !== null && F !== null) {
        const P = function(S, V, W, _, rt, U, Z) {
          const M = (S._window ? S._window.document : document).createRange();
          return M.setStart(...Fo(V, W, _)), M.setEnd(...Fo(rt, U, Z)), M;
        }(t, h, f, z, g, E, F);
        l(), l = Al(t, P, e);
      }
      r = f, o = z, n = m, i = E, s = F, c = k;
    });
  }
  return d(t.getEditorState()), Se(t.registerUpdateListener(({ editorState: w }) => d(w)), () => {
    l();
  });
}
function Ll(t, e) {
  let r = null;
  const o = () => {
    const n = getSelection(), i = n && n.anchorNode, s = t.getRootElement();
    i !== null && s !== null && s.contains(i) ? r !== null && (r(), r = null) : r === null && (r = Vl(t, e));
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
  const e = On(t, (r) => Er(r) && !r.isInline());
  return Er(e) || Yr(4, t.__key), e;
}
function jl(t) {
  const e = ee() || sc();
  let r;
  if (be(e)) r = cc(e.focus, "next");
  else {
    if (e != null) {
      const s = e.getNodes(), c = s[s.length - 1];
      c && (r = Mn(c, "next"));
    }
    r = r || lc(Ae(), "previous").getFlipped().insert(Rr());
  }
  const o = Fl(t, r), n = dc(o), i = wc(n) ? uc(n) : o;
  return pc(hc(i)), t.getLatest();
}
function Fl(t, e, r) {
  let o = Ro(e, "next");
  for (let n = o; n; n = gc(n, r)) o = n;
  return fc(o) && Yr(283), o.insert(t.isInline() ? Rr().append(t) : t), Ro(Mn(t.getLatest(), "next"), e.direction);
}
function Ul(t) {
  const e = ee();
  if (!be(e)) return !1;
  const r = /* @__PURE__ */ new Set(), o = e.getNodes();
  for (let n = 0; n < o.length; n++) {
    const i = o[n], s = i.getKey();
    if (r.has(s)) continue;
    const c = On(i, (d) => Er(d) && !d.isInline());
    if (c === null) continue;
    const l = c.getKey();
    c.canIndent() && !r.has(l) && (r.add(l), t(c));
  }
  return r.size > 0;
}
const Kl = Symbol.for("preact-signals");
function na() {
  if (Ee > 1) return void Ee--;
  let t, e = !1;
  for (!function() {
    let r = Wr;
    for (Wr = void 0; r !== void 0; ) r.S.v === r.v && (r.S.i = r.i), r = r.o;
  }(); _r !== void 0; ) {
    let r = _r;
    for (_r = void 0, Xr++; r !== void 0; ) {
      const o = r.u;
      if (r.u = void 0, r.f &= -3, !(8 & r.f) && Xn(r)) try {
        r.c();
      } catch (n) {
        e || (t = n, e = !0);
      }
      r = o;
    }
  }
  if (Xr = 0, Ee--, e) throw t;
}
function ql(t) {
  if (Ee > 0) return t();
  La = ++Gl, Ee++;
  try {
    return t();
  } finally {
    na();
  }
}
let ct, _r;
function Uo(t) {
  const e = ct;
  ct = void 0;
  try {
    return t();
  } finally {
    ct = e;
  }
}
let Wr, Ee = 0, Xr = 0, Gl = 0, La = 0, Fr = 0;
function Ko(t) {
  if (ct === void 0) return;
  let e = t.n;
  return e === void 0 || e.t !== ct ? (e = { i: 0, S: t, p: ct.s, n: void 0, t: ct, e: void 0, x: void 0, r: e }, ct.s !== void 0 && (ct.s.n = e), ct.s = e, t.n = e, 32 & ct.f && t.S(e), e) : e.i === -1 ? (e.i = 0, e.n !== void 0 && (e.n.p = e.p, e.p !== void 0 && (e.p.n = e.n), e.p = ct.s, e.n = void 0, ct.s.n = e, ct.s = e), e) : void 0;
}
function Xt(t, e) {
  this.v = t, this.i = 0, this.n = void 0, this.t = void 0, this.l = 0, this.W = e == null ? void 0 : e.watched, this.Z = e == null ? void 0 : e.unwatched, this.name = e == null ? void 0 : e.name;
}
function Tr(t, e) {
  return new Xt(t, e);
}
function Xn(t) {
  for (let e = t.s; e !== void 0; e = e.n) if (e.S.i !== e.i || !e.S.h() || e.S.i !== e.i) return !0;
  return !1;
}
function qo(t) {
  for (let e = t.s; e !== void 0; e = e.n) {
    const r = e.S.n;
    if (r !== void 0 && (e.r = r), e.S.n = e, e.i = -1, e.n === void 0) {
      t.s = e;
      break;
    }
  }
}
function Jn(t) {
  let e, r = t.s;
  for (; r !== void 0; ) {
    const o = r.p;
    r.i === -1 ? (r.S.U(r), o !== void 0 && (o.n = r.n), r.n !== void 0 && (r.n.p = o)) : e = r, r.S.n = r.r, r.r !== void 0 && (r.r = void 0), r = o;
  }
  t.s = e;
}
function Je(t, e) {
  Xt.call(this, void 0), this.x = t, this.s = void 0, this.g = Fr - 1, this.f = 4, this.W = e == null ? void 0 : e.watched, this.Z = e == null ? void 0 : e.unwatched, this.name = e == null ? void 0 : e.name;
}
function Hl(t, e) {
  return new Je(t, e);
}
function Zn(t) {
  const e = t.m;
  if (t.m = void 0, typeof e == "function") {
    Ee++;
    const r = ct;
    ct = void 0;
    try {
      e();
    } catch (o) {
      throw t.f &= -2, t.f |= 8, co(t), o;
    } finally {
      ct = r, na();
    }
  }
}
function co(t) {
  for (let e = t.s; e !== void 0; e = e.n) e.S.U(e);
  t.x = void 0, t.s = void 0, Zn(t);
}
function Yl(t) {
  if (ct !== this) throw new Error("Out-of-order effect");
  Jn(this), ct = t, this.f &= -2, 8 & this.f && co(this), na();
}
function ir(t, e) {
  this.x = t, this.m = void 0, this.s = void 0, this.u = void 0, this.f = 32, this.name = e == null ? void 0 : e.name;
}
function xe(t, e) {
  const r = new ir(t, e);
  try {
    r.c();
  } catch (n) {
    throw r.d(), n;
  }
  const o = r.d.bind(r);
  return o[Symbol.dispose] = o, o;
}
function mr(t, e = {}) {
  const r = {};
  for (const o in t) {
    const n = e[o], i = Tr(n === void 0 ? t[o] : n);
    r[o] = i;
  }
  return r;
}
Xt.prototype.brand = Kl, Xt.prototype.h = function() {
  return !0;
}, Xt.prototype.S = function(t) {
  const e = this.t;
  e !== t && t.e === void 0 && (t.x = e, this.t = t, e !== void 0 ? e.e = t : Uo(() => {
    var r;
    (r = this.W) == null || r.call(this);
  }));
}, Xt.prototype.U = function(t) {
  if (this.t !== void 0) {
    const e = t.e, r = t.x;
    e !== void 0 && (e.x = r, t.e = void 0), r !== void 0 && (r.e = e, t.x = void 0), t === this.t && (this.t = r, r === void 0 && Uo(() => {
      var o;
      (o = this.Z) == null || o.call(this);
    }));
  }
}, Xt.prototype.subscribe = function(t) {
  return xe(() => {
    const e = this.value, r = ct;
    ct = void 0;
    try {
      t(e);
    } finally {
      ct = r;
    }
  }, { name: "sub" });
}, Xt.prototype.valueOf = function() {
  return this.value;
}, Xt.prototype.toString = function() {
  return this.value + "";
}, Xt.prototype.toJSON = function() {
  return this.value;
}, Xt.prototype.peek = function() {
  const t = ct;
  ct = void 0;
  try {
    return this.value;
  } finally {
    ct = t;
  }
}, Object.defineProperty(Xt.prototype, "value", { get() {
  const t = Ko(this);
  return t !== void 0 && (t.i = this.i), this.v;
}, set(t) {
  if (t !== this.v) {
    if (Xr > 100) throw new Error("Cycle detected");
    (function(e) {
      Ee !== 0 && Xr === 0 && e.l !== La && (e.l = La, Wr = { S: e, v: e.v, i: e.i, o: Wr });
    })(this), this.v = t, this.i++, Fr++, Ee++;
    try {
      for (let e = this.t; e !== void 0; e = e.x) e.t.N();
    } finally {
      na();
    }
  }
} }), Je.prototype = new Xt(), Je.prototype.h = function() {
  if (this.f &= -3, 1 & this.f) return !1;
  if ((36 & this.f) == 32 || (this.f &= -5, this.g === Fr)) return !0;
  if (this.g = Fr, this.f |= 1, this.i > 0 && !Xn(this)) return this.f &= -2, !0;
  const t = ct;
  try {
    qo(this), ct = this;
    const e = this.x();
    (16 & this.f || this.v !== e || this.i === 0) && (this.v = e, this.f &= -17, this.i++);
  } catch (e) {
    this.v = e, this.f |= 16, this.i++;
  }
  return ct = t, Jn(this), this.f &= -2, !0;
}, Je.prototype.S = function(t) {
  if (this.t === void 0) {
    this.f |= 36;
    for (let e = this.s; e !== void 0; e = e.n) e.S.S(e);
  }
  Xt.prototype.S.call(this, t);
}, Je.prototype.U = function(t) {
  if (this.t !== void 0 && (Xt.prototype.U.call(this, t), this.t === void 0)) {
    this.f &= -33;
    for (let e = this.s; e !== void 0; e = e.n) e.S.U(e);
  }
}, Je.prototype.N = function() {
  if (!(2 & this.f)) {
    this.f |= 6;
    for (let t = this.t; t !== void 0; t = t.x) t.t.N();
  }
}, Object.defineProperty(Je.prototype, "value", { get() {
  if (1 & this.f) throw new Error("Cycle detected");
  const t = Ko(this);
  if (this.h(), t !== void 0 && (t.i = this.i), 16 & this.f) throw this.v;
  return this.v;
} }), ir.prototype.c = function() {
  const t = this.S();
  try {
    if (8 & this.f || this.x === void 0) return;
    const e = this.x();
    typeof e == "function" && (this.m = e);
  } finally {
    t();
  }
}, ir.prototype.S = function() {
  if (1 & this.f) throw new Error("Cycle detected");
  this.f |= 1, this.f &= -9, Zn(this), qo(this), Ee++;
  const t = ct;
  return ct = this, Yl.bind(this, t);
}, ir.prototype.N = function() {
  2 & this.f || (this.f |= 2, this.u = _r, _r = this);
}, ir.prototype.d = function() {
  this.f |= 8, 1 & this.f || co(this);
}, ir.prototype.dispose = function() {
  this.d();
};
se({ build: (t, e, r) => mr(e), config: or({ defaultSelection: "rootEnd", disabled: !1 }), name: "@lexical/extension/AutoFocus", register(t, e, r) {
  const o = r.getOutput();
  return xe(() => o.disabled.value ? void 0 : t.registerRootListener((n) => {
    t.focus(() => {
      const i = document.activeElement;
      n === null || i !== null && n.contains(i) || n.focus({ preventScroll: !0 });
    }, { defaultSelection: o.defaultSelection.peek() });
  }));
} });
function Qn() {
  const t = Ae(), e = ee(), r = Rr();
  t.clear(), t.append(r), e !== null && r.select(), be(e) && (e.format = 0);
}
function ti(t, e = Qn) {
  return t.registerCommand($n, (r) => (t.update(e), !0), ro);
}
se({ build: (t, e, r) => mr(e), config: or({ $onClear: Qn }), name: "@lexical/extension/ClearEditor", register(t, e, r) {
  const { $onClear: o } = r.getOutput();
  return xe(() => ti(t, o.value));
} });
function Wl(t) {
  return (typeof t.nodes == "function" ? t.nodes() : t.nodes) || [];
}
const fa = xc("format", { parse: (t) => typeof t == "number" ? t : 0 });
class ei extends $a {
  $config() {
    return this.config("decorator-text", { extends: $a, stateConfigs: [{ flat: !0, stateConfig: fa }] });
  }
  getFormat() {
    return Mc(this, fa);
  }
  getFormatFlags(e, r) {
    return Do(this.getFormat(), e, r);
  }
  hasFormat(e) {
    const r = Oc[e];
    return (this.getFormat() & r) !== 0;
  }
  setFormat(e) {
    return $c(this, fa, e);
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
function Xl(t) {
  return t instanceof ei;
}
se({ name: "@lexical/extension/DecoratorText", nodes: () => [ei], register: (t, e, r) => t.registerCommand(In, (o) => {
  const n = ee();
  if (An(n) || be(n)) for (const i of n.getNodes()) Xl(i) && i.toggleFormat(o);
  return !1;
}, Pn) });
function ri(t, e) {
  let r;
  return Tr(t(), { unwatched() {
    r && (r(), r = void 0);
  }, watched() {
    this.value = t(), r = e(this);
  } });
}
const Ba = se({ build: (t) => ri(() => t.getEditorState(), (e) => t.registerUpdateListener((r) => {
  e.value = r.editorState;
})), name: "@lexical/extension/EditorState" });
function wt(t, ...e) {
  const r = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const n of e) o.append("v", n);
  throw r.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
function ai(t, e) {
  if (t && e && !Array.isArray(e) && typeof t == "object" && typeof e == "object") {
    const r = t, o = e;
    for (const n in o) r[n] = ai(r[n], o[n]);
    return t;
  }
  return e;
}
const lo = 0, ja = 1, oi = 2, ma = 3, Pr = 4, nr = 5, va = 6, br = 7;
function ba(t) {
  return t.id === lo;
}
function ni(t) {
  return t.id === oi;
}
function Jl(t) {
  return function(e) {
    return e.id === ja;
  }(t) || wt(305, String(t.id), String(ja)), Object.assign(t, { id: oi });
}
const Zl = /* @__PURE__ */ new Set();
class Ql {
  constructor(e, r) {
    Wt(this, "builder");
    Wt(this, "configs");
    Wt(this, "_dependency");
    Wt(this, "_peerNameSet");
    Wt(this, "extension");
    Wt(this, "state");
    Wt(this, "_signal");
    this.builder = e, this.extension = r, this.configs = /* @__PURE__ */ new Set(), this.state = { id: lo };
  }
  mergeConfigs() {
    let e = this.extension.config || {};
    const r = this.extension.mergeConfig ? this.extension.mergeConfig.bind(this.extension) : bc;
    for (const o of this.configs) e = r(e, o);
    return e;
  }
  init(e) {
    const r = this.state;
    ni(r) || wt(306, String(r.id));
    const o = { getDependency: this.getInitDependency.bind(this), getDirectDependentNames: this.getDirectDependentNames.bind(this), getPeer: this.getInitPeer.bind(this), getPeerNameSet: this.getPeerNameSet.bind(this) }, n = { ...o, getDependency: this.getDependency.bind(this), getInitResult: this.getInitResult.bind(this), getPeer: this.getPeer.bind(this) }, i = function(c, l, d) {
      return Object.assign(c, { config: l, id: ma, registerState: d });
    }(r, this.mergeConfigs(), o);
    let s;
    this.state = i, this.extension.init && (s = this.extension.init(e, i.config, o)), this.state = function(c, l, d) {
      return Object.assign(c, { id: Pr, initResult: l, registerState: d });
    }(i, s, n);
  }
  build(e) {
    const r = this.state;
    let o;
    r.id !== Pr && wt(307, String(r.id), String(nr)), this.extension.build && (o = this.extension.build(e, r.config, r.registerState));
    const n = { ...r.registerState, getOutput: () => o, getSignal: this.getSignal.bind(this) };
    this.state = function(i, s, c) {
      return Object.assign(i, { id: nr, output: s, registerState: c });
    }(r, o, n);
  }
  register(e, r) {
    this._signal = r;
    const o = this.state;
    o.id !== nr && wt(308, String(o.id), String(nr));
    const n = this.extension.register && this.extension.register(e, o.config, o.registerState);
    return this.state = function(i) {
      return Object.assign(i, { id: va });
    }(o), () => {
      const i = this.state;
      i.id !== br && wt(309, String(o.id), String(br)), this.state = function(s) {
        return Object.assign(s, { id: nr });
      }(i), n && n();
    };
  }
  afterRegistration(e) {
    const r = this.state;
    let o;
    return r.id !== va && wt(310, String(r.id), String(va)), this.extension.afterRegistration && (o = this.extension.afterRegistration(e, r.config, r.registerState)), this.state = function(n) {
      return Object.assign(n, { id: br });
    }(r), o;
  }
  getSignal() {
    return this._signal === void 0 && wt(311), this._signal;
  }
  getInitResult() {
    this.extension.init === void 0 && wt(312, this.extension.name);
    const e = this.state;
    return function(r) {
      return r.id >= Pr;
    }(e) || wt(313, String(e.id), String(Pr)), e.initResult;
  }
  getInitPeer(e) {
    const r = this.builder.extensionNameMap.get(e);
    return r ? r.getExtensionInitDependency() : void 0;
  }
  getExtensionInitDependency() {
    const e = this.state;
    return function(r) {
      return r.id >= ma;
    }(e) || wt(314, String(e.id), String(ma)), { config: e.config };
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
      return r.id >= br;
    }(e) || wt(316, String(e.id), String(br)), e;
  }
  getDirectDependentNames() {
    return this.builder.incomingEdges.get(this.extension.name) || Zl;
  }
  getPeerNameSet() {
    let e = this._peerNameSet;
    return e || (e = new Set((this.extension.peerDependencies || []).map(([r]) => r)), this._peerNameSet = e), e;
  }
  getExtensionDependency() {
    if (!this._dependency) {
      const e = this.state;
      (function(r) {
        return r.id >= nr;
      })(e) || wt(317, this.extension.name), this._dependency = { config: e.config, init: e.initResult, output: e.output };
    }
    return this._dependency;
  }
}
const Go = { tag: eo };
function td() {
  const t = Ae();
  t.isEmpty() && t.append(Rr());
}
const ed = se({ config: or({ setOptions: Go, updateOptions: Go }), init: ({ $initialEditorState: t = td }) => ({ $initialEditorState: t, initialized: !1 }), afterRegistration(t, { updateOptions: e, setOptions: r }, o) {
  const n = o.getInitResult();
  if (!n.initialized) {
    n.initialized = !0;
    const { $initialEditorState: i } = n;
    if (Nc(i)) t.setEditorState(i, r);
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
}, name: "@lexical/extension/InitialState", nodes: [yc, Dn, kc, _c, Rn] }), Ho = Symbol.for("@lexical/extension/LexicalBuilder");
function Yo() {
}
function rd(t) {
  throw t;
}
function Vr(t) {
  return Array.isArray(t) ? t : [t];
}
const xa = "0.43.0+prod.esm";
class dr {
  constructor(e) {
    Wt(this, "roots");
    Wt(this, "extensionNameMap");
    Wt(this, "outgoingConfigEdges");
    Wt(this, "incomingEdges");
    Wt(this, "conflicts");
    Wt(this, "_sortedExtensionReps");
    Wt(this, "PACKAGE_VERSION");
    this.outgoingConfigEdges = /* @__PURE__ */ new Map(), this.incomingEdges = /* @__PURE__ */ new Map(), this.extensionNameMap = /* @__PURE__ */ new Map(), this.conflicts = /* @__PURE__ */ new Map(), this.PACKAGE_VERSION = xa, this.roots = e;
    for (const r of e) this.addExtension(r);
  }
  static fromExtensions(e) {
    const r = [Vr(ed)];
    for (const o of e) r.push(Vr(o));
    return new dr(r);
  }
  static maybeFromEditor(e) {
    const r = e[Ho];
    return r && (r.PACKAGE_VERSION !== xa && wt(292, r.PACKAGE_VERSION, xa), r instanceof dr || wt(293)), r;
  }
  static fromEditor(e) {
    const r = dr.maybeFromEditor(e);
    return r === void 0 && wt(294), r;
  }
  constructEditor() {
    const { $initialEditorState: e, onError: r, ...o } = this.buildCreateEditorArgs(), n = Object.assign(zn({ ...o, ...r ? { onError: (i) => {
      r(i, n);
    } } : {} }), { [Ho]: this });
    for (const i of this.sortedExtensionReps()) i.build(n);
    return n;
  }
  buildEditor() {
    let e = Yo;
    function r() {
      try {
        e();
      } finally {
        e = Yo;
      }
    }
    const o = Object.assign(this.constructEditor(), { dispose: r, [Symbol.dispose]: r });
    return e = Se(this.registerEditor(o), () => o.setRootElement(null)), o;
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
    const r = Vr(e), [o] = r;
    typeof o.name != "string" && wt(297, typeof o.name);
    let n = this.extensionNameMap.get(o.name);
    if (n !== void 0 && n.extension !== o && wt(298, o.name), !n) {
      n = new Ql(this, o), this.extensionNameMap.set(o.name, n);
      const i = this.conflicts.get(o.name);
      typeof i == "string" && wt(299, o.name, i);
      for (const s of o.conflictsWith || []) this.extensionNameMap.has(s) && wt(299, o.name, s), this.conflicts.set(s, o.name);
      for (const s of o.dependencies || []) {
        const c = Vr(s);
        this.addEdge(o.name, c[0].name, c.slice(1)), this.addExtension(c);
      }
      for (const [s, c] of o.peerDependencies || []) this.addEdge(o.name, s, c ? [c] : []);
    }
  }
  sortedExtensionReps() {
    if (this._sortedExtensionReps) return this._sortedExtensionReps;
    const e = [], r = (o, n) => {
      let i = o.state;
      if (ni(i)) return;
      const s = o.extension.name;
      var c;
      ba(i) || wt(300, s, n || "[unknown]"), ba(c = i) || wt(304, String(c.id), String(lo)), i = Object.assign(c, { id: ja }), o.state = i;
      const l = this.outgoingConfigEdges.get(s);
      if (l) for (const d of l.keys()) {
        const w = this.extensionNameMap.get(d);
        w && r(w, s);
      }
      i = Jl(i), o.state = i, e.push(o);
    };
    for (const o of this.extensionNameMap.values()) ba(o.state) && r(o);
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
    return Se(...n);
  }
  buildCreateEditorArgs() {
    const e = {}, r = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map(), i = {}, s = {}, c = this.sortedExtensionReps();
    for (const w of c) {
      const { extension: p } = w;
      if (p.onError !== void 0 && (e.onError = p.onError), p.disableEvents !== void 0 && (e.disableEvents = p.disableEvents), p.parentEditor !== void 0 && (e.parentEditor = p.parentEditor), p.editable !== void 0 && (e.editable = p.editable), p.namespace !== void 0 && (e.namespace = p.namespace), p.$initialEditorState !== void 0 && (e.$initialEditorState = p.$initialEditorState), p.nodes) for (const h of Wl(p)) {
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
      p.theme && ai(s, p.theme);
    }
    Object.keys(s).length > 0 && (e.theme = s), r.size && (e.nodes = [...r]);
    const l = Object.keys(i).length > 0, d = n.size > 0;
    (l || d) && (e.html = {}, l && (e.html.import = i), d && (e.html.export = n));
    for (const w of c) w.init(e);
    return e.onError || (e.onError = rd), e;
  }
}
const ad = /* @__PURE__ */ new Set(), Wo = se({ build(t, e, r) {
  const o = r.getDependency(Ba).output, n = Tr({ watchedNodeKeys: /* @__PURE__ */ new Map() }), i = ri(() => {
  }, () => xe(() => {
    const s = i.peek(), { watchedNodeKeys: c } = n.value;
    let l, d = !1;
    o.value.read(() => {
      if (ee()) for (const [w, p] of c.entries()) {
        if (p.size === 0) {
          c.delete(w);
          continue;
        }
        const h = Ac(w), g = h && h.isSelected() || !1;
        d = d || g !== (!!s && s.has(w)), g && (l = l || /* @__PURE__ */ new Set(), l.add(w));
      }
    }), !d && l && s && l.size === s.size || (i.value = l);
  }));
  return { watchNodeKey: function(s) {
    const c = Hl(() => (i.value || ad).has(s)), { watchedNodeKeys: l } = n.peek();
    let d = l.get(s);
    const w = d !== void 0;
    return d = d || /* @__PURE__ */ new Set(), d.add(c), w || (l.set(s, d), n.value = { watchedNodeKeys: l }), c;
  } };
}, dependencies: [Ba], name: "@lexical/extension/NodeSelection" }), od = Cc("INSERT_HORIZONTAL_RULE_COMMAND");
class ur extends $a {
  static getType() {
    return "horizontalrule";
  }
  static clone(e) {
    return new ur(e.__key);
  }
  static importJSON(e) {
    return wo().updateFromJSON(e);
  }
  static importDOM() {
    return { hr: () => ({ conversion: nd, priority: 0 }) };
  }
  exportDOM() {
    return { element: document.createElement("hr") };
  }
  createDOM(e) {
    const r = document.createElement("hr");
    return Vn(r, e.theme.hr), r;
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
function nd() {
  return { node: wo() };
}
function wo() {
  return Ic(ur);
}
function id(t) {
  return t instanceof ur;
}
se({ dependencies: [Ba, Wo], name: "@lexical/extension/HorizontalRule", nodes: () => [ur], register(t, e, r) {
  const { watchNodeKey: o } = r.getDependency(Wo).output, n = Tr({ nodeSelections: /* @__PURE__ */ new Map() }), i = t._config.theme.hrSelected ?? "selected";
  return Se(t.registerCommand(od, (s) => {
    const c = ee();
    if (!be(c)) return !1;
    if (c.focus.getNode() !== null) {
      const l = wo();
      jl(l);
    }
    return !0;
  }, ro), t.registerCommand(Ec, (s) => {
    if (Tc(s.target)) {
      const c = Sc(s.target);
      if (id(c)) return function(l, d = !1) {
        const w = ee(), p = l.isSelected(), h = l.getKey();
        let g;
        d && An(w) ? g = w : (g = zc(), Rc(g)), p ? g.delete(h) : g.add(h);
      }(c, s.shiftKey), !0;
    }
    return !1;
  }, Pn), t.registerMutationListener(ur, (s, c) => {
    ql(() => {
      let l = !1;
      const { nodeSelections: d } = n.peek();
      for (const [w, p] of s.entries()) if (p === "destroyed") d.delete(w), l = !0;
      else {
        const h = d.get(w), g = t.getElementByKey(w);
        h ? h.domNode.value = g : (l = !0, d.set(w, { domNode: Tr(g), selectedSignal: o(w) }));
      }
      l && (n.value = { nodeSelections: d });
    });
  }), xe(() => {
    const s = [];
    for (const { domNode: c, selectedSignal: l } of n.value.nodeSelections.values()) s.push(xe(() => {
      const d = c.value;
      d && (l.value ? Vn(d, i) : Pc(d, i));
    }));
    return Se(...s);
  }));
} });
se({ build: (t, e) => mr({ inheritEditableFromParent: e.inheritEditableFromParent }), config: or({ $getParentEditor: function() {
  const t = Dc();
  return dr.fromEditor(t), t;
}, inheritEditableFromParent: !1 }), init: (t, e, r) => {
  const o = e.$getParentEditor();
  t.parentEditor = o, t.theme = t.theme || o._config.theme;
}, name: "@lexical/extension/NestedEditor", register: (t, e, r) => xe(() => {
  const o = t._parentEditor;
  if (o && r.getOutput().inheritEditableFromParent.value) return t.setEditable(o.isEditable()), o.registerEditableListener(t.setEditable.bind(t));
}) });
se({ build: (t, e, r) => mr(e), config: or({ disabled: !1, onReposition: void 0 }), name: "@lexical/utils/SelectionAlwaysOnDisplay", register: (t, e, r) => {
  const o = r.getOutput();
  return xe(() => {
    if (!o.disabled.value) return Ll(t, o.onReposition.value);
  });
} });
function ii(t) {
  return t.canBeEmpty();
}
function sd(t, e, r = ii) {
  return Se(t.registerCommand(Vc, (o) => {
    const n = ee();
    if (!be(n)) return !1;
    o.preventDefault();
    const i = function(s) {
      if (s.getNodes().filter((h) => Lc(h) && h.canIndent()).length > 0) return !0;
      const c = s.anchor, l = s.focus, d = l.isBefore(c) ? l : c, w = d.getNode(), p = Bl(w);
      if (p.canIndent()) {
        const h = p.getKey();
        let g = Bc();
        if (g.anchor.set(h, 0, "element"), g.focus.set(h, 0, "element"), g = jc(g), g.anchor.is(d)) return !0;
      }
      return !1;
    }(n) ? o.shiftKey ? Fc : Mo : Uc;
    return t.dispatchCommand(i, void 0);
  }, ro), t.registerCommand(Mo, () => {
    const o = typeof e == "number" ? e : e ? e.peek() : null, n = ee();
    if (!be(n)) return !1;
    const i = typeof r == "function" ? r : r.peek();
    return Ul((s) => {
      if (i(s)) {
        const c = s.getIndent() + 1;
        (!o || c < o) && s.setIndent(c);
      }
    });
  }, ao));
}
se({ build: (t, e, r) => mr(e), config: or({ $canIndent: ii, disabled: !1, maxIndent: null }), name: "@lexical/extension/TabIndentation", register(t, e, r) {
  const { disabled: o, maxIndent: n, $canIndent: i } = r.getOutput();
  return xe(() => {
    if (!o.value) return sd(t, n, i);
  });
} });
const cd = se({ name: "@lexical/react/ReactProvider" });
function ld() {
  return Ae().getTextContent();
}
function dd(t, e = !0) {
  if (t) return !1;
  let r = ld();
  return e && (r = r.trim()), r === "";
}
function wd(t) {
  if (!dd(t, !1)) return !1;
  const e = Ae().getChildren(), r = e.length;
  if (r > 1) return !1;
  for (let o = 0; o < r; o++) {
    const n = e[o];
    if (Kc(n)) return !1;
    if (Er(n)) {
      if (!qc(n) || n.__indent !== 0) return !1;
      const i = n.getChildren(), s = i.length;
      for (let c = 0; c < s; c++) {
        const l = i[o];
        if (!Ia(l)) return !1;
      }
    }
  }
  return !0;
}
function si(t) {
  return () => wd(t);
}
function ci(t) {
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
              const f = ee();
              if (be(f)) {
                const x = f.anchor;
                let m = x.getNode(), E = 0, T = 0;
                if (Ia(m) && d >= 0 && w >= 0 && (E = d, T = d + w, f.setTextNodeRange(m, E, m, T)), E === T && p === "" || (f.insertRawText(p), m = x.getNode()), Ia(m)) {
                  E = h, T = h + g;
                  const k = m.getTextContentSize();
                  E = E > k ? k : E, T = T > k ? k : T, f.setTextNodeRange(m, E, m, T);
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
se({ build: (t, e, r) => mr(e), config: or({ disabled: typeof window > "u" }), name: "@lexical/dragon", register: (t, e, r) => xe(() => r.getOutput().disabled.value ? void 0 : ci(t)) });
function ud(t, ...e) {
  const r = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const n of e) o.append("v", n);
  throw r.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
const uo = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? ne : G;
function pd({ editor: t, ErrorBoundary: e }) {
  return function(r, o) {
    const [n, i] = N(() => r.getDecorators());
    return uo(() => r.registerDecoratorListener((s) => {
      Xc(() => {
        i(s);
      });
    }), [r]), G(() => {
      i(r.getDecorators());
    }, [r]), I(() => {
      const s = [], c = Object.keys(n);
      for (let l = 0; l < c.length; l++) {
        const d = c[l], w = a(o, { onError: (h) => r._onError(h), children: a(Xs, { fallback: null, children: n[d] }) }), p = r.getElementByKey(d);
        p !== null && s.push(Jc(w, p, d));
      }
      return s;
    }, [o, n, r]);
  }(t, e);
}
function hd({ editor: t, ErrorBoundary: e }) {
  return function(r) {
    const o = dr.maybeFromEditor(r);
    if (o && o.hasExtensionByName(cd.name)) {
      for (const n of ["@lexical/plain-text", "@lexical/rich-text"]) o.hasExtensionByName(n) && ud(320, n);
      return !0;
    }
    return !1;
  }(t) ? null : a(pd, { editor: t, ErrorBoundary: e });
}
function Xo(t) {
  return t.getEditorState().read(si(t.isComposing()));
}
function gd({ contentEditable: t, placeholder: e = null, ErrorBoundary: r }) {
  const [o] = _e();
  return function(n) {
    uo(() => Se(Wc(n), ci(n)), [n]);
  }(o), u(lt, { children: [t, a(fd, { content: e }), a(hd, { editor: o, ErrorBoundary: r })] });
}
function fd({ content: t }) {
  const [e] = _e(), r = function(n) {
    const [i, s] = N(() => Xo(n));
    return uo(() => {
      function c() {
        const l = Xo(n);
        s(l);
      }
      return c(), Se(n.registerUpdateListener(() => {
        c();
      }), n.registerEditableListener(() => {
        c();
      }));
    }, [n]), i;
  }(e), o = Ml();
  return r ? typeof t == "function" ? t(o) : t : null;
}
function md({ defaultSelection: t }) {
  const [e] = _e();
  return G(() => {
    e.focus(() => {
      const r = document.activeElement, o = e.getRootElement();
      o === null || r !== null && o.contains(r) || o.focus({ preventScroll: !0 });
    }, { defaultSelection: t });
  }, [t, e]), null;
}
const vd = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? ne : G;
function bd({ onClear: t }) {
  const [e] = _e();
  return vd(() => ti(e, t), [e, t]), null;
}
const li = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? ne : G;
function xd({ editor: t, ariaActiveDescendant: e, ariaAutoComplete: r, ariaControls: o, ariaDescribedBy: n, ariaErrorMessage: i, ariaExpanded: s, ariaInvalid: c, ariaLabel: l, ariaLabelledBy: d, ariaMultiline: w, ariaOwns: p, ariaRequired: h, autoCapitalize: g, className: f, id: x, role: m = "textbox", spellCheck: E = !0, style: T, tabIndex: k, "data-testid": z, ...F }, D) {
  const [$, P] = N(t.isEditable()), S = L((W) => {
    W && W.ownerDocument && W.ownerDocument.defaultView ? t.setRootElement(W) : t.setRootElement(null);
  }, [t]), V = I(() => /* @__PURE__ */ function(...W) {
    return (_) => {
      for (const rt of W) typeof rt == "function" ? rt(_) : rt != null && (rt.current = _);
    };
  }(D, S), [S, D]);
  return li(() => (P(t.isEditable()), t.registerEditableListener((W) => {
    P(W);
  })), [t]), a("div", { "aria-activedescendant": $ ? e : void 0, "aria-autocomplete": $ ? r : "none", "aria-controls": $ ? o : void 0, "aria-describedby": n, ...i != null ? { "aria-errormessage": i } : {}, "aria-expanded": $ && m === "combobox" ? !!s : void 0, ...c != null ? { "aria-invalid": c } : {}, "aria-label": l, "aria-labelledby": d, "aria-multiline": w, "aria-owns": $ ? p : void 0, "aria-readonly": !$ || void 0, "aria-required": h, autoCapitalize: g, className: f, contentEditable: $, "data-testid": z, id: x, ref: V, role: m, spellCheck: E, style: T, tabIndex: k, ...F });
}
const yd = En(xd);
function Jo(t) {
  return t.getEditorState().read(si(t.isComposing()));
}
const kd = En(_d);
function _d(t, e) {
  const { placeholder: r, ...o } = t, [n] = _e();
  return u(lt, { children: [a(yd, { editor: n, ...o, ref: e }), r != null && a(Nd, { editor: n, content: r })] });
}
function Nd({ content: t, editor: e }) {
  const r = function(s) {
    const [c, l] = N(() => Jo(s));
    return li(() => {
      function d() {
        const w = Jo(s);
        l(w);
      }
      return d(), Se(s.registerUpdateListener(() => {
        d();
      }), s.registerEditableListener(() => {
        d();
      }));
    }, [s]), c;
  }(e), [o, n] = N(e.isEditable());
  if (ne(() => (n(e.isEditable()), e.registerEditableListener((s) => {
    n(s);
  })), [e]), !r) return null;
  let i = null;
  return typeof t == "function" ? i = t(o) : t !== null && (i = t), i === null ? null : a("div", { "aria-hidden": !0, children: i });
}
function Cd({
  placeholder: t,
  className: e,
  placeholderClassName: r
}) {
  return /* @__PURE__ */ a(
    kd,
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
const di = to(void 0);
function Ed({
  activeEditor: t,
  $updateToolbar: e,
  blockType: r,
  setBlockType: o,
  showModal: n,
  children: i
}) {
  const s = I(
    () => ({
      activeEditor: t,
      $updateToolbar: e,
      blockType: r,
      setBlockType: o,
      showModal: n
    }),
    [t, e, r, o, n]
  );
  return /* @__PURE__ */ a(di.Provider, { value: s, children: i });
}
function wi() {
  const t = Cn(di);
  if (!t)
    throw new Error("useToolbarContext must be used within a ToolbarContext provider");
  return t;
}
function Td() {
  const [t, e] = N(void 0), r = L(() => {
    e(void 0);
  }, []), o = I(() => {
    if (t === void 0)
      return;
    const { title: i, content: s } = t;
    return /* @__PURE__ */ a(Ca, { open: !0, onOpenChange: r, children: /* @__PURE__ */ u(Ea, { children: [
      /* @__PURE__ */ a(Ta, { children: /* @__PURE__ */ a(Sa, { children: i }) }),
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
function Sd({
  children: t
}) {
  const [e] = _e(), [r, o] = N(e), [n, i] = N("paragraph"), [s, c] = Td(), l = () => {
  };
  return G(() => r.registerCommand(
    Ln,
    (d, w) => (o(w), !1),
    ao
  ), [r]), /* @__PURE__ */ u(
    Ed,
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
function zd(t) {
  const [e] = _e(), { activeEditor: r } = wi();
  G(() => r.registerCommand(
    Ln,
    () => {
      const o = ee();
      return o && t(o), !1;
    },
    ao
  ), [e, t]), G(() => {
    r.getEditorState().read(() => {
      const o = ee();
      o && t(o);
    });
  }, [r, t]);
}
const Zo = [
  { format: "bold", icon: ls, label: "Bold" },
  { format: "italic", icon: ds, label: "Italic" }
  // CUSTOM: TJ removed underline and strikethrough as they are not supported by the current comment
  // data conversion and are not in P9 anyway. We can add these back if we ever get this supported.
  /* { format: 'underline', icon: UnderlineIcon, label: 'Underline' },
  { format: 'strikethrough', icon: StrikethroughIcon, label: 'Strikethrough' }, */
];
function Rd() {
  const { activeEditor: t } = wi(), [e, r] = N([]), o = L((n) => {
    if (be(n) || Zc(n)) {
      const i = [];
      Zo.forEach(({ format: s }) => {
        n.hasFormat(s) && i.push(s);
      }), r((s) => s.length !== i.length || !i.every((c) => s.includes(c)) ? i : s);
    }
  }, []);
  return zd(o), /* @__PURE__ */ a(
    un,
    {
      type: "multiple",
      value: e,
      onValueChange: r,
      variant: "outline",
      size: "sm",
      children: Zo.map(({ format: n, icon: i, label: s }) => /* @__PURE__ */ a(
        Lr,
        {
          value: n,
          "aria-label": s,
          onClick: () => {
            t.dispatchCommand(In, n);
          },
          children: /* @__PURE__ */ a(i, { className: "tw:h-4 tw:w-4" })
        },
        n
      ))
    }
  );
}
function Dd({ onClear: t }) {
  const [e] = _e();
  G(() => {
    t && t(() => {
      e.dispatchCommand($n, void 0);
    });
  }, [e, t]);
}
function Md({
  placeholder: t = "Start typing ...",
  autoFocus: e = !1,
  onClear: r
}) {
  const [, o] = N(void 0);
  return /* @__PURE__ */ u("div", { className: "tw:relative", children: [
    /* @__PURE__ */ a(Sd, { children: () => /* @__PURE__ */ a("div", { className: "tw:sticky tw:top-0 tw:z-10 tw:flex tw:gap-2 tw:overflow-auto tw:border-b tw:p-1", children: /* @__PURE__ */ a(Rd, {}) }) }),
    /* @__PURE__ */ u("div", { className: "tw:relative", children: [
      /* @__PURE__ */ a(
        gd,
        {
          contentEditable: /* @__PURE__ */ a("div", { ref: (i) => {
            i !== void 0 && o(i);
          }, children: /* @__PURE__ */ a(Cd, { placeholder: t }) }),
          ErrorBoundary: zl
        }
      ),
      e && /* @__PURE__ */ a(md, { defaultSelection: "rootEnd" }),
      /* @__PURE__ */ a(Dd, { onClear: r }),
      /* @__PURE__ */ a(bd, {})
    ] })
  ] });
}
const Od = {
  namespace: "commentEditor",
  theme: io,
  nodes: so,
  onError: (t) => {
    console.error(t);
  }
};
function Jr({
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
          _l,
          {
            initialConfig: {
              ...Od,
              ...t ? { editorState: t } : {},
              ...e ? { editorState: JSON.stringify(e) } : {}
            },
            children: /* @__PURE__ */ u(Bt, { children: [
              /* @__PURE__ */ a(Md, { placeholder: n, autoFocus: i, onClear: s }),
              /* @__PURE__ */ a(
                Cl,
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
function ui(t) {
  const e = t.querySelector('[contenteditable="true"]');
  if (!e) return !1;
  e.focus();
  const r = window.getSelection(), o = document.createRange();
  return o.selectNodeContents(e), o.collapse(!1), r == null || r.removeAllRanges(), r == null || r.addRange(o), !0;
}
function pi(t) {
  return t ? t.some(
    (e) => e && "text" in e && e.text.trim().length > 0 ? !0 : !e || !("children" in e) ? !1 : pi(e.children)
  ) : !1;
}
function ie(t) {
  var e;
  return (e = t == null ? void 0 : t.root) != null && e.children ? pi(t.root.children) : !1;
}
function $d(t) {
  if (!t || t.trim() === "")
    throw new Error("Input HTML is empty");
  const e = Bn({
    namespace: "EditorUtils",
    theme: io,
    nodes: so,
    onError: (o) => {
      console.error(o);
    }
  });
  let r;
  if (e.update(
    () => {
      const n = new DOMParser().parseFromString(t, "text/html"), i = tl(e, n);
      Ae().clear(), Gc(i);
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
function Zr(t) {
  const e = Bn({
    namespace: "EditorUtils",
    theme: io,
    nodes: so,
    onError: (n) => {
      console.error(n);
    }
  }), r = e.parseEditorState(JSON.stringify(t));
  e.setEditorState(r);
  let o = "";
  return e.getEditorState().read(() => {
    o = Qc(e);
  }), o = o.replace(/\s+style="[^"]*"/g, "").replace(/\s+class="[^"]*"/g, "").replace(/<span>(.*?)<\/span>/g, "$1").replace(/<b><strong[^>]*>(.*?)<\/strong><\/b>/g, "<b>$1</b>").replace(/<strong><b[^>]*>(.*?)<\/b><\/strong>/g, "<b>$1</b>").replace(/<i><em[^>]*>(.*?)<\/em><\/i>/g, "<i>$1</i>").replace(/<em><i[^>]*>(.*?)<\/i><\/em>/g, "<i>$1</i>").replace(/<u><span[^>]*>(.*?)<\/span><\/u>/g, "<u>$1</u>").replace(/<s><span[^>]*>(.*?)<\/span><\/s>/g, "<s>$1</s>").replace(/<br\s*\/?>/gi, "<br/>"), o;
}
function po(t) {
  return ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Home", "End"].includes(t.key) ? (t.stopPropagation(), !0) : !1;
}
const hi = Object.freeze([
  "%cancelButton_tooltip%",
  "%acceptButton_tooltip%"
]), Qo = (t, e) => t[e] ?? e;
function gi({
  onCancelClick: t,
  onAcceptClick: e,
  canAccept: r = !0,
  localizedStrings: o = {},
  className: n = "tw:h-6 tw:w-6",
  acceptLabel: i
}) {
  const s = Qo(o, "%cancelButton_tooltip%"), c = i ?? Qo(o, "%acceptButton_tooltip%");
  return /* @__PURE__ */ u(Ga, { children: [
    /* @__PURE__ */ a(Bt, { children: /* @__PURE__ */ u(jt, { children: [
      /* @__PURE__ */ a(Ft, { asChild: !0, children: /* @__PURE__ */ a(
        Y,
        {
          "aria-label": s,
          className: n,
          size: "icon",
          onClick: t,
          variant: "secondary",
          children: /* @__PURE__ */ a(Za, {})
        }
      ) }),
      /* @__PURE__ */ a(Ut, { children: /* @__PURE__ */ a("p", { children: s }) })
    ] }) }),
    /* @__PURE__ */ a(pn, {}),
    /* @__PURE__ */ a(Bt, { children: /* @__PURE__ */ u(jt, { children: [
      /* @__PURE__ */ a(Ft, { asChild: !0, children: /* @__PURE__ */ a(
        Y,
        {
          "aria-label": c,
          className: n,
          size: "icon",
          onClick: e,
          disabled: !r,
          children: /* @__PURE__ */ a(Ie, {})
        }
      ) }),
      /* @__PURE__ */ a(Ut, { children: /* @__PURE__ */ a("p", { children: c }) })
    ] }) })
  ] });
}
const Id = "verseText", sp = Object.freeze([
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
]), fi = [
  "tw:prose tw:max-w-none tw:break-words tw:text-sm tw:font-normal tw:text-foreground",
  "tw:[&>blockquote]:border-s-0 tw:[&>blockquote]:p-0 tw:[&>blockquote]:ps-0 tw:[&>blockquote]:font-normal tw:[&>blockquote]:not-italic tw:[&>blockquote]:text-foreground",
  "tw:prose-quoteless"
].join(" ");
function mi(t) {
  return (t == null ? void 0 : t.conflictType) === Id;
}
function vi(t) {
  return t === "replaced" ? "reject" : t === "merged" ? "merged" : "accept";
}
function Ur(t, e) {
  return t === "" ? e["%comment_assign_unassigned%"] ?? "Unassigned" : t === "Team" ? e["%comment_assign_team%"] ?? "Team" : t;
}
function ho(t) {
  const e = Ha();
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
function ya(t, e) {
  return t === "" ? e["%commentEditor_unassigned%"] ?? "Unassigned" : t === "Team" ? e["%commentEditor_team%"] ?? "Team" : t;
}
function cp({
  assignableUsers: t,
  onSave: e,
  onClose: r,
  localizedStrings: o,
  initialAssignedUser: n
}) {
  const [i, s] = N(Ad), [c, l] = N(n), [d, w] = N(!1), p = K(void 0), h = K(null);
  G(() => {
    let m = !0;
    const E = h.current;
    if (!E) return;
    const T = setTimeout(() => {
      m && ui(E);
    }, 300);
    return () => {
      m = !1, clearTimeout(T);
    };
  }, []);
  const g = L(() => {
    if (!ie(i)) return;
    const m = Zr(i);
    e(m, c);
  }, [i, e, c]), f = o["%commentEditor_placeholder%"] ?? "Type your comment here...", x = o["%commentEditor_assignTo_label%"] ?? "Assign to";
  return /* @__PURE__ */ u("div", { className: "pr-twp tw:grid tw:gap-3", children: [
    /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:justify-between", children: [
      /* @__PURE__ */ a("span", { className: "tw:text-sm tw:font-medium", children: x }),
      /* @__PURE__ */ a(
        gi,
        {
          onCancelClick: r,
          onAcceptClick: g,
          canAccept: ie(i),
          localizedStrings: o,
          acceptLabel: o["%commentEditor_saveButton_tooltip%"]
        }
      )
    ] }),
    /* @__PURE__ */ a("div", { className: "tw:flex tw:items-center tw:gap-2", children: /* @__PURE__ */ u(Pe, { open: d, onOpenChange: w, children: [
      /* @__PURE__ */ a(rr, { asChild: !0, children: /* @__PURE__ */ u(
        Y,
        {
          variant: "outline",
          className: "tw:flex tw:w-full tw:items-center tw:justify-start tw:gap-2",
          disabled: t.length === 0,
          children: [
            /* @__PURE__ */ a(vn, { className: "tw:h-4 tw:w-4" }),
            /* @__PURE__ */ a("span", { children: ya(c !== void 0 ? c : "", o) })
          ]
        }
      ) }),
      /* @__PURE__ */ a(
        Ve,
        {
          className: "tw:w-auto tw:p-0",
          align: "start",
          onKeyDown: (m) => {
            m.key === "Escape" && (m.stopPropagation(), w(!1));
          },
          children: /* @__PURE__ */ a(Le, { children: /* @__PURE__ */ a(Be, { children: t.map((m) => /* @__PURE__ */ a(
            ze,
            {
              onSelect: () => {
                l(m || void 0), w(!1);
              },
              className: "tw:flex tw:items-center",
              children: /* @__PURE__ */ a("span", { children: ya(m, o) })
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
          m.key === "Escape" ? (m.preventDefault(), m.stopPropagation(), r()) : ho(m) && (m.preventDefault(), m.stopPropagation(), ie(i) && g());
        },
        onKeyDown: (m) => {
          po(m), (m.key === "Enter" || m.key === " ") && m.stopPropagation();
        },
        children: /* @__PURE__ */ a(
          Jr,
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
const lp = Object.freeze([
  "%commentEditor_placeholder%",
  "%commentEditor_assignTo_label%",
  "%commentEditor_saveButton_tooltip%",
  "%commentEditor_unassigned%",
  "%commentEditor_team%",
  ...hi
]), dp = Object.freeze([
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
]), Pd = "comment-list";
function wp(t) {
  return t;
}
function Vd({
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
function up({ className: t, ...e }) {
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
function pp({ className: t, ...e }) {
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
function hp({ className: t, ...e }) {
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
function Ld({ className: t, ...e }) {
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
function gp({ className: t, ...e }) {
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
    oo.Root,
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
function fp({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    oo.Image,
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
function jd({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    oo.Fallback,
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
function tn({
  comment: t,
  isReply: e = !1,
  localizedStrings: r,
  isThreadExpanded: o = !1,
  handleUpdateComment: n,
  handleDeleteComment: i,
  onEditingChange: s,
  canEditOrDelete: c = !1
}) {
  const [l, d] = N(!1), [w, p] = N(), h = K(null);
  G(() => {
    if (!l) return;
    let D = !0;
    const $ = h.current;
    if (!$) return;
    const P = setTimeout(() => {
      D && ui($);
    }, 300);
    return () => {
      D = !1, clearTimeout(P);
    };
  }, [l]);
  const g = L(
    (D) => {
      D && D.stopPropagation(), d(!1), p(void 0), s == null || s(!1);
    },
    [s]
  ), f = L(
    async (D) => {
      if (D && D.stopPropagation(), !w || !n) return;
      await n(
        t.id,
        Zr(w)
      ) && (d(!1), p(void 0), s == null || s(!1));
    },
    [w, n, t.id, s]
  ), x = I(() => {
    const D = new Date(t.date), $ = js(
      D,
      r["%comment_date_today%"],
      r["%comment_date_yesterday%"]
    ), P = D.toLocaleTimeString(void 0, {
      hour: "numeric",
      minute: "2-digit"
    });
    return tr(r["%comment_dateAtTime%"], {
      date: $,
      time: P
    });
  }, [t.date, r]), m = I(() => t.user, [t.user]), E = I(
    () => t.user.split(" ").map((D) => D[0]).join("").toUpperCase().slice(0, 2),
    [t.user]
  ), T = I(() => Qa(t.contents), [t.contents]), k = I(
    () => t.contents.replace(/<[^>]*>/g, "").trim().length > 0,
    [t.contents]
  ), z = !!t.conflictResolutionAction && !k, F = I(() => {
    if (o && c)
      return /* @__PURE__ */ u(lt, { children: [
        /* @__PURE__ */ u(
          Qe,
          {
            onClick: (D) => {
              D.stopPropagation(), d(!0), p($d(t.contents)), s == null || s(!0);
            },
            children: [
              /* @__PURE__ */ a(ws, { className: "tw:me-2 tw:h-4 tw:w-4" }),
              r["%comment_editComment%"]
            ]
          }
        ),
        /* @__PURE__ */ u(
          Qe,
          {
            onClick: async (D) => {
              D.stopPropagation(), i && await i(t.id);
            },
            children: [
              /* @__PURE__ */ a(us, { className: "tw:me-2 tw:h-4 tw:w-4" }),
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
        /* @__PURE__ */ a(Bd, { className: "tw:h-8 tw:w-8", children: /* @__PURE__ */ a(jd, { className: "tw:text-xs tw:font-medium", children: E }) }),
        /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-1 tw:flex-col tw:gap-2", children: [
          /* @__PURE__ */ u("div", { className: "tw:flex tw:w-full tw:flex-row tw:flex-wrap tw:items-baseline tw:gap-x-2", children: [
            /* @__PURE__ */ a("p", { className: "tw:text-sm tw:font-medium", children: m }),
            /* @__PURE__ */ a("p", { className: "tw:text-xs tw:font-normal tw:text-muted-foreground", children: x }),
            /* @__PURE__ */ a("div", { className: "tw:flex-1" }),
            e && t.assignedUser !== void 0 && /* @__PURE__ */ u(Nr, { variant: "secondary", className: "tw:text-xs tw:font-normal", children: [
              "→ ",
              Ur(t.assignedUser, r)
            ] })
          ] }),
          l && /* @__PURE__ */ u(
            "div",
            {
              role: "textbox",
              tabIndex: -1,
              className: "tw:flex tw:flex-col tw:gap-2",
              ref: h,
              onKeyDownCapture: (D) => {
                D.key === "Escape" ? (D.preventDefault(), D.stopPropagation(), g()) : ho(D) && (D.preventDefault(), D.stopPropagation(), ie(w) && f());
              },
              onKeyDown: (D) => {
                po(D), (D.key === "Enter" || D.key === " ") && D.stopPropagation();
              },
              onClick: (D) => {
                D.stopPropagation();
              },
              children: [
                /* @__PURE__ */ a(
                  Jr,
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
                    onSerializedChange: (D) => p(D)
                  }
                ),
                /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-row tw:items-start tw:justify-end tw:gap-2", children: [
                  /* @__PURE__ */ a(
                    Y,
                    {
                      size: "icon",
                      onClick: g,
                      variant: "outline",
                      className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                      children: /* @__PURE__ */ a(Za, {})
                    }
                  ),
                  /* @__PURE__ */ a(
                    Y,
                    {
                      size: "icon",
                      onClick: f,
                      className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                      disabled: !ie(w),
                      children: /* @__PURE__ */ a(bn, {})
                    }
                  )
                ] })
              ]
            }
          ),
          !l && /* @__PURE__ */ u(lt, { children: [
            t.status === "Resolved" && !z && /* @__PURE__ */ a("div", { className: "tw:text-sm tw:italic", children: r["%comment_status_resolved%"] }),
            t.status === "Todo" && e && /* @__PURE__ */ a("div", { className: "tw:text-sm tw:italic", children: r["%comment_status_todo%"] }),
            z ? (
              // A platform-created conflict resolution comment carries an empty body — PT9 renders
              // its banner UI-side from conflictResolutionAction, it never stores text. So render the
              // localized, neutral outcome line here instead of the (empty) contents, styled like the
              // italic status lines above. These are the same neutral keys ConflictNoteCard's Result
              // region used to render inline. Only when the body IS empty: a resolution synced from
              // PT9 can carry the resolver's typed note alongside the action, and PT9 shows that text,
              // so the body branch below keeps it visible rather than discarding it for this banner.
              /* @__PURE__ */ a("div", { className: "tw:text-sm tw:italic", children: vi(t.conflictResolutionAction) === "merged" ? r["%conflict_note_outcome_combined%"] ?? "Combined both changes." : r["%conflict_note_outcome_used_other%"] ?? "Used the other change instead of the current text." })
            ) : /* @__PURE__ */ a(
              "div",
              {
                className: v(
                  // Shared note-body prose/blockquote treatment (also used by conflict-diff's
                  // DIFF_HTML_CLASSES). Layer this comment item's own extras on top: items-start +
                  // gap-2 for layout, and line-clamp while the thread is collapsed.
                  fi,
                  "tw:items-start tw:gap-2",
                  {
                    "tw:line-clamp-3": !o
                  }
                ),
                dangerouslySetInnerHTML: { __html: T }
              }
            )
          ] })
        ] }),
        F && /* @__PURE__ */ u(je, { children: [
          /* @__PURE__ */ a(Fe, { asChild: !0, children: /* @__PURE__ */ a(Y, { variant: "ghost", size: "icon", children: /* @__PURE__ */ a(ps, {}) }) }),
          /* @__PURE__ */ a(Ue, { align: "end", children: F })
        ] })
      ]
    }
  );
}
function bi({
  show: t,
  disabled: e = !1,
  onClick: r,
  ariaLabel: o
}) {
  if (t)
    return /* @__PURE__ */ a(
      Y,
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
        children: /* @__PURE__ */ a(Ie, { className: "tw:h-4 tw:w-4" })
      }
    );
}
const en = {
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
function xi({
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
  assignableUsers: x,
  canUserAddCommentToThread: m,
  canUserAssignThreadCallback: E,
  canUserResolveThreadCallback: T,
  canUserEditOrDeleteCommentCallback: k,
  isRead: z = !1,
  autoReadDelay: F = 5,
  onVerseRefClick: D,
  initialAssignedUser: $,
  activeComments: P,
  rootContentSlot: S,
  resolveActionSlot: V,
  spaceRootContentFromReplies: W = !1
}) {
  const [_, rt] = N(en), [U, Z] = N(), [M, O] = N(), J = o, [ot, Pt] = N(!1), [Ot, Kt] = N(!1), [H, nt] = N(!1), [pt, st] = N(!1), [gt, qt] = N(!1), [Ct, bt] = N(z), [xt, Gt] = N(!1), yt = K(void 0), [Vt, R] = N(/* @__PURE__ */ new Map());
  G(() => {
    let b = !0;
    return (async () => {
      const j = T ? await T(l) : !1;
      b && qt(j);
    })(), () => {
      b = !1;
    };
  }, [l, T]), G(() => {
    let b = !0;
    if (!o) {
      st(!1), R(/* @__PURE__ */ new Map());
      return;
    }
    return (async () => {
      const j = E ? await E(l) : !1;
      b && st(j);
    })(), () => {
      b = !1;
    };
  }, [o, l, E]);
  const kt = K("idle");
  G(() => {
    if (!o) {
      kt.current !== "idle" && (Z(void 0), O(void 0), kt.current = "idle");
      return;
    }
    kt.current === "idle" && (kt.current = "pending"), pt ? kt.current === "pending" && $ !== void 0 && // Skip pre-population if the thread is already assigned to this user — doing so
    // would show "Assigning to: Alice" and enable the submit button for a no-op call.
    $ !== i && (Z($), kt.current = "auto-populated") : kt.current === "auto-populated" && (Z(void 0), kt.current = "pending");
  }, [o, $, pt, i]);
  const _t = I(
    () => P ?? e.filter((b) => !b.deleted),
    [P, e]
  );
  G(() => {
    let b = !0;
    if (!o || !k) {
      R(/* @__PURE__ */ new Map());
      return;
    }
    return (async () => {
      const j = /* @__PURE__ */ new Map();
      await Promise.all(
        _t.map(async (at) => {
          const dt = await k(at.id);
          b && j.set(at.id, dt);
        })
      ), b && R(j);
    })(), () => {
      b = !1;
    };
  }, [o, _t, k]);
  const re = I(() => _t[0], [_t]), qe = K(null), ce = K(void 0), le = L(() => {
    var b;
    (b = ce.current) == null || b.call(ce), rt(en);
  }, []), Ge = L(() => {
    const b = !Ct;
    bt(b), Gt(!b), f == null || f(l, b);
  }, [Ct, f, l]);
  G(() => {
    Pt(!1);
  }, [o]), G(() => {
    if (o && !Ct && !xt) {
      const b = setTimeout(() => {
        bt(!0), f == null || f(l, !0);
      }, F * 1e3);
      return yt.current = b, () => clearTimeout(b);
    }
    yt.current && (clearTimeout(yt.current), yt.current = void 0);
  }, [o, Ct, xt, F, l, f]);
  const Et = I(
    () => ({
      singleReply: r["%comment_thread_single_reply%"],
      multipleReplies: r["%comment_thread_multiple_replies%"]
    }),
    [r]
  ), ae = I(() => {
    if (i === void 0)
      return;
    if (i === "")
      return r["%comment_assign_unassigned%"] ?? "Unassigned";
    const b = Ur(i, r);
    return tr(r["%comment_assigned_to%"], {
      assignedUser: b
    });
  }, [i, r]), Rt = I(() => _t.slice(1), [_t]), Dt = I(() => Rt.length ?? 0, [Rt.length]), Ht = I(() => Dt > 0, [Dt]), oe = I(() => ot || Dt <= 2 ? Rt : Rt.slice(-2), [Rt, Dt, ot]), Qt = I(() => ot || Dt <= 2 ? 0 : Dt - 2, [Dt, ot]), ge = I(
    () => Dt === 1 ? Et.singleReply : tr(Et.multipleReplies, { count: Dt }),
    [Dt, Et]
  ), C = I(
    () => Qt === 1 ? Et.singleReply : tr(Et.multipleReplies, { count: Qt }),
    [Qt, Et]
  );
  G(() => {
    !o && Ot && Ht && Kt(!1);
  }, [o, Ot, Ht]);
  const B = L(
    async (b) => {
      b && b.stopPropagation();
      const Q = ie(_) ? Zr(_) : void 0;
      if (U !== void 0) {
        await p({
          threadId: l,
          contents: Q,
          assignedUser: U
        }) && (O(U), Q && le());
        return;
      }
      Q && await p({ threadId: l, contents: Q }) && le();
    },
    [
      le,
      _,
      p,
      U,
      l
    ]
  ), tt = L(
    async (b) => {
      const Q = ie(_) ? Zr(_) : void 0, j = b.status ? b.assignedUser : U ?? b.assignedUser, at = await p({
        ...b,
        contents: Q,
        assignedUser: j
      });
      return at && (j !== void 0 && O(j), Q && le()), at;
    },
    [le, _, p, U]
  );
  if (_t.length === 0) return;
  const q = /* @__PURE__ */ a(
    tn,
    {
      comment: re,
      localizedStrings: r,
      isThreadExpanded: o,
      threadStatus: w,
      handleAddCommentToThread: tt,
      handleUpdateComment: h,
      handleDeleteComment: g,
      onEditingChange: Kt,
      canEditOrDelete: (!Ot && Vt.get(re.id)) ?? !1,
      canUserResolveThread: gt
    }
  );
  return /* @__PURE__ */ a(
    Vd,
    {
      role: "option",
      "aria-selected": o,
      id: l,
      className: v(
        "tw:group tw:w-full tw:rounded-none tw:border-none tw:p-4 tw:outline-hidden tw:transition-all tw:duration-200 tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-1 tw:focus:ring-offset-background",
        { "tw:cursor-pointer tw:hover:shadow-md": !o },
        {
          "tw:bg-primary-foreground": !o && w !== "Resolved" && Ct,
          "tw:bg-background": o && w !== "Resolved" && Ct,
          "tw:bg-muted": w === "Resolved",
          "tw:bg-accent": !Ct && !o && w !== "Resolved"
        }
      ),
      onClick: () => {
        c(l);
      },
      tabIndex: -1,
      children: /* @__PURE__ */ u(Ld, { className: "tw:flex tw:flex-col tw:gap-2 tw:p-0", children: [
        /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:content-center tw:items-start tw:gap-4", children: [
          /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:gap-2", children: [
            ae && /* @__PURE__ */ a(Nr, { className: "tw:rounded-sm tw:bg-input tw:text-sm tw:font-normal tw:text-primary tw:hover:bg-input", children: ae }),
            /* @__PURE__ */ a(
              Y,
              {
                variant: "ghost",
                size: "icon",
                onClick: (b) => {
                  b.stopPropagation(), Ge();
                },
                className: "tw:text-muted-foreground tw:transition tw:hover:text-foreground",
                "aria-label": Ct ? r["%comment_aria_mark_as_unread%"] ?? "Mark as unread" : r["%comment_aria_mark_as_read%"] ?? "Mark as read",
                children: Ct ? /* @__PURE__ */ a(hs, {}) : /* @__PURE__ */ a(gs, {})
              }
            ),
            V === void 0 ? (
              // Generic status-resolve check (used by non-conflict threads and, via ConflictThread
              // leaving this slot undefined, by non-verseText conflicts, which resolve through a
              // plain status change). ConflictThread overrides this slot for verseText conflicts.
              /* @__PURE__ */ a(
                bi,
                {
                  show: gt && w !== "Resolved",
                  onClick: () => tt({ threadId: l, status: "Resolved" }),
                  ariaLabel: r["%comment_aria_resolve_thread%"] ?? "Resolve thread"
                }
              )
            ) : V
          ] }),
          /* @__PURE__ */ a("div", { className: "tw:flex tw:max-w-full tw:flex-wrap tw:items-baseline tw:gap-2", children: /* @__PURE__ */ u(
            "p",
            {
              ref: qe,
              className: v(
                "tw:flex-1 tw:overflow-hidden tw:text-ellipsis tw:text-sm tw:font-normal tw:text-muted-foreground",
                {
                  "tw:overflow-visible tw:text-clip tw:whitespace-normal tw:break-words": J
                },
                { "tw:whitespace-nowrap": !J }
              ),
              children: [
                n && D ? /* @__PURE__ */ a(
                  Y,
                  {
                    variant: "ghost",
                    size: "sm",
                    className: "tw:h-auto tw:px-1 tw:py-0 tw:text-sm tw:font-normal tw:text-muted-foreground",
                    onClick: (b) => {
                      b.stopPropagation(), D(d);
                    },
                    children: n
                  }
                ) : n,
                /* @__PURE__ */ u("span", { className: t, children: [
                  re.contextBefore,
                  /* @__PURE__ */ a("span", { className: "tw:font-bold", children: re.selectedText }),
                  re.contextAfter
                ] })
              ]
            }
          ) }),
          S ?? q
        ] }),
        /* @__PURE__ */ u(lt, { children: [
          Ht && !o && /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:gap-5", children: [
            /* @__PURE__ */ a("div", { className: "tw:w-8", children: /* @__PURE__ */ a(Cr, {}) }),
            /* @__PURE__ */ a("p", { className: "tw:text-sm tw:text-muted-foreground", children: ge })
          ] }),
          !o && ie(_) && /* @__PURE__ */ a(
            Jr,
            {
              editorSerializedState: _,
              onSerializedChange: (b) => rt(b),
              placeholder: r["%comment_replyOrAssign%"]
            }
          ),
          o && /* @__PURE__ */ u(lt, { children: [
            W && oe.length > 0 && /* @__PURE__ */ a("div", { className: "tw:h-2", "data-slot": "root-content-reply-gap", "aria-hidden": "true" }),
            Qt > 0 && /* @__PURE__ */ u(
              "div",
              {
                className: "tw:flex tw:cursor-pointer tw:items-center tw:gap-5 tw:py-2",
                onClick: (b) => {
                  b.stopPropagation(), Pt(!0);
                },
                role: "button",
                tabIndex: 0,
                onKeyDown: (b) => {
                  (b.key === "Enter" || b.key === " ") && (b.preventDefault(), b.stopPropagation(), Pt(!0));
                },
                children: [
                  /* @__PURE__ */ a("div", { className: "tw:w-8", children: /* @__PURE__ */ a(Cr, {}) }),
                  /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:gap-2", children: [
                    /* @__PURE__ */ a("p", { className: "tw:text-sm tw:text-muted-foreground", children: C }),
                    ot ? /* @__PURE__ */ a(fs, {}) : /* @__PURE__ */ a(wr, {})
                  ] })
                ]
              }
            ),
            oe.map((b) => /* @__PURE__ */ a("div", { children: /* @__PURE__ */ a(
              tn,
              {
                comment: b,
                localizedStrings: r,
                isReply: !0,
                isThreadExpanded: o,
                handleUpdateComment: h,
                handleDeleteComment: g,
                onEditingChange: Kt,
                canEditOrDelete: (!Ot && Vt.get(b.id)) ?? !1
              }
            ) }, b.id)),
            m !== !1 && (!Ot || ie(_)) && /* @__PURE__ */ u(
              "div",
              {
                role: "textbox",
                tabIndex: -1,
                className: "tw:w-full tw:space-y-2",
                onClick: (b) => b.stopPropagation(),
                onKeyDownCapture: (b) => {
                  ho(b) && (b.preventDefault(), b.stopPropagation(), (ie(_) || U !== void 0 && U !== M) && B());
                },
                onKeyDown: (b) => {
                  po(b), (b.key === "Enter" || b.key === " ") && b.stopPropagation();
                },
                children: [
                  /* @__PURE__ */ a(
                    Jr,
                    {
                      editorSerializedState: _,
                      onSerializedChange: (b) => rt(b),
                      placeholder: w === "Resolved" ? r["%comment_reopenResolved%"] : r["%comment_replyOrAssign%"],
                      autoFocus: !0,
                      onClear: (b) => {
                        ce.current = b;
                      }
                    }
                  ),
                  /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-row tw:items-center tw:justify-end tw:gap-2", children: [
                    U !== void 0 && (ie(_) || U !== M) && /* @__PURE__ */ a("span", { className: "tw:flex-1 tw:text-sm tw:text-muted-foreground", children: tr(
                      r["%comment_assigning_to%"] ?? "Assigning to: {assignedUser}",
                      {
                        assignedUser: Ur(
                          U,
                          r
                        )
                      }
                    ) }),
                    /* @__PURE__ */ u(Pe, { open: H, onOpenChange: nt, children: [
                      /* @__PURE__ */ a(rr, { asChild: !0, children: /* @__PURE__ */ a(
                        Y,
                        {
                          size: "icon",
                          variant: "outline",
                          className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                          disabled: !pt || !x || x.length === 0 || !x.includes(s),
                          "aria-label": r["%comment_aria_assign_user%"] ?? "Assign user",
                          children: /* @__PURE__ */ a(vn, {})
                        }
                      ) }),
                      /* @__PURE__ */ a(
                        Ve,
                        {
                          className: "tw:w-auto tw:p-0",
                          align: "end",
                          onKeyDown: (b) => {
                            b.key === "Escape" && (b.stopPropagation(), nt(!1));
                          },
                          children: /* @__PURE__ */ a(Le, { children: /* @__PURE__ */ a(Be, { children: x == null ? void 0 : x.map((b) => /* @__PURE__ */ a(
                            ze,
                            {
                              onSelect: () => {
                                Z(b !== i ? b : void 0), kt.current = "user-selected", O(void 0), nt(!1);
                              },
                              className: "tw:flex tw:items-center",
                              children: /* @__PURE__ */ a("span", { children: Ur(b, r) })
                            },
                            b || "unassigned"
                          )) }) })
                        }
                      )
                    ] }),
                    /* @__PURE__ */ a(
                      Y,
                      {
                        size: "icon",
                        onClick: B,
                        className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                        disabled: !ie(_) && (U === void 0 || U === M),
                        "aria-label": r["%comment_aria_submit_comment%"] ?? "Submit comment",
                        children: /* @__PURE__ */ a(bn, {})
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
const Fd = v(
  fi,
  // `prose` gives block children (the top-level blockquote wrapper, and any p — whether nested
  // inside that blockquote or, in the non-verseText fallback, a direct child) vertical margins that
  // make these already-compact cards feel bulky. Zero both so the diff sits flush inside the card.
  "tw:[&>blockquote]:my-0 tw:[&_p]:my-0",
  "tw:[&_u]:font-semibold tw:[&_u]:text-success-foreground tw:[&_u]:no-underline",
  "tw:[&_s]:text-destructive tw:[&_s]:line-through"
), Ud = (t) => t.replace(/(\s+)(<\/[us]>)/g, "$2$1"), Kr = (t) => Ud(Qa(t));
function qr({ html: t }) {
  return /* @__PURE__ */ a(
    "div",
    {
      className: Fd,
      dangerouslySetInnerHTML: { __html: t }
    }
  );
}
function Kd({
  comment: t,
  localizedStrings: e,
  availableActions: r = "acceptOrReject",
  resolvedResolution: o,
  onResolve: n,
  isResolving: i = !1
}) {
  const [s, c] = N("accept"), l = zo(), d = zo(), w = r === "loading", p = r === "accept", h = r === "none", g = r === "acceptRejectOrMerge", f = p ? "accept" : s, x = I(
    () => Kr(t.rejectedText ?? ""),
    [t.rejectedText]
  ), m = I(
    () => Kr(t.acceptedText ?? ""),
    [t.acceptedText]
  ), E = I(
    () => Kr(t.mergedText ?? ""),
    [t.mergedText]
  ), T = I(() => Qa(t.contents), [t.contents]);
  if (!mi(t))
    return /* @__PURE__ */ a(qr, { html: T });
  const k = (M) => {
    c(M === "reject" || M === "merge" ? M : "accept");
  }, z = e["%conflict_note_stale_notice%"] ?? "The verse was edited after this conflict was recorded, so 'Use the other change' is no longer available. Keep the current text to resolve.", F = g ? [
    {
      value: "merge",
      label: e["%conflict_note_option_combine%"] ?? "Combine both changes",
      html: E
    }
  ] : [], D = [
    {
      value: "accept",
      label: e["%conflict_note_option_keep_current%"] ?? "Keep the current text",
      html: m
    },
    {
      value: "reject",
      label: e["%conflict_note_option_use_other%"] ?? "Use the other change",
      html: x
    },
    ...F
  ], $ = f === "accept", P = i || $;
  let S;
  $ ? S = e["%conflict_note_save_disabled_tooltip%"] ?? "Keeping the current text makes no change — resolve the thread with the ✓ to keep it." : i || (S = e["%conflict_note_save_warning%"] ?? "This can't be undone.");
  const V = e["%conflict_note_no_result%"] ?? "No result preview available.", W = /* @__PURE__ */ a("p", { className: "tw:text-muted-foreground", children: V }), _ = (M) => M ? /* @__PURE__ */ a("p", { className: "tw:whitespace-pre-wrap tw:text-foreground", children: M }) : W, rt = () => {
    const M = o ?? "accept";
    return M === "merged" ? t.mergedText ? /* @__PURE__ */ a(qr, { html: E }) : W : _(M === "reject" ? t.rejectedResultText : t.resultText);
  }, U = (M) => p && M.value === "reject", Z = (M) => {
    const O = f === M.value, J = `${d}-${M.value}`, ot = U(M);
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
          htmlFor: J,
          "data-slot": "conflict-resolution-option",
          "data-value": M.value,
          className: v(
            "tw:flex tw:flex-col tw:gap-1 tw:rounded-md tw:border tw:p-2",
            "tw:focus-within:ring-2 tw:focus-within:ring-ring tw:focus-within:ring-offset-1",
            O ? "tw:border-border tw:bg-accent/50" : "tw:border-transparent tw:hover:bg-accent/30",
            ot ? "tw:cursor-not-allowed tw:opacity-60" : "tw:cursor-pointer"
          ),
          children: [
            /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:gap-2", children: [
              /* @__PURE__ */ a(
                Gr,
                {
                  id: J,
                  value: M.value,
                  "aria-label": M.label,
                  disabled: ot,
                  "aria-describedby": ot ? l : void 0
                }
              ),
              /* @__PURE__ */ a("span", { "aria-hidden": !0, className: "tw:font-medium", children: M.label })
            ] }),
            ot && // aria-describedby links the option to this visually-hidden notice so assistive tech
            // announces why the choice is read-only.
            /* @__PURE__ */ a("span", { id: l, className: "tw:sr-only", children: z }),
            /* @__PURE__ */ a(qr, { html: M.html })
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
        /* @__PURE__ */ a(sr, { className: "tw:h-8 tw:w-full" }),
        /* @__PURE__ */ a(sr, { className: "tw:h-8 tw:w-full" }),
        /* @__PURE__ */ a(sr, { className: "tw:h-8 tw:w-24" })
      ] }),
      !w && h && rt(),
      !w && !h && /* @__PURE__ */ u(lt, { children: [
        /* @__PURE__ */ a("p", { children: e["%conflict_note_choose_prompt%"] ?? "Select which change to keep:" }),
        /* @__PURE__ */ a(
          qa,
          {
            value: f,
            onValueChange: k,
            disabled: i,
            "aria-label": e["%conflict_note_choose_aria_label%"] ?? "Choose resolution",
            children: D.map((M) => U(M) ? /* @__PURE__ */ a(Bt, { delayDuration: 0, children: /* @__PURE__ */ u(jt, { children: [
              /* @__PURE__ */ a(Ft, { asChild: !0, children: Z(M) }),
              /* @__PURE__ */ a(Ut, { children: z })
            ] }) }, M.value) : Z(M))
          }
        ),
        /* @__PURE__ */ a(Bt, { delayDuration: 0, children: /* @__PURE__ */ u(jt, { children: [
          /* @__PURE__ */ a(Ft, { asChild: !0, children: /* @__PURE__ */ a("span", { className: "tw:inline-flex tw:self-start", children: /* @__PURE__ */ a(
            Y,
            {
              size: "sm",
              disabled: P,
              onClick: () => n == null ? void 0 : n(f),
              children: e["%conflict_note_save_and_resolve%"] ?? "Save and resolve"
            }
          ) }) }),
          S && /* @__PURE__ */ a(Ut, { children: S })
        ] }) })
      ] })
    ] })
  );
}
const qd = {
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
  const o = I(
    () => Kr(t.rejectedText ?? ""),
    [t.rejectedText]
  );
  if (r) {
    const { key: i, fallback: s } = qd[r];
    return /* @__PURE__ */ a("p", { className: "tw:text-sm tw:font-normal tw:text-muted-foreground", children: e[i] ?? s });
  }
  const n = e["%conflict_note_summary_unresolved%"] ?? "Conflicting edits. Choose which change to keep.";
  return /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:gap-1", children: [
    /* @__PURE__ */ a("p", { className: "tw:text-sm tw:font-normal tw:text-muted-foreground", children: n }),
    o ? /* @__PURE__ */ a(qr, { html: o }) : void 0
  ] });
}
function Hd(t) {
  return t === "reject" ? "reject" : t === "merge" ? "merged" : "accept";
}
function Yd({
  threadId: t,
  threadStatus: e,
  isSelected: r,
  activeComments: o,
  conflictResolution: n
}) {
  const [i, s] = N("loading"), [c, l] = N(!1), [d, w] = N(), p = n == null ? void 0 : n.getOptions, h = n == null ? void 0 : n.resolve;
  G(() => {
    let T = !0;
    if (!r) {
      s("loading");
      return;
    }
    return (async () => {
      let z;
      try {
        z = p ? await p(t) : "none";
      } catch {
        z = "none";
      }
      T && (s(z), z !== "none" && w(void 0));
    })(), () => {
      T = !1;
    };
  }, [r, t, e, p]);
  const g = K(!1), f = L(
    async (T) => {
      if (!(!h || g.current)) {
        g.current = !0, l(!0);
        try {
          await h(t, T) && (w(Hd(T)), s("none"));
        } catch {
        } finally {
          g.current = !1, l(!1);
        }
      }
    },
    [h, t]
  ), m = I(() => {
    if (e === "Resolved") {
      for (let T = o.length - 1; T >= 0; T -= 1)
        if (o[T].status === "Resolved")
          return vi(o[T].conflictResolutionAction);
      return "accept";
    }
  }, [e, o]) ?? d;
  return { conflictOptions: i, isResolving: c, resolve: f, resolvedResolution: m, showResolveCheck: i !== "loading" && i !== "none" };
}
function Wd(t) {
  const {
    comments: e,
    localizedStrings: r,
    isSelected: o = !1,
    threadId: n,
    threadStatus: i,
    conflictResolution: s
  } = t, c = I(() => e.filter((E) => !E.deleted), [e]), l = I(
    () => c.find((E) => E.conflictType) ?? c[0],
    [c]
  ), { conflictOptions: d, isResolving: w, resolve: p, resolvedResolution: h, showResolveCheck: g } = Yd({
    threadId: n,
    threadStatus: i,
    isSelected: o,
    activeComments: c,
    conflictResolution: s
  }), f = mi(l);
  let x;
  f && l && (x = o ? /* @__PURE__ */ a(
    Kd,
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
    bi,
    {
      show: g,
      disabled: w,
      onClick: () => p("accept"),
      ariaLabel: r["%comment_aria_resolve_thread%"] ?? "Resolve thread"
    }
  )), /* @__PURE__ */ a(
    xi,
    {
      ...t,
      activeComments: c,
      rootContentSlot: x,
      resolveActionSlot: m,
      spaceRootContentFromReplies: f && o
    }
  );
}
function mp({
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
  onSelectedThreadChange: x,
  onVerseRefClick: m,
  conflictResolution: E
}) {
  const [T, k] = N(/* @__PURE__ */ new Set()), [z, F] = N(), [D, $] = N(), P = L(
    async (O) => {
      const J = await i(O);
      return J !== void 0 && O.assignedUser !== void 0 && O.assignedUser !== "" && $(O.assignedUser), J;
    },
    [i]
  );
  G(() => {
    f && (k((O) => new Set(O).add(f)), F(f));
  }, [f]);
  const S = r.filter(
    (O) => O.comments.some((J) => !J.deleted)
  ), V = S.map((O) => ({ id: O.id })), W = L(
    (O) => {
      k((J) => new Set(J).add(O.id)), F(O.id), x == null || x(O.id);
    },
    [x]
  ), _ = L(
    (O) => {
      const J = T.has(O);
      k((ot) => {
        const Pt = new Set(ot);
        return Pt.has(O) ? Pt.delete(O) : Pt.add(O), Pt;
      }), F(O), x == null || x(J ? void 0 : O);
    },
    [T, x]
  ), { listboxRef: rt, activeId: U, handleKeyDown: Z } = qi({
    options: V,
    onOptionSelect: W
  }), M = L(
    (O) => {
      O.key === "Escape" ? (z && T.has(z) && (k((J) => {
        const ot = new Set(J);
        return ot.delete(z), ot;
      }), F(void 0), x == null || x(void 0)), O.preventDefault(), O.stopPropagation()) : Z(O);
    },
    [z, T, Z, x]
  );
  return /* @__PURE__ */ a(
    "div",
    {
      id: Pd,
      role: "listbox",
      tabIndex: 0,
      ref: rt,
      "aria-activedescendant": U ?? void 0,
      "aria-label": "Comments",
      className: v(
        "tw:flex tw:w-full tw:flex-col tw:space-y-3 tw:outline-hidden tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-1 tw:focus:ring-offset-background",
        t
      ),
      onKeyDown: M,
      children: S.map((O) => {
        const J = {
          classNameForVerseText: e,
          comments: O.comments,
          localizedStrings: n,
          verseRef: O.verseRef,
          handleSelectThread: _,
          threadId: O.id,
          thread: O,
          isRead: O.isRead,
          isSelected: T.has(O.id),
          currentUser: o,
          assignedUser: O.assignedUser,
          threadStatus: O.status,
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
          initialAssignedUser: D
        };
        return /* @__PURE__ */ a(
          "div",
          {
            className: v({
              "tw:opacity-60": O.status === "Resolved"
            }),
            children: O.type === "Conflict" ? /* @__PURE__ */ a(Wd, { ...J, conflictResolution: E }) : /* @__PURE__ */ a(xi, { ...J })
          },
          O.id
        );
      })
    }
  );
}
function Xd({ table: t }) {
  return /* @__PURE__ */ u(je, { children: [
    /* @__PURE__ */ a(Fe, { asChild: !0, children: /* @__PURE__ */ u(Y, { variant: "outline", size: "sm", className: "tw:ml-auto tw:hidden tw:h-8 tw:lg:flex", children: [
      /* @__PURE__ */ a(ms, { className: "tw:mr-2 tw:h-4 tw:w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ u(Ue, { align: "end", className: "tw:w-[150px]", children: [
      /* @__PURE__ */ a(Sr, { children: "Toggle columns" }),
      /* @__PURE__ */ a(er, {}),
      t.getAllColumns().filter((e) => e.getCanHide()).map((e) => /* @__PURE__ */ a(
        $e,
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
  return /* @__PURE__ */ a(Zt.Root, { "data-slot": "select", ...t });
}
function Jd({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    Zt.Group,
    {
      "data-slot": "select-group",
      className: v("tw:scroll-my-1 tw:p-1", t),
      ...e
    }
  );
}
function hr({ ...t }) {
  return /* @__PURE__ */ a(Zt.Value, { "data-slot": "select-value", ...t });
}
function gr({ className: t, size: e = "default", children: r, ...o }) {
  const n = ye();
  return /* @__PURE__ */ u(
    Zt.Trigger,
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
        /* @__PURE__ */ a(Zt.Icon, { asChild: !0, children: /* @__PURE__ */ a(Tn, { className: "tw:pointer-events-none tw:size-4 tw:text-muted-foreground" }) })
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
  // CUSTOM: Destructure style to merge with the shared z-index constant below
  style: n,
  ...i
}) {
  const s = ye();
  return /* @__PURE__ */ a(Zt.Portal, { children: /* @__PURE__ */ u(
    Zt.Content,
    {
      "data-slot": "select-content",
      "data-align-trigger": r === "item-aligned",
      className: v(
        "pr-twp tw:relative tw:max-h-(--radix-select-content-available-height) tw:data-[align-trigger=true]:min-w-(--radix-select-trigger-width) tw:data-[align-trigger=false]:min-w-36 tw:origin-(--radix-select-content-transform-origin) tw:overflow-x-hidden tw:overflow-y-auto tw:rounded-lg tw:bg-popover tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:data-[align-trigger=true]:animate-none tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95 tw:animate-none! tw:bg-popover/70 tw:before:-z-1 tw:**:data-[slot$=-item]:focus:bg-foreground/10 tw:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 tw:**:data-[slot$=-separator]:bg-foreground/5 tw:**:data-[slot$=-trigger]:focus:bg-foreground/10 tw:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! tw:**:data-[variant=destructive]:focus:bg-foreground/10! tw:**:data-[variant=destructive]:text-accent-foreground! tw:**:data-[variant=destructive]:**:text-accent-foreground! tw:relative tw:before:pointer-events-none tw:before:absolute tw:before:inset-0 tw:before:rounded-[inherit] tw:before:backdrop-blur-2xl tw:before:backdrop-saturate-150",
        r === "popper" && "tw:data-[side=bottom]:translate-y-1 tw:data-[side=left]:-translate-x-1 tw:rtl:data-[side=left]:translate-x-1 tw:data-[side=right]:translate-x-1 tw:rtl:data-[side=right]:-translate-x-1 tw:data-[side=top]:-translate-y-1",
        t
      ),
      style: { zIndex: ar, ...n },
      position: r,
      align: o,
      ...i,
      children: [
        /* @__PURE__ */ a(Zd, {}),
        /* @__PURE__ */ a(
          Zt.Viewport,
          {
            "data-position": r,
            className: v(
              "tw:data-[position=popper]:h-(--radix-select-trigger-height) tw:data-[position=popper]:w-full tw:data-[position=popper]:min-w-(--radix-select-trigger-width)",
              r === "popper" && "tw:"
            ),
            children: /* @__PURE__ */ a("div", { dir: s, children: e })
          }
        ),
        /* @__PURE__ */ a(Qd, {})
      ]
    }
  ) });
}
function vp({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    Zt.Label,
    {
      "data-slot": "select-label",
      className: v("pr-twp tw:px-1.5 tw:py-1 tw:text-xs tw:text-muted-foreground", t),
      ...e
    }
  );
}
function ue({
  className: t,
  children: e,
  ...r
}) {
  return /* @__PURE__ */ u(
    Zt.Item,
    {
      "data-slot": "select-item",
      className: v(
        "pr-twp tw:relative tw:flex tw:w-full tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:*:[span]:last:flex tw:*:[span]:last:items-center tw:*:[span]:last:gap-2",
        t
      ),
      ...r,
      children: [
        /* @__PURE__ */ a("span", { className: "tw:pointer-events-none tw:absolute tw:end-2 tw:flex tw:size-4 tw:items-center tw:justify-center", children: /* @__PURE__ */ a(Zt.ItemIndicator, { children: /* @__PURE__ */ a(oa, { className: "tw:pointer-events-none" }) }) }),
        /* @__PURE__ */ a(Zt.ItemText, { children: e })
      ]
    }
  );
}
function bp({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    Zt.Separator,
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
function Zd({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    Zt.ScrollUpButton,
    {
      "data-slot": "select-scroll-up-button",
      className: v(
        "pr-twp tw:z-10 tw:flex tw:cursor-default tw:items-center tw:justify-center tw:bg-popover tw:py-1 tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      ...e,
      children: /* @__PURE__ */ a(Zs, {})
    }
  );
}
function Qd({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    Zt.ScrollDownButton,
    {
      "data-slot": "select-scroll-down-button",
      className: v(
        "pr-twp tw:z-10 tw:flex tw:cursor-default tw:items-center tw:justify-center tw:bg-popover tw:py-1 tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      ...e,
      children: /* @__PURE__ */ a(Js, {})
    }
  );
}
function tw({ table: t }) {
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
        pr,
        {
          value: `${t.getState().pagination.pageSize}`,
          onValueChange: (e) => {
            t.setPageSize(Number(e));
          },
          children: [
            /* @__PURE__ */ a(gr, { className: "tw:h-8 tw:w-[70px]", children: /* @__PURE__ */ a(hr, { placeholder: t.getState().pagination.pageSize }) }),
            /* @__PURE__ */ a(fr, { side: "top", children: [10, 20, 30, 40, 50].map((e) => /* @__PURE__ */ a(ue, { value: `${e}`, children: e }, e)) })
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
        Y,
        {
          variant: "outline",
          size: "icon",
          className: "tw:hidden tw:h-8 tw:w-8 tw:p-0 tw:lg:flex",
          onClick: () => t.setPageIndex(0),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ a("span", { className: "tw:sr-only", children: "Go to first page" }),
            /* @__PURE__ */ a(vs, { className: "tw:h-4 tw:w-4" })
          ]
        }
      ),
      /* @__PURE__ */ u(
        Y,
        {
          variant: "outline",
          size: "icon",
          className: "tw:h-8 tw:w-8 tw:p-0",
          onClick: () => t.previousPage(),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ a("span", { className: "tw:sr-only", children: "Go to previous page" }),
            /* @__PURE__ */ a(bs, { className: "tw:h-4 tw:w-4" })
          ]
        }
      ),
      /* @__PURE__ */ u(
        Y,
        {
          variant: "outline",
          size: "icon",
          className: "tw:h-8 tw:w-8 tw:p-0",
          onClick: () => t.nextPage(),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ a("span", { className: "tw:sr-only", children: "Go to next page" }),
            /* @__PURE__ */ a(xs, { className: "tw:h-4 tw:w-4" })
          ]
        }
      ),
      /* @__PURE__ */ u(
        Y,
        {
          variant: "outline",
          size: "icon",
          className: "tw:hidden tw:h-8 tw:w-8 tw:p-0 tw:lg:flex",
          onClick: () => t.setPageIndex(t.getPageCount() - 1),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ a("span", { className: "tw:sr-only", children: "Go to last page" }),
            /* @__PURE__ */ a(ys, { className: "tw:h-4 tw:w-4" })
          ]
        }
      )
    ] })
  ] }) });
}
function ew({
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
  var D;
  const [w, p] = N([]), [h, g] = N([]), [f, x] = N({}), [m, E] = N({}), T = I(() => e ?? [], [e]), k = jn({
    data: T,
    columns: t,
    getCoreRowModel: Un(),
    ...r && { getPaginationRowModel: rl() },
    onSortingChange: p,
    getSortedRowModel: Fn(),
    onColumnFiltersChange: g,
    getFilteredRowModel: el(),
    onColumnVisibilityChange: x,
    onRowSelectionChange: E,
    state: {
      sorting: w,
      columnFilters: h,
      columnVisibility: f,
      rowSelection: m
    }
  }), z = k.getVisibleFlatColumns();
  let F;
  return l ? F = Array.from({ length: 10 }).map((S, V) => `skeleton-row-${V}`).map((S) => /* @__PURE__ */ a(Oe, { className: "tw:hover:bg-transparent", children: /* @__PURE__ */ a(cr, { colSpan: z.length ?? t.length, className: "tw:border-0 tw:p-0", children: /* @__PURE__ */ a("div", { className: "tw:w-full tw:py-2", children: /* @__PURE__ */ a(sr, { className: "tw:h-14 tw:w-full tw:rounded-md" }) }) }) }, S)) : ((D = k.getRowModel().rows) == null ? void 0 : D.length) > 0 ? F = k.getRowModel().rows.map(($) => /* @__PURE__ */ a(
    Oe,
    {
      onClick: () => s($, k),
      "data-state": $.getIsSelected() && "selected",
      children: $.getVisibleCells().map((P) => /* @__PURE__ */ a(cr, { children: kr(P.column.columnDef.cell, P.getContext()) }, P.id))
    },
    $.id
  )) : F = /* @__PURE__ */ a(Oe, { children: /* @__PURE__ */ a(cr, { colSpan: t.length, className: "tw:h-24 tw:text-center", children: d }) }), /* @__PURE__ */ u("div", { className: "pr-twp", id: c, children: [
    n && /* @__PURE__ */ a(Xd, { table: k }),
    /* @__PURE__ */ u(Ya, { stickyHeader: i, children: [
      /* @__PURE__ */ a(Wa, { stickyHeader: i, children: k.getHeaderGroups().map(($) => /* @__PURE__ */ a(Oe, { children: $.headers.map((P) => /* @__PURE__ */ a(Hr, { className: "tw:p-0", children: P.isPlaceholder ? void 0 : kr(P.column.columnDef.header, P.getContext()) }, P.id)) }, $.id)) }),
      /* @__PURE__ */ a(Xa, { children: F })
    ] }),
    r && /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:justify-end tw:space-x-2 tw:py-4", children: [
      /* @__PURE__ */ a(
        Y,
        {
          variant: "outline",
          size: "sm",
          onClick: () => k.previousPage(),
          disabled: !k.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ a(
        Y,
        {
          variant: "outline",
          size: "sm",
          onClick: () => k.nextPage(),
          disabled: !k.getCanNextPage(),
          children: "Next"
        }
      )
    ] }),
    r && o && /* @__PURE__ */ a(tw, { table: k })
  ] });
}
function xp({
  id: t,
  markdown: e,
  className: r,
  anchorTarget: o,
  truncate: n
}) {
  const i = I(
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
      children: /* @__PURE__ */ a(nl, { options: i, children: e })
    }
  );
}
const rw = Object.freeze([
  "%webView_error_dump_header%",
  "%webView_error_dump_info_message%"
]), rn = (t, e) => t[e] ?? e;
function aw({
  errorDetails: t,
  handleCopyNotify: e,
  localizedStrings: r,
  id: o
}) {
  const n = rn(r, "%webView_error_dump_header%"), i = rn(r, "%webView_error_dump_info_message%");
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
          /* @__PURE__ */ a(Y, { variant: "secondary", size: "icon", className: "size-8", onClick: () => s(), children: /* @__PURE__ */ a(xn, {}) })
        ] }),
        /* @__PURE__ */ a("div", { className: "tw:prose tw:w-full", children: /* @__PURE__ */ a("pre", { className: "tw:text-xs", children: t }) })
      ]
    }
  );
}
const yp = Object.freeze([
  ...rw,
  "%webView_error_dump_copied_message%"
]);
function kp({
  errorDetails: t,
  handleCopyNotify: e,
  localizedStrings: r,
  children: o,
  className: n,
  id: i
}) {
  const [s, c] = N(!1), l = () => {
    c(!0), e && e();
  };
  return /* @__PURE__ */ u(Pe, { onOpenChange: (w) => {
    w || c(!1);
  }, children: [
    /* @__PURE__ */ a(rr, { asChild: !0, children: o }),
    /* @__PURE__ */ u(Ve, { id: i, className: v("tw:min-w-80 tw:max-w-96", n), children: [
      s && r["%webView_error_dump_copied_message%"] && /* @__PURE__ */ a(zt, { children: r["%webView_error_dump_copied_message%"] }),
      /* @__PURE__ */ a(
        aw,
        {
          errorDetails: t,
          handleCopyNotify: l,
          localizedStrings: r
        }
      )
    ] })
  ] });
}
var ow = /* @__PURE__ */ ((t) => (t[t.Check = 0] = "Check", t[t.Radio = 1] = "Radio", t))(ow || {});
function _p({ id: t, label: e, groups: r }) {
  const [o, n] = N(
    Object.fromEntries(
      r.map(
        (d, w) => d.itemType === 0 ? [w, []] : void 0
      ).filter((d) => !!d)
    )
  ), [i, s] = N({}), c = (d, w) => {
    const p = !o[d][w];
    n((g) => (g[d][w] = p, { ...g }));
    const h = r[d].items[w];
    h.onUpdate(h.id, p);
  }, l = (d, w) => {
    s((h) => (h[d] = w, { ...h }));
    const p = r[d].items.find((h) => h.id === w);
    p ? p.onUpdate(w) : console.error(`Could not find dropdown radio item with id '${w}'!`);
  };
  return /* @__PURE__ */ a("div", { id: t, children: /* @__PURE__ */ u(je, { children: [
    /* @__PURE__ */ a(Fe, { asChild: !0, children: /* @__PURE__ */ u(Y, { variant: "default", children: [
      /* @__PURE__ */ a(ks, { size: 16, className: "tw:mr-2 tw:h-4 tw:w-4" }),
      e,
      /* @__PURE__ */ a(wr, { size: 16, className: "tw:ml-2 tw:h-4 tw:w-4" })
    ] }) }),
    /* @__PURE__ */ a(Ue, { children: r.map((d, w) => /* @__PURE__ */ u("div", { children: [
      /* @__PURE__ */ a(Sr, { children: d.label }),
      /* @__PURE__ */ a(hn, { children: d.itemType === 0 ? /* @__PURE__ */ a(lt, { children: d.items.map((p, h) => /* @__PURE__ */ a("div", { children: /* @__PURE__ */ a(
        $e,
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
          children: d.items.map((p) => /* @__PURE__ */ a("div", { children: /* @__PURE__ */ a(Hi, { value: p.id, children: p.label }) }, p.id))
        }
      ) }),
      /* @__PURE__ */ a(er, {})
    ] }, d.label)) })
  ] }) });
}
function Np({
  id: t,
  category: e,
  downloads: r,
  languages: o,
  moreInfoUrl: n,
  handleMoreInfoLinkClick: i,
  supportUrl: s,
  handleSupportLinkClick: c
}) {
  const l = new Nn("en", {
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
            /* @__PURE__ */ a(_s, { className: "tw:h-4 tw:w-4" }),
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
            Y,
            {
              onClick: () => i(),
              variant: "link",
              className: "tw:flex tw:h-auto tw:gap-1 tw:py-0 tw:text-xs tw:font-semibold tw:text-foreground",
              children: [
                "Website",
                /* @__PURE__ */ a(Ns, { className: "tw:h-4 tw:w-4" })
              ]
            }
          ) }),
          s && /* @__PURE__ */ a("div", { className: "tw:flex tw:gap-1", children: /* @__PURE__ */ u(
            Y,
            {
              onClick: () => c(),
              variant: "link",
              className: "tw:flex tw:h-auto tw:gap-1 tw:py-0 tw:text-xs tw:font-semibold tw:text-foreground",
              children: [
                "Support",
                /* @__PURE__ */ a(Cs, { className: "tw:h-4 tw:w-4" })
              ]
            }
          ) })
        ] })
      ]
    }
  );
}
function nw({ id: t, versionHistory: e }) {
  const [r, o] = N(!1), n = /* @__PURE__ */ new Date();
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
function Cp({
  id: t,
  publisherDisplayName: e,
  fileSize: r,
  locales: o,
  versionHistory: n,
  currentVersion: i
}) {
  const s = I(() => Fs(r), [r]), l = ((d) => {
    const w = new Intl.DisplayNames(Us(), { type: "language" });
    return d.map((p) => w.of(p));
  })(o);
  return /* @__PURE__ */ a("div", { id: t, className: "pr-twp tw:border-t tw:py-2", children: /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:gap-2 tw:divide-y", children: [
    Object.entries(n).length > 0 && /* @__PURE__ */ a(nw, { versionHistory: n }),
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
function Ep({
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
      Yi,
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
      return /* @__PURE__ */ u(Nr, { variant: "muted", className: "tw:flex tw:items-center tw:gap-1", children: [
        /* @__PURE__ */ a(
          Y,
          {
            variant: "ghost",
            size: "icon",
            className: "tw:h-4 tw:w-4 tw:p-0 tw:hover:bg-transparent",
            onClick: () => r(e.filter((f) => f !== h)),
            children: /* @__PURE__ */ a(Za, { className: "tw:h-3 tw:w-3" })
          }
        ),
        (g = t.find((f) => f.value === h)) == null ? void 0 : g.label
      ] }, h);
    }) }) : /* @__PURE__ */ a(zt, { children: w })
  ] });
}
function iw(t, e, r) {
  if (!e) return [...t];
  const o = [...t];
  if (r === "passive") {
    const n = e.replace(/^\+/, "");
    return Ao({
      query: n,
      items: o,
      filter: (i, s) => i.label.toLowerCase().startsWith(s.toLowerCase()),
      sortBy: "label"
    });
  }
  return Ao({ query: e, items: o, filterBy: "label" });
}
function yi(t) {
  return t.isComposing || t.keyCode === 229;
}
const ki = {
  // USFM marker characters that filter the palette. Hyphens (milestones `ts-s`/`ts-e`, `qt-s`,
  // `zpa-xb`) and letter case (custom markers may be capitalized; marker search is
  // case-insensitive) are valid wherever markers are filtered. `*` is NOT here: at a collapsed
  // caret it is the CLOSING-marker commit key (see the `*` branch below), so it can never reach
  // the filter.
  backslash: /^[a-z0-9+-]$/i,
  // Focused Enter-split menu: paragraph markers only (digits for q1/s2 etc.).
  enter: /^[a-z0-9]$/i,
  selection: /^[a-z0-9+-]$/i
}, sw = [
  " ",
  "Enter",
  "Escape",
  "Tab",
  "Backspace",
  "ArrowUp",
  "ArrowDown",
  "*",
  "\\"
], cw = [
  ..."abcdefghijklmnopqrstuvwxyz",
  ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  ..."0123456789",
  "+",
  "-"
];
function lw(t) {
  return [
    ...sw,
    ...cw.filter((e) => ki[t].test(e))
  ];
}
function we(t) {
  t.preventDefault(), t.stopPropagation();
}
function dw(t, e, r) {
  var o;
  if (yi(t) || t.key === "Shift" || t.key === "Control" || t.key === "Alt" || t.key === "Meta")
    return "passed";
  if (t.ctrlKey || t.metaKey || t.altKey)
    return r.dismiss(), "ended";
  if (t.key === "ArrowDown" || t.key === "ArrowUp")
    return we(t), r.update({ moveSelection: t.key === "ArrowDown" ? 1 : -1 }), "continue";
  if (t.key === "Enter")
    return we(t), iw(
      e.items.map((i) => ({ label: i.marker })),
      e.filter,
      e.kind === "backslash" ? "passive" : "active"
    ).length === 0 ? "continue" : (r.commit(), "ended");
  if (t.key === "Escape")
    return we(t), r.dismiss(), "ended";
  if (t.key === " ") {
    if (e.kind === "backslash")
      return we(t), (o = e.shouldSpaceCommit) != null && o.call(e, e.filter) ? (r.commit(), "ended") : (r.commitTyped(e.filter), r.dismiss(), "ended");
    if (e.kind === "selection") {
      we(t);
      const n = e.items.find((i) => i.marker === e.filter);
      return n && r.commitItem(n.marker), r.dismiss(), "ended";
    }
    return we(t), e.filter += " ", r.update({ filterText: e.filter }), "continue";
  }
  return t.key === "*" && e.kind !== "enter" ? (we(t), r.commitTypedCloser(e.filter), r.dismiss(), "ended") : t.key === "\\" && e.kind === "backslash" ? e.filter === "" ? (r.dismiss(), "ended") : (we(t), r.commitTypedAndReopen(e.filter), "ended") : t.key === "Backspace" && e.filter === "" ? (we(t), r.dismiss(), "ended") : t.key === "Backspace" || ki[e.kind].test(t.key) ? (we(t), e.filter = t.key === "Backspace" ? e.filter.slice(0, -1) : e.filter + t.key, r.update({ filterText: e.filter }), "continue") : (e.kind === "selection" && we(t), r.dismiss(), "ended");
}
function ka(t, e) {
  var r;
  ((r = t.current) == null ? void 0 : r.token) === e && (t.current = void 0);
}
const ww = Object.freeze([
  "%undoButton_tooltip%",
  "%redoButton_tooltip%"
]), an = (t, e) => t[e] ?? e;
function uw({
  onUndoClick: t,
  onRedoClick: e,
  canUndo: r = !0,
  canRedo: o = !0,
  localizedStrings: n = {},
  showKeyboardShortcuts: i = !0,
  className: s = "tw:h-6 tw:w-6",
  variant: c = "ghost"
}) {
  const l = Ha(), d = an(n, "%undoButton_tooltip%"), w = an(n, "%redoButton_tooltip%");
  return /* @__PURE__ */ u(Ga, { children: [
    /* @__PURE__ */ a(Bt, { children: /* @__PURE__ */ u(jt, { children: [
      /* @__PURE__ */ a(Ft, { asChild: !0, children: /* @__PURE__ */ a(
        Y,
        {
          "aria-label": d,
          className: s,
          size: "icon",
          onClick: t,
          disabled: !r,
          variant: c,
          children: /* @__PURE__ */ a(Es, {})
        }
      ) }),
      /* @__PURE__ */ a(Ut, { children: /* @__PURE__ */ u("p", { children: [
        d,
        i && /* @__PURE__ */ u(lt, { children: [
          " ",
          /* @__PURE__ */ a(za, { children: l ? "⌘Z" : "Ctrl+Z" })
        ] })
      ] }) })
    ] }) }),
    e && (c === "secondary" || c === "default") && /* @__PURE__ */ a(pn, {}),
    e && /* @__PURE__ */ a(Bt, { children: /* @__PURE__ */ u(jt, { children: [
      /* @__PURE__ */ a(Ft, { asChild: !0, children: /* @__PURE__ */ a(
        Y,
        {
          "aria-label": w,
          className: s,
          size: "icon",
          onClick: e,
          disabled: !o,
          variant: c,
          children: /* @__PURE__ */ a(Ts, {})
        }
      ) }),
      /* @__PURE__ */ a(Ut, { children: /* @__PURE__ */ u("p", { children: [
        w,
        i && /* @__PURE__ */ u(lt, { children: [
          " ",
          /* @__PURE__ */ a(za, { children: l ? "⌘⇧Z" : "Ctrl+Y" })
        ] })
      ] }) })
    ] }) })
  ] });
}
function pw({
  children: t,
  editorRef: e,
  canUndo: r = !0,
  canRedo: o = !0
}) {
  const n = K(null);
  return G(() => {
    var l;
    const i = Ha(), s = ((l = n.current) == null ? void 0 : l.querySelector(".editor-input")) ?? void 0, c = (d) => {
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
const hw = (t, e, r) => t === "generated" ? /* @__PURE__ */ u(lt, { children: [
  /* @__PURE__ */ a("p", { children: "+" }),
  " ",
  e["%footnoteEditor_callerDropdown_item_generated%"]
] }) : t === "hidden" ? /* @__PURE__ */ u(lt, { children: [
  /* @__PURE__ */ a("p", { children: "-" }),
  " ",
  e["%footnoteEditor_callerDropdown_item_hidden%"]
] }) : /* @__PURE__ */ u(lt, { children: [
  /* @__PURE__ */ a("p", { children: r }),
  " ",
  e["%footnoteEditor_callerDropdown_item_custom%"]
] });
function gw({
  callerType: t,
  updateCallerType: e,
  customCaller: r,
  updateCustomCaller: o,
  localizedStrings: n
}) {
  const i = K(null), s = K(null), c = K(!1), [l, d] = N(t), [w, p] = N(r), [h, g] = N(!1);
  G(() => {
    d(t);
  }, [t]), G(() => {
    w !== r && p(r);
  }, [r]);
  const f = (m) => {
    c.current = !1, g(m), m || (l !== "custom" || w ? (e(l), o(w)) : (d(t), p(r)));
  }, x = (m) => {
    var E, T, k, z;
    m.stopPropagation(), document.activeElement === s.current && m.key === "ArrowDown" || m.key === "ArrowRight" ? ((E = i.current) == null || E.focus(), c.current = !0) : document.activeElement === i.current && m.key === "ArrowUp" ? ((T = s.current) == null || T.focus(), c.current = !1) : document.activeElement === i.current && m.key === "ArrowLeft" && ((k = i.current) == null ? void 0 : k.selectionStart) === 0 && ((z = s.current) == null || z.focus(), c.current = !1), l === "custom" && m.key === "Enter" && (document.activeElement === s.current || document.activeElement === i.current) && f(!1);
  };
  return /* @__PURE__ */ u(je, { open: h, onOpenChange: f, children: [
    /* @__PURE__ */ a(Bt, { children: /* @__PURE__ */ u(jt, { children: [
      /* @__PURE__ */ a(Ft, { asChild: !0, children: /* @__PURE__ */ a(Fe, { asChild: !0, children: /* @__PURE__ */ a(Y, { variant: "outline", className: "tw:h-6", children: hw(t, n, r) }) }) }),
      /* @__PURE__ */ a(Ut, { children: n["%footnoteEditor_callerDropdown_tooltip%"] })
    ] }) }),
    /* @__PURE__ */ u(
      Ue,
      {
        style: { zIndex: gn },
        onClick: () => {
          c.current && (c.current = !1);
        },
        onKeyDown: x,
        onMouseMove: () => {
          var m;
          c.current && ((m = i.current) == null || m.focus());
        },
        children: [
          /* @__PURE__ */ a(Sr, { children: n["%footnoteEditor_callerDropdown_label%"] }),
          /* @__PURE__ */ a(er, {}),
          /* @__PURE__ */ a(
            $e,
            {
              checked: l === "generated",
              onCheckedChange: () => d("generated"),
              children: /* @__PURE__ */ u("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ a("span", { children: n["%footnoteEditor_callerDropdown_item_generated%"] }),
                /* @__PURE__ */ a("span", { className: "tw:w-10 tw:text-center", children: Aa })
              ] })
            }
          ),
          /* @__PURE__ */ a(
            $e,
            {
              checked: l === "hidden",
              onCheckedChange: () => d("hidden"),
              children: /* @__PURE__ */ u("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ a("span", { children: n["%footnoteEditor_callerDropdown_item_hidden%"] }),
                /* @__PURE__ */ a("span", { className: "tw:w-10 tw:text-center", children: Pa })
              ] })
            }
          ),
          /* @__PURE__ */ a(
            $e,
            {
              ref: s,
              checked: l === "custom",
              onCheckedChange: () => d("custom"),
              onClick: (m) => {
                var E;
                m.stopPropagation(), c.current = !0, (E = i.current) == null || E.focus();
              },
              onSelect: (m) => m.preventDefault(),
              children: /* @__PURE__ */ u("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ a("span", { children: n["%footnoteEditor_callerDropdown_item_custom%"] }),
                /* @__PURE__ */ a(
                  ra,
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
const fw = (t, e) => t === "f" ? /* @__PURE__ */ u(lt, { children: [
  /* @__PURE__ */ a(kn, {}),
  " ",
  e["%footnoteEditor_noteType_footnote_label%"]
] }) : t === "fe" ? /* @__PURE__ */ u(lt, { children: [
  /* @__PURE__ */ a(_n, {}),
  " ",
  e["%footnoteEditor_noteType_endNote_label%"]
] }) : /* @__PURE__ */ u(lt, { children: [
  /* @__PURE__ */ a(yn, {}),
  " ",
  e["%footnoteEditor_noteType_crossReference_label%"]
] }), mw = (t, e) => {
  if (t === "x")
    return e["%footnoteEditor_noteType_crossReference_label%"];
  let r = e["%footnoteEditor_noteType_endNote_label%"];
  return t === "f" && (r = e["%footnoteEditor_noteType_footnote_label%"]), tr(e["%footnoteEditor_noteType_tooltip%"] ?? "", {
    noteType: r
  });
};
function vw({
  noteType: t,
  handleNoteTypeChange: e,
  localizedStrings: r,
  isTypeSwitchable: o
}) {
  return /* @__PURE__ */ u(je, { children: [
    /* @__PURE__ */ a(Bt, { children: /* @__PURE__ */ u(jt, { children: [
      /* @__PURE__ */ a(Ft, { asChild: !0, children: /* @__PURE__ */ a(Fe, { asChild: !0, children: /* @__PURE__ */ a(Y, { variant: "outline", className: "tw:h-6", children: fw(t, r) }) }) }),
      /* @__PURE__ */ a(Ut, { children: /* @__PURE__ */ a("p", { children: mw(t, r) }) })
    ] }) }),
    /* @__PURE__ */ u(Ue, { style: { zIndex: gn }, children: [
      /* @__PURE__ */ a(Sr, { children: r["%footnoteEditor_noteTypeDropdown_label%"] }),
      /* @__PURE__ */ a(er, {}),
      /* @__PURE__ */ u(
        $e,
        {
          disabled: t !== "x" && !o,
          checked: t === "x",
          onCheckedChange: () => e("x"),
          className: "tw:gap-2",
          children: [
            /* @__PURE__ */ a(yn, {}),
            /* @__PURE__ */ a("span", { children: r["%footnoteEditor_noteType_crossReference_label%"] })
          ]
        }
      ),
      /* @__PURE__ */ u(
        $e,
        {
          disabled: t === "x" && !o,
          checked: t === "f",
          onCheckedChange: () => e("f"),
          className: "tw:gap-2",
          children: [
            /* @__PURE__ */ a(kn, {}),
            /* @__PURE__ */ a("span", { children: r["%footnoteEditor_noteType_footnote_label%"] })
          ]
        }
      ),
      /* @__PURE__ */ u(
        $e,
        {
          disabled: t === "x" && !o,
          checked: t === "fe",
          onCheckedChange: () => e("fe"),
          className: "tw:gap-2",
          children: [
            /* @__PURE__ */ a(_n, {}),
            /* @__PURE__ */ a("span", { children: r["%footnoteEditor_noteType_endNote_label%"] })
          ]
        }
      )
    ] })
  ] });
}
const bw = Object.freeze([
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
function xw({ icon: t, className: e }) {
  return /* @__PURE__ */ a(t ?? Ss, { className: e, size: 16 });
}
function yw({ state: t }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "marker-selection-state",
      className: "tw:flex tw:w-4 tw:min-w-4 tw:items-center tw:justify-center",
      children: t !== "none" && /* @__PURE__ */ a(Ie, { size: 16 })
    }
  );
}
function on({
  item: t,
  localizedStrings: e
}) {
  return /* @__PURE__ */ u(
    ze,
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
        t.selectionState !== void 0 && /* @__PURE__ */ a(yw, { state: t.selectionState }),
        /* @__PURE__ */ a("div", { className: "tw:w-8 tw:min-w-8", children: t.marker ? /* @__PURE__ */ a("span", { className: "tw:text-xs", children: t.marker }) : /* @__PURE__ */ a("div", { children: /* @__PURE__ */ a(xw, { icon: t.icon }) }) }),
        /* @__PURE__ */ u("div", { className: "tw:min-w-0 tw:flex-1", children: [
          /* @__PURE__ */ a("p", { className: "tw:truncate tw:text-sm", title: t.title, children: t.title }),
          t.subtitle && /* @__PURE__ */ a("p", { className: "tw:truncate tw:text-xs tw:text-muted-foreground", title: t.subtitle, children: t.subtitle })
        ] }),
        (t.isDisallowed || t.isDeprecated) && /* @__PURE__ */ a(Wi, { className: "tw:font-sans", children: t.isDisallowed ? e["%markerMenu_disallowed_label%"] : e["%markerMenu_deprecated_label%"] })
      ]
    }
  );
}
function kw({
  localizedStrings: t,
  markerMenuItems: e,
  searchRef: r,
  searchPlaceholder: o
}) {
  const [n, i] = N(""), [s, c] = I(() => {
    const l = n.trim().toLowerCase().replace(/^\+/, "");
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
  return /* @__PURE__ */ u(Le, { className: "tw:p-1", shouldFilter: !1, loop: !0, children: [
    /* @__PURE__ */ a(
      ta,
      {
        className: "marker-menu-search",
        ref: r,
        value: n,
        onValueChange: (l) => i(l),
        placeholder: o ?? t["%markerMenu_searchPlaceholder%"]
      }
    ),
    /* @__PURE__ */ u(Be, { children: [
      /* @__PURE__ */ a(ea, { children: t["%markerMenu_noResults%"] }),
      /* @__PURE__ */ a(Te, { children: s.map((l) => {
        var d;
        return /* @__PURE__ */ a(
          on,
          {
            item: l,
            localizedStrings: t
          },
          `item-${l.marker ?? ((d = l.icon) == null ? void 0 : d.displayName)}-${l.title.replaceAll(" ", "")}`
        );
      }) }),
      c.length > 0 && /* @__PURE__ */ u(lt, { children: [
        s.length > 0 && /* @__PURE__ */ a(fn, { alwaysRender: !0 }),
        /* @__PURE__ */ a(Te, { children: c.map((l) => {
          var d;
          return /* @__PURE__ */ a(
            on,
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
function _w(t, e, r, o) {
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
function Nw(t) {
  return {
    id: t.marker,
    label: t.marker,
    description: t.description,
    badge: t.kind === "closeTag" ? "%markerMenu_endTag_label%" : void 0,
    muted: !t.isBasic
  };
}
function Cw(t) {
  var r;
  const e = (r = t.attributes) == null ? void 0 : r.char;
  e.style && (e.style === "ft" && (e.style = "xt"), e.style === "fr" && (e.style = "xo"), e.style === "fq" && (e.style = "xq"));
}
function Ew(t) {
  var r;
  const e = (r = t.attributes) == null ? void 0 : r.char;
  e.style && (e.style === "xt" && (e.style = "ft"), e.style === "xo" && (e.style = "fr"), e.style === "xq" && (e.style = "fq"));
}
const Tw = {
  type: "USJ",
  version: "3.1",
  content: [
    {
      type: "para"
    }
  ]
};
function Tp({
  classNameForEditor: t,
  noteOps: e,
  onChange: r,
  onClose: o,
  scrRef: n,
  noteKey: i,
  editorOptions: s,
  defaultMarkerMenuTrigger: c,
  localizedStrings: l,
  parentEditorRef: d,
  markerPalette: w
}) {
  var ge;
  const p = K(null), h = K(null), g = K(null), f = K(null);
  ne(() => {
    if (!f.current) return;
    const { width: C } = f.current.getBoundingClientRect();
    C > 0 && (f.current.style.width = `${C}px`);
  }, []);
  const [x, m] = N("generated"), [E, T] = N("generated"), [k, z] = N("*"), [F, D] = N("*"), [$, P] = N("f"), [S, V] = N(!1), [W, _] = N(!0), [rt, U] = N(!1), Z = K(!1), M = K(""), [O, J] = N(!1), [ot, Pt] = N(), [Ot, Kt] = N(), [H, nt] = N(), [pt, st] = N(), gt = K(null), qt = K(void 0), Ct = K(0), bt = K(void 0), xt = I(
    () => ({
      ...s,
      // Drop any inherited context-menu extras (e.g. the main editor's "Insert footnote" /
      // "Insert cross-reference" / "Insert comment" items). Those items' onSelect closures are
      // bound to the OUTER main-document editorRef, so surfacing them inside this popover would
      // let a right-click here silently mutate the main document. The popover keeps only the
      // built-in Cut/Copy/Paste context-menu items.
      contextMenu: void 0,
      markerMenuTrigger: c,
      hasExternalUI: !0,
      view: {
        ...s.view ?? il(),
        noteMode: "expanded",
        // The wrapper paragraph is scaffolding (see PARAGRAPH_USJ above): suppress its `\p`
        // marker prefix so the popover's text starts with the footnote's own first glyph.
        showParaMarkerPrefixes: !1
      }
    }),
    [s, c]
  ), Gt = I(
    () => _w(
      p,
      () => J(!1),
      l,
      pt
    ),
    [l, pt]
  );
  G(() => {
    var C;
    O || (C = p.current) == null || C.focus();
  }, [$, O]);
  const yt = L(() => {
    var q, b, Q;
    const C = (q = h.current) == null ? void 0 : q.querySelector(".editor-input"), B = C == null ? void 0 : C.querySelector("span.note"), tt = (Q = (b = h.current) == null ? void 0 : b.ownerDocument.getSelection()) == null ? void 0 : Q.anchorNode;
    return !!B && !!tt && B.contains(tt);
  }, []);
  G(() => {
    var b, Q;
    let C, B, tt;
    Z.current = !1, bt.current = void 0, _(!0);
    const q = e == null ? void 0 : e.at(0);
    if (q && $r("note", q)) {
      const j = (b = q.insert.note) == null ? void 0 : b.caller;
      let at = "custom";
      j === Aa ? at = "generated" : j === Pa ? at = "hidden" : j && (z(j), D(j)), m(at), T(at), P(((Q = q.insert.note) == null ? void 0 : Q.style) ?? "f"), C = setTimeout(() => {
        var dt, ht, ft;
        (dt = p.current) == null || dt.applyUpdate([q]), (ht = p.current) == null || ht.selectNote(0), (ft = p.current) == null || ft.focus(), B = requestAnimationFrame(() => {
          tt = setTimeout(() => {
            var Nt, $t;
            yt() || ((Nt = p.current) == null || Nt.selectNote(0), ($t = p.current) == null || $t.focus());
          }, 0);
        });
      }, 0);
    }
    return () => {
      C && clearTimeout(C), B !== void 0 && cancelAnimationFrame(B), tt !== void 0 && clearTimeout(tt);
    };
  }, [e, i, yt]);
  const Vt = L(
    (C, B, tt = !1) => {
      var b, Q, j;
      const q = (Q = (b = p.current) == null ? void 0 : b.getNoteOps(0)) == null ? void 0 : Q.at(0);
      if (q && $r("note", q)) {
        if (q.insert.note) {
          let at;
          C === "custom" ? at = B : C === "generated" ? at = Aa : at = Pa, q.insert.note.caller = at;
        }
        r == null || r([q]), tt && d && i && ((j = d.current) == null || j.replaceEmbedUpdate(i, [q]));
      }
    },
    [i, r, d]
  ), R = L(() => {
    var C;
    qt.current || (C = p.current) == null || C.commitPendingMarkerEdits(), Vt(x, k, !0), o();
  }, [x, k, o, Vt]), kt = K(R);
  ne(() => {
    kt.current = R;
  });
  const _t = K({ book: n.book, chapterNum: n.chapterNum });
  ne(() => {
    (_t.current.book !== n.book || _t.current.chapterNum !== n.chapterNum) && (_t.current = { book: n.book, chapterNum: n.chapterNum }, kt.current());
  }, [n.book, n.chapterNum]);
  const re = () => {
    var B;
    const C = (B = h.current) == null ? void 0 : B.getElementsByClassName("editor-input")[0];
    C != null && C.textContent && navigator.clipboard.writeText(C.textContent);
  }, qe = L(
    (C) => {
      m(C), Vt(C, k);
    },
    [k, Vt]
  ), ce = L(
    (C) => {
      z(C), Vt(x, C);
    },
    [x, Vt]
  ), le = (C) => {
    var tt, q, b, Q, j;
    P(C);
    const B = (q = (tt = p.current) == null ? void 0 : tt.getNoteOps(0)) == null ? void 0 : q.at(0);
    if (B && $r("note", B)) {
      B.insert.note && (B.insert.note.style = C);
      const at = (Q = (b = B.insert.note) == null ? void 0 : b.contents) == null ? void 0 : Q.ops;
      $ !== "x" && C === "x" ? at == null || at.forEach((dt) => Cw(dt)) : $ === "x" && C !== "x" && (at == null || at.forEach((dt) => Ew(dt))), (j = p.current) == null || j.applyUpdate([B, { delete: 1 }]);
    }
  }, Ge = (C) => {
    st(C.contextMarker), U(C.canRedo);
  }, Et = L(
    (C) => {
      var tt, q, b, Q, j;
      const B = (q = (tt = p.current) == null ? void 0 : tt.getNoteOps(0)) == null ? void 0 : q.at(0);
      if (B && $r("note", B)) {
        C.content.length > 1 && setTimeout(() => {
          var ht;
          (ht = p.current) == null || ht.applyUpdate([{ retain: 2 }, { delete: 1 }]);
        }, 0);
        const at = (b = B.insert.note) == null ? void 0 : b.style, dt = (j = (Q = B.insert.note) == null ? void 0 : Q.contents) == null ? void 0 : j.ops;
        if (at || V(!1), V(
          at === "x" ? !!(dt != null && dt.every((ht) => {
            var Nt, $t;
            if (!((Nt = ht.attributes) != null && Nt.char)) return !0;
            const ft = (($t = ht.attributes) == null ? void 0 : $t.char).style;
            return ft === "xt" || ft === "xo" || ft === "xq";
          })) : !!(dt != null && dt.every((ht) => {
            var Nt, $t;
            if (!((Nt = ht.attributes) != null && Nt.char)) return !0;
            const ft = (($t = ht.attributes) == null ? void 0 : $t.char).style;
            return ft === "ft" || ft === "fr" || ft === "fq";
          }))
        ), !Z.current) {
          Z.current = !0, M.current = JSON.stringify(B), _(!0);
          return;
        }
        _(JSON.stringify(B) === M.current), Vt(x, k);
      } else
        V(!1), _(!0);
    },
    [x, k, Vt]
  ), ae = L(() => {
    const C = window.getSelection();
    if (g.current && Gt.length && C && C.rangeCount > 0) {
      const B = C.getRangeAt(0).getBoundingClientRect(), tt = g.current.getBoundingClientRect();
      Pt(B.left - tt.left), Kt(B.top - tt.top), nt(B.height), J(!0);
    }
  }, [Gt, g]), Rt = K(() => {
  }), Dt = L(
    (C, B, tt) => {
      const { anchorRect: q } = C;
      if (!w || !q) return;
      const { passive: b } = tt;
      Ct.current += 1;
      const Q = Ct.current;
      qt.current = {
        kind: b ? "backslash" : "selection",
        token: Q,
        filter: "",
        items: B
      }, w.show(B.map(Nw), q, b, {
        // The session owns these keys wherever focus ends up. Declared for the passive palette
        // too: it never takes focus, so this is inert there, but keeping one code path means a
        // palette that unexpectedly receives a key routes it to the session rather than acting
        // on it. The callback goes through a ref so it always runs the CURRENT handler — it is
        // captured once, here, and the session it drives is replaced on every reopen.
        keys: lw(b ? "backslash" : "selection"),
        onKey: (j) => Rt.current(j)
      }).then((j) => {
        var at, dt, ht, ft, Nt, $t;
        if (ka(qt, Q), j !== void 0) {
          if (!((at = p.current) != null && at.getSelection())) {
            const de = bt.current;
            de ? (dt = p.current) == null || dt.setSelection(de) : (ht = p.current) == null || ht.selectNote(0);
          }
          (ft = p.current) == null || ft.focus();
          const He = B.find((de) => de.marker === j);
          He && ((Nt = p.current) == null || Nt.applyMarkerMenuSelection(He, {
            trigger: "backslash",
            // ACTIVE palette: the trigger was claimed and never landed, so there is never a
            // literal prefix for the apply to clean up.
            literalPrefixLanded: !1
          }));
        } else b || ($t = p.current) == null || $t.focus();
      }).catch(() => {
        var j;
        ka(qt, Q), b || (j = p.current) == null || j.focus();
      });
    },
    [w]
  ), Ht = L(() => {
    var tt;
    const C = (tt = p.current) == null ? void 0 : tt.getMarkerMenuContext();
    if (!C) return !1;
    const B = sl(xt.styleInfo ?? cl, C);
    return B.length === 0 ? !1 : (Dt(C, B, { passive: !C.hasTextSelection }), !0);
  }, [Dt, xt.styleInfo]), oe = L(
    (C) => {
      const B = qt.current;
      if (!B || !w) return;
      dw(C, B, {
        // Overlay ops delegate to the host-supplied driver; the commit ops are EDITOR-side
        // applies this popover owns (it holds the editor ref). The table calls `dismiss()` right
        // after each, resolving the show promise `undefined` — which the openMarkerPalette
        // `.then` treats as a dismissal, so nothing double-applies.
        update: (q) => w.update(q),
        commit: () => w.commit(),
        dismiss: () => w.dismiss(),
        commitTyped: (q) => {
          var b;
          return (b = p.current) == null ? void 0 : b.commitTypedMarker(q);
        },
        commitTypedAndReopen: (q) => {
          var b;
          (b = p.current) == null || b.commitTypedMarker(q, { trailingSpace: !1 }), Ht();
        },
        commitTypedCloser: (q) => {
          var b;
          return (b = p.current) == null ? void 0 : b.commitTypedCloser(q);
        },
        commitItem: (q) => {
          var Q;
          const b = B.items.find((j) => j.marker === q);
          b && ((Q = p.current) == null || Q.applyMarkerMenuSelection(b, {
            trigger: "backslash",
            literalPrefixLanded: !1
          }));
        }
      }) === "ended" && ka(qt, B.token);
    },
    [w, Ht]
  );
  G(() => {
    Rt.current = oe;
  }, [oe]), G(() => {
    const C = (B) => {
      var b, Q;
      const tt = (b = h.current) == null ? void 0 : b.querySelector(".editor-input");
      if (!tt || B.target !== tt) return;
      const q = (Q = p.current) == null ? void 0 : Q.getSelection();
      q && (bt.current = q);
    };
    return document.addEventListener("focusout", C), () => document.removeEventListener("focusout", C);
  }, []), G(() => {
    const C = () => {
      O && J(!1);
    };
    return window.addEventListener("click", C), () => {
      window.removeEventListener("click", C);
    };
  }, [O]), G(() => {
    var C;
    O && ((C = gt.current) == null || C.focus());
  }, [O]), G(() => {
    var tt, q;
    const C = ((tt = h.current) == null ? void 0 : tt.querySelector(".editor-input")) ?? void 0;
    if (((q = xt.view) == null ? void 0 : q.markerMode) === "editable") {
      const b = (j) => {
        var dt, ht, ft, Nt;
        if (yi(j) || !C || document.activeElement !== C) return;
        if (qt.current && w) {
          Rt.current(j);
          return;
        }
        if (j.key === "Enter" && !yt()) {
          j.preventDefault(), j.stopPropagation(), (dt = p.current) == null || dt.selectNote(0), (ht = p.current) == null || ht.focus();
          return;
        }
        if (w && j.key === c) {
          if (!yt()) {
            j.preventDefault(), j.stopPropagation(), (ft = p.current) == null || ft.selectNote(0), (Nt = p.current) == null || Nt.focus();
            return;
          }
          Ht() && (j.preventDefault(), j.stopPropagation());
        }
      }, Q = () => {
        var j, at;
        !C || document.activeElement !== C || yt() || ((j = p.current) == null || j.selectNote(0), (at = p.current) == null || at.focus());
      };
      return document.addEventListener("keydown", b, { capture: !0 }), document.addEventListener("paste", Q, { capture: !0 }), () => {
        document.removeEventListener("keydown", b, { capture: !0 }), document.removeEventListener("paste", Q, { capture: !0 });
      };
    }
    const B = (b) => {
      !O && C && document.activeElement === C && b.key === c ? (b.preventDefault(), ae()) : O && b.key === "Escape" && (b.preventDefault(), J(!1));
    };
    return document.addEventListener("keydown", B), () => {
      document.removeEventListener("keydown", B);
    };
  }, [
    O,
    ae,
    c,
    (ge = xt.view) == null ? void 0 : ge.markerMode,
    xt.styleInfo,
    w,
    Ht,
    yt
  ]), G(() => {
    var tt;
    const C = ((tt = h.current) == null ? void 0 : tt.querySelector(".editor-input")) ?? void 0, B = () => {
      var q, b;
      !C || document.activeElement !== C || yt() || ((q = p.current) == null || q.selectNote(0), (b = p.current) == null || b.focus());
    };
    return document.addEventListener("pointerup", B), document.addEventListener("selectionchange", B), () => {
      document.removeEventListener("pointerup", B), document.removeEventListener("selectionchange", B);
    };
  }, [yt]);
  const Qt = l["%footnoteEditor_copyButton_tooltip%"];
  return /* @__PURE__ */ u(lt, { children: [
    /* @__PURE__ */ u("div", { ref: f, className: "footnote-editor tw:grid tw:gap-[12px]", children: [
      /* @__PURE__ */ u("div", { className: "tw:flex", children: [
        /* @__PURE__ */ u("div", { className: "tw:flex tw:gap-4", children: [
          /* @__PURE__ */ a(
            vw,
            {
              isTypeSwitchable: S,
              noteType: $,
              handleNoteTypeChange: le,
              localizedStrings: l
            }
          ),
          /* @__PURE__ */ a(
            gw,
            {
              callerType: x,
              updateCallerType: qe,
              customCaller: k,
              updateCustomCaller: ce,
              localizedStrings: l
            }
          )
        ] }),
        /* @__PURE__ */ a("div", { className: "tw:flex tw:w-full tw:justify-end", children: /* @__PURE__ */ u(Ga, { children: [
          /* @__PURE__ */ a(
            uw,
            {
              onUndoClick: () => {
                var C;
                return (C = p.current) == null ? void 0 : C.undo();
              },
              onRedoClick: () => {
                var C;
                return (C = p.current) == null ? void 0 : C.redo();
              },
              canUndo: !W,
              canRedo: rt,
              localizedStrings: l
            }
          ),
          /* @__PURE__ */ a(
            gi,
            {
              onCancelClick: o,
              onAcceptClick: R,
              canAccept: !W || E !== x || x === "custom" && k !== F,
              localizedStrings: l,
              acceptLabel: l["%footnoteEditor_saveButton_tooltip%"]
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
            /* @__PURE__ */ a("div", { className: t, children: /* @__PURE__ */ a(
              pw,
              {
                editorRef: p,
                canUndo: !W,
                canRedo: rt,
                children: /* @__PURE__ */ a(
                  ll,
                  {
                    options: xt,
                    onStateChange: Ge,
                    onUsjChange: Et,
                    defaultUsj: Tw,
                    onScrRefChange: () => {
                    },
                    scrRef: n,
                    ref: p
                  }
                )
              }
            ) }),
            /* @__PURE__ */ a("div", { className: "tw:absolute tw:bottom-0 tw:right-0", children: /* @__PURE__ */ a(Bt, { children: /* @__PURE__ */ u(jt, { children: [
              /* @__PURE__ */ a(Ft, { asChild: !0, children: /* @__PURE__ */ a(
                Y,
                {
                  "aria-label": Qt,
                  onClick: re,
                  className: "tw:h-6 tw:w-6",
                  variant: "ghost",
                  size: "icon",
                  children: /* @__PURE__ */ a(xn, {})
                }
              ) }),
              /* @__PURE__ */ a(Ut, { children: /* @__PURE__ */ a("p", { children: Qt }) })
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
    /* @__PURE__ */ u(Pe, { open: O, children: [
      /* @__PURE__ */ a(
        Xi,
        {
          className: "tw:absolute",
          style: {
            top: Ot,
            left: ot,
            height: H,
            width: 0,
            pointerEvents: "none"
          }
        }
      ),
      /* @__PURE__ */ a(
        Ve,
        {
          className: "tw:w-[500px] tw:p-0",
          onClick: (C) => {
            C.preventDefault(), C.stopPropagation();
          },
          children: /* @__PURE__ */ a(
            kw,
            {
              markerMenuItems: Gt,
              localizedStrings: l,
              searchRef: gt
            }
          )
        }
      )
    ] })
  ] });
}
const Sp = Object.freeze([
  ...bw,
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
  ...ww,
  ...hi
]);
function Sw(t, e, r = !0, o = void 0) {
  if (!e || e.length === 0) return;
  const n = [], i = [];
  let s = [];
  return e.forEach((c) => {
    typeof c != "string" && c.marker === "fp" ? (s.length > 0 && i.push(s), s = [c]) : s.push(c);
  }), s.length > 0 && i.push(s), i.map((c, l) => {
    const d = l === i.length - 1;
    return (
      // A footnote's paragraphs have no stable id, and keying on their CONTENT is what produced
      // duplicate keys (two `\fp` paragraphs collide). This list is a read-only projection
      // re-rendered wholesale and never reordered, so the identity the rule protects cannot be
      // lost here. See the note above.
      // eslint-disable-next-line react/no-array-index-key
      /* @__PURE__ */ u("p", { children: [
        go(t, c, r, !0, n),
        d && o
      ] }, `para-${l}`)
    );
  });
}
function go(t, e, r = !0, o = !0, n = []) {
  if (!(!e || e.length === 0))
    return e.map((i, s) => {
      const c = `part-${s}`;
      if (typeof i == "string") {
        if (o) {
          const l = v(`usfm_${t}`);
          return /* @__PURE__ */ a("span", { className: l, children: i }, c);
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
          c
        );
      }
      return zw(i, c, r, [
        ...n,
        t ?? "unknown"
      ]);
    });
}
function zw(t, e, r, o = []) {
  const { marker: n } = t;
  return /* @__PURE__ */ u("span", { children: [
    n ? r && /* @__PURE__ */ a("span", { className: "marker", children: `\\${n} ` }) : /* @__PURE__ */ a(
      Ma,
      {
        className: "tw:text-error tw:mr-1 tw:inline-block tw:h-4 tw:w-4",
        "aria-label": "Missing marker"
      }
    ),
    go(n, t.content, r, !0, [
      ...o,
      n ?? "unknown"
    ])
  ] }, e);
}
function Rw({
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
  ] }), p = s && /* @__PURE__ */ u(lt, { children: [
    go(t.marker, [s], o, !1),
    " "
  ] }), h = e === "horizontal" ? "horizontal" : "vertical", g = o ? "marker-visible" : "", f = e === "horizontal" ? "tw:col-span-1" : "tw:col-span-2 tw:col-start-1 tw:row-start-2", x = v(h, g);
  return /* @__PURE__ */ u(lt, { children: [
    /* @__PURE__ */ u("div", { className: v("textual-note-header tw:col-span-1 tw:w-fit tw:text-nowrap", x), children: [
      l,
      w
    ] }),
    /* @__PURE__ */ a("div", { className: v("textual-note-header tw:col-span-1 tw:w-fit tw:text-nowrap", x), children: p }),
    /* @__PURE__ */ a(
      "div",
      {
        className: v(
          "textual-note-body tw:flex tw:flex-col tw:gap-1",
          f,
          x
        ),
        children: c && c.length > 0 && /* @__PURE__ */ a(lt, { children: Sw(t.marker, c, o, d) })
      }
    )
  ] });
}
function zp({
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
  const w = l ?? Ks(r, void 0), p = (k, z) => {
    d == null || d(k, z, n);
  }, h = i ? r.findIndex((k) => k === i) : -1, [g, f] = N(h), x = (k, z, F) => {
    if (r.length)
      switch (k.key) {
        case "Enter":
        case " ":
          k.preventDefault(), d == null || d(z, F, n);
          break;
      }
  }, m = (k) => {
    if (r.length)
      switch (k.key) {
        case "ArrowDown":
          k.preventDefault(), f((z) => Math.min(z + 1, r.length - 1));
          break;
        case "ArrowUp":
          k.preventDefault(), f((z) => Math.max(z - 1, 0));
          break;
      }
  }, E = K([]);
  G(() => {
    var k;
    g >= 0 && g < E.current.length && ((k = E.current[g]) == null || k.focus());
  }, [g]);
  const T = i ? r.findIndex((k) => k === i) : -1;
  return G(() => {
    var k;
    T < 0 || T >= E.current.length || (k = E.current[T]) == null || k.scrollIntoView({ block: "nearest" });
  }, [T]), /* @__PURE__ */ a(
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
          children: r.map((k, z) => {
            const F = k === i, D = `${n}-${z}`;
            return (
              // The key belongs on the outermost node returned from the map — the Fragment — not on
              // the `<li>` nested inside it, which leaves the Fragment itself unkeyed.
              /* @__PURE__ */ u(Jt.Fragment, { children: [
                /* @__PURE__ */ a(
                  "li",
                  {
                    ref: ($) => {
                      E.current[z] = $;
                    },
                    role: "option",
                    "aria-selected": F,
                    "data-marker": k.marker,
                    "data-state": F ? "selected" : void 0,
                    tabIndex: z === g ? 0 : -1,
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
                    onClick: () => p(k, z),
                    onKeyDown: ($) => x($, k, z),
                    children: /* @__PURE__ */ a(
                      Rw,
                      {
                        footnote: k,
                        layout: o,
                        formatCaller: () => w(k.caller, z),
                        showMarkers: s
                      }
                    )
                  }
                ),
                z < r.length - 1 && o === "vertical" && /* @__PURE__ */ a(Cr, { tabIndex: -1, className: "tw:col-span-2" })
              ] }, D)
            );
          })
        }
      )
    }
  );
}
function Dw(t) {
  const e = [];
  let r = 0;
  const o = /\\\\(.+?)\\\\/g;
  let n;
  for (; (n = o.exec(t)) !== null; )
    n.index > r && e.push(t.substring(r, n.index)), e.push(/* @__PURE__ */ a("strong", { children: n[1] }, n.index)), r = o.lastIndex;
  return r < t.length && e.push(t.substring(r)), e.length > 0 ? e : [t];
}
function Mw({
  occurrenceData: t,
  setScriptureReference: e,
  localizedStrings: r,
  classNameForText: o
}) {
  const n = r["%webView_inventory_occurrences_table_header_reference%"], i = r["%webView_inventory_occurrences_table_header_occurrence%"], s = I(() => {
    const c = [], l = /* @__PURE__ */ new Set();
    return t.forEach((d) => {
      const w = `${d.reference.book}:${d.reference.chapterNum}:${d.reference.verseNum}:${d.text}`;
      l.has(w) || (l.add(w), c.push(d));
    }), c;
  }, [t]);
  return /* @__PURE__ */ u(Ya, { stickyHeader: !0, children: [
    /* @__PURE__ */ a(Wa, { stickyHeader: !0, children: /* @__PURE__ */ u(Oe, { children: [
      /* @__PURE__ */ a(Hr, { children: n }),
      /* @__PURE__ */ a(Hr, { children: i })
    ] }) }),
    /* @__PURE__ */ a(Xa, { children: s.length > 0 && s.map((c) => /* @__PURE__ */ u(
      Oe,
      {
        onClick: () => {
          e(c.reference);
        },
        children: [
          /* @__PURE__ */ a(cr, { children: Ce(c.reference, "English") }),
          /* @__PURE__ */ a(cr, { className: o, children: Dw(c.text) })
        ]
      },
      `${c.reference.book} ${c.reference.chapterNum}:${c.reference.verseNum}-${c.text}`
    )) })
  ] });
}
function _i({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    Oo.Root,
    {
      "data-slot": "checkbox",
      className: v(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:peer tw:relative tw:flex tw:size-4 tw:shrink-0 tw:items-center tw:justify-center tw:rounded-[4px] tw:border tw:border-input tw:transition-colors tw:outline-none tw:group-has-disabled/field:opacity-50 tw:after:absolute tw:after:-inset-x-3 tw:after:-inset-y-2 tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:aria-invalid:aria-checked:border-primary tw:dark:bg-input/30 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40 tw:data-checked:border-primary tw:data-checked:bg-primary tw:data-checked:text-primary-foreground tw:dark:data-checked:bg-primary",
        t
      ),
      ...e,
      children: /* @__PURE__ */ a(
        Oo.Indicator,
        {
          "data-slot": "checkbox-indicator",
          className: "tw:grid tw:place-content-center tw:text-current tw:transition-none tw:[&>svg]:size-3.5",
          children: /* @__PURE__ */ a(oa, {})
        }
      )
    }
  );
}
const Ow = (t) => {
  if (t === "asc")
    return /* @__PURE__ */ a(Ms, { className: "tw:h-4 tw:w-4" });
  if (t === "desc")
    return /* @__PURE__ */ a(Os, { className: "tw:h-4 tw:w-4" });
}, ia = (t, e, r) => /* @__PURE__ */ a(Bt, { children: /* @__PURE__ */ u(jt, { children: [
  /* @__PURE__ */ u(
    Ft,
    {
      className: v("tw:flex tw:w-full tw:justify-start", r),
      variant: "ghost",
      onClick: () => t.toggleSorting(void 0),
      children: [
        /* @__PURE__ */ a("span", { className: "tw:w-6 tw:max-w-fit tw:flex-1 tw:overflow-hidden tw:text-ellipsis", children: e }),
        Ow(t.getIsSorted())
      ]
    }
  ),
  /* @__PURE__ */ a(Ut, { side: "bottom", children: e })
] }) }), Rp = (t) => ({
  accessorKey: "item",
  accessorFn: (e) => e.items[0],
  header: ({ column: e }) => ia(e, t)
}), $w = (t, e) => ({
  accessorKey: `item${e}`,
  accessorFn: (r) => r.items[e],
  header: ({ column: r }) => ia(r, t)
}), Dp = (t) => ({
  accessorKey: "count",
  header: ({ column: e }) => ia(e, t, "tw:justify-end"),
  cell: ({ row: e }) => /* @__PURE__ */ a("div", { className: "tw:flex tw:justify-end tw:tabular-nums", children: e.getValue("count") })
}), _a = (t, e, r, o, n, i) => {
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
  header: ({ column: i }) => ia(i, t, "tw:justify-center"),
  cell: ({ row: i }) => {
    const s = i.getValue("status"), c = i.getValue("item");
    return (
      // Center the status buttons in the cell to match the centered status column header (the
      // ToggleGroup would otherwise sit left-aligned).
      /* @__PURE__ */ a("div", { className: "tw:flex tw:justify-center", children: /* @__PURE__ */ u(un, { value: s, variant: "outline", type: "single", className: "tw:gap-0", children: [
        /* @__PURE__ */ a(
          Lr,
          {
            onClick: (l) => {
              l.stopPropagation(), _a(
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
            children: /* @__PURE__ */ a(zs, {})
          }
        ),
        /* @__PURE__ */ a(
          Lr,
          {
            onClick: (l) => {
              l.stopPropagation(), _a(
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
            children: /* @__PURE__ */ a(Rs, {})
          }
        ),
        /* @__PURE__ */ a(
          Lr,
          {
            onClick: (l) => {
              l.stopPropagation(), _a(
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
            children: /* @__PURE__ */ a(Ds, {})
          }
        )
      ] }) })
    );
  }
}), Op = (t) => t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g), $p = (t) => {
  const e = /^\\[vc]\s+(\d+)/, r = t.match(e);
  if (r)
    return +r[1];
}, Ip = (t) => {
  const e = t.match(/^\\id\s+([A-Za-z]+)/);
  return e ? e[1] : "";
}, Iw = (t, e, r) => r.includes(t) ? "unapproved" : e.includes(t) ? "approved" : "unknown", Ap = Object.freeze([
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
]), Aw = (t, e, r) => {
  let o = t;
  return e !== "all" && (o = o.filter(
    (n) => e === "approved" && n.status === "approved" || e === "unapproved" && n.status === "unapproved" || e === "unknown" && n.status === "unknown"
  )), r !== "" && (o = o.filter((n) => n.items[0].includes(r))), o;
}, Pw = (t, e, r) => t.map((o) => {
  const n = Co(o.key) ? o.key : o.key[0];
  return {
    items: Co(o.key) ? [o.key] : o.key,
    count: o.count,
    status: o.status || Iw(n, e, r),
    occurrences: o.occurrences || []
  };
}), me = (t, e) => t[e] ?? e;
function Pp({
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
  const g = me(r, "%webView_inventory_all%"), f = me(r, "%webView_inventory_approved%"), x = me(r, "%webView_inventory_unapproved%"), m = me(r, "%webView_inventory_unknown%"), E = me(r, "%webView_inventory_scope_currentBook%"), T = me(r, "%webView_inventory_scope_chapter%"), k = me(r, "%webView_inventory_scope_verse%"), z = me(r, "%webView_inventory_filter_text%"), F = me(
    r,
    "%webView_inventory_show_additional_items%"
  ), D = me(r, "%webView_inventory_no_results%"), [$, P] = N(!1), [S, V] = N("all"), [W, _] = N(""), [rt, U] = N([]), Z = I(() => {
    const H = t ?? [];
    return H.length === 0 ? [] : Pw(H, n, i);
  }, [t, n, i]), M = I(() => {
    if ($) return Z;
    const H = [];
    return Z.forEach((nt) => {
      const pt = nt.items[0], st = H.find(
        (gt) => gt.items[0] === pt
      );
      st ? (st.count += nt.count, st.occurrences = st.occurrences.concat(nt.occurrences)) : H.push({
        items: [pt],
        count: nt.count,
        occurrences: nt.occurrences,
        status: nt.status
      });
    }), H;
  }, [$, Z]), O = I(() => M.length === 0 ? [] : Aw(M, S, W), [M, S, W]), J = I(() => {
    var pt, st;
    if (!$) return l;
    const H = (pt = o == null ? void 0 : o.tableHeaders) == null ? void 0 : pt.length;
    if (!H) return l;
    const nt = [];
    for (let gt = 0; gt < H; gt++)
      nt.push(
        $w(
          ((st = o == null ? void 0 : o.tableHeaders) == null ? void 0 : st[gt]) || "Additional Item",
          gt + 1
        )
      );
    return [...nt, ...l];
  }, [o == null ? void 0 : o.tableHeaders, l, $]);
  G(() => {
    O.length === 0 ? U([]) : O.length === 1 && U(O[0].items);
  }, [O]);
  const ot = (H, nt) => {
    nt.setRowSelection(() => {
      const st = {};
      return st[H.index] = !0, st;
    });
    const pt = H.original.items;
    U(pt), h && pt.length > 0 && h(pt[0]);
  }, Pt = (H) => {
    if (H === "book" || H === "chapter" || H === "verse")
      c(H);
    else
      throw new Error(`Invalid scope value: ${H}`);
  }, Ot = (H) => {
    if (H === "all" || H === "approved" || H === "unapproved" || H === "unknown")
      V(H);
    else
      throw new Error(`Invalid status filter value: ${H}`);
  }, Kt = I(() => {
    if (M.length === 0 || rt.length === 0) return [];
    const H = M.filter((nt) => qs(
      $ ? nt.items : [nt.items[0]],
      rt
    ));
    if (H.length > 1) throw new Error("Selected item is not unique");
    return H.length === 0 ? [] : H[0].occurrences;
  }, [rt, $, M]);
  return /* @__PURE__ */ a("div", { id: d, className: "pr-twp tw:h-full tw:overflow-auto", children: /* @__PURE__ */ u("div", { className: "tw:flex tw:h-full tw:w-full tw:min-w-min tw:flex-col", children: [
    /* @__PURE__ */ u("div", { className: "tw:flex tw:items-stretch", style: { contain: "inline-size" }, children: [
      /* @__PURE__ */ u(
        pr,
        {
          onValueChange: (H) => Ot(H),
          defaultValue: S,
          children: [
            /* @__PURE__ */ a(gr, { className: "tw:m-1 tw:w-auto tw:flex-1", children: /* @__PURE__ */ a(hr, { placeholder: "Select filter" }) }),
            /* @__PURE__ */ u(fr, { children: [
              /* @__PURE__ */ a(ue, { value: "all", children: g }),
              /* @__PURE__ */ a(ue, { value: "approved", children: f }),
              /* @__PURE__ */ a(ue, { value: "unapproved", children: x }),
              /* @__PURE__ */ a(ue, { value: "unknown", children: m })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ u(pr, { onValueChange: (H) => Pt(H), defaultValue: s, children: [
        /* @__PURE__ */ a(gr, { className: "tw:m-1 tw:w-auto tw:flex-1", children: /* @__PURE__ */ a(hr, { placeholder: "Select scope" }) }),
        /* @__PURE__ */ u(fr, { children: [
          /* @__PURE__ */ a(ue, { value: "book", children: E }),
          /* @__PURE__ */ a(ue, { value: "chapter", children: T }),
          /* @__PURE__ */ a(ue, { value: "verse", children: k })
        ] })
      ] }),
      /* @__PURE__ */ a(
        ra,
        {
          className: "tw:m-1 tw:flex-1 tw:rounded-md tw:border",
          placeholder: z,
          value: W,
          onChange: (H) => {
            _(H.target.value);
          }
        }
      ),
      o && /* @__PURE__ */ a(Bt, { children: /* @__PURE__ */ u(jt, { children: [
        /* @__PURE__ */ a(Ft, { asChild: !0, children: /* @__PURE__ */ u("div", { className: "tw:m-1 tw:flex tw:w-fit tw:min-w-[26px] tw:items-center tw:rounded-md tw:border", children: [
          /* @__PURE__ */ a(
            _i,
            {
              className: "tw:m-1 tw:shrink-0",
              checked: $,
              onCheckedChange: (H) => {
                P(H);
              }
            }
          ),
          /* @__PURE__ */ a(zt, { className: "tw:m-1 tw:truncate", children: (o == null ? void 0 : o.checkboxText) ?? F })
        ] }) }),
        /* @__PURE__ */ a(Ut, { children: (o == null ? void 0 : o.checkboxText) ?? F })
      ] }) })
    ] }),
    /* @__PURE__ */ a("div", { className: "tw:m-1 tw:flex-1 tw:overflow-auto tw:rounded-md tw:border", children: /* @__PURE__ */ a(
      ew,
      {
        columns: J,
        data: O,
        onRowClickHandler: ot,
        stickyHeader: !0,
        isLoading: w,
        noResultsMessage: D
      }
    ) }),
    Kt.length > 0 && /* @__PURE__ */ a("div", { className: "tw:m-1 tw:flex-1 tw:overflow-auto tw:rounded-md tw:border", children: /* @__PURE__ */ a(
      Mw,
      {
        classNameForText: p,
        occurrenceData: Kt,
        setScriptureReference: e,
        localizedStrings: r
      }
    ) })
  ] }) });
}
const Vw = "16rem", Lw = "3rem", Ni = Jt.createContext(void 0);
function sa() {
  const t = Jt.useContext(Ni);
  if (!t)
    throw new Error("useSidebar must be used within a SidebarProvider.");
  return t;
}
function Bw({
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
  const [l, d] = Jt.useState(t), w = e ?? l, p = Jt.useCallback(
    (k) => {
      const z = typeof k == "function" ? k(w) : k;
      r ? r(z) : d(z);
    },
    [r, w]
  ), h = Jt.useCallback(() => p((k) => !k), [p]), g = w ? "expanded" : "collapsed", m = ye() === "ltr" ? s : s === "primary" ? "secondary" : "primary", E = Jt.useMemo(
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
  ), T = {
    "--sidebar-width": Vw,
    "--sidebar-width-icon": Lw,
    ...n
  };
  return /* @__PURE__ */ a(Ni.Provider, { value: E, children: /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "sidebar-wrapper",
      style: T,
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
function jw({
  // CUSTOM: Removed 'side' prop from Sidebar - it is now read from context (moved to SidebarProvider)
  variant: t = "sidebar",
  collapsible: e = "offcanvas",
  className: r,
  children: o,
  ...n
}) {
  const i = sa();
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
function Vp({ className: t, onClick: e, ...r }) {
  const { toggleSidebar: o, side: n } = sa();
  return /* @__PURE__ */ u(
    Y,
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
        n === "primary" ? /* @__PURE__ */ a(Qs, {}) : /* @__PURE__ */ a(tc, {}),
        /* @__PURE__ */ a("span", { className: "tw:sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
}
function Lp({ className: t, ...e }) {
  const { toggleSidebar: r } = sa();
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
function Fw({ className: t, ...e }) {
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
    ra,
    {
      "data-slot": "sidebar-input",
      "data-sidebar": "input",
      className: v("tw:h-8 tw:w-full tw:bg-background tw:shadow-none", t),
      ...e
    }
  );
}
function jp({ className: t, ...e }) {
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
function Fp({ className: t, ...e }) {
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
function Up({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    Cr,
    {
      "data-slot": "sidebar-separator",
      "data-sidebar": "separator",
      className: v("tw:mx-2 tw:w-auto tw:bg-sidebar-border", t),
      ...e
    }
  );
}
function Uw({ className: t, ...e }) {
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
function nn({ className: t, ...e }) {
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
function sn({
  className: t,
  asChild: e = !1,
  ...r
}) {
  const o = e ? Dr.Root : "div";
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
function Kp({
  className: t,
  asChild: e = !1,
  ...r
}) {
  const o = e ? Dr.Root : "button";
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
function cn({ className: t, ...e }) {
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
function Kw({ className: t, ...e }) {
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
function qw({ className: t, ...e }) {
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
const Gw = no(
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
function Hw({
  asChild: t = !1,
  isActive: e = !1,
  variant: r = "default",
  size: o = "default",
  tooltip: n,
  className: i,
  ...s
}) {
  const c = t ? Dr.Root : "button", { state: l } = sa(), d = /* @__PURE__ */ a(
    c,
    {
      "data-slot": "sidebar-menu-button",
      "data-sidebar": "menu-button",
      "data-size": o,
      "data-active": e,
      className: v(Gw({ variant: r, size: o }), i),
      ...s
    }
  );
  return n ? /* @__PURE__ */ u(jt, { children: [
    /* @__PURE__ */ a(Ft, { asChild: !0, children: d }),
    /* @__PURE__ */ a(
      Ut,
      {
        side: "right",
        align: "center",
        hidden: l !== "collapsed",
        ...typeof n == "string" ? { children: n } : n
      }
    )
  ] }) : d;
}
function qp({
  className: t,
  asChild: e = !1,
  showOnHover: r = !1,
  ...o
}) {
  const n = e ? Dr.Root : "button";
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
function Hp({
  className: t,
  showIcon: e = !1,
  ...r
}) {
  const [o] = Jt.useState(() => `${Math.floor(Math.random() * 40) + 50}%`), n = { "--skeleton-width": o };
  return /* @__PURE__ */ u(
    "div",
    {
      "data-slot": "sidebar-menu-skeleton",
      "data-sidebar": "menu-skeleton",
      className: v("tw:flex tw:h-8 tw:items-center tw:gap-2 tw:rounded-md tw:px-2", t),
      ...r,
      children: [
        e && /* @__PURE__ */ a(sr, { className: "tw:size-4 tw:rounded-md", "data-sidebar": "menu-skeleton-icon" }),
        /* @__PURE__ */ a(
          sr,
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
function Yp({ className: t, ...e }) {
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
function Wp({ className: t, ...e }) {
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
function Xp({
  asChild: t = !1,
  size: e = "md",
  isActive: r = !1,
  className: o,
  ...n
}) {
  const i = t ? Dr.Root : "a";
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
function Yw({
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
      const f = r.find((x) => x.projectId === g);
      return f ? f.projectName : g;
    },
    [r]
  ), p = I(
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
    jw,
    {
      id: t,
      collapsible: "none",
      variant: "inset",
      className: v("tw:w-96 tw:gap-2 tw:overflow-y-auto", l),
      children: /* @__PURE__ */ u(Uw, { children: [
        /* @__PURE__ */ u(nn, { children: [
          /* @__PURE__ */ a(sn, { className: "tw:text-sm", children: i }),
          /* @__PURE__ */ a(cn, { children: /* @__PURE__ */ a(Kw, { children: Object.entries(e).map(([g, f]) => /* @__PURE__ */ a(qw, { children: /* @__PURE__ */ a(
            Hw,
            {
              onClick: () => d(g),
              isActive: h(g),
              children: /* @__PURE__ */ a("span", { className: "tw:pl-3", children: f })
            }
          ) }, g)) }) })
        ] }),
        /* @__PURE__ */ u(nn, { children: [
          /* @__PURE__ */ a(sn, { className: "tw:text-sm", children: s }),
          /* @__PURE__ */ a(cn, { className: "tw:pl-3", children: /* @__PURE__ */ u(
            "div",
            {
              className: v(
                "tw:flex tw:w-full tw:items-center tw:gap-2 tw:rounded-md tw:px-2 tw:py-1",
                {
                  "tw:bg-sidebar-accent tw:text-sidebar-accent-foreground": n == null ? void 0 : n.projectId
                }
              ),
              children: [
                /* @__PURE__ */ a($s, { className: "tw:h-4 tw:w-4 tw:shrink-0" }),
                /* @__PURE__ */ a(
                  Ji,
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
                    popoverContentStyle: { zIndex: Zi }
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
function Jp({
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
      mn,
      {
        className: "tw:w-9/12",
        value: s,
        onSearch: c,
        placeholder: "Search app settings, extension settings, and project settings"
      }
    ) }),
    /* @__PURE__ */ u(
      Bw,
      {
        id: t,
        className: "tw:h-full tw:flex-1 tw:gap-4 tw:overflow-auto tw:border-t",
        children: [
          /* @__PURE__ */ a(
            Yw,
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
          /* @__PURE__ */ a(Fw, { className: "tw:min-w-[215px]", children: o })
        ]
      }
    )
  ] });
}
const De = "scrBook", Ww = "scrRef", Ze = "source", Xw = "details", Jw = "Scripture Reference", Zw = "Scripture Book", Ci = "Type", Qw = "Details";
function tu(t, e) {
  const r = e ?? !1;
  return [
    {
      accessorFn: (o) => `${o.start.book} ${o.start.chapterNum}:${o.start.verseNum}`,
      id: De,
      header: (t == null ? void 0 : t.scriptureReferenceColumnName) ?? Jw,
      cell: (o) => {
        const n = o.row.original;
        return o.row.getIsGrouped() ? vt.bookIdToEnglishName(n.start.book) : o.row.groupingColumnId === De ? Ce(n.start) : void 0;
      },
      getGroupingValue: (o) => vt.bookIdToNumber(o.start.book),
      sortingFn: (o, n) => Oa(o.original.start, n.original.start),
      enableGrouping: !0
    },
    {
      accessorFn: (o) => Ce(o.start),
      id: Ww,
      header: void 0,
      cell: (o) => {
        const n = o.row.original;
        return o.row.getIsGrouped() ? void 0 : Ce(n.start);
      },
      sortingFn: (o, n) => Oa(o.original.start, n.original.start),
      enableGrouping: !1
    },
    {
      accessorFn: (o) => o.source.displayName,
      id: Ze,
      header: r ? (t == null ? void 0 : t.typeColumnName) ?? Ci : void 0,
      cell: (o) => r || o.row.getIsGrouped() ? o.getValue() : void 0,
      getGroupingValue: (o) => o.source.id,
      sortingFn: (o, n) => o.original.source.displayName.localeCompare(n.original.source.displayName),
      enableGrouping: !0
    },
    {
      accessorFn: (o) => o.detail,
      id: Xw,
      header: (t == null ? void 0 : t.detailsColumnName) ?? Qw,
      cell: (o) => o.getValue(),
      enableGrouping: !1
    }
  ];
}
const eu = (t) => {
  if (!("offset" in t.start))
    throw new Error("No offset available in range start");
  if (t.end && !("offset" in t.end))
    throw new Error("No offset available in range end");
  const { offset: e } = t.start;
  let r = 0;
  return t.end && ({ offset: r } = t.end), !t.end || Oa(t.start, t.end) === 0 ? `${da(t.start)}+${e}` : `${da(t.start)}+${e}-${da(t.end)}+${r}`;
}, ln = (t) => `${eu({ start: t.start, end: t.end })} ${t.source.displayName} ${t.detail}`;
function Zp({
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
  const [d, w] = N([]), [p, h] = N([{ id: De, desc: !1 }]), [g, f] = N({}), x = I(
    () => t.flatMap((S) => S.data.map((V) => ({
      ...V,
      source: S.source
    }))),
    [t]
  ), m = I(
    () => tu(
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
    d.includes(Ze) ? h([
      { id: Ze, desc: !1 },
      { id: De, desc: !1 }
    ]) : h([{ id: De, desc: !1 }]);
  }, [d]);
  const E = jn({
    data: x,
    columns: m,
    state: {
      grouping: d,
      sorting: p,
      rowSelection: g
    },
    onGroupingChange: w,
    onSortingChange: h,
    onRowSelectionChange: f,
    getExpandedRowModel: ol(),
    getGroupedRowModel: al(),
    getCoreRowModel: Un(),
    getSortedRowModel: Fn(),
    getRowId: ln,
    autoResetExpanded: !1,
    enableMultiRowSelection: !1,
    enableSubRowSelection: !1
  });
  G(() => {
    if (c) {
      const S = E.getSelectedRowModel().rowsById, V = Object.keys(S);
      if (V.length === 1) {
        const W = x.find((_) => ln(_) === V[0]) || void 0;
        W && c(W);
      }
    }
  }, [g, x, c, E]);
  const T = n ?? Zw, k = i ?? Ci, z = [
    { label: "No Grouping", value: [] },
    { label: `Group by ${T}`, value: [De] },
    { label: `Group by ${k}`, value: [Ze] },
    {
      label: `Group by ${T} and ${k}`,
      value: [De, Ze]
    },
    {
      label: `Group by ${k} and ${T}`,
      value: [Ze, De]
    }
  ], F = (S) => {
    w(JSON.parse(S));
  }, D = (S, V) => {
    !S.getIsGrouped() && !S.getIsSelected() && S.getToggleSelectedHandler()(V);
  }, $ = (S, V) => S.getIsGrouped() ? "" : v("banded-row", V % 2 === 0 ? "even" : "odd"), P = (S, V, W) => {
    if (!((S == null ? void 0 : S.length) === 0 || V.depth < W.column.getGroupedIndex())) {
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
      pr,
      {
        value: JSON.stringify(d),
        onValueChange: (S) => {
          F(S);
        },
        children: [
          /* @__PURE__ */ a(gr, { className: "tw:mb-1 tw:mt-2", children: /* @__PURE__ */ a(hr, {}) }),
          /* @__PURE__ */ a(fr, { position: "item-aligned", children: /* @__PURE__ */ a(Jd, { children: z.map((S) => /* @__PURE__ */ a(ue, { value: JSON.stringify(S.value), children: S.label }, S.label)) }) })
        ]
      }
    ),
    /* @__PURE__ */ u(Ya, { className: "tw:relative tw:flex tw:flex-col tw:overflow-y-auto tw:p-0", children: [
      e && /* @__PURE__ */ a(Wa, { children: E.getHeaderGroups().map((S) => /* @__PURE__ */ a(Oe, { children: S.headers.filter((V) => V.column.columnDef.header).map((V) => (
        /* For sticky column headers to work, we probably need to change the default definition of the shadcn Table component. See https://github.com/shadcn-ui/ui/issues/1151 */
        /* @__PURE__ */ a(Hr, { colSpan: V.colSpan, className: "tw:sticky top-0", children: V.isPlaceholder ? void 0 : /* @__PURE__ */ u("div", { children: [
          V.column.getCanGroup() ? /* @__PURE__ */ a(
            Y,
            {
              variant: "ghost",
              title: `Toggle grouping by ${V.column.columnDef.header}`,
              onClick: V.column.getToggleGroupingHandler(),
              type: "button",
              children: V.column.getIsGrouped() ? "🛑" : "👊 "
            }
          ) : void 0,
          " ",
          kr(V.column.columnDef.header, V.getContext())
        ] }) }, V.id)
      )) }, S.id)) }),
      /* @__PURE__ */ a(Xa, { children: E.getRowModel().rows.map((S, V) => {
        const W = ye();
        return /* @__PURE__ */ a(
          Oe,
          {
            "data-state": S.getIsSelected() ? "selected" : "",
            className: v($(S, V)),
            onClick: (_) => D(S, _),
            children: S.getVisibleCells().map((_) => {
              if (!(_.getIsPlaceholder() || _.column.columnDef.enableGrouping && !_.getIsGrouped() && (_.column.columnDef.id !== Ze || !r)))
                return /* @__PURE__ */ a(
                  cr,
                  {
                    className: v(
                      _.column.columnDef.id,
                      "tw:p-[1px]",
                      P(d, S, _)
                    ),
                    children: _.getIsGrouped() ? /* @__PURE__ */ u(
                      Y,
                      {
                        variant: "link",
                        onClick: S.getToggleExpandedHandler(),
                        type: "button",
                        children: [
                          S.getIsExpanded() && /* @__PURE__ */ a(wr, {}),
                          !S.getIsExpanded() && (W === "ltr" ? /* @__PURE__ */ a(Da, {}) : /* @__PURE__ */ a(Ra, {})),
                          " ",
                          kr(_.column.columnDef.cell, _.getContext()),
                          " (",
                          S.subRows.length,
                          ")"
                        ]
                      }
                    ) : kr(_.column.columnDef.cell, _.getContext())
                  },
                  _.id
                );
            })
          },
          S.id
        );
      }) })
    ] })
  ] });
}
function Ei(t) {
  if (t.length !== vt.allBookIds.length)
    throw new Error("availableBookInfo length must match Canon.allBookIds length");
  return vt.allBookIds.filter(
    (e, r) => t[r] === "1" && !vt.isObsolete(vt.bookIdToNumber(e))
  );
}
function fo(t, e) {
  return t.filter((r) => {
    try {
      return yr(r) === e;
    } catch {
      return !1;
    }
  });
}
const Ti = (t, e, r) => fo(t, e).every((o) => r.includes(o));
function ru({
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
  }, [x, m] = N(!1), [E, T] = N(""), k = K(void 0), z = K(!1), F = I(
    () => Ei(t),
    [t]
  ), D = I(() => {
    if (!E.trim()) {
      const U = {
        [ut.OT]: [],
        [ut.NT]: [],
        [ut.DC]: [],
        [ut.Extra]: []
      };
      return F.forEach((Z) => {
        const M = yr(Z);
        U[M].push(Z);
      }), U;
    }
    const _ = F.filter(
      (U) => Ka(U, E, n)
    ), rt = {
      [ut.OT]: [],
      [ut.NT]: [],
      [ut.DC]: [],
      [ut.Extra]: []
    };
    return _.forEach((U) => {
      const Z = yr(U);
      rt[Z].push(U);
    }), rt;
  }, [F, E, n]), $ = L(
    (_, rt = !1) => {
      if (!rt || !k.current) {
        r(
          e.includes(_) ? e.filter((ot) => ot !== _) : [...e, _]
        ), k.current = _;
        return;
      }
      const U = F.findIndex((ot) => ot === k.current), Z = F.findIndex((ot) => ot === _);
      if (U === -1 || Z === -1) return;
      const [M, O] = [
        Math.min(U, Z),
        Math.max(U, Z)
      ], J = F.slice(M, O + 1).map((ot) => ot);
      r(
        e.includes(_) ? e.filter((ot) => !J.includes(ot)) : [.../* @__PURE__ */ new Set([...e, ...J])]
      );
    },
    [e, r, F]
  ), P = (_) => {
    $(_, z.current), z.current = !1;
  }, S = (_, rt) => {
    _.preventDefault(), $(rt, _.shiftKey);
  }, V = () => {
    r(F.map((_) => _));
  }, W = () => {
    r([]);
  };
  return /* @__PURE__ */ u(
    Pe,
    {
      open: x,
      onOpenChange: (_) => {
        m(_), _ || T("");
      },
      children: [
        /* @__PURE__ */ a(rr, { asChild: !0, children: /* @__PURE__ */ u(
          Y,
          {
            variant: "outline",
            role: "combobox",
            "aria-expanded": x,
            className: "tw:max-w-64 tw:justify-between",
            children: [
              e.length > 0 ? `${i}: ${e.length}` : s,
              /* @__PURE__ */ a(Is, { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
            ]
          }
        ) }),
        /* @__PURE__ */ a(Ve, { className: "tw:w-[500px] tw:max-w-[calc(100vw-2rem)] tw:p-0", align: "start", children: /* @__PURE__ */ u(
          Le,
          {
            shouldFilter: !1,
            onKeyDown: (_) => {
              _.key === "Enter" && (z.current = _.shiftKey);
            },
            children: [
              /* @__PURE__ */ a(
                ta,
                {
                  placeholder: c,
                  value: E,
                  onValueChange: T,
                  spaceSelectsHighlightedItem: !0
                }
              ),
              /* @__PURE__ */ u("div", { className: "tw:flex tw:justify-between tw:border-b tw:p-2", children: [
                /* @__PURE__ */ a(Y, { variant: "ghost", size: "sm", onClick: V, children: l }),
                /* @__PURE__ */ a(Y, { variant: "ghost", size: "sm", onClick: W, children: d })
              ] }),
              /* @__PURE__ */ u(Be, { children: [
                /* @__PURE__ */ a(ea, { children: w }),
                Object.values(ut).map((_, rt) => {
                  const U = D[_];
                  if (U.length !== 0)
                    return /* @__PURE__ */ u(aa, { children: [
                      /* @__PURE__ */ a(
                        Te,
                        {
                          heading: wn(_, p, h, g, f),
                          children: U.map((Z) => /* @__PURE__ */ a(
                            Kn,
                            {
                              bookId: Z,
                              isSelected: e.includes(Z),
                              onSelect: () => P(Z),
                              onMouseDown: (M) => S(M, Z),
                              section: yr(Z),
                              showCheck: !0,
                              localizedBookNames: n,
                              commandValue: qn(Z, n),
                              className: "tw:flex tw:items-center"
                            },
                            Z
                          ))
                        }
                      ),
                      rt < Object.values(ut).length - 1 && /* @__PURE__ */ a(fn, {})
                    ] }, _);
                })
              ] })
            ]
          }
        ) })
      ]
    }
  );
}
function au({
  section: t,
  availableBookIds: e,
  selectedBookIds: r,
  onToggle: o,
  localizedStrings: n
}) {
  const i = fo(e, t).length === 0, s = n["%scripture_section_ot_short%"], c = n["%scripture_section_nt_short%"], l = n["%scripture_section_dc_short%"], d = n["%scripture_section_extra_short%"];
  return /* @__PURE__ */ a(
    Y,
    {
      variant: "outline",
      size: "sm",
      onClick: () => o(t),
      className: v(
        Ti(e, t, r) && !i && "tw:bg-primary tw:text-primary-foreground tw:hover:bg-primary/70 tw:hover:text-primary-foreground"
      ),
      disabled: i,
      children: Qi(
        t,
        s,
        c,
        l,
        d
      )
    }
  );
}
const dn = 5, Na = 6;
function ou({
  availableBookInfo: t,
  selectedBookIds: e,
  onChangeSelectedBookIds: r,
  localizedStrings: o,
  localizedBookNames: n
}) {
  const i = o["%webView_book_selector_more%"], s = I(
    () => Ei(t),
    [t]
  ), c = L(
    (l) => {
      const d = fo(s, l).map((w) => w);
      r(
        Ti(s, l, e) ? e.filter((w) => !d.includes(w)) : [.../* @__PURE__ */ new Set([...e, ...d])]
      );
    },
    [e, r, s]
  );
  return /* @__PURE__ */ u("div", { className: "tw:space-y-2", children: [
    /* @__PURE__ */ a("div", { className: "tw:flex tw:flex-wrap tw:gap-2", children: Object.values(ut).map((l) => /* @__PURE__ */ a(
      au,
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
      ru,
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
        e.length === Na ? Na : dn
      ).map((l) => /* @__PURE__ */ a(Nr, { className: "tw:hover:bg-secondary", variant: "secondary", children: Me(l, n) }, l)),
      e.length > Na && /* @__PURE__ */ a(
        Nr,
        {
          className: "tw:hover:bg-secondary",
          variant: "secondary",
          children: `+${e.length - dn} ${i}`
        }
      )
    ] })
  ] });
}
const nu = Object.freeze([
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
]), Qp = Object.freeze([
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
  ...nu
]), It = (t, e) => t[e] ?? e, iu = Object.freeze([" ", "-"]);
function th({
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
  onCurrentScrRefChange: x,
  bookChapterControlLocalizedStrings: m,
  getEndVerse: E,
  hideLabel: T = !1,
  buttonClassName: k
}) {
  const z = It(
    s,
    "%webView_scope_selector_selected_text%"
  ), F = It(s, "%webView_scope_selector_verse%"), D = It(s, "%webView_scope_selector_chapter%"), $ = It(s, "%webView_scope_selector_book%"), P = It(
    s,
    "%webView_scope_selector_current_verse%"
  ), S = It(
    s,
    "%webView_scope_selector_current_chapter%"
  ), V = It(s, "%webView_scope_selector_current_book%"), W = It(s, "%webView_scope_selector_choose_books%"), _ = It(s, "%webView_scope_selector_scope%"), rt = It(s, "%webView_scope_selector_select_books%"), U = It(s, "%webView_scope_selector_range%"), Z = It(s, "%webView_scope_selector_select_range%"), M = It(s, "%webView_scope_selector_range_start%"), O = It(s, "%webView_scope_selector_range_end%"), J = It(s, "%webView_scope_selector_ok%"), ot = It(s, "%webView_scope_selector_cancel%"), Pt = It(s, "%webView_scope_selector_navigate%"), Ot = (A) => {
    if (!f) return;
    const et = f.book.toUpperCase();
    switch (A) {
      case "verse":
        return Ce(f, "id");
      case "chapter":
        return `${et} ${f.chapterNum}`;
      case "book":
        return et;
      default:
        return;
    }
  }, Kt = [
    { value: "selectedText", label: z, id: "scope-selected-text" },
    {
      value: "verse",
      label: F,
      dropdownLabel: P,
      scrRefSuffix: Ot("verse"),
      id: "scope-verse"
    },
    {
      value: "chapter",
      label: D,
      dropdownLabel: S,
      scrRefSuffix: Ot("chapter"),
      id: "scope-chapter"
    },
    {
      value: "book",
      label: $,
      dropdownLabel: V,
      scrRefSuffix: Ot("book"),
      id: "scope-book"
    },
    { value: "selectedBooks", label: W, id: "scope-selected" },
    { value: "range", label: U, id: "scope-range" }
  ], H = (A, et, te = !1) => /* @__PURE__ */ u(lt, { children: [
    A,
    et && !te && /* @__PURE__ */ u("span", { className: "tw:text-muted-foreground", children: [
      ": ",
      et
    ] })
  ] }), nt = e ? Kt.filter((A) => e.includes(A.value)) : Kt, pt = f ?? wa, st = w ?? pt, gt = p ?? pt, qt = () => {
  }, Ct = K(null), bt = K(null), xt = K(!1), Gt = K(null), yt = K(!1), [Vt, R] = N(void 0), kt = K(!1), _t = K(!1), re = K(null), qe = L((A) => {
    if (A) {
      R("start"), kt.current = !1;
      return;
    }
    R((et) => et === "start" ? void 0 : et), kt.current && (kt.current = !1, requestAnimationFrame(() => {
      var te;
      const et = (te = Ct.current) == null ? void 0 : te.querySelector("button");
      et == null || et.click();
    }));
  }, []), ce = L((A) => {
    if (A) {
      R("end"), _t.current = !1;
      return;
    }
    R((et) => et === "end" ? void 0 : et);
  }, []), le = L(
    (A) => {
      h == null || h(A), g == null || g(A), kt.current = !0;
    },
    [h, g]
  ), Ge = L(
    (A) => {
      g == null || g(A), _t.current = !0;
    },
    [g]
  ), Et = L(
    (A) => {
      r(A), A === "selectedBooks" && n.length === 0 && (f != null && f.book) && i([f.book]);
    },
    [r, n, f, i]
  ), ae = nt.find((A) => A.value === t), Rt = () => t === "selectedBooks" && n.length > 0 ? n.map((A) => A.toUpperCase()).join(", ") : t === "range" ? Gs(st, gt, {
    optionOrLocalizedBookName: "id",
    endRefOptionOrLocalizedBookName: "id",
    repeatBookName: !0
  }) : ae ? H(ae.label, ae.scrRefSuffix) : t, Dt = nt.filter(
    (A) => A.value !== "selectedBooks" && A.value !== "range"
  ), Ht = nt.find((A) => A.value === "selectedBooks"), oe = nt.find((A) => A.value === "range"), [Qt, ge] = N(!1), [C, B] = N(void 0), [tt, q] = N(void 0), [b, Q] = N(void 0), [j, at] = N(void 0), [dt, ht] = N([]), ft = d === "dropdown" && C === "selectedBooks", Nt = /* @__PURE__ */ a(
    ou,
    {
      availableBookInfo: o,
      selectedBookIds: ft ? dt : n,
      onChangeSelectedBookIds: ft ? ht : i,
      localizedStrings: s,
      localizedBookNames: c
    }
  ), $t = Vt === "end", He = Vt === "start", de = "tw:text-muted-foreground", Ye = d === "dropdown" && C === "range", y = Ye ? Q : le, it = Ye ? at : g ? Ge : qt, Lt = /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-wrap tw:items-end tw:gap-4", children: [
    /* @__PURE__ */ u("div", { className: "tw:grid tw:gap-2", children: [
      /* @__PURE__ */ a(zt, { htmlFor: "scope-range-start", className: v($t && de), children: M }),
      /* @__PURE__ */ a(
        pa,
        {
          id: "scope-range-start",
          scrRef: Ye ? b ?? st : st,
          handleSubmit: y,
          localizedBookNames: c,
          localizedStrings: m,
          getEndVerse: E,
          submitKeys: iu,
          onOpenChange: qe,
          className: v($t && de),
          modal: !0
        }
      )
    ] }),
    /* @__PURE__ */ u("div", { ref: Ct, className: "tw:grid tw:gap-2", children: [
      /* @__PURE__ */ a(zt, { htmlFor: "scope-range-end", className: v(He && de), children: O }),
      /* @__PURE__ */ a(
        pa,
        {
          id: "scope-range-end",
          scrRef: Ye ? j ?? gt : gt,
          handleSubmit: it,
          localizedBookNames: c,
          localizedStrings: m,
          getEndVerse: E,
          disableReferencesUpTo: Ye ? b ?? st : st,
          onOpenChange: ce,
          onCloseAutoFocus: (A) => {
            var et;
            _t.current && (_t.current = !1, A.preventDefault(), (et = re.current) == null || et.focus());
          },
          className: v(He && de),
          modal: !0,
          align: "start"
        }
      )
    ] })
  ] }), Ne = K({}), Re = L(
    (A) => (et) => {
      Ne.current[A] = et;
    },
    []
  ), We = K(null);
  G(() => {
    if (!Qt) return;
    let A = 0;
    const et = requestAnimationFrame(() => {
      A = requestAnimationFrame(() => {
        var te;
        (te = Ne.current[t]) == null || te.focus();
      });
    });
    return () => {
      cancelAnimationFrame(et), A && cancelAnimationFrame(A);
    };
  }, [Qt, t]);
  const [Mt, Tt] = N(null), [St, mt] = N(null), [Yt, fe] = N(null), Xe = 200, [Ii, Ai] = N(!1);
  G(() => {
    if (!Yt || typeof ResizeObserver > "u") return;
    const A = new ResizeObserver(([et]) => {
      Ai(et.contentRect.width < Xe);
    });
    return A.observe(Yt), () => A.disconnect();
  }, [Yt]);
  const mo = L(
    (A) => {
      q(A), Q(st), at(gt), ht(n), ge(!1), B(A);
    },
    [st, gt, n]
  ), vo = L(() => {
    tt !== void 0 && (tt === "range" ? (b && (h == null || h(b)), j && (g == null || g(j))) : tt === "selectedBooks" && i(dt), Et(tt), B(void 0), q(void 0));
  }, [
    tt,
    b,
    j,
    dt,
    h,
    g,
    i,
    Et
  ]), Mr = L((A) => {
    A || (B(void 0), q(void 0));
  }, []), bo = L((A) => {
    var et;
    A.preventDefault(), (et = We.current) == null || et.focus();
  }, []), xo = (A) => t === A ? /* @__PURE__ */ a("span", { className: "tw:absolute tw:flex tw:h-3.5 tw:w-3.5 tw:items-center tw:justify-center tw:ltr:left-2 tw:rtl:right-2", children: /* @__PURE__ */ a(Ie, { className: "tw:h-4 tw:w-4" }) }) : void 0;
  return /* @__PURE__ */ u("div", { id: l, className: "tw:grid tw:gap-4", children: [
    /* @__PURE__ */ u("div", { className: "tw:grid tw:gap-2", children: [
      !T && /* @__PURE__ */ a(zt, { children: _ }),
      d === "dropdown" ? /* @__PURE__ */ u(je, { open: Qt, onOpenChange: ge, children: [
        /* @__PURE__ */ a(Fe, { asChild: !0, children: /* @__PURE__ */ u(
          Y,
          {
            ref: We,
            variant: "outline",
            role: "combobox",
            className: v(
              "tw:w-full tw:justify-between tw:overflow-hidden tw:font-normal",
              k
            ),
            children: [
              /* @__PURE__ */ a("span", { className: "tw:min-w-0 tw:flex-1 tw:truncate tw:text-start", children: Rt() }),
              /* @__PURE__ */ a(wr, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
            ]
          }
        ) }),
        /* @__PURE__ */ a(
          Ue,
          {
            ref: fe,
            className: "tw:w-[var(--radix-dropdown-menu-trigger-width)] tw:min-w-[12rem]",
            align: "start",
            children: /* @__PURE__ */ u(ca, { container: Yt, children: [
              Dt.map(({ value: A, label: et, dropdownLabel: te, scrRefSuffix: vr, id: Pi }) => /* @__PURE__ */ u(
                Qe,
                {
                  ref: Re(A),
                  className: "tw:relative tw:ps-8 data-[highlighted]:tw:bg-accent data-[highlighted]:tw:text-accent-foreground",
                  onSelect: () => Et(A),
                  "data-selected": t === A ? "true" : void 0,
                  children: [
                    t === A && /* @__PURE__ */ a("span", { className: "tw:absolute tw:flex tw:h-3.5 tw:w-3.5 tw:items-center tw:justify-center tw:ltr:left-2 tw:rtl:right-2", children: /* @__PURE__ */ a(Ie, { className: "tw:h-4 tw:w-4" }) }),
                    H(te ?? et, vr, Ii)
                  ]
                },
                Pi
              )),
              (Ht || oe) && /* @__PURE__ */ a(er, {}),
              Ht && /* @__PURE__ */ u(
                Qe,
                {
                  ref: Re("selectedBooks"),
                  className: v(
                    "tw:relative tw:ps-8",
                    "data-[highlighted]:tw:bg-accent data-[highlighted]:tw:text-accent-foreground"
                  ),
                  onSelect: () => mo("selectedBooks"),
                  "data-selected": t === "selectedBooks" ? "true" : void 0,
                  children: [
                    xo("selectedBooks"),
                    `${Ht.label}…`
                  ]
                }
              ),
              oe && /* @__PURE__ */ u(
                Qe,
                {
                  ref: Re("range"),
                  className: v(
                    "tw:relative tw:ps-8",
                    "data-[highlighted]:tw:bg-accent data-[highlighted]:tw:text-accent-foreground"
                  ),
                  onSelect: () => mo("range"),
                  "data-selected": t === "range" ? "true" : void 0,
                  children: [
                    xo("range"),
                    `${oe.label}…`
                  ]
                }
              ),
              x && /* @__PURE__ */ u(lt, { children: [
                /* @__PURE__ */ a(er, {}),
                /* @__PURE__ */ a(Sr, { className: "tw:px-2 tw:py-1.5 tw:text-xs tw:font-medium tw:text-muted-foreground", children: Pt }),
                /* @__PURE__ */ a(
                  Qe,
                  {
                    ref: Gt,
                    className: "tw:p-0",
                    onSelect: (A) => {
                      var et, te;
                      if (A.preventDefault(), xt.current) {
                        xt.current = !1;
                        return;
                      }
                      yt.current || (te = (et = bt.current) == null ? void 0 : et.querySelector("button")) == null || te.click();
                    },
                    children: /* @__PURE__ */ a(
                      "div",
                      {
                        ref: bt,
                        className: "tw:w-full tw:px-1 tw:pb-1",
                        onPointerDownCapture: (A) => {
                          const et = A.target instanceof HTMLElement ? A.target : void 0;
                          et != null && et.closest("button") && (xt.current = !0, requestAnimationFrame(() => {
                            xt.current = !1;
                          }));
                        },
                        children: /* @__PURE__ */ a(
                          pa,
                          {
                            id: "scope-navigate",
                            scrRef: f ?? wa,
                            handleSubmit: x,
                            localizedBookNames: c,
                            localizedStrings: m,
                            getEndVerse: E,
                            triggerVariant: "ghost",
                            onOpenChange: (A) => {
                              yt.current = A;
                            },
                            onCloseAutoFocus: (A) => {
                              var et;
                              A.preventDefault(), (et = Gt.current) == null || et.focus();
                            },
                            modal: !0,
                            className: "tw:w-full tw:min-w-0 tw:max-w-none tw:justify-between tw:px-2 tw:font-normal",
                            triggerContent: /* @__PURE__ */ u(lt, { children: [
                              /* @__PURE__ */ a("span", { className: "tw:min-w-0 tw:flex-1 tw:truncate tw:text-start", children: Ce(f ?? wa, "id") }),
                              /* @__PURE__ */ a(wr, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
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
        qa,
        {
          value: t,
          onValueChange: Et,
          className: "tw:flex tw:flex-col tw:space-y-1",
          children: nt.map(({ value: A, label: et, scrRefSuffix: te, id: vr }) => /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center", children: [
            /* @__PURE__ */ a(Gr, { className: "tw:me-2", value: A, id: vr }),
            /* @__PURE__ */ a(zt, { htmlFor: vr, children: H(et, te) })
          ] }, vr))
        }
      )
    ] }),
    d === "radio" && t === "selectedBooks" && /* @__PURE__ */ u("div", { className: "tw:grid tw:gap-2", children: [
      /* @__PURE__ */ a(zt, { children: rt }),
      Nt
    ] }),
    d === "radio" && t === "range" && Lt,
    d === "dropdown" && Ht && /* @__PURE__ */ a(Ca, { open: C === "selectedBooks", onOpenChange: Mr, children: /* @__PURE__ */ a(
      Ea,
      {
        ref: mt,
        onCloseAutoFocus: bo,
        onEscapeKeyDown: (A) => {
          St != null && St.querySelector('[data-state="open"]') && A.preventDefault();
        },
        children: /* @__PURE__ */ u(ca, { container: St, children: [
          /* @__PURE__ */ a(Ta, { className: "tw:pe-8", children: /* @__PURE__ */ a(Sa, { children: W }) }),
          Nt,
          /* @__PURE__ */ u(yo, { children: [
            /* @__PURE__ */ a(Y, { variant: "outline", onClick: () => Mr(!1), children: ot }),
            /* @__PURE__ */ a(Y, { onClick: vo, children: J })
          ] })
        ] })
      }
    ) }),
    d === "dropdown" && oe && /* @__PURE__ */ a(Ca, { open: C === "range", onOpenChange: Mr, children: /* @__PURE__ */ a(
      Ea,
      {
        ref: Tt,
        onCloseAutoFocus: bo,
        onEscapeKeyDown: (A) => {
          Mt != null && Mt.querySelector('[data-state="open"]') && A.preventDefault();
        },
        children: /* @__PURE__ */ u(ca, { container: Mt, children: [
          /* @__PURE__ */ a(Ta, { className: "tw:pe-8", children: /* @__PURE__ */ a(Sa, { children: Z }) }),
          Lt,
          /* @__PURE__ */ u(yo, { children: [
            /* @__PURE__ */ a(Y, { variant: "outline", onClick: () => Mr(!1), children: ot }),
            /* @__PURE__ */ a(Y, { ref: re, onClick: vo, children: J })
          ] })
        ] })
      }
    ) })
  ] });
}
function eh({
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
    ...la,
    ...Object.fromEntries(
      Object.entries(o).map(
        ([w, p]) => [
          w,
          w === p && w in la ? la[w] : p
        ]
      )
    )
  }, d = ye();
  return /* @__PURE__ */ u(
    pr,
    {
      value: `${e}`,
      onValueChange: (w) => r(
        w === "undefined" ? void 0 : parseInt(w, 10)
      ),
      disabled: c,
      children: [
        /* @__PURE__ */ a(gr, { size: n, className: v("pr-twp tw:w-auto", i), children: /* @__PURE__ */ a(
          hr,
          {
            placeholder: l[Eo(e)] ?? e
          }
        ) }),
        /* @__PURE__ */ a(
          fr,
          {
            id: s,
            align: d === "rtl" ? "end" : "start",
            style: { zIndex: ar },
            children: t.map((w) => /* @__PURE__ */ a(ue, { value: `${w}`, children: l[Eo(w)] }, `${w}`))
          }
        )
      ]
    }
  );
}
function rh({ children: t }) {
  return /* @__PURE__ */ a("div", { className: "pr-twp tw:grid", children: t });
}
function ah({
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
function oh({
  primary: t,
  secondary: e,
  includeSeparator: r = !1
}) {
  return /* @__PURE__ */ u("div", { className: "tw:space-y-4 tw:py-2", children: [
    /* @__PURE__ */ u("div", { children: [
      /* @__PURE__ */ a("h3", { className: "tw:text-lg tw:font-medium", children: t }),
      /* @__PURE__ */ a("p", { className: "tw:text-sm tw:text-muted-foreground", children: e })
    ] }),
    r ? /* @__PURE__ */ a(Cr, {}) : ""
  ] });
}
function Si(t, e) {
  var r;
  return (r = Object.entries(t).find(
    ([, o]) => "menuItem" in o && o.menuItem === e
  )) == null ? void 0 : r[0];
}
function Qr({ icon: t, menuLabel: e, leading: r }) {
  return t ? /* @__PURE__ */ a(
    "img",
    {
      className: v("tw:max-h-5 tw:max-w-5", r ? "tw:me-2" : "tw:ms-2"),
      src: t,
      alt: `${r ? "Leading" : "Trailing"} icon for ${e}`
    }
  ) : void 0;
}
const zi = (t, e, r, o) => r ? Object.entries(t).filter(
  ([i, s]) => "column" in s && s.column === r || i === r
).sort(([, i], [, s]) => i.order - s.order).flatMap(([i]) => e.filter((c) => c.group === i).sort((c, l) => c.order - l.order).map((c) => /* @__PURE__ */ u(jt, { children: [
  /* @__PURE__ */ a(Ft, { asChild: !0, children: "command" in c ? /* @__PURE__ */ u(
    Qe,
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
  ) : /* @__PURE__ */ u(ts, { children: [
    /* @__PURE__ */ a(es, { children: c.label }),
    /* @__PURE__ */ a(rs, { children: /* @__PURE__ */ a(as, { children: zi(
      t,
      e,
      Si(t, c.id),
      o
    ) }) })
  ] }, `dropdown-menu-sub-${c.label}-${c.id}`) }),
  c.tooltip && /* @__PURE__ */ a(Ut, { children: c.tooltip })
] }, `tooltip-${c.label}-${"command" in c ? c.command : c.id}`))) : void 0;
function Fa({
  onSelectMenuItem: t,
  menuData: e,
  tabLabel: r,
  icon: o,
  className: n,
  variant: i,
  buttonVariant: s = "ghost",
  id: c
}) {
  return /* @__PURE__ */ u(je, { variant: i, children: [
    /* @__PURE__ */ a(Fe, { "aria-label": r, className: n, asChild: !0, id: c, children: /* @__PURE__ */ a(Y, { variant: s, size: "icon", children: o ?? /* @__PURE__ */ a(As, {}) }) }),
    /* @__PURE__ */ a(Ue, { align: "start", style: { zIndex: ar }, children: Object.entries(e.columns).filter(([, l]) => typeof l == "object").sort(([, l], [, d]) => typeof l == "boolean" || typeof d == "boolean" ? 0 : l.order - d.order).map(([l], d, w) => /* @__PURE__ */ u(aa, { children: [
      /* @__PURE__ */ a(hn, { children: /* @__PURE__ */ a(Bt, { children: zi(e.groups, e.items, l, t) }) }),
      d < w.length - 1 && /* @__PURE__ */ a(er, {})
    ] }, l)) })
  ] });
}
const Ri = Jt.forwardRef(
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
function nh({
  onSelectProjectMenuItem: t,
  onSelectViewInfoMenuItem: e,
  projectMenuData: r,
  tabViewMenuData: o,
  id: n,
  className: i,
  startAreaChildren: s,
  centerAreaChildren: c,
  endAreaChildren: l,
  menuButtonIcon: d
}) {
  return /* @__PURE__ */ u(Ri, { className: `tw:w-full tw:border-b ${i}`, id: n, children: [
    r && /* @__PURE__ */ a(
      Fa,
      {
        onSelectMenuItem: t,
        menuData: r,
        tabLabel: "Project",
        icon: d ?? /* @__PURE__ */ a(Ps, {}),
        buttonVariant: "ghost"
      }
    ),
    s && /* @__PURE__ */ a("div", { className: "tw:flex tw:shrink tw:grow-[10] tw:flex-row tw:flex-nowrap tw:items-start tw:gap-x-1 tw:gap-y-2 tw:overflow-clip", children: s }),
    c && /* @__PURE__ */ a("div", { className: "tw:flex tw:shrink tw:grow-[1] tw:basis-0 tw:flex-row tw:flex-nowrap tw:items-start tw:justify-center tw:gap-x-1 tw:gap-y-2 tw:overflow-clip tw:@sm:basis-auto", children: c }),
    /* @__PURE__ */ u("div", { className: "tw:flex tw:shrink tw:grow-[1] tw:flex-row-reverse tw:flex-nowrap tw:items-start tw:gap-x-1 tw:gap-y-2 tw:overflow-clip", children: [
      o && /* @__PURE__ */ a(
        Fa,
        {
          onSelectMenuItem: e,
          menuData: o,
          tabLabel: "View Info",
          icon: /* @__PURE__ */ a(Vs, {}),
          className: "tw:h-full"
        }
      ),
      l
    ] })
  ] });
}
function ih({
  onSelectProjectMenuItem: t,
  projectMenuData: e,
  id: r,
  className: o,
  menuButtonIcon: n
}) {
  return /* @__PURE__ */ a(Ri, { className: "tw:pointer-events-none", id: r, children: e && /* @__PURE__ */ a(
    Fa,
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
const Di = Jt.forwardRef(({ className: t, ...e }, r) => {
  const o = ye();
  return /* @__PURE__ */ a(
    he.Root,
    {
      orientation: "vertical",
      ref: r,
      className: v("tw:flex tw:gap-1 tw:rounded-md tw:text-muted-foreground", t),
      ...e,
      dir: o
    }
  );
});
Di.displayName = he.List.displayName;
const Mi = Jt.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ a(
  he.List,
  {
    ref: r,
    className: v(
      "tw:flex tw:items-center tw:w-[124px] tw:justify-center tw:rounded-md tw:bg-muted tw:p-1 tw:text-muted-foreground",
      t
    ),
    ...e
  }
));
Mi.displayName = he.List.displayName;
const su = Jt.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ a(
  he.Trigger,
  {
    ref: r,
    ...e,
    className: v(
      "tw:inline-flex tw:w-[116px] tw:cursor-pointer tw:items-center tw:justify-center tw:break-words tw:rounded-sm tw:border-0 tw:bg-muted tw:px-3 tw:py-1.5 tw:text-sm tw:font-medium tw:text-inherit tw:ring-offset-background tw:transition-all tw:hover:text-foreground tw:focus-visible:outline-hidden tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2 tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:data-[state=active]:bg-background tw:data-[state=active]:text-foreground tw:data-[state=active]:shadow-sm tw:overflow-clip",
      t
    )
  }
)), Oi = Jt.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ a(
  he.Content,
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
Oi.displayName = he.Content.displayName;
function sh({
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
        mn,
        {
          className: i,
          value: e,
          onSearch: r,
          placeholder: o
        }
      )
    ] }),
    /* @__PURE__ */ u(Di, { children: [
      /* @__PURE__ */ a(Mi, { children: t.map((c) => /* @__PURE__ */ a(su, { value: c.value, children: c.value }, c.key)) }),
      t.map((c) => /* @__PURE__ */ a(Oi, { value: c.value, children: c.content }, c.key))
    ] })
  ] });
}
function cu({
  className: t,
  // CUSTOM: Added variant prop to allow callers to apply visual style variants to all menu items
  variant: e = "default",
  ...r
}) {
  const o = Jt.useMemo(
    () => ({
      variant: e
    }),
    [e]
  );
  return /* @__PURE__ */ a(os.Provider, { value: o, children: /* @__PURE__ */ a(
    ke.Root,
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
function lu({ ...t }) {
  return /* @__PURE__ */ a(ke.Menu, { "data-slot": "menubar-menu", ...t });
}
function du({ ...t }) {
  return /* @__PURE__ */ a(ke.Portal, { "data-slot": "menubar-portal", ...t });
}
function wu({
  className: t,
  ...e
}) {
  const r = zr();
  return /* @__PURE__ */ a(
    ke.Trigger,
    {
      "data-slot": "menubar-trigger",
      className: v(
        "tw:flex tw:items-center tw:rounded-sm tw:px-1.5 tw:py-[2px] tw:text-sm tw:font-medium tw:outline-hidden tw:select-none tw:hover:bg-muted tw:aria-expanded:bg-muted",
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation (portal-rendered content needs this)
        "pr-twp",
        // CUSTOM: Apply variant-driven styles from menu context
        Ja({ variant: r.variant, className: t })
      ),
      ...e
    }
  );
}
function uu({
  className: t,
  align: e = "start",
  alignOffset: r = -4,
  sideOffset: o = 8,
  ...n
}) {
  const i = zr();
  return /* @__PURE__ */ a(du, { children: /* @__PURE__ */ a(
    ke.Content,
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
function pu({
  className: t,
  inset: e,
  variant: r = "default",
  ...o
}) {
  const n = zr();
  return /* @__PURE__ */ a(
    ke.Item,
    {
      "data-slot": "menubar-item",
      "data-inset": e,
      "data-variant": r,
      className: v(
        "tw:group/menubar-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-[variant=destructive]:text-destructive tw:data-[variant=destructive]:focus:bg-destructive/10 tw:data-[variant=destructive]:focus:text-destructive tw:dark:data-[variant=destructive]:focus:bg-destructive/20 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:data-[variant=destructive]:*:[svg]:text-destructive!",
        // CUSTOM: Apply variant-driven styles from menu context
        Ja({ variant: n.variant, className: t })
      ),
      ...o
    }
  );
}
function hu({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    ke.Separator,
    {
      "data-slot": "menubar-separator",
      className: v("tw:-mx-1 tw:my-1 tw:h-px tw:bg-border", t),
      ...e
    }
  );
}
function gu({ ...t }) {
  return /* @__PURE__ */ a(ke.Sub, { "data-slot": "menubar-sub", ...t });
}
function fu({
  className: t,
  inset: e,
  children: r,
  ...o
}) {
  const n = zr();
  return /* @__PURE__ */ u(
    ke.SubTrigger,
    {
      "data-slot": "menubar-sub-trigger",
      "data-inset": e,
      className: v(
        "tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-none tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-inset:ps-7 tw:data-open:bg-accent tw:data-open:text-accent-foreground tw:[&_svg:not([class*=size-])]:size-4",
        // CUSTOM: Apply variant-driven styles from menu context
        Ja({ variant: n.variant, className: t })
      ),
      ...o,
      children: [
        r,
        /* @__PURE__ */ a(Sn, { className: "tw:ms-auto tw:size-4" })
      ]
    }
  );
}
function mu({
  className: t,
  ...e
}) {
  const r = zr();
  return /* @__PURE__ */ a(
    ke.SubContent,
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
const xr = (t, e) => {
  setTimeout(() => {
    e.forEach((r) => {
      var o;
      (o = t.current) == null || o.dispatchEvent(new KeyboardEvent("keydown", r));
    });
  }, 0);
}, $i = (t, e, r, o) => {
  if (!r) return;
  const n = Object.entries(t).filter(
    ([i, s]) => "column" in s && s.column === r || i === r
  ).sort(([, i], [, s]) => i.order - s.order);
  return n.flatMap(([i], s) => {
    const c = e.filter((d) => d.group === i).sort((d, w) => d.order - w.order).map((d) => /* @__PURE__ */ u(jt, { children: [
      /* @__PURE__ */ a(Ft, { asChild: !0, children: "command" in d ? /* @__PURE__ */ u(
        pu,
        {
          onClick: () => {
            o(d);
          },
          children: [
            d.iconPathBefore && /* @__PURE__ */ a(Qr, { icon: d.iconPathBefore, menuLabel: d.label, leading: !0 }),
            d.label,
            d.iconPathAfter && /* @__PURE__ */ a(Qr, { icon: d.iconPathAfter, menuLabel: d.label })
          ]
        },
        `menubar-item-${d.label}-${d.command}`
      ) : /* @__PURE__ */ u(gu, { children: [
        /* @__PURE__ */ a(fu, { children: d.label }),
        /* @__PURE__ */ a(mu, { children: $i(
          t,
          e,
          Si(t, d.id),
          o
        ) })
      ] }, `menubar-sub-${d.label}-${d.id}`) }),
      d.tooltip && /* @__PURE__ */ a(Ut, { children: d.tooltip })
    ] }, `tooltip-${d.label}-${"command" in d ? d.command : d.id}`)), l = [...c];
    return c.length > 0 && s < n.length - 1 && l.push(/* @__PURE__ */ a(hu, {}, `separator-${i}`)), l;
  });
};
function vu({
  menuData: t,
  onSelectMenuItem: e,
  onOpenChange: r,
  variant: o
}) {
  const n = K(void 0), i = K(void 0), s = K(void 0), c = K(void 0), l = K(void 0), d = (w) => {
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
  if (dl(["alt", "alt+p", "alt+l", "alt+n", "alt+h"], (w, p) => {
    var f, x, m, E;
    w.preventDefault();
    const h = { key: "Escape", code: "Escape", keyCode: 27, bubbles: !0 }, g = { key: " ", code: "Space", keyCode: 32, bubbles: !0 };
    switch (p.hotkey) {
      case "alt":
        xr(i, [h]);
        break;
      case "alt+p":
        (f = i.current) == null || f.focus(), xr(i, [h, g]);
        break;
      case "alt+l":
        (x = s.current) == null || x.focus(), xr(s, [h, g]);
        break;
      case "alt+n":
        (m = c.current) == null || m.focus(), xr(c, [h, g]);
        break;
      case "alt+h":
        (E = l.current) == null || E.focus(), xr(l, [h, g]);
        break;
    }
  }), G(() => {
    if (!r || !n.current) return;
    const w = new MutationObserver((g) => {
      g.forEach((f) => {
        if (f.attributeName === "data-state" && f.target instanceof HTMLElement) {
          const x = f.target.getAttribute("data-state");
          r(x === "open");
        }
      });
    });
    return n.current.querySelectorAll("[data-state]").forEach((g) => {
      w.observe(g, { attributes: !0 });
    }), () => w.disconnect();
  }, [r]), !!t)
    return /* @__PURE__ */ a(cu, { ref: n, className: "pr-twp tw:border-0 tw:bg-transparent", variant: o, children: Object.entries(t.columns).filter(([, w]) => typeof w == "object").sort(([, w], [, p]) => typeof w == "boolean" || typeof p == "boolean" ? 0 : w.order - p.order).map(([w, p]) => /* @__PURE__ */ u(lu, { children: [
      /* @__PURE__ */ a(wu, { ref: d(w), children: typeof p == "object" && "label" in p && p.label }),
      /* @__PURE__ */ a(
        uu,
        {
          style: { zIndex: ar },
          children: /* @__PURE__ */ a(Bt, { children: $i(t.groups, t.items, w, e) })
        }
      )
    ] }, w)) });
}
function ch(t) {
  switch (t) {
    case void 0:
      return;
    case "darwin":
      return "tw:ps-[85px]";
    default:
      return "tw:pe-[calc(138px+1rem)]";
  }
}
function lh({
  menuData: t,
  onOpenChange: e,
  onSelectMenuItem: r,
  className: o,
  id: n,
  children: i,
  appMenuAreaChildren: s,
  configAreaChildren: c,
  shouldUseAsAppDragArea: l,
  menubarVariant: d = "default"
}) {
  const w = K(void 0);
  return /* @__PURE__ */ a(
    "div",
    {
      className: v("tw:border tw:px-4 tw:text-foreground", o),
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
                  s,
                  t && /* @__PURE__ */ a(
                    vu,
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
                children: c
              }
            ) })
          ]
        }
      )
    }
  );
}
const bu = (t, e) => t[e] ?? e;
function dh({
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
  const d = bu(
    s,
    "%settings_uiLanguageSelector_fallbackLanguages%"
  ), [w, p] = N(!1), h = (f) => {
    n && n(f), o && o([f, ...r.filter((x) => x !== f)]), i && r.find((x) => x === f) && i([...r.filter((x) => x !== f)]), p(!1);
  }, g = (f, x) => {
    var E, T, k, z, F, D;
    const m = x !== f ? ((T = (E = t[f]) == null ? void 0 : E.uiNames) == null ? void 0 : T[x]) ?? ((z = (k = t[f]) == null ? void 0 : k.uiNames) == null ? void 0 : z.en) : void 0;
    return m ? `${(F = t[f]) == null ? void 0 : F.autonym} (${m})` : (D = t[f]) == null ? void 0 : D.autonym;
  };
  return /* @__PURE__ */ u("div", { id: l, className: v("pr-twp tw:max-w-sm", c), children: [
    /* @__PURE__ */ u(
      pr,
      {
        name: "uiLanguage",
        value: e,
        onValueChange: h,
        open: w,
        onOpenChange: (f) => p(f),
        children: [
          /* @__PURE__ */ a(gr, { children: /* @__PURE__ */ a(hr, {}) }),
          /* @__PURE__ */ a(
            fr,
            {
              style: { zIndex: ar },
              children: Object.keys(t).map((f) => /* @__PURE__ */ a(ue, { value: f, children: g(f, e) }, f))
            }
          )
        ]
      }
    ),
    e !== "en" && /* @__PURE__ */ a("div", { className: "tw:pt-3", children: /* @__PURE__ */ a(zt, { className: "tw:font-normal tw:text-muted-foreground", children: tr(d, {
      fallbackLanguages: (r == null ? void 0 : r.length) > 0 ? r.map((f) => g(f, e)).join(", ") : t.en.autonym
    }) }) })
  ] });
}
const wh = Object.freeze([
  "%firstRun_language_search_placeholder%",
  "%firstRun_language_noResults%",
  "%firstRun_language_selected%"
]);
function xu(t) {
  return [...t].sort(([e, r], [o, n]) => e === "en" && o !== "en" ? -1 : o === "en" && e !== "en" ? 1 : r.autonym.localeCompare(n.autonym));
}
function uh({
  languages: t,
  value: e,
  onChange: r,
  localizedStrings: o,
  className: n,
  id: i
}) {
  const [s, c] = N(""), l = I(
    () => xu(Object.entries(t)).map(([f, x]) => ({
      tag: f,
      info: x,
      keywords: [x.autonym, ...Object.values(x.uiNames ?? {}), ...x.otherNames ?? []]
    })),
    [t]
  ), d = I(() => {
    if (!s) return l;
    const f = s.toLowerCase();
    return l.filter(({ keywords: x }) => x.some((m) => m.toLowerCase().includes(f)));
  }, [l, s]), w = l.length > 1, p = o["%firstRun_language_search_placeholder%"] ?? "", h = o["%firstRun_language_noResults%"] ?? "", g = o["%firstRun_language_selected%"] ?? "";
  return /* @__PURE__ */ u(Le, { id: i, className: v("pr-twp", n), shouldFilter: !1, children: [
    w && // Plain <input> (not CommandPrimitive.Input) so cmdk cannot update this field after
    // item selection. Arrow-key and Enter events from here bubble to the Command root div
    // where cmdk's keydown handler picks them up for list navigation.
    /* @__PURE__ */ a("div", { "data-slot": "command-input-wrapper", className: "tw:p-1 tw:pb-0", children: /* @__PURE__ */ u(ns, { className: "tw:h-8! tw:rounded-lg! tw:border-input/30 tw:bg-input/30 tw:shadow-none! tw:*:data-[slot=input-group-addon]:ps-2!", children: [
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
      /* @__PURE__ */ a(is, { children: /* @__PURE__ */ a(ec, { className: "tw:size-4 tw:shrink-0 tw:opacity-50" }) })
    ] }) }),
    /* @__PURE__ */ u(Be, { children: [
      /* @__PURE__ */ a(ea, { children: h }),
      d.map(({ tag: f, info: x }) => {
        const m = f === e;
        return /* @__PURE__ */ u(
          ze,
          {
            value: f,
            "aria-current": m ? "true" : void 0,
            "data-checked": m ? "true" : void 0,
            onSelect: () => r(f),
            children: [
              /* @__PURE__ */ a("span", { dir: "auto", children: x.autonym }),
              m && /* @__PURE__ */ a("span", { className: "tw:sr-only", children: g })
            ]
          },
          f
        );
      })
    ] })
  ] });
}
function yu({ item: t, createLabel: e, createComplexLabel: r }) {
  return e ? /* @__PURE__ */ a(zt, { children: e(t) }) : r ? /* @__PURE__ */ a(zt, { children: r(t) }) : /* @__PURE__ */ a(zt, { children: t });
}
function ku({
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
      _i,
      {
        className: "tw:me-2 tw:align-middle",
        checked: o.includes(c),
        onCheckedChange: (l) => n(c, l)
      }
    ),
    /* @__PURE__ */ a(
      yu,
      {
        item: c,
        createLabel: i,
        createComplexLabel: s
      }
    )
  ] }, c)) });
}
const ph = ku;
function _u(t, e) {
  const [r, o] = N(t), [n, i] = N(e);
  return t !== r && (o(t), t && i(e)), t ? e : n;
}
function hh({
  open: t,
  anchorRect: e,
  message: r,
  confirmingKeyLabel: o,
  side: n = "bottom",
  align: i = "start",
  showArrow: s = !0
}) {
  const c = t ? To(r, { key: o }).join("") : "", {
    anchorRect: l,
    message: d,
    confirmingKeyLabel: w,
    showArrow: p
  } = _u(t, { anchorRect: e, message: r, confirmingKeyLabel: o, showArrow: s });
  return /* @__PURE__ */ u(Bt, { children: [
    /* @__PURE__ */ a("span", { role: "status", className: "tw:sr-only", children: c }),
    /* @__PURE__ */ u(jt, { open: t, onOpenChange: () => {
    }, children: [
      /* @__PURE__ */ a(
        Ft,
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
        Ut,
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
          children: /* @__PURE__ */ a("div", { className: "tw:w-full tw:h-full tw:rounded-md tw:bg-destructive/10 tw:px-3 tw:py-1.5", children: To(d, {
            key: /* @__PURE__ */ a(
              za,
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
            /* @__PURE__ */ a(aa, { children: h }, `key-${g}`)
          )) })
        }
      )
    ] })
  ] });
}
function Nu({
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
function gh({
  disabled: t,
  tooltipText: e,
  children: r,
  className: o
}) {
  return /* @__PURE__ */ a(Bt, { children: /* @__PURE__ */ u(jt, { children: [
    /* @__PURE__ */ a(Ft, { asChild: !0, children: /* @__PURE__ */ a(
      Nu,
      {
        className: o,
        isDisabled: t,
        disabledExplanation: e,
        children: r
      }
    ) }),
    t && /* @__PURE__ */ a(Ut, { children: /* @__PURE__ */ a("p", { className: "tw:max-w-xs tw:whitespace-pre-line", children: e }) })
  ] }) });
}
function fh({
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
  }, [f, x] = N(!1);
  return /* @__PURE__ */ u(
    "div",
    {
      hidden: n,
      onClick: r,
      onKeyDown: g,
      onMouseEnter: () => x(!0),
      onFocus: () => x(!0),
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
                children: /* @__PURE__ */ u(je, { children: [
                  /* @__PURE__ */ a(Fe, { className: v(p && "tw:me-1"), asChild: !0, children: /* @__PURE__ */ a(
                    Y,
                    {
                      className: "tw:m-1 tw:h-6 tw:w-6",
                      variant: "ghost",
                      size: "icon",
                      onClick: (m) => m.stopPropagation(),
                      onFocus: (m) => m.stopPropagation(),
                      children: /* @__PURE__ */ a(Ls, {})
                    }
                  ) }),
                  /* @__PURE__ */ a(Ue, { align: "end", children: d })
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
function mh({ message: t, id: e, className: r }) {
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
function vh({
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
      zt,
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
      ra,
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
function bh({ currentStep: t, totalSteps: e, locale: r }) {
  const o = r || "en", n = I(() => {
    const c = new Nn(o);
    return (l) => c.format(l);
  }, [o]), i = Math.min(Math.max(t, 1), e), s = Array.from({ length: e }, (c, l) => l + 1);
  return /* @__PURE__ */ a("div", { className: "tw:flex tw:items-center", "aria-hidden": "true", children: s.map((c) => {
    let l = "upcoming";
    return c === i ? l = "active" : c < i && (l = "complete"), /* @__PURE__ */ u(aa, { children: [
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
          children: l === "complete" ? /* @__PURE__ */ a(Ie, { className: "tw:h-4 tw:w-4" }) : n(c)
        }
      )
    ] }, c);
  }) });
}
const Cu = no(
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
function xh({
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
        Cu({ variant: e }),
        t
      ),
      ...r
    }
  );
}
function yh({ className: t, ...e }) {
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
function kh({ className: t, ...e }) {
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
function _h({ ...t }) {
  return /* @__PURE__ */ a(At.Root, { "data-slot": "context-menu", ...t });
}
function Nh({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    At.Trigger,
    {
      "data-slot": "context-menu-trigger",
      className: v("tw:select-none", t),
      ...e
    }
  );
}
function Ch({ ...t }) {
  return /* @__PURE__ */ a(At.Group, { "data-slot": "context-menu-group", ...t });
}
function Eh({ ...t }) {
  return /* @__PURE__ */ a(At.Portal, { "data-slot": "context-menu-portal", ...t });
}
function Th({ ...t }) {
  return /* @__PURE__ */ a(At.Sub, { "data-slot": "context-menu-sub", ...t });
}
function Sh({
  ...t
}) {
  return /* @__PURE__ */ a(At.RadioGroup, { "data-slot": "context-menu-radio-group", ...t });
}
function zh({
  className: t,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: e,
  ...r
}) {
  return /* @__PURE__ */ a(At.Portal, { children: /* @__PURE__ */ a(
    At.Content,
    {
      "data-slot": "context-menu-content",
      className: v(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        // CUSTOM: Fixed tw: prefix not being on some classes and removed erroneous empty tw: tokens
        // CUSTOM: Removed tw:z-50 to use the shared z-index constant below (see style prop)
        "pr-twp tw:max-h-(--radix-context-menu-content-available-height) tw:min-w-36 tw:origin-(--radix-context-menu-content-transform-origin) tw:overflow-x-hidden tw:overflow-y-auto tw:rounded-lg tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95 tw:animate-none! tw:bg-popover/70 tw:before:-z-1 tw:**:data-[slot$=-item]:focus:bg-foreground/10 tw:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 tw:**:data-[slot$=-separator]:bg-foreground/5 tw:**:data-[slot$=-trigger]:focus:bg-foreground/10 tw:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! tw:**:data-[variant=destructive]:focus:bg-foreground/10! tw:**:data-[variant=destructive]:text-accent-foreground! tw:**:data-[variant=destructive]:**:text-accent-foreground! tw:relative tw:before:pointer-events-none tw:before:absolute tw:before:inset-0 tw:before:rounded-[inherit] tw:before:backdrop-blur-2xl tw:before:backdrop-saturate-150",
        t
      ),
      style: { zIndex: ar, ...e },
      ...r
    }
  ) });
}
function Rh({
  className: t,
  inset: e,
  variant: r = "default",
  ...o
}) {
  return /* @__PURE__ */ a(
    At.Item,
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
function Dh({
  className: t,
  inset: e,
  children: r,
  ...o
}) {
  return /* @__PURE__ */ u(
    At.SubTrigger,
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
        /* @__PURE__ */ a(Sn, { className: "tw:ms-auto" })
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
    At.SubContent,
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
      style: { zIndex: ar, ...e },
      ...r
    }
  );
}
function Oh({
  className: t,
  children: e,
  checked: r,
  inset: o,
  ...n
}) {
  return /* @__PURE__ */ u(
    At.CheckboxItem,
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
        /* @__PURE__ */ a("span", { className: "tw:pointer-events-none tw:absolute tw:end-2", children: /* @__PURE__ */ a(At.ItemIndicator, { children: /* @__PURE__ */ a(oa, {}) }) }),
        e
      ]
    }
  );
}
function $h({
  className: t,
  children: e,
  inset: r,
  ...o
}) {
  return /* @__PURE__ */ u(
    At.RadioItem,
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
        /* @__PURE__ */ a("span", { className: "tw:pointer-events-none tw:absolute tw:end-2", children: /* @__PURE__ */ a(At.ItemIndicator, { children: /* @__PURE__ */ a(oa, {}) }) }),
        e
      ]
    }
  );
}
function Ih({
  className: t,
  inset: e,
  ...r
}) {
  return /* @__PURE__ */ a(
    At.Label,
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
function Ah({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    At.Separator,
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
function Ph({ className: t, ...e }) {
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
function Vh({ ...t }) {
  return /* @__PURE__ */ a(Ke.Root, { "data-slot": "drawer", ...t });
}
function Lh({ ...t }) {
  return /* @__PURE__ */ a(Ke.Trigger, { "data-slot": "drawer-trigger", ...t });
}
function Eu({ ...t }) {
  return /* @__PURE__ */ a(Ke.Portal, { "data-slot": "drawer-portal", ...t });
}
function Bh({ ...t }) {
  return /* @__PURE__ */ a(Ke.Close, { "data-slot": "drawer-close", ...t });
}
function Tu({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    Ke.Overlay,
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
function jh({
  className: t,
  children: e,
  // CUSTOM: Destructure hideDrawerHandle to conditionally render the drag handle
  hideDrawerHandle: r = !1,
  ...o
}) {
  const n = ye();
  return /* @__PURE__ */ u(Eu, { "data-slot": "drawer-portal", children: [
    /* @__PURE__ */ a(Tu, {}),
    /* @__PURE__ */ u(
      Ke.Content,
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
function Fh({ className: t, ...e }) {
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
function Uh({ className: t, ...e }) {
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
function Kh({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    Ke.Title,
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
function qh({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    Ke.Description,
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
function Gh({
  className: t,
  value: e,
  ...r
}) {
  return /* @__PURE__ */ a(
    $o.Root,
    {
      "data-slot": "progress",
      className: v(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:relative tw:flex tw:h-1 tw:w-full tw:items-center tw:overflow-x-hidden tw:rounded-full tw:bg-muted",
        t
      ),
      ...r,
      children: /* @__PURE__ */ a(
        $o.Indicator,
        {
          "data-slot": "progress-indicator",
          className: "tw:size-full tw:flex-1 tw:bg-primary tw:transition-all",
          style: { transform: `translateX(-${100 - (e || 0)}%)` }
        }
      )
    }
  );
}
function Hh({ ...t }) {
  const { theme: e = "system" } = wl();
  return /* @__PURE__ */ a(
    ul,
    {
      theme: e === "light" || e === "dark" || e === "system" ? e : "system",
      className: "tw:toaster tw:group",
      icons: {
        success: /* @__PURE__ */ a(ic, { className: "tw:size-4" }),
        info: /* @__PURE__ */ a(nc, { className: "tw:size-4" }),
        warning: /* @__PURE__ */ a(oc, { className: "tw:size-4" }),
        error: /* @__PURE__ */ a(ac, { className: "tw:size-4" }),
        loading: /* @__PURE__ */ a(rc, { className: "tw:size-4 tw:animate-spin" })
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
function Yh({
  className: t,
  defaultValue: e,
  value: r,
  min: o = 0,
  max: n = 100,
  ...i
}) {
  const s = ye(), c = Jt.useMemo(
    () => Array.isArray(r) ? r : Array.isArray(e) ? e : [o, n],
    [r, e, o, n]
  );
  return /* @__PURE__ */ u(
    Or.Root,
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
          Or.Track,
          {
            "data-slot": "slider-track",
            className: "tw:relative tw:grow tw:overflow-hidden tw:rounded-full tw:bg-muted tw:data-horizontal:h-1 tw:data-horizontal:w-full tw:data-vertical:h-full tw:data-vertical:w-1",
            children: /* @__PURE__ */ a(
              Or.Range,
              {
                "data-slot": "slider-range",
                className: "tw:absolute tw:bg-primary tw:select-none tw:data-horizontal:h-full tw:data-vertical:w-full"
              }
            )
          }
        ),
        Array.from({ length: c.length }, (l, d) => /* @__PURE__ */ a(
          Or.Thumb,
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
function Wh({
  className: t,
  size: e = "default",
  ...r
}) {
  return /* @__PURE__ */ a(
    Io.Root,
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
        Io.Thumb,
        {
          "data-slot": "switch-thumb",
          className: "tw:pointer-events-none tw:block tw:rounded-full tw:bg-background tw:ring-0 tw:transition-transform tw:group-data-[size=default]/switch:size-4 tw:group-data-[size=sm]/switch:size-3 tw:group-data-[size=default]/switch:data-checked:translate-x-[calc(100%-2px)] tw:rtl:group-data-[size=default]/switch:data-checked:-translate-x-[calc(100%-2px)] tw:group-data-[size=sm]/switch:data-checked:translate-x-[calc(100%-2px)] tw:rtl:group-data-[size=sm]/switch:data-checked:-translate-x-[calc(100%-2px)] tw:dark:data-checked:bg-primary-foreground tw:group-data-[size=default]/switch:data-unchecked:translate-x-0 tw:rtl:group-data-[size=default]/switch:data-unchecked:-translate-x-0 tw:group-data-[size=sm]/switch:data-unchecked:translate-x-0 tw:rtl:group-data-[size=sm]/switch:data-unchecked:-translate-x-0 tw:dark:data-unchecked:bg-foreground"
        }
      )
    }
  );
}
function Xh({
  className: t,
  orientation: e = "horizontal",
  ...r
}) {
  return /* @__PURE__ */ a(
    he.Root,
    {
      "data-slot": "tabs",
      "data-orientation": e,
      className: v("tw:group/tabs tw:flex tw:gap-2 tw:data-horizontal:flex-col", t),
      ...r
    }
  );
}
const Su = no(
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
function Jh({
  className: t,
  variant: e = "default",
  ...r
}) {
  const o = ye();
  return /* @__PURE__ */ a(
    he.List,
    {
      "data-slot": "tabs-list",
      "data-variant": e,
      className: v("pr-twp", Su({ variant: e }), t),
      dir: o,
      ...r
    }
  );
}
function Zh({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    he.Trigger,
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
function Qh({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    he.Content,
    {
      "data-slot": "tabs-content",
      className: v("pr-twp tw:flex-1 tw:text-sm tw:outline-none", t),
      ...e
    }
  );
}
const tg = (t, e) => {
  G(() => {
    if (!t) return;
    let r = !1;
    const n = t((i) => {
      r || e(i);
    });
    return () => {
      r = !0;
      try {
        n();
      } catch (i) {
        console.warn("useEvent: error while unsubscribing from event", i);
      }
    };
  }, [t, e]);
}, eg = (t, e) => {
  G(() => {
    if (!t) return;
    let r = !1, o, n = !1;
    const i = (c) => {
      r || e(c);
    }, s = () => {
      if (n || !o) return;
      n = !0;
      const c = o;
      (async () => {
        try {
          await c();
        } catch (l) {
          console.warn("useEventAsync: error while unsubscribing from event", l);
        }
      })();
    };
    return (async () => {
      try {
        o = await Promise.resolve(t(i)), r && s();
      } catch (c) {
        console.warn("useEventAsync: error while subscribing to event", c);
      }
    })(), () => {
      r = !0, s();
    };
  }, [t, e]);
};
function zu(t) {
  return {
    preserveValue: !0,
    ...t
  };
}
const rg = (t, e, r = {}) => {
  const o = K(e);
  o.current = e;
  const n = K(r);
  n.current = zu(n.current);
  const [i, s] = N(() => o.current), [c, l] = N(!0);
  return G(() => {
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
};
function ag(t) {
  G(() => {
    let e;
    return t && (e = document.createElement("style"), e.appendChild(document.createTextNode(t)), document.head.appendChild(e)), () => {
      e && document.head.removeChild(e);
    };
  }, [t]);
}
function og(t) {
  const e = I(() => Hs(t).slice().sort().join(" "), [t]);
  return I(() => e ? e.split(" ") : [], [e]);
}
const Ru = () => {
  const [t, e] = N(
    () => document.body.getBoundingClientRect().height > 0
  );
  return G(() => {
    const r = new IntersectionObserver((o) => {
      const n = o[o.length - 1];
      n && e(n.isIntersecting);
    });
    return r.observe(document.body), () => {
      r.disconnect();
    };
  }, []), t;
};
function Du(t, e, r) {
  return t ? r.dark : e === void 0 ? r.lightDefault : r.lightUnselected;
}
function ng(t, e) {
  const r = Ru();
  return Du(t, r, e);
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

/* \\fp (footnote paragraph) displays like a paragraph start — a line break before its span —
   while the note stays one inline run in the data (no newline ever enters USJ or USFM). A
   ::before generated line break is used instead of \`display: block\` because it keeps the span
   inline (the trailing \\f* closer glyph stays on the last content line instead of dropping to
   its own line) and the pseudo-element is not in the DOM, so the caret can never land in it and
   the editor's selection/serialization are untouched. Mirrors the structural rule in the
   editor's usj-nodes stylesheet so the popover renders the break even when the host page does
   not load that stylesheet (e.g. Storybook). */
.footnote-editor .note.expanded .usfm_fp::before {
  content: '\\A';
  white-space: pre;
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
@layer properties{@supports (((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))){*,:before,:after,::backdrop{--tw-translate-x:0;--tw-translate-y:0;--tw-translate-z:0;--tw-rotate-x:initial;--tw-rotate-y:initial;--tw-rotate-z:initial;--tw-skew-x:initial;--tw-skew-y:initial;--tw-space-y-reverse:0;--tw-space-x-reverse:0;--tw-divide-x-reverse:0;--tw-border-style:solid;--tw-divide-y-reverse:0;--tw-leading:initial;--tw-font-weight:initial;--tw-tracking:initial;--tw-ordinal:initial;--tw-slashed-zero:initial;--tw-numeric-figure:initial;--tw-numeric-spacing:initial;--tw-numeric-fraction:initial;--tw-shadow:0 0 #0000;--tw-shadow-color:initial;--tw-shadow-alpha:100%;--tw-inset-shadow:0 0 #0000;--tw-inset-shadow-color:initial;--tw-inset-shadow-alpha:100%;--tw-ring-color:initial;--tw-ring-shadow:0 0 #0000;--tw-inset-ring-color:initial;--tw-inset-ring-shadow:0 0 #0000;--tw-ring-inset:initial;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-offset-shadow:0 0 #0000;--tw-blur:initial;--tw-brightness:initial;--tw-contrast:initial;--tw-grayscale:initial;--tw-hue-rotate:initial;--tw-invert:initial;--tw-opacity:initial;--tw-saturate:initial;--tw-sepia:initial;--tw-drop-shadow:initial;--tw-drop-shadow-color:initial;--tw-drop-shadow-alpha:100%;--tw-drop-shadow-size:initial;--tw-duration:initial;--tw-ease:initial;--tw-content:"";--tw-backdrop-blur:initial;--tw-backdrop-brightness:initial;--tw-backdrop-contrast:initial;--tw-backdrop-grayscale:initial;--tw-backdrop-hue-rotate:initial;--tw-backdrop-invert:initial;--tw-backdrop-opacity:initial;--tw-backdrop-saturate:initial;--tw-backdrop-sepia:initial;--tw-outline-style:solid;--tw-animation-delay:0s;--tw-animation-direction:normal;--tw-animation-duration:initial;--tw-animation-fill-mode:none;--tw-animation-iteration-count:1;--tw-enter-blur:0;--tw-enter-opacity:1;--tw-enter-rotate:0;--tw-enter-scale:1;--tw-enter-translate-x:0;--tw-enter-translate-y:0;--tw-exit-blur:0;--tw-exit-opacity:1;--tw-exit-rotate:0;--tw-exit-scale:1;--tw-exit-translate-x:0;--tw-exit-translate-y:0}}}@layer theme{:root,:host{--tw-font-mono:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;--tw-color-red-100:oklch(93.6% .032 17.717);--tw-color-red-200:oklch(88.5% .062 18.334);--tw-color-red-300:oklch(80.8% .114 19.571);--tw-color-red-400:oklch(70.4% .191 22.216);--tw-color-red-500:oklch(63.7% .237 25.331);--tw-color-red-600:oklch(57.7% .245 27.325);--tw-color-red-700:oklch(50.5% .213 27.518);--tw-color-red-800:oklch(44.4% .177 26.899);--tw-color-orange-100:oklch(95.4% .038 75.164);--tw-color-orange-800:oklch(47% .157 37.304);--tw-color-amber-200:oklch(92.4% .12 95.746);--tw-color-amber-400:oklch(82.8% .189 84.429);--tw-color-amber-500:oklch(76.9% .188 70.08);--tw-color-amber-600:oklch(66.6% .179 58.318);--tw-color-yellow-50:oklch(98.7% .026 102.212);--tw-color-yellow-100:oklch(97.3% .071 103.193);--tw-color-yellow-400:oklch(85.2% .199 91.936);--tw-color-yellow-500:oklch(79.5% .184 86.047);--tw-color-yellow-600:oklch(68.1% .162 75.834);--tw-color-yellow-700:oklch(55.4% .135 66.442);--tw-color-green-50:oklch(98.2% .018 155.826);--tw-color-green-100:oklch(96.2% .044 156.743);--tw-color-green-500:oklch(72.3% .219 149.579);--tw-color-green-600:oklch(62.7% .194 149.214);--tw-color-green-700:oklch(52.7% .154 150.069);--tw-color-green-800:oklch(44.8% .119 151.328);--tw-color-teal-400:oklch(77.7% .152 181.912);--tw-color-teal-500:oklch(70.4% .14 182.503);--tw-color-teal-600:oklch(60% .118 184.704);--tw-color-sky-400:oklch(74.6% .16 232.661);--tw-color-sky-500:oklch(68.5% .169 237.323);--tw-color-sky-600:oklch(58.8% .158 241.966);--tw-color-blue-50:oklch(97% .014 254.604);--tw-color-blue-100:oklch(93.2% .032 255.585);--tw-color-blue-400:oklch(70.7% .165 254.624);--tw-color-blue-500:oklch(62.3% .214 259.815);--tw-color-blue-600:oklch(54.6% .245 262.881);--tw-color-blue-800:oklch(42.4% .199 265.638);--tw-color-indigo-200:oklch(87% .065 274.039);--tw-color-purple-50:oklch(97.7% .014 308.299);--tw-color-purple-200:oklch(90.2% .063 306.703);--tw-color-purple-900:oklch(38.1% .176 304.987);--tw-color-rose-400:oklch(71.2% .194 13.428);--tw-color-rose-500:oklch(64.5% .246 16.439);--tw-color-rose-600:oklch(58.6% .253 17.585);--tw-color-slate-50:oklch(98.4% .003 247.858);--tw-color-slate-300:oklch(86.9% .022 252.894);--tw-color-slate-400:oklch(70.4% .04 256.788);--tw-color-slate-500:oklch(55.4% .046 257.417);--tw-color-slate-900:oklch(20.8% .042 265.755);--tw-color-gray-50:oklch(98.5% .002 247.839);--tw-color-gray-100:oklch(96.7% .003 264.542);--tw-color-gray-300:oklch(87.2% .01 258.338);--tw-color-gray-500:oklch(55.1% .027 264.364);--tw-color-gray-600:oklch(44.6% .03 256.802);--tw-color-gray-700:oklch(37.3% .034 259.733);--tw-color-gray-800:oklch(27.8% .033 256.848);--tw-color-zinc-400:oklch(70.5% .015 286.067);--tw-color-neutral-300:oklch(87% 0 0);--tw-color-black:#000;--tw-color-white:#fff;--tw-container-xs:20rem;--tw-container-sm:24rem;--tw-container-md:28rem;--tw-container-lg:32rem;--tw-container-2xl:42rem;--tw-container-3xl:48rem;--tw-container-4xl:56rem;--tw-container-6xl:72rem;--tw-text-xs:.75rem;--tw-text-xs--line-height:calc(1 / .75);--tw-text-sm:.875rem;--tw-text-sm--line-height:calc(1.25 / .875);--tw-text-base:1rem;--tw-text-base--line-height:calc(1.5 / 1);--tw-text-lg:1.125rem;--tw-text-lg--line-height:calc(1.75 / 1.125);--tw-text-xl:1.25rem;--tw-text-xl--line-height:calc(1.75 / 1.25);--tw-text-2xl:1.5rem;--tw-text-2xl--line-height:calc(2 / 1.5);--tw-text-3xl:1.875rem;--tw-text-3xl--line-height:calc(2.25 / 1.875);--tw-text-4xl:2.25rem;--tw-text-4xl--line-height:calc(2.5 / 2.25);--tw-text-5xl:3rem;--tw-text-5xl--line-height:1;--tw-font-weight-normal:400;--tw-font-weight-medium:500;--tw-font-weight-semibold:600;--tw-font-weight-bold:700;--tw-font-weight-extrabold:800;--tw-tracking-tight:-.025em;--tw-tracking-wider:.05em;--tw-tracking-widest:.1em;--tw-leading-tight:1.25;--tw-leading-snug:1.375;--tw-leading-relaxed:1.625;--tw-leading-loose:2;--tw-radius-xs:.125rem;--tw-radius-md:calc(var(--radius) * .8);--tw-drop-shadow-sm:0 1px 2px #00000026;--tw-animate-spin:spin 1s linear infinite;--tw-animate-pulse:pulse 2s cubic-bezier(.4, 0, .6, 1) infinite;--tw-blur-xs:4px;--tw-blur-2xl:40px;--tw-default-transition-duration:.15s;--tw-default-transition-timing-function:cubic-bezier(.4, 0, .2, 1);--tw-default-font-family:"IBM Plex Sans Variable", sans-serif;--tw-default-mono-font-family:var(--tw-font-mono)}}@layer base{.pr-twp,.pr-twp *{border-color:var(--border);outline-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.pr-twp,.pr-twp *{outline-color:color-mix(in oklab, var(--ring) 50%, transparent)}}body.pr-twp{background-color:var(--background);color:var(--foreground)}html.pr-twp{font-family:IBM Plex Sans Variable,sans-serif}:where(.pr-twp,.pr-twp *),:where(.pr-twp,.pr-twp *):after,:where(.pr-twp,.pr-twp *):before,:where(.pr-twp,.pr-twp *) ::backdrop{box-sizing:border-box;border:0 solid;margin:0;padding:0}:where(.pr-twp,.pr-twp *) ::file-selector-button{box-sizing:border-box;border:0 solid;margin:0;padding:0}.pr-twp{-webkit-text-size-adjust:100%;tab-size:4;line-height:1.5;font-family:var(--tw-default-font-family,ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");font-feature-settings:var(--tw-default-font-feature-settings,normal);font-variation-settings:var(--tw-default-font-variation-settings,normal);-webkit-tap-highlight-color:transparent}hr:where(.pr-twp,.pr-twp *){height:0;color:inherit;border-top-width:1px}abbr:where([title]):where(.pr-twp,.pr-twp *){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1:where(.pr-twp,.pr-twp *),h2:where(.pr-twp,.pr-twp *),h3:where(.pr-twp,.pr-twp *),h4:where(.pr-twp,.pr-twp *),h5:where(.pr-twp,.pr-twp *),h6:where(.pr-twp,.pr-twp *){font-size:inherit;font-weight:inherit}a:where(.pr-twp,.pr-twp *){color:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b:where(.pr-twp,.pr-twp *),strong:where(.pr-twp,.pr-twp *){font-weight:bolder}code:where(.pr-twp,.pr-twp *),kbd:where(.pr-twp,.pr-twp *),samp:where(.pr-twp,.pr-twp *),pre:where(.pr-twp,.pr-twp *){font-family:var(--tw-default-mono-font-family,ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace);font-feature-settings:var(--tw-default-mono-font-feature-settings,normal);font-variation-settings:var(--tw-default-mono-font-variation-settings,normal);font-size:1em}small:where(.pr-twp,.pr-twp *){font-size:80%}sub:where(.pr-twp,.pr-twp *),sup:where(.pr-twp,.pr-twp *){vertical-align:baseline;font-size:75%;line-height:0;position:relative}sub:where(.pr-twp,.pr-twp *){bottom:-.25em}sup:where(.pr-twp,.pr-twp *){top:-.5em}table:where(.pr-twp,.pr-twp *){text-indent:0;border-color:inherit;border-collapse:collapse}:-moz-focusring:where(.pr-twp,.pr-twp *){outline:auto}progress:where(.pr-twp,.pr-twp *){vertical-align:baseline}summary:where(.pr-twp,.pr-twp *){display:list-item}ol:where(.pr-twp,.pr-twp *),ul:where(.pr-twp,.pr-twp *),menu:where(.pr-twp,.pr-twp *){list-style:none}img:where(.pr-twp,.pr-twp *),svg:where(.pr-twp,.pr-twp *),video:where(.pr-twp,.pr-twp *),canvas:where(.pr-twp,.pr-twp *),audio:where(.pr-twp,.pr-twp *),iframe:where(.pr-twp,.pr-twp *),embed:where(.pr-twp,.pr-twp *),object:where(.pr-twp,.pr-twp *){vertical-align:middle;display:block}img:where(.pr-twp,.pr-twp *),video:where(.pr-twp,.pr-twp *){max-width:100%;height:auto}button:where(.pr-twp,.pr-twp *),input:where(.pr-twp,.pr-twp *),select:where(.pr-twp,.pr-twp *),optgroup:where(.pr-twp,.pr-twp *),textarea:where(.pr-twp,.pr-twp *){font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(.pr-twp,.pr-twp *) ::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(select:is([multiple],[size])) optgroup:where(.pr-twp,.pr-twp *){font-weight:bolder}:where(select:is([multiple],[size])) optgroup option:where(.pr-twp,.pr-twp *){padding-inline-start:20px}:where(.pr-twp,.pr-twp *) ::file-selector-button{margin-inline-end:4px}:where(.pr-twp,.pr-twp *) ::placeholder{opacity:1}@supports (not ((-webkit-appearance:-apple-pay-button))) or (contain-intrinsic-size:1px){:where(.pr-twp,.pr-twp *) ::placeholder{color:currentColor}@supports (color:color-mix(in lab, red, red)){:where(.pr-twp,.pr-twp *) ::placeholder{color:color-mix(in oklab, currentcolor 50%, transparent)}}}textarea:where(.pr-twp,.pr-twp *){resize:vertical}:where(.pr-twp,.pr-twp *) ::-webkit-search-decoration{-webkit-appearance:none}:where(.pr-twp,.pr-twp *) ::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit{display:inline-flex}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-fields-wrapper{padding:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-year-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-month-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-day-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-hour-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-minute-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-second-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-millisecond-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-meridiem-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-calendar-picker-indicator{line-height:1}:-moz-ui-invalid:where(.pr-twp,.pr-twp *){box-shadow:none}button:where(.pr-twp,.pr-twp *),input:where([type=button],[type=reset],[type=submit]):where(.pr-twp,.pr-twp *){appearance:button}:where(.pr-twp,.pr-twp *) ::file-selector-button{appearance:button}:where(.pr-twp,.pr-twp *) ::-webkit-inner-spin-button{height:auto}:where(.pr-twp,.pr-twp *) ::-webkit-outer-spin-button{height:auto}[hidden]:where(:not([hidden=until-found])):where(.pr-twp,.pr-twp *){display:none!important}}@layer components;@layer utilities{.tw\\:\\@container\\/card-header{container:card-header/inline-size}.tw\\:\\@container\\/search{container:search/inline-size}.tw\\:\\@container\\/toolbar{container:toolbar/inline-size}.tw\\:pointer-events-auto{pointer-events:auto}.tw\\:pointer-events-none{pointer-events:none}.tw\\:invisible{visibility:hidden}.tw\\:sr-only{clip-path:inset(50%);white-space:nowrap;border-width:0;width:1px;height:1px;margin:-1px;padding:0;position:absolute;overflow:hidden}.tw\\:absolute{position:absolute}.tw\\:fixed{position:fixed}.tw\\:relative{position:relative}.tw\\:sticky{position:sticky}.tw\\:inset-0{inset:calc(calc(var(--spacing)) * 0)}.tw\\:inset-y-0{inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:inset-s-3{inset-inline-start:calc(calc(var(--spacing)) * 3)}.tw\\:start-1\\.5{inset-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:start-1\\/2{inset-inline-start:50%}.tw\\:end-0{inset-inline-end:calc(calc(var(--spacing)) * 0)}.tw\\:end-1{inset-inline-end:calc(calc(var(--spacing)) * 1)}.tw\\:end-2{inset-inline-end:calc(calc(var(--spacing)) * 2)}.tw\\:end-3{inset-inline-end:calc(calc(var(--spacing)) * 3)}.tw\\:inset-e-0{inset-inline-end:calc(calc(var(--spacing)) * 0)}.tw\\:-top-\\[1px\\]{top:-1px}.tw\\:top-0{top:calc(calc(var(--spacing)) * 0)}.tw\\:top-1\\.5{top:calc(calc(var(--spacing)) * 1.5)}.tw\\:top-1\\/2{top:50%}.tw\\:top-1\\/3{top:33.3333%}.tw\\:top-2{top:calc(calc(var(--spacing)) * 2)}.tw\\:top-2\\.5{top:calc(calc(var(--spacing)) * 2.5)}.tw\\:top-3\\.5{top:calc(calc(var(--spacing)) * 3.5)}.tw\\:top-\\[-1px\\]{top:-1px}.tw\\:top-full{top:100%}.tw\\:-right-1{right:calc(calc(var(--spacing)) * -1)}.tw\\:right-0{right:calc(calc(var(--spacing)) * 0)}.tw\\:right-1{right:calc(calc(var(--spacing)) * 1)}.tw\\:right-3{right:calc(calc(var(--spacing)) * 3)}.tw\\:bottom-0{bottom:calc(calc(var(--spacing)) * 0)}.tw\\:-left-\\[1px\\]{left:-1px}.tw\\:left-0{left:calc(calc(var(--spacing)) * 0)}.tw\\:left-1\\/2{left:50%}.tw\\:left-2{left:calc(calc(var(--spacing)) * 2)}.tw\\:left-3{left:calc(calc(var(--spacing)) * 3)}.tw\\:isolate{isolation:isolate}.tw\\:z-10{z-index:10}.tw\\:z-20{z-index:20}.tw\\:z-50{z-index:50}.tw\\:order-first{order:-9999}.tw\\:order-last{order:9999}.tw\\:col-span-1{grid-column:span 1/span 1}.tw\\:col-span-2{grid-column:span 2/span 2}.tw\\:col-span-3{grid-column:span 3/span 3}.tw\\:col-start-1{grid-column-start:1}.tw\\:col-start-2{grid-column-start:2}.tw\\:row-span-2{grid-row:span 2/span 2}.tw\\:row-start-1{grid-row-start:1}.tw\\:row-start-2{grid-row-start:2}.tw\\:m-0{margin:calc(calc(var(--spacing)) * 0)}.tw\\:m-1{margin:calc(calc(var(--spacing)) * 1)}.tw\\:m-2{margin:calc(calc(var(--spacing)) * 2)}.tw\\:-mx-1{margin-inline:calc(calc(var(--spacing)) * -1)}.tw\\:-mx-4{margin-inline:calc(calc(var(--spacing)) * -4)}.tw\\:mx-0{margin-inline:calc(calc(var(--spacing)) * 0)}.tw\\:mx-1{margin-inline:calc(calc(var(--spacing)) * 1)}.tw\\:mx-2{margin-inline:calc(calc(var(--spacing)) * 2)}.tw\\:mx-3\\.5{margin-inline:calc(calc(var(--spacing)) * 3.5)}.tw\\:mx-8{margin-inline:calc(calc(var(--spacing)) * 8)}.tw\\:my-1{margin-block:calc(calc(var(--spacing)) * 1)}.tw\\:my-2\\.5{margin-block:calc(calc(var(--spacing)) * 2.5)}.tw\\:my-4{margin-block:calc(calc(var(--spacing)) * 4)}.tw\\:my-auto{margin-block:auto}.tw\\:ms-1{margin-inline-start:calc(calc(var(--spacing)) * 1)}.tw\\:ms-2{margin-inline-start:calc(calc(var(--spacing)) * 2)}.tw\\:ms-5{margin-inline-start:calc(calc(var(--spacing)) * 5)}.tw\\:ms-auto{margin-inline-start:auto}.tw\\:me-1{margin-inline-end:calc(calc(var(--spacing)) * 1)}.tw\\:me-2{margin-inline-end:calc(calc(var(--spacing)) * 2)}.tw\\:prose{color:var(--tw-prose-body);max-width:65ch}.tw\\:prose :where(p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em}.tw\\:prose :where([class~=lead]):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-lead);margin-top:1.2em;margin-bottom:1.2em;font-size:1.25em;line-height:1.6}.tw\\:prose :where(a):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-links);font-weight:500;text-decoration:underline}.tw\\:prose :where(strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-bold);font-weight:600}.tw\\:prose :where(a strong):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(blockquote strong):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(thead th strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.tw\\:prose :where(ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em;padding-inline-start:1.625em;list-style-type:decimal}.tw\\:prose :where(ol[type=A]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-alpha}.tw\\:prose :where(ol[type=a]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-alpha}.tw\\:prose :where(ol[type=A s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-alpha}.tw\\:prose :where(ol[type=a s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-alpha}.tw\\:prose :where(ol[type=I]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-roman}.tw\\:prose :where(ol[type=i]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-roman}.tw\\:prose :where(ol[type=I s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-roman}.tw\\:prose :where(ol[type=i s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-roman}.tw\\:prose :where(ol[type="1"]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:decimal}.tw\\:prose :where(ul):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em;padding-inline-start:1.625em;list-style-type:disc}.tw\\:prose :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *))::marker{color:var(--tw-prose-counters);font-weight:400}.tw\\:prose :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *))::marker{color:var(--tw-prose-bullets)}.tw\\:prose :where(dt):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:1.25em;font-weight:600}.tw\\:prose :where(hr):not(:where([class~=not-prose],[class~=not-prose] *)){border-color:var(--tw-prose-hr);border-top-width:1px;margin-top:3em;margin-bottom:3em}.tw\\:prose :where(blockquote):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-quotes);border-inline-start-width:.25rem;border-inline-start-color:var(--tw-prose-quote-borders);quotes:"“""”""‘""’";margin-top:1.6em;margin-bottom:1.6em;padding-inline-start:1em;font-style:italic;font-weight:500}.tw\\:prose :where(blockquote p:first-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):before{content:open-quote}.tw\\:prose :where(blockquote p:last-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:close-quote}.tw\\:prose :where(h1):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:0;margin-bottom:.888889em;font-size:2.25em;font-weight:800;line-height:1.11111}.tw\\:prose :where(h1 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:900}.tw\\:prose :where(h2):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:2em;margin-bottom:1em;font-size:1.5em;font-weight:700;line-height:1.33333}.tw\\:prose :where(h2 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:800}.tw\\:prose :where(h3):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:1.6em;margin-bottom:.6em;font-size:1.25em;font-weight:600;line-height:1.6}.tw\\:prose :where(h3 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:700}.tw\\:prose :where(h4):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:1.5em;margin-bottom:.5em;font-weight:600;line-height:1.5}.tw\\:prose :where(h4 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:700}.tw\\:prose :where(img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.tw\\:prose :where(picture):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em;display:block}.tw\\:prose :where(video):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.tw\\:prose :where(kbd):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-kbd);box-shadow:0 0 0 1px rgb(var(--tw-prose-kbd-shadows) / 10%), 0 3px 0 rgb(var(--tw-prose-kbd-shadows) / 10%);padding-top:.1875em;padding-inline-end:.375em;padding-bottom:.1875em;border-radius:.3125rem;padding-inline-start:.375em;font-family:inherit;font-size:.875em;font-weight:500}.tw\\:prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-code);font-size:.875em;font-weight:600}.tw\\:prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)):before,.tw\\:prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:"\`"}.tw\\:prose :where(a code):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h1 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.tw\\:prose :where(h2 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-size:.875em}.tw\\:prose :where(h3 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-size:.9em}.tw\\:prose :where(h4 code):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(blockquote code):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(thead th code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.tw\\:prose :where(pre):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-pre-code);background-color:var(--tw-prose-pre-bg);padding-top:.857143em;padding-inline-end:1.14286em;padding-bottom:.857143em;border-radius:.375rem;margin-top:1.71429em;margin-bottom:1.71429em;padding-inline-start:1.14286em;font-size:.875em;font-weight:400;line-height:1.71429;overflow-x:auto}.tw\\:prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)){font-weight:inherit;color:inherit;font-size:inherit;font-family:inherit;line-height:inherit;background-color:#0000;border-width:0;border-radius:0;padding:0}.tw\\:prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)):before,.tw\\:prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:none}.tw\\:prose :where(table):not(:where([class~=not-prose],[class~=not-prose] *)){table-layout:auto;width:100%;margin-top:2em;margin-bottom:2em;font-size:.875em;line-height:1.71429}.tw\\:prose :where(thead):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:1px;border-bottom-color:var(--tw-prose-th-borders)}.tw\\:prose :where(thead th):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);vertical-align:bottom;padding-inline-end:.571429em;padding-bottom:.571429em;padding-inline-start:.571429em;font-weight:600}.tw\\:prose :where(tbody tr):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:1px;border-bottom-color:var(--tw-prose-td-borders)}.tw\\:prose :where(tbody tr:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:0}.tw\\:prose :where(tbody td):not(:where([class~=not-prose],[class~=not-prose] *)){vertical-align:baseline}.tw\\:prose :where(tfoot):not(:where([class~=not-prose],[class~=not-prose] *)){border-top-width:1px;border-top-color:var(--tw-prose-th-borders)}.tw\\:prose :where(tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){vertical-align:top}.tw\\:prose :where(th,td):not(:where([class~=not-prose],[class~=not-prose] *)){text-align:start}.tw\\:prose :where(figure>*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose :where(figcaption):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-captions);margin-top:.857143em;font-size:.875em;line-height:1.42857}.tw\\:prose{--tw-prose-body:var(--foreground);--tw-prose-headings:var(--foreground);--tw-prose-lead:var(--muted-foreground);--tw-prose-links:var(--primary);--tw-prose-bold:var(--foreground);--tw-prose-counters:var(--muted-foreground);--tw-prose-bullets:var(--muted-foreground);--tw-prose-hr:var(--border);--tw-prose-quotes:var(--foreground);--tw-prose-quote-borders:var(--border);--tw-prose-captions:var(--muted-foreground);--tw-prose-kbd:oklch(21% .034 264.665);--tw-prose-kbd-shadows:NaN NaN NaN;--tw-prose-code:var(--foreground);--tw-prose-pre-code:var(--muted-foreground);--tw-prose-pre-bg:var(--muted);--tw-prose-th-borders:var(--border);--tw-prose-td-borders:var(--border);--tw-prose-invert-body:var(--foreground);--tw-prose-invert-headings:var(--foreground);--tw-prose-invert-lead:var(--muted-foreground);--tw-prose-invert-links:var(--primary);--tw-prose-invert-bold:var(--foreground);--tw-prose-invert-counters:var(--muted-foreground);--tw-prose-invert-bullets:var(--muted-foreground);--tw-prose-invert-hr:var(--border);--tw-prose-invert-quotes:var(--foreground);--tw-prose-invert-quote-borders:var(--border);--tw-prose-invert-captions:var(--muted-foreground);--tw-prose-invert-kbd:#fff;--tw-prose-invert-kbd-shadows:255 255 255;--tw-prose-invert-code:var(--foreground);--tw-prose-invert-pre-code:var(--muted-foreground);--tw-prose-invert-pre-bg:var(--muted);--tw-prose-invert-th-borders:var(--border);--tw-prose-invert-td-borders:var(--border);font-size:1rem;line-height:1.75}.tw\\:prose :where(picture>img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose :where(li):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.5em;margin-bottom:.5em}.tw\\:prose :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:.375em}.tw\\:prose :where(.tw\\:prose>ul>li p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.75em;margin-bottom:.75em}.tw\\:prose :where(.tw\\:prose>ul>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em}.tw\\:prose :where(.tw\\:prose>ul>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.25em}.tw\\:prose :where(.tw\\:prose>ol>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em}.tw\\:prose :where(.tw\\:prose>ol>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.25em}.tw\\:prose :where(ul ul,ul ol,ol ul,ol ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.75em;margin-bottom:.75em}.tw\\:prose :where(dl):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em}.tw\\:prose :where(dd):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.5em;padding-inline-start:1.625em}.tw\\:prose :where(hr+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h2+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h3+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h4+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose :where(thead th:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose :where(thead th:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose :where(tbody td,tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.571429em;padding-inline-end:.571429em;padding-bottom:.571429em;padding-inline-start:.571429em}.tw\\:prose :where(tbody td:first-child,tfoot td:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose :where(tbody td:last-child,tfoot td:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose :where(figure):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.tw\\:prose :where(.tw\\:prose>:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose :where(.tw\\:prose>:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:0}.tw\\:prose-sm{font-size:.875rem;line-height:1.71429}.tw\\:prose-sm :where(p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em;margin-bottom:1.14286em}.tw\\:prose-sm :where([class~=lead]):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.888889em;margin-bottom:.888889em;font-size:1.28571em;line-height:1.55556}.tw\\:prose-sm :where(blockquote):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.33333em;margin-bottom:1.33333em;padding-inline-start:1.11111em}.tw\\:prose-sm :where(h1):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:.8em;font-size:2.14286em;line-height:1.2}.tw\\:prose-sm :where(h2):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.6em;margin-bottom:.8em;font-size:1.42857em;line-height:1.4}.tw\\:prose-sm :where(h3):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.55556em;margin-bottom:.444444em;font-size:1.28571em;line-height:1.55556}.tw\\:prose-sm :where(h4):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.42857em;margin-bottom:.571429em;line-height:1.42857}.tw\\:prose-sm :where(img):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(picture):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.71429em;margin-bottom:1.71429em}.tw\\:prose-sm :where(picture>img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose-sm :where(video):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.71429em;margin-bottom:1.71429em}.tw\\:prose-sm :where(kbd):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.142857em;padding-inline-end:.357143em;padding-bottom:.142857em;border-radius:.3125rem;padding-inline-start:.357143em;font-size:.857143em}.tw\\:prose-sm :where(code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.857143em}.tw\\:prose-sm :where(h2 code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.9em}.tw\\:prose-sm :where(h3 code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.888889em}.tw\\:prose-sm :where(pre):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.666667em;padding-inline-end:1em;padding-bottom:.666667em;border-radius:.25rem;margin-top:1.66667em;margin-bottom:1.66667em;padding-inline-start:1em;font-size:.857143em;line-height:1.66667}.tw\\:prose-sm :where(ol):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(ul):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em;margin-bottom:1.14286em;padding-inline-start:1.57143em}.tw\\:prose-sm :where(li):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.285714em;margin-bottom:.285714em}.tw\\:prose-sm :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:.428571em}.tw\\:prose-sm :where(.tw\\:prose-sm>ul>li p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.571429em;margin-bottom:.571429em}.tw\\:prose-sm :where(.tw\\:prose-sm>ul>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em}.tw\\:prose-sm :where(.tw\\:prose-sm>ul>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.14286em}.tw\\:prose-sm :where(.tw\\:prose-sm>ol>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em}.tw\\:prose-sm :where(.tw\\:prose-sm>ol>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.14286em}.tw\\:prose-sm :where(ul ul,ul ol,ol ul,ol ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.571429em;margin-bottom:.571429em}.tw\\:prose-sm :where(dl):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em;margin-bottom:1.14286em}.tw\\:prose-sm :where(dt):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em}.tw\\:prose-sm :where(dd):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.285714em;padding-inline-start:1.57143em}.tw\\:prose-sm :where(hr):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2.85714em;margin-bottom:2.85714em}.tw\\:prose-sm :where(hr+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(h2+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(h3+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(h4+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose-sm :where(table):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.857143em;line-height:1.5}.tw\\:prose-sm :where(thead th):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:1em;padding-bottom:.666667em;padding-inline-start:1em}.tw\\:prose-sm :where(thead th:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose-sm :where(thead th:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose-sm :where(tbody td,tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.666667em;padding-inline-end:1em;padding-bottom:.666667em;padding-inline-start:1em}.tw\\:prose-sm :where(tbody td:first-child,tfoot td:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose-sm :where(tbody td:last-child,tfoot td:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose-sm :where(figure):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.71429em;margin-bottom:1.71429em}.tw\\:prose-sm :where(figure>*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose-sm :where(figcaption):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.666667em;font-size:.857143em;line-height:1.33333}.tw\\:prose-sm :where(.tw\\:prose-sm>:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose-sm :where(.tw\\:prose-sm>:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:0}.tw\\:-mt-4{margin-top:calc(calc(var(--spacing)) * -4)}.tw\\:mt-0\\.5{margin-top:calc(calc(var(--spacing)) * .5)}.tw\\:mt-1{margin-top:calc(calc(var(--spacing)) * 1)}.tw\\:mt-2{margin-top:calc(calc(var(--spacing)) * 2)}.tw\\:mt-3{margin-top:calc(calc(var(--spacing)) * 3)}.tw\\:mt-4{margin-top:calc(calc(var(--spacing)) * 4)}.tw\\:mt-6{margin-top:calc(calc(var(--spacing)) * 6)}.tw\\:mt-auto{margin-top:auto}.tw\\:mr-1{margin-right:calc(calc(var(--spacing)) * 1)}.tw\\:mr-2{margin-right:calc(calc(var(--spacing)) * 2)}.tw\\:mr-3{margin-right:calc(calc(var(--spacing)) * 3)}.tw\\:-mb-4{margin-bottom:calc(calc(var(--spacing)) * -4)}.tw\\:mb-1{margin-bottom:calc(calc(var(--spacing)) * 1)}.tw\\:mb-2{margin-bottom:calc(calc(var(--spacing)) * 2)}.tw\\:mb-3{margin-bottom:calc(calc(var(--spacing)) * 3)}.tw\\:mb-4{margin-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:ml-1{margin-left:calc(calc(var(--spacing)) * 1)}.tw\\:ml-2{margin-left:calc(calc(var(--spacing)) * 2)}.tw\\:ml-4{margin-left:calc(calc(var(--spacing)) * 4)}.tw\\:ml-auto{margin-left:auto}.tw\\:box-border{box-sizing:border-box}.tw\\:line-clamp-3{-webkit-line-clamp:3;-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden}.tw\\:no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}.tw\\:no-scrollbar::-webkit-scrollbar{display:none}.tw\\:block{display:block}.tw\\:flex{display:flex}.tw\\:grid{display:grid}.tw\\:hidden{display:none}.tw\\:inline-block{display:inline-block}.tw\\:inline-flex{display:inline-flex}.tw\\:inline-grid{display:inline-grid}.tw\\:field-sizing-content{field-sizing:content}.tw\\:aspect-square{aspect-ratio:1}.tw\\:size-2{width:calc(calc(var(--spacing)) * 2);height:calc(calc(var(--spacing)) * 2)}.tw\\:size-2\\.5{width:calc(calc(var(--spacing)) * 2.5);height:calc(calc(var(--spacing)) * 2.5)}.tw\\:size-3{width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:size-3\\.5{width:calc(calc(var(--spacing)) * 3.5);height:calc(calc(var(--spacing)) * 3.5)}.tw\\:size-4{width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:size-6{width:calc(calc(var(--spacing)) * 6);height:calc(calc(var(--spacing)) * 6)}.tw\\:size-7{width:calc(calc(var(--spacing)) * 7);height:calc(calc(var(--spacing)) * 7)}.tw\\:size-8{width:calc(calc(var(--spacing)) * 8);height:calc(calc(var(--spacing)) * 8)}.tw\\:size-9{width:calc(calc(var(--spacing)) * 9);height:calc(calc(var(--spacing)) * 9)}.tw\\:size-full{width:100%;height:100%}.tw\\:h-1{height:calc(calc(var(--spacing)) * 1)}.tw\\:h-2{height:calc(calc(var(--spacing)) * 2)}.tw\\:h-3{height:calc(calc(var(--spacing)) * 3)}.tw\\:h-3\\.5{height:calc(calc(var(--spacing)) * 3.5)}.tw\\:h-4{height:calc(calc(var(--spacing)) * 4)}.tw\\:h-5{height:calc(calc(var(--spacing)) * 5)}.tw\\:h-6{height:calc(calc(var(--spacing)) * 6)}.tw\\:h-7{height:calc(calc(var(--spacing)) * 7)}.tw\\:h-8{height:calc(calc(var(--spacing)) * 8)}.tw\\:h-8\\!{height:calc(calc(var(--spacing)) * 8)!important}.tw\\:h-9{height:calc(calc(var(--spacing)) * 9)}.tw\\:h-10{height:calc(calc(var(--spacing)) * 10)}.tw\\:h-12{height:calc(calc(var(--spacing)) * 12)}.tw\\:h-14{height:calc(calc(var(--spacing)) * 14)}.tw\\:h-20{height:calc(calc(var(--spacing)) * 20)}.tw\\:h-24{height:calc(calc(var(--spacing)) * 24)}.tw\\:h-32{height:calc(calc(var(--spacing)) * 32)}.tw\\:h-40{height:calc(calc(var(--spacing)) * 40)}.tw\\:h-64{height:calc(calc(var(--spacing)) * 64)}.tw\\:h-80{height:calc(calc(var(--spacing)) * 80)}.tw\\:h-96{height:calc(calc(var(--spacing)) * 96)}.tw\\:h-\\[5px\\]{height:5px}.tw\\:h-\\[260px\\]{height:260px}.tw\\:h-\\[300px\\]{height:300px}.tw\\:h-\\[400px\\]{height:400px}.tw\\:h-\\[600px\\]{height:600px}.tw\\:h-\\[calc\\(100\\%-1px\\)\\]{height:calc(100% - 1px)}.tw\\:h-\\[calc\\(100\\%-2px\\)\\]{height:calc(100% - 2px)}.tw\\:h-auto{height:auto}.tw\\:h-full{height:100%}.tw\\:h-px{height:1px}.tw\\:h-svh{height:100svh}.tw\\:max-h-\\(--radix-context-menu-content-available-height\\){max-height:var(--radix-context-menu-content-available-height)}.tw\\:max-h-\\(--radix-dropdown-menu-content-available-height\\){max-height:var(--radix-dropdown-menu-content-available-height)}.tw\\:max-h-\\(--radix-select-content-available-height\\){max-height:var(--radix-select-content-available-height)}.tw\\:max-h-5{max-height:calc(calc(var(--spacing)) * 5)}.tw\\:max-h-10{max-height:calc(calc(var(--spacing)) * 10)}.tw\\:max-h-72{max-height:calc(calc(var(--spacing)) * 72)}.tw\\:max-h-80{max-height:calc(calc(var(--spacing)) * 80)}.tw\\:max-h-\\[96\\%\\]{max-height:96%}.tw\\:max-h-\\[300px\\]{max-height:300px}.tw\\:min-h-0{min-height:calc(calc(var(--spacing)) * 0)}.tw\\:min-h-11{min-height:calc(calc(var(--spacing)) * 11)}.tw\\:min-h-16{min-height:calc(calc(var(--spacing)) * 16)}.tw\\:min-h-\\[200px\\]{min-height:200px}.tw\\:min-h-full{min-height:100%}.tw\\:min-h-svh{min-height:100svh}.tw\\:w-\\(--radix-dropdown-menu-trigger-width\\){width:var(--radix-dropdown-menu-trigger-width)}.tw\\:w-\\(--sidebar-width\\){width:var(--sidebar-width)}.tw\\:w-1{width:calc(calc(var(--spacing)) * 1)}.tw\\:w-1\\/2{width:50%}.tw\\:w-2{width:calc(calc(var(--spacing)) * 2)}.tw\\:w-3{width:calc(calc(var(--spacing)) * 3)}.tw\\:w-3\\.5{width:calc(calc(var(--spacing)) * 3.5)}.tw\\:w-3\\/4{width:75%}.tw\\:w-4{width:calc(calc(var(--spacing)) * 4)}.tw\\:w-4\\/5{width:80%}.tw\\:w-4\\/6{width:66.6667%}.tw\\:w-5{width:calc(calc(var(--spacing)) * 5)}.tw\\:w-5\\/6{width:83.3333%}.tw\\:w-6{width:calc(calc(var(--spacing)) * 6)}.tw\\:w-8{width:calc(calc(var(--spacing)) * 8)}.tw\\:w-9{width:calc(calc(var(--spacing)) * 9)}.tw\\:w-9\\/12{width:75%}.tw\\:w-10{width:calc(calc(var(--spacing)) * 10)}.tw\\:w-12{width:calc(calc(var(--spacing)) * 12)}.tw\\:w-14{width:calc(calc(var(--spacing)) * 14)}.tw\\:w-20{width:calc(calc(var(--spacing)) * 20)}.tw\\:w-24{width:calc(calc(var(--spacing)) * 24)}.tw\\:w-32{width:calc(calc(var(--spacing)) * 32)}.tw\\:w-48{width:calc(calc(var(--spacing)) * 48)}.tw\\:w-56{width:calc(calc(var(--spacing)) * 56)}.tw\\:w-60{width:calc(calc(var(--spacing)) * 60)}.tw\\:w-64{width:calc(calc(var(--spacing)) * 64)}.tw\\:w-72{width:calc(calc(var(--spacing)) * 72)}.tw\\:w-80{width:calc(calc(var(--spacing)) * 80)}.tw\\:w-96{width:calc(calc(var(--spacing)) * 96)}.tw\\:w-\\[1px\\]{width:1px}.tw\\:w-\\[5px\\]{width:5px}.tw\\:w-\\[70px\\]{width:70px}.tw\\:w-\\[100px\\]{width:100px}.tw\\:w-\\[116px\\]{width:116px}.tw\\:w-\\[124px\\]{width:124px}.tw\\:w-\\[150px\\]{width:150px}.tw\\:w-\\[180px\\]{width:180px}.tw\\:w-\\[200px\\]{width:200px}.tw\\:w-\\[250px\\]{width:250px}.tw\\:w-\\[260px\\]{width:260px}.tw\\:w-\\[280px\\]{width:280px}.tw\\:w-\\[300px\\]{width:300px}.tw\\:w-\\[320px\\]{width:320px}.tw\\:w-\\[350px\\]{width:350px}.tw\\:w-\\[400px\\]{width:400px}.tw\\:w-\\[420px\\]{width:420px}.tw\\:w-\\[500px\\]{width:500px}.tw\\:w-\\[560px\\]{width:560px}.tw\\:w-\\[600px\\]{width:600px}.tw\\:w-\\[calc\\(100\\%-2px\\)\\]{width:calc(100% - 2px)}.tw\\:w-\\[var\\(--radix-dropdown-menu-trigger-width\\)\\]{width:var(--radix-dropdown-menu-trigger-width)}.tw\\:w-auto{width:auto}.tw\\:w-fit{width:fit-content}.tw\\:w-full{width:100%}.tw\\:w-max{width:max-content}.tw\\:w-px{width:1px}.tw\\:max-w-\\(--skeleton-width\\){max-width:var(--skeleton-width)}.tw\\:max-w-2xl{max-width:var(--tw-container-2xl)}.tw\\:max-w-3xl{max-width:var(--tw-container-3xl)}.tw\\:max-w-4xl{max-width:var(--tw-container-4xl)}.tw\\:max-w-5{max-width:calc(calc(var(--spacing)) * 5)}.tw\\:max-w-6xl{max-width:var(--tw-container-6xl)}.tw\\:max-w-40{max-width:calc(calc(var(--spacing)) * 40)}.tw\\:max-w-48{max-width:calc(calc(var(--spacing)) * 48)}.tw\\:max-w-64{max-width:calc(calc(var(--spacing)) * 64)}.tw\\:max-w-96{max-width:calc(calc(var(--spacing)) * 96)}.tw\\:max-w-\\[200px\\]{max-width:200px}.tw\\:max-w-\\[220px\\]{max-width:220px}.tw\\:max-w-\\[calc\\(100\\%-2rem\\)\\]{max-width:calc(100% - 2rem)}.tw\\:max-w-\\[calc\\(100vw-2rem\\)\\]{max-width:calc(100vw - 2rem)}.tw\\:max-w-fit{max-width:fit-content}.tw\\:max-w-full{max-width:100%}.tw\\:max-w-lg{max-width:var(--tw-container-lg)}.tw\\:max-w-md{max-width:var(--tw-container-md)}.tw\\:max-w-none{max-width:none}.tw\\:max-w-sm{max-width:var(--tw-container-sm)}.tw\\:max-w-xs{max-width:var(--tw-container-xs)}.tw\\:min-w-0{min-width:calc(calc(var(--spacing)) * 0)}.tw\\:min-w-4{min-width:calc(calc(var(--spacing)) * 4)}.tw\\:min-w-5{min-width:calc(calc(var(--spacing)) * 5)}.tw\\:min-w-7{min-width:calc(calc(var(--spacing)) * 7)}.tw\\:min-w-8{min-width:calc(calc(var(--spacing)) * 8)}.tw\\:min-w-9{min-width:calc(calc(var(--spacing)) * 9)}.tw\\:min-w-16{min-width:calc(calc(var(--spacing)) * 16)}.tw\\:min-w-32{min-width:calc(calc(var(--spacing)) * 32)}.tw\\:min-w-36{min-width:calc(calc(var(--spacing)) * 36)}.tw\\:min-w-80{min-width:calc(calc(var(--spacing)) * 80)}.tw\\:min-w-\\[12rem\\]{min-width:12rem}.tw\\:min-w-\\[26px\\]{min-width:26px}.tw\\:min-w-\\[96px\\]{min-width:96px}.tw\\:min-w-\\[140px\\]{min-width:140px}.tw\\:min-w-\\[215px\\]{min-width:215px}.tw\\:min-w-\\[500px\\]{min-width:500px}.tw\\:min-w-min{min-width:min-content}.tw\\:flex-1{flex:1}.tw\\:shrink{flex-shrink:1}.tw\\:shrink-0{flex-shrink:0}.tw\\:flex-grow,.tw\\:grow,.tw\\:grow-\\[1\\]{flex-grow:1}.tw\\:grow-\\[10\\]{flex-grow:10}.tw\\:basis-0{flex-basis:calc(calc(var(--spacing)) * 0)}.tw\\:caption-bottom{caption-side:bottom}.tw\\:border-collapse{border-collapse:collapse}.tw\\:origin-\\(--radix-context-menu-content-transform-origin\\){transform-origin:var(--radix-context-menu-content-transform-origin)}.tw\\:origin-\\(--radix-dropdown-menu-content-transform-origin\\){transform-origin:var(--radix-dropdown-menu-content-transform-origin)}.tw\\:origin-\\(--radix-menubar-content-transform-origin\\){transform-origin:var(--radix-menubar-content-transform-origin)}.tw\\:origin-\\(--radix-popover-content-transform-origin\\){transform-origin:var(--radix-popover-content-transform-origin)}.tw\\:origin-\\(--radix-select-content-transform-origin\\){transform-origin:var(--radix-select-content-transform-origin)}.tw\\:origin-\\(--radix-tooltip-content-transform-origin\\){transform-origin:var(--radix-tooltip-content-transform-origin)}.tw\\:-translate-x-1\\/2{--tw-translate-x:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:-translate-x-px{--tw-translate-x:-1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:translate-x-px{--tw-translate-x:1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:-translate-y-1\\/2{--tw-translate-y:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:translate-y-0{--tw-translate-y:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rotate-45{rotate:45deg}.tw\\:rotate-180{rotate:180deg}.tw\\:transform{transform:var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,)}.tw\\:animate-none\\!{animation:none!important}.tw\\:animate-pulse{animation:var(--tw-animate-pulse)}.tw\\:animate-spin{animation:var(--tw-animate-spin)}.tw\\:cursor-default{cursor:default}.tw\\:cursor-ew-resize{cursor:ew-resize}.tw\\:cursor-not-allowed{cursor:not-allowed}.tw\\:cursor-pointer{cursor:pointer}.tw\\:cursor-text{cursor:text}.tw\\:touch-none{touch-action:none}.tw\\:resize{resize:both}.tw\\:resize-none{resize:none}.tw\\:scroll-m-20{scroll-margin:calc(calc(var(--spacing)) * 20)}.tw\\:scroll-my-1{scroll-margin-block:calc(calc(var(--spacing)) * 1)}.tw\\:scroll-py-1{scroll-padding-block:calc(calc(var(--spacing)) * 1)}.tw\\:list-inside{list-style-position:inside}.tw\\:list-outside{list-style-position:outside}.tw\\:\\!list-\\[lower-alpha\\]{list-style-type:lower-alpha!important}.tw\\:\\!list-\\[lower-roman\\]{list-style-type:lower-roman!important}.tw\\:\\!list-\\[upper-alpha\\]{list-style-type:upper-alpha!important}.tw\\:\\!list-\\[upper-roman\\]{list-style-type:upper-roman!important}.tw\\:\\!list-decimal{list-style-type:decimal!important}.tw\\:\\!list-disc{list-style-type:disc!important}.tw\\:list-decimal{list-style-type:decimal}.tw\\:list-disc{list-style-type:disc}.tw\\:list-none{list-style-type:none}.tw\\:grid-flow-col{grid-auto-flow:column}.tw\\:grid-flow-row{grid-auto-flow:row}.tw\\:auto-rows-min{grid-auto-rows:min-content}.tw\\:grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}.tw\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.tw\\:grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.tw\\:grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}.tw\\:grid-cols-6{grid-template-columns:repeat(6,minmax(0,1fr))}.tw\\:grid-cols-\\[25\\%_25\\%_50\\%\\]{grid-template-columns:25% 25% 50%}.tw\\:grid-cols-\\[25\\%_50\\%_25\\%\\]{grid-template-columns:25% 50% 25%}.tw\\:grid-cols-\\[auto_auto_auto_auto\\]{grid-template-columns:auto auto auto auto}.tw\\:grid-cols-\\[min-content_1fr\\]{grid-template-columns:min-content 1fr}.tw\\:grid-cols-\\[min-content_min-content_1fr\\]{grid-template-columns:min-content min-content 1fr}.tw\\:grid-cols-subgrid{grid-template-columns:subgrid}.tw\\:flex-col{flex-direction:column}.tw\\:flex-col-reverse{flex-direction:column-reverse}.tw\\:flex-row{flex-direction:row}.tw\\:flex-row-reverse{flex-direction:row-reverse}.tw\\:flex-nowrap{flex-wrap:nowrap}.tw\\:flex-wrap{flex-wrap:wrap}.tw\\:place-content-center{place-content:center}.tw\\:content-center{align-content:center}.tw\\:items-baseline{align-items:baseline}.tw\\:items-center{align-items:center}.tw\\:items-end{align-items:flex-end}.tw\\:items-start{align-items:flex-start}.tw\\:items-stretch{align-items:stretch}.tw\\:justify-between{justify-content:space-between}.tw\\:justify-center{justify-content:center}.tw\\:justify-end{justify-content:flex-end}.tw\\:justify-start{justify-content:flex-start}.tw\\:gap-0{gap:calc(calc(var(--spacing)) * 0)}.tw\\:gap-0\\.5{gap:calc(calc(var(--spacing)) * .5)}.tw\\:gap-1{gap:calc(calc(var(--spacing)) * 1)}.tw\\:gap-1\\.5{gap:calc(calc(var(--spacing)) * 1.5)}.tw\\:gap-1\\.5\\!{gap:calc(calc(var(--spacing)) * 1.5)!important}.tw\\:gap-2{gap:calc(calc(var(--spacing)) * 2)}.tw\\:gap-2\\.5{gap:calc(calc(var(--spacing)) * 2.5)}.tw\\:gap-3{gap:calc(calc(var(--spacing)) * 3)}.tw\\:gap-4{gap:calc(calc(var(--spacing)) * 4)}.tw\\:gap-5{gap:calc(calc(var(--spacing)) * 5)}.tw\\:gap-6{gap:calc(calc(var(--spacing)) * 6)}.tw\\:gap-16{gap:calc(calc(var(--spacing)) * 16)}.tw\\:gap-\\[--spacing\\(var\\(--gap\\)\\)\\]{gap:calc(calc(var(--spacing)) * var(--gap))}.tw\\:gap-\\[12px\\]{gap:12px}:where(.tw\\:space-y-1>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 1) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 1) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-1\\.5>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 1.5) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 1.5) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-2>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 2) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 2) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-3>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 3) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 3) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-4>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 4) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 4) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-6>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 6) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 6) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-8>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 8) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 8) * calc(1 - var(--tw-space-y-reverse)))}.tw\\:gap-x-1{column-gap:calc(calc(var(--spacing)) * 1)}.tw\\:gap-x-2{column-gap:calc(calc(var(--spacing)) * 2)}.tw\\:gap-x-3{column-gap:calc(calc(var(--spacing)) * 3)}.tw\\:gap-x-4{column-gap:calc(calc(var(--spacing)) * 4)}:where(.tw\\:-space-x-2>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * -2) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * -2) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-2>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 2) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 2) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-3>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 3) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 3) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-4>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 4) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 4) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-6>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 6) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 6) * calc(1 - var(--tw-space-x-reverse)))}.tw\\:gap-y-1{row-gap:calc(calc(var(--spacing)) * 1)}.tw\\:gap-y-2{row-gap:calc(calc(var(--spacing)) * 2)}:where(.tw\\:divide-x>:not(:last-child)){--tw-divide-x-reverse:0;border-inline-style:var(--tw-border-style);border-inline-start-width:calc(1px * var(--tw-divide-x-reverse));border-inline-end-width:calc(1px * calc(1 - var(--tw-divide-x-reverse)))}:where(.tw\\:divide-y>:not(:last-child)){--tw-divide-y-reverse:0;border-bottom-style:var(--tw-border-style);border-top-style:var(--tw-border-style);border-top-width:calc(1px * var(--tw-divide-y-reverse));border-bottom-width:calc(1px * calc(1 - var(--tw-divide-y-reverse)))}.tw\\:self-start{align-self:flex-start}.tw\\:self-stretch{align-self:stretch}.tw\\:justify-self-end{justify-self:flex-end}.tw\\:truncate{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.tw\\:overflow-auto{overflow:auto}.tw\\:overflow-clip{overflow:clip}.tw\\:overflow-hidden{overflow:hidden}.tw\\:overflow-scroll{overflow:scroll}.tw\\:overflow-visible{overflow:visible}.tw\\:overflow-x-auto{overflow-x:auto}.tw\\:overflow-x-hidden{overflow-x:hidden}.tw\\:overflow-y-auto{overflow-y:auto}.tw\\:overflow-y-hidden{overflow-y:hidden}.tw\\:rounded{border-radius:.25rem}.tw\\:rounded-2xl{border-radius:calc(var(--radius) * 1.8)}.tw\\:rounded-4xl{border-radius:calc(var(--radius) * 2.6)}.tw\\:rounded-\\[4px\\]{border-radius:4px}.tw\\:rounded-\\[6px\\]{border-radius:6px}.tw\\:rounded-\\[calc\\(var\\(--radius\\)-3px\\)\\]{border-radius:calc(var(--radius) - 3px)}.tw\\:rounded-\\[min\\(var\\(--tw-radius-md\\)\\,10px\\)\\]{border-radius:min(var(--tw-radius-md), 10px)}.tw\\:rounded-\\[min\\(var\\(--tw-radius-md\\)\\,12px\\)\\]{border-radius:min(var(--tw-radius-md), 12px)}.tw\\:rounded-full{border-radius:3.40282e38px}.tw\\:rounded-lg{border-radius:var(--radius)}.tw\\:rounded-lg\\!{border-radius:var(--radius)!important}.tw\\:rounded-md{border-radius:calc(var(--radius) * .8)}.tw\\:rounded-none{border-radius:0}.tw\\:rounded-sm{border-radius:calc(var(--radius) * .6)}.tw\\:rounded-xl{border-radius:calc(var(--radius) * 1.4)}.tw\\:rounded-xl\\!{border-radius:calc(var(--radius) * 1.4)!important}.tw\\:rounded-xs{border-radius:var(--tw-radius-xs)}.tw\\:rounded-s-none{border-start-start-radius:0;border-end-start-radius:0}.tw\\:rounded-e-none{border-start-end-radius:0;border-end-end-radius:0}.tw\\:rounded-t-xl{border-top-left-radius:calc(var(--radius) * 1.4);border-top-right-radius:calc(var(--radius) * 1.4)}.tw\\:rounded-l-lg{border-top-left-radius:var(--radius);border-bottom-left-radius:var(--radius)}.tw\\:rounded-r-xl{border-top-right-radius:calc(var(--radius) * 1.4);border-bottom-right-radius:calc(var(--radius) * 1.4)}.tw\\:rounded-b-xl{border-bottom-right-radius:calc(var(--radius) * 1.4);border-bottom-left-radius:calc(var(--radius) * 1.4)}.tw\\:border{border-style:var(--tw-border-style);border-width:1px}.tw\\:border-0{border-style:var(--tw-border-style);border-width:0}.tw\\:border-2{border-style:var(--tw-border-style);border-width:2px}.tw\\:border-s{border-inline-start-style:var(--tw-border-style);border-inline-start-width:1px}.tw\\:border-s-0{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:border-s-2{border-inline-start-style:var(--tw-border-style);border-inline-start-width:2px}.tw\\:border-e{border-inline-end-style:var(--tw-border-style);border-inline-end-width:1px}.tw\\:border-e-0{border-inline-end-style:var(--tw-border-style);border-inline-end-width:0}.tw\\:border-t{border-top-style:var(--tw-border-style);border-top-width:1px}.tw\\:border-t-0{border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:border-b{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}.tw\\:border-b-0{border-bottom-style:var(--tw-border-style);border-bottom-width:0}.tw\\:border-l-2{border-left-style:var(--tw-border-style);border-left-width:2px}.tw\\:border-l-4{border-left-style:var(--tw-border-style);border-left-width:4px}.tw\\:border-dashed{--tw-border-style:dashed;border-style:dashed}.tw\\:border-none{--tw-border-style:none;border-style:none}.tw\\:border-solid{--tw-border-style:solid;border-style:solid}.tw\\:border-black{border-color:var(--tw-color-black)}.tw\\:border-blue-400{border-color:var(--tw-color-blue-400)}.tw\\:border-blue-500{border-color:var(--tw-color-blue-500)}.tw\\:border-border,.tw\\:border-border\\/50{border-color:var(--border)}@supports (color:color-mix(in lab, red, red)){.tw\\:border-border\\/50{border-color:color-mix(in oklab, var(--border) 50%, transparent)}}.tw\\:border-destructive{border-color:var(--destructive)}.tw\\:border-gray-300{border-color:var(--tw-color-gray-300)}.tw\\:border-input,.tw\\:border-input\\/30{border-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:border-input\\/30{border-color:color-mix(in oklab, var(--input) 30%, transparent)}}.tw\\:border-muted-foreground,.tw\\:border-muted-foreground\\/40{border-color:var(--muted-foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:border-muted-foreground\\/40{border-color:color-mix(in oklab, var(--muted-foreground) 40%, transparent)}}.tw\\:border-primary{border-color:var(--primary)}.tw\\:border-red-300{border-color:var(--tw-color-red-300)}.tw\\:border-red-400{border-color:var(--tw-color-red-400)}.tw\\:border-red-500{border-color:var(--tw-color-red-500)}.tw\\:border-red-600{border-color:var(--tw-color-red-600)}.tw\\:border-ring{border-color:var(--ring)}.tw\\:border-sidebar-border{border-color:var(--sidebar-border)}.tw\\:border-slate-300{border-color:var(--tw-color-slate-300)}.tw\\:border-transparent{border-color:#0000}.tw\\:border-yellow-400{border-color:var(--tw-color-yellow-400)}.tw\\:border-yellow-500{border-color:var(--tw-color-yellow-500)}.tw\\:border-s-amber-200{border-inline-start-color:var(--tw-color-amber-200)}.tw\\:border-s-indigo-200{border-inline-start-color:var(--tw-color-indigo-200)}.tw\\:border-s-purple-200{border-inline-start-color:var(--tw-color-purple-200)}.tw\\:border-s-red-200{border-inline-start-color:var(--tw-color-red-200)}.tw\\:\\!bg-destructive\\/50{background-color:var(--destructive)!important}@supports (color:color-mix(in lab, red, red)){.tw\\:\\!bg-destructive\\/50{background-color:color-mix(in oklab, var(--destructive) 50%, transparent)!important}}.tw\\:bg-\\[color-mix\\(in_oklab\\,var\\(--destructive\\)_10\\%\\,var\\(--background\\)\\)\\]{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-\\[color-mix\\(in_oklab\\,var\\(--destructive\\)_10\\%\\,var\\(--background\\)\\)\\]{background-color:color-mix(in oklab,var(--destructive) 10%,var(--background))}}.tw\\:bg-accent,.tw\\:bg-accent\\/50{background-color:var(--accent)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-accent\\/50{background-color:color-mix(in oklab, var(--accent) 50%, transparent)}}.tw\\:bg-amber-500,.tw\\:bg-amber-500\\/5{background-color:var(--tw-color-amber-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-amber-500\\/5{background-color:color-mix(in oklab, var(--tw-color-amber-500) 5%, transparent)}}.tw\\:bg-amber-500\\/15{background-color:var(--tw-color-amber-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-amber-500\\/15{background-color:color-mix(in oklab, var(--tw-color-amber-500) 15%, transparent)}}.tw\\:bg-background,.tw\\:bg-background\\/50{background-color:var(--background)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-background\\/50{background-color:color-mix(in oklab, var(--background) 50%, transparent)}}.tw\\:bg-black\\/10{background-color:var(--tw-color-black)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-black\\/10{background-color:color-mix(in oklab, var(--tw-color-black) 10%, transparent)}}.tw\\:bg-blue-50{background-color:var(--tw-color-blue-50)}.tw\\:bg-blue-100{background-color:var(--tw-color-blue-100)}.tw\\:bg-blue-400{background-color:var(--tw-color-blue-400)}.tw\\:bg-blue-500{background-color:var(--tw-color-blue-500)}.tw\\:bg-border{background-color:var(--border)}.tw\\:bg-card{background-color:var(--card)}.tw\\:bg-destructive\\/10{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-destructive\\/10{background-color:color-mix(in oklab, var(--destructive) 10%, transparent)}}.tw\\:bg-foreground{background-color:var(--foreground)}.tw\\:bg-gray-50{background-color:var(--tw-color-gray-50)}.tw\\:bg-gray-100{background-color:var(--tw-color-gray-100)}.tw\\:bg-gray-500{background-color:var(--tw-color-gray-500)}.tw\\:bg-green-50{background-color:var(--tw-color-green-50)}.tw\\:bg-green-100{background-color:var(--tw-color-green-100)}.tw\\:bg-green-500{background-color:var(--tw-color-green-500)}.tw\\:bg-input,.tw\\:bg-input\\/30{background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-input\\/30{background-color:color-mix(in oklab, var(--input) 30%, transparent)}}.tw\\:bg-muted,.tw\\:bg-muted\\/50{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-muted\\/50{background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:bg-neutral-300{background-color:var(--tw-color-neutral-300)}.tw\\:bg-orange-100{background-color:var(--tw-color-orange-100)}.tw\\:bg-popover,.tw\\:bg-popover\\/70{background-color:var(--popover)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-popover\\/70{background-color:color-mix(in oklab, var(--popover) 70%, transparent)}}.tw\\:bg-primary{background-color:var(--primary)}.tw\\:bg-primary-foreground{background-color:var(--primary-foreground)}.tw\\:bg-primary\\/30{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-primary\\/30{background-color:color-mix(in oklab, var(--primary) 30%, transparent)}}.tw\\:bg-purple-50{background-color:var(--tw-color-purple-50)}.tw\\:bg-red-100{background-color:var(--tw-color-red-100)}.tw\\:bg-red-500{background-color:var(--tw-color-red-500)}.tw\\:bg-rose-500,.tw\\:bg-rose-500\\/5{background-color:var(--tw-color-rose-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-rose-500\\/5{background-color:color-mix(in oklab, var(--tw-color-rose-500) 5%, transparent)}}.tw\\:bg-rose-500\\/15{background-color:var(--tw-color-rose-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-rose-500\\/15{background-color:color-mix(in oklab, var(--tw-color-rose-500) 15%, transparent)}}.tw\\:bg-secondary{background-color:var(--secondary)}.tw\\:bg-sidebar{background-color:var(--sidebar)}.tw\\:bg-sidebar-accent{background-color:var(--sidebar-accent)}.tw\\:bg-sidebar-border{background-color:var(--sidebar-border)}.tw\\:bg-sky-500,.tw\\:bg-sky-500\\/5{background-color:var(--tw-color-sky-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-sky-500\\/5{background-color:color-mix(in oklab, var(--tw-color-sky-500) 5%, transparent)}}.tw\\:bg-sky-500\\/15{background-color:var(--tw-color-sky-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-sky-500\\/15{background-color:color-mix(in oklab, var(--tw-color-sky-500) 15%, transparent)}}.tw\\:bg-teal-500,.tw\\:bg-teal-500\\/5{background-color:var(--tw-color-teal-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-teal-500\\/5{background-color:color-mix(in oklab, var(--tw-color-teal-500) 5%, transparent)}}.tw\\:bg-teal-500\\/15{background-color:var(--tw-color-teal-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-teal-500\\/15{background-color:color-mix(in oklab, var(--tw-color-teal-500) 15%, transparent)}}.tw\\:bg-transparent{background-color:#0000}.tw\\:bg-white{background-color:var(--tw-color-white)}.tw\\:bg-yellow-50{background-color:var(--tw-color-yellow-50)}.tw\\:bg-yellow-100{background-color:var(--tw-color-yellow-100)}.tw\\:bg-yellow-500{background-color:var(--tw-color-yellow-500)}.tw\\:bg-zinc-400{background-color:var(--tw-color-zinc-400)}.tw\\:bg-clip-padding{background-clip:padding-box}.tw\\:fill-\\[color-mix\\(in_oklab\\,var\\(--destructive\\)_10\\%\\,var\\(--background\\)\\)\\]{fill:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:fill-\\[color-mix\\(in_oklab\\,var\\(--destructive\\)_10\\%\\,var\\(--background\\)\\)\\]{fill:color-mix(in oklab,var(--destructive) 10%,var(--background))}}.tw\\:fill-destructive{fill:var(--destructive)}.tw\\:fill-foreground{fill:var(--foreground)}.tw\\:fill-yellow-400,.tw\\:fill-yellow-400\\/50{fill:var(--tw-color-yellow-400)}@supports (color:color-mix(in lab, red, red)){.tw\\:fill-yellow-400\\/50{fill:color-mix(in oklab, var(--tw-color-yellow-400) 50%, transparent)}}.tw\\:object-cover{object-fit:cover}.tw\\:\\!p-4{padding:calc(calc(var(--spacing)) * 4)!important}.tw\\:p-0{padding:calc(calc(var(--spacing)) * 0)}.tw\\:p-0\\.5{padding:calc(calc(var(--spacing)) * .5)}.tw\\:p-1{padding:calc(calc(var(--spacing)) * 1)}.tw\\:p-2{padding:calc(calc(var(--spacing)) * 2)}.tw\\:p-2\\.5{padding:calc(calc(var(--spacing)) * 2.5)}.tw\\:p-3{padding:calc(calc(var(--spacing)) * 3)}.tw\\:p-4{padding:calc(calc(var(--spacing)) * 4)}.tw\\:p-6{padding:calc(calc(var(--spacing)) * 6)}.tw\\:p-8{padding:calc(calc(var(--spacing)) * 8)}.tw\\:p-\\[1px\\]{padding:1px}.tw\\:p-\\[3px\\]{padding:3px}.tw\\:p-\\[10px\\]{padding:10px}.tw\\:p-\\[16px\\]{padding:16px}.tw\\:px-0{padding-inline:calc(calc(var(--spacing)) * 0)}.tw\\:px-0\\.5{padding-inline:calc(calc(var(--spacing)) * .5)}.tw\\:px-1{padding-inline:calc(calc(var(--spacing)) * 1)}.tw\\:px-1\\.5{padding-inline:calc(calc(var(--spacing)) * 1.5)}.tw\\:px-2{padding-inline:calc(calc(var(--spacing)) * 2)}.tw\\:px-2\\.5{padding-inline:calc(calc(var(--spacing)) * 2.5)}.tw\\:px-3{padding-inline:calc(calc(var(--spacing)) * 3)}.tw\\:px-4{padding-inline:calc(calc(var(--spacing)) * 4)}.tw\\:px-6{padding-inline:calc(calc(var(--spacing)) * 6)}.tw\\:py-0{padding-block:calc(calc(var(--spacing)) * 0)}.tw\\:py-0\\.5{padding-block:calc(calc(var(--spacing)) * .5)}.tw\\:py-1{padding-block:calc(calc(var(--spacing)) * 1)}.tw\\:py-1\\.5{padding-block:calc(calc(var(--spacing)) * 1.5)}.tw\\:py-2{padding-block:calc(calc(var(--spacing)) * 2)}.tw\\:py-3{padding-block:calc(calc(var(--spacing)) * 3)}.tw\\:py-4{padding-block:calc(calc(var(--spacing)) * 4)}.tw\\:py-6{padding-block:calc(calc(var(--spacing)) * 6)}.tw\\:py-8{padding-block:calc(calc(var(--spacing)) * 8)}.tw\\:py-\\[2px\\]{padding-block:2px}.tw\\:ps-1\\.5{padding-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:ps-2{padding-inline-start:calc(calc(var(--spacing)) * 2)}.tw\\:ps-2\\.5{padding-inline-start:calc(calc(var(--spacing)) * 2.5)}.tw\\:ps-4{padding-inline-start:calc(calc(var(--spacing)) * 4)}.tw\\:ps-7{padding-inline-start:calc(calc(var(--spacing)) * 7)}.tw\\:ps-8{padding-inline-start:calc(calc(var(--spacing)) * 8)}.tw\\:ps-9{padding-inline-start:calc(calc(var(--spacing)) * 9)}.tw\\:ps-12{padding-inline-start:calc(calc(var(--spacing)) * 12)}.tw\\:ps-\\[85px\\]{padding-inline-start:85px}.tw\\:pe-1{padding-inline-end:calc(calc(var(--spacing)) * 1)}.tw\\:pe-1\\.5{padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:pe-2{padding-inline-end:calc(calc(var(--spacing)) * 2)}.tw\\:pe-4{padding-inline-end:calc(calc(var(--spacing)) * 4)}.tw\\:pe-8{padding-inline-end:calc(calc(var(--spacing)) * 8)}.tw\\:pe-9{padding-inline-end:calc(calc(var(--spacing)) * 9)}.tw\\:pe-\\[calc\\(138px\\+1rem\\)\\]{padding-inline-end:calc(138px + 1rem)}.tw\\:pt-1{padding-top:calc(calc(var(--spacing)) * 1)}.tw\\:pt-2{padding-top:calc(calc(var(--spacing)) * 2)}.tw\\:pt-3{padding-top:calc(calc(var(--spacing)) * 3)}.tw\\:pt-4{padding-top:calc(calc(var(--spacing)) * 4)}.tw\\:pt-6{padding-top:calc(calc(var(--spacing)) * 6)}.tw\\:\\!pr-10{padding-right:calc(calc(var(--spacing)) * 10)!important}.tw\\:pr-0{padding-right:calc(calc(var(--spacing)) * 0)}.tw\\:pr-1{padding-right:calc(calc(var(--spacing)) * 1)}.tw\\:pr-2{padding-right:calc(calc(var(--spacing)) * 2)}.tw\\:pr-3{padding-right:calc(calc(var(--spacing)) * 3)}.tw\\:pr-4{padding-right:calc(calc(var(--spacing)) * 4)}.tw\\:pb-0{padding-bottom:calc(calc(var(--spacing)) * 0)}.tw\\:pb-1{padding-bottom:calc(calc(var(--spacing)) * 1)}.tw\\:pb-2{padding-bottom:calc(calc(var(--spacing)) * 2)}.tw\\:pb-3{padding-bottom:calc(calc(var(--spacing)) * 3)}.tw\\:pb-4{padding-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:pb-8{padding-bottom:calc(calc(var(--spacing)) * 8)}.tw\\:pb-12{padding-bottom:calc(calc(var(--spacing)) * 12)}.tw\\:pb-16{padding-bottom:calc(calc(var(--spacing)) * 16)}.tw\\:pb-24{padding-bottom:calc(calc(var(--spacing)) * 24)}.tw\\:pl-2{padding-left:calc(calc(var(--spacing)) * 2)}.tw\\:pl-3{padding-left:calc(calc(var(--spacing)) * 3)}.tw\\:pl-4{padding-left:calc(calc(var(--spacing)) * 4)}.tw\\:pl-5{padding-left:calc(calc(var(--spacing)) * 5)}.tw\\:pl-6{padding-left:calc(calc(var(--spacing)) * 6)}.tw\\:pl-8{padding-left:calc(calc(var(--spacing)) * 8)}.tw\\:text-center{text-align:center}.tw\\:text-end{text-align:end}.tw\\:text-left{text-align:left}.tw\\:text-right{text-align:right}.tw\\:text-start{text-align:start}.tw\\:align-middle{vertical-align:middle}.tw\\:font-heading{font-family:var(--font-sans)}.tw\\:font-mono{font-family:var(--tw-font-mono)}.tw\\:font-sans{font-family:IBM Plex Sans Variable,sans-serif}.tw\\:text-2xl{font-size:var(--tw-text-2xl);line-height:var(--tw-leading,var(--tw-text-2xl--line-height))}.tw\\:text-3xl{font-size:var(--tw-text-3xl);line-height:var(--tw-leading,var(--tw-text-3xl--line-height))}.tw\\:text-4xl{font-size:var(--tw-text-4xl);line-height:var(--tw-leading,var(--tw-text-4xl--line-height))}.tw\\:text-base{font-size:var(--tw-text-base);line-height:var(--tw-leading,var(--tw-text-base--line-height))}.tw\\:text-lg{font-size:var(--tw-text-lg);line-height:var(--tw-leading,var(--tw-text-lg--line-height))}.tw\\:text-sm{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:text-xl{font-size:var(--tw-text-xl);line-height:var(--tw-leading,var(--tw-text-xl--line-height))}.tw\\:text-xs{font-size:var(--tw-text-xs);line-height:var(--tw-leading,var(--tw-text-xs--line-height))}.tw\\:text-\\[0\\.8rem\\]{font-size:.8rem}.tw\\:leading-6{--tw-leading:calc(calc(var(--spacing)) * 6);line-height:calc(calc(var(--spacing)) * 6)}.tw\\:leading-loose{--tw-leading:var(--tw-leading-loose);line-height:var(--tw-leading-loose)}.tw\\:leading-none{--tw-leading:1;line-height:1}.tw\\:leading-relaxed{--tw-leading:var(--tw-leading-relaxed);line-height:var(--tw-leading-relaxed)}.tw\\:leading-snug{--tw-leading:var(--tw-leading-snug);line-height:var(--tw-leading-snug)}.tw\\:leading-tight{--tw-leading:var(--tw-leading-tight);line-height:var(--tw-leading-tight)}.tw\\:font-bold{--tw-font-weight:var(--tw-font-weight-bold);font-weight:var(--tw-font-weight-bold)}.tw\\:font-extrabold{--tw-font-weight:var(--tw-font-weight-extrabold);font-weight:var(--tw-font-weight-extrabold)}.tw\\:font-medium{--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}.tw\\:font-normal{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:font-semibold{--tw-font-weight:var(--tw-font-weight-semibold);font-weight:var(--tw-font-weight-semibold)}.tw\\:tracking-tight{--tw-tracking:var(--tw-tracking-tight);letter-spacing:var(--tw-tracking-tight)}.tw\\:tracking-wider{--tw-tracking:var(--tw-tracking-wider);letter-spacing:var(--tw-tracking-wider)}.tw\\:tracking-widest{--tw-tracking:var(--tw-tracking-widest);letter-spacing:var(--tw-tracking-widest)}.tw\\:text-balance{text-wrap:balance}.tw\\:text-nowrap{text-wrap:nowrap}.tw\\:break-words{overflow-wrap:break-word}.tw\\:text-clip{text-overflow:clip}.tw\\:text-ellipsis{text-overflow:ellipsis}.tw\\:whitespace-normal{white-space:normal}.tw\\:whitespace-nowrap{white-space:nowrap}.tw\\:whitespace-pre-line{white-space:pre-line}.tw\\:whitespace-pre-wrap{white-space:pre-wrap}.tw\\:\\[color\\:blue\\]{color:#00f}.tw\\:text-accent-foreground{color:var(--accent-foreground)}.tw\\:text-amber-600{color:var(--tw-color-amber-600)}.tw\\:text-background{color:var(--background)}.tw\\:text-blue-400{color:var(--tw-color-blue-400)}.tw\\:text-blue-500{color:var(--tw-color-blue-500)}.tw\\:text-blue-600{color:var(--tw-color-blue-600)}.tw\\:text-blue-800{color:var(--tw-color-blue-800)}.tw\\:text-card-foreground{color:var(--card-foreground)}.tw\\:text-current{color:currentColor}.tw\\:text-destructive{color:var(--destructive)}.tw\\:text-foreground{color:var(--foreground)}.tw\\:text-foreground\\!{color:var(--foreground)!important}.tw\\:text-foreground\\/30{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/30{color:color-mix(in oklab, var(--foreground) 30%, transparent)}}.tw\\:text-foreground\\/50{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/50{color:color-mix(in oklab, var(--foreground) 50%, transparent)}}.tw\\:text-foreground\\/60{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/60{color:color-mix(in oklab, var(--foreground) 60%, transparent)}}.tw\\:text-foreground\\/70{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/70{color:color-mix(in oklab, var(--foreground) 70%, transparent)}}.tw\\:text-gray-300{color:var(--tw-color-gray-300)}.tw\\:text-gray-500{color:var(--tw-color-gray-500)}.tw\\:text-gray-600{color:var(--tw-color-gray-600)}.tw\\:text-gray-700{color:var(--tw-color-gray-700)}.tw\\:text-gray-800{color:var(--tw-color-gray-800)}.tw\\:text-green-600{color:var(--tw-color-green-600)}.tw\\:text-green-700{color:var(--tw-color-green-700)}.tw\\:text-green-800{color:var(--tw-color-green-800)}.tw\\:text-inherit{color:inherit}.tw\\:text-muted-foreground,.tw\\:text-muted-foreground\\/50{color:var(--muted-foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-muted-foreground\\/50{color:color-mix(in oklab, var(--muted-foreground) 50%, transparent)}}.tw\\:text-orange-800{color:var(--tw-color-orange-800)}.tw\\:text-popover-foreground{color:var(--popover-foreground)}.tw\\:text-primary{color:var(--primary)}.tw\\:text-primary-foreground{color:var(--primary-foreground)}.tw\\:text-purple-900{color:var(--tw-color-purple-900)}.tw\\:text-red-500{color:var(--tw-color-red-500)}.tw\\:text-red-600{color:var(--tw-color-red-600)}.tw\\:text-red-700{color:var(--tw-color-red-700)}.tw\\:text-red-800{color:var(--tw-color-red-800)}.tw\\:text-rose-600{color:var(--tw-color-rose-600)}.tw\\:text-secondary-foreground{color:var(--secondary-foreground)}.tw\\:text-sidebar-accent-foreground{color:var(--sidebar-accent-foreground)}.tw\\:text-sidebar-foreground,.tw\\:text-sidebar-foreground\\/70{color:var(--sidebar-foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-sidebar-foreground\\/70{color:color-mix(in oklab, var(--sidebar-foreground) 70%, transparent)}}.tw\\:text-sky-600{color:var(--tw-color-sky-600)}.tw\\:text-slate-900{color:var(--tw-color-slate-900)}.tw\\:text-teal-600{color:var(--tw-color-teal-600)}.tw\\:text-white{color:var(--tw-color-white)}.tw\\:text-yellow-400{color:var(--tw-color-yellow-400)}.tw\\:text-yellow-600{color:var(--tw-color-yellow-600)}.tw\\:text-yellow-700{color:var(--tw-color-yellow-700)}.tw\\:capitalize{text-transform:capitalize}.tw\\:uppercase{text-transform:uppercase}.tw\\:italic{font-style:italic}.tw\\:tabular-nums{--tw-numeric-spacing:tabular-nums;font-variant-numeric:var(--tw-ordinal,) var(--tw-slashed-zero,) var(--tw-numeric-figure,) var(--tw-numeric-spacing,) var(--tw-numeric-fraction,)}.tw\\:line-through{text-decoration-line:line-through}.tw\\:underline{text-decoration-line:underline}.tw\\:decoration-destructive{-webkit-text-decoration-color:var(--destructive);-webkit-text-decoration-color:var(--destructive);text-decoration-color:var(--destructive)}.tw\\:underline-offset-4{text-underline-offset:4px}.tw\\:opacity-0{opacity:0}.tw\\:opacity-40{opacity:.4}.tw\\:opacity-50{opacity:.5}.tw\\:opacity-60{opacity:.6}.tw\\:opacity-100{opacity:1}.tw\\:bg-blend-color{background-blend-mode:color}.tw\\:shadow{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-\\[0_0_0_1px_var\\(--sidebar-border\\)\\]{--tw-shadow:0 0 0 1px var(--tw-shadow-color,var(--sidebar-border));box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-lg{--tw-shadow:0 10px 15px -3px var(--tw-shadow-color,#0000001a), 0 4px 6px -4px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-md{--tw-shadow:0 4px 6px -1px var(--tw-shadow-color,#0000001a), 0 2px 4px -2px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-none{--tw-shadow:0 0 #0000;box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-none\\!{--tw-shadow:0 0 #0000!important;box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)!important}.tw\\:shadow-sm{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-xl{--tw-shadow:0 20px 25px -5px var(--tw-shadow-color,#0000001a), 0 8px 10px -6px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-0{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-1{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-2{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-background{--tw-ring-color:var(--background)}.tw\\:ring-foreground\\/10{--tw-ring-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:ring-foreground\\/10{--tw-ring-color:color-mix(in oklab, var(--foreground) 10%, transparent)}}.tw\\:ring-primary{--tw-ring-color:var(--primary)}.tw\\:ring-ring\\/50{--tw-ring-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.tw\\:ring-ring\\/50{--tw-ring-color:color-mix(in oklab, var(--ring) 50%, transparent)}}.tw\\:ring-sidebar-ring{--tw-ring-color:var(--sidebar-ring)}.tw\\:ring-offset-2{--tw-ring-offset-width:2px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}.tw\\:ring-offset-background{--tw-ring-offset-color:var(--background)}.tw\\:ring-offset-white{--tw-ring-offset-color:var(--tw-color-white)}.tw\\:outline-hidden{--tw-outline-style:none;outline-style:none}@media (forced-colors:active){.tw\\:outline-hidden{outline-offset:2px;outline:2px solid #0000}}.tw\\:drop-shadow-sm{--tw-drop-shadow-size:drop-shadow(0 1px 2px var(--tw-drop-shadow-color,#00000026));--tw-drop-shadow:drop-shadow(var(--tw-drop-shadow-sm));filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.tw\\:transition{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to,opacity,box-shadow,transform,translate,scale,rotate,filter,-webkit-backdrop-filter,backdrop-filter,display,content-visibility,overlay,pointer-events;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[color\\,box-shadow\\]{transition-property:color,box-shadow;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[left\\,right\\,width\\]{transition-property:left,right,width;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[margin\\,opacity\\]{transition-property:margin,opacity;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[width\\,height\\,padding\\]{transition-property:width,height,padding;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[width\\]{transition-property:width;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-all{transition-property:all;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-colors{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-opacity{transition-property:opacity;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-transform{transition-property:transform,translate,scale,rotate;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-none{transition-property:none}.tw\\:duration-100{--tw-duration:.1s;transition-duration:.1s}.tw\\:duration-200{--tw-duration:.2s;transition-duration:.2s}.tw\\:ease-linear{--tw-ease:linear;transition-timing-function:linear}.tw\\:prose-quoteless :where(blockquote p:first-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):before,.tw\\:prose-quoteless :where(blockquote p:last-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:none}.tw\\:outline-none{--tw-outline-style:none;outline-style:none}.tw\\:select-none{-webkit-user-select:none;user-select:none}.tw\\:group-focus-within\\/menu-item\\:opacity-100:is(:where(.tw\\:group\\/menu-item):focus-within *){opacity:1}@media (hover:hover){.tw\\:group-hover\\:visible:is(:where(.tw\\:group):hover *){visibility:visible}.tw\\:group-hover\\:hidden:is(:where(.tw\\:group):hover *){display:none}.tw\\:group-hover\\:opacity-100:is(:where(.tw\\:group):hover *),.tw\\:group-hover\\/menu-item\\:opacity-100:is(:where(.tw\\:group\\/menu-item):hover *){opacity:1}}.tw\\:group-focus\\/context-menu-item\\:text-accent-foreground:is(:where(.tw\\:group\\/context-menu-item):focus *),.tw\\:group-focus\\/dropdown-menu-item\\:text-accent-foreground:is(:where(.tw\\:group\\/dropdown-menu-item):focus *),.tw\\:group-focus\\/menubar-item\\:text-accent-foreground:is(:where(.tw\\:group\\/menubar-item):focus *){color:var(--accent-foreground)}.tw\\:group-has-disabled\\/field\\:opacity-50:is(:where(.tw\\:group\\/field):has(:disabled) *){opacity:.5}.tw\\:group-has-data-\\[sidebar\\=menu-action\\]\\/menu-item\\:pe-8:is(:where(.tw\\:group\\/menu-item):has([data-sidebar=menu-action]) *){padding-inline-end:calc(calc(var(--spacing)) * 8)}.tw\\:group-has-data-\\[size\\=lg\\]\\/avatar-group\\:size-10:is(:where(.tw\\:group\\/avatar-group):has([data-size=lg]) *){width:calc(calc(var(--spacing)) * 10);height:calc(calc(var(--spacing)) * 10)}.tw\\:group-has-data-\\[size\\=sm\\]\\/avatar-group\\:size-6:is(:where(.tw\\:group\\/avatar-group):has([data-size=sm]) *){width:calc(calc(var(--spacing)) * 6);height:calc(calc(var(--spacing)) * 6)}.tw\\:group-has-data-\\[slot\\=command-shortcut\\]\\/command-item\\:hidden:is(:where(.tw\\:group\\/command-item):has([data-slot=command-shortcut]) *){display:none}.tw\\:group-has-\\[\\>input\\]\\/input-group\\:pt-2:is(:where(.tw\\:group\\/input-group):has(>input) *){padding-top:calc(calc(var(--spacing)) * 2)}.tw\\:group-has-\\[\\>input\\]\\/input-group\\:pb-2:is(:where(.tw\\:group\\/input-group):has(>input) *){padding-bottom:calc(calc(var(--spacing)) * 2)}.tw\\:group-has-\\[\\>svg\\]\\/alert\\:col-start-2:is(:where(.tw\\:group\\/alert):has(>svg) *){grid-column-start:2}.tw\\:group-data-\\[checked\\=true\\]\\/command-item\\:opacity-100:is(:where(.tw\\:group\\/command-item)[data-checked=true] *){opacity:1}.tw\\:group-data-\\[collapsible\\=icon\\]\\:-mt-8:is(:where(.tw\\:group)[data-collapsible=icon] *){margin-top:calc(calc(var(--spacing)) * -8)}.tw\\:group-data-\\[collapsible\\=icon\\]\\:hidden:is(:where(.tw\\:group)[data-collapsible=icon] *){display:none}.tw\\:group-data-\\[collapsible\\=icon\\]\\:size-8\\!:is(:where(.tw\\:group)[data-collapsible=icon] *){width:calc(calc(var(--spacing)) * 8)!important;height:calc(calc(var(--spacing)) * 8)!important}.tw\\:group-data-\\[collapsible\\=icon\\]\\:w-\\(--sidebar-width-icon\\):is(:where(.tw\\:group)[data-collapsible=icon] *){width:var(--sidebar-width-icon)}.tw\\:group-data-\\[collapsible\\=icon\\]\\:w-\\[calc\\(var\\(--sidebar-width-icon\\)\\+\\(--spacing\\(4\\)\\)\\)\\]:is(:where(.tw\\:group)[data-collapsible=icon] *){width:calc(var(--sidebar-width-icon) + (calc(calc(var(--spacing)) * 4)))}.tw\\:group-data-\\[collapsible\\=icon\\]\\:w-\\[calc\\(var\\(--sidebar-width-icon\\)\\+\\(--spacing\\(4\\)\\)\\+2px\\)\\]:is(:where(.tw\\:group)[data-collapsible=icon] *){width:calc(var(--sidebar-width-icon) + (calc(calc(var(--spacing)) * 4)) + 2px)}.tw\\:group-data-\\[collapsible\\=icon\\]\\:overflow-hidden:is(:where(.tw\\:group)[data-collapsible=icon] *){overflow:hidden}.tw\\:group-data-\\[collapsible\\=icon\\]\\:p-0\\!:is(:where(.tw\\:group)[data-collapsible=icon] *){padding:calc(calc(var(--spacing)) * 0)!important}.tw\\:group-data-\\[collapsible\\=icon\\]\\:p-2\\!:is(:where(.tw\\:group)[data-collapsible=icon] *){padding:calc(calc(var(--spacing)) * 2)!important}.tw\\:group-data-\\[collapsible\\=icon\\]\\:opacity-0:is(:where(.tw\\:group)[data-collapsible=icon] *){opacity:0}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:right-\\[calc\\(var\\(--sidebar-width\\)\\*-1\\)\\]:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){right:calc(var(--sidebar-width) * -1)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:left-\\[calc\\(var\\(--sidebar-width\\)\\*-1\\)\\]:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){left:calc(var(--sidebar-width) * -1)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:w-0:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){width:calc(calc(var(--spacing)) * 0)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:translate-x-0:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){--tw-translate-x:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:group-data-\\[disabled\\=true\\]\\:pointer-events-none:is(:where(.tw\\:group)[data-disabled=true] *){pointer-events:none}.tw\\:group-data-\\[disabled\\=true\\]\\:opacity-50:is(:where(.tw\\:group)[data-disabled=true] *),.tw\\:group-data-\\[disabled\\=true\\]\\/input-group\\:opacity-50:is(:where(.tw\\:group\\/input-group)[data-disabled=true] *){opacity:.5}.tw\\:group-data-\\[side\\=primary\\]\\:-right-4:is(:where(.tw\\:group)[data-side=primary] *){right:calc(calc(var(--spacing)) * -4)}.tw\\:group-data-\\[side\\=primary\\]\\:border-e:is(:where(.tw\\:group)[data-side=primary] *){border-inline-end-style:var(--tw-border-style);border-inline-end-width:1px}.tw\\:group-data-\\[side\\=secondary\\]\\:left-0:is(:where(.tw\\:group)[data-side=secondary] *){left:calc(calc(var(--spacing)) * 0)}.tw\\:group-data-\\[side\\=secondary\\]\\:rotate-180:is(:where(.tw\\:group)[data-side=secondary] *){rotate:180deg}.tw\\:group-data-\\[side\\=secondary\\]\\:border-s:is(:where(.tw\\:group)[data-side=secondary] *){border-inline-start-style:var(--tw-border-style);border-inline-start-width:1px}.tw\\:group-data-\\[size\\=default\\]\\/avatar\\:size-2\\.5:is(:where(.tw\\:group\\/avatar)[data-size=default] *){width:calc(calc(var(--spacing)) * 2.5);height:calc(calc(var(--spacing)) * 2.5)}.tw\\:group-data-\\[size\\=default\\]\\/switch\\:size-4:is(:where(.tw\\:group\\/switch)[data-size=default] *){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[size\\=lg\\]\\/avatar\\:size-3:is(:where(.tw\\:group\\/avatar)[data-size=lg] *){width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[size\\=sm\\]\\/avatar\\:size-2:is(:where(.tw\\:group\\/avatar)[data-size=sm] *){width:calc(calc(var(--spacing)) * 2);height:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[size\\=sm\\]\\/avatar\\:text-xs:is(:where(.tw\\:group\\/avatar)[data-size=sm] *){font-size:var(--tw-text-xs);line-height:var(--tw-leading,var(--tw-text-xs--line-height))}.tw\\:group-data-\\[size\\=sm\\]\\/card\\:p-3:is(:where(.tw\\:group\\/card)[data-size=sm] *){padding:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[size\\=sm\\]\\/card\\:px-3:is(:where(.tw\\:group\\/card)[data-size=sm] *){padding-inline:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[size\\=sm\\]\\/card\\:text-sm:is(:where(.tw\\:group\\/card)[data-size=sm] *){font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:size-3:is(:where(.tw\\:group\\/switch)[data-size=sm] *){width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[spacing\\=0\\]\\/toggle-group\\:rounded-none:is(:where(.tw\\:group\\/toggle-group)[data-spacing="0"] *){border-radius:0}.tw\\:group-data-\\[spacing\\=0\\]\\/toggle-group\\:px-2:is(:where(.tw\\:group\\/toggle-group)[data-spacing="0"] *){padding-inline:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[variant\\=floating\\]\\:rounded-lg:is(:where(.tw\\:group)[data-variant=floating] *){border-radius:var(--radius)}.tw\\:group-data-\\[variant\\=floating\\]\\:shadow-sm:is(:where(.tw\\:group)[data-variant=floating] *){--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:group-data-\\[variant\\=floating\\]\\:ring-1:is(:where(.tw\\:group)[data-variant=floating] *){--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:group-data-\\[variant\\=floating\\]\\:ring-sidebar-border:is(:where(.tw\\:group)[data-variant=floating] *){--tw-ring-color:var(--sidebar-border)}.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:bg-transparent:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *){background-color:#0000}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:mx-auto:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){margin-inline:auto}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:mt-4:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){margin-top:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:block:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){display:block}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:h-1\\.5:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){height:calc(calc(var(--spacing)) * 1.5)}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:w-\\[100px\\]:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){width:100px}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:text-center:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){text-align:center}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:my-auto:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){margin-block:auto}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:me-4:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){margin-inline-end:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:block:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){display:block}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:h-\\[100px\\]:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){height:100px}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:w-1\\.5:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){width:calc(calc(var(--spacing)) * 1.5)}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:my-auto:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){margin-block:auto}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:ms-4:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){margin-inline-start:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:block:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){display:block}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:h-\\[100px\\]:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){height:100px}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:w-1\\.5:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){width:calc(calc(var(--spacing)) * 1.5)}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:mx-auto:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){margin-inline:auto}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:mb-4:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){margin-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:block:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){display:block}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:h-1\\.5:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){height:calc(calc(var(--spacing)) * 1.5)}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:w-\\[100px\\]:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){width:100px}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:text-center:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){text-align:center}.tw\\:group-data-selected\\/command-item\\:text-foreground:is(:where(.tw\\:group\\/command-item):where([data-selected=true]) *){color:var(--foreground)}.tw\\:group-data-horizontal\\/tabs\\:h-8:is(:where(.tw\\:group\\/tabs):where([data-orientation=horizontal]) *){height:calc(calc(var(--spacing)) * 8)}.tw\\:group-data-vertical\\/tabs\\:h-fit:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *){height:fit-content}.tw\\:group-data-vertical\\/tabs\\:w-full:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *){width:100%}.tw\\:group-data-vertical\\/tabs\\:flex-col:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *){flex-direction:column}.tw\\:group-data-vertical\\/tabs\\:justify-start:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *){justify-content:flex-start}@media (hover:hover){.tw\\:peer-hover\\/menu-button\\:text-sidebar-accent-foreground:is(:where(.tw\\:peer\\/menu-button):hover~*){color:var(--sidebar-accent-foreground)}.tw\\:peer-focus\\:group-hover\\:text-blue-500:is(:where(.tw\\:peer):focus~*):is(:where(.tw\\:group):hover *){color:var(--tw-color-blue-500)}}.tw\\:peer-disabled\\:cursor-not-allowed:is(:where(.tw\\:peer):disabled~*){cursor:not-allowed}.tw\\:peer-disabled\\:opacity-50:is(:where(.tw\\:peer):disabled~*){opacity:.5}.tw\\:peer-data-\\[size\\=default\\]\\/menu-button\\:top-1\\.5:is(:where(.tw\\:peer\\/menu-button)[data-size=default]~*){top:calc(calc(var(--spacing)) * 1.5)}.tw\\:peer-data-\\[size\\=lg\\]\\/menu-button\\:top-2\\.5:is(:where(.tw\\:peer\\/menu-button)[data-size=lg]~*){top:calc(calc(var(--spacing)) * 2.5)}.tw\\:peer-data-\\[size\\=sm\\]\\/menu-button\\:top-1:is(:where(.tw\\:peer\\/menu-button)[data-size=sm]~*){top:calc(calc(var(--spacing)) * 1)}.tw\\:peer-data-active\\/menu-button\\:text-sidebar-accent-foreground:is(:is(:where(.tw\\:peer\\/menu-button):where([data-state=active]),:where(.tw\\:peer\\/menu-button):where([data-active]:not([data-active=false])))~*){color:var(--sidebar-accent-foreground)}.tw\\:file\\:inline-flex::file-selector-button{display:inline-flex}.tw\\:file\\:h-6::file-selector-button{height:calc(calc(var(--spacing)) * 6)}.tw\\:file\\:border-0::file-selector-button{border-style:var(--tw-border-style);border-width:0}.tw\\:file\\:bg-transparent::file-selector-button{background-color:#0000}.tw\\:file\\:text-sm::file-selector-button{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:file\\:font-medium::file-selector-button{--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}.tw\\:file\\:text-foreground::file-selector-button{color:var(--foreground)}.tw\\:placeholder\\:text-muted-foreground::placeholder{color:var(--muted-foreground)}.tw\\:placeholder\\:text-slate-400::placeholder{color:var(--tw-color-slate-400)}.tw\\:before\\:pointer-events-none:before{content:var(--tw-content);pointer-events:none}.tw\\:before\\:absolute:before{content:var(--tw-content);position:absolute}.tw\\:before\\:inset-0:before{content:var(--tw-content);inset:calc(calc(var(--spacing)) * 0)}.tw\\:before\\:top-0\\.5:before{content:var(--tw-content);top:calc(calc(var(--spacing)) * .5)}.tw\\:before\\:left-0:before{content:var(--tw-content);left:calc(calc(var(--spacing)) * 0)}.tw\\:before\\:-z-1:before{content:var(--tw-content);z-index:calc(1 * -1)}.tw\\:before\\:block:before{content:var(--tw-content);display:block}.tw\\:before\\:hidden:before{content:var(--tw-content);display:none}.tw\\:before\\:h-4:before{content:var(--tw-content);height:calc(calc(var(--spacing)) * 4)}.tw\\:before\\:w-4:before{content:var(--tw-content);width:calc(calc(var(--spacing)) * 4)}.tw\\:before\\:cursor-pointer:before{content:var(--tw-content);cursor:pointer}.tw\\:before\\:rounded:before{content:var(--tw-content);border-radius:.25rem}.tw\\:before\\:rounded-\\[inherit\\]:before{content:var(--tw-content);border-radius:inherit}.tw\\:before\\:border:before{content:var(--tw-content);border-style:var(--tw-border-style);border-width:1px}.tw\\:before\\:border-primary:before{content:var(--tw-content);border-color:var(--primary)}.tw\\:before\\:bg-primary:before{content:var(--tw-content);background-color:var(--primary)}.tw\\:before\\:bg-cover:before{content:var(--tw-content);background-size:cover}.tw\\:before\\:bg-no-repeat:before{content:var(--tw-content);background-repeat:no-repeat}.tw\\:before\\:backdrop-blur-2xl:before{content:var(--tw-content);--tw-backdrop-blur:blur(var(--tw-blur-2xl));-webkit-backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)}.tw\\:before\\:backdrop-saturate-150:before{content:var(--tw-content);--tw-backdrop-saturate:saturate(150%);-webkit-backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)}.tw\\:before\\:content-\\[\\"\\"\\]:before{--tw-content:"";content:var(--tw-content)}.tw\\:before\\:content-\\[\\\\\\"\\\\\\"\\]:before{--tw-content:\\"\\";content:var(--tw-content)}.tw\\:after\\:absolute:after{content:var(--tw-content);position:absolute}.tw\\:after\\:-inset-2:after{content:var(--tw-content);inset:calc(calc(var(--spacing)) * -2)}.tw\\:after\\:inset-0:after{content:var(--tw-content);inset:calc(calc(var(--spacing)) * 0)}.tw\\:after\\:-inset-x-3:after{content:var(--tw-content);inset-inline:calc(calc(var(--spacing)) * -3)}.tw\\:after\\:-inset-y-2:after{content:var(--tw-content);inset-block:calc(calc(var(--spacing)) * -2)}.tw\\:after\\:inset-y-0:after{content:var(--tw-content);inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:after\\:start-1\\/2:after{content:var(--tw-content);inset-inline-start:50%}.tw\\:after\\:top-\\[6px\\]:after{content:var(--tw-content);top:6px}.tw\\:after\\:right-\\[7px\\]:after{content:var(--tw-content);right:7px}.tw\\:after\\:left-\\[7px\\]:after{content:var(--tw-content);left:7px}.tw\\:after\\:block:after{content:var(--tw-content);display:block}.tw\\:after\\:hidden:after{content:var(--tw-content);display:none}.tw\\:after\\:h-0\\.5:after{content:var(--tw-content);height:calc(calc(var(--spacing)) * .5)}.tw\\:after\\:h-\\[6px\\]:after{content:var(--tw-content);height:6px}.tw\\:after\\:w-1:after{content:var(--tw-content);width:calc(calc(var(--spacing)) * 1)}.tw\\:after\\:w-\\[2px\\]:after{content:var(--tw-content);width:2px}.tw\\:after\\:w-\\[3px\\]:after{content:var(--tw-content);width:3px}.tw\\:after\\:-translate-x-1\\/2:after{content:var(--tw-content);--tw-translate-x:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:after\\:rotate-45:after{content:var(--tw-content);rotate:45deg}.tw\\:after\\:cursor-pointer:after{content:var(--tw-content);cursor:pointer}.tw\\:after\\:rounded-full:after{content:var(--tw-content);border-radius:3.40282e38px}.tw\\:after\\:border:after{content:var(--tw-content);border-style:var(--tw-border-style);border-width:1px}.tw\\:after\\:border-t-0:after{content:var(--tw-content);border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:after\\:border-r-2:after{content:var(--tw-content);border-right-style:var(--tw-border-style);border-right-width:2px}.tw\\:after\\:border-b-2:after{content:var(--tw-content);border-bottom-style:var(--tw-border-style);border-bottom-width:2px}.tw\\:after\\:border-l-0:after{content:var(--tw-content);border-left-style:var(--tw-border-style);border-left-width:0}.tw\\:after\\:border-solid:after{content:var(--tw-content);--tw-border-style:solid;border-style:solid}.tw\\:after\\:border-border:after{content:var(--tw-content);border-color:var(--border)}.tw\\:after\\:border-white:after{content:var(--tw-content);border-color:var(--tw-color-white)}.tw\\:after\\:bg-foreground:after{content:var(--tw-content);background-color:var(--foreground)}.tw\\:after\\:bg-muted:after{content:var(--tw-content);background-color:var(--muted)}.tw\\:after\\:opacity-0:after{content:var(--tw-content);opacity:0}.tw\\:after\\:mix-blend-darken:after{content:var(--tw-content);mix-blend-mode:darken}.tw\\:after\\:transition-opacity:after{content:var(--tw-content);transition-property:opacity;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:after\\:content-\\[\\"\\"\\]:after{--tw-content:"";content:var(--tw-content)}.tw\\:after\\:content-\\[\\\\\\"\\\\\\"\\]:after{--tw-content:\\"\\";content:var(--tw-content)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:after\\:start-full:is(:where(.tw\\:group)[data-collapsible=offcanvas] *):after{content:var(--tw-content);inset-inline-start:100%}.tw\\:group-data-horizontal\\/tabs\\:after\\:inset-x-0:is(:where(.tw\\:group\\/tabs):where([data-orientation=horizontal]) *):after{content:var(--tw-content);inset-inline:calc(calc(var(--spacing)) * 0)}.tw\\:group-data-horizontal\\/tabs\\:after\\:bottom-\\[-5px\\]:is(:where(.tw\\:group\\/tabs):where([data-orientation=horizontal]) *):after{content:var(--tw-content);bottom:-5px}.tw\\:group-data-horizontal\\/tabs\\:after\\:h-0\\.5:is(:where(.tw\\:group\\/tabs):where([data-orientation=horizontal]) *):after{content:var(--tw-content);height:calc(calc(var(--spacing)) * .5)}.tw\\:group-data-vertical\\/tabs\\:after\\:inset-y-0:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *):after{content:var(--tw-content);inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:group-data-vertical\\/tabs\\:after\\:-end-1:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *):after{content:var(--tw-content);inset-inline-end:calc(calc(var(--spacing)) * -1)}.tw\\:group-data-vertical\\/tabs\\:after\\:w-0\\.5:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *):after{content:var(--tw-content);width:calc(calc(var(--spacing)) * .5)}.tw\\:first\\:mt-0:first-child{margin-top:calc(calc(var(--spacing)) * 0)}.tw\\:even\\:bg-muted:nth-child(2n){background-color:var(--muted)}.tw\\:focus-within\\:ring-2:focus-within{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-within\\:ring-ring:focus-within{--tw-ring-color:var(--ring)}.tw\\:focus-within\\:ring-offset-1:focus-within{--tw-ring-offset-width:1px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}@media (hover:hover){.tw\\:hover\\:-mt-4:hover{margin-top:calc(calc(var(--spacing)) * -4)}.tw\\:hover\\:cursor-pointer:hover{cursor:pointer}.tw\\:hover\\:bg-accent:hover,.tw\\:hover\\:bg-accent\\/30:hover{background-color:var(--accent)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-accent\\/30:hover{background-color:color-mix(in oklab, var(--accent) 30%, transparent)}}.tw\\:hover\\:bg-accent\\/80:hover{background-color:var(--accent)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-accent\\/80:hover{background-color:color-mix(in oklab, var(--accent) 80%, transparent)}}.tw\\:hover\\:bg-blue-600:hover{background-color:var(--tw-color-blue-600)}.tw\\:hover\\:bg-destructive\\/20:hover{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-destructive\\/20:hover{background-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:hover\\:bg-gray-50:hover{background-color:var(--tw-color-gray-50)}.tw\\:hover\\:bg-input:hover{background-color:var(--input)}.tw\\:hover\\:bg-muted:hover,.tw\\:hover\\:bg-muted\\/50:hover{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-muted\\/50:hover{background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:hover\\:bg-muted\\/80:hover{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-muted\\/80:hover{background-color:color-mix(in oklab, var(--muted) 80%, transparent)}}.tw\\:hover\\:bg-primary\\/10:hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-primary\\/10:hover{background-color:color-mix(in oklab, var(--primary) 10%, transparent)}}.tw\\:hover\\:bg-primary\\/70:hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-primary\\/70:hover{background-color:color-mix(in oklab, var(--primary) 70%, transparent)}}.tw\\:hover\\:bg-red-500:hover{background-color:var(--tw-color-red-500)}.tw\\:hover\\:bg-secondary:hover,.tw\\:hover\\:bg-secondary\\/80:hover{background-color:var(--secondary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-secondary\\/80:hover{background-color:color-mix(in oklab, var(--secondary) 80%, transparent)}}.tw\\:hover\\:bg-sidebar-accent:hover{background-color:var(--sidebar-accent)}.tw\\:hover\\:bg-transparent:hover{background-color:#0000}.tw\\:hover\\:text-foreground:hover{color:var(--foreground)}.tw\\:hover\\:text-muted-foreground:hover{color:var(--muted-foreground)}.tw\\:hover\\:text-primary-foreground:hover{color:var(--primary-foreground)}.tw\\:hover\\:text-sidebar-accent-foreground:hover{color:var(--sidebar-accent-foreground)}.tw\\:hover\\:underline:hover{text-decoration-line:underline}.tw\\:hover\\:opacity-80:hover{opacity:.8}.tw\\:hover\\:opacity-100:hover{opacity:1}.tw\\:hover\\:shadow-\\[0_0_0_1px_var\\(--sidebar-accent\\)\\]:hover{--tw-shadow:0 0 0 1px var(--tw-shadow-color,var(--sidebar-accent));box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:hover\\:shadow-md:hover{--tw-shadow:0 4px 6px -1px var(--tw-shadow-color,#0000001a), 0 2px 4px -2px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:hover\\:ring-3:hover{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:hover\\:group-data-\\[collapsible\\=offcanvas\\]\\:bg-sidebar:hover:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){background-color:var(--sidebar)}.tw\\:hover\\:after\\:bg-sidebar-border:hover:after{content:var(--tw-content);background-color:var(--sidebar-border)}}.tw\\:focus\\:relative:focus{position:relative}.tw\\:focus\\:z-10:focus{z-index:10}.tw\\:focus\\:bg-accent:focus{background-color:var(--accent)}.tw\\:focus\\:bg-muted:focus{background-color:var(--muted)}.tw\\:focus\\:text-accent-foreground:focus{color:var(--accent-foreground)}.tw\\:focus\\:text-foreground:focus{color:var(--foreground)}.tw\\:focus\\:ring-2:focus{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus\\:ring-ring:focus{--tw-ring-color:var(--ring)}.tw\\:focus\\:ring-offset-1:focus{--tw-ring-offset-width:1px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}.tw\\:focus\\:ring-offset-background:focus{--tw-ring-offset-color:var(--background)}.tw\\:focus\\:outline-hidden:focus{--tw-outline-style:none;outline-style:none}@media (forced-colors:active){.tw\\:focus\\:outline-hidden:focus{outline-offset:2px;outline:2px solid #0000}}:is(.tw\\:focus\\:\\*\\*\\:text-accent-foreground:focus *),:is(.tw\\:not-data-\\[variant\\=destructive\\]\\:focus\\:\\*\\*\\:text-accent-foreground:not([data-variant=destructive]):focus *){color:var(--accent-foreground)}.tw\\:focus-visible\\:relative:focus-visible{position:relative}.tw\\:focus-visible\\:z-10:focus-visible{z-index:10}.tw\\:focus-visible\\:border-destructive\\/40:focus-visible{border-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:focus-visible\\:border-destructive\\/40:focus-visible{border-color:color-mix(in oklab, var(--destructive) 40%, transparent)}}.tw\\:focus-visible\\:border-ring:focus-visible{border-color:var(--ring)}.tw\\:focus-visible\\:ring-0:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-visible\\:ring-1:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-visible\\:ring-2:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-visible\\:ring-3:focus-visible,.tw\\:focus-visible\\:ring-\\[3px\\]:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-visible\\:ring-\\[color\\:hsl\\(240\\,5\\%\\,64\\.9\\%\\)\\]:focus-visible{--tw-ring-color:#a1a1aa}.tw\\:focus-visible\\:ring-destructive\\/20:focus-visible{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:focus-visible\\:ring-destructive\\/20:focus-visible{--tw-ring-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:focus-visible\\:ring-ring:focus-visible,.tw\\:focus-visible\\:ring-ring\\/50:focus-visible{--tw-ring-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.tw\\:focus-visible\\:ring-ring\\/50:focus-visible{--tw-ring-color:color-mix(in oklab, var(--ring) 50%, transparent)}}.tw\\:focus-visible\\:ring-slate-400:focus-visible{--tw-ring-color:var(--tw-color-slate-400)}.tw\\:focus-visible\\:ring-offset-2:focus-visible{--tw-ring-offset-width:2px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}.tw\\:focus-visible\\:outline-hidden:focus-visible{--tw-outline-style:none;outline-style:none}@media (forced-colors:active){.tw\\:focus-visible\\:outline-hidden:focus-visible{outline-offset:2px;outline:2px solid #0000}}.tw\\:focus-visible\\:outline-1:focus-visible{outline-style:var(--tw-outline-style);outline-width:1px}.tw\\:focus-visible\\:outline-ring:focus-visible{outline-color:var(--ring)}.tw\\:focus-visible\\:outline-none:focus-visible{--tw-outline-style:none;outline-style:none}:is(.tw\\:\\*\\:focus-visible\\:relative>*):focus-visible{position:relative}:is(.tw\\:\\*\\:focus-visible\\:z-10>*):focus-visible{z-index:10}.tw\\:active\\:bg-sidebar-accent:active{background-color:var(--sidebar-accent)}.tw\\:active\\:text-sidebar-accent-foreground:active{color:var(--sidebar-accent-foreground)}.tw\\:active\\:ring-3:active{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:active\\:not-aria-\\[haspopup\\]\\:translate-y-px:active:not([aria-haspopup]){--tw-translate-y:1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:disabled\\:pointer-events-none:disabled{pointer-events:none}.tw\\:disabled\\:cursor-not-allowed:disabled{cursor:not-allowed}.tw\\:disabled\\:bg-input\\/50:disabled{background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:disabled\\:bg-input\\/50:disabled{background-color:color-mix(in oklab, var(--input) 50%, transparent)}}.tw\\:disabled\\:bg-transparent:disabled{background-color:#0000}.tw\\:disabled\\:opacity-50:disabled{opacity:.5}:where([data-side=bottom]) .tw\\:in-data-\\[side\\=bottom\\]\\:translate-y-\\[calc\\(-50\\%-1px\\)\\]{--tw-translate-y:calc(-50% - 1px);translate:var(--tw-translate-x) var(--tw-translate-y)}:where([data-side=bottom]) .tw\\:in-data-\\[side\\=bottom\\]\\:\\[clip-path\\:polygon\\(100\\%_0\\,100\\%_100\\%\\,0_100\\%\\)\\]{clip-path:polygon(100% 0,100% 100%,0 100%)}:where([data-side=primary]) .tw\\:in-data-\\[side\\=primary\\]\\:cursor-w-resize{cursor:w-resize}:where([data-side=secondary]) .tw\\:in-data-\\[side\\=secondary\\]\\:cursor-e-resize{cursor:e-resize}:where([data-side=top]) .tw\\:in-data-\\[side\\=top\\]\\:translate-y-\\[calc\\(-50\\%-1px\\)\\]{--tw-translate-y:calc(-50% - 1px);translate:var(--tw-translate-x) var(--tw-translate-y)}:where([data-side=top]) .tw\\:in-data-\\[side\\=top\\]\\:\\[clip-path\\:polygon\\(100\\%_0\\,100\\%_100\\%\\,0_100\\%\\)\\]{clip-path:polygon(100% 0,100% 100%,0 100%)}:where([data-slot=button-group]) .tw\\:in-data-\\[slot\\=button-group\\]\\:rounded-lg{border-radius:var(--radius)}:where([data-slot=combobox-content]) .tw\\:in-data-\\[slot\\=combobox-content\\]\\:focus-within\\:border-inherit:focus-within{border-color:inherit}:where([data-slot=combobox-content]) .tw\\:in-data-\\[slot\\=combobox-content\\]\\:focus-within\\:ring-0:focus-within{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}:where([data-slot=dialog-content]) .tw\\:in-data-\\[slot\\=dialog-content\\]\\:rounded-lg\\!{border-radius:var(--radius)!important}:where([data-slot=tooltip-content]) .tw\\:in-data-\\[slot\\=tooltip-content\\]\\:bg-background\\/20{background-color:var(--background)}@supports (color:color-mix(in lab, red, red)){:where([data-slot=tooltip-content]) .tw\\:in-data-\\[slot\\=tooltip-content\\]\\:bg-background\\/20{background-color:color-mix(in oklab, var(--background) 20%, transparent)}}:where([data-slot=tooltip-content]) .tw\\:in-data-\\[slot\\=tooltip-content\\]\\:text-background{color:var(--background)}:where([data-slot=tooltip-content]) .tw\\:in-data-\\[slot\\=tooltip-content\\]\\:text-destructive{color:var(--destructive)}.tw\\:has-disabled\\:bg-input\\/50:has(:disabled){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:has-disabled\\:bg-input\\/50:has(:disabled){background-color:color-mix(in oklab, var(--input) 50%, transparent)}}.tw\\:has-disabled\\:opacity-50:has(:disabled){opacity:.5}.tw\\:has-aria-expanded\\:bg-muted\\/50:has([aria-expanded=true]){background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:has-aria-expanded\\:bg-muted\\/50:has([aria-expanded=true]){background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:has-data-\\[icon\\=inline-end\\]\\:pe-1:has([data-icon=inline-end]){padding-inline-end:calc(calc(var(--spacing)) * 1)}.tw\\:has-data-\\[icon\\=inline-end\\]\\:pe-1\\.5:has([data-icon=inline-end]){padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[icon\\=inline-end\\]\\:pe-2:has([data-icon=inline-end]){padding-inline-end:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[spacing\\=0\\]\\/toggle-group\\:has-data-\\[icon\\=inline-end\\]\\:pe-1\\.5:is(:where(.tw\\:group\\/toggle-group)[data-spacing="0"] *):has([data-icon=inline-end]){padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[icon\\=inline-start\\]\\:ps-1:has([data-icon=inline-start]){padding-inline-start:calc(calc(var(--spacing)) * 1)}.tw\\:has-data-\\[icon\\=inline-start\\]\\:ps-1\\.5:has([data-icon=inline-start]){padding-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[icon\\=inline-start\\]\\:ps-2:has([data-icon=inline-start]){padding-inline-start:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[spacing\\=0\\]\\/toggle-group\\:has-data-\\[icon\\=inline-start\\]\\:ps-1\\.5:is(:where(.tw\\:group\\/toggle-group)[data-spacing="0"] *):has([data-icon=inline-start]){padding-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[slot\\=alert-action\\]\\:relative:has([data-slot=alert-action]){position:relative}.tw\\:has-data-\\[slot\\=alert-action\\]\\:pe-18:has([data-slot=alert-action]){padding-inline-end:calc(calc(var(--spacing)) * 18)}.tw\\:has-data-\\[slot\\=card-action\\]\\:grid-cols-\\[1fr_auto\\]:has([data-slot=card-action]){grid-template-columns:1fr auto}.tw\\:has-data-\\[slot\\=card-description\\]\\:grid-rows-\\[auto_auto\\]:has([data-slot=card-description]){grid-template-rows:auto auto}.tw\\:has-data-\\[slot\\=card-footer\\]\\:pb-0:has([data-slot=card-footer]){padding-bottom:calc(calc(var(--spacing)) * 0)}.tw\\:has-data-\\[slot\\=kbd\\]\\:pe-0:has([data-slot=kbd]){padding-inline-end:calc(calc(var(--spacing)) * 0)}.tw\\:has-data-\\[slot\\=kbd\\]\\:pe-1\\.5:has([data-slot=kbd]){padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[variant\\=inset\\]\\:bg-sidebar:has([data-variant=inset]){background-color:var(--sidebar)}.tw\\:has-\\[\\[data-slot\\=input-group-control\\]\\:focus-visible\\]\\:border-ring:has([data-slot=input-group-control]:focus-visible){border-color:var(--ring)}.tw\\:has-\\[\\[data-slot\\=input-group-control\\]\\:focus-visible\\]\\:ring-3:has([data-slot=input-group-control]:focus-visible){--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:has-\\[\\[data-slot\\=input-group-control\\]\\:focus-visible\\]\\:ring-ring\\/50:has([data-slot=input-group-control]:focus-visible){--tw-ring-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.tw\\:has-\\[\\[data-slot\\=input-group-control\\]\\:focus-visible\\]\\:ring-ring\\/50:has([data-slot=input-group-control]:focus-visible){--tw-ring-color:color-mix(in oklab, var(--ring) 50%, transparent)}}.tw\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:border-destructive:has([data-slot][aria-invalid=true]){border-color:var(--destructive)}.tw\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-3:has([data-slot][aria-invalid=true]){--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-destructive\\/20:has([data-slot][aria-invalid=true]){--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-destructive\\/20:has([data-slot][aria-invalid=true]){--tw-ring-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:has-\\[\\>\\[data-align\\=block-end\\]\\]\\:h-auto:has(>[data-align=block-end]){height:auto}.tw\\:has-\\[\\>\\[data-align\\=block-end\\]\\]\\:flex-col:has(>[data-align=block-end]){flex-direction:column}.tw\\:has-\\[\\>\\[data-align\\=block-start\\]\\]\\:h-auto:has(>[data-align=block-start]){height:auto}.tw\\:has-\\[\\>\\[data-align\\=block-start\\]\\]\\:flex-col:has(>[data-align=block-start]){flex-direction:column}.tw\\:has-\\[\\>\\[data-slot\\=button-group\\]\\]\\:gap-2:has(>[data-slot=button-group]){gap:calc(calc(var(--spacing)) * 2)}.tw\\:has-\\[\\>button\\]\\:ms-\\[-0\\.3rem\\]:has(>button){margin-inline-start:-.3rem}.tw\\:has-\\[\\>button\\]\\:me-\\[-0\\.3rem\\]:has(>button){margin-inline-end:-.3rem}.tw\\:has-\\[\\>img\\]\\:grid-cols-\\[auto_1fr\\]:has(>img){grid-template-columns:auto 1fr}.tw\\:has-\\[\\>img\\]\\:gap-x-2:has(>img){column-gap:calc(calc(var(--spacing)) * 2)}.tw\\:has-\\[\\>img\\:first-child\\]\\:pt-0:has(>img:first-child){padding-top:calc(calc(var(--spacing)) * 0)}.tw\\:has-\\[\\>kbd\\]\\:ms-\\[-0\\.15rem\\]:has(>kbd){margin-inline-start:-.15rem}.tw\\:has-\\[\\>kbd\\]\\:me-\\[-0\\.15rem\\]:has(>kbd){margin-inline-end:-.15rem}.tw\\:has-\\[\\>svg\\]\\:grid-cols-\\[auto_1fr\\]:has(>svg){grid-template-columns:auto 1fr}.tw\\:has-\\[\\>svg\\]\\:gap-x-2:has(>svg){column-gap:calc(calc(var(--spacing)) * 2)}.tw\\:has-\\[\\>svg\\]\\:p-0:has(>svg){padding:calc(calc(var(--spacing)) * 0)}.tw\\:has-\\[\\>textarea\\]\\:h-auto:has(>textarea){height:auto}.tw\\:aria-disabled\\:pointer-events-none[aria-disabled=true]{pointer-events:none}.tw\\:aria-disabled\\:opacity-50[aria-disabled=true]{opacity:.5}.tw\\:aria-expanded\\:bg-muted[aria-expanded=true]{background-color:var(--muted)}.tw\\:aria-expanded\\:bg-secondary[aria-expanded=true]{background-color:var(--secondary)}.tw\\:aria-expanded\\:text-foreground[aria-expanded=true]{color:var(--foreground)}.tw\\:aria-expanded\\:text-secondary-foreground[aria-expanded=true]{color:var(--secondary-foreground)}.tw\\:aria-expanded\\:opacity-100[aria-expanded=true]{opacity:1}.tw\\:aria-invalid\\:border-destructive[aria-invalid=true]{border-color:var(--destructive)}.tw\\:aria-invalid\\:ring-0[aria-invalid=true]{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:aria-invalid\\:ring-3[aria-invalid=true]{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:aria-invalid\\:ring-destructive\\/20[aria-invalid=true]{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:aria-invalid\\:ring-destructive\\/20[aria-invalid=true]{--tw-ring-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:aria-invalid\\:aria-checked\\:border-primary[aria-invalid=true][aria-checked=true]{border-color:var(--primary)}.tw\\:aria-pressed\\:bg-muted[aria-pressed=true]{background-color:var(--muted)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:h-px[aria-orientation=horizontal]{height:1px}.tw\\:aria-\\[orientation\\=horizontal\\]\\:w-full[aria-orientation=horizontal]{width:100%}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:start-0[aria-orientation=horizontal]:after{content:var(--tw-content);inset-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:h-1[aria-orientation=horizontal]:after{content:var(--tw-content);height:calc(calc(var(--spacing)) * 1)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:w-full[aria-orientation=horizontal]:after{content:var(--tw-content);width:100%}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:translate-x-0[aria-orientation=horizontal]:after{content:var(--tw-content);--tw-translate-x:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:-translate-y-1\\/2[aria-orientation=horizontal]:after{content:var(--tw-content);--tw-translate-y:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:aria-\\[orientation\\=vertical\\]\\:flex-col[aria-orientation=vertical]{flex-direction:column}.tw\\:data-inset\\:ps-7[data-inset]{padding-inline-start:calc(calc(var(--spacing)) * 7)}.tw\\:data-placeholder\\:text-muted-foreground[data-placeholder]{color:var(--muted-foreground)}.tw\\:data-\\[align-trigger\\=false\\]\\:min-w-36[data-align-trigger=false]{min-width:calc(calc(var(--spacing)) * 36)}.tw\\:data-\\[align-trigger\\=true\\]\\:min-w-\\(--radix-select-trigger-width\\)[data-align-trigger=true]{min-width:var(--radix-select-trigger-width)}.tw\\:data-\\[align-trigger\\=true\\]\\:animate-none[data-align-trigger=true]{animation:none}.tw\\:data-\\[disabled\\=true\\]\\:pointer-events-none[data-disabled=true]{pointer-events:none}.tw\\:data-\\[disabled\\=true\\]\\:opacity-50[data-disabled=true]{opacity:.5}.tw\\:data-\\[position\\=popper\\]\\:h-\\(--radix-select-trigger-height\\)[data-position=popper]{height:var(--radix-select-trigger-height)}.tw\\:data-\\[position\\=popper\\]\\:w-full[data-position=popper]{width:100%}.tw\\:data-\\[position\\=popper\\]\\:min-w-\\(--radix-select-trigger-width\\)[data-position=popper]{min-width:var(--radix-select-trigger-width)}.tw\\:data-\\[side\\=bottom\\]\\:translate-y-1[data-side=bottom]{--tw-translate-y:calc(calc(var(--spacing)) * 1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=bottom\\]\\:slide-in-from-top-2[data-side=bottom]{--tw-enter-translate-y:calc(2*var(--spacing)*-1)}.tw\\:data-\\[side\\=left\\]\\:-translate-x-1[data-side=left]{--tw-translate-x:calc(calc(var(--spacing)) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=left\\]\\:slide-in-from-right-2[data-side=left]{--tw-enter-translate-x:calc(2*var(--spacing))}.tw\\:data-\\[side\\=right\\]\\:translate-x-1[data-side=right]{--tw-translate-x:calc(calc(var(--spacing)) * 1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=right\\]\\:slide-in-from-left-2[data-side=right]{--tw-enter-translate-x:calc(2*var(--spacing)*-1)}.tw\\:data-\\[side\\=top\\]\\:-translate-y-1[data-side=top]{--tw-translate-y:calc(calc(var(--spacing)) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=top\\]\\:slide-in-from-bottom-2[data-side=top]{--tw-enter-translate-y:calc(2*var(--spacing))}.tw\\:data-\\[size\\=default\\]\\:h-8[data-size=default]{height:calc(calc(var(--spacing)) * 8)}.tw\\:data-\\[size\\=default\\]\\:h-\\[18\\.4px\\][data-size=default]{height:18.4px}.tw\\:data-\\[size\\=default\\]\\:w-\\[32px\\][data-size=default]{width:32px}.tw\\:data-\\[size\\=lg\\]\\:size-10[data-size=lg]{width:calc(calc(var(--spacing)) * 10);height:calc(calc(var(--spacing)) * 10)}.tw\\:data-\\[size\\=md\\]\\:text-sm[data-size=md]{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:data-\\[size\\=sm\\]\\:size-6[data-size=sm]{width:calc(calc(var(--spacing)) * 6);height:calc(calc(var(--spacing)) * 6)}.tw\\:data-\\[size\\=sm\\]\\:h-7[data-size=sm]{height:calc(calc(var(--spacing)) * 7)}.tw\\:data-\\[size\\=sm\\]\\:h-\\[14px\\][data-size=sm]{height:14px}.tw\\:data-\\[size\\=sm\\]\\:w-\\[24px\\][data-size=sm]{width:24px}.tw\\:data-\\[size\\=sm\\]\\:gap-3[data-size=sm]{gap:calc(calc(var(--spacing)) * 3)}.tw\\:data-\\[size\\=sm\\]\\:rounded-\\[min\\(var\\(--tw-radius-md\\)\\,10px\\)\\][data-size=sm]{border-radius:min(var(--tw-radius-md), 10px)}.tw\\:data-\\[size\\=sm\\]\\:py-3[data-size=sm]{padding-block:calc(calc(var(--spacing)) * 3)}.tw\\:data-\\[size\\=sm\\]\\:text-xs[data-size=sm]{font-size:var(--tw-text-xs);line-height:var(--tw-leading,var(--tw-text-xs--line-height))}.tw\\:data-\\[size\\=sm\\]\\:has-data-\\[slot\\=card-footer\\]\\:pb-0[data-size=sm]:has([data-slot=card-footer]){padding-bottom:calc(calc(var(--spacing)) * 0)}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-item\\]\\:focus\\:bg-foreground\\/10 *)[data-slot$=-item]:focus{background-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-item\\]\\:focus\\:bg-foreground\\/10 *)[data-slot$=-item]:focus{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)}}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-item\\]\\:data-highlighted\\:bg-foreground\\/10 *)[data-slot$=-item][data-highlighted]{background-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-item\\]\\:data-highlighted\\:bg-foreground\\/10 *)[data-slot$=-item][data-highlighted]{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)}}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-separator\\]\\:bg-foreground\\/5 *)[data-slot$=-separator]{background-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-separator\\]\\:bg-foreground\\/5 *)[data-slot$=-separator]{background-color:color-mix(in oklab, var(--foreground) 5%, transparent)}}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-trigger\\]\\:focus\\:bg-foreground\\/10 *)[data-slot$=-trigger]:focus{background-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-trigger\\]\\:focus\\:bg-foreground\\/10 *)[data-slot$=-trigger]:focus{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)}}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-trigger\\]\\:aria-expanded\\:bg-foreground\\/10\\! *)[data-slot$=-trigger][aria-expanded=true]{background-color:var(--foreground)!important}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-trigger\\]\\:aria-expanded\\:bg-foreground\\/10\\! *)[data-slot$=-trigger][aria-expanded=true]{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)!important}}:is(.tw\\:\\*\\:data-\\[slot\\=alert-description\\]\\:text-destructive\\/90>*)[data-slot=alert-description]{color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\:data-\\[slot\\=alert-description\\]\\:text-destructive\\/90>*)[data-slot=alert-description]{color:color-mix(in oklab, var(--destructive) 90%, transparent)}}:is(.tw\\:\\*\\:data-\\[slot\\=avatar\\]\\:ring-2>*)[data-slot=avatar]{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}:is(.tw\\:\\*\\:data-\\[slot\\=avatar\\]\\:ring-background>*)[data-slot=avatar]{--tw-ring-color:var(--background)}:is(.tw\\:\\*\\:data-\\[slot\\=input-group-addon\\]\\:ps-2\\!>*)[data-slot=input-group-addon]{padding-inline-start:calc(calc(var(--spacing)) * 2)!important}:is(.tw\\:\\*\\*\\:data-\\[slot\\=kbd\\]\\:relative *)[data-slot=kbd]{position:relative}:is(.tw\\:\\*\\*\\:data-\\[slot\\=kbd\\]\\:isolate *)[data-slot=kbd]{isolation:isolate}:is(.tw\\:\\*\\*\\:data-\\[slot\\=kbd\\]\\:z-50 *)[data-slot=kbd]{z-index:50}:is(.tw\\:\\*\\*\\:data-\\[slot\\=kbd\\]\\:rounded-sm *)[data-slot=kbd]{border-radius:calc(var(--radius) * .6)}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:line-clamp-1>*)[data-slot=select-value]{-webkit-line-clamp:1;-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:flex>*)[data-slot=select-value]{display:flex}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:flex-1>*)[data-slot=select-value]{flex:1}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:items-center>*)[data-slot=select-value]{align-items:center}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:gap-1\\.5>*)[data-slot=select-value]{gap:calc(calc(var(--spacing)) * 1.5)}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:text-start>*)[data-slot=select-value]{text-align:start}.tw\\:group-data-horizontal\\/toggle-group\\:data-\\[spacing\\=0\\]\\:first\\:rounded-s-lg:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=horizontal]) *)[data-spacing="0"]:first-child{border-start-start-radius:var(--radius);border-end-start-radius:var(--radius)}.tw\\:group-data-vertical\\/toggle-group\\:data-\\[spacing\\=0\\]\\:first\\:rounded-t-lg:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=vertical]) *)[data-spacing="0"]:first-child{border-top-left-radius:var(--radius);border-top-right-radius:var(--radius)}.tw\\:group-data-horizontal\\/toggle-group\\:data-\\[spacing\\=0\\]\\:last\\:rounded-e-lg:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=horizontal]) *)[data-spacing="0"]:last-child{border-start-end-radius:var(--radius);border-end-end-radius:var(--radius)}.tw\\:group-data-vertical\\/toggle-group\\:data-\\[spacing\\=0\\]\\:last\\:rounded-b-lg:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=vertical]) *)[data-spacing="0"]:last-child{border-bottom-right-radius:var(--radius);border-bottom-left-radius:var(--radius)}.tw\\:data-\\[state\\=active\\]\\:bg-background[data-state=active]{background-color:var(--background)}.tw\\:data-\\[state\\=active\\]\\:text-foreground[data-state=active]{color:var(--foreground)}.tw\\:data-\\[state\\=active\\]\\:shadow-sm[data-state=active]{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:data-\\[state\\=closed\\]\\:overflow-hidden[data-state=closed]{overflow:hidden}.tw\\:data-\\[state\\=delayed-open\\]\\:animate-in[data-state=delayed-open]{animation:enter var(--tw-animation-duration,var(--tw-duration,.15s))var(--tw-ease,ease)var(--tw-animation-delay,0s)var(--tw-animation-iteration-count,1)var(--tw-animation-direction,normal)var(--tw-animation-fill-mode,none)}.tw\\:data-\\[state\\=delayed-open\\]\\:fade-in-0[data-state=delayed-open]{--tw-enter-opacity:0}.tw\\:data-\\[state\\=delayed-open\\]\\:zoom-in-95[data-state=delayed-open]{--tw-enter-scale:.95}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-soft-approved\\)\\][data-state=on]{background-color:var(--inv-soft-approved)}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-soft-unapproved\\)\\][data-state=on]{background-color:var(--inv-soft-unapproved)}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-soft-unknown\\)\\][data-state=on]{background-color:var(--inv-soft-unknown)}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-vivid-approved\\)\\][data-state=on]{background-color:var(--inv-vivid-approved)}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-vivid-unapproved\\)\\][data-state=on]{background-color:var(--inv-vivid-unapproved)}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-vivid-unknown\\)\\][data-state=on]{background-color:var(--inv-vivid-unknown)}.tw\\:data-\\[state\\=on\\]\\:bg-muted[data-state=on]{background-color:var(--muted)}.tw\\:data-\\[state\\=on\\]\\:text-\\[var\\(--inv-icon-approved\\)\\][data-state=on]{color:var(--inv-icon-approved)}.tw\\:data-\\[state\\=on\\]\\:text-\\[var\\(--inv-icon-unapproved\\)\\][data-state=on]{color:var(--inv-icon-unapproved)}.tw\\:data-\\[state\\=on\\]\\:text-\\[var\\(--inv-icon-unknown\\)\\][data-state=on]{color:var(--inv-icon-unknown)}.tw\\:data-\\[state\\=on\\]\\:text-\\[var\\(--inv-on\\)\\][data-state=on]{color:var(--inv-on)}.tw\\:data-\\[state\\=on\\]\\:text-foreground[data-state=on]{color:var(--foreground)}.tw\\:data-\\[state\\=open\\]\\:bg-accent[data-state=open]{background-color:var(--accent)}.tw\\:data-\\[state\\=open\\]\\:bg-muted[data-state=open]{background-color:var(--muted)}.tw\\:data-\\[state\\=open\\]\\:text-foreground[data-state=open]{color:var(--foreground)}.tw\\:data-\\[state\\=selected\\]\\:bg-muted[data-state=selected]{background-color:var(--muted)}.tw\\:data-\\[variant\\=destructive\\]\\:text-destructive[data-variant=destructive]{color:var(--destructive)}:is(:is(.tw\\:\\*\\*\\:data-\\[variant\\=destructive\\]\\:\\*\\*\\:text-accent-foreground\\! *)[data-variant=destructive] *),:is(.tw\\:\\*\\*\\:data-\\[variant\\=destructive\\]\\:text-accent-foreground\\! *)[data-variant=destructive]{color:var(--accent-foreground)!important}.tw\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-destructive\\/10[data-variant=destructive]:focus{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-destructive\\/10[data-variant=destructive]:focus{background-color:color-mix(in oklab, var(--destructive) 10%, transparent)}}.tw\\:data-\\[variant\\=destructive\\]\\:focus\\:text-destructive[data-variant=destructive]:focus{color:var(--destructive)}:is(.tw\\:\\*\\*\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-foreground\\/10\\! *)[data-variant=destructive]:focus{background-color:var(--foreground)!important}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-foreground\\/10\\! *)[data-variant=destructive]:focus{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)!important}}.tw\\:data-\\[variant\\=line\\]\\:rounded-none[data-variant=line]{border-radius:0}.tw\\:group-data-horizontal\\/toggle-group\\:data-\\[spacing\\=0\\]\\:data-\\[variant\\=outline\\]\\:border-s-0:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=horizontal]) *)[data-spacing="0"][data-variant=outline]{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:group-data-vertical\\/toggle-group\\:data-\\[spacing\\=0\\]\\:data-\\[variant\\=outline\\]\\:border-t-0:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=vertical]) *)[data-spacing="0"][data-variant=outline]{border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:group-data-horizontal\\/toggle-group\\:data-\\[spacing\\=0\\]\\:data-\\[variant\\=outline\\]\\:first\\:border-s:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=horizontal]) *)[data-spacing="0"][data-variant=outline]:first-child{border-inline-start-style:var(--tw-border-style);border-inline-start-width:1px}.tw\\:group-data-vertical\\/toggle-group\\:data-\\[spacing\\=0\\]\\:data-\\[variant\\=outline\\]\\:first\\:border-t:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=vertical]) *)[data-spacing="0"][data-variant=outline]:first-child{border-top-style:var(--tw-border-style);border-top-width:1px}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:inset-x-0[data-vaul-drawer-direction=bottom]{inset-inline:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:bottom-0[data-vaul-drawer-direction=bottom]{bottom:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:mt-24[data-vaul-drawer-direction=bottom]{margin-top:calc(calc(var(--spacing)) * 24)}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:max-h-\\[80vh\\][data-vaul-drawer-direction=bottom]{max-height:80vh}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:rounded-t-xl[data-vaul-drawer-direction=bottom]{border-top-left-radius:calc(var(--radius) * 1.4);border-top-right-radius:calc(var(--radius) * 1.4)}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:border-t[data-vaul-drawer-direction=bottom]{border-top-style:var(--tw-border-style);border-top-width:1px}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:inset-y-0[data-vaul-drawer-direction=left]{inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:left-0[data-vaul-drawer-direction=left]{left:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:w-3\\/4[data-vaul-drawer-direction=left]{width:75%}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:flex-row[data-vaul-drawer-direction=left]{flex-direction:row}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:rounded-r-xl[data-vaul-drawer-direction=left]{border-top-right-radius:calc(var(--radius) * 1.4);border-bottom-right-radius:calc(var(--radius) * 1.4)}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:border-r[data-vaul-drawer-direction=left]{border-right-style:var(--tw-border-style);border-right-width:1px}.tw\\:data-\\[vaul-drawer-direction\\=left\\/right\\]\\:flex-row[data-vaul-drawer-direction=left\\/right]{flex-direction:row}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:inset-y-0[data-vaul-drawer-direction=right]{inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:right-0[data-vaul-drawer-direction=right]{right:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:w-3\\/4[data-vaul-drawer-direction=right]{width:75%}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:flex-row[data-vaul-drawer-direction=right]{flex-direction:row}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:rounded-l-xl[data-vaul-drawer-direction=right]{border-top-left-radius:calc(var(--radius) * 1.4);border-bottom-left-radius:calc(var(--radius) * 1.4)}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:border-l[data-vaul-drawer-direction=right]{border-left-style:var(--tw-border-style);border-left-width:1px}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:inset-x-0[data-vaul-drawer-direction=top]{inset-inline:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:top-0[data-vaul-drawer-direction=top]{top:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:mb-24[data-vaul-drawer-direction=top]{margin-bottom:calc(calc(var(--spacing)) * 24)}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:max-h-\\[80vh\\][data-vaul-drawer-direction=top]{max-height:80vh}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:rounded-b-xl[data-vaul-drawer-direction=top]{border-bottom-right-radius:calc(var(--radius) * 1.4);border-bottom-left-radius:calc(var(--radius) * 1.4)}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:border-b[data-vaul-drawer-direction=top]{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}@supports ((-webkit-backdrop-filter:var(--tw)) or (backdrop-filter:var(--tw))){.tw\\:supports-backdrop-filter\\:backdrop-blur-xs{--tw-backdrop-blur:blur(var(--tw-blur-xs));-webkit-backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)}}@media (min-width:40rem){.tw\\:sm\\:flex{display:flex}.tw\\:sm\\:max-w-sm{max-width:var(--tw-container-sm)}.tw\\:sm\\:flex-row{flex-direction:row}.tw\\:sm\\:justify-end{justify-content:flex-end}.tw\\:sm\\:p-8{padding:calc(calc(var(--spacing)) * 8)}.tw\\:sm\\:text-start{text-align:start}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:sm\\:max-w-sm[data-vaul-drawer-direction=left],.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:sm\\:max-w-sm[data-vaul-drawer-direction=right]{max-width:var(--tw-container-sm)}}@media (min-width:48rem){.tw\\:md\\:block{display:block}.tw\\:md\\:flex{display:flex}.tw\\:md\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.tw\\:md\\:gap-0\\.5{gap:calc(calc(var(--spacing)) * .5)}.tw\\:md\\:text-start{text-align:start}.tw\\:md\\:text-sm{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:md\\:text-pretty{text-wrap:pretty}.tw\\:md\\:opacity-0{opacity:0}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:m-2:is(:where(.tw\\:peer)[data-variant=inset]~*){margin:calc(calc(var(--spacing)) * 2)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:ms-0:is(:where(.tw\\:peer)[data-variant=inset]~*){margin-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:rounded-xl:is(:where(.tw\\:peer)[data-variant=inset]~*){border-radius:calc(var(--radius) * 1.4)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:shadow-sm:is(:where(.tw\\:peer)[data-variant=inset]~*){--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:peer-data-\\[state\\=collapsed\\]\\:ms-2:is(:where(.tw\\:peer)[data-variant=inset]~*):is(:where(.tw\\:peer)[data-state=collapsed]~*){margin-inline-start:calc(calc(var(--spacing)) * 2)}.tw\\:md\\:after\\:hidden:after{content:var(--tw-content);display:none}}@media (min-width:64rem){.tw\\:lg\\:flex{display:flex}.tw\\:lg\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}:where(.tw\\:lg\\:space-x-8>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 8) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 8) * calc(1 - var(--tw-space-x-reverse)))}.tw\\:lg\\:text-5xl{font-size:var(--tw-text-5xl);line-height:var(--tw-leading,var(--tw-text-5xl--line-height))}}@media (min-width:48rem){@media (min-width:64rem){.tw\\:md\\:lg\\:hidden{display:none}}}@media (min-width:80rem){.tw\\:xl\\:auto-cols-fr{grid-auto-columns:minmax(0,1fr)}.tw\\:xl\\:grid-flow-col{grid-auto-flow:column}.tw\\:xl\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.tw\\:xl\\:grid-cols-none{grid-template-columns:none}.tw\\:xl\\:grid-rows-2{grid-template-rows:repeat(2,minmax(0,1fr))}}@container search not (min-width:7rem){.tw\\:\\@max-\\[7rem\\]\\/search\\:hidden{display:none}.tw\\:\\@max-\\[7rem\\]\\/search\\:ps-3{padding-inline-start:calc(calc(var(--spacing)) * 3)}}@container search not (min-width:4rem){.tw\\:\\@max-\\[4rem\\]\\/search\\:hidden{display:none}.tw\\:\\@max-\\[4rem\\]\\/search\\:pe-3{padding-inline-end:calc(calc(var(--spacing)) * 3)}}@container search not (min-width:3rem){.tw\\:\\@max-\\[3rem\\]\\/search\\:ps-0{padding-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:\\@max-\\[3rem\\]\\/search\\:pe-0{padding-inline-end:calc(calc(var(--spacing)) * 0)}}@container (min-width:24rem){.tw\\:\\@sm\\:basis-auto{flex-basis:auto}}.tw\\:ltr\\:left-2:where(:dir(ltr),[dir=ltr],[dir=ltr] *){left:calc(calc(var(--spacing)) * 2)}.tw\\:ltr\\:-translate-x-1\\/2:where(:dir(ltr),[dir=ltr],[dir=ltr] *){--tw-translate-x:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:right-2:where(:dir(rtl),[dir=rtl],[dir=rtl] *){right:calc(calc(var(--spacing)) * 2)}.tw\\:rtl\\:flex:where(:dir(rtl),[dir=rtl],[dir=rtl] *){display:flex}.tw\\:rtl\\:-translate-x-px:where(:dir(rtl),[dir=rtl],[dir=rtl] *){--tw-translate-x:-1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:translate-x-1\\/2:where(:dir(rtl),[dir=rtl],[dir=rtl] *){--tw-translate-x:calc(1 / 2 * 100%);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:translate-x-px:where(:dir(rtl),[dir=rtl],[dir=rtl] *){--tw-translate-x:1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:after\\:translate-x-1\\/2:where(:dir(rtl),[dir=rtl],[dir=rtl] *):after{content:var(--tw-content);--tw-translate-x:calc(1 / 2 * 100%);translate:var(--tw-translate-x) var(--tw-translate-y)}:where([data-side=primary]) .tw\\:rtl\\:in-data-\\[side\\=primary\\]\\:cursor-e-resize:where(:dir(rtl),[dir=rtl],[dir=rtl] *){cursor:e-resize}:where([data-side=secondary]) .tw\\:rtl\\:in-data-\\[side\\=secondary\\]\\:cursor-w-resize:where(:dir(rtl),[dir=rtl],[dir=rtl] *){cursor:w-resize}.tw\\:rtl\\:aria-\\[orientation\\=horizontal\\]\\:after\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *)[aria-orientation=horizontal]:after{content:var(--tw-content);--tw-translate-x:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:data-\\[side\\=left\\]\\:translate-x-1:where(:dir(rtl),[dir=rtl],[dir=rtl] *)[data-side=left]{--tw-translate-x:calc(calc(var(--spacing)) * 1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:data-\\[side\\=right\\]\\:-translate-x-1:where(:dir(rtl),[dir=rtl],[dir=rtl] *)[data-side=right]{--tw-translate-x:calc(calc(var(--spacing)) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:dark\\:border-input:is(.dark *){border-color:var(--input)}.tw\\:dark\\:bg-destructive\\/20:is(.dark *){background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:bg-destructive\\/20:is(.dark *){background-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:dark\\:bg-input\\/30:is(.dark *){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:bg-input\\/30:is(.dark *){background-color:color-mix(in oklab, var(--input) 30%, transparent)}}.tw\\:dark\\:bg-transparent:is(.dark *){background-color:#0000}.tw\\:dark\\:text-amber-400:is(.dark *){color:var(--tw-color-amber-400)}.tw\\:dark\\:text-muted-foreground:is(.dark *){color:var(--muted-foreground)}.tw\\:dark\\:text-rose-400:is(.dark *){color:var(--tw-color-rose-400)}.tw\\:dark\\:text-sky-400:is(.dark *){color:var(--tw-color-sky-400)}.tw\\:dark\\:text-teal-400:is(.dark *){color:var(--tw-color-teal-400)}.tw\\:dark\\:after\\:mix-blend-lighten:is(.dark *):after{content:var(--tw-content);mix-blend-mode:lighten}@media (hover:hover){.tw\\:dark\\:hover\\:bg-blue-500:is(.dark *):hover{background-color:var(--tw-color-blue-500)}.tw\\:dark\\:hover\\:bg-destructive\\/30:is(.dark *):hover{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:hover\\:bg-destructive\\/30:is(.dark *):hover{background-color:color-mix(in oklab, var(--destructive) 30%, transparent)}}.tw\\:dark\\:hover\\:bg-input\\/50:is(.dark *):hover{background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:hover\\:bg-input\\/50:is(.dark *):hover{background-color:color-mix(in oklab, var(--input) 50%, transparent)}}.tw\\:dark\\:hover\\:bg-muted\\/50:is(.dark *):hover{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:hover\\:bg-muted\\/50:is(.dark *):hover{background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:dark\\:hover\\:text-foreground:is(.dark *):hover{color:var(--foreground)}}.tw\\:dark\\:focus-visible\\:ring-destructive\\/40:is(.dark *):focus-visible{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:focus-visible\\:ring-destructive\\/40:is(.dark *):focus-visible{--tw-ring-color:color-mix(in oklab, var(--destructive) 40%, transparent)}}.tw\\:dark\\:disabled\\:bg-input\\/80:is(.dark *):disabled{background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:disabled\\:bg-input\\/80:is(.dark *):disabled{background-color:color-mix(in oklab, var(--input) 80%, transparent)}}.tw\\:dark\\:disabled\\:bg-transparent:is(.dark *):disabled{background-color:#0000}:where([data-slot=tooltip-content]) .tw\\:dark\\:in-data-\\[slot\\=tooltip-content\\]\\:bg-background\\/10:is(.dark *){background-color:var(--background)}@supports (color:color-mix(in lab, red, red)){:where([data-slot=tooltip-content]) .tw\\:dark\\:in-data-\\[slot\\=tooltip-content\\]\\:bg-background\\/10:is(.dark *){background-color:color-mix(in oklab, var(--background) 10%, transparent)}}.tw\\:dark\\:has-disabled\\:bg-input\\/80:is(.dark *):has(:disabled){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:has-disabled\\:bg-input\\/80:is(.dark *):has(:disabled){background-color:color-mix(in oklab, var(--input) 80%, transparent)}}.tw\\:dark\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-destructive\\/40:is(.dark *):has([data-slot][aria-invalid=true]){--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-destructive\\/40:is(.dark *):has([data-slot][aria-invalid=true]){--tw-ring-color:color-mix(in oklab, var(--destructive) 40%, transparent)}}.tw\\:dark\\:aria-invalid\\:border-destructive\\/50:is(.dark *)[aria-invalid=true]{border-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:aria-invalid\\:border-destructive\\/50:is(.dark *)[aria-invalid=true]{border-color:color-mix(in oklab, var(--destructive) 50%, transparent)}}.tw\\:dark\\:aria-invalid\\:ring-destructive\\/40:is(.dark *)[aria-invalid=true]{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:aria-invalid\\:ring-destructive\\/40:is(.dark *)[aria-invalid=true]{--tw-ring-color:color-mix(in oklab, var(--destructive) 40%, transparent)}}.tw\\:dark\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-destructive\\/20:is(.dark *)[data-variant=destructive]:focus{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-destructive\\/20:is(.dark *)[data-variant=destructive]:focus{background-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:data-open\\:animate-in:where([data-state=open]),.tw\\:data-open\\:animate-in:where([data-open]:not([data-open=false])){animation:enter var(--tw-animation-duration,var(--tw-duration,.15s))var(--tw-ease,ease)var(--tw-animation-delay,0s)var(--tw-animation-iteration-count,1)var(--tw-animation-direction,normal)var(--tw-animation-fill-mode,none)}.tw\\:data-open\\:bg-accent:where([data-state=open]),.tw\\:data-open\\:bg-accent:where([data-open]:not([data-open=false])){background-color:var(--accent)}.tw\\:data-open\\:text-accent-foreground:where([data-state=open]),.tw\\:data-open\\:text-accent-foreground:where([data-open]:not([data-open=false])){color:var(--accent-foreground)}.tw\\:data-open\\:fade-in-0:where([data-state=open]),.tw\\:data-open\\:fade-in-0:where([data-open]:not([data-open=false])){--tw-enter-opacity:0}.tw\\:data-open\\:zoom-in-95:where([data-state=open]),.tw\\:data-open\\:zoom-in-95:where([data-open]:not([data-open=false])){--tw-enter-scale:.95}@media (hover:hover){:is(.tw\\:data-open\\:hover\\:bg-sidebar-accent:where([data-state=open]),.tw\\:data-open\\:hover\\:bg-sidebar-accent:where([data-open]:not([data-open=false]))):hover{background-color:var(--sidebar-accent)}:is(.tw\\:data-open\\:hover\\:text-sidebar-accent-foreground:where([data-state=open]),.tw\\:data-open\\:hover\\:text-sidebar-accent-foreground:where([data-open]:not([data-open=false]))):hover{color:var(--sidebar-accent-foreground)}}.tw\\:data-closed\\:animate-out:where([data-state=closed]),.tw\\:data-closed\\:animate-out:where([data-closed]:not([data-closed=false])){animation:exit var(--tw-animation-duration,var(--tw-duration,.15s))var(--tw-ease,ease)var(--tw-animation-delay,0s)var(--tw-animation-iteration-count,1)var(--tw-animation-direction,normal)var(--tw-animation-fill-mode,none)}.tw\\:data-closed\\:fade-out-0:where([data-state=closed]),.tw\\:data-closed\\:fade-out-0:where([data-closed]:not([data-closed=false])){--tw-exit-opacity:0}.tw\\:data-closed\\:zoom-out-95:where([data-state=closed]),.tw\\:data-closed\\:zoom-out-95:where([data-closed]:not([data-closed=false])){--tw-exit-scale:.95}.tw\\:data-checked\\:border-primary:where([data-state=checked]),.tw\\:data-checked\\:border-primary:where([data-checked]:not([data-checked=false])){border-color:var(--primary)}.tw\\:data-checked\\:bg-primary:where([data-state=checked]),.tw\\:data-checked\\:bg-primary:where([data-checked]:not([data-checked=false])){background-color:var(--primary)}.tw\\:data-checked\\:text-primary-foreground:where([data-state=checked]),.tw\\:data-checked\\:text-primary-foreground:where([data-checked]:not([data-checked=false])){color:var(--primary-foreground)}.tw\\:group-data-\\[size\\=default\\]\\/switch\\:data-checked\\:translate-x-\\[calc\\(100\\%-2px\\)\\]:is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-state=checked]),.tw\\:group-data-\\[size\\=default\\]\\/switch\\:data-checked\\:translate-x-\\[calc\\(100\\%-2px\\)\\]:is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-checked]:not([data-checked=false])),.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:data-checked\\:translate-x-\\[calc\\(100\\%-2px\\)\\]:is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-state=checked]),.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:data-checked\\:translate-x-\\[calc\\(100\\%-2px\\)\\]:is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-checked]:not([data-checked=false])){--tw-translate-x:calc(100% - 2px);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:group-data-\\[size\\=default\\]\\/switch\\:data-checked\\:-translate-x-\\[calc\\(100\\%-2px\\)\\]:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-state=checked]),.tw\\:rtl\\:group-data-\\[size\\=default\\]\\/switch\\:data-checked\\:-translate-x-\\[calc\\(100\\%-2px\\)\\]:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-checked]:not([data-checked=false])),.tw\\:rtl\\:group-data-\\[size\\=sm\\]\\/switch\\:data-checked\\:-translate-x-\\[calc\\(100\\%-2px\\)\\]:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-state=checked]),.tw\\:rtl\\:group-data-\\[size\\=sm\\]\\/switch\\:data-checked\\:-translate-x-\\[calc\\(100\\%-2px\\)\\]:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-checked]:not([data-checked=false])){--tw-translate-x:calc(calc(100% - 2px) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:dark\\:data-checked\\:bg-primary:is(.dark *):where([data-state=checked]),.tw\\:dark\\:data-checked\\:bg-primary:is(.dark *):where([data-checked]:not([data-checked=false])){background-color:var(--primary)}.tw\\:dark\\:data-checked\\:bg-primary-foreground:is(.dark *):where([data-state=checked]),.tw\\:dark\\:data-checked\\:bg-primary-foreground:is(.dark *):where([data-checked]:not([data-checked=false])){background-color:var(--primary-foreground)}.tw\\:data-unchecked\\:bg-input:where([data-state=unchecked]),.tw\\:data-unchecked\\:bg-input:where([data-unchecked]:not([data-unchecked=false])){background-color:var(--input)}.tw\\:group-data-\\[size\\=default\\]\\/switch\\:data-unchecked\\:translate-x-0:is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-state=unchecked]),.tw\\:group-data-\\[size\\=default\\]\\/switch\\:data-unchecked\\:translate-x-0:is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-unchecked]:not([data-unchecked=false])),.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:data-unchecked\\:translate-x-0:is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-state=unchecked]),.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:data-unchecked\\:translate-x-0:is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-unchecked]:not([data-unchecked=false])),.tw\\:rtl\\:group-data-\\[size\\=default\\]\\/switch\\:data-unchecked\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-state=unchecked]),.tw\\:rtl\\:group-data-\\[size\\=default\\]\\/switch\\:data-unchecked\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-unchecked]:not([data-unchecked=false])),.tw\\:rtl\\:group-data-\\[size\\=sm\\]\\/switch\\:data-unchecked\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-state=unchecked]),.tw\\:rtl\\:group-data-\\[size\\=sm\\]\\/switch\\:data-unchecked\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-unchecked]:not([data-unchecked=false])){--tw-translate-x:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:dark\\:data-unchecked\\:bg-foreground:is(.dark *):where([data-state=unchecked]),.tw\\:dark\\:data-unchecked\\:bg-foreground:is(.dark *):where([data-unchecked]:not([data-unchecked=false])){background-color:var(--foreground)}.tw\\:dark\\:data-unchecked\\:bg-input\\/80:is(.dark *):where([data-state=unchecked]),.tw\\:dark\\:data-unchecked\\:bg-input\\/80:is(.dark *):where([data-unchecked]:not([data-unchecked=false])){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:data-unchecked\\:bg-input\\/80:is(.dark *):where([data-state=unchecked]),.tw\\:dark\\:data-unchecked\\:bg-input\\/80:is(.dark *):where([data-unchecked]:not([data-unchecked=false])){background-color:color-mix(in oklab, var(--input) 80%, transparent)}}.tw\\:data-selected\\:bg-muted:where([data-selected=true]){background-color:var(--muted)}.tw\\:data-selected\\:text-foreground:where([data-selected=true]){color:var(--foreground)}.tw\\:data-disabled\\:pointer-events-none:where([data-disabled=true]),.tw\\:data-disabled\\:pointer-events-none:where([data-disabled]:not([data-disabled=false])){pointer-events:none}.tw\\:data-disabled\\:cursor-not-allowed:where([data-disabled=true]),.tw\\:data-disabled\\:cursor-not-allowed:where([data-disabled]:not([data-disabled=false])){cursor:not-allowed}.tw\\:data-disabled\\:opacity-50:where([data-disabled=true]),.tw\\:data-disabled\\:opacity-50:where([data-disabled]:not([data-disabled=false])){opacity:.5}.tw\\:data-active\\:bg-background:where([data-state=active]),.tw\\:data-active\\:bg-background:where([data-active]:not([data-active=false])){background-color:var(--background)}.tw\\:data-active\\:bg-sidebar-accent:where([data-state=active]),.tw\\:data-active\\:bg-sidebar-accent:where([data-active]:not([data-active=false])){background-color:var(--sidebar-accent)}.tw\\:data-active\\:font-medium:where([data-state=active]),.tw\\:data-active\\:font-medium:where([data-active]:not([data-active=false])){--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}.tw\\:data-active\\:text-foreground:where([data-state=active]),.tw\\:data-active\\:text-foreground:where([data-active]:not([data-active=false])){color:var(--foreground)}.tw\\:data-active\\:text-sidebar-accent-foreground:where([data-state=active]),.tw\\:data-active\\:text-sidebar-accent-foreground:where([data-active]:not([data-active=false])){color:var(--sidebar-accent-foreground)}.tw\\:group-data-\\[variant\\=default\\]\\/tabs-list\\:data-active\\:shadow-sm:is(:where(.tw\\:group\\/tabs-list)[data-variant=default] *):where([data-state=active]),.tw\\:group-data-\\[variant\\=default\\]\\/tabs-list\\:data-active\\:shadow-sm:is(:where(.tw\\:group\\/tabs-list)[data-variant=default] *):where([data-active]:not([data-active=false])){--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:bg-transparent:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:bg-transparent:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false])){background-color:#0000}.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:shadow-none:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:shadow-none:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false])){--tw-shadow:0 0 #0000;box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}:is(.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:after\\:opacity-100:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:after\\:opacity-100:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false]))):after{content:var(--tw-content);opacity:1}.tw\\:dark\\:data-active\\:border-input:is(.dark *):where([data-state=active]),.tw\\:dark\\:data-active\\:border-input:is(.dark *):where([data-active]:not([data-active=false])){border-color:var(--input)}.tw\\:dark\\:data-active\\:bg-input\\/30:is(.dark *):where([data-state=active]),.tw\\:dark\\:data-active\\:bg-input\\/30:is(.dark *):where([data-active]:not([data-active=false])){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:data-active\\:bg-input\\/30:is(.dark *):where([data-state=active]),.tw\\:dark\\:data-active\\:bg-input\\/30:is(.dark *):where([data-active]:not([data-active=false])){background-color:color-mix(in oklab, var(--input) 30%, transparent)}}.tw\\:dark\\:data-active\\:text-foreground:is(.dark *):where([data-state=active]),.tw\\:dark\\:data-active\\:text-foreground:is(.dark *):where([data-active]:not([data-active=false])){color:var(--foreground)}.tw\\:dark\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:border-transparent:is(.dark *):is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:dark\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:border-transparent:is(.dark *):is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false])){border-color:#0000}.tw\\:dark\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:bg-transparent:is(.dark *):is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:dark\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:bg-transparent:is(.dark *):is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false])){background-color:#0000}.tw\\:data-horizontal\\:mx-px:where([data-orientation=horizontal]){margin-inline:1px}.tw\\:data-horizontal\\:h-1:where([data-orientation=horizontal]){height:calc(calc(var(--spacing)) * 1)}.tw\\:data-horizontal\\:h-full:where([data-orientation=horizontal]){height:100%}.tw\\:data-horizontal\\:h-px:where([data-orientation=horizontal]){height:1px}.tw\\:data-horizontal\\:w-auto:where([data-orientation=horizontal]){width:auto}.tw\\:data-horizontal\\:w-full:where([data-orientation=horizontal]){width:100%}.tw\\:data-horizontal\\:flex-col:where([data-orientation=horizontal]){flex-direction:column}.tw\\:data-vertical\\:my-px:where([data-orientation=vertical]){margin-block:1px}.tw\\:data-vertical\\:h-auto:where([data-orientation=vertical]){height:auto}.tw\\:data-vertical\\:h-full:where([data-orientation=vertical]){height:100%}.tw\\:data-vertical\\:min-h-40:where([data-orientation=vertical]){min-height:calc(calc(var(--spacing)) * 40)}.tw\\:data-vertical\\:w-1:where([data-orientation=vertical]){width:calc(calc(var(--spacing)) * 1)}.tw\\:data-vertical\\:w-auto:where([data-orientation=vertical]){width:auto}.tw\\:data-vertical\\:w-full:where([data-orientation=vertical]){width:100%}.tw\\:data-vertical\\:w-px:where([data-orientation=vertical]){width:1px}.tw\\:data-vertical\\:flex-col:where([data-orientation=vertical]){flex-direction:column}.tw\\:data-vertical\\:items-stretch:where([data-orientation=vertical]){align-items:stretch}.tw\\:data-vertical\\:self-stretch:where([data-orientation=vertical]){align-self:stretch}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:mt-0 [data-lexical-editor=true]>blockquote{margin-top:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:border-s-0 [data-lexical-editor=true]>blockquote{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:ps-0 [data-lexical-editor=true]>blockquote{padding-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:font-normal [data-lexical-editor=true]>blockquote{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:text-foreground [data-lexical-editor=true]>blockquote{color:var(--foreground)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:not-italic [data-lexical-editor=true]>blockquote{font-style:normal}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:mt-0 [data-lexical-editor=\\"true\\"]>blockquote{margin-top:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:border-s-0 [data-lexical-editor=\\"true\\"]>blockquote{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:ps-0 [data-lexical-editor=\\"true\\"]>blockquote{padding-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:font-normal [data-lexical-editor=\\"true\\"]>blockquote{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:text-foreground [data-lexical-editor=\\"true\\"]>blockquote{color:var(--foreground)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:not-italic [data-lexical-editor=\\"true\\"]>blockquote{font-style:normal}.tw\\:\\[\\&_a\\]\\:underline a{text-decoration-line:underline}.tw\\:\\[\\&_a\\]\\:underline-offset-3 a{text-underline-offset:3px}@media (hover:hover){.tw\\:\\[\\&_a\\]\\:hover\\:text-foreground a:hover{color:var(--foreground)}}.tw\\:\\[\\&_p\\]\\:my-0 p{margin-block:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_p\\:not\\(\\:last-child\\)\\]\\:mb-4 p:not(:last-child){margin-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&_s\\]\\:text-destructive s{color:var(--destructive)}.tw\\:\\[\\&_s\\]\\:line-through s{text-decoration-line:line-through}.tw\\:\\[\\&_svg\\]\\:pointer-events-none svg{pointer-events:none}.tw\\:\\[\\&_svg\\]\\:size-4 svg{width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&_svg\\]\\:shrink-0 svg{flex-shrink:0}.tw\\:\\[\\&_svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-3 svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:\\[\\&_svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-3\\.5 svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 3.5);height:calc(calc(var(--spacing)) * 3.5)}.tw\\:\\[\\&_svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-4 svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&_tr\\]\\:border-b tr{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}.tw\\:\\[\\&_tr\\:last-child\\]\\:border-0 tr:last-child{border-style:var(--tw-border-style);border-width:0}.tw\\:\\[\\&_u\\]\\:font-semibold u{--tw-font-weight:var(--tw-font-weight-semibold);font-weight:var(--tw-font-weight-semibold)}.tw\\:\\[\\&_u\\]\\:text-success-foreground u{color:var(--success-foreground)}.tw\\:\\[\\&_u\\]\\:no-underline u{text-decoration-line:none}.tw\\:\\[\\&\\:has\\(\\[role\\=checkbox\\]\\)\\]\\:pe-0:has([role=checkbox]){padding-inline-end:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\.border-b\\]\\:pb-2.border-b{padding-bottom:calc(calc(var(--spacing)) * 2)}.tw\\:\\[\\.border-b\\]\\:pb-4.border-b{padding-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[size\\=sm\\]\\/card\\:\\[\\.border-b\\]\\:pb-3:is(:where(.tw\\:group\\/card)[data-size=sm] *).border-b{padding-bottom:calc(calc(var(--spacing)) * 3)}.tw\\:\\[\\.border-t\\]\\:pt-2.border-t{padding-top:calc(calc(var(--spacing)) * 2)}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:px-2 *)[cmdk-group-heading]{padding-inline:calc(calc(var(--spacing)) * 2)}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:py-1\\.5 *)[cmdk-group-heading]{padding-block:calc(calc(var(--spacing)) * 1.5)}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:text-xs *)[cmdk-group-heading]{font-size:var(--tw-text-xs);line-height:var(--tw-leading,var(--tw-text-xs--line-height))}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:font-medium *)[cmdk-group-heading]{--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:text-muted-foreground *)[cmdk-group-heading]{color:var(--muted-foreground)}:is(.tw\\:\\*\\:\\[a\\]\\:underline>*):is(a){text-decoration-line:underline}:is(.tw\\:\\*\\:\\[a\\]\\:underline-offset-3>*):is(a){text-underline-offset:3px}@media (hover:hover){.tw\\:\\[a\\]\\:hover\\:bg-destructive\\/20:is(a):hover{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:\\[a\\]\\:hover\\:bg-destructive\\/20:is(a):hover{background-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:\\[a\\]\\:hover\\:bg-muted:is(a):hover{background-color:var(--muted)}.tw\\:\\[a\\]\\:hover\\:bg-primary\\/80:is(a):hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:\\[a\\]\\:hover\\:bg-primary\\/80:is(a):hover{background-color:color-mix(in oklab, var(--primary) 80%, transparent)}}.tw\\:\\[a\\]\\:hover\\:bg-secondary\\/80:is(a):hover{background-color:var(--secondary)}@supports (color:color-mix(in lab, red, red)){.tw\\:\\[a\\]\\:hover\\:bg-secondary\\/80:is(a):hover{background-color:color-mix(in oklab, var(--secondary) 80%, transparent)}}.tw\\:\\[a\\]\\:hover\\:text-muted-foreground:is(a):hover{color:var(--muted-foreground)}:is(.tw\\:\\*\\:\\[a\\]\\:hover\\:text-foreground>*):is(a):hover{color:var(--foreground)}}:is(.tw\\:\\*\\:\\[img\\]\\:row-span-2>*):is(img){grid-row:span 2/span 2}:is(.tw\\:\\*\\:\\[img\\]\\:translate-y-0\\.5>*):is(img){--tw-translate-y:calc(calc(var(--spacing)) * .5);translate:var(--tw-translate-x) var(--tw-translate-y)}:is(.tw\\:\\*\\:\\[img\\]\\:text-current>*):is(img){color:currentColor}:is(.tw\\:\\*\\:\\[img\\:first-child\\]\\:rounded-t-xl>*):is(img:first-child){border-top-left-radius:calc(var(--radius) * 1.4);border-top-right-radius:calc(var(--radius) * 1.4)}:is(.tw\\:\\*\\:\\[img\\:last-child\\]\\:rounded-b-xl>*):is(img:last-child){border-bottom-right-radius:calc(var(--radius) * 1.4);border-bottom-left-radius:calc(var(--radius) * 1.4)}:is(.tw\\:\\*\\:\\[img\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-4>*):is(img:not([class*=size-])){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}:is(.tw\\:\\*\\:\\[span\\]\\:last\\:flex>*):is(span):last-child{display:flex}:is(.tw\\:\\*\\:\\[span\\]\\:last\\:items-center>*):is(span):last-child{align-items:center}:is(.tw\\:\\*\\:\\[span\\]\\:last\\:gap-2>*):is(span):last-child{gap:calc(calc(var(--spacing)) * 2)}:is(.tw\\:\\*\\:\\[svg\\]\\:row-span-2>*):is(svg){grid-row:span 2/span 2}:is(.tw\\:\\*\\:\\[svg\\]\\:translate-y-0\\.5>*):is(svg){--tw-translate-y:calc(calc(var(--spacing)) * .5);translate:var(--tw-translate-x) var(--tw-translate-y)}:is(.tw\\:\\*\\:\\[svg\\]\\:text-current>*):is(svg){color:currentColor}:is(.tw\\:focus\\:\\*\\:\\[svg\\]\\:text-accent-foreground:focus>*):is(svg){color:var(--accent-foreground)}:is(.tw\\:data-\\[variant\\=destructive\\]\\:\\*\\:\\[svg\\]\\:text-destructive[data-variant=destructive]>*):is(svg){color:var(--destructive)}:is(.tw\\:data-\\[variant\\=destructive\\]\\:\\*\\:\\[svg\\]\\:text-destructive\\![data-variant=destructive]>*):is(svg){color:var(--destructive)!important}:is(.tw\\:data-selected\\:\\*\\:\\[svg\\]\\:text-foreground:where([data-selected=true])>*):is(svg){color:var(--foreground)}:is(.tw\\:\\*\\:\\[svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-4>*):is(svg:not([class*=size-])){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:rounded-s-none>:not(:first-child){border-start-start-radius:0;border-end-start-radius:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:rounded-t-none>:not(:first-child){border-top-left-radius:0;border-top-right-radius:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:border-s-0>:not(:first-child){border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:border-t-0>:not(:first-child){border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:last-child\\)\\]\\:rounded-e-none>:not(:last-child){border-start-end-radius:0;border-end-end-radius:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:last-child\\)\\]\\:rounded-b-none>:not(:last-child){border-bottom-right-radius:0;border-bottom-left-radius:0}.tw\\:has-\\[select\\[aria-hidden\\=true\\]\\:last-child\\]\\:\\[\\&\\>\\[data-slot\\=select-trigger\\]\\:last-of-type\\]\\:rounded-e-lg:has(:is(select[aria-hidden=true]:last-child))>[data-slot=select-trigger]:last-of-type{border-start-end-radius:var(--radius);border-end-end-radius:var(--radius)}.tw\\:\\[\\&\\>\\[data-slot\\=select-trigger\\]\\:not\\(\\[class\\*\\=w-\\]\\)\\]\\:w-fit>[data-slot=select-trigger]:not([class*=w-]){width:fit-content}.tw\\:\\[\\&\\>\\[data-slot\\]\\:not\\(\\:has\\(\\~\\[data-slot\\]\\)\\)\\]\\:rounded-e-lg\\!>[data-slot]:not(:has(~[data-slot])){border-start-end-radius:var(--radius)!important;border-end-end-radius:var(--radius)!important}.tw\\:\\[\\&\\>\\[data-slot\\]\\:not\\(\\:has\\(\\~\\[data-slot\\]\\)\\)\\]\\:rounded-b-lg\\!>[data-slot]:not(:has(~[data-slot])){border-bottom-right-radius:var(--radius)!important;border-bottom-left-radius:var(--radius)!important}.tw\\:\\[\\&\\>blockquote\\]\\:my-0>blockquote{margin-block:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&\\>blockquote\\]\\:border-s-0>blockquote{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&\\>blockquote\\]\\:p-0>blockquote{padding:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&\\>blockquote\\]\\:ps-0>blockquote{padding-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&\\>blockquote\\]\\:font-normal>blockquote{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:\\[\\&\\>blockquote\\]\\:text-foreground>blockquote{color:var(--foreground)}.tw\\:\\[\\&\\>blockquote\\]\\:not-italic>blockquote{font-style:normal}.tw\\:\\[\\&\\>input\\]\\:flex-1>input{flex:1}.tw\\:has-\\[\\>\\[data-align\\=block-end\\]\\]\\:\\[\\&\\>input\\]\\:pt-3:has(>[data-align=block-end])>input{padding-top:calc(calc(var(--spacing)) * 3)}.tw\\:has-\\[\\>\\[data-align\\=block-start\\]\\]\\:\\[\\&\\>input\\]\\:pb-3:has(>[data-align=block-start])>input{padding-bottom:calc(calc(var(--spacing)) * 3)}.tw\\:has-\\[\\>\\[data-align\\=inline-end\\]\\]\\:\\[\\&\\>input\\]\\:pe-1\\.5:has(>[data-align=inline-end])>input{padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-\\[\\>\\[data-align\\=inline-start\\]\\]\\:\\[\\&\\>input\\]\\:ps-1\\.5:has(>[data-align=inline-start])>input{padding-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:\\[\\&\\>kbd\\]\\:rounded-\\[calc\\(var\\(--radius\\)-5px\\)\\]>kbd{border-radius:calc(var(--radius) - 5px)}.tw\\:\\[\\&\\>li\\]\\:mt-2>li{margin-top:calc(calc(var(--spacing)) * 2)}.tw\\:\\[\\&\\>span\\:last-child\\]\\:truncate>span:last-child{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.tw\\:\\[\\&\\>svg\\]\\:pointer-events-none>svg{pointer-events:none}.tw\\:\\[\\&\\>svg\\]\\:size-3\\!>svg{width:calc(calc(var(--spacing)) * 3)!important;height:calc(calc(var(--spacing)) * 3)!important}.tw\\:\\[\\&\\>svg\\]\\:size-3\\.5>svg{width:calc(calc(var(--spacing)) * 3.5);height:calc(calc(var(--spacing)) * 3.5)}.tw\\:\\[\\&\\>svg\\]\\:size-4>svg{width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&\\>svg\\]\\:shrink-0>svg{flex-shrink:0}.tw\\:\\[\\&\\>svg\\]\\:text-sidebar-accent-foreground>svg{color:var(--sidebar-accent-foreground)}.tw\\:group-has-data-\\[size\\=lg\\]\\/avatar-group\\:\\[\\&\\>svg\\]\\:size-5:is(:where(.tw\\:group\\/avatar-group):has([data-size=lg]) *)>svg{width:calc(calc(var(--spacing)) * 5);height:calc(calc(var(--spacing)) * 5)}.tw\\:group-has-data-\\[size\\=sm\\]\\/avatar-group\\:\\[\\&\\>svg\\]\\:size-3:is(:where(.tw\\:group\\/avatar-group):has([data-size=sm]) *)>svg{width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[size\\=default\\]\\/avatar\\:\\[\\&\\>svg\\]\\:size-2:is(:where(.tw\\:group\\/avatar)[data-size=default] *)>svg,.tw\\:group-data-\\[size\\=lg\\]\\/avatar\\:\\[\\&\\>svg\\]\\:size-2:is(:where(.tw\\:group\\/avatar)[data-size=lg] *)>svg{width:calc(calc(var(--spacing)) * 2);height:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[size\\=sm\\]\\/avatar\\:\\[\\&\\>svg\\]\\:hidden:is(:where(.tw\\:group\\/avatar)[data-size=sm] *)>svg{display:none}.tw\\:\\[\\&\\>svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-3\\.5>svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 3.5);height:calc(calc(var(--spacing)) * 3.5)}.tw\\:\\[\\&\\>svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-4>svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&\\>tr\\]\\:last\\:border-b-0>tr:last-child{border-bottom-style:var(--tw-border-style);border-bottom-width:0}.tw\\:\\[\\&\\[align\\=center\\]\\]\\:text-center[align=center]{text-align:center}.tw\\:\\[\\&\\[align\\=right\\]\\]\\:text-right[align=right]{text-align:right}.tw\\:\\[\\&\\[aria-orientation\\=horizontal\\]\\>div\\]\\:rotate-90[aria-orientation=horizontal]>div{rotate:90deg}[data-side=primary][data-collapsible=offcanvas] .tw\\:\\[\\[data-side\\=primary\\]\\[data-collapsible\\=offcanvas\\]_\\&\\]\\:-end-2{inset-inline-end:calc(calc(var(--spacing)) * -2)}[data-side=primary][data-state=collapsed] .tw\\:\\[\\[data-side\\=primary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-e-resize{cursor:e-resize}[data-side=primary][data-state=collapsed] .tw\\:rtl\\:\\[\\[data-side\\=primary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-w-resize:where(:dir(rtl),[dir=rtl],[dir=rtl] *){cursor:w-resize}[data-side=secondary][data-collapsible=offcanvas] .tw\\:\\[\\[data-side\\=secondary\\]\\[data-collapsible\\=offcanvas\\]_\\&\\]\\:-start-2{inset-inline-start:calc(calc(var(--spacing)) * -2)}[data-side=secondary][data-state=collapsed] .tw\\:\\[\\[data-side\\=secondary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-w-resize{cursor:w-resize}[data-side=secondary][data-state=collapsed] .tw\\:rtl\\:\\[\\[data-side\\=secondary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-e-resize:where(:dir(rtl),[dir=rtl],[dir=rtl] *){cursor:e-resize}}@property --tw-animation-delay{syntax:"*";inherits:false;initial-value:0s}@property --tw-animation-direction{syntax:"*";inherits:false;initial-value:normal}@property --tw-animation-duration{syntax:"*";inherits:false}@property --tw-animation-fill-mode{syntax:"*";inherits:false;initial-value:none}@property --tw-animation-iteration-count{syntax:"*";inherits:false;initial-value:1}@property --tw-enter-blur{syntax:"*";inherits:false;initial-value:0}@property --tw-enter-opacity{syntax:"*";inherits:false;initial-value:1}@property --tw-enter-rotate{syntax:"*";inherits:false;initial-value:0}@property --tw-enter-scale{syntax:"*";inherits:false;initial-value:1}@property --tw-enter-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-enter-translate-y{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-blur{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-opacity{syntax:"*";inherits:false;initial-value:1}@property --tw-exit-rotate{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-scale{syntax:"*";inherits:false;initial-value:1}@property --tw-exit-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-translate-y{syntax:"*";inherits:false;initial-value:0}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-cyrillic-ext-wght-normal.woff2)format("woff2-variations");unicode-range:U+460-52F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-cyrillic-wght-normal.woff2)format("woff2-variations");unicode-range:U+301,U+400-45F,U+490-491,U+4B0-4B1,U+2116}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-greek-wght-normal.woff2)format("woff2-variations");unicode-range:U+370-377,U+37A-37F,U+384-38A,U+38C,U+38E-3A1,U+3A3-3FF}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-vietnamese-wght-normal.woff2)format("woff2-variations");unicode-range:U+102-103,U+110-111,U+128-129,U+168-169,U+1A0-1A1,U+1AF-1B0,U+300-301,U+303-304,U+308-309,U+323,U+329,U+1EA0-1EF9,U+20AB}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-latin-ext-wght-normal.woff2)format("woff2-variations");unicode-range:U+100-2BA,U+2BD-2C5,U+2C7-2CC,U+2CE-2D7,U+2DD-2FF,U+304,U+308,U+329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-latin-wght-normal.woff2)format("woff2-variations");unicode-range:U+??,U+131,U+152-153,U+2BB-2BC,U+2C6,U+2DA,U+2DC,U+304,U+308,U+329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}.light,:root{--radius:.625rem;--spacing:.25rem;--background:oklch(100% 0 0);--foreground:oklch(13.71% .036 258.53);--card:oklch(100% 0 0);--card-foreground:oklch(13.71% .036 258.53);--popover:oklch(98.43% .0018 248.56);--popover-foreground:oklch(13.71% .036 258.53);--primary:oklch(20.79% .0399 265.73);--primary-foreground:oklch(98.38% .0036 248.23);--secondary:oklch(95.89% .011 248.06);--secondary-foreground:oklch(20.79% .0399 265.73);--muted:oklch(95.89% .011 248.06);--muted-foreground:oklch(55.47% .0408 257.45);--accent:oklch(95.89% .011 248.06);--accent-foreground:oklch(20.79% .0399 265.73);--destructive:oklch(63.69% .2077 25.32);--destructive-foreground:oklch(98.38% .0036 248.23);--success-foreground:oklch(62.7% .194 149.214);--diff-deleted:oklch(57.7% .245 27.325);--warning:oklch(84% .16 84);--warning-foreground:oklch(28% .07 46);--border:oklch(92.9% .0127 255.58);--input:oklch(92.9% .0127 255.58);--ring:oklch(13.71% .036 258.53);--chart-1:oklch(64.6% .222 41.116);--chart-2:oklch(60% .118 184.704);--chart-3:oklch(39.8% .07 227.392);--chart-4:oklch(82.8% .189 84.429);--chart-5:oklch(76.9% .188 70.08);--sidebar:oklch(98.43% .0018 248.56);--sidebar-foreground:oklch(13.71% .036 258.53);--sidebar-primary:oklch(20.79% .0399 265.73);--sidebar-primary-foreground:oklch(98.38% .0036 248.23);--sidebar-accent:oklch(95.89% .011 248.06);--sidebar-accent-foreground:oklch(20.79% .0399 265.73);--sidebar-border:oklch(92.9% .0127 255.58);--sidebar-ring:oklch(13.71% .036 258.53)}.dark{--background:oklch(13.71% .036 258.53);--foreground:oklch(98.38% .0036 248.23);--card:oklch(13.71% .036 258.53);--card-foreground:oklch(98.38% .0036 248.23);--popover:oklch(13.71% .036 258.53);--popover-foreground:oklch(98.38% .0036 248.23);--primary:oklch(98.38% .0036 248.23);--primary-foreground:oklch(20.79% .0399 265.73);--secondary:oklch(28% .037 259.98);--secondary-foreground:oklch(98.38% .0036 248.23);--muted:oklch(28% .037 259.98);--muted-foreground:oklch(71.07% .0351 256.8);--accent:oklch(28% .037 259.98);--accent-foreground:oklch(98.38% .0036 248.23);--destructive:oklch(39.6% .1331 25.71);--destructive-foreground:oklch(98.38% .0036 248.23);--success-foreground:oklch(79.2% .209 151.711);--diff-deleted:oklch(70.4% .191 22.216);--warning:oklch(41% .11 46);--warning-foreground:oklch(99% .02 95);--border:oklch(44.54% .0374 257.3);--input:oklch(44.54% .0374 257.3);--ring:oklch(86.88% .0199 252.89);--chart-1:oklch(48.8% .243 264.376);--chart-2:oklch(69.6% .17 162.48);--chart-3:oklch(76.9% .188 70.08);--chart-4:oklch(62.7% .265 303.9);--chart-5:oklch(64.5% .246 16.439);--sidebar:oklch(13.71% .036 258.53);--sidebar-foreground:oklch(71.07% .0351 256.8);--sidebar-primary:oklch(98.38% .0036 248.23);--sidebar-primary-foreground:oklch(20.79% .0399 265.73);--sidebar-accent:oklch(28% .037 259.98);--sidebar-accent-foreground:oklch(71.07% .0351 256.8);--sidebar-border:oklch(28% .037 259.98);--sidebar-ring:oklch(86.88% .0199 252.89)}.paratext-light{--background:oklch(100% 0 0);--foreground:oklch(15.3% .006 107.1);--card:oklch(100% 0 0);--card-foreground:oklch(15.3% .006 107.1);--popover:oklch(100% 0 0);--popover-foreground:oklch(15.3% .006 107.1);--primary:oklch(55.5% .163 48.998);--primary-foreground:oklch(98.7% .022 95.277);--secondary:oklch(96.7% .001 286.375);--secondary-foreground:oklch(21% .006 285.885);--muted:oklch(96.6% .005 106.5);--muted-foreground:oklch(58% .031 107.3);--accent:oklch(96.6% .005 106.5);--accent-foreground:oklch(22.8% .013 107.4);--destructive:oklch(57.7% .245 27.325);--destructive-foreground:oklch(98.38% .0036 248.23);--success-foreground:oklch(62.7% .194 149.214);--diff-deleted:oklch(57.7% .245 27.325);--warning:oklch(84% .16 84);--warning-foreground:oklch(28% .07 46);--border:oklch(93% .007 106.5);--input:oklch(93% .007 106.5);--ring:oklch(73.7% .021 106.9);--chart-1:oklch(88% .011 106.6);--chart-2:oklch(58% .031 107.3);--chart-3:oklch(46.6% .025 107.3);--chart-4:oklch(39.4% .023 107.4);--chart-5:oklch(28.6% .016 107.4);--sidebar:oklch(98.8% .003 106.5);--sidebar-foreground:oklch(15.3% .006 107.1);--sidebar-primary:oklch(66.6% .179 58.318);--sidebar-primary-foreground:oklch(98.7% .022 95.277);--sidebar-accent:oklch(96.6% .005 106.5);--sidebar-accent-foreground:oklch(22.8% .013 107.4);--sidebar-border:oklch(93% .007 106.5);--sidebar-ring:oklch(73.7% .021 106.9)}.paratext-dark{--background:oklch(15.3% .006 107.1);--foreground:oklch(98.8% .003 106.5);--card:oklch(22.8% .013 107.4);--card-foreground:oklch(98.8% .003 106.5);--popover:oklch(22.8% .013 107.4);--popover-foreground:oklch(98.8% .003 106.5);--primary:oklch(47.3% .137 46.201);--primary-foreground:oklch(98.7% .022 95.277);--secondary:oklch(27.4% .006 286.033);--secondary-foreground:oklch(98.5% 0 0);--muted:oklch(28.6% .016 107.4);--muted-foreground:oklch(73.7% .021 106.9);--accent:oklch(28.6% .016 107.4);--accent-foreground:oklch(98.8% .003 106.5);--destructive:oklch(70.4% .191 22.216);--destructive-foreground:oklch(98.38% .0036 248.23);--success-foreground:oklch(79.2% .209 151.711);--diff-deleted:oklch(70.4% .191 22.216);--warning:oklch(41% .11 46);--warning-foreground:oklch(99% .02 95);--border:oklch(100% 0 0/.1);--input:oklch(100% 0 0/.15);--ring:oklch(58% .031 107.3);--chart-1:oklch(88% .011 106.6);--chart-2:oklch(58% .031 107.3);--chart-3:oklch(46.6% .025 107.3);--chart-4:oklch(39.4% .023 107.4);--chart-5:oklch(28.6% .016 107.4);--sidebar:oklch(22.8% .013 107.4);--sidebar-foreground:oklch(98.8% .003 106.5);--sidebar-primary:oklch(76.9% .188 70.08);--sidebar-primary-foreground:oklch(27.9% .077 45.635);--sidebar-accent:oklch(28.6% .016 107.4);--sidebar-accent-foreground:oklch(98.8% .003 106.5);--sidebar-border:oklch(100% 0 0/.1);--sidebar-ring:oklch(58% .031 107.3)}@property --tw-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-y{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-z{syntax:"*";inherits:false;initial-value:0}@property --tw-rotate-x{syntax:"*";inherits:false}@property --tw-rotate-y{syntax:"*";inherits:false}@property --tw-rotate-z{syntax:"*";inherits:false}@property --tw-skew-x{syntax:"*";inherits:false}@property --tw-skew-y{syntax:"*";inherits:false}@property --tw-space-y-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-space-x-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-divide-x-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-border-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-divide-y-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-leading{syntax:"*";inherits:false}@property --tw-font-weight{syntax:"*";inherits:false}@property --tw-tracking{syntax:"*";inherits:false}@property --tw-ordinal{syntax:"*";inherits:false}@property --tw-slashed-zero{syntax:"*";inherits:false}@property --tw-numeric-figure{syntax:"*";inherits:false}@property --tw-numeric-spacing{syntax:"*";inherits:false}@property --tw-numeric-fraction{syntax:"*";inherits:false}@property --tw-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-shadow-color{syntax:"*";inherits:false}@property --tw-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-inset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-shadow-color{syntax:"*";inherits:false}@property --tw-inset-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-ring-color{syntax:"*";inherits:false}@property --tw-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-ring-color{syntax:"*";inherits:false}@property --tw-inset-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-ring-inset{syntax:"*";inherits:false}@property --tw-ring-offset-width{syntax:"<length>";inherits:false;initial-value:0}@property --tw-ring-offset-color{syntax:"*";inherits:false;initial-value:#fff}@property --tw-ring-offset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-blur{syntax:"*";inherits:false}@property --tw-brightness{syntax:"*";inherits:false}@property --tw-contrast{syntax:"*";inherits:false}@property --tw-grayscale{syntax:"*";inherits:false}@property --tw-hue-rotate{syntax:"*";inherits:false}@property --tw-invert{syntax:"*";inherits:false}@property --tw-opacity{syntax:"*";inherits:false}@property --tw-saturate{syntax:"*";inherits:false}@property --tw-sepia{syntax:"*";inherits:false}@property --tw-drop-shadow{syntax:"*";inherits:false}@property --tw-drop-shadow-color{syntax:"*";inherits:false}@property --tw-drop-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-drop-shadow-size{syntax:"*";inherits:false}@property --tw-duration{syntax:"*";inherits:false}@property --tw-ease{syntax:"*";inherits:false}@property --tw-content{syntax:"*";inherits:false;initial-value:""}@property --tw-backdrop-blur{syntax:"*";inherits:false}@property --tw-backdrop-brightness{syntax:"*";inherits:false}@property --tw-backdrop-contrast{syntax:"*";inherits:false}@property --tw-backdrop-grayscale{syntax:"*";inherits:false}@property --tw-backdrop-hue-rotate{syntax:"*";inherits:false}@property --tw-backdrop-invert{syntax:"*";inherits:false}@property --tw-backdrop-opacity{syntax:"*";inherits:false}@property --tw-backdrop-saturate{syntax:"*";inherits:false}@property --tw-backdrop-sepia{syntax:"*";inherits:false}@property --tw-outline-style{syntax:"*";inherits:false;initial-value:solid}@keyframes spin{to{transform:rotate(360deg)}}@keyframes pulse{50%{opacity:.5}}@keyframes enter{0%{opacity:var(--tw-enter-opacity,1);transform:translate3d(var(--tw-enter-translate-x,0),var(--tw-enter-translate-y,0),0)scale3d(var(--tw-enter-scale,1),var(--tw-enter-scale,1),var(--tw-enter-scale,1))rotate(var(--tw-enter-rotate,0));filter:blur(var(--tw-enter-blur,0))}}@keyframes exit{to{opacity:var(--tw-exit-opacity,1);transform:translate3d(var(--tw-exit-translate-x,0),var(--tw-exit-translate-y,0),0)scale3d(var(--tw-exit-scale,1),var(--tw-exit-scale,1),var(--tw-exit-scale,1))rotate(var(--tw-exit-rotate,0));filter:blur(var(--tw-exit-blur,0))}}
`, "after-all");
export {
  xh as Alert,
  kh as AlertDescription,
  yh as AlertTitle,
  Bd as Avatar,
  jd as AvatarFallback,
  fp as AvatarImage,
  op as BOOK_CHAPTER_CONTROL_STRING_KEYS,
  np as BOOK_SELECTOR_STRING_KEYS,
  Nr as Badge,
  pa as BookChapterControl,
  Va as BookSelectionMode,
  ip as BookSelector,
  Y as Button,
  Ga as ButtonGroup,
  pn as ButtonGroupSeparator,
  cg as ButtonGroupText,
  hi as CANCEL_ACCEPT_BUTTONS_STRING_KEYS,
  lp as COMMENT_EDITOR_STRING_KEYS,
  Pd as COMMENT_LIST_ELEMENT_ID,
  dp as COMMENT_LIST_STRING_KEYS,
  sp as CONFLICT_NOTE_STRING_KEYS,
  gi as CancelAcceptButtons,
  Vd as Card,
  Ld as CardContent,
  hp as CardDescription,
  gp as CardFooter,
  up as CardHeader,
  pp as CardTitle,
  xl as ChapterRangeSelector,
  _i as Checkbox,
  ph as CheckboxGroup,
  ku as Checklist,
  jo as ComboBox,
  Le as Command,
  ea as CommandEmpty,
  Te as CommandGroup,
  ta as CommandInput,
  ze as CommandItem,
  Be as CommandList,
  cp as CommentEditor,
  mp as CommentList,
  Kd as ConflictNoteCard,
  _h as ContextMenu,
  Oh as ContextMenuCheckboxItem,
  zh as ContextMenuContent,
  Ch as ContextMenuGroup,
  Rh as ContextMenuItem,
  Ih as ContextMenuLabel,
  Eh as ContextMenuPortal,
  Sh as ContextMenuRadioGroup,
  $h as ContextMenuRadioItem,
  Ah as ContextMenuSeparator,
  Ph as ContextMenuShortcut,
  Th as ContextMenuSub,
  Mh as ContextMenuSubContent,
  Dh as ContextMenuSubTrigger,
  Nh as ContextMenuTrigger,
  ew as DataTable,
  hh as DestructiveKeyConfirmation,
  Ca as Dialog,
  lg as DialogClose,
  Ea as DialogContent,
  dg as DialogDescription,
  yo as DialogFooter,
  Ta as DialogHeader,
  wg as DialogOverlay,
  ug as DialogPortal,
  Sa as DialogTitle,
  pg as DialogTrigger,
  gh as DisabledActionTooltip,
  Nu as DisabledTooltipWrapper,
  Vh as Drawer,
  Bh as DrawerClose,
  jh as DrawerContent,
  qh as DrawerDescription,
  Uh as DrawerFooter,
  Fh as DrawerHeader,
  Tu as DrawerOverlay,
  Eu as DrawerPortal,
  Kh as DrawerTitle,
  Lh as DrawerTrigger,
  je as DropdownMenu,
  $e as DropdownMenuCheckboxItem,
  Ue as DropdownMenuContent,
  hn as DropdownMenuGroup,
  Qe as DropdownMenuItem,
  ow as DropdownMenuItemType,
  Sr as DropdownMenuLabel,
  rs as DropdownMenuPortal,
  Gi as DropdownMenuRadioGroup,
  Hi as DropdownMenuRadioItem,
  er as DropdownMenuSeparator,
  hg as DropdownMenuShortcut,
  ts as DropdownMenuSub,
  as as DropdownMenuSubContent,
  es as DropdownMenuSubTrigger,
  Fe as DropdownMenuTrigger,
  rw as ERROR_DUMP_STRING_KEYS,
  yp as ERROR_POPOVER_STRING_KEYS,
  pw as EditorKeyboardShortcuts,
  mh as EmptyState,
  aw as ErrorDump,
  kp as ErrorPopover,
  Sp as FOOTNOTE_EDITOR_STRING_KEYS,
  Ep as Filter,
  _p as FilterDropdown,
  Cp as Footer,
  Tp as FootnoteEditor,
  Rw as FootnoteItem,
  zp as FootnoteList,
  wh as INTERFACE_LANGUAGE_PICKER_STRING_KEYS,
  Ap as INVENTORY_STRING_KEYS,
  ra as Input,
  uh as InterfaceLanguagePicker,
  Pp as Inventory,
  za as Kbd,
  gg as KbdGroup,
  zt as Label,
  bw as MARKER_MENU_STRING_KEYS,
  xp as MarkdownRenderer,
  kw as MarkerMenu,
  Np as MoreInfo,
  Yi as MultiSelectComboBox,
  sh as NavigationContentSearch,
  Pe as Popover,
  Xi as PopoverAnchor,
  Ve as PopoverContent,
  fg as PopoverDescription,
  mg as PopoverHeader,
  ca as PopoverPortalContainerProvider,
  vg as PopoverTitle,
  rr as PopoverTrigger,
  Gh as Progress,
  qa as RadioGroup,
  Gr as RadioGroupItem,
  pl as RecentSearches,
  bg as ResizableHandle,
  xg as ResizablePanel,
  yg as ResizablePanelGroup,
  fh as ResultsCard,
  Qp as SCOPE_SELECTOR_STRING_KEYS,
  nu as SELECT_BOOKS_STRING_KEYS,
  th as ScopeSelector,
  Zp as ScriptureResultsViewer,
  eh as ScrollGroupSelector,
  mn as SearchBar,
  pr as Select,
  ou as SelectBooks,
  ru as SelectBooksPicker,
  fr as SelectContent,
  Jd as SelectGroup,
  ue as SelectItem,
  vp as SelectLabel,
  Qd as SelectScrollDownButton,
  Zd as SelectScrollUpButton,
  bp as SelectSeparator,
  gr as SelectTrigger,
  hr as SelectValue,
  Cr as Separator,
  rh as SettingsList,
  oh as SettingsListHeader,
  ah as SettingsListItem,
  Yw as SettingsSidebar,
  Jp as SettingsSidebarContentSearch,
  jw as Sidebar,
  Uw as SidebarContent,
  Fp as SidebarFooter,
  nn as SidebarGroup,
  Kp as SidebarGroupAction,
  cn as SidebarGroupContent,
  sn as SidebarGroupLabel,
  jp as SidebarHeader,
  Bp as SidebarInput,
  Fw as SidebarInset,
  Kw as SidebarMenu,
  qp as SidebarMenuAction,
  Gp as SidebarMenuBadge,
  Hw as SidebarMenuButton,
  qw as SidebarMenuItem,
  Hp as SidebarMenuSkeleton,
  Yp as SidebarMenuSub,
  Xp as SidebarMenuSubButton,
  Wp as SidebarMenuSubItem,
  Bw as SidebarProvider,
  Lp as SidebarRail,
  Up as SidebarSeparator,
  Vp as SidebarTrigger,
  sr as Skeleton,
  Yh as Slider,
  Hh as Sonner,
  kg as Spinner,
  Wh as Switch,
  Fa as TabDropdownMenu,
  ih as TabFloatingMenu,
  nh as TabToolbar,
  Ya as Table,
  Xa as TableBody,
  _g as TableCaption,
  cr as TableCell,
  Ng as TableFooter,
  Hr as TableHead,
  Wa as TableHeader,
  Oe as TableRow,
  Xh as Tabs,
  Qh as TabsContent,
  Jh as TabsList,
  Zh as TabsTrigger,
  vh as TextField,
  rp as Textarea,
  un as ToggleGroup,
  Lr as ToggleGroupItem,
  lh as Toolbar,
  jt as Tooltip,
  Ut as TooltipContent,
  Bt as TooltipProvider,
  Ft as TooltipTrigger,
  ww as UNDO_REDO_BUTTONS_STRING_KEYS,
  dh as UiLanguageSelector,
  uw as UndoRedoButtons,
  Di as VerticalTabs,
  Oi as VerticalTabsContent,
  Mi as VerticalTabsList,
  su as VerticalTabsTrigger,
  bh as WizardStepper,
  ar as Z_INDEX_ABOVE_DOCK,
  Cg as Z_INDEX_FIRST_RUN,
  gn as Z_INDEX_FOOTNOTE_EDITOR,
  Eg as Z_INDEX_MODAL,
  Tg as Z_INDEX_MODAL_BACKDROP,
  Zi as Z_INDEX_OVERLAY,
  Sg as badgeVariants,
  zg as buttonGroupVariants,
  Rg as buttonVariants,
  ka as clearPaletteSessionIfCurrent,
  v as cn,
  iw as filterAndRankPaletteItems,
  Ip as getBookIdFromUSFM,
  wp as getCommentThreadElementId,
  ia as getInventoryHeader,
  Op as getLinesFromUSFM,
  lw as getMarkerPaletteClaimedKeys,
  $p as getNumberFromUSFM,
  Iw as getStatusForItem,
  ch as getToolbarOSReservedSpaceClassName,
  dw as handleMarkerPaletteSessionKeyDown,
  Dp as inventoryCountColumn,
  Rp as inventoryItemColumn,
  Mp as inventoryStatusColumn,
  Ha as isMacOs,
  Dg as isWindows,
  Nw as markerMenuItemToPaletteItem,
  Du as pickTabIconUrl,
  $g as sonner,
  tg as useEvent,
  eg as useEventAsync,
  og as useExtraValidMarkers,
  qi as useListbox,
  rg as usePromise,
  ap as useRecentSearches,
  sa as useSidebar,
  ag as useStylesheet,
  ng as useTabIconSelection,
  Mg as useTruncationTooltip,
  Ru as useViewVisibility
};
//# sourceMappingURL=index.js.map
