var xs = Object.defineProperty;
var ys = (t, e, r) => e in t ? xs(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var Qt = (t, e, r) => ys(t, typeof e != "symbol" ? e + "" : e, r);
import { c as b, g as Ae, a as Vr, C as tr, L as Hn, u as tn, T as Vt, b as bt, d as xt, e as yt, A as xa, D as Be, f as Ee, h as je, i as cr, j as Ge, B as et, x as ks, k as _s, l as Ns, I as Cs, m as To, n as Je, r as Re, o as Es, p as qn, P as lr, q as Dr, s as dr, t as wr, v as Ma, w as Oa, y as So, z as ur, E as Ia, F as $t, R as Ro, G as ya, H as so, J as co, K as lo, M as wo, N as Gn, O as wa, Q as Do, S as Fr, U as Ur, V as yr, W as Ts, X as ir, Y as Xe, Z as Fe, _ as We, $ as kr, a0 as Mo, a1 as Oo, a2 as ka, a3 as Io, a4 as Wn, a5 as Ss, a6 as Rs, a7 as Ds, a8 as uo, a9 as Yn, aa as za, ab as Ms, ac as Xn, ad as Os, ae as Is, af as zs, ag as en, ah as Ps, ai as As, aj as $s, ak as Jn, al as Zn, am as zo, an as Vs, ao as Qn, ap as Ha, aq as rn, ar as qa, as as Ls, at as Bs, au as js, av as Fs, aw as Us, ax as Ks, ay as Gr, az as Po, aA as Hs, aB as qs } from "./resizable-DOlm3N_b.js";
import { aC as hf, aD as gf, aE as ff, aF as mf, aG as vf, aH as bf, aI as xf, aJ as yf, aK as kf, aL as _f, aM as Nf, aN as Cf, aO as Ef, aP as Tf, aQ as Sf, aR as Rf, aS as Df, aT as Mf, aU as Of, aV as If, aW as zf, aX as Pf, aY as Af, aZ as $f, a_ as Vf, a$ as Lf, b0 as Bf, b1 as jf, b2 as Ff, b3 as Uf, b4 as Kf, b5 as Hf, b6 as qf, b7 as Gf, b8 as Wf, b9 as Yf, ba as Xf } from "./resizable-DOlm3N_b.js";
import { jsx as a, jsxs as u, Fragment as gt } from "react/jsx-runtime";
import { Canon as Kt } from "@sillsdev/scripture";
import { Check as Ze, Clock as an, ChevronsLeft as on, ChevronsRight as nn, ChevronUp as ti, ChevronDown as sr, ArrowLeft as Gs, ArrowRight as Ws, BoldIcon as Ys, ItalicIcon as Xs, X as ei, AtSign as ri, Pencil as Js, Trash2 as sn, ArrowUp as ai, MoreHorizontal as Zs, MailOpen as Qs, Mail as tc, FilterIcon as ec, ArrowLeftIcon as rc, ChevronLeftIcon as ac, ChevronRightIcon as oc, ArrowRightIcon as nc, Copy as oi, Filter as ic, User as sc, Link as cc, CircleHelp as lc, Undo as dc, Redo as wc, SquareX as ni, FunctionSquare as ii, SquareSigma as si, Ban as uc, AlertCircle as po, CircleCheckIcon as pc, CircleXIcon as hc, CircleHelpIcon as gc, ArrowUpIcon as fc, ArrowDownIcon as mc, ScrollText as vc, ChevronRight as bc, ChevronLeft as xc, ChevronsUpDown as yc, MenuIcon as kc, Menu as _c, EllipsisVertical as Nc, MoreVertical as Cc } from "lucide-react";
import { Section as At, compareScrRefs as _a, getChaptersForBook as Ec, formatScrRef as $e, formatReplacementString as Ye, getSectionForBook as ua, formatRelativeDate as Tc, sanitizeHtml as Ao, NumberFormat as ci, formatBytes as Sc, getCurrentLocale as Rc, usfmMarkers as pa, isPlatformError as Dc, ABORTED as Mc, getErrorMessage as Oc, getFormatCallerFunction as Ic, deepEqual as zc, isString as cn, scrRefToBBBCCCVVV as Ga, defaultScrRef as Wa, formatScrRefRange as Pc, getLocalizeKeyForScrollGroupId as ln, formatReplacementStringToArray as dn, collectUsjMarkers as Ac } from "platform-bible-utils";
import ee, { useRef as L, useMemo as P, createContext as Wr, useContext as Pa, useState as _, useEffect as Z, useCallback as V, useId as Na, useImperativeHandle as $c, useLayoutEffect as re, Fragment as Yr, Component as Vc, createElement as wn, Suspense as Lc, forwardRef as li, memo as di } from "react";
import { IconSelector as wi, IconCheck as Aa, IconChevronDown as Bc, IconChevronUp as jc, IconLayoutSidebar as Fc, IconLayoutSidebarRight as Uc, IconChevronRight as ui, IconSearch as Kc, IconLoader as Hc, IconAlertOctagon as qc, IconAlertTriangle as Gc, IconInfoCircle as Wc, IconCircleCheck as Yc } from "@tabler/icons-react";
import { createEditor as pi, $getRoot as Qe, $createParagraphNode as Xr, $getSelection as ce, HISTORY_MERGE_TAG as $o, ParagraphNode as hi, TextNode as gi, $getPreviousSelection as Xc, $isRangeSelection as Te, $caretFromPoint as Jc, $getSiblingCaret as fi, $getChildCaret as Zc, $getAdjacentChildCaret as Qc, $isChildCaret as tl, $normalizeCaret as el, $setSelectionFromCaretRange as rl, $getCollapsedCaretRange as al, $getCaretInDirection as un, $splitAtPointCaretNext as ol, $isTextPointCaret as nl, $findMatchingParent as mi, $isElementNode as Kr, mergeRegister as Le, getDOMTextNode as il, isHTMLElement as sl, CLEAR_EDITOR_COMMAND as vi, COMMAND_PRIORITY_EDITOR as Vo, shallowMergeConfig as cl, defineExtension as he, safeCast as pr, createState as ll, FORMAT_TEXT_COMMAND as bi, $isNodeSelection as xi, COMMAND_PRIORITY_LOW as yi, RootNode as dl, LineBreakNode as wl, TabNode as ul, $isEditorState as pl, createCommand as hl, CLICK_COMMAND as gl, isDOMNode as fl, $getNodeFromDOMNode as ml, $createNodeSelection as vl, $setSelection as bl, $getEditor as xl, DecoratorNode as ho, $getState as yl, toggleTextFormatType as pn, TEXT_TYPE_TO_FORMAT as kl, $setState as _l, addClassNamesToElement as ki, $create as Nl, $getNodeByKey as Cl, removeClassNamesFromElement as El, KEY_TAB_COMMAND as Tl, $isBlockElementNode as Sl, $createRangeSelection as Rl, $normalizeSelection__EXPERIMENTAL as Dl, OUTDENT_CONTENT_COMMAND as Ml, INDENT_CONTENT_COMMAND as hn, INSERT_TAB_COMMAND as Ol, COMMAND_PRIORITY_CRITICAL as Lo, $isDecoratorNode as Il, $isParagraphNode as zl, $isTextNode as go, SELECTION_CHANGE_COMMAND as _i, $insertNodes as Pl } from "lexical";
import { HeadingNode as Al, QuoteNode as $l, registerRichText as Vl } from "@lexical/rich-text";
import { flushSync as Ll, createPortal as Bl } from "react-dom";
import { $isTableSelection as jl } from "@lexical/table";
import { createHeadlessEditor as Ni } from "@lexical/headless";
import { $generateHtmlFromNodes as Fl, $generateNodesFromDOM as Ul } from "@lexical/html";
import { Avatar as Bo, Select as ae, Checkbox as gn, Slot as Jr, Tabs as ye, Menubar as De, ContextMenu as Ht, Progress as fn, Slider as na, Switch as mn } from "radix-ui";
import { useReactTable as Ci, getFilteredRowModel as Kl, getSortedRowModel as Ei, getPaginationRowModel as Hl, getCoreRowModel as Ti, flexRender as Lr, getGroupedRowModel as ql, getExpandedRowModel as Gl } from "@tanstack/react-table";
import Wl from "markdown-to-jsx";
import { GENERATOR_NOTE_CALLER as fo, HIDDEN_NOTE_CALLER as mo, getDefaultViewOptions as Yl, isInsertEmbedOpOfType as Ir, getMarkerMenuItems as Xl, defaultStyleInfo as Jl, Editorial as Zl } from "@eten-tech-foundation/platform-editor";
import { cva as Si } from "class-variance-authority";
import { useHotkeys as Ql } from "react-hotkeys-hook";
import { Drawer as er } from "vaul";
import { useTheme as td } from "next-themes";
import { Toaster as ed } from "sonner";
import { toast as Zf } from "sonner";
function lh({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "textarea",
    {
      "data-slot": "textarea",
      className: b(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:flex tw:field-sizing-content tw:min-h-16 tw:w-full tw:rounded-lg tw:border tw:border-input tw:bg-transparent tw:px-2.5 tw:py-2 tw:text-base tw:transition-colors tw:outline-none tw:placeholder:text-muted-foreground tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:disabled:cursor-not-allowed tw:disabled:bg-input/50 tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:md:text-sm tw:dark:bg-input/30 tw:dark:disabled:bg-input/80 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40",
        t
      ),
      ...e
    }
  );
}
function Ri({
  ref: t,
  bookId: e,
  isSelected: r,
  onSelect: o,
  onMouseDown: n,
  section: s,
  className: i,
  showCheck: c = !1,
  localizedBookNames: d,
  commandValue: l,
  suppressKeyboardHighlight: w = !1,
  disabled: p = !1,
  dimmedReason: h,
  dimmedDescription: f
}) {
  const m = L(!1), x = () => {
    p || (m.current || o == null || o(e), setTimeout(() => {
      m.current = !1;
    }, 100));
  }, g = (U) => {
    if (p) {
      U.preventDefault();
      return;
    }
    m.current = !0, n ? n(U) : o == null || o(e);
  }, T = P(
    () => Ae(e, d),
    [e, d]
  ), y = P(
    () => Vr(e, d),
    [e, d]
  ), C = !!h && !p, N = `${T} (${y})`, A = C ? f || `${N}, ${h}` : N, B = /* @__PURE__ */ u(
    tr,
    {
      ref: t,
      value: l || `${e} ${Kt.bookIdToEnglishName(e)}`,
      onSelect: x,
      onMouseDown: g,
      role: "option",
      "aria-selected": r,
      "aria-disabled": p || void 0,
      "aria-label": A,
      disabled: p,
      className: b(
        !w && Hn,
        // Suppress CommandItem's own data-selected background and text color so the keyboard
        // highlight is the ring alone. Book rows and grid cells belong to one control and share one
        // highlight language; a background here would make the same keyboard state look different
        // depending on which view the user is in.
        "tw:data-selected:bg-transparent tw:data-selected:text-inherit",
        // Hover keeps its own background so pointer feedback stays distinct from the ring, which
        // marks the item Enter will submit.
        "tw:hover:bg-muted",
        // Hide CommandItem's own trailing check icon — this component's own `showCheck` icon
        // (rendered as the first child below, so it is never the last child) is the one shown.
        "tw:[&>svg:last-child]:hidden",
        i,
        p && "tw:cursor-not-allowed tw:opacity-50",
        // Mirrors NumberedItemGrid's dimmed-vs-disabled split — same tokens, so chapter/verse cells
        // and book rows grey identically inside one popover: dimmed is presentation only, so it
        // never sets aria-disabled or blocks onSelect, and it yields to disabled. Restated under
        // data-selected so a dimmed row keeps its dimming while the keyboard highlight is on it,
        // rather than losing it to the suppression rule above.
        C && "tw:bg-muted/50 tw:text-muted-foreground/50 tw:data-selected:bg-muted/50 tw:data-selected:text-muted-foreground/50"
      ),
      children: [
        c && /* @__PURE__ */ a(
          Ze,
          {
            className: b(
              "tw:me-2 tw:h-4 tw:w-4 tw:shrink-0",
              r ? "tw:opacity-100" : "tw:opacity-0"
            )
          }
        ),
        /* @__PURE__ */ a("span", { className: "tw:min-w-0 tw:flex-1", children: T }),
        C && // Visible rather than hover-only: cmdk never moves DOM focus onto an item (the input keeps
        // it and highlights via data-selected), so a tooltip would never open for a keyboard user.
        // Rendered text also survives the highlight, which recolours the row.
        /* @__PURE__ */ a("span", { className: "tw:ms-2 tw:shrink-0 tw:text-xs tw:italic", children: h }),
        /* @__PURE__ */ a(
          "span",
          {
            className: b(
              "tw:ms-2 tw:shrink-0 tw:text-xs",
              // Inherits the row's dimmed colour instead of setting its own, so the whole row dims
              // evenly rather than leaving the id at full strength beside a dimmed name.
              !C && "tw:text-muted-foreground"
            ),
            children: y
          }
        )
      ]
    }
  );
  return /* @__PURE__ */ a(
    "div",
    {
      className: b(
        "tw:mx-1 tw:my-1 tw:border-b-0 tw:border-e-0 tw:border-s-2 tw:border-t-0 tw:border-solid",
        {
          "tw:border-s-red-200": s === At.OT,
          "tw:border-s-purple-200": s === At.NT,
          "tw:border-s-indigo-200": s === At.DC,
          "tw:border-s-amber-200": s === At.Extra
        }
      ),
      children: B
    }
  );
}
const rd = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
function ad(t) {
  return rd.some((e) => e === t);
}
function vn(t) {
  const e = new RegExp("^\\p{L}$", "u").test(t), r = /^[0-9]$/.test(t);
  return { isLetter: e, isDigit: r };
}
const od = /^%[^%]*%$/;
function se(t, e) {
  return !t || od.test(t) ? e : t;
}
const Br = Object.freeze({
  /** Full labels. */
  WIDE: 0,
  /** Abbreviated primary label form. */
  TIGHT: 1,
  /** Secondary field clipped with an ellipsis — CSS does this on its own. */
  TIGHTER: 2,
  /** Secondary field dropped entirely; primary field alone. */
  MINIMUM: 3
}), $a = Wr(Br.WIDE);
function nd() {
  return Pa($a);
}
const Di = Wr(void 0);
function Mi() {
  return Pa(Di);
}
let vo = "keyboard", bn = !1;
function id() {
  bn || typeof document > "u" || (bn = !0, document.addEventListener(
    "pointerdown",
    () => {
      vo = "pointer";
    },
    !0
  ), document.addEventListener(
    "keydown",
    () => {
      vo = "keyboard";
    },
    !0
  ));
}
function sd({
  primary: t,
  secondary: e,
  separator: r = " ",
  secondaryFirst: o = !1,
  showSecondary: n = !0,
  isPartial: s,
  fullText: i,
  className: c
}) {
  const {
    ref: d,
    open: l,
    onPointerEnter: w,
    onPointerLeave: p
  } = tn(), {
    ref: h,
    open: f,
    onPointerEnter: m,
    onPointerLeave: x
  } = tn(), [g, T] = _(!1), [y, C] = _(!1), N = L(
    // React's ref API requires `null` as the initial value for DOM refs.
    // eslint-disable-next-line no-null/no-null
    null
  ), A = n && e !== void 0, B = s ?? (e !== void 0 && !n);
  Z(() => {
    var X;
    id();
    const z = (X = N.current) == null ? void 0 : X.closest('button, [role="combobox"], [tabindex]');
    if (!z) return;
    const k = (G) => !!G && G.scrollWidth > G.clientWidth, ot = () => {
      vo !== "pointer" && (B || k(h.current) || k(d.current)) && C(!0);
    }, I = () => C(!1);
    return z.addEventListener("focus", ot), z.addEventListener("blur", I), () => {
      z.removeEventListener("focus", ot), z.removeEventListener("blur", I);
    };
  }, [B, h, d]);
  const U = V(() => {
    B && T(!0), m(), A && w();
  }, [
    B,
    A,
    m,
    w
  ]), O = V(() => {
    T(!1), C(!1), x(), p();
  }, [x, p]);
  Z(() => {
    B || T(!1);
  }, [B]);
  const S = /* @__PURE__ */ a("span", { ref: h, className: "tw:min-w-0 tw:shrink tw:truncate", children: t }, "primary"), D = A ? (
    // Weighted to absorb essentially all of the shrinking, so the primary field only starts losing
    // characters once this one has none left.
    /* @__PURE__ */ a("span", { ref: d, className: "tw:min-w-0 tw:shrink-[9999] tw:truncate", children: e }, "secondary")
  ) : void 0, [W, Y] = o ? [D, S] : [S, D];
  return (
    // Nested TooltipProviders are harmless in Radix, so carrying our own means this works in any
    // host, including toolbars that never set one up.
    /* @__PURE__ */ a(Vt, { children: /* @__PURE__ */ u(
      bt,
      {
        open: f || l || g || y,
        onOpenChange: (z) => {
          z || O();
        },
        children: [
          /* @__PURE__ */ a(xt, { asChild: !0, children: /* @__PURE__ */ u(
            "span",
            {
              ref: N,
              onPointerEnter: U,
              onPointerLeave: O,
              onPointerDown: O,
              className: b("tw:flex tw:min-w-0 tw:items-center", c),
              children: [
                W,
                W && Y && /* @__PURE__ */ a("span", { className: "tw:shrink-0 tw:whitespace-pre", children: r }, "separator"),
                Y
              ]
            }
          ) }),
          /* @__PURE__ */ a(yt, { children: i })
        ]
      }
    ) })
  );
}
function bo(t, e) {
  return `${t} ${xa[t]}${e ? ` ${Vr(t, e)} ${Ae(t, e)}` : ""}`;
}
function _r(t, e) {
  return `${t} ${xa[t] || ""} ${e}`;
}
function ha(t, e, r) {
  return `${_r(t, e)}:${r}`;
}
function Ar(t) {
  if (t.includes(":")) return;
  const e = /(\d+)$/.exec(t);
  if (!e) return;
  const r = parseInt(e[1], 10), o = t.indexOf(" ");
  if (o < 0) return;
  const n = t.slice(0, o);
  return t === _r(n, r) ? r : void 0;
}
function ia(t) {
  const e = /:(\d+)$/.exec(t);
  if (!e) return;
  const r = t.slice(0, t.length - e[0].length);
  if (Ar(r) !== void 0)
    return parseInt(e[1], 10);
}
const cd = "top-match", ld = "Show recent searches", dd = "Recent";
function wd({
  recentSearches: t,
  onSearchItemSelect: e,
  renderItem: r = (h) => String(h),
  getItemKey: o = (h) => String(h),
  ariaLabel: n,
  groupHeading: s,
  id: i,
  classNameForItems: c,
  buttonClassName: d = "tw:absolute tw:end-0 tw:top-0 tw:h-full tw:px-3 tw:py-2",
  buttonVariant: l = "ghost",
  open: w,
  onOpenChange: p
}) {
  const [h, f] = _(!1), [m, x] = _(!1), g = Na(), T = L(!1), y = w !== void 0, C = y ? w : h, N = n === "" ? "" : se(n, ld), A = se(s, dd), B = (D) => {
    D || (T.current = !0, x(!1)), y || f(D), p == null || p(D);
  }, U = (D) => {
    if (D && T.current) {
      T.current = !1;
      return;
    }
    x(D);
  };
  if (t.length === 0)
    return;
  const O = (D) => {
    e(D);
  }, S = /* @__PURE__ */ a(
    et,
    {
      variant: l,
      size: "icon",
      className: d,
      "aria-label": N,
      onPointerEnter: () => {
        T.current = !1;
      },
      children: /* @__PURE__ */ a(an, { className: "tw:h-4 tw:w-4" })
    }
  );
  return /* @__PURE__ */ u(Be, { open: C, onOpenChange: B, modal: !1, children: [
    /* @__PURE__ */ a(Vt, { children: N ? /* @__PURE__ */ u(bt, { open: m, onOpenChange: U, children: [
      /* @__PURE__ */ a(xt, { asChild: !0, children: /* @__PURE__ */ a(Ee, { asChild: !0, children: S }) }),
      /* @__PURE__ */ a(yt, { children: N })
    ] }) : /* @__PURE__ */ a(Ee, { asChild: !0, children: S }) }),
    /* @__PURE__ */ u(
      je,
      {
        id: i,
        "aria-labelledby": g,
        className: "tw:w-[300px]",
        align: "start",
        onKeyDown: (D) => D.stopPropagation(),
        children: [
          /* @__PURE__ */ a(cr, { id: g, children: A }),
          t.map((D) => /* @__PURE__ */ u(
            Ge,
            {
              onSelect: () => O(D),
              className: b("tw:flex tw:items-center", c),
              children: [
                /* @__PURE__ */ a(an, { className: "tw:me-2 tw:h-4 tw:w-4 tw:opacity-50" }),
                /* @__PURE__ */ a("span", { children: r(D) })
              ]
            },
            o(D)
          ))
        ]
      }
    )
  ] });
}
function dh(t, e, r = (n, s) => n === s, o = 15) {
  return (n) => {
    const s = t.filter(
      (c) => !r(c, n)
    ), i = [n, ...s.slice(0, o - 1)];
    e(i);
  };
}
function sa(t, e) {
  return !e || _a(t, e) === 0;
}
function ud(t, e, r, o, n) {
  const s = P(
    () => ks(t, e),
    [t, e]
  ), i = P(
    () => _s(t, e),
    [t, e]
  ), c = P(
    () => Ns(t, e),
    [t, e]
  ), d = P(
    () => Cs(t, e),
    [t, e]
  ), l = V(
    (w) => {
      w && o(w);
    },
    [o]
  );
  return P(() => [
    {
      onClick: () => l(s),
      disabled: sa(t, s),
      title: se(
        n == null ? void 0 : n["%webView_bookChapterControl_previousChapter%"],
        "Previous chapter"
      ),
      icon: r === "ltr" ? on : nn,
      group: "chapter"
    },
    {
      onClick: () => l(i),
      disabled: sa(t, i),
      title: se(
        n == null ? void 0 : n["%webView_bookChapterControl_nextChapter%"],
        "Next chapter"
      ),
      icon: r === "ltr" ? nn : on,
      group: "chapter"
    },
    {
      onClick: () => l(c),
      disabled: sa(t, c),
      title: se(
        n == null ? void 0 : n["%webView_bookChapterControl_previousVerse%"],
        "Previous verse"
      ),
      icon: ti,
      group: "verse"
    },
    {
      onClick: () => l(d),
      disabled: sa(t, d),
      title: se(
        n == null ? void 0 : n["%webView_bookChapterControl_nextVerse%"],
        "Next verse"
      ),
      icon: sr,
      group: "verse"
    }
  ], [
    t,
    r,
    l,
    s,
    c,
    d,
    i,
    n
  ]);
}
const ga = {
  // Matches start of string (`^`), one or more non-colon/space words, optionally followed by space and more words (`([^:\s]+(?:\s+[^:\s]+)*)`), end of string (`$`), case-insensitive (`i`)
  BOOK_ONLY: /^([^:\s]+(?:\s+[^:\s]+)*)$/i,
  // Same as above, but followed by a space and a chapter number (`\s+(\d+)`)
  BOOK_CHAPTER: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,
  // Same as above, but followed by a colon and optionally a verse number (`:(\d*)`)
  BOOK_CHAPTER_VERSE: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i
}, pd = [
  ga.BOOK_ONLY,
  ga.BOOK_CHAPTER,
  ga.BOOK_CHAPTER_VERSE
];
function hd(t) {
  return ga.BOOK_CHAPTER_VERSE.test(t.trim());
}
function xn(t, e) {
  return Kt.bookIdToNumber(t) < Kt.bookIdToNumber(e.book);
}
function gd(t, e, r) {
  const o = Kt.bookIdToNumber(t) - Kt.bookIdToNumber(r.book);
  return o < 0 ? !0 : o > 0 ? !1 : e < r.chapterNum;
}
function Ya(t, e, r, o) {
  const n = Kt.bookIdToNumber(t) - Kt.bookIdToNumber(o.book);
  return n < 0 ? !0 : n > 0 ? !1 : e < o.chapterNum ? !0 : e > o.chapterNum ? !1 : r < o.verseNum;
}
function qe(t) {
  return Ec(Kt.bookIdToNumber(t));
}
function fd(t, e, r) {
  if (!t.trim() || e.length === 0) return;
  const o = pd.reduce(
    (n, s) => {
      if (n) return n;
      const i = s.exec(t.trim());
      if (i) {
        const [c, d = void 0, l = void 0] = i.slice(1);
        let w;
        const p = e.filter((h) => To(h, c, r));
        if (p.length === 1 && ([w] = p), !w && d) {
          if (Kt.isBookIdValid(c)) {
            const h = c.toUpperCase();
            e.includes(h) && (w = h);
          }
          if (!w && r) {
            const h = Array.from(r.entries()).find(
              ([, f]) => f.localizedId.toLowerCase() === c.toLowerCase()
            );
            h && e.includes(h[0]) && ([w] = h);
          }
        }
        if (!w && d) {
          const f = ((m) => Object.keys(xa).find(
            (x) => xa[x].toLowerCase() === m.toLowerCase()
          ))(c);
          if (f && e.includes(f) && (w = f), !w && r) {
            const m = Array.from(r.entries()).find(
              ([, x]) => x.localizedName.toLowerCase() === c.toLowerCase()
            );
            m && e.includes(m[0]) && ([w] = m);
          }
        }
        if (w) {
          let h = d ? parseInt(d, 10) : void 0;
          h && h > qe(w) && (h = Math.max(qe(w), 1));
          const f = l ? parseInt(l, 10) : void 0;
          return {
            book: w,
            chapterNum: h,
            verseNum: f
          };
        }
      }
    },
    void 0
  );
  if (o) return o;
}
function xo(t) {
  return {
    [At.OT]: t.filter((e) => Kt.isBookOT(e)),
    [At.NT]: t.filter((e) => Kt.isBookNT(e)),
    [At.DC]: t.filter((e) => Kt.isBookDC(e)),
    [At.Extra]: t.filter((e) => Kt.extraBooks().includes(e))
  };
}
function md(t, e) {
  const r = new Set(t), o = e.filter((l) => !r.has(l)), n = new Set(o), s = n.size === 0 ? t : Kt.allBookIds.filter(
    (l) => r.has(l) || n.has(l)
  ), i = xo(s), c = Object.values(i).flat(), d = xo(t);
  return {
    projectBooksBySection: d,
    reachableBooksBySection: i,
    reachableBooks: c,
    // Grouped and flattened like `reachableBooks`, so it inherits the same peripheral-id exclusion.
    projectBooks: Object.values(d).flat(),
    // Derived from the grouped-and-flattened list, so a peripheral id that grouping dropped can
    // never be marked dimmed for a list it is not part of.
    booksOutsideProject: new Set(c.filter((l) => !r.has(l)))
  };
}
const yo = 6;
function vd(t) {
  return t === "ArrowLeft" ? "ArrowRight" : t === "ArrowRight" ? "ArrowLeft" : t;
}
function bd({
  current: t,
  key: e,
  max: r,
  direction: o = "ltr"
}) {
  if (r <= 0) return t;
  if (t < 1 || t > r) return 1;
  switch (o === "rtl" ? vd(e) : e) {
    case "ArrowLeft":
      return t > 1 ? t - 1 : r;
    case "ArrowRight":
      return t < r ? t + 1 : 1;
    case "ArrowUp":
      return Math.max(1, t - yo);
    case "ArrowDown":
      return Math.min(r, t + yo);
    default:
      return t;
  }
}
function Oi({
  count: t,
  valueBuilder: e,
  onSelect: r,
  itemRef: o,
  isDisabled: n,
  isDimmed: s,
  isSelected: i,
  suppressKeyboardHighlight: c = !1,
  className: d
}) {
  if (!(t <= 0))
    return /* @__PURE__ */ a(Je, { children: /* @__PURE__ */ a(
      "div",
      {
        className: b("tw:grid tw:gap-1", d),
        style: { gridTemplateColumns: `repeat(${yo}, minmax(0, 1fr))` },
        children: Array.from({ length: t }, (l, w) => w + 1).map((l) => {
          const w = (n == null ? void 0 : n(l)) ?? !1;
          return /* @__PURE__ */ a(
            tr,
            {
              value: e(l),
              onSelect: () => {
                w || r(l);
              },
              ref: o(l),
              disabled: w,
              "aria-disabled": w || void 0,
              className: b(
                "tw:h-8 tw:w-8 tw:cursor-pointer tw:justify-center tw:rounded-md tw:text-center tw:text-sm",
                // Hide CommandItem's own trailing check icon (a multiselect affordance this grid
                // doesn't use) and give cells pointer feedback distinct from the keyboard focus ring.
                "tw:[&>svg]:hidden tw:hover:bg-muted",
                !c && Hn,
                // cmdk highlights the focused cell with its own data-selected background/text; this
                // grid shows keyboard focus with the ring above instead, so neutralize that here.
                // The selected-cell rule below re-asserts its own colors under data-selected so the
                // current chapter/verse keeps its highlight even while the keyboard focus is on it.
                "tw:data-selected:bg-transparent tw:data-selected:text-inherit",
                {
                  // The keyboard ring switches to `ring-primary-foreground` on this cell. The shared
                  // `ring-ring/50` composites to within ~0.04 lightness of `bg-primary`, which makes
                  // the ring all but invisible on exactly the cell the highlight is seeded onto when
                  // the popover opens. `primary-foreground` is the token already guaranteed to read
                  // against `primary`. `cn` merges away the earlier ring color, so this wins by
                  // argument order rather than by CSS output order.
                  //
                  // Hover keeps the filled treatment (`bg-primary`) instead of taking the shared
                  // `hover:bg-muted` above. This cell's text is `primary-foreground` — near-white,
                  // chosen to read against the fill — so swapping the fill for a pale muted
                  // background on hover leaves near-white text on a near-white ground and the
                  // current chapter all but disappears under the pointer. `/90` keeps the pointer
                  // feedback that hover owes the user without touching the contrast.
                  "tw:bg-primary tw:text-primary-foreground tw:hover:bg-primary/90 tw:data-selected:bg-primary tw:data-selected:text-primary-foreground tw:data-selected:ring-primary-foreground/70": (i == null ? void 0 : i(l)) ?? !1
                },
                {
                  // Same tokens as BookItem, so book rows and chapter/verse cells grey identically
                  // inside one popover. Restated under data-selected so a dimmed cell keeps its
                  // dimming while the keyboard highlight is on it, rather than losing it to the
                  // suppression rule above.
                  "tw:bg-muted/50 tw:text-muted-foreground/50 tw:data-selected:bg-muted/50 tw:data-selected:text-muted-foreground/50": ((s == null ? void 0 : s(l)) ?? !1) && !w
                },
                w && "tw:cursor-not-allowed tw:opacity-40"
              ),
              children: l
            },
            l
          );
        })
      }
    ) });
}
function yn({
  bookId: t,
  scrRef: e,
  onChapterSelect: r,
  setChapterRef: o,
  isChapterDimmed: n,
  isChapterDisabled: s,
  suppressKeyboardHighlight: i,
  className: c
}) {
  if (t)
    return /* @__PURE__ */ a(
      Oi,
      {
        count: qe(t),
        valueBuilder: (d) => _r(t, d),
        onSelect: r,
        itemRef: o,
        isDisabled: s,
        isDimmed: n,
        isSelected: (d) => t === e.book && d === e.chapterNum,
        suppressKeyboardHighlight: i,
        className: c
      }
    );
}
function kn({
  bookId: t,
  chapterNum: e,
  endVerse: r,
  scrRef: o,
  onVerseSelect: n,
  setVerseRef: s,
  isVerseDimmed: i,
  isVerseDisabled: c,
  suppressKeyboardHighlight: d,
  className: l
}) {
  if (!(!t || r <= 0))
    return /* @__PURE__ */ a(
      Oi,
      {
        count: r,
        valueBuilder: (w) => ha(t, e, w),
        onSelect: n,
        itemRef: s,
        isDisabled: c,
        isDimmed: i,
        isSelected: (w) => t === o.book && e === o.chapterNum && w === o.verseNum,
        suppressKeyboardHighlight: d,
        className: l
      }
    );
}
const xd = "a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]";
function yd(t) {
  return Array.from(t.querySelectorAll(xd)).filter(
    (e) => e.tabIndex >= 0
  );
}
function Xa({
  scrRef: t,
  handleSubmit: e,
  className: r,
  getActiveBookIds: o,
  getAdditionalBookIds: n,
  localizedBookNames: s,
  localizedStrings: i,
  recentSearches: c,
  onAddRecentSearch: d,
  id: l,
  getEndVerse: w,
  disableReferencesUpTo: p,
  submitKeys: h,
  triggerContent: f,
  triggerVariant: m = "outline",
  showTriggerChevron: x = !1,
  onOpenChange: g,
  onCloseAutoFocus: T,
  modal: y = !1,
  align: C = "center",
  ref: N,
  disabled: A
}) {
  const B = Re(), U = nd(), [O, S] = _(!1), [D, W] = _(""), [Y, z] = _(""), [k, ot] = _("books"), [I, X] = _(void 0), [G, $] = _(
    void 0
  ), [at, ut] = _(void 0), [dt, tt] = _(!1), [pt, kt] = _(!1), [mt, Rt] = _(!1), [jt, Pt] = _(!1), ge = L(null), we = L(!1), _t = L(void 0), Nt = L(void 0), Et = L(void 0), oe = L(void 0), fe = L({}), Dt = L({}), Mt = V(
    (v) => {
      e(v), d && d(v);
    },
    [e, d]
  ), ne = P(() => o ? o() : Es, [o]), ke = P(
    () => o && n ? n() : [],
    [o, n]
  ), {
    projectBooksBySection: me,
    reachableBooksBySection: Oe,
    reachableBooks: le,
    projectBooks: Yt,
    booksOutsideProject: Xt
  } = P(
    () => md(ne, ke),
    [ne, ke]
  ), Jt = Xt.has(t.book), Ie = P(() => Y.trim() ? xo(
    le.filter((v) => To(v, Y, s))
  ) : pt ? Oe : me, [
    me,
    Oe,
    le,
    pt,
    Y,
    s
  ]), M = P(
    () => fd(Y, le, s),
    [Y, le, s]
  ), Ot = P(() => {
    if (!M) return;
    const v = D.startsWith(`${M.book} `) ? D : "", q = ia(v), lt = Ar(v);
    return {
      book: M.book,
      chapterNum: lt ?? M.chapterNum ?? 1,
      verseNum: q ?? M.verseNum ?? 1
    };
  }, [M, D]), qt = L(!1);
  Z(() => {
    if (!qt.current) {
      qt.current = !0;
      return;
    }
    g == null || g(O);
  }, [O, g]);
  const It = V(() => {
    Ot && (p && Ya(
      Ot.book,
      Ot.chapterNum,
      Ot.verseNum,
      p
    ) || (Mt(Ot), S(!1), z(""), W("")));
  }, [Mt, Ot, p]), R = V(
    (v) => {
      const q = G ?? (M == null ? void 0 : M.book), lt = at ?? (M == null ? void 0 : M.chapterNum);
      !q || !lt || (Mt({
        book: q,
        chapterNum: lt,
        verseNum: v
      }), S(!1));
    },
    [Mt, G, at, M]
  ), K = V(
    (v) => {
      if (p && xn(v, p)) return;
      if (qe(v) <= 1) {
        Mt({
          book: v,
          chapterNum: 1,
          verseNum: 1
        }), S(!1), z("");
        return;
      }
      X(v), ot("chapters");
    },
    [Mt, p]
  ), J = V(
    (v) => {
      const q = k === "chapters" ? I : M == null ? void 0 : M.book;
      if (q) {
        if (w && w(q, v) > 1) {
          $(q), ut(v), ot("verses"), W("");
          return;
        }
        Mt({
          book: q,
          chapterNum: v,
          verseNum: 1
        }), S(!1);
      }
    },
    [Mt, k, I, M, w]
  ), H = V(
    (v) => {
      Mt(v), S(!1), z("");
    },
    [Mt]
  ), Q = ud(
    t,
    pt ? le : Yt,
    B,
    e,
    i
  ), j = V((v) => {
    z(v), Pt(!1);
  }, []), nt = V(() => {
    ot("books"), X(void 0), $(void 0), ut(void 0), Pt(!1), setTimeout(() => {
      var v;
      (v = Nt.current) == null || v.focus();
    }, 0);
  }, []), st = V(() => {
    const v = G;
    $(void 0), ut(void 0), v ? (X(v), ot("chapters"), W("")) : nt();
  }, [G, nt]), it = V(
    (v) => {
      S(v), v && (ot("books"), X(void 0), $(void 0), ut(void 0), z(""), Pt(!1), Rt(!1), kt(Jt));
    },
    [Jt]
  );
  Z(() => {
    A && it(!1);
  }, [A, it]);
  const [vt, Ct] = _(0);
  Z(() => {
    var v;
    vt !== 0 && ((v = Nt.current) == null || v.focus());
  }, [vt]), $c(
    N,
    () => ({
      open: () => {
        A || (it(!0), Ct((v) => v + 1));
      }
    }),
    [it, A]
  );
  const { otLong: Tt, ntLong: Gt, dcLong: rr, extraLong: Ue } = {
    otLong: i == null ? void 0 : i["%scripture_section_ot_long%"],
    ntLong: i == null ? void 0 : i["%scripture_section_nt_long%"],
    dcLong: i == null ? void 0 : i["%scripture_section_dc_long%"],
    extraLong: i == null ? void 0 : i["%scripture_section_extra_long%"]
  }, ze = V(
    (v) => qn(v, Tt, Gt, rr, Ue),
    [Tt, Gt, rr, Ue]
  ), _e = V(
    (v) => M ? !!M.chapterNum && !v.toString().includes(M.chapterNum.toString()) : !1,
    [M]
  ), hr = P(
    () => $e(
      t,
      s ? Ae(t.book, s) : "English"
    ),
    [t, s]
  ), Zr = P(
    () => U >= Br.TIGHT ? Vr(t.book, s) : Ae(t.book, s),
    [t.book, s, U]
  ), gr = `${t.chapterNum}:${t.verseNum}`, E = V((v) => (q) => {
    fe.current[v] = q;
  }, []), ct = V((v) => (q) => {
    Dt.current[v] = q;
  }, []), wt = P(
    () => hd(Y),
    [Y]
  ), zt = P(() => !w || !M || !M.chapterNum || !wt ? !1 : w(M.book, M.chapterNum) > 0, [w, M, wt]), Ke = k === "books" && !dt && !Y.trim() && Xt.size > 0, ja = V(
    (v) => p ? xn(v, p) : !1,
    [p]
  ), Pe = V(
    (v) => (q) => p ? gd(v, q, p) : !1,
    [p]
  ), fr = V(
    (v, q) => (lt) => p ? Ya(v, q, lt, p) : !1,
    [p]
  ), mr = se(
    i == null ? void 0 : i["%webView_bookChapterControl_selectChapter%"],
    "Select chapter"
  ), Fa = se(
    i == null ? void 0 : i["%webView_bookChapterControl_selectVerse%"],
    "Select verse"
  ), Qr = k === "verses" ? se(
    i == null ? void 0 : i["%webView_bookChapterControl_backToChapters%"],
    "Back to chapters"
  ) : se(
    i == null ? void 0 : i["%webView_bookChapterControl_backToBooks%"],
    "Back to books"
  ), Ua = se(
    i == null ? void 0 : i["%webView_bookChapterControl_bookNotInProject%"],
    "Not in project"
  ), ta = se(
    i == null ? void 0 : i["%webView_bookChapterControl_bookNotInProjectDescription%"],
    "{book} is not in this project"
  ), ea = V(
    (v) => Ye(ta, {
      book: `${Ae(v, s)} (${Vr(
        v,
        s
      )})`
    }),
    [ta, s]
  ), ra = se(
    i == null ? void 0 : i["%webView_bookChapterControl_showMoreBooks%"],
    "Show more books"
  ), vr = se(
    i == null ? void 0 : i["%webView_bookChapterControl_showProjectBooksOnly%"],
    "Show project books only"
  ), aa = V(
    (v) => {
      (v.key === "Home" || v.key === "End") && v.stopPropagation(), h && h.includes(v.key) && M && M.chapterNum !== void 0 && M.verseNum !== void 0 && (v.preventDefault(), v.stopPropagation(), It());
    },
    [h, M, It]
  ), oa = V(
    (v) => {
      var Jo, Zo;
      if (v.ctrlKey) return;
      const q = v.target instanceof HTMLElement ? v.target : void 0;
      if (!(!!q && !!((Jo = _t.current) != null && Jo.contains(q))) && (q != null && q.closest('[role="menu"], [role="menuitem"]')))
        return;
      if (v.key === "Tab") {
        const Bt = _t.current ? yd(_t.current) : [];
        if (Bt.length === 0) {
          v.preventDefault(), v.stopPropagation();
          return;
        }
        const pe = Bt[Bt.length - 1], Zt = v.shiftKey ? Bt[0] : pe;
        document.activeElement === Zt && (v.preventDefault(), v.stopPropagation(), (v.shiftKey ? pe : Bt[0]).focus());
        return;
      }
      const { isLetter: Ft, isDigit: Wt } = vn(v.key);
      if ((k === "chapters" || k === "verses") && (v.key === " " || v.key === "Enter")) {
        if (!!(q != null && q.closest(
          'button, a, input, select, textarea, [role="button"]'
        ))) {
          v.stopPropagation();
          return;
        }
        const pe = (() => {
          if (k === "verses") {
            const Or = G, Qo = at, Ka = ia(D);
            return !Or || !Qo || Ka === void 0 ? void 0 : {
              isDisabled: fr(Or, Qo)(Ka),
              activate: () => R(Ka)
            };
          }
          const Zt = I, be = Ar(D);
          if (!(!Zt || be === void 0))
            return {
              isDisabled: Pe(Zt)(be),
              activate: () => J(be)
            };
        })();
        if (pe) {
          v.preventDefault(), v.stopPropagation(), pe.isDisabled || pe.activate();
          return;
        }
      }
      if (k === "books" && M && !dt && v.key === "Enter" && !(q !== Nt.current && !!(q != null && q.closest('button, a, input, select, textarea, [role="button"]')))) {
        v.preventDefault(), v.stopPropagation(), It();
        return;
      }
      if ((k === "chapters" || k === "verses") && (Ft || Wt)) {
        v.preventDefault(), v.stopPropagation();
        return;
      }
      if (v.key === "Backspace" && (k === "chapters" || k === "verses")) {
        v.preventDefault(), v.stopPropagation(), k === "verses" ? st() : nt();
        return;
      }
      if (!ad(v.key) || dt) return;
      if (k === "books" && !jt && (v.key === "ArrowLeft" || v.key === "ArrowRight")) {
        const Bt = q === Nt.current ? Nt.current : void 0, pe = (Bt == null ? void 0 : Bt.selectionStart) ?? 0, Zt = (Bt == null ? void 0 : Bt.selectionEnd) ?? 0, be = B === "rtl" ? v.key === "ArrowRight" : v.key === "ArrowLeft";
        if (!!Bt && (pe !== Zt || (be ? pe > 0 : Zt < Bt.value.length))) return;
      }
      if (v.shiftKey || k === "books" && q !== Nt.current && (q != null && q.closest('button, a, [role="button"]')))
        return;
      const St = (() => {
        const Bt = k === "books" && M && zt && M.chapterNum ? { bookId: M.book, chapterNum: M.chapterNum } : void 0, pe = k === "verses" ? { bookId: G, chapterNum: at } : Bt;
        if (pe) {
          const { bookId: Zt, chapterNum: be } = pe;
          return !Zt || !be || !w ? void 0 : {
            max: w(Zt, be),
            current: ia(D) ?? 0,
            buildValue: (Or) => ha(Zt, be, Or),
            refs: Dt,
            // In books view focus stays on the CommandInput so the user can keep typing; only
            // the dedicated grid views pull focus off the back button.
            takeFocus: k === "verses"
          };
        }
        if (k === "chapters" || k === "books" && M && qe(M.book) > 1) {
          const Zt = k === "chapters" ? I : M == null ? void 0 : M.book;
          return Zt ? {
            max: qe(Zt),
            current: Ar(D) ?? 0,
            buildValue: (be) => _r(Zt, be),
            refs: fe,
            takeFocus: k === "chapters"
          } : void 0;
        }
      })();
      if (!St || St.max <= 0) return;
      k === "books" && Pt(!0), St.takeFocus && ((Zo = _t.current) == null || Zo.focus());
      const ie = bd({
        current: St.current,
        key: v.key,
        max: St.max,
        direction: B
      });
      if (v.preventDefault(), v.stopPropagation(), ie === St.current) return;
      W(St.buildValue(ie));
      const Xo = St.refs.current[ie];
      Xo && Xo.scrollIntoView({ block: "nearest", behavior: "smooth" });
    },
    [
      k,
      M,
      zt,
      dt,
      jt,
      B,
      nt,
      st,
      J,
      It,
      R,
      Pe,
      fr,
      I,
      G,
      at,
      w,
      D
    ]
  ), F = V((v) => {
    var Ft, Wt;
    if (v.shiftKey || v.key === "Tab" || v.key === " ") return;
    if (v.key === "Enter") {
      v.stopPropagation();
      return;
    }
    if (v.key === "ArrowUp" || v.key === "ArrowDown") {
      (Ft = Nt.current) == null || Ft.focus();
      return;
    }
    const { isLetter: q, isDigit: lt } = vn(v.key);
    (q || lt) && (v.preventDefault(), z((St) => St + v.key), (Wt = Nt.current) == null || Wt.focus(), tt(!1));
  }, []);
  re(() => {
    const v = setTimeout(() => {
      if (O && k === "books" && Et.current && oe.current) {
        const q = Et.current, lt = oe.current, Ft = lt.offsetTop, Wt = q.clientHeight, St = lt.clientHeight, ie = Ft - Wt / 2 + St / 2;
        q.scrollTo({
          top: Math.max(0, ie),
          behavior: "smooth"
        }), W(bo(t.book));
      }
    }, 0);
    return () => {
      clearTimeout(v);
    };
  }, [O, k, Y, M, t.book]), re(() => {
    if (k === "chapters" && I) {
      const v = I === t.book, q = v ? t.chapterNum : 1;
      W(_r(I, q)), setTimeout(() => {
        if (Et.current)
          if (v) {
            const lt = fe.current[t.chapterNum];
            lt && lt.scrollIntoView({ block: "center", behavior: "smooth" });
          } else
            Et.current.scrollTo({ top: 0 });
        _t.current && _t.current.focus();
      }, 0);
    }
  }, [k, I, M, t.book, t.chapterNum]), re(() => {
    if (k === "verses" && G && at !== void 0) {
      const v = G === t.book && at === t.chapterNum, q = v ? t.verseNum : 1;
      W(
        ha(G, at, q)
      ), setTimeout(() => {
        if (Et.current)
          if (v) {
            const lt = Dt.current[t.verseNum];
            lt && lt.scrollIntoView({ block: "center", behavior: "smooth" });
          } else
            Et.current.scrollTo({ top: 0 });
        _t.current && _t.current.focus();
      }, 0);
    }
  }, [
    k,
    G,
    at,
    t.book,
    t.chapterNum,
    t.verseNum
  ]);
  const rt = M ? `${M.book} ${M.chapterNum ?? ""} ${M.verseNum ?? ""} ${zt}` : "", Lt = L(""), ue = L(""), ve = P(() => {
    if (k !== "books" || !M || dt) return;
    const { book: v, chapterNum: q, verseNum: lt } = M;
    if (zt && q && w)
      return {
        max: w(v, q),
        initial: lt ?? (v === t.book && q === t.chapterNum ? t.verseNum : 1),
        parse: ia,
        buildValue: (Wt) => ha(v, q, Wt)
      };
    const Ft = qe(v);
    if (!(Ft <= 1))
      return {
        max: Ft,
        initial: q ?? (v === t.book ? t.chapterNum : 1),
        parse: Ar,
        buildValue: (Wt) => _r(v, Wt)
      };
  }, [
    k,
    M,
    dt,
    zt,
    w,
    t.book,
    t.chapterNum,
    t.verseNum
  ]);
  return re(() => {
    if (k !== "books" || !M || !ve || ve.max <= 0) {
      Lt.current = "";
      return;
    }
    const { max: v, initial: q, parse: lt, buildValue: Ft } = ve, Wt = (St) => {
      const ie = lt(St);
      return ie !== void 0 && ie >= 1 && ie <= v && St === Ft(ie) ? ie : void 0;
    };
    if (Lt.current !== rt) {
      Lt.current = rt;
      const St = Ft(Math.min(Math.max(q, 1), v));
      ue.current = St, W(St);
      return;
    }
    if (Wt(D) !== void 0) {
      ue.current = D;
      return;
    }
    W(
      Wt(ue.current) !== void 0 ? ue.current : Ft(Math.min(Math.max(q, 1), v))
    );
  }, [k, M, ve, rt, D]), /* @__PURE__ */ u(lr, { open: O, onOpenChange: it, modal: y, children: [
    /* @__PURE__ */ a(Dr, { asChild: !0, children: /* @__PURE__ */ u(
      et,
      {
        ref: ge,
        "aria-label": "book-chapter-trigger",
        variant: m,
        role: "combobox",
        "aria-expanded": O,
        disabled: A,
        className: b(
          "tw:h-8 tw:w-full tw:min-w-16 tw:max-w-48 tw:shrink tw:overflow-hidden tw:px-1",
          r
        ),
        onClick: (v) => {
          we.current && (we.current = !1, v.preventDefault());
        },
        children: [
          f ?? /* @__PURE__ */ a(
            sd,
            {
              primary: Zr,
              secondary: gr,
              showSecondary: U < Br.MINIMUM,
              isPartial: U >= Br.TIGHT,
              fullText: hr
            }
          ),
          x && /* @__PURE__ */ a(
            wi,
            {
              "data-testid": "book-chapter-control-chevron",
              className: "tw:ms-2 tw:size-4 tw:shrink-0 tw:opacity-50"
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ a(
      dr,
      {
        id: l,
        forceMount: !0,
        className: "tw:w-[280px] tw:p-0",
        align: C,
        onKeyDownCapture: oa,
        onKeyDown: (v) => v.stopPropagation(),
        onPointerDownOutside: (v) => {
          const { target: q } = v;
          O && ge.current && q instanceof Node && ge.current.contains(q) && (we.current = !0, it(!1));
        },
        onCloseAutoFocus: T,
        children: /* @__PURE__ */ a(Vt, { children: /* @__PURE__ */ u(
          wr,
          {
            ref: _t,
            loop: !0,
            value: D,
            onValueChange: W,
            disablePointerSelection: !0,
            shouldFilter: !1,
            children: [
              k === "books" ? /* @__PURE__ */ u(
                "div",
                {
                  className: b("tw:flex tw:items-end", dt && "tw:pb-1"),
                  onFocus: (v) => {
                    Rt(v.target !== Nt.current);
                  },
                  onBlur: (v) => {
                    v.currentTarget.contains(v.relatedTarget) || Rt(!1);
                  },
                  children: [
                    /* @__PURE__ */ u("div", { className: "tw:relative tw:flex-1", children: [
                      /* @__PURE__ */ a(
                        Ma,
                        {
                          ref: Nt,
                          value: Y,
                          onValueChange: j,
                          onKeyDown: aa,
                          onFocus: () => tt(!1),
                          className: c && c.length > 0 ? "tw:pe-8!" : "",
                          spaceSelectsHighlightedItem: !0
                        }
                      ),
                      c && c.length > 0 && /* @__PURE__ */ a(
                        wd,
                        {
                          recentSearches: c,
                          onSearchItemSelect: H,
                          renderItem: (v) => $e(v, "English"),
                          getItemKey: (v) => `${v.book}-${v.chapterNum}-${v.verseNum}`,
                          ariaLabel: i == null ? void 0 : i["%history_recentSearches_ariaLabel%"],
                          groupHeading: i == null ? void 0 : i["%history_recent%"],
                          buttonClassName: "tw:absolute tw:end-1 tw:top-1"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ a(Oa, { className: "tw:translate-y-px tw:gap-1 tw:pe-2", children: Q.map(
                      ({ onClick: v, disabled: q, title: lt, icon: Ft, group: Wt }, St) => {
                        const ie = /* @__PURE__ */ a(
                          et,
                          {
                            variant: "ghost",
                            size: "sm",
                            onClick: () => {
                              tt(!0), v();
                            },
                            disabled: q,
                            className: "tw:h-8.5 tw:w-6 tw:rounded-lg! tw:p-0",
                            "aria-label": lt,
                            onKeyDown: F,
                            children: /* @__PURE__ */ a(Ft, {})
                          }
                        );
                        return (
                          // Keyed by position, not by `title`: the titles are localized, so they all
                          // change together the moment the strings resolve or the UI language does.
                          // Keying on them would remount all four buttons at that instant, dropping
                          // focus off whichever one the user was on and destroying an open tooltip.
                          // The set is fixed in size and order, so the index is stable.
                          // eslint-disable-next-line react/no-array-index-key
                          /* @__PURE__ */ u(Yr, { children: [
                            St > 0 && Wt !== Q[St - 1].group && /* @__PURE__ */ a(So, {}),
                            q ? (
                              // A disabled Button carries `pointer-events: none` from its own base
                              // variants, so it is not hit-tested: neither a Radix tooltip nor a
                              // `title` ON THE BUTTON can ever fire. These arrows come back disabled
                              // at the edges of the canon — Genesis 1:1 is the default state of a
                              // freshly opened project — which is exactly where a user asks what the
                              // button was for. The wrapper is still hit-tested, so the native
                              // tooltip it carries is the one hover explanation available here.
                              /* @__PURE__ */ a("span", { title: lt, className: "tw:inline-flex", children: ie })
                            ) : /* @__PURE__ */ u(bt, { children: [
                              /* @__PURE__ */ a(xt, { asChild: !0, children: ie }),
                              /* @__PURE__ */ a(yt, { children: lt })
                            ] })
                          ] }, `${Wt}-${St}`)
                        );
                      }
                    ) })
                  ]
                }
              ) : /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:border-b tw:px-3 tw:py-1", children: [
                /* @__PURE__ */ u(bt, { children: [
                  /* @__PURE__ */ a(xt, { asChild: !0, children: /* @__PURE__ */ a(
                    et,
                    {
                      variant: "ghost",
                      size: "sm",
                      onClick: k === "verses" ? st : nt,
                      className: "tw:me-2 tw:h-6 tw:w-6 tw:p-0",
                      tabIndex: -1,
                      "aria-label": Qr,
                      children: B === "ltr" ? /* @__PURE__ */ a(Gs, { className: "tw:h-4 tw:w-4" }) : /* @__PURE__ */ a(Ws, { className: "tw:h-4 tw:w-4" })
                    }
                  ) }),
                  /* @__PURE__ */ a(yt, { children: Qr })
                ] }),
                k === "chapters" && I && /* @__PURE__ */ a("span", { tabIndex: -1, className: "tw:text-sm tw:font-medium", children: Ae(I, s) }),
                k === "verses" && G && at !== void 0 && /* @__PURE__ */ a("span", { tabIndex: -1, className: "tw:text-sm tw:font-medium", children: `${Ae(G, s)} ${at}` }),
                /* @__PURE__ */ a(
                  "span",
                  {
                    tabIndex: -1,
                    className: "tw:ms-auto tw:text-sm tw:font-medium tw:text-muted-foreground",
                    children: k === "verses" ? Fa : mr
                  }
                )
              ] }),
              !dt && /* @__PURE__ */ u(ur, { ref: Et, children: [
                k === "books" && /* @__PURE__ */ u(gt, { children: [
                  !M && Object.entries(Ie).map(([v, q]) => {
                    if (q.length !== 0)
                      return (
                        // We are mapping over filteredBooksByType, which uses Section as key type
                        // eslint-disable-next-line no-type-assertion/no-type-assertion
                        /* @__PURE__ */ a(Je, { heading: ze(v), children: q.map((lt) => /* @__PURE__ */ a(
                          Ri,
                          {
                            bookId: lt,
                            onSelect: (Ft) => K(Ft),
                            section: ua(lt),
                            commandValue: bo(lt),
                            suppressKeyboardHighlight: mt,
                            ref: lt === t.book ? oe : void 0,
                            localizedBookNames: s,
                            disabled: ja(lt),
                            dimmedReason: Xt.has(lt) ? Ua : void 0,
                            dimmedDescription: Xt.has(lt) ? ea(lt) : void 0
                          },
                          lt
                        )) }, v)
                      );
                  }),
                  M && Ot && /* @__PURE__ */ a(Je, { children: /* @__PURE__ */ u(
                    tr,
                    {
                      value: cd,
                      onSelect: It,
                      disabled: !!p && Ya(
                        Ot.book,
                        Ot.chapterNum,
                        Ot.verseNum,
                        p
                      ),
                      className: "tw:font-semibold tw:text-primary tw:hover:bg-muted tw:[&>svg:last-child]:hidden",
                      children: [
                        /* @__PURE__ */ a("span", { className: "tw:min-w-0 tw:flex-1", children: $e(
                          Ot,
                          Ae(M.book, s)
                        ) }),
                        /* @__PURE__ */ a("span", { className: "tw:ms-2 tw:shrink-0 tw:text-xs tw:text-muted-foreground", children: Vr(M.book, s) })
                      ]
                    },
                    "top-match"
                  ) }),
                  M && zt && M.chapterNum && w && // No heading over this grid: the top-match row sits directly above it and
                  // already names the book and the reference the grid is refining, so a
                  // heading here only repeated the book back to the user one line later. The
                  // dedicated verses view still carries one, because there it is the only
                  // thing naming the book.
                  /* @__PURE__ */ a(
                    kn,
                    {
                      bookId: M.book,
                      chapterNum: M.chapterNum,
                      endVerse: w(M.book, M.chapterNum),
                      scrRef: t,
                      onVerseSelect: R,
                      setVerseRef: ct,
                      isVerseDisabled: fr(M.book, M.chapterNum),
                      suppressKeyboardHighlight: mt,
                      className: "tw:px-4 tw:pb-4"
                    }
                  ),
                  M && !zt && qe(M.book) > 1 && // No heading here either, for the same reason as the verse preview above:
                  // the top-match row directly above already names the book.
                  /* @__PURE__ */ a(
                    yn,
                    {
                      bookId: M.book,
                      scrRef: t,
                      onChapterSelect: J,
                      setChapterRef: E,
                      isChapterDimmed: _e,
                      isChapterDisabled: Pe(M.book),
                      suppressKeyboardHighlight: mt,
                      className: "tw:px-4 tw:pb-4"
                    }
                  )
                ] }),
                k === "chapters" && I && /* @__PURE__ */ a(
                  yn,
                  {
                    bookId: I,
                    scrRef: t,
                    onChapterSelect: J,
                    setChapterRef: E,
                    isChapterDisabled: Pe(I),
                    className: "tw:p-4"
                  }
                ),
                k === "verses" && G && at !== void 0 && w && /* @__PURE__ */ a(
                  kn,
                  {
                    bookId: G,
                    chapterNum: at,
                    endVerse: w(
                      G,
                      at
                    ),
                    scrRef: t,
                    onVerseSelect: R,
                    setVerseRef: ct,
                    isVerseDisabled: fr(
                      G,
                      at
                    ),
                    className: "tw:p-4"
                  }
                )
              ] }),
              Ke && /* @__PURE__ */ a("div", { className: "tw:border-t tw:p-1", children: /* @__PURE__ */ a(
                et,
                {
                  variant: "ghost",
                  size: "sm",
                  className: "tw:w-full tw:justify-start tw:font-normal",
                  onClick: () => kt((v) => !v),
                  children: pt ? vr : ra
                }
              ) })
            ]
          }
        ) })
      }
    )
  ] });
}
const wh = Object.freeze([
  "%scripture_section_ot_long%",
  "%scripture_section_nt_long%",
  "%scripture_section_dc_long%",
  "%scripture_section_extra_long%",
  "%history_recent%",
  "%history_recentSearches_ariaLabel%",
  "%webView_bookChapterControl_bookNotInProject%",
  "%webView_bookChapterControl_bookNotInProjectDescription%",
  "%webView_bookChapterControl_selectChapter%",
  "%webView_bookChapterControl_selectVerse%",
  "%webView_bookChapterControl_showMoreBooks%",
  "%webView_bookChapterControl_showProjectBooksOnly%",
  "%webView_bookChapterControl_previousChapter%",
  "%webView_bookChapterControl_nextChapter%",
  "%webView_bookChapterControl_previousVerse%",
  "%webView_bookChapterControl_nextVerse%",
  "%webView_bookChapterControl_backToBooks%",
  "%webView_bookChapterControl_backToChapters%"
]);
function kd(t) {
  return typeof t == "string" ? t : typeof t == "number" ? t.toString() : t.label;
}
function _n({
  id: t,
  options: e = [],
  className: r,
  buttonClassName: o,
  popoverContentClassName: n,
  popoverContentStyle: s,
  value: i,
  onChange: c = () => {
  },
  getOptionLabel: d = kd,
  getButtonLabel: l,
  icon: w = void 0,
  buttonPlaceholder: p = "",
  textPlaceholder: h = "",
  commandEmptyMessage: f = "No option found",
  buttonVariant: m = "outline",
  alignDropDown: x = "start",
  isDisabled: g = !1,
  ariaLabel: T,
  ...y
}) {
  const [C, N] = _(!1), A = l ?? d, B = (O) => O.length > 0 && typeof O[0] == "object" && "options" in O[0], U = (O, S) => {
    const D = d(O), W = typeof O == "object" && "secondaryLabel" in O ? O.secondaryLabel : void 0, Y = `${S ?? ""}${D}${W ?? ""}`;
    return /* @__PURE__ */ u(
      tr,
      {
        value: D,
        onSelect: () => {
          c(O), N(!1);
        },
        className: "tw:gap-1.5!",
        children: [
          /* @__PURE__ */ a(
            Ze,
            {
              className: b("tw:h-4 tw:w-4 tw:shrink-0", {
                "tw:opacity-0": !i || d(i) !== D
              })
            }
          ),
          /* @__PURE__ */ u("span", { className: "tw:flex-1 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap", children: [
            D,
            W && /* @__PURE__ */ u("span", { className: "tw:text-muted-foreground", children: [
              " · ",
              W
            ] })
          ] })
        ]
      },
      Y
    );
  };
  return /* @__PURE__ */ u(lr, { open: C, onOpenChange: N, ...y, children: [
    /* @__PURE__ */ a(Dr, { asChild: !0, children: /* @__PURE__ */ u(
      et,
      {
        variant: m,
        role: "combobox",
        "aria-expanded": C,
        "aria-label": T,
        id: t,
        className: b(
          "tw:flex tw:w-[200px] tw:items-center tw:justify-between tw:overflow-hidden",
          o ?? r
        ),
        disabled: g,
        children: [
          /* @__PURE__ */ u("div", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-center tw:overflow-hidden", children: [
            w && /* @__PURE__ */ a("div", { className: "tw:shrink-0 tw:pe-2", children: w }),
            /* @__PURE__ */ a(
              "span",
              {
                className: b(
                  "tw:min-w-0 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap tw:text-start"
                ),
                children: i ? A(i) : p
              }
            )
          ] }),
          /* @__PURE__ */ a(sr, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ a(
      dr,
      {
        align: x,
        className: b("tw:w-[200px] tw:p-0", n),
        style: s,
        children: /* @__PURE__ */ u(wr, { children: [
          /* @__PURE__ */ a(
            Ma,
            {
              placeholder: h,
              className: "tw:text-inherit",
              spaceSelectsHighlightedItem: !0
            }
          ),
          /* @__PURE__ */ a(Ia, { children: f }),
          /* @__PURE__ */ a(ur, { children: B(e) ? e.map((O) => /* @__PURE__ */ a(Je, { heading: O.groupHeading, children: O.options.map((S) => U(S, O.groupHeading)) }, O.groupHeading)) : /* @__PURE__ */ a(Je, { children: e.map((O) => U(O)) }) })
        ] })
      }
    )
  ] });
}
function _d({
  startChapter: t,
  endChapter: e,
  handleSelectStartChapter: r,
  handleSelectEndChapter: o,
  isDisabled: n = !1,
  chapterCount: s
}) {
  const i = P(
    () => Array.from({ length: s }, (l, w) => w + 1),
    [s]
  );
  return /* @__PURE__ */ u(gt, { children: [
    /* @__PURE__ */ a($t, { htmlFor: "start-chapters-combobox", children: "Chapters" }),
    /* @__PURE__ */ a(
      _n,
      {
        isDisabled: n,
        onChange: (l) => {
          r(l), l > e && o(l);
        },
        buttonClassName: "tw:me-2 tw:ms-2 tw:w-20",
        options: i,
        getOptionLabel: (l) => l.toString(),
        value: t
      },
      "start chapter"
    ),
    /* @__PURE__ */ a($t, { htmlFor: "end-chapters-combobox", children: "to" }),
    /* @__PURE__ */ a(
      _n,
      {
        isDisabled: n,
        onChange: (l) => {
          o(l), l < t && r(l);
        },
        buttonClassName: "tw:ms-2 tw:w-20",
        options: i,
        getOptionLabel: (l) => l.toString(),
        value: e
      },
      "end chapter"
    )
  ] });
}
var ko = /* @__PURE__ */ ((t) => (t.CurrentBook = "current book", t.ChooseBooks = "choose books", t))(ko || {});
((t) => {
  t.CURRENT_BOOK = "current book", t.CHOOSE_BOOKS = "choose books";
})(ko || (ko = {}));
const uh = Object.freeze([
  "%webView_bookSelector_currentBook%",
  "%webView_bookSelector_choose%",
  "%webView_bookSelector_chooseBooks%"
]), Ja = (t, e) => t[e] ?? e;
function ph({
  handleBookSelectionModeChange: t,
  currentBookName: e,
  onSelectBooks: r,
  selectedBookIds: o,
  chapterCount: n,
  endChapter: s,
  handleSelectEndChapter: i,
  startChapter: c,
  handleSelectStartChapter: d,
  localizedStrings: l
}) {
  const w = Ja(l, "%webView_bookSelector_currentBook%"), p = Ja(l, "%webView_bookSelector_choose%"), h = Ja(l, "%webView_bookSelector_chooseBooks%"), [f, m] = _(
    "current book"
    /* CurrentBook */
  ), x = (g) => {
    m(g), t(g);
  };
  return /* @__PURE__ */ a(
    Ro,
    {
      className: "pr-twp tw:flex",
      value: f,
      onValueChange: (g) => x(g),
      children: /* @__PURE__ */ u("div", { className: "tw:flex tw:w-full tw:flex-col tw:gap-4", children: [
        /* @__PURE__ */ u("div", { className: "tw:grid tw:grid-cols-[25%_25%_50%]", children: [
          /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center", children: [
            /* @__PURE__ */ a(ya, {
              value: "current book"
              /* CurrentBook */
            }),
            /* @__PURE__ */ a($t, { className: "tw:ms-1", children: w })
          ] }),
          /* @__PURE__ */ a($t, { className: "tw:flex tw:items-center", children: e }),
          /* @__PURE__ */ a("div", { className: "tw:flex tw:items-center tw:justify-end", children: /* @__PURE__ */ a(
            _d,
            {
              isDisabled: f === "choose books",
              handleSelectStartChapter: d,
              handleSelectEndChapter: i,
              chapterCount: n,
              startChapter: c,
              endChapter: s
            }
          ) })
        ] }),
        /* @__PURE__ */ u("div", { className: "tw:grid tw:grid-cols-[25%_50%_25%]", children: [
          /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center", children: [
            /* @__PURE__ */ a(ya, {
              value: "choose books"
              /* ChooseBooks */
            }),
            /* @__PURE__ */ a($t, { className: "tw:ms-1", children: h })
          ] }),
          /* @__PURE__ */ a($t, { className: "tw:flex tw:items-center", children: o.map((g) => Kt.bookIdToEnglishName(g)).join(", ") }),
          /* @__PURE__ */ a(
            et,
            {
              disabled: f === "current book",
              onClick: () => r(),
              children: p
            }
          )
        ] })
      ] })
    }
  );
}
const Ii = Wr(null);
function Nd(t, e) {
  return { getTheme: function() {
    return e ?? null;
  } };
}
function Me() {
  const t = Pa(Ii);
  return t == null && function(e, ...r) {
    const o = new URL("https://lexical.dev/docs/error"), n = new URLSearchParams();
    n.append("code", e);
    for (const s of r) n.append("v", s);
    throw o.search = n.toString(), Error(`Minified Lexical error #${e}; visit ${o.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
  }(8), t;
}
const zi = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, Cd = zi ? re : Z, ca = { tag: $o };
function Ed({ initialConfig: t, children: e }) {
  const r = P(() => {
    const { theme: o, namespace: n, nodes: s, onError: i, editorState: c, html: d } = t, l = Nd(null, o), w = pi({ editable: t.editable, html: d, namespace: n, nodes: s, onError: (p) => i(p, w), theme: o });
    return function(p, h) {
      if (h !== null) {
        if (h === void 0) p.update(() => {
          const f = Qe();
          if (f.isEmpty()) {
            const m = Xr();
            f.append(m);
            const x = zi ? document.activeElement : null;
            (ce() !== null || x !== null && x === p.getRootElement()) && m.select();
          }
        }, ca);
        else if (h !== null) switch (typeof h) {
          case "string": {
            const f = p.parseEditorState(h);
            p.setEditorState(f, ca);
            break;
          }
          case "object":
            p.setEditorState(h, ca);
            break;
          case "function":
            p.update(() => {
              Qe().isEmpty() && h(p);
            }, ca);
        }
      }
    }(w, c), [w, l];
  }, []);
  return Cd(() => {
    const o = t.editable, [n] = r;
    n.setEditable(o === void 0 || o);
  }, []), a(Ii.Provider, { value: r, children: e });
}
const Td = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? re : Z;
function Sd({ ignoreHistoryMergeTagChange: t = !0, ignoreSelectionChange: e = !1, onChange: r }) {
  const [o] = Me();
  return Td(() => {
    if (r) return o.registerUpdateListener(({ editorState: n, dirtyElements: s, dirtyLeaves: i, prevEditorState: c, tags: d }) => {
      e && s.size === 0 && i.size === 0 || t && d.has($o) || c.isEmpty() || r(n, o, d);
    });
  }, [o, t, e, r]), null;
}
const jo = {
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
}, Fo = [
  Al,
  hi,
  gi,
  $l
], Rd = Wr(null), Za = {
  didCatch: !1,
  error: null
};
class Dd extends Vc {
  constructor(e) {
    super(e), this.resetErrorBoundary = this.resetErrorBoundary.bind(this), this.state = Za;
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
      for (var r, o, n = arguments.length, s = new Array(n), i = 0; i < n; i++)
        s[i] = arguments[i];
      (r = (o = this.props).onReset) === null || r === void 0 || r.call(o, {
        args: s,
        reason: "imperative-api"
      }), this.setState(Za);
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
    if (o && r.error !== null && Md(e.resetKeys, n)) {
      var s, i;
      (s = (i = this.props).onReset) === null || s === void 0 || s.call(i, {
        next: n,
        prev: e.resetKeys,
        reason: "keys"
      }), this.setState(Za);
    }
  }
  render() {
    const {
      children: e,
      fallbackRender: r,
      FallbackComponent: o,
      fallback: n
    } = this.props, {
      didCatch: s,
      error: i
    } = this.state;
    let c = e;
    if (s) {
      const d = {
        error: i,
        resetErrorBoundary: this.resetErrorBoundary
      };
      if (typeof r == "function")
        c = r(d);
      else if (o)
        c = wn(o, d);
      else if (n !== void 0)
        c = n;
      else
        throw i;
    }
    return wn(Rd.Provider, {
      value: {
        didCatch: s,
        error: i,
        resetErrorBoundary: this.resetErrorBoundary
      }
    }, c);
  }
}
function Md() {
  let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  return t.length !== e.length || t.some((r, o) => !Object.is(r, e[o]));
}
function Od({ children: t, onError: e }) {
  return a(Dd, { fallback: a("div", { style: { border: "1px solid #f00", color: "#f00", padding: "8px" }, children: "An error was thrown." }), onError: e, children: t });
}
const Id = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? re : Z;
function zd(t) {
  return { initialValueFn: () => t.isEditable(), subscribe: (e) => t.registerEditableListener(e) };
}
function Pd() {
  return function(t) {
    const [e] = Me(), r = P(() => t(e), [e, t]), [o, n] = _(() => r.initialValueFn()), s = L(o);
    return Id(() => {
      const { initialValueFn: i, subscribe: c } = r, d = i();
      return s.current !== d && (s.current = d, n(d)), c((l) => {
        s.current = l, n(l);
      });
    }, [r, t]), o;
  }(zd);
}
function Ad(t, e) {
  const r = t.getRootElement();
  if (r === null) return [];
  const o = r.getBoundingClientRect(), n = getComputedStyle(r), s = parseFloat(n.paddingLeft) + parseFloat(n.paddingRight), i = Array.from(e.getClientRects());
  let c, d = i.length;
  i.sort((l, w) => {
    const p = l.top - w.top;
    return Math.abs(p) <= 3 ? l.left - w.left : p;
  });
  for (let l = 0; l < d; l++) {
    const w = i[l], p = c && c.top <= w.top && c.top + c.height > w.top && c.left + c.width > w.left, h = w.width + s === o.width;
    p || h ? (i.splice(l--, 1), d--) : c = w;
  }
  return i;
}
function Ca(t, ...e) {
  const r = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const n of e) o.append("v", n);
  throw r.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
const Pi = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, $d = Pi && "documentMode" in document ? document.documentMode : null;
!(!Pi || !("InputEvent" in window) || $d) && "getTargetRanges" in new window.InputEvent("input");
function Ce(t) {
  return `${t}px`;
}
const Vd = { attributes: !0, characterData: !0, childList: !0, subtree: !0 };
function Ld(t, e, r) {
  let o = null, n = null, s = null, i = [];
  const c = document.createElement("div");
  function d() {
    o === null && Ca(182), n === null && Ca(183);
    const { left: p, top: h } = n.getBoundingClientRect(), f = Ad(t, e);
    var m, x;
    c.isConnected || (x = c, (m = n).insertBefore(x, m.firstChild));
    let g = !1;
    for (let T = 0; T < f.length; T++) {
      const y = f[T], C = i[T] || document.createElement("div"), N = C.style;
      N.position !== "absolute" && (N.position = "absolute", g = !0);
      const A = Ce(y.left - p);
      N.left !== A && (N.left = A, g = !0);
      const B = Ce(y.top - h);
      N.top !== B && (C.style.top = B, g = !0);
      const U = Ce(y.width);
      N.width !== U && (C.style.width = U, g = !0);
      const O = Ce(y.height);
      N.height !== O && (C.style.height = O, g = !0), C.parentNode !== c && (c.append(C), g = !0), i[T] = C;
    }
    for (; i.length > f.length; ) i.pop();
    g && r(i);
  }
  function l() {
    n = null, o = null, s !== null && s.disconnect(), s = null, c.remove();
    for (const p of i) p.remove();
    i = [];
  }
  c.style.position = "relative";
  const w = t.registerRootListener(function p() {
    const h = t.getRootElement();
    if (h === null) return l();
    const f = h.parentElement;
    if (!sl(f)) return l();
    l(), o = h, n = f, s = new MutationObserver((m) => {
      const x = t.getRootElement(), g = x && x.parentElement;
      if (x !== o || g !== n) return p();
      for (const T of m) if (!c.contains(T.target)) return d();
    }), s.observe(f, Vd), d();
  });
  return () => {
    w(), l();
  };
}
function Nn(t, e, r) {
  if (t.type !== "text" && Kr(e)) {
    const o = e.getDOMSlot(r);
    return [o.element, o.getFirstChildOffset() + t.offset];
  }
  return [il(r) || r, t.offset];
}
function Bd(t) {
  for (const e of t) {
    const r = e.style;
    r.background !== "Highlight" && (r.background = "Highlight"), r.color !== "HighlightText" && (r.color = "HighlightText"), r.marginTop !== Ce(-1.5) && (r.marginTop = Ce(-1.5)), r.paddingTop !== Ce(4) && (r.paddingTop = Ce(4)), r.paddingBottom !== Ce(0) && (r.paddingBottom = Ce(0));
  }
}
function jd(t, e = Bd) {
  let r = null, o = null, n = null, s = null, i = null, c = null, d = () => {
  };
  function l(w) {
    w.read(() => {
      const p = ce();
      if (!Te(p)) return r = null, n = null, s = null, c = null, d(), void (d = () => {
      });
      const [h, f] = function(O) {
        const S = O.getStartEndPoints();
        return O.isBackward() ? [S[1], S[0]] : S;
      }(p), m = h.getNode(), x = m.getKey(), g = h.offset, T = f.getNode(), y = T.getKey(), C = f.offset, N = t.getElementByKey(x), A = t.getElementByKey(y), B = r === null || N !== o || g !== n || x !== r.getKey(), U = s === null || A !== i || C !== c || y !== s.getKey();
      if ((B || U) && N !== null && A !== null) {
        const O = function(S, D, W, Y, z, k, ot) {
          const I = (S._window ? S._window.document : document).createRange();
          return I.setStart(...Nn(D, W, Y)), I.setEnd(...Nn(z, k, ot)), I;
        }(t, h, m, N, f, T, A);
        d(), d = Ld(t, O, e);
      }
      r = m, o = N, n = g, s = T, i = A, c = C;
    });
  }
  return l(t.getEditorState()), Le(t.registerUpdateListener(({ editorState: w }) => l(w)), () => {
    d();
  });
}
function Fd(t, e) {
  let r = null;
  const o = () => {
    const n = getSelection(), s = n && n.anchorNode, i = t.getRootElement();
    s !== null && i !== null && i.contains(s) ? r !== null && (r(), r = null) : r === null && (r = jd(t, e));
  };
  return t.registerRootListener((n) => {
    if (n) {
      const s = n.ownerDocument;
      return s.addEventListener("selectionchange", o), o(), () => {
        r !== null && r(), s.removeEventListener("selectionchange", o);
      };
    }
  });
}
function Ud(t) {
  const e = mi(t, (r) => Kr(r) && !r.isInline());
  return Kr(e) || Ca(4, t.__key), e;
}
function Kd(t) {
  const e = ce() || Xc();
  let r;
  if (Te(e)) r = Jc(e.focus, "next");
  else {
    if (e != null) {
      const i = e.getNodes(), c = i[i.length - 1];
      c && (r = fi(c, "next"));
    }
    r = r || Zc(Qe(), "previous").getFlipped().insert(Xr());
  }
  const o = Hd(t, r), n = Qc(o), s = tl(n) ? el(n) : o;
  return rl(al(s)), t.getLatest();
}
function Hd(t, e, r) {
  let o = un(e, "next");
  for (let n = o; n; n = ol(n, r)) o = n;
  return nl(o) && Ca(283), o.insert(t.isInline() ? Xr().append(t) : t), un(fi(t.getLatest(), "next"), e.direction);
}
function qd(t) {
  const e = ce();
  if (!Te(e)) return !1;
  const r = /* @__PURE__ */ new Set(), o = e.getNodes();
  for (let n = 0; n < o.length; n++) {
    const s = o[n], i = s.getKey();
    if (r.has(i)) continue;
    const c = mi(s, (l) => Kr(l) && !l.isInline());
    if (c === null) continue;
    const d = c.getKey();
    c.canIndent() && !r.has(d) && (r.add(d), t(c));
  }
  return r.size > 0;
}
const Gd = Symbol.for("preact-signals");
function Va() {
  if (Ve > 1) return void Ve--;
  let t, e = !1;
  for (!function() {
    let r = Ea;
    for (Ea = void 0; r !== void 0; ) r.S.v === r.v && (r.S.i = r.i), r = r.o;
  }(); jr !== void 0; ) {
    let r = jr;
    for (jr = void 0, Ta++; r !== void 0; ) {
      const o = r.u;
      if (r.u = void 0, r.f &= -3, !(8 & r.f) && Ai(r)) try {
        r.c();
      } catch (n) {
        e || (t = n, e = !0);
      }
      r = o;
    }
  }
  if (Ta = 0, Ve--, e) throw t;
}
function Wd(t) {
  if (Ve > 0) return t();
  _o = ++Yd, Ve++;
  try {
    return t();
  } finally {
    Va();
  }
}
let ht, jr;
function Cn(t) {
  const e = ht;
  ht = void 0;
  try {
    return t();
  } finally {
    ht = e;
  }
}
let Ea, Ve = 0, Ta = 0, Yd = 0, _o = 0, fa = 0;
function En(t) {
  if (ht === void 0) return;
  let e = t.n;
  return e === void 0 || e.t !== ht ? (e = { i: 0, S: t, p: ht.s, n: void 0, t: ht, e: void 0, x: void 0, r: e }, ht.s !== void 0 && (ht.s.n = e), ht.s = e, t.n = e, 32 & ht.f && t.S(e), e) : e.i === -1 ? (e.i = 0, e.n !== void 0 && (e.n.p = e.p, e.p !== void 0 && (e.p.n = e.n), e.p = ht.s, e.n = void 0, ht.s.n = e, ht.s = e), e) : void 0;
}
function te(t, e) {
  this.v = t, this.i = 0, this.n = void 0, this.t = void 0, this.l = 0, this.W = e == null ? void 0 : e.watched, this.Z = e == null ? void 0 : e.unwatched, this.name = e == null ? void 0 : e.name;
}
function Hr(t, e) {
  return new te(t, e);
}
function Ai(t) {
  for (let e = t.s; e !== void 0; e = e.n) if (e.S.i !== e.i || !e.S.h() || e.S.i !== e.i) return !0;
  return !1;
}
function Tn(t) {
  for (let e = t.s; e !== void 0; e = e.n) {
    const r = e.S.n;
    if (r !== void 0 && (e.r = r), e.S.n = e, e.i = -1, e.n === void 0) {
      t.s = e;
      break;
    }
  }
}
function $i(t) {
  let e, r = t.s;
  for (; r !== void 0; ) {
    const o = r.p;
    r.i === -1 ? (r.S.U(r), o !== void 0 && (o.n = r.n), r.n !== void 0 && (r.n.p = o)) : e = r, r.S.n = r.r, r.r !== void 0 && (r.r = void 0), r = o;
  }
  t.s = e;
}
function ar(t, e) {
  te.call(this, void 0), this.x = t, this.s = void 0, this.g = fa - 1, this.f = 4, this.W = e == null ? void 0 : e.watched, this.Z = e == null ? void 0 : e.unwatched, this.name = e == null ? void 0 : e.name;
}
function Xd(t, e) {
  return new ar(t, e);
}
function Vi(t) {
  const e = t.m;
  if (t.m = void 0, typeof e == "function") {
    Ve++;
    const r = ht;
    ht = void 0;
    try {
      e();
    } catch (o) {
      throw t.f &= -2, t.f |= 8, Uo(t), o;
    } finally {
      ht = r, Va();
    }
  }
}
function Uo(t) {
  for (let e = t.s; e !== void 0; e = e.n) e.S.U(e);
  t.x = void 0, t.s = void 0, Vi(t);
}
function Jd(t) {
  if (ht !== this) throw new Error("Out-of-order effect");
  $i(this), ht = t, this.f &= -2, 8 & this.f && Uo(this), Va();
}
function xr(t, e) {
  this.x = t, this.m = void 0, this.s = void 0, this.u = void 0, this.f = 32, this.name = e == null ? void 0 : e.name;
}
function Se(t, e) {
  const r = new xr(t, e);
  try {
    r.c();
  } catch (n) {
    throw r.d(), n;
  }
  const o = r.d.bind(r);
  return o[Symbol.dispose] = o, o;
}
function Mr(t, e = {}) {
  const r = {};
  for (const o in t) {
    const n = e[o], s = Hr(n === void 0 ? t[o] : n);
    r[o] = s;
  }
  return r;
}
te.prototype.brand = Gd, te.prototype.h = function() {
  return !0;
}, te.prototype.S = function(t) {
  const e = this.t;
  e !== t && t.e === void 0 && (t.x = e, this.t = t, e !== void 0 ? e.e = t : Cn(() => {
    var r;
    (r = this.W) == null || r.call(this);
  }));
}, te.prototype.U = function(t) {
  if (this.t !== void 0) {
    const e = t.e, r = t.x;
    e !== void 0 && (e.x = r, t.e = void 0), r !== void 0 && (r.e = e, t.x = void 0), t === this.t && (this.t = r, r === void 0 && Cn(() => {
      var o;
      (o = this.Z) == null || o.call(this);
    }));
  }
}, te.prototype.subscribe = function(t) {
  return Se(() => {
    const e = this.value, r = ht;
    ht = void 0;
    try {
      t(e);
    } finally {
      ht = r;
    }
  }, { name: "sub" });
}, te.prototype.valueOf = function() {
  return this.value;
}, te.prototype.toString = function() {
  return this.value + "";
}, te.prototype.toJSON = function() {
  return this.value;
}, te.prototype.peek = function() {
  const t = ht;
  ht = void 0;
  try {
    return this.value;
  } finally {
    ht = t;
  }
}, Object.defineProperty(te.prototype, "value", { get() {
  const t = En(this);
  return t !== void 0 && (t.i = this.i), this.v;
}, set(t) {
  if (t !== this.v) {
    if (Ta > 100) throw new Error("Cycle detected");
    (function(e) {
      Ve !== 0 && Ta === 0 && e.l !== _o && (e.l = _o, Ea = { S: e, v: e.v, i: e.i, o: Ea });
    })(this), this.v = t, this.i++, fa++, Ve++;
    try {
      for (let e = this.t; e !== void 0; e = e.x) e.t.N();
    } finally {
      Va();
    }
  }
} }), ar.prototype = new te(), ar.prototype.h = function() {
  if (this.f &= -3, 1 & this.f) return !1;
  if ((36 & this.f) == 32 || (this.f &= -5, this.g === fa)) return !0;
  if (this.g = fa, this.f |= 1, this.i > 0 && !Ai(this)) return this.f &= -2, !0;
  const t = ht;
  try {
    Tn(this), ht = this;
    const e = this.x();
    (16 & this.f || this.v !== e || this.i === 0) && (this.v = e, this.f &= -17, this.i++);
  } catch (e) {
    this.v = e, this.f |= 16, this.i++;
  }
  return ht = t, $i(this), this.f &= -2, !0;
}, ar.prototype.S = function(t) {
  if (this.t === void 0) {
    this.f |= 36;
    for (let e = this.s; e !== void 0; e = e.n) e.S.S(e);
  }
  te.prototype.S.call(this, t);
}, ar.prototype.U = function(t) {
  if (this.t !== void 0 && (te.prototype.U.call(this, t), this.t === void 0)) {
    this.f &= -33;
    for (let e = this.s; e !== void 0; e = e.n) e.S.U(e);
  }
}, ar.prototype.N = function() {
  if (!(2 & this.f)) {
    this.f |= 6;
    for (let t = this.t; t !== void 0; t = t.x) t.t.N();
  }
}, Object.defineProperty(ar.prototype, "value", { get() {
  if (1 & this.f) throw new Error("Cycle detected");
  const t = En(this);
  if (this.h(), t !== void 0 && (t.i = this.i), 16 & this.f) throw this.v;
  return this.v;
} }), xr.prototype.c = function() {
  const t = this.S();
  try {
    if (8 & this.f || this.x === void 0) return;
    const e = this.x();
    typeof e == "function" && (this.m = e);
  } finally {
    t();
  }
}, xr.prototype.S = function() {
  if (1 & this.f) throw new Error("Cycle detected");
  this.f |= 1, this.f &= -9, Vi(this), Tn(this), Ve++;
  const t = ht;
  return ht = this, Jd.bind(this, t);
}, xr.prototype.N = function() {
  2 & this.f || (this.f |= 2, this.u = jr, jr = this);
}, xr.prototype.d = function() {
  this.f |= 8, 1 & this.f || Uo(this);
}, xr.prototype.dispose = function() {
  this.d();
};
he({ build: (t, e, r) => Mr(e), config: pr({ defaultSelection: "rootEnd", disabled: !1 }), name: "@lexical/extension/AutoFocus", register(t, e, r) {
  const o = r.getOutput();
  return Se(() => o.disabled.value ? void 0 : t.registerRootListener((n) => {
    t.focus(() => {
      const s = document.activeElement;
      n === null || s !== null && n.contains(s) || n.focus({ preventScroll: !0 });
    }, { defaultSelection: o.defaultSelection.peek() });
  }));
} });
function Li() {
  const t = Qe(), e = ce(), r = Xr();
  t.clear(), t.append(r), e !== null && r.select(), Te(e) && (e.format = 0);
}
function Bi(t, e = Li) {
  return t.registerCommand(vi, (r) => (t.update(e), !0), Vo);
}
he({ build: (t, e, r) => Mr(e), config: pr({ $onClear: Li }), name: "@lexical/extension/ClearEditor", register(t, e, r) {
  const { $onClear: o } = r.getOutput();
  return Se(() => Bi(t, o.value));
} });
function Zd(t) {
  return (typeof t.nodes == "function" ? t.nodes() : t.nodes) || [];
}
const Qa = ll("format", { parse: (t) => typeof t == "number" ? t : 0 });
class ji extends ho {
  $config() {
    return this.config("decorator-text", { extends: ho, stateConfigs: [{ flat: !0, stateConfig: Qa }] });
  }
  getFormat() {
    return yl(this, Qa);
  }
  getFormatFlags(e, r) {
    return pn(this.getFormat(), e, r);
  }
  hasFormat(e) {
    const r = kl[e];
    return (this.getFormat() & r) !== 0;
  }
  setFormat(e) {
    return _l(this, Qa, e);
  }
  toggleFormat(e) {
    const r = this.getFormat(), o = pn(r, e, null);
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
function Qd(t) {
  return t instanceof ji;
}
he({ name: "@lexical/extension/DecoratorText", nodes: () => [ji], register: (t, e, r) => t.registerCommand(bi, (o) => {
  const n = ce();
  if (xi(n) || Te(n)) for (const s of n.getNodes()) Qd(s) && s.toggleFormat(o);
  return !1;
}, yi) });
function Fi(t, e) {
  let r;
  return Hr(t(), { unwatched() {
    r && (r(), r = void 0);
  }, watched() {
    this.value = t(), r = e(this);
  } });
}
const No = he({ build: (t) => Fi(() => t.getEditorState(), (e) => t.registerUpdateListener((r) => {
  e.value = r.editorState;
})), name: "@lexical/extension/EditorState" });
function ft(t, ...e) {
  const r = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const n of e) o.append("v", n);
  throw r.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
function Ui(t, e) {
  if (t && e && !Array.isArray(e) && typeof t == "object" && typeof e == "object") {
    const r = t, o = e;
    for (const n in o) r[n] = Ui(r[n], o[n]);
    return t;
  }
  return e;
}
const Ko = 0, Co = 1, Ki = 2, to = 3, la = 4, br = 5, eo = 6, zr = 7;
function ro(t) {
  return t.id === Ko;
}
function Hi(t) {
  return t.id === Ki;
}
function tw(t) {
  return function(e) {
    return e.id === Co;
  }(t) || ft(305, String(t.id), String(Co)), Object.assign(t, { id: Ki });
}
const ew = /* @__PURE__ */ new Set();
class rw {
  constructor(e, r) {
    Qt(this, "builder");
    Qt(this, "configs");
    Qt(this, "_dependency");
    Qt(this, "_peerNameSet");
    Qt(this, "extension");
    Qt(this, "state");
    Qt(this, "_signal");
    this.builder = e, this.extension = r, this.configs = /* @__PURE__ */ new Set(), this.state = { id: Ko };
  }
  mergeConfigs() {
    let e = this.extension.config || {};
    const r = this.extension.mergeConfig ? this.extension.mergeConfig.bind(this.extension) : cl;
    for (const o of this.configs) e = r(e, o);
    return e;
  }
  init(e) {
    const r = this.state;
    Hi(r) || ft(306, String(r.id));
    const o = { getDependency: this.getInitDependency.bind(this), getDirectDependentNames: this.getDirectDependentNames.bind(this), getPeer: this.getInitPeer.bind(this), getPeerNameSet: this.getPeerNameSet.bind(this) }, n = { ...o, getDependency: this.getDependency.bind(this), getInitResult: this.getInitResult.bind(this), getPeer: this.getPeer.bind(this) }, s = function(c, d, l) {
      return Object.assign(c, { config: d, id: to, registerState: l });
    }(r, this.mergeConfigs(), o);
    let i;
    this.state = s, this.extension.init && (i = this.extension.init(e, s.config, o)), this.state = function(c, d, l) {
      return Object.assign(c, { id: la, initResult: d, registerState: l });
    }(s, i, n);
  }
  build(e) {
    const r = this.state;
    let o;
    r.id !== la && ft(307, String(r.id), String(br)), this.extension.build && (o = this.extension.build(e, r.config, r.registerState));
    const n = { ...r.registerState, getOutput: () => o, getSignal: this.getSignal.bind(this) };
    this.state = function(s, i, c) {
      return Object.assign(s, { id: br, output: i, registerState: c });
    }(r, o, n);
  }
  register(e, r) {
    this._signal = r;
    const o = this.state;
    o.id !== br && ft(308, String(o.id), String(br));
    const n = this.extension.register && this.extension.register(e, o.config, o.registerState);
    return this.state = function(s) {
      return Object.assign(s, { id: eo });
    }(o), () => {
      const s = this.state;
      s.id !== zr && ft(309, String(o.id), String(zr)), this.state = function(i) {
        return Object.assign(i, { id: br });
      }(s), n && n();
    };
  }
  afterRegistration(e) {
    const r = this.state;
    let o;
    return r.id !== eo && ft(310, String(r.id), String(eo)), this.extension.afterRegistration && (o = this.extension.afterRegistration(e, r.config, r.registerState)), this.state = function(n) {
      return Object.assign(n, { id: zr });
    }(r), o;
  }
  getSignal() {
    return this._signal === void 0 && ft(311), this._signal;
  }
  getInitResult() {
    this.extension.init === void 0 && ft(312, this.extension.name);
    const e = this.state;
    return function(r) {
      return r.id >= la;
    }(e) || ft(313, String(e.id), String(la)), e.initResult;
  }
  getInitPeer(e) {
    const r = this.builder.extensionNameMap.get(e);
    return r ? r.getExtensionInitDependency() : void 0;
  }
  getExtensionInitDependency() {
    const e = this.state;
    return function(r) {
      return r.id >= to;
    }(e) || ft(314, String(e.id), String(to)), { config: e.config };
  }
  getPeer(e) {
    const r = this.builder.extensionNameMap.get(e);
    return r ? r.getExtensionDependency() : void 0;
  }
  getInitDependency(e) {
    const r = this.builder.getExtensionRep(e);
    return r === void 0 && ft(315, this.extension.name, e.name), r.getExtensionInitDependency();
  }
  getDependency(e) {
    const r = this.builder.getExtensionRep(e);
    return r === void 0 && ft(315, this.extension.name, e.name), r.getExtensionDependency();
  }
  getState() {
    const e = this.state;
    return function(r) {
      return r.id >= zr;
    }(e) || ft(316, String(e.id), String(zr)), e;
  }
  getDirectDependentNames() {
    return this.builder.incomingEdges.get(this.extension.name) || ew;
  }
  getPeerNameSet() {
    let e = this._peerNameSet;
    return e || (e = new Set((this.extension.peerDependencies || []).map(([r]) => r)), this._peerNameSet = e), e;
  }
  getExtensionDependency() {
    if (!this._dependency) {
      const e = this.state;
      (function(r) {
        return r.id >= br;
      })(e) || ft(317, this.extension.name), this._dependency = { config: e.config, init: e.initResult, output: e.output };
    }
    return this._dependency;
  }
}
const Sn = { tag: $o };
function aw() {
  const t = Qe();
  t.isEmpty() && t.append(Xr());
}
const ow = he({ config: pr({ setOptions: Sn, updateOptions: Sn }), init: ({ $initialEditorState: t = aw }) => ({ $initialEditorState: t, initialized: !1 }), afterRegistration(t, { updateOptions: e, setOptions: r }, o) {
  const n = o.getInitResult();
  if (!n.initialized) {
    n.initialized = !0;
    const { $initialEditorState: s } = n;
    if (pl(s)) t.setEditorState(s, r);
    else if (typeof s == "function") t.update(() => {
      s(t);
    }, e);
    else if (s && (typeof s == "string" || typeof s == "object")) {
      const i = t.parseEditorState(s);
      t.setEditorState(i, r);
    }
  }
  return () => {
  };
}, name: "@lexical/extension/InitialState", nodes: [dl, gi, wl, ul, hi] }), Rn = Symbol.for("@lexical/extension/LexicalBuilder");
function Dn() {
}
function nw(t) {
  throw t;
}
function da(t) {
  return Array.isArray(t) ? t : [t];
}
const ao = "0.43.0+prod.esm";
class Nr {
  constructor(e) {
    Qt(this, "roots");
    Qt(this, "extensionNameMap");
    Qt(this, "outgoingConfigEdges");
    Qt(this, "incomingEdges");
    Qt(this, "conflicts");
    Qt(this, "_sortedExtensionReps");
    Qt(this, "PACKAGE_VERSION");
    this.outgoingConfigEdges = /* @__PURE__ */ new Map(), this.incomingEdges = /* @__PURE__ */ new Map(), this.extensionNameMap = /* @__PURE__ */ new Map(), this.conflicts = /* @__PURE__ */ new Map(), this.PACKAGE_VERSION = ao, this.roots = e;
    for (const r of e) this.addExtension(r);
  }
  static fromExtensions(e) {
    const r = [da(ow)];
    for (const o of e) r.push(da(o));
    return new Nr(r);
  }
  static maybeFromEditor(e) {
    const r = e[Rn];
    return r && (r.PACKAGE_VERSION !== ao && ft(292, r.PACKAGE_VERSION, ao), r instanceof Nr || ft(293)), r;
  }
  static fromEditor(e) {
    const r = Nr.maybeFromEditor(e);
    return r === void 0 && ft(294), r;
  }
  constructEditor() {
    const { $initialEditorState: e, onError: r, ...o } = this.buildCreateEditorArgs(), n = Object.assign(pi({ ...o, ...r ? { onError: (s) => {
      r(s, n);
    } } : {} }), { [Rn]: this });
    for (const s of this.sortedExtensionReps()) s.build(n);
    return n;
  }
  buildEditor() {
    let e = Dn;
    function r() {
      try {
        e();
      } finally {
        e = Dn;
      }
    }
    const o = Object.assign(this.constructEditor(), { dispose: r, [Symbol.dispose]: r });
    return e = Le(this.registerEditor(o), () => o.setRootElement(null)), o;
  }
  hasExtensionByName(e) {
    return this.extensionNameMap.has(e);
  }
  getExtensionRep(e) {
    const r = this.extensionNameMap.get(e.name);
    if (r) return r.extension !== e && ft(295, e.name), r;
  }
  addEdge(e, r, o) {
    const n = this.outgoingConfigEdges.get(e);
    n ? n.set(r, o) : this.outgoingConfigEdges.set(e, /* @__PURE__ */ new Map([[r, o]]));
    const s = this.incomingEdges.get(r);
    s ? s.add(e) : this.incomingEdges.set(r, /* @__PURE__ */ new Set([e]));
  }
  addExtension(e) {
    this._sortedExtensionReps !== void 0 && ft(296);
    const r = da(e), [o] = r;
    typeof o.name != "string" && ft(297, typeof o.name);
    let n = this.extensionNameMap.get(o.name);
    if (n !== void 0 && n.extension !== o && ft(298, o.name), !n) {
      n = new rw(this, o), this.extensionNameMap.set(o.name, n);
      const s = this.conflicts.get(o.name);
      typeof s == "string" && ft(299, o.name, s);
      for (const i of o.conflictsWith || []) this.extensionNameMap.has(i) && ft(299, o.name, i), this.conflicts.set(i, o.name);
      for (const i of o.dependencies || []) {
        const c = da(i);
        this.addEdge(o.name, c[0].name, c.slice(1)), this.addExtension(c);
      }
      for (const [i, c] of o.peerDependencies || []) this.addEdge(o.name, i, c ? [c] : []);
    }
  }
  sortedExtensionReps() {
    if (this._sortedExtensionReps) return this._sortedExtensionReps;
    const e = [], r = (o, n) => {
      let s = o.state;
      if (Hi(s)) return;
      const i = o.extension.name;
      var c;
      ro(s) || ft(300, i, n || "[unknown]"), ro(c = s) || ft(304, String(c.id), String(Ko)), s = Object.assign(c, { id: Co }), o.state = s;
      const d = this.outgoingConfigEdges.get(i);
      if (d) for (const l of d.keys()) {
        const w = this.extensionNameMap.get(l);
        w && r(w, i);
      }
      s = tw(s), o.state = s, e.push(o);
    };
    for (const o of this.extensionNameMap.values()) ro(o.state) && r(o);
    for (const o of e) for (const [n, s] of this.outgoingConfigEdges.get(o.extension.name) || []) if (s.length > 0) {
      const i = this.extensionNameMap.get(n);
      if (i) for (const c of s) i.configs.add(c);
    }
    for (const [o, ...n] of this.roots) if (n.length > 0) {
      const s = this.extensionNameMap.get(o.name);
      s === void 0 && ft(301, o.name);
      for (const i of n) s.configs.add(i);
    }
    return this._sortedExtensionReps = e, this._sortedExtensionReps;
  }
  registerEditor(e) {
    const r = this.sortedExtensionReps(), o = new AbortController(), n = [() => o.abort()], s = o.signal;
    for (const i of r) {
      const c = i.register(e, s);
      c && n.push(c);
    }
    for (const i of r) {
      const c = i.afterRegistration(e);
      c && n.push(c);
    }
    return Le(...n);
  }
  buildCreateEditorArgs() {
    const e = {}, r = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map(), s = {}, i = {}, c = this.sortedExtensionReps();
    for (const w of c) {
      const { extension: p } = w;
      if (p.onError !== void 0 && (e.onError = p.onError), p.disableEvents !== void 0 && (e.disableEvents = p.disableEvents), p.parentEditor !== void 0 && (e.parentEditor = p.parentEditor), p.editable !== void 0 && (e.editable = p.editable), p.namespace !== void 0 && (e.namespace = p.namespace), p.$initialEditorState !== void 0 && (e.$initialEditorState = p.$initialEditorState), p.nodes) for (const h of Zd(p)) {
        if (typeof h != "function") {
          const f = o.get(h.replace);
          f && ft(302, p.name, h.replace.name, f.extension.name), o.set(h.replace, w);
        }
        r.add(h);
      }
      if (p.html) {
        if (p.html.export) for (const [h, f] of p.html.export.entries()) n.set(h, f);
        p.html.import && Object.assign(s, p.html.import);
      }
      p.theme && Ui(i, p.theme);
    }
    Object.keys(i).length > 0 && (e.theme = i), r.size && (e.nodes = [...r]);
    const d = Object.keys(s).length > 0, l = n.size > 0;
    (d || l) && (e.html = {}, d && (e.html.import = s), l && (e.html.export = n));
    for (const w of c) w.init(e);
    return e.onError || (e.onError = nw), e;
  }
}
const iw = /* @__PURE__ */ new Set(), Mn = he({ build(t, e, r) {
  const o = r.getDependency(No).output, n = Hr({ watchedNodeKeys: /* @__PURE__ */ new Map() }), s = Fi(() => {
  }, () => Se(() => {
    const i = s.peek(), { watchedNodeKeys: c } = n.value;
    let d, l = !1;
    o.value.read(() => {
      if (ce()) for (const [w, p] of c.entries()) {
        if (p.size === 0) {
          c.delete(w);
          continue;
        }
        const h = Cl(w), f = h && h.isSelected() || !1;
        l = l || f !== (!!i && i.has(w)), f && (d = d || /* @__PURE__ */ new Set(), d.add(w));
      }
    }), !l && d && i && d.size === i.size || (s.value = d);
  }));
  return { watchNodeKey: function(i) {
    const c = Xd(() => (s.value || iw).has(i)), { watchedNodeKeys: d } = n.peek();
    let l = d.get(i);
    const w = l !== void 0;
    return l = l || /* @__PURE__ */ new Set(), l.add(c), w || (d.set(i, l), n.value = { watchedNodeKeys: d }), c;
  } };
}, dependencies: [No], name: "@lexical/extension/NodeSelection" }), sw = hl("INSERT_HORIZONTAL_RULE_COMMAND");
class Cr extends ho {
  static getType() {
    return "horizontalrule";
  }
  static clone(e) {
    return new Cr(e.__key);
  }
  static importJSON(e) {
    return Ho().updateFromJSON(e);
  }
  static importDOM() {
    return { hr: () => ({ conversion: cw, priority: 0 }) };
  }
  exportDOM() {
    return { element: document.createElement("hr") };
  }
  createDOM(e) {
    const r = document.createElement("hr");
    return ki(r, e.theme.hr), r;
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
function cw() {
  return { node: Ho() };
}
function Ho() {
  return Nl(Cr);
}
function lw(t) {
  return t instanceof Cr;
}
he({ dependencies: [No, Mn], name: "@lexical/extension/HorizontalRule", nodes: () => [Cr], register(t, e, r) {
  const { watchNodeKey: o } = r.getDependency(Mn).output, n = Hr({ nodeSelections: /* @__PURE__ */ new Map() }), s = t._config.theme.hrSelected ?? "selected";
  return Le(t.registerCommand(sw, (i) => {
    const c = ce();
    if (!Te(c)) return !1;
    if (c.focus.getNode() !== null) {
      const d = Ho();
      Kd(d);
    }
    return !0;
  }, Vo), t.registerCommand(gl, (i) => {
    if (fl(i.target)) {
      const c = ml(i.target);
      if (lw(c)) return function(d, l = !1) {
        const w = ce(), p = d.isSelected(), h = d.getKey();
        let f;
        l && xi(w) ? f = w : (f = vl(), bl(f)), p ? f.delete(h) : f.add(h);
      }(c, i.shiftKey), !0;
    }
    return !1;
  }, yi), t.registerMutationListener(Cr, (i, c) => {
    Wd(() => {
      let d = !1;
      const { nodeSelections: l } = n.peek();
      for (const [w, p] of i.entries()) if (p === "destroyed") l.delete(w), d = !0;
      else {
        const h = l.get(w), f = t.getElementByKey(w);
        h ? h.domNode.value = f : (d = !0, l.set(w, { domNode: Hr(f), selectedSignal: o(w) }));
      }
      d && (n.value = { nodeSelections: l });
    });
  }), Se(() => {
    const i = [];
    for (const { domNode: c, selectedSignal: d } of n.value.nodeSelections.values()) i.push(Se(() => {
      const l = c.value;
      l && (d.value ? ki(l, s) : El(l, s));
    }));
    return Le(...i);
  }));
} });
he({ build: (t, e) => Mr({ inheritEditableFromParent: e.inheritEditableFromParent }), config: pr({ $getParentEditor: function() {
  const t = xl();
  return Nr.fromEditor(t), t;
}, inheritEditableFromParent: !1 }), init: (t, e, r) => {
  const o = e.$getParentEditor();
  t.parentEditor = o, t.theme = t.theme || o._config.theme;
}, name: "@lexical/extension/NestedEditor", register: (t, e, r) => Se(() => {
  const o = t._parentEditor;
  if (o && r.getOutput().inheritEditableFromParent.value) return t.setEditable(o.isEditable()), o.registerEditableListener(t.setEditable.bind(t));
}) });
he({ build: (t, e, r) => Mr(e), config: pr({ disabled: !1, onReposition: void 0 }), name: "@lexical/utils/SelectionAlwaysOnDisplay", register: (t, e, r) => {
  const o = r.getOutput();
  return Se(() => {
    if (!o.disabled.value) return Fd(t, o.onReposition.value);
  });
} });
function qi(t) {
  return t.canBeEmpty();
}
function dw(t, e, r = qi) {
  return Le(t.registerCommand(Tl, (o) => {
    const n = ce();
    if (!Te(n)) return !1;
    o.preventDefault();
    const s = function(i) {
      if (i.getNodes().filter((h) => Sl(h) && h.canIndent()).length > 0) return !0;
      const c = i.anchor, d = i.focus, l = d.isBefore(c) ? d : c, w = l.getNode(), p = Ud(w);
      if (p.canIndent()) {
        const h = p.getKey();
        let f = Rl();
        if (f.anchor.set(h, 0, "element"), f.focus.set(h, 0, "element"), f = Dl(f), f.anchor.is(l)) return !0;
      }
      return !1;
    }(n) ? o.shiftKey ? Ml : hn : Ol;
    return t.dispatchCommand(s, void 0);
  }, Vo), t.registerCommand(hn, () => {
    const o = typeof e == "number" ? e : e ? e.peek() : null, n = ce();
    if (!Te(n)) return !1;
    const s = typeof r == "function" ? r : r.peek();
    return qd((i) => {
      if (s(i)) {
        const c = i.getIndent() + 1;
        (!o || c < o) && i.setIndent(c);
      }
    });
  }, Lo));
}
he({ build: (t, e, r) => Mr(e), config: pr({ $canIndent: qi, disabled: !1, maxIndent: null }), name: "@lexical/extension/TabIndentation", register(t, e, r) {
  const { disabled: o, maxIndent: n, $canIndent: s } = r.getOutput();
  return Se(() => {
    if (!o.value) return dw(t, n, s);
  });
} });
const ww = he({ name: "@lexical/react/ReactProvider" });
function uw() {
  return Qe().getTextContent();
}
function pw(t, e = !0) {
  if (t) return !1;
  let r = uw();
  return e && (r = r.trim()), r === "";
}
function hw(t) {
  if (!pw(t, !1)) return !1;
  const e = Qe().getChildren(), r = e.length;
  if (r > 1) return !1;
  for (let o = 0; o < r; o++) {
    const n = e[o];
    if (Il(n)) return !1;
    if (Kr(n)) {
      if (!zl(n) || n.__indent !== 0) return !1;
      const s = n.getChildren(), i = s.length;
      for (let c = 0; c < i; c++) {
        const d = s[o];
        if (!go(d)) return !1;
      }
    }
  }
  return !0;
}
function Gi(t) {
  return () => hw(t);
}
function Wi(t) {
  const e = window.location.origin, r = (o) => {
    if (o.origin !== e) return;
    const n = t.getRootElement();
    if (document.activeElement !== n) return;
    const s = o.data;
    if (typeof s == "string") {
      let i;
      try {
        i = JSON.parse(s);
      } catch {
        return;
      }
      if (i && i.protocol === "nuanria_messaging" && i.type === "request") {
        const c = i.payload;
        if (c && c.functionId === "makeChanges") {
          const d = c.args;
          if (d) {
            const [l, w, p, h, f] = d;
            t.update(() => {
              const m = ce();
              if (Te(m)) {
                const x = m.anchor;
                let g = x.getNode(), T = 0, y = 0;
                if (go(g) && l >= 0 && w >= 0 && (T = l, y = l + w, m.setTextNodeRange(g, T, g, y)), T === y && p === "" || (m.insertRawText(p), g = x.getNode()), go(g)) {
                  T = h, y = h + f;
                  const C = g.getTextContentSize();
                  T = T > C ? C : T, y = y > C ? C : y, m.setTextNodeRange(g, T, g, y);
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
he({ build: (t, e, r) => Mr(e), config: pr({ disabled: typeof window > "u" }), name: "@lexical/dragon", register: (t, e, r) => Se(() => r.getOutput().disabled.value ? void 0 : Wi(t)) });
function gw(t, ...e) {
  const r = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const n of e) o.append("v", n);
  throw r.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
const qo = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? re : Z;
function fw({ editor: t, ErrorBoundary: e }) {
  return function(r, o) {
    const [n, s] = _(() => r.getDecorators());
    return qo(() => r.registerDecoratorListener((i) => {
      Ll(() => {
        s(i);
      });
    }), [r]), Z(() => {
      s(r.getDecorators());
    }, [r]), P(() => {
      const i = [], c = Object.keys(n);
      for (let d = 0; d < c.length; d++) {
        const l = c[d], w = a(o, { onError: (h) => r._onError(h), children: a(Lc, { fallback: null, children: n[l] }) }), p = r.getElementByKey(l);
        p !== null && i.push(Bl(w, p, l));
      }
      return i;
    }, [o, n, r]);
  }(t, e);
}
function mw({ editor: t, ErrorBoundary: e }) {
  return function(r) {
    const o = Nr.maybeFromEditor(r);
    if (o && o.hasExtensionByName(ww.name)) {
      for (const n of ["@lexical/plain-text", "@lexical/rich-text"]) o.hasExtensionByName(n) && gw(320, n);
      return !0;
    }
    return !1;
  }(t) ? null : a(fw, { editor: t, ErrorBoundary: e });
}
function On(t) {
  return t.getEditorState().read(Gi(t.isComposing()));
}
function vw({ contentEditable: t, placeholder: e = null, ErrorBoundary: r }) {
  const [o] = Me();
  return function(n) {
    qo(() => Le(Vl(n), Wi(n)), [n]);
  }(o), u(gt, { children: [t, a(bw, { content: e }), a(mw, { editor: o, ErrorBoundary: r })] });
}
function bw({ content: t }) {
  const [e] = Me(), r = function(n) {
    const [s, i] = _(() => On(n));
    return qo(() => {
      function c() {
        const d = On(n);
        i(d);
      }
      return c(), Le(n.registerUpdateListener(() => {
        c();
      }), n.registerEditableListener(() => {
        c();
      }));
    }, [n]), s;
  }(e), o = Pd();
  return r ? typeof t == "function" ? t(o) : t : null;
}
function xw({ defaultSelection: t }) {
  const [e] = Me();
  return Z(() => {
    e.focus(() => {
      const r = document.activeElement, o = e.getRootElement();
      o === null || r !== null && o.contains(r) || o.focus({ preventScroll: !0 });
    }, { defaultSelection: t });
  }, [t, e]), null;
}
const yw = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? re : Z;
function kw({ onClear: t }) {
  const [e] = Me();
  return yw(() => Bi(e, t), [e, t]), null;
}
const Yi = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? re : Z;
function _w({ editor: t, ariaActiveDescendant: e, ariaAutoComplete: r, ariaControls: o, ariaDescribedBy: n, ariaErrorMessage: s, ariaExpanded: i, ariaInvalid: c, ariaLabel: d, ariaLabelledBy: l, ariaMultiline: w, ariaOwns: p, ariaRequired: h, autoCapitalize: f, className: m, id: x, role: g = "textbox", spellCheck: T = !0, style: y, tabIndex: C, "data-testid": N, ...A }, B) {
  const [U, O] = _(t.isEditable()), S = V((W) => {
    W && W.ownerDocument && W.ownerDocument.defaultView ? t.setRootElement(W) : t.setRootElement(null);
  }, [t]), D = P(() => /* @__PURE__ */ function(...W) {
    return (Y) => {
      for (const z of W) typeof z == "function" ? z(Y) : z != null && (z.current = Y);
    };
  }(B, S), [S, B]);
  return Yi(() => (O(t.isEditable()), t.registerEditableListener((W) => {
    O(W);
  })), [t]), a("div", { "aria-activedescendant": U ? e : void 0, "aria-autocomplete": U ? r : "none", "aria-controls": U ? o : void 0, "aria-describedby": n, ...s != null ? { "aria-errormessage": s } : {}, "aria-expanded": U && g === "combobox" ? !!i : void 0, ...c != null ? { "aria-invalid": c } : {}, "aria-label": d, "aria-labelledby": l, "aria-multiline": w, "aria-owns": U ? p : void 0, "aria-readonly": !U || void 0, "aria-required": h, autoCapitalize: f, className: m, contentEditable: U, "data-testid": N, id: x, ref: D, role: g, spellCheck: T, style: y, tabIndex: C, ...A });
}
const Nw = li(_w);
function In(t) {
  return t.getEditorState().read(Gi(t.isComposing()));
}
const Cw = li(Ew);
function Ew(t, e) {
  const { placeholder: r, ...o } = t, [n] = Me();
  return u(gt, { children: [a(Nw, { editor: n, ...o, ref: e }), r != null && a(Tw, { editor: n, content: r })] });
}
function Tw({ content: t, editor: e }) {
  const r = function(i) {
    const [c, d] = _(() => In(i));
    return Yi(() => {
      function l() {
        const w = In(i);
        d(w);
      }
      return l(), Le(i.registerUpdateListener(() => {
        l();
      }), i.registerEditableListener(() => {
        l();
      }));
    }, [i]), c;
  }(e), [o, n] = _(e.isEditable());
  if (re(() => (n(e.isEditable()), e.registerEditableListener((i) => {
    n(i);
  })), [e]), !r) return null;
  let s = null;
  return typeof t == "function" ? s = t(o) : t !== null && (s = t), s === null ? null : a("div", { "aria-hidden": !0, children: s });
}
function Sw({
  placeholder: t,
  className: e,
  placeholderClassName: r
}) {
  return /* @__PURE__ */ a(
    Cw,
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
const Xi = Wr(void 0);
function Rw({
  activeEditor: t,
  $updateToolbar: e,
  blockType: r,
  setBlockType: o,
  showModal: n,
  children: s
}) {
  const i = P(
    () => ({
      activeEditor: t,
      $updateToolbar: e,
      blockType: r,
      setBlockType: o,
      showModal: n
    }),
    [t, e, r, o, n]
  );
  return /* @__PURE__ */ a(Xi.Provider, { value: i, children: s });
}
function Ji() {
  const t = Pa(Xi);
  if (!t)
    throw new Error("useToolbarContext must be used within a ToolbarContext provider");
  return t;
}
function Dw() {
  const [t, e] = _(void 0), r = V(() => {
    e(void 0);
  }, []), o = P(() => {
    if (t === void 0)
      return;
    const { title: s, content: i } = t;
    return /* @__PURE__ */ a(so, { open: !0, onOpenChange: r, children: /* @__PURE__ */ u(co, { children: [
      /* @__PURE__ */ a(lo, { children: /* @__PURE__ */ a(wo, { children: s }) }),
      i
    ] }) });
  }, [t, r]), n = V(
    (s, i, c = !1) => {
      e({
        closeOnClickOutside: c,
        content: i(r),
        title: s
      });
    },
    [r]
  );
  return [o, n];
}
function Mw({
  children: t
}) {
  const [e] = Me(), [r, o] = _(e), [n, s] = _("paragraph"), [i, c] = Dw(), d = () => {
  };
  return Z(() => r.registerCommand(
    _i,
    (l, w) => (o(w), !1),
    Lo
  ), [r]), /* @__PURE__ */ u(
    Rw,
    {
      activeEditor: r,
      $updateToolbar: d,
      blockType: n,
      setBlockType: s,
      showModal: c,
      children: [
        i,
        t({ blockType: n })
      ]
    }
  );
}
function Ow(t) {
  const [e] = Me(), { activeEditor: r } = Ji();
  Z(() => r.registerCommand(
    _i,
    () => {
      const o = ce();
      return o && t(o), !1;
    },
    Lo
  ), [e, t]), Z(() => {
    r.getEditorState().read(() => {
      const o = ce();
      o && t(o);
    });
  }, [r, t]);
}
const zn = [
  { format: "bold", icon: Ys, label: "Bold" },
  { format: "italic", icon: Xs, label: "Italic" }
  // CUSTOM: TJ removed underline and strikethrough as they are not supported by the current comment
  // data conversion and are not in P9 anyway. We can add these back if we ever get this supported.
  /* { format: 'underline', icon: UnderlineIcon, label: 'Underline' },
  { format: 'strikethrough', icon: StrikethroughIcon, label: 'Strikethrough' }, */
];
function Iw() {
  const { activeEditor: t } = Ji(), [e, r] = _([]), o = V((n) => {
    if (Te(n) || jl(n)) {
      const s = [];
      zn.forEach(({ format: i }) => {
        n.hasFormat(i) && s.push(i);
      }), r((i) => i.length !== s.length || !s.every((c) => i.includes(c)) ? s : i);
    }
  }, []);
  return Ow(o), /* @__PURE__ */ a(
    Gn,
    {
      type: "multiple",
      value: e,
      onValueChange: r,
      variant: "outline",
      size: "sm",
      children: zn.map(({ format: n, icon: s, label: i }) => /* @__PURE__ */ a(
        wa,
        {
          value: n,
          "aria-label": i,
          onClick: () => {
            t.dispatchCommand(bi, n);
          },
          children: /* @__PURE__ */ a(s, { className: "tw:h-4 tw:w-4" })
        },
        n
      ))
    }
  );
}
function zw({ onClear: t }) {
  const [e] = Me();
  Z(() => {
    t && t(() => {
      e.dispatchCommand(vi, void 0);
    });
  }, [e, t]);
}
function Pw({
  placeholder: t = "Start typing ...",
  autoFocus: e = !1,
  onClear: r,
  actions: o
}) {
  const [, n] = _(void 0);
  return /* @__PURE__ */ u("div", { className: "tw:relative", children: [
    /* @__PURE__ */ a(Mw, { children: () => (
      // Sticky, but deliberately with no z-index of its own. `position: sticky` pins relative
      // to the nearest scrolling ancestor, not this element's own overflow — `Plugins` is
      // shared by consumers (e.g. the comments panel's editor, whose scrolling ancestor is the
      // thread list) where the toolbar does need to stay pinned while its container scrolls.
      // With z-index left at its default (auto), this box establishes no stacking level of its
      // own, so a host's positioned chrome with an explicit z-index (e.g. a sticky panel
      // header) paints above it on stacking order rather than losing to it on DOM position.
      /* @__PURE__ */ a(
        "div",
        {
          "data-testid": "editor-format-toolbar",
          className: "tw:sticky tw:top-0 tw:flex tw:gap-2 tw:overflow-auto tw:border-b tw:p-1",
          children: /* @__PURE__ */ a(Iw, {})
        }
      )
    ) }),
    /* @__PURE__ */ u("div", { className: "tw:relative", children: [
      /* @__PURE__ */ a(
        vw,
        {
          contentEditable: /* @__PURE__ */ a("div", { ref: (i) => {
            i !== void 0 && n(i);
          }, children: /* @__PURE__ */ a(Sw, { placeholder: t }) }),
          ErrorBoundary: Od
        }
      ),
      e && /* @__PURE__ */ a(xw, { defaultSelection: "rootEnd" }),
      /* @__PURE__ */ a(zw, { onClear: r }),
      /* @__PURE__ */ a(kw, {})
    ] }),
    o && /* @__PURE__ */ a(
      "div",
      {
        "data-slot": "editor-actions",
        className: "tw:flex tw:flex-row tw:items-center tw:gap-2 tw:border-t tw:px-2 tw:py-1.5",
        children: o
      }
    )
  ] });
}
const Aw = {
  namespace: "commentEditor",
  theme: jo,
  nodes: Fo,
  onError: (t) => {
    console.error(t);
  }
};
function Sa({
  editorState: t,
  editorSerializedState: e,
  onChange: r,
  onSerializedChange: o,
  placeholder: n = "Start typing…",
  autoFocus: s = !1,
  onClear: i,
  className: c,
  actions: d
}) {
  const [l] = _(() => ({
    ...Aw,
    ...t ? { editorState: t } : {},
    ...e ? { editorState: JSON.stringify(e) } : {}
  })), w = V(
    (p) => {
      r == null || r(p), o == null || o(p.toJSON());
    },
    [r, o]
  );
  return (
    // CUSTOM: Added `className` prop
    /* @__PURE__ */ a(
      "div",
      {
        className: b(
          "pr-twp tw:overflow-hidden tw:rounded-lg tw:border tw:bg-background tw:shadow",
          c
        ),
        children: /* @__PURE__ */ a(Ed, { initialConfig: l, children: /* @__PURE__ */ u(Vt, { children: [
          /* @__PURE__ */ a(
            Pw,
            {
              placeholder: n,
              autoFocus: s,
              onClear: i,
              actions: d
            }
          ),
          /* @__PURE__ */ a(Sd, { ignoreSelectionChange: !0, onChange: w })
        ] }) })
      }
    )
  );
}
function Zi(t) {
  const e = t.querySelector('[contenteditable="true"]');
  if (!e) return !1;
  e.focus();
  const r = window.getSelection(), o = document.createRange();
  return o.selectNodeContents(e), o.collapse(!1), r == null || r.removeAllRanges(), r == null || r.addRange(o), !0;
}
function Qi(t) {
  return t ? t.some(
    (e) => e && "text" in e && e.text.trim().length > 0 ? !0 : !e || !("children" in e) ? !1 : Qi(e.children)
  ) : !1;
}
function de(t) {
  var e;
  return (e = t == null ? void 0 : t.root) != null && e.children ? Qi(t.root.children) : !1;
}
function $w(t) {
  if (!t || t.trim() === "")
    throw new Error("Input HTML is empty");
  const e = Ni({
    namespace: "EditorUtils",
    theme: jo,
    nodes: Fo,
    onError: (o) => {
      console.error(o);
    }
  });
  let r;
  if (e.update(
    () => {
      const n = new DOMParser().parseFromString(t, "text/html"), s = Ul(e, n);
      Qe().clear(), Pl(s);
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
function Ra(t) {
  const e = Ni({
    namespace: "EditorUtils",
    theme: jo,
    nodes: Fo,
    onError: (n) => {
      console.error(n);
    }
  }), r = e.parseEditorState(JSON.stringify(t));
  e.setEditorState(r);
  let o = "";
  return e.getEditorState().read(() => {
    o = Fl(e);
  }), o = o.replace(/\s+style="[^"]*"/g, "").replace(/\s+class="[^"]*"/g, "").replace(/<span>(.*?)<\/span>/g, "$1").replace(/<b><strong[^>]*>(.*?)<\/strong><\/b>/g, "<b>$1</b>").replace(/<strong><b[^>]*>(.*?)<\/b><\/strong>/g, "<b>$1</b>").replace(/<i><em[^>]*>(.*?)<\/em><\/i>/g, "<i>$1</i>").replace(/<em><i[^>]*>(.*?)<\/i><\/em>/g, "<i>$1</i>").replace(/<u><span[^>]*>(.*?)<\/span><\/u>/g, "<u>$1</u>").replace(/<s><span[^>]*>(.*?)<\/span><\/s>/g, "<s>$1</s>").replace(/<br\s*\/?>/gi, "<br/>"), o;
}
function Go(t) {
  return ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Home", "End"].includes(t.key) ? (t.stopPropagation(), !0) : !1;
}
const ts = Object.freeze([
  "%cancelButton_tooltip%",
  "%acceptButton_tooltip%"
]), Pn = (t, e) => t[e] ?? e;
function es({
  onCancelClick: t,
  onAcceptClick: e,
  canAccept: r = !0,
  localizedStrings: o = {},
  className: n = "tw:h-6 tw:w-6",
  acceptLabel: s
}) {
  const i = Pn(o, "%cancelButton_tooltip%"), c = s ?? Pn(o, "%acceptButton_tooltip%");
  return /* @__PURE__ */ u(Oa, { children: [
    /* @__PURE__ */ a(Vt, { children: /* @__PURE__ */ u(bt, { children: [
      /* @__PURE__ */ a(xt, { asChild: !0, children: /* @__PURE__ */ a(
        et,
        {
          "aria-label": i,
          className: n,
          size: "icon",
          onClick: t,
          variant: "secondary",
          children: /* @__PURE__ */ a(ei, {})
        }
      ) }),
      /* @__PURE__ */ a(yt, { children: /* @__PURE__ */ a("p", { children: i }) })
    ] }) }),
    /* @__PURE__ */ a(So, {}),
    /* @__PURE__ */ a(Vt, { children: /* @__PURE__ */ u(bt, { children: [
      /* @__PURE__ */ a(xt, { asChild: !0, children: /* @__PURE__ */ a(
        et,
        {
          "aria-label": c,
          className: n,
          size: "icon",
          onClick: e,
          disabled: !r,
          children: /* @__PURE__ */ a(Ze, {})
        }
      ) }),
      /* @__PURE__ */ a(yt, { children: /* @__PURE__ */ a("p", { children: c }) })
    ] }) })
  ] });
}
const Vw = "verseText", hh = Object.freeze([
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
]);
function $r(t) {
  return t !== void 0 && Object.keys(t).length > 0;
}
function Lw(t) {
  return t.editorState === void 0 && t.assignedUser === void 0 && !$r(t.commentEdits);
}
const rs = [
  "tw:prose tw:max-w-none tw:break-words tw:text-sm tw:font-normal tw:text-foreground",
  "tw:[&>blockquote]:border-s-0 tw:[&>blockquote]:p-0 tw:[&>blockquote]:ps-0 tw:[&>blockquote]:font-normal tw:[&>blockquote]:not-italic tw:[&>blockquote]:text-foreground",
  "tw:prose-quoteless"
].join(" ");
function as(t) {
  return (t == null ? void 0 : t.conflictType) === Vw;
}
function os(t) {
  return t === "replaced" ? "reject" : t === "merged" ? "merged" : "accept";
}
function ma(t, e) {
  return t === "" ? e["%comment_assign_unassigned%"] ?? "Unassigned" : t === "Team" ? e["%comment_assign_team%"] ?? "Team" : t;
}
function Wo(t) {
  const e = Do();
  return t.key === "Enter" && (e && t.metaKey || !e && t.ctrlKey);
}
function nr(t, e, r) {
  const o = e[t];
  return o === void 0 || o === t ? r : o;
}
const Bw = {
  root: {
    children: [
      {
        children: [],
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
}, jw = {
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
function oo(t, e) {
  return t === "" ? e["%commentEditor_unassigned%"] ?? "Unassigned" : t === "Team" ? e["%commentEditor_team%"] ?? "Team" : t;
}
function gh({
  assignableUsers: t,
  onSave: e,
  onClose: r,
  localizedStrings: o,
  initialAssignedUser: n
}) {
  const [s, i] = _(jw), [c, d] = _(n), [l, w] = _(!1), p = L(void 0), h = L(null);
  Z(() => {
    let g = !0;
    const T = h.current;
    if (!T) return;
    const y = setTimeout(() => {
      g && Zi(T);
    }, 300);
    return () => {
      g = !1, clearTimeout(y);
    };
  }, []);
  const f = V(() => {
    if (!de(s)) return;
    const g = Ra(s);
    e(g, c);
  }, [s, e, c]), m = o["%commentEditor_placeholder%"] ?? "Type your comment here...", x = o["%commentEditor_assignTo_label%"] ?? "Assign to";
  return /* @__PURE__ */ u("div", { className: "pr-twp tw:grid tw:gap-3", children: [
    /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:justify-between", children: [
      /* @__PURE__ */ a("span", { className: "tw:text-sm tw:font-medium", children: x }),
      /* @__PURE__ */ a(
        es,
        {
          onCancelClick: r,
          onAcceptClick: f,
          canAccept: de(s),
          localizedStrings: o,
          acceptLabel: o["%commentEditor_saveButton_tooltip%"]
        }
      )
    ] }),
    /* @__PURE__ */ a("div", { className: "tw:flex tw:items-center tw:gap-2", children: /* @__PURE__ */ u(lr, { open: l, onOpenChange: w, children: [
      /* @__PURE__ */ a(Dr, { asChild: !0, children: /* @__PURE__ */ u(
        et,
        {
          variant: "outline",
          className: "tw:flex tw:w-full tw:items-center tw:justify-start tw:gap-2",
          disabled: t.length === 0,
          children: [
            /* @__PURE__ */ a(ri, { className: "tw:h-4 tw:w-4" }),
            /* @__PURE__ */ a("span", { children: oo(c !== void 0 ? c : "", o) })
          ]
        }
      ) }),
      /* @__PURE__ */ a(
        dr,
        {
          className: "tw:w-auto tw:p-0",
          align: "start",
          onKeyDown: (g) => {
            g.key === "Escape" && (g.stopPropagation(), w(!1));
          },
          children: /* @__PURE__ */ a(wr, { children: /* @__PURE__ */ a(ur, { children: t.map((g) => /* @__PURE__ */ a(
            tr,
            {
              onSelect: () => {
                d(g || void 0), w(!1);
              },
              className: "tw:flex tw:items-center",
              children: /* @__PURE__ */ a("span", { children: oo(g, o) })
            },
            g || "unassigned"
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
        onKeyDownCapture: (g) => {
          g.key === "Escape" ? (g.preventDefault(), g.stopPropagation(), r()) : Wo(g) && (g.preventDefault(), g.stopPropagation(), de(s) && f());
        },
        onKeyDown: (g) => {
          Go(g), (g.key === "Enter" || g.key === " ") && g.stopPropagation();
        },
        children: /* @__PURE__ */ a(
          Sa,
          {
            editorSerializedState: s,
            onSerializedChange: (g) => i(g),
            placeholder: m,
            onClear: (g) => {
              p.current = g;
            }
          }
        )
      }
    )
  ] });
}
const fh = Object.freeze([
  "%commentEditor_placeholder%",
  "%commentEditor_assignTo_label%",
  "%commentEditor_saveButton_tooltip%",
  "%commentEditor_unassigned%",
  "%commentEditor_team%",
  ...ts
]), mh = Object.freeze([
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
  "%comment_aria_resolve_thread%",
  "%comment_aria_cancel_edit%",
  "%comment_aria_save_edit%"
]), Fw = "comment-list";
function vh(t) {
  return t;
}
function Uw({
  className: t,
  size: e = "default",
  ...r
}) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "card",
      "data-size": e,
      className: b(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:group/card tw:flex tw:flex-col tw:gap-4 tw:overflow-hidden tw:rounded-xl tw:bg-card tw:py-4 tw:text-sm tw:text-card-foreground tw:ring-1 tw:ring-foreground/10 tw:has-data-[slot=card-footer]:pb-0 tw:has-[>img:first-child]:pt-0 tw:data-[size=sm]:gap-3 tw:data-[size=sm]:py-3 tw:data-[size=sm]:has-data-[slot=card-footer]:pb-0 tw:*:[img:first-child]:rounded-t-xl tw:*:[img:last-child]:rounded-b-xl",
        t
      ),
      ...r
    }
  );
}
function bh({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "card-header",
      className: b(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:group/card-header tw:@container/card-header tw:grid tw:auto-rows-min tw:items-start tw:gap-1 tw:rounded-t-xl tw:px-4 tw:group-data-[size=sm]/card:px-3 tw:has-data-[slot=card-action]:grid-cols-[1fr_auto] tw:has-data-[slot=card-description]:grid-rows-[auto_auto] tw:[.border-b]:pb-4 tw:group-data-[size=sm]/card:[.border-b]:pb-3",
        t
      ),
      ...e
    }
  );
}
function xh({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "card-title",
      className: b(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:font-heading tw:text-base tw:leading-snug tw:font-medium tw:group-data-[size=sm]/card:text-sm",
        t
      ),
      ...e
    }
  );
}
function yh({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "card-description",
      className: b(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:text-sm tw:text-muted-foreground",
        t
      ),
      ...e
    }
  );
}
function Kw({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "card-content",
      className: b(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:px-4 tw:group-data-[size=sm]/card:px-3",
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
      "data-slot": "card-footer",
      className: b(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:flex tw:items-center tw:rounded-b-xl tw:border-t tw:bg-muted/50 tw:p-4 tw:group-data-[size=sm]/card:p-3",
        t
      ),
      ...e
    }
  );
}
function qr({
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
function Hw({
  className: t,
  size: e = "default",
  ...r
}) {
  return /* @__PURE__ */ a(
    Bo.Root,
    {
      "data-slot": "avatar",
      "data-size": e,
      className: b(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:group/avatar tw:relative tw:flex tw:size-8 tw:shrink-0 tw:rounded-full tw:select-none tw:after:absolute tw:after:inset-0 tw:after:rounded-full tw:after:border tw:after:border-border tw:after:mix-blend-darken tw:data-[size=lg]:size-10 tw:data-[size=sm]:size-6 tw:dark:after:mix-blend-lighten",
        t
      ),
      ...r
    }
  );
}
function _h({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    Bo.Image,
    {
      "data-slot": "avatar-image",
      className: b(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:aspect-square tw:size-full tw:rounded-full tw:object-cover",
        t
      ),
      ...e
    }
  );
}
function qw({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    Bo.Fallback,
    {
      "data-slot": "avatar-fallback",
      className: b(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:flex tw:size-full tw:items-center tw:justify-center tw:rounded-full tw:bg-muted tw:text-sm tw:text-muted-foreground tw:group-data-[size=sm]/avatar:text-xs",
        t
      ),
      ...e
    }
  );
}
function An({
  comment: t,
  isReply: e = !1,
  localizedStrings: r,
  isThreadExpanded: o = !1,
  handleUpdateComment: n,
  handleDeleteComment: s,
  onEditingChange: i,
  canEditOrDelete: c = !1,
  draftEditorState: d,
  onDraftEditorStateChange: l
}) {
  const [w, p] = _(), h = d ?? w, m = h !== void 0 && o, x = l !== void 0, g = V(
    (z) => {
      x || p(z), l == null || l(z);
    },
    [x, l]
  ), T = L(null), y = L(!1);
  Z(() => {
    if (!m || !y.current) return;
    y.current = !1;
    let z = !0;
    const k = T.current;
    if (!k) return;
    const ot = setTimeout(() => {
      z && Zi(k);
    }, 300);
    return () => {
      z = !1, clearTimeout(ot);
    };
  }, [m]);
  const C = V(
    (z) => {
      z && z.stopPropagation(), g(void 0), i == null || i(!1);
    },
    [i, g]
  ), N = V(
    async (z) => {
      if (z && z.stopPropagation(), !h || !n) return;
      await n(
        t.id,
        Ra(h)
      ) && (g(void 0), i == null || i(!1));
    },
    [h, n, t.id, i, g]
  ), A = P(() => {
    const z = new Date(t.date), k = Tc(
      z,
      r["%comment_date_today%"],
      r["%comment_date_yesterday%"]
    ), ot = z.toLocaleTimeString(void 0, {
      hour: "numeric",
      minute: "2-digit"
    });
    return Ye(r["%comment_dateAtTime%"], {
      date: k,
      time: ot
    });
  }, [t.date, r]), B = P(() => t.user, [t.user]), U = P(
    () => t.user.split(" ").map((z) => z[0]).join("").toUpperCase().slice(0, 2),
    [t.user]
  ), O = P(() => Ao(t.contents), [t.contents]), S = P(
    () => t.contents.replace(/<[^>]*>/g, "").trim().length > 0,
    [t.contents]
  ), D = !!t.conflictResolutionAction && !S, W = P(() => {
    if (o && c)
      return /* @__PURE__ */ u(gt, { children: [
        /* @__PURE__ */ u(
          Ge,
          {
            onClick: (z) => {
              z.stopPropagation(), y.current = !0;
              const k = t.contents.trim() !== "";
              g(k ? $w(t.contents) : Bw), i == null || i(!0);
            },
            children: [
              /* @__PURE__ */ a(Js, { className: "tw:me-2 tw:h-4 tw:w-4" }),
              r["%comment_editComment%"]
            ]
          }
        ),
        /* @__PURE__ */ u(
          Ge,
          {
            onClick: async (z) => {
              z.stopPropagation(), s && await s(t.id);
            },
            children: [
              /* @__PURE__ */ a(sn, { className: "tw:me-2 tw:h-4 tw:w-4" }),
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
    s,
    i,
    g
  ]), Y = !de(h);
  return /* @__PURE__ */ u(
    "div",
    {
      className: b("tw:flex tw:w-full tw:flex-row tw:items-baseline tw:gap-2", {
        "tw:text-sm": e
      }),
      children: [
        /* @__PURE__ */ a(Hw, { className: "tw:h-8 tw:w-8", children: /* @__PURE__ */ a(qw, { className: "tw:text-xs tw:font-medium", children: U }) }),
        /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-1 tw:flex-col tw:gap-1", children: [
          /* @__PURE__ */ u("div", { className: "tw:flex tw:w-full tw:flex-row tw:flex-wrap tw:items-baseline tw:gap-x-2", children: [
            /* @__PURE__ */ a("p", { className: "tw:text-sm tw:font-medium", children: B }),
            /* @__PURE__ */ a("p", { className: "tw:text-xs tw:font-normal tw:text-muted-foreground", children: A }),
            /* @__PURE__ */ a("div", { className: "tw:flex-1" }),
            e && t.assignedUser !== void 0 && /* @__PURE__ */ u(Fr, { variant: "secondary", className: "tw:text-xs tw:font-normal", children: [
              "→ ",
              ma(t.assignedUser, r)
            ] })
          ] }),
          m && /* @__PURE__ */ a(
            "div",
            {
              role: "textbox",
              tabIndex: -1,
              className: "tw:flex tw:flex-col tw:gap-2",
              ref: T,
              onKeyDownCapture: (z) => {
                z.key === "Escape" ? (z.preventDefault(), z.stopPropagation(), C()) : Wo(z) && (z.preventDefault(), z.stopPropagation(), de(h) && N());
              },
              onKeyDown: (z) => {
                Go(z), (z.key === "Enter" || z.key === " ") && z.stopPropagation();
              },
              onClick: (z) => {
                z.stopPropagation();
              },
              children: /* @__PURE__ */ a(
                Sa,
                {
                  className: b(
                    // Don't render blockquote on the first child. All comments are wrapped in blockquote
                    // that has text-align corresponding to LTR or RTL, so the blockquote is important.
                    // But we don't want it to look like there's a blockquote there. Target the
                    // lowest-level Lexical editor element by attribute so Tailwind can apply styles to
                    // the blockquote directly inside the editor.
                    'tw:[&_[data-lexical-editor="true"]>blockquote]:mt-0 tw:[&_[data-lexical-editor="true"]>blockquote]:border-s-0 tw:[&_[data-lexical-editor="true"]>blockquote]:ps-0 tw:[&_[data-lexical-editor="true"]>blockquote]:font-normal tw:[&_[data-lexical-editor="true"]>blockquote]:not-italic tw:[&_[data-lexical-editor="true"]>blockquote]:text-foreground'
                  ),
                  editorSerializedState: h,
                  onSerializedChange: (z) => g(z),
                  actions: /* @__PURE__ */ u(gt, { children: [
                    /* @__PURE__ */ a("div", { className: "tw:flex-1" }),
                    /* @__PURE__ */ u(bt, { children: [
                      /* @__PURE__ */ a(xt, { asChild: !0, children: /* @__PURE__ */ a(
                        et,
                        {
                          size: "icon-sm",
                          onClick: C,
                          variant: "outline",
                          className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                          "aria-label": r["%comment_aria_cancel_edit%"] ?? "Cancel edit",
                          children: /* @__PURE__ */ a(sn, {})
                        }
                      ) }),
                      /* @__PURE__ */ a(yt, { children: nr(
                        "%comment_aria_cancel_edit%",
                        r,
                        "Cancel edit"
                      ) })
                    ] }),
                    /* @__PURE__ */ u(bt, { children: [
                      /* @__PURE__ */ a(xt, { asChild: !0, children: /* @__PURE__ */ a(
                        qr,
                        {
                          isDisabled: Y,
                          disabledExplanation: nr(
                            "%comment_aria_save_edit%",
                            r,
                            "Save edit"
                          ),
                          className: "tw:inline-flex",
                          children: /* @__PURE__ */ a(
                            et,
                            {
                              size: "icon-sm",
                              onClick: N,
                              className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                              disabled: Y,
                              "aria-label": r["%comment_aria_save_edit%"] ?? "Save edit",
                              children: /* @__PURE__ */ a(ai, {})
                            }
                          )
                        }
                      ) }),
                      /* @__PURE__ */ a(yt, { children: nr(
                        "%comment_aria_save_edit%",
                        r,
                        "Save edit"
                      ) })
                    ] })
                  ] })
                }
              )
            }
          ),
          !m && /* @__PURE__ */ u(gt, { children: [
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
              /* @__PURE__ */ a("div", { className: "tw:text-sm tw:italic", children: os(t.conflictResolutionAction) === "merged" ? r["%conflict_note_outcome_combined%"] ?? "Combined both changes." : r["%conflict_note_outcome_used_other%"] ?? "Used the other change instead of the current text." })
            ) : /* @__PURE__ */ a(
              "div",
              {
                className: b(
                  // Shared note-body prose/blockquote treatment (also used by conflict-diff's
                  // DIFF_HTML_CLASSES). Layer this comment item's own extras on top: items-start +
                  // gap-2 for layout, and line-clamp while the thread is collapsed.
                  rs,
                  "tw:items-start tw:gap-2",
                  {
                    "tw:line-clamp-3": !o
                  }
                ),
                dangerouslySetInnerHTML: { __html: O }
              }
            )
          ] })
        ] }),
        W && /* @__PURE__ */ u(Be, { children: [
          /* @__PURE__ */ a(Ee, { asChild: !0, children: /* @__PURE__ */ a(et, { variant: "ghost", size: "icon", children: /* @__PURE__ */ a(Zs, {}) }) }),
          /* @__PURE__ */ a(je, { align: "end", children: W })
        ] })
      ]
    }
  );
}
function ns({
  show: t,
  disabled: e = !1,
  onClick: r,
  ariaLabel: o
}) {
  if (t)
    return /* @__PURE__ */ a(
      et,
      {
        variant: "ghost",
        size: "icon",
        disabled: e,
        className: b(
          "tw:ms-auto",
          "tw:text-primary tw:transition-opacity tw:duration-200 tw:hover:bg-primary/10",
          "tw:opacity-0 tw:group-hover:opacity-100"
        ),
        onClick: (n) => {
          n.stopPropagation(), r();
        },
        "aria-label": o,
        children: /* @__PURE__ */ a(Ze, { className: "tw:h-4 tw:w-4" })
      }
    );
}
const Gw = {
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
}, is = di(function({
  classNameForVerseText: e,
  comments: r,
  localizedStrings: o,
  isSelected: n = !1,
  verseRef: s,
  assignedUser: i,
  currentUser: c,
  handleSelectThread: d,
  threadId: l,
  thread: w,
  threadStatus: p,
  handleAddCommentToThread: h,
  handleUpdateComment: f,
  handleDeleteComment: m,
  handleReadStatusChange: x,
  assignableUsers: g,
  canUserAddCommentToThread: T,
  canUserAssignThreadCallback: y,
  canUserResolveThreadCallback: C,
  canUserEditOrDeleteCommentCallback: N,
  isRead: A = !1,
  autoReadDelay: B = 5,
  onVerseRefClick: U,
  initialAssignedUser: O,
  activeComments: S,
  rootContentSlot: D,
  resolveActionSlot: W,
  spaceRootContentFromReplies: Y = !1,
  draft: z,
  onDraftChange: k
}) {
  var gr;
  const [ot, I] = _({}), X = z ?? ot, G = X.editorState ?? Gw, $ = X.assignedUser, at = k !== void 0, ut = L(X);
  ut.current = X;
  const dt = V(
    (E) => {
      const ct = { ...ut.current, ...E };
      ut.current = ct, at || I(ct), k == null || k(l, Lw(ct) ? void 0 : ct);
    },
    [at, k, l]
  ), tt = V(
    (E, ct) => {
      const wt = { ...X.commentEdits };
      ct === void 0 ? delete wt[E] : wt[E] = ct, dt({
        commentEdits: $r(wt) ? wt : void 0
      });
    },
    [X.commentEdits, dt]
  ), [pt, kt] = _(), mt = n, [Rt, jt] = _(!1), [Pt, ge] = _(!1), [we, _t] = _(!1), [Nt, Et] = _(!1), [oe, fe] = _(!1), [Dt, Mt] = _(A), [ne, ke] = _(!1), me = L(void 0), [Oe, le] = _(/* @__PURE__ */ new Map());
  Z(() => {
    let E = !0;
    return (async () => {
      const wt = C ? await C(l) : !1;
      E && fe(wt);
    })(), () => {
      E = !1;
    };
  }, [l, C]), Z(() => {
    let E = !0;
    if (!n) {
      Et(!1), le(/* @__PURE__ */ new Map());
      return;
    }
    return (async () => {
      const wt = y ? await y(l) : !1;
      E && Et(wt);
    })(), () => {
      E = !1;
    };
  }, [n, l, y]);
  const Yt = L("idle");
  Z(() => {
    if (!n) {
      Yt.current !== "idle" && (dt({ assignedUser: void 0 }), kt(void 0), Yt.current = "idle");
      return;
    }
    Yt.current === "idle" && (Yt.current = "pending"), Nt ? Yt.current === "pending" && O !== void 0 && // Skip pre-population if the thread is already assigned to this user — doing so
    // would show "Assigning to: Alice" and enable the submit button for a no-op call.
    O !== i && (dt({ assignedUser: O }), Yt.current = "auto-populated") : Yt.current === "auto-populated" && (dt({ assignedUser: void 0 }), Yt.current = "pending");
  }, [n, O, Nt, i, dt]);
  const Xt = L(pt);
  Xt.current = pt;
  const Jt = L(k);
  Jt.current = k;
  const Ie = L(l);
  Ie.current = l, Z(() => () => {
    var ct;
    const { current: E } = ut;
    E.assignedUser !== void 0 && E.assignedUser === Xt.current && E.editorState === void 0 && !$r(E.commentEdits) && ((ct = Jt.current) == null || ct.call(Jt, Ie.current, void 0));
  }, []);
  const M = P(
    () => S ?? r.filter((E) => !E.deleted),
    [S, r]
  ), Ot = P(() => {
    const { commentEdits: E } = X;
    if (!E) return E;
    const ct = new Set(M.map((zt) => zt.id)), wt = Object.fromEntries(
      Object.entries(E).filter(([zt]) => ct.has(zt))
    );
    return $r(wt) ? wt : void 0;
  }, [X, M]), qt = Pt || $r(Ot);
  Z(() => {
    let E = !0;
    if (!n || !N) {
      le(/* @__PURE__ */ new Map());
      return;
    }
    return (async () => {
      const wt = /* @__PURE__ */ new Map();
      await Promise.all(
        M.map(async (zt) => {
          const Ke = await N(zt.id);
          E && wt.set(zt.id, Ke);
        })
      ), E && le(wt);
    })(), () => {
      E = !1;
    };
  }, [n, M, N]);
  const It = P(() => M[0], [M]), R = L(null), K = L(void 0), J = V(() => {
    var E;
    (E = K.current) == null || E.call(K), dt({ editorState: void 0 });
  }, [dt]), H = V(
    (E) => {
      dt({ editorState: de(E) ? E : void 0 });
    },
    [dt]
  ), Q = V(() => {
    const E = !Dt;
    Mt(E), ke(!E), x == null || x(l, E);
  }, [Dt, x, l]);
  Z(() => {
    jt(!1);
  }, [n]), Z(() => {
    if (n && !Dt && !ne) {
      const E = setTimeout(() => {
        Mt(!0), x == null || x(l, !0);
      }, B * 1e3);
      return me.current = E, () => clearTimeout(E);
    }
    me.current && (clearTimeout(me.current), me.current = void 0);
  }, [n, Dt, ne, B, l, x]);
  const j = P(
    () => ({
      singleReply: o["%comment_thread_single_reply%"],
      multipleReplies: o["%comment_thread_multiple_replies%"]
    }),
    [o]
  ), nt = P(() => {
    if (i === void 0)
      return;
    if (i === "")
      return o["%comment_assign_unassigned%"] ?? "Unassigned";
    const E = ma(i, o);
    return Ye(o["%comment_assigned_to%"], {
      assignedUser: E
    });
  }, [i, o]), st = P(() => M.slice(1), [M]), it = P(() => st.length ?? 0, [st.length]), vt = P(() => it > 0, [it]), Ct = P(() => {
    if (Rt || it <= 2)
      return st;
    const E = new Set(st.slice(-2).map((ct) => ct.id));
    return st.filter(
      (ct) => {
        var wt;
        return E.has(ct.id) || ((wt = X.commentEdits) == null ? void 0 : wt[ct.id]) !== void 0;
      }
    );
  }, [st, it, Rt, X.commentEdits]), Tt = P(() => Rt || it <= 2 ? 0 : it - Ct.length, [it, Rt, Ct.length]), Gt = P(
    () => it === 1 ? j.singleReply : Ye(j.multipleReplies, { count: it }),
    [it, j]
  ), rr = P(
    () => Tt === 1 ? j.singleReply : Ye(j.multipleReplies, { count: Tt }),
    [Tt, j]
  );
  Z(() => {
    !n && qt && vt && ge(!1);
  }, [n, qt, vt]);
  const Ue = V(
    async (E) => {
      E && E.stopPropagation();
      const ct = de(G) ? Ra(G) : void 0;
      if ($ !== void 0) {
        await h({
          threadId: l,
          contents: ct,
          assignedUser: $
        }) && (kt($), ct && J());
        return;
      }
      ct && await h({ threadId: l, contents: ct }) && J();
    },
    [
      J,
      G,
      h,
      $,
      l
    ]
  ), ze = V(
    async (E) => {
      const ct = de(G) ? Ra(G) : void 0, wt = E.status ? E.assignedUser : $ ?? E.assignedUser, zt = await h({
        ...E,
        contents: ct,
        assignedUser: wt
      });
      return zt && (wt !== void 0 && kt(wt), ct && J()), zt;
    },
    [J, G, h, $]
  );
  if (M.length === 0) return;
  const _e = !Nt || !g || g.length === 0 || !g.includes(c), hr = !de(G) && ($ === void 0 || $ === pt), Zr = /* @__PURE__ */ a(
    An,
    {
      comment: It,
      localizedStrings: o,
      isThreadExpanded: n,
      threadStatus: p,
      handleAddCommentToThread: ze,
      handleUpdateComment: f,
      handleDeleteComment: m,
      onEditingChange: ge,
      canEditOrDelete: (!qt && Oe.get(It.id)) ?? !1,
      canUserResolveThread: oe,
      draftEditorState: (gr = X.commentEdits) == null ? void 0 : gr[It.id],
      onDraftEditorStateChange: (E) => tt(It.id, E)
    }
  );
  return /* @__PURE__ */ a(
    Uw,
    {
      role: "option",
      "aria-selected": n,
      id: l,
      className: b(
        // `border-s-4` is always present so the bar's width is reserved on every card and
        // selecting one does not shift its content sideways. Logical property, so it follows RTL.
        "tw:group tw:w-full tw:rounded-none tw:border-s-4 tw:p-3 tw:outline-hidden tw:transition-all tw:duration-200 tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-1 tw:focus:ring-offset-background",
        { "tw:cursor-pointer tw:hover:shadow-md": !n },
        // Selection rides the leading bar and elevation, never the background. The background
        // channel already carries three meanings (unread, resolved, read) and cannot express a
        // fourth. The bar is `foreground` rather than `primary` because `primary` measures 2.38:1
        // against the card in paratext-dark, below the 3:1 non-text minimum — see
        // active-comment-bar-contrast.test.ts.
        {
          "tw:border-foreground tw:shadow-md": n,
          "tw:border-transparent": !n
        },
        // Status keeps the background channel. `--card` is the surface token; text-on-* tokens
        // like `--primary-foreground` are not surfaces and render near-white in paratext-dark.
        {
          "tw:bg-card": p !== "Resolved" && Dt,
          "tw:bg-muted": p === "Resolved",
          "tw:bg-accent": !Dt && p !== "Resolved"
        }
      ),
      onClick: () => {
        d(l);
      },
      tabIndex: -1,
      children: /* @__PURE__ */ u(Kw, { className: "tw:flex tw:flex-col tw:gap-2 tw:p-0", children: [
        /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:content-center tw:items-start tw:gap-2", children: [
          /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:gap-2", children: [
            nt && /* @__PURE__ */ a(Fr, { className: "tw:rounded-sm tw:bg-input tw:text-sm tw:font-normal tw:text-primary tw:hover:bg-input", children: nt }),
            /* @__PURE__ */ a(
              et,
              {
                variant: "ghost",
                size: "icon",
                onClick: (E) => {
                  E.stopPropagation(), Q();
                },
                className: "tw:text-muted-foreground tw:transition tw:hover:text-foreground",
                "aria-label": Dt ? o["%comment_aria_mark_as_unread%"] ?? "Mark as unread" : o["%comment_aria_mark_as_read%"] ?? "Mark as read",
                children: Dt ? /* @__PURE__ */ a(Qs, {}) : /* @__PURE__ */ a(tc, {})
              }
            ),
            W === void 0 ? (
              // Generic status-resolve check (used by non-conflict threads and, via ConflictThread
              // leaving this slot undefined, by non-verseText conflicts, which resolve through a
              // plain status change). ConflictThread overrides this slot for verseText conflicts.
              /* @__PURE__ */ a(
                ns,
                {
                  show: oe && p !== "Resolved",
                  onClick: () => ze({ threadId: l, status: "Resolved" }),
                  ariaLabel: o["%comment_aria_resolve_thread%"] ?? "Resolve thread"
                }
              )
            ) : W
          ] }),
          /* @__PURE__ */ a("div", { className: "tw:flex tw:max-w-full tw:flex-wrap tw:items-baseline tw:gap-2", children: /* @__PURE__ */ u(
            "p",
            {
              ref: R,
              className: b(
                "tw:flex-1 tw:overflow-hidden tw:text-ellipsis tw:text-sm tw:font-normal tw:text-muted-foreground",
                {
                  "tw:overflow-visible tw:text-clip tw:whitespace-normal tw:break-words": mt
                },
                { "tw:whitespace-nowrap": !mt }
              ),
              children: [
                s && U ? /* @__PURE__ */ a(
                  et,
                  {
                    variant: "ghost",
                    size: "sm",
                    className: "tw:h-auto tw:px-1 tw:py-0 tw:text-sm tw:font-normal tw:text-muted-foreground",
                    onClick: (E) => {
                      E.stopPropagation(), U(w);
                    },
                    children: s
                  }
                ) : s,
                /* @__PURE__ */ u("span", { className: e, children: [
                  It.contextBefore,
                  /* @__PURE__ */ a("span", { className: "tw:font-bold", children: It.selectedText }),
                  It.contextAfter
                ] })
              ]
            }
          ) }),
          D ?? Zr
        ] }),
        /* @__PURE__ */ u(gt, { children: [
          vt && !n && /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:gap-5", children: [
            /* @__PURE__ */ a("div", { className: "tw:w-8", children: /* @__PURE__ */ a(Ur, {}) }),
            /* @__PURE__ */ a("p", { className: "tw:text-sm tw:text-muted-foreground", children: Gt })
          ] }),
          !n && de(G) && /* @__PURE__ */ a(
            Sa,
            {
              editorSerializedState: G,
              onSerializedChange: H,
              placeholder: o["%comment_replyOrAssign%"]
            }
          ),
          n && /* @__PURE__ */ u(gt, { children: [
            Y && Ct.length > 0 && /* @__PURE__ */ a("div", { className: "tw:h-2", "data-slot": "root-content-reply-gap", "aria-hidden": "true" }),
            Tt > 0 && /* @__PURE__ */ u(
              "div",
              {
                className: "tw:flex tw:cursor-pointer tw:items-center tw:gap-5 tw:py-2",
                onClick: (E) => {
                  E.stopPropagation(), jt(!0);
                },
                role: "button",
                tabIndex: 0,
                onKeyDown: (E) => {
                  (E.key === "Enter" || E.key === " ") && (E.preventDefault(), E.stopPropagation(), jt(!0));
                },
                children: [
                  /* @__PURE__ */ a("div", { className: "tw:w-8", children: /* @__PURE__ */ a(Ur, {}) }),
                  /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:gap-2", children: [
                    /* @__PURE__ */ a("p", { className: "tw:text-sm tw:text-muted-foreground", children: rr }),
                    Rt ? /* @__PURE__ */ a(ti, {}) : /* @__PURE__ */ a(sr, {})
                  ] })
                ]
              }
            ),
            Ct.map((E) => {
              var ct;
              return /* @__PURE__ */ a("div", { children: /* @__PURE__ */ a(
                An,
                {
                  comment: E,
                  localizedStrings: o,
                  isReply: !0,
                  isThreadExpanded: n,
                  handleUpdateComment: f,
                  handleDeleteComment: m,
                  onEditingChange: ge,
                  canEditOrDelete: (!qt && Oe.get(E.id)) ?? !1,
                  draftEditorState: (ct = X.commentEdits) == null ? void 0 : ct[E.id],
                  onDraftEditorStateChange: (wt) => tt(E.id, wt)
                }
              ) }, E.id);
            }),
            T !== !1 && (!qt || de(G)) && /* @__PURE__ */ a(
              "div",
              {
                role: "textbox",
                tabIndex: -1,
                className: "tw:w-full tw:space-y-2",
                onClick: (E) => E.stopPropagation(),
                onKeyDownCapture: (E) => {
                  Wo(E) && (E.preventDefault(), E.stopPropagation(), (de(G) || $ !== void 0 && $ !== pt) && Ue());
                },
                onKeyDown: (E) => {
                  Go(E), (E.key === "Enter" || E.key === " ") && E.stopPropagation();
                },
                children: /* @__PURE__ */ a(
                  Sa,
                  {
                    editorSerializedState: G,
                    onSerializedChange: H,
                    placeholder: p === "Resolved" ? o["%comment_reopenResolved%"] : o["%comment_replyOrAssign%"],
                    autoFocus: !0,
                    onClear: (E) => {
                      K.current = E;
                    },
                    actions: /* @__PURE__ */ u(gt, { children: [
                      $ !== void 0 && (de(G) || $ !== pt) ? /* @__PURE__ */ a("span", { className: "tw:flex-1 tw:text-sm tw:text-muted-foreground", children: Ye(
                        o["%comment_assigning_to%"] ?? "Assigning to: {assignedUser}",
                        {
                          assignedUser: ma(
                            $,
                            o
                          )
                        }
                      ) }) : /* @__PURE__ */ a("div", { className: "tw:flex-1" }),
                      /* @__PURE__ */ u(lr, { open: we, onOpenChange: _t, children: [
                        /* @__PURE__ */ u(bt, { children: [
                          /* @__PURE__ */ a(xt, { asChild: !0, children: /* @__PURE__ */ a(
                            qr,
                            {
                              isDisabled: _e,
                              disabledExplanation: nr(
                                "%comment_aria_assign_user%",
                                o,
                                "Assign user"
                              ),
                              children: /* @__PURE__ */ a(Dr, { asChild: !0, children: /* @__PURE__ */ a(
                                et,
                                {
                                  size: "icon-sm",
                                  variant: "outline",
                                  className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                                  disabled: _e,
                                  "aria-label": o["%comment_aria_assign_user%"] ?? "Assign user",
                                  children: /* @__PURE__ */ a(ri, {})
                                }
                              ) })
                            }
                          ) }),
                          /* @__PURE__ */ a(yt, { children: nr(
                            "%comment_aria_assign_user%",
                            o,
                            "Assign user"
                          ) })
                        ] }),
                        /* @__PURE__ */ a(
                          dr,
                          {
                            className: "tw:w-auto tw:p-0",
                            align: "end",
                            onKeyDown: (E) => {
                              E.key === "Escape" && (E.stopPropagation(), _t(!1));
                            },
                            children: /* @__PURE__ */ a(wr, { children: /* @__PURE__ */ a(ur, { children: g == null ? void 0 : g.map((E) => /* @__PURE__ */ a(
                              tr,
                              {
                                onSelect: () => {
                                  dt({
                                    assignedUser: E !== i ? E : void 0
                                  }), Yt.current = "user-selected", kt(void 0), _t(!1);
                                },
                                className: "tw:flex tw:items-center",
                                children: /* @__PURE__ */ a("span", { children: ma(E, o) })
                              },
                              E || "unassigned"
                            )) }) })
                          }
                        )
                      ] }),
                      /* @__PURE__ */ u(bt, { children: [
                        /* @__PURE__ */ a(xt, { asChild: !0, children: /* @__PURE__ */ a(
                          qr,
                          {
                            isDisabled: hr,
                            disabledExplanation: nr(
                              "%comment_aria_submit_comment%",
                              o,
                              "Submit comment"
                            ),
                            className: "tw:inline-flex",
                            children: /* @__PURE__ */ a(
                              et,
                              {
                                size: "icon-sm",
                                onClick: Ue,
                                className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                                disabled: hr,
                                "aria-label": o["%comment_aria_submit_comment%"] ?? "Submit comment",
                                children: /* @__PURE__ */ a(ai, {})
                              }
                            )
                          }
                        ) }),
                        /* @__PURE__ */ a(yt, { children: nr(
                          "%comment_aria_submit_comment%",
                          o,
                          "Submit comment"
                        ) })
                      ] })
                    ] })
                  }
                )
              }
            )
          ] })
        ] })
      ] })
    }
  );
}), Ww = b(
  rs,
  // `prose` gives block children (the top-level blockquote wrapper, and any p — whether nested
  // inside that blockquote or, in the non-verseText fallback, a direct child) vertical margins that
  // make these already-compact cards feel bulky. Zero both so the diff sits flush inside the card.
  "tw:[&>blockquote]:my-0 tw:[&_p]:my-0",
  "tw:[&_u]:font-semibold tw:[&_u]:text-success-foreground tw:[&_u]:no-underline",
  "tw:[&_s]:text-destructive tw:[&_s]:line-through"
), Yw = (t) => t.replace(/(\s+)(<\/[us]>)/g, "$2$1"), va = (t) => Yw(Ao(t));
function ba({ html: t }) {
  return /* @__PURE__ */ a(
    "div",
    {
      className: Ww,
      dangerouslySetInnerHTML: { __html: t }
    }
  );
}
function Xw({
  comment: t,
  localizedStrings: e,
  availableActions: r = "acceptOrReject",
  resolvedResolution: o,
  onResolve: n,
  isResolving: s = !1
}) {
  const [i, c] = _("accept"), d = Na(), l = Na(), w = r === "loading", p = r === "accept", h = r === "none", f = r === "acceptRejectOrMerge", m = p ? "accept" : i, x = P(
    () => va(t.rejectedText ?? ""),
    [t.rejectedText]
  ), g = P(
    () => va(t.acceptedText ?? ""),
    [t.acceptedText]
  ), T = P(
    () => va(t.mergedText ?? ""),
    [t.mergedText]
  ), y = P(() => Ao(t.contents), [t.contents]);
  if (!as(t))
    return /* @__PURE__ */ a(ba, { html: y });
  const C = (I) => {
    c(I === "reject" || I === "merge" ? I : "accept");
  }, N = e["%conflict_note_stale_notice%"] ?? "The verse was edited after this conflict was recorded, so 'Use the other change' is no longer available. Keep the current text to resolve.", A = f ? [
    {
      value: "merge",
      label: e["%conflict_note_option_combine%"] ?? "Combine both changes",
      html: T
    }
  ] : [], B = [
    {
      value: "accept",
      label: e["%conflict_note_option_keep_current%"] ?? "Keep the current text",
      html: g
    },
    {
      value: "reject",
      label: e["%conflict_note_option_use_other%"] ?? "Use the other change",
      html: x
    },
    ...A
  ], U = m === "accept", O = s || U;
  let S;
  U ? S = e["%conflict_note_save_disabled_tooltip%"] ?? "Keeping the current text makes no change — resolve the thread with the ✓ to keep it." : s || (S = e["%conflict_note_save_warning%"] ?? "This can't be undone.");
  const D = e["%conflict_note_no_result%"] ?? "No result preview available.", W = /* @__PURE__ */ a("p", { className: "tw:text-muted-foreground", children: D }), Y = (I) => I ? /* @__PURE__ */ a("p", { className: "tw:whitespace-pre-wrap tw:text-foreground", children: I }) : W, z = () => {
    const I = o ?? "accept";
    return I === "merged" ? t.mergedText ? /* @__PURE__ */ a(ba, { html: T }) : W : Y(I === "reject" ? t.rejectedResultText : t.resultText);
  }, k = (I) => p && I.value === "reject", ot = (I) => {
    const X = m === I.value, G = `${l}-${I.value}`, $ = k(I);
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
          htmlFor: G,
          "data-slot": "conflict-resolution-option",
          "data-value": I.value,
          className: b(
            "tw:flex tw:flex-col tw:gap-1 tw:rounded-md tw:border tw:p-2",
            "tw:focus-within:ring-2 tw:focus-within:ring-ring tw:focus-within:ring-offset-1",
            X ? "tw:border-border tw:bg-accent/50" : "tw:border-transparent tw:hover:bg-accent/30",
            $ ? "tw:cursor-not-allowed tw:opacity-60" : "tw:cursor-pointer"
          ),
          children: [
            /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:gap-2", children: [
              /* @__PURE__ */ a(
                ya,
                {
                  id: G,
                  value: I.value,
                  "aria-label": I.label,
                  disabled: $,
                  "aria-describedby": $ ? d : void 0
                }
              ),
              /* @__PURE__ */ a("span", { "aria-hidden": !0, className: "tw:font-medium", children: I.label })
            ] }),
            $ && // aria-describedby links the option to this visually-hidden notice so assistive tech
            // announces why the choice is read-only.
            /* @__PURE__ */ a("span", { id: d, className: "tw:sr-only", children: N }),
            /* @__PURE__ */ a(ba, { html: I.html })
          ]
        },
        I.value
      )
    );
  };
  return (
    // Contain every click inside the card (selecting an option, pressing Save) so it never bubbles
    // up to toggle the enclosing CommentThread open/closed. The thread toggles on click only, so a
    // single onClick guard at the root is enough; this container is not itself an interactive control
    // and needs no keyboard handler (the thread has no keyboard toggle to intercept).
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
    /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:gap-3 tw:text-sm", onClick: (I) => I.stopPropagation(), children: [
      /* @__PURE__ */ a("p", { children: e["%conflict_note_description_verseText%"] ?? "Conflicting changes were made to the verse text." }),
      w && /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:gap-2", "data-slot": "conflict-loading", children: [
        /* @__PURE__ */ a(yr, { className: "tw:h-8 tw:w-full" }),
        /* @__PURE__ */ a(yr, { className: "tw:h-8 tw:w-full" }),
        /* @__PURE__ */ a(yr, { className: "tw:h-8 tw:w-24" })
      ] }),
      !w && h && z(),
      !w && !h && /* @__PURE__ */ u(gt, { children: [
        /* @__PURE__ */ a("p", { children: e["%conflict_note_choose_prompt%"] ?? "Select which change to keep:" }),
        /* @__PURE__ */ a(
          Ro,
          {
            value: m,
            onValueChange: C,
            disabled: s,
            "aria-label": e["%conflict_note_choose_aria_label%"] ?? "Choose resolution",
            children: B.map((I) => k(I) ? /* @__PURE__ */ a(Vt, { delayDuration: 0, children: /* @__PURE__ */ u(bt, { children: [
              /* @__PURE__ */ a(xt, { asChild: !0, children: ot(I) }),
              /* @__PURE__ */ a(yt, { children: N })
            ] }) }, I.value) : ot(I))
          }
        ),
        /* @__PURE__ */ a(Vt, { delayDuration: 0, children: /* @__PURE__ */ u(bt, { children: [
          /* @__PURE__ */ a(xt, { asChild: !0, children: /* @__PURE__ */ a(
            qr,
            {
              isDisabled: O && S !== void 0,
              disabledExplanation: S,
              className: "tw:inline-flex tw:self-start",
              children: /* @__PURE__ */ a(
                et,
                {
                  size: "sm",
                  disabled: O,
                  onClick: () => n == null ? void 0 : n(m),
                  children: e["%conflict_note_save_and_resolve%"] ?? "Save and resolve"
                }
              )
            }
          ) }),
          S && /* @__PURE__ */ a(yt, { children: S })
        ] }) })
      ] })
    ] })
  );
}
const Jw = {
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
function Zw({
  comment: t,
  localizedStrings: e,
  resolvedResolution: r
}) {
  const o = P(
    () => va(t.rejectedText ?? ""),
    [t.rejectedText]
  );
  if (r) {
    const { key: s, fallback: i } = Jw[r];
    return /* @__PURE__ */ a("p", { className: "tw:text-sm tw:font-normal tw:text-muted-foreground", children: e[s] ?? i });
  }
  const n = e["%conflict_note_summary_unresolved%"] ?? "Conflicting edits. Choose which change to keep.";
  return /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:gap-1", children: [
    /* @__PURE__ */ a("p", { className: "tw:text-sm tw:font-normal tw:text-muted-foreground", children: n }),
    o ? /* @__PURE__ */ a(ba, { html: o }) : void 0
  ] });
}
function Qw(t) {
  return t === "reject" ? "reject" : t === "merge" ? "merged" : "accept";
}
function tu({
  threadId: t,
  threadStatus: e,
  isSelected: r,
  activeComments: o,
  conflictResolution: n
}) {
  const [s, i] = _("loading"), [c, d] = _(!1), [l, w] = _(), p = n == null ? void 0 : n.getOptions, h = n == null ? void 0 : n.resolve;
  Z(() => {
    let y = !0;
    if (!r) {
      i("loading");
      return;
    }
    return (async () => {
      let N;
      try {
        N = p ? await p(t) : "none";
      } catch {
        N = "none";
      }
      y && (i(N), N !== "none" && w(void 0));
    })(), () => {
      y = !1;
    };
  }, [r, t, e, p]);
  const f = L(!1), m = V(
    async (y) => {
      if (!(!h || f.current)) {
        f.current = !0, d(!0);
        try {
          await h(t, y) && (w(Qw(y)), i("none"));
        } catch {
        } finally {
          f.current = !1, d(!1);
        }
      }
    },
    [h, t]
  ), g = P(() => {
    if (e === "Resolved") {
      for (let y = o.length - 1; y >= 0; y -= 1)
        if (o[y].status === "Resolved")
          return os(o[y].conflictResolutionAction);
      return "accept";
    }
  }, [e, o]) ?? l;
  return { conflictOptions: s, isResolving: c, resolve: m, resolvedResolution: g, showResolveCheck: s !== "loading" && s !== "none" };
}
const eu = di(function(e) {
  const {
    comments: r,
    localizedStrings: o,
    isSelected: n = !1,
    threadId: s,
    threadStatus: i,
    conflictResolution: c
  } = e, d = P(() => r.filter((y) => !y.deleted), [r]), l = P(
    () => d.find((y) => y.conflictType) ?? d[0],
    [d]
  ), { conflictOptions: w, isResolving: p, resolve: h, resolvedResolution: f, showResolveCheck: m } = tu({
    threadId: s,
    threadStatus: i,
    isSelected: n,
    activeComments: d,
    conflictResolution: c
  }), x = as(l);
  let g;
  x && l && (g = n ? /* @__PURE__ */ a(
    Xw,
    {
      comment: l,
      localizedStrings: o,
      availableActions: w,
      resolvedResolution: f,
      onResolve: h,
      isResolving: p
    }
  ) : /* @__PURE__ */ a(
    Zw,
    {
      comment: l,
      localizedStrings: o,
      resolvedResolution: f
    }
  ));
  let T;
  return x && (T = /* @__PURE__ */ a(
    ns,
    {
      show: m,
      disabled: p,
      onClick: () => h("accept"),
      ariaLabel: o["%comment_aria_resolve_thread%"] ?? "Resolve thread"
    }
  )), /* @__PURE__ */ a(
    is,
    {
      ...e,
      activeComments: d,
      rootContentSlot: g,
      resolveActionSlot: T,
      spaceRootContentFromReplies: x && n
    }
  );
});
function Nh({
  className: t = "",
  classNameForVerseText: e,
  threads: r,
  currentUser: o,
  localizedStrings: n,
  handleAddCommentToThread: s,
  handleUpdateComment: i,
  handleDeleteComment: c,
  handleReadStatusChange: d,
  assignableUsers: l,
  canUserAddCommentToThread: w,
  canUserAssignThreadCallback: p,
  canUserResolveThreadCallback: h,
  canUserEditOrDeleteCommentCallback: f,
  selectedThreadId: m,
  onSelectedThreadChange: x,
  onVerseRefClick: g,
  conflictResolution: T,
  drafts: y,
  onDraftChange: C
}) {
  const [N, A] = _(/* @__PURE__ */ new Set()), [B, U] = _(), [O, S] = _(), D = V(
    async ($) => {
      const at = await s($);
      return at !== void 0 && $.assignedUser !== void 0 && $.assignedUser !== "" && S($.assignedUser), at;
    },
    [s]
  );
  Z(() => {
    m && (A(($) => new Set($).add(m)), U(m));
  }, [m]);
  const W = r.filter(
    ($) => $.comments.some((at) => !at.deleted)
  ), Y = W.map(($) => ({ id: $.id })), z = V(
    ($) => {
      A((at) => new Set(at).add($.id)), U($.id), x == null || x($.id);
    },
    [x]
  ), k = V(
    ($) => {
      const at = N.has($);
      A((ut) => {
        const dt = new Set(ut);
        return dt.has($) ? dt.delete($) : dt.add($), dt;
      }), U($), x == null || x(at ? void 0 : $);
    },
    [N, x]
  ), { listboxRef: ot, activeId: I, handleKeyDown: X } = Ts({
    options: Y,
    onOptionSelect: z
  }), G = V(
    ($) => {
      $.key === "Escape" ? (B && N.has(B) && (A((at) => {
        const ut = new Set(at);
        return ut.delete(B), ut;
      }), U(void 0), x == null || x(void 0)), $.preventDefault(), $.stopPropagation()) : X($);
    },
    [B, N, X, x]
  );
  return /* @__PURE__ */ a(
    "div",
    {
      id: Fw,
      role: "listbox",
      tabIndex: 0,
      ref: ot,
      "aria-activedescendant": I ?? void 0,
      "aria-label": "Comments",
      className: b(
        "tw:flex tw:w-full tw:flex-col tw:outline-hidden tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-1 tw:focus:ring-offset-background",
        t
      ),
      onKeyDown: G,
      children: W.map(($) => {
        const at = {
          classNameForVerseText: e,
          comments: $.comments,
          localizedStrings: n,
          verseRef: $.verseRef,
          handleSelectThread: k,
          threadId: $.id,
          thread: $,
          isRead: $.isRead,
          isSelected: N.has($.id),
          currentUser: o,
          assignedUser: $.assignedUser,
          threadStatus: $.status,
          handleAddCommentToThread: D,
          handleUpdateComment: i,
          handleDeleteComment: c,
          handleReadStatusChange: d,
          assignableUsers: l,
          canUserAddCommentToThread: w,
          canUserAssignThreadCallback: p,
          canUserResolveThreadCallback: h,
          canUserEditOrDeleteCommentCallback: f,
          onVerseRefClick: g,
          initialAssignedUser: O,
          draft: y == null ? void 0 : y[$.id],
          onDraftChange: C
        };
        return /* @__PURE__ */ a(
          "div",
          {
            className: b("tw:border-b tw:border-border tw:last:border-b-0", {
              "tw:opacity-60": $.status === "Resolved"
            }),
            children: $.type === "Conflict" ? /* @__PURE__ */ a(eu, { ...at, conflictResolution: T }) : /* @__PURE__ */ a(is, { ...at })
          },
          $.id
        );
      })
    }
  );
}
function ru({ table: t }) {
  return /* @__PURE__ */ u(Be, { children: [
    /* @__PURE__ */ a(Ee, { asChild: !0, children: /* @__PURE__ */ u(et, { variant: "outline", size: "sm", className: "tw:ml-auto tw:hidden tw:h-8 tw:lg:flex", children: [
      /* @__PURE__ */ a(ec, { className: "tw:mr-2 tw:h-4 tw:w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ u(je, { align: "end", className: "tw:w-[150px]", children: [
      /* @__PURE__ */ a(cr, { children: "Toggle columns" }),
      /* @__PURE__ */ a(ir, {}),
      t.getAllColumns().filter((e) => e.getCanHide()).map((e) => /* @__PURE__ */ a(
        Xe,
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
function Er({ ...t }) {
  return /* @__PURE__ */ a(ae.Root, { "data-slot": "select", ...t });
}
function au({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    ae.Group,
    {
      "data-slot": "select-group",
      className: b("tw:scroll-my-1 tw:p-1", t),
      ...e
    }
  );
}
function Tr({ ...t }) {
  return /* @__PURE__ */ a(ae.Value, { "data-slot": "select-value", ...t });
}
function Sr({ className: t, size: e = "default", children: r, ...o }) {
  const n = Re();
  return /* @__PURE__ */ u(
    ae.Trigger,
    {
      "data-slot": "select-trigger",
      "data-size": e,
      className: b(
        "pr-twp tw:flex tw:w-fit tw:items-center tw:gap-2 tw:rounded-lg tw:border tw:border-input tw:bg-transparent tw:py-2 tw:pe-2 tw:ps-2.5 tw:text-sm tw:whitespace-nowrap tw:transition-colors tw:outline-none tw:select-none tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:data-placeholder:text-muted-foreground tw:data-[size=default]:h-8 tw:data-[size=sm]:h-7 tw:data-[size=sm]:rounded-[min(var(--tw-radius-md),10px)] tw:*:data-[slot=select-value]:line-clamp-1 tw:*:data-[slot=select-value]:flex tw:*:data-[slot=select-value]:flex-1 tw:*:data-[slot=select-value]:items-center tw:*:data-[slot=select-value]:gap-1.5 tw:*:data-[slot=select-value]:text-start tw:dark:bg-input/30 tw:dark:hover:bg-input/50 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      dir: n,
      ...o,
      children: [
        r,
        /* @__PURE__ */ a(ae.Icon, { asChild: !0, children: /* @__PURE__ */ a(wi, { className: "tw:pointer-events-none tw:size-4 tw:text-muted-foreground" }) })
      ]
    }
  );
}
function Rr({
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
  ...s
}) {
  const i = Re();
  return /* @__PURE__ */ a(ae.Portal, { children: /* @__PURE__ */ u(
    ae.Content,
    {
      "data-slot": "select-content",
      "data-align-trigger": r === "item-aligned",
      className: b(
        "pr-twp tw:relative tw:max-h-(--radix-select-content-available-height) tw:data-[align-trigger=true]:min-w-(--radix-select-trigger-width) tw:data-[align-trigger=false]:min-w-36 tw:origin-(--radix-select-content-transform-origin) tw:overflow-x-hidden tw:overflow-y-auto tw:rounded-lg tw:bg-popover tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:data-[align-trigger=true]:animate-none tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95 tw:animate-none! tw:bg-popover/70 tw:before:-z-1 tw:**:data-[slot$=-item]:focus:bg-foreground/10 tw:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 tw:**:data-[slot$=-separator]:bg-foreground/5 tw:**:data-[slot$=-trigger]:focus:bg-foreground/10 tw:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! tw:**:data-[variant=destructive]:focus:bg-foreground/10! tw:**:data-[variant=destructive]:text-accent-foreground! tw:**:data-[variant=destructive]:**:text-accent-foreground! tw:relative tw:before:pointer-events-none tw:before:absolute tw:before:inset-0 tw:before:rounded-[inherit] tw:before:backdrop-blur-2xl tw:before:backdrop-saturate-150",
        r === "popper" && "tw:data-[side=bottom]:translate-y-1 tw:data-[side=left]:-translate-x-1 tw:rtl:data-[side=left]:translate-x-1 tw:data-[side=right]:translate-x-1 tw:rtl:data-[side=right]:-translate-x-1 tw:data-[side=top]:-translate-y-1",
        t
      ),
      style: { zIndex: Fe, ...n },
      position: r,
      align: o,
      ...s,
      children: [
        /* @__PURE__ */ a(ou, {}),
        /* @__PURE__ */ a(
          ae.Viewport,
          {
            "data-position": r,
            className: b(
              "tw:data-[position=popper]:h-(--radix-select-trigger-height) tw:data-[position=popper]:w-full tw:data-[position=popper]:min-w-(--radix-select-trigger-width)",
              r === "popper" && "tw:"
            ),
            children: /* @__PURE__ */ a("div", { dir: i, children: e })
          }
        ),
        /* @__PURE__ */ a(nu, {})
      ]
    }
  ) });
}
function Ch({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    ae.Label,
    {
      "data-slot": "select-label",
      className: b("pr-twp tw:px-1.5 tw:py-1 tw:text-xs tw:text-muted-foreground", t),
      ...e
    }
  );
}
function xe({
  className: t,
  children: e,
  ...r
}) {
  return /* @__PURE__ */ u(
    ae.Item,
    {
      "data-slot": "select-item",
      className: b(
        "pr-twp tw:relative tw:flex tw:w-full tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:*:[span]:last:flex tw:*:[span]:last:items-center tw:*:[span]:last:gap-2",
        t
      ),
      ...r,
      children: [
        /* @__PURE__ */ a("span", { className: "tw:pointer-events-none tw:absolute tw:end-2 tw:flex tw:size-4 tw:items-center tw:justify-center", children: /* @__PURE__ */ a(ae.ItemIndicator, { children: /* @__PURE__ */ a(Aa, { className: "tw:pointer-events-none" }) }) }),
        /* @__PURE__ */ a(ae.ItemText, { children: e })
      ]
    }
  );
}
function Eh({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    ae.Separator,
    {
      "data-slot": "select-separator",
      className: b(
        "pr-twp tw:pointer-events-none tw:-mx-1 tw:my-1 tw:h-px tw:bg-border",
        t
      ),
      ...e
    }
  );
}
function ou({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    ae.ScrollUpButton,
    {
      "data-slot": "select-scroll-up-button",
      className: b(
        "pr-twp tw:z-10 tw:flex tw:cursor-default tw:items-center tw:justify-center tw:bg-popover tw:py-1 tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      ...e,
      children: /* @__PURE__ */ a(jc, {})
    }
  );
}
function nu({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    ae.ScrollDownButton,
    {
      "data-slot": "select-scroll-down-button",
      className: b(
        "pr-twp tw:z-10 tw:flex tw:cursor-default tw:items-center tw:justify-center tw:bg-popover tw:py-1 tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      ...e,
      children: /* @__PURE__ */ a(Bc, {})
    }
  );
}
function iu({ table: t }) {
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
        Er,
        {
          value: `${t.getState().pagination.pageSize}`,
          onValueChange: (e) => {
            t.setPageSize(Number(e));
          },
          children: [
            /* @__PURE__ */ a(Sr, { className: "tw:h-8 tw:w-[70px]", children: /* @__PURE__ */ a(Tr, { placeholder: t.getState().pagination.pageSize }) }),
            /* @__PURE__ */ a(Rr, { side: "top", children: [10, 20, 30, 40, 50].map((e) => /* @__PURE__ */ a(xe, { value: `${e}`, children: e }, e)) })
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
        et,
        {
          variant: "outline",
          size: "icon",
          className: "tw:hidden tw:h-8 tw:w-8 tw:p-0 tw:lg:flex",
          onClick: () => t.setPageIndex(0),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ a("span", { className: "tw:sr-only", children: "Go to first page" }),
            /* @__PURE__ */ a(rc, { className: "tw:h-4 tw:w-4" })
          ]
        }
      ),
      /* @__PURE__ */ u(
        et,
        {
          variant: "outline",
          size: "icon",
          className: "tw:h-8 tw:w-8 tw:p-0",
          onClick: () => t.previousPage(),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ a("span", { className: "tw:sr-only", children: "Go to previous page" }),
            /* @__PURE__ */ a(ac, { className: "tw:h-4 tw:w-4" })
          ]
        }
      ),
      /* @__PURE__ */ u(
        et,
        {
          variant: "outline",
          size: "icon",
          className: "tw:h-8 tw:w-8 tw:p-0",
          onClick: () => t.nextPage(),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ a("span", { className: "tw:sr-only", children: "Go to next page" }),
            /* @__PURE__ */ a(oc, { className: "tw:h-4 tw:w-4" })
          ]
        }
      ),
      /* @__PURE__ */ u(
        et,
        {
          variant: "outline",
          size: "icon",
          className: "tw:hidden tw:h-8 tw:w-8 tw:p-0 tw:lg:flex",
          onClick: () => t.setPageIndex(t.getPageCount() - 1),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ a("span", { className: "tw:sr-only", children: "Go to last page" }),
            /* @__PURE__ */ a(nc, { className: "tw:h-4 tw:w-4" })
          ]
        }
      )
    ] })
  ] }) });
}
function su({
  columns: t,
  data: e,
  enablePagination: r = !1,
  showPaginationControls: o = !1,
  showColumnVisibilityControls: n = !1,
  stickyHeader: s = !1,
  onRowClickHandler: i = () => {
  },
  id: c,
  isLoading: d = !1,
  noResultsMessage: l
}) {
  var B;
  const [w, p] = _([]), [h, f] = _([]), [m, x] = _({}), [g, T] = _({}), y = P(() => e ?? [], [e]), C = Ci({
    data: y,
    columns: t,
    getCoreRowModel: Ti(),
    ...r && { getPaginationRowModel: Hl() },
    onSortingChange: p,
    getSortedRowModel: Ei(),
    onColumnFiltersChange: f,
    getFilteredRowModel: Kl(),
    onColumnVisibilityChange: x,
    onRowSelectionChange: T,
    state: {
      sorting: w,
      columnFilters: h,
      columnVisibility: m,
      rowSelection: g
    }
  }), N = C.getVisibleFlatColumns();
  let A;
  return d ? A = Array.from({ length: 10 }).map((S, D) => `skeleton-row-${D}`).map((S) => /* @__PURE__ */ a(We, { className: "tw:hover:bg-transparent", children: /* @__PURE__ */ a(kr, { colSpan: N.length ?? t.length, className: "tw:border-0 tw:p-0", children: /* @__PURE__ */ a("div", { className: "tw:w-full tw:py-2", children: /* @__PURE__ */ a(yr, { className: "tw:h-14 tw:w-full tw:rounded-md" }) }) }) }, S)) : ((B = C.getRowModel().rows) == null ? void 0 : B.length) > 0 ? A = C.getRowModel().rows.map((U) => /* @__PURE__ */ a(
    We,
    {
      onClick: () => i(U, C),
      "data-state": U.getIsSelected() && "selected",
      children: U.getVisibleCells().map((O) => /* @__PURE__ */ a(kr, { children: Lr(O.column.columnDef.cell, O.getContext()) }, O.id))
    },
    U.id
  )) : A = /* @__PURE__ */ a(We, { children: /* @__PURE__ */ a(kr, { colSpan: t.length, className: "tw:h-24 tw:text-center", children: l }) }), /* @__PURE__ */ u("div", { className: "pr-twp", id: c, children: [
    n && /* @__PURE__ */ a(ru, { table: C }),
    /* @__PURE__ */ u(Mo, { stickyHeader: s, children: [
      /* @__PURE__ */ a(Oo, { stickyHeader: s, children: C.getHeaderGroups().map((U) => /* @__PURE__ */ a(We, { children: U.headers.map((O) => /* @__PURE__ */ a(ka, { className: "tw:p-0", children: O.isPlaceholder ? void 0 : Lr(O.column.columnDef.header, O.getContext()) }, O.id)) }, U.id)) }),
      /* @__PURE__ */ a(Io, { children: A })
    ] }),
    r && /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:justify-end tw:space-x-2 tw:py-4", children: [
      /* @__PURE__ */ a(
        et,
        {
          variant: "outline",
          size: "sm",
          onClick: () => C.previousPage(),
          disabled: !C.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ a(
        et,
        {
          variant: "outline",
          size: "sm",
          onClick: () => C.nextPage(),
          disabled: !C.getCanNextPage(),
          children: "Next"
        }
      )
    ] }),
    r && o && /* @__PURE__ */ a(iu, { table: C })
  ] });
}
function Th({
  id: t,
  markdown: e,
  className: r,
  anchorTarget: o,
  truncate: n
}) {
  const s = P(
    () => ({
      overrides: {
        a: {
          props: {
            target: o,
            // Harden links opened in a new tab against reverse-tabnabbing (the opened page can
            // otherwise reach back through window.opener).
            rel: o === "_blank" ? "noopener noreferrer" : void 0
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
      className: b(
        "pr-twp tw:prose",
        {
          "tw:line-clamp-3 tw:max-h-10 tw:overflow-hidden tw:text-ellipsis tw:break-words": n
        },
        r
      ),
      children: /* @__PURE__ */ a(Wl, { options: s, children: e })
    }
  );
}
const cu = Object.freeze([
  "%webView_error_dump_header%",
  "%webView_error_dump_info_message%"
]), $n = (t, e) => t[e] ?? e;
function lu({
  errorDetails: t,
  handleCopyNotify: e,
  localizedStrings: r,
  id: o
}) {
  const n = $n(r, "%webView_error_dump_header%"), s = $n(r, "%webView_error_dump_info_message%");
  function i() {
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
            /* @__PURE__ */ a("div", { className: "tw:justify-center tw:self-stretch tw:text-sm tw:font-normal tw:leading-tight tw:text-muted-foreground", children: s })
          ] }),
          /* @__PURE__ */ a(et, { variant: "secondary", size: "icon", className: "size-8", onClick: () => i(), children: /* @__PURE__ */ a(oi, {}) })
        ] }),
        /* @__PURE__ */ a("div", { className: "tw:prose tw:w-full", children: /* @__PURE__ */ a("pre", { className: "tw:text-xs", children: t }) })
      ]
    }
  );
}
const Sh = Object.freeze([
  ...cu,
  "%webView_error_dump_copied_message%"
]);
function Rh({
  errorDetails: t,
  handleCopyNotify: e,
  localizedStrings: r,
  children: o,
  className: n,
  id: s
}) {
  const [i, c] = _(!1), d = () => {
    c(!0), e && e();
  };
  return /* @__PURE__ */ u(lr, { onOpenChange: (w) => {
    w || c(!1);
  }, children: [
    /* @__PURE__ */ a(Dr, { asChild: !0, children: o }),
    /* @__PURE__ */ u(dr, { id: s, className: b("tw:min-w-80 tw:max-w-96", n), children: [
      i && r["%webView_error_dump_copied_message%"] && /* @__PURE__ */ a($t, { children: r["%webView_error_dump_copied_message%"] }),
      /* @__PURE__ */ a(
        lu,
        {
          errorDetails: t,
          handleCopyNotify: d,
          localizedStrings: r
        }
      )
    ] })
  ] });
}
var du = /* @__PURE__ */ ((t) => (t[t.Check = 0] = "Check", t[t.Radio = 1] = "Radio", t))(du || {});
function Dh({ id: t, label: e, groups: r }) {
  const [o, n] = _(
    Object.fromEntries(
      r.map(
        (l, w) => l.itemType === 0 ? [w, []] : void 0
      ).filter((l) => !!l)
    )
  ), [s, i] = _({}), c = (l, w) => {
    const p = !o[l][w];
    n((f) => (f[l][w] = p, { ...f }));
    const h = r[l].items[w];
    h.onUpdate(h.id, p);
  }, d = (l, w) => {
    i((h) => (h[l] = w, { ...h }));
    const p = r[l].items.find((h) => h.id === w);
    p ? p.onUpdate(w) : console.error(`Could not find dropdown radio item with id '${w}'!`);
  };
  return /* @__PURE__ */ a("div", { id: t, children: /* @__PURE__ */ u(Be, { children: [
    /* @__PURE__ */ a(Ee, { asChild: !0, children: /* @__PURE__ */ u(et, { variant: "default", children: [
      /* @__PURE__ */ a(ic, { size: 16, className: "tw:mr-2 tw:h-4 tw:w-4" }),
      e,
      /* @__PURE__ */ a(sr, { size: 16, className: "tw:ml-2 tw:h-4 tw:w-4" })
    ] }) }),
    /* @__PURE__ */ a(je, { children: r.map((l, w) => /* @__PURE__ */ u("div", { children: [
      /* @__PURE__ */ a(cr, { children: l.label }),
      /* @__PURE__ */ a(Wn, { children: l.itemType === 0 ? /* @__PURE__ */ a(gt, { children: l.items.map((p, h) => /* @__PURE__ */ a("div", { children: /* @__PURE__ */ a(
        Xe,
        {
          checked: o[w][h],
          onCheckedChange: () => c(w, h),
          children: p.label
        }
      ) }, p.id)) }) : /* @__PURE__ */ a(
        Ss,
        {
          value: s[w],
          onValueChange: (p) => d(w, p),
          children: l.items.map((p) => /* @__PURE__ */ a("div", { children: /* @__PURE__ */ a(Rs, { value: p.id, children: p.label }) }, p.id))
        }
      ) }),
      /* @__PURE__ */ a(ir, {})
    ] }, l.label)) })
  ] }) });
}
function Mh({
  id: t,
  category: e,
  downloads: r,
  languages: o,
  moreInfoUrl: n,
  handleMoreInfoLinkClick: s,
  supportUrl: i,
  handleSupportLinkClick: c
}) {
  const d = new ci("en", {
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
            /* @__PURE__ */ a(sc, { className: "tw:h-4 tw:w-4" }),
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
        (n || i) && /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:gap-1 tw:px-4", children: [
          n && /* @__PURE__ */ a("div", { className: "tw:flex tw:gap-1", children: /* @__PURE__ */ u(
            et,
            {
              onClick: () => s(),
              variant: "link",
              className: "tw:flex tw:h-auto tw:gap-1 tw:py-0 tw:text-xs tw:font-semibold tw:text-foreground",
              children: [
                "Website",
                /* @__PURE__ */ a(cc, { className: "tw:h-4 tw:w-4" })
              ]
            }
          ) }),
          i && /* @__PURE__ */ a("div", { className: "tw:flex tw:gap-1", children: /* @__PURE__ */ u(
            et,
            {
              onClick: () => c(),
              variant: "link",
              className: "tw:flex tw:h-auto tw:gap-1 tw:py-0 tw:text-xs tw:font-semibold tw:text-foreground",
              children: [
                "Support",
                /* @__PURE__ */ a(lc, { className: "tw:h-4 tw:w-4" })
              ]
            }
          ) })
        ] })
      ]
    }
  );
}
function wu({ id: t, versionHistory: e }) {
  const [r, o] = _(!1), n = /* @__PURE__ */ new Date();
  function s(c) {
    const d = new Date(c), l = new Date(n.getTime() - d.getTime()), w = l.getUTCFullYear() - 1970, p = l.getUTCMonth(), h = l.getUTCDate() - 1;
    let f = "";
    return w > 0 ? f = `${w.toString()} year${w === 1 ? "" : "s"} ago` : p > 0 ? f = `${p.toString()} month${p === 1 ? "" : "s"} ago` : h === 0 ? f = "today" : f = `${h.toString()} day${h === 1 ? "" : "s"} ago`, f;
  }
  const i = Object.entries(e).sort((c, d) => d[0].localeCompare(c[0]));
  return /* @__PURE__ */ u("div", { className: "pr-twp", id: t, children: [
    /* @__PURE__ */ a("h3", { className: "tw:text-md tw:font-semibold", children: "What`s New" }),
    /* @__PURE__ */ a("ul", { className: "tw:list-disc tw:pl-5 tw:pr-4 tw:text-xs tw:text-foreground", children: (r ? i : i.slice(0, 5)).map((c) => /* @__PURE__ */ u("div", { className: "tw:mt-3 tw:flex tw:justify-between", children: [
      /* @__PURE__ */ a("div", { className: "tw:text-foreground", children: /* @__PURE__ */ a("li", { className: "tw:prose tw:text-xs", children: /* @__PURE__ */ a("span", { children: c[1].description }) }) }),
      /* @__PURE__ */ u("div", { className: "tw:justify-end tw:text-right", children: [
        /* @__PURE__ */ u("div", { children: [
          "Version ",
          c[0]
        ] }),
        /* @__PURE__ */ a("div", { children: s(c[1].date) })
      ] })
    ] }, c[0])) }),
    i.length > 5 && /* @__PURE__ */ a(
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
function Oh({
  id: t,
  publisherDisplayName: e,
  fileSize: r,
  locales: o,
  versionHistory: n,
  currentVersion: s
}) {
  const i = P(() => Sc(r), [r]), d = ((l) => {
    const w = new Intl.DisplayNames(Rc(), { type: "language" });
    return l.map((p) => w.of(p));
  })(o);
  return /* @__PURE__ */ a("div", { id: t, className: "pr-twp tw:border-t tw:py-2", children: /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:gap-2 tw:divide-y", children: [
    Object.entries(n).length > 0 && /* @__PURE__ */ a(wu, { versionHistory: n }),
    /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:gap-2 tw:py-2", children: [
      /* @__PURE__ */ a("h2", { className: "tw:text-md tw:font-semibold", children: "Information" }),
      /* @__PURE__ */ u("div", { className: "tw:flex tw:items-start tw:justify-between tw:text-xs tw:text-foreground", children: [
        /* @__PURE__ */ u("p", { className: "tw:flex tw:flex-col tw:justify-start tw:gap-1", children: [
          /* @__PURE__ */ a("span", { children: "Publisher" }),
          /* @__PURE__ */ a("span", { className: "tw:font-semibold", children: e }),
          /* @__PURE__ */ a("span", { children: "Size" }),
          /* @__PURE__ */ a("span", { className: "tw:font-semibold", children: i })
        ] }),
        /* @__PURE__ */ a("div", { className: "tw:flex tw:w-3/4 tw:items-center tw:justify-between tw:text-xs tw:text-foreground", children: /* @__PURE__ */ u("p", { className: "tw:flex tw:flex-col tw:justify-start tw:gap-1", children: [
          /* @__PURE__ */ a("span", { children: "Version" }),
          /* @__PURE__ */ a("span", { className: "tw:font-semibold", children: s }),
          /* @__PURE__ */ a("span", { children: "Languages" }),
          /* @__PURE__ */ a("span", { className: "tw:font-semibold", children: d.join(", ") })
        ] }) })
      ] })
    ] })
  ] }) });
}
function Ih({
  entries: t,
  selected: e,
  onChange: r,
  placeholder: o,
  commandEmptyMessage: n,
  customSelectedText: s,
  isDisabled: i,
  sortSelected: c,
  icon: d,
  className: l,
  badgesPlaceholder: w,
  id: p
}) {
  return /* @__PURE__ */ u("div", { id: p, className: "tw:flex tw:items-center tw:gap-2", children: [
    /* @__PURE__ */ a(
      Ds,
      {
        entries: t,
        selected: e,
        onChange: r,
        placeholder: o,
        commandEmptyMessage: n,
        customSelectedText: s,
        isDisabled: i,
        sortSelected: c,
        icon: d,
        className: l
      }
    ),
    e.length > 0 ? /* @__PURE__ */ a("div", { className: "tw:flex tw:flex-wrap tw:items-center tw:gap-2", children: e.map((h) => {
      var f;
      return /* @__PURE__ */ u(Fr, { variant: "muted", className: "tw:flex tw:items-center tw:gap-1", children: [
        /* @__PURE__ */ a(
          et,
          {
            variant: "ghost",
            size: "icon",
            className: "tw:h-4 tw:w-4 tw:p-0 tw:hover:bg-transparent",
            onClick: () => r(e.filter((m) => m !== h)),
            children: /* @__PURE__ */ a(ei, { className: "tw:h-3 tw:w-3" })
          }
        ),
        (f = t.find((m) => m.value === h)) == null ? void 0 : f.label
      ] }, h);
    }) }) : /* @__PURE__ */ a($t, { children: w })
  ] });
}
const uu = Object.freeze([
  "%undoButton_tooltip%",
  "%redoButton_tooltip%"
]), Vn = (t, e) => t[e] ?? e;
function pu({
  onUndoClick: t,
  onRedoClick: e,
  canUndo: r = !0,
  canRedo: o = !0,
  localizedStrings: n = {},
  showKeyboardShortcuts: s = !0,
  className: i = "tw:h-6 tw:w-6",
  variant: c = "ghost"
}) {
  const d = Do(), l = Vn(n, "%undoButton_tooltip%"), w = Vn(n, "%redoButton_tooltip%");
  return /* @__PURE__ */ u(Oa, { children: [
    /* @__PURE__ */ a(Vt, { children: /* @__PURE__ */ u(bt, { children: [
      /* @__PURE__ */ a(xt, { asChild: !0, children: /* @__PURE__ */ a(
        et,
        {
          "aria-label": l,
          className: i,
          size: "icon",
          onClick: t,
          disabled: !r,
          variant: c,
          children: /* @__PURE__ */ a(dc, {})
        }
      ) }),
      /* @__PURE__ */ a(yt, { children: /* @__PURE__ */ u("p", { children: [
        l,
        s && /* @__PURE__ */ u(gt, { children: [
          " ",
          /* @__PURE__ */ a(uo, { children: d ? "⌘Z" : "Ctrl+Z" })
        ] })
      ] }) })
    ] }) }),
    e && (c === "secondary" || c === "default") && /* @__PURE__ */ a(So, {}),
    e && /* @__PURE__ */ a(Vt, { children: /* @__PURE__ */ u(bt, { children: [
      /* @__PURE__ */ a(xt, { asChild: !0, children: /* @__PURE__ */ a(
        et,
        {
          "aria-label": w,
          className: i,
          size: "icon",
          onClick: e,
          disabled: !o,
          variant: c,
          children: /* @__PURE__ */ a(wc, {})
        }
      ) }),
      /* @__PURE__ */ a(yt, { children: /* @__PURE__ */ u("p", { children: [
        w,
        s && /* @__PURE__ */ u(gt, { children: [
          " ",
          /* @__PURE__ */ a(uo, { children: d ? "⌘⇧Z" : "Ctrl+Y" })
        ] })
      ] }) })
    ] }) })
  ] });
}
function hu({
  children: t,
  editorRef: e,
  canUndo: r = !0,
  canRedo: o = !0
}) {
  const n = L(null);
  return Z(() => {
    var d;
    const s = Do(), i = ((d = n.current) == null ? void 0 : d.querySelector(".editor-input")) ?? void 0, c = (l) => {
      var p, h, f, m;
      if (!i || document.activeElement !== i) return;
      const w = l.key.toLowerCase();
      if (s) {
        if (!l.metaKey) return;
        !l.shiftKey && w === "z" ? (l.preventDefault(), r && ((p = e.current) == null || p.undo())) : l.shiftKey && w === "z" && (l.preventDefault(), o && ((h = e.current) == null || h.redo()));
      } else {
        if (!l.ctrlKey) return;
        !l.shiftKey && w === "z" ? (l.preventDefault(), r && ((f = e.current) == null || f.undo())) : (w === "y" || l.shiftKey && w === "z") && (l.preventDefault(), o && ((m = e.current) == null || m.redo()));
      }
    };
    return document.addEventListener("keydown", c), () => document.removeEventListener("keydown", c);
  }, [o, r, e]), /* @__PURE__ */ a("div", { ref: n, children: t });
}
const gu = (t, e, r) => t === "generated" ? /* @__PURE__ */ u(gt, { children: [
  /* @__PURE__ */ a("p", { children: "+" }),
  " ",
  e["%footnoteEditor_callerDropdown_item_generated%"]
] }) : t === "hidden" ? /* @__PURE__ */ u(gt, { children: [
  /* @__PURE__ */ a("p", { children: "-" }),
  " ",
  e["%footnoteEditor_callerDropdown_item_hidden%"]
] }) : /* @__PURE__ */ u(gt, { children: [
  /* @__PURE__ */ a("p", { children: r }),
  " ",
  e["%footnoteEditor_callerDropdown_item_custom%"]
] });
function fu({
  callerType: t,
  customCaller: e,
  updateCaller: r,
  localizedStrings: o
}) {
  const n = L(null), s = L(null), i = L(!1), [c, d] = _(t), [l, w] = _(e), [p, h] = _(!1), f = L(!1), m = L(c);
  m.current = c;
  const x = L(l);
  x.current = l, Z(() => {
    d(t);
  }, [t]), Z(() => {
    l !== e && w(e);
  }, [e]);
  const g = (y) => {
    if (i.current = !1, h(y), !y) {
      const C = m.current, N = x.current;
      C !== "custom" || N ? (C !== t || N !== e) && r(C, N) : (d(t), w(e));
    }
  }, T = (y) => {
    var C, N, A, B;
    y.stopPropagation(), document.activeElement === s.current && y.key === "ArrowDown" || y.key === "ArrowRight" ? ((C = n.current) == null || C.focus(), i.current = !0) : document.activeElement === n.current && y.key === "ArrowUp" ? ((N = s.current) == null || N.focus(), i.current = !1) : document.activeElement === n.current && y.key === "ArrowLeft" && ((A = n.current) == null ? void 0 : A.selectionStart) === 0 && ((B = s.current) == null || B.focus(), i.current = !1), c === "custom" && y.key === "Enter" && (document.activeElement === s.current || document.activeElement === n.current) && g(!1);
  };
  return /* @__PURE__ */ u(Be, { open: p, onOpenChange: g, children: [
    /* @__PURE__ */ a(Vt, { children: /* @__PURE__ */ u(bt, { children: [
      /* @__PURE__ */ a(xt, { asChild: !0, children: /* @__PURE__ */ a(Ee, { asChild: !0, children: /* @__PURE__ */ a(et, { variant: "outline", className: "tw:h-6", children: gu(t, o, e) }) }) }),
      /* @__PURE__ */ a(yt, { children: o["%footnoteEditor_callerDropdown_tooltip%"] })
    ] }) }),
    /* @__PURE__ */ u(
      je,
      {
        style: { zIndex: Yn },
        onClick: () => {
          i.current && (i.current = !1);
        },
        onKeyDown: T,
        onMouseMove: () => {
          var y;
          i.current && ((y = n.current) == null || y.focus());
        },
        children: [
          /* @__PURE__ */ a(cr, { children: o["%footnoteEditor_callerDropdown_label%"] }),
          /* @__PURE__ */ a(ir, {}),
          /* @__PURE__ */ a(
            Xe,
            {
              checked: c === "generated",
              onCheckedChange: () => d("generated"),
              children: /* @__PURE__ */ u("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ a("span", { children: o["%footnoteEditor_callerDropdown_item_generated%"] }),
                /* @__PURE__ */ a("span", { className: "tw:w-10 tw:text-center", children: fo })
              ] })
            }
          ),
          /* @__PURE__ */ a(
            Xe,
            {
              checked: c === "hidden",
              onCheckedChange: () => d("hidden"),
              children: /* @__PURE__ */ u("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ a("span", { children: o["%footnoteEditor_callerDropdown_item_hidden%"] }),
                /* @__PURE__ */ a("span", { className: "tw:w-10 tw:text-center", children: mo })
              ] })
            }
          ),
          /* @__PURE__ */ a(
            Xe,
            {
              ref: s,
              checked: c === "custom",
              onCheckedChange: () => d("custom"),
              onPointerDown: () => {
                f.current = c === "custom";
              },
              onClick: (y) => {
                var C;
                if (y.stopPropagation(), f.current && y.target !== n.current) {
                  g(!1);
                  return;
                }
                i.current = !0, (C = n.current) == null || C.focus();
              },
              onSelect: (y) => y.preventDefault(),
              children: /* @__PURE__ */ u("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ a("span", { children: o["%footnoteEditor_callerDropdown_item_custom%"] }),
                /* @__PURE__ */ a(
                  za,
                  {
                    tabIndex: 0,
                    onMouseDown: (y) => {
                      y.stopPropagation(), d("custom"), i.current = !0;
                    },
                    ref: n,
                    className: "tw:h-auto tw:w-10 tw:p-0 tw:text-center",
                    value: l,
                    onKeyDown: (y) => {
                      y.key === "Enter" || y.key === "ArrowUp" || y.key === "ArrowDown" || y.key === "ArrowLeft" || y.key === "ArrowRight" || y.stopPropagation();
                    },
                    maxLength: 1,
                    onChange: (y) => w(y.target.value)
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
const mu = (t, e) => t === "f" ? /* @__PURE__ */ u(gt, { children: [
  /* @__PURE__ */ a(ii, {}),
  " ",
  e["%footnoteEditor_noteType_footnote_label%"]
] }) : t === "fe" ? /* @__PURE__ */ u(gt, { children: [
  /* @__PURE__ */ a(si, {}),
  " ",
  e["%footnoteEditor_noteType_endNote_label%"]
] }) : /* @__PURE__ */ u(gt, { children: [
  /* @__PURE__ */ a(ni, {}),
  " ",
  e["%footnoteEditor_noteType_crossReference_label%"]
] }), vu = (t, e) => {
  if (t === "x")
    return e["%footnoteEditor_noteType_crossReference_label%"];
  let r = e["%footnoteEditor_noteType_endNote_label%"];
  return t === "f" && (r = e["%footnoteEditor_noteType_footnote_label%"]), Ye(e["%footnoteEditor_noteType_tooltip%"] ?? "", {
    noteType: r
  });
};
function bu({
  noteType: t,
  handleNoteTypeChange: e,
  localizedStrings: r,
  isTypeSwitchable: o
}) {
  return /* @__PURE__ */ u(Be, { children: [
    /* @__PURE__ */ a(Vt, { children: /* @__PURE__ */ u(bt, { children: [
      /* @__PURE__ */ a(xt, { asChild: !0, children: /* @__PURE__ */ a(Ee, { asChild: !0, children: /* @__PURE__ */ a(et, { variant: "outline", className: "tw:h-6", children: mu(t, r) }) }) }),
      /* @__PURE__ */ a(yt, { children: /* @__PURE__ */ a("p", { children: vu(t, r) }) })
    ] }) }),
    /* @__PURE__ */ u(je, { style: { zIndex: Yn }, children: [
      /* @__PURE__ */ a(cr, { children: r["%footnoteEditor_noteTypeDropdown_label%"] }),
      /* @__PURE__ */ a(ir, {}),
      /* @__PURE__ */ u(
        Xe,
        {
          disabled: t !== "x" && !o,
          checked: t === "x",
          onCheckedChange: () => e("x"),
          className: "tw:gap-2",
          children: [
            /* @__PURE__ */ a(ni, {}),
            /* @__PURE__ */ a("span", { children: r["%footnoteEditor_noteType_crossReference_label%"] })
          ]
        }
      ),
      /* @__PURE__ */ u(
        Xe,
        {
          disabled: t === "x" && !o,
          checked: t === "f",
          onCheckedChange: () => e("f"),
          className: "tw:gap-2",
          children: [
            /* @__PURE__ */ a(ii, {}),
            /* @__PURE__ */ a("span", { children: r["%footnoteEditor_noteType_footnote_label%"] })
          ]
        }
      ),
      /* @__PURE__ */ u(
        Xe,
        {
          disabled: t === "x" && !o,
          checked: t === "fe",
          onCheckedChange: () => e("fe"),
          className: "tw:gap-2",
          children: [
            /* @__PURE__ */ a(si, {}),
            /* @__PURE__ */ a("span", { children: r["%footnoteEditor_noteType_endNote_label%"] })
          ]
        }
      )
    ] })
  ] });
}
const xu = Object.freeze([
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
function yu({ icon: t, className: e }) {
  return /* @__PURE__ */ a(t ?? uc, { className: e, size: 16 });
}
function ku({ state: t }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "marker-selection-state",
      className: "tw:flex tw:w-4 tw:min-w-4 tw:items-center tw:justify-center",
      children: t !== "none" && /* @__PURE__ */ a(Ze, { size: 16 })
    }
  );
}
function Ln({
  item: t,
  localizedStrings: e
}) {
  return /* @__PURE__ */ u(
    tr,
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
        t.selectionState !== void 0 && /* @__PURE__ */ a(ku, { state: t.selectionState }),
        /* @__PURE__ */ a("div", { className: "tw:w-8 tw:min-w-8", children: t.marker ? (
          // Monospace: a USFM marker is a code, not prose, and should read as one. Deliberately
          // inherits the row's own foreground rather than taking a marker-specific colour.
          /* @__PURE__ */ a("span", { className: "tw:font-mono tw:text-xs", children: t.marker })
        ) : /* @__PURE__ */ a("div", { children: /* @__PURE__ */ a(yu, { icon: t.icon }) }) }),
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
        (t.isDisallowed || t.isDeprecated) && /* @__PURE__ */ a(Os, { className: "tw:font-sans", children: t.isDisallowed ? e["%markerMenu_disallowed_label%"] : e["%markerMenu_deprecated_label%"] })
      ]
    }
  );
}
function _u({
  localizedStrings: t,
  markerMenuItems: e,
  searchRef: r,
  searchPlaceholder: o
}) {
  const [n, s] = _(""), [i, c] = P(() => {
    const d = Ms(n.trim().toLowerCase());
    if (!d) {
      const p = e.filter((h) => !h.isDisallowed);
      return [p.length > 0 ? p : e, []];
    }
    const l = e.filter((p) => {
      var f;
      const h = (f = p.marker) == null ? void 0 : f.toLowerCase();
      return p.isDisallowed ? h === d : h == null ? void 0 : h.includes(d);
    }), w = e.filter(
      (p) => p.title.toLowerCase().includes(d) && !l.includes(p)
    );
    return [l, w];
  }, [n, e]);
  return /* @__PURE__ */ u(wr, { className: "tw:p-1", shouldFilter: !1, loop: !0, children: [
    /* @__PURE__ */ a(
      Ma,
      {
        className: "marker-menu-search",
        ref: r,
        value: n,
        onValueChange: (d) => s(d),
        placeholder: o ?? t["%markerMenu_searchPlaceholder%"],
        spaceSelectsHighlightedItem: !0
      }
    ),
    /* @__PURE__ */ u(ur, { children: [
      /* @__PURE__ */ a(Ia, { children: t["%markerMenu_noResults%"] }),
      /* @__PURE__ */ a(Je, { children: i.map((d) => {
        var l;
        return /* @__PURE__ */ a(
          Ln,
          {
            item: d,
            localizedStrings: t
          },
          `item-${d.marker ?? ((l = d.icon) == null ? void 0 : l.displayName)}-${d.title.replaceAll(" ", "")}`
        );
      }) }),
      c.length > 0 && /* @__PURE__ */ u(gt, { children: [
        i.length > 0 && /* @__PURE__ */ a(Xn, { alwaysRender: !0 }),
        /* @__PURE__ */ a(Je, { children: c.map((d) => {
          var l;
          return /* @__PURE__ */ a(
            Ln,
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
function Nu(t, e, r, o) {
  if (!o || o === "p") return [];
  const n = pa[o];
  if (!(n != null && n.children)) return [];
  const s = [];
  return Object.entries(n.children).forEach(([, i]) => {
    s.push(
      ...i.map((c) => ({
        marker: c,
        title: r[pa[c].description] ?? pa[c].description,
        action: () => {
          var d;
          (d = t.current) == null || d.insertMarker(c), e();
        }
      }))
    );
  }), s.sort((i, c) => (i.marker ?? i.title).localeCompare(c.marker ?? c.title));
}
function Cu(t) {
  return {
    id: t.marker,
    label: t.marker,
    description: t.description,
    badge: t.kind === "closeTag" ? "%markerMenu_endTag_label%" : void 0,
    muted: !t.isBasic
  };
}
function Eu(t) {
  var r;
  const e = (r = t.attributes) == null ? void 0 : r.char;
  e != null && e.style && (e.style === "ft" && (e.style = "xt"), e.style === "fr" && (e.style = "xo"), e.style === "fq" && (e.style = "xq"));
}
function Tu(t) {
  var r;
  const e = (r = t.attributes) == null ? void 0 : r.char;
  e != null && e.style && (e.style === "xt" && (e.style = "ft"), e.style === "xo" && (e.style = "fr"), e.style === "xq" && (e.style = "fq"));
}
const Su = {
  type: "USJ",
  version: "3.1",
  content: [
    {
      type: "para"
    }
  ]
};
function zh({
  classNameForEditor: t,
  noteOps: e,
  onChange: r,
  onClose: o,
  scrRef: n,
  noteKey: s,
  editorOptions: i,
  defaultMarkerMenuTrigger: c,
  localizedStrings: d,
  parentEditorRef: l,
  markerPalette: w,
  onNoteEdit: p
}) {
  var It;
  const h = L(null), f = L(null), m = L(null), x = L(null);
  re(() => {
    if (!x.current) return;
    const { width: R } = x.current.getBoundingClientRect();
    R > 0 && (x.current.style.width = `${R}px`);
  }, []);
  const [g, T] = _("generated"), [y, C] = _("generated"), [N, A] = _("*"), [B, U] = _("*"), [O, S] = _("f"), [D, W] = _(!1), [Y, z] = _(!0), [k, ot] = _(!1), I = L(!1), X = L(""), [G, $] = _(!1), [at, ut] = _(), [dt, tt] = _(), [pt, kt] = _(), [mt, Rt] = _(), jt = L(null), Pt = L(
    void 0
  ), ge = L(0), we = L(void 0), _t = P(
    () => ({
      ...i,
      // Drop any inherited context-menu extras (e.g. the main editor's "Insert footnote" /
      // "Insert cross-reference" / "Insert comment" items). Those items' onSelect closures are
      // bound to the OUTER main-document editorRef, so surfacing them inside this popover would
      // let a right-click here silently mutate the main document. The popover keeps only the
      // built-in Cut/Copy/Paste context-menu items.
      contextMenu: void 0,
      markerMenuTrigger: c,
      hasExternalUI: !0,
      view: {
        ...i.view ?? Yl(),
        noteMode: "expanded",
        // The note's marker and caller are governed by this popover's two dropdowns, so they are
        // not text to type into — the same division Paratext 9 draws. Left editable they read as
        // editable and are not: the edit does not persist, and because the note-scoped rebuild
        // refuses a caller it cannot recognize, anything else typed into that slot goes with it
        // (a `\cat` category run typed after the caller was silently discarded). Atomic here
        // routes that typing to the note's CONTENT, which is where it belongs and where the
        // category folds from.
        isNoteShellEditable: !1,
        // The wrapper paragraph is scaffolding (see PARAGRAPH_USJ above): suppress its `\p`
        // marker prefix so the popover's text starts with the footnote's own first glyph.
        showParaMarkerPrefixes: !1
      }
    }),
    [i, c]
  ), Nt = P(
    () => Nu(
      h,
      () => $(!1),
      d,
      mt
    ),
    [d, mt]
  );
  Z(() => {
    var R;
    G || (R = h.current) == null || R.focus();
  }, [O, G]);
  const Et = V(() => {
    var H, Q, j;
    const R = (H = f.current) == null ? void 0 : H.querySelector(".editor-input"), K = R == null ? void 0 : R.querySelector("span.note"), J = (j = (Q = f.current) == null ? void 0 : Q.ownerDocument.getSelection()) == null ? void 0 : j.anchorNode;
    return !!K && !!J && K.contains(J);
  }, []);
  Z(() => {
    var Q, j;
    let R, K, J;
    I.current = !1, we.current = void 0, z(!0);
    const H = e == null ? void 0 : e.at(0);
    if (H && Ir("note", H)) {
      const nt = (Q = H.insert.note) == null ? void 0 : Q.caller;
      let st = "custom";
      nt === fo ? st = "generated" : nt === mo ? st = "hidden" : nt && (A(nt), U(nt)), T(st), C(st), S(((j = H.insert.note) == null ? void 0 : j.style) ?? "f"), R = setTimeout(() => {
        var it, vt, Ct;
        (it = h.current) == null || it.applyUpdate([H]), (vt = h.current) == null || vt.selectNote(0), (Ct = h.current) == null || Ct.focus(), K = requestAnimationFrame(() => {
          J = setTimeout(() => {
            var Tt, Gt;
            Et() || ((Tt = h.current) == null || Tt.selectNote(0), (Gt = h.current) == null || Gt.focus());
          }, 0);
        });
      }, 0);
    }
    return () => {
      R && clearTimeout(R), K !== void 0 && cancelAnimationFrame(K), J !== void 0 && clearTimeout(J);
    };
  }, [e, s, Et]);
  const oe = V(
    (R = !1) => {
      var J, H, Q;
      p == null || p();
      const K = (H = (J = h.current) == null ? void 0 : J.getNoteOps(0)) == null ? void 0 : H.at(0);
      K && Ir("note", K) && (r == null || r([K]), R && l && s && ((Q = l.current) == null || Q.replaceEmbedUpdate(s, [K])));
    },
    [s, r, p, l]
  ), fe = V(
    (R, K) => {
      var Q, j, nt;
      const J = (j = (Q = h.current) == null ? void 0 : Q.getNoteOps(0)) == null ? void 0 : j.at(0);
      if (!J || !Ir("note", J) || !J.insert.note) return;
      let H;
      R === "custom" ? H = K : R === "generated" ? H = fo : H = mo, J.insert.note.caller !== H && (J.insert.note.caller = H, (nt = h.current) == null || nt.applyUpdate([J, { delete: 1 }]));
    },
    []
  ), Dt = V(() => {
    var R;
    Pt.current || (R = h.current) == null || R.commitPendingMarkerEdits(), oe(!0), o();
  }, [o, oe]), Mt = L(Dt);
  re(() => {
    Mt.current = Dt;
  });
  const ne = L({ book: n.book, chapterNum: n.chapterNum });
  re(() => {
    (ne.current.book !== n.book || ne.current.chapterNum !== n.chapterNum) && (ne.current = { book: n.book, chapterNum: n.chapterNum }, Mt.current());
  }, [n.book, n.chapterNum]);
  const ke = () => {
    var K;
    const R = (K = f.current) == null ? void 0 : K.getElementsByClassName("editor-input")[0];
    R != null && R.textContent && navigator.clipboard.writeText(R.textContent);
  }, me = V(
    (R, K) => {
      p == null || p(), T(R), A(K), fe(R, K);
    },
    [fe, p]
  ), Oe = (R) => {
    var J, H, Q, j, nt;
    S(R);
    const K = (H = (J = h.current) == null ? void 0 : J.getNoteOps(0)) == null ? void 0 : H.at(0);
    if (K && Ir("note", K)) {
      K.insert.note && (K.insert.note.style = R);
      const st = (j = (Q = K.insert.note) == null ? void 0 : Q.contents) == null ? void 0 : j.ops;
      O !== "x" && R === "x" ? st == null || st.forEach((it) => Eu(it)) : O === "x" && R !== "x" && (st == null || st.forEach((it) => Tu(it))), (nt = h.current) == null || nt.applyUpdate([K, { delete: 1 }]);
    }
  }, le = (R) => {
    Rt(R.contextMarker), ot(R.canRedo);
  }, Yt = V(
    (R) => {
      var J, H, Q, j, nt;
      const K = (H = (J = h.current) == null ? void 0 : J.getNoteOps(0)) == null ? void 0 : H.at(0);
      if (K && Ir("note", K)) {
        R.content.length > 1 && setTimeout(() => {
          var vt;
          (vt = h.current) == null || vt.applyUpdate([{ retain: 2 }, { delete: 1 }]);
        }, 0);
        const st = (Q = K.insert.note) == null ? void 0 : Q.style, it = (nt = (j = K.insert.note) == null ? void 0 : j.contents) == null ? void 0 : nt.ops;
        if (st || W(!1), W(
          st === "x" ? !!(it != null && it.every((vt) => {
            var Tt, Gt;
            if (!((Tt = vt.attributes) != null && Tt.char)) return !0;
            const Ct = ((Gt = vt.attributes) == null ? void 0 : Gt.char).style;
            return Ct === "xt" || Ct === "xo" || Ct === "xq";
          })) : !!(it != null && it.every((vt) => {
            var Tt, Gt;
            if (!((Tt = vt.attributes) != null && Tt.char)) return !0;
            const Ct = ((Gt = vt.attributes) == null ? void 0 : Gt.char).style;
            return Ct === "ft" || Ct === "fr" || Ct === "fq";
          }))
        ), !I.current) {
          I.current = !0, X.current = JSON.stringify(K), z(!0);
          return;
        }
        z(JSON.stringify(K) === X.current), oe();
      } else
        W(!1), z(!0);
    },
    [oe]
  ), Xt = V(() => {
    const R = window.getSelection();
    if (m.current && Nt.length && R && R.rangeCount > 0) {
      const K = R.getRangeAt(0).getBoundingClientRect(), J = m.current.getBoundingClientRect();
      ut(K.left - J.left), tt(K.top - J.top), kt(K.height), $(!0);
    }
  }, [Nt, m]), Jt = L(() => {
  }), Ie = V(
    (R, K, J) => {
      const { anchorRect: H } = R;
      if (!w || !H) return;
      const { passive: Q } = J;
      Is({
        items: K,
        passive: Q,
        // No `shouldSpaceCommit`, deliberately: the Space note-marker exception exists for
        // Standard-view BODY text, where a materialized `\f ` literal absorbs the following word
        // as the new footnote's caller. This palette offers note-INTERNAL markers for content
        // already inside a note, so Space keeps its plain typed-literal commit here.
        sessionCounterRef: ge,
        setSession: (j) => {
          Pt.current = j;
        },
        clearSessionIfCurrent: (j) => en(Pt, j),
        // Through the ref so the palette always runs the CURRENT handler — the callback is
        // captured once, at show time, while the session it drives is replaced on every reopen.
        runSessionKey: (j) => Jt.current(j),
        show: (j) => w.show(
          K.map(Cu),
          H,
          Q,
          j
        ),
        restoreSelectionIfLost: () => {
          var j, nt, st;
          if (!((j = h.current) != null && j.getSelection())) {
            const it = we.current;
            it ? (nt = h.current) == null || nt.setSelection(it) : (st = h.current) == null || st.selectNote(0);
          }
        },
        focusEditor: () => {
          var j;
          return (j = h.current) == null ? void 0 : j.focus();
        },
        applyItem: (j) => {
          var nt;
          return (nt = h.current) == null ? void 0 : nt.applyMarkerMenuSelection(j, {
            trigger: "backslash",
            // ACTIVE palette: the trigger was claimed and never landed, so there is never a
            // literal prefix for the apply to clean up.
            literalPrefixLanded: !1
          });
        },
        onShowError: (j) => {
          (!Dc(j) || j.code !== Mc) && console.warn(
            `FootnoteEditor: the marker palette did not open: ${Oc(j)}`
          );
        }
      });
    },
    [w]
  ), M = V(() => {
    var J;
    const R = (J = h.current) == null ? void 0 : J.getMarkerMenuContext();
    if (!R) return !1;
    const K = Xl(_t.styleInfo ?? Jl, R);
    return K.length === 0 ? !1 : (Ie(R, K, { passive: !R.hasTextSelection }), !0);
  }, [Ie, _t.styleInfo]), Ot = V(
    (R) => {
      const K = Pt.current;
      if (!K || !w) return;
      zs(R, K, {
        // Overlay ops delegate to the host-supplied driver; the commit ops are EDITOR-side
        // applies this popover owns (it holds the editor ref). The table calls `dismiss()` right
        // after each, resolving the show promise `undefined` — which the openMarkerPalette
        // `.then` treats as a dismissal, so nothing double-applies.
        update: (H) => w.update(H),
        commit: () => w.commit(),
        dismiss: () => w.dismiss(),
        commitTyped: (H) => {
          var Q;
          return (Q = h.current) == null ? void 0 : Q.commitTypedMarker(H);
        },
        commitTypedAndReopen: (H) => {
          var Q;
          (Q = h.current) == null || Q.commitTypedMarker(H, { trailingSpace: !1 }), M();
        },
        commitTypedCloser: (H) => {
          var Q;
          return (Q = h.current) == null ? void 0 : Q.commitTypedCloser(H);
        },
        commitItem: (H) => {
          var j;
          const Q = K.items.find((nt) => nt.marker === H);
          Q && ((j = h.current) == null || j.applyMarkerMenuSelection(Q, {
            trigger: "backslash",
            literalPrefixLanded: !1
          }));
        }
      }) === "ended" && en(Pt, K.token);
    },
    [w, M]
  );
  Z(() => {
    Jt.current = Ot;
  }, [Ot]), Z(() => {
    const R = (K) => {
      var Q, j;
      const J = (Q = f.current) == null ? void 0 : Q.querySelector(".editor-input");
      if (!J || K.target !== J) return;
      const H = (j = h.current) == null ? void 0 : j.getSelection();
      H && (we.current = H);
    };
    return document.addEventListener("focusout", R), () => document.removeEventListener("focusout", R);
  }, []), Z(() => {
    const R = () => {
      G && $(!1);
    };
    return window.addEventListener("click", R), () => {
      window.removeEventListener("click", R);
    };
  }, [G]), Z(() => {
    var R;
    G && ((R = jt.current) == null || R.focus());
  }, [G]), Z(() => {
    var J;
    const R = () => {
      var H;
      return ((H = f.current) == null ? void 0 : H.querySelector(".editor-input")) ?? void 0;
    };
    if (((J = _t.view) == null ? void 0 : J.markerMode) === "editable") {
      const H = (j) => {
        var it, vt, Ct, Tt;
        if (As(j)) return;
        const nt = R();
        if (!nt || document.activeElement !== nt) return;
        if (Pt.current && w) {
          Jt.current(j);
          return;
        }
        if (j.key === "Enter" && !Et()) {
          j.preventDefault(), j.stopPropagation(), (it = h.current) == null || it.selectNote(0), (vt = h.current) == null || vt.focus();
          return;
        }
        if (w && j.key === c) {
          if (!Et()) {
            j.preventDefault(), j.stopPropagation(), (Ct = h.current) == null || Ct.selectNote(0), (Tt = h.current) == null || Tt.focus();
            return;
          }
          M() && (j.preventDefault(), j.stopPropagation());
        }
      }, Q = () => {
        var nt, st;
        const j = R();
        !j || document.activeElement !== j || Et() || ((nt = h.current) == null || nt.selectNote(0), (st = h.current) == null || st.focus());
      };
      return document.addEventListener("keydown", H, { capture: !0 }), document.addEventListener("paste", Q, { capture: !0 }), () => {
        document.removeEventListener("keydown", H, { capture: !0 }), document.removeEventListener("paste", Q, { capture: !0 });
      };
    }
    const K = (H) => {
      const Q = R();
      !G && Q && document.activeElement === Q && H.key === c ? (H.preventDefault(), Xt()) : G && H.key === "Escape" && (H.preventDefault(), $(!1));
    };
    return document.addEventListener("keydown", K), () => {
      document.removeEventListener("keydown", K);
    };
  }, [
    G,
    Xt,
    c,
    (It = _t.view) == null ? void 0 : It.markerMode,
    _t.styleInfo,
    w,
    M,
    Et
  ]), Z(() => {
    const R = () => {
      var H, Q, j;
      const K = ((H = f.current) == null ? void 0 : H.querySelector(".editor-input")) ?? void 0;
      if (!K || document.activeElement !== K) return;
      const J = document.getSelection();
      J && !J.isCollapsed || Et() || ((Q = h.current) == null || Q.selectNote(0), (j = h.current) == null || j.focus());
    };
    return document.addEventListener("pointerup", R), document.addEventListener("selectionchange", R), () => {
      document.removeEventListener("pointerup", R), document.removeEventListener("selectionchange", R);
    };
  }, [Et]);
  const qt = d["%footnoteEditor_copyButton_tooltip%"];
  return /* @__PURE__ */ u(gt, { children: [
    /* @__PURE__ */ u("div", { ref: x, className: "footnote-editor tw:grid tw:gap-[12px]", children: [
      /* @__PURE__ */ u("div", { className: "tw:flex", children: [
        /* @__PURE__ */ u("div", { className: "tw:flex tw:gap-4", children: [
          /* @__PURE__ */ a(
            bu,
            {
              isTypeSwitchable: D,
              noteType: O,
              handleNoteTypeChange: Oe,
              localizedStrings: d
            }
          ),
          /* @__PURE__ */ a(
            fu,
            {
              callerType: g,
              customCaller: N,
              updateCaller: me,
              localizedStrings: d
            }
          )
        ] }),
        /* @__PURE__ */ a("div", { className: "tw:flex tw:w-full tw:justify-end", children: /* @__PURE__ */ u(Oa, { children: [
          /* @__PURE__ */ a(
            pu,
            {
              onUndoClick: () => {
                var R;
                return (R = h.current) == null ? void 0 : R.undo();
              },
              onRedoClick: () => {
                var R;
                return (R = h.current) == null ? void 0 : R.redo();
              },
              canUndo: !Y,
              canRedo: k,
              localizedStrings: d
            }
          ),
          /* @__PURE__ */ a(
            es,
            {
              onCancelClick: o,
              onAcceptClick: Dt,
              canAccept: !Y || y !== g || g === "custom" && N !== B,
              localizedStrings: d,
              acceptLabel: d["%footnoteEditor_saveButton_tooltip%"]
            }
          )
        ] }) })
      ] }),
      /* @__PURE__ */ u(
        "div",
        {
          ref: f,
          className: "tw:relative tw:rounded-[6px] tw:border-2 tw:border-ring",
          children: [
            /* @__PURE__ */ a("div", { className: t, children: /* @__PURE__ */ a(
              hu,
              {
                editorRef: h,
                canUndo: !Y,
                canRedo: k,
                children: /* @__PURE__ */ a(
                  Zl,
                  {
                    options: _t,
                    onStateChange: le,
                    onUsjChange: Yt,
                    defaultUsj: Su,
                    onScrRefChange: () => {
                    },
                    scrRef: n,
                    ref: h
                  }
                )
              }
            ) }),
            /* @__PURE__ */ a("div", { className: "tw:absolute tw:bottom-0 tw:right-0", children: /* @__PURE__ */ a(Vt, { children: /* @__PURE__ */ u(bt, { children: [
              /* @__PURE__ */ a(xt, { asChild: !0, children: /* @__PURE__ */ a(
                et,
                {
                  "aria-label": qt,
                  onClick: ke,
                  className: "tw:h-6 tw:w-6",
                  variant: "ghost",
                  size: "icon",
                  children: /* @__PURE__ */ a(oi, {})
                }
              ) }),
              /* @__PURE__ */ a(yt, { children: /* @__PURE__ */ a("p", { children: qt }) })
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
    /* @__PURE__ */ u(lr, { open: G, children: [
      /* @__PURE__ */ a(
        Ps,
        {
          className: "tw:absolute",
          style: {
            top: dt,
            left: at,
            height: pt,
            width: 0,
            pointerEvents: "none"
          }
        }
      ),
      /* @__PURE__ */ a(
        dr,
        {
          className: "tw:w-[500px] tw:p-0",
          onClick: (R) => {
            R.preventDefault(), R.stopPropagation();
          },
          children: /* @__PURE__ */ a(
            _u,
            {
              markerMenuItems: Nt,
              localizedStrings: d,
              searchRef: jt
            }
          )
        }
      )
    ] })
  ] });
}
const Ph = Object.freeze([
  ...xu,
  ...Object.entries(pa).map(([, t]) => t.description).filter((t) => !!t),
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
  ...uu,
  ...ts
]);
function Ru(t, e, r = !0, o = void 0) {
  if (!e || e.length === 0) return;
  const n = [], s = [];
  let i = [];
  return e.forEach((c) => {
    typeof c != "string" && c.marker === "fp" ? (i.length > 0 && s.push(i), i = [c]) : i.push(c);
  }), i.length > 0 && s.push(i), s.map((c, d) => {
    const l = d === s.length - 1;
    return (
      // A footnote's paragraphs have no stable id, and keying on their CONTENT is what produced
      // duplicate keys (two `\fp` paragraphs collide). This list is a read-only projection
      // re-rendered wholesale and never reordered, so the identity the rule protects cannot be
      // lost here. See the note above.
      // eslint-disable-next-line react/no-array-index-key
      /* @__PURE__ */ u("p", { children: [
        Yo(t, c, r, !0, n),
        l && o
      ] }, `para-${d}`)
    );
  });
}
function Yo(t, e, r = !0, o = !0, n = []) {
  if (!(!e || e.length === 0))
    return e.map((s, i) => {
      const c = `part-${i}`;
      if (typeof s == "string") {
        if (o) {
          const d = b(`usfm_${t}`);
          return /* @__PURE__ */ a("span", { className: d, children: s }, c);
        }
        return /* @__PURE__ */ u(
          "span",
          {
            className: "tw:inline-flex tw:items-center tw:gap-1 tw:underline tw:decoration-destructive",
            children: [
              /* @__PURE__ */ a(po, { className: "tw:h-4 tw:w-4 tw:fill-destructive" }),
              /* @__PURE__ */ a("span", { children: s }),
              /* @__PURE__ */ a(po, { className: "tw:h-4 tw:w-4 tw:fill-destructive" })
            ]
          },
          c
        );
      }
      return Du(s, c, r, [
        ...n,
        t ?? "unknown"
      ]);
    });
}
function Du(t, e, r, o = []) {
  const { marker: n } = t;
  return /* @__PURE__ */ u("span", { children: [
    n ? r && /* @__PURE__ */ a("span", { className: "marker", children: `\\${n} ` }) : /* @__PURE__ */ a(
      po,
      {
        className: "tw:text-error tw:mr-1 tw:inline-block tw:h-4 tw:w-4",
        "aria-label": "Missing marker"
      }
    ),
    Yo(n, t.content, r, !0, [
      ...o,
      n ?? "unknown"
    ])
  ] }, e);
}
function Mu({
  footnote: t,
  layout: e = "horizontal",
  formatCaller: r,
  showMarkers: o = !0
}) {
  const n = r ? r(t.caller) : t.caller, s = n !== t.caller;
  let i, c = t.content;
  Array.isArray(t.content) && t.content.length > 0 && typeof t.content[0] != "string" && (t.content[0].marker === "fr" || t.content[0].marker === "xo") && ([i, ...c] = t.content);
  const d = o ? /* @__PURE__ */ a("span", { className: "marker", children: `\\${t.marker}` }) : void 0, l = o ? /* @__PURE__ */ a("span", { className: "marker", children: ` \\${t.marker}*` }) : void 0, w = n && // USFM does not specify a marker for caller, so instead of a usfm_* class, we use a
  // specific class name in case styling is needed.
  /* @__PURE__ */ a("span", { className: b("note-caller tw:inline-block", { formatted: s }), children: n }), p = t.category && /* @__PURE__ */ u("span", { className: "note-category tw:inline-block", children: [
    o && /* @__PURE__ */ a("span", { className: "marker", children: "\\cat " }),
    t.category,
    o && /* @__PURE__ */ a("span", { className: "marker", children: "\\cat*" })
  ] }), h = i && /* @__PURE__ */ u(gt, { children: [
    Yo(t.marker, [i], o, !1),
    " "
  ] }), f = !!d, m = !!w, x = !!p, g = e === "horizontal" ? "horizontal" : "vertical", T = o ? "marker-visible" : "", y = e === "horizontal" ? "tw:col-span-1" : "tw:col-span-2 tw:col-start-1 tw:row-start-2", C = b(g, T);
  return /* @__PURE__ */ u(gt, { children: [
    /* @__PURE__ */ u("div", { className: b("textual-note-header tw:col-span-1 tw:w-fit tw:text-nowrap", C), children: [
      d,
      f && (m || x) && " ",
      w,
      m && x && " ",
      p
    ] }),
    /* @__PURE__ */ a("div", { className: b("textual-note-header tw:col-span-1 tw:w-fit tw:text-nowrap", C), children: h }),
    /* @__PURE__ */ a(
      "div",
      {
        className: b(
          "textual-note-body tw:flex tw:flex-col tw:gap-1",
          y,
          C
        ),
        children: c && c.length > 0 && /* @__PURE__ */ a(gt, { children: Ru(t.marker, c, o, l) })
      }
    )
  ] });
}
function Ah({
  className: t,
  classNameForItems: e,
  footnotes: r,
  layout: o = "horizontal",
  listId: n,
  selectedFootnote: s,
  selectionRequest: i,
  showMarkers: c = !0,
  suppressFormatting: d = !1,
  formatCaller: l,
  onFootnoteSelected: w
}) {
  const p = l ?? Ic(r, void 0), h = (N, A) => {
    w == null || w(N, A, n);
  }, f = s ? r.findIndex((N) => N === s) : -1, [m, x] = _(f), g = (N, A, B) => {
    if (r.length)
      switch (N.key) {
        case "Enter":
        case " ":
          N.preventDefault(), w == null || w(A, B, n);
          break;
      }
  }, T = (N) => {
    if (r.length)
      switch (N.key) {
        case "ArrowDown":
          N.preventDefault(), x((A) => Math.min(A + 1, r.length - 1));
          break;
        case "ArrowUp":
          N.preventDefault(), x((A) => Math.max(A - 1, 0));
          break;
      }
  }, y = L([]);
  Z(() => {
    var N;
    m >= 0 && m < y.current.length && ((N = y.current[m]) == null || N.focus());
  }, [m]);
  const C = s ? r.findIndex((N) => N === s) : -1;
  return Z(() => {
    var N;
    C < 0 || C >= y.current.length || (N = y.current[C]) == null || N.scrollIntoView({ block: "nearest" });
  }, [C, i]), /* @__PURE__ */ a(
    "div",
    {
      role: "listbox",
      "aria-label": "Footnotes",
      tabIndex: m < 0 ? 0 : -1,
      className: b("tw:h-full tw:overflow-y-auto", t),
      onKeyDown: T,
      children: /* @__PURE__ */ a(
        "ul",
        {
          className: b(
            "tw:p-0.5 tw:pt-1",
            "tw:grid",
            o === "horizontal" ? "tw:grid-cols-[min-content_min-content_1fr]" : "tw:grid-cols-[min-content_1fr]",
            !d && "formatted-font"
          ),
          children: r.map((N, A) => {
            const B = N === s, U = `${n}-${A}`;
            return (
              // The key belongs on the outermost node returned from the map — the Fragment — not on
              // the `<li>` nested inside it, which leaves the Fragment itself unkeyed.
              /* @__PURE__ */ u(ee.Fragment, { children: [
                /* @__PURE__ */ a(
                  "li",
                  {
                    ref: (O) => {
                      y.current[A] = O;
                    },
                    role: "option",
                    "aria-selected": B,
                    "data-marker": N.marker,
                    "data-state": B ? "selected" : void 0,
                    tabIndex: A === m ? 0 : -1,
                    className: b(
                      "tw:gap-x-3 tw:gap-y-1 tw:p-2 tw:data-[state=selected]:bg-muted",
                      w && "tw:hover:bg-muted/50",
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
                    onClick: () => h(N, A),
                    onKeyDown: (O) => g(O, N, A),
                    children: /* @__PURE__ */ a(
                      Mu,
                      {
                        footnote: N,
                        layout: o,
                        formatCaller: () => p(N.caller, A),
                        showMarkers: c
                      }
                    )
                  }
                ),
                A < r.length - 1 && o === "vertical" && /* @__PURE__ */ a(Ur, { tabIndex: -1, className: "tw:col-span-2" })
              ] }, U)
            );
          })
        }
      )
    }
  );
}
function Ou(t) {
  const e = [];
  let r = 0;
  const o = /\\\\(.+?)\\\\/g;
  let n;
  for (; (n = o.exec(t)) !== null; )
    n.index > r && e.push(t.substring(r, n.index)), e.push(/* @__PURE__ */ a("strong", { children: n[1] }, n.index)), r = o.lastIndex;
  return r < t.length && e.push(t.substring(r)), e.length > 0 ? e : [t];
}
function Iu({
  occurrenceData: t,
  setScriptureReference: e,
  localizedStrings: r,
  classNameForText: o
}) {
  const n = r["%webView_inventory_occurrences_table_header_reference%"], s = r["%webView_inventory_occurrences_table_header_occurrence%"], i = P(() => {
    const c = [], d = /* @__PURE__ */ new Set();
    return t.forEach((l) => {
      const w = `${l.reference.book}:${l.reference.chapterNum}:${l.reference.verseNum}:${l.text}`;
      d.has(w) || (d.add(w), c.push(l));
    }), c;
  }, [t]);
  return /* @__PURE__ */ u(Mo, { stickyHeader: !0, children: [
    /* @__PURE__ */ a(Oo, { stickyHeader: !0, children: /* @__PURE__ */ u(We, { children: [
      /* @__PURE__ */ a(ka, { children: n }),
      /* @__PURE__ */ a(ka, { children: s })
    ] }) }),
    /* @__PURE__ */ a(Io, { children: i.length > 0 && i.map((c) => /* @__PURE__ */ u(
      We,
      {
        onClick: () => {
          e(c.reference);
        },
        children: [
          /* @__PURE__ */ a(kr, { children: $e(c.reference, "English") }),
          /* @__PURE__ */ a(kr, { className: o, children: Ou(c.text) })
        ]
      },
      `${c.reference.book} ${c.reference.chapterNum}:${c.reference.verseNum}-${c.text}`
    )) })
  ] });
}
function ss({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    gn.Root,
    {
      "data-slot": "checkbox",
      className: b(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:peer tw:relative tw:flex tw:size-4 tw:shrink-0 tw:items-center tw:justify-center tw:rounded-[4px] tw:border tw:border-input tw:transition-colors tw:outline-none tw:group-has-disabled/field:opacity-50 tw:after:absolute tw:after:-inset-x-3 tw:after:-inset-y-2 tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:aria-invalid:aria-checked:border-primary tw:dark:bg-input/30 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40 tw:data-checked:border-primary tw:data-checked:bg-primary tw:data-checked:text-primary-foreground tw:dark:data-checked:bg-primary",
        t
      ),
      ...e,
      children: /* @__PURE__ */ a(
        gn.Indicator,
        {
          "data-slot": "checkbox-indicator",
          className: "tw:grid tw:place-content-center tw:text-current tw:transition-none tw:[&>svg]:size-3.5",
          children: /* @__PURE__ */ a(Aa, {})
        }
      )
    }
  );
}
const zu = (t) => {
  if (t === "asc")
    return /* @__PURE__ */ a(fc, { className: "tw:h-4 tw:w-4" });
  if (t === "desc")
    return /* @__PURE__ */ a(mc, { className: "tw:h-4 tw:w-4" });
}, La = (t, e, r) => /* @__PURE__ */ a(Vt, { children: /* @__PURE__ */ u(bt, { children: [
  /* @__PURE__ */ u(
    xt,
    {
      className: b("tw:flex tw:w-full tw:justify-start", r),
      variant: "ghost",
      onClick: () => t.toggleSorting(void 0),
      children: [
        /* @__PURE__ */ a("span", { className: "tw:w-6 tw:max-w-fit tw:flex-1 tw:overflow-hidden tw:text-ellipsis", children: e }),
        zu(t.getIsSorted())
      ]
    }
  ),
  /* @__PURE__ */ a(yt, { side: "bottom", children: e })
] }) }), $h = (t) => ({
  accessorKey: "item",
  accessorFn: (e) => e.items[0],
  header: ({ column: e }) => La(e, t)
}), Pu = (t, e) => ({
  accessorKey: `item${e}`,
  accessorFn: (r) => r.items[e],
  header: ({ column: r }) => La(r, t)
}), Vh = (t) => ({
  accessorKey: "count",
  header: ({ column: e }) => La(e, t, "tw:justify-end"),
  cell: ({ row: e }) => /* @__PURE__ */ a("div", { className: "tw:flex tw:justify-end tw:tabular-nums", children: e.getValue("count") })
}), no = (t, e, r, o, n, s) => {
  let i = [...r];
  t.forEach((d) => {
    e === "approved" ? i.includes(d) || i.push(d) : i = i.filter((l) => l !== d);
  }), o(i);
  let c = [...n];
  t.forEach((d) => {
    e === "unapproved" ? c.includes(d) || c.push(d) : c = c.filter((l) => l !== d);
  }), s(c);
}, Lh = (t, e, r, o, n) => ({
  accessorKey: "status",
  header: ({ column: s }) => La(s, t, "tw:justify-center"),
  cell: ({ row: s }) => {
    const i = s.getValue("status"), c = s.getValue("item");
    return (
      // Center the status buttons in the cell to match the centered status column header (the
      // ToggleGroup would otherwise sit left-aligned).
      /* @__PURE__ */ a("div", { className: "tw:flex tw:justify-center", children: /* @__PURE__ */ u(Gn, { value: i, variant: "outline", type: "single", className: "tw:gap-0", children: [
        /* @__PURE__ */ a(
          wa,
          {
            onClick: (d) => {
              d.stopPropagation(), no(
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
            children: /* @__PURE__ */ a(pc, {})
          }
        ),
        /* @__PURE__ */ a(
          wa,
          {
            onClick: (d) => {
              d.stopPropagation(), no(
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
            children: /* @__PURE__ */ a(hc, {})
          }
        ),
        /* @__PURE__ */ a(
          wa,
          {
            onClick: (d) => {
              d.stopPropagation(), no(
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
            children: /* @__PURE__ */ a(gc, {})
          }
        )
      ] }) })
    );
  }
}), Bh = (t) => t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g), jh = (t) => {
  const e = /^\\[vc]\s+(\d+)/, r = t.match(e);
  if (r)
    return +r[1];
}, Fh = (t) => {
  const e = t.match(/^\\id\s+([A-Za-z]+)/);
  return e ? e[1] : "";
}, Au = (t, e, r) => r.includes(t) ? "unapproved" : e.includes(t) ? "approved" : "unknown", Uh = Object.freeze([
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
]), $u = (t, e, r) => {
  let o = t;
  return e !== "all" && (o = o.filter(
    (n) => e === "approved" && n.status === "approved" || e === "unapproved" && n.status === "unapproved" || e === "unknown" && n.status === "unknown"
  )), r !== "" && (o = o.filter((n) => n.items[0].includes(r))), o;
}, Vu = (t, e, r) => t.map((o) => {
  const n = cn(o.key) ? o.key : o.key[0];
  return {
    items: cn(o.key) ? [o.key] : o.key,
    count: o.count,
    status: o.status || Au(n, e, r),
    occurrences: o.occurrences || []
  };
}), Ne = (t, e) => t[e] ?? e;
function Kh({
  inventoryItems: t,
  setVerseRef: e,
  localizedStrings: r,
  additionalItemsLabels: o,
  approvedItems: n,
  unapprovedItems: s,
  scope: i,
  onScopeChange: c,
  columns: d,
  id: l,
  areInventoryItemsLoading: w = !1,
  classNameForVerseText: p,
  onItemSelected: h
}) {
  const f = Ne(r, "%webView_inventory_all%"), m = Ne(r, "%webView_inventory_approved%"), x = Ne(r, "%webView_inventory_unapproved%"), g = Ne(r, "%webView_inventory_unknown%"), T = Ne(r, "%webView_inventory_scope_currentBook%"), y = Ne(r, "%webView_inventory_scope_chapter%"), C = Ne(r, "%webView_inventory_scope_verse%"), N = Ne(r, "%webView_inventory_filter_text%"), A = Ne(
    r,
    "%webView_inventory_show_additional_items%"
  ), B = Ne(r, "%webView_inventory_no_results%"), [U, O] = _(!1), [S, D] = _("all"), [W, Y] = _(""), [z, k] = _([]), ot = P(() => {
    const tt = t ?? [];
    return tt.length === 0 ? [] : Vu(tt, n, s);
  }, [t, n, s]), I = P(() => {
    if (U) return ot;
    const tt = [];
    return ot.forEach((pt) => {
      const kt = pt.items[0], mt = tt.find(
        (Rt) => Rt.items[0] === kt
      );
      mt ? (mt.count += pt.count, mt.occurrences = mt.occurrences.concat(pt.occurrences)) : tt.push({
        items: [kt],
        count: pt.count,
        occurrences: pt.occurrences,
        status: pt.status
      });
    }), tt;
  }, [U, ot]), X = P(() => I.length === 0 ? [] : $u(I, S, W), [I, S, W]), G = P(() => {
    var kt, mt;
    if (!U) return d;
    const tt = (kt = o == null ? void 0 : o.tableHeaders) == null ? void 0 : kt.length;
    if (!tt) return d;
    const pt = [];
    for (let Rt = 0; Rt < tt; Rt++)
      pt.push(
        Pu(
          ((mt = o == null ? void 0 : o.tableHeaders) == null ? void 0 : mt[Rt]) || "Additional Item",
          Rt + 1
        )
      );
    return [...pt, ...d];
  }, [o == null ? void 0 : o.tableHeaders, d, U]);
  Z(() => {
    X.length === 0 ? k([]) : X.length === 1 && k(X[0].items);
  }, [X]);
  const $ = (tt, pt) => {
    pt.setRowSelection(() => {
      const mt = {};
      return mt[tt.index] = !0, mt;
    });
    const kt = tt.original.items;
    k(kt), h && kt.length > 0 && h(kt[0]);
  }, at = (tt) => {
    if (tt === "book" || tt === "chapter" || tt === "verse")
      c(tt);
    else
      throw new Error(`Invalid scope value: ${tt}`);
  }, ut = (tt) => {
    if (tt === "all" || tt === "approved" || tt === "unapproved" || tt === "unknown")
      D(tt);
    else
      throw new Error(`Invalid status filter value: ${tt}`);
  }, dt = P(() => {
    if (I.length === 0 || z.length === 0) return [];
    const tt = I.filter((pt) => zc(
      U ? pt.items : [pt.items[0]],
      z
    ));
    if (tt.length > 1) throw new Error("Selected item is not unique");
    return tt.length === 0 ? [] : tt[0].occurrences;
  }, [z, U, I]);
  return /* @__PURE__ */ a("div", { id: l, className: "pr-twp tw:h-full tw:overflow-auto", children: /* @__PURE__ */ u("div", { className: "tw:flex tw:h-full tw:w-full tw:min-w-min tw:flex-col", children: [
    /* @__PURE__ */ u("div", { className: "tw:flex tw:items-stretch", style: { contain: "inline-size" }, children: [
      /* @__PURE__ */ u(
        Er,
        {
          onValueChange: (tt) => ut(tt),
          defaultValue: S,
          children: [
            /* @__PURE__ */ a(Sr, { className: "tw:m-1 tw:w-auto tw:flex-1", children: /* @__PURE__ */ a(Tr, { placeholder: "Select filter" }) }),
            /* @__PURE__ */ u(Rr, { children: [
              /* @__PURE__ */ a(xe, { value: "all", children: f }),
              /* @__PURE__ */ a(xe, { value: "approved", children: m }),
              /* @__PURE__ */ a(xe, { value: "unapproved", children: x }),
              /* @__PURE__ */ a(xe, { value: "unknown", children: g })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ u(Er, { onValueChange: (tt) => at(tt), defaultValue: i, children: [
        /* @__PURE__ */ a(Sr, { className: "tw:m-1 tw:w-auto tw:flex-1", children: /* @__PURE__ */ a(Tr, { placeholder: "Select scope" }) }),
        /* @__PURE__ */ u(Rr, { children: [
          /* @__PURE__ */ a(xe, { value: "book", children: T }),
          /* @__PURE__ */ a(xe, { value: "chapter", children: y }),
          /* @__PURE__ */ a(xe, { value: "verse", children: C })
        ] })
      ] }),
      /* @__PURE__ */ a(
        za,
        {
          className: "tw:m-1 tw:flex-1 tw:rounded-md tw:border",
          placeholder: N,
          value: W,
          onChange: (tt) => {
            Y(tt.target.value);
          }
        }
      ),
      o && /* @__PURE__ */ a(Vt, { children: /* @__PURE__ */ u(bt, { children: [
        /* @__PURE__ */ a(xt, { asChild: !0, children: /* @__PURE__ */ u("div", { className: "tw:m-1 tw:flex tw:w-fit tw:min-w-[26px] tw:items-center tw:rounded-md tw:border", children: [
          /* @__PURE__ */ a(
            ss,
            {
              className: "tw:m-1 tw:shrink-0",
              checked: U,
              onCheckedChange: (tt) => {
                O(tt);
              }
            }
          ),
          /* @__PURE__ */ a($t, { className: "tw:m-1 tw:truncate", children: (o == null ? void 0 : o.checkboxText) ?? A })
        ] }) }),
        /* @__PURE__ */ a(yt, { children: (o == null ? void 0 : o.checkboxText) ?? A })
      ] }) })
    ] }),
    /* @__PURE__ */ a("div", { className: "tw:m-1 tw:flex-1 tw:overflow-auto tw:rounded-md tw:border", children: /* @__PURE__ */ a(
      su,
      {
        columns: G,
        data: X,
        onRowClickHandler: $,
        stickyHeader: !0,
        isLoading: w,
        noResultsMessage: B
      }
    ) }),
    dt.length > 0 && /* @__PURE__ */ a("div", { className: "tw:m-1 tw:flex-1 tw:overflow-auto tw:rounded-md tw:border", children: /* @__PURE__ */ a(
      Iu,
      {
        classNameForText: p,
        occurrenceData: dt,
        setScriptureReference: e,
        localizedStrings: r
      }
    ) })
  ] }) });
}
const Lu = "16rem", Bu = "3rem", cs = ee.createContext(void 0);
function Ba() {
  const t = ee.useContext(cs);
  if (!t)
    throw new Error("useSidebar must be used within a SidebarProvider.");
  return t;
}
function ju({
  defaultOpen: t = !0,
  open: e,
  onOpenChange: r,
  className: o,
  style: n,
  children: s,
  // CUSTOM: Added 'side' prop at provider level so direction-aware side can be propagated via context
  side: i = "primary",
  ...c
}) {
  const [d, l] = ee.useState(t), w = e ?? d, p = ee.useCallback(
    (C) => {
      const N = typeof C == "function" ? C(w) : C;
      r ? r(N) : l(N);
    },
    [r, w]
  ), h = ee.useCallback(() => p((C) => !C), [p]), f = w ? "expanded" : "collapsed", g = Re() === "ltr" ? i : i === "primary" ? "secondary" : "primary", T = ee.useMemo(
    () => ({
      state: f,
      open: w,
      setOpen: p,
      toggleSidebar: h,
      // CUSTOM: Passes direction-aware side into context so SidebarTrigger icon and Sidebar
      // positioning both respond correctly in RTL layouts
      side: g
    }),
    [f, w, p, h, g]
  ), y = {
    "--sidebar-width": Lu,
    "--sidebar-width-icon": Bu,
    ...n
  };
  return /* @__PURE__ */ a(cs.Provider, { value: T, children: /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "sidebar-wrapper",
      style: y,
      className: b(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        // CUSTOM: Removed tw:min-h-svh - not appropriate in Platform.Bible's windowed layout
        "pr-twp tw:group/sidebar-wrapper tw:flex tw:w-full tw:has-data-[variant=inset]:bg-sidebar",
        o
      ),
      ...c,
      children: s
    }
  ) });
}
function Fu({
  // CUSTOM: Removed 'side' prop from Sidebar - it is now read from context (moved to SidebarProvider)
  variant: t = "sidebar",
  collapsible: e = "offcanvas",
  className: r,
  children: o,
  ...n
}) {
  const s = Ba();
  return e === "none" ? /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "sidebar",
      className: b(
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
      "data-state": s.state,
      "data-collapsible": s.state === "collapsed" ? e : "",
      "data-variant": t,
      "data-side": s.side,
      "data-slot": "sidebar",
      children: [
        /* @__PURE__ */ a(
          "div",
          {
            "data-slot": "sidebar-gap",
            className: b(
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
            "data-side": s.side,
            className: b(
              // CUSTOM: Switched tw:fixed to tw:absolute to scope the sidebar inside its container
              // rather than the viewport, matching Platform.Bible's layout model
              "tw:absolute tw:inset-y-0 tw:z-10 tw:hidden tw:h-svh tw:w-(--sidebar-width) tw:transition-[left,right,width] tw:duration-200 tw:ease-linear tw:md:flex",
              // CUSTOM: Use positional side values (primary/secondary) for left/right offset selectors
              s.side === "primary" ? "tw:left-0 tw:group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]" : "tw:right-0 tw:group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
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
function Hh({ className: t, onClick: e, ...r }) {
  const { toggleSidebar: o, side: n } = Ba();
  return /* @__PURE__ */ u(
    et,
    {
      "data-sidebar": "trigger",
      "data-slot": "sidebar-trigger",
      variant: "ghost",
      size: "icon-sm",
      className: b(t),
      onClick: (s) => {
        e == null || e(s), o();
      },
      ...r,
      children: [
        n === "primary" ? /* @__PURE__ */ a(Fc, {}) : /* @__PURE__ */ a(Uc, {}),
        /* @__PURE__ */ a("span", { className: "tw:sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
}
function qh({ className: t, ...e }) {
  const { toggleSidebar: r } = Ba();
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
      className: b(
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
function Uu({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "main",
    {
      "data-slot": "sidebar-inset",
      className: b(
        // CUSTOM: Removed tw:min-h-svh - not appropriate in Platform.Bible's windowed layout
        "tw:relative tw:flex tw:w-full tw:flex-1 tw:flex-col tw:bg-background tw:md:peer-data-[variant=inset]:m-2 tw:md:peer-data-[variant=inset]:ms-0 tw:md:peer-data-[variant=inset]:rounded-xl tw:md:peer-data-[variant=inset]:shadow-sm tw:md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ms-2",
        t
      ),
      ...e
    }
  );
}
function Gh({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    za,
    {
      "data-slot": "sidebar-input",
      "data-sidebar": "input",
      className: b("tw:h-8 tw:w-full tw:bg-background tw:shadow-none", t),
      ...e
    }
  );
}
function Wh({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "sidebar-header",
      "data-sidebar": "header",
      className: b("tw:flex tw:flex-col tw:gap-2 tw:p-2", t),
      ...e
    }
  );
}
function Yh({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "sidebar-footer",
      "data-sidebar": "footer",
      className: b("tw:flex tw:flex-col tw:gap-2 tw:p-2", t),
      ...e
    }
  );
}
function Xh({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    Ur,
    {
      "data-slot": "sidebar-separator",
      "data-sidebar": "separator",
      className: b("tw:mx-2 tw:w-auto tw:bg-sidebar-border", t),
      ...e
    }
  );
}
function Ku({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "sidebar-content",
      "data-sidebar": "content",
      className: b(
        "tw:no-scrollbar tw:flex tw:min-h-0 tw:flex-1 tw:flex-col tw:gap-0 tw:overflow-auto tw:group-data-[collapsible=icon]:overflow-hidden",
        t
      ),
      ...e
    }
  );
}
function Bn({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "sidebar-group",
      "data-sidebar": "group",
      className: b("tw:relative tw:flex tw:w-full tw:min-w-0 tw:flex-col tw:p-2", t),
      ...e
    }
  );
}
function jn({
  className: t,
  asChild: e = !1,
  ...r
}) {
  const o = e ? Jr.Root : "div";
  return /* @__PURE__ */ a(
    o,
    {
      "data-slot": "sidebar-group-label",
      "data-sidebar": "group-label",
      className: b(
        "tw:flex tw:h-8 tw:shrink-0 tw:items-center tw:rounded-md tw:px-2 tw:text-xs tw:font-medium tw:text-sidebar-foreground/70 tw:ring-sidebar-ring tw:outline-hidden tw:transition-[margin,opacity] tw:duration-200 tw:ease-linear tw:group-data-[collapsible=icon]:-mt-8 tw:group-data-[collapsible=icon]:opacity-0 tw:focus-visible:ring-2 tw:[&>svg]:size-4 tw:[&>svg]:shrink-0",
        t
      ),
      ...r
    }
  );
}
function Jh({
  className: t,
  asChild: e = !1,
  ...r
}) {
  const o = e ? Jr.Root : "button";
  return /* @__PURE__ */ a(
    o,
    {
      "data-slot": "sidebar-group-action",
      "data-sidebar": "group-action",
      className: b(
        "tw:absolute tw:top-3.5 tw:end-3 tw:flex tw:aspect-square tw:w-5 tw:items-center tw:justify-center tw:rounded-md tw:p-0 tw:text-sidebar-foreground tw:ring-sidebar-ring tw:outline-hidden tw:transition-transform tw:group-data-[collapsible=icon]:hidden tw:after:absolute tw:after:-inset-2 tw:hover:bg-sidebar-accent tw:hover:text-sidebar-accent-foreground tw:focus-visible:ring-2 tw:md:after:hidden tw:[&>svg]:size-4 tw:[&>svg]:shrink-0",
        t
      ),
      ...r
    }
  );
}
function Fn({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "sidebar-group-content",
      "data-sidebar": "group-content",
      className: b("tw:w-full tw:text-sm", t),
      ...e
    }
  );
}
function Hu({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "ul",
    {
      "data-slot": "sidebar-menu",
      "data-sidebar": "menu",
      className: b("tw:flex tw:w-full tw:min-w-0 tw:flex-col tw:gap-0", t),
      ...e
    }
  );
}
function qu({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "li",
    {
      "data-slot": "sidebar-menu-item",
      "data-sidebar": "menu-item",
      className: b("tw:group/menu-item tw:relative", t),
      ...e
    }
  );
}
const Gu = Si(
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
function Wu({
  asChild: t = !1,
  isActive: e = !1,
  variant: r = "default",
  size: o = "default",
  tooltip: n,
  className: s,
  ...i
}) {
  const c = t ? Jr.Root : "button", { state: d } = Ba(), l = /* @__PURE__ */ a(
    c,
    {
      "data-slot": "sidebar-menu-button",
      "data-sidebar": "menu-button",
      "data-size": o,
      "data-active": e,
      className: b(Gu({ variant: r, size: o }), s),
      ...i
    }
  );
  return n ? /* @__PURE__ */ u(bt, { children: [
    /* @__PURE__ */ a(xt, { asChild: !0, children: l }),
    /* @__PURE__ */ a(
      yt,
      {
        side: "right",
        align: "center",
        hidden: d !== "collapsed",
        ...typeof n == "string" ? { children: n } : n
      }
    )
  ] }) : l;
}
function Zh({
  className: t,
  asChild: e = !1,
  showOnHover: r = !1,
  ...o
}) {
  const n = e ? Jr.Root : "button";
  return /* @__PURE__ */ a(
    n,
    {
      "data-slot": "sidebar-menu-action",
      "data-sidebar": "menu-action",
      className: b(
        "tw:absolute tw:top-1.5 tw:end-1 tw:flex tw:aspect-square tw:w-5 tw:items-center tw:justify-center tw:rounded-md tw:p-0 tw:text-sidebar-foreground tw:ring-sidebar-ring tw:outline-hidden tw:transition-transform tw:group-data-[collapsible=icon]:hidden tw:peer-hover/menu-button:text-sidebar-accent-foreground tw:peer-data-[size=default]/menu-button:top-1.5 tw:peer-data-[size=lg]/menu-button:top-2.5 tw:peer-data-[size=sm]/menu-button:top-1 tw:after:absolute tw:after:-inset-2 tw:hover:bg-sidebar-accent tw:hover:text-sidebar-accent-foreground tw:focus-visible:ring-2 tw:md:after:hidden tw:[&>svg]:size-4 tw:[&>svg]:shrink-0",
        r && "tw:group-focus-within/menu-item:opacity-100 tw:group-hover/menu-item:opacity-100 tw:peer-data-active/menu-button:text-sidebar-accent-foreground tw:aria-expanded:opacity-100 tw:md:opacity-0",
        t
      ),
      ...o
    }
  );
}
function Qh({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "sidebar-menu-badge",
      "data-sidebar": "menu-badge",
      className: b(
        "tw:pointer-events-none tw:absolute tw:end-1 tw:flex tw:h-5 tw:min-w-5 tw:items-center tw:justify-center tw:rounded-md tw:px-1 tw:text-xs tw:font-medium tw:text-sidebar-foreground tw:tabular-nums tw:select-none tw:group-data-[collapsible=icon]:hidden tw:peer-hover/menu-button:text-sidebar-accent-foreground tw:peer-data-[size=default]/menu-button:top-1.5 tw:peer-data-[size=lg]/menu-button:top-2.5 tw:peer-data-[size=sm]/menu-button:top-1 tw:peer-data-active/menu-button:text-sidebar-accent-foreground",
        t
      ),
      ...e
    }
  );
}
function tg({
  className: t,
  showIcon: e = !1,
  ...r
}) {
  const [o] = ee.useState(() => `${Math.floor(Math.random() * 40) + 50}%`), n = { "--skeleton-width": o };
  return /* @__PURE__ */ u(
    "div",
    {
      "data-slot": "sidebar-menu-skeleton",
      "data-sidebar": "menu-skeleton",
      className: b("tw:flex tw:h-8 tw:items-center tw:gap-2 tw:rounded-md tw:px-2", t),
      ...r,
      children: [
        e && /* @__PURE__ */ a(yr, { className: "tw:size-4 tw:rounded-md", "data-sidebar": "menu-skeleton-icon" }),
        /* @__PURE__ */ a(
          yr,
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
function eg({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "ul",
    {
      "data-slot": "sidebar-menu-sub",
      "data-sidebar": "menu-sub",
      className: b(
        "tw:mx-3.5 tw:flex tw:min-w-0 tw:translate-x-px tw:rtl:-translate-x-px tw:flex-col tw:gap-1 tw:border-s tw:border-sidebar-border tw:px-2.5 tw:py-0.5 tw:group-data-[collapsible=icon]:hidden",
        t
      ),
      ...e
    }
  );
}
function rg({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "li",
    {
      "data-slot": "sidebar-menu-sub-item",
      "data-sidebar": "menu-sub-item",
      className: b("tw:group/menu-sub-item tw:relative", t),
      ...e
    }
  );
}
function ag({
  asChild: t = !1,
  size: e = "md",
  isActive: r = !1,
  className: o,
  ...n
}) {
  const s = t ? Jr.Root : "a";
  return /* @__PURE__ */ a(
    s,
    {
      "data-slot": "sidebar-menu-sub-button",
      "data-sidebar": "menu-sub-button",
      "data-size": e,
      "data-active": r,
      className: b(
        "tw:flex tw:h-7 tw:min-w-0 tw:-translate-x-px tw:rtl:translate-x-px tw:items-center tw:gap-2 tw:overflow-hidden tw:rounded-md tw:px-2 tw:text-sidebar-foreground tw:ring-sidebar-ring tw:outline-hidden tw:group-data-[collapsible=icon]:hidden tw:hover:bg-sidebar-accent tw:hover:text-sidebar-accent-foreground tw:focus-visible:ring-2 tw:active:bg-sidebar-accent tw:active:text-sidebar-accent-foreground tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:aria-disabled:pointer-events-none tw:aria-disabled:opacity-50 tw:data-[size=md]:text-sm tw:data-[size=sm]:text-xs tw:data-active:bg-sidebar-accent tw:data-active:text-sidebar-accent-foreground tw:[&>span:last-child]:truncate tw:[&>svg]:size-4 tw:[&>svg]:shrink-0 tw:[&>svg]:text-sidebar-accent-foreground",
        o
      ),
      ...n
    }
  );
}
function Yu({
  id: t,
  extensionLabels: e,
  projectInfo: r,
  handleSelectSidebarItem: o,
  selectedSidebarItem: n,
  extensionsSidebarGroupLabel: s,
  projectsSidebarGroupLabel: i,
  buttonPlaceholderText: c,
  searchPlaceholderText: d,
  noResultsText: l,
  className: w
}) {
  const p = V(
    (g, T) => {
      o(g, T);
    },
    [o]
  ), h = V(
    (g) => {
      const T = r.find((y) => y.projectId === g);
      return T ? T.projectName : g;
    },
    [r]
  ), f = P(
    () => r.map((g) => ({
      id: g.projectId,
      shortName: g.projectName,
      fullName: g.projectName
    })),
    [r]
  ), m = P(() => {
    const g = {
      buttonPlaceholder: c,
      ariaLabel: i
    };
    return d && (g.searchPlaceholder = d), l && (g.commandEmptyMessage = l), g;
  }, [c, i, d, l]), x = V(
    (g) => !n.projectId && g === n.label,
    [n]
  );
  return /* @__PURE__ */ a(
    Fu,
    {
      id: t,
      collapsible: "none",
      variant: "inset",
      className: b("tw:w-96 tw:gap-2 tw:overflow-y-auto", w),
      children: /* @__PURE__ */ u(Ku, { children: [
        /* @__PURE__ */ u(Bn, { children: [
          /* @__PURE__ */ a(jn, { className: "tw:text-sm", children: s }),
          /* @__PURE__ */ a(Fn, { children: /* @__PURE__ */ a(Hu, { children: Object.entries(e).map(([g, T]) => /* @__PURE__ */ a(qu, { children: /* @__PURE__ */ a(
            Wu,
            {
              onClick: () => p(g),
              isActive: x(g),
              children: /* @__PURE__ */ a("span", { className: "tw:pl-3", children: T })
            }
          ) }, g)) }) })
        ] }),
        /* @__PURE__ */ u(Bn, { children: [
          /* @__PURE__ */ a(jn, { className: "tw:text-sm", children: i }),
          /* @__PURE__ */ a(Fn, { className: "tw:pl-3", children: /* @__PURE__ */ u(
            "div",
            {
              className: b(
                "tw:flex tw:w-full tw:items-center tw:gap-2 tw:rounded-md tw:px-2 tw:py-1",
                {
                  "tw:bg-sidebar-accent tw:text-sidebar-accent-foreground": n == null ? void 0 : n.projectId
                }
              ),
              children: [
                /* @__PURE__ */ a(vc, { className: "tw:h-4 tw:w-4 tw:shrink-0" }),
                /* @__PURE__ */ a(
                  $s,
                  {
                    mode: "project",
                    projects: f,
                    openTabs: [],
                    selection: { projectId: (n == null ? void 0 : n.projectId) ?? "" },
                    onChangeSelection: ({ projectId: g }) => {
                      if (!g) return;
                      const T = h(g);
                      p(T, g);
                    },
                    buttonVariant: "ghost",
                    buttonClassName: "tw:h-8 tw:w-full tw:flex-1 tw:justify-start tw:font-normal",
                    localizedStrings: m
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
function og({
  id: t,
  children: e,
  searchValue: r,
  onSearch: o,
  className: n,
  // Everything else on this type comes from `SettingsSidebarProps`, so forward it wholesale: a
  // prop added to the sidebar reaches it without a matching edit here. `id` is destructured out
  // because it belongs to the SidebarProvider below, not to the sidebar.
  ...s
}) {
  return /* @__PURE__ */ u("div", { className: "tw:box-border tw:flex tw:h-full tw:flex-col", children: [
    /* @__PURE__ */ a("div", { className: "tw:box-border tw:flex tw:items-center tw:justify-center tw:py-4", children: /* @__PURE__ */ a(
      Jn,
      {
        className: "tw:w-9/12",
        value: r,
        onSearch: o,
        placeholder: "Search app settings, extension settings, and project settings"
      }
    ) }),
    /* @__PURE__ */ u(
      ju,
      {
        id: t,
        className: "tw:h-full tw:flex-1 tw:gap-4 tw:overflow-auto tw:border-t",
        children: [
          /* @__PURE__ */ a(
            Yu,
            {
              className: b("tw:w-1/2 tw:min-w-[140px] tw:max-w-[220px] tw:border-e", n),
              ...s
            }
          ),
          /* @__PURE__ */ a(Uu, { className: "tw:min-w-[215px]", children: e })
        ]
      }
    )
  ] });
}
const He = "scrBook", Xu = "scrRef", or = "source", Ju = "details", Zu = "Scripture Reference", Qu = "Scripture Book", ls = "Type", tp = "Details";
function ep(t, e) {
  const r = e ?? !1;
  return [
    {
      accessorFn: (o) => `${o.start.book} ${o.start.chapterNum}:${o.start.verseNum}`,
      id: He,
      header: (t == null ? void 0 : t.scriptureReferenceColumnName) ?? Zu,
      cell: (o) => {
        const n = o.row.original;
        return o.row.getIsGrouped() ? Kt.bookIdToEnglishName(n.start.book) : o.row.groupingColumnId === He ? $e(n.start) : void 0;
      },
      getGroupingValue: (o) => Kt.bookIdToNumber(o.start.book),
      sortingFn: (o, n) => _a(o.original.start, n.original.start),
      enableGrouping: !0
    },
    {
      accessorFn: (o) => $e(o.start),
      id: Xu,
      header: void 0,
      cell: (o) => {
        const n = o.row.original;
        return o.row.getIsGrouped() ? void 0 : $e(n.start);
      },
      sortingFn: (o, n) => _a(o.original.start, n.original.start),
      enableGrouping: !1
    },
    {
      accessorFn: (o) => o.source.displayName,
      id: or,
      header: r ? (t == null ? void 0 : t.typeColumnName) ?? ls : void 0,
      cell: (o) => r || o.row.getIsGrouped() ? o.getValue() : void 0,
      getGroupingValue: (o) => o.source.id,
      sortingFn: (o, n) => o.original.source.displayName.localeCompare(n.original.source.displayName),
      enableGrouping: !0
    },
    {
      accessorFn: (o) => o.detail,
      id: Ju,
      header: (t == null ? void 0 : t.detailsColumnName) ?? tp,
      cell: (o) => o.getValue(),
      enableGrouping: !1
    }
  ];
}
const rp = (t) => {
  if (!("offset" in t.start))
    throw new Error("No offset available in range start");
  if (t.end && !("offset" in t.end))
    throw new Error("No offset available in range end");
  const { offset: e } = t.start;
  let r = 0;
  return t.end && ({ offset: r } = t.end), !t.end || _a(t.start, t.end) === 0 ? `${Ga(t.start)}+${e}` : `${Ga(t.start)}+${e}-${Ga(t.end)}+${r}`;
}, Un = (t) => `${rp({ start: t.start, end: t.end })} ${t.source.displayName} ${t.detail}`;
function ng({
  sources: t,
  showColumnHeaders: e = !1,
  showSourceColumn: r = !1,
  scriptureReferenceColumnName: o,
  scriptureBookGroupName: n,
  typeColumnName: s,
  detailsColumnName: i,
  onRowSelected: c,
  id: d
}) {
  const [l, w] = _([]), [p, h] = _([{ id: He, desc: !1 }]), [f, m] = _({}), x = P(
    () => t.flatMap((S) => S.data.map((D) => ({
      ...D,
      source: S.source
    }))),
    [t]
  ), g = P(
    () => ep(
      {
        scriptureReferenceColumnName: o,
        typeColumnName: s,
        detailsColumnName: i
      },
      r
    ),
    [o, s, i, r]
  );
  Z(() => {
    l.includes(or) ? h([
      { id: or, desc: !1 },
      { id: He, desc: !1 }
    ]) : h([{ id: He, desc: !1 }]);
  }, [l]);
  const T = Ci({
    data: x,
    columns: g,
    state: {
      grouping: l,
      sorting: p,
      rowSelection: f
    },
    onGroupingChange: w,
    onSortingChange: h,
    onRowSelectionChange: m,
    getExpandedRowModel: Gl(),
    getGroupedRowModel: ql(),
    getCoreRowModel: Ti(),
    getSortedRowModel: Ei(),
    getRowId: Un,
    autoResetExpanded: !1,
    enableMultiRowSelection: !1,
    enableSubRowSelection: !1
  });
  Z(() => {
    if (c) {
      const S = T.getSelectedRowModel().rowsById, D = Object.keys(S);
      if (D.length === 1) {
        const W = x.find((Y) => Un(Y) === D[0]) || void 0;
        W && c(W);
      }
    }
  }, [f, x, c, T]);
  const y = n ?? Qu, C = s ?? ls, N = [
    { label: "No Grouping", value: [] },
    { label: `Group by ${y}`, value: [He] },
    { label: `Group by ${C}`, value: [or] },
    {
      label: `Group by ${y} and ${C}`,
      value: [He, or]
    },
    {
      label: `Group by ${C} and ${y}`,
      value: [or, He]
    }
  ], A = (S) => {
    w(JSON.parse(S));
  }, B = (S, D) => {
    !S.getIsGrouped() && !S.getIsSelected() && S.getToggleSelectedHandler()(D);
  }, U = (S, D) => S.getIsGrouped() ? "" : b("banded-row", D % 2 === 0 ? "even" : "odd"), O = (S, D, W) => {
    if (!((S == null ? void 0 : S.length) === 0 || D.depth < W.column.getGroupedIndex())) {
      if (D.getIsGrouped())
        switch (D.depth) {
          case 1:
            return "tw:ps-4";
          default:
            return;
        }
      switch (D.depth) {
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
      Er,
      {
        value: JSON.stringify(l),
        onValueChange: (S) => {
          A(S);
        },
        children: [
          /* @__PURE__ */ a(Sr, { className: "tw:mb-1 tw:mt-2", children: /* @__PURE__ */ a(Tr, {}) }),
          /* @__PURE__ */ a(Rr, { position: "item-aligned", children: /* @__PURE__ */ a(au, { children: N.map((S) => /* @__PURE__ */ a(xe, { value: JSON.stringify(S.value), children: S.label }, S.label)) }) })
        ]
      }
    ),
    /* @__PURE__ */ u(Mo, { className: "tw:relative tw:flex tw:flex-col tw:overflow-y-auto tw:p-0", children: [
      e && /* @__PURE__ */ a(Oo, { children: T.getHeaderGroups().map((S) => /* @__PURE__ */ a(We, { children: S.headers.filter((D) => D.column.columnDef.header).map((D) => (
        /* For sticky column headers to work, we probably need to change the default definition of the shadcn Table component. See https://github.com/shadcn-ui/ui/issues/1151 */
        /* @__PURE__ */ a(ka, { colSpan: D.colSpan, className: "tw:sticky top-0", children: D.isPlaceholder ? void 0 : /* @__PURE__ */ u("div", { children: [
          D.column.getCanGroup() ? /* @__PURE__ */ a(
            et,
            {
              variant: "ghost",
              title: `Toggle grouping by ${D.column.columnDef.header}`,
              onClick: D.column.getToggleGroupingHandler(),
              type: "button",
              children: D.column.getIsGrouped() ? "🛑" : "👊 "
            }
          ) : void 0,
          " ",
          Lr(D.column.columnDef.header, D.getContext())
        ] }) }, D.id)
      )) }, S.id)) }),
      /* @__PURE__ */ a(Io, { children: T.getRowModel().rows.map((S, D) => {
        const W = Re();
        return /* @__PURE__ */ a(
          We,
          {
            "data-state": S.getIsSelected() ? "selected" : "",
            className: b(U(S, D)),
            onClick: (Y) => B(S, Y),
            children: S.getVisibleCells().map((Y) => {
              if (!(Y.getIsPlaceholder() || Y.column.columnDef.enableGrouping && !Y.getIsGrouped() && (Y.column.columnDef.id !== or || !r)))
                return /* @__PURE__ */ a(
                  kr,
                  {
                    className: b(
                      Y.column.columnDef.id,
                      "tw:p-[1px]",
                      O(l, S, Y)
                    ),
                    children: Y.getIsGrouped() ? /* @__PURE__ */ u(
                      et,
                      {
                        variant: "link",
                        onClick: S.getToggleExpandedHandler(),
                        type: "button",
                        children: [
                          S.getIsExpanded() && /* @__PURE__ */ a(sr, {}),
                          !S.getIsExpanded() && (W === "ltr" ? /* @__PURE__ */ a(bc, {}) : /* @__PURE__ */ a(xc, {})),
                          " ",
                          Lr(Y.column.columnDef.cell, Y.getContext()),
                          " (",
                          S.subRows.length,
                          ")"
                        ]
                      }
                    ) : Lr(Y.column.columnDef.cell, Y.getContext())
                  },
                  Y.id
                );
            })
          },
          S.id
        );
      }) })
    ] })
  ] });
}
function ap({
  availableBookInfo: t,
  selectedBookIds: e,
  onChangeSelectedBookIds: r,
  localizedStrings: o,
  localizedBookNames: n,
  disabledSectionExplanations: s
}) {
  const i = o["%webView_book_selector_books_selected%"], c = o["%webView_book_selector_select_books%"], d = o["%webView_book_selector_search_books%"], l = o["%webView_book_selector_select_all%"], w = o["%webView_book_selector_clear_all%"], p = o["%webView_book_selector_no_book_found%"], { otLong: h, ntLong: f, dcLong: m, extraLong: x } = {
    otLong: o == null ? void 0 : o["%scripture_section_ot_long%"],
    ntLong: o == null ? void 0 : o["%scripture_section_nt_long%"],
    dcLong: o == null ? void 0 : o["%scripture_section_dc_long%"],
    extraLong: o == null ? void 0 : o["%scripture_section_extra_long%"]
  }, [g, T] = _(!1), [y, C] = _(""), N = L(void 0), A = L(!1), B = P(
    () => Zn(t),
    [t]
  ), U = P(() => {
    if (!y.trim()) {
      const I = {
        [At.OT]: [],
        [At.NT]: [],
        [At.DC]: [],
        [At.Extra]: []
      };
      return B.forEach((X) => {
        const G = ua(X);
        I[G].push(X);
      }), I;
    }
    const k = B.filter(
      (I) => To(I, y, n)
    ), ot = {
      [At.OT]: [],
      [At.NT]: [],
      [At.DC]: [],
      [At.Extra]: []
    };
    return k.forEach((I) => {
      const X = ua(I);
      ot[X].push(I);
    }), ot;
  }, [B, y, n]), O = V(
    (k, ot = !1) => {
      if (!ot || !N.current) {
        r(
          e.includes(k) ? e.filter((ut) => ut !== k) : [...e, k]
        ), N.current = k;
        return;
      }
      const I = B.findIndex((ut) => ut === N.current), X = B.findIndex((ut) => ut === k);
      if (I === -1 || X === -1) return;
      const [G, $] = [
        Math.min(I, X),
        Math.max(I, X)
      ], at = B.slice(G, $ + 1).map((ut) => ut);
      r(
        e.includes(k) ? e.filter((ut) => !at.includes(ut)) : [.../* @__PURE__ */ new Set([...e, ...at])]
      );
    },
    [e, r, B]
  ), S = (k) => {
    O(k, A.current), A.current = !1;
  }, D = (k, ot) => {
    k.preventDefault(), O(ot, k.shiftKey);
  }, W = () => {
    r(B.map((k) => k));
  }, Y = () => {
    r([]);
  }, z = P(
    () => Object.values(At).filter(
      (k) => (s == null ? void 0 : s[k]) !== void 0 && zo(B, k).length === 0
    ).map((k) => ({ section: k, explanation: s == null ? void 0 : s[k] })),
    [s, B]
  );
  return /* @__PURE__ */ u(
    lr,
    {
      open: g,
      onOpenChange: (k) => {
        T(k), k || C("");
      },
      children: [
        /* @__PURE__ */ a(Dr, { asChild: !0, children: /* @__PURE__ */ u(
          et,
          {
            variant: "outline",
            role: "combobox",
            "aria-expanded": g,
            className: "tw:max-w-64 tw:justify-between",
            children: [
              e.length > 0 ? `${i}: ${e.length}` : c,
              /* @__PURE__ */ a(yc, { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
            ]
          }
        ) }),
        /* @__PURE__ */ a(
          dr,
          {
            className: "tw:max-h-(--radix-popover-content-available-height) tw:w-[500px] tw:max-w-[calc(100vw-2rem)] tw:p-0",
            align: "start",
            collisionPadding: 8,
            children: /* @__PURE__ */ u(
              wr,
              {
                className: "tw:min-h-0",
                shouldFilter: !1,
                onKeyDown: (k) => {
                  k.key === "Enter" && (A.current = k.shiftKey);
                },
                children: [
                  /* @__PURE__ */ a(
                    Ma,
                    {
                      className: "tw:shrink-0",
                      placeholder: d,
                      value: y,
                      onValueChange: C,
                      spaceSelectsHighlightedItem: !0
                    }
                  ),
                  /* @__PURE__ */ u("div", { className: "tw:flex tw:shrink-0 tw:justify-between tw:border-b tw:p-2", children: [
                    /* @__PURE__ */ a(
                      et,
                      {
                        variant: "ghost",
                        size: "sm",
                        onClick: W,
                        disabled: B.length === 0,
                        children: l
                      }
                    ),
                    /* @__PURE__ */ a(et, { variant: "ghost", size: "sm", onClick: Y, children: w })
                  ] }),
                  /* @__PURE__ */ u(ur, { className: "tw:max-h-72 tw:min-h-0 tw:flex-1", children: [
                    /* @__PURE__ */ a(Ia, { children: p }),
                    Object.values(At).filter((k) => U[k].length > 0).map((k, ot) => {
                      const I = U[k];
                      return /* @__PURE__ */ u(Yr, { children: [
                        ot > 0 && /* @__PURE__ */ a(Xn, { alwaysRender: !0 }),
                        /* @__PURE__ */ a(
                          Je,
                          {
                            heading: qn(k, h, f, m, x),
                            children: I.map((X) => /* @__PURE__ */ a(
                              Ri,
                              {
                                bookId: X,
                                isSelected: e.includes(X),
                                onSelect: () => S(X),
                                onMouseDown: (G) => D(G, X),
                                section: ua(X),
                                showCheck: !0,
                                localizedBookNames: n,
                                commandValue: bo(X, n),
                                className: "tw:flex tw:items-center"
                              },
                              X
                            ))
                          }
                        )
                      ] }, k);
                    })
                  ] }),
                  z.length > 0 && /* @__PURE__ */ a("div", { className: "tw:shrink-0 tw:border-t tw:p-2", children: z.map(({ section: k, explanation: ot }) => /* @__PURE__ */ a("p", { className: "tw:text-xs tw:text-muted-foreground", children: ot }, k)) })
                ]
              }
            )
          }
        )
      ]
    }
  );
}
function op({
  disabled: t,
  tooltipText: e,
  children: r,
  className: o
}) {
  return /* @__PURE__ */ a(Vt, { children: /* @__PURE__ */ u(bt, { children: [
    /* @__PURE__ */ a(xt, { asChild: !0, children: /* @__PURE__ */ a(
      qr,
      {
        className: o,
        isDisabled: t,
        disabledExplanation: e,
        children: r
      }
    ) }),
    t && /* @__PURE__ */ a(yt, { children: /* @__PURE__ */ a("p", { className: "tw:max-w-xs tw:whitespace-pre-line", children: e }) })
  ] }) });
}
function np({
  section: t,
  availableBookIds: e,
  selectedBookIds: r,
  onToggle: o,
  localizedStrings: n,
  disabledExplanation: s
}) {
  const i = zo(e, t).length === 0, c = n["%scripture_section_ot_short%"], d = n["%scripture_section_nt_short%"], l = n["%scripture_section_dc_short%"], w = n["%scripture_section_extra_short%"], p = /* @__PURE__ */ a(
    et,
    {
      variant: "outline",
      size: "sm",
      onClick: () => o(t),
      className: b(
        Qn(e, t, r) && !i && "tw:bg-primary tw:text-primary-foreground tw:hover:bg-primary/70 tw:hover:text-primary-foreground"
      ),
      disabled: i,
      children: Vs(
        t,
        c,
        d,
        l,
        w
      )
    }
  );
  return s ? /* @__PURE__ */ a(
    op,
    {
      className: "tw:flex",
      disabled: i,
      tooltipText: s,
      children: p
    }
  ) : p;
}
const Kn = 5, io = 6;
function ip({
  availableBookInfo: t,
  selectedBookIds: e,
  onChangeSelectedBookIds: r,
  localizedStrings: o,
  localizedBookNames: n,
  disabledSectionExplanations: s
}) {
  const i = o["%webView_book_selector_more%"], c = P(
    () => Zn(t),
    [t]
  ), d = V(
    (l) => {
      const w = zo(c, l).map((p) => p);
      r(
        Qn(c, l, e) ? e.filter((p) => !w.includes(p)) : [.../* @__PURE__ */ new Set([...e, ...w])]
      );
    },
    [e, r, c]
  );
  return /* @__PURE__ */ u("div", { className: "tw:space-y-2", children: [
    /* @__PURE__ */ a("div", { className: "tw:flex tw:flex-wrap tw:gap-2", children: Object.values(At).map((l) => /* @__PURE__ */ a(
      np,
      {
        section: l,
        availableBookIds: c,
        selectedBookIds: e,
        onToggle: d,
        localizedStrings: o,
        disabledExplanation: s == null ? void 0 : s[l]
      },
      l
    )) }),
    /* @__PURE__ */ a(
      ap,
      {
        availableBookInfo: t,
        selectedBookIds: e,
        onChangeSelectedBookIds: r,
        localizedStrings: o,
        localizedBookNames: n,
        disabledSectionExplanations: s
      }
    ),
    e.length > 0 && /* @__PURE__ */ u("div", { className: "tw:mt-2 tw:flex tw:flex-wrap tw:gap-1", children: [
      e.slice(
        0,
        e.length === io ? io : Kn
      ).map((l) => /* @__PURE__ */ a(Fr, { className: "tw:hover:bg-secondary", variant: "secondary", children: Ae(l, n) }, l)),
      e.length > io && /* @__PURE__ */ a(
        Fr,
        {
          className: "tw:hover:bg-secondary",
          variant: "secondary",
          children: `+${e.length - Kn} ${i}`
        }
      )
    ] })
  ] });
}
const sp = Object.freeze([
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
]), ig = Object.freeze([
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
  ...sp
]), Ut = (t, e) => t[e] ?? e, cp = Object.freeze([" ", "-"]);
function sg({
  scope: t,
  availableScopes: e,
  onScopeChange: r,
  availableBookInfo: o,
  selectedBookIds: n,
  onSelectedBookIdsChange: s,
  localizedStrings: i,
  localizedBookNames: c,
  disabledSectionExplanations: d,
  disabledScopeExplanations: l,
  id: w,
  variant: p = "radio",
  rangeStart: h,
  rangeEnd: f,
  onRangeStartChange: m,
  onRangeEndChange: x,
  currentScrRef: g,
  onCurrentScrRefChange: T,
  bookChapterControlLocalizedStrings: y,
  getEndVerse: C,
  hideLabel: N = !1,
  buttonClassName: A
}) {
  const B = Ut(
    i,
    "%webView_scope_selector_selected_text%"
  ), U = Ut(i, "%webView_scope_selector_verse%"), O = Ut(i, "%webView_scope_selector_chapter%"), S = Ut(i, "%webView_scope_selector_book%"), D = Ut(
    i,
    "%webView_scope_selector_current_verse%"
  ), W = Ut(
    i,
    "%webView_scope_selector_current_chapter%"
  ), Y = Ut(i, "%webView_scope_selector_current_book%"), z = Ut(i, "%webView_scope_selector_choose_books%"), k = Ut(i, "%webView_scope_selector_scope%"), ot = Ut(i, "%webView_scope_selector_select_books%"), I = Ut(i, "%webView_scope_selector_range%"), X = Ut(i, "%webView_scope_selector_select_range%"), G = Ut(i, "%webView_scope_selector_range_start%"), $ = Ut(i, "%webView_scope_selector_range_end%"), at = Ut(i, "%webView_scope_selector_ok%"), ut = Ut(i, "%webView_scope_selector_cancel%"), dt = Ut(i, "%webView_scope_selector_navigate%"), tt = (F) => {
    if (!g) return;
    const rt = g.book.toUpperCase();
    switch (F) {
      case "verse":
        return $e(g, "id");
      case "chapter":
        return `${rt} ${g.chapterNum}`;
      case "book":
        return rt;
      default:
        return;
    }
  }, pt = [
    { value: "selectedText", label: B, id: "scope-selected-text" },
    {
      value: "verse",
      label: U,
      dropdownLabel: D,
      scrRefSuffix: tt("verse"),
      id: "scope-verse"
    },
    {
      value: "chapter",
      label: O,
      dropdownLabel: W,
      scrRefSuffix: tt("chapter"),
      id: "scope-chapter"
    },
    {
      value: "book",
      label: S,
      dropdownLabel: Y,
      scrRefSuffix: tt("book"),
      id: "scope-book"
    },
    { value: "selectedBooks", label: z, id: "scope-selected" },
    { value: "range", label: I, id: "scope-range" }
  ], kt = (F, rt, Lt = !1) => /* @__PURE__ */ u(gt, { children: [
    F,
    rt && !Lt && /* @__PURE__ */ u("span", { className: "tw:text-muted-foreground", children: [
      ": ",
      rt
    ] })
  ] }), mt = e ? pt.filter((F) => e.includes(F.value)) : pt, Rt = g ?? Wa, jt = h ?? Rt, Pt = f ?? Rt, ge = () => {
  }, we = L(null), _t = L(null), Nt = L(!1), Et = L(null), oe = L(!1), [fe, Dt] = _(void 0), Mt = L(!1), ne = L(!1), ke = L(null), me = V((F) => {
    if (F) {
      Dt("start"), Mt.current = !1;
      return;
    }
    Dt((rt) => rt === "start" ? void 0 : rt), Mt.current && (Mt.current = !1, requestAnimationFrame(() => {
      var Lt;
      const rt = (Lt = we.current) == null ? void 0 : Lt.querySelector("button");
      rt == null || rt.click();
    }));
  }, []), Oe = V((F) => {
    if (F) {
      Dt("end"), ne.current = !1;
      return;
    }
    Dt((rt) => rt === "end" ? void 0 : rt);
  }, []), le = V(
    (F) => {
      m == null || m(F), x == null || x(F), Mt.current = !0;
    },
    [m, x]
  ), Yt = V(
    (F) => {
      x == null || x(F), ne.current = !0;
    },
    [x]
  ), Xt = V(
    (F) => {
      r(F), F === "selectedBooks" && n.length === 0 && (g != null && g.book) && s([g.book]);
    },
    [r, n, g, s]
  ), Jt = mt.find((F) => F.value === t), Ie = () => t === "selectedBooks" && n.length > 0 ? n.map((F) => F.toUpperCase()).join(", ") : t === "range" ? Pc(jt, Pt, {
    optionOrLocalizedBookName: "id",
    endRefOptionOrLocalizedBookName: "id",
    repeatBookName: !0
  }) : Jt ? kt(Jt.label, Jt.scrRefSuffix) : t, M = mt.filter(
    (F) => F.value !== "selectedBooks" && F.value !== "range"
  ), Ot = mt.find((F) => F.value === "selectedBooks"), qt = mt.find((F) => F.value === "range"), [It, R] = _(!1), [K, J] = _(void 0), [H, Q] = _(void 0), [j, nt] = _(void 0), [st, it] = _(void 0), [vt, Ct] = _([]), Tt = p === "dropdown" && K === "selectedBooks", Gt = /* @__PURE__ */ a(
    ip,
    {
      availableBookInfo: o,
      selectedBookIds: Tt ? vt : n,
      onChangeSelectedBookIds: Tt ? Ct : s,
      localizedStrings: i,
      localizedBookNames: c,
      disabledSectionExplanations: d
    }
  ), rr = fe === "end", Ue = fe === "start", ze = "tw:text-muted-foreground", _e = p === "dropdown" && K === "range", hr = _e ? nt : le, gr = _e ? it : x ? Yt : ge, E = /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-wrap tw:items-end tw:gap-4", children: [
    /* @__PURE__ */ u("div", { className: "tw:grid tw:gap-2", children: [
      /* @__PURE__ */ a($t, { htmlFor: "scope-range-start", className: b(rr && ze), children: G }),
      /* @__PURE__ */ a(
        Xa,
        {
          id: "scope-range-start",
          scrRef: _e ? j ?? jt : jt,
          handleSubmit: hr,
          localizedBookNames: c,
          localizedStrings: y,
          getEndVerse: C,
          submitKeys: cp,
          onOpenChange: me,
          className: b(rr && ze),
          modal: !0
        }
      )
    ] }),
    /* @__PURE__ */ u("div", { ref: we, className: "tw:grid tw:gap-2", children: [
      /* @__PURE__ */ a($t, { htmlFor: "scope-range-end", className: b(Ue && ze), children: $ }),
      /* @__PURE__ */ a(
        Xa,
        {
          id: "scope-range-end",
          scrRef: _e ? st ?? Pt : Pt,
          handleSubmit: gr,
          localizedBookNames: c,
          localizedStrings: y,
          getEndVerse: C,
          disableReferencesUpTo: _e ? j ?? jt : jt,
          onOpenChange: Oe,
          onCloseAutoFocus: (F) => {
            var rt;
            ne.current && (ne.current = !1, F.preventDefault(), (rt = ke.current) == null || rt.focus());
          },
          className: b(Ue && ze),
          modal: !0,
          align: "start"
        }
      )
    ] })
  ] }), ct = L({}), wt = V(
    (F) => (rt) => {
      ct.current[F] = rt;
    },
    []
  ), zt = L(null);
  Z(() => {
    if (!It) return;
    let F = 0;
    const rt = requestAnimationFrame(() => {
      F = requestAnimationFrame(() => {
        var Lt;
        (Lt = ct.current[t]) == null || Lt.focus();
      });
    });
    return () => {
      cancelAnimationFrame(rt), F && cancelAnimationFrame(F);
    };
  }, [It, t]);
  const [Ke, ja] = _(null), [Pe, fr] = _(null), [mr, Fa] = _(null), Qr = 200, [Ua, ta] = _(!1);
  Z(() => {
    if (!mr || typeof ResizeObserver > "u") return;
    const F = new ResizeObserver(([rt]) => {
      ta(rt.contentRect.width < Qr);
    });
    return F.observe(mr), () => F.disconnect();
  }, [mr]);
  const ea = V(
    (F) => {
      Q(F), nt(jt), it(Pt), Ct(n), R(!1), J(F);
    },
    [jt, Pt, n]
  ), ra = V(() => {
    H !== void 0 && (H === "range" ? (j && (m == null || m(j)), st && (x == null || x(st))) : H === "selectedBooks" && s(vt), Xt(H), J(void 0), Q(void 0));
  }, [
    H,
    j,
    st,
    vt,
    m,
    x,
    s,
    Xt
  ]), vr = V((F) => {
    F || (J(void 0), Q(void 0));
  }, []), aa = V((F) => {
    var rt;
    F.preventDefault(), (rt = zt.current) == null || rt.focus();
  }, []), oa = (F) => t === F ? /* @__PURE__ */ a("span", { className: "tw:absolute tw:flex tw:h-3.5 tw:w-3.5 tw:items-center tw:justify-center tw:ltr:left-2 tw:rtl:right-2", children: /* @__PURE__ */ a(Ze, { className: "tw:h-4 tw:w-4" }) }) : void 0;
  return /* @__PURE__ */ u("div", { id: w, className: "tw:grid tw:gap-4", children: [
    /* @__PURE__ */ u("div", { className: "tw:grid tw:gap-2", children: [
      !N && /* @__PURE__ */ a($t, { children: k }),
      p === "dropdown" ? /* @__PURE__ */ u(Be, { open: It, onOpenChange: R, children: [
        /* @__PURE__ */ a(Ee, { asChild: !0, children: /* @__PURE__ */ u(
          et,
          {
            ref: zt,
            variant: "outline",
            role: "combobox",
            className: b(
              "tw:w-full tw:justify-between tw:overflow-hidden tw:font-normal",
              A
            ),
            children: [
              /* @__PURE__ */ a("span", { className: "tw:min-w-0 tw:flex-1 tw:truncate tw:text-start", children: Ie() }),
              /* @__PURE__ */ a(sr, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
            ]
          }
        ) }),
        /* @__PURE__ */ a(
          je,
          {
            ref: Fa,
            className: "tw:w-[var(--radix-dropdown-menu-trigger-width)] tw:min-w-[12rem]",
            align: "start",
            children: /* @__PURE__ */ u(Ha, { container: mr, children: [
              M.map(({ value: F, label: rt, dropdownLabel: Lt, scrRefSuffix: ue, id: ve }) => {
                const v = l == null ? void 0 : l[F];
                return /* @__PURE__ */ u(
                  Ge,
                  {
                    ref: wt(F),
                    disabled: !!v,
                    className: "tw:relative tw:ps-8 data-[highlighted]:tw:bg-accent data-[highlighted]:tw:text-accent-foreground",
                    onSelect: () => Xt(F),
                    "data-selected": t === F ? "true" : void 0,
                    children: [
                      t === F && /* @__PURE__ */ a("span", { className: "tw:absolute tw:flex tw:h-3.5 tw:w-3.5 tw:items-center tw:justify-center tw:ltr:left-2 tw:rtl:right-2", children: /* @__PURE__ */ a(Ze, { className: "tw:h-4 tw:w-4" }) }),
                      /* @__PURE__ */ u("span", { className: "tw:flex tw:min-w-0 tw:flex-col tw:gap-0.5", children: [
                        /* @__PURE__ */ a("span", { className: "tw:flex tw:items-center tw:gap-1.5", children: kt(Lt ?? rt, ue, Ua) }),
                        v && /* @__PURE__ */ a("span", { className: "tw:text-xs tw:whitespace-normal tw:text-foreground", children: v })
                      ] })
                    ]
                  },
                  ve
                );
              }),
              (Ot || qt) && /* @__PURE__ */ a(ir, {}),
              Ot && /* @__PURE__ */ u(
                Ge,
                {
                  ref: wt("selectedBooks"),
                  className: b(
                    "tw:relative tw:ps-8",
                    "data-[highlighted]:tw:bg-accent data-[highlighted]:tw:text-accent-foreground"
                  ),
                  onSelect: () => ea("selectedBooks"),
                  "data-selected": t === "selectedBooks" ? "true" : void 0,
                  children: [
                    oa("selectedBooks"),
                    `${Ot.label}…`
                  ]
                }
              ),
              qt && /* @__PURE__ */ u(
                Ge,
                {
                  ref: wt("range"),
                  className: b(
                    "tw:relative tw:ps-8",
                    "data-[highlighted]:tw:bg-accent data-[highlighted]:tw:text-accent-foreground"
                  ),
                  onSelect: () => ea("range"),
                  "data-selected": t === "range" ? "true" : void 0,
                  children: [
                    oa("range"),
                    `${qt.label}…`
                  ]
                }
              ),
              T && /* @__PURE__ */ u(gt, { children: [
                /* @__PURE__ */ a(ir, {}),
                /* @__PURE__ */ a(cr, { className: "tw:px-2 tw:py-1.5 tw:text-xs tw:font-medium tw:text-muted-foreground", children: dt }),
                /* @__PURE__ */ a(
                  Ge,
                  {
                    ref: Et,
                    className: "tw:p-0",
                    onSelect: (F) => {
                      var rt, Lt;
                      if (F.preventDefault(), Nt.current) {
                        Nt.current = !1;
                        return;
                      }
                      oe.current || (Lt = (rt = _t.current) == null ? void 0 : rt.querySelector("button")) == null || Lt.click();
                    },
                    children: /* @__PURE__ */ a(
                      "div",
                      {
                        ref: _t,
                        className: "tw:w-full tw:px-1 tw:pb-1",
                        onPointerDownCapture: (F) => {
                          const rt = F.target instanceof HTMLElement ? F.target : void 0;
                          rt != null && rt.closest("button") && (Nt.current = !0, requestAnimationFrame(() => {
                            Nt.current = !1;
                          }));
                        },
                        children: /* @__PURE__ */ a(
                          Xa,
                          {
                            id: "scope-navigate",
                            scrRef: g ?? Wa,
                            handleSubmit: T,
                            localizedBookNames: c,
                            localizedStrings: y,
                            getEndVerse: C,
                            triggerVariant: "ghost",
                            onOpenChange: (F) => {
                              oe.current = F;
                            },
                            onCloseAutoFocus: (F) => {
                              var rt;
                              F.preventDefault(), (rt = Et.current) == null || rt.focus();
                            },
                            modal: !0,
                            className: "tw:w-full tw:min-w-0 tw:max-w-none tw:justify-between tw:px-2 tw:font-normal",
                            triggerContent: /* @__PURE__ */ u(gt, { children: [
                              /* @__PURE__ */ a("span", { className: "tw:min-w-0 tw:flex-1 tw:truncate tw:text-start", children: $e(g ?? Wa, "id") }),
                              /* @__PURE__ */ a(sr, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
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
        Ro,
        {
          value: t,
          onValueChange: Xt,
          className: "tw:flex tw:flex-col tw:space-y-1",
          children: mt.map(({ value: F, label: rt, scrRefSuffix: Lt, id: ue }) => {
            const ve = l == null ? void 0 : l[F];
            return /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:gap-0.5", children: [
              /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center", children: [
                /* @__PURE__ */ a(
                  ya,
                  {
                    className: "tw:me-2",
                    value: F,
                    id: ue,
                    disabled: !!ve,
                    "aria-describedby": ve ? `${ue}-explanation` : void 0
                  }
                ),
                /* @__PURE__ */ a($t, { htmlFor: ue, children: kt(rt, Lt) })
              ] }),
              ve && // Indented to clear the radio so it reads as belonging to this row's label.
              /* @__PURE__ */ a(
                "span",
                {
                  id: `${ue}-explanation`,
                  className: "tw:ms-6 tw:text-xs tw:whitespace-normal tw:text-muted-foreground",
                  children: ve
                }
              )
            ] }, ue);
          })
        }
      )
    ] }),
    p === "radio" && t === "selectedBooks" && /* @__PURE__ */ u("div", { className: "tw:grid tw:gap-2", children: [
      /* @__PURE__ */ a($t, { children: ot }),
      Gt
    ] }),
    p === "radio" && t === "range" && E,
    p === "dropdown" && Ot && /* @__PURE__ */ a(so, { open: K === "selectedBooks", onOpenChange: vr, children: /* @__PURE__ */ a(
      co,
      {
        ref: fr,
        onCloseAutoFocus: aa,
        onEscapeKeyDown: (F) => {
          Pe != null && Pe.querySelector('[data-state="open"]') && F.preventDefault();
        },
        children: /* @__PURE__ */ u(Ha, { container: Pe, children: [
          /* @__PURE__ */ a(lo, { className: "tw:pe-8", children: /* @__PURE__ */ a(wo, { children: z }) }),
          Gt,
          /* @__PURE__ */ u(rn, { children: [
            /* @__PURE__ */ a(et, { variant: "outline", onClick: () => vr(!1), children: ut }),
            /* @__PURE__ */ a(et, { onClick: ra, children: at })
          ] })
        ] })
      }
    ) }),
    p === "dropdown" && qt && /* @__PURE__ */ a(so, { open: K === "range", onOpenChange: vr, children: /* @__PURE__ */ a(
      co,
      {
        ref: ja,
        onCloseAutoFocus: aa,
        onEscapeKeyDown: (F) => {
          Ke != null && Ke.querySelector('[data-state="open"]') && F.preventDefault();
        },
        children: /* @__PURE__ */ u(Ha, { container: Ke, children: [
          /* @__PURE__ */ a(lo, { className: "tw:pe-8", children: /* @__PURE__ */ a(wo, { children: X }) }),
          E,
          /* @__PURE__ */ u(rn, { children: [
            /* @__PURE__ */ a(et, { variant: "outline", onClick: () => vr(!1), children: ut }),
            /* @__PURE__ */ a(et, { ref: ke, onClick: ra, children: at })
          ] })
        ] })
      }
    ) })
  ] });
}
function cg({
  availableScrollGroupIds: t,
  scrollGroupId: e,
  onChangeScrollGroupId: r,
  localizedStrings: o = {},
  size: n = "sm",
  className: s,
  id: i,
  disabled: c
}) {
  const d = {
    ...qa,
    ...Object.fromEntries(
      Object.entries(o).map(
        ([w, p]) => [
          w,
          w === p && w in qa ? qa[w] : p
        ]
      )
    )
  }, l = Re();
  return /* @__PURE__ */ u(
    Er,
    {
      value: `${e}`,
      onValueChange: (w) => r(
        w === "undefined" ? void 0 : parseInt(w, 10)
      ),
      disabled: c,
      children: [
        /* @__PURE__ */ a(Sr, { size: n, className: b("pr-twp tw:w-auto", s), children: /* @__PURE__ */ a(
          Tr,
          {
            placeholder: d[ln(e)] ?? e
          }
        ) }),
        /* @__PURE__ */ a(
          Rr,
          {
            id: i,
            align: l === "rtl" ? "end" : "start",
            style: { zIndex: Fe },
            children: t.map((w) => /* @__PURE__ */ a(xe, { value: `${w}`, children: d[ln(w)] }, `${w}`))
          }
        )
      ]
    }
  );
}
function lg({ children: t }) {
  return /* @__PURE__ */ a("div", { className: "pr-twp tw:grid", children: t });
}
function dg({
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
function wg({
  primary: t,
  secondary: e,
  includeSeparator: r = !1
}) {
  return /* @__PURE__ */ u("div", { className: "tw:space-y-4 tw:py-2", children: [
    /* @__PURE__ */ u("div", { children: [
      /* @__PURE__ */ a("h3", { className: "tw:text-lg tw:font-medium", children: t }),
      /* @__PURE__ */ a("p", { className: "tw:text-sm tw:text-muted-foreground", children: e })
    ] }),
    r ? /* @__PURE__ */ a(Ur, {}) : ""
  ] });
}
function ds(t, e) {
  var r;
  return (r = Object.entries(t).find(
    ([, o]) => "menuItem" in o && o.menuItem === e
  )) == null ? void 0 : r[0];
}
function ws(t) {
  return Object.entries(t).flatMap(([e, r]) => typeof r == "object" ? [{ columnKey: e, column: r }] : []).sort((e, r) => e.column.order - r.column.order);
}
function us(t, e, r) {
  return "column" in e && e.column === r || t === r;
}
function lp(t) {
  const e = new Set(t.items.map((o) => o.group)), r = Object.entries(t.groups).filter(
    ([o]) => e.has(o)
  );
  return ws(t.columns).filter(
    ({ columnKey: o }) => r.some(
      ([n, s]) => us(n, s, o)
    )
  ).map(({ columnKey: o, column: n }) => ({ columnKey: o, label: n.label }));
}
function Da({ icon: t, menuLabel: e, leading: r }) {
  return t ? /* @__PURE__ */ a(
    "img",
    {
      className: b("tw:max-h-5 tw:max-w-5", r ? "tw:me-2" : "tw:ms-2"),
      src: t,
      alt: `${r ? "Leading" : "Trailing"} icon for ${e}`
    }
  ) : void 0;
}
const ps = (t, e, r, o) => r ? Object.entries(t).filter(([s, i]) => us(s, i, r)).sort(([, s], [, i]) => s.order - i.order).flatMap(([s]) => e.filter((c) => c.group === s).sort((c, d) => c.order - d.order).map((c) => /* @__PURE__ */ u(bt, { children: [
  /* @__PURE__ */ a(xt, { asChild: !0, children: "command" in c ? /* @__PURE__ */ u(
    Ge,
    {
      onClick: () => {
        o(c);
      },
      children: [
        c.iconPathBefore && /* @__PURE__ */ a(Da, { icon: c.iconPathBefore, menuLabel: c.label, leading: !0 }),
        c.label,
        c.iconPathAfter && /* @__PURE__ */ a(Da, { icon: c.iconPathAfter, menuLabel: c.label }),
        c.shortcut && /* @__PURE__ */ a(Ls, { children: c.shortcut })
      ]
    },
    `dropdown-menu-item-${c.label}-${c.command}`
  ) : /* @__PURE__ */ u(Bs, { children: [
    /* @__PURE__ */ a(js, { children: c.label }),
    /* @__PURE__ */ a(Fs, { children: /* @__PURE__ */ a(Us, { children: ps(
      t,
      e,
      ds(t, c.id),
      o
    ) }) })
  ] }, `dropdown-menu-sub-${c.label}-${c.id}`) }),
  c.tooltip && /* @__PURE__ */ a(yt, { children: c.tooltip })
] }, `tooltip-${c.label}-${"command" in c ? c.command : c.id}`))) : void 0;
function Eo({
  onSelectMenuItem: t,
  menuData: e,
  tabLabel: r,
  icon: o,
  className: n,
  showSectionHeadings: s = !1,
  variant: i,
  buttonVariant: c = "ghost",
  id: d
}) {
  const l = Na(), w = lp(e), p = s && w.length > 1;
  return /* @__PURE__ */ u(Be, { variant: i, children: [
    /* @__PURE__ */ a(Ee, { "aria-label": r, className: n, asChild: !0, id: d, children: /* @__PURE__ */ a(et, { variant: c, size: "icon", children: o ?? /* @__PURE__ */ a(kc, {}) }) }),
    /* @__PURE__ */ a(je, { align: "start", style: { zIndex: Fe }, children: w.map(({ columnKey: h, label: f }, m) => {
      const x = `${l}-${h}`;
      return /* @__PURE__ */ u(Yr, { children: [
        /* @__PURE__ */ u(Wn, { "aria-labelledby": p ? x : void 0, children: [
          p && /* @__PURE__ */ a(cr, { id: x, children: f }),
          /* @__PURE__ */ a(Vt, { children: ps(e.groups, e.items, h, t) })
        ] }),
        m < w.length - 1 && /* @__PURE__ */ a(ir, {})
      ] }, h);
    }) })
  ] });
}
const dp = 8;
function wp(t, e, r) {
  const o = e.findIndex((i) => t >= i), n = o === -1 ? e.length : o;
  if (r === void 0 || n >= r) return n;
  const s = e.findIndex(
    (i) => t >= i + dp
  );
  return s === -1 ? r : Math.min(r, s);
}
function hs(t, e) {
  const [r, o] = _(0), n = L(void 0);
  return re(() => {
    if (!t || typeof ResizeObserver > "u") return;
    const s = () => {
      const { width: c } = t.getBoundingClientRect(), d = n.current;
      n.current = c;
      const l = d === void 0 || d === 0;
      o(
        (w) => wp(c, e, l ? void 0 : w)
      );
    };
    s();
    const i = new ResizeObserver(s);
    return i.observe(t), () => i.disconnect();
  }, [t, e]), r;
}
const up = Object.freeze([520, 420, 340]), gs = ee.forwardRef(
  ({ id: t, className: e, children: r }, o) => {
    const [n, s] = _(void 0), i = L(o);
    i.current = o;
    const c = V((p) => {
      s(p ?? void 0);
      const h = i.current;
      typeof h == "function" ? h(p) : h && (h.current = p);
    }, []), d = hs(n, up), l = Mi() ?? d, w = l >= Br.MINIMUM;
    return /* @__PURE__ */ a($a.Provider, { value: l, children: /* @__PURE__ */ a(
      "div",
      {
        ref: c,
        className: b(
          "tw:sticky tw:top-0 tw:box-border tw:h-14 tw:items-center tw:justify-between tw:overflow-clip tw:py-2 tw:text-foreground tw:@container/toolbar",
          w ? "tw:gap-1 tw:px-2" : "tw:gap-2 tw:px-4",
          e,
          // Last, so it survives `cn()`. Everything above is a default a consumer may override,
          // but the flex row is structure this container owns: the zones below it are flex items
          // that shrink and grow against each other, and none of that exists under any other
          // `display`. `cn()` resolves Tailwind conflicts last-wins, so a consumer passing any
          // display utility in `className` would otherwise take `display: flex` away and stack the
          // zones vertically inside a fixed-height, `overflow-clip` row.
          "tw:flex tw:flex-row"
        ),
        id: t,
        children: r
      }
    ) });
  }
);
function ug({
  onSelectProjectMenuItem: t,
  onSelectViewInfoMenuItem: e,
  projectMenuData: r,
  tabViewMenuData: o,
  id: n,
  className: s,
  startAreaChildren: i,
  centerAreaChildren: c,
  endAreaChildren: d,
  menuButtonIcon: l
}) {
  return /* @__PURE__ */ u(gs, { className: `tw:w-full tw:border-b ${s}`, id: n, children: [
    r && /* @__PURE__ */ a(
      Eo,
      {
        onSelectMenuItem: t,
        menuData: r,
        tabLabel: "Project",
        icon: l ?? /* @__PURE__ */ a(_c, {}),
        buttonVariant: "ghost",
        showSectionHeadings: !0
      }
    ),
    i && /* @__PURE__ */ a("div", { className: "tw:flex tw:min-w-0 tw:shrink tw:grow-[10] tw:flex-row tw:flex-nowrap tw:items-start tw:gap-x-1 tw:gap-y-2 tw:overflow-clip", children: i }),
    c && /* @__PURE__ */ a("div", { className: "tw:flex tw:shrink tw:grow-[1] tw:basis-0 tw:flex-row tw:flex-nowrap tw:items-start tw:justify-center tw:gap-x-1 tw:gap-y-2 tw:overflow-clip tw:@sm:basis-auto", children: c }),
    /* @__PURE__ */ u("div", { className: "tw:flex tw:shrink-0 tw:grow-[1] tw:flex-row-reverse tw:flex-nowrap tw:items-start tw:gap-x-1 tw:gap-y-2 tw:overflow-clip", children: [
      o && /* @__PURE__ */ a(
        Eo,
        {
          onSelectMenuItem: e,
          menuData: o,
          tabLabel: "View Info",
          icon: /* @__PURE__ */ a(Nc, {}),
          className: "tw:h-full",
          showSectionHeadings: !0
        }
      ),
      d
    ] })
  ] });
}
function pg({
  onSelectProjectMenuItem: t,
  projectMenuData: e,
  id: r,
  className: o,
  menuButtonIcon: n
}) {
  return /* @__PURE__ */ a(gs, { className: "tw:pointer-events-none", id: r, children: e && /* @__PURE__ */ a(
    Eo,
    {
      onSelectMenuItem: t,
      menuData: e,
      tabLabel: "Project",
      icon: n,
      className: `tw:pointer-events-auto tw:shadow-lg ${o}`,
      buttonVariant: "outline",
      showSectionHeadings: !0
    }
  ) });
}
const fs = ee.forwardRef(({ className: t, ...e }, r) => {
  const o = Re();
  return /* @__PURE__ */ a(
    ye.Root,
    {
      orientation: "vertical",
      ref: r,
      className: b("tw:flex tw:gap-1 tw:rounded-md tw:text-muted-foreground", t),
      ...e,
      dir: o
    }
  );
});
fs.displayName = ye.List.displayName;
const ms = ee.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ a(
  ye.List,
  {
    ref: r,
    className: b(
      "tw:flex tw:items-center tw:w-[124px] tw:justify-center tw:rounded-md tw:bg-muted tw:p-1 tw:text-muted-foreground",
      t
    ),
    ...e
  }
));
ms.displayName = ye.List.displayName;
const pp = ee.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ a(
  ye.Trigger,
  {
    ref: r,
    ...e,
    className: b(
      "tw:inline-flex tw:w-[116px] tw:cursor-pointer tw:items-center tw:justify-center tw:break-words tw:rounded-sm tw:border-0 tw:bg-muted tw:px-3 tw:py-1.5 tw:text-sm tw:font-medium tw:text-inherit tw:ring-offset-background tw:transition-all tw:hover:text-foreground tw:focus-visible:outline-hidden tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2 tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:data-[state=active]:bg-background tw:data-[state=active]:text-foreground tw:data-[state=active]:shadow-sm tw:overflow-clip",
      t
    )
  }
)), vs = ee.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ a(
  ye.Content,
  {
    ref: r,
    className: b(
      // Removed tw:mt-2 because Sebastian said so
      "tw:ms-5 tw:flex-grow tw:text-foreground tw:ring-offset-background tw:focus-visible:outline-hidden tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2",
      t
    ),
    ...e
  }
));
vs.displayName = ye.Content.displayName;
function hg({
  tabList: t,
  searchValue: e,
  onSearch: r,
  searchPlaceholder: o,
  headerTitle: n,
  searchClassName: s,
  id: i
}) {
  return /* @__PURE__ */ u("div", { id: i, className: "pr-twp", children: [
    /* @__PURE__ */ u("div", { className: "tw:sticky tw:top-0 tw:space-y-2 tw:pb-2", children: [
      n ? /* @__PURE__ */ a("h1", { children: n }) : "",
      /* @__PURE__ */ a(
        Jn,
        {
          className: s,
          value: e,
          onSearch: r,
          placeholder: o
        }
      )
    ] }),
    /* @__PURE__ */ u(fs, { children: [
      /* @__PURE__ */ a(ms, { children: t.map((c) => /* @__PURE__ */ a(pp, { value: c.value, children: c.value }, c.key)) }),
      t.map((c) => /* @__PURE__ */ a(vs, { value: c.value, children: c.content }, c.key))
    ] })
  ] });
}
function hp({
  className: t,
  // CUSTOM: Added variant prop to allow callers to apply visual style variants to all menu items
  variant: e = "default",
  ...r
}) {
  const o = ee.useMemo(
    () => ({
      variant: e
    }),
    [e]
  );
  return /* @__PURE__ */ a(Ks.Provider, { value: o, children: /* @__PURE__ */ a(
    De.Root,
    {
      "data-slot": "menubar",
      className: b(
        "tw:flex tw:h-8 tw:items-center tw:gap-0.5 tw:rounded-lg tw:border tw:p-[3px]",
        t
      ),
      ...r
    }
  ) });
}
function gp({ ...t }) {
  return /* @__PURE__ */ a(De.Menu, { "data-slot": "menubar-menu", ...t });
}
function fp({ ...t }) {
  return /* @__PURE__ */ a(De.Portal, { "data-slot": "menubar-portal", ...t });
}
function mp({
  className: t,
  ...e
}) {
  const r = Gr();
  return /* @__PURE__ */ a(
    De.Trigger,
    {
      "data-slot": "menubar-trigger",
      className: b(
        "tw:flex tw:items-center tw:rounded-sm tw:px-1.5 tw:py-[2px] tw:text-sm tw:font-medium tw:outline-hidden tw:select-none tw:hover:bg-muted tw:aria-expanded:bg-muted",
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation (portal-rendered content needs this)
        "pr-twp",
        // CUSTOM: Apply variant-driven styles from menu context
        Po({ variant: r.variant, className: t })
      ),
      ...e
    }
  );
}
function vp({
  className: t,
  align: e = "start",
  alignOffset: r = -4,
  sideOffset: o = 8,
  // CUSTOM: Pull `style` out so the shared z-index can be applied under any caller-supplied style
  style: n,
  ...s
}) {
  const i = Gr();
  return /* @__PURE__ */ a(fp, { children: /* @__PURE__ */ a(
    De.Content,
    {
      "data-slot": "menubar-content",
      align: e,
      alignOffset: r,
      sideOffset: o,
      className: b(
        // CUSTOM: Fixed tw: prefix not being on some classes and removed erroneous empty tw: tokens
        // CUSTOM: Removed tw:z-50 to use the shared z-index constant below (see style prop)
        "tw:min-w-36 tw:origin-(--radix-menubar-content-transform-origin) tw:overflow-hidden tw:rounded-lg tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:animate-none! tw:bg-popover/70 tw:before:-z-1 tw:**:data-[slot$=-item]:focus:bg-foreground/10 tw:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 tw:**:data-[slot$=-separator]:bg-foreground/5 tw:**:data-[slot$=-trigger]:focus:bg-foreground/10 tw:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! tw:**:data-[variant=destructive]:focus:bg-foreground/10! tw:**:data-[variant=destructive]:text-accent-foreground! tw:**:data-[variant=destructive]:**:text-accent-foreground! tw:relative tw:before:pointer-events-none tw:before:absolute tw:before:inset-0 tw:before:rounded-[inherit] tw:before:backdrop-blur-2xl tw:before:backdrop-saturate-150",
        // CUSTOM: Added pr-twp to reset styles so that only shadcn styles are applied (portal-rendered content needs this)
        "pr-twp",
        // CUSTOM: Apply muted background when variant is muted
        {
          "tw:bg-popover": i.variant === "muted"
        },
        t
      ),
      style: { zIndex: Fe, ...n },
      ...s
    }
  ) });
}
function bp({
  className: t,
  inset: e,
  variant: r = "default",
  ...o
}) {
  const n = Gr();
  return /* @__PURE__ */ a(
    De.Item,
    {
      "data-slot": "menubar-item",
      "data-inset": e,
      "data-variant": r,
      className: b(
        "tw:group/menubar-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-[variant=destructive]:text-destructive tw:data-[variant=destructive]:focus:bg-destructive/10 tw:data-[variant=destructive]:focus:text-destructive tw:dark:data-[variant=destructive]:focus:bg-destructive/20 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:data-[variant=destructive]:*:[svg]:text-destructive!",
        // CUSTOM: Apply variant-driven styles from menu context
        Po({ variant: n.variant, className: t })
      ),
      ...o
    }
  );
}
function xp({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    De.Separator,
    {
      "data-slot": "menubar-separator",
      className: b("tw:-mx-1 tw:my-1 tw:h-px tw:bg-border", t),
      ...e
    }
  );
}
function yp({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "span",
    {
      "data-slot": "menubar-shortcut",
      className: b(
        // CUSTOM: Added tw:[unicode-bidi:plaintext] so the hint takes its direction from its first
        // letter, keeping macOS symbols in order (⌃F, not F⌃) in RTL menus. Unlike dir="ltr", it
        // keeps the span's direction, so tw:ms-auto still puts the hint at the inline end
        "tw:[unicode-bidi:plaintext] tw:ms-auto tw:text-xs tw:tracking-widest tw:text-muted-foreground tw:group-focus/menubar-item:text-accent-foreground",
        t
      ),
      ...e
    }
  );
}
function kp({ ...t }) {
  return /* @__PURE__ */ a(De.Sub, { "data-slot": "menubar-sub", ...t });
}
function _p({
  className: t,
  inset: e,
  children: r,
  ...o
}) {
  const n = Gr();
  return /* @__PURE__ */ u(
    De.SubTrigger,
    {
      "data-slot": "menubar-sub-trigger",
      "data-inset": e,
      className: b(
        "tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-none tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-inset:ps-7 tw:data-open:bg-accent tw:data-open:text-accent-foreground tw:[&_svg:not([class*=size-])]:size-4",
        // CUSTOM: Apply variant-driven styles from menu context
        Po({ variant: n.variant, className: t })
      ),
      ...o,
      children: [
        r,
        /* @__PURE__ */ a(ui, { className: "tw:ms-auto tw:size-4" })
      ]
    }
  );
}
function Np({
  className: t,
  // CUSTOM: Pull `style` out so the shared z-index can be applied under any caller-supplied style
  style: e,
  ...r
}) {
  const o = Gr();
  return /* @__PURE__ */ a(
    De.SubContent,
    {
      "data-slot": "menubar-sub-content",
      className: b(
        // CUSTOM: Fixed tw: prefix not being on some classes and removed erroneous empty tw: tokens
        // CUSTOM: Removed tw:z-50 to use the shared z-index constant below (see style prop), keeping
        // submenus on the same overlay tier as their parent MenubarContent
        "tw:min-w-32 tw:origin-(--radix-menubar-content-transform-origin) tw:overflow-hidden tw:rounded-lg tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-lg tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95 tw:animate-none! tw:bg-popover/70 tw:before:-z-1 tw:**:data-[slot$=-item]:focus:bg-foreground/10 tw:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 tw:**:data-[slot$=-separator]:bg-foreground/5 tw:**:data-[slot$=-trigger]:focus:bg-foreground/10 tw:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! tw:**:data-[variant=destructive]:focus:bg-foreground/10! tw:**:data-[variant=destructive]:text-accent-foreground! tw:**:data-[variant=destructive]:**:text-accent-foreground! tw:relative tw:before:pointer-events-none tw:before:absolute tw:before:inset-0 tw:before:rounded-[inherit] tw:before:backdrop-blur-2xl tw:before:backdrop-saturate-150",
        // CUSTOM: Apply muted background when variant is muted
        {
          "tw:bg-popover": o.variant === "muted"
        },
        t
      ),
      style: { zIndex: Fe, ...e },
      ...r
    }
  );
}
const Pr = (t, e) => {
  setTimeout(() => {
    e.forEach((r) => {
      var o;
      (o = t.current) == null || o.dispatchEvent(new KeyboardEvent("keydown", r));
    });
  }, 0);
}, bs = (t, e, r, o) => {
  if (!r) return;
  const n = Object.entries(t).filter(
    ([s, i]) => "column" in i && i.column === r || s === r
  ).sort(([, s], [, i]) => s.order - i.order);
  return n.flatMap(([s], i) => {
    const c = e.filter((l) => l.group === s).sort((l, w) => l.order - w.order).map((l) => /* @__PURE__ */ u(bt, { children: [
      /* @__PURE__ */ a(xt, { asChild: !0, children: "command" in l ? /* @__PURE__ */ u(
        bp,
        {
          onClick: () => {
            o(l);
          },
          children: [
            l.iconPathBefore && /* @__PURE__ */ a(Da, { icon: l.iconPathBefore, menuLabel: l.label, leading: !0 }),
            l.label,
            l.iconPathAfter && /* @__PURE__ */ a(Da, { icon: l.iconPathAfter, menuLabel: l.label }),
            l.shortcut && /* @__PURE__ */ a(yp, { children: l.shortcut })
          ]
        },
        `menubar-item-${l.label}-${l.command}`
      ) : /* @__PURE__ */ u(kp, { children: [
        /* @__PURE__ */ a(_p, { children: l.label }),
        /* @__PURE__ */ a(Np, { children: bs(
          t,
          e,
          ds(t, l.id),
          o
        ) })
      ] }, `menubar-sub-${l.label}-${l.id}`) }),
      l.tooltip && /* @__PURE__ */ a(yt, { children: l.tooltip })
    ] }, `tooltip-${l.label}-${"command" in l ? l.command : l.id}`)), d = [...c];
    return c.length > 0 && i < n.length - 1 && d.push(/* @__PURE__ */ a(xp, {}, `separator-${s}`)), d;
  });
};
function Cp({
  menuData: t,
  onSelectMenuItem: e,
  onOpenChange: r,
  variant: o
}) {
  const n = L(void 0), s = L(void 0), i = L(void 0), c = L(void 0), d = L(void 0), l = (w) => {
    switch (w) {
      case "platform.app":
        return s;
      case "platform.window":
        return i;
      case "platform.layout":
        return c;
      case "platform.help":
        return d;
      default:
        return;
    }
  };
  if (Ql(["alt", "alt+p", "alt+l", "alt+n", "alt+h"], (w, p) => {
    var m, x, g, T;
    w.preventDefault();
    const h = { key: "Escape", code: "Escape", keyCode: 27, bubbles: !0 }, f = { key: " ", code: "Space", keyCode: 32, bubbles: !0 };
    switch (p.hotkey) {
      case "alt":
        Pr(s, [h]);
        break;
      case "alt+p":
        (m = s.current) == null || m.focus(), Pr(s, [h, f]);
        break;
      case "alt+l":
        (x = i.current) == null || x.focus(), Pr(i, [h, f]);
        break;
      case "alt+n":
        (g = c.current) == null || g.focus(), Pr(c, [h, f]);
        break;
      case "alt+h":
        (T = d.current) == null || T.focus(), Pr(d, [h, f]);
        break;
    }
  }), Z(() => {
    if (!r || !n.current) return;
    const w = new MutationObserver((f) => {
      f.forEach((m) => {
        if (m.attributeName === "data-state" && m.target instanceof HTMLElement) {
          const x = m.target.getAttribute("data-state");
          r(x === "open");
        }
      });
    });
    return n.current.querySelectorAll("[data-state]").forEach((f) => {
      w.observe(f, { attributes: !0 });
    }), () => w.disconnect();
  }, [r]), !!t)
    return /* @__PURE__ */ a(hp, { ref: n, className: "pr-twp tw:border-0 tw:bg-transparent", variant: o, children: ws(t.columns).map(({ columnKey: w, column: p }) => /* @__PURE__ */ u(gp, { children: [
      /* @__PURE__ */ a(mp, { ref: l(w), children: p.label }),
      /* @__PURE__ */ a(
        vp,
        {
          style: { zIndex: Fe },
          children: /* @__PURE__ */ a(Vt, { children: bs(t.groups, t.items, w, e) })
        }
      )
    ] }, w)) });
}
const Ep = Object.freeze([950, 800, 700]);
function gg(t) {
  switch (t) {
    case void 0:
      return;
    case "darwin":
      return "tw:ps-[85px]";
    default:
      return "tw:pe-[calc(138px+1rem)]";
  }
}
function fg({
  menuData: t,
  onOpenChange: e,
  onSelectMenuItem: r,
  className: o,
  id: n,
  children: s,
  appMenuAreaChildren: i,
  configAreaChildren: c,
  shouldUseAsAppDragArea: d,
  menubarVariant: l = "default"
}) {
  const [w, p] = _(void 0), h = V(
    (x) => p(x ?? void 0),
    []
  ), f = hs(w, Ep), m = Mi() ?? f;
  return /* @__PURE__ */ a($a.Provider, { value: m, children: /* @__PURE__ */ a(
    "div",
    {
      className: b("tw:border tw:px-4 tw:text-foreground", o),
      style: { position: "relative" },
      id: n,
      children: /* @__PURE__ */ u(
        "div",
        {
          "data-testid": "toolbar-content-row",
          className: "tw:flex tw:h-full tw:w-full tw:justify-between tw:overflow-hidden",
          ref: h,
          style: d ? { WebkitAppRegion: "drag" } : void 0,
          children: [
            /* @__PURE__ */ a("div", { className: "tw:flex tw:shrink-0 tw:grow tw:basis-0", children: /* @__PURE__ */ u(
              "div",
              {
                className: "tw:flex tw:items-center tw:gap-2",
                style: d ? { WebkitAppRegion: "no-drag" } : void 0,
                children: [
                  i,
                  t && /* @__PURE__ */ a(
                    Cp,
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
                "data-testid": "toolbar-content-area",
                className: "tw:flex tw:min-w-0 tw:shrink tw:items-center tw:gap-2 tw:overflow-clip tw:px-2",
                style: d ? { WebkitAppRegion: "no-drag" } : void 0,
                children: s
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
  ) });
}
const Tp = (t, e) => t[e] ?? e;
function mg({
  knownUiLanguages: t,
  primaryLanguage: e = "en",
  fallbackLanguages: r = [],
  onLanguagesChange: o,
  onPrimaryLanguageChange: n,
  onFallbackLanguagesChange: s,
  localizedStrings: i,
  className: c,
  id: d
}) {
  const l = Tp(
    i,
    "%settings_uiLanguageSelector_fallbackLanguages%"
  ), [w, p] = _(!1), h = (m) => {
    n && n(m), o && o([m, ...r.filter((x) => x !== m)]), s && r.find((x) => x === m) && s([...r.filter((x) => x !== m)]), p(!1);
  }, f = (m, x) => {
    var T, y, C, N, A, B;
    const g = x !== m ? ((y = (T = t[m]) == null ? void 0 : T.uiNames) == null ? void 0 : y[x]) ?? ((N = (C = t[m]) == null ? void 0 : C.uiNames) == null ? void 0 : N.en) : void 0;
    return g ? `${(A = t[m]) == null ? void 0 : A.autonym} (${g})` : (B = t[m]) == null ? void 0 : B.autonym;
  };
  return /* @__PURE__ */ u("div", { id: d, className: b("pr-twp tw:max-w-sm", c), children: [
    /* @__PURE__ */ u(
      Er,
      {
        name: "uiLanguage",
        value: e,
        onValueChange: h,
        open: w,
        onOpenChange: (m) => p(m),
        children: [
          /* @__PURE__ */ a(Sr, { children: /* @__PURE__ */ a(Tr, {}) }),
          /* @__PURE__ */ a(
            Rr,
            {
              style: { zIndex: Fe },
              children: Object.keys(t).map((m) => /* @__PURE__ */ a(xe, { value: m, children: f(m, e) }, m))
            }
          )
        ]
      }
    ),
    e !== "en" && /* @__PURE__ */ a("div", { className: "tw:pt-3", children: /* @__PURE__ */ a($t, { className: "tw:font-normal tw:text-muted-foreground", children: Ye(l, {
      fallbackLanguages: (r == null ? void 0 : r.length) > 0 ? r.map((m) => f(m, e)).join(", ") : t.en.autonym
    }) }) })
  ] });
}
const vg = Object.freeze([
  "%firstRun_language_search_placeholder%",
  "%firstRun_language_noResults%",
  "%firstRun_language_selected%"
]);
function Sp(t) {
  return [...t].sort(([e, r], [o, n]) => e === "en" && o !== "en" ? -1 : o === "en" && e !== "en" ? 1 : r.autonym.localeCompare(n.autonym));
}
function bg({
  languages: t,
  value: e,
  onChange: r,
  localizedStrings: o,
  className: n,
  id: s
}) {
  const [i, c] = _(""), d = P(
    () => Sp(Object.entries(t)).map(([m, x]) => ({
      tag: m,
      info: x,
      keywords: [x.autonym, ...Object.values(x.uiNames ?? {}), ...x.otherNames ?? []]
    })),
    [t]
  ), l = P(() => {
    if (!i) return d;
    const m = i.toLowerCase();
    return d.filter(({ keywords: x }) => x.some((g) => g.toLowerCase().includes(m)));
  }, [d, i]), w = d.length > 1, p = o["%firstRun_language_search_placeholder%"] ?? "", h = o["%firstRun_language_noResults%"] ?? "", f = o["%firstRun_language_selected%"] ?? "";
  return /* @__PURE__ */ u(wr, { id: s, className: b("pr-twp", n), shouldFilter: !1, children: [
    w && // Plain <input> (not CommandPrimitive.Input) so cmdk cannot update this field after
    // item selection. Arrow-key and Enter events from here bubble to the Command root div
    // where cmdk's keydown handler picks them up for list navigation.
    /* @__PURE__ */ a("div", { "data-slot": "command-input-wrapper", className: "tw:p-1 tw:pb-0", children: /* @__PURE__ */ u(Hs, { className: "tw:h-8! tw:rounded-lg! tw:border-input/30 tw:bg-input/30 tw:shadow-none! tw:*:data-[slot=input-group-addon]:ps-2!", children: [
      /* @__PURE__ */ a(
        "input",
        {
          "data-slot": "command-input",
          type: "text",
          placeholder: p,
          "aria-label": p,
          value: i,
          onChange: (m) => c(m.currentTarget.value),
          className: "tw:w-full tw:text-sm tw:outline-hidden tw:disabled:cursor-not-allowed tw:disabled:opacity-50"
        }
      ),
      /* @__PURE__ */ a(qs, { children: /* @__PURE__ */ a(Kc, { className: "tw:size-4 tw:shrink-0 tw:opacity-50" }) })
    ] }) }),
    /* @__PURE__ */ u(ur, { children: [
      /* @__PURE__ */ a(Ia, { children: h }),
      l.map(({ tag: m, info: x }) => {
        const g = m === e;
        return /* @__PURE__ */ u(
          tr,
          {
            value: m,
            "aria-current": g ? "true" : void 0,
            "data-checked": g ? "true" : void 0,
            onSelect: () => r(m),
            children: [
              /* @__PURE__ */ a("span", { dir: "auto", children: x.autonym }),
              g && /* @__PURE__ */ a("span", { className: "tw:sr-only", children: f })
            ]
          },
          m
        );
      })
    ] })
  ] });
}
function Rp({ item: t, createLabel: e, createComplexLabel: r }) {
  return e ? /* @__PURE__ */ a($t, { children: e(t) }) : r ? /* @__PURE__ */ a($t, { children: r(t) }) : /* @__PURE__ */ a($t, { children: t });
}
function Dp({
  id: t,
  className: e,
  listItems: r,
  selectedListItems: o,
  handleSelectListItem: n,
  createLabel: s,
  createComplexLabel: i
}) {
  return /* @__PURE__ */ a("div", { id: t, className: e, children: r.map((c) => /* @__PURE__ */ u("div", { className: "tw:m-2 tw:flex tw:items-center", children: [
    /* @__PURE__ */ a(
      ss,
      {
        className: "tw:me-2 tw:align-middle",
        checked: o.includes(c),
        onCheckedChange: (d) => n(c, d)
      }
    ),
    /* @__PURE__ */ a(
      Rp,
      {
        item: c,
        createLabel: s,
        createComplexLabel: i
      }
    )
  ] }, c)) });
}
const xg = Dp;
function Mp(t, e) {
  const [r, o] = _(t), [n, s] = _(e);
  return t !== r && (o(t), t && s(e)), t ? e : n;
}
function yg({
  open: t,
  anchorRect: e,
  message: r,
  confirmingKeyLabel: o,
  side: n = "bottom",
  align: s = "start",
  showArrow: i = !0
}) {
  const c = t ? dn(r, { key: o }).join("") : "", {
    anchorRect: d,
    message: l,
    confirmingKeyLabel: w,
    showArrow: p
  } = Mp(t, { anchorRect: e, message: r, confirmingKeyLabel: o, showArrow: i });
  return /* @__PURE__ */ u(Vt, { children: [
    /* @__PURE__ */ a("span", { role: "status", className: "tw:sr-only", children: c }),
    /* @__PURE__ */ u(bt, { open: t, onOpenChange: () => {
    }, children: [
      /* @__PURE__ */ a(
        xt,
        {
          "aria-hidden": "true",
          tabIndex: -1,
          className: b(
            "tw:absolute tw:opacity-0 tw:pointer-events-none",
            "tw:p-0 tw:border-0 tw:bg-transparent tw:cursor-default tw:min-w-0 tw:min-h-0"
          ),
          style: {
            top: d.top,
            left: d.left,
            width: d.width,
            height: d.height
          }
        }
      ),
      /* @__PURE__ */ a(
        yt,
        {
          side: n,
          align: s,
          showArrow: p,
          arrowPadding: 8,
          className: b(
            // Rely on TooltipContent's default tw:max-w-xs (320px) and normal wrapping: this hint's
            // text is short and usually fits on one line, but locale length varies (e.g. Spanish runs
            // longer than English), so allow it to wrap rather than force tw:whitespace-nowrap, which
            // could clip or overflow on a narrow webview.
            "tw:p-0 tw:has-data-[slot=kbd]:pe-0 tw:bg-background tw:text-destructive tw:border tw:border-destructive"
          ),
          arrowClassName: "tw:bg-[color-mix(in_oklab,var(--destructive)_10%,var(--background))] tw:fill-[color-mix(in_oklab,var(--destructive)_10%,var(--background))] tw:border tw:border-destructive",
          children: /* @__PURE__ */ a("div", { className: "tw:w-full tw:h-full tw:rounded-md tw:bg-destructive/10 tw:px-3 tw:py-1.5", children: dn(l, {
            key: /* @__PURE__ */ a(
              uo,
              {
                className: b(
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
          }).map((h, f) => (
            // The array is static per render (one fixed localized string + one kbd), so index is
            // a stable, safe key — same rationale as source-language-indexed-list.component.tsx's
            // disable.
            // eslint-disable-next-line react/no-array-index-key
            /* @__PURE__ */ a(Yr, { children: h }, `key-${f}`)
          )) })
        }
      )
    ] })
  ] });
}
function kg({
  cardKey: t,
  isSelected: e,
  onSelect: r,
  isDenied: o,
  isHidden: n = !1,
  className: s,
  children: i,
  selectedButtons: c,
  hoverButtons: d,
  dropdownContent: l,
  additionalContent: w,
  accentColor: p,
  showDropdownOnHover: h = !1
}) {
  const f = (g) => {
    if (g.key === "Enter" || g.key === " ") {
      if (g.target !== g.currentTarget) return;
      g.preventDefault(), r();
    }
  }, [m, x] = _(!1);
  return /* @__PURE__ */ u(
    "div",
    {
      hidden: n,
      onClick: r,
      onKeyDown: f,
      onMouseEnter: () => x(!0),
      onFocus: () => x(!0),
      role: "button",
      tabIndex: 0,
      "aria-pressed": e,
      className: b(
        "tw:group tw:relative tw:min-w-36 tw:rounded-xl tw:border tw:shadow-none tw:hover:bg-muted/50",
        { "tw:opacity-50 tw:hover:opacity-100": o && !e },
        { "tw:bg-accent": e },
        { "tw:bg-transparent": !e },
        s
      ),
      children: [
        /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:gap-2 tw:p-4", children: [
          /* @__PURE__ */ u("div", { className: "tw:flex tw:justify-between tw:overflow-hidden", children: [
            /* @__PURE__ */ a("div", { className: "tw:min-w-0 tw:flex-1", children: i }),
            e && c,
            !e && d && /* @__PURE__ */ a("div", { className: "tw:invisible tw:group-hover:visible", children: d }),
            l && (e || h && m) && /* @__PURE__ */ a(
              "div",
              {
                className: b(
                  !e && h && "tw:invisible tw:group-hover:visible"
                ),
                children: /* @__PURE__ */ u(Be, { children: [
                  /* @__PURE__ */ a(Ee, { className: b(p && "tw:me-1"), asChild: !0, children: /* @__PURE__ */ a(
                    et,
                    {
                      className: "tw:m-1 tw:h-6 tw:w-6",
                      variant: "ghost",
                      size: "icon",
                      onClick: (g) => g.stopPropagation(),
                      onFocus: (g) => g.stopPropagation(),
                      children: /* @__PURE__ */ a(Cc, {})
                    }
                  ) }),
                  /* @__PURE__ */ a(je, { align: "end", children: l })
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
function _g({
  id: t,
  isDisabled: e = !1,
  hasError: r = !1,
  isFullWidth: o = !1,
  helperText: n,
  label: s,
  placeholder: i,
  isRequired: c = !1,
  className: d,
  defaultValue: l,
  value: w,
  onChange: p,
  onFocus: h,
  onBlur: f
}) {
  return /* @__PURE__ */ u("div", { className: b("tw:inline-grid tw:items-center tw:gap-1.5", { "tw:w-full": o }), children: [
    /* @__PURE__ */ a(
      $t,
      {
        htmlFor: t,
        className: b({
          "tw:text-red-600": r,
          "tw:hidden": !s
        }),
        children: `${s}${c ? "*" : ""}`
      }
    ),
    /* @__PURE__ */ a(
      za,
      {
        id: t,
        disabled: e,
        placeholder: i,
        required: c,
        className: b(d, { "tw:border-red-600": r }),
        defaultValue: l,
        value: w,
        onChange: p,
        onFocus: h,
        onBlur: f
      }
    ),
    /* @__PURE__ */ a("p", { className: b({ "tw:hidden": !n }), children: n })
  ] });
}
function Ng({ currentStep: t, totalSteps: e, locale: r }) {
  const o = r || "en", n = P(() => {
    const c = new ci(o);
    return (d) => c.format(d);
  }, [o]), s = Math.min(Math.max(t, 1), e), i = Array.from({ length: e }, (c, d) => d + 1);
  return /* @__PURE__ */ a("div", { className: "tw:flex tw:items-center", "aria-hidden": "true", children: i.map((c) => {
    let d = "upcoming";
    return c === s ? d = "active" : c < s && (d = "complete"), /* @__PURE__ */ u(Yr, { children: [
      c > 1 && /* @__PURE__ */ a("div", { className: "tw:h-px tw:flex-1 tw:bg-border" }),
      /* @__PURE__ */ a(
        "div",
        {
          "data-state": d,
          className: b(
            "tw:flex tw:h-8 tw:w-8 tw:shrink-0 tw:items-center tw:justify-center tw:rounded-full tw:text-sm tw:font-medium",
            d === "active" && "tw:bg-primary tw:text-primary-foreground",
            d === "complete" && "tw:bg-muted tw:text-muted-foreground",
            d === "upcoming" && "tw:border tw:border-input tw:text-muted-foreground"
          ),
          children: d === "complete" ? /* @__PURE__ */ a(Ze, { className: "tw:h-4 tw:w-4" }) : n(c)
        }
      )
    ] }, c);
  }) });
}
function Cg({ ...t }) {
  return /* @__PURE__ */ a(Ht.Root, { "data-slot": "context-menu", ...t });
}
function Eg({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    Ht.Trigger,
    {
      "data-slot": "context-menu-trigger",
      className: b("tw:select-none", t),
      ...e
    }
  );
}
function Tg({ ...t }) {
  return /* @__PURE__ */ a(Ht.Group, { "data-slot": "context-menu-group", ...t });
}
function Sg({ ...t }) {
  return /* @__PURE__ */ a(Ht.Portal, { "data-slot": "context-menu-portal", ...t });
}
function Rg({ ...t }) {
  return /* @__PURE__ */ a(Ht.Sub, { "data-slot": "context-menu-sub", ...t });
}
function Dg({
  ...t
}) {
  return /* @__PURE__ */ a(Ht.RadioGroup, { "data-slot": "context-menu-radio-group", ...t });
}
function Mg({
  className: t,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: e,
  ...r
}) {
  return /* @__PURE__ */ a(Ht.Portal, { children: /* @__PURE__ */ a(
    Ht.Content,
    {
      "data-slot": "context-menu-content",
      className: b(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        // CUSTOM: Fixed tw: prefix not being on some classes and removed erroneous empty tw: tokens
        // CUSTOM: Removed tw:z-50 to use the shared z-index constant below (see style prop)
        "pr-twp tw:max-h-(--radix-context-menu-content-available-height) tw:min-w-36 tw:origin-(--radix-context-menu-content-transform-origin) tw:overflow-x-hidden tw:overflow-y-auto tw:rounded-lg tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95 tw:animate-none! tw:bg-popover/70 tw:before:-z-1 tw:**:data-[slot$=-item]:focus:bg-foreground/10 tw:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 tw:**:data-[slot$=-separator]:bg-foreground/5 tw:**:data-[slot$=-trigger]:focus:bg-foreground/10 tw:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! tw:**:data-[variant=destructive]:focus:bg-foreground/10! tw:**:data-[variant=destructive]:text-accent-foreground! tw:**:data-[variant=destructive]:**:text-accent-foreground! tw:relative tw:before:pointer-events-none tw:before:absolute tw:before:inset-0 tw:before:rounded-[inherit] tw:before:backdrop-blur-2xl tw:before:backdrop-saturate-150",
        t
      ),
      style: { zIndex: Fe, ...e },
      ...r
    }
  ) });
}
function Og({
  className: t,
  inset: e,
  variant: r = "default",
  ...o
}) {
  return /* @__PURE__ */ a(
    Ht.Item,
    {
      "data-slot": "context-menu-item",
      "data-inset": e,
      "data-variant": r,
      className: b(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:group/context-menu-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-inset:ps-7 tw:data-[variant=destructive]:text-destructive tw:data-[variant=destructive]:focus:bg-destructive/10 tw:data-[variant=destructive]:focus:text-destructive tw:dark:data-[variant=destructive]:focus:bg-destructive/20 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:focus:*:[svg]:text-accent-foreground tw:data-[variant=destructive]:*:[svg]:text-destructive",
        t
      ),
      ...o
    }
  );
}
function Ig({
  className: t,
  inset: e,
  children: r,
  ...o
}) {
  return /* @__PURE__ */ u(
    Ht.SubTrigger,
    {
      "data-slot": "context-menu-sub-trigger",
      "data-inset": e,
      className: b(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-inset:ps-7 tw:data-open:bg-accent tw:data-open:text-accent-foreground tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      ...o,
      children: [
        r,
        /* @__PURE__ */ a(ui, { className: "tw:ms-auto" })
      ]
    }
  );
}
function zg({
  className: t,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: e,
  ...r
}) {
  return /* @__PURE__ */ a(
    Ht.SubContent,
    {
      "data-slot": "context-menu-sub-content",
      className: b(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        // CUSTOM: Fixed tw: prefix not being on some classes and removed erroneous empty tw: tokens
        // CUSTOM: Removed tw:z-50 to use the shared z-index constant below (see style prop), keeping
        // submenus on the same above-dock layer as their parent ContextMenuContent (PT-3877)
        "pr-twp tw:min-w-32 tw:origin-(--radix-context-menu-content-transform-origin) tw:overflow-hidden tw:rounded-lg tw:border tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-lg tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95 tw:animate-none! tw:bg-popover/70 tw:before:-z-1 tw:**:data-[slot$=-item]:focus:bg-foreground/10 tw:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 tw:**:data-[slot$=-separator]:bg-foreground/5 tw:**:data-[slot$=-trigger]:focus:bg-foreground/10 tw:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! tw:**:data-[variant=destructive]:focus:bg-foreground/10! tw:**:data-[variant=destructive]:text-accent-foreground! tw:**:data-[variant=destructive]:**:text-accent-foreground! tw:relative tw:before:pointer-events-none tw:before:absolute tw:before:inset-0 tw:before:rounded-[inherit] tw:before:backdrop-blur-2xl tw:before:backdrop-saturate-150",
        t
      ),
      style: { zIndex: Fe, ...e },
      ...r
    }
  );
}
function Pg({
  className: t,
  children: e,
  checked: r,
  inset: o,
  ...n
}) {
  return /* @__PURE__ */ u(
    Ht.CheckboxItem,
    {
      "data-slot": "context-menu-checkbox-item",
      "data-inset": o,
      className: b(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      checked: r,
      ...n,
      children: [
        /* @__PURE__ */ a("span", { className: "tw:pointer-events-none tw:absolute tw:end-2", children: /* @__PURE__ */ a(Ht.ItemIndicator, { children: /* @__PURE__ */ a(Aa, {}) }) }),
        e
      ]
    }
  );
}
function Ag({
  className: t,
  children: e,
  inset: r,
  ...o
}) {
  return /* @__PURE__ */ u(
    Ht.RadioItem,
    {
      "data-slot": "context-menu-radio-item",
      "data-inset": r,
      className: b(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      ...o,
      children: [
        /* @__PURE__ */ a("span", { className: "tw:pointer-events-none tw:absolute tw:end-2", children: /* @__PURE__ */ a(Ht.ItemIndicator, { children: /* @__PURE__ */ a(Aa, {}) }) }),
        e
      ]
    }
  );
}
function $g({
  className: t,
  inset: e,
  ...r
}) {
  return /* @__PURE__ */ a(
    Ht.Label,
    {
      "data-slot": "context-menu-label",
      "data-inset": e,
      className: b(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:px-1.5 tw:py-1 tw:text-xs tw:font-medium tw:text-muted-foreground tw:data-inset:ps-7",
        t
      ),
      ...r
    }
  );
}
function Vg({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    Ht.Separator,
    {
      "data-slot": "context-menu-separator",
      className: b(
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
      className: b(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; tw:ms-auto uses logical margin for RTL support
        // CUSTOM: Added tw:[unicode-bidi:plaintext] so the hint takes its direction from its first
        // letter, keeping macOS symbols in order (⌃F, not F⌃) in RTL menus. Unlike dir="ltr", it
        // keeps the span's direction, so tw:ms-auto still puts the hint at the inline end
        "pr-twp tw:[unicode-bidi:plaintext] tw:ms-auto tw:text-xs tw:tracking-widest tw:text-muted-foreground tw:group-focus/context-menu-item:text-accent-foreground",
        t
      ),
      ...e
    }
  );
}
function Bg({ ...t }) {
  return /* @__PURE__ */ a(er.Root, { "data-slot": "drawer", ...t });
}
function jg({ ...t }) {
  return /* @__PURE__ */ a(er.Trigger, { "data-slot": "drawer-trigger", ...t });
}
function Op({ ...t }) {
  return /* @__PURE__ */ a(er.Portal, { "data-slot": "drawer-portal", ...t });
}
function Fg({ ...t }) {
  return /* @__PURE__ */ a(er.Close, { "data-slot": "drawer-close", ...t });
}
function Ip({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    er.Overlay,
    {
      "data-slot": "drawer-overlay",
      className: b(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:fixed tw:inset-0 tw:z-50 tw:bg-black/10 tw:supports-backdrop-filter:backdrop-blur-xs tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-closed:animate-out tw:data-closed:fade-out-0",
        t
      ),
      ...e
    }
  );
}
function Ug({
  className: t,
  children: e,
  // CUSTOM: Destructure hideDrawerHandle to conditionally render the drag handle
  hideDrawerHandle: r = !1,
  ...o
}) {
  const n = Re();
  return /* @__PURE__ */ u(Op, { "data-slot": "drawer-portal", children: [
    /* @__PURE__ */ a(Ip, {}),
    /* @__PURE__ */ u(
      er.Content,
      {
        "data-slot": "drawer-content",
        className: b(
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
function Kg({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "drawer-header",
      className: b(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:flex tw:flex-col tw:gap-0.5 tw:p-4 tw:group-data-[vaul-drawer-direction=bottom]/drawer-content:text-center tw:group-data-[vaul-drawer-direction=top]/drawer-content:text-center tw:md:gap-0.5 tw:md:text-start",
        t
      ),
      ...e
    }
  );
}
function Hg({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "drawer-footer",
      className: b(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:mt-auto tw:flex tw:flex-col tw:gap-2 tw:p-4",
        t
      ),
      ...e
    }
  );
}
function qg({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    er.Title,
    {
      "data-slot": "drawer-title",
      className: b(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:font-heading tw:text-base tw:font-medium tw:text-foreground",
        t
      ),
      ...e
    }
  );
}
function Gg({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    er.Description,
    {
      "data-slot": "drawer-description",
      className: b(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:text-sm tw:text-muted-foreground",
        t
      ),
      ...e
    }
  );
}
function Wg({
  className: t,
  value: e,
  ...r
}) {
  return /* @__PURE__ */ a(
    fn.Root,
    {
      "data-slot": "progress",
      className: b(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:relative tw:flex tw:h-1 tw:w-full tw:items-center tw:overflow-x-hidden tw:rounded-full tw:bg-muted",
        t
      ),
      ...r,
      children: /* @__PURE__ */ a(
        fn.Indicator,
        {
          "data-slot": "progress-indicator",
          className: "tw:size-full tw:flex-1 tw:bg-primary tw:transition-all",
          style: { transform: `translateX(-${100 - (e || 0)}%)` }
        }
      )
    }
  );
}
function Yg({ ...t }) {
  const { theme: e = "system" } = td();
  return /* @__PURE__ */ a(
    ed,
    {
      theme: e === "light" || e === "dark" || e === "system" ? e : "system",
      className: "tw:toaster tw:group",
      icons: {
        success: /* @__PURE__ */ a(Yc, { className: "tw:size-4" }),
        info: /* @__PURE__ */ a(Wc, { className: "tw:size-4" }),
        warning: /* @__PURE__ */ a(Gc, { className: "tw:size-4" }),
        error: /* @__PURE__ */ a(qc, { className: "tw:size-4" }),
        loading: /* @__PURE__ */ a(Hc, { className: "tw:size-4 tw:animate-spin" })
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
function Xg({
  className: t,
  defaultValue: e,
  value: r,
  min: o = 0,
  max: n = 100,
  ...s
}) {
  const i = Re(), c = ee.useMemo(
    () => Array.isArray(r) ? r : Array.isArray(e) ? e : [o, n],
    [r, e, o, n]
  );
  return /* @__PURE__ */ u(
    na.Root,
    {
      "data-slot": "slider",
      defaultValue: e,
      value: r,
      min: o,
      max: n,
      className: b(
        "pr-twp tw:relative tw:flex tw:w-full tw:touch-none tw:items-center tw:select-none tw:data-disabled:opacity-50 tw:data-vertical:h-full tw:data-vertical:min-h-40 tw:data-vertical:w-auto tw:data-vertical:flex-col",
        t
      ),
      dir: i,
      ...s,
      children: [
        /* @__PURE__ */ a(
          na.Track,
          {
            "data-slot": "slider-track",
            className: "tw:relative tw:grow tw:overflow-hidden tw:rounded-full tw:bg-muted tw:data-horizontal:h-1 tw:data-horizontal:w-full tw:data-vertical:h-full tw:data-vertical:w-1",
            children: /* @__PURE__ */ a(
              na.Range,
              {
                "data-slot": "slider-range",
                className: "tw:absolute tw:bg-primary tw:select-none tw:data-horizontal:h-full tw:data-vertical:w-full"
              }
            )
          }
        ),
        Array.from({ length: c.length }, (d, l) => /* @__PURE__ */ a(
          na.Thumb,
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
function Jg({
  className: t,
  size: e = "default",
  ...r
}) {
  return /* @__PURE__ */ a(
    mn.Root,
    {
      "data-slot": "switch",
      "data-size": e,
      className: b(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation. tw:peer
        // precedes pr-twp here because the peer class must be the first peer-related class for
        // Tailwind's peer selector to work correctly; pr-twp is still present as required.
        "tw:peer pr-twp tw:group/switch tw:relative tw:inline-flex tw:shrink-0 tw:items-center tw:rounded-full tw:border tw:border-transparent tw:transition-all tw:outline-none tw:after:absolute tw:after:-inset-x-3 tw:after:-inset-y-2 tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:data-[size=default]:h-[18.4px] tw:data-[size=default]:w-[32px] tw:data-[size=sm]:h-[14px] tw:data-[size=sm]:w-[24px] tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40 tw:data-checked:bg-primary tw:data-unchecked:bg-input tw:dark:data-unchecked:bg-input/80 tw:data-disabled:cursor-not-allowed tw:data-disabled:opacity-50",
        t
      ),
      ...r,
      children: /* @__PURE__ */ a(
        mn.Thumb,
        {
          "data-slot": "switch-thumb",
          className: "tw:pointer-events-none tw:block tw:rounded-full tw:bg-background tw:ring-0 tw:transition-transform tw:group-data-[size=default]/switch:size-4 tw:group-data-[size=sm]/switch:size-3 tw:group-data-[size=default]/switch:data-checked:translate-x-[calc(100%-2px)] tw:rtl:group-data-[size=default]/switch:data-checked:-translate-x-[calc(100%-2px)] tw:group-data-[size=sm]/switch:data-checked:translate-x-[calc(100%-2px)] tw:rtl:group-data-[size=sm]/switch:data-checked:-translate-x-[calc(100%-2px)] tw:dark:data-checked:bg-primary-foreground tw:group-data-[size=default]/switch:data-unchecked:translate-x-0 tw:rtl:group-data-[size=default]/switch:data-unchecked:-translate-x-0 tw:group-data-[size=sm]/switch:data-unchecked:translate-x-0 tw:rtl:group-data-[size=sm]/switch:data-unchecked:-translate-x-0 tw:dark:data-unchecked:bg-foreground"
        }
      )
    }
  );
}
function Zg({
  className: t,
  orientation: e = "horizontal",
  ...r
}) {
  return /* @__PURE__ */ a(
    ye.Root,
    {
      "data-slot": "tabs",
      "data-orientation": e,
      className: b("tw:group/tabs tw:flex tw:gap-2 tw:data-horizontal:flex-col", t),
      ...r
    }
  );
}
const zp = Si(
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
function Qg({
  className: t,
  variant: e = "default",
  ...r
}) {
  const o = Re();
  return /* @__PURE__ */ a(
    ye.List,
    {
      "data-slot": "tabs-list",
      "data-variant": e,
      className: b("pr-twp", zp({ variant: e }), t),
      dir: o,
      ...r
    }
  );
}
function tf({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    ye.Trigger,
    {
      "data-slot": "tabs-trigger",
      className: b(
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
function ef({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    ye.Content,
    {
      "data-slot": "tabs-content",
      className: b("pr-twp tw:flex-1 tw:text-sm tw:outline-none", t),
      ...e
    }
  );
}
const rf = (t, e) => {
  Z(() => {
    if (!t) return;
    let r = !1;
    const n = t((s) => {
      r || e(s);
    });
    return () => {
      r = !0;
      try {
        n();
      } catch (s) {
        console.error("useEvent: error while unsubscribing from event", s);
      }
    };
  }, [t, e]);
}, af = (t, e) => {
  Z(() => {
    if (!t) return;
    let r = !1, o, n = !1;
    const s = (c) => {
      r || e(c);
    }, i = () => {
      if (n || !o) return;
      n = !0;
      const c = o;
      (async () => {
        try {
          await c();
        } catch (d) {
          console.error("useEventAsync: error while unsubscribing from event", d);
        }
      })();
    };
    return (async () => {
      try {
        o = await Promise.resolve(t(s)), r && i();
      } catch (c) {
        console.error("useEventAsync: error while subscribing to event", c);
      }
    })(), () => {
      r = !0, i();
    };
  }, [t, e]);
};
function Pp(t) {
  return {
    preserveValue: !0,
    ...t
  };
}
const Ap = (t, e, r = {}) => {
  const o = L(e);
  o.current = e;
  const n = L(r);
  n.current = Pp(n.current);
  const [s, i] = _(() => o.current), [c, d] = _(!0);
  return Z(() => {
    let l = !0;
    return d(!!t), (async () => {
      if (t)
        try {
          const w = await t();
          l && (i(() => w), d(!1));
        } catch (w) {
          l && d(!1), console.error(
            "usePromise: the promise factory rejected, so there is no new value",
            w
          );
        }
    })(), () => {
      l = !1, n.current.preserveValue || i(() => o.current);
    };
  }, [t]), [s, c];
}, of = (t) => {
  const [e, r] = _(!1), [o, n] = _(!1), [s, i] = _(0), c = L(void 0), d = P(() => {
    if (!t) return;
    const h = async () => {
      try {
        const f = await t();
        return c.current === h && (r(!1), n(!0)), f;
      } catch (f) {
        throw c.current === h && (r(!0), n(!0)), f;
      }
    };
    return h;
  }, [t, s]);
  Z(() => {
    c.current = d, r(!1), n(!d);
  }, [d]);
  const [l, w] = Ap(d, void 0), p = V(() => {
    c.current && (r(!1), n(!1), i((h) => h + 1));
  }, []);
  return P(
    () => ({ data: l, isLoading: w, hasError: e, hasSettled: o, refetch: p }),
    [l, w, e, o, p]
  );
};
function nf(t) {
  Z(() => {
    let e;
    return t && (e = document.createElement("style"), e.appendChild(document.createTextNode(t)), document.head.appendChild(e)), () => {
      e && document.head.removeChild(e);
    };
  }, [t]);
}
function sf(t) {
  const e = P(() => Ac(t).slice().sort().join(" "), [t]);
  return P(() => e ? e.split(" ") : [], [e]);
}
const $p = () => {
  const [t, e] = _(
    () => document.body.getBoundingClientRect().height > 0
  );
  return Z(() => {
    const r = new IntersectionObserver((o) => {
      const n = o[o.length - 1];
      n && e(n.isIntersecting);
    });
    return r.observe(document.body), () => {
      r.disconnect();
    };
  }, []), t;
};
function cf(t, e) {
  const [r, o] = _(!1), n = L(e);
  n.current = e;
  const s = L(t);
  s.current = t;
  const i = V(() => {
    s.current ? n.current() : o(!0);
  }, []);
  return Z(() => {
    !t || !r || (o(!1), n.current());
  }, [t, r]), i;
}
function Vp(t, e, r) {
  return t ? r.dark : e === void 0 ? r.lightDefault : r.lightUnselected;
}
function lf(t, e) {
  const r = $p();
  return Vp(t, r, e);
}
function df({ value: t, children: e }) {
  return /* @__PURE__ */ a(Di.Provider, { value: t, children: /* @__PURE__ */ a($a.Provider, { value: t, children: e }) });
}
const wf = 300;
function Lp(t, e = "top") {
  if (!t || typeof document > "u") return;
  const r = document.head || document.querySelector("head"), o = r.querySelector(":first-child"), n = document.createElement("style");
  n.appendChild(document.createTextNode(t)), e === "top" && o ? r.insertBefore(n, o) : r.appendChild(n);
}
Lp(`.banded-row:hover {
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
@layer properties{@supports (((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))){*,:before,:after,::backdrop{--tw-translate-x:0;--tw-translate-y:0;--tw-translate-z:0;--tw-rotate-x:initial;--tw-rotate-y:initial;--tw-rotate-z:initial;--tw-skew-x:initial;--tw-skew-y:initial;--tw-space-y-reverse:0;--tw-space-x-reverse:0;--tw-divide-x-reverse:0;--tw-border-style:solid;--tw-divide-y-reverse:0;--tw-leading:initial;--tw-font-weight:initial;--tw-tracking:initial;--tw-ordinal:initial;--tw-slashed-zero:initial;--tw-numeric-figure:initial;--tw-numeric-spacing:initial;--tw-numeric-fraction:initial;--tw-shadow:0 0 #0000;--tw-shadow-color:initial;--tw-shadow-alpha:100%;--tw-inset-shadow:0 0 #0000;--tw-inset-shadow-color:initial;--tw-inset-shadow-alpha:100%;--tw-ring-color:initial;--tw-ring-shadow:0 0 #0000;--tw-inset-ring-color:initial;--tw-inset-ring-shadow:0 0 #0000;--tw-ring-inset:initial;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-offset-shadow:0 0 #0000;--tw-blur:initial;--tw-brightness:initial;--tw-contrast:initial;--tw-grayscale:initial;--tw-hue-rotate:initial;--tw-invert:initial;--tw-opacity:initial;--tw-saturate:initial;--tw-sepia:initial;--tw-drop-shadow:initial;--tw-drop-shadow-color:initial;--tw-drop-shadow-alpha:100%;--tw-drop-shadow-size:initial;--tw-duration:initial;--tw-ease:initial;--tw-content:"";--tw-backdrop-blur:initial;--tw-backdrop-brightness:initial;--tw-backdrop-contrast:initial;--tw-backdrop-grayscale:initial;--tw-backdrop-hue-rotate:initial;--tw-backdrop-invert:initial;--tw-backdrop-opacity:initial;--tw-backdrop-saturate:initial;--tw-backdrop-sepia:initial;--tw-outline-style:solid;--tw-animation-delay:0s;--tw-animation-direction:normal;--tw-animation-duration:initial;--tw-animation-fill-mode:none;--tw-animation-iteration-count:1;--tw-enter-blur:0;--tw-enter-opacity:1;--tw-enter-rotate:0;--tw-enter-scale:1;--tw-enter-translate-x:0;--tw-enter-translate-y:0;--tw-exit-blur:0;--tw-exit-opacity:1;--tw-exit-rotate:0;--tw-exit-scale:1;--tw-exit-translate-x:0;--tw-exit-translate-y:0}}}@layer theme{:root,:host{--tw-font-mono:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;--tw-color-red-100:oklch(93.6% .032 17.717);--tw-color-red-200:oklch(88.5% .062 18.334);--tw-color-red-300:oklch(80.8% .114 19.571);--tw-color-red-400:oklch(70.4% .191 22.216);--tw-color-red-500:oklch(63.7% .237 25.331);--tw-color-red-600:oklch(57.7% .245 27.325);--tw-color-red-700:oklch(50.5% .213 27.518);--tw-color-red-800:oklch(44.4% .177 26.899);--tw-color-orange-100:oklch(95.4% .038 75.164);--tw-color-orange-800:oklch(47% .157 37.304);--tw-color-amber-200:oklch(92.4% .12 95.746);--tw-color-amber-400:oklch(82.8% .189 84.429);--tw-color-amber-500:oklch(76.9% .188 70.08);--tw-color-amber-600:oklch(66.6% .179 58.318);--tw-color-yellow-50:oklch(98.7% .026 102.212);--tw-color-yellow-100:oklch(97.3% .071 103.193);--tw-color-yellow-400:oklch(85.2% .199 91.936);--tw-color-yellow-500:oklch(79.5% .184 86.047);--tw-color-yellow-600:oklch(68.1% .162 75.834);--tw-color-yellow-700:oklch(55.4% .135 66.442);--tw-color-green-50:oklch(98.2% .018 155.826);--tw-color-green-100:oklch(96.2% .044 156.743);--tw-color-green-500:oklch(72.3% .219 149.579);--tw-color-green-600:oklch(62.7% .194 149.214);--tw-color-green-700:oklch(52.7% .154 150.069);--tw-color-green-800:oklch(44.8% .119 151.328);--tw-color-teal-400:oklch(77.7% .152 181.912);--tw-color-teal-500:oklch(70.4% .14 182.503);--tw-color-teal-600:oklch(60% .118 184.704);--tw-color-sky-400:oklch(74.6% .16 232.661);--tw-color-sky-500:oklch(68.5% .169 237.323);--tw-color-sky-600:oklch(58.8% .158 241.966);--tw-color-blue-50:oklch(97% .014 254.604);--tw-color-blue-100:oklch(93.2% .032 255.585);--tw-color-blue-400:oklch(70.7% .165 254.624);--tw-color-blue-500:oklch(62.3% .214 259.815);--tw-color-blue-600:oklch(54.6% .245 262.881);--tw-color-blue-800:oklch(42.4% .199 265.638);--tw-color-indigo-200:oklch(87% .065 274.039);--tw-color-purple-50:oklch(97.7% .014 308.299);--tw-color-purple-200:oklch(90.2% .063 306.703);--tw-color-purple-900:oklch(38.1% .176 304.987);--tw-color-rose-400:oklch(71.2% .194 13.428);--tw-color-rose-500:oklch(64.5% .246 16.439);--tw-color-rose-600:oklch(58.6% .253 17.585);--tw-color-slate-300:oklch(86.9% .022 252.894);--tw-color-slate-400:oklch(70.4% .04 256.788);--tw-color-slate-900:oklch(20.8% .042 265.755);--tw-color-gray-50:oklch(98.5% .002 247.839);--tw-color-gray-100:oklch(96.7% .003 264.542);--tw-color-gray-300:oklch(87.2% .01 258.338);--tw-color-gray-500:oklch(55.1% .027 264.364);--tw-color-gray-600:oklch(44.6% .03 256.802);--tw-color-gray-700:oklch(37.3% .034 259.733);--tw-color-gray-800:oklch(27.8% .033 256.848);--tw-color-zinc-400:oklch(70.5% .015 286.067);--tw-color-neutral-300:oklch(87% 0 0);--tw-color-black:#000;--tw-color-white:#fff;--tw-container-xs:20rem;--tw-container-sm:24rem;--tw-container-md:28rem;--tw-container-lg:32rem;--tw-container-2xl:42rem;--tw-container-3xl:48rem;--tw-container-4xl:56rem;--tw-container-6xl:72rem;--tw-text-xs:.75rem;--tw-text-xs--line-height:calc(1 / .75);--tw-text-sm:.875rem;--tw-text-sm--line-height:calc(1.25 / .875);--tw-text-base:1rem;--tw-text-base--line-height:calc(1.5 / 1);--tw-text-lg:1.125rem;--tw-text-lg--line-height:calc(1.75 / 1.125);--tw-text-xl:1.25rem;--tw-text-xl--line-height:calc(1.75 / 1.25);--tw-text-2xl:1.5rem;--tw-text-2xl--line-height:calc(2 / 1.5);--tw-text-3xl:1.875rem;--tw-text-3xl--line-height:calc(2.25 / 1.875);--tw-text-4xl:2.25rem;--tw-text-4xl--line-height:calc(2.5 / 2.25);--tw-text-5xl:3rem;--tw-text-5xl--line-height:1;--tw-font-weight-normal:400;--tw-font-weight-medium:500;--tw-font-weight-semibold:600;--tw-font-weight-bold:700;--tw-font-weight-extrabold:800;--tw-tracking-tight:-.025em;--tw-tracking-wider:.05em;--tw-tracking-widest:.1em;--tw-leading-tight:1.25;--tw-leading-snug:1.375;--tw-leading-relaxed:1.625;--tw-leading-loose:2;--tw-radius-xs:.125rem;--tw-radius-md:calc(var(--radius) * .8);--tw-drop-shadow-sm:0 1px 2px #00000026;--tw-animate-spin:spin 1s linear infinite;--tw-animate-pulse:pulse 2s cubic-bezier(.4, 0, .6, 1) infinite;--tw-blur-xs:4px;--tw-blur-2xl:40px;--tw-default-transition-duration:.15s;--tw-default-transition-timing-function:cubic-bezier(.4, 0, .2, 1);--tw-default-font-family:"IBM Plex Sans Variable", sans-serif;--tw-default-mono-font-family:var(--tw-font-mono)}}@layer base{.pr-twp,.pr-twp *{border-color:var(--border);outline-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.pr-twp,.pr-twp *{outline-color:color-mix(in oklab, var(--ring) 50%, transparent)}}body.pr-twp{background-color:var(--background);color:var(--foreground)}html.pr-twp{font-family:IBM Plex Sans Variable,sans-serif}:where(.pr-twp,.pr-twp *),:where(.pr-twp,.pr-twp *):after,:where(.pr-twp,.pr-twp *):before,:where(.pr-twp,.pr-twp *) ::backdrop{box-sizing:border-box;border:0 solid;margin:0;padding:0}:where(.pr-twp,.pr-twp *) ::file-selector-button{box-sizing:border-box;border:0 solid;margin:0;padding:0}.pr-twp{-webkit-text-size-adjust:100%;tab-size:4;line-height:1.5;font-family:var(--tw-default-font-family,ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");font-feature-settings:var(--tw-default-font-feature-settings,normal);font-variation-settings:var(--tw-default-font-variation-settings,normal);-webkit-tap-highlight-color:transparent}hr:where(.pr-twp,.pr-twp *){height:0;color:inherit;border-top-width:1px}abbr:where([title]):where(.pr-twp,.pr-twp *){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1:where(.pr-twp,.pr-twp *),h2:where(.pr-twp,.pr-twp *),h3:where(.pr-twp,.pr-twp *),h4:where(.pr-twp,.pr-twp *),h5:where(.pr-twp,.pr-twp *),h6:where(.pr-twp,.pr-twp *){font-size:inherit;font-weight:inherit}a:where(.pr-twp,.pr-twp *){color:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b:where(.pr-twp,.pr-twp *),strong:where(.pr-twp,.pr-twp *){font-weight:bolder}code:where(.pr-twp,.pr-twp *),kbd:where(.pr-twp,.pr-twp *),samp:where(.pr-twp,.pr-twp *),pre:where(.pr-twp,.pr-twp *){font-family:var(--tw-default-mono-font-family,ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace);font-feature-settings:var(--tw-default-mono-font-feature-settings,normal);font-variation-settings:var(--tw-default-mono-font-variation-settings,normal);font-size:1em}small:where(.pr-twp,.pr-twp *){font-size:80%}sub:where(.pr-twp,.pr-twp *),sup:where(.pr-twp,.pr-twp *){vertical-align:baseline;font-size:75%;line-height:0;position:relative}sub:where(.pr-twp,.pr-twp *){bottom:-.25em}sup:where(.pr-twp,.pr-twp *){top:-.5em}table:where(.pr-twp,.pr-twp *){text-indent:0;border-color:inherit;border-collapse:collapse}:-moz-focusring:where(.pr-twp,.pr-twp *){outline:auto}progress:where(.pr-twp,.pr-twp *){vertical-align:baseline}summary:where(.pr-twp,.pr-twp *){display:list-item}ol:where(.pr-twp,.pr-twp *),ul:where(.pr-twp,.pr-twp *),menu:where(.pr-twp,.pr-twp *){list-style:none}img:where(.pr-twp,.pr-twp *),svg:where(.pr-twp,.pr-twp *),video:where(.pr-twp,.pr-twp *),canvas:where(.pr-twp,.pr-twp *),audio:where(.pr-twp,.pr-twp *),iframe:where(.pr-twp,.pr-twp *),embed:where(.pr-twp,.pr-twp *),object:where(.pr-twp,.pr-twp *){vertical-align:middle;display:block}img:where(.pr-twp,.pr-twp *),video:where(.pr-twp,.pr-twp *){max-width:100%;height:auto}button:where(.pr-twp,.pr-twp *),input:where(.pr-twp,.pr-twp *),select:where(.pr-twp,.pr-twp *),optgroup:where(.pr-twp,.pr-twp *),textarea:where(.pr-twp,.pr-twp *){font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(.pr-twp,.pr-twp *) ::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(select:is([multiple],[size])) optgroup:where(.pr-twp,.pr-twp *){font-weight:bolder}:where(select:is([multiple],[size])) optgroup option:where(.pr-twp,.pr-twp *){padding-inline-start:20px}:where(.pr-twp,.pr-twp *) ::file-selector-button{margin-inline-end:4px}:where(.pr-twp,.pr-twp *) ::placeholder{opacity:1}@supports (not ((-webkit-appearance:-apple-pay-button))) or (contain-intrinsic-size:1px){:where(.pr-twp,.pr-twp *) ::placeholder{color:currentColor}@supports (color:color-mix(in lab, red, red)){:where(.pr-twp,.pr-twp *) ::placeholder{color:color-mix(in oklab, currentcolor 50%, transparent)}}}textarea:where(.pr-twp,.pr-twp *){resize:vertical}:where(.pr-twp,.pr-twp *) ::-webkit-search-decoration{-webkit-appearance:none}:where(.pr-twp,.pr-twp *) ::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit{display:inline-flex}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-fields-wrapper{padding:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-year-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-month-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-day-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-hour-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-minute-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-second-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-millisecond-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-meridiem-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-calendar-picker-indicator{line-height:1}:-moz-ui-invalid:where(.pr-twp,.pr-twp *){box-shadow:none}button:where(.pr-twp,.pr-twp *),input:where([type=button],[type=reset],[type=submit]):where(.pr-twp,.pr-twp *){appearance:button}:where(.pr-twp,.pr-twp *) ::file-selector-button{appearance:button}:where(.pr-twp,.pr-twp *) ::-webkit-inner-spin-button{height:auto}:where(.pr-twp,.pr-twp *) ::-webkit-outer-spin-button{height:auto}[hidden]:where(:not([hidden=until-found])):where(.pr-twp,.pr-twp *){display:none!important}}@layer components;@layer utilities{.tw\\:\\@container\\/card-header{container:card-header/inline-size}.tw\\:\\@container\\/search{container:search/inline-size}.tw\\:\\@container\\/toolbar{container:toolbar/inline-size}.tw\\:pointer-events-auto{pointer-events:auto}.tw\\:pointer-events-none{pointer-events:none}.tw\\:invisible{visibility:hidden}.tw\\:sr-only{clip-path:inset(50%);white-space:nowrap;border-width:0;width:1px;height:1px;margin:-1px;padding:0;position:absolute;overflow:hidden}.tw\\:absolute{position:absolute}.tw\\:fixed{position:fixed}.tw\\:relative{position:relative}.tw\\:sticky{position:sticky}.tw\\:inset-0{inset:calc(calc(var(--spacing)) * 0)}.tw\\:inset-y-0{inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:inset-s-3{inset-inline-start:calc(calc(var(--spacing)) * 3)}.tw\\:start-1\\.5{inset-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:start-1\\/2{inset-inline-start:50%}.tw\\:end-0{inset-inline-end:calc(calc(var(--spacing)) * 0)}.tw\\:end-1{inset-inline-end:calc(calc(var(--spacing)) * 1)}.tw\\:end-2{inset-inline-end:calc(calc(var(--spacing)) * 2)}.tw\\:end-3{inset-inline-end:calc(calc(var(--spacing)) * 3)}.tw\\:inset-e-0{inset-inline-end:calc(calc(var(--spacing)) * 0)}.tw\\:-top-\\[1px\\]{top:-1px}.tw\\:top-0{top:calc(calc(var(--spacing)) * 0)}.tw\\:top-1{top:calc(calc(var(--spacing)) * 1)}.tw\\:top-1\\.5{top:calc(calc(var(--spacing)) * 1.5)}.tw\\:top-1\\/2{top:50%}.tw\\:top-1\\/3{top:33.3333%}.tw\\:top-2{top:calc(calc(var(--spacing)) * 2)}.tw\\:top-2\\.5{top:calc(calc(var(--spacing)) * 2.5)}.tw\\:top-3\\.5{top:calc(calc(var(--spacing)) * 3.5)}.tw\\:top-\\[-1px\\]{top:-1px}.tw\\:top-full{top:100%}.tw\\:-right-1{right:calc(calc(var(--spacing)) * -1)}.tw\\:right-0{right:calc(calc(var(--spacing)) * 0)}.tw\\:right-1{right:calc(calc(var(--spacing)) * 1)}.tw\\:right-3{right:calc(calc(var(--spacing)) * 3)}.tw\\:bottom-0{bottom:calc(calc(var(--spacing)) * 0)}.tw\\:-left-\\[1px\\]{left:-1px}.tw\\:left-0{left:calc(calc(var(--spacing)) * 0)}.tw\\:left-1\\/2{left:50%}.tw\\:left-2{left:calc(calc(var(--spacing)) * 2)}.tw\\:left-3{left:calc(calc(var(--spacing)) * 3)}.tw\\:isolate{isolation:isolate}.tw\\:z-10{z-index:10}.tw\\:z-20{z-index:20}.tw\\:z-50{z-index:50}.tw\\:order-first{order:-9999}.tw\\:order-last{order:9999}.tw\\:col-span-1{grid-column:span 1/span 1}.tw\\:col-span-2{grid-column:span 2/span 2}.tw\\:col-span-3{grid-column:span 3/span 3}.tw\\:col-start-1{grid-column-start:1}.tw\\:col-start-2{grid-column-start:2}.tw\\:row-span-2{grid-row:span 2/span 2}.tw\\:row-start-1{grid-row-start:1}.tw\\:row-start-2{grid-row-start:2}.tw\\:m-0{margin:calc(calc(var(--spacing)) * 0)}.tw\\:m-1{margin:calc(calc(var(--spacing)) * 1)}.tw\\:m-2{margin:calc(calc(var(--spacing)) * 2)}.tw\\:-mx-1{margin-inline:calc(calc(var(--spacing)) * -1)}.tw\\:-mx-4{margin-inline:calc(calc(var(--spacing)) * -4)}.tw\\:mx-0{margin-inline:calc(calc(var(--spacing)) * 0)}.tw\\:mx-1{margin-inline:calc(calc(var(--spacing)) * 1)}.tw\\:mx-2{margin-inline:calc(calc(var(--spacing)) * 2)}.tw\\:mx-3\\.5{margin-inline:calc(calc(var(--spacing)) * 3.5)}.tw\\:mx-4{margin-inline:calc(calc(var(--spacing)) * 4)}.tw\\:mx-8{margin-inline:calc(calc(var(--spacing)) * 8)}.tw\\:my-1{margin-block:calc(calc(var(--spacing)) * 1)}.tw\\:my-2\\.5{margin-block:calc(calc(var(--spacing)) * 2.5)}.tw\\:my-4{margin-block:calc(calc(var(--spacing)) * 4)}.tw\\:my-auto{margin-block:auto}.tw\\:ms-1{margin-inline-start:calc(calc(var(--spacing)) * 1)}.tw\\:ms-2{margin-inline-start:calc(calc(var(--spacing)) * 2)}.tw\\:ms-5{margin-inline-start:calc(calc(var(--spacing)) * 5)}.tw\\:ms-6{margin-inline-start:calc(calc(var(--spacing)) * 6)}.tw\\:ms-auto{margin-inline-start:auto}.tw\\:me-1{margin-inline-end:calc(calc(var(--spacing)) * 1)}.tw\\:me-2{margin-inline-end:calc(calc(var(--spacing)) * 2)}.tw\\:prose{color:var(--tw-prose-body);max-width:65ch}.tw\\:prose :where(p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em}.tw\\:prose :where([class~=lead]):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-lead);margin-top:1.2em;margin-bottom:1.2em;font-size:1.25em;line-height:1.6}.tw\\:prose :where(a):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-links);font-weight:500;text-decoration:underline}.tw\\:prose :where(strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-bold);font-weight:600}.tw\\:prose :where(a strong):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(blockquote strong):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(thead th strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.tw\\:prose :where(ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em;padding-inline-start:1.625em;list-style-type:decimal}.tw\\:prose :where(ol[type=A]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-alpha}.tw\\:prose :where(ol[type=a]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-alpha}.tw\\:prose :where(ol[type=A s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-alpha}.tw\\:prose :where(ol[type=a s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-alpha}.tw\\:prose :where(ol[type=I]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-roman}.tw\\:prose :where(ol[type=i]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-roman}.tw\\:prose :where(ol[type=I s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-roman}.tw\\:prose :where(ol[type=i s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-roman}.tw\\:prose :where(ol[type="1"]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:decimal}.tw\\:prose :where(ul):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em;padding-inline-start:1.625em;list-style-type:disc}.tw\\:prose :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *))::marker{color:var(--tw-prose-counters);font-weight:400}.tw\\:prose :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *))::marker{color:var(--tw-prose-bullets)}.tw\\:prose :where(dt):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:1.25em;font-weight:600}.tw\\:prose :where(hr):not(:where([class~=not-prose],[class~=not-prose] *)){border-color:var(--tw-prose-hr);border-top-width:1px;margin-top:3em;margin-bottom:3em}.tw\\:prose :where(blockquote):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-quotes);border-inline-start-width:.25rem;border-inline-start-color:var(--tw-prose-quote-borders);quotes:"“""”""‘""’";margin-top:1.6em;margin-bottom:1.6em;padding-inline-start:1em;font-style:italic;font-weight:500}.tw\\:prose :where(blockquote p:first-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):before{content:open-quote}.tw\\:prose :where(blockquote p:last-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:close-quote}.tw\\:prose :where(h1):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:0;margin-bottom:.888889em;font-size:2.25em;font-weight:800;line-height:1.11111}.tw\\:prose :where(h1 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:900}.tw\\:prose :where(h2):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:2em;margin-bottom:1em;font-size:1.5em;font-weight:700;line-height:1.33333}.tw\\:prose :where(h2 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:800}.tw\\:prose :where(h3):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:1.6em;margin-bottom:.6em;font-size:1.25em;font-weight:600;line-height:1.6}.tw\\:prose :where(h3 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:700}.tw\\:prose :where(h4):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:1.5em;margin-bottom:.5em;font-weight:600;line-height:1.5}.tw\\:prose :where(h4 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:700}.tw\\:prose :where(img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.tw\\:prose :where(picture):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em;display:block}.tw\\:prose :where(video):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.tw\\:prose :where(kbd):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-kbd);box-shadow:0 0 0 1px rgb(var(--tw-prose-kbd-shadows) / 10%), 0 3px 0 rgb(var(--tw-prose-kbd-shadows) / 10%);padding-top:.1875em;padding-inline-end:.375em;padding-bottom:.1875em;border-radius:.3125rem;padding-inline-start:.375em;font-family:inherit;font-size:.875em;font-weight:500}.tw\\:prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-code);font-size:.875em;font-weight:600}.tw\\:prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)):before,.tw\\:prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:"\`"}.tw\\:prose :where(a code):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h1 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.tw\\:prose :where(h2 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-size:.875em}.tw\\:prose :where(h3 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-size:.9em}.tw\\:prose :where(h4 code):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(blockquote code):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(thead th code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.tw\\:prose :where(pre):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-pre-code);background-color:var(--tw-prose-pre-bg);padding-top:.857143em;padding-inline-end:1.14286em;padding-bottom:.857143em;border-radius:.375rem;margin-top:1.71429em;margin-bottom:1.71429em;padding-inline-start:1.14286em;font-size:.875em;font-weight:400;line-height:1.71429;overflow-x:auto}.tw\\:prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)){font-weight:inherit;color:inherit;font-size:inherit;font-family:inherit;line-height:inherit;background-color:#0000;border-width:0;border-radius:0;padding:0}.tw\\:prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)):before,.tw\\:prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:none}.tw\\:prose :where(table):not(:where([class~=not-prose],[class~=not-prose] *)){table-layout:auto;width:100%;margin-top:2em;margin-bottom:2em;font-size:.875em;line-height:1.71429}.tw\\:prose :where(thead):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:1px;border-bottom-color:var(--tw-prose-th-borders)}.tw\\:prose :where(thead th):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);vertical-align:bottom;padding-inline-end:.571429em;padding-bottom:.571429em;padding-inline-start:.571429em;font-weight:600}.tw\\:prose :where(tbody tr):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:1px;border-bottom-color:var(--tw-prose-td-borders)}.tw\\:prose :where(tbody tr:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:0}.tw\\:prose :where(tbody td):not(:where([class~=not-prose],[class~=not-prose] *)){vertical-align:baseline}.tw\\:prose :where(tfoot):not(:where([class~=not-prose],[class~=not-prose] *)){border-top-width:1px;border-top-color:var(--tw-prose-th-borders)}.tw\\:prose :where(tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){vertical-align:top}.tw\\:prose :where(th,td):not(:where([class~=not-prose],[class~=not-prose] *)){text-align:start}.tw\\:prose :where(figure>*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose :where(figcaption):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-captions);margin-top:.857143em;font-size:.875em;line-height:1.42857}.tw\\:prose{--tw-prose-body:var(--foreground);--tw-prose-headings:var(--foreground);--tw-prose-lead:var(--muted-foreground);--tw-prose-links:var(--primary);--tw-prose-bold:var(--foreground);--tw-prose-counters:var(--muted-foreground);--tw-prose-bullets:var(--muted-foreground);--tw-prose-hr:var(--border);--tw-prose-quotes:var(--foreground);--tw-prose-quote-borders:var(--border);--tw-prose-captions:var(--muted-foreground);--tw-prose-kbd:oklch(21% .034 264.665);--tw-prose-kbd-shadows:NaN NaN NaN;--tw-prose-code:var(--foreground);--tw-prose-pre-code:var(--muted-foreground);--tw-prose-pre-bg:var(--muted);--tw-prose-th-borders:var(--border);--tw-prose-td-borders:var(--border);--tw-prose-invert-body:var(--foreground);--tw-prose-invert-headings:var(--foreground);--tw-prose-invert-lead:var(--muted-foreground);--tw-prose-invert-links:var(--primary);--tw-prose-invert-bold:var(--foreground);--tw-prose-invert-counters:var(--muted-foreground);--tw-prose-invert-bullets:var(--muted-foreground);--tw-prose-invert-hr:var(--border);--tw-prose-invert-quotes:var(--foreground);--tw-prose-invert-quote-borders:var(--border);--tw-prose-invert-captions:var(--muted-foreground);--tw-prose-invert-kbd:#fff;--tw-prose-invert-kbd-shadows:255 255 255;--tw-prose-invert-code:var(--foreground);--tw-prose-invert-pre-code:var(--muted-foreground);--tw-prose-invert-pre-bg:var(--muted);--tw-prose-invert-th-borders:var(--border);--tw-prose-invert-td-borders:var(--border);font-size:1rem;line-height:1.75}.tw\\:prose :where(picture>img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose :where(li):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.5em;margin-bottom:.5em}.tw\\:prose :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:.375em}.tw\\:prose :where(.tw\\:prose>ul>li p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.75em;margin-bottom:.75em}.tw\\:prose :where(.tw\\:prose>ul>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em}.tw\\:prose :where(.tw\\:prose>ul>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.25em}.tw\\:prose :where(.tw\\:prose>ol>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em}.tw\\:prose :where(.tw\\:prose>ol>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.25em}.tw\\:prose :where(ul ul,ul ol,ol ul,ol ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.75em;margin-bottom:.75em}.tw\\:prose :where(dl):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em}.tw\\:prose :where(dd):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.5em;padding-inline-start:1.625em}.tw\\:prose :where(hr+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h2+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h3+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h4+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose :where(thead th:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose :where(thead th:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose :where(tbody td,tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.571429em;padding-inline-end:.571429em;padding-bottom:.571429em;padding-inline-start:.571429em}.tw\\:prose :where(tbody td:first-child,tfoot td:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose :where(tbody td:last-child,tfoot td:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose :where(figure):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.tw\\:prose :where(.tw\\:prose>:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose :where(.tw\\:prose>:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:0}.tw\\:prose-sm{font-size:.875rem;line-height:1.71429}.tw\\:prose-sm :where(p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em;margin-bottom:1.14286em}.tw\\:prose-sm :where([class~=lead]):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.888889em;margin-bottom:.888889em;font-size:1.28571em;line-height:1.55556}.tw\\:prose-sm :where(blockquote):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.33333em;margin-bottom:1.33333em;padding-inline-start:1.11111em}.tw\\:prose-sm :where(h1):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:.8em;font-size:2.14286em;line-height:1.2}.tw\\:prose-sm :where(h2):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.6em;margin-bottom:.8em;font-size:1.42857em;line-height:1.4}.tw\\:prose-sm :where(h3):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.55556em;margin-bottom:.444444em;font-size:1.28571em;line-height:1.55556}.tw\\:prose-sm :where(h4):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.42857em;margin-bottom:.571429em;line-height:1.42857}.tw\\:prose-sm :where(img):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(picture):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.71429em;margin-bottom:1.71429em}.tw\\:prose-sm :where(picture>img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose-sm :where(video):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.71429em;margin-bottom:1.71429em}.tw\\:prose-sm :where(kbd):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.142857em;padding-inline-end:.357143em;padding-bottom:.142857em;border-radius:.3125rem;padding-inline-start:.357143em;font-size:.857143em}.tw\\:prose-sm :where(code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.857143em}.tw\\:prose-sm :where(h2 code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.9em}.tw\\:prose-sm :where(h3 code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.888889em}.tw\\:prose-sm :where(pre):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.666667em;padding-inline-end:1em;padding-bottom:.666667em;border-radius:.25rem;margin-top:1.66667em;margin-bottom:1.66667em;padding-inline-start:1em;font-size:.857143em;line-height:1.66667}.tw\\:prose-sm :where(ol):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(ul):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em;margin-bottom:1.14286em;padding-inline-start:1.57143em}.tw\\:prose-sm :where(li):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.285714em;margin-bottom:.285714em}.tw\\:prose-sm :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:.428571em}.tw\\:prose-sm :where(.tw\\:prose-sm>ul>li p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.571429em;margin-bottom:.571429em}.tw\\:prose-sm :where(.tw\\:prose-sm>ul>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em}.tw\\:prose-sm :where(.tw\\:prose-sm>ul>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.14286em}.tw\\:prose-sm :where(.tw\\:prose-sm>ol>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em}.tw\\:prose-sm :where(.tw\\:prose-sm>ol>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.14286em}.tw\\:prose-sm :where(ul ul,ul ol,ol ul,ol ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.571429em;margin-bottom:.571429em}.tw\\:prose-sm :where(dl):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em;margin-bottom:1.14286em}.tw\\:prose-sm :where(dt):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em}.tw\\:prose-sm :where(dd):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.285714em;padding-inline-start:1.57143em}.tw\\:prose-sm :where(hr):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2.85714em;margin-bottom:2.85714em}.tw\\:prose-sm :where(hr+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(h2+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(h3+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(h4+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose-sm :where(table):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.857143em;line-height:1.5}.tw\\:prose-sm :where(thead th):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:1em;padding-bottom:.666667em;padding-inline-start:1em}.tw\\:prose-sm :where(thead th:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose-sm :where(thead th:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose-sm :where(tbody td,tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.666667em;padding-inline-end:1em;padding-bottom:.666667em;padding-inline-start:1em}.tw\\:prose-sm :where(tbody td:first-child,tfoot td:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose-sm :where(tbody td:last-child,tfoot td:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose-sm :where(figure):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.71429em;margin-bottom:1.71429em}.tw\\:prose-sm :where(figure>*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose-sm :where(figcaption):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.666667em;font-size:.857143em;line-height:1.33333}.tw\\:prose-sm :where(.tw\\:prose-sm>:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose-sm :where(.tw\\:prose-sm>:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:0}.tw\\:-mt-4{margin-top:calc(calc(var(--spacing)) * -4)}.tw\\:mt-0\\.5{margin-top:calc(calc(var(--spacing)) * .5)}.tw\\:mt-1{margin-top:calc(calc(var(--spacing)) * 1)}.tw\\:mt-2{margin-top:calc(calc(var(--spacing)) * 2)}.tw\\:mt-3{margin-top:calc(calc(var(--spacing)) * 3)}.tw\\:mt-4{margin-top:calc(calc(var(--spacing)) * 4)}.tw\\:mt-6{margin-top:calc(calc(var(--spacing)) * 6)}.tw\\:mt-auto{margin-top:auto}.tw\\:mr-1{margin-right:calc(calc(var(--spacing)) * 1)}.tw\\:mr-2{margin-right:calc(calc(var(--spacing)) * 2)}.tw\\:mr-3{margin-right:calc(calc(var(--spacing)) * 3)}.tw\\:-mb-4{margin-bottom:calc(calc(var(--spacing)) * -4)}.tw\\:mb-1{margin-bottom:calc(calc(var(--spacing)) * 1)}.tw\\:mb-2{margin-bottom:calc(calc(var(--spacing)) * 2)}.tw\\:mb-3{margin-bottom:calc(calc(var(--spacing)) * 3)}.tw\\:mb-4{margin-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:ml-1{margin-left:calc(calc(var(--spacing)) * 1)}.tw\\:ml-2{margin-left:calc(calc(var(--spacing)) * 2)}.tw\\:ml-4{margin-left:calc(calc(var(--spacing)) * 4)}.tw\\:ml-auto{margin-left:auto}.tw\\:box-border{box-sizing:border-box}.tw\\:line-clamp-3{-webkit-line-clamp:3;-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden}.tw\\:no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}.tw\\:no-scrollbar::-webkit-scrollbar{display:none}.tw\\:block{display:block}.tw\\:flex{display:flex}.tw\\:grid{display:grid}.tw\\:hidden{display:none}.tw\\:inline-block{display:inline-block}.tw\\:inline-flex{display:inline-flex}.tw\\:inline-grid{display:inline-grid}.tw\\:field-sizing-content{field-sizing:content}.tw\\:aspect-square{aspect-ratio:1}.tw\\:size-2{width:calc(calc(var(--spacing)) * 2);height:calc(calc(var(--spacing)) * 2)}.tw\\:size-2\\.5{width:calc(calc(var(--spacing)) * 2.5);height:calc(calc(var(--spacing)) * 2.5)}.tw\\:size-3{width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:size-3\\.5{width:calc(calc(var(--spacing)) * 3.5);height:calc(calc(var(--spacing)) * 3.5)}.tw\\:size-4{width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:size-6{width:calc(calc(var(--spacing)) * 6);height:calc(calc(var(--spacing)) * 6)}.tw\\:size-7{width:calc(calc(var(--spacing)) * 7);height:calc(calc(var(--spacing)) * 7)}.tw\\:size-8{width:calc(calc(var(--spacing)) * 8);height:calc(calc(var(--spacing)) * 8)}.tw\\:size-9{width:calc(calc(var(--spacing)) * 9);height:calc(calc(var(--spacing)) * 9)}.tw\\:size-10{width:calc(calc(var(--spacing)) * 10);height:calc(calc(var(--spacing)) * 10)}.tw\\:size-full{width:100%;height:100%}.tw\\:h-1{height:calc(calc(var(--spacing)) * 1)}.tw\\:h-2{height:calc(calc(var(--spacing)) * 2)}.tw\\:h-3{height:calc(calc(var(--spacing)) * 3)}.tw\\:h-3\\.5{height:calc(calc(var(--spacing)) * 3.5)}.tw\\:h-4{height:calc(calc(var(--spacing)) * 4)}.tw\\:h-5{height:calc(calc(var(--spacing)) * 5)}.tw\\:h-6{height:calc(calc(var(--spacing)) * 6)}.tw\\:h-7{height:calc(calc(var(--spacing)) * 7)}.tw\\:h-8{height:calc(calc(var(--spacing)) * 8)}.tw\\:h-8\\!{height:calc(calc(var(--spacing)) * 8)!important}.tw\\:h-8\\.5{height:calc(calc(var(--spacing)) * 8.5)}.tw\\:h-9{height:calc(calc(var(--spacing)) * 9)}.tw\\:h-10{height:calc(calc(var(--spacing)) * 10)}.tw\\:h-12{height:calc(calc(var(--spacing)) * 12)}.tw\\:h-14{height:calc(calc(var(--spacing)) * 14)}.tw\\:h-20{height:calc(calc(var(--spacing)) * 20)}.tw\\:h-24{height:calc(calc(var(--spacing)) * 24)}.tw\\:h-32{height:calc(calc(var(--spacing)) * 32)}.tw\\:h-40{height:calc(calc(var(--spacing)) * 40)}.tw\\:h-64{height:calc(calc(var(--spacing)) * 64)}.tw\\:h-80{height:calc(calc(var(--spacing)) * 80)}.tw\\:h-96{height:calc(calc(var(--spacing)) * 96)}.tw\\:h-\\[5px\\]{height:5px}.tw\\:h-\\[260px\\]{height:260px}.tw\\:h-\\[300px\\]{height:300px}.tw\\:h-\\[400px\\]{height:400px}.tw\\:h-\\[600px\\]{height:600px}.tw\\:h-\\[calc\\(100\\%-1px\\)\\]{height:calc(100% - 1px)}.tw\\:h-\\[calc\\(100\\%-2px\\)\\]{height:calc(100% - 2px)}.tw\\:h-auto{height:auto}.tw\\:h-full{height:100%}.tw\\:h-px{height:1px}.tw\\:h-screen{height:100vh}.tw\\:h-svh{height:100svh}.tw\\:max-h-\\(--radix-context-menu-content-available-height\\){max-height:var(--radix-context-menu-content-available-height)}.tw\\:max-h-\\(--radix-dropdown-menu-content-available-height\\){max-height:var(--radix-dropdown-menu-content-available-height)}.tw\\:max-h-\\(--radix-popover-content-available-height\\){max-height:var(--radix-popover-content-available-height)}.tw\\:max-h-\\(--radix-select-content-available-height\\){max-height:var(--radix-select-content-available-height)}.tw\\:max-h-5{max-height:calc(calc(var(--spacing)) * 5)}.tw\\:max-h-10{max-height:calc(calc(var(--spacing)) * 10)}.tw\\:max-h-72{max-height:calc(calc(var(--spacing)) * 72)}.tw\\:max-h-80{max-height:calc(calc(var(--spacing)) * 80)}.tw\\:max-h-\\[96\\%\\]{max-height:96%}.tw\\:max-h-\\[300px\\]{max-height:300px}.tw\\:min-h-0{min-height:calc(calc(var(--spacing)) * 0)}.tw\\:min-h-11{min-height:calc(calc(var(--spacing)) * 11)}.tw\\:min-h-16{min-height:calc(calc(var(--spacing)) * 16)}.tw\\:min-h-\\[200px\\]{min-height:200px}.tw\\:min-h-full{min-height:100%}.tw\\:min-h-svh{min-height:100svh}.tw\\:w-\\(--radix-dropdown-menu-trigger-width\\){width:var(--radix-dropdown-menu-trigger-width)}.tw\\:w-\\(--sidebar-width\\){width:var(--sidebar-width)}.tw\\:w-1{width:calc(calc(var(--spacing)) * 1)}.tw\\:w-1\\/2{width:50%}.tw\\:w-2{width:calc(calc(var(--spacing)) * 2)}.tw\\:w-3{width:calc(calc(var(--spacing)) * 3)}.tw\\:w-3\\.5{width:calc(calc(var(--spacing)) * 3.5)}.tw\\:w-3\\/4{width:75%}.tw\\:w-4{width:calc(calc(var(--spacing)) * 4)}.tw\\:w-4\\/5{width:80%}.tw\\:w-4\\/6{width:66.6667%}.tw\\:w-5{width:calc(calc(var(--spacing)) * 5)}.tw\\:w-5\\/6{width:83.3333%}.tw\\:w-6{width:calc(calc(var(--spacing)) * 6)}.tw\\:w-8{width:calc(calc(var(--spacing)) * 8)}.tw\\:w-9{width:calc(calc(var(--spacing)) * 9)}.tw\\:w-9\\/12{width:75%}.tw\\:w-10{width:calc(calc(var(--spacing)) * 10)}.tw\\:w-12{width:calc(calc(var(--spacing)) * 12)}.tw\\:w-14{width:calc(calc(var(--spacing)) * 14)}.tw\\:w-20{width:calc(calc(var(--spacing)) * 20)}.tw\\:w-24{width:calc(calc(var(--spacing)) * 24)}.tw\\:w-32{width:calc(calc(var(--spacing)) * 32)}.tw\\:w-48{width:calc(calc(var(--spacing)) * 48)}.tw\\:w-56{width:calc(calc(var(--spacing)) * 56)}.tw\\:w-60{width:calc(calc(var(--spacing)) * 60)}.tw\\:w-64{width:calc(calc(var(--spacing)) * 64)}.tw\\:w-72{width:calc(calc(var(--spacing)) * 72)}.tw\\:w-80{width:calc(calc(var(--spacing)) * 80)}.tw\\:w-96{width:calc(calc(var(--spacing)) * 96)}.tw\\:w-\\[1px\\]{width:1px}.tw\\:w-\\[5px\\]{width:5px}.tw\\:w-\\[70px\\]{width:70px}.tw\\:w-\\[100px\\]{width:100px}.tw\\:w-\\[116px\\]{width:116px}.tw\\:w-\\[124px\\]{width:124px}.tw\\:w-\\[150px\\]{width:150px}.tw\\:w-\\[180px\\]{width:180px}.tw\\:w-\\[200px\\]{width:200px}.tw\\:w-\\[250px\\]{width:250px}.tw\\:w-\\[260px\\]{width:260px}.tw\\:w-\\[280px\\]{width:280px}.tw\\:w-\\[300px\\]{width:300px}.tw\\:w-\\[320px\\]{width:320px}.tw\\:w-\\[350px\\]{width:350px}.tw\\:w-\\[400px\\]{width:400px}.tw\\:w-\\[420px\\]{width:420px}.tw\\:w-\\[500px\\]{width:500px}.tw\\:w-\\[560px\\]{width:560px}.tw\\:w-\\[600px\\]{width:600px}.tw\\:w-\\[calc\\(100\\%-2px\\)\\]{width:calc(100% - 2px)}.tw\\:w-\\[var\\(--radix-dropdown-menu-trigger-width\\)\\]{width:var(--radix-dropdown-menu-trigger-width)}.tw\\:w-auto{width:auto}.tw\\:w-fit{width:fit-content}.tw\\:w-full{width:100%}.tw\\:w-max{width:max-content}.tw\\:w-px{width:1px}.tw\\:max-w-\\(--skeleton-width\\){max-width:var(--skeleton-width)}.tw\\:max-w-2xl{max-width:var(--tw-container-2xl)}.tw\\:max-w-3xl{max-width:var(--tw-container-3xl)}.tw\\:max-w-4xl{max-width:var(--tw-container-4xl)}.tw\\:max-w-5{max-width:calc(calc(var(--spacing)) * 5)}.tw\\:max-w-6xl{max-width:var(--tw-container-6xl)}.tw\\:max-w-40{max-width:calc(calc(var(--spacing)) * 40)}.tw\\:max-w-48{max-width:calc(calc(var(--spacing)) * 48)}.tw\\:max-w-64{max-width:calc(calc(var(--spacing)) * 64)}.tw\\:max-w-96{max-width:calc(calc(var(--spacing)) * 96)}.tw\\:max-w-\\[200px\\]{max-width:200px}.tw\\:max-w-\\[220px\\]{max-width:220px}.tw\\:max-w-\\[calc\\(100\\%-2rem\\)\\]{max-width:calc(100% - 2rem)}.tw\\:max-w-\\[calc\\(100vw-2rem\\)\\]{max-width:calc(100vw - 2rem)}.tw\\:max-w-fit{max-width:fit-content}.tw\\:max-w-full{max-width:100%}.tw\\:max-w-lg{max-width:var(--tw-container-lg)}.tw\\:max-w-md{max-width:var(--tw-container-md)}.tw\\:max-w-none{max-width:none}.tw\\:max-w-sm{max-width:var(--tw-container-sm)}.tw\\:max-w-xs{max-width:var(--tw-container-xs)}.tw\\:min-w-0{min-width:calc(calc(var(--spacing)) * 0)}.tw\\:min-w-4{min-width:calc(calc(var(--spacing)) * 4)}.tw\\:min-w-5{min-width:calc(calc(var(--spacing)) * 5)}.tw\\:min-w-7{min-width:calc(calc(var(--spacing)) * 7)}.tw\\:min-w-8{min-width:calc(calc(var(--spacing)) * 8)}.tw\\:min-w-9{min-width:calc(calc(var(--spacing)) * 9)}.tw\\:min-w-16{min-width:calc(calc(var(--spacing)) * 16)}.tw\\:min-w-32{min-width:calc(calc(var(--spacing)) * 32)}.tw\\:min-w-36{min-width:calc(calc(var(--spacing)) * 36)}.tw\\:min-w-80{min-width:calc(calc(var(--spacing)) * 80)}.tw\\:min-w-\\[12rem\\]{min-width:12rem}.tw\\:min-w-\\[26px\\]{min-width:26px}.tw\\:min-w-\\[96px\\]{min-width:96px}.tw\\:min-w-\\[140px\\]{min-width:140px}.tw\\:min-w-\\[215px\\]{min-width:215px}.tw\\:min-w-\\[500px\\]{min-width:500px}.tw\\:min-w-min{min-width:min-content}.tw\\:flex-1{flex:1}.tw\\:shrink{flex-shrink:1}.tw\\:shrink\\!{flex-shrink:1!important}.tw\\:shrink-0{flex-shrink:0}.tw\\:shrink-\\[9999\\]{flex-shrink:9999}.tw\\:flex-grow,.tw\\:grow,.tw\\:grow-\\[1\\]{flex-grow:1}.tw\\:grow-\\[10\\]{flex-grow:10}.tw\\:basis-0{flex-basis:calc(calc(var(--spacing)) * 0)}.tw\\:caption-bottom{caption-side:bottom}.tw\\:border-collapse{border-collapse:collapse}.tw\\:origin-\\(--radix-context-menu-content-transform-origin\\){transform-origin:var(--radix-context-menu-content-transform-origin)}.tw\\:origin-\\(--radix-dropdown-menu-content-transform-origin\\){transform-origin:var(--radix-dropdown-menu-content-transform-origin)}.tw\\:origin-\\(--radix-menubar-content-transform-origin\\){transform-origin:var(--radix-menubar-content-transform-origin)}.tw\\:origin-\\(--radix-popover-content-transform-origin\\){transform-origin:var(--radix-popover-content-transform-origin)}.tw\\:origin-\\(--radix-select-content-transform-origin\\){transform-origin:var(--radix-select-content-transform-origin)}.tw\\:origin-\\(--radix-tooltip-content-transform-origin\\){transform-origin:var(--radix-tooltip-content-transform-origin)}.tw\\:-translate-x-1\\/2{--tw-translate-x:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:-translate-x-px{--tw-translate-x:-1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:translate-x-px{--tw-translate-x:1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:-translate-y-1\\/2{--tw-translate-y:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:translate-y-0{--tw-translate-y:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:translate-y-px{--tw-translate-y:1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rotate-45{rotate:45deg}.tw\\:rotate-180{rotate:180deg}.tw\\:transform{transform:var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,)}.tw\\:animate-none\\!{animation:none!important}.tw\\:animate-pulse{animation:var(--tw-animate-pulse)}.tw\\:animate-spin{animation:var(--tw-animate-spin)}.tw\\:cursor-default{cursor:default}.tw\\:cursor-ew-resize{cursor:ew-resize}.tw\\:cursor-not-allowed{cursor:not-allowed}.tw\\:cursor-pointer{cursor:pointer}.tw\\:cursor-text{cursor:text}.tw\\:touch-none{touch-action:none}.tw\\:resize{resize:both}.tw\\:resize-none{resize:none}.tw\\:scroll-m-20{scroll-margin:calc(calc(var(--spacing)) * 20)}.tw\\:scroll-my-1{scroll-margin-block:calc(calc(var(--spacing)) * 1)}.tw\\:scroll-py-1{scroll-padding-block:calc(calc(var(--spacing)) * 1)}.tw\\:list-inside{list-style-position:inside}.tw\\:list-outside{list-style-position:outside}.tw\\:\\!list-\\[lower-alpha\\]{list-style-type:lower-alpha!important}.tw\\:\\!list-\\[lower-roman\\]{list-style-type:lower-roman!important}.tw\\:\\!list-\\[upper-alpha\\]{list-style-type:upper-alpha!important}.tw\\:\\!list-\\[upper-roman\\]{list-style-type:upper-roman!important}.tw\\:\\!list-decimal{list-style-type:decimal!important}.tw\\:\\!list-disc{list-style-type:disc!important}.tw\\:list-decimal{list-style-type:decimal}.tw\\:list-disc{list-style-type:disc}.tw\\:list-none{list-style-type:none}.tw\\:grid-flow-col{grid-auto-flow:column}.tw\\:grid-flow-row{grid-auto-flow:row}.tw\\:auto-rows-min{grid-auto-rows:min-content}.tw\\:grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}.tw\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.tw\\:grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.tw\\:grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}.tw\\:grid-cols-\\[25\\%_25\\%_50\\%\\]{grid-template-columns:25% 25% 50%}.tw\\:grid-cols-\\[25\\%_50\\%_25\\%\\]{grid-template-columns:25% 50% 25%}.tw\\:grid-cols-\\[auto_auto_auto_auto\\]{grid-template-columns:auto auto auto auto}.tw\\:grid-cols-\\[min-content_1fr\\]{grid-template-columns:min-content 1fr}.tw\\:grid-cols-\\[min-content_min-content_1fr\\]{grid-template-columns:min-content min-content 1fr}.tw\\:grid-cols-subgrid{grid-template-columns:subgrid}.tw\\:flex-col{flex-direction:column}.tw\\:flex-col-reverse{flex-direction:column-reverse}.tw\\:flex-row{flex-direction:row}.tw\\:flex-row-reverse{flex-direction:row-reverse}.tw\\:flex-nowrap{flex-wrap:nowrap}.tw\\:flex-wrap{flex-wrap:wrap}.tw\\:place-content-center{place-content:center}.tw\\:content-center{align-content:center}.tw\\:items-baseline{align-items:baseline}.tw\\:items-center{align-items:center}.tw\\:items-end{align-items:flex-end}.tw\\:items-start{align-items:flex-start}.tw\\:items-stretch{align-items:stretch}.tw\\:justify-between{justify-content:space-between}.tw\\:justify-center{justify-content:center}.tw\\:justify-end{justify-content:flex-end}.tw\\:justify-start{justify-content:flex-start}.tw\\:gap-0{gap:calc(calc(var(--spacing)) * 0)}.tw\\:gap-0\\.5{gap:calc(calc(var(--spacing)) * .5)}.tw\\:gap-1{gap:calc(calc(var(--spacing)) * 1)}.tw\\:gap-1\\.5{gap:calc(calc(var(--spacing)) * 1.5)}.tw\\:gap-1\\.5\\!{gap:calc(calc(var(--spacing)) * 1.5)!important}.tw\\:gap-2{gap:calc(calc(var(--spacing)) * 2)}.tw\\:gap-2\\.5{gap:calc(calc(var(--spacing)) * 2.5)}.tw\\:gap-3{gap:calc(calc(var(--spacing)) * 3)}.tw\\:gap-4{gap:calc(calc(var(--spacing)) * 4)}.tw\\:gap-5{gap:calc(calc(var(--spacing)) * 5)}.tw\\:gap-6{gap:calc(calc(var(--spacing)) * 6)}.tw\\:gap-8{gap:calc(calc(var(--spacing)) * 8)}.tw\\:gap-16{gap:calc(calc(var(--spacing)) * 16)}.tw\\:gap-\\[--spacing\\(var\\(--gap\\)\\)\\]{gap:calc(calc(var(--spacing)) * var(--gap))}.tw\\:gap-\\[12px\\]{gap:12px}:where(.tw\\:space-y-1>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 1) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 1) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-1\\.5>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 1.5) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 1.5) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-2>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 2) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 2) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-3>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 3) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 3) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-4>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 4) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 4) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-6>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 6) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 6) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-8>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 8) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 8) * calc(1 - var(--tw-space-y-reverse)))}.tw\\:gap-x-1{column-gap:calc(calc(var(--spacing)) * 1)}.tw\\:gap-x-2{column-gap:calc(calc(var(--spacing)) * 2)}.tw\\:gap-x-3{column-gap:calc(calc(var(--spacing)) * 3)}.tw\\:gap-x-4{column-gap:calc(calc(var(--spacing)) * 4)}:where(.tw\\:-space-x-2>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * -2) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * -2) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-2>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 2) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 2) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-3>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 3) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 3) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-4>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 4) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 4) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-6>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 6) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 6) * calc(1 - var(--tw-space-x-reverse)))}.tw\\:gap-y-1{row-gap:calc(calc(var(--spacing)) * 1)}.tw\\:gap-y-2{row-gap:calc(calc(var(--spacing)) * 2)}:where(.tw\\:divide-x>:not(:last-child)){--tw-divide-x-reverse:0;border-inline-style:var(--tw-border-style);border-inline-start-width:calc(1px * var(--tw-divide-x-reverse));border-inline-end-width:calc(1px * calc(1 - var(--tw-divide-x-reverse)))}:where(.tw\\:divide-y>:not(:last-child)){--tw-divide-y-reverse:0;border-bottom-style:var(--tw-border-style);border-top-style:var(--tw-border-style);border-top-width:calc(1px * var(--tw-divide-y-reverse));border-bottom-width:calc(1px * calc(1 - var(--tw-divide-y-reverse)))}.tw\\:self-start{align-self:flex-start}.tw\\:self-stretch{align-self:stretch}.tw\\:justify-self-end{justify-self:flex-end}.tw\\:truncate{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.tw\\:overflow-auto{overflow:auto}.tw\\:overflow-clip{overflow:clip}.tw\\:overflow-hidden{overflow:hidden}.tw\\:overflow-scroll{overflow:scroll}.tw\\:overflow-visible{overflow:visible}.tw\\:overflow-x-auto{overflow-x:auto}.tw\\:overflow-x-hidden{overflow-x:hidden}.tw\\:overflow-y-auto{overflow-y:auto}.tw\\:overflow-y-hidden{overflow-y:hidden}.tw\\:rounded{border-radius:.25rem}.tw\\:rounded-2xl{border-radius:calc(var(--radius) * 1.8)}.tw\\:rounded-4xl{border-radius:calc(var(--radius) * 2.6)}.tw\\:rounded-\\[4px\\]{border-radius:4px}.tw\\:rounded-\\[6px\\]{border-radius:6px}.tw\\:rounded-\\[calc\\(var\\(--radius\\)-3px\\)\\]{border-radius:calc(var(--radius) - 3px)}.tw\\:rounded-\\[min\\(var\\(--tw-radius-md\\)\\,10px\\)\\]{border-radius:min(var(--tw-radius-md), 10px)}.tw\\:rounded-\\[min\\(var\\(--tw-radius-md\\)\\,12px\\)\\]{border-radius:min(var(--tw-radius-md), 12px)}.tw\\:rounded-full{border-radius:3.40282e38px}.tw\\:rounded-lg{border-radius:var(--radius)}.tw\\:rounded-lg\\!{border-radius:var(--radius)!important}.tw\\:rounded-md{border-radius:calc(var(--radius) * .8)}.tw\\:rounded-none{border-radius:0}.tw\\:rounded-sm{border-radius:calc(var(--radius) * .6)}.tw\\:rounded-xl{border-radius:calc(var(--radius) * 1.4)}.tw\\:rounded-xl\\!{border-radius:calc(var(--radius) * 1.4)!important}.tw\\:rounded-xs{border-radius:var(--tw-radius-xs)}.tw\\:rounded-s-none{border-start-start-radius:0;border-end-start-radius:0}.tw\\:rounded-e-none{border-start-end-radius:0;border-end-end-radius:0}.tw\\:rounded-t-xl{border-top-left-radius:calc(var(--radius) * 1.4);border-top-right-radius:calc(var(--radius) * 1.4)}.tw\\:rounded-l-lg{border-top-left-radius:var(--radius);border-bottom-left-radius:var(--radius)}.tw\\:rounded-r-xl{border-top-right-radius:calc(var(--radius) * 1.4);border-bottom-right-radius:calc(var(--radius) * 1.4)}.tw\\:rounded-b-xl{border-bottom-right-radius:calc(var(--radius) * 1.4);border-bottom-left-radius:calc(var(--radius) * 1.4)}.tw\\:border{border-style:var(--tw-border-style);border-width:1px}.tw\\:border-0{border-style:var(--tw-border-style);border-width:0}.tw\\:border-2{border-style:var(--tw-border-style);border-width:2px}.tw\\:border-s{border-inline-start-style:var(--tw-border-style);border-inline-start-width:1px}.tw\\:border-s-0{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:border-s-2{border-inline-start-style:var(--tw-border-style);border-inline-start-width:2px}.tw\\:border-s-4{border-inline-start-style:var(--tw-border-style);border-inline-start-width:4px}.tw\\:border-e{border-inline-end-style:var(--tw-border-style);border-inline-end-width:1px}.tw\\:border-e-0{border-inline-end-style:var(--tw-border-style);border-inline-end-width:0}.tw\\:border-t{border-top-style:var(--tw-border-style);border-top-width:1px}.tw\\:border-t-0{border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:border-b{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}.tw\\:border-b-0{border-bottom-style:var(--tw-border-style);border-bottom-width:0}.tw\\:border-l-2{border-left-style:var(--tw-border-style);border-left-width:2px}.tw\\:border-l-4{border-left-style:var(--tw-border-style);border-left-width:4px}.tw\\:border-dashed{--tw-border-style:dashed;border-style:dashed}.tw\\:border-none{--tw-border-style:none;border-style:none}.tw\\:border-solid{--tw-border-style:solid;border-style:solid}.tw\\:border-black{border-color:var(--tw-color-black)}.tw\\:border-blue-400{border-color:var(--tw-color-blue-400)}.tw\\:border-blue-500{border-color:var(--tw-color-blue-500)}.tw\\:border-border,.tw\\:border-border\\/50{border-color:var(--border)}@supports (color:color-mix(in lab, red, red)){.tw\\:border-border\\/50{border-color:color-mix(in oklab, var(--border) 50%, transparent)}}.tw\\:border-destructive{border-color:var(--destructive)}.tw\\:border-foreground{border-color:var(--foreground)}.tw\\:border-gray-300{border-color:var(--tw-color-gray-300)}.tw\\:border-input,.tw\\:border-input\\/30{border-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:border-input\\/30{border-color:color-mix(in oklab, var(--input) 30%, transparent)}}.tw\\:border-muted-foreground,.tw\\:border-muted-foreground\\/40{border-color:var(--muted-foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:border-muted-foreground\\/40{border-color:color-mix(in oklab, var(--muted-foreground) 40%, transparent)}}.tw\\:border-primary{border-color:var(--primary)}.tw\\:border-red-300{border-color:var(--tw-color-red-300)}.tw\\:border-red-400{border-color:var(--tw-color-red-400)}.tw\\:border-red-500{border-color:var(--tw-color-red-500)}.tw\\:border-red-600{border-color:var(--tw-color-red-600)}.tw\\:border-ring{border-color:var(--ring)}.tw\\:border-sidebar-border{border-color:var(--sidebar-border)}.tw\\:border-slate-300{border-color:var(--tw-color-slate-300)}.tw\\:border-transparent{border-color:#0000}.tw\\:border-yellow-400{border-color:var(--tw-color-yellow-400)}.tw\\:border-yellow-500{border-color:var(--tw-color-yellow-500)}.tw\\:border-s-amber-200{border-inline-start-color:var(--tw-color-amber-200)}.tw\\:border-s-indigo-200{border-inline-start-color:var(--tw-color-indigo-200)}.tw\\:border-s-purple-200{border-inline-start-color:var(--tw-color-purple-200)}.tw\\:border-s-red-200{border-inline-start-color:var(--tw-color-red-200)}.tw\\:\\!bg-destructive\\/50{background-color:var(--destructive)!important}@supports (color:color-mix(in lab, red, red)){.tw\\:\\!bg-destructive\\/50{background-color:color-mix(in oklab, var(--destructive) 50%, transparent)!important}}.tw\\:bg-\\[color-mix\\(in_oklab\\,var\\(--destructive\\)_10\\%\\,var\\(--background\\)\\)\\]{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-\\[color-mix\\(in_oklab\\,var\\(--destructive\\)_10\\%\\,var\\(--background\\)\\)\\]{background-color:color-mix(in oklab,var(--destructive) 10%,var(--background))}}.tw\\:bg-accent,.tw\\:bg-accent\\/50{background-color:var(--accent)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-accent\\/50{background-color:color-mix(in oklab, var(--accent) 50%, transparent)}}.tw\\:bg-amber-500,.tw\\:bg-amber-500\\/5{background-color:var(--tw-color-amber-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-amber-500\\/5{background-color:color-mix(in oklab, var(--tw-color-amber-500) 5%, transparent)}}.tw\\:bg-amber-500\\/15{background-color:var(--tw-color-amber-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-amber-500\\/15{background-color:color-mix(in oklab, var(--tw-color-amber-500) 15%, transparent)}}.tw\\:bg-background,.tw\\:bg-background\\/50{background-color:var(--background)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-background\\/50{background-color:color-mix(in oklab, var(--background) 50%, transparent)}}.tw\\:bg-black\\/10{background-color:var(--tw-color-black)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-black\\/10{background-color:color-mix(in oklab, var(--tw-color-black) 10%, transparent)}}.tw\\:bg-blue-50{background-color:var(--tw-color-blue-50)}.tw\\:bg-blue-100{background-color:var(--tw-color-blue-100)}.tw\\:bg-blue-400{background-color:var(--tw-color-blue-400)}.tw\\:bg-blue-500{background-color:var(--tw-color-blue-500)}.tw\\:bg-border{background-color:var(--border)}.tw\\:bg-card{background-color:var(--card)}.tw\\:bg-destructive\\/10{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-destructive\\/10{background-color:color-mix(in oklab, var(--destructive) 10%, transparent)}}.tw\\:bg-foreground{background-color:var(--foreground)}.tw\\:bg-gray-50{background-color:var(--tw-color-gray-50)}.tw\\:bg-gray-100{background-color:var(--tw-color-gray-100)}.tw\\:bg-gray-500{background-color:var(--tw-color-gray-500)}.tw\\:bg-green-50{background-color:var(--tw-color-green-50)}.tw\\:bg-green-100{background-color:var(--tw-color-green-100)}.tw\\:bg-green-500{background-color:var(--tw-color-green-500)}.tw\\:bg-input,.tw\\:bg-input\\/30{background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-input\\/30{background-color:color-mix(in oklab, var(--input) 30%, transparent)}}.tw\\:bg-muted,.tw\\:bg-muted\\/50{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-muted\\/50{background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:bg-neutral-300{background-color:var(--tw-color-neutral-300)}.tw\\:bg-orange-100{background-color:var(--tw-color-orange-100)}.tw\\:bg-popover,.tw\\:bg-popover\\/70{background-color:var(--popover)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-popover\\/70{background-color:color-mix(in oklab, var(--popover) 70%, transparent)}}.tw\\:bg-primary{background-color:var(--primary)}.tw\\:bg-primary-foreground{background-color:var(--primary-foreground)}.tw\\:bg-primary\\/30{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-primary\\/30{background-color:color-mix(in oklab, var(--primary) 30%, transparent)}}.tw\\:bg-purple-50{background-color:var(--tw-color-purple-50)}.tw\\:bg-red-100{background-color:var(--tw-color-red-100)}.tw\\:bg-red-500{background-color:var(--tw-color-red-500)}.tw\\:bg-rose-500,.tw\\:bg-rose-500\\/5{background-color:var(--tw-color-rose-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-rose-500\\/5{background-color:color-mix(in oklab, var(--tw-color-rose-500) 5%, transparent)}}.tw\\:bg-rose-500\\/15{background-color:var(--tw-color-rose-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-rose-500\\/15{background-color:color-mix(in oklab, var(--tw-color-rose-500) 15%, transparent)}}.tw\\:bg-secondary{background-color:var(--secondary)}.tw\\:bg-sidebar{background-color:var(--sidebar)}.tw\\:bg-sidebar-accent{background-color:var(--sidebar-accent)}.tw\\:bg-sidebar-border{background-color:var(--sidebar-border)}.tw\\:bg-sky-500,.tw\\:bg-sky-500\\/5{background-color:var(--tw-color-sky-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-sky-500\\/5{background-color:color-mix(in oklab, var(--tw-color-sky-500) 5%, transparent)}}.tw\\:bg-sky-500\\/15{background-color:var(--tw-color-sky-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-sky-500\\/15{background-color:color-mix(in oklab, var(--tw-color-sky-500) 15%, transparent)}}.tw\\:bg-teal-500,.tw\\:bg-teal-500\\/5{background-color:var(--tw-color-teal-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-teal-500\\/5{background-color:color-mix(in oklab, var(--tw-color-teal-500) 5%, transparent)}}.tw\\:bg-teal-500\\/15{background-color:var(--tw-color-teal-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-teal-500\\/15{background-color:color-mix(in oklab, var(--tw-color-teal-500) 15%, transparent)}}.tw\\:bg-transparent{background-color:#0000}.tw\\:bg-white{background-color:var(--tw-color-white)}.tw\\:bg-yellow-50{background-color:var(--tw-color-yellow-50)}.tw\\:bg-yellow-100{background-color:var(--tw-color-yellow-100)}.tw\\:bg-yellow-500{background-color:var(--tw-color-yellow-500)}.tw\\:bg-zinc-400{background-color:var(--tw-color-zinc-400)}.tw\\:bg-clip-padding{background-clip:padding-box}.tw\\:fill-\\[color-mix\\(in_oklab\\,var\\(--destructive\\)_10\\%\\,var\\(--background\\)\\)\\]{fill:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:fill-\\[color-mix\\(in_oklab\\,var\\(--destructive\\)_10\\%\\,var\\(--background\\)\\)\\]{fill:color-mix(in oklab,var(--destructive) 10%,var(--background))}}.tw\\:fill-destructive{fill:var(--destructive)}.tw\\:fill-foreground{fill:var(--foreground)}.tw\\:fill-yellow-400,.tw\\:fill-yellow-400\\/50{fill:var(--tw-color-yellow-400)}@supports (color:color-mix(in lab, red, red)){.tw\\:fill-yellow-400\\/50{fill:color-mix(in oklab, var(--tw-color-yellow-400) 50%, transparent)}}.tw\\:object-cover{object-fit:cover}.tw\\:\\!p-4{padding:calc(calc(var(--spacing)) * 4)!important}.tw\\:p-0{padding:calc(calc(var(--spacing)) * 0)}.tw\\:p-0\\.5{padding:calc(calc(var(--spacing)) * .5)}.tw\\:p-1{padding:calc(calc(var(--spacing)) * 1)}.tw\\:p-2{padding:calc(calc(var(--spacing)) * 2)}.tw\\:p-2\\.5{padding:calc(calc(var(--spacing)) * 2.5)}.tw\\:p-3{padding:calc(calc(var(--spacing)) * 3)}.tw\\:p-4{padding:calc(calc(var(--spacing)) * 4)}.tw\\:p-6{padding:calc(calc(var(--spacing)) * 6)}.tw\\:p-8{padding:calc(calc(var(--spacing)) * 8)}.tw\\:p-\\[1px\\]{padding:1px}.tw\\:p-\\[3px\\]{padding:3px}.tw\\:p-\\[10px\\]{padding:10px}.tw\\:p-\\[16px\\]{padding:16px}.tw\\:px-0{padding-inline:calc(calc(var(--spacing)) * 0)}.tw\\:px-0\\.5{padding-inline:calc(calc(var(--spacing)) * .5)}.tw\\:px-1{padding-inline:calc(calc(var(--spacing)) * 1)}.tw\\:px-1\\.5{padding-inline:calc(calc(var(--spacing)) * 1.5)}.tw\\:px-2{padding-inline:calc(calc(var(--spacing)) * 2)}.tw\\:px-2\\.5{padding-inline:calc(calc(var(--spacing)) * 2.5)}.tw\\:px-3{padding-inline:calc(calc(var(--spacing)) * 3)}.tw\\:px-4{padding-inline:calc(calc(var(--spacing)) * 4)}.tw\\:px-6{padding-inline:calc(calc(var(--spacing)) * 6)}.tw\\:py-0{padding-block:calc(calc(var(--spacing)) * 0)}.tw\\:py-0\\.5{padding-block:calc(calc(var(--spacing)) * .5)}.tw\\:py-1{padding-block:calc(calc(var(--spacing)) * 1)}.tw\\:py-1\\.5{padding-block:calc(calc(var(--spacing)) * 1.5)}.tw\\:py-2{padding-block:calc(calc(var(--spacing)) * 2)}.tw\\:py-3{padding-block:calc(calc(var(--spacing)) * 3)}.tw\\:py-4{padding-block:calc(calc(var(--spacing)) * 4)}.tw\\:py-6{padding-block:calc(calc(var(--spacing)) * 6)}.tw\\:py-8{padding-block:calc(calc(var(--spacing)) * 8)}.tw\\:py-\\[2px\\]{padding-block:2px}.tw\\:ps-1\\.5{padding-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:ps-2{padding-inline-start:calc(calc(var(--spacing)) * 2)}.tw\\:ps-2\\.5{padding-inline-start:calc(calc(var(--spacing)) * 2.5)}.tw\\:ps-4{padding-inline-start:calc(calc(var(--spacing)) * 4)}.tw\\:ps-6{padding-inline-start:calc(calc(var(--spacing)) * 6)}.tw\\:ps-7{padding-inline-start:calc(calc(var(--spacing)) * 7)}.tw\\:ps-8{padding-inline-start:calc(calc(var(--spacing)) * 8)}.tw\\:ps-9{padding-inline-start:calc(calc(var(--spacing)) * 9)}.tw\\:ps-12{padding-inline-start:calc(calc(var(--spacing)) * 12)}.tw\\:ps-\\[85px\\]{padding-inline-start:85px}.tw\\:pe-1{padding-inline-end:calc(calc(var(--spacing)) * 1)}.tw\\:pe-1\\.5{padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:pe-2{padding-inline-end:calc(calc(var(--spacing)) * 2)}.tw\\:pe-4{padding-inline-end:calc(calc(var(--spacing)) * 4)}.tw\\:pe-8{padding-inline-end:calc(calc(var(--spacing)) * 8)}.tw\\:pe-8\\!{padding-inline-end:calc(calc(var(--spacing)) * 8)!important}.tw\\:pe-9{padding-inline-end:calc(calc(var(--spacing)) * 9)}.tw\\:pe-\\[calc\\(138px\\+1rem\\)\\]{padding-inline-end:calc(138px + 1rem)}.tw\\:pe-\\[…\\]{padding-inline-end:…}.tw\\:pt-1{padding-top:calc(calc(var(--spacing)) * 1)}.tw\\:pt-2{padding-top:calc(calc(var(--spacing)) * 2)}.tw\\:pt-3{padding-top:calc(calc(var(--spacing)) * 3)}.tw\\:pt-4{padding-top:calc(calc(var(--spacing)) * 4)}.tw\\:pt-6{padding-top:calc(calc(var(--spacing)) * 6)}.tw\\:pr-0{padding-right:calc(calc(var(--spacing)) * 0)}.tw\\:pr-1{padding-right:calc(calc(var(--spacing)) * 1)}.tw\\:pr-2{padding-right:calc(calc(var(--spacing)) * 2)}.tw\\:pr-3{padding-right:calc(calc(var(--spacing)) * 3)}.tw\\:pr-4{padding-right:calc(calc(var(--spacing)) * 4)}.tw\\:pb-0{padding-bottom:calc(calc(var(--spacing)) * 0)}.tw\\:pb-1{padding-bottom:calc(calc(var(--spacing)) * 1)}.tw\\:pb-2{padding-bottom:calc(calc(var(--spacing)) * 2)}.tw\\:pb-3{padding-bottom:calc(calc(var(--spacing)) * 3)}.tw\\:pb-4{padding-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:pb-8{padding-bottom:calc(calc(var(--spacing)) * 8)}.tw\\:pb-12{padding-bottom:calc(calc(var(--spacing)) * 12)}.tw\\:pb-16{padding-bottom:calc(calc(var(--spacing)) * 16)}.tw\\:pb-24{padding-bottom:calc(calc(var(--spacing)) * 24)}.tw\\:pl-2{padding-left:calc(calc(var(--spacing)) * 2)}.tw\\:pl-3{padding-left:calc(calc(var(--spacing)) * 3)}.tw\\:pl-4{padding-left:calc(calc(var(--spacing)) * 4)}.tw\\:pl-5{padding-left:calc(calc(var(--spacing)) * 5)}.tw\\:pl-6{padding-left:calc(calc(var(--spacing)) * 6)}.tw\\:pl-8{padding-left:calc(calc(var(--spacing)) * 8)}.tw\\:text-center{text-align:center}.tw\\:text-end{text-align:end}.tw\\:text-left{text-align:left}.tw\\:text-right{text-align:right}.tw\\:text-start{text-align:start}.tw\\:align-middle{vertical-align:middle}.tw\\:font-heading{font-family:var(--font-sans)}.tw\\:font-mono{font-family:var(--tw-font-mono)}.tw\\:font-sans{font-family:IBM Plex Sans Variable,sans-serif}.tw\\:text-2xl{font-size:var(--tw-text-2xl);line-height:var(--tw-leading,var(--tw-text-2xl--line-height))}.tw\\:text-3xl{font-size:var(--tw-text-3xl);line-height:var(--tw-leading,var(--tw-text-3xl--line-height))}.tw\\:text-4xl{font-size:var(--tw-text-4xl);line-height:var(--tw-leading,var(--tw-text-4xl--line-height))}.tw\\:text-base{font-size:var(--tw-text-base);line-height:var(--tw-leading,var(--tw-text-base--line-height))}.tw\\:text-lg{font-size:var(--tw-text-lg);line-height:var(--tw-leading,var(--tw-text-lg--line-height))}.tw\\:text-sm{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:text-sm\\/relaxed{font-size:var(--tw-text-sm);line-height:var(--tw-leading-relaxed)}.tw\\:text-xl{font-size:var(--tw-text-xl);line-height:var(--tw-leading,var(--tw-text-xl--line-height))}.tw\\:text-xs{font-size:var(--tw-text-xs);line-height:var(--tw-leading,var(--tw-text-xs--line-height))}.tw\\:text-\\[0\\.8rem\\]{font-size:.8rem}.tw\\:leading-6{--tw-leading:calc(calc(var(--spacing)) * 6);line-height:calc(calc(var(--spacing)) * 6)}.tw\\:leading-loose{--tw-leading:var(--tw-leading-loose);line-height:var(--tw-leading-loose)}.tw\\:leading-none{--tw-leading:1;line-height:1}.tw\\:leading-relaxed{--tw-leading:var(--tw-leading-relaxed);line-height:var(--tw-leading-relaxed)}.tw\\:leading-snug{--tw-leading:var(--tw-leading-snug);line-height:var(--tw-leading-snug)}.tw\\:leading-tight{--tw-leading:var(--tw-leading-tight);line-height:var(--tw-leading-tight)}.tw\\:font-bold{--tw-font-weight:var(--tw-font-weight-bold);font-weight:var(--tw-font-weight-bold)}.tw\\:font-extrabold{--tw-font-weight:var(--tw-font-weight-extrabold);font-weight:var(--tw-font-weight-extrabold)}.tw\\:font-medium{--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}.tw\\:font-normal{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:font-semibold{--tw-font-weight:var(--tw-font-weight-semibold);font-weight:var(--tw-font-weight-semibold)}.tw\\:tracking-tight{--tw-tracking:var(--tw-tracking-tight);letter-spacing:var(--tw-tracking-tight)}.tw\\:tracking-wider{--tw-tracking:var(--tw-tracking-wider);letter-spacing:var(--tw-tracking-wider)}.tw\\:tracking-widest{--tw-tracking:var(--tw-tracking-widest);letter-spacing:var(--tw-tracking-widest)}.tw\\:text-balance{text-wrap:balance}.tw\\:text-nowrap{text-wrap:nowrap}.tw\\:break-words{overflow-wrap:break-word}.tw\\:text-clip{text-overflow:clip}.tw\\:text-ellipsis{text-overflow:ellipsis}.tw\\:whitespace-normal{white-space:normal}.tw\\:whitespace-nowrap{white-space:nowrap}.tw\\:whitespace-pre{white-space:pre}.tw\\:whitespace-pre-line{white-space:pre-line}.tw\\:whitespace-pre-wrap{white-space:pre-wrap}.tw\\:\\[color\\:blue\\]{color:#00f}.tw\\:text-accent-foreground{color:var(--accent-foreground)}.tw\\:text-amber-600{color:var(--tw-color-amber-600)}.tw\\:text-background{color:var(--background)}.tw\\:text-blue-400{color:var(--tw-color-blue-400)}.tw\\:text-blue-500{color:var(--tw-color-blue-500)}.tw\\:text-blue-600{color:var(--tw-color-blue-600)}.tw\\:text-blue-800{color:var(--tw-color-blue-800)}.tw\\:text-card-foreground{color:var(--card-foreground)}.tw\\:text-current{color:currentColor}.tw\\:text-destructive{color:var(--destructive)}.tw\\:text-foreground{color:var(--foreground)}.tw\\:text-foreground\\!{color:var(--foreground)!important}.tw\\:text-foreground\\/30{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/30{color:color-mix(in oklab, var(--foreground) 30%, transparent)}}.tw\\:text-foreground\\/50{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/50{color:color-mix(in oklab, var(--foreground) 50%, transparent)}}.tw\\:text-foreground\\/60{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/60{color:color-mix(in oklab, var(--foreground) 60%, transparent)}}.tw\\:text-foreground\\/70{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/70{color:color-mix(in oklab, var(--foreground) 70%, transparent)}}.tw\\:text-gray-300{color:var(--tw-color-gray-300)}.tw\\:text-gray-500{color:var(--tw-color-gray-500)}.tw\\:text-gray-600{color:var(--tw-color-gray-600)}.tw\\:text-gray-700{color:var(--tw-color-gray-700)}.tw\\:text-gray-800{color:var(--tw-color-gray-800)}.tw\\:text-green-600{color:var(--tw-color-green-600)}.tw\\:text-green-700{color:var(--tw-color-green-700)}.tw\\:text-green-800{color:var(--tw-color-green-800)}.tw\\:text-inherit{color:inherit}.tw\\:text-muted-foreground,.tw\\:text-muted-foreground\\/50{color:var(--muted-foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-muted-foreground\\/50{color:color-mix(in oklab, var(--muted-foreground) 50%, transparent)}}.tw\\:text-orange-800{color:var(--tw-color-orange-800)}.tw\\:text-popover-foreground{color:var(--popover-foreground)}.tw\\:text-primary{color:var(--primary)}.tw\\:text-primary-foreground{color:var(--primary-foreground)}.tw\\:text-purple-900{color:var(--tw-color-purple-900)}.tw\\:text-red-500{color:var(--tw-color-red-500)}.tw\\:text-red-600{color:var(--tw-color-red-600)}.tw\\:text-red-700{color:var(--tw-color-red-700)}.tw\\:text-red-800{color:var(--tw-color-red-800)}.tw\\:text-rose-600{color:var(--tw-color-rose-600)}.tw\\:text-secondary-foreground{color:var(--secondary-foreground)}.tw\\:text-sidebar-accent-foreground{color:var(--sidebar-accent-foreground)}.tw\\:text-sidebar-foreground,.tw\\:text-sidebar-foreground\\/70{color:var(--sidebar-foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-sidebar-foreground\\/70{color:color-mix(in oklab, var(--sidebar-foreground) 70%, transparent)}}.tw\\:text-sky-600{color:var(--tw-color-sky-600)}.tw\\:text-slate-900{color:var(--tw-color-slate-900)}.tw\\:text-teal-600{color:var(--tw-color-teal-600)}.tw\\:text-white{color:var(--tw-color-white)}.tw\\:text-yellow-400{color:var(--tw-color-yellow-400)}.tw\\:text-yellow-600{color:var(--tw-color-yellow-600)}.tw\\:text-yellow-700{color:var(--tw-color-yellow-700)}.tw\\:capitalize{text-transform:capitalize}.tw\\:uppercase{text-transform:uppercase}.tw\\:italic{font-style:italic}.tw\\:tabular-nums{--tw-numeric-spacing:tabular-nums;font-variant-numeric:var(--tw-ordinal,) var(--tw-slashed-zero,) var(--tw-numeric-figure,) var(--tw-numeric-spacing,) var(--tw-numeric-fraction,)}.tw\\:line-through{text-decoration-line:line-through}.tw\\:underline{text-decoration-line:underline}.tw\\:decoration-destructive{-webkit-text-decoration-color:var(--destructive);-webkit-text-decoration-color:var(--destructive);text-decoration-color:var(--destructive)}.tw\\:underline-offset-4{text-underline-offset:4px}.tw\\:opacity-0{opacity:0}.tw\\:opacity-40{opacity:.4}.tw\\:opacity-50{opacity:.5}.tw\\:opacity-60{opacity:.6}.tw\\:opacity-100{opacity:1}.tw\\:bg-blend-color{background-blend-mode:color}.tw\\:shadow{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-\\[0_0_0_1px_var\\(--sidebar-border\\)\\]{--tw-shadow:0 0 0 1px var(--tw-shadow-color,var(--sidebar-border));box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-lg{--tw-shadow:0 10px 15px -3px var(--tw-shadow-color,#0000001a), 0 4px 6px -4px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-md{--tw-shadow:0 4px 6px -1px var(--tw-shadow-color,#0000001a), 0 2px 4px -2px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-none{--tw-shadow:0 0 #0000;box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-none\\!{--tw-shadow:0 0 #0000!important;box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)!important}.tw\\:shadow-sm{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-xl{--tw-shadow:0 20px 25px -5px var(--tw-shadow-color,#0000001a), 0 8px 10px -6px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-0{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-1{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-2{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-background{--tw-ring-color:var(--background)}.tw\\:ring-foreground\\/10{--tw-ring-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:ring-foreground\\/10{--tw-ring-color:color-mix(in oklab, var(--foreground) 10%, transparent)}}.tw\\:ring-primary{--tw-ring-color:var(--primary)}.tw\\:ring-ring\\/50{--tw-ring-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.tw\\:ring-ring\\/50{--tw-ring-color:color-mix(in oklab, var(--ring) 50%, transparent)}}.tw\\:ring-sidebar-ring{--tw-ring-color:var(--sidebar-ring)}.tw\\:ring-offset-2{--tw-ring-offset-width:2px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}.tw\\:ring-offset-background{--tw-ring-offset-color:var(--background)}.tw\\:ring-offset-white{--tw-ring-offset-color:var(--tw-color-white)}.tw\\:outline-hidden{--tw-outline-style:none;outline-style:none}@media (forced-colors:active){.tw\\:outline-hidden{outline-offset:2px;outline:2px solid #0000}}.tw\\:drop-shadow-sm{--tw-drop-shadow-size:drop-shadow(0 1px 2px var(--tw-drop-shadow-color,#00000026));--tw-drop-shadow:drop-shadow(var(--tw-drop-shadow-sm));filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.tw\\:transition{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to,opacity,box-shadow,transform,translate,scale,rotate,filter,-webkit-backdrop-filter,backdrop-filter,display,content-visibility,overlay,pointer-events;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[color\\,box-shadow\\]{transition-property:color,box-shadow;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[left\\,right\\,width\\]{transition-property:left,right,width;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[margin\\,opacity\\]{transition-property:margin,opacity;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[width\\,height\\,padding\\]{transition-property:width,height,padding;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[width\\]{transition-property:width;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-all{transition-property:all;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-colors{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-opacity{transition-property:opacity;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-transform{transition-property:transform,translate,scale,rotate;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-none{transition-property:none}.tw\\:duration-100{--tw-duration:.1s;transition-duration:.1s}.tw\\:duration-200{--tw-duration:.2s;transition-duration:.2s}.tw\\:ease-linear{--tw-ease:linear;transition-timing-function:linear}.tw\\:prose-quoteless :where(blockquote p:first-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):before,.tw\\:prose-quoteless :where(blockquote p:last-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:none}.tw\\:outline-none{--tw-outline-style:none;outline-style:none}.tw\\:select-none{-webkit-user-select:none;user-select:none}.tw\\:\\[unicode-bidi\\:plaintext\\]{unicode-bidi:plaintext}.tw\\:group-focus-within\\/menu-item\\:opacity-100:is(:where(.tw\\:group\\/menu-item):focus-within *){opacity:1}@media (hover:hover){.tw\\:group-hover\\:visible:is(:where(.tw\\:group):hover *){visibility:visible}.tw\\:group-hover\\:hidden:is(:where(.tw\\:group):hover *){display:none}.tw\\:group-hover\\:opacity-100:is(:where(.tw\\:group):hover *),.tw\\:group-hover\\/menu-item\\:opacity-100:is(:where(.tw\\:group\\/menu-item):hover *){opacity:1}}.tw\\:group-focus\\/context-menu-item\\:text-accent-foreground:is(:where(.tw\\:group\\/context-menu-item):focus *),.tw\\:group-focus\\/dropdown-menu-item\\:text-accent-foreground:is(:where(.tw\\:group\\/dropdown-menu-item):focus *),.tw\\:group-focus\\/menubar-item\\:text-accent-foreground:is(:where(.tw\\:group\\/menubar-item):focus *){color:var(--accent-foreground)}.tw\\:group-has-disabled\\/field\\:opacity-50:is(:where(.tw\\:group\\/field):has(:disabled) *){opacity:.5}.tw\\:group-has-data-\\[sidebar\\=menu-action\\]\\/menu-item\\:pe-8:is(:where(.tw\\:group\\/menu-item):has([data-sidebar=menu-action]) *){padding-inline-end:calc(calc(var(--spacing)) * 8)}.tw\\:group-has-data-\\[size\\=lg\\]\\/avatar-group\\:size-10:is(:where(.tw\\:group\\/avatar-group):has([data-size=lg]) *){width:calc(calc(var(--spacing)) * 10);height:calc(calc(var(--spacing)) * 10)}.tw\\:group-has-data-\\[size\\=sm\\]\\/avatar-group\\:size-6:is(:where(.tw\\:group\\/avatar-group):has([data-size=sm]) *){width:calc(calc(var(--spacing)) * 6);height:calc(calc(var(--spacing)) * 6)}.tw\\:group-has-data-\\[slot\\=command-shortcut\\]\\/command-item\\:hidden:is(:where(.tw\\:group\\/command-item):has([data-slot=command-shortcut]) *){display:none}.tw\\:group-has-\\[\\>input\\]\\/input-group\\:pt-2:is(:where(.tw\\:group\\/input-group):has(>input) *){padding-top:calc(calc(var(--spacing)) * 2)}.tw\\:group-has-\\[\\>input\\]\\/input-group\\:pb-2:is(:where(.tw\\:group\\/input-group):has(>input) *){padding-bottom:calc(calc(var(--spacing)) * 2)}.tw\\:group-has-\\[\\>svg\\]\\/alert\\:col-start-2:is(:where(.tw\\:group\\/alert):has(>svg) *){grid-column-start:2}.tw\\:group-data-\\[checked\\=true\\]\\/command-item\\:opacity-100:is(:where(.tw\\:group\\/command-item)[data-checked=true] *){opacity:1}.tw\\:group-data-\\[collapsible\\=icon\\]\\:-mt-8:is(:where(.tw\\:group)[data-collapsible=icon] *){margin-top:calc(calc(var(--spacing)) * -8)}.tw\\:group-data-\\[collapsible\\=icon\\]\\:hidden:is(:where(.tw\\:group)[data-collapsible=icon] *){display:none}.tw\\:group-data-\\[collapsible\\=icon\\]\\:size-8\\!:is(:where(.tw\\:group)[data-collapsible=icon] *){width:calc(calc(var(--spacing)) * 8)!important;height:calc(calc(var(--spacing)) * 8)!important}.tw\\:group-data-\\[collapsible\\=icon\\]\\:w-\\(--sidebar-width-icon\\):is(:where(.tw\\:group)[data-collapsible=icon] *){width:var(--sidebar-width-icon)}.tw\\:group-data-\\[collapsible\\=icon\\]\\:w-\\[calc\\(var\\(--sidebar-width-icon\\)\\+\\(--spacing\\(4\\)\\)\\)\\]:is(:where(.tw\\:group)[data-collapsible=icon] *){width:calc(var(--sidebar-width-icon) + (calc(calc(var(--spacing)) * 4)))}.tw\\:group-data-\\[collapsible\\=icon\\]\\:w-\\[calc\\(var\\(--sidebar-width-icon\\)\\+\\(--spacing\\(4\\)\\)\\+2px\\)\\]:is(:where(.tw\\:group)[data-collapsible=icon] *){width:calc(var(--sidebar-width-icon) + (calc(calc(var(--spacing)) * 4)) + 2px)}.tw\\:group-data-\\[collapsible\\=icon\\]\\:overflow-hidden:is(:where(.tw\\:group)[data-collapsible=icon] *){overflow:hidden}.tw\\:group-data-\\[collapsible\\=icon\\]\\:p-0\\!:is(:where(.tw\\:group)[data-collapsible=icon] *){padding:calc(calc(var(--spacing)) * 0)!important}.tw\\:group-data-\\[collapsible\\=icon\\]\\:p-2\\!:is(:where(.tw\\:group)[data-collapsible=icon] *){padding:calc(calc(var(--spacing)) * 2)!important}.tw\\:group-data-\\[collapsible\\=icon\\]\\:opacity-0:is(:where(.tw\\:group)[data-collapsible=icon] *){opacity:0}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:right-\\[calc\\(var\\(--sidebar-width\\)\\*-1\\)\\]:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){right:calc(var(--sidebar-width) * -1)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:left-\\[calc\\(var\\(--sidebar-width\\)\\*-1\\)\\]:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){left:calc(var(--sidebar-width) * -1)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:w-0:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){width:calc(calc(var(--spacing)) * 0)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:translate-x-0:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){--tw-translate-x:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:group-data-\\[disabled\\=true\\]\\:pointer-events-none:is(:where(.tw\\:group)[data-disabled=true] *){pointer-events:none}.tw\\:group-data-\\[disabled\\=true\\]\\:opacity-50:is(:where(.tw\\:group)[data-disabled=true] *),.tw\\:group-data-\\[disabled\\=true\\]\\/input-group\\:opacity-50:is(:where(.tw\\:group\\/input-group)[data-disabled=true] *){opacity:.5}.tw\\:group-data-\\[side\\=primary\\]\\:-right-4:is(:where(.tw\\:group)[data-side=primary] *){right:calc(calc(var(--spacing)) * -4)}.tw\\:group-data-\\[side\\=primary\\]\\:border-e:is(:where(.tw\\:group)[data-side=primary] *){border-inline-end-style:var(--tw-border-style);border-inline-end-width:1px}.tw\\:group-data-\\[side\\=secondary\\]\\:left-0:is(:where(.tw\\:group)[data-side=secondary] *){left:calc(calc(var(--spacing)) * 0)}.tw\\:group-data-\\[side\\=secondary\\]\\:rotate-180:is(:where(.tw\\:group)[data-side=secondary] *){rotate:180deg}.tw\\:group-data-\\[side\\=secondary\\]\\:border-s:is(:where(.tw\\:group)[data-side=secondary] *){border-inline-start-style:var(--tw-border-style);border-inline-start-width:1px}.tw\\:group-data-\\[size\\=default\\]\\/avatar\\:size-2\\.5:is(:where(.tw\\:group\\/avatar)[data-size=default] *){width:calc(calc(var(--spacing)) * 2.5);height:calc(calc(var(--spacing)) * 2.5)}.tw\\:group-data-\\[size\\=default\\]\\/switch\\:size-4:is(:where(.tw\\:group\\/switch)[data-size=default] *){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[size\\=lg\\]\\/avatar\\:size-3:is(:where(.tw\\:group\\/avatar)[data-size=lg] *){width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[size\\=sm\\]\\/avatar\\:size-2:is(:where(.tw\\:group\\/avatar)[data-size=sm] *){width:calc(calc(var(--spacing)) * 2);height:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[size\\=sm\\]\\/avatar\\:text-xs:is(:where(.tw\\:group\\/avatar)[data-size=sm] *){font-size:var(--tw-text-xs);line-height:var(--tw-leading,var(--tw-text-xs--line-height))}.tw\\:group-data-\\[size\\=sm\\]\\/card\\:p-3:is(:where(.tw\\:group\\/card)[data-size=sm] *){padding:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[size\\=sm\\]\\/card\\:px-3:is(:where(.tw\\:group\\/card)[data-size=sm] *){padding-inline:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[size\\=sm\\]\\/card\\:text-sm:is(:where(.tw\\:group\\/card)[data-size=sm] *){font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:size-3:is(:where(.tw\\:group\\/switch)[data-size=sm] *){width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[spacing\\=0\\]\\/toggle-group\\:rounded-none:is(:where(.tw\\:group\\/toggle-group)[data-spacing="0"] *){border-radius:0}.tw\\:group-data-\\[spacing\\=0\\]\\/toggle-group\\:px-2:is(:where(.tw\\:group\\/toggle-group)[data-spacing="0"] *){padding-inline:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[variant\\=floating\\]\\:rounded-lg:is(:where(.tw\\:group)[data-variant=floating] *){border-radius:var(--radius)}.tw\\:group-data-\\[variant\\=floating\\]\\:shadow-sm:is(:where(.tw\\:group)[data-variant=floating] *){--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:group-data-\\[variant\\=floating\\]\\:ring-1:is(:where(.tw\\:group)[data-variant=floating] *){--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:group-data-\\[variant\\=floating\\]\\:ring-sidebar-border:is(:where(.tw\\:group)[data-variant=floating] *){--tw-ring-color:var(--sidebar-border)}.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:bg-transparent:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *){background-color:#0000}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:mx-auto:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){margin-inline:auto}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:mt-4:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){margin-top:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:block:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){display:block}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:h-1\\.5:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){height:calc(calc(var(--spacing)) * 1.5)}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:w-\\[100px\\]:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){width:100px}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:text-center:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){text-align:center}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:my-auto:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){margin-block:auto}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:me-4:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){margin-inline-end:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:block:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){display:block}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:h-\\[100px\\]:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){height:100px}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:w-1\\.5:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){width:calc(calc(var(--spacing)) * 1.5)}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:my-auto:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){margin-block:auto}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:ms-4:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){margin-inline-start:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:block:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){display:block}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:h-\\[100px\\]:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){height:100px}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:w-1\\.5:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){width:calc(calc(var(--spacing)) * 1.5)}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:mx-auto:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){margin-inline:auto}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:mb-4:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){margin-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:block:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){display:block}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:h-1\\.5:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){height:calc(calc(var(--spacing)) * 1.5)}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:w-\\[100px\\]:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){width:100px}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:text-center:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){text-align:center}.tw\\:group-data-selected\\/command-item\\:text-foreground:is(:where(.tw\\:group\\/command-item):where([data-selected=true]) *){color:var(--foreground)}.tw\\:group-data-horizontal\\/tabs\\:h-8:is(:where(.tw\\:group\\/tabs):where([data-orientation=horizontal]) *){height:calc(calc(var(--spacing)) * 8)}.tw\\:group-data-vertical\\/tabs\\:h-fit:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *){height:fit-content}.tw\\:group-data-vertical\\/tabs\\:w-full:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *){width:100%}.tw\\:group-data-vertical\\/tabs\\:flex-col:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *){flex-direction:column}.tw\\:group-data-vertical\\/tabs\\:justify-start:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *){justify-content:flex-start}@media (hover:hover){.tw\\:peer-hover\\/menu-button\\:text-sidebar-accent-foreground:is(:where(.tw\\:peer\\/menu-button):hover~*){color:var(--sidebar-accent-foreground)}.tw\\:peer-focus\\:group-hover\\:text-blue-500:is(:where(.tw\\:peer):focus~*):is(:where(.tw\\:group):hover *){color:var(--tw-color-blue-500)}}.tw\\:peer-disabled\\:cursor-not-allowed:is(:where(.tw\\:peer):disabled~*){cursor:not-allowed}.tw\\:peer-disabled\\:opacity-50:is(:where(.tw\\:peer):disabled~*){opacity:.5}.tw\\:peer-data-\\[size\\=default\\]\\/menu-button\\:top-1\\.5:is(:where(.tw\\:peer\\/menu-button)[data-size=default]~*){top:calc(calc(var(--spacing)) * 1.5)}.tw\\:peer-data-\\[size\\=lg\\]\\/menu-button\\:top-2\\.5:is(:where(.tw\\:peer\\/menu-button)[data-size=lg]~*){top:calc(calc(var(--spacing)) * 2.5)}.tw\\:peer-data-\\[size\\=sm\\]\\/menu-button\\:top-1:is(:where(.tw\\:peer\\/menu-button)[data-size=sm]~*){top:calc(calc(var(--spacing)) * 1)}.tw\\:peer-data-active\\/menu-button\\:text-sidebar-accent-foreground:is(:is(:where(.tw\\:peer\\/menu-button):where([data-state=active]),:where(.tw\\:peer\\/menu-button):where([data-active]:not([data-active=false])))~*){color:var(--sidebar-accent-foreground)}.tw\\:file\\:inline-flex::file-selector-button{display:inline-flex}.tw\\:file\\:h-6::file-selector-button{height:calc(calc(var(--spacing)) * 6)}.tw\\:file\\:border-0::file-selector-button{border-style:var(--tw-border-style);border-width:0}.tw\\:file\\:bg-transparent::file-selector-button{background-color:#0000}.tw\\:file\\:text-sm::file-selector-button{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:file\\:font-medium::file-selector-button{--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}.tw\\:file\\:text-foreground::file-selector-button{color:var(--foreground)}.tw\\:placeholder\\:text-muted-foreground::placeholder{color:var(--muted-foreground)}.tw\\:placeholder\\:text-slate-400::placeholder{color:var(--tw-color-slate-400)}.tw\\:before\\:pointer-events-none:before{content:var(--tw-content);pointer-events:none}.tw\\:before\\:absolute:before{content:var(--tw-content);position:absolute}.tw\\:before\\:inset-0:before{content:var(--tw-content);inset:calc(calc(var(--spacing)) * 0)}.tw\\:before\\:top-0\\.5:before{content:var(--tw-content);top:calc(calc(var(--spacing)) * .5)}.tw\\:before\\:left-0:before{content:var(--tw-content);left:calc(calc(var(--spacing)) * 0)}.tw\\:before\\:-z-1:before{content:var(--tw-content);z-index:calc(1 * -1)}.tw\\:before\\:block:before{content:var(--tw-content);display:block}.tw\\:before\\:hidden:before{content:var(--tw-content);display:none}.tw\\:before\\:h-4:before{content:var(--tw-content);height:calc(calc(var(--spacing)) * 4)}.tw\\:before\\:w-4:before{content:var(--tw-content);width:calc(calc(var(--spacing)) * 4)}.tw\\:before\\:cursor-pointer:before{content:var(--tw-content);cursor:pointer}.tw\\:before\\:rounded:before{content:var(--tw-content);border-radius:.25rem}.tw\\:before\\:rounded-\\[inherit\\]:before{content:var(--tw-content);border-radius:inherit}.tw\\:before\\:border:before{content:var(--tw-content);border-style:var(--tw-border-style);border-width:1px}.tw\\:before\\:border-primary:before{content:var(--tw-content);border-color:var(--primary)}.tw\\:before\\:bg-primary:before{content:var(--tw-content);background-color:var(--primary)}.tw\\:before\\:bg-cover:before{content:var(--tw-content);background-size:cover}.tw\\:before\\:bg-no-repeat:before{content:var(--tw-content);background-repeat:no-repeat}.tw\\:before\\:backdrop-blur-2xl:before{content:var(--tw-content);--tw-backdrop-blur:blur(var(--tw-blur-2xl));-webkit-backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)}.tw\\:before\\:backdrop-saturate-150:before{content:var(--tw-content);--tw-backdrop-saturate:saturate(150%);-webkit-backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)}.tw\\:before\\:content-\\[\\"\\"\\]:before{--tw-content:"";content:var(--tw-content)}.tw\\:before\\:content-\\[\\\\\\"\\\\\\"\\]:before{--tw-content:\\"\\";content:var(--tw-content)}.tw\\:after\\:absolute:after{content:var(--tw-content);position:absolute}.tw\\:after\\:-inset-2:after{content:var(--tw-content);inset:calc(calc(var(--spacing)) * -2)}.tw\\:after\\:inset-0:after{content:var(--tw-content);inset:calc(calc(var(--spacing)) * 0)}.tw\\:after\\:-inset-x-3:after{content:var(--tw-content);inset-inline:calc(calc(var(--spacing)) * -3)}.tw\\:after\\:-inset-y-2:after{content:var(--tw-content);inset-block:calc(calc(var(--spacing)) * -2)}.tw\\:after\\:inset-y-0:after{content:var(--tw-content);inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:after\\:start-1\\/2:after{content:var(--tw-content);inset-inline-start:50%}.tw\\:after\\:top-\\[6px\\]:after{content:var(--tw-content);top:6px}.tw\\:after\\:right-\\[7px\\]:after{content:var(--tw-content);right:7px}.tw\\:after\\:left-\\[7px\\]:after{content:var(--tw-content);left:7px}.tw\\:after\\:block:after{content:var(--tw-content);display:block}.tw\\:after\\:hidden:after{content:var(--tw-content);display:none}.tw\\:after\\:h-0\\.5:after{content:var(--tw-content);height:calc(calc(var(--spacing)) * .5)}.tw\\:after\\:h-\\[6px\\]:after{content:var(--tw-content);height:6px}.tw\\:after\\:w-1:after{content:var(--tw-content);width:calc(calc(var(--spacing)) * 1)}.tw\\:after\\:w-\\[2px\\]:after{content:var(--tw-content);width:2px}.tw\\:after\\:w-\\[3px\\]:after{content:var(--tw-content);width:3px}.tw\\:after\\:-translate-x-1\\/2:after{content:var(--tw-content);--tw-translate-x:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:after\\:rotate-45:after{content:var(--tw-content);rotate:45deg}.tw\\:after\\:cursor-pointer:after{content:var(--tw-content);cursor:pointer}.tw\\:after\\:rounded-full:after{content:var(--tw-content);border-radius:3.40282e38px}.tw\\:after\\:border:after{content:var(--tw-content);border-style:var(--tw-border-style);border-width:1px}.tw\\:after\\:border-t-0:after{content:var(--tw-content);border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:after\\:border-r-2:after{content:var(--tw-content);border-right-style:var(--tw-border-style);border-right-width:2px}.tw\\:after\\:border-b-2:after{content:var(--tw-content);border-bottom-style:var(--tw-border-style);border-bottom-width:2px}.tw\\:after\\:border-l-0:after{content:var(--tw-content);border-left-style:var(--tw-border-style);border-left-width:0}.tw\\:after\\:border-solid:after{content:var(--tw-content);--tw-border-style:solid;border-style:solid}.tw\\:after\\:border-border:after{content:var(--tw-content);border-color:var(--border)}.tw\\:after\\:border-white:after{content:var(--tw-content);border-color:var(--tw-color-white)}.tw\\:after\\:bg-foreground:after{content:var(--tw-content);background-color:var(--foreground)}.tw\\:after\\:bg-muted:after{content:var(--tw-content);background-color:var(--muted)}.tw\\:after\\:opacity-0:after{content:var(--tw-content);opacity:0}.tw\\:after\\:mix-blend-darken:after{content:var(--tw-content);mix-blend-mode:darken}.tw\\:after\\:transition-opacity:after{content:var(--tw-content);transition-property:opacity;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:after\\:content-\\[\\"\\"\\]:after{--tw-content:"";content:var(--tw-content)}.tw\\:after\\:content-\\[\\\\\\"\\\\\\"\\]:after{--tw-content:\\"\\";content:var(--tw-content)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:after\\:start-full:is(:where(.tw\\:group)[data-collapsible=offcanvas] *):after{content:var(--tw-content);inset-inline-start:100%}.tw\\:group-data-horizontal\\/tabs\\:after\\:inset-x-0:is(:where(.tw\\:group\\/tabs):where([data-orientation=horizontal]) *):after{content:var(--tw-content);inset-inline:calc(calc(var(--spacing)) * 0)}.tw\\:group-data-horizontal\\/tabs\\:after\\:bottom-\\[-5px\\]:is(:where(.tw\\:group\\/tabs):where([data-orientation=horizontal]) *):after{content:var(--tw-content);bottom:-5px}.tw\\:group-data-horizontal\\/tabs\\:after\\:h-0\\.5:is(:where(.tw\\:group\\/tabs):where([data-orientation=horizontal]) *):after{content:var(--tw-content);height:calc(calc(var(--spacing)) * .5)}.tw\\:group-data-vertical\\/tabs\\:after\\:inset-y-0:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *):after{content:var(--tw-content);inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:group-data-vertical\\/tabs\\:after\\:-end-1:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *):after{content:var(--tw-content);inset-inline-end:calc(calc(var(--spacing)) * -1)}.tw\\:group-data-vertical\\/tabs\\:after\\:w-0\\.5:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *):after{content:var(--tw-content);width:calc(calc(var(--spacing)) * .5)}.tw\\:first\\:mt-0:first-child{margin-top:calc(calc(var(--spacing)) * 0)}.tw\\:last\\:border-b-0:last-child{border-bottom-style:var(--tw-border-style);border-bottom-width:0}.tw\\:even\\:bg-muted:nth-child(2n){background-color:var(--muted)}.tw\\:focus-within\\:ring-2:focus-within{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-within\\:ring-ring:focus-within{--tw-ring-color:var(--ring)}.tw\\:focus-within\\:ring-offset-1:focus-within{--tw-ring-offset-width:1px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}@media (hover:hover){.tw\\:hover\\:-mt-4:hover{margin-top:calc(calc(var(--spacing)) * -4)}.tw\\:hover\\:cursor-pointer:hover{cursor:pointer}.tw\\:hover\\:bg-accent:hover,.tw\\:hover\\:bg-accent\\/30:hover{background-color:var(--accent)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-accent\\/30:hover{background-color:color-mix(in oklab, var(--accent) 30%, transparent)}}.tw\\:hover\\:bg-accent\\/80:hover{background-color:var(--accent)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-accent\\/80:hover{background-color:color-mix(in oklab, var(--accent) 80%, transparent)}}.tw\\:hover\\:bg-blue-600:hover{background-color:var(--tw-color-blue-600)}.tw\\:hover\\:bg-destructive\\/20:hover{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-destructive\\/20:hover{background-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:hover\\:bg-gray-50:hover{background-color:var(--tw-color-gray-50)}.tw\\:hover\\:bg-input:hover{background-color:var(--input)}.tw\\:hover\\:bg-muted:hover,.tw\\:hover\\:bg-muted\\/50:hover{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-muted\\/50:hover{background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:hover\\:bg-muted\\/80:hover{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-muted\\/80:hover{background-color:color-mix(in oklab, var(--muted) 80%, transparent)}}.tw\\:hover\\:bg-primary\\/10:hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-primary\\/10:hover{background-color:color-mix(in oklab, var(--primary) 10%, transparent)}}.tw\\:hover\\:bg-primary\\/70:hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-primary\\/70:hover{background-color:color-mix(in oklab, var(--primary) 70%, transparent)}}.tw\\:hover\\:bg-primary\\/90:hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-primary\\/90:hover{background-color:color-mix(in oklab, var(--primary) 90%, transparent)}}.tw\\:hover\\:bg-red-500:hover{background-color:var(--tw-color-red-500)}.tw\\:hover\\:bg-secondary:hover,.tw\\:hover\\:bg-secondary\\/80:hover{background-color:var(--secondary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-secondary\\/80:hover{background-color:color-mix(in oklab, var(--secondary) 80%, transparent)}}.tw\\:hover\\:bg-sidebar-accent:hover{background-color:var(--sidebar-accent)}.tw\\:hover\\:bg-transparent:hover{background-color:#0000}.tw\\:hover\\:text-foreground:hover{color:var(--foreground)}.tw\\:hover\\:text-muted-foreground:hover{color:var(--muted-foreground)}.tw\\:hover\\:text-primary-foreground:hover{color:var(--primary-foreground)}.tw\\:hover\\:text-sidebar-accent-foreground:hover{color:var(--sidebar-accent-foreground)}.tw\\:hover\\:underline:hover{text-decoration-line:underline}.tw\\:hover\\:opacity-80:hover{opacity:.8}.tw\\:hover\\:opacity-100:hover{opacity:1}.tw\\:hover\\:shadow-\\[0_0_0_1px_var\\(--sidebar-accent\\)\\]:hover{--tw-shadow:0 0 0 1px var(--tw-shadow-color,var(--sidebar-accent));box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:hover\\:shadow-md:hover{--tw-shadow:0 4px 6px -1px var(--tw-shadow-color,#0000001a), 0 2px 4px -2px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:hover\\:ring-3:hover{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:hover\\:group-data-\\[collapsible\\=offcanvas\\]\\:bg-sidebar:hover:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){background-color:var(--sidebar)}.tw\\:hover\\:after\\:bg-sidebar-border:hover:after{content:var(--tw-content);background-color:var(--sidebar-border)}}.tw\\:focus\\:relative:focus{position:relative}.tw\\:focus\\:z-10:focus{z-index:10}.tw\\:focus\\:bg-accent:focus{background-color:var(--accent)}.tw\\:focus\\:bg-muted:focus{background-color:var(--muted)}.tw\\:focus\\:text-accent-foreground:focus{color:var(--accent-foreground)}.tw\\:focus\\:text-foreground:focus{color:var(--foreground)}.tw\\:focus\\:ring-2:focus{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus\\:ring-ring:focus{--tw-ring-color:var(--ring)}.tw\\:focus\\:ring-offset-1:focus{--tw-ring-offset-width:1px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}.tw\\:focus\\:ring-offset-background:focus{--tw-ring-offset-color:var(--background)}.tw\\:focus\\:outline-hidden:focus{--tw-outline-style:none;outline-style:none}@media (forced-colors:active){.tw\\:focus\\:outline-hidden:focus{outline-offset:2px;outline:2px solid #0000}}:is(.tw\\:focus\\:\\*\\*\\:text-accent-foreground:focus *),:is(.tw\\:not-data-\\[variant\\=destructive\\]\\:focus\\:\\*\\*\\:text-accent-foreground:not([data-variant=destructive]):focus *){color:var(--accent-foreground)}.tw\\:focus-visible\\:relative:focus-visible{position:relative}.tw\\:focus-visible\\:z-10:focus-visible{z-index:10}.tw\\:focus-visible\\:border-destructive\\/40:focus-visible{border-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:focus-visible\\:border-destructive\\/40:focus-visible{border-color:color-mix(in oklab, var(--destructive) 40%, transparent)}}.tw\\:focus-visible\\:border-ring:focus-visible{border-color:var(--ring)}.tw\\:focus-visible\\:ring-0:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-visible\\:ring-1:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-visible\\:ring-2:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-visible\\:ring-3:focus-visible,.tw\\:focus-visible\\:ring-\\[3px\\]:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-visible\\:ring-\\[color\\:hsl\\(240\\,5\\%\\,64\\.9\\%\\)\\]:focus-visible{--tw-ring-color:#a1a1aa}.tw\\:focus-visible\\:ring-destructive\\/20:focus-visible{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:focus-visible\\:ring-destructive\\/20:focus-visible{--tw-ring-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:focus-visible\\:ring-ring:focus-visible,.tw\\:focus-visible\\:ring-ring\\/50:focus-visible{--tw-ring-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.tw\\:focus-visible\\:ring-ring\\/50:focus-visible{--tw-ring-color:color-mix(in oklab, var(--ring) 50%, transparent)}}.tw\\:focus-visible\\:ring-slate-400:focus-visible{--tw-ring-color:var(--tw-color-slate-400)}.tw\\:focus-visible\\:ring-offset-2:focus-visible{--tw-ring-offset-width:2px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}.tw\\:focus-visible\\:outline-hidden:focus-visible{--tw-outline-style:none;outline-style:none}@media (forced-colors:active){.tw\\:focus-visible\\:outline-hidden:focus-visible{outline-offset:2px;outline:2px solid #0000}}.tw\\:focus-visible\\:outline-1:focus-visible{outline-style:var(--tw-outline-style);outline-width:1px}.tw\\:focus-visible\\:outline-ring:focus-visible{outline-color:var(--ring)}.tw\\:focus-visible\\:outline-none:focus-visible{--tw-outline-style:none;outline-style:none}:is(.tw\\:\\*\\:focus-visible\\:relative>*):focus-visible{position:relative}:is(.tw\\:\\*\\:focus-visible\\:z-10>*):focus-visible{z-index:10}.tw\\:active\\:bg-sidebar-accent:active{background-color:var(--sidebar-accent)}.tw\\:active\\:text-sidebar-accent-foreground:active{color:var(--sidebar-accent-foreground)}.tw\\:active\\:ring-3:active{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:active\\:not-aria-\\[haspopup\\]\\:translate-y-px:active:not([aria-haspopup]){--tw-translate-y:1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:active\\:not-aria-\\[haspopup\\]\\:transform-\\[translateY\\(1px\\)\\]:active:not([aria-haspopup]){transform:translateY(1px)}.tw\\:disabled\\:pointer-events-none:disabled{pointer-events:none}.tw\\:disabled\\:cursor-not-allowed:disabled{cursor:not-allowed}.tw\\:disabled\\:bg-input\\/50:disabled{background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:disabled\\:bg-input\\/50:disabled{background-color:color-mix(in oklab, var(--input) 50%, transparent)}}.tw\\:disabled\\:bg-transparent:disabled{background-color:#0000}.tw\\:disabled\\:opacity-50:disabled{opacity:.5}:where([data-side=bottom]) .tw\\:in-data-\\[side\\=bottom\\]\\:translate-y-\\[calc\\(-50\\%-1px\\)\\]{--tw-translate-y:calc(-50% - 1px);translate:var(--tw-translate-x) var(--tw-translate-y)}:where([data-side=bottom]) .tw\\:in-data-\\[side\\=bottom\\]\\:\\[clip-path\\:polygon\\(100\\%_0\\,100\\%_100\\%\\,0_100\\%\\)\\]{clip-path:polygon(100% 0,100% 100%,0 100%)}:where([data-side=primary]) .tw\\:in-data-\\[side\\=primary\\]\\:cursor-w-resize{cursor:w-resize}:where([data-side=secondary]) .tw\\:in-data-\\[side\\=secondary\\]\\:cursor-e-resize{cursor:e-resize}:where([data-side=top]) .tw\\:in-data-\\[side\\=top\\]\\:translate-y-\\[calc\\(-50\\%-1px\\)\\]{--tw-translate-y:calc(-50% - 1px);translate:var(--tw-translate-x) var(--tw-translate-y)}:where([data-side=top]) .tw\\:in-data-\\[side\\=top\\]\\:\\[clip-path\\:polygon\\(100\\%_0\\,100\\%_100\\%\\,0_100\\%\\)\\]{clip-path:polygon(100% 0,100% 100%,0 100%)}:where([data-slot=button-group]) .tw\\:in-data-\\[slot\\=button-group\\]\\:rounded-lg{border-radius:var(--radius)}:where([data-slot=combobox-content]) .tw\\:in-data-\\[slot\\=combobox-content\\]\\:focus-within\\:border-inherit:focus-within{border-color:inherit}:where([data-slot=combobox-content]) .tw\\:in-data-\\[slot\\=combobox-content\\]\\:focus-within\\:ring-0:focus-within{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}:where([data-slot=dialog-content]) .tw\\:in-data-\\[slot\\=dialog-content\\]\\:rounded-lg\\!{border-radius:var(--radius)!important}:where([data-slot=tooltip-content]) .tw\\:in-data-\\[slot\\=tooltip-content\\]\\:bg-background\\/20{background-color:var(--background)}@supports (color:color-mix(in lab, red, red)){:where([data-slot=tooltip-content]) .tw\\:in-data-\\[slot\\=tooltip-content\\]\\:bg-background\\/20{background-color:color-mix(in oklab, var(--background) 20%, transparent)}}:where([data-slot=tooltip-content]) .tw\\:in-data-\\[slot\\=tooltip-content\\]\\:text-background{color:var(--background)}:where([data-slot=tooltip-content]) .tw\\:in-data-\\[slot\\=tooltip-content\\]\\:text-destructive{color:var(--destructive)}.tw\\:has-disabled\\:bg-input\\/50:has(:disabled){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:has-disabled\\:bg-input\\/50:has(:disabled){background-color:color-mix(in oklab, var(--input) 50%, transparent)}}.tw\\:has-disabled\\:opacity-50:has(:disabled){opacity:.5}.tw\\:has-aria-expanded\\:bg-muted\\/50:has([aria-expanded=true]){background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:has-aria-expanded\\:bg-muted\\/50:has([aria-expanded=true]){background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:has-data-\\[icon\\=inline-end\\]\\:pe-1:has([data-icon=inline-end]){padding-inline-end:calc(calc(var(--spacing)) * 1)}.tw\\:has-data-\\[icon\\=inline-end\\]\\:pe-1\\.5:has([data-icon=inline-end]){padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[icon\\=inline-end\\]\\:pe-2:has([data-icon=inline-end]){padding-inline-end:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[spacing\\=0\\]\\/toggle-group\\:has-data-\\[icon\\=inline-end\\]\\:pe-1\\.5:is(:where(.tw\\:group\\/toggle-group)[data-spacing="0"] *):has([data-icon=inline-end]){padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[icon\\=inline-start\\]\\:ps-1:has([data-icon=inline-start]){padding-inline-start:calc(calc(var(--spacing)) * 1)}.tw\\:has-data-\\[icon\\=inline-start\\]\\:ps-1\\.5:has([data-icon=inline-start]){padding-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[icon\\=inline-start\\]\\:ps-2:has([data-icon=inline-start]){padding-inline-start:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[spacing\\=0\\]\\/toggle-group\\:has-data-\\[icon\\=inline-start\\]\\:ps-1\\.5:is(:where(.tw\\:group\\/toggle-group)[data-spacing="0"] *):has([data-icon=inline-start]){padding-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[slot\\=alert-action\\]\\:relative:has([data-slot=alert-action]){position:relative}.tw\\:has-data-\\[slot\\=alert-action\\]\\:pe-18:has([data-slot=alert-action]){padding-inline-end:calc(calc(var(--spacing)) * 18)}.tw\\:has-data-\\[slot\\=card-action\\]\\:grid-cols-\\[1fr_auto\\]:has([data-slot=card-action]){grid-template-columns:1fr auto}.tw\\:has-data-\\[slot\\=card-description\\]\\:grid-rows-\\[auto_auto\\]:has([data-slot=card-description]){grid-template-rows:auto auto}.tw\\:has-data-\\[slot\\=card-footer\\]\\:pb-0:has([data-slot=card-footer]){padding-bottom:calc(calc(var(--spacing)) * 0)}.tw\\:has-data-\\[slot\\=kbd\\]\\:pe-0:has([data-slot=kbd]){padding-inline-end:calc(calc(var(--spacing)) * 0)}.tw\\:has-data-\\[slot\\=kbd\\]\\:pe-1\\.5:has([data-slot=kbd]){padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[variant\\=inset\\]\\:bg-sidebar:has([data-variant=inset]){background-color:var(--sidebar)}.tw\\:has-\\[\\[data-slot\\=input-group-control\\]\\:focus-visible\\]\\:border-ring:has([data-slot=input-group-control]:focus-visible){border-color:var(--ring)}.tw\\:has-\\[\\[data-slot\\=input-group-control\\]\\:focus-visible\\]\\:ring-3:has([data-slot=input-group-control]:focus-visible){--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:has-\\[\\[data-slot\\=input-group-control\\]\\:focus-visible\\]\\:ring-ring\\/50:has([data-slot=input-group-control]:focus-visible){--tw-ring-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.tw\\:has-\\[\\[data-slot\\=input-group-control\\]\\:focus-visible\\]\\:ring-ring\\/50:has([data-slot=input-group-control]:focus-visible){--tw-ring-color:color-mix(in oklab, var(--ring) 50%, transparent)}}.tw\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:border-destructive:has([data-slot][aria-invalid=true]){border-color:var(--destructive)}.tw\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-3:has([data-slot][aria-invalid=true]){--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-destructive\\/20:has([data-slot][aria-invalid=true]){--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-destructive\\/20:has([data-slot][aria-invalid=true]){--tw-ring-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:has-\\[\\>\\[data-align\\=block-end\\]\\]\\:h-auto:has(>[data-align=block-end]){height:auto}.tw\\:has-\\[\\>\\[data-align\\=block-end\\]\\]\\:flex-col:has(>[data-align=block-end]){flex-direction:column}.tw\\:has-\\[\\>\\[data-align\\=block-start\\]\\]\\:h-auto:has(>[data-align=block-start]){height:auto}.tw\\:has-\\[\\>\\[data-align\\=block-start\\]\\]\\:flex-col:has(>[data-align=block-start]){flex-direction:column}.tw\\:has-\\[\\>\\[data-slot\\=button-group\\]\\]\\:gap-2:has(>[data-slot=button-group]){gap:calc(calc(var(--spacing)) * 2)}.tw\\:has-\\[\\>button\\]\\:ms-\\[-0\\.3rem\\]:has(>button){margin-inline-start:-.3rem}.tw\\:has-\\[\\>button\\]\\:me-\\[-0\\.3rem\\]:has(>button){margin-inline-end:-.3rem}.tw\\:has-\\[\\>img\\]\\:grid-cols-\\[auto_1fr\\]:has(>img){grid-template-columns:auto 1fr}.tw\\:has-\\[\\>img\\]\\:gap-x-2:has(>img){column-gap:calc(calc(var(--spacing)) * 2)}.tw\\:has-\\[\\>img\\:first-child\\]\\:pt-0:has(>img:first-child){padding-top:calc(calc(var(--spacing)) * 0)}.tw\\:has-\\[\\>kbd\\]\\:ms-\\[-0\\.15rem\\]:has(>kbd){margin-inline-start:-.15rem}.tw\\:has-\\[\\>kbd\\]\\:me-\\[-0\\.15rem\\]:has(>kbd){margin-inline-end:-.15rem}.tw\\:has-\\[\\>svg\\]\\:grid-cols-\\[auto_1fr\\]:has(>svg){grid-template-columns:auto 1fr}.tw\\:has-\\[\\>svg\\]\\:gap-x-2:has(>svg){column-gap:calc(calc(var(--spacing)) * 2)}.tw\\:has-\\[\\>svg\\]\\:p-0:has(>svg){padding:calc(calc(var(--spacing)) * 0)}.tw\\:has-\\[\\>textarea\\]\\:h-auto:has(>textarea){height:auto}.tw\\:aria-disabled\\:pointer-events-none[aria-disabled=true]{pointer-events:none}.tw\\:aria-disabled\\:opacity-50[aria-disabled=true]{opacity:.5}.tw\\:aria-expanded\\:bg-muted[aria-expanded=true]{background-color:var(--muted)}.tw\\:aria-expanded\\:bg-secondary[aria-expanded=true]{background-color:var(--secondary)}.tw\\:aria-expanded\\:text-foreground[aria-expanded=true]{color:var(--foreground)}.tw\\:aria-expanded\\:text-secondary-foreground[aria-expanded=true]{color:var(--secondary-foreground)}.tw\\:aria-expanded\\:opacity-100[aria-expanded=true]{opacity:1}.tw\\:aria-invalid\\:border-destructive[aria-invalid=true]{border-color:var(--destructive)}.tw\\:aria-invalid\\:ring-0[aria-invalid=true]{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:aria-invalid\\:ring-3[aria-invalid=true]{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:aria-invalid\\:ring-destructive\\/20[aria-invalid=true]{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:aria-invalid\\:ring-destructive\\/20[aria-invalid=true]{--tw-ring-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:aria-invalid\\:aria-checked\\:border-primary[aria-invalid=true][aria-checked=true]{border-color:var(--primary)}.tw\\:aria-pressed\\:bg-muted[aria-pressed=true]{background-color:var(--muted)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:h-px[aria-orientation=horizontal]{height:1px}.tw\\:aria-\\[orientation\\=horizontal\\]\\:w-full[aria-orientation=horizontal]{width:100%}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:start-0[aria-orientation=horizontal]:after{content:var(--tw-content);inset-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:h-1[aria-orientation=horizontal]:after{content:var(--tw-content);height:calc(calc(var(--spacing)) * 1)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:w-full[aria-orientation=horizontal]:after{content:var(--tw-content);width:100%}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:translate-x-0[aria-orientation=horizontal]:after{content:var(--tw-content);--tw-translate-x:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:-translate-y-1\\/2[aria-orientation=horizontal]:after{content:var(--tw-content);--tw-translate-y:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:aria-\\[orientation\\=vertical\\]\\:flex-col[aria-orientation=vertical]{flex-direction:column}.tw\\:data-inset\\:ps-7[data-inset]{padding-inline-start:calc(calc(var(--spacing)) * 7)}.tw\\:data-placeholder\\:text-muted-foreground[data-placeholder]{color:var(--muted-foreground)}.tw\\:data-\\[align-trigger\\=false\\]\\:min-w-36[data-align-trigger=false]{min-width:calc(calc(var(--spacing)) * 36)}.tw\\:data-\\[align-trigger\\=true\\]\\:min-w-\\(--radix-select-trigger-width\\)[data-align-trigger=true]{min-width:var(--radix-select-trigger-width)}.tw\\:data-\\[align-trigger\\=true\\]\\:animate-none[data-align-trigger=true]{animation:none}.tw\\:data-\\[disabled\\=true\\]\\:pointer-events-none[data-disabled=true]{pointer-events:none}.tw\\:data-\\[disabled\\=true\\]\\:opacity-50[data-disabled=true]{opacity:.5}.tw\\:data-\\[position\\=popper\\]\\:h-\\(--radix-select-trigger-height\\)[data-position=popper]{height:var(--radix-select-trigger-height)}.tw\\:data-\\[position\\=popper\\]\\:w-full[data-position=popper]{width:100%}.tw\\:data-\\[position\\=popper\\]\\:min-w-\\(--radix-select-trigger-width\\)[data-position=popper]{min-width:var(--radix-select-trigger-width)}.tw\\:data-\\[side\\=bottom\\]\\:translate-y-1[data-side=bottom]{--tw-translate-y:calc(calc(var(--spacing)) * 1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=bottom\\]\\:slide-in-from-top-2[data-side=bottom]{--tw-enter-translate-y:calc(2*var(--spacing)*-1)}.tw\\:data-\\[side\\=left\\]\\:-translate-x-1[data-side=left]{--tw-translate-x:calc(calc(var(--spacing)) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=left\\]\\:slide-in-from-right-2[data-side=left]{--tw-enter-translate-x:calc(2*var(--spacing))}.tw\\:data-\\[side\\=right\\]\\:translate-x-1[data-side=right]{--tw-translate-x:calc(calc(var(--spacing)) * 1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=right\\]\\:slide-in-from-left-2[data-side=right]{--tw-enter-translate-x:calc(2*var(--spacing)*-1)}.tw\\:data-\\[side\\=top\\]\\:-translate-y-1[data-side=top]{--tw-translate-y:calc(calc(var(--spacing)) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=top\\]\\:slide-in-from-bottom-2[data-side=top]{--tw-enter-translate-y:calc(2*var(--spacing))}.tw\\:data-\\[size\\=default\\]\\:h-8[data-size=default]{height:calc(calc(var(--spacing)) * 8)}.tw\\:data-\\[size\\=default\\]\\:h-\\[18\\.4px\\][data-size=default]{height:18.4px}.tw\\:data-\\[size\\=default\\]\\:w-\\[32px\\][data-size=default]{width:32px}.tw\\:data-\\[size\\=lg\\]\\:size-10[data-size=lg]{width:calc(calc(var(--spacing)) * 10);height:calc(calc(var(--spacing)) * 10)}.tw\\:data-\\[size\\=md\\]\\:text-sm[data-size=md]{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:data-\\[size\\=sm\\]\\:size-6[data-size=sm]{width:calc(calc(var(--spacing)) * 6);height:calc(calc(var(--spacing)) * 6)}.tw\\:data-\\[size\\=sm\\]\\:h-7[data-size=sm]{height:calc(calc(var(--spacing)) * 7)}.tw\\:data-\\[size\\=sm\\]\\:h-\\[14px\\][data-size=sm]{height:14px}.tw\\:data-\\[size\\=sm\\]\\:w-\\[24px\\][data-size=sm]{width:24px}.tw\\:data-\\[size\\=sm\\]\\:gap-3[data-size=sm]{gap:calc(calc(var(--spacing)) * 3)}.tw\\:data-\\[size\\=sm\\]\\:rounded-\\[min\\(var\\(--tw-radius-md\\)\\,10px\\)\\][data-size=sm]{border-radius:min(var(--tw-radius-md), 10px)}.tw\\:data-\\[size\\=sm\\]\\:py-3[data-size=sm]{padding-block:calc(calc(var(--spacing)) * 3)}.tw\\:data-\\[size\\=sm\\]\\:text-xs[data-size=sm]{font-size:var(--tw-text-xs);line-height:var(--tw-leading,var(--tw-text-xs--line-height))}.tw\\:data-\\[size\\=sm\\]\\:has-data-\\[slot\\=card-footer\\]\\:pb-0[data-size=sm]:has([data-slot=card-footer]){padding-bottom:calc(calc(var(--spacing)) * 0)}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-item\\]\\:focus\\:bg-foreground\\/10 *)[data-slot$=-item]:focus{background-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-item\\]\\:focus\\:bg-foreground\\/10 *)[data-slot$=-item]:focus{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)}}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-item\\]\\:data-highlighted\\:bg-foreground\\/10 *)[data-slot$=-item][data-highlighted]{background-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-item\\]\\:data-highlighted\\:bg-foreground\\/10 *)[data-slot$=-item][data-highlighted]{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)}}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-separator\\]\\:bg-foreground\\/5 *)[data-slot$=-separator]{background-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-separator\\]\\:bg-foreground\\/5 *)[data-slot$=-separator]{background-color:color-mix(in oklab, var(--foreground) 5%, transparent)}}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-trigger\\]\\:focus\\:bg-foreground\\/10 *)[data-slot$=-trigger]:focus{background-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-trigger\\]\\:focus\\:bg-foreground\\/10 *)[data-slot$=-trigger]:focus{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)}}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-trigger\\]\\:aria-expanded\\:bg-foreground\\/10\\! *)[data-slot$=-trigger][aria-expanded=true]{background-color:var(--foreground)!important}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-trigger\\]\\:aria-expanded\\:bg-foreground\\/10\\! *)[data-slot$=-trigger][aria-expanded=true]{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)!important}}:is(.tw\\:\\*\\:data-\\[slot\\=alert-description\\]\\:text-destructive\\/90>*)[data-slot=alert-description]{color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\:data-\\[slot\\=alert-description\\]\\:text-destructive\\/90>*)[data-slot=alert-description]{color:color-mix(in oklab, var(--destructive) 90%, transparent)}}:is(.tw\\:\\*\\:data-\\[slot\\=avatar\\]\\:ring-2>*)[data-slot=avatar]{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}:is(.tw\\:\\*\\:data-\\[slot\\=avatar\\]\\:ring-background>*)[data-slot=avatar]{--tw-ring-color:var(--background)}:is(.tw\\:\\*\\:data-\\[slot\\=input-group-addon\\]\\:ps-2\\!>*)[data-slot=input-group-addon]{padding-inline-start:calc(calc(var(--spacing)) * 2)!important}:is(.tw\\:\\*\\*\\:data-\\[slot\\=kbd\\]\\:relative *)[data-slot=kbd]{position:relative}:is(.tw\\:\\*\\*\\:data-\\[slot\\=kbd\\]\\:isolate *)[data-slot=kbd]{isolation:isolate}:is(.tw\\:\\*\\*\\:data-\\[slot\\=kbd\\]\\:z-50 *)[data-slot=kbd]{z-index:50}:is(.tw\\:\\*\\*\\:data-\\[slot\\=kbd\\]\\:rounded-sm *)[data-slot=kbd]{border-radius:calc(var(--radius) * .6)}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:line-clamp-1>*)[data-slot=select-value]{-webkit-line-clamp:1;-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:flex>*)[data-slot=select-value]{display:flex}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:flex-1>*)[data-slot=select-value]{flex:1}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:items-center>*)[data-slot=select-value]{align-items:center}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:gap-1\\.5>*)[data-slot=select-value]{gap:calc(calc(var(--spacing)) * 1.5)}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:text-start>*)[data-slot=select-value]{text-align:start}.tw\\:group-data-horizontal\\/toggle-group\\:data-\\[spacing\\=0\\]\\:first\\:rounded-s-lg:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=horizontal]) *)[data-spacing="0"]:first-child{border-start-start-radius:var(--radius);border-end-start-radius:var(--radius)}.tw\\:group-data-vertical\\/toggle-group\\:data-\\[spacing\\=0\\]\\:first\\:rounded-t-lg:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=vertical]) *)[data-spacing="0"]:first-child{border-top-left-radius:var(--radius);border-top-right-radius:var(--radius)}.tw\\:group-data-horizontal\\/toggle-group\\:data-\\[spacing\\=0\\]\\:last\\:rounded-e-lg:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=horizontal]) *)[data-spacing="0"]:last-child{border-start-end-radius:var(--radius);border-end-end-radius:var(--radius)}.tw\\:group-data-vertical\\/toggle-group\\:data-\\[spacing\\=0\\]\\:last\\:rounded-b-lg:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=vertical]) *)[data-spacing="0"]:last-child{border-bottom-right-radius:var(--radius);border-bottom-left-radius:var(--radius)}.tw\\:data-\\[state\\=active\\]\\:bg-background[data-state=active]{background-color:var(--background)}.tw\\:data-\\[state\\=active\\]\\:text-foreground[data-state=active]{color:var(--foreground)}.tw\\:data-\\[state\\=active\\]\\:shadow-sm[data-state=active]{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:data-\\[state\\=closed\\]\\:overflow-hidden[data-state=closed]{overflow:hidden}.tw\\:data-\\[state\\=delayed-open\\]\\:animate-in[data-state=delayed-open]{animation:enter var(--tw-animation-duration,var(--tw-duration,.15s))var(--tw-ease,ease)var(--tw-animation-delay,0s)var(--tw-animation-iteration-count,1)var(--tw-animation-direction,normal)var(--tw-animation-fill-mode,none)}.tw\\:data-\\[state\\=delayed-open\\]\\:fade-in-0[data-state=delayed-open]{--tw-enter-opacity:0}.tw\\:data-\\[state\\=delayed-open\\]\\:zoom-in-95[data-state=delayed-open]{--tw-enter-scale:.95}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-soft-approved\\)\\][data-state=on]{background-color:var(--inv-soft-approved)}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-soft-unapproved\\)\\][data-state=on]{background-color:var(--inv-soft-unapproved)}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-soft-unknown\\)\\][data-state=on]{background-color:var(--inv-soft-unknown)}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-vivid-approved\\)\\][data-state=on]{background-color:var(--inv-vivid-approved)}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-vivid-unapproved\\)\\][data-state=on]{background-color:var(--inv-vivid-unapproved)}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-vivid-unknown\\)\\][data-state=on]{background-color:var(--inv-vivid-unknown)}.tw\\:data-\\[state\\=on\\]\\:bg-muted[data-state=on]{background-color:var(--muted)}.tw\\:data-\\[state\\=on\\]\\:text-\\[var\\(--inv-icon-approved\\)\\][data-state=on]{color:var(--inv-icon-approved)}.tw\\:data-\\[state\\=on\\]\\:text-\\[var\\(--inv-icon-unapproved\\)\\][data-state=on]{color:var(--inv-icon-unapproved)}.tw\\:data-\\[state\\=on\\]\\:text-\\[var\\(--inv-icon-unknown\\)\\][data-state=on]{color:var(--inv-icon-unknown)}.tw\\:data-\\[state\\=on\\]\\:text-\\[var\\(--inv-on\\)\\][data-state=on]{color:var(--inv-on)}.tw\\:data-\\[state\\=on\\]\\:text-foreground[data-state=on]{color:var(--foreground)}.tw\\:data-\\[state\\=open\\]\\:bg-accent[data-state=open]{background-color:var(--accent)}.tw\\:data-\\[state\\=open\\]\\:bg-muted[data-state=open]{background-color:var(--muted)}.tw\\:data-\\[state\\=open\\]\\:text-foreground[data-state=open]{color:var(--foreground)}.tw\\:data-\\[state\\=selected\\]\\:bg-muted[data-state=selected]{background-color:var(--muted)}.tw\\:data-\\[variant\\=destructive\\]\\:text-destructive[data-variant=destructive]{color:var(--destructive)}:is(:is(.tw\\:\\*\\*\\:data-\\[variant\\=destructive\\]\\:\\*\\*\\:text-accent-foreground\\! *)[data-variant=destructive] *),:is(.tw\\:\\*\\*\\:data-\\[variant\\=destructive\\]\\:text-accent-foreground\\! *)[data-variant=destructive]{color:var(--accent-foreground)!important}.tw\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-destructive\\/10[data-variant=destructive]:focus{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-destructive\\/10[data-variant=destructive]:focus{background-color:color-mix(in oklab, var(--destructive) 10%, transparent)}}.tw\\:data-\\[variant\\=destructive\\]\\:focus\\:text-destructive[data-variant=destructive]:focus{color:var(--destructive)}:is(.tw\\:\\*\\*\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-foreground\\/10\\! *)[data-variant=destructive]:focus{background-color:var(--foreground)!important}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-foreground\\/10\\! *)[data-variant=destructive]:focus{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)!important}}.tw\\:data-\\[variant\\=line\\]\\:rounded-none[data-variant=line]{border-radius:0}.tw\\:group-data-horizontal\\/toggle-group\\:data-\\[spacing\\=0\\]\\:data-\\[variant\\=outline\\]\\:border-s-0:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=horizontal]) *)[data-spacing="0"][data-variant=outline]{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:group-data-vertical\\/toggle-group\\:data-\\[spacing\\=0\\]\\:data-\\[variant\\=outline\\]\\:border-t-0:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=vertical]) *)[data-spacing="0"][data-variant=outline]{border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:group-data-horizontal\\/toggle-group\\:data-\\[spacing\\=0\\]\\:data-\\[variant\\=outline\\]\\:first\\:border-s:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=horizontal]) *)[data-spacing="0"][data-variant=outline]:first-child{border-inline-start-style:var(--tw-border-style);border-inline-start-width:1px}.tw\\:group-data-vertical\\/toggle-group\\:data-\\[spacing\\=0\\]\\:data-\\[variant\\=outline\\]\\:first\\:border-t:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=vertical]) *)[data-spacing="0"][data-variant=outline]:first-child{border-top-style:var(--tw-border-style);border-top-width:1px}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:inset-x-0[data-vaul-drawer-direction=bottom]{inset-inline:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:bottom-0[data-vaul-drawer-direction=bottom]{bottom:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:mt-24[data-vaul-drawer-direction=bottom]{margin-top:calc(calc(var(--spacing)) * 24)}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:max-h-\\[80vh\\][data-vaul-drawer-direction=bottom]{max-height:80vh}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:rounded-t-xl[data-vaul-drawer-direction=bottom]{border-top-left-radius:calc(var(--radius) * 1.4);border-top-right-radius:calc(var(--radius) * 1.4)}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:border-t[data-vaul-drawer-direction=bottom]{border-top-style:var(--tw-border-style);border-top-width:1px}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:inset-y-0[data-vaul-drawer-direction=left]{inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:left-0[data-vaul-drawer-direction=left]{left:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:w-3\\/4[data-vaul-drawer-direction=left]{width:75%}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:flex-row[data-vaul-drawer-direction=left]{flex-direction:row}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:rounded-r-xl[data-vaul-drawer-direction=left]{border-top-right-radius:calc(var(--radius) * 1.4);border-bottom-right-radius:calc(var(--radius) * 1.4)}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:border-r[data-vaul-drawer-direction=left]{border-right-style:var(--tw-border-style);border-right-width:1px}.tw\\:data-\\[vaul-drawer-direction\\=left\\/right\\]\\:flex-row[data-vaul-drawer-direction=left\\/right]{flex-direction:row}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:inset-y-0[data-vaul-drawer-direction=right]{inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:right-0[data-vaul-drawer-direction=right]{right:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:w-3\\/4[data-vaul-drawer-direction=right]{width:75%}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:flex-row[data-vaul-drawer-direction=right]{flex-direction:row}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:rounded-l-xl[data-vaul-drawer-direction=right]{border-top-left-radius:calc(var(--radius) * 1.4);border-bottom-left-radius:calc(var(--radius) * 1.4)}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:border-l[data-vaul-drawer-direction=right]{border-left-style:var(--tw-border-style);border-left-width:1px}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:inset-x-0[data-vaul-drawer-direction=top]{inset-inline:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:top-0[data-vaul-drawer-direction=top]{top:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:mb-24[data-vaul-drawer-direction=top]{margin-bottom:calc(calc(var(--spacing)) * 24)}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:max-h-\\[80vh\\][data-vaul-drawer-direction=top]{max-height:80vh}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:rounded-b-xl[data-vaul-drawer-direction=top]{border-bottom-right-radius:calc(var(--radius) * 1.4);border-bottom-left-radius:calc(var(--radius) * 1.4)}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:border-b[data-vaul-drawer-direction=top]{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}@supports ((-webkit-backdrop-filter:var(--tw)) or (backdrop-filter:var(--tw))){.tw\\:supports-backdrop-filter\\:backdrop-blur-xs{--tw-backdrop-blur:blur(var(--tw-blur-xs));-webkit-backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)}}@media (min-width:40rem){.tw\\:sm\\:flex{display:flex}.tw\\:sm\\:max-w-sm{max-width:var(--tw-container-sm)}.tw\\:sm\\:flex-row{flex-direction:row}.tw\\:sm\\:justify-end{justify-content:flex-end}.tw\\:sm\\:p-8{padding:calc(calc(var(--spacing)) * 8)}.tw\\:sm\\:text-start{text-align:start}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:sm\\:max-w-sm[data-vaul-drawer-direction=left],.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:sm\\:max-w-sm[data-vaul-drawer-direction=right]{max-width:var(--tw-container-sm)}}@media (min-width:48rem){.tw\\:md\\:block{display:block}.tw\\:md\\:flex{display:flex}.tw\\:md\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.tw\\:md\\:gap-0\\.5{gap:calc(calc(var(--spacing)) * .5)}.tw\\:md\\:text-start{text-align:start}.tw\\:md\\:text-sm{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:md\\:text-pretty{text-wrap:pretty}.tw\\:md\\:opacity-0{opacity:0}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:m-2:is(:where(.tw\\:peer)[data-variant=inset]~*){margin:calc(calc(var(--spacing)) * 2)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:ms-0:is(:where(.tw\\:peer)[data-variant=inset]~*){margin-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:rounded-xl:is(:where(.tw\\:peer)[data-variant=inset]~*){border-radius:calc(var(--radius) * 1.4)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:shadow-sm:is(:where(.tw\\:peer)[data-variant=inset]~*){--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:peer-data-\\[state\\=collapsed\\]\\:ms-2:is(:where(.tw\\:peer)[data-variant=inset]~*):is(:where(.tw\\:peer)[data-state=collapsed]~*){margin-inline-start:calc(calc(var(--spacing)) * 2)}.tw\\:md\\:after\\:hidden:after{content:var(--tw-content);display:none}}@media (min-width:64rem){.tw\\:lg\\:flex{display:flex}.tw\\:lg\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}:where(.tw\\:lg\\:space-x-8>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 8) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 8) * calc(1 - var(--tw-space-x-reverse)))}.tw\\:lg\\:text-5xl{font-size:var(--tw-text-5xl);line-height:var(--tw-leading,var(--tw-text-5xl--line-height))}}@media (min-width:48rem){@media (min-width:64rem){.tw\\:md\\:lg\\:hidden{display:none}}}@media (min-width:80rem){.tw\\:xl\\:auto-cols-fr{grid-auto-columns:minmax(0,1fr)}.tw\\:xl\\:grid-flow-col{grid-auto-flow:column}.tw\\:xl\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.tw\\:xl\\:grid-cols-none{grid-template-columns:none}.tw\\:xl\\:grid-rows-2{grid-template-rows:repeat(2,minmax(0,1fr))}}@container search not (min-width:7rem){.tw\\:\\@max-\\[7rem\\]\\/search\\:hidden{display:none}.tw\\:\\@max-\\[7rem\\]\\/search\\:ps-3{padding-inline-start:calc(calc(var(--spacing)) * 3)}}@container search not (min-width:4rem){.tw\\:\\@max-\\[4rem\\]\\/search\\:hidden{display:none}.tw\\:\\@max-\\[4rem\\]\\/search\\:pe-3{padding-inline-end:calc(calc(var(--spacing)) * 3)}}@container search not (min-width:3rem){.tw\\:\\@max-\\[3rem\\]\\/search\\:ps-0{padding-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:\\@max-\\[3rem\\]\\/search\\:pe-0{padding-inline-end:calc(calc(var(--spacing)) * 0)}}@container (min-width:24rem){.tw\\:\\@sm\\:basis-auto{flex-basis:auto}}.tw\\:ltr\\:left-2:where(:dir(ltr),[dir=ltr],[dir=ltr] *){left:calc(calc(var(--spacing)) * 2)}.tw\\:ltr\\:-translate-x-1\\/2:where(:dir(ltr),[dir=ltr],[dir=ltr] *){--tw-translate-x:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:right-2:where(:dir(rtl),[dir=rtl],[dir=rtl] *){right:calc(calc(var(--spacing)) * 2)}.tw\\:rtl\\:flex:where(:dir(rtl),[dir=rtl],[dir=rtl] *){display:flex}.tw\\:rtl\\:-translate-x-px:where(:dir(rtl),[dir=rtl],[dir=rtl] *){--tw-translate-x:-1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:translate-x-1\\/2:where(:dir(rtl),[dir=rtl],[dir=rtl] *){--tw-translate-x:calc(1 / 2 * 100%);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:translate-x-px:where(:dir(rtl),[dir=rtl],[dir=rtl] *){--tw-translate-x:1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:after\\:translate-x-1\\/2:where(:dir(rtl),[dir=rtl],[dir=rtl] *):after{content:var(--tw-content);--tw-translate-x:calc(1 / 2 * 100%);translate:var(--tw-translate-x) var(--tw-translate-y)}:where([data-side=primary]) .tw\\:rtl\\:in-data-\\[side\\=primary\\]\\:cursor-e-resize:where(:dir(rtl),[dir=rtl],[dir=rtl] *){cursor:e-resize}:where([data-side=secondary]) .tw\\:rtl\\:in-data-\\[side\\=secondary\\]\\:cursor-w-resize:where(:dir(rtl),[dir=rtl],[dir=rtl] *){cursor:w-resize}.tw\\:rtl\\:aria-\\[orientation\\=horizontal\\]\\:after\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *)[aria-orientation=horizontal]:after{content:var(--tw-content);--tw-translate-x:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:data-\\[side\\=left\\]\\:translate-x-1:where(:dir(rtl),[dir=rtl],[dir=rtl] *)[data-side=left]{--tw-translate-x:calc(calc(var(--spacing)) * 1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:data-\\[side\\=right\\]\\:-translate-x-1:where(:dir(rtl),[dir=rtl],[dir=rtl] *)[data-side=right]{--tw-translate-x:calc(calc(var(--spacing)) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:dark\\:border-input:is(.dark *){border-color:var(--input)}.tw\\:dark\\:bg-destructive\\/20:is(.dark *){background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:bg-destructive\\/20:is(.dark *){background-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:dark\\:bg-input\\/30:is(.dark *){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:bg-input\\/30:is(.dark *){background-color:color-mix(in oklab, var(--input) 30%, transparent)}}.tw\\:dark\\:bg-transparent:is(.dark *){background-color:#0000}.tw\\:dark\\:text-amber-400:is(.dark *){color:var(--tw-color-amber-400)}.tw\\:dark\\:text-muted-foreground:is(.dark *){color:var(--muted-foreground)}.tw\\:dark\\:text-rose-400:is(.dark *){color:var(--tw-color-rose-400)}.tw\\:dark\\:text-sky-400:is(.dark *){color:var(--tw-color-sky-400)}.tw\\:dark\\:text-teal-400:is(.dark *){color:var(--tw-color-teal-400)}.tw\\:dark\\:after\\:mix-blend-lighten:is(.dark *):after{content:var(--tw-content);mix-blend-mode:lighten}@media (hover:hover){.tw\\:dark\\:hover\\:bg-blue-500:is(.dark *):hover{background-color:var(--tw-color-blue-500)}.tw\\:dark\\:hover\\:bg-destructive\\/30:is(.dark *):hover{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:hover\\:bg-destructive\\/30:is(.dark *):hover{background-color:color-mix(in oklab, var(--destructive) 30%, transparent)}}.tw\\:dark\\:hover\\:bg-input\\/50:is(.dark *):hover{background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:hover\\:bg-input\\/50:is(.dark *):hover{background-color:color-mix(in oklab, var(--input) 50%, transparent)}}.tw\\:dark\\:hover\\:bg-muted\\/50:is(.dark *):hover{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:hover\\:bg-muted\\/50:is(.dark *):hover{background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:dark\\:hover\\:text-foreground:is(.dark *):hover{color:var(--foreground)}}.tw\\:dark\\:focus-visible\\:ring-destructive\\/40:is(.dark *):focus-visible{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:focus-visible\\:ring-destructive\\/40:is(.dark *):focus-visible{--tw-ring-color:color-mix(in oklab, var(--destructive) 40%, transparent)}}.tw\\:dark\\:disabled\\:bg-input\\/80:is(.dark *):disabled{background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:disabled\\:bg-input\\/80:is(.dark *):disabled{background-color:color-mix(in oklab, var(--input) 80%, transparent)}}.tw\\:dark\\:disabled\\:bg-transparent:is(.dark *):disabled{background-color:#0000}:where([data-slot=tooltip-content]) .tw\\:dark\\:in-data-\\[slot\\=tooltip-content\\]\\:bg-background\\/10:is(.dark *){background-color:var(--background)}@supports (color:color-mix(in lab, red, red)){:where([data-slot=tooltip-content]) .tw\\:dark\\:in-data-\\[slot\\=tooltip-content\\]\\:bg-background\\/10:is(.dark *){background-color:color-mix(in oklab, var(--background) 10%, transparent)}}.tw\\:dark\\:has-disabled\\:bg-input\\/80:is(.dark *):has(:disabled){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:has-disabled\\:bg-input\\/80:is(.dark *):has(:disabled){background-color:color-mix(in oklab, var(--input) 80%, transparent)}}.tw\\:dark\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-destructive\\/40:is(.dark *):has([data-slot][aria-invalid=true]){--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-destructive\\/40:is(.dark *):has([data-slot][aria-invalid=true]){--tw-ring-color:color-mix(in oklab, var(--destructive) 40%, transparent)}}.tw\\:dark\\:aria-invalid\\:border-destructive\\/50:is(.dark *)[aria-invalid=true]{border-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:aria-invalid\\:border-destructive\\/50:is(.dark *)[aria-invalid=true]{border-color:color-mix(in oklab, var(--destructive) 50%, transparent)}}.tw\\:dark\\:aria-invalid\\:ring-destructive\\/40:is(.dark *)[aria-invalid=true]{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:aria-invalid\\:ring-destructive\\/40:is(.dark *)[aria-invalid=true]{--tw-ring-color:color-mix(in oklab, var(--destructive) 40%, transparent)}}.tw\\:dark\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-destructive\\/20:is(.dark *)[data-variant=destructive]:focus{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-destructive\\/20:is(.dark *)[data-variant=destructive]:focus{background-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:data-open\\:animate-in:where([data-state=open]),.tw\\:data-open\\:animate-in:where([data-open]:not([data-open=false])){animation:enter var(--tw-animation-duration,var(--tw-duration,.15s))var(--tw-ease,ease)var(--tw-animation-delay,0s)var(--tw-animation-iteration-count,1)var(--tw-animation-direction,normal)var(--tw-animation-fill-mode,none)}.tw\\:data-open\\:bg-accent:where([data-state=open]),.tw\\:data-open\\:bg-accent:where([data-open]:not([data-open=false])){background-color:var(--accent)}.tw\\:data-open\\:text-accent-foreground:where([data-state=open]),.tw\\:data-open\\:text-accent-foreground:where([data-open]:not([data-open=false])){color:var(--accent-foreground)}.tw\\:data-open\\:fade-in-0:where([data-state=open]),.tw\\:data-open\\:fade-in-0:where([data-open]:not([data-open=false])){--tw-enter-opacity:0}.tw\\:data-open\\:zoom-in-95:where([data-state=open]),.tw\\:data-open\\:zoom-in-95:where([data-open]:not([data-open=false])){--tw-enter-scale:.95}@media (hover:hover){:is(.tw\\:data-open\\:hover\\:bg-sidebar-accent:where([data-state=open]),.tw\\:data-open\\:hover\\:bg-sidebar-accent:where([data-open]:not([data-open=false]))):hover{background-color:var(--sidebar-accent)}:is(.tw\\:data-open\\:hover\\:text-sidebar-accent-foreground:where([data-state=open]),.tw\\:data-open\\:hover\\:text-sidebar-accent-foreground:where([data-open]:not([data-open=false]))):hover{color:var(--sidebar-accent-foreground)}}.tw\\:data-closed\\:animate-out:where([data-state=closed]),.tw\\:data-closed\\:animate-out:where([data-closed]:not([data-closed=false])){animation:exit var(--tw-animation-duration,var(--tw-duration,.15s))var(--tw-ease,ease)var(--tw-animation-delay,0s)var(--tw-animation-iteration-count,1)var(--tw-animation-direction,normal)var(--tw-animation-fill-mode,none)}.tw\\:data-closed\\:fade-out-0:where([data-state=closed]),.tw\\:data-closed\\:fade-out-0:where([data-closed]:not([data-closed=false])){--tw-exit-opacity:0}.tw\\:data-closed\\:zoom-out-95:where([data-state=closed]),.tw\\:data-closed\\:zoom-out-95:where([data-closed]:not([data-closed=false])){--tw-exit-scale:.95}.tw\\:data-checked\\:border-primary:where([data-state=checked]),.tw\\:data-checked\\:border-primary:where([data-checked]:not([data-checked=false])){border-color:var(--primary)}.tw\\:data-checked\\:bg-primary:where([data-state=checked]),.tw\\:data-checked\\:bg-primary:where([data-checked]:not([data-checked=false])){background-color:var(--primary)}.tw\\:data-checked\\:text-primary-foreground:where([data-state=checked]),.tw\\:data-checked\\:text-primary-foreground:where([data-checked]:not([data-checked=false])){color:var(--primary-foreground)}.tw\\:group-data-\\[size\\=default\\]\\/switch\\:data-checked\\:translate-x-\\[calc\\(100\\%-2px\\)\\]:is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-state=checked]),.tw\\:group-data-\\[size\\=default\\]\\/switch\\:data-checked\\:translate-x-\\[calc\\(100\\%-2px\\)\\]:is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-checked]:not([data-checked=false])),.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:data-checked\\:translate-x-\\[calc\\(100\\%-2px\\)\\]:is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-state=checked]),.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:data-checked\\:translate-x-\\[calc\\(100\\%-2px\\)\\]:is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-checked]:not([data-checked=false])){--tw-translate-x:calc(100% - 2px);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:group-data-\\[size\\=default\\]\\/switch\\:data-checked\\:-translate-x-\\[calc\\(100\\%-2px\\)\\]:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-state=checked]),.tw\\:rtl\\:group-data-\\[size\\=default\\]\\/switch\\:data-checked\\:-translate-x-\\[calc\\(100\\%-2px\\)\\]:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-checked]:not([data-checked=false])),.tw\\:rtl\\:group-data-\\[size\\=sm\\]\\/switch\\:data-checked\\:-translate-x-\\[calc\\(100\\%-2px\\)\\]:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-state=checked]),.tw\\:rtl\\:group-data-\\[size\\=sm\\]\\/switch\\:data-checked\\:-translate-x-\\[calc\\(100\\%-2px\\)\\]:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-checked]:not([data-checked=false])){--tw-translate-x:calc(calc(100% - 2px) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:dark\\:data-checked\\:bg-primary:is(.dark *):where([data-state=checked]),.tw\\:dark\\:data-checked\\:bg-primary:is(.dark *):where([data-checked]:not([data-checked=false])){background-color:var(--primary)}.tw\\:dark\\:data-checked\\:bg-primary-foreground:is(.dark *):where([data-state=checked]),.tw\\:dark\\:data-checked\\:bg-primary-foreground:is(.dark *):where([data-checked]:not([data-checked=false])){background-color:var(--primary-foreground)}.tw\\:data-unchecked\\:bg-input:where([data-state=unchecked]),.tw\\:data-unchecked\\:bg-input:where([data-unchecked]:not([data-unchecked=false])){background-color:var(--input)}.tw\\:group-data-\\[size\\=default\\]\\/switch\\:data-unchecked\\:translate-x-0:is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-state=unchecked]),.tw\\:group-data-\\[size\\=default\\]\\/switch\\:data-unchecked\\:translate-x-0:is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-unchecked]:not([data-unchecked=false])),.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:data-unchecked\\:translate-x-0:is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-state=unchecked]),.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:data-unchecked\\:translate-x-0:is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-unchecked]:not([data-unchecked=false])),.tw\\:rtl\\:group-data-\\[size\\=default\\]\\/switch\\:data-unchecked\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-state=unchecked]),.tw\\:rtl\\:group-data-\\[size\\=default\\]\\/switch\\:data-unchecked\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-unchecked]:not([data-unchecked=false])),.tw\\:rtl\\:group-data-\\[size\\=sm\\]\\/switch\\:data-unchecked\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-state=unchecked]),.tw\\:rtl\\:group-data-\\[size\\=sm\\]\\/switch\\:data-unchecked\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-unchecked]:not([data-unchecked=false])){--tw-translate-x:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:dark\\:data-unchecked\\:bg-foreground:is(.dark *):where([data-state=unchecked]),.tw\\:dark\\:data-unchecked\\:bg-foreground:is(.dark *):where([data-unchecked]:not([data-unchecked=false])){background-color:var(--foreground)}.tw\\:dark\\:data-unchecked\\:bg-input\\/80:is(.dark *):where([data-state=unchecked]),.tw\\:dark\\:data-unchecked\\:bg-input\\/80:is(.dark *):where([data-unchecked]:not([data-unchecked=false])){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:data-unchecked\\:bg-input\\/80:is(.dark *):where([data-state=unchecked]),.tw\\:dark\\:data-unchecked\\:bg-input\\/80:is(.dark *):where([data-unchecked]:not([data-unchecked=false])){background-color:color-mix(in oklab, var(--input) 80%, transparent)}}.tw\\:data-selected\\:bg-muted:where([data-selected=true]),.tw\\:data-selected\\:bg-muted\\/50:where([data-selected=true]){background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:data-selected\\:bg-muted\\/50:where([data-selected=true]){background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:data-selected\\:bg-primary:where([data-selected=true]){background-color:var(--primary)}.tw\\:data-selected\\:bg-transparent:where([data-selected=true]){background-color:#0000}.tw\\:data-selected\\:text-foreground:where([data-selected=true]){color:var(--foreground)}.tw\\:data-selected\\:text-inherit:where([data-selected=true]){color:inherit}.tw\\:data-selected\\:text-muted-foreground\\/50:where([data-selected=true]){color:var(--muted-foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:data-selected\\:text-muted-foreground\\/50:where([data-selected=true]){color:color-mix(in oklab, var(--muted-foreground) 50%, transparent)}}.tw\\:data-selected\\:text-primary-foreground:where([data-selected=true]){color:var(--primary-foreground)}.tw\\:data-selected\\:ring-2:where([data-selected=true]){--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:data-selected\\:ring-primary-foreground\\/70:where([data-selected=true]){--tw-ring-color:var(--primary-foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:data-selected\\:ring-primary-foreground\\/70:where([data-selected=true]){--tw-ring-color:color-mix(in oklab, var(--primary-foreground) 70%, transparent)}}.tw\\:data-selected\\:ring-ring\\/50:where([data-selected=true]){--tw-ring-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.tw\\:data-selected\\:ring-ring\\/50:where([data-selected=true]){--tw-ring-color:color-mix(in oklab, var(--ring) 50%, transparent)}}.tw\\:data-selected\\:ring-inset:where([data-selected=true]){--tw-ring-inset:inset}@media (forced-colors:active){.tw\\:forced-colors\\:data-selected\\:outline-2:where([data-selected=true]){outline-style:var(--tw-outline-style);outline-width:2px}.tw\\:forced-colors\\:data-selected\\:-outline-offset-2:where([data-selected=true]){outline-offset:calc(2px * -1)}.tw\\:forced-colors\\:data-selected\\:outline-\\[color\\:Highlight\\]:where([data-selected=true]){outline-color:highlight}}.tw\\:data-disabled\\:pointer-events-none:where([data-disabled=true]),.tw\\:data-disabled\\:pointer-events-none:where([data-disabled]:not([data-disabled=false])){pointer-events:none}.tw\\:data-disabled\\:cursor-not-allowed:where([data-disabled=true]),.tw\\:data-disabled\\:cursor-not-allowed:where([data-disabled]:not([data-disabled=false])){cursor:not-allowed}.tw\\:data-disabled\\:opacity-50:where([data-disabled=true]),.tw\\:data-disabled\\:opacity-50:where([data-disabled]:not([data-disabled=false])){opacity:.5}.tw\\:data-active\\:bg-background:where([data-state=active]),.tw\\:data-active\\:bg-background:where([data-active]:not([data-active=false])){background-color:var(--background)}.tw\\:data-active\\:bg-sidebar-accent:where([data-state=active]),.tw\\:data-active\\:bg-sidebar-accent:where([data-active]:not([data-active=false])){background-color:var(--sidebar-accent)}.tw\\:data-active\\:font-medium:where([data-state=active]),.tw\\:data-active\\:font-medium:where([data-active]:not([data-active=false])){--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}.tw\\:data-active\\:text-foreground:where([data-state=active]),.tw\\:data-active\\:text-foreground:where([data-active]:not([data-active=false])){color:var(--foreground)}.tw\\:data-active\\:text-sidebar-accent-foreground:where([data-state=active]),.tw\\:data-active\\:text-sidebar-accent-foreground:where([data-active]:not([data-active=false])){color:var(--sidebar-accent-foreground)}.tw\\:group-data-\\[variant\\=default\\]\\/tabs-list\\:data-active\\:shadow-sm:is(:where(.tw\\:group\\/tabs-list)[data-variant=default] *):where([data-state=active]),.tw\\:group-data-\\[variant\\=default\\]\\/tabs-list\\:data-active\\:shadow-sm:is(:where(.tw\\:group\\/tabs-list)[data-variant=default] *):where([data-active]:not([data-active=false])){--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:bg-transparent:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:bg-transparent:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false])){background-color:#0000}.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:shadow-none:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:shadow-none:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false])){--tw-shadow:0 0 #0000;box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}:is(.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:after\\:opacity-100:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:after\\:opacity-100:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false]))):after{content:var(--tw-content);opacity:1}.tw\\:dark\\:data-active\\:border-input:is(.dark *):where([data-state=active]),.tw\\:dark\\:data-active\\:border-input:is(.dark *):where([data-active]:not([data-active=false])){border-color:var(--input)}.tw\\:dark\\:data-active\\:bg-input\\/30:is(.dark *):where([data-state=active]),.tw\\:dark\\:data-active\\:bg-input\\/30:is(.dark *):where([data-active]:not([data-active=false])){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:data-active\\:bg-input\\/30:is(.dark *):where([data-state=active]),.tw\\:dark\\:data-active\\:bg-input\\/30:is(.dark *):where([data-active]:not([data-active=false])){background-color:color-mix(in oklab, var(--input) 30%, transparent)}}.tw\\:dark\\:data-active\\:text-foreground:is(.dark *):where([data-state=active]),.tw\\:dark\\:data-active\\:text-foreground:is(.dark *):where([data-active]:not([data-active=false])){color:var(--foreground)}.tw\\:dark\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:border-transparent:is(.dark *):is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:dark\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:border-transparent:is(.dark *):is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false])){border-color:#0000}.tw\\:dark\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:bg-transparent:is(.dark *):is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:dark\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:bg-transparent:is(.dark *):is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false])){background-color:#0000}.tw\\:data-horizontal\\:mx-px:where([data-orientation=horizontal]){margin-inline:1px}.tw\\:data-horizontal\\:h-1:where([data-orientation=horizontal]){height:calc(calc(var(--spacing)) * 1)}.tw\\:data-horizontal\\:h-full:where([data-orientation=horizontal]){height:100%}.tw\\:data-horizontal\\:h-px:where([data-orientation=horizontal]){height:1px}.tw\\:data-horizontal\\:w-auto:where([data-orientation=horizontal]){width:auto}.tw\\:data-horizontal\\:w-full:where([data-orientation=horizontal]){width:100%}.tw\\:data-horizontal\\:flex-col:where([data-orientation=horizontal]){flex-direction:column}.tw\\:data-vertical\\:my-px:where([data-orientation=vertical]){margin-block:1px}.tw\\:data-vertical\\:h-auto:where([data-orientation=vertical]){height:auto}.tw\\:data-vertical\\:h-full:where([data-orientation=vertical]){height:100%}.tw\\:data-vertical\\:min-h-40:where([data-orientation=vertical]){min-height:calc(calc(var(--spacing)) * 40)}.tw\\:data-vertical\\:w-1:where([data-orientation=vertical]){width:calc(calc(var(--spacing)) * 1)}.tw\\:data-vertical\\:w-auto:where([data-orientation=vertical]){width:auto}.tw\\:data-vertical\\:w-full:where([data-orientation=vertical]){width:100%}.tw\\:data-vertical\\:w-px:where([data-orientation=vertical]){width:1px}.tw\\:data-vertical\\:flex-col:where([data-orientation=vertical]){flex-direction:column}.tw\\:data-vertical\\:items-stretch:where([data-orientation=vertical]){align-items:stretch}.tw\\:data-vertical\\:self-stretch:where([data-orientation=vertical]){align-self:stretch}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:mt-0 [data-lexical-editor=true]>blockquote{margin-top:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:border-s-0 [data-lexical-editor=true]>blockquote{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:ps-0 [data-lexical-editor=true]>blockquote{padding-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:font-normal [data-lexical-editor=true]>blockquote{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:text-foreground [data-lexical-editor=true]>blockquote{color:var(--foreground)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:not-italic [data-lexical-editor=true]>blockquote{font-style:normal}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:mt-0 [data-lexical-editor=\\"true\\"]>blockquote{margin-top:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:border-s-0 [data-lexical-editor=\\"true\\"]>blockquote{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:ps-0 [data-lexical-editor=\\"true\\"]>blockquote{padding-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:font-normal [data-lexical-editor=\\"true\\"]>blockquote{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:text-foreground [data-lexical-editor=\\"true\\"]>blockquote{color:var(--foreground)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:not-italic [data-lexical-editor=\\"true\\"]>blockquote{font-style:normal}.tw\\:\\[\\&_a\\]\\:underline a{text-decoration-line:underline}.tw\\:\\[\\&_a\\]\\:underline-offset-3 a{text-underline-offset:3px}@media (hover:hover){.tw\\:\\[\\&_a\\]\\:hover\\:text-foreground a:hover{color:var(--foreground)}}.tw\\:\\[\\&_p\\]\\:my-0 p{margin-block:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_p\\:not\\(\\:last-child\\)\\]\\:mb-4 p:not(:last-child){margin-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&_s\\]\\:text-destructive s{color:var(--destructive)}.tw\\:\\[\\&_s\\]\\:line-through s{text-decoration-line:line-through}.tw\\:\\[\\&_svg\\]\\:pointer-events-none svg{pointer-events:none}.tw\\:\\[\\&_svg\\]\\:size-4 svg{width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&_svg\\]\\:shrink-0 svg{flex-shrink:0}.tw\\:\\[\\&_svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-3 svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:\\[\\&_svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-3\\.5 svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 3.5);height:calc(calc(var(--spacing)) * 3.5)}.tw\\:\\[\\&_svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-4 svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&_tr\\]\\:border-b tr{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}.tw\\:\\[\\&_tr\\:last-child\\]\\:border-0 tr:last-child{border-style:var(--tw-border-style);border-width:0}.tw\\:\\[\\&_u\\]\\:font-semibold u{--tw-font-weight:var(--tw-font-weight-semibold);font-weight:var(--tw-font-weight-semibold)}.tw\\:\\[\\&_u\\]\\:text-success-foreground u{color:var(--success-foreground)}.tw\\:\\[\\&_u\\]\\:no-underline u{text-decoration-line:none}.tw\\:\\[\\&\\:has\\(\\[role\\=checkbox\\]\\)\\]\\:pe-0:has([role=checkbox]){padding-inline-end:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\.border-b\\]\\:pb-2.border-b{padding-bottom:calc(calc(var(--spacing)) * 2)}.tw\\:\\[\\.border-b\\]\\:pb-4.border-b{padding-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[size\\=sm\\]\\/card\\:\\[\\.border-b\\]\\:pb-3:is(:where(.tw\\:group\\/card)[data-size=sm] *).border-b{padding-bottom:calc(calc(var(--spacing)) * 3)}.tw\\:\\[\\.border-t\\]\\:pt-2.border-t{padding-top:calc(calc(var(--spacing)) * 2)}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:px-2 *)[cmdk-group-heading]{padding-inline:calc(calc(var(--spacing)) * 2)}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:py-1\\.5 *)[cmdk-group-heading]{padding-block:calc(calc(var(--spacing)) * 1.5)}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:text-xs *)[cmdk-group-heading]{font-size:var(--tw-text-xs);line-height:var(--tw-leading,var(--tw-text-xs--line-height))}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:font-medium *)[cmdk-group-heading]{--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:text-muted-foreground *)[cmdk-group-heading]{color:var(--muted-foreground)}:is(.tw\\:\\*\\:\\[a\\]\\:underline>*):is(a){text-decoration-line:underline}:is(.tw\\:\\*\\:\\[a\\]\\:underline-offset-3>*):is(a){text-underline-offset:3px}@media (hover:hover){.tw\\:\\[a\\]\\:hover\\:bg-destructive\\/20:is(a):hover{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:\\[a\\]\\:hover\\:bg-destructive\\/20:is(a):hover{background-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:\\[a\\]\\:hover\\:bg-muted:is(a):hover{background-color:var(--muted)}.tw\\:\\[a\\]\\:hover\\:bg-primary\\/80:is(a):hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:\\[a\\]\\:hover\\:bg-primary\\/80:is(a):hover{background-color:color-mix(in oklab, var(--primary) 80%, transparent)}}.tw\\:\\[a\\]\\:hover\\:bg-secondary\\/80:is(a):hover{background-color:var(--secondary)}@supports (color:color-mix(in lab, red, red)){.tw\\:\\[a\\]\\:hover\\:bg-secondary\\/80:is(a):hover{background-color:color-mix(in oklab, var(--secondary) 80%, transparent)}}.tw\\:\\[a\\]\\:hover\\:text-muted-foreground:is(a):hover{color:var(--muted-foreground)}:is(.tw\\:\\*\\:\\[a\\]\\:hover\\:text-foreground>*):is(a):hover{color:var(--foreground)}}:is(.tw\\:\\*\\:\\[img\\]\\:row-span-2>*):is(img){grid-row:span 2/span 2}:is(.tw\\:\\*\\:\\[img\\]\\:translate-y-0\\.5>*):is(img){--tw-translate-y:calc(calc(var(--spacing)) * .5);translate:var(--tw-translate-x) var(--tw-translate-y)}:is(.tw\\:\\*\\:\\[img\\]\\:text-current>*):is(img){color:currentColor}:is(.tw\\:\\*\\:\\[img\\:first-child\\]\\:rounded-t-xl>*):is(img:first-child){border-top-left-radius:calc(var(--radius) * 1.4);border-top-right-radius:calc(var(--radius) * 1.4)}:is(.tw\\:\\*\\:\\[img\\:last-child\\]\\:rounded-b-xl>*):is(img:last-child){border-bottom-right-radius:calc(var(--radius) * 1.4);border-bottom-left-radius:calc(var(--radius) * 1.4)}:is(.tw\\:\\*\\:\\[img\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-4>*):is(img:not([class*=size-])){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}:is(.tw\\:\\*\\:\\[span\\]\\:last\\:flex>*):is(span):last-child{display:flex}:is(.tw\\:\\*\\:\\[span\\]\\:last\\:items-center>*):is(span):last-child{align-items:center}:is(.tw\\:\\*\\:\\[span\\]\\:last\\:gap-2>*):is(span):last-child{gap:calc(calc(var(--spacing)) * 2)}:is(.tw\\:\\*\\:\\[svg\\]\\:row-span-2>*):is(svg){grid-row:span 2/span 2}:is(.tw\\:\\*\\:\\[svg\\]\\:translate-y-0\\.5>*):is(svg){--tw-translate-y:calc(calc(var(--spacing)) * .5);translate:var(--tw-translate-x) var(--tw-translate-y)}:is(.tw\\:\\*\\:\\[svg\\]\\:text-current>*):is(svg){color:currentColor}:is(.tw\\:focus\\:\\*\\:\\[svg\\]\\:text-accent-foreground:focus>*):is(svg){color:var(--accent-foreground)}:is(.tw\\:data-\\[variant\\=destructive\\]\\:\\*\\:\\[svg\\]\\:text-destructive[data-variant=destructive]>*):is(svg){color:var(--destructive)}:is(.tw\\:data-\\[variant\\=destructive\\]\\:\\*\\:\\[svg\\]\\:text-destructive\\![data-variant=destructive]>*):is(svg){color:var(--destructive)!important}:is(.tw\\:data-selected\\:\\*\\:\\[svg\\]\\:text-foreground:where([data-selected=true])>*):is(svg){color:var(--foreground)}:is(.tw\\:\\*\\:\\[svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-4>*):is(svg:not([class*=size-])){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:rounded-s-none>:not(:first-child){border-start-start-radius:0;border-end-start-radius:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:rounded-t-none>:not(:first-child){border-top-left-radius:0;border-top-right-radius:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:border-s-0>:not(:first-child){border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:border-t-0>:not(:first-child){border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:last-child\\)\\]\\:rounded-e-none>:not(:last-child){border-start-end-radius:0;border-end-end-radius:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:last-child\\)\\]\\:rounded-b-none>:not(:last-child){border-bottom-right-radius:0;border-bottom-left-radius:0}.tw\\:has-\\[select\\[aria-hidden\\=true\\]\\:last-child\\]\\:\\[\\&\\>\\[data-slot\\=select-trigger\\]\\:last-of-type\\]\\:rounded-e-lg:has(:is(select[aria-hidden=true]:last-child))>[data-slot=select-trigger]:last-of-type{border-start-end-radius:var(--radius);border-end-end-radius:var(--radius)}.tw\\:\\[\\&\\>\\[data-slot\\=select-trigger\\]\\:not\\(\\[class\\*\\=w-\\]\\)\\]\\:w-fit>[data-slot=select-trigger]:not([class*=w-]){width:fit-content}.tw\\:\\[\\&\\>\\[data-slot\\]\\:not\\(\\:has\\(\\~\\[data-slot\\]\\)\\)\\]\\:rounded-e-lg\\!>[data-slot]:not(:has(~[data-slot])){border-start-end-radius:var(--radius)!important;border-end-end-radius:var(--radius)!important}.tw\\:\\[\\&\\>\\[data-slot\\]\\:not\\(\\:has\\(\\~\\[data-slot\\]\\)\\)\\]\\:rounded-b-lg\\!>[data-slot]:not(:has(~[data-slot])){border-bottom-right-radius:var(--radius)!important;border-bottom-left-radius:var(--radius)!important}.tw\\:\\[\\&\\>a\\]\\:underline>a{text-decoration-line:underline}.tw\\:\\[\\&\\>a\\]\\:underline-offset-4>a{text-underline-offset:4px}.tw\\:\\[\\&\\>a\\:hover\\]\\:text-primary>a:hover{color:var(--primary)}.tw\\:\\[\\&\\>blockquote\\]\\:my-0>blockquote{margin-block:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&\\>blockquote\\]\\:border-s-0>blockquote{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&\\>blockquote\\]\\:p-0>blockquote{padding:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&\\>blockquote\\]\\:ps-0>blockquote{padding-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&\\>blockquote\\]\\:font-normal>blockquote{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:\\[\\&\\>blockquote\\]\\:text-foreground>blockquote{color:var(--foreground)}.tw\\:\\[\\&\\>blockquote\\]\\:not-italic>blockquote{font-style:normal}.tw\\:\\[\\&\\>input\\]\\:flex-1>input{flex:1}.tw\\:has-\\[\\>\\[data-align\\=block-end\\]\\]\\:\\[\\&\\>input\\]\\:pt-3:has(>[data-align=block-end])>input{padding-top:calc(calc(var(--spacing)) * 3)}.tw\\:has-\\[\\>\\[data-align\\=block-start\\]\\]\\:\\[\\&\\>input\\]\\:pb-3:has(>[data-align=block-start])>input{padding-bottom:calc(calc(var(--spacing)) * 3)}.tw\\:has-\\[\\>\\[data-align\\=inline-end\\]\\]\\:\\[\\&\\>input\\]\\:pe-1\\.5:has(>[data-align=inline-end])>input{padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-\\[\\>\\[data-align\\=inline-start\\]\\]\\:\\[\\&\\>input\\]\\:ps-1\\.5:has(>[data-align=inline-start])>input{padding-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:\\[\\&\\>kbd\\]\\:rounded-\\[calc\\(var\\(--radius\\)-5px\\)\\]>kbd{border-radius:calc(var(--radius) - 5px)}.tw\\:\\[\\&\\>li\\]\\:mt-2>li{margin-top:calc(calc(var(--spacing)) * 2)}.tw\\:\\[\\&\\>span\\:last-child\\]\\:truncate>span:last-child{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.tw\\:\\[\\&\\>svg\\]\\:pointer-events-none>svg{pointer-events:none}.tw\\:\\[\\&\\>svg\\]\\:hidden>svg{display:none}.tw\\:\\[\\&\\>svg\\]\\:size-3\\!>svg{width:calc(calc(var(--spacing)) * 3)!important;height:calc(calc(var(--spacing)) * 3)!important}.tw\\:\\[\\&\\>svg\\]\\:size-3\\.5>svg{width:calc(calc(var(--spacing)) * 3.5);height:calc(calc(var(--spacing)) * 3.5)}.tw\\:\\[\\&\\>svg\\]\\:size-4>svg{width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&\\>svg\\]\\:shrink-0>svg{flex-shrink:0}.tw\\:\\[\\&\\>svg\\]\\:text-sidebar-accent-foreground>svg{color:var(--sidebar-accent-foreground)}.tw\\:group-has-data-\\[size\\=lg\\]\\/avatar-group\\:\\[\\&\\>svg\\]\\:size-5:is(:where(.tw\\:group\\/avatar-group):has([data-size=lg]) *)>svg{width:calc(calc(var(--spacing)) * 5);height:calc(calc(var(--spacing)) * 5)}.tw\\:group-has-data-\\[size\\=sm\\]\\/avatar-group\\:\\[\\&\\>svg\\]\\:size-3:is(:where(.tw\\:group\\/avatar-group):has([data-size=sm]) *)>svg{width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[size\\=default\\]\\/avatar\\:\\[\\&\\>svg\\]\\:size-2:is(:where(.tw\\:group\\/avatar)[data-size=default] *)>svg,.tw\\:group-data-\\[size\\=lg\\]\\/avatar\\:\\[\\&\\>svg\\]\\:size-2:is(:where(.tw\\:group\\/avatar)[data-size=lg] *)>svg{width:calc(calc(var(--spacing)) * 2);height:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[size\\=sm\\]\\/avatar\\:\\[\\&\\>svg\\]\\:hidden:is(:where(.tw\\:group\\/avatar)[data-size=sm] *)>svg,.tw\\:\\[\\&\\>svg\\:last-child\\]\\:hidden>svg:last-child{display:none}.tw\\:\\[\\&\\>svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-3\\.5>svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 3.5);height:calc(calc(var(--spacing)) * 3.5)}.tw\\:\\[\\&\\>svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-4>svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&\\>tr\\]\\:last\\:border-b-0>tr:last-child{border-bottom-style:var(--tw-border-style);border-bottom-width:0}.tw\\:\\[\\&\\[align\\=center\\]\\]\\:text-center[align=center]{text-align:center}.tw\\:\\[\\&\\[align\\=right\\]\\]\\:text-right[align=right]{text-align:right}.tw\\:\\[\\&\\[aria-orientation\\=horizontal\\]\\>div\\]\\:rotate-90[aria-orientation=horizontal]>div{rotate:90deg}[data-side=primary][data-collapsible=offcanvas] .tw\\:\\[\\[data-side\\=primary\\]\\[data-collapsible\\=offcanvas\\]_\\&\\]\\:-end-2{inset-inline-end:calc(calc(var(--spacing)) * -2)}[data-side=primary][data-state=collapsed] .tw\\:\\[\\[data-side\\=primary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-e-resize{cursor:e-resize}[data-side=primary][data-state=collapsed] .tw\\:rtl\\:\\[\\[data-side\\=primary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-w-resize:where(:dir(rtl),[dir=rtl],[dir=rtl] *){cursor:w-resize}[data-side=secondary][data-collapsible=offcanvas] .tw\\:\\[\\[data-side\\=secondary\\]\\[data-collapsible\\=offcanvas\\]_\\&\\]\\:-start-2{inset-inline-start:calc(calc(var(--spacing)) * -2)}[data-side=secondary][data-state=collapsed] .tw\\:\\[\\[data-side\\=secondary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-w-resize{cursor:w-resize}[data-side=secondary][data-state=collapsed] .tw\\:rtl\\:\\[\\[data-side\\=secondary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-e-resize:where(:dir(rtl),[dir=rtl],[dir=rtl] *){cursor:e-resize}}@property --tw-animation-delay{syntax:"*";inherits:false;initial-value:0s}@property --tw-animation-direction{syntax:"*";inherits:false;initial-value:normal}@property --tw-animation-duration{syntax:"*";inherits:false}@property --tw-animation-fill-mode{syntax:"*";inherits:false;initial-value:none}@property --tw-animation-iteration-count{syntax:"*";inherits:false;initial-value:1}@property --tw-enter-blur{syntax:"*";inherits:false;initial-value:0}@property --tw-enter-opacity{syntax:"*";inherits:false;initial-value:1}@property --tw-enter-rotate{syntax:"*";inherits:false;initial-value:0}@property --tw-enter-scale{syntax:"*";inherits:false;initial-value:1}@property --tw-enter-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-enter-translate-y{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-blur{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-opacity{syntax:"*";inherits:false;initial-value:1}@property --tw-exit-rotate{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-scale{syntax:"*";inherits:false;initial-value:1}@property --tw-exit-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-translate-y{syntax:"*";inherits:false;initial-value:0}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-cyrillic-ext-wght-normal.woff2)format("woff2-variations");unicode-range:U+460-52F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-cyrillic-wght-normal.woff2)format("woff2-variations");unicode-range:U+301,U+400-45F,U+490-491,U+4B0-4B1,U+2116}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-greek-wght-normal.woff2)format("woff2-variations");unicode-range:U+370-377,U+37A-37F,U+384-38A,U+38C,U+38E-3A1,U+3A3-3FF}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-vietnamese-wght-normal.woff2)format("woff2-variations");unicode-range:U+102-103,U+110-111,U+128-129,U+168-169,U+1A0-1A1,U+1AF-1B0,U+300-301,U+303-304,U+308-309,U+323,U+329,U+1EA0-1EF9,U+20AB}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-latin-ext-wght-normal.woff2)format("woff2-variations");unicode-range:U+100-2BA,U+2BD-2C5,U+2C7-2CC,U+2CE-2D7,U+2DD-2FF,U+304,U+308,U+329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-latin-wght-normal.woff2)format("woff2-variations");unicode-range:U+??,U+131,U+152-153,U+2BB-2BC,U+2C6,U+2DA,U+2DC,U+304,U+308,U+329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}.light,:root{--radius:.625rem;--spacing:.25rem;--background:oklch(100% 0 0);--foreground:oklch(13.71% .036 258.53);--card:oklch(100% 0 0);--card-foreground:oklch(13.71% .036 258.53);--popover:oklch(98.43% .0018 248.56);--popover-foreground:oklch(13.71% .036 258.53);--primary:oklch(20.79% .0399 265.73);--primary-foreground:oklch(98.38% .0036 248.23);--secondary:oklch(95.89% .011 248.06);--secondary-foreground:oklch(20.79% .0399 265.73);--muted:oklch(95.89% .011 248.06);--muted-foreground:oklch(55.47% .0408 257.45);--accent:oklch(95.89% .011 248.06);--accent-foreground:oklch(20.79% .0399 265.73);--destructive:oklch(63.69% .2077 25.32);--destructive-foreground:oklch(98.38% .0036 248.23);--success-foreground:oklch(62.7% .194 149.214);--diff-deleted:oklch(57.7% .245 27.325);--warning:oklch(84% .16 84);--warning-foreground:oklch(28% .07 46);--border:oklch(92.9% .0127 255.58);--input:oklch(92.9% .0127 255.58);--ring:oklch(13.71% .036 258.53);--chart-1:oklch(64.6% .222 41.116);--chart-2:oklch(60% .118 184.704);--chart-3:oklch(39.8% .07 227.392);--chart-4:oklch(82.8% .189 84.429);--chart-5:oklch(76.9% .188 70.08);--sidebar:oklch(98.43% .0018 248.56);--sidebar-foreground:oklch(13.71% .036 258.53);--sidebar-primary:oklch(20.79% .0399 265.73);--sidebar-primary-foreground:oklch(98.38% .0036 248.23);--sidebar-accent:oklch(95.89% .011 248.06);--sidebar-accent-foreground:oklch(20.79% .0399 265.73);--sidebar-border:oklch(92.9% .0127 255.58);--sidebar-ring:oklch(13.71% .036 258.53)}.dark{--background:oklch(13.71% .036 258.53);--foreground:oklch(98.38% .0036 248.23);--card:oklch(13.71% .036 258.53);--card-foreground:oklch(98.38% .0036 248.23);--popover:oklch(13.71% .036 258.53);--popover-foreground:oklch(98.38% .0036 248.23);--primary:oklch(98.38% .0036 248.23);--primary-foreground:oklch(20.79% .0399 265.73);--secondary:oklch(28% .037 259.98);--secondary-foreground:oklch(98.38% .0036 248.23);--muted:oklch(28% .037 259.98);--muted-foreground:oklch(71.07% .0351 256.8);--accent:oklch(28% .037 259.98);--accent-foreground:oklch(98.38% .0036 248.23);--destructive:oklch(39.6% .1331 25.71);--destructive-foreground:oklch(98.38% .0036 248.23);--success-foreground:oklch(79.2% .209 151.711);--diff-deleted:oklch(70.4% .191 22.216);--warning:oklch(41% .11 46);--warning-foreground:oklch(99% .02 95);--border:oklch(44.54% .0374 257.3);--input:oklch(44.54% .0374 257.3);--ring:oklch(86.88% .0199 252.89);--chart-1:oklch(48.8% .243 264.376);--chart-2:oklch(69.6% .17 162.48);--chart-3:oklch(76.9% .188 70.08);--chart-4:oklch(62.7% .265 303.9);--chart-5:oklch(64.5% .246 16.439);--sidebar:oklch(13.71% .036 258.53);--sidebar-foreground:oklch(71.07% .0351 256.8);--sidebar-primary:oklch(98.38% .0036 248.23);--sidebar-primary-foreground:oklch(20.79% .0399 265.73);--sidebar-accent:oklch(28% .037 259.98);--sidebar-accent-foreground:oklch(71.07% .0351 256.8);--sidebar-border:oklch(28% .037 259.98);--sidebar-ring:oklch(86.88% .0199 252.89)}.paratext-light{--background:oklch(100% 0 0);--foreground:oklch(15.3% .006 107.1);--card:oklch(100% 0 0);--card-foreground:oklch(15.3% .006 107.1);--popover:oklch(100% 0 0);--popover-foreground:oklch(15.3% .006 107.1);--primary:oklch(55.5% .163 48.998);--primary-foreground:oklch(98.7% .022 95.277);--secondary:oklch(96.7% .001 286.375);--secondary-foreground:oklch(21% .006 285.885);--muted:oklch(96.6% .005 106.5);--muted-foreground:oklch(58% .031 107.3);--accent:oklch(96.6% .005 106.5);--accent-foreground:oklch(22.8% .013 107.4);--destructive:oklch(57.7% .245 27.325);--destructive-foreground:oklch(98.38% .0036 248.23);--success-foreground:oklch(62.7% .194 149.214);--diff-deleted:oklch(57.7% .245 27.325);--warning:oklch(84% .16 84);--warning-foreground:oklch(28% .07 46);--border:oklch(93% .007 106.5);--input:oklch(93% .007 106.5);--ring:oklch(73.7% .021 106.9);--chart-1:oklch(88% .011 106.6);--chart-2:oklch(58% .031 107.3);--chart-3:oklch(46.6% .025 107.3);--chart-4:oklch(39.4% .023 107.4);--chart-5:oklch(28.6% .016 107.4);--sidebar:oklch(98.8% .003 106.5);--sidebar-foreground:oklch(15.3% .006 107.1);--sidebar-primary:oklch(66.6% .179 58.318);--sidebar-primary-foreground:oklch(98.7% .022 95.277);--sidebar-accent:oklch(96.6% .005 106.5);--sidebar-accent-foreground:oklch(22.8% .013 107.4);--sidebar-border:oklch(93% .007 106.5);--sidebar-ring:oklch(73.7% .021 106.9)}.paratext-dark{--background:oklch(15.3% .006 107.1);--foreground:oklch(98.8% .003 106.5);--card:oklch(22.8% .013 107.4);--card-foreground:oklch(98.8% .003 106.5);--popover:oklch(22.8% .013 107.4);--popover-foreground:oklch(98.8% .003 106.5);--primary:oklch(47.3% .137 46.201);--primary-foreground:oklch(98.7% .022 95.277);--secondary:oklch(27.4% .006 286.033);--secondary-foreground:oklch(98.5% 0 0);--muted:oklch(28.6% .016 107.4);--muted-foreground:oklch(73.7% .021 106.9);--accent:oklch(28.6% .016 107.4);--accent-foreground:oklch(98.8% .003 106.5);--destructive:oklch(70.4% .191 22.216);--destructive-foreground:oklch(98.38% .0036 248.23);--success-foreground:oklch(79.2% .209 151.711);--diff-deleted:oklch(70.4% .191 22.216);--warning:oklch(41% .11 46);--warning-foreground:oklch(99% .02 95);--border:oklch(100% 0 0/.1);--input:oklch(100% 0 0/.15);--ring:oklch(58% .031 107.3);--chart-1:oklch(88% .011 106.6);--chart-2:oklch(58% .031 107.3);--chart-3:oklch(46.6% .025 107.3);--chart-4:oklch(39.4% .023 107.4);--chart-5:oklch(28.6% .016 107.4);--sidebar:oklch(22.8% .013 107.4);--sidebar-foreground:oklch(98.8% .003 106.5);--sidebar-primary:oklch(76.9% .188 70.08);--sidebar-primary-foreground:oklch(27.9% .077 45.635);--sidebar-accent:oklch(28.6% .016 107.4);--sidebar-accent-foreground:oklch(98.8% .003 106.5);--sidebar-border:oklch(100% 0 0/.1);--sidebar-ring:oklch(58% .031 107.3)}@property --tw-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-y{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-z{syntax:"*";inherits:false;initial-value:0}@property --tw-rotate-x{syntax:"*";inherits:false}@property --tw-rotate-y{syntax:"*";inherits:false}@property --tw-rotate-z{syntax:"*";inherits:false}@property --tw-skew-x{syntax:"*";inherits:false}@property --tw-skew-y{syntax:"*";inherits:false}@property --tw-space-y-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-space-x-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-divide-x-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-border-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-divide-y-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-leading{syntax:"*";inherits:false}@property --tw-font-weight{syntax:"*";inherits:false}@property --tw-tracking{syntax:"*";inherits:false}@property --tw-ordinal{syntax:"*";inherits:false}@property --tw-slashed-zero{syntax:"*";inherits:false}@property --tw-numeric-figure{syntax:"*";inherits:false}@property --tw-numeric-spacing{syntax:"*";inherits:false}@property --tw-numeric-fraction{syntax:"*";inherits:false}@property --tw-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-shadow-color{syntax:"*";inherits:false}@property --tw-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-inset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-shadow-color{syntax:"*";inherits:false}@property --tw-inset-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-ring-color{syntax:"*";inherits:false}@property --tw-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-ring-color{syntax:"*";inherits:false}@property --tw-inset-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-ring-inset{syntax:"*";inherits:false}@property --tw-ring-offset-width{syntax:"<length>";inherits:false;initial-value:0}@property --tw-ring-offset-color{syntax:"*";inherits:false;initial-value:#fff}@property --tw-ring-offset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-blur{syntax:"*";inherits:false}@property --tw-brightness{syntax:"*";inherits:false}@property --tw-contrast{syntax:"*";inherits:false}@property --tw-grayscale{syntax:"*";inherits:false}@property --tw-hue-rotate{syntax:"*";inherits:false}@property --tw-invert{syntax:"*";inherits:false}@property --tw-opacity{syntax:"*";inherits:false}@property --tw-saturate{syntax:"*";inherits:false}@property --tw-sepia{syntax:"*";inherits:false}@property --tw-drop-shadow{syntax:"*";inherits:false}@property --tw-drop-shadow-color{syntax:"*";inherits:false}@property --tw-drop-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-drop-shadow-size{syntax:"*";inherits:false}@property --tw-duration{syntax:"*";inherits:false}@property --tw-ease{syntax:"*";inherits:false}@property --tw-content{syntax:"*";inherits:false;initial-value:""}@property --tw-backdrop-blur{syntax:"*";inherits:false}@property --tw-backdrop-brightness{syntax:"*";inherits:false}@property --tw-backdrop-contrast{syntax:"*";inherits:false}@property --tw-backdrop-grayscale{syntax:"*";inherits:false}@property --tw-backdrop-hue-rotate{syntax:"*";inherits:false}@property --tw-backdrop-invert{syntax:"*";inherits:false}@property --tw-backdrop-opacity{syntax:"*";inherits:false}@property --tw-backdrop-saturate{syntax:"*";inherits:false}@property --tw-backdrop-sepia{syntax:"*";inherits:false}@property --tw-outline-style{syntax:"*";inherits:false;initial-value:solid}@keyframes spin{to{transform:rotate(360deg)}}@keyframes pulse{50%{opacity:.5}}@keyframes enter{0%{opacity:var(--tw-enter-opacity,1);transform:translate3d(var(--tw-enter-translate-x,0),var(--tw-enter-translate-y,0),0)scale3d(var(--tw-enter-scale,1),var(--tw-enter-scale,1),var(--tw-enter-scale,1))rotate(var(--tw-enter-rotate,0));filter:blur(var(--tw-enter-blur,0))}}@keyframes exit{to{opacity:var(--tw-exit-opacity,1);transform:translate3d(var(--tw-exit-translate-x,0),var(--tw-exit-translate-y,0),0)scale3d(var(--tw-exit-scale,1),var(--tw-exit-scale,1),var(--tw-exit-scale,1))rotate(var(--tw-exit-rotate,0));filter:blur(var(--tw-exit-blur,0))}}
`, "after-all");
export {
  hf as Alert,
  gf as AlertDescription,
  ff as AlertTitle,
  Hw as Avatar,
  qw as AvatarFallback,
  _h as AvatarImage,
  wh as BOOK_CHAPTER_CONTROL_STRING_KEYS,
  uh as BOOK_SELECTOR_STRING_KEYS,
  Fr as Badge,
  Xa as BookChapterControl,
  ko as BookSelectionMode,
  ph as BookSelector,
  et as Button,
  Oa as ButtonGroup,
  So as ButtonGroupSeparator,
  mf as ButtonGroupText,
  ts as CANCEL_ACCEPT_BUTTONS_STRING_KEYS,
  fh as COMMENT_EDITOR_STRING_KEYS,
  Fw as COMMENT_LIST_ELEMENT_ID,
  mh as COMMENT_LIST_STRING_KEYS,
  hh as CONFLICT_NOTE_STRING_KEYS,
  es as CancelAcceptButtons,
  Uw as Card,
  Kw as CardContent,
  yh as CardDescription,
  kh as CardFooter,
  bh as CardHeader,
  xh as CardTitle,
  _d as ChapterRangeSelector,
  ss as Checkbox,
  xg as CheckboxGroup,
  Dp as Checklist,
  _n as ComboBox,
  wr as Command,
  Ia as CommandEmpty,
  Je as CommandGroup,
  Ma as CommandInput,
  tr as CommandItem,
  ur as CommandList,
  gh as CommentEditor,
  Nh as CommentList,
  Xw as ConflictNoteCard,
  Cg as ContextMenu,
  Pg as ContextMenuCheckboxItem,
  Mg as ContextMenuContent,
  Tg as ContextMenuGroup,
  Og as ContextMenuItem,
  $g as ContextMenuLabel,
  Sg as ContextMenuPortal,
  Dg as ContextMenuRadioGroup,
  Ag as ContextMenuRadioItem,
  Vg as ContextMenuSeparator,
  Lg as ContextMenuShortcut,
  Rg as ContextMenuSub,
  zg as ContextMenuSubContent,
  Ig as ContextMenuSubTrigger,
  Eg as ContextMenuTrigger,
  su as DataTable,
  yg as DestructiveKeyConfirmation,
  so as Dialog,
  vf as DialogClose,
  co as DialogContent,
  bf as DialogDescription,
  rn as DialogFooter,
  lo as DialogHeader,
  xf as DialogOverlay,
  yf as DialogPortal,
  wo as DialogTitle,
  kf as DialogTrigger,
  op as DisabledActionTooltip,
  qr as DisabledTooltipWrapper,
  Bg as Drawer,
  Fg as DrawerClose,
  Ug as DrawerContent,
  Gg as DrawerDescription,
  Hg as DrawerFooter,
  Kg as DrawerHeader,
  Ip as DrawerOverlay,
  Op as DrawerPortal,
  qg as DrawerTitle,
  jg as DrawerTrigger,
  Be as DropdownMenu,
  Xe as DropdownMenuCheckboxItem,
  je as DropdownMenuContent,
  Wn as DropdownMenuGroup,
  Ge as DropdownMenuItem,
  du as DropdownMenuItemType,
  cr as DropdownMenuLabel,
  Fs as DropdownMenuPortal,
  Ss as DropdownMenuRadioGroup,
  Rs as DropdownMenuRadioItem,
  ir as DropdownMenuSeparator,
  Ls as DropdownMenuShortcut,
  Bs as DropdownMenuSub,
  Us as DropdownMenuSubContent,
  js as DropdownMenuSubTrigger,
  Ee as DropdownMenuTrigger,
  cu as ERROR_DUMP_STRING_KEYS,
  Sh as ERROR_POPOVER_STRING_KEYS,
  hu as EditorKeyboardShortcuts,
  _f as Empty,
  Nf as EmptyContent,
  Cf as EmptyDescription,
  Ef as EmptyHeader,
  Tf as EmptyMedia,
  Sf as EmptyState,
  Rf as EmptyTitle,
  lu as ErrorDump,
  Rh as ErrorPopover,
  Ph as FOOTNOTE_EDITOR_STRING_KEYS,
  Ih as Filter,
  Dh as FilterDropdown,
  Oh as Footer,
  zh as FootnoteEditor,
  Mu as FootnoteItem,
  Ah as FootnoteList,
  vg as INTERFACE_LANGUAGE_PICKER_STRING_KEYS,
  Uh as INVENTORY_STRING_KEYS,
  za as Input,
  bg as InterfaceLanguagePicker,
  Kh as Inventory,
  uo as Kbd,
  Df as KbdGroup,
  $t as Label,
  xu as MARKER_MENU_STRING_KEYS,
  Th as MarkdownRenderer,
  _u as MarkerMenu,
  Mh as MoreInfo,
  Ds as MultiSelectComboBox,
  hg as NavigationContentSearch,
  lr as Popover,
  Ps as PopoverAnchor,
  dr as PopoverContent,
  Mf as PopoverDescription,
  Of as PopoverHeader,
  Ha as PopoverPortalContainerProvider,
  If as PopoverTitle,
  Dr as PopoverTrigger,
  Wg as Progress,
  Ro as RadioGroup,
  ya as RadioGroupItem,
  wd as RecentSearches,
  zf as ResizableHandle,
  Pf as ResizablePanel,
  Af as ResizablePanelGroup,
  kg as ResultsCard,
  $f as RetryableErrorView,
  ig as SCOPE_SELECTOR_STRING_KEYS,
  sp as SELECT_BOOKS_STRING_KEYS,
  Br as SHRINK_STEP,
  sg as ScopeSelector,
  ng as ScriptureResultsViewer,
  cg as ScrollGroupSelector,
  Jn as SearchBar,
  Er as Select,
  ip as SelectBooks,
  ap as SelectBooksPicker,
  Rr as SelectContent,
  au as SelectGroup,
  xe as SelectItem,
  Ch as SelectLabel,
  nu as SelectScrollDownButton,
  ou as SelectScrollUpButton,
  Eh as SelectSeparator,
  Sr as SelectTrigger,
  Tr as SelectValue,
  Ur as Separator,
  lg as SettingsList,
  wg as SettingsListHeader,
  dg as SettingsListItem,
  Yu as SettingsSidebar,
  og as SettingsSidebarContentSearch,
  $a as ShrinkStepContext,
  df as ShrinkStepOverride,
  Di as ShrinkStepOverrideContext,
  Fu as Sidebar,
  Ku as SidebarContent,
  Yh as SidebarFooter,
  Bn as SidebarGroup,
  Jh as SidebarGroupAction,
  Fn as SidebarGroupContent,
  jn as SidebarGroupLabel,
  Wh as SidebarHeader,
  Gh as SidebarInput,
  Uu as SidebarInset,
  Hu as SidebarMenu,
  Zh as SidebarMenuAction,
  Qh as SidebarMenuBadge,
  Wu as SidebarMenuButton,
  qu as SidebarMenuItem,
  tg as SidebarMenuSkeleton,
  eg as SidebarMenuSub,
  ag as SidebarMenuSubButton,
  rg as SidebarMenuSubItem,
  ju as SidebarProvider,
  qh as SidebarRail,
  Xh as SidebarSeparator,
  Hh as SidebarTrigger,
  yr as Skeleton,
  Xg as Slider,
  Yg as Sonner,
  Vf as Spinner,
  Jg as Switch,
  wf as TOOLTIP_DELAY_MS,
  Eo as TabDropdownMenu,
  pg as TabFloatingMenu,
  ug as TabToolbar,
  Mo as Table,
  Io as TableBody,
  Lf as TableCaption,
  kr as TableCell,
  Bf as TableFooter,
  ka as TableHead,
  Oo as TableHeader,
  We as TableRow,
  Zg as Tabs,
  ef as TabsContent,
  Qg as TabsList,
  tf as TabsTrigger,
  _g as TextField,
  lh as Textarea,
  Gn as ToggleGroup,
  wa as ToggleGroupItem,
  fg as Toolbar,
  sd as ToolbarCompoundLabel,
  bt as Tooltip,
  yt as TooltipContent,
  Vt as TooltipProvider,
  xt as TooltipTrigger,
  uu as UNDO_REDO_BUTTONS_STRING_KEYS,
  mg as UiLanguageSelector,
  pu as UndoRedoButtons,
  fs as VerticalTabs,
  vs as VerticalTabsContent,
  ms as VerticalTabsList,
  pp as VerticalTabsTrigger,
  Ng as WizardStepper,
  Fe as Z_INDEX_ABOVE_DOCK,
  Yn as Z_INDEX_ABOVE_POPOVER,
  jf as Z_INDEX_CONNECTION_LOST,
  Ff as Z_INDEX_FIRST_RUN,
  Uf as Z_INDEX_MODAL,
  Kf as Z_INDEX_MODAL_BACKDROP,
  Hf as Z_INDEX_ONBOARDING_TOUR,
  qf as Z_INDEX_OVERLAY,
  Gf as badgeVariants,
  Wf as buttonGroupVariants,
  Yf as buttonVariants,
  b as cn,
  Fh as getBookIdFromUSFM,
  vh as getCommentThreadElementId,
  La as getInventoryHeader,
  Bh as getLinesFromUSFM,
  jh as getNumberFromUSFM,
  Au as getStatusForItem,
  gg as getToolbarOSReservedSpaceClassName,
  Vh as inventoryCountColumn,
  $h as inventoryItemColumn,
  Lh as inventoryStatusColumn,
  Do as isMacOs,
  Xf as isWindows,
  Cu as markerMenuItemToPaletteItem,
  Vp as pickTabIconUrl,
  Zf as sonner,
  rf as useEvent,
  af as useEventAsync,
  sf as useExtraValidMarkers,
  Ts as useListbox,
  Ap as usePromise,
  dh as useRecentSearches,
  of as useRetryablePromise,
  cf as useRunWhenVisible,
  hs as useShrinkStep,
  Mi as useShrinkStepOverride,
  nd as useShrinkStepValue,
  Ba as useSidebar,
  nf as useStylesheet,
  lf as useTabIconSelection,
  tn as useTruncationTooltip,
  $p as useViewVisibility
};
//# sourceMappingURL=index.js.map
