var Ls = Object.defineProperty;
var Bs = (t, e, r) => e in t ? Ls(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var se = (t, e, r) => Bs(t, typeof e != "symbol" ? e + "" : e, r);
import { c as x, g as Ze, a as Xr, C as gr, L as Qn, t as js, u as on, T as Vt, b as vt, d as bt, e as xt, f as ti, A as Ea, r as pe, D as tr, h as Ke, i as er, j as kr, k as cr, B as rt, x as Fs, l as Us, m as Ks, I as Hs, n as So, o as ur, p as $e, q as qs, s as ei, P as _r, v as jr, w as Nr, y as Cr, z as $a, E as Va, F as Oo, G as Er, H as La, J as $t, R as Do, K as Ta, M as wo, N as uo, O as po, Q as ho, S as Io, U as ea, V as ra, W as Ir, X as Gs, Y as br, Z as wr, _ as rr, $ as lr, a0 as Mr, a1 as Mo, a2 as zo, a3 as Ra, a4 as Po, a5 as ri, a6 as Ws, a7 as Ys, a8 as Zs, a9 as go, aa as ai, ab as Ba, ac as Xs, ad as oi, ae as Js, af as Qs, ag as tc, ah as ec, ai as nn, aj as sn, ak as rc, al as ac, am as oc, an as nc, ao as ic, ap as ni, aq as ii, ar as Ao, as as sc, at as si, au as Ga, av as cn, aw as Wa, ax as cc, ay as lc, az as dc, aA as wc, aB as uc, aC as pc, aD as hc, aE as gc, aF as fc, aG as $o, aH as Vo, aI as mc, aJ as vc } from "./resizable-DclAbLsc.js";
import { aK as am, aL as om, aM as nm, aN as im, aO as sm, aP as cm, aQ as lm, aR as dm, aS as wm, aT as um, aU as pm, aV as hm, aW as gm, aX as fm, aY as mm, aZ as vm, a_ as bm, a$ as xm, b0 as ym, b1 as km, b2 as _m, b3 as Nm, b4 as Cm, b5 as Em, b6 as Tm, b7 as Rm, b8 as Sm, b9 as Om, ba as Dm, bb as Im, bc as Mm, bd as zm, be as Pm, bf as Am, bg as $m, bh as Vm, bi as Lm, bj as Bm, bk as jm, bl as Fm, bm as Um } from "./resizable-DclAbLsc.js";
import { jsx as a, jsxs as u, Fragment as mt } from "react/jsx-runtime";
import { Canon as Yt } from "@sillsdev/scripture";
import { Check as pr, Clock as ln, ChevronsLeft as dn, ChevronsRight as wn, ChevronUp as ci, ChevronDown as xr, ArrowLeft as bc, ArrowRight as xc, BoldIcon as yc, ItalicIcon as kc, X as li, AtSign as di, Pencil as _c, Trash2 as Nc, Undo2 as Cc, ArrowUp as wi, MoreHorizontal as Ec, MailOpen as Tc, Mail as Rc, FilterIcon as Sc, ArrowLeftIcon as Oc, ChevronLeftIcon as Dc, ChevronRightIcon as Ic, ArrowRightIcon as Mc, Copy as ui, Filter as zc, User as Pc, Link as Ac, CircleHelp as $c, Undo as Vc, Redo as Lc, SquareX as pi, FunctionSquare as hi, SquareSigma as gi, Ban as Bc, AlertCircle as jc, CircleCheckIcon as Fc, CircleXIcon as Uc, CircleHelpIcon as Kc, ArrowUpIcon as Hc, ArrowDownIcon as qc, ScrollText as Gc, ChevronRight as Wc, ChevronLeft as Yc, ChevronsUpDown as Zc, MenuIcon as Xc, Menu as Jc, EllipsisVertical as Qc, MoreVertical as tl } from "lucide-react";
import { Section as At, compareScrRefs as Sa, getChaptersForBook as el, formatScrRef as Xe, formatReplacementString as dr, getSectionForBook as va, formatRelativeDate as rl, sanitizeHtml as Lo, NumberFormat as fi, formatBytes as al, getCurrentLocale as ol, usfmMarkers as Wr, deepEqual as ir, isPlatformError as nl, ABORTED as il, getErrorMessage as sl, getFormatCallerFunction as cl, isString as un, scrRefToBBBCCCVVV as Ya, defaultScrRef as Za, formatScrRefRange as ll, getLocalizeKeyForScrollGroupId as pn, formatReplacementStringToArray as hn, collectUsjMarkers as dl } from "platform-bible-utils";
import Zt, { useRef as I, useMemo as B, createContext as Fr, useContext as ia, useEffect as q, useState as E, useCallback as L, useId as Oa, useImperativeHandle as mi, useLayoutEffect as Kt, Fragment as yr, Component as wl, createElement as fo, Suspense as ul, forwardRef as Bo, memo as vi } from "react";
import { IconSelector as bi, IconCheck as ja, IconChevronDown as pl, IconChevronUp as hl, IconLayoutSidebar as gl, IconLayoutSidebarRight as fl, IconChevronRight as xi, IconSearch as ml, IconLoader as vl, IconAlertOctagon as bl, IconAlertTriangle as xl, IconInfoCircle as yl, IconCircleCheck as kl } from "@tabler/icons-react";
import { createEditor as yi, $getRoot as hr, $createParagraphNode as sa, $getSelection as he, HISTORY_MERGE_TAG as jo, ParagraphNode as ki, TextNode as _i, $getPreviousSelection as _l, $isRangeSelection as He, $caretFromPoint as Nl, $getSiblingCaret as Ni, $getChildCaret as Cl, $getAdjacentChildCaret as El, $isChildCaret as Tl, $normalizeCaret as Rl, $setSelectionFromCaretRange as Sl, $getCollapsedCaretRange as Ol, $getCaretInDirection as gn, $splitAtPointCaretNext as Dl, $isTextPointCaret as Il, $findMatchingParent as Ci, $isElementNode as aa, mergeRegister as Qe, getDOMTextNode as Ml, isHTMLElement as zl, CLEAR_EDITOR_COMMAND as Ei, COMMAND_PRIORITY_EDITOR as Fo, shallowMergeConfig as Pl, defineExtension as De, safeCast as Tr, createState as Al, FORMAT_TEXT_COMMAND as Ti, $isNodeSelection as Ri, COMMAND_PRIORITY_LOW as Si, RootNode as $l, LineBreakNode as Vl, TabNode as Ll, $isEditorState as Bl, createCommand as jl, CLICK_COMMAND as Fl, isDOMNode as Ul, $getNodeFromDOMNode as Kl, $createNodeSelection as Hl, $setSelection as ql, $getEditor as Gl, DecoratorNode as mo, $getState as Wl, toggleTextFormatType as fn, TEXT_TYPE_TO_FORMAT as Yl, $setState as Zl, addClassNamesToElement as Oi, $create as Xl, $getNodeByKey as Jl, removeClassNamesFromElement as Ql, KEY_TAB_COMMAND as td, $isBlockElementNode as ed, $createRangeSelection as rd, $normalizeSelection__EXPERIMENTAL as ad, OUTDENT_CONTENT_COMMAND as od, INDENT_CONTENT_COMMAND as mn, INSERT_TAB_COMMAND as nd, COMMAND_PRIORITY_CRITICAL as Uo, $isDecoratorNode as id, $isParagraphNode as sd, $isTextNode as vo, SELECTION_CHANGE_COMMAND as Di, $insertNodes as cd } from "lexical";
import { HeadingNode as ld, QuoteNode as dd, registerRichText as wd } from "@lexical/rich-text";
import { flushSync as ud, createPortal as pd } from "react-dom";
import { $isTableSelection as hd } from "@lexical/table";
import { ToggleGroup as Ii, Avatar as Ko, Select as le, Checkbox as vn, Slot as ca, Tabs as Ve, Menubar as Ge, ContextMenu as Xt, Progress as bn, Slider as wa, Switch as xn } from "radix-ui";
import { cva as Ho } from "class-variance-authority";
import { createHeadlessEditor as Mi } from "@lexical/headless";
import { $generateHtmlFromNodes as gd, $generateNodesFromDOM as fd } from "@lexical/html";
import { useReactTable as zi, getFilteredRowModel as md, getSortedRowModel as Pi, getPaginationRowModel as vd, getCoreRowModel as Ai, flexRender as Jr, getGroupedRowModel as bd, getExpandedRowModel as xd } from "@tanstack/react-table";
import yd from "markdown-to-jsx";
import { GENERATOR_NOTE_CALLER as bo, HIDDEN_NOTE_CALLER as xo, isInsertEmbedOpOfType as Or, getDefaultViewOptions as kd, getMarkerMenuItems as _d, defaultStyleInfo as Nd, Editorial as Cd } from "@eten-tech-foundation/platform-editor";
import { useHotkeys as Ed } from "react-hotkeys-hook";
import { Drawer as fr } from "vaul";
import { useTheme as Td } from "next-themes";
import { Toaster as Rd } from "sonner";
import { toast as Hm } from "sonner";
function Zh({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "textarea",
    {
      "data-slot": "textarea",
      className: x(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:flex tw:field-sizing-content tw:min-h-16 tw:w-full tw:rounded-lg tw:border tw:border-input tw:bg-transparent tw:px-2.5 tw:py-2 tw:text-base tw:transition-colors tw:outline-none tw:placeholder:text-muted-foreground tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:disabled:cursor-not-allowed tw:disabled:bg-input/50 tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:md:text-sm tw:dark:bg-input/30 tw:dark:disabled:bg-input/80 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40",
        t
      ),
      ...e
    }
  );
}
function $i({
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
  suppressKeyboardHighlight: w = !1,
  disabled: p = !1,
  dimmedReason: h,
  dimmedDescription: m
}) {
  const k = I(!1), g = () => {
    p || (k.current || o == null || o(e), setTimeout(() => {
      k.current = !1;
    }, 100));
  }, f = (V) => {
    if (p) {
      V.preventDefault();
      return;
    }
    k.current = !0, n ? n(V) : o == null || o(e);
  }, N = B(
    () => Ze(e, d),
    [e, d]
  ), T = B(
    () => Xr(e, d),
    [e, d]
  ), P = !!h && !p, R = `${N} (${T})`, U = P ? m || `${R}, ${h}` : R, D = /* @__PURE__ */ u(
    gr,
    {
      ref: t,
      value: l || `${e} ${Yt.bookIdToEnglishName(e)}`,
      onSelect: g,
      onMouseDown: f,
      role: "option",
      "aria-selected": r,
      "aria-disabled": p || void 0,
      "aria-label": U,
      disabled: p,
      className: x(
        !w && Qn,
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
        s,
        p && "tw:cursor-not-allowed tw:opacity-50",
        // Mirrors NumberedItemGrid's dimmed-vs-disabled split — same tokens, so chapter/verse cells
        // and book rows grey identically inside one popover: dimmed is presentation only, so it
        // never sets aria-disabled or blocks onSelect, and it yields to disabled. Restated under
        // data-selected so a dimmed row keeps its dimming while the keyboard highlight is on it,
        // rather than losing it to the suppression rule above.
        P && "tw:bg-muted/50 tw:text-muted-foreground/50 tw:data-selected:bg-muted/50 tw:data-selected:text-muted-foreground/50"
      ),
      children: [
        c && /* @__PURE__ */ a(
          pr,
          {
            className: x(
              "tw:me-2 tw:h-4 tw:w-4 tw:shrink-0",
              r ? "tw:opacity-100" : "tw:opacity-0"
            )
          }
        ),
        /* @__PURE__ */ a("span", { className: "tw:min-w-0 tw:flex-1", children: N }),
        P && // Visible rather than hover-only: cmdk never moves DOM focus onto an item (the input keeps
        // it and highlights via data-selected), so a tooltip would never open for a keyboard user.
        // Rendered text also survives the highlight, which recolours the row.
        /* @__PURE__ */ a("span", { className: "tw:ms-2 tw:shrink-0 tw:text-xs tw:italic", children: h }),
        /* @__PURE__ */ a(
          "span",
          {
            className: x(
              "tw:ms-2 tw:shrink-0 tw:text-xs",
              // Inherits the row's dimmed colour instead of setting its own, so the whole row dims
              // evenly rather than leaving the id at full strength beside a dimmed name.
              !P && "tw:text-muted-foreground"
            ),
            children: T
          }
        )
      ]
    }
  );
  return /* @__PURE__ */ a(
    "div",
    {
      className: x(
        "tw:mx-1 tw:my-1 tw:border-b-0 tw:border-e-0 tw:border-s-2 tw:border-t-0 tw:border-solid",
        {
          "tw:border-s-red-200": i === At.OT,
          "tw:border-s-purple-200": i === At.NT,
          "tw:border-s-indigo-200": i === At.DC,
          "tw:border-s-amber-200": i === At.Extra
        }
      ),
      children: D
    }
  );
}
const Sd = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
function Od(t) {
  return Sd.some((e) => e === t);
}
function yn(t) {
  const e = new RegExp("^\\p{L}$", "u").test(t), r = /^[0-9]$/.test(t);
  return { isLetter: e, isDigit: r };
}
const Qr = Object.freeze({
  /** Full labels. */
  WIDE: 0,
  /** Abbreviated primary label form. */
  TIGHT: 1,
  /** Secondary field clipped with an ellipsis — CSS does this on its own. */
  TIGHTER: 2,
  /** Secondary field dropped entirely; primary field alone. */
  MINIMUM: 3
}), Fa = Fr(Qr.WIDE);
function Dd() {
  return ia(Fa);
}
const Vi = Fr(void 0);
function Li() {
  return ia(Vi);
}
function Bi() {
  q(() => {
    js();
  }, []);
}
function Id({
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
    ref: d,
    open: l,
    onPointerEnter: w,
    onPointerLeave: p
  } = on(), {
    ref: h,
    open: m,
    onPointerEnter: k,
    onPointerLeave: g
  } = on(), [f, N] = E(!1), [T, P] = E(!1), R = I(
    // React's ref API requires `null` as the initial value for DOM refs.
    // eslint-disable-next-line no-null/no-null
    null
  ), U = n && e !== void 0, D = i ?? (e !== void 0 && !n);
  Bi(), q(() => {
    var S;
    const et = (S = R.current) == null ? void 0 : S.closest('button, [role="combobox"], [tabindex]');
    if (!et) return;
    const y = (K) => !!K && K.scrollWidth > K.clientWidth, at = () => {
      ti() !== "pointer" && (D || y(h.current) || y(d.current)) && P(!0);
    }, C = () => P(!1);
    return et.addEventListener("focus", at), et.addEventListener("blur", C), () => {
      et.removeEventListener("focus", at), et.removeEventListener("blur", C);
    };
  }, [D, h, d]);
  const V = L(() => {
    D && N(!0), k(), U && w();
  }, [
    D,
    U,
    k,
    w
  ]), $ = L(() => {
    N(!1), P(!1), g(), p();
  }, [g, p]);
  q(() => {
    D || N(!1);
  }, [D]);
  const M = /* @__PURE__ */ a("span", { ref: h, className: "tw:min-w-0 tw:shrink tw:truncate", children: t }, "primary"), A = U ? (
    // Weighted to absorb essentially all of the shrinking, so the primary field only starts losing
    // characters once this one has none left.
    /* @__PURE__ */ a("span", { ref: d, className: "tw:min-w-0 tw:shrink-[9999] tw:truncate", children: e }, "secondary")
  ) : void 0, [Y, J] = o ? [A, M] : [M, A];
  return (
    // Nested TooltipProviders are harmless in Radix, so carrying our own means this works in any
    // host, including toolbars that never set one up.
    /* @__PURE__ */ a(Vt, { children: /* @__PURE__ */ u(
      vt,
      {
        open: m || l || f || T,
        onOpenChange: (et) => {
          et || $();
        },
        children: [
          /* @__PURE__ */ a(bt, { asChild: !0, children: /* @__PURE__ */ u(
            "span",
            {
              ref: R,
              onPointerEnter: V,
              onPointerLeave: $,
              onPointerDown: $,
              className: x("tw:flex tw:min-w-0 tw:items-center", c),
              children: [
                Y,
                Y && J && /* @__PURE__ */ a("span", { className: "tw:shrink-0 tw:whitespace-pre", children: r }, "separator"),
                J
              ]
            }
          ) }),
          /* @__PURE__ */ a(xt, { dir: "auto", children: s })
        ]
      }
    ) })
  );
}
function yo(t, e) {
  return `${t} ${Ea[t]}${e ? ` ${Xr(t, e)} ${Ze(t, e)}` : ""}`;
}
function zr(t, e) {
  return `${t} ${Ea[t] || ""} ${e}`;
}
function ba(t, e, r) {
  return `${zr(t, e)}:${r}`;
}
function Yr(t) {
  if (t.includes(":")) return;
  const e = /(\d+)$/.exec(t);
  if (!e) return;
  const r = parseInt(e[1], 10), o = t.indexOf(" ");
  if (o < 0) return;
  const n = t.slice(0, o);
  return t === zr(n, r) ? r : void 0;
}
function ua(t) {
  const e = /:(\d+)$/.exec(t);
  if (!e) return;
  const r = t.slice(0, t.length - e[0].length);
  if (Yr(r) !== void 0)
    return parseInt(e[1], 10);
}
const Md = "top-match", zd = "Show recent searches", Pd = "Recent";
function Ad({
  recentSearches: t,
  onSearchItemSelect: e,
  renderItem: r = (h) => String(h),
  getItemKey: o = (h) => String(h),
  ariaLabel: n,
  groupHeading: i,
  id: s,
  classNameForItems: c,
  buttonClassName: d = "tw:absolute tw:end-0 tw:top-0 tw:h-full tw:px-3 tw:py-2",
  buttonVariant: l = "ghost",
  open: w,
  onOpenChange: p
}) {
  const [h, m] = E(!1), [k, g] = E(!1), f = Oa(), N = I(!1), T = w !== void 0, P = T ? w : h, R = n === "" ? "" : pe(n, zd), U = pe(i, Pd), D = (A) => {
    A || (N.current = !0, g(!1)), T || m(A), p == null || p(A);
  }, V = (A) => {
    if (A && N.current) {
      N.current = !1;
      return;
    }
    g(A);
  };
  if (t.length === 0)
    return;
  const $ = (A) => {
    e(A);
  }, M = /* @__PURE__ */ a(
    rt,
    {
      variant: l,
      size: "icon",
      className: d,
      "aria-label": R,
      onPointerEnter: () => {
        N.current = !1;
      },
      children: /* @__PURE__ */ a(ln, { className: "tw:h-4 tw:w-4" })
    }
  );
  return /* @__PURE__ */ u(tr, { open: P, onOpenChange: D, modal: !1, children: [
    /* @__PURE__ */ a(Vt, { children: R ? /* @__PURE__ */ u(vt, { open: k, onOpenChange: V, children: [
      /* @__PURE__ */ a(bt, { asChild: !0, children: /* @__PURE__ */ a(Ke, { asChild: !0, children: M }) }),
      /* @__PURE__ */ a(xt, { children: R })
    ] }) : /* @__PURE__ */ a(Ke, { asChild: !0, children: M }) }),
    /* @__PURE__ */ u(
      er,
      {
        id: s,
        "aria-labelledby": f,
        className: "tw:w-[300px]",
        align: "start",
        onKeyDown: (A) => A.stopPropagation(),
        children: [
          /* @__PURE__ */ a(kr, { id: f, children: U }),
          t.map((A) => /* @__PURE__ */ u(
            cr,
            {
              onSelect: () => $(A),
              className: x("tw:flex tw:items-center", c),
              children: [
                /* @__PURE__ */ a(ln, { className: "tw:me-2 tw:h-4 tw:w-4 tw:opacity-50" }),
                /* @__PURE__ */ a("span", { children: r(A) })
              ]
            },
            o(A)
          ))
        ]
      }
    )
  ] });
}
function Xh(t, e, r = (n, i) => n === i, o = 15) {
  return (n) => {
    const i = t.filter(
      (c) => !r(c, n)
    ), s = [n, ...i.slice(0, o - 1)];
    e(s);
  };
}
function pa(t, e) {
  return !e || Sa(t, e) === 0;
}
function $d(t, e, r, o, n) {
  const i = B(
    () => Fs(t, e),
    [t, e]
  ), s = B(
    () => Us(t, e),
    [t, e]
  ), c = B(
    () => Ks(t, e),
    [t, e]
  ), d = B(
    () => Hs(t, e),
    [t, e]
  ), l = L(
    (w) => {
      w && o(w);
    },
    [o]
  );
  return B(() => [
    {
      onClick: () => l(i),
      disabled: pa(t, i),
      title: pe(
        n == null ? void 0 : n["%webView_bookChapterControl_previousChapter%"],
        "Previous chapter"
      ),
      icon: r === "ltr" ? dn : wn,
      group: "chapter"
    },
    {
      onClick: () => l(s),
      disabled: pa(t, s),
      title: pe(
        n == null ? void 0 : n["%webView_bookChapterControl_nextChapter%"],
        "Next chapter"
      ),
      icon: r === "ltr" ? wn : dn,
      group: "chapter"
    },
    {
      onClick: () => l(c),
      disabled: pa(t, c),
      title: pe(
        n == null ? void 0 : n["%webView_bookChapterControl_previousVerse%"],
        "Previous verse"
      ),
      icon: ci,
      group: "verse"
    },
    {
      onClick: () => l(d),
      disabled: pa(t, d),
      title: pe(
        n == null ? void 0 : n["%webView_bookChapterControl_nextVerse%"],
        "Next verse"
      ),
      icon: xr,
      group: "verse"
    }
  ], [
    t,
    r,
    l,
    i,
    c,
    d,
    s,
    n
  ]);
}
const xa = {
  // Matches start of string (`^`), one or more non-colon/space words, optionally followed by space and more words (`([^:\s]+(?:\s+[^:\s]+)*)`), end of string (`$`), case-insensitive (`i`)
  BOOK_ONLY: /^([^:\s]+(?:\s+[^:\s]+)*)$/i,
  // Same as above, but followed by a space and a chapter number (`\s+(\d+)`)
  BOOK_CHAPTER: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,
  // Same as above, but followed by a colon and optionally a verse number (`:(\d*)`)
  BOOK_CHAPTER_VERSE: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i
}, Vd = [
  xa.BOOK_ONLY,
  xa.BOOK_CHAPTER,
  xa.BOOK_CHAPTER_VERSE
];
function Ld(t) {
  return xa.BOOK_CHAPTER_VERSE.test(t.trim());
}
function kn(t, e) {
  return Yt.bookIdToNumber(t) < Yt.bookIdToNumber(e.book);
}
function Bd(t, e, r) {
  const o = Yt.bookIdToNumber(t) - Yt.bookIdToNumber(r.book);
  return o < 0 ? !0 : o > 0 ? !1 : e < r.chapterNum;
}
function Xa(t, e, r, o) {
  const n = Yt.bookIdToNumber(t) - Yt.bookIdToNumber(o.book);
  return n < 0 ? !0 : n > 0 ? !1 : e < o.chapterNum ? !0 : e > o.chapterNum ? !1 : r < o.verseNum;
}
function sr(t) {
  return el(Yt.bookIdToNumber(t));
}
function jd(t, e, r) {
  if (!t.trim() || e.length === 0) return;
  const o = Vd.reduce(
    (n, i) => {
      if (n) return n;
      const s = i.exec(t.trim());
      if (s) {
        const [c, d = void 0, l = void 0] = s.slice(1);
        let w;
        const p = e.filter((h) => So(h, c, r));
        if (p.length === 1 && ([w] = p), !w && d) {
          if (Yt.isBookIdValid(c)) {
            const h = c.toUpperCase();
            e.includes(h) && (w = h);
          }
          if (!w && r) {
            const h = Array.from(r.entries()).find(
              ([, m]) => m.localizedId.toLowerCase() === c.toLowerCase()
            );
            h && e.includes(h[0]) && ([w] = h);
          }
        }
        if (!w && d) {
          const m = ((k) => Object.keys(Ea).find(
            (g) => Ea[g].toLowerCase() === k.toLowerCase()
          ))(c);
          if (m && e.includes(m) && (w = m), !w && r) {
            const k = Array.from(r.entries()).find(
              ([, g]) => g.localizedName.toLowerCase() === c.toLowerCase()
            );
            k && e.includes(k[0]) && ([w] = k);
          }
        }
        if (w) {
          let h = d ? parseInt(d, 10) : void 0;
          h && h > sr(w) && (h = Math.max(sr(w), 1));
          const m = l ? parseInt(l, 10) : void 0;
          return {
            book: w,
            chapterNum: h,
            verseNum: m
          };
        }
      }
    },
    void 0
  );
  if (o) return o;
}
function ko(t) {
  return {
    [At.OT]: t.filter((e) => Yt.isBookOT(e)),
    [At.NT]: t.filter((e) => Yt.isBookNT(e)),
    [At.DC]: t.filter((e) => Yt.isBookDC(e)),
    [At.Extra]: t.filter((e) => Yt.extraBooks().includes(e))
  };
}
function Fd(t, e) {
  const r = new Set(t), o = e.filter((l) => !r.has(l)), n = new Set(o), i = n.size === 0 ? t : Yt.allBookIds.filter(
    (l) => r.has(l) || n.has(l)
  ), s = ko(i), c = Object.values(s).flat(), d = ko(t);
  return {
    projectBooksBySection: d,
    reachableBooksBySection: s,
    reachableBooks: c,
    // Grouped and flattened like `reachableBooks`, so it inherits the same peripheral-id exclusion.
    projectBooks: Object.values(d).flat(),
    // Derived from the grouped-and-flattened list, so a peripheral id that grouping dropped can
    // never be marked dimmed for a list it is not part of.
    booksOutsideProject: new Set(c.filter((l) => !r.has(l)))
  };
}
const _o = 6;
function Ud(t) {
  return t === "ArrowLeft" ? "ArrowRight" : t === "ArrowRight" ? "ArrowLeft" : t;
}
function Kd({
  current: t,
  key: e,
  max: r,
  direction: o = "ltr"
}) {
  if (r <= 0) return t;
  if (t < 1 || t > r) return 1;
  switch (o === "rtl" ? Ud(e) : e) {
    case "ArrowLeft":
      return t > 1 ? t - 1 : r;
    case "ArrowRight":
      return t < r ? t + 1 : 1;
    case "ArrowUp":
      return Math.max(1, t - _o);
    case "ArrowDown":
      return Math.min(r, t + _o);
    default:
      return t;
  }
}
function ji({
  count: t,
  valueBuilder: e,
  onSelect: r,
  itemRef: o,
  isDisabled: n,
  isDimmed: i,
  isSelected: s,
  suppressKeyboardHighlight: c = !1,
  className: d
}) {
  if (!(t <= 0))
    return /* @__PURE__ */ a(ur, { children: /* @__PURE__ */ a(
      "div",
      {
        className: x("tw:grid tw:gap-1", d),
        style: { gridTemplateColumns: `repeat(${_o}, minmax(0, 1fr))` },
        children: Array.from({ length: t }, (l, w) => w + 1).map((l) => {
          const w = (n == null ? void 0 : n(l)) ?? !1;
          return /* @__PURE__ */ a(
            gr,
            {
              value: e(l),
              onSelect: () => {
                w || r(l);
              },
              ref: o(l),
              disabled: w,
              "aria-disabled": w || void 0,
              className: x(
                "tw:h-8 tw:w-8 tw:cursor-pointer tw:justify-center tw:rounded-md tw:text-center tw:text-sm",
                // Hide CommandItem's own trailing check icon (a multiselect affordance this grid
                // doesn't use) and give cells pointer feedback distinct from the keyboard focus ring.
                "tw:[&>svg]:hidden tw:hover:bg-muted",
                !c && Qn,
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
                  "tw:bg-primary tw:text-primary-foreground tw:hover:bg-primary/90 tw:data-selected:bg-primary tw:data-selected:text-primary-foreground tw:data-selected:ring-primary-foreground/70": (s == null ? void 0 : s(l)) ?? !1
                },
                {
                  // Same tokens as BookItem, so book rows and chapter/verse cells grey identically
                  // inside one popover. Restated under data-selected so a dimmed cell keeps its
                  // dimming while the keyboard highlight is on it, rather than losing it to the
                  // suppression rule above.
                  "tw:bg-muted/50 tw:text-muted-foreground/50 tw:data-selected:bg-muted/50 tw:data-selected:text-muted-foreground/50": ((i == null ? void 0 : i(l)) ?? !1) && !w
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
function _n({
  bookId: t,
  scrRef: e,
  onChapterSelect: r,
  setChapterRef: o,
  isChapterDimmed: n,
  isChapterDisabled: i,
  suppressKeyboardHighlight: s,
  className: c
}) {
  if (t)
    return /* @__PURE__ */ a(
      ji,
      {
        count: sr(t),
        valueBuilder: (d) => zr(t, d),
        onSelect: r,
        itemRef: o,
        isDisabled: i,
        isDimmed: n,
        isSelected: (d) => t === e.book && d === e.chapterNum,
        suppressKeyboardHighlight: s,
        className: c
      }
    );
}
function Nn({
  bookId: t,
  chapterNum: e,
  endVerse: r,
  scrRef: o,
  onVerseSelect: n,
  setVerseRef: i,
  isVerseDimmed: s,
  isVerseDisabled: c,
  suppressKeyboardHighlight: d,
  className: l
}) {
  if (!(!t || r <= 0))
    return /* @__PURE__ */ a(
      ji,
      {
        count: r,
        valueBuilder: (w) => ba(t, e, w),
        onSelect: n,
        itemRef: i,
        isDisabled: c,
        isDimmed: s,
        isSelected: (w) => t === o.book && e === o.chapterNum && w === o.verseNum,
        suppressKeyboardHighlight: d,
        className: l
      }
    );
}
const Hd = "a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]";
function qd(t) {
  return Array.from(t.querySelectorAll(Hd)).filter(
    (e) => e.tabIndex >= 0
  );
}
function Ja({
  scrRef: t,
  handleSubmit: e,
  className: r,
  getActiveBookIds: o,
  getAdditionalBookIds: n,
  localizedBookNames: i,
  localizedStrings: s,
  recentSearches: c,
  onAddRecentSearch: d,
  id: l,
  getEndVerse: w,
  disableReferencesUpTo: p,
  submitKeys: h,
  triggerContent: m,
  triggerVariant: k = "outline",
  showTriggerChevron: g = !1,
  onOpenChange: f,
  onCloseAutoFocus: N,
  modal: T = !1,
  align: P = "center",
  ref: R,
  disabled: U
}) {
  const D = $e(), V = Dd(), [$, M] = E(!1), [A, Y] = E(""), [J, et] = E(""), [y, at] = E("books"), [C, S] = E(void 0), [K, j] = E(
    void 0
  ), [G, it] = E(void 0), [st, Z] = E(!1), [wt, lt] = E(!1), [ut, kt] = E(!1), [Tt, Ht] = E(!1), Le = I(null), Rt = I(!1), Dt = I(void 0), _t = I(void 0), qt = I(void 0), Ie = I(void 0), Ce = I({}), yt = I({}), ft = L(
    (b) => {
      e(b), d && d(b);
    },
    [e, d]
  ), ge = B(() => o ? o() : qs, [o]), Ee = B(
    () => o && n ? n() : [],
    [o, n]
  ), {
    projectBooksBySection: fe,
    reachableBooksBySection: Jt,
    reachableBooks: ne,
    projectBooks: Qt,
    booksOutsideProject: Nt
  } = B(
    () => Fd(ge, Ee),
    [ge, Ee]
  ), Lt = Nt.has(t.book), te = B(() => J.trim() ? ko(
    ne.filter((b) => So(b, J, i))
  ) : wt ? Jt : fe, [
    fe,
    Jt,
    ne,
    wt,
    J,
    i
  ]), F = B(
    () => jd(J, ne, i),
    [J, ne, i]
  ), pt = B(() => {
    if (!F) return;
    const b = A.startsWith(`${F.book} `) ? A : "", W = ua(b), nt = Yr(b);
    return {
      book: F.book,
      chapterNum: nt ?? F.chapterNum ?? 1,
      verseNum: W ?? F.verseNum ?? 1
    };
  }, [F, A]), ee = I(!1);
  q(() => {
    if (!ee.current) {
      ee.current = !0;
      return;
    }
    f == null || f($);
  }, [$, f]);
  const It = L(() => {
    pt && (p && Xa(
      pt.book,
      pt.chapterNum,
      pt.verseNum,
      p
    ) || (ft(pt), M(!1), et(""), Y("")));
  }, [ft, pt, p]), Ct = L(
    (b) => {
      const W = K ?? (F == null ? void 0 : F.book), nt = G ?? (F == null ? void 0 : F.chapterNum);
      !W || !nt || (ft({
        book: W,
        chapterNum: nt,
        verseNum: b
      }), M(!1));
    },
    [ft, K, G, F]
  ), Ot = L(
    (b) => {
      if (p && kn(b, p)) return;
      if (sr(b) <= 1) {
        ft({
          book: b,
          chapterNum: 1,
          verseNum: 1
        }), M(!1), et("");
        return;
      }
      S(b), at("chapters");
    },
    [ft, p]
  ), re = L(
    (b) => {
      const W = y === "chapters" ? C : F == null ? void 0 : F.book;
      if (W) {
        if (w && w(W, b) > 1) {
          j(W), it(b), at("verses"), Y("");
          return;
        }
        ft({
          book: W,
          chapterNum: b,
          verseNum: 1
        }), M(!1);
      }
    },
    [ft, y, C, F, w]
  ), ae = L(
    (b) => {
      ft(b), M(!1), et("");
    },
    [ft]
  ), me = $d(
    t,
    wt ? ne : Qt,
    D,
    e,
    s
  ), ve = L((b) => {
    et(b), Ht(!1);
  }, []), Mt = L(() => {
    at("books"), S(void 0), j(void 0), it(void 0), Ht(!1), setTimeout(() => {
      var b;
      (b = _t.current) == null || b.focus();
    }, 0);
  }, []), be = L(() => {
    const b = K;
    j(void 0), it(void 0), b ? (S(b), at("chapters"), Y("")) : Mt();
  }, [K, Mt]), Bt = L(
    (b) => {
      M(b), b && (at("books"), S(void 0), j(void 0), it(void 0), et(""), Ht(!1), kt(!1), lt(Lt));
    },
    [Lt]
  );
  q(() => {
    U && Bt(!1);
  }, [U, Bt]);
  const [zt, Be] = E(0);
  q(() => {
    var b;
    zt !== 0 && ((b = _t.current) == null || b.focus());
  }, [zt]), mi(
    R,
    () => ({
      open: () => {
        U || (Bt(!0), Be((b) => b + 1));
      }
    }),
    [Bt, U]
  );
  const { otLong: Te, ntLong: xe, dcLong: Me, extraLong: je } = {
    otLong: s == null ? void 0 : s["%scripture_section_ot_long%"],
    ntLong: s == null ? void 0 : s["%scripture_section_nt_long%"],
    dcLong: s == null ? void 0 : s["%scripture_section_dc_long%"],
    extraLong: s == null ? void 0 : s["%scripture_section_extra_long%"]
  }, de = L(
    (b) => ei(b, Te, xe, Me, je),
    [Te, xe, Me, je]
  ), ye = L(
    (b) => F ? !!F.chapterNum && !b.toString().includes(F.chapterNum.toString()) : !1,
    [F]
  ), Ye = B(
    () => Xe(
      t,
      i ? Ze(t.book, i) : "English"
    ),
    [t, i]
  ), ar = B(
    () => V >= Qr.TIGHT ? Xr(t.book, i) : Ze(t.book, i),
    [t.book, i, V]
  ), or = `${t.chapterNum}:${t.verseNum}`, _ = L((b) => (W) => {
    Ce.current[b] = W;
  }, []), v = L((b) => (W) => {
    yt.current[b] = W;
  }, []), O = B(
    () => Ld(J),
    [J]
  ), z = B(() => !w || !F || !F.chapterNum || !O ? !1 : w(F.book, F.chapterNum) > 0, [w, F, O]), Q = y === "books" && !st && !J.trim() && Nt.size > 0, X = L(
    (b) => p ? kn(b, p) : !1,
    [p]
  ), tt = L(
    (b) => (W) => p ? Bd(b, W, p) : !1,
    [p]
  ), ct = L(
    (b, W) => (nt) => p ? Xa(b, W, nt, p) : !1,
    [p]
  ), ht = pe(
    s == null ? void 0 : s["%webView_bookChapterControl_selectChapter%"],
    "Select chapter"
  ), we = pe(
    s == null ? void 0 : s["%webView_bookChapterControl_selectVerse%"],
    "Select verse"
  ), St = y === "verses" ? pe(
    s == null ? void 0 : s["%webView_bookChapterControl_backToChapters%"],
    "Back to chapters"
  ) : pe(
    s == null ? void 0 : s["%webView_bookChapterControl_backToBooks%"],
    "Back to books"
  ), Pt = pe(
    s == null ? void 0 : s["%webView_bookChapterControl_bookNotInProject%"],
    "Not in project"
  ), jt = pe(
    s == null ? void 0 : s["%webView_bookChapterControl_bookNotInProjectDescription%"],
    "{book} is not in this project"
  ), ke = L(
    (b) => dr(jt, {
      book: `${Ze(b, i)} (${Xr(
        b,
        i
      )})`
    }),
    [jt, i]
  ), _e = pe(
    s == null ? void 0 : s["%webView_bookChapterControl_showMoreBooks%"],
    "Show more books"
  ), Rr = pe(
    s == null ? void 0 : s["%webView_bookChapterControl_showProjectBooksOnly%"],
    "Show project books only"
  ), la = L(
    (b) => {
      (b.key === "Home" || b.key === "End") && b.stopPropagation(), h && h.includes(b.key) && F && F.chapterNum !== void 0 && F.verseNum !== void 0 && (b.preventDefault(), b.stopPropagation(), It());
    },
    [h, F, It]
  ), da = L(
    (b) => {
      var en, rn;
      if (b.ctrlKey) return;
      const W = b.target instanceof HTMLElement ? b.target : void 0;
      if (!(!!W && !!((en = Dt.current) != null && en.contains(W))) && (W != null && W.closest('[role="menu"], [role="menuitem"]')))
        return;
      if (b.key === "Tab") {
        const Ut = Dt.current ? qd(Dt.current) : [];
        if (Ut.length === 0) {
          b.preventDefault(), b.stopPropagation();
          return;
        }
        const Se = Ut[Ut.length - 1], ie = b.shiftKey ? Ut[0] : Se;
        document.activeElement === ie && (b.preventDefault(), b.stopPropagation(), (b.shiftKey ? Se : Ut[0]).focus());
        return;
      }
      const { isLetter: Gt, isDigit: oe } = yn(b.key);
      if ((y === "chapters" || y === "verses") && (b.key === " " || b.key === "Enter")) {
        if (!!(W != null && W.closest(
          'button, a, input, select, textarea, [role="button"]'
        ))) {
          b.stopPropagation();
          return;
        }
        const Se = (() => {
          if (y === "verses") {
            const Hr = K, an = G, qa = ua(A);
            return !Hr || !an || qa === void 0 ? void 0 : {
              isDisabled: ct(Hr, an)(qa),
              activate: () => Ct(qa)
            };
          }
          const ie = C, Pe = Yr(A);
          if (!(!ie || Pe === void 0))
            return {
              isDisabled: tt(ie)(Pe),
              activate: () => re(Pe)
            };
        })();
        if (Se) {
          b.preventDefault(), b.stopPropagation(), Se.isDisabled || Se.activate();
          return;
        }
      }
      if (y === "books" && F && !st && b.key === "Enter" && !(W !== _t.current && !!(W != null && W.closest('button, a, input, select, textarea, [role="button"]')))) {
        b.preventDefault(), b.stopPropagation(), It();
        return;
      }
      if ((y === "chapters" || y === "verses") && (Gt || oe)) {
        b.preventDefault(), b.stopPropagation();
        return;
      }
      if (b.key === "Backspace" && (y === "chapters" || y === "verses")) {
        b.preventDefault(), b.stopPropagation(), y === "verses" ? be() : Mt();
        return;
      }
      if (!Od(b.key) || st) return;
      if (y === "books" && !Tt && (b.key === "ArrowLeft" || b.key === "ArrowRight")) {
        const Ut = W === _t.current ? _t.current : void 0, Se = (Ut == null ? void 0 : Ut.selectionStart) ?? 0, ie = (Ut == null ? void 0 : Ut.selectionEnd) ?? 0, Pe = D === "rtl" ? b.key === "ArrowRight" : b.key === "ArrowLeft";
        if (!!Ut && (Se !== ie || (Pe ? Se > 0 : ie < Ut.value.length))) return;
      }
      if (b.shiftKey || y === "books" && W !== _t.current && (W != null && W.closest('button, a, [role="button"]')))
        return;
      const Et = (() => {
        const Ut = y === "books" && F && z && F.chapterNum ? { bookId: F.book, chapterNum: F.chapterNum } : void 0, Se = y === "verses" ? { bookId: K, chapterNum: G } : Ut;
        if (Se) {
          const { bookId: ie, chapterNum: Pe } = Se;
          return !ie || !Pe || !w ? void 0 : {
            max: w(ie, Pe),
            current: ua(A) ?? 0,
            buildValue: (Hr) => ba(ie, Pe, Hr),
            refs: yt,
            // In books view focus stays on the CommandInput so the user can keep typing; only
            // the dedicated grid views pull focus off the back button.
            takeFocus: y === "verses"
          };
        }
        if (y === "chapters" || y === "books" && F && sr(F.book) > 1) {
          const ie = y === "chapters" ? C : F == null ? void 0 : F.book;
          return ie ? {
            max: sr(ie),
            current: Yr(A) ?? 0,
            buildValue: (Pe) => zr(ie, Pe),
            refs: Ce,
            takeFocus: y === "chapters"
          } : void 0;
        }
      })();
      if (!Et || Et.max <= 0) return;
      y === "books" && Ht(!0), Et.takeFocus && ((rn = Dt.current) == null || rn.focus());
      const ue = Kd({
        current: Et.current,
        key: b.key,
        max: Et.max,
        direction: D
      });
      if (b.preventDefault(), b.stopPropagation(), ue === Et.current) return;
      Y(Et.buildValue(ue));
      const tn = Et.refs.current[ue];
      tn && tn.scrollIntoView({ block: "nearest", behavior: "smooth" });
    },
    [
      y,
      F,
      z,
      st,
      Tt,
      D,
      Mt,
      be,
      re,
      It,
      Ct,
      tt,
      ct,
      C,
      K,
      G,
      w,
      A
    ]
  ), H = L((b) => {
    var Gt, oe;
    if (b.shiftKey || b.key === "Tab" || b.key === " ") return;
    if (b.key === "Enter") {
      b.stopPropagation();
      return;
    }
    if (b.key === "ArrowUp" || b.key === "ArrowDown") {
      (Gt = _t.current) == null || Gt.focus();
      return;
    }
    const { isLetter: W, isDigit: nt } = yn(b.key);
    (W || nt) && (b.preventDefault(), et((Et) => Et + b.key), (oe = _t.current) == null || oe.focus(), Z(!1));
  }, []);
  Kt(() => {
    const b = setTimeout(() => {
      if ($ && y === "books" && qt.current && Ie.current) {
        const W = qt.current, nt = Ie.current, Gt = nt.offsetTop, oe = W.clientHeight, Et = nt.clientHeight, ue = Gt - oe / 2 + Et / 2;
        W.scrollTo({
          top: Math.max(0, ue),
          behavior: "smooth"
        }), Y(yo(t.book));
      }
    }, 0);
    return () => {
      clearTimeout(b);
    };
  }, [$, y, J, F, t.book]), Kt(() => {
    if (y === "chapters" && C) {
      const b = C === t.book, W = b ? t.chapterNum : 1;
      Y(zr(C, W)), setTimeout(() => {
        if (qt.current)
          if (b) {
            const nt = Ce.current[t.chapterNum];
            nt && nt.scrollIntoView({ block: "center", behavior: "smooth" });
          } else
            qt.current.scrollTo({ top: 0 });
        Dt.current && Dt.current.focus();
      }, 0);
    }
  }, [y, C, F, t.book, t.chapterNum]), Kt(() => {
    if (y === "verses" && K && G !== void 0) {
      const b = K === t.book && G === t.chapterNum, W = b ? t.verseNum : 1;
      Y(
        ba(K, G, W)
      ), setTimeout(() => {
        if (qt.current)
          if (b) {
            const nt = yt.current[t.verseNum];
            nt && nt.scrollIntoView({ block: "center", behavior: "smooth" });
          } else
            qt.current.scrollTo({ top: 0 });
        Dt.current && Dt.current.focus();
      }, 0);
    }
  }, [
    y,
    K,
    G,
    t.book,
    t.chapterNum,
    t.verseNum
  ]);
  const ot = F ? `${F.book} ${F.chapterNum ?? ""} ${F.verseNum ?? ""} ${z}` : "", Ft = I(""), Re = I(""), ze = B(() => {
    if (y !== "books" || !F || st) return;
    const { book: b, chapterNum: W, verseNum: nt } = F;
    if (z && W && w)
      return {
        max: w(b, W),
        initial: nt ?? (b === t.book && W === t.chapterNum ? t.verseNum : 1),
        parse: ua,
        buildValue: (oe) => ba(b, W, oe)
      };
    const Gt = sr(b);
    if (!(Gt <= 1))
      return {
        max: Gt,
        initial: W ?? (b === t.book ? t.chapterNum : 1),
        parse: Yr,
        buildValue: (oe) => zr(b, oe)
      };
  }, [
    y,
    F,
    st,
    z,
    w,
    t.book,
    t.chapterNum,
    t.verseNum
  ]);
  return Kt(() => {
    if (y !== "books" || !F || !ze || ze.max <= 0) {
      Ft.current = "";
      return;
    }
    const { max: b, initial: W, parse: nt, buildValue: Gt } = ze, oe = (Et) => {
      const ue = nt(Et);
      return ue !== void 0 && ue >= 1 && ue <= b && Et === Gt(ue) ? ue : void 0;
    };
    if (Ft.current !== ot) {
      Ft.current = ot;
      const Et = Gt(Math.min(Math.max(W, 1), b));
      Re.current = Et, Y(Et);
      return;
    }
    if (oe(A) !== void 0) {
      Re.current = A;
      return;
    }
    Y(
      oe(Re.current) !== void 0 ? Re.current : Gt(Math.min(Math.max(W, 1), b))
    );
  }, [y, F, ze, ot, A]), /* @__PURE__ */ u(_r, { open: $, onOpenChange: Bt, modal: T, children: [
    /* @__PURE__ */ a(jr, { asChild: !0, children: /* @__PURE__ */ u(
      rt,
      {
        ref: Le,
        "aria-label": "book-chapter-trigger",
        variant: k,
        role: "combobox",
        "aria-expanded": $,
        disabled: U,
        className: x(
          "tw:h-8 tw:w-full tw:min-w-16 tw:max-w-48 tw:shrink tw:overflow-hidden tw:px-1",
          r
        ),
        onClick: (b) => {
          Rt.current && (Rt.current = !1, b.preventDefault());
        },
        children: [
          m ?? /* @__PURE__ */ a(
            Id,
            {
              primary: ar,
              secondary: or,
              showSecondary: V < Qr.MINIMUM,
              isPartial: V >= Qr.TIGHT,
              fullText: Ye
            }
          ),
          g && /* @__PURE__ */ a(
            bi,
            {
              "data-testid": "book-chapter-control-chevron",
              className: "tw:ms-2 tw:size-4 tw:shrink-0 tw:opacity-50"
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ a(
      Nr,
      {
        id: l,
        forceMount: !0,
        className: "tw:w-[280px] tw:p-0",
        align: P,
        onKeyDownCapture: da,
        onKeyDown: (b) => b.stopPropagation(),
        onPointerDownOutside: (b) => {
          const { target: W } = b;
          $ && Le.current && W instanceof Node && Le.current.contains(W) && (Rt.current = !0, Bt(!1));
        },
        onCloseAutoFocus: N,
        children: /* @__PURE__ */ a(Vt, { children: /* @__PURE__ */ u(
          Cr,
          {
            ref: Dt,
            loop: !0,
            value: A,
            onValueChange: Y,
            disablePointerSelection: !0,
            shouldFilter: !1,
            children: [
              y === "books" ? /* @__PURE__ */ u(
                "div",
                {
                  className: x("tw:flex tw:items-end", st && "tw:pb-1"),
                  onFocus: (b) => {
                    kt(b.target !== _t.current);
                  },
                  onBlur: (b) => {
                    b.currentTarget.contains(b.relatedTarget) || kt(!1);
                  },
                  children: [
                    /* @__PURE__ */ u("div", { className: "tw:relative tw:flex-1", children: [
                      /* @__PURE__ */ a(
                        $a,
                        {
                          ref: _t,
                          value: J,
                          onValueChange: ve,
                          onKeyDown: la,
                          onFocus: () => Z(!1),
                          className: c && c.length > 0 ? "tw:pe-8!" : "",
                          spaceSelectsHighlightedItem: !0
                        }
                      ),
                      c && c.length > 0 && /* @__PURE__ */ a(
                        Ad,
                        {
                          recentSearches: c,
                          onSearchItemSelect: ae,
                          renderItem: (b) => Xe(b, "English"),
                          getItemKey: (b) => `${b.book}-${b.chapterNum}-${b.verseNum}`,
                          ariaLabel: s == null ? void 0 : s["%history_recentSearches_ariaLabel%"],
                          groupHeading: s == null ? void 0 : s["%history_recent%"],
                          buttonClassName: "tw:absolute tw:end-1 tw:top-1"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ a(Va, { className: "tw:translate-y-px tw:gap-1 tw:pe-2", children: me.map(
                      ({ onClick: b, disabled: W, title: nt, icon: Gt, group: oe }, Et) => {
                        const ue = /* @__PURE__ */ a(
                          rt,
                          {
                            variant: "ghost",
                            size: "sm",
                            onClick: () => {
                              Z(!0), b();
                            },
                            disabled: W,
                            className: "tw:h-8.5 tw:w-6 tw:rounded-lg! tw:p-0",
                            "aria-label": nt,
                            onKeyDown: H,
                            children: /* @__PURE__ */ a(Gt, {})
                          }
                        );
                        return (
                          // Keyed by position, not by `title`: the titles are localized, so they all
                          // change together the moment the strings resolve or the UI language does.
                          // Keying on them would remount all four buttons at that instant, dropping
                          // focus off whichever one the user was on and destroying an open tooltip.
                          // The set is fixed in size and order, so the index is stable.
                          // eslint-disable-next-line react/no-array-index-key
                          /* @__PURE__ */ u(yr, { children: [
                            Et > 0 && oe !== me[Et - 1].group && /* @__PURE__ */ a(Oo, {}),
                            W ? (
                              // A disabled Button carries `pointer-events: none` from its own base
                              // variants, so it is not hit-tested: neither a Radix tooltip nor a
                              // `title` ON THE BUTTON can ever fire. These arrows come back disabled
                              // at the edges of the canon — Genesis 1:1 is the default state of a
                              // freshly opened project — which is exactly where a user asks what the
                              // button was for. The wrapper is still hit-tested, so the native
                              // tooltip it carries is the one hover explanation available here.
                              /* @__PURE__ */ a("span", { title: nt, className: "tw:inline-flex", children: ue })
                            ) : /* @__PURE__ */ u(vt, { children: [
                              /* @__PURE__ */ a(bt, { asChild: !0, children: ue }),
                              /* @__PURE__ */ a(xt, { children: nt })
                            ] })
                          ] }, `${oe}-${Et}`)
                        );
                      }
                    ) })
                  ]
                }
              ) : /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:border-b tw:px-3 tw:py-1", children: [
                /* @__PURE__ */ u(vt, { children: [
                  /* @__PURE__ */ a(bt, { asChild: !0, children: /* @__PURE__ */ a(
                    rt,
                    {
                      variant: "ghost",
                      size: "sm",
                      onClick: y === "verses" ? be : Mt,
                      className: "tw:me-2 tw:h-6 tw:w-6 tw:p-0",
                      tabIndex: -1,
                      "aria-label": St,
                      children: D === "ltr" ? /* @__PURE__ */ a(bc, { className: "tw:h-4 tw:w-4" }) : /* @__PURE__ */ a(xc, { className: "tw:h-4 tw:w-4" })
                    }
                  ) }),
                  /* @__PURE__ */ a(xt, { children: St })
                ] }),
                y === "chapters" && C && /* @__PURE__ */ a("span", { tabIndex: -1, className: "tw:text-sm tw:font-medium", children: Ze(C, i) }),
                y === "verses" && K && G !== void 0 && /* @__PURE__ */ a("span", { tabIndex: -1, className: "tw:text-sm tw:font-medium", children: `${Ze(K, i)} ${G}` }),
                /* @__PURE__ */ a(
                  "span",
                  {
                    tabIndex: -1,
                    className: "tw:ms-auto tw:text-sm tw:font-medium tw:text-muted-foreground",
                    children: y === "verses" ? we : ht
                  }
                )
              ] }),
              !st && /* @__PURE__ */ u(Er, { ref: qt, children: [
                y === "books" && /* @__PURE__ */ u(mt, { children: [
                  !F && Object.entries(te).map(([b, W]) => {
                    if (W.length !== 0)
                      return (
                        // We are mapping over filteredBooksByType, which uses Section as key type
                        // eslint-disable-next-line no-type-assertion/no-type-assertion
                        /* @__PURE__ */ a(ur, { heading: de(b), children: W.map((nt) => /* @__PURE__ */ a(
                          $i,
                          {
                            bookId: nt,
                            onSelect: (Gt) => Ot(Gt),
                            section: va(nt),
                            commandValue: yo(nt),
                            suppressKeyboardHighlight: ut,
                            ref: nt === t.book ? Ie : void 0,
                            localizedBookNames: i,
                            disabled: X(nt),
                            dimmedReason: Nt.has(nt) ? Pt : void 0,
                            dimmedDescription: Nt.has(nt) ? ke(nt) : void 0
                          },
                          nt
                        )) }, b)
                      );
                  }),
                  F && pt && /* @__PURE__ */ a(ur, { children: /* @__PURE__ */ u(
                    gr,
                    {
                      value: Md,
                      onSelect: It,
                      disabled: !!p && Xa(
                        pt.book,
                        pt.chapterNum,
                        pt.verseNum,
                        p
                      ),
                      className: "tw:font-semibold tw:text-primary tw:hover:bg-muted tw:[&>svg:last-child]:hidden",
                      children: [
                        /* @__PURE__ */ a("span", { className: "tw:min-w-0 tw:flex-1", children: Xe(
                          pt,
                          Ze(F.book, i)
                        ) }),
                        /* @__PURE__ */ a("span", { className: "tw:ms-2 tw:shrink-0 tw:text-xs tw:text-muted-foreground", children: Xr(F.book, i) })
                      ]
                    },
                    "top-match"
                  ) }),
                  F && z && F.chapterNum && w && // No heading over this grid: the top-match row sits directly above it and
                  // already names the book and the reference the grid is refining, so a
                  // heading here only repeated the book back to the user one line later. The
                  // dedicated verses view still carries one, because there it is the only
                  // thing naming the book.
                  /* @__PURE__ */ a(
                    Nn,
                    {
                      bookId: F.book,
                      chapterNum: F.chapterNum,
                      endVerse: w(F.book, F.chapterNum),
                      scrRef: t,
                      onVerseSelect: Ct,
                      setVerseRef: v,
                      isVerseDisabled: ct(F.book, F.chapterNum),
                      suppressKeyboardHighlight: ut,
                      className: "tw:px-4 tw:pb-4"
                    }
                  ),
                  F && !z && sr(F.book) > 1 && // No heading here either, for the same reason as the verse preview above:
                  // the top-match row directly above already names the book.
                  /* @__PURE__ */ a(
                    _n,
                    {
                      bookId: F.book,
                      scrRef: t,
                      onChapterSelect: re,
                      setChapterRef: _,
                      isChapterDimmed: ye,
                      isChapterDisabled: tt(F.book),
                      suppressKeyboardHighlight: ut,
                      className: "tw:px-4 tw:pb-4"
                    }
                  )
                ] }),
                y === "chapters" && C && /* @__PURE__ */ a(
                  _n,
                  {
                    bookId: C,
                    scrRef: t,
                    onChapterSelect: re,
                    setChapterRef: _,
                    isChapterDisabled: tt(C),
                    className: "tw:p-4"
                  }
                ),
                y === "verses" && K && G !== void 0 && w && /* @__PURE__ */ a(
                  Nn,
                  {
                    bookId: K,
                    chapterNum: G,
                    endVerse: w(
                      K,
                      G
                    ),
                    scrRef: t,
                    onVerseSelect: Ct,
                    setVerseRef: v,
                    isVerseDisabled: ct(
                      K,
                      G
                    ),
                    className: "tw:p-4"
                  }
                )
              ] }),
              Q && /* @__PURE__ */ a("div", { className: "tw:border-t tw:p-1", children: /* @__PURE__ */ a(
                rt,
                {
                  variant: "ghost",
                  size: "sm",
                  className: "tw:w-full tw:justify-start tw:font-normal",
                  onClick: () => lt((b) => !b),
                  children: wt ? Rr : _e
                }
              ) })
            ]
          }
        ) })
      }
    )
  ] });
}
const Jh = Object.freeze([
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
function Gd(t) {
  return typeof t == "string" ? t : typeof t == "number" ? t.toString() : t.label;
}
function Cn({
  id: t,
  options: e = [],
  className: r,
  buttonClassName: o,
  popoverContentClassName: n,
  popoverContentStyle: i,
  value: s,
  onChange: c = () => {
  },
  getOptionLabel: d = Gd,
  getButtonLabel: l,
  icon: w = void 0,
  buttonPlaceholder: p = "",
  textPlaceholder: h = "",
  commandEmptyMessage: m = "No option found",
  buttonVariant: k = "outline",
  alignDropDown: g = "start",
  isDisabled: f = !1,
  ariaLabel: N,
  ...T
}) {
  const [P, R] = E(!1), U = l ?? d, D = ($) => $.length > 0 && typeof $[0] == "object" && "options" in $[0], V = ($, M) => {
    const A = d($), Y = typeof $ == "object" && "secondaryLabel" in $ ? $.secondaryLabel : void 0, J = `${M ?? ""}${A}${Y ?? ""}`;
    return /* @__PURE__ */ u(
      gr,
      {
        value: A,
        onSelect: () => {
          c($), R(!1);
        },
        className: "tw:gap-1.5!",
        children: [
          /* @__PURE__ */ a(
            pr,
            {
              className: x("tw:h-4 tw:w-4 tw:shrink-0", {
                "tw:opacity-0": !s || d(s) !== A
              })
            }
          ),
          /* @__PURE__ */ u("span", { className: "tw:flex-1 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap", children: [
            A,
            Y && /* @__PURE__ */ u("span", { className: "tw:text-muted-foreground", children: [
              " · ",
              Y
            ] })
          ] })
        ]
      },
      J
    );
  };
  return /* @__PURE__ */ u(_r, { open: P, onOpenChange: R, ...T, children: [
    /* @__PURE__ */ a(jr, { asChild: !0, children: /* @__PURE__ */ u(
      rt,
      {
        variant: k,
        role: "combobox",
        "aria-expanded": P,
        "aria-label": N,
        id: t,
        className: x(
          "tw:flex tw:w-[200px] tw:items-center tw:justify-between tw:overflow-hidden",
          o ?? r
        ),
        disabled: f,
        children: [
          /* @__PURE__ */ u("div", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-center tw:overflow-hidden", children: [
            w && /* @__PURE__ */ a("div", { className: "tw:shrink-0 tw:pe-2", children: w }),
            /* @__PURE__ */ a(
              "span",
              {
                className: x(
                  "tw:min-w-0 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap tw:text-start"
                ),
                children: s ? U(s) : p
              }
            )
          ] }),
          /* @__PURE__ */ a(xr, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ a(
      Nr,
      {
        align: g,
        className: x("tw:w-[200px] tw:p-0", n),
        style: i,
        children: /* @__PURE__ */ u(Cr, { children: [
          /* @__PURE__ */ a(
            $a,
            {
              placeholder: h,
              className: "tw:text-inherit",
              spaceSelectsHighlightedItem: !0
            }
          ),
          /* @__PURE__ */ a(La, { children: m }),
          /* @__PURE__ */ a(Er, { children: D(e) ? e.map(($) => /* @__PURE__ */ a(ur, { heading: $.groupHeading, children: $.options.map((M) => V(M, $.groupHeading)) }, $.groupHeading)) : /* @__PURE__ */ a(ur, { children: e.map(($) => V($)) }) })
        ] })
      }
    )
  ] });
}
function Wd({
  startChapter: t,
  endChapter: e,
  handleSelectStartChapter: r,
  handleSelectEndChapter: o,
  isDisabled: n = !1,
  chapterCount: i
}) {
  const s = B(
    () => Array.from({ length: i }, (l, w) => w + 1),
    [i]
  );
  return /* @__PURE__ */ u(mt, { children: [
    /* @__PURE__ */ a($t, { htmlFor: "start-chapters-combobox", children: "Chapters" }),
    /* @__PURE__ */ a(
      Cn,
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
    /* @__PURE__ */ a($t, { htmlFor: "end-chapters-combobox", children: "to" }),
    /* @__PURE__ */ a(
      Cn,
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
var No = /* @__PURE__ */ ((t) => (t.CurrentBook = "current book", t.ChooseBooks = "choose books", t))(No || {});
((t) => {
  t.CURRENT_BOOK = "current book", t.CHOOSE_BOOKS = "choose books";
})(No || (No = {}));
const Qh = Object.freeze([
  "%webView_bookSelector_currentBook%",
  "%webView_bookSelector_choose%",
  "%webView_bookSelector_chooseBooks%"
]), Qa = (t, e) => t[e] ?? e;
function tg({
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
  const w = Qa(l, "%webView_bookSelector_currentBook%"), p = Qa(l, "%webView_bookSelector_choose%"), h = Qa(l, "%webView_bookSelector_chooseBooks%"), [m, k] = E(
    "current book"
    /* CurrentBook */
  ), g = (f) => {
    k(f), t(f);
  };
  return /* @__PURE__ */ a(
    Do,
    {
      className: "pr-twp tw:flex",
      value: m,
      onValueChange: (f) => g(f),
      children: /* @__PURE__ */ u("div", { className: "tw:flex tw:w-full tw:flex-col tw:gap-4", children: [
        /* @__PURE__ */ u("div", { className: "tw:grid tw:grid-cols-[25%_25%_50%]", children: [
          /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center", children: [
            /* @__PURE__ */ a(Ta, {
              value: "current book"
              /* CurrentBook */
            }),
            /* @__PURE__ */ a($t, { className: "tw:ms-1", children: w })
          ] }),
          /* @__PURE__ */ a($t, { className: "tw:flex tw:items-center", children: e }),
          /* @__PURE__ */ a("div", { className: "tw:flex tw:items-center tw:justify-end", children: /* @__PURE__ */ a(
            Wd,
            {
              isDisabled: m === "choose books",
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
            /* @__PURE__ */ a(Ta, {
              value: "choose books"
              /* ChooseBooks */
            }),
            /* @__PURE__ */ a($t, { className: "tw:ms-1", children: h })
          ] }),
          /* @__PURE__ */ a($t, { className: "tw:flex tw:items-center", children: o.map((f) => Yt.bookIdToEnglishName(f)).join(", ") }),
          /* @__PURE__ */ a(
            rt,
            {
              disabled: m === "current book",
              onClick: () => r(),
              children: p
            }
          )
        ] })
      ] })
    }
  );
}
const Fi = Fr(null);
function Yd(t, e) {
  return { getTheme: function() {
    return e ?? null;
  } };
}
function We() {
  const t = ia(Fi);
  return t == null && function(e, ...r) {
    const o = new URL("https://lexical.dev/docs/error"), n = new URLSearchParams();
    n.append("code", e);
    for (const i of r) n.append("v", i);
    throw o.search = n.toString(), Error(`Minified Lexical error #${e}; visit ${o.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
  }(8), t;
}
const Ui = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, Zd = Ui ? Kt : q, ha = { tag: jo };
function Xd({ initialConfig: t, children: e }) {
  const r = B(() => {
    const { theme: o, namespace: n, nodes: i, onError: s, editorState: c, html: d } = t, l = Yd(null, o), w = yi({ editable: t.editable, html: d, namespace: n, nodes: i, onError: (p) => s(p, w), theme: o });
    return function(p, h) {
      if (h !== null) {
        if (h === void 0) p.update(() => {
          const m = hr();
          if (m.isEmpty()) {
            const k = sa();
            m.append(k);
            const g = Ui ? document.activeElement : null;
            (he() !== null || g !== null && g === p.getRootElement()) && k.select();
          }
        }, ha);
        else if (h !== null) switch (typeof h) {
          case "string": {
            const m = p.parseEditorState(h);
            p.setEditorState(m, ha);
            break;
          }
          case "object":
            p.setEditorState(h, ha);
            break;
          case "function":
            p.update(() => {
              hr().isEmpty() && h(p);
            }, ha);
        }
      }
    }(w, c), [w, l];
  }, []);
  return Zd(() => {
    const o = t.editable, [n] = r;
    n.setEditable(o === void 0 || o);
  }, []), a(Fi.Provider, { value: r, children: e });
}
const Jd = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Kt : q;
function Qd({ ignoreHistoryMergeTagChange: t = !0, ignoreSelectionChange: e = !1, onChange: r }) {
  const [o] = We();
  return Jd(() => {
    if (r) return o.registerUpdateListener(({ editorState: n, dirtyElements: i, dirtyLeaves: s, prevEditorState: c, tags: d }) => {
      e && i.size === 0 && s.size === 0 || t && d.has(jo) || c.isEmpty() || r(n, o, d);
    });
  }, [o, t, e, r]), null;
}
const qo = {
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
}, Go = [
  ld,
  ki,
  _i,
  dd
], tw = Fr(null), to = {
  didCatch: !1,
  error: null
};
class ew extends wl {
  constructor(e) {
    super(e), this.resetErrorBoundary = this.resetErrorBoundary.bind(this), this.state = to;
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
      }), this.setState(to);
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
    if (o && r.error !== null && rw(e.resetKeys, n)) {
      var i, s;
      (i = (s = this.props).onReset) === null || i === void 0 || i.call(s, {
        next: n,
        prev: e.resetKeys,
        reason: "keys"
      }), this.setState(to);
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
        c = fo(o, d);
      else if (n !== void 0)
        c = n;
      else
        throw s;
    }
    return fo(tw.Provider, {
      value: {
        didCatch: i,
        error: s,
        resetErrorBoundary: this.resetErrorBoundary
      }
    }, c);
  }
}
function rw() {
  let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  return t.length !== e.length || t.some((r, o) => !Object.is(r, e[o]));
}
function aw({ children: t, onError: e }) {
  return a(ew, { fallback: a("div", { style: { border: "1px solid #f00", color: "#f00", padding: "8px" }, children: "An error was thrown." }), onError: e, children: t });
}
const ow = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Kt : q;
function nw(t) {
  return { initialValueFn: () => t.isEditable(), subscribe: (e) => t.registerEditableListener(e) };
}
function iw() {
  return function(t) {
    const [e] = We(), r = B(() => t(e), [e, t]), [o, n] = E(() => r.initialValueFn()), i = I(o);
    return ow(() => {
      const { initialValueFn: s, subscribe: c } = r, d = s();
      return i.current !== d && (i.current = d, n(d)), c((l) => {
        i.current = l, n(l);
      });
    }, [r, t]), o;
  }(nw);
}
function sw(t, e) {
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
function Da(t, ...e) {
  const r = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const n of e) o.append("v", n);
  throw r.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
const Ki = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, cw = Ki && "documentMode" in document ? document.documentMode : null;
!(!Ki || !("InputEvent" in window) || cw) && "getTargetRanges" in new window.InputEvent("input");
function Ue(t) {
  return `${t}px`;
}
const lw = { attributes: !0, characterData: !0, childList: !0, subtree: !0 };
function dw(t, e, r) {
  let o = null, n = null, i = null, s = [];
  const c = document.createElement("div");
  function d() {
    o === null && Da(182), n === null && Da(183);
    const { left: p, top: h } = n.getBoundingClientRect(), m = sw(t, e);
    var k, g;
    c.isConnected || (g = c, (k = n).insertBefore(g, k.firstChild));
    let f = !1;
    for (let N = 0; N < m.length; N++) {
      const T = m[N], P = s[N] || document.createElement("div"), R = P.style;
      R.position !== "absolute" && (R.position = "absolute", f = !0);
      const U = Ue(T.left - p);
      R.left !== U && (R.left = U, f = !0);
      const D = Ue(T.top - h);
      R.top !== D && (P.style.top = D, f = !0);
      const V = Ue(T.width);
      R.width !== V && (P.style.width = V, f = !0);
      const $ = Ue(T.height);
      R.height !== $ && (P.style.height = $, f = !0), P.parentNode !== c && (c.append(P), f = !0), s[N] = P;
    }
    for (; s.length > m.length; ) s.pop();
    f && r(s);
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
    const m = h.parentElement;
    if (!zl(m)) return l();
    l(), o = h, n = m, i = new MutationObserver((k) => {
      const g = t.getRootElement(), f = g && g.parentElement;
      if (g !== o || f !== n) return p();
      for (const N of k) if (!c.contains(N.target)) return d();
    }), i.observe(m, lw), d();
  });
  return () => {
    w(), l();
  };
}
function En(t, e, r) {
  if (t.type !== "text" && aa(e)) {
    const o = e.getDOMSlot(r);
    return [o.element, o.getFirstChildOffset() + t.offset];
  }
  return [Ml(r) || r, t.offset];
}
function ww(t) {
  for (const e of t) {
    const r = e.style;
    r.background !== "Highlight" && (r.background = "Highlight"), r.color !== "HighlightText" && (r.color = "HighlightText"), r.marginTop !== Ue(-1.5) && (r.marginTop = Ue(-1.5)), r.paddingTop !== Ue(4) && (r.paddingTop = Ue(4)), r.paddingBottom !== Ue(0) && (r.paddingBottom = Ue(0));
  }
}
function uw(t, e = ww) {
  let r = null, o = null, n = null, i = null, s = null, c = null, d = () => {
  };
  function l(w) {
    w.read(() => {
      const p = he();
      if (!He(p)) return r = null, n = null, i = null, c = null, d(), void (d = () => {
      });
      const [h, m] = function($) {
        const M = $.getStartEndPoints();
        return $.isBackward() ? [M[1], M[0]] : M;
      }(p), k = h.getNode(), g = k.getKey(), f = h.offset, N = m.getNode(), T = N.getKey(), P = m.offset, R = t.getElementByKey(g), U = t.getElementByKey(T), D = r === null || R !== o || f !== n || g !== r.getKey(), V = i === null || U !== s || P !== c || T !== i.getKey();
      if ((D || V) && R !== null && U !== null) {
        const $ = function(M, A, Y, J, et, y, at) {
          const C = (M._window ? M._window.document : document).createRange();
          return C.setStart(...En(A, Y, J)), C.setEnd(...En(et, y, at)), C;
        }(t, h, k, R, m, N, U);
        d(), d = dw(t, $, e);
      }
      r = k, o = R, n = f, i = N, s = U, c = P;
    });
  }
  return l(t.getEditorState()), Qe(t.registerUpdateListener(({ editorState: w }) => l(w)), () => {
    d();
  });
}
function pw(t, e) {
  let r = null;
  const o = () => {
    const n = getSelection(), i = n && n.anchorNode, s = t.getRootElement();
    i !== null && s !== null && s.contains(i) ? r !== null && (r(), r = null) : r === null && (r = uw(t, e));
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
function hw(t) {
  const e = Ci(t, (r) => aa(r) && !r.isInline());
  return aa(e) || Da(4, t.__key), e;
}
function gw(t) {
  const e = he() || _l();
  let r;
  if (He(e)) r = Nl(e.focus, "next");
  else {
    if (e != null) {
      const s = e.getNodes(), c = s[s.length - 1];
      c && (r = Ni(c, "next"));
    }
    r = r || Cl(hr(), "previous").getFlipped().insert(sa());
  }
  const o = fw(t, r), n = El(o), i = Tl(n) ? Rl(n) : o;
  return Sl(Ol(i)), t.getLatest();
}
function fw(t, e, r) {
  let o = gn(e, "next");
  for (let n = o; n; n = Dl(n, r)) o = n;
  return Il(o) && Da(283), o.insert(t.isInline() ? sa().append(t) : t), gn(Ni(t.getLatest(), "next"), e.direction);
}
function mw(t) {
  const e = he();
  if (!He(e)) return !1;
  const r = /* @__PURE__ */ new Set(), o = e.getNodes();
  for (let n = 0; n < o.length; n++) {
    const i = o[n], s = i.getKey();
    if (r.has(s)) continue;
    const c = Ci(i, (l) => aa(l) && !l.isInline());
    if (c === null) continue;
    const d = c.getKey();
    c.canIndent() && !r.has(d) && (r.add(d), t(c));
  }
  return r.size > 0;
}
const vw = Symbol.for("preact-signals");
function Ua() {
  if (Je > 1) return void Je--;
  let t, e = !1;
  for (!function() {
    let r = Ia;
    for (Ia = void 0; r !== void 0; ) r.S.v === r.v && (r.S.i = r.i), r = r.o;
  }(); ta !== void 0; ) {
    let r = ta;
    for (ta = void 0, Ma++; r !== void 0; ) {
      const o = r.u;
      if (r.u = void 0, r.f &= -3, !(8 & r.f) && Hi(r)) try {
        r.c();
      } catch (n) {
        e || (t = n, e = !0);
      }
      r = o;
    }
  }
  if (Ma = 0, Je--, e) throw t;
}
function bw(t) {
  if (Je > 0) return t();
  Co = ++xw, Je++;
  try {
    return t();
  } finally {
    Ua();
  }
}
let dt, ta;
function Tn(t) {
  const e = dt;
  dt = void 0;
  try {
    return t();
  } finally {
    dt = e;
  }
}
let Ia, Je = 0, Ma = 0, xw = 0, Co = 0, ya = 0;
function Rn(t) {
  if (dt === void 0) return;
  let e = t.n;
  return e === void 0 || e.t !== dt ? (e = { i: 0, S: t, p: dt.s, n: void 0, t: dt, e: void 0, x: void 0, r: e }, dt.s !== void 0 && (dt.s.n = e), dt.s = e, t.n = e, 32 & dt.f && t.S(e), e) : e.i === -1 ? (e.i = 0, e.n !== void 0 && (e.n.p = e.p, e.p !== void 0 && (e.p.n = e.n), e.p = dt.s, e.n = void 0, dt.s.n = e, dt.s = e), e) : void 0;
}
function ce(t, e) {
  this.v = t, this.i = 0, this.n = void 0, this.t = void 0, this.l = 0, this.W = e == null ? void 0 : e.watched, this.Z = e == null ? void 0 : e.unwatched, this.name = e == null ? void 0 : e.name;
}
function oa(t, e) {
  return new ce(t, e);
}
function Hi(t) {
  for (let e = t.s; e !== void 0; e = e.n) if (e.S.i !== e.i || !e.S.h() || e.S.i !== e.i) return !0;
  return !1;
}
function Sn(t) {
  for (let e = t.s; e !== void 0; e = e.n) {
    const r = e.S.n;
    if (r !== void 0 && (e.r = r), e.S.n = e, e.i = -1, e.n === void 0) {
      t.s = e;
      break;
    }
  }
}
function qi(t) {
  let e, r = t.s;
  for (; r !== void 0; ) {
    const o = r.p;
    r.i === -1 ? (r.S.U(r), o !== void 0 && (o.n = r.n), r.n !== void 0 && (r.n.p = o)) : e = r, r.S.n = r.r, r.r !== void 0 && (r.r = void 0), r = o;
  }
  t.s = e;
}
function mr(t, e) {
  ce.call(this, void 0), this.x = t, this.s = void 0, this.g = ya - 1, this.f = 4, this.W = e == null ? void 0 : e.watched, this.Z = e == null ? void 0 : e.unwatched, this.name = e == null ? void 0 : e.name;
}
function yw(t, e) {
  return new mr(t, e);
}
function Gi(t) {
  const e = t.m;
  if (t.m = void 0, typeof e == "function") {
    Je++;
    const r = dt;
    dt = void 0;
    try {
      e();
    } catch (o) {
      throw t.f &= -2, t.f |= 8, Wo(t), o;
    } finally {
      dt = r, Ua();
    }
  }
}
function Wo(t) {
  for (let e = t.s; e !== void 0; e = e.n) e.S.U(e);
  t.x = void 0, t.s = void 0, Gi(t);
}
function kw(t) {
  if (dt !== this) throw new Error("Out-of-order effect");
  qi(this), dt = t, this.f &= -2, 8 & this.f && Wo(this), Ua();
}
function Dr(t, e) {
  this.x = t, this.m = void 0, this.s = void 0, this.u = void 0, this.f = 32, this.name = e == null ? void 0 : e.name;
}
function qe(t, e) {
  const r = new Dr(t, e);
  try {
    r.c();
  } catch (n) {
    throw r.d(), n;
  }
  const o = r.d.bind(r);
  return o[Symbol.dispose] = o, o;
}
function Ur(t, e = {}) {
  const r = {};
  for (const o in t) {
    const n = e[o], i = oa(n === void 0 ? t[o] : n);
    r[o] = i;
  }
  return r;
}
ce.prototype.brand = vw, ce.prototype.h = function() {
  return !0;
}, ce.prototype.S = function(t) {
  const e = this.t;
  e !== t && t.e === void 0 && (t.x = e, this.t = t, e !== void 0 ? e.e = t : Tn(() => {
    var r;
    (r = this.W) == null || r.call(this);
  }));
}, ce.prototype.U = function(t) {
  if (this.t !== void 0) {
    const e = t.e, r = t.x;
    e !== void 0 && (e.x = r, t.e = void 0), r !== void 0 && (r.e = e, t.x = void 0), t === this.t && (this.t = r, r === void 0 && Tn(() => {
      var o;
      (o = this.Z) == null || o.call(this);
    }));
  }
}, ce.prototype.subscribe = function(t) {
  return qe(() => {
    const e = this.value, r = dt;
    dt = void 0;
    try {
      t(e);
    } finally {
      dt = r;
    }
  }, { name: "sub" });
}, ce.prototype.valueOf = function() {
  return this.value;
}, ce.prototype.toString = function() {
  return this.value + "";
}, ce.prototype.toJSON = function() {
  return this.value;
}, ce.prototype.peek = function() {
  const t = dt;
  dt = void 0;
  try {
    return this.value;
  } finally {
    dt = t;
  }
}, Object.defineProperty(ce.prototype, "value", { get() {
  const t = Rn(this);
  return t !== void 0 && (t.i = this.i), this.v;
}, set(t) {
  if (t !== this.v) {
    if (Ma > 100) throw new Error("Cycle detected");
    (function(e) {
      Je !== 0 && Ma === 0 && e.l !== Co && (e.l = Co, Ia = { S: e, v: e.v, i: e.i, o: Ia });
    })(this), this.v = t, this.i++, ya++, Je++;
    try {
      for (let e = this.t; e !== void 0; e = e.x) e.t.N();
    } finally {
      Ua();
    }
  }
} }), mr.prototype = new ce(), mr.prototype.h = function() {
  if (this.f &= -3, 1 & this.f) return !1;
  if ((36 & this.f) == 32 || (this.f &= -5, this.g === ya)) return !0;
  if (this.g = ya, this.f |= 1, this.i > 0 && !Hi(this)) return this.f &= -2, !0;
  const t = dt;
  try {
    Sn(this), dt = this;
    const e = this.x();
    (16 & this.f || this.v !== e || this.i === 0) && (this.v = e, this.f &= -17, this.i++);
  } catch (e) {
    this.v = e, this.f |= 16, this.i++;
  }
  return dt = t, qi(this), this.f &= -2, !0;
}, mr.prototype.S = function(t) {
  if (this.t === void 0) {
    this.f |= 36;
    for (let e = this.s; e !== void 0; e = e.n) e.S.S(e);
  }
  ce.prototype.S.call(this, t);
}, mr.prototype.U = function(t) {
  if (this.t !== void 0 && (ce.prototype.U.call(this, t), this.t === void 0)) {
    this.f &= -33;
    for (let e = this.s; e !== void 0; e = e.n) e.S.U(e);
  }
}, mr.prototype.N = function() {
  if (!(2 & this.f)) {
    this.f |= 6;
    for (let t = this.t; t !== void 0; t = t.x) t.t.N();
  }
}, Object.defineProperty(mr.prototype, "value", { get() {
  if (1 & this.f) throw new Error("Cycle detected");
  const t = Rn(this);
  if (this.h(), t !== void 0 && (t.i = this.i), 16 & this.f) throw this.v;
  return this.v;
} }), Dr.prototype.c = function() {
  const t = this.S();
  try {
    if (8 & this.f || this.x === void 0) return;
    const e = this.x();
    typeof e == "function" && (this.m = e);
  } finally {
    t();
  }
}, Dr.prototype.S = function() {
  if (1 & this.f) throw new Error("Cycle detected");
  this.f |= 1, this.f &= -9, Gi(this), Sn(this), Je++;
  const t = dt;
  return dt = this, kw.bind(this, t);
}, Dr.prototype.N = function() {
  2 & this.f || (this.f |= 2, this.u = ta, ta = this);
}, Dr.prototype.d = function() {
  this.f |= 8, 1 & this.f || Wo(this);
}, Dr.prototype.dispose = function() {
  this.d();
};
De({ build: (t, e, r) => Ur(e), config: Tr({ defaultSelection: "rootEnd", disabled: !1 }), name: "@lexical/extension/AutoFocus", register(t, e, r) {
  const o = r.getOutput();
  return qe(() => o.disabled.value ? void 0 : t.registerRootListener((n) => {
    t.focus(() => {
      const i = document.activeElement;
      n === null || i !== null && n.contains(i) || n.focus({ preventScroll: !0 });
    }, { defaultSelection: o.defaultSelection.peek() });
  }));
} });
function Wi() {
  const t = hr(), e = he(), r = sa();
  t.clear(), t.append(r), e !== null && r.select(), He(e) && (e.format = 0);
}
function Yi(t, e = Wi) {
  return t.registerCommand(Ei, (r) => (t.update(e), !0), Fo);
}
De({ build: (t, e, r) => Ur(e), config: Tr({ $onClear: Wi }), name: "@lexical/extension/ClearEditor", register(t, e, r) {
  const { $onClear: o } = r.getOutput();
  return qe(() => Yi(t, o.value));
} });
function _w(t) {
  return (typeof t.nodes == "function" ? t.nodes() : t.nodes) || [];
}
const eo = Al("format", { parse: (t) => typeof t == "number" ? t : 0 });
class Zi extends mo {
  $config() {
    return this.config("decorator-text", { extends: mo, stateConfigs: [{ flat: !0, stateConfig: eo }] });
  }
  getFormat() {
    return Wl(this, eo);
  }
  getFormatFlags(e, r) {
    return fn(this.getFormat(), e, r);
  }
  hasFormat(e) {
    const r = Yl[e];
    return (this.getFormat() & r) !== 0;
  }
  setFormat(e) {
    return Zl(this, eo, e);
  }
  toggleFormat(e) {
    const r = this.getFormat(), o = fn(r, e, null);
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
function Nw(t) {
  return t instanceof Zi;
}
De({ name: "@lexical/extension/DecoratorText", nodes: () => [Zi], register: (t, e, r) => t.registerCommand(Ti, (o) => {
  const n = he();
  if (Ri(n) || He(n)) for (const i of n.getNodes()) Nw(i) && i.toggleFormat(o);
  return !1;
}, Si) });
function Xi(t, e) {
  let r;
  return oa(t(), { unwatched() {
    r && (r(), r = void 0);
  }, watched() {
    this.value = t(), r = e(this);
  } });
}
const Eo = De({ build: (t) => Xi(() => t.getEditorState(), (e) => t.registerUpdateListener((r) => {
  e.value = r.editorState;
})), name: "@lexical/extension/EditorState" });
function gt(t, ...e) {
  const r = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const n of e) o.append("v", n);
  throw r.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
function Ji(t, e) {
  if (t && e && !Array.isArray(e) && typeof t == "object" && typeof e == "object") {
    const r = t, o = e;
    for (const n in o) r[n] = Ji(r[n], o[n]);
    return t;
  }
  return e;
}
const Yo = 0, To = 1, Qi = 2, ro = 3, ga = 4, Sr = 5, ao = 6, qr = 7;
function oo(t) {
  return t.id === Yo;
}
function ts(t) {
  return t.id === Qi;
}
function Cw(t) {
  return function(e) {
    return e.id === To;
  }(t) || gt(305, String(t.id), String(To)), Object.assign(t, { id: Qi });
}
const Ew = /* @__PURE__ */ new Set();
class Tw {
  constructor(e, r) {
    se(this, "builder");
    se(this, "configs");
    se(this, "_dependency");
    se(this, "_peerNameSet");
    se(this, "extension");
    se(this, "state");
    se(this, "_signal");
    this.builder = e, this.extension = r, this.configs = /* @__PURE__ */ new Set(), this.state = { id: Yo };
  }
  mergeConfigs() {
    let e = this.extension.config || {};
    const r = this.extension.mergeConfig ? this.extension.mergeConfig.bind(this.extension) : Pl;
    for (const o of this.configs) e = r(e, o);
    return e;
  }
  init(e) {
    const r = this.state;
    ts(r) || gt(306, String(r.id));
    const o = { getDependency: this.getInitDependency.bind(this), getDirectDependentNames: this.getDirectDependentNames.bind(this), getPeer: this.getInitPeer.bind(this), getPeerNameSet: this.getPeerNameSet.bind(this) }, n = { ...o, getDependency: this.getDependency.bind(this), getInitResult: this.getInitResult.bind(this), getPeer: this.getPeer.bind(this) }, i = function(c, d, l) {
      return Object.assign(c, { config: d, id: ro, registerState: l });
    }(r, this.mergeConfigs(), o);
    let s;
    this.state = i, this.extension.init && (s = this.extension.init(e, i.config, o)), this.state = function(c, d, l) {
      return Object.assign(c, { id: ga, initResult: d, registerState: l });
    }(i, s, n);
  }
  build(e) {
    const r = this.state;
    let o;
    r.id !== ga && gt(307, String(r.id), String(Sr)), this.extension.build && (o = this.extension.build(e, r.config, r.registerState));
    const n = { ...r.registerState, getOutput: () => o, getSignal: this.getSignal.bind(this) };
    this.state = function(i, s, c) {
      return Object.assign(i, { id: Sr, output: s, registerState: c });
    }(r, o, n);
  }
  register(e, r) {
    this._signal = r;
    const o = this.state;
    o.id !== Sr && gt(308, String(o.id), String(Sr));
    const n = this.extension.register && this.extension.register(e, o.config, o.registerState);
    return this.state = function(i) {
      return Object.assign(i, { id: ao });
    }(o), () => {
      const i = this.state;
      i.id !== qr && gt(309, String(o.id), String(qr)), this.state = function(s) {
        return Object.assign(s, { id: Sr });
      }(i), n && n();
    };
  }
  afterRegistration(e) {
    const r = this.state;
    let o;
    return r.id !== ao && gt(310, String(r.id), String(ao)), this.extension.afterRegistration && (o = this.extension.afterRegistration(e, r.config, r.registerState)), this.state = function(n) {
      return Object.assign(n, { id: qr });
    }(r), o;
  }
  getSignal() {
    return this._signal === void 0 && gt(311), this._signal;
  }
  getInitResult() {
    this.extension.init === void 0 && gt(312, this.extension.name);
    const e = this.state;
    return function(r) {
      return r.id >= ga;
    }(e) || gt(313, String(e.id), String(ga)), e.initResult;
  }
  getInitPeer(e) {
    const r = this.builder.extensionNameMap.get(e);
    return r ? r.getExtensionInitDependency() : void 0;
  }
  getExtensionInitDependency() {
    const e = this.state;
    return function(r) {
      return r.id >= ro;
    }(e) || gt(314, String(e.id), String(ro)), { config: e.config };
  }
  getPeer(e) {
    const r = this.builder.extensionNameMap.get(e);
    return r ? r.getExtensionDependency() : void 0;
  }
  getInitDependency(e) {
    const r = this.builder.getExtensionRep(e);
    return r === void 0 && gt(315, this.extension.name, e.name), r.getExtensionInitDependency();
  }
  getDependency(e) {
    const r = this.builder.getExtensionRep(e);
    return r === void 0 && gt(315, this.extension.name, e.name), r.getExtensionDependency();
  }
  getState() {
    const e = this.state;
    return function(r) {
      return r.id >= qr;
    }(e) || gt(316, String(e.id), String(qr)), e;
  }
  getDirectDependentNames() {
    return this.builder.incomingEdges.get(this.extension.name) || Ew;
  }
  getPeerNameSet() {
    let e = this._peerNameSet;
    return e || (e = new Set((this.extension.peerDependencies || []).map(([r]) => r)), this._peerNameSet = e), e;
  }
  getExtensionDependency() {
    if (!this._dependency) {
      const e = this.state;
      (function(r) {
        return r.id >= Sr;
      })(e) || gt(317, this.extension.name), this._dependency = { config: e.config, init: e.initResult, output: e.output };
    }
    return this._dependency;
  }
}
const On = { tag: jo };
function Rw() {
  const t = hr();
  t.isEmpty() && t.append(sa());
}
const Sw = De({ config: Tr({ setOptions: On, updateOptions: On }), init: ({ $initialEditorState: t = Rw }) => ({ $initialEditorState: t, initialized: !1 }), afterRegistration(t, { updateOptions: e, setOptions: r }, o) {
  const n = o.getInitResult();
  if (!n.initialized) {
    n.initialized = !0;
    const { $initialEditorState: i } = n;
    if (Bl(i)) t.setEditorState(i, r);
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
}, name: "@lexical/extension/InitialState", nodes: [$l, _i, Vl, Ll, ki] }), Dn = Symbol.for("@lexical/extension/LexicalBuilder");
function In() {
}
function Ow(t) {
  throw t;
}
function fa(t) {
  return Array.isArray(t) ? t : [t];
}
const no = "0.43.0+prod.esm";
class Pr {
  constructor(e) {
    se(this, "roots");
    se(this, "extensionNameMap");
    se(this, "outgoingConfigEdges");
    se(this, "incomingEdges");
    se(this, "conflicts");
    se(this, "_sortedExtensionReps");
    se(this, "PACKAGE_VERSION");
    this.outgoingConfigEdges = /* @__PURE__ */ new Map(), this.incomingEdges = /* @__PURE__ */ new Map(), this.extensionNameMap = /* @__PURE__ */ new Map(), this.conflicts = /* @__PURE__ */ new Map(), this.PACKAGE_VERSION = no, this.roots = e;
    for (const r of e) this.addExtension(r);
  }
  static fromExtensions(e) {
    const r = [fa(Sw)];
    for (const o of e) r.push(fa(o));
    return new Pr(r);
  }
  static maybeFromEditor(e) {
    const r = e[Dn];
    return r && (r.PACKAGE_VERSION !== no && gt(292, r.PACKAGE_VERSION, no), r instanceof Pr || gt(293)), r;
  }
  static fromEditor(e) {
    const r = Pr.maybeFromEditor(e);
    return r === void 0 && gt(294), r;
  }
  constructEditor() {
    const { $initialEditorState: e, onError: r, ...o } = this.buildCreateEditorArgs(), n = Object.assign(yi({ ...o, ...r ? { onError: (i) => {
      r(i, n);
    } } : {} }), { [Dn]: this });
    for (const i of this.sortedExtensionReps()) i.build(n);
    return n;
  }
  buildEditor() {
    let e = In;
    function r() {
      try {
        e();
      } finally {
        e = In;
      }
    }
    const o = Object.assign(this.constructEditor(), { dispose: r, [Symbol.dispose]: r });
    return e = Qe(this.registerEditor(o), () => o.setRootElement(null)), o;
  }
  hasExtensionByName(e) {
    return this.extensionNameMap.has(e);
  }
  getExtensionRep(e) {
    const r = this.extensionNameMap.get(e.name);
    if (r) return r.extension !== e && gt(295, e.name), r;
  }
  addEdge(e, r, o) {
    const n = this.outgoingConfigEdges.get(e);
    n ? n.set(r, o) : this.outgoingConfigEdges.set(e, /* @__PURE__ */ new Map([[r, o]]));
    const i = this.incomingEdges.get(r);
    i ? i.add(e) : this.incomingEdges.set(r, /* @__PURE__ */ new Set([e]));
  }
  addExtension(e) {
    this._sortedExtensionReps !== void 0 && gt(296);
    const r = fa(e), [o] = r;
    typeof o.name != "string" && gt(297, typeof o.name);
    let n = this.extensionNameMap.get(o.name);
    if (n !== void 0 && n.extension !== o && gt(298, o.name), !n) {
      n = new Tw(this, o), this.extensionNameMap.set(o.name, n);
      const i = this.conflicts.get(o.name);
      typeof i == "string" && gt(299, o.name, i);
      for (const s of o.conflictsWith || []) this.extensionNameMap.has(s) && gt(299, o.name, s), this.conflicts.set(s, o.name);
      for (const s of o.dependencies || []) {
        const c = fa(s);
        this.addEdge(o.name, c[0].name, c.slice(1)), this.addExtension(c);
      }
      for (const [s, c] of o.peerDependencies || []) this.addEdge(o.name, s, c ? [c] : []);
    }
  }
  sortedExtensionReps() {
    if (this._sortedExtensionReps) return this._sortedExtensionReps;
    const e = [], r = (o, n) => {
      let i = o.state;
      if (ts(i)) return;
      const s = o.extension.name;
      var c;
      oo(i) || gt(300, s, n || "[unknown]"), oo(c = i) || gt(304, String(c.id), String(Yo)), i = Object.assign(c, { id: To }), o.state = i;
      const d = this.outgoingConfigEdges.get(s);
      if (d) for (const l of d.keys()) {
        const w = this.extensionNameMap.get(l);
        w && r(w, s);
      }
      i = Cw(i), o.state = i, e.push(o);
    };
    for (const o of this.extensionNameMap.values()) oo(o.state) && r(o);
    for (const o of e) for (const [n, i] of this.outgoingConfigEdges.get(o.extension.name) || []) if (i.length > 0) {
      const s = this.extensionNameMap.get(n);
      if (s) for (const c of i) s.configs.add(c);
    }
    for (const [o, ...n] of this.roots) if (n.length > 0) {
      const i = this.extensionNameMap.get(o.name);
      i === void 0 && gt(301, o.name);
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
    return Qe(...n);
  }
  buildCreateEditorArgs() {
    const e = {}, r = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map(), i = {}, s = {}, c = this.sortedExtensionReps();
    for (const w of c) {
      const { extension: p } = w;
      if (p.onError !== void 0 && (e.onError = p.onError), p.disableEvents !== void 0 && (e.disableEvents = p.disableEvents), p.parentEditor !== void 0 && (e.parentEditor = p.parentEditor), p.editable !== void 0 && (e.editable = p.editable), p.namespace !== void 0 && (e.namespace = p.namespace), p.$initialEditorState !== void 0 && (e.$initialEditorState = p.$initialEditorState), p.nodes) for (const h of _w(p)) {
        if (typeof h != "function") {
          const m = o.get(h.replace);
          m && gt(302, p.name, h.replace.name, m.extension.name), o.set(h.replace, w);
        }
        r.add(h);
      }
      if (p.html) {
        if (p.html.export) for (const [h, m] of p.html.export.entries()) n.set(h, m);
        p.html.import && Object.assign(i, p.html.import);
      }
      p.theme && Ji(s, p.theme);
    }
    Object.keys(s).length > 0 && (e.theme = s), r.size && (e.nodes = [...r]);
    const d = Object.keys(i).length > 0, l = n.size > 0;
    (d || l) && (e.html = {}, d && (e.html.import = i), l && (e.html.export = n));
    for (const w of c) w.init(e);
    return e.onError || (e.onError = Ow), e;
  }
}
const Dw = /* @__PURE__ */ new Set(), Mn = De({ build(t, e, r) {
  const o = r.getDependency(Eo).output, n = oa({ watchedNodeKeys: /* @__PURE__ */ new Map() }), i = Xi(() => {
  }, () => qe(() => {
    const s = i.peek(), { watchedNodeKeys: c } = n.value;
    let d, l = !1;
    o.value.read(() => {
      if (he()) for (const [w, p] of c.entries()) {
        if (p.size === 0) {
          c.delete(w);
          continue;
        }
        const h = Jl(w), m = h && h.isSelected() || !1;
        l = l || m !== (!!s && s.has(w)), m && (d = d || /* @__PURE__ */ new Set(), d.add(w));
      }
    }), !l && d && s && d.size === s.size || (i.value = d);
  }));
  return { watchNodeKey: function(s) {
    const c = yw(() => (i.value || Dw).has(s)), { watchedNodeKeys: d } = n.peek();
    let l = d.get(s);
    const w = l !== void 0;
    return l = l || /* @__PURE__ */ new Set(), l.add(c), w || (d.set(s, l), n.value = { watchedNodeKeys: d }), c;
  } };
}, dependencies: [Eo], name: "@lexical/extension/NodeSelection" }), Iw = jl("INSERT_HORIZONTAL_RULE_COMMAND");
class Ar extends mo {
  static getType() {
    return "horizontalrule";
  }
  static clone(e) {
    return new Ar(e.__key);
  }
  static importJSON(e) {
    return Zo().updateFromJSON(e);
  }
  static importDOM() {
    return { hr: () => ({ conversion: Mw, priority: 0 }) };
  }
  exportDOM() {
    return { element: document.createElement("hr") };
  }
  createDOM(e) {
    const r = document.createElement("hr");
    return Oi(r, e.theme.hr), r;
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
function Mw() {
  return { node: Zo() };
}
function Zo() {
  return Xl(Ar);
}
function zw(t) {
  return t instanceof Ar;
}
De({ dependencies: [Eo, Mn], name: "@lexical/extension/HorizontalRule", nodes: () => [Ar], register(t, e, r) {
  const { watchNodeKey: o } = r.getDependency(Mn).output, n = oa({ nodeSelections: /* @__PURE__ */ new Map() }), i = t._config.theme.hrSelected ?? "selected";
  return Qe(t.registerCommand(Iw, (s) => {
    const c = he();
    if (!He(c)) return !1;
    if (c.focus.getNode() !== null) {
      const d = Zo();
      gw(d);
    }
    return !0;
  }, Fo), t.registerCommand(Fl, (s) => {
    if (Ul(s.target)) {
      const c = Kl(s.target);
      if (zw(c)) return function(d, l = !1) {
        const w = he(), p = d.isSelected(), h = d.getKey();
        let m;
        l && Ri(w) ? m = w : (m = Hl(), ql(m)), p ? m.delete(h) : m.add(h);
      }(c, s.shiftKey), !0;
    }
    return !1;
  }, Si), t.registerMutationListener(Ar, (s, c) => {
    bw(() => {
      let d = !1;
      const { nodeSelections: l } = n.peek();
      for (const [w, p] of s.entries()) if (p === "destroyed") l.delete(w), d = !0;
      else {
        const h = l.get(w), m = t.getElementByKey(w);
        h ? h.domNode.value = m : (d = !0, l.set(w, { domNode: oa(m), selectedSignal: o(w) }));
      }
      d && (n.value = { nodeSelections: l });
    });
  }), qe(() => {
    const s = [];
    for (const { domNode: c, selectedSignal: d } of n.value.nodeSelections.values()) s.push(qe(() => {
      const l = c.value;
      l && (d.value ? Oi(l, i) : Ql(l, i));
    }));
    return Qe(...s);
  }));
} });
De({ build: (t, e) => Ur({ inheritEditableFromParent: e.inheritEditableFromParent }), config: Tr({ $getParentEditor: function() {
  const t = Gl();
  return Pr.fromEditor(t), t;
}, inheritEditableFromParent: !1 }), init: (t, e, r) => {
  const o = e.$getParentEditor();
  t.parentEditor = o, t.theme = t.theme || o._config.theme;
}, name: "@lexical/extension/NestedEditor", register: (t, e, r) => qe(() => {
  const o = t._parentEditor;
  if (o && r.getOutput().inheritEditableFromParent.value) return t.setEditable(o.isEditable()), o.registerEditableListener(t.setEditable.bind(t));
}) });
De({ build: (t, e, r) => Ur(e), config: Tr({ disabled: !1, onReposition: void 0 }), name: "@lexical/utils/SelectionAlwaysOnDisplay", register: (t, e, r) => {
  const o = r.getOutput();
  return qe(() => {
    if (!o.disabled.value) return pw(t, o.onReposition.value);
  });
} });
function es(t) {
  return t.canBeEmpty();
}
function Pw(t, e, r = es) {
  return Qe(t.registerCommand(td, (o) => {
    const n = he();
    if (!He(n)) return !1;
    o.preventDefault();
    const i = function(s) {
      if (s.getNodes().filter((h) => ed(h) && h.canIndent()).length > 0) return !0;
      const c = s.anchor, d = s.focus, l = d.isBefore(c) ? d : c, w = l.getNode(), p = hw(w);
      if (p.canIndent()) {
        const h = p.getKey();
        let m = rd();
        if (m.anchor.set(h, 0, "element"), m.focus.set(h, 0, "element"), m = ad(m), m.anchor.is(l)) return !0;
      }
      return !1;
    }(n) ? o.shiftKey ? od : mn : nd;
    return t.dispatchCommand(i, void 0);
  }, Fo), t.registerCommand(mn, () => {
    const o = typeof e == "number" ? e : e ? e.peek() : null, n = he();
    if (!He(n)) return !1;
    const i = typeof r == "function" ? r : r.peek();
    return mw((s) => {
      if (i(s)) {
        const c = s.getIndent() + 1;
        (!o || c < o) && s.setIndent(c);
      }
    });
  }, Uo));
}
De({ build: (t, e, r) => Ur(e), config: Tr({ $canIndent: es, disabled: !1, maxIndent: null }), name: "@lexical/extension/TabIndentation", register(t, e, r) {
  const { disabled: o, maxIndent: n, $canIndent: i } = r.getOutput();
  return qe(() => {
    if (!o.value) return Pw(t, n, i);
  });
} });
const Aw = De({ name: "@lexical/react/ReactProvider" });
function $w() {
  return hr().getTextContent();
}
function Vw(t, e = !0) {
  if (t) return !1;
  let r = $w();
  return e && (r = r.trim()), r === "";
}
function Lw(t) {
  if (!Vw(t, !1)) return !1;
  const e = hr().getChildren(), r = e.length;
  if (r > 1) return !1;
  for (let o = 0; o < r; o++) {
    const n = e[o];
    if (id(n)) return !1;
    if (aa(n)) {
      if (!sd(n) || n.__indent !== 0) return !1;
      const i = n.getChildren(), s = i.length;
      for (let c = 0; c < s; c++) {
        const d = i[o];
        if (!vo(d)) return !1;
      }
    }
  }
  return !0;
}
function rs(t) {
  return () => Lw(t);
}
function as(t) {
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
            const [l, w, p, h, m] = d;
            t.update(() => {
              const k = he();
              if (He(k)) {
                const g = k.anchor;
                let f = g.getNode(), N = 0, T = 0;
                if (vo(f) && l >= 0 && w >= 0 && (N = l, T = l + w, k.setTextNodeRange(f, N, f, T)), N === T && p === "" || (k.insertRawText(p), f = g.getNode()), vo(f)) {
                  N = h, T = h + m;
                  const P = f.getTextContentSize();
                  N = N > P ? P : N, T = T > P ? P : T, k.setTextNodeRange(f, N, f, T);
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
De({ build: (t, e, r) => Ur(e), config: Tr({ disabled: typeof window > "u" }), name: "@lexical/dragon", register: (t, e, r) => qe(() => r.getOutput().disabled.value ? void 0 : as(t)) });
function Bw(t, ...e) {
  const r = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const n of e) o.append("v", n);
  throw r.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
const Xo = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Kt : q;
function jw({ editor: t, ErrorBoundary: e }) {
  return function(r, o) {
    const [n, i] = E(() => r.getDecorators());
    return Xo(() => r.registerDecoratorListener((s) => {
      ud(() => {
        i(s);
      });
    }), [r]), q(() => {
      i(r.getDecorators());
    }, [r]), B(() => {
      const s = [], c = Object.keys(n);
      for (let d = 0; d < c.length; d++) {
        const l = c[d], w = a(o, { onError: (h) => r._onError(h), children: a(ul, { fallback: null, children: n[l] }) }), p = r.getElementByKey(l);
        p !== null && s.push(pd(w, p, l));
      }
      return s;
    }, [o, n, r]);
  }(t, e);
}
function Fw({ editor: t, ErrorBoundary: e }) {
  return function(r) {
    const o = Pr.maybeFromEditor(r);
    if (o && o.hasExtensionByName(Aw.name)) {
      for (const n of ["@lexical/plain-text", "@lexical/rich-text"]) o.hasExtensionByName(n) && Bw(320, n);
      return !0;
    }
    return !1;
  }(t) ? null : a(jw, { editor: t, ErrorBoundary: e });
}
function zn(t) {
  return t.getEditorState().read(rs(t.isComposing()));
}
function Uw({ contentEditable: t, placeholder: e = null, ErrorBoundary: r }) {
  const [o] = We();
  return function(n) {
    Xo(() => Qe(wd(n), as(n)), [n]);
  }(o), u(mt, { children: [t, a(Kw, { content: e }), a(Fw, { editor: o, ErrorBoundary: r })] });
}
function Kw({ content: t }) {
  const [e] = We(), r = function(n) {
    const [i, s] = E(() => zn(n));
    return Xo(() => {
      function c() {
        const d = zn(n);
        s(d);
      }
      return c(), Qe(n.registerUpdateListener(() => {
        c();
      }), n.registerEditableListener(() => {
        c();
      }));
    }, [n]), i;
  }(e), o = iw();
  return r ? typeof t == "function" ? t(o) : t : null;
}
function Hw({ defaultSelection: t }) {
  const [e] = We();
  return q(() => {
    e.focus(() => {
      const r = document.activeElement, o = e.getRootElement();
      o === null || r !== null && o.contains(r) || o.focus({ preventScroll: !0 });
    }, { defaultSelection: t });
  }, [t, e]), null;
}
const qw = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Kt : q;
function Gw({ onClear: t }) {
  const [e] = We();
  return qw(() => Yi(e, t), [e, t]), null;
}
const os = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Kt : q;
function Ww({ editor: t, ariaActiveDescendant: e, ariaAutoComplete: r, ariaControls: o, ariaDescribedBy: n, ariaErrorMessage: i, ariaExpanded: s, ariaInvalid: c, ariaLabel: d, ariaLabelledBy: l, ariaMultiline: w, ariaOwns: p, ariaRequired: h, autoCapitalize: m, className: k, id: g, role: f = "textbox", spellCheck: N = !0, style: T, tabIndex: P, "data-testid": R, ...U }, D) {
  const [V, $] = E(t.isEditable()), M = L((Y) => {
    Y && Y.ownerDocument && Y.ownerDocument.defaultView ? t.setRootElement(Y) : t.setRootElement(null);
  }, [t]), A = B(() => /* @__PURE__ */ function(...Y) {
    return (J) => {
      for (const et of Y) typeof et == "function" ? et(J) : et != null && (et.current = J);
    };
  }(D, M), [M, D]);
  return os(() => ($(t.isEditable()), t.registerEditableListener((Y) => {
    $(Y);
  })), [t]), a("div", { "aria-activedescendant": V ? e : void 0, "aria-autocomplete": V ? r : "none", "aria-controls": V ? o : void 0, "aria-describedby": n, ...i != null ? { "aria-errormessage": i } : {}, "aria-expanded": V && f === "combobox" ? !!s : void 0, ...c != null ? { "aria-invalid": c } : {}, "aria-label": d, "aria-labelledby": l, "aria-multiline": w, "aria-owns": V ? p : void 0, "aria-readonly": !V || void 0, "aria-required": h, autoCapitalize: m, className: k, contentEditable: V, "data-testid": R, id: g, ref: A, role: f, spellCheck: N, style: T, tabIndex: P, ...U });
}
const Yw = Bo(Ww);
function Pn(t) {
  return t.getEditorState().read(rs(t.isComposing()));
}
const Zw = Bo(Xw);
function Xw(t, e) {
  const { placeholder: r, ...o } = t, [n] = We();
  return u(mt, { children: [a(Yw, { editor: n, ...o, ref: e }), r != null && a(Jw, { editor: n, content: r })] });
}
function Jw({ content: t, editor: e }) {
  const r = function(s) {
    const [c, d] = E(() => Pn(s));
    return os(() => {
      function l() {
        const w = Pn(s);
        d(w);
      }
      return l(), Qe(s.registerUpdateListener(() => {
        l();
      }), s.registerEditableListener(() => {
        l();
      }));
    }, [s]), c;
  }(e), [o, n] = E(e.isEditable());
  if (Kt(() => (n(e.isEditable()), e.registerEditableListener((s) => {
    n(s);
  })), [e]), !r) return null;
  let i = null;
  return typeof t == "function" ? i = t(o) : t !== null && (i = t), i === null ? null : a("div", { "aria-hidden": !0, children: i });
}
function Qw({
  placeholder: t,
  className: e,
  placeholderClassName: r
}) {
  return /* @__PURE__ */ a(
    Zw,
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
const ns = Fr(void 0);
function tu({
  activeEditor: t,
  $updateToolbar: e,
  blockType: r,
  setBlockType: o,
  showModal: n,
  children: i
}) {
  const s = B(
    () => ({
      activeEditor: t,
      $updateToolbar: e,
      blockType: r,
      setBlockType: o,
      showModal: n
    }),
    [t, e, r, o, n]
  );
  return /* @__PURE__ */ a(ns.Provider, { value: s, children: i });
}
function is() {
  const t = ia(ns);
  if (!t)
    throw new Error("useToolbarContext must be used within a ToolbarContext provider");
  return t;
}
function eu() {
  const [t, e] = E(void 0), r = L(() => {
    e(void 0);
  }, []), o = B(() => {
    if (t === void 0)
      return;
    const { title: i, content: s } = t;
    return /* @__PURE__ */ a(wo, { open: !0, onOpenChange: r, children: /* @__PURE__ */ u(uo, { children: [
      /* @__PURE__ */ a(po, { children: /* @__PURE__ */ a(ho, { children: i }) }),
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
function ru({
  children: t
}) {
  const [e] = We(), [r, o] = E(e), [n, i] = E("paragraph"), [s, c] = eu(), d = () => {
  };
  return q(() => r.registerCommand(
    Di,
    (l, w) => (o(w), !1),
    Uo
  ), [r]), /* @__PURE__ */ u(
    tu,
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
function au(t) {
  const [e] = We(), { activeEditor: r } = is();
  q(() => r.registerCommand(
    Di,
    () => {
      const o = he();
      return o && t(o), !1;
    },
    Uo
  ), [e, t]), q(() => {
    r.getEditorState().read(() => {
      const o = he();
      o && t(o);
    });
  }, [r, t]);
}
const ou = Ho(
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
), ss = Zt.createContext({
  size: "default",
  variant: "default",
  spacing: 0,
  orientation: "horizontal"
});
function cs({
  className: t,
  variant: e,
  size: r,
  spacing: o = 0,
  orientation: n = "horizontal",
  children: i,
  ...s
}) {
  const c = $e();
  return /* @__PURE__ */ a(
    Ii.Root,
    {
      "data-slot": "toggle-group",
      "data-variant": e,
      "data-size": r,
      "data-spacing": o,
      "data-orientation": n,
      style: { "--gap": o },
      className: x(
        "pr-twp tw:group/toggle-group tw:flex tw:w-fit tw:flex-row tw:items-center tw:gap-[--spacing(var(--gap))] tw:rounded-lg tw:data-[size=sm]:rounded-[min(var(--tw-radius-md),10px)] tw:data-vertical:flex-col tw:data-vertical:items-stretch",
        t
      ),
      dir: c,
      ...s,
      children: /* @__PURE__ */ a(
        ss.Provider,
        {
          value: Zt.useMemo(
            () => ({ variant: e, size: r, spacing: o, orientation: n }),
            [e, r, o, n]
          ),
          children: i
        }
      )
    }
  );
}
function ka({
  className: t,
  children: e,
  variant: r = "default",
  size: o = "default",
  ...n
}) {
  const i = Zt.useContext(ss);
  return /* @__PURE__ */ a(
    Ii.Item,
    {
      "data-slot": "toggle-group-item",
      "data-variant": i.variant || r,
      "data-size": i.size || o,
      "data-spacing": i.spacing,
      className: x(
        "tw:shrink-0 tw:group-data-[spacing=0]/toggle-group:rounded-none tw:group-data-[spacing=0]/toggle-group:px-2 tw:focus:z-10 tw:focus-visible:z-10 tw:group-data-[spacing=0]/toggle-group:has-data-[icon=inline-end]:pe-1.5 tw:group-data-[spacing=0]/toggle-group:has-data-[icon=inline-start]:ps-1.5 tw:group-data-horizontal/toggle-group:data-[spacing=0]:first:rounded-s-lg tw:group-data-vertical/toggle-group:data-[spacing=0]:first:rounded-t-lg tw:group-data-horizontal/toggle-group:data-[spacing=0]:last:rounded-e-lg tw:group-data-vertical/toggle-group:data-[spacing=0]:last:rounded-b-lg tw:group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:border-s-0 tw:group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0 tw:group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-s tw:group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t",
        ou({
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
const An = [
  { format: "bold", icon: yc, label: "Bold" },
  { format: "italic", icon: kc, label: "Italic" }
  // CUSTOM: TJ removed underline and strikethrough as they are not supported by the current comment
  // data conversion and are not in P9 anyway. We can add these back if we ever get this supported.
  /* { format: 'underline', icon: UnderlineIcon, label: 'Underline' },
  { format: 'strikethrough', icon: StrikethroughIcon, label: 'Strikethrough' }, */
];
function nu() {
  const { activeEditor: t } = is(), [e, r] = E([]), o = L((n) => {
    if (He(n) || hd(n)) {
      const i = [];
      An.forEach(({ format: s }) => {
        n.hasFormat(s) && i.push(s);
      }), r((s) => s.length !== i.length || !i.every((c) => s.includes(c)) ? i : s);
    }
  }, []);
  return au(o), /* @__PURE__ */ a(
    cs,
    {
      type: "multiple",
      value: e,
      onValueChange: r,
      variant: "outline",
      size: "sm",
      children: An.map(({ format: n, icon: i, label: s }) => /* @__PURE__ */ a(
        ka,
        {
          value: n,
          "aria-label": s,
          onClick: () => {
            t.dispatchCommand(Ti, n);
          },
          children: /* @__PURE__ */ a(i, { className: "tw:h-4 tw:w-4" })
        },
        n
      ))
    }
  );
}
const ls = "data-platform-content-zoom-root", eg = "data-platform-content-zoom-scope", ds = "data-platform-content-zoom-label", ws = Fr(void 0);
function rg({ area: t, label: e, children: r }) {
  const o = B(
    () => ({
      [ls]: t ?? "",
      // An empty label names nothing, so it writes no attribute, as on `ContentZoomRoot`.
      ...e ? { [ds]: e } : {}
    }),
    [t, e]
  );
  return /* @__PURE__ */ a(ws.Provider, { value: o, children: r });
}
function Kr() {
  return ia(ws) ?? {};
}
function iu({ onClear: t }) {
  const [e] = We();
  q(() => {
    t && t(() => {
      e.dispatchCommand(Ei, void 0);
    });
  }, [e, t]);
}
function su({
  placeholder: t = "Start typing ...",
  autoFocus: e = !1,
  onClear: r,
  actions: o
}) {
  const n = Kr(), [, i] = E(void 0);
  return /* @__PURE__ */ u("div", { className: "tw:relative", children: [
    /* @__PURE__ */ a(ru, { children: () => (
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
          children: /* @__PURE__ */ a(nu, {})
        }
      )
    ) }),
    /* @__PURE__ */ u("div", { className: "tw:relative", children: [
      /* @__PURE__ */ a(
        Uw,
        {
          contentEditable: (
            // CUSTOM: Spread the content-zoom text marker onto the content-editable wrapper so text
            // typed into a comment zooms like the saved note beside it, while the format toolbar
            // above and the actions below keep interface scale. It marks nothing outside a
            // ContentZoomTextProvider (the Scripture editor's comment pop-up has none).
            /* @__PURE__ */ a(
              "div",
              {
                ref: (c) => {
                  c !== void 0 && i(c);
                },
                ...n,
                children: /* @__PURE__ */ a(Qw, { placeholder: t })
              }
            )
          ),
          ErrorBoundary: aw
        }
      ),
      e && /* @__PURE__ */ a(Hw, { defaultSelection: "rootEnd" }),
      /* @__PURE__ */ a(iu, { onClear: r }),
      /* @__PURE__ */ a(Gw, {})
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
const cu = {
  namespace: "commentEditor",
  theme: qo,
  nodes: Go,
  onError: (t) => {
    console.error(t);
  }
};
function za({
  editorState: t,
  editorSerializedState: e,
  onChange: r,
  onSerializedChange: o,
  placeholder: n = "Start typing…",
  autoFocus: i = !1,
  onClear: s,
  className: c,
  actions: d
}) {
  const [l] = E(() => ({
    ...cu,
    ...t ? { editorState: t } : {},
    ...e ? { editorState: JSON.stringify(e) } : {}
  })), w = L(
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
        className: x(
          "pr-twp tw:overflow-hidden tw:rounded-lg tw:border tw:bg-background tw:shadow",
          c
        ),
        children: /* @__PURE__ */ a(Xd, { initialConfig: l, children: /* @__PURE__ */ u(Vt, { children: [
          /* @__PURE__ */ a(
            su,
            {
              placeholder: n,
              autoFocus: i,
              onClear: s,
              actions: d
            }
          ),
          /* @__PURE__ */ a(Qd, { ignoreSelectionChange: !0, onChange: w })
        ] }) })
      }
    )
  );
}
function us(t) {
  const e = t.querySelector('[contenteditable="true"]');
  if (!e) return !1;
  e.focus();
  const r = window.getSelection(), o = document.createRange();
  return o.selectNodeContents(e), o.collapse(!1), r == null || r.removeAllRanges(), r == null || r.addRange(o), !0;
}
function ps(t) {
  return t ? t.some(
    (e) => e && "text" in e && e.text.trim().length > 0 ? !0 : !e || !("children" in e) ? !1 : ps(e.children)
  ) : !1;
}
function Ne(t) {
  var e;
  return (e = t == null ? void 0 : t.root) != null && e.children ? ps(t.root.children) : !1;
}
function lu(t) {
  if (!t || t.trim() === "")
    throw new Error("Input HTML is empty");
  const e = Mi({
    namespace: "EditorUtils",
    theme: qo,
    nodes: Go,
    onError: (o) => {
      console.error(o);
    }
  });
  let r;
  if (e.update(
    () => {
      const n = new DOMParser().parseFromString(t, "text/html"), i = fd(e, n);
      hr().clear(), cd(i);
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
function Pa(t) {
  const e = Mi({
    namespace: "EditorUtils",
    theme: qo,
    nodes: Go,
    onError: (n) => {
      console.error(n);
    }
  }), r = e.parseEditorState(JSON.stringify(t));
  e.setEditorState(r);
  let o = "";
  return e.getEditorState().read(() => {
    o = gd(e);
  }), o = o.replace(/\s+style="[^"]*"/g, "").replace(/\s+class="[^"]*"/g, "").replace(/<span>(.*?)<\/span>/g, "$1").replace(/<b><strong[^>]*>(.*?)<\/strong><\/b>/g, "<b>$1</b>").replace(/<strong><b[^>]*>(.*?)<\/b><\/strong>/g, "<b>$1</b>").replace(/<i><em[^>]*>(.*?)<\/em><\/i>/g, "<i>$1</i>").replace(/<em><i[^>]*>(.*?)<\/i><\/em>/g, "<i>$1</i>").replace(/<u><span[^>]*>(.*?)<\/span><\/u>/g, "<u>$1</u>").replace(/<s><span[^>]*>(.*?)<\/span><\/s>/g, "<s>$1</s>").replace(/<br\s*\/?>/gi, "<br/>"), o;
}
function Jo(t) {
  return ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Home", "End"].includes(t.key) ? (t.stopPropagation(), !0) : !1;
}
const hs = Object.freeze([
  "%cancelButton_tooltip%",
  "%acceptButton_tooltip%"
]), $n = (t, e) => t[e] ?? e;
function gs({
  onCancelClick: t,
  onAcceptClick: e,
  canAccept: r = !0,
  localizedStrings: o = {},
  className: n = "tw:h-6 tw:w-6",
  acceptLabel: i
}) {
  const s = $n(o, "%cancelButton_tooltip%"), c = i ?? $n(o, "%acceptButton_tooltip%");
  return /* @__PURE__ */ u(Va, { children: [
    /* @__PURE__ */ a(Vt, { children: /* @__PURE__ */ u(vt, { children: [
      /* @__PURE__ */ a(bt, { asChild: !0, children: /* @__PURE__ */ a(
        rt,
        {
          "aria-label": s,
          className: n,
          size: "icon",
          onClick: t,
          variant: "secondary",
          children: /* @__PURE__ */ a(li, {})
        }
      ) }),
      /* @__PURE__ */ a(xt, { children: /* @__PURE__ */ a("p", { children: s }) })
    ] }) }),
    /* @__PURE__ */ a(Oo, {}),
    /* @__PURE__ */ a(Vt, { children: /* @__PURE__ */ u(vt, { children: [
      /* @__PURE__ */ a(bt, { asChild: !0, children: /* @__PURE__ */ a(
        rt,
        {
          "aria-label": c,
          className: n,
          size: "icon",
          onClick: e,
          disabled: !r,
          children: /* @__PURE__ */ a(pr, {})
        }
      ) }),
      /* @__PURE__ */ a(xt, { children: /* @__PURE__ */ a("p", { children: c }) })
    ] }) })
  ] });
}
const du = "verseText", ag = Object.freeze([
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
function Zr(t) {
  return t !== void 0 && Object.keys(t).length > 0;
}
function Vn(t) {
  return t.editorState === void 0 && t.assignedUser === void 0 && !Zr(t.commentEdits);
}
const fs = [
  "tw:prose tw:max-w-none tw:break-words tw:text-sm tw:font-normal tw:text-foreground",
  "tw:[&>blockquote]:border-s-0 tw:[&>blockquote]:p-0 tw:[&>blockquote]:ps-0 tw:[&>blockquote]:font-normal tw:[&>blockquote]:not-italic tw:[&>blockquote]:text-foreground",
  "tw:prose-quoteless"
].join(" ");
function ms(t) {
  return (t == null ? void 0 : t.conflictType) === du;
}
function vs(t) {
  return t === "replaced" ? "reject" : t === "merged" ? "merged" : "accept";
}
function _a(t, e) {
  return t === "" ? e["%comment_assign_unassigned%"] ?? "Unassigned" : t === "Team" ? e["%comment_assign_team%"] ?? "Team" : t;
}
function Qo(t) {
  const e = Io();
  return t.key === "Enter" && (e && t.metaKey || !e && t.ctrlKey);
}
function Oe(t, e, r) {
  const o = e[t];
  return o === void 0 || o === t ? r : o;
}
const wu = {
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
}, uu = {
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
function io(t, e) {
  return t === "" ? e["%commentEditor_unassigned%"] ?? "Unassigned" : t === "Team" ? e["%commentEditor_team%"] ?? "Team" : t;
}
function og({
  assignableUsers: t,
  onSave: e,
  onClose: r,
  localizedStrings: o,
  initialAssignedUser: n
}) {
  const [i, s] = E(uu), [c, d] = E(n), [l, w] = E(!1), p = I(void 0), h = I(null);
  q(() => {
    let f = !0;
    const N = h.current;
    if (!N) return;
    const T = setTimeout(() => {
      f && us(N);
    }, 300);
    return () => {
      f = !1, clearTimeout(T);
    };
  }, []);
  const m = L(() => {
    if (!Ne(i)) return;
    const f = Pa(i);
    e(f, c);
  }, [i, e, c]), k = o["%commentEditor_placeholder%"] ?? "Type your comment here...", g = o["%commentEditor_assignTo_label%"] ?? "Assign to";
  return /* @__PURE__ */ u("div", { className: "pr-twp tw:grid tw:gap-3", children: [
    /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:justify-between", children: [
      /* @__PURE__ */ a("span", { className: "tw:text-sm tw:font-medium", children: g }),
      /* @__PURE__ */ a(
        gs,
        {
          onCancelClick: r,
          onAcceptClick: m,
          canAccept: Ne(i),
          localizedStrings: o,
          acceptLabel: o["%commentEditor_saveButton_tooltip%"]
        }
      )
    ] }),
    /* @__PURE__ */ a("div", { className: "tw:flex tw:items-center tw:gap-2", children: /* @__PURE__ */ u(_r, { open: l, onOpenChange: w, children: [
      /* @__PURE__ */ a(jr, { asChild: !0, children: /* @__PURE__ */ u(
        rt,
        {
          variant: "outline",
          className: "tw:flex tw:w-full tw:items-center tw:justify-start tw:gap-2",
          disabled: t.length === 0,
          children: [
            /* @__PURE__ */ a(di, { className: "tw:h-4 tw:w-4" }),
            /* @__PURE__ */ a("span", { children: io(c !== void 0 ? c : "", o) })
          ]
        }
      ) }),
      /* @__PURE__ */ a(
        Nr,
        {
          className: "tw:w-auto tw:p-0",
          align: "start",
          onKeyDown: (f) => {
            f.key === "Escape" && (f.stopPropagation(), w(!1));
          },
          children: /* @__PURE__ */ a(Cr, { children: /* @__PURE__ */ a(Er, { children: t.map((f) => /* @__PURE__ */ a(
            gr,
            {
              onSelect: () => {
                d(f || void 0), w(!1);
              },
              className: "tw:flex tw:items-center",
              children: /* @__PURE__ */ a("span", { children: io(f, o) })
            },
            f || "unassigned"
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
        onKeyDownCapture: (f) => {
          f.key === "Escape" ? (f.preventDefault(), f.stopPropagation(), r()) : Qo(f) && (f.preventDefault(), f.stopPropagation(), Ne(i) && m());
        },
        onKeyDown: (f) => {
          Jo(f), (f.key === "Enter" || f.key === " ") && f.stopPropagation();
        },
        children: /* @__PURE__ */ a(
          za,
          {
            editorSerializedState: i,
            onSerializedChange: (f) => s(f),
            placeholder: k,
            onClear: (f) => {
              p.current = f;
            }
          }
        )
      }
    )
  ] });
}
const ng = Object.freeze([
  "%commentEditor_placeholder%",
  "%commentEditor_assignTo_label%",
  "%commentEditor_saveButton_tooltip%",
  "%commentEditor_unassigned%",
  "%commentEditor_team%",
  ...hs
]), ig = Object.freeze([
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
]), pu = "comment-list";
function sg(t) {
  return t;
}
function hu({
  className: t,
  size: e = "default",
  ...r
}) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "card",
      "data-size": e,
      className: x(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:group/card tw:flex tw:flex-col tw:gap-4 tw:overflow-hidden tw:rounded-xl tw:bg-card tw:py-4 tw:text-sm tw:text-card-foreground tw:ring-1 tw:ring-foreground/10 tw:has-data-[slot=card-footer]:pb-0 tw:has-[>img:first-child]:pt-0 tw:data-[size=sm]:gap-3 tw:data-[size=sm]:py-3 tw:data-[size=sm]:has-data-[slot=card-footer]:pb-0 tw:*:[img:first-child]:rounded-t-xl tw:*:[img:last-child]:rounded-b-xl",
        t
      ),
      ...r
    }
  );
}
function cg({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "card-header",
      className: x(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:group/card-header tw:@container/card-header tw:grid tw:auto-rows-min tw:items-start tw:gap-1 tw:rounded-t-xl tw:px-4 tw:group-data-[size=sm]/card:px-3 tw:has-data-[slot=card-action]:grid-cols-[1fr_auto] tw:has-data-[slot=card-description]:grid-rows-[auto_auto] tw:[.border-b]:pb-4 tw:group-data-[size=sm]/card:[.border-b]:pb-3",
        t
      ),
      ...e
    }
  );
}
function lg({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "card-title",
      className: x(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:font-heading tw:text-base tw:leading-snug tw:font-medium tw:group-data-[size=sm]/card:text-sm",
        t
      ),
      ...e
    }
  );
}
function dg({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "card-description",
      className: x(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:text-sm tw:text-muted-foreground",
        t
      ),
      ...e
    }
  );
}
function gu({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "card-content",
      className: x(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:px-4 tw:group-data-[size=sm]/card:px-3",
        t
      ),
      ...e
    }
  );
}
function wg({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "card-footer",
      className: x(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:flex tw:items-center tw:rounded-b-xl tw:border-t tw:bg-muted/50 tw:p-4 tw:group-data-[size=sm]/card:p-3",
        t
      ),
      ...e
    }
  );
}
function na({
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
function fu({
  className: t,
  size: e = "default",
  ...r
}) {
  return /* @__PURE__ */ a(
    Ko.Root,
    {
      "data-slot": "avatar",
      "data-size": e,
      className: x(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:group/avatar tw:relative tw:flex tw:size-8 tw:shrink-0 tw:rounded-full tw:select-none tw:after:absolute tw:after:inset-0 tw:after:rounded-full tw:after:border tw:after:border-border tw:after:mix-blend-darken tw:data-[size=lg]:size-10 tw:data-[size=sm]:size-6 tw:dark:after:mix-blend-lighten",
        t
      ),
      ...r
    }
  );
}
function ug({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    Ko.Image,
    {
      "data-slot": "avatar-image",
      className: x(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:aspect-square tw:size-full tw:rounded-full tw:object-cover",
        t
      ),
      ...e
    }
  );
}
function mu({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    Ko.Fallback,
    {
      "data-slot": "avatar-fallback",
      className: x(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:flex tw:size-full tw:items-center tw:justify-center tw:rounded-full tw:bg-muted tw:text-sm tw:text-muted-foreground tw:group-data-[size=sm]/avatar:text-xs",
        t
      ),
      ...e
    }
  );
}
function Ln({
  comment: t,
  isReply: e = !1,
  localizedStrings: r,
  isThreadExpanded: o = !1,
  handleUpdateComment: n,
  handleDeleteComment: i,
  onEditingChange: s,
  canEditOrDelete: c = !1,
  draftEditorState: d,
  onDraftEditorStateChange: l
}) {
  const w = Kr(), [p, h] = E(), m = d ?? p, g = m !== void 0 && o, f = l !== void 0, N = L(
    (y) => {
      f || h(y), l == null || l(y);
    },
    [f, l]
  ), T = I(null), P = I(!1);
  q(() => {
    if (!g || !P.current) return;
    P.current = !1;
    let y = !0;
    const at = T.current;
    if (!at) return;
    const C = setTimeout(() => {
      y && us(at);
    }, 300);
    return () => {
      y = !1, clearTimeout(C);
    };
  }, [g]);
  const R = L(
    (y) => {
      y && y.stopPropagation(), N(void 0), s == null || s(!1);
    },
    [s, N]
  ), U = L(
    async (y) => {
      if (y && y.stopPropagation(), !m || !n) return;
      await n(
        t.id,
        Pa(m)
      ) && (N(void 0), s == null || s(!1));
    },
    [m, n, t.id, s, N]
  ), D = B(() => {
    const y = new Date(t.date), at = rl(
      y,
      r["%comment_date_today%"],
      r["%comment_date_yesterday%"]
    ), C = y.toLocaleTimeString(void 0, {
      hour: "numeric",
      minute: "2-digit"
    });
    return dr(r["%comment_dateAtTime%"], {
      date: at,
      time: C
    });
  }, [t.date, r]), V = B(() => t.user, [t.user]), $ = B(
    () => t.user.split(" ").map((y) => y[0]).join("").toUpperCase().slice(0, 2),
    [t.user]
  ), M = B(() => Lo(t.contents), [t.contents]), A = B(
    () => t.contents.replace(/<[^>]*>/g, "").trim().length > 0,
    [t.contents]
  ), Y = !!t.conflictResolutionAction && !A, J = B(() => {
    if (o && c)
      return /* @__PURE__ */ u(mt, { children: [
        /* @__PURE__ */ u(
          cr,
          {
            onClick: (y) => {
              y.stopPropagation(), P.current = !0;
              const at = t.contents.trim() !== "";
              N(at ? lu(t.contents) : wu), s == null || s(!0);
            },
            children: [
              /* @__PURE__ */ a(_c, { className: "tw:me-2 tw:h-4 tw:w-4" }),
              r["%comment_editComment%"]
            ]
          }
        ),
        /* @__PURE__ */ u(
          cr,
          {
            onClick: async (y) => {
              y.stopPropagation(), i && await i(t.id);
            },
            children: [
              /* @__PURE__ */ a(Nc, { className: "tw:me-2 tw:h-4 tw:w-4" }),
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
    s,
    N
  ]), et = !Ne(m);
  return /* @__PURE__ */ u(
    "div",
    {
      className: x("tw:flex tw:w-full tw:flex-row tw:items-baseline tw:gap-2", {
        "tw:text-sm": e
      }),
      children: [
        /* @__PURE__ */ a(fu, { className: "tw:h-8 tw:w-8", children: /* @__PURE__ */ a(mu, { className: "tw:text-xs tw:font-medium", children: $ }) }),
        /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-1 tw:flex-col tw:gap-1", children: [
          /* @__PURE__ */ u("div", { className: "tw:flex tw:w-full tw:flex-row tw:flex-wrap tw:items-baseline tw:gap-x-2", children: [
            /* @__PURE__ */ a("p", { className: "tw:text-sm tw:font-medium", children: V }),
            /* @__PURE__ */ a("p", { className: "tw:text-xs tw:font-normal tw:text-muted-foreground", children: D }),
            /* @__PURE__ */ a("div", { className: "tw:flex-1" }),
            e && t.assignedUser !== void 0 && /* @__PURE__ */ u(ea, { variant: "secondary", className: "tw:text-xs tw:font-normal", children: [
              "→ ",
              _a(t.assignedUser, r)
            ] })
          ] }),
          g && /* @__PURE__ */ a(
            "div",
            {
              role: "textbox",
              tabIndex: -1,
              className: "tw:flex tw:flex-col tw:gap-2",
              ref: T,
              onKeyDownCapture: (y) => {
                y.key === "Escape" ? (y.preventDefault(), y.stopPropagation(), R()) : Qo(y) && (y.preventDefault(), y.stopPropagation(), Ne(m) && U());
              },
              onKeyDown: (y) => {
                Jo(y), (y.key === "Enter" || y.key === " ") && y.stopPropagation();
              },
              onClick: (y) => {
                y.stopPropagation();
              },
              children: /* @__PURE__ */ a(
                za,
                {
                  className: x(
                    // Don't render blockquote on the first child. All comments are wrapped in blockquote
                    // that has text-align corresponding to LTR or RTL, so the blockquote is important.
                    // But we don't want it to look like there's a blockquote there. Target the
                    // lowest-level Lexical editor element by attribute so Tailwind can apply styles to
                    // the blockquote directly inside the editor.
                    'tw:[&_[data-lexical-editor="true"]>blockquote]:mt-0 tw:[&_[data-lexical-editor="true"]>blockquote]:border-s-0 tw:[&_[data-lexical-editor="true"]>blockquote]:ps-0 tw:[&_[data-lexical-editor="true"]>blockquote]:font-normal tw:[&_[data-lexical-editor="true"]>blockquote]:not-italic tw:[&_[data-lexical-editor="true"]>blockquote]:text-foreground'
                  ),
                  editorSerializedState: m,
                  onSerializedChange: (y) => N(y),
                  actions: /* @__PURE__ */ u(mt, { children: [
                    /* @__PURE__ */ a("div", { className: "tw:flex-1" }),
                    /* @__PURE__ */ u(vt, { children: [
                      /* @__PURE__ */ a(bt, { asChild: !0, children: /* @__PURE__ */ a(
                        rt,
                        {
                          size: "icon-sm",
                          onClick: R,
                          variant: "outline",
                          className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                          "aria-label": Oe(
                            "%comment_aria_cancel_edit%",
                            r,
                            "Cancel edit"
                          ),
                          children: /* @__PURE__ */ a(Cc, {})
                        }
                      ) }),
                      /* @__PURE__ */ a(xt, { children: Oe(
                        "%comment_aria_cancel_edit%",
                        r,
                        "Cancel edit"
                      ) })
                    ] }),
                    /* @__PURE__ */ u(vt, { children: [
                      /* @__PURE__ */ a(bt, { asChild: !0, children: /* @__PURE__ */ a(
                        na,
                        {
                          isDisabled: et,
                          disabledExplanation: Oe(
                            "%comment_aria_save_edit%",
                            r,
                            "Save edit"
                          ),
                          className: "tw:inline-flex",
                          children: /* @__PURE__ */ a(
                            rt,
                            {
                              size: "icon-sm",
                              onClick: U,
                              className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                              disabled: et,
                              "aria-label": Oe(
                                "%comment_aria_save_edit%",
                                r,
                                "Save edit"
                              ),
                              children: /* @__PURE__ */ a(wi, {})
                            }
                          )
                        }
                      ) }),
                      /* @__PURE__ */ a(xt, { children: Oe(
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
          !g && /* @__PURE__ */ u(mt, { children: [
            t.status === "Resolved" && !Y && /* @__PURE__ */ a("div", { className: "tw:text-sm tw:italic", children: r["%comment_status_resolved%"] }),
            t.status === "Todo" && e && /* @__PURE__ */ a("div", { className: "tw:text-sm tw:italic", children: r["%comment_status_todo%"] }),
            Y ? (
              // A platform-created conflict resolution comment carries an empty body — PT9 renders
              // its banner UI-side from conflictResolutionAction, it never stores text. So render the
              // localized, neutral outcome line here instead of the (empty) contents, styled like the
              // italic status lines above. These are the same neutral keys ConflictNoteCard's Result
              // region used to render inline. Only when the body IS empty: a resolution synced from
              // PT9 can carry the resolver's typed note alongside the action, and PT9 shows that text,
              // so the body branch below keeps it visible rather than discarding it for this banner.
              /* @__PURE__ */ a("div", { className: "tw:text-sm tw:italic", children: vs(t.conflictResolutionAction) === "merged" ? r["%conflict_note_outcome_combined%"] ?? "Combined both changes." : r["%conflict_note_outcome_used_other%"] ?? "Used the other change instead of the current text." })
            ) : /* @__PURE__ */ a(
              "div",
              {
                className: x(
                  // Shared note-body prose/blockquote treatment (also used by conflict-diff's
                  // DIFF_HTML_CLASSES). Layer this comment item's own extras on top: items-start +
                  // gap-2 for layout, and line-clamp while the thread is collapsed.
                  fs,
                  "tw:items-start tw:gap-2",
                  {
                    "tw:line-clamp-3": !o
                  }
                ),
                ...w,
                dangerouslySetInnerHTML: { __html: M }
              }
            )
          ] })
        ] }),
        J && /* @__PURE__ */ u(tr, { children: [
          /* @__PURE__ */ a(Ke, { asChild: !0, children: /* @__PURE__ */ a(rt, { variant: "ghost", size: "icon", children: /* @__PURE__ */ a(Ec, {}) }) }),
          /* @__PURE__ */ a(er, { align: "end", children: J })
        ] })
      ]
    }
  );
}
function bs({
  show: t,
  disabled: e = !1,
  onClick: r,
  ariaLabel: o
}) {
  if (t)
    return /* @__PURE__ */ a(
      rt,
      {
        variant: "ghost",
        size: "icon",
        disabled: e,
        className: x(
          "tw:ms-auto",
          "tw:text-primary tw:transition-opacity tw:duration-200 tw:hover:bg-primary/10",
          "tw:opacity-0 tw:group-hover:opacity-100"
        ),
        onClick: (n) => {
          n.stopPropagation(), r();
        },
        "aria-label": o,
        children: /* @__PURE__ */ a(pr, { className: "tw:h-4 tw:w-4" })
      }
    );
}
const vu = {
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
}, xs = vi(function({
  classNameForVerseText: e,
  comments: r,
  localizedStrings: o,
  isSelected: n = !1,
  verseRef: i,
  assignedUser: s,
  currentUser: c,
  handleSelectThread: d,
  threadId: l,
  thread: w,
  threadStatus: p,
  handleAddCommentToThread: h,
  handleUpdateComment: m,
  handleDeleteComment: k,
  handleReadStatusChange: g,
  assignableUsers: f,
  canUserAddCommentToThread: N,
  canUserAssignThreadCallback: T,
  canUserResolveThreadCallback: P,
  canUserEditOrDeleteCommentCallback: R,
  isRead: U = !1,
  autoReadDelay: D = 5,
  onVerseRefClick: V,
  initialAssignedUser: $,
  activeComments: M,
  rootContentSlot: A,
  resolveActionSlot: Y,
  spaceRootContentFromReplies: J = !1,
  draft: et,
  onDraftChange: y
}) {
  var _;
  const at = Kr(), [C, S] = E({}), K = et ?? C, j = K.editorState ?? vu, G = K.assignedUser, it = y !== void 0, st = I(K);
  st.current = K;
  const Z = L(
    (v) => {
      const O = { ...st.current, ...v };
      st.current = O, it || S(O), y == null || y(l, Vn(O) ? void 0 : O);
    },
    [it, y, l]
  ), wt = L(
    (v, O) => {
      const z = { ...K.commentEdits };
      O === void 0 ? delete z[v] : z[v] = O, Z({
        commentEdits: Zr(z) ? z : void 0
      });
    },
    [K.commentEdits, Z]
  ), [lt, ut] = E(), kt = n, [Tt, Ht] = E(!1), [Le, Rt] = E(!1), [Dt, _t] = E(!1), [qt, Ie] = E(!1), [Ce, yt] = E(!1), [ft, ge] = E(U), [Ee, fe] = E(!1), Jt = I(void 0), [ne, Qt] = E(/* @__PURE__ */ new Map());
  q(() => {
    let v = !0;
    return (async () => {
      const z = P ? await P(l) : !1;
      v && yt(z);
    })(), () => {
      v = !1;
    };
  }, [l, P]), q(() => {
    let v = !0;
    if (!n) {
      Ie(!1), Qt(/* @__PURE__ */ new Map());
      return;
    }
    return (async () => {
      const z = T ? await T(l) : !1;
      v && Ie(z);
    })(), () => {
      v = !1;
    };
  }, [n, l, T]);
  const Nt = I("idle");
  q(() => {
    if (!n) {
      Nt.current !== "idle" && (Z({ assignedUser: void 0 }), ut(void 0), Nt.current = "idle");
      return;
    }
    Nt.current === "idle" && (Nt.current = "pending"), qt ? Nt.current === "pending" && $ !== void 0 && // Skip pre-population if the thread is already assigned to this user — doing so
    // would show "Assigning to: Alice" and enable the submit button for a no-op call.
    $ !== s && (Z({ assignedUser: $ }), Nt.current = "auto-populated") : Nt.current === "auto-populated" && (Z({ assignedUser: void 0 }), Nt.current = "pending");
  }, [n, $, qt, s, Z]);
  const Lt = I(lt);
  Lt.current = lt;
  const te = I(y);
  te.current = y;
  const F = I(l);
  F.current = l, q(() => () => {
    var O;
    const { current: v } = st;
    v.assignedUser !== void 0 && v.assignedUser === Lt.current && v.editorState === void 0 && !Zr(v.commentEdits) && ((O = te.current) == null || O.call(te, F.current, void 0));
  }, []);
  const pt = B(
    () => M ?? r.filter((v) => !v.deleted),
    [M, r]
  ), ee = B(() => {
    const { commentEdits: v } = K;
    if (!v) return v;
    const O = new Set(pt.map((Q) => Q.id)), z = Object.fromEntries(
      Object.entries(v).filter(([Q]) => O.has(Q))
    );
    return Zr(z) ? z : void 0;
  }, [K, pt]), It = Le || Zr(ee);
  q(() => {
    let v = !0;
    if (!n || !R) {
      Qt(/* @__PURE__ */ new Map());
      return;
    }
    return (async () => {
      const z = /* @__PURE__ */ new Map();
      await Promise.all(
        pt.map(async (Q) => {
          const X = await R(Q.id);
          v && z.set(Q.id, X);
        })
      ), v && Qt(z);
    })(), () => {
      v = !1;
    };
  }, [n, pt, R]);
  const Ct = B(() => pt[0], [pt]), Ot = I(null), re = I(void 0), ae = L(() => {
    var v;
    (v = re.current) == null || v.call(re), Z({ editorState: void 0 });
  }, [Z]), me = L(
    (v) => {
      Z({ editorState: Ne(v) ? v : void 0 });
    },
    [Z]
  ), ve = L(() => {
    const v = !ft;
    ge(v), fe(!v), g == null || g(l, v);
  }, [ft, g, l]);
  q(() => {
    Ht(!1);
  }, [n]), q(() => {
    if (n && !ft && !Ee && Vn(K)) {
      const v = setTimeout(() => {
        ge(!0), g == null || g(l, !0);
      }, D * 1e3);
      return Jt.current = v, () => clearTimeout(v);
    }
    Jt.current && (clearTimeout(Jt.current), Jt.current = void 0);
  }, [
    n,
    ft,
    Ee,
    D,
    l,
    g,
    K
  ]);
  const Mt = B(
    () => ({
      singleReply: o["%comment_thread_single_reply%"],
      multipleReplies: o["%comment_thread_multiple_replies%"]
    }),
    [o]
  ), be = B(() => {
    if (s === void 0)
      return;
    if (s === "")
      return o["%comment_assign_unassigned%"] ?? "Unassigned";
    const v = _a(s, o);
    return dr(o["%comment_assigned_to%"], {
      assignedUser: v
    });
  }, [s, o]), Bt = B(() => pt.slice(1), [pt]), zt = B(() => Bt.length ?? 0, [Bt.length]), Be = B(() => zt > 0, [zt]), Te = B(() => {
    if (Tt || zt <= 2)
      return Bt;
    const v = new Set(Bt.slice(-2).map((O) => O.id));
    return Bt.filter(
      (O) => {
        var z;
        return v.has(O.id) || ((z = K.commentEdits) == null ? void 0 : z[O.id]) !== void 0;
      }
    );
  }, [Bt, zt, Tt, K.commentEdits]), xe = B(() => Tt || zt <= 2 ? 0 : zt - Te.length, [zt, Tt, Te.length]), Me = B(
    () => zt === 1 ? Mt.singleReply : dr(Mt.multipleReplies, { count: zt }),
    [zt, Mt]
  ), je = B(
    () => xe === 1 ? Mt.singleReply : dr(Mt.multipleReplies, { count: xe }),
    [xe, Mt]
  );
  q(() => {
    !n && It && Be && Rt(!1);
  }, [n, It, Be]);
  const de = L(
    async (v) => {
      v && v.stopPropagation();
      const O = Ne(j) ? Pa(j) : void 0;
      if (G !== void 0) {
        await h({
          threadId: l,
          contents: O,
          assignedUser: G
        }) && (ut(G), O && ae());
        return;
      }
      O && await h({ threadId: l, contents: O }) && ae();
    },
    [
      ae,
      j,
      h,
      G,
      l
    ]
  ), ye = L(
    async (v) => {
      const O = Ne(j) ? Pa(j) : void 0, z = v.status ? v.assignedUser : G ?? v.assignedUser, Q = await h({
        ...v,
        contents: O,
        assignedUser: z
      });
      return Q && (z !== void 0 && ut(z), O && ae()), Q;
    },
    [ae, j, h, G]
  );
  if (pt.length === 0) return;
  const Ye = !qt || !f || f.length === 0 || !f.includes(c), ar = !Ne(j) && (G === void 0 || G === lt), or = /* @__PURE__ */ a(
    Ln,
    {
      comment: Ct,
      localizedStrings: o,
      isThreadExpanded: n,
      threadStatus: p,
      handleAddCommentToThread: ye,
      handleUpdateComment: m,
      handleDeleteComment: k,
      onEditingChange: Rt,
      canEditOrDelete: (!It && ne.get(Ct.id)) ?? !1,
      canUserResolveThread: Ce,
      draftEditorState: (_ = K.commentEdits) == null ? void 0 : _[Ct.id],
      onDraftEditorStateChange: (v) => wt(Ct.id, v)
    }
  );
  return /* @__PURE__ */ a(
    hu,
    {
      role: "option",
      "aria-selected": n,
      id: l,
      className: x(
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
          "tw:bg-card": p !== "Resolved" && ft,
          "tw:bg-muted": p === "Resolved",
          "tw:bg-accent": !ft && p !== "Resolved"
        }
      ),
      onClick: () => {
        d(l);
      },
      tabIndex: -1,
      children: /* @__PURE__ */ u(gu, { className: "tw:flex tw:flex-col tw:gap-2 tw:p-0", children: [
        /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:content-center tw:items-start tw:gap-2", children: [
          /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:gap-2", children: [
            be && /* @__PURE__ */ a(ea, { className: "tw:rounded-sm tw:bg-input tw:text-sm tw:font-normal tw:text-primary tw:hover:bg-input", children: be }),
            /* @__PURE__ */ a(
              rt,
              {
                variant: "ghost",
                size: "icon",
                onClick: (v) => {
                  v.stopPropagation(), ve();
                },
                className: "tw:text-muted-foreground tw:transition tw:hover:text-foreground",
                "aria-label": ft ? o["%comment_aria_mark_as_unread%"] ?? "Mark as unread" : o["%comment_aria_mark_as_read%"] ?? "Mark as read",
                children: ft ? /* @__PURE__ */ a(Tc, {}) : /* @__PURE__ */ a(Rc, {})
              }
            ),
            Y === void 0 ? (
              // Generic status-resolve check (used by non-conflict threads and, via ConflictThread
              // leaving this slot undefined, by non-verseText conflicts, which resolve through a
              // plain status change). ConflictThread overrides this slot for verseText conflicts.
              /* @__PURE__ */ a(
                bs,
                {
                  show: Ce && p !== "Resolved",
                  onClick: () => ye({ threadId: l, status: "Resolved" }),
                  ariaLabel: o["%comment_aria_resolve_thread%"] ?? "Resolve thread"
                }
              )
            ) : Y
          ] }),
          /* @__PURE__ */ a("div", { className: "tw:flex tw:max-w-full tw:flex-wrap tw:items-baseline tw:gap-2", children: /* @__PURE__ */ u(
            "p",
            {
              ref: Ot,
              className: x(
                "tw:flex-1 tw:overflow-hidden tw:text-ellipsis tw:text-sm tw:font-normal tw:text-muted-foreground",
                {
                  "tw:overflow-visible tw:text-clip tw:whitespace-normal tw:break-words": kt
                },
                { "tw:whitespace-nowrap": !kt }
              ),
              children: [
                i && V ? /* @__PURE__ */ a(
                  rt,
                  {
                    variant: "ghost",
                    size: "sm",
                    className: "tw:h-auto tw:px-1 tw:py-0 tw:text-sm tw:font-normal tw:text-muted-foreground",
                    onClick: (v) => {
                      v.stopPropagation(), V(w);
                    },
                    children: i
                  }
                ) : i,
                /* @__PURE__ */ u(
                  "span",
                  {
                    className: e,
                    ...at,
                    children: [
                      Ct.contextBefore,
                      /* @__PURE__ */ a("span", { className: "tw:font-bold", children: Ct.selectedText }),
                      Ct.contextAfter
                    ]
                  }
                )
              ]
            }
          ) }),
          A ?? or
        ] }),
        /* @__PURE__ */ u(mt, { children: [
          Be && !n && /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:gap-5", children: [
            /* @__PURE__ */ a("div", { className: "tw:w-8", children: /* @__PURE__ */ a(ra, {}) }),
            /* @__PURE__ */ a("p", { className: "tw:text-sm tw:text-muted-foreground", children: Me })
          ] }),
          !n && Ne(j) && /* @__PURE__ */ a(
            za,
            {
              editorSerializedState: j,
              onSerializedChange: me,
              placeholder: o["%comment_replyOrAssign%"]
            }
          ),
          n && /* @__PURE__ */ u(mt, { children: [
            J && Te.length > 0 && /* @__PURE__ */ a("div", { className: "tw:h-2", "data-slot": "root-content-reply-gap", "aria-hidden": "true" }),
            xe > 0 && /* @__PURE__ */ u(
              "div",
              {
                className: "tw:flex tw:cursor-pointer tw:items-center tw:gap-5 tw:py-2",
                onClick: (v) => {
                  v.stopPropagation(), Ht(!0);
                },
                role: "button",
                tabIndex: 0,
                onKeyDown: (v) => {
                  (v.key === "Enter" || v.key === " ") && (v.preventDefault(), v.stopPropagation(), Ht(!0));
                },
                children: [
                  /* @__PURE__ */ a("div", { className: "tw:w-8", children: /* @__PURE__ */ a(ra, {}) }),
                  /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:gap-2", children: [
                    /* @__PURE__ */ a("p", { className: "tw:text-sm tw:text-muted-foreground", children: je }),
                    Tt ? /* @__PURE__ */ a(ci, {}) : /* @__PURE__ */ a(xr, {})
                  ] })
                ]
              }
            ),
            Te.map((v) => {
              var O;
              return /* @__PURE__ */ a("div", { children: /* @__PURE__ */ a(
                Ln,
                {
                  comment: v,
                  localizedStrings: o,
                  isReply: !0,
                  isThreadExpanded: n,
                  handleUpdateComment: m,
                  handleDeleteComment: k,
                  onEditingChange: Rt,
                  canEditOrDelete: (!It && ne.get(v.id)) ?? !1,
                  draftEditorState: (O = K.commentEdits) == null ? void 0 : O[v.id],
                  onDraftEditorStateChange: (z) => wt(v.id, z)
                }
              ) }, v.id);
            }),
            N !== !1 && (!It || Ne(j)) && /* @__PURE__ */ a(
              "div",
              {
                role: "textbox",
                tabIndex: -1,
                className: "tw:w-full tw:space-y-2",
                onClick: (v) => v.stopPropagation(),
                onKeyDownCapture: (v) => {
                  Qo(v) && (v.preventDefault(), v.stopPropagation(), (Ne(j) || G !== void 0 && G !== lt) && de());
                },
                onKeyDown: (v) => {
                  Jo(v), (v.key === "Enter" || v.key === " ") && v.stopPropagation();
                },
                children: /* @__PURE__ */ a(
                  za,
                  {
                    editorSerializedState: j,
                    onSerializedChange: me,
                    placeholder: p === "Resolved" ? o["%comment_reopenResolved%"] : o["%comment_replyOrAssign%"],
                    autoFocus: !0,
                    onClear: (v) => {
                      re.current = v;
                    },
                    actions: /* @__PURE__ */ u(mt, { children: [
                      G !== void 0 && (Ne(j) || G !== lt) ? /* @__PURE__ */ a("span", { className: "tw:flex-1 tw:text-sm tw:text-muted-foreground", children: dr(
                        Oe(
                          "%comment_assigning_to%",
                          o,
                          "Assigning to: {assignedUser}"
                        ),
                        {
                          assignedUser: _a(
                            G,
                            o
                          )
                        }
                      ) }) : /* @__PURE__ */ a("div", { className: "tw:flex-1" }),
                      /* @__PURE__ */ u(_r, { open: Dt, onOpenChange: _t, children: [
                        /* @__PURE__ */ u(vt, { children: [
                          /* @__PURE__ */ a(bt, { asChild: !0, children: /* @__PURE__ */ a(
                            na,
                            {
                              isDisabled: Ye,
                              disabledExplanation: Oe(
                                "%comment_aria_assign_user%",
                                o,
                                "Assign user"
                              ),
                              children: /* @__PURE__ */ a(jr, { asChild: !0, children: /* @__PURE__ */ a(
                                rt,
                                {
                                  size: "icon-sm",
                                  variant: "outline",
                                  className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                                  disabled: Ye,
                                  "aria-label": Oe(
                                    "%comment_aria_assign_user%",
                                    o,
                                    "Assign user"
                                  ),
                                  children: /* @__PURE__ */ a(di, {})
                                }
                              ) })
                            }
                          ) }),
                          /* @__PURE__ */ a(xt, { children: Oe(
                            "%comment_aria_assign_user%",
                            o,
                            "Assign user"
                          ) })
                        ] }),
                        /* @__PURE__ */ a(
                          Nr,
                          {
                            className: "tw:w-auto tw:p-0",
                            align: "end",
                            onKeyDown: (v) => {
                              v.key === "Escape" && (v.stopPropagation(), _t(!1));
                            },
                            children: /* @__PURE__ */ a(Cr, { children: /* @__PURE__ */ a(Er, { children: f == null ? void 0 : f.map((v) => /* @__PURE__ */ a(
                              gr,
                              {
                                onSelect: () => {
                                  Z({
                                    assignedUser: v !== s ? v : void 0
                                  }), Nt.current = "user-selected", ut(void 0), _t(!1);
                                },
                                className: "tw:flex tw:items-center",
                                children: /* @__PURE__ */ a("span", { children: _a(v, o) })
                              },
                              v || "unassigned"
                            )) }) })
                          }
                        )
                      ] }),
                      /* @__PURE__ */ u(vt, { children: [
                        /* @__PURE__ */ a(bt, { asChild: !0, children: /* @__PURE__ */ a(
                          na,
                          {
                            isDisabled: ar,
                            disabledExplanation: Oe(
                              "%comment_aria_submit_comment%",
                              o,
                              "Submit comment"
                            ),
                            className: "tw:inline-flex",
                            children: /* @__PURE__ */ a(
                              rt,
                              {
                                size: "icon-sm",
                                onClick: de,
                                className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                                disabled: ar,
                                "aria-label": Oe(
                                  "%comment_aria_submit_comment%",
                                  o,
                                  "Submit comment"
                                ),
                                children: /* @__PURE__ */ a(wi, {})
                              }
                            )
                          }
                        ) }),
                        /* @__PURE__ */ a(xt, { children: Oe(
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
}), bu = x(
  fs,
  // `prose` gives block children (the top-level blockquote wrapper, and any p — whether nested
  // inside that blockquote or, in the non-verseText fallback, a direct child) vertical margins that
  // make these already-compact cards feel bulky. Zero both so the diff sits flush inside the card.
  "tw:[&>blockquote]:my-0 tw:[&_p]:my-0",
  "tw:[&_u]:font-semibold tw:[&_u]:text-success-foreground tw:[&_u]:no-underline",
  "tw:[&_s]:text-destructive tw:[&_s]:line-through"
), xu = (t) => t.replace(/(\s+)(<\/[us]>)/g, "$2$1"), Na = (t) => xu(Lo(t));
function Ca({ html: t }) {
  const e = Kr();
  return /* @__PURE__ */ a(
    "div",
    {
      className: bu,
      ...e,
      dangerouslySetInnerHTML: { __html: t }
    }
  );
}
function yu({
  comment: t,
  localizedStrings: e,
  availableActions: r = "acceptOrReject",
  resolvedResolution: o,
  onResolve: n,
  isResolving: i = !1
}) {
  const [s, c] = E("accept"), d = Oa(), l = Oa(), w = Kr(), p = r === "loading", h = r === "accept", m = r === "none", k = r === "acceptRejectOrMerge", g = h ? "accept" : s, f = B(
    () => Na(t.rejectedText ?? ""),
    [t.rejectedText]
  ), N = B(
    () => Na(t.acceptedText ?? ""),
    [t.acceptedText]
  ), T = B(
    () => Na(t.mergedText ?? ""),
    [t.mergedText]
  ), P = B(() => Lo(t.contents), [t.contents]);
  if (!ms(t))
    return /* @__PURE__ */ a(Ca, { html: P });
  const R = (S) => {
    c(S === "reject" || S === "merge" ? S : "accept");
  }, U = e["%conflict_note_stale_notice%"] ?? "The verse was edited after this conflict was recorded, so 'Use the other change' is no longer available. Keep the current text to resolve.", D = k ? [
    {
      value: "merge",
      label: e["%conflict_note_option_combine%"] ?? "Combine both changes",
      html: T
    }
  ] : [], V = [
    {
      value: "accept",
      label: e["%conflict_note_option_keep_current%"] ?? "Keep the current text",
      html: N
    },
    {
      value: "reject",
      label: e["%conflict_note_option_use_other%"] ?? "Use the other change",
      html: f
    },
    ...D
  ], $ = g === "accept", M = i || $;
  let A;
  $ ? A = e["%conflict_note_save_disabled_tooltip%"] ?? "Keeping the current text makes no change — resolve the thread with the ✓ to keep it." : i || (A = e["%conflict_note_save_warning%"] ?? "This can't be undone.");
  const Y = e["%conflict_note_no_result%"] ?? "No result preview available.", J = /* @__PURE__ */ a("p", { className: "tw:text-muted-foreground", children: Y }), et = (S) => S ? /* @__PURE__ */ a(
    "p",
    {
      className: "tw:whitespace-pre-wrap tw:text-foreground",
      ...w,
      children: S
    }
  ) : J, y = () => {
    const S = o ?? "accept";
    return S === "merged" ? t.mergedText ? /* @__PURE__ */ a(Ca, { html: T }) : J : et(S === "reject" ? t.rejectedResultText : t.resultText);
  }, at = (S) => h && S.value === "reject", C = (S) => {
    const K = g === S.value, j = `${l}-${S.value}`, G = at(S);
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
          htmlFor: j,
          "data-slot": "conflict-resolution-option",
          "data-value": S.value,
          className: x(
            "tw:flex tw:flex-col tw:gap-1 tw:rounded-md tw:border tw:p-2",
            "tw:focus-within:ring-2 tw:focus-within:ring-ring tw:focus-within:ring-offset-1",
            K ? "tw:border-border tw:bg-accent/50" : "tw:border-transparent tw:hover:bg-accent/30",
            G ? "tw:cursor-not-allowed tw:opacity-60" : "tw:cursor-pointer"
          ),
          children: [
            /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:gap-2", children: [
              /* @__PURE__ */ a(
                Ta,
                {
                  id: j,
                  value: S.value,
                  "aria-label": S.label,
                  disabled: G,
                  "aria-describedby": G ? d : void 0
                }
              ),
              /* @__PURE__ */ a("span", { "aria-hidden": !0, className: "tw:font-medium", children: S.label })
            ] }),
            G && // aria-describedby links the option to this visually-hidden notice so assistive tech
            // announces why the choice is read-only.
            /* @__PURE__ */ a("span", { id: d, className: "tw:sr-only", children: U }),
            /* @__PURE__ */ a(Ca, { html: S.html })
          ]
        },
        S.value
      )
    );
  };
  return (
    // Contain every click inside the card (selecting an option, pressing Save) so it never bubbles
    // up to toggle the enclosing CommentThread open/closed. The thread toggles on click only, so a
    // single onClick guard at the root is enough; this container is not itself an interactive control
    // and needs no keyboard handler (the thread has no keyboard toggle to intercept).
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
    /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:gap-3 tw:text-sm", onClick: (S) => S.stopPropagation(), children: [
      /* @__PURE__ */ a("p", { children: e["%conflict_note_description_verseText%"] ?? "Conflicting changes were made to the verse text." }),
      p && /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:gap-2", "data-slot": "conflict-loading", children: [
        /* @__PURE__ */ a(Ir, { className: "tw:h-8 tw:w-full" }),
        /* @__PURE__ */ a(Ir, { className: "tw:h-8 tw:w-full" }),
        /* @__PURE__ */ a(Ir, { className: "tw:h-8 tw:w-24" })
      ] }),
      !p && m && y(),
      !p && !m && /* @__PURE__ */ u(mt, { children: [
        /* @__PURE__ */ a("p", { children: e["%conflict_note_choose_prompt%"] ?? "Select which change to keep:" }),
        /* @__PURE__ */ a(
          Do,
          {
            value: g,
            onValueChange: R,
            disabled: i,
            "aria-label": e["%conflict_note_choose_aria_label%"] ?? "Choose resolution",
            children: V.map((S) => at(S) ? /* @__PURE__ */ a(Vt, { delayDuration: 0, children: /* @__PURE__ */ u(vt, { children: [
              /* @__PURE__ */ a(bt, { asChild: !0, children: C(S) }),
              /* @__PURE__ */ a(xt, { children: U })
            ] }) }, S.value) : C(S))
          }
        ),
        /* @__PURE__ */ a(Vt, { delayDuration: 0, children: /* @__PURE__ */ u(vt, { children: [
          /* @__PURE__ */ a(bt, { asChild: !0, children: /* @__PURE__ */ a(
            na,
            {
              isDisabled: M && A !== void 0,
              disabledExplanation: A,
              className: "tw:inline-flex tw:self-start",
              children: /* @__PURE__ */ a(
                rt,
                {
                  size: "sm",
                  disabled: M,
                  onClick: () => n == null ? void 0 : n(g),
                  children: e["%conflict_note_save_and_resolve%"] ?? "Save and resolve"
                }
              )
            }
          ) }),
          A && /* @__PURE__ */ a(xt, { children: A })
        ] }) })
      ] })
    ] })
  );
}
const ku = {
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
function _u({
  comment: t,
  localizedStrings: e,
  resolvedResolution: r
}) {
  const o = B(
    () => Na(t.rejectedText ?? ""),
    [t.rejectedText]
  );
  if (r) {
    const { key: i, fallback: s } = ku[r];
    return /* @__PURE__ */ a("p", { className: "tw:text-sm tw:font-normal tw:text-muted-foreground", children: e[i] ?? s });
  }
  const n = e["%conflict_note_summary_unresolved%"] ?? "Conflicting edits. Choose which change to keep.";
  return /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:gap-1", children: [
    /* @__PURE__ */ a("p", { className: "tw:text-sm tw:font-normal tw:text-muted-foreground", children: n }),
    o ? /* @__PURE__ */ a(Ca, { html: o }) : void 0
  ] });
}
function Nu(t) {
  return t === "reject" ? "reject" : t === "merge" ? "merged" : "accept";
}
function Cu({
  threadId: t,
  threadStatus: e,
  isSelected: r,
  activeComments: o,
  conflictResolution: n
}) {
  const [i, s] = E("loading"), [c, d] = E(!1), [l, w] = E(), p = n == null ? void 0 : n.getOptions, h = n == null ? void 0 : n.resolve;
  q(() => {
    let T = !0;
    if (!r) {
      s("loading");
      return;
    }
    return (async () => {
      let R;
      try {
        R = p ? await p(t) : "none";
      } catch {
        R = "none";
      }
      T && (s(R), R !== "none" && w(void 0));
    })(), () => {
      T = !1;
    };
  }, [r, t, e, p]);
  const m = I(!1), k = L(
    async (T) => {
      if (!(!h || m.current)) {
        m.current = !0, d(!0);
        try {
          await h(t, T) && (w(Nu(T)), s("none"));
        } catch {
        } finally {
          m.current = !1, d(!1);
        }
      }
    },
    [h, t]
  ), f = B(() => {
    if (e === "Resolved") {
      for (let T = o.length - 1; T >= 0; T -= 1)
        if (o[T].status === "Resolved")
          return vs(o[T].conflictResolutionAction);
      return "accept";
    }
  }, [e, o]) ?? l;
  return { conflictOptions: i, isResolving: c, resolve: k, resolvedResolution: f, showResolveCheck: i !== "loading" && i !== "none" };
}
const Eu = vi(function(e) {
  const {
    comments: r,
    localizedStrings: o,
    isSelected: n = !1,
    threadId: i,
    threadStatus: s,
    conflictResolution: c
  } = e, d = B(() => r.filter((T) => !T.deleted), [r]), l = B(
    () => d.find((T) => T.conflictType) ?? d[0],
    [d]
  ), { conflictOptions: w, isResolving: p, resolve: h, resolvedResolution: m, showResolveCheck: k } = Cu({
    threadId: i,
    threadStatus: s,
    isSelected: n,
    activeComments: d,
    conflictResolution: c
  }), g = ms(l);
  let f;
  g && l && (f = n ? /* @__PURE__ */ a(
    yu,
    {
      comment: l,
      localizedStrings: o,
      availableActions: w,
      resolvedResolution: m,
      onResolve: h,
      isResolving: p
    }
  ) : /* @__PURE__ */ a(
    _u,
    {
      comment: l,
      localizedStrings: o,
      resolvedResolution: m
    }
  ));
  let N;
  return g && (N = /* @__PURE__ */ a(
    bs,
    {
      show: k,
      disabled: p,
      onClick: () => h("accept"),
      ariaLabel: o["%comment_aria_resolve_thread%"] ?? "Resolve thread"
    }
  )), /* @__PURE__ */ a(
    xs,
    {
      ...e,
      activeComments: d,
      rootContentSlot: f,
      resolveActionSlot: N,
      spaceRootContentFromReplies: g && n
    }
  );
});
function pg({
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
  canUserEditOrDeleteCommentCallback: m,
  selectedThreadId: k,
  onSelectedThreadChange: g,
  onVerseRefClick: f,
  conflictResolution: N,
  drafts: T,
  onDraftChange: P
}) {
  const [R, U] = E(/* @__PURE__ */ new Set()), [D, V] = E(), [$, M] = E(), A = L(
    async (j) => {
      const G = await i(j);
      return G !== void 0 && j.assignedUser !== void 0 && j.assignedUser !== "" && M(j.assignedUser), G;
    },
    [i]
  );
  q(() => {
    k && (U((j) => new Set(j).add(k)), V(k));
  }, [k]);
  const Y = r.filter(
    (j) => j.comments.some((G) => !G.deleted)
  ), J = Y.map((j) => ({ id: j.id })), et = L(
    (j) => {
      U((G) => new Set(G).add(j.id)), V(j.id), g == null || g(j.id);
    },
    [g]
  ), y = L(
    (j) => {
      const G = R.has(j);
      U((it) => {
        const st = new Set(it);
        return st.has(j) ? st.delete(j) : st.add(j), st;
      }), V(j), g == null || g(G ? void 0 : j);
    },
    [R, g]
  ), { listboxRef: at, activeId: C, handleKeyDown: S } = Gs({
    options: J,
    onOptionSelect: et
  }), K = L(
    (j) => {
      j.key === "Escape" ? (D && R.has(D) && (U((G) => {
        const it = new Set(G);
        return it.delete(D), it;
      }), V(void 0), g == null || g(void 0)), j.preventDefault(), j.stopPropagation()) : S(j);
    },
    [D, R, S, g]
  );
  return /* @__PURE__ */ a(
    "div",
    {
      id: pu,
      role: "listbox",
      tabIndex: 0,
      ref: at,
      "aria-activedescendant": C ?? void 0,
      "aria-label": "Comments",
      className: x(
        "tw:flex tw:w-full tw:flex-col tw:outline-hidden tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-1 tw:focus:ring-offset-background",
        t
      ),
      onKeyDown: K,
      children: Y.map((j) => {
        const G = {
          classNameForVerseText: e,
          comments: j.comments,
          localizedStrings: n,
          verseRef: j.verseRef,
          handleSelectThread: y,
          threadId: j.id,
          thread: j,
          isRead: j.isRead,
          isSelected: R.has(j.id),
          currentUser: o,
          assignedUser: j.assignedUser,
          threadStatus: j.status,
          handleAddCommentToThread: A,
          handleUpdateComment: s,
          handleDeleteComment: c,
          handleReadStatusChange: d,
          assignableUsers: l,
          canUserAddCommentToThread: w,
          canUserAssignThreadCallback: p,
          canUserResolveThreadCallback: h,
          canUserEditOrDeleteCommentCallback: m,
          onVerseRefClick: f,
          initialAssignedUser: $,
          draft: T == null ? void 0 : T[j.id],
          onDraftChange: P
        };
        return /* @__PURE__ */ a(
          "div",
          {
            className: x("tw:border-b tw:border-border tw:last:border-b-0", {
              "tw:opacity-60": j.status === "Resolved"
            }),
            children: j.type === "Conflict" ? /* @__PURE__ */ a(Eu, { ...G, conflictResolution: N }) : /* @__PURE__ */ a(xs, { ...G })
          },
          j.id
        );
      })
    }
  );
}
const Tu = Bo(
  function({ area: e, as: r = "div", label: o, ...n }, i) {
    const s = {
      [ls]: e ?? "",
      ...o ? { [ds]: o } : {}
    };
    return fo(r, { ...n, ...s, ref: i });
  }
);
Tu.displayName = "ContentZoomRoot";
function Ru({ table: t }) {
  return /* @__PURE__ */ u(tr, { children: [
    /* @__PURE__ */ a(Ke, { asChild: !0, children: /* @__PURE__ */ u(rt, { variant: "outline", size: "sm", className: "tw:ml-auto tw:hidden tw:h-8 tw:lg:flex", children: [
      /* @__PURE__ */ a(Sc, { className: "tw:mr-2 tw:h-4 tw:w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ u(er, { align: "end", className: "tw:w-[150px]", children: [
      /* @__PURE__ */ a(kr, { children: "Toggle columns" }),
      /* @__PURE__ */ a(br, {}),
      t.getAllColumns().filter((e) => e.getCanHide()).map((e) => /* @__PURE__ */ a(
        wr,
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
function $r({ ...t }) {
  return /* @__PURE__ */ a(le.Root, { "data-slot": "select", ...t });
}
function Su({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    le.Group,
    {
      "data-slot": "select-group",
      className: x("tw:scroll-my-1 tw:p-1", t),
      ...e
    }
  );
}
function Vr({ ...t }) {
  return /* @__PURE__ */ a(le.Value, { "data-slot": "select-value", ...t });
}
function Lr({ className: t, size: e = "default", children: r, ...o }) {
  const n = $e();
  return /* @__PURE__ */ u(
    le.Trigger,
    {
      "data-slot": "select-trigger",
      "data-size": e,
      className: x(
        "pr-twp tw:flex tw:w-fit tw:items-center tw:gap-2 tw:rounded-lg tw:border tw:border-input tw:bg-transparent tw:py-2 tw:pe-2 tw:ps-2.5 tw:text-sm tw:whitespace-nowrap tw:transition-colors tw:outline-none tw:select-none tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:data-placeholder:text-muted-foreground tw:data-[size=default]:h-8 tw:data-[size=sm]:h-7 tw:data-[size=sm]:rounded-[min(var(--tw-radius-md),10px)] tw:*:data-[slot=select-value]:line-clamp-1 tw:*:data-[slot=select-value]:flex tw:*:data-[slot=select-value]:flex-1 tw:*:data-[slot=select-value]:items-center tw:*:data-[slot=select-value]:gap-1.5 tw:*:data-[slot=select-value]:text-start tw:dark:bg-input/30 tw:dark:hover:bg-input/50 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      dir: n,
      ...o,
      children: [
        r,
        /* @__PURE__ */ a(le.Icon, { asChild: !0, children: /* @__PURE__ */ a(bi, { className: "tw:pointer-events-none tw:size-4 tw:text-muted-foreground" }) })
      ]
    }
  );
}
function Br({
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
  const s = $e();
  return /* @__PURE__ */ a(le.Portal, { children: /* @__PURE__ */ u(
    le.Content,
    {
      "data-slot": "select-content",
      "data-align-trigger": r === "item-aligned",
      className: x(
        "pr-twp tw:relative tw:max-h-(--radix-select-content-available-height) tw:data-[align-trigger=true]:min-w-(--radix-select-trigger-width) tw:data-[align-trigger=false]:min-w-36 tw:origin-(--radix-select-content-transform-origin) tw:overflow-x-hidden tw:overflow-y-auto tw:rounded-lg tw:bg-popover tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:data-[align-trigger=true]:animate-none tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95 tw:animate-none! tw:**:data-[slot$=-item]:focus:bg-foreground/10 tw:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 tw:**:data-[slot$=-separator]:bg-foreground/5 tw:**:data-[slot$=-trigger]:focus:bg-foreground/10 tw:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! tw:**:data-[variant=destructive]:focus:bg-foreground/10! tw:**:data-[variant=destructive]:text-accent-foreground! tw:**:data-[variant=destructive]:**:text-accent-foreground! tw:relative",
        r === "popper" && "tw:data-[side=bottom]:translate-y-1 tw:data-[side=left]:-translate-x-1 tw:rtl:data-[side=left]:translate-x-1 tw:data-[side=right]:translate-x-1 tw:rtl:data-[side=right]:-translate-x-1 tw:data-[side=top]:-translate-y-1",
        t
      ),
      style: { zIndex: rr, ...n },
      position: r,
      align: o,
      ...i,
      children: [
        /* @__PURE__ */ a(Ou, {}),
        /* @__PURE__ */ a(
          le.Viewport,
          {
            "data-position": r,
            className: x(
              "tw:data-[position=popper]:h-(--radix-select-trigger-height) tw:data-[position=popper]:w-full tw:data-[position=popper]:min-w-(--radix-select-trigger-width)",
              r === "popper" && "tw:"
            ),
            children: /* @__PURE__ */ a("div", { dir: s, children: e })
          }
        ),
        /* @__PURE__ */ a(Du, {})
      ]
    }
  ) });
}
function hg({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    le.Label,
    {
      "data-slot": "select-label",
      className: x("pr-twp tw:px-1.5 tw:py-1 tw:text-xs tw:text-muted-foreground", t),
      ...e
    }
  );
}
function Ae({
  className: t,
  children: e,
  ...r
}) {
  return /* @__PURE__ */ u(
    le.Item,
    {
      "data-slot": "select-item",
      className: x(
        "pr-twp tw:relative tw:flex tw:w-full tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:*:[span]:last:flex tw:*:[span]:last:items-center tw:*:[span]:last:gap-2",
        t
      ),
      ...r,
      children: [
        /* @__PURE__ */ a("span", { className: "tw:pointer-events-none tw:absolute tw:end-2 tw:flex tw:size-4 tw:items-center tw:justify-center", children: /* @__PURE__ */ a(le.ItemIndicator, { children: /* @__PURE__ */ a(ja, { className: "tw:pointer-events-none" }) }) }),
        /* @__PURE__ */ a(le.ItemText, { children: e })
      ]
    }
  );
}
function gg({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    le.Separator,
    {
      "data-slot": "select-separator",
      className: x(
        "pr-twp tw:pointer-events-none tw:-mx-1 tw:my-1 tw:h-px tw:bg-border",
        t
      ),
      ...e
    }
  );
}
function Ou({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    le.ScrollUpButton,
    {
      "data-slot": "select-scroll-up-button",
      className: x(
        "pr-twp tw:z-10 tw:flex tw:cursor-default tw:items-center tw:justify-center tw:bg-popover tw:py-1 tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      ...e,
      children: /* @__PURE__ */ a(hl, {})
    }
  );
}
function Du({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    le.ScrollDownButton,
    {
      "data-slot": "select-scroll-down-button",
      className: x(
        "pr-twp tw:z-10 tw:flex tw:cursor-default tw:items-center tw:justify-center tw:bg-popover tw:py-1 tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      ...e,
      children: /* @__PURE__ */ a(pl, {})
    }
  );
}
function Iu({ table: t }) {
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
        $r,
        {
          value: `${t.getState().pagination.pageSize}`,
          onValueChange: (e) => {
            t.setPageSize(Number(e));
          },
          children: [
            /* @__PURE__ */ a(Lr, { className: "tw:h-8 tw:w-[70px]", children: /* @__PURE__ */ a(Vr, { placeholder: t.getState().pagination.pageSize }) }),
            /* @__PURE__ */ a(Br, { side: "top", children: [10, 20, 30, 40, 50].map((e) => /* @__PURE__ */ a(Ae, { value: `${e}`, children: e }, e)) })
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
        rt,
        {
          variant: "outline",
          size: "icon",
          className: "tw:hidden tw:h-8 tw:w-8 tw:p-0 tw:lg:flex",
          onClick: () => t.setPageIndex(0),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ a("span", { className: "tw:sr-only", children: "Go to first page" }),
            /* @__PURE__ */ a(Oc, { className: "tw:h-4 tw:w-4" })
          ]
        }
      ),
      /* @__PURE__ */ u(
        rt,
        {
          variant: "outline",
          size: "icon",
          className: "tw:h-8 tw:w-8 tw:p-0",
          onClick: () => t.previousPage(),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ a("span", { className: "tw:sr-only", children: "Go to previous page" }),
            /* @__PURE__ */ a(Dc, { className: "tw:h-4 tw:w-4" })
          ]
        }
      ),
      /* @__PURE__ */ u(
        rt,
        {
          variant: "outline",
          size: "icon",
          className: "tw:h-8 tw:w-8 tw:p-0",
          onClick: () => t.nextPage(),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ a("span", { className: "tw:sr-only", children: "Go to next page" }),
            /* @__PURE__ */ a(Ic, { className: "tw:h-4 tw:w-4" })
          ]
        }
      ),
      /* @__PURE__ */ u(
        rt,
        {
          variant: "outline",
          size: "icon",
          className: "tw:hidden tw:h-8 tw:w-8 tw:p-0 tw:lg:flex",
          onClick: () => t.setPageIndex(t.getPageCount() - 1),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ a("span", { className: "tw:sr-only", children: "Go to last page" }),
            /* @__PURE__ */ a(Mc, { className: "tw:h-4 tw:w-4" })
          ]
        }
      )
    ] })
  ] }) });
}
function Mu({
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
  var D;
  const [w, p] = E([]), [h, m] = E([]), [k, g] = E({}), [f, N] = E({}), T = B(() => e ?? [], [e]), P = zi({
    data: T,
    columns: t,
    getCoreRowModel: Ai(),
    ...r && { getPaginationRowModel: vd() },
    onSortingChange: p,
    getSortedRowModel: Pi(),
    onColumnFiltersChange: m,
    getFilteredRowModel: md(),
    onColumnVisibilityChange: g,
    onRowSelectionChange: N,
    state: {
      sorting: w,
      columnFilters: h,
      columnVisibility: k,
      rowSelection: f
    }
  }), R = P.getVisibleFlatColumns();
  let U;
  return d ? U = Array.from({ length: 10 }).map((M, A) => `skeleton-row-${A}`).map((M) => /* @__PURE__ */ a(lr, { className: "tw:hover:bg-transparent", children: /* @__PURE__ */ a(Mr, { colSpan: R.length ?? t.length, className: "tw:border-0 tw:p-0", children: /* @__PURE__ */ a("div", { className: "tw:w-full tw:py-2", children: /* @__PURE__ */ a(Ir, { className: "tw:h-14 tw:w-full tw:rounded-md" }) }) }) }, M)) : ((D = P.getRowModel().rows) == null ? void 0 : D.length) > 0 ? U = P.getRowModel().rows.map((V) => /* @__PURE__ */ a(
    lr,
    {
      onClick: () => s(V, P),
      "data-state": V.getIsSelected() && "selected",
      children: V.getVisibleCells().map(($) => /* @__PURE__ */ a(Mr, { children: Jr($.column.columnDef.cell, $.getContext()) }, $.id))
    },
    V.id
  )) : U = /* @__PURE__ */ a(lr, { children: /* @__PURE__ */ a(Mr, { colSpan: t.length, className: "tw:h-24 tw:text-center", children: l }) }), /* @__PURE__ */ u("div", { className: "pr-twp", id: c, children: [
    n && /* @__PURE__ */ a(Ru, { table: P }),
    /* @__PURE__ */ u(Mo, { stickyHeader: i, children: [
      /* @__PURE__ */ a(zo, { stickyHeader: i, children: P.getHeaderGroups().map((V) => /* @__PURE__ */ a(lr, { children: V.headers.map(($) => /* @__PURE__ */ a(Ra, { className: "tw:p-0", children: $.isPlaceholder ? void 0 : Jr($.column.columnDef.header, $.getContext()) }, $.id)) }, V.id)) }),
      /* @__PURE__ */ a(Po, { children: U })
    ] }),
    r && /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:justify-end tw:space-x-2 tw:py-4", children: [
      /* @__PURE__ */ a(
        rt,
        {
          variant: "outline",
          size: "sm",
          onClick: () => P.previousPage(),
          disabled: !P.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ a(
        rt,
        {
          variant: "outline",
          size: "sm",
          onClick: () => P.nextPage(),
          disabled: !P.getCanNextPage(),
          children: "Next"
        }
      )
    ] }),
    r && o && /* @__PURE__ */ a(Iu, { table: P })
  ] });
}
function fg({
  id: t,
  markdown: e,
  className: r,
  anchorTarget: o,
  truncate: n
}) {
  const i = B(
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
      className: x(
        "pr-twp tw:prose",
        {
          "tw:line-clamp-3 tw:max-h-10 tw:overflow-hidden tw:text-ellipsis tw:break-words": n
        },
        r
      ),
      children: /* @__PURE__ */ a(yd, { options: i, children: e })
    }
  );
}
const zu = Object.freeze([
  "%webView_error_dump_header%",
  "%webView_error_dump_info_message%"
]), Bn = (t, e) => t[e] ?? e;
function Pu({
  errorDetails: t,
  handleCopyNotify: e,
  localizedStrings: r,
  id: o
}) {
  const n = Bn(r, "%webView_error_dump_header%"), i = Bn(r, "%webView_error_dump_info_message%");
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
          /* @__PURE__ */ a(rt, { variant: "secondary", size: "icon", className: "size-8", onClick: () => s(), children: /* @__PURE__ */ a(ui, {}) })
        ] }),
        /* @__PURE__ */ a("div", { className: "tw:prose tw:w-full", children: /* @__PURE__ */ a("pre", { className: "tw:text-xs", children: t }) })
      ]
    }
  );
}
const mg = Object.freeze([
  ...zu,
  "%webView_error_dump_copied_message%"
]);
function vg({
  errorDetails: t,
  handleCopyNotify: e,
  localizedStrings: r,
  children: o,
  className: n,
  id: i
}) {
  const [s, c] = E(!1), d = () => {
    c(!0), e && e();
  };
  return /* @__PURE__ */ u(_r, { onOpenChange: (w) => {
    w || c(!1);
  }, children: [
    /* @__PURE__ */ a(jr, { asChild: !0, children: o }),
    /* @__PURE__ */ u(Nr, { id: i, className: x("tw:min-w-80 tw:max-w-96", n), children: [
      s && r["%webView_error_dump_copied_message%"] && /* @__PURE__ */ a($t, { children: r["%webView_error_dump_copied_message%"] }),
      /* @__PURE__ */ a(
        Pu,
        {
          errorDetails: t,
          handleCopyNotify: d,
          localizedStrings: r
        }
      )
    ] })
  ] });
}
var Au = /* @__PURE__ */ ((t) => (t[t.Check = 0] = "Check", t[t.Radio = 1] = "Radio", t))(Au || {});
function bg({ id: t, label: e, groups: r }) {
  const [o, n] = E(
    Object.fromEntries(
      r.map(
        (l, w) => l.itemType === 0 ? [w, []] : void 0
      ).filter((l) => !!l)
    )
  ), [i, s] = E({}), c = (l, w) => {
    const p = !o[l][w];
    n((m) => (m[l][w] = p, { ...m }));
    const h = r[l].items[w];
    h.onUpdate(h.id, p);
  }, d = (l, w) => {
    s((h) => (h[l] = w, { ...h }));
    const p = r[l].items.find((h) => h.id === w);
    p ? p.onUpdate(w) : console.error(`Could not find dropdown radio item with id '${w}'!`);
  };
  return /* @__PURE__ */ a("div", { id: t, children: /* @__PURE__ */ u(tr, { children: [
    /* @__PURE__ */ a(Ke, { asChild: !0, children: /* @__PURE__ */ u(rt, { variant: "default", children: [
      /* @__PURE__ */ a(zc, { size: 16, className: "tw:mr-2 tw:h-4 tw:w-4" }),
      e,
      /* @__PURE__ */ a(xr, { size: 16, className: "tw:ml-2 tw:h-4 tw:w-4" })
    ] }) }),
    /* @__PURE__ */ a(er, { children: r.map((l, w) => /* @__PURE__ */ u("div", { children: [
      /* @__PURE__ */ a(kr, { children: l.label }),
      /* @__PURE__ */ a(ri, { children: l.itemType === 0 ? /* @__PURE__ */ a(mt, { children: l.items.map((p, h) => /* @__PURE__ */ a("div", { children: /* @__PURE__ */ a(
        wr,
        {
          checked: o[w][h],
          onCheckedChange: () => c(w, h),
          children: p.label
        }
      ) }, p.id)) }) : /* @__PURE__ */ a(
        Ws,
        {
          value: i[w],
          onValueChange: (p) => d(w, p),
          children: l.items.map((p) => /* @__PURE__ */ a("div", { children: /* @__PURE__ */ a(Ys, { value: p.id, children: p.label }) }, p.id))
        }
      ) }),
      /* @__PURE__ */ a(br, {})
    ] }, l.label)) })
  ] }) });
}
function xg({
  id: t,
  category: e,
  downloads: r,
  languages: o,
  moreInfoUrl: n,
  handleMoreInfoLinkClick: i,
  supportUrl: s,
  handleSupportLinkClick: c
}) {
  const d = new fi("en", {
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
            /* @__PURE__ */ a(Pc, { className: "tw:h-4 tw:w-4" }),
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
            rt,
            {
              onClick: () => i(),
              variant: "link",
              className: "tw:flex tw:h-auto tw:gap-1 tw:py-0 tw:text-xs tw:font-semibold tw:text-foreground",
              children: [
                "Website",
                /* @__PURE__ */ a(Ac, { className: "tw:h-4 tw:w-4" })
              ]
            }
          ) }),
          s && /* @__PURE__ */ a("div", { className: "tw:flex tw:gap-1", children: /* @__PURE__ */ u(
            rt,
            {
              onClick: () => c(),
              variant: "link",
              className: "tw:flex tw:h-auto tw:gap-1 tw:py-0 tw:text-xs tw:font-semibold tw:text-foreground",
              children: [
                "Support",
                /* @__PURE__ */ a($c, { className: "tw:h-4 tw:w-4" })
              ]
            }
          ) })
        ] })
      ]
    }
  );
}
function $u({ id: t, versionHistory: e }) {
  const [r, o] = E(!1), n = /* @__PURE__ */ new Date();
  function i(c) {
    const d = new Date(c), l = new Date(n.getTime() - d.getTime()), w = l.getUTCFullYear() - 1970, p = l.getUTCMonth(), h = l.getUTCDate() - 1;
    let m = "";
    return w > 0 ? m = `${w.toString()} year${w === 1 ? "" : "s"} ago` : p > 0 ? m = `${p.toString()} month${p === 1 ? "" : "s"} ago` : h === 0 ? m = "today" : m = `${h.toString()} day${h === 1 ? "" : "s"} ago`, m;
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
function yg({
  id: t,
  publisherDisplayName: e,
  fileSize: r,
  locales: o,
  versionHistory: n,
  currentVersion: i
}) {
  const s = B(() => al(r), [r]), d = ((l) => {
    const w = new Intl.DisplayNames(ol(), { type: "language" });
    return l.map((p) => w.of(p));
  })(o);
  return /* @__PURE__ */ a("div", { id: t, className: "pr-twp tw:border-t tw:py-2", children: /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:gap-2 tw:divide-y", children: [
    Object.entries(n).length > 0 && /* @__PURE__ */ a($u, { versionHistory: n }),
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
function kg({
  entries: t,
  selected: e,
  onChange: r,
  placeholder: o,
  searchPlaceholder: n,
  commandEmptyMessage: i,
  customSelectedText: s,
  isDisabled: c,
  sortSelected: d,
  showScrollCue: l,
  icon: w,
  className: p,
  badgesPlaceholder: h,
  id: m
}) {
  return /* @__PURE__ */ u("div", { id: m, className: "tw:flex tw:items-center tw:gap-2", children: [
    /* @__PURE__ */ a(
      Zs,
      {
        entries: t,
        selected: e,
        onChange: r,
        placeholder: o,
        searchPlaceholder: n,
        commandEmptyMessage: i,
        customSelectedText: s,
        isDisabled: c,
        sortSelected: d,
        showScrollCue: l,
        icon: w,
        className: p
      }
    ),
    e.length > 0 ? /* @__PURE__ */ a("div", { className: "tw:flex tw:flex-wrap tw:items-center tw:gap-2", children: e.map((k) => {
      var g;
      return /* @__PURE__ */ u(ea, { variant: "muted", className: "tw:flex tw:items-center tw:gap-1", children: [
        /* @__PURE__ */ a(
          rt,
          {
            variant: "ghost",
            size: "icon",
            className: "tw:h-4 tw:w-4 tw:p-0 tw:hover:bg-transparent",
            onClick: () => r(e.filter((f) => f !== k)),
            children: /* @__PURE__ */ a(li, { className: "tw:h-3 tw:w-3" })
          }
        ),
        (g = t.find((f) => f.value === k)) == null ? void 0 : g.label
      ] }, k);
    }) }) : /* @__PURE__ */ a($t, { children: h })
  ] });
}
const jn = " ";
function Vu(t, e) {
  let r = "content", o = t.parentElement;
  for (; o && o !== e; ) {
    const { classList: n } = o;
    if (n.contains("note-category")) return "category";
    if (n.contains("note-closer") || n.contains("note-placeholder"))
      return "display";
    n.contains("marker") && (r = "glyph"), o = o.parentElement;
  }
  return r;
}
function Fn(t) {
  return t.nextNode() ?? void 0;
}
function ys(t) {
  return t.data.endsWith(jn) ? t.data.length - jn.length : t.data.length;
}
function Lu(t, e, r) {
  var l, w;
  const o = t.querySelector(".note-category-value");
  if (o != null && o.contains(e)) return { utf16Offset: r, field: "category" };
  const n = (l = e.parentElement) == null ? void 0 : l.closest(".marker");
  if (!o || !n || !t.contains(n)) return { utf16Offset: 0 };
  const i = n === t.querySelector(".marker"), s = ((w = o.textContent) == null ? void 0 : w.length) ?? 0, c = i ? 0 : s;
  return r > ys(e) ? { utf16Offset: c, field: "category" } : { utf16Offset: c, field: "category", glyph: { index: !i && s === 0 ? 1 : 0, offset: r } };
}
function Un(t, e, r) {
  var s;
  const o = document.createTreeWalker(t, NodeFilter.SHOW_TEXT);
  let n = 0, i = 0;
  for (let c = Fn(o); c; c = Fn(o)) {
    const d = Vu(c, t);
    if (d === "category") {
      if (c === e) {
        const l = (s = c.parentElement) == null ? void 0 : s.closest(".note-category");
        return l ? Lu(l, c, r) : { utf16Offset: 0 };
      }
    } else if (d === "display") {
      if (c === e) return { utf16Offset: n };
    } else if (d === "glyph") {
      if (c === e)
        return r > ys(c) ? { utf16Offset: n } : { utf16Offset: n, glyph: { index: i, offset: r } };
      i += 1;
    } else {
      if (c === e) return { utf16Offset: n + r };
      n += c.data.length, c.data.length > 0 && (i = 0);
    }
  }
  return "end";
}
function Kn(t) {
  return t.nodeType === Node.TEXT_NODE ? t : document.createTreeWalker(t, NodeFilter.SHOW_TEXT).nextNode() ?? void 0;
}
function Bu(t, e, r) {
  var s;
  const o = r.querySelector(".textual-note-body");
  if (!o) return "end";
  let n, i = 0;
  if (typeof document.caretPositionFromPoint == "function") {
    const c = document.caretPositionFromPoint(t, e);
    c && (n = c.offsetNode, i = c.offset);
  } else if (typeof document.caretRangeFromPoint == "function") {
    const c = document.caretRangeFromPoint(t, e);
    c && (n = c.startContainer, i = c.startOffset);
  }
  if (!n) return "end";
  if ((s = r.querySelector(".textual-note-header")) != null && s.contains(n)) {
    const c = Kn(o);
    return c ? Un(o, c, 0) : "end";
  }
  if (!o.contains(n)) return "end";
  if (n.nodeType === Node.ELEMENT_NODE) {
    const c = n.childNodes[i], d = c ? Kn(c) : void 0;
    if (!d) return "end";
    n = d, i = 0;
  }
  return n.nodeType !== Node.TEXT_NODE ? "end" : Un(o, n, i);
}
const ju = Object.freeze([
  "%undoButton_tooltip%",
  "%redoButton_tooltip%"
]), Hn = (t, e) => t[e] ?? e;
function Fu({
  onUndoClick: t,
  onRedoClick: e,
  canUndo: r = !0,
  canRedo: o = !0,
  localizedStrings: n = {},
  showKeyboardShortcuts: i = !0,
  className: s = "tw:h-6 tw:w-6",
  variant: c = "ghost"
}) {
  const d = Io(), l = Hn(n, "%undoButton_tooltip%"), w = Hn(n, "%redoButton_tooltip%");
  return /* @__PURE__ */ u(Va, { children: [
    /* @__PURE__ */ a(Vt, { children: /* @__PURE__ */ u(vt, { children: [
      /* @__PURE__ */ a(bt, { asChild: !0, children: /* @__PURE__ */ a(
        rt,
        {
          "aria-label": l,
          className: s,
          size: "icon",
          onClick: t,
          disabled: !r,
          variant: c,
          children: /* @__PURE__ */ a(Vc, {})
        }
      ) }),
      /* @__PURE__ */ a(xt, { children: /* @__PURE__ */ u("p", { children: [
        l,
        i && /* @__PURE__ */ u(mt, { children: [
          " ",
          /* @__PURE__ */ a(go, { children: d ? "⌘Z" : "Ctrl+Z" })
        ] })
      ] }) })
    ] }) }),
    e && (c === "secondary" || c === "default") && /* @__PURE__ */ a(Oo, {}),
    e && /* @__PURE__ */ a(Vt, { children: /* @__PURE__ */ u(vt, { children: [
      /* @__PURE__ */ a(bt, { asChild: !0, children: /* @__PURE__ */ a(
        rt,
        {
          "aria-label": w,
          className: s,
          size: "icon",
          onClick: e,
          disabled: !o,
          variant: c,
          children: /* @__PURE__ */ a(Lc, {})
        }
      ) }),
      /* @__PURE__ */ a(xt, { children: /* @__PURE__ */ u("p", { children: [
        w,
        i && /* @__PURE__ */ u(mt, { children: [
          " ",
          /* @__PURE__ */ a(go, { children: d ? "⌘⇧Z" : "Ctrl+Y" })
        ] })
      ] }) })
    ] }) })
  ] });
}
function Uu({
  children: t,
  editorRef: e,
  canUndo: r = !0,
  canRedo: o = !0
}) {
  const n = I(null);
  return q(() => {
    var d;
    const i = Io(), s = ((d = n.current) == null ? void 0 : d.querySelector(".editor-input")) ?? void 0, c = (l) => {
      var p, h, m, k;
      if (!s || document.activeElement !== s) return;
      const w = l.key.toLowerCase();
      if (i) {
        if (!l.metaKey) return;
        !l.shiftKey && w === "z" ? (l.preventDefault(), r && ((p = e.current) == null || p.undo())) : l.shiftKey && w === "z" && (l.preventDefault(), o && ((h = e.current) == null || h.redo()));
      } else {
        if (!l.ctrlKey) return;
        !l.shiftKey && w === "z" ? (l.preventDefault(), r && ((m = e.current) == null || m.undo())) : (w === "y" || l.shiftKey && w === "z") && (l.preventDefault(), o && ((k = e.current) == null || k.redo()));
      }
    };
    return document.addEventListener("keydown", c), () => document.removeEventListener("keydown", c);
  }, [o, r, e]), /* @__PURE__ */ a("div", { ref: n, children: t });
}
function Ku() {
  const t = I(void 0), e = I(new DOMRect()), r = I({
    getBoundingClientRect: () => {
      var i;
      const n = (i = t.current) == null ? void 0 : i.measure();
      return n && (e.current = n), e.current;
    },
    get contextElement() {
      var n;
      return (n = t.current) == null ? void 0 : n.contextElement;
    }
  }), o = L((n) => {
    t.current = n, e.current = n.measure() ?? new DOMRect();
  }, []);
  return B(() => ({ virtualRef: r, setSource: o }), [o]);
}
function Hu(t) {
  if (t.getClientRects().length !== 0)
    return t.getBoundingClientRect();
}
function qu(t) {
  return new DOMRect(t.left, t.top, 0, t.height);
}
const Gu = (t, e, r) => t === "generated" ? /* @__PURE__ */ u(mt, { children: [
  /* @__PURE__ */ a("p", { children: "+" }),
  " ",
  e["%footnoteEditor_callerDropdown_item_generated%"]
] }) : t === "hidden" ? /* @__PURE__ */ u(mt, { children: [
  /* @__PURE__ */ a("p", { children: "-" }),
  " ",
  e["%footnoteEditor_callerDropdown_item_hidden%"]
] }) : /* @__PURE__ */ u(mt, { children: [
  /* @__PURE__ */ a("p", { children: r }),
  " ",
  e["%footnoteEditor_callerDropdown_item_custom%"]
] });
function Wu({
  callerType: t,
  customCaller: e,
  updateCaller: r,
  localizedStrings: o,
  focusNoteText: n
}) {
  const i = I(!1), s = I(null), c = I(null), d = I(!1), [l, w] = E(t), [p, h] = E(e), [m, k] = E(!1), g = I(!1), f = I(l);
  f.current = l;
  const N = I(p);
  N.current = p, q(() => {
    w(t);
  }, [t]), q(() => {
    p !== e && h(e);
  }, [e]);
  const T = (R) => {
    if (d.current = !1, k(R), !R) {
      const U = f.current, D = N.current;
      U !== "custom" || D ? (U !== t || D !== e) && (i.current = !0, r(U, D)) : (w(t), h(e));
    }
  }, P = (R) => {
    var U, D, V, $;
    R.stopPropagation(), document.activeElement === c.current && R.key === "ArrowDown" || R.key === "ArrowRight" ? ((U = s.current) == null || U.focus(), d.current = !0) : document.activeElement === s.current && R.key === "ArrowUp" ? ((D = c.current) == null || D.focus(), d.current = !1) : document.activeElement === s.current && R.key === "ArrowLeft" && ((V = s.current) == null ? void 0 : V.selectionStart) === 0 && (($ = c.current) == null || $.focus(), d.current = !1), l === "custom" && R.key === "Enter" && (document.activeElement === c.current || document.activeElement === s.current) && T(!1);
  };
  return /* @__PURE__ */ u(tr, { open: m, onOpenChange: T, children: [
    /* @__PURE__ */ a(Vt, { children: /* @__PURE__ */ u(vt, { children: [
      /* @__PURE__ */ a(bt, { asChild: !0, children: /* @__PURE__ */ a(Ke, { asChild: !0, children: /* @__PURE__ */ a(rt, { variant: "outline", className: "tw:h-6", children: Gu(t, o, e) }) }) }),
      /* @__PURE__ */ a(xt, { children: o["%footnoteEditor_callerDropdown_tooltip%"] })
    ] }) }),
    /* @__PURE__ */ u(
      er,
      {
        style: { zIndex: ai },
        onEscapeKeyDown: () => {
          f.current = t, N.current = e, w(t), h(e);
        },
        onCloseAutoFocus: (R) => {
          i.current && (i.current = !1, R.preventDefault(), n());
        },
        onClick: () => {
          d.current && (d.current = !1);
        },
        onKeyDown: P,
        onMouseMove: () => {
          var R;
          d.current && ((R = s.current) == null || R.focus());
        },
        children: [
          /* @__PURE__ */ a(kr, { children: o["%footnoteEditor_callerDropdown_label%"] }),
          /* @__PURE__ */ a(br, {}),
          /* @__PURE__ */ a(
            wr,
            {
              checked: l === "generated",
              onCheckedChange: () => w("generated"),
              children: /* @__PURE__ */ u("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ a("span", { children: o["%footnoteEditor_callerDropdown_item_generated%"] }),
                /* @__PURE__ */ a("span", { className: "tw:w-10 tw:text-center", children: bo })
              ] })
            }
          ),
          /* @__PURE__ */ a(
            wr,
            {
              checked: l === "hidden",
              onCheckedChange: () => w("hidden"),
              children: /* @__PURE__ */ u("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ a("span", { children: o["%footnoteEditor_callerDropdown_item_hidden%"] }),
                /* @__PURE__ */ a("span", { className: "tw:w-10 tw:text-center", children: xo })
              ] })
            }
          ),
          /* @__PURE__ */ a(
            wr,
            {
              ref: c,
              checked: l === "custom",
              onCheckedChange: () => w("custom"),
              onPointerDown: () => {
                g.current = l === "custom";
              },
              onClick: (R) => {
                var U;
                if (R.stopPropagation(), g.current && R.target !== s.current) {
                  T(!1);
                  return;
                }
                d.current = !0, (U = s.current) == null || U.focus();
              },
              onSelect: (R) => R.preventDefault(),
              children: /* @__PURE__ */ u("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ a("span", { children: o["%footnoteEditor_callerDropdown_item_custom%"] }),
                /* @__PURE__ */ a(
                  Ba,
                  {
                    tabIndex: 0,
                    onMouseDown: (R) => {
                      R.stopPropagation(), w("custom"), d.current = !0;
                    },
                    ref: s,
                    className: "tw:h-auto tw:w-10 tw:p-0 tw:text-center",
                    value: p,
                    onKeyDown: (R) => {
                      R.key === "Enter" || R.key === "ArrowUp" || R.key === "ArrowDown" || R.key === "ArrowLeft" || R.key === "ArrowRight" || R.stopPropagation();
                    },
                    maxLength: 1,
                    onChange: (R) => h(R.target.value)
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
const Yu = (t, e) => t === "f" ? /* @__PURE__ */ u(mt, { children: [
  /* @__PURE__ */ a(hi, {}),
  " ",
  e["%footnoteEditor_noteType_footnote_label%"]
] }) : t === "fe" ? /* @__PURE__ */ u(mt, { children: [
  /* @__PURE__ */ a(gi, {}),
  " ",
  e["%footnoteEditor_noteType_endNote_label%"]
] }) : /* @__PURE__ */ u(mt, { children: [
  /* @__PURE__ */ a(pi, {}),
  " ",
  e["%footnoteEditor_noteType_crossReference_label%"]
] }), Zu = (t, e) => {
  if (t === "x")
    return e["%footnoteEditor_noteType_crossReference_label%"];
  let r = e["%footnoteEditor_noteType_endNote_label%"];
  return t === "f" && (r = e["%footnoteEditor_noteType_footnote_label%"]), dr(e["%footnoteEditor_noteType_tooltip%"] ?? "", {
    noteType: r
  });
};
function Xu({
  noteType: t,
  handleNoteTypeChange: e,
  localizedStrings: r,
  isTypeSwitchable: o,
  focusNoteText: n
}) {
  const i = I(!1), s = (c) => {
    c !== t && (i.current = !0, e(c));
  };
  return /* @__PURE__ */ u(tr, { children: [
    /* @__PURE__ */ a(Vt, { children: /* @__PURE__ */ u(vt, { children: [
      /* @__PURE__ */ a(bt, { asChild: !0, children: /* @__PURE__ */ a(Ke, { asChild: !0, children: /* @__PURE__ */ a(rt, { variant: "outline", className: "tw:h-6", children: Yu(t, r) }) }) }),
      /* @__PURE__ */ a(xt, { children: /* @__PURE__ */ a("p", { children: Zu(t, r) }) })
    ] }) }),
    /* @__PURE__ */ u(
      er,
      {
        style: { zIndex: ai },
        onCloseAutoFocus: (c) => {
          i.current && (i.current = !1, c.preventDefault(), n());
        },
        children: [
          /* @__PURE__ */ a(kr, { children: r["%footnoteEditor_noteTypeDropdown_label%"] }),
          /* @__PURE__ */ a(br, {}),
          /* @__PURE__ */ u(
            wr,
            {
              disabled: t !== "x" && !o,
              checked: t === "x",
              onCheckedChange: () => s("x"),
              className: "tw:gap-2",
              children: [
                /* @__PURE__ */ a(pi, {}),
                /* @__PURE__ */ a("span", { children: r["%footnoteEditor_noteType_crossReference_label%"] })
              ]
            }
          ),
          /* @__PURE__ */ u(
            wr,
            {
              disabled: t === "x" && !o,
              checked: t === "f",
              onCheckedChange: () => s("f"),
              className: "tw:gap-2",
              children: [
                /* @__PURE__ */ a(hi, {}),
                /* @__PURE__ */ a("span", { children: r["%footnoteEditor_noteType_footnote_label%"] })
              ]
            }
          ),
          /* @__PURE__ */ u(
            wr,
            {
              disabled: t === "x" && !o,
              checked: t === "fe",
              onCheckedChange: () => s("fe"),
              className: "tw:gap-2",
              children: [
                /* @__PURE__ */ a(gi, {}),
                /* @__PURE__ */ a("span", { children: r["%footnoteEditor_noteType_endNote_label%"] })
              ]
            }
          )
        ]
      }
    )
  ] });
}
const Ju = Object.freeze([
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
function Qu({ icon: t, className: e }) {
  return /* @__PURE__ */ a(t ?? Bc, { className: e, size: 16 });
}
function tp({ state: t }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "marker-selection-state",
      className: "tw:flex tw:w-4 tw:min-w-4 tw:items-center tw:justify-center",
      children: t !== "none" && /* @__PURE__ */ a(pr, { size: 16 })
    }
  );
}
function qn({
  item: t,
  localizedStrings: e
}) {
  return /* @__PURE__ */ u(
    gr,
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
        t.selectionState !== void 0 && /* @__PURE__ */ a(tp, { state: t.selectionState }),
        /* @__PURE__ */ a("div", { className: "tw:w-8 tw:min-w-8", children: t.marker ? (
          // Monospace: a USFM marker is a code, not prose, and should read as one. Deliberately
          // inherits the row's own foreground rather than taking a marker-specific colour.
          /* @__PURE__ */ a("span", { className: "tw:font-mono tw:text-xs", children: t.marker })
        ) : /* @__PURE__ */ a("div", { children: /* @__PURE__ */ a(Qu, { icon: t.icon }) }) }),
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
        (t.isDisallowed || t.isDeprecated) && /* @__PURE__ */ a(Js, { className: "tw:font-sans", children: t.isDisallowed ? e["%markerMenu_disallowed_label%"] : e["%markerMenu_deprecated_label%"] })
      ]
    }
  );
}
function ep({
  localizedStrings: t,
  markerMenuItems: e,
  searchRef: r,
  searchPlaceholder: o
}) {
  const [n, i] = E(""), [s, c] = B(() => {
    const d = Xs(n.trim().toLowerCase());
    if (!d) {
      const p = e.filter((h) => !h.isDisallowed);
      return [p.length > 0 ? p : e, []];
    }
    const l = e.filter((p) => {
      var m;
      const h = (m = p.marker) == null ? void 0 : m.toLowerCase();
      return p.isDisallowed ? h === d : h == null ? void 0 : h.includes(d);
    }), w = e.filter(
      (p) => p.title.toLowerCase().includes(d) && !l.includes(p)
    );
    return [l, w];
  }, [n, e]);
  return /* @__PURE__ */ u(Cr, { className: "tw:p-1", shouldFilter: !1, loop: !0, children: [
    /* @__PURE__ */ a(
      $a,
      {
        className: "marker-menu-search",
        ref: r,
        value: n,
        onValueChange: (d) => i(d),
        placeholder: o ?? t["%markerMenu_searchPlaceholder%"],
        spaceSelectsHighlightedItem: !0
      }
    ),
    /* @__PURE__ */ u(Er, { children: [
      /* @__PURE__ */ a(La, { children: t["%markerMenu_noResults%"] }),
      /* @__PURE__ */ a(ur, { children: s.map((d) => {
        var l;
        return /* @__PURE__ */ a(
          qn,
          {
            item: d,
            localizedStrings: t
          },
          `item-${d.marker ?? ((l = d.icon) == null ? void 0 : l.displayName)}-${d.title.replaceAll(" ", "")}`
        );
      }) }),
      c.length > 0 && /* @__PURE__ */ u(mt, { children: [
        s.length > 0 && /* @__PURE__ */ a(oi, { alwaysRender: !0 }),
        /* @__PURE__ */ a(ur, { children: c.map((d) => {
          var l;
          return /* @__PURE__ */ a(
            qn,
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
function rp(t, e, r, o, n) {
  if (!o || o === "p") return [];
  const i = Wr[o], s = i != null && i.children ? i : n && Wr[n];
  if (!s || !s.children) return [];
  const c = [];
  return Object.entries(s.children).forEach(([, d]) => {
    c.push(
      ...d.map((l) => ({
        marker: l,
        title: r[Wr[l].description] ?? Wr[l].description,
        action: () => {
          var w;
          (w = t.current) == null || w.insertMarker(l), e();
        }
      }))
    );
  }), c.sort((d, l) => (d.marker ?? d.title).localeCompare(l.marker ?? l.title));
}
function Gn(t) {
  if (!t || !Or("note", t)) return !1;
  const { note: e } = t.insert;
  return !!e && "closed" in e && e.closed === "false";
}
function ap(t) {
  return {
    id: t.marker,
    label: t.marker,
    description: t.description,
    badge: t.kind === "closeTag" ? "%markerMenu_endTag_label%" : void 0,
    muted: !t.isBasic
  };
}
function op(t) {
  return t.reduce(
    (e, r) => e + (typeof r.insert == "string" ? r.insert.length : 1),
    0
  );
}
function np(t, e) {
  let r = 0, o = 0;
  return e.every((n) => {
    if (typeof n.insert != "string") {
      const s = t[r];
      return o !== 0 || !s || !ir(s, n) ? !1 : (r += 1, !0);
    }
    let i = n.insert;
    for (; i.length > 0; ) {
      const s = t[r];
      if (!s || typeof s.insert != "string" || !ir(s.attributes, n.attributes))
        return !1;
      const c = s.insert.slice(o), d = Math.min(c.length, i.length);
      if (c.slice(0, d) !== i.slice(0, d)) return !1;
      i = i.slice(d), o += d, o === s.insert.length && (r += 1, o = 0);
    }
    return !0;
  });
}
function ip(t) {
  var r;
  const e = (r = t.attributes) == null ? void 0 : r.char;
  e != null && e.style && (e.style === "ft" && (e.style = "xt"), e.style === "fr" && (e.style = "xo"), e.style === "fq" && (e.style = "xq"));
}
function sp(t) {
  var r;
  const e = (r = t.attributes) == null ? void 0 : r.char;
  e != null && e.style && (e.style === "xt" && (e.style = "ft"), e.style === "xo" && (e.style = "fr"), e.style === "xq" && (e.style = "fq"));
}
const cp = 300, so = "*", lp = {
  type: "USJ",
  version: "3.1",
  content: [
    {
      type: "para"
    }
  ]
};
function _g({
  classNameForEditor: t,
  noteOps: e,
  onChange: r,
  onClose: o,
  scrRef: n,
  noteKey: i,
  editorOptions: s,
  defaultMarkerMenuTrigger: c,
  localizedStrings: d,
  parentEditorRef: l,
  inline: w = !1,
  ref: p,
  initialCaretPosition: h,
  markerPalette: m,
  onNoteEdit: k
}) {
  var or;
  const g = I(null), f = I(null), N = I(null), T = I(i);
  q(() => {
    T.current = i;
  }, [i]);
  const P = I(h);
  q(() => {
    P.current = h;
  }, [h]);
  const R = L(() => {
    var v, O;
    const _ = P.current;
    _ !== void 0 && _ !== "end" ? (v = g.current) == null || v.selectNoteTextOffset(0, _.utf16Offset, {
      field: _.field,
      glyph: _.glyph
    }) : (O = g.current) == null || O.selectNote(0);
  }, []);
  Kt(() => {
    if (w || !N.current) return;
    const _ = parseFloat(getComputedStyle(N.current).width);
    _ > 0 && (N.current.style.width = `${_}px`);
  }, [w]);
  const [U, D] = E("generated"), [V, $] = E("generated"), [M, A] = E(so), [Y, J] = E(so), [et, y] = E("f"), [at, C] = E(!1), [S, K] = E(!0), [j, G] = E(!1), it = I(!1), st = I(""), Z = I(!1), wt = I(void 0), lt = I([]), ut = I([]), kt = I(void 0), Tt = I(void 0), Ht = L(() => {
    var v;
    const _ = (v = g.current) == null ? void 0 : v.takeOpsAfterNote(0);
    _ != null && _.length && (lt.current = [...lt.current, ..._], kt.current = void 0);
  }, []), Le = L(
    (_, v) => {
      var X, tt;
      if (!_) return;
      const O = Gn(_), z = Gn(v);
      if (!O && z) {
        kt.current = {
          text: lt.current,
          closedNoteOp: _,
          openNoteOp: v
        }, lt.current = [];
        return;
      }
      const Q = kt.current;
      Q && (O && !z && ir(_, Q.openNoteOp) && ir(v, Q.closedNoteOp) && !((tt = (X = g.current) == null ? void 0 : X.getOpsAfterNote(0)) != null && tt.length) ? (lt.current = Q.text, kt.current = void 0) : ir(v, Q.openNoteOp) || (kt.current = void 0));
    },
    []
  ), [Rt, Dt] = E(!1), _t = Ku(), [qt, Ie] = E(), Ce = I(null), yt = I(
    void 0
  ), ft = I(0), ge = I(m);
  q(() => {
    ge.current = m;
  }, [m]), q(
    () => () => {
      var _;
      yt.current && (yt.current = void 0, (_ = ge.current) == null || _.dismiss());
    },
    []
  );
  const Ee = I(void 0), fe = I(void 0), Jt = L(() => {
    var v, O, z;
    if ((v = g.current) != null && v.getSelection()) return;
    const _ = Ee.current;
    _ ? (O = g.current) == null || O.setSelection(_) : (z = g.current) == null || z.selectNote(0);
  }, []), ne = L(() => {
    var _;
    Jt(), (_ = g.current) == null || _.focus();
  }, [Jt]), Qt = B(
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
        ...s.view ?? kd(),
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
    [s, c]
  ), Nt = B(
    () => rp(
      g,
      () => Dt(!1),
      d,
      qt,
      et
    ),
    [d, qt, et]
  );
  q(() => {
    var _;
    Rt || (_ = g.current) == null || _.focus();
  }, [et, Rt]);
  const Lt = L(() => {
    var z, Q, X;
    const _ = (z = f.current) == null ? void 0 : z.querySelector(".editor-input"), v = _ == null ? void 0 : _.querySelector("span.note"), O = (X = (Q = f.current) == null ? void 0 : Q.ownerDocument.getSelection()) == null ? void 0 : X.anchorNode;
    return !!v && !!O && v.contains(O);
  }, []), te = L(
    (_ = !1) => {
      var O, z, Q, X, tt;
      k == null || k();
      const v = (z = (O = g.current) == null ? void 0 : O.getNoteOps(0)) == null ? void 0 : z.at(0);
      if (v && Or("note", v) && (r == null || r([v]), _ && l && T.current)) {
        const ct = [
          ...lt.current,
          ...((Q = g.current) == null ? void 0 : Q.getOpsAfterNote(0)) ?? []
        ], ht = ut.current, we = !ir(ct, ht);
        if (w && !we && ir(v, wt.current))
          return;
        wt.current = v;
        const St = [v];
        we && (ht.length > 0 && np(
          ((X = l.current) == null ? void 0 : X.getOpsAfterNote(T.current)) ?? [],
          ht
        ) && St.push({ delete: op(ht) }), St.push(...ct), ut.current = ct), (tt = l.current) == null || tt.replaceEmbedUpdate(T.current, St);
      }
    },
    [w, r, k, l]
  ), F = L(
    (_) => {
      var O, z, Q;
      const v = (O = g.current) == null ? void 0 : O.getSelection();
      (z = g.current) == null || z.applyUpdate([_, { delete: 1 }]), v && ((Q = g.current) == null || Q.setSelection(v)), ne();
    },
    [ne]
  ), pt = L(
    (_, v) => {
      var Q, X, tt;
      yt.current || (Q = g.current) == null || Q.commitPendingMarkerEdits();
      const O = (tt = (X = g.current) == null ? void 0 : X.getNoteOps(0)) == null ? void 0 : tt.at(0);
      if (!O || !Or("note", O) || !O.insert.note) return;
      let z;
      _ === "custom" ? z = v : _ === "generated" ? z = bo : z = xo, O.insert.note.caller !== z && (O.insert.note.caller = z, F(O));
    },
    [F]
  ), ee = I(void 0), It = I(te);
  q(() => {
    It.current = te;
  }, [te]);
  const Ct = L(() => {
    ee.current !== void 0 && (clearTimeout(ee.current), ee.current = void 0);
  }, []), Ot = L(() => {
    ee.current !== void 0 && (Ct(), It.current(!0));
  }, [Ct]), re = L(() => {
    Ct(), ee.current = setTimeout(() => {
      ee.current = void 0, It.current(!0);
    }, cp);
  }, [Ct]);
  q(() => {
    var Q, X;
    let _, v, O;
    it.current = !1, Z.current = !1, Ee.current = void 0, K(!0);
    const z = e == null ? void 0 : e.at(0);
    if (wt.current = z, lt.current = [], ut.current = [], kt.current = void 0, Tt.current = void 0, z && Or("note", z)) {
      const tt = (Q = z.insert.note) == null ? void 0 : Q.caller;
      let ct = "custom";
      tt === bo ? ct = "generated" : tt === xo && (ct = "hidden");
      const ht = ct === "custom" && tt !== void 0 ? tt : so;
      A(ht), J(ht), D(ct), $(ct), y(((X = z.insert.note) == null ? void 0 : X.style) ?? "f"), _ = setTimeout(() => {
        var St, Pt, jt, ke;
        const we = (Pt = (St = g.current) == null ? void 0 : St.getNoteOps(0)) == null ? void 0 : Pt.at(0);
        (jt = g.current) == null || jt.applyUpdate(we ? [z, { delete: 1 }] : [z]), R(), (ke = g.current) == null || ke.focus(), v = requestAnimationFrame(() => {
          O = setTimeout(() => {
            var _e;
            Lt() || (R(), (_e = g.current) == null || _e.focus());
          }, 0);
        });
      }, 0);
    }
    return () => {
      Ot(), P.current = void 0, _ && clearTimeout(_), v !== void 0 && cancelAnimationFrame(v), O !== void 0 && clearTimeout(O);
    };
  }, [e, Ot, Lt, R]), Kt(() => () => Ot(), [Ot]);
  const ae = L(() => {
    var _;
    Z.current && (yt.current || (_ = g.current) == null || _.commitPendingMarkerEdits(), Ot());
  }, [Ot]);
  mi(
    p,
    () => ({
      flushPendingEdits: ae,
      focus: () => {
        var _;
        return (_ = g.current) == null ? void 0 : _.focus();
      },
      containsFocus: () => {
        const _ = N.current;
        return !!_ && _.contains(_.ownerDocument.activeElement);
      }
    }),
    [ae]
  );
  const me = L(() => {
    var _, v;
    if (!yt.current) {
      const O = (_ = f.current) == null ? void 0 : _.querySelector(".editor-input");
      O != null && O.contains(O.ownerDocument.activeElement) && O.blur(), (v = g.current) == null || v.commitPendingMarkerEdits();
    }
    w ? Ot() : (Ct(), te(!0)), o();
  }, [Ct, Ot, w, o, te]), ve = I(me);
  Kt(() => {
    ve.current = me;
  });
  const Mt = I({ book: n.book, chapterNum: n.chapterNum });
  Kt(() => {
    (Mt.current.book !== n.book || Mt.current.chapterNum !== n.chapterNum) && (Mt.current = { book: n.book, chapterNum: n.chapterNum }, ve.current());
  }, [n.book, n.chapterNum]);
  const be = () => {
    var v;
    const _ = (v = f.current) == null ? void 0 : v.getElementsByClassName("editor-input")[0];
    _ != null && _.textContent && navigator.clipboard.writeText(_.textContent);
  }, Bt = L(
    (_, v) => {
      k == null || k(), D(_), A(v), pt(_, v), w && Ot();
    },
    [pt, Ot, w, k]
  ), zt = (_) => {
    var O, z, Q, X, tt;
    y(_), yt.current || (O = g.current) == null || O.commitPendingMarkerEdits();
    const v = (Q = (z = g.current) == null ? void 0 : z.getNoteOps(0)) == null ? void 0 : Q.at(0);
    if (v && Or("note", v)) {
      v.insert.note && (v.insert.note.style = _);
      const ct = (tt = (X = v.insert.note) == null ? void 0 : X.contents) == null ? void 0 : tt.ops;
      et !== "x" && _ === "x" ? ct == null || ct.forEach((ht) => ip(ht)) : et === "x" && _ !== "x" && (ct == null || ct.forEach((ht) => sp(ht))), F(v), w && Ot();
    }
  }, Be = (_) => {
    Ie(_.contextMarker), G(_.canRedo);
  }, Te = L(
    (_) => {
      var O, z, Q, X, tt, ct, ht;
      const v = (z = (O = g.current) == null ? void 0 : O.getNoteOps(0)) == null ? void 0 : z.at(0);
      if (v && Or("note", v)) {
        _.content.length > 1 && setTimeout(() => {
          var Pt;
          (Pt = g.current) == null || Pt.applyUpdate([{ retain: 2 }, { delete: 1 }]);
        }, 0);
        const we = (Q = v.insert.note) == null ? void 0 : Q.style, St = (tt = (X = v.insert.note) == null ? void 0 : X.contents) == null ? void 0 : tt.ops;
        if (we || C(!1), C(
          we === "x" ? !!(St != null && St.every((Pt) => {
            var ke, _e;
            if (!((ke = Pt.attributes) != null && ke.char)) return !0;
            const jt = ((_e = Pt.attributes) == null ? void 0 : _e.char).style;
            return jt === "xt" || jt === "xo" || jt === "xq";
          })) : !!(St != null && St.every((Pt) => {
            var ke, _e;
            if (!((ke = Pt.attributes) != null && ke.char)) return !0;
            const jt = ((_e = Pt.attributes) == null ? void 0 : _e.char).style;
            return jt === "ft" || jt === "fr" || jt === "fq";
          }))
        ), !it.current) {
          it.current = !0, st.current = JSON.stringify(v), Tt.current = v, K(!0);
          return;
        }
        Z.current = !0, Le(Tt.current, v), Tt.current = v, (ht = (ct = g.current) == null ? void 0 : ct.getOpsAfterNote(0)) != null && ht.length && setTimeout(Ht, 0), K(JSON.stringify(v) === st.current), te(), w && re();
      } else
        C(!1), K(!0);
    },
    [
      w,
      te,
      re,
      Le,
      Ht
    ]
  ), xe = L(() => {
    const _ = window.getSelection();
    if (!Nt.length || !_ || _.rangeCount === 0)
      return;
    const v = f.current;
    if (!v) return;
    const O = _.getRangeAt(0).cloneRange();
    _t.setSource({
      measure: () => {
        const z = Hu(O);
        return z && qu(z);
      },
      contextElement: v
    }), Dt(!0);
  }, [Nt, _t]), Me = I(() => {
  }), je = L(
    (_, v, O) => {
      const { anchorRect: z } = _;
      if (!m || !z) return;
      const { hasTextSelection: Q } = O;
      Qs({
        items: v,
        // The kind decides how a commit APPLIES — wrap the selected text, or land at the caret.
        // It no longer decides anything about focus: every marker palette focuses its list.
        kind: Q ? "selection" : "backslash",
        // Space COMMITS (like Enter) when the typed filter names a NOTE marker in the stylesheet.
        // This palette's own list offers note-INTERNAL markers, but the filter is whatever the user
        // typed: `\f` here materializes a NESTED `\f ` literal, and the Tier-2 tokenizer absorbs
        // the following word into it as a caller just as it does in body text. Decided from the
        // stylesheet rather than from the offered items for exactly that reason.
        isNoteMarker: (X) => nc(Qt.styleInfo, X),
        sessionCounterRef: ft,
        setSession: (X) => {
          yt.current = X, fe.current = void 0;
        },
        clearSessionIfCurrent: (X) => {
          oc(yt, X), yt.current || (fe.current = void 0);
        },
        // Through the ref so the palette always runs the CURRENT handler — the callback is
        // captured once, at show time, while the session it drives is replaced on every reopen.
        runSessionKey: (X) => Me.current(X),
        show: (X) => m.show({
          items: v.map(ap),
          anchor: z,
          keyForwarding: X
        }),
        // What a lost selection costs on this path specifically: the apply lands the marker as an
        // invalid trailing span after the note's closing marker while the typed literal strands at
        // the real caret (live-observed: a red `\fq` after `\f*`).
        restoreSelectionIfLost: Jt,
        hasEditorChangedSinceFocus: () => ac(
          fe.current,
          nn(
            () => {
              var X;
              return (X = g.current) == null ? void 0 : X.getUsj();
            },
            () => {
              var X;
              return (X = g.current) == null ? void 0 : X.getSelection();
            }
          )
        ),
        focusEditor: () => {
          var X;
          return (X = g.current) == null ? void 0 : X.focus();
        },
        applyItem: (X) => {
          var tt;
          return (tt = g.current) == null ? void 0 : tt.applyMarkerMenuSelection(X, {
            trigger: "backslash",
            // ACTIVE palette: the trigger was claimed and never landed, so there is never a
            // literal prefix for the apply to clean up.
            literalPrefixLanded: !1
          });
        },
        onShowError: (X) => {
          (!nl(X) || X.code !== il) && console.warn(
            `FootnoteEditor: the marker palette did not open: ${sl(X)}`
          );
        }
      });
    },
    [m, Jt, Qt.styleInfo]
  ), de = L(() => {
    var O;
    const _ = (O = g.current) == null ? void 0 : O.getMarkerMenuContext();
    if (!_) return !1;
    const v = _d(Qt.styleInfo ?? Nd, _);
    return v.length === 0 ? !1 : (je(_, v, { hasTextSelection: !!_.hasTextSelection }), !0);
  }, [je, Qt.styleInfo]), ye = L(
    (_) => {
      if (!m) return;
      tc(_, {
        sessionRef: yt,
        editorRef: g,
        palette: m,
        restoreCaret: Jt,
        reopenAtCaret: de,
        baselineRef: fe
      }) === "no-session" && m.dismiss();
    },
    [m, de, Jt]
  );
  q(() => {
    Me.current = ye;
  }, [ye]), q(() => {
    const _ = (v) => {
      var Q, X;
      const O = (Q = f.current) == null ? void 0 : Q.querySelector(".editor-input");
      if (!O || v.target !== O) return;
      const z = (X = g.current) == null ? void 0 : X.getSelection();
      z && (Ee.current = z), yt.current && (fe.current = nn(
        () => {
          var tt;
          return (tt = g.current) == null ? void 0 : tt.getUsj();
        },
        () => {
          var tt;
          return (tt = g.current) == null ? void 0 : tt.getSelection();
        }
      ));
    };
    return document.addEventListener("focusout", _), () => document.removeEventListener("focusout", _);
  }, []), q(() => {
    const _ = () => {
      Rt && Dt(!1);
    };
    return window.addEventListener("click", _), () => {
      window.removeEventListener("click", _);
    };
  }, [Rt]), q(() => {
    var _;
    Rt && ((_ = Ce.current) == null || _.focus());
  }, [Rt]), q(() => {
    var O;
    const _ = () => {
      var z;
      return ((z = f.current) == null ? void 0 : z.querySelector(".editor-input")) ?? void 0;
    };
    if (((O = Qt.view) == null ? void 0 : O.markerMode) === "editable") {
      const z = (tt) => {
        var we, St, Pt, jt;
        if (sn(tt)) return;
        const ct = yt.current, ht = _();
        if (!(!ht || document.activeElement !== ht)) {
          if (ct && m) {
            Me.current(tt);
            return;
          }
          if (rc(f.current)) {
            tt.key === c && (tt.preventDefault(), tt.stopPropagation());
            return;
          }
          if (tt.key === "Enter" && !Lt()) {
            tt.preventDefault(), tt.stopPropagation(), (we = g.current) == null || we.selectNote(0), (St = g.current) == null || St.focus();
            return;
          }
          if (m && tt.key === c) {
            if (!Lt()) {
              tt.preventDefault(), tt.stopPropagation(), (Pt = g.current) == null || Pt.selectNote(0), (jt = g.current) == null || jt.focus();
              return;
            }
            de() && (tt.preventDefault(), tt.stopPropagation());
          }
        }
      }, Q = () => {
        var ct, ht;
        const tt = _();
        !tt || document.activeElement !== tt || Lt() || ((ct = g.current) == null || ct.selectNote(0), (ht = g.current) == null || ht.focus());
      }, X = () => {
        yt.current && (m == null || m.dismiss());
      };
      return document.addEventListener("keydown", z, { capture: !0 }), document.addEventListener("paste", Q, { capture: !0 }), document.addEventListener("compositionstart", X, { capture: !0 }), () => {
        document.removeEventListener("keydown", z, { capture: !0 }), document.removeEventListener("paste", Q, { capture: !0 }), document.removeEventListener("compositionstart", X, {
          capture: !0
        });
      };
    }
    const v = (z) => {
      const Q = _();
      !Rt && Q && document.activeElement === Q && z.key === c ? (z.preventDefault(), xe()) : Rt && z.key === "Escape" && (z.preventDefault(), Dt(!1));
    };
    return document.addEventListener("keydown", v), () => {
      document.removeEventListener("keydown", v);
    };
  }, [
    Rt,
    xe,
    c,
    (or = Qt.view) == null ? void 0 : or.markerMode,
    Qt.styleInfo,
    m,
    de,
    Lt
  ]), q(() => {
    const _ = N.current;
    if (!w || !_) return;
    const v = (O) => {
      O.key !== "Escape" || O.defaultPrevented || sn(O) || (O.preventDefault(), O.stopPropagation(), ve.current());
    };
    return _.addEventListener("keydown", v), () => _.removeEventListener("keydown", v);
  }, [w]), q(() => {
    const _ = () => {
      var z, Q, X;
      const v = ((z = f.current) == null ? void 0 : z.querySelector(".editor-input")) ?? void 0;
      if (!v || document.activeElement !== v) return;
      const O = document.getSelection();
      O && !O.isCollapsed || Lt() || ((Q = g.current) == null || Q.selectNote(0), (X = g.current) == null || X.focus());
    };
    return document.addEventListener("pointerup", _), document.addEventListener("selectionchange", _), () => {
      document.removeEventListener("pointerup", _), document.removeEventListener("selectionchange", _);
    };
  }, [Lt]);
  const Ye = d["%footnoteEditor_copyButton_tooltip%"], ar = /* @__PURE__ */ a(
    Fu,
    {
      onUndoClick: () => {
        var _;
        return (_ = g.current) == null ? void 0 : _.undo();
      },
      onRedoClick: () => {
        var _;
        return (_ = g.current) == null ? void 0 : _.redo();
      },
      canUndo: !S,
      canRedo: j,
      localizedStrings: d
    }
  );
  return /* @__PURE__ */ u(mt, { children: [
    /* @__PURE__ */ u(
      "div",
      {
        ref: N,
        className: x("footnote-editor tw:grid tw:max-w-full tw:gap-[12px]", w && "tw:w-full"),
        children: [
          /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-wrap tw:gap-y-2", children: [
            /* @__PURE__ */ u("div", { className: x("tw:flex tw:gap-4", w && "tw:flex-wrap"), children: [
              /* @__PURE__ */ a(
                Xu,
                {
                  isTypeSwitchable: at,
                  noteType: et,
                  handleNoteTypeChange: zt,
                  localizedStrings: d,
                  focusNoteText: ne
                }
              ),
              /* @__PURE__ */ a(
                Wu,
                {
                  callerType: U,
                  customCaller: M,
                  updateCaller: Bt,
                  localizedStrings: d,
                  focusNoteText: ne
                }
              ),
              w && ar
            ] }),
            !w && /* @__PURE__ */ a("div", { className: "tw:flex tw:flex-1 tw:justify-end", children: /* @__PURE__ */ u(Va, { children: [
              ar,
              /* @__PURE__ */ a(
                gs,
                {
                  onCancelClick: o,
                  onAcceptClick: me,
                  canAccept: !S || V !== U || U === "custom" && M !== Y,
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
                  Uu,
                  {
                    editorRef: g,
                    canUndo: !S,
                    canRedo: j,
                    children: /* @__PURE__ */ a(
                      Cd,
                      {
                        options: Qt,
                        onStateChange: Be,
                        onUsjChange: Te,
                        defaultUsj: lp,
                        onScrRefChange: () => {
                        },
                        scrRef: n,
                        ref: g
                      }
                    )
                  }
                ) }),
                /* @__PURE__ */ a("div", { className: "tw:absolute tw:bottom-0 tw:end-0", children: /* @__PURE__ */ a(Vt, { children: /* @__PURE__ */ u(vt, { children: [
                  /* @__PURE__ */ a(bt, { asChild: !0, children: /* @__PURE__ */ a(
                    rt,
                    {
                      "aria-label": Ye,
                      onClick: be,
                      className: "tw:h-6 tw:w-6",
                      variant: "ghost",
                      size: "icon",
                      children: /* @__PURE__ */ a(ui, {})
                    }
                  ) }),
                  /* @__PURE__ */ a(xt, { children: /* @__PURE__ */ a("p", { children: Ye }) })
                ] }) }) })
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ u(_r, { open: Rt, children: [
      /* @__PURE__ */ a(ec, { virtualRef: _t.virtualRef }),
      /* @__PURE__ */ a(
        Nr,
        {
          className: "tw:w-[500px] tw:p-0",
          onClick: (_) => {
            _.preventDefault(), _.stopPropagation();
          },
          children: /* @__PURE__ */ a(
            ep,
            {
              markerMenuItems: Nt,
              localizedStrings: d,
              searchRef: Ce
            }
          )
        }
      )
    ] })
  ] });
}
const Ng = Object.freeze([
  ...Ju,
  ...Object.entries(Wr).map(([, t]) => t.description).filter((t) => !!t),
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
  ...ju,
  ...hs
]), ks = " ", dp = "\uFEFF";
function _s(t) {
  return t.closed !== "false";
}
function wp(t, e, r = !0, o = void 0, n = void 0) {
  const i = [];
  let s = [];
  (e ?? []).forEach((d) => {
    typeof d != "string" && d.marker === "fp" ? (s.length > 0 && i.push(s), s = [d]) : s.push(d);
  }), s.length > 0 && i.push(s);
  const c = i.length > 0;
  return c || i.push([]), i.map((d, l) => {
    const w = l === 0, p = l === i.length - 1;
    return (
      // PT9 wraps note text in `span.notetext`, whose `unicode-bidi: embed` keeps mixed-direction
      // runs ordered as the note author wrote them. The class must sit on the element that
      // directly contains the inline runs - `unicode-bidi` does not inherit.
      //
      // The index is the key here (and for the runs inside, see `renderContent`) because no
      // content-derived key can be unique: a note may hold several runs with the same marker AND
      // the same text (two `\fqa` runs, say), and paragraphs split from those runs inherit the
      // collision. The rule guards against reordering corrupting state, which cannot happen here -
      // these paragraphs are a pure projection of an immutable USJ node, always in source order,
      // and they hold no state of their own.
      // eslint-disable-next-line react/no-array-index-key
      /* @__PURE__ */ u("p", { className: "notetext", children: [
        w && !c && /* @__PURE__ */ a("span", { className: "note-placeholder", children: dp }),
        w && n,
        Ns(t, d, r),
        p && o
      ] }, `${t ?? "note"}-p${l}`)
    );
  });
}
function Ns(t, e, r = !0, o = !1) {
  if (!(!e || e.length === 0))
    return e.map((n, i) => {
      const s = `${t ?? "note"}-${i}`;
      return typeof n == "string" ? /* @__PURE__ */ a("span", { className: x(`usfm_${t}`), children: n }, s) : up(n, s, r, o);
    });
}
function up(t, e, r, o = !1) {
  const { marker: n } = t;
  if (t.type === "unmatched")
    return /* @__PURE__ */ a("span", { className: "marker", children: `\\${n}` }, e);
  const i = `${o ? "+" : ""}${n}`;
  return /* @__PURE__ */ u("span", { children: [
    n ? r && /* @__PURE__ */ a("span", { className: "marker", children: `\\${i}${ks}` }) : /* @__PURE__ */ a(
      jc,
      {
        className: "tw:text-error tw:mr-1 tw:inline-block tw:h-4 tw:w-4",
        "aria-label": "Missing marker"
      }
    ),
    Ns(
      n,
      t.content,
      r,
      /* isNestedContent */
      !0
    ),
    n && r && _s(t) && /* @__PURE__ */ a("span", { className: "marker", children: `\\${i}*` })
  ] }, e);
}
function pp({
  footnote: t,
  layout: e = "horizontal",
  formatCaller: r,
  showMarkers: o = !0
}) {
  const n = r ? r(t.caller) : t.caller, i = n !== t.caller, s = o ? /* @__PURE__ */ a("span", { className: "marker", children: `\\${t.marker}` }) : void 0, c = o && _s(t) ? /* @__PURE__ */ a("span", { className: "marker note-closer", children: `\\${t.marker}*` }) : void 0, d = t.category ? (
    // Given its own class rather than a `usfm_*` one for the same reason the caller has one:
    // `\cat` delimits the value but is not a style for it. The value is the note's data and stays
    // visible either way; the `\cat` glyphs are marker display and follow the same switch every
    // other marker in this component does.
    //
    // The class is also what keeps the whole run out of the content caret origin (`RowTextKind`
    // in `footnote-caret.utils.ts`): the category is a FIELD on the note, not part of its
    // `content`, and the editor builds its own category display as `attribute`-typed text, which
    // `EditorRef.selectNoteTextOffset` skips. A click in the run maps to the category instead.
    /* @__PURE__ */ u("span", { className: "note-category", children: [
      o && /* @__PURE__ */ a("span", { className: "marker", children: `\\cat${ks}` }),
      /* @__PURE__ */ a("span", { className: "note-category-value", children: t.category }),
      o && /* @__PURE__ */ a("span", { className: "marker", children: "\\cat*" }),
      !o && " "
    ] })
  ) : void 0, l = n && // USFM does not specify a marker for caller, so instead of a usfm_* class, we use a
  // specific class name in case styling is needed.
  /* @__PURE__ */ a("span", { className: x("note-caller tw:inline-block", { formatted: i }), children: n }), w = e === "horizontal" ? "horizontal" : "vertical", p = o ? "marker-visible" : "", h = e === "horizontal" ? "tw:col-span-1" : "tw:col-span-2 tw:col-start-1 tw:row-start-2", m = x(w, p);
  return /* @__PURE__ */ u(mt, { children: [
    /* @__PURE__ */ u("div", { className: x("textual-note-header tw:col-span-1 tw:w-fit tw:text-nowrap", m), children: [
      s,
      !!s && !!l && " ",
      l
    ] }),
    /* @__PURE__ */ a(
      "div",
      {
        className: x(
          "textual-note-body tw:flex tw:flex-col tw:gap-1",
          h,
          m
        ),
        children: wp(
          t.marker,
          t.content,
          o,
          c,
          d
        )
      }
    )
  ] });
}
const hp = "editing-row", gp = 1e3;
function fp(t) {
  const e = t.ownerDocument.getSelection();
  if (!e || e.rangeCount === 0 || !t.contains(e.focusNode))
    return;
  const r = e.getRangeAt(0).cloneRange();
  r.collapse(!1);
  const o = typeof r.getBoundingClientRect == "function" ? r.getBoundingClientRect() : void 0;
  if (o && (o.height > 0 || o.top !== 0)) return o;
  const { focusNode: n } = e, i = n instanceof Element ? n : n == null ? void 0 : n.parentElement;
  return i == null ? void 0 : i.getBoundingClientRect();
}
function mp(t, e) {
  const r = t.getBoundingClientRect(), o = (e == null ? void 0 : e.getBoundingClientRect().height) ?? 0, n = fp(t);
  if (!e || r.height <= o || !n) {
    t.scrollIntoView({ block: "nearest" });
    return;
  }
  n.bottom - r.top <= o ? t.scrollIntoView({ block: "start" }) : r.bottom - n.top <= o && t.scrollIntoView({ block: "end" });
}
function ma(t, e, r, o) {
  let n = Math.min(Math.max(t + e, 0), r);
  if (n === o) {
    const i = Math.min(Math.max(n + e, 0), r);
    n = i === n ? t : i;
  }
  return n === o ? t : n;
}
function Cg({
  ariaLabel: t = "Footnotes",
  className: e,
  classNameForItems: r,
  footnotes: o,
  layout: n = "horizontal",
  listId: i,
  selectedFootnote: s,
  selectionRequest: c,
  showMarkers: d = !0,
  suppressFormatting: l = !1,
  formatCaller: w,
  onFootnoteSelected: p,
  onFootnoteEditRequested: h,
  onFocusedFootnoteChange: m,
  editingFootnoteIndex: k,
  renderEditingFootnote: g
}) {
  const f = w ?? cl(o, void 0), N = g ? k : void 0, T = I([]), P = I(null), R = I(null), U = (C, S, K) => {
    if (h) {
      const j = T.current[S], G = j ? Bu(K.clientX, K.clientY, j) : "end";
      h(C, S, i, G);
      return;
    }
    p == null || p(C, S, i);
  }, D = s ? o.findIndex((C) => C === s) : -1, [V, $] = E(D), M = (C) => {
    var S;
    $(C), C >= 0 && C < T.current.length && ((S = T.current[C]) == null || S.focus());
  }, A = (C, S, K) => {
    if (o.length)
      switch (C.key) {
        case "Enter":
          C.preventDefault(), h ? h(S, K, i, "end") : p == null || p(S, K, i);
          break;
        case " ":
          C.preventDefault(), p == null || p(S, K, i);
          break;
      }
  }, Y = o.length - 1, J = (C) => {
    if (o.length && !(C.target !== C.currentTarget && !(C.target instanceof HTMLElement && C.target.closest('li[role="option"]'))))
      switch (C.key) {
        case "ArrowDown":
          C.preventDefault(), M(ma(V, 1, Y, N));
          break;
        case "ArrowUp":
          C.preventDefault(), M(ma(V, -1, Y, N));
          break;
      }
  };
  q(() => {
    N === void 0 || V !== N || $((C) => {
      const S = ma(C, 1, Y, N);
      if (S !== C) return S;
      const K = ma(C, -1, Y, N);
      return K !== C ? K : -1;
    });
  }, [N, V, Y]);
  const et = I(void 0), y = (C) => {
    et.current !== C && (et.current = C, m == null || m(C));
  };
  q(() => {
    const C = et.current;
    if (C === void 0) return;
    const S = T.current[C];
    (!S || S.ownerDocument.activeElement !== S) && (et.current = void 0, m == null || m(void 0));
  });
  const at = s ? o.findIndex((C) => C === s) : -1;
  return q(() => {
    var C;
    at < 0 || at >= T.current.length || (C = T.current[at]) == null || C.scrollIntoView({ block: "nearest" });
  }, [at, c]), q(() => {
    const C = P.current;
    if (N === void 0 || !C) return;
    const S = () => mp(C, R.current);
    if (S(), typeof ResizeObserver > "u") return;
    const K = new ResizeObserver(S);
    K.observe(C);
    const j = setTimeout(() => K.disconnect(), gp);
    return () => {
      clearTimeout(j), K.disconnect();
    };
  }, [N, c]), // Every row is its own tab stop (see the row `tabIndex` below), so the list is not one as
  // well - a stop here would put an extra, contentless press between whatever precedes the list
  // and its first note. It stays programmatically focusable (`-1`) because arrow-key navigation
  // starts by focusing it. With NO rows there is no row to be that stop, so the list takes the
  // turn itself rather than leaving the region unreachable by keyboard.
  /* @__PURE__ */ a(
    "div",
    {
      ref: R,
      role: "listbox",
      "aria-label": t,
      tabIndex: o.length === 0 ? 0 : -1,
      className: x("tw:h-full tw:overflow-y-auto", e),
      onKeyDown: J,
      children: /* @__PURE__ */ a(
        "ul",
        {
          className: x(
            "tw:p-0.5 tw:pt-1",
            "tw:grid",
            // Two columns in both layouts: the note's marker+caller, then its text. PT9 keeps the
            // `\fr`/`\xo` target reference inside the note text rather than aligning it in a column
            // of its own, so there is no third column to size.
            "tw:grid-cols-[min-content_1fr]",
            !l && "formatted-font"
          ),
          children: o.map((C, S) => {
            const K = C === s, j = S === k && !!g, G = j ? hp : `${i}-${S}`, it = S < o.length - 1 && n === "vertical" && /* @__PURE__ */ a(ra, { tabIndex: -1, className: "tw:col-span-2" });
            return j ? /* @__PURE__ */ u(yr, { children: [
              /* @__PURE__ */ a(
                "li",
                {
                  ref: P,
                  "data-state": "editing",
                  className: x(
                    "tw:gap-x-3 tw:gap-y-1 tw:p-2",
                    "tw:w-full tw:rounded-sm tw:border-0 tw:shadow-none",
                    // PT9 highlights the entry being edited (light yellow); warning is the theme's
                    // amber-family token so this stays theme-aware in dark mode.
                    "tw:bg-warning/15",
                    "tw:col-span-2",
                    n === "vertical" && "tw:row-span-2",
                    r
                  ),
                  children: g(C, S)
                }
              ),
              it
            ] }, G) : (
              // The key belongs on the outermost node returned from the map — the Fragment — not on
              // the `<li>` nested inside it, which leaves the Fragment itself unkeyed.
              /* @__PURE__ */ u(yr, { children: [
                /* @__PURE__ */ a(
                  "li",
                  {
                    ref: (st) => {
                      T.current[S] = st;
                    },
                    role: "option",
                    "aria-selected": K,
                    "data-marker": C.marker,
                    "data-state": K ? "selected" : void 0,
                    tabIndex: 0,
                    className: x(
                      "tw:gap-x-3 tw:gap-y-1 tw:p-2 tw:data-[state=selected]:bg-muted",
                      // Both handlers make the row a click target, so both earn the hover affordance -
                      // a consumer that only opens rows for editing would otherwise render rows that
                      // respond to a click but look inert.
                      (p || h) && "tw:hover:bg-muted/50",
                      "tw:w-full tw:rounded-sm tw:border-0 tw:bg-transparent tw:shadow-none",
                      "tw:focus:outline-hidden tw:focus-visible:outline-hidden",
                      // The focus ring is drawn INSIDE the row. The list is its own scroll container,
                      // and a scroll container clips whatever a child paints past its edges: a ring
                      // drawn outside the row loses its sides to the list's left and right edges, and
                      // its top or bottom whenever the row is scrolled flush with one. `ring-inset`
                      // also holds under a host's own `:focus-visible` ring rule, which sets the
                      // ring's width and color but leaves `--tw-ring-inset` to this class.
                      "tw:focus-visible:ring-2 tw:focus-visible:ring-inset tw:focus-visible:ring-ring",
                      "tw:grid tw:grid-flow-col tw:grid-cols-subgrid",
                      "tw:col-span-2",
                      n === "vertical" && "tw:row-span-2",
                      r
                    ),
                    onClick: (st) => U(C, S, st),
                    onFocus: () => {
                      $(S), y(S);
                    },
                    onBlur: () => y(void 0),
                    onKeyDown: (st) => A(st, C, S),
                    children: /* @__PURE__ */ a(
                      pp,
                      {
                        footnote: C,
                        layout: n,
                        formatCaller: () => f(C.caller, S),
                        showMarkers: d
                      }
                    )
                  }
                ),
                it
              ] }, G)
            );
          })
        }
      )
    }
  );
}
function vp(t) {
  const e = [];
  let r = 0;
  const o = /\\\\(.+?)\\\\/g;
  let n;
  for (; (n = o.exec(t)) !== null; )
    n.index > r && e.push(t.substring(r, n.index)), e.push(/* @__PURE__ */ a("strong", { children: n[1] }, n.index)), r = o.lastIndex;
  return r < t.length && e.push(t.substring(r)), e.length > 0 ? e : [t];
}
function bp({
  occurrenceData: t,
  setScriptureReference: e,
  localizedStrings: r,
  classNameForText: o
}) {
  const n = Kr(), i = r["%webView_inventory_occurrences_table_header_reference%"], s = r["%webView_inventory_occurrences_table_header_occurrence%"], c = B(() => {
    const d = [], l = /* @__PURE__ */ new Set();
    return t.forEach((w) => {
      const p = `${w.reference.book}:${w.reference.chapterNum}:${w.reference.verseNum}:${w.text}`;
      l.has(p) || (l.add(p), d.push(w));
    }), d;
  }, [t]);
  return /* @__PURE__ */ u(Mo, { stickyHeader: !0, children: [
    /* @__PURE__ */ a(zo, { stickyHeader: !0, children: /* @__PURE__ */ u(lr, { children: [
      /* @__PURE__ */ a(Ra, { children: i }),
      /* @__PURE__ */ a(Ra, { children: s })
    ] }) }),
    /* @__PURE__ */ a(Po, { children: c.length > 0 && c.map((d) => /* @__PURE__ */ u(
      lr,
      {
        onClick: () => {
          e(d.reference);
        },
        children: [
          /* @__PURE__ */ a(Mr, { children: Xe(d.reference, "English") }),
          /* @__PURE__ */ a(
            Mr,
            {
              className: o,
              "data-platform-content-zoom-root": n["data-platform-content-zoom-root"],
              "data-platform-content-zoom-label": n["data-platform-content-zoom-label"],
              children: vp(d.text)
            }
          )
        ]
      },
      `${d.reference.book} ${d.reference.chapterNum}:${d.reference.verseNum}-${d.text}`
    )) })
  ] });
}
function Cs({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    vn.Root,
    {
      "data-slot": "checkbox",
      className: x(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:peer tw:relative tw:flex tw:size-4 tw:shrink-0 tw:items-center tw:justify-center tw:rounded-[4px] tw:border tw:border-input tw:transition-colors tw:outline-none tw:group-has-disabled/field:opacity-50 tw:after:absolute tw:after:-inset-x-3 tw:after:-inset-y-2 tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:aria-invalid:aria-checked:border-primary tw:dark:bg-input/30 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40 tw:data-checked:border-primary tw:data-checked:bg-primary tw:data-checked:text-primary-foreground tw:dark:data-checked:bg-primary",
        t
      ),
      ...e,
      children: /* @__PURE__ */ a(
        vn.Indicator,
        {
          "data-slot": "checkbox-indicator",
          className: "tw:grid tw:place-content-center tw:text-current tw:transition-none tw:[&>svg]:size-3.5",
          children: /* @__PURE__ */ a(ja, {})
        }
      )
    }
  );
}
const xp = (t) => {
  if (t === "asc")
    return /* @__PURE__ */ a(Hc, { className: "tw:h-4 tw:w-4" });
  if (t === "desc")
    return /* @__PURE__ */ a(qc, { className: "tw:h-4 tw:w-4" });
}, Ka = (t, e, r) => /* @__PURE__ */ a(Vt, { children: /* @__PURE__ */ u(vt, { children: [
  /* @__PURE__ */ u(
    bt,
    {
      className: x("tw:flex tw:w-full tw:justify-start", r),
      variant: "ghost",
      onClick: () => t.toggleSorting(void 0),
      children: [
        /* @__PURE__ */ a("span", { className: "tw:w-6 tw:max-w-fit tw:flex-1 tw:overflow-hidden tw:text-ellipsis", children: e }),
        xp(t.getIsSorted())
      ]
    }
  ),
  /* @__PURE__ */ a(xt, { side: "bottom", children: e })
] }) }), Eg = (t) => ({
  accessorKey: "item",
  accessorFn: (e) => e.items[0],
  header: ({ column: e }) => Ka(e, t)
}), yp = (t, e) => ({
  accessorKey: `item${e}`,
  accessorFn: (r) => r.items[e],
  header: ({ column: r }) => Ka(r, t)
}), Tg = (t) => ({
  accessorKey: "count",
  header: ({ column: e }) => Ka(e, t, "tw:justify-end"),
  cell: ({ row: e }) => /* @__PURE__ */ a("div", { className: "tw:flex tw:justify-end tw:tabular-nums", children: e.getValue("count") })
}), co = (t, e, r, o, n, i) => {
  let s = [...r];
  t.forEach((d) => {
    e === "approved" ? s.includes(d) || s.push(d) : s = s.filter((l) => l !== d);
  }), o(s);
  let c = [...n];
  t.forEach((d) => {
    e === "unapproved" ? c.includes(d) || c.push(d) : c = c.filter((l) => l !== d);
  }), i(c);
}, Rg = (t, e, r, o, n) => ({
  accessorKey: "status",
  header: ({ column: i }) => Ka(i, t, "tw:justify-center"),
  cell: ({ row: i }) => {
    const s = i.getValue("status"), c = i.getValue("item");
    return (
      // Center the status buttons in the cell to match the centered status column header (the
      // ToggleGroup would otherwise sit left-aligned).
      /* @__PURE__ */ a("div", { className: "tw:flex tw:justify-center", children: /* @__PURE__ */ u(cs, { value: s, variant: "outline", type: "single", className: "tw:gap-0", children: [
        /* @__PURE__ */ a(
          ka,
          {
            onClick: (d) => {
              d.stopPropagation(), co(
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
            children: /* @__PURE__ */ a(Fc, {})
          }
        ),
        /* @__PURE__ */ a(
          ka,
          {
            onClick: (d) => {
              d.stopPropagation(), co(
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
            children: /* @__PURE__ */ a(Uc, {})
          }
        ),
        /* @__PURE__ */ a(
          ka,
          {
            onClick: (d) => {
              d.stopPropagation(), co(
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
            children: /* @__PURE__ */ a(Kc, {})
          }
        )
      ] }) })
    );
  }
}), Sg = (t) => t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g), Og = (t) => {
  const e = /^\\[vc]\s+(\d+)/, r = t.match(e);
  if (r)
    return +r[1];
}, Dg = (t) => {
  const e = t.match(/^\\id\s+([A-Za-z]+)/);
  return e ? e[1] : "";
}, kp = (t, e, r) => r.includes(t) ? "unapproved" : e.includes(t) ? "approved" : "unknown", Ig = Object.freeze([
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
]), _p = (t, e, r) => {
  let o = t;
  return e !== "all" && (o = o.filter(
    (n) => e === "approved" && n.status === "approved" || e === "unapproved" && n.status === "unapproved" || e === "unknown" && n.status === "unknown"
  )), r !== "" && (o = o.filter((n) => n.items[0].includes(r))), o;
}, Np = (t, e, r) => t.map((o) => {
  const n = un(o.key) ? o.key : o.key[0];
  return {
    items: un(o.key) ? [o.key] : o.key,
    count: o.count,
    status: o.status || kp(n, e, r),
    occurrences: o.occurrences || []
  };
}), Fe = (t, e) => t[e] ?? e;
function Mg({
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
  const m = Fe(r, "%webView_inventory_all%"), k = Fe(r, "%webView_inventory_approved%"), g = Fe(r, "%webView_inventory_unapproved%"), f = Fe(r, "%webView_inventory_unknown%"), N = Fe(r, "%webView_inventory_scope_currentBook%"), T = Fe(r, "%webView_inventory_scope_chapter%"), P = Fe(r, "%webView_inventory_scope_verse%"), R = Fe(r, "%webView_inventory_filter_text%"), U = Fe(
    r,
    "%webView_inventory_show_additional_items%"
  ), D = Fe(r, "%webView_inventory_no_results%"), [V, $] = E(!1), [M, A] = E("all"), [Y, J] = E(""), [et, y] = E([]), at = B(() => {
    const Z = t ?? [];
    return Z.length === 0 ? [] : Np(Z, n, i);
  }, [t, n, i]), C = B(() => {
    if (V) return at;
    const Z = [];
    return at.forEach((wt) => {
      const lt = wt.items[0], ut = Z.find(
        (kt) => kt.items[0] === lt
      );
      ut ? (ut.count += wt.count, ut.occurrences = ut.occurrences.concat(wt.occurrences)) : Z.push({
        items: [lt],
        count: wt.count,
        occurrences: wt.occurrences,
        status: wt.status
      });
    }), Z;
  }, [V, at]), S = B(() => C.length === 0 ? [] : _p(C, M, Y), [C, M, Y]), K = B(() => {
    var lt, ut;
    if (!V) return d;
    const Z = (lt = o == null ? void 0 : o.tableHeaders) == null ? void 0 : lt.length;
    if (!Z) return d;
    const wt = [];
    for (let kt = 0; kt < Z; kt++)
      wt.push(
        yp(
          ((ut = o == null ? void 0 : o.tableHeaders) == null ? void 0 : ut[kt]) || "Additional Item",
          kt + 1
        )
      );
    return [...wt, ...d];
  }, [o == null ? void 0 : o.tableHeaders, d, V]);
  q(() => {
    S.length === 0 ? y([]) : S.length === 1 && y(S[0].items);
  }, [S]);
  const j = (Z, wt) => {
    wt.setRowSelection(() => {
      const ut = {};
      return ut[Z.index] = !0, ut;
    });
    const lt = Z.original.items;
    y(lt), h && lt.length > 0 && h(lt[0]);
  }, G = (Z) => {
    if (Z === "book" || Z === "chapter" || Z === "verse")
      c(Z);
    else
      throw new Error(`Invalid scope value: ${Z}`);
  }, it = (Z) => {
    if (Z === "all" || Z === "approved" || Z === "unapproved" || Z === "unknown")
      A(Z);
    else
      throw new Error(`Invalid status filter value: ${Z}`);
  }, st = B(() => {
    if (C.length === 0 || et.length === 0) return [];
    const Z = C.filter((wt) => ir(
      V ? wt.items : [wt.items[0]],
      et
    ));
    if (Z.length > 1) throw new Error("Selected item is not unique");
    return Z.length === 0 ? [] : Z[0].occurrences;
  }, [et, V, C]);
  return /* @__PURE__ */ a("div", { id: l, className: "pr-twp tw:h-full tw:overflow-auto", children: /* @__PURE__ */ u("div", { className: "tw:flex tw:h-full tw:w-full tw:min-w-min tw:flex-col", children: [
    /* @__PURE__ */ u("div", { className: "tw:flex tw:items-stretch", style: { contain: "inline-size" }, children: [
      /* @__PURE__ */ u(
        $r,
        {
          onValueChange: (Z) => it(Z),
          defaultValue: M,
          children: [
            /* @__PURE__ */ a(Lr, { className: "tw:m-1 tw:w-auto tw:flex-1", children: /* @__PURE__ */ a(Vr, { placeholder: "Select filter" }) }),
            /* @__PURE__ */ u(Br, { children: [
              /* @__PURE__ */ a(Ae, { value: "all", children: m }),
              /* @__PURE__ */ a(Ae, { value: "approved", children: k }),
              /* @__PURE__ */ a(Ae, { value: "unapproved", children: g }),
              /* @__PURE__ */ a(Ae, { value: "unknown", children: f })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ u($r, { onValueChange: (Z) => G(Z), defaultValue: s, children: [
        /* @__PURE__ */ a(Lr, { className: "tw:m-1 tw:w-auto tw:flex-1", children: /* @__PURE__ */ a(Vr, { placeholder: "Select scope" }) }),
        /* @__PURE__ */ u(Br, { children: [
          /* @__PURE__ */ a(Ae, { value: "book", children: N }),
          /* @__PURE__ */ a(Ae, { value: "chapter", children: T }),
          /* @__PURE__ */ a(Ae, { value: "verse", children: P })
        ] })
      ] }),
      /* @__PURE__ */ a(
        Ba,
        {
          className: "tw:m-1 tw:flex-1 tw:rounded-md tw:border",
          placeholder: R,
          value: Y,
          onChange: (Z) => {
            J(Z.target.value);
          }
        }
      ),
      o && /* @__PURE__ */ a(Vt, { children: /* @__PURE__ */ u(vt, { children: [
        /* @__PURE__ */ a(bt, { asChild: !0, children: /* @__PURE__ */ u("div", { className: "tw:m-1 tw:flex tw:w-fit tw:min-w-[26px] tw:items-center tw:rounded-md tw:border", children: [
          /* @__PURE__ */ a(
            Cs,
            {
              className: "tw:m-1 tw:shrink-0",
              checked: V,
              onCheckedChange: (Z) => {
                $(Z);
              }
            }
          ),
          /* @__PURE__ */ a($t, { className: "tw:m-1 tw:truncate", children: (o == null ? void 0 : o.checkboxText) ?? U })
        ] }) }),
        /* @__PURE__ */ a(xt, { children: (o == null ? void 0 : o.checkboxText) ?? U })
      ] }) })
    ] }),
    /* @__PURE__ */ a("div", { className: "tw:m-1 tw:flex-1 tw:overflow-auto tw:rounded-md tw:border", children: /* @__PURE__ */ a(
      Mu,
      {
        columns: K,
        data: S,
        onRowClickHandler: j,
        stickyHeader: !0,
        isLoading: w,
        noResultsMessage: D
      }
    ) }),
    st.length > 0 && /* @__PURE__ */ a("div", { className: "tw:m-1 tw:flex-1 tw:overflow-auto tw:rounded-md tw:border", children: /* @__PURE__ */ a(
      bp,
      {
        classNameForText: p,
        occurrenceData: st,
        setScriptureReference: e,
        localizedStrings: r
      }
    ) })
  ] }) });
}
function Es(t, e) {
  var r;
  return (r = Object.entries(t).find(
    ([, o]) => "menuItem" in o && o.menuItem === e
  )) == null ? void 0 : r[0];
}
function Ts(t) {
  return Object.entries(t).flatMap(([e, r]) => typeof r == "object" ? [{ columnKey: e, column: r }] : []).sort((e, r) => e.column.order - r.column.order);
}
function Rs(t, e, r) {
  return "column" in e && e.column === r || t === r;
}
function Cp(t) {
  const e = new Set(t.items.map((o) => o.group)), r = Object.entries(t.groups).filter(
    ([o]) => e.has(o)
  );
  return Ts(t.columns).filter(
    ({ columnKey: o }) => r.some(
      ([n, i]) => Rs(n, i, o)
    )
  ).map(({ columnKey: o, column: n }) => ({
    columnKey: o,
    label: n.label,
    isHeaderHidden: n.isHeaderHidden ?? !1
  }));
}
const Ep = "16rem", Tp = "3rem", Ss = Zt.createContext(void 0);
function Ha() {
  const t = Zt.useContext(Ss);
  if (!t)
    throw new Error("useSidebar must be used within a SidebarProvider.");
  return t;
}
function Rp({
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
  const [d, l] = Zt.useState(t), w = e ?? d, p = Zt.useCallback(
    (P) => {
      const R = typeof P == "function" ? P(w) : P;
      r ? r(R) : l(R);
    },
    [r, w]
  ), h = Zt.useCallback(() => p((P) => !P), [p]), m = w ? "expanded" : "collapsed", f = $e() === "ltr" ? s : s === "primary" ? "secondary" : "primary", N = Zt.useMemo(
    () => ({
      state: m,
      open: w,
      setOpen: p,
      toggleSidebar: h,
      // CUSTOM: Passes direction-aware side into context so SidebarTrigger icon and Sidebar
      // positioning both respond correctly in RTL layouts
      side: f
    }),
    [m, w, p, h, f]
  ), T = {
    "--sidebar-width": Ep,
    "--sidebar-width-icon": Tp,
    ...n
  };
  return /* @__PURE__ */ a(Ss.Provider, { value: N, children: /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "sidebar-wrapper",
      style: T,
      className: x(
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
function Sp({
  // CUSTOM: Removed 'side' prop from Sidebar - it is now read from context (moved to SidebarProvider)
  variant: t = "sidebar",
  collapsible: e = "offcanvas",
  className: r,
  children: o,
  ...n
}) {
  const i = Ha();
  return e === "none" ? /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "sidebar",
      className: x(
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
            className: x(
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
            className: x(
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
function zg({ className: t, onClick: e, ...r }) {
  const { toggleSidebar: o, side: n } = Ha();
  return /* @__PURE__ */ u(
    rt,
    {
      "data-sidebar": "trigger",
      "data-slot": "sidebar-trigger",
      variant: "ghost",
      size: "icon-sm",
      className: x(t),
      onClick: (i) => {
        e == null || e(i), o();
      },
      ...r,
      children: [
        n === "primary" ? /* @__PURE__ */ a(gl, {}) : /* @__PURE__ */ a(fl, {}),
        /* @__PURE__ */ a("span", { className: "tw:sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
}
function Pg({ className: t, ...e }) {
  const { toggleSidebar: r } = Ha();
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
      className: x(
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
function Op({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "main",
    {
      "data-slot": "sidebar-inset",
      className: x(
        // CUSTOM: Removed tw:min-h-svh - not appropriate in Platform.Bible's windowed layout
        "tw:relative tw:flex tw:w-full tw:flex-1 tw:flex-col tw:bg-background tw:md:peer-data-[variant=inset]:m-2 tw:md:peer-data-[variant=inset]:ms-0 tw:md:peer-data-[variant=inset]:rounded-xl tw:md:peer-data-[variant=inset]:shadow-sm tw:md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ms-2",
        t
      ),
      ...e
    }
  );
}
function Ag({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    Ba,
    {
      "data-slot": "sidebar-input",
      "data-sidebar": "input",
      className: x("tw:h-8 tw:w-full tw:bg-background tw:shadow-none", t),
      ...e
    }
  );
}
function $g({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "sidebar-header",
      "data-sidebar": "header",
      className: x("tw:flex tw:flex-col tw:gap-2 tw:p-2", t),
      ...e
    }
  );
}
function Vg({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "sidebar-footer",
      "data-sidebar": "footer",
      className: x("tw:flex tw:flex-col tw:gap-2 tw:p-2", t),
      ...e
    }
  );
}
function Lg({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    ra,
    {
      "data-slot": "sidebar-separator",
      "data-sidebar": "separator",
      className: x("tw:mx-2 tw:w-auto tw:bg-sidebar-border", t),
      ...e
    }
  );
}
function Dp({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "sidebar-content",
      "data-sidebar": "content",
      className: x(
        "tw:no-scrollbar tw:flex tw:min-h-0 tw:flex-1 tw:flex-col tw:gap-0 tw:overflow-auto tw:group-data-[collapsible=icon]:overflow-hidden",
        t
      ),
      ...e
    }
  );
}
function Wn({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "sidebar-group",
      "data-sidebar": "group",
      className: x("tw:relative tw:flex tw:w-full tw:min-w-0 tw:flex-col tw:p-2", t),
      ...e
    }
  );
}
function Yn({
  className: t,
  asChild: e = !1,
  ...r
}) {
  const o = e ? ca.Root : "div";
  return /* @__PURE__ */ a(
    o,
    {
      "data-slot": "sidebar-group-label",
      "data-sidebar": "group-label",
      className: x(
        "tw:flex tw:h-8 tw:shrink-0 tw:items-center tw:rounded-md tw:px-2 tw:text-xs tw:font-medium tw:text-sidebar-foreground/70 tw:ring-sidebar-ring tw:outline-hidden tw:transition-[margin,opacity] tw:duration-200 tw:ease-linear tw:group-data-[collapsible=icon]:-mt-8 tw:group-data-[collapsible=icon]:opacity-0 tw:focus-visible:ring-2 tw:[&>svg]:size-4 tw:[&>svg]:shrink-0",
        t
      ),
      ...r
    }
  );
}
function Bg({
  className: t,
  asChild: e = !1,
  ...r
}) {
  const o = e ? ca.Root : "button";
  return /* @__PURE__ */ a(
    o,
    {
      "data-slot": "sidebar-group-action",
      "data-sidebar": "group-action",
      className: x(
        "tw:absolute tw:top-3.5 tw:end-3 tw:flex tw:aspect-square tw:w-5 tw:items-center tw:justify-center tw:rounded-md tw:p-0 tw:text-sidebar-foreground tw:ring-sidebar-ring tw:outline-hidden tw:transition-transform tw:group-data-[collapsible=icon]:hidden tw:after:absolute tw:after:-inset-2 tw:hover:bg-sidebar-accent tw:hover:text-sidebar-accent-foreground tw:focus-visible:ring-2 tw:md:after:hidden tw:[&>svg]:size-4 tw:[&>svg]:shrink-0",
        t
      ),
      ...r
    }
  );
}
function Zn({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "sidebar-group-content",
      "data-sidebar": "group-content",
      className: x("tw:w-full tw:text-sm", t),
      ...e
    }
  );
}
function Ip({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "ul",
    {
      "data-slot": "sidebar-menu",
      "data-sidebar": "menu",
      className: x("tw:flex tw:w-full tw:min-w-0 tw:flex-col tw:gap-0", t),
      ...e
    }
  );
}
function Mp({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "li",
    {
      "data-slot": "sidebar-menu-item",
      "data-sidebar": "menu-item",
      className: x("tw:group/menu-item tw:relative", t),
      ...e
    }
  );
}
const zp = Ho(
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
function Pp({
  asChild: t = !1,
  isActive: e = !1,
  variant: r = "default",
  size: o = "default",
  tooltip: n,
  className: i,
  ...s
}) {
  const c = t ? ca.Root : "button", { state: d } = Ha(), l = /* @__PURE__ */ a(
    c,
    {
      "data-slot": "sidebar-menu-button",
      "data-sidebar": "menu-button",
      "data-size": o,
      "data-active": e,
      className: x(zp({ variant: r, size: o }), i),
      ...s
    }
  );
  return n ? /* @__PURE__ */ u(vt, { children: [
    /* @__PURE__ */ a(bt, { asChild: !0, children: l }),
    /* @__PURE__ */ a(
      xt,
      {
        side: "right",
        align: "center",
        hidden: d !== "collapsed",
        ...typeof n == "string" ? { children: n } : n
      }
    )
  ] }) : l;
}
function jg({
  className: t,
  asChild: e = !1,
  showOnHover: r = !1,
  ...o
}) {
  const n = e ? ca.Root : "button";
  return /* @__PURE__ */ a(
    n,
    {
      "data-slot": "sidebar-menu-action",
      "data-sidebar": "menu-action",
      className: x(
        "tw:absolute tw:top-1.5 tw:end-1 tw:flex tw:aspect-square tw:w-5 tw:items-center tw:justify-center tw:rounded-md tw:p-0 tw:text-sidebar-foreground tw:ring-sidebar-ring tw:outline-hidden tw:transition-transform tw:group-data-[collapsible=icon]:hidden tw:peer-hover/menu-button:text-sidebar-accent-foreground tw:peer-data-[size=default]/menu-button:top-1.5 tw:peer-data-[size=lg]/menu-button:top-2.5 tw:peer-data-[size=sm]/menu-button:top-1 tw:after:absolute tw:after:-inset-2 tw:hover:bg-sidebar-accent tw:hover:text-sidebar-accent-foreground tw:focus-visible:ring-2 tw:md:after:hidden tw:[&>svg]:size-4 tw:[&>svg]:shrink-0",
        r && "tw:group-focus-within/menu-item:opacity-100 tw:group-hover/menu-item:opacity-100 tw:peer-data-active/menu-button:text-sidebar-accent-foreground tw:aria-expanded:opacity-100 tw:md:opacity-0",
        t
      ),
      ...o
    }
  );
}
function Fg({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "sidebar-menu-badge",
      "data-sidebar": "menu-badge",
      className: x(
        "tw:pointer-events-none tw:absolute tw:end-1 tw:flex tw:h-5 tw:min-w-5 tw:items-center tw:justify-center tw:rounded-md tw:px-1 tw:text-xs tw:font-medium tw:text-sidebar-foreground tw:tabular-nums tw:select-none tw:group-data-[collapsible=icon]:hidden tw:peer-hover/menu-button:text-sidebar-accent-foreground tw:peer-data-[size=default]/menu-button:top-1.5 tw:peer-data-[size=lg]/menu-button:top-2.5 tw:peer-data-[size=sm]/menu-button:top-1 tw:peer-data-active/menu-button:text-sidebar-accent-foreground",
        t
      ),
      ...e
    }
  );
}
function Ug({
  className: t,
  showIcon: e = !1,
  ...r
}) {
  const [o] = Zt.useState(() => `${Math.floor(Math.random() * 40) + 50}%`), n = { "--skeleton-width": o };
  return /* @__PURE__ */ u(
    "div",
    {
      "data-slot": "sidebar-menu-skeleton",
      "data-sidebar": "menu-skeleton",
      className: x("tw:flex tw:h-8 tw:items-center tw:gap-2 tw:rounded-md tw:px-2", t),
      ...r,
      children: [
        e && /* @__PURE__ */ a(Ir, { className: "tw:size-4 tw:rounded-md", "data-sidebar": "menu-skeleton-icon" }),
        /* @__PURE__ */ a(
          Ir,
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
function Kg({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "ul",
    {
      "data-slot": "sidebar-menu-sub",
      "data-sidebar": "menu-sub",
      className: x(
        "tw:mx-3.5 tw:flex tw:min-w-0 tw:translate-x-px tw:rtl:-translate-x-px tw:flex-col tw:gap-1 tw:border-s tw:border-sidebar-border tw:px-2.5 tw:py-0.5 tw:group-data-[collapsible=icon]:hidden",
        t
      ),
      ...e
    }
  );
}
function Hg({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "li",
    {
      "data-slot": "sidebar-menu-sub-item",
      "data-sidebar": "menu-sub-item",
      className: x("tw:group/menu-sub-item tw:relative", t),
      ...e
    }
  );
}
function qg({
  asChild: t = !1,
  size: e = "md",
  isActive: r = !1,
  className: o,
  ...n
}) {
  const i = t ? ca.Root : "a";
  return /* @__PURE__ */ a(
    i,
    {
      "data-slot": "sidebar-menu-sub-button",
      "data-sidebar": "menu-sub-button",
      "data-size": e,
      "data-active": r,
      className: x(
        "tw:flex tw:h-7 tw:min-w-0 tw:-translate-x-px tw:rtl:translate-x-px tw:items-center tw:gap-2 tw:overflow-hidden tw:rounded-md tw:px-2 tw:text-sidebar-foreground tw:ring-sidebar-ring tw:outline-hidden tw:group-data-[collapsible=icon]:hidden tw:hover:bg-sidebar-accent tw:hover:text-sidebar-accent-foreground tw:focus-visible:ring-2 tw:active:bg-sidebar-accent tw:active:text-sidebar-accent-foreground tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:aria-disabled:pointer-events-none tw:aria-disabled:opacity-50 tw:data-[size=md]:text-sm tw:data-[size=sm]:text-xs tw:data-active:bg-sidebar-accent tw:data-active:text-sidebar-accent-foreground tw:[&>span:last-child]:truncate tw:[&>svg]:size-4 tw:[&>svg]:shrink-0 tw:[&>svg]:text-sidebar-accent-foreground",
        o
      ),
      ...n
    }
  );
}
function Ap({
  id: t,
  extensionLabels: e,
  projectInfo: r,
  handleSelectSidebarItem: o,
  selectedSidebarItem: n,
  extensionsSidebarGroupLabel: i,
  projectsSidebarGroupLabel: s,
  buttonPlaceholderText: c,
  searchPlaceholderText: d,
  noResultsText: l,
  className: w
}) {
  const p = L(
    (f, N) => {
      o(f, N);
    },
    [o]
  ), h = L(
    (f) => {
      const N = r.find((T) => T.projectId === f);
      return N ? N.projectName : f;
    },
    [r]
  ), m = B(
    () => r.map((f) => ({
      id: f.projectId,
      shortName: f.projectName,
      fullName: f.projectFullName
    })),
    [r]
  ), k = B(() => {
    const f = {
      buttonPlaceholder: c,
      ariaLabel: s
    };
    return d && (f.searchPlaceholder = d), l && (f.commandEmptyMessage = l), f;
  }, [c, s, d, l]), g = L(
    (f) => !n.projectId && f === n.label,
    [n]
  );
  return /* @__PURE__ */ a(
    Sp,
    {
      id: t,
      collapsible: "none",
      variant: "inset",
      className: x("tw:w-96 tw:gap-2 tw:overflow-y-auto", w),
      children: /* @__PURE__ */ u(Dp, { children: [
        /* @__PURE__ */ u(Wn, { children: [
          /* @__PURE__ */ a(Yn, { className: "tw:text-sm", children: i }),
          /* @__PURE__ */ a(Zn, { children: /* @__PURE__ */ a(Ip, { children: Object.entries(e).map(([f, N]) => /* @__PURE__ */ a(Mp, { children: /* @__PURE__ */ a(
            Pp,
            {
              onClick: () => p(f),
              isActive: g(f),
              children: /* @__PURE__ */ a("span", { className: "tw:pl-3", children: N })
            }
          ) }, f)) }) })
        ] }),
        /* @__PURE__ */ u(Wn, { children: [
          /* @__PURE__ */ a(Yn, { className: "tw:text-sm", children: s }),
          /* @__PURE__ */ a(Zn, { className: "tw:pl-3", children: /* @__PURE__ */ u(
            "div",
            {
              className: x(
                "tw:flex tw:w-full tw:items-center tw:gap-2 tw:rounded-md tw:px-2 tw:py-1",
                {
                  "tw:bg-sidebar-accent tw:text-sidebar-accent-foreground": n == null ? void 0 : n.projectId
                }
              ),
              children: [
                /* @__PURE__ */ a(Gc, { className: "tw:h-4 tw:w-4 tw:shrink-0" }),
                /* @__PURE__ */ a(
                  ic,
                  {
                    mode: "project",
                    projects: m,
                    openTabs: [],
                    selection: { projectId: (n == null ? void 0 : n.projectId) ?? "" },
                    onChangeSelection: ({ projectId: f }) => {
                      if (!f) return;
                      const N = h(f);
                      p(N, f);
                    },
                    buttonVariant: "ghost",
                    buttonClassName: "tw:h-8 tw:w-full tw:flex-1 tw:justify-start tw:font-normal",
                    localizedStrings: k,
                    triggerLabelFormat: "shortNameAndFullName"
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
function Gg({
  id: t,
  children: e,
  searchValue: r,
  onSearch: o,
  className: n,
  // Everything else on this type comes from `SettingsSidebarProps`, so forward it wholesale: a
  // prop added to the sidebar reaches it without a matching edit here. `id` is destructured out
  // because it belongs to the SidebarProvider below, not to the sidebar.
  ...i
}) {
  return /* @__PURE__ */ u("div", { className: "tw:box-border tw:flex tw:h-full tw:flex-col", children: [
    /* @__PURE__ */ a("div", { className: "tw:box-border tw:flex tw:items-center tw:justify-center tw:py-4", children: /* @__PURE__ */ a(
      ni,
      {
        className: "tw:w-9/12",
        value: r,
        onSearch: o,
        placeholder: "Search app settings, extension settings, and project settings"
      }
    ) }),
    /* @__PURE__ */ u(
      Rp,
      {
        id: t,
        className: "tw:h-full tw:flex-1 tw:gap-4 tw:overflow-auto tw:border-t",
        children: [
          /* @__PURE__ */ a(
            Ap,
            {
              className: x("tw:w-1/2 tw:min-w-[140px] tw:max-w-[220px] tw:border-e", n),
              ...i
            }
          ),
          /* @__PURE__ */ a(Op, { className: "tw:min-w-[215px]", children: e })
        ]
      }
    )
  ] });
}
const nr = "scrBook", $p = "scrRef", vr = "source", Vp = "details", Lp = "Scripture Reference", Bp = "Scripture Book", Os = "Type", jp = "Details";
function Fp(t, e) {
  const r = e ?? !1;
  return [
    {
      accessorFn: (o) => `${o.start.book} ${o.start.chapterNum}:${o.start.verseNum}`,
      id: nr,
      header: (t == null ? void 0 : t.scriptureReferenceColumnName) ?? Lp,
      cell: (o) => {
        const n = o.row.original;
        return o.row.getIsGrouped() ? Yt.bookIdToEnglishName(n.start.book) : o.row.groupingColumnId === nr ? Xe(n.start) : void 0;
      },
      getGroupingValue: (o) => Yt.bookIdToNumber(o.start.book),
      sortingFn: (o, n) => Sa(o.original.start, n.original.start),
      enableGrouping: !0
    },
    {
      accessorFn: (o) => Xe(o.start),
      id: $p,
      header: void 0,
      cell: (o) => {
        const n = o.row.original;
        return o.row.getIsGrouped() ? void 0 : Xe(n.start);
      },
      sortingFn: (o, n) => Sa(o.original.start, n.original.start),
      enableGrouping: !1
    },
    {
      accessorFn: (o) => o.source.displayName,
      id: vr,
      header: r ? (t == null ? void 0 : t.typeColumnName) ?? Os : void 0,
      cell: (o) => r || o.row.getIsGrouped() ? o.getValue() : void 0,
      getGroupingValue: (o) => o.source.id,
      sortingFn: (o, n) => o.original.source.displayName.localeCompare(n.original.source.displayName),
      enableGrouping: !0
    },
    {
      accessorFn: (o) => o.detail,
      id: Vp,
      header: (t == null ? void 0 : t.detailsColumnName) ?? jp,
      cell: (o) => o.getValue(),
      enableGrouping: !1
    }
  ];
}
const Up = (t) => {
  if (!("offset" in t.start))
    throw new Error("No offset available in range start");
  if (t.end && !("offset" in t.end))
    throw new Error("No offset available in range end");
  const { offset: e } = t.start;
  let r = 0;
  return t.end && ({ offset: r } = t.end), !t.end || Sa(t.start, t.end) === 0 ? `${Ya(t.start)}+${e}` : `${Ya(t.start)}+${e}-${Ya(t.end)}+${r}`;
}, Xn = (t) => `${Up({ start: t.start, end: t.end })} ${t.source.displayName} ${t.detail}`;
function Wg({
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
  const [l, w] = E([]), [p, h] = E([{ id: nr, desc: !1 }]), [m, k] = E({}), g = B(
    () => t.flatMap((M) => M.data.map((A) => ({
      ...A,
      source: M.source
    }))),
    [t]
  ), f = B(
    () => Fp(
      {
        scriptureReferenceColumnName: o,
        typeColumnName: i,
        detailsColumnName: s
      },
      r
    ),
    [o, i, s, r]
  );
  q(() => {
    l.includes(vr) ? h([
      { id: vr, desc: !1 },
      { id: nr, desc: !1 }
    ]) : h([{ id: nr, desc: !1 }]);
  }, [l]);
  const N = zi({
    data: g,
    columns: f,
    state: {
      grouping: l,
      sorting: p,
      rowSelection: m
    },
    onGroupingChange: w,
    onSortingChange: h,
    onRowSelectionChange: k,
    getExpandedRowModel: xd(),
    getGroupedRowModel: bd(),
    getCoreRowModel: Ai(),
    getSortedRowModel: Pi(),
    getRowId: Xn,
    autoResetExpanded: !1,
    enableMultiRowSelection: !1,
    enableSubRowSelection: !1
  });
  q(() => {
    if (c) {
      const M = N.getSelectedRowModel().rowsById, A = Object.keys(M);
      if (A.length === 1) {
        const Y = g.find((J) => Xn(J) === A[0]) || void 0;
        Y && c(Y);
      }
    }
  }, [m, g, c, N]);
  const T = n ?? Bp, P = i ?? Os, R = [
    { label: "No Grouping", value: [] },
    { label: `Group by ${T}`, value: [nr] },
    { label: `Group by ${P}`, value: [vr] },
    {
      label: `Group by ${T} and ${P}`,
      value: [nr, vr]
    },
    {
      label: `Group by ${P} and ${T}`,
      value: [vr, nr]
    }
  ], U = (M) => {
    w(JSON.parse(M));
  }, D = (M, A) => {
    !M.getIsGrouped() && !M.getIsSelected() && M.getToggleSelectedHandler()(A);
  }, V = (M, A) => M.getIsGrouped() ? "" : x("banded-row", A % 2 === 0 ? "even" : "odd"), $ = (M, A, Y) => {
    if (!((M == null ? void 0 : M.length) === 0 || A.depth < Y.column.getGroupedIndex())) {
      if (A.getIsGrouped())
        switch (A.depth) {
          case 1:
            return "tw:ps-4";
          default:
            return;
        }
      switch (A.depth) {
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
      $r,
      {
        value: JSON.stringify(l),
        onValueChange: (M) => {
          U(M);
        },
        children: [
          /* @__PURE__ */ a(Lr, { className: "tw:mb-1 tw:mt-2", children: /* @__PURE__ */ a(Vr, {}) }),
          /* @__PURE__ */ a(Br, { position: "item-aligned", children: /* @__PURE__ */ a(Su, { children: R.map((M) => /* @__PURE__ */ a(Ae, { value: JSON.stringify(M.value), children: M.label }, M.label)) }) })
        ]
      }
    ),
    /* @__PURE__ */ u(Mo, { className: "tw:relative tw:flex tw:flex-col tw:overflow-y-auto tw:p-0", children: [
      e && /* @__PURE__ */ a(zo, { children: N.getHeaderGroups().map((M) => /* @__PURE__ */ a(lr, { children: M.headers.filter((A) => A.column.columnDef.header).map((A) => (
        /* For sticky column headers to work, we probably need to change the default definition of the shadcn Table component. See https://github.com/shadcn-ui/ui/issues/1151 */
        /* @__PURE__ */ a(Ra, { colSpan: A.colSpan, className: "tw:sticky top-0", children: A.isPlaceholder ? void 0 : /* @__PURE__ */ u("div", { children: [
          A.column.getCanGroup() ? /* @__PURE__ */ a(
            rt,
            {
              variant: "ghost",
              title: `Toggle grouping by ${A.column.columnDef.header}`,
              onClick: A.column.getToggleGroupingHandler(),
              type: "button",
              children: A.column.getIsGrouped() ? "🛑" : "👊 "
            }
          ) : void 0,
          " ",
          Jr(A.column.columnDef.header, A.getContext())
        ] }) }, A.id)
      )) }, M.id)) }),
      /* @__PURE__ */ a(Po, { children: N.getRowModel().rows.map((M, A) => {
        const Y = $e();
        return /* @__PURE__ */ a(
          lr,
          {
            "data-state": M.getIsSelected() ? "selected" : "",
            className: x(V(M, A)),
            onClick: (J) => D(M, J),
            children: M.getVisibleCells().map((J) => {
              if (!(J.getIsPlaceholder() || J.column.columnDef.enableGrouping && !J.getIsGrouped() && (J.column.columnDef.id !== vr || !r)))
                return /* @__PURE__ */ a(
                  Mr,
                  {
                    className: x(
                      J.column.columnDef.id,
                      "tw:p-[1px]",
                      $(l, M, J)
                    ),
                    children: J.getIsGrouped() ? /* @__PURE__ */ u(
                      rt,
                      {
                        variant: "link",
                        onClick: M.getToggleExpandedHandler(),
                        type: "button",
                        children: [
                          M.getIsExpanded() && /* @__PURE__ */ a(xr, {}),
                          !M.getIsExpanded() && (Y === "ltr" ? /* @__PURE__ */ a(Wc, {}) : /* @__PURE__ */ a(Yc, {})),
                          " ",
                          Jr(J.column.columnDef.cell, J.getContext()),
                          " (",
                          M.subRows.length,
                          ")"
                        ]
                      }
                    ) : Jr(J.column.columnDef.cell, J.getContext())
                  },
                  J.id
                );
            })
          },
          M.id
        );
      }) })
    ] })
  ] });
}
function Kp({
  availableBookInfo: t,
  selectedBookIds: e,
  onChangeSelectedBookIds: r,
  localizedStrings: o,
  localizedBookNames: n,
  disabledSectionExplanations: i
}) {
  const s = o["%webView_book_selector_books_selected%"], c = o["%webView_book_selector_select_books%"], d = o["%webView_book_selector_search_books%"], l = o["%webView_book_selector_select_all%"], w = o["%webView_book_selector_clear_all%"], p = o["%webView_book_selector_no_book_found%"], { otLong: h, ntLong: m, dcLong: k, extraLong: g } = {
    otLong: o == null ? void 0 : o["%scripture_section_ot_long%"],
    ntLong: o == null ? void 0 : o["%scripture_section_nt_long%"],
    dcLong: o == null ? void 0 : o["%scripture_section_dc_long%"],
    extraLong: o == null ? void 0 : o["%scripture_section_extra_long%"]
  }, [f, N] = E(!1), [T, P] = E(""), R = I(void 0), U = I(!1), D = B(
    () => ii(t),
    [t]
  ), V = B(() => {
    if (!T.trim()) {
      const C = {
        [At.OT]: [],
        [At.NT]: [],
        [At.DC]: [],
        [At.Extra]: []
      };
      return D.forEach((S) => {
        const K = va(S);
        C[K].push(S);
      }), C;
    }
    const y = D.filter(
      (C) => So(C, T, n)
    ), at = {
      [At.OT]: [],
      [At.NT]: [],
      [At.DC]: [],
      [At.Extra]: []
    };
    return y.forEach((C) => {
      const S = va(C);
      at[S].push(C);
    }), at;
  }, [D, T, n]), $ = L(
    (y, at = !1) => {
      if (!at || !R.current) {
        r(
          e.includes(y) ? e.filter((it) => it !== y) : [...e, y]
        ), R.current = y;
        return;
      }
      const C = D.findIndex((it) => it === R.current), S = D.findIndex((it) => it === y);
      if (C === -1 || S === -1) return;
      const [K, j] = [
        Math.min(C, S),
        Math.max(C, S)
      ], G = D.slice(K, j + 1).map((it) => it);
      r(
        e.includes(y) ? e.filter((it) => !G.includes(it)) : [.../* @__PURE__ */ new Set([...e, ...G])]
      );
    },
    [e, r, D]
  ), M = (y) => {
    $(y, U.current), U.current = !1;
  }, A = (y, at) => {
    y.preventDefault(), $(at, y.shiftKey);
  }, Y = () => {
    r(D.map((y) => y));
  }, J = () => {
    r([]);
  }, et = B(
    () => Object.values(At).filter(
      (y) => (i == null ? void 0 : i[y]) !== void 0 && Ao(D, y).length === 0
    ).map((y) => ({ section: y, explanation: i == null ? void 0 : i[y] })),
    [i, D]
  );
  return /* @__PURE__ */ u(
    _r,
    {
      open: f,
      onOpenChange: (y) => {
        N(y), y || P("");
      },
      children: [
        /* @__PURE__ */ a(jr, { asChild: !0, children: /* @__PURE__ */ u(
          rt,
          {
            variant: "outline",
            role: "combobox",
            "aria-expanded": f,
            className: "tw:max-w-64 tw:justify-between",
            children: [
              e.length > 0 ? `${s}: ${e.length}` : c,
              /* @__PURE__ */ a(Zc, { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
            ]
          }
        ) }),
        /* @__PURE__ */ a(
          Nr,
          {
            className: "tw:max-h-(--radix-popover-content-available-height) tw:w-[500px] tw:max-w-[calc(100vw-2rem)] tw:p-0",
            align: "start",
            collisionPadding: 8,
            children: /* @__PURE__ */ u(
              Cr,
              {
                className: "tw:min-h-0",
                shouldFilter: !1,
                onKeyDown: (y) => {
                  y.key === "Enter" && (U.current = y.shiftKey);
                },
                children: [
                  /* @__PURE__ */ a(
                    $a,
                    {
                      className: "tw:shrink-0",
                      placeholder: d,
                      value: T,
                      onValueChange: P,
                      spaceSelectsHighlightedItem: !0
                    }
                  ),
                  /* @__PURE__ */ u("div", { className: "tw:flex tw:shrink-0 tw:justify-between tw:border-b tw:p-2", children: [
                    /* @__PURE__ */ a(
                      rt,
                      {
                        variant: "ghost",
                        size: "sm",
                        onClick: Y,
                        disabled: D.length === 0,
                        children: l
                      }
                    ),
                    /* @__PURE__ */ a(rt, { variant: "ghost", size: "sm", onClick: J, children: w })
                  ] }),
                  /* @__PURE__ */ u(Er, { className: "tw:max-h-72 tw:min-h-0 tw:flex-1", children: [
                    /* @__PURE__ */ a(La, { children: p }),
                    Object.values(At).filter((y) => V[y].length > 0).map((y, at) => {
                      const C = V[y];
                      return /* @__PURE__ */ u(yr, { children: [
                        at > 0 && /* @__PURE__ */ a(oi, { alwaysRender: !0 }),
                        /* @__PURE__ */ a(
                          ur,
                          {
                            heading: ei(y, h, m, k, g),
                            children: C.map((S) => /* @__PURE__ */ a(
                              $i,
                              {
                                bookId: S,
                                isSelected: e.includes(S),
                                onSelect: () => M(S),
                                onMouseDown: (K) => A(K, S),
                                section: va(S),
                                showCheck: !0,
                                localizedBookNames: n,
                                commandValue: yo(S, n),
                                className: "tw:flex tw:items-center"
                              },
                              S
                            ))
                          }
                        )
                      ] }, y);
                    })
                  ] }),
                  et.length > 0 && /* @__PURE__ */ a("div", { className: "tw:shrink-0 tw:border-t tw:p-2", children: et.map(({ section: y, explanation: at }) => /* @__PURE__ */ a("p", { className: "tw:text-xs tw:text-muted-foreground", children: at }, y)) })
                ]
              }
            )
          }
        )
      ]
    }
  );
}
function Hp({
  disabled: t,
  tooltipText: e,
  children: r,
  className: o
}) {
  return /* @__PURE__ */ a(Vt, { children: /* @__PURE__ */ u(vt, { children: [
    /* @__PURE__ */ a(bt, { asChild: !0, children: /* @__PURE__ */ a(
      na,
      {
        className: o,
        isDisabled: t,
        disabledExplanation: e,
        children: r
      }
    ) }),
    t && /* @__PURE__ */ a(xt, { children: /* @__PURE__ */ a("p", { className: "tw:max-w-xs tw:whitespace-pre-line", children: e }) })
  ] }) });
}
function qp({
  section: t,
  availableBookIds: e,
  selectedBookIds: r,
  onToggle: o,
  localizedStrings: n,
  disabledExplanation: i
}) {
  const s = Ao(e, t).length === 0, c = n["%scripture_section_ot_short%"], d = n["%scripture_section_nt_short%"], l = n["%scripture_section_dc_short%"], w = n["%scripture_section_extra_short%"], p = /* @__PURE__ */ a(
    rt,
    {
      variant: "outline",
      size: "sm",
      onClick: () => o(t),
      className: x(
        si(e, t, r) && !s && "tw:bg-primary tw:text-primary-foreground tw:hover:bg-primary/70 tw:hover:text-primary-foreground"
      ),
      disabled: s,
      children: sc(
        t,
        c,
        d,
        l,
        w
      )
    }
  );
  return i ? /* @__PURE__ */ a(
    Hp,
    {
      className: "tw:flex",
      disabled: s,
      tooltipText: i,
      children: p
    }
  ) : p;
}
const Jn = 5, lo = 6;
function Gp({
  availableBookInfo: t,
  selectedBookIds: e,
  onChangeSelectedBookIds: r,
  localizedStrings: o,
  localizedBookNames: n,
  disabledSectionExplanations: i
}) {
  const s = o["%webView_book_selector_more%"], c = B(
    () => ii(t),
    [t]
  ), d = L(
    (l) => {
      const w = Ao(c, l).map((p) => p);
      r(
        si(c, l, e) ? e.filter((p) => !w.includes(p)) : [.../* @__PURE__ */ new Set([...e, ...w])]
      );
    },
    [e, r, c]
  );
  return /* @__PURE__ */ u("div", { className: "tw:space-y-2", children: [
    /* @__PURE__ */ a("div", { className: "tw:flex tw:flex-wrap tw:gap-2", children: Object.values(At).map((l) => /* @__PURE__ */ a(
      qp,
      {
        section: l,
        availableBookIds: c,
        selectedBookIds: e,
        onToggle: d,
        localizedStrings: o,
        disabledExplanation: i == null ? void 0 : i[l]
      },
      l
    )) }),
    /* @__PURE__ */ a(
      Kp,
      {
        availableBookInfo: t,
        selectedBookIds: e,
        onChangeSelectedBookIds: r,
        localizedStrings: o,
        localizedBookNames: n,
        disabledSectionExplanations: i
      }
    ),
    e.length > 0 && /* @__PURE__ */ u("div", { className: "tw:mt-2 tw:flex tw:flex-wrap tw:gap-1", children: [
      e.slice(
        0,
        e.length === lo ? lo : Jn
      ).map((l) => /* @__PURE__ */ a(ea, { className: "tw:hover:bg-secondary", variant: "secondary", children: Ze(l, n) }, l)),
      e.length > lo && /* @__PURE__ */ a(
        ea,
        {
          className: "tw:hover:bg-secondary",
          variant: "secondary",
          children: `+${e.length - Jn} ${s}`
        }
      )
    ] })
  ] });
}
const Wp = Object.freeze([
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
]), Yg = Object.freeze([
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
  ...Wp
]), Wt = (t, e) => t[e] ?? e, Yp = Object.freeze([" ", "-"]);
function Zg({
  scope: t,
  availableScopes: e,
  onScopeChange: r,
  availableBookInfo: o,
  selectedBookIds: n,
  onSelectedBookIdsChange: i,
  localizedStrings: s,
  localizedBookNames: c,
  disabledSectionExplanations: d,
  disabledScopeExplanations: l,
  id: w,
  variant: p = "radio",
  rangeStart: h,
  rangeEnd: m,
  onRangeStartChange: k,
  onRangeEndChange: g,
  currentScrRef: f,
  onCurrentScrRefChange: N,
  bookChapterControlLocalizedStrings: T,
  getEndVerse: P,
  hideLabel: R = !1,
  buttonClassName: U
}) {
  const D = Wt(
    s,
    "%webView_scope_selector_selected_text%"
  ), V = Wt(s, "%webView_scope_selector_verse%"), $ = Wt(s, "%webView_scope_selector_chapter%"), M = Wt(s, "%webView_scope_selector_book%"), A = Wt(
    s,
    "%webView_scope_selector_current_verse%"
  ), Y = Wt(
    s,
    "%webView_scope_selector_current_chapter%"
  ), J = Wt(s, "%webView_scope_selector_current_book%"), et = Wt(s, "%webView_scope_selector_choose_books%"), y = Wt(s, "%webView_scope_selector_scope%"), at = Wt(s, "%webView_scope_selector_select_books%"), C = Wt(s, "%webView_scope_selector_range%"), S = Wt(s, "%webView_scope_selector_select_range%"), K = Wt(s, "%webView_scope_selector_range_start%"), j = Wt(s, "%webView_scope_selector_range_end%"), G = Wt(s, "%webView_scope_selector_ok%"), it = Wt(s, "%webView_scope_selector_cancel%"), st = Wt(s, "%webView_scope_selector_navigate%"), Z = (H) => {
    if (!f) return;
    const ot = f.book.toUpperCase();
    switch (H) {
      case "verse":
        return Xe(f, "id");
      case "chapter":
        return `${ot} ${f.chapterNum}`;
      case "book":
        return ot;
      default:
        return;
    }
  }, wt = [
    { value: "selectedText", label: D, id: "scope-selected-text" },
    {
      value: "verse",
      label: V,
      dropdownLabel: A,
      scrRefSuffix: Z("verse"),
      id: "scope-verse"
    },
    {
      value: "chapter",
      label: $,
      dropdownLabel: Y,
      scrRefSuffix: Z("chapter"),
      id: "scope-chapter"
    },
    {
      value: "book",
      label: M,
      dropdownLabel: J,
      scrRefSuffix: Z("book"),
      id: "scope-book"
    },
    { value: "selectedBooks", label: et, id: "scope-selected" },
    { value: "range", label: C, id: "scope-range" }
  ], lt = (H, ot, Ft = !1) => /* @__PURE__ */ u(mt, { children: [
    H,
    ot && !Ft && /* @__PURE__ */ u("span", { className: "tw:text-muted-foreground", children: [
      ": ",
      ot
    ] })
  ] }), ut = e ? wt.filter((H) => e.includes(H.value)) : wt, kt = f ?? Za, Tt = h ?? kt, Ht = m ?? kt, Le = () => {
  }, Rt = I(null), Dt = I(null), _t = I(!1), qt = I(null), Ie = I(!1), [Ce, yt] = E(void 0), ft = I(!1), ge = I(!1), Ee = I(null), fe = L((H) => {
    if (H) {
      yt("start"), ft.current = !1;
      return;
    }
    yt((ot) => ot === "start" ? void 0 : ot), ft.current && (ft.current = !1, requestAnimationFrame(() => {
      var Ft;
      const ot = (Ft = Rt.current) == null ? void 0 : Ft.querySelector("button");
      ot == null || ot.click();
    }));
  }, []), Jt = L((H) => {
    if (H) {
      yt("end"), ge.current = !1;
      return;
    }
    yt((ot) => ot === "end" ? void 0 : ot);
  }, []), ne = L(
    (H) => {
      k == null || k(H), g == null || g(H), ft.current = !0;
    },
    [k, g]
  ), Qt = L(
    (H) => {
      g == null || g(H), ge.current = !0;
    },
    [g]
  ), Nt = L(
    (H) => {
      r(H), H === "selectedBooks" && n.length === 0 && (f != null && f.book) && i([f.book]);
    },
    [r, n, f, i]
  ), Lt = ut.find((H) => H.value === t), te = () => t === "selectedBooks" && n.length > 0 ? n.map((H) => H.toUpperCase()).join(", ") : t === "range" ? ll(Tt, Ht, {
    optionOrLocalizedBookName: "id",
    endRefOptionOrLocalizedBookName: "id",
    repeatBookName: !0
  }) : Lt ? lt(Lt.label, Lt.scrRefSuffix) : t, F = ut.filter(
    (H) => H.value !== "selectedBooks" && H.value !== "range"
  ), pt = ut.find((H) => H.value === "selectedBooks"), ee = ut.find((H) => H.value === "range"), [It, Ct] = E(!1), [Ot, re] = E(void 0), [ae, me] = E(void 0), [ve, Mt] = E(void 0), [be, Bt] = E(void 0), [zt, Be] = E([]), Te = p === "dropdown" && Ot === "selectedBooks", xe = /* @__PURE__ */ a(
    Gp,
    {
      availableBookInfo: o,
      selectedBookIds: Te ? zt : n,
      onChangeSelectedBookIds: Te ? Be : i,
      localizedStrings: s,
      localizedBookNames: c,
      disabledSectionExplanations: d
    }
  ), Me = Ce === "end", je = Ce === "start", de = "tw:text-muted-foreground", ye = p === "dropdown" && Ot === "range", Ye = ye ? Mt : ne, or = ye ? Bt : g ? Qt : Le, _ = /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-wrap tw:items-end tw:gap-4", children: [
    /* @__PURE__ */ u("div", { className: "tw:grid tw:gap-2", children: [
      /* @__PURE__ */ a($t, { htmlFor: "scope-range-start", className: x(Me && de), children: K }),
      /* @__PURE__ */ a(
        Ja,
        {
          id: "scope-range-start",
          scrRef: ye ? ve ?? Tt : Tt,
          handleSubmit: Ye,
          localizedBookNames: c,
          localizedStrings: T,
          getEndVerse: P,
          submitKeys: Yp,
          onOpenChange: fe,
          className: x(Me && de),
          modal: !0
        }
      )
    ] }),
    /* @__PURE__ */ u("div", { ref: Rt, className: "tw:grid tw:gap-2", children: [
      /* @__PURE__ */ a($t, { htmlFor: "scope-range-end", className: x(je && de), children: j }),
      /* @__PURE__ */ a(
        Ja,
        {
          id: "scope-range-end",
          scrRef: ye ? be ?? Ht : Ht,
          handleSubmit: or,
          localizedBookNames: c,
          localizedStrings: T,
          getEndVerse: P,
          disableReferencesUpTo: ye ? ve ?? Tt : Tt,
          onOpenChange: Jt,
          onCloseAutoFocus: (H) => {
            var ot;
            ge.current && (ge.current = !1, H.preventDefault(), (ot = Ee.current) == null || ot.focus());
          },
          className: x(je && de),
          modal: !0,
          align: "start"
        }
      )
    ] })
  ] }), v = I({}), O = L(
    (H) => (ot) => {
      v.current[H] = ot;
    },
    []
  ), z = I(null);
  q(() => {
    if (!It) return;
    let H = 0;
    const ot = requestAnimationFrame(() => {
      H = requestAnimationFrame(() => {
        var Ft;
        (Ft = v.current[t]) == null || Ft.focus();
      });
    });
    return () => {
      cancelAnimationFrame(ot), H && cancelAnimationFrame(H);
    };
  }, [It, t]);
  const [Q, X] = E(null), [tt, ct] = E(null), [ht, we] = E(null), St = 200, [Pt, jt] = E(!1);
  q(() => {
    if (!ht || typeof ResizeObserver > "u") return;
    const H = new ResizeObserver(([ot]) => {
      jt(ot.contentRect.width < St);
    });
    return H.observe(ht), () => H.disconnect();
  }, [ht]);
  const ke = L(
    (H) => {
      me(H), Mt(Tt), Bt(Ht), Be(n), Ct(!1), re(H);
    },
    [Tt, Ht, n]
  ), _e = L(() => {
    ae !== void 0 && (ae === "range" ? (ve && (k == null || k(ve)), be && (g == null || g(be))) : ae === "selectedBooks" && i(zt), Nt(ae), re(void 0), me(void 0));
  }, [
    ae,
    ve,
    be,
    zt,
    k,
    g,
    i,
    Nt
  ]), Rr = L((H) => {
    H || (re(void 0), me(void 0));
  }, []), la = L((H) => {
    var ot;
    H.preventDefault(), (ot = z.current) == null || ot.focus();
  }, []), da = (H) => t === H ? /* @__PURE__ */ a("span", { className: "tw:absolute tw:flex tw:h-3.5 tw:w-3.5 tw:items-center tw:justify-center tw:ltr:left-2 tw:rtl:right-2", children: /* @__PURE__ */ a(pr, { className: "tw:h-4 tw:w-4" }) }) : void 0;
  return /* @__PURE__ */ u("div", { id: w, className: "tw:grid tw:gap-4", children: [
    /* @__PURE__ */ u("div", { className: "tw:grid tw:gap-2", children: [
      !R && /* @__PURE__ */ a($t, { children: y }),
      p === "dropdown" ? /* @__PURE__ */ u(tr, { open: It, onOpenChange: Ct, children: [
        /* @__PURE__ */ a(Ke, { asChild: !0, children: /* @__PURE__ */ u(
          rt,
          {
            ref: z,
            variant: "outline",
            role: "combobox",
            className: x(
              "tw:w-full tw:justify-between tw:overflow-hidden tw:font-normal",
              U
            ),
            children: [
              /* @__PURE__ */ a("span", { className: "tw:min-w-0 tw:flex-1 tw:truncate tw:text-start", children: te() }),
              /* @__PURE__ */ a(xr, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
            ]
          }
        ) }),
        /* @__PURE__ */ a(
          er,
          {
            ref: we,
            className: "tw:w-[var(--radix-dropdown-menu-trigger-width)] tw:min-w-[12rem]",
            align: "start",
            children: /* @__PURE__ */ u(Ga, { container: ht, children: [
              F.map(({ value: H, label: ot, dropdownLabel: Ft, scrRefSuffix: Re, id: ze }) => {
                const b = l == null ? void 0 : l[H];
                return /* @__PURE__ */ u(
                  cr,
                  {
                    ref: O(H),
                    disabled: !!b,
                    className: "tw:relative tw:ps-8 data-[highlighted]:tw:bg-accent data-[highlighted]:tw:text-accent-foreground",
                    onSelect: () => Nt(H),
                    "data-selected": t === H ? "true" : void 0,
                    children: [
                      t === H && /* @__PURE__ */ a("span", { className: "tw:absolute tw:flex tw:h-3.5 tw:w-3.5 tw:items-center tw:justify-center tw:ltr:left-2 tw:rtl:right-2", children: /* @__PURE__ */ a(pr, { className: "tw:h-4 tw:w-4" }) }),
                      /* @__PURE__ */ u("span", { className: "tw:flex tw:min-w-0 tw:flex-col tw:gap-0.5", children: [
                        /* @__PURE__ */ a("span", { className: "tw:flex tw:items-center tw:gap-1.5", children: lt(Ft ?? ot, Re, Pt) }),
                        b && /* @__PURE__ */ a("span", { className: "tw:text-xs tw:whitespace-normal tw:text-foreground", children: b })
                      ] })
                    ]
                  },
                  ze
                );
              }),
              (pt || ee) && /* @__PURE__ */ a(br, {}),
              pt && /* @__PURE__ */ u(
                cr,
                {
                  ref: O("selectedBooks"),
                  className: x(
                    "tw:relative tw:ps-8",
                    "data-[highlighted]:tw:bg-accent data-[highlighted]:tw:text-accent-foreground"
                  ),
                  onSelect: () => ke("selectedBooks"),
                  "data-selected": t === "selectedBooks" ? "true" : void 0,
                  children: [
                    da("selectedBooks"),
                    `${pt.label}…`
                  ]
                }
              ),
              ee && /* @__PURE__ */ u(
                cr,
                {
                  ref: O("range"),
                  className: x(
                    "tw:relative tw:ps-8",
                    "data-[highlighted]:tw:bg-accent data-[highlighted]:tw:text-accent-foreground"
                  ),
                  onSelect: () => ke("range"),
                  "data-selected": t === "range" ? "true" : void 0,
                  children: [
                    da("range"),
                    `${ee.label}…`
                  ]
                }
              ),
              N && /* @__PURE__ */ u(mt, { children: [
                /* @__PURE__ */ a(br, {}),
                /* @__PURE__ */ a(kr, { className: "tw:px-2 tw:py-1.5 tw:text-xs tw:font-medium tw:text-muted-foreground", children: st }),
                /* @__PURE__ */ a(
                  cr,
                  {
                    ref: qt,
                    className: "tw:p-0",
                    onSelect: (H) => {
                      var ot, Ft;
                      if (H.preventDefault(), _t.current) {
                        _t.current = !1;
                        return;
                      }
                      Ie.current || (Ft = (ot = Dt.current) == null ? void 0 : ot.querySelector("button")) == null || Ft.click();
                    },
                    children: /* @__PURE__ */ a(
                      "div",
                      {
                        ref: Dt,
                        className: "tw:w-full tw:px-1 tw:pb-1",
                        onPointerDownCapture: (H) => {
                          const ot = H.target instanceof HTMLElement ? H.target : void 0;
                          ot != null && ot.closest("button") && (_t.current = !0, requestAnimationFrame(() => {
                            _t.current = !1;
                          }));
                        },
                        children: /* @__PURE__ */ a(
                          Ja,
                          {
                            id: "scope-navigate",
                            scrRef: f ?? Za,
                            handleSubmit: N,
                            localizedBookNames: c,
                            localizedStrings: T,
                            getEndVerse: P,
                            triggerVariant: "ghost",
                            onOpenChange: (H) => {
                              Ie.current = H;
                            },
                            onCloseAutoFocus: (H) => {
                              var ot;
                              H.preventDefault(), (ot = qt.current) == null || ot.focus();
                            },
                            modal: !0,
                            className: "tw:w-full tw:min-w-0 tw:max-w-none tw:justify-between tw:px-2 tw:font-normal",
                            triggerContent: /* @__PURE__ */ u(mt, { children: [
                              /* @__PURE__ */ a("span", { className: "tw:min-w-0 tw:flex-1 tw:truncate tw:text-start", children: Xe(f ?? Za, "id") }),
                              /* @__PURE__ */ a(xr, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
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
        Do,
        {
          value: t,
          onValueChange: Nt,
          className: "tw:flex tw:flex-col tw:space-y-1",
          children: ut.map(({ value: H, label: ot, scrRefSuffix: Ft, id: Re }) => {
            const ze = l == null ? void 0 : l[H];
            return /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:gap-0.5", children: [
              /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center", children: [
                /* @__PURE__ */ a(
                  Ta,
                  {
                    className: "tw:me-2",
                    value: H,
                    id: Re,
                    disabled: !!ze,
                    "aria-describedby": ze ? `${Re}-explanation` : void 0
                  }
                ),
                /* @__PURE__ */ a($t, { htmlFor: Re, children: lt(ot, Ft) })
              ] }),
              ze && // Indented to clear the radio so it reads as belonging to this row's label.
              /* @__PURE__ */ a(
                "span",
                {
                  id: `${Re}-explanation`,
                  className: "tw:ms-6 tw:text-xs tw:whitespace-normal tw:text-muted-foreground",
                  children: ze
                }
              )
            ] }, Re);
          })
        }
      )
    ] }),
    p === "radio" && t === "selectedBooks" && /* @__PURE__ */ u("div", { className: "tw:grid tw:gap-2", children: [
      /* @__PURE__ */ a($t, { children: at }),
      xe
    ] }),
    p === "radio" && t === "range" && _,
    p === "dropdown" && pt && /* @__PURE__ */ a(wo, { open: Ot === "selectedBooks", onOpenChange: Rr, children: /* @__PURE__ */ a(
      uo,
      {
        ref: ct,
        onCloseAutoFocus: la,
        onEscapeKeyDown: (H) => {
          tt != null && tt.querySelector('[data-state="open"]') && H.preventDefault();
        },
        children: /* @__PURE__ */ u(Ga, { container: tt, children: [
          /* @__PURE__ */ a(po, { className: "tw:pe-8", children: /* @__PURE__ */ a(ho, { children: et }) }),
          xe,
          /* @__PURE__ */ u(cn, { children: [
            /* @__PURE__ */ a(rt, { variant: "outline", onClick: () => Rr(!1), children: it }),
            /* @__PURE__ */ a(rt, { onClick: _e, children: G })
          ] })
        ] })
      }
    ) }),
    p === "dropdown" && ee && /* @__PURE__ */ a(wo, { open: Ot === "range", onOpenChange: Rr, children: /* @__PURE__ */ a(
      uo,
      {
        ref: X,
        onCloseAutoFocus: la,
        onEscapeKeyDown: (H) => {
          Q != null && Q.querySelector('[data-state="open"]') && H.preventDefault();
        },
        children: /* @__PURE__ */ u(Ga, { container: Q, children: [
          /* @__PURE__ */ a(po, { className: "tw:pe-8", children: /* @__PURE__ */ a(ho, { children: S }) }),
          _,
          /* @__PURE__ */ u(cn, { children: [
            /* @__PURE__ */ a(rt, { variant: "outline", onClick: () => Rr(!1), children: it }),
            /* @__PURE__ */ a(rt, { ref: Ee, onClick: _e, children: G })
          ] })
        ] })
      }
    ) })
  ] });
}
function Xg({
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
    ...Wa,
    ...Object.fromEntries(
      Object.entries(o).map(
        ([w, p]) => [
          w,
          w === p && w in Wa ? Wa[w] : p
        ]
      )
    )
  }, l = $e();
  return /* @__PURE__ */ u(
    $r,
    {
      value: `${e}`,
      onValueChange: (w) => r(
        w === "undefined" ? void 0 : parseInt(w, 10)
      ),
      disabled: c,
      children: [
        /* @__PURE__ */ a(Lr, { size: n, className: x("pr-twp tw:w-auto", i), children: /* @__PURE__ */ a(
          Vr,
          {
            placeholder: d[pn(e)] ?? e
          }
        ) }),
        /* @__PURE__ */ a(
          Br,
          {
            id: s,
            align: l === "rtl" ? "end" : "start",
            style: { zIndex: rr },
            children: t.map((w) => /* @__PURE__ */ a(Ae, { value: `${w}`, children: d[pn(w)] }, `${w}`))
          }
        )
      ]
    }
  );
}
function Jg({ children: t }) {
  return /* @__PURE__ */ a("div", { className: "pr-twp tw:grid", children: t });
}
function Qg({
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
function tf({
  primary: t,
  secondary: e,
  includeSeparator: r = !1
}) {
  return /* @__PURE__ */ u("div", { className: "tw:space-y-4 tw:py-2", children: [
    /* @__PURE__ */ u("div", { children: [
      /* @__PURE__ */ a("h3", { className: "tw:text-lg tw:font-medium", children: t }),
      /* @__PURE__ */ a("p", { className: "tw:text-sm tw:text-muted-foreground", children: e })
    ] }),
    r ? /* @__PURE__ */ a(ra, {}) : ""
  ] });
}
function Aa({ icon: t, menuLabel: e, leading: r }) {
  return t ? /* @__PURE__ */ a(
    "img",
    {
      className: x("tw:max-h-5 tw:max-w-5", r ? "tw:me-2" : "tw:ms-2"),
      src: t,
      alt: `${r ? "Leading" : "Trailing"} icon for ${e}`
    }
  ) : void 0;
}
const Ds = (t, e, r, o) => r ? Object.entries(t).filter(([i, s]) => Rs(i, s, r)).sort(([, i], [, s]) => i.order - s.order).flatMap(([i]) => e.filter((c) => c.group === i).sort((c, d) => c.order - d.order).map((c) => {
  if ("command" in c)
    return /* @__PURE__ */ u(vt, { children: [
      /* @__PURE__ */ a(bt, { asChild: !0, children: /* @__PURE__ */ u(
        cr,
        {
          onClick: () => {
            o(c);
          },
          children: [
            c.iconPathBefore && /* @__PURE__ */ a(Aa, { icon: c.iconPathBefore, menuLabel: c.label, leading: !0 }),
            c.label,
            c.iconPathAfter && /* @__PURE__ */ a(Aa, { icon: c.iconPathAfter, menuLabel: c.label }),
            c.shortcut && /* @__PURE__ */ a(dc, { children: c.shortcut })
          ]
        },
        `dropdown-menu-item-${c.label}-${c.command}`
      ) }),
      c.tooltip && /* @__PURE__ */ a(xt, { children: c.tooltip })
    ] }, `tooltip-${c.label}-${c.command}`);
  const d = /* @__PURE__ */ a(wc, { children: c.label });
  return /* @__PURE__ */ u(uc, { children: [
    c.tooltip ? /* @__PURE__ */ u(vt, { children: [
      /* @__PURE__ */ a(bt, { asChild: !0, children: d }),
      /* @__PURE__ */ a(xt, { children: c.tooltip })
    ] }) : d,
    /* @__PURE__ */ a(pc, { children: /* @__PURE__ */ a(hc, { children: Ds(
      t,
      e,
      Es(t, c.id),
      o
    ) }) })
  ] }, `dropdown-menu-sub-${c.label}-${c.id}`);
})) : void 0;
function Ro({
  onSelectMenuItem: t,
  menuData: e,
  tabLabel: r,
  icon: o,
  className: n,
  showSectionHeadings: i = !1,
  variant: s,
  buttonVariant: c = "ghost",
  id: d
}) {
  const l = Oa(), w = Cp(e), p = i && w.length > 1;
  Bi();
  const h = I(null), m = () => lc(h.current ?? void 0);
  return /* @__PURE__ */ u(tr, { variant: s, children: [
    /* @__PURE__ */ a(Ke, { "aria-label": r, className: n, asChild: !0, id: d, children: /* @__PURE__ */ a(
      rt,
      {
        ref: h,
        variant: c,
        size: "icon",
        className: cc,
        onKeyDown: m,
        onBlur: m,
        children: o ?? /* @__PURE__ */ a(Xc, {})
      }
    ) }),
    /* @__PURE__ */ a(
      er,
      {
        align: "start",
        style: { zIndex: rr },
        onCloseAutoFocus: () => {
          ti() === "pointer" && gc(h.current ?? void 0);
        },
        children: w.map(({ columnKey: k, label: g, isHeaderHidden: f }, N) => {
          const T = `${l}-${k}`;
          return /* @__PURE__ */ u(yr, { children: [
            /* @__PURE__ */ u(ri, { "aria-labelledby": p ? T : void 0, children: [
              p && // A section shown without its heading keeps it for assistive technology only
              /* @__PURE__ */ a(
                kr,
                {
                  id: T,
                  className: f ? "tw:sr-only" : void 0,
                  children: g
                }
              ),
              /* @__PURE__ */ a(Vt, { children: Ds(e.groups, e.items, k, t) })
            ] }),
            N < w.length - 1 && /* @__PURE__ */ a(br, {})
          ] }, k);
        })
      }
    )
  ] });
}
const Zp = 8;
function Xp(t, e, r) {
  const o = e.findIndex((s) => t >= s), n = o === -1 ? e.length : o;
  if (r === void 0 || n >= r) return n;
  const i = e.findIndex(
    (s) => t >= s + Zp
  );
  return i === -1 ? r : Math.min(r, i);
}
function Is(t, e) {
  const [r, o] = E(0), n = I(void 0);
  return Kt(() => {
    if (!t || typeof ResizeObserver > "u") return;
    const i = () => {
      const { width: c } = t.getBoundingClientRect(), d = n.current;
      n.current = c;
      const l = d === void 0 || d === 0;
      o(
        (w) => Xp(c, e, l ? void 0 : w)
      );
    };
    i();
    const s = new ResizeObserver(i);
    return s.observe(t), () => s.disconnect();
  }, [t, e]), r;
}
const Jp = Object.freeze([520, 420, 340]), Ms = Zt.forwardRef(
  ({ id: t, className: e, children: r }, o) => {
    const [n, i] = E(void 0), s = I(o);
    s.current = o;
    const c = L((p) => {
      i(p ?? void 0);
      const h = s.current;
      typeof h == "function" ? h(p) : h && (h.current = p);
    }, []), d = Is(n, Jp), l = Li() ?? d, w = l >= Qr.MINIMUM;
    return /* @__PURE__ */ a(Fa.Provider, { value: l, children: /* @__PURE__ */ a(
      "div",
      {
        ref: c,
        className: x(
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
function ef({
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
  return /* @__PURE__ */ u(Ms, { className: `tw:w-full tw:border-b ${i}`, id: n, children: [
    r && /* @__PURE__ */ a(
      Ro,
      {
        onSelectMenuItem: t,
        menuData: r,
        tabLabel: "Project",
        icon: l ?? /* @__PURE__ */ a(Jc, {}),
        buttonVariant: "ghost",
        showSectionHeadings: !0
      }
    ),
    s && /* @__PURE__ */ a("div", { className: "tw:flex tw:min-w-0 tw:shrink tw:grow-[10] tw:flex-row tw:flex-nowrap tw:items-start tw:gap-x-1 tw:gap-y-2 tw:overflow-clip", children: s }),
    c && /* @__PURE__ */ a("div", { className: "tw:flex tw:shrink tw:grow-[1] tw:basis-0 tw:flex-row tw:flex-nowrap tw:items-start tw:justify-center tw:gap-x-1 tw:gap-y-2 tw:overflow-clip tw:@sm:basis-auto", children: c }),
    /* @__PURE__ */ u("div", { className: "tw:flex tw:shrink-0 tw:grow-[1] tw:flex-row-reverse tw:flex-nowrap tw:items-start tw:gap-x-1 tw:gap-y-2 tw:overflow-clip", children: [
      o && /* @__PURE__ */ a(
        Ro,
        {
          onSelectMenuItem: e,
          menuData: o,
          tabLabel: "View Info",
          icon: /* @__PURE__ */ a(Qc, {}),
          className: "tw:h-full",
          showSectionHeadings: !0
        }
      ),
      d
    ] })
  ] });
}
function rf({
  onSelectProjectMenuItem: t,
  projectMenuData: e,
  id: r,
  className: o,
  menuButtonIcon: n
}) {
  return /* @__PURE__ */ a(Ms, { className: "tw:pointer-events-none", id: r, children: e && /* @__PURE__ */ a(
    Ro,
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
const zs = Zt.forwardRef(({ className: t, ...e }, r) => {
  const o = $e();
  return /* @__PURE__ */ a(
    Ve.Root,
    {
      orientation: "vertical",
      ref: r,
      className: x("tw:flex tw:gap-1 tw:rounded-md tw:text-muted-foreground", t),
      ...e,
      dir: o
    }
  );
});
zs.displayName = Ve.List.displayName;
const Ps = Zt.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ a(
  Ve.List,
  {
    ref: r,
    className: x(
      "tw:flex tw:items-center tw:w-[124px] tw:justify-center tw:rounded-md tw:bg-muted tw:p-1 tw:text-muted-foreground",
      t
    ),
    ...e
  }
));
Ps.displayName = Ve.List.displayName;
const Qp = Zt.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ a(
  Ve.Trigger,
  {
    ref: r,
    ...e,
    className: x(
      "tw:inline-flex tw:w-[116px] tw:cursor-pointer tw:items-center tw:justify-center tw:break-words tw:rounded-sm tw:border-0 tw:bg-muted tw:px-3 tw:py-1.5 tw:text-sm tw:font-medium tw:text-inherit tw:ring-offset-background tw:transition-all tw:hover:text-foreground tw:focus-visible:outline-hidden tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2 tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:data-[state=active]:bg-background tw:data-[state=active]:text-foreground tw:data-[state=active]:shadow-sm tw:overflow-clip",
      t
    )
  }
)), As = Zt.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ a(
  Ve.Content,
  {
    ref: r,
    className: x(
      // Removed tw:mt-2 because Sebastian said so
      "tw:ms-5 tw:flex-grow tw:text-foreground tw:ring-offset-background tw:focus-visible:outline-hidden tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2",
      t
    ),
    ...e
  }
));
As.displayName = Ve.Content.displayName;
function af({
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
        ni,
        {
          className: i,
          value: e,
          onSearch: r,
          placeholder: o
        }
      )
    ] }),
    /* @__PURE__ */ u(zs, { children: [
      /* @__PURE__ */ a(Ps, { children: t.map((c) => /* @__PURE__ */ a(Qp, { value: c.value, children: c.value }, c.key)) }),
      t.map((c) => /* @__PURE__ */ a(As, { value: c.value, children: c.content }, c.key))
    ] })
  ] });
}
function th({
  className: t,
  // CUSTOM: Added variant prop to allow callers to apply visual style variants to all menu items
  variant: e = "default",
  ...r
}) {
  const o = Zt.useMemo(
    () => ({
      variant: e
    }),
    [e]
  );
  return /* @__PURE__ */ a(fc.Provider, { value: o, children: /* @__PURE__ */ a(
    Ge.Root,
    {
      "data-slot": "menubar",
      className: x(
        "tw:flex tw:h-8 tw:items-center tw:gap-0.5 tw:rounded-lg tw:border tw:p-[3px]",
        t
      ),
      ...r
    }
  ) });
}
function eh({ ...t }) {
  return /* @__PURE__ */ a(Ge.Menu, { "data-slot": "menubar-menu", ...t });
}
function rh({ ...t }) {
  return /* @__PURE__ */ a(Ge.Portal, { "data-slot": "menubar-portal", ...t });
}
function ah({
  className: t,
  ...e
}) {
  const r = $o();
  return /* @__PURE__ */ a(
    Ge.Trigger,
    {
      "data-slot": "menubar-trigger",
      className: x(
        "tw:flex tw:items-center tw:rounded-sm tw:px-1.5 tw:py-[2px] tw:text-sm tw:font-medium tw:outline-hidden tw:select-none tw:hover:bg-muted tw:aria-expanded:bg-muted",
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation (portal-rendered content needs this)
        "pr-twp",
        // CUSTOM: Apply variant-driven styles from menu context
        Vo({ variant: r.variant, className: t })
      ),
      ...e
    }
  );
}
function oh({
  className: t,
  align: e = "start",
  alignOffset: r = -4,
  sideOffset: o = 8,
  // CUSTOM: Pull `style` out so the shared z-index can be applied under any caller-supplied style
  style: n,
  ...i
}) {
  return /* @__PURE__ */ a(rh, { children: /* @__PURE__ */ a(
    Ge.Content,
    {
      "data-slot": "menubar-content",
      align: e,
      alignOffset: r,
      sideOffset: o,
      className: x(
        // CUSTOM: Fixed tw: prefix not being on some classes and removed erroneous empty tw: tokens
        // CUSTOM: Removed tw:z-50 to use the shared z-index constant below (see style prop)
        // CUSTOM: Removed tw:bg-popover/70 and the tw:before:* backdrop-blur layer that shadcn's
        // translucent menu color adds, so the base tw:bg-popover paints this surface opaque: text
        // behind a menu must not show through it (adr-opaque-menu-surfaces).
        // The muted variant needs no background override here: the base class already paints
        // tw:bg-popover at full opacity.
        "tw:min-w-36 tw:origin-(--radix-menubar-content-transform-origin) tw:overflow-hidden tw:rounded-lg tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:animate-none! tw:**:data-[slot$=-item]:focus:bg-foreground/10 tw:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 tw:**:data-[slot$=-separator]:bg-foreground/5 tw:**:data-[slot$=-trigger]:focus:bg-foreground/10 tw:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! tw:**:data-[variant=destructive]:focus:bg-foreground/10! tw:**:data-[variant=destructive]:text-accent-foreground! tw:**:data-[variant=destructive]:**:text-accent-foreground! tw:relative",
        // CUSTOM: Added pr-twp to reset styles so that only shadcn styles are applied (portal-rendered content needs this)
        "pr-twp",
        t
      ),
      style: { zIndex: rr, ...n },
      ...i
    }
  ) });
}
function nh({
  className: t,
  inset: e,
  variant: r = "default",
  ...o
}) {
  const n = $o();
  return /* @__PURE__ */ a(
    Ge.Item,
    {
      "data-slot": "menubar-item",
      "data-inset": e,
      "data-variant": r,
      className: x(
        "tw:group/menubar-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-[variant=destructive]:text-destructive tw:data-[variant=destructive]:focus:bg-destructive/10 tw:data-[variant=destructive]:focus:text-destructive tw:dark:data-[variant=destructive]:focus:bg-destructive/20 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:data-[variant=destructive]:*:[svg]:text-destructive!",
        // CUSTOM: Apply variant-driven styles from menu context
        Vo({ variant: n.variant, className: t })
      ),
      ...o
    }
  );
}
function ih({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    Ge.Separator,
    {
      "data-slot": "menubar-separator",
      className: x("tw:-mx-1 tw:my-1 tw:h-px tw:bg-border", t),
      ...e
    }
  );
}
function sh({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "span",
    {
      "data-slot": "menubar-shortcut",
      className: x(
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
function ch({ ...t }) {
  return /* @__PURE__ */ a(Ge.Sub, { "data-slot": "menubar-sub", ...t });
}
function lh({
  className: t,
  inset: e,
  children: r,
  ...o
}) {
  const n = $o();
  return /* @__PURE__ */ u(
    Ge.SubTrigger,
    {
      "data-slot": "menubar-sub-trigger",
      "data-inset": e,
      className: x(
        "tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-none tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-inset:ps-7 tw:data-open:bg-accent tw:data-open:text-accent-foreground tw:[&_svg:not([class*=size-])]:size-4",
        // CUSTOM: Apply variant-driven styles from menu context
        Vo({ variant: n.variant, className: t })
      ),
      ...o,
      children: [
        r,
        /* @__PURE__ */ a(xi, { className: "tw:ms-auto tw:size-4" })
      ]
    }
  );
}
function dh({
  className: t,
  // CUSTOM: Pull `style` out so the shared z-index can be applied under any caller-supplied style
  style: e,
  ...r
}) {
  return /* @__PURE__ */ a(
    Ge.SubContent,
    {
      "data-slot": "menubar-sub-content",
      className: x(
        // CUSTOM: Fixed tw: prefix not being on some classes and removed erroneous empty tw: tokens
        // CUSTOM: Removed tw:z-50 to use the shared z-index constant below (see style prop), keeping
        // submenus on the same overlay tier as their parent MenubarContent
        // CUSTOM: Removed tw:bg-popover/70 and the tw:before:* backdrop-blur layer that shadcn's
        // translucent menu color adds, so the base tw:bg-popover paints this surface opaque: text
        // behind a menu must not show through it (adr-opaque-menu-surfaces).
        // The muted variant needs no background override here: the base class already paints
        // tw:bg-popover at full opacity.
        "tw:min-w-32 tw:origin-(--radix-menubar-content-transform-origin) tw:overflow-hidden tw:rounded-lg tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-lg tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95 tw:animate-none! tw:**:data-[slot$=-item]:focus:bg-foreground/10 tw:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 tw:**:data-[slot$=-separator]:bg-foreground/5 tw:**:data-[slot$=-trigger]:focus:bg-foreground/10 tw:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! tw:**:data-[variant=destructive]:focus:bg-foreground/10! tw:**:data-[variant=destructive]:text-accent-foreground! tw:**:data-[variant=destructive]:**:text-accent-foreground! tw:relative",
        t
      ),
      style: { zIndex: rr, ...e },
      ...r
    }
  );
}
const Gr = (t, e) => {
  setTimeout(() => {
    e.forEach((r) => {
      var o;
      (o = t.current) == null || o.dispatchEvent(new KeyboardEvent("keydown", r));
    });
  }, 0);
}, $s = (t, e, r, o) => {
  if (!r) return;
  const n = Object.entries(t).filter(
    ([i, s]) => "column" in s && s.column === r || i === r
  ).sort(([, i], [, s]) => i.order - s.order);
  return n.flatMap(([i], s) => {
    const c = e.filter((l) => l.group === i).sort((l, w) => l.order - w.order).map((l) => /* @__PURE__ */ u(vt, { children: [
      /* @__PURE__ */ a(bt, { asChild: !0, children: "command" in l ? /* @__PURE__ */ u(
        nh,
        {
          onClick: () => {
            o(l);
          },
          children: [
            l.iconPathBefore && /* @__PURE__ */ a(Aa, { icon: l.iconPathBefore, menuLabel: l.label, leading: !0 }),
            l.label,
            l.iconPathAfter && /* @__PURE__ */ a(Aa, { icon: l.iconPathAfter, menuLabel: l.label }),
            l.shortcut && /* @__PURE__ */ a(sh, { children: l.shortcut })
          ]
        },
        `menubar-item-${l.label}-${l.command}`
      ) : /* @__PURE__ */ u(ch, { children: [
        /* @__PURE__ */ a(lh, { children: l.label }),
        /* @__PURE__ */ a(dh, { children: $s(
          t,
          e,
          Es(t, l.id),
          o
        ) })
      ] }, `menubar-sub-${l.label}-${l.id}`) }),
      l.tooltip && /* @__PURE__ */ a(xt, { children: l.tooltip })
    ] }, `tooltip-${l.label}-${"command" in l ? l.command : l.id}`)), d = [...c];
    return c.length > 0 && s < n.length - 1 && d.push(/* @__PURE__ */ a(ih, {}, `separator-${i}`)), d;
  });
};
function wh({
  menuData: t,
  onSelectMenuItem: e,
  onOpenChange: r,
  variant: o
}) {
  const n = I(void 0), i = I(void 0), s = I(void 0), c = I(void 0), d = I(void 0), l = (w) => {
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
  if (Ed(["alt", "alt+p", "alt+l", "alt+n", "alt+h"], (w, p) => {
    var k, g, f, N;
    w.preventDefault();
    const h = { key: "Escape", code: "Escape", keyCode: 27, bubbles: !0 }, m = { key: " ", code: "Space", keyCode: 32, bubbles: !0 };
    switch (p.hotkey) {
      case "alt":
        Gr(i, [h]);
        break;
      case "alt+p":
        (k = i.current) == null || k.focus(), Gr(i, [h, m]);
        break;
      case "alt+l":
        (g = s.current) == null || g.focus(), Gr(s, [h, m]);
        break;
      case "alt+n":
        (f = c.current) == null || f.focus(), Gr(c, [h, m]);
        break;
      case "alt+h":
        (N = d.current) == null || N.focus(), Gr(d, [h, m]);
        break;
    }
  }), q(() => {
    if (!r || !n.current) return;
    const w = new MutationObserver((m) => {
      m.forEach((k) => {
        if (k.attributeName === "data-state" && k.target instanceof HTMLElement) {
          const g = k.target.getAttribute("data-state");
          r(g === "open");
        }
      });
    });
    return n.current.querySelectorAll("[data-state]").forEach((m) => {
      w.observe(m, { attributes: !0 });
    }), () => w.disconnect();
  }, [r]), !!t)
    return /* @__PURE__ */ a(th, { ref: n, className: "pr-twp tw:border-0 tw:bg-transparent", variant: o, children: Ts(t.columns).map(({ columnKey: w, column: p }) => /* @__PURE__ */ u(eh, { children: [
      /* @__PURE__ */ a(ah, { ref: l(w), children: p.label }),
      /* @__PURE__ */ a(
        oh,
        {
          style: { zIndex: rr },
          children: /* @__PURE__ */ a(Vt, { children: $s(t.groups, t.items, w, e) })
        }
      )
    ] }, w)) });
}
const uh = Object.freeze([950, 800, 700]);
function of(t) {
  switch (t) {
    case void 0:
      return;
    case "darwin":
      return "tw:ps-[85px]";
    default:
      return "tw:pe-[calc(138px+1rem)]";
  }
}
function nf({
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
  const [w, p] = E(void 0), h = L(
    (g) => p(g ?? void 0),
    []
  ), m = Is(w, uh), k = Li() ?? m;
  return /* @__PURE__ */ a(Fa.Provider, { value: k, children: /* @__PURE__ */ a(
    "div",
    {
      className: x("tw:border tw:px-4 tw:text-foreground", o),
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
                  s,
                  t && /* @__PURE__ */ a(
                    wh,
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
  ) });
}
const ph = (t, e) => t[e] ?? e;
function sf({
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
  const l = ph(
    s,
    "%settings_uiLanguageSelector_fallbackLanguages%"
  ), [w, p] = E(!1), h = (k) => {
    n && n(k), o && o([k, ...r.filter((g) => g !== k)]), i && r.find((g) => g === k) && i([...r.filter((g) => g !== k)]), p(!1);
  }, m = (k, g) => {
    var N, T, P, R, U, D;
    const f = g !== k ? ((T = (N = t[k]) == null ? void 0 : N.uiNames) == null ? void 0 : T[g]) ?? ((R = (P = t[k]) == null ? void 0 : P.uiNames) == null ? void 0 : R.en) : void 0;
    return f ? `${(U = t[k]) == null ? void 0 : U.autonym} (${f})` : (D = t[k]) == null ? void 0 : D.autonym;
  };
  return /* @__PURE__ */ u("div", { id: d, className: x("pr-twp tw:max-w-sm", c), children: [
    /* @__PURE__ */ u(
      $r,
      {
        name: "uiLanguage",
        value: e,
        onValueChange: h,
        open: w,
        onOpenChange: (k) => p(k),
        children: [
          /* @__PURE__ */ a(Lr, { children: /* @__PURE__ */ a(Vr, {}) }),
          /* @__PURE__ */ a(
            Br,
            {
              style: { zIndex: rr },
              children: Object.keys(t).map((k) => /* @__PURE__ */ a(Ae, { value: k, children: m(k, e) }, k))
            }
          )
        ]
      }
    ),
    e !== "en" && /* @__PURE__ */ a("div", { className: "tw:pt-3", children: /* @__PURE__ */ a($t, { className: "tw:font-normal tw:text-muted-foreground", children: dr(l, {
      fallbackLanguages: (r == null ? void 0 : r.length) > 0 ? r.map((k) => m(k, e)).join(", ") : t.en.autonym
    }) }) })
  ] });
}
const cf = Object.freeze([
  "%firstRun_language_search_placeholder%",
  "%firstRun_language_noResults%",
  "%firstRun_language_selected%"
]);
function Vs(t) {
  return t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}
function hh(t, e) {
  if (!e) return t;
  const r = Vs(e);
  return t.filter(({ keywords: o }) => o.some((n) => n.includes(r)));
}
function gh(t) {
  return [...t].sort(([e, r], [o, n]) => e === "en" && o !== "en" ? -1 : o === "en" && e !== "en" ? 1 : r.autonym.localeCompare(n.autonym));
}
function lf({
  languages: t,
  value: e,
  onChange: r,
  localizedStrings: o,
  className: n,
  id: i
}) {
  const [s, c] = E(""), [d, l] = E(), w = I(null), p = I(null), h = I(/* @__PURE__ */ new Map()), [m, k] = E(), g = B(
    () => gh(Object.entries(t)).map(([D, V]) => ({
      tag: D,
      info: V,
      keywords: [
        V.autonym,
        ...Object.values(V.uiNames ?? {}),
        ...V.otherNames ?? []
      ].map(Vs)
    })),
    [t]
  ), f = B(() => hh(g, s), [g, s]), N = B(() => {
    var V;
    const D = ($) => !!$ && f.some((M) => M.tag === $);
    return D(d) ? d : D(e) ? e : ((V = f[0]) == null ? void 0 : V.tag) ?? "";
  }, [d, e, f]), T = g.length > 1;
  Kt(() => {
    var D;
    k((D = p.current) == null ? void 0 : D.id);
  }, []), Kt(() => {
    const D = h.current.get(N), V = T ? w.current : void 0;
    V && (D ? V.setAttribute("aria-activedescendant", D.id) : V.removeAttribute("aria-activedescendant")), D && N !== d && D.scrollIntoView({ block: "nearest" });
  }, [N, d, T]);
  const P = o["%firstRun_language_search_placeholder%"] ?? "", R = o["%firstRun_language_noResults%"] ?? "", U = o["%firstRun_language_selected%"] ?? "";
  return /* @__PURE__ */ u(
    Cr,
    {
      id: i,
      className: x("pr-twp", n),
      shouldFilter: !1,
      value: N,
      onValueChange: l,
      children: [
        T && // Plain <input> (not CommandPrimitive.Input) so cmdk cannot update this field after
        // item selection. Arrow-key and Enter events from here bubble to the Command root div
        // where cmdk's keydown handler picks them up for list navigation.
        /* @__PURE__ */ a("div", { "data-slot": "command-input-wrapper", className: "tw:p-1 tw:pb-0", children: /* @__PURE__ */ u(mc, { className: "tw:h-8! tw:rounded-lg! tw:border-input/30 tw:bg-input/30 tw:shadow-none! tw:*:data-[slot=input-group-addon]:ps-2!", children: [
          /* @__PURE__ */ a(
            "input",
            {
              ref: w,
              "data-slot": "command-input",
              type: "text",
              role: "combobox",
              "aria-expanded": !0,
              "aria-controls": m,
              "aria-autocomplete": "list",
              placeholder: P,
              "aria-label": P,
              value: s,
              onChange: (D) => {
                c(D.currentTarget.value), l(void 0);
              },
              className: "tw:w-full tw:text-sm tw:outline-hidden tw:disabled:cursor-not-allowed tw:disabled:opacity-50"
            }
          ),
          /* @__PURE__ */ a(vc, { children: /* @__PURE__ */ a(ml, { className: "tw:size-4 tw:shrink-0 tw:opacity-50" }) })
        ] }) }),
        /* @__PURE__ */ u(Er, { ref: p, children: [
          /* @__PURE__ */ a(La, { children: R }),
          f.map(({ tag: D, info: V }) => {
            const $ = D === e;
            return /* @__PURE__ */ u(
              gr,
              {
                ref: (M) => {
                  M ? h.current.set(D, M) : h.current.delete(D);
                },
                value: D,
                "aria-current": $ ? "true" : void 0,
                "data-checked": $ ? "true" : void 0,
                onSelect: () => r(D),
                children: [
                  /* @__PURE__ */ a("span", { dir: "auto", children: V.autonym }),
                  $ && /* @__PURE__ */ a("span", { className: "tw:sr-only", children: U })
                ]
              },
              D
            );
          })
        ] })
      ]
    }
  );
}
function fh({ item: t, createLabel: e, createComplexLabel: r }) {
  return e ? /* @__PURE__ */ a($t, { children: e(t) }) : r ? /* @__PURE__ */ a($t, { children: r(t) }) : /* @__PURE__ */ a($t, { children: t });
}
function mh({
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
      Cs,
      {
        className: "tw:me-2 tw:align-middle",
        checked: o.includes(c),
        onCheckedChange: (d) => n(c, d)
      }
    ),
    /* @__PURE__ */ a(
      fh,
      {
        item: c,
        createLabel: i,
        createComplexLabel: s
      }
    )
  ] }, c)) });
}
const df = mh;
function vh(t, e) {
  const [r, o] = E(t), [n, i] = E(e);
  return t !== r && (o(t), t && i(e)), t ? e : n;
}
function wf({
  open: t,
  anchorRect: e,
  message: r,
  confirmingKeyLabel: o,
  side: n = "bottom",
  align: i = "start",
  showArrow: s = !0
}) {
  const c = t ? hn(r, { key: o }).join("") : "", {
    anchorRect: d,
    message: l,
    confirmingKeyLabel: w,
    showArrow: p
  } = vh(t, { anchorRect: e, message: r, confirmingKeyLabel: o, showArrow: s });
  return /* @__PURE__ */ u(Vt, { children: [
    /* @__PURE__ */ a("span", { role: "status", className: "tw:sr-only", children: c }),
    /* @__PURE__ */ u(vt, { open: t, onOpenChange: () => {
    }, children: [
      /* @__PURE__ */ a(
        bt,
        {
          "aria-hidden": "true",
          tabIndex: -1,
          className: x(
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
        xt,
        {
          side: n,
          align: i,
          showArrow: p,
          arrowPadding: 8,
          className: x(
            // Rely on TooltipContent's default tw:max-w-xs (320px) and normal wrapping: this hint's
            // text is short and usually fits on one line, but locale length varies (e.g. Spanish runs
            // longer than English), so allow it to wrap rather than force tw:whitespace-nowrap, which
            // could clip or overflow on a narrow webview.
            "tw:p-0 tw:has-data-[slot=kbd]:pe-0 tw:bg-background tw:text-destructive tw:border tw:border-destructive"
          ),
          arrowClassName: "tw:bg-[color-mix(in_oklab,var(--destructive)_10%,var(--background))] tw:fill-[color-mix(in_oklab,var(--destructive)_10%,var(--background))] tw:border tw:border-destructive",
          children: /* @__PURE__ */ a("div", { className: "tw:w-full tw:h-full tw:rounded-md tw:bg-destructive/10 tw:px-3 tw:py-1.5", children: hn(l, {
            key: /* @__PURE__ */ a(
              go,
              {
                className: x(
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
          }).map((h, m) => (
            // The array is static per render (one fixed localized string + one kbd), so index is
            // a stable, safe key — same rationale as source-language-indexed-list.component.tsx's
            // disable.
            // eslint-disable-next-line react/no-array-index-key
            /* @__PURE__ */ a(yr, { children: h }, `key-${m}`)
          )) })
        }
      )
    ] })
  ] });
}
function uf({
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
  const m = (f) => {
    if (f.key === "Enter" || f.key === " ") {
      if (f.target !== f.currentTarget) return;
      f.preventDefault(), r();
    }
  }, [k, g] = E(!1);
  return /* @__PURE__ */ u(
    "div",
    {
      hidden: n,
      onClick: r,
      onKeyDown: m,
      onMouseEnter: () => g(!0),
      onFocus: () => g(!0),
      role: "button",
      tabIndex: 0,
      "aria-pressed": e,
      className: x(
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
            l && (e || h && k) && /* @__PURE__ */ a(
              "div",
              {
                className: x(
                  !e && h && "tw:invisible tw:group-hover:visible"
                ),
                children: /* @__PURE__ */ u(tr, { children: [
                  /* @__PURE__ */ a(Ke, { className: x(p && "tw:me-1"), asChild: !0, children: /* @__PURE__ */ a(
                    rt,
                    {
                      className: "tw:m-1 tw:h-6 tw:w-6",
                      variant: "ghost",
                      size: "icon",
                      onClick: (f) => f.stopPropagation(),
                      onFocus: (f) => f.stopPropagation(),
                      children: /* @__PURE__ */ a(tl, {})
                    }
                  ) }),
                  /* @__PURE__ */ a(er, { align: "end", children: l })
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
function pf({
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
  onBlur: m
}) {
  return /* @__PURE__ */ u("div", { className: x("tw:inline-grid tw:items-center tw:gap-1.5", { "tw:w-full": o }), children: [
    /* @__PURE__ */ a(
      $t,
      {
        htmlFor: t,
        className: x({
          "tw:text-red-600": r,
          "tw:hidden": !i
        }),
        children: `${i}${c ? "*" : ""}`
      }
    ),
    /* @__PURE__ */ a(
      Ba,
      {
        id: t,
        disabled: e,
        placeholder: s,
        required: c,
        className: x(d, { "tw:border-red-600": r }),
        defaultValue: l,
        value: w,
        onChange: p,
        onFocus: h,
        onBlur: m
      }
    ),
    /* @__PURE__ */ a("p", { className: x({ "tw:hidden": !n }), children: n })
  ] });
}
function hf({ currentStep: t, totalSteps: e, locale: r }) {
  const o = r || "en", n = B(() => {
    const c = new fi(o);
    return (d) => c.format(d);
  }, [o]), i = Math.min(Math.max(t, 1), e), s = Array.from({ length: e }, (c, d) => d + 1);
  return /* @__PURE__ */ a("div", { className: "tw:flex tw:items-center", "aria-hidden": "true", children: s.map((c) => {
    let d = "upcoming";
    return c === i ? d = "active" : c < i && (d = "complete"), /* @__PURE__ */ u(yr, { children: [
      c > 1 && /* @__PURE__ */ a("div", { className: "tw:h-px tw:flex-1 tw:bg-border" }),
      /* @__PURE__ */ a(
        "div",
        {
          "data-state": d,
          className: x(
            "tw:flex tw:h-8 tw:w-8 tw:shrink-0 tw:items-center tw:justify-center tw:rounded-full tw:text-sm tw:font-medium",
            d === "active" && "tw:bg-primary tw:text-primary-foreground",
            d === "complete" && "tw:bg-muted tw:text-muted-foreground",
            d === "upcoming" && "tw:border tw:border-input tw:text-muted-foreground"
          ),
          children: d === "complete" ? /* @__PURE__ */ a(pr, { className: "tw:h-4 tw:w-4" }) : n(c)
        }
      )
    ] }, c);
  }) });
}
function gf({ ...t }) {
  return /* @__PURE__ */ a(Xt.Root, { "data-slot": "context-menu", ...t });
}
function ff({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    Xt.Trigger,
    {
      "data-slot": "context-menu-trigger",
      className: x("tw:select-none", t),
      ...e
    }
  );
}
function mf({ ...t }) {
  return /* @__PURE__ */ a(Xt.Group, { "data-slot": "context-menu-group", ...t });
}
function vf({ ...t }) {
  return /* @__PURE__ */ a(Xt.Portal, { "data-slot": "context-menu-portal", ...t });
}
function bf({ ...t }) {
  return /* @__PURE__ */ a(Xt.Sub, { "data-slot": "context-menu-sub", ...t });
}
function xf({
  ...t
}) {
  return /* @__PURE__ */ a(Xt.RadioGroup, { "data-slot": "context-menu-radio-group", ...t });
}
function yf({
  className: t,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: e,
  ...r
}) {
  return /* @__PURE__ */ a(Xt.Portal, { children: /* @__PURE__ */ a(
    Xt.Content,
    {
      "data-slot": "context-menu-content",
      className: x(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        // CUSTOM: Fixed tw: prefix not being on some classes and removed erroneous empty tw: tokens
        // CUSTOM: Removed tw:z-50 to use the shared z-index constant below (see style prop)
        // CUSTOM: Removed tw:bg-popover/70 and the tw:before:* backdrop-blur layer that shadcn's
        // translucent menu color adds, so the base tw:bg-popover paints this surface opaque: text
        // behind a menu must not show through it (adr-opaque-menu-surfaces).
        // A blur layer on a scrolling surface scrolls away with its items and never covers the
        // scrollbar gutter, so this scrolling surface in particular must be painted opaque.
        "pr-twp tw:max-h-(--radix-context-menu-content-available-height) tw:min-w-36 tw:origin-(--radix-context-menu-content-transform-origin) tw:overflow-x-hidden tw:overflow-y-auto tw:rounded-lg tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95 tw:animate-none! tw:**:data-[slot$=-item]:focus:bg-foreground/10 tw:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 tw:**:data-[slot$=-separator]:bg-foreground/5 tw:**:data-[slot$=-trigger]:focus:bg-foreground/10 tw:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! tw:**:data-[variant=destructive]:focus:bg-foreground/10! tw:**:data-[variant=destructive]:text-accent-foreground! tw:**:data-[variant=destructive]:**:text-accent-foreground! tw:relative",
        t
      ),
      style: { zIndex: rr, ...e },
      ...r
    }
  ) });
}
function kf({
  className: t,
  inset: e,
  variant: r = "default",
  ...o
}) {
  return /* @__PURE__ */ a(
    Xt.Item,
    {
      "data-slot": "context-menu-item",
      "data-inset": e,
      "data-variant": r,
      className: x(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:group/context-menu-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-inset:ps-7 tw:data-[variant=destructive]:text-destructive tw:data-[variant=destructive]:focus:bg-destructive/10 tw:data-[variant=destructive]:focus:text-destructive tw:dark:data-[variant=destructive]:focus:bg-destructive/20 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:focus:*:[svg]:text-accent-foreground tw:data-[variant=destructive]:*:[svg]:text-destructive",
        t
      ),
      ...o
    }
  );
}
function _f({
  className: t,
  inset: e,
  children: r,
  ...o
}) {
  return /* @__PURE__ */ u(
    Xt.SubTrigger,
    {
      "data-slot": "context-menu-sub-trigger",
      "data-inset": e,
      className: x(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-inset:ps-7 tw:data-open:bg-accent tw:data-open:text-accent-foreground tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      ...o,
      children: [
        r,
        /* @__PURE__ */ a(xi, { className: "tw:ms-auto" })
      ]
    }
  );
}
function Nf({
  className: t,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: e,
  ...r
}) {
  return /* @__PURE__ */ a(
    Xt.SubContent,
    {
      "data-slot": "context-menu-sub-content",
      className: x(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        // CUSTOM: Fixed tw: prefix not being on some classes and removed erroneous empty tw: tokens
        // CUSTOM: Removed tw:z-50 to use the shared z-index constant below (see style prop), keeping
        // submenus on the same above-dock layer as their parent ContextMenuContent (PT-3877)
        // CUSTOM: Removed tw:bg-popover/70 and the tw:before:* backdrop-blur layer that shadcn's
        // translucent menu color adds, so the base tw:bg-popover paints this surface opaque: text
        // behind a menu must not show through it (adr-opaque-menu-surfaces).
        // CUSTOM: Replaced tw:border with tw:ring-1 tw:ring-foreground/10 so a context submenu draws
        // its edge the same way as ContextMenuContent and DropdownMenuSubContent do, instead of being
        // the one menu surface in the family outlined with the border color.
        "pr-twp tw:min-w-32 tw:origin-(--radix-context-menu-content-transform-origin) tw:overflow-hidden tw:rounded-lg tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-lg tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95 tw:animate-none! tw:**:data-[slot$=-item]:focus:bg-foreground/10 tw:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 tw:**:data-[slot$=-separator]:bg-foreground/5 tw:**:data-[slot$=-trigger]:focus:bg-foreground/10 tw:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! tw:**:data-[variant=destructive]:focus:bg-foreground/10! tw:**:data-[variant=destructive]:text-accent-foreground! tw:**:data-[variant=destructive]:**:text-accent-foreground! tw:relative",
        t
      ),
      style: { zIndex: rr, ...e },
      ...r
    }
  );
}
function Cf({
  className: t,
  children: e,
  checked: r,
  inset: o,
  ...n
}) {
  return /* @__PURE__ */ u(
    Xt.CheckboxItem,
    {
      "data-slot": "context-menu-checkbox-item",
      "data-inset": o,
      className: x(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      checked: r,
      ...n,
      children: [
        /* @__PURE__ */ a("span", { className: "tw:pointer-events-none tw:absolute tw:end-2", children: /* @__PURE__ */ a(Xt.ItemIndicator, { children: /* @__PURE__ */ a(ja, {}) }) }),
        e
      ]
    }
  );
}
function Ef({
  className: t,
  children: e,
  inset: r,
  ...o
}) {
  return /* @__PURE__ */ u(
    Xt.RadioItem,
    {
      "data-slot": "context-menu-radio-item",
      "data-inset": r,
      className: x(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      ...o,
      children: [
        /* @__PURE__ */ a("span", { className: "tw:pointer-events-none tw:absolute tw:end-2", children: /* @__PURE__ */ a(Xt.ItemIndicator, { children: /* @__PURE__ */ a(ja, {}) }) }),
        e
      ]
    }
  );
}
function Tf({
  className: t,
  inset: e,
  ...r
}) {
  return /* @__PURE__ */ a(
    Xt.Label,
    {
      "data-slot": "context-menu-label",
      "data-inset": e,
      className: x(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:px-1.5 tw:py-1 tw:text-xs tw:font-medium tw:text-muted-foreground tw:data-inset:ps-7",
        t
      ),
      ...r
    }
  );
}
function Rf({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    Xt.Separator,
    {
      "data-slot": "context-menu-separator",
      className: x(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:-mx-1 tw:my-1 tw:h-px tw:bg-border",
        t
      ),
      ...e
    }
  );
}
function Sf({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "span",
    {
      "data-slot": "context-menu-shortcut",
      className: x(
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
function Of({ ...t }) {
  return /* @__PURE__ */ a(fr.Root, { "data-slot": "drawer", ...t });
}
function Df({ ...t }) {
  return /* @__PURE__ */ a(fr.Trigger, { "data-slot": "drawer-trigger", ...t });
}
function bh({ ...t }) {
  return /* @__PURE__ */ a(fr.Portal, { "data-slot": "drawer-portal", ...t });
}
function If({ ...t }) {
  return /* @__PURE__ */ a(fr.Close, { "data-slot": "drawer-close", ...t });
}
function xh({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    fr.Overlay,
    {
      "data-slot": "drawer-overlay",
      className: x(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:fixed tw:inset-0 tw:z-50 tw:bg-black/10 tw:supports-backdrop-filter:backdrop-blur-xs tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-closed:animate-out tw:data-closed:fade-out-0",
        t
      ),
      ...e
    }
  );
}
function Mf({
  className: t,
  children: e,
  // CUSTOM: Destructure hideDrawerHandle to conditionally render the drag handle
  hideDrawerHandle: r = !1,
  ...o
}) {
  const n = $e();
  return /* @__PURE__ */ u(bh, { "data-slot": "drawer-portal", children: [
    /* @__PURE__ */ a(xh, {}),
    /* @__PURE__ */ u(
      fr.Content,
      {
        "data-slot": "drawer-content",
        className: x(
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
function zf({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "drawer-header",
      className: x(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:flex tw:flex-col tw:gap-0.5 tw:p-4 tw:group-data-[vaul-drawer-direction=bottom]/drawer-content:text-center tw:group-data-[vaul-drawer-direction=top]/drawer-content:text-center tw:md:gap-0.5 tw:md:text-start",
        t
      ),
      ...e
    }
  );
}
function Pf({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "drawer-footer",
      className: x(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:mt-auto tw:flex tw:flex-col tw:gap-2 tw:p-4",
        t
      ),
      ...e
    }
  );
}
function Af({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    fr.Title,
    {
      "data-slot": "drawer-title",
      className: x(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:font-heading tw:text-base tw:font-medium tw:text-foreground",
        t
      ),
      ...e
    }
  );
}
function $f({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    fr.Description,
    {
      "data-slot": "drawer-description",
      className: x(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:text-sm tw:text-muted-foreground",
        t
      ),
      ...e
    }
  );
}
function Vf({
  className: t,
  value: e,
  ...r
}) {
  return /* @__PURE__ */ a(
    bn.Root,
    {
      "data-slot": "progress",
      className: x(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:relative tw:flex tw:h-1 tw:w-full tw:items-center tw:overflow-x-hidden tw:rounded-full tw:bg-muted",
        t
      ),
      ...r,
      children: /* @__PURE__ */ a(
        bn.Indicator,
        {
          "data-slot": "progress-indicator",
          className: "tw:size-full tw:flex-1 tw:bg-primary tw:transition-all",
          style: { transform: `translateX(-${100 - (e || 0)}%)` }
        }
      )
    }
  );
}
function Lf({ ...t }) {
  const { theme: e = "system" } = Td();
  return /* @__PURE__ */ a(
    Rd,
    {
      theme: e === "light" || e === "dark" || e === "system" ? e : "system",
      className: "tw:toaster tw:group",
      icons: {
        success: /* @__PURE__ */ a(kl, { className: "tw:size-4" }),
        info: /* @__PURE__ */ a(yl, { className: "tw:size-4" }),
        warning: /* @__PURE__ */ a(xl, { className: "tw:size-4" }),
        error: /* @__PURE__ */ a(bl, { className: "tw:size-4" }),
        loading: /* @__PURE__ */ a(vl, { className: "tw:size-4 tw:animate-spin" })
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
function Bf({
  className: t,
  defaultValue: e,
  value: r,
  min: o = 0,
  max: n = 100,
  ...i
}) {
  const s = $e(), c = Zt.useMemo(
    () => Array.isArray(r) ? r : Array.isArray(e) ? e : [o, n],
    [r, e, o, n]
  );
  return /* @__PURE__ */ u(
    wa.Root,
    {
      "data-slot": "slider",
      defaultValue: e,
      value: r,
      min: o,
      max: n,
      className: x(
        "pr-twp tw:relative tw:flex tw:w-full tw:touch-none tw:items-center tw:select-none tw:data-disabled:opacity-50 tw:data-vertical:h-full tw:data-vertical:min-h-40 tw:data-vertical:w-auto tw:data-vertical:flex-col",
        t
      ),
      dir: s,
      ...i,
      children: [
        /* @__PURE__ */ a(
          wa.Track,
          {
            "data-slot": "slider-track",
            className: "tw:relative tw:grow tw:overflow-hidden tw:rounded-full tw:bg-muted tw:data-horizontal:h-1 tw:data-horizontal:w-full tw:data-vertical:h-full tw:data-vertical:w-1",
            children: /* @__PURE__ */ a(
              wa.Range,
              {
                "data-slot": "slider-range",
                className: "tw:absolute tw:bg-primary tw:select-none tw:data-horizontal:h-full tw:data-vertical:w-full"
              }
            )
          }
        ),
        Array.from({ length: c.length }, (d, l) => /* @__PURE__ */ a(
          wa.Thumb,
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
function jf({
  className: t,
  size: e = "default",
  ...r
}) {
  return /* @__PURE__ */ a(
    xn.Root,
    {
      "data-slot": "switch",
      "data-size": e,
      className: x(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation. tw:peer
        // precedes pr-twp here because the peer class must be the first peer-related class for
        // Tailwind's peer selector to work correctly; pr-twp is still present as required.
        "tw:peer pr-twp tw:group/switch tw:relative tw:inline-flex tw:shrink-0 tw:items-center tw:rounded-full tw:border tw:border-transparent tw:transition-all tw:outline-none tw:after:absolute tw:after:-inset-x-3 tw:after:-inset-y-2 tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:data-[size=default]:h-[18.4px] tw:data-[size=default]:w-[32px] tw:data-[size=sm]:h-[14px] tw:data-[size=sm]:w-[24px] tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40 tw:data-checked:bg-primary tw:data-unchecked:bg-input tw:dark:data-unchecked:bg-input/80 tw:data-disabled:cursor-not-allowed tw:data-disabled:opacity-50",
        t
      ),
      ...r,
      children: /* @__PURE__ */ a(
        xn.Thumb,
        {
          "data-slot": "switch-thumb",
          className: "tw:pointer-events-none tw:block tw:rounded-full tw:bg-background tw:ring-0 tw:transition-transform tw:group-data-[size=default]/switch:size-4 tw:group-data-[size=sm]/switch:size-3 tw:group-data-[size=default]/switch:data-checked:translate-x-[calc(100%-2px)] tw:rtl:group-data-[size=default]/switch:data-checked:-translate-x-[calc(100%-2px)] tw:group-data-[size=sm]/switch:data-checked:translate-x-[calc(100%-2px)] tw:rtl:group-data-[size=sm]/switch:data-checked:-translate-x-[calc(100%-2px)] tw:dark:data-checked:bg-primary-foreground tw:group-data-[size=default]/switch:data-unchecked:translate-x-0 tw:rtl:group-data-[size=default]/switch:data-unchecked:-translate-x-0 tw:group-data-[size=sm]/switch:data-unchecked:translate-x-0 tw:rtl:group-data-[size=sm]/switch:data-unchecked:-translate-x-0 tw:dark:data-unchecked:bg-foreground"
        }
      )
    }
  );
}
function Ff({
  className: t,
  orientation: e = "horizontal",
  ...r
}) {
  return /* @__PURE__ */ a(
    Ve.Root,
    {
      "data-slot": "tabs",
      "data-orientation": e,
      className: x("tw:group/tabs tw:flex tw:gap-2 tw:data-horizontal:flex-col", t),
      ...r
    }
  );
}
const yh = Ho(
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
function Uf({
  className: t,
  variant: e = "default",
  ...r
}) {
  const o = $e();
  return /* @__PURE__ */ a(
    Ve.List,
    {
      "data-slot": "tabs-list",
      "data-variant": e,
      className: x("pr-twp", yh({ variant: e }), t),
      dir: o,
      ...r
    }
  );
}
function Kf({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    Ve.Trigger,
    {
      "data-slot": "tabs-trigger",
      className: x(
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
function Hf({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    Ve.Content,
    {
      "data-slot": "tabs-content",
      className: x("pr-twp tw:flex-1 tw:text-sm tw:outline-none", t),
      ...e
    }
  );
}
const qf = (t, e) => {
  q(() => {
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
        console.error("useEvent: error while unsubscribing from event", i);
      }
    };
  }, [t, e]);
}, Gf = (t, e) => {
  q(() => {
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
        } catch (d) {
          console.error("useEventAsync: error while unsubscribing from event", d);
        }
      })();
    };
    return (async () => {
      try {
        o = await Promise.resolve(t(i)), r && s();
      } catch (c) {
        console.error("useEventAsync: error while subscribing to event", c);
      }
    })(), () => {
      r = !0, s();
    };
  }, [t, e]);
};
function kh(t) {
  return {
    preserveValue: !0,
    ...t
  };
}
const _h = (t, e, r = {}) => {
  const o = I(e);
  o.current = e;
  const n = I(r);
  n.current = kh(n.current);
  const [i, s] = E(() => o.current), [c, d] = E(!0);
  return q(() => {
    let l = !0;
    return d(!!t), (async () => {
      if (t)
        try {
          const w = await t();
          l && (s(() => w), d(!1));
        } catch (w) {
          l && d(!1), console.error(
            "usePromise: the promise factory rejected, so there is no new value",
            w
          );
        }
    })(), () => {
      l = !1, n.current.preserveValue || s(() => o.current);
    };
  }, [t]), [i, c];
}, Wf = (t) => {
  const [e, r] = E(!1), [o, n] = E(!1), [i, s] = E(0), c = I(void 0), d = B(() => {
    if (!t) return;
    const h = async () => {
      try {
        const m = await t();
        return c.current === h && (r(!1), n(!0)), m;
      } catch (m) {
        throw c.current === h && (r(!0), n(!0)), m;
      }
    };
    return h;
  }, [t, i]);
  q(() => {
    c.current = d, r(!1), n(!d);
  }, [d]);
  const [l, w] = _h(d, void 0), p = L(() => {
    c.current && (r(!1), n(!1), s((h) => h + 1));
  }, []);
  return B(
    () => ({ data: l, isLoading: w, hasError: e, hasSettled: o, refetch: p }),
    [l, w, e, o, p]
  );
};
function Yf(t) {
  q(() => {
    let e;
    return t && (e = document.createElement("style"), e.appendChild(document.createTextNode(t)), document.head.appendChild(e)), () => {
      e && document.head.removeChild(e);
    };
  }, [t]);
}
function Zf(t) {
  const e = B(() => dl(t).slice().sort().join(" "), [t]);
  return B(() => e ? e.split(" ") : [], [e]);
}
const Nh = () => {
  const [t, e] = E(
    () => document.body.getBoundingClientRect().height > 0
  );
  return q(() => {
    const r = new IntersectionObserver((o) => {
      const n = o[o.length - 1];
      n && e(n.isIntersecting);
    });
    return r.observe(document.body), () => {
      r.disconnect();
    };
  }, []), t;
};
function Xf(t, e) {
  const [r, o] = E(!1), n = I(e);
  n.current = e;
  const i = I(t);
  i.current = t;
  const s = L(() => {
    i.current ? n.current() : o(!0);
  }, []);
  return q(() => {
    !t || !r || (o(!1), n.current());
  }, [t, r]), s;
}
function Ch(t, e, r) {
  return t ? r.dark : e === void 0 ? r.lightDefault : r.lightUnselected;
}
function Jf(t, e) {
  const r = Nh();
  return Ch(t, r, e);
}
function Qf({ value: t, children: e }) {
  return /* @__PURE__ */ a(Vi.Provider, { value: t, children: /* @__PURE__ */ a(Fa.Provider, { value: t, children: e }) });
}
const tm = 300;
function Eh(t, e = "top") {
  if (!t || typeof document > "u") return;
  const r = document.head || document.querySelector("head"), o = r.querySelector(":first-child"), n = document.createElement("style");
  n.appendChild(document.createTextNode(t)), e === "top" && o ? r.insertBefore(n, o) : r.appendChild(n);
}
Eh(`/* By default the editor is too tall for the footnote editor, even while empty, so this makes it
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
@layer properties{@supports (((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))){*,:before,:after,::backdrop{--tw-translate-x:0;--tw-translate-y:0;--tw-translate-z:0;--tw-rotate-x:initial;--tw-rotate-y:initial;--tw-rotate-z:initial;--tw-skew-x:initial;--tw-skew-y:initial;--tw-space-y-reverse:0;--tw-space-x-reverse:0;--tw-divide-x-reverse:0;--tw-border-style:solid;--tw-divide-y-reverse:0;--tw-gradient-position:initial;--tw-gradient-from:#0000;--tw-gradient-via:#0000;--tw-gradient-to:#0000;--tw-gradient-stops:initial;--tw-gradient-via-stops:initial;--tw-gradient-from-position:0%;--tw-gradient-via-position:50%;--tw-gradient-to-position:100%;--tw-leading:initial;--tw-font-weight:initial;--tw-tracking:initial;--tw-ordinal:initial;--tw-slashed-zero:initial;--tw-numeric-figure:initial;--tw-numeric-spacing:initial;--tw-numeric-fraction:initial;--tw-shadow:0 0 #0000;--tw-shadow-color:initial;--tw-shadow-alpha:100%;--tw-inset-shadow:0 0 #0000;--tw-inset-shadow-color:initial;--tw-inset-shadow-alpha:100%;--tw-ring-color:initial;--tw-ring-shadow:0 0 #0000;--tw-inset-ring-color:initial;--tw-inset-ring-shadow:0 0 #0000;--tw-ring-inset:initial;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-offset-shadow:0 0 #0000;--tw-blur:initial;--tw-brightness:initial;--tw-contrast:initial;--tw-grayscale:initial;--tw-hue-rotate:initial;--tw-invert:initial;--tw-opacity:initial;--tw-saturate:initial;--tw-sepia:initial;--tw-drop-shadow:initial;--tw-drop-shadow-color:initial;--tw-drop-shadow-alpha:100%;--tw-drop-shadow-size:initial;--tw-duration:initial;--tw-ease:initial;--tw-content:"";--tw-outline-style:solid;--tw-backdrop-blur:initial;--tw-backdrop-brightness:initial;--tw-backdrop-contrast:initial;--tw-backdrop-grayscale:initial;--tw-backdrop-hue-rotate:initial;--tw-backdrop-invert:initial;--tw-backdrop-opacity:initial;--tw-backdrop-saturate:initial;--tw-backdrop-sepia:initial;--tw-animation-delay:0s;--tw-animation-direction:normal;--tw-animation-duration:initial;--tw-animation-fill-mode:none;--tw-animation-iteration-count:1;--tw-enter-blur:0;--tw-enter-opacity:1;--tw-enter-rotate:0;--tw-enter-scale:1;--tw-enter-translate-x:0;--tw-enter-translate-y:0;--tw-exit-blur:0;--tw-exit-opacity:1;--tw-exit-rotate:0;--tw-exit-scale:1;--tw-exit-translate-x:0;--tw-exit-translate-y:0}}}@layer theme{:root,:host{--tw-font-mono:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;--tw-color-red-100:oklch(93.6% .032 17.717);--tw-color-red-200:oklch(88.5% .062 18.334);--tw-color-red-300:oklch(80.8% .114 19.571);--tw-color-red-400:oklch(70.4% .191 22.216);--tw-color-red-500:oklch(63.7% .237 25.331);--tw-color-red-600:oklch(57.7% .245 27.325);--tw-color-red-700:oklch(50.5% .213 27.518);--tw-color-red-800:oklch(44.4% .177 26.899);--tw-color-orange-100:oklch(95.4% .038 75.164);--tw-color-orange-800:oklch(47% .157 37.304);--tw-color-amber-200:oklch(92.4% .12 95.746);--tw-color-amber-400:oklch(82.8% .189 84.429);--tw-color-amber-500:oklch(76.9% .188 70.08);--tw-color-amber-600:oklch(66.6% .179 58.318);--tw-color-yellow-50:oklch(98.7% .026 102.212);--tw-color-yellow-100:oklch(97.3% .071 103.193);--tw-color-yellow-400:oklch(85.2% .199 91.936);--tw-color-yellow-500:oklch(79.5% .184 86.047);--tw-color-yellow-600:oklch(68.1% .162 75.834);--tw-color-yellow-700:oklch(55.4% .135 66.442);--tw-color-green-50:oklch(98.2% .018 155.826);--tw-color-green-100:oklch(96.2% .044 156.743);--tw-color-green-500:oklch(72.3% .219 149.579);--tw-color-green-600:oklch(62.7% .194 149.214);--tw-color-green-700:oklch(52.7% .154 150.069);--tw-color-green-800:oklch(44.8% .119 151.328);--tw-color-teal-400:oklch(77.7% .152 181.912);--tw-color-teal-500:oklch(70.4% .14 182.503);--tw-color-teal-600:oklch(60% .118 184.704);--tw-color-sky-400:oklch(74.6% .16 232.661);--tw-color-sky-500:oklch(68.5% .169 237.323);--tw-color-sky-600:oklch(58.8% .158 241.966);--tw-color-blue-50:oklch(97% .014 254.604);--tw-color-blue-100:oklch(93.2% .032 255.585);--tw-color-blue-400:oklch(70.7% .165 254.624);--tw-color-blue-500:oklch(62.3% .214 259.815);--tw-color-blue-600:oklch(54.6% .245 262.881);--tw-color-blue-800:oklch(42.4% .199 265.638);--tw-color-indigo-200:oklch(87% .065 274.039);--tw-color-purple-50:oklch(97.7% .014 308.299);--tw-color-purple-200:oklch(90.2% .063 306.703);--tw-color-purple-900:oklch(38.1% .176 304.987);--tw-color-rose-400:oklch(71.2% .194 13.428);--tw-color-rose-500:oklch(64.5% .246 16.439);--tw-color-rose-600:oklch(58.6% .253 17.585);--tw-color-slate-300:oklch(86.9% .022 252.894);--tw-color-slate-400:oklch(70.4% .04 256.788);--tw-color-slate-900:oklch(20.8% .042 265.755);--tw-color-gray-50:oklch(98.5% .002 247.839);--tw-color-gray-100:oklch(96.7% .003 264.542);--tw-color-gray-300:oklch(87.2% .01 258.338);--tw-color-gray-500:oklch(55.1% .027 264.364);--tw-color-gray-600:oklch(44.6% .03 256.802);--tw-color-gray-700:oklch(37.3% .034 259.733);--tw-color-gray-800:oklch(27.8% .033 256.848);--tw-color-zinc-400:oklch(70.5% .015 286.067);--tw-color-neutral-300:oklch(87% 0 0);--tw-color-black:#000;--tw-color-white:#fff;--tw-container-xs:20rem;--tw-container-sm:24rem;--tw-container-md:28rem;--tw-container-lg:32rem;--tw-container-2xl:42rem;--tw-container-3xl:48rem;--tw-container-4xl:56rem;--tw-container-6xl:72rem;--tw-text-xs:.75rem;--tw-text-xs--line-height:calc(1 / .75);--tw-text-sm:.875rem;--tw-text-sm--line-height:calc(1.25 / .875);--tw-text-base:1rem;--tw-text-base--line-height:calc(1.5 / 1);--tw-text-lg:1.125rem;--tw-text-lg--line-height:calc(1.75 / 1.125);--tw-text-xl:1.25rem;--tw-text-xl--line-height:calc(1.75 / 1.25);--tw-text-2xl:1.5rem;--tw-text-2xl--line-height:calc(2 / 1.5);--tw-text-3xl:1.875rem;--tw-text-3xl--line-height:calc(2.25 / 1.875);--tw-text-4xl:2.25rem;--tw-text-4xl--line-height:calc(2.5 / 2.25);--tw-text-5xl:3rem;--tw-text-5xl--line-height:1;--tw-font-weight-normal:400;--tw-font-weight-medium:500;--tw-font-weight-semibold:600;--tw-font-weight-bold:700;--tw-font-weight-extrabold:800;--tw-tracking-tight:-.025em;--tw-tracking-wider:.05em;--tw-tracking-widest:.1em;--tw-leading-tight:1.25;--tw-leading-snug:1.375;--tw-leading-relaxed:1.625;--tw-leading-loose:2;--tw-radius-xs:.125rem;--tw-radius-md:calc(var(--radius) * .8);--tw-drop-shadow-sm:0 1px 2px #00000026;--tw-animate-spin:spin 1s linear infinite;--tw-animate-pulse:pulse 2s cubic-bezier(.4, 0, .6, 1) infinite;--tw-blur-xs:4px;--tw-default-transition-duration:.15s;--tw-default-transition-timing-function:cubic-bezier(.4, 0, .2, 1);--tw-default-font-family:"IBM Plex Sans Variable", sans-serif;--tw-default-mono-font-family:var(--tw-font-mono)}}@layer base{.pr-twp,.pr-twp *{border-color:var(--border);outline-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.pr-twp,.pr-twp *{outline-color:color-mix(in oklab, var(--ring) 50%, transparent)}}body.pr-twp{background-color:var(--background);color:var(--foreground)}html.pr-twp{font-family:IBM Plex Sans Variable,sans-serif}:where(.pr-twp,.pr-twp *),:where(.pr-twp,.pr-twp *):after,:where(.pr-twp,.pr-twp *):before,:where(.pr-twp,.pr-twp *) ::backdrop{box-sizing:border-box;border:0 solid;margin:0;padding:0}:where(.pr-twp,.pr-twp *) ::file-selector-button{box-sizing:border-box;border:0 solid;margin:0;padding:0}.pr-twp{-webkit-text-size-adjust:100%;tab-size:4;line-height:1.5;font-family:var(--tw-default-font-family,ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");font-feature-settings:var(--tw-default-font-feature-settings,normal);font-variation-settings:var(--tw-default-font-variation-settings,normal);-webkit-tap-highlight-color:transparent}hr:where(.pr-twp,.pr-twp *){height:0;color:inherit;border-top-width:1px}abbr:where([title]):where(.pr-twp,.pr-twp *){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1:where(.pr-twp,.pr-twp *),h2:where(.pr-twp,.pr-twp *),h3:where(.pr-twp,.pr-twp *),h4:where(.pr-twp,.pr-twp *),h5:where(.pr-twp,.pr-twp *),h6:where(.pr-twp,.pr-twp *){font-size:inherit;font-weight:inherit}a:where(.pr-twp,.pr-twp *){color:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b:where(.pr-twp,.pr-twp *),strong:where(.pr-twp,.pr-twp *){font-weight:bolder}code:where(.pr-twp,.pr-twp *),kbd:where(.pr-twp,.pr-twp *),samp:where(.pr-twp,.pr-twp *),pre:where(.pr-twp,.pr-twp *){font-family:var(--tw-default-mono-font-family,ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace);font-feature-settings:var(--tw-default-mono-font-feature-settings,normal);font-variation-settings:var(--tw-default-mono-font-variation-settings,normal);font-size:1em}small:where(.pr-twp,.pr-twp *){font-size:80%}sub:where(.pr-twp,.pr-twp *),sup:where(.pr-twp,.pr-twp *){vertical-align:baseline;font-size:75%;line-height:0;position:relative}sub:where(.pr-twp,.pr-twp *){bottom:-.25em}sup:where(.pr-twp,.pr-twp *){top:-.5em}table:where(.pr-twp,.pr-twp *){text-indent:0;border-color:inherit;border-collapse:collapse}:-moz-focusring:where(.pr-twp,.pr-twp *){outline:auto}progress:where(.pr-twp,.pr-twp *){vertical-align:baseline}summary:where(.pr-twp,.pr-twp *){display:list-item}ol:where(.pr-twp,.pr-twp *),ul:where(.pr-twp,.pr-twp *),menu:where(.pr-twp,.pr-twp *){list-style:none}img:where(.pr-twp,.pr-twp *),svg:where(.pr-twp,.pr-twp *),video:where(.pr-twp,.pr-twp *),canvas:where(.pr-twp,.pr-twp *),audio:where(.pr-twp,.pr-twp *),iframe:where(.pr-twp,.pr-twp *),embed:where(.pr-twp,.pr-twp *),object:where(.pr-twp,.pr-twp *){vertical-align:middle;display:block}img:where(.pr-twp,.pr-twp *),video:where(.pr-twp,.pr-twp *){max-width:100%;height:auto}button:where(.pr-twp,.pr-twp *),input:where(.pr-twp,.pr-twp *),select:where(.pr-twp,.pr-twp *),optgroup:where(.pr-twp,.pr-twp *),textarea:where(.pr-twp,.pr-twp *){font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(.pr-twp,.pr-twp *) ::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(select:is([multiple],[size])) optgroup:where(.pr-twp,.pr-twp *){font-weight:bolder}:where(select:is([multiple],[size])) optgroup option:where(.pr-twp,.pr-twp *){padding-inline-start:20px}:where(.pr-twp,.pr-twp *) ::file-selector-button{margin-inline-end:4px}:where(.pr-twp,.pr-twp *) ::placeholder{opacity:1}@supports (not ((-webkit-appearance:-apple-pay-button))) or (contain-intrinsic-size:1px){:where(.pr-twp,.pr-twp *) ::placeholder{color:currentColor}@supports (color:color-mix(in lab, red, red)){:where(.pr-twp,.pr-twp *) ::placeholder{color:color-mix(in oklab, currentcolor 50%, transparent)}}}textarea:where(.pr-twp,.pr-twp *){resize:vertical}:where(.pr-twp,.pr-twp *) ::-webkit-search-decoration{-webkit-appearance:none}:where(.pr-twp,.pr-twp *) ::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit{display:inline-flex}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-fields-wrapper{padding:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-year-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-month-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-day-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-hour-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-minute-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-second-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-millisecond-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-meridiem-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-calendar-picker-indicator{line-height:1}:-moz-ui-invalid:where(.pr-twp,.pr-twp *){box-shadow:none}button:where(.pr-twp,.pr-twp *),input:where([type=button],[type=reset],[type=submit]):where(.pr-twp,.pr-twp *){appearance:button}:where(.pr-twp,.pr-twp *) ::file-selector-button{appearance:button}:where(.pr-twp,.pr-twp *) ::-webkit-inner-spin-button{height:auto}:where(.pr-twp,.pr-twp *) ::-webkit-outer-spin-button{height:auto}[hidden]:where(:not([hidden=until-found])):where(.pr-twp,.pr-twp *){display:none!important}}@layer components;@layer utilities{.tw\\:\\@container\\/card-header{container:card-header/inline-size}.tw\\:\\@container\\/search{container:search/inline-size}.tw\\:\\@container\\/toolbar{container:toolbar/inline-size}.tw\\:pointer-events-auto{pointer-events:auto}.tw\\:pointer-events-none{pointer-events:none}.tw\\:invisible{visibility:hidden}.tw\\:sr-only{clip-path:inset(50%);white-space:nowrap;border-width:0;width:1px;height:1px;margin:-1px;padding:0;position:absolute;overflow:hidden}.tw\\:absolute{position:absolute}.tw\\:fixed{position:fixed}.tw\\:relative{position:relative}.tw\\:sticky{position:sticky}.tw\\:inset-0{inset:calc(calc(var(--spacing)) * 0)}.tw\\:inset-x-0{inset-inline:calc(calc(var(--spacing)) * 0)}.tw\\:inset-y-0{inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:inset-s-3{inset-inline-start:calc(calc(var(--spacing)) * 3)}.tw\\:start-1\\.5{inset-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:start-1\\/2{inset-inline-start:50%}.tw\\:end-0{inset-inline-end:calc(calc(var(--spacing)) * 0)}.tw\\:end-1{inset-inline-end:calc(calc(var(--spacing)) * 1)}.tw\\:end-2{inset-inline-end:calc(calc(var(--spacing)) * 2)}.tw\\:end-3{inset-inline-end:calc(calc(var(--spacing)) * 3)}.tw\\:inset-e-0{inset-inline-end:calc(calc(var(--spacing)) * 0)}.tw\\:-top-\\[1px\\]{top:-1px}.tw\\:top-0{top:calc(calc(var(--spacing)) * 0)}.tw\\:top-1{top:calc(calc(var(--spacing)) * 1)}.tw\\:top-1\\.5{top:calc(calc(var(--spacing)) * 1.5)}.tw\\:top-1\\/2{top:50%}.tw\\:top-1\\/3{top:33.3333%}.tw\\:top-2{top:calc(calc(var(--spacing)) * 2)}.tw\\:top-2\\.5{top:calc(calc(var(--spacing)) * 2.5)}.tw\\:top-3\\.5{top:calc(calc(var(--spacing)) * 3.5)}.tw\\:top-\\[-1px\\]{top:-1px}.tw\\:top-full{top:100%}.tw\\:-right-1{right:calc(calc(var(--spacing)) * -1)}.tw\\:right-0{right:calc(calc(var(--spacing)) * 0)}.tw\\:right-1{right:calc(calc(var(--spacing)) * 1)}.tw\\:right-3{right:calc(calc(var(--spacing)) * 3)}.tw\\:bottom-0{bottom:calc(calc(var(--spacing)) * 0)}.tw\\:-left-\\[1px\\]{left:-1px}.tw\\:left-0{left:calc(calc(var(--spacing)) * 0)}.tw\\:left-1\\/2{left:50%}.tw\\:left-2{left:calc(calc(var(--spacing)) * 2)}.tw\\:left-3{left:calc(calc(var(--spacing)) * 3)}.tw\\:isolate{isolation:isolate}.tw\\:z-10{z-index:10}.tw\\:z-20{z-index:20}.tw\\:z-50{z-index:50}.tw\\:order-first{order:-9999}.tw\\:order-last{order:9999}.tw\\:col-span-1{grid-column:span 1/span 1}.tw\\:col-span-2{grid-column:span 2/span 2}.tw\\:col-span-3{grid-column:span 3/span 3}.tw\\:col-start-1{grid-column-start:1}.tw\\:col-start-2{grid-column-start:2}.tw\\:row-span-2{grid-row:span 2/span 2}.tw\\:row-start-1{grid-row-start:1}.tw\\:row-start-2{grid-row-start:2}.tw\\:m-0{margin:calc(calc(var(--spacing)) * 0)}.tw\\:m-1{margin:calc(calc(var(--spacing)) * 1)}.tw\\:m-2{margin:calc(calc(var(--spacing)) * 2)}.tw\\:-mx-1{margin-inline:calc(calc(var(--spacing)) * -1)}.tw\\:-mx-4{margin-inline:calc(calc(var(--spacing)) * -4)}.tw\\:mx-0{margin-inline:calc(calc(var(--spacing)) * 0)}.tw\\:mx-1{margin-inline:calc(calc(var(--spacing)) * 1)}.tw\\:mx-2{margin-inline:calc(calc(var(--spacing)) * 2)}.tw\\:mx-3\\.5{margin-inline:calc(calc(var(--spacing)) * 3.5)}.tw\\:mx-4{margin-inline:calc(calc(var(--spacing)) * 4)}.tw\\:mx-8{margin-inline:calc(calc(var(--spacing)) * 8)}.tw\\:my-1{margin-block:calc(calc(var(--spacing)) * 1)}.tw\\:my-2\\.5{margin-block:calc(calc(var(--spacing)) * 2.5)}.tw\\:my-4{margin-block:calc(calc(var(--spacing)) * 4)}.tw\\:my-auto{margin-block:auto}.tw\\:ms-1{margin-inline-start:calc(calc(var(--spacing)) * 1)}.tw\\:ms-2{margin-inline-start:calc(calc(var(--spacing)) * 2)}.tw\\:ms-5{margin-inline-start:calc(calc(var(--spacing)) * 5)}.tw\\:ms-6{margin-inline-start:calc(calc(var(--spacing)) * 6)}.tw\\:ms-auto{margin-inline-start:auto}.tw\\:me-1{margin-inline-end:calc(calc(var(--spacing)) * 1)}.tw\\:me-2{margin-inline-end:calc(calc(var(--spacing)) * 2)}.tw\\:prose{color:var(--tw-prose-body);max-width:65ch}.tw\\:prose :where(p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em}.tw\\:prose :where([class~=lead]):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-lead);margin-top:1.2em;margin-bottom:1.2em;font-size:1.25em;line-height:1.6}.tw\\:prose :where(a):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-links);font-weight:500;text-decoration:underline}.tw\\:prose :where(strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-bold);font-weight:600}.tw\\:prose :where(a strong):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(blockquote strong):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(thead th strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.tw\\:prose :where(ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em;padding-inline-start:1.625em;list-style-type:decimal}.tw\\:prose :where(ol[type=A]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-alpha}.tw\\:prose :where(ol[type=a]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-alpha}.tw\\:prose :where(ol[type=A s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-alpha}.tw\\:prose :where(ol[type=a s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-alpha}.tw\\:prose :where(ol[type=I]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-roman}.tw\\:prose :where(ol[type=i]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-roman}.tw\\:prose :where(ol[type=I s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-roman}.tw\\:prose :where(ol[type=i s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-roman}.tw\\:prose :where(ol[type="1"]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:decimal}.tw\\:prose :where(ul):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em;padding-inline-start:1.625em;list-style-type:disc}.tw\\:prose :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *))::marker{color:var(--tw-prose-counters);font-weight:400}.tw\\:prose :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *))::marker{color:var(--tw-prose-bullets)}.tw\\:prose :where(dt):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:1.25em;font-weight:600}.tw\\:prose :where(hr):not(:where([class~=not-prose],[class~=not-prose] *)){border-color:var(--tw-prose-hr);border-top-width:1px;margin-top:3em;margin-bottom:3em}.tw\\:prose :where(blockquote):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-quotes);border-inline-start-width:.25rem;border-inline-start-color:var(--tw-prose-quote-borders);quotes:"“""”""‘""’";margin-top:1.6em;margin-bottom:1.6em;padding-inline-start:1em;font-style:italic;font-weight:500}.tw\\:prose :where(blockquote p:first-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):before{content:open-quote}.tw\\:prose :where(blockquote p:last-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:close-quote}.tw\\:prose :where(h1):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:0;margin-bottom:.888889em;font-size:2.25em;font-weight:800;line-height:1.11111}.tw\\:prose :where(h1 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:900}.tw\\:prose :where(h2):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:2em;margin-bottom:1em;font-size:1.5em;font-weight:700;line-height:1.33333}.tw\\:prose :where(h2 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:800}.tw\\:prose :where(h3):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:1.6em;margin-bottom:.6em;font-size:1.25em;font-weight:600;line-height:1.6}.tw\\:prose :where(h3 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:700}.tw\\:prose :where(h4):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:1.5em;margin-bottom:.5em;font-weight:600;line-height:1.5}.tw\\:prose :where(h4 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:700}.tw\\:prose :where(img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.tw\\:prose :where(picture):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em;display:block}.tw\\:prose :where(video):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.tw\\:prose :where(kbd):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-kbd);box-shadow:0 0 0 1px rgb(var(--tw-prose-kbd-shadows) / 10%), 0 3px 0 rgb(var(--tw-prose-kbd-shadows) / 10%);padding-top:.1875em;padding-inline-end:.375em;padding-bottom:.1875em;border-radius:.3125rem;padding-inline-start:.375em;font-family:inherit;font-size:.875em;font-weight:500}.tw\\:prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-code);font-size:.875em;font-weight:600}.tw\\:prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)):before,.tw\\:prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:"\`"}.tw\\:prose :where(a code):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h1 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.tw\\:prose :where(h2 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-size:.875em}.tw\\:prose :where(h3 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-size:.9em}.tw\\:prose :where(h4 code):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(blockquote code):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(thead th code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.tw\\:prose :where(pre):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-pre-code);background-color:var(--tw-prose-pre-bg);padding-top:.857143em;padding-inline-end:1.14286em;padding-bottom:.857143em;border-radius:.375rem;margin-top:1.71429em;margin-bottom:1.71429em;padding-inline-start:1.14286em;font-size:.875em;font-weight:400;line-height:1.71429;overflow-x:auto}.tw\\:prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)){font-weight:inherit;color:inherit;font-size:inherit;font-family:inherit;line-height:inherit;background-color:#0000;border-width:0;border-radius:0;padding:0}.tw\\:prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)):before,.tw\\:prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:none}.tw\\:prose :where(table):not(:where([class~=not-prose],[class~=not-prose] *)){table-layout:auto;width:100%;margin-top:2em;margin-bottom:2em;font-size:.875em;line-height:1.71429}.tw\\:prose :where(thead):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:1px;border-bottom-color:var(--tw-prose-th-borders)}.tw\\:prose :where(thead th):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);vertical-align:bottom;padding-inline-end:.571429em;padding-bottom:.571429em;padding-inline-start:.571429em;font-weight:600}.tw\\:prose :where(tbody tr):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:1px;border-bottom-color:var(--tw-prose-td-borders)}.tw\\:prose :where(tbody tr:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:0}.tw\\:prose :where(tbody td):not(:where([class~=not-prose],[class~=not-prose] *)){vertical-align:baseline}.tw\\:prose :where(tfoot):not(:where([class~=not-prose],[class~=not-prose] *)){border-top-width:1px;border-top-color:var(--tw-prose-th-borders)}.tw\\:prose :where(tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){vertical-align:top}.tw\\:prose :where(th,td):not(:where([class~=not-prose],[class~=not-prose] *)){text-align:start}.tw\\:prose :where(figure>*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose :where(figcaption):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-captions);margin-top:.857143em;font-size:.875em;line-height:1.42857}.tw\\:prose{--tw-prose-body:var(--foreground);--tw-prose-headings:var(--foreground);--tw-prose-lead:var(--muted-foreground);--tw-prose-links:var(--primary);--tw-prose-bold:var(--foreground);--tw-prose-counters:var(--muted-foreground);--tw-prose-bullets:var(--muted-foreground);--tw-prose-hr:var(--border);--tw-prose-quotes:var(--foreground);--tw-prose-quote-borders:var(--border);--tw-prose-captions:var(--muted-foreground);--tw-prose-kbd:oklch(21% .034 264.665);--tw-prose-kbd-shadows:NaN NaN NaN;--tw-prose-code:var(--foreground);--tw-prose-pre-code:var(--muted-foreground);--tw-prose-pre-bg:var(--muted);--tw-prose-th-borders:var(--border);--tw-prose-td-borders:var(--border);--tw-prose-invert-body:var(--foreground);--tw-prose-invert-headings:var(--foreground);--tw-prose-invert-lead:var(--muted-foreground);--tw-prose-invert-links:var(--primary);--tw-prose-invert-bold:var(--foreground);--tw-prose-invert-counters:var(--muted-foreground);--tw-prose-invert-bullets:var(--muted-foreground);--tw-prose-invert-hr:var(--border);--tw-prose-invert-quotes:var(--foreground);--tw-prose-invert-quote-borders:var(--border);--tw-prose-invert-captions:var(--muted-foreground);--tw-prose-invert-kbd:#fff;--tw-prose-invert-kbd-shadows:255 255 255;--tw-prose-invert-code:var(--foreground);--tw-prose-invert-pre-code:var(--muted-foreground);--tw-prose-invert-pre-bg:var(--muted);--tw-prose-invert-th-borders:var(--border);--tw-prose-invert-td-borders:var(--border);font-size:1rem;line-height:1.75}.tw\\:prose :where(picture>img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose :where(li):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.5em;margin-bottom:.5em}.tw\\:prose :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:.375em}.tw\\:prose :where(.tw\\:prose>ul>li p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.75em;margin-bottom:.75em}.tw\\:prose :where(.tw\\:prose>ul>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em}.tw\\:prose :where(.tw\\:prose>ul>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.25em}.tw\\:prose :where(.tw\\:prose>ol>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em}.tw\\:prose :where(.tw\\:prose>ol>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.25em}.tw\\:prose :where(ul ul,ul ol,ol ul,ol ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.75em;margin-bottom:.75em}.tw\\:prose :where(dl):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em}.tw\\:prose :where(dd):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.5em;padding-inline-start:1.625em}.tw\\:prose :where(hr+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h2+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h3+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h4+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose :where(thead th:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose :where(thead th:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose :where(tbody td,tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.571429em;padding-inline-end:.571429em;padding-bottom:.571429em;padding-inline-start:.571429em}.tw\\:prose :where(tbody td:first-child,tfoot td:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose :where(tbody td:last-child,tfoot td:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose :where(figure):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.tw\\:prose :where(.tw\\:prose>:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose :where(.tw\\:prose>:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:0}.tw\\:prose-sm{font-size:.875rem;line-height:1.71429}.tw\\:prose-sm :where(p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em;margin-bottom:1.14286em}.tw\\:prose-sm :where([class~=lead]):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.888889em;margin-bottom:.888889em;font-size:1.28571em;line-height:1.55556}.tw\\:prose-sm :where(blockquote):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.33333em;margin-bottom:1.33333em;padding-inline-start:1.11111em}.tw\\:prose-sm :where(h1):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:.8em;font-size:2.14286em;line-height:1.2}.tw\\:prose-sm :where(h2):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.6em;margin-bottom:.8em;font-size:1.42857em;line-height:1.4}.tw\\:prose-sm :where(h3):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.55556em;margin-bottom:.444444em;font-size:1.28571em;line-height:1.55556}.tw\\:prose-sm :where(h4):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.42857em;margin-bottom:.571429em;line-height:1.42857}.tw\\:prose-sm :where(img):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(picture):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.71429em;margin-bottom:1.71429em}.tw\\:prose-sm :where(picture>img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose-sm :where(video):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.71429em;margin-bottom:1.71429em}.tw\\:prose-sm :where(kbd):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.142857em;padding-inline-end:.357143em;padding-bottom:.142857em;border-radius:.3125rem;padding-inline-start:.357143em;font-size:.857143em}.tw\\:prose-sm :where(code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.857143em}.tw\\:prose-sm :where(h2 code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.9em}.tw\\:prose-sm :where(h3 code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.888889em}.tw\\:prose-sm :where(pre):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.666667em;padding-inline-end:1em;padding-bottom:.666667em;border-radius:.25rem;margin-top:1.66667em;margin-bottom:1.66667em;padding-inline-start:1em;font-size:.857143em;line-height:1.66667}.tw\\:prose-sm :where(ol):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(ul):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em;margin-bottom:1.14286em;padding-inline-start:1.57143em}.tw\\:prose-sm :where(li):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.285714em;margin-bottom:.285714em}.tw\\:prose-sm :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:.428571em}.tw\\:prose-sm :where(.tw\\:prose-sm>ul>li p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.571429em;margin-bottom:.571429em}.tw\\:prose-sm :where(.tw\\:prose-sm>ul>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em}.tw\\:prose-sm :where(.tw\\:prose-sm>ul>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.14286em}.tw\\:prose-sm :where(.tw\\:prose-sm>ol>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em}.tw\\:prose-sm :where(.tw\\:prose-sm>ol>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.14286em}.tw\\:prose-sm :where(ul ul,ul ol,ol ul,ol ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.571429em;margin-bottom:.571429em}.tw\\:prose-sm :where(dl):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em;margin-bottom:1.14286em}.tw\\:prose-sm :where(dt):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em}.tw\\:prose-sm :where(dd):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.285714em;padding-inline-start:1.57143em}.tw\\:prose-sm :where(hr):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2.85714em;margin-bottom:2.85714em}.tw\\:prose-sm :where(hr+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(h2+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(h3+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(h4+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose-sm :where(table):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.857143em;line-height:1.5}.tw\\:prose-sm :where(thead th):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:1em;padding-bottom:.666667em;padding-inline-start:1em}.tw\\:prose-sm :where(thead th:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose-sm :where(thead th:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose-sm :where(tbody td,tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.666667em;padding-inline-end:1em;padding-bottom:.666667em;padding-inline-start:1em}.tw\\:prose-sm :where(tbody td:first-child,tfoot td:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose-sm :where(tbody td:last-child,tfoot td:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose-sm :where(figure):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.71429em;margin-bottom:1.71429em}.tw\\:prose-sm :where(figure>*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose-sm :where(figcaption):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.666667em;font-size:.857143em;line-height:1.33333}.tw\\:prose-sm :where(.tw\\:prose-sm>:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose-sm :where(.tw\\:prose-sm>:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:0}.tw\\:-mt-4{margin-top:calc(calc(var(--spacing)) * -4)}.tw\\:mt-0\\.5{margin-top:calc(calc(var(--spacing)) * .5)}.tw\\:mt-1{margin-top:calc(calc(var(--spacing)) * 1)}.tw\\:mt-2{margin-top:calc(calc(var(--spacing)) * 2)}.tw\\:mt-3{margin-top:calc(calc(var(--spacing)) * 3)}.tw\\:mt-4{margin-top:calc(calc(var(--spacing)) * 4)}.tw\\:mt-6{margin-top:calc(calc(var(--spacing)) * 6)}.tw\\:mt-auto{margin-top:auto}.tw\\:mr-1{margin-right:calc(calc(var(--spacing)) * 1)}.tw\\:mr-2{margin-right:calc(calc(var(--spacing)) * 2)}.tw\\:mr-3{margin-right:calc(calc(var(--spacing)) * 3)}.tw\\:-mb-4{margin-bottom:calc(calc(var(--spacing)) * -4)}.tw\\:mb-1{margin-bottom:calc(calc(var(--spacing)) * 1)}.tw\\:mb-2{margin-bottom:calc(calc(var(--spacing)) * 2)}.tw\\:mb-3{margin-bottom:calc(calc(var(--spacing)) * 3)}.tw\\:mb-4{margin-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:ml-1{margin-left:calc(calc(var(--spacing)) * 1)}.tw\\:ml-2{margin-left:calc(calc(var(--spacing)) * 2)}.tw\\:ml-4{margin-left:calc(calc(var(--spacing)) * 4)}.tw\\:ml-auto{margin-left:auto}.tw\\:box-border{box-sizing:border-box}.tw\\:line-clamp-3{-webkit-line-clamp:3;-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden}.tw\\:no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}.tw\\:no-scrollbar::-webkit-scrollbar{display:none}.tw\\:block{display:block}.tw\\:flex{display:flex}.tw\\:grid{display:grid}.tw\\:hidden{display:none}.tw\\:inline-block{display:inline-block}.tw\\:inline-flex{display:inline-flex}.tw\\:inline-grid{display:inline-grid}.tw\\:field-sizing-content{field-sizing:content}.tw\\:aspect-square{aspect-ratio:1}.tw\\:size-2{width:calc(calc(var(--spacing)) * 2);height:calc(calc(var(--spacing)) * 2)}.tw\\:size-2\\.5{width:calc(calc(var(--spacing)) * 2.5);height:calc(calc(var(--spacing)) * 2.5)}.tw\\:size-3{width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:size-3\\.5{width:calc(calc(var(--spacing)) * 3.5);height:calc(calc(var(--spacing)) * 3.5)}.tw\\:size-4{width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:size-5{width:calc(calc(var(--spacing)) * 5);height:calc(calc(var(--spacing)) * 5)}.tw\\:size-6{width:calc(calc(var(--spacing)) * 6);height:calc(calc(var(--spacing)) * 6)}.tw\\:size-7{width:calc(calc(var(--spacing)) * 7);height:calc(calc(var(--spacing)) * 7)}.tw\\:size-8{width:calc(calc(var(--spacing)) * 8);height:calc(calc(var(--spacing)) * 8)}.tw\\:size-9{width:calc(calc(var(--spacing)) * 9);height:calc(calc(var(--spacing)) * 9)}.tw\\:size-10{width:calc(calc(var(--spacing)) * 10);height:calc(calc(var(--spacing)) * 10)}.tw\\:size-full{width:100%;height:100%}.tw\\:h-1{height:calc(calc(var(--spacing)) * 1)}.tw\\:h-2{height:calc(calc(var(--spacing)) * 2)}.tw\\:h-3{height:calc(calc(var(--spacing)) * 3)}.tw\\:h-3\\.5{height:calc(calc(var(--spacing)) * 3.5)}.tw\\:h-4{height:calc(calc(var(--spacing)) * 4)}.tw\\:h-5{height:calc(calc(var(--spacing)) * 5)}.tw\\:h-6{height:calc(calc(var(--spacing)) * 6)}.tw\\:h-7{height:calc(calc(var(--spacing)) * 7)}.tw\\:h-8{height:calc(calc(var(--spacing)) * 8)}.tw\\:h-8\\!{height:calc(calc(var(--spacing)) * 8)!important}.tw\\:h-8\\.5{height:calc(calc(var(--spacing)) * 8.5)}.tw\\:h-9{height:calc(calc(var(--spacing)) * 9)}.tw\\:h-10{height:calc(calc(var(--spacing)) * 10)}.tw\\:h-12{height:calc(calc(var(--spacing)) * 12)}.tw\\:h-14{height:calc(calc(var(--spacing)) * 14)}.tw\\:h-20{height:calc(calc(var(--spacing)) * 20)}.tw\\:h-24{height:calc(calc(var(--spacing)) * 24)}.tw\\:h-32{height:calc(calc(var(--spacing)) * 32)}.tw\\:h-40{height:calc(calc(var(--spacing)) * 40)}.tw\\:h-64{height:calc(calc(var(--spacing)) * 64)}.tw\\:h-80{height:calc(calc(var(--spacing)) * 80)}.tw\\:h-96{height:calc(calc(var(--spacing)) * 96)}.tw\\:h-\\[5px\\]{height:5px}.tw\\:h-\\[260px\\]{height:260px}.tw\\:h-\\[300px\\]{height:300px}.tw\\:h-\\[400px\\]{height:400px}.tw\\:h-\\[600px\\]{height:600px}.tw\\:h-\\[calc\\(100\\%-1px\\)\\]{height:calc(100% - 1px)}.tw\\:h-\\[calc\\(100\\%-2px\\)\\]{height:calc(100% - 2px)}.tw\\:h-auto{height:auto}.tw\\:h-full{height:100%}.tw\\:h-px{height:1px}.tw\\:h-screen{height:100vh}.tw\\:h-svh{height:100svh}.tw\\:max-h-\\(--radix-context-menu-content-available-height\\){max-height:var(--radix-context-menu-content-available-height)}.tw\\:max-h-\\(--radix-dropdown-menu-content-available-height\\){max-height:var(--radix-dropdown-menu-content-available-height)}.tw\\:max-h-\\(--radix-popover-content-available-height\\){max-height:var(--radix-popover-content-available-height)}.tw\\:max-h-\\(--radix-select-content-available-height\\){max-height:var(--radix-select-content-available-height)}.tw\\:max-h-5{max-height:calc(calc(var(--spacing)) * 5)}.tw\\:max-h-10{max-height:calc(calc(var(--spacing)) * 10)}.tw\\:max-h-72{max-height:calc(calc(var(--spacing)) * 72)}.tw\\:max-h-80{max-height:calc(calc(var(--spacing)) * 80)}.tw\\:max-h-\\[96\\%\\]{max-height:96%}.tw\\:max-h-\\[300px\\]{max-height:300px}.tw\\:min-h-0{min-height:calc(calc(var(--spacing)) * 0)}.tw\\:min-h-11{min-height:calc(calc(var(--spacing)) * 11)}.tw\\:min-h-16{min-height:calc(calc(var(--spacing)) * 16)}.tw\\:min-h-\\[200px\\]{min-height:200px}.tw\\:min-h-full{min-height:100%}.tw\\:min-h-svh{min-height:100svh}.tw\\:w-\\(--radix-dropdown-menu-trigger-width\\){width:var(--radix-dropdown-menu-trigger-width)}.tw\\:w-\\(--sidebar-width\\){width:var(--sidebar-width)}.tw\\:w-1{width:calc(calc(var(--spacing)) * 1)}.tw\\:w-1\\/2{width:50%}.tw\\:w-1\\/4{width:25%}.tw\\:w-1\\/6{width:16.6667%}.tw\\:w-2{width:calc(calc(var(--spacing)) * 2)}.tw\\:w-3{width:calc(calc(var(--spacing)) * 3)}.tw\\:w-3\\.5{width:calc(calc(var(--spacing)) * 3.5)}.tw\\:w-3\\/4{width:75%}.tw\\:w-4{width:calc(calc(var(--spacing)) * 4)}.tw\\:w-4\\/5{width:80%}.tw\\:w-4\\/6{width:66.6667%}.tw\\:w-5{width:calc(calc(var(--spacing)) * 5)}.tw\\:w-5\\/6{width:83.3333%}.tw\\:w-6{width:calc(calc(var(--spacing)) * 6)}.tw\\:w-7{width:calc(calc(var(--spacing)) * 7)}.tw\\:w-8{width:calc(calc(var(--spacing)) * 8)}.tw\\:w-9{width:calc(calc(var(--spacing)) * 9)}.tw\\:w-9\\/12{width:75%}.tw\\:w-10{width:calc(calc(var(--spacing)) * 10)}.tw\\:w-12{width:calc(calc(var(--spacing)) * 12)}.tw\\:w-14{width:calc(calc(var(--spacing)) * 14)}.tw\\:w-20{width:calc(calc(var(--spacing)) * 20)}.tw\\:w-24{width:calc(calc(var(--spacing)) * 24)}.tw\\:w-32{width:calc(calc(var(--spacing)) * 32)}.tw\\:w-48{width:calc(calc(var(--spacing)) * 48)}.tw\\:w-56{width:calc(calc(var(--spacing)) * 56)}.tw\\:w-60{width:calc(calc(var(--spacing)) * 60)}.tw\\:w-64{width:calc(calc(var(--spacing)) * 64)}.tw\\:w-72{width:calc(calc(var(--spacing)) * 72)}.tw\\:w-80{width:calc(calc(var(--spacing)) * 80)}.tw\\:w-96{width:calc(calc(var(--spacing)) * 96)}.tw\\:w-\\[1px\\]{width:1px}.tw\\:w-\\[5px\\]{width:5px}.tw\\:w-\\[70px\\]{width:70px}.tw\\:w-\\[100px\\]{width:100px}.tw\\:w-\\[116px\\]{width:116px}.tw\\:w-\\[124px\\]{width:124px}.tw\\:w-\\[150px\\]{width:150px}.tw\\:w-\\[180px\\]{width:180px}.tw\\:w-\\[200px\\]{width:200px}.tw\\:w-\\[250px\\]{width:250px}.tw\\:w-\\[260px\\]{width:260px}.tw\\:w-\\[270px\\]{width:270px}.tw\\:w-\\[280px\\]{width:280px}.tw\\:w-\\[300px\\]{width:300px}.tw\\:w-\\[320px\\]{width:320px}.tw\\:w-\\[350px\\]{width:350px}.tw\\:w-\\[380px\\]{width:380px}.tw\\:w-\\[400px\\]{width:400px}.tw\\:w-\\[420px\\]{width:420px}.tw\\:w-\\[500px\\]{width:500px}.tw\\:w-\\[560px\\]{width:560px}.tw\\:w-\\[600px\\]{width:600px}.tw\\:w-\\[700px\\]{width:700px}.tw\\:w-\\[calc\\(100\\%-2px\\)\\]{width:calc(100% - 2px)}.tw\\:w-\\[var\\(--radix-dropdown-menu-trigger-width\\)\\]{width:var(--radix-dropdown-menu-trigger-width)}.tw\\:w-auto{width:auto}.tw\\:w-fit{width:fit-content}.tw\\:w-full{width:100%}.tw\\:w-max{width:max-content}.tw\\:w-px{width:1px}.tw\\:max-w-\\(--skeleton-width\\){max-width:var(--skeleton-width)}.tw\\:max-w-0{max-width:calc(calc(var(--spacing)) * 0)}.tw\\:max-w-2xl{max-width:var(--tw-container-2xl)}.tw\\:max-w-3xl{max-width:var(--tw-container-3xl)}.tw\\:max-w-4xl{max-width:var(--tw-container-4xl)}.tw\\:max-w-5{max-width:calc(calc(var(--spacing)) * 5)}.tw\\:max-w-6xl{max-width:var(--tw-container-6xl)}.tw\\:max-w-40{max-width:calc(calc(var(--spacing)) * 40)}.tw\\:max-w-48{max-width:calc(calc(var(--spacing)) * 48)}.tw\\:max-w-64{max-width:calc(calc(var(--spacing)) * 64)}.tw\\:max-w-96{max-width:calc(calc(var(--spacing)) * 96)}.tw\\:max-w-\\[200px\\]{max-width:200px}.tw\\:max-w-\\[220px\\]{max-width:220px}.tw\\:max-w-\\[600px\\]{max-width:600px}.tw\\:max-w-\\[calc\\(100\\%-2rem\\)\\]{max-width:calc(100% - 2rem)}.tw\\:max-w-\\[calc\\(100vw-2rem\\)\\]{max-width:calc(100vw - 2rem)}.tw\\:max-w-fit{max-width:fit-content}.tw\\:max-w-full{max-width:100%}.tw\\:max-w-lg{max-width:var(--tw-container-lg)}.tw\\:max-w-md{max-width:var(--tw-container-md)}.tw\\:max-w-none{max-width:none}.tw\\:max-w-sm{max-width:var(--tw-container-sm)}.tw\\:max-w-xs{max-width:var(--tw-container-xs)}.tw\\:min-w-0{min-width:calc(calc(var(--spacing)) * 0)}.tw\\:min-w-4{min-width:calc(calc(var(--spacing)) * 4)}.tw\\:min-w-5{min-width:calc(calc(var(--spacing)) * 5)}.tw\\:min-w-7{min-width:calc(calc(var(--spacing)) * 7)}.tw\\:min-w-8{min-width:calc(calc(var(--spacing)) * 8)}.tw\\:min-w-9{min-width:calc(calc(var(--spacing)) * 9)}.tw\\:min-w-16{min-width:calc(calc(var(--spacing)) * 16)}.tw\\:min-w-32{min-width:calc(calc(var(--spacing)) * 32)}.tw\\:min-w-36{min-width:calc(calc(var(--spacing)) * 36)}.tw\\:min-w-80{min-width:calc(calc(var(--spacing)) * 80)}.tw\\:min-w-\\[12rem\\]{min-width:12rem}.tw\\:min-w-\\[26px\\]{min-width:26px}.tw\\:min-w-\\[96px\\]{min-width:96px}.tw\\:min-w-\\[140px\\]{min-width:140px}.tw\\:min-w-\\[215px\\]{min-width:215px}.tw\\:min-w-\\[500px\\]{min-width:500px}.tw\\:min-w-min{min-width:min-content}.tw\\:flex-1{flex:1}.tw\\:shrink{flex-shrink:1}.tw\\:shrink\\!{flex-shrink:1!important}.tw\\:shrink-0{flex-shrink:0}.tw\\:shrink-\\[9999\\]{flex-shrink:9999}.tw\\:flex-grow,.tw\\:grow,.tw\\:grow-\\[1\\]{flex-grow:1}.tw\\:grow-\\[10\\]{flex-grow:10}.tw\\:basis-0{flex-basis:calc(calc(var(--spacing)) * 0)}.tw\\:table-fixed{table-layout:fixed}.tw\\:caption-bottom{caption-side:bottom}.tw\\:border-collapse{border-collapse:collapse}.tw\\:origin-\\(--radix-context-menu-content-transform-origin\\){transform-origin:var(--radix-context-menu-content-transform-origin)}.tw\\:origin-\\(--radix-dropdown-menu-content-transform-origin\\){transform-origin:var(--radix-dropdown-menu-content-transform-origin)}.tw\\:origin-\\(--radix-menubar-content-transform-origin\\){transform-origin:var(--radix-menubar-content-transform-origin)}.tw\\:origin-\\(--radix-popover-content-transform-origin\\){transform-origin:var(--radix-popover-content-transform-origin)}.tw\\:origin-\\(--radix-select-content-transform-origin\\){transform-origin:var(--radix-select-content-transform-origin)}.tw\\:origin-\\(--radix-tooltip-content-transform-origin\\){transform-origin:var(--radix-tooltip-content-transform-origin)}.tw\\:-translate-x-1\\/2{--tw-translate-x:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:-translate-x-px{--tw-translate-x:-1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:translate-x-px{--tw-translate-x:1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:-translate-y-1\\/2{--tw-translate-y:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:translate-y-0{--tw-translate-y:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:translate-y-px{--tw-translate-y:1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rotate-45{rotate:45deg}.tw\\:rotate-180{rotate:180deg}.tw\\:transform{transform:var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,)}.tw\\:animate-none\\!{animation:none!important}.tw\\:animate-pulse{animation:var(--tw-animate-pulse)}.tw\\:animate-spin{animation:var(--tw-animate-spin)}.tw\\:cursor-default{cursor:default}.tw\\:cursor-ew-resize{cursor:ew-resize}.tw\\:cursor-not-allowed{cursor:not-allowed}.tw\\:cursor-pointer{cursor:pointer}.tw\\:cursor-text{cursor:text}.tw\\:touch-none{touch-action:none}.tw\\:resize{resize:both}.tw\\:resize-none{resize:none}.tw\\:scroll-m-20{scroll-margin:calc(calc(var(--spacing)) * 20)}.tw\\:scroll-my-1{scroll-margin-block:calc(calc(var(--spacing)) * 1)}.tw\\:scroll-py-1{scroll-padding-block:calc(calc(var(--spacing)) * 1)}.tw\\:list-inside{list-style-position:inside}.tw\\:list-outside{list-style-position:outside}.tw\\:\\!list-\\[lower-alpha\\]{list-style-type:lower-alpha!important}.tw\\:\\!list-\\[lower-roman\\]{list-style-type:lower-roman!important}.tw\\:\\!list-\\[upper-alpha\\]{list-style-type:upper-alpha!important}.tw\\:\\!list-\\[upper-roman\\]{list-style-type:upper-roman!important}.tw\\:\\!list-decimal{list-style-type:decimal!important}.tw\\:\\!list-disc{list-style-type:disc!important}.tw\\:list-decimal{list-style-type:decimal}.tw\\:list-disc{list-style-type:disc}.tw\\:list-none{list-style-type:none}.tw\\:grid-flow-col{grid-auto-flow:column}.tw\\:grid-flow-row{grid-auto-flow:row}.tw\\:auto-rows-min{grid-auto-rows:min-content}.tw\\:grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}.tw\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.tw\\:grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.tw\\:grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}.tw\\:grid-cols-\\[25\\%_25\\%_50\\%\\]{grid-template-columns:25% 25% 50%}.tw\\:grid-cols-\\[25\\%_50\\%_25\\%\\]{grid-template-columns:25% 50% 25%}.tw\\:grid-cols-\\[auto_auto_auto_auto\\]{grid-template-columns:auto auto auto auto}.tw\\:grid-cols-\\[min-content_1fr\\]{grid-template-columns:min-content 1fr}.tw\\:grid-cols-subgrid{grid-template-columns:subgrid}.tw\\:flex-col{flex-direction:column}.tw\\:flex-col-reverse{flex-direction:column-reverse}.tw\\:flex-row{flex-direction:row}.tw\\:flex-row-reverse{flex-direction:row-reverse}.tw\\:flex-nowrap{flex-wrap:nowrap}.tw\\:flex-wrap{flex-wrap:wrap}.tw\\:place-content-center{place-content:center}.tw\\:content-center{align-content:center}.tw\\:items-baseline{align-items:baseline}.tw\\:items-center{align-items:center}.tw\\:items-end{align-items:flex-end}.tw\\:items-start{align-items:flex-start}.tw\\:items-stretch{align-items:stretch}.tw\\:justify-between{justify-content:space-between}.tw\\:justify-center{justify-content:center}.tw\\:justify-end{justify-content:flex-end}.tw\\:justify-start{justify-content:flex-start}.tw\\:gap-0{gap:calc(calc(var(--spacing)) * 0)}.tw\\:gap-0\\.5{gap:calc(calc(var(--spacing)) * .5)}.tw\\:gap-1{gap:calc(calc(var(--spacing)) * 1)}.tw\\:gap-1\\.5{gap:calc(calc(var(--spacing)) * 1.5)}.tw\\:gap-1\\.5\\!{gap:calc(calc(var(--spacing)) * 1.5)!important}.tw\\:gap-2{gap:calc(calc(var(--spacing)) * 2)}.tw\\:gap-2\\.5{gap:calc(calc(var(--spacing)) * 2.5)}.tw\\:gap-3{gap:calc(calc(var(--spacing)) * 3)}.tw\\:gap-4{gap:calc(calc(var(--spacing)) * 4)}.tw\\:gap-5{gap:calc(calc(var(--spacing)) * 5)}.tw\\:gap-6{gap:calc(calc(var(--spacing)) * 6)}.tw\\:gap-8{gap:calc(calc(var(--spacing)) * 8)}.tw\\:gap-16{gap:calc(calc(var(--spacing)) * 16)}.tw\\:gap-\\[--spacing\\(var\\(--gap\\)\\)\\]{gap:calc(calc(var(--spacing)) * var(--gap))}.tw\\:gap-\\[12px\\]{gap:12px}:where(.tw\\:space-y-1>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 1) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 1) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-1\\.5>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 1.5) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 1.5) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-2>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 2) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 2) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-3>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 3) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 3) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-4>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 4) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 4) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-6>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 6) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 6) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-8>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 8) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 8) * calc(1 - var(--tw-space-y-reverse)))}.tw\\:gap-x-1{column-gap:calc(calc(var(--spacing)) * 1)}.tw\\:gap-x-2{column-gap:calc(calc(var(--spacing)) * 2)}.tw\\:gap-x-3{column-gap:calc(calc(var(--spacing)) * 3)}.tw\\:gap-x-4{column-gap:calc(calc(var(--spacing)) * 4)}:where(.tw\\:-space-x-2>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * -2) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * -2) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-2>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 2) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 2) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-3>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 3) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 3) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-4>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 4) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 4) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-6>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 6) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 6) * calc(1 - var(--tw-space-x-reverse)))}.tw\\:gap-y-1{row-gap:calc(calc(var(--spacing)) * 1)}.tw\\:gap-y-2{row-gap:calc(calc(var(--spacing)) * 2)}:where(.tw\\:divide-x>:not(:last-child)){--tw-divide-x-reverse:0;border-inline-style:var(--tw-border-style);border-inline-start-width:calc(1px * var(--tw-divide-x-reverse));border-inline-end-width:calc(1px * calc(1 - var(--tw-divide-x-reverse)))}:where(.tw\\:divide-y>:not(:last-child)){--tw-divide-y-reverse:0;border-bottom-style:var(--tw-border-style);border-top-style:var(--tw-border-style);border-top-width:calc(1px * var(--tw-divide-y-reverse));border-bottom-width:calc(1px * calc(1 - var(--tw-divide-y-reverse)))}.tw\\:self-start{align-self:flex-start}.tw\\:self-stretch{align-self:stretch}.tw\\:justify-self-end{justify-self:flex-end}.tw\\:truncate{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.tw\\:overflow-auto{overflow:auto}.tw\\:overflow-clip{overflow:clip}.tw\\:overflow-hidden{overflow:hidden}.tw\\:overflow-scroll{overflow:scroll}.tw\\:overflow-visible{overflow:visible}.tw\\:overflow-x-auto{overflow-x:auto}.tw\\:overflow-x-hidden{overflow-x:hidden}.tw\\:overflow-y-auto{overflow-y:auto}.tw\\:overflow-y-hidden{overflow-y:hidden}.tw\\:rounded{border-radius:.25rem}.tw\\:rounded-2xl{border-radius:calc(var(--radius) * 1.8)}.tw\\:rounded-4xl{border-radius:calc(var(--radius) * 2.6)}.tw\\:rounded-\\[4px\\]{border-radius:4px}.tw\\:rounded-\\[6px\\]{border-radius:6px}.tw\\:rounded-\\[calc\\(var\\(--radius\\)-3px\\)\\]{border-radius:calc(var(--radius) - 3px)}.tw\\:rounded-\\[min\\(var\\(--tw-radius-md\\)\\,10px\\)\\]{border-radius:min(var(--tw-radius-md), 10px)}.tw\\:rounded-\\[min\\(var\\(--tw-radius-md\\)\\,12px\\)\\]{border-radius:min(var(--tw-radius-md), 12px)}.tw\\:rounded-full{border-radius:3.40282e38px}.tw\\:rounded-lg{border-radius:var(--radius)}.tw\\:rounded-lg\\!{border-radius:var(--radius)!important}.tw\\:rounded-md{border-radius:calc(var(--radius) * .8)}.tw\\:rounded-none{border-radius:0}.tw\\:rounded-sm{border-radius:calc(var(--radius) * .6)}.tw\\:rounded-xl{border-radius:calc(var(--radius) * 1.4)}.tw\\:rounded-xl\\!{border-radius:calc(var(--radius) * 1.4)!important}.tw\\:rounded-xs{border-radius:var(--tw-radius-xs)}.tw\\:rounded-s-none{border-start-start-radius:0;border-end-start-radius:0}.tw\\:rounded-e-none{border-start-end-radius:0;border-end-end-radius:0}.tw\\:rounded-t-xl{border-top-left-radius:calc(var(--radius) * 1.4);border-top-right-radius:calc(var(--radius) * 1.4)}.tw\\:rounded-l-lg{border-top-left-radius:var(--radius);border-bottom-left-radius:var(--radius)}.tw\\:rounded-r-xl{border-top-right-radius:calc(var(--radius) * 1.4);border-bottom-right-radius:calc(var(--radius) * 1.4)}.tw\\:rounded-b-xl{border-bottom-right-radius:calc(var(--radius) * 1.4);border-bottom-left-radius:calc(var(--radius) * 1.4)}.tw\\:border{border-style:var(--tw-border-style);border-width:1px}.tw\\:border-0{border-style:var(--tw-border-style);border-width:0}.tw\\:border-2{border-style:var(--tw-border-style);border-width:2px}.tw\\:border-s{border-inline-start-style:var(--tw-border-style);border-inline-start-width:1px}.tw\\:border-s-0{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:border-s-2{border-inline-start-style:var(--tw-border-style);border-inline-start-width:2px}.tw\\:border-s-4{border-inline-start-style:var(--tw-border-style);border-inline-start-width:4px}.tw\\:border-e{border-inline-end-style:var(--tw-border-style);border-inline-end-width:1px}.tw\\:border-e-0{border-inline-end-style:var(--tw-border-style);border-inline-end-width:0}.tw\\:border-t{border-top-style:var(--tw-border-style);border-top-width:1px}.tw\\:border-t-0{border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:border-b{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}.tw\\:border-b-0{border-bottom-style:var(--tw-border-style);border-bottom-width:0}.tw\\:border-l-2{border-left-style:var(--tw-border-style);border-left-width:2px}.tw\\:border-l-4{border-left-style:var(--tw-border-style);border-left-width:4px}.tw\\:border-dashed{--tw-border-style:dashed;border-style:dashed}.tw\\:border-none{--tw-border-style:none;border-style:none}.tw\\:border-solid{--tw-border-style:solid;border-style:solid}.tw\\:border-black{border-color:var(--tw-color-black)}.tw\\:border-blue-400{border-color:var(--tw-color-blue-400)}.tw\\:border-blue-500{border-color:var(--tw-color-blue-500)}.tw\\:border-border,.tw\\:border-border\\/50{border-color:var(--border)}@supports (color:color-mix(in lab, red, red)){.tw\\:border-border\\/50{border-color:color-mix(in oklab, var(--border) 50%, transparent)}}.tw\\:border-destructive{border-color:var(--destructive)}.tw\\:border-foreground{border-color:var(--foreground)}.tw\\:border-gray-300{border-color:var(--tw-color-gray-300)}.tw\\:border-input,.tw\\:border-input\\/30{border-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:border-input\\/30{border-color:color-mix(in oklab, var(--input) 30%, transparent)}}.tw\\:border-muted-foreground,.tw\\:border-muted-foreground\\/40{border-color:var(--muted-foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:border-muted-foreground\\/40{border-color:color-mix(in oklab, var(--muted-foreground) 40%, transparent)}}.tw\\:border-primary{border-color:var(--primary)}.tw\\:border-red-300{border-color:var(--tw-color-red-300)}.tw\\:border-red-400{border-color:var(--tw-color-red-400)}.tw\\:border-red-500{border-color:var(--tw-color-red-500)}.tw\\:border-red-600{border-color:var(--tw-color-red-600)}.tw\\:border-ring{border-color:var(--ring)}.tw\\:border-sidebar-border{border-color:var(--sidebar-border)}.tw\\:border-slate-300{border-color:var(--tw-color-slate-300)}.tw\\:border-transparent{border-color:#0000}.tw\\:border-yellow-400{border-color:var(--tw-color-yellow-400)}.tw\\:border-yellow-500{border-color:var(--tw-color-yellow-500)}.tw\\:border-s-amber-200{border-inline-start-color:var(--tw-color-amber-200)}.tw\\:border-s-indigo-200{border-inline-start-color:var(--tw-color-indigo-200)}.tw\\:border-s-purple-200{border-inline-start-color:var(--tw-color-purple-200)}.tw\\:border-s-red-200{border-inline-start-color:var(--tw-color-red-200)}.tw\\:\\!bg-destructive\\/50{background-color:var(--destructive)!important}@supports (color:color-mix(in lab, red, red)){.tw\\:\\!bg-destructive\\/50{background-color:color-mix(in oklab, var(--destructive) 50%, transparent)!important}}.tw\\:bg-\\[color-mix\\(in_oklab\\,var\\(--destructive\\)_10\\%\\,var\\(--background\\)\\)\\]{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-\\[color-mix\\(in_oklab\\,var\\(--destructive\\)_10\\%\\,var\\(--background\\)\\)\\]{background-color:color-mix(in oklab,var(--destructive) 10%,var(--background))}}.tw\\:bg-accent,.tw\\:bg-accent\\/50{background-color:var(--accent)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-accent\\/50{background-color:color-mix(in oklab, var(--accent) 50%, transparent)}}.tw\\:bg-amber-500,.tw\\:bg-amber-500\\/5{background-color:var(--tw-color-amber-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-amber-500\\/5{background-color:color-mix(in oklab, var(--tw-color-amber-500) 5%, transparent)}}.tw\\:bg-amber-500\\/15{background-color:var(--tw-color-amber-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-amber-500\\/15{background-color:color-mix(in oklab, var(--tw-color-amber-500) 15%, transparent)}}.tw\\:bg-background,.tw\\:bg-background\\/50{background-color:var(--background)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-background\\/50{background-color:color-mix(in oklab, var(--background) 50%, transparent)}}.tw\\:bg-black\\/10{background-color:var(--tw-color-black)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-black\\/10{background-color:color-mix(in oklab, var(--tw-color-black) 10%, transparent)}}.tw\\:bg-blue-50{background-color:var(--tw-color-blue-50)}.tw\\:bg-blue-100{background-color:var(--tw-color-blue-100)}.tw\\:bg-blue-400{background-color:var(--tw-color-blue-400)}.tw\\:bg-blue-500{background-color:var(--tw-color-blue-500)}.tw\\:bg-border{background-color:var(--border)}.tw\\:bg-card{background-color:var(--card)}.tw\\:bg-destructive\\/10{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-destructive\\/10{background-color:color-mix(in oklab, var(--destructive) 10%, transparent)}}.tw\\:bg-foreground{background-color:var(--foreground)}.tw\\:bg-gray-50{background-color:var(--tw-color-gray-50)}.tw\\:bg-gray-100{background-color:var(--tw-color-gray-100)}.tw\\:bg-gray-500{background-color:var(--tw-color-gray-500)}.tw\\:bg-green-50{background-color:var(--tw-color-green-50)}.tw\\:bg-green-100{background-color:var(--tw-color-green-100)}.tw\\:bg-green-500{background-color:var(--tw-color-green-500)}.tw\\:bg-input,.tw\\:bg-input\\/30{background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-input\\/30{background-color:color-mix(in oklab, var(--input) 30%, transparent)}}.tw\\:bg-muted,.tw\\:bg-muted\\/50{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-muted\\/50{background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:bg-neutral-300{background-color:var(--tw-color-neutral-300)}.tw\\:bg-orange-100{background-color:var(--tw-color-orange-100)}.tw\\:bg-popover,.tw\\:bg-popover\\/70{background-color:var(--popover)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-popover\\/70{background-color:color-mix(in oklab, var(--popover) 70%, transparent)}}.tw\\:bg-primary{background-color:var(--primary)}.tw\\:bg-primary-foreground{background-color:var(--primary-foreground)}.tw\\:bg-primary\\/30{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-primary\\/30{background-color:color-mix(in oklab, var(--primary) 30%, transparent)}}.tw\\:bg-purple-50{background-color:var(--tw-color-purple-50)}.tw\\:bg-red-100{background-color:var(--tw-color-red-100)}.tw\\:bg-red-500{background-color:var(--tw-color-red-500)}.tw\\:bg-rose-500,.tw\\:bg-rose-500\\/5{background-color:var(--tw-color-rose-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-rose-500\\/5{background-color:color-mix(in oklab, var(--tw-color-rose-500) 5%, transparent)}}.tw\\:bg-rose-500\\/15{background-color:var(--tw-color-rose-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-rose-500\\/15{background-color:color-mix(in oklab, var(--tw-color-rose-500) 15%, transparent)}}.tw\\:bg-secondary{background-color:var(--secondary)}.tw\\:bg-sidebar{background-color:var(--sidebar)}.tw\\:bg-sidebar-accent{background-color:var(--sidebar-accent)}.tw\\:bg-sidebar-border{background-color:var(--sidebar-border)}.tw\\:bg-sky-500,.tw\\:bg-sky-500\\/5{background-color:var(--tw-color-sky-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-sky-500\\/5{background-color:color-mix(in oklab, var(--tw-color-sky-500) 5%, transparent)}}.tw\\:bg-sky-500\\/15{background-color:var(--tw-color-sky-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-sky-500\\/15{background-color:color-mix(in oklab, var(--tw-color-sky-500) 15%, transparent)}}.tw\\:bg-teal-500,.tw\\:bg-teal-500\\/5{background-color:var(--tw-color-teal-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-teal-500\\/5{background-color:color-mix(in oklab, var(--tw-color-teal-500) 5%, transparent)}}.tw\\:bg-teal-500\\/15{background-color:var(--tw-color-teal-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-teal-500\\/15{background-color:color-mix(in oklab, var(--tw-color-teal-500) 15%, transparent)}}.tw\\:bg-transparent{background-color:#0000}.tw\\:bg-warning\\/15{background-color:var(--warning)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-warning\\/15{background-color:color-mix(in oklab, var(--warning) 15%, transparent)}}.tw\\:bg-white{background-color:var(--tw-color-white)}.tw\\:bg-yellow-50{background-color:var(--tw-color-yellow-50)}.tw\\:bg-yellow-100{background-color:var(--tw-color-yellow-100)}.tw\\:bg-yellow-500{background-color:var(--tw-color-yellow-500)}.tw\\:bg-zinc-400{background-color:var(--tw-color-zinc-400)}.tw\\:bg-gradient-to-t{--tw-gradient-position:to top in oklab;background-image:linear-gradient(var(--tw-gradient-stops))}.tw\\:from-popover{--tw-gradient-from:var(--popover);--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))}.tw\\:to-transparent{--tw-gradient-to:transparent;--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))}.tw\\:bg-clip-padding{background-clip:padding-box}.tw\\:fill-\\[color-mix\\(in_oklab\\,var\\(--destructive\\)_10\\%\\,var\\(--background\\)\\)\\]{fill:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:fill-\\[color-mix\\(in_oklab\\,var\\(--destructive\\)_10\\%\\,var\\(--background\\)\\)\\]{fill:color-mix(in oklab,var(--destructive) 10%,var(--background))}}.tw\\:fill-foreground{fill:var(--foreground)}.tw\\:fill-yellow-400,.tw\\:fill-yellow-400\\/50{fill:var(--tw-color-yellow-400)}@supports (color:color-mix(in lab, red, red)){.tw\\:fill-yellow-400\\/50{fill:color-mix(in oklab, var(--tw-color-yellow-400) 50%, transparent)}}.tw\\:object-cover{object-fit:cover}.tw\\:\\!p-4{padding:calc(calc(var(--spacing)) * 4)!important}.tw\\:p-0{padding:calc(calc(var(--spacing)) * 0)}.tw\\:p-0\\.5{padding:calc(calc(var(--spacing)) * .5)}.tw\\:p-1{padding:calc(calc(var(--spacing)) * 1)}.tw\\:p-2{padding:calc(calc(var(--spacing)) * 2)}.tw\\:p-2\\.5{padding:calc(calc(var(--spacing)) * 2.5)}.tw\\:p-3{padding:calc(calc(var(--spacing)) * 3)}.tw\\:p-4{padding:calc(calc(var(--spacing)) * 4)}.tw\\:p-6{padding:calc(calc(var(--spacing)) * 6)}.tw\\:p-8{padding:calc(calc(var(--spacing)) * 8)}.tw\\:p-\\[1px\\]{padding:1px}.tw\\:p-\\[3px\\]{padding:3px}.tw\\:p-\\[10px\\]{padding:10px}.tw\\:p-\\[16px\\]{padding:16px}.tw\\:px-0{padding-inline:calc(calc(var(--spacing)) * 0)}.tw\\:px-0\\.5{padding-inline:calc(calc(var(--spacing)) * .5)}.tw\\:px-1{padding-inline:calc(calc(var(--spacing)) * 1)}.tw\\:px-1\\.5{padding-inline:calc(calc(var(--spacing)) * 1.5)}.tw\\:px-2{padding-inline:calc(calc(var(--spacing)) * 2)}.tw\\:px-2\\.5{padding-inline:calc(calc(var(--spacing)) * 2.5)}.tw\\:px-3{padding-inline:calc(calc(var(--spacing)) * 3)}.tw\\:px-4{padding-inline:calc(calc(var(--spacing)) * 4)}.tw\\:px-6{padding-inline:calc(calc(var(--spacing)) * 6)}.tw\\:py-0{padding-block:calc(calc(var(--spacing)) * 0)}.tw\\:py-0\\.5{padding-block:calc(calc(var(--spacing)) * .5)}.tw\\:py-1{padding-block:calc(calc(var(--spacing)) * 1)}.tw\\:py-1\\.5{padding-block:calc(calc(var(--spacing)) * 1.5)}.tw\\:py-2{padding-block:calc(calc(var(--spacing)) * 2)}.tw\\:py-3{padding-block:calc(calc(var(--spacing)) * 3)}.tw\\:py-4{padding-block:calc(calc(var(--spacing)) * 4)}.tw\\:py-6{padding-block:calc(calc(var(--spacing)) * 6)}.tw\\:py-8{padding-block:calc(calc(var(--spacing)) * 8)}.tw\\:py-\\[2px\\]{padding-block:2px}.tw\\:ps-1\\.5{padding-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:ps-2{padding-inline-start:calc(calc(var(--spacing)) * 2)}.tw\\:ps-2\\.5{padding-inline-start:calc(calc(var(--spacing)) * 2.5)}.tw\\:ps-4{padding-inline-start:calc(calc(var(--spacing)) * 4)}.tw\\:ps-6{padding-inline-start:calc(calc(var(--spacing)) * 6)}.tw\\:ps-7{padding-inline-start:calc(calc(var(--spacing)) * 7)}.tw\\:ps-8{padding-inline-start:calc(calc(var(--spacing)) * 8)}.tw\\:ps-9{padding-inline-start:calc(calc(var(--spacing)) * 9)}.tw\\:ps-12{padding-inline-start:calc(calc(var(--spacing)) * 12)}.tw\\:ps-\\[85px\\]{padding-inline-start:85px}.tw\\:pe-1{padding-inline-end:calc(calc(var(--spacing)) * 1)}.tw\\:pe-1\\.5{padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:pe-2{padding-inline-end:calc(calc(var(--spacing)) * 2)}.tw\\:pe-4{padding-inline-end:calc(calc(var(--spacing)) * 4)}.tw\\:pe-8{padding-inline-end:calc(calc(var(--spacing)) * 8)}.tw\\:pe-8\\!{padding-inline-end:calc(calc(var(--spacing)) * 8)!important}.tw\\:pe-9{padding-inline-end:calc(calc(var(--spacing)) * 9)}.tw\\:pe-\\[calc\\(138px\\+1rem\\)\\]{padding-inline-end:calc(138px + 1rem)}.tw\\:pe-\\[…\\]{padding-inline-end:…}.tw\\:pt-1{padding-top:calc(calc(var(--spacing)) * 1)}.tw\\:pt-2{padding-top:calc(calc(var(--spacing)) * 2)}.tw\\:pt-3{padding-top:calc(calc(var(--spacing)) * 3)}.tw\\:pt-4{padding-top:calc(calc(var(--spacing)) * 4)}.tw\\:pt-6{padding-top:calc(calc(var(--spacing)) * 6)}.tw\\:pr-0{padding-right:calc(calc(var(--spacing)) * 0)}.tw\\:pr-3{padding-right:calc(calc(var(--spacing)) * 3)}.tw\\:pr-4{padding-right:calc(calc(var(--spacing)) * 4)}.tw\\:pb-0{padding-bottom:calc(calc(var(--spacing)) * 0)}.tw\\:pb-1{padding-bottom:calc(calc(var(--spacing)) * 1)}.tw\\:pb-2{padding-bottom:calc(calc(var(--spacing)) * 2)}.tw\\:pb-3{padding-bottom:calc(calc(var(--spacing)) * 3)}.tw\\:pb-4{padding-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:pb-8{padding-bottom:calc(calc(var(--spacing)) * 8)}.tw\\:pb-12{padding-bottom:calc(calc(var(--spacing)) * 12)}.tw\\:pb-16{padding-bottom:calc(calc(var(--spacing)) * 16)}.tw\\:pb-24{padding-bottom:calc(calc(var(--spacing)) * 24)}.tw\\:pl-2{padding-left:calc(calc(var(--spacing)) * 2)}.tw\\:pl-3{padding-left:calc(calc(var(--spacing)) * 3)}.tw\\:pl-4{padding-left:calc(calc(var(--spacing)) * 4)}.tw\\:pl-5{padding-left:calc(calc(var(--spacing)) * 5)}.tw\\:pl-6{padding-left:calc(calc(var(--spacing)) * 6)}.tw\\:pl-8{padding-left:calc(calc(var(--spacing)) * 8)}.tw\\:text-center{text-align:center}.tw\\:text-end{text-align:end}.tw\\:text-left{text-align:left}.tw\\:text-right{text-align:right}.tw\\:text-start{text-align:start}.tw\\:align-middle{vertical-align:middle}.tw\\:font-heading{font-family:var(--font-sans)}.tw\\:font-mono{font-family:var(--tw-font-mono)}.tw\\:font-sans{font-family:IBM Plex Sans Variable,sans-serif}.tw\\:text-2xl{font-size:var(--tw-text-2xl);line-height:var(--tw-leading,var(--tw-text-2xl--line-height))}.tw\\:text-3xl{font-size:var(--tw-text-3xl);line-height:var(--tw-leading,var(--tw-text-3xl--line-height))}.tw\\:text-4xl{font-size:var(--tw-text-4xl);line-height:var(--tw-leading,var(--tw-text-4xl--line-height))}.tw\\:text-base{font-size:var(--tw-text-base);line-height:var(--tw-leading,var(--tw-text-base--line-height))}.tw\\:text-lg{font-size:var(--tw-text-lg);line-height:var(--tw-leading,var(--tw-text-lg--line-height))}.tw\\:text-sm{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:text-sm\\/relaxed{font-size:var(--tw-text-sm);line-height:var(--tw-leading-relaxed)}.tw\\:text-xl{font-size:var(--tw-text-xl);line-height:var(--tw-leading,var(--tw-text-xl--line-height))}.tw\\:text-xs{font-size:var(--tw-text-xs);line-height:var(--tw-leading,var(--tw-text-xs--line-height))}.tw\\:text-\\[0\\.8rem\\]{font-size:.8rem}.tw\\:leading-6{--tw-leading:calc(calc(var(--spacing)) * 6);line-height:calc(calc(var(--spacing)) * 6)}.tw\\:leading-loose{--tw-leading:var(--tw-leading-loose);line-height:var(--tw-leading-loose)}.tw\\:leading-none{--tw-leading:1;line-height:1}.tw\\:leading-relaxed{--tw-leading:var(--tw-leading-relaxed);line-height:var(--tw-leading-relaxed)}.tw\\:leading-snug{--tw-leading:var(--tw-leading-snug);line-height:var(--tw-leading-snug)}.tw\\:leading-tight{--tw-leading:var(--tw-leading-tight);line-height:var(--tw-leading-tight)}.tw\\:font-bold{--tw-font-weight:var(--tw-font-weight-bold);font-weight:var(--tw-font-weight-bold)}.tw\\:font-extrabold{--tw-font-weight:var(--tw-font-weight-extrabold);font-weight:var(--tw-font-weight-extrabold)}.tw\\:font-medium{--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}.tw\\:font-normal{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:font-semibold{--tw-font-weight:var(--tw-font-weight-semibold);font-weight:var(--tw-font-weight-semibold)}.tw\\:tracking-tight{--tw-tracking:var(--tw-tracking-tight);letter-spacing:var(--tw-tracking-tight)}.tw\\:tracking-wider{--tw-tracking:var(--tw-tracking-wider);letter-spacing:var(--tw-tracking-wider)}.tw\\:tracking-widest{--tw-tracking:var(--tw-tracking-widest);letter-spacing:var(--tw-tracking-widest)}.tw\\:text-balance{text-wrap:balance}.tw\\:text-nowrap{text-wrap:nowrap}.tw\\:break-words{overflow-wrap:break-word}.tw\\:text-clip{text-overflow:clip}.tw\\:text-ellipsis{text-overflow:ellipsis}.tw\\:whitespace-normal{white-space:normal}.tw\\:whitespace-nowrap{white-space:nowrap}.tw\\:whitespace-pre{white-space:pre}.tw\\:whitespace-pre-line{white-space:pre-line}.tw\\:whitespace-pre-wrap{white-space:pre-wrap}.tw\\:\\[color\\:blue\\]{color:#00f}.tw\\:text-accent-foreground{color:var(--accent-foreground)}.tw\\:text-amber-600{color:var(--tw-color-amber-600)}.tw\\:text-background{color:var(--background)}.tw\\:text-blue-400{color:var(--tw-color-blue-400)}.tw\\:text-blue-500{color:var(--tw-color-blue-500)}.tw\\:text-blue-600{color:var(--tw-color-blue-600)}.tw\\:text-blue-800{color:var(--tw-color-blue-800)}.tw\\:text-card-foreground{color:var(--card-foreground)}.tw\\:text-current{color:currentColor}.tw\\:text-destructive{color:var(--destructive)}.tw\\:text-foreground{color:var(--foreground)}.tw\\:text-foreground\\!{color:var(--foreground)!important}.tw\\:text-foreground\\/30{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/30{color:color-mix(in oklab, var(--foreground) 30%, transparent)}}.tw\\:text-foreground\\/50{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/50{color:color-mix(in oklab, var(--foreground) 50%, transparent)}}.tw\\:text-foreground\\/60{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/60{color:color-mix(in oklab, var(--foreground) 60%, transparent)}}.tw\\:text-foreground\\/70{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/70{color:color-mix(in oklab, var(--foreground) 70%, transparent)}}.tw\\:text-gray-300{color:var(--tw-color-gray-300)}.tw\\:text-gray-500{color:var(--tw-color-gray-500)}.tw\\:text-gray-600{color:var(--tw-color-gray-600)}.tw\\:text-gray-700{color:var(--tw-color-gray-700)}.tw\\:text-gray-800{color:var(--tw-color-gray-800)}.tw\\:text-green-600{color:var(--tw-color-green-600)}.tw\\:text-green-700{color:var(--tw-color-green-700)}.tw\\:text-green-800{color:var(--tw-color-green-800)}.tw\\:text-inherit{color:inherit}.tw\\:text-muted-foreground,.tw\\:text-muted-foreground\\/50{color:var(--muted-foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-muted-foreground\\/50{color:color-mix(in oklab, var(--muted-foreground) 50%, transparent)}}.tw\\:text-orange-800{color:var(--tw-color-orange-800)}.tw\\:text-popover-foreground{color:var(--popover-foreground)}.tw\\:text-primary{color:var(--primary)}.tw\\:text-primary-foreground{color:var(--primary-foreground)}.tw\\:text-purple-900{color:var(--tw-color-purple-900)}.tw\\:text-red-500{color:var(--tw-color-red-500)}.tw\\:text-red-600{color:var(--tw-color-red-600)}.tw\\:text-red-700{color:var(--tw-color-red-700)}.tw\\:text-red-800{color:var(--tw-color-red-800)}.tw\\:text-rose-600{color:var(--tw-color-rose-600)}.tw\\:text-secondary-foreground{color:var(--secondary-foreground)}.tw\\:text-sidebar-accent-foreground{color:var(--sidebar-accent-foreground)}.tw\\:text-sidebar-foreground,.tw\\:text-sidebar-foreground\\/70{color:var(--sidebar-foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-sidebar-foreground\\/70{color:color-mix(in oklab, var(--sidebar-foreground) 70%, transparent)}}.tw\\:text-sky-600{color:var(--tw-color-sky-600)}.tw\\:text-slate-900{color:var(--tw-color-slate-900)}.tw\\:text-teal-600{color:var(--tw-color-teal-600)}.tw\\:text-white{color:var(--tw-color-white)}.tw\\:text-yellow-400{color:var(--tw-color-yellow-400)}.tw\\:text-yellow-600{color:var(--tw-color-yellow-600)}.tw\\:text-yellow-700{color:var(--tw-color-yellow-700)}.tw\\:capitalize{text-transform:capitalize}.tw\\:uppercase{text-transform:uppercase}.tw\\:italic{font-style:italic}.tw\\:tabular-nums{--tw-numeric-spacing:tabular-nums;font-variant-numeric:var(--tw-ordinal,) var(--tw-slashed-zero,) var(--tw-numeric-figure,) var(--tw-numeric-spacing,) var(--tw-numeric-fraction,)}.tw\\:line-through{text-decoration-line:line-through}.tw\\:underline{text-decoration-line:underline}.tw\\:underline-offset-4{text-underline-offset:4px}.tw\\:opacity-0{opacity:0}.tw\\:opacity-40{opacity:.4}.tw\\:opacity-50{opacity:.5}.tw\\:opacity-60{opacity:.6}.tw\\:opacity-100{opacity:1}.tw\\:bg-blend-color{background-blend-mode:color}.tw\\:shadow{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-\\[0_0_0_1px_var\\(--sidebar-border\\)\\]{--tw-shadow:0 0 0 1px var(--tw-shadow-color,var(--sidebar-border));box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-lg{--tw-shadow:0 10px 15px -3px var(--tw-shadow-color,#0000001a), 0 4px 6px -4px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-md{--tw-shadow:0 4px 6px -1px var(--tw-shadow-color,#0000001a), 0 2px 4px -2px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-none{--tw-shadow:0 0 #0000;box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-none\\!{--tw-shadow:0 0 #0000!important;box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)!important}.tw\\:shadow-sm{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-xl{--tw-shadow:0 20px 25px -5px var(--tw-shadow-color,#0000001a), 0 8px 10px -6px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-0{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-1{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-2{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-background{--tw-ring-color:var(--background)}.tw\\:ring-foreground\\/10{--tw-ring-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:ring-foreground\\/10{--tw-ring-color:color-mix(in oklab, var(--foreground) 10%, transparent)}}.tw\\:ring-primary{--tw-ring-color:var(--primary)}.tw\\:ring-ring\\/50{--tw-ring-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.tw\\:ring-ring\\/50{--tw-ring-color:color-mix(in oklab, var(--ring) 50%, transparent)}}.tw\\:ring-sidebar-ring{--tw-ring-color:var(--sidebar-ring)}.tw\\:ring-offset-2{--tw-ring-offset-width:2px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}.tw\\:ring-offset-background{--tw-ring-offset-color:var(--background)}.tw\\:ring-offset-white{--tw-ring-offset-color:var(--tw-color-white)}.tw\\:outline-hidden{--tw-outline-style:none;outline-style:none}@media (forced-colors:active){.tw\\:outline-hidden{outline-offset:2px;outline:2px solid #0000}}.tw\\:drop-shadow-sm{--tw-drop-shadow-size:drop-shadow(0 1px 2px var(--tw-drop-shadow-color,#00000026));--tw-drop-shadow:drop-shadow(var(--tw-drop-shadow-sm));filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.tw\\:transition{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to,opacity,box-shadow,transform,translate,scale,rotate,filter,-webkit-backdrop-filter,backdrop-filter,display,content-visibility,overlay,pointer-events;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[color\\,box-shadow\\]{transition-property:color,box-shadow;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[left\\,right\\,width\\]{transition-property:left,right,width;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[margin\\,opacity\\]{transition-property:margin,opacity;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[width\\,height\\,padding\\]{transition-property:width,height,padding;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[width\\]{transition-property:width;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-all{transition-property:all;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-colors{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-opacity{transition-property:opacity;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-transform{transition-property:transform,translate,scale,rotate;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-none{transition-property:none}.tw\\:duration-100{--tw-duration:.1s;transition-duration:.1s}.tw\\:duration-200{--tw-duration:.2s;transition-duration:.2s}.tw\\:ease-linear{--tw-ease:linear;transition-timing-function:linear}.tw\\:prose-quoteless :where(blockquote p:first-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):before,.tw\\:prose-quoteless :where(blockquote p:last-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:none}.tw\\:outline-none{--tw-outline-style:none;outline-style:none}.tw\\:select-none{-webkit-user-select:none;user-select:none}.tw\\:\\[unicode-bidi\\:plaintext\\]{unicode-bidi:plaintext}.tw\\:group-focus-within\\/menu-item\\:opacity-100:is(:where(.tw\\:group\\/menu-item):focus-within *){opacity:1}@media (hover:hover){.tw\\:group-hover\\:visible:is(:where(.tw\\:group):hover *){visibility:visible}.tw\\:group-hover\\:hidden:is(:where(.tw\\:group):hover *){display:none}.tw\\:group-hover\\:opacity-100:is(:where(.tw\\:group):hover *),.tw\\:group-hover\\/menu-item\\:opacity-100:is(:where(.tw\\:group\\/menu-item):hover *){opacity:1}}.tw\\:group-focus\\/context-menu-item\\:text-accent-foreground:is(:where(.tw\\:group\\/context-menu-item):focus *),.tw\\:group-focus\\/dropdown-menu-item\\:text-accent-foreground:is(:where(.tw\\:group\\/dropdown-menu-item):focus *),.tw\\:group-focus\\/menubar-item\\:text-accent-foreground:is(:where(.tw\\:group\\/menubar-item):focus *){color:var(--accent-foreground)}.tw\\:group-has-disabled\\/field\\:opacity-50:is(:where(.tw\\:group\\/field):has(:disabled) *){opacity:.5}.tw\\:group-has-data-\\[sidebar\\=menu-action\\]\\/menu-item\\:pe-8:is(:where(.tw\\:group\\/menu-item):has([data-sidebar=menu-action]) *){padding-inline-end:calc(calc(var(--spacing)) * 8)}.tw\\:group-has-data-\\[size\\=lg\\]\\/avatar-group\\:size-10:is(:where(.tw\\:group\\/avatar-group):has([data-size=lg]) *){width:calc(calc(var(--spacing)) * 10);height:calc(calc(var(--spacing)) * 10)}.tw\\:group-has-data-\\[size\\=sm\\]\\/avatar-group\\:size-6:is(:where(.tw\\:group\\/avatar-group):has([data-size=sm]) *){width:calc(calc(var(--spacing)) * 6);height:calc(calc(var(--spacing)) * 6)}.tw\\:group-has-data-\\[slot\\=command-shortcut\\]\\/command-item\\:hidden:is(:where(.tw\\:group\\/command-item):has([data-slot=command-shortcut]) *){display:none}.tw\\:group-has-\\[\\>input\\]\\/input-group\\:pt-2:is(:where(.tw\\:group\\/input-group):has(>input) *){padding-top:calc(calc(var(--spacing)) * 2)}.tw\\:group-has-\\[\\>input\\]\\/input-group\\:pb-2:is(:where(.tw\\:group\\/input-group):has(>input) *){padding-bottom:calc(calc(var(--spacing)) * 2)}.tw\\:group-has-\\[\\>svg\\]\\/alert\\:col-start-2:is(:where(.tw\\:group\\/alert):has(>svg) *){grid-column-start:2}.tw\\:group-data-\\[checked\\=true\\]\\/command-item\\:opacity-100:is(:where(.tw\\:group\\/command-item)[data-checked=true] *){opacity:1}.tw\\:group-data-\\[collapsible\\=icon\\]\\:-mt-8:is(:where(.tw\\:group)[data-collapsible=icon] *){margin-top:calc(calc(var(--spacing)) * -8)}.tw\\:group-data-\\[collapsible\\=icon\\]\\:hidden:is(:where(.tw\\:group)[data-collapsible=icon] *){display:none}.tw\\:group-data-\\[collapsible\\=icon\\]\\:size-8\\!:is(:where(.tw\\:group)[data-collapsible=icon] *){width:calc(calc(var(--spacing)) * 8)!important;height:calc(calc(var(--spacing)) * 8)!important}.tw\\:group-data-\\[collapsible\\=icon\\]\\:w-\\(--sidebar-width-icon\\):is(:where(.tw\\:group)[data-collapsible=icon] *){width:var(--sidebar-width-icon)}.tw\\:group-data-\\[collapsible\\=icon\\]\\:w-\\[calc\\(var\\(--sidebar-width-icon\\)\\+\\(--spacing\\(4\\)\\)\\)\\]:is(:where(.tw\\:group)[data-collapsible=icon] *){width:calc(var(--sidebar-width-icon) + (calc(calc(var(--spacing)) * 4)))}.tw\\:group-data-\\[collapsible\\=icon\\]\\:w-\\[calc\\(var\\(--sidebar-width-icon\\)\\+\\(--spacing\\(4\\)\\)\\+2px\\)\\]:is(:where(.tw\\:group)[data-collapsible=icon] *){width:calc(var(--sidebar-width-icon) + (calc(calc(var(--spacing)) * 4)) + 2px)}.tw\\:group-data-\\[collapsible\\=icon\\]\\:overflow-hidden:is(:where(.tw\\:group)[data-collapsible=icon] *){overflow:hidden}.tw\\:group-data-\\[collapsible\\=icon\\]\\:p-0\\!:is(:where(.tw\\:group)[data-collapsible=icon] *){padding:calc(calc(var(--spacing)) * 0)!important}.tw\\:group-data-\\[collapsible\\=icon\\]\\:p-2\\!:is(:where(.tw\\:group)[data-collapsible=icon] *){padding:calc(calc(var(--spacing)) * 2)!important}.tw\\:group-data-\\[collapsible\\=icon\\]\\:opacity-0:is(:where(.tw\\:group)[data-collapsible=icon] *){opacity:0}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:right-\\[calc\\(var\\(--sidebar-width\\)\\*-1\\)\\]:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){right:calc(var(--sidebar-width) * -1)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:left-\\[calc\\(var\\(--sidebar-width\\)\\*-1\\)\\]:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){left:calc(var(--sidebar-width) * -1)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:w-0:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){width:calc(calc(var(--spacing)) * 0)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:translate-x-0:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){--tw-translate-x:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:group-data-\\[disabled\\=true\\]\\:pointer-events-none:is(:where(.tw\\:group)[data-disabled=true] *){pointer-events:none}.tw\\:group-data-\\[disabled\\=true\\]\\:opacity-50:is(:where(.tw\\:group)[data-disabled=true] *),.tw\\:group-data-\\[disabled\\=true\\]\\/input-group\\:opacity-50:is(:where(.tw\\:group\\/input-group)[data-disabled=true] *){opacity:.5}.tw\\:group-data-\\[side\\=primary\\]\\:-right-4:is(:where(.tw\\:group)[data-side=primary] *){right:calc(calc(var(--spacing)) * -4)}.tw\\:group-data-\\[side\\=primary\\]\\:border-e:is(:where(.tw\\:group)[data-side=primary] *){border-inline-end-style:var(--tw-border-style);border-inline-end-width:1px}.tw\\:group-data-\\[side\\=secondary\\]\\:left-0:is(:where(.tw\\:group)[data-side=secondary] *){left:calc(calc(var(--spacing)) * 0)}.tw\\:group-data-\\[side\\=secondary\\]\\:rotate-180:is(:where(.tw\\:group)[data-side=secondary] *){rotate:180deg}.tw\\:group-data-\\[side\\=secondary\\]\\:border-s:is(:where(.tw\\:group)[data-side=secondary] *){border-inline-start-style:var(--tw-border-style);border-inline-start-width:1px}.tw\\:group-data-\\[size\\=default\\]\\/avatar\\:size-2\\.5:is(:where(.tw\\:group\\/avatar)[data-size=default] *){width:calc(calc(var(--spacing)) * 2.5);height:calc(calc(var(--spacing)) * 2.5)}.tw\\:group-data-\\[size\\=default\\]\\/switch\\:size-4:is(:where(.tw\\:group\\/switch)[data-size=default] *){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[size\\=lg\\]\\/avatar\\:size-3:is(:where(.tw\\:group\\/avatar)[data-size=lg] *){width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[size\\=sm\\]\\/avatar\\:size-2:is(:where(.tw\\:group\\/avatar)[data-size=sm] *){width:calc(calc(var(--spacing)) * 2);height:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[size\\=sm\\]\\/avatar\\:text-xs:is(:where(.tw\\:group\\/avatar)[data-size=sm] *){font-size:var(--tw-text-xs);line-height:var(--tw-leading,var(--tw-text-xs--line-height))}.tw\\:group-data-\\[size\\=sm\\]\\/card\\:p-3:is(:where(.tw\\:group\\/card)[data-size=sm] *){padding:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[size\\=sm\\]\\/card\\:px-3:is(:where(.tw\\:group\\/card)[data-size=sm] *){padding-inline:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[size\\=sm\\]\\/card\\:text-sm:is(:where(.tw\\:group\\/card)[data-size=sm] *){font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:size-3:is(:where(.tw\\:group\\/switch)[data-size=sm] *){width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[spacing\\=0\\]\\/toggle-group\\:rounded-none:is(:where(.tw\\:group\\/toggle-group)[data-spacing="0"] *){border-radius:0}.tw\\:group-data-\\[spacing\\=0\\]\\/toggle-group\\:px-2:is(:where(.tw\\:group\\/toggle-group)[data-spacing="0"] *){padding-inline:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[variant\\=floating\\]\\:rounded-lg:is(:where(.tw\\:group)[data-variant=floating] *){border-radius:var(--radius)}.tw\\:group-data-\\[variant\\=floating\\]\\:shadow-sm:is(:where(.tw\\:group)[data-variant=floating] *){--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:group-data-\\[variant\\=floating\\]\\:ring-1:is(:where(.tw\\:group)[data-variant=floating] *){--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:group-data-\\[variant\\=floating\\]\\:ring-sidebar-border:is(:where(.tw\\:group)[data-variant=floating] *){--tw-ring-color:var(--sidebar-border)}.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:bg-transparent:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *){background-color:#0000}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:mx-auto:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){margin-inline:auto}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:mt-4:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){margin-top:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:block:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){display:block}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:h-1\\.5:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){height:calc(calc(var(--spacing)) * 1.5)}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:w-\\[100px\\]:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){width:100px}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:text-center:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){text-align:center}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:my-auto:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){margin-block:auto}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:me-4:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){margin-inline-end:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:block:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){display:block}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:h-\\[100px\\]:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){height:100px}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:w-1\\.5:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){width:calc(calc(var(--spacing)) * 1.5)}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:my-auto:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){margin-block:auto}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:ms-4:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){margin-inline-start:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:block:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){display:block}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:h-\\[100px\\]:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){height:100px}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:w-1\\.5:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){width:calc(calc(var(--spacing)) * 1.5)}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:mx-auto:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){margin-inline:auto}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:mb-4:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){margin-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:block:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){display:block}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:h-1\\.5:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){height:calc(calc(var(--spacing)) * 1.5)}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:w-\\[100px\\]:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){width:100px}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:text-center:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){text-align:center}.tw\\:group-data-selected\\/command-item\\:text-foreground:is(:where(.tw\\:group\\/command-item):where([data-selected=true]) *){color:var(--foreground)}.tw\\:group-data-horizontal\\/tabs\\:h-8:is(:where(.tw\\:group\\/tabs):where([data-orientation=horizontal]) *){height:calc(calc(var(--spacing)) * 8)}.tw\\:group-data-vertical\\/tabs\\:h-fit:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *){height:fit-content}.tw\\:group-data-vertical\\/tabs\\:w-full:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *){width:100%}.tw\\:group-data-vertical\\/tabs\\:flex-col:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *){flex-direction:column}.tw\\:group-data-vertical\\/tabs\\:justify-start:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *){justify-content:flex-start}@media (hover:hover){.tw\\:peer-hover\\/menu-button\\:text-sidebar-accent-foreground:is(:where(.tw\\:peer\\/menu-button):hover~*){color:var(--sidebar-accent-foreground)}.tw\\:peer-focus\\:group-hover\\:text-blue-500:is(:where(.tw\\:peer):focus~*):is(:where(.tw\\:group):hover *){color:var(--tw-color-blue-500)}}.tw\\:peer-disabled\\:cursor-not-allowed:is(:where(.tw\\:peer):disabled~*){cursor:not-allowed}.tw\\:peer-disabled\\:opacity-50:is(:where(.tw\\:peer):disabled~*){opacity:.5}.tw\\:peer-data-\\[size\\=default\\]\\/menu-button\\:top-1\\.5:is(:where(.tw\\:peer\\/menu-button)[data-size=default]~*){top:calc(calc(var(--spacing)) * 1.5)}.tw\\:peer-data-\\[size\\=lg\\]\\/menu-button\\:top-2\\.5:is(:where(.tw\\:peer\\/menu-button)[data-size=lg]~*){top:calc(calc(var(--spacing)) * 2.5)}.tw\\:peer-data-\\[size\\=sm\\]\\/menu-button\\:top-1:is(:where(.tw\\:peer\\/menu-button)[data-size=sm]~*){top:calc(calc(var(--spacing)) * 1)}.tw\\:peer-data-active\\/menu-button\\:text-sidebar-accent-foreground:is(:is(:where(.tw\\:peer\\/menu-button):where([data-state=active]),:where(.tw\\:peer\\/menu-button):where([data-active]:not([data-active=false])))~*){color:var(--sidebar-accent-foreground)}.tw\\:file\\:inline-flex::file-selector-button{display:inline-flex}.tw\\:file\\:h-6::file-selector-button{height:calc(calc(var(--spacing)) * 6)}.tw\\:file\\:border-0::file-selector-button{border-style:var(--tw-border-style);border-width:0}.tw\\:file\\:bg-transparent::file-selector-button{background-color:#0000}.tw\\:file\\:text-sm::file-selector-button{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:file\\:font-medium::file-selector-button{--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}.tw\\:file\\:text-foreground::file-selector-button{color:var(--foreground)}.tw\\:placeholder\\:text-muted-foreground::placeholder{color:var(--muted-foreground)}.tw\\:placeholder\\:text-slate-400::placeholder{color:var(--tw-color-slate-400)}.tw\\:before\\:absolute:before{content:var(--tw-content);position:absolute}.tw\\:before\\:top-0\\.5:before{content:var(--tw-content);top:calc(calc(var(--spacing)) * .5)}.tw\\:before\\:left-0:before{content:var(--tw-content);left:calc(calc(var(--spacing)) * 0)}.tw\\:before\\:block:before{content:var(--tw-content);display:block}.tw\\:before\\:hidden:before{content:var(--tw-content);display:none}.tw\\:before\\:h-4:before{content:var(--tw-content);height:calc(calc(var(--spacing)) * 4)}.tw\\:before\\:w-4:before{content:var(--tw-content);width:calc(calc(var(--spacing)) * 4)}.tw\\:before\\:cursor-pointer:before{content:var(--tw-content);cursor:pointer}.tw\\:before\\:rounded:before{content:var(--tw-content);border-radius:.25rem}.tw\\:before\\:border:before{content:var(--tw-content);border-style:var(--tw-border-style);border-width:1px}.tw\\:before\\:border-primary:before{content:var(--tw-content);border-color:var(--primary)}.tw\\:before\\:bg-primary:before{content:var(--tw-content);background-color:var(--primary)}.tw\\:before\\:bg-cover:before{content:var(--tw-content);background-size:cover}.tw\\:before\\:bg-no-repeat:before{content:var(--tw-content);background-repeat:no-repeat}.tw\\:before\\:content-\\[\\"\\"\\]:before{--tw-content:"";content:var(--tw-content)}.tw\\:before\\:content-\\[\\\\\\"\\\\\\"\\]:before{--tw-content:\\"\\";content:var(--tw-content)}.tw\\:after\\:absolute:after{content:var(--tw-content);position:absolute}.tw\\:after\\:-inset-2:after{content:var(--tw-content);inset:calc(calc(var(--spacing)) * -2)}.tw\\:after\\:inset-0:after{content:var(--tw-content);inset:calc(calc(var(--spacing)) * 0)}.tw\\:after\\:-inset-x-3:after{content:var(--tw-content);inset-inline:calc(calc(var(--spacing)) * -3)}.tw\\:after\\:-inset-y-2:after{content:var(--tw-content);inset-block:calc(calc(var(--spacing)) * -2)}.tw\\:after\\:inset-y-0:after{content:var(--tw-content);inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:after\\:start-1\\/2:after{content:var(--tw-content);inset-inline-start:50%}.tw\\:after\\:top-\\[6px\\]:after{content:var(--tw-content);top:6px}.tw\\:after\\:right-\\[7px\\]:after{content:var(--tw-content);right:7px}.tw\\:after\\:left-\\[7px\\]:after{content:var(--tw-content);left:7px}.tw\\:after\\:block:after{content:var(--tw-content);display:block}.tw\\:after\\:hidden:after{content:var(--tw-content);display:none}.tw\\:after\\:h-0\\.5:after{content:var(--tw-content);height:calc(calc(var(--spacing)) * .5)}.tw\\:after\\:h-\\[6px\\]:after{content:var(--tw-content);height:6px}.tw\\:after\\:w-1:after{content:var(--tw-content);width:calc(calc(var(--spacing)) * 1)}.tw\\:after\\:w-\\[2px\\]:after{content:var(--tw-content);width:2px}.tw\\:after\\:w-\\[3px\\]:after{content:var(--tw-content);width:3px}.tw\\:after\\:-translate-x-1\\/2:after{content:var(--tw-content);--tw-translate-x:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:after\\:rotate-45:after{content:var(--tw-content);rotate:45deg}.tw\\:after\\:cursor-pointer:after{content:var(--tw-content);cursor:pointer}.tw\\:after\\:rounded-full:after{content:var(--tw-content);border-radius:3.40282e38px}.tw\\:after\\:border:after{content:var(--tw-content);border-style:var(--tw-border-style);border-width:1px}.tw\\:after\\:border-t-0:after{content:var(--tw-content);border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:after\\:border-r-2:after{content:var(--tw-content);border-right-style:var(--tw-border-style);border-right-width:2px}.tw\\:after\\:border-b-2:after{content:var(--tw-content);border-bottom-style:var(--tw-border-style);border-bottom-width:2px}.tw\\:after\\:border-l-0:after{content:var(--tw-content);border-left-style:var(--tw-border-style);border-left-width:0}.tw\\:after\\:border-solid:after{content:var(--tw-content);--tw-border-style:solid;border-style:solid}.tw\\:after\\:border-border:after{content:var(--tw-content);border-color:var(--border)}.tw\\:after\\:border-white:after{content:var(--tw-content);border-color:var(--tw-color-white)}.tw\\:after\\:bg-foreground:after{content:var(--tw-content);background-color:var(--foreground)}.tw\\:after\\:bg-muted:after{content:var(--tw-content);background-color:var(--muted)}.tw\\:after\\:opacity-0:after{content:var(--tw-content);opacity:0}.tw\\:after\\:mix-blend-darken:after{content:var(--tw-content);mix-blend-mode:darken}.tw\\:after\\:transition-opacity:after{content:var(--tw-content);transition-property:opacity;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:after\\:content-\\[\\"\\"\\]:after{--tw-content:"";content:var(--tw-content)}.tw\\:after\\:content-\\[\\\\\\"\\\\\\"\\]:after{--tw-content:\\"\\";content:var(--tw-content)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:after\\:start-full:is(:where(.tw\\:group)[data-collapsible=offcanvas] *):after{content:var(--tw-content);inset-inline-start:100%}.tw\\:group-data-horizontal\\/tabs\\:after\\:inset-x-0:is(:where(.tw\\:group\\/tabs):where([data-orientation=horizontal]) *):after{content:var(--tw-content);inset-inline:calc(calc(var(--spacing)) * 0)}.tw\\:group-data-horizontal\\/tabs\\:after\\:bottom-\\[-5px\\]:is(:where(.tw\\:group\\/tabs):where([data-orientation=horizontal]) *):after{content:var(--tw-content);bottom:-5px}.tw\\:group-data-horizontal\\/tabs\\:after\\:h-0\\.5:is(:where(.tw\\:group\\/tabs):where([data-orientation=horizontal]) *):after{content:var(--tw-content);height:calc(calc(var(--spacing)) * .5)}.tw\\:group-data-vertical\\/tabs\\:after\\:inset-y-0:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *):after{content:var(--tw-content);inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:group-data-vertical\\/tabs\\:after\\:-end-1:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *):after{content:var(--tw-content);inset-inline-end:calc(calc(var(--spacing)) * -1)}.tw\\:group-data-vertical\\/tabs\\:after\\:w-0\\.5:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *):after{content:var(--tw-content);width:calc(calc(var(--spacing)) * .5)}.tw\\:first\\:mt-0:first-child{margin-top:calc(calc(var(--spacing)) * 0)}.tw\\:last\\:border-b-0:last-child{border-bottom-style:var(--tw-border-style);border-bottom-width:0}.tw\\:even\\:bg-muted:nth-child(2n){background-color:var(--muted)}.tw\\:focus-within\\:ring-2:focus-within{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-within\\:ring-ring:focus-within{--tw-ring-color:var(--ring)}.tw\\:focus-within\\:ring-offset-1:focus-within{--tw-ring-offset-width:1px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}@media (hover:hover){.tw\\:hover\\:-mt-4:hover{margin-top:calc(calc(var(--spacing)) * -4)}.tw\\:hover\\:cursor-pointer:hover{cursor:pointer}.tw\\:hover\\:bg-accent:hover,.tw\\:hover\\:bg-accent\\/30:hover{background-color:var(--accent)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-accent\\/30:hover{background-color:color-mix(in oklab, var(--accent) 30%, transparent)}}.tw\\:hover\\:bg-accent\\/80:hover{background-color:var(--accent)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-accent\\/80:hover{background-color:color-mix(in oklab, var(--accent) 80%, transparent)}}.tw\\:hover\\:bg-blue-600:hover{background-color:var(--tw-color-blue-600)}.tw\\:hover\\:bg-destructive\\/20:hover{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-destructive\\/20:hover{background-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:hover\\:bg-gray-50:hover{background-color:var(--tw-color-gray-50)}.tw\\:hover\\:bg-input:hover{background-color:var(--input)}.tw\\:hover\\:bg-muted:hover,.tw\\:hover\\:bg-muted\\/50:hover{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-muted\\/50:hover{background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:hover\\:bg-muted\\/80:hover{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-muted\\/80:hover{background-color:color-mix(in oklab, var(--muted) 80%, transparent)}}.tw\\:hover\\:bg-primary\\/10:hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-primary\\/10:hover{background-color:color-mix(in oklab, var(--primary) 10%, transparent)}}.tw\\:hover\\:bg-primary\\/70:hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-primary\\/70:hover{background-color:color-mix(in oklab, var(--primary) 70%, transparent)}}.tw\\:hover\\:bg-primary\\/90:hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-primary\\/90:hover{background-color:color-mix(in oklab, var(--primary) 90%, transparent)}}.tw\\:hover\\:bg-red-500:hover{background-color:var(--tw-color-red-500)}.tw\\:hover\\:bg-secondary:hover,.tw\\:hover\\:bg-secondary\\/80:hover{background-color:var(--secondary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-secondary\\/80:hover{background-color:color-mix(in oklab, var(--secondary) 80%, transparent)}}.tw\\:hover\\:bg-sidebar-accent:hover{background-color:var(--sidebar-accent)}.tw\\:hover\\:bg-transparent:hover{background-color:#0000}.tw\\:hover\\:text-foreground:hover{color:var(--foreground)}.tw\\:hover\\:text-muted-foreground:hover{color:var(--muted-foreground)}.tw\\:hover\\:text-primary-foreground:hover{color:var(--primary-foreground)}.tw\\:hover\\:text-sidebar-accent-foreground:hover{color:var(--sidebar-accent-foreground)}.tw\\:hover\\:underline:hover{text-decoration-line:underline}.tw\\:hover\\:opacity-80:hover{opacity:.8}.tw\\:hover\\:opacity-100:hover{opacity:1}.tw\\:hover\\:shadow-\\[0_0_0_1px_var\\(--sidebar-accent\\)\\]:hover{--tw-shadow:0 0 0 1px var(--tw-shadow-color,var(--sidebar-accent));box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:hover\\:shadow-md:hover{--tw-shadow:0 4px 6px -1px var(--tw-shadow-color,#0000001a), 0 2px 4px -2px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:hover\\:ring-3:hover{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:hover\\:group-data-\\[collapsible\\=offcanvas\\]\\:bg-sidebar:hover:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){background-color:var(--sidebar)}.tw\\:hover\\:after\\:bg-sidebar-border:hover:after{content:var(--tw-content);background-color:var(--sidebar-border)}}.tw\\:focus\\:relative:focus{position:relative}.tw\\:focus\\:z-10:focus{z-index:10}.tw\\:focus\\:bg-accent:focus{background-color:var(--accent)}.tw\\:focus\\:bg-muted:focus{background-color:var(--muted)}.tw\\:focus\\:text-accent-foreground:focus{color:var(--accent-foreground)}.tw\\:focus\\:text-foreground:focus{color:var(--foreground)}.tw\\:focus\\:ring-2:focus{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus\\:ring-ring:focus{--tw-ring-color:var(--ring)}.tw\\:focus\\:ring-offset-1:focus{--tw-ring-offset-width:1px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}.tw\\:focus\\:ring-offset-background:focus{--tw-ring-offset-color:var(--background)}.tw\\:focus\\:outline-hidden:focus{--tw-outline-style:none;outline-style:none}@media (forced-colors:active){.tw\\:focus\\:outline-hidden:focus{outline-offset:2px;outline:2px solid #0000}}:is(.tw\\:focus\\:\\*\\*\\:text-accent-foreground:focus *),:is(.tw\\:not-data-\\[variant\\=destructive\\]\\:focus\\:\\*\\*\\:text-accent-foreground:not([data-variant=destructive]):focus *){color:var(--accent-foreground)}.tw\\:focus-visible\\:z-10:focus-visible{z-index:10}.tw\\:focus-visible\\:border-destructive\\/40:focus-visible{border-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:focus-visible\\:border-destructive\\/40:focus-visible{border-color:color-mix(in oklab, var(--destructive) 40%, transparent)}}.tw\\:focus-visible\\:border-ring:focus-visible{border-color:var(--ring)}.tw\\:focus-visible\\:ring-0:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-visible\\:ring-1:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-visible\\:ring-2:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-visible\\:ring-3:focus-visible,.tw\\:focus-visible\\:ring-\\[3px\\]:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-visible\\:ring-\\[color\\:hsl\\(240\\,5\\%\\,64\\.9\\%\\)\\]:focus-visible{--tw-ring-color:#a1a1aa}.tw\\:focus-visible\\:ring-destructive\\/20:focus-visible{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:focus-visible\\:ring-destructive\\/20:focus-visible{--tw-ring-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:focus-visible\\:ring-ring:focus-visible,.tw\\:focus-visible\\:ring-ring\\/50:focus-visible{--tw-ring-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.tw\\:focus-visible\\:ring-ring\\/50:focus-visible{--tw-ring-color:color-mix(in oklab, var(--ring) 50%, transparent)}}.tw\\:focus-visible\\:ring-slate-400:focus-visible{--tw-ring-color:var(--tw-color-slate-400)}.tw\\:focus-visible\\:ring-offset-2:focus-visible{--tw-ring-offset-width:2px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}.tw\\:focus-visible\\:outline-hidden:focus-visible{--tw-outline-style:none;outline-style:none}@media (forced-colors:active){.tw\\:focus-visible\\:outline-hidden:focus-visible{outline-offset:2px;outline:2px solid #0000}}.tw\\:focus-visible\\:outline-1:focus-visible{outline-style:var(--tw-outline-style);outline-width:1px}.tw\\:focus-visible\\:outline-ring:focus-visible{outline-color:var(--ring)}.tw\\:focus-visible\\:outline-none:focus-visible{--tw-outline-style:none;outline-style:none}.tw\\:focus-visible\\:ring-inset:focus-visible{--tw-ring-inset:inset}:is(.tw\\:\\*\\:focus-visible\\:relative>*):focus-visible{position:relative}:is(.tw\\:\\*\\:focus-visible\\:z-10>*):focus-visible{z-index:10}.tw\\:active\\:bg-sidebar-accent:active{background-color:var(--sidebar-accent)}.tw\\:active\\:text-sidebar-accent-foreground:active{color:var(--sidebar-accent-foreground)}.tw\\:active\\:ring-3:active{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:active\\:not-aria-\\[haspopup\\]\\:translate-y-px:active:not([aria-haspopup]){--tw-translate-y:1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:active\\:not-aria-\\[haspopup\\]\\:transform-\\[translateY\\(1px\\)\\]:active:not([aria-haspopup]){transform:translateY(1px)}.tw\\:disabled\\:pointer-events-none:disabled{pointer-events:none}.tw\\:disabled\\:cursor-not-allowed:disabled{cursor:not-allowed}.tw\\:disabled\\:bg-input\\/50:disabled{background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:disabled\\:bg-input\\/50:disabled{background-color:color-mix(in oklab, var(--input) 50%, transparent)}}.tw\\:disabled\\:bg-transparent:disabled{background-color:#0000}.tw\\:disabled\\:opacity-50:disabled{opacity:.5}:where([data-side=bottom]) .tw\\:in-data-\\[side\\=bottom\\]\\:translate-y-\\[calc\\(-50\\%-1px\\)\\]{--tw-translate-y:calc(-50% - 1px);translate:var(--tw-translate-x) var(--tw-translate-y)}:where([data-side=bottom]) .tw\\:in-data-\\[side\\=bottom\\]\\:\\[clip-path\\:polygon\\(100\\%_0\\,100\\%_100\\%\\,0_100\\%\\)\\]{clip-path:polygon(100% 0,100% 100%,0 100%)}:where([data-side=primary]) .tw\\:in-data-\\[side\\=primary\\]\\:cursor-w-resize{cursor:w-resize}:where([data-side=secondary]) .tw\\:in-data-\\[side\\=secondary\\]\\:cursor-e-resize{cursor:e-resize}:where([data-side=top]) .tw\\:in-data-\\[side\\=top\\]\\:translate-y-\\[calc\\(-50\\%-1px\\)\\]{--tw-translate-y:calc(-50% - 1px);translate:var(--tw-translate-x) var(--tw-translate-y)}:where([data-side=top]) .tw\\:in-data-\\[side\\=top\\]\\:\\[clip-path\\:polygon\\(100\\%_0\\,100\\%_100\\%\\,0_100\\%\\)\\]{clip-path:polygon(100% 0,100% 100%,0 100%)}:where([data-slot=button-group]) .tw\\:in-data-\\[slot\\=button-group\\]\\:rounded-lg{border-radius:var(--radius)}:where([data-slot=combobox-content]) .tw\\:in-data-\\[slot\\=combobox-content\\]\\:focus-within\\:border-inherit:focus-within{border-color:inherit}:where([data-slot=combobox-content]) .tw\\:in-data-\\[slot\\=combobox-content\\]\\:focus-within\\:ring-0:focus-within{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}:where([data-slot=dialog-content]) .tw\\:in-data-\\[slot\\=dialog-content\\]\\:rounded-lg\\!{border-radius:var(--radius)!important}:where([data-slot=tooltip-content]) .tw\\:in-data-\\[slot\\=tooltip-content\\]\\:bg-background\\/20{background-color:var(--background)}@supports (color:color-mix(in lab, red, red)){:where([data-slot=tooltip-content]) .tw\\:in-data-\\[slot\\=tooltip-content\\]\\:bg-background\\/20{background-color:color-mix(in oklab, var(--background) 20%, transparent)}}:where([data-slot=tooltip-content]) .tw\\:in-data-\\[slot\\=tooltip-content\\]\\:text-background{color:var(--background)}:where([data-slot=tooltip-content]) .tw\\:in-data-\\[slot\\=tooltip-content\\]\\:text-destructive{color:var(--destructive)}.tw\\:has-disabled\\:bg-input\\/50:has(:disabled){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:has-disabled\\:bg-input\\/50:has(:disabled){background-color:color-mix(in oklab, var(--input) 50%, transparent)}}.tw\\:has-disabled\\:opacity-50:has(:disabled){opacity:.5}.tw\\:has-aria-expanded\\:bg-muted\\/50:has([aria-expanded=true]){background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:has-aria-expanded\\:bg-muted\\/50:has([aria-expanded=true]){background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:has-data-\\[icon\\=inline-end\\]\\:pe-1:has([data-icon=inline-end]){padding-inline-end:calc(calc(var(--spacing)) * 1)}.tw\\:has-data-\\[icon\\=inline-end\\]\\:pe-1\\.5:has([data-icon=inline-end]){padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[icon\\=inline-end\\]\\:pe-2:has([data-icon=inline-end]){padding-inline-end:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[spacing\\=0\\]\\/toggle-group\\:has-data-\\[icon\\=inline-end\\]\\:pe-1\\.5:is(:where(.tw\\:group\\/toggle-group)[data-spacing="0"] *):has([data-icon=inline-end]){padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[icon\\=inline-start\\]\\:ps-1:has([data-icon=inline-start]){padding-inline-start:calc(calc(var(--spacing)) * 1)}.tw\\:has-data-\\[icon\\=inline-start\\]\\:ps-1\\.5:has([data-icon=inline-start]){padding-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[icon\\=inline-start\\]\\:ps-2:has([data-icon=inline-start]){padding-inline-start:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[spacing\\=0\\]\\/toggle-group\\:has-data-\\[icon\\=inline-start\\]\\:ps-1\\.5:is(:where(.tw\\:group\\/toggle-group)[data-spacing="0"] *):has([data-icon=inline-start]){padding-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[slot\\=alert-action\\]\\:relative:has([data-slot=alert-action]){position:relative}.tw\\:has-data-\\[slot\\=alert-action\\]\\:pe-18:has([data-slot=alert-action]){padding-inline-end:calc(calc(var(--spacing)) * 18)}.tw\\:has-data-\\[slot\\=card-action\\]\\:grid-cols-\\[1fr_auto\\]:has([data-slot=card-action]){grid-template-columns:1fr auto}.tw\\:has-data-\\[slot\\=card-description\\]\\:grid-rows-\\[auto_auto\\]:has([data-slot=card-description]){grid-template-rows:auto auto}.tw\\:has-data-\\[slot\\=card-footer\\]\\:pb-0:has([data-slot=card-footer]){padding-bottom:calc(calc(var(--spacing)) * 0)}.tw\\:has-data-\\[slot\\=kbd\\]\\:pe-0:has([data-slot=kbd]){padding-inline-end:calc(calc(var(--spacing)) * 0)}.tw\\:has-data-\\[slot\\=kbd\\]\\:pe-1\\.5:has([data-slot=kbd]){padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[variant\\=inset\\]\\:bg-sidebar:has([data-variant=inset]){background-color:var(--sidebar)}.tw\\:has-\\[\\[data-slot\\=input-group-control\\]\\:focus-visible\\]\\:border-ring:has([data-slot=input-group-control]:focus-visible){border-color:var(--ring)}.tw\\:has-\\[\\[data-slot\\=input-group-control\\]\\:focus-visible\\]\\:ring-3:has([data-slot=input-group-control]:focus-visible){--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:has-\\[\\[data-slot\\=input-group-control\\]\\:focus-visible\\]\\:ring-ring\\/50:has([data-slot=input-group-control]:focus-visible){--tw-ring-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.tw\\:has-\\[\\[data-slot\\=input-group-control\\]\\:focus-visible\\]\\:ring-ring\\/50:has([data-slot=input-group-control]:focus-visible){--tw-ring-color:color-mix(in oklab, var(--ring) 50%, transparent)}}.tw\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:border-destructive:has([data-slot][aria-invalid=true]){border-color:var(--destructive)}.tw\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-3:has([data-slot][aria-invalid=true]){--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-destructive\\/20:has([data-slot][aria-invalid=true]){--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-destructive\\/20:has([data-slot][aria-invalid=true]){--tw-ring-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:has-\\[\\>\\[data-align\\=block-end\\]\\]\\:h-auto:has(>[data-align=block-end]){height:auto}.tw\\:has-\\[\\>\\[data-align\\=block-end\\]\\]\\:flex-col:has(>[data-align=block-end]){flex-direction:column}.tw\\:has-\\[\\>\\[data-align\\=block-start\\]\\]\\:h-auto:has(>[data-align=block-start]){height:auto}.tw\\:has-\\[\\>\\[data-align\\=block-start\\]\\]\\:flex-col:has(>[data-align=block-start]){flex-direction:column}.tw\\:has-\\[\\>\\[data-slot\\=button-group\\]\\]\\:gap-2:has(>[data-slot=button-group]){gap:calc(calc(var(--spacing)) * 2)}.tw\\:has-\\[\\>button\\]\\:ms-\\[-0\\.3rem\\]:has(>button){margin-inline-start:-.3rem}.tw\\:has-\\[\\>button\\]\\:me-\\[-0\\.3rem\\]:has(>button){margin-inline-end:-.3rem}.tw\\:has-\\[\\>img\\]\\:grid-cols-\\[auto_1fr\\]:has(>img){grid-template-columns:auto 1fr}.tw\\:has-\\[\\>img\\]\\:gap-x-2:has(>img){column-gap:calc(calc(var(--spacing)) * 2)}.tw\\:has-\\[\\>img\\:first-child\\]\\:pt-0:has(>img:first-child){padding-top:calc(calc(var(--spacing)) * 0)}.tw\\:has-\\[\\>kbd\\]\\:ms-\\[-0\\.15rem\\]:has(>kbd){margin-inline-start:-.15rem}.tw\\:has-\\[\\>kbd\\]\\:me-\\[-0\\.15rem\\]:has(>kbd){margin-inline-end:-.15rem}.tw\\:has-\\[\\>svg\\]\\:grid-cols-\\[auto_1fr\\]:has(>svg){grid-template-columns:auto 1fr}.tw\\:has-\\[\\>svg\\]\\:gap-x-2:has(>svg){column-gap:calc(calc(var(--spacing)) * 2)}.tw\\:has-\\[\\>svg\\]\\:p-0:has(>svg){padding:calc(calc(var(--spacing)) * 0)}.tw\\:has-\\[\\>textarea\\]\\:h-auto:has(>textarea){height:auto}.tw\\:aria-disabled\\:pointer-events-none[aria-disabled=true]{pointer-events:none}.tw\\:aria-disabled\\:opacity-50[aria-disabled=true]{opacity:.5}.tw\\:aria-expanded\\:bg-muted[aria-expanded=true]{background-color:var(--muted)}.tw\\:aria-expanded\\:bg-secondary[aria-expanded=true]{background-color:var(--secondary)}.tw\\:aria-expanded\\:text-foreground[aria-expanded=true]{color:var(--foreground)}.tw\\:aria-expanded\\:text-secondary-foreground[aria-expanded=true]{color:var(--secondary-foreground)}.tw\\:aria-expanded\\:opacity-100[aria-expanded=true]{opacity:1}.tw\\:aria-invalid\\:border-destructive[aria-invalid=true]{border-color:var(--destructive)}.tw\\:aria-invalid\\:ring-0[aria-invalid=true]{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:aria-invalid\\:ring-3[aria-invalid=true]{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:aria-invalid\\:ring-destructive\\/20[aria-invalid=true]{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:aria-invalid\\:ring-destructive\\/20[aria-invalid=true]{--tw-ring-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:aria-invalid\\:aria-checked\\:border-primary[aria-invalid=true][aria-checked=true]{border-color:var(--primary)}.tw\\:aria-pressed\\:bg-muted[aria-pressed=true]{background-color:var(--muted)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:h-px[aria-orientation=horizontal]{height:1px}.tw\\:aria-\\[orientation\\=horizontal\\]\\:w-full[aria-orientation=horizontal]{width:100%}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:start-0[aria-orientation=horizontal]:after{content:var(--tw-content);inset-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:h-1[aria-orientation=horizontal]:after{content:var(--tw-content);height:calc(calc(var(--spacing)) * 1)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:w-full[aria-orientation=horizontal]:after{content:var(--tw-content);width:100%}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:translate-x-0[aria-orientation=horizontal]:after{content:var(--tw-content);--tw-translate-x:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:-translate-y-1\\/2[aria-orientation=horizontal]:after{content:var(--tw-content);--tw-translate-y:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:aria-\\[orientation\\=vertical\\]\\:flex-col[aria-orientation=vertical]{flex-direction:column}.tw\\:data-inset\\:ps-7[data-inset]{padding-inline-start:calc(calc(var(--spacing)) * 7)}.tw\\:data-placeholder\\:text-muted-foreground[data-placeholder]{color:var(--muted-foreground)}.tw\\:data-quiet-focus\\:focus-visible\\:border-transparent[data-quiet-focus]:focus-visible{border-color:#0000}.tw\\:data-quiet-focus\\:focus-visible\\:ring-0[data-quiet-focus]:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:data-quiet-focus\\:focus-visible\\:outline-none[data-quiet-focus]:focus-visible{--tw-outline-style:none;outline-style:none}.tw\\:data-\\[align-trigger\\=false\\]\\:min-w-36[data-align-trigger=false]{min-width:calc(calc(var(--spacing)) * 36)}.tw\\:data-\\[align-trigger\\=true\\]\\:min-w-\\(--radix-select-trigger-width\\)[data-align-trigger=true]{min-width:var(--radix-select-trigger-width)}.tw\\:data-\\[align-trigger\\=true\\]\\:animate-none[data-align-trigger=true]{animation:none}.tw\\:data-\\[disabled\\=true\\]\\:pointer-events-none[data-disabled=true]{pointer-events:none}.tw\\:data-\\[disabled\\=true\\]\\:opacity-50[data-disabled=true]{opacity:.5}.tw\\:data-\\[position\\=popper\\]\\:h-\\(--radix-select-trigger-height\\)[data-position=popper]{height:var(--radix-select-trigger-height)}.tw\\:data-\\[position\\=popper\\]\\:w-full[data-position=popper]{width:100%}.tw\\:data-\\[position\\=popper\\]\\:min-w-\\(--radix-select-trigger-width\\)[data-position=popper]{min-width:var(--radix-select-trigger-width)}.tw\\:data-\\[side\\=bottom\\]\\:translate-y-1[data-side=bottom]{--tw-translate-y:calc(calc(var(--spacing)) * 1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=bottom\\]\\:slide-in-from-top-2[data-side=bottom]{--tw-enter-translate-y:calc(2*var(--spacing)*-1)}.tw\\:data-\\[side\\=left\\]\\:-translate-x-1[data-side=left]{--tw-translate-x:calc(calc(var(--spacing)) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=left\\]\\:slide-in-from-right-2[data-side=left]{--tw-enter-translate-x:calc(2*var(--spacing))}.tw\\:data-\\[side\\=right\\]\\:translate-x-1[data-side=right]{--tw-translate-x:calc(calc(var(--spacing)) * 1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=right\\]\\:slide-in-from-left-2[data-side=right]{--tw-enter-translate-x:calc(2*var(--spacing)*-1)}.tw\\:data-\\[side\\=top\\]\\:-translate-y-1[data-side=top]{--tw-translate-y:calc(calc(var(--spacing)) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=top\\]\\:slide-in-from-bottom-2[data-side=top]{--tw-enter-translate-y:calc(2*var(--spacing))}.tw\\:data-\\[size\\=default\\]\\:h-8[data-size=default]{height:calc(calc(var(--spacing)) * 8)}.tw\\:data-\\[size\\=default\\]\\:h-\\[18\\.4px\\][data-size=default]{height:18.4px}.tw\\:data-\\[size\\=default\\]\\:w-\\[32px\\][data-size=default]{width:32px}.tw\\:data-\\[size\\=lg\\]\\:size-10[data-size=lg]{width:calc(calc(var(--spacing)) * 10);height:calc(calc(var(--spacing)) * 10)}.tw\\:data-\\[size\\=md\\]\\:text-sm[data-size=md]{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:data-\\[size\\=sm\\]\\:size-6[data-size=sm]{width:calc(calc(var(--spacing)) * 6);height:calc(calc(var(--spacing)) * 6)}.tw\\:data-\\[size\\=sm\\]\\:h-7[data-size=sm]{height:calc(calc(var(--spacing)) * 7)}.tw\\:data-\\[size\\=sm\\]\\:h-\\[14px\\][data-size=sm]{height:14px}.tw\\:data-\\[size\\=sm\\]\\:w-\\[24px\\][data-size=sm]{width:24px}.tw\\:data-\\[size\\=sm\\]\\:gap-3[data-size=sm]{gap:calc(calc(var(--spacing)) * 3)}.tw\\:data-\\[size\\=sm\\]\\:rounded-\\[min\\(var\\(--tw-radius-md\\)\\,10px\\)\\][data-size=sm]{border-radius:min(var(--tw-radius-md), 10px)}.tw\\:data-\\[size\\=sm\\]\\:py-3[data-size=sm]{padding-block:calc(calc(var(--spacing)) * 3)}.tw\\:data-\\[size\\=sm\\]\\:text-xs[data-size=sm]{font-size:var(--tw-text-xs);line-height:var(--tw-leading,var(--tw-text-xs--line-height))}.tw\\:data-\\[size\\=sm\\]\\:has-data-\\[slot\\=card-footer\\]\\:pb-0[data-size=sm]:has([data-slot=card-footer]){padding-bottom:calc(calc(var(--spacing)) * 0)}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-item\\]\\:focus\\:bg-foreground\\/10 *)[data-slot$=-item]:focus{background-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-item\\]\\:focus\\:bg-foreground\\/10 *)[data-slot$=-item]:focus{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)}}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-item\\]\\:data-highlighted\\:bg-foreground\\/10 *)[data-slot$=-item][data-highlighted]{background-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-item\\]\\:data-highlighted\\:bg-foreground\\/10 *)[data-slot$=-item][data-highlighted]{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)}}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-separator\\]\\:bg-foreground\\/5 *)[data-slot$=-separator]{background-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-separator\\]\\:bg-foreground\\/5 *)[data-slot$=-separator]{background-color:color-mix(in oklab, var(--foreground) 5%, transparent)}}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-trigger\\]\\:focus\\:bg-foreground\\/10 *)[data-slot$=-trigger]:focus{background-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-trigger\\]\\:focus\\:bg-foreground\\/10 *)[data-slot$=-trigger]:focus{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)}}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-trigger\\]\\:aria-expanded\\:bg-foreground\\/10\\! *)[data-slot$=-trigger][aria-expanded=true]{background-color:var(--foreground)!important}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-trigger\\]\\:aria-expanded\\:bg-foreground\\/10\\! *)[data-slot$=-trigger][aria-expanded=true]{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)!important}}:is(.tw\\:\\*\\:data-\\[slot\\=alert-description\\]\\:text-destructive\\/90>*)[data-slot=alert-description]{color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\:data-\\[slot\\=alert-description\\]\\:text-destructive\\/90>*)[data-slot=alert-description]{color:color-mix(in oklab, var(--destructive) 90%, transparent)}}:is(.tw\\:\\*\\:data-\\[slot\\=avatar\\]\\:ring-2>*)[data-slot=avatar]{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}:is(.tw\\:\\*\\:data-\\[slot\\=avatar\\]\\:ring-background>*)[data-slot=avatar]{--tw-ring-color:var(--background)}:is(.tw\\:\\*\\:data-\\[slot\\=input-group-addon\\]\\:ps-2\\!>*)[data-slot=input-group-addon]{padding-inline-start:calc(calc(var(--spacing)) * 2)!important}:is(.tw\\:\\*\\*\\:data-\\[slot\\=kbd\\]\\:relative *)[data-slot=kbd]{position:relative}:is(.tw\\:\\*\\*\\:data-\\[slot\\=kbd\\]\\:isolate *)[data-slot=kbd]{isolation:isolate}:is(.tw\\:\\*\\*\\:data-\\[slot\\=kbd\\]\\:z-50 *)[data-slot=kbd]{z-index:50}:is(.tw\\:\\*\\*\\:data-\\[slot\\=kbd\\]\\:rounded-sm *)[data-slot=kbd]{border-radius:calc(var(--radius) * .6)}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:line-clamp-1>*)[data-slot=select-value]{-webkit-line-clamp:1;-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:flex>*)[data-slot=select-value]{display:flex}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:flex-1>*)[data-slot=select-value]{flex:1}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:items-center>*)[data-slot=select-value]{align-items:center}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:gap-1\\.5>*)[data-slot=select-value]{gap:calc(calc(var(--spacing)) * 1.5)}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:text-start>*)[data-slot=select-value]{text-align:start}.tw\\:group-data-horizontal\\/toggle-group\\:data-\\[spacing\\=0\\]\\:first\\:rounded-s-lg:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=horizontal]) *)[data-spacing="0"]:first-child{border-start-start-radius:var(--radius);border-end-start-radius:var(--radius)}.tw\\:group-data-vertical\\/toggle-group\\:data-\\[spacing\\=0\\]\\:first\\:rounded-t-lg:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=vertical]) *)[data-spacing="0"]:first-child{border-top-left-radius:var(--radius);border-top-right-radius:var(--radius)}.tw\\:group-data-horizontal\\/toggle-group\\:data-\\[spacing\\=0\\]\\:last\\:rounded-e-lg:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=horizontal]) *)[data-spacing="0"]:last-child{border-start-end-radius:var(--radius);border-end-end-radius:var(--radius)}.tw\\:group-data-vertical\\/toggle-group\\:data-\\[spacing\\=0\\]\\:last\\:rounded-b-lg:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=vertical]) *)[data-spacing="0"]:last-child{border-bottom-right-radius:var(--radius);border-bottom-left-radius:var(--radius)}.tw\\:data-\\[state\\=active\\]\\:bg-background[data-state=active]{background-color:var(--background)}.tw\\:data-\\[state\\=active\\]\\:text-foreground[data-state=active]{color:var(--foreground)}.tw\\:data-\\[state\\=active\\]\\:shadow-sm[data-state=active]{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:data-\\[state\\=closed\\]\\:overflow-hidden[data-state=closed]{overflow:hidden}.tw\\:data-\\[state\\=delayed-open\\]\\:animate-in[data-state=delayed-open]{animation:enter var(--tw-animation-duration,var(--tw-duration,.15s))var(--tw-ease,ease)var(--tw-animation-delay,0s)var(--tw-animation-iteration-count,1)var(--tw-animation-direction,normal)var(--tw-animation-fill-mode,none)}.tw\\:data-\\[state\\=delayed-open\\]\\:fade-in-0[data-state=delayed-open]{--tw-enter-opacity:0}.tw\\:data-\\[state\\=delayed-open\\]\\:zoom-in-95[data-state=delayed-open]{--tw-enter-scale:.95}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-soft-approved\\)\\][data-state=on]{background-color:var(--inv-soft-approved)}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-soft-unapproved\\)\\][data-state=on]{background-color:var(--inv-soft-unapproved)}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-soft-unknown\\)\\][data-state=on]{background-color:var(--inv-soft-unknown)}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-vivid-approved\\)\\][data-state=on]{background-color:var(--inv-vivid-approved)}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-vivid-unapproved\\)\\][data-state=on]{background-color:var(--inv-vivid-unapproved)}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-vivid-unknown\\)\\][data-state=on]{background-color:var(--inv-vivid-unknown)}.tw\\:data-\\[state\\=on\\]\\:bg-muted[data-state=on]{background-color:var(--muted)}.tw\\:data-\\[state\\=on\\]\\:text-\\[var\\(--inv-icon-approved\\)\\][data-state=on]{color:var(--inv-icon-approved)}.tw\\:data-\\[state\\=on\\]\\:text-\\[var\\(--inv-icon-unapproved\\)\\][data-state=on]{color:var(--inv-icon-unapproved)}.tw\\:data-\\[state\\=on\\]\\:text-\\[var\\(--inv-icon-unknown\\)\\][data-state=on]{color:var(--inv-icon-unknown)}.tw\\:data-\\[state\\=on\\]\\:text-\\[var\\(--inv-on\\)\\][data-state=on]{color:var(--inv-on)}.tw\\:data-\\[state\\=on\\]\\:text-foreground[data-state=on]{color:var(--foreground)}.tw\\:data-\\[state\\=open\\]\\:bg-accent[data-state=open]{background-color:var(--accent)}.tw\\:data-\\[state\\=open\\]\\:bg-muted[data-state=open]{background-color:var(--muted)}.tw\\:data-\\[state\\=open\\]\\:text-foreground[data-state=open]{color:var(--foreground)}.tw\\:data-\\[state\\=selected\\]\\:bg-muted[data-state=selected]{background-color:var(--muted)}.tw\\:data-\\[variant\\=destructive\\]\\:text-destructive[data-variant=destructive]{color:var(--destructive)}:is(:is(.tw\\:\\*\\*\\:data-\\[variant\\=destructive\\]\\:\\*\\*\\:text-accent-foreground\\! *)[data-variant=destructive] *),:is(.tw\\:\\*\\*\\:data-\\[variant\\=destructive\\]\\:text-accent-foreground\\! *)[data-variant=destructive]{color:var(--accent-foreground)!important}.tw\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-destructive\\/10[data-variant=destructive]:focus{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-destructive\\/10[data-variant=destructive]:focus{background-color:color-mix(in oklab, var(--destructive) 10%, transparent)}}.tw\\:data-\\[variant\\=destructive\\]\\:focus\\:text-destructive[data-variant=destructive]:focus{color:var(--destructive)}:is(.tw\\:\\*\\*\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-foreground\\/10\\! *)[data-variant=destructive]:focus{background-color:var(--foreground)!important}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-foreground\\/10\\! *)[data-variant=destructive]:focus{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)!important}}.tw\\:data-\\[variant\\=line\\]\\:rounded-none[data-variant=line]{border-radius:0}.tw\\:group-data-horizontal\\/toggle-group\\:data-\\[spacing\\=0\\]\\:data-\\[variant\\=outline\\]\\:border-s-0:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=horizontal]) *)[data-spacing="0"][data-variant=outline]{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:group-data-vertical\\/toggle-group\\:data-\\[spacing\\=0\\]\\:data-\\[variant\\=outline\\]\\:border-t-0:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=vertical]) *)[data-spacing="0"][data-variant=outline]{border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:group-data-horizontal\\/toggle-group\\:data-\\[spacing\\=0\\]\\:data-\\[variant\\=outline\\]\\:first\\:border-s:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=horizontal]) *)[data-spacing="0"][data-variant=outline]:first-child{border-inline-start-style:var(--tw-border-style);border-inline-start-width:1px}.tw\\:group-data-vertical\\/toggle-group\\:data-\\[spacing\\=0\\]\\:data-\\[variant\\=outline\\]\\:first\\:border-t:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=vertical]) *)[data-spacing="0"][data-variant=outline]:first-child{border-top-style:var(--tw-border-style);border-top-width:1px}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:inset-x-0[data-vaul-drawer-direction=bottom]{inset-inline:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:bottom-0[data-vaul-drawer-direction=bottom]{bottom:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:mt-24[data-vaul-drawer-direction=bottom]{margin-top:calc(calc(var(--spacing)) * 24)}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:max-h-\\[80vh\\][data-vaul-drawer-direction=bottom]{max-height:80vh}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:rounded-t-xl[data-vaul-drawer-direction=bottom]{border-top-left-radius:calc(var(--radius) * 1.4);border-top-right-radius:calc(var(--radius) * 1.4)}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:border-t[data-vaul-drawer-direction=bottom]{border-top-style:var(--tw-border-style);border-top-width:1px}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:inset-y-0[data-vaul-drawer-direction=left]{inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:left-0[data-vaul-drawer-direction=left]{left:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:w-3\\/4[data-vaul-drawer-direction=left]{width:75%}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:flex-row[data-vaul-drawer-direction=left]{flex-direction:row}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:rounded-r-xl[data-vaul-drawer-direction=left]{border-top-right-radius:calc(var(--radius) * 1.4);border-bottom-right-radius:calc(var(--radius) * 1.4)}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:border-r[data-vaul-drawer-direction=left]{border-right-style:var(--tw-border-style);border-right-width:1px}.tw\\:data-\\[vaul-drawer-direction\\=left\\/right\\]\\:flex-row[data-vaul-drawer-direction=left\\/right]{flex-direction:row}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:inset-y-0[data-vaul-drawer-direction=right]{inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:right-0[data-vaul-drawer-direction=right]{right:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:w-3\\/4[data-vaul-drawer-direction=right]{width:75%}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:flex-row[data-vaul-drawer-direction=right]{flex-direction:row}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:rounded-l-xl[data-vaul-drawer-direction=right]{border-top-left-radius:calc(var(--radius) * 1.4);border-bottom-left-radius:calc(var(--radius) * 1.4)}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:border-l[data-vaul-drawer-direction=right]{border-left-style:var(--tw-border-style);border-left-width:1px}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:inset-x-0[data-vaul-drawer-direction=top]{inset-inline:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:top-0[data-vaul-drawer-direction=top]{top:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:mb-24[data-vaul-drawer-direction=top]{margin-bottom:calc(calc(var(--spacing)) * 24)}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:max-h-\\[80vh\\][data-vaul-drawer-direction=top]{max-height:80vh}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:rounded-b-xl[data-vaul-drawer-direction=top]{border-bottom-right-radius:calc(var(--radius) * 1.4);border-bottom-left-radius:calc(var(--radius) * 1.4)}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:border-b[data-vaul-drawer-direction=top]{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}@supports ((-webkit-backdrop-filter:var(--tw)) or (backdrop-filter:var(--tw))){.tw\\:supports-backdrop-filter\\:backdrop-blur-xs{--tw-backdrop-blur:blur(var(--tw-blur-xs));-webkit-backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)}}@media (min-width:40rem){.tw\\:sm\\:flex{display:flex}.tw\\:sm\\:max-w-sm{max-width:var(--tw-container-sm)}.tw\\:sm\\:flex-row{flex-direction:row}.tw\\:sm\\:justify-end{justify-content:flex-end}.tw\\:sm\\:p-8{padding:calc(calc(var(--spacing)) * 8)}.tw\\:sm\\:text-start{text-align:start}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:sm\\:max-w-sm[data-vaul-drawer-direction=left],.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:sm\\:max-w-sm[data-vaul-drawer-direction=right]{max-width:var(--tw-container-sm)}}@media (min-width:48rem){.tw\\:md\\:block{display:block}.tw\\:md\\:flex{display:flex}.tw\\:md\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.tw\\:md\\:gap-0\\.5{gap:calc(calc(var(--spacing)) * .5)}.tw\\:md\\:text-start{text-align:start}.tw\\:md\\:text-sm{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:md\\:text-pretty{text-wrap:pretty}.tw\\:md\\:opacity-0{opacity:0}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:m-2:is(:where(.tw\\:peer)[data-variant=inset]~*){margin:calc(calc(var(--spacing)) * 2)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:ms-0:is(:where(.tw\\:peer)[data-variant=inset]~*){margin-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:rounded-xl:is(:where(.tw\\:peer)[data-variant=inset]~*){border-radius:calc(var(--radius) * 1.4)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:shadow-sm:is(:where(.tw\\:peer)[data-variant=inset]~*){--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:peer-data-\\[state\\=collapsed\\]\\:ms-2:is(:where(.tw\\:peer)[data-variant=inset]~*):is(:where(.tw\\:peer)[data-state=collapsed]~*){margin-inline-start:calc(calc(var(--spacing)) * 2)}.tw\\:md\\:after\\:hidden:after{content:var(--tw-content);display:none}}@media (min-width:64rem){.tw\\:lg\\:flex{display:flex}.tw\\:lg\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}:where(.tw\\:lg\\:space-x-8>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 8) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 8) * calc(1 - var(--tw-space-x-reverse)))}.tw\\:lg\\:text-5xl{font-size:var(--tw-text-5xl);line-height:var(--tw-leading,var(--tw-text-5xl--line-height))}}@media (min-width:48rem){@media (min-width:64rem){.tw\\:md\\:lg\\:hidden{display:none}}}@media (min-width:80rem){.tw\\:xl\\:auto-cols-fr{grid-auto-columns:minmax(0,1fr)}.tw\\:xl\\:grid-flow-col{grid-auto-flow:column}.tw\\:xl\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.tw\\:xl\\:grid-cols-none{grid-template-columns:none}.tw\\:xl\\:grid-rows-2{grid-template-rows:repeat(2,minmax(0,1fr))}}@container search not (min-width:7rem){.tw\\:\\@max-\\[7rem\\]\\/search\\:hidden{display:none}.tw\\:\\@max-\\[7rem\\]\\/search\\:ps-3{padding-inline-start:calc(calc(var(--spacing)) * 3)}}@container search not (min-width:4rem){.tw\\:\\@max-\\[4rem\\]\\/search\\:hidden{display:none}.tw\\:\\@max-\\[4rem\\]\\/search\\:pe-3{padding-inline-end:calc(calc(var(--spacing)) * 3)}}@container search not (min-width:3rem){.tw\\:\\@max-\\[3rem\\]\\/search\\:ps-0{padding-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:\\@max-\\[3rem\\]\\/search\\:pe-0{padding-inline-end:calc(calc(var(--spacing)) * 0)}}@container (min-width:24rem){.tw\\:\\@sm\\:basis-auto{flex-basis:auto}}.tw\\:ltr\\:left-2:where(:dir(ltr),[dir=ltr],[dir=ltr] *){left:calc(calc(var(--spacing)) * 2)}.tw\\:ltr\\:-translate-x-1\\/2:where(:dir(ltr),[dir=ltr],[dir=ltr] *){--tw-translate-x:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:right-2:where(:dir(rtl),[dir=rtl],[dir=rtl] *){right:calc(calc(var(--spacing)) * 2)}.tw\\:rtl\\:flex:where(:dir(rtl),[dir=rtl],[dir=rtl] *){display:flex}.tw\\:rtl\\:-translate-x-px:where(:dir(rtl),[dir=rtl],[dir=rtl] *){--tw-translate-x:-1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:translate-x-1\\/2:where(:dir(rtl),[dir=rtl],[dir=rtl] *){--tw-translate-x:calc(1 / 2 * 100%);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:translate-x-px:where(:dir(rtl),[dir=rtl],[dir=rtl] *){--tw-translate-x:1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:after\\:translate-x-1\\/2:where(:dir(rtl),[dir=rtl],[dir=rtl] *):after{content:var(--tw-content);--tw-translate-x:calc(1 / 2 * 100%);translate:var(--tw-translate-x) var(--tw-translate-y)}:where([data-side=primary]) .tw\\:rtl\\:in-data-\\[side\\=primary\\]\\:cursor-e-resize:where(:dir(rtl),[dir=rtl],[dir=rtl] *){cursor:e-resize}:where([data-side=secondary]) .tw\\:rtl\\:in-data-\\[side\\=secondary\\]\\:cursor-w-resize:where(:dir(rtl),[dir=rtl],[dir=rtl] *){cursor:w-resize}.tw\\:rtl\\:aria-\\[orientation\\=horizontal\\]\\:after\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *)[aria-orientation=horizontal]:after{content:var(--tw-content);--tw-translate-x:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:data-\\[side\\=left\\]\\:translate-x-1:where(:dir(rtl),[dir=rtl],[dir=rtl] *)[data-side=left]{--tw-translate-x:calc(calc(var(--spacing)) * 1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:data-\\[side\\=right\\]\\:-translate-x-1:where(:dir(rtl),[dir=rtl],[dir=rtl] *)[data-side=right]{--tw-translate-x:calc(calc(var(--spacing)) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:dark\\:border-input:is(.dark *){border-color:var(--input)}.tw\\:dark\\:bg-destructive\\/20:is(.dark *){background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:bg-destructive\\/20:is(.dark *){background-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:dark\\:bg-input\\/30:is(.dark *){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:bg-input\\/30:is(.dark *){background-color:color-mix(in oklab, var(--input) 30%, transparent)}}.tw\\:dark\\:bg-transparent:is(.dark *){background-color:#0000}.tw\\:dark\\:text-amber-400:is(.dark *){color:var(--tw-color-amber-400)}.tw\\:dark\\:text-muted-foreground:is(.dark *){color:var(--muted-foreground)}.tw\\:dark\\:text-rose-400:is(.dark *){color:var(--tw-color-rose-400)}.tw\\:dark\\:text-sky-400:is(.dark *){color:var(--tw-color-sky-400)}.tw\\:dark\\:text-teal-400:is(.dark *){color:var(--tw-color-teal-400)}.tw\\:dark\\:after\\:mix-blend-lighten:is(.dark *):after{content:var(--tw-content);mix-blend-mode:lighten}@media (hover:hover){.tw\\:dark\\:hover\\:bg-blue-500:is(.dark *):hover{background-color:var(--tw-color-blue-500)}.tw\\:dark\\:hover\\:bg-destructive\\/30:is(.dark *):hover{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:hover\\:bg-destructive\\/30:is(.dark *):hover{background-color:color-mix(in oklab, var(--destructive) 30%, transparent)}}.tw\\:dark\\:hover\\:bg-input\\/50:is(.dark *):hover{background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:hover\\:bg-input\\/50:is(.dark *):hover{background-color:color-mix(in oklab, var(--input) 50%, transparent)}}.tw\\:dark\\:hover\\:bg-muted\\/50:is(.dark *):hover{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:hover\\:bg-muted\\/50:is(.dark *):hover{background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:dark\\:hover\\:text-foreground:is(.dark *):hover{color:var(--foreground)}}.tw\\:dark\\:focus-visible\\:ring-destructive\\/40:is(.dark *):focus-visible{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:focus-visible\\:ring-destructive\\/40:is(.dark *):focus-visible{--tw-ring-color:color-mix(in oklab, var(--destructive) 40%, transparent)}}.tw\\:dark\\:disabled\\:bg-input\\/80:is(.dark *):disabled{background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:disabled\\:bg-input\\/80:is(.dark *):disabled{background-color:color-mix(in oklab, var(--input) 80%, transparent)}}.tw\\:dark\\:disabled\\:bg-transparent:is(.dark *):disabled{background-color:#0000}:where([data-slot=tooltip-content]) .tw\\:dark\\:in-data-\\[slot\\=tooltip-content\\]\\:bg-background\\/10:is(.dark *){background-color:var(--background)}@supports (color:color-mix(in lab, red, red)){:where([data-slot=tooltip-content]) .tw\\:dark\\:in-data-\\[slot\\=tooltip-content\\]\\:bg-background\\/10:is(.dark *){background-color:color-mix(in oklab, var(--background) 10%, transparent)}}.tw\\:dark\\:has-disabled\\:bg-input\\/80:is(.dark *):has(:disabled){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:has-disabled\\:bg-input\\/80:is(.dark *):has(:disabled){background-color:color-mix(in oklab, var(--input) 80%, transparent)}}.tw\\:dark\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-destructive\\/40:is(.dark *):has([data-slot][aria-invalid=true]){--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-destructive\\/40:is(.dark *):has([data-slot][aria-invalid=true]){--tw-ring-color:color-mix(in oklab, var(--destructive) 40%, transparent)}}.tw\\:dark\\:aria-invalid\\:border-destructive\\/50:is(.dark *)[aria-invalid=true]{border-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:aria-invalid\\:border-destructive\\/50:is(.dark *)[aria-invalid=true]{border-color:color-mix(in oklab, var(--destructive) 50%, transparent)}}.tw\\:dark\\:aria-invalid\\:ring-destructive\\/40:is(.dark *)[aria-invalid=true]{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:aria-invalid\\:ring-destructive\\/40:is(.dark *)[aria-invalid=true]{--tw-ring-color:color-mix(in oklab, var(--destructive) 40%, transparent)}}.tw\\:dark\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-destructive\\/20:is(.dark *)[data-variant=destructive]:focus{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-destructive\\/20:is(.dark *)[data-variant=destructive]:focus{background-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:data-open\\:animate-in:where([data-state=open]),.tw\\:data-open\\:animate-in:where([data-open]:not([data-open=false])){animation:enter var(--tw-animation-duration,var(--tw-duration,.15s))var(--tw-ease,ease)var(--tw-animation-delay,0s)var(--tw-animation-iteration-count,1)var(--tw-animation-direction,normal)var(--tw-animation-fill-mode,none)}.tw\\:data-open\\:bg-accent:where([data-state=open]),.tw\\:data-open\\:bg-accent:where([data-open]:not([data-open=false])){background-color:var(--accent)}.tw\\:data-open\\:text-accent-foreground:where([data-state=open]),.tw\\:data-open\\:text-accent-foreground:where([data-open]:not([data-open=false])){color:var(--accent-foreground)}.tw\\:data-open\\:fade-in-0:where([data-state=open]),.tw\\:data-open\\:fade-in-0:where([data-open]:not([data-open=false])){--tw-enter-opacity:0}.tw\\:data-open\\:zoom-in-95:where([data-state=open]),.tw\\:data-open\\:zoom-in-95:where([data-open]:not([data-open=false])){--tw-enter-scale:.95}@media (hover:hover){:is(.tw\\:data-open\\:hover\\:bg-sidebar-accent:where([data-state=open]),.tw\\:data-open\\:hover\\:bg-sidebar-accent:where([data-open]:not([data-open=false]))):hover{background-color:var(--sidebar-accent)}:is(.tw\\:data-open\\:hover\\:text-sidebar-accent-foreground:where([data-state=open]),.tw\\:data-open\\:hover\\:text-sidebar-accent-foreground:where([data-open]:not([data-open=false]))):hover{color:var(--sidebar-accent-foreground)}}.tw\\:data-closed\\:animate-out:where([data-state=closed]),.tw\\:data-closed\\:animate-out:where([data-closed]:not([data-closed=false])){animation:exit var(--tw-animation-duration,var(--tw-duration,.15s))var(--tw-ease,ease)var(--tw-animation-delay,0s)var(--tw-animation-iteration-count,1)var(--tw-animation-direction,normal)var(--tw-animation-fill-mode,none)}.tw\\:data-closed\\:fade-out-0:where([data-state=closed]),.tw\\:data-closed\\:fade-out-0:where([data-closed]:not([data-closed=false])){--tw-exit-opacity:0}.tw\\:data-closed\\:zoom-out-95:where([data-state=closed]),.tw\\:data-closed\\:zoom-out-95:where([data-closed]:not([data-closed=false])){--tw-exit-scale:.95}.tw\\:data-checked\\:border-primary:where([data-state=checked]),.tw\\:data-checked\\:border-primary:where([data-checked]:not([data-checked=false])){border-color:var(--primary)}.tw\\:data-checked\\:bg-primary:where([data-state=checked]),.tw\\:data-checked\\:bg-primary:where([data-checked]:not([data-checked=false])){background-color:var(--primary)}.tw\\:data-checked\\:text-primary-foreground:where([data-state=checked]),.tw\\:data-checked\\:text-primary-foreground:where([data-checked]:not([data-checked=false])){color:var(--primary-foreground)}.tw\\:group-data-\\[size\\=default\\]\\/switch\\:data-checked\\:translate-x-\\[calc\\(100\\%-2px\\)\\]:is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-state=checked]),.tw\\:group-data-\\[size\\=default\\]\\/switch\\:data-checked\\:translate-x-\\[calc\\(100\\%-2px\\)\\]:is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-checked]:not([data-checked=false])),.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:data-checked\\:translate-x-\\[calc\\(100\\%-2px\\)\\]:is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-state=checked]),.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:data-checked\\:translate-x-\\[calc\\(100\\%-2px\\)\\]:is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-checked]:not([data-checked=false])){--tw-translate-x:calc(100% - 2px);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:group-data-\\[size\\=default\\]\\/switch\\:data-checked\\:-translate-x-\\[calc\\(100\\%-2px\\)\\]:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-state=checked]),.tw\\:rtl\\:group-data-\\[size\\=default\\]\\/switch\\:data-checked\\:-translate-x-\\[calc\\(100\\%-2px\\)\\]:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-checked]:not([data-checked=false])),.tw\\:rtl\\:group-data-\\[size\\=sm\\]\\/switch\\:data-checked\\:-translate-x-\\[calc\\(100\\%-2px\\)\\]:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-state=checked]),.tw\\:rtl\\:group-data-\\[size\\=sm\\]\\/switch\\:data-checked\\:-translate-x-\\[calc\\(100\\%-2px\\)\\]:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-checked]:not([data-checked=false])){--tw-translate-x:calc(calc(100% - 2px) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:dark\\:data-checked\\:bg-primary:is(.dark *):where([data-state=checked]),.tw\\:dark\\:data-checked\\:bg-primary:is(.dark *):where([data-checked]:not([data-checked=false])){background-color:var(--primary)}.tw\\:dark\\:data-checked\\:bg-primary-foreground:is(.dark *):where([data-state=checked]),.tw\\:dark\\:data-checked\\:bg-primary-foreground:is(.dark *):where([data-checked]:not([data-checked=false])){background-color:var(--primary-foreground)}.tw\\:data-unchecked\\:bg-input:where([data-state=unchecked]),.tw\\:data-unchecked\\:bg-input:where([data-unchecked]:not([data-unchecked=false])){background-color:var(--input)}.tw\\:group-data-\\[size\\=default\\]\\/switch\\:data-unchecked\\:translate-x-0:is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-state=unchecked]),.tw\\:group-data-\\[size\\=default\\]\\/switch\\:data-unchecked\\:translate-x-0:is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-unchecked]:not([data-unchecked=false])),.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:data-unchecked\\:translate-x-0:is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-state=unchecked]),.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:data-unchecked\\:translate-x-0:is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-unchecked]:not([data-unchecked=false])),.tw\\:rtl\\:group-data-\\[size\\=default\\]\\/switch\\:data-unchecked\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-state=unchecked]),.tw\\:rtl\\:group-data-\\[size\\=default\\]\\/switch\\:data-unchecked\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-unchecked]:not([data-unchecked=false])),.tw\\:rtl\\:group-data-\\[size\\=sm\\]\\/switch\\:data-unchecked\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-state=unchecked]),.tw\\:rtl\\:group-data-\\[size\\=sm\\]\\/switch\\:data-unchecked\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-unchecked]:not([data-unchecked=false])){--tw-translate-x:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:dark\\:data-unchecked\\:bg-foreground:is(.dark *):where([data-state=unchecked]),.tw\\:dark\\:data-unchecked\\:bg-foreground:is(.dark *):where([data-unchecked]:not([data-unchecked=false])){background-color:var(--foreground)}.tw\\:dark\\:data-unchecked\\:bg-input\\/80:is(.dark *):where([data-state=unchecked]),.tw\\:dark\\:data-unchecked\\:bg-input\\/80:is(.dark *):where([data-unchecked]:not([data-unchecked=false])){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:data-unchecked\\:bg-input\\/80:is(.dark *):where([data-state=unchecked]),.tw\\:dark\\:data-unchecked\\:bg-input\\/80:is(.dark *):where([data-unchecked]:not([data-unchecked=false])){background-color:color-mix(in oklab, var(--input) 80%, transparent)}}.tw\\:data-selected\\:bg-muted:where([data-selected=true]),.tw\\:data-selected\\:bg-muted\\/50:where([data-selected=true]){background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:data-selected\\:bg-muted\\/50:where([data-selected=true]){background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:data-selected\\:bg-primary:where([data-selected=true]){background-color:var(--primary)}.tw\\:data-selected\\:bg-transparent:where([data-selected=true]){background-color:#0000}.tw\\:data-selected\\:text-foreground:where([data-selected=true]){color:var(--foreground)}.tw\\:data-selected\\:text-inherit:where([data-selected=true]){color:inherit}.tw\\:data-selected\\:text-muted-foreground\\/50:where([data-selected=true]){color:var(--muted-foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:data-selected\\:text-muted-foreground\\/50:where([data-selected=true]){color:color-mix(in oklab, var(--muted-foreground) 50%, transparent)}}.tw\\:data-selected\\:text-primary-foreground:where([data-selected=true]){color:var(--primary-foreground)}.tw\\:data-selected\\:ring-2:where([data-selected=true]){--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:data-selected\\:ring-primary-foreground\\/70:where([data-selected=true]){--tw-ring-color:var(--primary-foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:data-selected\\:ring-primary-foreground\\/70:where([data-selected=true]){--tw-ring-color:color-mix(in oklab, var(--primary-foreground) 70%, transparent)}}.tw\\:data-selected\\:ring-ring\\/50:where([data-selected=true]){--tw-ring-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.tw\\:data-selected\\:ring-ring\\/50:where([data-selected=true]){--tw-ring-color:color-mix(in oklab, var(--ring) 50%, transparent)}}.tw\\:data-selected\\:ring-inset:where([data-selected=true]){--tw-ring-inset:inset}@media (forced-colors:active){.tw\\:forced-colors\\:data-selected\\:outline-2:where([data-selected=true]){outline-style:var(--tw-outline-style);outline-width:2px}.tw\\:forced-colors\\:data-selected\\:-outline-offset-2:where([data-selected=true]){outline-offset:calc(2px * -1)}.tw\\:forced-colors\\:data-selected\\:outline-\\[color\\:Highlight\\]:where([data-selected=true]){outline-color:highlight}}.tw\\:data-disabled\\:pointer-events-none:where([data-disabled=true]),.tw\\:data-disabled\\:pointer-events-none:where([data-disabled]:not([data-disabled=false])){pointer-events:none}.tw\\:data-disabled\\:cursor-not-allowed:where([data-disabled=true]),.tw\\:data-disabled\\:cursor-not-allowed:where([data-disabled]:not([data-disabled=false])){cursor:not-allowed}.tw\\:data-disabled\\:opacity-50:where([data-disabled=true]),.tw\\:data-disabled\\:opacity-50:where([data-disabled]:not([data-disabled=false])){opacity:.5}.tw\\:data-active\\:bg-background:where([data-state=active]),.tw\\:data-active\\:bg-background:where([data-active]:not([data-active=false])){background-color:var(--background)}.tw\\:data-active\\:bg-sidebar-accent:where([data-state=active]),.tw\\:data-active\\:bg-sidebar-accent:where([data-active]:not([data-active=false])){background-color:var(--sidebar-accent)}.tw\\:data-active\\:font-medium:where([data-state=active]),.tw\\:data-active\\:font-medium:where([data-active]:not([data-active=false])){--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}.tw\\:data-active\\:text-foreground:where([data-state=active]),.tw\\:data-active\\:text-foreground:where([data-active]:not([data-active=false])){color:var(--foreground)}.tw\\:data-active\\:text-sidebar-accent-foreground:where([data-state=active]),.tw\\:data-active\\:text-sidebar-accent-foreground:where([data-active]:not([data-active=false])){color:var(--sidebar-accent-foreground)}.tw\\:group-data-\\[variant\\=default\\]\\/tabs-list\\:data-active\\:shadow-sm:is(:where(.tw\\:group\\/tabs-list)[data-variant=default] *):where([data-state=active]),.tw\\:group-data-\\[variant\\=default\\]\\/tabs-list\\:data-active\\:shadow-sm:is(:where(.tw\\:group\\/tabs-list)[data-variant=default] *):where([data-active]:not([data-active=false])){--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:bg-transparent:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:bg-transparent:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false])){background-color:#0000}.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:shadow-none:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:shadow-none:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false])){--tw-shadow:0 0 #0000;box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}:is(.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:after\\:opacity-100:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:after\\:opacity-100:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false]))):after{content:var(--tw-content);opacity:1}.tw\\:dark\\:data-active\\:border-input:is(.dark *):where([data-state=active]),.tw\\:dark\\:data-active\\:border-input:is(.dark *):where([data-active]:not([data-active=false])){border-color:var(--input)}.tw\\:dark\\:data-active\\:bg-input\\/30:is(.dark *):where([data-state=active]),.tw\\:dark\\:data-active\\:bg-input\\/30:is(.dark *):where([data-active]:not([data-active=false])){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:data-active\\:bg-input\\/30:is(.dark *):where([data-state=active]),.tw\\:dark\\:data-active\\:bg-input\\/30:is(.dark *):where([data-active]:not([data-active=false])){background-color:color-mix(in oklab, var(--input) 30%, transparent)}}.tw\\:dark\\:data-active\\:text-foreground:is(.dark *):where([data-state=active]),.tw\\:dark\\:data-active\\:text-foreground:is(.dark *):where([data-active]:not([data-active=false])){color:var(--foreground)}.tw\\:dark\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:border-transparent:is(.dark *):is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:dark\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:border-transparent:is(.dark *):is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false])){border-color:#0000}.tw\\:dark\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:bg-transparent:is(.dark *):is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:dark\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:bg-transparent:is(.dark *):is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false])){background-color:#0000}.tw\\:data-horizontal\\:mx-px:where([data-orientation=horizontal]){margin-inline:1px}.tw\\:data-horizontal\\:h-1:where([data-orientation=horizontal]){height:calc(calc(var(--spacing)) * 1)}.tw\\:data-horizontal\\:h-full:where([data-orientation=horizontal]){height:100%}.tw\\:data-horizontal\\:h-px:where([data-orientation=horizontal]){height:1px}.tw\\:data-horizontal\\:w-auto:where([data-orientation=horizontal]){width:auto}.tw\\:data-horizontal\\:w-full:where([data-orientation=horizontal]){width:100%}.tw\\:data-horizontal\\:flex-col:where([data-orientation=horizontal]){flex-direction:column}.tw\\:data-vertical\\:my-px:where([data-orientation=vertical]){margin-block:1px}.tw\\:data-vertical\\:h-auto:where([data-orientation=vertical]){height:auto}.tw\\:data-vertical\\:h-full:where([data-orientation=vertical]){height:100%}.tw\\:data-vertical\\:min-h-40:where([data-orientation=vertical]){min-height:calc(calc(var(--spacing)) * 40)}.tw\\:data-vertical\\:w-1:where([data-orientation=vertical]){width:calc(calc(var(--spacing)) * 1)}.tw\\:data-vertical\\:w-auto:where([data-orientation=vertical]){width:auto}.tw\\:data-vertical\\:w-full:where([data-orientation=vertical]){width:100%}.tw\\:data-vertical\\:w-px:where([data-orientation=vertical]){width:1px}.tw\\:data-vertical\\:flex-col:where([data-orientation=vertical]){flex-direction:column}.tw\\:data-vertical\\:items-stretch:where([data-orientation=vertical]){align-items:stretch}.tw\\:data-vertical\\:self-stretch:where([data-orientation=vertical]){align-self:stretch}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:mt-0 [data-lexical-editor=true]>blockquote{margin-top:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:border-s-0 [data-lexical-editor=true]>blockquote{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:ps-0 [data-lexical-editor=true]>blockquote{padding-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:font-normal [data-lexical-editor=true]>blockquote{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:text-foreground [data-lexical-editor=true]>blockquote{color:var(--foreground)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:not-italic [data-lexical-editor=true]>blockquote{font-style:normal}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:mt-0 [data-lexical-editor=\\"true\\"]>blockquote{margin-top:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:border-s-0 [data-lexical-editor=\\"true\\"]>blockquote{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:ps-0 [data-lexical-editor=\\"true\\"]>blockquote{padding-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:font-normal [data-lexical-editor=\\"true\\"]>blockquote{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:text-foreground [data-lexical-editor=\\"true\\"]>blockquote{color:var(--foreground)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:not-italic [data-lexical-editor=\\"true\\"]>blockquote{font-style:normal}.tw\\:\\[\\&_a\\]\\:underline a{text-decoration-line:underline}.tw\\:\\[\\&_a\\]\\:underline-offset-3 a{text-underline-offset:3px}@media (hover:hover){.tw\\:\\[\\&_a\\]\\:hover\\:text-foreground a:hover{color:var(--foreground)}}.tw\\:\\[\\&_p\\]\\:my-0 p{margin-block:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_p\\:not\\(\\:last-child\\)\\]\\:mb-4 p:not(:last-child){margin-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&_s\\]\\:text-destructive s{color:var(--destructive)}.tw\\:\\[\\&_s\\]\\:line-through s{text-decoration-line:line-through}.tw\\:\\[\\&_svg\\]\\:pointer-events-none svg{pointer-events:none}.tw\\:\\[\\&_svg\\]\\:size-4 svg{width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&_svg\\]\\:shrink-0 svg{flex-shrink:0}.tw\\:\\[\\&_svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-3 svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:\\[\\&_svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-3\\.5 svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 3.5);height:calc(calc(var(--spacing)) * 3.5)}.tw\\:\\[\\&_svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-4 svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&_tr\\]\\:border-b tr{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}.tw\\:\\[\\&_tr\\:last-child\\]\\:border-0 tr:last-child{border-style:var(--tw-border-style);border-width:0}.tw\\:\\[\\&_u\\]\\:font-semibold u{--tw-font-weight:var(--tw-font-weight-semibold);font-weight:var(--tw-font-weight-semibold)}.tw\\:\\[\\&_u\\]\\:text-success-foreground u{color:var(--success-foreground)}.tw\\:\\[\\&_u\\]\\:no-underline u{text-decoration-line:none}.tw\\:\\[\\&\\:has\\(\\[role\\=checkbox\\]\\)\\]\\:pe-0:has([role=checkbox]){padding-inline-end:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\.border-b\\]\\:pb-2.border-b{padding-bottom:calc(calc(var(--spacing)) * 2)}.tw\\:\\[\\.border-b\\]\\:pb-4.border-b{padding-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[size\\=sm\\]\\/card\\:\\[\\.border-b\\]\\:pb-3:is(:where(.tw\\:group\\/card)[data-size=sm] *).border-b{padding-bottom:calc(calc(var(--spacing)) * 3)}.tw\\:\\[\\.border-t\\]\\:pt-2.border-t{padding-top:calc(calc(var(--spacing)) * 2)}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:px-2 *)[cmdk-group-heading]{padding-inline:calc(calc(var(--spacing)) * 2)}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:py-1\\.5 *)[cmdk-group-heading]{padding-block:calc(calc(var(--spacing)) * 1.5)}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:text-xs *)[cmdk-group-heading]{font-size:var(--tw-text-xs);line-height:var(--tw-leading,var(--tw-text-xs--line-height))}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:font-medium *)[cmdk-group-heading]{--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:text-muted-foreground *)[cmdk-group-heading]{color:var(--muted-foreground)}:is(.tw\\:\\*\\:\\[a\\]\\:underline>*):is(a){text-decoration-line:underline}:is(.tw\\:\\*\\:\\[a\\]\\:underline-offset-3>*):is(a){text-underline-offset:3px}@media (hover:hover){.tw\\:\\[a\\]\\:hover\\:bg-destructive\\/20:is(a):hover{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:\\[a\\]\\:hover\\:bg-destructive\\/20:is(a):hover{background-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:\\[a\\]\\:hover\\:bg-muted:is(a):hover{background-color:var(--muted)}.tw\\:\\[a\\]\\:hover\\:bg-primary\\/80:is(a):hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:\\[a\\]\\:hover\\:bg-primary\\/80:is(a):hover{background-color:color-mix(in oklab, var(--primary) 80%, transparent)}}.tw\\:\\[a\\]\\:hover\\:bg-secondary\\/80:is(a):hover{background-color:var(--secondary)}@supports (color:color-mix(in lab, red, red)){.tw\\:\\[a\\]\\:hover\\:bg-secondary\\/80:is(a):hover{background-color:color-mix(in oklab, var(--secondary) 80%, transparent)}}.tw\\:\\[a\\]\\:hover\\:text-muted-foreground:is(a):hover{color:var(--muted-foreground)}:is(.tw\\:\\*\\:\\[a\\]\\:hover\\:text-foreground>*):is(a):hover{color:var(--foreground)}}:is(.tw\\:\\*\\:\\[img\\]\\:row-span-2>*):is(img){grid-row:span 2/span 2}:is(.tw\\:\\*\\:\\[img\\]\\:translate-y-0\\.5>*):is(img){--tw-translate-y:calc(calc(var(--spacing)) * .5);translate:var(--tw-translate-x) var(--tw-translate-y)}:is(.tw\\:\\*\\:\\[img\\]\\:text-current>*):is(img){color:currentColor}:is(.tw\\:\\*\\:\\[img\\:first-child\\]\\:rounded-t-xl>*):is(img:first-child){border-top-left-radius:calc(var(--radius) * 1.4);border-top-right-radius:calc(var(--radius) * 1.4)}:is(.tw\\:\\*\\:\\[img\\:last-child\\]\\:rounded-b-xl>*):is(img:last-child){border-bottom-right-radius:calc(var(--radius) * 1.4);border-bottom-left-radius:calc(var(--radius) * 1.4)}:is(.tw\\:\\*\\:\\[img\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-4>*):is(img:not([class*=size-])){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}:is(.tw\\:\\*\\:\\[span\\]\\:last\\:flex>*):is(span):last-child{display:flex}:is(.tw\\:\\*\\:\\[span\\]\\:last\\:items-center>*):is(span):last-child{align-items:center}:is(.tw\\:\\*\\:\\[span\\]\\:last\\:gap-2>*):is(span):last-child{gap:calc(calc(var(--spacing)) * 2)}:is(.tw\\:\\*\\:\\[svg\\]\\:row-span-2>*):is(svg){grid-row:span 2/span 2}:is(.tw\\:\\*\\:\\[svg\\]\\:translate-y-0\\.5>*):is(svg){--tw-translate-y:calc(calc(var(--spacing)) * .5);translate:var(--tw-translate-x) var(--tw-translate-y)}:is(.tw\\:\\*\\:\\[svg\\]\\:text-current>*):is(svg){color:currentColor}:is(.tw\\:focus\\:\\*\\:\\[svg\\]\\:text-accent-foreground:focus>*):is(svg){color:var(--accent-foreground)}:is(.tw\\:data-\\[variant\\=destructive\\]\\:\\*\\:\\[svg\\]\\:text-destructive[data-variant=destructive]>*):is(svg){color:var(--destructive)}:is(.tw\\:data-\\[variant\\=destructive\\]\\:\\*\\:\\[svg\\]\\:text-destructive\\![data-variant=destructive]>*):is(svg){color:var(--destructive)!important}:is(.tw\\:data-selected\\:\\*\\:\\[svg\\]\\:text-foreground:where([data-selected=true])>*):is(svg){color:var(--foreground)}:is(.tw\\:\\*\\:\\[svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-4>*):is(svg:not([class*=size-])){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:rounded-s-none>:not(:first-child){border-start-start-radius:0;border-end-start-radius:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:rounded-t-none>:not(:first-child){border-top-left-radius:0;border-top-right-radius:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:border-s-0>:not(:first-child){border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:border-t-0>:not(:first-child){border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:last-child\\)\\]\\:rounded-e-none>:not(:last-child){border-start-end-radius:0;border-end-end-radius:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:last-child\\)\\]\\:rounded-b-none>:not(:last-child){border-bottom-right-radius:0;border-bottom-left-radius:0}.tw\\:has-\\[select\\[aria-hidden\\=true\\]\\:last-child\\]\\:\\[\\&\\>\\[data-slot\\=select-trigger\\]\\:last-of-type\\]\\:rounded-e-lg:has(:is(select[aria-hidden=true]:last-child))>[data-slot=select-trigger]:last-of-type{border-start-end-radius:var(--radius);border-end-end-radius:var(--radius)}.tw\\:\\[\\&\\>\\[data-slot\\=select-trigger\\]\\:not\\(\\[class\\*\\=w-\\]\\)\\]\\:w-fit>[data-slot=select-trigger]:not([class*=w-]){width:fit-content}.tw\\:\\[\\&\\>\\[data-slot\\]\\:not\\(\\:has\\(\\~\\[data-slot\\]\\)\\)\\]\\:rounded-e-lg\\!>[data-slot]:not(:has(~[data-slot])){border-start-end-radius:var(--radius)!important;border-end-end-radius:var(--radius)!important}.tw\\:\\[\\&\\>\\[data-slot\\]\\:not\\(\\:has\\(\\~\\[data-slot\\]\\)\\)\\]\\:rounded-b-lg\\!>[data-slot]:not(:has(~[data-slot])){border-bottom-right-radius:var(--radius)!important;border-bottom-left-radius:var(--radius)!important}.tw\\:\\[\\&\\>a\\]\\:underline>a{text-decoration-line:underline}.tw\\:\\[\\&\\>a\\]\\:underline-offset-4>a{text-underline-offset:4px}.tw\\:\\[\\&\\>a\\:hover\\]\\:text-primary>a:hover{color:var(--primary)}.tw\\:\\[\\&\\>blockquote\\]\\:my-0>blockquote{margin-block:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&\\>blockquote\\]\\:border-s-0>blockquote{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&\\>blockquote\\]\\:p-0>blockquote{padding:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&\\>blockquote\\]\\:ps-0>blockquote{padding-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&\\>blockquote\\]\\:font-normal>blockquote{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:\\[\\&\\>blockquote\\]\\:text-foreground>blockquote{color:var(--foreground)}.tw\\:\\[\\&\\>blockquote\\]\\:not-italic>blockquote{font-style:normal}.tw\\:\\[\\&\\>input\\]\\:flex-1>input{flex:1}.tw\\:has-\\[\\>\\[data-align\\=block-end\\]\\]\\:\\[\\&\\>input\\]\\:pt-3:has(>[data-align=block-end])>input{padding-top:calc(calc(var(--spacing)) * 3)}.tw\\:has-\\[\\>\\[data-align\\=block-start\\]\\]\\:\\[\\&\\>input\\]\\:pb-3:has(>[data-align=block-start])>input{padding-bottom:calc(calc(var(--spacing)) * 3)}.tw\\:has-\\[\\>\\[data-align\\=inline-end\\]\\]\\:\\[\\&\\>input\\]\\:pe-1\\.5:has(>[data-align=inline-end])>input{padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-\\[\\>\\[data-align\\=inline-start\\]\\]\\:\\[\\&\\>input\\]\\:ps-1\\.5:has(>[data-align=inline-start])>input{padding-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:\\[\\&\\>kbd\\]\\:rounded-\\[calc\\(var\\(--radius\\)-5px\\)\\]>kbd{border-radius:calc(var(--radius) - 5px)}.tw\\:\\[\\&\\>li\\]\\:mt-2>li{margin-top:calc(calc(var(--spacing)) * 2)}.tw\\:\\[\\&\\>span\\:last-child\\]\\:truncate>span:last-child{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.tw\\:\\[\\&\\>svg\\]\\:pointer-events-none>svg{pointer-events:none}.tw\\:\\[\\&\\>svg\\]\\:hidden>svg{display:none}.tw\\:\\[\\&\\>svg\\]\\:size-3\\!>svg{width:calc(calc(var(--spacing)) * 3)!important;height:calc(calc(var(--spacing)) * 3)!important}.tw\\:\\[\\&\\>svg\\]\\:size-3\\.5>svg{width:calc(calc(var(--spacing)) * 3.5);height:calc(calc(var(--spacing)) * 3.5)}.tw\\:\\[\\&\\>svg\\]\\:size-4>svg{width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&\\>svg\\]\\:shrink-0>svg{flex-shrink:0}.tw\\:\\[\\&\\>svg\\]\\:text-sidebar-accent-foreground>svg{color:var(--sidebar-accent-foreground)}.tw\\:group-has-data-\\[size\\=lg\\]\\/avatar-group\\:\\[\\&\\>svg\\]\\:size-5:is(:where(.tw\\:group\\/avatar-group):has([data-size=lg]) *)>svg{width:calc(calc(var(--spacing)) * 5);height:calc(calc(var(--spacing)) * 5)}.tw\\:group-has-data-\\[size\\=sm\\]\\/avatar-group\\:\\[\\&\\>svg\\]\\:size-3:is(:where(.tw\\:group\\/avatar-group):has([data-size=sm]) *)>svg{width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[size\\=default\\]\\/avatar\\:\\[\\&\\>svg\\]\\:size-2:is(:where(.tw\\:group\\/avatar)[data-size=default] *)>svg,.tw\\:group-data-\\[size\\=lg\\]\\/avatar\\:\\[\\&\\>svg\\]\\:size-2:is(:where(.tw\\:group\\/avatar)[data-size=lg] *)>svg{width:calc(calc(var(--spacing)) * 2);height:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[size\\=sm\\]\\/avatar\\:\\[\\&\\>svg\\]\\:hidden:is(:where(.tw\\:group\\/avatar)[data-size=sm] *)>svg,.tw\\:\\[\\&\\>svg\\:last-child\\]\\:hidden>svg:last-child{display:none}.tw\\:\\[\\&\\>svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-3\\.5>svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 3.5);height:calc(calc(var(--spacing)) * 3.5)}.tw\\:\\[\\&\\>svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-4>svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&\\>tr\\]\\:last\\:border-b-0>tr:last-child{border-bottom-style:var(--tw-border-style);border-bottom-width:0}.tw\\:\\[\\&\\[align\\=center\\]\\]\\:text-center[align=center]{text-align:center}.tw\\:\\[\\&\\[align\\=right\\]\\]\\:text-right[align=right]{text-align:right}.tw\\:\\[\\&\\[aria-orientation\\=horizontal\\]\\>div\\]\\:rotate-90[aria-orientation=horizontal]>div{rotate:90deg}[data-side=primary][data-collapsible=offcanvas] .tw\\:\\[\\[data-side\\=primary\\]\\[data-collapsible\\=offcanvas\\]_\\&\\]\\:-end-2{inset-inline-end:calc(calc(var(--spacing)) * -2)}[data-side=primary][data-state=collapsed] .tw\\:\\[\\[data-side\\=primary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-e-resize{cursor:e-resize}[data-side=primary][data-state=collapsed] .tw\\:rtl\\:\\[\\[data-side\\=primary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-w-resize:where(:dir(rtl),[dir=rtl],[dir=rtl] *){cursor:w-resize}[data-side=secondary][data-collapsible=offcanvas] .tw\\:\\[\\[data-side\\=secondary\\]\\[data-collapsible\\=offcanvas\\]_\\&\\]\\:-start-2{inset-inline-start:calc(calc(var(--spacing)) * -2)}[data-side=secondary][data-state=collapsed] .tw\\:\\[\\[data-side\\=secondary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-w-resize{cursor:w-resize}[data-side=secondary][data-state=collapsed] .tw\\:rtl\\:\\[\\[data-side\\=secondary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-e-resize:where(:dir(rtl),[dir=rtl],[dir=rtl] *){cursor:e-resize}}@property --tw-animation-delay{syntax:"*";inherits:false;initial-value:0s}@property --tw-animation-direction{syntax:"*";inherits:false;initial-value:normal}@property --tw-animation-duration{syntax:"*";inherits:false}@property --tw-animation-fill-mode{syntax:"*";inherits:false;initial-value:none}@property --tw-animation-iteration-count{syntax:"*";inherits:false;initial-value:1}@property --tw-enter-blur{syntax:"*";inherits:false;initial-value:0}@property --tw-enter-opacity{syntax:"*";inherits:false;initial-value:1}@property --tw-enter-rotate{syntax:"*";inherits:false;initial-value:0}@property --tw-enter-scale{syntax:"*";inherits:false;initial-value:1}@property --tw-enter-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-enter-translate-y{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-blur{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-opacity{syntax:"*";inherits:false;initial-value:1}@property --tw-exit-rotate{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-scale{syntax:"*";inherits:false;initial-value:1}@property --tw-exit-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-translate-y{syntax:"*";inherits:false;initial-value:0}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-cyrillic-ext-wght-normal.woff2)format("woff2-variations");unicode-range:U+460-52F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-cyrillic-wght-normal.woff2)format("woff2-variations");unicode-range:U+301,U+400-45F,U+490-491,U+4B0-4B1,U+2116}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-greek-wght-normal.woff2)format("woff2-variations");unicode-range:U+370-377,U+37A-37F,U+384-38A,U+38C,U+38E-3A1,U+3A3-3FF}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-vietnamese-wght-normal.woff2)format("woff2-variations");unicode-range:U+102-103,U+110-111,U+128-129,U+168-169,U+1A0-1A1,U+1AF-1B0,U+300-301,U+303-304,U+308-309,U+323,U+329,U+1EA0-1EF9,U+20AB}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-latin-ext-wght-normal.woff2)format("woff2-variations");unicode-range:U+100-2BA,U+2BD-2C5,U+2C7-2CC,U+2CE-2D7,U+2DD-2FF,U+304,U+308,U+329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-latin-wght-normal.woff2)format("woff2-variations");unicode-range:U+??,U+131,U+152-153,U+2BB-2BC,U+2C6,U+2DA,U+2DC,U+304,U+308,U+329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}.light,:root{--radius:.625rem;--spacing:.25rem;--background:oklch(100% 0 0);--foreground:oklch(13.71% .036 258.53);--card:oklch(100% 0 0);--card-foreground:oklch(13.71% .036 258.53);--popover:oklch(98.43% .0018 248.56);--popover-foreground:oklch(13.71% .036 258.53);--primary:oklch(20.79% .0399 265.73);--primary-foreground:oklch(98.38% .0036 248.23);--secondary:oklch(95.89% .011 248.06);--secondary-foreground:oklch(20.79% .0399 265.73);--muted:oklch(95.89% .011 248.06);--muted-foreground:oklch(55.47% .0408 257.45);--accent:oklch(95.89% .011 248.06);--accent-foreground:oklch(20.79% .0399 265.73);--destructive:oklch(63.69% .2077 25.32);--destructive-foreground:oklch(98.38% .0036 248.23);--success-foreground:oklch(62.7% .194 149.214);--diff-deleted:oklch(57.7% .245 27.325);--warning:oklch(84% .16 84);--warning-foreground:oklch(28% .07 46);--border:oklch(92.9% .0127 255.58);--input:oklch(92.9% .0127 255.58);--ring:oklch(13.71% .036 258.53);--chart-1:oklch(64.6% .222 41.116);--chart-2:oklch(60% .118 184.704);--chart-3:oklch(39.8% .07 227.392);--chart-4:oklch(82.8% .189 84.429);--chart-5:oklch(76.9% .188 70.08);--sidebar:oklch(98.43% .0018 248.56);--sidebar-foreground:oklch(13.71% .036 258.53);--sidebar-primary:oklch(20.79% .0399 265.73);--sidebar-primary-foreground:oklch(98.38% .0036 248.23);--sidebar-accent:oklch(95.89% .011 248.06);--sidebar-accent-foreground:oklch(20.79% .0399 265.73);--sidebar-border:oklch(92.9% .0127 255.58);--sidebar-ring:oklch(13.71% .036 258.53)}.dark{--background:oklch(13.71% .036 258.53);--foreground:oklch(98.38% .0036 248.23);--card:oklch(13.71% .036 258.53);--card-foreground:oklch(98.38% .0036 248.23);--popover:oklch(13.71% .036 258.53);--popover-foreground:oklch(98.38% .0036 248.23);--primary:oklch(98.38% .0036 248.23);--primary-foreground:oklch(20.79% .0399 265.73);--secondary:oklch(28% .037 259.98);--secondary-foreground:oklch(98.38% .0036 248.23);--muted:oklch(28% .037 259.98);--muted-foreground:oklch(71.07% .0351 256.8);--accent:oklch(28% .037 259.98);--accent-foreground:oklch(98.38% .0036 248.23);--destructive:oklch(39.6% .1331 25.71);--destructive-foreground:oklch(98.38% .0036 248.23);--success-foreground:oklch(79.2% .209 151.711);--diff-deleted:oklch(70.4% .191 22.216);--warning:oklch(41% .11 46);--warning-foreground:oklch(99% .02 95);--border:oklch(44.54% .0374 257.3);--input:oklch(44.54% .0374 257.3);--ring:oklch(86.88% .0199 252.89);--chart-1:oklch(48.8% .243 264.376);--chart-2:oklch(69.6% .17 162.48);--chart-3:oklch(76.9% .188 70.08);--chart-4:oklch(62.7% .265 303.9);--chart-5:oklch(64.5% .246 16.439);--sidebar:oklch(13.71% .036 258.53);--sidebar-foreground:oklch(71.07% .0351 256.8);--sidebar-primary:oklch(98.38% .0036 248.23);--sidebar-primary-foreground:oklch(20.79% .0399 265.73);--sidebar-accent:oklch(28% .037 259.98);--sidebar-accent-foreground:oklch(71.07% .0351 256.8);--sidebar-border:oklch(28% .037 259.98);--sidebar-ring:oklch(86.88% .0199 252.89)}.paratext-light{--background:oklch(100% 0 0);--foreground:oklch(15.3% .006 107.1);--card:oklch(100% 0 0);--card-foreground:oklch(15.3% .006 107.1);--popover:oklch(100% 0 0);--popover-foreground:oklch(15.3% .006 107.1);--primary:oklch(55.5% .163 48.998);--primary-foreground:oklch(98.7% .022 95.277);--secondary:oklch(96.7% .001 286.375);--secondary-foreground:oklch(21% .006 285.885);--muted:oklch(96.6% .005 106.5);--muted-foreground:oklch(58% .031 107.3);--accent:oklch(96.6% .005 106.5);--accent-foreground:oklch(22.8% .013 107.4);--destructive:oklch(57.7% .245 27.325);--destructive-foreground:oklch(98.38% .0036 248.23);--success-foreground:oklch(62.7% .194 149.214);--diff-deleted:oklch(57.7% .245 27.325);--warning:oklch(84% .16 84);--warning-foreground:oklch(28% .07 46);--border:oklch(93% .007 106.5);--input:oklch(93% .007 106.5);--ring:oklch(73.7% .021 106.9);--chart-1:oklch(88% .011 106.6);--chart-2:oklch(58% .031 107.3);--chart-3:oklch(46.6% .025 107.3);--chart-4:oklch(39.4% .023 107.4);--chart-5:oklch(28.6% .016 107.4);--sidebar:oklch(98.8% .003 106.5);--sidebar-foreground:oklch(15.3% .006 107.1);--sidebar-primary:oklch(66.6% .179 58.318);--sidebar-primary-foreground:oklch(98.7% .022 95.277);--sidebar-accent:oklch(96.6% .005 106.5);--sidebar-accent-foreground:oklch(22.8% .013 107.4);--sidebar-border:oklch(93% .007 106.5);--sidebar-ring:oklch(73.7% .021 106.9)}.paratext-dark{--background:oklch(15.3% .006 107.1);--foreground:oklch(98.8% .003 106.5);--card:oklch(22.8% .013 107.4);--card-foreground:oklch(98.8% .003 106.5);--popover:oklch(22.8% .013 107.4);--popover-foreground:oklch(98.8% .003 106.5);--primary:oklch(47.3% .137 46.201);--primary-foreground:oklch(98.7% .022 95.277);--secondary:oklch(27.4% .006 286.033);--secondary-foreground:oklch(98.5% 0 0);--muted:oklch(28.6% .016 107.4);--muted-foreground:oklch(73.7% .021 106.9);--accent:oklch(28.6% .016 107.4);--accent-foreground:oklch(98.8% .003 106.5);--destructive:oklch(70.4% .191 22.216);--destructive-foreground:oklch(98.38% .0036 248.23);--success-foreground:oklch(79.2% .209 151.711);--diff-deleted:oklch(70.4% .191 22.216);--warning:oklch(41% .11 46);--warning-foreground:oklch(99% .02 95);--border:oklch(100% 0 0/.1);--input:oklch(100% 0 0/.15);--ring:oklch(58% .031 107.3);--chart-1:oklch(88% .011 106.6);--chart-2:oklch(58% .031 107.3);--chart-3:oklch(46.6% .025 107.3);--chart-4:oklch(39.4% .023 107.4);--chart-5:oklch(28.6% .016 107.4);--sidebar:oklch(22.8% .013 107.4);--sidebar-foreground:oklch(98.8% .003 106.5);--sidebar-primary:oklch(76.9% .188 70.08);--sidebar-primary-foreground:oklch(27.9% .077 45.635);--sidebar-accent:oklch(28.6% .016 107.4);--sidebar-accent-foreground:oklch(98.8% .003 106.5);--sidebar-border:oklch(100% 0 0/.1);--sidebar-ring:oklch(58% .031 107.3)}@property --tw-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-y{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-z{syntax:"*";inherits:false;initial-value:0}@property --tw-rotate-x{syntax:"*";inherits:false}@property --tw-rotate-y{syntax:"*";inherits:false}@property --tw-rotate-z{syntax:"*";inherits:false}@property --tw-skew-x{syntax:"*";inherits:false}@property --tw-skew-y{syntax:"*";inherits:false}@property --tw-space-y-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-space-x-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-divide-x-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-border-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-divide-y-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-gradient-position{syntax:"*";inherits:false}@property --tw-gradient-from{syntax:"<color>";inherits:false;initial-value:#0000}@property --tw-gradient-via{syntax:"<color>";inherits:false;initial-value:#0000}@property --tw-gradient-to{syntax:"<color>";inherits:false;initial-value:#0000}@property --tw-gradient-stops{syntax:"*";inherits:false}@property --tw-gradient-via-stops{syntax:"*";inherits:false}@property --tw-gradient-from-position{syntax:"<length-percentage>";inherits:false;initial-value:0%}@property --tw-gradient-via-position{syntax:"<length-percentage>";inherits:false;initial-value:50%}@property --tw-gradient-to-position{syntax:"<length-percentage>";inherits:false;initial-value:100%}@property --tw-leading{syntax:"*";inherits:false}@property --tw-font-weight{syntax:"*";inherits:false}@property --tw-tracking{syntax:"*";inherits:false}@property --tw-ordinal{syntax:"*";inherits:false}@property --tw-slashed-zero{syntax:"*";inherits:false}@property --tw-numeric-figure{syntax:"*";inherits:false}@property --tw-numeric-spacing{syntax:"*";inherits:false}@property --tw-numeric-fraction{syntax:"*";inherits:false}@property --tw-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-shadow-color{syntax:"*";inherits:false}@property --tw-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-inset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-shadow-color{syntax:"*";inherits:false}@property --tw-inset-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-ring-color{syntax:"*";inherits:false}@property --tw-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-ring-color{syntax:"*";inherits:false}@property --tw-inset-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-ring-inset{syntax:"*";inherits:false}@property --tw-ring-offset-width{syntax:"<length>";inherits:false;initial-value:0}@property --tw-ring-offset-color{syntax:"*";inherits:false;initial-value:#fff}@property --tw-ring-offset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-blur{syntax:"*";inherits:false}@property --tw-brightness{syntax:"*";inherits:false}@property --tw-contrast{syntax:"*";inherits:false}@property --tw-grayscale{syntax:"*";inherits:false}@property --tw-hue-rotate{syntax:"*";inherits:false}@property --tw-invert{syntax:"*";inherits:false}@property --tw-opacity{syntax:"*";inherits:false}@property --tw-saturate{syntax:"*";inherits:false}@property --tw-sepia{syntax:"*";inherits:false}@property --tw-drop-shadow{syntax:"*";inherits:false}@property --tw-drop-shadow-color{syntax:"*";inherits:false}@property --tw-drop-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-drop-shadow-size{syntax:"*";inherits:false}@property --tw-duration{syntax:"*";inherits:false}@property --tw-ease{syntax:"*";inherits:false}@property --tw-content{syntax:"*";inherits:false;initial-value:""}@property --tw-outline-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-backdrop-blur{syntax:"*";inherits:false}@property --tw-backdrop-brightness{syntax:"*";inherits:false}@property --tw-backdrop-contrast{syntax:"*";inherits:false}@property --tw-backdrop-grayscale{syntax:"*";inherits:false}@property --tw-backdrop-hue-rotate{syntax:"*";inherits:false}@property --tw-backdrop-invert{syntax:"*";inherits:false}@property --tw-backdrop-opacity{syntax:"*";inherits:false}@property --tw-backdrop-saturate{syntax:"*";inherits:false}@property --tw-backdrop-sepia{syntax:"*";inherits:false}@keyframes spin{to{transform:rotate(360deg)}}@keyframes pulse{50%{opacity:.5}}@keyframes enter{0%{opacity:var(--tw-enter-opacity,1);transform:translate3d(var(--tw-enter-translate-x,0),var(--tw-enter-translate-y,0),0)scale3d(var(--tw-enter-scale,1),var(--tw-enter-scale,1),var(--tw-enter-scale,1))rotate(var(--tw-enter-rotate,0));filter:blur(var(--tw-enter-blur,0))}}@keyframes exit{to{opacity:var(--tw-exit-opacity,1);transform:translate3d(var(--tw-exit-translate-x,0),var(--tw-exit-translate-y,0),0)scale3d(var(--tw-exit-scale,1),var(--tw-exit-scale,1),var(--tw-exit-scale,1))rotate(var(--tw-exit-rotate,0));filter:blur(var(--tw-exit-blur,0))}}
`, "after-all");
export {
  am as Alert,
  om as AlertDescription,
  nm as AlertTitle,
  fu as Avatar,
  mu as AvatarFallback,
  ug as AvatarImage,
  Jh as BOOK_CHAPTER_CONTROL_STRING_KEYS,
  Qh as BOOK_SELECTOR_STRING_KEYS,
  ea as Badge,
  Ja as BookChapterControl,
  No as BookSelectionMode,
  tg as BookSelector,
  rt as Button,
  Va as ButtonGroup,
  Oo as ButtonGroupSeparator,
  im as ButtonGroupText,
  hs as CANCEL_ACCEPT_BUTTONS_STRING_KEYS,
  ng as COMMENT_EDITOR_STRING_KEYS,
  pu as COMMENT_LIST_ELEMENT_ID,
  ig as COMMENT_LIST_STRING_KEYS,
  ag as CONFLICT_NOTE_STRING_KEYS,
  ds as CONTENT_ZOOM_LABEL_ATTRIBUTE,
  ls as CONTENT_ZOOM_ROOT_ATTRIBUTE,
  eg as CONTENT_ZOOM_SCOPE_ATTRIBUTE,
  gs as CancelAcceptButtons,
  hu as Card,
  gu as CardContent,
  dg as CardDescription,
  wg as CardFooter,
  cg as CardHeader,
  lg as CardTitle,
  Wd as ChapterRangeSelector,
  Cs as Checkbox,
  df as CheckboxGroup,
  mh as Checklist,
  Cn as ComboBox,
  Cr as Command,
  La as CommandEmpty,
  ur as CommandGroup,
  $a as CommandInput,
  gr as CommandItem,
  Er as CommandList,
  og as CommentEditor,
  pg as CommentList,
  yu as ConflictNoteCard,
  Tu as ContentZoomRoot,
  rg as ContentZoomTextProvider,
  gf as ContextMenu,
  Cf as ContextMenuCheckboxItem,
  yf as ContextMenuContent,
  mf as ContextMenuGroup,
  kf as ContextMenuItem,
  Tf as ContextMenuLabel,
  vf as ContextMenuPortal,
  xf as ContextMenuRadioGroup,
  Ef as ContextMenuRadioItem,
  Rf as ContextMenuSeparator,
  Sf as ContextMenuShortcut,
  bf as ContextMenuSub,
  Nf as ContextMenuSubContent,
  _f as ContextMenuSubTrigger,
  ff as ContextMenuTrigger,
  Mu as DataTable,
  wf as DestructiveKeyConfirmation,
  wo as Dialog,
  sm as DialogClose,
  uo as DialogContent,
  cm as DialogDescription,
  cn as DialogFooter,
  po as DialogHeader,
  lm as DialogOverlay,
  dm as DialogPortal,
  ho as DialogTitle,
  wm as DialogTrigger,
  Hp as DisabledActionTooltip,
  na as DisabledTooltipWrapper,
  Of as Drawer,
  If as DrawerClose,
  Mf as DrawerContent,
  $f as DrawerDescription,
  Pf as DrawerFooter,
  zf as DrawerHeader,
  xh as DrawerOverlay,
  bh as DrawerPortal,
  Af as DrawerTitle,
  Df as DrawerTrigger,
  tr as DropdownMenu,
  wr as DropdownMenuCheckboxItem,
  er as DropdownMenuContent,
  ri as DropdownMenuGroup,
  cr as DropdownMenuItem,
  Au as DropdownMenuItemType,
  kr as DropdownMenuLabel,
  pc as DropdownMenuPortal,
  Ws as DropdownMenuRadioGroup,
  Ys as DropdownMenuRadioItem,
  br as DropdownMenuSeparator,
  dc as DropdownMenuShortcut,
  uc as DropdownMenuSub,
  hc as DropdownMenuSubContent,
  wc as DropdownMenuSubTrigger,
  Ke as DropdownMenuTrigger,
  zu as ERROR_DUMP_STRING_KEYS,
  mg as ERROR_POPOVER_STRING_KEYS,
  Uu as EditorKeyboardShortcuts,
  um as Empty,
  pm as EmptyContent,
  hm as EmptyDescription,
  gm as EmptyHeader,
  fm as EmptyMedia,
  mm as EmptyState,
  vm as EmptyTitle,
  Pu as ErrorDump,
  vg as ErrorPopover,
  Ng as FOOTNOTE_EDITOR_STRING_KEYS,
  kg as Filter,
  bg as FilterDropdown,
  yg as Footer,
  _g as FootnoteEditor,
  pp as FootnoteItem,
  Cg as FootnoteList,
  cp as INLINE_APPLY_DEBOUNCE_MS,
  cf as INTERFACE_LANGUAGE_PICKER_STRING_KEYS,
  Ig as INVENTORY_STRING_KEYS,
  Ba as Input,
  lf as InterfaceLanguagePicker,
  Mg as Inventory,
  go as Kbd,
  bm as KbdGroup,
  $t as Label,
  Ju as MARKER_MENU_STRING_KEYS,
  fg as MarkdownRenderer,
  ep as MarkerMenu,
  xg as MoreInfo,
  Zs as MultiSelectComboBox,
  af as NavigationContentSearch,
  _r as Popover,
  ec as PopoverAnchor,
  Nr as PopoverContent,
  xm as PopoverDescription,
  ym as PopoverHeader,
  Ga as PopoverPortalContainerProvider,
  km as PopoverTitle,
  jr as PopoverTrigger,
  Vf as Progress,
  Do as RadioGroup,
  Ta as RadioGroupItem,
  Ad as RecentSearches,
  _m as ResizableHandle,
  Nm as ResizablePanel,
  Cm as ResizablePanelGroup,
  uf as ResultsCard,
  Em as RetryableErrorView,
  Yg as SCOPE_SELECTOR_STRING_KEYS,
  Wp as SELECT_BOOKS_STRING_KEYS,
  Qr as SHRINK_STEP,
  Zg as ScopeSelector,
  Wg as ScriptureResultsViewer,
  Xg as ScrollGroupSelector,
  ni as SearchBar,
  $r as Select,
  Gp as SelectBooks,
  Kp as SelectBooksPicker,
  Br as SelectContent,
  Su as SelectGroup,
  Ae as SelectItem,
  hg as SelectLabel,
  Du as SelectScrollDownButton,
  Ou as SelectScrollUpButton,
  gg as SelectSeparator,
  Lr as SelectTrigger,
  Vr as SelectValue,
  ra as Separator,
  Jg as SettingsList,
  tf as SettingsListHeader,
  Qg as SettingsListItem,
  Ap as SettingsSidebar,
  Gg as SettingsSidebarContentSearch,
  Fa as ShrinkStepContext,
  Qf as ShrinkStepOverride,
  Vi as ShrinkStepOverrideContext,
  Sp as Sidebar,
  Dp as SidebarContent,
  Vg as SidebarFooter,
  Wn as SidebarGroup,
  Bg as SidebarGroupAction,
  Zn as SidebarGroupContent,
  Yn as SidebarGroupLabel,
  $g as SidebarHeader,
  Ag as SidebarInput,
  Op as SidebarInset,
  Ip as SidebarMenu,
  jg as SidebarMenuAction,
  Fg as SidebarMenuBadge,
  Pp as SidebarMenuButton,
  Mp as SidebarMenuItem,
  Ug as SidebarMenuSkeleton,
  Kg as SidebarMenuSub,
  qg as SidebarMenuSubButton,
  Hg as SidebarMenuSubItem,
  Rp as SidebarProvider,
  Pg as SidebarRail,
  Lg as SidebarSeparator,
  zg as SidebarTrigger,
  Ir as Skeleton,
  Bf as Slider,
  Lf as Sonner,
  Tm as Spinner,
  jf as Switch,
  tm as TOOLTIP_DELAY_MS,
  Ro as TabDropdownMenu,
  rf as TabFloatingMenu,
  ef as TabToolbar,
  Mo as Table,
  Po as TableBody,
  Rm as TableCaption,
  Mr as TableCell,
  Sm as TableFooter,
  Ra as TableHead,
  zo as TableHeader,
  lr as TableRow,
  Ff as Tabs,
  Hf as TabsContent,
  Uf as TabsList,
  Kf as TabsTrigger,
  pf as TextField,
  Zh as Textarea,
  cs as ToggleGroup,
  ka as ToggleGroupItem,
  nf as Toolbar,
  Id as ToolbarCompoundLabel,
  vt as Tooltip,
  xt as TooltipContent,
  Om as TooltipPortalContainerProvider,
  Vt as TooltipProvider,
  bt as TooltipTrigger,
  ju as UNDO_REDO_BUTTONS_STRING_KEYS,
  sf as UiLanguageSelector,
  Fu as UndoRedoButtons,
  zs as VerticalTabs,
  As as VerticalTabsContent,
  Ps as VerticalTabsList,
  Qp as VerticalTabsTrigger,
  hf as WizardStepper,
  rr as Z_INDEX_ABOVE_DOCK,
  ai as Z_INDEX_ABOVE_POPOVER,
  Dm as Z_INDEX_CONNECTION_LOST,
  Im as Z_INDEX_FIRST_RUN,
  Mm as Z_INDEX_MODAL,
  zm as Z_INDEX_MODAL_BACKDROP,
  Pm as Z_INDEX_NESTED_MODAL,
  Am as Z_INDEX_NESTED_MODAL_BACKDROP,
  $m as Z_INDEX_ONBOARDING_TOUR,
  Vm as Z_INDEX_OVERLAY,
  Lm as badgeVariants,
  Bm as buttonGroupVariants,
  jm as buttonVariants,
  x as cn,
  Dg as getBookIdFromUSFM,
  Bu as getCaretPositionFromClick,
  sg as getCommentThreadElementId,
  Ka as getInventoryHeader,
  Sg as getLinesFromUSFM,
  Og as getNumberFromUSFM,
  kp as getStatusForItem,
  of as getToolbarOSReservedSpaceClassName,
  Tg as inventoryCountColumn,
  Eg as inventoryItemColumn,
  Rg as inventoryStatusColumn,
  Vn as isCommentDraftEmpty,
  Rs as isGroupUnderColumnOrSubMenu,
  Io as isMacOs,
  Gn as isUnclosedNoteOp,
  Fm as isWindows,
  qu as leftEdgeRect,
  Oe as localizeOrFallback,
  ap as markerMenuItemToPaletteItem,
  Hu as measureBox,
  Ch as pickTabIconUrl,
  Hm as sonner,
  Kr as useContentZoomTextProps,
  qf as useEvent,
  Gf as useEventAsync,
  Zf as useExtraValidMarkers,
  Um as useHasContentBelow,
  Gs as useListbox,
  Ku as useLivePopoverAnchor,
  _h as usePromise,
  Xh as useRecentSearches,
  Wf as useRetryablePromise,
  Xf as useRunWhenVisible,
  Is as useShrinkStep,
  Li as useShrinkStepOverride,
  Dd as useShrinkStepValue,
  Ha as useSidebar,
  Yf as useStylesheet,
  Jf as useTabIconSelection,
  on as useTruncationTooltip,
  Nh as useViewVisibility
};
//# sourceMappingURL=index.js.map
