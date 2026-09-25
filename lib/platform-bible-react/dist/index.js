var ys = Object.defineProperty;
var ks = (t, e, r) => e in t ? ys(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var Jt = (t, e, r) => ks(t, typeof e != "symbol" ? e + "" : e, r);
import { c as v, g as Ae, a as Lr, C as tr, L as Kn, t as _s, u as tn, T as At, b as _t, d as Nt, e as Ct, f as Hn, A as ba, D as Be, h as Ee, i as Fe, j as cr, k as Ge, B as et, x as Ns, l as Cs, m as Es, I as Ts, n as Co, o as Xe, r as Re, p as Ss, q as qn, P as lr, s as Dr, v as dr, w as wr, y as Da, z as Oa, E as Eo, F as ur, G as Ma, H as Pt, R as To, J as xa, K as io, M as so, N as co, O as lo, Q as Gn, S as wa, U as So, V as Ur, W as Kr, X as yr, Y as Rs, Z as Ds, _ as ir, $ as Ze, a0 as je, a1 as We, a2 as kr, a3 as Ro, a4 as Do, a5 as ya, a6 as Oo, a7 as Wn, a8 as Os, a9 as Ms, aa as Is, ab as wo, ac as Yn, ad as Ia, ae as zs, af as Zn, ag as Ps, ah as As, ai as $s, aj as en, ak as Vs, al as Ls, am as Bs, an as Xn, ao as Jn, ap as Mo, aq as Fs, ar as Qn, as as Ka, at as rn, au as Ha, av as js, aw as Us, ax as Ks, ay as Hs, az as qs, aA as Gs, aB as Ws, aC as Ys, aD as Zs, aE as Io, aF as zo, aG as Xs, aH as Js } from "./resizable-DVE6-ntu.js";
import { aI as Cf, aJ as Ef, aK as Tf, aL as Sf, aM as Rf, aN as Df, aO as Of, aP as Mf, aQ as If, aR as zf, aS as Pf, aT as Af, aU as $f, aV as Vf, aW as Lf, aX as Bf, aY as Ff, aZ as jf, a_ as Uf, a$ as Kf, b0 as Hf, b1 as qf, b2 as Gf, b3 as Wf, b4 as Yf, b5 as Zf, b6 as Xf, b7 as Jf, b8 as Qf, b9 as tm, ba as em, bb as rm, bc as am, bd as om, be as nm, bf as im, bg as sm, bh as cm, bi as lm, bj as dm, bk as wm, bl as um, bm as pm, bn as hm, bo as gm, bp as fm } from "./resizable-DVE6-ntu.js";
import { jsx as a, jsxs as u, Fragment as ft } from "react/jsx-runtime";
import { Canon as Kt } from "@sillsdev/scripture";
import { Check as Je, Clock as an, ChevronsLeft as on, ChevronsRight as nn, ChevronUp as ti, ChevronDown as sr, ArrowLeft as Qs, ArrowRight as tc, BoldIcon as ec, ItalicIcon as rc, X as ei, AtSign as ri, Pencil as ac, Trash2 as oc, Undo2 as nc, ArrowUp as ai, MoreHorizontal as ic, MailOpen as sc, Mail as cc, FilterIcon as lc, ArrowLeftIcon as dc, ChevronLeftIcon as wc, ChevronRightIcon as uc, ArrowRightIcon as pc, Copy as oi, Filter as hc, User as gc, Link as fc, CircleHelp as mc, Undo as vc, Redo as bc, SquareX as ni, FunctionSquare as ii, SquareSigma as si, Ban as xc, AlertCircle as uo, CircleCheckIcon as yc, CircleXIcon as kc, CircleHelpIcon as _c, ArrowUpIcon as Nc, ArrowDownIcon as Cc, ScrollText as Ec, ChevronRight as Tc, ChevronLeft as Sc, ChevronsUpDown as Rc, MenuIcon as Dc, Menu as Oc, EllipsisVertical as Mc, MoreVertical as Ic } from "lucide-react";
import { Section as zt, resolveLocalizedString as oe, compareScrRefs as ka, getChaptersForBook as zc, formatScrRef as $e, formatReplacementString as Ye, getSectionForBook as ua, formatRelativeDate as Pc, sanitizeHtml as Po, NumberFormat as ci, formatBytes as Ac, getCurrentLocale as $c, usfmMarkers as Ar, isPlatformError as Vc, ABORTED as Lc, getErrorMessage as Bc, getFormatCallerFunction as Fc, deepEqual as jc, isString as sn, scrRefToBBBCCCVVV as qa, defaultScrRef as Ga, formatScrRefRange as Uc, getLocalizeKeyForScrollGroupId as cn, formatReplacementStringToArray as ln, collectUsjMarkers as Kc } from "platform-bible-utils";
import te, { useRef as A, useMemo as V, createContext as Wr, useContext as za, useEffect as J, useState as _, useCallback as L, useId as _a, useImperativeHandle as Hc, useLayoutEffect as Ht, Fragment as Yr, Component as qc, createElement as dn, Suspense as Gc, forwardRef as Ao, memo as li } from "react";
import { IconSelector as di, IconCheck as Pa, IconChevronDown as Wc, IconChevronUp as Yc, IconLayoutSidebar as Zc, IconLayoutSidebarRight as Xc, IconChevronRight as wi, IconSearch as Jc, IconLoader as Qc, IconAlertOctagon as tl, IconAlertTriangle as el, IconInfoCircle as rl, IconCircleCheck as al } from "@tabler/icons-react";
import { createEditor as ui, $getRoot as Qe, $createParagraphNode as Zr, $getSelection as ne, HISTORY_MERGE_TAG as $o, ParagraphNode as pi, TextNode as hi, $getPreviousSelection as ol, $isRangeSelection as Te, $caretFromPoint as nl, $getSiblingCaret as gi, $getChildCaret as il, $getAdjacentChildCaret as sl, $isChildCaret as cl, $normalizeCaret as ll, $setSelectionFromCaretRange as dl, $getCollapsedCaretRange as wl, $getCaretInDirection as wn, $splitAtPointCaretNext as ul, $isTextPointCaret as pl, $findMatchingParent as fi, $isElementNode as Hr, mergeRegister as Le, getDOMTextNode as hl, isHTMLElement as gl, CLEAR_EDITOR_COMMAND as mi, COMMAND_PRIORITY_EDITOR as Vo, shallowMergeConfig as fl, defineExtension as he, safeCast as pr, createState as ml, FORMAT_TEXT_COMMAND as vi, $isNodeSelection as bi, COMMAND_PRIORITY_LOW as xi, RootNode as vl, LineBreakNode as bl, TabNode as xl, $isEditorState as yl, createCommand as kl, CLICK_COMMAND as _l, isDOMNode as Nl, $getNodeFromDOMNode as Cl, $createNodeSelection as El, $setSelection as Tl, $getEditor as Sl, DecoratorNode as po, $getState as Rl, toggleTextFormatType as un, TEXT_TYPE_TO_FORMAT as Dl, $setState as Ol, addClassNamesToElement as yi, $create as Ml, $getNodeByKey as Il, removeClassNamesFromElement as zl, KEY_TAB_COMMAND as Pl, $isBlockElementNode as Al, $createRangeSelection as $l, $normalizeSelection__EXPERIMENTAL as Vl, OUTDENT_CONTENT_COMMAND as Ll, INDENT_CONTENT_COMMAND as pn, INSERT_TAB_COMMAND as Bl, COMMAND_PRIORITY_CRITICAL as Lo, $isDecoratorNode as Fl, $isParagraphNode as jl, $isTextNode as ho, SELECTION_CHANGE_COMMAND as ki, $insertNodes as Ul } from "lexical";
import { HeadingNode as Kl, QuoteNode as Hl, registerRichText as ql } from "@lexical/rich-text";
import { flushSync as Gl, createPortal as Wl } from "react-dom";
import { $isTableSelection as Yl } from "@lexical/table";
import { createHeadlessEditor as _i } from "@lexical/headless";
import { $generateHtmlFromNodes as Zl, $generateNodesFromDOM as Xl } from "@lexical/html";
import { Avatar as Bo, Select as ee, Checkbox as hn, Slot as Xr, Tabs as be, Menubar as De, ContextMenu as qt, Progress as gn, Slider as na, Switch as fn } from "radix-ui";
import { useReactTable as Ni, getFilteredRowModel as Jl, getSortedRowModel as Ci, getPaginationRowModel as Ql, getCoreRowModel as Ei, flexRender as Br, getGroupedRowModel as td, getExpandedRowModel as ed } from "@tanstack/react-table";
import rd from "markdown-to-jsx";
import { GENERATOR_NOTE_CALLER as go, HIDDEN_NOTE_CALLER as fo, getDefaultViewOptions as ad, isInsertEmbedOpOfType as Ir, getMarkerMenuItems as od, defaultStyleInfo as nd, Editorial as id } from "@eten-tech-foundation/platform-editor";
import { cva as Ti } from "class-variance-authority";
import { useHotkeys as sd } from "react-hotkeys-hook";
import { Drawer as er } from "vaul";
import { useTheme as cd } from "next-themes";
import { Toaster as ld } from "sonner";
import { toast as vm } from "sonner";
function bh({ className: t, ...e }) {
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
function Si({
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
  const b = A(!1), x = () => {
    p || (b.current || o == null || o(e), setTimeout(() => {
      b.current = !1;
    }, 100));
  }, g = (O) => {
    if (p) {
      O.preventDefault();
      return;
    }
    b.current = !0, n ? n(O) : o == null || o(e);
  }, C = V(
    () => Ae(e, d),
    [e, d]
  ), E = V(
    () => Lr(e, d),
    [e, d]
  ), S = !!h && !p, y = `${C} (${E})`, z = S ? f || `${y}, ${h}` : y, T = /* @__PURE__ */ u(
    tr,
    {
      ref: t,
      value: l || `${e} ${Kt.bookIdToEnglishName(e)}`,
      onSelect: x,
      onMouseDown: g,
      role: "option",
      "aria-selected": r,
      "aria-disabled": p || void 0,
      "aria-label": z,
      disabled: p,
      className: v(
        !w && Kn,
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
        S && "tw:bg-muted/50 tw:text-muted-foreground/50 tw:data-selected:bg-muted/50 tw:data-selected:text-muted-foreground/50"
      ),
      children: [
        c && /* @__PURE__ */ a(
          Je,
          {
            className: v(
              "tw:me-2 tw:h-4 tw:w-4 tw:shrink-0",
              r ? "tw:opacity-100" : "tw:opacity-0"
            )
          }
        ),
        /* @__PURE__ */ a("span", { className: "tw:min-w-0 tw:flex-1", children: C }),
        S && // Visible rather than hover-only: cmdk never moves DOM focus onto an item (the input keeps
        // it and highlights via data-selected), so a tooltip would never open for a keyboard user.
        // Rendered text also survives the highlight, which recolours the row.
        /* @__PURE__ */ a("span", { className: "tw:ms-2 tw:shrink-0 tw:text-xs tw:italic", children: h }),
        /* @__PURE__ */ a(
          "span",
          {
            className: v(
              "tw:ms-2 tw:shrink-0 tw:text-xs",
              // Inherits the row's dimmed colour instead of setting its own, so the whole row dims
              // evenly rather than leaving the id at full strength beside a dimmed name.
              !S && "tw:text-muted-foreground"
            ),
            children: E
          }
        )
      ]
    }
  );
  return /* @__PURE__ */ a(
    "div",
    {
      className: v(
        "tw:mx-1 tw:my-1 tw:border-b-0 tw:border-e-0 tw:border-s-2 tw:border-t-0 tw:border-solid",
        {
          "tw:border-s-red-200": s === zt.OT,
          "tw:border-s-purple-200": s === zt.NT,
          "tw:border-s-indigo-200": s === zt.DC,
          "tw:border-s-amber-200": s === zt.Extra
        }
      ),
      children: T
    }
  );
}
const dd = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
function wd(t) {
  return dd.some((e) => e === t);
}
function mn(t) {
  const e = new RegExp("^\\p{L}$", "u").test(t), r = /^[0-9]$/.test(t);
  return { isLetter: e, isDigit: r };
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
}), Aa = Wr(Fr.WIDE);
function ud() {
  return za(Aa);
}
const Ri = Wr(void 0);
function Di() {
  return za(Ri);
}
function Oi() {
  J(() => {
    _s();
  }, []);
}
function pd({
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
    onPointerEnter: b,
    onPointerLeave: x
  } = tn(), [g, C] = _(!1), [E, S] = _(!1), y = A(
    // React's ref API requires `null` as the initial value for DOM refs.
    // eslint-disable-next-line no-null/no-null
    null
  ), z = n && e !== void 0, T = s ?? (e !== void 0 && !n);
  Oi(), J(() => {
    var q;
    const B = (q = y.current) == null ? void 0 : q.closest('button, [role="combobox"], [tabindex]');
    if (!B) return;
    const k = (Q) => !!Q && Q.scrollWidth > Q.clientWidth, ot = () => {
      Hn() !== "pointer" && (T || k(h.current) || k(d.current)) && S(!0);
    }, $ = () => S(!1);
    return B.addEventListener("focus", ot), B.addEventListener("blur", $), () => {
      B.removeEventListener("focus", ot), B.removeEventListener("blur", $);
    };
  }, [T, h, d]);
  const O = L(() => {
    T && C(!0), b(), z && w();
  }, [
    T,
    z,
    b,
    w
  ]), M = L(() => {
    C(!1), S(!1), x(), p();
  }, [x, p]);
  J(() => {
    T || C(!1);
  }, [T]);
  const D = /* @__PURE__ */ a("span", { ref: h, className: "tw:min-w-0 tw:shrink tw:truncate", children: t }, "primary"), I = z ? (
    // Weighted to absorb essentially all of the shrinking, so the primary field only starts losing
    // characters once this one has none left.
    /* @__PURE__ */ a("span", { ref: d, className: "tw:min-w-0 tw:shrink-[9999] tw:truncate", children: e }, "secondary")
  ) : void 0, [Y, X] = o ? [I, D] : [D, I];
  return (
    // Nested TooltipProviders are harmless in Radix, so carrying our own means this works in any
    // host, including toolbars that never set one up.
    /* @__PURE__ */ a(At, { children: /* @__PURE__ */ u(
      _t,
      {
        open: f || l || g || E,
        onOpenChange: (B) => {
          B || M();
        },
        children: [
          /* @__PURE__ */ a(Nt, { asChild: !0, children: /* @__PURE__ */ u(
            "span",
            {
              ref: y,
              onPointerEnter: O,
              onPointerLeave: M,
              onPointerDown: M,
              className: v("tw:flex tw:min-w-0 tw:items-center", c),
              children: [
                Y,
                Y && X && /* @__PURE__ */ a("span", { className: "tw:shrink-0 tw:whitespace-pre", children: r }, "separator"),
                X
              ]
            }
          ) }),
          /* @__PURE__ */ a(Ct, { dir: "auto", children: i })
        ]
      }
    ) })
  );
}
function mo(t, e) {
  return `${t} ${ba[t]}${e ? ` ${Lr(t, e)} ${Ae(t, e)}` : ""}`;
}
function _r(t, e) {
  return `${t} ${ba[t] || ""} ${e}`;
}
function pa(t, e, r) {
  return `${_r(t, e)}:${r}`;
}
function $r(t) {
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
  if ($r(r) !== void 0)
    return parseInt(e[1], 10);
}
const hd = "top-match", gd = "Show recent searches", fd = "Recent";
function md({
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
  const [h, f] = _(!1), [b, x] = _(!1), g = _a(), C = A(!1), E = w !== void 0, S = E ? w : h, y = n === "" ? "" : oe(n, gd), z = oe(s, fd), T = (I) => {
    I || (C.current = !0, x(!1)), E || f(I), p == null || p(I);
  }, O = (I) => {
    if (I && C.current) {
      C.current = !1;
      return;
    }
    x(I);
  };
  if (t.length === 0)
    return;
  const M = (I) => {
    e(I);
  }, D = /* @__PURE__ */ a(
    et,
    {
      variant: l,
      size: "icon",
      className: d,
      "aria-label": y,
      onPointerEnter: () => {
        C.current = !1;
      },
      children: /* @__PURE__ */ a(an, { className: "tw:h-4 tw:w-4" })
    }
  );
  return /* @__PURE__ */ u(Be, { open: S, onOpenChange: T, modal: !1, children: [
    /* @__PURE__ */ a(At, { children: y ? /* @__PURE__ */ u(_t, { open: b, onOpenChange: O, children: [
      /* @__PURE__ */ a(Nt, { asChild: !0, children: /* @__PURE__ */ a(Ee, { asChild: !0, children: D }) }),
      /* @__PURE__ */ a(Ct, { children: y })
    ] }) : /* @__PURE__ */ a(Ee, { asChild: !0, children: D }) }),
    /* @__PURE__ */ u(
      Fe,
      {
        id: i,
        "aria-labelledby": g,
        className: "tw:w-[300px]",
        align: "start",
        onKeyDown: (I) => I.stopPropagation(),
        children: [
          /* @__PURE__ */ a(cr, { id: g, children: z }),
          t.map((I) => /* @__PURE__ */ u(
            Ge,
            {
              onSelect: () => M(I),
              className: v("tw:flex tw:items-center", c),
              children: [
                /* @__PURE__ */ a(an, { className: "tw:me-2 tw:h-4 tw:w-4 tw:opacity-50" }),
                /* @__PURE__ */ a("span", { children: r(I) })
              ]
            },
            o(I)
          ))
        ]
      }
    )
  ] });
}
function xh(t, e, r = (n, s) => n === s, o = 15) {
  return (n) => {
    const s = t.filter(
      (c) => !r(c, n)
    ), i = [n, ...s.slice(0, o - 1)];
    e(i);
  };
}
function sa(t, e) {
  return !e || ka(t, e) === 0;
}
function vd(t, e, r, o, n) {
  const s = V(
    () => Ns(t, e),
    [t, e]
  ), i = V(
    () => Cs(t, e),
    [t, e]
  ), c = V(
    () => Es(t, e),
    [t, e]
  ), d = V(
    () => Ts(t, e),
    [t, e]
  ), l = L(
    (w) => {
      w && o(w);
    },
    [o]
  );
  return V(() => [
    {
      onClick: () => l(s),
      disabled: sa(t, s),
      title: oe(
        n == null ? void 0 : n["%webView_bookChapterControl_previousChapter%"],
        "Previous chapter"
      ),
      icon: r === "ltr" ? on : nn,
      group: "chapter"
    },
    {
      onClick: () => l(i),
      disabled: sa(t, i),
      title: oe(
        n == null ? void 0 : n["%webView_bookChapterControl_nextChapter%"],
        "Next chapter"
      ),
      icon: r === "ltr" ? nn : on,
      group: "chapter"
    },
    {
      onClick: () => l(c),
      disabled: sa(t, c),
      title: oe(
        n == null ? void 0 : n["%webView_bookChapterControl_previousVerse%"],
        "Previous verse"
      ),
      icon: ti,
      group: "verse"
    },
    {
      onClick: () => l(d),
      disabled: sa(t, d),
      title: oe(
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
const ha = {
  // Matches start of string (`^`), one or more non-colon/space words, optionally followed by space and more words (`([^:\s]+(?:\s+[^:\s]+)*)`), end of string (`$`), case-insensitive (`i`)
  BOOK_ONLY: /^([^:\s]+(?:\s+[^:\s]+)*)$/i,
  // Same as above, but followed by a space and a chapter number (`\s+(\d+)`)
  BOOK_CHAPTER: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,
  // Same as above, but followed by a colon and optionally a verse number (`:(\d*)`)
  BOOK_CHAPTER_VERSE: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i
}, bd = [
  ha.BOOK_ONLY,
  ha.BOOK_CHAPTER,
  ha.BOOK_CHAPTER_VERSE
];
function xd(t) {
  return ha.BOOK_CHAPTER_VERSE.test(t.trim());
}
function vn(t, e) {
  return Kt.bookIdToNumber(t) < Kt.bookIdToNumber(e.book);
}
function yd(t, e, r) {
  const o = Kt.bookIdToNumber(t) - Kt.bookIdToNumber(r.book);
  return o < 0 ? !0 : o > 0 ? !1 : e < r.chapterNum;
}
function Wa(t, e, r, o) {
  const n = Kt.bookIdToNumber(t) - Kt.bookIdToNumber(o.book);
  return n < 0 ? !0 : n > 0 ? !1 : e < o.chapterNum ? !0 : e > o.chapterNum ? !1 : r < o.verseNum;
}
function qe(t) {
  return zc(Kt.bookIdToNumber(t));
}
function kd(t, e, r) {
  if (!t.trim() || e.length === 0) return;
  const o = bd.reduce(
    (n, s) => {
      if (n) return n;
      const i = s.exec(t.trim());
      if (i) {
        const [c, d = void 0, l = void 0] = i.slice(1);
        let w;
        const p = e.filter((h) => Co(h, c, r));
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
          const f = ((b) => Object.keys(ba).find(
            (x) => ba[x].toLowerCase() === b.toLowerCase()
          ))(c);
          if (f && e.includes(f) && (w = f), !w && r) {
            const b = Array.from(r.entries()).find(
              ([, x]) => x.localizedName.toLowerCase() === c.toLowerCase()
            );
            b && e.includes(b[0]) && ([w] = b);
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
function vo(t) {
  return {
    [zt.OT]: t.filter((e) => Kt.isBookOT(e)),
    [zt.NT]: t.filter((e) => Kt.isBookNT(e)),
    [zt.DC]: t.filter((e) => Kt.isBookDC(e)),
    [zt.Extra]: t.filter((e) => Kt.extraBooks().includes(e))
  };
}
function _d(t, e) {
  const r = new Set(t), o = e.filter((l) => !r.has(l)), n = new Set(o), s = n.size === 0 ? t : Kt.allBookIds.filter(
    (l) => r.has(l) || n.has(l)
  ), i = vo(s), c = Object.values(i).flat(), d = vo(t);
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
const bo = 6;
function Nd(t) {
  return t === "ArrowLeft" ? "ArrowRight" : t === "ArrowRight" ? "ArrowLeft" : t;
}
function Cd({
  current: t,
  key: e,
  max: r,
  direction: o = "ltr"
}) {
  if (r <= 0) return t;
  if (t < 1 || t > r) return 1;
  switch (o === "rtl" ? Nd(e) : e) {
    case "ArrowLeft":
      return t > 1 ? t - 1 : r;
    case "ArrowRight":
      return t < r ? t + 1 : 1;
    case "ArrowUp":
      return Math.max(1, t - bo);
    case "ArrowDown":
      return Math.min(r, t + bo);
    default:
      return t;
  }
}
function Mi({
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
    return /* @__PURE__ */ a(Xe, { children: /* @__PURE__ */ a(
      "div",
      {
        className: v("tw:grid tw:gap-1", d),
        style: { gridTemplateColumns: `repeat(${bo}, minmax(0, 1fr))` },
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
              className: v(
                "tw:h-8 tw:w-8 tw:cursor-pointer tw:justify-center tw:rounded-md tw:text-center tw:text-sm",
                // Hide CommandItem's own trailing check icon (a multiselect affordance this grid
                // doesn't use) and give cells pointer feedback distinct from the keyboard focus ring.
                "tw:[&>svg]:hidden tw:hover:bg-muted",
                !c && Kn,
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
function bn({
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
      Mi,
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
function xn({
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
      Mi,
      {
        count: r,
        valueBuilder: (w) => pa(t, e, w),
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
const Ed = "a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]";
function Td(t) {
  return Array.from(t.querySelectorAll(Ed)).filter(
    (e) => e.tabIndex >= 0
  );
}
function Ya({
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
  triggerVariant: b = "outline",
  showTriggerChevron: x = !1,
  onOpenChange: g,
  onCloseAutoFocus: C,
  modal: E = !1,
  align: S = "center",
  ref: y,
  disabled: z
}) {
  const T = Re(), O = ud(), [M, D] = _(!1), [I, Y] = _(""), [X, B] = _(""), [k, ot] = _("books"), [$, q] = _(void 0), [Q, j] = _(
    void 0
  ), [at, wt] = _(void 0), [ct, tt] = _(!1), [ut, xt] = _(!1), [gt, yt] = _(!1), [St, Gt] = _(!1), $t = A(null), ie = A(!1), Rt = A(void 0), Et = A(void 0), Bt = A(void 0), ce = A(void 0), le = A({}), Mt = A({}), Dt = L(
    (m) => {
      e(m), d && d(m);
    },
    [e, d]
  ), de = V(() => o ? o() : Ss, [o]), xe = V(
    () => o && n ? n() : [],
    [o, n]
  ), {
    projectBooksBySection: ge,
    reachableBooksBySection: ye,
    reachableBooks: Zt,
    projectBooks: Wt,
    booksOutsideProject: Ft
  } = V(
    () => _d(de, xe),
    [de, xe]
  ), re = Ft.has(t.book), Me = V(() => X.trim() ? vo(
    Zt.filter((m) => Co(m, X, s))
  ) : ut ? ye : ge, [
    ge,
    ye,
    Zt,
    ut,
    X,
    s
  ]), P = V(
    () => kd(X, Zt, s),
    [X, Zt, s]
  ), N = V(() => {
    if (!P) return;
    const m = I.startsWith(`${P.book} `) ? I : "", W = ia(m), st = $r(m);
    return {
      book: P.book,
      chapterNum: st ?? P.chapterNum ?? 1,
      verseNum: W ?? P.verseNum ?? 1
    };
  }, [P, I]), F = A(!1);
  J(() => {
    if (!F.current) {
      F.current = !0;
      return;
    }
    g == null || g(M);
  }, [M, g]);
  const G = L(() => {
    N && (p && Wa(
      N.book,
      N.chapterNum,
      N.verseNum,
      p
    ) || (Dt(N), D(!1), B(""), Y("")));
  }, [Dt, N, p]), U = L(
    (m) => {
      const W = Q ?? (P == null ? void 0 : P.book), st = at ?? (P == null ? void 0 : P.chapterNum);
      !W || !st || (Dt({
        book: W,
        chapterNum: st,
        verseNum: m
      }), D(!1));
    },
    [Dt, Q, at, P]
  ), Z = L(
    (m) => {
      if (p && vn(m, p)) return;
      if (qe(m) <= 1) {
        Dt({
          book: m,
          chapterNum: 1,
          verseNum: 1
        }), D(!1), B("");
        return;
      }
      q(m), ot("chapters");
    },
    [Dt, p]
  ), H = L(
    (m) => {
      const W = k === "chapters" ? $ : P == null ? void 0 : P.book;
      if (W) {
        if (w && w(W, m) > 1) {
          j(W), wt(m), ot("verses"), Y("");
          return;
        }
        Dt({
          book: W,
          chapterNum: m,
          verseNum: 1
        }), D(!1);
      }
    },
    [Dt, k, $, P, w]
  ), nt = L(
    (m) => {
      Dt(m), D(!1), B("");
    },
    [Dt]
  ), kt = vd(
    t,
    ut ? Zt : Wt,
    T,
    e,
    i
  ), mt = L((m) => {
    B(m), Gt(!1);
  }, []), bt = L(() => {
    ot("books"), q(void 0), j(void 0), wt(void 0), Gt(!1), setTimeout(() => {
      var m;
      (m = Et.current) == null || m.focus();
    }, 0);
  }, []), ht = L(() => {
    const m = Q;
    j(void 0), wt(void 0), m ? (q(m), ot("chapters"), Y("")) : bt();
  }, [Q, bt]), lt = L(
    (m) => {
      D(m), m && (ot("books"), q(void 0), j(void 0), wt(void 0), B(""), Gt(!1), yt(!1), xt(re));
    },
    [re]
  );
  J(() => {
    z && lt(!1);
  }, [z, lt]);
  const [It, Ie] = _(0);
  J(() => {
    var m;
    It !== 0 && ((m = Et.current) == null || m.focus());
  }, [It]), Hc(
    y,
    () => ({
      open: () => {
        z || (lt(!0), Ie((m) => m + 1));
      }
    }),
    [lt, z]
  );
  const { otLong: ke, ntLong: rr, dcLong: ar, extraLong: Ue } = {
    otLong: i == null ? void 0 : i["%scripture_section_ot_long%"],
    ntLong: i == null ? void 0 : i["%scripture_section_nt_long%"],
    dcLong: i == null ? void 0 : i["%scripture_section_dc_long%"],
    extraLong: i == null ? void 0 : i["%scripture_section_extra_long%"]
  }, ze = L(
    (m) => qn(m, ke, rr, ar, Ue),
    [ke, rr, ar, Ue]
  ), _e = L(
    (m) => P ? !!P.chapterNum && !m.toString().includes(P.chapterNum.toString()) : !1,
    [P]
  ), hr = V(
    () => $e(
      t,
      s ? Ae(t.book, s) : "English"
    ),
    [t, s]
  ), Jr = V(
    () => O >= Fr.TIGHT ? Lr(t.book, s) : Ae(t.book, s),
    [t.book, s, O]
  ), gr = `${t.chapterNum}:${t.verseNum}`, R = L((m) => (W) => {
    le.current[m] = W;
  }, []), it = L((m) => (W) => {
    Mt.current[m] = W;
  }, []), dt = V(
    () => xd(X),
    [X]
  ), Ot = V(() => !w || !P || !P.chapterNum || !dt ? !1 : w(P.book, P.chapterNum) > 0, [w, P, dt]), Ke = k === "books" && !ct && !X.trim() && Ft.size > 0, Ba = L(
    (m) => p ? vn(m, p) : !1,
    [p]
  ), Pe = L(
    (m) => (W) => p ? yd(m, W, p) : !1,
    [p]
  ), fr = L(
    (m, W) => (st) => p ? Wa(m, W, st, p) : !1,
    [p]
  ), mr = oe(
    i == null ? void 0 : i["%webView_bookChapterControl_selectChapter%"],
    "Select chapter"
  ), Fa = oe(
    i == null ? void 0 : i["%webView_bookChapterControl_selectVerse%"],
    "Select verse"
  ), Qr = k === "verses" ? oe(
    i == null ? void 0 : i["%webView_bookChapterControl_backToChapters%"],
    "Back to chapters"
  ) : oe(
    i == null ? void 0 : i["%webView_bookChapterControl_backToBooks%"],
    "Back to books"
  ), ja = oe(
    i == null ? void 0 : i["%webView_bookChapterControl_bookNotInProject%"],
    "Not in project"
  ), ta = oe(
    i == null ? void 0 : i["%webView_bookChapterControl_bookNotInProjectDescription%"],
    "{book} is not in this project"
  ), ea = L(
    (m) => Ye(ta, {
      book: `${Ae(m, s)} (${Lr(
        m,
        s
      )})`
    }),
    [ta, s]
  ), ra = oe(
    i == null ? void 0 : i["%webView_bookChapterControl_showMoreBooks%"],
    "Show more books"
  ), vr = oe(
    i == null ? void 0 : i["%webView_bookChapterControl_showProjectBooksOnly%"],
    "Show project books only"
  ), aa = L(
    (m) => {
      (m.key === "Home" || m.key === "End") && m.stopPropagation(), h && h.includes(m.key) && P && P.chapterNum !== void 0 && P.verseNum !== void 0 && (m.preventDefault(), m.stopPropagation(), G());
    },
    [h, P, G]
  ), oa = L(
    (m) => {
      var Xo, Jo;
      if (m.ctrlKey) return;
      const W = m.target instanceof HTMLElement ? m.target : void 0;
      if (!(!!W && !!((Xo = Rt.current) != null && Xo.contains(W))) && (W != null && W.closest('[role="menu"], [role="menuitem"]')))
        return;
      if (m.key === "Tab") {
        const Lt = Rt.current ? Td(Rt.current) : [];
        if (Lt.length === 0) {
          m.preventDefault(), m.stopPropagation();
          return;
        }
        const ue = Lt[Lt.length - 1], Xt = m.shiftKey ? Lt[0] : ue;
        document.activeElement === Xt && (m.preventDefault(), m.stopPropagation(), (m.shiftKey ? ue : Lt[0]).focus());
        return;
      }
      const { isLetter: jt, isDigit: Yt } = mn(m.key);
      if ((k === "chapters" || k === "verses") && (m.key === " " || m.key === "Enter")) {
        if (!!(W != null && W.closest(
          'button, a, input, select, textarea, [role="button"]'
        ))) {
          m.stopPropagation();
          return;
        }
        const ue = (() => {
          if (k === "verses") {
            const Mr = Q, Qo = at, Ua = ia(I);
            return !Mr || !Qo || Ua === void 0 ? void 0 : {
              isDisabled: fr(Mr, Qo)(Ua),
              activate: () => U(Ua)
            };
          }
          const Xt = $, me = $r(I);
          if (!(!Xt || me === void 0))
            return {
              isDisabled: Pe(Xt)(me),
              activate: () => H(me)
            };
        })();
        if (ue) {
          m.preventDefault(), m.stopPropagation(), ue.isDisabled || ue.activate();
          return;
        }
      }
      if (k === "books" && P && !ct && m.key === "Enter" && !(W !== Et.current && !!(W != null && W.closest('button, a, input, select, textarea, [role="button"]')))) {
        m.preventDefault(), m.stopPropagation(), G();
        return;
      }
      if ((k === "chapters" || k === "verses") && (jt || Yt)) {
        m.preventDefault(), m.stopPropagation();
        return;
      }
      if (m.key === "Backspace" && (k === "chapters" || k === "verses")) {
        m.preventDefault(), m.stopPropagation(), k === "verses" ? ht() : bt();
        return;
      }
      if (!wd(m.key) || ct) return;
      if (k === "books" && !St && (m.key === "ArrowLeft" || m.key === "ArrowRight")) {
        const Lt = W === Et.current ? Et.current : void 0, ue = (Lt == null ? void 0 : Lt.selectionStart) ?? 0, Xt = (Lt == null ? void 0 : Lt.selectionEnd) ?? 0, me = T === "rtl" ? m.key === "ArrowRight" : m.key === "ArrowLeft";
        if (!!Lt && (ue !== Xt || (me ? ue > 0 : Xt < Lt.value.length))) return;
      }
      if (m.shiftKey || k === "books" && W !== Et.current && (W != null && W.closest('button, a, [role="button"]')))
        return;
      const Tt = (() => {
        const Lt = k === "books" && P && Ot && P.chapterNum ? { bookId: P.book, chapterNum: P.chapterNum } : void 0, ue = k === "verses" ? { bookId: Q, chapterNum: at } : Lt;
        if (ue) {
          const { bookId: Xt, chapterNum: me } = ue;
          return !Xt || !me || !w ? void 0 : {
            max: w(Xt, me),
            current: ia(I) ?? 0,
            buildValue: (Mr) => pa(Xt, me, Mr),
            refs: Mt,
            // In books view focus stays on the CommandInput so the user can keep typing; only
            // the dedicated grid views pull focus off the back button.
            takeFocus: k === "verses"
          };
        }
        if (k === "chapters" || k === "books" && P && qe(P.book) > 1) {
          const Xt = k === "chapters" ? $ : P == null ? void 0 : P.book;
          return Xt ? {
            max: qe(Xt),
            current: $r(I) ?? 0,
            buildValue: (me) => _r(Xt, me),
            refs: le,
            takeFocus: k === "chapters"
          } : void 0;
        }
      })();
      if (!Tt || Tt.max <= 0) return;
      k === "books" && Gt(!0), Tt.takeFocus && ((Jo = Rt.current) == null || Jo.focus());
      const ae = Cd({
        current: Tt.current,
        key: m.key,
        max: Tt.max,
        direction: T
      });
      if (m.preventDefault(), m.stopPropagation(), ae === Tt.current) return;
      Y(Tt.buildValue(ae));
      const Zo = Tt.refs.current[ae];
      Zo && Zo.scrollIntoView({ block: "nearest", behavior: "smooth" });
    },
    [
      k,
      P,
      Ot,
      ct,
      St,
      T,
      bt,
      ht,
      H,
      G,
      U,
      Pe,
      fr,
      $,
      Q,
      at,
      w,
      I
    ]
  ), K = L((m) => {
    var jt, Yt;
    if (m.shiftKey || m.key === "Tab" || m.key === " ") return;
    if (m.key === "Enter") {
      m.stopPropagation();
      return;
    }
    if (m.key === "ArrowUp" || m.key === "ArrowDown") {
      (jt = Et.current) == null || jt.focus();
      return;
    }
    const { isLetter: W, isDigit: st } = mn(m.key);
    (W || st) && (m.preventDefault(), B((Tt) => Tt + m.key), (Yt = Et.current) == null || Yt.focus(), tt(!1));
  }, []);
  Ht(() => {
    const m = setTimeout(() => {
      if (M && k === "books" && Bt.current && ce.current) {
        const W = Bt.current, st = ce.current, jt = st.offsetTop, Yt = W.clientHeight, Tt = st.clientHeight, ae = jt - Yt / 2 + Tt / 2;
        W.scrollTo({
          top: Math.max(0, ae),
          behavior: "smooth"
        }), Y(mo(t.book));
      }
    }, 0);
    return () => {
      clearTimeout(m);
    };
  }, [M, k, X, P, t.book]), Ht(() => {
    if (k === "chapters" && $) {
      const m = $ === t.book, W = m ? t.chapterNum : 1;
      Y(_r($, W)), setTimeout(() => {
        if (Bt.current)
          if (m) {
            const st = le.current[t.chapterNum];
            st && st.scrollIntoView({ block: "center", behavior: "smooth" });
          } else
            Bt.current.scrollTo({ top: 0 });
        Rt.current && Rt.current.focus();
      }, 0);
    }
  }, [k, $, P, t.book, t.chapterNum]), Ht(() => {
    if (k === "verses" && Q && at !== void 0) {
      const m = Q === t.book && at === t.chapterNum, W = m ? t.verseNum : 1;
      Y(
        pa(Q, at, W)
      ), setTimeout(() => {
        if (Bt.current)
          if (m) {
            const st = Mt.current[t.verseNum];
            st && st.scrollIntoView({ block: "center", behavior: "smooth" });
          } else
            Bt.current.scrollTo({ top: 0 });
        Rt.current && Rt.current.focus();
      }, 0);
    }
  }, [
    k,
    Q,
    at,
    t.book,
    t.chapterNum,
    t.verseNum
  ]);
  const rt = P ? `${P.book} ${P.chapterNum ?? ""} ${P.verseNum ?? ""} ${Ot}` : "", Vt = A(""), we = A(""), fe = V(() => {
    if (k !== "books" || !P || ct) return;
    const { book: m, chapterNum: W, verseNum: st } = P;
    if (Ot && W && w)
      return {
        max: w(m, W),
        initial: st ?? (m === t.book && W === t.chapterNum ? t.verseNum : 1),
        parse: ia,
        buildValue: (Yt) => pa(m, W, Yt)
      };
    const jt = qe(m);
    if (!(jt <= 1))
      return {
        max: jt,
        initial: W ?? (m === t.book ? t.chapterNum : 1),
        parse: $r,
        buildValue: (Yt) => _r(m, Yt)
      };
  }, [
    k,
    P,
    ct,
    Ot,
    w,
    t.book,
    t.chapterNum,
    t.verseNum
  ]);
  return Ht(() => {
    if (k !== "books" || !P || !fe || fe.max <= 0) {
      Vt.current = "";
      return;
    }
    const { max: m, initial: W, parse: st, buildValue: jt } = fe, Yt = (Tt) => {
      const ae = st(Tt);
      return ae !== void 0 && ae >= 1 && ae <= m && Tt === jt(ae) ? ae : void 0;
    };
    if (Vt.current !== rt) {
      Vt.current = rt;
      const Tt = jt(Math.min(Math.max(W, 1), m));
      we.current = Tt, Y(Tt);
      return;
    }
    if (Yt(I) !== void 0) {
      we.current = I;
      return;
    }
    Y(
      Yt(we.current) !== void 0 ? we.current : jt(Math.min(Math.max(W, 1), m))
    );
  }, [k, P, fe, rt, I]), /* @__PURE__ */ u(lr, { open: M, onOpenChange: lt, modal: E, children: [
    /* @__PURE__ */ a(Dr, { asChild: !0, children: /* @__PURE__ */ u(
      et,
      {
        ref: $t,
        "aria-label": "book-chapter-trigger",
        variant: b,
        role: "combobox",
        "aria-expanded": M,
        disabled: z,
        className: v(
          "tw:h-8 tw:w-full tw:min-w-16 tw:max-w-48 tw:shrink tw:overflow-hidden tw:px-1",
          r
        ),
        onClick: (m) => {
          ie.current && (ie.current = !1, m.preventDefault());
        },
        children: [
          f ?? /* @__PURE__ */ a(
            pd,
            {
              primary: Jr,
              secondary: gr,
              showSecondary: O < Fr.MINIMUM,
              isPartial: O >= Fr.TIGHT,
              fullText: hr
            }
          ),
          x && /* @__PURE__ */ a(
            di,
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
        align: S,
        onKeyDownCapture: oa,
        onKeyDown: (m) => m.stopPropagation(),
        onPointerDownOutside: (m) => {
          const { target: W } = m;
          M && $t.current && W instanceof Node && $t.current.contains(W) && (ie.current = !0, lt(!1));
        },
        onCloseAutoFocus: C,
        children: /* @__PURE__ */ a(At, { children: /* @__PURE__ */ u(
          wr,
          {
            ref: Rt,
            loop: !0,
            value: I,
            onValueChange: Y,
            disablePointerSelection: !0,
            shouldFilter: !1,
            children: [
              k === "books" ? /* @__PURE__ */ u(
                "div",
                {
                  className: v("tw:flex tw:items-end", ct && "tw:pb-1"),
                  onFocus: (m) => {
                    yt(m.target !== Et.current);
                  },
                  onBlur: (m) => {
                    m.currentTarget.contains(m.relatedTarget) || yt(!1);
                  },
                  children: [
                    /* @__PURE__ */ u("div", { className: "tw:relative tw:flex-1", children: [
                      /* @__PURE__ */ a(
                        Da,
                        {
                          ref: Et,
                          value: X,
                          onValueChange: mt,
                          onKeyDown: aa,
                          onFocus: () => tt(!1),
                          className: c && c.length > 0 ? "tw:pe-8!" : "",
                          spaceSelectsHighlightedItem: !0
                        }
                      ),
                      c && c.length > 0 && /* @__PURE__ */ a(
                        md,
                        {
                          recentSearches: c,
                          onSearchItemSelect: nt,
                          renderItem: (m) => $e(m, "English"),
                          getItemKey: (m) => `${m.book}-${m.chapterNum}-${m.verseNum}`,
                          ariaLabel: i == null ? void 0 : i["%history_recentSearches_ariaLabel%"],
                          groupHeading: i == null ? void 0 : i["%history_recent%"],
                          buttonClassName: "tw:absolute tw:end-1 tw:top-1"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ a(Oa, { className: "tw:translate-y-px tw:gap-1 tw:pe-2", children: kt.map(
                      ({ onClick: m, disabled: W, title: st, icon: jt, group: Yt }, Tt) => {
                        const ae = /* @__PURE__ */ a(
                          et,
                          {
                            variant: "ghost",
                            size: "sm",
                            onClick: () => {
                              tt(!0), m();
                            },
                            disabled: W,
                            className: "tw:h-8.5 tw:w-6 tw:rounded-lg! tw:p-0",
                            "aria-label": st,
                            onKeyDown: K,
                            children: /* @__PURE__ */ a(jt, {})
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
                            Tt > 0 && Yt !== kt[Tt - 1].group && /* @__PURE__ */ a(Eo, {}),
                            W ? (
                              // A disabled Button carries `pointer-events: none` from its own base
                              // variants, so it is not hit-tested: neither a Radix tooltip nor a
                              // `title` ON THE BUTTON can ever fire. These arrows come back disabled
                              // at the edges of the canon — Genesis 1:1 is the default state of a
                              // freshly opened project — which is exactly where a user asks what the
                              // button was for. The wrapper is still hit-tested, so the native
                              // tooltip it carries is the one hover explanation available here.
                              /* @__PURE__ */ a("span", { title: st, className: "tw:inline-flex", children: ae })
                            ) : /* @__PURE__ */ u(_t, { children: [
                              /* @__PURE__ */ a(Nt, { asChild: !0, children: ae }),
                              /* @__PURE__ */ a(Ct, { children: st })
                            ] })
                          ] }, `${Yt}-${Tt}`)
                        );
                      }
                    ) })
                  ]
                }
              ) : /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:border-b tw:px-3 tw:py-1", children: [
                /* @__PURE__ */ u(_t, { children: [
                  /* @__PURE__ */ a(Nt, { asChild: !0, children: /* @__PURE__ */ a(
                    et,
                    {
                      variant: "ghost",
                      size: "sm",
                      onClick: k === "verses" ? ht : bt,
                      className: "tw:me-2 tw:h-6 tw:w-6 tw:p-0",
                      tabIndex: -1,
                      "aria-label": Qr,
                      children: T === "ltr" ? /* @__PURE__ */ a(Qs, { className: "tw:h-4 tw:w-4" }) : /* @__PURE__ */ a(tc, { className: "tw:h-4 tw:w-4" })
                    }
                  ) }),
                  /* @__PURE__ */ a(Ct, { children: Qr })
                ] }),
                k === "chapters" && $ && /* @__PURE__ */ a("span", { tabIndex: -1, className: "tw:text-sm tw:font-medium", children: Ae($, s) }),
                k === "verses" && Q && at !== void 0 && /* @__PURE__ */ a("span", { tabIndex: -1, className: "tw:text-sm tw:font-medium", children: `${Ae(Q, s)} ${at}` }),
                /* @__PURE__ */ a(
                  "span",
                  {
                    tabIndex: -1,
                    className: "tw:ms-auto tw:text-sm tw:font-medium tw:text-muted-foreground",
                    children: k === "verses" ? Fa : mr
                  }
                )
              ] }),
              !ct && /* @__PURE__ */ u(ur, { ref: Bt, children: [
                k === "books" && /* @__PURE__ */ u(ft, { children: [
                  !P && Object.entries(Me).map(([m, W]) => {
                    if (W.length !== 0)
                      return (
                        // We are mapping over filteredBooksByType, which uses Section as key type
                        // eslint-disable-next-line no-type-assertion/no-type-assertion
                        /* @__PURE__ */ a(Xe, { heading: ze(m), children: W.map((st) => /* @__PURE__ */ a(
                          Si,
                          {
                            bookId: st,
                            onSelect: (jt) => Z(jt),
                            section: ua(st),
                            commandValue: mo(st),
                            suppressKeyboardHighlight: gt,
                            ref: st === t.book ? ce : void 0,
                            localizedBookNames: s,
                            disabled: Ba(st),
                            dimmedReason: Ft.has(st) ? ja : void 0,
                            dimmedDescription: Ft.has(st) ? ea(st) : void 0
                          },
                          st
                        )) }, m)
                      );
                  }),
                  P && N && /* @__PURE__ */ a(Xe, { children: /* @__PURE__ */ u(
                    tr,
                    {
                      value: hd,
                      onSelect: G,
                      disabled: !!p && Wa(
                        N.book,
                        N.chapterNum,
                        N.verseNum,
                        p
                      ),
                      className: "tw:font-semibold tw:text-primary tw:hover:bg-muted tw:[&>svg:last-child]:hidden",
                      children: [
                        /* @__PURE__ */ a("span", { className: "tw:min-w-0 tw:flex-1", children: $e(
                          N,
                          Ae(P.book, s)
                        ) }),
                        /* @__PURE__ */ a("span", { className: "tw:ms-2 tw:shrink-0 tw:text-xs tw:text-muted-foreground", children: Lr(P.book, s) })
                      ]
                    },
                    "top-match"
                  ) }),
                  P && Ot && P.chapterNum && w && // No heading over this grid: the top-match row sits directly above it and
                  // already names the book and the reference the grid is refining, so a
                  // heading here only repeated the book back to the user one line later. The
                  // dedicated verses view still carries one, because there it is the only
                  // thing naming the book.
                  /* @__PURE__ */ a(
                    xn,
                    {
                      bookId: P.book,
                      chapterNum: P.chapterNum,
                      endVerse: w(P.book, P.chapterNum),
                      scrRef: t,
                      onVerseSelect: U,
                      setVerseRef: it,
                      isVerseDisabled: fr(P.book, P.chapterNum),
                      suppressKeyboardHighlight: gt,
                      className: "tw:px-4 tw:pb-4"
                    }
                  ),
                  P && !Ot && qe(P.book) > 1 && // No heading here either, for the same reason as the verse preview above:
                  // the top-match row directly above already names the book.
                  /* @__PURE__ */ a(
                    bn,
                    {
                      bookId: P.book,
                      scrRef: t,
                      onChapterSelect: H,
                      setChapterRef: R,
                      isChapterDimmed: _e,
                      isChapterDisabled: Pe(P.book),
                      suppressKeyboardHighlight: gt,
                      className: "tw:px-4 tw:pb-4"
                    }
                  )
                ] }),
                k === "chapters" && $ && /* @__PURE__ */ a(
                  bn,
                  {
                    bookId: $,
                    scrRef: t,
                    onChapterSelect: H,
                    setChapterRef: R,
                    isChapterDisabled: Pe($),
                    className: "tw:p-4"
                  }
                ),
                k === "verses" && Q && at !== void 0 && w && /* @__PURE__ */ a(
                  xn,
                  {
                    bookId: Q,
                    chapterNum: at,
                    endVerse: w(
                      Q,
                      at
                    ),
                    scrRef: t,
                    onVerseSelect: U,
                    setVerseRef: it,
                    isVerseDisabled: fr(
                      Q,
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
                  onClick: () => xt((m) => !m),
                  children: ut ? vr : ra
                }
              ) })
            ]
          }
        ) })
      }
    )
  ] });
}
const yh = Object.freeze([
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
function Sd(t) {
  return typeof t == "string" ? t : typeof t == "number" ? t.toString() : t.label;
}
function yn({
  id: t,
  options: e = [],
  className: r,
  buttonClassName: o,
  popoverContentClassName: n,
  popoverContentStyle: s,
  value: i,
  onChange: c = () => {
  },
  getOptionLabel: d = Sd,
  getButtonLabel: l,
  icon: w = void 0,
  buttonPlaceholder: p = "",
  textPlaceholder: h = "",
  commandEmptyMessage: f = "No option found",
  buttonVariant: b = "outline",
  alignDropDown: x = "start",
  isDisabled: g = !1,
  ariaLabel: C,
  ...E
}) {
  const [S, y] = _(!1), z = l ?? d, T = (M) => M.length > 0 && typeof M[0] == "object" && "options" in M[0], O = (M, D) => {
    const I = d(M), Y = typeof M == "object" && "secondaryLabel" in M ? M.secondaryLabel : void 0, X = `${D ?? ""}${I}${Y ?? ""}`;
    return /* @__PURE__ */ u(
      tr,
      {
        value: I,
        onSelect: () => {
          c(M), y(!1);
        },
        className: "tw:gap-1.5!",
        children: [
          /* @__PURE__ */ a(
            Je,
            {
              className: v("tw:h-4 tw:w-4 tw:shrink-0", {
                "tw:opacity-0": !i || d(i) !== I
              })
            }
          ),
          /* @__PURE__ */ u("span", { className: "tw:flex-1 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap", children: [
            I,
            Y && /* @__PURE__ */ u("span", { className: "tw:text-muted-foreground", children: [
              " · ",
              Y
            ] })
          ] })
        ]
      },
      X
    );
  };
  return /* @__PURE__ */ u(lr, { open: S, onOpenChange: y, ...E, children: [
    /* @__PURE__ */ a(Dr, { asChild: !0, children: /* @__PURE__ */ u(
      et,
      {
        variant: b,
        role: "combobox",
        "aria-expanded": S,
        "aria-label": C,
        id: t,
        className: v(
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
                className: v(
                  "tw:min-w-0 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap tw:text-start"
                ),
                children: i ? z(i) : p
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
        className: v("tw:w-[200px] tw:p-0", n),
        style: s,
        children: /* @__PURE__ */ u(wr, { children: [
          /* @__PURE__ */ a(
            Da,
            {
              placeholder: h,
              className: "tw:text-inherit",
              spaceSelectsHighlightedItem: !0
            }
          ),
          /* @__PURE__ */ a(Ma, { children: f }),
          /* @__PURE__ */ a(ur, { children: T(e) ? e.map((M) => /* @__PURE__ */ a(Xe, { heading: M.groupHeading, children: M.options.map((D) => O(D, M.groupHeading)) }, M.groupHeading)) : /* @__PURE__ */ a(Xe, { children: e.map((M) => O(M)) }) })
        ] })
      }
    )
  ] });
}
function Rd({
  startChapter: t,
  endChapter: e,
  handleSelectStartChapter: r,
  handleSelectEndChapter: o,
  isDisabled: n = !1,
  chapterCount: s
}) {
  const i = V(
    () => Array.from({ length: s }, (l, w) => w + 1),
    [s]
  );
  return /* @__PURE__ */ u(ft, { children: [
    /* @__PURE__ */ a(Pt, { htmlFor: "start-chapters-combobox", children: "Chapters" }),
    /* @__PURE__ */ a(
      yn,
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
    /* @__PURE__ */ a(Pt, { htmlFor: "end-chapters-combobox", children: "to" }),
    /* @__PURE__ */ a(
      yn,
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
var xo = /* @__PURE__ */ ((t) => (t.CurrentBook = "current book", t.ChooseBooks = "choose books", t))(xo || {});
((t) => {
  t.CURRENT_BOOK = "current book", t.CHOOSE_BOOKS = "choose books";
})(xo || (xo = {}));
const kh = Object.freeze([
  "%webView_bookSelector_currentBook%",
  "%webView_bookSelector_choose%",
  "%webView_bookSelector_chooseBooks%"
]), Za = (t, e) => t[e] ?? e;
function _h({
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
  const w = Za(l, "%webView_bookSelector_currentBook%"), p = Za(l, "%webView_bookSelector_choose%"), h = Za(l, "%webView_bookSelector_chooseBooks%"), [f, b] = _(
    "current book"
    /* CurrentBook */
  ), x = (g) => {
    b(g), t(g);
  };
  return /* @__PURE__ */ a(
    To,
    {
      className: "pr-twp tw:flex",
      value: f,
      onValueChange: (g) => x(g),
      children: /* @__PURE__ */ u("div", { className: "tw:flex tw:w-full tw:flex-col tw:gap-4", children: [
        /* @__PURE__ */ u("div", { className: "tw:grid tw:grid-cols-[25%_25%_50%]", children: [
          /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center", children: [
            /* @__PURE__ */ a(xa, {
              value: "current book"
              /* CurrentBook */
            }),
            /* @__PURE__ */ a(Pt, { className: "tw:ms-1", children: w })
          ] }),
          /* @__PURE__ */ a(Pt, { className: "tw:flex tw:items-center", children: e }),
          /* @__PURE__ */ a("div", { className: "tw:flex tw:items-center tw:justify-end", children: /* @__PURE__ */ a(
            Rd,
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
            /* @__PURE__ */ a(xa, {
              value: "choose books"
              /* ChooseBooks */
            }),
            /* @__PURE__ */ a(Pt, { className: "tw:ms-1", children: h })
          ] }),
          /* @__PURE__ */ a(Pt, { className: "tw:flex tw:items-center", children: o.map((g) => Kt.bookIdToEnglishName(g)).join(", ") }),
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
function Dd(t, e) {
  return { getTheme: function() {
    return e ?? null;
  } };
}
function Oe() {
  const t = za(Ii);
  return t == null && function(e, ...r) {
    const o = new URL("https://lexical.dev/docs/error"), n = new URLSearchParams();
    n.append("code", e);
    for (const s of r) n.append("v", s);
    throw o.search = n.toString(), Error(`Minified Lexical error #${e}; visit ${o.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
  }(8), t;
}
const zi = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, Od = zi ? Ht : J, ca = { tag: $o };
function Md({ initialConfig: t, children: e }) {
  const r = V(() => {
    const { theme: o, namespace: n, nodes: s, onError: i, editorState: c, html: d } = t, l = Dd(null, o), w = ui({ editable: t.editable, html: d, namespace: n, nodes: s, onError: (p) => i(p, w), theme: o });
    return function(p, h) {
      if (h !== null) {
        if (h === void 0) p.update(() => {
          const f = Qe();
          if (f.isEmpty()) {
            const b = Zr();
            f.append(b);
            const x = zi ? document.activeElement : null;
            (ne() !== null || x !== null && x === p.getRootElement()) && b.select();
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
  return Od(() => {
    const o = t.editable, [n] = r;
    n.setEditable(o === void 0 || o);
  }, []), a(Ii.Provider, { value: r, children: e });
}
const Id = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Ht : J;
function zd({ ignoreHistoryMergeTagChange: t = !0, ignoreSelectionChange: e = !1, onChange: r }) {
  const [o] = Oe();
  return Id(() => {
    if (r) return o.registerUpdateListener(({ editorState: n, dirtyElements: s, dirtyLeaves: i, prevEditorState: c, tags: d }) => {
      e && s.size === 0 && i.size === 0 || t && d.has($o) || c.isEmpty() || r(n, o, d);
    });
  }, [o, t, e, r]), null;
}
const Fo = {
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
}, jo = [
  Kl,
  pi,
  hi,
  Hl
], Pd = Wr(null), Xa = {
  didCatch: !1,
  error: null
};
class Ad extends qc {
  constructor(e) {
    super(e), this.resetErrorBoundary = this.resetErrorBoundary.bind(this), this.state = Xa;
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
      }), this.setState(Xa);
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
    if (o && r.error !== null && $d(e.resetKeys, n)) {
      var s, i;
      (s = (i = this.props).onReset) === null || s === void 0 || s.call(i, {
        next: n,
        prev: e.resetKeys,
        reason: "keys"
      }), this.setState(Xa);
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
        c = dn(o, d);
      else if (n !== void 0)
        c = n;
      else
        throw i;
    }
    return dn(Pd.Provider, {
      value: {
        didCatch: s,
        error: i,
        resetErrorBoundary: this.resetErrorBoundary
      }
    }, c);
  }
}
function $d() {
  let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  return t.length !== e.length || t.some((r, o) => !Object.is(r, e[o]));
}
function Vd({ children: t, onError: e }) {
  return a(Ad, { fallback: a("div", { style: { border: "1px solid #f00", color: "#f00", padding: "8px" }, children: "An error was thrown." }), onError: e, children: t });
}
const Ld = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Ht : J;
function Bd(t) {
  return { initialValueFn: () => t.isEditable(), subscribe: (e) => t.registerEditableListener(e) };
}
function Fd() {
  return function(t) {
    const [e] = Oe(), r = V(() => t(e), [e, t]), [o, n] = _(() => r.initialValueFn()), s = A(o);
    return Ld(() => {
      const { initialValueFn: i, subscribe: c } = r, d = i();
      return s.current !== d && (s.current = d, n(d)), c((l) => {
        s.current = l, n(l);
      });
    }, [r, t]), o;
  }(Bd);
}
function jd(t, e) {
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
function Na(t, ...e) {
  const r = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const n of e) o.append("v", n);
  throw r.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
const Pi = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, Ud = Pi && "documentMode" in document ? document.documentMode : null;
!(!Pi || !("InputEvent" in window) || Ud) && "getTargetRanges" in new window.InputEvent("input");
function Ce(t) {
  return `${t}px`;
}
const Kd = { attributes: !0, characterData: !0, childList: !0, subtree: !0 };
function Hd(t, e, r) {
  let o = null, n = null, s = null, i = [];
  const c = document.createElement("div");
  function d() {
    o === null && Na(182), n === null && Na(183);
    const { left: p, top: h } = n.getBoundingClientRect(), f = jd(t, e);
    var b, x;
    c.isConnected || (x = c, (b = n).insertBefore(x, b.firstChild));
    let g = !1;
    for (let C = 0; C < f.length; C++) {
      const E = f[C], S = i[C] || document.createElement("div"), y = S.style;
      y.position !== "absolute" && (y.position = "absolute", g = !0);
      const z = Ce(E.left - p);
      y.left !== z && (y.left = z, g = !0);
      const T = Ce(E.top - h);
      y.top !== T && (S.style.top = T, g = !0);
      const O = Ce(E.width);
      y.width !== O && (S.style.width = O, g = !0);
      const M = Ce(E.height);
      y.height !== M && (S.style.height = M, g = !0), S.parentNode !== c && (c.append(S), g = !0), i[C] = S;
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
    if (!gl(f)) return l();
    l(), o = h, n = f, s = new MutationObserver((b) => {
      const x = t.getRootElement(), g = x && x.parentElement;
      if (x !== o || g !== n) return p();
      for (const C of b) if (!c.contains(C.target)) return d();
    }), s.observe(f, Kd), d();
  });
  return () => {
    w(), l();
  };
}
function kn(t, e, r) {
  if (t.type !== "text" && Hr(e)) {
    const o = e.getDOMSlot(r);
    return [o.element, o.getFirstChildOffset() + t.offset];
  }
  return [hl(r) || r, t.offset];
}
function qd(t) {
  for (const e of t) {
    const r = e.style;
    r.background !== "Highlight" && (r.background = "Highlight"), r.color !== "HighlightText" && (r.color = "HighlightText"), r.marginTop !== Ce(-1.5) && (r.marginTop = Ce(-1.5)), r.paddingTop !== Ce(4) && (r.paddingTop = Ce(4)), r.paddingBottom !== Ce(0) && (r.paddingBottom = Ce(0));
  }
}
function Gd(t, e = qd) {
  let r = null, o = null, n = null, s = null, i = null, c = null, d = () => {
  };
  function l(w) {
    w.read(() => {
      const p = ne();
      if (!Te(p)) return r = null, n = null, s = null, c = null, d(), void (d = () => {
      });
      const [h, f] = function(M) {
        const D = M.getStartEndPoints();
        return M.isBackward() ? [D[1], D[0]] : D;
      }(p), b = h.getNode(), x = b.getKey(), g = h.offset, C = f.getNode(), E = C.getKey(), S = f.offset, y = t.getElementByKey(x), z = t.getElementByKey(E), T = r === null || y !== o || g !== n || x !== r.getKey(), O = s === null || z !== i || S !== c || E !== s.getKey();
      if ((T || O) && y !== null && z !== null) {
        const M = function(D, I, Y, X, B, k, ot) {
          const $ = (D._window ? D._window.document : document).createRange();
          return $.setStart(...kn(I, Y, X)), $.setEnd(...kn(B, k, ot)), $;
        }(t, h, b, y, f, C, z);
        d(), d = Hd(t, M, e);
      }
      r = b, o = y, n = g, s = C, i = z, c = S;
    });
  }
  return l(t.getEditorState()), Le(t.registerUpdateListener(({ editorState: w }) => l(w)), () => {
    d();
  });
}
function Wd(t, e) {
  let r = null;
  const o = () => {
    const n = getSelection(), s = n && n.anchorNode, i = t.getRootElement();
    s !== null && i !== null && i.contains(s) ? r !== null && (r(), r = null) : r === null && (r = Gd(t, e));
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
function Yd(t) {
  const e = fi(t, (r) => Hr(r) && !r.isInline());
  return Hr(e) || Na(4, t.__key), e;
}
function Zd(t) {
  const e = ne() || ol();
  let r;
  if (Te(e)) r = nl(e.focus, "next");
  else {
    if (e != null) {
      const i = e.getNodes(), c = i[i.length - 1];
      c && (r = gi(c, "next"));
    }
    r = r || il(Qe(), "previous").getFlipped().insert(Zr());
  }
  const o = Xd(t, r), n = sl(o), s = cl(n) ? ll(n) : o;
  return dl(wl(s)), t.getLatest();
}
function Xd(t, e, r) {
  let o = wn(e, "next");
  for (let n = o; n; n = ul(n, r)) o = n;
  return pl(o) && Na(283), o.insert(t.isInline() ? Zr().append(t) : t), wn(gi(t.getLatest(), "next"), e.direction);
}
function Jd(t) {
  const e = ne();
  if (!Te(e)) return !1;
  const r = /* @__PURE__ */ new Set(), o = e.getNodes();
  for (let n = 0; n < o.length; n++) {
    const s = o[n], i = s.getKey();
    if (r.has(i)) continue;
    const c = fi(s, (l) => Hr(l) && !l.isInline());
    if (c === null) continue;
    const d = c.getKey();
    c.canIndent() && !r.has(d) && (r.add(d), t(c));
  }
  return r.size > 0;
}
const Qd = Symbol.for("preact-signals");
function $a() {
  if (Ve > 1) return void Ve--;
  let t, e = !1;
  for (!function() {
    let r = Ca;
    for (Ca = void 0; r !== void 0; ) r.S.v === r.v && (r.S.i = r.i), r = r.o;
  }(); jr !== void 0; ) {
    let r = jr;
    for (jr = void 0, Ea++; r !== void 0; ) {
      const o = r.u;
      if (r.u = void 0, r.f &= -3, !(8 & r.f) && Ai(r)) try {
        r.c();
      } catch (n) {
        e || (t = n, e = !0);
      }
      r = o;
    }
  }
  if (Ea = 0, Ve--, e) throw t;
}
function tw(t) {
  if (Ve > 0) return t();
  yo = ++ew, Ve++;
  try {
    return t();
  } finally {
    $a();
  }
}
let pt, jr;
function _n(t) {
  const e = pt;
  pt = void 0;
  try {
    return t();
  } finally {
    pt = e;
  }
}
let Ca, Ve = 0, Ea = 0, ew = 0, yo = 0, ga = 0;
function Nn(t) {
  if (pt === void 0) return;
  let e = t.n;
  return e === void 0 || e.t !== pt ? (e = { i: 0, S: t, p: pt.s, n: void 0, t: pt, e: void 0, x: void 0, r: e }, pt.s !== void 0 && (pt.s.n = e), pt.s = e, t.n = e, 32 & pt.f && t.S(e), e) : e.i === -1 ? (e.i = 0, e.n !== void 0 && (e.n.p = e.p, e.p !== void 0 && (e.p.n = e.n), e.p = pt.s, e.n = void 0, pt.s.n = e, pt.s = e), e) : void 0;
}
function Qt(t, e) {
  this.v = t, this.i = 0, this.n = void 0, this.t = void 0, this.l = 0, this.W = e == null ? void 0 : e.watched, this.Z = e == null ? void 0 : e.unwatched, this.name = e == null ? void 0 : e.name;
}
function qr(t, e) {
  return new Qt(t, e);
}
function Ai(t) {
  for (let e = t.s; e !== void 0; e = e.n) if (e.S.i !== e.i || !e.S.h() || e.S.i !== e.i) return !0;
  return !1;
}
function Cn(t) {
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
function or(t, e) {
  Qt.call(this, void 0), this.x = t, this.s = void 0, this.g = ga - 1, this.f = 4, this.W = e == null ? void 0 : e.watched, this.Z = e == null ? void 0 : e.unwatched, this.name = e == null ? void 0 : e.name;
}
function rw(t, e) {
  return new or(t, e);
}
function Vi(t) {
  const e = t.m;
  if (t.m = void 0, typeof e == "function") {
    Ve++;
    const r = pt;
    pt = void 0;
    try {
      e();
    } catch (o) {
      throw t.f &= -2, t.f |= 8, Uo(t), o;
    } finally {
      pt = r, $a();
    }
  }
}
function Uo(t) {
  for (let e = t.s; e !== void 0; e = e.n) e.S.U(e);
  t.x = void 0, t.s = void 0, Vi(t);
}
function aw(t) {
  if (pt !== this) throw new Error("Out-of-order effect");
  $i(this), pt = t, this.f &= -2, 8 & this.f && Uo(this), $a();
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
function Or(t, e = {}) {
  const r = {};
  for (const o in t) {
    const n = e[o], s = qr(n === void 0 ? t[o] : n);
    r[o] = s;
  }
  return r;
}
Qt.prototype.brand = Qd, Qt.prototype.h = function() {
  return !0;
}, Qt.prototype.S = function(t) {
  const e = this.t;
  e !== t && t.e === void 0 && (t.x = e, this.t = t, e !== void 0 ? e.e = t : _n(() => {
    var r;
    (r = this.W) == null || r.call(this);
  }));
}, Qt.prototype.U = function(t) {
  if (this.t !== void 0) {
    const e = t.e, r = t.x;
    e !== void 0 && (e.x = r, t.e = void 0), r !== void 0 && (r.e = e, t.x = void 0), t === this.t && (this.t = r, r === void 0 && _n(() => {
      var o;
      (o = this.Z) == null || o.call(this);
    }));
  }
}, Qt.prototype.subscribe = function(t) {
  return Se(() => {
    const e = this.value, r = pt;
    pt = void 0;
    try {
      t(e);
    } finally {
      pt = r;
    }
  }, { name: "sub" });
}, Qt.prototype.valueOf = function() {
  return this.value;
}, Qt.prototype.toString = function() {
  return this.value + "";
}, Qt.prototype.toJSON = function() {
  return this.value;
}, Qt.prototype.peek = function() {
  const t = pt;
  pt = void 0;
  try {
    return this.value;
  } finally {
    pt = t;
  }
}, Object.defineProperty(Qt.prototype, "value", { get() {
  const t = Nn(this);
  return t !== void 0 && (t.i = this.i), this.v;
}, set(t) {
  if (t !== this.v) {
    if (Ea > 100) throw new Error("Cycle detected");
    (function(e) {
      Ve !== 0 && Ea === 0 && e.l !== yo && (e.l = yo, Ca = { S: e, v: e.v, i: e.i, o: Ca });
    })(this), this.v = t, this.i++, ga++, Ve++;
    try {
      for (let e = this.t; e !== void 0; e = e.x) e.t.N();
    } finally {
      $a();
    }
  }
} }), or.prototype = new Qt(), or.prototype.h = function() {
  if (this.f &= -3, 1 & this.f) return !1;
  if ((36 & this.f) == 32 || (this.f &= -5, this.g === ga)) return !0;
  if (this.g = ga, this.f |= 1, this.i > 0 && !Ai(this)) return this.f &= -2, !0;
  const t = pt;
  try {
    Cn(this), pt = this;
    const e = this.x();
    (16 & this.f || this.v !== e || this.i === 0) && (this.v = e, this.f &= -17, this.i++);
  } catch (e) {
    this.v = e, this.f |= 16, this.i++;
  }
  return pt = t, $i(this), this.f &= -2, !0;
}, or.prototype.S = function(t) {
  if (this.t === void 0) {
    this.f |= 36;
    for (let e = this.s; e !== void 0; e = e.n) e.S.S(e);
  }
  Qt.prototype.S.call(this, t);
}, or.prototype.U = function(t) {
  if (this.t !== void 0 && (Qt.prototype.U.call(this, t), this.t === void 0)) {
    this.f &= -33;
    for (let e = this.s; e !== void 0; e = e.n) e.S.U(e);
  }
}, or.prototype.N = function() {
  if (!(2 & this.f)) {
    this.f |= 6;
    for (let t = this.t; t !== void 0; t = t.x) t.t.N();
  }
}, Object.defineProperty(or.prototype, "value", { get() {
  if (1 & this.f) throw new Error("Cycle detected");
  const t = Nn(this);
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
  this.f |= 1, this.f &= -9, Vi(this), Cn(this), Ve++;
  const t = pt;
  return pt = this, aw.bind(this, t);
}, xr.prototype.N = function() {
  2 & this.f || (this.f |= 2, this.u = jr, jr = this);
}, xr.prototype.d = function() {
  this.f |= 8, 1 & this.f || Uo(this);
}, xr.prototype.dispose = function() {
  this.d();
};
he({ build: (t, e, r) => Or(e), config: pr({ defaultSelection: "rootEnd", disabled: !1 }), name: "@lexical/extension/AutoFocus", register(t, e, r) {
  const o = r.getOutput();
  return Se(() => o.disabled.value ? void 0 : t.registerRootListener((n) => {
    t.focus(() => {
      const s = document.activeElement;
      n === null || s !== null && n.contains(s) || n.focus({ preventScroll: !0 });
    }, { defaultSelection: o.defaultSelection.peek() });
  }));
} });
function Li() {
  const t = Qe(), e = ne(), r = Zr();
  t.clear(), t.append(r), e !== null && r.select(), Te(e) && (e.format = 0);
}
function Bi(t, e = Li) {
  return t.registerCommand(mi, (r) => (t.update(e), !0), Vo);
}
he({ build: (t, e, r) => Or(e), config: pr({ $onClear: Li }), name: "@lexical/extension/ClearEditor", register(t, e, r) {
  const { $onClear: o } = r.getOutput();
  return Se(() => Bi(t, o.value));
} });
function ow(t) {
  return (typeof t.nodes == "function" ? t.nodes() : t.nodes) || [];
}
const Ja = ml("format", { parse: (t) => typeof t == "number" ? t : 0 });
class Fi extends po {
  $config() {
    return this.config("decorator-text", { extends: po, stateConfigs: [{ flat: !0, stateConfig: Ja }] });
  }
  getFormat() {
    return Rl(this, Ja);
  }
  getFormatFlags(e, r) {
    return un(this.getFormat(), e, r);
  }
  hasFormat(e) {
    const r = Dl[e];
    return (this.getFormat() & r) !== 0;
  }
  setFormat(e) {
    return Ol(this, Ja, e);
  }
  toggleFormat(e) {
    const r = this.getFormat(), o = un(r, e, null);
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
function nw(t) {
  return t instanceof Fi;
}
he({ name: "@lexical/extension/DecoratorText", nodes: () => [Fi], register: (t, e, r) => t.registerCommand(vi, (o) => {
  const n = ne();
  if (bi(n) || Te(n)) for (const s of n.getNodes()) nw(s) && s.toggleFormat(o);
  return !1;
}, xi) });
function ji(t, e) {
  let r;
  return qr(t(), { unwatched() {
    r && (r(), r = void 0);
  }, watched() {
    this.value = t(), r = e(this);
  } });
}
const ko = he({ build: (t) => ji(() => t.getEditorState(), (e) => t.registerUpdateListener((r) => {
  e.value = r.editorState;
})), name: "@lexical/extension/EditorState" });
function vt(t, ...e) {
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
const Ko = 0, _o = 1, Ki = 2, Qa = 3, la = 4, br = 5, to = 6, zr = 7;
function eo(t) {
  return t.id === Ko;
}
function Hi(t) {
  return t.id === Ki;
}
function iw(t) {
  return function(e) {
    return e.id === _o;
  }(t) || vt(305, String(t.id), String(_o)), Object.assign(t, { id: Ki });
}
const sw = /* @__PURE__ */ new Set();
class cw {
  constructor(e, r) {
    Jt(this, "builder");
    Jt(this, "configs");
    Jt(this, "_dependency");
    Jt(this, "_peerNameSet");
    Jt(this, "extension");
    Jt(this, "state");
    Jt(this, "_signal");
    this.builder = e, this.extension = r, this.configs = /* @__PURE__ */ new Set(), this.state = { id: Ko };
  }
  mergeConfigs() {
    let e = this.extension.config || {};
    const r = this.extension.mergeConfig ? this.extension.mergeConfig.bind(this.extension) : fl;
    for (const o of this.configs) e = r(e, o);
    return e;
  }
  init(e) {
    const r = this.state;
    Hi(r) || vt(306, String(r.id));
    const o = { getDependency: this.getInitDependency.bind(this), getDirectDependentNames: this.getDirectDependentNames.bind(this), getPeer: this.getInitPeer.bind(this), getPeerNameSet: this.getPeerNameSet.bind(this) }, n = { ...o, getDependency: this.getDependency.bind(this), getInitResult: this.getInitResult.bind(this), getPeer: this.getPeer.bind(this) }, s = function(c, d, l) {
      return Object.assign(c, { config: d, id: Qa, registerState: l });
    }(r, this.mergeConfigs(), o);
    let i;
    this.state = s, this.extension.init && (i = this.extension.init(e, s.config, o)), this.state = function(c, d, l) {
      return Object.assign(c, { id: la, initResult: d, registerState: l });
    }(s, i, n);
  }
  build(e) {
    const r = this.state;
    let o;
    r.id !== la && vt(307, String(r.id), String(br)), this.extension.build && (o = this.extension.build(e, r.config, r.registerState));
    const n = { ...r.registerState, getOutput: () => o, getSignal: this.getSignal.bind(this) };
    this.state = function(s, i, c) {
      return Object.assign(s, { id: br, output: i, registerState: c });
    }(r, o, n);
  }
  register(e, r) {
    this._signal = r;
    const o = this.state;
    o.id !== br && vt(308, String(o.id), String(br));
    const n = this.extension.register && this.extension.register(e, o.config, o.registerState);
    return this.state = function(s) {
      return Object.assign(s, { id: to });
    }(o), () => {
      const s = this.state;
      s.id !== zr && vt(309, String(o.id), String(zr)), this.state = function(i) {
        return Object.assign(i, { id: br });
      }(s), n && n();
    };
  }
  afterRegistration(e) {
    const r = this.state;
    let o;
    return r.id !== to && vt(310, String(r.id), String(to)), this.extension.afterRegistration && (o = this.extension.afterRegistration(e, r.config, r.registerState)), this.state = function(n) {
      return Object.assign(n, { id: zr });
    }(r), o;
  }
  getSignal() {
    return this._signal === void 0 && vt(311), this._signal;
  }
  getInitResult() {
    this.extension.init === void 0 && vt(312, this.extension.name);
    const e = this.state;
    return function(r) {
      return r.id >= la;
    }(e) || vt(313, String(e.id), String(la)), e.initResult;
  }
  getInitPeer(e) {
    const r = this.builder.extensionNameMap.get(e);
    return r ? r.getExtensionInitDependency() : void 0;
  }
  getExtensionInitDependency() {
    const e = this.state;
    return function(r) {
      return r.id >= Qa;
    }(e) || vt(314, String(e.id), String(Qa)), { config: e.config };
  }
  getPeer(e) {
    const r = this.builder.extensionNameMap.get(e);
    return r ? r.getExtensionDependency() : void 0;
  }
  getInitDependency(e) {
    const r = this.builder.getExtensionRep(e);
    return r === void 0 && vt(315, this.extension.name, e.name), r.getExtensionInitDependency();
  }
  getDependency(e) {
    const r = this.builder.getExtensionRep(e);
    return r === void 0 && vt(315, this.extension.name, e.name), r.getExtensionDependency();
  }
  getState() {
    const e = this.state;
    return function(r) {
      return r.id >= zr;
    }(e) || vt(316, String(e.id), String(zr)), e;
  }
  getDirectDependentNames() {
    return this.builder.incomingEdges.get(this.extension.name) || sw;
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
      })(e) || vt(317, this.extension.name), this._dependency = { config: e.config, init: e.initResult, output: e.output };
    }
    return this._dependency;
  }
}
const En = { tag: $o };
function lw() {
  const t = Qe();
  t.isEmpty() && t.append(Zr());
}
const dw = he({ config: pr({ setOptions: En, updateOptions: En }), init: ({ $initialEditorState: t = lw }) => ({ $initialEditorState: t, initialized: !1 }), afterRegistration(t, { updateOptions: e, setOptions: r }, o) {
  const n = o.getInitResult();
  if (!n.initialized) {
    n.initialized = !0;
    const { $initialEditorState: s } = n;
    if (yl(s)) t.setEditorState(s, r);
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
}, name: "@lexical/extension/InitialState", nodes: [vl, hi, bl, xl, pi] }), Tn = Symbol.for("@lexical/extension/LexicalBuilder");
function Sn() {
}
function ww(t) {
  throw t;
}
function da(t) {
  return Array.isArray(t) ? t : [t];
}
const ro = "0.43.0+prod.esm";
class Nr {
  constructor(e) {
    Jt(this, "roots");
    Jt(this, "extensionNameMap");
    Jt(this, "outgoingConfigEdges");
    Jt(this, "incomingEdges");
    Jt(this, "conflicts");
    Jt(this, "_sortedExtensionReps");
    Jt(this, "PACKAGE_VERSION");
    this.outgoingConfigEdges = /* @__PURE__ */ new Map(), this.incomingEdges = /* @__PURE__ */ new Map(), this.extensionNameMap = /* @__PURE__ */ new Map(), this.conflicts = /* @__PURE__ */ new Map(), this.PACKAGE_VERSION = ro, this.roots = e;
    for (const r of e) this.addExtension(r);
  }
  static fromExtensions(e) {
    const r = [da(dw)];
    for (const o of e) r.push(da(o));
    return new Nr(r);
  }
  static maybeFromEditor(e) {
    const r = e[Tn];
    return r && (r.PACKAGE_VERSION !== ro && vt(292, r.PACKAGE_VERSION, ro), r instanceof Nr || vt(293)), r;
  }
  static fromEditor(e) {
    const r = Nr.maybeFromEditor(e);
    return r === void 0 && vt(294), r;
  }
  constructEditor() {
    const { $initialEditorState: e, onError: r, ...o } = this.buildCreateEditorArgs(), n = Object.assign(ui({ ...o, ...r ? { onError: (s) => {
      r(s, n);
    } } : {} }), { [Tn]: this });
    for (const s of this.sortedExtensionReps()) s.build(n);
    return n;
  }
  buildEditor() {
    let e = Sn;
    function r() {
      try {
        e();
      } finally {
        e = Sn;
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
    if (r) return r.extension !== e && vt(295, e.name), r;
  }
  addEdge(e, r, o) {
    const n = this.outgoingConfigEdges.get(e);
    n ? n.set(r, o) : this.outgoingConfigEdges.set(e, /* @__PURE__ */ new Map([[r, o]]));
    const s = this.incomingEdges.get(r);
    s ? s.add(e) : this.incomingEdges.set(r, /* @__PURE__ */ new Set([e]));
  }
  addExtension(e) {
    this._sortedExtensionReps !== void 0 && vt(296);
    const r = da(e), [o] = r;
    typeof o.name != "string" && vt(297, typeof o.name);
    let n = this.extensionNameMap.get(o.name);
    if (n !== void 0 && n.extension !== o && vt(298, o.name), !n) {
      n = new cw(this, o), this.extensionNameMap.set(o.name, n);
      const s = this.conflicts.get(o.name);
      typeof s == "string" && vt(299, o.name, s);
      for (const i of o.conflictsWith || []) this.extensionNameMap.has(i) && vt(299, o.name, i), this.conflicts.set(i, o.name);
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
      eo(s) || vt(300, i, n || "[unknown]"), eo(c = s) || vt(304, String(c.id), String(Ko)), s = Object.assign(c, { id: _o }), o.state = s;
      const d = this.outgoingConfigEdges.get(i);
      if (d) for (const l of d.keys()) {
        const w = this.extensionNameMap.get(l);
        w && r(w, i);
      }
      s = iw(s), o.state = s, e.push(o);
    };
    for (const o of this.extensionNameMap.values()) eo(o.state) && r(o);
    for (const o of e) for (const [n, s] of this.outgoingConfigEdges.get(o.extension.name) || []) if (s.length > 0) {
      const i = this.extensionNameMap.get(n);
      if (i) for (const c of s) i.configs.add(c);
    }
    for (const [o, ...n] of this.roots) if (n.length > 0) {
      const s = this.extensionNameMap.get(o.name);
      s === void 0 && vt(301, o.name);
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
      if (p.onError !== void 0 && (e.onError = p.onError), p.disableEvents !== void 0 && (e.disableEvents = p.disableEvents), p.parentEditor !== void 0 && (e.parentEditor = p.parentEditor), p.editable !== void 0 && (e.editable = p.editable), p.namespace !== void 0 && (e.namespace = p.namespace), p.$initialEditorState !== void 0 && (e.$initialEditorState = p.$initialEditorState), p.nodes) for (const h of ow(p)) {
        if (typeof h != "function") {
          const f = o.get(h.replace);
          f && vt(302, p.name, h.replace.name, f.extension.name), o.set(h.replace, w);
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
    return e.onError || (e.onError = ww), e;
  }
}
const uw = /* @__PURE__ */ new Set(), Rn = he({ build(t, e, r) {
  const o = r.getDependency(ko).output, n = qr({ watchedNodeKeys: /* @__PURE__ */ new Map() }), s = ji(() => {
  }, () => Se(() => {
    const i = s.peek(), { watchedNodeKeys: c } = n.value;
    let d, l = !1;
    o.value.read(() => {
      if (ne()) for (const [w, p] of c.entries()) {
        if (p.size === 0) {
          c.delete(w);
          continue;
        }
        const h = Il(w), f = h && h.isSelected() || !1;
        l = l || f !== (!!i && i.has(w)), f && (d = d || /* @__PURE__ */ new Set(), d.add(w));
      }
    }), !l && d && i && d.size === i.size || (s.value = d);
  }));
  return { watchNodeKey: function(i) {
    const c = rw(() => (s.value || uw).has(i)), { watchedNodeKeys: d } = n.peek();
    let l = d.get(i);
    const w = l !== void 0;
    return l = l || /* @__PURE__ */ new Set(), l.add(c), w || (d.set(i, l), n.value = { watchedNodeKeys: d }), c;
  } };
}, dependencies: [ko], name: "@lexical/extension/NodeSelection" }), pw = kl("INSERT_HORIZONTAL_RULE_COMMAND");
class Cr extends po {
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
    return { hr: () => ({ conversion: hw, priority: 0 }) };
  }
  exportDOM() {
    return { element: document.createElement("hr") };
  }
  createDOM(e) {
    const r = document.createElement("hr");
    return yi(r, e.theme.hr), r;
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
function hw() {
  return { node: Ho() };
}
function Ho() {
  return Ml(Cr);
}
function gw(t) {
  return t instanceof Cr;
}
he({ dependencies: [ko, Rn], name: "@lexical/extension/HorizontalRule", nodes: () => [Cr], register(t, e, r) {
  const { watchNodeKey: o } = r.getDependency(Rn).output, n = qr({ nodeSelections: /* @__PURE__ */ new Map() }), s = t._config.theme.hrSelected ?? "selected";
  return Le(t.registerCommand(pw, (i) => {
    const c = ne();
    if (!Te(c)) return !1;
    if (c.focus.getNode() !== null) {
      const d = Ho();
      Zd(d);
    }
    return !0;
  }, Vo), t.registerCommand(_l, (i) => {
    if (Nl(i.target)) {
      const c = Cl(i.target);
      if (gw(c)) return function(d, l = !1) {
        const w = ne(), p = d.isSelected(), h = d.getKey();
        let f;
        l && bi(w) ? f = w : (f = El(), Tl(f)), p ? f.delete(h) : f.add(h);
      }(c, i.shiftKey), !0;
    }
    return !1;
  }, xi), t.registerMutationListener(Cr, (i, c) => {
    tw(() => {
      let d = !1;
      const { nodeSelections: l } = n.peek();
      for (const [w, p] of i.entries()) if (p === "destroyed") l.delete(w), d = !0;
      else {
        const h = l.get(w), f = t.getElementByKey(w);
        h ? h.domNode.value = f : (d = !0, l.set(w, { domNode: qr(f), selectedSignal: o(w) }));
      }
      d && (n.value = { nodeSelections: l });
    });
  }), Se(() => {
    const i = [];
    for (const { domNode: c, selectedSignal: d } of n.value.nodeSelections.values()) i.push(Se(() => {
      const l = c.value;
      l && (d.value ? yi(l, s) : zl(l, s));
    }));
    return Le(...i);
  }));
} });
he({ build: (t, e) => Or({ inheritEditableFromParent: e.inheritEditableFromParent }), config: pr({ $getParentEditor: function() {
  const t = Sl();
  return Nr.fromEditor(t), t;
}, inheritEditableFromParent: !1 }), init: (t, e, r) => {
  const o = e.$getParentEditor();
  t.parentEditor = o, t.theme = t.theme || o._config.theme;
}, name: "@lexical/extension/NestedEditor", register: (t, e, r) => Se(() => {
  const o = t._parentEditor;
  if (o && r.getOutput().inheritEditableFromParent.value) return t.setEditable(o.isEditable()), o.registerEditableListener(t.setEditable.bind(t));
}) });
he({ build: (t, e, r) => Or(e), config: pr({ disabled: !1, onReposition: void 0 }), name: "@lexical/utils/SelectionAlwaysOnDisplay", register: (t, e, r) => {
  const o = r.getOutput();
  return Se(() => {
    if (!o.disabled.value) return Wd(t, o.onReposition.value);
  });
} });
function qi(t) {
  return t.canBeEmpty();
}
function fw(t, e, r = qi) {
  return Le(t.registerCommand(Pl, (o) => {
    const n = ne();
    if (!Te(n)) return !1;
    o.preventDefault();
    const s = function(i) {
      if (i.getNodes().filter((h) => Al(h) && h.canIndent()).length > 0) return !0;
      const c = i.anchor, d = i.focus, l = d.isBefore(c) ? d : c, w = l.getNode(), p = Yd(w);
      if (p.canIndent()) {
        const h = p.getKey();
        let f = $l();
        if (f.anchor.set(h, 0, "element"), f.focus.set(h, 0, "element"), f = Vl(f), f.anchor.is(l)) return !0;
      }
      return !1;
    }(n) ? o.shiftKey ? Ll : pn : Bl;
    return t.dispatchCommand(s, void 0);
  }, Vo), t.registerCommand(pn, () => {
    const o = typeof e == "number" ? e : e ? e.peek() : null, n = ne();
    if (!Te(n)) return !1;
    const s = typeof r == "function" ? r : r.peek();
    return Jd((i) => {
      if (s(i)) {
        const c = i.getIndent() + 1;
        (!o || c < o) && i.setIndent(c);
      }
    });
  }, Lo));
}
he({ build: (t, e, r) => Or(e), config: pr({ $canIndent: qi, disabled: !1, maxIndent: null }), name: "@lexical/extension/TabIndentation", register(t, e, r) {
  const { disabled: o, maxIndent: n, $canIndent: s } = r.getOutput();
  return Se(() => {
    if (!o.value) return fw(t, n, s);
  });
} });
const mw = he({ name: "@lexical/react/ReactProvider" });
function vw() {
  return Qe().getTextContent();
}
function bw(t, e = !0) {
  if (t) return !1;
  let r = vw();
  return e && (r = r.trim()), r === "";
}
function xw(t) {
  if (!bw(t, !1)) return !1;
  const e = Qe().getChildren(), r = e.length;
  if (r > 1) return !1;
  for (let o = 0; o < r; o++) {
    const n = e[o];
    if (Fl(n)) return !1;
    if (Hr(n)) {
      if (!jl(n) || n.__indent !== 0) return !1;
      const s = n.getChildren(), i = s.length;
      for (let c = 0; c < i; c++) {
        const d = s[o];
        if (!ho(d)) return !1;
      }
    }
  }
  return !0;
}
function Gi(t) {
  return () => xw(t);
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
              const b = ne();
              if (Te(b)) {
                const x = b.anchor;
                let g = x.getNode(), C = 0, E = 0;
                if (ho(g) && l >= 0 && w >= 0 && (C = l, E = l + w, b.setTextNodeRange(g, C, g, E)), C === E && p === "" || (b.insertRawText(p), g = x.getNode()), ho(g)) {
                  C = h, E = h + f;
                  const S = g.getTextContentSize();
                  C = C > S ? S : C, E = E > S ? S : E, b.setTextNodeRange(g, C, g, E);
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
he({ build: (t, e, r) => Or(e), config: pr({ disabled: typeof window > "u" }), name: "@lexical/dragon", register: (t, e, r) => Se(() => r.getOutput().disabled.value ? void 0 : Wi(t)) });
function yw(t, ...e) {
  const r = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const n of e) o.append("v", n);
  throw r.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
const qo = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Ht : J;
function kw({ editor: t, ErrorBoundary: e }) {
  return function(r, o) {
    const [n, s] = _(() => r.getDecorators());
    return qo(() => r.registerDecoratorListener((i) => {
      Gl(() => {
        s(i);
      });
    }), [r]), J(() => {
      s(r.getDecorators());
    }, [r]), V(() => {
      const i = [], c = Object.keys(n);
      for (let d = 0; d < c.length; d++) {
        const l = c[d], w = a(o, { onError: (h) => r._onError(h), children: a(Gc, { fallback: null, children: n[l] }) }), p = r.getElementByKey(l);
        p !== null && i.push(Wl(w, p, l));
      }
      return i;
    }, [o, n, r]);
  }(t, e);
}
function _w({ editor: t, ErrorBoundary: e }) {
  return function(r) {
    const o = Nr.maybeFromEditor(r);
    if (o && o.hasExtensionByName(mw.name)) {
      for (const n of ["@lexical/plain-text", "@lexical/rich-text"]) o.hasExtensionByName(n) && yw(320, n);
      return !0;
    }
    return !1;
  }(t) ? null : a(kw, { editor: t, ErrorBoundary: e });
}
function Dn(t) {
  return t.getEditorState().read(Gi(t.isComposing()));
}
function Nw({ contentEditable: t, placeholder: e = null, ErrorBoundary: r }) {
  const [o] = Oe();
  return function(n) {
    qo(() => Le(ql(n), Wi(n)), [n]);
  }(o), u(ft, { children: [t, a(Cw, { content: e }), a(_w, { editor: o, ErrorBoundary: r })] });
}
function Cw({ content: t }) {
  const [e] = Oe(), r = function(n) {
    const [s, i] = _(() => Dn(n));
    return qo(() => {
      function c() {
        const d = Dn(n);
        i(d);
      }
      return c(), Le(n.registerUpdateListener(() => {
        c();
      }), n.registerEditableListener(() => {
        c();
      }));
    }, [n]), s;
  }(e), o = Fd();
  return r ? typeof t == "function" ? t(o) : t : null;
}
function Ew({ defaultSelection: t }) {
  const [e] = Oe();
  return J(() => {
    e.focus(() => {
      const r = document.activeElement, o = e.getRootElement();
      o === null || r !== null && o.contains(r) || o.focus({ preventScroll: !0 });
    }, { defaultSelection: t });
  }, [t, e]), null;
}
const Tw = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Ht : J;
function Sw({ onClear: t }) {
  const [e] = Oe();
  return Tw(() => Bi(e, t), [e, t]), null;
}
const Yi = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Ht : J;
function Rw({ editor: t, ariaActiveDescendant: e, ariaAutoComplete: r, ariaControls: o, ariaDescribedBy: n, ariaErrorMessage: s, ariaExpanded: i, ariaInvalid: c, ariaLabel: d, ariaLabelledBy: l, ariaMultiline: w, ariaOwns: p, ariaRequired: h, autoCapitalize: f, className: b, id: x, role: g = "textbox", spellCheck: C = !0, style: E, tabIndex: S, "data-testid": y, ...z }, T) {
  const [O, M] = _(t.isEditable()), D = L((Y) => {
    Y && Y.ownerDocument && Y.ownerDocument.defaultView ? t.setRootElement(Y) : t.setRootElement(null);
  }, [t]), I = V(() => /* @__PURE__ */ function(...Y) {
    return (X) => {
      for (const B of Y) typeof B == "function" ? B(X) : B != null && (B.current = X);
    };
  }(T, D), [D, T]);
  return Yi(() => (M(t.isEditable()), t.registerEditableListener((Y) => {
    M(Y);
  })), [t]), a("div", { "aria-activedescendant": O ? e : void 0, "aria-autocomplete": O ? r : "none", "aria-controls": O ? o : void 0, "aria-describedby": n, ...s != null ? { "aria-errormessage": s } : {}, "aria-expanded": O && g === "combobox" ? !!i : void 0, ...c != null ? { "aria-invalid": c } : {}, "aria-label": d, "aria-labelledby": l, "aria-multiline": w, "aria-owns": O ? p : void 0, "aria-readonly": !O || void 0, "aria-required": h, autoCapitalize: f, className: b, contentEditable: O, "data-testid": y, id: x, ref: I, role: g, spellCheck: C, style: E, tabIndex: S, ...z });
}
const Dw = Ao(Rw);
function On(t) {
  return t.getEditorState().read(Gi(t.isComposing()));
}
const Ow = Ao(Mw);
function Mw(t, e) {
  const { placeholder: r, ...o } = t, [n] = Oe();
  return u(ft, { children: [a(Dw, { editor: n, ...o, ref: e }), r != null && a(Iw, { editor: n, content: r })] });
}
function Iw({ content: t, editor: e }) {
  const r = function(i) {
    const [c, d] = _(() => On(i));
    return Yi(() => {
      function l() {
        const w = On(i);
        d(w);
      }
      return l(), Le(i.registerUpdateListener(() => {
        l();
      }), i.registerEditableListener(() => {
        l();
      }));
    }, [i]), c;
  }(e), [o, n] = _(e.isEditable());
  if (Ht(() => (n(e.isEditable()), e.registerEditableListener((i) => {
    n(i);
  })), [e]), !r) return null;
  let s = null;
  return typeof t == "function" ? s = t(o) : t !== null && (s = t), s === null ? null : a("div", { "aria-hidden": !0, children: s });
}
function zw({
  placeholder: t,
  className: e,
  placeholderClassName: r
}) {
  return /* @__PURE__ */ a(
    Ow,
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
const Zi = Wr(void 0);
function Pw({
  activeEditor: t,
  $updateToolbar: e,
  blockType: r,
  setBlockType: o,
  showModal: n,
  children: s
}) {
  const i = V(
    () => ({
      activeEditor: t,
      $updateToolbar: e,
      blockType: r,
      setBlockType: o,
      showModal: n
    }),
    [t, e, r, o, n]
  );
  return /* @__PURE__ */ a(Zi.Provider, { value: i, children: s });
}
function Xi() {
  const t = za(Zi);
  if (!t)
    throw new Error("useToolbarContext must be used within a ToolbarContext provider");
  return t;
}
function Aw() {
  const [t, e] = _(void 0), r = L(() => {
    e(void 0);
  }, []), o = V(() => {
    if (t === void 0)
      return;
    const { title: s, content: i } = t;
    return /* @__PURE__ */ a(io, { open: !0, onOpenChange: r, children: /* @__PURE__ */ u(so, { children: [
      /* @__PURE__ */ a(co, { children: /* @__PURE__ */ a(lo, { children: s }) }),
      i
    ] }) });
  }, [t, r]), n = L(
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
function $w({
  children: t
}) {
  const [e] = Oe(), [r, o] = _(e), [n, s] = _("paragraph"), [i, c] = Aw(), d = () => {
  };
  return J(() => r.registerCommand(
    ki,
    (l, w) => (o(w), !1),
    Lo
  ), [r]), /* @__PURE__ */ u(
    Pw,
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
function Vw(t) {
  const [e] = Oe(), { activeEditor: r } = Xi();
  J(() => r.registerCommand(
    ki,
    () => {
      const o = ne();
      return o && t(o), !1;
    },
    Lo
  ), [e, t]), J(() => {
    r.getEditorState().read(() => {
      const o = ne();
      o && t(o);
    });
  }, [r, t]);
}
const Mn = [
  { format: "bold", icon: ec, label: "Bold" },
  { format: "italic", icon: rc, label: "Italic" }
  // CUSTOM: TJ removed underline and strikethrough as they are not supported by the current comment
  // data conversion and are not in P9 anyway. We can add these back if we ever get this supported.
  /* { format: 'underline', icon: UnderlineIcon, label: 'Underline' },
  { format: 'strikethrough', icon: StrikethroughIcon, label: 'Strikethrough' }, */
];
function Lw() {
  const { activeEditor: t } = Xi(), [e, r] = _([]), o = L((n) => {
    if (Te(n) || Yl(n)) {
      const s = [];
      Mn.forEach(({ format: i }) => {
        n.hasFormat(i) && s.push(i);
      }), r((i) => i.length !== s.length || !s.every((c) => i.includes(c)) ? s : i);
    }
  }, []);
  return Vw(o), /* @__PURE__ */ a(
    Gn,
    {
      type: "multiple",
      value: e,
      onValueChange: r,
      variant: "outline",
      size: "sm",
      children: Mn.map(({ format: n, icon: s, label: i }) => /* @__PURE__ */ a(
        wa,
        {
          value: n,
          "aria-label": i,
          onClick: () => {
            t.dispatchCommand(vi, n);
          },
          children: /* @__PURE__ */ a(s, { className: "tw:h-4 tw:w-4" })
        },
        n
      ))
    }
  );
}
function Bw({ onClear: t }) {
  const [e] = Oe();
  J(() => {
    t && t(() => {
      e.dispatchCommand(mi, void 0);
    });
  }, [e, t]);
}
function Fw({
  placeholder: t = "Start typing ...",
  autoFocus: e = !1,
  onClear: r,
  actions: o
}) {
  const [, n] = _(void 0);
  return /* @__PURE__ */ u("div", { className: "tw:relative", children: [
    /* @__PURE__ */ a($w, { children: () => (
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
          children: /* @__PURE__ */ a(Lw, {})
        }
      )
    ) }),
    /* @__PURE__ */ u("div", { className: "tw:relative", children: [
      /* @__PURE__ */ a(
        Nw,
        {
          contentEditable: /* @__PURE__ */ a("div", { ref: (i) => {
            i !== void 0 && n(i);
          }, children: /* @__PURE__ */ a(zw, { placeholder: t }) }),
          ErrorBoundary: Vd
        }
      ),
      e && /* @__PURE__ */ a(Ew, { defaultSelection: "rootEnd" }),
      /* @__PURE__ */ a(Bw, { onClear: r }),
      /* @__PURE__ */ a(Sw, {})
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
const jw = {
  namespace: "commentEditor",
  theme: Fo,
  nodes: jo,
  onError: (t) => {
    console.error(t);
  }
};
function Ta({
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
    ...jw,
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
        className: v(
          "pr-twp tw:overflow-hidden tw:rounded-lg tw:border tw:bg-background tw:shadow",
          c
        ),
        children: /* @__PURE__ */ a(Md, { initialConfig: l, children: /* @__PURE__ */ u(At, { children: [
          /* @__PURE__ */ a(
            Fw,
            {
              placeholder: n,
              autoFocus: s,
              onClear: i,
              actions: d
            }
          ),
          /* @__PURE__ */ a(zd, { ignoreSelectionChange: !0, onChange: w })
        ] }) })
      }
    )
  );
}
function Ji(t) {
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
function se(t) {
  var e;
  return (e = t == null ? void 0 : t.root) != null && e.children ? Qi(t.root.children) : !1;
}
function Uw(t) {
  if (!t || t.trim() === "")
    throw new Error("Input HTML is empty");
  const e = _i({
    namespace: "EditorUtils",
    theme: Fo,
    nodes: jo,
    onError: (o) => {
      console.error(o);
    }
  });
  let r;
  if (e.update(
    () => {
      const n = new DOMParser().parseFromString(t, "text/html"), s = Xl(e, n);
      Qe().clear(), Ul(s);
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
function Sa(t) {
  const e = _i({
    namespace: "EditorUtils",
    theme: Fo,
    nodes: jo,
    onError: (n) => {
      console.error(n);
    }
  }), r = e.parseEditorState(JSON.stringify(t));
  e.setEditorState(r);
  let o = "";
  return e.getEditorState().read(() => {
    o = Zl(e);
  }), o = o.replace(/\s+style="[^"]*"/g, "").replace(/\s+class="[^"]*"/g, "").replace(/<span>(.*?)<\/span>/g, "$1").replace(/<b><strong[^>]*>(.*?)<\/strong><\/b>/g, "<b>$1</b>").replace(/<strong><b[^>]*>(.*?)<\/b><\/strong>/g, "<b>$1</b>").replace(/<i><em[^>]*>(.*?)<\/em><\/i>/g, "<i>$1</i>").replace(/<em><i[^>]*>(.*?)<\/i><\/em>/g, "<i>$1</i>").replace(/<u><span[^>]*>(.*?)<\/span><\/u>/g, "<u>$1</u>").replace(/<s><span[^>]*>(.*?)<\/span><\/s>/g, "<s>$1</s>").replace(/<br\s*\/?>/gi, "<br/>"), o;
}
function Go(t) {
  return ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Home", "End"].includes(t.key) ? (t.stopPropagation(), !0) : !1;
}
const ts = Object.freeze([
  "%cancelButton_tooltip%",
  "%acceptButton_tooltip%"
]), In = (t, e) => t[e] ?? e;
function es({
  onCancelClick: t,
  onAcceptClick: e,
  canAccept: r = !0,
  localizedStrings: o = {},
  className: n = "tw:h-6 tw:w-6",
  acceptLabel: s
}) {
  const i = In(o, "%cancelButton_tooltip%"), c = s ?? In(o, "%acceptButton_tooltip%");
  return /* @__PURE__ */ u(Oa, { children: [
    /* @__PURE__ */ a(At, { children: /* @__PURE__ */ u(_t, { children: [
      /* @__PURE__ */ a(Nt, { asChild: !0, children: /* @__PURE__ */ a(
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
      /* @__PURE__ */ a(Ct, { children: /* @__PURE__ */ a("p", { children: i }) })
    ] }) }),
    /* @__PURE__ */ a(Eo, {}),
    /* @__PURE__ */ a(At, { children: /* @__PURE__ */ u(_t, { children: [
      /* @__PURE__ */ a(Nt, { asChild: !0, children: /* @__PURE__ */ a(
        et,
        {
          "aria-label": c,
          className: n,
          size: "icon",
          onClick: e,
          disabled: !r,
          children: /* @__PURE__ */ a(Je, {})
        }
      ) }),
      /* @__PURE__ */ a(Ct, { children: /* @__PURE__ */ a("p", { children: c }) })
    ] }) })
  ] });
}
const Kw = "verseText", Nh = Object.freeze([
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
function Vr(t) {
  return t !== void 0 && Object.keys(t).length > 0;
}
function zn(t) {
  return t.editorState === void 0 && t.assignedUser === void 0 && !Vr(t.commentEdits);
}
const rs = [
  "tw:prose tw:max-w-none tw:break-words tw:text-sm tw:font-normal tw:text-foreground",
  "tw:[&>blockquote]:border-s-0 tw:[&>blockquote]:p-0 tw:[&>blockquote]:ps-0 tw:[&>blockquote]:font-normal tw:[&>blockquote]:not-italic tw:[&>blockquote]:text-foreground",
  "tw:prose-quoteless"
].join(" ");
function as(t) {
  return (t == null ? void 0 : t.conflictType) === Kw;
}
function os(t) {
  return t === "replaced" ? "reject" : t === "merged" ? "merged" : "accept";
}
function fa(t, e) {
  return t === "" ? e["%comment_assign_unassigned%"] ?? "Unassigned" : t === "Team" ? e["%comment_assign_team%"] ?? "Team" : t;
}
function Wo(t) {
  const e = So();
  return t.key === "Enter" && (e && t.metaKey || !e && t.ctrlKey);
}
function pe(t, e, r) {
  const o = e[t];
  return o === void 0 || o === t ? r : o;
}
const Hw = {
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
}, qw = {
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
function ao(t, e) {
  return t === "" ? e["%commentEditor_unassigned%"] ?? "Unassigned" : t === "Team" ? e["%commentEditor_team%"] ?? "Team" : t;
}
function Ch({
  assignableUsers: t,
  onSave: e,
  onClose: r,
  localizedStrings: o,
  initialAssignedUser: n
}) {
  const [s, i] = _(qw), [c, d] = _(n), [l, w] = _(!1), p = A(void 0), h = A(null);
  J(() => {
    let g = !0;
    const C = h.current;
    if (!C) return;
    const E = setTimeout(() => {
      g && Ji(C);
    }, 300);
    return () => {
      g = !1, clearTimeout(E);
    };
  }, []);
  const f = L(() => {
    if (!se(s)) return;
    const g = Sa(s);
    e(g, c);
  }, [s, e, c]), b = o["%commentEditor_placeholder%"] ?? "Type your comment here...", x = o["%commentEditor_assignTo_label%"] ?? "Assign to";
  return /* @__PURE__ */ u("div", { className: "pr-twp tw:grid tw:gap-3", children: [
    /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:justify-between", children: [
      /* @__PURE__ */ a("span", { className: "tw:text-sm tw:font-medium", children: x }),
      /* @__PURE__ */ a(
        es,
        {
          onCancelClick: r,
          onAcceptClick: f,
          canAccept: se(s),
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
            /* @__PURE__ */ a("span", { children: ao(c !== void 0 ? c : "", o) })
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
              children: /* @__PURE__ */ a("span", { children: ao(g, o) })
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
          g.key === "Escape" ? (g.preventDefault(), g.stopPropagation(), r()) : Wo(g) && (g.preventDefault(), g.stopPropagation(), se(s) && f());
        },
        onKeyDown: (g) => {
          Go(g), (g.key === "Enter" || g.key === " ") && g.stopPropagation();
        },
        children: /* @__PURE__ */ a(
          Ta,
          {
            editorSerializedState: s,
            onSerializedChange: (g) => i(g),
            placeholder: b,
            onClear: (g) => {
              p.current = g;
            }
          }
        )
      }
    )
  ] });
}
const Eh = Object.freeze([
  "%commentEditor_placeholder%",
  "%commentEditor_assignTo_label%",
  "%commentEditor_saveButton_tooltip%",
  "%commentEditor_unassigned%",
  "%commentEditor_team%",
  ...ts
]), Th = Object.freeze([
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
]), Gw = "comment-list";
function Sh(t) {
  return t;
}
function Ww({
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
function Rh({ className: t, ...e }) {
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
function Dh({ className: t, ...e }) {
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
function Oh({ className: t, ...e }) {
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
function Yw({ className: t, ...e }) {
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
function Mh({ className: t, ...e }) {
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
function Gr({
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
function Zw({
  className: t,
  size: e = "default",
  ...r
}) {
  return /* @__PURE__ */ a(
    Bo.Root,
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
function Ih({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    Bo.Image,
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
function Xw({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    Bo.Fallback,
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
function Pn({
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
  const [w, p] = _(), h = d ?? w, b = h !== void 0 && o, x = l !== void 0, g = L(
    (B) => {
      x || p(B), l == null || l(B);
    },
    [x, l]
  ), C = A(null), E = A(!1);
  J(() => {
    if (!b || !E.current) return;
    E.current = !1;
    let B = !0;
    const k = C.current;
    if (!k) return;
    const ot = setTimeout(() => {
      B && Ji(k);
    }, 300);
    return () => {
      B = !1, clearTimeout(ot);
    };
  }, [b]);
  const S = L(
    (B) => {
      B && B.stopPropagation(), g(void 0), i == null || i(!1);
    },
    [i, g]
  ), y = L(
    async (B) => {
      if (B && B.stopPropagation(), !h || !n) return;
      await n(
        t.id,
        Sa(h)
      ) && (g(void 0), i == null || i(!1));
    },
    [h, n, t.id, i, g]
  ), z = V(() => {
    const B = new Date(t.date), k = Pc(
      B,
      r["%comment_date_today%"],
      r["%comment_date_yesterday%"]
    ), ot = B.toLocaleTimeString(void 0, {
      hour: "numeric",
      minute: "2-digit"
    });
    return Ye(r["%comment_dateAtTime%"], {
      date: k,
      time: ot
    });
  }, [t.date, r]), T = V(() => t.user, [t.user]), O = V(
    () => t.user.split(" ").map((B) => B[0]).join("").toUpperCase().slice(0, 2),
    [t.user]
  ), M = V(() => Po(t.contents), [t.contents]), D = V(
    () => t.contents.replace(/<[^>]*>/g, "").trim().length > 0,
    [t.contents]
  ), I = !!t.conflictResolutionAction && !D, Y = V(() => {
    if (o && c)
      return /* @__PURE__ */ u(ft, { children: [
        /* @__PURE__ */ u(
          Ge,
          {
            onClick: (B) => {
              B.stopPropagation(), E.current = !0;
              const k = t.contents.trim() !== "";
              g(k ? Uw(t.contents) : Hw), i == null || i(!0);
            },
            children: [
              /* @__PURE__ */ a(ac, { className: "tw:me-2 tw:h-4 tw:w-4" }),
              r["%comment_editComment%"]
            ]
          }
        ),
        /* @__PURE__ */ u(
          Ge,
          {
            onClick: async (B) => {
              B.stopPropagation(), s && await s(t.id);
            },
            children: [
              /* @__PURE__ */ a(oc, { className: "tw:me-2 tw:h-4 tw:w-4" }),
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
  ]), X = !se(h);
  return /* @__PURE__ */ u(
    "div",
    {
      className: v("tw:flex tw:w-full tw:flex-row tw:items-baseline tw:gap-2", {
        "tw:text-sm": e
      }),
      children: [
        /* @__PURE__ */ a(Zw, { className: "tw:h-8 tw:w-8", children: /* @__PURE__ */ a(Xw, { className: "tw:text-xs tw:font-medium", children: O }) }),
        /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-1 tw:flex-col tw:gap-1", children: [
          /* @__PURE__ */ u("div", { className: "tw:flex tw:w-full tw:flex-row tw:flex-wrap tw:items-baseline tw:gap-x-2", children: [
            /* @__PURE__ */ a("p", { className: "tw:text-sm tw:font-medium", children: T }),
            /* @__PURE__ */ a("p", { className: "tw:text-xs tw:font-normal tw:text-muted-foreground", children: z }),
            /* @__PURE__ */ a("div", { className: "tw:flex-1" }),
            e && t.assignedUser !== void 0 && /* @__PURE__ */ u(Ur, { variant: "secondary", className: "tw:text-xs tw:font-normal", children: [
              "→ ",
              fa(t.assignedUser, r)
            ] })
          ] }),
          b && /* @__PURE__ */ a(
            "div",
            {
              role: "textbox",
              tabIndex: -1,
              className: "tw:flex tw:flex-col tw:gap-2",
              ref: C,
              onKeyDownCapture: (B) => {
                B.key === "Escape" ? (B.preventDefault(), B.stopPropagation(), S()) : Wo(B) && (B.preventDefault(), B.stopPropagation(), se(h) && y());
              },
              onKeyDown: (B) => {
                Go(B), (B.key === "Enter" || B.key === " ") && B.stopPropagation();
              },
              onClick: (B) => {
                B.stopPropagation();
              },
              children: /* @__PURE__ */ a(
                Ta,
                {
                  className: v(
                    // Don't render blockquote on the first child. All comments are wrapped in blockquote
                    // that has text-align corresponding to LTR or RTL, so the blockquote is important.
                    // But we don't want it to look like there's a blockquote there. Target the
                    // lowest-level Lexical editor element by attribute so Tailwind can apply styles to
                    // the blockquote directly inside the editor.
                    'tw:[&_[data-lexical-editor="true"]>blockquote]:mt-0 tw:[&_[data-lexical-editor="true"]>blockquote]:border-s-0 tw:[&_[data-lexical-editor="true"]>blockquote]:ps-0 tw:[&_[data-lexical-editor="true"]>blockquote]:font-normal tw:[&_[data-lexical-editor="true"]>blockquote]:not-italic tw:[&_[data-lexical-editor="true"]>blockquote]:text-foreground'
                  ),
                  editorSerializedState: h,
                  onSerializedChange: (B) => g(B),
                  actions: /* @__PURE__ */ u(ft, { children: [
                    /* @__PURE__ */ a("div", { className: "tw:flex-1" }),
                    /* @__PURE__ */ u(_t, { children: [
                      /* @__PURE__ */ a(Nt, { asChild: !0, children: /* @__PURE__ */ a(
                        et,
                        {
                          size: "icon-sm",
                          onClick: S,
                          variant: "outline",
                          className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                          "aria-label": pe(
                            "%comment_aria_cancel_edit%",
                            r,
                            "Cancel edit"
                          ),
                          children: /* @__PURE__ */ a(nc, {})
                        }
                      ) }),
                      /* @__PURE__ */ a(Ct, { children: pe(
                        "%comment_aria_cancel_edit%",
                        r,
                        "Cancel edit"
                      ) })
                    ] }),
                    /* @__PURE__ */ u(_t, { children: [
                      /* @__PURE__ */ a(Nt, { asChild: !0, children: /* @__PURE__ */ a(
                        Gr,
                        {
                          isDisabled: X,
                          disabledExplanation: pe(
                            "%comment_aria_save_edit%",
                            r,
                            "Save edit"
                          ),
                          className: "tw:inline-flex",
                          children: /* @__PURE__ */ a(
                            et,
                            {
                              size: "icon-sm",
                              onClick: y,
                              className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                              disabled: X,
                              "aria-label": pe(
                                "%comment_aria_save_edit%",
                                r,
                                "Save edit"
                              ),
                              children: /* @__PURE__ */ a(ai, {})
                            }
                          )
                        }
                      ) }),
                      /* @__PURE__ */ a(Ct, { children: pe(
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
          !b && /* @__PURE__ */ u(ft, { children: [
            t.status === "Resolved" && !I && /* @__PURE__ */ a("div", { className: "tw:text-sm tw:italic", children: r["%comment_status_resolved%"] }),
            t.status === "Todo" && e && /* @__PURE__ */ a("div", { className: "tw:text-sm tw:italic", children: r["%comment_status_todo%"] }),
            I ? (
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
                className: v(
                  // Shared note-body prose/blockquote treatment (also used by conflict-diff's
                  // DIFF_HTML_CLASSES). Layer this comment item's own extras on top: items-start +
                  // gap-2 for layout, and line-clamp while the thread is collapsed.
                  rs,
                  "tw:items-start tw:gap-2",
                  {
                    "tw:line-clamp-3": !o
                  }
                ),
                dangerouslySetInnerHTML: { __html: M }
              }
            )
          ] })
        ] }),
        Y && /* @__PURE__ */ u(Be, { children: [
          /* @__PURE__ */ a(Ee, { asChild: !0, children: /* @__PURE__ */ a(et, { variant: "ghost", size: "icon", children: /* @__PURE__ */ a(ic, {}) }) }),
          /* @__PURE__ */ a(Fe, { align: "end", children: Y })
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
        className: v(
          "tw:ms-auto",
          "tw:text-primary tw:transition-opacity tw:duration-200 tw:hover:bg-primary/10",
          "tw:opacity-0 tw:group-hover:opacity-100"
        ),
        onClick: (n) => {
          n.stopPropagation(), r();
        },
        "aria-label": o,
        children: /* @__PURE__ */ a(Je, { className: "tw:h-4 tw:w-4" })
      }
    );
}
const Jw = {
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
}, is = li(function({
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
  handleDeleteComment: b,
  handleReadStatusChange: x,
  assignableUsers: g,
  canUserAddCommentToThread: C,
  canUserAssignThreadCallback: E,
  canUserResolveThreadCallback: S,
  canUserEditOrDeleteCommentCallback: y,
  isRead: z = !1,
  autoReadDelay: T = 5,
  onVerseRefClick: O,
  initialAssignedUser: M,
  activeComments: D,
  rootContentSlot: I,
  resolveActionSlot: Y,
  spaceRootContentFromReplies: X = !1,
  draft: B,
  onDraftChange: k
}) {
  var gr;
  const [ot, $] = _({}), q = B ?? ot, Q = q.editorState ?? Jw, j = q.assignedUser, at = k !== void 0, wt = A(q);
  wt.current = q;
  const ct = L(
    (R) => {
      const it = { ...wt.current, ...R };
      wt.current = it, at || $(it), k == null || k(l, zn(it) ? void 0 : it);
    },
    [at, k, l]
  ), tt = L(
    (R, it) => {
      const dt = { ...q.commentEdits };
      it === void 0 ? delete dt[R] : dt[R] = it, ct({
        commentEdits: Vr(dt) ? dt : void 0
      });
    },
    [q.commentEdits, ct]
  ), [ut, xt] = _(), gt = n, [yt, St] = _(!1), [Gt, $t] = _(!1), [ie, Rt] = _(!1), [Et, Bt] = _(!1), [ce, le] = _(!1), [Mt, Dt] = _(z), [de, xe] = _(!1), ge = A(void 0), [ye, Zt] = _(/* @__PURE__ */ new Map());
  J(() => {
    let R = !0;
    return (async () => {
      const dt = S ? await S(l) : !1;
      R && le(dt);
    })(), () => {
      R = !1;
    };
  }, [l, S]), J(() => {
    let R = !0;
    if (!n) {
      Bt(!1), Zt(/* @__PURE__ */ new Map());
      return;
    }
    return (async () => {
      const dt = E ? await E(l) : !1;
      R && Bt(dt);
    })(), () => {
      R = !1;
    };
  }, [n, l, E]);
  const Wt = A("idle");
  J(() => {
    if (!n) {
      Wt.current !== "idle" && (ct({ assignedUser: void 0 }), xt(void 0), Wt.current = "idle");
      return;
    }
    Wt.current === "idle" && (Wt.current = "pending"), Et ? Wt.current === "pending" && M !== void 0 && // Skip pre-population if the thread is already assigned to this user — doing so
    // would show "Assigning to: Alice" and enable the submit button for a no-op call.
    M !== i && (ct({ assignedUser: M }), Wt.current = "auto-populated") : Wt.current === "auto-populated" && (ct({ assignedUser: void 0 }), Wt.current = "pending");
  }, [n, M, Et, i, ct]);
  const Ft = A(ut);
  Ft.current = ut;
  const re = A(k);
  re.current = k;
  const Me = A(l);
  Me.current = l, J(() => () => {
    var it;
    const { current: R } = wt;
    R.assignedUser !== void 0 && R.assignedUser === Ft.current && R.editorState === void 0 && !Vr(R.commentEdits) && ((it = re.current) == null || it.call(re, Me.current, void 0));
  }, []);
  const P = V(
    () => D ?? r.filter((R) => !R.deleted),
    [D, r]
  ), N = V(() => {
    const { commentEdits: R } = q;
    if (!R) return R;
    const it = new Set(P.map((Ot) => Ot.id)), dt = Object.fromEntries(
      Object.entries(R).filter(([Ot]) => it.has(Ot))
    );
    return Vr(dt) ? dt : void 0;
  }, [q, P]), F = Gt || Vr(N);
  J(() => {
    let R = !0;
    if (!n || !y) {
      Zt(/* @__PURE__ */ new Map());
      return;
    }
    return (async () => {
      const dt = /* @__PURE__ */ new Map();
      await Promise.all(
        P.map(async (Ot) => {
          const Ke = await y(Ot.id);
          R && dt.set(Ot.id, Ke);
        })
      ), R && Zt(dt);
    })(), () => {
      R = !1;
    };
  }, [n, P, y]);
  const G = V(() => P[0], [P]), U = A(null), Z = A(void 0), H = L(() => {
    var R;
    (R = Z.current) == null || R.call(Z), ct({ editorState: void 0 });
  }, [ct]), nt = L(
    (R) => {
      ct({ editorState: se(R) ? R : void 0 });
    },
    [ct]
  ), kt = L(() => {
    const R = !Mt;
    Dt(R), xe(!R), x == null || x(l, R);
  }, [Mt, x, l]);
  J(() => {
    St(!1);
  }, [n]), J(() => {
    if (n && !Mt && !de && zn(q)) {
      const R = setTimeout(() => {
        Dt(!0), x == null || x(l, !0);
      }, T * 1e3);
      return ge.current = R, () => clearTimeout(R);
    }
    ge.current && (clearTimeout(ge.current), ge.current = void 0);
  }, [
    n,
    Mt,
    de,
    T,
    l,
    x,
    q
  ]);
  const mt = V(
    () => ({
      singleReply: o["%comment_thread_single_reply%"],
      multipleReplies: o["%comment_thread_multiple_replies%"]
    }),
    [o]
  ), bt = V(() => {
    if (i === void 0)
      return;
    if (i === "")
      return o["%comment_assign_unassigned%"] ?? "Unassigned";
    const R = fa(i, o);
    return Ye(o["%comment_assigned_to%"], {
      assignedUser: R
    });
  }, [i, o]), ht = V(() => P.slice(1), [P]), lt = V(() => ht.length ?? 0, [ht.length]), It = V(() => lt > 0, [lt]), Ie = V(() => {
    if (yt || lt <= 2)
      return ht;
    const R = new Set(ht.slice(-2).map((it) => it.id));
    return ht.filter(
      (it) => {
        var dt;
        return R.has(it.id) || ((dt = q.commentEdits) == null ? void 0 : dt[it.id]) !== void 0;
      }
    );
  }, [ht, lt, yt, q.commentEdits]), ke = V(() => yt || lt <= 2 ? 0 : lt - Ie.length, [lt, yt, Ie.length]), rr = V(
    () => lt === 1 ? mt.singleReply : Ye(mt.multipleReplies, { count: lt }),
    [lt, mt]
  ), ar = V(
    () => ke === 1 ? mt.singleReply : Ye(mt.multipleReplies, { count: ke }),
    [ke, mt]
  );
  J(() => {
    !n && F && It && $t(!1);
  }, [n, F, It]);
  const Ue = L(
    async (R) => {
      R && R.stopPropagation();
      const it = se(Q) ? Sa(Q) : void 0;
      if (j !== void 0) {
        await h({
          threadId: l,
          contents: it,
          assignedUser: j
        }) && (xt(j), it && H());
        return;
      }
      it && await h({ threadId: l, contents: it }) && H();
    },
    [
      H,
      Q,
      h,
      j,
      l
    ]
  ), ze = L(
    async (R) => {
      const it = se(Q) ? Sa(Q) : void 0, dt = R.status ? R.assignedUser : j ?? R.assignedUser, Ot = await h({
        ...R,
        contents: it,
        assignedUser: dt
      });
      return Ot && (dt !== void 0 && xt(dt), it && H()), Ot;
    },
    [H, Q, h, j]
  );
  if (P.length === 0) return;
  const _e = !Et || !g || g.length === 0 || !g.includes(c), hr = !se(Q) && (j === void 0 || j === ut), Jr = /* @__PURE__ */ a(
    Pn,
    {
      comment: G,
      localizedStrings: o,
      isThreadExpanded: n,
      threadStatus: p,
      handleAddCommentToThread: ze,
      handleUpdateComment: f,
      handleDeleteComment: b,
      onEditingChange: $t,
      canEditOrDelete: (!F && ye.get(G.id)) ?? !1,
      canUserResolveThread: ce,
      draftEditorState: (gr = q.commentEdits) == null ? void 0 : gr[G.id],
      onDraftEditorStateChange: (R) => tt(G.id, R)
    }
  );
  return /* @__PURE__ */ a(
    Ww,
    {
      role: "option",
      "aria-selected": n,
      id: l,
      className: v(
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
          "tw:bg-card": p !== "Resolved" && Mt,
          "tw:bg-muted": p === "Resolved",
          "tw:bg-accent": !Mt && p !== "Resolved"
        }
      ),
      onClick: () => {
        d(l);
      },
      tabIndex: -1,
      children: /* @__PURE__ */ u(Yw, { className: "tw:flex tw:flex-col tw:gap-2 tw:p-0", children: [
        /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:content-center tw:items-start tw:gap-2", children: [
          /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:gap-2", children: [
            bt && /* @__PURE__ */ a(Ur, { className: "tw:rounded-sm tw:bg-input tw:text-sm tw:font-normal tw:text-primary tw:hover:bg-input", children: bt }),
            /* @__PURE__ */ a(
              et,
              {
                variant: "ghost",
                size: "icon",
                onClick: (R) => {
                  R.stopPropagation(), kt();
                },
                className: "tw:text-muted-foreground tw:transition tw:hover:text-foreground",
                "aria-label": Mt ? o["%comment_aria_mark_as_unread%"] ?? "Mark as unread" : o["%comment_aria_mark_as_read%"] ?? "Mark as read",
                children: Mt ? /* @__PURE__ */ a(sc, {}) : /* @__PURE__ */ a(cc, {})
              }
            ),
            Y === void 0 ? (
              // Generic status-resolve check (used by non-conflict threads and, via ConflictThread
              // leaving this slot undefined, by non-verseText conflicts, which resolve through a
              // plain status change). ConflictThread overrides this slot for verseText conflicts.
              /* @__PURE__ */ a(
                ns,
                {
                  show: ce && p !== "Resolved",
                  onClick: () => ze({ threadId: l, status: "Resolved" }),
                  ariaLabel: o["%comment_aria_resolve_thread%"] ?? "Resolve thread"
                }
              )
            ) : Y
          ] }),
          /* @__PURE__ */ a("div", { className: "tw:flex tw:max-w-full tw:flex-wrap tw:items-baseline tw:gap-2", children: /* @__PURE__ */ u(
            "p",
            {
              ref: U,
              className: v(
                "tw:flex-1 tw:overflow-hidden tw:text-ellipsis tw:text-sm tw:font-normal tw:text-muted-foreground",
                {
                  "tw:overflow-visible tw:text-clip tw:whitespace-normal tw:break-words": gt
                },
                { "tw:whitespace-nowrap": !gt }
              ),
              children: [
                s && O ? /* @__PURE__ */ a(
                  et,
                  {
                    variant: "ghost",
                    size: "sm",
                    className: "tw:h-auto tw:px-1 tw:py-0 tw:text-sm tw:font-normal tw:text-muted-foreground",
                    onClick: (R) => {
                      R.stopPropagation(), O(w);
                    },
                    children: s
                  }
                ) : s,
                /* @__PURE__ */ u("span", { className: e, children: [
                  G.contextBefore,
                  /* @__PURE__ */ a("span", { className: "tw:font-bold", children: G.selectedText }),
                  G.contextAfter
                ] })
              ]
            }
          ) }),
          I ?? Jr
        ] }),
        /* @__PURE__ */ u(ft, { children: [
          It && !n && /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:gap-5", children: [
            /* @__PURE__ */ a("div", { className: "tw:w-8", children: /* @__PURE__ */ a(Kr, {}) }),
            /* @__PURE__ */ a("p", { className: "tw:text-sm tw:text-muted-foreground", children: rr })
          ] }),
          !n && se(Q) && /* @__PURE__ */ a(
            Ta,
            {
              editorSerializedState: Q,
              onSerializedChange: nt,
              placeholder: o["%comment_replyOrAssign%"]
            }
          ),
          n && /* @__PURE__ */ u(ft, { children: [
            X && Ie.length > 0 && /* @__PURE__ */ a("div", { className: "tw:h-2", "data-slot": "root-content-reply-gap", "aria-hidden": "true" }),
            ke > 0 && /* @__PURE__ */ u(
              "div",
              {
                className: "tw:flex tw:cursor-pointer tw:items-center tw:gap-5 tw:py-2",
                onClick: (R) => {
                  R.stopPropagation(), St(!0);
                },
                role: "button",
                tabIndex: 0,
                onKeyDown: (R) => {
                  (R.key === "Enter" || R.key === " ") && (R.preventDefault(), R.stopPropagation(), St(!0));
                },
                children: [
                  /* @__PURE__ */ a("div", { className: "tw:w-8", children: /* @__PURE__ */ a(Kr, {}) }),
                  /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:gap-2", children: [
                    /* @__PURE__ */ a("p", { className: "tw:text-sm tw:text-muted-foreground", children: ar }),
                    yt ? /* @__PURE__ */ a(ti, {}) : /* @__PURE__ */ a(sr, {})
                  ] })
                ]
              }
            ),
            Ie.map((R) => {
              var it;
              return /* @__PURE__ */ a("div", { children: /* @__PURE__ */ a(
                Pn,
                {
                  comment: R,
                  localizedStrings: o,
                  isReply: !0,
                  isThreadExpanded: n,
                  handleUpdateComment: f,
                  handleDeleteComment: b,
                  onEditingChange: $t,
                  canEditOrDelete: (!F && ye.get(R.id)) ?? !1,
                  draftEditorState: (it = q.commentEdits) == null ? void 0 : it[R.id],
                  onDraftEditorStateChange: (dt) => tt(R.id, dt)
                }
              ) }, R.id);
            }),
            C !== !1 && (!F || se(Q)) && /* @__PURE__ */ a(
              "div",
              {
                role: "textbox",
                tabIndex: -1,
                className: "tw:w-full tw:space-y-2",
                onClick: (R) => R.stopPropagation(),
                onKeyDownCapture: (R) => {
                  Wo(R) && (R.preventDefault(), R.stopPropagation(), (se(Q) || j !== void 0 && j !== ut) && Ue());
                },
                onKeyDown: (R) => {
                  Go(R), (R.key === "Enter" || R.key === " ") && R.stopPropagation();
                },
                children: /* @__PURE__ */ a(
                  Ta,
                  {
                    editorSerializedState: Q,
                    onSerializedChange: nt,
                    placeholder: p === "Resolved" ? o["%comment_reopenResolved%"] : o["%comment_replyOrAssign%"],
                    autoFocus: !0,
                    onClear: (R) => {
                      Z.current = R;
                    },
                    actions: /* @__PURE__ */ u(ft, { children: [
                      j !== void 0 && (se(Q) || j !== ut) ? /* @__PURE__ */ a("span", { className: "tw:flex-1 tw:text-sm tw:text-muted-foreground", children: Ye(
                        pe(
                          "%comment_assigning_to%",
                          o,
                          "Assigning to: {assignedUser}"
                        ),
                        {
                          assignedUser: fa(
                            j,
                            o
                          )
                        }
                      ) }) : /* @__PURE__ */ a("div", { className: "tw:flex-1" }),
                      /* @__PURE__ */ u(lr, { open: ie, onOpenChange: Rt, children: [
                        /* @__PURE__ */ u(_t, { children: [
                          /* @__PURE__ */ a(Nt, { asChild: !0, children: /* @__PURE__ */ a(
                            Gr,
                            {
                              isDisabled: _e,
                              disabledExplanation: pe(
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
                                  "aria-label": pe(
                                    "%comment_aria_assign_user%",
                                    o,
                                    "Assign user"
                                  ),
                                  children: /* @__PURE__ */ a(ri, {})
                                }
                              ) })
                            }
                          ) }),
                          /* @__PURE__ */ a(Ct, { children: pe(
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
                            onKeyDown: (R) => {
                              R.key === "Escape" && (R.stopPropagation(), Rt(!1));
                            },
                            children: /* @__PURE__ */ a(wr, { children: /* @__PURE__ */ a(ur, { children: g == null ? void 0 : g.map((R) => /* @__PURE__ */ a(
                              tr,
                              {
                                onSelect: () => {
                                  ct({
                                    assignedUser: R !== i ? R : void 0
                                  }), Wt.current = "user-selected", xt(void 0), Rt(!1);
                                },
                                className: "tw:flex tw:items-center",
                                children: /* @__PURE__ */ a("span", { children: fa(R, o) })
                              },
                              R || "unassigned"
                            )) }) })
                          }
                        )
                      ] }),
                      /* @__PURE__ */ u(_t, { children: [
                        /* @__PURE__ */ a(Nt, { asChild: !0, children: /* @__PURE__ */ a(
                          Gr,
                          {
                            isDisabled: hr,
                            disabledExplanation: pe(
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
                                "aria-label": pe(
                                  "%comment_aria_submit_comment%",
                                  o,
                                  "Submit comment"
                                ),
                                children: /* @__PURE__ */ a(ai, {})
                              }
                            )
                          }
                        ) }),
                        /* @__PURE__ */ a(Ct, { children: pe(
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
}), Qw = v(
  rs,
  // `prose` gives block children (the top-level blockquote wrapper, and any p — whether nested
  // inside that blockquote or, in the non-verseText fallback, a direct child) vertical margins that
  // make these already-compact cards feel bulky. Zero both so the diff sits flush inside the card.
  "tw:[&>blockquote]:my-0 tw:[&_p]:my-0",
  "tw:[&_u]:font-semibold tw:[&_u]:text-success-foreground tw:[&_u]:no-underline",
  "tw:[&_s]:text-destructive tw:[&_s]:line-through"
), tu = (t) => t.replace(/(\s+)(<\/[us]>)/g, "$2$1"), ma = (t) => tu(Po(t));
function va({ html: t }) {
  return /* @__PURE__ */ a(
    "div",
    {
      className: Qw,
      dangerouslySetInnerHTML: { __html: t }
    }
  );
}
function eu({
  comment: t,
  localizedStrings: e,
  availableActions: r = "acceptOrReject",
  resolvedResolution: o,
  onResolve: n,
  isResolving: s = !1
}) {
  const [i, c] = _("accept"), d = _a(), l = _a(), w = r === "loading", p = r === "accept", h = r === "none", f = r === "acceptRejectOrMerge", b = p ? "accept" : i, x = V(
    () => ma(t.rejectedText ?? ""),
    [t.rejectedText]
  ), g = V(
    () => ma(t.acceptedText ?? ""),
    [t.acceptedText]
  ), C = V(
    () => ma(t.mergedText ?? ""),
    [t.mergedText]
  ), E = V(() => Po(t.contents), [t.contents]);
  if (!as(t))
    return /* @__PURE__ */ a(va, { html: E });
  const S = ($) => {
    c($ === "reject" || $ === "merge" ? $ : "accept");
  }, y = e["%conflict_note_stale_notice%"] ?? "The verse was edited after this conflict was recorded, so 'Use the other change' is no longer available. Keep the current text to resolve.", z = f ? [
    {
      value: "merge",
      label: e["%conflict_note_option_combine%"] ?? "Combine both changes",
      html: C
    }
  ] : [], T = [
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
    ...z
  ], O = b === "accept", M = s || O;
  let D;
  O ? D = e["%conflict_note_save_disabled_tooltip%"] ?? "Keeping the current text makes no change — resolve the thread with the ✓ to keep it." : s || (D = e["%conflict_note_save_warning%"] ?? "This can't be undone.");
  const I = e["%conflict_note_no_result%"] ?? "No result preview available.", Y = /* @__PURE__ */ a("p", { className: "tw:text-muted-foreground", children: I }), X = ($) => $ ? /* @__PURE__ */ a("p", { className: "tw:whitespace-pre-wrap tw:text-foreground", children: $ }) : Y, B = () => {
    const $ = o ?? "accept";
    return $ === "merged" ? t.mergedText ? /* @__PURE__ */ a(va, { html: C }) : Y : X($ === "reject" ? t.rejectedResultText : t.resultText);
  }, k = ($) => p && $.value === "reject", ot = ($) => {
    const q = b === $.value, Q = `${l}-${$.value}`, j = k($);
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
          htmlFor: Q,
          "data-slot": "conflict-resolution-option",
          "data-value": $.value,
          className: v(
            "tw:flex tw:flex-col tw:gap-1 tw:rounded-md tw:border tw:p-2",
            "tw:focus-within:ring-2 tw:focus-within:ring-ring tw:focus-within:ring-offset-1",
            q ? "tw:border-border tw:bg-accent/50" : "tw:border-transparent tw:hover:bg-accent/30",
            j ? "tw:cursor-not-allowed tw:opacity-60" : "tw:cursor-pointer"
          ),
          children: [
            /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:gap-2", children: [
              /* @__PURE__ */ a(
                xa,
                {
                  id: Q,
                  value: $.value,
                  "aria-label": $.label,
                  disabled: j,
                  "aria-describedby": j ? d : void 0
                }
              ),
              /* @__PURE__ */ a("span", { "aria-hidden": !0, className: "tw:font-medium", children: $.label })
            ] }),
            j && // aria-describedby links the option to this visually-hidden notice so assistive tech
            // announces why the choice is read-only.
            /* @__PURE__ */ a("span", { id: d, className: "tw:sr-only", children: y }),
            /* @__PURE__ */ a(va, { html: $.html })
          ]
        },
        $.value
      )
    );
  };
  return (
    // Contain every click inside the card (selecting an option, pressing Save) so it never bubbles
    // up to toggle the enclosing CommentThread open/closed. The thread toggles on click only, so a
    // single onClick guard at the root is enough; this container is not itself an interactive control
    // and needs no keyboard handler (the thread has no keyboard toggle to intercept).
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
    /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:gap-3 tw:text-sm", onClick: ($) => $.stopPropagation(), children: [
      /* @__PURE__ */ a("p", { children: e["%conflict_note_description_verseText%"] ?? "Conflicting changes were made to the verse text." }),
      w && /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:gap-2", "data-slot": "conflict-loading", children: [
        /* @__PURE__ */ a(yr, { className: "tw:h-8 tw:w-full" }),
        /* @__PURE__ */ a(yr, { className: "tw:h-8 tw:w-full" }),
        /* @__PURE__ */ a(yr, { className: "tw:h-8 tw:w-24" })
      ] }),
      !w && h && B(),
      !w && !h && /* @__PURE__ */ u(ft, { children: [
        /* @__PURE__ */ a("p", { children: e["%conflict_note_choose_prompt%"] ?? "Select which change to keep:" }),
        /* @__PURE__ */ a(
          To,
          {
            value: b,
            onValueChange: S,
            disabled: s,
            "aria-label": e["%conflict_note_choose_aria_label%"] ?? "Choose resolution",
            children: T.map(($) => k($) ? /* @__PURE__ */ a(At, { delayDuration: 0, children: /* @__PURE__ */ u(_t, { children: [
              /* @__PURE__ */ a(Nt, { asChild: !0, children: ot($) }),
              /* @__PURE__ */ a(Ct, { children: y })
            ] }) }, $.value) : ot($))
          }
        ),
        /* @__PURE__ */ a(At, { delayDuration: 0, children: /* @__PURE__ */ u(_t, { children: [
          /* @__PURE__ */ a(Nt, { asChild: !0, children: /* @__PURE__ */ a(
            Gr,
            {
              isDisabled: M && D !== void 0,
              disabledExplanation: D,
              className: "tw:inline-flex tw:self-start",
              children: /* @__PURE__ */ a(
                et,
                {
                  size: "sm",
                  disabled: M,
                  onClick: () => n == null ? void 0 : n(b),
                  children: e["%conflict_note_save_and_resolve%"] ?? "Save and resolve"
                }
              )
            }
          ) }),
          D && /* @__PURE__ */ a(Ct, { children: D })
        ] }) })
      ] })
    ] })
  );
}
const ru = {
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
function au({
  comment: t,
  localizedStrings: e,
  resolvedResolution: r
}) {
  const o = V(
    () => ma(t.rejectedText ?? ""),
    [t.rejectedText]
  );
  if (r) {
    const { key: s, fallback: i } = ru[r];
    return /* @__PURE__ */ a("p", { className: "tw:text-sm tw:font-normal tw:text-muted-foreground", children: e[s] ?? i });
  }
  const n = e["%conflict_note_summary_unresolved%"] ?? "Conflicting edits. Choose which change to keep.";
  return /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:gap-1", children: [
    /* @__PURE__ */ a("p", { className: "tw:text-sm tw:font-normal tw:text-muted-foreground", children: n }),
    o ? /* @__PURE__ */ a(va, { html: o }) : void 0
  ] });
}
function ou(t) {
  return t === "reject" ? "reject" : t === "merge" ? "merged" : "accept";
}
function nu({
  threadId: t,
  threadStatus: e,
  isSelected: r,
  activeComments: o,
  conflictResolution: n
}) {
  const [s, i] = _("loading"), [c, d] = _(!1), [l, w] = _(), p = n == null ? void 0 : n.getOptions, h = n == null ? void 0 : n.resolve;
  J(() => {
    let E = !0;
    if (!r) {
      i("loading");
      return;
    }
    return (async () => {
      let y;
      try {
        y = p ? await p(t) : "none";
      } catch {
        y = "none";
      }
      E && (i(y), y !== "none" && w(void 0));
    })(), () => {
      E = !1;
    };
  }, [r, t, e, p]);
  const f = A(!1), b = L(
    async (E) => {
      if (!(!h || f.current)) {
        f.current = !0, d(!0);
        try {
          await h(t, E) && (w(ou(E)), i("none"));
        } catch {
        } finally {
          f.current = !1, d(!1);
        }
      }
    },
    [h, t]
  ), g = V(() => {
    if (e === "Resolved") {
      for (let E = o.length - 1; E >= 0; E -= 1)
        if (o[E].status === "Resolved")
          return os(o[E].conflictResolutionAction);
      return "accept";
    }
  }, [e, o]) ?? l;
  return { conflictOptions: s, isResolving: c, resolve: b, resolvedResolution: g, showResolveCheck: s !== "loading" && s !== "none" };
}
const iu = li(function(e) {
  const {
    comments: r,
    localizedStrings: o,
    isSelected: n = !1,
    threadId: s,
    threadStatus: i,
    conflictResolution: c
  } = e, d = V(() => r.filter((E) => !E.deleted), [r]), l = V(
    () => d.find((E) => E.conflictType) ?? d[0],
    [d]
  ), { conflictOptions: w, isResolving: p, resolve: h, resolvedResolution: f, showResolveCheck: b } = nu({
    threadId: s,
    threadStatus: i,
    isSelected: n,
    activeComments: d,
    conflictResolution: c
  }), x = as(l);
  let g;
  x && l && (g = n ? /* @__PURE__ */ a(
    eu,
    {
      comment: l,
      localizedStrings: o,
      availableActions: w,
      resolvedResolution: f,
      onResolve: h,
      isResolving: p
    }
  ) : /* @__PURE__ */ a(
    au,
    {
      comment: l,
      localizedStrings: o,
      resolvedResolution: f
    }
  ));
  let C;
  return x && (C = /* @__PURE__ */ a(
    ns,
    {
      show: b,
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
      resolveActionSlot: C,
      spaceRootContentFromReplies: x && n
    }
  );
});
function zh({
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
  selectedThreadId: b,
  onSelectedThreadChange: x,
  onVerseRefClick: g,
  conflictResolution: C,
  drafts: E,
  onDraftChange: S
}) {
  const [y, z] = _(/* @__PURE__ */ new Set()), [T, O] = _(), [M, D] = _(), I = L(
    async (j) => {
      const at = await s(j);
      return at !== void 0 && j.assignedUser !== void 0 && j.assignedUser !== "" && D(j.assignedUser), at;
    },
    [s]
  );
  J(() => {
    b && (z((j) => new Set(j).add(b)), O(b));
  }, [b]);
  const Y = r.filter(
    (j) => j.comments.some((at) => !at.deleted)
  ), X = Y.map((j) => ({ id: j.id })), B = L(
    (j) => {
      z((at) => new Set(at).add(j.id)), O(j.id), x == null || x(j.id);
    },
    [x]
  ), k = L(
    (j) => {
      const at = y.has(j);
      z((wt) => {
        const ct = new Set(wt);
        return ct.has(j) ? ct.delete(j) : ct.add(j), ct;
      }), O(j), x == null || x(at ? void 0 : j);
    },
    [y, x]
  ), { listboxRef: ot, activeId: $, handleKeyDown: q } = Rs({
    options: X,
    onOptionSelect: B
  }), Q = L(
    (j) => {
      j.key === "Escape" ? (T && y.has(T) && (z((at) => {
        const wt = new Set(at);
        return wt.delete(T), wt;
      }), O(void 0), x == null || x(void 0)), j.preventDefault(), j.stopPropagation()) : q(j);
    },
    [T, y, q, x]
  );
  return /* @__PURE__ */ a(
    "div",
    {
      id: Gw,
      role: "listbox",
      tabIndex: 0,
      ref: ot,
      "aria-activedescendant": $ ?? void 0,
      "aria-label": "Comments",
      className: v(
        "tw:flex tw:w-full tw:flex-col tw:outline-hidden tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-1 tw:focus:ring-offset-background",
        t
      ),
      onKeyDown: Q,
      children: Y.map((j) => {
        const at = {
          classNameForVerseText: e,
          comments: j.comments,
          localizedStrings: n,
          verseRef: j.verseRef,
          handleSelectThread: k,
          threadId: j.id,
          thread: j,
          isRead: j.isRead,
          isSelected: y.has(j.id),
          currentUser: o,
          assignedUser: j.assignedUser,
          threadStatus: j.status,
          handleAddCommentToThread: I,
          handleUpdateComment: i,
          handleDeleteComment: c,
          handleReadStatusChange: d,
          assignableUsers: l,
          canUserAddCommentToThread: w,
          canUserAssignThreadCallback: p,
          canUserResolveThreadCallback: h,
          canUserEditOrDeleteCommentCallback: f,
          onVerseRefClick: g,
          initialAssignedUser: M,
          draft: E == null ? void 0 : E[j.id],
          onDraftChange: S
        };
        return /* @__PURE__ */ a(
          "div",
          {
            className: v("tw:border-b tw:border-border tw:last:border-b-0", {
              "tw:opacity-60": j.status === "Resolved"
            }),
            children: j.type === "Conflict" ? /* @__PURE__ */ a(iu, { ...at, conflictResolution: C }) : /* @__PURE__ */ a(is, { ...at })
          },
          j.id
        );
      })
    }
  );
}
const su = Ao(
  function({ area: e, ...r }, o) {
    return /* @__PURE__ */ a(Ds, { area: e, children: /* @__PURE__ */ a(
      "div",
      {
        ref: o,
        ...r,
        "data-platform-content-zoom-root": e ?? ""
      }
    ) });
  }
);
su.displayName = "ContentZoomRoot";
function cu({ table: t }) {
  return /* @__PURE__ */ u(Be, { children: [
    /* @__PURE__ */ a(Ee, { asChild: !0, children: /* @__PURE__ */ u(et, { variant: "outline", size: "sm", className: "tw:ml-auto tw:hidden tw:h-8 tw:lg:flex", children: [
      /* @__PURE__ */ a(lc, { className: "tw:mr-2 tw:h-4 tw:w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ u(Fe, { align: "end", className: "tw:w-[150px]", children: [
      /* @__PURE__ */ a(cr, { children: "Toggle columns" }),
      /* @__PURE__ */ a(ir, {}),
      t.getAllColumns().filter((e) => e.getCanHide()).map((e) => /* @__PURE__ */ a(
        Ze,
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
  return /* @__PURE__ */ a(ee.Root, { "data-slot": "select", ...t });
}
function lu({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    ee.Group,
    {
      "data-slot": "select-group",
      className: v("tw:scroll-my-1 tw:p-1", t),
      ...e
    }
  );
}
function Tr({ ...t }) {
  return /* @__PURE__ */ a(ee.Value, { "data-slot": "select-value", ...t });
}
function Sr({ className: t, size: e = "default", children: r, ...o }) {
  const n = Re();
  return /* @__PURE__ */ u(
    ee.Trigger,
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
        /* @__PURE__ */ a(ee.Icon, { asChild: !0, children: /* @__PURE__ */ a(di, { className: "tw:pointer-events-none tw:size-4 tw:text-muted-foreground" }) })
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
  return /* @__PURE__ */ a(ee.Portal, { children: /* @__PURE__ */ u(
    ee.Content,
    {
      "data-slot": "select-content",
      "data-align-trigger": r === "item-aligned",
      className: v(
        "pr-twp tw:relative tw:max-h-(--radix-select-content-available-height) tw:data-[align-trigger=true]:min-w-(--radix-select-trigger-width) tw:data-[align-trigger=false]:min-w-36 tw:origin-(--radix-select-content-transform-origin) tw:overflow-x-hidden tw:overflow-y-auto tw:rounded-lg tw:bg-popover tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:data-[align-trigger=true]:animate-none tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95 tw:animate-none! tw:**:data-[slot$=-item]:focus:bg-foreground/10 tw:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 tw:**:data-[slot$=-separator]:bg-foreground/5 tw:**:data-[slot$=-trigger]:focus:bg-foreground/10 tw:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! tw:**:data-[variant=destructive]:focus:bg-foreground/10! tw:**:data-[variant=destructive]:text-accent-foreground! tw:**:data-[variant=destructive]:**:text-accent-foreground! tw:relative",
        r === "popper" && "tw:data-[side=bottom]:translate-y-1 tw:data-[side=left]:-translate-x-1 tw:rtl:data-[side=left]:translate-x-1 tw:data-[side=right]:translate-x-1 tw:rtl:data-[side=right]:-translate-x-1 tw:data-[side=top]:-translate-y-1",
        t
      ),
      style: { zIndex: je, ...n },
      position: r,
      align: o,
      ...s,
      children: [
        /* @__PURE__ */ a(du, {}),
        /* @__PURE__ */ a(
          ee.Viewport,
          {
            "data-position": r,
            className: v(
              "tw:data-[position=popper]:h-(--radix-select-trigger-height) tw:data-[position=popper]:w-full tw:data-[position=popper]:min-w-(--radix-select-trigger-width)",
              r === "popper" && "tw:"
            ),
            children: /* @__PURE__ */ a("div", { dir: i, children: e })
          }
        ),
        /* @__PURE__ */ a(wu, {})
      ]
    }
  ) });
}
function Ph({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    ee.Label,
    {
      "data-slot": "select-label",
      className: v("pr-twp tw:px-1.5 tw:py-1 tw:text-xs tw:text-muted-foreground", t),
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
    ee.Item,
    {
      "data-slot": "select-item",
      className: v(
        "pr-twp tw:relative tw:flex tw:w-full tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:*:[span]:last:flex tw:*:[span]:last:items-center tw:*:[span]:last:gap-2",
        t
      ),
      ...r,
      children: [
        /* @__PURE__ */ a("span", { className: "tw:pointer-events-none tw:absolute tw:end-2 tw:flex tw:size-4 tw:items-center tw:justify-center", children: /* @__PURE__ */ a(ee.ItemIndicator, { children: /* @__PURE__ */ a(Pa, { className: "tw:pointer-events-none" }) }) }),
        /* @__PURE__ */ a(ee.ItemText, { children: e })
      ]
    }
  );
}
function Ah({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    ee.Separator,
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
function du({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    ee.ScrollUpButton,
    {
      "data-slot": "select-scroll-up-button",
      className: v(
        "pr-twp tw:z-10 tw:flex tw:cursor-default tw:items-center tw:justify-center tw:bg-popover tw:py-1 tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      ...e,
      children: /* @__PURE__ */ a(Yc, {})
    }
  );
}
function wu({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    ee.ScrollDownButton,
    {
      "data-slot": "select-scroll-down-button",
      className: v(
        "pr-twp tw:z-10 tw:flex tw:cursor-default tw:items-center tw:justify-center tw:bg-popover tw:py-1 tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      ...e,
      children: /* @__PURE__ */ a(Wc, {})
    }
  );
}
function uu({ table: t }) {
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
            /* @__PURE__ */ a(Rr, { side: "top", children: [10, 20, 30, 40, 50].map((e) => /* @__PURE__ */ a(ve, { value: `${e}`, children: e }, e)) })
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
            /* @__PURE__ */ a(dc, { className: "tw:h-4 tw:w-4" })
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
            /* @__PURE__ */ a(wc, { className: "tw:h-4 tw:w-4" })
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
            /* @__PURE__ */ a(uc, { className: "tw:h-4 tw:w-4" })
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
            /* @__PURE__ */ a(pc, { className: "tw:h-4 tw:w-4" })
          ]
        }
      )
    ] })
  ] }) });
}
function pu({
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
  var T;
  const [w, p] = _([]), [h, f] = _([]), [b, x] = _({}), [g, C] = _({}), E = V(() => e ?? [], [e]), S = Ni({
    data: E,
    columns: t,
    getCoreRowModel: Ei(),
    ...r && { getPaginationRowModel: Ql() },
    onSortingChange: p,
    getSortedRowModel: Ci(),
    onColumnFiltersChange: f,
    getFilteredRowModel: Jl(),
    onColumnVisibilityChange: x,
    onRowSelectionChange: C,
    state: {
      sorting: w,
      columnFilters: h,
      columnVisibility: b,
      rowSelection: g
    }
  }), y = S.getVisibleFlatColumns();
  let z;
  return d ? z = Array.from({ length: 10 }).map((D, I) => `skeleton-row-${I}`).map((D) => /* @__PURE__ */ a(We, { className: "tw:hover:bg-transparent", children: /* @__PURE__ */ a(kr, { colSpan: y.length ?? t.length, className: "tw:border-0 tw:p-0", children: /* @__PURE__ */ a("div", { className: "tw:w-full tw:py-2", children: /* @__PURE__ */ a(yr, { className: "tw:h-14 tw:w-full tw:rounded-md" }) }) }) }, D)) : ((T = S.getRowModel().rows) == null ? void 0 : T.length) > 0 ? z = S.getRowModel().rows.map((O) => /* @__PURE__ */ a(
    We,
    {
      onClick: () => i(O, S),
      "data-state": O.getIsSelected() && "selected",
      children: O.getVisibleCells().map((M) => /* @__PURE__ */ a(kr, { children: Br(M.column.columnDef.cell, M.getContext()) }, M.id))
    },
    O.id
  )) : z = /* @__PURE__ */ a(We, { children: /* @__PURE__ */ a(kr, { colSpan: t.length, className: "tw:h-24 tw:text-center", children: l }) }), /* @__PURE__ */ u("div", { className: "pr-twp", id: c, children: [
    n && /* @__PURE__ */ a(cu, { table: S }),
    /* @__PURE__ */ u(Ro, { stickyHeader: s, children: [
      /* @__PURE__ */ a(Do, { stickyHeader: s, children: S.getHeaderGroups().map((O) => /* @__PURE__ */ a(We, { children: O.headers.map((M) => /* @__PURE__ */ a(ya, { className: "tw:p-0", children: M.isPlaceholder ? void 0 : Br(M.column.columnDef.header, M.getContext()) }, M.id)) }, O.id)) }),
      /* @__PURE__ */ a(Oo, { children: z })
    ] }),
    r && /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:justify-end tw:space-x-2 tw:py-4", children: [
      /* @__PURE__ */ a(
        et,
        {
          variant: "outline",
          size: "sm",
          onClick: () => S.previousPage(),
          disabled: !S.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ a(
        et,
        {
          variant: "outline",
          size: "sm",
          onClick: () => S.nextPage(),
          disabled: !S.getCanNextPage(),
          children: "Next"
        }
      )
    ] }),
    r && o && /* @__PURE__ */ a(uu, { table: S })
  ] });
}
function $h({
  id: t,
  markdown: e,
  className: r,
  anchorTarget: o,
  truncate: n
}) {
  const s = V(
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
      className: v(
        "pr-twp tw:prose",
        {
          "tw:line-clamp-3 tw:max-h-10 tw:overflow-hidden tw:text-ellipsis tw:break-words": n
        },
        r
      ),
      children: /* @__PURE__ */ a(rd, { options: s, children: e })
    }
  );
}
const hu = Object.freeze([
  "%webView_error_dump_header%",
  "%webView_error_dump_info_message%"
]), An = (t, e) => t[e] ?? e;
function gu({
  errorDetails: t,
  handleCopyNotify: e,
  localizedStrings: r,
  id: o
}) {
  const n = An(r, "%webView_error_dump_header%"), s = An(r, "%webView_error_dump_info_message%");
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
const Vh = Object.freeze([
  ...hu,
  "%webView_error_dump_copied_message%"
]);
function Lh({
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
    /* @__PURE__ */ u(dr, { id: s, className: v("tw:min-w-80 tw:max-w-96", n), children: [
      i && r["%webView_error_dump_copied_message%"] && /* @__PURE__ */ a(Pt, { children: r["%webView_error_dump_copied_message%"] }),
      /* @__PURE__ */ a(
        gu,
        {
          errorDetails: t,
          handleCopyNotify: d,
          localizedStrings: r
        }
      )
    ] })
  ] });
}
var fu = /* @__PURE__ */ ((t) => (t[t.Check = 0] = "Check", t[t.Radio = 1] = "Radio", t))(fu || {});
function Bh({ id: t, label: e, groups: r }) {
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
      /* @__PURE__ */ a(hc, { size: 16, className: "tw:mr-2 tw:h-4 tw:w-4" }),
      e,
      /* @__PURE__ */ a(sr, { size: 16, className: "tw:ml-2 tw:h-4 tw:w-4" })
    ] }) }),
    /* @__PURE__ */ a(Fe, { children: r.map((l, w) => /* @__PURE__ */ u("div", { children: [
      /* @__PURE__ */ a(cr, { children: l.label }),
      /* @__PURE__ */ a(Wn, { children: l.itemType === 0 ? /* @__PURE__ */ a(ft, { children: l.items.map((p, h) => /* @__PURE__ */ a("div", { children: /* @__PURE__ */ a(
        Ze,
        {
          checked: o[w][h],
          onCheckedChange: () => c(w, h),
          children: p.label
        }
      ) }, p.id)) }) : /* @__PURE__ */ a(
        Os,
        {
          value: s[w],
          onValueChange: (p) => d(w, p),
          children: l.items.map((p) => /* @__PURE__ */ a("div", { children: /* @__PURE__ */ a(Ms, { value: p.id, children: p.label }) }, p.id))
        }
      ) }),
      /* @__PURE__ */ a(ir, {})
    ] }, l.label)) })
  ] }) });
}
function Fh({
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
            /* @__PURE__ */ a(gc, { className: "tw:h-4 tw:w-4" }),
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
                /* @__PURE__ */ a(fc, { className: "tw:h-4 tw:w-4" })
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
                /* @__PURE__ */ a(mc, { className: "tw:h-4 tw:w-4" })
              ]
            }
          ) })
        ] })
      ]
    }
  );
}
function mu({ id: t, versionHistory: e }) {
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
function jh({
  id: t,
  publisherDisplayName: e,
  fileSize: r,
  locales: o,
  versionHistory: n,
  currentVersion: s
}) {
  const i = V(() => Ac(r), [r]), d = ((l) => {
    const w = new Intl.DisplayNames($c(), { type: "language" });
    return l.map((p) => w.of(p));
  })(o);
  return /* @__PURE__ */ a("div", { id: t, className: "pr-twp tw:border-t tw:py-2", children: /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:gap-2 tw:divide-y", children: [
    Object.entries(n).length > 0 && /* @__PURE__ */ a(mu, { versionHistory: n }),
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
function Uh({
  entries: t,
  selected: e,
  onChange: r,
  placeholder: o,
  searchPlaceholder: n,
  commandEmptyMessage: s,
  customSelectedText: i,
  isDisabled: c,
  sortSelected: d,
  showScrollCue: l,
  icon: w,
  className: p,
  badgesPlaceholder: h,
  id: f
}) {
  return /* @__PURE__ */ u("div", { id: f, className: "tw:flex tw:items-center tw:gap-2", children: [
    /* @__PURE__ */ a(
      Is,
      {
        entries: t,
        selected: e,
        onChange: r,
        placeholder: o,
        searchPlaceholder: n,
        commandEmptyMessage: s,
        customSelectedText: i,
        isDisabled: c,
        sortSelected: d,
        showScrollCue: l,
        icon: w,
        className: p
      }
    ),
    e.length > 0 ? /* @__PURE__ */ a("div", { className: "tw:flex tw:flex-wrap tw:items-center tw:gap-2", children: e.map((b) => {
      var x;
      return /* @__PURE__ */ u(Ur, { variant: "muted", className: "tw:flex tw:items-center tw:gap-1", children: [
        /* @__PURE__ */ a(
          et,
          {
            variant: "ghost",
            size: "icon",
            className: "tw:h-4 tw:w-4 tw:p-0 tw:hover:bg-transparent",
            onClick: () => r(e.filter((g) => g !== b)),
            children: /* @__PURE__ */ a(ei, { className: "tw:h-3 tw:w-3" })
          }
        ),
        (x = t.find((g) => g.value === b)) == null ? void 0 : x.label
      ] }, b);
    }) }) : /* @__PURE__ */ a(Pt, { children: h })
  ] });
}
const vu = Object.freeze([
  "%undoButton_tooltip%",
  "%redoButton_tooltip%"
]), $n = (t, e) => t[e] ?? e;
function bu({
  onUndoClick: t,
  onRedoClick: e,
  canUndo: r = !0,
  canRedo: o = !0,
  localizedStrings: n = {},
  showKeyboardShortcuts: s = !0,
  className: i = "tw:h-6 tw:w-6",
  variant: c = "ghost"
}) {
  const d = So(), l = $n(n, "%undoButton_tooltip%"), w = $n(n, "%redoButton_tooltip%");
  return /* @__PURE__ */ u(Oa, { children: [
    /* @__PURE__ */ a(At, { children: /* @__PURE__ */ u(_t, { children: [
      /* @__PURE__ */ a(Nt, { asChild: !0, children: /* @__PURE__ */ a(
        et,
        {
          "aria-label": l,
          className: i,
          size: "icon",
          onClick: t,
          disabled: !r,
          variant: c,
          children: /* @__PURE__ */ a(vc, {})
        }
      ) }),
      /* @__PURE__ */ a(Ct, { children: /* @__PURE__ */ u("p", { children: [
        l,
        s && /* @__PURE__ */ u(ft, { children: [
          " ",
          /* @__PURE__ */ a(wo, { children: d ? "⌘Z" : "Ctrl+Z" })
        ] })
      ] }) })
    ] }) }),
    e && (c === "secondary" || c === "default") && /* @__PURE__ */ a(Eo, {}),
    e && /* @__PURE__ */ a(At, { children: /* @__PURE__ */ u(_t, { children: [
      /* @__PURE__ */ a(Nt, { asChild: !0, children: /* @__PURE__ */ a(
        et,
        {
          "aria-label": w,
          className: i,
          size: "icon",
          onClick: e,
          disabled: !o,
          variant: c,
          children: /* @__PURE__ */ a(bc, {})
        }
      ) }),
      /* @__PURE__ */ a(Ct, { children: /* @__PURE__ */ u("p", { children: [
        w,
        s && /* @__PURE__ */ u(ft, { children: [
          " ",
          /* @__PURE__ */ a(wo, { children: d ? "⌘⇧Z" : "Ctrl+Y" })
        ] })
      ] }) })
    ] }) })
  ] });
}
function xu({
  children: t,
  editorRef: e,
  canUndo: r = !0,
  canRedo: o = !0
}) {
  const n = A(null);
  return J(() => {
    var d;
    const s = So(), i = ((d = n.current) == null ? void 0 : d.querySelector(".editor-input")) ?? void 0, c = (l) => {
      var p, h, f, b;
      if (!i || document.activeElement !== i) return;
      const w = l.key.toLowerCase();
      if (s) {
        if (!l.metaKey) return;
        !l.shiftKey && w === "z" ? (l.preventDefault(), r && ((p = e.current) == null || p.undo())) : l.shiftKey && w === "z" && (l.preventDefault(), o && ((h = e.current) == null || h.redo()));
      } else {
        if (!l.ctrlKey) return;
        !l.shiftKey && w === "z" ? (l.preventDefault(), r && ((f = e.current) == null || f.undo())) : (w === "y" || l.shiftKey && w === "z") && (l.preventDefault(), o && ((b = e.current) == null || b.redo()));
      }
    };
    return document.addEventListener("keydown", c), () => document.removeEventListener("keydown", c);
  }, [o, r, e]), /* @__PURE__ */ a("div", { ref: n, children: t });
}
function yu() {
  const t = A(void 0), e = A(new DOMRect()), r = A({
    getBoundingClientRect: () => {
      var s;
      const n = (s = t.current) == null ? void 0 : s.measure();
      return n && (e.current = n), e.current;
    },
    get contextElement() {
      var n;
      return (n = t.current) == null ? void 0 : n.contextElement;
    }
  }), o = L((n) => {
    t.current = n, e.current = n.measure() ?? new DOMRect();
  }, []);
  return V(() => ({ virtualRef: r, setSource: o }), [o]);
}
function ku(t) {
  if (t.getClientRects().length !== 0)
    return t.getBoundingClientRect();
}
function _u(t) {
  return new DOMRect(t.left, t.top, 0, t.height);
}
function Kh(t) {
  if (t.getClientRects().length !== 0)
    return t.getBoundingClientRect();
}
const Nu = (t, e, r) => t === "generated" ? /* @__PURE__ */ u(ft, { children: [
  /* @__PURE__ */ a("p", { children: "+" }),
  " ",
  e["%footnoteEditor_callerDropdown_item_generated%"]
] }) : t === "hidden" ? /* @__PURE__ */ u(ft, { children: [
  /* @__PURE__ */ a("p", { children: "-" }),
  " ",
  e["%footnoteEditor_callerDropdown_item_hidden%"]
] }) : /* @__PURE__ */ u(ft, { children: [
  /* @__PURE__ */ a("p", { children: r }),
  " ",
  e["%footnoteEditor_callerDropdown_item_custom%"]
] });
function Cu({
  callerType: t,
  customCaller: e,
  updateCaller: r,
  localizedStrings: o,
  focusNoteText: n
}) {
  const s = A(!1), i = A(null), c = A(null), d = A(!1), [l, w] = _(t), [p, h] = _(e), [f, b] = _(!1), x = A(!1), g = A(l);
  g.current = l;
  const C = A(p);
  C.current = p, J(() => {
    w(t);
  }, [t]), J(() => {
    p !== e && h(e);
  }, [e]);
  const E = (y) => {
    if (d.current = !1, b(y), !y) {
      const z = g.current, T = C.current;
      z !== "custom" || T ? (z !== t || T !== e) && (s.current = !0, r(z, T)) : (w(t), h(e));
    }
  }, S = (y) => {
    var z, T, O, M;
    y.stopPropagation(), document.activeElement === c.current && y.key === "ArrowDown" || y.key === "ArrowRight" ? ((z = i.current) == null || z.focus(), d.current = !0) : document.activeElement === i.current && y.key === "ArrowUp" ? ((T = c.current) == null || T.focus(), d.current = !1) : document.activeElement === i.current && y.key === "ArrowLeft" && ((O = i.current) == null ? void 0 : O.selectionStart) === 0 && ((M = c.current) == null || M.focus(), d.current = !1), l === "custom" && y.key === "Enter" && (document.activeElement === c.current || document.activeElement === i.current) && E(!1);
  };
  return /* @__PURE__ */ u(Be, { open: f, onOpenChange: E, children: [
    /* @__PURE__ */ a(At, { children: /* @__PURE__ */ u(_t, { children: [
      /* @__PURE__ */ a(Nt, { asChild: !0, children: /* @__PURE__ */ a(Ee, { asChild: !0, children: /* @__PURE__ */ a(et, { variant: "outline", className: "tw:h-6", children: Nu(t, o, e) }) }) }),
      /* @__PURE__ */ a(Ct, { children: o["%footnoteEditor_callerDropdown_tooltip%"] })
    ] }) }),
    /* @__PURE__ */ u(
      Fe,
      {
        style: { zIndex: Yn },
        onEscapeKeyDown: () => {
          g.current = t, C.current = e, w(t), h(e);
        },
        onCloseAutoFocus: (y) => {
          s.current && (s.current = !1, y.preventDefault(), n());
        },
        onClick: () => {
          d.current && (d.current = !1);
        },
        onKeyDown: S,
        onMouseMove: () => {
          var y;
          d.current && ((y = i.current) == null || y.focus());
        },
        children: [
          /* @__PURE__ */ a(cr, { children: o["%footnoteEditor_callerDropdown_label%"] }),
          /* @__PURE__ */ a(ir, {}),
          /* @__PURE__ */ a(
            Ze,
            {
              checked: l === "generated",
              onCheckedChange: () => w("generated"),
              children: /* @__PURE__ */ u("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ a("span", { children: o["%footnoteEditor_callerDropdown_item_generated%"] }),
                /* @__PURE__ */ a("span", { className: "tw:w-10 tw:text-center", children: go })
              ] })
            }
          ),
          /* @__PURE__ */ a(
            Ze,
            {
              checked: l === "hidden",
              onCheckedChange: () => w("hidden"),
              children: /* @__PURE__ */ u("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ a("span", { children: o["%footnoteEditor_callerDropdown_item_hidden%"] }),
                /* @__PURE__ */ a("span", { className: "tw:w-10 tw:text-center", children: fo })
              ] })
            }
          ),
          /* @__PURE__ */ a(
            Ze,
            {
              ref: c,
              checked: l === "custom",
              onCheckedChange: () => w("custom"),
              onPointerDown: () => {
                x.current = l === "custom";
              },
              onClick: (y) => {
                var z;
                if (y.stopPropagation(), x.current && y.target !== i.current) {
                  E(!1);
                  return;
                }
                d.current = !0, (z = i.current) == null || z.focus();
              },
              onSelect: (y) => y.preventDefault(),
              children: /* @__PURE__ */ u("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ a("span", { children: o["%footnoteEditor_callerDropdown_item_custom%"] }),
                /* @__PURE__ */ a(
                  Ia,
                  {
                    tabIndex: 0,
                    onMouseDown: (y) => {
                      y.stopPropagation(), w("custom"), d.current = !0;
                    },
                    ref: i,
                    className: "tw:h-auto tw:w-10 tw:p-0 tw:text-center",
                    value: p,
                    onKeyDown: (y) => {
                      y.key === "Enter" || y.key === "ArrowUp" || y.key === "ArrowDown" || y.key === "ArrowLeft" || y.key === "ArrowRight" || y.stopPropagation();
                    },
                    maxLength: 1,
                    onChange: (y) => h(y.target.value)
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
const Eu = (t, e) => t === "f" ? /* @__PURE__ */ u(ft, { children: [
  /* @__PURE__ */ a(ii, {}),
  " ",
  e["%footnoteEditor_noteType_footnote_label%"]
] }) : t === "fe" ? /* @__PURE__ */ u(ft, { children: [
  /* @__PURE__ */ a(si, {}),
  " ",
  e["%footnoteEditor_noteType_endNote_label%"]
] }) : /* @__PURE__ */ u(ft, { children: [
  /* @__PURE__ */ a(ni, {}),
  " ",
  e["%footnoteEditor_noteType_crossReference_label%"]
] }), Tu = (t, e) => {
  if (t === "x")
    return e["%footnoteEditor_noteType_crossReference_label%"];
  let r = e["%footnoteEditor_noteType_endNote_label%"];
  return t === "f" && (r = e["%footnoteEditor_noteType_footnote_label%"]), Ye(e["%footnoteEditor_noteType_tooltip%"] ?? "", {
    noteType: r
  });
};
function Su({
  noteType: t,
  handleNoteTypeChange: e,
  localizedStrings: r,
  isTypeSwitchable: o,
  focusNoteText: n
}) {
  const s = A(!1), i = (c) => {
    c !== t && (s.current = !0, e(c));
  };
  return /* @__PURE__ */ u(Be, { children: [
    /* @__PURE__ */ a(At, { children: /* @__PURE__ */ u(_t, { children: [
      /* @__PURE__ */ a(Nt, { asChild: !0, children: /* @__PURE__ */ a(Ee, { asChild: !0, children: /* @__PURE__ */ a(et, { variant: "outline", className: "tw:h-6", children: Eu(t, r) }) }) }),
      /* @__PURE__ */ a(Ct, { children: /* @__PURE__ */ a("p", { children: Tu(t, r) }) })
    ] }) }),
    /* @__PURE__ */ u(
      Fe,
      {
        style: { zIndex: Yn },
        onCloseAutoFocus: (c) => {
          s.current && (s.current = !1, c.preventDefault(), n());
        },
        children: [
          /* @__PURE__ */ a(cr, { children: r["%footnoteEditor_noteTypeDropdown_label%"] }),
          /* @__PURE__ */ a(ir, {}),
          /* @__PURE__ */ u(
            Ze,
            {
              disabled: t !== "x" && !o,
              checked: t === "x",
              onCheckedChange: () => i("x"),
              className: "tw:gap-2",
              children: [
                /* @__PURE__ */ a(ni, {}),
                /* @__PURE__ */ a("span", { children: r["%footnoteEditor_noteType_crossReference_label%"] })
              ]
            }
          ),
          /* @__PURE__ */ u(
            Ze,
            {
              disabled: t === "x" && !o,
              checked: t === "f",
              onCheckedChange: () => i("f"),
              className: "tw:gap-2",
              children: [
                /* @__PURE__ */ a(ii, {}),
                /* @__PURE__ */ a("span", { children: r["%footnoteEditor_noteType_footnote_label%"] })
              ]
            }
          ),
          /* @__PURE__ */ u(
            Ze,
            {
              disabled: t === "x" && !o,
              checked: t === "fe",
              onCheckedChange: () => i("fe"),
              className: "tw:gap-2",
              children: [
                /* @__PURE__ */ a(si, {}),
                /* @__PURE__ */ a("span", { children: r["%footnoteEditor_noteType_endNote_label%"] })
              ]
            }
          )
        ]
      }
    )
  ] });
}
const Ru = Object.freeze([
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
function Du({ icon: t, className: e }) {
  return /* @__PURE__ */ a(t ?? xc, { className: e, size: 16 });
}
function Ou({ state: t }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "marker-selection-state",
      className: "tw:flex tw:w-4 tw:min-w-4 tw:items-center tw:justify-center",
      children: t !== "none" && /* @__PURE__ */ a(Je, { size: 16 })
    }
  );
}
function Vn({
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
        t.selectionState !== void 0 && /* @__PURE__ */ a(Ou, { state: t.selectionState }),
        /* @__PURE__ */ a("div", { className: "tw:w-8 tw:min-w-8", children: t.marker ? (
          // Monospace: a USFM marker is a code, not prose, and should read as one. Deliberately
          // inherits the row's own foreground rather than taking a marker-specific colour.
          /* @__PURE__ */ a("span", { className: "tw:font-mono tw:text-xs", children: t.marker })
        ) : /* @__PURE__ */ a("div", { children: /* @__PURE__ */ a(Du, { icon: t.icon }) }) }),
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
        (t.isDisallowed || t.isDeprecated) && /* @__PURE__ */ a(Ps, { className: "tw:font-sans", children: t.isDisallowed ? e["%markerMenu_disallowed_label%"] : e["%markerMenu_deprecated_label%"] })
      ]
    }
  );
}
function Mu({
  localizedStrings: t,
  markerMenuItems: e,
  searchRef: r,
  searchPlaceholder: o
}) {
  const [n, s] = _(""), [i, c] = V(() => {
    const d = zs(n.trim().toLowerCase());
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
      Da,
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
      /* @__PURE__ */ a(Ma, { children: t["%markerMenu_noResults%"] }),
      /* @__PURE__ */ a(Xe, { children: i.map((d) => {
        var l;
        return /* @__PURE__ */ a(
          Vn,
          {
            item: d,
            localizedStrings: t
          },
          `item-${d.marker ?? ((l = d.icon) == null ? void 0 : l.displayName)}-${d.title.replaceAll(" ", "")}`
        );
      }) }),
      c.length > 0 && /* @__PURE__ */ u(ft, { children: [
        i.length > 0 && /* @__PURE__ */ a(Zn, { alwaysRender: !0 }),
        /* @__PURE__ */ a(Xe, { children: c.map((d) => {
          var l;
          return /* @__PURE__ */ a(
            Vn,
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
function Iu(t, e, r, o, n) {
  if (!o || o === "p") return [];
  const s = Ar[o], i = s != null && s.children ? s : n && Ar[n];
  if (!i || !i.children) return [];
  const c = [];
  return Object.entries(i.children).forEach(([, d]) => {
    c.push(
      ...d.map((l) => ({
        marker: l,
        title: r[Ar[l].description] ?? Ar[l].description,
        action: () => {
          var w;
          (w = t.current) == null || w.insertMarker(l), e();
        }
      }))
    );
  }), c.sort((d, l) => (d.marker ?? d.title).localeCompare(l.marker ?? l.title));
}
function zu(t) {
  return {
    id: t.marker,
    label: t.marker,
    description: t.description,
    badge: t.kind === "closeTag" ? "%markerMenu_endTag_label%" : void 0,
    muted: !t.isBasic
  };
}
function Pu(t) {
  var r;
  const e = (r = t.attributes) == null ? void 0 : r.char;
  e != null && e.style && (e.style === "ft" && (e.style = "xt"), e.style === "fr" && (e.style = "xo"), e.style === "fq" && (e.style = "xq"));
}
function Au(t) {
  var r;
  const e = (r = t.attributes) == null ? void 0 : r.char;
  e != null && e.style && (e.style === "xt" && (e.style = "ft"), e.style === "xo" && (e.style = "fr"), e.style === "xq" && (e.style = "fq"));
}
const $u = {
  type: "USJ",
  version: "3.1",
  content: [
    {
      type: "para"
    }
  ]
};
function Hh({
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
  var P;
  const h = A(null), f = A(null), b = A(null);
  Ht(() => {
    if (!b.current) return;
    const N = parseFloat(getComputedStyle(b.current).width);
    N > 0 && (b.current.style.width = `${N}px`);
  }, []);
  const [x, g] = _("generated"), [C, E] = _("generated"), [S, y] = _("*"), [z, T] = _("*"), [O, M] = _("f"), [D, I] = _(!1), [Y, X] = _(!0), [B, k] = _(!1), ot = A(!1), $ = A(""), [q, Q] = _(!1), j = yu(), [at, wt] = _(), ct = A(null), tt = A(
    void 0
  ), ut = A(0), xt = A(void 0), gt = L(() => {
    var F, G, U;
    if ((F = h.current) != null && F.getSelection()) return;
    const N = xt.current;
    N ? (G = h.current) == null || G.setSelection(N) : (U = h.current) == null || U.selectNote(0);
  }, []), yt = L(() => {
    var N;
    gt(), (N = h.current) == null || N.focus();
  }, [gt]), St = V(
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
        ...i.view ?? ad(),
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
  ), Gt = V(
    () => Iu(
      h,
      () => Q(!1),
      d,
      at,
      O
    ),
    [d, at, O]
  );
  J(() => {
    var N;
    q || (N = h.current) == null || N.focus();
  }, [O, q]);
  const $t = L(() => {
    var U, Z, H;
    const N = (U = f.current) == null ? void 0 : U.querySelector(".editor-input"), F = N == null ? void 0 : N.querySelector("span.note"), G = (H = (Z = f.current) == null ? void 0 : Z.ownerDocument.getSelection()) == null ? void 0 : H.anchorNode;
    return !!F && !!G && F.contains(G);
  }, []);
  J(() => {
    var Z, H;
    let N, F, G;
    ot.current = !1, xt.current = void 0, X(!0);
    const U = e == null ? void 0 : e.at(0);
    if (U && Ir("note", U)) {
      const nt = (Z = U.insert.note) == null ? void 0 : Z.caller;
      let kt = "custom";
      nt === go ? kt = "generated" : nt === fo ? kt = "hidden" : nt && (y(nt), T(nt)), g(kt), E(kt), M(((H = U.insert.note) == null ? void 0 : H.style) ?? "f"), N = setTimeout(() => {
        var mt, bt, ht;
        (mt = h.current) == null || mt.applyUpdate([U]), (bt = h.current) == null || bt.selectNote(0), (ht = h.current) == null || ht.focus(), F = requestAnimationFrame(() => {
          G = setTimeout(() => {
            var lt, It;
            $t() || ((lt = h.current) == null || lt.selectNote(0), (It = h.current) == null || It.focus());
          }, 0);
        });
      }, 0);
    }
    return () => {
      N && clearTimeout(N), F !== void 0 && cancelAnimationFrame(F), G !== void 0 && clearTimeout(G);
    };
  }, [e, s, $t]);
  const ie = L(
    (N = !1) => {
      var G, U, Z;
      p == null || p();
      const F = (U = (G = h.current) == null ? void 0 : G.getNoteOps(0)) == null ? void 0 : U.at(0);
      F && Ir("note", F) && (r == null || r([F]), N && l && s && ((Z = l.current) == null || Z.replaceEmbedUpdate(s, [F])));
    },
    [s, r, p, l]
  ), Rt = L(
    (N) => {
      var G, U, Z;
      const F = (G = h.current) == null ? void 0 : G.getSelection();
      (U = h.current) == null || U.applyUpdate([N, { delete: 1 }]), F && ((Z = h.current) == null || Z.setSelection(F)), yt();
    },
    [yt]
  ), Et = L(
    (N, F) => {
      var Z, H;
      const G = (H = (Z = h.current) == null ? void 0 : Z.getNoteOps(0)) == null ? void 0 : H.at(0);
      if (!G || !Ir("note", G) || !G.insert.note) return;
      let U;
      N === "custom" ? U = F : N === "generated" ? U = go : U = fo, G.insert.note.caller !== U && (G.insert.note.caller = U, Rt(G));
    },
    [Rt]
  ), Bt = L(() => {
    var N;
    tt.current || (N = h.current) == null || N.commitPendingMarkerEdits(), ie(!0), o();
  }, [o, ie]), ce = A(Bt);
  Ht(() => {
    ce.current = Bt;
  });
  const le = A({ book: n.book, chapterNum: n.chapterNum });
  Ht(() => {
    (le.current.book !== n.book || le.current.chapterNum !== n.chapterNum) && (le.current = { book: n.book, chapterNum: n.chapterNum }, ce.current());
  }, [n.book, n.chapterNum]);
  const Mt = () => {
    var F;
    const N = (F = f.current) == null ? void 0 : F.getElementsByClassName("editor-input")[0];
    N != null && N.textContent && navigator.clipboard.writeText(N.textContent);
  }, Dt = L(
    (N, F) => {
      p == null || p(), g(N), y(F), Et(N, F);
    },
    [Et, p]
  ), de = (N) => {
    var G, U, Z, H;
    M(N);
    const F = (U = (G = h.current) == null ? void 0 : G.getNoteOps(0)) == null ? void 0 : U.at(0);
    if (F && Ir("note", F)) {
      F.insert.note && (F.insert.note.style = N);
      const nt = (H = (Z = F.insert.note) == null ? void 0 : Z.contents) == null ? void 0 : H.ops;
      O !== "x" && N === "x" ? nt == null || nt.forEach((kt) => Pu(kt)) : O === "x" && N !== "x" && (nt == null || nt.forEach((kt) => Au(kt))), Rt(F);
    }
  }, xe = (N) => {
    wt(N.contextMarker), k(N.canRedo);
  }, ge = L(
    (N) => {
      var G, U, Z, H, nt;
      const F = (U = (G = h.current) == null ? void 0 : G.getNoteOps(0)) == null ? void 0 : U.at(0);
      if (F && Ir("note", F)) {
        N.content.length > 1 && setTimeout(() => {
          var bt;
          (bt = h.current) == null || bt.applyUpdate([{ retain: 2 }, { delete: 1 }]);
        }, 0);
        const kt = (Z = F.insert.note) == null ? void 0 : Z.style, mt = (nt = (H = F.insert.note) == null ? void 0 : H.contents) == null ? void 0 : nt.ops;
        if (kt || I(!1), I(
          kt === "x" ? !!(mt != null && mt.every((bt) => {
            var lt, It;
            if (!((lt = bt.attributes) != null && lt.char)) return !0;
            const ht = ((It = bt.attributes) == null ? void 0 : It.char).style;
            return ht === "xt" || ht === "xo" || ht === "xq";
          })) : !!(mt != null && mt.every((bt) => {
            var lt, It;
            if (!((lt = bt.attributes) != null && lt.char)) return !0;
            const ht = ((It = bt.attributes) == null ? void 0 : It.char).style;
            return ht === "ft" || ht === "fr" || ht === "fq";
          }))
        ), !ot.current) {
          ot.current = !0, $.current = JSON.stringify(F), X(!0);
          return;
        }
        X(JSON.stringify(F) === $.current), ie();
      } else
        I(!1), X(!0);
    },
    [ie]
  ), ye = L(() => {
    const N = window.getSelection();
    if (!Gt.length || !N || N.rangeCount === 0)
      return;
    const F = f.current;
    if (!F) return;
    const G = N.getRangeAt(0).cloneRange();
    j.setSource({
      measure: () => {
        const U = ku(G);
        return U && _u(U);
      },
      contextElement: F
    }), Q(!0);
  }, [Gt, j]), Zt = A(() => {
  }), Wt = L(
    (N, F, G) => {
      const { anchorRect: U } = N;
      if (!w || !U) return;
      const { passive: Z } = G;
      As({
        items: F,
        passive: Z,
        // No `shouldSpaceCommit`, deliberately: the Space note-marker exception exists for
        // Standard-view BODY text, where a materialized `\f ` literal absorbs the following word
        // as the new footnote's caller. This palette offers note-INTERNAL markers for content
        // already inside a note, so Space keeps its plain typed-literal commit here.
        sessionCounterRef: ut,
        setSession: (H) => {
          tt.current = H;
        },
        clearSessionIfCurrent: (H) => en(tt, H),
        // Through the ref so the palette always runs the CURRENT handler — the callback is
        // captured once, at show time, while the session it drives is replaced on every reopen.
        runSessionKey: (H) => Zt.current(H),
        show: (H) => w.show(
          F.map(zu),
          U,
          Z,
          H
        ),
        // What a lost selection costs on this path specifically: the apply lands the marker as an
        // invalid trailing span after the note's closing marker while the typed literal strands at
        // the real caret (live-observed: a red `\fq` after `\f*`).
        restoreSelectionIfLost: gt,
        focusEditor: () => {
          var H;
          return (H = h.current) == null ? void 0 : H.focus();
        },
        applyItem: (H) => {
          var nt;
          return (nt = h.current) == null ? void 0 : nt.applyMarkerMenuSelection(H, {
            trigger: "backslash",
            // ACTIVE palette: the trigger was claimed and never landed, so there is never a
            // literal prefix for the apply to clean up.
            literalPrefixLanded: !1
          });
        },
        onShowError: (H) => {
          (!Vc(H) || H.code !== Lc) && console.warn(
            `FootnoteEditor: the marker palette did not open: ${Bc(H)}`
          );
        }
      });
    },
    [w, gt]
  ), Ft = L(() => {
    var G;
    const N = (G = h.current) == null ? void 0 : G.getMarkerMenuContext();
    if (!N) return !1;
    const F = od(St.styleInfo ?? nd, N);
    return F.length === 0 ? !1 : (Wt(N, F, { passive: !N.hasTextSelection }), !0);
  }, [Wt, St.styleInfo]), re = L(
    (N) => {
      const F = tt.current;
      if (!F || !w) return;
      $s(N, F, {
        // Overlay ops delegate to the host-supplied driver; the commit ops are EDITOR-side
        // applies this popover owns (it holds the editor ref). The table calls `dismiss()` right
        // after each, resolving the show promise `undefined` — which the openMarkerPalette
        // `.then` treats as a dismissal, so nothing double-applies.
        update: (U) => w.update(U),
        commit: () => w.commit(),
        dismiss: () => w.dismiss(),
        commitTyped: (U) => {
          var Z;
          return (Z = h.current) == null ? void 0 : Z.commitTypedMarker(U);
        },
        commitTypedAndReopen: (U) => {
          var Z;
          (Z = h.current) == null || Z.commitTypedMarker(U, { trailingSpace: !1 }), Ft();
        },
        commitTypedCloser: (U) => {
          var Z;
          return (Z = h.current) == null ? void 0 : Z.commitTypedCloser(U);
        },
        commitItem: (U) => {
          var H;
          const Z = F.items.find((nt) => nt.marker === U);
          Z && ((H = h.current) == null || H.applyMarkerMenuSelection(Z, {
            trigger: "backslash",
            literalPrefixLanded: !1
          }));
        }
      }) === "ended" && en(tt, F.token);
    },
    [w, Ft]
  );
  J(() => {
    Zt.current = re;
  }, [re]), J(() => {
    const N = (F) => {
      var Z, H;
      const G = (Z = f.current) == null ? void 0 : Z.querySelector(".editor-input");
      if (!G || F.target !== G) return;
      const U = (H = h.current) == null ? void 0 : H.getSelection();
      U && (xt.current = U);
    };
    return document.addEventListener("focusout", N), () => document.removeEventListener("focusout", N);
  }, []), J(() => {
    const N = () => {
      q && Q(!1);
    };
    return window.addEventListener("click", N), () => {
      window.removeEventListener("click", N);
    };
  }, [q]), J(() => {
    var N;
    q && ((N = ct.current) == null || N.focus());
  }, [q]), J(() => {
    var G;
    const N = () => {
      var U;
      return ((U = f.current) == null ? void 0 : U.querySelector(".editor-input")) ?? void 0;
    };
    if (((G = St.view) == null ? void 0 : G.markerMode) === "editable") {
      const U = (H) => {
        var mt, bt, ht, lt;
        if (Ls(H)) return;
        const nt = N();
        if (!nt || document.activeElement !== nt) return;
        if (tt.current && w) {
          Zt.current(H);
          return;
        }
        if (H.key === "Enter" && !$t()) {
          H.preventDefault(), H.stopPropagation(), (mt = h.current) == null || mt.selectNote(0), (bt = h.current) == null || bt.focus();
          return;
        }
        if (w && H.key === c) {
          if (!$t()) {
            H.preventDefault(), H.stopPropagation(), (ht = h.current) == null || ht.selectNote(0), (lt = h.current) == null || lt.focus();
            return;
          }
          Ft() && (H.preventDefault(), H.stopPropagation());
        }
      }, Z = () => {
        var nt, kt;
        const H = N();
        !H || document.activeElement !== H || $t() || ((nt = h.current) == null || nt.selectNote(0), (kt = h.current) == null || kt.focus());
      };
      return document.addEventListener("keydown", U, { capture: !0 }), document.addEventListener("paste", Z, { capture: !0 }), () => {
        document.removeEventListener("keydown", U, { capture: !0 }), document.removeEventListener("paste", Z, { capture: !0 });
      };
    }
    const F = (U) => {
      const Z = N();
      !q && Z && document.activeElement === Z && U.key === c ? (U.preventDefault(), ye()) : q && U.key === "Escape" && (U.preventDefault(), Q(!1));
    };
    return document.addEventListener("keydown", F), () => {
      document.removeEventListener("keydown", F);
    };
  }, [
    q,
    ye,
    c,
    (P = St.view) == null ? void 0 : P.markerMode,
    St.styleInfo,
    w,
    Ft,
    $t
  ]), J(() => {
    const N = () => {
      var U, Z, H;
      const F = ((U = f.current) == null ? void 0 : U.querySelector(".editor-input")) ?? void 0;
      if (!F || document.activeElement !== F) return;
      const G = document.getSelection();
      G && !G.isCollapsed || $t() || ((Z = h.current) == null || Z.selectNote(0), (H = h.current) == null || H.focus());
    };
    return document.addEventListener("pointerup", N), document.addEventListener("selectionchange", N), () => {
      document.removeEventListener("pointerup", N), document.removeEventListener("selectionchange", N);
    };
  }, [$t]);
  const Me = d["%footnoteEditor_copyButton_tooltip%"];
  return /* @__PURE__ */ u(ft, { children: [
    /* @__PURE__ */ u("div", { ref: b, className: "footnote-editor tw:grid tw:max-w-full tw:gap-[12px]", children: [
      /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-wrap tw:gap-y-2", children: [
        /* @__PURE__ */ u("div", { className: "tw:flex tw:gap-4", children: [
          /* @__PURE__ */ a(
            Su,
            {
              isTypeSwitchable: D,
              noteType: O,
              handleNoteTypeChange: de,
              localizedStrings: d,
              focusNoteText: yt
            }
          ),
          /* @__PURE__ */ a(
            Cu,
            {
              callerType: x,
              customCaller: S,
              updateCaller: Dt,
              localizedStrings: d,
              focusNoteText: yt
            }
          )
        ] }),
        /* @__PURE__ */ a("div", { className: "tw:flex tw:flex-1 tw:justify-end", children: /* @__PURE__ */ u(Oa, { children: [
          /* @__PURE__ */ a(
            bu,
            {
              onUndoClick: () => {
                var N;
                return (N = h.current) == null ? void 0 : N.undo();
              },
              onRedoClick: () => {
                var N;
                return (N = h.current) == null ? void 0 : N.redo();
              },
              canUndo: !Y,
              canRedo: B,
              localizedStrings: d
            }
          ),
          /* @__PURE__ */ a(
            es,
            {
              onCancelClick: o,
              onAcceptClick: Bt,
              canAccept: !Y || C !== x || x === "custom" && S !== z,
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
              xu,
              {
                editorRef: h,
                canUndo: !Y,
                canRedo: B,
                children: /* @__PURE__ */ a(
                  id,
                  {
                    options: St,
                    onStateChange: xe,
                    onUsjChange: ge,
                    defaultUsj: $u,
                    onScrRefChange: () => {
                    },
                    scrRef: n,
                    ref: h
                  }
                )
              }
            ) }),
            /* @__PURE__ */ a("div", { className: "tw:absolute tw:bottom-0 tw:right-0", children: /* @__PURE__ */ a(At, { children: /* @__PURE__ */ u(_t, { children: [
              /* @__PURE__ */ a(Nt, { asChild: !0, children: /* @__PURE__ */ a(
                et,
                {
                  "aria-label": Me,
                  onClick: Mt,
                  className: "tw:h-6 tw:w-6",
                  variant: "ghost",
                  size: "icon",
                  children: /* @__PURE__ */ a(oi, {})
                }
              ) }),
              /* @__PURE__ */ a(Ct, { children: /* @__PURE__ */ a("p", { children: Me }) })
            ] }) }) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ u(lr, { open: q, children: [
      /* @__PURE__ */ a(Vs, { virtualRef: j.virtualRef }),
      /* @__PURE__ */ a(
        dr,
        {
          className: "tw:w-[500px] tw:p-0",
          onClick: (N) => {
            N.preventDefault(), N.stopPropagation();
          },
          children: /* @__PURE__ */ a(
            Mu,
            {
              markerMenuItems: Gt,
              localizedStrings: d,
              searchRef: ct
            }
          )
        }
      )
    ] })
  ] });
}
const qh = Object.freeze([
  ...Ru,
  ...Object.entries(Ar).map(([, t]) => t.description).filter((t) => !!t),
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
  ...vu,
  ...ts
]);
function Vu(t, e, r = !0, o = void 0) {
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
          const d = v(`usfm_${t}`);
          return /* @__PURE__ */ a("span", { className: d, children: s }, c);
        }
        return /* @__PURE__ */ u(
          "span",
          {
            className: "tw:inline-flex tw:items-center tw:gap-1 tw:underline tw:decoration-destructive",
            children: [
              /* @__PURE__ */ a(uo, { className: "tw:h-4 tw:w-4 tw:fill-destructive" }),
              /* @__PURE__ */ a("span", { children: s }),
              /* @__PURE__ */ a(uo, { className: "tw:h-4 tw:w-4 tw:fill-destructive" })
            ]
          },
          c
        );
      }
      return Lu(s, c, r, [
        ...n,
        t ?? "unknown"
      ]);
    });
}
function Lu(t, e, r, o = []) {
  const { marker: n } = t;
  return /* @__PURE__ */ u("span", { children: [
    n ? r && /* @__PURE__ */ a("span", { className: "marker", children: `\\${n} ` }) : /* @__PURE__ */ a(
      uo,
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
function Bu({
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
  /* @__PURE__ */ a("span", { className: v("note-caller tw:inline-block", { formatted: s }), children: n }), p = t.category && /* @__PURE__ */ u("span", { className: "note-category tw:inline-block", children: [
    o && /* @__PURE__ */ a("span", { className: "marker", children: "\\cat " }),
    t.category,
    o && /* @__PURE__ */ a("span", { className: "marker", children: "\\cat*" })
  ] }), h = i && /* @__PURE__ */ u(ft, { children: [
    Yo(t.marker, [i], o, !1),
    " "
  ] }), f = !!d, b = !!w, x = !!p, g = e === "horizontal" ? "horizontal" : "vertical", C = o ? "marker-visible" : "", E = e === "horizontal" ? "tw:col-span-1" : "tw:col-span-2 tw:col-start-1 tw:row-start-2", S = v(g, C);
  return /* @__PURE__ */ u(ft, { children: [
    /* @__PURE__ */ u("div", { className: v("textual-note-header tw:col-span-1 tw:w-fit tw:text-nowrap", S), children: [
      d,
      f && (b || x) && " ",
      w,
      b && x && " ",
      p
    ] }),
    /* @__PURE__ */ a("div", { className: v("textual-note-header tw:col-span-1 tw:w-fit tw:text-nowrap", S), children: h }),
    /* @__PURE__ */ a(
      "div",
      {
        className: v(
          "textual-note-body tw:flex tw:flex-col tw:gap-1",
          E,
          S
        ),
        children: c && c.length > 0 && /* @__PURE__ */ a(ft, { children: Vu(t.marker, c, o, l) })
      }
    )
  ] });
}
function Gh({
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
  const p = l ?? Fc(r, void 0), h = (y, z) => {
    w == null || w(y, z, n);
  }, f = s ? r.findIndex((y) => y === s) : -1, [b, x] = _(f), g = (y, z, T) => {
    if (r.length)
      switch (y.key) {
        case "Enter":
        case " ":
          y.preventDefault(), w == null || w(z, T, n);
          break;
      }
  }, C = (y) => {
    if (r.length)
      switch (y.key) {
        case "ArrowDown":
          y.preventDefault(), x((z) => Math.min(z + 1, r.length - 1));
          break;
        case "ArrowUp":
          y.preventDefault(), x((z) => Math.max(z - 1, 0));
          break;
      }
  }, E = A([]);
  J(() => {
    var y;
    b >= 0 && b < E.current.length && ((y = E.current[b]) == null || y.focus());
  }, [b]);
  const S = s ? r.findIndex((y) => y === s) : -1;
  return J(() => {
    var y;
    S < 0 || S >= E.current.length || (y = E.current[S]) == null || y.scrollIntoView({ block: "nearest" });
  }, [S, i]), /* @__PURE__ */ a(
    "div",
    {
      role: "listbox",
      "aria-label": "Footnotes",
      tabIndex: b < 0 ? 0 : -1,
      className: v("tw:h-full tw:overflow-y-auto", t),
      onKeyDown: C,
      children: /* @__PURE__ */ a(
        "ul",
        {
          className: v(
            "tw:p-0.5 tw:pt-1",
            "tw:grid",
            o === "horizontal" ? "tw:grid-cols-[min-content_min-content_1fr]" : "tw:grid-cols-[min-content_1fr]",
            !d && "formatted-font"
          ),
          children: r.map((y, z) => {
            const T = y === s, O = `${n}-${z}`;
            return (
              // The key belongs on the outermost node returned from the map — the Fragment — not on
              // the `<li>` nested inside it, which leaves the Fragment itself unkeyed.
              /* @__PURE__ */ u(te.Fragment, { children: [
                /* @__PURE__ */ a(
                  "li",
                  {
                    ref: (M) => {
                      E.current[z] = M;
                    },
                    role: "option",
                    "aria-selected": T,
                    "data-marker": y.marker,
                    "data-state": T ? "selected" : void 0,
                    tabIndex: z === b ? 0 : -1,
                    className: v(
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
                    onClick: () => h(y, z),
                    onKeyDown: (M) => g(M, y, z),
                    children: /* @__PURE__ */ a(
                      Bu,
                      {
                        footnote: y,
                        layout: o,
                        formatCaller: () => p(y.caller, z),
                        showMarkers: c
                      }
                    )
                  }
                ),
                z < r.length - 1 && o === "vertical" && /* @__PURE__ */ a(Kr, { tabIndex: -1, className: "tw:col-span-2" })
              ] }, O)
            );
          })
        }
      )
    }
  );
}
function Fu(t) {
  const e = [];
  let r = 0;
  const o = /\\\\(.+?)\\\\/g;
  let n;
  for (; (n = o.exec(t)) !== null; )
    n.index > r && e.push(t.substring(r, n.index)), e.push(/* @__PURE__ */ a("strong", { children: n[1] }, n.index)), r = o.lastIndex;
  return r < t.length && e.push(t.substring(r)), e.length > 0 ? e : [t];
}
function ju({
  occurrenceData: t,
  setScriptureReference: e,
  localizedStrings: r,
  classNameForText: o
}) {
  const n = r["%webView_inventory_occurrences_table_header_reference%"], s = r["%webView_inventory_occurrences_table_header_occurrence%"], i = V(() => {
    const c = [], d = /* @__PURE__ */ new Set();
    return t.forEach((l) => {
      const w = `${l.reference.book}:${l.reference.chapterNum}:${l.reference.verseNum}:${l.text}`;
      d.has(w) || (d.add(w), c.push(l));
    }), c;
  }, [t]);
  return /* @__PURE__ */ u(Ro, { stickyHeader: !0, children: [
    /* @__PURE__ */ a(Do, { stickyHeader: !0, children: /* @__PURE__ */ u(We, { children: [
      /* @__PURE__ */ a(ya, { children: n }),
      /* @__PURE__ */ a(ya, { children: s })
    ] }) }),
    /* @__PURE__ */ a(Oo, { children: i.length > 0 && i.map((c) => /* @__PURE__ */ u(
      We,
      {
        onClick: () => {
          e(c.reference);
        },
        children: [
          /* @__PURE__ */ a(kr, { children: $e(c.reference, "English") }),
          /* @__PURE__ */ a(kr, { className: o, children: Fu(c.text) })
        ]
      },
      `${c.reference.book} ${c.reference.chapterNum}:${c.reference.verseNum}-${c.text}`
    )) })
  ] });
}
function ss({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    hn.Root,
    {
      "data-slot": "checkbox",
      className: v(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:peer tw:relative tw:flex tw:size-4 tw:shrink-0 tw:items-center tw:justify-center tw:rounded-[4px] tw:border tw:border-input tw:transition-colors tw:outline-none tw:group-has-disabled/field:opacity-50 tw:after:absolute tw:after:-inset-x-3 tw:after:-inset-y-2 tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:aria-invalid:aria-checked:border-primary tw:dark:bg-input/30 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40 tw:data-checked:border-primary tw:data-checked:bg-primary tw:data-checked:text-primary-foreground tw:dark:data-checked:bg-primary",
        t
      ),
      ...e,
      children: /* @__PURE__ */ a(
        hn.Indicator,
        {
          "data-slot": "checkbox-indicator",
          className: "tw:grid tw:place-content-center tw:text-current tw:transition-none tw:[&>svg]:size-3.5",
          children: /* @__PURE__ */ a(Pa, {})
        }
      )
    }
  );
}
const Uu = (t) => {
  if (t === "asc")
    return /* @__PURE__ */ a(Nc, { className: "tw:h-4 tw:w-4" });
  if (t === "desc")
    return /* @__PURE__ */ a(Cc, { className: "tw:h-4 tw:w-4" });
}, Va = (t, e, r) => /* @__PURE__ */ a(At, { children: /* @__PURE__ */ u(_t, { children: [
  /* @__PURE__ */ u(
    Nt,
    {
      className: v("tw:flex tw:w-full tw:justify-start", r),
      variant: "ghost",
      onClick: () => t.toggleSorting(void 0),
      children: [
        /* @__PURE__ */ a("span", { className: "tw:w-6 tw:max-w-fit tw:flex-1 tw:overflow-hidden tw:text-ellipsis", children: e }),
        Uu(t.getIsSorted())
      ]
    }
  ),
  /* @__PURE__ */ a(Ct, { side: "bottom", children: e })
] }) }), Wh = (t) => ({
  accessorKey: "item",
  accessorFn: (e) => e.items[0],
  header: ({ column: e }) => Va(e, t)
}), Ku = (t, e) => ({
  accessorKey: `item${e}`,
  accessorFn: (r) => r.items[e],
  header: ({ column: r }) => Va(r, t)
}), Yh = (t) => ({
  accessorKey: "count",
  header: ({ column: e }) => Va(e, t, "tw:justify-end"),
  cell: ({ row: e }) => /* @__PURE__ */ a("div", { className: "tw:flex tw:justify-end tw:tabular-nums", children: e.getValue("count") })
}), oo = (t, e, r, o, n, s) => {
  let i = [...r];
  t.forEach((d) => {
    e === "approved" ? i.includes(d) || i.push(d) : i = i.filter((l) => l !== d);
  }), o(i);
  let c = [...n];
  t.forEach((d) => {
    e === "unapproved" ? c.includes(d) || c.push(d) : c = c.filter((l) => l !== d);
  }), s(c);
}, Zh = (t, e, r, o, n) => ({
  accessorKey: "status",
  header: ({ column: s }) => Va(s, t, "tw:justify-center"),
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
              d.stopPropagation(), oo(
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
            children: /* @__PURE__ */ a(yc, {})
          }
        ),
        /* @__PURE__ */ a(
          wa,
          {
            onClick: (d) => {
              d.stopPropagation(), oo(
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
            children: /* @__PURE__ */ a(kc, {})
          }
        ),
        /* @__PURE__ */ a(
          wa,
          {
            onClick: (d) => {
              d.stopPropagation(), oo(
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
            children: /* @__PURE__ */ a(_c, {})
          }
        )
      ] }) })
    );
  }
}), Xh = (t) => t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g), Jh = (t) => {
  const e = /^\\[vc]\s+(\d+)/, r = t.match(e);
  if (r)
    return +r[1];
}, Qh = (t) => {
  const e = t.match(/^\\id\s+([A-Za-z]+)/);
  return e ? e[1] : "";
}, Hu = (t, e, r) => r.includes(t) ? "unapproved" : e.includes(t) ? "approved" : "unknown", tg = Object.freeze([
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
]), qu = (t, e, r) => {
  let o = t;
  return e !== "all" && (o = o.filter(
    (n) => e === "approved" && n.status === "approved" || e === "unapproved" && n.status === "unapproved" || e === "unknown" && n.status === "unknown"
  )), r !== "" && (o = o.filter((n) => n.items[0].includes(r))), o;
}, Gu = (t, e, r) => t.map((o) => {
  const n = sn(o.key) ? o.key : o.key[0];
  return {
    items: sn(o.key) ? [o.key] : o.key,
    count: o.count,
    status: o.status || Hu(n, e, r),
    occurrences: o.occurrences || []
  };
}), Ne = (t, e) => t[e] ?? e;
function eg({
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
  const f = Ne(r, "%webView_inventory_all%"), b = Ne(r, "%webView_inventory_approved%"), x = Ne(r, "%webView_inventory_unapproved%"), g = Ne(r, "%webView_inventory_unknown%"), C = Ne(r, "%webView_inventory_scope_currentBook%"), E = Ne(r, "%webView_inventory_scope_chapter%"), S = Ne(r, "%webView_inventory_scope_verse%"), y = Ne(r, "%webView_inventory_filter_text%"), z = Ne(
    r,
    "%webView_inventory_show_additional_items%"
  ), T = Ne(r, "%webView_inventory_no_results%"), [O, M] = _(!1), [D, I] = _("all"), [Y, X] = _(""), [B, k] = _([]), ot = V(() => {
    const tt = t ?? [];
    return tt.length === 0 ? [] : Gu(tt, n, s);
  }, [t, n, s]), $ = V(() => {
    if (O) return ot;
    const tt = [];
    return ot.forEach((ut) => {
      const xt = ut.items[0], gt = tt.find(
        (yt) => yt.items[0] === xt
      );
      gt ? (gt.count += ut.count, gt.occurrences = gt.occurrences.concat(ut.occurrences)) : tt.push({
        items: [xt],
        count: ut.count,
        occurrences: ut.occurrences,
        status: ut.status
      });
    }), tt;
  }, [O, ot]), q = V(() => $.length === 0 ? [] : qu($, D, Y), [$, D, Y]), Q = V(() => {
    var xt, gt;
    if (!O) return d;
    const tt = (xt = o == null ? void 0 : o.tableHeaders) == null ? void 0 : xt.length;
    if (!tt) return d;
    const ut = [];
    for (let yt = 0; yt < tt; yt++)
      ut.push(
        Ku(
          ((gt = o == null ? void 0 : o.tableHeaders) == null ? void 0 : gt[yt]) || "Additional Item",
          yt + 1
        )
      );
    return [...ut, ...d];
  }, [o == null ? void 0 : o.tableHeaders, d, O]);
  J(() => {
    q.length === 0 ? k([]) : q.length === 1 && k(q[0].items);
  }, [q]);
  const j = (tt, ut) => {
    ut.setRowSelection(() => {
      const gt = {};
      return gt[tt.index] = !0, gt;
    });
    const xt = tt.original.items;
    k(xt), h && xt.length > 0 && h(xt[0]);
  }, at = (tt) => {
    if (tt === "book" || tt === "chapter" || tt === "verse")
      c(tt);
    else
      throw new Error(`Invalid scope value: ${tt}`);
  }, wt = (tt) => {
    if (tt === "all" || tt === "approved" || tt === "unapproved" || tt === "unknown")
      I(tt);
    else
      throw new Error(`Invalid status filter value: ${tt}`);
  }, ct = V(() => {
    if ($.length === 0 || B.length === 0) return [];
    const tt = $.filter((ut) => jc(
      O ? ut.items : [ut.items[0]],
      B
    ));
    if (tt.length > 1) throw new Error("Selected item is not unique");
    return tt.length === 0 ? [] : tt[0].occurrences;
  }, [B, O, $]);
  return /* @__PURE__ */ a("div", { id: l, className: "pr-twp tw:h-full tw:overflow-auto", children: /* @__PURE__ */ u("div", { className: "tw:flex tw:h-full tw:w-full tw:min-w-min tw:flex-col", children: [
    /* @__PURE__ */ u("div", { className: "tw:flex tw:items-stretch", style: { contain: "inline-size" }, children: [
      /* @__PURE__ */ u(
        Er,
        {
          onValueChange: (tt) => wt(tt),
          defaultValue: D,
          children: [
            /* @__PURE__ */ a(Sr, { className: "tw:m-1 tw:w-auto tw:flex-1", children: /* @__PURE__ */ a(Tr, { placeholder: "Select filter" }) }),
            /* @__PURE__ */ u(Rr, { children: [
              /* @__PURE__ */ a(ve, { value: "all", children: f }),
              /* @__PURE__ */ a(ve, { value: "approved", children: b }),
              /* @__PURE__ */ a(ve, { value: "unapproved", children: x }),
              /* @__PURE__ */ a(ve, { value: "unknown", children: g })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ u(Er, { onValueChange: (tt) => at(tt), defaultValue: i, children: [
        /* @__PURE__ */ a(Sr, { className: "tw:m-1 tw:w-auto tw:flex-1", children: /* @__PURE__ */ a(Tr, { placeholder: "Select scope" }) }),
        /* @__PURE__ */ u(Rr, { children: [
          /* @__PURE__ */ a(ve, { value: "book", children: C }),
          /* @__PURE__ */ a(ve, { value: "chapter", children: E }),
          /* @__PURE__ */ a(ve, { value: "verse", children: S })
        ] })
      ] }),
      /* @__PURE__ */ a(
        Ia,
        {
          className: "tw:m-1 tw:flex-1 tw:rounded-md tw:border",
          placeholder: y,
          value: Y,
          onChange: (tt) => {
            X(tt.target.value);
          }
        }
      ),
      o && /* @__PURE__ */ a(At, { children: /* @__PURE__ */ u(_t, { children: [
        /* @__PURE__ */ a(Nt, { asChild: !0, children: /* @__PURE__ */ u("div", { className: "tw:m-1 tw:flex tw:w-fit tw:min-w-[26px] tw:items-center tw:rounded-md tw:border", children: [
          /* @__PURE__ */ a(
            ss,
            {
              className: "tw:m-1 tw:shrink-0",
              checked: O,
              onCheckedChange: (tt) => {
                M(tt);
              }
            }
          ),
          /* @__PURE__ */ a(Pt, { className: "tw:m-1 tw:truncate", children: (o == null ? void 0 : o.checkboxText) ?? z })
        ] }) }),
        /* @__PURE__ */ a(Ct, { children: (o == null ? void 0 : o.checkboxText) ?? z })
      ] }) })
    ] }),
    /* @__PURE__ */ a("div", { className: "tw:m-1 tw:flex-1 tw:overflow-auto tw:rounded-md tw:border", children: /* @__PURE__ */ a(
      pu,
      {
        columns: Q,
        data: q,
        onRowClickHandler: j,
        stickyHeader: !0,
        isLoading: w,
        noResultsMessage: T
      }
    ) }),
    ct.length > 0 && /* @__PURE__ */ a("div", { className: "tw:m-1 tw:flex-1 tw:overflow-auto tw:rounded-md tw:border", children: /* @__PURE__ */ a(
      ju,
      {
        classNameForText: p,
        occurrenceData: ct,
        setScriptureReference: e,
        localizedStrings: r
      }
    ) })
  ] }) });
}
const Wu = "16rem", Yu = "3rem", cs = te.createContext(void 0);
function La() {
  const t = te.useContext(cs);
  if (!t)
    throw new Error("useSidebar must be used within a SidebarProvider.");
  return t;
}
function Zu({
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
  const [d, l] = te.useState(t), w = e ?? d, p = te.useCallback(
    (S) => {
      const y = typeof S == "function" ? S(w) : S;
      r ? r(y) : l(y);
    },
    [r, w]
  ), h = te.useCallback(() => p((S) => !S), [p]), f = w ? "expanded" : "collapsed", g = Re() === "ltr" ? i : i === "primary" ? "secondary" : "primary", C = te.useMemo(
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
  ), E = {
    "--sidebar-width": Wu,
    "--sidebar-width-icon": Yu,
    ...n
  };
  return /* @__PURE__ */ a(cs.Provider, { value: C, children: /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "sidebar-wrapper",
      style: E,
      className: v(
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
function Xu({
  // CUSTOM: Removed 'side' prop from Sidebar - it is now read from context (moved to SidebarProvider)
  variant: t = "sidebar",
  collapsible: e = "offcanvas",
  className: r,
  children: o,
  ...n
}) {
  const s = La();
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
            "data-side": s.side,
            className: v(
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
function rg({ className: t, onClick: e, ...r }) {
  const { toggleSidebar: o, side: n } = La();
  return /* @__PURE__ */ u(
    et,
    {
      "data-sidebar": "trigger",
      "data-slot": "sidebar-trigger",
      variant: "ghost",
      size: "icon-sm",
      className: v(t),
      onClick: (s) => {
        e == null || e(s), o();
      },
      ...r,
      children: [
        n === "primary" ? /* @__PURE__ */ a(Zc, {}) : /* @__PURE__ */ a(Xc, {}),
        /* @__PURE__ */ a("span", { className: "tw:sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
}
function ag({ className: t, ...e }) {
  const { toggleSidebar: r } = La();
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
function Ju({ className: t, ...e }) {
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
function og({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    Ia,
    {
      "data-slot": "sidebar-input",
      "data-sidebar": "input",
      className: v("tw:h-8 tw:w-full tw:bg-background tw:shadow-none", t),
      ...e
    }
  );
}
function ng({ className: t, ...e }) {
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
function ig({ className: t, ...e }) {
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
function sg({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    Kr,
    {
      "data-slot": "sidebar-separator",
      "data-sidebar": "separator",
      className: v("tw:mx-2 tw:w-auto tw:bg-sidebar-border", t),
      ...e
    }
  );
}
function Qu({ className: t, ...e }) {
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
function Ln({ className: t, ...e }) {
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
function Bn({
  className: t,
  asChild: e = !1,
  ...r
}) {
  const o = e ? Xr.Root : "div";
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
function cg({
  className: t,
  asChild: e = !1,
  ...r
}) {
  const o = e ? Xr.Root : "button";
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
function Fn({ className: t, ...e }) {
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
function tp({ className: t, ...e }) {
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
function ep({ className: t, ...e }) {
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
const rp = Ti(
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
function ap({
  asChild: t = !1,
  isActive: e = !1,
  variant: r = "default",
  size: o = "default",
  tooltip: n,
  className: s,
  ...i
}) {
  const c = t ? Xr.Root : "button", { state: d } = La(), l = /* @__PURE__ */ a(
    c,
    {
      "data-slot": "sidebar-menu-button",
      "data-sidebar": "menu-button",
      "data-size": o,
      "data-active": e,
      className: v(rp({ variant: r, size: o }), s),
      ...i
    }
  );
  return n ? /* @__PURE__ */ u(_t, { children: [
    /* @__PURE__ */ a(Nt, { asChild: !0, children: l }),
    /* @__PURE__ */ a(
      Ct,
      {
        side: "right",
        align: "center",
        hidden: d !== "collapsed",
        ...typeof n == "string" ? { children: n } : n
      }
    )
  ] }) : l;
}
function lg({
  className: t,
  asChild: e = !1,
  showOnHover: r = !1,
  ...o
}) {
  const n = e ? Xr.Root : "button";
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
function dg({ className: t, ...e }) {
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
function wg({
  className: t,
  showIcon: e = !1,
  ...r
}) {
  const [o] = te.useState(() => `${Math.floor(Math.random() * 40) + 50}%`), n = { "--skeleton-width": o };
  return /* @__PURE__ */ u(
    "div",
    {
      "data-slot": "sidebar-menu-skeleton",
      "data-sidebar": "menu-skeleton",
      className: v("tw:flex tw:h-8 tw:items-center tw:gap-2 tw:rounded-md tw:px-2", t),
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
function ug({ className: t, ...e }) {
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
function pg({ className: t, ...e }) {
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
function hg({
  asChild: t = !1,
  size: e = "md",
  isActive: r = !1,
  className: o,
  ...n
}) {
  const s = t ? Xr.Root : "a";
  return /* @__PURE__ */ a(
    s,
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
function op({
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
  const p = L(
    (g, C) => {
      o(g, C);
    },
    [o]
  ), h = L(
    (g) => {
      const C = r.find((E) => E.projectId === g);
      return C ? C.projectName : g;
    },
    [r]
  ), f = V(
    () => r.map((g) => ({
      id: g.projectId,
      shortName: g.projectName,
      fullName: g.projectFullName
    })),
    [r]
  ), b = V(() => {
    const g = {
      buttonPlaceholder: c,
      ariaLabel: i
    };
    return d && (g.searchPlaceholder = d), l && (g.commandEmptyMessage = l), g;
  }, [c, i, d, l]), x = L(
    (g) => !n.projectId && g === n.label,
    [n]
  );
  return /* @__PURE__ */ a(
    Xu,
    {
      id: t,
      collapsible: "none",
      variant: "inset",
      className: v("tw:w-96 tw:gap-2 tw:overflow-y-auto", w),
      children: /* @__PURE__ */ u(Qu, { children: [
        /* @__PURE__ */ u(Ln, { children: [
          /* @__PURE__ */ a(Bn, { className: "tw:text-sm", children: s }),
          /* @__PURE__ */ a(Fn, { children: /* @__PURE__ */ a(tp, { children: Object.entries(e).map(([g, C]) => /* @__PURE__ */ a(ep, { children: /* @__PURE__ */ a(
            ap,
            {
              onClick: () => p(g),
              isActive: x(g),
              children: /* @__PURE__ */ a("span", { className: "tw:pl-3", children: C })
            }
          ) }, g)) }) })
        ] }),
        /* @__PURE__ */ u(Ln, { children: [
          /* @__PURE__ */ a(Bn, { className: "tw:text-sm", children: i }),
          /* @__PURE__ */ a(Fn, { className: "tw:pl-3", children: /* @__PURE__ */ u(
            "div",
            {
              className: v(
                "tw:flex tw:w-full tw:items-center tw:gap-2 tw:rounded-md tw:px-2 tw:py-1",
                {
                  "tw:bg-sidebar-accent tw:text-sidebar-accent-foreground": n == null ? void 0 : n.projectId
                }
              ),
              children: [
                /* @__PURE__ */ a(Ec, { className: "tw:h-4 tw:w-4 tw:shrink-0" }),
                /* @__PURE__ */ a(
                  Bs,
                  {
                    mode: "project",
                    projects: f,
                    openTabs: [],
                    selection: { projectId: (n == null ? void 0 : n.projectId) ?? "" },
                    onChangeSelection: ({ projectId: g }) => {
                      if (!g) return;
                      const C = h(g);
                      p(C, g);
                    },
                    buttonVariant: "ghost",
                    buttonClassName: "tw:h-8 tw:w-full tw:flex-1 tw:justify-start tw:font-normal",
                    localizedStrings: b,
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
function gg({
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
      Xn,
      {
        className: "tw:w-9/12",
        value: r,
        onSearch: o,
        placeholder: "Search app settings, extension settings, and project settings"
      }
    ) }),
    /* @__PURE__ */ u(
      Zu,
      {
        id: t,
        className: "tw:h-full tw:flex-1 tw:gap-4 tw:overflow-auto tw:border-t",
        children: [
          /* @__PURE__ */ a(
            op,
            {
              className: v("tw:w-1/2 tw:min-w-[140px] tw:max-w-[220px] tw:border-e", n),
              ...s
            }
          ),
          /* @__PURE__ */ a(Ju, { className: "tw:min-w-[215px]", children: e })
        ]
      }
    )
  ] });
}
const He = "scrBook", np = "scrRef", nr = "source", ip = "details", sp = "Scripture Reference", cp = "Scripture Book", ls = "Type", lp = "Details";
function dp(t, e) {
  const r = e ?? !1;
  return [
    {
      accessorFn: (o) => `${o.start.book} ${o.start.chapterNum}:${o.start.verseNum}`,
      id: He,
      header: (t == null ? void 0 : t.scriptureReferenceColumnName) ?? sp,
      cell: (o) => {
        const n = o.row.original;
        return o.row.getIsGrouped() ? Kt.bookIdToEnglishName(n.start.book) : o.row.groupingColumnId === He ? $e(n.start) : void 0;
      },
      getGroupingValue: (o) => Kt.bookIdToNumber(o.start.book),
      sortingFn: (o, n) => ka(o.original.start, n.original.start),
      enableGrouping: !0
    },
    {
      accessorFn: (o) => $e(o.start),
      id: np,
      header: void 0,
      cell: (o) => {
        const n = o.row.original;
        return o.row.getIsGrouped() ? void 0 : $e(n.start);
      },
      sortingFn: (o, n) => ka(o.original.start, n.original.start),
      enableGrouping: !1
    },
    {
      accessorFn: (o) => o.source.displayName,
      id: nr,
      header: r ? (t == null ? void 0 : t.typeColumnName) ?? ls : void 0,
      cell: (o) => r || o.row.getIsGrouped() ? o.getValue() : void 0,
      getGroupingValue: (o) => o.source.id,
      sortingFn: (o, n) => o.original.source.displayName.localeCompare(n.original.source.displayName),
      enableGrouping: !0
    },
    {
      accessorFn: (o) => o.detail,
      id: ip,
      header: (t == null ? void 0 : t.detailsColumnName) ?? lp,
      cell: (o) => o.getValue(),
      enableGrouping: !1
    }
  ];
}
const wp = (t) => {
  if (!("offset" in t.start))
    throw new Error("No offset available in range start");
  if (t.end && !("offset" in t.end))
    throw new Error("No offset available in range end");
  const { offset: e } = t.start;
  let r = 0;
  return t.end && ({ offset: r } = t.end), !t.end || ka(t.start, t.end) === 0 ? `${qa(t.start)}+${e}` : `${qa(t.start)}+${e}-${qa(t.end)}+${r}`;
}, jn = (t) => `${wp({ start: t.start, end: t.end })} ${t.source.displayName} ${t.detail}`;
function fg({
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
  const [l, w] = _([]), [p, h] = _([{ id: He, desc: !1 }]), [f, b] = _({}), x = V(
    () => t.flatMap((D) => D.data.map((I) => ({
      ...I,
      source: D.source
    }))),
    [t]
  ), g = V(
    () => dp(
      {
        scriptureReferenceColumnName: o,
        typeColumnName: s,
        detailsColumnName: i
      },
      r
    ),
    [o, s, i, r]
  );
  J(() => {
    l.includes(nr) ? h([
      { id: nr, desc: !1 },
      { id: He, desc: !1 }
    ]) : h([{ id: He, desc: !1 }]);
  }, [l]);
  const C = Ni({
    data: x,
    columns: g,
    state: {
      grouping: l,
      sorting: p,
      rowSelection: f
    },
    onGroupingChange: w,
    onSortingChange: h,
    onRowSelectionChange: b,
    getExpandedRowModel: ed(),
    getGroupedRowModel: td(),
    getCoreRowModel: Ei(),
    getSortedRowModel: Ci(),
    getRowId: jn,
    autoResetExpanded: !1,
    enableMultiRowSelection: !1,
    enableSubRowSelection: !1
  });
  J(() => {
    if (c) {
      const D = C.getSelectedRowModel().rowsById, I = Object.keys(D);
      if (I.length === 1) {
        const Y = x.find((X) => jn(X) === I[0]) || void 0;
        Y && c(Y);
      }
    }
  }, [f, x, c, C]);
  const E = n ?? cp, S = s ?? ls, y = [
    { label: "No Grouping", value: [] },
    { label: `Group by ${E}`, value: [He] },
    { label: `Group by ${S}`, value: [nr] },
    {
      label: `Group by ${E} and ${S}`,
      value: [He, nr]
    },
    {
      label: `Group by ${S} and ${E}`,
      value: [nr, He]
    }
  ], z = (D) => {
    w(JSON.parse(D));
  }, T = (D, I) => {
    !D.getIsGrouped() && !D.getIsSelected() && D.getToggleSelectedHandler()(I);
  }, O = (D, I) => D.getIsGrouped() ? "" : v("banded-row", I % 2 === 0 ? "even" : "odd"), M = (D, I, Y) => {
    if (!((D == null ? void 0 : D.length) === 0 || I.depth < Y.column.getGroupedIndex())) {
      if (I.getIsGrouped())
        switch (I.depth) {
          case 1:
            return "tw:ps-4";
          default:
            return;
        }
      switch (I.depth) {
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
        onValueChange: (D) => {
          z(D);
        },
        children: [
          /* @__PURE__ */ a(Sr, { className: "tw:mb-1 tw:mt-2", children: /* @__PURE__ */ a(Tr, {}) }),
          /* @__PURE__ */ a(Rr, { position: "item-aligned", children: /* @__PURE__ */ a(lu, { children: y.map((D) => /* @__PURE__ */ a(ve, { value: JSON.stringify(D.value), children: D.label }, D.label)) }) })
        ]
      }
    ),
    /* @__PURE__ */ u(Ro, { className: "tw:relative tw:flex tw:flex-col tw:overflow-y-auto tw:p-0", children: [
      e && /* @__PURE__ */ a(Do, { children: C.getHeaderGroups().map((D) => /* @__PURE__ */ a(We, { children: D.headers.filter((I) => I.column.columnDef.header).map((I) => (
        /* For sticky column headers to work, we probably need to change the default definition of the shadcn Table component. See https://github.com/shadcn-ui/ui/issues/1151 */
        /* @__PURE__ */ a(ya, { colSpan: I.colSpan, className: "tw:sticky top-0", children: I.isPlaceholder ? void 0 : /* @__PURE__ */ u("div", { children: [
          I.column.getCanGroup() ? /* @__PURE__ */ a(
            et,
            {
              variant: "ghost",
              title: `Toggle grouping by ${I.column.columnDef.header}`,
              onClick: I.column.getToggleGroupingHandler(),
              type: "button",
              children: I.column.getIsGrouped() ? "🛑" : "👊 "
            }
          ) : void 0,
          " ",
          Br(I.column.columnDef.header, I.getContext())
        ] }) }, I.id)
      )) }, D.id)) }),
      /* @__PURE__ */ a(Oo, { children: C.getRowModel().rows.map((D, I) => {
        const Y = Re();
        return /* @__PURE__ */ a(
          We,
          {
            "data-state": D.getIsSelected() ? "selected" : "",
            className: v(O(D, I)),
            onClick: (X) => T(D, X),
            children: D.getVisibleCells().map((X) => {
              if (!(X.getIsPlaceholder() || X.column.columnDef.enableGrouping && !X.getIsGrouped() && (X.column.columnDef.id !== nr || !r)))
                return /* @__PURE__ */ a(
                  kr,
                  {
                    className: v(
                      X.column.columnDef.id,
                      "tw:p-[1px]",
                      M(l, D, X)
                    ),
                    children: X.getIsGrouped() ? /* @__PURE__ */ u(
                      et,
                      {
                        variant: "link",
                        onClick: D.getToggleExpandedHandler(),
                        type: "button",
                        children: [
                          D.getIsExpanded() && /* @__PURE__ */ a(sr, {}),
                          !D.getIsExpanded() && (Y === "ltr" ? /* @__PURE__ */ a(Tc, {}) : /* @__PURE__ */ a(Sc, {})),
                          " ",
                          Br(X.column.columnDef.cell, X.getContext()),
                          " (",
                          D.subRows.length,
                          ")"
                        ]
                      }
                    ) : Br(X.column.columnDef.cell, X.getContext())
                  },
                  X.id
                );
            })
          },
          D.id
        );
      }) })
    ] })
  ] });
}
function up({
  availableBookInfo: t,
  selectedBookIds: e,
  onChangeSelectedBookIds: r,
  localizedStrings: o,
  localizedBookNames: n,
  disabledSectionExplanations: s
}) {
  const i = o["%webView_book_selector_books_selected%"], c = o["%webView_book_selector_select_books%"], d = o["%webView_book_selector_search_books%"], l = o["%webView_book_selector_select_all%"], w = o["%webView_book_selector_clear_all%"], p = o["%webView_book_selector_no_book_found%"], { otLong: h, ntLong: f, dcLong: b, extraLong: x } = {
    otLong: o == null ? void 0 : o["%scripture_section_ot_long%"],
    ntLong: o == null ? void 0 : o["%scripture_section_nt_long%"],
    dcLong: o == null ? void 0 : o["%scripture_section_dc_long%"],
    extraLong: o == null ? void 0 : o["%scripture_section_extra_long%"]
  }, [g, C] = _(!1), [E, S] = _(""), y = A(void 0), z = A(!1), T = V(
    () => Jn(t),
    [t]
  ), O = V(() => {
    if (!E.trim()) {
      const $ = {
        [zt.OT]: [],
        [zt.NT]: [],
        [zt.DC]: [],
        [zt.Extra]: []
      };
      return T.forEach((q) => {
        const Q = ua(q);
        $[Q].push(q);
      }), $;
    }
    const k = T.filter(
      ($) => Co($, E, n)
    ), ot = {
      [zt.OT]: [],
      [zt.NT]: [],
      [zt.DC]: [],
      [zt.Extra]: []
    };
    return k.forEach(($) => {
      const q = ua($);
      ot[q].push($);
    }), ot;
  }, [T, E, n]), M = L(
    (k, ot = !1) => {
      if (!ot || !y.current) {
        r(
          e.includes(k) ? e.filter((wt) => wt !== k) : [...e, k]
        ), y.current = k;
        return;
      }
      const $ = T.findIndex((wt) => wt === y.current), q = T.findIndex((wt) => wt === k);
      if ($ === -1 || q === -1) return;
      const [Q, j] = [
        Math.min($, q),
        Math.max($, q)
      ], at = T.slice(Q, j + 1).map((wt) => wt);
      r(
        e.includes(k) ? e.filter((wt) => !at.includes(wt)) : [.../* @__PURE__ */ new Set([...e, ...at])]
      );
    },
    [e, r, T]
  ), D = (k) => {
    M(k, z.current), z.current = !1;
  }, I = (k, ot) => {
    k.preventDefault(), M(ot, k.shiftKey);
  }, Y = () => {
    r(T.map((k) => k));
  }, X = () => {
    r([]);
  }, B = V(
    () => Object.values(zt).filter(
      (k) => (s == null ? void 0 : s[k]) !== void 0 && Mo(T, k).length === 0
    ).map((k) => ({ section: k, explanation: s == null ? void 0 : s[k] })),
    [s, T]
  );
  return /* @__PURE__ */ u(
    lr,
    {
      open: g,
      onOpenChange: (k) => {
        C(k), k || S("");
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
              /* @__PURE__ */ a(Rc, { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
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
                  k.key === "Enter" && (z.current = k.shiftKey);
                },
                children: [
                  /* @__PURE__ */ a(
                    Da,
                    {
                      className: "tw:shrink-0",
                      placeholder: d,
                      value: E,
                      onValueChange: S,
                      spaceSelectsHighlightedItem: !0
                    }
                  ),
                  /* @__PURE__ */ u("div", { className: "tw:flex tw:shrink-0 tw:justify-between tw:border-b tw:p-2", children: [
                    /* @__PURE__ */ a(
                      et,
                      {
                        variant: "ghost",
                        size: "sm",
                        onClick: Y,
                        disabled: T.length === 0,
                        children: l
                      }
                    ),
                    /* @__PURE__ */ a(et, { variant: "ghost", size: "sm", onClick: X, children: w })
                  ] }),
                  /* @__PURE__ */ u(ur, { className: "tw:max-h-72 tw:min-h-0 tw:flex-1", children: [
                    /* @__PURE__ */ a(Ma, { children: p }),
                    Object.values(zt).filter((k) => O[k].length > 0).map((k, ot) => {
                      const $ = O[k];
                      return /* @__PURE__ */ u(Yr, { children: [
                        ot > 0 && /* @__PURE__ */ a(Zn, { alwaysRender: !0 }),
                        /* @__PURE__ */ a(
                          Xe,
                          {
                            heading: qn(k, h, f, b, x),
                            children: $.map((q) => /* @__PURE__ */ a(
                              Si,
                              {
                                bookId: q,
                                isSelected: e.includes(q),
                                onSelect: () => D(q),
                                onMouseDown: (Q) => I(Q, q),
                                section: ua(q),
                                showCheck: !0,
                                localizedBookNames: n,
                                commandValue: mo(q, n),
                                className: "tw:flex tw:items-center"
                              },
                              q
                            ))
                          }
                        )
                      ] }, k);
                    })
                  ] }),
                  B.length > 0 && /* @__PURE__ */ a("div", { className: "tw:shrink-0 tw:border-t tw:p-2", children: B.map(({ section: k, explanation: ot }) => /* @__PURE__ */ a("p", { className: "tw:text-xs tw:text-muted-foreground", children: ot }, k)) })
                ]
              }
            )
          }
        )
      ]
    }
  );
}
function pp({
  disabled: t,
  tooltipText: e,
  children: r,
  className: o
}) {
  return /* @__PURE__ */ a(At, { children: /* @__PURE__ */ u(_t, { children: [
    /* @__PURE__ */ a(Nt, { asChild: !0, children: /* @__PURE__ */ a(
      Gr,
      {
        className: o,
        isDisabled: t,
        disabledExplanation: e,
        children: r
      }
    ) }),
    t && /* @__PURE__ */ a(Ct, { children: /* @__PURE__ */ a("p", { className: "tw:max-w-xs tw:whitespace-pre-line", children: e }) })
  ] }) });
}
function hp({
  section: t,
  availableBookIds: e,
  selectedBookIds: r,
  onToggle: o,
  localizedStrings: n,
  disabledExplanation: s
}) {
  const i = Mo(e, t).length === 0, c = n["%scripture_section_ot_short%"], d = n["%scripture_section_nt_short%"], l = n["%scripture_section_dc_short%"], w = n["%scripture_section_extra_short%"], p = /* @__PURE__ */ a(
    et,
    {
      variant: "outline",
      size: "sm",
      onClick: () => o(t),
      className: v(
        Qn(e, t, r) && !i && "tw:bg-primary tw:text-primary-foreground tw:hover:bg-primary/70 tw:hover:text-primary-foreground"
      ),
      disabled: i,
      children: Fs(
        t,
        c,
        d,
        l,
        w
      )
    }
  );
  return s ? /* @__PURE__ */ a(
    pp,
    {
      className: "tw:flex",
      disabled: i,
      tooltipText: s,
      children: p
    }
  ) : p;
}
const Un = 5, no = 6;
function gp({
  availableBookInfo: t,
  selectedBookIds: e,
  onChangeSelectedBookIds: r,
  localizedStrings: o,
  localizedBookNames: n,
  disabledSectionExplanations: s
}) {
  const i = o["%webView_book_selector_more%"], c = V(
    () => Jn(t),
    [t]
  ), d = L(
    (l) => {
      const w = Mo(c, l).map((p) => p);
      r(
        Qn(c, l, e) ? e.filter((p) => !w.includes(p)) : [.../* @__PURE__ */ new Set([...e, ...w])]
      );
    },
    [e, r, c]
  );
  return /* @__PURE__ */ u("div", { className: "tw:space-y-2", children: [
    /* @__PURE__ */ a("div", { className: "tw:flex tw:flex-wrap tw:gap-2", children: Object.values(zt).map((l) => /* @__PURE__ */ a(
      hp,
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
      up,
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
        e.length === no ? no : Un
      ).map((l) => /* @__PURE__ */ a(Ur, { className: "tw:hover:bg-secondary", variant: "secondary", children: Ae(l, n) }, l)),
      e.length > no && /* @__PURE__ */ a(
        Ur,
        {
          className: "tw:hover:bg-secondary",
          variant: "secondary",
          children: `+${e.length - Un} ${i}`
        }
      )
    ] })
  ] });
}
const fp = Object.freeze([
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
]), mg = Object.freeze([
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
  ...fp
]), Ut = (t, e) => t[e] ?? e, mp = Object.freeze([" ", "-"]);
function vg({
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
  onRangeStartChange: b,
  onRangeEndChange: x,
  currentScrRef: g,
  onCurrentScrRefChange: C,
  bookChapterControlLocalizedStrings: E,
  getEndVerse: S,
  hideLabel: y = !1,
  buttonClassName: z
}) {
  const T = Ut(
    i,
    "%webView_scope_selector_selected_text%"
  ), O = Ut(i, "%webView_scope_selector_verse%"), M = Ut(i, "%webView_scope_selector_chapter%"), D = Ut(i, "%webView_scope_selector_book%"), I = Ut(
    i,
    "%webView_scope_selector_current_verse%"
  ), Y = Ut(
    i,
    "%webView_scope_selector_current_chapter%"
  ), X = Ut(i, "%webView_scope_selector_current_book%"), B = Ut(i, "%webView_scope_selector_choose_books%"), k = Ut(i, "%webView_scope_selector_scope%"), ot = Ut(i, "%webView_scope_selector_select_books%"), $ = Ut(i, "%webView_scope_selector_range%"), q = Ut(i, "%webView_scope_selector_select_range%"), Q = Ut(i, "%webView_scope_selector_range_start%"), j = Ut(i, "%webView_scope_selector_range_end%"), at = Ut(i, "%webView_scope_selector_ok%"), wt = Ut(i, "%webView_scope_selector_cancel%"), ct = Ut(i, "%webView_scope_selector_navigate%"), tt = (K) => {
    if (!g) return;
    const rt = g.book.toUpperCase();
    switch (K) {
      case "verse":
        return $e(g, "id");
      case "chapter":
        return `${rt} ${g.chapterNum}`;
      case "book":
        return rt;
      default:
        return;
    }
  }, ut = [
    { value: "selectedText", label: T, id: "scope-selected-text" },
    {
      value: "verse",
      label: O,
      dropdownLabel: I,
      scrRefSuffix: tt("verse"),
      id: "scope-verse"
    },
    {
      value: "chapter",
      label: M,
      dropdownLabel: Y,
      scrRefSuffix: tt("chapter"),
      id: "scope-chapter"
    },
    {
      value: "book",
      label: D,
      dropdownLabel: X,
      scrRefSuffix: tt("book"),
      id: "scope-book"
    },
    { value: "selectedBooks", label: B, id: "scope-selected" },
    { value: "range", label: $, id: "scope-range" }
  ], xt = (K, rt, Vt = !1) => /* @__PURE__ */ u(ft, { children: [
    K,
    rt && !Vt && /* @__PURE__ */ u("span", { className: "tw:text-muted-foreground", children: [
      ": ",
      rt
    ] })
  ] }), gt = e ? ut.filter((K) => e.includes(K.value)) : ut, yt = g ?? Ga, St = h ?? yt, Gt = f ?? yt, $t = () => {
  }, ie = A(null), Rt = A(null), Et = A(!1), Bt = A(null), ce = A(!1), [le, Mt] = _(void 0), Dt = A(!1), de = A(!1), xe = A(null), ge = L((K) => {
    if (K) {
      Mt("start"), Dt.current = !1;
      return;
    }
    Mt((rt) => rt === "start" ? void 0 : rt), Dt.current && (Dt.current = !1, requestAnimationFrame(() => {
      var Vt;
      const rt = (Vt = ie.current) == null ? void 0 : Vt.querySelector("button");
      rt == null || rt.click();
    }));
  }, []), ye = L((K) => {
    if (K) {
      Mt("end"), de.current = !1;
      return;
    }
    Mt((rt) => rt === "end" ? void 0 : rt);
  }, []), Zt = L(
    (K) => {
      b == null || b(K), x == null || x(K), Dt.current = !0;
    },
    [b, x]
  ), Wt = L(
    (K) => {
      x == null || x(K), de.current = !0;
    },
    [x]
  ), Ft = L(
    (K) => {
      r(K), K === "selectedBooks" && n.length === 0 && (g != null && g.book) && s([g.book]);
    },
    [r, n, g, s]
  ), re = gt.find((K) => K.value === t), Me = () => t === "selectedBooks" && n.length > 0 ? n.map((K) => K.toUpperCase()).join(", ") : t === "range" ? Uc(St, Gt, {
    optionOrLocalizedBookName: "id",
    endRefOptionOrLocalizedBookName: "id",
    repeatBookName: !0
  }) : re ? xt(re.label, re.scrRefSuffix) : t, P = gt.filter(
    (K) => K.value !== "selectedBooks" && K.value !== "range"
  ), N = gt.find((K) => K.value === "selectedBooks"), F = gt.find((K) => K.value === "range"), [G, U] = _(!1), [Z, H] = _(void 0), [nt, kt] = _(void 0), [mt, bt] = _(void 0), [ht, lt] = _(void 0), [It, Ie] = _([]), ke = p === "dropdown" && Z === "selectedBooks", rr = /* @__PURE__ */ a(
    gp,
    {
      availableBookInfo: o,
      selectedBookIds: ke ? It : n,
      onChangeSelectedBookIds: ke ? Ie : s,
      localizedStrings: i,
      localizedBookNames: c,
      disabledSectionExplanations: d
    }
  ), ar = le === "end", Ue = le === "start", ze = "tw:text-muted-foreground", _e = p === "dropdown" && Z === "range", hr = _e ? bt : Zt, gr = _e ? lt : x ? Wt : $t, R = /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-wrap tw:items-end tw:gap-4", children: [
    /* @__PURE__ */ u("div", { className: "tw:grid tw:gap-2", children: [
      /* @__PURE__ */ a(Pt, { htmlFor: "scope-range-start", className: v(ar && ze), children: Q }),
      /* @__PURE__ */ a(
        Ya,
        {
          id: "scope-range-start",
          scrRef: _e ? mt ?? St : St,
          handleSubmit: hr,
          localizedBookNames: c,
          localizedStrings: E,
          getEndVerse: S,
          submitKeys: mp,
          onOpenChange: ge,
          className: v(ar && ze),
          modal: !0
        }
      )
    ] }),
    /* @__PURE__ */ u("div", { ref: ie, className: "tw:grid tw:gap-2", children: [
      /* @__PURE__ */ a(Pt, { htmlFor: "scope-range-end", className: v(Ue && ze), children: j }),
      /* @__PURE__ */ a(
        Ya,
        {
          id: "scope-range-end",
          scrRef: _e ? ht ?? Gt : Gt,
          handleSubmit: gr,
          localizedBookNames: c,
          localizedStrings: E,
          getEndVerse: S,
          disableReferencesUpTo: _e ? mt ?? St : St,
          onOpenChange: ye,
          onCloseAutoFocus: (K) => {
            var rt;
            de.current && (de.current = !1, K.preventDefault(), (rt = xe.current) == null || rt.focus());
          },
          className: v(Ue && ze),
          modal: !0,
          align: "start"
        }
      )
    ] })
  ] }), it = A({}), dt = L(
    (K) => (rt) => {
      it.current[K] = rt;
    },
    []
  ), Ot = A(null);
  J(() => {
    if (!G) return;
    let K = 0;
    const rt = requestAnimationFrame(() => {
      K = requestAnimationFrame(() => {
        var Vt;
        (Vt = it.current[t]) == null || Vt.focus();
      });
    });
    return () => {
      cancelAnimationFrame(rt), K && cancelAnimationFrame(K);
    };
  }, [G, t]);
  const [Ke, Ba] = _(null), [Pe, fr] = _(null), [mr, Fa] = _(null), Qr = 200, [ja, ta] = _(!1);
  J(() => {
    if (!mr || typeof ResizeObserver > "u") return;
    const K = new ResizeObserver(([rt]) => {
      ta(rt.contentRect.width < Qr);
    });
    return K.observe(mr), () => K.disconnect();
  }, [mr]);
  const ea = L(
    (K) => {
      kt(K), bt(St), lt(Gt), Ie(n), U(!1), H(K);
    },
    [St, Gt, n]
  ), ra = L(() => {
    nt !== void 0 && (nt === "range" ? (mt && (b == null || b(mt)), ht && (x == null || x(ht))) : nt === "selectedBooks" && s(It), Ft(nt), H(void 0), kt(void 0));
  }, [
    nt,
    mt,
    ht,
    It,
    b,
    x,
    s,
    Ft
  ]), vr = L((K) => {
    K || (H(void 0), kt(void 0));
  }, []), aa = L((K) => {
    var rt;
    K.preventDefault(), (rt = Ot.current) == null || rt.focus();
  }, []), oa = (K) => t === K ? /* @__PURE__ */ a("span", { className: "tw:absolute tw:flex tw:h-3.5 tw:w-3.5 tw:items-center tw:justify-center tw:ltr:left-2 tw:rtl:right-2", children: /* @__PURE__ */ a(Je, { className: "tw:h-4 tw:w-4" }) }) : void 0;
  return /* @__PURE__ */ u("div", { id: w, className: "tw:grid tw:gap-4", children: [
    /* @__PURE__ */ u("div", { className: "tw:grid tw:gap-2", children: [
      !y && /* @__PURE__ */ a(Pt, { children: k }),
      p === "dropdown" ? /* @__PURE__ */ u(Be, { open: G, onOpenChange: U, children: [
        /* @__PURE__ */ a(Ee, { asChild: !0, children: /* @__PURE__ */ u(
          et,
          {
            ref: Ot,
            variant: "outline",
            role: "combobox",
            className: v(
              "tw:w-full tw:justify-between tw:overflow-hidden tw:font-normal",
              z
            ),
            children: [
              /* @__PURE__ */ a("span", { className: "tw:min-w-0 tw:flex-1 tw:truncate tw:text-start", children: Me() }),
              /* @__PURE__ */ a(sr, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
            ]
          }
        ) }),
        /* @__PURE__ */ a(
          Fe,
          {
            ref: Fa,
            className: "tw:w-[var(--radix-dropdown-menu-trigger-width)] tw:min-w-[12rem]",
            align: "start",
            children: /* @__PURE__ */ u(Ka, { container: mr, children: [
              P.map(({ value: K, label: rt, dropdownLabel: Vt, scrRefSuffix: we, id: fe }) => {
                const m = l == null ? void 0 : l[K];
                return /* @__PURE__ */ u(
                  Ge,
                  {
                    ref: dt(K),
                    disabled: !!m,
                    className: "tw:relative tw:ps-8 data-[highlighted]:tw:bg-accent data-[highlighted]:tw:text-accent-foreground",
                    onSelect: () => Ft(K),
                    "data-selected": t === K ? "true" : void 0,
                    children: [
                      t === K && /* @__PURE__ */ a("span", { className: "tw:absolute tw:flex tw:h-3.5 tw:w-3.5 tw:items-center tw:justify-center tw:ltr:left-2 tw:rtl:right-2", children: /* @__PURE__ */ a(Je, { className: "tw:h-4 tw:w-4" }) }),
                      /* @__PURE__ */ u("span", { className: "tw:flex tw:min-w-0 tw:flex-col tw:gap-0.5", children: [
                        /* @__PURE__ */ a("span", { className: "tw:flex tw:items-center tw:gap-1.5", children: xt(Vt ?? rt, we, ja) }),
                        m && /* @__PURE__ */ a("span", { className: "tw:text-xs tw:whitespace-normal tw:text-foreground", children: m })
                      ] })
                    ]
                  },
                  fe
                );
              }),
              (N || F) && /* @__PURE__ */ a(ir, {}),
              N && /* @__PURE__ */ u(
                Ge,
                {
                  ref: dt("selectedBooks"),
                  className: v(
                    "tw:relative tw:ps-8",
                    "data-[highlighted]:tw:bg-accent data-[highlighted]:tw:text-accent-foreground"
                  ),
                  onSelect: () => ea("selectedBooks"),
                  "data-selected": t === "selectedBooks" ? "true" : void 0,
                  children: [
                    oa("selectedBooks"),
                    `${N.label}…`
                  ]
                }
              ),
              F && /* @__PURE__ */ u(
                Ge,
                {
                  ref: dt("range"),
                  className: v(
                    "tw:relative tw:ps-8",
                    "data-[highlighted]:tw:bg-accent data-[highlighted]:tw:text-accent-foreground"
                  ),
                  onSelect: () => ea("range"),
                  "data-selected": t === "range" ? "true" : void 0,
                  children: [
                    oa("range"),
                    `${F.label}…`
                  ]
                }
              ),
              C && /* @__PURE__ */ u(ft, { children: [
                /* @__PURE__ */ a(ir, {}),
                /* @__PURE__ */ a(cr, { className: "tw:px-2 tw:py-1.5 tw:text-xs tw:font-medium tw:text-muted-foreground", children: ct }),
                /* @__PURE__ */ a(
                  Ge,
                  {
                    ref: Bt,
                    className: "tw:p-0",
                    onSelect: (K) => {
                      var rt, Vt;
                      if (K.preventDefault(), Et.current) {
                        Et.current = !1;
                        return;
                      }
                      ce.current || (Vt = (rt = Rt.current) == null ? void 0 : rt.querySelector("button")) == null || Vt.click();
                    },
                    children: /* @__PURE__ */ a(
                      "div",
                      {
                        ref: Rt,
                        className: "tw:w-full tw:px-1 tw:pb-1",
                        onPointerDownCapture: (K) => {
                          const rt = K.target instanceof HTMLElement ? K.target : void 0;
                          rt != null && rt.closest("button") && (Et.current = !0, requestAnimationFrame(() => {
                            Et.current = !1;
                          }));
                        },
                        children: /* @__PURE__ */ a(
                          Ya,
                          {
                            id: "scope-navigate",
                            scrRef: g ?? Ga,
                            handleSubmit: C,
                            localizedBookNames: c,
                            localizedStrings: E,
                            getEndVerse: S,
                            triggerVariant: "ghost",
                            onOpenChange: (K) => {
                              ce.current = K;
                            },
                            onCloseAutoFocus: (K) => {
                              var rt;
                              K.preventDefault(), (rt = Bt.current) == null || rt.focus();
                            },
                            modal: !0,
                            className: "tw:w-full tw:min-w-0 tw:max-w-none tw:justify-between tw:px-2 tw:font-normal",
                            triggerContent: /* @__PURE__ */ u(ft, { children: [
                              /* @__PURE__ */ a("span", { className: "tw:min-w-0 tw:flex-1 tw:truncate tw:text-start", children: $e(g ?? Ga, "id") }),
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
        To,
        {
          value: t,
          onValueChange: Ft,
          className: "tw:flex tw:flex-col tw:space-y-1",
          children: gt.map(({ value: K, label: rt, scrRefSuffix: Vt, id: we }) => {
            const fe = l == null ? void 0 : l[K];
            return /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:gap-0.5", children: [
              /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center", children: [
                /* @__PURE__ */ a(
                  xa,
                  {
                    className: "tw:me-2",
                    value: K,
                    id: we,
                    disabled: !!fe,
                    "aria-describedby": fe ? `${we}-explanation` : void 0
                  }
                ),
                /* @__PURE__ */ a(Pt, { htmlFor: we, children: xt(rt, Vt) })
              ] }),
              fe && // Indented to clear the radio so it reads as belonging to this row's label.
              /* @__PURE__ */ a(
                "span",
                {
                  id: `${we}-explanation`,
                  className: "tw:ms-6 tw:text-xs tw:whitespace-normal tw:text-muted-foreground",
                  children: fe
                }
              )
            ] }, we);
          })
        }
      )
    ] }),
    p === "radio" && t === "selectedBooks" && /* @__PURE__ */ u("div", { className: "tw:grid tw:gap-2", children: [
      /* @__PURE__ */ a(Pt, { children: ot }),
      rr
    ] }),
    p === "radio" && t === "range" && R,
    p === "dropdown" && N && /* @__PURE__ */ a(io, { open: Z === "selectedBooks", onOpenChange: vr, children: /* @__PURE__ */ a(
      so,
      {
        ref: fr,
        onCloseAutoFocus: aa,
        onEscapeKeyDown: (K) => {
          Pe != null && Pe.querySelector('[data-state="open"]') && K.preventDefault();
        },
        children: /* @__PURE__ */ u(Ka, { container: Pe, children: [
          /* @__PURE__ */ a(co, { className: "tw:pe-8", children: /* @__PURE__ */ a(lo, { children: B }) }),
          rr,
          /* @__PURE__ */ u(rn, { children: [
            /* @__PURE__ */ a(et, { variant: "outline", onClick: () => vr(!1), children: wt }),
            /* @__PURE__ */ a(et, { onClick: ra, children: at })
          ] })
        ] })
      }
    ) }),
    p === "dropdown" && F && /* @__PURE__ */ a(io, { open: Z === "range", onOpenChange: vr, children: /* @__PURE__ */ a(
      so,
      {
        ref: Ba,
        onCloseAutoFocus: aa,
        onEscapeKeyDown: (K) => {
          Ke != null && Ke.querySelector('[data-state="open"]') && K.preventDefault();
        },
        children: /* @__PURE__ */ u(Ka, { container: Ke, children: [
          /* @__PURE__ */ a(co, { className: "tw:pe-8", children: /* @__PURE__ */ a(lo, { children: q }) }),
          R,
          /* @__PURE__ */ u(rn, { children: [
            /* @__PURE__ */ a(et, { variant: "outline", onClick: () => vr(!1), children: wt }),
            /* @__PURE__ */ a(et, { ref: xe, onClick: ra, children: at })
          ] })
        ] })
      }
    ) })
  ] });
}
function bg({
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
    ...Ha,
    ...Object.fromEntries(
      Object.entries(o).map(
        ([w, p]) => [
          w,
          w === p && w in Ha ? Ha[w] : p
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
        /* @__PURE__ */ a(Sr, { size: n, className: v("pr-twp tw:w-auto", s), children: /* @__PURE__ */ a(
          Tr,
          {
            placeholder: d[cn(e)] ?? e
          }
        ) }),
        /* @__PURE__ */ a(
          Rr,
          {
            id: i,
            align: l === "rtl" ? "end" : "start",
            style: { zIndex: je },
            children: t.map((w) => /* @__PURE__ */ a(ve, { value: `${w}`, children: d[cn(w)] }, `${w}`))
          }
        )
      ]
    }
  );
}
function xg({ children: t }) {
  return /* @__PURE__ */ a("div", { className: "pr-twp tw:grid", children: t });
}
function yg({
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
function kg({
  primary: t,
  secondary: e,
  includeSeparator: r = !1
}) {
  return /* @__PURE__ */ u("div", { className: "tw:space-y-4 tw:py-2", children: [
    /* @__PURE__ */ u("div", { children: [
      /* @__PURE__ */ a("h3", { className: "tw:text-lg tw:font-medium", children: t }),
      /* @__PURE__ */ a("p", { className: "tw:text-sm tw:text-muted-foreground", children: e })
    ] }),
    r ? /* @__PURE__ */ a(Kr, {}) : ""
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
function vp(t) {
  const e = new Set(t.items.map((o) => o.group)), r = Object.entries(t.groups).filter(
    ([o]) => e.has(o)
  );
  return ws(t.columns).filter(
    ({ columnKey: o }) => r.some(
      ([n, s]) => us(n, s, o)
    )
  ).map(({ columnKey: o, column: n }) => ({ columnKey: o, label: n.label }));
}
function Ra({ icon: t, menuLabel: e, leading: r }) {
  return t ? /* @__PURE__ */ a(
    "img",
    {
      className: v("tw:max-h-5 tw:max-w-5", r ? "tw:me-2" : "tw:ms-2"),
      src: t,
      alt: `${r ? "Leading" : "Trailing"} icon for ${e}`
    }
  ) : void 0;
}
const ps = (t, e, r, o) => r ? Object.entries(t).filter(([s, i]) => us(s, i, r)).sort(([, s], [, i]) => s.order - i.order).flatMap(([s]) => e.filter((c) => c.group === s).sort((c, d) => c.order - d.order).map((c) => /* @__PURE__ */ u(_t, { children: [
  /* @__PURE__ */ a(Nt, { asChild: !0, children: "command" in c ? /* @__PURE__ */ u(
    Ge,
    {
      onClick: () => {
        o(c);
      },
      children: [
        c.iconPathBefore && /* @__PURE__ */ a(Ra, { icon: c.iconPathBefore, menuLabel: c.label, leading: !0 }),
        c.label,
        c.iconPathAfter && /* @__PURE__ */ a(Ra, { icon: c.iconPathAfter, menuLabel: c.label }),
        c.shortcut && /* @__PURE__ */ a(Ks, { children: c.shortcut })
      ]
    },
    `dropdown-menu-item-${c.label}-${c.command}`
  ) : /* @__PURE__ */ u(Hs, { children: [
    /* @__PURE__ */ a(qs, { children: c.label }),
    /* @__PURE__ */ a(Gs, { children: /* @__PURE__ */ a(Ws, { children: ps(
      t,
      e,
      ds(t, c.id),
      o
    ) }) })
  ] }, `dropdown-menu-sub-${c.label}-${c.id}`) }),
  c.tooltip && /* @__PURE__ */ a(Ct, { children: c.tooltip })
] }, `tooltip-${c.label}-${"command" in c ? c.command : c.id}`))) : void 0;
function No({
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
  const l = _a(), w = vp(e), p = s && w.length > 1;
  Oi();
  const h = A(null), f = () => Us(h.current ?? void 0);
  return /* @__PURE__ */ u(Be, { variant: i, children: [
    /* @__PURE__ */ a(Ee, { "aria-label": r, className: n, asChild: !0, id: d, children: /* @__PURE__ */ a(
      et,
      {
        ref: h,
        variant: c,
        size: "icon",
        className: js,
        onKeyDown: f,
        onBlur: f,
        children: o ?? /* @__PURE__ */ a(Dc, {})
      }
    ) }),
    /* @__PURE__ */ a(
      Fe,
      {
        align: "start",
        style: { zIndex: je },
        onCloseAutoFocus: () => {
          Hn() === "pointer" && Ys(h.current ?? void 0);
        },
        children: w.map(({ columnKey: b, label: x }, g) => {
          const C = `${l}-${b}`;
          return /* @__PURE__ */ u(Yr, { children: [
            /* @__PURE__ */ u(Wn, { "aria-labelledby": p ? C : void 0, children: [
              p && /* @__PURE__ */ a(cr, { id: C, children: x }),
              /* @__PURE__ */ a(At, { children: ps(e.groups, e.items, b, t) })
            ] }),
            g < w.length - 1 && /* @__PURE__ */ a(ir, {})
          ] }, b);
        })
      }
    )
  ] });
}
const bp = 8;
function xp(t, e, r) {
  const o = e.findIndex((i) => t >= i), n = o === -1 ? e.length : o;
  if (r === void 0 || n >= r) return n;
  const s = e.findIndex(
    (i) => t >= i + bp
  );
  return s === -1 ? r : Math.min(r, s);
}
function hs(t, e) {
  const [r, o] = _(0), n = A(void 0);
  return Ht(() => {
    if (!t || typeof ResizeObserver > "u") return;
    const s = () => {
      const { width: c } = t.getBoundingClientRect(), d = n.current;
      n.current = c;
      const l = d === void 0 || d === 0;
      o(
        (w) => xp(c, e, l ? void 0 : w)
      );
    };
    s();
    const i = new ResizeObserver(s);
    return i.observe(t), () => i.disconnect();
  }, [t, e]), r;
}
const yp = Object.freeze([520, 420, 340]), gs = te.forwardRef(
  ({ id: t, className: e, children: r }, o) => {
    const [n, s] = _(void 0), i = A(o);
    i.current = o;
    const c = L((p) => {
      s(p ?? void 0);
      const h = i.current;
      typeof h == "function" ? h(p) : h && (h.current = p);
    }, []), d = hs(n, yp), l = Di() ?? d, w = l >= Fr.MINIMUM;
    return /* @__PURE__ */ a(Aa.Provider, { value: l, children: /* @__PURE__ */ a(
      "div",
      {
        ref: c,
        className: v(
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
function _g({
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
      No,
      {
        onSelectMenuItem: t,
        menuData: r,
        tabLabel: "Project",
        icon: l ?? /* @__PURE__ */ a(Oc, {}),
        buttonVariant: "ghost",
        showSectionHeadings: !0
      }
    ),
    i && /* @__PURE__ */ a("div", { className: "tw:flex tw:min-w-0 tw:shrink tw:grow-[10] tw:flex-row tw:flex-nowrap tw:items-start tw:gap-x-1 tw:gap-y-2 tw:overflow-clip", children: i }),
    c && /* @__PURE__ */ a("div", { className: "tw:flex tw:shrink tw:grow-[1] tw:basis-0 tw:flex-row tw:flex-nowrap tw:items-start tw:justify-center tw:gap-x-1 tw:gap-y-2 tw:overflow-clip tw:@sm:basis-auto", children: c }),
    /* @__PURE__ */ u("div", { className: "tw:flex tw:shrink-0 tw:grow-[1] tw:flex-row-reverse tw:flex-nowrap tw:items-start tw:gap-x-1 tw:gap-y-2 tw:overflow-clip", children: [
      o && /* @__PURE__ */ a(
        No,
        {
          onSelectMenuItem: e,
          menuData: o,
          tabLabel: "View Info",
          icon: /* @__PURE__ */ a(Mc, {}),
          className: "tw:h-full",
          showSectionHeadings: !0
        }
      ),
      d
    ] })
  ] });
}
function Ng({
  onSelectProjectMenuItem: t,
  projectMenuData: e,
  id: r,
  className: o,
  menuButtonIcon: n
}) {
  return /* @__PURE__ */ a(gs, { className: "tw:pointer-events-none", id: r, children: e && /* @__PURE__ */ a(
    No,
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
const fs = te.forwardRef(({ className: t, ...e }, r) => {
  const o = Re();
  return /* @__PURE__ */ a(
    be.Root,
    {
      orientation: "vertical",
      ref: r,
      className: v("tw:flex tw:gap-1 tw:rounded-md tw:text-muted-foreground", t),
      ...e,
      dir: o
    }
  );
});
fs.displayName = be.List.displayName;
const ms = te.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ a(
  be.List,
  {
    ref: r,
    className: v(
      "tw:flex tw:items-center tw:w-[124px] tw:justify-center tw:rounded-md tw:bg-muted tw:p-1 tw:text-muted-foreground",
      t
    ),
    ...e
  }
));
ms.displayName = be.List.displayName;
const kp = te.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ a(
  be.Trigger,
  {
    ref: r,
    ...e,
    className: v(
      "tw:inline-flex tw:w-[116px] tw:cursor-pointer tw:items-center tw:justify-center tw:break-words tw:rounded-sm tw:border-0 tw:bg-muted tw:px-3 tw:py-1.5 tw:text-sm tw:font-medium tw:text-inherit tw:ring-offset-background tw:transition-all tw:hover:text-foreground tw:focus-visible:outline-hidden tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2 tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:data-[state=active]:bg-background tw:data-[state=active]:text-foreground tw:data-[state=active]:shadow-sm tw:overflow-clip",
      t
    )
  }
)), vs = te.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ a(
  be.Content,
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
vs.displayName = be.Content.displayName;
function Cg({
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
        Xn,
        {
          className: s,
          value: e,
          onSearch: r,
          placeholder: o
        }
      )
    ] }),
    /* @__PURE__ */ u(fs, { children: [
      /* @__PURE__ */ a(ms, { children: t.map((c) => /* @__PURE__ */ a(kp, { value: c.value, children: c.value }, c.key)) }),
      t.map((c) => /* @__PURE__ */ a(vs, { value: c.value, children: c.content }, c.key))
    ] })
  ] });
}
function _p({
  className: t,
  // CUSTOM: Added variant prop to allow callers to apply visual style variants to all menu items
  variant: e = "default",
  ...r
}) {
  const o = te.useMemo(
    () => ({
      variant: e
    }),
    [e]
  );
  return /* @__PURE__ */ a(Zs.Provider, { value: o, children: /* @__PURE__ */ a(
    De.Root,
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
function Np({ ...t }) {
  return /* @__PURE__ */ a(De.Menu, { "data-slot": "menubar-menu", ...t });
}
function Cp({ ...t }) {
  return /* @__PURE__ */ a(De.Portal, { "data-slot": "menubar-portal", ...t });
}
function Ep({
  className: t,
  ...e
}) {
  const r = Io();
  return /* @__PURE__ */ a(
    De.Trigger,
    {
      "data-slot": "menubar-trigger",
      className: v(
        "tw:flex tw:items-center tw:rounded-sm tw:px-1.5 tw:py-[2px] tw:text-sm tw:font-medium tw:outline-hidden tw:select-none tw:hover:bg-muted tw:aria-expanded:bg-muted",
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation (portal-rendered content needs this)
        "pr-twp",
        // CUSTOM: Apply variant-driven styles from menu context
        zo({ variant: r.variant, className: t })
      ),
      ...e
    }
  );
}
function Tp({
  className: t,
  align: e = "start",
  alignOffset: r = -4,
  sideOffset: o = 8,
  // CUSTOM: Pull `style` out so the shared z-index can be applied under any caller-supplied style
  style: n,
  ...s
}) {
  return /* @__PURE__ */ a(Cp, { children: /* @__PURE__ */ a(
    De.Content,
    {
      "data-slot": "menubar-content",
      align: e,
      alignOffset: r,
      sideOffset: o,
      className: v(
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
      style: { zIndex: je, ...n },
      ...s
    }
  ) });
}
function Sp({
  className: t,
  inset: e,
  variant: r = "default",
  ...o
}) {
  const n = Io();
  return /* @__PURE__ */ a(
    De.Item,
    {
      "data-slot": "menubar-item",
      "data-inset": e,
      "data-variant": r,
      className: v(
        "tw:group/menubar-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-[variant=destructive]:text-destructive tw:data-[variant=destructive]:focus:bg-destructive/10 tw:data-[variant=destructive]:focus:text-destructive tw:dark:data-[variant=destructive]:focus:bg-destructive/20 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:data-[variant=destructive]:*:[svg]:text-destructive!",
        // CUSTOM: Apply variant-driven styles from menu context
        zo({ variant: n.variant, className: t })
      ),
      ...o
    }
  );
}
function Rp({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    De.Separator,
    {
      "data-slot": "menubar-separator",
      className: v("tw:-mx-1 tw:my-1 tw:h-px tw:bg-border", t),
      ...e
    }
  );
}
function Dp({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "span",
    {
      "data-slot": "menubar-shortcut",
      className: v(
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
function Op({ ...t }) {
  return /* @__PURE__ */ a(De.Sub, { "data-slot": "menubar-sub", ...t });
}
function Mp({
  className: t,
  inset: e,
  children: r,
  ...o
}) {
  const n = Io();
  return /* @__PURE__ */ u(
    De.SubTrigger,
    {
      "data-slot": "menubar-sub-trigger",
      "data-inset": e,
      className: v(
        "tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-none tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-inset:ps-7 tw:data-open:bg-accent tw:data-open:text-accent-foreground tw:[&_svg:not([class*=size-])]:size-4",
        // CUSTOM: Apply variant-driven styles from menu context
        zo({ variant: n.variant, className: t })
      ),
      ...o,
      children: [
        r,
        /* @__PURE__ */ a(wi, { className: "tw:ms-auto tw:size-4" })
      ]
    }
  );
}
function Ip({
  className: t,
  // CUSTOM: Pull `style` out so the shared z-index can be applied under any caller-supplied style
  style: e,
  ...r
}) {
  return /* @__PURE__ */ a(
    De.SubContent,
    {
      "data-slot": "menubar-sub-content",
      className: v(
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
      style: { zIndex: je, ...e },
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
    const c = e.filter((l) => l.group === s).sort((l, w) => l.order - w.order).map((l) => /* @__PURE__ */ u(_t, { children: [
      /* @__PURE__ */ a(Nt, { asChild: !0, children: "command" in l ? /* @__PURE__ */ u(
        Sp,
        {
          onClick: () => {
            o(l);
          },
          children: [
            l.iconPathBefore && /* @__PURE__ */ a(Ra, { icon: l.iconPathBefore, menuLabel: l.label, leading: !0 }),
            l.label,
            l.iconPathAfter && /* @__PURE__ */ a(Ra, { icon: l.iconPathAfter, menuLabel: l.label }),
            l.shortcut && /* @__PURE__ */ a(Dp, { children: l.shortcut })
          ]
        },
        `menubar-item-${l.label}-${l.command}`
      ) : /* @__PURE__ */ u(Op, { children: [
        /* @__PURE__ */ a(Mp, { children: l.label }),
        /* @__PURE__ */ a(Ip, { children: bs(
          t,
          e,
          ds(t, l.id),
          o
        ) })
      ] }, `menubar-sub-${l.label}-${l.id}`) }),
      l.tooltip && /* @__PURE__ */ a(Ct, { children: l.tooltip })
    ] }, `tooltip-${l.label}-${"command" in l ? l.command : l.id}`)), d = [...c];
    return c.length > 0 && i < n.length - 1 && d.push(/* @__PURE__ */ a(Rp, {}, `separator-${s}`)), d;
  });
};
function zp({
  menuData: t,
  onSelectMenuItem: e,
  onOpenChange: r,
  variant: o
}) {
  const n = A(void 0), s = A(void 0), i = A(void 0), c = A(void 0), d = A(void 0), l = (w) => {
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
  if (sd(["alt", "alt+p", "alt+l", "alt+n", "alt+h"], (w, p) => {
    var b, x, g, C;
    w.preventDefault();
    const h = { key: "Escape", code: "Escape", keyCode: 27, bubbles: !0 }, f = { key: " ", code: "Space", keyCode: 32, bubbles: !0 };
    switch (p.hotkey) {
      case "alt":
        Pr(s, [h]);
        break;
      case "alt+p":
        (b = s.current) == null || b.focus(), Pr(s, [h, f]);
        break;
      case "alt+l":
        (x = i.current) == null || x.focus(), Pr(i, [h, f]);
        break;
      case "alt+n":
        (g = c.current) == null || g.focus(), Pr(c, [h, f]);
        break;
      case "alt+h":
        (C = d.current) == null || C.focus(), Pr(d, [h, f]);
        break;
    }
  }), J(() => {
    if (!r || !n.current) return;
    const w = new MutationObserver((f) => {
      f.forEach((b) => {
        if (b.attributeName === "data-state" && b.target instanceof HTMLElement) {
          const x = b.target.getAttribute("data-state");
          r(x === "open");
        }
      });
    });
    return n.current.querySelectorAll("[data-state]").forEach((f) => {
      w.observe(f, { attributes: !0 });
    }), () => w.disconnect();
  }, [r]), !!t)
    return /* @__PURE__ */ a(_p, { ref: n, className: "pr-twp tw:border-0 tw:bg-transparent", variant: o, children: ws(t.columns).map(({ columnKey: w, column: p }) => /* @__PURE__ */ u(Np, { children: [
      /* @__PURE__ */ a(Ep, { ref: l(w), children: p.label }),
      /* @__PURE__ */ a(
        Tp,
        {
          style: { zIndex: je },
          children: /* @__PURE__ */ a(At, { children: bs(t.groups, t.items, w, e) })
        }
      )
    ] }, w)) });
}
const Pp = Object.freeze([950, 800, 700]);
function Eg(t) {
  switch (t) {
    case void 0:
      return;
    case "darwin":
      return "tw:ps-[85px]";
    default:
      return "tw:pe-[calc(138px+1rem)]";
  }
}
function Tg({
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
  const [w, p] = _(void 0), h = L(
    (x) => p(x ?? void 0),
    []
  ), f = hs(w, Pp), b = Di() ?? f;
  return /* @__PURE__ */ a(Aa.Provider, { value: b, children: /* @__PURE__ */ a(
    "div",
    {
      className: v("tw:border tw:px-4 tw:text-foreground", o),
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
                    zp,
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
const Ap = (t, e) => t[e] ?? e;
function Sg({
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
  const l = Ap(
    i,
    "%settings_uiLanguageSelector_fallbackLanguages%"
  ), [w, p] = _(!1), h = (b) => {
    n && n(b), o && o([b, ...r.filter((x) => x !== b)]), s && r.find((x) => x === b) && s([...r.filter((x) => x !== b)]), p(!1);
  }, f = (b, x) => {
    var C, E, S, y, z, T;
    const g = x !== b ? ((E = (C = t[b]) == null ? void 0 : C.uiNames) == null ? void 0 : E[x]) ?? ((y = (S = t[b]) == null ? void 0 : S.uiNames) == null ? void 0 : y.en) : void 0;
    return g ? `${(z = t[b]) == null ? void 0 : z.autonym} (${g})` : (T = t[b]) == null ? void 0 : T.autonym;
  };
  return /* @__PURE__ */ u("div", { id: d, className: v("pr-twp tw:max-w-sm", c), children: [
    /* @__PURE__ */ u(
      Er,
      {
        name: "uiLanguage",
        value: e,
        onValueChange: h,
        open: w,
        onOpenChange: (b) => p(b),
        children: [
          /* @__PURE__ */ a(Sr, { children: /* @__PURE__ */ a(Tr, {}) }),
          /* @__PURE__ */ a(
            Rr,
            {
              style: { zIndex: je },
              children: Object.keys(t).map((b) => /* @__PURE__ */ a(ve, { value: b, children: f(b, e) }, b))
            }
          )
        ]
      }
    ),
    e !== "en" && /* @__PURE__ */ a("div", { className: "tw:pt-3", children: /* @__PURE__ */ a(Pt, { className: "tw:font-normal tw:text-muted-foreground", children: Ye(l, {
      fallbackLanguages: (r == null ? void 0 : r.length) > 0 ? r.map((b) => f(b, e)).join(", ") : t.en.autonym
    }) }) })
  ] });
}
const Rg = Object.freeze([
  "%firstRun_language_search_placeholder%",
  "%firstRun_language_noResults%",
  "%firstRun_language_selected%"
]);
function xs(t) {
  return t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}
function $p(t, e) {
  if (!e) return t;
  const r = xs(e);
  return t.filter(({ keywords: o }) => o.some((n) => n.includes(r)));
}
function Vp(t) {
  return [...t].sort(([e, r], [o, n]) => e === "en" && o !== "en" ? -1 : o === "en" && e !== "en" ? 1 : r.autonym.localeCompare(n.autonym));
}
function Dg({
  languages: t,
  value: e,
  onChange: r,
  localizedStrings: o,
  className: n,
  id: s
}) {
  const [i, c] = _(""), [d, l] = _(), w = A(null), p = A(null), h = A(/* @__PURE__ */ new Map()), [f, b] = _(), x = V(
    () => Vp(Object.entries(t)).map(([T, O]) => ({
      tag: T,
      info: O,
      keywords: [
        O.autonym,
        ...Object.values(O.uiNames ?? {}),
        ...O.otherNames ?? []
      ].map(xs)
    })),
    [t]
  ), g = V(() => $p(x, i), [x, i]), C = V(() => {
    var O;
    const T = (M) => !!M && g.some((D) => D.tag === M);
    return T(d) ? d : T(e) ? e : ((O = g[0]) == null ? void 0 : O.tag) ?? "";
  }, [d, e, g]), E = x.length > 1;
  Ht(() => {
    var T;
    b((T = p.current) == null ? void 0 : T.id);
  }, []), Ht(() => {
    const T = h.current.get(C), O = E ? w.current : void 0;
    O && (T ? O.setAttribute("aria-activedescendant", T.id) : O.removeAttribute("aria-activedescendant")), T && C !== d && T.scrollIntoView({ block: "nearest" });
  }, [C, d, E]);
  const S = o["%firstRun_language_search_placeholder%"] ?? "", y = o["%firstRun_language_noResults%"] ?? "", z = o["%firstRun_language_selected%"] ?? "";
  return /* @__PURE__ */ u(
    wr,
    {
      id: s,
      className: v("pr-twp", n),
      shouldFilter: !1,
      value: C,
      onValueChange: l,
      children: [
        E && // Plain <input> (not CommandPrimitive.Input) so cmdk cannot update this field after
        // item selection. Arrow-key and Enter events from here bubble to the Command root div
        // where cmdk's keydown handler picks them up for list navigation.
        /* @__PURE__ */ a("div", { "data-slot": "command-input-wrapper", className: "tw:p-1 tw:pb-0", children: /* @__PURE__ */ u(Xs, { className: "tw:h-8! tw:rounded-lg! tw:border-input/30 tw:bg-input/30 tw:shadow-none! tw:*:data-[slot=input-group-addon]:ps-2!", children: [
          /* @__PURE__ */ a(
            "input",
            {
              ref: w,
              "data-slot": "command-input",
              type: "text",
              role: "combobox",
              "aria-expanded": !0,
              "aria-controls": f,
              "aria-autocomplete": "list",
              placeholder: S,
              "aria-label": S,
              value: i,
              onChange: (T) => {
                c(T.currentTarget.value), l(void 0);
              },
              className: "tw:w-full tw:text-sm tw:outline-hidden tw:disabled:cursor-not-allowed tw:disabled:opacity-50"
            }
          ),
          /* @__PURE__ */ a(Js, { children: /* @__PURE__ */ a(Jc, { className: "tw:size-4 tw:shrink-0 tw:opacity-50" }) })
        ] }) }),
        /* @__PURE__ */ u(ur, { ref: p, children: [
          /* @__PURE__ */ a(Ma, { children: y }),
          g.map(({ tag: T, info: O }) => {
            const M = T === e;
            return /* @__PURE__ */ u(
              tr,
              {
                ref: (D) => {
                  D ? h.current.set(T, D) : h.current.delete(T);
                },
                value: T,
                "aria-current": M ? "true" : void 0,
                "data-checked": M ? "true" : void 0,
                onSelect: () => r(T),
                children: [
                  /* @__PURE__ */ a("span", { dir: "auto", children: O.autonym }),
                  M && /* @__PURE__ */ a("span", { className: "tw:sr-only", children: z })
                ]
              },
              T
            );
          })
        ] })
      ]
    }
  );
}
function Lp({ item: t, createLabel: e, createComplexLabel: r }) {
  return e ? /* @__PURE__ */ a(Pt, { children: e(t) }) : r ? /* @__PURE__ */ a(Pt, { children: r(t) }) : /* @__PURE__ */ a(Pt, { children: t });
}
function Bp({
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
      Lp,
      {
        item: c,
        createLabel: s,
        createComplexLabel: i
      }
    )
  ] }, c)) });
}
const Og = Bp;
function Fp(t, e) {
  const [r, o] = _(t), [n, s] = _(e);
  return t !== r && (o(t), t && s(e)), t ? e : n;
}
function Mg({
  open: t,
  anchorRect: e,
  message: r,
  confirmingKeyLabel: o,
  side: n = "bottom",
  align: s = "start",
  showArrow: i = !0
}) {
  const c = t ? ln(r, { key: o }).join("") : "", {
    anchorRect: d,
    message: l,
    confirmingKeyLabel: w,
    showArrow: p
  } = Fp(t, { anchorRect: e, message: r, confirmingKeyLabel: o, showArrow: i });
  return /* @__PURE__ */ u(At, { children: [
    /* @__PURE__ */ a("span", { role: "status", className: "tw:sr-only", children: c }),
    /* @__PURE__ */ u(_t, { open: t, onOpenChange: () => {
    }, children: [
      /* @__PURE__ */ a(
        Nt,
        {
          "aria-hidden": "true",
          tabIndex: -1,
          className: v(
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
        Ct,
        {
          side: n,
          align: s,
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
          children: /* @__PURE__ */ a("div", { className: "tw:w-full tw:h-full tw:rounded-md tw:bg-destructive/10 tw:px-3 tw:py-1.5", children: ln(l, {
            key: /* @__PURE__ */ a(
              wo,
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
function Ig({
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
  }, [b, x] = _(!1);
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
      className: v(
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
            l && (e || h && b) && /* @__PURE__ */ a(
              "div",
              {
                className: v(
                  !e && h && "tw:invisible tw:group-hover:visible"
                ),
                children: /* @__PURE__ */ u(Be, { children: [
                  /* @__PURE__ */ a(Ee, { className: v(p && "tw:me-1"), asChild: !0, children: /* @__PURE__ */ a(
                    et,
                    {
                      className: "tw:m-1 tw:h-6 tw:w-6",
                      variant: "ghost",
                      size: "icon",
                      onClick: (g) => g.stopPropagation(),
                      onFocus: (g) => g.stopPropagation(),
                      children: /* @__PURE__ */ a(Ic, {})
                    }
                  ) }),
                  /* @__PURE__ */ a(Fe, { align: "end", children: l })
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
function zg({
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
  return /* @__PURE__ */ u("div", { className: v("tw:inline-grid tw:items-center tw:gap-1.5", { "tw:w-full": o }), children: [
    /* @__PURE__ */ a(
      Pt,
      {
        htmlFor: t,
        className: v({
          "tw:text-red-600": r,
          "tw:hidden": !s
        }),
        children: `${s}${c ? "*" : ""}`
      }
    ),
    /* @__PURE__ */ a(
      Ia,
      {
        id: t,
        disabled: e,
        placeholder: i,
        required: c,
        className: v(d, { "tw:border-red-600": r }),
        defaultValue: l,
        value: w,
        onChange: p,
        onFocus: h,
        onBlur: f
      }
    ),
    /* @__PURE__ */ a("p", { className: v({ "tw:hidden": !n }), children: n })
  ] });
}
function Pg({ currentStep: t, totalSteps: e, locale: r }) {
  const o = r || "en", n = V(() => {
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
          className: v(
            "tw:flex tw:h-8 tw:w-8 tw:shrink-0 tw:items-center tw:justify-center tw:rounded-full tw:text-sm tw:font-medium",
            d === "active" && "tw:bg-primary tw:text-primary-foreground",
            d === "complete" && "tw:bg-muted tw:text-muted-foreground",
            d === "upcoming" && "tw:border tw:border-input tw:text-muted-foreground"
          ),
          children: d === "complete" ? /* @__PURE__ */ a(Je, { className: "tw:h-4 tw:w-4" }) : n(c)
        }
      )
    ] }, c);
  }) });
}
function Ag({ ...t }) {
  return /* @__PURE__ */ a(qt.Root, { "data-slot": "context-menu", ...t });
}
function $g({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    qt.Trigger,
    {
      "data-slot": "context-menu-trigger",
      className: v("tw:select-none", t),
      ...e
    }
  );
}
function Vg({ ...t }) {
  return /* @__PURE__ */ a(qt.Group, { "data-slot": "context-menu-group", ...t });
}
function Lg({ ...t }) {
  return /* @__PURE__ */ a(qt.Portal, { "data-slot": "context-menu-portal", ...t });
}
function Bg({ ...t }) {
  return /* @__PURE__ */ a(qt.Sub, { "data-slot": "context-menu-sub", ...t });
}
function Fg({
  ...t
}) {
  return /* @__PURE__ */ a(qt.RadioGroup, { "data-slot": "context-menu-radio-group", ...t });
}
function jg({
  className: t,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: e,
  ...r
}) {
  return /* @__PURE__ */ a(qt.Portal, { children: /* @__PURE__ */ a(
    qt.Content,
    {
      "data-slot": "context-menu-content",
      className: v(
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
      style: { zIndex: je, ...e },
      ...r
    }
  ) });
}
function Ug({
  className: t,
  inset: e,
  variant: r = "default",
  ...o
}) {
  return /* @__PURE__ */ a(
    qt.Item,
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
function Kg({
  className: t,
  inset: e,
  children: r,
  ...o
}) {
  return /* @__PURE__ */ u(
    qt.SubTrigger,
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
        /* @__PURE__ */ a(wi, { className: "tw:ms-auto" })
      ]
    }
  );
}
function Hg({
  className: t,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: e,
  ...r
}) {
  return /* @__PURE__ */ a(
    qt.SubContent,
    {
      "data-slot": "context-menu-sub-content",
      className: v(
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
      style: { zIndex: je, ...e },
      ...r
    }
  );
}
function qg({
  className: t,
  children: e,
  checked: r,
  inset: o,
  ...n
}) {
  return /* @__PURE__ */ u(
    qt.CheckboxItem,
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
        /* @__PURE__ */ a("span", { className: "tw:pointer-events-none tw:absolute tw:end-2", children: /* @__PURE__ */ a(qt.ItemIndicator, { children: /* @__PURE__ */ a(Pa, {}) }) }),
        e
      ]
    }
  );
}
function Gg({
  className: t,
  children: e,
  inset: r,
  ...o
}) {
  return /* @__PURE__ */ u(
    qt.RadioItem,
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
        /* @__PURE__ */ a("span", { className: "tw:pointer-events-none tw:absolute tw:end-2", children: /* @__PURE__ */ a(qt.ItemIndicator, { children: /* @__PURE__ */ a(Pa, {}) }) }),
        e
      ]
    }
  );
}
function Wg({
  className: t,
  inset: e,
  ...r
}) {
  return /* @__PURE__ */ a(
    qt.Label,
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
function Yg({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    qt.Separator,
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
function Zg({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "span",
    {
      "data-slot": "context-menu-shortcut",
      className: v(
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
function Xg({ ...t }) {
  return /* @__PURE__ */ a(er.Root, { "data-slot": "drawer", ...t });
}
function Jg({ ...t }) {
  return /* @__PURE__ */ a(er.Trigger, { "data-slot": "drawer-trigger", ...t });
}
function jp({ ...t }) {
  return /* @__PURE__ */ a(er.Portal, { "data-slot": "drawer-portal", ...t });
}
function Qg({ ...t }) {
  return /* @__PURE__ */ a(er.Close, { "data-slot": "drawer-close", ...t });
}
function Up({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    er.Overlay,
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
function tf({
  className: t,
  children: e,
  // CUSTOM: Destructure hideDrawerHandle to conditionally render the drag handle
  hideDrawerHandle: r = !1,
  ...o
}) {
  const n = Re();
  return /* @__PURE__ */ u(jp, { "data-slot": "drawer-portal", children: [
    /* @__PURE__ */ a(Up, {}),
    /* @__PURE__ */ u(
      er.Content,
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
function ef({ className: t, ...e }) {
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
function rf({ className: t, ...e }) {
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
function af({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    er.Title,
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
function of({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    er.Description,
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
function nf({
  className: t,
  value: e,
  ...r
}) {
  return /* @__PURE__ */ a(
    gn.Root,
    {
      "data-slot": "progress",
      className: v(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:relative tw:flex tw:h-1 tw:w-full tw:items-center tw:overflow-x-hidden tw:rounded-full tw:bg-muted",
        t
      ),
      ...r,
      children: /* @__PURE__ */ a(
        gn.Indicator,
        {
          "data-slot": "progress-indicator",
          className: "tw:size-full tw:flex-1 tw:bg-primary tw:transition-all",
          style: { transform: `translateX(-${100 - (e || 0)}%)` }
        }
      )
    }
  );
}
function sf({ ...t }) {
  const { theme: e = "system" } = cd();
  return /* @__PURE__ */ a(
    ld,
    {
      theme: e === "light" || e === "dark" || e === "system" ? e : "system",
      className: "tw:toaster tw:group",
      icons: {
        success: /* @__PURE__ */ a(al, { className: "tw:size-4" }),
        info: /* @__PURE__ */ a(rl, { className: "tw:size-4" }),
        warning: /* @__PURE__ */ a(el, { className: "tw:size-4" }),
        error: /* @__PURE__ */ a(tl, { className: "tw:size-4" }),
        loading: /* @__PURE__ */ a(Qc, { className: "tw:size-4 tw:animate-spin" })
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
function cf({
  className: t,
  defaultValue: e,
  value: r,
  min: o = 0,
  max: n = 100,
  ...s
}) {
  const i = Re(), c = te.useMemo(
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
      className: v(
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
function lf({
  className: t,
  size: e = "default",
  ...r
}) {
  return /* @__PURE__ */ a(
    fn.Root,
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
        fn.Thumb,
        {
          "data-slot": "switch-thumb",
          className: "tw:pointer-events-none tw:block tw:rounded-full tw:bg-background tw:ring-0 tw:transition-transform tw:group-data-[size=default]/switch:size-4 tw:group-data-[size=sm]/switch:size-3 tw:group-data-[size=default]/switch:data-checked:translate-x-[calc(100%-2px)] tw:rtl:group-data-[size=default]/switch:data-checked:-translate-x-[calc(100%-2px)] tw:group-data-[size=sm]/switch:data-checked:translate-x-[calc(100%-2px)] tw:rtl:group-data-[size=sm]/switch:data-checked:-translate-x-[calc(100%-2px)] tw:dark:data-checked:bg-primary-foreground tw:group-data-[size=default]/switch:data-unchecked:translate-x-0 tw:rtl:group-data-[size=default]/switch:data-unchecked:-translate-x-0 tw:group-data-[size=sm]/switch:data-unchecked:translate-x-0 tw:rtl:group-data-[size=sm]/switch:data-unchecked:-translate-x-0 tw:dark:data-unchecked:bg-foreground"
        }
      )
    }
  );
}
function df({
  className: t,
  orientation: e = "horizontal",
  ...r
}) {
  return /* @__PURE__ */ a(
    be.Root,
    {
      "data-slot": "tabs",
      "data-orientation": e,
      className: v("tw:group/tabs tw:flex tw:gap-2 tw:data-horizontal:flex-col", t),
      ...r
    }
  );
}
const Kp = Ti(
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
function wf({
  className: t,
  variant: e = "default",
  ...r
}) {
  const o = Re();
  return /* @__PURE__ */ a(
    be.List,
    {
      "data-slot": "tabs-list",
      "data-variant": e,
      className: v("pr-twp", Kp({ variant: e }), t),
      dir: o,
      ...r
    }
  );
}
function uf({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    be.Trigger,
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
function pf({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    be.Content,
    {
      "data-slot": "tabs-content",
      className: v("pr-twp tw:flex-1 tw:text-sm tw:outline-none", t),
      ...e
    }
  );
}
const hf = (t, e) => {
  J(() => {
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
}, gf = (t, e) => {
  J(() => {
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
function Hp(t) {
  return {
    preserveValue: !0,
    ...t
  };
}
const qp = (t, e, r = {}) => {
  const o = A(e);
  o.current = e;
  const n = A(r);
  n.current = Hp(n.current);
  const [s, i] = _(() => o.current), [c, d] = _(!0);
  return J(() => {
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
}, ff = (t) => {
  const [e, r] = _(!1), [o, n] = _(!1), [s, i] = _(0), c = A(void 0), d = V(() => {
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
  J(() => {
    c.current = d, r(!1), n(!d);
  }, [d]);
  const [l, w] = qp(d, void 0), p = L(() => {
    c.current && (r(!1), n(!1), i((h) => h + 1));
  }, []);
  return V(
    () => ({ data: l, isLoading: w, hasError: e, hasSettled: o, refetch: p }),
    [l, w, e, o, p]
  );
};
function mf(t) {
  J(() => {
    let e;
    return t && (e = document.createElement("style"), e.appendChild(document.createTextNode(t)), document.head.appendChild(e)), () => {
      e && document.head.removeChild(e);
    };
  }, [t]);
}
function vf(t) {
  const e = V(() => Kc(t).slice().sort().join(" "), [t]);
  return V(() => e ? e.split(" ") : [], [e]);
}
const Gp = () => {
  const [t, e] = _(
    () => document.body.getBoundingClientRect().height > 0
  );
  return J(() => {
    const r = new IntersectionObserver((o) => {
      const n = o[o.length - 1];
      n && e(n.isIntersecting);
    });
    return r.observe(document.body), () => {
      r.disconnect();
    };
  }, []), t;
};
function bf(t, e) {
  const [r, o] = _(!1), n = A(e);
  n.current = e;
  const s = A(t);
  s.current = t;
  const i = L(() => {
    s.current ? n.current() : o(!0);
  }, []);
  return J(() => {
    !t || !r || (o(!1), n.current());
  }, [t, r]), i;
}
function Wp(t, e, r) {
  return t ? r.dark : e === void 0 ? r.lightDefault : r.lightUnselected;
}
function xf(t, e) {
  const r = Gp();
  return Wp(t, r, e);
}
function yf({ value: t, children: e }) {
  return /* @__PURE__ */ a(Ri.Provider, { value: t, children: /* @__PURE__ */ a(Aa.Provider, { value: t, children: e }) });
}
const kf = 300;
function Yp(t, e = "top") {
  if (!t || typeof document > "u") return;
  const r = document.head || document.querySelector("head"), o = r.querySelector(":first-child"), n = document.createElement("style");
  n.appendChild(document.createTextNode(t)), e === "top" && o ? r.insertBefore(n, o) : r.appendChild(n);
}
Yp(`/* By default the editor is too tall for the footnote editor, even while empty, so this makes it
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
@layer properties{@supports (((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))){*,:before,:after,::backdrop{--tw-translate-x:0;--tw-translate-y:0;--tw-translate-z:0;--tw-rotate-x:initial;--tw-rotate-y:initial;--tw-rotate-z:initial;--tw-skew-x:initial;--tw-skew-y:initial;--tw-space-y-reverse:0;--tw-space-x-reverse:0;--tw-divide-x-reverse:0;--tw-border-style:solid;--tw-divide-y-reverse:0;--tw-gradient-position:initial;--tw-gradient-from:#0000;--tw-gradient-via:#0000;--tw-gradient-to:#0000;--tw-gradient-stops:initial;--tw-gradient-via-stops:initial;--tw-gradient-from-position:0%;--tw-gradient-via-position:50%;--tw-gradient-to-position:100%;--tw-leading:initial;--tw-font-weight:initial;--tw-tracking:initial;--tw-ordinal:initial;--tw-slashed-zero:initial;--tw-numeric-figure:initial;--tw-numeric-spacing:initial;--tw-numeric-fraction:initial;--tw-shadow:0 0 #0000;--tw-shadow-color:initial;--tw-shadow-alpha:100%;--tw-inset-shadow:0 0 #0000;--tw-inset-shadow-color:initial;--tw-inset-shadow-alpha:100%;--tw-ring-color:initial;--tw-ring-shadow:0 0 #0000;--tw-inset-ring-color:initial;--tw-inset-ring-shadow:0 0 #0000;--tw-ring-inset:initial;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-offset-shadow:0 0 #0000;--tw-blur:initial;--tw-brightness:initial;--tw-contrast:initial;--tw-grayscale:initial;--tw-hue-rotate:initial;--tw-invert:initial;--tw-opacity:initial;--tw-saturate:initial;--tw-sepia:initial;--tw-drop-shadow:initial;--tw-drop-shadow-color:initial;--tw-drop-shadow-alpha:100%;--tw-drop-shadow-size:initial;--tw-duration:initial;--tw-ease:initial;--tw-content:"";--tw-outline-style:solid;--tw-backdrop-blur:initial;--tw-backdrop-brightness:initial;--tw-backdrop-contrast:initial;--tw-backdrop-grayscale:initial;--tw-backdrop-hue-rotate:initial;--tw-backdrop-invert:initial;--tw-backdrop-opacity:initial;--tw-backdrop-saturate:initial;--tw-backdrop-sepia:initial;--tw-animation-delay:0s;--tw-animation-direction:normal;--tw-animation-duration:initial;--tw-animation-fill-mode:none;--tw-animation-iteration-count:1;--tw-enter-blur:0;--tw-enter-opacity:1;--tw-enter-rotate:0;--tw-enter-scale:1;--tw-enter-translate-x:0;--tw-enter-translate-y:0;--tw-exit-blur:0;--tw-exit-opacity:1;--tw-exit-rotate:0;--tw-exit-scale:1;--tw-exit-translate-x:0;--tw-exit-translate-y:0}}}@layer theme{:root,:host{--tw-font-mono:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;--tw-color-red-100:oklch(93.6% .032 17.717);--tw-color-red-200:oklch(88.5% .062 18.334);--tw-color-red-300:oklch(80.8% .114 19.571);--tw-color-red-400:oklch(70.4% .191 22.216);--tw-color-red-500:oklch(63.7% .237 25.331);--tw-color-red-600:oklch(57.7% .245 27.325);--tw-color-red-700:oklch(50.5% .213 27.518);--tw-color-red-800:oklch(44.4% .177 26.899);--tw-color-orange-100:oklch(95.4% .038 75.164);--tw-color-orange-800:oklch(47% .157 37.304);--tw-color-amber-200:oklch(92.4% .12 95.746);--tw-color-amber-400:oklch(82.8% .189 84.429);--tw-color-amber-500:oklch(76.9% .188 70.08);--tw-color-amber-600:oklch(66.6% .179 58.318);--tw-color-yellow-50:oklch(98.7% .026 102.212);--tw-color-yellow-100:oklch(97.3% .071 103.193);--tw-color-yellow-400:oklch(85.2% .199 91.936);--tw-color-yellow-500:oklch(79.5% .184 86.047);--tw-color-yellow-600:oklch(68.1% .162 75.834);--tw-color-yellow-700:oklch(55.4% .135 66.442);--tw-color-green-50:oklch(98.2% .018 155.826);--tw-color-green-100:oklch(96.2% .044 156.743);--tw-color-green-500:oklch(72.3% .219 149.579);--tw-color-green-600:oklch(62.7% .194 149.214);--tw-color-green-700:oklch(52.7% .154 150.069);--tw-color-green-800:oklch(44.8% .119 151.328);--tw-color-teal-400:oklch(77.7% .152 181.912);--tw-color-teal-500:oklch(70.4% .14 182.503);--tw-color-teal-600:oklch(60% .118 184.704);--tw-color-sky-400:oklch(74.6% .16 232.661);--tw-color-sky-500:oklch(68.5% .169 237.323);--tw-color-sky-600:oklch(58.8% .158 241.966);--tw-color-blue-50:oklch(97% .014 254.604);--tw-color-blue-100:oklch(93.2% .032 255.585);--tw-color-blue-400:oklch(70.7% .165 254.624);--tw-color-blue-500:oklch(62.3% .214 259.815);--tw-color-blue-600:oklch(54.6% .245 262.881);--tw-color-blue-800:oklch(42.4% .199 265.638);--tw-color-indigo-200:oklch(87% .065 274.039);--tw-color-purple-50:oklch(97.7% .014 308.299);--tw-color-purple-200:oklch(90.2% .063 306.703);--tw-color-purple-900:oklch(38.1% .176 304.987);--tw-color-rose-400:oklch(71.2% .194 13.428);--tw-color-rose-500:oklch(64.5% .246 16.439);--tw-color-rose-600:oklch(58.6% .253 17.585);--tw-color-slate-300:oklch(86.9% .022 252.894);--tw-color-slate-400:oklch(70.4% .04 256.788);--tw-color-slate-900:oklch(20.8% .042 265.755);--tw-color-gray-50:oklch(98.5% .002 247.839);--tw-color-gray-100:oklch(96.7% .003 264.542);--tw-color-gray-300:oklch(87.2% .01 258.338);--tw-color-gray-500:oklch(55.1% .027 264.364);--tw-color-gray-600:oklch(44.6% .03 256.802);--tw-color-gray-700:oklch(37.3% .034 259.733);--tw-color-gray-800:oklch(27.8% .033 256.848);--tw-color-zinc-400:oklch(70.5% .015 286.067);--tw-color-neutral-300:oklch(87% 0 0);--tw-color-black:#000;--tw-color-white:#fff;--tw-container-xs:20rem;--tw-container-sm:24rem;--tw-container-md:28rem;--tw-container-lg:32rem;--tw-container-2xl:42rem;--tw-container-3xl:48rem;--tw-container-4xl:56rem;--tw-container-6xl:72rem;--tw-text-xs:.75rem;--tw-text-xs--line-height:calc(1 / .75);--tw-text-sm:.875rem;--tw-text-sm--line-height:calc(1.25 / .875);--tw-text-base:1rem;--tw-text-base--line-height:calc(1.5 / 1);--tw-text-lg:1.125rem;--tw-text-lg--line-height:calc(1.75 / 1.125);--tw-text-xl:1.25rem;--tw-text-xl--line-height:calc(1.75 / 1.25);--tw-text-2xl:1.5rem;--tw-text-2xl--line-height:calc(2 / 1.5);--tw-text-3xl:1.875rem;--tw-text-3xl--line-height:calc(2.25 / 1.875);--tw-text-4xl:2.25rem;--tw-text-4xl--line-height:calc(2.5 / 2.25);--tw-text-5xl:3rem;--tw-text-5xl--line-height:1;--tw-font-weight-normal:400;--tw-font-weight-medium:500;--tw-font-weight-semibold:600;--tw-font-weight-bold:700;--tw-font-weight-extrabold:800;--tw-tracking-tight:-.025em;--tw-tracking-wider:.05em;--tw-tracking-widest:.1em;--tw-leading-tight:1.25;--tw-leading-snug:1.375;--tw-leading-relaxed:1.625;--tw-leading-loose:2;--tw-radius-xs:.125rem;--tw-radius-md:calc(var(--radius) * .8);--tw-drop-shadow-sm:0 1px 2px #00000026;--tw-animate-spin:spin 1s linear infinite;--tw-animate-pulse:pulse 2s cubic-bezier(.4, 0, .6, 1) infinite;--tw-blur-xs:4px;--tw-blur-2xl:40px;--tw-default-transition-duration:.15s;--tw-default-transition-timing-function:cubic-bezier(.4, 0, .2, 1);--tw-default-font-family:"IBM Plex Sans Variable", sans-serif;--tw-default-mono-font-family:var(--tw-font-mono)}}@layer base{.pr-twp,.pr-twp *{border-color:var(--border);outline-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.pr-twp,.pr-twp *{outline-color:color-mix(in oklab, var(--ring) 50%, transparent)}}body.pr-twp{background-color:var(--background);color:var(--foreground)}html.pr-twp{font-family:IBM Plex Sans Variable,sans-serif}:where(.pr-twp,.pr-twp *),:where(.pr-twp,.pr-twp *):after,:where(.pr-twp,.pr-twp *):before,:where(.pr-twp,.pr-twp *) ::backdrop{box-sizing:border-box;border:0 solid;margin:0;padding:0}:where(.pr-twp,.pr-twp *) ::file-selector-button{box-sizing:border-box;border:0 solid;margin:0;padding:0}.pr-twp{-webkit-text-size-adjust:100%;tab-size:4;line-height:1.5;font-family:var(--tw-default-font-family,ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");font-feature-settings:var(--tw-default-font-feature-settings,normal);font-variation-settings:var(--tw-default-font-variation-settings,normal);-webkit-tap-highlight-color:transparent}hr:where(.pr-twp,.pr-twp *){height:0;color:inherit;border-top-width:1px}abbr:where([title]):where(.pr-twp,.pr-twp *){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1:where(.pr-twp,.pr-twp *),h2:where(.pr-twp,.pr-twp *),h3:where(.pr-twp,.pr-twp *),h4:where(.pr-twp,.pr-twp *),h5:where(.pr-twp,.pr-twp *),h6:where(.pr-twp,.pr-twp *){font-size:inherit;font-weight:inherit}a:where(.pr-twp,.pr-twp *){color:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b:where(.pr-twp,.pr-twp *),strong:where(.pr-twp,.pr-twp *){font-weight:bolder}code:where(.pr-twp,.pr-twp *),kbd:where(.pr-twp,.pr-twp *),samp:where(.pr-twp,.pr-twp *),pre:where(.pr-twp,.pr-twp *){font-family:var(--tw-default-mono-font-family,ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace);font-feature-settings:var(--tw-default-mono-font-feature-settings,normal);font-variation-settings:var(--tw-default-mono-font-variation-settings,normal);font-size:1em}small:where(.pr-twp,.pr-twp *){font-size:80%}sub:where(.pr-twp,.pr-twp *),sup:where(.pr-twp,.pr-twp *){vertical-align:baseline;font-size:75%;line-height:0;position:relative}sub:where(.pr-twp,.pr-twp *){bottom:-.25em}sup:where(.pr-twp,.pr-twp *){top:-.5em}table:where(.pr-twp,.pr-twp *){text-indent:0;border-color:inherit;border-collapse:collapse}:-moz-focusring:where(.pr-twp,.pr-twp *){outline:auto}progress:where(.pr-twp,.pr-twp *){vertical-align:baseline}summary:where(.pr-twp,.pr-twp *){display:list-item}ol:where(.pr-twp,.pr-twp *),ul:where(.pr-twp,.pr-twp *),menu:where(.pr-twp,.pr-twp *){list-style:none}img:where(.pr-twp,.pr-twp *),svg:where(.pr-twp,.pr-twp *),video:where(.pr-twp,.pr-twp *),canvas:where(.pr-twp,.pr-twp *),audio:where(.pr-twp,.pr-twp *),iframe:where(.pr-twp,.pr-twp *),embed:where(.pr-twp,.pr-twp *),object:where(.pr-twp,.pr-twp *){vertical-align:middle;display:block}img:where(.pr-twp,.pr-twp *),video:where(.pr-twp,.pr-twp *){max-width:100%;height:auto}button:where(.pr-twp,.pr-twp *),input:where(.pr-twp,.pr-twp *),select:where(.pr-twp,.pr-twp *),optgroup:where(.pr-twp,.pr-twp *),textarea:where(.pr-twp,.pr-twp *){font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(.pr-twp,.pr-twp *) ::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(select:is([multiple],[size])) optgroup:where(.pr-twp,.pr-twp *){font-weight:bolder}:where(select:is([multiple],[size])) optgroup option:where(.pr-twp,.pr-twp *){padding-inline-start:20px}:where(.pr-twp,.pr-twp *) ::file-selector-button{margin-inline-end:4px}:where(.pr-twp,.pr-twp *) ::placeholder{opacity:1}@supports (not ((-webkit-appearance:-apple-pay-button))) or (contain-intrinsic-size:1px){:where(.pr-twp,.pr-twp *) ::placeholder{color:currentColor}@supports (color:color-mix(in lab, red, red)){:where(.pr-twp,.pr-twp *) ::placeholder{color:color-mix(in oklab, currentcolor 50%, transparent)}}}textarea:where(.pr-twp,.pr-twp *){resize:vertical}:where(.pr-twp,.pr-twp *) ::-webkit-search-decoration{-webkit-appearance:none}:where(.pr-twp,.pr-twp *) ::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit{display:inline-flex}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-fields-wrapper{padding:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-year-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-month-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-day-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-hour-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-minute-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-second-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-millisecond-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-meridiem-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-calendar-picker-indicator{line-height:1}:-moz-ui-invalid:where(.pr-twp,.pr-twp *){box-shadow:none}button:where(.pr-twp,.pr-twp *),input:where([type=button],[type=reset],[type=submit]):where(.pr-twp,.pr-twp *){appearance:button}:where(.pr-twp,.pr-twp *) ::file-selector-button{appearance:button}:where(.pr-twp,.pr-twp *) ::-webkit-inner-spin-button{height:auto}:where(.pr-twp,.pr-twp *) ::-webkit-outer-spin-button{height:auto}[hidden]:where(:not([hidden=until-found])):where(.pr-twp,.pr-twp *){display:none!important}}@layer components;@layer utilities{.tw\\:\\@container\\/card-header{container:card-header/inline-size}.tw\\:\\@container\\/search{container:search/inline-size}.tw\\:\\@container\\/toolbar{container:toolbar/inline-size}.tw\\:pointer-events-auto{pointer-events:auto}.tw\\:pointer-events-none{pointer-events:none}.tw\\:invisible{visibility:hidden}.tw\\:sr-only{clip-path:inset(50%);white-space:nowrap;border-width:0;width:1px;height:1px;margin:-1px;padding:0;position:absolute;overflow:hidden}.tw\\:absolute{position:absolute}.tw\\:fixed{position:fixed}.tw\\:relative{position:relative}.tw\\:sticky{position:sticky}.tw\\:inset-0{inset:calc(calc(var(--spacing)) * 0)}.tw\\:inset-x-0{inset-inline:calc(calc(var(--spacing)) * 0)}.tw\\:inset-y-0{inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:inset-s-3{inset-inline-start:calc(calc(var(--spacing)) * 3)}.tw\\:start-1\\.5{inset-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:start-1\\/2{inset-inline-start:50%}.tw\\:end-0{inset-inline-end:calc(calc(var(--spacing)) * 0)}.tw\\:end-1{inset-inline-end:calc(calc(var(--spacing)) * 1)}.tw\\:end-2{inset-inline-end:calc(calc(var(--spacing)) * 2)}.tw\\:end-3{inset-inline-end:calc(calc(var(--spacing)) * 3)}.tw\\:inset-e-0{inset-inline-end:calc(calc(var(--spacing)) * 0)}.tw\\:-top-\\[1px\\]{top:-1px}.tw\\:top-0{top:calc(calc(var(--spacing)) * 0)}.tw\\:top-1{top:calc(calc(var(--spacing)) * 1)}.tw\\:top-1\\.5{top:calc(calc(var(--spacing)) * 1.5)}.tw\\:top-1\\/2{top:50%}.tw\\:top-1\\/3{top:33.3333%}.tw\\:top-2{top:calc(calc(var(--spacing)) * 2)}.tw\\:top-2\\.5{top:calc(calc(var(--spacing)) * 2.5)}.tw\\:top-3\\.5{top:calc(calc(var(--spacing)) * 3.5)}.tw\\:top-\\[-1px\\]{top:-1px}.tw\\:top-full{top:100%}.tw\\:-right-1{right:calc(calc(var(--spacing)) * -1)}.tw\\:right-0{right:calc(calc(var(--spacing)) * 0)}.tw\\:right-1{right:calc(calc(var(--spacing)) * 1)}.tw\\:right-3{right:calc(calc(var(--spacing)) * 3)}.tw\\:bottom-0{bottom:calc(calc(var(--spacing)) * 0)}.tw\\:-left-\\[1px\\]{left:-1px}.tw\\:left-0{left:calc(calc(var(--spacing)) * 0)}.tw\\:left-1\\/2{left:50%}.tw\\:left-2{left:calc(calc(var(--spacing)) * 2)}.tw\\:left-3{left:calc(calc(var(--spacing)) * 3)}.tw\\:isolate{isolation:isolate}.tw\\:z-10{z-index:10}.tw\\:z-20{z-index:20}.tw\\:z-50{z-index:50}.tw\\:order-first{order:-9999}.tw\\:order-last{order:9999}.tw\\:col-span-1{grid-column:span 1/span 1}.tw\\:col-span-2{grid-column:span 2/span 2}.tw\\:col-span-3{grid-column:span 3/span 3}.tw\\:col-start-1{grid-column-start:1}.tw\\:col-start-2{grid-column-start:2}.tw\\:row-span-2{grid-row:span 2/span 2}.tw\\:row-start-1{grid-row-start:1}.tw\\:row-start-2{grid-row-start:2}.tw\\:m-0{margin:calc(calc(var(--spacing)) * 0)}.tw\\:m-1{margin:calc(calc(var(--spacing)) * 1)}.tw\\:m-2{margin:calc(calc(var(--spacing)) * 2)}.tw\\:-mx-1{margin-inline:calc(calc(var(--spacing)) * -1)}.tw\\:-mx-4{margin-inline:calc(calc(var(--spacing)) * -4)}.tw\\:mx-0{margin-inline:calc(calc(var(--spacing)) * 0)}.tw\\:mx-1{margin-inline:calc(calc(var(--spacing)) * 1)}.tw\\:mx-2{margin-inline:calc(calc(var(--spacing)) * 2)}.tw\\:mx-3\\.5{margin-inline:calc(calc(var(--spacing)) * 3.5)}.tw\\:mx-4{margin-inline:calc(calc(var(--spacing)) * 4)}.tw\\:mx-8{margin-inline:calc(calc(var(--spacing)) * 8)}.tw\\:my-1{margin-block:calc(calc(var(--spacing)) * 1)}.tw\\:my-2\\.5{margin-block:calc(calc(var(--spacing)) * 2.5)}.tw\\:my-4{margin-block:calc(calc(var(--spacing)) * 4)}.tw\\:my-auto{margin-block:auto}.tw\\:ms-1{margin-inline-start:calc(calc(var(--spacing)) * 1)}.tw\\:ms-2{margin-inline-start:calc(calc(var(--spacing)) * 2)}.tw\\:ms-5{margin-inline-start:calc(calc(var(--spacing)) * 5)}.tw\\:ms-6{margin-inline-start:calc(calc(var(--spacing)) * 6)}.tw\\:ms-auto{margin-inline-start:auto}.tw\\:me-1{margin-inline-end:calc(calc(var(--spacing)) * 1)}.tw\\:me-2{margin-inline-end:calc(calc(var(--spacing)) * 2)}.tw\\:prose{color:var(--tw-prose-body);max-width:65ch}.tw\\:prose :where(p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em}.tw\\:prose :where([class~=lead]):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-lead);margin-top:1.2em;margin-bottom:1.2em;font-size:1.25em;line-height:1.6}.tw\\:prose :where(a):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-links);font-weight:500;text-decoration:underline}.tw\\:prose :where(strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-bold);font-weight:600}.tw\\:prose :where(a strong):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(blockquote strong):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(thead th strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.tw\\:prose :where(ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em;padding-inline-start:1.625em;list-style-type:decimal}.tw\\:prose :where(ol[type=A]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-alpha}.tw\\:prose :where(ol[type=a]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-alpha}.tw\\:prose :where(ol[type=A s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-alpha}.tw\\:prose :where(ol[type=a s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-alpha}.tw\\:prose :where(ol[type=I]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-roman}.tw\\:prose :where(ol[type=i]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-roman}.tw\\:prose :where(ol[type=I s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-roman}.tw\\:prose :where(ol[type=i s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-roman}.tw\\:prose :where(ol[type="1"]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:decimal}.tw\\:prose :where(ul):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em;padding-inline-start:1.625em;list-style-type:disc}.tw\\:prose :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *))::marker{color:var(--tw-prose-counters);font-weight:400}.tw\\:prose :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *))::marker{color:var(--tw-prose-bullets)}.tw\\:prose :where(dt):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:1.25em;font-weight:600}.tw\\:prose :where(hr):not(:where([class~=not-prose],[class~=not-prose] *)){border-color:var(--tw-prose-hr);border-top-width:1px;margin-top:3em;margin-bottom:3em}.tw\\:prose :where(blockquote):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-quotes);border-inline-start-width:.25rem;border-inline-start-color:var(--tw-prose-quote-borders);quotes:"“""”""‘""’";margin-top:1.6em;margin-bottom:1.6em;padding-inline-start:1em;font-style:italic;font-weight:500}.tw\\:prose :where(blockquote p:first-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):before{content:open-quote}.tw\\:prose :where(blockquote p:last-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:close-quote}.tw\\:prose :where(h1):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:0;margin-bottom:.888889em;font-size:2.25em;font-weight:800;line-height:1.11111}.tw\\:prose :where(h1 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:900}.tw\\:prose :where(h2):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:2em;margin-bottom:1em;font-size:1.5em;font-weight:700;line-height:1.33333}.tw\\:prose :where(h2 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:800}.tw\\:prose :where(h3):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:1.6em;margin-bottom:.6em;font-size:1.25em;font-weight:600;line-height:1.6}.tw\\:prose :where(h3 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:700}.tw\\:prose :where(h4):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:1.5em;margin-bottom:.5em;font-weight:600;line-height:1.5}.tw\\:prose :where(h4 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:700}.tw\\:prose :where(img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.tw\\:prose :where(picture):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em;display:block}.tw\\:prose :where(video):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.tw\\:prose :where(kbd):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-kbd);box-shadow:0 0 0 1px rgb(var(--tw-prose-kbd-shadows) / 10%), 0 3px 0 rgb(var(--tw-prose-kbd-shadows) / 10%);padding-top:.1875em;padding-inline-end:.375em;padding-bottom:.1875em;border-radius:.3125rem;padding-inline-start:.375em;font-family:inherit;font-size:.875em;font-weight:500}.tw\\:prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-code);font-size:.875em;font-weight:600}.tw\\:prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)):before,.tw\\:prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:"\`"}.tw\\:prose :where(a code):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h1 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.tw\\:prose :where(h2 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-size:.875em}.tw\\:prose :where(h3 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-size:.9em}.tw\\:prose :where(h4 code):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(blockquote code):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(thead th code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.tw\\:prose :where(pre):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-pre-code);background-color:var(--tw-prose-pre-bg);padding-top:.857143em;padding-inline-end:1.14286em;padding-bottom:.857143em;border-radius:.375rem;margin-top:1.71429em;margin-bottom:1.71429em;padding-inline-start:1.14286em;font-size:.875em;font-weight:400;line-height:1.71429;overflow-x:auto}.tw\\:prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)){font-weight:inherit;color:inherit;font-size:inherit;font-family:inherit;line-height:inherit;background-color:#0000;border-width:0;border-radius:0;padding:0}.tw\\:prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)):before,.tw\\:prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:none}.tw\\:prose :where(table):not(:where([class~=not-prose],[class~=not-prose] *)){table-layout:auto;width:100%;margin-top:2em;margin-bottom:2em;font-size:.875em;line-height:1.71429}.tw\\:prose :where(thead):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:1px;border-bottom-color:var(--tw-prose-th-borders)}.tw\\:prose :where(thead th):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);vertical-align:bottom;padding-inline-end:.571429em;padding-bottom:.571429em;padding-inline-start:.571429em;font-weight:600}.tw\\:prose :where(tbody tr):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:1px;border-bottom-color:var(--tw-prose-td-borders)}.tw\\:prose :where(tbody tr:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:0}.tw\\:prose :where(tbody td):not(:where([class~=not-prose],[class~=not-prose] *)){vertical-align:baseline}.tw\\:prose :where(tfoot):not(:where([class~=not-prose],[class~=not-prose] *)){border-top-width:1px;border-top-color:var(--tw-prose-th-borders)}.tw\\:prose :where(tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){vertical-align:top}.tw\\:prose :where(th,td):not(:where([class~=not-prose],[class~=not-prose] *)){text-align:start}.tw\\:prose :where(figure>*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose :where(figcaption):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-captions);margin-top:.857143em;font-size:.875em;line-height:1.42857}.tw\\:prose{--tw-prose-body:var(--foreground);--tw-prose-headings:var(--foreground);--tw-prose-lead:var(--muted-foreground);--tw-prose-links:var(--primary);--tw-prose-bold:var(--foreground);--tw-prose-counters:var(--muted-foreground);--tw-prose-bullets:var(--muted-foreground);--tw-prose-hr:var(--border);--tw-prose-quotes:var(--foreground);--tw-prose-quote-borders:var(--border);--tw-prose-captions:var(--muted-foreground);--tw-prose-kbd:oklch(21% .034 264.665);--tw-prose-kbd-shadows:NaN NaN NaN;--tw-prose-code:var(--foreground);--tw-prose-pre-code:var(--muted-foreground);--tw-prose-pre-bg:var(--muted);--tw-prose-th-borders:var(--border);--tw-prose-td-borders:var(--border);--tw-prose-invert-body:var(--foreground);--tw-prose-invert-headings:var(--foreground);--tw-prose-invert-lead:var(--muted-foreground);--tw-prose-invert-links:var(--primary);--tw-prose-invert-bold:var(--foreground);--tw-prose-invert-counters:var(--muted-foreground);--tw-prose-invert-bullets:var(--muted-foreground);--tw-prose-invert-hr:var(--border);--tw-prose-invert-quotes:var(--foreground);--tw-prose-invert-quote-borders:var(--border);--tw-prose-invert-captions:var(--muted-foreground);--tw-prose-invert-kbd:#fff;--tw-prose-invert-kbd-shadows:255 255 255;--tw-prose-invert-code:var(--foreground);--tw-prose-invert-pre-code:var(--muted-foreground);--tw-prose-invert-pre-bg:var(--muted);--tw-prose-invert-th-borders:var(--border);--tw-prose-invert-td-borders:var(--border);font-size:1rem;line-height:1.75}.tw\\:prose :where(picture>img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose :where(li):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.5em;margin-bottom:.5em}.tw\\:prose :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:.375em}.tw\\:prose :where(.tw\\:prose>ul>li p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.75em;margin-bottom:.75em}.tw\\:prose :where(.tw\\:prose>ul>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em}.tw\\:prose :where(.tw\\:prose>ul>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.25em}.tw\\:prose :where(.tw\\:prose>ol>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em}.tw\\:prose :where(.tw\\:prose>ol>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.25em}.tw\\:prose :where(ul ul,ul ol,ol ul,ol ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.75em;margin-bottom:.75em}.tw\\:prose :where(dl):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em}.tw\\:prose :where(dd):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.5em;padding-inline-start:1.625em}.tw\\:prose :where(hr+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h2+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h3+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h4+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose :where(thead th:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose :where(thead th:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose :where(tbody td,tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.571429em;padding-inline-end:.571429em;padding-bottom:.571429em;padding-inline-start:.571429em}.tw\\:prose :where(tbody td:first-child,tfoot td:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose :where(tbody td:last-child,tfoot td:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose :where(figure):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.tw\\:prose :where(.tw\\:prose>:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose :where(.tw\\:prose>:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:0}.tw\\:prose-sm{font-size:.875rem;line-height:1.71429}.tw\\:prose-sm :where(p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em;margin-bottom:1.14286em}.tw\\:prose-sm :where([class~=lead]):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.888889em;margin-bottom:.888889em;font-size:1.28571em;line-height:1.55556}.tw\\:prose-sm :where(blockquote):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.33333em;margin-bottom:1.33333em;padding-inline-start:1.11111em}.tw\\:prose-sm :where(h1):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:.8em;font-size:2.14286em;line-height:1.2}.tw\\:prose-sm :where(h2):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.6em;margin-bottom:.8em;font-size:1.42857em;line-height:1.4}.tw\\:prose-sm :where(h3):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.55556em;margin-bottom:.444444em;font-size:1.28571em;line-height:1.55556}.tw\\:prose-sm :where(h4):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.42857em;margin-bottom:.571429em;line-height:1.42857}.tw\\:prose-sm :where(img):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(picture):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.71429em;margin-bottom:1.71429em}.tw\\:prose-sm :where(picture>img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose-sm :where(video):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.71429em;margin-bottom:1.71429em}.tw\\:prose-sm :where(kbd):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.142857em;padding-inline-end:.357143em;padding-bottom:.142857em;border-radius:.3125rem;padding-inline-start:.357143em;font-size:.857143em}.tw\\:prose-sm :where(code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.857143em}.tw\\:prose-sm :where(h2 code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.9em}.tw\\:prose-sm :where(h3 code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.888889em}.tw\\:prose-sm :where(pre):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.666667em;padding-inline-end:1em;padding-bottom:.666667em;border-radius:.25rem;margin-top:1.66667em;margin-bottom:1.66667em;padding-inline-start:1em;font-size:.857143em;line-height:1.66667}.tw\\:prose-sm :where(ol):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(ul):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em;margin-bottom:1.14286em;padding-inline-start:1.57143em}.tw\\:prose-sm :where(li):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.285714em;margin-bottom:.285714em}.tw\\:prose-sm :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:.428571em}.tw\\:prose-sm :where(.tw\\:prose-sm>ul>li p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.571429em;margin-bottom:.571429em}.tw\\:prose-sm :where(.tw\\:prose-sm>ul>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em}.tw\\:prose-sm :where(.tw\\:prose-sm>ul>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.14286em}.tw\\:prose-sm :where(.tw\\:prose-sm>ol>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em}.tw\\:prose-sm :where(.tw\\:prose-sm>ol>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.14286em}.tw\\:prose-sm :where(ul ul,ul ol,ol ul,ol ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.571429em;margin-bottom:.571429em}.tw\\:prose-sm :where(dl):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em;margin-bottom:1.14286em}.tw\\:prose-sm :where(dt):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em}.tw\\:prose-sm :where(dd):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.285714em;padding-inline-start:1.57143em}.tw\\:prose-sm :where(hr):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2.85714em;margin-bottom:2.85714em}.tw\\:prose-sm :where(hr+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(h2+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(h3+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(h4+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose-sm :where(table):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.857143em;line-height:1.5}.tw\\:prose-sm :where(thead th):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:1em;padding-bottom:.666667em;padding-inline-start:1em}.tw\\:prose-sm :where(thead th:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose-sm :where(thead th:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose-sm :where(tbody td,tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.666667em;padding-inline-end:1em;padding-bottom:.666667em;padding-inline-start:1em}.tw\\:prose-sm :where(tbody td:first-child,tfoot td:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose-sm :where(tbody td:last-child,tfoot td:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose-sm :where(figure):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.71429em;margin-bottom:1.71429em}.tw\\:prose-sm :where(figure>*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose-sm :where(figcaption):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.666667em;font-size:.857143em;line-height:1.33333}.tw\\:prose-sm :where(.tw\\:prose-sm>:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose-sm :where(.tw\\:prose-sm>:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:0}.tw\\:-mt-4{margin-top:calc(calc(var(--spacing)) * -4)}.tw\\:mt-0\\.5{margin-top:calc(calc(var(--spacing)) * .5)}.tw\\:mt-1{margin-top:calc(calc(var(--spacing)) * 1)}.tw\\:mt-2{margin-top:calc(calc(var(--spacing)) * 2)}.tw\\:mt-3{margin-top:calc(calc(var(--spacing)) * 3)}.tw\\:mt-4{margin-top:calc(calc(var(--spacing)) * 4)}.tw\\:mt-6{margin-top:calc(calc(var(--spacing)) * 6)}.tw\\:mt-auto{margin-top:auto}.tw\\:mr-1{margin-right:calc(calc(var(--spacing)) * 1)}.tw\\:mr-2{margin-right:calc(calc(var(--spacing)) * 2)}.tw\\:mr-3{margin-right:calc(calc(var(--spacing)) * 3)}.tw\\:-mb-4{margin-bottom:calc(calc(var(--spacing)) * -4)}.tw\\:mb-1{margin-bottom:calc(calc(var(--spacing)) * 1)}.tw\\:mb-2{margin-bottom:calc(calc(var(--spacing)) * 2)}.tw\\:mb-3{margin-bottom:calc(calc(var(--spacing)) * 3)}.tw\\:mb-4{margin-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:ml-1{margin-left:calc(calc(var(--spacing)) * 1)}.tw\\:ml-2{margin-left:calc(calc(var(--spacing)) * 2)}.tw\\:ml-4{margin-left:calc(calc(var(--spacing)) * 4)}.tw\\:ml-auto{margin-left:auto}.tw\\:box-border{box-sizing:border-box}.tw\\:line-clamp-3{-webkit-line-clamp:3;-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden}.tw\\:no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}.tw\\:no-scrollbar::-webkit-scrollbar{display:none}.tw\\:block{display:block}.tw\\:flex{display:flex}.tw\\:grid{display:grid}.tw\\:hidden{display:none}.tw\\:inline-block{display:inline-block}.tw\\:inline-flex{display:inline-flex}.tw\\:inline-grid{display:inline-grid}.tw\\:field-sizing-content{field-sizing:content}.tw\\:aspect-square{aspect-ratio:1}.tw\\:size-2{width:calc(calc(var(--spacing)) * 2);height:calc(calc(var(--spacing)) * 2)}.tw\\:size-2\\.5{width:calc(calc(var(--spacing)) * 2.5);height:calc(calc(var(--spacing)) * 2.5)}.tw\\:size-3{width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:size-3\\.5{width:calc(calc(var(--spacing)) * 3.5);height:calc(calc(var(--spacing)) * 3.5)}.tw\\:size-4{width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:size-6{width:calc(calc(var(--spacing)) * 6);height:calc(calc(var(--spacing)) * 6)}.tw\\:size-7{width:calc(calc(var(--spacing)) * 7);height:calc(calc(var(--spacing)) * 7)}.tw\\:size-8{width:calc(calc(var(--spacing)) * 8);height:calc(calc(var(--spacing)) * 8)}.tw\\:size-9{width:calc(calc(var(--spacing)) * 9);height:calc(calc(var(--spacing)) * 9)}.tw\\:size-10{width:calc(calc(var(--spacing)) * 10);height:calc(calc(var(--spacing)) * 10)}.tw\\:size-full{width:100%;height:100%}.tw\\:h-1{height:calc(calc(var(--spacing)) * 1)}.tw\\:h-2{height:calc(calc(var(--spacing)) * 2)}.tw\\:h-3{height:calc(calc(var(--spacing)) * 3)}.tw\\:h-3\\.5{height:calc(calc(var(--spacing)) * 3.5)}.tw\\:h-4{height:calc(calc(var(--spacing)) * 4)}.tw\\:h-5{height:calc(calc(var(--spacing)) * 5)}.tw\\:h-6{height:calc(calc(var(--spacing)) * 6)}.tw\\:h-7{height:calc(calc(var(--spacing)) * 7)}.tw\\:h-8{height:calc(calc(var(--spacing)) * 8)}.tw\\:h-8\\!{height:calc(calc(var(--spacing)) * 8)!important}.tw\\:h-8\\.5{height:calc(calc(var(--spacing)) * 8.5)}.tw\\:h-9{height:calc(calc(var(--spacing)) * 9)}.tw\\:h-10{height:calc(calc(var(--spacing)) * 10)}.tw\\:h-12{height:calc(calc(var(--spacing)) * 12)}.tw\\:h-14{height:calc(calc(var(--spacing)) * 14)}.tw\\:h-20{height:calc(calc(var(--spacing)) * 20)}.tw\\:h-24{height:calc(calc(var(--spacing)) * 24)}.tw\\:h-32{height:calc(calc(var(--spacing)) * 32)}.tw\\:h-40{height:calc(calc(var(--spacing)) * 40)}.tw\\:h-64{height:calc(calc(var(--spacing)) * 64)}.tw\\:h-80{height:calc(calc(var(--spacing)) * 80)}.tw\\:h-96{height:calc(calc(var(--spacing)) * 96)}.tw\\:h-\\[5px\\]{height:5px}.tw\\:h-\\[260px\\]{height:260px}.tw\\:h-\\[300px\\]{height:300px}.tw\\:h-\\[400px\\]{height:400px}.tw\\:h-\\[600px\\]{height:600px}.tw\\:h-\\[calc\\(100\\%-1px\\)\\]{height:calc(100% - 1px)}.tw\\:h-\\[calc\\(100\\%-2px\\)\\]{height:calc(100% - 2px)}.tw\\:h-auto{height:auto}.tw\\:h-full{height:100%}.tw\\:h-px{height:1px}.tw\\:h-screen{height:100vh}.tw\\:h-svh{height:100svh}.tw\\:max-h-\\(--radix-context-menu-content-available-height\\){max-height:var(--radix-context-menu-content-available-height)}.tw\\:max-h-\\(--radix-dropdown-menu-content-available-height\\){max-height:var(--radix-dropdown-menu-content-available-height)}.tw\\:max-h-\\(--radix-popover-content-available-height\\){max-height:var(--radix-popover-content-available-height)}.tw\\:max-h-\\(--radix-select-content-available-height\\){max-height:var(--radix-select-content-available-height)}.tw\\:max-h-5{max-height:calc(calc(var(--spacing)) * 5)}.tw\\:max-h-10{max-height:calc(calc(var(--spacing)) * 10)}.tw\\:max-h-72{max-height:calc(calc(var(--spacing)) * 72)}.tw\\:max-h-80{max-height:calc(calc(var(--spacing)) * 80)}.tw\\:max-h-\\[96\\%\\]{max-height:96%}.tw\\:max-h-\\[300px\\]{max-height:300px}.tw\\:max-h-\\[calc\\(var\\(--radix-dropdown-menu-content-available-height\\,100vh\\)\\/var\\(--platform-content-zoom-popup-factor\\,1\\)\\)\\]{max-height:calc(var(--radix-dropdown-menu-content-available-height,100vh) / var(--platform-content-zoom-popup-factor,1))}.tw\\:max-h-\\[calc\\(var\\(--radix-popover-content-available-height\\,100vh\\)\\/var\\(--platform-content-zoom-popup-factor\\,1\\)\\)\\]{max-height:calc(var(--radix-popover-content-available-height,100vh) / var(--platform-content-zoom-popup-factor,1))}.tw\\:min-h-0{min-height:calc(calc(var(--spacing)) * 0)}.tw\\:min-h-11{min-height:calc(calc(var(--spacing)) * 11)}.tw\\:min-h-16{min-height:calc(calc(var(--spacing)) * 16)}.tw\\:min-h-\\[200px\\]{min-height:200px}.tw\\:min-h-full{min-height:100%}.tw\\:min-h-svh{min-height:100svh}.tw\\:w-\\(--radix-dropdown-menu-trigger-width\\){width:var(--radix-dropdown-menu-trigger-width)}.tw\\:w-\\(--sidebar-width\\){width:var(--sidebar-width)}.tw\\:w-1{width:calc(calc(var(--spacing)) * 1)}.tw\\:w-1\\/2{width:50%}.tw\\:w-1\\/4{width:25%}.tw\\:w-1\\/6{width:16.6667%}.tw\\:w-2{width:calc(calc(var(--spacing)) * 2)}.tw\\:w-3{width:calc(calc(var(--spacing)) * 3)}.tw\\:w-3\\.5{width:calc(calc(var(--spacing)) * 3.5)}.tw\\:w-3\\/4{width:75%}.tw\\:w-4{width:calc(calc(var(--spacing)) * 4)}.tw\\:w-4\\/5{width:80%}.tw\\:w-4\\/6{width:66.6667%}.tw\\:w-5{width:calc(calc(var(--spacing)) * 5)}.tw\\:w-5\\/6{width:83.3333%}.tw\\:w-6{width:calc(calc(var(--spacing)) * 6)}.tw\\:w-7{width:calc(calc(var(--spacing)) * 7)}.tw\\:w-8{width:calc(calc(var(--spacing)) * 8)}.tw\\:w-9{width:calc(calc(var(--spacing)) * 9)}.tw\\:w-9\\/12{width:75%}.tw\\:w-10{width:calc(calc(var(--spacing)) * 10)}.tw\\:w-12{width:calc(calc(var(--spacing)) * 12)}.tw\\:w-14{width:calc(calc(var(--spacing)) * 14)}.tw\\:w-20{width:calc(calc(var(--spacing)) * 20)}.tw\\:w-24{width:calc(calc(var(--spacing)) * 24)}.tw\\:w-32{width:calc(calc(var(--spacing)) * 32)}.tw\\:w-48{width:calc(calc(var(--spacing)) * 48)}.tw\\:w-56{width:calc(calc(var(--spacing)) * 56)}.tw\\:w-60{width:calc(calc(var(--spacing)) * 60)}.tw\\:w-64{width:calc(calc(var(--spacing)) * 64)}.tw\\:w-72{width:calc(calc(var(--spacing)) * 72)}.tw\\:w-80{width:calc(calc(var(--spacing)) * 80)}.tw\\:w-96{width:calc(calc(var(--spacing)) * 96)}.tw\\:w-\\[1px\\]{width:1px}.tw\\:w-\\[5px\\]{width:5px}.tw\\:w-\\[70px\\]{width:70px}.tw\\:w-\\[100px\\]{width:100px}.tw\\:w-\\[116px\\]{width:116px}.tw\\:w-\\[124px\\]{width:124px}.tw\\:w-\\[150px\\]{width:150px}.tw\\:w-\\[180px\\]{width:180px}.tw\\:w-\\[200px\\]{width:200px}.tw\\:w-\\[250px\\]{width:250px}.tw\\:w-\\[260px\\]{width:260px}.tw\\:w-\\[280px\\]{width:280px}.tw\\:w-\\[300px\\]{width:300px}.tw\\:w-\\[320px\\]{width:320px}.tw\\:w-\\[350px\\]{width:350px}.tw\\:w-\\[400px\\]{width:400px}.tw\\:w-\\[420px\\]{width:420px}.tw\\:w-\\[500px\\]{width:500px}.tw\\:w-\\[560px\\]{width:560px}.tw\\:w-\\[600px\\]{width:600px}.tw\\:w-\\[calc\\(100\\%-2px\\)\\]{width:calc(100% - 2px)}.tw\\:w-\\[var\\(--radix-dropdown-menu-trigger-width\\)\\]{width:var(--radix-dropdown-menu-trigger-width)}.tw\\:w-auto{width:auto}.tw\\:w-fit{width:fit-content}.tw\\:w-full{width:100%}.tw\\:w-max{width:max-content}.tw\\:w-px{width:1px}.tw\\:max-w-\\(--skeleton-width\\){max-width:var(--skeleton-width)}.tw\\:max-w-0{max-width:calc(calc(var(--spacing)) * 0)}.tw\\:max-w-2xl{max-width:var(--tw-container-2xl)}.tw\\:max-w-3xl{max-width:var(--tw-container-3xl)}.tw\\:max-w-4xl{max-width:var(--tw-container-4xl)}.tw\\:max-w-5{max-width:calc(calc(var(--spacing)) * 5)}.tw\\:max-w-6xl{max-width:var(--tw-container-6xl)}.tw\\:max-w-40{max-width:calc(calc(var(--spacing)) * 40)}.tw\\:max-w-48{max-width:calc(calc(var(--spacing)) * 48)}.tw\\:max-w-64{max-width:calc(calc(var(--spacing)) * 64)}.tw\\:max-w-96{max-width:calc(calc(var(--spacing)) * 96)}.tw\\:max-w-\\[200px\\]{max-width:200px}.tw\\:max-w-\\[220px\\]{max-width:220px}.tw\\:max-w-\\[calc\\(100\\%-2rem\\)\\]{max-width:calc(100% - 2rem)}.tw\\:max-w-\\[calc\\(100vw-2rem\\)\\]{max-width:calc(100vw - 2rem)}.tw\\:max-w-\\[calc\\(var\\(--radix-dropdown-menu-content-available-width\\,100vw\\)\\/var\\(--platform-content-zoom-popup-factor\\,1\\)\\)\\]{max-width:calc(var(--radix-dropdown-menu-content-available-width,100vw) / var(--platform-content-zoom-popup-factor,1))}.tw\\:max-w-\\[calc\\(var\\(--radix-popover-content-available-width\\,100vw\\)\\/var\\(--platform-content-zoom-popup-factor\\,1\\)\\)\\]{max-width:calc(var(--radix-popover-content-available-width,100vw) / var(--platform-content-zoom-popup-factor,1))}.tw\\:max-w-\\[min\\(20rem\\,calc\\(var\\(--radix-tooltip-content-available-width\\,100vw\\)\\/var\\(--platform-content-zoom-popup-factor\\,1\\)\\)\\)\\]{max-width:min(20rem, calc(var(--radix-tooltip-content-available-width,100vw) / var(--platform-content-zoom-popup-factor,1)))}.tw\\:max-w-fit{max-width:fit-content}.tw\\:max-w-full{max-width:100%}.tw\\:max-w-lg{max-width:var(--tw-container-lg)}.tw\\:max-w-md{max-width:var(--tw-container-md)}.tw\\:max-w-none{max-width:none}.tw\\:max-w-sm{max-width:var(--tw-container-sm)}.tw\\:max-w-xs{max-width:var(--tw-container-xs)}.tw\\:min-w-0{min-width:calc(calc(var(--spacing)) * 0)}.tw\\:min-w-4{min-width:calc(calc(var(--spacing)) * 4)}.tw\\:min-w-5{min-width:calc(calc(var(--spacing)) * 5)}.tw\\:min-w-7{min-width:calc(calc(var(--spacing)) * 7)}.tw\\:min-w-8{min-width:calc(calc(var(--spacing)) * 8)}.tw\\:min-w-9{min-width:calc(calc(var(--spacing)) * 9)}.tw\\:min-w-16{min-width:calc(calc(var(--spacing)) * 16)}.tw\\:min-w-32{min-width:calc(calc(var(--spacing)) * 32)}.tw\\:min-w-36{min-width:calc(calc(var(--spacing)) * 36)}.tw\\:min-w-80{min-width:calc(calc(var(--spacing)) * 80)}.tw\\:min-w-\\[12rem\\]{min-width:12rem}.tw\\:min-w-\\[26px\\]{min-width:26px}.tw\\:min-w-\\[96px\\]{min-width:96px}.tw\\:min-w-\\[140px\\]{min-width:140px}.tw\\:min-w-\\[215px\\]{min-width:215px}.tw\\:min-w-\\[500px\\]{min-width:500px}.tw\\:min-w-min{min-width:min-content}.tw\\:flex-1{flex:1}.tw\\:shrink{flex-shrink:1}.tw\\:shrink\\!{flex-shrink:1!important}.tw\\:shrink-0{flex-shrink:0}.tw\\:shrink-\\[9999\\]{flex-shrink:9999}.tw\\:flex-grow,.tw\\:grow,.tw\\:grow-\\[1\\]{flex-grow:1}.tw\\:grow-\\[10\\]{flex-grow:10}.tw\\:basis-0{flex-basis:calc(calc(var(--spacing)) * 0)}.tw\\:table-fixed{table-layout:fixed}.tw\\:caption-bottom{caption-side:bottom}.tw\\:border-collapse{border-collapse:collapse}.tw\\:origin-\\(--radix-context-menu-content-transform-origin\\){transform-origin:var(--radix-context-menu-content-transform-origin)}.tw\\:origin-\\(--radix-dropdown-menu-content-transform-origin\\){transform-origin:var(--radix-dropdown-menu-content-transform-origin)}.tw\\:origin-\\(--radix-menubar-content-transform-origin\\){transform-origin:var(--radix-menubar-content-transform-origin)}.tw\\:origin-\\(--radix-popover-content-transform-origin\\){transform-origin:var(--radix-popover-content-transform-origin)}.tw\\:origin-\\(--radix-select-content-transform-origin\\){transform-origin:var(--radix-select-content-transform-origin)}.tw\\:origin-\\(--radix-tooltip-content-transform-origin\\){transform-origin:var(--radix-tooltip-content-transform-origin)}.tw\\:-translate-x-1\\/2{--tw-translate-x:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:-translate-x-px{--tw-translate-x:-1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:translate-x-px{--tw-translate-x:1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:-translate-y-1\\/2{--tw-translate-y:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:translate-y-0{--tw-translate-y:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:translate-y-px{--tw-translate-y:1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rotate-45{rotate:45deg}.tw\\:rotate-180{rotate:180deg}.tw\\:transform{transform:var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,)}.tw\\:animate-none\\!{animation:none!important}.tw\\:animate-pulse{animation:var(--tw-animate-pulse)}.tw\\:animate-spin{animation:var(--tw-animate-spin)}.tw\\:cursor-default{cursor:default}.tw\\:cursor-ew-resize{cursor:ew-resize}.tw\\:cursor-not-allowed{cursor:not-allowed}.tw\\:cursor-pointer{cursor:pointer}.tw\\:cursor-text{cursor:text}.tw\\:touch-none{touch-action:none}.tw\\:resize{resize:both}.tw\\:resize-none{resize:none}.tw\\:scroll-m-20{scroll-margin:calc(calc(var(--spacing)) * 20)}.tw\\:scroll-my-1{scroll-margin-block:calc(calc(var(--spacing)) * 1)}.tw\\:scroll-py-1{scroll-padding-block:calc(calc(var(--spacing)) * 1)}.tw\\:list-inside{list-style-position:inside}.tw\\:list-outside{list-style-position:outside}.tw\\:\\!list-\\[lower-alpha\\]{list-style-type:lower-alpha!important}.tw\\:\\!list-\\[lower-roman\\]{list-style-type:lower-roman!important}.tw\\:\\!list-\\[upper-alpha\\]{list-style-type:upper-alpha!important}.tw\\:\\!list-\\[upper-roman\\]{list-style-type:upper-roman!important}.tw\\:\\!list-decimal{list-style-type:decimal!important}.tw\\:\\!list-disc{list-style-type:disc!important}.tw\\:list-decimal{list-style-type:decimal}.tw\\:list-disc{list-style-type:disc}.tw\\:list-none{list-style-type:none}.tw\\:grid-flow-col{grid-auto-flow:column}.tw\\:grid-flow-row{grid-auto-flow:row}.tw\\:auto-rows-min{grid-auto-rows:min-content}.tw\\:grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}.tw\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.tw\\:grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.tw\\:grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}.tw\\:grid-cols-\\[25\\%_25\\%_50\\%\\]{grid-template-columns:25% 25% 50%}.tw\\:grid-cols-\\[25\\%_50\\%_25\\%\\]{grid-template-columns:25% 50% 25%}.tw\\:grid-cols-\\[auto_auto_auto_auto\\]{grid-template-columns:auto auto auto auto}.tw\\:grid-cols-\\[min-content_1fr\\]{grid-template-columns:min-content 1fr}.tw\\:grid-cols-\\[min-content_min-content_1fr\\]{grid-template-columns:min-content min-content 1fr}.tw\\:grid-cols-subgrid{grid-template-columns:subgrid}.tw\\:flex-col{flex-direction:column}.tw\\:flex-col-reverse{flex-direction:column-reverse}.tw\\:flex-row{flex-direction:row}.tw\\:flex-row-reverse{flex-direction:row-reverse}.tw\\:flex-nowrap{flex-wrap:nowrap}.tw\\:flex-wrap{flex-wrap:wrap}.tw\\:place-content-center{place-content:center}.tw\\:content-center{align-content:center}.tw\\:items-baseline{align-items:baseline}.tw\\:items-center{align-items:center}.tw\\:items-end{align-items:flex-end}.tw\\:items-start{align-items:flex-start}.tw\\:items-stretch{align-items:stretch}.tw\\:justify-between{justify-content:space-between}.tw\\:justify-center{justify-content:center}.tw\\:justify-end{justify-content:flex-end}.tw\\:justify-start{justify-content:flex-start}.tw\\:gap-0{gap:calc(calc(var(--spacing)) * 0)}.tw\\:gap-0\\.5{gap:calc(calc(var(--spacing)) * .5)}.tw\\:gap-1{gap:calc(calc(var(--spacing)) * 1)}.tw\\:gap-1\\.5{gap:calc(calc(var(--spacing)) * 1.5)}.tw\\:gap-1\\.5\\!{gap:calc(calc(var(--spacing)) * 1.5)!important}.tw\\:gap-2{gap:calc(calc(var(--spacing)) * 2)}.tw\\:gap-2\\.5{gap:calc(calc(var(--spacing)) * 2.5)}.tw\\:gap-3{gap:calc(calc(var(--spacing)) * 3)}.tw\\:gap-4{gap:calc(calc(var(--spacing)) * 4)}.tw\\:gap-5{gap:calc(calc(var(--spacing)) * 5)}.tw\\:gap-6{gap:calc(calc(var(--spacing)) * 6)}.tw\\:gap-8{gap:calc(calc(var(--spacing)) * 8)}.tw\\:gap-16{gap:calc(calc(var(--spacing)) * 16)}.tw\\:gap-\\[--spacing\\(var\\(--gap\\)\\)\\]{gap:calc(calc(var(--spacing)) * var(--gap))}.tw\\:gap-\\[12px\\]{gap:12px}:where(.tw\\:space-y-1>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 1) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 1) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-1\\.5>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 1.5) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 1.5) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-2>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 2) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 2) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-3>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 3) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 3) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-4>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 4) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 4) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-6>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 6) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 6) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-8>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 8) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 8) * calc(1 - var(--tw-space-y-reverse)))}.tw\\:gap-x-1{column-gap:calc(calc(var(--spacing)) * 1)}.tw\\:gap-x-2{column-gap:calc(calc(var(--spacing)) * 2)}.tw\\:gap-x-3{column-gap:calc(calc(var(--spacing)) * 3)}.tw\\:gap-x-4{column-gap:calc(calc(var(--spacing)) * 4)}:where(.tw\\:-space-x-2>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * -2) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * -2) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-2>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 2) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 2) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-3>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 3) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 3) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-4>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 4) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 4) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-6>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 6) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 6) * calc(1 - var(--tw-space-x-reverse)))}.tw\\:gap-y-1{row-gap:calc(calc(var(--spacing)) * 1)}.tw\\:gap-y-2{row-gap:calc(calc(var(--spacing)) * 2)}:where(.tw\\:divide-x>:not(:last-child)){--tw-divide-x-reverse:0;border-inline-style:var(--tw-border-style);border-inline-start-width:calc(1px * var(--tw-divide-x-reverse));border-inline-end-width:calc(1px * calc(1 - var(--tw-divide-x-reverse)))}:where(.tw\\:divide-y>:not(:last-child)){--tw-divide-y-reverse:0;border-bottom-style:var(--tw-border-style);border-top-style:var(--tw-border-style);border-top-width:calc(1px * var(--tw-divide-y-reverse));border-bottom-width:calc(1px * calc(1 - var(--tw-divide-y-reverse)))}.tw\\:self-start{align-self:flex-start}.tw\\:self-stretch{align-self:stretch}.tw\\:justify-self-end{justify-self:flex-end}.tw\\:truncate{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.tw\\:overflow-auto{overflow:auto}.tw\\:overflow-clip{overflow:clip}.tw\\:overflow-hidden{overflow:hidden}.tw\\:overflow-scroll{overflow:scroll}.tw\\:overflow-visible{overflow:visible}.tw\\:overflow-x-auto{overflow-x:auto}.tw\\:overflow-x-hidden{overflow-x:hidden}.tw\\:overflow-y-auto{overflow-y:auto}.tw\\:overflow-y-hidden{overflow-y:hidden}.tw\\:rounded{border-radius:.25rem}.tw\\:rounded-2xl{border-radius:calc(var(--radius) * 1.8)}.tw\\:rounded-4xl{border-radius:calc(var(--radius) * 2.6)}.tw\\:rounded-\\[4px\\]{border-radius:4px}.tw\\:rounded-\\[6px\\]{border-radius:6px}.tw\\:rounded-\\[calc\\(var\\(--radius\\)-3px\\)\\]{border-radius:calc(var(--radius) - 3px)}.tw\\:rounded-\\[min\\(var\\(--tw-radius-md\\)\\,10px\\)\\]{border-radius:min(var(--tw-radius-md), 10px)}.tw\\:rounded-\\[min\\(var\\(--tw-radius-md\\)\\,12px\\)\\]{border-radius:min(var(--tw-radius-md), 12px)}.tw\\:rounded-full{border-radius:3.40282e38px}.tw\\:rounded-lg{border-radius:var(--radius)}.tw\\:rounded-lg\\!{border-radius:var(--radius)!important}.tw\\:rounded-md{border-radius:calc(var(--radius) * .8)}.tw\\:rounded-none{border-radius:0}.tw\\:rounded-sm{border-radius:calc(var(--radius) * .6)}.tw\\:rounded-xl{border-radius:calc(var(--radius) * 1.4)}.tw\\:rounded-xl\\!{border-radius:calc(var(--radius) * 1.4)!important}.tw\\:rounded-xs{border-radius:var(--tw-radius-xs)}.tw\\:rounded-s-none{border-start-start-radius:0;border-end-start-radius:0}.tw\\:rounded-e-none{border-start-end-radius:0;border-end-end-radius:0}.tw\\:rounded-t-xl{border-top-left-radius:calc(var(--radius) * 1.4);border-top-right-radius:calc(var(--radius) * 1.4)}.tw\\:rounded-l-lg{border-top-left-radius:var(--radius);border-bottom-left-radius:var(--radius)}.tw\\:rounded-r-xl{border-top-right-radius:calc(var(--radius) * 1.4);border-bottom-right-radius:calc(var(--radius) * 1.4)}.tw\\:rounded-b-xl{border-bottom-right-radius:calc(var(--radius) * 1.4);border-bottom-left-radius:calc(var(--radius) * 1.4)}.tw\\:border{border-style:var(--tw-border-style);border-width:1px}.tw\\:border-0{border-style:var(--tw-border-style);border-width:0}.tw\\:border-2{border-style:var(--tw-border-style);border-width:2px}.tw\\:border-s{border-inline-start-style:var(--tw-border-style);border-inline-start-width:1px}.tw\\:border-s-0{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:border-s-2{border-inline-start-style:var(--tw-border-style);border-inline-start-width:2px}.tw\\:border-s-4{border-inline-start-style:var(--tw-border-style);border-inline-start-width:4px}.tw\\:border-e{border-inline-end-style:var(--tw-border-style);border-inline-end-width:1px}.tw\\:border-e-0{border-inline-end-style:var(--tw-border-style);border-inline-end-width:0}.tw\\:border-t{border-top-style:var(--tw-border-style);border-top-width:1px}.tw\\:border-t-0{border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:border-b{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}.tw\\:border-b-0{border-bottom-style:var(--tw-border-style);border-bottom-width:0}.tw\\:border-l-2{border-left-style:var(--tw-border-style);border-left-width:2px}.tw\\:border-l-4{border-left-style:var(--tw-border-style);border-left-width:4px}.tw\\:border-dashed{--tw-border-style:dashed;border-style:dashed}.tw\\:border-none{--tw-border-style:none;border-style:none}.tw\\:border-solid{--tw-border-style:solid;border-style:solid}.tw\\:border-black{border-color:var(--tw-color-black)}.tw\\:border-blue-400{border-color:var(--tw-color-blue-400)}.tw\\:border-blue-500{border-color:var(--tw-color-blue-500)}.tw\\:border-border,.tw\\:border-border\\/50{border-color:var(--border)}@supports (color:color-mix(in lab, red, red)){.tw\\:border-border\\/50{border-color:color-mix(in oklab, var(--border) 50%, transparent)}}.tw\\:border-destructive{border-color:var(--destructive)}.tw\\:border-foreground{border-color:var(--foreground)}.tw\\:border-gray-300{border-color:var(--tw-color-gray-300)}.tw\\:border-input,.tw\\:border-input\\/30{border-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:border-input\\/30{border-color:color-mix(in oklab, var(--input) 30%, transparent)}}.tw\\:border-muted-foreground,.tw\\:border-muted-foreground\\/40{border-color:var(--muted-foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:border-muted-foreground\\/40{border-color:color-mix(in oklab, var(--muted-foreground) 40%, transparent)}}.tw\\:border-primary{border-color:var(--primary)}.tw\\:border-red-300{border-color:var(--tw-color-red-300)}.tw\\:border-red-400{border-color:var(--tw-color-red-400)}.tw\\:border-red-500{border-color:var(--tw-color-red-500)}.tw\\:border-red-600{border-color:var(--tw-color-red-600)}.tw\\:border-ring{border-color:var(--ring)}.tw\\:border-sidebar-border{border-color:var(--sidebar-border)}.tw\\:border-slate-300{border-color:var(--tw-color-slate-300)}.tw\\:border-transparent{border-color:#0000}.tw\\:border-yellow-400{border-color:var(--tw-color-yellow-400)}.tw\\:border-yellow-500{border-color:var(--tw-color-yellow-500)}.tw\\:border-s-amber-200{border-inline-start-color:var(--tw-color-amber-200)}.tw\\:border-s-indigo-200{border-inline-start-color:var(--tw-color-indigo-200)}.tw\\:border-s-purple-200{border-inline-start-color:var(--tw-color-purple-200)}.tw\\:border-s-red-200{border-inline-start-color:var(--tw-color-red-200)}.tw\\:\\!bg-destructive\\/50{background-color:var(--destructive)!important}@supports (color:color-mix(in lab, red, red)){.tw\\:\\!bg-destructive\\/50{background-color:color-mix(in oklab, var(--destructive) 50%, transparent)!important}}.tw\\:bg-\\[color-mix\\(in_oklab\\,var\\(--destructive\\)_10\\%\\,var\\(--background\\)\\)\\]{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-\\[color-mix\\(in_oklab\\,var\\(--destructive\\)_10\\%\\,var\\(--background\\)\\)\\]{background-color:color-mix(in oklab,var(--destructive) 10%,var(--background))}}.tw\\:bg-accent,.tw\\:bg-accent\\/50{background-color:var(--accent)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-accent\\/50{background-color:color-mix(in oklab, var(--accent) 50%, transparent)}}.tw\\:bg-amber-500,.tw\\:bg-amber-500\\/5{background-color:var(--tw-color-amber-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-amber-500\\/5{background-color:color-mix(in oklab, var(--tw-color-amber-500) 5%, transparent)}}.tw\\:bg-amber-500\\/15{background-color:var(--tw-color-amber-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-amber-500\\/15{background-color:color-mix(in oklab, var(--tw-color-amber-500) 15%, transparent)}}.tw\\:bg-background,.tw\\:bg-background\\/50{background-color:var(--background)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-background\\/50{background-color:color-mix(in oklab, var(--background) 50%, transparent)}}.tw\\:bg-black\\/10{background-color:var(--tw-color-black)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-black\\/10{background-color:color-mix(in oklab, var(--tw-color-black) 10%, transparent)}}.tw\\:bg-blue-50{background-color:var(--tw-color-blue-50)}.tw\\:bg-blue-100{background-color:var(--tw-color-blue-100)}.tw\\:bg-blue-400{background-color:var(--tw-color-blue-400)}.tw\\:bg-blue-500{background-color:var(--tw-color-blue-500)}.tw\\:bg-border{background-color:var(--border)}.tw\\:bg-card{background-color:var(--card)}.tw\\:bg-destructive\\/10{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-destructive\\/10{background-color:color-mix(in oklab, var(--destructive) 10%, transparent)}}.tw\\:bg-foreground{background-color:var(--foreground)}.tw\\:bg-gray-50{background-color:var(--tw-color-gray-50)}.tw\\:bg-gray-100{background-color:var(--tw-color-gray-100)}.tw\\:bg-gray-500{background-color:var(--tw-color-gray-500)}.tw\\:bg-green-50{background-color:var(--tw-color-green-50)}.tw\\:bg-green-100{background-color:var(--tw-color-green-100)}.tw\\:bg-green-500{background-color:var(--tw-color-green-500)}.tw\\:bg-input,.tw\\:bg-input\\/30{background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-input\\/30{background-color:color-mix(in oklab, var(--input) 30%, transparent)}}.tw\\:bg-muted,.tw\\:bg-muted\\/50{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-muted\\/50{background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:bg-neutral-300{background-color:var(--tw-color-neutral-300)}.tw\\:bg-orange-100{background-color:var(--tw-color-orange-100)}.tw\\:bg-popover,.tw\\:bg-popover\\/70{background-color:var(--popover)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-popover\\/70{background-color:color-mix(in oklab, var(--popover) 70%, transparent)}}.tw\\:bg-primary{background-color:var(--primary)}.tw\\:bg-primary-foreground{background-color:var(--primary-foreground)}.tw\\:bg-primary\\/30{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-primary\\/30{background-color:color-mix(in oklab, var(--primary) 30%, transparent)}}.tw\\:bg-purple-50{background-color:var(--tw-color-purple-50)}.tw\\:bg-red-100{background-color:var(--tw-color-red-100)}.tw\\:bg-red-500{background-color:var(--tw-color-red-500)}.tw\\:bg-rose-500,.tw\\:bg-rose-500\\/5{background-color:var(--tw-color-rose-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-rose-500\\/5{background-color:color-mix(in oklab, var(--tw-color-rose-500) 5%, transparent)}}.tw\\:bg-rose-500\\/15{background-color:var(--tw-color-rose-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-rose-500\\/15{background-color:color-mix(in oklab, var(--tw-color-rose-500) 15%, transparent)}}.tw\\:bg-secondary{background-color:var(--secondary)}.tw\\:bg-sidebar{background-color:var(--sidebar)}.tw\\:bg-sidebar-accent{background-color:var(--sidebar-accent)}.tw\\:bg-sidebar-border{background-color:var(--sidebar-border)}.tw\\:bg-sky-500,.tw\\:bg-sky-500\\/5{background-color:var(--tw-color-sky-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-sky-500\\/5{background-color:color-mix(in oklab, var(--tw-color-sky-500) 5%, transparent)}}.tw\\:bg-sky-500\\/15{background-color:var(--tw-color-sky-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-sky-500\\/15{background-color:color-mix(in oklab, var(--tw-color-sky-500) 15%, transparent)}}.tw\\:bg-teal-500,.tw\\:bg-teal-500\\/5{background-color:var(--tw-color-teal-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-teal-500\\/5{background-color:color-mix(in oklab, var(--tw-color-teal-500) 5%, transparent)}}.tw\\:bg-teal-500\\/15{background-color:var(--tw-color-teal-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-teal-500\\/15{background-color:color-mix(in oklab, var(--tw-color-teal-500) 15%, transparent)}}.tw\\:bg-transparent{background-color:#0000}.tw\\:bg-white{background-color:var(--tw-color-white)}.tw\\:bg-yellow-50{background-color:var(--tw-color-yellow-50)}.tw\\:bg-yellow-100{background-color:var(--tw-color-yellow-100)}.tw\\:bg-yellow-500{background-color:var(--tw-color-yellow-500)}.tw\\:bg-zinc-400{background-color:var(--tw-color-zinc-400)}.tw\\:bg-gradient-to-t{--tw-gradient-position:to top in oklab;background-image:linear-gradient(var(--tw-gradient-stops))}.tw\\:from-popover{--tw-gradient-from:var(--popover);--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))}.tw\\:to-transparent{--tw-gradient-to:transparent;--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))}.tw\\:bg-clip-padding{background-clip:padding-box}.tw\\:fill-\\[color-mix\\(in_oklab\\,var\\(--destructive\\)_10\\%\\,var\\(--background\\)\\)\\]{fill:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:fill-\\[color-mix\\(in_oklab\\,var\\(--destructive\\)_10\\%\\,var\\(--background\\)\\)\\]{fill:color-mix(in oklab,var(--destructive) 10%,var(--background))}}.tw\\:fill-destructive{fill:var(--destructive)}.tw\\:fill-foreground{fill:var(--foreground)}.tw\\:fill-yellow-400,.tw\\:fill-yellow-400\\/50{fill:var(--tw-color-yellow-400)}@supports (color:color-mix(in lab, red, red)){.tw\\:fill-yellow-400\\/50{fill:color-mix(in oklab, var(--tw-color-yellow-400) 50%, transparent)}}.tw\\:object-cover{object-fit:cover}.tw\\:\\!p-4{padding:calc(calc(var(--spacing)) * 4)!important}.tw\\:p-0{padding:calc(calc(var(--spacing)) * 0)}.tw\\:p-0\\.5{padding:calc(calc(var(--spacing)) * .5)}.tw\\:p-1{padding:calc(calc(var(--spacing)) * 1)}.tw\\:p-2{padding:calc(calc(var(--spacing)) * 2)}.tw\\:p-2\\.5{padding:calc(calc(var(--spacing)) * 2.5)}.tw\\:p-3{padding:calc(calc(var(--spacing)) * 3)}.tw\\:p-4{padding:calc(calc(var(--spacing)) * 4)}.tw\\:p-6{padding:calc(calc(var(--spacing)) * 6)}.tw\\:p-8{padding:calc(calc(var(--spacing)) * 8)}.tw\\:p-\\[1px\\]{padding:1px}.tw\\:p-\\[3px\\]{padding:3px}.tw\\:p-\\[10px\\]{padding:10px}.tw\\:p-\\[16px\\]{padding:16px}.tw\\:px-0{padding-inline:calc(calc(var(--spacing)) * 0)}.tw\\:px-0\\.5{padding-inline:calc(calc(var(--spacing)) * .5)}.tw\\:px-1{padding-inline:calc(calc(var(--spacing)) * 1)}.tw\\:px-1\\.5{padding-inline:calc(calc(var(--spacing)) * 1.5)}.tw\\:px-2{padding-inline:calc(calc(var(--spacing)) * 2)}.tw\\:px-2\\.5{padding-inline:calc(calc(var(--spacing)) * 2.5)}.tw\\:px-3{padding-inline:calc(calc(var(--spacing)) * 3)}.tw\\:px-4{padding-inline:calc(calc(var(--spacing)) * 4)}.tw\\:px-6{padding-inline:calc(calc(var(--spacing)) * 6)}.tw\\:py-0{padding-block:calc(calc(var(--spacing)) * 0)}.tw\\:py-0\\.5{padding-block:calc(calc(var(--spacing)) * .5)}.tw\\:py-1{padding-block:calc(calc(var(--spacing)) * 1)}.tw\\:py-1\\.5{padding-block:calc(calc(var(--spacing)) * 1.5)}.tw\\:py-2{padding-block:calc(calc(var(--spacing)) * 2)}.tw\\:py-3{padding-block:calc(calc(var(--spacing)) * 3)}.tw\\:py-4{padding-block:calc(calc(var(--spacing)) * 4)}.tw\\:py-6{padding-block:calc(calc(var(--spacing)) * 6)}.tw\\:py-8{padding-block:calc(calc(var(--spacing)) * 8)}.tw\\:py-\\[2px\\]{padding-block:2px}.tw\\:ps-1\\.5{padding-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:ps-2{padding-inline-start:calc(calc(var(--spacing)) * 2)}.tw\\:ps-2\\.5{padding-inline-start:calc(calc(var(--spacing)) * 2.5)}.tw\\:ps-4{padding-inline-start:calc(calc(var(--spacing)) * 4)}.tw\\:ps-6{padding-inline-start:calc(calc(var(--spacing)) * 6)}.tw\\:ps-7{padding-inline-start:calc(calc(var(--spacing)) * 7)}.tw\\:ps-8{padding-inline-start:calc(calc(var(--spacing)) * 8)}.tw\\:ps-9{padding-inline-start:calc(calc(var(--spacing)) * 9)}.tw\\:ps-12{padding-inline-start:calc(calc(var(--spacing)) * 12)}.tw\\:ps-\\[85px\\]{padding-inline-start:85px}.tw\\:pe-1{padding-inline-end:calc(calc(var(--spacing)) * 1)}.tw\\:pe-1\\.5{padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:pe-2{padding-inline-end:calc(calc(var(--spacing)) * 2)}.tw\\:pe-4{padding-inline-end:calc(calc(var(--spacing)) * 4)}.tw\\:pe-8{padding-inline-end:calc(calc(var(--spacing)) * 8)}.tw\\:pe-8\\!{padding-inline-end:calc(calc(var(--spacing)) * 8)!important}.tw\\:pe-9{padding-inline-end:calc(calc(var(--spacing)) * 9)}.tw\\:pe-\\[calc\\(138px\\+1rem\\)\\]{padding-inline-end:calc(138px + 1rem)}.tw\\:pe-\\[…\\]{padding-inline-end:…}.tw\\:pt-1{padding-top:calc(calc(var(--spacing)) * 1)}.tw\\:pt-2{padding-top:calc(calc(var(--spacing)) * 2)}.tw\\:pt-3{padding-top:calc(calc(var(--spacing)) * 3)}.tw\\:pt-4{padding-top:calc(calc(var(--spacing)) * 4)}.tw\\:pt-6{padding-top:calc(calc(var(--spacing)) * 6)}.tw\\:pr-0{padding-right:calc(calc(var(--spacing)) * 0)}.tw\\:pr-3{padding-right:calc(calc(var(--spacing)) * 3)}.tw\\:pr-4{padding-right:calc(calc(var(--spacing)) * 4)}.tw\\:pb-0{padding-bottom:calc(calc(var(--spacing)) * 0)}.tw\\:pb-1{padding-bottom:calc(calc(var(--spacing)) * 1)}.tw\\:pb-2{padding-bottom:calc(calc(var(--spacing)) * 2)}.tw\\:pb-3{padding-bottom:calc(calc(var(--spacing)) * 3)}.tw\\:pb-4{padding-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:pb-8{padding-bottom:calc(calc(var(--spacing)) * 8)}.tw\\:pb-12{padding-bottom:calc(calc(var(--spacing)) * 12)}.tw\\:pb-16{padding-bottom:calc(calc(var(--spacing)) * 16)}.tw\\:pb-24{padding-bottom:calc(calc(var(--spacing)) * 24)}.tw\\:pl-2{padding-left:calc(calc(var(--spacing)) * 2)}.tw\\:pl-3{padding-left:calc(calc(var(--spacing)) * 3)}.tw\\:pl-4{padding-left:calc(calc(var(--spacing)) * 4)}.tw\\:pl-5{padding-left:calc(calc(var(--spacing)) * 5)}.tw\\:pl-6{padding-left:calc(calc(var(--spacing)) * 6)}.tw\\:pl-8{padding-left:calc(calc(var(--spacing)) * 8)}.tw\\:text-center{text-align:center}.tw\\:text-end{text-align:end}.tw\\:text-left{text-align:left}.tw\\:text-right{text-align:right}.tw\\:text-start{text-align:start}.tw\\:align-middle{vertical-align:middle}.tw\\:font-heading{font-family:var(--font-sans)}.tw\\:font-mono{font-family:var(--tw-font-mono)}.tw\\:font-sans{font-family:IBM Plex Sans Variable,sans-serif}.tw\\:text-2xl{font-size:var(--tw-text-2xl);line-height:var(--tw-leading,var(--tw-text-2xl--line-height))}.tw\\:text-3xl{font-size:var(--tw-text-3xl);line-height:var(--tw-leading,var(--tw-text-3xl--line-height))}.tw\\:text-4xl{font-size:var(--tw-text-4xl);line-height:var(--tw-leading,var(--tw-text-4xl--line-height))}.tw\\:text-base{font-size:var(--tw-text-base);line-height:var(--tw-leading,var(--tw-text-base--line-height))}.tw\\:text-lg{font-size:var(--tw-text-lg);line-height:var(--tw-leading,var(--tw-text-lg--line-height))}.tw\\:text-sm{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:text-sm\\/relaxed{font-size:var(--tw-text-sm);line-height:var(--tw-leading-relaxed)}.tw\\:text-xl{font-size:var(--tw-text-xl);line-height:var(--tw-leading,var(--tw-text-xl--line-height))}.tw\\:text-xs{font-size:var(--tw-text-xs);line-height:var(--tw-leading,var(--tw-text-xs--line-height))}.tw\\:text-\\[0\\.8rem\\]{font-size:.8rem}.tw\\:leading-6{--tw-leading:calc(calc(var(--spacing)) * 6);line-height:calc(calc(var(--spacing)) * 6)}.tw\\:leading-loose{--tw-leading:var(--tw-leading-loose);line-height:var(--tw-leading-loose)}.tw\\:leading-none{--tw-leading:1;line-height:1}.tw\\:leading-relaxed{--tw-leading:var(--tw-leading-relaxed);line-height:var(--tw-leading-relaxed)}.tw\\:leading-snug{--tw-leading:var(--tw-leading-snug);line-height:var(--tw-leading-snug)}.tw\\:leading-tight{--tw-leading:var(--tw-leading-tight);line-height:var(--tw-leading-tight)}.tw\\:font-bold{--tw-font-weight:var(--tw-font-weight-bold);font-weight:var(--tw-font-weight-bold)}.tw\\:font-extrabold{--tw-font-weight:var(--tw-font-weight-extrabold);font-weight:var(--tw-font-weight-extrabold)}.tw\\:font-medium{--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}.tw\\:font-normal{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:font-semibold{--tw-font-weight:var(--tw-font-weight-semibold);font-weight:var(--tw-font-weight-semibold)}.tw\\:tracking-tight{--tw-tracking:var(--tw-tracking-tight);letter-spacing:var(--tw-tracking-tight)}.tw\\:tracking-wider{--tw-tracking:var(--tw-tracking-wider);letter-spacing:var(--tw-tracking-wider)}.tw\\:tracking-widest{--tw-tracking:var(--tw-tracking-widest);letter-spacing:var(--tw-tracking-widest)}.tw\\:text-balance{text-wrap:balance}.tw\\:text-nowrap{text-wrap:nowrap}.tw\\:break-words{overflow-wrap:break-word}.tw\\:text-clip{text-overflow:clip}.tw\\:text-ellipsis{text-overflow:ellipsis}.tw\\:whitespace-normal{white-space:normal}.tw\\:whitespace-nowrap{white-space:nowrap}.tw\\:whitespace-pre{white-space:pre}.tw\\:whitespace-pre-line{white-space:pre-line}.tw\\:whitespace-pre-wrap{white-space:pre-wrap}.tw\\:\\[color\\:blue\\]{color:#00f}.tw\\:text-accent-foreground{color:var(--accent-foreground)}.tw\\:text-amber-600{color:var(--tw-color-amber-600)}.tw\\:text-background{color:var(--background)}.tw\\:text-blue-400{color:var(--tw-color-blue-400)}.tw\\:text-blue-500{color:var(--tw-color-blue-500)}.tw\\:text-blue-600{color:var(--tw-color-blue-600)}.tw\\:text-blue-800{color:var(--tw-color-blue-800)}.tw\\:text-card-foreground{color:var(--card-foreground)}.tw\\:text-current{color:currentColor}.tw\\:text-destructive{color:var(--destructive)}.tw\\:text-foreground{color:var(--foreground)}.tw\\:text-foreground\\!{color:var(--foreground)!important}.tw\\:text-foreground\\/30{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/30{color:color-mix(in oklab, var(--foreground) 30%, transparent)}}.tw\\:text-foreground\\/50{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/50{color:color-mix(in oklab, var(--foreground) 50%, transparent)}}.tw\\:text-foreground\\/60{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/60{color:color-mix(in oklab, var(--foreground) 60%, transparent)}}.tw\\:text-foreground\\/70{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/70{color:color-mix(in oklab, var(--foreground) 70%, transparent)}}.tw\\:text-gray-300{color:var(--tw-color-gray-300)}.tw\\:text-gray-500{color:var(--tw-color-gray-500)}.tw\\:text-gray-600{color:var(--tw-color-gray-600)}.tw\\:text-gray-700{color:var(--tw-color-gray-700)}.tw\\:text-gray-800{color:var(--tw-color-gray-800)}.tw\\:text-green-600{color:var(--tw-color-green-600)}.tw\\:text-green-700{color:var(--tw-color-green-700)}.tw\\:text-green-800{color:var(--tw-color-green-800)}.tw\\:text-inherit{color:inherit}.tw\\:text-muted-foreground,.tw\\:text-muted-foreground\\/50{color:var(--muted-foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-muted-foreground\\/50{color:color-mix(in oklab, var(--muted-foreground) 50%, transparent)}}.tw\\:text-orange-800{color:var(--tw-color-orange-800)}.tw\\:text-popover-foreground{color:var(--popover-foreground)}.tw\\:text-primary{color:var(--primary)}.tw\\:text-primary-foreground{color:var(--primary-foreground)}.tw\\:text-purple-900{color:var(--tw-color-purple-900)}.tw\\:text-red-500{color:var(--tw-color-red-500)}.tw\\:text-red-600{color:var(--tw-color-red-600)}.tw\\:text-red-700{color:var(--tw-color-red-700)}.tw\\:text-red-800{color:var(--tw-color-red-800)}.tw\\:text-rose-600{color:var(--tw-color-rose-600)}.tw\\:text-secondary-foreground{color:var(--secondary-foreground)}.tw\\:text-sidebar-accent-foreground{color:var(--sidebar-accent-foreground)}.tw\\:text-sidebar-foreground,.tw\\:text-sidebar-foreground\\/70{color:var(--sidebar-foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-sidebar-foreground\\/70{color:color-mix(in oklab, var(--sidebar-foreground) 70%, transparent)}}.tw\\:text-sky-600{color:var(--tw-color-sky-600)}.tw\\:text-slate-900{color:var(--tw-color-slate-900)}.tw\\:text-teal-600{color:var(--tw-color-teal-600)}.tw\\:text-white{color:var(--tw-color-white)}.tw\\:text-yellow-400{color:var(--tw-color-yellow-400)}.tw\\:text-yellow-600{color:var(--tw-color-yellow-600)}.tw\\:text-yellow-700{color:var(--tw-color-yellow-700)}.tw\\:capitalize{text-transform:capitalize}.tw\\:uppercase{text-transform:uppercase}.tw\\:italic{font-style:italic}.tw\\:tabular-nums{--tw-numeric-spacing:tabular-nums;font-variant-numeric:var(--tw-ordinal,) var(--tw-slashed-zero,) var(--tw-numeric-figure,) var(--tw-numeric-spacing,) var(--tw-numeric-fraction,)}.tw\\:line-through{text-decoration-line:line-through}.tw\\:underline{text-decoration-line:underline}.tw\\:decoration-destructive{-webkit-text-decoration-color:var(--destructive);-webkit-text-decoration-color:var(--destructive);text-decoration-color:var(--destructive)}.tw\\:underline-offset-4{text-underline-offset:4px}.tw\\:opacity-0{opacity:0}.tw\\:opacity-40{opacity:.4}.tw\\:opacity-50{opacity:.5}.tw\\:opacity-60{opacity:.6}.tw\\:opacity-100{opacity:1}.tw\\:bg-blend-color{background-blend-mode:color}.tw\\:shadow{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-\\[0_0_0_1px_var\\(--sidebar-border\\)\\]{--tw-shadow:0 0 0 1px var(--tw-shadow-color,var(--sidebar-border));box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-lg{--tw-shadow:0 10px 15px -3px var(--tw-shadow-color,#0000001a), 0 4px 6px -4px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-md{--tw-shadow:0 4px 6px -1px var(--tw-shadow-color,#0000001a), 0 2px 4px -2px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-none{--tw-shadow:0 0 #0000;box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-none\\!{--tw-shadow:0 0 #0000!important;box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)!important}.tw\\:shadow-sm{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-xl{--tw-shadow:0 20px 25px -5px var(--tw-shadow-color,#0000001a), 0 8px 10px -6px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-0{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-1{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-2{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-background{--tw-ring-color:var(--background)}.tw\\:ring-foreground\\/10{--tw-ring-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:ring-foreground\\/10{--tw-ring-color:color-mix(in oklab, var(--foreground) 10%, transparent)}}.tw\\:ring-primary{--tw-ring-color:var(--primary)}.tw\\:ring-ring\\/50{--tw-ring-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.tw\\:ring-ring\\/50{--tw-ring-color:color-mix(in oklab, var(--ring) 50%, transparent)}}.tw\\:ring-sidebar-ring{--tw-ring-color:var(--sidebar-ring)}.tw\\:ring-offset-2{--tw-ring-offset-width:2px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}.tw\\:ring-offset-background{--tw-ring-offset-color:var(--background)}.tw\\:ring-offset-white{--tw-ring-offset-color:var(--tw-color-white)}.tw\\:outline-hidden{--tw-outline-style:none;outline-style:none}@media (forced-colors:active){.tw\\:outline-hidden{outline-offset:2px;outline:2px solid #0000}}.tw\\:drop-shadow-sm{--tw-drop-shadow-size:drop-shadow(0 1px 2px var(--tw-drop-shadow-color,#00000026));--tw-drop-shadow:drop-shadow(var(--tw-drop-shadow-sm));filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.tw\\:transition{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to,opacity,box-shadow,transform,translate,scale,rotate,filter,-webkit-backdrop-filter,backdrop-filter,display,content-visibility,overlay,pointer-events;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[color\\,box-shadow\\]{transition-property:color,box-shadow;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[left\\,right\\,width\\]{transition-property:left,right,width;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[margin\\,opacity\\]{transition-property:margin,opacity;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[width\\,height\\,padding\\]{transition-property:width,height,padding;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[width\\]{transition-property:width;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-all{transition-property:all;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-colors{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-opacity{transition-property:opacity;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-transform{transition-property:transform,translate,scale,rotate;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-none{transition-property:none}.tw\\:duration-100{--tw-duration:.1s;transition-duration:.1s}.tw\\:duration-200{--tw-duration:.2s;transition-duration:.2s}.tw\\:ease-linear{--tw-ease:linear;transition-timing-function:linear}.tw\\:prose-quoteless :where(blockquote p:first-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):before,.tw\\:prose-quoteless :where(blockquote p:last-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:none}.tw\\:outline-none{--tw-outline-style:none;outline-style:none}.tw\\:select-none{-webkit-user-select:none;user-select:none}.tw\\:\\[unicode-bidi\\:plaintext\\]{unicode-bidi:plaintext}.tw\\:group-focus-within\\/menu-item\\:opacity-100:is(:where(.tw\\:group\\/menu-item):focus-within *){opacity:1}@media (hover:hover){.tw\\:group-hover\\:visible:is(:where(.tw\\:group):hover *){visibility:visible}.tw\\:group-hover\\:hidden:is(:where(.tw\\:group):hover *){display:none}.tw\\:group-hover\\:opacity-100:is(:where(.tw\\:group):hover *),.tw\\:group-hover\\/menu-item\\:opacity-100:is(:where(.tw\\:group\\/menu-item):hover *){opacity:1}}.tw\\:group-focus\\/context-menu-item\\:text-accent-foreground:is(:where(.tw\\:group\\/context-menu-item):focus *),.tw\\:group-focus\\/dropdown-menu-item\\:text-accent-foreground:is(:where(.tw\\:group\\/dropdown-menu-item):focus *),.tw\\:group-focus\\/menubar-item\\:text-accent-foreground:is(:where(.tw\\:group\\/menubar-item):focus *){color:var(--accent-foreground)}.tw\\:group-has-disabled\\/field\\:opacity-50:is(:where(.tw\\:group\\/field):has(:disabled) *){opacity:.5}.tw\\:group-has-data-\\[sidebar\\=menu-action\\]\\/menu-item\\:pe-8:is(:where(.tw\\:group\\/menu-item):has([data-sidebar=menu-action]) *){padding-inline-end:calc(calc(var(--spacing)) * 8)}.tw\\:group-has-data-\\[size\\=lg\\]\\/avatar-group\\:size-10:is(:where(.tw\\:group\\/avatar-group):has([data-size=lg]) *){width:calc(calc(var(--spacing)) * 10);height:calc(calc(var(--spacing)) * 10)}.tw\\:group-has-data-\\[size\\=sm\\]\\/avatar-group\\:size-6:is(:where(.tw\\:group\\/avatar-group):has([data-size=sm]) *){width:calc(calc(var(--spacing)) * 6);height:calc(calc(var(--spacing)) * 6)}.tw\\:group-has-data-\\[slot\\=command-shortcut\\]\\/command-item\\:hidden:is(:where(.tw\\:group\\/command-item):has([data-slot=command-shortcut]) *){display:none}.tw\\:group-has-\\[\\>input\\]\\/input-group\\:pt-2:is(:where(.tw\\:group\\/input-group):has(>input) *){padding-top:calc(calc(var(--spacing)) * 2)}.tw\\:group-has-\\[\\>input\\]\\/input-group\\:pb-2:is(:where(.tw\\:group\\/input-group):has(>input) *){padding-bottom:calc(calc(var(--spacing)) * 2)}.tw\\:group-has-\\[\\>svg\\]\\/alert\\:col-start-2:is(:where(.tw\\:group\\/alert):has(>svg) *){grid-column-start:2}.tw\\:group-data-\\[checked\\=true\\]\\/command-item\\:opacity-100:is(:where(.tw\\:group\\/command-item)[data-checked=true] *){opacity:1}.tw\\:group-data-\\[collapsible\\=icon\\]\\:-mt-8:is(:where(.tw\\:group)[data-collapsible=icon] *){margin-top:calc(calc(var(--spacing)) * -8)}.tw\\:group-data-\\[collapsible\\=icon\\]\\:hidden:is(:where(.tw\\:group)[data-collapsible=icon] *){display:none}.tw\\:group-data-\\[collapsible\\=icon\\]\\:size-8\\!:is(:where(.tw\\:group)[data-collapsible=icon] *){width:calc(calc(var(--spacing)) * 8)!important;height:calc(calc(var(--spacing)) * 8)!important}.tw\\:group-data-\\[collapsible\\=icon\\]\\:w-\\(--sidebar-width-icon\\):is(:where(.tw\\:group)[data-collapsible=icon] *){width:var(--sidebar-width-icon)}.tw\\:group-data-\\[collapsible\\=icon\\]\\:w-\\[calc\\(var\\(--sidebar-width-icon\\)\\+\\(--spacing\\(4\\)\\)\\)\\]:is(:where(.tw\\:group)[data-collapsible=icon] *){width:calc(var(--sidebar-width-icon) + (calc(calc(var(--spacing)) * 4)))}.tw\\:group-data-\\[collapsible\\=icon\\]\\:w-\\[calc\\(var\\(--sidebar-width-icon\\)\\+\\(--spacing\\(4\\)\\)\\+2px\\)\\]:is(:where(.tw\\:group)[data-collapsible=icon] *){width:calc(var(--sidebar-width-icon) + (calc(calc(var(--spacing)) * 4)) + 2px)}.tw\\:group-data-\\[collapsible\\=icon\\]\\:overflow-hidden:is(:where(.tw\\:group)[data-collapsible=icon] *){overflow:hidden}.tw\\:group-data-\\[collapsible\\=icon\\]\\:p-0\\!:is(:where(.tw\\:group)[data-collapsible=icon] *){padding:calc(calc(var(--spacing)) * 0)!important}.tw\\:group-data-\\[collapsible\\=icon\\]\\:p-2\\!:is(:where(.tw\\:group)[data-collapsible=icon] *){padding:calc(calc(var(--spacing)) * 2)!important}.tw\\:group-data-\\[collapsible\\=icon\\]\\:opacity-0:is(:where(.tw\\:group)[data-collapsible=icon] *){opacity:0}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:right-\\[calc\\(var\\(--sidebar-width\\)\\*-1\\)\\]:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){right:calc(var(--sidebar-width) * -1)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:left-\\[calc\\(var\\(--sidebar-width\\)\\*-1\\)\\]:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){left:calc(var(--sidebar-width) * -1)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:w-0:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){width:calc(calc(var(--spacing)) * 0)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:translate-x-0:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){--tw-translate-x:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:group-data-\\[disabled\\=true\\]\\:pointer-events-none:is(:where(.tw\\:group)[data-disabled=true] *){pointer-events:none}.tw\\:group-data-\\[disabled\\=true\\]\\:opacity-50:is(:where(.tw\\:group)[data-disabled=true] *),.tw\\:group-data-\\[disabled\\=true\\]\\/input-group\\:opacity-50:is(:where(.tw\\:group\\/input-group)[data-disabled=true] *){opacity:.5}.tw\\:group-data-\\[side\\=primary\\]\\:-right-4:is(:where(.tw\\:group)[data-side=primary] *){right:calc(calc(var(--spacing)) * -4)}.tw\\:group-data-\\[side\\=primary\\]\\:border-e:is(:where(.tw\\:group)[data-side=primary] *){border-inline-end-style:var(--tw-border-style);border-inline-end-width:1px}.tw\\:group-data-\\[side\\=secondary\\]\\:left-0:is(:where(.tw\\:group)[data-side=secondary] *){left:calc(calc(var(--spacing)) * 0)}.tw\\:group-data-\\[side\\=secondary\\]\\:rotate-180:is(:where(.tw\\:group)[data-side=secondary] *){rotate:180deg}.tw\\:group-data-\\[side\\=secondary\\]\\:border-s:is(:where(.tw\\:group)[data-side=secondary] *){border-inline-start-style:var(--tw-border-style);border-inline-start-width:1px}.tw\\:group-data-\\[size\\=default\\]\\/avatar\\:size-2\\.5:is(:where(.tw\\:group\\/avatar)[data-size=default] *){width:calc(calc(var(--spacing)) * 2.5);height:calc(calc(var(--spacing)) * 2.5)}.tw\\:group-data-\\[size\\=default\\]\\/switch\\:size-4:is(:where(.tw\\:group\\/switch)[data-size=default] *){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[size\\=lg\\]\\/avatar\\:size-3:is(:where(.tw\\:group\\/avatar)[data-size=lg] *){width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[size\\=sm\\]\\/avatar\\:size-2:is(:where(.tw\\:group\\/avatar)[data-size=sm] *){width:calc(calc(var(--spacing)) * 2);height:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[size\\=sm\\]\\/avatar\\:text-xs:is(:where(.tw\\:group\\/avatar)[data-size=sm] *){font-size:var(--tw-text-xs);line-height:var(--tw-leading,var(--tw-text-xs--line-height))}.tw\\:group-data-\\[size\\=sm\\]\\/card\\:p-3:is(:where(.tw\\:group\\/card)[data-size=sm] *){padding:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[size\\=sm\\]\\/card\\:px-3:is(:where(.tw\\:group\\/card)[data-size=sm] *){padding-inline:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[size\\=sm\\]\\/card\\:text-sm:is(:where(.tw\\:group\\/card)[data-size=sm] *){font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:size-3:is(:where(.tw\\:group\\/switch)[data-size=sm] *){width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[spacing\\=0\\]\\/toggle-group\\:rounded-none:is(:where(.tw\\:group\\/toggle-group)[data-spacing="0"] *){border-radius:0}.tw\\:group-data-\\[spacing\\=0\\]\\/toggle-group\\:px-2:is(:where(.tw\\:group\\/toggle-group)[data-spacing="0"] *){padding-inline:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[variant\\=floating\\]\\:rounded-lg:is(:where(.tw\\:group)[data-variant=floating] *){border-radius:var(--radius)}.tw\\:group-data-\\[variant\\=floating\\]\\:shadow-sm:is(:where(.tw\\:group)[data-variant=floating] *){--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:group-data-\\[variant\\=floating\\]\\:ring-1:is(:where(.tw\\:group)[data-variant=floating] *){--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:group-data-\\[variant\\=floating\\]\\:ring-sidebar-border:is(:where(.tw\\:group)[data-variant=floating] *){--tw-ring-color:var(--sidebar-border)}.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:bg-transparent:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *){background-color:#0000}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:mx-auto:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){margin-inline:auto}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:mt-4:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){margin-top:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:block:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){display:block}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:h-1\\.5:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){height:calc(calc(var(--spacing)) * 1.5)}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:w-\\[100px\\]:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){width:100px}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:text-center:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){text-align:center}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:my-auto:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){margin-block:auto}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:me-4:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){margin-inline-end:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:block:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){display:block}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:h-\\[100px\\]:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){height:100px}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:w-1\\.5:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){width:calc(calc(var(--spacing)) * 1.5)}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:my-auto:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){margin-block:auto}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:ms-4:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){margin-inline-start:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:block:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){display:block}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:h-\\[100px\\]:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){height:100px}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:w-1\\.5:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){width:calc(calc(var(--spacing)) * 1.5)}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:mx-auto:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){margin-inline:auto}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:mb-4:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){margin-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:block:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){display:block}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:h-1\\.5:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){height:calc(calc(var(--spacing)) * 1.5)}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:w-\\[100px\\]:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){width:100px}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:text-center:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){text-align:center}.tw\\:group-data-selected\\/command-item\\:text-foreground:is(:where(.tw\\:group\\/command-item):where([data-selected=true]) *){color:var(--foreground)}.tw\\:group-data-horizontal\\/tabs\\:h-8:is(:where(.tw\\:group\\/tabs):where([data-orientation=horizontal]) *){height:calc(calc(var(--spacing)) * 8)}.tw\\:group-data-vertical\\/tabs\\:h-fit:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *){height:fit-content}.tw\\:group-data-vertical\\/tabs\\:w-full:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *){width:100%}.tw\\:group-data-vertical\\/tabs\\:flex-col:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *){flex-direction:column}.tw\\:group-data-vertical\\/tabs\\:justify-start:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *){justify-content:flex-start}@media (hover:hover){.tw\\:peer-hover\\/menu-button\\:text-sidebar-accent-foreground:is(:where(.tw\\:peer\\/menu-button):hover~*){color:var(--sidebar-accent-foreground)}.tw\\:peer-focus\\:group-hover\\:text-blue-500:is(:where(.tw\\:peer):focus~*):is(:where(.tw\\:group):hover *){color:var(--tw-color-blue-500)}}.tw\\:peer-disabled\\:cursor-not-allowed:is(:where(.tw\\:peer):disabled~*){cursor:not-allowed}.tw\\:peer-disabled\\:opacity-50:is(:where(.tw\\:peer):disabled~*){opacity:.5}.tw\\:peer-data-\\[size\\=default\\]\\/menu-button\\:top-1\\.5:is(:where(.tw\\:peer\\/menu-button)[data-size=default]~*){top:calc(calc(var(--spacing)) * 1.5)}.tw\\:peer-data-\\[size\\=lg\\]\\/menu-button\\:top-2\\.5:is(:where(.tw\\:peer\\/menu-button)[data-size=lg]~*){top:calc(calc(var(--spacing)) * 2.5)}.tw\\:peer-data-\\[size\\=sm\\]\\/menu-button\\:top-1:is(:where(.tw\\:peer\\/menu-button)[data-size=sm]~*){top:calc(calc(var(--spacing)) * 1)}.tw\\:peer-data-active\\/menu-button\\:text-sidebar-accent-foreground:is(:is(:where(.tw\\:peer\\/menu-button):where([data-state=active]),:where(.tw\\:peer\\/menu-button):where([data-active]:not([data-active=false])))~*){color:var(--sidebar-accent-foreground)}.tw\\:file\\:inline-flex::file-selector-button{display:inline-flex}.tw\\:file\\:h-6::file-selector-button{height:calc(calc(var(--spacing)) * 6)}.tw\\:file\\:border-0::file-selector-button{border-style:var(--tw-border-style);border-width:0}.tw\\:file\\:bg-transparent::file-selector-button{background-color:#0000}.tw\\:file\\:text-sm::file-selector-button{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:file\\:font-medium::file-selector-button{--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}.tw\\:file\\:text-foreground::file-selector-button{color:var(--foreground)}.tw\\:placeholder\\:text-muted-foreground::placeholder{color:var(--muted-foreground)}.tw\\:placeholder\\:text-slate-400::placeholder{color:var(--tw-color-slate-400)}.tw\\:before\\:absolute:before{content:var(--tw-content);position:absolute}.tw\\:before\\:top-0\\.5:before{content:var(--tw-content);top:calc(calc(var(--spacing)) * .5)}.tw\\:before\\:left-0:before{content:var(--tw-content);left:calc(calc(var(--spacing)) * 0)}.tw\\:before\\:block:before{content:var(--tw-content);display:block}.tw\\:before\\:hidden:before{content:var(--tw-content);display:none}.tw\\:before\\:h-4:before{content:var(--tw-content);height:calc(calc(var(--spacing)) * 4)}.tw\\:before\\:w-4:before{content:var(--tw-content);width:calc(calc(var(--spacing)) * 4)}.tw\\:before\\:cursor-pointer:before{content:var(--tw-content);cursor:pointer}.tw\\:before\\:rounded:before{content:var(--tw-content);border-radius:.25rem}.tw\\:before\\:border:before{content:var(--tw-content);border-style:var(--tw-border-style);border-width:1px}.tw\\:before\\:border-primary:before{content:var(--tw-content);border-color:var(--primary)}.tw\\:before\\:bg-primary:before{content:var(--tw-content);background-color:var(--primary)}.tw\\:before\\:bg-cover:before{content:var(--tw-content);background-size:cover}.tw\\:before\\:bg-no-repeat:before{content:var(--tw-content);background-repeat:no-repeat}.tw\\:before\\:content-\\[\\"\\"\\]:before{--tw-content:"";content:var(--tw-content)}.tw\\:before\\:content-\\[\\\\\\"\\\\\\"\\]:before{--tw-content:\\"\\";content:var(--tw-content)}.tw\\:after\\:absolute:after{content:var(--tw-content);position:absolute}.tw\\:after\\:-inset-2:after{content:var(--tw-content);inset:calc(calc(var(--spacing)) * -2)}.tw\\:after\\:inset-0:after{content:var(--tw-content);inset:calc(calc(var(--spacing)) * 0)}.tw\\:after\\:-inset-x-3:after{content:var(--tw-content);inset-inline:calc(calc(var(--spacing)) * -3)}.tw\\:after\\:-inset-y-2:after{content:var(--tw-content);inset-block:calc(calc(var(--spacing)) * -2)}.tw\\:after\\:inset-y-0:after{content:var(--tw-content);inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:after\\:start-1\\/2:after{content:var(--tw-content);inset-inline-start:50%}.tw\\:after\\:top-\\[6px\\]:after{content:var(--tw-content);top:6px}.tw\\:after\\:right-\\[7px\\]:after{content:var(--tw-content);right:7px}.tw\\:after\\:left-\\[7px\\]:after{content:var(--tw-content);left:7px}.tw\\:after\\:block:after{content:var(--tw-content);display:block}.tw\\:after\\:hidden:after{content:var(--tw-content);display:none}.tw\\:after\\:h-0\\.5:after{content:var(--tw-content);height:calc(calc(var(--spacing)) * .5)}.tw\\:after\\:h-\\[6px\\]:after{content:var(--tw-content);height:6px}.tw\\:after\\:w-1:after{content:var(--tw-content);width:calc(calc(var(--spacing)) * 1)}.tw\\:after\\:w-\\[2px\\]:after{content:var(--tw-content);width:2px}.tw\\:after\\:w-\\[3px\\]:after{content:var(--tw-content);width:3px}.tw\\:after\\:-translate-x-1\\/2:after{content:var(--tw-content);--tw-translate-x:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:after\\:rotate-45:after{content:var(--tw-content);rotate:45deg}.tw\\:after\\:cursor-pointer:after{content:var(--tw-content);cursor:pointer}.tw\\:after\\:rounded-full:after{content:var(--tw-content);border-radius:3.40282e38px}.tw\\:after\\:border:after{content:var(--tw-content);border-style:var(--tw-border-style);border-width:1px}.tw\\:after\\:border-t-0:after{content:var(--tw-content);border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:after\\:border-r-2:after{content:var(--tw-content);border-right-style:var(--tw-border-style);border-right-width:2px}.tw\\:after\\:border-b-2:after{content:var(--tw-content);border-bottom-style:var(--tw-border-style);border-bottom-width:2px}.tw\\:after\\:border-l-0:after{content:var(--tw-content);border-left-style:var(--tw-border-style);border-left-width:0}.tw\\:after\\:border-solid:after{content:var(--tw-content);--tw-border-style:solid;border-style:solid}.tw\\:after\\:border-border:after{content:var(--tw-content);border-color:var(--border)}.tw\\:after\\:border-white:after{content:var(--tw-content);border-color:var(--tw-color-white)}.tw\\:after\\:bg-foreground:after{content:var(--tw-content);background-color:var(--foreground)}.tw\\:after\\:bg-muted:after{content:var(--tw-content);background-color:var(--muted)}.tw\\:after\\:opacity-0:after{content:var(--tw-content);opacity:0}.tw\\:after\\:mix-blend-darken:after{content:var(--tw-content);mix-blend-mode:darken}.tw\\:after\\:transition-opacity:after{content:var(--tw-content);transition-property:opacity;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:after\\:content-\\[\\"\\"\\]:after{--tw-content:"";content:var(--tw-content)}.tw\\:after\\:content-\\[\\\\\\"\\\\\\"\\]:after{--tw-content:\\"\\";content:var(--tw-content)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:after\\:start-full:is(:where(.tw\\:group)[data-collapsible=offcanvas] *):after{content:var(--tw-content);inset-inline-start:100%}.tw\\:group-data-horizontal\\/tabs\\:after\\:inset-x-0:is(:where(.tw\\:group\\/tabs):where([data-orientation=horizontal]) *):after{content:var(--tw-content);inset-inline:calc(calc(var(--spacing)) * 0)}.tw\\:group-data-horizontal\\/tabs\\:after\\:bottom-\\[-5px\\]:is(:where(.tw\\:group\\/tabs):where([data-orientation=horizontal]) *):after{content:var(--tw-content);bottom:-5px}.tw\\:group-data-horizontal\\/tabs\\:after\\:h-0\\.5:is(:where(.tw\\:group\\/tabs):where([data-orientation=horizontal]) *):after{content:var(--tw-content);height:calc(calc(var(--spacing)) * .5)}.tw\\:group-data-vertical\\/tabs\\:after\\:inset-y-0:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *):after{content:var(--tw-content);inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:group-data-vertical\\/tabs\\:after\\:-end-1:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *):after{content:var(--tw-content);inset-inline-end:calc(calc(var(--spacing)) * -1)}.tw\\:group-data-vertical\\/tabs\\:after\\:w-0\\.5:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *):after{content:var(--tw-content);width:calc(calc(var(--spacing)) * .5)}.tw\\:first\\:mt-0:first-child{margin-top:calc(calc(var(--spacing)) * 0)}.tw\\:last\\:border-b-0:last-child{border-bottom-style:var(--tw-border-style);border-bottom-width:0}.tw\\:even\\:bg-muted:nth-child(2n){background-color:var(--muted)}.tw\\:focus-within\\:ring-2:focus-within{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-within\\:ring-ring:focus-within{--tw-ring-color:var(--ring)}.tw\\:focus-within\\:ring-offset-1:focus-within{--tw-ring-offset-width:1px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}@media (hover:hover){.tw\\:hover\\:-mt-4:hover{margin-top:calc(calc(var(--spacing)) * -4)}.tw\\:hover\\:cursor-pointer:hover{cursor:pointer}.tw\\:hover\\:bg-accent:hover,.tw\\:hover\\:bg-accent\\/30:hover{background-color:var(--accent)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-accent\\/30:hover{background-color:color-mix(in oklab, var(--accent) 30%, transparent)}}.tw\\:hover\\:bg-accent\\/80:hover{background-color:var(--accent)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-accent\\/80:hover{background-color:color-mix(in oklab, var(--accent) 80%, transparent)}}.tw\\:hover\\:bg-blue-600:hover{background-color:var(--tw-color-blue-600)}.tw\\:hover\\:bg-destructive\\/20:hover{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-destructive\\/20:hover{background-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:hover\\:bg-gray-50:hover{background-color:var(--tw-color-gray-50)}.tw\\:hover\\:bg-input:hover{background-color:var(--input)}.tw\\:hover\\:bg-muted:hover,.tw\\:hover\\:bg-muted\\/50:hover{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-muted\\/50:hover{background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:hover\\:bg-muted\\/80:hover{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-muted\\/80:hover{background-color:color-mix(in oklab, var(--muted) 80%, transparent)}}.tw\\:hover\\:bg-primary\\/10:hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-primary\\/10:hover{background-color:color-mix(in oklab, var(--primary) 10%, transparent)}}.tw\\:hover\\:bg-primary\\/70:hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-primary\\/70:hover{background-color:color-mix(in oklab, var(--primary) 70%, transparent)}}.tw\\:hover\\:bg-primary\\/90:hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-primary\\/90:hover{background-color:color-mix(in oklab, var(--primary) 90%, transparent)}}.tw\\:hover\\:bg-red-500:hover{background-color:var(--tw-color-red-500)}.tw\\:hover\\:bg-secondary:hover,.tw\\:hover\\:bg-secondary\\/80:hover{background-color:var(--secondary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-secondary\\/80:hover{background-color:color-mix(in oklab, var(--secondary) 80%, transparent)}}.tw\\:hover\\:bg-sidebar-accent:hover{background-color:var(--sidebar-accent)}.tw\\:hover\\:bg-transparent:hover{background-color:#0000}.tw\\:hover\\:text-foreground:hover{color:var(--foreground)}.tw\\:hover\\:text-muted-foreground:hover{color:var(--muted-foreground)}.tw\\:hover\\:text-primary-foreground:hover{color:var(--primary-foreground)}.tw\\:hover\\:text-sidebar-accent-foreground:hover{color:var(--sidebar-accent-foreground)}.tw\\:hover\\:underline:hover{text-decoration-line:underline}.tw\\:hover\\:opacity-80:hover{opacity:.8}.tw\\:hover\\:opacity-100:hover{opacity:1}.tw\\:hover\\:shadow-\\[0_0_0_1px_var\\(--sidebar-accent\\)\\]:hover{--tw-shadow:0 0 0 1px var(--tw-shadow-color,var(--sidebar-accent));box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:hover\\:shadow-md:hover{--tw-shadow:0 4px 6px -1px var(--tw-shadow-color,#0000001a), 0 2px 4px -2px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:hover\\:ring-3:hover{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:hover\\:group-data-\\[collapsible\\=offcanvas\\]\\:bg-sidebar:hover:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){background-color:var(--sidebar)}.tw\\:hover\\:after\\:bg-sidebar-border:hover:after{content:var(--tw-content);background-color:var(--sidebar-border)}}.tw\\:focus\\:relative:focus{position:relative}.tw\\:focus\\:z-10:focus{z-index:10}.tw\\:focus\\:bg-accent:focus{background-color:var(--accent)}.tw\\:focus\\:bg-muted:focus{background-color:var(--muted)}.tw\\:focus\\:text-accent-foreground:focus{color:var(--accent-foreground)}.tw\\:focus\\:text-foreground:focus{color:var(--foreground)}.tw\\:focus\\:ring-2:focus{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus\\:ring-ring:focus{--tw-ring-color:var(--ring)}.tw\\:focus\\:ring-offset-1:focus{--tw-ring-offset-width:1px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}.tw\\:focus\\:ring-offset-background:focus{--tw-ring-offset-color:var(--background)}.tw\\:focus\\:outline-hidden:focus{--tw-outline-style:none;outline-style:none}@media (forced-colors:active){.tw\\:focus\\:outline-hidden:focus{outline-offset:2px;outline:2px solid #0000}}:is(.tw\\:focus\\:\\*\\*\\:text-accent-foreground:focus *),:is(.tw\\:not-data-\\[variant\\=destructive\\]\\:focus\\:\\*\\*\\:text-accent-foreground:not([data-variant=destructive]):focus *){color:var(--accent-foreground)}.tw\\:focus-visible\\:relative:focus-visible{position:relative}.tw\\:focus-visible\\:z-10:focus-visible{z-index:10}.tw\\:focus-visible\\:border-destructive\\/40:focus-visible{border-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:focus-visible\\:border-destructive\\/40:focus-visible{border-color:color-mix(in oklab, var(--destructive) 40%, transparent)}}.tw\\:focus-visible\\:border-ring:focus-visible{border-color:var(--ring)}.tw\\:focus-visible\\:ring-0:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-visible\\:ring-1:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-visible\\:ring-2:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-visible\\:ring-3:focus-visible,.tw\\:focus-visible\\:ring-\\[3px\\]:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-visible\\:ring-\\[color\\:hsl\\(240\\,5\\%\\,64\\.9\\%\\)\\]:focus-visible{--tw-ring-color:#a1a1aa}.tw\\:focus-visible\\:ring-destructive\\/20:focus-visible{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:focus-visible\\:ring-destructive\\/20:focus-visible{--tw-ring-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:focus-visible\\:ring-ring:focus-visible,.tw\\:focus-visible\\:ring-ring\\/50:focus-visible{--tw-ring-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.tw\\:focus-visible\\:ring-ring\\/50:focus-visible{--tw-ring-color:color-mix(in oklab, var(--ring) 50%, transparent)}}.tw\\:focus-visible\\:ring-slate-400:focus-visible{--tw-ring-color:var(--tw-color-slate-400)}.tw\\:focus-visible\\:ring-offset-2:focus-visible{--tw-ring-offset-width:2px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}.tw\\:focus-visible\\:outline-hidden:focus-visible{--tw-outline-style:none;outline-style:none}@media (forced-colors:active){.tw\\:focus-visible\\:outline-hidden:focus-visible{outline-offset:2px;outline:2px solid #0000}}.tw\\:focus-visible\\:outline-1:focus-visible{outline-style:var(--tw-outline-style);outline-width:1px}.tw\\:focus-visible\\:outline-ring:focus-visible{outline-color:var(--ring)}.tw\\:focus-visible\\:outline-none:focus-visible{--tw-outline-style:none;outline-style:none}:is(.tw\\:\\*\\:focus-visible\\:relative>*):focus-visible{position:relative}:is(.tw\\:\\*\\:focus-visible\\:z-10>*):focus-visible{z-index:10}.tw\\:active\\:bg-sidebar-accent:active{background-color:var(--sidebar-accent)}.tw\\:active\\:text-sidebar-accent-foreground:active{color:var(--sidebar-accent-foreground)}.tw\\:active\\:ring-3:active{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:active\\:not-aria-\\[haspopup\\]\\:translate-y-px:active:not([aria-haspopup]){--tw-translate-y:1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:active\\:not-aria-\\[haspopup\\]\\:transform-\\[translateY\\(1px\\)\\]:active:not([aria-haspopup]){transform:translateY(1px)}.tw\\:disabled\\:pointer-events-none:disabled{pointer-events:none}.tw\\:disabled\\:cursor-not-allowed:disabled{cursor:not-allowed}.tw\\:disabled\\:bg-input\\/50:disabled{background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:disabled\\:bg-input\\/50:disabled{background-color:color-mix(in oklab, var(--input) 50%, transparent)}}.tw\\:disabled\\:bg-transparent:disabled{background-color:#0000}.tw\\:disabled\\:opacity-50:disabled{opacity:.5}:where([data-side=bottom]) .tw\\:in-data-\\[side\\=bottom\\]\\:translate-y-\\[calc\\(-50\\%-1px\\)\\]{--tw-translate-y:calc(-50% - 1px);translate:var(--tw-translate-x) var(--tw-translate-y)}:where([data-side=bottom]) .tw\\:in-data-\\[side\\=bottom\\]\\:\\[clip-path\\:polygon\\(100\\%_0\\,100\\%_100\\%\\,0_100\\%\\)\\]{clip-path:polygon(100% 0,100% 100%,0 100%)}:where([data-side=primary]) .tw\\:in-data-\\[side\\=primary\\]\\:cursor-w-resize{cursor:w-resize}:where([data-side=secondary]) .tw\\:in-data-\\[side\\=secondary\\]\\:cursor-e-resize{cursor:e-resize}:where([data-side=top]) .tw\\:in-data-\\[side\\=top\\]\\:translate-y-\\[calc\\(-50\\%-1px\\)\\]{--tw-translate-y:calc(-50% - 1px);translate:var(--tw-translate-x) var(--tw-translate-y)}:where([data-side=top]) .tw\\:in-data-\\[side\\=top\\]\\:\\[clip-path\\:polygon\\(100\\%_0\\,100\\%_100\\%\\,0_100\\%\\)\\]{clip-path:polygon(100% 0,100% 100%,0 100%)}:where([data-slot=button-group]) .tw\\:in-data-\\[slot\\=button-group\\]\\:rounded-lg{border-radius:var(--radius)}:where([data-slot=combobox-content]) .tw\\:in-data-\\[slot\\=combobox-content\\]\\:focus-within\\:border-inherit:focus-within{border-color:inherit}:where([data-slot=combobox-content]) .tw\\:in-data-\\[slot\\=combobox-content\\]\\:focus-within\\:ring-0:focus-within{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}:where([data-slot=dialog-content]) .tw\\:in-data-\\[slot\\=dialog-content\\]\\:rounded-lg\\!{border-radius:var(--radius)!important}:where([data-slot=tooltip-content]) .tw\\:in-data-\\[slot\\=tooltip-content\\]\\:bg-background\\/20{background-color:var(--background)}@supports (color:color-mix(in lab, red, red)){:where([data-slot=tooltip-content]) .tw\\:in-data-\\[slot\\=tooltip-content\\]\\:bg-background\\/20{background-color:color-mix(in oklab, var(--background) 20%, transparent)}}:where([data-slot=tooltip-content]) .tw\\:in-data-\\[slot\\=tooltip-content\\]\\:text-background{color:var(--background)}:where([data-slot=tooltip-content]) .tw\\:in-data-\\[slot\\=tooltip-content\\]\\:text-destructive{color:var(--destructive)}.tw\\:has-disabled\\:bg-input\\/50:has(:disabled){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:has-disabled\\:bg-input\\/50:has(:disabled){background-color:color-mix(in oklab, var(--input) 50%, transparent)}}.tw\\:has-disabled\\:opacity-50:has(:disabled){opacity:.5}.tw\\:has-aria-expanded\\:bg-muted\\/50:has([aria-expanded=true]){background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:has-aria-expanded\\:bg-muted\\/50:has([aria-expanded=true]){background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:has-data-\\[icon\\=inline-end\\]\\:pe-1:has([data-icon=inline-end]){padding-inline-end:calc(calc(var(--spacing)) * 1)}.tw\\:has-data-\\[icon\\=inline-end\\]\\:pe-1\\.5:has([data-icon=inline-end]){padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[icon\\=inline-end\\]\\:pe-2:has([data-icon=inline-end]){padding-inline-end:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[spacing\\=0\\]\\/toggle-group\\:has-data-\\[icon\\=inline-end\\]\\:pe-1\\.5:is(:where(.tw\\:group\\/toggle-group)[data-spacing="0"] *):has([data-icon=inline-end]){padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[icon\\=inline-start\\]\\:ps-1:has([data-icon=inline-start]){padding-inline-start:calc(calc(var(--spacing)) * 1)}.tw\\:has-data-\\[icon\\=inline-start\\]\\:ps-1\\.5:has([data-icon=inline-start]){padding-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[icon\\=inline-start\\]\\:ps-2:has([data-icon=inline-start]){padding-inline-start:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[spacing\\=0\\]\\/toggle-group\\:has-data-\\[icon\\=inline-start\\]\\:ps-1\\.5:is(:where(.tw\\:group\\/toggle-group)[data-spacing="0"] *):has([data-icon=inline-start]){padding-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[slot\\=alert-action\\]\\:relative:has([data-slot=alert-action]){position:relative}.tw\\:has-data-\\[slot\\=alert-action\\]\\:pe-18:has([data-slot=alert-action]){padding-inline-end:calc(calc(var(--spacing)) * 18)}.tw\\:has-data-\\[slot\\=card-action\\]\\:grid-cols-\\[1fr_auto\\]:has([data-slot=card-action]){grid-template-columns:1fr auto}.tw\\:has-data-\\[slot\\=card-description\\]\\:grid-rows-\\[auto_auto\\]:has([data-slot=card-description]){grid-template-rows:auto auto}.tw\\:has-data-\\[slot\\=card-footer\\]\\:pb-0:has([data-slot=card-footer]){padding-bottom:calc(calc(var(--spacing)) * 0)}.tw\\:has-data-\\[slot\\=kbd\\]\\:pe-0:has([data-slot=kbd]){padding-inline-end:calc(calc(var(--spacing)) * 0)}.tw\\:has-data-\\[slot\\=kbd\\]\\:pe-1\\.5:has([data-slot=kbd]){padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[variant\\=inset\\]\\:bg-sidebar:has([data-variant=inset]){background-color:var(--sidebar)}.tw\\:has-\\[\\[data-slot\\=input-group-control\\]\\:focus-visible\\]\\:border-ring:has([data-slot=input-group-control]:focus-visible){border-color:var(--ring)}.tw\\:has-\\[\\[data-slot\\=input-group-control\\]\\:focus-visible\\]\\:ring-3:has([data-slot=input-group-control]:focus-visible){--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:has-\\[\\[data-slot\\=input-group-control\\]\\:focus-visible\\]\\:ring-ring\\/50:has([data-slot=input-group-control]:focus-visible){--tw-ring-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.tw\\:has-\\[\\[data-slot\\=input-group-control\\]\\:focus-visible\\]\\:ring-ring\\/50:has([data-slot=input-group-control]:focus-visible){--tw-ring-color:color-mix(in oklab, var(--ring) 50%, transparent)}}.tw\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:border-destructive:has([data-slot][aria-invalid=true]){border-color:var(--destructive)}.tw\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-3:has([data-slot][aria-invalid=true]){--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-destructive\\/20:has([data-slot][aria-invalid=true]){--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-destructive\\/20:has([data-slot][aria-invalid=true]){--tw-ring-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:has-\\[\\>\\[data-align\\=block-end\\]\\]\\:h-auto:has(>[data-align=block-end]){height:auto}.tw\\:has-\\[\\>\\[data-align\\=block-end\\]\\]\\:flex-col:has(>[data-align=block-end]){flex-direction:column}.tw\\:has-\\[\\>\\[data-align\\=block-start\\]\\]\\:h-auto:has(>[data-align=block-start]){height:auto}.tw\\:has-\\[\\>\\[data-align\\=block-start\\]\\]\\:flex-col:has(>[data-align=block-start]){flex-direction:column}.tw\\:has-\\[\\>\\[data-slot\\=button-group\\]\\]\\:gap-2:has(>[data-slot=button-group]){gap:calc(calc(var(--spacing)) * 2)}.tw\\:has-\\[\\>button\\]\\:ms-\\[-0\\.3rem\\]:has(>button){margin-inline-start:-.3rem}.tw\\:has-\\[\\>button\\]\\:me-\\[-0\\.3rem\\]:has(>button){margin-inline-end:-.3rem}.tw\\:has-\\[\\>img\\]\\:grid-cols-\\[auto_1fr\\]:has(>img){grid-template-columns:auto 1fr}.tw\\:has-\\[\\>img\\]\\:gap-x-2:has(>img){column-gap:calc(calc(var(--spacing)) * 2)}.tw\\:has-\\[\\>img\\:first-child\\]\\:pt-0:has(>img:first-child){padding-top:calc(calc(var(--spacing)) * 0)}.tw\\:has-\\[\\>kbd\\]\\:ms-\\[-0\\.15rem\\]:has(>kbd){margin-inline-start:-.15rem}.tw\\:has-\\[\\>kbd\\]\\:me-\\[-0\\.15rem\\]:has(>kbd){margin-inline-end:-.15rem}.tw\\:has-\\[\\>svg\\]\\:grid-cols-\\[auto_1fr\\]:has(>svg){grid-template-columns:auto 1fr}.tw\\:has-\\[\\>svg\\]\\:gap-x-2:has(>svg){column-gap:calc(calc(var(--spacing)) * 2)}.tw\\:has-\\[\\>svg\\]\\:p-0:has(>svg){padding:calc(calc(var(--spacing)) * 0)}.tw\\:has-\\[\\>textarea\\]\\:h-auto:has(>textarea){height:auto}.tw\\:aria-disabled\\:pointer-events-none[aria-disabled=true]{pointer-events:none}.tw\\:aria-disabled\\:opacity-50[aria-disabled=true]{opacity:.5}.tw\\:aria-expanded\\:bg-muted[aria-expanded=true]{background-color:var(--muted)}.tw\\:aria-expanded\\:bg-secondary[aria-expanded=true]{background-color:var(--secondary)}.tw\\:aria-expanded\\:text-foreground[aria-expanded=true]{color:var(--foreground)}.tw\\:aria-expanded\\:text-secondary-foreground[aria-expanded=true]{color:var(--secondary-foreground)}.tw\\:aria-expanded\\:opacity-100[aria-expanded=true]{opacity:1}.tw\\:aria-invalid\\:border-destructive[aria-invalid=true]{border-color:var(--destructive)}.tw\\:aria-invalid\\:ring-0[aria-invalid=true]{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:aria-invalid\\:ring-3[aria-invalid=true]{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:aria-invalid\\:ring-destructive\\/20[aria-invalid=true]{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:aria-invalid\\:ring-destructive\\/20[aria-invalid=true]{--tw-ring-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:aria-invalid\\:aria-checked\\:border-primary[aria-invalid=true][aria-checked=true]{border-color:var(--primary)}.tw\\:aria-pressed\\:bg-muted[aria-pressed=true]{background-color:var(--muted)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:h-px[aria-orientation=horizontal]{height:1px}.tw\\:aria-\\[orientation\\=horizontal\\]\\:w-full[aria-orientation=horizontal]{width:100%}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:start-0[aria-orientation=horizontal]:after{content:var(--tw-content);inset-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:h-1[aria-orientation=horizontal]:after{content:var(--tw-content);height:calc(calc(var(--spacing)) * 1)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:w-full[aria-orientation=horizontal]:after{content:var(--tw-content);width:100%}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:translate-x-0[aria-orientation=horizontal]:after{content:var(--tw-content);--tw-translate-x:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:-translate-y-1\\/2[aria-orientation=horizontal]:after{content:var(--tw-content);--tw-translate-y:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:aria-\\[orientation\\=vertical\\]\\:flex-col[aria-orientation=vertical]{flex-direction:column}.tw\\:data-inset\\:ps-7[data-inset]{padding-inline-start:calc(calc(var(--spacing)) * 7)}.tw\\:data-placeholder\\:text-muted-foreground[data-placeholder]{color:var(--muted-foreground)}.tw\\:data-quiet-focus\\:focus-visible\\:border-transparent[data-quiet-focus]:focus-visible{border-color:#0000}.tw\\:data-quiet-focus\\:focus-visible\\:ring-0[data-quiet-focus]:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:data-quiet-focus\\:focus-visible\\:outline-none[data-quiet-focus]:focus-visible{--tw-outline-style:none;outline-style:none}.tw\\:data-\\[align-trigger\\=false\\]\\:min-w-36[data-align-trigger=false]{min-width:calc(calc(var(--spacing)) * 36)}.tw\\:data-\\[align-trigger\\=true\\]\\:min-w-\\(--radix-select-trigger-width\\)[data-align-trigger=true]{min-width:var(--radix-select-trigger-width)}.tw\\:data-\\[align-trigger\\=true\\]\\:animate-none[data-align-trigger=true]{animation:none}.tw\\:data-\\[disabled\\=true\\]\\:pointer-events-none[data-disabled=true]{pointer-events:none}.tw\\:data-\\[disabled\\=true\\]\\:opacity-50[data-disabled=true]{opacity:.5}.tw\\:data-\\[position\\=popper\\]\\:h-\\(--radix-select-trigger-height\\)[data-position=popper]{height:var(--radix-select-trigger-height)}.tw\\:data-\\[position\\=popper\\]\\:w-full[data-position=popper]{width:100%}.tw\\:data-\\[position\\=popper\\]\\:min-w-\\(--radix-select-trigger-width\\)[data-position=popper]{min-width:var(--radix-select-trigger-width)}.tw\\:data-\\[side\\=bottom\\]\\:translate-y-1[data-side=bottom]{--tw-translate-y:calc(calc(var(--spacing)) * 1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=bottom\\]\\:slide-in-from-top-2[data-side=bottom]{--tw-enter-translate-y:calc(2*var(--spacing)*-1)}.tw\\:data-\\[side\\=left\\]\\:-translate-x-1[data-side=left]{--tw-translate-x:calc(calc(var(--spacing)) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=left\\]\\:slide-in-from-right-2[data-side=left]{--tw-enter-translate-x:calc(2*var(--spacing))}.tw\\:data-\\[side\\=right\\]\\:translate-x-1[data-side=right]{--tw-translate-x:calc(calc(var(--spacing)) * 1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=right\\]\\:slide-in-from-left-2[data-side=right]{--tw-enter-translate-x:calc(2*var(--spacing)*-1)}.tw\\:data-\\[side\\=top\\]\\:-translate-y-1[data-side=top]{--tw-translate-y:calc(calc(var(--spacing)) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=top\\]\\:slide-in-from-bottom-2[data-side=top]{--tw-enter-translate-y:calc(2*var(--spacing))}.tw\\:data-\\[size\\=default\\]\\:h-8[data-size=default]{height:calc(calc(var(--spacing)) * 8)}.tw\\:data-\\[size\\=default\\]\\:h-\\[18\\.4px\\][data-size=default]{height:18.4px}.tw\\:data-\\[size\\=default\\]\\:w-\\[32px\\][data-size=default]{width:32px}.tw\\:data-\\[size\\=lg\\]\\:size-10[data-size=lg]{width:calc(calc(var(--spacing)) * 10);height:calc(calc(var(--spacing)) * 10)}.tw\\:data-\\[size\\=md\\]\\:text-sm[data-size=md]{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:data-\\[size\\=sm\\]\\:size-6[data-size=sm]{width:calc(calc(var(--spacing)) * 6);height:calc(calc(var(--spacing)) * 6)}.tw\\:data-\\[size\\=sm\\]\\:h-7[data-size=sm]{height:calc(calc(var(--spacing)) * 7)}.tw\\:data-\\[size\\=sm\\]\\:h-\\[14px\\][data-size=sm]{height:14px}.tw\\:data-\\[size\\=sm\\]\\:w-\\[24px\\][data-size=sm]{width:24px}.tw\\:data-\\[size\\=sm\\]\\:gap-3[data-size=sm]{gap:calc(calc(var(--spacing)) * 3)}.tw\\:data-\\[size\\=sm\\]\\:rounded-\\[min\\(var\\(--tw-radius-md\\)\\,10px\\)\\][data-size=sm]{border-radius:min(var(--tw-radius-md), 10px)}.tw\\:data-\\[size\\=sm\\]\\:py-3[data-size=sm]{padding-block:calc(calc(var(--spacing)) * 3)}.tw\\:data-\\[size\\=sm\\]\\:text-xs[data-size=sm]{font-size:var(--tw-text-xs);line-height:var(--tw-leading,var(--tw-text-xs--line-height))}.tw\\:data-\\[size\\=sm\\]\\:has-data-\\[slot\\=card-footer\\]\\:pb-0[data-size=sm]:has([data-slot=card-footer]){padding-bottom:calc(calc(var(--spacing)) * 0)}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-item\\]\\:focus\\:bg-foreground\\/10 *)[data-slot$=-item]:focus{background-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-item\\]\\:focus\\:bg-foreground\\/10 *)[data-slot$=-item]:focus{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)}}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-item\\]\\:data-highlighted\\:bg-foreground\\/10 *)[data-slot$=-item][data-highlighted]{background-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-item\\]\\:data-highlighted\\:bg-foreground\\/10 *)[data-slot$=-item][data-highlighted]{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)}}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-separator\\]\\:bg-foreground\\/5 *)[data-slot$=-separator]{background-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-separator\\]\\:bg-foreground\\/5 *)[data-slot$=-separator]{background-color:color-mix(in oklab, var(--foreground) 5%, transparent)}}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-trigger\\]\\:focus\\:bg-foreground\\/10 *)[data-slot$=-trigger]:focus{background-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-trigger\\]\\:focus\\:bg-foreground\\/10 *)[data-slot$=-trigger]:focus{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)}}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-trigger\\]\\:aria-expanded\\:bg-foreground\\/10\\! *)[data-slot$=-trigger][aria-expanded=true]{background-color:var(--foreground)!important}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-trigger\\]\\:aria-expanded\\:bg-foreground\\/10\\! *)[data-slot$=-trigger][aria-expanded=true]{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)!important}}:is(.tw\\:\\*\\:data-\\[slot\\=alert-description\\]\\:text-destructive\\/90>*)[data-slot=alert-description]{color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\:data-\\[slot\\=alert-description\\]\\:text-destructive\\/90>*)[data-slot=alert-description]{color:color-mix(in oklab, var(--destructive) 90%, transparent)}}:is(.tw\\:\\*\\:data-\\[slot\\=avatar\\]\\:ring-2>*)[data-slot=avatar]{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}:is(.tw\\:\\*\\:data-\\[slot\\=avatar\\]\\:ring-background>*)[data-slot=avatar]{--tw-ring-color:var(--background)}:is(.tw\\:\\*\\:data-\\[slot\\=input-group-addon\\]\\:ps-2\\!>*)[data-slot=input-group-addon]{padding-inline-start:calc(calc(var(--spacing)) * 2)!important}:is(.tw\\:\\*\\*\\:data-\\[slot\\=kbd\\]\\:relative *)[data-slot=kbd]{position:relative}:is(.tw\\:\\*\\*\\:data-\\[slot\\=kbd\\]\\:isolate *)[data-slot=kbd]{isolation:isolate}:is(.tw\\:\\*\\*\\:data-\\[slot\\=kbd\\]\\:z-50 *)[data-slot=kbd]{z-index:50}:is(.tw\\:\\*\\*\\:data-\\[slot\\=kbd\\]\\:rounded-sm *)[data-slot=kbd]{border-radius:calc(var(--radius) * .6)}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:line-clamp-1>*)[data-slot=select-value]{-webkit-line-clamp:1;-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:flex>*)[data-slot=select-value]{display:flex}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:flex-1>*)[data-slot=select-value]{flex:1}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:items-center>*)[data-slot=select-value]{align-items:center}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:gap-1\\.5>*)[data-slot=select-value]{gap:calc(calc(var(--spacing)) * 1.5)}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:text-start>*)[data-slot=select-value]{text-align:start}.tw\\:group-data-horizontal\\/toggle-group\\:data-\\[spacing\\=0\\]\\:first\\:rounded-s-lg:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=horizontal]) *)[data-spacing="0"]:first-child{border-start-start-radius:var(--radius);border-end-start-radius:var(--radius)}.tw\\:group-data-vertical\\/toggle-group\\:data-\\[spacing\\=0\\]\\:first\\:rounded-t-lg:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=vertical]) *)[data-spacing="0"]:first-child{border-top-left-radius:var(--radius);border-top-right-radius:var(--radius)}.tw\\:group-data-horizontal\\/toggle-group\\:data-\\[spacing\\=0\\]\\:last\\:rounded-e-lg:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=horizontal]) *)[data-spacing="0"]:last-child{border-start-end-radius:var(--radius);border-end-end-radius:var(--radius)}.tw\\:group-data-vertical\\/toggle-group\\:data-\\[spacing\\=0\\]\\:last\\:rounded-b-lg:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=vertical]) *)[data-spacing="0"]:last-child{border-bottom-right-radius:var(--radius);border-bottom-left-radius:var(--radius)}.tw\\:data-\\[state\\=active\\]\\:bg-background[data-state=active]{background-color:var(--background)}.tw\\:data-\\[state\\=active\\]\\:text-foreground[data-state=active]{color:var(--foreground)}.tw\\:data-\\[state\\=active\\]\\:shadow-sm[data-state=active]{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:data-\\[state\\=closed\\]\\:overflow-hidden[data-state=closed]{overflow:hidden}.tw\\:data-\\[state\\=delayed-open\\]\\:animate-in[data-state=delayed-open]{animation:enter var(--tw-animation-duration,var(--tw-duration,.15s))var(--tw-ease,ease)var(--tw-animation-delay,0s)var(--tw-animation-iteration-count,1)var(--tw-animation-direction,normal)var(--tw-animation-fill-mode,none)}.tw\\:data-\\[state\\=delayed-open\\]\\:fade-in-0[data-state=delayed-open]{--tw-enter-opacity:0}.tw\\:data-\\[state\\=delayed-open\\]\\:zoom-in-95[data-state=delayed-open]{--tw-enter-scale:.95}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-soft-approved\\)\\][data-state=on]{background-color:var(--inv-soft-approved)}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-soft-unapproved\\)\\][data-state=on]{background-color:var(--inv-soft-unapproved)}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-soft-unknown\\)\\][data-state=on]{background-color:var(--inv-soft-unknown)}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-vivid-approved\\)\\][data-state=on]{background-color:var(--inv-vivid-approved)}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-vivid-unapproved\\)\\][data-state=on]{background-color:var(--inv-vivid-unapproved)}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-vivid-unknown\\)\\][data-state=on]{background-color:var(--inv-vivid-unknown)}.tw\\:data-\\[state\\=on\\]\\:bg-muted[data-state=on]{background-color:var(--muted)}.tw\\:data-\\[state\\=on\\]\\:text-\\[var\\(--inv-icon-approved\\)\\][data-state=on]{color:var(--inv-icon-approved)}.tw\\:data-\\[state\\=on\\]\\:text-\\[var\\(--inv-icon-unapproved\\)\\][data-state=on]{color:var(--inv-icon-unapproved)}.tw\\:data-\\[state\\=on\\]\\:text-\\[var\\(--inv-icon-unknown\\)\\][data-state=on]{color:var(--inv-icon-unknown)}.tw\\:data-\\[state\\=on\\]\\:text-\\[var\\(--inv-on\\)\\][data-state=on]{color:var(--inv-on)}.tw\\:data-\\[state\\=on\\]\\:text-foreground[data-state=on]{color:var(--foreground)}.tw\\:data-\\[state\\=open\\]\\:bg-accent[data-state=open]{background-color:var(--accent)}.tw\\:data-\\[state\\=open\\]\\:bg-muted[data-state=open]{background-color:var(--muted)}.tw\\:data-\\[state\\=open\\]\\:text-foreground[data-state=open]{color:var(--foreground)}.tw\\:data-\\[state\\=selected\\]\\:bg-muted[data-state=selected]{background-color:var(--muted)}.tw\\:data-\\[variant\\=destructive\\]\\:text-destructive[data-variant=destructive]{color:var(--destructive)}:is(:is(.tw\\:\\*\\*\\:data-\\[variant\\=destructive\\]\\:\\*\\*\\:text-accent-foreground\\! *)[data-variant=destructive] *),:is(.tw\\:\\*\\*\\:data-\\[variant\\=destructive\\]\\:text-accent-foreground\\! *)[data-variant=destructive]{color:var(--accent-foreground)!important}.tw\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-destructive\\/10[data-variant=destructive]:focus{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-destructive\\/10[data-variant=destructive]:focus{background-color:color-mix(in oklab, var(--destructive) 10%, transparent)}}.tw\\:data-\\[variant\\=destructive\\]\\:focus\\:text-destructive[data-variant=destructive]:focus{color:var(--destructive)}:is(.tw\\:\\*\\*\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-foreground\\/10\\! *)[data-variant=destructive]:focus{background-color:var(--foreground)!important}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-foreground\\/10\\! *)[data-variant=destructive]:focus{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)!important}}.tw\\:data-\\[variant\\=line\\]\\:rounded-none[data-variant=line]{border-radius:0}.tw\\:group-data-horizontal\\/toggle-group\\:data-\\[spacing\\=0\\]\\:data-\\[variant\\=outline\\]\\:border-s-0:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=horizontal]) *)[data-spacing="0"][data-variant=outline]{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:group-data-vertical\\/toggle-group\\:data-\\[spacing\\=0\\]\\:data-\\[variant\\=outline\\]\\:border-t-0:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=vertical]) *)[data-spacing="0"][data-variant=outline]{border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:group-data-horizontal\\/toggle-group\\:data-\\[spacing\\=0\\]\\:data-\\[variant\\=outline\\]\\:first\\:border-s:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=horizontal]) *)[data-spacing="0"][data-variant=outline]:first-child{border-inline-start-style:var(--tw-border-style);border-inline-start-width:1px}.tw\\:group-data-vertical\\/toggle-group\\:data-\\[spacing\\=0\\]\\:data-\\[variant\\=outline\\]\\:first\\:border-t:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=vertical]) *)[data-spacing="0"][data-variant=outline]:first-child{border-top-style:var(--tw-border-style);border-top-width:1px}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:inset-x-0[data-vaul-drawer-direction=bottom]{inset-inline:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:bottom-0[data-vaul-drawer-direction=bottom]{bottom:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:mt-24[data-vaul-drawer-direction=bottom]{margin-top:calc(calc(var(--spacing)) * 24)}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:max-h-\\[80vh\\][data-vaul-drawer-direction=bottom]{max-height:80vh}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:rounded-t-xl[data-vaul-drawer-direction=bottom]{border-top-left-radius:calc(var(--radius) * 1.4);border-top-right-radius:calc(var(--radius) * 1.4)}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:border-t[data-vaul-drawer-direction=bottom]{border-top-style:var(--tw-border-style);border-top-width:1px}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:inset-y-0[data-vaul-drawer-direction=left]{inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:left-0[data-vaul-drawer-direction=left]{left:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:w-3\\/4[data-vaul-drawer-direction=left]{width:75%}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:flex-row[data-vaul-drawer-direction=left]{flex-direction:row}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:rounded-r-xl[data-vaul-drawer-direction=left]{border-top-right-radius:calc(var(--radius) * 1.4);border-bottom-right-radius:calc(var(--radius) * 1.4)}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:border-r[data-vaul-drawer-direction=left]{border-right-style:var(--tw-border-style);border-right-width:1px}.tw\\:data-\\[vaul-drawer-direction\\=left\\/right\\]\\:flex-row[data-vaul-drawer-direction=left\\/right]{flex-direction:row}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:inset-y-0[data-vaul-drawer-direction=right]{inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:right-0[data-vaul-drawer-direction=right]{right:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:w-3\\/4[data-vaul-drawer-direction=right]{width:75%}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:flex-row[data-vaul-drawer-direction=right]{flex-direction:row}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:rounded-l-xl[data-vaul-drawer-direction=right]{border-top-left-radius:calc(var(--radius) * 1.4);border-bottom-left-radius:calc(var(--radius) * 1.4)}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:border-l[data-vaul-drawer-direction=right]{border-left-style:var(--tw-border-style);border-left-width:1px}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:inset-x-0[data-vaul-drawer-direction=top]{inset-inline:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:top-0[data-vaul-drawer-direction=top]{top:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:mb-24[data-vaul-drawer-direction=top]{margin-bottom:calc(calc(var(--spacing)) * 24)}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:max-h-\\[80vh\\][data-vaul-drawer-direction=top]{max-height:80vh}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:rounded-b-xl[data-vaul-drawer-direction=top]{border-bottom-right-radius:calc(var(--radius) * 1.4);border-bottom-left-radius:calc(var(--radius) * 1.4)}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:border-b[data-vaul-drawer-direction=top]{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}@supports ((-webkit-backdrop-filter:var(--tw)) or (backdrop-filter:var(--tw))){.tw\\:supports-backdrop-filter\\:backdrop-blur-xs{--tw-backdrop-blur:blur(var(--tw-blur-xs));-webkit-backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)}}@media (min-width:40rem){.tw\\:sm\\:flex{display:flex}.tw\\:sm\\:max-w-sm{max-width:var(--tw-container-sm)}.tw\\:sm\\:flex-row{flex-direction:row}.tw\\:sm\\:justify-end{justify-content:flex-end}.tw\\:sm\\:p-8{padding:calc(calc(var(--spacing)) * 8)}.tw\\:sm\\:text-start{text-align:start}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:sm\\:max-w-sm[data-vaul-drawer-direction=left],.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:sm\\:max-w-sm[data-vaul-drawer-direction=right]{max-width:var(--tw-container-sm)}}@media (min-width:48rem){.tw\\:md\\:block{display:block}.tw\\:md\\:flex{display:flex}.tw\\:md\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.tw\\:md\\:gap-0\\.5{gap:calc(calc(var(--spacing)) * .5)}.tw\\:md\\:text-start{text-align:start}.tw\\:md\\:text-sm{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:md\\:text-pretty{text-wrap:pretty}.tw\\:md\\:opacity-0{opacity:0}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:m-2:is(:where(.tw\\:peer)[data-variant=inset]~*){margin:calc(calc(var(--spacing)) * 2)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:ms-0:is(:where(.tw\\:peer)[data-variant=inset]~*){margin-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:rounded-xl:is(:where(.tw\\:peer)[data-variant=inset]~*){border-radius:calc(var(--radius) * 1.4)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:shadow-sm:is(:where(.tw\\:peer)[data-variant=inset]~*){--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:peer-data-\\[state\\=collapsed\\]\\:ms-2:is(:where(.tw\\:peer)[data-variant=inset]~*):is(:where(.tw\\:peer)[data-state=collapsed]~*){margin-inline-start:calc(calc(var(--spacing)) * 2)}.tw\\:md\\:after\\:hidden:after{content:var(--tw-content);display:none}}@media (min-width:64rem){.tw\\:lg\\:flex{display:flex}.tw\\:lg\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}:where(.tw\\:lg\\:space-x-8>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 8) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 8) * calc(1 - var(--tw-space-x-reverse)))}.tw\\:lg\\:text-5xl{font-size:var(--tw-text-5xl);line-height:var(--tw-leading,var(--tw-text-5xl--line-height))}}@media (min-width:48rem){@media (min-width:64rem){.tw\\:md\\:lg\\:hidden{display:none}}}@media (min-width:80rem){.tw\\:xl\\:auto-cols-fr{grid-auto-columns:minmax(0,1fr)}.tw\\:xl\\:grid-flow-col{grid-auto-flow:column}.tw\\:xl\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.tw\\:xl\\:grid-cols-none{grid-template-columns:none}.tw\\:xl\\:grid-rows-2{grid-template-rows:repeat(2,minmax(0,1fr))}}@container search not (min-width:7rem){.tw\\:\\@max-\\[7rem\\]\\/search\\:hidden{display:none}.tw\\:\\@max-\\[7rem\\]\\/search\\:ps-3{padding-inline-start:calc(calc(var(--spacing)) * 3)}}@container search not (min-width:4rem){.tw\\:\\@max-\\[4rem\\]\\/search\\:hidden{display:none}.tw\\:\\@max-\\[4rem\\]\\/search\\:pe-3{padding-inline-end:calc(calc(var(--spacing)) * 3)}}@container search not (min-width:3rem){.tw\\:\\@max-\\[3rem\\]\\/search\\:ps-0{padding-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:\\@max-\\[3rem\\]\\/search\\:pe-0{padding-inline-end:calc(calc(var(--spacing)) * 0)}}@container (min-width:24rem){.tw\\:\\@sm\\:basis-auto{flex-basis:auto}}.tw\\:ltr\\:left-2:where(:dir(ltr),[dir=ltr],[dir=ltr] *){left:calc(calc(var(--spacing)) * 2)}.tw\\:ltr\\:-translate-x-1\\/2:where(:dir(ltr),[dir=ltr],[dir=ltr] *){--tw-translate-x:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:right-2:where(:dir(rtl),[dir=rtl],[dir=rtl] *){right:calc(calc(var(--spacing)) * 2)}.tw\\:rtl\\:flex:where(:dir(rtl),[dir=rtl],[dir=rtl] *){display:flex}.tw\\:rtl\\:-translate-x-px:where(:dir(rtl),[dir=rtl],[dir=rtl] *){--tw-translate-x:-1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:translate-x-1\\/2:where(:dir(rtl),[dir=rtl],[dir=rtl] *){--tw-translate-x:calc(1 / 2 * 100%);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:translate-x-px:where(:dir(rtl),[dir=rtl],[dir=rtl] *){--tw-translate-x:1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:after\\:translate-x-1\\/2:where(:dir(rtl),[dir=rtl],[dir=rtl] *):after{content:var(--tw-content);--tw-translate-x:calc(1 / 2 * 100%);translate:var(--tw-translate-x) var(--tw-translate-y)}:where([data-side=primary]) .tw\\:rtl\\:in-data-\\[side\\=primary\\]\\:cursor-e-resize:where(:dir(rtl),[dir=rtl],[dir=rtl] *){cursor:e-resize}:where([data-side=secondary]) .tw\\:rtl\\:in-data-\\[side\\=secondary\\]\\:cursor-w-resize:where(:dir(rtl),[dir=rtl],[dir=rtl] *){cursor:w-resize}.tw\\:rtl\\:aria-\\[orientation\\=horizontal\\]\\:after\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *)[aria-orientation=horizontal]:after{content:var(--tw-content);--tw-translate-x:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:data-\\[side\\=left\\]\\:translate-x-1:where(:dir(rtl),[dir=rtl],[dir=rtl] *)[data-side=left]{--tw-translate-x:calc(calc(var(--spacing)) * 1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:data-\\[side\\=right\\]\\:-translate-x-1:where(:dir(rtl),[dir=rtl],[dir=rtl] *)[data-side=right]{--tw-translate-x:calc(calc(var(--spacing)) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:dark\\:border-input:is(.dark *){border-color:var(--input)}.tw\\:dark\\:bg-destructive\\/20:is(.dark *){background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:bg-destructive\\/20:is(.dark *){background-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:dark\\:bg-input\\/30:is(.dark *){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:bg-input\\/30:is(.dark *){background-color:color-mix(in oklab, var(--input) 30%, transparent)}}.tw\\:dark\\:bg-transparent:is(.dark *){background-color:#0000}.tw\\:dark\\:text-amber-400:is(.dark *){color:var(--tw-color-amber-400)}.tw\\:dark\\:text-muted-foreground:is(.dark *){color:var(--muted-foreground)}.tw\\:dark\\:text-rose-400:is(.dark *){color:var(--tw-color-rose-400)}.tw\\:dark\\:text-sky-400:is(.dark *){color:var(--tw-color-sky-400)}.tw\\:dark\\:text-teal-400:is(.dark *){color:var(--tw-color-teal-400)}.tw\\:dark\\:after\\:mix-blend-lighten:is(.dark *):after{content:var(--tw-content);mix-blend-mode:lighten}@media (hover:hover){.tw\\:dark\\:hover\\:bg-blue-500:is(.dark *):hover{background-color:var(--tw-color-blue-500)}.tw\\:dark\\:hover\\:bg-destructive\\/30:is(.dark *):hover{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:hover\\:bg-destructive\\/30:is(.dark *):hover{background-color:color-mix(in oklab, var(--destructive) 30%, transparent)}}.tw\\:dark\\:hover\\:bg-input\\/50:is(.dark *):hover{background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:hover\\:bg-input\\/50:is(.dark *):hover{background-color:color-mix(in oklab, var(--input) 50%, transparent)}}.tw\\:dark\\:hover\\:bg-muted\\/50:is(.dark *):hover{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:hover\\:bg-muted\\/50:is(.dark *):hover{background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:dark\\:hover\\:text-foreground:is(.dark *):hover{color:var(--foreground)}}.tw\\:dark\\:focus-visible\\:ring-destructive\\/40:is(.dark *):focus-visible{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:focus-visible\\:ring-destructive\\/40:is(.dark *):focus-visible{--tw-ring-color:color-mix(in oklab, var(--destructive) 40%, transparent)}}.tw\\:dark\\:disabled\\:bg-input\\/80:is(.dark *):disabled{background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:disabled\\:bg-input\\/80:is(.dark *):disabled{background-color:color-mix(in oklab, var(--input) 80%, transparent)}}.tw\\:dark\\:disabled\\:bg-transparent:is(.dark *):disabled{background-color:#0000}:where([data-slot=tooltip-content]) .tw\\:dark\\:in-data-\\[slot\\=tooltip-content\\]\\:bg-background\\/10:is(.dark *){background-color:var(--background)}@supports (color:color-mix(in lab, red, red)){:where([data-slot=tooltip-content]) .tw\\:dark\\:in-data-\\[slot\\=tooltip-content\\]\\:bg-background\\/10:is(.dark *){background-color:color-mix(in oklab, var(--background) 10%, transparent)}}.tw\\:dark\\:has-disabled\\:bg-input\\/80:is(.dark *):has(:disabled){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:has-disabled\\:bg-input\\/80:is(.dark *):has(:disabled){background-color:color-mix(in oklab, var(--input) 80%, transparent)}}.tw\\:dark\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-destructive\\/40:is(.dark *):has([data-slot][aria-invalid=true]){--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-destructive\\/40:is(.dark *):has([data-slot][aria-invalid=true]){--tw-ring-color:color-mix(in oklab, var(--destructive) 40%, transparent)}}.tw\\:dark\\:aria-invalid\\:border-destructive\\/50:is(.dark *)[aria-invalid=true]{border-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:aria-invalid\\:border-destructive\\/50:is(.dark *)[aria-invalid=true]{border-color:color-mix(in oklab, var(--destructive) 50%, transparent)}}.tw\\:dark\\:aria-invalid\\:ring-destructive\\/40:is(.dark *)[aria-invalid=true]{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:aria-invalid\\:ring-destructive\\/40:is(.dark *)[aria-invalid=true]{--tw-ring-color:color-mix(in oklab, var(--destructive) 40%, transparent)}}.tw\\:dark\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-destructive\\/20:is(.dark *)[data-variant=destructive]:focus{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-destructive\\/20:is(.dark *)[data-variant=destructive]:focus{background-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:data-open\\:animate-in:where([data-state=open]),.tw\\:data-open\\:animate-in:where([data-open]:not([data-open=false])){animation:enter var(--tw-animation-duration,var(--tw-duration,.15s))var(--tw-ease,ease)var(--tw-animation-delay,0s)var(--tw-animation-iteration-count,1)var(--tw-animation-direction,normal)var(--tw-animation-fill-mode,none)}.tw\\:data-open\\:bg-accent:where([data-state=open]),.tw\\:data-open\\:bg-accent:where([data-open]:not([data-open=false])){background-color:var(--accent)}.tw\\:data-open\\:text-accent-foreground:where([data-state=open]),.tw\\:data-open\\:text-accent-foreground:where([data-open]:not([data-open=false])){color:var(--accent-foreground)}.tw\\:data-open\\:fade-in-0:where([data-state=open]),.tw\\:data-open\\:fade-in-0:where([data-open]:not([data-open=false])){--tw-enter-opacity:0}.tw\\:data-open\\:zoom-in-95:where([data-state=open]),.tw\\:data-open\\:zoom-in-95:where([data-open]:not([data-open=false])){--tw-enter-scale:.95}@media (hover:hover){:is(.tw\\:data-open\\:hover\\:bg-sidebar-accent:where([data-state=open]),.tw\\:data-open\\:hover\\:bg-sidebar-accent:where([data-open]:not([data-open=false]))):hover{background-color:var(--sidebar-accent)}:is(.tw\\:data-open\\:hover\\:text-sidebar-accent-foreground:where([data-state=open]),.tw\\:data-open\\:hover\\:text-sidebar-accent-foreground:where([data-open]:not([data-open=false]))):hover{color:var(--sidebar-accent-foreground)}}.tw\\:data-closed\\:animate-out:where([data-state=closed]),.tw\\:data-closed\\:animate-out:where([data-closed]:not([data-closed=false])){animation:exit var(--tw-animation-duration,var(--tw-duration,.15s))var(--tw-ease,ease)var(--tw-animation-delay,0s)var(--tw-animation-iteration-count,1)var(--tw-animation-direction,normal)var(--tw-animation-fill-mode,none)}.tw\\:data-closed\\:fade-out-0:where([data-state=closed]),.tw\\:data-closed\\:fade-out-0:where([data-closed]:not([data-closed=false])){--tw-exit-opacity:0}.tw\\:data-closed\\:zoom-out-95:where([data-state=closed]),.tw\\:data-closed\\:zoom-out-95:where([data-closed]:not([data-closed=false])){--tw-exit-scale:.95}.tw\\:data-checked\\:border-primary:where([data-state=checked]),.tw\\:data-checked\\:border-primary:where([data-checked]:not([data-checked=false])){border-color:var(--primary)}.tw\\:data-checked\\:bg-primary:where([data-state=checked]),.tw\\:data-checked\\:bg-primary:where([data-checked]:not([data-checked=false])){background-color:var(--primary)}.tw\\:data-checked\\:text-primary-foreground:where([data-state=checked]),.tw\\:data-checked\\:text-primary-foreground:where([data-checked]:not([data-checked=false])){color:var(--primary-foreground)}.tw\\:group-data-\\[size\\=default\\]\\/switch\\:data-checked\\:translate-x-\\[calc\\(100\\%-2px\\)\\]:is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-state=checked]),.tw\\:group-data-\\[size\\=default\\]\\/switch\\:data-checked\\:translate-x-\\[calc\\(100\\%-2px\\)\\]:is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-checked]:not([data-checked=false])),.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:data-checked\\:translate-x-\\[calc\\(100\\%-2px\\)\\]:is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-state=checked]),.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:data-checked\\:translate-x-\\[calc\\(100\\%-2px\\)\\]:is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-checked]:not([data-checked=false])){--tw-translate-x:calc(100% - 2px);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:group-data-\\[size\\=default\\]\\/switch\\:data-checked\\:-translate-x-\\[calc\\(100\\%-2px\\)\\]:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-state=checked]),.tw\\:rtl\\:group-data-\\[size\\=default\\]\\/switch\\:data-checked\\:-translate-x-\\[calc\\(100\\%-2px\\)\\]:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-checked]:not([data-checked=false])),.tw\\:rtl\\:group-data-\\[size\\=sm\\]\\/switch\\:data-checked\\:-translate-x-\\[calc\\(100\\%-2px\\)\\]:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-state=checked]),.tw\\:rtl\\:group-data-\\[size\\=sm\\]\\/switch\\:data-checked\\:-translate-x-\\[calc\\(100\\%-2px\\)\\]:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-checked]:not([data-checked=false])){--tw-translate-x:calc(calc(100% - 2px) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:dark\\:data-checked\\:bg-primary:is(.dark *):where([data-state=checked]),.tw\\:dark\\:data-checked\\:bg-primary:is(.dark *):where([data-checked]:not([data-checked=false])){background-color:var(--primary)}.tw\\:dark\\:data-checked\\:bg-primary-foreground:is(.dark *):where([data-state=checked]),.tw\\:dark\\:data-checked\\:bg-primary-foreground:is(.dark *):where([data-checked]:not([data-checked=false])){background-color:var(--primary-foreground)}.tw\\:data-unchecked\\:bg-input:where([data-state=unchecked]),.tw\\:data-unchecked\\:bg-input:where([data-unchecked]:not([data-unchecked=false])){background-color:var(--input)}.tw\\:group-data-\\[size\\=default\\]\\/switch\\:data-unchecked\\:translate-x-0:is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-state=unchecked]),.tw\\:group-data-\\[size\\=default\\]\\/switch\\:data-unchecked\\:translate-x-0:is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-unchecked]:not([data-unchecked=false])),.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:data-unchecked\\:translate-x-0:is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-state=unchecked]),.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:data-unchecked\\:translate-x-0:is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-unchecked]:not([data-unchecked=false])),.tw\\:rtl\\:group-data-\\[size\\=default\\]\\/switch\\:data-unchecked\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-state=unchecked]),.tw\\:rtl\\:group-data-\\[size\\=default\\]\\/switch\\:data-unchecked\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-unchecked]:not([data-unchecked=false])),.tw\\:rtl\\:group-data-\\[size\\=sm\\]\\/switch\\:data-unchecked\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-state=unchecked]),.tw\\:rtl\\:group-data-\\[size\\=sm\\]\\/switch\\:data-unchecked\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-unchecked]:not([data-unchecked=false])){--tw-translate-x:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:dark\\:data-unchecked\\:bg-foreground:is(.dark *):where([data-state=unchecked]),.tw\\:dark\\:data-unchecked\\:bg-foreground:is(.dark *):where([data-unchecked]:not([data-unchecked=false])){background-color:var(--foreground)}.tw\\:dark\\:data-unchecked\\:bg-input\\/80:is(.dark *):where([data-state=unchecked]),.tw\\:dark\\:data-unchecked\\:bg-input\\/80:is(.dark *):where([data-unchecked]:not([data-unchecked=false])){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:data-unchecked\\:bg-input\\/80:is(.dark *):where([data-state=unchecked]),.tw\\:dark\\:data-unchecked\\:bg-input\\/80:is(.dark *):where([data-unchecked]:not([data-unchecked=false])){background-color:color-mix(in oklab, var(--input) 80%, transparent)}}.tw\\:data-selected\\:bg-muted:where([data-selected=true]),.tw\\:data-selected\\:bg-muted\\/50:where([data-selected=true]){background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:data-selected\\:bg-muted\\/50:where([data-selected=true]){background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:data-selected\\:bg-primary:where([data-selected=true]){background-color:var(--primary)}.tw\\:data-selected\\:bg-transparent:where([data-selected=true]){background-color:#0000}.tw\\:data-selected\\:text-foreground:where([data-selected=true]){color:var(--foreground)}.tw\\:data-selected\\:text-inherit:where([data-selected=true]){color:inherit}.tw\\:data-selected\\:text-muted-foreground\\/50:where([data-selected=true]){color:var(--muted-foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:data-selected\\:text-muted-foreground\\/50:where([data-selected=true]){color:color-mix(in oklab, var(--muted-foreground) 50%, transparent)}}.tw\\:data-selected\\:text-primary-foreground:where([data-selected=true]){color:var(--primary-foreground)}.tw\\:data-selected\\:ring-2:where([data-selected=true]){--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:data-selected\\:ring-primary-foreground\\/70:where([data-selected=true]){--tw-ring-color:var(--primary-foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:data-selected\\:ring-primary-foreground\\/70:where([data-selected=true]){--tw-ring-color:color-mix(in oklab, var(--primary-foreground) 70%, transparent)}}.tw\\:data-selected\\:ring-ring\\/50:where([data-selected=true]){--tw-ring-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.tw\\:data-selected\\:ring-ring\\/50:where([data-selected=true]){--tw-ring-color:color-mix(in oklab, var(--ring) 50%, transparent)}}.tw\\:data-selected\\:ring-inset:where([data-selected=true]){--tw-ring-inset:inset}@media (forced-colors:active){.tw\\:forced-colors\\:data-selected\\:outline-2:where([data-selected=true]){outline-style:var(--tw-outline-style);outline-width:2px}.tw\\:forced-colors\\:data-selected\\:-outline-offset-2:where([data-selected=true]){outline-offset:calc(2px * -1)}.tw\\:forced-colors\\:data-selected\\:outline-\\[color\\:Highlight\\]:where([data-selected=true]){outline-color:highlight}}.tw\\:data-disabled\\:pointer-events-none:where([data-disabled=true]),.tw\\:data-disabled\\:pointer-events-none:where([data-disabled]:not([data-disabled=false])){pointer-events:none}.tw\\:data-disabled\\:cursor-not-allowed:where([data-disabled=true]),.tw\\:data-disabled\\:cursor-not-allowed:where([data-disabled]:not([data-disabled=false])){cursor:not-allowed}.tw\\:data-disabled\\:opacity-50:where([data-disabled=true]),.tw\\:data-disabled\\:opacity-50:where([data-disabled]:not([data-disabled=false])){opacity:.5}.tw\\:data-active\\:bg-background:where([data-state=active]),.tw\\:data-active\\:bg-background:where([data-active]:not([data-active=false])){background-color:var(--background)}.tw\\:data-active\\:bg-sidebar-accent:where([data-state=active]),.tw\\:data-active\\:bg-sidebar-accent:where([data-active]:not([data-active=false])){background-color:var(--sidebar-accent)}.tw\\:data-active\\:font-medium:where([data-state=active]),.tw\\:data-active\\:font-medium:where([data-active]:not([data-active=false])){--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}.tw\\:data-active\\:text-foreground:where([data-state=active]),.tw\\:data-active\\:text-foreground:where([data-active]:not([data-active=false])){color:var(--foreground)}.tw\\:data-active\\:text-sidebar-accent-foreground:where([data-state=active]),.tw\\:data-active\\:text-sidebar-accent-foreground:where([data-active]:not([data-active=false])){color:var(--sidebar-accent-foreground)}.tw\\:group-data-\\[variant\\=default\\]\\/tabs-list\\:data-active\\:shadow-sm:is(:where(.tw\\:group\\/tabs-list)[data-variant=default] *):where([data-state=active]),.tw\\:group-data-\\[variant\\=default\\]\\/tabs-list\\:data-active\\:shadow-sm:is(:where(.tw\\:group\\/tabs-list)[data-variant=default] *):where([data-active]:not([data-active=false])){--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:bg-transparent:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:bg-transparent:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false])){background-color:#0000}.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:shadow-none:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:shadow-none:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false])){--tw-shadow:0 0 #0000;box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}:is(.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:after\\:opacity-100:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:after\\:opacity-100:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false]))):after{content:var(--tw-content);opacity:1}.tw\\:dark\\:data-active\\:border-input:is(.dark *):where([data-state=active]),.tw\\:dark\\:data-active\\:border-input:is(.dark *):where([data-active]:not([data-active=false])){border-color:var(--input)}.tw\\:dark\\:data-active\\:bg-input\\/30:is(.dark *):where([data-state=active]),.tw\\:dark\\:data-active\\:bg-input\\/30:is(.dark *):where([data-active]:not([data-active=false])){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:data-active\\:bg-input\\/30:is(.dark *):where([data-state=active]),.tw\\:dark\\:data-active\\:bg-input\\/30:is(.dark *):where([data-active]:not([data-active=false])){background-color:color-mix(in oklab, var(--input) 30%, transparent)}}.tw\\:dark\\:data-active\\:text-foreground:is(.dark *):where([data-state=active]),.tw\\:dark\\:data-active\\:text-foreground:is(.dark *):where([data-active]:not([data-active=false])){color:var(--foreground)}.tw\\:dark\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:border-transparent:is(.dark *):is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:dark\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:border-transparent:is(.dark *):is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false])){border-color:#0000}.tw\\:dark\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:bg-transparent:is(.dark *):is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:dark\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:bg-transparent:is(.dark *):is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false])){background-color:#0000}.tw\\:data-horizontal\\:mx-px:where([data-orientation=horizontal]){margin-inline:1px}.tw\\:data-horizontal\\:h-1:where([data-orientation=horizontal]){height:calc(calc(var(--spacing)) * 1)}.tw\\:data-horizontal\\:h-full:where([data-orientation=horizontal]){height:100%}.tw\\:data-horizontal\\:h-px:where([data-orientation=horizontal]){height:1px}.tw\\:data-horizontal\\:w-auto:where([data-orientation=horizontal]){width:auto}.tw\\:data-horizontal\\:w-full:where([data-orientation=horizontal]){width:100%}.tw\\:data-horizontal\\:flex-col:where([data-orientation=horizontal]){flex-direction:column}.tw\\:data-vertical\\:my-px:where([data-orientation=vertical]){margin-block:1px}.tw\\:data-vertical\\:h-auto:where([data-orientation=vertical]){height:auto}.tw\\:data-vertical\\:h-full:where([data-orientation=vertical]){height:100%}.tw\\:data-vertical\\:min-h-40:where([data-orientation=vertical]){min-height:calc(calc(var(--spacing)) * 40)}.tw\\:data-vertical\\:w-1:where([data-orientation=vertical]){width:calc(calc(var(--spacing)) * 1)}.tw\\:data-vertical\\:w-auto:where([data-orientation=vertical]){width:auto}.tw\\:data-vertical\\:w-full:where([data-orientation=vertical]){width:100%}.tw\\:data-vertical\\:w-px:where([data-orientation=vertical]){width:1px}.tw\\:data-vertical\\:flex-col:where([data-orientation=vertical]){flex-direction:column}.tw\\:data-vertical\\:items-stretch:where([data-orientation=vertical]){align-items:stretch}.tw\\:data-vertical\\:self-stretch:where([data-orientation=vertical]){align-self:stretch}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:mt-0 [data-lexical-editor=true]>blockquote{margin-top:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:border-s-0 [data-lexical-editor=true]>blockquote{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:ps-0 [data-lexical-editor=true]>blockquote{padding-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:font-normal [data-lexical-editor=true]>blockquote{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:text-foreground [data-lexical-editor=true]>blockquote{color:var(--foreground)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:not-italic [data-lexical-editor=true]>blockquote{font-style:normal}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:mt-0 [data-lexical-editor=\\"true\\"]>blockquote{margin-top:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:border-s-0 [data-lexical-editor=\\"true\\"]>blockquote{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:ps-0 [data-lexical-editor=\\"true\\"]>blockquote{padding-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:font-normal [data-lexical-editor=\\"true\\"]>blockquote{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:text-foreground [data-lexical-editor=\\"true\\"]>blockquote{color:var(--foreground)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:not-italic [data-lexical-editor=\\"true\\"]>blockquote{font-style:normal}.tw\\:\\[\\&_a\\]\\:underline a{text-decoration-line:underline}.tw\\:\\[\\&_a\\]\\:underline-offset-3 a{text-underline-offset:3px}@media (hover:hover){.tw\\:\\[\\&_a\\]\\:hover\\:text-foreground a:hover{color:var(--foreground)}}.tw\\:\\[\\&_p\\]\\:my-0 p{margin-block:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_p\\:not\\(\\:last-child\\)\\]\\:mb-4 p:not(:last-child){margin-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&_s\\]\\:text-destructive s{color:var(--destructive)}.tw\\:\\[\\&_s\\]\\:line-through s{text-decoration-line:line-through}.tw\\:\\[\\&_svg\\]\\:pointer-events-none svg{pointer-events:none}.tw\\:\\[\\&_svg\\]\\:size-4 svg{width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&_svg\\]\\:shrink-0 svg{flex-shrink:0}.tw\\:\\[\\&_svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-3 svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:\\[\\&_svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-3\\.5 svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 3.5);height:calc(calc(var(--spacing)) * 3.5)}.tw\\:\\[\\&_svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-4 svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&_tr\\]\\:border-b tr{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}.tw\\:\\[\\&_tr\\:last-child\\]\\:border-0 tr:last-child{border-style:var(--tw-border-style);border-width:0}.tw\\:\\[\\&_u\\]\\:font-semibold u{--tw-font-weight:var(--tw-font-weight-semibold);font-weight:var(--tw-font-weight-semibold)}.tw\\:\\[\\&_u\\]\\:text-success-foreground u{color:var(--success-foreground)}.tw\\:\\[\\&_u\\]\\:no-underline u{text-decoration-line:none}.tw\\:\\[\\&\\:has\\(\\[role\\=checkbox\\]\\)\\]\\:pe-0:has([role=checkbox]){padding-inline-end:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\.border-b\\]\\:pb-2.border-b{padding-bottom:calc(calc(var(--spacing)) * 2)}.tw\\:\\[\\.border-b\\]\\:pb-4.border-b{padding-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[size\\=sm\\]\\/card\\:\\[\\.border-b\\]\\:pb-3:is(:where(.tw\\:group\\/card)[data-size=sm] *).border-b{padding-bottom:calc(calc(var(--spacing)) * 3)}.tw\\:\\[\\.border-t\\]\\:pt-2.border-t{padding-top:calc(calc(var(--spacing)) * 2)}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:px-2 *)[cmdk-group-heading]{padding-inline:calc(calc(var(--spacing)) * 2)}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:py-1\\.5 *)[cmdk-group-heading]{padding-block:calc(calc(var(--spacing)) * 1.5)}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:text-xs *)[cmdk-group-heading]{font-size:var(--tw-text-xs);line-height:var(--tw-leading,var(--tw-text-xs--line-height))}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:font-medium *)[cmdk-group-heading]{--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:text-muted-foreground *)[cmdk-group-heading]{color:var(--muted-foreground)}:is(.tw\\:\\*\\:\\[a\\]\\:underline>*):is(a){text-decoration-line:underline}:is(.tw\\:\\*\\:\\[a\\]\\:underline-offset-3>*):is(a){text-underline-offset:3px}@media (hover:hover){.tw\\:\\[a\\]\\:hover\\:bg-destructive\\/20:is(a):hover{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:\\[a\\]\\:hover\\:bg-destructive\\/20:is(a):hover{background-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:\\[a\\]\\:hover\\:bg-muted:is(a):hover{background-color:var(--muted)}.tw\\:\\[a\\]\\:hover\\:bg-primary\\/80:is(a):hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:\\[a\\]\\:hover\\:bg-primary\\/80:is(a):hover{background-color:color-mix(in oklab, var(--primary) 80%, transparent)}}.tw\\:\\[a\\]\\:hover\\:bg-secondary\\/80:is(a):hover{background-color:var(--secondary)}@supports (color:color-mix(in lab, red, red)){.tw\\:\\[a\\]\\:hover\\:bg-secondary\\/80:is(a):hover{background-color:color-mix(in oklab, var(--secondary) 80%, transparent)}}.tw\\:\\[a\\]\\:hover\\:text-muted-foreground:is(a):hover{color:var(--muted-foreground)}:is(.tw\\:\\*\\:\\[a\\]\\:hover\\:text-foreground>*):is(a):hover{color:var(--foreground)}}:is(.tw\\:\\*\\:\\[img\\]\\:row-span-2>*):is(img){grid-row:span 2/span 2}:is(.tw\\:\\*\\:\\[img\\]\\:translate-y-0\\.5>*):is(img){--tw-translate-y:calc(calc(var(--spacing)) * .5);translate:var(--tw-translate-x) var(--tw-translate-y)}:is(.tw\\:\\*\\:\\[img\\]\\:text-current>*):is(img){color:currentColor}:is(.tw\\:\\*\\:\\[img\\:first-child\\]\\:rounded-t-xl>*):is(img:first-child){border-top-left-radius:calc(var(--radius) * 1.4);border-top-right-radius:calc(var(--radius) * 1.4)}:is(.tw\\:\\*\\:\\[img\\:last-child\\]\\:rounded-b-xl>*):is(img:last-child){border-bottom-right-radius:calc(var(--radius) * 1.4);border-bottom-left-radius:calc(var(--radius) * 1.4)}:is(.tw\\:\\*\\:\\[img\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-4>*):is(img:not([class*=size-])){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}:is(.tw\\:\\*\\:\\[span\\]\\:last\\:flex>*):is(span):last-child{display:flex}:is(.tw\\:\\*\\:\\[span\\]\\:last\\:items-center>*):is(span):last-child{align-items:center}:is(.tw\\:\\*\\:\\[span\\]\\:last\\:gap-2>*):is(span):last-child{gap:calc(calc(var(--spacing)) * 2)}:is(.tw\\:\\*\\:\\[svg\\]\\:row-span-2>*):is(svg){grid-row:span 2/span 2}:is(.tw\\:\\*\\:\\[svg\\]\\:translate-y-0\\.5>*):is(svg){--tw-translate-y:calc(calc(var(--spacing)) * .5);translate:var(--tw-translate-x) var(--tw-translate-y)}:is(.tw\\:\\*\\:\\[svg\\]\\:text-current>*):is(svg){color:currentColor}:is(.tw\\:focus\\:\\*\\:\\[svg\\]\\:text-accent-foreground:focus>*):is(svg){color:var(--accent-foreground)}:is(.tw\\:data-\\[variant\\=destructive\\]\\:\\*\\:\\[svg\\]\\:text-destructive[data-variant=destructive]>*):is(svg){color:var(--destructive)}:is(.tw\\:data-\\[variant\\=destructive\\]\\:\\*\\:\\[svg\\]\\:text-destructive\\![data-variant=destructive]>*):is(svg){color:var(--destructive)!important}:is(.tw\\:data-selected\\:\\*\\:\\[svg\\]\\:text-foreground:where([data-selected=true])>*):is(svg){color:var(--foreground)}:is(.tw\\:\\*\\:\\[svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-4>*):is(svg:not([class*=size-])){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:rounded-s-none>:not(:first-child){border-start-start-radius:0;border-end-start-radius:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:rounded-t-none>:not(:first-child){border-top-left-radius:0;border-top-right-radius:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:border-s-0>:not(:first-child){border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:border-t-0>:not(:first-child){border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:last-child\\)\\]\\:rounded-e-none>:not(:last-child){border-start-end-radius:0;border-end-end-radius:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:last-child\\)\\]\\:rounded-b-none>:not(:last-child){border-bottom-right-radius:0;border-bottom-left-radius:0}.tw\\:has-\\[select\\[aria-hidden\\=true\\]\\:last-child\\]\\:\\[\\&\\>\\[data-slot\\=select-trigger\\]\\:last-of-type\\]\\:rounded-e-lg:has(:is(select[aria-hidden=true]:last-child))>[data-slot=select-trigger]:last-of-type{border-start-end-radius:var(--radius);border-end-end-radius:var(--radius)}.tw\\:\\[\\&\\>\\[data-slot\\=select-trigger\\]\\:not\\(\\[class\\*\\=w-\\]\\)\\]\\:w-fit>[data-slot=select-trigger]:not([class*=w-]){width:fit-content}.tw\\:\\[\\&\\>\\[data-slot\\]\\:not\\(\\:has\\(\\~\\[data-slot\\]\\)\\)\\]\\:rounded-e-lg\\!>[data-slot]:not(:has(~[data-slot])){border-start-end-radius:var(--radius)!important;border-end-end-radius:var(--radius)!important}.tw\\:\\[\\&\\>\\[data-slot\\]\\:not\\(\\:has\\(\\~\\[data-slot\\]\\)\\)\\]\\:rounded-b-lg\\!>[data-slot]:not(:has(~[data-slot])){border-bottom-right-radius:var(--radius)!important;border-bottom-left-radius:var(--radius)!important}.tw\\:\\[\\&\\>a\\]\\:underline>a{text-decoration-line:underline}.tw\\:\\[\\&\\>a\\]\\:underline-offset-4>a{text-underline-offset:4px}.tw\\:\\[\\&\\>a\\:hover\\]\\:text-primary>a:hover{color:var(--primary)}.tw\\:\\[\\&\\>blockquote\\]\\:my-0>blockquote{margin-block:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&\\>blockquote\\]\\:border-s-0>blockquote{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&\\>blockquote\\]\\:p-0>blockquote{padding:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&\\>blockquote\\]\\:ps-0>blockquote{padding-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&\\>blockquote\\]\\:font-normal>blockquote{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:\\[\\&\\>blockquote\\]\\:text-foreground>blockquote{color:var(--foreground)}.tw\\:\\[\\&\\>blockquote\\]\\:not-italic>blockquote{font-style:normal}.tw\\:\\[\\&\\>input\\]\\:flex-1>input{flex:1}.tw\\:has-\\[\\>\\[data-align\\=block-end\\]\\]\\:\\[\\&\\>input\\]\\:pt-3:has(>[data-align=block-end])>input{padding-top:calc(calc(var(--spacing)) * 3)}.tw\\:has-\\[\\>\\[data-align\\=block-start\\]\\]\\:\\[\\&\\>input\\]\\:pb-3:has(>[data-align=block-start])>input{padding-bottom:calc(calc(var(--spacing)) * 3)}.tw\\:has-\\[\\>\\[data-align\\=inline-end\\]\\]\\:\\[\\&\\>input\\]\\:pe-1\\.5:has(>[data-align=inline-end])>input{padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-\\[\\>\\[data-align\\=inline-start\\]\\]\\:\\[\\&\\>input\\]\\:ps-1\\.5:has(>[data-align=inline-start])>input{padding-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:\\[\\&\\>kbd\\]\\:rounded-\\[calc\\(var\\(--radius\\)-5px\\)\\]>kbd{border-radius:calc(var(--radius) - 5px)}.tw\\:\\[\\&\\>li\\]\\:mt-2>li{margin-top:calc(calc(var(--spacing)) * 2)}.tw\\:\\[\\&\\>span\\:last-child\\]\\:truncate>span:last-child{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.tw\\:\\[\\&\\>svg\\]\\:pointer-events-none>svg{pointer-events:none}.tw\\:\\[\\&\\>svg\\]\\:hidden>svg{display:none}.tw\\:\\[\\&\\>svg\\]\\:size-3\\!>svg{width:calc(calc(var(--spacing)) * 3)!important;height:calc(calc(var(--spacing)) * 3)!important}.tw\\:\\[\\&\\>svg\\]\\:size-3\\.5>svg{width:calc(calc(var(--spacing)) * 3.5);height:calc(calc(var(--spacing)) * 3.5)}.tw\\:\\[\\&\\>svg\\]\\:size-4>svg{width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&\\>svg\\]\\:shrink-0>svg{flex-shrink:0}.tw\\:\\[\\&\\>svg\\]\\:text-sidebar-accent-foreground>svg{color:var(--sidebar-accent-foreground)}.tw\\:group-has-data-\\[size\\=lg\\]\\/avatar-group\\:\\[\\&\\>svg\\]\\:size-5:is(:where(.tw\\:group\\/avatar-group):has([data-size=lg]) *)>svg{width:calc(calc(var(--spacing)) * 5);height:calc(calc(var(--spacing)) * 5)}.tw\\:group-has-data-\\[size\\=sm\\]\\/avatar-group\\:\\[\\&\\>svg\\]\\:size-3:is(:where(.tw\\:group\\/avatar-group):has([data-size=sm]) *)>svg{width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[size\\=default\\]\\/avatar\\:\\[\\&\\>svg\\]\\:size-2:is(:where(.tw\\:group\\/avatar)[data-size=default] *)>svg,.tw\\:group-data-\\[size\\=lg\\]\\/avatar\\:\\[\\&\\>svg\\]\\:size-2:is(:where(.tw\\:group\\/avatar)[data-size=lg] *)>svg{width:calc(calc(var(--spacing)) * 2);height:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[size\\=sm\\]\\/avatar\\:\\[\\&\\>svg\\]\\:hidden:is(:where(.tw\\:group\\/avatar)[data-size=sm] *)>svg,.tw\\:\\[\\&\\>svg\\:last-child\\]\\:hidden>svg:last-child{display:none}.tw\\:\\[\\&\\>svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-3\\.5>svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 3.5);height:calc(calc(var(--spacing)) * 3.5)}.tw\\:\\[\\&\\>svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-4>svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&\\>tr\\]\\:last\\:border-b-0>tr:last-child{border-bottom-style:var(--tw-border-style);border-bottom-width:0}.tw\\:\\[\\&\\[align\\=center\\]\\]\\:text-center[align=center]{text-align:center}.tw\\:\\[\\&\\[align\\=right\\]\\]\\:text-right[align=right]{text-align:right}.tw\\:\\[\\&\\[aria-orientation\\=horizontal\\]\\>div\\]\\:rotate-90[aria-orientation=horizontal]>div{rotate:90deg}[data-side=primary][data-collapsible=offcanvas] .tw\\:\\[\\[data-side\\=primary\\]\\[data-collapsible\\=offcanvas\\]_\\&\\]\\:-end-2{inset-inline-end:calc(calc(var(--spacing)) * -2)}[data-side=primary][data-state=collapsed] .tw\\:\\[\\[data-side\\=primary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-e-resize{cursor:e-resize}[data-side=primary][data-state=collapsed] .tw\\:rtl\\:\\[\\[data-side\\=primary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-w-resize:where(:dir(rtl),[dir=rtl],[dir=rtl] *){cursor:w-resize}[data-side=secondary][data-collapsible=offcanvas] .tw\\:\\[\\[data-side\\=secondary\\]\\[data-collapsible\\=offcanvas\\]_\\&\\]\\:-start-2{inset-inline-start:calc(calc(var(--spacing)) * -2)}[data-side=secondary][data-state=collapsed] .tw\\:\\[\\[data-side\\=secondary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-w-resize{cursor:w-resize}[data-side=secondary][data-state=collapsed] .tw\\:rtl\\:\\[\\[data-side\\=secondary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-e-resize:where(:dir(rtl),[dir=rtl],[dir=rtl] *){cursor:e-resize}}@property --tw-animation-delay{syntax:"*";inherits:false;initial-value:0s}@property --tw-animation-direction{syntax:"*";inherits:false;initial-value:normal}@property --tw-animation-duration{syntax:"*";inherits:false}@property --tw-animation-fill-mode{syntax:"*";inherits:false;initial-value:none}@property --tw-animation-iteration-count{syntax:"*";inherits:false;initial-value:1}@property --tw-enter-blur{syntax:"*";inherits:false;initial-value:0}@property --tw-enter-opacity{syntax:"*";inherits:false;initial-value:1}@property --tw-enter-rotate{syntax:"*";inherits:false;initial-value:0}@property --tw-enter-scale{syntax:"*";inherits:false;initial-value:1}@property --tw-enter-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-enter-translate-y{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-blur{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-opacity{syntax:"*";inherits:false;initial-value:1}@property --tw-exit-rotate{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-scale{syntax:"*";inherits:false;initial-value:1}@property --tw-exit-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-translate-y{syntax:"*";inherits:false;initial-value:0}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-cyrillic-ext-wght-normal.woff2)format("woff2-variations");unicode-range:U+460-52F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-cyrillic-wght-normal.woff2)format("woff2-variations");unicode-range:U+301,U+400-45F,U+490-491,U+4B0-4B1,U+2116}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-greek-wght-normal.woff2)format("woff2-variations");unicode-range:U+370-377,U+37A-37F,U+384-38A,U+38C,U+38E-3A1,U+3A3-3FF}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-vietnamese-wght-normal.woff2)format("woff2-variations");unicode-range:U+102-103,U+110-111,U+128-129,U+168-169,U+1A0-1A1,U+1AF-1B0,U+300-301,U+303-304,U+308-309,U+323,U+329,U+1EA0-1EF9,U+20AB}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-latin-ext-wght-normal.woff2)format("woff2-variations");unicode-range:U+100-2BA,U+2BD-2C5,U+2C7-2CC,U+2CE-2D7,U+2DD-2FF,U+304,U+308,U+329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-latin-wght-normal.woff2)format("woff2-variations");unicode-range:U+??,U+131,U+152-153,U+2BB-2BC,U+2C6,U+2DA,U+2DC,U+304,U+308,U+329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}.light,:root{--radius:.625rem;--spacing:.25rem;--background:oklch(100% 0 0);--foreground:oklch(13.71% .036 258.53);--card:oklch(100% 0 0);--card-foreground:oklch(13.71% .036 258.53);--popover:oklch(98.43% .0018 248.56);--popover-foreground:oklch(13.71% .036 258.53);--primary:oklch(20.79% .0399 265.73);--primary-foreground:oklch(98.38% .0036 248.23);--secondary:oklch(95.89% .011 248.06);--secondary-foreground:oklch(20.79% .0399 265.73);--muted:oklch(95.89% .011 248.06);--muted-foreground:oklch(55.47% .0408 257.45);--accent:oklch(95.89% .011 248.06);--accent-foreground:oklch(20.79% .0399 265.73);--destructive:oklch(63.69% .2077 25.32);--destructive-foreground:oklch(98.38% .0036 248.23);--success-foreground:oklch(62.7% .194 149.214);--diff-deleted:oklch(57.7% .245 27.325);--warning:oklch(84% .16 84);--warning-foreground:oklch(28% .07 46);--border:oklch(92.9% .0127 255.58);--input:oklch(92.9% .0127 255.58);--ring:oklch(13.71% .036 258.53);--chart-1:oklch(64.6% .222 41.116);--chart-2:oklch(60% .118 184.704);--chart-3:oklch(39.8% .07 227.392);--chart-4:oklch(82.8% .189 84.429);--chart-5:oklch(76.9% .188 70.08);--sidebar:oklch(98.43% .0018 248.56);--sidebar-foreground:oklch(13.71% .036 258.53);--sidebar-primary:oklch(20.79% .0399 265.73);--sidebar-primary-foreground:oklch(98.38% .0036 248.23);--sidebar-accent:oklch(95.89% .011 248.06);--sidebar-accent-foreground:oklch(20.79% .0399 265.73);--sidebar-border:oklch(92.9% .0127 255.58);--sidebar-ring:oklch(13.71% .036 258.53)}.dark{--background:oklch(13.71% .036 258.53);--foreground:oklch(98.38% .0036 248.23);--card:oklch(13.71% .036 258.53);--card-foreground:oklch(98.38% .0036 248.23);--popover:oklch(13.71% .036 258.53);--popover-foreground:oklch(98.38% .0036 248.23);--primary:oklch(98.38% .0036 248.23);--primary-foreground:oklch(20.79% .0399 265.73);--secondary:oklch(28% .037 259.98);--secondary-foreground:oklch(98.38% .0036 248.23);--muted:oklch(28% .037 259.98);--muted-foreground:oklch(71.07% .0351 256.8);--accent:oklch(28% .037 259.98);--accent-foreground:oklch(98.38% .0036 248.23);--destructive:oklch(39.6% .1331 25.71);--destructive-foreground:oklch(98.38% .0036 248.23);--success-foreground:oklch(79.2% .209 151.711);--diff-deleted:oklch(70.4% .191 22.216);--warning:oklch(41% .11 46);--warning-foreground:oklch(99% .02 95);--border:oklch(44.54% .0374 257.3);--input:oklch(44.54% .0374 257.3);--ring:oklch(86.88% .0199 252.89);--chart-1:oklch(48.8% .243 264.376);--chart-2:oklch(69.6% .17 162.48);--chart-3:oklch(76.9% .188 70.08);--chart-4:oklch(62.7% .265 303.9);--chart-5:oklch(64.5% .246 16.439);--sidebar:oklch(13.71% .036 258.53);--sidebar-foreground:oklch(71.07% .0351 256.8);--sidebar-primary:oklch(98.38% .0036 248.23);--sidebar-primary-foreground:oklch(20.79% .0399 265.73);--sidebar-accent:oklch(28% .037 259.98);--sidebar-accent-foreground:oklch(71.07% .0351 256.8);--sidebar-border:oklch(28% .037 259.98);--sidebar-ring:oklch(86.88% .0199 252.89)}.paratext-light{--background:oklch(100% 0 0);--foreground:oklch(15.3% .006 107.1);--card:oklch(100% 0 0);--card-foreground:oklch(15.3% .006 107.1);--popover:oklch(100% 0 0);--popover-foreground:oklch(15.3% .006 107.1);--primary:oklch(55.5% .163 48.998);--primary-foreground:oklch(98.7% .022 95.277);--secondary:oklch(96.7% .001 286.375);--secondary-foreground:oklch(21% .006 285.885);--muted:oklch(96.6% .005 106.5);--muted-foreground:oklch(58% .031 107.3);--accent:oklch(96.6% .005 106.5);--accent-foreground:oklch(22.8% .013 107.4);--destructive:oklch(57.7% .245 27.325);--destructive-foreground:oklch(98.38% .0036 248.23);--success-foreground:oklch(62.7% .194 149.214);--diff-deleted:oklch(57.7% .245 27.325);--warning:oklch(84% .16 84);--warning-foreground:oklch(28% .07 46);--border:oklch(93% .007 106.5);--input:oklch(93% .007 106.5);--ring:oklch(73.7% .021 106.9);--chart-1:oklch(88% .011 106.6);--chart-2:oklch(58% .031 107.3);--chart-3:oklch(46.6% .025 107.3);--chart-4:oklch(39.4% .023 107.4);--chart-5:oklch(28.6% .016 107.4);--sidebar:oklch(98.8% .003 106.5);--sidebar-foreground:oklch(15.3% .006 107.1);--sidebar-primary:oklch(66.6% .179 58.318);--sidebar-primary-foreground:oklch(98.7% .022 95.277);--sidebar-accent:oklch(96.6% .005 106.5);--sidebar-accent-foreground:oklch(22.8% .013 107.4);--sidebar-border:oklch(93% .007 106.5);--sidebar-ring:oklch(73.7% .021 106.9)}.paratext-dark{--background:oklch(15.3% .006 107.1);--foreground:oklch(98.8% .003 106.5);--card:oklch(22.8% .013 107.4);--card-foreground:oklch(98.8% .003 106.5);--popover:oklch(22.8% .013 107.4);--popover-foreground:oklch(98.8% .003 106.5);--primary:oklch(47.3% .137 46.201);--primary-foreground:oklch(98.7% .022 95.277);--secondary:oklch(27.4% .006 286.033);--secondary-foreground:oklch(98.5% 0 0);--muted:oklch(28.6% .016 107.4);--muted-foreground:oklch(73.7% .021 106.9);--accent:oklch(28.6% .016 107.4);--accent-foreground:oklch(98.8% .003 106.5);--destructive:oklch(70.4% .191 22.216);--destructive-foreground:oklch(98.38% .0036 248.23);--success-foreground:oklch(79.2% .209 151.711);--diff-deleted:oklch(70.4% .191 22.216);--warning:oklch(41% .11 46);--warning-foreground:oklch(99% .02 95);--border:oklch(100% 0 0/.1);--input:oklch(100% 0 0/.15);--ring:oklch(58% .031 107.3);--chart-1:oklch(88% .011 106.6);--chart-2:oklch(58% .031 107.3);--chart-3:oklch(46.6% .025 107.3);--chart-4:oklch(39.4% .023 107.4);--chart-5:oklch(28.6% .016 107.4);--sidebar:oklch(22.8% .013 107.4);--sidebar-foreground:oklch(98.8% .003 106.5);--sidebar-primary:oklch(76.9% .188 70.08);--sidebar-primary-foreground:oklch(27.9% .077 45.635);--sidebar-accent:oklch(28.6% .016 107.4);--sidebar-accent-foreground:oklch(98.8% .003 106.5);--sidebar-border:oklch(100% 0 0/.1);--sidebar-ring:oklch(58% .031 107.3)}@property --tw-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-y{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-z{syntax:"*";inherits:false;initial-value:0}@property --tw-rotate-x{syntax:"*";inherits:false}@property --tw-rotate-y{syntax:"*";inherits:false}@property --tw-rotate-z{syntax:"*";inherits:false}@property --tw-skew-x{syntax:"*";inherits:false}@property --tw-skew-y{syntax:"*";inherits:false}@property --tw-space-y-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-space-x-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-divide-x-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-border-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-divide-y-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-gradient-position{syntax:"*";inherits:false}@property --tw-gradient-from{syntax:"<color>";inherits:false;initial-value:#0000}@property --tw-gradient-via{syntax:"<color>";inherits:false;initial-value:#0000}@property --tw-gradient-to{syntax:"<color>";inherits:false;initial-value:#0000}@property --tw-gradient-stops{syntax:"*";inherits:false}@property --tw-gradient-via-stops{syntax:"*";inherits:false}@property --tw-gradient-from-position{syntax:"<length-percentage>";inherits:false;initial-value:0%}@property --tw-gradient-via-position{syntax:"<length-percentage>";inherits:false;initial-value:50%}@property --tw-gradient-to-position{syntax:"<length-percentage>";inherits:false;initial-value:100%}@property --tw-leading{syntax:"*";inherits:false}@property --tw-font-weight{syntax:"*";inherits:false}@property --tw-tracking{syntax:"*";inherits:false}@property --tw-ordinal{syntax:"*";inherits:false}@property --tw-slashed-zero{syntax:"*";inherits:false}@property --tw-numeric-figure{syntax:"*";inherits:false}@property --tw-numeric-spacing{syntax:"*";inherits:false}@property --tw-numeric-fraction{syntax:"*";inherits:false}@property --tw-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-shadow-color{syntax:"*";inherits:false}@property --tw-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-inset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-shadow-color{syntax:"*";inherits:false}@property --tw-inset-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-ring-color{syntax:"*";inherits:false}@property --tw-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-ring-color{syntax:"*";inherits:false}@property --tw-inset-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-ring-inset{syntax:"*";inherits:false}@property --tw-ring-offset-width{syntax:"<length>";inherits:false;initial-value:0}@property --tw-ring-offset-color{syntax:"*";inherits:false;initial-value:#fff}@property --tw-ring-offset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-blur{syntax:"*";inherits:false}@property --tw-brightness{syntax:"*";inherits:false}@property --tw-contrast{syntax:"*";inherits:false}@property --tw-grayscale{syntax:"*";inherits:false}@property --tw-hue-rotate{syntax:"*";inherits:false}@property --tw-invert{syntax:"*";inherits:false}@property --tw-opacity{syntax:"*";inherits:false}@property --tw-saturate{syntax:"*";inherits:false}@property --tw-sepia{syntax:"*";inherits:false}@property --tw-drop-shadow{syntax:"*";inherits:false}@property --tw-drop-shadow-color{syntax:"*";inherits:false}@property --tw-drop-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-drop-shadow-size{syntax:"*";inherits:false}@property --tw-duration{syntax:"*";inherits:false}@property --tw-ease{syntax:"*";inherits:false}@property --tw-content{syntax:"*";inherits:false;initial-value:""}@property --tw-outline-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-backdrop-blur{syntax:"*";inherits:false}@property --tw-backdrop-brightness{syntax:"*";inherits:false}@property --tw-backdrop-contrast{syntax:"*";inherits:false}@property --tw-backdrop-grayscale{syntax:"*";inherits:false}@property --tw-backdrop-hue-rotate{syntax:"*";inherits:false}@property --tw-backdrop-invert{syntax:"*";inherits:false}@property --tw-backdrop-opacity{syntax:"*";inherits:false}@property --tw-backdrop-saturate{syntax:"*";inherits:false}@property --tw-backdrop-sepia{syntax:"*";inherits:false}@keyframes spin{to{transform:rotate(360deg)}}@keyframes pulse{50%{opacity:.5}}@keyframes enter{0%{opacity:var(--tw-enter-opacity,1);transform:translate3d(var(--tw-enter-translate-x,0),var(--tw-enter-translate-y,0),0)scale3d(var(--tw-enter-scale,1),var(--tw-enter-scale,1),var(--tw-enter-scale,1))rotate(var(--tw-enter-rotate,0));filter:blur(var(--tw-enter-blur,0))}}@keyframes exit{to{opacity:var(--tw-exit-opacity,1);transform:translate3d(var(--tw-exit-translate-x,0),var(--tw-exit-translate-y,0),0)scale3d(var(--tw-exit-scale,1),var(--tw-exit-scale,1),var(--tw-exit-scale,1))rotate(var(--tw-exit-rotate,0));filter:blur(var(--tw-exit-blur,0))}}
`, "after-all");
export {
  Cf as Alert,
  Ef as AlertDescription,
  Tf as AlertTitle,
  Zw as Avatar,
  Xw as AvatarFallback,
  Ih as AvatarImage,
  yh as BOOK_CHAPTER_CONTROL_STRING_KEYS,
  kh as BOOK_SELECTOR_STRING_KEYS,
  Ur as Badge,
  Ya as BookChapterControl,
  xo as BookSelectionMode,
  _h as BookSelector,
  et as Button,
  Oa as ButtonGroup,
  Eo as ButtonGroupSeparator,
  Sf as ButtonGroupText,
  ts as CANCEL_ACCEPT_BUTTONS_STRING_KEYS,
  Eh as COMMENT_EDITOR_STRING_KEYS,
  Gw as COMMENT_LIST_ELEMENT_ID,
  Th as COMMENT_LIST_STRING_KEYS,
  Nh as CONFLICT_NOTE_STRING_KEYS,
  Rf as CONTENT_ZOOM_CSS_VARIABLE_PREFIX,
  Df as CONTENT_ZOOM_DEFAULT_CSS_VARIABLE,
  Of as CONTENT_ZOOM_POPUP_ATTRIBUTE,
  Mf as CONTENT_ZOOM_ROOT_ATTRIBUTE,
  es as CancelAcceptButtons,
  Ww as Card,
  Yw as CardContent,
  Oh as CardDescription,
  Mh as CardFooter,
  Rh as CardHeader,
  Dh as CardTitle,
  Rd as ChapterRangeSelector,
  ss as Checkbox,
  Og as CheckboxGroup,
  Bp as Checklist,
  yn as ComboBox,
  wr as Command,
  Ma as CommandEmpty,
  Xe as CommandGroup,
  Da as CommandInput,
  tr as CommandItem,
  ur as CommandList,
  Ch as CommentEditor,
  zh as CommentList,
  eu as ConflictNoteCard,
  Ds as ContentZoomAreaProvider,
  su as ContentZoomRoot,
  Ag as ContextMenu,
  qg as ContextMenuCheckboxItem,
  jg as ContextMenuContent,
  Vg as ContextMenuGroup,
  Ug as ContextMenuItem,
  Wg as ContextMenuLabel,
  Lg as ContextMenuPortal,
  Fg as ContextMenuRadioGroup,
  Gg as ContextMenuRadioItem,
  Yg as ContextMenuSeparator,
  Zg as ContextMenuShortcut,
  Bg as ContextMenuSub,
  Hg as ContextMenuSubContent,
  Kg as ContextMenuSubTrigger,
  $g as ContextMenuTrigger,
  pu as DataTable,
  Mg as DestructiveKeyConfirmation,
  io as Dialog,
  If as DialogClose,
  so as DialogContent,
  zf as DialogDescription,
  rn as DialogFooter,
  co as DialogHeader,
  Pf as DialogOverlay,
  Af as DialogPortal,
  lo as DialogTitle,
  $f as DialogTrigger,
  pp as DisabledActionTooltip,
  Gr as DisabledTooltipWrapper,
  Xg as Drawer,
  Qg as DrawerClose,
  tf as DrawerContent,
  of as DrawerDescription,
  rf as DrawerFooter,
  ef as DrawerHeader,
  Up as DrawerOverlay,
  jp as DrawerPortal,
  af as DrawerTitle,
  Jg as DrawerTrigger,
  Be as DropdownMenu,
  Ze as DropdownMenuCheckboxItem,
  Fe as DropdownMenuContent,
  Wn as DropdownMenuGroup,
  Ge as DropdownMenuItem,
  fu as DropdownMenuItemType,
  cr as DropdownMenuLabel,
  Gs as DropdownMenuPortal,
  Os as DropdownMenuRadioGroup,
  Ms as DropdownMenuRadioItem,
  ir as DropdownMenuSeparator,
  Ks as DropdownMenuShortcut,
  Hs as DropdownMenuSub,
  Ws as DropdownMenuSubContent,
  qs as DropdownMenuSubTrigger,
  Ee as DropdownMenuTrigger,
  hu as ERROR_DUMP_STRING_KEYS,
  Vh as ERROR_POPOVER_STRING_KEYS,
  xu as EditorKeyboardShortcuts,
  Vf as Empty,
  Lf as EmptyContent,
  Bf as EmptyDescription,
  Ff as EmptyHeader,
  jf as EmptyMedia,
  Uf as EmptyState,
  Kf as EmptyTitle,
  gu as ErrorDump,
  Lh as ErrorPopover,
  qh as FOOTNOTE_EDITOR_STRING_KEYS,
  Uh as Filter,
  Bh as FilterDropdown,
  jh as Footer,
  Hh as FootnoteEditor,
  Bu as FootnoteItem,
  Gh as FootnoteList,
  Rg as INTERFACE_LANGUAGE_PICKER_STRING_KEYS,
  tg as INVENTORY_STRING_KEYS,
  Ia as Input,
  Dg as InterfaceLanguagePicker,
  eg as Inventory,
  wo as Kbd,
  Hf as KbdGroup,
  Pt as Label,
  qf as MAIN_CONTENT_ZOOM_AREA_ID,
  Ru as MARKER_MENU_STRING_KEYS,
  $h as MarkdownRenderer,
  Mu as MarkerMenu,
  Fh as MoreInfo,
  Is as MultiSelectComboBox,
  Cg as NavigationContentSearch,
  lr as Popover,
  Vs as PopoverAnchor,
  dr as PopoverContent,
  Gf as PopoverDescription,
  Wf as PopoverHeader,
  Ka as PopoverPortalContainerProvider,
  Yf as PopoverTitle,
  Dr as PopoverTrigger,
  nf as Progress,
  To as RadioGroup,
  xa as RadioGroupItem,
  md as RecentSearches,
  Zf as ResizableHandle,
  Xf as ResizablePanel,
  Jf as ResizablePanelGroup,
  Ig as ResultsCard,
  Qf as RetryableErrorView,
  mg as SCOPE_SELECTOR_STRING_KEYS,
  fp as SELECT_BOOKS_STRING_KEYS,
  Fr as SHRINK_STEP,
  vg as ScopeSelector,
  fg as ScriptureResultsViewer,
  bg as ScrollGroupSelector,
  Xn as SearchBar,
  Er as Select,
  gp as SelectBooks,
  up as SelectBooksPicker,
  Rr as SelectContent,
  lu as SelectGroup,
  ve as SelectItem,
  Ph as SelectLabel,
  wu as SelectScrollDownButton,
  du as SelectScrollUpButton,
  Ah as SelectSeparator,
  Sr as SelectTrigger,
  Tr as SelectValue,
  Kr as Separator,
  xg as SettingsList,
  kg as SettingsListHeader,
  yg as SettingsListItem,
  op as SettingsSidebar,
  gg as SettingsSidebarContentSearch,
  Aa as ShrinkStepContext,
  yf as ShrinkStepOverride,
  Ri as ShrinkStepOverrideContext,
  Xu as Sidebar,
  Qu as SidebarContent,
  ig as SidebarFooter,
  Ln as SidebarGroup,
  cg as SidebarGroupAction,
  Fn as SidebarGroupContent,
  Bn as SidebarGroupLabel,
  ng as SidebarHeader,
  og as SidebarInput,
  Ju as SidebarInset,
  tp as SidebarMenu,
  lg as SidebarMenuAction,
  dg as SidebarMenuBadge,
  ap as SidebarMenuButton,
  ep as SidebarMenuItem,
  wg as SidebarMenuSkeleton,
  ug as SidebarMenuSub,
  hg as SidebarMenuSubButton,
  pg as SidebarMenuSubItem,
  Zu as SidebarProvider,
  ag as SidebarRail,
  sg as SidebarSeparator,
  rg as SidebarTrigger,
  yr as Skeleton,
  cf as Slider,
  sf as Sonner,
  tm as Spinner,
  lf as Switch,
  kf as TOOLTIP_DELAY_MS,
  No as TabDropdownMenu,
  Ng as TabFloatingMenu,
  _g as TabToolbar,
  Ro as Table,
  Oo as TableBody,
  em as TableCaption,
  kr as TableCell,
  rm as TableFooter,
  ya as TableHead,
  Do as TableHeader,
  We as TableRow,
  df as Tabs,
  pf as TabsContent,
  wf as TabsList,
  uf as TabsTrigger,
  zg as TextField,
  bh as Textarea,
  Gn as ToggleGroup,
  wa as ToggleGroupItem,
  Tg as Toolbar,
  pd as ToolbarCompoundLabel,
  _t as Tooltip,
  Ct as TooltipContent,
  At as TooltipProvider,
  Nt as TooltipTrigger,
  vu as UNDO_REDO_BUTTONS_STRING_KEYS,
  Sg as UiLanguageSelector,
  bu as UndoRedoButtons,
  fs as VerticalTabs,
  vs as VerticalTabsContent,
  ms as VerticalTabsList,
  kp as VerticalTabsTrigger,
  Pg as WizardStepper,
  je as Z_INDEX_ABOVE_DOCK,
  Yn as Z_INDEX_ABOVE_POPOVER,
  am as Z_INDEX_CONNECTION_LOST,
  om as Z_INDEX_FIRST_RUN,
  nm as Z_INDEX_MODAL,
  im as Z_INDEX_MODAL_BACKDROP,
  sm as Z_INDEX_NESTED_MODAL,
  cm as Z_INDEX_NESTED_MODAL_BACKDROP,
  lm as Z_INDEX_ONBOARDING_TOUR,
  dm as Z_INDEX_OVERLAY,
  wm as badgeVariants,
  um as buttonGroupVariants,
  pm as buttonVariants,
  v as cn,
  Qh as getBookIdFromUSFM,
  Sh as getCommentThreadElementId,
  Va as getInventoryHeader,
  Xh as getLinesFromUSFM,
  Jh as getNumberFromUSFM,
  Hu as getStatusForItem,
  Eg as getToolbarOSReservedSpaceClassName,
  Yh as inventoryCountColumn,
  Wh as inventoryItemColumn,
  Zh as inventoryStatusColumn,
  zn as isCommentDraftEmpty,
  So as isMacOs,
  hm as isWindows,
  _u as leftEdgeRect,
  pe as localizeOrFallback,
  zu as markerMenuItemToPaletteItem,
  Kh as measureElement,
  ku as measureRange,
  Wp as pickTabIconUrl,
  vm as sonner,
  gm as useContentZoomArea,
  hf as useEvent,
  gf as useEventAsync,
  vf as useExtraValidMarkers,
  fm as useHasContentBelow,
  Rs as useListbox,
  yu as useLivePopoverAnchor,
  qp as usePromise,
  xh as useRecentSearches,
  ff as useRetryablePromise,
  bf as useRunWhenVisible,
  hs as useShrinkStep,
  Di as useShrinkStepOverride,
  ud as useShrinkStepValue,
  La as useSidebar,
  mf as useStylesheet,
  xf as useTabIconSelection,
  tn as useTruncationTooltip,
  Gp as useViewVisibility
};
//# sourceMappingURL=index.js.map
