var Vi = Object.defineProperty;
var ji = (t, e, r) => e in t ? Vi(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var Vt = (t, e, r) => ji(t, typeof e != "symbol" ? e + "" : e, r);
import { c as m, g as Me, a as La, C as Ie, A as we, P as Pe, b as He, B as q, d as Ve, e as Ye, f as We, h as Ne, i as Bi, k as Li, j as Fi, E as Ui, l as Fa, r as ie, m as Ki, n as dn, o as Qr, p as Ua, L as Nt, D as _a, q as Na, s as Ca, t as Ea, T as Gt, u as Ka, v as Ht, w as Yt, x as Wt, y as wn, z as qa, F as Ke, G as yr, H as Ce, I as Ee, J as Te, S as kr, K as tr, M as qi, N as Cr, O as Ge, Q as Oe, R as $e, U as er, V as Ga, W as Ha, X as qr, Y as Ya, Z as un, _ as Gi, $ as Hi, a0 as Yi, a1 as bo, a2 as pn, a3 as ta, a4 as hn, a5 as Wi, a6 as Xi, a7 as Ji, a8 as Zi, a9 as gn, aa as Qi, ab as ia, ac as xo, ad as sa, ae as wr, af as ts, ag as es, ah as rs, ai as as, aj as os, ak as Er, al as Wa } from "./resizable-C-htIGp4.js";
import { am as qh, an as Gh, ao as Hh, ap as Yh, aq as Wh, ar as Xh, as as Jh, at as Zh, au as Qh, av as tg, aw as eg, ax as rg, ay as ag, az as og, aA as ng, aB as ig, aC as sg, aD as cg, aE as lg, aF as dg, aG as wg, aH as ug, aI as pg } from "./resizable-C-htIGp4.js";
import { jsx as a, jsxs as u, Fragment as dt } from "react/jsx-runtime";
import { Canon as kt } from "@sillsdev/scripture";
import { Check as or, Clock as yo, ChevronsLeft as ko, ChevronsRight as _o, ChevronLeft as Ta, ChevronRight as za, ArrowLeft as ns, ArrowRight as is, ChevronDown as nr, BoldIcon as ss, ItalicIcon as cs, X as Xa, AtSign as fn, Pencil as ls, Trash2 as ds, ArrowUp as mn, MoreHorizontal as ws, MailOpen as us, Mail as ps, ChevronUp as hs, FilterIcon as gs, ArrowLeftIcon as fs, ChevronLeftIcon as ms, ChevronRightIcon as vs, ArrowRightIcon as bs, Copy as vn, Filter as xs, User as ys, Link as ks, CircleHelp as _s, Undo as Ns, Redo as Cs, SquareX as bn, FunctionSquare as xn, SquareSigma as yn, Ban as Es, AlertCircle as Sa, CircleCheckIcon as Ts, CircleXIcon as zs, CircleHelpIcon as Ss, ArrowUpIcon as Rs, ArrowDownIcon as Ds, ScrollText as Ms, ChevronsUpDown as $s, MenuIcon as Os, Menu as As, EllipsisVertical as Is, MoreVertical as No } from "lucide-react";
import { Section as ht, getChaptersForBook as Ps, formatScrRef as ke, getSectionForBook as vr, formatRelativeDate as Vs, formatReplacementString as qe, sanitizeHtml as Ja, NumberFormat as js, formatBytes as Bs, getCurrentLocale as Ls, usfmMarkers as Vr, getFormatCallerFunction as Fs, deepEqual as Us, isString as Co, compareScrRefs as Ra, scrRefToBBBCCCVVV as ca, defaultScrRef as la, formatScrRefRange as Ks, getLocalizeKeyForScrollGroupId as Eo, collectUsjMarkers as qs } from "platform-bible-utils";
import Rt, { useRef as U, useMemo as I, useState as _, useCallback as L, useEffect as X, useImperativeHandle as Gs, useLayoutEffect as qt, createContext as Za, useContext as kn, Component as Hs, createElement as To, Suspense as Ys, forwardRef as _n, useId as zo, Fragment as Nn } from "react";
import { RadioGroup as Da, ToggleGroup as Cn, Avatar as Qa, Select as Bt, Checkbox as So, Slot as Tr, Tabs as ue, Menubar as be, ContextMenu as Dt, Progress as Ro, Slider as Mr, Switch as Do } from "radix-ui";
import { createEditor as En, $getRoot as Ae, $createParagraphNode as zr, $getSelection as Xt, HISTORY_MERGE_TAG as to, ParagraphNode as Tn, TextNode as zn, $getPreviousSelection as Ws, $isRangeSelection as me, $caretFromPoint as Xs, $getSiblingCaret as Sn, $getChildCaret as Js, $getAdjacentChildCaret as Zs, $isChildCaret as Qs, $normalizeCaret as tc, $setSelectionFromCaretRange as ec, $getCollapsedCaretRange as rc, $getCaretInDirection as Mo, $splitAtPointCaretNext as ac, $isTextPointCaret as oc, $findMatchingParent as Rn, $isElementNode as _r, mergeRegister as ze, getDOMTextNode as nc, isHTMLElement as ic, CLEAR_EDITOR_COMMAND as Dn, COMMAND_PRIORITY_EDITOR as eo, shallowMergeConfig as sc, defineExtension as se, safeCast as Xe, createState as cc, FORMAT_TEXT_COMMAND as Mn, $isNodeSelection as $n, COMMAND_PRIORITY_LOW as On, RootNode as lc, LineBreakNode as dc, TabNode as wc, $isEditorState as uc, createCommand as pc, CLICK_COMMAND as hc, isDOMNode as gc, $getNodeFromDOMNode as fc, $createNodeSelection as mc, $setSelection as vc, $getEditor as bc, DecoratorNode as Ma, $getState as xc, toggleTextFormatType as $o, TEXT_TYPE_TO_FORMAT as yc, $setState as kc, addClassNamesToElement as An, $create as _c, $getNodeByKey as Nc, removeClassNamesFromElement as Cc, KEY_TAB_COMMAND as Ec, $isBlockElementNode as Tc, $createRangeSelection as zc, $normalizeSelection__EXPERIMENTAL as Sc, OUTDENT_CONTENT_COMMAND as Rc, INDENT_CONTENT_COMMAND as Oo, INSERT_TAB_COMMAND as Dc, COMMAND_PRIORITY_CRITICAL as ro, $isDecoratorNode as Mc, $isParagraphNode as $c, $isTextNode as $a, SELECTION_CHANGE_COMMAND as In, $insertNodes as Oc } from "lexical";
import { HeadingNode as Ac, QuoteNode as Ic, registerRichText as Pc } from "@lexical/rich-text";
import { flushSync as Vc, createPortal as jc } from "react-dom";
import { $isTableSelection as Bc } from "@lexical/table";
import { cva as ea } from "class-variance-authority";
import { createHeadlessEditor as Pn } from "@lexical/headless";
import { $generateHtmlFromNodes as Lc, $generateNodesFromDOM as Fc } from "@lexical/html";
import { useReactTable as Vn, getFilteredRowModel as Uc, getSortedRowModel as jn, getPaginationRowModel as Kc, getCoreRowModel as Bn, flexRender as br, getGroupedRowModel as qc, getExpandedRowModel as Gc } from "@tanstack/react-table";
import { IconCheck as ra, IconChevronDown as Hc, IconChevronUp as Yc, IconSelector as Wc, IconLayoutSidebar as Xc, IconLayoutSidebarRight as Jc, IconChevronRight as Ln, IconLoader as Zc, IconAlertOctagon as Qc, IconAlertTriangle as tl, IconInfoCircle as el, IconCircleCheck as rl } from "@tabler/icons-react";
import al from "markdown-to-jsx";
import { GENERATOR_NOTE_CALLER as Oa, HIDDEN_NOTE_CALLER as Aa, getDefaultViewOptions as ol, isInsertEmbedOpOfType as $r, Editorial as nl, getMarkerMenuItems as il, defaultStyleInfo as sl } from "@eten-tech-foundation/platform-editor";
import { useHotkeys as cl } from "react-hotkeys-hook";
import { Drawer as je } from "vaul";
import { useTheme as ll } from "next-themes";
import { Toaster as dl } from "sonner";
import { toast as gg } from "sonner";
function Hu({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "textarea",
    {
      "data-slot": "textarea",
      className: m(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:flex tw:field-sizing-content tw:min-h-16 tw:w-full tw:rounded-lg tw:border tw:border-input tw:bg-transparent tw:px-2.5 tw:py-2 tw:text-base tw:transition-colors tw:outline-none tw:placeholder:text-muted-foreground tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:disabled:cursor-not-allowed tw:disabled:bg-input/50 tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:md:text-sm tw:dark:bg-input/30 tw:dark:disabled:bg-input/80 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40",
        t
      ),
      ...e
    }
  );
}
function Fn({
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
  const p = U(!1), h = () => {
    w || (p.current || o == null || o(e), setTimeout(() => {
      p.current = !1;
    }, 100));
  }, g = (v) => {
    if (w) {
      v.preventDefault();
      return;
    }
    p.current = !0, n ? n(v) : o == null || o(e);
  }, f = I(
    () => Me(e, d),
    [e, d]
  ), x = I(
    () => La(e, d),
    [e, d]
  );
  return /* @__PURE__ */ a(
    "div",
    {
      className: m(
        "tw:mx-1 tw:my-1 tw:border-b-0 tw:border-e-0 tw:border-s-2 tw:border-t-0 tw:border-solid",
        {
          "tw:border-s-red-200": i === ht.OT,
          "tw:border-s-purple-200": i === ht.NT,
          "tw:border-s-indigo-200": i === ht.DC,
          "tw:border-s-amber-200": i === ht.Extra
        }
      ),
      children: /* @__PURE__ */ u(
        Ie,
        {
          ref: t,
          value: l || `${e} ${kt.bookIdToEnglishName(e)}`,
          onSelect: h,
          onMouseDown: g,
          role: "option",
          "aria-selected": r,
          "aria-disabled": w || void 0,
          "aria-label": `${kt.bookIdToEnglishName(e)} (${e.toLocaleUpperCase()})`,
          disabled: w,
          className: m(s, w && "tw:cursor-not-allowed tw:opacity-50"),
          children: [
            c && /* @__PURE__ */ a(
              or,
              {
                className: m(
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
function Un(t, e, r) {
  return `${t} ${we[t]}${e ? ` ${La(t, e)} ${Me(t, e)}` : ""}`;
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
  const [w, p] = _(!1);
  if (t.length === 0)
    return;
  const h = (g) => {
    e(g), p(!1);
  };
  return /* @__PURE__ */ u(Pe, { open: w, onOpenChange: p, children: [
    /* @__PURE__ */ a(He, { asChild: !0, children: /* @__PURE__ */ a(
      q,
      {
        variant: l,
        size: "icon",
        className: d,
        "aria-label": n,
        children: /* @__PURE__ */ a(yo, { className: "tw:h-4 tw:w-4" })
      }
    ) }),
    /* @__PURE__ */ a(Ve, { id: s, className: "tw:w-[300px] tw:p-0", align: "start", children: /* @__PURE__ */ a(Ye, { children: /* @__PURE__ */ a(We, { children: /* @__PURE__ */ a(Ne, { heading: i, children: t.map((g) => /* @__PURE__ */ u(
      Ie,
      {
        onSelect: () => h(g),
        className: m("tw:flex tw:items-center", c),
        children: [
          /* @__PURE__ */ a(yo, { className: "tw:mr-2 tw:h-4 tw:w-4 tw:opacity-50" }),
          /* @__PURE__ */ a("span", { children: r(g) })
        ]
      },
      o(g)
    )) }) }) }) })
  ] });
}
function Yu(t, e, r = (n, i) => n === i, o = 15) {
  return (n) => {
    const i = t.filter(
      (c) => !r(c, n)
    ), s = [n, ...i.slice(0, o - 1)];
    e(s);
  };
}
function Or(t, e) {
  return !e || e.book === t.book && e.chapterNum === t.chapterNum && e.verseNum === t.verseNum;
}
function ul(t, e, r, o) {
  const n = I(
    () => Bi(t, e),
    [t, e]
  ), i = I(
    () => Li(t, e),
    [t, e]
  ), s = I(
    () => Fi(t, e),
    [t, e]
  ), c = I(
    () => Ui(t, e),
    [t, e]
  ), d = L(
    (l) => {
      l && o(l);
    },
    [o]
  );
  return I(() => [
    {
      onClick: () => d(n),
      disabled: Or(t, n),
      title: "Previous chapter",
      icon: r === "ltr" ? ko : _o
    },
    {
      onClick: () => d(s),
      disabled: Or(t, s),
      title: "Previous verse",
      icon: r === "ltr" ? Ta : za
    },
    {
      onClick: () => d(c),
      disabled: Or(t, c),
      title: "Next verse",
      icon: r === "ltr" ? za : Ta
    },
    {
      onClick: () => d(i),
      disabled: Or(t, i),
      title: "Next chapter",
      icon: r === "ltr" ? _o : ko
    }
  ], [
    t,
    r,
    d,
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
}, pl = [
  jr.BOOK_ONLY,
  jr.BOOK_CHAPTER,
  jr.BOOK_CHAPTER_VERSE
];
function hl(t) {
  return jr.BOOK_CHAPTER_VERSE.test(t.trim());
}
function Ao(t, e) {
  return kt.bookIdToNumber(t) < kt.bookIdToNumber(e.book);
}
function gl(t, e, r) {
  const o = kt.bookIdToNumber(t) - kt.bookIdToNumber(r.book);
  return o < 0 ? !0 : o > 0 ? !1 : e < r.chapterNum;
}
function da(t, e, r, o) {
  const n = kt.bookIdToNumber(t) - kt.bookIdToNumber(o.book);
  return n < 0 ? !0 : n > 0 ? !1 : e < o.chapterNum ? !0 : e > o.chapterNum ? !1 : r < o.verseNum;
}
function Io(t) {
  const e = /^[a-zA-Z]$/.test(t), r = /^[0-9]$/.test(t);
  return { isLetter: e, isDigit: r };
}
function rr(t) {
  return Ps(kt.bookIdToNumber(t));
}
function fl(t, e, r) {
  if (!t.trim() || e.length === 0) return;
  const o = pl.reduce(
    (n, i) => {
      if (n) return n;
      const s = i.exec(t.trim());
      if (s) {
        const [c, d = void 0, l = void 0] = s.slice(1);
        let w;
        const p = e.filter((h) => Fa(h, c, r));
        if (p.length === 1 && ([w] = p), !w && d) {
          if (kt.isBookIdValid(c)) {
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
        if (!w && d) {
          const g = ((f) => Object.keys(we).find(
            (x) => we[x].toLowerCase() === f.toLowerCase()
          ))(c);
          if (g && e.includes(g) && (w = g), !w && r) {
            const f = Array.from(r.entries()).find(
              ([, x]) => x.localizedName.toLowerCase() === c.toLowerCase()
            );
            f && e.includes(f[0]) && ([w] = f);
          }
        }
        if (w) {
          let h = d ? parseInt(d, 10) : void 0;
          h && h > rr(w) && (h = Math.max(rr(w), 1));
          const g = l ? parseInt(l, 10) : void 0;
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
function Kn({
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
    return /* @__PURE__ */ a(Ne, { children: /* @__PURE__ */ a("div", { className: m("tw:grid tw:grid-cols-6 tw:gap-1", c), children: Array.from({ length: t }, (d, l) => l + 1).map((d) => {
      const l = (n == null ? void 0 : n(d)) ?? !1;
      return /* @__PURE__ */ a(
        Ie,
        {
          value: e(d),
          onSelect: () => {
            l || r(d);
          },
          ref: o(d),
          disabled: l,
          "aria-disabled": l || void 0,
          className: m(
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
function Po({
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
      Kn,
      {
        count: rr(t),
        valueBuilder: (c) => `${t} ${we[t] || ""} ${c}`,
        onSelect: r,
        itemRef: o,
        isDisabled: i,
        isDimmed: n,
        isSelected: (c) => t === e.book && c === e.chapterNum,
        className: s
      }
    );
}
function Vo({
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
      Kn,
      {
        count: r,
        valueBuilder: (l) => `${t} ${we[t] || ""} ${e}:${l}`,
        onSelect: n,
        itemRef: i,
        isDisabled: c,
        isDimmed: s,
        isSelected: (l) => t === o.book && e === o.chapterNum && l === o.verseNum,
        className: d
      }
    );
}
function wa({
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
  triggerContent: h,
  triggerVariant: g = "outline",
  onOpenChange: f,
  onCloseAutoFocus: x,
  modal: v = !1,
  align: C = "center",
  ref: N,
  disabled: k
}) {
  const M = ie(), [j, S] = _(!1), [P, $] = _(""), [E, B] = _(""), [O, T] = _("books"), [G, H] = _(void 0), [F, V] = _(
    void 0
  ), [R, Z] = _(void 0), [rt, Ct] = _(!1), Et = U(null), At = U(!1), K = U(void 0), at = U(void 0), gt = U(void 0), wt = U(void 0), bt = U({}), pe = U({}), ct = L(
    (b) => {
      e(b), c && c(b);
    },
    [e, c]
  ), Lt = I(() => o ? o() : Ki, [o]), xt = I(() => ({
    [ht.OT]: Lt.filter((Y) => kt.isBookOT(Y)),
    [ht.NT]: Lt.filter((Y) => kt.isBookNT(Y)),
    [ht.DC]: Lt.filter((Y) => kt.isBookDC(Y)),
    [ht.Extra]: Lt.filter((Y) => kt.extraBooks().includes(Y))
  }), [Lt]), re = I(() => Object.values(xt).flat(), [xt]), Jt = I(() => {
    if (!E.trim()) return xt;
    const b = {
      [ht.OT]: [],
      [ht.NT]: [],
      [ht.DC]: [],
      [ht.Extra]: []
    };
    return [ht.OT, ht.NT, ht.DC, ht.Extra].forEach((ot) => {
      b[ot] = xt[ot].filter((Pt) => Fa(Pt, E, n));
    }), b;
  }, [xt, E, n]), z = I(
    () => fl(E, re, n),
    [E, re, n]
  ), It = U(!1);
  X(() => {
    if (!It.current) {
      It.current = !0;
      return;
    }
    f == null || f(j);
  }, [j, f]);
  const yt = L(() => {
    if (z) {
      const b = z.chapterNum ?? 1, Y = z.verseNum ?? 1;
      if (w && da(z.book, b, Y, w))
        return;
      ct({
        book: z.book,
        chapterNum: b,
        verseNum: Y
      }), S(!1), B(""), $("");
    }
  }, [ct, z, w]), _t = L(
    (b) => {
      const Y = F ?? (z == null ? void 0 : z.book), ot = R ?? (z == null ? void 0 : z.chapterNum);
      !Y || !ot || (ct({
        book: Y,
        chapterNum: ot,
        verseNum: b
      }), S(!1));
    },
    [ct, F, R, z]
  ), ae = L(
    (b) => {
      if (w && Ao(b, w)) return;
      if (rr(b) <= 1) {
        ct({
          book: b,
          chapterNum: 1,
          verseNum: 1
        }), S(!1), B("");
        return;
      }
      H(b), T("chapters");
    },
    [ct, w]
  ), Se = L(
    (b) => {
      const Y = O === "chapters" ? G : z == null ? void 0 : z.book;
      if (Y) {
        if (l && l(Y, b) > 1) {
          V(Y), Z(b), T("verses"), $("");
          return;
        }
        ct({
          book: Y,
          chapterNum: b,
          verseNum: 1
        }), S(!1);
      }
    },
    [ct, O, G, z, l]
  ), he = L(
    (b) => {
      ct(b), S(!1), B("");
    },
    [ct]
  ), ce = ul(t, re, M, e), le = L(() => {
    T("books"), H(void 0), V(void 0), Z(void 0), setTimeout(() => {
      at.current && at.current.focus();
    }, 0);
  }, []), Tt = L(() => {
    const b = F;
    V(void 0), Z(void 0), b ? (H(b), T("chapters"), $("")) : le();
  }, [F, le]), Mt = L((b) => {
    S(b), b && (T("books"), H(void 0), V(void 0), Z(void 0), B(""));
  }, []);
  X(() => {
    k && Mt(!1);
  }, [k, Mt]);
  const [Zt, zt] = _(0);
  X(() => {
    var b;
    Zt !== 0 && ((b = at.current) == null || b.focus());
  }, [Zt]), Gs(
    N,
    () => ({
      open: () => {
        k || (Mt(!0), zt((b) => b + 1));
      }
    }),
    [Mt, k]
  );
  const { otLong: Ft, ntLong: Qt, dcLong: D, extraLong: J } = {
    otLong: i == null ? void 0 : i["%scripture_section_ot_long%"],
    ntLong: i == null ? void 0 : i["%scripture_section_nt_long%"],
    dcLong: i == null ? void 0 : i["%scripture_section_dc_long%"],
    extraLong: i == null ? void 0 : i["%scripture_section_extra_long%"]
  }, ut = L(
    (b) => dn(b, Ft, Qt, D, J),
    [Ft, Qt, D, J]
  ), nt = L(
    (b) => z ? !!z.chapterNum && !b.toString().includes(z.chapterNum.toString()) : !1,
    [z]
  ), et = I(
    () => ke(
      t,
      n ? Me(t.book, n) : "English"
    ),
    [t, n]
  ), it = L((b) => (Y) => {
    bt.current[b] = Y;
  }, []), y = L((b) => (Y) => {
    pe.current[b] = Y;
  }, []), W = I(
    () => hl(E),
    [E]
  ), tt = I(() => !l || !z || !z.chapterNum || !W ? !1 : l(z.book, z.chapterNum) > 0, [l, z, W]), lt = L(
    (b) => w ? Ao(b, w) : !1,
    [w]
  ), mt = L(
    (b) => (Y) => w ? gl(b, Y, w) : !1,
    [w]
  ), Ut = L(
    (b, Y) => (ot) => w ? da(b, Y, ot, w) : !1,
    [w]
  ), te = (i == null ? void 0 : i["%webView_bookChapterControl_selectChapter%"]) ?? "Select Chapter", pr = (i == null ? void 0 : i["%webView_bookChapterControl_selectVerse%"]) ?? "Select Verse", Sr = L(
    (b) => {
      (b.key === "Home" || b.key === "End") && b.stopPropagation(), p && p.includes(b.key) && z && z.chapterNum !== void 0 && z.verseNum !== void 0 && (b.preventDefault(), b.stopPropagation(), yt());
    },
    [p, z, yt]
  ), Rr = L(
    (b) => {
      var ye, Be, Re;
      if (b.ctrlKey) return;
      const { isLetter: Y, isDigit: ot } = Io(b.key);
      if ((O === "chapters" || O === "verses") && (b.key === " " || b.key === "Enter")) {
        const $t = b.target instanceof HTMLElement ? b.target : void 0;
        if (!!($t != null && $t.closest(
          'button, a, input, select, textarea, [role="button"]'
        ))) {
          b.stopPropagation();
          return;
        }
        const Ot = (ye = K.current) == null ? void 0 : ye.querySelector(
          '[cmdk-item][data-selected="true"]:not([data-disabled="true"])'
        );
        if (Ot) {
          b.preventDefault(), b.stopPropagation(), Ot.click();
          return;
        }
      }
      if ((O === "chapters" || O === "verses") && (Y || ot)) {
        b.preventDefault(), b.stopPropagation();
        return;
      }
      if (O === "chapters" && b.key === "Backspace") {
        b.preventDefault(), b.stopPropagation(), le();
        return;
      }
      if (O === "verses" && b.key === "Backspace") {
        b.preventDefault(), b.stopPropagation(), Tt();
        return;
      }
      const Pt = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(b.key);
      if (O === "verses" && Pt) {
        const $t = F, vt = R;
        if (!$t || !vt || !l) return;
        const Ot = l($t, vt);
        if (!Ot) return;
        (Be = K.current) == null || Be.focus();
        const ft = (() => {
          if (!P) return 1;
          const Le = P.match(/:(\d+)$/);
          return Le ? parseInt(Le[1], 10) : 0;
        })();
        let oe = ft;
        const ee = 6;
        switch (b.key) {
          case "ArrowLeft":
            ft !== 0 && (oe = ft > 1 ? ft - 1 : Ot);
            break;
          case "ArrowRight":
            ft !== 0 && (oe = ft < Ot ? ft + 1 : 1);
            break;
          case "ArrowUp":
            oe = ft === 0 ? Ot : Math.max(1, ft - ee);
            break;
          case "ArrowDown":
            oe = ft === 0 ? 1 : Math.min(Ot, ft + ee);
            break;
          default:
            return;
        }
        oe !== ft && (b.preventDefault(), b.stopPropagation(), $(
          `${$t} ${we[$t] || ""} ${vt}:${oe}`
        ), setTimeout(() => {
          const Le = pe.current[oe];
          Le && Le.scrollIntoView({ block: "nearest", behavior: "smooth" });
        }, 0));
        return;
      }
      if ((O === "chapters" || O === "books" && z) && Pt) {
        const $t = O === "chapters" ? G : z == null ? void 0 : z.book;
        if (!$t) return;
        O === "chapters" && ((Re = K.current) == null || Re.focus());
        const vt = (() => {
          if (!P) return 1;
          const ee = P.match(/(\d+)$/);
          return ee ? parseInt(ee[1], 10) : 0;
        })(), Ot = rr($t);
        if (!Ot) return;
        let ft = vt;
        const oe = 6;
        switch (b.key) {
          case "ArrowLeft":
            vt !== 0 && (ft = vt > 1 ? vt - 1 : Ot);
            break;
          case "ArrowRight":
            vt !== 0 && (ft = vt < Ot ? vt + 1 : 1);
            break;
          case "ArrowUp":
            ft = vt === 0 ? Ot : Math.max(1, vt - oe);
            break;
          case "ArrowDown":
            ft = vt === 0 ? 1 : Math.min(Ot, vt + oe);
            break;
          default:
            return;
        }
        ft !== vt && (b.preventDefault(), b.stopPropagation(), $(
          `${$t} ${we[$t] || ""} ${ft}`
        ), setTimeout(() => {
          const ee = bt.current[ft];
          ee && ee.scrollIntoView({ block: "nearest", behavior: "smooth" });
        }, 0));
      }
    },
    [
      O,
      z,
      le,
      Tt,
      G,
      F,
      R,
      l,
      P
    ]
  ), Je = L((b) => {
    var Pt;
    if (b.shiftKey || b.key === "Tab" || b.key === " ") return;
    if (b.key === "Enter") {
      b.stopPropagation();
      return;
    }
    if (b.key === "ArrowUp" || b.key === "ArrowDown") {
      (Pt = at.current) == null || Pt.focus();
      return;
    }
    const { isLetter: Y, isDigit: ot } = Io(b.key);
    (Y || ot) && (b.preventDefault(), B((ye) => ye + b.key), at.current.focus(), Ct(!1));
  }, []);
  return qt(() => {
    const b = setTimeout(() => {
      if (j && O === "books" && gt.current && wt.current) {
        const Y = gt.current, ot = wt.current, Pt = ot.offsetTop, ye = Y.clientHeight, Be = ot.clientHeight, Re = Pt - ye / 2 + Be / 2;
        Y.scrollTo({
          top: Math.max(0, Re),
          behavior: "smooth"
        }), $(Un(t.book));
      }
    }, 0);
    return () => {
      clearTimeout(b);
    };
  }, [j, O, E, z, t.book]), qt(() => {
    if (O === "chapters" && G) {
      const b = G === t.book, Y = b ? t.chapterNum : 1;
      $(
        `${G} ${we[G] || ""} ${Y}`
      ), setTimeout(() => {
        if (gt.current)
          if (b) {
            const ot = bt.current[t.chapterNum];
            ot && ot.scrollIntoView({ block: "center", behavior: "smooth" });
          } else
            gt.current.scrollTo({ top: 0 });
        K.current && K.current.focus();
      }, 0);
    }
  }, [O, G, z, t.book, t.chapterNum]), qt(() => {
    if (O === "verses" && F && R !== void 0) {
      const b = F === t.book && R === t.chapterNum, Y = b ? t.verseNum : 1;
      $(
        `${F} ${we[F] || ""} ${R}:${Y}`
      ), setTimeout(() => {
        if (gt.current)
          if (b) {
            const ot = pe.current[t.verseNum];
            ot && ot.scrollIntoView({ block: "center", behavior: "smooth" });
          } else
            gt.current.scrollTo({ top: 0 });
        K.current && K.current.focus();
      }, 0);
    }
  }, [
    O,
    F,
    R,
    t.book,
    t.chapterNum,
    t.verseNum
  ]), /* @__PURE__ */ u(Pe, { open: j, onOpenChange: Mt, modal: v, children: [
    /* @__PURE__ */ a(He, { asChild: !0, children: /* @__PURE__ */ a(
      q,
      {
        ref: Et,
        "aria-label": "book-chapter-trigger",
        variant: g,
        role: "combobox",
        "aria-expanded": j,
        disabled: k,
        className: m(
          "tw:h-8 tw:w-full tw:min-w-16 tw:max-w-48 tw:overflow-hidden tw:px-1",
          r
        ),
        onClick: (b) => {
          At.current && (At.current = !1, b.preventDefault());
        },
        children: h ?? /* @__PURE__ */ a("span", { className: "tw:truncate", children: et })
      }
    ) }),
    /* @__PURE__ */ a(
      Ve,
      {
        id: d,
        forceMount: !0,
        className: "tw:w-[280px] tw:p-0",
        align: C,
        onKeyDownCapture: Rr,
        onKeyDown: (b) => b.stopPropagation(),
        onPointerDownOutside: (b) => {
          const { target: Y } = b;
          j && Et.current && Y instanceof Node && Et.current.contains(Y) && (At.current = !0, Mt(!1));
        },
        onCloseAutoFocus: x,
        children: /* @__PURE__ */ u(
          Ye,
          {
            ref: K,
            loop: !0,
            value: P,
            onValueChange: $,
            shouldFilter: !1,
            children: [
              O === "books" ? /* @__PURE__ */ u("div", { className: "tw:flex tw:items-end", children: [
                /* @__PURE__ */ u("div", { className: "tw:relative tw:flex-1", children: [
                  /* @__PURE__ */ a(
                    Qr,
                    {
                      ref: at,
                      value: E,
                      onValueChange: B,
                      onKeyDown: Sr,
                      onFocus: () => Ct(!1),
                      className: s && s.length > 0 ? "tw:!pr-10" : ""
                    }
                  ),
                  s && s.length > 0 && /* @__PURE__ */ a(
                    wl,
                    {
                      recentSearches: s,
                      onSearchItemSelect: he,
                      renderItem: (b) => ke(b, "English"),
                      getItemKey: (b) => `${b.book}-${b.chapterNum}-${b.verseNum}`,
                      ariaLabel: i == null ? void 0 : i["%history_recentSearches_ariaLabel%"],
                      groupHeading: i == null ? void 0 : i["%history_recent%"]
                    }
                  )
                ] }),
                /* @__PURE__ */ a("div", { className: "tw:flex tw:items-center tw:gap-1 tw:border-b tw:pe-2", children: ce.map(
                  ({ onClick: b, disabled: Y, title: ot, icon: Pt }) => /* @__PURE__ */ a(
                    q,
                    {
                      variant: "ghost",
                      size: "sm",
                      onClick: () => {
                        Ct(!0), b();
                      },
                      disabled: Y,
                      className: "tw:h-10 tw:w-4 tw:p-0",
                      title: ot,
                      onKeyDown: Je,
                      children: /* @__PURE__ */ a(Pt, {})
                    },
                    ot
                  )
                ) })
              ] }) : /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:border-b tw:px-3 tw:py-2", children: [
                /* @__PURE__ */ a(
                  q,
                  {
                    variant: "ghost",
                    size: "sm",
                    onClick: O === "verses" ? Tt : le,
                    className: "tw:mr-2 tw:h-6 tw:w-6 tw:p-0",
                    tabIndex: -1,
                    children: M === "ltr" ? /* @__PURE__ */ a(ns, { className: "tw:h-4 tw:w-4" }) : /* @__PURE__ */ a(is, { className: "tw:h-4 tw:w-4" })
                  }
                ),
                O === "chapters" && G && /* @__PURE__ */ a("span", { tabIndex: -1, className: "tw:text-sm tw:font-medium", children: Me(G, n) }),
                O === "verses" && F && R !== void 0 && /* @__PURE__ */ a("span", { tabIndex: -1, className: "tw:text-sm tw:font-medium", children: `${Me(F, n)} ${R}` }),
                /* @__PURE__ */ a(
                  "span",
                  {
                    tabIndex: -1,
                    className: "tw:ms-auto tw:text-sm tw:font-medium tw:text-muted-foreground",
                    children: O === "verses" ? pr : te
                  }
                )
              ] }),
              !rt && /* @__PURE__ */ u(We, { ref: gt, children: [
                O === "books" && /* @__PURE__ */ u(dt, { children: [
                  !z && Object.entries(Jt).map(([b, Y]) => {
                    if (Y.length !== 0)
                      return (
                        // We are mapping over filteredBooksByType, which uses Section as key type
                        // eslint-disable-next-line no-type-assertion/no-type-assertion
                        /* @__PURE__ */ a(Ne, { heading: ut(b), children: Y.map((ot) => /* @__PURE__ */ a(
                          Fn,
                          {
                            bookId: ot,
                            onSelect: (Pt) => ae(Pt),
                            section: vr(ot),
                            commandValue: `${ot} ${we[ot]}`,
                            ref: ot === t.book ? wt : void 0,
                            localizedBookNames: n,
                            disabled: lt(ot)
                          },
                          ot
                        )) }, b)
                      );
                  }),
                  z && /* @__PURE__ */ a(Ne, { children: /* @__PURE__ */ a(
                    Ie,
                    {
                      value: `${z.book} ${we[z.book]} ${z.chapterNum || ""}:${z.verseNum || ""})}`,
                      onSelect: yt,
                      disabled: !!w && da(
                        z.book,
                        z.chapterNum ?? 1,
                        z.verseNum ?? 1,
                        w
                      ),
                      className: "tw:font-semibold tw:text-primary",
                      children: ke(
                        {
                          book: z.book,
                          chapterNum: z.chapterNum ?? 1,
                          verseNum: z.verseNum ?? 1
                        },
                        n ? La(z.book, n) : void 0
                      )
                    },
                    "top-match"
                  ) }),
                  z && tt && z.chapterNum && l && /* @__PURE__ */ u(dt, { children: [
                    /* @__PURE__ */ u("div", { className: "tw:mb-2 tw:flex tw:items-center tw:justify-between tw:px-3 tw:text-sm tw:font-medium tw:text-muted-foreground", children: [
                      /* @__PURE__ */ a("span", { children: `${Me(z.book, n)} ${z.chapterNum}` }),
                      /* @__PURE__ */ a("span", { children: pr })
                    ] }),
                    /* @__PURE__ */ a(
                      Vo,
                      {
                        bookId: z.book,
                        chapterNum: z.chapterNum,
                        endVerse: l(z.book, z.chapterNum),
                        scrRef: t,
                        onVerseSelect: _t,
                        setVerseRef: y,
                        isVerseDisabled: Ut(z.book, z.chapterNum),
                        className: "tw:px-4 tw:pb-4"
                      }
                    )
                  ] }),
                  z && !tt && rr(z.book) > 1 && /* @__PURE__ */ u(dt, { children: [
                    /* @__PURE__ */ u("div", { className: "tw:mb-2 tw:flex tw:items-center tw:justify-between tw:px-3 tw:text-sm tw:font-medium tw:text-muted-foreground", children: [
                      /* @__PURE__ */ a("span", { children: Me(z.book, n) }),
                      /* @__PURE__ */ a("span", { children: te })
                    ] }),
                    /* @__PURE__ */ a(
                      Po,
                      {
                        bookId: z.book,
                        scrRef: t,
                        onChapterSelect: Se,
                        setChapterRef: it,
                        isChapterDimmed: nt,
                        isChapterDisabled: mt(z.book),
                        className: "tw:px-4 tw:pb-4"
                      }
                    )
                  ] })
                ] }),
                O === "chapters" && G && /* @__PURE__ */ a(
                  Po,
                  {
                    bookId: G,
                    scrRef: t,
                    onChapterSelect: Se,
                    setChapterRef: it,
                    isChapterDisabled: mt(G),
                    className: "tw:p-4"
                  }
                ),
                O === "verses" && F && R !== void 0 && l && /* @__PURE__ */ a(
                  Vo,
                  {
                    bookId: F,
                    chapterNum: R,
                    endVerse: l(F, R),
                    scrRef: t,
                    onVerseSelect: _t,
                    setVerseRef: y,
                    isVerseDisabled: Ut(
                      F,
                      R
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
const Wu = Object.freeze([
  "%scripture_section_ot_long%",
  "%scripture_section_nt_long%",
  "%scripture_section_dc_long%",
  "%scripture_section_extra_long%",
  "%history_recent%",
  "%history_recentSearches_ariaLabel%",
  "%webView_bookChapterControl_selectChapter%",
  "%webView_bookChapterControl_selectVerse%"
]);
function ao({
  className: t,
  ...e
}) {
  const r = ie();
  return /* @__PURE__ */ a(
    Da.Root,
    {
      "data-slot": "radio-group",
      className: m(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:grid tw:w-full tw:gap-2",
        t
      ),
      dir: r,
      ...e
    }
  );
}
function Gr({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    Da.Item,
    {
      "data-slot": "radio-group-item",
      className: m(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:group/radio-group-item tw:peer tw:relative tw:flex tw:aspect-square tw:size-4 tw:shrink-0 tw:rounded-full tw:border tw:border-input tw:outline-none tw:after:absolute tw:after:-inset-x-3 tw:after:-inset-y-2 tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:aria-invalid:aria-checked:border-primary tw:dark:bg-input/30 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40 tw:data-checked:border-primary tw:data-checked:bg-primary tw:data-checked:text-primary-foreground tw:dark:data-checked:bg-primary",
        t
      ),
      ...e,
      children: /* @__PURE__ */ a(
        Da.Indicator,
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
  getOptionLabel: d = ml,
  getButtonLabel: l,
  icon: w = void 0,
  buttonPlaceholder: p = "",
  textPlaceholder: h = "",
  commandEmptyMessage: g = "No option found",
  buttonVariant: f = "outline",
  alignDropDown: x = "start",
  isDisabled: v = !1,
  ariaLabel: C,
  ...N
}) {
  const [k, M] = _(!1), j = l ?? d, S = ($) => $.length > 0 && typeof $[0] == "object" && "options" in $[0], P = ($, E) => {
    const B = d($), O = typeof $ == "object" && "secondaryLabel" in $ ? $.secondaryLabel : void 0, T = `${E ?? ""}${B}${O ?? ""}`;
    return /* @__PURE__ */ u(
      Ie,
      {
        value: B,
        onSelect: () => {
          c($), M(!1);
        },
        className: "tw:gap-1.5!",
        children: [
          /* @__PURE__ */ a(
            or,
            {
              className: m("tw:h-4 tw:w-4 tw:shrink-0", {
                "tw:opacity-0": !s || d(s) !== B
              })
            }
          ),
          /* @__PURE__ */ u("span", { className: "tw:flex-1 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap", children: [
            B,
            O && /* @__PURE__ */ u("span", { className: "tw:text-muted-foreground", children: [
              " · ",
              O
            ] })
          ] })
        ]
      },
      T
    );
  };
  return /* @__PURE__ */ u(Pe, { open: k, onOpenChange: M, ...N, children: [
    /* @__PURE__ */ a(He, { asChild: !0, children: /* @__PURE__ */ u(
      q,
      {
        variant: f,
        role: "combobox",
        "aria-expanded": k,
        "aria-label": C,
        id: t,
        className: m(
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
                className: m(
                  "tw:min-w-0 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap tw:text-start"
                ),
                children: s ? j(s) : p
              }
            )
          ] }),
          /* @__PURE__ */ a(nr, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ a(
      Ve,
      {
        align: x,
        className: m("tw:w-[200px] tw:p-0", n),
        style: i,
        children: /* @__PURE__ */ u(Ye, { children: [
          /* @__PURE__ */ a(Qr, { placeholder: h, className: "tw:text-inherit" }),
          /* @__PURE__ */ a(Ua, { children: g }),
          /* @__PURE__ */ a(We, { children: S(e) ? e.map(($) => /* @__PURE__ */ a(Ne, { heading: $.groupHeading, children: $.options.map((E) => P(E, $.groupHeading)) }, $.groupHeading)) : /* @__PURE__ */ a(Ne, { children: e.map(($) => P($)) }) })
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
  const s = I(
    () => Array.from({ length: i }, (l, w) => w + 1),
    [i]
  );
  return /* @__PURE__ */ u(dt, { children: [
    /* @__PURE__ */ a(Nt, { htmlFor: "start-chapters-combobox", children: "Chapters" }),
    /* @__PURE__ */ a(
      jo,
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
      jo,
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
var Ia = /* @__PURE__ */ ((t) => (t.CurrentBook = "current book", t.ChooseBooks = "choose books", t))(Ia || {});
((t) => {
  t.CURRENT_BOOK = "current book", t.CHOOSE_BOOKS = "choose books";
})(Ia || (Ia = {}));
const Xu = Object.freeze([
  "%webView_bookSelector_currentBook%",
  "%webView_bookSelector_choose%",
  "%webView_bookSelector_chooseBooks%"
]), ua = (t, e) => t[e] ?? e;
function Ju({
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
  const w = ua(l, "%webView_bookSelector_currentBook%"), p = ua(l, "%webView_bookSelector_choose%"), h = ua(l, "%webView_bookSelector_chooseBooks%"), [g, f] = _(
    "current book"
    /* CurrentBook */
  ), x = (v) => {
    f(v), t(v);
  };
  return /* @__PURE__ */ a(
    ao,
    {
      className: "pr-twp tw:flex",
      value: g,
      onValueChange: (v) => x(v),
      children: /* @__PURE__ */ u("div", { className: "tw:flex tw:w-full tw:flex-col tw:gap-4", children: [
        /* @__PURE__ */ u("div", { className: "tw:grid tw:grid-cols-[25%_25%_50%]", children: [
          /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center", children: [
            /* @__PURE__ */ a(Gr, {
              value: "current book"
              /* CurrentBook */
            }),
            /* @__PURE__ */ a(Nt, { className: "tw:ms-1", children: w })
          ] }),
          /* @__PURE__ */ a(Nt, { className: "tw:flex tw:items-center", children: e }),
          /* @__PURE__ */ a("div", { className: "tw:flex tw:items-center tw:justify-end", children: /* @__PURE__ */ a(
            vl,
            {
              isDisabled: g === "choose books",
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
            /* @__PURE__ */ a(Gr, {
              value: "choose books"
              /* ChooseBooks */
            }),
            /* @__PURE__ */ a(Nt, { className: "tw:ms-1", children: h })
          ] }),
          /* @__PURE__ */ a(Nt, { className: "tw:flex tw:items-center", children: o.map((v) => kt.bookIdToEnglishName(v)).join(", ") }),
          /* @__PURE__ */ a(
            q,
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
const qn = Za(null);
function bl(t, e) {
  return { getTheme: function() {
    return e ?? null;
  } };
}
function xe() {
  const t = kn(qn);
  return t == null && function(e, ...r) {
    const o = new URL("https://lexical.dev/docs/error"), n = new URLSearchParams();
    n.append("code", e);
    for (const i of r) n.append("v", i);
    throw o.search = n.toString(), Error(`Minified Lexical error #${e}; visit ${o.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
  }(8), t;
}
const Gn = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, xl = Gn ? qt : X, Ar = { tag: to };
function yl({ initialConfig: t, children: e }) {
  const r = I(() => {
    const { theme: o, namespace: n, nodes: i, onError: s, editorState: c, html: d } = t, l = bl(null, o), w = En({ editable: t.editable, html: d, namespace: n, nodes: i, onError: (p) => s(p, w), theme: o });
    return function(p, h) {
      if (h !== null) {
        if (h === void 0) p.update(() => {
          const g = Ae();
          if (g.isEmpty()) {
            const f = zr();
            g.append(f);
            const x = Gn ? document.activeElement : null;
            (Xt() !== null || x !== null && x === p.getRootElement()) && f.select();
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
    }(w, c), [w, l];
  }, []);
  return xl(() => {
    const o = t.editable, [n] = r;
    n.setEditable(o === void 0 || o);
  }, []), a(qn.Provider, { value: r, children: e });
}
const kl = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? qt : X;
function _l({ ignoreHistoryMergeTagChange: t = !0, ignoreSelectionChange: e = !1, onChange: r }) {
  const [o] = xe();
  return kl(() => {
    if (r) return o.registerUpdateListener(({ editorState: n, dirtyElements: i, dirtyLeaves: s, prevEditorState: c, tags: d }) => {
      e && i.size === 0 && s.size === 0 || t && d.has(to) || c.isEmpty() || r(n, o, d);
    });
  }, [o, t, e, r]), null;
}
const oo = {
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
}, no = [
  Ac,
  Tn,
  zn,
  Ic
], Nl = Za(null), pa = {
  didCatch: !1,
  error: null
};
class Cl extends Hs {
  constructor(e) {
    super(e), this.resetErrorBoundary = this.resetErrorBoundary.bind(this), this.state = pa;
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
      }), this.setState(pa);
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
      }), this.setState(pa);
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
        c = To(o, d);
      else if (n !== void 0)
        c = n;
      else
        throw s;
    }
    return To(Nl.Provider, {
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
const zl = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? qt : X;
function Sl(t) {
  return { initialValueFn: () => t.isEditable(), subscribe: (e) => t.registerEditableListener(e) };
}
function Rl() {
  return function(t) {
    const [e] = xe(), r = I(() => t(e), [e, t]), [o, n] = _(() => r.initialValueFn()), i = U(o);
    return zl(() => {
      const { initialValueFn: s, subscribe: c } = r, d = s();
      return i.current !== d && (i.current = d, n(d)), c((l) => {
        i.current = l, n(l);
      });
    }, [r, t]), o;
  }(Sl);
}
function Dl(t, e) {
  const r = t.getRootElement();
  if (r === null) return [];
  const o = r.getBoundingClientRect(), n = getComputedStyle(r), i = parseFloat(n.paddingLeft) + parseFloat(n.paddingRight), s = Array.from(e.getClientRects());
  let c, d = s.length;
  s.sort((l, w) => {
    const p = l.top - w.top;
    return Math.abs(p) <= 3 ? l.left - w.left : p;
  });
  for (let l = 0; l < d; l++) {
    const w = s[l], p = c && c.top <= w.top && c.top + c.height > w.top && c.left + c.width > w.left, h = w.width + i === o.width;
    p || h ? (s.splice(l--, 1), d--) : c = w;
  }
  return s;
}
function Hr(t, ...e) {
  const r = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const n of e) o.append("v", n);
  throw r.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
const Hn = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, Ml = Hn && "documentMode" in document ? document.documentMode : null;
!(!Hn || !("InputEvent" in window) || Ml) && "getTargetRanges" in new window.InputEvent("input");
function fe(t) {
  return `${t}px`;
}
const $l = { attributes: !0, characterData: !0, childList: !0, subtree: !0 };
function Ol(t, e, r) {
  let o = null, n = null, i = null, s = [];
  const c = document.createElement("div");
  function d() {
    o === null && Hr(182), n === null && Hr(183);
    const { left: p, top: h } = n.getBoundingClientRect(), g = Dl(t, e);
    var f, x;
    c.isConnected || (x = c, (f = n).insertBefore(x, f.firstChild));
    let v = !1;
    for (let C = 0; C < g.length; C++) {
      const N = g[C], k = s[C] || document.createElement("div"), M = k.style;
      M.position !== "absolute" && (M.position = "absolute", v = !0);
      const j = fe(N.left - p);
      M.left !== j && (M.left = j, v = !0);
      const S = fe(N.top - h);
      M.top !== S && (k.style.top = S, v = !0);
      const P = fe(N.width);
      M.width !== P && (k.style.width = P, v = !0);
      const $ = fe(N.height);
      M.height !== $ && (k.style.height = $, v = !0), k.parentNode !== c && (c.append(k), v = !0), s[C] = k;
    }
    for (; s.length > g.length; ) s.pop();
    v && r(s);
  }
  function l() {
    n = null, o = null, i !== null && i.disconnect(), i = null, c.remove();
    for (const p of s) p.remove();
    s = [];
  }
  c.style.position = "relative";
  const w = t.registerRootListener(function p() {
    const h = t.getRootElement();
    if (h === null) return l();
    const g = h.parentElement;
    if (!ic(g)) return l();
    l(), o = h, n = g, i = new MutationObserver((f) => {
      const x = t.getRootElement(), v = x && x.parentElement;
      if (x !== o || v !== n) return p();
      for (const C of f) if (!c.contains(C.target)) return d();
    }), i.observe(g, $l), d();
  });
  return () => {
    w(), l();
  };
}
function Bo(t, e, r) {
  if (t.type !== "text" && _r(e)) {
    const o = e.getDOMSlot(r);
    return [o.element, o.getFirstChildOffset() + t.offset];
  }
  return [nc(r) || r, t.offset];
}
function Al(t) {
  for (const e of t) {
    const r = e.style;
    r.background !== "Highlight" && (r.background = "Highlight"), r.color !== "HighlightText" && (r.color = "HighlightText"), r.marginTop !== fe(-1.5) && (r.marginTop = fe(-1.5)), r.paddingTop !== fe(4) && (r.paddingTop = fe(4)), r.paddingBottom !== fe(0) && (r.paddingBottom = fe(0));
  }
}
function Il(t, e = Al) {
  let r = null, o = null, n = null, i = null, s = null, c = null, d = () => {
  };
  function l(w) {
    w.read(() => {
      const p = Xt();
      if (!me(p)) return r = null, n = null, i = null, c = null, d(), void (d = () => {
      });
      const [h, g] = function($) {
        const E = $.getStartEndPoints();
        return $.isBackward() ? [E[1], E[0]] : E;
      }(p), f = h.getNode(), x = f.getKey(), v = h.offset, C = g.getNode(), N = C.getKey(), k = g.offset, M = t.getElementByKey(x), j = t.getElementByKey(N), S = r === null || M !== o || v !== n || x !== r.getKey(), P = i === null || j !== s || k !== c || N !== i.getKey();
      if ((S || P) && M !== null && j !== null) {
        const $ = function(E, B, O, T, G, H, F) {
          const V = (E._window ? E._window.document : document).createRange();
          return V.setStart(...Bo(B, O, T)), V.setEnd(...Bo(G, H, F)), V;
        }(t, h, f, M, g, C, j);
        d(), d = Ol(t, $, e);
      }
      r = f, o = M, n = v, i = C, s = j, c = k;
    });
  }
  return l(t.getEditorState()), ze(t.registerUpdateListener(({ editorState: w }) => l(w)), () => {
    d();
  });
}
function Pl(t, e) {
  let r = null;
  const o = () => {
    const n = getSelection(), i = n && n.anchorNode, s = t.getRootElement();
    i !== null && s !== null && s.contains(i) ? r !== null && (r(), r = null) : r === null && (r = Il(t, e));
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
  const e = Rn(t, (r) => _r(r) && !r.isInline());
  return _r(e) || Hr(4, t.__key), e;
}
function jl(t) {
  const e = Xt() || Ws();
  let r;
  if (me(e)) r = Xs(e.focus, "next");
  else {
    if (e != null) {
      const s = e.getNodes(), c = s[s.length - 1];
      c && (r = Sn(c, "next"));
    }
    r = r || Js(Ae(), "previous").getFlipped().insert(zr());
  }
  const o = Bl(t, r), n = Zs(o), i = Qs(n) ? tc(n) : o;
  return ec(rc(i)), t.getLatest();
}
function Bl(t, e, r) {
  let o = Mo(e, "next");
  for (let n = o; n; n = ac(n, r)) o = n;
  return oc(o) && Hr(283), o.insert(t.isInline() ? zr().append(t) : t), Mo(Sn(t.getLatest(), "next"), e.direction);
}
function Ll(t) {
  const e = Xt();
  if (!me(e)) return !1;
  const r = /* @__PURE__ */ new Set(), o = e.getNodes();
  for (let n = 0; n < o.length; n++) {
    const i = o[n], s = i.getKey();
    if (r.has(s)) continue;
    const c = Rn(i, (l) => _r(l) && !l.isInline());
    if (c === null) continue;
    const d = c.getKey();
    c.canIndent() && !r.has(d) && (r.add(d), t(c));
  }
  return r.size > 0;
}
const Fl = Symbol.for("preact-signals");
function aa() {
  if (_e > 1) return void _e--;
  let t, e = !1;
  for (!function() {
    let r = Yr;
    for (Yr = void 0; r !== void 0; ) r.S.v === r.v && (r.S.i = r.i), r = r.o;
  }(); xr !== void 0; ) {
    let r = xr;
    for (xr = void 0, Wr++; r !== void 0; ) {
      const o = r.u;
      if (r.u = void 0, r.f &= -3, !(8 & r.f) && Yn(r)) try {
        r.c();
      } catch (n) {
        e || (t = n, e = !0);
      }
      r = o;
    }
  }
  if (Wr = 0, _e--, e) throw t;
}
function Ul(t) {
  if (_e > 0) return t();
  Pa = ++Kl, _e++;
  try {
    return t();
  } finally {
    aa();
  }
}
let st, xr;
function Lo(t) {
  const e = st;
  st = void 0;
  try {
    return t();
  } finally {
    st = e;
  }
}
let Yr, _e = 0, Wr = 0, Kl = 0, Pa = 0, Br = 0;
function Fo(t) {
  if (st === void 0) return;
  let e = t.n;
  return e === void 0 || e.t !== st ? (e = { i: 0, S: t, p: st.s, n: void 0, t: st, e: void 0, x: void 0, r: e }, st.s !== void 0 && (st.s.n = e), st.s = e, t.n = e, 32 & st.f && t.S(e), e) : e.i === -1 ? (e.i = 0, e.n !== void 0 && (e.n.p = e.p, e.p !== void 0 && (e.p.n = e.n), e.p = st.s, e.n = void 0, st.s.n = e, st.s = e), e) : void 0;
}
function jt(t, e) {
  this.v = t, this.i = 0, this.n = void 0, this.t = void 0, this.l = 0, this.W = e == null ? void 0 : e.watched, this.Z = e == null ? void 0 : e.unwatched, this.name = e == null ? void 0 : e.name;
}
function Nr(t, e) {
  return new jt(t, e);
}
function Yn(t) {
  for (let e = t.s; e !== void 0; e = e.n) if (e.S.i !== e.i || !e.S.h() || e.S.i !== e.i) return !0;
  return !1;
}
function Uo(t) {
  for (let e = t.s; e !== void 0; e = e.n) {
    const r = e.S.n;
    if (r !== void 0 && (e.r = r), e.S.n = e, e.i = -1, e.n === void 0) {
      t.s = e;
      break;
    }
  }
}
function Wn(t) {
  let e, r = t.s;
  for (; r !== void 0; ) {
    const o = r.p;
    r.i === -1 ? (r.S.U(r), o !== void 0 && (o.n = r.n), r.n !== void 0 && (r.n.p = o)) : e = r, r.S.n = r.r, r.r !== void 0 && (r.r = void 0), r = o;
  }
  t.s = e;
}
function Fe(t, e) {
  jt.call(this, void 0), this.x = t, this.s = void 0, this.g = Br - 1, this.f = 4, this.W = e == null ? void 0 : e.watched, this.Z = e == null ? void 0 : e.unwatched, this.name = e == null ? void 0 : e.name;
}
function ql(t, e) {
  return new Fe(t, e);
}
function Xn(t) {
  const e = t.m;
  if (t.m = void 0, typeof e == "function") {
    _e++;
    const r = st;
    st = void 0;
    try {
      e();
    } catch (o) {
      throw t.f &= -2, t.f |= 8, io(t), o;
    } finally {
      st = r, aa();
    }
  }
}
function io(t) {
  for (let e = t.s; e !== void 0; e = e.n) e.S.U(e);
  t.x = void 0, t.s = void 0, Xn(t);
}
function Gl(t) {
  if (st !== this) throw new Error("Out-of-order effect");
  Wn(this), st = t, this.f &= -2, 8 & this.f && io(this), aa();
}
function Qe(t, e) {
  this.x = t, this.m = void 0, this.s = void 0, this.u = void 0, this.f = 32, this.name = e == null ? void 0 : e.name;
}
function ve(t, e) {
  const r = new Qe(t, e);
  try {
    r.c();
  } catch (n) {
    throw r.d(), n;
  }
  const o = r.d.bind(r);
  return o[Symbol.dispose] = o, o;
}
function ur(t, e = {}) {
  const r = {};
  for (const o in t) {
    const n = e[o], i = Nr(n === void 0 ? t[o] : n);
    r[o] = i;
  }
  return r;
}
jt.prototype.brand = Fl, jt.prototype.h = function() {
  return !0;
}, jt.prototype.S = function(t) {
  const e = this.t;
  e !== t && t.e === void 0 && (t.x = e, this.t = t, e !== void 0 ? e.e = t : Lo(() => {
    var r;
    (r = this.W) == null || r.call(this);
  }));
}, jt.prototype.U = function(t) {
  if (this.t !== void 0) {
    const e = t.e, r = t.x;
    e !== void 0 && (e.x = r, t.e = void 0), r !== void 0 && (r.e = e, t.x = void 0), t === this.t && (this.t = r, r === void 0 && Lo(() => {
      var o;
      (o = this.Z) == null || o.call(this);
    }));
  }
}, jt.prototype.subscribe = function(t) {
  return ve(() => {
    const e = this.value, r = st;
    st = void 0;
    try {
      t(e);
    } finally {
      st = r;
    }
  }, { name: "sub" });
}, jt.prototype.valueOf = function() {
  return this.value;
}, jt.prototype.toString = function() {
  return this.value + "";
}, jt.prototype.toJSON = function() {
  return this.value;
}, jt.prototype.peek = function() {
  const t = st;
  st = void 0;
  try {
    return this.value;
  } finally {
    st = t;
  }
}, Object.defineProperty(jt.prototype, "value", { get() {
  const t = Fo(this);
  return t !== void 0 && (t.i = this.i), this.v;
}, set(t) {
  if (t !== this.v) {
    if (Wr > 100) throw new Error("Cycle detected");
    (function(e) {
      _e !== 0 && Wr === 0 && e.l !== Pa && (e.l = Pa, Yr = { S: e, v: e.v, i: e.i, o: Yr });
    })(this), this.v = t, this.i++, Br++, _e++;
    try {
      for (let e = this.t; e !== void 0; e = e.x) e.t.N();
    } finally {
      aa();
    }
  }
} }), Fe.prototype = new jt(), Fe.prototype.h = function() {
  if (this.f &= -3, 1 & this.f) return !1;
  if ((36 & this.f) == 32 || (this.f &= -5, this.g === Br)) return !0;
  if (this.g = Br, this.f |= 1, this.i > 0 && !Yn(this)) return this.f &= -2, !0;
  const t = st;
  try {
    Uo(this), st = this;
    const e = this.x();
    (16 & this.f || this.v !== e || this.i === 0) && (this.v = e, this.f &= -17, this.i++);
  } catch (e) {
    this.v = e, this.f |= 16, this.i++;
  }
  return st = t, Wn(this), this.f &= -2, !0;
}, Fe.prototype.S = function(t) {
  if (this.t === void 0) {
    this.f |= 36;
    for (let e = this.s; e !== void 0; e = e.n) e.S.S(e);
  }
  jt.prototype.S.call(this, t);
}, Fe.prototype.U = function(t) {
  if (this.t !== void 0 && (jt.prototype.U.call(this, t), this.t === void 0)) {
    this.f &= -33;
    for (let e = this.s; e !== void 0; e = e.n) e.S.U(e);
  }
}, Fe.prototype.N = function() {
  if (!(2 & this.f)) {
    this.f |= 6;
    for (let t = this.t; t !== void 0; t = t.x) t.t.N();
  }
}, Object.defineProperty(Fe.prototype, "value", { get() {
  if (1 & this.f) throw new Error("Cycle detected");
  const t = Fo(this);
  if (this.h(), t !== void 0 && (t.i = this.i), 16 & this.f) throw this.v;
  return this.v;
} }), Qe.prototype.c = function() {
  const t = this.S();
  try {
    if (8 & this.f || this.x === void 0) return;
    const e = this.x();
    typeof e == "function" && (this.m = e);
  } finally {
    t();
  }
}, Qe.prototype.S = function() {
  if (1 & this.f) throw new Error("Cycle detected");
  this.f |= 1, this.f &= -9, Xn(this), Uo(this), _e++;
  const t = st;
  return st = this, Gl.bind(this, t);
}, Qe.prototype.N = function() {
  2 & this.f || (this.f |= 2, this.u = xr, xr = this);
}, Qe.prototype.d = function() {
  this.f |= 8, 1 & this.f || io(this);
}, Qe.prototype.dispose = function() {
  this.d();
};
se({ build: (t, e, r) => ur(e), config: Xe({ defaultSelection: "rootEnd", disabled: !1 }), name: "@lexical/extension/AutoFocus", register(t, e, r) {
  const o = r.getOutput();
  return ve(() => o.disabled.value ? void 0 : t.registerRootListener((n) => {
    t.focus(() => {
      const i = document.activeElement;
      n === null || i !== null && n.contains(i) || n.focus({ preventScroll: !0 });
    }, { defaultSelection: o.defaultSelection.peek() });
  }));
} });
function Jn() {
  const t = Ae(), e = Xt(), r = zr();
  t.clear(), t.append(r), e !== null && r.select(), me(e) && (e.format = 0);
}
function Zn(t, e = Jn) {
  return t.registerCommand(Dn, (r) => (t.update(e), !0), eo);
}
se({ build: (t, e, r) => ur(e), config: Xe({ $onClear: Jn }), name: "@lexical/extension/ClearEditor", register(t, e, r) {
  const { $onClear: o } = r.getOutput();
  return ve(() => Zn(t, o.value));
} });
function Hl(t) {
  return (typeof t.nodes == "function" ? t.nodes() : t.nodes) || [];
}
const ha = cc("format", { parse: (t) => typeof t == "number" ? t : 0 });
class Qn extends Ma {
  $config() {
    return this.config("decorator-text", { extends: Ma, stateConfigs: [{ flat: !0, stateConfig: ha }] });
  }
  getFormat() {
    return xc(this, ha);
  }
  getFormatFlags(e, r) {
    return $o(this.getFormat(), e, r);
  }
  hasFormat(e) {
    const r = yc[e];
    return (this.getFormat() & r) !== 0;
  }
  setFormat(e) {
    return kc(this, ha, e);
  }
  toggleFormat(e) {
    const r = this.getFormat(), o = $o(r, e, null);
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
  return t instanceof Qn;
}
se({ name: "@lexical/extension/DecoratorText", nodes: () => [Qn], register: (t, e, r) => t.registerCommand(Mn, (o) => {
  const n = Xt();
  if ($n(n) || me(n)) for (const i of n.getNodes()) Yl(i) && i.toggleFormat(o);
  return !1;
}, On) });
function ti(t, e) {
  let r;
  return Nr(t(), { unwatched() {
    r && (r(), r = void 0);
  }, watched() {
    this.value = t(), r = e(this);
  } });
}
const Va = se({ build: (t) => ti(() => t.getEditorState(), (e) => t.registerUpdateListener((r) => {
  e.value = r.editorState;
})), name: "@lexical/extension/EditorState" });
function pt(t, ...e) {
  const r = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const n of e) o.append("v", n);
  throw r.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
function ei(t, e) {
  if (t && e && !Array.isArray(e) && typeof t == "object" && typeof e == "object") {
    const r = t, o = e;
    for (const n in o) r[n] = ei(r[n], o[n]);
    return t;
  }
  return e;
}
const so = 0, ja = 1, ri = 2, ga = 3, Ir = 4, Ze = 5, fa = 6, gr = 7;
function ma(t) {
  return t.id === so;
}
function ai(t) {
  return t.id === ri;
}
function Wl(t) {
  return function(e) {
    return e.id === ja;
  }(t) || pt(305, String(t.id), String(ja)), Object.assign(t, { id: ri });
}
const Xl = /* @__PURE__ */ new Set();
class Jl {
  constructor(e, r) {
    Vt(this, "builder");
    Vt(this, "configs");
    Vt(this, "_dependency");
    Vt(this, "_peerNameSet");
    Vt(this, "extension");
    Vt(this, "state");
    Vt(this, "_signal");
    this.builder = e, this.extension = r, this.configs = /* @__PURE__ */ new Set(), this.state = { id: so };
  }
  mergeConfigs() {
    let e = this.extension.config || {};
    const r = this.extension.mergeConfig ? this.extension.mergeConfig.bind(this.extension) : sc;
    for (const o of this.configs) e = r(e, o);
    return e;
  }
  init(e) {
    const r = this.state;
    ai(r) || pt(306, String(r.id));
    const o = { getDependency: this.getInitDependency.bind(this), getDirectDependentNames: this.getDirectDependentNames.bind(this), getPeer: this.getInitPeer.bind(this), getPeerNameSet: this.getPeerNameSet.bind(this) }, n = { ...o, getDependency: this.getDependency.bind(this), getInitResult: this.getInitResult.bind(this), getPeer: this.getPeer.bind(this) }, i = function(c, d, l) {
      return Object.assign(c, { config: d, id: ga, registerState: l });
    }(r, this.mergeConfigs(), o);
    let s;
    this.state = i, this.extension.init && (s = this.extension.init(e, i.config, o)), this.state = function(c, d, l) {
      return Object.assign(c, { id: Ir, initResult: d, registerState: l });
    }(i, s, n);
  }
  build(e) {
    const r = this.state;
    let o;
    r.id !== Ir && pt(307, String(r.id), String(Ze)), this.extension.build && (o = this.extension.build(e, r.config, r.registerState));
    const n = { ...r.registerState, getOutput: () => o, getSignal: this.getSignal.bind(this) };
    this.state = function(i, s, c) {
      return Object.assign(i, { id: Ze, output: s, registerState: c });
    }(r, o, n);
  }
  register(e, r) {
    this._signal = r;
    const o = this.state;
    o.id !== Ze && pt(308, String(o.id), String(Ze));
    const n = this.extension.register && this.extension.register(e, o.config, o.registerState);
    return this.state = function(i) {
      return Object.assign(i, { id: fa });
    }(o), () => {
      const i = this.state;
      i.id !== gr && pt(309, String(o.id), String(gr)), this.state = function(s) {
        return Object.assign(s, { id: Ze });
      }(i), n && n();
    };
  }
  afterRegistration(e) {
    const r = this.state;
    let o;
    return r.id !== fa && pt(310, String(r.id), String(fa)), this.extension.afterRegistration && (o = this.extension.afterRegistration(e, r.config, r.registerState)), this.state = function(n) {
      return Object.assign(n, { id: gr });
    }(r), o;
  }
  getSignal() {
    return this._signal === void 0 && pt(311), this._signal;
  }
  getInitResult() {
    this.extension.init === void 0 && pt(312, this.extension.name);
    const e = this.state;
    return function(r) {
      return r.id >= Ir;
    }(e) || pt(313, String(e.id), String(Ir)), e.initResult;
  }
  getInitPeer(e) {
    const r = this.builder.extensionNameMap.get(e);
    return r ? r.getExtensionInitDependency() : void 0;
  }
  getExtensionInitDependency() {
    const e = this.state;
    return function(r) {
      return r.id >= ga;
    }(e) || pt(314, String(e.id), String(ga)), { config: e.config };
  }
  getPeer(e) {
    const r = this.builder.extensionNameMap.get(e);
    return r ? r.getExtensionDependency() : void 0;
  }
  getInitDependency(e) {
    const r = this.builder.getExtensionRep(e);
    return r === void 0 && pt(315, this.extension.name, e.name), r.getExtensionInitDependency();
  }
  getDependency(e) {
    const r = this.builder.getExtensionRep(e);
    return r === void 0 && pt(315, this.extension.name, e.name), r.getExtensionDependency();
  }
  getState() {
    const e = this.state;
    return function(r) {
      return r.id >= gr;
    }(e) || pt(316, String(e.id), String(gr)), e;
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
        return r.id >= Ze;
      })(e) || pt(317, this.extension.name), this._dependency = { config: e.config, init: e.initResult, output: e.output };
    }
    return this._dependency;
  }
}
const Ko = { tag: to };
function Zl() {
  const t = Ae();
  t.isEmpty() && t.append(zr());
}
const Ql = se({ config: Xe({ setOptions: Ko, updateOptions: Ko }), init: ({ $initialEditorState: t = Zl }) => ({ $initialEditorState: t, initialized: !1 }), afterRegistration(t, { updateOptions: e, setOptions: r }, o) {
  const n = o.getInitResult();
  if (!n.initialized) {
    n.initialized = !0;
    const { $initialEditorState: i } = n;
    if (uc(i)) t.setEditorState(i, r);
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
}, name: "@lexical/extension/InitialState", nodes: [lc, zn, dc, wc, Tn] }), qo = Symbol.for("@lexical/extension/LexicalBuilder");
function Go() {
}
function td(t) {
  throw t;
}
function Pr(t) {
  return Array.isArray(t) ? t : [t];
}
const va = "0.43.0+prod.esm";
class ar {
  constructor(e) {
    Vt(this, "roots");
    Vt(this, "extensionNameMap");
    Vt(this, "outgoingConfigEdges");
    Vt(this, "incomingEdges");
    Vt(this, "conflicts");
    Vt(this, "_sortedExtensionReps");
    Vt(this, "PACKAGE_VERSION");
    this.outgoingConfigEdges = /* @__PURE__ */ new Map(), this.incomingEdges = /* @__PURE__ */ new Map(), this.extensionNameMap = /* @__PURE__ */ new Map(), this.conflicts = /* @__PURE__ */ new Map(), this.PACKAGE_VERSION = va, this.roots = e;
    for (const r of e) this.addExtension(r);
  }
  static fromExtensions(e) {
    const r = [Pr(Ql)];
    for (const o of e) r.push(Pr(o));
    return new ar(r);
  }
  static maybeFromEditor(e) {
    const r = e[qo];
    return r && (r.PACKAGE_VERSION !== va && pt(292, r.PACKAGE_VERSION, va), r instanceof ar || pt(293)), r;
  }
  static fromEditor(e) {
    const r = ar.maybeFromEditor(e);
    return r === void 0 && pt(294), r;
  }
  constructEditor() {
    const { $initialEditorState: e, onError: r, ...o } = this.buildCreateEditorArgs(), n = Object.assign(En({ ...o, ...r ? { onError: (i) => {
      r(i, n);
    } } : {} }), { [qo]: this });
    for (const i of this.sortedExtensionReps()) i.build(n);
    return n;
  }
  buildEditor() {
    let e = Go;
    function r() {
      try {
        e();
      } finally {
        e = Go;
      }
    }
    const o = Object.assign(this.constructEditor(), { dispose: r, [Symbol.dispose]: r });
    return e = ze(this.registerEditor(o), () => o.setRootElement(null)), o;
  }
  hasExtensionByName(e) {
    return this.extensionNameMap.has(e);
  }
  getExtensionRep(e) {
    const r = this.extensionNameMap.get(e.name);
    if (r) return r.extension !== e && pt(295, e.name), r;
  }
  addEdge(e, r, o) {
    const n = this.outgoingConfigEdges.get(e);
    n ? n.set(r, o) : this.outgoingConfigEdges.set(e, /* @__PURE__ */ new Map([[r, o]]));
    const i = this.incomingEdges.get(r);
    i ? i.add(e) : this.incomingEdges.set(r, /* @__PURE__ */ new Set([e]));
  }
  addExtension(e) {
    this._sortedExtensionReps !== void 0 && pt(296);
    const r = Pr(e), [o] = r;
    typeof o.name != "string" && pt(297, typeof o.name);
    let n = this.extensionNameMap.get(o.name);
    if (n !== void 0 && n.extension !== o && pt(298, o.name), !n) {
      n = new Jl(this, o), this.extensionNameMap.set(o.name, n);
      const i = this.conflicts.get(o.name);
      typeof i == "string" && pt(299, o.name, i);
      for (const s of o.conflictsWith || []) this.extensionNameMap.has(s) && pt(299, o.name, s), this.conflicts.set(s, o.name);
      for (const s of o.dependencies || []) {
        const c = Pr(s);
        this.addEdge(o.name, c[0].name, c.slice(1)), this.addExtension(c);
      }
      for (const [s, c] of o.peerDependencies || []) this.addEdge(o.name, s, c ? [c] : []);
    }
  }
  sortedExtensionReps() {
    if (this._sortedExtensionReps) return this._sortedExtensionReps;
    const e = [], r = (o, n) => {
      let i = o.state;
      if (ai(i)) return;
      const s = o.extension.name;
      var c;
      ma(i) || pt(300, s, n || "[unknown]"), ma(c = i) || pt(304, String(c.id), String(so)), i = Object.assign(c, { id: ja }), o.state = i;
      const d = this.outgoingConfigEdges.get(s);
      if (d) for (const l of d.keys()) {
        const w = this.extensionNameMap.get(l);
        w && r(w, s);
      }
      i = Wl(i), o.state = i, e.push(o);
    };
    for (const o of this.extensionNameMap.values()) ma(o.state) && r(o);
    for (const o of e) for (const [n, i] of this.outgoingConfigEdges.get(o.extension.name) || []) if (i.length > 0) {
      const s = this.extensionNameMap.get(n);
      if (s) for (const c of i) s.configs.add(c);
    }
    for (const [o, ...n] of this.roots) if (n.length > 0) {
      const i = this.extensionNameMap.get(o.name);
      i === void 0 && pt(301, o.name);
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
    return ze(...n);
  }
  buildCreateEditorArgs() {
    const e = {}, r = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map(), i = {}, s = {}, c = this.sortedExtensionReps();
    for (const w of c) {
      const { extension: p } = w;
      if (p.onError !== void 0 && (e.onError = p.onError), p.disableEvents !== void 0 && (e.disableEvents = p.disableEvents), p.parentEditor !== void 0 && (e.parentEditor = p.parentEditor), p.editable !== void 0 && (e.editable = p.editable), p.namespace !== void 0 && (e.namespace = p.namespace), p.$initialEditorState !== void 0 && (e.$initialEditorState = p.$initialEditorState), p.nodes) for (const h of Hl(p)) {
        if (typeof h != "function") {
          const g = o.get(h.replace);
          g && pt(302, p.name, h.replace.name, g.extension.name), o.set(h.replace, w);
        }
        r.add(h);
      }
      if (p.html) {
        if (p.html.export) for (const [h, g] of p.html.export.entries()) n.set(h, g);
        p.html.import && Object.assign(i, p.html.import);
      }
      p.theme && ei(s, p.theme);
    }
    Object.keys(s).length > 0 && (e.theme = s), r.size && (e.nodes = [...r]);
    const d = Object.keys(i).length > 0, l = n.size > 0;
    (d || l) && (e.html = {}, d && (e.html.import = i), l && (e.html.export = n));
    for (const w of c) w.init(e);
    return e.onError || (e.onError = td), e;
  }
}
const ed = /* @__PURE__ */ new Set(), Ho = se({ build(t, e, r) {
  const o = r.getDependency(Va).output, n = Nr({ watchedNodeKeys: /* @__PURE__ */ new Map() }), i = ti(() => {
  }, () => ve(() => {
    const s = i.peek(), { watchedNodeKeys: c } = n.value;
    let d, l = !1;
    o.value.read(() => {
      if (Xt()) for (const [w, p] of c.entries()) {
        if (p.size === 0) {
          c.delete(w);
          continue;
        }
        const h = Nc(w), g = h && h.isSelected() || !1;
        l = l || g !== (!!s && s.has(w)), g && (d = d || /* @__PURE__ */ new Set(), d.add(w));
      }
    }), !l && d && s && d.size === s.size || (i.value = d);
  }));
  return { watchNodeKey: function(s) {
    const c = ql(() => (i.value || ed).has(s)), { watchedNodeKeys: d } = n.peek();
    let l = d.get(s);
    const w = l !== void 0;
    return l = l || /* @__PURE__ */ new Set(), l.add(c), w || (d.set(s, l), n.value = { watchedNodeKeys: d }), c;
  } };
}, dependencies: [Va], name: "@lexical/extension/NodeSelection" }), rd = pc("INSERT_HORIZONTAL_RULE_COMMAND");
class ir extends Ma {
  static getType() {
    return "horizontalrule";
  }
  static clone(e) {
    return new ir(e.__key);
  }
  static importJSON(e) {
    return co().updateFromJSON(e);
  }
  static importDOM() {
    return { hr: () => ({ conversion: ad, priority: 0 }) };
  }
  exportDOM() {
    return { element: document.createElement("hr") };
  }
  createDOM(e) {
    const r = document.createElement("hr");
    return An(r, e.theme.hr), r;
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
  return { node: co() };
}
function co() {
  return _c(ir);
}
function od(t) {
  return t instanceof ir;
}
se({ dependencies: [Va, Ho], name: "@lexical/extension/HorizontalRule", nodes: () => [ir], register(t, e, r) {
  const { watchNodeKey: o } = r.getDependency(Ho).output, n = Nr({ nodeSelections: /* @__PURE__ */ new Map() }), i = t._config.theme.hrSelected ?? "selected";
  return ze(t.registerCommand(rd, (s) => {
    const c = Xt();
    if (!me(c)) return !1;
    if (c.focus.getNode() !== null) {
      const d = co();
      jl(d);
    }
    return !0;
  }, eo), t.registerCommand(hc, (s) => {
    if (gc(s.target)) {
      const c = fc(s.target);
      if (od(c)) return function(d, l = !1) {
        const w = Xt(), p = d.isSelected(), h = d.getKey();
        let g;
        l && $n(w) ? g = w : (g = mc(), vc(g)), p ? g.delete(h) : g.add(h);
      }(c, s.shiftKey), !0;
    }
    return !1;
  }, On), t.registerMutationListener(ir, (s, c) => {
    Ul(() => {
      let d = !1;
      const { nodeSelections: l } = n.peek();
      for (const [w, p] of s.entries()) if (p === "destroyed") l.delete(w), d = !0;
      else {
        const h = l.get(w), g = t.getElementByKey(w);
        h ? h.domNode.value = g : (d = !0, l.set(w, { domNode: Nr(g), selectedSignal: o(w) }));
      }
      d && (n.value = { nodeSelections: l });
    });
  }), ve(() => {
    const s = [];
    for (const { domNode: c, selectedSignal: d } of n.value.nodeSelections.values()) s.push(ve(() => {
      const l = c.value;
      l && (d.value ? An(l, i) : Cc(l, i));
    }));
    return ze(...s);
  }));
} });
se({ build: (t, e) => ur({ inheritEditableFromParent: e.inheritEditableFromParent }), config: Xe({ $getParentEditor: function() {
  const t = bc();
  return ar.fromEditor(t), t;
}, inheritEditableFromParent: !1 }), init: (t, e, r) => {
  const o = e.$getParentEditor();
  t.parentEditor = o, t.theme = t.theme || o._config.theme;
}, name: "@lexical/extension/NestedEditor", register: (t, e, r) => ve(() => {
  const o = t._parentEditor;
  if (o && r.getOutput().inheritEditableFromParent.value) return t.setEditable(o.isEditable()), o.registerEditableListener(t.setEditable.bind(t));
}) });
se({ build: (t, e, r) => ur(e), config: Xe({ disabled: !1, onReposition: void 0 }), name: "@lexical/utils/SelectionAlwaysOnDisplay", register: (t, e, r) => {
  const o = r.getOutput();
  return ve(() => {
    if (!o.disabled.value) return Pl(t, o.onReposition.value);
  });
} });
function oi(t) {
  return t.canBeEmpty();
}
function nd(t, e, r = oi) {
  return ze(t.registerCommand(Ec, (o) => {
    const n = Xt();
    if (!me(n)) return !1;
    o.preventDefault();
    const i = function(s) {
      if (s.getNodes().filter((h) => Tc(h) && h.canIndent()).length > 0) return !0;
      const c = s.anchor, d = s.focus, l = d.isBefore(c) ? d : c, w = l.getNode(), p = Vl(w);
      if (p.canIndent()) {
        const h = p.getKey();
        let g = zc();
        if (g.anchor.set(h, 0, "element"), g.focus.set(h, 0, "element"), g = Sc(g), g.anchor.is(l)) return !0;
      }
      return !1;
    }(n) ? o.shiftKey ? Rc : Oo : Dc;
    return t.dispatchCommand(i, void 0);
  }, eo), t.registerCommand(Oo, () => {
    const o = typeof e == "number" ? e : e ? e.peek() : null, n = Xt();
    if (!me(n)) return !1;
    const i = typeof r == "function" ? r : r.peek();
    return Ll((s) => {
      if (i(s)) {
        const c = s.getIndent() + 1;
        (!o || c < o) && s.setIndent(c);
      }
    });
  }, ro));
}
se({ build: (t, e, r) => ur(e), config: Xe({ $canIndent: oi, disabled: !1, maxIndent: null }), name: "@lexical/extension/TabIndentation", register(t, e, r) {
  const { disabled: o, maxIndent: n, $canIndent: i } = r.getOutput();
  return ve(() => {
    if (!o.value) return nd(t, n, i);
  });
} });
const id = se({ name: "@lexical/react/ReactProvider" });
function sd() {
  return Ae().getTextContent();
}
function cd(t, e = !0) {
  if (t) return !1;
  let r = sd();
  return e && (r = r.trim()), r === "";
}
function ld(t) {
  if (!cd(t, !1)) return !1;
  const e = Ae().getChildren(), r = e.length;
  if (r > 1) return !1;
  for (let o = 0; o < r; o++) {
    const n = e[o];
    if (Mc(n)) return !1;
    if (_r(n)) {
      if (!$c(n) || n.__indent !== 0) return !1;
      const i = n.getChildren(), s = i.length;
      for (let c = 0; c < s; c++) {
        const d = i[o];
        if (!$a(d)) return !1;
      }
    }
  }
  return !0;
}
function ni(t) {
  return () => ld(t);
}
function ii(t) {
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
            const [l, w, p, h, g] = d;
            t.update(() => {
              const f = Xt();
              if (me(f)) {
                const x = f.anchor;
                let v = x.getNode(), C = 0, N = 0;
                if ($a(v) && l >= 0 && w >= 0 && (C = l, N = l + w, f.setTextNodeRange(v, C, v, N)), C === N && p === "" || (f.insertRawText(p), v = x.getNode()), $a(v)) {
                  C = h, N = h + g;
                  const k = v.getTextContentSize();
                  C = C > k ? k : C, N = N > k ? k : N, f.setTextNodeRange(v, C, v, N);
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
se({ build: (t, e, r) => ur(e), config: Xe({ disabled: typeof window > "u" }), name: "@lexical/dragon", register: (t, e, r) => ve(() => r.getOutput().disabled.value ? void 0 : ii(t)) });
function dd(t, ...e) {
  const r = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const n of e) o.append("v", n);
  throw r.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
const lo = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? qt : X;
function wd({ editor: t, ErrorBoundary: e }) {
  return function(r, o) {
    const [n, i] = _(() => r.getDecorators());
    return lo(() => r.registerDecoratorListener((s) => {
      Vc(() => {
        i(s);
      });
    }), [r]), X(() => {
      i(r.getDecorators());
    }, [r]), I(() => {
      const s = [], c = Object.keys(n);
      for (let d = 0; d < c.length; d++) {
        const l = c[d], w = a(o, { onError: (h) => r._onError(h), children: a(Ys, { fallback: null, children: n[l] }) }), p = r.getElementByKey(l);
        p !== null && s.push(jc(w, p, l));
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
function Yo(t) {
  return t.getEditorState().read(ni(t.isComposing()));
}
function pd({ contentEditable: t, placeholder: e = null, ErrorBoundary: r }) {
  const [o] = xe();
  return function(n) {
    lo(() => ze(Pc(n), ii(n)), [n]);
  }(o), u(dt, { children: [t, a(hd, { content: e }), a(ud, { editor: o, ErrorBoundary: r })] });
}
function hd({ content: t }) {
  const [e] = xe(), r = function(n) {
    const [i, s] = _(() => Yo(n));
    return lo(() => {
      function c() {
        const d = Yo(n);
        s(d);
      }
      return c(), ze(n.registerUpdateListener(() => {
        c();
      }), n.registerEditableListener(() => {
        c();
      }));
    }, [n]), i;
  }(e), o = Rl();
  return r ? typeof t == "function" ? t(o) : t : null;
}
function gd({ defaultSelection: t }) {
  const [e] = xe();
  return X(() => {
    e.focus(() => {
      const r = document.activeElement, o = e.getRootElement();
      o === null || r !== null && o.contains(r) || o.focus({ preventScroll: !0 });
    }, { defaultSelection: t });
  }, [t, e]), null;
}
const fd = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? qt : X;
function md({ onClear: t }) {
  const [e] = xe();
  return fd(() => Zn(e, t), [e, t]), null;
}
const si = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? qt : X;
function vd({ editor: t, ariaActiveDescendant: e, ariaAutoComplete: r, ariaControls: o, ariaDescribedBy: n, ariaErrorMessage: i, ariaExpanded: s, ariaInvalid: c, ariaLabel: d, ariaLabelledBy: l, ariaMultiline: w, ariaOwns: p, ariaRequired: h, autoCapitalize: g, className: f, id: x, role: v = "textbox", spellCheck: C = !0, style: N, tabIndex: k, "data-testid": M, ...j }, S) {
  const [P, $] = _(t.isEditable()), E = L((O) => {
    O && O.ownerDocument && O.ownerDocument.defaultView ? t.setRootElement(O) : t.setRootElement(null);
  }, [t]), B = I(() => /* @__PURE__ */ function(...O) {
    return (T) => {
      for (const G of O) typeof G == "function" ? G(T) : G != null && (G.current = T);
    };
  }(S, E), [E, S]);
  return si(() => ($(t.isEditable()), t.registerEditableListener((O) => {
    $(O);
  })), [t]), a("div", { "aria-activedescendant": P ? e : void 0, "aria-autocomplete": P ? r : "none", "aria-controls": P ? o : void 0, "aria-describedby": n, ...i != null ? { "aria-errormessage": i } : {}, "aria-expanded": P && v === "combobox" ? !!s : void 0, ...c != null ? { "aria-invalid": c } : {}, "aria-label": d, "aria-labelledby": l, "aria-multiline": w, "aria-owns": P ? p : void 0, "aria-readonly": !P || void 0, "aria-required": h, autoCapitalize: g, className: f, contentEditable: P, "data-testid": M, id: x, ref: B, role: v, spellCheck: C, style: N, tabIndex: k, ...j });
}
const bd = _n(vd);
function Wo(t) {
  return t.getEditorState().read(ni(t.isComposing()));
}
const xd = _n(yd);
function yd(t, e) {
  const { placeholder: r, ...o } = t, [n] = xe();
  return u(dt, { children: [a(bd, { editor: n, ...o, ref: e }), r != null && a(kd, { editor: n, content: r })] });
}
function kd({ content: t, editor: e }) {
  const r = function(s) {
    const [c, d] = _(() => Wo(s));
    return si(() => {
      function l() {
        const w = Wo(s);
        d(w);
      }
      return l(), ze(s.registerUpdateListener(() => {
        l();
      }), s.registerEditableListener(() => {
        l();
      }));
    }, [s]), c;
  }(e), [o, n] = _(e.isEditable());
  if (qt(() => (n(e.isEditable()), e.registerEditableListener((s) => {
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
const ci = Za(void 0);
function Nd({
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
  return /* @__PURE__ */ a(ci.Provider, { value: s, children: i });
}
function li() {
  const t = kn(ci);
  if (!t)
    throw new Error("useToolbarContext must be used within a ToolbarContext provider");
  return t;
}
function Cd() {
  const [t, e] = _(void 0), r = L(() => {
    e(void 0);
  }, []), o = I(() => {
    if (t === void 0)
      return;
    const { title: i, content: s } = t;
    return /* @__PURE__ */ a(_a, { open: !0, onOpenChange: r, children: /* @__PURE__ */ u(Na, { children: [
      /* @__PURE__ */ a(Ca, { children: /* @__PURE__ */ a(Ea, { children: i }) }),
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
function Ed({
  children: t
}) {
  const [e] = xe(), [r, o] = _(e), [n, i] = _("paragraph"), [s, c] = Cd(), d = () => {
  };
  return X(() => r.registerCommand(
    In,
    (l, w) => (o(w), !1),
    ro
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
  const [e] = xe(), { activeEditor: r } = li();
  X(() => r.registerCommand(
    In,
    () => {
      const o = Xt();
      return o && t(o), !1;
    },
    ro
  ), [e, t]), X(() => {
    r.getEditorState().read(() => {
      const o = Xt();
      o && t(o);
    });
  }, [r, t]);
}
const zd = ea(
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
), di = Rt.createContext({
  size: "default",
  variant: "default",
  spacing: 0,
  orientation: "horizontal"
});
function wi({
  className: t,
  variant: e,
  size: r,
  spacing: o = 0,
  orientation: n = "horizontal",
  children: i,
  ...s
}) {
  const c = ie();
  return /* @__PURE__ */ a(
    Cn.Root,
    {
      "data-slot": "toggle-group",
      "data-variant": e,
      "data-size": r,
      "data-spacing": o,
      "data-orientation": n,
      style: { "--gap": o },
      className: m(
        "pr-twp tw:group/toggle-group tw:flex tw:w-fit tw:flex-row tw:items-center tw:gap-[--spacing(var(--gap))] tw:rounded-lg tw:data-[size=sm]:rounded-[min(var(--tw-radius-md),10px)] tw:data-vertical:flex-col tw:data-vertical:items-stretch",
        t
      ),
      dir: c,
      ...s,
      children: /* @__PURE__ */ a(
        di.Provider,
        {
          value: Rt.useMemo(
            () => ({ variant: e, size: r, spacing: o, orientation: n }),
            [e, r, o, n]
          ),
          children: i
        }
      )
    }
  );
}
function Lr({
  className: t,
  children: e,
  variant: r = "default",
  size: o = "default",
  ...n
}) {
  const i = Rt.useContext(di);
  return /* @__PURE__ */ a(
    Cn.Item,
    {
      "data-slot": "toggle-group-item",
      "data-variant": i.variant || r,
      "data-size": i.size || o,
      "data-spacing": i.spacing,
      className: m(
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
const Xo = [
  { format: "bold", icon: ss, label: "Bold" },
  { format: "italic", icon: cs, label: "Italic" }
  // CUSTOM: TJ removed underline and strikethrough as they are not supported by the current comment
  // data conversion and are not in P9 anyway. We can add these back if we ever get this supported.
  /* { format: 'underline', icon: UnderlineIcon, label: 'Underline' },
  { format: 'strikethrough', icon: StrikethroughIcon, label: 'Strikethrough' }, */
];
function Sd() {
  const { activeEditor: t } = li(), [e, r] = _([]), o = L((n) => {
    if (me(n) || Bc(n)) {
      const i = [];
      Xo.forEach(({ format: s }) => {
        n.hasFormat(s) && i.push(s);
      }), r((s) => s.length !== i.length || !i.every((c) => s.includes(c)) ? i : s);
    }
  }, []);
  return Td(o), /* @__PURE__ */ a(
    wi,
    {
      type: "multiple",
      value: e,
      onValueChange: r,
      variant: "outline",
      size: "sm",
      children: Xo.map(({ format: n, icon: i, label: s }) => /* @__PURE__ */ a(
        Lr,
        {
          value: n,
          "aria-label": s,
          onClick: () => {
            t.dispatchCommand(Mn, n);
          },
          children: /* @__PURE__ */ a(i, { className: "tw:h-4 tw:w-4" })
        },
        n
      ))
    }
  );
}
function Rd({ onClear: t }) {
  const [e] = xe();
  X(() => {
    t && t(() => {
      e.dispatchCommand(Dn, void 0);
    });
  }, [e, t]);
}
function Dd({
  placeholder: t = "Start typing ...",
  autoFocus: e = !1,
  onClear: r
}) {
  const [, o] = _(void 0);
  return /* @__PURE__ */ u("div", { className: "tw:relative", children: [
    /* @__PURE__ */ a(Ed, { children: () => /* @__PURE__ */ a("div", { className: "tw:sticky tw:top-0 tw:z-10 tw:flex tw:gap-2 tw:overflow-auto tw:border-b tw:p-1", children: /* @__PURE__ */ a(Sd, {}) }) }),
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
      /* @__PURE__ */ a(Rd, { onClear: r }),
      /* @__PURE__ */ a(md, {})
    ] })
  ] });
}
const Md = {
  namespace: "commentEditor",
  theme: oo,
  nodes: no,
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
        className: m(
          "pr-twp tw:overflow-hidden tw:rounded-lg tw:border tw:bg-background tw:shadow",
          c
        ),
        children: /* @__PURE__ */ a(
          yl,
          {
            initialConfig: {
              ...Md,
              ...t ? { editorState: t } : {},
              ...e ? { editorState: JSON.stringify(e) } : {}
            },
            children: /* @__PURE__ */ u(Gt, { children: [
              /* @__PURE__ */ a(Dd, { placeholder: n, autoFocus: i, onClear: s }),
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
function ne(t) {
  var e;
  return (e = t == null ? void 0 : t.root) != null && e.children ? pi(t.root.children) : !1;
}
function $d(t) {
  if (!t || t.trim() === "")
    throw new Error("Input HTML is empty");
  const e = Pn({
    namespace: "EditorUtils",
    theme: oo,
    nodes: no,
    onError: (o) => {
      console.error(o);
    }
  });
  let r;
  if (e.update(
    () => {
      const n = new DOMParser().parseFromString(t, "text/html"), i = Fc(e, n);
      Ae().clear(), Oc(i);
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
  const e = Pn({
    namespace: "EditorUtils",
    theme: oo,
    nodes: no,
    onError: (n) => {
      console.error(n);
    }
  }), r = e.parseEditorState(JSON.stringify(t));
  e.setEditorState(r);
  let o = "";
  return e.getEditorState().read(() => {
    o = Lc(e);
  }), o = o.replace(/\s+style="[^"]*"/g, "").replace(/\s+class="[^"]*"/g, "").replace(/<span>(.*?)<\/span>/g, "$1").replace(/<b><strong[^>]*>(.*?)<\/strong><\/b>/g, "<b>$1</b>").replace(/<strong><b[^>]*>(.*?)<\/b><\/strong>/g, "<b>$1</b>").replace(/<i><em[^>]*>(.*?)<\/em><\/i>/g, "<i>$1</i>").replace(/<em><i[^>]*>(.*?)<\/i><\/em>/g, "<i>$1</i>").replace(/<u><span[^>]*>(.*?)<\/span><\/u>/g, "<u>$1</u>").replace(/<s><span[^>]*>(.*?)<\/span><\/s>/g, "<s>$1</s>").replace(/<br\s*\/?>/gi, "<br/>"), o;
}
function wo(t) {
  return ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Home", "End"].includes(t.key) ? (t.stopPropagation(), !0) : !1;
}
const hi = Object.freeze([
  "%cancelButton_tooltip%",
  "%acceptButton_tooltip%"
]), Jo = (t, e) => t[e] ?? e;
function gi({
  onCancelClick: t,
  onAcceptClick: e,
  canAccept: r = !0,
  localizedStrings: o = {},
  className: n = "tw:h-6 tw:w-6",
  acceptLabel: i
}) {
  const s = Jo(o, "%cancelButton_tooltip%"), c = i ?? Jo(o, "%acceptButton_tooltip%");
  return /* @__PURE__ */ u(Ka, { children: [
    /* @__PURE__ */ a(Gt, { children: /* @__PURE__ */ u(Ht, { children: [
      /* @__PURE__ */ a(Yt, { asChild: !0, children: /* @__PURE__ */ a(
        q,
        {
          "aria-label": s,
          className: n,
          size: "icon",
          onClick: t,
          variant: "secondary",
          children: /* @__PURE__ */ a(Xa, {})
        }
      ) }),
      /* @__PURE__ */ a(Wt, { children: /* @__PURE__ */ a("p", { children: s }) })
    ] }) }),
    /* @__PURE__ */ a(wn, {}),
    /* @__PURE__ */ a(Gt, { children: /* @__PURE__ */ u(Ht, { children: [
      /* @__PURE__ */ a(Yt, { asChild: !0, children: /* @__PURE__ */ a(
        q,
        {
          "aria-label": c,
          className: n,
          size: "icon",
          onClick: e,
          disabled: !r,
          children: /* @__PURE__ */ a(or, {})
        }
      ) }),
      /* @__PURE__ */ a(Wt, { children: /* @__PURE__ */ a("p", { children: c }) })
    ] }) })
  ] });
}
const Od = "verseText", Zu = Object.freeze([
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
  return (t == null ? void 0 : t.conflictType) === Od;
}
function vi(t) {
  return t === "replaced" ? "reject" : t === "merged" ? "merged" : "accept";
}
function Fr(t, e) {
  return t === "" ? e["%comment_assign_unassigned%"] ?? "Unassigned" : t === "Team" ? e["%comment_assign_team%"] ?? "Team" : t;
}
function uo(t) {
  const e = qa();
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
function ba(t, e) {
  return t === "" ? e["%commentEditor_unassigned%"] ?? "Unassigned" : t === "Team" ? e["%commentEditor_team%"] ?? "Team" : t;
}
function Qu({
  assignableUsers: t,
  onSave: e,
  onClose: r,
  localizedStrings: o,
  initialAssignedUser: n
}) {
  const [i, s] = _(Ad), [c, d] = _(n), [l, w] = _(!1), p = U(void 0), h = U(null);
  X(() => {
    let v = !0;
    const C = h.current;
    if (!C) return;
    const N = setTimeout(() => {
      v && ui(C);
    }, 300);
    return () => {
      v = !1, clearTimeout(N);
    };
  }, []);
  const g = L(() => {
    if (!ne(i)) return;
    const v = Jr(i);
    e(v, c);
  }, [i, e, c]), f = o["%commentEditor_placeholder%"] ?? "Type your comment here...", x = o["%commentEditor_assignTo_label%"] ?? "Assign to";
  return /* @__PURE__ */ u("div", { className: "pr-twp tw:grid tw:gap-3", children: [
    /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:justify-between", children: [
      /* @__PURE__ */ a("span", { className: "tw:text-sm tw:font-medium", children: x }),
      /* @__PURE__ */ a(
        gi,
        {
          onCancelClick: r,
          onAcceptClick: g,
          canAccept: ne(i),
          localizedStrings: o,
          acceptLabel: o["%commentEditor_saveButton_tooltip%"]
        }
      )
    ] }),
    /* @__PURE__ */ a("div", { className: "tw:flex tw:items-center tw:gap-2", children: /* @__PURE__ */ u(Pe, { open: l, onOpenChange: w, children: [
      /* @__PURE__ */ a(He, { asChild: !0, children: /* @__PURE__ */ u(
        q,
        {
          variant: "outline",
          className: "tw:flex tw:w-full tw:items-center tw:justify-start tw:gap-2",
          disabled: t.length === 0,
          children: [
            /* @__PURE__ */ a(fn, { className: "tw:h-4 tw:w-4" }),
            /* @__PURE__ */ a("span", { children: ba(c !== void 0 ? c : "", o) })
          ]
        }
      ) }),
      /* @__PURE__ */ a(
        Ve,
        {
          className: "tw:w-auto tw:p-0",
          align: "start",
          onKeyDown: (v) => {
            v.key === "Escape" && (v.stopPropagation(), w(!1));
          },
          children: /* @__PURE__ */ a(Ye, { children: /* @__PURE__ */ a(We, { children: t.map((v) => /* @__PURE__ */ a(
            Ie,
            {
              onSelect: () => {
                d(v || void 0), w(!1);
              },
              className: "tw:flex tw:items-center",
              children: /* @__PURE__ */ a("span", { children: ba(v, o) })
            },
            v || "unassigned"
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
        onKeyDownCapture: (v) => {
          v.key === "Escape" ? (v.preventDefault(), v.stopPropagation(), r()) : uo(v) && (v.preventDefault(), v.stopPropagation(), ne(i) && g());
        },
        onKeyDown: (v) => {
          wo(v), (v.key === "Enter" || v.key === " ") && v.stopPropagation();
        },
        children: /* @__PURE__ */ a(
          Xr,
          {
            editorSerializedState: i,
            onSerializedChange: (v) => s(v),
            placeholder: f,
            onClear: (v) => {
              p.current = v;
            }
          }
        )
      }
    )
  ] });
}
const tp = Object.freeze([
  "%commentEditor_placeholder%",
  "%commentEditor_assignTo_label%",
  "%commentEditor_saveButton_tooltip%",
  "%commentEditor_unassigned%",
  "%commentEditor_team%",
  ...hi
]), ep = Object.freeze([
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
function Id({
  className: t,
  size: e = "default",
  ...r
}) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "card",
      "data-size": e,
      className: m(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:group/card tw:flex tw:flex-col tw:gap-4 tw:overflow-hidden tw:rounded-xl tw:bg-card tw:py-4 tw:text-sm tw:text-card-foreground tw:ring-1 tw:ring-foreground/10 tw:has-data-[slot=card-footer]:pb-0 tw:has-[>img:first-child]:pt-0 tw:data-[size=sm]:gap-3 tw:data-[size=sm]:py-3 tw:data-[size=sm]:has-data-[slot=card-footer]:pb-0 tw:*:[img:first-child]:rounded-t-xl tw:*:[img:last-child]:rounded-b-xl",
        t
      ),
      ...r
    }
  );
}
function rp({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "card-header",
      className: m(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:group/card-header tw:@container/card-header tw:grid tw:auto-rows-min tw:items-start tw:gap-1 tw:rounded-t-xl tw:px-4 tw:group-data-[size=sm]/card:px-3 tw:has-data-[slot=card-action]:grid-cols-[1fr_auto] tw:has-data-[slot=card-description]:grid-rows-[auto_auto] tw:[.border-b]:pb-4 tw:group-data-[size=sm]/card:[.border-b]:pb-3",
        t
      ),
      ...e
    }
  );
}
function ap({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "card-title",
      className: m(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:font-heading tw:text-base tw:leading-snug tw:font-medium tw:group-data-[size=sm]/card:text-sm",
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
      "data-slot": "card-description",
      className: m(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:text-sm tw:text-muted-foreground",
        t
      ),
      ...e
    }
  );
}
function Pd({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "card-content",
      className: m(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:px-4 tw:group-data-[size=sm]/card:px-3",
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
      "data-slot": "card-footer",
      className: m(
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
    Qa.Root,
    {
      "data-slot": "avatar",
      "data-size": e,
      className: m(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:group/avatar tw:relative tw:flex tw:size-8 tw:shrink-0 tw:rounded-full tw:select-none tw:after:absolute tw:after:inset-0 tw:after:rounded-full tw:after:border tw:after:border-border tw:after:mix-blend-darken tw:data-[size=lg]:size-10 tw:data-[size=sm]:size-6 tw:dark:after:mix-blend-lighten",
        t
      ),
      ...r
    }
  );
}
function ip({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    Qa.Image,
    {
      "data-slot": "avatar-image",
      className: m(
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
    Qa.Fallback,
    {
      "data-slot": "avatar-fallback",
      className: m(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:flex tw:size-full tw:items-center tw:justify-center tw:rounded-full tw:bg-muted tw:text-sm tw:text-muted-foreground tw:group-data-[size=sm]/avatar:text-xs",
        t
      ),
      ...e
    }
  );
}
function Zo({
  comment: t,
  isReply: e = !1,
  localizedStrings: r,
  isThreadExpanded: o = !1,
  handleUpdateComment: n,
  handleDeleteComment: i,
  onEditingChange: s,
  canEditOrDelete: c = !1
}) {
  const [d, l] = _(!1), [w, p] = _(), h = U(null);
  X(() => {
    if (!d) return;
    let S = !0;
    const P = h.current;
    if (!P) return;
    const $ = setTimeout(() => {
      S && ui(P);
    }, 300);
    return () => {
      S = !1, clearTimeout($);
    };
  }, [d]);
  const g = L(
    (S) => {
      S && S.stopPropagation(), l(!1), p(void 0), s == null || s(!1);
    },
    [s]
  ), f = L(
    async (S) => {
      if (S && S.stopPropagation(), !w || !n) return;
      await n(
        t.id,
        Jr(w)
      ) && (l(!1), p(void 0), s == null || s(!1));
    },
    [w, n, t.id, s]
  ), x = I(() => {
    const S = new Date(t.date), P = Vs(
      S,
      r["%comment_date_today%"],
      r["%comment_date_yesterday%"]
    ), $ = S.toLocaleTimeString(void 0, {
      hour: "numeric",
      minute: "2-digit"
    });
    return qe(r["%comment_dateAtTime%"], {
      date: P,
      time: $
    });
  }, [t.date, r]), v = I(() => t.user, [t.user]), C = I(
    () => t.user.split(" ").map((S) => S[0]).join("").toUpperCase().slice(0, 2),
    [t.user]
  ), N = I(() => Ja(t.contents), [t.contents]), k = I(
    () => t.contents.replace(/<[^>]*>/g, "").trim().length > 0,
    [t.contents]
  ), M = !!t.conflictResolutionAction && !k, j = I(() => {
    if (o && c)
      return /* @__PURE__ */ u(dt, { children: [
        /* @__PURE__ */ u(
          Ke,
          {
            onClick: (S) => {
              S.stopPropagation(), l(!0), p($d(t.contents)), s == null || s(!0);
            },
            children: [
              /* @__PURE__ */ a(ls, { className: "tw:me-2 tw:h-4 tw:w-4" }),
              r["%comment_editComment%"]
            ]
          }
        ),
        /* @__PURE__ */ u(
          Ke,
          {
            onClick: async (S) => {
              S.stopPropagation(), i && await i(t.id);
            },
            children: [
              /* @__PURE__ */ a(ds, { className: "tw:me-2 tw:h-4 tw:w-4" }),
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
      className: m("tw:flex tw:w-full tw:flex-row tw:items-baseline tw:gap-3 tw:space-y-3", {
        "tw:text-sm": e
      }),
      children: [
        /* @__PURE__ */ a(Vd, { className: "tw:h-8 tw:w-8", children: /* @__PURE__ */ a(jd, { className: "tw:text-xs tw:font-medium", children: C }) }),
        /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-1 tw:flex-col tw:gap-2", children: [
          /* @__PURE__ */ u("div", { className: "tw:flex tw:w-full tw:flex-row tw:flex-wrap tw:items-baseline tw:gap-x-2", children: [
            /* @__PURE__ */ a("p", { className: "tw:text-sm tw:font-medium", children: v }),
            /* @__PURE__ */ a("p", { className: "tw:text-xs tw:font-normal tw:text-muted-foreground", children: x }),
            /* @__PURE__ */ a("div", { className: "tw:flex-1" }),
            e && t.assignedUser !== void 0 && /* @__PURE__ */ u(yr, { variant: "secondary", className: "tw:text-xs tw:font-normal", children: [
              "→ ",
              Fr(t.assignedUser, r)
            ] })
          ] }),
          d && /* @__PURE__ */ u(
            "div",
            {
              role: "textbox",
              tabIndex: -1,
              className: "tw:flex tw:flex-col tw:gap-2",
              ref: h,
              onKeyDownCapture: (S) => {
                S.key === "Escape" ? (S.preventDefault(), S.stopPropagation(), g()) : uo(S) && (S.preventDefault(), S.stopPropagation(), ne(w) && f());
              },
              onKeyDown: (S) => {
                wo(S), (S.key === "Enter" || S.key === " ") && S.stopPropagation();
              },
              onClick: (S) => {
                S.stopPropagation();
              },
              children: [
                /* @__PURE__ */ a(
                  Xr,
                  {
                    className: m(
                      // Don't render blockquote on the first child. All comments are wrapped in blockquote
                      // that has text-align corresponding to LTR or RTL, so the blockquote is important.
                      // But we don't want it to look like there's a blockquote there. Target the
                      // lowest-level Lexical editor element by attribute so Tailwind can apply styles to
                      // the blockquote directly inside the editor.
                      'tw:[&_[data-lexical-editor="true"]>blockquote]:mt-0 tw:[&_[data-lexical-editor="true"]>blockquote]:border-s-0 tw:[&_[data-lexical-editor="true"]>blockquote]:ps-0 tw:[&_[data-lexical-editor="true"]>blockquote]:font-normal tw:[&_[data-lexical-editor="true"]>blockquote]:not-italic tw:[&_[data-lexical-editor="true"]>blockquote]:text-foreground'
                    ),
                    editorSerializedState: w,
                    onSerializedChange: (S) => p(S)
                  }
                ),
                /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-row tw:items-start tw:justify-end tw:gap-2", children: [
                  /* @__PURE__ */ a(
                    q,
                    {
                      size: "icon",
                      onClick: g,
                      variant: "outline",
                      className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                      children: /* @__PURE__ */ a(Xa, {})
                    }
                  ),
                  /* @__PURE__ */ a(
                    q,
                    {
                      size: "icon",
                      onClick: f,
                      className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                      disabled: !ne(w),
                      children: /* @__PURE__ */ a(mn, {})
                    }
                  )
                ] })
              ]
            }
          ),
          !d && /* @__PURE__ */ u(dt, { children: [
            t.status === "Resolved" && !M && /* @__PURE__ */ a("div", { className: "tw:text-sm tw:italic", children: r["%comment_status_resolved%"] }),
            t.status === "Todo" && e && /* @__PURE__ */ a("div", { className: "tw:text-sm tw:italic", children: r["%comment_status_todo%"] }),
            M ? (
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
                className: m(
                  // Shared note-body prose/blockquote treatment (also used by conflict-diff's
                  // DIFF_HTML_CLASSES). Layer this comment item's own extras on top: items-start +
                  // gap-2 for layout, and line-clamp while the thread is collapsed.
                  fi,
                  "tw:items-start tw:gap-2",
                  {
                    "tw:line-clamp-3": !o
                  }
                ),
                dangerouslySetInnerHTML: { __html: N }
              }
            )
          ] })
        ] }),
        j && /* @__PURE__ */ u(Ce, { children: [
          /* @__PURE__ */ a(Ee, { asChild: !0, children: /* @__PURE__ */ a(q, { variant: "ghost", size: "icon", children: /* @__PURE__ */ a(ws, {}) }) }),
          /* @__PURE__ */ a(Te, { align: "end", children: j })
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
      q,
      {
        variant: "ghost",
        size: "icon",
        disabled: e,
        className: m(
          "tw:ms-auto",
          "tw:text-primary tw:transition-opacity tw:duration-200 tw:hover:bg-primary/10",
          "tw:opacity-0 tw:group-hover:opacity-100"
        ),
        onClick: (n) => {
          n.stopPropagation(), r();
        },
        "aria-label": o,
        children: /* @__PURE__ */ a(or, { className: "tw:h-4 tw:w-4" })
      }
    );
}
const Qo = {
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
  threadId: d,
  thread: l,
  threadStatus: w,
  handleAddCommentToThread: p,
  handleUpdateComment: h,
  handleDeleteComment: g,
  handleReadStatusChange: f,
  assignableUsers: x,
  canUserAddCommentToThread: v,
  canUserAssignThreadCallback: C,
  canUserResolveThreadCallback: N,
  canUserEditOrDeleteCommentCallback: k,
  isRead: M = !1,
  autoReadDelay: j = 5,
  onVerseRefClick: S,
  initialAssignedUser: P,
  activeComments: $,
  rootContentSlot: E,
  resolveActionSlot: B,
  spaceRootContentFromReplies: O = !1
}) {
  const [T, G] = _(Qo), [H, F] = _(), [V, R] = _(), Z = o, [rt, Ct] = _(!1), [Et, At] = _(!1), [K, at] = _(!1), [gt, wt] = _(!1), [bt, pe] = _(!1), [ct, Lt] = _(M), [xt, re] = _(!1), Jt = U(void 0), [z, It] = _(/* @__PURE__ */ new Map());
  X(() => {
    let y = !0;
    return (async () => {
      const tt = N ? await N(d) : !1;
      y && pe(tt);
    })(), () => {
      y = !1;
    };
  }, [d, N]), X(() => {
    let y = !0;
    if (!o) {
      wt(!1), It(/* @__PURE__ */ new Map());
      return;
    }
    return (async () => {
      const tt = C ? await C(d) : !1;
      y && wt(tt);
    })(), () => {
      y = !1;
    };
  }, [o, d, C]);
  const yt = U("idle");
  X(() => {
    if (!o) {
      yt.current !== "idle" && (F(void 0), R(void 0), yt.current = "idle");
      return;
    }
    yt.current === "idle" && (yt.current = "pending"), gt ? yt.current === "pending" && P !== void 0 && // Skip pre-population if the thread is already assigned to this user — doing so
    // would show "Assigning to: Alice" and enable the submit button for a no-op call.
    P !== i && (F(P), yt.current = "auto-populated") : yt.current === "auto-populated" && (F(void 0), yt.current = "pending");
  }, [o, P, gt, i]);
  const _t = I(
    () => $ ?? e.filter((y) => !y.deleted),
    [$, e]
  );
  X(() => {
    let y = !0;
    if (!o || !k) {
      It(/* @__PURE__ */ new Map());
      return;
    }
    return (async () => {
      const tt = /* @__PURE__ */ new Map();
      await Promise.all(
        _t.map(async (lt) => {
          const mt = await k(lt.id);
          y && tt.set(lt.id, mt);
        })
      ), y && It(tt);
    })(), () => {
      y = !1;
    };
  }, [o, _t, k]);
  const ae = I(() => _t[0], [_t]), Se = U(null), he = U(void 0), ce = L(() => {
    var y;
    (y = he.current) == null || y.call(he), G(Qo);
  }, []), le = L(() => {
    const y = !ct;
    Lt(y), re(!y), f == null || f(d, y);
  }, [ct, f, d]);
  X(() => {
    Ct(!1);
  }, [o]), X(() => {
    if (o && !ct && !xt) {
      const y = setTimeout(() => {
        Lt(!0), f == null || f(d, !0);
      }, j * 1e3);
      return Jt.current = y, () => clearTimeout(y);
    }
    Jt.current && (clearTimeout(Jt.current), Jt.current = void 0);
  }, [o, ct, xt, j, d, f]);
  const Tt = I(
    () => ({
      singleReply: r["%comment_thread_single_reply%"],
      multipleReplies: r["%comment_thread_multiple_replies%"]
    }),
    [r]
  ), Mt = I(() => {
    if (i === void 0)
      return;
    if (i === "")
      return r["%comment_assign_unassigned%"] ?? "Unassigned";
    const y = Fr(i, r);
    return qe(r["%comment_assigned_to%"], {
      assignedUser: y
    });
  }, [i, r]), Zt = I(() => _t.slice(1), [_t]), zt = I(() => Zt.length ?? 0, [Zt.length]), Ft = I(() => zt > 0, [zt]), Qt = I(() => rt || zt <= 2 ? Zt : Zt.slice(-2), [Zt, zt, rt]), D = I(() => rt || zt <= 2 ? 0 : zt - 2, [zt, rt]), J = I(
    () => zt === 1 ? Tt.singleReply : qe(Tt.multipleReplies, { count: zt }),
    [zt, Tt]
  ), ut = I(
    () => D === 1 ? Tt.singleReply : qe(Tt.multipleReplies, { count: D }),
    [D, Tt]
  );
  X(() => {
    !o && Et && Ft && At(!1);
  }, [o, Et, Ft]);
  const nt = L(
    async (y) => {
      y && y.stopPropagation();
      const W = ne(T) ? Jr(T) : void 0;
      if (H !== void 0) {
        await p({
          threadId: d,
          contents: W,
          assignedUser: H
        }) && (R(H), W && ce());
        return;
      }
      W && await p({ threadId: d, contents: W }) && ce();
    },
    [
      ce,
      T,
      p,
      H,
      d
    ]
  ), et = L(
    async (y) => {
      const W = ne(T) ? Jr(T) : void 0, tt = y.status ? y.assignedUser : H ?? y.assignedUser, lt = await p({
        ...y,
        contents: W,
        assignedUser: tt
      });
      return lt && (tt !== void 0 && R(tt), W && ce()), lt;
    },
    [ce, T, p, H]
  );
  if (_t.length === 0) return;
  const it = /* @__PURE__ */ a(
    Zo,
    {
      comment: ae,
      localizedStrings: r,
      isThreadExpanded: o,
      threadStatus: w,
      handleAddCommentToThread: et,
      handleUpdateComment: h,
      handleDeleteComment: g,
      onEditingChange: At,
      canEditOrDelete: (!Et && z.get(ae.id)) ?? !1,
      canUserResolveThread: bt
    }
  );
  return /* @__PURE__ */ a(
    Id,
    {
      role: "option",
      "aria-selected": o,
      id: d,
      className: m(
        "tw:group tw:w-full tw:rounded-none tw:border-none tw:p-4 tw:outline-hidden tw:transition-all tw:duration-200 tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-1 tw:focus:ring-offset-background",
        { "tw:cursor-pointer tw:hover:shadow-md": !o },
        {
          "tw:bg-primary-foreground": !o && w !== "Resolved" && ct,
          "tw:bg-background": o && w !== "Resolved" && ct,
          "tw:bg-muted": w === "Resolved",
          "tw:bg-accent": !ct && !o && w !== "Resolved"
        }
      ),
      onClick: () => {
        c(d);
      },
      tabIndex: -1,
      children: /* @__PURE__ */ u(Pd, { className: "tw:flex tw:flex-col tw:gap-2 tw:p-0", children: [
        /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:content-center tw:items-start tw:gap-4", children: [
          /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:gap-2", children: [
            Mt && /* @__PURE__ */ a(yr, { className: "tw:rounded-sm tw:bg-input tw:text-sm tw:font-normal tw:text-primary tw:hover:bg-input", children: Mt }),
            /* @__PURE__ */ a(
              q,
              {
                variant: "ghost",
                size: "icon",
                onClick: (y) => {
                  y.stopPropagation(), le();
                },
                className: "tw:text-muted-foreground tw:transition tw:hover:text-foreground",
                "aria-label": ct ? r["%comment_aria_mark_as_unread%"] ?? "Mark as unread" : r["%comment_aria_mark_as_read%"] ?? "Mark as read",
                children: ct ? /* @__PURE__ */ a(us, {}) : /* @__PURE__ */ a(ps, {})
              }
            ),
            B === void 0 ? (
              // Generic status-resolve check (used by non-conflict threads and, via ConflictThread
              // leaving this slot undefined, by non-verseText conflicts, which resolve through a
              // plain status change). ConflictThread overrides this slot for verseText conflicts.
              /* @__PURE__ */ a(
                bi,
                {
                  show: bt && w !== "Resolved",
                  onClick: () => et({ threadId: d, status: "Resolved" }),
                  ariaLabel: r["%comment_aria_resolve_thread%"] ?? "Resolve thread"
                }
              )
            ) : B
          ] }),
          /* @__PURE__ */ a("div", { className: "tw:flex tw:max-w-full tw:flex-wrap tw:items-baseline tw:gap-2", children: /* @__PURE__ */ u(
            "p",
            {
              ref: Se,
              className: m(
                "tw:flex-1 tw:overflow-hidden tw:text-ellipsis tw:text-sm tw:font-normal tw:text-muted-foreground",
                {
                  "tw:overflow-visible tw:text-clip tw:whitespace-normal tw:break-words": Z
                },
                { "tw:whitespace-nowrap": !Z }
              ),
              children: [
                n && S ? /* @__PURE__ */ a(
                  q,
                  {
                    variant: "ghost",
                    size: "sm",
                    className: "tw:h-auto tw:px-1 tw:py-0 tw:text-sm tw:font-normal tw:text-muted-foreground",
                    onClick: (y) => {
                      y.stopPropagation(), S(l);
                    },
                    children: n
                  }
                ) : n,
                /* @__PURE__ */ u("span", { className: t, children: [
                  ae.contextBefore,
                  /* @__PURE__ */ a("span", { className: "tw:font-bold", children: ae.selectedText }),
                  ae.contextAfter
                ] })
              ]
            }
          ) }),
          E ?? it
        ] }),
        /* @__PURE__ */ u(dt, { children: [
          Ft && !o && /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:gap-5", children: [
            /* @__PURE__ */ a("div", { className: "tw:w-8", children: /* @__PURE__ */ a(kr, {}) }),
            /* @__PURE__ */ a("p", { className: "tw:text-sm tw:text-muted-foreground", children: J })
          ] }),
          !o && ne(T) && /* @__PURE__ */ a(
            Xr,
            {
              editorSerializedState: T,
              onSerializedChange: (y) => G(y),
              placeholder: r["%comment_replyOrAssign%"]
            }
          ),
          o && /* @__PURE__ */ u(dt, { children: [
            O && Qt.length > 0 && /* @__PURE__ */ a("div", { className: "tw:h-2", "data-slot": "root-content-reply-gap", "aria-hidden": "true" }),
            D > 0 && /* @__PURE__ */ u(
              "div",
              {
                className: "tw:flex tw:cursor-pointer tw:items-center tw:gap-5 tw:py-2",
                onClick: (y) => {
                  y.stopPropagation(), Ct(!0);
                },
                role: "button",
                tabIndex: 0,
                onKeyDown: (y) => {
                  (y.key === "Enter" || y.key === " ") && (y.preventDefault(), y.stopPropagation(), Ct(!0));
                },
                children: [
                  /* @__PURE__ */ a("div", { className: "tw:w-8", children: /* @__PURE__ */ a(kr, {}) }),
                  /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:gap-2", children: [
                    /* @__PURE__ */ a("p", { className: "tw:text-sm tw:text-muted-foreground", children: ut }),
                    rt ? /* @__PURE__ */ a(hs, {}) : /* @__PURE__ */ a(nr, {})
                  ] })
                ]
              }
            ),
            Qt.map((y) => /* @__PURE__ */ a("div", { children: /* @__PURE__ */ a(
              Zo,
              {
                comment: y,
                localizedStrings: r,
                isReply: !0,
                isThreadExpanded: o,
                handleUpdateComment: h,
                handleDeleteComment: g,
                onEditingChange: At,
                canEditOrDelete: (!Et && z.get(y.id)) ?? !1
              }
            ) }, y.id)),
            v !== !1 && (!Et || ne(T)) && /* @__PURE__ */ u(
              "div",
              {
                role: "textbox",
                tabIndex: -1,
                className: "tw:w-full tw:space-y-2",
                onClick: (y) => y.stopPropagation(),
                onKeyDownCapture: (y) => {
                  uo(y) && (y.preventDefault(), y.stopPropagation(), (ne(T) || H !== void 0 && H !== V) && nt());
                },
                onKeyDown: (y) => {
                  wo(y), (y.key === "Enter" || y.key === " ") && y.stopPropagation();
                },
                children: [
                  /* @__PURE__ */ a(
                    Xr,
                    {
                      editorSerializedState: T,
                      onSerializedChange: (y) => G(y),
                      placeholder: w === "Resolved" ? r["%comment_reopenResolved%"] : r["%comment_replyOrAssign%"],
                      autoFocus: !0,
                      onClear: (y) => {
                        he.current = y;
                      }
                    }
                  ),
                  /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-row tw:items-center tw:justify-end tw:gap-2", children: [
                    H !== void 0 && (ne(T) || H !== V) && /* @__PURE__ */ a("span", { className: "tw:flex-1 tw:text-sm tw:text-muted-foreground", children: qe(
                      r["%comment_assigning_to%"] ?? "Assigning to: {assignedUser}",
                      {
                        assignedUser: Fr(
                          H,
                          r
                        )
                      }
                    ) }),
                    /* @__PURE__ */ u(Pe, { open: K, onOpenChange: at, children: [
                      /* @__PURE__ */ a(He, { asChild: !0, children: /* @__PURE__ */ a(
                        q,
                        {
                          size: "icon",
                          variant: "outline",
                          className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                          disabled: !gt || !x || x.length === 0 || !x.includes(s),
                          "aria-label": r["%comment_aria_assign_user%"] ?? "Assign user",
                          children: /* @__PURE__ */ a(fn, {})
                        }
                      ) }),
                      /* @__PURE__ */ a(
                        Ve,
                        {
                          className: "tw:w-auto tw:p-0",
                          align: "end",
                          onKeyDown: (y) => {
                            y.key === "Escape" && (y.stopPropagation(), at(!1));
                          },
                          children: /* @__PURE__ */ a(Ye, { children: /* @__PURE__ */ a(We, { children: x == null ? void 0 : x.map((y) => /* @__PURE__ */ a(
                            Ie,
                            {
                              onSelect: () => {
                                F(y !== i ? y : void 0), yt.current = "user-selected", R(void 0), at(!1);
                              },
                              className: "tw:flex tw:items-center",
                              children: /* @__PURE__ */ a("span", { children: Fr(y, r) })
                            },
                            y || "unassigned"
                          )) }) })
                        }
                      )
                    ] }),
                    /* @__PURE__ */ a(
                      q,
                      {
                        size: "icon",
                        onClick: nt,
                        className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                        disabled: !ne(T) && (H === void 0 || H === V),
                        "aria-label": r["%comment_aria_submit_comment%"] ?? "Submit comment",
                        children: /* @__PURE__ */ a(mn, {})
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
const Bd = m(
  fi,
  // `prose` gives block children (the top-level blockquote wrapper, and any p — whether nested
  // inside that blockquote or, in the non-verseText fallback, a direct child) vertical margins that
  // make these already-compact cards feel bulky. Zero both so the diff sits flush inside the card.
  "tw:[&>blockquote]:my-0 tw:[&_p]:my-0",
  "tw:[&_u]:font-semibold tw:[&_u]:text-success-foreground tw:[&_u]:no-underline",
  "tw:[&_s]:text-destructive tw:[&_s]:line-through"
), Ld = (t) => t.replace(/(\s+)(<\/[us]>)/g, "$2$1"), Ur = (t) => Ld(Ja(t));
function Kr({ html: t }) {
  return /* @__PURE__ */ a(
    "div",
    {
      className: Bd,
      dangerouslySetInnerHTML: { __html: t }
    }
  );
}
function Fd({
  comment: t,
  localizedStrings: e,
  availableActions: r = "acceptOrReject",
  resolvedResolution: o,
  onResolve: n,
  isResolving: i = !1
}) {
  const [s, c] = _("accept"), d = zo(), l = zo(), w = r === "loading", p = r === "accept", h = r === "none", g = r === "acceptRejectOrMerge", f = p ? "accept" : s, x = I(
    () => Ur(t.rejectedText ?? ""),
    [t.rejectedText]
  ), v = I(
    () => Ur(t.acceptedText ?? ""),
    [t.acceptedText]
  ), C = I(
    () => Ur(t.mergedText ?? ""),
    [t.mergedText]
  ), N = I(() => Ja(t.contents), [t.contents]);
  if (!mi(t))
    return /* @__PURE__ */ a(Kr, { html: N });
  const k = (V) => {
    c(V === "reject" || V === "merge" ? V : "accept");
  }, M = e["%conflict_note_stale_notice%"] ?? "The verse was edited after this conflict was recorded, so 'Use the other change' is no longer available. Keep the current text to resolve.", j = g ? [
    {
      value: "merge",
      label: e["%conflict_note_option_combine%"] ?? "Combine both changes",
      html: C
    }
  ] : [], S = [
    {
      value: "accept",
      label: e["%conflict_note_option_keep_current%"] ?? "Keep the current text",
      html: v
    },
    {
      value: "reject",
      label: e["%conflict_note_option_use_other%"] ?? "Use the other change",
      html: x
    },
    ...j
  ], P = f === "accept", $ = i || P;
  let E;
  P ? E = e["%conflict_note_save_disabled_tooltip%"] ?? "Keeping the current text makes no change — resolve the thread with the ✓ to keep it." : i || (E = e["%conflict_note_save_warning%"] ?? "This can't be undone.");
  const B = e["%conflict_note_no_result%"] ?? "No result preview available.", O = /* @__PURE__ */ a("p", { className: "tw:text-muted-foreground", children: B }), T = (V) => V ? /* @__PURE__ */ a("p", { className: "tw:whitespace-pre-wrap tw:text-foreground", children: V }) : O, G = () => {
    const V = o ?? "accept";
    return V === "merged" ? t.mergedText ? /* @__PURE__ */ a(Kr, { html: C }) : O : T(V === "reject" ? t.rejectedResultText : t.resultText);
  }, H = (V) => p && V.value === "reject", F = (V) => {
    const R = f === V.value, Z = `${l}-${V.value}`, rt = H(V);
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
          htmlFor: Z,
          "data-slot": "conflict-resolution-option",
          "data-value": V.value,
          className: m(
            "tw:flex tw:flex-col tw:gap-1 tw:rounded-md tw:border tw:p-2",
            "tw:focus-within:ring-2 tw:focus-within:ring-ring tw:focus-within:ring-offset-1",
            R ? "tw:border-border tw:bg-accent/50" : "tw:border-transparent tw:hover:bg-accent/30",
            rt ? "tw:cursor-not-allowed tw:opacity-60" : "tw:cursor-pointer"
          ),
          children: [
            /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:gap-2", children: [
              /* @__PURE__ */ a(
                Gr,
                {
                  id: Z,
                  value: V.value,
                  "aria-label": V.label,
                  disabled: rt,
                  "aria-describedby": rt ? d : void 0
                }
              ),
              /* @__PURE__ */ a("span", { "aria-hidden": !0, className: "tw:font-medium", children: V.label })
            ] }),
            rt && // aria-describedby links the option to this visually-hidden notice so assistive tech
            // announces why the choice is read-only.
            /* @__PURE__ */ a("span", { id: d, className: "tw:sr-only", children: M }),
            /* @__PURE__ */ a(Kr, { html: V.html })
          ]
        },
        V.value
      )
    );
  };
  return (
    // Contain every click inside the card (selecting an option, pressing Save) so it never bubbles
    // up to toggle the enclosing CommentThread open/closed. The thread toggles on click only, so a
    // single onClick guard at the root is enough; this container is not itself an interactive control
    // and needs no keyboard handler (the thread has no keyboard toggle to intercept).
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
    /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:gap-3 tw:text-sm", onClick: (V) => V.stopPropagation(), children: [
      /* @__PURE__ */ a("p", { children: e["%conflict_note_description_verseText%"] ?? "Conflicting changes were made to the verse text." }),
      w && /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:gap-2", "data-slot": "conflict-loading", children: [
        /* @__PURE__ */ a(tr, { className: "tw:h-8 tw:w-full" }),
        /* @__PURE__ */ a(tr, { className: "tw:h-8 tw:w-full" }),
        /* @__PURE__ */ a(tr, { className: "tw:h-8 tw:w-24" })
      ] }),
      !w && h && G(),
      !w && !h && /* @__PURE__ */ u(dt, { children: [
        /* @__PURE__ */ a("p", { children: e["%conflict_note_choose_prompt%"] ?? "Select which change to keep:" }),
        /* @__PURE__ */ a(
          ao,
          {
            value: f,
            onValueChange: k,
            disabled: i,
            "aria-label": e["%conflict_note_choose_aria_label%"] ?? "Choose resolution",
            children: S.map((V) => H(V) ? /* @__PURE__ */ a(Gt, { delayDuration: 0, children: /* @__PURE__ */ u(Ht, { children: [
              /* @__PURE__ */ a(Yt, { asChild: !0, children: F(V) }),
              /* @__PURE__ */ a(Wt, { children: M })
            ] }) }, V.value) : F(V))
          }
        ),
        /* @__PURE__ */ a(Gt, { delayDuration: 0, children: /* @__PURE__ */ u(Ht, { children: [
          /* @__PURE__ */ a(Yt, { asChild: !0, children: /* @__PURE__ */ a("span", { className: "tw:inline-flex tw:self-start", children: /* @__PURE__ */ a(
            q,
            {
              size: "sm",
              disabled: $,
              onClick: () => n == null ? void 0 : n(f),
              children: e["%conflict_note_save_and_resolve%"] ?? "Save and resolve"
            }
          ) }) }),
          E && /* @__PURE__ */ a(Wt, { children: E })
        ] }) })
      ] })
    ] })
  );
}
const Ud = {
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
function Kd({
  comment: t,
  localizedStrings: e,
  resolvedResolution: r
}) {
  const o = I(
    () => Ur(t.rejectedText ?? ""),
    [t.rejectedText]
  );
  if (r) {
    const { key: i, fallback: s } = Ud[r];
    return /* @__PURE__ */ a("p", { className: "tw:text-sm tw:font-normal tw:text-muted-foreground", children: e[i] ?? s });
  }
  const n = e["%conflict_note_summary_unresolved%"] ?? "Conflicting edits. Choose which change to keep.";
  return /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:gap-1", children: [
    /* @__PURE__ */ a("p", { className: "tw:text-sm tw:font-normal tw:text-muted-foreground", children: n }),
    o ? /* @__PURE__ */ a(Kr, { html: o }) : void 0
  ] });
}
function qd(t) {
  return t === "reject" ? "reject" : t === "merge" ? "merged" : "accept";
}
function Gd({
  threadId: t,
  threadStatus: e,
  isSelected: r,
  activeComments: o,
  conflictResolution: n
}) {
  const [i, s] = _("loading"), [c, d] = _(!1), [l, w] = _(), p = n == null ? void 0 : n.getOptions, h = n == null ? void 0 : n.resolve;
  X(() => {
    let N = !0;
    if (!r) {
      s("loading");
      return;
    }
    return (async () => {
      let M;
      try {
        M = p ? await p(t) : "none";
      } catch {
        M = "none";
      }
      N && (s(M), M !== "none" && w(void 0));
    })(), () => {
      N = !1;
    };
  }, [r, t, e, p]);
  const g = U(!1), f = L(
    async (N) => {
      if (!(!h || g.current)) {
        g.current = !0, d(!0);
        try {
          await h(t, N) && (w(qd(N)), s("none"));
        } catch {
        } finally {
          g.current = !1, d(!1);
        }
      }
    },
    [h, t]
  ), v = I(() => {
    if (e === "Resolved") {
      for (let N = o.length - 1; N >= 0; N -= 1)
        if (o[N].status === "Resolved")
          return vi(o[N].conflictResolutionAction);
      return "accept";
    }
  }, [e, o]) ?? l;
  return { conflictOptions: i, isResolving: c, resolve: f, resolvedResolution: v, showResolveCheck: i !== "loading" && i !== "none" };
}
function Hd(t) {
  const {
    comments: e,
    localizedStrings: r,
    isSelected: o = !1,
    threadId: n,
    threadStatus: i,
    conflictResolution: s
  } = t, c = I(() => e.filter((C) => !C.deleted), [e]), d = I(
    () => c.find((C) => C.conflictType) ?? c[0],
    [c]
  ), { conflictOptions: l, isResolving: w, resolve: p, resolvedResolution: h, showResolveCheck: g } = Gd({
    threadId: n,
    threadStatus: i,
    isSelected: o,
    activeComments: c,
    conflictResolution: s
  }), f = mi(d);
  let x;
  f && d && (x = o ? /* @__PURE__ */ a(
    Fd,
    {
      comment: d,
      localizedStrings: r,
      availableActions: l,
      resolvedResolution: h,
      onResolve: p,
      isResolving: w
    }
  ) : /* @__PURE__ */ a(
    Kd,
    {
      comment: d,
      localizedStrings: r,
      resolvedResolution: h
    }
  ));
  let v;
  return f && (v = /* @__PURE__ */ a(
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
      resolveActionSlot: v,
      spaceRootContentFromReplies: f && o
    }
  );
}
function sp({
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
  canUserResolveThreadCallback: h,
  canUserEditOrDeleteCommentCallback: g,
  selectedThreadId: f,
  onSelectedThreadChange: x,
  onVerseRefClick: v,
  conflictResolution: C
}) {
  const [N, k] = _(/* @__PURE__ */ new Set()), [M, j] = _(), [S, P] = _(), $ = L(
    async (R) => {
      const Z = await i(R);
      return Z !== void 0 && R.assignedUser !== void 0 && R.assignedUser !== "" && P(R.assignedUser), Z;
    },
    [i]
  );
  X(() => {
    f && (k((R) => new Set(R).add(f)), j(f));
  }, [f]);
  const E = r.filter(
    (R) => R.comments.some((Z) => !Z.deleted)
  ), B = E.map((R) => ({ id: R.id })), O = L(
    (R) => {
      k((Z) => new Set(Z).add(R.id)), j(R.id), x == null || x(R.id);
    },
    [x]
  ), T = L(
    (R) => {
      const Z = N.has(R);
      k((rt) => {
        const Ct = new Set(rt);
        return Ct.has(R) ? Ct.delete(R) : Ct.add(R), Ct;
      }), j(R), x == null || x(Z ? void 0 : R);
    },
    [N, x]
  ), { listboxRef: G, activeId: H, handleKeyDown: F } = qi({
    options: B,
    onOptionSelect: O
  }), V = L(
    (R) => {
      R.key === "Escape" ? (M && N.has(M) && (k((Z) => {
        const rt = new Set(Z);
        return rt.delete(M), rt;
      }), j(void 0), x == null || x(void 0)), R.preventDefault(), R.stopPropagation()) : F(R);
    },
    [M, N, F, x]
  );
  return /* @__PURE__ */ a(
    "div",
    {
      id: "comment-list",
      role: "listbox",
      tabIndex: 0,
      ref: G,
      "aria-activedescendant": H ?? void 0,
      "aria-label": "Comments",
      className: m(
        "tw:flex tw:w-full tw:flex-col tw:space-y-3 tw:outline-hidden tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-1 tw:focus:ring-offset-background",
        t
      ),
      onKeyDown: V,
      children: E.map((R) => {
        const Z = {
          classNameForVerseText: e,
          comments: R.comments,
          localizedStrings: n,
          verseRef: R.verseRef,
          handleSelectThread: T,
          threadId: R.id,
          thread: R,
          isRead: R.isRead,
          isSelected: N.has(R.id),
          currentUser: o,
          assignedUser: R.assignedUser,
          threadStatus: R.status,
          handleAddCommentToThread: $,
          handleUpdateComment: s,
          handleDeleteComment: c,
          handleReadStatusChange: d,
          assignableUsers: l,
          canUserAddCommentToThread: w,
          canUserAssignThreadCallback: p,
          canUserResolveThreadCallback: h,
          canUserEditOrDeleteCommentCallback: g,
          onVerseRefClick: v,
          initialAssignedUser: S
        };
        return /* @__PURE__ */ a(
          "div",
          {
            className: m({
              "tw:opacity-60": R.status === "Resolved"
            }),
            children: R.type === "Conflict" ? /* @__PURE__ */ a(Hd, { ...Z, conflictResolution: C }) : /* @__PURE__ */ a(xi, { ...Z })
          },
          R.id
        );
      })
    }
  );
}
function Yd({ table: t }) {
  return /* @__PURE__ */ u(Ce, { children: [
    /* @__PURE__ */ a(Ee, { asChild: !0, children: /* @__PURE__ */ u(q, { variant: "outline", size: "sm", className: "tw:ml-auto tw:hidden tw:h-8 tw:lg:flex", children: [
      /* @__PURE__ */ a(gs, { className: "tw:mr-2 tw:h-4 tw:w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ u(Te, { align: "end", className: "tw:w-[150px]", children: [
      /* @__PURE__ */ a(Cr, { children: "Toggle columns" }),
      /* @__PURE__ */ a(Ge, {}),
      t.getAllColumns().filter((e) => e.getCanHide()).map((e) => /* @__PURE__ */ a(
        Oe,
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
  return /* @__PURE__ */ a(Bt.Root, { "data-slot": "select", ...t });
}
function Wd({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    Bt.Group,
    {
      "data-slot": "select-group",
      className: m("tw:scroll-my-1 tw:p-1", t),
      ...e
    }
  );
}
function cr({ ...t }) {
  return /* @__PURE__ */ a(Bt.Value, { "data-slot": "select-value", ...t });
}
function lr({ className: t, size: e = "default", children: r, ...o }) {
  const n = ie();
  return /* @__PURE__ */ u(
    Bt.Trigger,
    {
      "data-slot": "select-trigger",
      "data-size": e,
      className: m(
        "pr-twp tw:flex tw:w-fit tw:items-center tw:gap-2 tw:rounded-lg tw:border tw:border-input tw:bg-transparent tw:py-2 tw:pe-2 tw:ps-2.5 tw:text-sm tw:whitespace-nowrap tw:transition-colors tw:outline-none tw:select-none tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:data-placeholder:text-muted-foreground tw:data-[size=default]:h-8 tw:data-[size=sm]:h-7 tw:data-[size=sm]:rounded-[min(var(--tw-radius-md),10px)] tw:*:data-[slot=select-value]:line-clamp-1 tw:*:data-[slot=select-value]:flex tw:*:data-[slot=select-value]:flex-1 tw:*:data-[slot=select-value]:items-center tw:*:data-[slot=select-value]:gap-1.5 tw:*:data-[slot=select-value]:text-start tw:dark:bg-input/30 tw:dark:hover:bg-input/50 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      dir: n,
      ...o,
      children: [
        r,
        /* @__PURE__ */ a(Bt.Icon, { asChild: !0, children: /* @__PURE__ */ a(Wc, { className: "tw:pointer-events-none tw:size-4 tw:text-muted-foreground" }) })
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
  ...n
}) {
  const i = ie();
  return /* @__PURE__ */ a(Bt.Portal, { children: /* @__PURE__ */ u(
    Bt.Content,
    {
      "data-slot": "select-content",
      "data-align-trigger": r === "item-aligned",
      className: m(
        "pr-twp tw:relative tw:z-50 tw:max-h-(--radix-select-content-available-height) tw:data-[align-trigger=true]:min-w-(--radix-select-trigger-width) tw:data-[align-trigger=false]:min-w-36 tw:origin-(--radix-select-content-transform-origin) tw:overflow-x-hidden tw:overflow-y-auto tw:rounded-lg tw:bg-popover tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:data-[align-trigger=true]:animate-none tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95 tw:animate-none! tw:bg-popover/70 tw:before:-z-1 tw:**:data-[slot$=-item]:focus:bg-foreground/10 tw:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 tw:**:data-[slot$=-separator]:bg-foreground/5 tw:**:data-[slot$=-trigger]:focus:bg-foreground/10 tw:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! tw:**:data-[variant=destructive]:focus:bg-foreground/10! tw:**:data-[variant=destructive]:text-accent-foreground! tw:**:data-[variant=destructive]:**:text-accent-foreground! tw:relative tw:before:pointer-events-none tw:before:absolute tw:before:inset-0 tw:before:rounded-[inherit] tw:before:backdrop-blur-2xl tw:before:backdrop-saturate-150",
        r === "popper" && "tw:data-[side=bottom]:translate-y-1 tw:data-[side=left]:-translate-x-1 tw:rtl:data-[side=left]:translate-x-1 tw:data-[side=right]:translate-x-1 tw:rtl:data-[side=right]:-translate-x-1 tw:data-[side=top]:-translate-y-1",
        t
      ),
      position: r,
      align: o,
      ...n,
      children: [
        /* @__PURE__ */ a(Xd, {}),
        /* @__PURE__ */ a(
          Bt.Viewport,
          {
            "data-position": r,
            className: m(
              "tw:data-[position=popper]:h-(--radix-select-trigger-height) tw:data-[position=popper]:w-full tw:data-[position=popper]:min-w-(--radix-select-trigger-width)",
              r === "popper" && "tw:"
            ),
            children: /* @__PURE__ */ a("div", { dir: i, children: e })
          }
        ),
        /* @__PURE__ */ a(Jd, {})
      ]
    }
  ) });
}
function cp({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    Bt.Label,
    {
      "data-slot": "select-label",
      className: m("pr-twp tw:px-1.5 tw:py-1 tw:text-xs tw:text-muted-foreground", t),
      ...e
    }
  );
}
function de({
  className: t,
  children: e,
  ...r
}) {
  return /* @__PURE__ */ u(
    Bt.Item,
    {
      "data-slot": "select-item",
      className: m(
        "pr-twp tw:relative tw:flex tw:w-full tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:*:[span]:last:flex tw:*:[span]:last:items-center tw:*:[span]:last:gap-2",
        t
      ),
      ...r,
      children: [
        /* @__PURE__ */ a("span", { className: "tw:pointer-events-none tw:absolute tw:end-2 tw:flex tw:size-4 tw:items-center tw:justify-center", children: /* @__PURE__ */ a(Bt.ItemIndicator, { children: /* @__PURE__ */ a(ra, { className: "tw:pointer-events-none" }) }) }),
        /* @__PURE__ */ a(Bt.ItemText, { children: e })
      ]
    }
  );
}
function lp({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    Bt.Separator,
    {
      "data-slot": "select-separator",
      className: m(
        "pr-twp tw:pointer-events-none tw:-mx-1 tw:my-1 tw:h-px tw:bg-border",
        t
      ),
      ...e
    }
  );
}
function Xd({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    Bt.ScrollUpButton,
    {
      "data-slot": "select-scroll-up-button",
      className: m(
        "pr-twp tw:z-10 tw:flex tw:cursor-default tw:items-center tw:justify-center tw:bg-popover tw:py-1 tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      ...e,
      children: /* @__PURE__ */ a(Yc, {})
    }
  );
}
function Jd({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    Bt.ScrollDownButton,
    {
      "data-slot": "select-scroll-down-button",
      className: m(
        "pr-twp tw:z-10 tw:flex tw:cursor-default tw:items-center tw:justify-center tw:bg-popover tw:py-1 tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      ...e,
      children: /* @__PURE__ */ a(Hc, {})
    }
  );
}
function Zd({ table: t }) {
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
            /* @__PURE__ */ a(dr, { side: "top", children: [10, 20, 30, 40, 50].map((e) => /* @__PURE__ */ a(de, { value: `${e}`, children: e }, e)) })
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
        q,
        {
          variant: "outline",
          size: "icon",
          className: "tw:hidden tw:h-8 tw:w-8 tw:p-0 tw:lg:flex",
          onClick: () => t.setPageIndex(0),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ a("span", { className: "tw:sr-only", children: "Go to first page" }),
            /* @__PURE__ */ a(fs, { className: "tw:h-4 tw:w-4" })
          ]
        }
      ),
      /* @__PURE__ */ u(
        q,
        {
          variant: "outline",
          size: "icon",
          className: "tw:h-8 tw:w-8 tw:p-0",
          onClick: () => t.previousPage(),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ a("span", { className: "tw:sr-only", children: "Go to previous page" }),
            /* @__PURE__ */ a(ms, { className: "tw:h-4 tw:w-4" })
          ]
        }
      ),
      /* @__PURE__ */ u(
        q,
        {
          variant: "outline",
          size: "icon",
          className: "tw:h-8 tw:w-8 tw:p-0",
          onClick: () => t.nextPage(),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ a("span", { className: "tw:sr-only", children: "Go to next page" }),
            /* @__PURE__ */ a(vs, { className: "tw:h-4 tw:w-4" })
          ]
        }
      ),
      /* @__PURE__ */ u(
        q,
        {
          variant: "outline",
          size: "icon",
          className: "tw:hidden tw:h-8 tw:w-8 tw:p-0 tw:lg:flex",
          onClick: () => t.setPageIndex(t.getPageCount() - 1),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ a("span", { className: "tw:sr-only", children: "Go to last page" }),
            /* @__PURE__ */ a(bs, { className: "tw:h-4 tw:w-4" })
          ]
        }
      )
    ] })
  ] }) });
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
  var S;
  const [w, p] = _([]), [h, g] = _([]), [f, x] = _({}), [v, C] = _({}), N = I(() => e ?? [], [e]), k = Vn({
    data: N,
    columns: t,
    getCoreRowModel: Bn(),
    ...r && { getPaginationRowModel: Kc() },
    onSortingChange: p,
    getSortedRowModel: jn(),
    onColumnFiltersChange: g,
    getFilteredRowModel: Uc(),
    onColumnVisibilityChange: x,
    onRowSelectionChange: C,
    state: {
      sorting: w,
      columnFilters: h,
      columnVisibility: f,
      rowSelection: v
    }
  }), M = k.getVisibleFlatColumns();
  let j;
  return d ? j = Array.from({ length: 10 }).map((E, B) => `skeleton-row-${B}`).map((E) => /* @__PURE__ */ a($e, { className: "tw:hover:bg-transparent", children: /* @__PURE__ */ a(er, { colSpan: M.length ?? t.length, className: "tw:border-0 tw:p-0", children: /* @__PURE__ */ a("div", { className: "tw:w-full tw:py-2", children: /* @__PURE__ */ a(tr, { className: "tw:h-14 tw:w-full tw:rounded-md" }) }) }) }, E)) : ((S = k.getRowModel().rows) == null ? void 0 : S.length) > 0 ? j = k.getRowModel().rows.map((P) => /* @__PURE__ */ a(
    $e,
    {
      onClick: () => s(P, k),
      "data-state": P.getIsSelected() && "selected",
      children: P.getVisibleCells().map(($) => /* @__PURE__ */ a(er, { children: br($.column.columnDef.cell, $.getContext()) }, $.id))
    },
    P.id
  )) : j = /* @__PURE__ */ a($e, { children: /* @__PURE__ */ a(er, { colSpan: t.length, className: "tw:h-24 tw:text-center", children: l }) }), /* @__PURE__ */ u("div", { className: "pr-twp", id: c, children: [
    n && /* @__PURE__ */ a(Yd, { table: k }),
    /* @__PURE__ */ u(Ga, { stickyHeader: i, children: [
      /* @__PURE__ */ a(Ha, { stickyHeader: i, children: k.getHeaderGroups().map((P) => /* @__PURE__ */ a($e, { children: P.headers.map(($) => /* @__PURE__ */ a(qr, { className: "tw:p-0", children: $.isPlaceholder ? void 0 : br($.column.columnDef.header, $.getContext()) }, $.id)) }, P.id)) }),
      /* @__PURE__ */ a(Ya, { children: j })
    ] }),
    r && /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:justify-end tw:space-x-2 tw:py-4", children: [
      /* @__PURE__ */ a(
        q,
        {
          variant: "outline",
          size: "sm",
          onClick: () => k.previousPage(),
          disabled: !k.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ a(
        q,
        {
          variant: "outline",
          size: "sm",
          onClick: () => k.nextPage(),
          disabled: !k.getCanNextPage(),
          children: "Next"
        }
      )
    ] }),
    r && o && /* @__PURE__ */ a(Zd, { table: k })
  ] });
}
function dp({
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
      className: m(
        "pr-twp tw:prose",
        {
          "tw:line-clamp-3 tw:max-h-10 tw:overflow-hidden tw:text-ellipsis tw:break-words": n
        },
        r
      ),
      children: /* @__PURE__ */ a(al, { options: i, children: e })
    }
  );
}
const tw = Object.freeze([
  "%webView_error_dump_header%",
  "%webView_error_dump_info_message%"
]), tn = (t, e) => t[e] ?? e;
function ew({
  errorDetails: t,
  handleCopyNotify: e,
  localizedStrings: r,
  id: o
}) {
  const n = tn(r, "%webView_error_dump_header%"), i = tn(r, "%webView_error_dump_info_message%");
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
          /* @__PURE__ */ a(q, { variant: "secondary", size: "icon", className: "size-8", onClick: () => s(), children: /* @__PURE__ */ a(vn, {}) })
        ] }),
        /* @__PURE__ */ a("div", { className: "tw:prose tw:w-full", children: /* @__PURE__ */ a("pre", { className: "tw:text-xs", children: t }) })
      ]
    }
  );
}
const wp = Object.freeze([
  ...tw,
  "%webView_error_dump_copied_message%"
]);
function up({
  errorDetails: t,
  handleCopyNotify: e,
  localizedStrings: r,
  children: o,
  className: n,
  id: i
}) {
  const [s, c] = _(!1), d = () => {
    c(!0), e && e();
  };
  return /* @__PURE__ */ u(Pe, { onOpenChange: (w) => {
    w || c(!1);
  }, children: [
    /* @__PURE__ */ a(He, { asChild: !0, children: o }),
    /* @__PURE__ */ u(Ve, { id: i, className: m("tw:min-w-80 tw:max-w-96", n), children: [
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
function pp({ id: t, label: e, groups: r }) {
  const [o, n] = _(
    Object.fromEntries(
      r.map(
        (l, w) => l.itemType === 0 ? [w, []] : void 0
      ).filter((l) => !!l)
    )
  ), [i, s] = _({}), c = (l, w) => {
    const p = !o[l][w];
    n((g) => (g[l][w] = p, { ...g }));
    const h = r[l].items[w];
    h.onUpdate(h.id, p);
  }, d = (l, w) => {
    s((h) => (h[l] = w, { ...h }));
    const p = r[l].items.find((h) => h.id === w);
    p ? p.onUpdate(w) : console.error(`Could not find dropdown radio item with id '${w}'!`);
  };
  return /* @__PURE__ */ a("div", { id: t, children: /* @__PURE__ */ u(Ce, { children: [
    /* @__PURE__ */ a(Ee, { asChild: !0, children: /* @__PURE__ */ u(q, { variant: "default", children: [
      /* @__PURE__ */ a(xs, { size: 16, className: "tw:mr-2 tw:h-4 tw:w-4" }),
      e,
      /* @__PURE__ */ a(nr, { size: 16, className: "tw:ml-2 tw:h-4 tw:w-4" })
    ] }) }),
    /* @__PURE__ */ a(Te, { children: r.map((l, w) => /* @__PURE__ */ u("div", { children: [
      /* @__PURE__ */ a(Cr, { children: l.label }),
      /* @__PURE__ */ a(un, { children: l.itemType === 0 ? /* @__PURE__ */ a(dt, { children: l.items.map((p, h) => /* @__PURE__ */ a("div", { children: /* @__PURE__ */ a(
        Oe,
        {
          checked: o[w][h],
          onCheckedChange: () => c(w, h),
          children: p.label
        }
      ) }, p.id)) }) : /* @__PURE__ */ a(
        Gi,
        {
          value: i[w],
          onValueChange: (p) => d(w, p),
          children: l.items.map((p) => /* @__PURE__ */ a("div", { children: /* @__PURE__ */ a(Hi, { value: p.id, children: p.label }) }, p.id))
        }
      ) }),
      /* @__PURE__ */ a(Ge, {})
    ] }, l.label)) })
  ] }) });
}
function hp({
  id: t,
  category: e,
  downloads: r,
  languages: o,
  moreInfoUrl: n,
  handleMoreInfoLinkClick: i,
  supportUrl: s,
  handleSupportLinkClick: c
}) {
  const d = new js("en", {
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
            /* @__PURE__ */ a(ys, { className: "tw:h-4 tw:w-4" }),
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
            q,
            {
              onClick: () => i(),
              variant: "link",
              className: "tw:flex tw:h-auto tw:gap-1 tw:py-0 tw:text-xs tw:font-semibold tw:text-foreground",
              children: [
                "Website",
                /* @__PURE__ */ a(ks, { className: "tw:h-4 tw:w-4" })
              ]
            }
          ) }),
          s && /* @__PURE__ */ a("div", { className: "tw:flex tw:gap-1", children: /* @__PURE__ */ u(
            q,
            {
              onClick: () => c(),
              variant: "link",
              className: "tw:flex tw:h-auto tw:gap-1 tw:py-0 tw:text-xs tw:font-semibold tw:text-foreground",
              children: [
                "Support",
                /* @__PURE__ */ a(_s, { className: "tw:h-4 tw:w-4" })
              ]
            }
          ) })
        ] })
      ]
    }
  );
}
function aw({ id: t, versionHistory: e }) {
  const [r, o] = _(!1), n = /* @__PURE__ */ new Date();
  function i(c) {
    const d = new Date(c), l = new Date(n.getTime() - d.getTime()), w = l.getUTCFullYear() - 1970, p = l.getUTCMonth(), h = l.getUTCDate() - 1;
    let g = "";
    return w > 0 ? g = `${w.toString()} year${w === 1 ? "" : "s"} ago` : p > 0 ? g = `${p.toString()} month${p === 1 ? "" : "s"} ago` : h === 0 ? g = "today" : g = `${h.toString()} day${h === 1 ? "" : "s"} ago`, g;
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
function gp({
  id: t,
  publisherDisplayName: e,
  fileSize: r,
  locales: o,
  versionHistory: n,
  currentVersion: i
}) {
  const s = I(() => Bs(r), [r]), d = ((l) => {
    const w = new Intl.DisplayNames(Ls(), { type: "language" });
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
function fp({
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
        icon: d,
        className: l
      }
    ),
    e.length > 0 ? /* @__PURE__ */ a("div", { className: "tw:flex tw:flex-wrap tw:items-center tw:gap-2", children: e.map((h) => {
      var g;
      return /* @__PURE__ */ u(yr, { variant: "muted", className: "tw:flex tw:items-center tw:gap-1", children: [
        /* @__PURE__ */ a(
          q,
          {
            variant: "ghost",
            size: "icon",
            className: "tw:h-4 tw:w-4 tw:p-0 tw:hover:bg-transparent",
            onClick: () => r(e.filter((f) => f !== h)),
            children: /* @__PURE__ */ a(Xa, { className: "tw:h-3 tw:w-3" })
          }
        ),
        (g = t.find((f) => f.value === h)) == null ? void 0 : g.label
      ] }, h);
    }) }) : /* @__PURE__ */ a(Nt, { children: w })
  ] });
}
const ow = {
  // Passive mirror: PT9 marker characters that land in the document as they filter.
  backslash: /^[a-z0-9+]$/,
  // Focused menus: claimed filter characters (digits for q1/s2 etc.).
  enter: /^[a-z0-9]$/i,
  selection: /^[a-z0-9+*-]$/i
};
function fr(t) {
  t.preventDefault(), t.stopPropagation();
}
function nw(t, e, r) {
  return t.key === "Shift" || t.key === "Control" || t.key === "Alt" || t.key === "Meta" ? "passed" : t.ctrlKey || t.metaKey || t.altKey ? (r.dismiss(), "ended") : t.key === "ArrowDown" || t.key === "ArrowUp" ? (fr(t), r.update({ moveSelection: t.key === "ArrowDown" ? 1 : -1 }), "continue") : t.key === "Enter" ? (fr(t), r.commit(), "ended") : t.key === "Escape" ? (fr(t), r.dismiss(), "ended") : e.kind === "backslash" && (t.key === " " || t.key === "*") ? (r.dismiss(), "ended") : t.key === "Backspace" || ow[e.kind].test(t.key) ? (e.kind !== "backslash" && fr(t), e.filter = t.key === "Backspace" ? e.filter.slice(0, -1) : e.filter + t.key, r.update({ filterText: e.filter }), "continue") : (e.kind === "selection" && fr(t), r.dismiss(), "ended");
}
const iw = Object.freeze([
  "%undoButton_tooltip%",
  "%redoButton_tooltip%"
]), en = (t, e) => t[e] ?? e;
function sw({
  onUndoClick: t,
  onRedoClick: e,
  canUndo: r = !0,
  canRedo: o = !0,
  localizedStrings: n = {},
  showKeyboardShortcuts: i = !0,
  className: s = "tw:h-6 tw:w-6",
  variant: c = "ghost"
}) {
  const d = qa(), l = en(n, "%undoButton_tooltip%"), w = en(n, "%redoButton_tooltip%");
  return /* @__PURE__ */ u(Ka, { children: [
    /* @__PURE__ */ a(Gt, { children: /* @__PURE__ */ u(Ht, { children: [
      /* @__PURE__ */ a(Yt, { asChild: !0, children: /* @__PURE__ */ a(
        q,
        {
          "aria-label": l,
          className: s,
          size: "icon",
          onClick: t,
          disabled: !r,
          variant: c,
          children: /* @__PURE__ */ a(Ns, {})
        }
      ) }),
      /* @__PURE__ */ a(Wt, { children: /* @__PURE__ */ u("p", { children: [
        l,
        i && /* @__PURE__ */ u(dt, { children: [
          " ",
          /* @__PURE__ */ a(bo, { children: d ? "⌘Z" : "Ctrl+Z" })
        ] })
      ] }) })
    ] }) }),
    e && (c === "secondary" || c === "default") && /* @__PURE__ */ a(wn, {}),
    e && /* @__PURE__ */ a(Gt, { children: /* @__PURE__ */ u(Ht, { children: [
      /* @__PURE__ */ a(Yt, { asChild: !0, children: /* @__PURE__ */ a(
        q,
        {
          "aria-label": w,
          className: s,
          size: "icon",
          onClick: e,
          disabled: !o,
          variant: c,
          children: /* @__PURE__ */ a(Cs, {})
        }
      ) }),
      /* @__PURE__ */ a(Wt, { children: /* @__PURE__ */ u("p", { children: [
        w,
        i && /* @__PURE__ */ u(dt, { children: [
          " ",
          /* @__PURE__ */ a(bo, { children: d ? "⌘⇧Z" : "Ctrl+Y" })
        ] })
      ] }) })
    ] }) })
  ] });
}
function cw({
  children: t,
  editorRef: e,
  canUndo: r = !0,
  canRedo: o = !0
}) {
  const n = U(null);
  return X(() => {
    var d;
    const i = qa(), s = ((d = n.current) == null ? void 0 : d.querySelector(".editor-input")) ?? void 0, c = (l) => {
      var p, h, g, f;
      if (!s || document.activeElement !== s) return;
      const w = l.key.toLowerCase();
      if (i) {
        if (!l.metaKey) return;
        !l.shiftKey && w === "z" ? (l.preventDefault(), r && ((p = e.current) == null || p.undo())) : l.shiftKey && w === "z" && (l.preventDefault(), o && ((h = e.current) == null || h.redo()));
      } else {
        if (!l.ctrlKey) return;
        !l.shiftKey && w === "z" ? (l.preventDefault(), r && ((g = e.current) == null || g.undo())) : (w === "y" || l.shiftKey && w === "z") && (l.preventDefault(), o && ((f = e.current) == null || f.redo()));
      }
    };
    return document.addEventListener("keydown", c), () => document.removeEventListener("keydown", c);
  }, [o, r, e]), /* @__PURE__ */ a("div", { ref: n, children: t });
}
const lw = (t, e, r) => t === "generated" ? /* @__PURE__ */ u(dt, { children: [
  /* @__PURE__ */ a("p", { children: "+" }),
  " ",
  e["%footnoteEditor_callerDropdown_item_generated%"]
] }) : t === "hidden" ? /* @__PURE__ */ u(dt, { children: [
  /* @__PURE__ */ a("p", { children: "-" }),
  " ",
  e["%footnoteEditor_callerDropdown_item_hidden%"]
] }) : /* @__PURE__ */ u(dt, { children: [
  /* @__PURE__ */ a("p", { children: r }),
  " ",
  e["%footnoteEditor_callerDropdown_item_custom%"]
] });
function dw({
  callerType: t,
  updateCallerType: e,
  customCaller: r,
  updateCustomCaller: o,
  localizedStrings: n
}) {
  const i = U(null), s = U(null), c = U(!1), [d, l] = _(t), [w, p] = _(r), [h, g] = _(!1);
  X(() => {
    l(t);
  }, [t]), X(() => {
    w !== r && p(r);
  }, [r]);
  const f = (v) => {
    c.current = !1, g(v), v || (d !== "custom" || w ? (e(d), o(w)) : (l(t), p(r)));
  }, x = (v) => {
    var C, N, k, M;
    v.stopPropagation(), document.activeElement === s.current && v.key === "ArrowDown" || v.key === "ArrowRight" ? ((C = i.current) == null || C.focus(), c.current = !0) : document.activeElement === i.current && v.key === "ArrowUp" ? ((N = s.current) == null || N.focus(), c.current = !1) : document.activeElement === i.current && v.key === "ArrowLeft" && ((k = i.current) == null ? void 0 : k.selectionStart) === 0 && ((M = s.current) == null || M.focus(), c.current = !1), d === "custom" && v.key === "Enter" && (document.activeElement === s.current || document.activeElement === i.current) && f(!1);
  };
  return /* @__PURE__ */ u(Ce, { open: h, onOpenChange: f, children: [
    /* @__PURE__ */ a(Gt, { children: /* @__PURE__ */ u(Ht, { children: [
      /* @__PURE__ */ a(Yt, { asChild: !0, children: /* @__PURE__ */ a(Ee, { asChild: !0, children: /* @__PURE__ */ a(q, { variant: "outline", className: "tw:h-6", children: lw(t, n, r) }) }) }),
      /* @__PURE__ */ a(Wt, { children: n["%footnoteEditor_callerDropdown_tooltip%"] })
    ] }) }),
    /* @__PURE__ */ u(
      Te,
      {
        style: { zIndex: pn },
        onClick: () => {
          c.current && (c.current = !1);
        },
        onKeyDown: x,
        onMouseMove: () => {
          var v;
          c.current && ((v = i.current) == null || v.focus());
        },
        children: [
          /* @__PURE__ */ a(Cr, { children: n["%footnoteEditor_callerDropdown_label%"] }),
          /* @__PURE__ */ a(Ge, {}),
          /* @__PURE__ */ a(
            Oe,
            {
              checked: d === "generated",
              onCheckedChange: () => l("generated"),
              children: /* @__PURE__ */ u("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ a("span", { children: n["%footnoteEditor_callerDropdown_item_generated%"] }),
                /* @__PURE__ */ a("span", { className: "tw:w-10 tw:text-center", children: Oa })
              ] })
            }
          ),
          /* @__PURE__ */ a(
            Oe,
            {
              checked: d === "hidden",
              onCheckedChange: () => l("hidden"),
              children: /* @__PURE__ */ u("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ a("span", { children: n["%footnoteEditor_callerDropdown_item_hidden%"] }),
                /* @__PURE__ */ a("span", { className: "tw:w-10 tw:text-center", children: Aa })
              ] })
            }
          ),
          /* @__PURE__ */ a(
            Oe,
            {
              ref: s,
              checked: d === "custom",
              onCheckedChange: () => l("custom"),
              onClick: (v) => {
                var C;
                v.stopPropagation(), c.current = !0, (C = i.current) == null || C.focus();
              },
              onSelect: (v) => v.preventDefault(),
              children: /* @__PURE__ */ u("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ a("span", { children: n["%footnoteEditor_callerDropdown_item_custom%"] }),
                /* @__PURE__ */ a(
                  ta,
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
const ww = (t, e) => t === "f" ? /* @__PURE__ */ u(dt, { children: [
  /* @__PURE__ */ a(xn, {}),
  " ",
  e["%footnoteEditor_noteType_footnote_label%"]
] }) : t === "fe" ? /* @__PURE__ */ u(dt, { children: [
  /* @__PURE__ */ a(yn, {}),
  " ",
  e["%footnoteEditor_noteType_endNote_label%"]
] }) : /* @__PURE__ */ u(dt, { children: [
  /* @__PURE__ */ a(bn, {}),
  " ",
  e["%footnoteEditor_noteType_crossReference_label%"]
] }), uw = (t, e) => {
  if (t === "x")
    return e["%footnoteEditor_noteType_crossReference_label%"];
  let r = e["%footnoteEditor_noteType_endNote_label%"];
  return t === "f" && (r = e["%footnoteEditor_noteType_footnote_label%"]), qe(e["%footnoteEditor_noteType_tooltip%"] ?? "", {
    noteType: r
  });
};
function pw({
  noteType: t,
  handleNoteTypeChange: e,
  localizedStrings: r,
  isTypeSwitchable: o
}) {
  return /* @__PURE__ */ u(Ce, { children: [
    /* @__PURE__ */ a(Gt, { children: /* @__PURE__ */ u(Ht, { children: [
      /* @__PURE__ */ a(Yt, { asChild: !0, children: /* @__PURE__ */ a(Ee, { asChild: !0, children: /* @__PURE__ */ a(q, { variant: "outline", className: "tw:h-6", children: ww(t, r) }) }) }),
      /* @__PURE__ */ a(Wt, { children: /* @__PURE__ */ a("p", { children: uw(t, r) }) })
    ] }) }),
    /* @__PURE__ */ u(Te, { style: { zIndex: pn }, children: [
      /* @__PURE__ */ a(Cr, { children: r["%footnoteEditor_noteTypeDropdown_label%"] }),
      /* @__PURE__ */ a(Ge, {}),
      /* @__PURE__ */ u(
        Oe,
        {
          disabled: t !== "x" && !o,
          checked: t === "x",
          onCheckedChange: () => e("x"),
          className: "tw:gap-2",
          children: [
            /* @__PURE__ */ a(bn, {}),
            /* @__PURE__ */ a("span", { children: r["%footnoteEditor_noteType_crossReference_label%"] })
          ]
        }
      ),
      /* @__PURE__ */ u(
        Oe,
        {
          disabled: t === "x" && !o,
          checked: t === "f",
          onCheckedChange: () => e("f"),
          className: "tw:gap-2",
          children: [
            /* @__PURE__ */ a(xn, {}),
            /* @__PURE__ */ a("span", { children: r["%footnoteEditor_noteType_footnote_label%"] })
          ]
        }
      ),
      /* @__PURE__ */ u(
        Oe,
        {
          disabled: t === "x" && !o,
          checked: t === "fe",
          onCheckedChange: () => e("fe"),
          className: "tw:gap-2",
          children: [
            /* @__PURE__ */ a(yn, {}),
            /* @__PURE__ */ a("span", { children: r["%footnoteEditor_noteType_endNote_label%"] })
          ]
        }
      )
    ] })
  ] });
}
const hw = Object.freeze([
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
function gw({ icon: t, className: e }) {
  return /* @__PURE__ */ a(t ?? Es, { className: e, size: 16 });
}
function rn({
  item: t,
  localizedStrings: e
}) {
  return /* @__PURE__ */ u(
    Ie,
    {
      className: "tw:flex tw:gap-2 tw:hover:bg-accent",
      disabled: t.isDisallowed || t.isDeprecated,
      onSelect: t.action,
      children: [
        /* @__PURE__ */ a("div", { className: "tw:w-8 tw:min-w-8", children: t.marker ? /* @__PURE__ */ a("span", { className: "tw:text-xs", children: t.marker }) : /* @__PURE__ */ a("div", { children: /* @__PURE__ */ a(gw, { icon: t.icon }) }) }),
        /* @__PURE__ */ u("div", { children: [
          /* @__PURE__ */ a("p", { className: "tw:text-sm", children: t.title }),
          t.subtitle && /* @__PURE__ */ a("p", { className: "tw:text-xs tw:text-muted-foreground", children: t.subtitle })
        ] }),
        (t.isDisallowed || t.isDeprecated) && /* @__PURE__ */ a(Wi, { className: "tw:font-sans", children: t.isDisallowed ? e["%markerMenu_disallowed_label%"] : e["%markerMenu_deprecated_label%"] })
      ]
    }
  );
}
function fw({
  localizedStrings: t,
  markerMenuItems: e,
  searchRef: r,
  searchPlaceholder: o
}) {
  const [n, i] = _(""), [s, c] = I(() => {
    const d = n.trim().toLowerCase();
    if (!d) {
      const p = e.filter((h) => !h.isDisallowed);
      return [p.length > 0 ? p : e, []];
    }
    const l = e.filter((p) => {
      var g;
      const h = (g = p.marker) == null ? void 0 : g.toLowerCase();
      return p.isDisallowed ? h === d : h == null ? void 0 : h.includes(d);
    }), w = e.filter(
      (p) => p.title.toLowerCase().includes(d) && !l.includes(p)
    );
    return [l, w];
  }, [n, e]);
  return /* @__PURE__ */ u(Ye, { className: "tw:p-1", shouldFilter: !1, loop: !0, children: [
    /* @__PURE__ */ a(
      Qr,
      {
        className: "marker-menu-search",
        ref: r,
        value: n,
        onValueChange: (d) => i(d),
        placeholder: o ?? t["%markerMenu_searchPlaceholder%"]
      }
    ),
    /* @__PURE__ */ u(We, { children: [
      /* @__PURE__ */ a(Ua, { children: t["%markerMenu_noResults%"] }),
      /* @__PURE__ */ a(Ne, { children: s.map((d) => {
        var l;
        return /* @__PURE__ */ a(
          rn,
          {
            item: d,
            localizedStrings: t
          },
          `item-${d.marker ?? ((l = d.icon) == null ? void 0 : l.displayName)}-${d.title.replaceAll(" ", "")}`
        );
      }) }),
      c.length > 0 && /* @__PURE__ */ u(dt, { children: [
        s.length > 0 && /* @__PURE__ */ a(hn, { alwaysRender: !0 }),
        /* @__PURE__ */ a(Ne, { children: c.map((d) => {
          var l;
          return /* @__PURE__ */ a(
            rn,
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
function mw(t, e, r, o) {
  if (!o || o === "p") return [];
  const n = Vr[o];
  if (!(n != null && n.children)) return [];
  const i = [];
  return Object.entries(n.children).forEach(([, s]) => {
    i.push(
      ...s.map((c) => ({
        marker: c,
        title: r[Vr[c].description] ?? Vr[c].description,
        action: () => {
          var d;
          (d = t.current) == null || d.insertMarker(c), e();
        }
      }))
    );
  }), i.sort((s, c) => (s.marker ?? s.title).localeCompare(c.marker ?? c.title));
}
function vw(t) {
  return {
    id: t.marker,
    label: t.marker,
    description: t.description,
    badge: t.kind === "closeTag" ? "end" : void 0,
    muted: !t.isBasic
  };
}
function an(t, e) {
  var r;
  ((r = t.current) == null ? void 0 : r.token) === e && (t.current = void 0);
}
function bw(t) {
  var r;
  const e = (r = t.attributes) == null ? void 0 : r.char;
  e.style && (e.style === "ft" && (e.style = "xt"), e.style === "fr" && (e.style = "xo"), e.style === "fq" && (e.style = "xq"));
}
function xw(t) {
  var r;
  const e = (r = t.attributes) == null ? void 0 : r.char;
  e.style && (e.style === "xt" && (e.style = "ft"), e.style === "xo" && (e.style = "fr"), e.style === "xq" && (e.style = "fq"));
}
const yw = {
  type: "USJ",
  version: "3.1",
  content: [
    {
      type: "para"
    }
  ]
}, kw = 3;
function mp({
  classNameForEditor: t,
  noteOps: e,
  onChange: r,
  onClose: o,
  scrRef: n,
  noteKey: i,
  isNewNote: s,
  editorOptions: c,
  defaultMarkerMenuTrigger: d,
  localizedStrings: l,
  parentEditorRef: w,
  markerPalette: p
}) {
  var Ft, Qt;
  const h = U(null), g = U(null), f = U(null), x = U(null);
  qt(() => {
    if (!x.current) return;
    const { width: D } = x.current.getBoundingClientRect();
    D > 0 && (x.current.style.width = `${D}px`);
  }, []);
  const [v, C] = _("generated"), [N, k] = _("generated"), [M, j] = _("*"), [S, P] = _("*"), [$, E] = _("f"), [B, O] = _(!1), [T, G] = _(!0), [H, F] = _(!1), V = U(!1), R = U(""), [Z, rt] = _(!1), [Ct, Et] = _(), [At, K] = _(), [at, gt] = _(), [wt, bt] = _(), pe = U(null), ct = U(void 0), Lt = U(0), xt = I(
    () => ({
      ...c,
      // Drop any inherited context-menu extras (e.g. the main editor's "Insert footnote" /
      // "Insert cross-reference" / "Insert comment" items). Those items' onSelect closures are
      // bound to the OUTER main-document editorRef, so surfacing them inside this popover would
      // let a right-click here silently mutate the main document. The popover keeps only the
      // built-in Cut/Copy/Paste context-menu items.
      contextMenu: void 0,
      markerMenuTrigger: d,
      hasExternalUI: !0,
      view: { ...c.view ?? ol(), noteMode: "expanded" }
    }),
    [c, d]
  ), re = U((Ft = xt.view) == null ? void 0 : Ft.markerMode);
  qt(() => {
    var D;
    re.current = (D = xt.view) == null ? void 0 : D.markerMode;
  });
  const Jt = I(
    () => mw(
      h,
      () => rt(!1),
      l,
      wt
    ),
    [l, wt]
  );
  X(() => {
    var D;
    Z || (D = h.current) == null || D.focus();
  }, [$, Z]), X(() => {
    var ut, nt;
    let D;
    V.current = !1, G(!0);
    const J = e == null ? void 0 : e.at(0);
    if (J && $r("note", J)) {
      const et = (ut = J.insert.note) == null ? void 0 : ut.caller;
      let it = "custom";
      et === Oa ? it = "generated" : et === Aa ? it = "hidden" : et && (j(et), P(et)), C(it), k(it), E(((nt = J.insert.note) == null ? void 0 : nt.style) ?? "f"), D = setTimeout(() => {
        var W, tt, lt;
        const y = re.current === "editable" ? [{ retain: kw }, J] : [J];
        (W = h.current) == null || W.applyUpdate(y), s && ((tt = h.current) == null || tt.selectNote(0), (lt = h.current) == null || lt.focus());
      }, 0);
    }
    return () => {
      D && clearTimeout(D);
    };
  }, [e, i, s]);
  const z = L(
    (D, J, ut = !1) => {
      var et, it, y;
      const nt = (it = (et = h.current) == null ? void 0 : et.getNoteOps(0)) == null ? void 0 : it.at(0);
      if (nt && $r("note", nt)) {
        if (nt.insert.note) {
          let W;
          D === "custom" ? W = J : D === "generated" ? W = Oa : W = Aa, nt.insert.note.caller = W;
        }
        r == null || r([nt]), ut && w && i && ((y = w.current) == null || y.replaceEmbedUpdate(i, [nt]));
      }
    },
    [i, r, w]
  ), It = L(() => {
    z(v, M, !0), o();
  }, [v, M, o, z]), yt = U(It);
  qt(() => {
    yt.current = It;
  });
  const _t = U({ book: n.book, chapterNum: n.chapterNum });
  qt(() => {
    (_t.current.book !== n.book || _t.current.chapterNum !== n.chapterNum) && (_t.current = { book: n.book, chapterNum: n.chapterNum }, yt.current());
  }, [n.book, n.chapterNum]);
  const ae = () => {
    var J;
    const D = (J = g.current) == null ? void 0 : J.getElementsByClassName("editor-input")[0];
    D != null && D.textContent && navigator.clipboard.writeText(D.textContent);
  }, Se = L(
    (D) => {
      C(D), z(D, M);
    },
    [M, z]
  ), he = L(
    (D) => {
      j(D), z(v, D);
    },
    [v, z]
  ), ce = (D) => {
    var ut, nt, et, it, y;
    E(D);
    const J = (nt = (ut = h.current) == null ? void 0 : ut.getNoteOps(0)) == null ? void 0 : nt.at(0);
    if (J && $r("note", J)) {
      J.insert.note && (J.insert.note.style = D);
      const W = (it = (et = J.insert.note) == null ? void 0 : et.contents) == null ? void 0 : it.ops;
      $ !== "x" && D === "x" ? W == null || W.forEach((tt) => bw(tt)) : $ === "x" && D !== "x" && (W == null || W.forEach((tt) => xw(tt))), (y = h.current) == null || y.applyUpdate([J, { delete: 1 }]);
    }
  }, le = (D) => {
    bt(D.contextMarker), F(D.canRedo);
  }, Tt = L(
    (D) => {
      var ut, nt, et, it, y;
      const J = (nt = (ut = h.current) == null ? void 0 : ut.getNoteOps(0)) == null ? void 0 : nt.at(0);
      if (J && $r("note", J)) {
        D.content.length > 1 && setTimeout(() => {
          var lt;
          (lt = h.current) == null || lt.applyUpdate([{ retain: 2 }, { delete: 1 }]);
        }, 0);
        const W = (et = J.insert.note) == null ? void 0 : et.style, tt = (y = (it = J.insert.note) == null ? void 0 : it.contents) == null ? void 0 : y.ops;
        if (W || O(!1), O(
          W === "x" ? !!(tt != null && tt.every((lt) => {
            var Ut, te;
            if (!((Ut = lt.attributes) != null && Ut.char)) return !0;
            const mt = ((te = lt.attributes) == null ? void 0 : te.char).style;
            return mt === "xt" || mt === "xo" || mt === "xq";
          })) : !!(tt != null && tt.every((lt) => {
            var Ut, te;
            if (!((Ut = lt.attributes) != null && Ut.char)) return !0;
            const mt = ((te = lt.attributes) == null ? void 0 : te.char).style;
            return mt === "ft" || mt === "fr" || mt === "fq";
          }))
        ), !V.current) {
          V.current = !0, R.current = JSON.stringify(J), G(!0);
          return;
        }
        G(JSON.stringify(J) === R.current), z(v, M);
      } else
        O(!1), G(!0);
    },
    [v, M, z]
  ), Mt = L(() => {
    const D = window.getSelection();
    if (f.current && Jt.length && D && D.rangeCount > 0) {
      const J = D.getRangeAt(0).getBoundingClientRect(), ut = f.current.getBoundingClientRect();
      Et(J.left - ut.left), K(J.top - ut.top), gt(J.height), rt(!0);
    }
  }, [Jt, f]), Zt = L(
    (D, J, ut) => {
      const { anchorRect: nt } = D;
      if (!p || !nt) return;
      const { passive: et, literalPrefixLanded: it } = ut;
      Lt.current += 1;
      const y = Lt.current;
      ct.current = {
        kind: et ? "backslash" : "selection",
        token: y,
        literalPrefixLanded: it,
        filter: "",
        items: J
      }, p.show(J.map(vw), nt, et).then((W) => {
        var tt, lt, mt;
        if (an(ct, y), W !== void 0) {
          const Ut = J.find((te) => te.marker === W);
          Ut && ((tt = h.current) == null || tt.applyMarkerMenuSelection(Ut, {
            trigger: "backslash",
            literalPrefixLanded: it
          })), (lt = h.current) == null || lt.focus();
        } else et || (mt = h.current) == null || mt.focus();
      }).catch(() => {
        var W;
        an(ct, y), et || (W = h.current) == null || W.focus();
      });
    },
    [p]
  );
  X(() => {
    const D = () => {
      Z && rt(!1);
    };
    return window.addEventListener("click", D), () => {
      window.removeEventListener("click", D);
    };
  }, [Z]), X(() => {
    var D;
    Z && ((D = pe.current) == null || D.focus());
  }, [Z]), X(() => {
    var ut, nt;
    const D = ((ut = g.current) == null ? void 0 : ut.querySelector(".editor-input")) ?? void 0;
    if (((nt = xt.view) == null ? void 0 : nt.markerMode) === "editable") {
      if (!p) return () => {
      };
      const et = (it) => {
        var mt;
        if (!D || document.activeElement !== D) return;
        const y = ct.current;
        if (y) {
          nw(it, y, p) === "ended" && (ct.current = void 0);
          return;
        }
        if (it.key !== d) return;
        const W = (mt = h.current) == null ? void 0 : mt.getMarkerMenuContext();
        if (!W) return;
        const tt = il(xt.styleInfo ?? sl, W);
        if (tt.length === 0) return;
        const lt = !W.hasTextSelection;
        lt || (it.preventDefault(), it.stopPropagation()), Zt(W, tt, { passive: lt, literalPrefixLanded: lt });
      };
      return document.addEventListener("keydown", et, { capture: !0 }), () => {
        document.removeEventListener("keydown", et, { capture: !0 });
      };
    }
    const J = (et) => {
      !Z && D && document.activeElement === D && et.key === d ? (et.preventDefault(), Mt()) : Z && et.key === "Escape" && (et.preventDefault(), rt(!1));
    };
    return document.addEventListener("keydown", J), () => {
      document.removeEventListener("keydown", J);
    };
  }, [
    Z,
    Mt,
    d,
    (Qt = xt.view) == null ? void 0 : Qt.markerMode,
    xt.styleInfo,
    p,
    Zt
  ]);
  const zt = l["%footnoteEditor_copyButton_tooltip%"];
  return /* @__PURE__ */ u(dt, { children: [
    /* @__PURE__ */ u("div", { ref: x, className: "footnote-editor tw:grid tw:gap-[12px]", children: [
      /* @__PURE__ */ u("div", { className: "tw:flex", children: [
        /* @__PURE__ */ u("div", { className: "tw:flex tw:gap-4", children: [
          /* @__PURE__ */ a(
            pw,
            {
              isTypeSwitchable: B,
              noteType: $,
              handleNoteTypeChange: ce,
              localizedStrings: l
            }
          ),
          /* @__PURE__ */ a(
            dw,
            {
              callerType: v,
              updateCallerType: Se,
              customCaller: M,
              updateCustomCaller: he,
              localizedStrings: l
            }
          )
        ] }),
        /* @__PURE__ */ a("div", { className: "tw:flex tw:w-full tw:justify-end", children: /* @__PURE__ */ u(Ka, { children: [
          /* @__PURE__ */ a(
            sw,
            {
              onUndoClick: () => {
                var D;
                return (D = h.current) == null ? void 0 : D.undo();
              },
              onRedoClick: () => {
                var D;
                return (D = h.current) == null ? void 0 : D.redo();
              },
              canUndo: !T,
              canRedo: H,
              localizedStrings: l
            }
          ),
          /* @__PURE__ */ a(
            gi,
            {
              onCancelClick: o,
              onAcceptClick: It,
              canAccept: !T || N !== v || v === "custom" && M !== S,
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
              cw,
              {
                editorRef: h,
                canUndo: !T,
                canRedo: H,
                children: /* @__PURE__ */ a(
                  nl,
                  {
                    options: xt,
                    onStateChange: le,
                    onUsjChange: Tt,
                    defaultUsj: yw,
                    onScrRefChange: () => {
                    },
                    scrRef: n,
                    ref: h
                  }
                )
              }
            ) }),
            /* @__PURE__ */ a("div", { className: "tw:absolute tw:bottom-0 tw:right-0", children: /* @__PURE__ */ a(Gt, { children: /* @__PURE__ */ u(Ht, { children: [
              /* @__PURE__ */ a(Yt, { asChild: !0, children: /* @__PURE__ */ a(
                q,
                {
                  "aria-label": zt,
                  onClick: ae,
                  className: "tw:h-6 tw:w-6",
                  variant: "ghost",
                  size: "icon",
                  children: /* @__PURE__ */ a(vn, {})
                }
              ) }),
              /* @__PURE__ */ a(Wt, { children: /* @__PURE__ */ a("p", { children: zt }) })
            ] }) }) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ a(
      "div",
      {
        className: "tw:absolute",
        ref: f,
        style: { top: 0, left: 0, height: 0, width: 0 }
      }
    ),
    /* @__PURE__ */ u(Pe, { open: Z, children: [
      /* @__PURE__ */ a(
        Xi,
        {
          className: "tw:absolute",
          style: {
            top: At,
            left: Ct,
            height: at,
            width: 0,
            pointerEvents: "none"
          }
        }
      ),
      /* @__PURE__ */ a(
        Ve,
        {
          className: "tw:w-[500px] tw:p-0",
          onClick: (D) => {
            D.preventDefault(), D.stopPropagation();
          },
          children: /* @__PURE__ */ a(
            fw,
            {
              markerMenuItems: Jt,
              localizedStrings: l,
              searchRef: pe
            }
          )
        }
      )
    ] })
  ] });
}
const vp = Object.freeze([
  ...hw,
  ...Object.entries(Vr).map(([, t]) => t.description).filter((t) => !!t),
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
  ...iw,
  ...hi
]);
function yi(t, e) {
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
  }), s.length > 0 && i.push(s), i.map((c, d) => {
    const l = d === i.length - 1;
    return /* @__PURE__ */ u("p", { children: [
      po(t, c, r, !0, n),
      l && o
    ] }, yi(t, c));
  });
}
function po(t, e, r = !0, o = !0, n = []) {
  if (!(!e || e.length === 0))
    return e.map((i) => {
      if (typeof i == "string") {
        const s = `${t}-text-${i.slice(0, 10)}`;
        if (o) {
          const c = m(`usfm_${t}`);
          return /* @__PURE__ */ a("span", { className: c, children: i }, s);
        }
        return /* @__PURE__ */ u(
          "span",
          {
            className: "tw:inline-flex tw:items-center tw:gap-1 tw:underline tw:decoration-destructive",
            children: [
              /* @__PURE__ */ a(Sa, { className: "tw:h-4 tw:w-4 tw:fill-destructive" }),
              /* @__PURE__ */ a("span", { children: i }),
              /* @__PURE__ */ a(Sa, { className: "tw:h-4 tw:w-4 tw:fill-destructive" })
            ]
          },
          s
        );
      }
      return Nw(
        i,
        yi(`${t}\\${i.marker}`, [i]),
        r,
        [...n, t ?? "unknown"]
      );
    });
}
function Nw(t, e, r, o = []) {
  const { marker: n } = t;
  return /* @__PURE__ */ u("span", { children: [
    n ? r && /* @__PURE__ */ a("span", { className: "marker", children: `\\${n} ` }) : /* @__PURE__ */ a(
      Sa,
      {
        className: "tw:text-error tw:mr-1 tw:inline-block tw:h-4 tw:w-4",
        "aria-label": "Missing marker"
      }
    ),
    po(n, t.content, r, !0, [
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
  const d = o ? /* @__PURE__ */ a("span", { className: "marker", children: `\\${t.marker} ` }) : void 0, l = o ? /* @__PURE__ */ a("span", { className: "marker", children: ` \\${t.marker}*` }) : void 0, w = n && // USFM does not specify a marker for caller, so instead of a usfm_* class, we use a
  // specific class name in case styling is needed.
  /* @__PURE__ */ u("span", { className: m("note-caller tw:inline-block", { formatted: i }), children: [
    n,
    " "
  ] }), p = s && /* @__PURE__ */ u(dt, { children: [
    po(t.marker, [s], o, !1),
    " "
  ] }), h = e === "horizontal" ? "horizontal" : "vertical", g = o ? "marker-visible" : "", f = e === "horizontal" ? "tw:col-span-1" : "tw:col-span-2 tw:col-start-1 tw:row-start-2", x = m(h, g);
  return /* @__PURE__ */ u(dt, { children: [
    /* @__PURE__ */ u("div", { className: m("textual-note-header tw:col-span-1 tw:w-fit tw:text-nowrap", x), children: [
      d,
      w
    ] }),
    /* @__PURE__ */ a("div", { className: m("textual-note-header tw:col-span-1 tw:w-fit tw:text-nowrap", x), children: p }),
    /* @__PURE__ */ a(
      "div",
      {
        className: m(
          "textual-note-body tw:flex tw:flex-col tw:gap-1",
          f,
          x
        ),
        children: c && c.length > 0 && /* @__PURE__ */ a(dt, { children: _w(t.marker, c, o, l) })
      }
    )
  ] });
}
function bp({
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
  const w = d ?? Fs(r, void 0), p = (N, k) => {
    l == null || l(N, k, n);
  }, h = i ? r.findIndex((N) => N === i) : -1, [g, f] = _(h), x = (N, k, M) => {
    if (r.length)
      switch (N.key) {
        case "Enter":
        case " ":
          N.preventDefault(), l == null || l(k, M, n);
          break;
      }
  }, v = (N) => {
    if (r.length)
      switch (N.key) {
        case "ArrowDown":
          N.preventDefault(), f((k) => Math.min(k + 1, r.length - 1));
          break;
        case "ArrowUp":
          N.preventDefault(), f((k) => Math.max(k - 1, 0));
          break;
      }
  }, C = U([]);
  return X(() => {
    var N;
    g >= 0 && g < C.current.length && ((N = C.current[g]) == null || N.focus());
  }, [g]), /* @__PURE__ */ a(
    "div",
    {
      role: "listbox",
      "aria-label": "Footnotes",
      tabIndex: g < 0 ? 0 : -1,
      className: m("tw:h-full tw:overflow-y-auto", t),
      onKeyDown: v,
      children: /* @__PURE__ */ a(
        "ul",
        {
          className: m(
            "tw:p-0.5 tw:pt-1",
            "tw:grid",
            o === "horizontal" ? "tw:grid-cols-[min-content_min-content_1fr]" : "tw:grid-cols-[min-content_1fr]",
            !c && "formatted-font"
          ),
          children: r.map((N, k) => {
            const M = N === i, j = `${n}-${k}`;
            return /* @__PURE__ */ u(dt, { children: [
              /* @__PURE__ */ a(
                "li",
                {
                  ref: (S) => {
                    C.current[k] = S;
                  },
                  role: "option",
                  "aria-selected": M,
                  "data-marker": N.marker,
                  "data-state": M ? "selected" : void 0,
                  tabIndex: k === g ? 0 : -1,
                  className: m(
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
                  onClick: () => p(N, k),
                  onKeyDown: (S) => x(S, N, k),
                  children: /* @__PURE__ */ a(
                    Cw,
                    {
                      footnote: N,
                      layout: o,
                      formatCaller: () => w(N.caller, k),
                      showMarkers: s
                    }
                  )
                },
                j
              ),
              k < r.length - 1 && o === "vertical" && /* @__PURE__ */ a(kr, { tabIndex: -1, className: "tw:col-span-2" })
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
  const n = r["%webView_inventory_occurrences_table_header_reference%"], i = r["%webView_inventory_occurrences_table_header_occurrence%"], s = I(() => {
    const c = [], d = /* @__PURE__ */ new Set();
    return t.forEach((l) => {
      const w = `${l.reference.book}:${l.reference.chapterNum}:${l.reference.verseNum}:${l.text}`;
      d.has(w) || (d.add(w), c.push(l));
    }), c;
  }, [t]);
  return /* @__PURE__ */ u(Ga, { stickyHeader: !0, children: [
    /* @__PURE__ */ a(Ha, { stickyHeader: !0, children: /* @__PURE__ */ u($e, { children: [
      /* @__PURE__ */ a(qr, { children: n }),
      /* @__PURE__ */ a(qr, { children: i })
    ] }) }),
    /* @__PURE__ */ a(Ya, { children: s.length > 0 && s.map((c) => /* @__PURE__ */ u(
      $e,
      {
        onClick: () => {
          e(c.reference);
        },
        children: [
          /* @__PURE__ */ a(er, { children: ke(c.reference, "English") }),
          /* @__PURE__ */ a(er, { className: o, children: Ew(c.text) })
        ]
      },
      `${c.reference.book} ${c.reference.chapterNum}:${c.reference.verseNum}-${c.text}`
    )) })
  ] });
}
function ki({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    So.Root,
    {
      "data-slot": "checkbox",
      className: m(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:peer tw:relative tw:flex tw:size-4 tw:shrink-0 tw:items-center tw:justify-center tw:rounded-[4px] tw:border tw:border-input tw:transition-colors tw:outline-none tw:group-has-disabled/field:opacity-50 tw:after:absolute tw:after:-inset-x-3 tw:after:-inset-y-2 tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:aria-invalid:aria-checked:border-primary tw:dark:bg-input/30 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40 tw:data-checked:border-primary tw:data-checked:bg-primary tw:data-checked:text-primary-foreground tw:dark:data-checked:bg-primary",
        t
      ),
      ...e,
      children: /* @__PURE__ */ a(
        So.Indicator,
        {
          "data-slot": "checkbox-indicator",
          className: "tw:grid tw:place-content-center tw:text-current tw:transition-none tw:[&>svg]:size-3.5",
          children: /* @__PURE__ */ a(ra, {})
        }
      )
    }
  );
}
const zw = (t) => {
  if (t === "asc")
    return /* @__PURE__ */ a(Rs, { className: "tw:h-4 tw:w-4" });
  if (t === "desc")
    return /* @__PURE__ */ a(Ds, { className: "tw:h-4 tw:w-4" });
}, oa = (t, e, r) => /* @__PURE__ */ a(Gt, { children: /* @__PURE__ */ u(Ht, { children: [
  /* @__PURE__ */ u(
    Yt,
    {
      className: m("tw:flex tw:w-full tw:justify-start", r),
      variant: "ghost",
      onClick: () => t.toggleSorting(void 0),
      children: [
        /* @__PURE__ */ a("span", { className: "tw:w-6 tw:max-w-fit tw:flex-1 tw:overflow-hidden tw:text-ellipsis", children: e }),
        zw(t.getIsSorted())
      ]
    }
  ),
  /* @__PURE__ */ a(Wt, { side: "bottom", children: e })
] }) }), xp = (t) => ({
  accessorKey: "item",
  accessorFn: (e) => e.items[0],
  header: ({ column: e }) => oa(e, t)
}), Sw = (t, e) => ({
  accessorKey: `item${e}`,
  accessorFn: (r) => r.items[e],
  header: ({ column: r }) => oa(r, t)
}), yp = (t) => ({
  accessorKey: "count",
  header: ({ column: e }) => oa(e, t, "tw:justify-end"),
  cell: ({ row: e }) => /* @__PURE__ */ a("div", { className: "tw:flex tw:justify-end tw:tabular-nums", children: e.getValue("count") })
}), xa = (t, e, r, o, n, i) => {
  let s = [...r];
  t.forEach((d) => {
    e === "approved" ? s.includes(d) || s.push(d) : s = s.filter((l) => l !== d);
  }), o(s);
  let c = [...n];
  t.forEach((d) => {
    e === "unapproved" ? c.includes(d) || c.push(d) : c = c.filter((l) => l !== d);
  }), i(c);
}, kp = (t, e, r, o, n) => ({
  accessorKey: "status",
  header: ({ column: i }) => oa(i, t, "tw:justify-center"),
  cell: ({ row: i }) => {
    const s = i.getValue("status"), c = i.getValue("item");
    return (
      // Center the status buttons in the cell to match the centered status column header (the
      // ToggleGroup would otherwise sit left-aligned).
      /* @__PURE__ */ a("div", { className: "tw:flex tw:justify-center", children: /* @__PURE__ */ u(wi, { value: s, variant: "outline", type: "single", className: "tw:gap-0", children: [
        /* @__PURE__ */ a(
          Lr,
          {
            onClick: (d) => {
              d.stopPropagation(), xa(
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
            children: /* @__PURE__ */ a(Ts, {})
          }
        ),
        /* @__PURE__ */ a(
          Lr,
          {
            onClick: (d) => {
              d.stopPropagation(), xa(
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
            children: /* @__PURE__ */ a(zs, {})
          }
        ),
        /* @__PURE__ */ a(
          Lr,
          {
            onClick: (d) => {
              d.stopPropagation(), xa(
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
            children: /* @__PURE__ */ a(Ss, {})
          }
        )
      ] }) })
    );
  }
}), _p = (t) => t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g), Np = (t) => {
  const e = /^\\[vc]\s+(\d+)/, r = t.match(e);
  if (r)
    return +r[1];
}, Cp = (t) => {
  const e = t.match(/^\\id\s+([A-Za-z]+)/);
  return e ? e[1] : "";
}, Rw = (t, e, r) => r.includes(t) ? "unapproved" : e.includes(t) ? "approved" : "unknown", Ep = Object.freeze([
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
}, Mw = (t, e, r) => t.map((o) => {
  const n = Co(o.key) ? o.key : o.key[0];
  return {
    items: Co(o.key) ? [o.key] : o.key,
    count: o.count,
    status: o.status || Rw(n, e, r),
    occurrences: o.occurrences || []
  };
}), ge = (t, e) => t[e] ?? e;
function Tp({
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
  onItemSelected: h
}) {
  const g = ge(r, "%webView_inventory_all%"), f = ge(r, "%webView_inventory_approved%"), x = ge(r, "%webView_inventory_unapproved%"), v = ge(r, "%webView_inventory_unknown%"), C = ge(r, "%webView_inventory_scope_currentBook%"), N = ge(r, "%webView_inventory_scope_chapter%"), k = ge(r, "%webView_inventory_scope_verse%"), M = ge(r, "%webView_inventory_filter_text%"), j = ge(
    r,
    "%webView_inventory_show_additional_items%"
  ), S = ge(r, "%webView_inventory_no_results%"), [P, $] = _(!1), [E, B] = _("all"), [O, T] = _(""), [G, H] = _([]), F = I(() => {
    const K = t ?? [];
    return K.length === 0 ? [] : Mw(K, n, i);
  }, [t, n, i]), V = I(() => {
    if (P) return F;
    const K = [];
    return F.forEach((at) => {
      const gt = at.items[0], wt = K.find(
        (bt) => bt.items[0] === gt
      );
      wt ? (wt.count += at.count, wt.occurrences = wt.occurrences.concat(at.occurrences)) : K.push({
        items: [gt],
        count: at.count,
        occurrences: at.occurrences,
        status: at.status
      });
    }), K;
  }, [P, F]), R = I(() => V.length === 0 ? [] : Dw(V, E, O), [V, E, O]), Z = I(() => {
    var gt, wt;
    if (!P) return d;
    const K = (gt = o == null ? void 0 : o.tableHeaders) == null ? void 0 : gt.length;
    if (!K) return d;
    const at = [];
    for (let bt = 0; bt < K; bt++)
      at.push(
        Sw(
          ((wt = o == null ? void 0 : o.tableHeaders) == null ? void 0 : wt[bt]) || "Additional Item",
          bt + 1
        )
      );
    return [...at, ...d];
  }, [o == null ? void 0 : o.tableHeaders, d, P]);
  X(() => {
    R.length === 0 ? H([]) : R.length === 1 && H(R[0].items);
  }, [R]);
  const rt = (K, at) => {
    at.setRowSelection(() => {
      const wt = {};
      return wt[K.index] = !0, wt;
    });
    const gt = K.original.items;
    H(gt), h && gt.length > 0 && h(gt[0]);
  }, Ct = (K) => {
    if (K === "book" || K === "chapter" || K === "verse")
      c(K);
    else
      throw new Error(`Invalid scope value: ${K}`);
  }, Et = (K) => {
    if (K === "all" || K === "approved" || K === "unapproved" || K === "unknown")
      B(K);
    else
      throw new Error(`Invalid status filter value: ${K}`);
  }, At = I(() => {
    if (V.length === 0 || G.length === 0) return [];
    const K = V.filter((at) => Us(
      P ? at.items : [at.items[0]],
      G
    ));
    if (K.length > 1) throw new Error("Selected item is not unique");
    return K.length === 0 ? [] : K[0].occurrences;
  }, [G, P, V]);
  return /* @__PURE__ */ a("div", { id: l, className: "pr-twp tw:h-full tw:overflow-auto", children: /* @__PURE__ */ u("div", { className: "tw:flex tw:h-full tw:w-full tw:min-w-min tw:flex-col", children: [
    /* @__PURE__ */ u("div", { className: "tw:flex tw:items-stretch", style: { contain: "inline-size" }, children: [
      /* @__PURE__ */ u(
        sr,
        {
          onValueChange: (K) => Et(K),
          defaultValue: E,
          children: [
            /* @__PURE__ */ a(lr, { className: "tw:m-1 tw:w-auto tw:flex-1", children: /* @__PURE__ */ a(cr, { placeholder: "Select filter" }) }),
            /* @__PURE__ */ u(dr, { children: [
              /* @__PURE__ */ a(de, { value: "all", children: g }),
              /* @__PURE__ */ a(de, { value: "approved", children: f }),
              /* @__PURE__ */ a(de, { value: "unapproved", children: x }),
              /* @__PURE__ */ a(de, { value: "unknown", children: v })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ u(sr, { onValueChange: (K) => Ct(K), defaultValue: s, children: [
        /* @__PURE__ */ a(lr, { className: "tw:m-1 tw:w-auto tw:flex-1", children: /* @__PURE__ */ a(cr, { placeholder: "Select scope" }) }),
        /* @__PURE__ */ u(dr, { children: [
          /* @__PURE__ */ a(de, { value: "book", children: C }),
          /* @__PURE__ */ a(de, { value: "chapter", children: N }),
          /* @__PURE__ */ a(de, { value: "verse", children: k })
        ] })
      ] }),
      /* @__PURE__ */ a(
        ta,
        {
          className: "tw:m-1 tw:flex-1 tw:rounded-md tw:border",
          placeholder: M,
          value: O,
          onChange: (K) => {
            T(K.target.value);
          }
        }
      ),
      o && /* @__PURE__ */ a(Gt, { children: /* @__PURE__ */ u(Ht, { children: [
        /* @__PURE__ */ a(Yt, { asChild: !0, children: /* @__PURE__ */ u("div", { className: "tw:m-1 tw:flex tw:w-fit tw:min-w-[26px] tw:items-center tw:rounded-md tw:border", children: [
          /* @__PURE__ */ a(
            ki,
            {
              className: "tw:m-1 tw:shrink-0",
              checked: P,
              onCheckedChange: (K) => {
                $(K);
              }
            }
          ),
          /* @__PURE__ */ a(Nt, { className: "tw:m-1 tw:truncate", children: (o == null ? void 0 : o.checkboxText) ?? j })
        ] }) }),
        /* @__PURE__ */ a(Wt, { children: (o == null ? void 0 : o.checkboxText) ?? j })
      ] }) })
    ] }),
    /* @__PURE__ */ a("div", { className: "tw:m-1 tw:flex-1 tw:overflow-auto tw:rounded-md tw:border", children: /* @__PURE__ */ a(
      Qd,
      {
        columns: Z,
        data: R,
        onRowClickHandler: rt,
        stickyHeader: !0,
        isLoading: w,
        noResultsMessage: S
      }
    ) }),
    At.length > 0 && /* @__PURE__ */ a("div", { className: "tw:m-1 tw:flex-1 tw:overflow-auto tw:rounded-md tw:border", children: /* @__PURE__ */ a(
      Tw,
      {
        classNameForText: p,
        occurrenceData: At,
        setScriptureReference: e,
        localizedStrings: r
      }
    ) })
  ] }) });
}
const $w = "16rem", Ow = "3rem", _i = Rt.createContext(void 0);
function na() {
  const t = Rt.useContext(_i);
  if (!t)
    throw new Error("useSidebar must be used within a SidebarProvider.");
  return t;
}
function Aw({
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
  const [d, l] = Rt.useState(t), w = e ?? d, p = Rt.useCallback(
    (k) => {
      const M = typeof k == "function" ? k(w) : k;
      r ? r(M) : l(M);
    },
    [r, w]
  ), h = Rt.useCallback(() => p((k) => !k), [p]), g = w ? "expanded" : "collapsed", v = ie() === "ltr" ? s : s === "primary" ? "secondary" : "primary", C = Rt.useMemo(
    () => ({
      state: g,
      open: w,
      setOpen: p,
      toggleSidebar: h,
      // CUSTOM: Passes direction-aware side into context so SidebarTrigger icon and Sidebar
      // positioning both respond correctly in RTL layouts
      side: v
    }),
    [g, w, p, h, v]
  ), N = {
    "--sidebar-width": $w,
    "--sidebar-width-icon": Ow,
    ...n
  };
  return /* @__PURE__ */ a(_i.Provider, { value: C, children: /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "sidebar-wrapper",
      style: N,
      className: m(
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
function Iw({
  // CUSTOM: Removed 'side' prop from Sidebar - it is now read from context (moved to SidebarProvider)
  variant: t = "sidebar",
  collapsible: e = "offcanvas",
  className: r,
  children: o,
  ...n
}) {
  const i = na();
  return e === "none" ? /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "sidebar",
      className: m(
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
            className: m(
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
            className: m(
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
function zp({ className: t, onClick: e, ...r }) {
  const { toggleSidebar: o, side: n } = na();
  return /* @__PURE__ */ u(
    q,
    {
      "data-sidebar": "trigger",
      "data-slot": "sidebar-trigger",
      variant: "ghost",
      size: "icon-sm",
      className: m(t),
      onClick: (i) => {
        e == null || e(i), o();
      },
      ...r,
      children: [
        n === "primary" ? /* @__PURE__ */ a(Xc, {}) : /* @__PURE__ */ a(Jc, {}),
        /* @__PURE__ */ a("span", { className: "tw:sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
}
function Sp({ className: t, ...e }) {
  const { toggleSidebar: r } = na();
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
      className: m(
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
      className: m(
        // CUSTOM: Removed tw:min-h-svh - not appropriate in Platform.Bible's windowed layout
        "tw:relative tw:flex tw:w-full tw:flex-1 tw:flex-col tw:bg-background tw:md:peer-data-[variant=inset]:m-2 tw:md:peer-data-[variant=inset]:ms-0 tw:md:peer-data-[variant=inset]:rounded-xl tw:md:peer-data-[variant=inset]:shadow-sm tw:md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ms-2",
        t
      ),
      ...e
    }
  );
}
function Rp({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    ta,
    {
      "data-slot": "sidebar-input",
      "data-sidebar": "input",
      className: m("tw:h-8 tw:w-full tw:bg-background tw:shadow-none", t),
      ...e
    }
  );
}
function Dp({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "sidebar-header",
      "data-sidebar": "header",
      className: m("tw:flex tw:flex-col tw:gap-2 tw:p-2", t),
      ...e
    }
  );
}
function Mp({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "sidebar-footer",
      "data-sidebar": "footer",
      className: m("tw:flex tw:flex-col tw:gap-2 tw:p-2", t),
      ...e
    }
  );
}
function $p({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    kr,
    {
      "data-slot": "sidebar-separator",
      "data-sidebar": "separator",
      className: m("tw:mx-2 tw:w-auto tw:bg-sidebar-border", t),
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
      className: m(
        "tw:no-scrollbar tw:flex tw:min-h-0 tw:flex-1 tw:flex-col tw:gap-0 tw:overflow-auto tw:group-data-[collapsible=icon]:overflow-hidden",
        t
      ),
      ...e
    }
  );
}
function on({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "sidebar-group",
      "data-sidebar": "group",
      className: m("tw:relative tw:flex tw:w-full tw:min-w-0 tw:flex-col tw:p-2", t),
      ...e
    }
  );
}
function nn({
  className: t,
  asChild: e = !1,
  ...r
}) {
  const o = e ? Tr.Root : "div";
  return /* @__PURE__ */ a(
    o,
    {
      "data-slot": "sidebar-group-label",
      "data-sidebar": "group-label",
      className: m(
        "tw:flex tw:h-8 tw:shrink-0 tw:items-center tw:rounded-md tw:px-2 tw:text-xs tw:font-medium tw:text-sidebar-foreground/70 tw:ring-sidebar-ring tw:outline-hidden tw:transition-[margin,opacity] tw:duration-200 tw:ease-linear tw:group-data-[collapsible=icon]:-mt-8 tw:group-data-[collapsible=icon]:opacity-0 tw:focus-visible:ring-2 tw:[&>svg]:size-4 tw:[&>svg]:shrink-0",
        t
      ),
      ...r
    }
  );
}
function Op({
  className: t,
  asChild: e = !1,
  ...r
}) {
  const o = e ? Tr.Root : "button";
  return /* @__PURE__ */ a(
    o,
    {
      "data-slot": "sidebar-group-action",
      "data-sidebar": "group-action",
      className: m(
        "tw:absolute tw:top-3.5 tw:end-3 tw:flex tw:aspect-square tw:w-5 tw:items-center tw:justify-center tw:rounded-md tw:p-0 tw:text-sidebar-foreground tw:ring-sidebar-ring tw:outline-hidden tw:transition-transform tw:group-data-[collapsible=icon]:hidden tw:after:absolute tw:after:-inset-2 tw:hover:bg-sidebar-accent tw:hover:text-sidebar-accent-foreground tw:focus-visible:ring-2 tw:md:after:hidden tw:[&>svg]:size-4 tw:[&>svg]:shrink-0",
        t
      ),
      ...r
    }
  );
}
function sn({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "sidebar-group-content",
      "data-sidebar": "group-content",
      className: m("tw:w-full tw:text-sm", t),
      ...e
    }
  );
}
function jw({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "ul",
    {
      "data-slot": "sidebar-menu",
      "data-sidebar": "menu",
      className: m("tw:flex tw:w-full tw:min-w-0 tw:flex-col tw:gap-0", t),
      ...e
    }
  );
}
function Bw({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "li",
    {
      "data-slot": "sidebar-menu-item",
      "data-sidebar": "menu-item",
      className: m("tw:group/menu-item tw:relative", t),
      ...e
    }
  );
}
const Lw = ea(
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
  const c = t ? Tr.Root : "button", { state: d } = na(), l = /* @__PURE__ */ a(
    c,
    {
      "data-slot": "sidebar-menu-button",
      "data-sidebar": "menu-button",
      "data-size": o,
      "data-active": e,
      className: m(Lw({ variant: r, size: o }), i),
      ...s
    }
  );
  return n ? /* @__PURE__ */ u(Ht, { children: [
    /* @__PURE__ */ a(Yt, { asChild: !0, children: l }),
    /* @__PURE__ */ a(
      Wt,
      {
        side: "right",
        align: "center",
        hidden: d !== "collapsed",
        ...typeof n == "string" ? { children: n } : n
      }
    )
  ] }) : l;
}
function Ap({
  className: t,
  asChild: e = !1,
  showOnHover: r = !1,
  ...o
}) {
  const n = e ? Tr.Root : "button";
  return /* @__PURE__ */ a(
    n,
    {
      "data-slot": "sidebar-menu-action",
      "data-sidebar": "menu-action",
      className: m(
        "tw:absolute tw:top-1.5 tw:end-1 tw:flex tw:aspect-square tw:w-5 tw:items-center tw:justify-center tw:rounded-md tw:p-0 tw:text-sidebar-foreground tw:ring-sidebar-ring tw:outline-hidden tw:transition-transform tw:group-data-[collapsible=icon]:hidden tw:peer-hover/menu-button:text-sidebar-accent-foreground tw:peer-data-[size=default]/menu-button:top-1.5 tw:peer-data-[size=lg]/menu-button:top-2.5 tw:peer-data-[size=sm]/menu-button:top-1 tw:after:absolute tw:after:-inset-2 tw:hover:bg-sidebar-accent tw:hover:text-sidebar-accent-foreground tw:focus-visible:ring-2 tw:md:after:hidden tw:[&>svg]:size-4 tw:[&>svg]:shrink-0",
        r && "tw:group-focus-within/menu-item:opacity-100 tw:group-hover/menu-item:opacity-100 tw:peer-data-active/menu-button:text-sidebar-accent-foreground tw:aria-expanded:opacity-100 tw:md:opacity-0",
        t
      ),
      ...o
    }
  );
}
function Ip({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "sidebar-menu-badge",
      "data-sidebar": "menu-badge",
      className: m(
        "tw:pointer-events-none tw:absolute tw:end-1 tw:flex tw:h-5 tw:min-w-5 tw:items-center tw:justify-center tw:rounded-md tw:px-1 tw:text-xs tw:font-medium tw:text-sidebar-foreground tw:tabular-nums tw:select-none tw:group-data-[collapsible=icon]:hidden tw:peer-hover/menu-button:text-sidebar-accent-foreground tw:peer-data-[size=default]/menu-button:top-1.5 tw:peer-data-[size=lg]/menu-button:top-2.5 tw:peer-data-[size=sm]/menu-button:top-1 tw:peer-data-active/menu-button:text-sidebar-accent-foreground",
        t
      ),
      ...e
    }
  );
}
function Pp({
  className: t,
  showIcon: e = !1,
  ...r
}) {
  const [o] = Rt.useState(() => `${Math.floor(Math.random() * 40) + 50}%`), n = { "--skeleton-width": o };
  return /* @__PURE__ */ u(
    "div",
    {
      "data-slot": "sidebar-menu-skeleton",
      "data-sidebar": "menu-skeleton",
      className: m("tw:flex tw:h-8 tw:items-center tw:gap-2 tw:rounded-md tw:px-2", t),
      ...r,
      children: [
        e && /* @__PURE__ */ a(tr, { className: "tw:size-4 tw:rounded-md", "data-sidebar": "menu-skeleton-icon" }),
        /* @__PURE__ */ a(
          tr,
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
function Vp({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "ul",
    {
      "data-slot": "sidebar-menu-sub",
      "data-sidebar": "menu-sub",
      className: m(
        "tw:mx-3.5 tw:flex tw:min-w-0 tw:translate-x-px tw:rtl:-translate-x-px tw:flex-col tw:gap-1 tw:border-s tw:border-sidebar-border tw:px-2.5 tw:py-0.5 tw:group-data-[collapsible=icon]:hidden",
        t
      ),
      ...e
    }
  );
}
function jp({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "li",
    {
      "data-slot": "sidebar-menu-sub-item",
      "data-sidebar": "menu-sub-item",
      className: m("tw:group/menu-sub-item tw:relative", t),
      ...e
    }
  );
}
function Bp({
  asChild: t = !1,
  size: e = "md",
  isActive: r = !1,
  className: o,
  ...n
}) {
  const i = t ? Tr.Root : "a";
  return /* @__PURE__ */ a(
    i,
    {
      "data-slot": "sidebar-menu-sub-button",
      "data-sidebar": "menu-sub-button",
      "data-size": e,
      "data-active": r,
      className: m(
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
  className: d
}) {
  const l = L(
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
    Iw,
    {
      id: t,
      collapsible: "none",
      variant: "inset",
      className: m("tw:w-96 tw:gap-2 tw:overflow-y-auto", d),
      children: /* @__PURE__ */ u(Vw, { children: [
        /* @__PURE__ */ u(on, { children: [
          /* @__PURE__ */ a(nn, { className: "tw:text-sm", children: i }),
          /* @__PURE__ */ a(sn, { children: /* @__PURE__ */ a(jw, { children: Object.entries(e).map(([g, f]) => /* @__PURE__ */ a(Bw, { children: /* @__PURE__ */ a(
            Fw,
            {
              onClick: () => l(g),
              isActive: h(g),
              children: /* @__PURE__ */ a("span", { className: "tw:pl-3", children: f })
            }
          ) }, g)) }) })
        ] }),
        /* @__PURE__ */ u(on, { children: [
          /* @__PURE__ */ a(nn, { className: "tw:text-sm", children: s }),
          /* @__PURE__ */ a(sn, { className: "tw:pl-3", children: /* @__PURE__ */ u(
            "div",
            {
              className: m(
                "tw:flex tw:w-full tw:items-center tw:gap-2 tw:rounded-md tw:px-2 tw:py-1",
                {
                  "tw:bg-sidebar-accent tw:text-sidebar-accent-foreground": n == null ? void 0 : n.projectId
                }
              ),
              children: [
                /* @__PURE__ */ a(Ms, { className: "tw:h-4 tw:w-4 tw:shrink-0" }),
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
                      l(f, g);
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
function Lp({
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
      gn,
      {
        className: "tw:w-9/12",
        value: s,
        onSearch: c,
        placeholder: "Search app settings, extension settings, and project settings"
      }
    ) }),
    /* @__PURE__ */ u(
      Aw,
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
              extensionsSidebarGroupLabel: d,
              projectsSidebarGroupLabel: l,
              buttonPlaceholderText: w
            }
          ),
          /* @__PURE__ */ a(Pw, { className: "tw:min-w-[215px]", children: o })
        ]
      }
    )
  ] });
}
const De = "scrBook", Kw = "scrRef", Ue = "source", qw = "details", Gw = "Scripture Reference", Hw = "Scripture Book", Ni = "Type", Yw = "Details";
function Ww(t, e) {
  const r = e ?? !1;
  return [
    {
      accessorFn: (o) => `${o.start.book} ${o.start.chapterNum}:${o.start.verseNum}`,
      id: De,
      header: (t == null ? void 0 : t.scriptureReferenceColumnName) ?? Gw,
      cell: (o) => {
        const n = o.row.original;
        return o.row.getIsGrouped() ? kt.bookIdToEnglishName(n.start.book) : o.row.groupingColumnId === De ? ke(n.start) : void 0;
      },
      getGroupingValue: (o) => kt.bookIdToNumber(o.start.book),
      sortingFn: (o, n) => Ra(o.original.start, n.original.start),
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
      sortingFn: (o, n) => Ra(o.original.start, n.original.start),
      enableGrouping: !1
    },
    {
      accessorFn: (o) => o.source.displayName,
      id: Ue,
      header: r ? (t == null ? void 0 : t.typeColumnName) ?? Ni : void 0,
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
  return t.end && ({ offset: r } = t.end), !t.end || Ra(t.start, t.end) === 0 ? `${ca(t.start)}+${e}` : `${ca(t.start)}+${e}-${ca(t.end)}+${r}`;
}, cn = (t) => `${Xw({ start: t.start, end: t.end })} ${t.source.displayName} ${t.detail}`;
function Fp({
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
  const [l, w] = _([]), [p, h] = _([{ id: De, desc: !1 }]), [g, f] = _({}), x = I(
    () => t.flatMap((E) => E.data.map((B) => ({
      ...B,
      source: E.source
    }))),
    [t]
  ), v = I(
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
  X(() => {
    l.includes(Ue) ? h([
      { id: Ue, desc: !1 },
      { id: De, desc: !1 }
    ]) : h([{ id: De, desc: !1 }]);
  }, [l]);
  const C = Vn({
    data: x,
    columns: v,
    state: {
      grouping: l,
      sorting: p,
      rowSelection: g
    },
    onGroupingChange: w,
    onSortingChange: h,
    onRowSelectionChange: f,
    getExpandedRowModel: Gc(),
    getGroupedRowModel: qc(),
    getCoreRowModel: Bn(),
    getSortedRowModel: jn(),
    getRowId: cn,
    autoResetExpanded: !1,
    enableMultiRowSelection: !1,
    enableSubRowSelection: !1
  });
  X(() => {
    if (c) {
      const E = C.getSelectedRowModel().rowsById, B = Object.keys(E);
      if (B.length === 1) {
        const O = x.find((T) => cn(T) === B[0]) || void 0;
        O && c(O);
      }
    }
  }, [g, x, c, C]);
  const N = n ?? Hw, k = i ?? Ni, M = [
    { label: "No Grouping", value: [] },
    { label: `Group by ${N}`, value: [De] },
    { label: `Group by ${k}`, value: [Ue] },
    {
      label: `Group by ${N} and ${k}`,
      value: [De, Ue]
    },
    {
      label: `Group by ${k} and ${N}`,
      value: [Ue, De]
    }
  ], j = (E) => {
    w(JSON.parse(E));
  }, S = (E, B) => {
    !E.getIsGrouped() && !E.getIsSelected() && E.getToggleSelectedHandler()(B);
  }, P = (E, B) => E.getIsGrouped() ? "" : m("banded-row", B % 2 === 0 ? "even" : "odd"), $ = (E, B, O) => {
    if (!((E == null ? void 0 : E.length) === 0 || B.depth < O.column.getGroupedIndex())) {
      if (B.getIsGrouped())
        switch (B.depth) {
          case 1:
            return "tw:ps-4";
          default:
            return;
        }
      switch (B.depth) {
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
      sr,
      {
        value: JSON.stringify(l),
        onValueChange: (E) => {
          j(E);
        },
        children: [
          /* @__PURE__ */ a(lr, { className: "tw:mb-1 tw:mt-2", children: /* @__PURE__ */ a(cr, {}) }),
          /* @__PURE__ */ a(dr, { position: "item-aligned", children: /* @__PURE__ */ a(Wd, { children: M.map((E) => /* @__PURE__ */ a(de, { value: JSON.stringify(E.value), children: E.label }, E.label)) }) })
        ]
      }
    ),
    /* @__PURE__ */ u(Ga, { className: "tw:relative tw:flex tw:flex-col tw:overflow-y-auto tw:p-0", children: [
      e && /* @__PURE__ */ a(Ha, { children: C.getHeaderGroups().map((E) => /* @__PURE__ */ a($e, { children: E.headers.filter((B) => B.column.columnDef.header).map((B) => (
        /* For sticky column headers to work, we probably need to change the default definition of the shadcn Table component. See https://github.com/shadcn-ui/ui/issues/1151 */
        /* @__PURE__ */ a(qr, { colSpan: B.colSpan, className: "tw:sticky top-0", children: B.isPlaceholder ? void 0 : /* @__PURE__ */ u("div", { children: [
          B.column.getCanGroup() ? /* @__PURE__ */ a(
            q,
            {
              variant: "ghost",
              title: `Toggle grouping by ${B.column.columnDef.header}`,
              onClick: B.column.getToggleGroupingHandler(),
              type: "button",
              children: B.column.getIsGrouped() ? "🛑" : "👊 "
            }
          ) : void 0,
          " ",
          br(B.column.columnDef.header, B.getContext())
        ] }) }, B.id)
      )) }, E.id)) }),
      /* @__PURE__ */ a(Ya, { children: C.getRowModel().rows.map((E, B) => {
        const O = ie();
        return /* @__PURE__ */ a(
          $e,
          {
            "data-state": E.getIsSelected() ? "selected" : "",
            className: m(P(E, B)),
            onClick: (T) => S(E, T),
            children: E.getVisibleCells().map((T) => {
              if (!(T.getIsPlaceholder() || T.column.columnDef.enableGrouping && !T.getIsGrouped() && (T.column.columnDef.id !== Ue || !r)))
                return /* @__PURE__ */ a(
                  er,
                  {
                    className: m(
                      T.column.columnDef.id,
                      "tw:p-[1px]",
                      $(l, E, T)
                    ),
                    children: T.getIsGrouped() ? /* @__PURE__ */ u(
                      q,
                      {
                        variant: "link",
                        onClick: E.getToggleExpandedHandler(),
                        type: "button",
                        children: [
                          E.getIsExpanded() && /* @__PURE__ */ a(nr, {}),
                          !E.getIsExpanded() && (O === "ltr" ? /* @__PURE__ */ a(za, {}) : /* @__PURE__ */ a(Ta, {})),
                          " ",
                          br(T.column.columnDef.cell, T.getContext()),
                          " (",
                          E.subRows.length,
                          ")"
                        ]
                      }
                    ) : br(T.column.columnDef.cell, T.getContext())
                  },
                  T.id
                );
            })
          },
          E.id
        );
      }) })
    ] })
  ] });
}
function Ci(t) {
  if (t.length !== kt.allBookIds.length)
    throw new Error("availableBookInfo length must match Canon.allBookIds length");
  return kt.allBookIds.filter(
    (e, r) => t[r] === "1" && !kt.isObsolete(kt.bookIdToNumber(e))
  );
}
function ho(t, e) {
  return t.filter((r) => {
    try {
      return vr(r) === e;
    } catch {
      return !1;
    }
  });
}
const Ei = (t, e, r) => ho(t, e).every((o) => r.includes(o));
function Jw({
  availableBookInfo: t,
  selectedBookIds: e,
  onChangeSelectedBookIds: r,
  localizedStrings: o,
  localizedBookNames: n
}) {
  const i = o["%webView_book_selector_books_selected%"], s = o["%webView_book_selector_select_books%"], c = o["%webView_book_selector_search_books%"], d = o["%webView_book_selector_select_all%"], l = o["%webView_book_selector_clear_all%"], w = o["%webView_book_selector_no_book_found%"], { otLong: p, ntLong: h, dcLong: g, extraLong: f } = {
    otLong: o == null ? void 0 : o["%scripture_section_ot_long%"],
    ntLong: o == null ? void 0 : o["%scripture_section_nt_long%"],
    dcLong: o == null ? void 0 : o["%scripture_section_dc_long%"],
    extraLong: o == null ? void 0 : o["%scripture_section_extra_long%"]
  }, [x, v] = _(!1), [C, N] = _(""), k = U(void 0), M = U(!1), j = I(
    () => Ci(t),
    [t]
  ), S = I(() => {
    if (!C.trim()) {
      const H = {
        [ht.OT]: [],
        [ht.NT]: [],
        [ht.DC]: [],
        [ht.Extra]: []
      };
      return j.forEach((F) => {
        const V = vr(F);
        H[V].push(F);
      }), H;
    }
    const T = j.filter(
      (H) => Fa(H, C, n)
    ), G = {
      [ht.OT]: [],
      [ht.NT]: [],
      [ht.DC]: [],
      [ht.Extra]: []
    };
    return T.forEach((H) => {
      const F = vr(H);
      G[F].push(H);
    }), G;
  }, [j, C, n]), P = L(
    (T, G = !1) => {
      if (!G || !k.current) {
        r(
          e.includes(T) ? e.filter((rt) => rt !== T) : [...e, T]
        ), k.current = T;
        return;
      }
      const H = j.findIndex((rt) => rt === k.current), F = j.findIndex((rt) => rt === T);
      if (H === -1 || F === -1) return;
      const [V, R] = [
        Math.min(H, F),
        Math.max(H, F)
      ], Z = j.slice(V, R + 1).map((rt) => rt);
      r(
        e.includes(T) ? e.filter((rt) => !Z.includes(rt)) : [.../* @__PURE__ */ new Set([...e, ...Z])]
      );
    },
    [e, r, j]
  ), $ = (T) => {
    P(T, M.current), M.current = !1;
  }, E = (T, G) => {
    T.preventDefault(), P(G, T.shiftKey);
  }, B = () => {
    r(j.map((T) => T));
  }, O = () => {
    r([]);
  };
  return /* @__PURE__ */ u(
    Pe,
    {
      open: x,
      onOpenChange: (T) => {
        v(T), T || N("");
      },
      children: [
        /* @__PURE__ */ a(He, { asChild: !0, children: /* @__PURE__ */ u(
          q,
          {
            variant: "outline",
            role: "combobox",
            "aria-expanded": x,
            className: "tw:max-w-64 tw:justify-between",
            children: [
              e.length > 0 ? `${i}: ${e.length}` : s,
              /* @__PURE__ */ a($s, { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
            ]
          }
        ) }),
        /* @__PURE__ */ a(Ve, { className: "tw:w-[500px] tw:max-w-[calc(100vw-2rem)] tw:p-0", align: "start", children: /* @__PURE__ */ u(
          Ye,
          {
            shouldFilter: !1,
            onKeyDown: (T) => {
              T.key === "Enter" && (M.current = T.shiftKey);
            },
            children: [
              /* @__PURE__ */ a(
                Qr,
                {
                  placeholder: c,
                  value: C,
                  onValueChange: N
                }
              ),
              /* @__PURE__ */ u("div", { className: "tw:flex tw:justify-between tw:border-b tw:p-2", children: [
                /* @__PURE__ */ a(q, { variant: "ghost", size: "sm", onClick: B, children: d }),
                /* @__PURE__ */ a(q, { variant: "ghost", size: "sm", onClick: O, children: l })
              ] }),
              /* @__PURE__ */ u(We, { children: [
                /* @__PURE__ */ a(Ua, { children: w }),
                Object.values(ht).map((T, G) => {
                  const H = S[T];
                  if (H.length !== 0)
                    return /* @__PURE__ */ u(Nn, { children: [
                      /* @__PURE__ */ a(
                        Ne,
                        {
                          heading: dn(T, p, h, g, f),
                          children: H.map((F) => /* @__PURE__ */ a(
                            Fn,
                            {
                              bookId: F,
                              isSelected: e.includes(F),
                              onSelect: () => $(F),
                              onMouseDown: (V) => E(V, F),
                              section: vr(F),
                              showCheck: !0,
                              localizedBookNames: n,
                              commandValue: Un(F, n),
                              className: "tw:flex tw:items-center"
                            },
                            F
                          ))
                        }
                      ),
                      G < Object.values(ht).length - 1 && /* @__PURE__ */ a(hn, {})
                    ] }, T);
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
  const i = ho(e, t).length === 0, s = n["%scripture_section_ot_short%"], c = n["%scripture_section_nt_short%"], d = n["%scripture_section_dc_short%"], l = n["%scripture_section_extra_short%"];
  return /* @__PURE__ */ a(
    q,
    {
      variant: "outline",
      size: "sm",
      onClick: () => o(t),
      className: m(
        Ei(e, t, r) && !i && "tw:bg-primary tw:text-primary-foreground tw:hover:bg-primary/70 tw:hover:text-primary-foreground"
      ),
      disabled: i,
      children: Qi(
        t,
        s,
        c,
        d,
        l
      )
    }
  );
}
const ln = 5, ya = 6;
function Qw({
  availableBookInfo: t,
  selectedBookIds: e,
  onChangeSelectedBookIds: r,
  localizedStrings: o,
  localizedBookNames: n
}) {
  const i = o["%webView_book_selector_more%"], s = I(
    () => Ci(t),
    [t]
  ), c = L(
    (d) => {
      const l = ho(s, d).map((w) => w);
      r(
        Ei(s, d, e) ? e.filter((w) => !l.includes(w)) : [.../* @__PURE__ */ new Set([...e, ...l])]
      );
    },
    [e, r, s]
  );
  return /* @__PURE__ */ u("div", { className: "tw:space-y-2", children: [
    /* @__PURE__ */ a("div", { className: "tw:flex tw:flex-wrap tw:gap-2", children: Object.values(ht).map((d) => /* @__PURE__ */ a(
      Zw,
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
        e.length === ya ? ya : ln
      ).map((d) => /* @__PURE__ */ a(yr, { className: "tw:hover:bg-secondary", variant: "secondary", children: Me(d, n) }, d)),
      e.length > ya && /* @__PURE__ */ a(
        yr,
        {
          className: "tw:hover:bg-secondary",
          variant: "secondary",
          children: `+${e.length - ln} ${i}`
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
]), Up = Object.freeze([
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
function Kp({
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
  onRangeStartChange: h,
  onRangeEndChange: g,
  currentScrRef: f,
  onCurrentScrRefChange: x,
  bookChapterControlLocalizedStrings: v,
  getEndVerse: C,
  hideLabel: N = !1,
  buttonClassName: k
}) {
  const M = St(
    s,
    "%webView_scope_selector_selected_text%"
  ), j = St(s, "%webView_scope_selector_verse%"), S = St(s, "%webView_scope_selector_chapter%"), P = St(s, "%webView_scope_selector_book%"), $ = St(
    s,
    "%webView_scope_selector_current_verse%"
  ), E = St(
    s,
    "%webView_scope_selector_current_chapter%"
  ), B = St(s, "%webView_scope_selector_current_book%"), O = St(s, "%webView_scope_selector_choose_books%"), T = St(s, "%webView_scope_selector_scope%"), G = St(s, "%webView_scope_selector_select_books%"), H = St(s, "%webView_scope_selector_range%"), F = St(s, "%webView_scope_selector_select_range%"), V = St(s, "%webView_scope_selector_range_start%"), R = St(s, "%webView_scope_selector_range_end%"), Z = St(s, "%webView_scope_selector_ok%"), rt = St(s, "%webView_scope_selector_cancel%"), Ct = St(s, "%webView_scope_selector_navigate%"), Et = (A) => {
    if (!f) return;
    const Q = f.book.toUpperCase();
    switch (A) {
      case "verse":
        return ke(f, "id");
      case "chapter":
        return `${Q} ${f.chapterNum}`;
      case "book":
        return Q;
      default:
        return;
    }
  }, At = [
    { value: "selectedText", label: M, id: "scope-selected-text" },
    {
      value: "verse",
      label: j,
      dropdownLabel: $,
      scrRefSuffix: Et("verse"),
      id: "scope-verse"
    },
    {
      value: "chapter",
      label: S,
      dropdownLabel: E,
      scrRefSuffix: Et("chapter"),
      id: "scope-chapter"
    },
    {
      value: "book",
      label: P,
      dropdownLabel: B,
      scrRefSuffix: Et("book"),
      id: "scope-book"
    },
    { value: "selectedBooks", label: O, id: "scope-selected" },
    { value: "range", label: H, id: "scope-range" }
  ], K = (A, Q, Kt = !1) => /* @__PURE__ */ u(dt, { children: [
    A,
    Q && !Kt && /* @__PURE__ */ u("span", { className: "tw:text-muted-foreground", children: [
      ": ",
      Q
    ] })
  ] }), at = e ? At.filter((A) => e.includes(A.value)) : At, gt = f ?? la, wt = w ?? gt, bt = p ?? gt, pe = () => {
  }, ct = U(null), Lt = U(null), xt = U(!1), re = U(null), Jt = U(!1), [z, It] = _(void 0), yt = U(!1), _t = U(!1), ae = U(null), Se = L((A) => {
    if (A) {
      It("start"), yt.current = !1;
      return;
    }
    It((Q) => Q === "start" ? void 0 : Q), yt.current && (yt.current = !1, requestAnimationFrame(() => {
      var Kt;
      const Q = (Kt = ct.current) == null ? void 0 : Kt.querySelector("button");
      Q == null || Q.click();
    }));
  }, []), he = L((A) => {
    if (A) {
      It("end"), _t.current = !1;
      return;
    }
    It((Q) => Q === "end" ? void 0 : Q);
  }, []), ce = L(
    (A) => {
      h == null || h(A), g == null || g(A), yt.current = !0;
    },
    [h, g]
  ), le = L(
    (A) => {
      g == null || g(A), _t.current = !0;
    },
    [g]
  ), Tt = L(
    (A) => {
      r(A), A === "selectedBooks" && n.length === 0 && (f != null && f.book) && i([f.book]);
    },
    [r, n, f, i]
  ), Mt = at.find((A) => A.value === t), Zt = () => t === "selectedBooks" && n.length > 0 ? n.map((A) => A.toUpperCase()).join(", ") : t === "range" ? Ks(wt, bt, {
    optionOrLocalizedBookName: "id",
    endRefOptionOrLocalizedBookName: "id",
    repeatBookName: !0
  }) : Mt ? K(Mt.label, Mt.scrRefSuffix) : t, zt = at.filter(
    (A) => A.value !== "selectedBooks" && A.value !== "range"
  ), Ft = at.find((A) => A.value === "selectedBooks"), Qt = at.find((A) => A.value === "range"), [D, J] = _(!1), [ut, nt] = _(void 0), [et, it] = _(void 0), [y, W] = _(void 0), [tt, lt] = _(void 0), [mt, Ut] = _([]), te = l === "dropdown" && ut === "selectedBooks", pr = /* @__PURE__ */ a(
    Qw,
    {
      availableBookInfo: o,
      selectedBookIds: te ? mt : n,
      onChangeSelectedBookIds: te ? Ut : i,
      localizedStrings: s,
      localizedBookNames: c
    }
  ), Sr = z === "end", Rr = z === "start", Je = "tw:text-muted-foreground", b = l === "dropdown" && ut === "range", Y = b ? W : ce, Pt = b ? lt : g ? le : pe, ye = /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-wrap tw:items-end tw:gap-4", children: [
    /* @__PURE__ */ u("div", { className: "tw:grid tw:gap-2", children: [
      /* @__PURE__ */ a(Nt, { htmlFor: "scope-range-start", className: m(Sr && Je), children: V }),
      /* @__PURE__ */ a(
        wa,
        {
          id: "scope-range-start",
          scrRef: b ? y ?? wt : wt,
          handleSubmit: Y,
          localizedBookNames: c,
          localizedStrings: v,
          getEndVerse: C,
          submitKeys: eu,
          onOpenChange: Se,
          className: m(Sr && Je),
          modal: !0
        }
      )
    ] }),
    /* @__PURE__ */ u("div", { ref: ct, className: "tw:grid tw:gap-2", children: [
      /* @__PURE__ */ a(Nt, { htmlFor: "scope-range-end", className: m(Rr && Je), children: R }),
      /* @__PURE__ */ a(
        wa,
        {
          id: "scope-range-end",
          scrRef: b ? tt ?? bt : bt,
          handleSubmit: Pt,
          localizedBookNames: c,
          localizedStrings: v,
          getEndVerse: C,
          disableReferencesUpTo: b ? y ?? wt : wt,
          onOpenChange: he,
          onCloseAutoFocus: (A) => {
            var Q;
            _t.current && (_t.current = !1, A.preventDefault(), (Q = ae.current) == null || Q.focus());
          },
          className: m(Rr && Je),
          modal: !0,
          align: "start"
        }
      )
    ] })
  ] }), Be = U({}), Re = L(
    (A) => (Q) => {
      Be.current[A] = Q;
    },
    []
  ), $t = U(null);
  X(() => {
    if (!D) return;
    let A = 0;
    const Q = requestAnimationFrame(() => {
      A = requestAnimationFrame(() => {
        var Kt;
        (Kt = Be.current[t]) == null || Kt.focus();
      });
    });
    return () => {
      cancelAnimationFrame(Q), A && cancelAnimationFrame(A);
    };
  }, [D, t]);
  const [vt, Ot] = _(null), [ft, oe] = _(null), [ee, Le] = _(null), Oi = 200, [Ai, Ii] = _(!1);
  X(() => {
    if (!ee || typeof ResizeObserver > "u") return;
    const A = new ResizeObserver(([Q]) => {
      Ii(Q.contentRect.width < Oi);
    });
    return A.observe(ee), () => A.disconnect();
  }, [ee]);
  const go = L(
    (A) => {
      it(A), W(wt), lt(bt), Ut(n), J(!1), nt(A);
    },
    [wt, bt, n]
  ), fo = L(() => {
    et !== void 0 && (et === "range" ? (y && (h == null || h(y)), tt && (g == null || g(tt))) : et === "selectedBooks" && i(mt), Tt(et), nt(void 0), it(void 0));
  }, [
    et,
    y,
    tt,
    mt,
    h,
    g,
    i,
    Tt
  ]), Dr = L((A) => {
    A || (nt(void 0), it(void 0));
  }, []), mo = L((A) => {
    var Q;
    A.preventDefault(), (Q = $t.current) == null || Q.focus();
  }, []), vo = (A) => t === A ? /* @__PURE__ */ a("span", { className: "tw:absolute tw:flex tw:h-3.5 tw:w-3.5 tw:items-center tw:justify-center tw:ltr:left-2 tw:rtl:right-2", children: /* @__PURE__ */ a(or, { className: "tw:h-4 tw:w-4" }) }) : void 0;
  return /* @__PURE__ */ u("div", { id: d, className: "tw:grid tw:gap-4", children: [
    /* @__PURE__ */ u("div", { className: "tw:grid tw:gap-2", children: [
      !N && /* @__PURE__ */ a(Nt, { children: T }),
      l === "dropdown" ? /* @__PURE__ */ u(Ce, { open: D, onOpenChange: J, children: [
        /* @__PURE__ */ a(Ee, { asChild: !0, children: /* @__PURE__ */ u(
          q,
          {
            ref: $t,
            variant: "outline",
            role: "combobox",
            className: m(
              "tw:w-full tw:justify-between tw:overflow-hidden tw:font-normal",
              k
            ),
            children: [
              /* @__PURE__ */ a("span", { className: "tw:min-w-0 tw:flex-1 tw:truncate tw:text-start", children: Zt() }),
              /* @__PURE__ */ a(nr, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
            ]
          }
        ) }),
        /* @__PURE__ */ a(
          Te,
          {
            ref: Le,
            className: "tw:w-[var(--radix-dropdown-menu-trigger-width)] tw:min-w-[12rem]",
            align: "start",
            children: /* @__PURE__ */ u(ia, { container: ee, children: [
              zt.map(({ value: A, label: Q, dropdownLabel: Kt, scrRefSuffix: hr, id: Pi }) => /* @__PURE__ */ u(
                Ke,
                {
                  ref: Re(A),
                  className: "tw:relative tw:ps-8 data-[highlighted]:tw:bg-accent data-[highlighted]:tw:text-accent-foreground",
                  onSelect: () => Tt(A),
                  "data-selected": t === A ? "true" : void 0,
                  children: [
                    t === A && /* @__PURE__ */ a("span", { className: "tw:absolute tw:flex tw:h-3.5 tw:w-3.5 tw:items-center tw:justify-center tw:ltr:left-2 tw:rtl:right-2", children: /* @__PURE__ */ a(or, { className: "tw:h-4 tw:w-4" }) }),
                    K(Kt ?? Q, hr, Ai)
                  ]
                },
                Pi
              )),
              (Ft || Qt) && /* @__PURE__ */ a(Ge, {}),
              Ft && /* @__PURE__ */ u(
                Ke,
                {
                  ref: Re("selectedBooks"),
                  className: m(
                    "tw:relative tw:ps-8",
                    "data-[highlighted]:tw:bg-accent data-[highlighted]:tw:text-accent-foreground"
                  ),
                  onSelect: () => go("selectedBooks"),
                  "data-selected": t === "selectedBooks" ? "true" : void 0,
                  children: [
                    vo("selectedBooks"),
                    `${Ft.label}…`
                  ]
                }
              ),
              Qt && /* @__PURE__ */ u(
                Ke,
                {
                  ref: Re("range"),
                  className: m(
                    "tw:relative tw:ps-8",
                    "data-[highlighted]:tw:bg-accent data-[highlighted]:tw:text-accent-foreground"
                  ),
                  onSelect: () => go("range"),
                  "data-selected": t === "range" ? "true" : void 0,
                  children: [
                    vo("range"),
                    `${Qt.label}…`
                  ]
                }
              ),
              x && /* @__PURE__ */ u(dt, { children: [
                /* @__PURE__ */ a(Ge, {}),
                /* @__PURE__ */ a(Cr, { className: "tw:px-2 tw:py-1.5 tw:text-xs tw:font-medium tw:text-muted-foreground", children: Ct }),
                /* @__PURE__ */ a(
                  Ke,
                  {
                    ref: re,
                    className: "tw:p-0",
                    onSelect: (A) => {
                      var Q, Kt;
                      if (A.preventDefault(), xt.current) {
                        xt.current = !1;
                        return;
                      }
                      Jt.current || (Kt = (Q = Lt.current) == null ? void 0 : Q.querySelector("button")) == null || Kt.click();
                    },
                    children: /* @__PURE__ */ a(
                      "div",
                      {
                        ref: Lt,
                        className: "tw:w-full tw:px-1 tw:pb-1",
                        onPointerDownCapture: (A) => {
                          const Q = A.target instanceof HTMLElement ? A.target : void 0;
                          Q != null && Q.closest("button") && (xt.current = !0, requestAnimationFrame(() => {
                            xt.current = !1;
                          }));
                        },
                        children: /* @__PURE__ */ a(
                          wa,
                          {
                            id: "scope-navigate",
                            scrRef: f ?? la,
                            handleSubmit: x,
                            localizedBookNames: c,
                            localizedStrings: v,
                            getEndVerse: C,
                            triggerVariant: "ghost",
                            onOpenChange: (A) => {
                              Jt.current = A;
                            },
                            onCloseAutoFocus: (A) => {
                              var Q;
                              A.preventDefault(), (Q = re.current) == null || Q.focus();
                            },
                            modal: !0,
                            className: "tw:w-full tw:min-w-0 tw:max-w-none tw:justify-between tw:px-2 tw:font-normal",
                            triggerContent: /* @__PURE__ */ u(dt, { children: [
                              /* @__PURE__ */ a("span", { className: "tw:min-w-0 tw:flex-1 tw:truncate tw:text-start", children: ke(f ?? la, "id") }),
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
        ao,
        {
          value: t,
          onValueChange: Tt,
          className: "tw:flex tw:flex-col tw:space-y-1",
          children: at.map(({ value: A, label: Q, scrRefSuffix: Kt, id: hr }) => /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center", children: [
            /* @__PURE__ */ a(Gr, { className: "tw:me-2", value: A, id: hr }),
            /* @__PURE__ */ a(Nt, { htmlFor: hr, children: K(Q, Kt) })
          ] }, hr))
        }
      )
    ] }),
    l === "radio" && t === "selectedBooks" && /* @__PURE__ */ u("div", { className: "tw:grid tw:gap-2", children: [
      /* @__PURE__ */ a(Nt, { children: G }),
      pr
    ] }),
    l === "radio" && t === "range" && ye,
    l === "dropdown" && Ft && /* @__PURE__ */ a(_a, { open: ut === "selectedBooks", onOpenChange: Dr, children: /* @__PURE__ */ a(
      Na,
      {
        ref: oe,
        onCloseAutoFocus: mo,
        onEscapeKeyDown: (A) => {
          ft != null && ft.querySelector('[data-state="open"]') && A.preventDefault();
        },
        children: /* @__PURE__ */ u(ia, { container: ft, children: [
          /* @__PURE__ */ a(Ca, { className: "tw:pe-8", children: /* @__PURE__ */ a(Ea, { children: O }) }),
          pr,
          /* @__PURE__ */ u(xo, { children: [
            /* @__PURE__ */ a(q, { variant: "outline", onClick: () => Dr(!1), children: rt }),
            /* @__PURE__ */ a(q, { onClick: fo, children: Z })
          ] })
        ] })
      }
    ) }),
    l === "dropdown" && Qt && /* @__PURE__ */ a(_a, { open: ut === "range", onOpenChange: Dr, children: /* @__PURE__ */ a(
      Na,
      {
        ref: Ot,
        onCloseAutoFocus: mo,
        onEscapeKeyDown: (A) => {
          vt != null && vt.querySelector('[data-state="open"]') && A.preventDefault();
        },
        children: /* @__PURE__ */ u(ia, { container: vt, children: [
          /* @__PURE__ */ a(Ca, { className: "tw:pe-8", children: /* @__PURE__ */ a(Ea, { children: F }) }),
          ye,
          /* @__PURE__ */ u(xo, { children: [
            /* @__PURE__ */ a(q, { variant: "outline", onClick: () => Dr(!1), children: rt }),
            /* @__PURE__ */ a(q, { ref: ae, onClick: fo, children: Z })
          ] })
        ] })
      }
    ) })
  ] });
}
function qp({
  availableScrollGroupIds: t,
  scrollGroupId: e,
  onChangeScrollGroupId: r,
  localizedStrings: o = {},
  size: n = "sm",
  className: i,
  id: s,
  disabled: c
}) {
  const d = {
    ...sa,
    ...Object.fromEntries(
      Object.entries(o).map(
        ([w, p]) => [
          w,
          w === p && w in sa ? sa[w] : p
        ]
      )
    )
  }, l = ie();
  return /* @__PURE__ */ u(
    sr,
    {
      value: `${e}`,
      onValueChange: (w) => r(
        w === "undefined" ? void 0 : parseInt(w, 10)
      ),
      disabled: c,
      children: [
        /* @__PURE__ */ a(lr, { size: n, className: m("pr-twp tw:w-auto", i), children: /* @__PURE__ */ a(
          cr,
          {
            placeholder: d[Eo(e)] ?? e
          }
        ) }),
        /* @__PURE__ */ a(
          dr,
          {
            id: s,
            align: l === "rtl" ? "end" : "start",
            style: { zIndex: wr },
            children: t.map((w) => /* @__PURE__ */ a(de, { value: `${w}`, children: d[Eo(w)] }, `${w}`))
          }
        )
      ]
    }
  );
}
function Gp({ children: t }) {
  return /* @__PURE__ */ a("div", { className: "pr-twp tw:grid", children: t });
}
function Hp({
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
function Yp({
  primary: t,
  secondary: e,
  includeSeparator: r = !1
}) {
  return /* @__PURE__ */ u("div", { className: "tw:space-y-4 tw:py-2", children: [
    /* @__PURE__ */ u("div", { children: [
      /* @__PURE__ */ a("h3", { className: "tw:text-lg tw:font-medium", children: t }),
      /* @__PURE__ */ a("p", { className: "tw:text-sm tw:text-muted-foreground", children: e })
    ] }),
    r ? /* @__PURE__ */ a(kr, {}) : ""
  ] });
}
function Ti(t, e) {
  var r;
  return (r = Object.entries(t).find(
    ([, o]) => "menuItem" in o && o.menuItem === e
  )) == null ? void 0 : r[0];
}
function Zr({ icon: t, menuLabel: e, leading: r }) {
  return t ? /* @__PURE__ */ a(
    "img",
    {
      className: m("tw:max-h-5 tw:max-w-5", r ? "tw:me-2" : "tw:ms-2"),
      src: t,
      alt: `${r ? "Leading" : "Trailing"} icon for ${e}`
    }
  ) : void 0;
}
const zi = (t, e, r, o) => r ? Object.entries(t).filter(
  ([i, s]) => "column" in s && s.column === r || i === r
).sort(([, i], [, s]) => i.order - s.order).flatMap(([i]) => e.filter((c) => c.group === i).sort((c, d) => c.order - d.order).map((c) => /* @__PURE__ */ u(Ht, { children: [
  /* @__PURE__ */ a(Yt, { asChild: !0, children: "command" in c ? /* @__PURE__ */ u(
    Ke,
    {
      onClick: () => {
        o(c);
      },
      children: [
        c.iconPathBefore && /* @__PURE__ */ a(Zr, { icon: c.iconPathBefore, menuLabel: c.label, leading: !0 }),
        c.label,
        c.iconPathAfter && /* @__PURE__ */ a(Zr, { icon: c.iconPathAfter, menuLabel: c.label })
      ]
    },
    `dropdown-menu-item-${c.label}-${c.command}`
  ) : /* @__PURE__ */ u(ts, { children: [
    /* @__PURE__ */ a(es, { children: c.label }),
    /* @__PURE__ */ a(rs, { children: /* @__PURE__ */ a(as, { children: zi(
      t,
      e,
      Ti(t, c.id),
      o
    ) }) })
  ] }, `dropdown-menu-sub-${c.label}-${c.id}`) }),
  c.tooltip && /* @__PURE__ */ a(Wt, { children: c.tooltip })
] }, `tooltip-${c.label}-${"command" in c ? c.command : c.id}`))) : void 0;
function Ba({
  onSelectMenuItem: t,
  menuData: e,
  tabLabel: r,
  icon: o,
  className: n,
  variant: i,
  buttonVariant: s = "ghost",
  id: c
}) {
  return /* @__PURE__ */ u(Ce, { variant: i, children: [
    /* @__PURE__ */ a(Ee, { "aria-label": r, className: n, asChild: !0, id: c, children: /* @__PURE__ */ a(q, { variant: s, size: "icon", children: o ?? /* @__PURE__ */ a(Os, {}) }) }),
    /* @__PURE__ */ a(Te, { align: "start", style: { zIndex: wr }, children: Object.entries(e.columns).filter(([, d]) => typeof d == "object").sort(([, d], [, l]) => typeof d == "boolean" || typeof l == "boolean" ? 0 : d.order - l.order).map(([d], l, w) => /* @__PURE__ */ u(Nn, { children: [
      /* @__PURE__ */ a(un, { children: /* @__PURE__ */ a(Gt, { children: zi(e.groups, e.items, d, t) }) }),
      l < w.length - 1 && /* @__PURE__ */ a(Ge, {})
    ] }, d)) })
  ] });
}
const Si = Rt.forwardRef(
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
function Wp({
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
  return /* @__PURE__ */ u(Si, { className: `tw:w-full tw:border ${i}`, id: n, children: [
    r && /* @__PURE__ */ a(
      Ba,
      {
        onSelectMenuItem: t,
        menuData: r,
        tabLabel: "Project",
        icon: l ?? /* @__PURE__ */ a(As, {}),
        buttonVariant: "ghost"
      }
    ),
    s && /* @__PURE__ */ a("div", { className: "tw:flex tw:h-full tw:shrink tw:grow-[10] tw:flex-row tw:flex-wrap tw:items-start tw:gap-x-1 tw:gap-y-2 tw:overflow-clip", children: s }),
    c && /* @__PURE__ */ a("div", { className: "tw:flex tw:h-full tw:shrink tw:grow-[1] tw:basis-0 tw:flex-row tw:flex-wrap tw:items-start tw:justify-center tw:gap-x-1 tw:gap-y-2 tw:overflow-clip tw:@sm:basis-auto", children: c }),
    /* @__PURE__ */ u("div", { className: "tw:flex tw:h-full tw:shrink tw:grow-[1] tw:flex-row-reverse tw:flex-wrap tw:items-start tw:gap-x-1 tw:gap-y-2 tw:overflow-clip", children: [
      o && /* @__PURE__ */ a(
        Ba,
        {
          onSelectMenuItem: e,
          menuData: o,
          tabLabel: "View Info",
          icon: /* @__PURE__ */ a(Is, {}),
          className: "tw:h-full"
        }
      ),
      d
    ] })
  ] });
}
function Xp({
  onSelectProjectMenuItem: t,
  projectMenuData: e,
  id: r,
  className: o,
  menuButtonIcon: n
}) {
  return /* @__PURE__ */ a(Si, { className: "tw:pointer-events-none", id: r, children: e && /* @__PURE__ */ a(
    Ba,
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
const Ri = Rt.forwardRef(({ className: t, ...e }, r) => {
  const o = ie();
  return /* @__PURE__ */ a(
    ue.Root,
    {
      orientation: "vertical",
      ref: r,
      className: m("tw:flex tw:gap-1 tw:rounded-md tw:text-muted-foreground", t),
      ...e,
      dir: o
    }
  );
});
Ri.displayName = ue.List.displayName;
const Di = Rt.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ a(
  ue.List,
  {
    ref: r,
    className: m(
      "tw:flex tw:items-center tw:w-[124px] tw:justify-center tw:rounded-md tw:bg-muted tw:p-1 tw:text-muted-foreground",
      t
    ),
    ...e
  }
));
Di.displayName = ue.List.displayName;
const ru = Rt.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ a(
  ue.Trigger,
  {
    ref: r,
    ...e,
    className: m(
      "tw:inline-flex tw:w-[116px] tw:cursor-pointer tw:items-center tw:justify-center tw:break-words tw:rounded-sm tw:border-0 tw:bg-muted tw:px-3 tw:py-1.5 tw:text-sm tw:font-medium tw:text-inherit tw:ring-offset-background tw:transition-all tw:hover:text-foreground tw:focus-visible:outline-hidden tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2 tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:data-[state=active]:bg-background tw:data-[state=active]:text-foreground tw:data-[state=active]:shadow-sm tw:overflow-clip",
      t
    )
  }
)), Mi = Rt.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ a(
  ue.Content,
  {
    ref: r,
    className: m(
      // Removed tw:mt-2 because Sebastian said so
      "tw:ms-5 tw:flex-grow tw:text-foreground tw:ring-offset-background tw:focus-visible:outline-hidden tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2",
      t
    ),
    ...e
  }
));
Mi.displayName = ue.Content.displayName;
function Jp({
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
        gn,
        {
          className: i,
          value: e,
          onSearch: r,
          placeholder: o
        }
      )
    ] }),
    /* @__PURE__ */ u(Ri, { children: [
      /* @__PURE__ */ a(Di, { children: t.map((c) => /* @__PURE__ */ a(ru, { value: c.value, children: c.value }, c.key)) }),
      t.map((c) => /* @__PURE__ */ a(Mi, { value: c.value, children: c.content }, c.key))
    ] })
  ] });
}
function au({
  className: t,
  // CUSTOM: Added variant prop to allow callers to apply visual style variants to all menu items
  variant: e = "default",
  ...r
}) {
  const o = Rt.useMemo(
    () => ({
      variant: e
    }),
    [e]
  );
  return /* @__PURE__ */ a(os.Provider, { value: o, children: /* @__PURE__ */ a(
    be.Root,
    {
      "data-slot": "menubar",
      className: m(
        "tw:flex tw:h-8 tw:items-center tw:gap-0.5 tw:rounded-lg tw:border tw:p-[3px]",
        t
      ),
      ...r
    }
  ) });
}
function ou({ ...t }) {
  return /* @__PURE__ */ a(be.Menu, { "data-slot": "menubar-menu", ...t });
}
function nu({ ...t }) {
  return /* @__PURE__ */ a(be.Portal, { "data-slot": "menubar-portal", ...t });
}
function iu({
  className: t,
  ...e
}) {
  const r = Er();
  return /* @__PURE__ */ a(
    be.Trigger,
    {
      "data-slot": "menubar-trigger",
      className: m(
        "tw:flex tw:items-center tw:rounded-sm tw:px-1.5 tw:py-[2px] tw:text-sm tw:font-medium tw:outline-hidden tw:select-none tw:hover:bg-muted tw:aria-expanded:bg-muted",
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation (portal-rendered content needs this)
        "pr-twp",
        // CUSTOM: Apply variant-driven styles from menu context
        Wa({ variant: r.variant, className: t })
      ),
      ...e
    }
  );
}
function su({
  className: t,
  align: e = "start",
  alignOffset: r = -4,
  sideOffset: o = 8,
  ...n
}) {
  const i = Er();
  return /* @__PURE__ */ a(nu, { children: /* @__PURE__ */ a(
    be.Content,
    {
      "data-slot": "menubar-content",
      align: e,
      alignOffset: r,
      sideOffset: o,
      className: m(
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
function cu({
  className: t,
  inset: e,
  variant: r = "default",
  ...o
}) {
  const n = Er();
  return /* @__PURE__ */ a(
    be.Item,
    {
      "data-slot": "menubar-item",
      "data-inset": e,
      "data-variant": r,
      className: m(
        "tw:group/menubar-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-[variant=destructive]:text-destructive tw:data-[variant=destructive]:focus:bg-destructive/10 tw:data-[variant=destructive]:focus:text-destructive tw:dark:data-[variant=destructive]:focus:bg-destructive/20 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:data-[variant=destructive]:*:[svg]:text-destructive!",
        // CUSTOM: Apply variant-driven styles from menu context
        Wa({ variant: n.variant, className: t })
      ),
      ...o
    }
  );
}
function lu({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    be.Separator,
    {
      "data-slot": "menubar-separator",
      className: m("tw:-mx-1 tw:my-1 tw:h-px tw:bg-border", t),
      ...e
    }
  );
}
function du({ ...t }) {
  return /* @__PURE__ */ a(be.Sub, { "data-slot": "menubar-sub", ...t });
}
function wu({
  className: t,
  inset: e,
  children: r,
  ...o
}) {
  const n = Er();
  return /* @__PURE__ */ u(
    be.SubTrigger,
    {
      "data-slot": "menubar-sub-trigger",
      "data-inset": e,
      className: m(
        "tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-none tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-inset:ps-7 tw:data-open:bg-accent tw:data-open:text-accent-foreground tw:[&_svg:not([class*=size-])]:size-4",
        // CUSTOM: Apply variant-driven styles from menu context
        Wa({ variant: n.variant, className: t })
      ),
      ...o,
      children: [
        r,
        /* @__PURE__ */ a(Ln, { className: "tw:ms-auto tw:size-4" })
      ]
    }
  );
}
function uu({
  className: t,
  ...e
}) {
  const r = Er();
  return /* @__PURE__ */ a(
    be.SubContent,
    {
      "data-slot": "menubar-sub-content",
      className: m(
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
const mr = (t, e) => {
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
    const c = e.filter((l) => l.group === i).sort((l, w) => l.order - w.order).map((l) => /* @__PURE__ */ u(Ht, { children: [
      /* @__PURE__ */ a(Yt, { asChild: !0, children: "command" in l ? /* @__PURE__ */ u(
        cu,
        {
          onClick: () => {
            o(l);
          },
          children: [
            l.iconPathBefore && /* @__PURE__ */ a(Zr, { icon: l.iconPathBefore, menuLabel: l.label, leading: !0 }),
            l.label,
            l.iconPathAfter && /* @__PURE__ */ a(Zr, { icon: l.iconPathAfter, menuLabel: l.label })
          ]
        },
        `menubar-item-${l.label}-${l.command}`
      ) : /* @__PURE__ */ u(du, { children: [
        /* @__PURE__ */ a(wu, { children: l.label }),
        /* @__PURE__ */ a(uu, { children: $i(
          t,
          e,
          Ti(t, l.id),
          o
        ) })
      ] }, `menubar-sub-${l.label}-${l.id}`) }),
      l.tooltip && /* @__PURE__ */ a(Wt, { children: l.tooltip })
    ] }, `tooltip-${l.label}-${"command" in l ? l.command : l.id}`)), d = [...c];
    return c.length > 0 && s < n.length - 1 && d.push(/* @__PURE__ */ a(lu, {}, `separator-${i}`)), d;
  });
};
function pu({
  menuData: t,
  onSelectMenuItem: e,
  onOpenChange: r,
  variant: o
}) {
  const n = U(void 0), i = U(void 0), s = U(void 0), c = U(void 0), d = U(void 0), l = (w) => {
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
  if (cl(["alt", "alt+p", "alt+l", "alt+n", "alt+h"], (w, p) => {
    var f, x, v, C;
    w.preventDefault();
    const h = { key: "Escape", code: "Escape", keyCode: 27, bubbles: !0 }, g = { key: " ", code: "Space", keyCode: 32, bubbles: !0 };
    switch (p.hotkey) {
      case "alt":
        mr(i, [h]);
        break;
      case "alt+p":
        (f = i.current) == null || f.focus(), mr(i, [h, g]);
        break;
      case "alt+l":
        (x = s.current) == null || x.focus(), mr(s, [h, g]);
        break;
      case "alt+n":
        (v = c.current) == null || v.focus(), mr(c, [h, g]);
        break;
      case "alt+h":
        (C = d.current) == null || C.focus(), mr(d, [h, g]);
        break;
    }
  }), X(() => {
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
    return /* @__PURE__ */ a(au, { ref: n, className: "pr-twp tw:border-0 tw:bg-transparent", variant: o, children: Object.entries(t.columns).filter(([, w]) => typeof w == "object").sort(([, w], [, p]) => typeof w == "boolean" || typeof p == "boolean" ? 0 : w.order - p.order).map(([w, p]) => /* @__PURE__ */ u(ou, { children: [
      /* @__PURE__ */ a(iu, { ref: l(w), children: typeof p == "object" && "label" in p && p.label }),
      /* @__PURE__ */ a(
        su,
        {
          style: { zIndex: wr },
          children: /* @__PURE__ */ a(Gt, { children: $i(t.groups, t.items, w, e) })
        }
      )
    ] }, w)) });
}
function Zp(t) {
  switch (t) {
    case void 0:
      return;
    case "darwin":
      return "tw:ps-[85px]";
    default:
      return "tw:pe-[calc(138px+1rem)]";
  }
}
function Qp({
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
  const w = U(void 0);
  return /* @__PURE__ */ a(
    "div",
    {
      className: m("tw:border tw:px-4 tw:text-foreground", o),
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
                    pu,
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
const hu = (t, e) => t[e] ?? e;
function th({
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
  const l = hu(
    s,
    "%settings_uiLanguageSelector_fallbackLanguages%"
  ), [w, p] = _(!1), h = (f) => {
    n && n(f), o && o([f, ...r.filter((x) => x !== f)]), i && r.find((x) => x === f) && i([...r.filter((x) => x !== f)]), p(!1);
  }, g = (f, x) => {
    var C, N, k, M, j, S;
    const v = x !== f ? ((N = (C = t[f]) == null ? void 0 : C.uiNames) == null ? void 0 : N[x]) ?? ((M = (k = t[f]) == null ? void 0 : k.uiNames) == null ? void 0 : M.en) : void 0;
    return v ? `${(j = t[f]) == null ? void 0 : j.autonym} (${v})` : (S = t[f]) == null ? void 0 : S.autonym;
  };
  return /* @__PURE__ */ u("div", { id: d, className: m("pr-twp tw:max-w-sm", c), children: [
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
              style: { zIndex: wr },
              children: Object.keys(t).map((f) => /* @__PURE__ */ a(de, { value: f, children: g(f, e) }, f))
            }
          )
        ]
      }
    ),
    e !== "en" && /* @__PURE__ */ a("div", { className: "tw:pt-3", children: /* @__PURE__ */ a(Nt, { className: "tw:font-normal tw:text-muted-foreground", children: qe(l, {
      fallbackLanguages: (r == null ? void 0 : r.length) > 0 ? r.map((f) => g(f, e)).join(", ") : t.en.autonym
    }) }) })
  ] });
}
function gu({ item: t, createLabel: e, createComplexLabel: r }) {
  return e ? /* @__PURE__ */ a(Nt, { children: e(t) }) : r ? /* @__PURE__ */ a(Nt, { children: r(t) }) : /* @__PURE__ */ a(Nt, { children: t });
}
function fu({
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
      ki,
      {
        className: "tw:me-2 tw:align-middle",
        checked: o.includes(c),
        onCheckedChange: (d) => n(c, d)
      }
    ),
    /* @__PURE__ */ a(
      gu,
      {
        item: c,
        createLabel: i,
        createComplexLabel: s
      }
    )
  ] }, c)) });
}
const eh = fu;
function rh({
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
  showDropdownOnHover: h = !1
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
      className: m(
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
            !e && h && l && /* @__PURE__ */ a("div", { className: "tw:invisible tw:group-hover:visible", children: /* @__PURE__ */ u(Ce, { children: [
              /* @__PURE__ */ a(Ee, { className: m(p && "tw:me-1"), asChild: !0, children: /* @__PURE__ */ a(q, { className: "tw:m-1 tw:h-6 tw:w-6", variant: "ghost", size: "icon", children: /* @__PURE__ */ a(No, {}) }) }),
              /* @__PURE__ */ a(Te, { align: "end", children: l })
            ] }) }),
            e && l && /* @__PURE__ */ u(Ce, { children: [
              /* @__PURE__ */ a(Ee, { className: m(p && "tw:me-1"), asChild: !0, children: /* @__PURE__ */ a(q, { className: "tw:m-1 tw:h-6 tw:w-6", variant: "ghost", size: "icon", children: /* @__PURE__ */ a(No, {}) }) }),
              /* @__PURE__ */ a(Te, { align: "end", children: l })
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
function ah({ message: t, id: e, className: r }) {
  return /* @__PURE__ */ a(
    "p",
    {
      role: "status",
      "data-testid": e,
      className: m("tw:text-sm tw:text-muted-foreground", r),
      children: t
    }
  );
}
function oh({
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
  onFocus: h,
  onBlur: g
}) {
  return /* @__PURE__ */ u("div", { className: m("tw:inline-grid tw:items-center tw:gap-1.5", { "tw:w-full": o }), children: [
    /* @__PURE__ */ a(
      Nt,
      {
        htmlFor: t,
        className: m({
          "tw:text-red-600": r,
          "tw:hidden": !i
        }),
        children: `${i}${c ? "*" : ""}`
      }
    ),
    /* @__PURE__ */ a(
      ta,
      {
        id: t,
        disabled: e,
        placeholder: s,
        required: c,
        className: m(d, { "tw:border-red-600": r }),
        defaultValue: l,
        value: w,
        onChange: p,
        onFocus: h,
        onBlur: g
      }
    ),
    /* @__PURE__ */ a("p", { className: m({ "tw:hidden": !n }), children: n })
  ] });
}
const mu = ea(
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
      className: m(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation, ensuring
        // shadcn styles are correctly scoped when rendered inside the Platform.Bible app.
        "pr-twp",
        mu({ variant: e }),
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
      className: m(
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
      className: m(
        "tw:text-sm tw:text-balance tw:text-muted-foreground tw:md:text-pretty tw:[&_a]:underline tw:[&_a]:underline-offset-3 tw:[&_a]:hover:text-foreground tw:[&_p:not(:last-child)]:mb-4",
        t
      ),
      ...e
    }
  );
}
function ch({ ...t }) {
  return /* @__PURE__ */ a(Dt.Root, { "data-slot": "context-menu", ...t });
}
function lh({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    Dt.Trigger,
    {
      "data-slot": "context-menu-trigger",
      className: m("tw:select-none", t),
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
function hh({
  className: t,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: e,
  ...r
}) {
  return /* @__PURE__ */ a(Dt.Portal, { children: /* @__PURE__ */ a(
    Dt.Content,
    {
      "data-slot": "context-menu-content",
      className: m(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        // CUSTOM: Fixed tw: prefix not being on some classes and removed erroneous empty tw: tokens
        // CUSTOM: Removed tw:z-50 to use the shared z-index constant below (see style prop)
        "pr-twp tw:max-h-(--radix-context-menu-content-available-height) tw:min-w-36 tw:origin-(--radix-context-menu-content-transform-origin) tw:overflow-x-hidden tw:overflow-y-auto tw:rounded-lg tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95 tw:animate-none! tw:bg-popover/70 tw:before:-z-1 tw:**:data-[slot$=-item]:focus:bg-foreground/10 tw:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 tw:**:data-[slot$=-separator]:bg-foreground/5 tw:**:data-[slot$=-trigger]:focus:bg-foreground/10 tw:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! tw:**:data-[variant=destructive]:focus:bg-foreground/10! tw:**:data-[variant=destructive]:text-accent-foreground! tw:**:data-[variant=destructive]:**:text-accent-foreground! tw:relative tw:before:pointer-events-none tw:before:absolute tw:before:inset-0 tw:before:rounded-[inherit] tw:before:backdrop-blur-2xl tw:before:backdrop-saturate-150",
        t
      ),
      style: { zIndex: wr, ...e },
      ...r
    }
  ) });
}
function gh({
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
      className: m(
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
      className: m(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-inset:ps-7 tw:data-open:bg-accent tw:data-open:text-accent-foreground tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      ...o,
      children: [
        r,
        /* @__PURE__ */ a(Ln, { className: "tw:ms-auto" })
      ]
    }
  );
}
function mh({
  className: t,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: e,
  ...r
}) {
  return /* @__PURE__ */ a(
    Dt.SubContent,
    {
      "data-slot": "context-menu-sub-content",
      className: m(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        // CUSTOM: Fixed tw: prefix not being on some classes and removed erroneous empty tw: tokens
        // CUSTOM: Removed tw:z-50 to use the shared z-index constant below (see style prop), keeping
        // submenus on the same above-dock layer as their parent ContextMenuContent (PT-3877)
        "pr-twp tw:min-w-32 tw:origin-(--radix-context-menu-content-transform-origin) tw:overflow-hidden tw:rounded-lg tw:border tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-lg tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95 tw:animate-none! tw:bg-popover/70 tw:before:-z-1 tw:**:data-[slot$=-item]:focus:bg-foreground/10 tw:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 tw:**:data-[slot$=-separator]:bg-foreground/5 tw:**:data-[slot$=-trigger]:focus:bg-foreground/10 tw:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! tw:**:data-[variant=destructive]:focus:bg-foreground/10! tw:**:data-[variant=destructive]:text-accent-foreground! tw:**:data-[variant=destructive]:**:text-accent-foreground! tw:relative tw:before:pointer-events-none tw:before:absolute tw:before:inset-0 tw:before:rounded-[inherit] tw:before:backdrop-blur-2xl tw:before:backdrop-saturate-150",
        t
      ),
      style: { zIndex: wr, ...e },
      ...r
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
      className: m(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      checked: r,
      ...n,
      children: [
        /* @__PURE__ */ a("span", { className: "tw:pointer-events-none tw:absolute tw:end-2", children: /* @__PURE__ */ a(Dt.ItemIndicator, { children: /* @__PURE__ */ a(ra, {}) }) }),
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
      className: m(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      ...o,
      children: [
        /* @__PURE__ */ a("span", { className: "tw:pointer-events-none tw:absolute tw:end-2", children: /* @__PURE__ */ a(Dt.ItemIndicator, { children: /* @__PURE__ */ a(ra, {}) }) }),
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
      className: m(
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
      className: m(
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
      className: m(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; tw:ms-auto uses logical margin for RTL support
        "pr-twp tw:ms-auto tw:text-xs tw:tracking-widest tw:text-muted-foreground tw:group-focus/context-menu-item:text-accent-foreground",
        t
      ),
      ...e
    }
  );
}
function _h({ ...t }) {
  return /* @__PURE__ */ a(je.Root, { "data-slot": "drawer", ...t });
}
function Nh({ ...t }) {
  return /* @__PURE__ */ a(je.Trigger, { "data-slot": "drawer-trigger", ...t });
}
function vu({ ...t }) {
  return /* @__PURE__ */ a(je.Portal, { "data-slot": "drawer-portal", ...t });
}
function Ch({ ...t }) {
  return /* @__PURE__ */ a(je.Close, { "data-slot": "drawer-close", ...t });
}
function bu({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    je.Overlay,
    {
      "data-slot": "drawer-overlay",
      className: m(
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
  const n = ie();
  return /* @__PURE__ */ u(vu, { "data-slot": "drawer-portal", children: [
    /* @__PURE__ */ a(bu, {}),
    /* @__PURE__ */ u(
      je.Content,
      {
        "data-slot": "drawer-content",
        className: m(
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
function Th({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "drawer-header",
      className: m(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:flex tw:flex-col tw:gap-0.5 tw:p-4 tw:group-data-[vaul-drawer-direction=bottom]/drawer-content:text-center tw:group-data-[vaul-drawer-direction=top]/drawer-content:text-center tw:md:gap-0.5 tw:md:text-start",
        t
      ),
      ...e
    }
  );
}
function zh({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "drawer-footer",
      className: m(
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
    je.Title,
    {
      "data-slot": "drawer-title",
      className: m(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:font-heading tw:text-base tw:font-medium tw:text-foreground",
        t
      ),
      ...e
    }
  );
}
function Rh({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    je.Description,
    {
      "data-slot": "drawer-description",
      className: m(
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
    Ro.Root,
    {
      "data-slot": "progress",
      className: m(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:relative tw:flex tw:h-1 tw:w-full tw:items-center tw:overflow-x-hidden tw:rounded-full tw:bg-muted",
        t
      ),
      ...r,
      children: /* @__PURE__ */ a(
        Ro.Indicator,
        {
          "data-slot": "progress-indicator",
          className: "tw:size-full tw:flex-1 tw:bg-primary tw:transition-all",
          style: { transform: `translateX(-${100 - (e || 0)}%)` }
        }
      )
    }
  );
}
function Mh({ ...t }) {
  const { theme: e = "system" } = ll();
  return /* @__PURE__ */ a(
    dl,
    {
      theme: e === "light" || e === "dark" || e === "system" ? e : "system",
      className: "tw:toaster tw:group",
      icons: {
        success: /* @__PURE__ */ a(rl, { className: "tw:size-4" }),
        info: /* @__PURE__ */ a(el, { className: "tw:size-4" }),
        warning: /* @__PURE__ */ a(tl, { className: "tw:size-4" }),
        error: /* @__PURE__ */ a(Qc, { className: "tw:size-4" }),
        loading: /* @__PURE__ */ a(Zc, { className: "tw:size-4 tw:animate-spin" })
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
  const s = ie(), c = Rt.useMemo(
    () => Array.isArray(r) ? r : Array.isArray(e) ? e : [o, n],
    [r, e, o, n]
  );
  return /* @__PURE__ */ u(
    Mr.Root,
    {
      "data-slot": "slider",
      defaultValue: e,
      value: r,
      min: o,
      max: n,
      className: m(
        "pr-twp tw:relative tw:flex tw:w-full tw:touch-none tw:items-center tw:select-none tw:data-disabled:opacity-50 tw:data-vertical:h-full tw:data-vertical:min-h-40 tw:data-vertical:w-auto tw:data-vertical:flex-col",
        t
      ),
      dir: s,
      ...i,
      children: [
        /* @__PURE__ */ a(
          Mr.Track,
          {
            "data-slot": "slider-track",
            className: "tw:relative tw:grow tw:overflow-hidden tw:rounded-full tw:bg-muted tw:data-horizontal:h-1 tw:data-horizontal:w-full tw:data-vertical:h-full tw:data-vertical:w-1",
            children: /* @__PURE__ */ a(
              Mr.Range,
              {
                "data-slot": "slider-range",
                className: "tw:absolute tw:bg-primary tw:select-none tw:data-horizontal:h-full tw:data-vertical:w-full"
              }
            )
          }
        ),
        Array.from({ length: c.length }, (d, l) => /* @__PURE__ */ a(
          Mr.Thumb,
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
function Oh({
  className: t,
  size: e = "default",
  ...r
}) {
  return /* @__PURE__ */ a(
    Do.Root,
    {
      "data-slot": "switch",
      "data-size": e,
      className: m(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation. tw:peer
        // precedes pr-twp here because the peer class must be the first peer-related class for
        // Tailwind's peer selector to work correctly; pr-twp is still present as required.
        "tw:peer pr-twp tw:group/switch tw:relative tw:inline-flex tw:shrink-0 tw:items-center tw:rounded-full tw:border tw:border-transparent tw:transition-all tw:outline-none tw:after:absolute tw:after:-inset-x-3 tw:after:-inset-y-2 tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:data-[size=default]:h-[18.4px] tw:data-[size=default]:w-[32px] tw:data-[size=sm]:h-[14px] tw:data-[size=sm]:w-[24px] tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40 tw:data-checked:bg-primary tw:data-unchecked:bg-input tw:dark:data-unchecked:bg-input/80 tw:data-disabled:cursor-not-allowed tw:data-disabled:opacity-50",
        t
      ),
      ...r,
      children: /* @__PURE__ */ a(
        Do.Thumb,
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
    ue.Root,
    {
      "data-slot": "tabs",
      "data-orientation": e,
      className: m("tw:group/tabs tw:flex tw:gap-2 tw:data-horizontal:flex-col", t),
      ...r
    }
  );
}
const xu = ea(
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
function Ih({
  className: t,
  variant: e = "default",
  ...r
}) {
  const o = ie();
  return /* @__PURE__ */ a(
    ue.List,
    {
      "data-slot": "tabs-list",
      "data-variant": e,
      className: m("pr-twp", xu({ variant: e }), t),
      dir: o,
      ...r
    }
  );
}
function Ph({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    ue.Trigger,
    {
      "data-slot": "tabs-trigger",
      className: m(
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
function Vh({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    ue.Content,
    {
      "data-slot": "tabs-content",
      className: m("pr-twp tw:flex-1 tw:text-sm tw:outline-none", t),
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
function yu(t) {
  return {
    preserveValue: !0,
    ...t
  };
}
const ku = (t, e, r = {}) => {
  const o = U(e);
  o.current = e;
  const n = U(r);
  n.current = yu(n.current);
  const [i, s] = _(() => o.current), [c, d] = _(!0);
  return X(() => {
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
}, ka = () => !1, Bh = (t, e) => {
  const [r] = ku(
    L(async () => {
      if (!t) return ka;
      const o = await Promise.resolve(t(e));
      return async () => o();
    }, [e, t]),
    ka,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  X(() => () => {
    r !== ka && r();
  }, [r]);
};
function Lh(t) {
  X(() => {
    let e;
    return t && (e = document.createElement("style"), e.appendChild(document.createTextNode(t)), document.head.appendChild(e)), () => {
      e && document.head.removeChild(e);
    };
  }, [t]);
}
function Fh(t) {
  const e = I(() => qs(t).slice().sort().join(" "), [t]);
  return I(() => e ? e.split(" ") : [], [e]);
}
function _u(t, e = "top") {
  if (!t || typeof document > "u") return;
  const r = document.head || document.querySelector("head"), o = r.querySelector(":first-child"), n = document.createElement("style");
  n.appendChild(document.createTextNode(t)), e === "top" && o ? r.insertBefore(n, o) : r.appendChild(n);
}
_u(`.banded-row:hover {
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
@layer properties{@supports (((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))){*,:before,:after,::backdrop{--tw-translate-x:0;--tw-translate-y:0;--tw-translate-z:0;--tw-rotate-x:initial;--tw-rotate-y:initial;--tw-rotate-z:initial;--tw-skew-x:initial;--tw-skew-y:initial;--tw-space-y-reverse:0;--tw-space-x-reverse:0;--tw-divide-x-reverse:0;--tw-border-style:solid;--tw-divide-y-reverse:0;--tw-leading:initial;--tw-font-weight:initial;--tw-tracking:initial;--tw-ordinal:initial;--tw-slashed-zero:initial;--tw-numeric-figure:initial;--tw-numeric-spacing:initial;--tw-numeric-fraction:initial;--tw-shadow:0 0 #0000;--tw-shadow-color:initial;--tw-shadow-alpha:100%;--tw-inset-shadow:0 0 #0000;--tw-inset-shadow-color:initial;--tw-inset-shadow-alpha:100%;--tw-ring-color:initial;--tw-ring-shadow:0 0 #0000;--tw-inset-ring-color:initial;--tw-inset-ring-shadow:0 0 #0000;--tw-ring-inset:initial;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-offset-shadow:0 0 #0000;--tw-blur:initial;--tw-brightness:initial;--tw-contrast:initial;--tw-grayscale:initial;--tw-hue-rotate:initial;--tw-invert:initial;--tw-opacity:initial;--tw-saturate:initial;--tw-sepia:initial;--tw-drop-shadow:initial;--tw-drop-shadow-color:initial;--tw-drop-shadow-alpha:100%;--tw-drop-shadow-size:initial;--tw-duration:initial;--tw-ease:initial;--tw-content:"";--tw-backdrop-blur:initial;--tw-backdrop-brightness:initial;--tw-backdrop-contrast:initial;--tw-backdrop-grayscale:initial;--tw-backdrop-hue-rotate:initial;--tw-backdrop-invert:initial;--tw-backdrop-opacity:initial;--tw-backdrop-saturate:initial;--tw-backdrop-sepia:initial;--tw-outline-style:solid;--tw-animation-delay:0s;--tw-animation-direction:normal;--tw-animation-duration:initial;--tw-animation-fill-mode:none;--tw-animation-iteration-count:1;--tw-enter-blur:0;--tw-enter-opacity:1;--tw-enter-rotate:0;--tw-enter-scale:1;--tw-enter-translate-x:0;--tw-enter-translate-y:0;--tw-exit-blur:0;--tw-exit-opacity:1;--tw-exit-rotate:0;--tw-exit-scale:1;--tw-exit-translate-x:0;--tw-exit-translate-y:0}}}@layer theme{:root,:host{--tw-font-mono:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;--tw-color-red-100:oklch(93.6% .032 17.717);--tw-color-red-200:oklch(88.5% .062 18.334);--tw-color-red-300:oklch(80.8% .114 19.571);--tw-color-red-400:oklch(70.4% .191 22.216);--tw-color-red-500:oklch(63.7% .237 25.331);--tw-color-red-600:oklch(57.7% .245 27.325);--tw-color-red-700:oklch(50.5% .213 27.518);--tw-color-red-800:oklch(44.4% .177 26.899);--tw-color-orange-100:oklch(95.4% .038 75.164);--tw-color-orange-800:oklch(47% .157 37.304);--tw-color-amber-200:oklch(92.4% .12 95.746);--tw-color-amber-400:oklch(82.8% .189 84.429);--tw-color-amber-500:oklch(76.9% .188 70.08);--tw-color-amber-600:oklch(66.6% .179 58.318);--tw-color-yellow-50:oklch(98.7% .026 102.212);--tw-color-yellow-100:oklch(97.3% .071 103.193);--tw-color-yellow-400:oklch(85.2% .199 91.936);--tw-color-yellow-500:oklch(79.5% .184 86.047);--tw-color-yellow-600:oklch(68.1% .162 75.834);--tw-color-yellow-700:oklch(55.4% .135 66.442);--tw-color-green-50:oklch(98.2% .018 155.826);--tw-color-green-100:oklch(96.2% .044 156.743);--tw-color-green-500:oklch(72.3% .219 149.579);--tw-color-green-600:oklch(62.7% .194 149.214);--tw-color-green-700:oklch(52.7% .154 150.069);--tw-color-green-800:oklch(44.8% .119 151.328);--tw-color-teal-400:oklch(77.7% .152 181.912);--tw-color-teal-500:oklch(70.4% .14 182.503);--tw-color-teal-600:oklch(60% .118 184.704);--tw-color-sky-400:oklch(74.6% .16 232.661);--tw-color-sky-500:oklch(68.5% .169 237.323);--tw-color-sky-600:oklch(58.8% .158 241.966);--tw-color-blue-50:oklch(97% .014 254.604);--tw-color-blue-100:oklch(93.2% .032 255.585);--tw-color-blue-400:oklch(70.7% .165 254.624);--tw-color-blue-500:oklch(62.3% .214 259.815);--tw-color-blue-600:oklch(54.6% .245 262.881);--tw-color-blue-800:oklch(42.4% .199 265.638);--tw-color-indigo-200:oklch(87% .065 274.039);--tw-color-purple-50:oklch(97.7% .014 308.299);--tw-color-purple-200:oklch(90.2% .063 306.703);--tw-color-purple-900:oklch(38.1% .176 304.987);--tw-color-rose-400:oklch(71.2% .194 13.428);--tw-color-rose-500:oklch(64.5% .246 16.439);--tw-color-rose-600:oklch(58.6% .253 17.585);--tw-color-slate-50:oklch(98.4% .003 247.858);--tw-color-slate-300:oklch(86.9% .022 252.894);--tw-color-slate-400:oklch(70.4% .04 256.788);--tw-color-slate-500:oklch(55.4% .046 257.417);--tw-color-slate-900:oklch(20.8% .042 265.755);--tw-color-gray-50:oklch(98.5% .002 247.839);--tw-color-gray-100:oklch(96.7% .003 264.542);--tw-color-gray-300:oklch(87.2% .01 258.338);--tw-color-gray-500:oklch(55.1% .027 264.364);--tw-color-gray-600:oklch(44.6% .03 256.802);--tw-color-gray-700:oklch(37.3% .034 259.733);--tw-color-gray-800:oklch(27.8% .033 256.848);--tw-color-zinc-400:oklch(70.5% .015 286.067);--tw-color-neutral-300:oklch(87% 0 0);--tw-color-black:#000;--tw-color-white:#fff;--tw-container-xs:20rem;--tw-container-sm:24rem;--tw-container-md:28rem;--tw-container-lg:32rem;--tw-container-2xl:42rem;--tw-container-3xl:48rem;--tw-container-4xl:56rem;--tw-container-6xl:72rem;--tw-text-xs:.75rem;--tw-text-xs--line-height:calc(1 / .75);--tw-text-sm:.875rem;--tw-text-sm--line-height:calc(1.25 / .875);--tw-text-base:1rem;--tw-text-base--line-height:calc(1.5 / 1);--tw-text-lg:1.125rem;--tw-text-lg--line-height:calc(1.75 / 1.125);--tw-text-xl:1.25rem;--tw-text-xl--line-height:calc(1.75 / 1.25);--tw-text-2xl:1.5rem;--tw-text-2xl--line-height:calc(2 / 1.5);--tw-text-3xl:1.875rem;--tw-text-3xl--line-height:calc(2.25 / 1.875);--tw-text-4xl:2.25rem;--tw-text-4xl--line-height:calc(2.5 / 2.25);--tw-text-5xl:3rem;--tw-text-5xl--line-height:1;--tw-font-weight-normal:400;--tw-font-weight-medium:500;--tw-font-weight-semibold:600;--tw-font-weight-bold:700;--tw-font-weight-extrabold:800;--tw-tracking-tight:-.025em;--tw-tracking-wider:.05em;--tw-tracking-widest:.1em;--tw-leading-tight:1.25;--tw-leading-snug:1.375;--tw-leading-relaxed:1.625;--tw-leading-loose:2;--tw-radius-md:calc(var(--radius) * .8);--tw-drop-shadow-sm:0 1px 2px #00000026;--tw-animate-spin:spin 1s linear infinite;--tw-animate-pulse:pulse 2s cubic-bezier(.4, 0, .6, 1) infinite;--tw-blur-xs:4px;--tw-blur-2xl:40px;--tw-default-transition-duration:.15s;--tw-default-transition-timing-function:cubic-bezier(.4, 0, .2, 1);--tw-default-font-family:"IBM Plex Sans Variable", sans-serif;--tw-default-mono-font-family:var(--tw-font-mono)}}@layer base{.pr-twp,.pr-twp *{border-color:var(--border);outline-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.pr-twp,.pr-twp *{outline-color:color-mix(in oklab, var(--ring) 50%, transparent)}}body.pr-twp{background-color:var(--background);color:var(--foreground)}html.pr-twp{font-family:IBM Plex Sans Variable,sans-serif}:where(.pr-twp,.pr-twp *),:where(.pr-twp,.pr-twp *):after,:where(.pr-twp,.pr-twp *):before,:where(.pr-twp,.pr-twp *) ::backdrop{box-sizing:border-box;border:0 solid;margin:0;padding:0}:where(.pr-twp,.pr-twp *) ::file-selector-button{box-sizing:border-box;border:0 solid;margin:0;padding:0}.pr-twp{-webkit-text-size-adjust:100%;tab-size:4;line-height:1.5;font-family:var(--tw-default-font-family,ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");font-feature-settings:var(--tw-default-font-feature-settings,normal);font-variation-settings:var(--tw-default-font-variation-settings,normal);-webkit-tap-highlight-color:transparent}hr:where(.pr-twp,.pr-twp *){height:0;color:inherit;border-top-width:1px}abbr:where([title]):where(.pr-twp,.pr-twp *){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1:where(.pr-twp,.pr-twp *),h2:where(.pr-twp,.pr-twp *),h3:where(.pr-twp,.pr-twp *),h4:where(.pr-twp,.pr-twp *),h5:where(.pr-twp,.pr-twp *),h6:where(.pr-twp,.pr-twp *){font-size:inherit;font-weight:inherit}a:where(.pr-twp,.pr-twp *){color:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b:where(.pr-twp,.pr-twp *),strong:where(.pr-twp,.pr-twp *){font-weight:bolder}code:where(.pr-twp,.pr-twp *),kbd:where(.pr-twp,.pr-twp *),samp:where(.pr-twp,.pr-twp *),pre:where(.pr-twp,.pr-twp *){font-family:var(--tw-default-mono-font-family,ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace);font-feature-settings:var(--tw-default-mono-font-feature-settings,normal);font-variation-settings:var(--tw-default-mono-font-variation-settings,normal);font-size:1em}small:where(.pr-twp,.pr-twp *){font-size:80%}sub:where(.pr-twp,.pr-twp *),sup:where(.pr-twp,.pr-twp *){vertical-align:baseline;font-size:75%;line-height:0;position:relative}sub:where(.pr-twp,.pr-twp *){bottom:-.25em}sup:where(.pr-twp,.pr-twp *){top:-.5em}table:where(.pr-twp,.pr-twp *){text-indent:0;border-color:inherit;border-collapse:collapse}:-moz-focusring:where(.pr-twp,.pr-twp *){outline:auto}progress:where(.pr-twp,.pr-twp *){vertical-align:baseline}summary:where(.pr-twp,.pr-twp *){display:list-item}ol:where(.pr-twp,.pr-twp *),ul:where(.pr-twp,.pr-twp *),menu:where(.pr-twp,.pr-twp *){list-style:none}img:where(.pr-twp,.pr-twp *),svg:where(.pr-twp,.pr-twp *),video:where(.pr-twp,.pr-twp *),canvas:where(.pr-twp,.pr-twp *),audio:where(.pr-twp,.pr-twp *),iframe:where(.pr-twp,.pr-twp *),embed:where(.pr-twp,.pr-twp *),object:where(.pr-twp,.pr-twp *){vertical-align:middle;display:block}img:where(.pr-twp,.pr-twp *),video:where(.pr-twp,.pr-twp *){max-width:100%;height:auto}button:where(.pr-twp,.pr-twp *),input:where(.pr-twp,.pr-twp *),select:where(.pr-twp,.pr-twp *),optgroup:where(.pr-twp,.pr-twp *),textarea:where(.pr-twp,.pr-twp *){font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(.pr-twp,.pr-twp *) ::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(select:is([multiple],[size])) optgroup:where(.pr-twp,.pr-twp *){font-weight:bolder}:where(select:is([multiple],[size])) optgroup option:where(.pr-twp,.pr-twp *){padding-inline-start:20px}:where(.pr-twp,.pr-twp *) ::file-selector-button{margin-inline-end:4px}:where(.pr-twp,.pr-twp *) ::placeholder{opacity:1}@supports (not ((-webkit-appearance:-apple-pay-button))) or (contain-intrinsic-size:1px){:where(.pr-twp,.pr-twp *) ::placeholder{color:currentColor}@supports (color:color-mix(in lab, red, red)){:where(.pr-twp,.pr-twp *) ::placeholder{color:color-mix(in oklab, currentcolor 50%, transparent)}}}textarea:where(.pr-twp,.pr-twp *){resize:vertical}:where(.pr-twp,.pr-twp *) ::-webkit-search-decoration{-webkit-appearance:none}:where(.pr-twp,.pr-twp *) ::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit{display:inline-flex}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-fields-wrapper{padding:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-year-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-month-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-day-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-hour-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-minute-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-second-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-millisecond-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-meridiem-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-calendar-picker-indicator{line-height:1}:-moz-ui-invalid:where(.pr-twp,.pr-twp *){box-shadow:none}button:where(.pr-twp,.pr-twp *),input:where([type=button],[type=reset],[type=submit]):where(.pr-twp,.pr-twp *){appearance:button}:where(.pr-twp,.pr-twp *) ::file-selector-button{appearance:button}:where(.pr-twp,.pr-twp *) ::-webkit-inner-spin-button{height:auto}:where(.pr-twp,.pr-twp *) ::-webkit-outer-spin-button{height:auto}[hidden]:where(:not([hidden=until-found])):where(.pr-twp,.pr-twp *){display:none!important}}@layer components;@layer utilities{.tw\\:\\@container\\/card-header{container:card-header/inline-size}.tw\\:\\@container\\/search{container:search/inline-size}.tw\\:\\@container\\/toolbar{container:toolbar/inline-size}.tw\\:pointer-events-auto{pointer-events:auto}.tw\\:pointer-events-none{pointer-events:none}.tw\\:invisible{visibility:hidden}.tw\\:sr-only{clip-path:inset(50%);white-space:nowrap;border-width:0;width:1px;height:1px;margin:-1px;padding:0;position:absolute;overflow:hidden}.tw\\:absolute{position:absolute}.tw\\:fixed{position:fixed}.tw\\:relative{position:relative}.tw\\:sticky{position:sticky}.tw\\:inset-0{inset:calc(calc(var(--spacing)) * 0)}.tw\\:inset-y-0{inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:inset-s-3{inset-inline-start:calc(calc(var(--spacing)) * 3)}.tw\\:start-1\\.5{inset-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:start-1\\/2{inset-inline-start:50%}.tw\\:end-0{inset-inline-end:calc(calc(var(--spacing)) * 0)}.tw\\:end-1{inset-inline-end:calc(calc(var(--spacing)) * 1)}.tw\\:end-2{inset-inline-end:calc(calc(var(--spacing)) * 2)}.tw\\:end-3{inset-inline-end:calc(calc(var(--spacing)) * 3)}.tw\\:inset-e-0{inset-inline-end:calc(calc(var(--spacing)) * 0)}.tw\\:-top-\\[1px\\]{top:-1px}.tw\\:top-0{top:calc(calc(var(--spacing)) * 0)}.tw\\:top-1\\.5{top:calc(calc(var(--spacing)) * 1.5)}.tw\\:top-1\\/2{top:50%}.tw\\:top-1\\/3{top:33.3333%}.tw\\:top-2{top:calc(calc(var(--spacing)) * 2)}.tw\\:top-2\\.5{top:calc(calc(var(--spacing)) * 2.5)}.tw\\:top-3\\.5{top:calc(calc(var(--spacing)) * 3.5)}.tw\\:top-\\[-1px\\]{top:-1px}.tw\\:top-full{top:100%}.tw\\:-right-1{right:calc(calc(var(--spacing)) * -1)}.tw\\:right-0{right:calc(calc(var(--spacing)) * 0)}.tw\\:right-1{right:calc(calc(var(--spacing)) * 1)}.tw\\:right-3{right:calc(calc(var(--spacing)) * 3)}.tw\\:bottom-0{bottom:calc(calc(var(--spacing)) * 0)}.tw\\:-left-\\[1px\\]{left:-1px}.tw\\:left-0{left:calc(calc(var(--spacing)) * 0)}.tw\\:left-1\\/2{left:50%}.tw\\:left-2{left:calc(calc(var(--spacing)) * 2)}.tw\\:left-3{left:calc(calc(var(--spacing)) * 3)}.tw\\:isolate{isolation:isolate}.tw\\:z-10{z-index:10}.tw\\:z-20{z-index:20}.tw\\:z-50{z-index:50}.tw\\:order-first{order:-9999}.tw\\:order-last{order:9999}.tw\\:col-span-1{grid-column:span 1/span 1}.tw\\:col-span-2{grid-column:span 2/span 2}.tw\\:col-span-3{grid-column:span 3/span 3}.tw\\:col-start-1{grid-column-start:1}.tw\\:col-start-2{grid-column-start:2}.tw\\:row-span-2{grid-row:span 2/span 2}.tw\\:row-start-1{grid-row-start:1}.tw\\:row-start-2{grid-row-start:2}.tw\\:m-0{margin:calc(calc(var(--spacing)) * 0)}.tw\\:m-1{margin:calc(calc(var(--spacing)) * 1)}.tw\\:m-2{margin:calc(calc(var(--spacing)) * 2)}.tw\\:-mx-1{margin-inline:calc(calc(var(--spacing)) * -1)}.tw\\:-mx-4{margin-inline:calc(calc(var(--spacing)) * -4)}.tw\\:mx-0{margin-inline:calc(calc(var(--spacing)) * 0)}.tw\\:mx-1{margin-inline:calc(calc(var(--spacing)) * 1)}.tw\\:mx-2{margin-inline:calc(calc(var(--spacing)) * 2)}.tw\\:mx-3\\.5{margin-inline:calc(calc(var(--spacing)) * 3.5)}.tw\\:mx-8{margin-inline:calc(calc(var(--spacing)) * 8)}.tw\\:my-1{margin-block:calc(calc(var(--spacing)) * 1)}.tw\\:my-2\\.5{margin-block:calc(calc(var(--spacing)) * 2.5)}.tw\\:my-4{margin-block:calc(calc(var(--spacing)) * 4)}.tw\\:my-auto{margin-block:auto}.tw\\:ms-1{margin-inline-start:calc(calc(var(--spacing)) * 1)}.tw\\:ms-2{margin-inline-start:calc(calc(var(--spacing)) * 2)}.tw\\:ms-5{margin-inline-start:calc(calc(var(--spacing)) * 5)}.tw\\:ms-auto{margin-inline-start:auto}.tw\\:me-1{margin-inline-end:calc(calc(var(--spacing)) * 1)}.tw\\:me-2{margin-inline-end:calc(calc(var(--spacing)) * 2)}.tw\\:prose{color:var(--tw-prose-body);max-width:65ch}.tw\\:prose :where(p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em}.tw\\:prose :where([class~=lead]):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-lead);margin-top:1.2em;margin-bottom:1.2em;font-size:1.25em;line-height:1.6}.tw\\:prose :where(a):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-links);font-weight:500;text-decoration:underline}.tw\\:prose :where(strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-bold);font-weight:600}.tw\\:prose :where(a strong):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(blockquote strong):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(thead th strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.tw\\:prose :where(ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em;padding-inline-start:1.625em;list-style-type:decimal}.tw\\:prose :where(ol[type=A]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-alpha}.tw\\:prose :where(ol[type=a]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-alpha}.tw\\:prose :where(ol[type=A s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-alpha}.tw\\:prose :where(ol[type=a s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-alpha}.tw\\:prose :where(ol[type=I]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-roman}.tw\\:prose :where(ol[type=i]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-roman}.tw\\:prose :where(ol[type=I s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-roman}.tw\\:prose :where(ol[type=i s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-roman}.tw\\:prose :where(ol[type="1"]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:decimal}.tw\\:prose :where(ul):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em;padding-inline-start:1.625em;list-style-type:disc}.tw\\:prose :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *))::marker{color:var(--tw-prose-counters);font-weight:400}.tw\\:prose :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *))::marker{color:var(--tw-prose-bullets)}.tw\\:prose :where(dt):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:1.25em;font-weight:600}.tw\\:prose :where(hr):not(:where([class~=not-prose],[class~=not-prose] *)){border-color:var(--tw-prose-hr);border-top-width:1px;margin-top:3em;margin-bottom:3em}.tw\\:prose :where(blockquote):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-quotes);border-inline-start-width:.25rem;border-inline-start-color:var(--tw-prose-quote-borders);quotes:"“""”""‘""’";margin-top:1.6em;margin-bottom:1.6em;padding-inline-start:1em;font-style:italic;font-weight:500}.tw\\:prose :where(blockquote p:first-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):before{content:open-quote}.tw\\:prose :where(blockquote p:last-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:close-quote}.tw\\:prose :where(h1):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:0;margin-bottom:.888889em;font-size:2.25em;font-weight:800;line-height:1.11111}.tw\\:prose :where(h1 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:900}.tw\\:prose :where(h2):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:2em;margin-bottom:1em;font-size:1.5em;font-weight:700;line-height:1.33333}.tw\\:prose :where(h2 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:800}.tw\\:prose :where(h3):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:1.6em;margin-bottom:.6em;font-size:1.25em;font-weight:600;line-height:1.6}.tw\\:prose :where(h3 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:700}.tw\\:prose :where(h4):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:1.5em;margin-bottom:.5em;font-weight:600;line-height:1.5}.tw\\:prose :where(h4 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:700}.tw\\:prose :where(img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.tw\\:prose :where(picture):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em;display:block}.tw\\:prose :where(video):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.tw\\:prose :where(kbd):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-kbd);box-shadow:0 0 0 1px rgb(var(--tw-prose-kbd-shadows) / 10%), 0 3px 0 rgb(var(--tw-prose-kbd-shadows) / 10%);padding-top:.1875em;padding-inline-end:.375em;padding-bottom:.1875em;border-radius:.3125rem;padding-inline-start:.375em;font-family:inherit;font-size:.875em;font-weight:500}.tw\\:prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-code);font-size:.875em;font-weight:600}.tw\\:prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)):before,.tw\\:prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:"\`"}.tw\\:prose :where(a code):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h1 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.tw\\:prose :where(h2 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-size:.875em}.tw\\:prose :where(h3 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-size:.9em}.tw\\:prose :where(h4 code):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(blockquote code):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(thead th code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.tw\\:prose :where(pre):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-pre-code);background-color:var(--tw-prose-pre-bg);padding-top:.857143em;padding-inline-end:1.14286em;padding-bottom:.857143em;border-radius:.375rem;margin-top:1.71429em;margin-bottom:1.71429em;padding-inline-start:1.14286em;font-size:.875em;font-weight:400;line-height:1.71429;overflow-x:auto}.tw\\:prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)){font-weight:inherit;color:inherit;font-size:inherit;font-family:inherit;line-height:inherit;background-color:#0000;border-width:0;border-radius:0;padding:0}.tw\\:prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)):before,.tw\\:prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:none}.tw\\:prose :where(table):not(:where([class~=not-prose],[class~=not-prose] *)){table-layout:auto;width:100%;margin-top:2em;margin-bottom:2em;font-size:.875em;line-height:1.71429}.tw\\:prose :where(thead):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:1px;border-bottom-color:var(--tw-prose-th-borders)}.tw\\:prose :where(thead th):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);vertical-align:bottom;padding-inline-end:.571429em;padding-bottom:.571429em;padding-inline-start:.571429em;font-weight:600}.tw\\:prose :where(tbody tr):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:1px;border-bottom-color:var(--tw-prose-td-borders)}.tw\\:prose :where(tbody tr:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:0}.tw\\:prose :where(tbody td):not(:where([class~=not-prose],[class~=not-prose] *)){vertical-align:baseline}.tw\\:prose :where(tfoot):not(:where([class~=not-prose],[class~=not-prose] *)){border-top-width:1px;border-top-color:var(--tw-prose-th-borders)}.tw\\:prose :where(tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){vertical-align:top}.tw\\:prose :where(th,td):not(:where([class~=not-prose],[class~=not-prose] *)){text-align:start}.tw\\:prose :where(figure>*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose :where(figcaption):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-captions);margin-top:.857143em;font-size:.875em;line-height:1.42857}.tw\\:prose{--tw-prose-body:var(--foreground);--tw-prose-headings:var(--foreground);--tw-prose-lead:var(--muted-foreground);--tw-prose-links:var(--primary);--tw-prose-bold:var(--foreground);--tw-prose-counters:var(--muted-foreground);--tw-prose-bullets:var(--muted-foreground);--tw-prose-hr:var(--border);--tw-prose-quotes:var(--foreground);--tw-prose-quote-borders:var(--border);--tw-prose-captions:var(--muted-foreground);--tw-prose-kbd:oklch(21% .034 264.665);--tw-prose-kbd-shadows:NaN NaN NaN;--tw-prose-code:var(--foreground);--tw-prose-pre-code:var(--muted-foreground);--tw-prose-pre-bg:var(--muted);--tw-prose-th-borders:var(--border);--tw-prose-td-borders:var(--border);--tw-prose-invert-body:var(--foreground);--tw-prose-invert-headings:var(--foreground);--tw-prose-invert-lead:var(--muted-foreground);--tw-prose-invert-links:var(--primary);--tw-prose-invert-bold:var(--foreground);--tw-prose-invert-counters:var(--muted-foreground);--tw-prose-invert-bullets:var(--muted-foreground);--tw-prose-invert-hr:var(--border);--tw-prose-invert-quotes:var(--foreground);--tw-prose-invert-quote-borders:var(--border);--tw-prose-invert-captions:var(--muted-foreground);--tw-prose-invert-kbd:#fff;--tw-prose-invert-kbd-shadows:255 255 255;--tw-prose-invert-code:var(--foreground);--tw-prose-invert-pre-code:var(--muted-foreground);--tw-prose-invert-pre-bg:var(--muted);--tw-prose-invert-th-borders:var(--border);--tw-prose-invert-td-borders:var(--border);font-size:1rem;line-height:1.75}.tw\\:prose :where(picture>img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose :where(li):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.5em;margin-bottom:.5em}.tw\\:prose :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:.375em}.tw\\:prose :where(.tw\\:prose>ul>li p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.75em;margin-bottom:.75em}.tw\\:prose :where(.tw\\:prose>ul>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em}.tw\\:prose :where(.tw\\:prose>ul>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.25em}.tw\\:prose :where(.tw\\:prose>ol>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em}.tw\\:prose :where(.tw\\:prose>ol>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.25em}.tw\\:prose :where(ul ul,ul ol,ol ul,ol ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.75em;margin-bottom:.75em}.tw\\:prose :where(dl):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em}.tw\\:prose :where(dd):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.5em;padding-inline-start:1.625em}.tw\\:prose :where(hr+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h2+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h3+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h4+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose :where(thead th:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose :where(thead th:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose :where(tbody td,tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.571429em;padding-inline-end:.571429em;padding-bottom:.571429em;padding-inline-start:.571429em}.tw\\:prose :where(tbody td:first-child,tfoot td:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose :where(tbody td:last-child,tfoot td:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose :where(figure):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.tw\\:prose :where(.tw\\:prose>:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose :where(.tw\\:prose>:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:0}.tw\\:prose-sm{font-size:.875rem;line-height:1.71429}.tw\\:prose-sm :where(p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em;margin-bottom:1.14286em}.tw\\:prose-sm :where([class~=lead]):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.888889em;margin-bottom:.888889em;font-size:1.28571em;line-height:1.55556}.tw\\:prose-sm :where(blockquote):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.33333em;margin-bottom:1.33333em;padding-inline-start:1.11111em}.tw\\:prose-sm :where(h1):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:.8em;font-size:2.14286em;line-height:1.2}.tw\\:prose-sm :where(h2):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.6em;margin-bottom:.8em;font-size:1.42857em;line-height:1.4}.tw\\:prose-sm :where(h3):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.55556em;margin-bottom:.444444em;font-size:1.28571em;line-height:1.55556}.tw\\:prose-sm :where(h4):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.42857em;margin-bottom:.571429em;line-height:1.42857}.tw\\:prose-sm :where(img):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(picture):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.71429em;margin-bottom:1.71429em}.tw\\:prose-sm :where(picture>img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose-sm :where(video):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.71429em;margin-bottom:1.71429em}.tw\\:prose-sm :where(kbd):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.142857em;padding-inline-end:.357143em;padding-bottom:.142857em;border-radius:.3125rem;padding-inline-start:.357143em;font-size:.857143em}.tw\\:prose-sm :where(code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.857143em}.tw\\:prose-sm :where(h2 code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.9em}.tw\\:prose-sm :where(h3 code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.888889em}.tw\\:prose-sm :where(pre):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.666667em;padding-inline-end:1em;padding-bottom:.666667em;border-radius:.25rem;margin-top:1.66667em;margin-bottom:1.66667em;padding-inline-start:1em;font-size:.857143em;line-height:1.66667}.tw\\:prose-sm :where(ol):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(ul):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em;margin-bottom:1.14286em;padding-inline-start:1.57143em}.tw\\:prose-sm :where(li):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.285714em;margin-bottom:.285714em}.tw\\:prose-sm :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:.428571em}.tw\\:prose-sm :where(.tw\\:prose-sm>ul>li p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.571429em;margin-bottom:.571429em}.tw\\:prose-sm :where(.tw\\:prose-sm>ul>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em}.tw\\:prose-sm :where(.tw\\:prose-sm>ul>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.14286em}.tw\\:prose-sm :where(.tw\\:prose-sm>ol>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em}.tw\\:prose-sm :where(.tw\\:prose-sm>ol>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.14286em}.tw\\:prose-sm :where(ul ul,ul ol,ol ul,ol ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.571429em;margin-bottom:.571429em}.tw\\:prose-sm :where(dl):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em;margin-bottom:1.14286em}.tw\\:prose-sm :where(dt):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em}.tw\\:prose-sm :where(dd):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.285714em;padding-inline-start:1.57143em}.tw\\:prose-sm :where(hr):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2.85714em;margin-bottom:2.85714em}.tw\\:prose-sm :where(hr+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(h2+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(h3+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(h4+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose-sm :where(table):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.857143em;line-height:1.5}.tw\\:prose-sm :where(thead th):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:1em;padding-bottom:.666667em;padding-inline-start:1em}.tw\\:prose-sm :where(thead th:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose-sm :where(thead th:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose-sm :where(tbody td,tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.666667em;padding-inline-end:1em;padding-bottom:.666667em;padding-inline-start:1em}.tw\\:prose-sm :where(tbody td:first-child,tfoot td:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose-sm :where(tbody td:last-child,tfoot td:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose-sm :where(figure):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.71429em;margin-bottom:1.71429em}.tw\\:prose-sm :where(figure>*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose-sm :where(figcaption):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.666667em;font-size:.857143em;line-height:1.33333}.tw\\:prose-sm :where(.tw\\:prose-sm>:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose-sm :where(.tw\\:prose-sm>:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:0}.tw\\:-mt-4{margin-top:calc(calc(var(--spacing)) * -4)}.tw\\:mt-1{margin-top:calc(calc(var(--spacing)) * 1)}.tw\\:mt-2{margin-top:calc(calc(var(--spacing)) * 2)}.tw\\:mt-3{margin-top:calc(calc(var(--spacing)) * 3)}.tw\\:mt-4{margin-top:calc(calc(var(--spacing)) * 4)}.tw\\:mt-6{margin-top:calc(calc(var(--spacing)) * 6)}.tw\\:mt-auto{margin-top:auto}.tw\\:mr-1{margin-right:calc(calc(var(--spacing)) * 1)}.tw\\:mr-2{margin-right:calc(calc(var(--spacing)) * 2)}.tw\\:mr-3{margin-right:calc(calc(var(--spacing)) * 3)}.tw\\:-mb-4{margin-bottom:calc(calc(var(--spacing)) * -4)}.tw\\:mb-1{margin-bottom:calc(calc(var(--spacing)) * 1)}.tw\\:mb-2{margin-bottom:calc(calc(var(--spacing)) * 2)}.tw\\:mb-3{margin-bottom:calc(calc(var(--spacing)) * 3)}.tw\\:mb-4{margin-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:ml-1{margin-left:calc(calc(var(--spacing)) * 1)}.tw\\:ml-2{margin-left:calc(calc(var(--spacing)) * 2)}.tw\\:ml-4{margin-left:calc(calc(var(--spacing)) * 4)}.tw\\:ml-auto{margin-left:auto}.tw\\:box-border{box-sizing:border-box}.tw\\:line-clamp-3{-webkit-line-clamp:3;-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden}.tw\\:no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}.tw\\:no-scrollbar::-webkit-scrollbar{display:none}.tw\\:block{display:block}.tw\\:flex{display:flex}.tw\\:grid{display:grid}.tw\\:hidden{display:none}.tw\\:inline-block{display:inline-block}.tw\\:inline-flex{display:inline-flex}.tw\\:inline-grid{display:inline-grid}.tw\\:field-sizing-content{field-sizing:content}.tw\\:aspect-square{aspect-ratio:1}.tw\\:size-2{width:calc(calc(var(--spacing)) * 2);height:calc(calc(var(--spacing)) * 2)}.tw\\:size-2\\.5{width:calc(calc(var(--spacing)) * 2.5);height:calc(calc(var(--spacing)) * 2.5)}.tw\\:size-3{width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:size-3\\.5{width:calc(calc(var(--spacing)) * 3.5);height:calc(calc(var(--spacing)) * 3.5)}.tw\\:size-4{width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:size-6{width:calc(calc(var(--spacing)) * 6);height:calc(calc(var(--spacing)) * 6)}.tw\\:size-7{width:calc(calc(var(--spacing)) * 7);height:calc(calc(var(--spacing)) * 7)}.tw\\:size-8{width:calc(calc(var(--spacing)) * 8);height:calc(calc(var(--spacing)) * 8)}.tw\\:size-9{width:calc(calc(var(--spacing)) * 9);height:calc(calc(var(--spacing)) * 9)}.tw\\:size-full{width:100%;height:100%}.tw\\:h-1{height:calc(calc(var(--spacing)) * 1)}.tw\\:h-2{height:calc(calc(var(--spacing)) * 2)}.tw\\:h-3{height:calc(calc(var(--spacing)) * 3)}.tw\\:h-3\\.5{height:calc(calc(var(--spacing)) * 3.5)}.tw\\:h-4{height:calc(calc(var(--spacing)) * 4)}.tw\\:h-5{height:calc(calc(var(--spacing)) * 5)}.tw\\:h-6{height:calc(calc(var(--spacing)) * 6)}.tw\\:h-7{height:calc(calc(var(--spacing)) * 7)}.tw\\:h-8{height:calc(calc(var(--spacing)) * 8)}.tw\\:h-8\\!{height:calc(calc(var(--spacing)) * 8)!important}.tw\\:h-9{height:calc(calc(var(--spacing)) * 9)}.tw\\:h-10{height:calc(calc(var(--spacing)) * 10)}.tw\\:h-12{height:calc(calc(var(--spacing)) * 12)}.tw\\:h-14{height:calc(calc(var(--spacing)) * 14)}.tw\\:h-20{height:calc(calc(var(--spacing)) * 20)}.tw\\:h-24{height:calc(calc(var(--spacing)) * 24)}.tw\\:h-32{height:calc(calc(var(--spacing)) * 32)}.tw\\:h-40{height:calc(calc(var(--spacing)) * 40)}.tw\\:h-64{height:calc(calc(var(--spacing)) * 64)}.tw\\:h-80{height:calc(calc(var(--spacing)) * 80)}.tw\\:h-96{height:calc(calc(var(--spacing)) * 96)}.tw\\:h-\\[5px\\]{height:5px}.tw\\:h-\\[260px\\]{height:260px}.tw\\:h-\\[300px\\]{height:300px}.tw\\:h-\\[400px\\]{height:400px}.tw\\:h-\\[600px\\]{height:600px}.tw\\:h-\\[calc\\(100\\%-1px\\)\\]{height:calc(100% - 1px)}.tw\\:h-\\[calc\\(100\\%-2px\\)\\]{height:calc(100% - 2px)}.tw\\:h-auto{height:auto}.tw\\:h-full{height:100%}.tw\\:h-px{height:1px}.tw\\:h-svh{height:100svh}.tw\\:max-h-\\(--radix-context-menu-content-available-height\\){max-height:var(--radix-context-menu-content-available-height)}.tw\\:max-h-\\(--radix-dropdown-menu-content-available-height\\){max-height:var(--radix-dropdown-menu-content-available-height)}.tw\\:max-h-\\(--radix-select-content-available-height\\){max-height:var(--radix-select-content-available-height)}.tw\\:max-h-5{max-height:calc(calc(var(--spacing)) * 5)}.tw\\:max-h-10{max-height:calc(calc(var(--spacing)) * 10)}.tw\\:max-h-72{max-height:calc(calc(var(--spacing)) * 72)}.tw\\:max-h-80{max-height:calc(calc(var(--spacing)) * 80)}.tw\\:max-h-\\[96\\%\\]{max-height:96%}.tw\\:max-h-\\[300px\\]{max-height:300px}.tw\\:min-h-0{min-height:calc(calc(var(--spacing)) * 0)}.tw\\:min-h-11{min-height:calc(calc(var(--spacing)) * 11)}.tw\\:min-h-16{min-height:calc(calc(var(--spacing)) * 16)}.tw\\:min-h-\\[200px\\]{min-height:200px}.tw\\:min-h-full{min-height:100%}.tw\\:min-h-svh{min-height:100svh}.tw\\:w-\\(--radix-dropdown-menu-trigger-width\\){width:var(--radix-dropdown-menu-trigger-width)}.tw\\:w-\\(--sidebar-width\\){width:var(--sidebar-width)}.tw\\:w-1{width:calc(calc(var(--spacing)) * 1)}.tw\\:w-1\\/2{width:50%}.tw\\:w-2{width:calc(calc(var(--spacing)) * 2)}.tw\\:w-3{width:calc(calc(var(--spacing)) * 3)}.tw\\:w-3\\.5{width:calc(calc(var(--spacing)) * 3.5)}.tw\\:w-3\\/4{width:75%}.tw\\:w-4{width:calc(calc(var(--spacing)) * 4)}.tw\\:w-4\\/5{width:80%}.tw\\:w-4\\/6{width:66.6667%}.tw\\:w-5{width:calc(calc(var(--spacing)) * 5)}.tw\\:w-5\\/6{width:83.3333%}.tw\\:w-6{width:calc(calc(var(--spacing)) * 6)}.tw\\:w-8{width:calc(calc(var(--spacing)) * 8)}.tw\\:w-9{width:calc(calc(var(--spacing)) * 9)}.tw\\:w-9\\/12{width:75%}.tw\\:w-10{width:calc(calc(var(--spacing)) * 10)}.tw\\:w-12{width:calc(calc(var(--spacing)) * 12)}.tw\\:w-14{width:calc(calc(var(--spacing)) * 14)}.tw\\:w-20{width:calc(calc(var(--spacing)) * 20)}.tw\\:w-24{width:calc(calc(var(--spacing)) * 24)}.tw\\:w-32{width:calc(calc(var(--spacing)) * 32)}.tw\\:w-48{width:calc(calc(var(--spacing)) * 48)}.tw\\:w-56{width:calc(calc(var(--spacing)) * 56)}.tw\\:w-60{width:calc(calc(var(--spacing)) * 60)}.tw\\:w-64{width:calc(calc(var(--spacing)) * 64)}.tw\\:w-72{width:calc(calc(var(--spacing)) * 72)}.tw\\:w-80{width:calc(calc(var(--spacing)) * 80)}.tw\\:w-96{width:calc(calc(var(--spacing)) * 96)}.tw\\:w-\\[1px\\]{width:1px}.tw\\:w-\\[5px\\]{width:5px}.tw\\:w-\\[70px\\]{width:70px}.tw\\:w-\\[100px\\]{width:100px}.tw\\:w-\\[116px\\]{width:116px}.tw\\:w-\\[124px\\]{width:124px}.tw\\:w-\\[150px\\]{width:150px}.tw\\:w-\\[180px\\]{width:180px}.tw\\:w-\\[200px\\]{width:200px}.tw\\:w-\\[250px\\]{width:250px}.tw\\:w-\\[260px\\]{width:260px}.tw\\:w-\\[280px\\]{width:280px}.tw\\:w-\\[300px\\]{width:300px}.tw\\:w-\\[320px\\]{width:320px}.tw\\:w-\\[350px\\]{width:350px}.tw\\:w-\\[400px\\]{width:400px}.tw\\:w-\\[420px\\]{width:420px}.tw\\:w-\\[500px\\]{width:500px}.tw\\:w-\\[560px\\]{width:560px}.tw\\:w-\\[600px\\]{width:600px}.tw\\:w-\\[calc\\(100\\%-2px\\)\\]{width:calc(100% - 2px)}.tw\\:w-\\[var\\(--radix-dropdown-menu-trigger-width\\)\\]{width:var(--radix-dropdown-menu-trigger-width)}.tw\\:w-auto{width:auto}.tw\\:w-fit{width:fit-content}.tw\\:w-full{width:100%}.tw\\:w-max{width:max-content}.tw\\:w-px{width:1px}.tw\\:max-w-\\(--skeleton-width\\){max-width:var(--skeleton-width)}.tw\\:max-w-2xl{max-width:var(--tw-container-2xl)}.tw\\:max-w-3xl{max-width:var(--tw-container-3xl)}.tw\\:max-w-4xl{max-width:var(--tw-container-4xl)}.tw\\:max-w-5{max-width:calc(calc(var(--spacing)) * 5)}.tw\\:max-w-6xl{max-width:var(--tw-container-6xl)}.tw\\:max-w-40{max-width:calc(calc(var(--spacing)) * 40)}.tw\\:max-w-48{max-width:calc(calc(var(--spacing)) * 48)}.tw\\:max-w-64{max-width:calc(calc(var(--spacing)) * 64)}.tw\\:max-w-96{max-width:calc(calc(var(--spacing)) * 96)}.tw\\:max-w-\\[200px\\]{max-width:200px}.tw\\:max-w-\\[220px\\]{max-width:220px}.tw\\:max-w-\\[calc\\(100\\%-2rem\\)\\]{max-width:calc(100% - 2rem)}.tw\\:max-w-\\[calc\\(100vw-2rem\\)\\]{max-width:calc(100vw - 2rem)}.tw\\:max-w-fit{max-width:fit-content}.tw\\:max-w-full{max-width:100%}.tw\\:max-w-lg{max-width:var(--tw-container-lg)}.tw\\:max-w-md{max-width:var(--tw-container-md)}.tw\\:max-w-none{max-width:none}.tw\\:max-w-sm{max-width:var(--tw-container-sm)}.tw\\:max-w-xs{max-width:var(--tw-container-xs)}.tw\\:min-w-0{min-width:calc(calc(var(--spacing)) * 0)}.tw\\:min-w-5{min-width:calc(calc(var(--spacing)) * 5)}.tw\\:min-w-7{min-width:calc(calc(var(--spacing)) * 7)}.tw\\:min-w-8{min-width:calc(calc(var(--spacing)) * 8)}.tw\\:min-w-9{min-width:calc(calc(var(--spacing)) * 9)}.tw\\:min-w-16{min-width:calc(calc(var(--spacing)) * 16)}.tw\\:min-w-32{min-width:calc(calc(var(--spacing)) * 32)}.tw\\:min-w-36{min-width:calc(calc(var(--spacing)) * 36)}.tw\\:min-w-80{min-width:calc(calc(var(--spacing)) * 80)}.tw\\:min-w-\\[12rem\\]{min-width:12rem}.tw\\:min-w-\\[26px\\]{min-width:26px}.tw\\:min-w-\\[96px\\]{min-width:96px}.tw\\:min-w-\\[140px\\]{min-width:140px}.tw\\:min-w-\\[215px\\]{min-width:215px}.tw\\:min-w-\\[500px\\]{min-width:500px}.tw\\:min-w-min{min-width:min-content}.tw\\:flex-1{flex:1}.tw\\:shrink{flex-shrink:1}.tw\\:shrink-0{flex-shrink:0}.tw\\:flex-grow,.tw\\:grow,.tw\\:grow-\\[1\\]{flex-grow:1}.tw\\:grow-\\[10\\]{flex-grow:10}.tw\\:basis-0{flex-basis:calc(calc(var(--spacing)) * 0)}.tw\\:caption-bottom{caption-side:bottom}.tw\\:border-collapse{border-collapse:collapse}.tw\\:origin-\\(--radix-context-menu-content-transform-origin\\){transform-origin:var(--radix-context-menu-content-transform-origin)}.tw\\:origin-\\(--radix-dropdown-menu-content-transform-origin\\){transform-origin:var(--radix-dropdown-menu-content-transform-origin)}.tw\\:origin-\\(--radix-menubar-content-transform-origin\\){transform-origin:var(--radix-menubar-content-transform-origin)}.tw\\:origin-\\(--radix-popover-content-transform-origin\\){transform-origin:var(--radix-popover-content-transform-origin)}.tw\\:origin-\\(--radix-select-content-transform-origin\\){transform-origin:var(--radix-select-content-transform-origin)}.tw\\:origin-\\(--radix-tooltip-content-transform-origin\\){transform-origin:var(--radix-tooltip-content-transform-origin)}.tw\\:-translate-x-1\\/2{--tw-translate-x:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:-translate-x-px{--tw-translate-x:-1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:translate-x-px{--tw-translate-x:1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:-translate-y-1\\/2{--tw-translate-y:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:translate-y-0{--tw-translate-y:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:translate-y-\\[calc\\(-50\\%_-_2px\\)\\]{--tw-translate-y:calc(-50% - 2px);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rotate-45{rotate:45deg}.tw\\:rotate-180{rotate:180deg}.tw\\:transform{transform:var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,)}.tw\\:animate-none\\!{animation:none!important}.tw\\:animate-pulse{animation:var(--tw-animate-pulse)}.tw\\:animate-spin{animation:var(--tw-animate-spin)}.tw\\:cursor-default{cursor:default}.tw\\:cursor-ew-resize{cursor:ew-resize}.tw\\:cursor-not-allowed{cursor:not-allowed}.tw\\:cursor-pointer{cursor:pointer}.tw\\:cursor-text{cursor:text}.tw\\:touch-none{touch-action:none}.tw\\:resize{resize:both}.tw\\:resize-none{resize:none}.tw\\:scroll-m-20{scroll-margin:calc(calc(var(--spacing)) * 20)}.tw\\:scroll-my-1{scroll-margin-block:calc(calc(var(--spacing)) * 1)}.tw\\:scroll-py-1{scroll-padding-block:calc(calc(var(--spacing)) * 1)}.tw\\:list-inside{list-style-position:inside}.tw\\:list-outside{list-style-position:outside}.tw\\:\\!list-\\[lower-alpha\\]{list-style-type:lower-alpha!important}.tw\\:\\!list-\\[lower-roman\\]{list-style-type:lower-roman!important}.tw\\:\\!list-\\[upper-alpha\\]{list-style-type:upper-alpha!important}.tw\\:\\!list-\\[upper-roman\\]{list-style-type:upper-roman!important}.tw\\:\\!list-decimal{list-style-type:decimal!important}.tw\\:\\!list-disc{list-style-type:disc!important}.tw\\:list-decimal{list-style-type:decimal}.tw\\:list-disc{list-style-type:disc}.tw\\:list-none{list-style-type:none}.tw\\:grid-flow-col{grid-auto-flow:column}.tw\\:grid-flow-row{grid-auto-flow:row}.tw\\:auto-rows-min{grid-auto-rows:min-content}.tw\\:grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}.tw\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.tw\\:grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.tw\\:grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}.tw\\:grid-cols-6{grid-template-columns:repeat(6,minmax(0,1fr))}.tw\\:grid-cols-\\[25\\%_25\\%_50\\%\\]{grid-template-columns:25% 25% 50%}.tw\\:grid-cols-\\[25\\%_50\\%_25\\%\\]{grid-template-columns:25% 50% 25%}.tw\\:grid-cols-\\[auto_auto_auto_auto\\]{grid-template-columns:auto auto auto auto}.tw\\:grid-cols-\\[min-content_1fr\\]{grid-template-columns:min-content 1fr}.tw\\:grid-cols-\\[min-content_min-content_1fr\\]{grid-template-columns:min-content min-content 1fr}.tw\\:grid-cols-subgrid{grid-template-columns:subgrid}.tw\\:flex-col{flex-direction:column}.tw\\:flex-col-reverse{flex-direction:column-reverse}.tw\\:flex-row{flex-direction:row}.tw\\:flex-row-reverse{flex-direction:row-reverse}.tw\\:flex-wrap{flex-wrap:wrap}.tw\\:place-content-center{place-content:center}.tw\\:content-center{align-content:center}.tw\\:items-baseline{align-items:baseline}.tw\\:items-center{align-items:center}.tw\\:items-end{align-items:flex-end}.tw\\:items-start{align-items:flex-start}.tw\\:items-stretch{align-items:stretch}.tw\\:justify-between{justify-content:space-between}.tw\\:justify-center{justify-content:center}.tw\\:justify-end{justify-content:flex-end}.tw\\:justify-start{justify-content:flex-start}.tw\\:gap-0{gap:calc(calc(var(--spacing)) * 0)}.tw\\:gap-0\\.5{gap:calc(calc(var(--spacing)) * .5)}.tw\\:gap-1{gap:calc(calc(var(--spacing)) * 1)}.tw\\:gap-1\\.5{gap:calc(calc(var(--spacing)) * 1.5)}.tw\\:gap-1\\.5\\!{gap:calc(calc(var(--spacing)) * 1.5)!important}.tw\\:gap-2{gap:calc(calc(var(--spacing)) * 2)}.tw\\:gap-2\\.5{gap:calc(calc(var(--spacing)) * 2.5)}.tw\\:gap-3{gap:calc(calc(var(--spacing)) * 3)}.tw\\:gap-4{gap:calc(calc(var(--spacing)) * 4)}.tw\\:gap-5{gap:calc(calc(var(--spacing)) * 5)}.tw\\:gap-6{gap:calc(calc(var(--spacing)) * 6)}.tw\\:gap-16{gap:calc(calc(var(--spacing)) * 16)}.tw\\:gap-\\[--spacing\\(var\\(--gap\\)\\)\\]{gap:calc(calc(var(--spacing)) * var(--gap))}.tw\\:gap-\\[12px\\]{gap:12px}:where(.tw\\:space-y-1>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 1) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 1) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-1\\.5>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 1.5) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 1.5) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-2>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 2) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 2) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-3>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 3) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 3) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-4>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 4) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 4) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-6>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 6) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 6) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-8>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 8) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 8) * calc(1 - var(--tw-space-y-reverse)))}.tw\\:gap-x-1{column-gap:calc(calc(var(--spacing)) * 1)}.tw\\:gap-x-2{column-gap:calc(calc(var(--spacing)) * 2)}.tw\\:gap-x-3{column-gap:calc(calc(var(--spacing)) * 3)}.tw\\:gap-x-4{column-gap:calc(calc(var(--spacing)) * 4)}:where(.tw\\:-space-x-2>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * -2) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * -2) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-2>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 2) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 2) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-3>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 3) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 3) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-4>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 4) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 4) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-6>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 6) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 6) * calc(1 - var(--tw-space-x-reverse)))}.tw\\:gap-y-1{row-gap:calc(calc(var(--spacing)) * 1)}.tw\\:gap-y-2{row-gap:calc(calc(var(--spacing)) * 2)}:where(.tw\\:divide-x>:not(:last-child)){--tw-divide-x-reverse:0;border-inline-style:var(--tw-border-style);border-inline-start-width:calc(1px * var(--tw-divide-x-reverse));border-inline-end-width:calc(1px * calc(1 - var(--tw-divide-x-reverse)))}:where(.tw\\:divide-y>:not(:last-child)){--tw-divide-y-reverse:0;border-bottom-style:var(--tw-border-style);border-top-style:var(--tw-border-style);border-top-width:calc(1px * var(--tw-divide-y-reverse));border-bottom-width:calc(1px * calc(1 - var(--tw-divide-y-reverse)))}.tw\\:self-start{align-self:flex-start}.tw\\:self-stretch{align-self:stretch}.tw\\:justify-self-end{justify-self:flex-end}.tw\\:truncate{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.tw\\:overflow-auto{overflow:auto}.tw\\:overflow-clip{overflow:clip}.tw\\:overflow-hidden{overflow:hidden}.tw\\:overflow-scroll{overflow:scroll}.tw\\:overflow-visible{overflow:visible}.tw\\:overflow-x-auto{overflow-x:auto}.tw\\:overflow-x-hidden{overflow-x:hidden}.tw\\:overflow-y-auto{overflow-y:auto}.tw\\:overflow-y-hidden{overflow-y:hidden}.tw\\:rounded{border-radius:.25rem}.tw\\:rounded-2xl{border-radius:calc(var(--radius) * 1.8)}.tw\\:rounded-4xl{border-radius:calc(var(--radius) * 2.6)}.tw\\:rounded-\\[2px\\]{border-radius:2px}.tw\\:rounded-\\[4px\\]{border-radius:4px}.tw\\:rounded-\\[6px\\]{border-radius:6px}.tw\\:rounded-\\[calc\\(var\\(--radius\\)-3px\\)\\]{border-radius:calc(var(--radius) - 3px)}.tw\\:rounded-\\[min\\(var\\(--tw-radius-md\\)\\,10px\\)\\]{border-radius:min(var(--tw-radius-md), 10px)}.tw\\:rounded-\\[min\\(var\\(--tw-radius-md\\)\\,12px\\)\\]{border-radius:min(var(--tw-radius-md), 12px)}.tw\\:rounded-full{border-radius:3.40282e38px}.tw\\:rounded-lg{border-radius:var(--radius)}.tw\\:rounded-lg\\!{border-radius:var(--radius)!important}.tw\\:rounded-md{border-radius:calc(var(--radius) * .8)}.tw\\:rounded-none{border-radius:0}.tw\\:rounded-sm{border-radius:calc(var(--radius) * .6)}.tw\\:rounded-xl{border-radius:calc(var(--radius) * 1.4)}.tw\\:rounded-xl\\!{border-radius:calc(var(--radius) * 1.4)!important}.tw\\:rounded-s-none{border-start-start-radius:0;border-end-start-radius:0}.tw\\:rounded-e-none{border-start-end-radius:0;border-end-end-radius:0}.tw\\:rounded-t-xl{border-top-left-radius:calc(var(--radius) * 1.4);border-top-right-radius:calc(var(--radius) * 1.4)}.tw\\:rounded-l-lg{border-top-left-radius:var(--radius);border-bottom-left-radius:var(--radius)}.tw\\:rounded-r-xl{border-top-right-radius:calc(var(--radius) * 1.4);border-bottom-right-radius:calc(var(--radius) * 1.4)}.tw\\:rounded-b-xl{border-bottom-right-radius:calc(var(--radius) * 1.4);border-bottom-left-radius:calc(var(--radius) * 1.4)}.tw\\:border{border-style:var(--tw-border-style);border-width:1px}.tw\\:border-0{border-style:var(--tw-border-style);border-width:0}.tw\\:border-2{border-style:var(--tw-border-style);border-width:2px}.tw\\:border-s{border-inline-start-style:var(--tw-border-style);border-inline-start-width:1px}.tw\\:border-s-0{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:border-s-2{border-inline-start-style:var(--tw-border-style);border-inline-start-width:2px}.tw\\:border-e{border-inline-end-style:var(--tw-border-style);border-inline-end-width:1px}.tw\\:border-e-0{border-inline-end-style:var(--tw-border-style);border-inline-end-width:0}.tw\\:border-t{border-top-style:var(--tw-border-style);border-top-width:1px}.tw\\:border-t-0{border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:border-b{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}.tw\\:border-b-0{border-bottom-style:var(--tw-border-style);border-bottom-width:0}.tw\\:border-l-2{border-left-style:var(--tw-border-style);border-left-width:2px}.tw\\:border-l-4{border-left-style:var(--tw-border-style);border-left-width:4px}.tw\\:border-dashed{--tw-border-style:dashed;border-style:dashed}.tw\\:border-none{--tw-border-style:none;border-style:none}.tw\\:border-solid{--tw-border-style:solid;border-style:solid}.tw\\:border-black{border-color:var(--tw-color-black)}.tw\\:border-blue-400{border-color:var(--tw-color-blue-400)}.tw\\:border-blue-500{border-color:var(--tw-color-blue-500)}.tw\\:border-border,.tw\\:border-border\\/50{border-color:var(--border)}@supports (color:color-mix(in lab, red, red)){.tw\\:border-border\\/50{border-color:color-mix(in oklab, var(--border) 50%, transparent)}}.tw\\:border-gray-300{border-color:var(--tw-color-gray-300)}.tw\\:border-input,.tw\\:border-input\\/30{border-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:border-input\\/30{border-color:color-mix(in oklab, var(--input) 30%, transparent)}}.tw\\:border-muted-foreground{border-color:var(--muted-foreground)}.tw\\:border-primary{border-color:var(--primary)}.tw\\:border-red-300{border-color:var(--tw-color-red-300)}.tw\\:border-red-400{border-color:var(--tw-color-red-400)}.tw\\:border-red-500{border-color:var(--tw-color-red-500)}.tw\\:border-red-600{border-color:var(--tw-color-red-600)}.tw\\:border-ring{border-color:var(--ring)}.tw\\:border-sidebar-border{border-color:var(--sidebar-border)}.tw\\:border-slate-300{border-color:var(--tw-color-slate-300)}.tw\\:border-transparent{border-color:#0000}.tw\\:border-yellow-400{border-color:var(--tw-color-yellow-400)}.tw\\:border-yellow-500{border-color:var(--tw-color-yellow-500)}.tw\\:border-s-amber-200{border-inline-start-color:var(--tw-color-amber-200)}.tw\\:border-s-indigo-200{border-inline-start-color:var(--tw-color-indigo-200)}.tw\\:border-s-purple-200{border-inline-start-color:var(--tw-color-purple-200)}.tw\\:border-s-red-200{border-inline-start-color:var(--tw-color-red-200)}.tw\\:\\!bg-destructive\\/50{background-color:var(--destructive)!important}@supports (color:color-mix(in lab, red, red)){.tw\\:\\!bg-destructive\\/50{background-color:color-mix(in oklab, var(--destructive) 50%, transparent)!important}}.tw\\:bg-accent,.tw\\:bg-accent\\/50{background-color:var(--accent)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-accent\\/50{background-color:color-mix(in oklab, var(--accent) 50%, transparent)}}.tw\\:bg-amber-500,.tw\\:bg-amber-500\\/5{background-color:var(--tw-color-amber-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-amber-500\\/5{background-color:color-mix(in oklab, var(--tw-color-amber-500) 5%, transparent)}}.tw\\:bg-amber-500\\/15{background-color:var(--tw-color-amber-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-amber-500\\/15{background-color:color-mix(in oklab, var(--tw-color-amber-500) 15%, transparent)}}.tw\\:bg-background,.tw\\:bg-background\\/50{background-color:var(--background)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-background\\/50{background-color:color-mix(in oklab, var(--background) 50%, transparent)}}.tw\\:bg-black\\/10{background-color:var(--tw-color-black)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-black\\/10{background-color:color-mix(in oklab, var(--tw-color-black) 10%, transparent)}}.tw\\:bg-blue-50{background-color:var(--tw-color-blue-50)}.tw\\:bg-blue-100{background-color:var(--tw-color-blue-100)}.tw\\:bg-blue-400{background-color:var(--tw-color-blue-400)}.tw\\:bg-blue-500{background-color:var(--tw-color-blue-500)}.tw\\:bg-border{background-color:var(--border)}.tw\\:bg-card{background-color:var(--card)}.tw\\:bg-destructive\\/10{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-destructive\\/10{background-color:color-mix(in oklab, var(--destructive) 10%, transparent)}}.tw\\:bg-foreground{background-color:var(--foreground)}.tw\\:bg-gray-50{background-color:var(--tw-color-gray-50)}.tw\\:bg-gray-100{background-color:var(--tw-color-gray-100)}.tw\\:bg-gray-500{background-color:var(--tw-color-gray-500)}.tw\\:bg-green-50{background-color:var(--tw-color-green-50)}.tw\\:bg-green-100{background-color:var(--tw-color-green-100)}.tw\\:bg-green-500{background-color:var(--tw-color-green-500)}.tw\\:bg-input,.tw\\:bg-input\\/30{background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-input\\/30{background-color:color-mix(in oklab, var(--input) 30%, transparent)}}.tw\\:bg-muted,.tw\\:bg-muted\\/50{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-muted\\/50{background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:bg-neutral-300{background-color:var(--tw-color-neutral-300)}.tw\\:bg-orange-100{background-color:var(--tw-color-orange-100)}.tw\\:bg-popover,.tw\\:bg-popover\\/70{background-color:var(--popover)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-popover\\/70{background-color:color-mix(in oklab, var(--popover) 70%, transparent)}}.tw\\:bg-primary{background-color:var(--primary)}.tw\\:bg-primary-foreground{background-color:var(--primary-foreground)}.tw\\:bg-purple-50{background-color:var(--tw-color-purple-50)}.tw\\:bg-red-100{background-color:var(--tw-color-red-100)}.tw\\:bg-red-500{background-color:var(--tw-color-red-500)}.tw\\:bg-rose-500,.tw\\:bg-rose-500\\/5{background-color:var(--tw-color-rose-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-rose-500\\/5{background-color:color-mix(in oklab, var(--tw-color-rose-500) 5%, transparent)}}.tw\\:bg-rose-500\\/15{background-color:var(--tw-color-rose-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-rose-500\\/15{background-color:color-mix(in oklab, var(--tw-color-rose-500) 15%, transparent)}}.tw\\:bg-secondary{background-color:var(--secondary)}.tw\\:bg-sidebar{background-color:var(--sidebar)}.tw\\:bg-sidebar-accent{background-color:var(--sidebar-accent)}.tw\\:bg-sidebar-border{background-color:var(--sidebar-border)}.tw\\:bg-sky-500,.tw\\:bg-sky-500\\/5{background-color:var(--tw-color-sky-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-sky-500\\/5{background-color:color-mix(in oklab, var(--tw-color-sky-500) 5%, transparent)}}.tw\\:bg-sky-500\\/15{background-color:var(--tw-color-sky-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-sky-500\\/15{background-color:color-mix(in oklab, var(--tw-color-sky-500) 15%, transparent)}}.tw\\:bg-teal-500,.tw\\:bg-teal-500\\/5{background-color:var(--tw-color-teal-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-teal-500\\/5{background-color:color-mix(in oklab, var(--tw-color-teal-500) 5%, transparent)}}.tw\\:bg-teal-500\\/15{background-color:var(--tw-color-teal-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-teal-500\\/15{background-color:color-mix(in oklab, var(--tw-color-teal-500) 15%, transparent)}}.tw\\:bg-transparent{background-color:#0000}.tw\\:bg-white{background-color:var(--tw-color-white)}.tw\\:bg-yellow-50{background-color:var(--tw-color-yellow-50)}.tw\\:bg-yellow-100{background-color:var(--tw-color-yellow-100)}.tw\\:bg-yellow-500{background-color:var(--tw-color-yellow-500)}.tw\\:bg-zinc-400{background-color:var(--tw-color-zinc-400)}.tw\\:bg-clip-padding{background-clip:padding-box}.tw\\:fill-destructive{fill:var(--destructive)}.tw\\:fill-foreground{fill:var(--foreground)}.tw\\:fill-yellow-400,.tw\\:fill-yellow-400\\/50{fill:var(--tw-color-yellow-400)}@supports (color:color-mix(in lab, red, red)){.tw\\:fill-yellow-400\\/50{fill:color-mix(in oklab, var(--tw-color-yellow-400) 50%, transparent)}}.tw\\:object-cover{object-fit:cover}.tw\\:\\!p-4{padding:calc(calc(var(--spacing)) * 4)!important}.tw\\:p-0{padding:calc(calc(var(--spacing)) * 0)}.tw\\:p-0\\.5{padding:calc(calc(var(--spacing)) * .5)}.tw\\:p-1{padding:calc(calc(var(--spacing)) * 1)}.tw\\:p-2{padding:calc(calc(var(--spacing)) * 2)}.tw\\:p-2\\.5{padding:calc(calc(var(--spacing)) * 2.5)}.tw\\:p-3{padding:calc(calc(var(--spacing)) * 3)}.tw\\:p-4{padding:calc(calc(var(--spacing)) * 4)}.tw\\:p-6{padding:calc(calc(var(--spacing)) * 6)}.tw\\:p-8{padding:calc(calc(var(--spacing)) * 8)}.tw\\:p-\\[1px\\]{padding:1px}.tw\\:p-\\[3px\\]{padding:3px}.tw\\:p-\\[10px\\]{padding:10px}.tw\\:p-\\[16px\\]{padding:16px}.tw\\:px-0{padding-inline:calc(calc(var(--spacing)) * 0)}.tw\\:px-0\\.5{padding-inline:calc(calc(var(--spacing)) * .5)}.tw\\:px-1{padding-inline:calc(calc(var(--spacing)) * 1)}.tw\\:px-1\\.5{padding-inline:calc(calc(var(--spacing)) * 1.5)}.tw\\:px-2{padding-inline:calc(calc(var(--spacing)) * 2)}.tw\\:px-2\\.5{padding-inline:calc(calc(var(--spacing)) * 2.5)}.tw\\:px-3{padding-inline:calc(calc(var(--spacing)) * 3)}.tw\\:px-4{padding-inline:calc(calc(var(--spacing)) * 4)}.tw\\:px-6{padding-inline:calc(calc(var(--spacing)) * 6)}.tw\\:py-0{padding-block:calc(calc(var(--spacing)) * 0)}.tw\\:py-0\\.5{padding-block:calc(calc(var(--spacing)) * .5)}.tw\\:py-1{padding-block:calc(calc(var(--spacing)) * 1)}.tw\\:py-1\\.5{padding-block:calc(calc(var(--spacing)) * 1.5)}.tw\\:py-2{padding-block:calc(calc(var(--spacing)) * 2)}.tw\\:py-3{padding-block:calc(calc(var(--spacing)) * 3)}.tw\\:py-4{padding-block:calc(calc(var(--spacing)) * 4)}.tw\\:py-6{padding-block:calc(calc(var(--spacing)) * 6)}.tw\\:py-8{padding-block:calc(calc(var(--spacing)) * 8)}.tw\\:py-\\[2px\\]{padding-block:2px}.tw\\:ps-1\\.5{padding-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:ps-2{padding-inline-start:calc(calc(var(--spacing)) * 2)}.tw\\:ps-2\\.5{padding-inline-start:calc(calc(var(--spacing)) * 2.5)}.tw\\:ps-4{padding-inline-start:calc(calc(var(--spacing)) * 4)}.tw\\:ps-7{padding-inline-start:calc(calc(var(--spacing)) * 7)}.tw\\:ps-8{padding-inline-start:calc(calc(var(--spacing)) * 8)}.tw\\:ps-9{padding-inline-start:calc(calc(var(--spacing)) * 9)}.tw\\:ps-12{padding-inline-start:calc(calc(var(--spacing)) * 12)}.tw\\:ps-\\[85px\\]{padding-inline-start:85px}.tw\\:pe-1{padding-inline-end:calc(calc(var(--spacing)) * 1)}.tw\\:pe-1\\.5{padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:pe-2{padding-inline-end:calc(calc(var(--spacing)) * 2)}.tw\\:pe-4{padding-inline-end:calc(calc(var(--spacing)) * 4)}.tw\\:pe-8{padding-inline-end:calc(calc(var(--spacing)) * 8)}.tw\\:pe-9{padding-inline-end:calc(calc(var(--spacing)) * 9)}.tw\\:pe-\\[calc\\(138px\\+1rem\\)\\]{padding-inline-end:calc(138px + 1rem)}.tw\\:pt-1{padding-top:calc(calc(var(--spacing)) * 1)}.tw\\:pt-2{padding-top:calc(calc(var(--spacing)) * 2)}.tw\\:pt-3{padding-top:calc(calc(var(--spacing)) * 3)}.tw\\:pt-4{padding-top:calc(calc(var(--spacing)) * 4)}.tw\\:pt-6{padding-top:calc(calc(var(--spacing)) * 6)}.tw\\:\\!pr-10{padding-right:calc(calc(var(--spacing)) * 10)!important}.tw\\:pr-0{padding-right:calc(calc(var(--spacing)) * 0)}.tw\\:pr-1{padding-right:calc(calc(var(--spacing)) * 1)}.tw\\:pr-2{padding-right:calc(calc(var(--spacing)) * 2)}.tw\\:pr-3{padding-right:calc(calc(var(--spacing)) * 3)}.tw\\:pr-4{padding-right:calc(calc(var(--spacing)) * 4)}.tw\\:pb-0{padding-bottom:calc(calc(var(--spacing)) * 0)}.tw\\:pb-1{padding-bottom:calc(calc(var(--spacing)) * 1)}.tw\\:pb-2{padding-bottom:calc(calc(var(--spacing)) * 2)}.tw\\:pb-3{padding-bottom:calc(calc(var(--spacing)) * 3)}.tw\\:pb-4{padding-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:pb-8{padding-bottom:calc(calc(var(--spacing)) * 8)}.tw\\:pb-12{padding-bottom:calc(calc(var(--spacing)) * 12)}.tw\\:pb-16{padding-bottom:calc(calc(var(--spacing)) * 16)}.tw\\:pb-24{padding-bottom:calc(calc(var(--spacing)) * 24)}.tw\\:pl-2{padding-left:calc(calc(var(--spacing)) * 2)}.tw\\:pl-3{padding-left:calc(calc(var(--spacing)) * 3)}.tw\\:pl-4{padding-left:calc(calc(var(--spacing)) * 4)}.tw\\:pl-5{padding-left:calc(calc(var(--spacing)) * 5)}.tw\\:pl-6{padding-left:calc(calc(var(--spacing)) * 6)}.tw\\:pl-8{padding-left:calc(calc(var(--spacing)) * 8)}.tw\\:text-center{text-align:center}.tw\\:text-end{text-align:end}.tw\\:text-left{text-align:left}.tw\\:text-right{text-align:right}.tw\\:text-start{text-align:start}.tw\\:align-middle{vertical-align:middle}.tw\\:font-heading{font-family:var(--font-sans)}.tw\\:font-mono{font-family:var(--tw-font-mono)}.tw\\:font-sans{font-family:IBM Plex Sans Variable,sans-serif}.tw\\:text-2xl{font-size:var(--tw-text-2xl);line-height:var(--tw-leading,var(--tw-text-2xl--line-height))}.tw\\:text-3xl{font-size:var(--tw-text-3xl);line-height:var(--tw-leading,var(--tw-text-3xl--line-height))}.tw\\:text-4xl{font-size:var(--tw-text-4xl);line-height:var(--tw-leading,var(--tw-text-4xl--line-height))}.tw\\:text-base{font-size:var(--tw-text-base);line-height:var(--tw-leading,var(--tw-text-base--line-height))}.tw\\:text-lg{font-size:var(--tw-text-lg);line-height:var(--tw-leading,var(--tw-text-lg--line-height))}.tw\\:text-sm{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:text-xl{font-size:var(--tw-text-xl);line-height:var(--tw-leading,var(--tw-text-xl--line-height))}.tw\\:text-xs{font-size:var(--tw-text-xs);line-height:var(--tw-leading,var(--tw-text-xs--line-height))}.tw\\:text-\\[0\\.8rem\\]{font-size:.8rem}.tw\\:leading-loose{--tw-leading:var(--tw-leading-loose);line-height:var(--tw-leading-loose)}.tw\\:leading-none{--tw-leading:1;line-height:1}.tw\\:leading-relaxed{--tw-leading:var(--tw-leading-relaxed);line-height:var(--tw-leading-relaxed)}.tw\\:leading-snug{--tw-leading:var(--tw-leading-snug);line-height:var(--tw-leading-snug)}.tw\\:leading-tight{--tw-leading:var(--tw-leading-tight);line-height:var(--tw-leading-tight)}.tw\\:font-bold{--tw-font-weight:var(--tw-font-weight-bold);font-weight:var(--tw-font-weight-bold)}.tw\\:font-extrabold{--tw-font-weight:var(--tw-font-weight-extrabold);font-weight:var(--tw-font-weight-extrabold)}.tw\\:font-medium{--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}.tw\\:font-normal{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:font-semibold{--tw-font-weight:var(--tw-font-weight-semibold);font-weight:var(--tw-font-weight-semibold)}.tw\\:tracking-tight{--tw-tracking:var(--tw-tracking-tight);letter-spacing:var(--tw-tracking-tight)}.tw\\:tracking-wider{--tw-tracking:var(--tw-tracking-wider);letter-spacing:var(--tw-tracking-wider)}.tw\\:tracking-widest{--tw-tracking:var(--tw-tracking-widest);letter-spacing:var(--tw-tracking-widest)}.tw\\:text-balance{text-wrap:balance}.tw\\:text-nowrap{text-wrap:nowrap}.tw\\:break-words{overflow-wrap:break-word}.tw\\:text-clip{text-overflow:clip}.tw\\:text-ellipsis{text-overflow:ellipsis}.tw\\:whitespace-normal{white-space:normal}.tw\\:whitespace-nowrap{white-space:nowrap}.tw\\:whitespace-pre-wrap{white-space:pre-wrap}.tw\\:\\[color\\:blue\\]{color:#00f}.tw\\:text-accent-foreground{color:var(--accent-foreground)}.tw\\:text-amber-600{color:var(--tw-color-amber-600)}.tw\\:text-background{color:var(--background)}.tw\\:text-blue-400{color:var(--tw-color-blue-400)}.tw\\:text-blue-500{color:var(--tw-color-blue-500)}.tw\\:text-blue-600{color:var(--tw-color-blue-600)}.tw\\:text-blue-800{color:var(--tw-color-blue-800)}.tw\\:text-card-foreground{color:var(--card-foreground)}.tw\\:text-current{color:currentColor}.tw\\:text-destructive{color:var(--destructive)}.tw\\:text-foreground{color:var(--foreground)}.tw\\:text-foreground\\!{color:var(--foreground)!important}.tw\\:text-foreground\\/30{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/30{color:color-mix(in oklab, var(--foreground) 30%, transparent)}}.tw\\:text-foreground\\/50{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/50{color:color-mix(in oklab, var(--foreground) 50%, transparent)}}.tw\\:text-foreground\\/60{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/60{color:color-mix(in oklab, var(--foreground) 60%, transparent)}}.tw\\:text-foreground\\/70{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/70{color:color-mix(in oklab, var(--foreground) 70%, transparent)}}.tw\\:text-gray-300{color:var(--tw-color-gray-300)}.tw\\:text-gray-500{color:var(--tw-color-gray-500)}.tw\\:text-gray-600{color:var(--tw-color-gray-600)}.tw\\:text-gray-700{color:var(--tw-color-gray-700)}.tw\\:text-gray-800{color:var(--tw-color-gray-800)}.tw\\:text-green-600{color:var(--tw-color-green-600)}.tw\\:text-green-700{color:var(--tw-color-green-700)}.tw\\:text-green-800{color:var(--tw-color-green-800)}.tw\\:text-inherit{color:inherit}.tw\\:text-muted-foreground,.tw\\:text-muted-foreground\\/50{color:var(--muted-foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-muted-foreground\\/50{color:color-mix(in oklab, var(--muted-foreground) 50%, transparent)}}.tw\\:text-orange-800{color:var(--tw-color-orange-800)}.tw\\:text-popover-foreground{color:var(--popover-foreground)}.tw\\:text-primary{color:var(--primary)}.tw\\:text-primary-foreground{color:var(--primary-foreground)}.tw\\:text-purple-900{color:var(--tw-color-purple-900)}.tw\\:text-red-500{color:var(--tw-color-red-500)}.tw\\:text-red-600{color:var(--tw-color-red-600)}.tw\\:text-red-700{color:var(--tw-color-red-700)}.tw\\:text-red-800{color:var(--tw-color-red-800)}.tw\\:text-rose-600{color:var(--tw-color-rose-600)}.tw\\:text-secondary-foreground{color:var(--secondary-foreground)}.tw\\:text-sidebar-accent-foreground{color:var(--sidebar-accent-foreground)}.tw\\:text-sidebar-foreground,.tw\\:text-sidebar-foreground\\/70{color:var(--sidebar-foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-sidebar-foreground\\/70{color:color-mix(in oklab, var(--sidebar-foreground) 70%, transparent)}}.tw\\:text-sky-600{color:var(--tw-color-sky-600)}.tw\\:text-slate-900{color:var(--tw-color-slate-900)}.tw\\:text-teal-600{color:var(--tw-color-teal-600)}.tw\\:text-white{color:var(--tw-color-white)}.tw\\:text-yellow-400{color:var(--tw-color-yellow-400)}.tw\\:text-yellow-600{color:var(--tw-color-yellow-600)}.tw\\:text-yellow-700{color:var(--tw-color-yellow-700)}.tw\\:capitalize{text-transform:capitalize}.tw\\:uppercase{text-transform:uppercase}.tw\\:italic{font-style:italic}.tw\\:tabular-nums{--tw-numeric-spacing:tabular-nums;font-variant-numeric:var(--tw-ordinal,) var(--tw-slashed-zero,) var(--tw-numeric-figure,) var(--tw-numeric-spacing,) var(--tw-numeric-fraction,)}.tw\\:line-through{text-decoration-line:line-through}.tw\\:underline{text-decoration-line:underline}.tw\\:decoration-destructive{-webkit-text-decoration-color:var(--destructive);-webkit-text-decoration-color:var(--destructive);text-decoration-color:var(--destructive)}.tw\\:underline-offset-4{text-underline-offset:4px}.tw\\:opacity-0{opacity:0}.tw\\:opacity-40{opacity:.4}.tw\\:opacity-50{opacity:.5}.tw\\:opacity-60{opacity:.6}.tw\\:opacity-100{opacity:1}.tw\\:bg-blend-color{background-blend-mode:color}.tw\\:shadow{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-\\[0_0_0_1px_var\\(--sidebar-border\\)\\]{--tw-shadow:0 0 0 1px var(--tw-shadow-color,var(--sidebar-border));box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-lg{--tw-shadow:0 10px 15px -3px var(--tw-shadow-color,#0000001a), 0 4px 6px -4px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-md{--tw-shadow:0 4px 6px -1px var(--tw-shadow-color,#0000001a), 0 2px 4px -2px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-none{--tw-shadow:0 0 #0000;box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-none\\!{--tw-shadow:0 0 #0000!important;box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)!important}.tw\\:shadow-sm{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-xl{--tw-shadow:0 20px 25px -5px var(--tw-shadow-color,#0000001a), 0 8px 10px -6px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-0{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-1{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-2{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-background{--tw-ring-color:var(--background)}.tw\\:ring-foreground\\/10{--tw-ring-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:ring-foreground\\/10{--tw-ring-color:color-mix(in oklab, var(--foreground) 10%, transparent)}}.tw\\:ring-primary{--tw-ring-color:var(--primary)}.tw\\:ring-ring\\/50{--tw-ring-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.tw\\:ring-ring\\/50{--tw-ring-color:color-mix(in oklab, var(--ring) 50%, transparent)}}.tw\\:ring-sidebar-ring{--tw-ring-color:var(--sidebar-ring)}.tw\\:ring-offset-2{--tw-ring-offset-width:2px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}.tw\\:ring-offset-background{--tw-ring-offset-color:var(--background)}.tw\\:ring-offset-white{--tw-ring-offset-color:var(--tw-color-white)}.tw\\:outline-hidden{--tw-outline-style:none;outline-style:none}@media (forced-colors:active){.tw\\:outline-hidden{outline-offset:2px;outline:2px solid #0000}}.tw\\:drop-shadow-sm{--tw-drop-shadow-size:drop-shadow(0 1px 2px var(--tw-drop-shadow-color,#00000026));--tw-drop-shadow:drop-shadow(var(--tw-drop-shadow-sm));filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.tw\\:transition{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to,opacity,box-shadow,transform,translate,scale,rotate,filter,-webkit-backdrop-filter,backdrop-filter,display,content-visibility,overlay,pointer-events;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[color\\,box-shadow\\]{transition-property:color,box-shadow;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[left\\,right\\,width\\]{transition-property:left,right,width;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[margin\\,opacity\\]{transition-property:margin,opacity;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[width\\,height\\,padding\\]{transition-property:width,height,padding;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[width\\]{transition-property:width;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-all{transition-property:all;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-colors{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-opacity{transition-property:opacity;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-transform{transition-property:transform,translate,scale,rotate;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-none{transition-property:none}.tw\\:duration-100{--tw-duration:.1s;transition-duration:.1s}.tw\\:duration-200{--tw-duration:.2s;transition-duration:.2s}.tw\\:ease-linear{--tw-ease:linear;transition-timing-function:linear}.tw\\:prose-quoteless :where(blockquote p:first-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):before,.tw\\:prose-quoteless :where(blockquote p:last-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:none}.tw\\:outline-none{--tw-outline-style:none;outline-style:none}.tw\\:select-none{-webkit-user-select:none;user-select:none}.tw\\:group-focus-within\\/menu-item\\:opacity-100:is(:where(.tw\\:group\\/menu-item):focus-within *){opacity:1}@media (hover:hover){.tw\\:group-hover\\:visible:is(:where(.tw\\:group):hover *){visibility:visible}.tw\\:group-hover\\:hidden:is(:where(.tw\\:group):hover *){display:none}.tw\\:group-hover\\:opacity-100:is(:where(.tw\\:group):hover *),.tw\\:group-hover\\/menu-item\\:opacity-100:is(:where(.tw\\:group\\/menu-item):hover *){opacity:1}}.tw\\:group-focus\\/context-menu-item\\:text-accent-foreground:is(:where(.tw\\:group\\/context-menu-item):focus *),.tw\\:group-focus\\/dropdown-menu-item\\:text-accent-foreground:is(:where(.tw\\:group\\/dropdown-menu-item):focus *),.tw\\:group-focus\\/menubar-item\\:text-accent-foreground:is(:where(.tw\\:group\\/menubar-item):focus *){color:var(--accent-foreground)}.tw\\:group-has-disabled\\/field\\:opacity-50:is(:where(.tw\\:group\\/field):has(:disabled) *){opacity:.5}.tw\\:group-has-data-\\[sidebar\\=menu-action\\]\\/menu-item\\:pe-8:is(:where(.tw\\:group\\/menu-item):has([data-sidebar=menu-action]) *){padding-inline-end:calc(calc(var(--spacing)) * 8)}.tw\\:group-has-data-\\[size\\=lg\\]\\/avatar-group\\:size-10:is(:where(.tw\\:group\\/avatar-group):has([data-size=lg]) *){width:calc(calc(var(--spacing)) * 10);height:calc(calc(var(--spacing)) * 10)}.tw\\:group-has-data-\\[size\\=sm\\]\\/avatar-group\\:size-6:is(:where(.tw\\:group\\/avatar-group):has([data-size=sm]) *){width:calc(calc(var(--spacing)) * 6);height:calc(calc(var(--spacing)) * 6)}.tw\\:group-has-data-\\[slot\\=command-shortcut\\]\\/command-item\\:hidden:is(:where(.tw\\:group\\/command-item):has([data-slot=command-shortcut]) *){display:none}.tw\\:group-has-\\[\\>input\\]\\/input-group\\:pt-2:is(:where(.tw\\:group\\/input-group):has(>input) *){padding-top:calc(calc(var(--spacing)) * 2)}.tw\\:group-has-\\[\\>input\\]\\/input-group\\:pb-2:is(:where(.tw\\:group\\/input-group):has(>input) *){padding-bottom:calc(calc(var(--spacing)) * 2)}.tw\\:group-has-\\[\\>svg\\]\\/alert\\:col-start-2:is(:where(.tw\\:group\\/alert):has(>svg) *){grid-column-start:2}.tw\\:group-data-\\[checked\\=true\\]\\/command-item\\:opacity-100:is(:where(.tw\\:group\\/command-item)[data-checked=true] *){opacity:1}.tw\\:group-data-\\[collapsible\\=icon\\]\\:-mt-8:is(:where(.tw\\:group)[data-collapsible=icon] *){margin-top:calc(calc(var(--spacing)) * -8)}.tw\\:group-data-\\[collapsible\\=icon\\]\\:hidden:is(:where(.tw\\:group)[data-collapsible=icon] *){display:none}.tw\\:group-data-\\[collapsible\\=icon\\]\\:size-8\\!:is(:where(.tw\\:group)[data-collapsible=icon] *){width:calc(calc(var(--spacing)) * 8)!important;height:calc(calc(var(--spacing)) * 8)!important}.tw\\:group-data-\\[collapsible\\=icon\\]\\:w-\\(--sidebar-width-icon\\):is(:where(.tw\\:group)[data-collapsible=icon] *){width:var(--sidebar-width-icon)}.tw\\:group-data-\\[collapsible\\=icon\\]\\:w-\\[calc\\(var\\(--sidebar-width-icon\\)\\+\\(--spacing\\(4\\)\\)\\)\\]:is(:where(.tw\\:group)[data-collapsible=icon] *){width:calc(var(--sidebar-width-icon) + (calc(calc(var(--spacing)) * 4)))}.tw\\:group-data-\\[collapsible\\=icon\\]\\:w-\\[calc\\(var\\(--sidebar-width-icon\\)\\+\\(--spacing\\(4\\)\\)\\+2px\\)\\]:is(:where(.tw\\:group)[data-collapsible=icon] *){width:calc(var(--sidebar-width-icon) + (calc(calc(var(--spacing)) * 4)) + 2px)}.tw\\:group-data-\\[collapsible\\=icon\\]\\:overflow-hidden:is(:where(.tw\\:group)[data-collapsible=icon] *){overflow:hidden}.tw\\:group-data-\\[collapsible\\=icon\\]\\:p-0\\!:is(:where(.tw\\:group)[data-collapsible=icon] *){padding:calc(calc(var(--spacing)) * 0)!important}.tw\\:group-data-\\[collapsible\\=icon\\]\\:p-2\\!:is(:where(.tw\\:group)[data-collapsible=icon] *){padding:calc(calc(var(--spacing)) * 2)!important}.tw\\:group-data-\\[collapsible\\=icon\\]\\:opacity-0:is(:where(.tw\\:group)[data-collapsible=icon] *){opacity:0}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:right-\\[calc\\(var\\(--sidebar-width\\)\\*-1\\)\\]:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){right:calc(var(--sidebar-width) * -1)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:left-\\[calc\\(var\\(--sidebar-width\\)\\*-1\\)\\]:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){left:calc(var(--sidebar-width) * -1)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:w-0:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){width:calc(calc(var(--spacing)) * 0)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:translate-x-0:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){--tw-translate-x:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:group-data-\\[disabled\\=true\\]\\:pointer-events-none:is(:where(.tw\\:group)[data-disabled=true] *){pointer-events:none}.tw\\:group-data-\\[disabled\\=true\\]\\:opacity-50:is(:where(.tw\\:group)[data-disabled=true] *),.tw\\:group-data-\\[disabled\\=true\\]\\/input-group\\:opacity-50:is(:where(.tw\\:group\\/input-group)[data-disabled=true] *){opacity:.5}.tw\\:group-data-\\[side\\=primary\\]\\:-right-4:is(:where(.tw\\:group)[data-side=primary] *){right:calc(calc(var(--spacing)) * -4)}.tw\\:group-data-\\[side\\=primary\\]\\:border-e:is(:where(.tw\\:group)[data-side=primary] *){border-inline-end-style:var(--tw-border-style);border-inline-end-width:1px}.tw\\:group-data-\\[side\\=secondary\\]\\:left-0:is(:where(.tw\\:group)[data-side=secondary] *){left:calc(calc(var(--spacing)) * 0)}.tw\\:group-data-\\[side\\=secondary\\]\\:rotate-180:is(:where(.tw\\:group)[data-side=secondary] *){rotate:180deg}.tw\\:group-data-\\[side\\=secondary\\]\\:border-s:is(:where(.tw\\:group)[data-side=secondary] *){border-inline-start-style:var(--tw-border-style);border-inline-start-width:1px}.tw\\:group-data-\\[size\\=default\\]\\/avatar\\:size-2\\.5:is(:where(.tw\\:group\\/avatar)[data-size=default] *){width:calc(calc(var(--spacing)) * 2.5);height:calc(calc(var(--spacing)) * 2.5)}.tw\\:group-data-\\[size\\=default\\]\\/switch\\:size-4:is(:where(.tw\\:group\\/switch)[data-size=default] *){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[size\\=lg\\]\\/avatar\\:size-3:is(:where(.tw\\:group\\/avatar)[data-size=lg] *){width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[size\\=sm\\]\\/avatar\\:size-2:is(:where(.tw\\:group\\/avatar)[data-size=sm] *){width:calc(calc(var(--spacing)) * 2);height:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[size\\=sm\\]\\/avatar\\:text-xs:is(:where(.tw\\:group\\/avatar)[data-size=sm] *){font-size:var(--tw-text-xs);line-height:var(--tw-leading,var(--tw-text-xs--line-height))}.tw\\:group-data-\\[size\\=sm\\]\\/card\\:p-3:is(:where(.tw\\:group\\/card)[data-size=sm] *){padding:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[size\\=sm\\]\\/card\\:px-3:is(:where(.tw\\:group\\/card)[data-size=sm] *){padding-inline:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[size\\=sm\\]\\/card\\:text-sm:is(:where(.tw\\:group\\/card)[data-size=sm] *){font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:size-3:is(:where(.tw\\:group\\/switch)[data-size=sm] *){width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[spacing\\=0\\]\\/toggle-group\\:rounded-none:is(:where(.tw\\:group\\/toggle-group)[data-spacing="0"] *){border-radius:0}.tw\\:group-data-\\[spacing\\=0\\]\\/toggle-group\\:px-2:is(:where(.tw\\:group\\/toggle-group)[data-spacing="0"] *){padding-inline:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[variant\\=floating\\]\\:rounded-lg:is(:where(.tw\\:group)[data-variant=floating] *){border-radius:var(--radius)}.tw\\:group-data-\\[variant\\=floating\\]\\:shadow-sm:is(:where(.tw\\:group)[data-variant=floating] *){--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:group-data-\\[variant\\=floating\\]\\:ring-1:is(:where(.tw\\:group)[data-variant=floating] *){--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:group-data-\\[variant\\=floating\\]\\:ring-sidebar-border:is(:where(.tw\\:group)[data-variant=floating] *){--tw-ring-color:var(--sidebar-border)}.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:bg-transparent:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *){background-color:#0000}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:mx-auto:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){margin-inline:auto}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:mt-4:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){margin-top:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:block:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){display:block}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:h-1\\.5:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){height:calc(calc(var(--spacing)) * 1.5)}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:w-\\[100px\\]:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){width:100px}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:text-center:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){text-align:center}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:my-auto:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){margin-block:auto}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:me-4:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){margin-inline-end:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:block:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){display:block}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:h-\\[100px\\]:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){height:100px}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:w-1\\.5:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){width:calc(calc(var(--spacing)) * 1.5)}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:my-auto:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){margin-block:auto}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:ms-4:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){margin-inline-start:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:block:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){display:block}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:h-\\[100px\\]:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){height:100px}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:w-1\\.5:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){width:calc(calc(var(--spacing)) * 1.5)}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:mx-auto:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){margin-inline:auto}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:mb-4:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){margin-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:block:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){display:block}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:h-1\\.5:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){height:calc(calc(var(--spacing)) * 1.5)}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:w-\\[100px\\]:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){width:100px}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:text-center:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){text-align:center}.tw\\:group-data-selected\\/command-item\\:text-foreground:is(:where(.tw\\:group\\/command-item):where([data-selected=true]) *){color:var(--foreground)}.tw\\:group-data-horizontal\\/tabs\\:h-8:is(:where(.tw\\:group\\/tabs):where([data-orientation=horizontal]) *){height:calc(calc(var(--spacing)) * 8)}.tw\\:group-data-vertical\\/tabs\\:h-fit:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *){height:fit-content}.tw\\:group-data-vertical\\/tabs\\:w-full:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *){width:100%}.tw\\:group-data-vertical\\/tabs\\:flex-col:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *){flex-direction:column}.tw\\:group-data-vertical\\/tabs\\:justify-start:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *){justify-content:flex-start}@media (hover:hover){.tw\\:peer-hover\\/menu-button\\:text-sidebar-accent-foreground:is(:where(.tw\\:peer\\/menu-button):hover~*){color:var(--sidebar-accent-foreground)}.tw\\:peer-focus\\:group-hover\\:text-blue-500:is(:where(.tw\\:peer):focus~*):is(:where(.tw\\:group):hover *){color:var(--tw-color-blue-500)}}.tw\\:peer-disabled\\:cursor-not-allowed:is(:where(.tw\\:peer):disabled~*){cursor:not-allowed}.tw\\:peer-disabled\\:opacity-50:is(:where(.tw\\:peer):disabled~*){opacity:.5}.tw\\:peer-data-\\[size\\=default\\]\\/menu-button\\:top-1\\.5:is(:where(.tw\\:peer\\/menu-button)[data-size=default]~*){top:calc(calc(var(--spacing)) * 1.5)}.tw\\:peer-data-\\[size\\=lg\\]\\/menu-button\\:top-2\\.5:is(:where(.tw\\:peer\\/menu-button)[data-size=lg]~*){top:calc(calc(var(--spacing)) * 2.5)}.tw\\:peer-data-\\[size\\=sm\\]\\/menu-button\\:top-1:is(:where(.tw\\:peer\\/menu-button)[data-size=sm]~*){top:calc(calc(var(--spacing)) * 1)}.tw\\:peer-data-active\\/menu-button\\:text-sidebar-accent-foreground:is(:is(:where(.tw\\:peer\\/menu-button):where([data-state=active]),:where(.tw\\:peer\\/menu-button):where([data-active]:not([data-active=false])))~*){color:var(--sidebar-accent-foreground)}.tw\\:file\\:inline-flex::file-selector-button{display:inline-flex}.tw\\:file\\:h-6::file-selector-button{height:calc(calc(var(--spacing)) * 6)}.tw\\:file\\:border-0::file-selector-button{border-style:var(--tw-border-style);border-width:0}.tw\\:file\\:bg-transparent::file-selector-button{background-color:#0000}.tw\\:file\\:text-sm::file-selector-button{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:file\\:font-medium::file-selector-button{--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}.tw\\:file\\:text-foreground::file-selector-button{color:var(--foreground)}.tw\\:placeholder\\:text-muted-foreground::placeholder{color:var(--muted-foreground)}.tw\\:placeholder\\:text-slate-400::placeholder{color:var(--tw-color-slate-400)}.tw\\:before\\:pointer-events-none:before{content:var(--tw-content);pointer-events:none}.tw\\:before\\:absolute:before{content:var(--tw-content);position:absolute}.tw\\:before\\:inset-0:before{content:var(--tw-content);inset:calc(calc(var(--spacing)) * 0)}.tw\\:before\\:top-0\\.5:before{content:var(--tw-content);top:calc(calc(var(--spacing)) * .5)}.tw\\:before\\:left-0:before{content:var(--tw-content);left:calc(calc(var(--spacing)) * 0)}.tw\\:before\\:-z-1:before{content:var(--tw-content);z-index:calc(1 * -1)}.tw\\:before\\:block:before{content:var(--tw-content);display:block}.tw\\:before\\:hidden:before{content:var(--tw-content);display:none}.tw\\:before\\:h-4:before{content:var(--tw-content);height:calc(calc(var(--spacing)) * 4)}.tw\\:before\\:w-4:before{content:var(--tw-content);width:calc(calc(var(--spacing)) * 4)}.tw\\:before\\:cursor-pointer:before{content:var(--tw-content);cursor:pointer}.tw\\:before\\:rounded:before{content:var(--tw-content);border-radius:.25rem}.tw\\:before\\:rounded-\\[inherit\\]:before{content:var(--tw-content);border-radius:inherit}.tw\\:before\\:border:before{content:var(--tw-content);border-style:var(--tw-border-style);border-width:1px}.tw\\:before\\:border-primary:before{content:var(--tw-content);border-color:var(--primary)}.tw\\:before\\:bg-primary:before{content:var(--tw-content);background-color:var(--primary)}.tw\\:before\\:bg-cover:before{content:var(--tw-content);background-size:cover}.tw\\:before\\:bg-no-repeat:before{content:var(--tw-content);background-repeat:no-repeat}.tw\\:before\\:backdrop-blur-2xl:before{content:var(--tw-content);--tw-backdrop-blur:blur(var(--tw-blur-2xl));-webkit-backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)}.tw\\:before\\:backdrop-saturate-150:before{content:var(--tw-content);--tw-backdrop-saturate:saturate(150%);-webkit-backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)}.tw\\:before\\:content-\\[\\"\\"\\]:before{--tw-content:"";content:var(--tw-content)}.tw\\:before\\:content-\\[\\\\\\"\\\\\\"\\]:before{--tw-content:\\"\\";content:var(--tw-content)}.tw\\:after\\:absolute:after{content:var(--tw-content);position:absolute}.tw\\:after\\:-inset-2:after{content:var(--tw-content);inset:calc(calc(var(--spacing)) * -2)}.tw\\:after\\:inset-0:after{content:var(--tw-content);inset:calc(calc(var(--spacing)) * 0)}.tw\\:after\\:-inset-x-3:after{content:var(--tw-content);inset-inline:calc(calc(var(--spacing)) * -3)}.tw\\:after\\:-inset-y-2:after{content:var(--tw-content);inset-block:calc(calc(var(--spacing)) * -2)}.tw\\:after\\:inset-y-0:after{content:var(--tw-content);inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:after\\:start-1\\/2:after{content:var(--tw-content);inset-inline-start:50%}.tw\\:after\\:top-\\[6px\\]:after{content:var(--tw-content);top:6px}.tw\\:after\\:right-\\[7px\\]:after{content:var(--tw-content);right:7px}.tw\\:after\\:left-\\[7px\\]:after{content:var(--tw-content);left:7px}.tw\\:after\\:block:after{content:var(--tw-content);display:block}.tw\\:after\\:hidden:after{content:var(--tw-content);display:none}.tw\\:after\\:h-0\\.5:after{content:var(--tw-content);height:calc(calc(var(--spacing)) * .5)}.tw\\:after\\:h-\\[6px\\]:after{content:var(--tw-content);height:6px}.tw\\:after\\:w-1:after{content:var(--tw-content);width:calc(calc(var(--spacing)) * 1)}.tw\\:after\\:w-\\[2px\\]:after{content:var(--tw-content);width:2px}.tw\\:after\\:w-\\[3px\\]:after{content:var(--tw-content);width:3px}.tw\\:after\\:-translate-x-1\\/2:after{content:var(--tw-content);--tw-translate-x:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:after\\:rotate-45:after{content:var(--tw-content);rotate:45deg}.tw\\:after\\:cursor-pointer:after{content:var(--tw-content);cursor:pointer}.tw\\:after\\:rounded-full:after{content:var(--tw-content);border-radius:3.40282e38px}.tw\\:after\\:border:after{content:var(--tw-content);border-style:var(--tw-border-style);border-width:1px}.tw\\:after\\:border-t-0:after{content:var(--tw-content);border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:after\\:border-r-2:after{content:var(--tw-content);border-right-style:var(--tw-border-style);border-right-width:2px}.tw\\:after\\:border-b-2:after{content:var(--tw-content);border-bottom-style:var(--tw-border-style);border-bottom-width:2px}.tw\\:after\\:border-l-0:after{content:var(--tw-content);border-left-style:var(--tw-border-style);border-left-width:0}.tw\\:after\\:border-solid:after{content:var(--tw-content);--tw-border-style:solid;border-style:solid}.tw\\:after\\:border-border:after{content:var(--tw-content);border-color:var(--border)}.tw\\:after\\:border-white:after{content:var(--tw-content);border-color:var(--tw-color-white)}.tw\\:after\\:bg-foreground:after{content:var(--tw-content);background-color:var(--foreground)}.tw\\:after\\:bg-muted:after{content:var(--tw-content);background-color:var(--muted)}.tw\\:after\\:opacity-0:after{content:var(--tw-content);opacity:0}.tw\\:after\\:mix-blend-darken:after{content:var(--tw-content);mix-blend-mode:darken}.tw\\:after\\:transition-opacity:after{content:var(--tw-content);transition-property:opacity;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:after\\:content-\\[\\"\\"\\]:after{--tw-content:"";content:var(--tw-content)}.tw\\:after\\:content-\\[\\\\\\"\\\\\\"\\]:after{--tw-content:\\"\\";content:var(--tw-content)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:after\\:start-full:is(:where(.tw\\:group)[data-collapsible=offcanvas] *):after{content:var(--tw-content);inset-inline-start:100%}.tw\\:group-data-horizontal\\/tabs\\:after\\:inset-x-0:is(:where(.tw\\:group\\/tabs):where([data-orientation=horizontal]) *):after{content:var(--tw-content);inset-inline:calc(calc(var(--spacing)) * 0)}.tw\\:group-data-horizontal\\/tabs\\:after\\:bottom-\\[-5px\\]:is(:where(.tw\\:group\\/tabs):where([data-orientation=horizontal]) *):after{content:var(--tw-content);bottom:-5px}.tw\\:group-data-horizontal\\/tabs\\:after\\:h-0\\.5:is(:where(.tw\\:group\\/tabs):where([data-orientation=horizontal]) *):after{content:var(--tw-content);height:calc(calc(var(--spacing)) * .5)}.tw\\:group-data-vertical\\/tabs\\:after\\:inset-y-0:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *):after{content:var(--tw-content);inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:group-data-vertical\\/tabs\\:after\\:-end-1:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *):after{content:var(--tw-content);inset-inline-end:calc(calc(var(--spacing)) * -1)}.tw\\:group-data-vertical\\/tabs\\:after\\:w-0\\.5:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *):after{content:var(--tw-content);width:calc(calc(var(--spacing)) * .5)}.tw\\:first\\:mt-0:first-child{margin-top:calc(calc(var(--spacing)) * 0)}.tw\\:even\\:bg-muted:nth-child(2n){background-color:var(--muted)}.tw\\:focus-within\\:ring-2:focus-within{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-within\\:ring-ring:focus-within{--tw-ring-color:var(--ring)}.tw\\:focus-within\\:ring-offset-1:focus-within{--tw-ring-offset-width:1px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}@media (hover:hover){.tw\\:hover\\:-mt-4:hover{margin-top:calc(calc(var(--spacing)) * -4)}.tw\\:hover\\:cursor-pointer:hover{cursor:pointer}.tw\\:hover\\:bg-accent:hover,.tw\\:hover\\:bg-accent\\/30:hover{background-color:var(--accent)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-accent\\/30:hover{background-color:color-mix(in oklab, var(--accent) 30%, transparent)}}.tw\\:hover\\:bg-accent\\/80:hover{background-color:var(--accent)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-accent\\/80:hover{background-color:color-mix(in oklab, var(--accent) 80%, transparent)}}.tw\\:hover\\:bg-blue-600:hover{background-color:var(--tw-color-blue-600)}.tw\\:hover\\:bg-destructive\\/20:hover{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-destructive\\/20:hover{background-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:hover\\:bg-gray-50:hover{background-color:var(--tw-color-gray-50)}.tw\\:hover\\:bg-input:hover{background-color:var(--input)}.tw\\:hover\\:bg-muted:hover,.tw\\:hover\\:bg-muted\\/50:hover{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-muted\\/50:hover{background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:hover\\:bg-muted\\/80:hover{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-muted\\/80:hover{background-color:color-mix(in oklab, var(--muted) 80%, transparent)}}.tw\\:hover\\:bg-primary\\/10:hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-primary\\/10:hover{background-color:color-mix(in oklab, var(--primary) 10%, transparent)}}.tw\\:hover\\:bg-primary\\/70:hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-primary\\/70:hover{background-color:color-mix(in oklab, var(--primary) 70%, transparent)}}.tw\\:hover\\:bg-red-500:hover{background-color:var(--tw-color-red-500)}.tw\\:hover\\:bg-secondary:hover,.tw\\:hover\\:bg-secondary\\/80:hover{background-color:var(--secondary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-secondary\\/80:hover{background-color:color-mix(in oklab, var(--secondary) 80%, transparent)}}.tw\\:hover\\:bg-sidebar-accent:hover{background-color:var(--sidebar-accent)}.tw\\:hover\\:bg-transparent:hover{background-color:#0000}.tw\\:hover\\:text-foreground:hover{color:var(--foreground)}.tw\\:hover\\:text-muted-foreground:hover{color:var(--muted-foreground)}.tw\\:hover\\:text-primary-foreground:hover{color:var(--primary-foreground)}.tw\\:hover\\:text-sidebar-accent-foreground:hover{color:var(--sidebar-accent-foreground)}.tw\\:hover\\:underline:hover{text-decoration-line:underline}.tw\\:hover\\:opacity-80:hover{opacity:.8}.tw\\:hover\\:opacity-100:hover{opacity:1}.tw\\:hover\\:shadow-\\[0_0_0_1px_var\\(--sidebar-accent\\)\\]:hover{--tw-shadow:0 0 0 1px var(--tw-shadow-color,var(--sidebar-accent));box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:hover\\:shadow-md:hover{--tw-shadow:0 4px 6px -1px var(--tw-shadow-color,#0000001a), 0 2px 4px -2px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:hover\\:ring-3:hover{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:hover\\:group-data-\\[collapsible\\=offcanvas\\]\\:bg-sidebar:hover:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){background-color:var(--sidebar)}.tw\\:hover\\:after\\:bg-sidebar-border:hover:after{content:var(--tw-content);background-color:var(--sidebar-border)}}.tw\\:focus\\:relative:focus{position:relative}.tw\\:focus\\:z-10:focus{z-index:10}.tw\\:focus\\:bg-accent:focus{background-color:var(--accent)}.tw\\:focus\\:bg-muted:focus{background-color:var(--muted)}.tw\\:focus\\:text-accent-foreground:focus{color:var(--accent-foreground)}.tw\\:focus\\:text-foreground:focus{color:var(--foreground)}.tw\\:focus\\:ring-2:focus{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus\\:ring-ring:focus{--tw-ring-color:var(--ring)}.tw\\:focus\\:ring-offset-1:focus{--tw-ring-offset-width:1px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}.tw\\:focus\\:ring-offset-background:focus{--tw-ring-offset-color:var(--background)}.tw\\:focus\\:outline-hidden:focus{--tw-outline-style:none;outline-style:none}@media (forced-colors:active){.tw\\:focus\\:outline-hidden:focus{outline-offset:2px;outline:2px solid #0000}}:is(.tw\\:focus\\:\\*\\*\\:text-accent-foreground:focus *),:is(.tw\\:not-data-\\[variant\\=destructive\\]\\:focus\\:\\*\\*\\:text-accent-foreground:not([data-variant=destructive]):focus *){color:var(--accent-foreground)}.tw\\:focus-visible\\:relative:focus-visible{position:relative}.tw\\:focus-visible\\:z-10:focus-visible{z-index:10}.tw\\:focus-visible\\:border-destructive\\/40:focus-visible{border-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:focus-visible\\:border-destructive\\/40:focus-visible{border-color:color-mix(in oklab, var(--destructive) 40%, transparent)}}.tw\\:focus-visible\\:border-ring:focus-visible{border-color:var(--ring)}.tw\\:focus-visible\\:ring-0:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-visible\\:ring-1:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-visible\\:ring-2:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-visible\\:ring-3:focus-visible,.tw\\:focus-visible\\:ring-\\[3px\\]:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-visible\\:ring-\\[color\\:hsl\\(240\\,5\\%\\,64\\.9\\%\\)\\]:focus-visible{--tw-ring-color:#a1a1aa}.tw\\:focus-visible\\:ring-destructive\\/20:focus-visible{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:focus-visible\\:ring-destructive\\/20:focus-visible{--tw-ring-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:focus-visible\\:ring-ring:focus-visible,.tw\\:focus-visible\\:ring-ring\\/50:focus-visible{--tw-ring-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.tw\\:focus-visible\\:ring-ring\\/50:focus-visible{--tw-ring-color:color-mix(in oklab, var(--ring) 50%, transparent)}}.tw\\:focus-visible\\:ring-slate-400:focus-visible{--tw-ring-color:var(--tw-color-slate-400)}.tw\\:focus-visible\\:ring-offset-2:focus-visible{--tw-ring-offset-width:2px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}.tw\\:focus-visible\\:outline-hidden:focus-visible{--tw-outline-style:none;outline-style:none}@media (forced-colors:active){.tw\\:focus-visible\\:outline-hidden:focus-visible{outline-offset:2px;outline:2px solid #0000}}.tw\\:focus-visible\\:outline-1:focus-visible{outline-style:var(--tw-outline-style);outline-width:1px}.tw\\:focus-visible\\:outline-ring:focus-visible{outline-color:var(--ring)}.tw\\:focus-visible\\:outline-none:focus-visible{--tw-outline-style:none;outline-style:none}:is(.tw\\:\\*\\:focus-visible\\:relative>*):focus-visible{position:relative}:is(.tw\\:\\*\\:focus-visible\\:z-10>*):focus-visible{z-index:10}.tw\\:active\\:bg-sidebar-accent:active{background-color:var(--sidebar-accent)}.tw\\:active\\:text-sidebar-accent-foreground:active{color:var(--sidebar-accent-foreground)}.tw\\:active\\:ring-3:active{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:active\\:not-aria-\\[haspopup\\]\\:translate-y-px:active:not([aria-haspopup]){--tw-translate-y:1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:disabled\\:pointer-events-none:disabled{pointer-events:none}.tw\\:disabled\\:cursor-not-allowed:disabled{cursor:not-allowed}.tw\\:disabled\\:bg-input\\/50:disabled{background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:disabled\\:bg-input\\/50:disabled{background-color:color-mix(in oklab, var(--input) 50%, transparent)}}.tw\\:disabled\\:bg-transparent:disabled{background-color:#0000}.tw\\:disabled\\:opacity-50:disabled{opacity:.5}:where([data-side=primary]) .tw\\:in-data-\\[side\\=primary\\]\\:cursor-w-resize{cursor:w-resize}:where([data-side=secondary]) .tw\\:in-data-\\[side\\=secondary\\]\\:cursor-e-resize{cursor:e-resize}:where([data-slot=button-group]) .tw\\:in-data-\\[slot\\=button-group\\]\\:rounded-lg{border-radius:var(--radius)}:where([data-slot=combobox-content]) .tw\\:in-data-\\[slot\\=combobox-content\\]\\:focus-within\\:border-inherit:focus-within{border-color:inherit}:where([data-slot=combobox-content]) .tw\\:in-data-\\[slot\\=combobox-content\\]\\:focus-within\\:ring-0:focus-within{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}:where([data-slot=dialog-content]) .tw\\:in-data-\\[slot\\=dialog-content\\]\\:rounded-lg\\!{border-radius:var(--radius)!important}:where([data-slot=tooltip-content]) .tw\\:in-data-\\[slot\\=tooltip-content\\]\\:bg-background\\/20{background-color:var(--background)}@supports (color:color-mix(in lab, red, red)){:where([data-slot=tooltip-content]) .tw\\:in-data-\\[slot\\=tooltip-content\\]\\:bg-background\\/20{background-color:color-mix(in oklab, var(--background) 20%, transparent)}}:where([data-slot=tooltip-content]) .tw\\:in-data-\\[slot\\=tooltip-content\\]\\:text-background{color:var(--background)}.tw\\:has-disabled\\:bg-input\\/50:has(:disabled){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:has-disabled\\:bg-input\\/50:has(:disabled){background-color:color-mix(in oklab, var(--input) 50%, transparent)}}.tw\\:has-disabled\\:opacity-50:has(:disabled){opacity:.5}.tw\\:has-aria-expanded\\:bg-muted\\/50:has([aria-expanded=true]){background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:has-aria-expanded\\:bg-muted\\/50:has([aria-expanded=true]){background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:has-data-\\[icon\\=inline-end\\]\\:pe-1:has([data-icon=inline-end]){padding-inline-end:calc(calc(var(--spacing)) * 1)}.tw\\:has-data-\\[icon\\=inline-end\\]\\:pe-1\\.5:has([data-icon=inline-end]){padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[icon\\=inline-end\\]\\:pe-2:has([data-icon=inline-end]){padding-inline-end:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[spacing\\=0\\]\\/toggle-group\\:has-data-\\[icon\\=inline-end\\]\\:pe-1\\.5:is(:where(.tw\\:group\\/toggle-group)[data-spacing="0"] *):has([data-icon=inline-end]){padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[icon\\=inline-start\\]\\:ps-1:has([data-icon=inline-start]){padding-inline-start:calc(calc(var(--spacing)) * 1)}.tw\\:has-data-\\[icon\\=inline-start\\]\\:ps-1\\.5:has([data-icon=inline-start]){padding-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[icon\\=inline-start\\]\\:ps-2:has([data-icon=inline-start]){padding-inline-start:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[spacing\\=0\\]\\/toggle-group\\:has-data-\\[icon\\=inline-start\\]\\:ps-1\\.5:is(:where(.tw\\:group\\/toggle-group)[data-spacing="0"] *):has([data-icon=inline-start]){padding-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[slot\\=alert-action\\]\\:relative:has([data-slot=alert-action]){position:relative}.tw\\:has-data-\\[slot\\=alert-action\\]\\:pe-18:has([data-slot=alert-action]){padding-inline-end:calc(calc(var(--spacing)) * 18)}.tw\\:has-data-\\[slot\\=card-action\\]\\:grid-cols-\\[1fr_auto\\]:has([data-slot=card-action]){grid-template-columns:1fr auto}.tw\\:has-data-\\[slot\\=card-description\\]\\:grid-rows-\\[auto_auto\\]:has([data-slot=card-description]){grid-template-rows:auto auto}.tw\\:has-data-\\[slot\\=card-footer\\]\\:pb-0:has([data-slot=card-footer]){padding-bottom:calc(calc(var(--spacing)) * 0)}.tw\\:has-data-\\[slot\\=kbd\\]\\:pe-1\\.5:has([data-slot=kbd]){padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[variant\\=inset\\]\\:bg-sidebar:has([data-variant=inset]){background-color:var(--sidebar)}.tw\\:has-\\[\\[data-slot\\=input-group-control\\]\\:focus-visible\\]\\:border-ring:has([data-slot=input-group-control]:focus-visible){border-color:var(--ring)}.tw\\:has-\\[\\[data-slot\\=input-group-control\\]\\:focus-visible\\]\\:ring-3:has([data-slot=input-group-control]:focus-visible){--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:has-\\[\\[data-slot\\=input-group-control\\]\\:focus-visible\\]\\:ring-ring\\/50:has([data-slot=input-group-control]:focus-visible){--tw-ring-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.tw\\:has-\\[\\[data-slot\\=input-group-control\\]\\:focus-visible\\]\\:ring-ring\\/50:has([data-slot=input-group-control]:focus-visible){--tw-ring-color:color-mix(in oklab, var(--ring) 50%, transparent)}}.tw\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:border-destructive:has([data-slot][aria-invalid=true]){border-color:var(--destructive)}.tw\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-3:has([data-slot][aria-invalid=true]){--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-destructive\\/20:has([data-slot][aria-invalid=true]){--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-destructive\\/20:has([data-slot][aria-invalid=true]){--tw-ring-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:has-\\[\\>\\[data-align\\=block-end\\]\\]\\:h-auto:has(>[data-align=block-end]){height:auto}.tw\\:has-\\[\\>\\[data-align\\=block-end\\]\\]\\:flex-col:has(>[data-align=block-end]){flex-direction:column}.tw\\:has-\\[\\>\\[data-align\\=block-start\\]\\]\\:h-auto:has(>[data-align=block-start]){height:auto}.tw\\:has-\\[\\>\\[data-align\\=block-start\\]\\]\\:flex-col:has(>[data-align=block-start]){flex-direction:column}.tw\\:has-\\[\\>\\[data-slot\\=button-group\\]\\]\\:gap-2:has(>[data-slot=button-group]){gap:calc(calc(var(--spacing)) * 2)}.tw\\:has-\\[\\>button\\]\\:ms-\\[-0\\.3rem\\]:has(>button){margin-inline-start:-.3rem}.tw\\:has-\\[\\>button\\]\\:me-\\[-0\\.3rem\\]:has(>button){margin-inline-end:-.3rem}.tw\\:has-\\[\\>img\\]\\:grid-cols-\\[auto_1fr\\]:has(>img){grid-template-columns:auto 1fr}.tw\\:has-\\[\\>img\\]\\:gap-x-2:has(>img){column-gap:calc(calc(var(--spacing)) * 2)}.tw\\:has-\\[\\>img\\:first-child\\]\\:pt-0:has(>img:first-child){padding-top:calc(calc(var(--spacing)) * 0)}.tw\\:has-\\[\\>kbd\\]\\:ms-\\[-0\\.15rem\\]:has(>kbd){margin-inline-start:-.15rem}.tw\\:has-\\[\\>kbd\\]\\:me-\\[-0\\.15rem\\]:has(>kbd){margin-inline-end:-.15rem}.tw\\:has-\\[\\>svg\\]\\:grid-cols-\\[auto_1fr\\]:has(>svg){grid-template-columns:auto 1fr}.tw\\:has-\\[\\>svg\\]\\:gap-x-2:has(>svg){column-gap:calc(calc(var(--spacing)) * 2)}.tw\\:has-\\[\\>svg\\]\\:p-0:has(>svg){padding:calc(calc(var(--spacing)) * 0)}.tw\\:has-\\[\\>textarea\\]\\:h-auto:has(>textarea){height:auto}.tw\\:aria-disabled\\:pointer-events-none[aria-disabled=true]{pointer-events:none}.tw\\:aria-disabled\\:opacity-50[aria-disabled=true]{opacity:.5}.tw\\:aria-expanded\\:bg-muted[aria-expanded=true]{background-color:var(--muted)}.tw\\:aria-expanded\\:bg-secondary[aria-expanded=true]{background-color:var(--secondary)}.tw\\:aria-expanded\\:text-foreground[aria-expanded=true]{color:var(--foreground)}.tw\\:aria-expanded\\:text-secondary-foreground[aria-expanded=true]{color:var(--secondary-foreground)}.tw\\:aria-expanded\\:opacity-100[aria-expanded=true]{opacity:1}.tw\\:aria-invalid\\:border-destructive[aria-invalid=true]{border-color:var(--destructive)}.tw\\:aria-invalid\\:ring-0[aria-invalid=true]{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:aria-invalid\\:ring-3[aria-invalid=true]{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:aria-invalid\\:ring-destructive\\/20[aria-invalid=true]{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:aria-invalid\\:ring-destructive\\/20[aria-invalid=true]{--tw-ring-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:aria-invalid\\:aria-checked\\:border-primary[aria-invalid=true][aria-checked=true]{border-color:var(--primary)}.tw\\:aria-pressed\\:bg-muted[aria-pressed=true]{background-color:var(--muted)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:h-px[aria-orientation=horizontal]{height:1px}.tw\\:aria-\\[orientation\\=horizontal\\]\\:w-full[aria-orientation=horizontal]{width:100%}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:start-0[aria-orientation=horizontal]:after{content:var(--tw-content);inset-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:h-1[aria-orientation=horizontal]:after{content:var(--tw-content);height:calc(calc(var(--spacing)) * 1)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:w-full[aria-orientation=horizontal]:after{content:var(--tw-content);width:100%}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:translate-x-0[aria-orientation=horizontal]:after{content:var(--tw-content);--tw-translate-x:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:-translate-y-1\\/2[aria-orientation=horizontal]:after{content:var(--tw-content);--tw-translate-y:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:aria-\\[orientation\\=vertical\\]\\:flex-col[aria-orientation=vertical]{flex-direction:column}.tw\\:data-inset\\:ps-7[data-inset]{padding-inline-start:calc(calc(var(--spacing)) * 7)}.tw\\:data-placeholder\\:text-muted-foreground[data-placeholder]{color:var(--muted-foreground)}.tw\\:data-\\[align-trigger\\=false\\]\\:min-w-36[data-align-trigger=false]{min-width:calc(calc(var(--spacing)) * 36)}.tw\\:data-\\[align-trigger\\=true\\]\\:min-w-\\(--radix-select-trigger-width\\)[data-align-trigger=true]{min-width:var(--radix-select-trigger-width)}.tw\\:data-\\[align-trigger\\=true\\]\\:animate-none[data-align-trigger=true]{animation:none}.tw\\:data-\\[disabled\\=true\\]\\:pointer-events-none[data-disabled=true]{pointer-events:none}.tw\\:data-\\[disabled\\=true\\]\\:opacity-50[data-disabled=true]{opacity:.5}.tw\\:data-\\[position\\=popper\\]\\:h-\\(--radix-select-trigger-height\\)[data-position=popper]{height:var(--radix-select-trigger-height)}.tw\\:data-\\[position\\=popper\\]\\:w-full[data-position=popper]{width:100%}.tw\\:data-\\[position\\=popper\\]\\:min-w-\\(--radix-select-trigger-width\\)[data-position=popper]{min-width:var(--radix-select-trigger-width)}.tw\\:data-\\[side\\=bottom\\]\\:translate-y-1[data-side=bottom]{--tw-translate-y:calc(calc(var(--spacing)) * 1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=bottom\\]\\:slide-in-from-top-2[data-side=bottom]{--tw-enter-translate-y:calc(2*var(--spacing)*-1)}.tw\\:data-\\[side\\=left\\]\\:-translate-x-1[data-side=left]{--tw-translate-x:calc(calc(var(--spacing)) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=left\\]\\:slide-in-from-right-2[data-side=left]{--tw-enter-translate-x:calc(2*var(--spacing))}.tw\\:data-\\[side\\=right\\]\\:translate-x-1[data-side=right]{--tw-translate-x:calc(calc(var(--spacing)) * 1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=right\\]\\:slide-in-from-left-2[data-side=right]{--tw-enter-translate-x:calc(2*var(--spacing)*-1)}.tw\\:data-\\[side\\=top\\]\\:-translate-y-1[data-side=top]{--tw-translate-y:calc(calc(var(--spacing)) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=top\\]\\:slide-in-from-bottom-2[data-side=top]{--tw-enter-translate-y:calc(2*var(--spacing))}.tw\\:data-\\[size\\=default\\]\\:h-8[data-size=default]{height:calc(calc(var(--spacing)) * 8)}.tw\\:data-\\[size\\=default\\]\\:h-\\[18\\.4px\\][data-size=default]{height:18.4px}.tw\\:data-\\[size\\=default\\]\\:w-\\[32px\\][data-size=default]{width:32px}.tw\\:data-\\[size\\=lg\\]\\:size-10[data-size=lg]{width:calc(calc(var(--spacing)) * 10);height:calc(calc(var(--spacing)) * 10)}.tw\\:data-\\[size\\=md\\]\\:text-sm[data-size=md]{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:data-\\[size\\=sm\\]\\:size-6[data-size=sm]{width:calc(calc(var(--spacing)) * 6);height:calc(calc(var(--spacing)) * 6)}.tw\\:data-\\[size\\=sm\\]\\:h-7[data-size=sm]{height:calc(calc(var(--spacing)) * 7)}.tw\\:data-\\[size\\=sm\\]\\:h-\\[14px\\][data-size=sm]{height:14px}.tw\\:data-\\[size\\=sm\\]\\:w-\\[24px\\][data-size=sm]{width:24px}.tw\\:data-\\[size\\=sm\\]\\:gap-3[data-size=sm]{gap:calc(calc(var(--spacing)) * 3)}.tw\\:data-\\[size\\=sm\\]\\:rounded-\\[min\\(var\\(--tw-radius-md\\)\\,10px\\)\\][data-size=sm]{border-radius:min(var(--tw-radius-md), 10px)}.tw\\:data-\\[size\\=sm\\]\\:py-3[data-size=sm]{padding-block:calc(calc(var(--spacing)) * 3)}.tw\\:data-\\[size\\=sm\\]\\:text-xs[data-size=sm]{font-size:var(--tw-text-xs);line-height:var(--tw-leading,var(--tw-text-xs--line-height))}.tw\\:data-\\[size\\=sm\\]\\:has-data-\\[slot\\=card-footer\\]\\:pb-0[data-size=sm]:has([data-slot=card-footer]){padding-bottom:calc(calc(var(--spacing)) * 0)}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-item\\]\\:focus\\:bg-foreground\\/10 *)[data-slot$=-item]:focus{background-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-item\\]\\:focus\\:bg-foreground\\/10 *)[data-slot$=-item]:focus{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)}}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-item\\]\\:data-highlighted\\:bg-foreground\\/10 *)[data-slot$=-item][data-highlighted]{background-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-item\\]\\:data-highlighted\\:bg-foreground\\/10 *)[data-slot$=-item][data-highlighted]{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)}}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-separator\\]\\:bg-foreground\\/5 *)[data-slot$=-separator]{background-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-separator\\]\\:bg-foreground\\/5 *)[data-slot$=-separator]{background-color:color-mix(in oklab, var(--foreground) 5%, transparent)}}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-trigger\\]\\:focus\\:bg-foreground\\/10 *)[data-slot$=-trigger]:focus{background-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-trigger\\]\\:focus\\:bg-foreground\\/10 *)[data-slot$=-trigger]:focus{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)}}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-trigger\\]\\:aria-expanded\\:bg-foreground\\/10\\! *)[data-slot$=-trigger][aria-expanded=true]{background-color:var(--foreground)!important}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-trigger\\]\\:aria-expanded\\:bg-foreground\\/10\\! *)[data-slot$=-trigger][aria-expanded=true]{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)!important}}:is(.tw\\:\\*\\:data-\\[slot\\=alert-description\\]\\:text-destructive\\/90>*)[data-slot=alert-description]{color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\:data-\\[slot\\=alert-description\\]\\:text-destructive\\/90>*)[data-slot=alert-description]{color:color-mix(in oklab, var(--destructive) 90%, transparent)}}:is(.tw\\:\\*\\:data-\\[slot\\=avatar\\]\\:ring-2>*)[data-slot=avatar]{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}:is(.tw\\:\\*\\:data-\\[slot\\=avatar\\]\\:ring-background>*)[data-slot=avatar]{--tw-ring-color:var(--background)}:is(.tw\\:\\*\\:data-\\[slot\\=input-group-addon\\]\\:ps-2\\!>*)[data-slot=input-group-addon]{padding-inline-start:calc(calc(var(--spacing)) * 2)!important}:is(.tw\\:\\*\\*\\:data-\\[slot\\=kbd\\]\\:relative *)[data-slot=kbd]{position:relative}:is(.tw\\:\\*\\*\\:data-\\[slot\\=kbd\\]\\:isolate *)[data-slot=kbd]{isolation:isolate}:is(.tw\\:\\*\\*\\:data-\\[slot\\=kbd\\]\\:z-50 *)[data-slot=kbd]{z-index:50}:is(.tw\\:\\*\\*\\:data-\\[slot\\=kbd\\]\\:rounded-sm *)[data-slot=kbd]{border-radius:calc(var(--radius) * .6)}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:line-clamp-1>*)[data-slot=select-value]{-webkit-line-clamp:1;-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:flex>*)[data-slot=select-value]{display:flex}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:flex-1>*)[data-slot=select-value]{flex:1}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:items-center>*)[data-slot=select-value]{align-items:center}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:gap-1\\.5>*)[data-slot=select-value]{gap:calc(calc(var(--spacing)) * 1.5)}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:text-start>*)[data-slot=select-value]{text-align:start}.tw\\:group-data-horizontal\\/toggle-group\\:data-\\[spacing\\=0\\]\\:first\\:rounded-s-lg:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=horizontal]) *)[data-spacing="0"]:first-child{border-start-start-radius:var(--radius);border-end-start-radius:var(--radius)}.tw\\:group-data-vertical\\/toggle-group\\:data-\\[spacing\\=0\\]\\:first\\:rounded-t-lg:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=vertical]) *)[data-spacing="0"]:first-child{border-top-left-radius:var(--radius);border-top-right-radius:var(--radius)}.tw\\:group-data-horizontal\\/toggle-group\\:data-\\[spacing\\=0\\]\\:last\\:rounded-e-lg:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=horizontal]) *)[data-spacing="0"]:last-child{border-start-end-radius:var(--radius);border-end-end-radius:var(--radius)}.tw\\:group-data-vertical\\/toggle-group\\:data-\\[spacing\\=0\\]\\:last\\:rounded-b-lg:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=vertical]) *)[data-spacing="0"]:last-child{border-bottom-right-radius:var(--radius);border-bottom-left-radius:var(--radius)}.tw\\:data-\\[state\\=active\\]\\:bg-background[data-state=active]{background-color:var(--background)}.tw\\:data-\\[state\\=active\\]\\:text-foreground[data-state=active]{color:var(--foreground)}.tw\\:data-\\[state\\=active\\]\\:shadow-sm[data-state=active]{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:data-\\[state\\=closed\\]\\:overflow-hidden[data-state=closed]{overflow:hidden}.tw\\:data-\\[state\\=delayed-open\\]\\:animate-in[data-state=delayed-open]{animation:enter var(--tw-animation-duration,var(--tw-duration,.15s))var(--tw-ease,ease)var(--tw-animation-delay,0s)var(--tw-animation-iteration-count,1)var(--tw-animation-direction,normal)var(--tw-animation-fill-mode,none)}.tw\\:data-\\[state\\=delayed-open\\]\\:fade-in-0[data-state=delayed-open]{--tw-enter-opacity:0}.tw\\:data-\\[state\\=delayed-open\\]\\:zoom-in-95[data-state=delayed-open]{--tw-enter-scale:.95}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-soft-approved\\)\\][data-state=on]{background-color:var(--inv-soft-approved)}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-soft-unapproved\\)\\][data-state=on]{background-color:var(--inv-soft-unapproved)}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-soft-unknown\\)\\][data-state=on]{background-color:var(--inv-soft-unknown)}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-vivid-approved\\)\\][data-state=on]{background-color:var(--inv-vivid-approved)}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-vivid-unapproved\\)\\][data-state=on]{background-color:var(--inv-vivid-unapproved)}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-vivid-unknown\\)\\][data-state=on]{background-color:var(--inv-vivid-unknown)}.tw\\:data-\\[state\\=on\\]\\:bg-muted[data-state=on]{background-color:var(--muted)}.tw\\:data-\\[state\\=on\\]\\:text-\\[var\\(--inv-icon-approved\\)\\][data-state=on]{color:var(--inv-icon-approved)}.tw\\:data-\\[state\\=on\\]\\:text-\\[var\\(--inv-icon-unapproved\\)\\][data-state=on]{color:var(--inv-icon-unapproved)}.tw\\:data-\\[state\\=on\\]\\:text-\\[var\\(--inv-icon-unknown\\)\\][data-state=on]{color:var(--inv-icon-unknown)}.tw\\:data-\\[state\\=on\\]\\:text-\\[var\\(--inv-on\\)\\][data-state=on]{color:var(--inv-on)}.tw\\:data-\\[state\\=on\\]\\:text-foreground[data-state=on]{color:var(--foreground)}.tw\\:data-\\[state\\=open\\]\\:bg-accent[data-state=open]{background-color:var(--accent)}.tw\\:data-\\[state\\=open\\]\\:bg-muted[data-state=open]{background-color:var(--muted)}.tw\\:data-\\[state\\=open\\]\\:text-foreground[data-state=open]{color:var(--foreground)}.tw\\:data-\\[state\\=selected\\]\\:bg-muted[data-state=selected]{background-color:var(--muted)}.tw\\:data-\\[variant\\=destructive\\]\\:text-destructive[data-variant=destructive]{color:var(--destructive)}:is(:is(.tw\\:\\*\\*\\:data-\\[variant\\=destructive\\]\\:\\*\\*\\:text-accent-foreground\\! *)[data-variant=destructive] *),:is(.tw\\:\\*\\*\\:data-\\[variant\\=destructive\\]\\:text-accent-foreground\\! *)[data-variant=destructive]{color:var(--accent-foreground)!important}.tw\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-destructive\\/10[data-variant=destructive]:focus{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-destructive\\/10[data-variant=destructive]:focus{background-color:color-mix(in oklab, var(--destructive) 10%, transparent)}}.tw\\:data-\\[variant\\=destructive\\]\\:focus\\:text-destructive[data-variant=destructive]:focus{color:var(--destructive)}:is(.tw\\:\\*\\*\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-foreground\\/10\\! *)[data-variant=destructive]:focus{background-color:var(--foreground)!important}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-foreground\\/10\\! *)[data-variant=destructive]:focus{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)!important}}.tw\\:data-\\[variant\\=line\\]\\:rounded-none[data-variant=line]{border-radius:0}.tw\\:group-data-horizontal\\/toggle-group\\:data-\\[spacing\\=0\\]\\:data-\\[variant\\=outline\\]\\:border-s-0:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=horizontal]) *)[data-spacing="0"][data-variant=outline]{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:group-data-vertical\\/toggle-group\\:data-\\[spacing\\=0\\]\\:data-\\[variant\\=outline\\]\\:border-t-0:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=vertical]) *)[data-spacing="0"][data-variant=outline]{border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:group-data-horizontal\\/toggle-group\\:data-\\[spacing\\=0\\]\\:data-\\[variant\\=outline\\]\\:first\\:border-s:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=horizontal]) *)[data-spacing="0"][data-variant=outline]:first-child{border-inline-start-style:var(--tw-border-style);border-inline-start-width:1px}.tw\\:group-data-vertical\\/toggle-group\\:data-\\[spacing\\=0\\]\\:data-\\[variant\\=outline\\]\\:first\\:border-t:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=vertical]) *)[data-spacing="0"][data-variant=outline]:first-child{border-top-style:var(--tw-border-style);border-top-width:1px}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:inset-x-0[data-vaul-drawer-direction=bottom]{inset-inline:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:bottom-0[data-vaul-drawer-direction=bottom]{bottom:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:mt-24[data-vaul-drawer-direction=bottom]{margin-top:calc(calc(var(--spacing)) * 24)}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:max-h-\\[80vh\\][data-vaul-drawer-direction=bottom]{max-height:80vh}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:rounded-t-xl[data-vaul-drawer-direction=bottom]{border-top-left-radius:calc(var(--radius) * 1.4);border-top-right-radius:calc(var(--radius) * 1.4)}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:border-t[data-vaul-drawer-direction=bottom]{border-top-style:var(--tw-border-style);border-top-width:1px}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:inset-y-0[data-vaul-drawer-direction=left]{inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:left-0[data-vaul-drawer-direction=left]{left:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:w-3\\/4[data-vaul-drawer-direction=left]{width:75%}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:flex-row[data-vaul-drawer-direction=left]{flex-direction:row}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:rounded-r-xl[data-vaul-drawer-direction=left]{border-top-right-radius:calc(var(--radius) * 1.4);border-bottom-right-radius:calc(var(--radius) * 1.4)}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:border-r[data-vaul-drawer-direction=left]{border-right-style:var(--tw-border-style);border-right-width:1px}.tw\\:data-\\[vaul-drawer-direction\\=left\\/right\\]\\:flex-row[data-vaul-drawer-direction=left\\/right]{flex-direction:row}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:inset-y-0[data-vaul-drawer-direction=right]{inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:right-0[data-vaul-drawer-direction=right]{right:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:w-3\\/4[data-vaul-drawer-direction=right]{width:75%}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:flex-row[data-vaul-drawer-direction=right]{flex-direction:row}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:rounded-l-xl[data-vaul-drawer-direction=right]{border-top-left-radius:calc(var(--radius) * 1.4);border-bottom-left-radius:calc(var(--radius) * 1.4)}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:border-l[data-vaul-drawer-direction=right]{border-left-style:var(--tw-border-style);border-left-width:1px}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:inset-x-0[data-vaul-drawer-direction=top]{inset-inline:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:top-0[data-vaul-drawer-direction=top]{top:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:mb-24[data-vaul-drawer-direction=top]{margin-bottom:calc(calc(var(--spacing)) * 24)}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:max-h-\\[80vh\\][data-vaul-drawer-direction=top]{max-height:80vh}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:rounded-b-xl[data-vaul-drawer-direction=top]{border-bottom-right-radius:calc(var(--radius) * 1.4);border-bottom-left-radius:calc(var(--radius) * 1.4)}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:border-b[data-vaul-drawer-direction=top]{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}@supports ((-webkit-backdrop-filter:var(--tw)) or (backdrop-filter:var(--tw))){.tw\\:supports-backdrop-filter\\:backdrop-blur-xs{--tw-backdrop-blur:blur(var(--tw-blur-xs));-webkit-backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)}}@media (min-width:40rem){.tw\\:sm\\:flex{display:flex}.tw\\:sm\\:max-w-sm{max-width:var(--tw-container-sm)}.tw\\:sm\\:flex-row{flex-direction:row}.tw\\:sm\\:justify-end{justify-content:flex-end}.tw\\:sm\\:p-8{padding:calc(calc(var(--spacing)) * 8)}.tw\\:sm\\:text-start{text-align:start}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:sm\\:max-w-sm[data-vaul-drawer-direction=left],.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:sm\\:max-w-sm[data-vaul-drawer-direction=right]{max-width:var(--tw-container-sm)}}@media (min-width:48rem){.tw\\:md\\:block{display:block}.tw\\:md\\:flex{display:flex}.tw\\:md\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.tw\\:md\\:gap-0\\.5{gap:calc(calc(var(--spacing)) * .5)}.tw\\:md\\:text-start{text-align:start}.tw\\:md\\:text-sm{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:md\\:text-pretty{text-wrap:pretty}.tw\\:md\\:opacity-0{opacity:0}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:m-2:is(:where(.tw\\:peer)[data-variant=inset]~*){margin:calc(calc(var(--spacing)) * 2)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:ms-0:is(:where(.tw\\:peer)[data-variant=inset]~*){margin-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:rounded-xl:is(:where(.tw\\:peer)[data-variant=inset]~*){border-radius:calc(var(--radius) * 1.4)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:shadow-sm:is(:where(.tw\\:peer)[data-variant=inset]~*){--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:peer-data-\\[state\\=collapsed\\]\\:ms-2:is(:where(.tw\\:peer)[data-variant=inset]~*):is(:where(.tw\\:peer)[data-state=collapsed]~*){margin-inline-start:calc(calc(var(--spacing)) * 2)}.tw\\:md\\:after\\:hidden:after{content:var(--tw-content);display:none}}@media (min-width:64rem){.tw\\:lg\\:flex{display:flex}.tw\\:lg\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}:where(.tw\\:lg\\:space-x-8>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 8) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 8) * calc(1 - var(--tw-space-x-reverse)))}.tw\\:lg\\:text-5xl{font-size:var(--tw-text-5xl);line-height:var(--tw-leading,var(--tw-text-5xl--line-height))}}@media (min-width:48rem){@media (min-width:64rem){.tw\\:md\\:lg\\:hidden{display:none}}}@media (min-width:80rem){.tw\\:xl\\:auto-cols-fr{grid-auto-columns:minmax(0,1fr)}.tw\\:xl\\:grid-flow-col{grid-auto-flow:column}.tw\\:xl\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.tw\\:xl\\:grid-cols-none{grid-template-columns:none}.tw\\:xl\\:grid-rows-2{grid-template-rows:repeat(2,minmax(0,1fr))}}@container search not (min-width:7rem){.tw\\:\\@max-\\[7rem\\]\\/search\\:hidden{display:none}.tw\\:\\@max-\\[7rem\\]\\/search\\:ps-3{padding-inline-start:calc(calc(var(--spacing)) * 3)}}@container search not (min-width:4rem){.tw\\:\\@max-\\[4rem\\]\\/search\\:hidden{display:none}.tw\\:\\@max-\\[4rem\\]\\/search\\:pe-3{padding-inline-end:calc(calc(var(--spacing)) * 3)}}@container search not (min-width:3rem){.tw\\:\\@max-\\[3rem\\]\\/search\\:ps-0{padding-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:\\@max-\\[3rem\\]\\/search\\:pe-0{padding-inline-end:calc(calc(var(--spacing)) * 0)}}@container (min-width:24rem){.tw\\:\\@sm\\:basis-auto{flex-basis:auto}}.tw\\:ltr\\:left-2:where(:dir(ltr),[dir=ltr],[dir=ltr] *){left:calc(calc(var(--spacing)) * 2)}.tw\\:ltr\\:-translate-x-1\\/2:where(:dir(ltr),[dir=ltr],[dir=ltr] *){--tw-translate-x:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:right-2:where(:dir(rtl),[dir=rtl],[dir=rtl] *){right:calc(calc(var(--spacing)) * 2)}.tw\\:rtl\\:flex:where(:dir(rtl),[dir=rtl],[dir=rtl] *){display:flex}.tw\\:rtl\\:-translate-x-px:where(:dir(rtl),[dir=rtl],[dir=rtl] *){--tw-translate-x:-1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:translate-x-1\\/2:where(:dir(rtl),[dir=rtl],[dir=rtl] *){--tw-translate-x:calc(1 / 2 * 100%);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:translate-x-px:where(:dir(rtl),[dir=rtl],[dir=rtl] *){--tw-translate-x:1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:after\\:translate-x-1\\/2:where(:dir(rtl),[dir=rtl],[dir=rtl] *):after{content:var(--tw-content);--tw-translate-x:calc(1 / 2 * 100%);translate:var(--tw-translate-x) var(--tw-translate-y)}:where([data-side=primary]) .tw\\:rtl\\:in-data-\\[side\\=primary\\]\\:cursor-e-resize:where(:dir(rtl),[dir=rtl],[dir=rtl] *){cursor:e-resize}:where([data-side=secondary]) .tw\\:rtl\\:in-data-\\[side\\=secondary\\]\\:cursor-w-resize:where(:dir(rtl),[dir=rtl],[dir=rtl] *){cursor:w-resize}.tw\\:rtl\\:aria-\\[orientation\\=horizontal\\]\\:after\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *)[aria-orientation=horizontal]:after{content:var(--tw-content);--tw-translate-x:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:data-\\[side\\=left\\]\\:translate-x-1:where(:dir(rtl),[dir=rtl],[dir=rtl] *)[data-side=left]{--tw-translate-x:calc(calc(var(--spacing)) * 1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:data-\\[side\\=right\\]\\:-translate-x-1:where(:dir(rtl),[dir=rtl],[dir=rtl] *)[data-side=right]{--tw-translate-x:calc(calc(var(--spacing)) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:dark\\:border-input:is(.dark *){border-color:var(--input)}.tw\\:dark\\:bg-destructive\\/20:is(.dark *){background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:bg-destructive\\/20:is(.dark *){background-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:dark\\:bg-input\\/30:is(.dark *){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:bg-input\\/30:is(.dark *){background-color:color-mix(in oklab, var(--input) 30%, transparent)}}.tw\\:dark\\:bg-transparent:is(.dark *){background-color:#0000}.tw\\:dark\\:text-amber-400:is(.dark *){color:var(--tw-color-amber-400)}.tw\\:dark\\:text-muted-foreground:is(.dark *){color:var(--muted-foreground)}.tw\\:dark\\:text-rose-400:is(.dark *){color:var(--tw-color-rose-400)}.tw\\:dark\\:text-sky-400:is(.dark *){color:var(--tw-color-sky-400)}.tw\\:dark\\:text-teal-400:is(.dark *){color:var(--tw-color-teal-400)}.tw\\:dark\\:after\\:mix-blend-lighten:is(.dark *):after{content:var(--tw-content);mix-blend-mode:lighten}@media (hover:hover){.tw\\:dark\\:hover\\:bg-blue-500:is(.dark *):hover{background-color:var(--tw-color-blue-500)}.tw\\:dark\\:hover\\:bg-destructive\\/30:is(.dark *):hover{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:hover\\:bg-destructive\\/30:is(.dark *):hover{background-color:color-mix(in oklab, var(--destructive) 30%, transparent)}}.tw\\:dark\\:hover\\:bg-input\\/50:is(.dark *):hover{background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:hover\\:bg-input\\/50:is(.dark *):hover{background-color:color-mix(in oklab, var(--input) 50%, transparent)}}.tw\\:dark\\:hover\\:bg-muted\\/50:is(.dark *):hover{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:hover\\:bg-muted\\/50:is(.dark *):hover{background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:dark\\:hover\\:text-foreground:is(.dark *):hover{color:var(--foreground)}}.tw\\:dark\\:focus-visible\\:ring-destructive\\/40:is(.dark *):focus-visible{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:focus-visible\\:ring-destructive\\/40:is(.dark *):focus-visible{--tw-ring-color:color-mix(in oklab, var(--destructive) 40%, transparent)}}.tw\\:dark\\:disabled\\:bg-input\\/80:is(.dark *):disabled{background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:disabled\\:bg-input\\/80:is(.dark *):disabled{background-color:color-mix(in oklab, var(--input) 80%, transparent)}}.tw\\:dark\\:disabled\\:bg-transparent:is(.dark *):disabled{background-color:#0000}:where([data-slot=tooltip-content]) .tw\\:dark\\:in-data-\\[slot\\=tooltip-content\\]\\:bg-background\\/10:is(.dark *){background-color:var(--background)}@supports (color:color-mix(in lab, red, red)){:where([data-slot=tooltip-content]) .tw\\:dark\\:in-data-\\[slot\\=tooltip-content\\]\\:bg-background\\/10:is(.dark *){background-color:color-mix(in oklab, var(--background) 10%, transparent)}}.tw\\:dark\\:has-disabled\\:bg-input\\/80:is(.dark *):has(:disabled){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:has-disabled\\:bg-input\\/80:is(.dark *):has(:disabled){background-color:color-mix(in oklab, var(--input) 80%, transparent)}}.tw\\:dark\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-destructive\\/40:is(.dark *):has([data-slot][aria-invalid=true]){--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-destructive\\/40:is(.dark *):has([data-slot][aria-invalid=true]){--tw-ring-color:color-mix(in oklab, var(--destructive) 40%, transparent)}}.tw\\:dark\\:aria-invalid\\:border-destructive\\/50:is(.dark *)[aria-invalid=true]{border-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:aria-invalid\\:border-destructive\\/50:is(.dark *)[aria-invalid=true]{border-color:color-mix(in oklab, var(--destructive) 50%, transparent)}}.tw\\:dark\\:aria-invalid\\:ring-destructive\\/40:is(.dark *)[aria-invalid=true]{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:aria-invalid\\:ring-destructive\\/40:is(.dark *)[aria-invalid=true]{--tw-ring-color:color-mix(in oklab, var(--destructive) 40%, transparent)}}.tw\\:dark\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-destructive\\/20:is(.dark *)[data-variant=destructive]:focus{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-destructive\\/20:is(.dark *)[data-variant=destructive]:focus{background-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:data-open\\:animate-in:where([data-state=open]),.tw\\:data-open\\:animate-in:where([data-open]:not([data-open=false])){animation:enter var(--tw-animation-duration,var(--tw-duration,.15s))var(--tw-ease,ease)var(--tw-animation-delay,0s)var(--tw-animation-iteration-count,1)var(--tw-animation-direction,normal)var(--tw-animation-fill-mode,none)}.tw\\:data-open\\:bg-accent:where([data-state=open]),.tw\\:data-open\\:bg-accent:where([data-open]:not([data-open=false])){background-color:var(--accent)}.tw\\:data-open\\:text-accent-foreground:where([data-state=open]),.tw\\:data-open\\:text-accent-foreground:where([data-open]:not([data-open=false])){color:var(--accent-foreground)}.tw\\:data-open\\:fade-in-0:where([data-state=open]),.tw\\:data-open\\:fade-in-0:where([data-open]:not([data-open=false])){--tw-enter-opacity:0}.tw\\:data-open\\:zoom-in-95:where([data-state=open]),.tw\\:data-open\\:zoom-in-95:where([data-open]:not([data-open=false])){--tw-enter-scale:.95}@media (hover:hover){:is(.tw\\:data-open\\:hover\\:bg-sidebar-accent:where([data-state=open]),.tw\\:data-open\\:hover\\:bg-sidebar-accent:where([data-open]:not([data-open=false]))):hover{background-color:var(--sidebar-accent)}:is(.tw\\:data-open\\:hover\\:text-sidebar-accent-foreground:where([data-state=open]),.tw\\:data-open\\:hover\\:text-sidebar-accent-foreground:where([data-open]:not([data-open=false]))):hover{color:var(--sidebar-accent-foreground)}}.tw\\:data-closed\\:animate-out:where([data-state=closed]),.tw\\:data-closed\\:animate-out:where([data-closed]:not([data-closed=false])){animation:exit var(--tw-animation-duration,var(--tw-duration,.15s))var(--tw-ease,ease)var(--tw-animation-delay,0s)var(--tw-animation-iteration-count,1)var(--tw-animation-direction,normal)var(--tw-animation-fill-mode,none)}.tw\\:data-closed\\:fade-out-0:where([data-state=closed]),.tw\\:data-closed\\:fade-out-0:where([data-closed]:not([data-closed=false])){--tw-exit-opacity:0}.tw\\:data-closed\\:zoom-out-95:where([data-state=closed]),.tw\\:data-closed\\:zoom-out-95:where([data-closed]:not([data-closed=false])){--tw-exit-scale:.95}.tw\\:data-checked\\:border-primary:where([data-state=checked]),.tw\\:data-checked\\:border-primary:where([data-checked]:not([data-checked=false])){border-color:var(--primary)}.tw\\:data-checked\\:bg-primary:where([data-state=checked]),.tw\\:data-checked\\:bg-primary:where([data-checked]:not([data-checked=false])){background-color:var(--primary)}.tw\\:data-checked\\:text-primary-foreground:where([data-state=checked]),.tw\\:data-checked\\:text-primary-foreground:where([data-checked]:not([data-checked=false])){color:var(--primary-foreground)}.tw\\:group-data-\\[size\\=default\\]\\/switch\\:data-checked\\:translate-x-\\[calc\\(100\\%-2px\\)\\]:is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-state=checked]),.tw\\:group-data-\\[size\\=default\\]\\/switch\\:data-checked\\:translate-x-\\[calc\\(100\\%-2px\\)\\]:is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-checked]:not([data-checked=false])),.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:data-checked\\:translate-x-\\[calc\\(100\\%-2px\\)\\]:is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-state=checked]),.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:data-checked\\:translate-x-\\[calc\\(100\\%-2px\\)\\]:is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-checked]:not([data-checked=false])){--tw-translate-x:calc(100% - 2px);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:group-data-\\[size\\=default\\]\\/switch\\:data-checked\\:-translate-x-\\[calc\\(100\\%-2px\\)\\]:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-state=checked]),.tw\\:rtl\\:group-data-\\[size\\=default\\]\\/switch\\:data-checked\\:-translate-x-\\[calc\\(100\\%-2px\\)\\]:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-checked]:not([data-checked=false])),.tw\\:rtl\\:group-data-\\[size\\=sm\\]\\/switch\\:data-checked\\:-translate-x-\\[calc\\(100\\%-2px\\)\\]:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-state=checked]),.tw\\:rtl\\:group-data-\\[size\\=sm\\]\\/switch\\:data-checked\\:-translate-x-\\[calc\\(100\\%-2px\\)\\]:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-checked]:not([data-checked=false])){--tw-translate-x:calc(calc(100% - 2px) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:dark\\:data-checked\\:bg-primary:is(.dark *):where([data-state=checked]),.tw\\:dark\\:data-checked\\:bg-primary:is(.dark *):where([data-checked]:not([data-checked=false])){background-color:var(--primary)}.tw\\:dark\\:data-checked\\:bg-primary-foreground:is(.dark *):where([data-state=checked]),.tw\\:dark\\:data-checked\\:bg-primary-foreground:is(.dark *):where([data-checked]:not([data-checked=false])){background-color:var(--primary-foreground)}.tw\\:data-unchecked\\:bg-input:where([data-state=unchecked]),.tw\\:data-unchecked\\:bg-input:where([data-unchecked]:not([data-unchecked=false])){background-color:var(--input)}.tw\\:group-data-\\[size\\=default\\]\\/switch\\:data-unchecked\\:translate-x-0:is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-state=unchecked]),.tw\\:group-data-\\[size\\=default\\]\\/switch\\:data-unchecked\\:translate-x-0:is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-unchecked]:not([data-unchecked=false])),.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:data-unchecked\\:translate-x-0:is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-state=unchecked]),.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:data-unchecked\\:translate-x-0:is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-unchecked]:not([data-unchecked=false])),.tw\\:rtl\\:group-data-\\[size\\=default\\]\\/switch\\:data-unchecked\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-state=unchecked]),.tw\\:rtl\\:group-data-\\[size\\=default\\]\\/switch\\:data-unchecked\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-unchecked]:not([data-unchecked=false])),.tw\\:rtl\\:group-data-\\[size\\=sm\\]\\/switch\\:data-unchecked\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-state=unchecked]),.tw\\:rtl\\:group-data-\\[size\\=sm\\]\\/switch\\:data-unchecked\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-unchecked]:not([data-unchecked=false])){--tw-translate-x:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:dark\\:data-unchecked\\:bg-foreground:is(.dark *):where([data-state=unchecked]),.tw\\:dark\\:data-unchecked\\:bg-foreground:is(.dark *):where([data-unchecked]:not([data-unchecked=false])){background-color:var(--foreground)}.tw\\:dark\\:data-unchecked\\:bg-input\\/80:is(.dark *):where([data-state=unchecked]),.tw\\:dark\\:data-unchecked\\:bg-input\\/80:is(.dark *):where([data-unchecked]:not([data-unchecked=false])){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:data-unchecked\\:bg-input\\/80:is(.dark *):where([data-state=unchecked]),.tw\\:dark\\:data-unchecked\\:bg-input\\/80:is(.dark *):where([data-unchecked]:not([data-unchecked=false])){background-color:color-mix(in oklab, var(--input) 80%, transparent)}}.tw\\:data-selected\\:bg-muted:where([data-selected=true]){background-color:var(--muted)}.tw\\:data-selected\\:text-foreground:where([data-selected=true]){color:var(--foreground)}.tw\\:data-disabled\\:pointer-events-none:where([data-disabled=true]),.tw\\:data-disabled\\:pointer-events-none:where([data-disabled]:not([data-disabled=false])){pointer-events:none}.tw\\:data-disabled\\:cursor-not-allowed:where([data-disabled=true]),.tw\\:data-disabled\\:cursor-not-allowed:where([data-disabled]:not([data-disabled=false])){cursor:not-allowed}.tw\\:data-disabled\\:opacity-50:where([data-disabled=true]),.tw\\:data-disabled\\:opacity-50:where([data-disabled]:not([data-disabled=false])){opacity:.5}.tw\\:data-active\\:bg-background:where([data-state=active]),.tw\\:data-active\\:bg-background:where([data-active]:not([data-active=false])){background-color:var(--background)}.tw\\:data-active\\:bg-sidebar-accent:where([data-state=active]),.tw\\:data-active\\:bg-sidebar-accent:where([data-active]:not([data-active=false])){background-color:var(--sidebar-accent)}.tw\\:data-active\\:font-medium:where([data-state=active]),.tw\\:data-active\\:font-medium:where([data-active]:not([data-active=false])){--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}.tw\\:data-active\\:text-foreground:where([data-state=active]),.tw\\:data-active\\:text-foreground:where([data-active]:not([data-active=false])){color:var(--foreground)}.tw\\:data-active\\:text-sidebar-accent-foreground:where([data-state=active]),.tw\\:data-active\\:text-sidebar-accent-foreground:where([data-active]:not([data-active=false])){color:var(--sidebar-accent-foreground)}.tw\\:group-data-\\[variant\\=default\\]\\/tabs-list\\:data-active\\:shadow-sm:is(:where(.tw\\:group\\/tabs-list)[data-variant=default] *):where([data-state=active]),.tw\\:group-data-\\[variant\\=default\\]\\/tabs-list\\:data-active\\:shadow-sm:is(:where(.tw\\:group\\/tabs-list)[data-variant=default] *):where([data-active]:not([data-active=false])){--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:bg-transparent:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:bg-transparent:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false])){background-color:#0000}.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:shadow-none:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:shadow-none:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false])){--tw-shadow:0 0 #0000;box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}:is(.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:after\\:opacity-100:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:after\\:opacity-100:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false]))):after{content:var(--tw-content);opacity:1}.tw\\:dark\\:data-active\\:border-input:is(.dark *):where([data-state=active]),.tw\\:dark\\:data-active\\:border-input:is(.dark *):where([data-active]:not([data-active=false])){border-color:var(--input)}.tw\\:dark\\:data-active\\:bg-input\\/30:is(.dark *):where([data-state=active]),.tw\\:dark\\:data-active\\:bg-input\\/30:is(.dark *):where([data-active]:not([data-active=false])){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:data-active\\:bg-input\\/30:is(.dark *):where([data-state=active]),.tw\\:dark\\:data-active\\:bg-input\\/30:is(.dark *):where([data-active]:not([data-active=false])){background-color:color-mix(in oklab, var(--input) 30%, transparent)}}.tw\\:dark\\:data-active\\:text-foreground:is(.dark *):where([data-state=active]),.tw\\:dark\\:data-active\\:text-foreground:is(.dark *):where([data-active]:not([data-active=false])){color:var(--foreground)}.tw\\:dark\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:border-transparent:is(.dark *):is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:dark\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:border-transparent:is(.dark *):is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false])){border-color:#0000}.tw\\:dark\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:bg-transparent:is(.dark *):is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:dark\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:bg-transparent:is(.dark *):is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false])){background-color:#0000}.tw\\:data-horizontal\\:mx-px:where([data-orientation=horizontal]){margin-inline:1px}.tw\\:data-horizontal\\:h-1:where([data-orientation=horizontal]){height:calc(calc(var(--spacing)) * 1)}.tw\\:data-horizontal\\:h-full:where([data-orientation=horizontal]){height:100%}.tw\\:data-horizontal\\:h-px:where([data-orientation=horizontal]){height:1px}.tw\\:data-horizontal\\:w-auto:where([data-orientation=horizontal]){width:auto}.tw\\:data-horizontal\\:w-full:where([data-orientation=horizontal]){width:100%}.tw\\:data-horizontal\\:flex-col:where([data-orientation=horizontal]){flex-direction:column}.tw\\:data-vertical\\:my-px:where([data-orientation=vertical]){margin-block:1px}.tw\\:data-vertical\\:h-auto:where([data-orientation=vertical]){height:auto}.tw\\:data-vertical\\:h-full:where([data-orientation=vertical]){height:100%}.tw\\:data-vertical\\:min-h-40:where([data-orientation=vertical]){min-height:calc(calc(var(--spacing)) * 40)}.tw\\:data-vertical\\:w-1:where([data-orientation=vertical]){width:calc(calc(var(--spacing)) * 1)}.tw\\:data-vertical\\:w-auto:where([data-orientation=vertical]){width:auto}.tw\\:data-vertical\\:w-full:where([data-orientation=vertical]){width:100%}.tw\\:data-vertical\\:w-px:where([data-orientation=vertical]){width:1px}.tw\\:data-vertical\\:flex-col:where([data-orientation=vertical]){flex-direction:column}.tw\\:data-vertical\\:items-stretch:where([data-orientation=vertical]){align-items:stretch}.tw\\:data-vertical\\:self-stretch:where([data-orientation=vertical]){align-self:stretch}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:mt-0 [data-lexical-editor=true]>blockquote{margin-top:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:border-s-0 [data-lexical-editor=true]>blockquote{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:ps-0 [data-lexical-editor=true]>blockquote{padding-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:font-normal [data-lexical-editor=true]>blockquote{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:text-foreground [data-lexical-editor=true]>blockquote{color:var(--foreground)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:not-italic [data-lexical-editor=true]>blockquote{font-style:normal}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:mt-0 [data-lexical-editor=\\"true\\"]>blockquote{margin-top:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:border-s-0 [data-lexical-editor=\\"true\\"]>blockquote{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:ps-0 [data-lexical-editor=\\"true\\"]>blockquote{padding-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:font-normal [data-lexical-editor=\\"true\\"]>blockquote{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:text-foreground [data-lexical-editor=\\"true\\"]>blockquote{color:var(--foreground)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:not-italic [data-lexical-editor=\\"true\\"]>blockquote{font-style:normal}.tw\\:\\[\\&_a\\]\\:underline a{text-decoration-line:underline}.tw\\:\\[\\&_a\\]\\:underline-offset-3 a{text-underline-offset:3px}@media (hover:hover){.tw\\:\\[\\&_a\\]\\:hover\\:text-foreground a:hover{color:var(--foreground)}}.tw\\:\\[\\&_p\\]\\:my-0 p{margin-block:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_p\\:not\\(\\:last-child\\)\\]\\:mb-4 p:not(:last-child){margin-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&_s\\]\\:text-destructive s{color:var(--destructive)}.tw\\:\\[\\&_s\\]\\:line-through s{text-decoration-line:line-through}.tw\\:\\[\\&_svg\\]\\:pointer-events-none svg{pointer-events:none}.tw\\:\\[\\&_svg\\]\\:size-4 svg{width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&_svg\\]\\:shrink-0 svg{flex-shrink:0}.tw\\:\\[\\&_svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-3 svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:\\[\\&_svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-3\\.5 svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 3.5);height:calc(calc(var(--spacing)) * 3.5)}.tw\\:\\[\\&_svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-4 svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&_tr\\]\\:border-b tr{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}.tw\\:\\[\\&_tr\\:last-child\\]\\:border-0 tr:last-child{border-style:var(--tw-border-style);border-width:0}.tw\\:\\[\\&_u\\]\\:font-semibold u{--tw-font-weight:var(--tw-font-weight-semibold);font-weight:var(--tw-font-weight-semibold)}.tw\\:\\[\\&_u\\]\\:text-success-foreground u{color:var(--success-foreground)}.tw\\:\\[\\&_u\\]\\:no-underline u{text-decoration-line:none}.tw\\:\\[\\&\\:has\\(\\[role\\=checkbox\\]\\)\\]\\:pe-0:has([role=checkbox]){padding-inline-end:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\.border-b\\]\\:pb-2.border-b{padding-bottom:calc(calc(var(--spacing)) * 2)}.tw\\:\\[\\.border-b\\]\\:pb-4.border-b{padding-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[size\\=sm\\]\\/card\\:\\[\\.border-b\\]\\:pb-3:is(:where(.tw\\:group\\/card)[data-size=sm] *).border-b{padding-bottom:calc(calc(var(--spacing)) * 3)}.tw\\:\\[\\.border-t\\]\\:pt-2.border-t{padding-top:calc(calc(var(--spacing)) * 2)}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:px-2 *)[cmdk-group-heading]{padding-inline:calc(calc(var(--spacing)) * 2)}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:py-1\\.5 *)[cmdk-group-heading]{padding-block:calc(calc(var(--spacing)) * 1.5)}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:text-xs *)[cmdk-group-heading]{font-size:var(--tw-text-xs);line-height:var(--tw-leading,var(--tw-text-xs--line-height))}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:font-medium *)[cmdk-group-heading]{--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:text-muted-foreground *)[cmdk-group-heading]{color:var(--muted-foreground)}:is(.tw\\:\\*\\:\\[a\\]\\:underline>*):is(a){text-decoration-line:underline}:is(.tw\\:\\*\\:\\[a\\]\\:underline-offset-3>*):is(a){text-underline-offset:3px}@media (hover:hover){.tw\\:\\[a\\]\\:hover\\:bg-destructive\\/20:is(a):hover{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:\\[a\\]\\:hover\\:bg-destructive\\/20:is(a):hover{background-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:\\[a\\]\\:hover\\:bg-muted:is(a):hover{background-color:var(--muted)}.tw\\:\\[a\\]\\:hover\\:bg-primary\\/80:is(a):hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:\\[a\\]\\:hover\\:bg-primary\\/80:is(a):hover{background-color:color-mix(in oklab, var(--primary) 80%, transparent)}}.tw\\:\\[a\\]\\:hover\\:bg-secondary\\/80:is(a):hover{background-color:var(--secondary)}@supports (color:color-mix(in lab, red, red)){.tw\\:\\[a\\]\\:hover\\:bg-secondary\\/80:is(a):hover{background-color:color-mix(in oklab, var(--secondary) 80%, transparent)}}.tw\\:\\[a\\]\\:hover\\:text-muted-foreground:is(a):hover{color:var(--muted-foreground)}:is(.tw\\:\\*\\:\\[a\\]\\:hover\\:text-foreground>*):is(a):hover{color:var(--foreground)}}:is(.tw\\:\\*\\:\\[img\\]\\:row-span-2>*):is(img){grid-row:span 2/span 2}:is(.tw\\:\\*\\:\\[img\\]\\:translate-y-0\\.5>*):is(img){--tw-translate-y:calc(calc(var(--spacing)) * .5);translate:var(--tw-translate-x) var(--tw-translate-y)}:is(.tw\\:\\*\\:\\[img\\]\\:text-current>*):is(img){color:currentColor}:is(.tw\\:\\*\\:\\[img\\:first-child\\]\\:rounded-t-xl>*):is(img:first-child){border-top-left-radius:calc(var(--radius) * 1.4);border-top-right-radius:calc(var(--radius) * 1.4)}:is(.tw\\:\\*\\:\\[img\\:last-child\\]\\:rounded-b-xl>*):is(img:last-child){border-bottom-right-radius:calc(var(--radius) * 1.4);border-bottom-left-radius:calc(var(--radius) * 1.4)}:is(.tw\\:\\*\\:\\[img\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-4>*):is(img:not([class*=size-])){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}:is(.tw\\:\\*\\:\\[span\\]\\:last\\:flex>*):is(span):last-child{display:flex}:is(.tw\\:\\*\\:\\[span\\]\\:last\\:items-center>*):is(span):last-child{align-items:center}:is(.tw\\:\\*\\:\\[span\\]\\:last\\:gap-2>*):is(span):last-child{gap:calc(calc(var(--spacing)) * 2)}:is(.tw\\:\\*\\:\\[svg\\]\\:row-span-2>*):is(svg){grid-row:span 2/span 2}:is(.tw\\:\\*\\:\\[svg\\]\\:translate-y-0\\.5>*):is(svg){--tw-translate-y:calc(calc(var(--spacing)) * .5);translate:var(--tw-translate-x) var(--tw-translate-y)}:is(.tw\\:\\*\\:\\[svg\\]\\:text-current>*):is(svg){color:currentColor}:is(.tw\\:focus\\:\\*\\:\\[svg\\]\\:text-accent-foreground:focus>*):is(svg){color:var(--accent-foreground)}:is(.tw\\:data-\\[variant\\=destructive\\]\\:\\*\\:\\[svg\\]\\:text-destructive[data-variant=destructive]>*):is(svg){color:var(--destructive)}:is(.tw\\:data-\\[variant\\=destructive\\]\\:\\*\\:\\[svg\\]\\:text-destructive\\![data-variant=destructive]>*):is(svg){color:var(--destructive)!important}:is(.tw\\:data-selected\\:\\*\\:\\[svg\\]\\:text-foreground:where([data-selected=true])>*):is(svg){color:var(--foreground)}:is(.tw\\:\\*\\:\\[svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-4>*):is(svg:not([class*=size-])){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:rounded-s-none>:not(:first-child){border-start-start-radius:0;border-end-start-radius:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:rounded-t-none>:not(:first-child){border-top-left-radius:0;border-top-right-radius:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:border-s-0>:not(:first-child){border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:border-t-0>:not(:first-child){border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:last-child\\)\\]\\:rounded-e-none>:not(:last-child){border-start-end-radius:0;border-end-end-radius:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:last-child\\)\\]\\:rounded-b-none>:not(:last-child){border-bottom-right-radius:0;border-bottom-left-radius:0}.tw\\:has-\\[select\\[aria-hidden\\=true\\]\\:last-child\\]\\:\\[\\&\\>\\[data-slot\\=select-trigger\\]\\:last-of-type\\]\\:rounded-e-lg:has(:is(select[aria-hidden=true]:last-child))>[data-slot=select-trigger]:last-of-type{border-start-end-radius:var(--radius);border-end-end-radius:var(--radius)}.tw\\:\\[\\&\\>\\[data-slot\\=select-trigger\\]\\:not\\(\\[class\\*\\=w-\\]\\)\\]\\:w-fit>[data-slot=select-trigger]:not([class*=w-]){width:fit-content}.tw\\:\\[\\&\\>\\[data-slot\\]\\:not\\(\\:has\\(\\~\\[data-slot\\]\\)\\)\\]\\:rounded-e-lg\\!>[data-slot]:not(:has(~[data-slot])){border-start-end-radius:var(--radius)!important;border-end-end-radius:var(--radius)!important}.tw\\:\\[\\&\\>\\[data-slot\\]\\:not\\(\\:has\\(\\~\\[data-slot\\]\\)\\)\\]\\:rounded-b-lg\\!>[data-slot]:not(:has(~[data-slot])){border-bottom-right-radius:var(--radius)!important;border-bottom-left-radius:var(--radius)!important}.tw\\:\\[\\&\\>blockquote\\]\\:my-0>blockquote{margin-block:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&\\>blockquote\\]\\:border-s-0>blockquote{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&\\>blockquote\\]\\:p-0>blockquote{padding:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&\\>blockquote\\]\\:ps-0>blockquote{padding-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&\\>blockquote\\]\\:font-normal>blockquote{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:\\[\\&\\>blockquote\\]\\:text-foreground>blockquote{color:var(--foreground)}.tw\\:\\[\\&\\>blockquote\\]\\:not-italic>blockquote{font-style:normal}.tw\\:\\[\\&\\>input\\]\\:flex-1>input{flex:1}.tw\\:has-\\[\\>\\[data-align\\=block-end\\]\\]\\:\\[\\&\\>input\\]\\:pt-3:has(>[data-align=block-end])>input{padding-top:calc(calc(var(--spacing)) * 3)}.tw\\:has-\\[\\>\\[data-align\\=block-start\\]\\]\\:\\[\\&\\>input\\]\\:pb-3:has(>[data-align=block-start])>input{padding-bottom:calc(calc(var(--spacing)) * 3)}.tw\\:has-\\[\\>\\[data-align\\=inline-end\\]\\]\\:\\[\\&\\>input\\]\\:pe-1\\.5:has(>[data-align=inline-end])>input{padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-\\[\\>\\[data-align\\=inline-start\\]\\]\\:\\[\\&\\>input\\]\\:ps-1\\.5:has(>[data-align=inline-start])>input{padding-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:\\[\\&\\>kbd\\]\\:rounded-\\[calc\\(var\\(--radius\\)-5px\\)\\]>kbd{border-radius:calc(var(--radius) - 5px)}.tw\\:\\[\\&\\>li\\]\\:mt-2>li{margin-top:calc(calc(var(--spacing)) * 2)}.tw\\:\\[\\&\\>span\\:last-child\\]\\:truncate>span:last-child{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.tw\\:\\[\\&\\>svg\\]\\:pointer-events-none>svg{pointer-events:none}.tw\\:\\[\\&\\>svg\\]\\:size-3\\!>svg{width:calc(calc(var(--spacing)) * 3)!important;height:calc(calc(var(--spacing)) * 3)!important}.tw\\:\\[\\&\\>svg\\]\\:size-3\\.5>svg{width:calc(calc(var(--spacing)) * 3.5);height:calc(calc(var(--spacing)) * 3.5)}.tw\\:\\[\\&\\>svg\\]\\:size-4>svg{width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&\\>svg\\]\\:shrink-0>svg{flex-shrink:0}.tw\\:\\[\\&\\>svg\\]\\:text-sidebar-accent-foreground>svg{color:var(--sidebar-accent-foreground)}.tw\\:group-has-data-\\[size\\=lg\\]\\/avatar-group\\:\\[\\&\\>svg\\]\\:size-5:is(:where(.tw\\:group\\/avatar-group):has([data-size=lg]) *)>svg{width:calc(calc(var(--spacing)) * 5);height:calc(calc(var(--spacing)) * 5)}.tw\\:group-has-data-\\[size\\=sm\\]\\/avatar-group\\:\\[\\&\\>svg\\]\\:size-3:is(:where(.tw\\:group\\/avatar-group):has([data-size=sm]) *)>svg{width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[size\\=default\\]\\/avatar\\:\\[\\&\\>svg\\]\\:size-2:is(:where(.tw\\:group\\/avatar)[data-size=default] *)>svg,.tw\\:group-data-\\[size\\=lg\\]\\/avatar\\:\\[\\&\\>svg\\]\\:size-2:is(:where(.tw\\:group\\/avatar)[data-size=lg] *)>svg{width:calc(calc(var(--spacing)) * 2);height:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[size\\=sm\\]\\/avatar\\:\\[\\&\\>svg\\]\\:hidden:is(:where(.tw\\:group\\/avatar)[data-size=sm] *)>svg{display:none}.tw\\:\\[\\&\\>svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-3\\.5>svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 3.5);height:calc(calc(var(--spacing)) * 3.5)}.tw\\:\\[\\&\\>svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-4>svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&\\>tr\\]\\:last\\:border-b-0>tr:last-child{border-bottom-style:var(--tw-border-style);border-bottom-width:0}.tw\\:\\[\\&\\[align\\=center\\]\\]\\:text-center[align=center]{text-align:center}.tw\\:\\[\\&\\[align\\=right\\]\\]\\:text-right[align=right]{text-align:right}.tw\\:\\[\\&\\[aria-orientation\\=horizontal\\]\\>div\\]\\:rotate-90[aria-orientation=horizontal]>div{rotate:90deg}[data-side=primary][data-collapsible=offcanvas] .tw\\:\\[\\[data-side\\=primary\\]\\[data-collapsible\\=offcanvas\\]_\\&\\]\\:-end-2{inset-inline-end:calc(calc(var(--spacing)) * -2)}[data-side=primary][data-state=collapsed] .tw\\:\\[\\[data-side\\=primary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-e-resize{cursor:e-resize}[data-side=primary][data-state=collapsed] .tw\\:rtl\\:\\[\\[data-side\\=primary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-w-resize:where(:dir(rtl),[dir=rtl],[dir=rtl] *){cursor:w-resize}[data-side=secondary][data-collapsible=offcanvas] .tw\\:\\[\\[data-side\\=secondary\\]\\[data-collapsible\\=offcanvas\\]_\\&\\]\\:-start-2{inset-inline-start:calc(calc(var(--spacing)) * -2)}[data-side=secondary][data-state=collapsed] .tw\\:\\[\\[data-side\\=secondary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-w-resize{cursor:w-resize}[data-side=secondary][data-state=collapsed] .tw\\:rtl\\:\\[\\[data-side\\=secondary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-e-resize:where(:dir(rtl),[dir=rtl],[dir=rtl] *){cursor:e-resize}}@property --tw-animation-delay{syntax:"*";inherits:false;initial-value:0s}@property --tw-animation-direction{syntax:"*";inherits:false;initial-value:normal}@property --tw-animation-duration{syntax:"*";inherits:false}@property --tw-animation-fill-mode{syntax:"*";inherits:false;initial-value:none}@property --tw-animation-iteration-count{syntax:"*";inherits:false;initial-value:1}@property --tw-enter-blur{syntax:"*";inherits:false;initial-value:0}@property --tw-enter-opacity{syntax:"*";inherits:false;initial-value:1}@property --tw-enter-rotate{syntax:"*";inherits:false;initial-value:0}@property --tw-enter-scale{syntax:"*";inherits:false;initial-value:1}@property --tw-enter-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-enter-translate-y{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-blur{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-opacity{syntax:"*";inherits:false;initial-value:1}@property --tw-exit-rotate{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-scale{syntax:"*";inherits:false;initial-value:1}@property --tw-exit-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-translate-y{syntax:"*";inherits:false;initial-value:0}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-cyrillic-ext-wght-normal.woff2)format("woff2-variations");unicode-range:U+460-52F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-cyrillic-wght-normal.woff2)format("woff2-variations");unicode-range:U+301,U+400-45F,U+490-491,U+4B0-4B1,U+2116}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-greek-wght-normal.woff2)format("woff2-variations");unicode-range:U+370-377,U+37A-37F,U+384-38A,U+38C,U+38E-3A1,U+3A3-3FF}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-vietnamese-wght-normal.woff2)format("woff2-variations");unicode-range:U+102-103,U+110-111,U+128-129,U+168-169,U+1A0-1A1,U+1AF-1B0,U+300-301,U+303-304,U+308-309,U+323,U+329,U+1EA0-1EF9,U+20AB}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-latin-ext-wght-normal.woff2)format("woff2-variations");unicode-range:U+100-2BA,U+2BD-2C5,U+2C7-2CC,U+2CE-2D7,U+2DD-2FF,U+304,U+308,U+329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-latin-wght-normal.woff2)format("woff2-variations");unicode-range:U+??,U+131,U+152-153,U+2BB-2BC,U+2C6,U+2DA,U+2DC,U+304,U+308,U+329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}.light,:root{--radius:.625rem;--spacing:.25rem;--background:oklch(100% 0 0);--foreground:oklch(13.71% .036 258.53);--card:oklch(100% 0 0);--card-foreground:oklch(13.71% .036 258.53);--popover:oklch(98.43% .0018 248.56);--popover-foreground:oklch(13.71% .036 258.53);--primary:oklch(20.79% .0399 265.73);--primary-foreground:oklch(98.38% .0036 248.23);--secondary:oklch(95.89% .011 248.06);--secondary-foreground:oklch(20.79% .0399 265.73);--muted:oklch(95.89% .011 248.06);--muted-foreground:oklch(55.47% .0408 257.45);--accent:oklch(95.89% .011 248.06);--accent-foreground:oklch(20.79% .0399 265.73);--destructive:oklch(63.69% .2077 25.32);--destructive-foreground:oklch(98.38% .0036 248.23);--success-foreground:oklch(62.7% .194 149.214);--diff-deleted:oklch(57.7% .245 27.325);--warning:oklch(84% .16 84);--warning-foreground:oklch(28% .07 46);--border:oklch(92.9% .0127 255.58);--input:oklch(92.9% .0127 255.58);--ring:oklch(13.71% .036 258.53);--chart-1:oklch(64.6% .222 41.116);--chart-2:oklch(60% .118 184.704);--chart-3:oklch(39.8% .07 227.392);--chart-4:oklch(82.8% .189 84.429);--chart-5:oklch(76.9% .188 70.08);--sidebar:oklch(98.43% .0018 248.56);--sidebar-foreground:oklch(13.71% .036 258.53);--sidebar-primary:oklch(20.79% .0399 265.73);--sidebar-primary-foreground:oklch(98.38% .0036 248.23);--sidebar-accent:oklch(95.89% .011 248.06);--sidebar-accent-foreground:oklch(20.79% .0399 265.73);--sidebar-border:oklch(92.9% .0127 255.58);--sidebar-ring:oklch(13.71% .036 258.53)}.dark{--background:oklch(13.71% .036 258.53);--foreground:oklch(98.38% .0036 248.23);--card:oklch(13.71% .036 258.53);--card-foreground:oklch(98.38% .0036 248.23);--popover:oklch(13.71% .036 258.53);--popover-foreground:oklch(98.38% .0036 248.23);--primary:oklch(98.38% .0036 248.23);--primary-foreground:oklch(20.79% .0399 265.73);--secondary:oklch(28% .037 259.98);--secondary-foreground:oklch(98.38% .0036 248.23);--muted:oklch(28% .037 259.98);--muted-foreground:oklch(71.07% .0351 256.8);--accent:oklch(28% .037 259.98);--accent-foreground:oklch(98.38% .0036 248.23);--destructive:oklch(39.6% .1331 25.71);--destructive-foreground:oklch(98.38% .0036 248.23);--success-foreground:oklch(79.2% .209 151.711);--diff-deleted:oklch(70.4% .191 22.216);--warning:oklch(41% .11 46);--warning-foreground:oklch(99% .02 95);--border:oklch(44.54% .0374 257.3);--input:oklch(44.54% .0374 257.3);--ring:oklch(86.88% .0199 252.89);--chart-1:oklch(48.8% .243 264.376);--chart-2:oklch(69.6% .17 162.48);--chart-3:oklch(76.9% .188 70.08);--chart-4:oklch(62.7% .265 303.9);--chart-5:oklch(64.5% .246 16.439);--sidebar:oklch(13.71% .036 258.53);--sidebar-foreground:oklch(71.07% .0351 256.8);--sidebar-primary:oklch(98.38% .0036 248.23);--sidebar-primary-foreground:oklch(20.79% .0399 265.73);--sidebar-accent:oklch(28% .037 259.98);--sidebar-accent-foreground:oklch(71.07% .0351 256.8);--sidebar-border:oklch(28% .037 259.98);--sidebar-ring:oklch(86.88% .0199 252.89)}.paratext-light{--background:oklch(100% 0 0);--foreground:oklch(15.3% .006 107.1);--card:oklch(100% 0 0);--card-foreground:oklch(15.3% .006 107.1);--popover:oklch(100% 0 0);--popover-foreground:oklch(15.3% .006 107.1);--primary:oklch(55.5% .163 48.998);--primary-foreground:oklch(98.7% .022 95.277);--secondary:oklch(96.7% .001 286.375);--secondary-foreground:oklch(21% .006 285.885);--muted:oklch(96.6% .005 106.5);--muted-foreground:oklch(58% .031 107.3);--accent:oklch(96.6% .005 106.5);--accent-foreground:oklch(22.8% .013 107.4);--destructive:oklch(57.7% .245 27.325);--destructive-foreground:oklch(98.38% .0036 248.23);--success-foreground:oklch(62.7% .194 149.214);--diff-deleted:oklch(57.7% .245 27.325);--warning:oklch(84% .16 84);--warning-foreground:oklch(28% .07 46);--border:oklch(93% .007 106.5);--input:oklch(93% .007 106.5);--ring:oklch(73.7% .021 106.9);--chart-1:oklch(88% .011 106.6);--chart-2:oklch(58% .031 107.3);--chart-3:oklch(46.6% .025 107.3);--chart-4:oklch(39.4% .023 107.4);--chart-5:oklch(28.6% .016 107.4);--sidebar:oklch(98.8% .003 106.5);--sidebar-foreground:oklch(15.3% .006 107.1);--sidebar-primary:oklch(66.6% .179 58.318);--sidebar-primary-foreground:oklch(98.7% .022 95.277);--sidebar-accent:oklch(96.6% .005 106.5);--sidebar-accent-foreground:oklch(22.8% .013 107.4);--sidebar-border:oklch(93% .007 106.5);--sidebar-ring:oklch(73.7% .021 106.9)}.paratext-dark{--background:oklch(15.3% .006 107.1);--foreground:oklch(98.8% .003 106.5);--card:oklch(22.8% .013 107.4);--card-foreground:oklch(98.8% .003 106.5);--popover:oklch(22.8% .013 107.4);--popover-foreground:oklch(98.8% .003 106.5);--primary:oklch(47.3% .137 46.201);--primary-foreground:oklch(98.7% .022 95.277);--secondary:oklch(27.4% .006 286.033);--secondary-foreground:oklch(98.5% 0 0);--muted:oklch(28.6% .016 107.4);--muted-foreground:oklch(73.7% .021 106.9);--accent:oklch(28.6% .016 107.4);--accent-foreground:oklch(98.8% .003 106.5);--destructive:oklch(70.4% .191 22.216);--destructive-foreground:oklch(98.38% .0036 248.23);--success-foreground:oklch(79.2% .209 151.711);--diff-deleted:oklch(70.4% .191 22.216);--warning:oklch(41% .11 46);--warning-foreground:oklch(99% .02 95);--border:oklch(100% 0 0/.1);--input:oklch(100% 0 0/.15);--ring:oklch(58% .031 107.3);--chart-1:oklch(88% .011 106.6);--chart-2:oklch(58% .031 107.3);--chart-3:oklch(46.6% .025 107.3);--chart-4:oklch(39.4% .023 107.4);--chart-5:oklch(28.6% .016 107.4);--sidebar:oklch(22.8% .013 107.4);--sidebar-foreground:oklch(98.8% .003 106.5);--sidebar-primary:oklch(76.9% .188 70.08);--sidebar-primary-foreground:oklch(27.9% .077 45.635);--sidebar-accent:oklch(28.6% .016 107.4);--sidebar-accent-foreground:oklch(98.8% .003 106.5);--sidebar-border:oklch(100% 0 0/.1);--sidebar-ring:oklch(58% .031 107.3)}@property --tw-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-y{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-z{syntax:"*";inherits:false;initial-value:0}@property --tw-rotate-x{syntax:"*";inherits:false}@property --tw-rotate-y{syntax:"*";inherits:false}@property --tw-rotate-z{syntax:"*";inherits:false}@property --tw-skew-x{syntax:"*";inherits:false}@property --tw-skew-y{syntax:"*";inherits:false}@property --tw-space-y-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-space-x-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-divide-x-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-border-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-divide-y-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-leading{syntax:"*";inherits:false}@property --tw-font-weight{syntax:"*";inherits:false}@property --tw-tracking{syntax:"*";inherits:false}@property --tw-ordinal{syntax:"*";inherits:false}@property --tw-slashed-zero{syntax:"*";inherits:false}@property --tw-numeric-figure{syntax:"*";inherits:false}@property --tw-numeric-spacing{syntax:"*";inherits:false}@property --tw-numeric-fraction{syntax:"*";inherits:false}@property --tw-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-shadow-color{syntax:"*";inherits:false}@property --tw-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-inset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-shadow-color{syntax:"*";inherits:false}@property --tw-inset-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-ring-color{syntax:"*";inherits:false}@property --tw-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-ring-color{syntax:"*";inherits:false}@property --tw-inset-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-ring-inset{syntax:"*";inherits:false}@property --tw-ring-offset-width{syntax:"<length>";inherits:false;initial-value:0}@property --tw-ring-offset-color{syntax:"*";inherits:false;initial-value:#fff}@property --tw-ring-offset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-blur{syntax:"*";inherits:false}@property --tw-brightness{syntax:"*";inherits:false}@property --tw-contrast{syntax:"*";inherits:false}@property --tw-grayscale{syntax:"*";inherits:false}@property --tw-hue-rotate{syntax:"*";inherits:false}@property --tw-invert{syntax:"*";inherits:false}@property --tw-opacity{syntax:"*";inherits:false}@property --tw-saturate{syntax:"*";inherits:false}@property --tw-sepia{syntax:"*";inherits:false}@property --tw-drop-shadow{syntax:"*";inherits:false}@property --tw-drop-shadow-color{syntax:"*";inherits:false}@property --tw-drop-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-drop-shadow-size{syntax:"*";inherits:false}@property --tw-duration{syntax:"*";inherits:false}@property --tw-ease{syntax:"*";inherits:false}@property --tw-content{syntax:"*";inherits:false;initial-value:""}@property --tw-backdrop-blur{syntax:"*";inherits:false}@property --tw-backdrop-brightness{syntax:"*";inherits:false}@property --tw-backdrop-contrast{syntax:"*";inherits:false}@property --tw-backdrop-grayscale{syntax:"*";inherits:false}@property --tw-backdrop-hue-rotate{syntax:"*";inherits:false}@property --tw-backdrop-invert{syntax:"*";inherits:false}@property --tw-backdrop-opacity{syntax:"*";inherits:false}@property --tw-backdrop-saturate{syntax:"*";inherits:false}@property --tw-backdrop-sepia{syntax:"*";inherits:false}@property --tw-outline-style{syntax:"*";inherits:false;initial-value:solid}@keyframes spin{to{transform:rotate(360deg)}}@keyframes pulse{50%{opacity:.5}}@keyframes enter{0%{opacity:var(--tw-enter-opacity,1);transform:translate3d(var(--tw-enter-translate-x,0),var(--tw-enter-translate-y,0),0)scale3d(var(--tw-enter-scale,1),var(--tw-enter-scale,1),var(--tw-enter-scale,1))rotate(var(--tw-enter-rotate,0));filter:blur(var(--tw-enter-blur,0))}}@keyframes exit{to{opacity:var(--tw-exit-opacity,1);transform:translate3d(var(--tw-exit-translate-x,0),var(--tw-exit-translate-y,0),0)scale3d(var(--tw-exit-scale,1),var(--tw-exit-scale,1),var(--tw-exit-scale,1))rotate(var(--tw-exit-rotate,0));filter:blur(var(--tw-exit-blur,0))}}
`, "after-all");
export {
  nh as Alert,
  sh as AlertDescription,
  ih as AlertTitle,
  Vd as Avatar,
  jd as AvatarFallback,
  ip as AvatarImage,
  Wu as BOOK_CHAPTER_CONTROL_STRING_KEYS,
  Xu as BOOK_SELECTOR_STRING_KEYS,
  yr as Badge,
  wa as BookChapterControl,
  Ia as BookSelectionMode,
  Ju as BookSelector,
  q as Button,
  Ka as ButtonGroup,
  wn as ButtonGroupSeparator,
  qh as ButtonGroupText,
  hi as CANCEL_ACCEPT_BUTTONS_STRING_KEYS,
  tp as COMMENT_EDITOR_STRING_KEYS,
  ep as COMMENT_LIST_STRING_KEYS,
  Zu as CONFLICT_NOTE_STRING_KEYS,
  gi as CancelAcceptButtons,
  Id as Card,
  Pd as CardContent,
  op as CardDescription,
  np as CardFooter,
  rp as CardHeader,
  ap as CardTitle,
  vl as ChapterRangeSelector,
  ki as Checkbox,
  eh as CheckboxGroup,
  fu as Checklist,
  jo as ComboBox,
  Ye as Command,
  Ua as CommandEmpty,
  Ne as CommandGroup,
  Qr as CommandInput,
  Ie as CommandItem,
  We as CommandList,
  Qu as CommentEditor,
  sp as CommentList,
  Fd as ConflictNoteCard,
  ch as ContextMenu,
  vh as ContextMenuCheckboxItem,
  hh as ContextMenuContent,
  dh as ContextMenuGroup,
  gh as ContextMenuItem,
  xh as ContextMenuLabel,
  wh as ContextMenuPortal,
  ph as ContextMenuRadioGroup,
  bh as ContextMenuRadioItem,
  yh as ContextMenuSeparator,
  kh as ContextMenuShortcut,
  uh as ContextMenuSub,
  mh as ContextMenuSubContent,
  fh as ContextMenuSubTrigger,
  lh as ContextMenuTrigger,
  Qd as DataTable,
  _a as Dialog,
  Gh as DialogClose,
  Na as DialogContent,
  Hh as DialogDescription,
  xo as DialogFooter,
  Ca as DialogHeader,
  Yh as DialogOverlay,
  Wh as DialogPortal,
  Ea as DialogTitle,
  Xh as DialogTrigger,
  _h as Drawer,
  Ch as DrawerClose,
  Eh as DrawerContent,
  Rh as DrawerDescription,
  zh as DrawerFooter,
  Th as DrawerHeader,
  bu as DrawerOverlay,
  vu as DrawerPortal,
  Sh as DrawerTitle,
  Nh as DrawerTrigger,
  Ce as DropdownMenu,
  Oe as DropdownMenuCheckboxItem,
  Te as DropdownMenuContent,
  un as DropdownMenuGroup,
  Ke as DropdownMenuItem,
  rw as DropdownMenuItemType,
  Cr as DropdownMenuLabel,
  rs as DropdownMenuPortal,
  Gi as DropdownMenuRadioGroup,
  Hi as DropdownMenuRadioItem,
  Ge as DropdownMenuSeparator,
  Jh as DropdownMenuShortcut,
  ts as DropdownMenuSub,
  as as DropdownMenuSubContent,
  es as DropdownMenuSubTrigger,
  Ee as DropdownMenuTrigger,
  tw as ERROR_DUMP_STRING_KEYS,
  wp as ERROR_POPOVER_STRING_KEYS,
  cw as EditorKeyboardShortcuts,
  ah as EmptyState,
  ew as ErrorDump,
  up as ErrorPopover,
  vp as FOOTNOTE_EDITOR_STRING_KEYS,
  fp as Filter,
  pp as FilterDropdown,
  gp as Footer,
  mp as FootnoteEditor,
  Cw as FootnoteItem,
  bp as FootnoteList,
  Ep as INVENTORY_STRING_KEYS,
  ta as Input,
  Tp as Inventory,
  bo as Kbd,
  Zh as KbdGroup,
  Nt as Label,
  hw as MARKER_MENU_STRING_KEYS,
  dp as MarkdownRenderer,
  fw as MarkerMenu,
  hp as MoreInfo,
  Yi as MultiSelectComboBox,
  Jp as NavigationContentSearch,
  Pe as Popover,
  Xi as PopoverAnchor,
  Ve as PopoverContent,
  Qh as PopoverDescription,
  tg as PopoverHeader,
  ia as PopoverPortalContainerProvider,
  eg as PopoverTitle,
  He as PopoverTrigger,
  Dh as Progress,
  ao as RadioGroup,
  Gr as RadioGroupItem,
  wl as RecentSearches,
  rg as ResizableHandle,
  ag as ResizablePanel,
  og as ResizablePanelGroup,
  rh as ResultsCard,
  Up as SCOPE_SELECTOR_STRING_KEYS,
  tu as SELECT_BOOKS_STRING_KEYS,
  Kp as ScopeSelector,
  Fp as ScriptureResultsViewer,
  qp as ScrollGroupSelector,
  gn as SearchBar,
  sr as Select,
  Qw as SelectBooks,
  Jw as SelectBooksPicker,
  dr as SelectContent,
  Wd as SelectGroup,
  de as SelectItem,
  cp as SelectLabel,
  Jd as SelectScrollDownButton,
  Xd as SelectScrollUpButton,
  lp as SelectSeparator,
  lr as SelectTrigger,
  cr as SelectValue,
  kr as Separator,
  Gp as SettingsList,
  Yp as SettingsListHeader,
  Hp as SettingsListItem,
  Uw as SettingsSidebar,
  Lp as SettingsSidebarContentSearch,
  Iw as Sidebar,
  Vw as SidebarContent,
  Mp as SidebarFooter,
  on as SidebarGroup,
  Op as SidebarGroupAction,
  sn as SidebarGroupContent,
  nn as SidebarGroupLabel,
  Dp as SidebarHeader,
  Rp as SidebarInput,
  Pw as SidebarInset,
  jw as SidebarMenu,
  Ap as SidebarMenuAction,
  Ip as SidebarMenuBadge,
  Fw as SidebarMenuButton,
  Bw as SidebarMenuItem,
  Pp as SidebarMenuSkeleton,
  Vp as SidebarMenuSub,
  Bp as SidebarMenuSubButton,
  jp as SidebarMenuSubItem,
  Aw as SidebarProvider,
  Sp as SidebarRail,
  $p as SidebarSeparator,
  zp as SidebarTrigger,
  tr as Skeleton,
  $h as Slider,
  Mh as Sonner,
  ng as Spinner,
  Oh as Switch,
  Ba as TabDropdownMenu,
  Xp as TabFloatingMenu,
  Wp as TabToolbar,
  Ga as Table,
  Ya as TableBody,
  ig as TableCaption,
  er as TableCell,
  sg as TableFooter,
  qr as TableHead,
  Ha as TableHeader,
  $e as TableRow,
  Ah as Tabs,
  Vh as TabsContent,
  Ih as TabsList,
  Ph as TabsTrigger,
  oh as TextField,
  Hu as Textarea,
  wi as ToggleGroup,
  Lr as ToggleGroupItem,
  Qp as Toolbar,
  Ht as Tooltip,
  Wt as TooltipContent,
  Gt as TooltipProvider,
  Yt as TooltipTrigger,
  iw as UNDO_REDO_BUTTONS_STRING_KEYS,
  th as UiLanguageSelector,
  sw as UndoRedoButtons,
  Ri as VerticalTabs,
  Mi as VerticalTabsContent,
  Di as VerticalTabsList,
  ru as VerticalTabsTrigger,
  wr as Z_INDEX_ABOVE_DOCK,
  pn as Z_INDEX_FOOTNOTE_EDITOR,
  cg as Z_INDEX_MODAL,
  lg as Z_INDEX_MODAL_BACKDROP,
  Zi as Z_INDEX_OVERLAY,
  dg as badgeVariants,
  wg as buttonGroupVariants,
  ug as buttonVariants,
  m as cn,
  Cp as getBookIdFromUSFM,
  oa as getInventoryHeader,
  _p as getLinesFromUSFM,
  Np as getNumberFromUSFM,
  Rw as getStatusForItem,
  Zp as getToolbarOSReservedSpaceClassName,
  nw as handleMarkerPaletteSessionKeyDown,
  yp as inventoryCountColumn,
  xp as inventoryItemColumn,
  kp as inventoryStatusColumn,
  qa as isMacOs,
  pg as isWindows,
  gg as sonner,
  jh as useEvent,
  Bh as useEventAsync,
  Fh as useExtraValidMarkers,
  qi as useListbox,
  ku as usePromise,
  Yu as useRecentSearches,
  na as useSidebar,
  Lh as useStylesheet
};
//# sourceMappingURL=index.js.map
