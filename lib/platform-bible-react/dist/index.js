var ss = Object.defineProperty;
var cs = (t, e, r) => e in t ? ss(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var Gt = (t, e, r) => cs(t, typeof e != "symbol" ? e + "" : e, r);
import { c as m, g as ue, a as Rr, C as Ue, L as Ln, u as Go, T as Mt, b as _t, d as Nt, e as Ct, A as da, D as Me, f as be, h as ze, i as br, j as $e, B as J, x as ls, k as ds, l as ws, I as us, m as vo, n as je, r as ke, o as ps, p as jn, P as Qe, q as xr, s as tr, t as er, v as xa, w as ya, y as bo, z as rr, E as ka, F as Dt, R as xo, G as wa, H as Ja, J as Za, K as Qa, M as to, N as Bn, O as ta, Q as yo, S as zr, U as Or, V as dr, W as hs, X as Je, Y as Le, Z as Oe, _ as Ae, $ as wr, a0 as ko, a1 as _o, a2 as ua, a3 as No, a4 as Fn, a5 as gs, a6 as fs, a7 as ms, a8 as eo, a9 as Un, aa as _a, ab as vs, ac as Kn, ad as bs, ae as xs, af as ys, ag as Yo, ah as ks, ai as _s, aj as Ns, ak as Cs, al as Hn, am as qn, an as Co, ao as Es, ap as Gn, aq as Pa, ar as Wo, as as $a, at as Ts, au as Ss, av as Rs, aw as Ds, ax as Ms, ay as $r, az as Eo, aA as zs, aB as Os } from "./resizable-BZsJZ3qc.js";
import { aC as tf, aD as ef, aE as rf, aF as af, aG as of, aH as nf, aI as sf, aJ as cf, aK as lf, aL as df, aM as wf, aN as uf, aO as pf, aP as hf, aQ as gf, aR as ff, aS as mf, aT as vf, aU as bf, aV as xf, aW as yf, aX as kf, aY as _f, aZ as Nf, a_ as Cf, a$ as Ef, b0 as Tf } from "./resizable-BZsJZ3qc.js";
import { jsx as a, jsxs as u, Fragment as wt } from "react/jsx-runtime";
import { Canon as Vt } from "@sillsdev/scripture";
import { Check as Be, Clock as Xo, ChevronsLeft as Jo, ChevronsRight as Zo, ChevronUp as Yn, ChevronDown as Ze, ArrowLeft as Is, ArrowRight as Ps, BoldIcon as $s, ItalicIcon as As, X as To, AtSign as Wn, Pencil as Vs, Trash2 as Ls, ArrowUp as Xn, MoreHorizontal as js, MailOpen as Bs, Mail as Fs, FilterIcon as Us, ArrowLeftIcon as Ks, ChevronLeftIcon as Hs, ChevronRightIcon as qs, ArrowRightIcon as Gs, Copy as Jn, Filter as Ys, User as Ws, Link as Xs, CircleHelp as Js, Undo as Zs, Redo as Qs, SquareX as Zn, FunctionSquare as Qn, SquareSigma as ti, Ban as tc, AlertCircle as ro, CircleCheckIcon as ec, CircleXIcon as rc, CircleHelpIcon as ac, ArrowUpIcon as oc, ArrowDownIcon as nc, ScrollText as ic, ChevronRight as sc, ChevronLeft as cc, ChevronsUpDown as lc, MenuIcon as dc, Menu as wc, EllipsisVertical as uc, MoreVertical as pc } from "lucide-react";
import { Section as Rt, compareScrRefs as pa, getChaptersForBook as hc, formatScrRef as Se, formatReplacementString as Ve, getSectionForBook as ea, formatRelativeDate as gc, sanitizeHtml as So, NumberFormat as ei, formatBytes as fc, getCurrentLocale as mc, usfmMarkers as ra, isPlatformError as vc, ABORTED as bc, getErrorMessage as xc, getFormatCallerFunction as yc, deepEqual as kc, isString as Qo, scrRefToBBBCCCVVV as Aa, defaultScrRef as Va, formatScrRefRange as _c, getLocalizeKeyForScrollGroupId as tn, formatReplacementStringToArray as en, collectUsjMarkers as Nc } from "platform-bible-utils";
import Wt, { useRef as U, useMemo as V, createContext as Na, useContext as Ro, useState as N, useEffect as Y, useCallback as F, useId as ao, useImperativeHandle as Cc, useLayoutEffect as Xt, Fragment as Ar, Component as Ec, createElement as rn, Suspense as Tc, forwardRef as ri } from "react";
import { IconSelector as ai, IconCheck as Ca, IconChevronDown as Sc, IconChevronUp as Rc, IconLayoutSidebar as Dc, IconLayoutSidebarRight as Mc, IconChevronRight as oi, IconSearch as zc, IconLoader as Oc, IconAlertOctagon as Ic, IconAlertTriangle as Pc, IconInfoCircle as $c, IconCircleCheck as Ac } from "@tabler/icons-react";
import { createEditor as ni, $getRoot as Fe, $createParagraphNode as Vr, $getSelection as ee, HISTORY_MERGE_TAG as Do, ParagraphNode as ii, TextNode as si, $getPreviousSelection as Vc, $isRangeSelection as xe, $caretFromPoint as Lc, $getSiblingCaret as ci, $getChildCaret as jc, $getAdjacentChildCaret as Bc, $isChildCaret as Fc, $normalizeCaret as Uc, $setSelectionFromCaretRange as Kc, $getCollapsedCaretRange as Hc, $getCaretInDirection as an, $splitAtPointCaretNext as qc, $isTextPointCaret as Gc, $findMatchingParent as li, $isElementNode as Ir, mergeRegister as De, getDOMTextNode as Yc, isHTMLElement as Wc, CLEAR_EDITOR_COMMAND as di, COMMAND_PRIORITY_EDITOR as Mo, shallowMergeConfig as Xc, defineExtension as ce, safeCast as ar, createState as Jc, FORMAT_TEXT_COMMAND as wi, $isNodeSelection as ui, COMMAND_PRIORITY_LOW as pi, RootNode as Zc, LineBreakNode as Qc, TabNode as tl, $isEditorState as el, createCommand as rl, CLICK_COMMAND as al, isDOMNode as ol, $getNodeFromDOMNode as nl, $createNodeSelection as il, $setSelection as sl, $getEditor as cl, DecoratorNode as oo, $getState as ll, toggleTextFormatType as on, TEXT_TYPE_TO_FORMAT as dl, $setState as wl, addClassNamesToElement as hi, $create as ul, $getNodeByKey as pl, removeClassNamesFromElement as hl, KEY_TAB_COMMAND as gl, $isBlockElementNode as fl, $createRangeSelection as ml, $normalizeSelection__EXPERIMENTAL as vl, OUTDENT_CONTENT_COMMAND as bl, INDENT_CONTENT_COMMAND as nn, INSERT_TAB_COMMAND as xl, COMMAND_PRIORITY_CRITICAL as zo, $isDecoratorNode as yl, $isParagraphNode as kl, $isTextNode as no, SELECTION_CHANGE_COMMAND as gi, $insertNodes as _l } from "lexical";
import { HeadingNode as Nl, QuoteNode as Cl, registerRichText as El } from "@lexical/rich-text";
import { flushSync as Tl, createPortal as Sl } from "react-dom";
import { $isTableSelection as Rl } from "@lexical/table";
import { createHeadlessEditor as fi } from "@lexical/headless";
import { $generateHtmlFromNodes as Dl, $generateNodesFromDOM as Ml } from "@lexical/html";
import { Avatar as Oo, Select as Jt, Checkbox as sn, Slot as Lr, Tabs as he, Menubar as _e, ContextMenu as Lt, Progress as cn, Slider as Yr, Switch as ln } from "radix-ui";
import { useReactTable as mi, getFilteredRowModel as zl, getSortedRowModel as vi, getPaginationRowModel as Ol, getCoreRowModel as bi, flexRender as Dr, getGroupedRowModel as Il, getExpandedRowModel as Pl } from "@tanstack/react-table";
import $l from "markdown-to-jsx";
import { GENERATOR_NOTE_CALLER as io, HIDDEN_NOTE_CALLER as so, getDefaultViewOptions as Al, isInsertEmbedOpOfType as Cr, getMarkerMenuItems as Vl, defaultStyleInfo as Ll, Editorial as jl } from "@eten-tech-foundation/platform-editor";
import { cva as Io } from "class-variance-authority";
import { useHotkeys as Bl } from "react-hotkeys-hook";
import { Drawer as Ke } from "vaul";
import { useTheme as Fl } from "next-themes";
import { Toaster as Ul } from "sonner";
import { toast as Rf } from "sonner";
function Hp({ className: t, ...e }) {
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
function xi({
  ref: t,
  bookId: e,
  isSelected: r,
  onSelect: o,
  onMouseDown: n,
  section: s,
  className: i,
  showCheck: c = !1,
  localizedBookNames: l,
  commandValue: d,
  disabled: w = !1,
  dimmedReason: p,
  dimmedDescription: h
}) {
  const g = U(!1), f = () => {
    w || (g.current || o == null || o(e), setTimeout(() => {
      g.current = !1;
    }, 100));
  }, y = (T) => {
    if (w) {
      T.preventDefault();
      return;
    }
    g.current = !0, n ? n(T) : o == null || o(e);
  }, b = V(
    () => ue(e, l),
    [e, l]
  ), R = V(
    () => Rr(e, l),
    [e, l]
  ), k = !!p && !w, E = `${b} (${R})`, C = k ? h || `${E}, ${p}` : E, I = /* @__PURE__ */ u(
    Ue,
    {
      ref: t,
      value: d || `${e} ${Vt.bookIdToEnglishName(e)}`,
      onSelect: f,
      onMouseDown: y,
      role: "option",
      "aria-selected": r,
      "aria-disabled": w || void 0,
      "aria-label": C,
      disabled: w,
      className: m(
        Ln,
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
        w && "tw:cursor-not-allowed tw:opacity-50",
        // Mirrors NumberedItemGrid's dimmed-vs-disabled split — same tokens, so chapter/verse cells
        // and book rows grey identically inside one popover: dimmed is presentation only, so it
        // never sets aria-disabled or blocks onSelect, and it yields to disabled. Restated under
        // data-selected so a dimmed row keeps its dimming while the keyboard highlight is on it,
        // rather than losing it to the suppression rule above.
        k && "tw:bg-muted/50 tw:text-muted-foreground/50 tw:data-selected:bg-muted/50 tw:data-selected:text-muted-foreground/50"
      ),
      children: [
        c && /* @__PURE__ */ a(
          Be,
          {
            className: m(
              "tw:me-2 tw:h-4 tw:w-4 tw:shrink-0",
              r ? "tw:opacity-100" : "tw:opacity-0"
            )
          }
        ),
        /* @__PURE__ */ a("span", { className: "tw:min-w-0 tw:flex-1", children: b }),
        k && // Visible rather than hover-only: cmdk never moves DOM focus onto an item (the input keeps
        // it and highlights via data-selected), so a tooltip would never open for a keyboard user.
        // Rendered text also survives the highlight, which recolours the row.
        /* @__PURE__ */ a("span", { className: "tw:ms-2 tw:shrink-0 tw:text-xs tw:italic", children: p }),
        /* @__PURE__ */ a(
          "span",
          {
            className: m(
              "tw:ms-2 tw:shrink-0 tw:text-xs",
              // Inherits the row's dimmed colour instead of setting its own, so the whole row dims
              // evenly rather than leaving the id at full strength beside a dimmed name.
              !k && "tw:text-muted-foreground"
            ),
            children: R
          }
        )
      ]
    }
  );
  return /* @__PURE__ */ a(
    "div",
    {
      className: m(
        "tw:mx-1 tw:my-1 tw:border-b-0 tw:border-e-0 tw:border-s-2 tw:border-t-0 tw:border-solid",
        {
          "tw:border-s-red-200": s === Rt.OT,
          "tw:border-s-purple-200": s === Rt.NT,
          "tw:border-s-indigo-200": s === Rt.DC,
          "tw:border-s-amber-200": s === Rt.Extra
        }
      ),
      children: I
    }
  );
}
const Kl = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
function Hl(t) {
  return Kl.some((e) => e === t);
}
function dn(t) {
  const e = new RegExp("^\\p{L}$", "u").test(t), r = /^[0-9]$/.test(t);
  return { isLetter: e, isDigit: r };
}
const aa = Object.freeze({
  /** Full labels. */
  WIDE: 0,
  /** Abbreviated primary label form. */
  TIGHT: 1,
  /** Secondary field clipped with an ellipsis — CSS does this on its own. */
  TIGHTER: 2,
  /** Secondary field dropped entirely; primary field alone. */
  MINIMUM: 3
}), Po = Na(aa.WIDE);
function ql() {
  return Ro(Po);
}
let co = "keyboard", wn = !1;
function Gl() {
  wn || typeof document > "u" || (wn = !0, document.addEventListener(
    "pointerdown",
    () => {
      co = "pointer";
    },
    !0
  ), document.addEventListener(
    "keydown",
    () => {
      co = "keyboard";
    },
    !0
  ));
}
function Yl({
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
    ref: l,
    open: d,
    onPointerEnter: w,
    onPointerLeave: p
  } = Go(), {
    ref: h,
    open: g,
    onPointerEnter: f,
    onPointerLeave: y
  } = Go(), [b, R] = N(!1), [k, E] = N(!1), C = U(
    // React's ref API requires `null` as the initial value for DOM refs.
    // eslint-disable-next-line no-null/no-null
    null
  ), I = n && e !== void 0, T = s ?? (e !== void 0 && !n);
  Y(() => {
    var z;
    Gl();
    const Q = (z = C.current) == null ? void 0 : z.closest('button, [role="combobox"], [tabindex]');
    if (!Q) return;
    const $ = (G) => !!G && G.scrollWidth > G.clientWidth, et = () => {
      co !== "pointer" && (T || $(h.current) || $(l.current)) && E(!0);
    }, _ = () => E(!1);
    return Q.addEventListener("focus", et), Q.addEventListener("blur", _), () => {
      Q.removeEventListener("focus", et), Q.removeEventListener("blur", _);
    };
  }, [T, h, l]);
  const j = F(() => {
    T && R(!0), f(), I && w();
  }, [
    T,
    I,
    f,
    w
  ]), A = F(() => {
    R(!1), E(!1), y(), p();
  }, [y, p]);
  Y(() => {
    T || R(!1);
  }, [T]);
  const M = /* @__PURE__ */ a("span", { ref: h, className: "tw:min-w-0 tw:shrink tw:truncate", children: t }, "primary"), P = I ? (
    // Weighted to absorb essentially all of the shrinking, so the primary field only starts losing
    // characters once this one has none left.
    /* @__PURE__ */ a("span", { ref: l, className: "tw:min-w-0 tw:shrink-[9999] tw:truncate", children: e }, "secondary")
  ) : void 0, [W, B] = o ? [P, M] : [M, P];
  return (
    // Nested TooltipProviders are harmless in Radix, so carrying our own means this works in any
    // host, including toolbars that never set one up.
    /* @__PURE__ */ a(Mt, { children: /* @__PURE__ */ u(
      _t,
      {
        open: g || d || b || k,
        onOpenChange: (Q) => {
          Q || A();
        },
        children: [
          /* @__PURE__ */ a(Nt, { asChild: !0, children: /* @__PURE__ */ u(
            "span",
            {
              ref: C,
              onPointerEnter: j,
              onPointerLeave: A,
              onPointerDown: A,
              className: m("tw:flex tw:min-w-0 tw:items-center", c),
              children: [
                W,
                W && B && /* @__PURE__ */ a("span", { className: "tw:shrink-0 tw:whitespace-pre", children: r }, "separator"),
                B
              ]
            }
          ) }),
          /* @__PURE__ */ a(Ct, { children: i })
        ]
      }
    ) })
  );
}
function lo(t, e) {
  return `${t} ${da[t]}${e ? ` ${Rr(t, e)} ${ue(t, e)}` : ""}`;
}
function ur(t, e) {
  return `${t} ${da[t] || ""} ${e}`;
}
function oa(t, e, r) {
  return `${ur(t, e)}:${r}`;
}
function Sr(t) {
  if (t.includes(":")) return;
  const e = /(\d+)$/.exec(t);
  if (!e) return;
  const r = parseInt(e[1], 10), o = t.indexOf(" ");
  if (o < 0) return;
  const n = t.slice(0, o);
  return t === ur(n, r) ? r : void 0;
}
function Wr(t) {
  const e = /:(\d+)$/.exec(t);
  if (!e) return;
  const r = t.slice(0, t.length - e[0].length);
  if (Sr(r) !== void 0)
    return parseInt(e[1], 10);
}
const Wl = "top-match", Xl = /^%[^%]*%$/;
function un(t, e) {
  return !t || Xl.test(t) ? e : t;
}
const Jl = "Show recent searches", Zl = "Recent";
function Ql({
  recentSearches: t,
  onSearchItemSelect: e,
  renderItem: r = (h) => String(h),
  getItemKey: o = (h) => String(h),
  ariaLabel: n,
  groupHeading: s,
  id: i,
  classNameForItems: c,
  buttonClassName: l = "tw:absolute tw:end-0 tw:top-0 tw:h-full tw:px-3 tw:py-2",
  buttonVariant: d = "ghost",
  open: w,
  onOpenChange: p
}) {
  const [h, g] = N(!1), [f, y] = N(!1), b = ao(), R = U(!1), k = w !== void 0, E = k ? w : h, C = n === "" ? "" : un(n, Jl), I = un(s, Zl), T = (P) => {
    P || (R.current = !0, y(!1)), k || g(P), p == null || p(P);
  }, j = (P) => {
    if (P && R.current) {
      R.current = !1;
      return;
    }
    y(P);
  };
  if (t.length === 0)
    return;
  const A = (P) => {
    e(P);
  }, M = /* @__PURE__ */ a(
    J,
    {
      variant: d,
      size: "icon",
      className: l,
      "aria-label": C,
      children: /* @__PURE__ */ a(Xo, { className: "tw:h-4 tw:w-4" })
    }
  );
  return /* @__PURE__ */ u(Me, { open: E, onOpenChange: T, modal: !1, children: [
    /* @__PURE__ */ a(Mt, { children: C ? /* @__PURE__ */ u(_t, { open: f, onOpenChange: j, children: [
      /* @__PURE__ */ a(Nt, { asChild: !0, children: /* @__PURE__ */ a(be, { asChild: !0, children: M }) }),
      /* @__PURE__ */ a(Ct, { children: C })
    ] }) : /* @__PURE__ */ a(be, { asChild: !0, children: M }) }),
    /* @__PURE__ */ u(
      ze,
      {
        id: i,
        "aria-labelledby": b,
        className: "tw:w-[300px]",
        align: "start",
        onKeyDown: (P) => P.stopPropagation(),
        children: [
          /* @__PURE__ */ a(br, { id: b, children: I }),
          t.map((P) => /* @__PURE__ */ u(
            $e,
            {
              onSelect: () => A(P),
              className: m("tw:flex tw:items-center", c),
              children: [
                /* @__PURE__ */ a(Xo, { className: "tw:me-2 tw:h-4 tw:w-4 tw:opacity-50" }),
                /* @__PURE__ */ a("span", { children: r(P) })
              ]
            },
            o(P)
          ))
        ]
      }
    )
  ] });
}
function qp(t, e, r = (n, s) => n === s, o = 15) {
  return (n) => {
    const s = t.filter(
      (c) => !r(c, n)
    ), i = [n, ...s.slice(0, o - 1)];
    e(i);
  };
}
function Xr(t, e) {
  return !e || pa(t, e) === 0;
}
function td(t, e, r, o, n) {
  const s = V(
    () => ls(t, e),
    [t, e]
  ), i = V(
    () => ds(t, e),
    [t, e]
  ), c = V(
    () => ws(t, e),
    [t, e]
  ), l = V(
    () => us(t, e),
    [t, e]
  ), d = F(
    (w) => {
      w && o(w);
    },
    [o]
  );
  return V(() => [
    {
      onClick: () => d(s),
      disabled: Xr(t, s),
      title: (n == null ? void 0 : n["%webView_bookChapterControl_previousChapter%"]) || "Previous chapter",
      icon: r === "ltr" ? Jo : Zo,
      group: "chapter"
    },
    {
      onClick: () => d(i),
      disabled: Xr(t, i),
      title: (n == null ? void 0 : n["%webView_bookChapterControl_nextChapter%"]) || "Next chapter",
      icon: r === "ltr" ? Zo : Jo,
      group: "chapter"
    },
    {
      onClick: () => d(c),
      disabled: Xr(t, c),
      title: (n == null ? void 0 : n["%webView_bookChapterControl_previousVerse%"]) || "Previous verse",
      icon: Yn,
      group: "verse"
    },
    {
      onClick: () => d(l),
      disabled: Xr(t, l),
      title: (n == null ? void 0 : n["%webView_bookChapterControl_nextVerse%"]) || "Next verse",
      icon: Ze,
      group: "verse"
    }
  ], [
    t,
    r,
    d,
    s,
    c,
    l,
    i,
    n
  ]);
}
const na = {
  // Matches start of string (`^`), one or more non-colon/space words, optionally followed by space and more words (`([^:\s]+(?:\s+[^:\s]+)*)`), end of string (`$`), case-insensitive (`i`)
  BOOK_ONLY: /^([^:\s]+(?:\s+[^:\s]+)*)$/i,
  // Same as above, but followed by a space and a chapter number (`\s+(\d+)`)
  BOOK_CHAPTER: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,
  // Same as above, but followed by a colon and optionally a verse number (`:(\d*)`)
  BOOK_CHAPTER_VERSE: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i
}, ed = [
  na.BOOK_ONLY,
  na.BOOK_CHAPTER,
  na.BOOK_CHAPTER_VERSE
];
function rd(t) {
  return na.BOOK_CHAPTER_VERSE.test(t.trim());
}
function pn(t, e) {
  return Vt.bookIdToNumber(t) < Vt.bookIdToNumber(e.book);
}
function ad(t, e, r) {
  const o = Vt.bookIdToNumber(t) - Vt.bookIdToNumber(r.book);
  return o < 0 ? !0 : o > 0 ? !1 : e < r.chapterNum;
}
function La(t, e, r, o) {
  const n = Vt.bookIdToNumber(t) - Vt.bookIdToNumber(o.book);
  return n < 0 ? !0 : n > 0 ? !1 : e < o.chapterNum ? !0 : e > o.chapterNum ? !1 : r < o.verseNum;
}
function Pe(t) {
  return hc(Vt.bookIdToNumber(t));
}
function od(t, e, r) {
  if (!t.trim() || e.length === 0) return;
  const o = ed.reduce(
    (n, s) => {
      if (n) return n;
      const i = s.exec(t.trim());
      if (i) {
        const [c, l = void 0, d = void 0] = i.slice(1);
        let w;
        const p = e.filter((h) => vo(h, c, r));
        if (p.length === 1 && ([w] = p), !w && l) {
          if (Vt.isBookIdValid(c)) {
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
          const g = ((f) => Object.keys(da).find(
            (y) => da[y].toLowerCase() === f.toLowerCase()
          ))(c);
          if (g && e.includes(g) && (w = g), !w && r) {
            const f = Array.from(r.entries()).find(
              ([, y]) => y.localizedName.toLowerCase() === c.toLowerCase()
            );
            f && e.includes(f[0]) && ([w] = f);
          }
        }
        if (w) {
          let h = l ? parseInt(l, 10) : void 0;
          h && h > Pe(w) && (h = Math.max(Pe(w), 1));
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
function wo(t) {
  return {
    [Rt.OT]: t.filter((e) => Vt.isBookOT(e)),
    [Rt.NT]: t.filter((e) => Vt.isBookNT(e)),
    [Rt.DC]: t.filter((e) => Vt.isBookDC(e)),
    [Rt.Extra]: t.filter((e) => Vt.extraBooks().includes(e))
  };
}
function nd(t, e) {
  const r = new Set(t), o = e.filter((d) => !r.has(d)), n = new Set(o), s = n.size === 0 ? t : Vt.allBookIds.filter(
    (d) => r.has(d) || n.has(d)
  ), i = wo(s), c = Object.values(i).flat(), l = wo(t);
  return {
    projectBooksBySection: l,
    reachableBooksBySection: i,
    reachableBooks: c,
    // Grouped and flattened like `reachableBooks`, so it inherits the same peripheral-id exclusion.
    projectBooks: Object.values(l).flat(),
    // Derived from the grouped-and-flattened list, so a peripheral id that grouping dropped can
    // never be marked dimmed for a list it is not part of.
    booksOutsideProject: new Set(c.filter((d) => !r.has(d)))
  };
}
const uo = 6;
function id(t) {
  return t === "ArrowLeft" ? "ArrowRight" : t === "ArrowRight" ? "ArrowLeft" : t;
}
function sd({
  current: t,
  key: e,
  max: r,
  direction: o = "ltr"
}) {
  if (r <= 0) return t;
  if (t < 1 || t > r) return 1;
  switch (o === "rtl" ? id(e) : e) {
    case "ArrowLeft":
      return t > 1 ? t - 1 : r;
    case "ArrowRight":
      return t < r ? t + 1 : 1;
    case "ArrowUp":
      return Math.max(1, t - uo);
    case "ArrowDown":
      return Math.min(r, t + uo);
    default:
      return t;
  }
}
function yi({
  count: t,
  valueBuilder: e,
  onSelect: r,
  itemRef: o,
  isDisabled: n,
  isDimmed: s,
  isSelected: i,
  className: c
}) {
  if (!(t <= 0))
    return /* @__PURE__ */ a(je, { children: /* @__PURE__ */ a(
      "div",
      {
        className: m("tw:grid tw:gap-1", c),
        style: { gridTemplateColumns: `repeat(${uo}, minmax(0, 1fr))` },
        children: Array.from({ length: t }, (l, d) => d + 1).map((l) => {
          const d = (n == null ? void 0 : n(l)) ?? !1;
          return /* @__PURE__ */ a(
            Ue,
            {
              value: e(l),
              onSelect: () => {
                d || r(l);
              },
              ref: o(l),
              disabled: d,
              "aria-disabled": d || void 0,
              className: m(
                "tw:h-8 tw:w-8 tw:cursor-pointer tw:justify-center tw:rounded-md tw:text-center tw:text-sm",
                // Hide CommandItem's own trailing check icon (a multiselect affordance this grid
                // doesn't use) and give cells pointer feedback distinct from the keyboard focus ring.
                "tw:[&>svg]:hidden tw:hover:bg-muted",
                Ln,
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
                  "tw:bg-primary tw:text-primary-foreground tw:data-selected:bg-primary tw:data-selected:text-primary-foreground tw:data-selected:ring-primary-foreground/70": (i == null ? void 0 : i(l)) ?? !1
                },
                {
                  // Same tokens as BookItem, so book rows and chapter/verse cells grey identically
                  // inside one popover. Restated under data-selected so a dimmed cell keeps its
                  // dimming while the keyboard highlight is on it, rather than losing it to the
                  // suppression rule above.
                  "tw:bg-muted/50 tw:text-muted-foreground/50 tw:data-selected:bg-muted/50 tw:data-selected:text-muted-foreground/50": ((s == null ? void 0 : s(l)) ?? !1) && !d
                },
                d && "tw:cursor-not-allowed tw:opacity-40"
              ),
              children: l
            },
            l
          );
        })
      }
    ) });
}
function hn({
  bookId: t,
  scrRef: e,
  onChapterSelect: r,
  setChapterRef: o,
  isChapterDimmed: n,
  isChapterDisabled: s,
  className: i
}) {
  if (t)
    return /* @__PURE__ */ a(
      yi,
      {
        count: Pe(t),
        valueBuilder: (c) => ur(t, c),
        onSelect: r,
        itemRef: o,
        isDisabled: s,
        isDimmed: n,
        isSelected: (c) => t === e.book && c === e.chapterNum,
        className: i
      }
    );
}
function gn({
  bookId: t,
  chapterNum: e,
  endVerse: r,
  scrRef: o,
  onVerseSelect: n,
  setVerseRef: s,
  isVerseDimmed: i,
  isVerseDisabled: c,
  className: l
}) {
  if (!(!t || r <= 0))
    return /* @__PURE__ */ a(
      yi,
      {
        count: r,
        valueBuilder: (d) => oa(t, e, d),
        onSelect: n,
        itemRef: s,
        isDisabled: c,
        isDimmed: i,
        isSelected: (d) => t === o.book && e === o.chapterNum && d === o.verseNum,
        className: l
      }
    );
}
function ja({
  scrRef: t,
  handleSubmit: e,
  className: r,
  getActiveBookIds: o,
  getAdditionalBookIds: n,
  localizedBookNames: s,
  localizedStrings: i,
  recentSearches: c,
  onAddRecentSearch: l,
  id: d,
  getEndVerse: w,
  disableReferencesUpTo: p,
  submitKeys: h,
  triggerContent: g,
  triggerVariant: f = "outline",
  showTriggerChevron: y = !1,
  onOpenChange: b,
  onCloseAutoFocus: R,
  modal: k = !1,
  align: E = "center",
  ref: C,
  disabled: I,
  shrinkStep: T
}) {
  const j = ke(), A = ql(), M = T ?? A, [P, W] = N(!1), [B, Q] = N(""), [$, et] = N(""), [_, z] = N("books"), [G, nt] = N(void 0), [ot, pt] = N(
    void 0
  ), [ct, Z] = N(void 0), [it, gt] = N(!1), [ft, mt] = N(!1), Zt = U(null), vt = U(!1), Qt = U(void 0), zt = U(void 0), bt = U(void 0), Ft = U(void 0), Ot = U({}), Ut = U({}), lt = F(
    (v) => {
      e(v), l && l(v);
    },
    [e, l]
  ), Et = V(() => o ? o() : ps, [o]), jt = V(
    () => o && n ? n() : [],
    [o, n]
  ), {
    projectBooksBySection: le,
    reachableBooksBySection: de,
    reachableBooks: Kt,
    projectBooks: He,
    booksOutsideProject: Ht
  } = V(
    () => nd(Et, jt),
    [Et, jt]
  ), ne = Ht.has(t.book), te = V(() => $.trim() ? wo(
    Kt.filter((v) => vo(v, $, s))
  ) : ft ? de : le, [
    le,
    de,
    Kt,
    ft,
    $,
    s
  ]), D = V(
    () => od($, Kt, s),
    [$, Kt, s]
  ), yt = V(() => {
    if (!D) return;
    const v = B.startsWith(`${D.book} `) ? B : "", q = Wr(v), at = Sr(v);
    return {
      book: D.book,
      chapterNum: at ?? D.chapterNum ?? 1,
      verseNum: q ?? D.verseNum ?? 1
    };
  }, [D, B]), qt = U(!1);
  Y(() => {
    if (!qt.current) {
      qt.current = !0;
      return;
    }
    b == null || b(P);
  }, [P, b]);
  const It = F(() => {
    yt && (p && La(
      yt.book,
      yt.chapterNum,
      yt.verseNum,
      p
    ) || (lt(yt), W(!1), et(""), Q("")));
  }, [lt, yt, p]), re = F(
    (v) => {
      const q = ot ?? (D == null ? void 0 : D.book), at = ct ?? (D == null ? void 0 : D.chapterNum);
      !q || !at || (lt({
        book: q,
        chapterNum: at,
        verseNum: v
      }), W(!1));
    },
    [lt, ot, ct, D]
  ), Ce = F(
    (v) => {
      if (p && pn(v, p)) return;
      if (Pe(v) <= 1) {
        lt({
          book: v,
          chapterNum: 1,
          verseNum: 1
        }), W(!1), et("");
        return;
      }
      nt(v), z("chapters");
    },
    [lt, p]
  ), S = F(
    (v) => {
      const q = _ === "chapters" ? G : D == null ? void 0 : D.book;
      if (q) {
        if (w && w(q, v) > 1) {
          pt(q), Z(v), z("verses"), Q("");
          return;
        }
        lt({
          book: q,
          chapterNum: v,
          verseNum: 1
        }), W(!1);
      }
    },
    [lt, _, G, D, w]
  ), K = F(
    (v) => {
      lt(v), W(!1), et("");
    },
    [lt]
  ), X = td(
    t,
    ft ? Kt : He,
    j,
    e,
    i
  ), x = F(() => {
    z("books"), nt(void 0), pt(void 0), Z(void 0), setTimeout(() => {
      var v;
      (v = zt.current) == null || v.focus();
    }, 0);
  }, []), H = F(() => {
    const v = ot;
    pt(void 0), Z(void 0), v ? (nt(v), z("chapters"), Q("")) : x();
  }, [ot, x]), O = F(
    (v) => {
      W(v), v && (z("books"), nt(void 0), pt(void 0), Z(void 0), et(""), mt(ne));
    },
    [ne]
  );
  Y(() => {
    I && O(!1);
  }, [I, O]);
  const [rt, dt] = N(0);
  Y(() => {
    var v;
    rt !== 0 && ((v = zt.current) == null || v.focus());
  }, [rt]), Cc(
    C,
    () => ({
      open: () => {
        I || (O(!0), dt((v) => v + 1));
      }
    }),
    [O, I]
  );
  const { otLong: ht, ntLong: kt, dcLong: Tt, extraLong: Pt } = {
    otLong: i == null ? void 0 : i["%scripture_section_ot_long%"],
    ntLong: i == null ? void 0 : i["%scripture_section_nt_long%"],
    dcLong: i == null ? void 0 : i["%scripture_section_dc_long%"],
    extraLong: i == null ? void 0 : i["%scripture_section_extra_long%"]
  }, ae = F(
    (v) => jn(v, ht, kt, Tt, Pt),
    [ht, kt, Tt, Pt]
  ), jr = F(
    (v) => D ? !!D.chapterNum && !v.toString().includes(D.chapterNum.toString()) : !1,
    [D]
  ), or = V(
    () => Se(
      t,
      s ? ue(t.book, s) : "English"
    ),
    [t, s]
  ), qe = V(
    () => M >= aa.TIGHT ? Rr(t.book, s) : ue(t.book, s),
    [t.book, s, M]
  ), Ra = `${t.chapterNum}:${t.verseNum}`, Da = F((v) => (q) => {
    Ot.current[v] = q;
  }, []), Br = F((v) => (q) => {
    Ut.current[v] = q;
  }, []), kr = V(
    () => rd($),
    [$]
  ), ge = V(() => !w || !D || !D.chapterNum || !kr ? !1 : w(D.book, D.chapterNum) > 0, [w, D, kr]), _r = _ === "books" && !it && !$.trim() && Ht.size > 0, Fr = F(
    (v) => p ? pn(v, p) : !1,
    [p]
  ), Ee = F(
    (v) => (q) => p ? ad(v, q, p) : !1,
    [p]
  ), nr = F(
    (v, q) => (at) => p ? La(v, q, at, p) : !1,
    [p]
  ), Ge = (i == null ? void 0 : i["%webView_bookChapterControl_selectChapter%"]) || "Select chapter", Ur = (i == null ? void 0 : i["%webView_bookChapterControl_selectVerse%"]) || "Select verse", Ye = _ === "verses" ? (i == null ? void 0 : i["%webView_bookChapterControl_backToChapters%"]) || "Back to chapters" : (i == null ? void 0 : i["%webView_bookChapterControl_backToBooks%"]) || "Back to books", Ma = (i == null ? void 0 : i["%webView_bookChapterControl_bookNotInProject%"]) || "Not in project", Kr = (i == null ? void 0 : i["%webView_bookChapterControl_bookNotInProjectDescription%"]) || "{book} is not in this project", za = F(
    (v) => Ve(Kr, {
      book: `${ue(v, s)} (${Rr(
        v,
        s
      )})`
    }),
    [Kr, s]
  ), Oa = (i == null ? void 0 : i["%webView_bookChapterControl_showMoreBooks%"]) || "Show more books", Hr = (i == null ? void 0 : i["%webView_bookChapterControl_showProjectBooksOnly%"]) || "Show project books only", qr = F(
    (v) => {
      (v.key === "Home" || v.key === "End") && v.stopPropagation(), h && h.includes(v.key) && D && D.chapterNum !== void 0 && D.verseNum !== void 0 && (v.preventDefault(), v.stopPropagation(), It());
    },
    [h, D, It]
  ), ir = F(
    (v) => {
      var Ho;
      if (v.ctrlKey) return;
      const q = v.target instanceof HTMLElement ? v.target : void 0;
      if (q != null && q.closest('[role="menu"], [role="menuitem"]')) return;
      const { isLetter: at, isDigit: $t } = dn(v.key);
      if ((_ === "chapters" || _ === "verses") && (v.key === " " || v.key === "Enter")) {
        if (!!(q != null && q.closest(
          'button, a, input, select, textarea, [role="button"]'
        ))) {
          v.stopPropagation();
          return;
        }
        const Te = (() => {
          if (_ === "verses") {
            const Nr = ot, qo = ct, Ia = Wr(B);
            return !Nr || !qo || Ia === void 0 ? void 0 : {
              isDisabled: nr(Nr, qo)(Ia),
              activate: () => re(Ia)
            };
          }
          const oe = G, we = Sr(B);
          if (!(!oe || we === void 0))
            return {
              isDisabled: Ee(oe)(we),
              activate: () => S(we)
            };
        })();
        if (Te) {
          v.preventDefault(), v.stopPropagation(), Te.isDisabled || Te.activate();
          return;
        }
      }
      if (_ === "books" && D && v.key === "Enter" && !(q !== zt.current && !!(q != null && q.closest('button, a, input, select, textarea, [role="button"]')))) {
        v.preventDefault(), v.stopPropagation(), It();
        return;
      }
      if ((_ === "chapters" || _ === "verses") && (at || $t)) {
        v.preventDefault(), v.stopPropagation();
        return;
      }
      if (v.key === "Backspace" && (_ === "chapters" || _ === "verses")) {
        v.preventDefault(), v.stopPropagation(), _ === "verses" ? H() : x();
        return;
      }
      if (!Hl(v.key) || it) return;
      if (_ === "books" && (v.key === "ArrowLeft" || v.key === "ArrowRight")) {
        const ie = zt.current, Te = (ie == null ? void 0 : ie.selectionStart) ?? 0, oe = (ie == null ? void 0 : ie.selectionEnd) ?? 0, we = j === "rtl" ? v.key === "ArrowRight" : v.key === "ArrowLeft";
        if (!!ie && (Te !== oe || (we ? Te > 0 : oe < ie.value.length))) return;
      }
      if (_ === "books" && q !== zt.current && (q != null && q.closest('button, a, [role="button"]')))
        return;
      const xt = (() => {
        const ie = _ === "books" && D && ge && D.chapterNum ? { bookId: D.book, chapterNum: D.chapterNum } : void 0, Te = _ === "verses" ? { bookId: ot, chapterNum: ct } : ie;
        if (Te) {
          const { bookId: oe, chapterNum: we } = Te;
          return !oe || !we || !w ? void 0 : {
            max: w(oe, we),
            current: Wr(B) ?? 0,
            buildValue: (Nr) => oa(oe, we, Nr),
            refs: Ut,
            // In books view focus stays on the CommandInput so the user can keep typing; only
            // the dedicated grid views pull focus off the back button.
            takeFocus: _ === "verses"
          };
        }
        if (_ === "chapters" || _ === "books" && D && Pe(D.book) > 1) {
          const oe = _ === "chapters" ? G : D == null ? void 0 : D.book;
          return oe ? {
            max: Pe(oe),
            current: Sr(B) ?? 0,
            buildValue: (we) => ur(oe, we),
            refs: Ot,
            takeFocus: _ === "chapters"
          } : void 0;
        }
      })();
      if (!xt || xt.max <= 0) return;
      xt.takeFocus && ((Ho = Qt.current) == null || Ho.focus());
      const Bt = sd({
        current: xt.current,
        key: v.key,
        max: xt.max,
        direction: j
      });
      if (v.preventDefault(), v.stopPropagation(), Bt === xt.current) return;
      Q(xt.buildValue(Bt));
      const fe = xt.refs.current[Bt];
      fe && fe.scrollIntoView({ block: "nearest", behavior: "smooth" });
    },
    [
      _,
      D,
      ge,
      it,
      j,
      x,
      H,
      S,
      It,
      re,
      Ee,
      nr,
      G,
      ot,
      ct,
      w,
      B
    ]
  ), Gr = F((v) => {
    var $t, xt;
    if (v.shiftKey || v.key === "Tab" || v.key === " ") return;
    if (v.key === "Enter") {
      v.stopPropagation();
      return;
    }
    if (v.key === "ArrowUp" || v.key === "ArrowDown") {
      ($t = zt.current) == null || $t.focus();
      return;
    }
    const { isLetter: q, isDigit: at } = dn(v.key);
    (q || at) && (v.preventDefault(), et((Bt) => Bt + v.key), (xt = zt.current) == null || xt.focus(), gt(!1));
  }, []);
  Xt(() => {
    const v = setTimeout(() => {
      if (P && _ === "books" && bt.current && Ft.current) {
        const q = bt.current, at = Ft.current, $t = at.offsetTop, xt = q.clientHeight, Bt = at.clientHeight, fe = $t - xt / 2 + Bt / 2;
        q.scrollTo({
          top: Math.max(0, fe),
          behavior: "smooth"
        }), Q(lo(t.book));
      }
    }, 0);
    return () => {
      clearTimeout(v);
    };
  }, [P, _, $, D, t.book]), Xt(() => {
    if (_ === "chapters" && G) {
      const v = G === t.book, q = v ? t.chapterNum : 1;
      Q(ur(G, q)), setTimeout(() => {
        if (bt.current)
          if (v) {
            const at = Ot.current[t.chapterNum];
            at && at.scrollIntoView({ block: "center", behavior: "smooth" });
          } else
            bt.current.scrollTo({ top: 0 });
        Qt.current && Qt.current.focus();
      }, 0);
    }
  }, [_, G, D, t.book, t.chapterNum]), Xt(() => {
    if (_ === "verses" && ot && ct !== void 0) {
      const v = ot === t.book && ct === t.chapterNum, q = v ? t.verseNum : 1;
      Q(
        oa(ot, ct, q)
      ), setTimeout(() => {
        if (bt.current)
          if (v) {
            const at = Ut.current[t.verseNum];
            at && at.scrollIntoView({ block: "center", behavior: "smooth" });
          } else
            bt.current.scrollTo({ top: 0 });
        Qt.current && Qt.current.focus();
      }, 0);
    }
  }, [
    _,
    ot,
    ct,
    t.book,
    t.chapterNum,
    t.verseNum
  ]);
  const sr = D ? `${D.book} ${D.chapterNum ?? ""} ${D.verseNum ?? ""} ${ge}` : "", L = U(""), tt = U(""), St = V(() => {
    if (_ !== "books" || !D || it) return;
    const { book: v, chapterNum: q, verseNum: at } = D;
    if (ge && q && w)
      return {
        max: w(v, q),
        initial: at ?? (v === t.book && q === t.chapterNum ? t.verseNum : 1),
        parse: Wr,
        buildValue: (xt) => oa(v, q, xt)
      };
    const $t = Pe(v);
    if (!($t <= 1))
      return {
        max: $t,
        initial: q ?? (v === t.book ? t.chapterNum : 1),
        parse: Sr,
        buildValue: (xt) => ur(v, xt)
      };
  }, [
    _,
    D,
    it,
    ge,
    w,
    t.book,
    t.chapterNum,
    t.verseNum
  ]);
  return Xt(() => {
    if (_ !== "books" || !D || !St || St.max <= 0) {
      L.current = "";
      return;
    }
    const { max: v, initial: q, parse: at, buildValue: $t } = St, xt = (Bt) => {
      const fe = at(Bt);
      return fe !== void 0 && fe >= 1 && fe <= v && Bt === $t(fe) ? fe : void 0;
    };
    if (L.current !== sr) {
      L.current = sr;
      const Bt = $t(Math.min(Math.max(q, 1), v));
      tt.current = Bt, Q(Bt);
      return;
    }
    if (xt(B) !== void 0) {
      tt.current = B;
      return;
    }
    Q(
      xt(tt.current) !== void 0 ? tt.current : $t(Math.min(Math.max(q, 1), v))
    );
  }, [_, D, St, sr, B]), /* @__PURE__ */ u(Qe, { open: P, onOpenChange: O, modal: k, children: [
    /* @__PURE__ */ a(xr, { asChild: !0, children: /* @__PURE__ */ u(
      J,
      {
        ref: Zt,
        "aria-label": "book-chapter-trigger",
        variant: f,
        role: "combobox",
        "aria-expanded": P,
        disabled: I,
        className: m(
          "tw:h-8 tw:w-full tw:min-w-16 tw:max-w-48 tw:shrink tw:overflow-hidden tw:px-1",
          r
        ),
        onClick: (v) => {
          vt.current && (vt.current = !1, v.preventDefault());
        },
        children: [
          g ?? /* @__PURE__ */ a(
            Yl,
            {
              primary: qe,
              secondary: Ra,
              showSecondary: M < aa.MINIMUM,
              isPartial: M >= aa.TIGHT,
              fullText: or
            }
          ),
          y && /* @__PURE__ */ a(
            ai,
            {
              "data-testid": "book-chapter-control-chevron",
              className: "tw:ms-2 tw:size-4 tw:shrink-0 tw:opacity-50"
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ a(
      tr,
      {
        id: d,
        forceMount: !0,
        className: "tw:w-[280px] tw:p-0",
        align: E,
        onKeyDownCapture: ir,
        onKeyDown: (v) => v.stopPropagation(),
        onPointerDownOutside: (v) => {
          const { target: q } = v;
          P && Zt.current && q instanceof Node && Zt.current.contains(q) && (vt.current = !0, O(!1));
        },
        onCloseAutoFocus: R,
        children: /* @__PURE__ */ a(Mt, { children: /* @__PURE__ */ u(
          er,
          {
            ref: Qt,
            loop: !0,
            value: B,
            onValueChange: Q,
            disablePointerSelection: !0,
            shouldFilter: !1,
            children: [
              _ === "books" ? /* @__PURE__ */ u("div", { className: m("tw:flex tw:items-end", it && "tw:pb-1"), children: [
                /* @__PURE__ */ u("div", { className: "tw:relative tw:flex-1", children: [
                  /* @__PURE__ */ a(
                    xa,
                    {
                      ref: zt,
                      value: $,
                      onValueChange: et,
                      onKeyDown: qr,
                      onFocus: () => gt(!1),
                      className: c && c.length > 0 ? "tw:pe-8!" : "",
                      spaceSelectsHighlightedItem: !0
                    }
                  ),
                  c && c.length > 0 && /* @__PURE__ */ a(
                    Ql,
                    {
                      recentSearches: c,
                      onSearchItemSelect: K,
                      renderItem: (v) => Se(v, "English"),
                      getItemKey: (v) => `${v.book}-${v.chapterNum}-${v.verseNum}`,
                      ariaLabel: i == null ? void 0 : i["%history_recentSearches_ariaLabel%"],
                      groupHeading: i == null ? void 0 : i["%history_recent%"],
                      buttonClassName: "tw:absolute tw:end-1 tw:top-1"
                    }
                  )
                ] }),
                /* @__PURE__ */ a(ya, { className: "tw:translate-y-px tw:gap-1 tw:pe-2", children: X.map(
                  ({ onClick: v, disabled: q, title: at, icon: $t, group: xt }, Bt) => /* @__PURE__ */ u(Ar, { children: [
                    Bt > 0 && xt !== X[Bt - 1].group && /* @__PURE__ */ a(bo, {}),
                    /* @__PURE__ */ u(_t, { children: [
                      /* @__PURE__ */ a(Nt, { asChild: !0, children: /* @__PURE__ */ a(
                        J,
                        {
                          variant: "ghost",
                          size: "sm",
                          onClick: () => {
                            gt(!0), v();
                          },
                          disabled: q,
                          className: "tw:h-8.5 tw:w-6 tw:p-0",
                          "aria-label": at,
                          title: q ? at : void 0,
                          onKeyDown: Gr,
                          children: /* @__PURE__ */ a($t, {})
                        }
                      ) }),
                      /* @__PURE__ */ a(Ct, { children: at })
                    ] })
                  ] }, at)
                ) })
              ] }) : /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:border-b tw:px-3 tw:py-1", children: [
                /* @__PURE__ */ u(_t, { children: [
                  /* @__PURE__ */ a(Nt, { asChild: !0, children: /* @__PURE__ */ a(
                    J,
                    {
                      variant: "ghost",
                      size: "sm",
                      onClick: _ === "verses" ? H : x,
                      className: "tw:me-2 tw:h-6 tw:w-6 tw:p-0",
                      tabIndex: -1,
                      "aria-label": Ye,
                      children: j === "ltr" ? /* @__PURE__ */ a(Is, { className: "tw:h-4 tw:w-4" }) : /* @__PURE__ */ a(Ps, { className: "tw:h-4 tw:w-4" })
                    }
                  ) }),
                  /* @__PURE__ */ a(Ct, { children: Ye })
                ] }),
                _ === "chapters" && G && /* @__PURE__ */ a("span", { tabIndex: -1, className: "tw:text-sm tw:font-medium", children: ue(G, s) }),
                _ === "verses" && ot && ct !== void 0 && /* @__PURE__ */ a("span", { tabIndex: -1, className: "tw:text-sm tw:font-medium", children: `${ue(ot, s)} ${ct}` }),
                /* @__PURE__ */ a(
                  "span",
                  {
                    tabIndex: -1,
                    className: "tw:ms-auto tw:text-sm tw:font-medium tw:text-muted-foreground",
                    children: _ === "verses" ? Ur : Ge
                  }
                )
              ] }),
              !it && /* @__PURE__ */ u(rr, { ref: bt, children: [
                _ === "books" && /* @__PURE__ */ u(wt, { children: [
                  !D && Object.entries(te).map(([v, q]) => {
                    if (q.length !== 0)
                      return (
                        // We are mapping over filteredBooksByType, which uses Section as key type
                        // eslint-disable-next-line no-type-assertion/no-type-assertion
                        /* @__PURE__ */ a(je, { heading: ae(v), children: q.map((at) => /* @__PURE__ */ a(
                          xi,
                          {
                            bookId: at,
                            onSelect: ($t) => Ce($t),
                            section: ea(at),
                            commandValue: lo(at),
                            ref: at === t.book ? Ft : void 0,
                            localizedBookNames: s,
                            disabled: Fr(at),
                            dimmedReason: Ht.has(at) ? Ma : void 0,
                            dimmedDescription: Ht.has(at) ? za(at) : void 0
                          },
                          at
                        )) }, v)
                      );
                  }),
                  D && yt && /* @__PURE__ */ a(je, { children: /* @__PURE__ */ u(
                    Ue,
                    {
                      value: Wl,
                      onSelect: It,
                      disabled: !!p && La(
                        yt.book,
                        yt.chapterNum,
                        yt.verseNum,
                        p
                      ),
                      className: "tw:font-semibold tw:text-primary tw:hover:bg-muted tw:[&>svg:last-child]:hidden",
                      children: [
                        /* @__PURE__ */ a("span", { className: "tw:min-w-0 tw:flex-1", children: Se(
                          yt,
                          ue(D.book, s)
                        ) }),
                        /* @__PURE__ */ a("span", { className: "tw:ms-2 tw:shrink-0 tw:text-xs tw:text-muted-foreground", children: Rr(D.book, s) })
                      ]
                    },
                    "top-match"
                  ) }),
                  D && ge && D.chapterNum && w && /* @__PURE__ */ u(wt, { children: [
                    /* @__PURE__ */ u("div", { className: "tw:mb-2 tw:flex tw:items-center tw:justify-between tw:px-3 tw:text-sm tw:font-medium tw:text-muted-foreground", children: [
                      /* @__PURE__ */ a("span", { children: `${ue(D.book, s)} ${D.chapterNum}` }),
                      /* @__PURE__ */ a("span", { children: Ur })
                    ] }),
                    /* @__PURE__ */ a(
                      gn,
                      {
                        bookId: D.book,
                        chapterNum: D.chapterNum,
                        endVerse: w(D.book, D.chapterNum),
                        scrRef: t,
                        onVerseSelect: re,
                        setVerseRef: Br,
                        isVerseDisabled: nr(
                          D.book,
                          D.chapterNum
                        ),
                        className: "tw:px-4 tw:pb-4"
                      }
                    )
                  ] }),
                  D && !ge && Pe(D.book) > 1 && /* @__PURE__ */ u(wt, { children: [
                    /* @__PURE__ */ u("div", { className: "tw:mb-2 tw:flex tw:items-center tw:justify-between tw:px-3 tw:text-sm tw:font-medium tw:text-muted-foreground", children: [
                      /* @__PURE__ */ a("span", { children: ue(D.book, s) }),
                      /* @__PURE__ */ a("span", { children: Ge })
                    ] }),
                    /* @__PURE__ */ a(
                      hn,
                      {
                        bookId: D.book,
                        scrRef: t,
                        onChapterSelect: S,
                        setChapterRef: Da,
                        isChapterDimmed: jr,
                        isChapterDisabled: Ee(D.book),
                        className: "tw:px-4 tw:pb-4"
                      }
                    )
                  ] })
                ] }),
                _ === "chapters" && G && /* @__PURE__ */ a(
                  hn,
                  {
                    bookId: G,
                    scrRef: t,
                    onChapterSelect: S,
                    setChapterRef: Da,
                    isChapterDisabled: Ee(G),
                    className: "tw:p-4"
                  }
                ),
                _ === "verses" && ot && ct !== void 0 && w && /* @__PURE__ */ a(
                  gn,
                  {
                    bookId: ot,
                    chapterNum: ct,
                    endVerse: w(
                      ot,
                      ct
                    ),
                    scrRef: t,
                    onVerseSelect: re,
                    setVerseRef: Br,
                    isVerseDisabled: nr(
                      ot,
                      ct
                    ),
                    className: "tw:p-4"
                  }
                )
              ] }),
              _r && /* @__PURE__ */ a("div", { className: "tw:border-t tw:p-1", children: /* @__PURE__ */ a(
                J,
                {
                  variant: "ghost",
                  size: "sm",
                  className: "tw:w-full tw:justify-start tw:font-normal",
                  onClick: () => mt((v) => !v),
                  children: ft ? Hr : Oa
                }
              ) })
            ]
          }
        ) })
      }
    )
  ] });
}
const Gp = Object.freeze([
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
function cd(t) {
  return typeof t == "string" ? t : typeof t == "number" ? t.toString() : t.label;
}
function fn({
  id: t,
  options: e = [],
  className: r,
  buttonClassName: o,
  popoverContentClassName: n,
  popoverContentStyle: s,
  value: i,
  onChange: c = () => {
  },
  getOptionLabel: l = cd,
  getButtonLabel: d,
  icon: w = void 0,
  buttonPlaceholder: p = "",
  textPlaceholder: h = "",
  commandEmptyMessage: g = "No option found",
  buttonVariant: f = "outline",
  alignDropDown: y = "start",
  isDisabled: b = !1,
  ariaLabel: R,
  ...k
}) {
  const [E, C] = N(!1), I = d ?? l, T = (A) => A.length > 0 && typeof A[0] == "object" && "options" in A[0], j = (A, M) => {
    const P = l(A), W = typeof A == "object" && "secondaryLabel" in A ? A.secondaryLabel : void 0, B = `${M ?? ""}${P}${W ?? ""}`;
    return /* @__PURE__ */ u(
      Ue,
      {
        value: P,
        onSelect: () => {
          c(A), C(!1);
        },
        className: "tw:gap-1.5!",
        children: [
          /* @__PURE__ */ a(
            Be,
            {
              className: m("tw:h-4 tw:w-4 tw:shrink-0", {
                "tw:opacity-0": !i || l(i) !== P
              })
            }
          ),
          /* @__PURE__ */ u("span", { className: "tw:flex-1 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap", children: [
            P,
            W && /* @__PURE__ */ u("span", { className: "tw:text-muted-foreground", children: [
              " · ",
              W
            ] })
          ] })
        ]
      },
      B
    );
  };
  return /* @__PURE__ */ u(Qe, { open: E, onOpenChange: C, ...k, children: [
    /* @__PURE__ */ a(xr, { asChild: !0, children: /* @__PURE__ */ u(
      J,
      {
        variant: f,
        role: "combobox",
        "aria-expanded": E,
        "aria-label": R,
        id: t,
        className: m(
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
                className: m(
                  "tw:min-w-0 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap tw:text-start"
                ),
                children: i ? I(i) : p
              }
            )
          ] }),
          /* @__PURE__ */ a(Ze, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ a(
      tr,
      {
        align: y,
        className: m("tw:w-[200px] tw:p-0", n),
        style: s,
        children: /* @__PURE__ */ u(er, { children: [
          /* @__PURE__ */ a(
            xa,
            {
              placeholder: h,
              className: "tw:text-inherit",
              spaceSelectsHighlightedItem: !0
            }
          ),
          /* @__PURE__ */ a(ka, { children: g }),
          /* @__PURE__ */ a(rr, { children: T(e) ? e.map((A) => /* @__PURE__ */ a(je, { heading: A.groupHeading, children: A.options.map((M) => j(M, A.groupHeading)) }, A.groupHeading)) : /* @__PURE__ */ a(je, { children: e.map((A) => j(A)) }) })
        ] })
      }
    )
  ] });
}
function ld({
  startChapter: t,
  endChapter: e,
  handleSelectStartChapter: r,
  handleSelectEndChapter: o,
  isDisabled: n = !1,
  chapterCount: s
}) {
  const i = V(
    () => Array.from({ length: s }, (d, w) => w + 1),
    [s]
  );
  return /* @__PURE__ */ u(wt, { children: [
    /* @__PURE__ */ a(Dt, { htmlFor: "start-chapters-combobox", children: "Chapters" }),
    /* @__PURE__ */ a(
      fn,
      {
        isDisabled: n,
        onChange: (d) => {
          r(d), d > e && o(d);
        },
        buttonClassName: "tw:me-2 tw:ms-2 tw:w-20",
        options: i,
        getOptionLabel: (d) => d.toString(),
        value: t
      },
      "start chapter"
    ),
    /* @__PURE__ */ a(Dt, { htmlFor: "end-chapters-combobox", children: "to" }),
    /* @__PURE__ */ a(
      fn,
      {
        isDisabled: n,
        onChange: (d) => {
          o(d), d < t && r(d);
        },
        buttonClassName: "tw:ms-2 tw:w-20",
        options: i,
        getOptionLabel: (d) => d.toString(),
        value: e
      },
      "end chapter"
    )
  ] });
}
var po = /* @__PURE__ */ ((t) => (t.CurrentBook = "current book", t.ChooseBooks = "choose books", t))(po || {});
((t) => {
  t.CURRENT_BOOK = "current book", t.CHOOSE_BOOKS = "choose books";
})(po || (po = {}));
const Yp = Object.freeze([
  "%webView_bookSelector_currentBook%",
  "%webView_bookSelector_choose%",
  "%webView_bookSelector_chooseBooks%"
]), Ba = (t, e) => t[e] ?? e;
function Wp({
  handleBookSelectionModeChange: t,
  currentBookName: e,
  onSelectBooks: r,
  selectedBookIds: o,
  chapterCount: n,
  endChapter: s,
  handleSelectEndChapter: i,
  startChapter: c,
  handleSelectStartChapter: l,
  localizedStrings: d
}) {
  const w = Ba(d, "%webView_bookSelector_currentBook%"), p = Ba(d, "%webView_bookSelector_choose%"), h = Ba(d, "%webView_bookSelector_chooseBooks%"), [g, f] = N(
    "current book"
    /* CurrentBook */
  ), y = (b) => {
    f(b), t(b);
  };
  return /* @__PURE__ */ a(
    xo,
    {
      className: "pr-twp tw:flex",
      value: g,
      onValueChange: (b) => y(b),
      children: /* @__PURE__ */ u("div", { className: "tw:flex tw:w-full tw:flex-col tw:gap-4", children: [
        /* @__PURE__ */ u("div", { className: "tw:grid tw:grid-cols-[25%_25%_50%]", children: [
          /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center", children: [
            /* @__PURE__ */ a(wa, {
              value: "current book"
              /* CurrentBook */
            }),
            /* @__PURE__ */ a(Dt, { className: "tw:ms-1", children: w })
          ] }),
          /* @__PURE__ */ a(Dt, { className: "tw:flex tw:items-center", children: e }),
          /* @__PURE__ */ a("div", { className: "tw:flex tw:items-center tw:justify-end", children: /* @__PURE__ */ a(
            ld,
            {
              isDisabled: g === "choose books",
              handleSelectStartChapter: l,
              handleSelectEndChapter: i,
              chapterCount: n,
              startChapter: c,
              endChapter: s
            }
          ) })
        ] }),
        /* @__PURE__ */ u("div", { className: "tw:grid tw:grid-cols-[25%_50%_25%]", children: [
          /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center", children: [
            /* @__PURE__ */ a(wa, {
              value: "choose books"
              /* ChooseBooks */
            }),
            /* @__PURE__ */ a(Dt, { className: "tw:ms-1", children: h })
          ] }),
          /* @__PURE__ */ a(Dt, { className: "tw:flex tw:items-center", children: o.map((b) => Vt.bookIdToEnglishName(b)).join(", ") }),
          /* @__PURE__ */ a(
            J,
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
const ki = Na(null);
function dd(t, e) {
  return { getTheme: function() {
    return e ?? null;
  } };
}
function Ne() {
  const t = Ro(ki);
  return t == null && function(e, ...r) {
    const o = new URL("https://lexical.dev/docs/error"), n = new URLSearchParams();
    n.append("code", e);
    for (const s of r) n.append("v", s);
    throw o.search = n.toString(), Error(`Minified Lexical error #${e}; visit ${o.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
  }(8), t;
}
const _i = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, wd = _i ? Xt : Y, Jr = { tag: Do };
function ud({ initialConfig: t, children: e }) {
  const r = V(() => {
    const { theme: o, namespace: n, nodes: s, onError: i, editorState: c, html: l } = t, d = dd(null, o), w = ni({ editable: t.editable, html: l, namespace: n, nodes: s, onError: (p) => i(p, w), theme: o });
    return function(p, h) {
      if (h !== null) {
        if (h === void 0) p.update(() => {
          const g = Fe();
          if (g.isEmpty()) {
            const f = Vr();
            g.append(f);
            const y = _i ? document.activeElement : null;
            (ee() !== null || y !== null && y === p.getRootElement()) && f.select();
          }
        }, Jr);
        else if (h !== null) switch (typeof h) {
          case "string": {
            const g = p.parseEditorState(h);
            p.setEditorState(g, Jr);
            break;
          }
          case "object":
            p.setEditorState(h, Jr);
            break;
          case "function":
            p.update(() => {
              Fe().isEmpty() && h(p);
            }, Jr);
        }
      }
    }(w, c), [w, d];
  }, []);
  return wd(() => {
    const o = t.editable, [n] = r;
    n.setEditable(o === void 0 || o);
  }, []), a(ki.Provider, { value: r, children: e });
}
const pd = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Xt : Y;
function hd({ ignoreHistoryMergeTagChange: t = !0, ignoreSelectionChange: e = !1, onChange: r }) {
  const [o] = Ne();
  return pd(() => {
    if (r) return o.registerUpdateListener(({ editorState: n, dirtyElements: s, dirtyLeaves: i, prevEditorState: c, tags: l }) => {
      e && s.size === 0 && i.size === 0 || t && l.has(Do) || c.isEmpty() || r(n, o, l);
    });
  }, [o, t, e, r]), null;
}
const $o = {
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
}, Ao = [
  Nl,
  ii,
  si,
  Cl
], gd = Na(null), Fa = {
  didCatch: !1,
  error: null
};
class fd extends Ec {
  constructor(e) {
    super(e), this.resetErrorBoundary = this.resetErrorBoundary.bind(this), this.state = Fa;
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
      }), this.setState(Fa);
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
    if (o && r.error !== null && md(e.resetKeys, n)) {
      var s, i;
      (s = (i = this.props).onReset) === null || s === void 0 || s.call(i, {
        next: n,
        prev: e.resetKeys,
        reason: "keys"
      }), this.setState(Fa);
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
      const l = {
        error: i,
        resetErrorBoundary: this.resetErrorBoundary
      };
      if (typeof r == "function")
        c = r(l);
      else if (o)
        c = rn(o, l);
      else if (n !== void 0)
        c = n;
      else
        throw i;
    }
    return rn(gd.Provider, {
      value: {
        didCatch: s,
        error: i,
        resetErrorBoundary: this.resetErrorBoundary
      }
    }, c);
  }
}
function md() {
  let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  return t.length !== e.length || t.some((r, o) => !Object.is(r, e[o]));
}
function vd({ children: t, onError: e }) {
  return a(fd, { fallback: a("div", { style: { border: "1px solid #f00", color: "#f00", padding: "8px" }, children: "An error was thrown." }), onError: e, children: t });
}
const bd = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Xt : Y;
function xd(t) {
  return { initialValueFn: () => t.isEditable(), subscribe: (e) => t.registerEditableListener(e) };
}
function yd() {
  return function(t) {
    const [e] = Ne(), r = V(() => t(e), [e, t]), [o, n] = N(() => r.initialValueFn()), s = U(o);
    return bd(() => {
      const { initialValueFn: i, subscribe: c } = r, l = i();
      return s.current !== l && (s.current = l, n(l)), c((d) => {
        s.current = d, n(d);
      });
    }, [r, t]), o;
  }(xd);
}
function kd(t, e) {
  const r = t.getRootElement();
  if (r === null) return [];
  const o = r.getBoundingClientRect(), n = getComputedStyle(r), s = parseFloat(n.paddingLeft) + parseFloat(n.paddingRight), i = Array.from(e.getClientRects());
  let c, l = i.length;
  i.sort((d, w) => {
    const p = d.top - w.top;
    return Math.abs(p) <= 3 ? d.left - w.left : p;
  });
  for (let d = 0; d < l; d++) {
    const w = i[d], p = c && c.top <= w.top && c.top + c.height > w.top && c.left + c.width > w.left, h = w.width + s === o.width;
    p || h ? (i.splice(d--, 1), l--) : c = w;
  }
  return i;
}
function ha(t, ...e) {
  const r = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const n of e) o.append("v", n);
  throw r.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
const Ni = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, _d = Ni && "documentMode" in document ? document.documentMode : null;
!(!Ni || !("InputEvent" in window) || _d) && "getTargetRanges" in new window.InputEvent("input");
function ve(t) {
  return `${t}px`;
}
const Nd = { attributes: !0, characterData: !0, childList: !0, subtree: !0 };
function Cd(t, e, r) {
  let o = null, n = null, s = null, i = [];
  const c = document.createElement("div");
  function l() {
    o === null && ha(182), n === null && ha(183);
    const { left: p, top: h } = n.getBoundingClientRect(), g = kd(t, e);
    var f, y;
    c.isConnected || (y = c, (f = n).insertBefore(y, f.firstChild));
    let b = !1;
    for (let R = 0; R < g.length; R++) {
      const k = g[R], E = i[R] || document.createElement("div"), C = E.style;
      C.position !== "absolute" && (C.position = "absolute", b = !0);
      const I = ve(k.left - p);
      C.left !== I && (C.left = I, b = !0);
      const T = ve(k.top - h);
      C.top !== T && (E.style.top = T, b = !0);
      const j = ve(k.width);
      C.width !== j && (E.style.width = j, b = !0);
      const A = ve(k.height);
      C.height !== A && (E.style.height = A, b = !0), E.parentNode !== c && (c.append(E), b = !0), i[R] = E;
    }
    for (; i.length > g.length; ) i.pop();
    b && r(i);
  }
  function d() {
    n = null, o = null, s !== null && s.disconnect(), s = null, c.remove();
    for (const p of i) p.remove();
    i = [];
  }
  c.style.position = "relative";
  const w = t.registerRootListener(function p() {
    const h = t.getRootElement();
    if (h === null) return d();
    const g = h.parentElement;
    if (!Wc(g)) return d();
    d(), o = h, n = g, s = new MutationObserver((f) => {
      const y = t.getRootElement(), b = y && y.parentElement;
      if (y !== o || b !== n) return p();
      for (const R of f) if (!c.contains(R.target)) return l();
    }), s.observe(g, Nd), l();
  });
  return () => {
    w(), d();
  };
}
function mn(t, e, r) {
  if (t.type !== "text" && Ir(e)) {
    const o = e.getDOMSlot(r);
    return [o.element, o.getFirstChildOffset() + t.offset];
  }
  return [Yc(r) || r, t.offset];
}
function Ed(t) {
  for (const e of t) {
    const r = e.style;
    r.background !== "Highlight" && (r.background = "Highlight"), r.color !== "HighlightText" && (r.color = "HighlightText"), r.marginTop !== ve(-1.5) && (r.marginTop = ve(-1.5)), r.paddingTop !== ve(4) && (r.paddingTop = ve(4)), r.paddingBottom !== ve(0) && (r.paddingBottom = ve(0));
  }
}
function Td(t, e = Ed) {
  let r = null, o = null, n = null, s = null, i = null, c = null, l = () => {
  };
  function d(w) {
    w.read(() => {
      const p = ee();
      if (!xe(p)) return r = null, n = null, s = null, c = null, l(), void (l = () => {
      });
      const [h, g] = function(A) {
        const M = A.getStartEndPoints();
        return A.isBackward() ? [M[1], M[0]] : M;
      }(p), f = h.getNode(), y = f.getKey(), b = h.offset, R = g.getNode(), k = R.getKey(), E = g.offset, C = t.getElementByKey(y), I = t.getElementByKey(k), T = r === null || C !== o || b !== n || y !== r.getKey(), j = s === null || I !== i || E !== c || k !== s.getKey();
      if ((T || j) && C !== null && I !== null) {
        const A = function(M, P, W, B, Q, $, et) {
          const _ = (M._window ? M._window.document : document).createRange();
          return _.setStart(...mn(P, W, B)), _.setEnd(...mn(Q, $, et)), _;
        }(t, h, f, C, g, R, I);
        l(), l = Cd(t, A, e);
      }
      r = f, o = C, n = b, s = R, i = I, c = E;
    });
  }
  return d(t.getEditorState()), De(t.registerUpdateListener(({ editorState: w }) => d(w)), () => {
    l();
  });
}
function Sd(t, e) {
  let r = null;
  const o = () => {
    const n = getSelection(), s = n && n.anchorNode, i = t.getRootElement();
    s !== null && i !== null && i.contains(s) ? r !== null && (r(), r = null) : r === null && (r = Td(t, e));
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
function Rd(t) {
  const e = li(t, (r) => Ir(r) && !r.isInline());
  return Ir(e) || ha(4, t.__key), e;
}
function Dd(t) {
  const e = ee() || Vc();
  let r;
  if (xe(e)) r = Lc(e.focus, "next");
  else {
    if (e != null) {
      const i = e.getNodes(), c = i[i.length - 1];
      c && (r = ci(c, "next"));
    }
    r = r || jc(Fe(), "previous").getFlipped().insert(Vr());
  }
  const o = Md(t, r), n = Bc(o), s = Fc(n) ? Uc(n) : o;
  return Kc(Hc(s)), t.getLatest();
}
function Md(t, e, r) {
  let o = an(e, "next");
  for (let n = o; n; n = qc(n, r)) o = n;
  return Gc(o) && ha(283), o.insert(t.isInline() ? Vr().append(t) : t), an(ci(t.getLatest(), "next"), e.direction);
}
function zd(t) {
  const e = ee();
  if (!xe(e)) return !1;
  const r = /* @__PURE__ */ new Set(), o = e.getNodes();
  for (let n = 0; n < o.length; n++) {
    const s = o[n], i = s.getKey();
    if (r.has(i)) continue;
    const c = li(s, (d) => Ir(d) && !d.isInline());
    if (c === null) continue;
    const l = c.getKey();
    c.canIndent() && !r.has(l) && (r.add(l), t(c));
  }
  return r.size > 0;
}
const Od = Symbol.for("preact-signals");
function Ea() {
  if (Re > 1) return void Re--;
  let t, e = !1;
  for (!function() {
    let r = ga;
    for (ga = void 0; r !== void 0; ) r.S.v === r.v && (r.S.i = r.i), r = r.o;
  }(); Mr !== void 0; ) {
    let r = Mr;
    for (Mr = void 0, fa++; r !== void 0; ) {
      const o = r.u;
      if (r.u = void 0, r.f &= -3, !(8 & r.f) && Ci(r)) try {
        r.c();
      } catch (n) {
        e || (t = n, e = !0);
      }
      r = o;
    }
  }
  if (fa = 0, Re--, e) throw t;
}
function Id(t) {
  if (Re > 0) return t();
  ho = ++Pd, Re++;
  try {
    return t();
  } finally {
    Ea();
  }
}
let st, Mr;
function vn(t) {
  const e = st;
  st = void 0;
  try {
    return t();
  } finally {
    st = e;
  }
}
let ga, Re = 0, fa = 0, Pd = 0, ho = 0, ia = 0;
function bn(t) {
  if (st === void 0) return;
  let e = t.n;
  return e === void 0 || e.t !== st ? (e = { i: 0, S: t, p: st.s, n: void 0, t: st, e: void 0, x: void 0, r: e }, st.s !== void 0 && (st.s.n = e), st.s = e, t.n = e, 32 & st.f && t.S(e), e) : e.i === -1 ? (e.i = 0, e.n !== void 0 && (e.n.p = e.p, e.p !== void 0 && (e.p.n = e.n), e.p = st.s, e.n = void 0, st.s.n = e, st.s = e), e) : void 0;
}
function Yt(t, e) {
  this.v = t, this.i = 0, this.n = void 0, this.t = void 0, this.l = 0, this.W = e == null ? void 0 : e.watched, this.Z = e == null ? void 0 : e.unwatched, this.name = e == null ? void 0 : e.name;
}
function Pr(t, e) {
  return new Yt(t, e);
}
function Ci(t) {
  for (let e = t.s; e !== void 0; e = e.n) if (e.S.i !== e.i || !e.S.h() || e.S.i !== e.i) return !0;
  return !1;
}
function xn(t) {
  for (let e = t.s; e !== void 0; e = e.n) {
    const r = e.S.n;
    if (r !== void 0 && (e.r = r), e.S.n = e, e.i = -1, e.n === void 0) {
      t.s = e;
      break;
    }
  }
}
function Ei(t) {
  let e, r = t.s;
  for (; r !== void 0; ) {
    const o = r.p;
    r.i === -1 ? (r.S.U(r), o !== void 0 && (o.n = r.n), r.n !== void 0 && (r.n.p = o)) : e = r, r.S.n = r.r, r.r !== void 0 && (r.r = void 0), r = o;
  }
  t.s = e;
}
function We(t, e) {
  Yt.call(this, void 0), this.x = t, this.s = void 0, this.g = ia - 1, this.f = 4, this.W = e == null ? void 0 : e.watched, this.Z = e == null ? void 0 : e.unwatched, this.name = e == null ? void 0 : e.name;
}
function $d(t, e) {
  return new We(t, e);
}
function Ti(t) {
  const e = t.m;
  if (t.m = void 0, typeof e == "function") {
    Re++;
    const r = st;
    st = void 0;
    try {
      e();
    } catch (o) {
      throw t.f &= -2, t.f |= 8, Vo(t), o;
    } finally {
      st = r, Ea();
    }
  }
}
function Vo(t) {
  for (let e = t.s; e !== void 0; e = e.n) e.S.U(e);
  t.x = void 0, t.s = void 0, Ti(t);
}
function Ad(t) {
  if (st !== this) throw new Error("Out-of-order effect");
  Ei(this), st = t, this.f &= -2, 8 & this.f && Vo(this), Ea();
}
function lr(t, e) {
  this.x = t, this.m = void 0, this.s = void 0, this.u = void 0, this.f = 32, this.name = e == null ? void 0 : e.name;
}
function ye(t, e) {
  const r = new lr(t, e);
  try {
    r.c();
  } catch (n) {
    throw r.d(), n;
  }
  const o = r.d.bind(r);
  return o[Symbol.dispose] = o, o;
}
function yr(t, e = {}) {
  const r = {};
  for (const o in t) {
    const n = e[o], s = Pr(n === void 0 ? t[o] : n);
    r[o] = s;
  }
  return r;
}
Yt.prototype.brand = Od, Yt.prototype.h = function() {
  return !0;
}, Yt.prototype.S = function(t) {
  const e = this.t;
  e !== t && t.e === void 0 && (t.x = e, this.t = t, e !== void 0 ? e.e = t : vn(() => {
    var r;
    (r = this.W) == null || r.call(this);
  }));
}, Yt.prototype.U = function(t) {
  if (this.t !== void 0) {
    const e = t.e, r = t.x;
    e !== void 0 && (e.x = r, t.e = void 0), r !== void 0 && (r.e = e, t.x = void 0), t === this.t && (this.t = r, r === void 0 && vn(() => {
      var o;
      (o = this.Z) == null || o.call(this);
    }));
  }
}, Yt.prototype.subscribe = function(t) {
  return ye(() => {
    const e = this.value, r = st;
    st = void 0;
    try {
      t(e);
    } finally {
      st = r;
    }
  }, { name: "sub" });
}, Yt.prototype.valueOf = function() {
  return this.value;
}, Yt.prototype.toString = function() {
  return this.value + "";
}, Yt.prototype.toJSON = function() {
  return this.value;
}, Yt.prototype.peek = function() {
  const t = st;
  st = void 0;
  try {
    return this.value;
  } finally {
    st = t;
  }
}, Object.defineProperty(Yt.prototype, "value", { get() {
  const t = bn(this);
  return t !== void 0 && (t.i = this.i), this.v;
}, set(t) {
  if (t !== this.v) {
    if (fa > 100) throw new Error("Cycle detected");
    (function(e) {
      Re !== 0 && fa === 0 && e.l !== ho && (e.l = ho, ga = { S: e, v: e.v, i: e.i, o: ga });
    })(this), this.v = t, this.i++, ia++, Re++;
    try {
      for (let e = this.t; e !== void 0; e = e.x) e.t.N();
    } finally {
      Ea();
    }
  }
} }), We.prototype = new Yt(), We.prototype.h = function() {
  if (this.f &= -3, 1 & this.f) return !1;
  if ((36 & this.f) == 32 || (this.f &= -5, this.g === ia)) return !0;
  if (this.g = ia, this.f |= 1, this.i > 0 && !Ci(this)) return this.f &= -2, !0;
  const t = st;
  try {
    xn(this), st = this;
    const e = this.x();
    (16 & this.f || this.v !== e || this.i === 0) && (this.v = e, this.f &= -17, this.i++);
  } catch (e) {
    this.v = e, this.f |= 16, this.i++;
  }
  return st = t, Ei(this), this.f &= -2, !0;
}, We.prototype.S = function(t) {
  if (this.t === void 0) {
    this.f |= 36;
    for (let e = this.s; e !== void 0; e = e.n) e.S.S(e);
  }
  Yt.prototype.S.call(this, t);
}, We.prototype.U = function(t) {
  if (this.t !== void 0 && (Yt.prototype.U.call(this, t), this.t === void 0)) {
    this.f &= -33;
    for (let e = this.s; e !== void 0; e = e.n) e.S.U(e);
  }
}, We.prototype.N = function() {
  if (!(2 & this.f)) {
    this.f |= 6;
    for (let t = this.t; t !== void 0; t = t.x) t.t.N();
  }
}, Object.defineProperty(We.prototype, "value", { get() {
  if (1 & this.f) throw new Error("Cycle detected");
  const t = bn(this);
  if (this.h(), t !== void 0 && (t.i = this.i), 16 & this.f) throw this.v;
  return this.v;
} }), lr.prototype.c = function() {
  const t = this.S();
  try {
    if (8 & this.f || this.x === void 0) return;
    const e = this.x();
    typeof e == "function" && (this.m = e);
  } finally {
    t();
  }
}, lr.prototype.S = function() {
  if (1 & this.f) throw new Error("Cycle detected");
  this.f |= 1, this.f &= -9, Ti(this), xn(this), Re++;
  const t = st;
  return st = this, Ad.bind(this, t);
}, lr.prototype.N = function() {
  2 & this.f || (this.f |= 2, this.u = Mr, Mr = this);
}, lr.prototype.d = function() {
  this.f |= 8, 1 & this.f || Vo(this);
}, lr.prototype.dispose = function() {
  this.d();
};
ce({ build: (t, e, r) => yr(e), config: ar({ defaultSelection: "rootEnd", disabled: !1 }), name: "@lexical/extension/AutoFocus", register(t, e, r) {
  const o = r.getOutput();
  return ye(() => o.disabled.value ? void 0 : t.registerRootListener((n) => {
    t.focus(() => {
      const s = document.activeElement;
      n === null || s !== null && n.contains(s) || n.focus({ preventScroll: !0 });
    }, { defaultSelection: o.defaultSelection.peek() });
  }));
} });
function Si() {
  const t = Fe(), e = ee(), r = Vr();
  t.clear(), t.append(r), e !== null && r.select(), xe(e) && (e.format = 0);
}
function Ri(t, e = Si) {
  return t.registerCommand(di, (r) => (t.update(e), !0), Mo);
}
ce({ build: (t, e, r) => yr(e), config: ar({ $onClear: Si }), name: "@lexical/extension/ClearEditor", register(t, e, r) {
  const { $onClear: o } = r.getOutput();
  return ye(() => Ri(t, o.value));
} });
function Vd(t) {
  return (typeof t.nodes == "function" ? t.nodes() : t.nodes) || [];
}
const Ua = Jc("format", { parse: (t) => typeof t == "number" ? t : 0 });
class Di extends oo {
  $config() {
    return this.config("decorator-text", { extends: oo, stateConfigs: [{ flat: !0, stateConfig: Ua }] });
  }
  getFormat() {
    return ll(this, Ua);
  }
  getFormatFlags(e, r) {
    return on(this.getFormat(), e, r);
  }
  hasFormat(e) {
    const r = dl[e];
    return (this.getFormat() & r) !== 0;
  }
  setFormat(e) {
    return wl(this, Ua, e);
  }
  toggleFormat(e) {
    const r = this.getFormat(), o = on(r, e, null);
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
function Ld(t) {
  return t instanceof Di;
}
ce({ name: "@lexical/extension/DecoratorText", nodes: () => [Di], register: (t, e, r) => t.registerCommand(wi, (o) => {
  const n = ee();
  if (ui(n) || xe(n)) for (const s of n.getNodes()) Ld(s) && s.toggleFormat(o);
  return !1;
}, pi) });
function Mi(t, e) {
  let r;
  return Pr(t(), { unwatched() {
    r && (r(), r = void 0);
  }, watched() {
    this.value = t(), r = e(this);
  } });
}
const go = ce({ build: (t) => Mi(() => t.getEditorState(), (e) => t.registerUpdateListener((r) => {
  e.value = r.editorState;
})), name: "@lexical/extension/EditorState" });
function ut(t, ...e) {
  const r = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const n of e) o.append("v", n);
  throw r.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
function zi(t, e) {
  if (t && e && !Array.isArray(e) && typeof t == "object" && typeof e == "object") {
    const r = t, o = e;
    for (const n in o) r[n] = zi(r[n], o[n]);
    return t;
  }
  return e;
}
const Lo = 0, fo = 1, Oi = 2, Ka = 3, Zr = 4, cr = 5, Ha = 6, Er = 7;
function qa(t) {
  return t.id === Lo;
}
function Ii(t) {
  return t.id === Oi;
}
function jd(t) {
  return function(e) {
    return e.id === fo;
  }(t) || ut(305, String(t.id), String(fo)), Object.assign(t, { id: Oi });
}
const Bd = /* @__PURE__ */ new Set();
class Fd {
  constructor(e, r) {
    Gt(this, "builder");
    Gt(this, "configs");
    Gt(this, "_dependency");
    Gt(this, "_peerNameSet");
    Gt(this, "extension");
    Gt(this, "state");
    Gt(this, "_signal");
    this.builder = e, this.extension = r, this.configs = /* @__PURE__ */ new Set(), this.state = { id: Lo };
  }
  mergeConfigs() {
    let e = this.extension.config || {};
    const r = this.extension.mergeConfig ? this.extension.mergeConfig.bind(this.extension) : Xc;
    for (const o of this.configs) e = r(e, o);
    return e;
  }
  init(e) {
    const r = this.state;
    Ii(r) || ut(306, String(r.id));
    const o = { getDependency: this.getInitDependency.bind(this), getDirectDependentNames: this.getDirectDependentNames.bind(this), getPeer: this.getInitPeer.bind(this), getPeerNameSet: this.getPeerNameSet.bind(this) }, n = { ...o, getDependency: this.getDependency.bind(this), getInitResult: this.getInitResult.bind(this), getPeer: this.getPeer.bind(this) }, s = function(c, l, d) {
      return Object.assign(c, { config: l, id: Ka, registerState: d });
    }(r, this.mergeConfigs(), o);
    let i;
    this.state = s, this.extension.init && (i = this.extension.init(e, s.config, o)), this.state = function(c, l, d) {
      return Object.assign(c, { id: Zr, initResult: l, registerState: d });
    }(s, i, n);
  }
  build(e) {
    const r = this.state;
    let o;
    r.id !== Zr && ut(307, String(r.id), String(cr)), this.extension.build && (o = this.extension.build(e, r.config, r.registerState));
    const n = { ...r.registerState, getOutput: () => o, getSignal: this.getSignal.bind(this) };
    this.state = function(s, i, c) {
      return Object.assign(s, { id: cr, output: i, registerState: c });
    }(r, o, n);
  }
  register(e, r) {
    this._signal = r;
    const o = this.state;
    o.id !== cr && ut(308, String(o.id), String(cr));
    const n = this.extension.register && this.extension.register(e, o.config, o.registerState);
    return this.state = function(s) {
      return Object.assign(s, { id: Ha });
    }(o), () => {
      const s = this.state;
      s.id !== Er && ut(309, String(o.id), String(Er)), this.state = function(i) {
        return Object.assign(i, { id: cr });
      }(s), n && n();
    };
  }
  afterRegistration(e) {
    const r = this.state;
    let o;
    return r.id !== Ha && ut(310, String(r.id), String(Ha)), this.extension.afterRegistration && (o = this.extension.afterRegistration(e, r.config, r.registerState)), this.state = function(n) {
      return Object.assign(n, { id: Er });
    }(r), o;
  }
  getSignal() {
    return this._signal === void 0 && ut(311), this._signal;
  }
  getInitResult() {
    this.extension.init === void 0 && ut(312, this.extension.name);
    const e = this.state;
    return function(r) {
      return r.id >= Zr;
    }(e) || ut(313, String(e.id), String(Zr)), e.initResult;
  }
  getInitPeer(e) {
    const r = this.builder.extensionNameMap.get(e);
    return r ? r.getExtensionInitDependency() : void 0;
  }
  getExtensionInitDependency() {
    const e = this.state;
    return function(r) {
      return r.id >= Ka;
    }(e) || ut(314, String(e.id), String(Ka)), { config: e.config };
  }
  getPeer(e) {
    const r = this.builder.extensionNameMap.get(e);
    return r ? r.getExtensionDependency() : void 0;
  }
  getInitDependency(e) {
    const r = this.builder.getExtensionRep(e);
    return r === void 0 && ut(315, this.extension.name, e.name), r.getExtensionInitDependency();
  }
  getDependency(e) {
    const r = this.builder.getExtensionRep(e);
    return r === void 0 && ut(315, this.extension.name, e.name), r.getExtensionDependency();
  }
  getState() {
    const e = this.state;
    return function(r) {
      return r.id >= Er;
    }(e) || ut(316, String(e.id), String(Er)), e;
  }
  getDirectDependentNames() {
    return this.builder.incomingEdges.get(this.extension.name) || Bd;
  }
  getPeerNameSet() {
    let e = this._peerNameSet;
    return e || (e = new Set((this.extension.peerDependencies || []).map(([r]) => r)), this._peerNameSet = e), e;
  }
  getExtensionDependency() {
    if (!this._dependency) {
      const e = this.state;
      (function(r) {
        return r.id >= cr;
      })(e) || ut(317, this.extension.name), this._dependency = { config: e.config, init: e.initResult, output: e.output };
    }
    return this._dependency;
  }
}
const yn = { tag: Do };
function Ud() {
  const t = Fe();
  t.isEmpty() && t.append(Vr());
}
const Kd = ce({ config: ar({ setOptions: yn, updateOptions: yn }), init: ({ $initialEditorState: t = Ud }) => ({ $initialEditorState: t, initialized: !1 }), afterRegistration(t, { updateOptions: e, setOptions: r }, o) {
  const n = o.getInitResult();
  if (!n.initialized) {
    n.initialized = !0;
    const { $initialEditorState: s } = n;
    if (el(s)) t.setEditorState(s, r);
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
}, name: "@lexical/extension/InitialState", nodes: [Zc, si, Qc, tl, ii] }), kn = Symbol.for("@lexical/extension/LexicalBuilder");
function _n() {
}
function Hd(t) {
  throw t;
}
function Qr(t) {
  return Array.isArray(t) ? t : [t];
}
const Ga = "0.43.0+prod.esm";
class pr {
  constructor(e) {
    Gt(this, "roots");
    Gt(this, "extensionNameMap");
    Gt(this, "outgoingConfigEdges");
    Gt(this, "incomingEdges");
    Gt(this, "conflicts");
    Gt(this, "_sortedExtensionReps");
    Gt(this, "PACKAGE_VERSION");
    this.outgoingConfigEdges = /* @__PURE__ */ new Map(), this.incomingEdges = /* @__PURE__ */ new Map(), this.extensionNameMap = /* @__PURE__ */ new Map(), this.conflicts = /* @__PURE__ */ new Map(), this.PACKAGE_VERSION = Ga, this.roots = e;
    for (const r of e) this.addExtension(r);
  }
  static fromExtensions(e) {
    const r = [Qr(Kd)];
    for (const o of e) r.push(Qr(o));
    return new pr(r);
  }
  static maybeFromEditor(e) {
    const r = e[kn];
    return r && (r.PACKAGE_VERSION !== Ga && ut(292, r.PACKAGE_VERSION, Ga), r instanceof pr || ut(293)), r;
  }
  static fromEditor(e) {
    const r = pr.maybeFromEditor(e);
    return r === void 0 && ut(294), r;
  }
  constructEditor() {
    const { $initialEditorState: e, onError: r, ...o } = this.buildCreateEditorArgs(), n = Object.assign(ni({ ...o, ...r ? { onError: (s) => {
      r(s, n);
    } } : {} }), { [kn]: this });
    for (const s of this.sortedExtensionReps()) s.build(n);
    return n;
  }
  buildEditor() {
    let e = _n;
    function r() {
      try {
        e();
      } finally {
        e = _n;
      }
    }
    const o = Object.assign(this.constructEditor(), { dispose: r, [Symbol.dispose]: r });
    return e = De(this.registerEditor(o), () => o.setRootElement(null)), o;
  }
  hasExtensionByName(e) {
    return this.extensionNameMap.has(e);
  }
  getExtensionRep(e) {
    const r = this.extensionNameMap.get(e.name);
    if (r) return r.extension !== e && ut(295, e.name), r;
  }
  addEdge(e, r, o) {
    const n = this.outgoingConfigEdges.get(e);
    n ? n.set(r, o) : this.outgoingConfigEdges.set(e, /* @__PURE__ */ new Map([[r, o]]));
    const s = this.incomingEdges.get(r);
    s ? s.add(e) : this.incomingEdges.set(r, /* @__PURE__ */ new Set([e]));
  }
  addExtension(e) {
    this._sortedExtensionReps !== void 0 && ut(296);
    const r = Qr(e), [o] = r;
    typeof o.name != "string" && ut(297, typeof o.name);
    let n = this.extensionNameMap.get(o.name);
    if (n !== void 0 && n.extension !== o && ut(298, o.name), !n) {
      n = new Fd(this, o), this.extensionNameMap.set(o.name, n);
      const s = this.conflicts.get(o.name);
      typeof s == "string" && ut(299, o.name, s);
      for (const i of o.conflictsWith || []) this.extensionNameMap.has(i) && ut(299, o.name, i), this.conflicts.set(i, o.name);
      for (const i of o.dependencies || []) {
        const c = Qr(i);
        this.addEdge(o.name, c[0].name, c.slice(1)), this.addExtension(c);
      }
      for (const [i, c] of o.peerDependencies || []) this.addEdge(o.name, i, c ? [c] : []);
    }
  }
  sortedExtensionReps() {
    if (this._sortedExtensionReps) return this._sortedExtensionReps;
    const e = [], r = (o, n) => {
      let s = o.state;
      if (Ii(s)) return;
      const i = o.extension.name;
      var c;
      qa(s) || ut(300, i, n || "[unknown]"), qa(c = s) || ut(304, String(c.id), String(Lo)), s = Object.assign(c, { id: fo }), o.state = s;
      const l = this.outgoingConfigEdges.get(i);
      if (l) for (const d of l.keys()) {
        const w = this.extensionNameMap.get(d);
        w && r(w, i);
      }
      s = jd(s), o.state = s, e.push(o);
    };
    for (const o of this.extensionNameMap.values()) qa(o.state) && r(o);
    for (const o of e) for (const [n, s] of this.outgoingConfigEdges.get(o.extension.name) || []) if (s.length > 0) {
      const i = this.extensionNameMap.get(n);
      if (i) for (const c of s) i.configs.add(c);
    }
    for (const [o, ...n] of this.roots) if (n.length > 0) {
      const s = this.extensionNameMap.get(o.name);
      s === void 0 && ut(301, o.name);
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
    return De(...n);
  }
  buildCreateEditorArgs() {
    const e = {}, r = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map(), s = {}, i = {}, c = this.sortedExtensionReps();
    for (const w of c) {
      const { extension: p } = w;
      if (p.onError !== void 0 && (e.onError = p.onError), p.disableEvents !== void 0 && (e.disableEvents = p.disableEvents), p.parentEditor !== void 0 && (e.parentEditor = p.parentEditor), p.editable !== void 0 && (e.editable = p.editable), p.namespace !== void 0 && (e.namespace = p.namespace), p.$initialEditorState !== void 0 && (e.$initialEditorState = p.$initialEditorState), p.nodes) for (const h of Vd(p)) {
        if (typeof h != "function") {
          const g = o.get(h.replace);
          g && ut(302, p.name, h.replace.name, g.extension.name), o.set(h.replace, w);
        }
        r.add(h);
      }
      if (p.html) {
        if (p.html.export) for (const [h, g] of p.html.export.entries()) n.set(h, g);
        p.html.import && Object.assign(s, p.html.import);
      }
      p.theme && zi(i, p.theme);
    }
    Object.keys(i).length > 0 && (e.theme = i), r.size && (e.nodes = [...r]);
    const l = Object.keys(s).length > 0, d = n.size > 0;
    (l || d) && (e.html = {}, l && (e.html.import = s), d && (e.html.export = n));
    for (const w of c) w.init(e);
    return e.onError || (e.onError = Hd), e;
  }
}
const qd = /* @__PURE__ */ new Set(), Nn = ce({ build(t, e, r) {
  const o = r.getDependency(go).output, n = Pr({ watchedNodeKeys: /* @__PURE__ */ new Map() }), s = Mi(() => {
  }, () => ye(() => {
    const i = s.peek(), { watchedNodeKeys: c } = n.value;
    let l, d = !1;
    o.value.read(() => {
      if (ee()) for (const [w, p] of c.entries()) {
        if (p.size === 0) {
          c.delete(w);
          continue;
        }
        const h = pl(w), g = h && h.isSelected() || !1;
        d = d || g !== (!!i && i.has(w)), g && (l = l || /* @__PURE__ */ new Set(), l.add(w));
      }
    }), !d && l && i && l.size === i.size || (s.value = l);
  }));
  return { watchNodeKey: function(i) {
    const c = $d(() => (s.value || qd).has(i)), { watchedNodeKeys: l } = n.peek();
    let d = l.get(i);
    const w = d !== void 0;
    return d = d || /* @__PURE__ */ new Set(), d.add(c), w || (l.set(i, d), n.value = { watchedNodeKeys: l }), c;
  } };
}, dependencies: [go], name: "@lexical/extension/NodeSelection" }), Gd = rl("INSERT_HORIZONTAL_RULE_COMMAND");
class hr extends oo {
  static getType() {
    return "horizontalrule";
  }
  static clone(e) {
    return new hr(e.__key);
  }
  static importJSON(e) {
    return jo().updateFromJSON(e);
  }
  static importDOM() {
    return { hr: () => ({ conversion: Yd, priority: 0 }) };
  }
  exportDOM() {
    return { element: document.createElement("hr") };
  }
  createDOM(e) {
    const r = document.createElement("hr");
    return hi(r, e.theme.hr), r;
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
function Yd() {
  return { node: jo() };
}
function jo() {
  return ul(hr);
}
function Wd(t) {
  return t instanceof hr;
}
ce({ dependencies: [go, Nn], name: "@lexical/extension/HorizontalRule", nodes: () => [hr], register(t, e, r) {
  const { watchNodeKey: o } = r.getDependency(Nn).output, n = Pr({ nodeSelections: /* @__PURE__ */ new Map() }), s = t._config.theme.hrSelected ?? "selected";
  return De(t.registerCommand(Gd, (i) => {
    const c = ee();
    if (!xe(c)) return !1;
    if (c.focus.getNode() !== null) {
      const l = jo();
      Dd(l);
    }
    return !0;
  }, Mo), t.registerCommand(al, (i) => {
    if (ol(i.target)) {
      const c = nl(i.target);
      if (Wd(c)) return function(l, d = !1) {
        const w = ee(), p = l.isSelected(), h = l.getKey();
        let g;
        d && ui(w) ? g = w : (g = il(), sl(g)), p ? g.delete(h) : g.add(h);
      }(c, i.shiftKey), !0;
    }
    return !1;
  }, pi), t.registerMutationListener(hr, (i, c) => {
    Id(() => {
      let l = !1;
      const { nodeSelections: d } = n.peek();
      for (const [w, p] of i.entries()) if (p === "destroyed") d.delete(w), l = !0;
      else {
        const h = d.get(w), g = t.getElementByKey(w);
        h ? h.domNode.value = g : (l = !0, d.set(w, { domNode: Pr(g), selectedSignal: o(w) }));
      }
      l && (n.value = { nodeSelections: d });
    });
  }), ye(() => {
    const i = [];
    for (const { domNode: c, selectedSignal: l } of n.value.nodeSelections.values()) i.push(ye(() => {
      const d = c.value;
      d && (l.value ? hi(d, s) : hl(d, s));
    }));
    return De(...i);
  }));
} });
ce({ build: (t, e) => yr({ inheritEditableFromParent: e.inheritEditableFromParent }), config: ar({ $getParentEditor: function() {
  const t = cl();
  return pr.fromEditor(t), t;
}, inheritEditableFromParent: !1 }), init: (t, e, r) => {
  const o = e.$getParentEditor();
  t.parentEditor = o, t.theme = t.theme || o._config.theme;
}, name: "@lexical/extension/NestedEditor", register: (t, e, r) => ye(() => {
  const o = t._parentEditor;
  if (o && r.getOutput().inheritEditableFromParent.value) return t.setEditable(o.isEditable()), o.registerEditableListener(t.setEditable.bind(t));
}) });
ce({ build: (t, e, r) => yr(e), config: ar({ disabled: !1, onReposition: void 0 }), name: "@lexical/utils/SelectionAlwaysOnDisplay", register: (t, e, r) => {
  const o = r.getOutput();
  return ye(() => {
    if (!o.disabled.value) return Sd(t, o.onReposition.value);
  });
} });
function Pi(t) {
  return t.canBeEmpty();
}
function Xd(t, e, r = Pi) {
  return De(t.registerCommand(gl, (o) => {
    const n = ee();
    if (!xe(n)) return !1;
    o.preventDefault();
    const s = function(i) {
      if (i.getNodes().filter((h) => fl(h) && h.canIndent()).length > 0) return !0;
      const c = i.anchor, l = i.focus, d = l.isBefore(c) ? l : c, w = d.getNode(), p = Rd(w);
      if (p.canIndent()) {
        const h = p.getKey();
        let g = ml();
        if (g.anchor.set(h, 0, "element"), g.focus.set(h, 0, "element"), g = vl(g), g.anchor.is(d)) return !0;
      }
      return !1;
    }(n) ? o.shiftKey ? bl : nn : xl;
    return t.dispatchCommand(s, void 0);
  }, Mo), t.registerCommand(nn, () => {
    const o = typeof e == "number" ? e : e ? e.peek() : null, n = ee();
    if (!xe(n)) return !1;
    const s = typeof r == "function" ? r : r.peek();
    return zd((i) => {
      if (s(i)) {
        const c = i.getIndent() + 1;
        (!o || c < o) && i.setIndent(c);
      }
    });
  }, zo));
}
ce({ build: (t, e, r) => yr(e), config: ar({ $canIndent: Pi, disabled: !1, maxIndent: null }), name: "@lexical/extension/TabIndentation", register(t, e, r) {
  const { disabled: o, maxIndent: n, $canIndent: s } = r.getOutput();
  return ye(() => {
    if (!o.value) return Xd(t, n, s);
  });
} });
const Jd = ce({ name: "@lexical/react/ReactProvider" });
function Zd() {
  return Fe().getTextContent();
}
function Qd(t, e = !0) {
  if (t) return !1;
  let r = Zd();
  return e && (r = r.trim()), r === "";
}
function tw(t) {
  if (!Qd(t, !1)) return !1;
  const e = Fe().getChildren(), r = e.length;
  if (r > 1) return !1;
  for (let o = 0; o < r; o++) {
    const n = e[o];
    if (yl(n)) return !1;
    if (Ir(n)) {
      if (!kl(n) || n.__indent !== 0) return !1;
      const s = n.getChildren(), i = s.length;
      for (let c = 0; c < i; c++) {
        const l = s[o];
        if (!no(l)) return !1;
      }
    }
  }
  return !0;
}
function $i(t) {
  return () => tw(t);
}
function Ai(t) {
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
          const l = c.args;
          if (l) {
            const [d, w, p, h, g] = l;
            t.update(() => {
              const f = ee();
              if (xe(f)) {
                const y = f.anchor;
                let b = y.getNode(), R = 0, k = 0;
                if (no(b) && d >= 0 && w >= 0 && (R = d, k = d + w, f.setTextNodeRange(b, R, b, k)), R === k && p === "" || (f.insertRawText(p), b = y.getNode()), no(b)) {
                  R = h, k = h + g;
                  const E = b.getTextContentSize();
                  R = R > E ? E : R, k = k > E ? E : k, f.setTextNodeRange(b, R, b, k);
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
ce({ build: (t, e, r) => yr(e), config: ar({ disabled: typeof window > "u" }), name: "@lexical/dragon", register: (t, e, r) => ye(() => r.getOutput().disabled.value ? void 0 : Ai(t)) });
function ew(t, ...e) {
  const r = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const n of e) o.append("v", n);
  throw r.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
const Bo = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Xt : Y;
function rw({ editor: t, ErrorBoundary: e }) {
  return function(r, o) {
    const [n, s] = N(() => r.getDecorators());
    return Bo(() => r.registerDecoratorListener((i) => {
      Tl(() => {
        s(i);
      });
    }), [r]), Y(() => {
      s(r.getDecorators());
    }, [r]), V(() => {
      const i = [], c = Object.keys(n);
      for (let l = 0; l < c.length; l++) {
        const d = c[l], w = a(o, { onError: (h) => r._onError(h), children: a(Tc, { fallback: null, children: n[d] }) }), p = r.getElementByKey(d);
        p !== null && i.push(Sl(w, p, d));
      }
      return i;
    }, [o, n, r]);
  }(t, e);
}
function aw({ editor: t, ErrorBoundary: e }) {
  return function(r) {
    const o = pr.maybeFromEditor(r);
    if (o && o.hasExtensionByName(Jd.name)) {
      for (const n of ["@lexical/plain-text", "@lexical/rich-text"]) o.hasExtensionByName(n) && ew(320, n);
      return !0;
    }
    return !1;
  }(t) ? null : a(rw, { editor: t, ErrorBoundary: e });
}
function Cn(t) {
  return t.getEditorState().read($i(t.isComposing()));
}
function ow({ contentEditable: t, placeholder: e = null, ErrorBoundary: r }) {
  const [o] = Ne();
  return function(n) {
    Bo(() => De(El(n), Ai(n)), [n]);
  }(o), u(wt, { children: [t, a(nw, { content: e }), a(aw, { editor: o, ErrorBoundary: r })] });
}
function nw({ content: t }) {
  const [e] = Ne(), r = function(n) {
    const [s, i] = N(() => Cn(n));
    return Bo(() => {
      function c() {
        const l = Cn(n);
        i(l);
      }
      return c(), De(n.registerUpdateListener(() => {
        c();
      }), n.registerEditableListener(() => {
        c();
      }));
    }, [n]), s;
  }(e), o = yd();
  return r ? typeof t == "function" ? t(o) : t : null;
}
function iw({ defaultSelection: t }) {
  const [e] = Ne();
  return Y(() => {
    e.focus(() => {
      const r = document.activeElement, o = e.getRootElement();
      o === null || r !== null && o.contains(r) || o.focus({ preventScroll: !0 });
    }, { defaultSelection: t });
  }, [t, e]), null;
}
const sw = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Xt : Y;
function cw({ onClear: t }) {
  const [e] = Ne();
  return sw(() => Ri(e, t), [e, t]), null;
}
const Vi = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Xt : Y;
function lw({ editor: t, ariaActiveDescendant: e, ariaAutoComplete: r, ariaControls: o, ariaDescribedBy: n, ariaErrorMessage: s, ariaExpanded: i, ariaInvalid: c, ariaLabel: l, ariaLabelledBy: d, ariaMultiline: w, ariaOwns: p, ariaRequired: h, autoCapitalize: g, className: f, id: y, role: b = "textbox", spellCheck: R = !0, style: k, tabIndex: E, "data-testid": C, ...I }, T) {
  const [j, A] = N(t.isEditable()), M = F((W) => {
    W && W.ownerDocument && W.ownerDocument.defaultView ? t.setRootElement(W) : t.setRootElement(null);
  }, [t]), P = V(() => /* @__PURE__ */ function(...W) {
    return (B) => {
      for (const Q of W) typeof Q == "function" ? Q(B) : Q != null && (Q.current = B);
    };
  }(T, M), [M, T]);
  return Vi(() => (A(t.isEditable()), t.registerEditableListener((W) => {
    A(W);
  })), [t]), a("div", { "aria-activedescendant": j ? e : void 0, "aria-autocomplete": j ? r : "none", "aria-controls": j ? o : void 0, "aria-describedby": n, ...s != null ? { "aria-errormessage": s } : {}, "aria-expanded": j && b === "combobox" ? !!i : void 0, ...c != null ? { "aria-invalid": c } : {}, "aria-label": l, "aria-labelledby": d, "aria-multiline": w, "aria-owns": j ? p : void 0, "aria-readonly": !j || void 0, "aria-required": h, autoCapitalize: g, className: f, contentEditable: j, "data-testid": C, id: y, ref: P, role: b, spellCheck: R, style: k, tabIndex: E, ...I });
}
const dw = ri(lw);
function En(t) {
  return t.getEditorState().read($i(t.isComposing()));
}
const ww = ri(uw);
function uw(t, e) {
  const { placeholder: r, ...o } = t, [n] = Ne();
  return u(wt, { children: [a(dw, { editor: n, ...o, ref: e }), r != null && a(pw, { editor: n, content: r })] });
}
function pw({ content: t, editor: e }) {
  const r = function(i) {
    const [c, l] = N(() => En(i));
    return Vi(() => {
      function d() {
        const w = En(i);
        l(w);
      }
      return d(), De(i.registerUpdateListener(() => {
        d();
      }), i.registerEditableListener(() => {
        d();
      }));
    }, [i]), c;
  }(e), [o, n] = N(e.isEditable());
  if (Xt(() => (n(e.isEditable()), e.registerEditableListener((i) => {
    n(i);
  })), [e]), !r) return null;
  let s = null;
  return typeof t == "function" ? s = t(o) : t !== null && (s = t), s === null ? null : a("div", { "aria-hidden": !0, children: s });
}
function hw({
  placeholder: t,
  className: e,
  placeholderClassName: r
}) {
  return /* @__PURE__ */ a(
    ww,
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
const Li = Na(void 0);
function gw({
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
  return /* @__PURE__ */ a(Li.Provider, { value: i, children: s });
}
function ji() {
  const t = Ro(Li);
  if (!t)
    throw new Error("useToolbarContext must be used within a ToolbarContext provider");
  return t;
}
function fw() {
  const [t, e] = N(void 0), r = F(() => {
    e(void 0);
  }, []), o = V(() => {
    if (t === void 0)
      return;
    const { title: s, content: i } = t;
    return /* @__PURE__ */ a(Ja, { open: !0, onOpenChange: r, children: /* @__PURE__ */ u(Za, { children: [
      /* @__PURE__ */ a(Qa, { children: /* @__PURE__ */ a(to, { children: s }) }),
      i
    ] }) });
  }, [t, r]), n = F(
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
function mw({
  children: t
}) {
  const [e] = Ne(), [r, o] = N(e), [n, s] = N("paragraph"), [i, c] = fw(), l = () => {
  };
  return Y(() => r.registerCommand(
    gi,
    (d, w) => (o(w), !1),
    zo
  ), [r]), /* @__PURE__ */ u(
    gw,
    {
      activeEditor: r,
      $updateToolbar: l,
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
function vw(t) {
  const [e] = Ne(), { activeEditor: r } = ji();
  Y(() => r.registerCommand(
    gi,
    () => {
      const o = ee();
      return o && t(o), !1;
    },
    zo
  ), [e, t]), Y(() => {
    r.getEditorState().read(() => {
      const o = ee();
      o && t(o);
    });
  }, [r, t]);
}
const Tn = [
  { format: "bold", icon: $s, label: "Bold" },
  { format: "italic", icon: As, label: "Italic" }
  // CUSTOM: TJ removed underline and strikethrough as they are not supported by the current comment
  // data conversion and are not in P9 anyway. We can add these back if we ever get this supported.
  /* { format: 'underline', icon: UnderlineIcon, label: 'Underline' },
  { format: 'strikethrough', icon: StrikethroughIcon, label: 'Strikethrough' }, */
];
function bw() {
  const { activeEditor: t } = ji(), [e, r] = N([]), o = F((n) => {
    if (xe(n) || Rl(n)) {
      const s = [];
      Tn.forEach(({ format: i }) => {
        n.hasFormat(i) && s.push(i);
      }), r((i) => i.length !== s.length || !s.every((c) => i.includes(c)) ? s : i);
    }
  }, []);
  return vw(o), /* @__PURE__ */ a(
    Bn,
    {
      type: "multiple",
      value: e,
      onValueChange: r,
      variant: "outline",
      size: "sm",
      children: Tn.map(({ format: n, icon: s, label: i }) => /* @__PURE__ */ a(
        ta,
        {
          value: n,
          "aria-label": i,
          onClick: () => {
            t.dispatchCommand(wi, n);
          },
          children: /* @__PURE__ */ a(s, { className: "tw:h-4 tw:w-4" })
        },
        n
      ))
    }
  );
}
function xw({ onClear: t }) {
  const [e] = Ne();
  Y(() => {
    t && t(() => {
      e.dispatchCommand(di, void 0);
    });
  }, [e, t]);
}
function yw({
  placeholder: t = "Start typing ...",
  autoFocus: e = !1,
  onClear: r
}) {
  const [, o] = N(void 0);
  return /* @__PURE__ */ u("div", { className: "tw:relative", children: [
    /* @__PURE__ */ a(mw, { children: () => /* @__PURE__ */ a("div", { className: "tw:sticky tw:top-0 tw:z-10 tw:flex tw:gap-2 tw:overflow-auto tw:border-b tw:p-1", children: /* @__PURE__ */ a(bw, {}) }) }),
    /* @__PURE__ */ u("div", { className: "tw:relative", children: [
      /* @__PURE__ */ a(
        ow,
        {
          contentEditable: /* @__PURE__ */ a("div", { ref: (s) => {
            s !== void 0 && o(s);
          }, children: /* @__PURE__ */ a(hw, { placeholder: t }) }),
          ErrorBoundary: vd
        }
      ),
      e && /* @__PURE__ */ a(iw, { defaultSelection: "rootEnd" }),
      /* @__PURE__ */ a(xw, { onClear: r }),
      /* @__PURE__ */ a(cw, {})
    ] })
  ] });
}
const kw = {
  namespace: "commentEditor",
  theme: $o,
  nodes: Ao,
  onError: (t) => {
    console.error(t);
  }
};
function ma({
  editorState: t,
  editorSerializedState: e,
  onChange: r,
  onSerializedChange: o,
  placeholder: n = "Start typing…",
  autoFocus: s = !1,
  onClear: i,
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
          ud,
          {
            initialConfig: {
              ...kw,
              ...t ? { editorState: t } : {},
              ...e ? { editorState: JSON.stringify(e) } : {}
            },
            children: /* @__PURE__ */ u(Mt, { children: [
              /* @__PURE__ */ a(yw, { placeholder: n, autoFocus: s, onClear: i }),
              /* @__PURE__ */ a(
                hd,
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
function Bi(t) {
  const e = t.querySelector('[contenteditable="true"]');
  if (!e) return !1;
  e.focus();
  const r = window.getSelection(), o = document.createRange();
  return o.selectNodeContents(e), o.collapse(!1), r == null || r.removeAllRanges(), r == null || r.addRange(o), !0;
}
function Fi(t) {
  return t ? t.some(
    (e) => e && "text" in e && e.text.trim().length > 0 ? !0 : !e || !("children" in e) ? !1 : Fi(e.children)
  ) : !1;
}
function se(t) {
  var e;
  return (e = t == null ? void 0 : t.root) != null && e.children ? Fi(t.root.children) : !1;
}
function _w(t) {
  if (!t || t.trim() === "")
    throw new Error("Input HTML is empty");
  const e = fi({
    namespace: "EditorUtils",
    theme: $o,
    nodes: Ao,
    onError: (o) => {
      console.error(o);
    }
  });
  let r;
  if (e.update(
    () => {
      const n = new DOMParser().parseFromString(t, "text/html"), s = Ml(e, n);
      Fe().clear(), _l(s);
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
function va(t) {
  const e = fi({
    namespace: "EditorUtils",
    theme: $o,
    nodes: Ao,
    onError: (n) => {
      console.error(n);
    }
  }), r = e.parseEditorState(JSON.stringify(t));
  e.setEditorState(r);
  let o = "";
  return e.getEditorState().read(() => {
    o = Dl(e);
  }), o = o.replace(/\s+style="[^"]*"/g, "").replace(/\s+class="[^"]*"/g, "").replace(/<span>(.*?)<\/span>/g, "$1").replace(/<b><strong[^>]*>(.*?)<\/strong><\/b>/g, "<b>$1</b>").replace(/<strong><b[^>]*>(.*?)<\/b><\/strong>/g, "<b>$1</b>").replace(/<i><em[^>]*>(.*?)<\/em><\/i>/g, "<i>$1</i>").replace(/<em><i[^>]*>(.*?)<\/i><\/em>/g, "<i>$1</i>").replace(/<u><span[^>]*>(.*?)<\/span><\/u>/g, "<u>$1</u>").replace(/<s><span[^>]*>(.*?)<\/span><\/s>/g, "<s>$1</s>").replace(/<br\s*\/?>/gi, "<br/>"), o;
}
function Fo(t) {
  return ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Home", "End"].includes(t.key) ? (t.stopPropagation(), !0) : !1;
}
const Ui = Object.freeze([
  "%cancelButton_tooltip%",
  "%acceptButton_tooltip%"
]), Sn = (t, e) => t[e] ?? e;
function Ki({
  onCancelClick: t,
  onAcceptClick: e,
  canAccept: r = !0,
  localizedStrings: o = {},
  className: n = "tw:h-6 tw:w-6",
  acceptLabel: s
}) {
  const i = Sn(o, "%cancelButton_tooltip%"), c = s ?? Sn(o, "%acceptButton_tooltip%");
  return /* @__PURE__ */ u(ya, { children: [
    /* @__PURE__ */ a(Mt, { children: /* @__PURE__ */ u(_t, { children: [
      /* @__PURE__ */ a(Nt, { asChild: !0, children: /* @__PURE__ */ a(
        J,
        {
          "aria-label": i,
          className: n,
          size: "icon",
          onClick: t,
          variant: "secondary",
          children: /* @__PURE__ */ a(To, {})
        }
      ) }),
      /* @__PURE__ */ a(Ct, { children: /* @__PURE__ */ a("p", { children: i }) })
    ] }) }),
    /* @__PURE__ */ a(bo, {}),
    /* @__PURE__ */ a(Mt, { children: /* @__PURE__ */ u(_t, { children: [
      /* @__PURE__ */ a(Nt, { asChild: !0, children: /* @__PURE__ */ a(
        J,
        {
          "aria-label": c,
          className: n,
          size: "icon",
          onClick: e,
          disabled: !r,
          children: /* @__PURE__ */ a(Be, {})
        }
      ) }),
      /* @__PURE__ */ a(Ct, { children: /* @__PURE__ */ a("p", { children: c }) })
    ] }) })
  ] });
}
const Nw = "verseText", Xp = Object.freeze([
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
]), Hi = [
  "tw:prose tw:max-w-none tw:break-words tw:text-sm tw:font-normal tw:text-foreground",
  "tw:[&>blockquote]:border-s-0 tw:[&>blockquote]:p-0 tw:[&>blockquote]:ps-0 tw:[&>blockquote]:font-normal tw:[&>blockquote]:not-italic tw:[&>blockquote]:text-foreground",
  "tw:prose-quoteless"
].join(" ");
function qi(t) {
  return (t == null ? void 0 : t.conflictType) === Nw;
}
function Gi(t) {
  return t === "replaced" ? "reject" : t === "merged" ? "merged" : "accept";
}
function sa(t, e) {
  return t === "" ? e["%comment_assign_unassigned%"] ?? "Unassigned" : t === "Team" ? e["%comment_assign_team%"] ?? "Team" : t;
}
function Uo(t) {
  const e = yo();
  return t.key === "Enter" && (e && t.metaKey || !e && t.ctrlKey);
}
const Cw = {
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
function Ya(t, e) {
  return t === "" ? e["%commentEditor_unassigned%"] ?? "Unassigned" : t === "Team" ? e["%commentEditor_team%"] ?? "Team" : t;
}
function Jp({
  assignableUsers: t,
  onSave: e,
  onClose: r,
  localizedStrings: o,
  initialAssignedUser: n
}) {
  const [s, i] = N(Cw), [c, l] = N(n), [d, w] = N(!1), p = U(void 0), h = U(null);
  Y(() => {
    let b = !0;
    const R = h.current;
    if (!R) return;
    const k = setTimeout(() => {
      b && Bi(R);
    }, 300);
    return () => {
      b = !1, clearTimeout(k);
    };
  }, []);
  const g = F(() => {
    if (!se(s)) return;
    const b = va(s);
    e(b, c);
  }, [s, e, c]), f = o["%commentEditor_placeholder%"] ?? "Type your comment here...", y = o["%commentEditor_assignTo_label%"] ?? "Assign to";
  return /* @__PURE__ */ u("div", { className: "pr-twp tw:grid tw:gap-3", children: [
    /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:justify-between", children: [
      /* @__PURE__ */ a("span", { className: "tw:text-sm tw:font-medium", children: y }),
      /* @__PURE__ */ a(
        Ki,
        {
          onCancelClick: r,
          onAcceptClick: g,
          canAccept: se(s),
          localizedStrings: o,
          acceptLabel: o["%commentEditor_saveButton_tooltip%"]
        }
      )
    ] }),
    /* @__PURE__ */ a("div", { className: "tw:flex tw:items-center tw:gap-2", children: /* @__PURE__ */ u(Qe, { open: d, onOpenChange: w, children: [
      /* @__PURE__ */ a(xr, { asChild: !0, children: /* @__PURE__ */ u(
        J,
        {
          variant: "outline",
          className: "tw:flex tw:w-full tw:items-center tw:justify-start tw:gap-2",
          disabled: t.length === 0,
          children: [
            /* @__PURE__ */ a(Wn, { className: "tw:h-4 tw:w-4" }),
            /* @__PURE__ */ a("span", { children: Ya(c !== void 0 ? c : "", o) })
          ]
        }
      ) }),
      /* @__PURE__ */ a(
        tr,
        {
          className: "tw:w-auto tw:p-0",
          align: "start",
          onKeyDown: (b) => {
            b.key === "Escape" && (b.stopPropagation(), w(!1));
          },
          children: /* @__PURE__ */ a(er, { children: /* @__PURE__ */ a(rr, { children: t.map((b) => /* @__PURE__ */ a(
            Ue,
            {
              onSelect: () => {
                l(b || void 0), w(!1);
              },
              className: "tw:flex tw:items-center",
              children: /* @__PURE__ */ a("span", { children: Ya(b, o) })
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
          b.key === "Escape" ? (b.preventDefault(), b.stopPropagation(), r()) : Uo(b) && (b.preventDefault(), b.stopPropagation(), se(s) && g());
        },
        onKeyDown: (b) => {
          Fo(b), (b.key === "Enter" || b.key === " ") && b.stopPropagation();
        },
        children: /* @__PURE__ */ a(
          ma,
          {
            editorSerializedState: s,
            onSerializedChange: (b) => i(b),
            placeholder: f,
            onClear: (b) => {
              p.current = b;
            }
          }
        )
      }
    )
  ] });
}
const Zp = Object.freeze([
  "%commentEditor_placeholder%",
  "%commentEditor_assignTo_label%",
  "%commentEditor_saveButton_tooltip%",
  "%commentEditor_unassigned%",
  "%commentEditor_team%",
  ...Ui
]), Qp = Object.freeze([
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
]), Ew = "comment-list";
function th(t) {
  return t;
}
function Tw({
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
function eh({ className: t, ...e }) {
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
function rh({ className: t, ...e }) {
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
function ah({ className: t, ...e }) {
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
function Sw({ className: t, ...e }) {
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
function oh({ className: t, ...e }) {
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
function Rw({
  className: t,
  size: e = "default",
  ...r
}) {
  return /* @__PURE__ */ a(
    Oo.Root,
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
function nh({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    Oo.Image,
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
function Dw({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    Oo.Fallback,
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
function Rn({
  comment: t,
  isReply: e = !1,
  localizedStrings: r,
  isThreadExpanded: o = !1,
  handleUpdateComment: n,
  handleDeleteComment: s,
  onEditingChange: i,
  canEditOrDelete: c = !1
}) {
  const [l, d] = N(!1), [w, p] = N(), h = U(null);
  Y(() => {
    if (!l) return;
    let T = !0;
    const j = h.current;
    if (!j) return;
    const A = setTimeout(() => {
      T && Bi(j);
    }, 300);
    return () => {
      T = !1, clearTimeout(A);
    };
  }, [l]);
  const g = F(
    (T) => {
      T && T.stopPropagation(), d(!1), p(void 0), i == null || i(!1);
    },
    [i]
  ), f = F(
    async (T) => {
      if (T && T.stopPropagation(), !w || !n) return;
      await n(
        t.id,
        va(w)
      ) && (d(!1), p(void 0), i == null || i(!1));
    },
    [w, n, t.id, i]
  ), y = V(() => {
    const T = new Date(t.date), j = gc(
      T,
      r["%comment_date_today%"],
      r["%comment_date_yesterday%"]
    ), A = T.toLocaleTimeString(void 0, {
      hour: "numeric",
      minute: "2-digit"
    });
    return Ve(r["%comment_dateAtTime%"], {
      date: j,
      time: A
    });
  }, [t.date, r]), b = V(() => t.user, [t.user]), R = V(
    () => t.user.split(" ").map((T) => T[0]).join("").toUpperCase().slice(0, 2),
    [t.user]
  ), k = V(() => So(t.contents), [t.contents]), E = V(
    () => t.contents.replace(/<[^>]*>/g, "").trim().length > 0,
    [t.contents]
  ), C = !!t.conflictResolutionAction && !E, I = V(() => {
    if (o && c)
      return /* @__PURE__ */ u(wt, { children: [
        /* @__PURE__ */ u(
          $e,
          {
            onClick: (T) => {
              T.stopPropagation(), d(!0), p(_w(t.contents)), i == null || i(!0);
            },
            children: [
              /* @__PURE__ */ a(Vs, { className: "tw:me-2 tw:h-4 tw:w-4" }),
              r["%comment_editComment%"]
            ]
          }
        ),
        /* @__PURE__ */ u(
          $e,
          {
            onClick: async (T) => {
              T.stopPropagation(), s && await s(t.id);
            },
            children: [
              /* @__PURE__ */ a(Ls, { className: "tw:me-2 tw:h-4 tw:w-4" }),
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
    i
  ]);
  return /* @__PURE__ */ u(
    "div",
    {
      className: m("tw:flex tw:w-full tw:flex-row tw:items-baseline tw:gap-3 tw:space-y-3", {
        "tw:text-sm": e
      }),
      children: [
        /* @__PURE__ */ a(Rw, { className: "tw:h-8 tw:w-8", children: /* @__PURE__ */ a(Dw, { className: "tw:text-xs tw:font-medium", children: R }) }),
        /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-1 tw:flex-col tw:gap-2", children: [
          /* @__PURE__ */ u("div", { className: "tw:flex tw:w-full tw:flex-row tw:flex-wrap tw:items-baseline tw:gap-x-2", children: [
            /* @__PURE__ */ a("p", { className: "tw:text-sm tw:font-medium", children: b }),
            /* @__PURE__ */ a("p", { className: "tw:text-xs tw:font-normal tw:text-muted-foreground", children: y }),
            /* @__PURE__ */ a("div", { className: "tw:flex-1" }),
            e && t.assignedUser !== void 0 && /* @__PURE__ */ u(zr, { variant: "secondary", className: "tw:text-xs tw:font-normal", children: [
              "→ ",
              sa(t.assignedUser, r)
            ] })
          ] }),
          l && /* @__PURE__ */ u(
            "div",
            {
              role: "textbox",
              tabIndex: -1,
              className: "tw:flex tw:flex-col tw:gap-2",
              ref: h,
              onKeyDownCapture: (T) => {
                T.key === "Escape" ? (T.preventDefault(), T.stopPropagation(), g()) : Uo(T) && (T.preventDefault(), T.stopPropagation(), se(w) && f());
              },
              onKeyDown: (T) => {
                Fo(T), (T.key === "Enter" || T.key === " ") && T.stopPropagation();
              },
              onClick: (T) => {
                T.stopPropagation();
              },
              children: [
                /* @__PURE__ */ a(
                  ma,
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
                    onSerializedChange: (T) => p(T)
                  }
                ),
                /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-row tw:items-start tw:justify-end tw:gap-2", children: [
                  /* @__PURE__ */ a(
                    J,
                    {
                      size: "icon",
                      onClick: g,
                      variant: "outline",
                      className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                      children: /* @__PURE__ */ a(To, {})
                    }
                  ),
                  /* @__PURE__ */ a(
                    J,
                    {
                      size: "icon",
                      onClick: f,
                      className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                      disabled: !se(w),
                      children: /* @__PURE__ */ a(Xn, {})
                    }
                  )
                ] })
              ]
            }
          ),
          !l && /* @__PURE__ */ u(wt, { children: [
            t.status === "Resolved" && !C && /* @__PURE__ */ a("div", { className: "tw:text-sm tw:italic", children: r["%comment_status_resolved%"] }),
            t.status === "Todo" && e && /* @__PURE__ */ a("div", { className: "tw:text-sm tw:italic", children: r["%comment_status_todo%"] }),
            C ? (
              // A platform-created conflict resolution comment carries an empty body — PT9 renders
              // its banner UI-side from conflictResolutionAction, it never stores text. So render the
              // localized, neutral outcome line here instead of the (empty) contents, styled like the
              // italic status lines above. These are the same neutral keys ConflictNoteCard's Result
              // region used to render inline. Only when the body IS empty: a resolution synced from
              // PT9 can carry the resolver's typed note alongside the action, and PT9 shows that text,
              // so the body branch below keeps it visible rather than discarding it for this banner.
              /* @__PURE__ */ a("div", { className: "tw:text-sm tw:italic", children: Gi(t.conflictResolutionAction) === "merged" ? r["%conflict_note_outcome_combined%"] ?? "Combined both changes." : r["%conflict_note_outcome_used_other%"] ?? "Used the other change instead of the current text." })
            ) : /* @__PURE__ */ a(
              "div",
              {
                className: m(
                  // Shared note-body prose/blockquote treatment (also used by conflict-diff's
                  // DIFF_HTML_CLASSES). Layer this comment item's own extras on top: items-start +
                  // gap-2 for layout, and line-clamp while the thread is collapsed.
                  Hi,
                  "tw:items-start tw:gap-2",
                  {
                    "tw:line-clamp-3": !o
                  }
                ),
                dangerouslySetInnerHTML: { __html: k }
              }
            )
          ] })
        ] }),
        I && /* @__PURE__ */ u(Me, { children: [
          /* @__PURE__ */ a(be, { asChild: !0, children: /* @__PURE__ */ a(J, { variant: "ghost", size: "icon", children: /* @__PURE__ */ a(js, {}) }) }),
          /* @__PURE__ */ a(ze, { align: "end", children: I })
        ] })
      ]
    }
  );
}
function Yi({
  show: t,
  disabled: e = !1,
  onClick: r,
  ariaLabel: o
}) {
  if (t)
    return /* @__PURE__ */ a(
      J,
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
        children: /* @__PURE__ */ a(Be, { className: "tw:h-4 tw:w-4" })
      }
    );
}
const Dn = {
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
function Wi({
  classNameForVerseText: t,
  comments: e,
  localizedStrings: r,
  isSelected: o = !1,
  verseRef: n,
  assignedUser: s,
  currentUser: i,
  handleSelectThread: c,
  threadId: l,
  thread: d,
  threadStatus: w,
  handleAddCommentToThread: p,
  handleUpdateComment: h,
  handleDeleteComment: g,
  handleReadStatusChange: f,
  assignableUsers: y,
  canUserAddCommentToThread: b,
  canUserAssignThreadCallback: R,
  canUserResolveThreadCallback: k,
  canUserEditOrDeleteCommentCallback: E,
  isRead: C = !1,
  autoReadDelay: I = 5,
  onVerseRefClick: T,
  initialAssignedUser: j,
  activeComments: A,
  rootContentSlot: M,
  resolveActionSlot: P,
  spaceRootContentFromReplies: W = !1
}) {
  const [B, Q] = N(Dn), [$, et] = N(), [_, z] = N(), G = o, [nt, ot] = N(!1), [pt, ct] = N(!1), [Z, it] = N(!1), [gt, ft] = N(!1), [mt, Zt] = N(!1), [vt, Qt] = N(C), [zt, bt] = N(!1), Ft = U(void 0), [Ot, Ut] = N(/* @__PURE__ */ new Map());
  Y(() => {
    let x = !0;
    return (async () => {
      const O = k ? await k(l) : !1;
      x && Zt(O);
    })(), () => {
      x = !1;
    };
  }, [l, k]), Y(() => {
    let x = !0;
    if (!o) {
      ft(!1), Ut(/* @__PURE__ */ new Map());
      return;
    }
    return (async () => {
      const O = R ? await R(l) : !1;
      x && ft(O);
    })(), () => {
      x = !1;
    };
  }, [o, l, R]);
  const lt = U("idle");
  Y(() => {
    if (!o) {
      lt.current !== "idle" && (et(void 0), z(void 0), lt.current = "idle");
      return;
    }
    lt.current === "idle" && (lt.current = "pending"), gt ? lt.current === "pending" && j !== void 0 && // Skip pre-population if the thread is already assigned to this user — doing so
    // would show "Assigning to: Alice" and enable the submit button for a no-op call.
    j !== s && (et(j), lt.current = "auto-populated") : lt.current === "auto-populated" && (et(void 0), lt.current = "pending");
  }, [o, j, gt, s]);
  const Et = V(
    () => A ?? e.filter((x) => !x.deleted),
    [A, e]
  );
  Y(() => {
    let x = !0;
    if (!o || !E) {
      Ut(/* @__PURE__ */ new Map());
      return;
    }
    return (async () => {
      const O = /* @__PURE__ */ new Map();
      await Promise.all(
        Et.map(async (rt) => {
          const dt = await E(rt.id);
          x && O.set(rt.id, dt);
        })
      ), x && Ut(O);
    })(), () => {
      x = !1;
    };
  }, [o, Et, E]);
  const jt = V(() => Et[0], [Et]), le = U(null), de = U(void 0), Kt = F(() => {
    var x;
    (x = de.current) == null || x.call(de), Q(Dn);
  }, []), He = F(() => {
    const x = !vt;
    Qt(x), bt(!x), f == null || f(l, x);
  }, [vt, f, l]);
  Y(() => {
    ot(!1);
  }, [o]), Y(() => {
    if (o && !vt && !zt) {
      const x = setTimeout(() => {
        Qt(!0), f == null || f(l, !0);
      }, I * 1e3);
      return Ft.current = x, () => clearTimeout(x);
    }
    Ft.current && (clearTimeout(Ft.current), Ft.current = void 0);
  }, [o, vt, zt, I, l, f]);
  const Ht = V(
    () => ({
      singleReply: r["%comment_thread_single_reply%"],
      multipleReplies: r["%comment_thread_multiple_replies%"]
    }),
    [r]
  ), ne = V(() => {
    if (s === void 0)
      return;
    if (s === "")
      return r["%comment_assign_unassigned%"] ?? "Unassigned";
    const x = sa(s, r);
    return Ve(r["%comment_assigned_to%"], {
      assignedUser: x
    });
  }, [s, r]), te = V(() => Et.slice(1), [Et]), D = V(() => te.length ?? 0, [te.length]), yt = V(() => D > 0, [D]), qt = V(() => nt || D <= 2 ? te : te.slice(-2), [te, D, nt]), It = V(() => nt || D <= 2 ? 0 : D - 2, [D, nt]), re = V(
    () => D === 1 ? Ht.singleReply : Ve(Ht.multipleReplies, { count: D }),
    [D, Ht]
  ), Ce = V(
    () => It === 1 ? Ht.singleReply : Ve(Ht.multipleReplies, { count: It }),
    [It, Ht]
  );
  Y(() => {
    !o && pt && yt && ct(!1);
  }, [o, pt, yt]);
  const S = F(
    async (x) => {
      x && x.stopPropagation();
      const H = se(B) ? va(B) : void 0;
      if ($ !== void 0) {
        await p({
          threadId: l,
          contents: H,
          assignedUser: $
        }) && (z($), H && Kt());
        return;
      }
      H && await p({ threadId: l, contents: H }) && Kt();
    },
    [
      Kt,
      B,
      p,
      $,
      l
    ]
  ), K = F(
    async (x) => {
      const H = se(B) ? va(B) : void 0, O = x.status ? x.assignedUser : $ ?? x.assignedUser, rt = await p({
        ...x,
        contents: H,
        assignedUser: O
      });
      return rt && (O !== void 0 && z(O), H && Kt()), rt;
    },
    [Kt, B, p, $]
  );
  if (Et.length === 0) return;
  const X = /* @__PURE__ */ a(
    Rn,
    {
      comment: jt,
      localizedStrings: r,
      isThreadExpanded: o,
      threadStatus: w,
      handleAddCommentToThread: K,
      handleUpdateComment: h,
      handleDeleteComment: g,
      onEditingChange: ct,
      canEditOrDelete: (!pt && Ot.get(jt.id)) ?? !1,
      canUserResolveThread: mt
    }
  );
  return /* @__PURE__ */ a(
    Tw,
    {
      role: "option",
      "aria-selected": o,
      id: l,
      className: m(
        "tw:group tw:w-full tw:rounded-none tw:border-none tw:p-4 tw:outline-hidden tw:transition-all tw:duration-200 tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-1 tw:focus:ring-offset-background",
        { "tw:cursor-pointer tw:hover:shadow-md": !o },
        {
          "tw:bg-primary-foreground": !o && w !== "Resolved" && vt,
          "tw:bg-background": o && w !== "Resolved" && vt,
          "tw:bg-muted": w === "Resolved",
          "tw:bg-accent": !vt && !o && w !== "Resolved"
        }
      ),
      onClick: () => {
        c(l);
      },
      tabIndex: -1,
      children: /* @__PURE__ */ u(Sw, { className: "tw:flex tw:flex-col tw:gap-2 tw:p-0", children: [
        /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:content-center tw:items-start tw:gap-4", children: [
          /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:gap-2", children: [
            ne && /* @__PURE__ */ a(zr, { className: "tw:rounded-sm tw:bg-input tw:text-sm tw:font-normal tw:text-primary tw:hover:bg-input", children: ne }),
            /* @__PURE__ */ a(
              J,
              {
                variant: "ghost",
                size: "icon",
                onClick: (x) => {
                  x.stopPropagation(), He();
                },
                className: "tw:text-muted-foreground tw:transition tw:hover:text-foreground",
                "aria-label": vt ? r["%comment_aria_mark_as_unread%"] ?? "Mark as unread" : r["%comment_aria_mark_as_read%"] ?? "Mark as read",
                children: vt ? /* @__PURE__ */ a(Bs, {}) : /* @__PURE__ */ a(Fs, {})
              }
            ),
            P === void 0 ? (
              // Generic status-resolve check (used by non-conflict threads and, via ConflictThread
              // leaving this slot undefined, by non-verseText conflicts, which resolve through a
              // plain status change). ConflictThread overrides this slot for verseText conflicts.
              /* @__PURE__ */ a(
                Yi,
                {
                  show: mt && w !== "Resolved",
                  onClick: () => K({ threadId: l, status: "Resolved" }),
                  ariaLabel: r["%comment_aria_resolve_thread%"] ?? "Resolve thread"
                }
              )
            ) : P
          ] }),
          /* @__PURE__ */ a("div", { className: "tw:flex tw:max-w-full tw:flex-wrap tw:items-baseline tw:gap-2", children: /* @__PURE__ */ u(
            "p",
            {
              ref: le,
              className: m(
                "tw:flex-1 tw:overflow-hidden tw:text-ellipsis tw:text-sm tw:font-normal tw:text-muted-foreground",
                {
                  "tw:overflow-visible tw:text-clip tw:whitespace-normal tw:break-words": G
                },
                { "tw:whitespace-nowrap": !G }
              ),
              children: [
                n && T ? /* @__PURE__ */ a(
                  J,
                  {
                    variant: "ghost",
                    size: "sm",
                    className: "tw:h-auto tw:px-1 tw:py-0 tw:text-sm tw:font-normal tw:text-muted-foreground",
                    onClick: (x) => {
                      x.stopPropagation(), T(d);
                    },
                    children: n
                  }
                ) : n,
                /* @__PURE__ */ u("span", { className: t, children: [
                  jt.contextBefore,
                  /* @__PURE__ */ a("span", { className: "tw:font-bold", children: jt.selectedText }),
                  jt.contextAfter
                ] })
              ]
            }
          ) }),
          M ?? X
        ] }),
        /* @__PURE__ */ u(wt, { children: [
          yt && !o && /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:gap-5", children: [
            /* @__PURE__ */ a("div", { className: "tw:w-8", children: /* @__PURE__ */ a(Or, {}) }),
            /* @__PURE__ */ a("p", { className: "tw:text-sm tw:text-muted-foreground", children: re })
          ] }),
          !o && se(B) && /* @__PURE__ */ a(
            ma,
            {
              editorSerializedState: B,
              onSerializedChange: (x) => Q(x),
              placeholder: r["%comment_replyOrAssign%"]
            }
          ),
          o && /* @__PURE__ */ u(wt, { children: [
            W && qt.length > 0 && /* @__PURE__ */ a("div", { className: "tw:h-2", "data-slot": "root-content-reply-gap", "aria-hidden": "true" }),
            It > 0 && /* @__PURE__ */ u(
              "div",
              {
                className: "tw:flex tw:cursor-pointer tw:items-center tw:gap-5 tw:py-2",
                onClick: (x) => {
                  x.stopPropagation(), ot(!0);
                },
                role: "button",
                tabIndex: 0,
                onKeyDown: (x) => {
                  (x.key === "Enter" || x.key === " ") && (x.preventDefault(), x.stopPropagation(), ot(!0));
                },
                children: [
                  /* @__PURE__ */ a("div", { className: "tw:w-8", children: /* @__PURE__ */ a(Or, {}) }),
                  /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:gap-2", children: [
                    /* @__PURE__ */ a("p", { className: "tw:text-sm tw:text-muted-foreground", children: Ce }),
                    nt ? /* @__PURE__ */ a(Yn, {}) : /* @__PURE__ */ a(Ze, {})
                  ] })
                ]
              }
            ),
            qt.map((x) => /* @__PURE__ */ a("div", { children: /* @__PURE__ */ a(
              Rn,
              {
                comment: x,
                localizedStrings: r,
                isReply: !0,
                isThreadExpanded: o,
                handleUpdateComment: h,
                handleDeleteComment: g,
                onEditingChange: ct,
                canEditOrDelete: (!pt && Ot.get(x.id)) ?? !1
              }
            ) }, x.id)),
            b !== !1 && (!pt || se(B)) && /* @__PURE__ */ u(
              "div",
              {
                role: "textbox",
                tabIndex: -1,
                className: "tw:w-full tw:space-y-2",
                onClick: (x) => x.stopPropagation(),
                onKeyDownCapture: (x) => {
                  Uo(x) && (x.preventDefault(), x.stopPropagation(), (se(B) || $ !== void 0 && $ !== _) && S());
                },
                onKeyDown: (x) => {
                  Fo(x), (x.key === "Enter" || x.key === " ") && x.stopPropagation();
                },
                children: [
                  /* @__PURE__ */ a(
                    ma,
                    {
                      editorSerializedState: B,
                      onSerializedChange: (x) => Q(x),
                      placeholder: w === "Resolved" ? r["%comment_reopenResolved%"] : r["%comment_replyOrAssign%"],
                      autoFocus: !0,
                      onClear: (x) => {
                        de.current = x;
                      }
                    }
                  ),
                  /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-row tw:items-center tw:justify-end tw:gap-2", children: [
                    $ !== void 0 && (se(B) || $ !== _) && /* @__PURE__ */ a("span", { className: "tw:flex-1 tw:text-sm tw:text-muted-foreground", children: Ve(
                      r["%comment_assigning_to%"] ?? "Assigning to: {assignedUser}",
                      {
                        assignedUser: sa(
                          $,
                          r
                        )
                      }
                    ) }),
                    /* @__PURE__ */ u(Qe, { open: Z, onOpenChange: it, children: [
                      /* @__PURE__ */ a(xr, { asChild: !0, children: /* @__PURE__ */ a(
                        J,
                        {
                          size: "icon",
                          variant: "outline",
                          className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                          disabled: !gt || !y || y.length === 0 || !y.includes(i),
                          "aria-label": r["%comment_aria_assign_user%"] ?? "Assign user",
                          children: /* @__PURE__ */ a(Wn, {})
                        }
                      ) }),
                      /* @__PURE__ */ a(
                        tr,
                        {
                          className: "tw:w-auto tw:p-0",
                          align: "end",
                          onKeyDown: (x) => {
                            x.key === "Escape" && (x.stopPropagation(), it(!1));
                          },
                          children: /* @__PURE__ */ a(er, { children: /* @__PURE__ */ a(rr, { children: y == null ? void 0 : y.map((x) => /* @__PURE__ */ a(
                            Ue,
                            {
                              onSelect: () => {
                                et(x !== s ? x : void 0), lt.current = "user-selected", z(void 0), it(!1);
                              },
                              className: "tw:flex tw:items-center",
                              children: /* @__PURE__ */ a("span", { children: sa(x, r) })
                            },
                            x || "unassigned"
                          )) }) })
                        }
                      )
                    ] }),
                    /* @__PURE__ */ a(
                      J,
                      {
                        size: "icon",
                        onClick: S,
                        className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                        disabled: !se(B) && ($ === void 0 || $ === _),
                        "aria-label": r["%comment_aria_submit_comment%"] ?? "Submit comment",
                        children: /* @__PURE__ */ a(Xn, {})
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
const Mw = m(
  Hi,
  // `prose` gives block children (the top-level blockquote wrapper, and any p — whether nested
  // inside that blockquote or, in the non-verseText fallback, a direct child) vertical margins that
  // make these already-compact cards feel bulky. Zero both so the diff sits flush inside the card.
  "tw:[&>blockquote]:my-0 tw:[&_p]:my-0",
  "tw:[&_u]:font-semibold tw:[&_u]:text-success-foreground tw:[&_u]:no-underline",
  "tw:[&_s]:text-destructive tw:[&_s]:line-through"
), zw = (t) => t.replace(/(\s+)(<\/[us]>)/g, "$2$1"), ca = (t) => zw(So(t));
function la({ html: t }) {
  return /* @__PURE__ */ a(
    "div",
    {
      className: Mw,
      dangerouslySetInnerHTML: { __html: t }
    }
  );
}
function Ow({
  comment: t,
  localizedStrings: e,
  availableActions: r = "acceptOrReject",
  resolvedResolution: o,
  onResolve: n,
  isResolving: s = !1
}) {
  const [i, c] = N("accept"), l = ao(), d = ao(), w = r === "loading", p = r === "accept", h = r === "none", g = r === "acceptRejectOrMerge", f = p ? "accept" : i, y = V(
    () => ca(t.rejectedText ?? ""),
    [t.rejectedText]
  ), b = V(
    () => ca(t.acceptedText ?? ""),
    [t.acceptedText]
  ), R = V(
    () => ca(t.mergedText ?? ""),
    [t.mergedText]
  ), k = V(() => So(t.contents), [t.contents]);
  if (!qi(t))
    return /* @__PURE__ */ a(la, { html: k });
  const E = (_) => {
    c(_ === "reject" || _ === "merge" ? _ : "accept");
  }, C = e["%conflict_note_stale_notice%"] ?? "The verse was edited after this conflict was recorded, so 'Use the other change' is no longer available. Keep the current text to resolve.", I = g ? [
    {
      value: "merge",
      label: e["%conflict_note_option_combine%"] ?? "Combine both changes",
      html: R
    }
  ] : [], T = [
    {
      value: "accept",
      label: e["%conflict_note_option_keep_current%"] ?? "Keep the current text",
      html: b
    },
    {
      value: "reject",
      label: e["%conflict_note_option_use_other%"] ?? "Use the other change",
      html: y
    },
    ...I
  ], j = f === "accept", A = s || j;
  let M;
  j ? M = e["%conflict_note_save_disabled_tooltip%"] ?? "Keeping the current text makes no change — resolve the thread with the ✓ to keep it." : s || (M = e["%conflict_note_save_warning%"] ?? "This can't be undone.");
  const P = e["%conflict_note_no_result%"] ?? "No result preview available.", W = /* @__PURE__ */ a("p", { className: "tw:text-muted-foreground", children: P }), B = (_) => _ ? /* @__PURE__ */ a("p", { className: "tw:whitespace-pre-wrap tw:text-foreground", children: _ }) : W, Q = () => {
    const _ = o ?? "accept";
    return _ === "merged" ? t.mergedText ? /* @__PURE__ */ a(la, { html: R }) : W : B(_ === "reject" ? t.rejectedResultText : t.resultText);
  }, $ = (_) => p && _.value === "reject", et = (_) => {
    const z = f === _.value, G = `${d}-${_.value}`, nt = $(_);
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
          "data-value": _.value,
          className: m(
            "tw:flex tw:flex-col tw:gap-1 tw:rounded-md tw:border tw:p-2",
            "tw:focus-within:ring-2 tw:focus-within:ring-ring tw:focus-within:ring-offset-1",
            z ? "tw:border-border tw:bg-accent/50" : "tw:border-transparent tw:hover:bg-accent/30",
            nt ? "tw:cursor-not-allowed tw:opacity-60" : "tw:cursor-pointer"
          ),
          children: [
            /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:gap-2", children: [
              /* @__PURE__ */ a(
                wa,
                {
                  id: G,
                  value: _.value,
                  "aria-label": _.label,
                  disabled: nt,
                  "aria-describedby": nt ? l : void 0
                }
              ),
              /* @__PURE__ */ a("span", { "aria-hidden": !0, className: "tw:font-medium", children: _.label })
            ] }),
            nt && // aria-describedby links the option to this visually-hidden notice so assistive tech
            // announces why the choice is read-only.
            /* @__PURE__ */ a("span", { id: l, className: "tw:sr-only", children: C }),
            /* @__PURE__ */ a(la, { html: _.html })
          ]
        },
        _.value
      )
    );
  };
  return (
    // Contain every click inside the card (selecting an option, pressing Save) so it never bubbles
    // up to toggle the enclosing CommentThread open/closed. The thread toggles on click only, so a
    // single onClick guard at the root is enough; this container is not itself an interactive control
    // and needs no keyboard handler (the thread has no keyboard toggle to intercept).
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
    /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:gap-3 tw:text-sm", onClick: (_) => _.stopPropagation(), children: [
      /* @__PURE__ */ a("p", { children: e["%conflict_note_description_verseText%"] ?? "Conflicting changes were made to the verse text." }),
      w && /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:gap-2", "data-slot": "conflict-loading", children: [
        /* @__PURE__ */ a(dr, { className: "tw:h-8 tw:w-full" }),
        /* @__PURE__ */ a(dr, { className: "tw:h-8 tw:w-full" }),
        /* @__PURE__ */ a(dr, { className: "tw:h-8 tw:w-24" })
      ] }),
      !w && h && Q(),
      !w && !h && /* @__PURE__ */ u(wt, { children: [
        /* @__PURE__ */ a("p", { children: e["%conflict_note_choose_prompt%"] ?? "Select which change to keep:" }),
        /* @__PURE__ */ a(
          xo,
          {
            value: f,
            onValueChange: E,
            disabled: s,
            "aria-label": e["%conflict_note_choose_aria_label%"] ?? "Choose resolution",
            children: T.map((_) => $(_) ? /* @__PURE__ */ a(Mt, { delayDuration: 0, children: /* @__PURE__ */ u(_t, { children: [
              /* @__PURE__ */ a(Nt, { asChild: !0, children: et(_) }),
              /* @__PURE__ */ a(Ct, { children: C })
            ] }) }, _.value) : et(_))
          }
        ),
        /* @__PURE__ */ a(Mt, { delayDuration: 0, children: /* @__PURE__ */ u(_t, { children: [
          /* @__PURE__ */ a(Nt, { asChild: !0, children: /* @__PURE__ */ a("span", { className: "tw:inline-flex tw:self-start", children: /* @__PURE__ */ a(
            J,
            {
              size: "sm",
              disabled: A,
              onClick: () => n == null ? void 0 : n(f),
              children: e["%conflict_note_save_and_resolve%"] ?? "Save and resolve"
            }
          ) }) }),
          M && /* @__PURE__ */ a(Ct, { children: M })
        ] }) })
      ] })
    ] })
  );
}
const Iw = {
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
function Pw({
  comment: t,
  localizedStrings: e,
  resolvedResolution: r
}) {
  const o = V(
    () => ca(t.rejectedText ?? ""),
    [t.rejectedText]
  );
  if (r) {
    const { key: s, fallback: i } = Iw[r];
    return /* @__PURE__ */ a("p", { className: "tw:text-sm tw:font-normal tw:text-muted-foreground", children: e[s] ?? i });
  }
  const n = e["%conflict_note_summary_unresolved%"] ?? "Conflicting edits. Choose which change to keep.";
  return /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:gap-1", children: [
    /* @__PURE__ */ a("p", { className: "tw:text-sm tw:font-normal tw:text-muted-foreground", children: n }),
    o ? /* @__PURE__ */ a(la, { html: o }) : void 0
  ] });
}
function $w(t) {
  return t === "reject" ? "reject" : t === "merge" ? "merged" : "accept";
}
function Aw({
  threadId: t,
  threadStatus: e,
  isSelected: r,
  activeComments: o,
  conflictResolution: n
}) {
  const [s, i] = N("loading"), [c, l] = N(!1), [d, w] = N(), p = n == null ? void 0 : n.getOptions, h = n == null ? void 0 : n.resolve;
  Y(() => {
    let k = !0;
    if (!r) {
      i("loading");
      return;
    }
    return (async () => {
      let C;
      try {
        C = p ? await p(t) : "none";
      } catch {
        C = "none";
      }
      k && (i(C), C !== "none" && w(void 0));
    })(), () => {
      k = !1;
    };
  }, [r, t, e, p]);
  const g = U(!1), f = F(
    async (k) => {
      if (!(!h || g.current)) {
        g.current = !0, l(!0);
        try {
          await h(t, k) && (w($w(k)), i("none"));
        } catch {
        } finally {
          g.current = !1, l(!1);
        }
      }
    },
    [h, t]
  ), b = V(() => {
    if (e === "Resolved") {
      for (let k = o.length - 1; k >= 0; k -= 1)
        if (o[k].status === "Resolved")
          return Gi(o[k].conflictResolutionAction);
      return "accept";
    }
  }, [e, o]) ?? d;
  return { conflictOptions: s, isResolving: c, resolve: f, resolvedResolution: b, showResolveCheck: s !== "loading" && s !== "none" };
}
function Vw(t) {
  const {
    comments: e,
    localizedStrings: r,
    isSelected: o = !1,
    threadId: n,
    threadStatus: s,
    conflictResolution: i
  } = t, c = V(() => e.filter((R) => !R.deleted), [e]), l = V(
    () => c.find((R) => R.conflictType) ?? c[0],
    [c]
  ), { conflictOptions: d, isResolving: w, resolve: p, resolvedResolution: h, showResolveCheck: g } = Aw({
    threadId: n,
    threadStatus: s,
    isSelected: o,
    activeComments: c,
    conflictResolution: i
  }), f = qi(l);
  let y;
  f && l && (y = o ? /* @__PURE__ */ a(
    Ow,
    {
      comment: l,
      localizedStrings: r,
      availableActions: d,
      resolvedResolution: h,
      onResolve: p,
      isResolving: w
    }
  ) : /* @__PURE__ */ a(
    Pw,
    {
      comment: l,
      localizedStrings: r,
      resolvedResolution: h
    }
  ));
  let b;
  return f && (b = /* @__PURE__ */ a(
    Yi,
    {
      show: g,
      disabled: w,
      onClick: () => p("accept"),
      ariaLabel: r["%comment_aria_resolve_thread%"] ?? "Resolve thread"
    }
  )), /* @__PURE__ */ a(
    Wi,
    {
      ...t,
      activeComments: c,
      rootContentSlot: y,
      resolveActionSlot: b,
      spaceRootContentFromReplies: f && o
    }
  );
}
function ih({
  className: t = "",
  classNameForVerseText: e,
  threads: r,
  currentUser: o,
  localizedStrings: n,
  handleAddCommentToThread: s,
  handleUpdateComment: i,
  handleDeleteComment: c,
  handleReadStatusChange: l,
  assignableUsers: d,
  canUserAddCommentToThread: w,
  canUserAssignThreadCallback: p,
  canUserResolveThreadCallback: h,
  canUserEditOrDeleteCommentCallback: g,
  selectedThreadId: f,
  onSelectedThreadChange: y,
  onVerseRefClick: b,
  conflictResolution: R
}) {
  const [k, E] = N(/* @__PURE__ */ new Set()), [C, I] = N(), [T, j] = N(), A = F(
    async (z) => {
      const G = await s(z);
      return G !== void 0 && z.assignedUser !== void 0 && z.assignedUser !== "" && j(z.assignedUser), G;
    },
    [s]
  );
  Y(() => {
    f && (E((z) => new Set(z).add(f)), I(f));
  }, [f]);
  const M = r.filter(
    (z) => z.comments.some((G) => !G.deleted)
  ), P = M.map((z) => ({ id: z.id })), W = F(
    (z) => {
      E((G) => new Set(G).add(z.id)), I(z.id), y == null || y(z.id);
    },
    [y]
  ), B = F(
    (z) => {
      const G = k.has(z);
      E((nt) => {
        const ot = new Set(nt);
        return ot.has(z) ? ot.delete(z) : ot.add(z), ot;
      }), I(z), y == null || y(G ? void 0 : z);
    },
    [k, y]
  ), { listboxRef: Q, activeId: $, handleKeyDown: et } = hs({
    options: P,
    onOptionSelect: W
  }), _ = F(
    (z) => {
      z.key === "Escape" ? (C && k.has(C) && (E((G) => {
        const nt = new Set(G);
        return nt.delete(C), nt;
      }), I(void 0), y == null || y(void 0)), z.preventDefault(), z.stopPropagation()) : et(z);
    },
    [C, k, et, y]
  );
  return /* @__PURE__ */ a(
    "div",
    {
      id: Ew,
      role: "listbox",
      tabIndex: 0,
      ref: Q,
      "aria-activedescendant": $ ?? void 0,
      "aria-label": "Comments",
      className: m(
        "tw:flex tw:w-full tw:flex-col tw:space-y-3 tw:outline-hidden tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-1 tw:focus:ring-offset-background",
        t
      ),
      onKeyDown: _,
      children: M.map((z) => {
        const G = {
          classNameForVerseText: e,
          comments: z.comments,
          localizedStrings: n,
          verseRef: z.verseRef,
          handleSelectThread: B,
          threadId: z.id,
          thread: z,
          isRead: z.isRead,
          isSelected: k.has(z.id),
          currentUser: o,
          assignedUser: z.assignedUser,
          threadStatus: z.status,
          handleAddCommentToThread: A,
          handleUpdateComment: i,
          handleDeleteComment: c,
          handleReadStatusChange: l,
          assignableUsers: d,
          canUserAddCommentToThread: w,
          canUserAssignThreadCallback: p,
          canUserResolveThreadCallback: h,
          canUserEditOrDeleteCommentCallback: g,
          onVerseRefClick: b,
          initialAssignedUser: T
        };
        return /* @__PURE__ */ a(
          "div",
          {
            className: m({
              "tw:opacity-60": z.status === "Resolved"
            }),
            children: z.type === "Conflict" ? /* @__PURE__ */ a(Vw, { ...G, conflictResolution: R }) : /* @__PURE__ */ a(Wi, { ...G })
          },
          z.id
        );
      })
    }
  );
}
function Lw({ table: t }) {
  return /* @__PURE__ */ u(Me, { children: [
    /* @__PURE__ */ a(be, { asChild: !0, children: /* @__PURE__ */ u(J, { variant: "outline", size: "sm", className: "tw:ml-auto tw:hidden tw:h-8 tw:lg:flex", children: [
      /* @__PURE__ */ a(Us, { className: "tw:mr-2 tw:h-4 tw:w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ u(ze, { align: "end", className: "tw:w-[150px]", children: [
      /* @__PURE__ */ a(br, { children: "Toggle columns" }),
      /* @__PURE__ */ a(Je, {}),
      t.getAllColumns().filter((e) => e.getCanHide()).map((e) => /* @__PURE__ */ a(
        Le,
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
function gr({ ...t }) {
  return /* @__PURE__ */ a(Jt.Root, { "data-slot": "select", ...t });
}
function jw({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    Jt.Group,
    {
      "data-slot": "select-group",
      className: m("tw:scroll-my-1 tw:p-1", t),
      ...e
    }
  );
}
function fr({ ...t }) {
  return /* @__PURE__ */ a(Jt.Value, { "data-slot": "select-value", ...t });
}
function mr({ className: t, size: e = "default", children: r, ...o }) {
  const n = ke();
  return /* @__PURE__ */ u(
    Jt.Trigger,
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
        /* @__PURE__ */ a(Jt.Icon, { asChild: !0, children: /* @__PURE__ */ a(ai, { className: "tw:pointer-events-none tw:size-4 tw:text-muted-foreground" }) })
      ]
    }
  );
}
function vr({
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
  const i = ke();
  return /* @__PURE__ */ a(Jt.Portal, { children: /* @__PURE__ */ u(
    Jt.Content,
    {
      "data-slot": "select-content",
      "data-align-trigger": r === "item-aligned",
      className: m(
        "pr-twp tw:relative tw:max-h-(--radix-select-content-available-height) tw:data-[align-trigger=true]:min-w-(--radix-select-trigger-width) tw:data-[align-trigger=false]:min-w-36 tw:origin-(--radix-select-content-transform-origin) tw:overflow-x-hidden tw:overflow-y-auto tw:rounded-lg tw:bg-popover tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:data-[align-trigger=true]:animate-none tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95 tw:animate-none! tw:bg-popover/70 tw:before:-z-1 tw:**:data-[slot$=-item]:focus:bg-foreground/10 tw:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 tw:**:data-[slot$=-separator]:bg-foreground/5 tw:**:data-[slot$=-trigger]:focus:bg-foreground/10 tw:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! tw:**:data-[variant=destructive]:focus:bg-foreground/10! tw:**:data-[variant=destructive]:text-accent-foreground! tw:**:data-[variant=destructive]:**:text-accent-foreground! tw:relative tw:before:pointer-events-none tw:before:absolute tw:before:inset-0 tw:before:rounded-[inherit] tw:before:backdrop-blur-2xl tw:before:backdrop-saturate-150",
        r === "popper" && "tw:data-[side=bottom]:translate-y-1 tw:data-[side=left]:-translate-x-1 tw:rtl:data-[side=left]:translate-x-1 tw:data-[side=right]:translate-x-1 tw:rtl:data-[side=right]:-translate-x-1 tw:data-[side=top]:-translate-y-1",
        t
      ),
      style: { zIndex: Oe, ...n },
      position: r,
      align: o,
      ...s,
      children: [
        /* @__PURE__ */ a(Bw, {}),
        /* @__PURE__ */ a(
          Jt.Viewport,
          {
            "data-position": r,
            className: m(
              "tw:data-[position=popper]:h-(--radix-select-trigger-height) tw:data-[position=popper]:w-full tw:data-[position=popper]:min-w-(--radix-select-trigger-width)",
              r === "popper" && "tw:"
            ),
            children: /* @__PURE__ */ a("div", { dir: i, children: e })
          }
        ),
        /* @__PURE__ */ a(Fw, {})
      ]
    }
  ) });
}
function sh({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    Jt.Label,
    {
      "data-slot": "select-label",
      className: m("pr-twp tw:px-1.5 tw:py-1 tw:text-xs tw:text-muted-foreground", t),
      ...e
    }
  );
}
function pe({
  className: t,
  children: e,
  ...r
}) {
  return /* @__PURE__ */ u(
    Jt.Item,
    {
      "data-slot": "select-item",
      className: m(
        "pr-twp tw:relative tw:flex tw:w-full tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:*:[span]:last:flex tw:*:[span]:last:items-center tw:*:[span]:last:gap-2",
        t
      ),
      ...r,
      children: [
        /* @__PURE__ */ a("span", { className: "tw:pointer-events-none tw:absolute tw:end-2 tw:flex tw:size-4 tw:items-center tw:justify-center", children: /* @__PURE__ */ a(Jt.ItemIndicator, { children: /* @__PURE__ */ a(Ca, { className: "tw:pointer-events-none" }) }) }),
        /* @__PURE__ */ a(Jt.ItemText, { children: e })
      ]
    }
  );
}
function ch({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    Jt.Separator,
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
function Bw({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    Jt.ScrollUpButton,
    {
      "data-slot": "select-scroll-up-button",
      className: m(
        "pr-twp tw:z-10 tw:flex tw:cursor-default tw:items-center tw:justify-center tw:bg-popover tw:py-1 tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      ...e,
      children: /* @__PURE__ */ a(Rc, {})
    }
  );
}
function Fw({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    Jt.ScrollDownButton,
    {
      "data-slot": "select-scroll-down-button",
      className: m(
        "pr-twp tw:z-10 tw:flex tw:cursor-default tw:items-center tw:justify-center tw:bg-popover tw:py-1 tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      ...e,
      children: /* @__PURE__ */ a(Sc, {})
    }
  );
}
function Uw({ table: t }) {
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
        gr,
        {
          value: `${t.getState().pagination.pageSize}`,
          onValueChange: (e) => {
            t.setPageSize(Number(e));
          },
          children: [
            /* @__PURE__ */ a(mr, { className: "tw:h-8 tw:w-[70px]", children: /* @__PURE__ */ a(fr, { placeholder: t.getState().pagination.pageSize }) }),
            /* @__PURE__ */ a(vr, { side: "top", children: [10, 20, 30, 40, 50].map((e) => /* @__PURE__ */ a(pe, { value: `${e}`, children: e }, e)) })
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
        J,
        {
          variant: "outline",
          size: "icon",
          className: "tw:hidden tw:h-8 tw:w-8 tw:p-0 tw:lg:flex",
          onClick: () => t.setPageIndex(0),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ a("span", { className: "tw:sr-only", children: "Go to first page" }),
            /* @__PURE__ */ a(Ks, { className: "tw:h-4 tw:w-4" })
          ]
        }
      ),
      /* @__PURE__ */ u(
        J,
        {
          variant: "outline",
          size: "icon",
          className: "tw:h-8 tw:w-8 tw:p-0",
          onClick: () => t.previousPage(),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ a("span", { className: "tw:sr-only", children: "Go to previous page" }),
            /* @__PURE__ */ a(Hs, { className: "tw:h-4 tw:w-4" })
          ]
        }
      ),
      /* @__PURE__ */ u(
        J,
        {
          variant: "outline",
          size: "icon",
          className: "tw:h-8 tw:w-8 tw:p-0",
          onClick: () => t.nextPage(),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ a("span", { className: "tw:sr-only", children: "Go to next page" }),
            /* @__PURE__ */ a(qs, { className: "tw:h-4 tw:w-4" })
          ]
        }
      ),
      /* @__PURE__ */ u(
        J,
        {
          variant: "outline",
          size: "icon",
          className: "tw:hidden tw:h-8 tw:w-8 tw:p-0 tw:lg:flex",
          onClick: () => t.setPageIndex(t.getPageCount() - 1),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ a("span", { className: "tw:sr-only", children: "Go to last page" }),
            /* @__PURE__ */ a(Gs, { className: "tw:h-4 tw:w-4" })
          ]
        }
      )
    ] })
  ] }) });
}
function Kw({
  columns: t,
  data: e,
  enablePagination: r = !1,
  showPaginationControls: o = !1,
  showColumnVisibilityControls: n = !1,
  stickyHeader: s = !1,
  onRowClickHandler: i = () => {
  },
  id: c,
  isLoading: l = !1,
  noResultsMessage: d
}) {
  var T;
  const [w, p] = N([]), [h, g] = N([]), [f, y] = N({}), [b, R] = N({}), k = V(() => e ?? [], [e]), E = mi({
    data: k,
    columns: t,
    getCoreRowModel: bi(),
    ...r && { getPaginationRowModel: Ol() },
    onSortingChange: p,
    getSortedRowModel: vi(),
    onColumnFiltersChange: g,
    getFilteredRowModel: zl(),
    onColumnVisibilityChange: y,
    onRowSelectionChange: R,
    state: {
      sorting: w,
      columnFilters: h,
      columnVisibility: f,
      rowSelection: b
    }
  }), C = E.getVisibleFlatColumns();
  let I;
  return l ? I = Array.from({ length: 10 }).map((M, P) => `skeleton-row-${P}`).map((M) => /* @__PURE__ */ a(Ae, { className: "tw:hover:bg-transparent", children: /* @__PURE__ */ a(wr, { colSpan: C.length ?? t.length, className: "tw:border-0 tw:p-0", children: /* @__PURE__ */ a("div", { className: "tw:w-full tw:py-2", children: /* @__PURE__ */ a(dr, { className: "tw:h-14 tw:w-full tw:rounded-md" }) }) }) }, M)) : ((T = E.getRowModel().rows) == null ? void 0 : T.length) > 0 ? I = E.getRowModel().rows.map((j) => /* @__PURE__ */ a(
    Ae,
    {
      onClick: () => i(j, E),
      "data-state": j.getIsSelected() && "selected",
      children: j.getVisibleCells().map((A) => /* @__PURE__ */ a(wr, { children: Dr(A.column.columnDef.cell, A.getContext()) }, A.id))
    },
    j.id
  )) : I = /* @__PURE__ */ a(Ae, { children: /* @__PURE__ */ a(wr, { colSpan: t.length, className: "tw:h-24 tw:text-center", children: d }) }), /* @__PURE__ */ u("div", { className: "pr-twp", id: c, children: [
    n && /* @__PURE__ */ a(Lw, { table: E }),
    /* @__PURE__ */ u(ko, { stickyHeader: s, children: [
      /* @__PURE__ */ a(_o, { stickyHeader: s, children: E.getHeaderGroups().map((j) => /* @__PURE__ */ a(Ae, { children: j.headers.map((A) => /* @__PURE__ */ a(ua, { className: "tw:p-0", children: A.isPlaceholder ? void 0 : Dr(A.column.columnDef.header, A.getContext()) }, A.id)) }, j.id)) }),
      /* @__PURE__ */ a(No, { children: I })
    ] }),
    r && /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:justify-end tw:space-x-2 tw:py-4", children: [
      /* @__PURE__ */ a(
        J,
        {
          variant: "outline",
          size: "sm",
          onClick: () => E.previousPage(),
          disabled: !E.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ a(
        J,
        {
          variant: "outline",
          size: "sm",
          onClick: () => E.nextPage(),
          disabled: !E.getCanNextPage(),
          children: "Next"
        }
      )
    ] }),
    r && o && /* @__PURE__ */ a(Uw, { table: E })
  ] });
}
function lh({
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
      className: m(
        "pr-twp tw:prose",
        {
          "tw:line-clamp-3 tw:max-h-10 tw:overflow-hidden tw:text-ellipsis tw:break-words": n
        },
        r
      ),
      children: /* @__PURE__ */ a($l, { options: s, children: e })
    }
  );
}
const Hw = Object.freeze([
  "%webView_error_dump_header%",
  "%webView_error_dump_info_message%"
]), Mn = (t, e) => t[e] ?? e;
function qw({
  errorDetails: t,
  handleCopyNotify: e,
  localizedStrings: r,
  id: o
}) {
  const n = Mn(r, "%webView_error_dump_header%"), s = Mn(r, "%webView_error_dump_info_message%");
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
          /* @__PURE__ */ a(J, { variant: "secondary", size: "icon", className: "size-8", onClick: () => i(), children: /* @__PURE__ */ a(Jn, {}) })
        ] }),
        /* @__PURE__ */ a("div", { className: "tw:prose tw:w-full", children: /* @__PURE__ */ a("pre", { className: "tw:text-xs", children: t }) })
      ]
    }
  );
}
const dh = Object.freeze([
  ...Hw,
  "%webView_error_dump_copied_message%"
]);
function wh({
  errorDetails: t,
  handleCopyNotify: e,
  localizedStrings: r,
  children: o,
  className: n,
  id: s
}) {
  const [i, c] = N(!1), l = () => {
    c(!0), e && e();
  };
  return /* @__PURE__ */ u(Qe, { onOpenChange: (w) => {
    w || c(!1);
  }, children: [
    /* @__PURE__ */ a(xr, { asChild: !0, children: o }),
    /* @__PURE__ */ u(tr, { id: s, className: m("tw:min-w-80 tw:max-w-96", n), children: [
      i && r["%webView_error_dump_copied_message%"] && /* @__PURE__ */ a(Dt, { children: r["%webView_error_dump_copied_message%"] }),
      /* @__PURE__ */ a(
        qw,
        {
          errorDetails: t,
          handleCopyNotify: l,
          localizedStrings: r
        }
      )
    ] })
  ] });
}
var Gw = /* @__PURE__ */ ((t) => (t[t.Check = 0] = "Check", t[t.Radio = 1] = "Radio", t))(Gw || {});
function uh({ id: t, label: e, groups: r }) {
  const [o, n] = N(
    Object.fromEntries(
      r.map(
        (d, w) => d.itemType === 0 ? [w, []] : void 0
      ).filter((d) => !!d)
    )
  ), [s, i] = N({}), c = (d, w) => {
    const p = !o[d][w];
    n((g) => (g[d][w] = p, { ...g }));
    const h = r[d].items[w];
    h.onUpdate(h.id, p);
  }, l = (d, w) => {
    i((h) => (h[d] = w, { ...h }));
    const p = r[d].items.find((h) => h.id === w);
    p ? p.onUpdate(w) : console.error(`Could not find dropdown radio item with id '${w}'!`);
  };
  return /* @__PURE__ */ a("div", { id: t, children: /* @__PURE__ */ u(Me, { children: [
    /* @__PURE__ */ a(be, { asChild: !0, children: /* @__PURE__ */ u(J, { variant: "default", children: [
      /* @__PURE__ */ a(Ys, { size: 16, className: "tw:mr-2 tw:h-4 tw:w-4" }),
      e,
      /* @__PURE__ */ a(Ze, { size: 16, className: "tw:ml-2 tw:h-4 tw:w-4" })
    ] }) }),
    /* @__PURE__ */ a(ze, { children: r.map((d, w) => /* @__PURE__ */ u("div", { children: [
      /* @__PURE__ */ a(br, { children: d.label }),
      /* @__PURE__ */ a(Fn, { children: d.itemType === 0 ? /* @__PURE__ */ a(wt, { children: d.items.map((p, h) => /* @__PURE__ */ a("div", { children: /* @__PURE__ */ a(
        Le,
        {
          checked: o[w][h],
          onCheckedChange: () => c(w, h),
          children: p.label
        }
      ) }, p.id)) }) : /* @__PURE__ */ a(
        gs,
        {
          value: s[w],
          onValueChange: (p) => l(w, p),
          children: d.items.map((p) => /* @__PURE__ */ a("div", { children: /* @__PURE__ */ a(fs, { value: p.id, children: p.label }) }, p.id))
        }
      ) }),
      /* @__PURE__ */ a(Je, {})
    ] }, d.label)) })
  ] }) });
}
function ph({
  id: t,
  category: e,
  downloads: r,
  languages: o,
  moreInfoUrl: n,
  handleMoreInfoLinkClick: s,
  supportUrl: i,
  handleSupportLinkClick: c
}) {
  const l = new ei("en", {
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
            /* @__PURE__ */ a(Ws, { className: "tw:h-4 tw:w-4" }),
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
        (n || i) && /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:gap-1 tw:px-4", children: [
          n && /* @__PURE__ */ a("div", { className: "tw:flex tw:gap-1", children: /* @__PURE__ */ u(
            J,
            {
              onClick: () => s(),
              variant: "link",
              className: "tw:flex tw:h-auto tw:gap-1 tw:py-0 tw:text-xs tw:font-semibold tw:text-foreground",
              children: [
                "Website",
                /* @__PURE__ */ a(Xs, { className: "tw:h-4 tw:w-4" })
              ]
            }
          ) }),
          i && /* @__PURE__ */ a("div", { className: "tw:flex tw:gap-1", children: /* @__PURE__ */ u(
            J,
            {
              onClick: () => c(),
              variant: "link",
              className: "tw:flex tw:h-auto tw:gap-1 tw:py-0 tw:text-xs tw:font-semibold tw:text-foreground",
              children: [
                "Support",
                /* @__PURE__ */ a(Js, { className: "tw:h-4 tw:w-4" })
              ]
            }
          ) })
        ] })
      ]
    }
  );
}
function Yw({ id: t, versionHistory: e }) {
  const [r, o] = N(!1), n = /* @__PURE__ */ new Date();
  function s(c) {
    const l = new Date(c), d = new Date(n.getTime() - l.getTime()), w = d.getUTCFullYear() - 1970, p = d.getUTCMonth(), h = d.getUTCDate() - 1;
    let g = "";
    return w > 0 ? g = `${w.toString()} year${w === 1 ? "" : "s"} ago` : p > 0 ? g = `${p.toString()} month${p === 1 ? "" : "s"} ago` : h === 0 ? g = "today" : g = `${h.toString()} day${h === 1 ? "" : "s"} ago`, g;
  }
  const i = Object.entries(e).sort((c, l) => l[0].localeCompare(c[0]));
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
function hh({
  id: t,
  publisherDisplayName: e,
  fileSize: r,
  locales: o,
  versionHistory: n,
  currentVersion: s
}) {
  const i = V(() => fc(r), [r]), l = ((d) => {
    const w = new Intl.DisplayNames(mc(), { type: "language" });
    return d.map((p) => w.of(p));
  })(o);
  return /* @__PURE__ */ a("div", { id: t, className: "pr-twp tw:border-t tw:py-2", children: /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:gap-2 tw:divide-y", children: [
    Object.entries(n).length > 0 && /* @__PURE__ */ a(Yw, { versionHistory: n }),
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
          /* @__PURE__ */ a("span", { className: "tw:font-semibold", children: l.join(", ") })
        ] }) })
      ] })
    ] })
  ] }) });
}
function gh({
  entries: t,
  selected: e,
  onChange: r,
  placeholder: o,
  commandEmptyMessage: n,
  customSelectedText: s,
  isDisabled: i,
  sortSelected: c,
  icon: l,
  className: d,
  badgesPlaceholder: w,
  id: p
}) {
  return /* @__PURE__ */ u("div", { id: p, className: "tw:flex tw:items-center tw:gap-2", children: [
    /* @__PURE__ */ a(
      ms,
      {
        entries: t,
        selected: e,
        onChange: r,
        placeholder: o,
        commandEmptyMessage: n,
        customSelectedText: s,
        isDisabled: i,
        sortSelected: c,
        icon: l,
        className: d
      }
    ),
    e.length > 0 ? /* @__PURE__ */ a("div", { className: "tw:flex tw:flex-wrap tw:items-center tw:gap-2", children: e.map((h) => {
      var g;
      return /* @__PURE__ */ u(zr, { variant: "muted", className: "tw:flex tw:items-center tw:gap-1", children: [
        /* @__PURE__ */ a(
          J,
          {
            variant: "ghost",
            size: "icon",
            className: "tw:h-4 tw:w-4 tw:p-0 tw:hover:bg-transparent",
            onClick: () => r(e.filter((f) => f !== h)),
            children: /* @__PURE__ */ a(To, { className: "tw:h-3 tw:w-3" })
          }
        ),
        (g = t.find((f) => f.value === h)) == null ? void 0 : g.label
      ] }, h);
    }) }) : /* @__PURE__ */ a(Dt, { children: w })
  ] });
}
const Ww = Object.freeze([
  "%undoButton_tooltip%",
  "%redoButton_tooltip%"
]), zn = (t, e) => t[e] ?? e;
function Xw({
  onUndoClick: t,
  onRedoClick: e,
  canUndo: r = !0,
  canRedo: o = !0,
  localizedStrings: n = {},
  showKeyboardShortcuts: s = !0,
  className: i = "tw:h-6 tw:w-6",
  variant: c = "ghost"
}) {
  const l = yo(), d = zn(n, "%undoButton_tooltip%"), w = zn(n, "%redoButton_tooltip%");
  return /* @__PURE__ */ u(ya, { children: [
    /* @__PURE__ */ a(Mt, { children: /* @__PURE__ */ u(_t, { children: [
      /* @__PURE__ */ a(Nt, { asChild: !0, children: /* @__PURE__ */ a(
        J,
        {
          "aria-label": d,
          className: i,
          size: "icon",
          onClick: t,
          disabled: !r,
          variant: c,
          children: /* @__PURE__ */ a(Zs, {})
        }
      ) }),
      /* @__PURE__ */ a(Ct, { children: /* @__PURE__ */ u("p", { children: [
        d,
        s && /* @__PURE__ */ u(wt, { children: [
          " ",
          /* @__PURE__ */ a(eo, { children: l ? "⌘Z" : "Ctrl+Z" })
        ] })
      ] }) })
    ] }) }),
    e && (c === "secondary" || c === "default") && /* @__PURE__ */ a(bo, {}),
    e && /* @__PURE__ */ a(Mt, { children: /* @__PURE__ */ u(_t, { children: [
      /* @__PURE__ */ a(Nt, { asChild: !0, children: /* @__PURE__ */ a(
        J,
        {
          "aria-label": w,
          className: i,
          size: "icon",
          onClick: e,
          disabled: !o,
          variant: c,
          children: /* @__PURE__ */ a(Qs, {})
        }
      ) }),
      /* @__PURE__ */ a(Ct, { children: /* @__PURE__ */ u("p", { children: [
        w,
        s && /* @__PURE__ */ u(wt, { children: [
          " ",
          /* @__PURE__ */ a(eo, { children: l ? "⌘⇧Z" : "Ctrl+Y" })
        ] })
      ] }) })
    ] }) })
  ] });
}
function Jw({
  children: t,
  editorRef: e,
  canUndo: r = !0,
  canRedo: o = !0
}) {
  const n = U(null);
  return Y(() => {
    var l;
    const s = yo(), i = ((l = n.current) == null ? void 0 : l.querySelector(".editor-input")) ?? void 0, c = (d) => {
      var p, h, g, f;
      if (!i || document.activeElement !== i) return;
      const w = d.key.toLowerCase();
      if (s) {
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
const Zw = (t, e, r) => t === "generated" ? /* @__PURE__ */ u(wt, { children: [
  /* @__PURE__ */ a("p", { children: "+" }),
  " ",
  e["%footnoteEditor_callerDropdown_item_generated%"]
] }) : t === "hidden" ? /* @__PURE__ */ u(wt, { children: [
  /* @__PURE__ */ a("p", { children: "-" }),
  " ",
  e["%footnoteEditor_callerDropdown_item_hidden%"]
] }) : /* @__PURE__ */ u(wt, { children: [
  /* @__PURE__ */ a("p", { children: r }),
  " ",
  e["%footnoteEditor_callerDropdown_item_custom%"]
] });
function Qw({
  callerType: t,
  customCaller: e,
  updateCaller: r,
  localizedStrings: o
}) {
  const n = U(null), s = U(null), i = U(!1), [c, l] = N(t), [d, w] = N(e), [p, h] = N(!1), g = U(!1), f = U(c);
  f.current = c;
  const y = U(d);
  y.current = d, Y(() => {
    l(t);
  }, [t]), Y(() => {
    d !== e && w(e);
  }, [e]);
  const b = (k) => {
    if (i.current = !1, h(k), !k) {
      const E = f.current, C = y.current;
      E !== "custom" || C ? (E !== t || C !== e) && r(E, C) : (l(t), w(e));
    }
  }, R = (k) => {
    var E, C, I, T;
    k.stopPropagation(), document.activeElement === s.current && k.key === "ArrowDown" || k.key === "ArrowRight" ? ((E = n.current) == null || E.focus(), i.current = !0) : document.activeElement === n.current && k.key === "ArrowUp" ? ((C = s.current) == null || C.focus(), i.current = !1) : document.activeElement === n.current && k.key === "ArrowLeft" && ((I = n.current) == null ? void 0 : I.selectionStart) === 0 && ((T = s.current) == null || T.focus(), i.current = !1), c === "custom" && k.key === "Enter" && (document.activeElement === s.current || document.activeElement === n.current) && b(!1);
  };
  return /* @__PURE__ */ u(Me, { open: p, onOpenChange: b, children: [
    /* @__PURE__ */ a(Mt, { children: /* @__PURE__ */ u(_t, { children: [
      /* @__PURE__ */ a(Nt, { asChild: !0, children: /* @__PURE__ */ a(be, { asChild: !0, children: /* @__PURE__ */ a(J, { variant: "outline", className: "tw:h-6", children: Zw(t, o, e) }) }) }),
      /* @__PURE__ */ a(Ct, { children: o["%footnoteEditor_callerDropdown_tooltip%"] })
    ] }) }),
    /* @__PURE__ */ u(
      ze,
      {
        style: { zIndex: Un },
        onClick: () => {
          i.current && (i.current = !1);
        },
        onKeyDown: R,
        onMouseMove: () => {
          var k;
          i.current && ((k = n.current) == null || k.focus());
        },
        children: [
          /* @__PURE__ */ a(br, { children: o["%footnoteEditor_callerDropdown_label%"] }),
          /* @__PURE__ */ a(Je, {}),
          /* @__PURE__ */ a(
            Le,
            {
              checked: c === "generated",
              onCheckedChange: () => l("generated"),
              children: /* @__PURE__ */ u("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ a("span", { children: o["%footnoteEditor_callerDropdown_item_generated%"] }),
                /* @__PURE__ */ a("span", { className: "tw:w-10 tw:text-center", children: io })
              ] })
            }
          ),
          /* @__PURE__ */ a(
            Le,
            {
              checked: c === "hidden",
              onCheckedChange: () => l("hidden"),
              children: /* @__PURE__ */ u("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ a("span", { children: o["%footnoteEditor_callerDropdown_item_hidden%"] }),
                /* @__PURE__ */ a("span", { className: "tw:w-10 tw:text-center", children: so })
              ] })
            }
          ),
          /* @__PURE__ */ a(
            Le,
            {
              ref: s,
              checked: c === "custom",
              onCheckedChange: () => l("custom"),
              onPointerDown: () => {
                g.current = c === "custom";
              },
              onClick: (k) => {
                var E;
                if (k.stopPropagation(), g.current && k.target !== n.current) {
                  b(!1);
                  return;
                }
                i.current = !0, (E = n.current) == null || E.focus();
              },
              onSelect: (k) => k.preventDefault(),
              children: /* @__PURE__ */ u("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ a("span", { children: o["%footnoteEditor_callerDropdown_item_custom%"] }),
                /* @__PURE__ */ a(
                  _a,
                  {
                    tabIndex: 0,
                    onMouseDown: (k) => {
                      k.stopPropagation(), l("custom"), i.current = !0;
                    },
                    ref: n,
                    className: "tw:h-auto tw:w-10 tw:p-0 tw:text-center",
                    value: d,
                    onKeyDown: (k) => {
                      k.key === "Enter" || k.key === "ArrowUp" || k.key === "ArrowDown" || k.key === "ArrowLeft" || k.key === "ArrowRight" || k.stopPropagation();
                    },
                    maxLength: 1,
                    onChange: (k) => w(k.target.value)
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
const tu = (t, e) => t === "f" ? /* @__PURE__ */ u(wt, { children: [
  /* @__PURE__ */ a(Qn, {}),
  " ",
  e["%footnoteEditor_noteType_footnote_label%"]
] }) : t === "fe" ? /* @__PURE__ */ u(wt, { children: [
  /* @__PURE__ */ a(ti, {}),
  " ",
  e["%footnoteEditor_noteType_endNote_label%"]
] }) : /* @__PURE__ */ u(wt, { children: [
  /* @__PURE__ */ a(Zn, {}),
  " ",
  e["%footnoteEditor_noteType_crossReference_label%"]
] }), eu = (t, e) => {
  if (t === "x")
    return e["%footnoteEditor_noteType_crossReference_label%"];
  let r = e["%footnoteEditor_noteType_endNote_label%"];
  return t === "f" && (r = e["%footnoteEditor_noteType_footnote_label%"]), Ve(e["%footnoteEditor_noteType_tooltip%"] ?? "", {
    noteType: r
  });
};
function ru({
  noteType: t,
  handleNoteTypeChange: e,
  localizedStrings: r,
  isTypeSwitchable: o
}) {
  return /* @__PURE__ */ u(Me, { children: [
    /* @__PURE__ */ a(Mt, { children: /* @__PURE__ */ u(_t, { children: [
      /* @__PURE__ */ a(Nt, { asChild: !0, children: /* @__PURE__ */ a(be, { asChild: !0, children: /* @__PURE__ */ a(J, { variant: "outline", className: "tw:h-6", children: tu(t, r) }) }) }),
      /* @__PURE__ */ a(Ct, { children: /* @__PURE__ */ a("p", { children: eu(t, r) }) })
    ] }) }),
    /* @__PURE__ */ u(ze, { style: { zIndex: Un }, children: [
      /* @__PURE__ */ a(br, { children: r["%footnoteEditor_noteTypeDropdown_label%"] }),
      /* @__PURE__ */ a(Je, {}),
      /* @__PURE__ */ u(
        Le,
        {
          disabled: t !== "x" && !o,
          checked: t === "x",
          onCheckedChange: () => e("x"),
          className: "tw:gap-2",
          children: [
            /* @__PURE__ */ a(Zn, {}),
            /* @__PURE__ */ a("span", { children: r["%footnoteEditor_noteType_crossReference_label%"] })
          ]
        }
      ),
      /* @__PURE__ */ u(
        Le,
        {
          disabled: t === "x" && !o,
          checked: t === "f",
          onCheckedChange: () => e("f"),
          className: "tw:gap-2",
          children: [
            /* @__PURE__ */ a(Qn, {}),
            /* @__PURE__ */ a("span", { children: r["%footnoteEditor_noteType_footnote_label%"] })
          ]
        }
      ),
      /* @__PURE__ */ u(
        Le,
        {
          disabled: t === "x" && !o,
          checked: t === "fe",
          onCheckedChange: () => e("fe"),
          className: "tw:gap-2",
          children: [
            /* @__PURE__ */ a(ti, {}),
            /* @__PURE__ */ a("span", { children: r["%footnoteEditor_noteType_endNote_label%"] })
          ]
        }
      )
    ] })
  ] });
}
const au = Object.freeze([
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
function ou({ icon: t, className: e }) {
  return /* @__PURE__ */ a(t ?? tc, { className: e, size: 16 });
}
function nu({ state: t }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "marker-selection-state",
      className: "tw:flex tw:w-4 tw:min-w-4 tw:items-center tw:justify-center",
      children: t !== "none" && /* @__PURE__ */ a(Be, { size: 16 })
    }
  );
}
function On({
  item: t,
  localizedStrings: e
}) {
  return /* @__PURE__ */ u(
    Ue,
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
        t.selectionState !== void 0 && /* @__PURE__ */ a(nu, { state: t.selectionState }),
        /* @__PURE__ */ a("div", { className: "tw:w-8 tw:min-w-8", children: t.marker ? (
          // Monospace: a USFM marker is a code, not prose, and should read as one. Deliberately
          // inherits the row's own foreground rather than taking a marker-specific colour.
          /* @__PURE__ */ a("span", { className: "tw:font-mono tw:text-xs", children: t.marker })
        ) : /* @__PURE__ */ a("div", { children: /* @__PURE__ */ a(ou, { icon: t.icon }) }) }),
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
        (t.isDisallowed || t.isDeprecated) && /* @__PURE__ */ a(bs, { className: "tw:font-sans", children: t.isDisallowed ? e["%markerMenu_disallowed_label%"] : e["%markerMenu_deprecated_label%"] })
      ]
    }
  );
}
function iu({
  localizedStrings: t,
  markerMenuItems: e,
  searchRef: r,
  searchPlaceholder: o
}) {
  const [n, s] = N(""), [i, c] = V(() => {
    const l = vs(n.trim().toLowerCase());
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
  return /* @__PURE__ */ u(er, { className: "tw:p-1", shouldFilter: !1, loop: !0, children: [
    /* @__PURE__ */ a(
      xa,
      {
        className: "marker-menu-search",
        ref: r,
        value: n,
        onValueChange: (l) => s(l),
        placeholder: o ?? t["%markerMenu_searchPlaceholder%"],
        spaceSelectsHighlightedItem: !0
      }
    ),
    /* @__PURE__ */ u(rr, { children: [
      /* @__PURE__ */ a(ka, { children: t["%markerMenu_noResults%"] }),
      /* @__PURE__ */ a(je, { children: i.map((l) => {
        var d;
        return /* @__PURE__ */ a(
          On,
          {
            item: l,
            localizedStrings: t
          },
          `item-${l.marker ?? ((d = l.icon) == null ? void 0 : d.displayName)}-${l.title.replaceAll(" ", "")}`
        );
      }) }),
      c.length > 0 && /* @__PURE__ */ u(wt, { children: [
        i.length > 0 && /* @__PURE__ */ a(Kn, { alwaysRender: !0 }),
        /* @__PURE__ */ a(je, { children: c.map((l) => {
          var d;
          return /* @__PURE__ */ a(
            On,
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
function su(t, e, r, o) {
  if (!o || o === "p") return [];
  const n = ra[o];
  if (!(n != null && n.children)) return [];
  const s = [];
  return Object.entries(n.children).forEach(([, i]) => {
    s.push(
      ...i.map((c) => ({
        marker: c,
        title: r[ra[c].description] ?? ra[c].description,
        action: () => {
          var l;
          (l = t.current) == null || l.insertMarker(c), e();
        }
      }))
    );
  }), s.sort((i, c) => (i.marker ?? i.title).localeCompare(c.marker ?? c.title));
}
function cu(t) {
  return {
    id: t.marker,
    label: t.marker,
    description: t.description,
    badge: t.kind === "closeTag" ? "%markerMenu_endTag_label%" : void 0,
    muted: !t.isBasic
  };
}
function lu(t) {
  var r;
  const e = (r = t.attributes) == null ? void 0 : r.char;
  e != null && e.style && (e.style === "ft" && (e.style = "xt"), e.style === "fr" && (e.style = "xo"), e.style === "fq" && (e.style = "xq"));
}
function du(t) {
  var r;
  const e = (r = t.attributes) == null ? void 0 : r.char;
  e != null && e.style && (e.style === "xt" && (e.style = "ft"), e.style === "xo" && (e.style = "fr"), e.style === "xq" && (e.style = "fq"));
}
const wu = {
  type: "USJ",
  version: "3.1",
  content: [
    {
      type: "para"
    }
  ]
};
function fh({
  classNameForEditor: t,
  noteOps: e,
  onChange: r,
  onClose: o,
  scrRef: n,
  noteKey: s,
  editorOptions: i,
  defaultMarkerMenuTrigger: c,
  localizedStrings: l,
  parentEditorRef: d,
  markerPalette: w,
  onNoteEdit: p
}) {
  var Ce;
  const h = U(null), g = U(null), f = U(null), y = U(null);
  Xt(() => {
    if (!y.current) return;
    const { width: S } = y.current.getBoundingClientRect();
    S > 0 && (y.current.style.width = `${S}px`);
  }, []);
  const [b, R] = N("generated"), [k, E] = N("generated"), [C, I] = N("*"), [T, j] = N("*"), [A, M] = N("f"), [P, W] = N(!1), [B, Q] = N(!0), [$, et] = N(!1), _ = U(!1), z = U(""), [G, nt] = N(!1), [ot, pt] = N(), [ct, Z] = N(), [it, gt] = N(), [ft, mt] = N(), Zt = U(null), vt = U(
    void 0
  ), Qt = U(0), zt = U(void 0), bt = V(
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
        ...i.view ?? Al(),
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
  ), Ft = V(
    () => su(
      h,
      () => nt(!1),
      l,
      ft
    ),
    [l, ft]
  );
  Y(() => {
    var S;
    G || (S = h.current) == null || S.focus();
  }, [A, G]);
  const Ot = F(() => {
    var x, H, O;
    const S = (x = g.current) == null ? void 0 : x.querySelector(".editor-input"), K = S == null ? void 0 : S.querySelector("span.note"), X = (O = (H = g.current) == null ? void 0 : H.ownerDocument.getSelection()) == null ? void 0 : O.anchorNode;
    return !!K && !!X && K.contains(X);
  }, []);
  Y(() => {
    var H, O;
    let S, K, X;
    _.current = !1, zt.current = void 0, Q(!0);
    const x = e == null ? void 0 : e.at(0);
    if (x && Cr("note", x)) {
      const rt = (H = x.insert.note) == null ? void 0 : H.caller;
      let dt = "custom";
      rt === io ? dt = "generated" : rt === so ? dt = "hidden" : rt && (I(rt), j(rt)), R(dt), E(dt), M(((O = x.insert.note) == null ? void 0 : O.style) ?? "f"), S = setTimeout(() => {
        var ht, kt, Tt;
        (ht = h.current) == null || ht.applyUpdate([x]), (kt = h.current) == null || kt.selectNote(0), (Tt = h.current) == null || Tt.focus(), K = requestAnimationFrame(() => {
          X = setTimeout(() => {
            var Pt, ae;
            Ot() || ((Pt = h.current) == null || Pt.selectNote(0), (ae = h.current) == null || ae.focus());
          }, 0);
        });
      }, 0);
    }
    return () => {
      S && clearTimeout(S), K !== void 0 && cancelAnimationFrame(K), X !== void 0 && clearTimeout(X);
    };
  }, [e, s, Ot]);
  const Ut = F(
    (S = !1) => {
      var X, x, H;
      p == null || p();
      const K = (x = (X = h.current) == null ? void 0 : X.getNoteOps(0)) == null ? void 0 : x.at(0);
      K && Cr("note", K) && (r == null || r([K]), S && d && s && ((H = d.current) == null || H.replaceEmbedUpdate(s, [K])));
    },
    [s, r, p, d]
  ), lt = F(
    (S, K) => {
      var H, O, rt;
      const X = (O = (H = h.current) == null ? void 0 : H.getNoteOps(0)) == null ? void 0 : O.at(0);
      if (!X || !Cr("note", X) || !X.insert.note) return;
      let x;
      S === "custom" ? x = K : S === "generated" ? x = io : x = so, X.insert.note.caller !== x && (X.insert.note.caller = x, (rt = h.current) == null || rt.applyUpdate([X, { delete: 1 }]));
    },
    []
  ), Et = F(() => {
    var S;
    vt.current || (S = h.current) == null || S.commitPendingMarkerEdits(), Ut(!0), o();
  }, [o, Ut]), jt = U(Et);
  Xt(() => {
    jt.current = Et;
  });
  const le = U({ book: n.book, chapterNum: n.chapterNum });
  Xt(() => {
    (le.current.book !== n.book || le.current.chapterNum !== n.chapterNum) && (le.current = { book: n.book, chapterNum: n.chapterNum }, jt.current());
  }, [n.book, n.chapterNum]);
  const de = () => {
    var K;
    const S = (K = g.current) == null ? void 0 : K.getElementsByClassName("editor-input")[0];
    S != null && S.textContent && navigator.clipboard.writeText(S.textContent);
  }, Kt = F(
    (S, K) => {
      p == null || p(), R(S), I(K), lt(S, K);
    },
    [lt, p]
  ), He = (S) => {
    var X, x, H, O, rt;
    M(S);
    const K = (x = (X = h.current) == null ? void 0 : X.getNoteOps(0)) == null ? void 0 : x.at(0);
    if (K && Cr("note", K)) {
      K.insert.note && (K.insert.note.style = S);
      const dt = (O = (H = K.insert.note) == null ? void 0 : H.contents) == null ? void 0 : O.ops;
      A !== "x" && S === "x" ? dt == null || dt.forEach((ht) => lu(ht)) : A === "x" && S !== "x" && (dt == null || dt.forEach((ht) => du(ht))), (rt = h.current) == null || rt.applyUpdate([K, { delete: 1 }]);
    }
  }, Ht = (S) => {
    mt(S.contextMarker), et(S.canRedo);
  }, ne = F(
    (S) => {
      var X, x, H, O, rt;
      const K = (x = (X = h.current) == null ? void 0 : X.getNoteOps(0)) == null ? void 0 : x.at(0);
      if (K && Cr("note", K)) {
        S.content.length > 1 && setTimeout(() => {
          var kt;
          (kt = h.current) == null || kt.applyUpdate([{ retain: 2 }, { delete: 1 }]);
        }, 0);
        const dt = (H = K.insert.note) == null ? void 0 : H.style, ht = (rt = (O = K.insert.note) == null ? void 0 : O.contents) == null ? void 0 : rt.ops;
        if (dt || W(!1), W(
          dt === "x" ? !!(ht != null && ht.every((kt) => {
            var Pt, ae;
            if (!((Pt = kt.attributes) != null && Pt.char)) return !0;
            const Tt = ((ae = kt.attributes) == null ? void 0 : ae.char).style;
            return Tt === "xt" || Tt === "xo" || Tt === "xq";
          })) : !!(ht != null && ht.every((kt) => {
            var Pt, ae;
            if (!((Pt = kt.attributes) != null && Pt.char)) return !0;
            const Tt = ((ae = kt.attributes) == null ? void 0 : ae.char).style;
            return Tt === "ft" || Tt === "fr" || Tt === "fq";
          }))
        ), !_.current) {
          _.current = !0, z.current = JSON.stringify(K), Q(!0);
          return;
        }
        Q(JSON.stringify(K) === z.current), Ut();
      } else
        W(!1), Q(!0);
    },
    [Ut]
  ), te = F(() => {
    const S = window.getSelection();
    if (f.current && Ft.length && S && S.rangeCount > 0) {
      const K = S.getRangeAt(0).getBoundingClientRect(), X = f.current.getBoundingClientRect();
      pt(K.left - X.left), Z(K.top - X.top), gt(K.height), nt(!0);
    }
  }, [Ft, f]), D = U(() => {
  }), yt = F(
    (S, K, X) => {
      const { anchorRect: x } = S;
      if (!w || !x) return;
      const { passive: H } = X;
      xs({
        items: K,
        passive: H,
        // No `shouldSpaceCommit`, deliberately: the Space note-marker exception exists for
        // Standard-view BODY text, where a materialized `\f ` literal absorbs the following word
        // as the new footnote's caller. This palette offers note-INTERNAL markers for content
        // already inside a note, so Space keeps its plain typed-literal commit here.
        sessionCounterRef: Qt,
        setSession: (O) => {
          vt.current = O;
        },
        clearSessionIfCurrent: (O) => Yo(vt, O),
        // Through the ref so the palette always runs the CURRENT handler — the callback is
        // captured once, at show time, while the session it drives is replaced on every reopen.
        runSessionKey: (O) => D.current(O),
        show: (O) => w.show(
          K.map(cu),
          x,
          H,
          O
        ),
        restoreSelectionIfLost: () => {
          var O, rt, dt;
          if (!((O = h.current) != null && O.getSelection())) {
            const ht = zt.current;
            ht ? (rt = h.current) == null || rt.setSelection(ht) : (dt = h.current) == null || dt.selectNote(0);
          }
        },
        focusEditor: () => {
          var O;
          return (O = h.current) == null ? void 0 : O.focus();
        },
        applyItem: (O) => {
          var rt;
          return (rt = h.current) == null ? void 0 : rt.applyMarkerMenuSelection(O, {
            trigger: "backslash",
            // ACTIVE palette: the trigger was claimed and never landed, so there is never a
            // literal prefix for the apply to clean up.
            literalPrefixLanded: !1
          });
        },
        onShowError: (O) => {
          (!vc(O) || O.code !== bc) && console.warn(
            `FootnoteEditor: the marker palette did not open: ${xc(O)}`
          );
        }
      });
    },
    [w]
  ), qt = F(() => {
    var X;
    const S = (X = h.current) == null ? void 0 : X.getMarkerMenuContext();
    if (!S) return !1;
    const K = Vl(bt.styleInfo ?? Ll, S);
    return K.length === 0 ? !1 : (yt(S, K, { passive: !S.hasTextSelection }), !0);
  }, [yt, bt.styleInfo]), It = F(
    (S) => {
      const K = vt.current;
      if (!K || !w) return;
      ys(S, K, {
        // Overlay ops delegate to the host-supplied driver; the commit ops are EDITOR-side
        // applies this popover owns (it holds the editor ref). The table calls `dismiss()` right
        // after each, resolving the show promise `undefined` — which the openMarkerPalette
        // `.then` treats as a dismissal, so nothing double-applies.
        update: (x) => w.update(x),
        commit: () => w.commit(),
        dismiss: () => w.dismiss(),
        commitTyped: (x) => {
          var H;
          return (H = h.current) == null ? void 0 : H.commitTypedMarker(x);
        },
        commitTypedAndReopen: (x) => {
          var H;
          (H = h.current) == null || H.commitTypedMarker(x, { trailingSpace: !1 }), qt();
        },
        commitTypedCloser: (x) => {
          var H;
          return (H = h.current) == null ? void 0 : H.commitTypedCloser(x);
        },
        commitItem: (x) => {
          var O;
          const H = K.items.find((rt) => rt.marker === x);
          H && ((O = h.current) == null || O.applyMarkerMenuSelection(H, {
            trigger: "backslash",
            literalPrefixLanded: !1
          }));
        }
      }) === "ended" && Yo(vt, K.token);
    },
    [w, qt]
  );
  Y(() => {
    D.current = It;
  }, [It]), Y(() => {
    const S = (K) => {
      var H, O;
      const X = (H = g.current) == null ? void 0 : H.querySelector(".editor-input");
      if (!X || K.target !== X) return;
      const x = (O = h.current) == null ? void 0 : O.getSelection();
      x && (zt.current = x);
    };
    return document.addEventListener("focusout", S), () => document.removeEventListener("focusout", S);
  }, []), Y(() => {
    const S = () => {
      G && nt(!1);
    };
    return window.addEventListener("click", S), () => {
      window.removeEventListener("click", S);
    };
  }, [G]), Y(() => {
    var S;
    G && ((S = Zt.current) == null || S.focus());
  }, [G]), Y(() => {
    var X;
    const S = () => {
      var x;
      return ((x = g.current) == null ? void 0 : x.querySelector(".editor-input")) ?? void 0;
    };
    if (((X = bt.view) == null ? void 0 : X.markerMode) === "editable") {
      const x = (O) => {
        var ht, kt, Tt, Pt;
        if (_s(O)) return;
        const rt = S();
        if (!rt || document.activeElement !== rt) return;
        if (vt.current && w) {
          D.current(O);
          return;
        }
        if (O.key === "Enter" && !Ot()) {
          O.preventDefault(), O.stopPropagation(), (ht = h.current) == null || ht.selectNote(0), (kt = h.current) == null || kt.focus();
          return;
        }
        if (w && O.key === c) {
          if (!Ot()) {
            O.preventDefault(), O.stopPropagation(), (Tt = h.current) == null || Tt.selectNote(0), (Pt = h.current) == null || Pt.focus();
            return;
          }
          qt() && (O.preventDefault(), O.stopPropagation());
        }
      }, H = () => {
        var rt, dt;
        const O = S();
        !O || document.activeElement !== O || Ot() || ((rt = h.current) == null || rt.selectNote(0), (dt = h.current) == null || dt.focus());
      };
      return document.addEventListener("keydown", x, { capture: !0 }), document.addEventListener("paste", H, { capture: !0 }), () => {
        document.removeEventListener("keydown", x, { capture: !0 }), document.removeEventListener("paste", H, { capture: !0 });
      };
    }
    const K = (x) => {
      const H = S();
      !G && H && document.activeElement === H && x.key === c ? (x.preventDefault(), te()) : G && x.key === "Escape" && (x.preventDefault(), nt(!1));
    };
    return document.addEventListener("keydown", K), () => {
      document.removeEventListener("keydown", K);
    };
  }, [
    G,
    te,
    c,
    (Ce = bt.view) == null ? void 0 : Ce.markerMode,
    bt.styleInfo,
    w,
    qt,
    Ot
  ]), Y(() => {
    const S = () => {
      var x, H, O;
      const K = ((x = g.current) == null ? void 0 : x.querySelector(".editor-input")) ?? void 0;
      if (!K || document.activeElement !== K) return;
      const X = document.getSelection();
      X && !X.isCollapsed || Ot() || ((H = h.current) == null || H.selectNote(0), (O = h.current) == null || O.focus());
    };
    return document.addEventListener("pointerup", S), document.addEventListener("selectionchange", S), () => {
      document.removeEventListener("pointerup", S), document.removeEventListener("selectionchange", S);
    };
  }, [Ot]);
  const re = l["%footnoteEditor_copyButton_tooltip%"];
  return /* @__PURE__ */ u(wt, { children: [
    /* @__PURE__ */ u("div", { ref: y, className: "footnote-editor tw:grid tw:gap-[12px]", children: [
      /* @__PURE__ */ u("div", { className: "tw:flex", children: [
        /* @__PURE__ */ u("div", { className: "tw:flex tw:gap-4", children: [
          /* @__PURE__ */ a(
            ru,
            {
              isTypeSwitchable: P,
              noteType: A,
              handleNoteTypeChange: He,
              localizedStrings: l
            }
          ),
          /* @__PURE__ */ a(
            Qw,
            {
              callerType: b,
              customCaller: C,
              updateCaller: Kt,
              localizedStrings: l
            }
          )
        ] }),
        /* @__PURE__ */ a("div", { className: "tw:flex tw:w-full tw:justify-end", children: /* @__PURE__ */ u(ya, { children: [
          /* @__PURE__ */ a(
            Xw,
            {
              onUndoClick: () => {
                var S;
                return (S = h.current) == null ? void 0 : S.undo();
              },
              onRedoClick: () => {
                var S;
                return (S = h.current) == null ? void 0 : S.redo();
              },
              canUndo: !B,
              canRedo: $,
              localizedStrings: l
            }
          ),
          /* @__PURE__ */ a(
            Ki,
            {
              onCancelClick: o,
              onAcceptClick: Et,
              canAccept: !B || k !== b || b === "custom" && C !== T,
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
              Jw,
              {
                editorRef: h,
                canUndo: !B,
                canRedo: $,
                children: /* @__PURE__ */ a(
                  jl,
                  {
                    options: bt,
                    onStateChange: Ht,
                    onUsjChange: ne,
                    defaultUsj: wu,
                    onScrRefChange: () => {
                    },
                    scrRef: n,
                    ref: h
                  }
                )
              }
            ) }),
            /* @__PURE__ */ a("div", { className: "tw:absolute tw:bottom-0 tw:right-0", children: /* @__PURE__ */ a(Mt, { children: /* @__PURE__ */ u(_t, { children: [
              /* @__PURE__ */ a(Nt, { asChild: !0, children: /* @__PURE__ */ a(
                J,
                {
                  "aria-label": re,
                  onClick: de,
                  className: "tw:h-6 tw:w-6",
                  variant: "ghost",
                  size: "icon",
                  children: /* @__PURE__ */ a(Jn, {})
                }
              ) }),
              /* @__PURE__ */ a(Ct, { children: /* @__PURE__ */ a("p", { children: re }) })
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
    /* @__PURE__ */ u(Qe, { open: G, children: [
      /* @__PURE__ */ a(
        ks,
        {
          className: "tw:absolute",
          style: {
            top: ct,
            left: ot,
            height: it,
            width: 0,
            pointerEvents: "none"
          }
        }
      ),
      /* @__PURE__ */ a(
        tr,
        {
          className: "tw:w-[500px] tw:p-0",
          onClick: (S) => {
            S.preventDefault(), S.stopPropagation();
          },
          children: /* @__PURE__ */ a(
            iu,
            {
              markerMenuItems: Ft,
              localizedStrings: l,
              searchRef: Zt
            }
          )
        }
      )
    ] })
  ] });
}
const mh = Object.freeze([
  ...au,
  ...Object.entries(ra).map(([, t]) => t.description).filter((t) => !!t),
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
  ...Ww,
  ...Ui
]);
function uu(t, e, r = !0, o = void 0) {
  if (!e || e.length === 0) return;
  const n = [], s = [];
  let i = [];
  return e.forEach((c) => {
    typeof c != "string" && c.marker === "fp" ? (i.length > 0 && s.push(i), i = [c]) : i.push(c);
  }), i.length > 0 && s.push(i), s.map((c, l) => {
    const d = l === s.length - 1;
    return (
      // A footnote's paragraphs have no stable id, and keying on their CONTENT is what produced
      // duplicate keys (two `\fp` paragraphs collide). This list is a read-only projection
      // re-rendered wholesale and never reordered, so the identity the rule protects cannot be
      // lost here. See the note above.
      // eslint-disable-next-line react/no-array-index-key
      /* @__PURE__ */ u("p", { children: [
        Ko(t, c, r, !0, n),
        d && o
      ] }, `para-${l}`)
    );
  });
}
function Ko(t, e, r = !0, o = !0, n = []) {
  if (!(!e || e.length === 0))
    return e.map((s, i) => {
      const c = `part-${i}`;
      if (typeof s == "string") {
        if (o) {
          const l = m(`usfm_${t}`);
          return /* @__PURE__ */ a("span", { className: l, children: s }, c);
        }
        return /* @__PURE__ */ u(
          "span",
          {
            className: "tw:inline-flex tw:items-center tw:gap-1 tw:underline tw:decoration-destructive",
            children: [
              /* @__PURE__ */ a(ro, { className: "tw:h-4 tw:w-4 tw:fill-destructive" }),
              /* @__PURE__ */ a("span", { children: s }),
              /* @__PURE__ */ a(ro, { className: "tw:h-4 tw:w-4 tw:fill-destructive" })
            ]
          },
          c
        );
      }
      return pu(s, c, r, [
        ...n,
        t ?? "unknown"
      ]);
    });
}
function pu(t, e, r, o = []) {
  const { marker: n } = t;
  return /* @__PURE__ */ u("span", { children: [
    n ? r && /* @__PURE__ */ a("span", { className: "marker", children: `\\${n} ` }) : /* @__PURE__ */ a(
      ro,
      {
        className: "tw:text-error tw:mr-1 tw:inline-block tw:h-4 tw:w-4",
        "aria-label": "Missing marker"
      }
    ),
    Ko(n, t.content, r, !0, [
      ...o,
      n ?? "unknown"
    ])
  ] }, e);
}
function hu({
  footnote: t,
  layout: e = "horizontal",
  formatCaller: r,
  showMarkers: o = !0
}) {
  const n = r ? r(t.caller) : t.caller, s = n !== t.caller;
  let i, c = t.content;
  Array.isArray(t.content) && t.content.length > 0 && typeof t.content[0] != "string" && (t.content[0].marker === "fr" || t.content[0].marker === "xo") && ([i, ...c] = t.content);
  const l = o ? /* @__PURE__ */ a("span", { className: "marker", children: `\\${t.marker}` }) : void 0, d = o ? /* @__PURE__ */ a("span", { className: "marker", children: ` \\${t.marker}*` }) : void 0, w = n && // USFM does not specify a marker for caller, so instead of a usfm_* class, we use a
  // specific class name in case styling is needed.
  /* @__PURE__ */ a("span", { className: m("note-caller tw:inline-block", { formatted: s }), children: n }), p = t.category && /* @__PURE__ */ u("span", { className: "note-category tw:inline-block", children: [
    o && /* @__PURE__ */ a("span", { className: "marker", children: "\\cat " }),
    t.category,
    o && /* @__PURE__ */ a("span", { className: "marker", children: "\\cat*" })
  ] }), h = i && /* @__PURE__ */ u(wt, { children: [
    Ko(t.marker, [i], o, !1),
    " "
  ] }), g = !!l, f = !!w, y = !!p, b = e === "horizontal" ? "horizontal" : "vertical", R = o ? "marker-visible" : "", k = e === "horizontal" ? "tw:col-span-1" : "tw:col-span-2 tw:col-start-1 tw:row-start-2", E = m(b, R);
  return /* @__PURE__ */ u(wt, { children: [
    /* @__PURE__ */ u("div", { className: m("textual-note-header tw:col-span-1 tw:w-fit tw:text-nowrap", E), children: [
      l,
      g && (f || y) && " ",
      w,
      f && y && " ",
      p
    ] }),
    /* @__PURE__ */ a("div", { className: m("textual-note-header tw:col-span-1 tw:w-fit tw:text-nowrap", E), children: h }),
    /* @__PURE__ */ a(
      "div",
      {
        className: m(
          "textual-note-body tw:flex tw:flex-col tw:gap-1",
          k,
          E
        ),
        children: c && c.length > 0 && /* @__PURE__ */ a(wt, { children: uu(t.marker, c, o, d) })
      }
    )
  ] });
}
function vh({
  className: t,
  classNameForItems: e,
  footnotes: r,
  layout: o = "horizontal",
  listId: n,
  selectedFootnote: s,
  selectionRequest: i,
  showMarkers: c = !0,
  suppressFormatting: l = !1,
  formatCaller: d,
  onFootnoteSelected: w
}) {
  const p = d ?? yc(r, void 0), h = (C, I) => {
    w == null || w(C, I, n);
  }, g = s ? r.findIndex((C) => C === s) : -1, [f, y] = N(g), b = (C, I, T) => {
    if (r.length)
      switch (C.key) {
        case "Enter":
        case " ":
          C.preventDefault(), w == null || w(I, T, n);
          break;
      }
  }, R = (C) => {
    if (r.length)
      switch (C.key) {
        case "ArrowDown":
          C.preventDefault(), y((I) => Math.min(I + 1, r.length - 1));
          break;
        case "ArrowUp":
          C.preventDefault(), y((I) => Math.max(I - 1, 0));
          break;
      }
  }, k = U([]);
  Y(() => {
    var C;
    f >= 0 && f < k.current.length && ((C = k.current[f]) == null || C.focus());
  }, [f]);
  const E = s ? r.findIndex((C) => C === s) : -1;
  return Y(() => {
    var C;
    E < 0 || E >= k.current.length || (C = k.current[E]) == null || C.scrollIntoView({ block: "nearest" });
  }, [E, i]), /* @__PURE__ */ a(
    "div",
    {
      role: "listbox",
      "aria-label": "Footnotes",
      tabIndex: f < 0 ? 0 : -1,
      className: m("tw:h-full tw:overflow-y-auto", t),
      onKeyDown: R,
      children: /* @__PURE__ */ a(
        "ul",
        {
          className: m(
            "tw:p-0.5 tw:pt-1",
            "tw:grid",
            o === "horizontal" ? "tw:grid-cols-[min-content_min-content_1fr]" : "tw:grid-cols-[min-content_1fr]",
            !l && "formatted-font"
          ),
          children: r.map((C, I) => {
            const T = C === s, j = `${n}-${I}`;
            return (
              // The key belongs on the outermost node returned from the map — the Fragment — not on
              // the `<li>` nested inside it, which leaves the Fragment itself unkeyed.
              /* @__PURE__ */ u(Wt.Fragment, { children: [
                /* @__PURE__ */ a(
                  "li",
                  {
                    ref: (A) => {
                      k.current[I] = A;
                    },
                    role: "option",
                    "aria-selected": T,
                    "data-marker": C.marker,
                    "data-state": T ? "selected" : void 0,
                    tabIndex: I === f ? 0 : -1,
                    className: m(
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
                    onClick: () => h(C, I),
                    onKeyDown: (A) => b(A, C, I),
                    children: /* @__PURE__ */ a(
                      hu,
                      {
                        footnote: C,
                        layout: o,
                        formatCaller: () => p(C.caller, I),
                        showMarkers: c
                      }
                    )
                  }
                ),
                I < r.length - 1 && o === "vertical" && /* @__PURE__ */ a(Or, { tabIndex: -1, className: "tw:col-span-2" })
              ] }, j)
            );
          })
        }
      )
    }
  );
}
function gu(t) {
  const e = [];
  let r = 0;
  const o = /\\\\(.+?)\\\\/g;
  let n;
  for (; (n = o.exec(t)) !== null; )
    n.index > r && e.push(t.substring(r, n.index)), e.push(/* @__PURE__ */ a("strong", { children: n[1] }, n.index)), r = o.lastIndex;
  return r < t.length && e.push(t.substring(r)), e.length > 0 ? e : [t];
}
function fu({
  occurrenceData: t,
  setScriptureReference: e,
  localizedStrings: r,
  classNameForText: o
}) {
  const n = r["%webView_inventory_occurrences_table_header_reference%"], s = r["%webView_inventory_occurrences_table_header_occurrence%"], i = V(() => {
    const c = [], l = /* @__PURE__ */ new Set();
    return t.forEach((d) => {
      const w = `${d.reference.book}:${d.reference.chapterNum}:${d.reference.verseNum}:${d.text}`;
      l.has(w) || (l.add(w), c.push(d));
    }), c;
  }, [t]);
  return /* @__PURE__ */ u(ko, { stickyHeader: !0, children: [
    /* @__PURE__ */ a(_o, { stickyHeader: !0, children: /* @__PURE__ */ u(Ae, { children: [
      /* @__PURE__ */ a(ua, { children: n }),
      /* @__PURE__ */ a(ua, { children: s })
    ] }) }),
    /* @__PURE__ */ a(No, { children: i.length > 0 && i.map((c) => /* @__PURE__ */ u(
      Ae,
      {
        onClick: () => {
          e(c.reference);
        },
        children: [
          /* @__PURE__ */ a(wr, { children: Se(c.reference, "English") }),
          /* @__PURE__ */ a(wr, { className: o, children: gu(c.text) })
        ]
      },
      `${c.reference.book} ${c.reference.chapterNum}:${c.reference.verseNum}-${c.text}`
    )) })
  ] });
}
function Xi({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    sn.Root,
    {
      "data-slot": "checkbox",
      className: m(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:peer tw:relative tw:flex tw:size-4 tw:shrink-0 tw:items-center tw:justify-center tw:rounded-[4px] tw:border tw:border-input tw:transition-colors tw:outline-none tw:group-has-disabled/field:opacity-50 tw:after:absolute tw:after:-inset-x-3 tw:after:-inset-y-2 tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:aria-invalid:aria-checked:border-primary tw:dark:bg-input/30 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40 tw:data-checked:border-primary tw:data-checked:bg-primary tw:data-checked:text-primary-foreground tw:dark:data-checked:bg-primary",
        t
      ),
      ...e,
      children: /* @__PURE__ */ a(
        sn.Indicator,
        {
          "data-slot": "checkbox-indicator",
          className: "tw:grid tw:place-content-center tw:text-current tw:transition-none tw:[&>svg]:size-3.5",
          children: /* @__PURE__ */ a(Ca, {})
        }
      )
    }
  );
}
const mu = (t) => {
  if (t === "asc")
    return /* @__PURE__ */ a(oc, { className: "tw:h-4 tw:w-4" });
  if (t === "desc")
    return /* @__PURE__ */ a(nc, { className: "tw:h-4 tw:w-4" });
}, Ta = (t, e, r) => /* @__PURE__ */ a(Mt, { children: /* @__PURE__ */ u(_t, { children: [
  /* @__PURE__ */ u(
    Nt,
    {
      className: m("tw:flex tw:w-full tw:justify-start", r),
      variant: "ghost",
      onClick: () => t.toggleSorting(void 0),
      children: [
        /* @__PURE__ */ a("span", { className: "tw:w-6 tw:max-w-fit tw:flex-1 tw:overflow-hidden tw:text-ellipsis", children: e }),
        mu(t.getIsSorted())
      ]
    }
  ),
  /* @__PURE__ */ a(Ct, { side: "bottom", children: e })
] }) }), bh = (t) => ({
  accessorKey: "item",
  accessorFn: (e) => e.items[0],
  header: ({ column: e }) => Ta(e, t)
}), vu = (t, e) => ({
  accessorKey: `item${e}`,
  accessorFn: (r) => r.items[e],
  header: ({ column: r }) => Ta(r, t)
}), xh = (t) => ({
  accessorKey: "count",
  header: ({ column: e }) => Ta(e, t, "tw:justify-end"),
  cell: ({ row: e }) => /* @__PURE__ */ a("div", { className: "tw:flex tw:justify-end tw:tabular-nums", children: e.getValue("count") })
}), Wa = (t, e, r, o, n, s) => {
  let i = [...r];
  t.forEach((l) => {
    e === "approved" ? i.includes(l) || i.push(l) : i = i.filter((d) => d !== l);
  }), o(i);
  let c = [...n];
  t.forEach((l) => {
    e === "unapproved" ? c.includes(l) || c.push(l) : c = c.filter((d) => d !== l);
  }), s(c);
}, yh = (t, e, r, o, n) => ({
  accessorKey: "status",
  header: ({ column: s }) => Ta(s, t, "tw:justify-center"),
  cell: ({ row: s }) => {
    const i = s.getValue("status"), c = s.getValue("item");
    return (
      // Center the status buttons in the cell to match the centered status column header (the
      // ToggleGroup would otherwise sit left-aligned).
      /* @__PURE__ */ a("div", { className: "tw:flex tw:justify-center", children: /* @__PURE__ */ u(Bn, { value: i, variant: "outline", type: "single", className: "tw:gap-0", children: [
        /* @__PURE__ */ a(
          ta,
          {
            onClick: (l) => {
              l.stopPropagation(), Wa(
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
            children: /* @__PURE__ */ a(ec, {})
          }
        ),
        /* @__PURE__ */ a(
          ta,
          {
            onClick: (l) => {
              l.stopPropagation(), Wa(
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
            children: /* @__PURE__ */ a(rc, {})
          }
        ),
        /* @__PURE__ */ a(
          ta,
          {
            onClick: (l) => {
              l.stopPropagation(), Wa(
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
            children: /* @__PURE__ */ a(ac, {})
          }
        )
      ] }) })
    );
  }
}), kh = (t) => t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g), _h = (t) => {
  const e = /^\\[vc]\s+(\d+)/, r = t.match(e);
  if (r)
    return +r[1];
}, Nh = (t) => {
  const e = t.match(/^\\id\s+([A-Za-z]+)/);
  return e ? e[1] : "";
}, bu = (t, e, r) => r.includes(t) ? "unapproved" : e.includes(t) ? "approved" : "unknown", Ch = Object.freeze([
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
]), xu = (t, e, r) => {
  let o = t;
  return e !== "all" && (o = o.filter(
    (n) => e === "approved" && n.status === "approved" || e === "unapproved" && n.status === "unapproved" || e === "unknown" && n.status === "unknown"
  )), r !== "" && (o = o.filter((n) => n.items[0].includes(r))), o;
}, yu = (t, e, r) => t.map((o) => {
  const n = Qo(o.key) ? o.key : o.key[0];
  return {
    items: Qo(o.key) ? [o.key] : o.key,
    count: o.count,
    status: o.status || bu(n, e, r),
    occurrences: o.occurrences || []
  };
}), me = (t, e) => t[e] ?? e;
function Eh({
  inventoryItems: t,
  setVerseRef: e,
  localizedStrings: r,
  additionalItemsLabels: o,
  approvedItems: n,
  unapprovedItems: s,
  scope: i,
  onScopeChange: c,
  columns: l,
  id: d,
  areInventoryItemsLoading: w = !1,
  classNameForVerseText: p,
  onItemSelected: h
}) {
  const g = me(r, "%webView_inventory_all%"), f = me(r, "%webView_inventory_approved%"), y = me(r, "%webView_inventory_unapproved%"), b = me(r, "%webView_inventory_unknown%"), R = me(r, "%webView_inventory_scope_currentBook%"), k = me(r, "%webView_inventory_scope_chapter%"), E = me(r, "%webView_inventory_scope_verse%"), C = me(r, "%webView_inventory_filter_text%"), I = me(
    r,
    "%webView_inventory_show_additional_items%"
  ), T = me(r, "%webView_inventory_no_results%"), [j, A] = N(!1), [M, P] = N("all"), [W, B] = N(""), [Q, $] = N([]), et = V(() => {
    const Z = t ?? [];
    return Z.length === 0 ? [] : yu(Z, n, s);
  }, [t, n, s]), _ = V(() => {
    if (j) return et;
    const Z = [];
    return et.forEach((it) => {
      const gt = it.items[0], ft = Z.find(
        (mt) => mt.items[0] === gt
      );
      ft ? (ft.count += it.count, ft.occurrences = ft.occurrences.concat(it.occurrences)) : Z.push({
        items: [gt],
        count: it.count,
        occurrences: it.occurrences,
        status: it.status
      });
    }), Z;
  }, [j, et]), z = V(() => _.length === 0 ? [] : xu(_, M, W), [_, M, W]), G = V(() => {
    var gt, ft;
    if (!j) return l;
    const Z = (gt = o == null ? void 0 : o.tableHeaders) == null ? void 0 : gt.length;
    if (!Z) return l;
    const it = [];
    for (let mt = 0; mt < Z; mt++)
      it.push(
        vu(
          ((ft = o == null ? void 0 : o.tableHeaders) == null ? void 0 : ft[mt]) || "Additional Item",
          mt + 1
        )
      );
    return [...it, ...l];
  }, [o == null ? void 0 : o.tableHeaders, l, j]);
  Y(() => {
    z.length === 0 ? $([]) : z.length === 1 && $(z[0].items);
  }, [z]);
  const nt = (Z, it) => {
    it.setRowSelection(() => {
      const ft = {};
      return ft[Z.index] = !0, ft;
    });
    const gt = Z.original.items;
    $(gt), h && gt.length > 0 && h(gt[0]);
  }, ot = (Z) => {
    if (Z === "book" || Z === "chapter" || Z === "verse")
      c(Z);
    else
      throw new Error(`Invalid scope value: ${Z}`);
  }, pt = (Z) => {
    if (Z === "all" || Z === "approved" || Z === "unapproved" || Z === "unknown")
      P(Z);
    else
      throw new Error(`Invalid status filter value: ${Z}`);
  }, ct = V(() => {
    if (_.length === 0 || Q.length === 0) return [];
    const Z = _.filter((it) => kc(
      j ? it.items : [it.items[0]],
      Q
    ));
    if (Z.length > 1) throw new Error("Selected item is not unique");
    return Z.length === 0 ? [] : Z[0].occurrences;
  }, [Q, j, _]);
  return /* @__PURE__ */ a("div", { id: d, className: "pr-twp tw:h-full tw:overflow-auto", children: /* @__PURE__ */ u("div", { className: "tw:flex tw:h-full tw:w-full tw:min-w-min tw:flex-col", children: [
    /* @__PURE__ */ u("div", { className: "tw:flex tw:items-stretch", style: { contain: "inline-size" }, children: [
      /* @__PURE__ */ u(
        gr,
        {
          onValueChange: (Z) => pt(Z),
          defaultValue: M,
          children: [
            /* @__PURE__ */ a(mr, { className: "tw:m-1 tw:w-auto tw:flex-1", children: /* @__PURE__ */ a(fr, { placeholder: "Select filter" }) }),
            /* @__PURE__ */ u(vr, { children: [
              /* @__PURE__ */ a(pe, { value: "all", children: g }),
              /* @__PURE__ */ a(pe, { value: "approved", children: f }),
              /* @__PURE__ */ a(pe, { value: "unapproved", children: y }),
              /* @__PURE__ */ a(pe, { value: "unknown", children: b })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ u(gr, { onValueChange: (Z) => ot(Z), defaultValue: i, children: [
        /* @__PURE__ */ a(mr, { className: "tw:m-1 tw:w-auto tw:flex-1", children: /* @__PURE__ */ a(fr, { placeholder: "Select scope" }) }),
        /* @__PURE__ */ u(vr, { children: [
          /* @__PURE__ */ a(pe, { value: "book", children: R }),
          /* @__PURE__ */ a(pe, { value: "chapter", children: k }),
          /* @__PURE__ */ a(pe, { value: "verse", children: E })
        ] })
      ] }),
      /* @__PURE__ */ a(
        _a,
        {
          className: "tw:m-1 tw:flex-1 tw:rounded-md tw:border",
          placeholder: C,
          value: W,
          onChange: (Z) => {
            B(Z.target.value);
          }
        }
      ),
      o && /* @__PURE__ */ a(Mt, { children: /* @__PURE__ */ u(_t, { children: [
        /* @__PURE__ */ a(Nt, { asChild: !0, children: /* @__PURE__ */ u("div", { className: "tw:m-1 tw:flex tw:w-fit tw:min-w-[26px] tw:items-center tw:rounded-md tw:border", children: [
          /* @__PURE__ */ a(
            Xi,
            {
              className: "tw:m-1 tw:shrink-0",
              checked: j,
              onCheckedChange: (Z) => {
                A(Z);
              }
            }
          ),
          /* @__PURE__ */ a(Dt, { className: "tw:m-1 tw:truncate", children: (o == null ? void 0 : o.checkboxText) ?? I })
        ] }) }),
        /* @__PURE__ */ a(Ct, { children: (o == null ? void 0 : o.checkboxText) ?? I })
      ] }) })
    ] }),
    /* @__PURE__ */ a("div", { className: "tw:m-1 tw:flex-1 tw:overflow-auto tw:rounded-md tw:border", children: /* @__PURE__ */ a(
      Kw,
      {
        columns: G,
        data: z,
        onRowClickHandler: nt,
        stickyHeader: !0,
        isLoading: w,
        noResultsMessage: T
      }
    ) }),
    ct.length > 0 && /* @__PURE__ */ a("div", { className: "tw:m-1 tw:flex-1 tw:overflow-auto tw:rounded-md tw:border", children: /* @__PURE__ */ a(
      fu,
      {
        classNameForText: p,
        occurrenceData: ct,
        setScriptureReference: e,
        localizedStrings: r
      }
    ) })
  ] }) });
}
const ku = "16rem", _u = "3rem", Ji = Wt.createContext(void 0);
function Sa() {
  const t = Wt.useContext(Ji);
  if (!t)
    throw new Error("useSidebar must be used within a SidebarProvider.");
  return t;
}
function Nu({
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
  const [l, d] = Wt.useState(t), w = e ?? l, p = Wt.useCallback(
    (E) => {
      const C = typeof E == "function" ? E(w) : E;
      r ? r(C) : d(C);
    },
    [r, w]
  ), h = Wt.useCallback(() => p((E) => !E), [p]), g = w ? "expanded" : "collapsed", b = ke() === "ltr" ? i : i === "primary" ? "secondary" : "primary", R = Wt.useMemo(
    () => ({
      state: g,
      open: w,
      setOpen: p,
      toggleSidebar: h,
      // CUSTOM: Passes direction-aware side into context so SidebarTrigger icon and Sidebar
      // positioning both respond correctly in RTL layouts
      side: b
    }),
    [g, w, p, h, b]
  ), k = {
    "--sidebar-width": ku,
    "--sidebar-width-icon": _u,
    ...n
  };
  return /* @__PURE__ */ a(Ji.Provider, { value: R, children: /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "sidebar-wrapper",
      style: k,
      className: m(
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
function Cu({
  // CUSTOM: Removed 'side' prop from Sidebar - it is now read from context (moved to SidebarProvider)
  variant: t = "sidebar",
  collapsible: e = "offcanvas",
  className: r,
  children: o,
  ...n
}) {
  const s = Sa();
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
            "data-side": s.side,
            className: m(
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
function Th({ className: t, onClick: e, ...r }) {
  const { toggleSidebar: o, side: n } = Sa();
  return /* @__PURE__ */ u(
    J,
    {
      "data-sidebar": "trigger",
      "data-slot": "sidebar-trigger",
      variant: "ghost",
      size: "icon-sm",
      className: m(t),
      onClick: (s) => {
        e == null || e(s), o();
      },
      ...r,
      children: [
        n === "primary" ? /* @__PURE__ */ a(Dc, {}) : /* @__PURE__ */ a(Mc, {}),
        /* @__PURE__ */ a("span", { className: "tw:sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
}
function Sh({ className: t, ...e }) {
  const { toggleSidebar: r } = Sa();
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
function Eu({ className: t, ...e }) {
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
function Rh({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    _a,
    {
      "data-slot": "sidebar-input",
      "data-sidebar": "input",
      className: m("tw:h-8 tw:w-full tw:bg-background tw:shadow-none", t),
      ...e
    }
  );
}
function Dh({ className: t, ...e }) {
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
function Mh({ className: t, ...e }) {
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
function zh({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    Or,
    {
      "data-slot": "sidebar-separator",
      "data-sidebar": "separator",
      className: m("tw:mx-2 tw:w-auto tw:bg-sidebar-border", t),
      ...e
    }
  );
}
function Tu({ className: t, ...e }) {
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
function In({ className: t, ...e }) {
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
function Pn({
  className: t,
  asChild: e = !1,
  ...r
}) {
  const o = e ? Lr.Root : "div";
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
function Oh({
  className: t,
  asChild: e = !1,
  ...r
}) {
  const o = e ? Lr.Root : "button";
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
function $n({ className: t, ...e }) {
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
function Su({ className: t, ...e }) {
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
function Ru({ className: t, ...e }) {
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
const Du = Io(
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
function Mu({
  asChild: t = !1,
  isActive: e = !1,
  variant: r = "default",
  size: o = "default",
  tooltip: n,
  className: s,
  ...i
}) {
  const c = t ? Lr.Root : "button", { state: l } = Sa(), d = /* @__PURE__ */ a(
    c,
    {
      "data-slot": "sidebar-menu-button",
      "data-sidebar": "menu-button",
      "data-size": o,
      "data-active": e,
      className: m(Du({ variant: r, size: o }), s),
      ...i
    }
  );
  return n ? /* @__PURE__ */ u(_t, { children: [
    /* @__PURE__ */ a(Nt, { asChild: !0, children: d }),
    /* @__PURE__ */ a(
      Ct,
      {
        side: "right",
        align: "center",
        hidden: l !== "collapsed",
        ...typeof n == "string" ? { children: n } : n
      }
    )
  ] }) : d;
}
function Ih({
  className: t,
  asChild: e = !1,
  showOnHover: r = !1,
  ...o
}) {
  const n = e ? Lr.Root : "button";
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
function Ph({ className: t, ...e }) {
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
function $h({
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
      className: m("tw:flex tw:h-8 tw:items-center tw:gap-2 tw:rounded-md tw:px-2", t),
      ...r,
      children: [
        e && /* @__PURE__ */ a(dr, { className: "tw:size-4 tw:rounded-md", "data-sidebar": "menu-skeleton-icon" }),
        /* @__PURE__ */ a(
          dr,
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
function Ah({ className: t, ...e }) {
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
function Vh({ className: t, ...e }) {
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
function Lh({
  asChild: t = !1,
  size: e = "md",
  isActive: r = !1,
  className: o,
  ...n
}) {
  const s = t ? Lr.Root : "a";
  return /* @__PURE__ */ a(
    s,
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
function zu({
  id: t,
  extensionLabels: e,
  projectInfo: r,
  handleSelectSidebarItem: o,
  selectedSidebarItem: n,
  extensionsSidebarGroupLabel: s,
  projectsSidebarGroupLabel: i,
  buttonPlaceholderText: c,
  className: l
}) {
  const d = F(
    (g, f) => {
      o(g, f);
    },
    [o]
  ), w = F(
    (g) => {
      const f = r.find((y) => y.projectId === g);
      return f ? f.projectName : g;
    },
    [r]
  ), p = V(
    () => r.map((g) => ({
      id: g.projectId,
      shortName: g.projectName,
      fullName: g.projectName
    })),
    [r]
  ), h = F(
    (g) => !n.projectId && g === n.label,
    [n]
  );
  return /* @__PURE__ */ a(
    Cu,
    {
      id: t,
      collapsible: "none",
      variant: "inset",
      className: m("tw:w-96 tw:gap-2 tw:overflow-y-auto", l),
      children: /* @__PURE__ */ u(Tu, { children: [
        /* @__PURE__ */ u(In, { children: [
          /* @__PURE__ */ a(Pn, { className: "tw:text-sm", children: s }),
          /* @__PURE__ */ a($n, { children: /* @__PURE__ */ a(Su, { children: Object.entries(e).map(([g, f]) => /* @__PURE__ */ a(Ru, { children: /* @__PURE__ */ a(
            Mu,
            {
              onClick: () => d(g),
              isActive: h(g),
              children: /* @__PURE__ */ a("span", { className: "tw:pl-3", children: f })
            }
          ) }, g)) }) })
        ] }),
        /* @__PURE__ */ u(In, { children: [
          /* @__PURE__ */ a(Pn, { className: "tw:text-sm", children: i }),
          /* @__PURE__ */ a($n, { className: "tw:pl-3", children: /* @__PURE__ */ u(
            "div",
            {
              className: m(
                "tw:flex tw:w-full tw:items-center tw:gap-2 tw:rounded-md tw:px-2 tw:py-1",
                {
                  "tw:bg-sidebar-accent tw:text-sidebar-accent-foreground": n == null ? void 0 : n.projectId
                }
              ),
              children: [
                /* @__PURE__ */ a(ic, { className: "tw:h-4 tw:w-4 tw:shrink-0" }),
                /* @__PURE__ */ a(
                  Ns,
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
                    ariaLabel: i,
                    popoverContentStyle: { zIndex: Cs }
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
function jh({
  id: t,
  extensionLabels: e,
  projectInfo: r,
  children: o,
  handleSelectSidebarItem: n,
  selectedSidebarItem: s,
  searchValue: i,
  onSearch: c,
  extensionsSidebarGroupLabel: l,
  projectsSidebarGroupLabel: d,
  buttonPlaceholderText: w
}) {
  return /* @__PURE__ */ u("div", { className: "tw:box-border tw:flex tw:h-full tw:flex-col", children: [
    /* @__PURE__ */ a("div", { className: "tw:box-border tw:flex tw:items-center tw:justify-center tw:py-4", children: /* @__PURE__ */ a(
      Hn,
      {
        className: "tw:w-9/12",
        value: i,
        onSearch: c,
        placeholder: "Search app settings, extension settings, and project settings"
      }
    ) }),
    /* @__PURE__ */ u(
      Nu,
      {
        id: t,
        className: "tw:h-full tw:flex-1 tw:gap-4 tw:overflow-auto tw:border-t",
        children: [
          /* @__PURE__ */ a(
            zu,
            {
              className: "tw:w-1/2 tw:min-w-[140px] tw:max-w-[220px] tw:border-e",
              extensionLabels: e,
              projectInfo: r,
              handleSelectSidebarItem: n,
              selectedSidebarItem: s,
              extensionsSidebarGroupLabel: l,
              projectsSidebarGroupLabel: d,
              buttonPlaceholderText: w
            }
          ),
          /* @__PURE__ */ a(Eu, { className: "tw:min-w-[215px]", children: o })
        ]
      }
    )
  ] });
}
const Ie = "scrBook", Ou = "scrRef", Xe = "source", Iu = "details", Pu = "Scripture Reference", $u = "Scripture Book", Zi = "Type", Au = "Details";
function Vu(t, e) {
  const r = e ?? !1;
  return [
    {
      accessorFn: (o) => `${o.start.book} ${o.start.chapterNum}:${o.start.verseNum}`,
      id: Ie,
      header: (t == null ? void 0 : t.scriptureReferenceColumnName) ?? Pu,
      cell: (o) => {
        const n = o.row.original;
        return o.row.getIsGrouped() ? Vt.bookIdToEnglishName(n.start.book) : o.row.groupingColumnId === Ie ? Se(n.start) : void 0;
      },
      getGroupingValue: (o) => Vt.bookIdToNumber(o.start.book),
      sortingFn: (o, n) => pa(o.original.start, n.original.start),
      enableGrouping: !0
    },
    {
      accessorFn: (o) => Se(o.start),
      id: Ou,
      header: void 0,
      cell: (o) => {
        const n = o.row.original;
        return o.row.getIsGrouped() ? void 0 : Se(n.start);
      },
      sortingFn: (o, n) => pa(o.original.start, n.original.start),
      enableGrouping: !1
    },
    {
      accessorFn: (o) => o.source.displayName,
      id: Xe,
      header: r ? (t == null ? void 0 : t.typeColumnName) ?? Zi : void 0,
      cell: (o) => r || o.row.getIsGrouped() ? o.getValue() : void 0,
      getGroupingValue: (o) => o.source.id,
      sortingFn: (o, n) => o.original.source.displayName.localeCompare(n.original.source.displayName),
      enableGrouping: !0
    },
    {
      accessorFn: (o) => o.detail,
      id: Iu,
      header: (t == null ? void 0 : t.detailsColumnName) ?? Au,
      cell: (o) => o.getValue(),
      enableGrouping: !1
    }
  ];
}
const Lu = (t) => {
  if (!("offset" in t.start))
    throw new Error("No offset available in range start");
  if (t.end && !("offset" in t.end))
    throw new Error("No offset available in range end");
  const { offset: e } = t.start;
  let r = 0;
  return t.end && ({ offset: r } = t.end), !t.end || pa(t.start, t.end) === 0 ? `${Aa(t.start)}+${e}` : `${Aa(t.start)}+${e}-${Aa(t.end)}+${r}`;
}, An = (t) => `${Lu({ start: t.start, end: t.end })} ${t.source.displayName} ${t.detail}`;
function Bh({
  sources: t,
  showColumnHeaders: e = !1,
  showSourceColumn: r = !1,
  scriptureReferenceColumnName: o,
  scriptureBookGroupName: n,
  typeColumnName: s,
  detailsColumnName: i,
  onRowSelected: c,
  id: l
}) {
  const [d, w] = N([]), [p, h] = N([{ id: Ie, desc: !1 }]), [g, f] = N({}), y = V(
    () => t.flatMap((M) => M.data.map((P) => ({
      ...P,
      source: M.source
    }))),
    [t]
  ), b = V(
    () => Vu(
      {
        scriptureReferenceColumnName: o,
        typeColumnName: s,
        detailsColumnName: i
      },
      r
    ),
    [o, s, i, r]
  );
  Y(() => {
    d.includes(Xe) ? h([
      { id: Xe, desc: !1 },
      { id: Ie, desc: !1 }
    ]) : h([{ id: Ie, desc: !1 }]);
  }, [d]);
  const R = mi({
    data: y,
    columns: b,
    state: {
      grouping: d,
      sorting: p,
      rowSelection: g
    },
    onGroupingChange: w,
    onSortingChange: h,
    onRowSelectionChange: f,
    getExpandedRowModel: Pl(),
    getGroupedRowModel: Il(),
    getCoreRowModel: bi(),
    getSortedRowModel: vi(),
    getRowId: An,
    autoResetExpanded: !1,
    enableMultiRowSelection: !1,
    enableSubRowSelection: !1
  });
  Y(() => {
    if (c) {
      const M = R.getSelectedRowModel().rowsById, P = Object.keys(M);
      if (P.length === 1) {
        const W = y.find((B) => An(B) === P[0]) || void 0;
        W && c(W);
      }
    }
  }, [g, y, c, R]);
  const k = n ?? $u, E = s ?? Zi, C = [
    { label: "No Grouping", value: [] },
    { label: `Group by ${k}`, value: [Ie] },
    { label: `Group by ${E}`, value: [Xe] },
    {
      label: `Group by ${k} and ${E}`,
      value: [Ie, Xe]
    },
    {
      label: `Group by ${E} and ${k}`,
      value: [Xe, Ie]
    }
  ], I = (M) => {
    w(JSON.parse(M));
  }, T = (M, P) => {
    !M.getIsGrouped() && !M.getIsSelected() && M.getToggleSelectedHandler()(P);
  }, j = (M, P) => M.getIsGrouped() ? "" : m("banded-row", P % 2 === 0 ? "even" : "odd"), A = (M, P, W) => {
    if (!((M == null ? void 0 : M.length) === 0 || P.depth < W.column.getGroupedIndex())) {
      if (P.getIsGrouped())
        switch (P.depth) {
          case 1:
            return "tw:ps-4";
          default:
            return;
        }
      switch (P.depth) {
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
      gr,
      {
        value: JSON.stringify(d),
        onValueChange: (M) => {
          I(M);
        },
        children: [
          /* @__PURE__ */ a(mr, { className: "tw:mb-1 tw:mt-2", children: /* @__PURE__ */ a(fr, {}) }),
          /* @__PURE__ */ a(vr, { position: "item-aligned", children: /* @__PURE__ */ a(jw, { children: C.map((M) => /* @__PURE__ */ a(pe, { value: JSON.stringify(M.value), children: M.label }, M.label)) }) })
        ]
      }
    ),
    /* @__PURE__ */ u(ko, { className: "tw:relative tw:flex tw:flex-col tw:overflow-y-auto tw:p-0", children: [
      e && /* @__PURE__ */ a(_o, { children: R.getHeaderGroups().map((M) => /* @__PURE__ */ a(Ae, { children: M.headers.filter((P) => P.column.columnDef.header).map((P) => (
        /* For sticky column headers to work, we probably need to change the default definition of the shadcn Table component. See https://github.com/shadcn-ui/ui/issues/1151 */
        /* @__PURE__ */ a(ua, { colSpan: P.colSpan, className: "tw:sticky top-0", children: P.isPlaceholder ? void 0 : /* @__PURE__ */ u("div", { children: [
          P.column.getCanGroup() ? /* @__PURE__ */ a(
            J,
            {
              variant: "ghost",
              title: `Toggle grouping by ${P.column.columnDef.header}`,
              onClick: P.column.getToggleGroupingHandler(),
              type: "button",
              children: P.column.getIsGrouped() ? "🛑" : "👊 "
            }
          ) : void 0,
          " ",
          Dr(P.column.columnDef.header, P.getContext())
        ] }) }, P.id)
      )) }, M.id)) }),
      /* @__PURE__ */ a(No, { children: R.getRowModel().rows.map((M, P) => {
        const W = ke();
        return /* @__PURE__ */ a(
          Ae,
          {
            "data-state": M.getIsSelected() ? "selected" : "",
            className: m(j(M, P)),
            onClick: (B) => T(M, B),
            children: M.getVisibleCells().map((B) => {
              if (!(B.getIsPlaceholder() || B.column.columnDef.enableGrouping && !B.getIsGrouped() && (B.column.columnDef.id !== Xe || !r)))
                return /* @__PURE__ */ a(
                  wr,
                  {
                    className: m(
                      B.column.columnDef.id,
                      "tw:p-[1px]",
                      A(d, M, B)
                    ),
                    children: B.getIsGrouped() ? /* @__PURE__ */ u(
                      J,
                      {
                        variant: "link",
                        onClick: M.getToggleExpandedHandler(),
                        type: "button",
                        children: [
                          M.getIsExpanded() && /* @__PURE__ */ a(Ze, {}),
                          !M.getIsExpanded() && (W === "ltr" ? /* @__PURE__ */ a(sc, {}) : /* @__PURE__ */ a(cc, {})),
                          " ",
                          Dr(B.column.columnDef.cell, B.getContext()),
                          " (",
                          M.subRows.length,
                          ")"
                        ]
                      }
                    ) : Dr(B.column.columnDef.cell, B.getContext())
                  },
                  B.id
                );
            })
          },
          M.id
        );
      }) })
    ] })
  ] });
}
function ju({
  availableBookInfo: t,
  selectedBookIds: e,
  onChangeSelectedBookIds: r,
  localizedStrings: o,
  localizedBookNames: n,
  disabledSectionExplanations: s
}) {
  const i = o["%webView_book_selector_books_selected%"], c = o["%webView_book_selector_select_books%"], l = o["%webView_book_selector_search_books%"], d = o["%webView_book_selector_select_all%"], w = o["%webView_book_selector_clear_all%"], p = o["%webView_book_selector_no_book_found%"], { otLong: h, ntLong: g, dcLong: f, extraLong: y } = {
    otLong: o == null ? void 0 : o["%scripture_section_ot_long%"],
    ntLong: o == null ? void 0 : o["%scripture_section_nt_long%"],
    dcLong: o == null ? void 0 : o["%scripture_section_dc_long%"],
    extraLong: o == null ? void 0 : o["%scripture_section_extra_long%"]
  }, [b, R] = N(!1), [k, E] = N(""), C = U(void 0), I = U(!1), T = V(
    () => qn(t),
    [t]
  ), j = V(() => {
    if (!k.trim()) {
      const _ = {
        [Rt.OT]: [],
        [Rt.NT]: [],
        [Rt.DC]: [],
        [Rt.Extra]: []
      };
      return T.forEach((z) => {
        const G = ea(z);
        _[G].push(z);
      }), _;
    }
    const $ = T.filter(
      (_) => vo(_, k, n)
    ), et = {
      [Rt.OT]: [],
      [Rt.NT]: [],
      [Rt.DC]: [],
      [Rt.Extra]: []
    };
    return $.forEach((_) => {
      const z = ea(_);
      et[z].push(_);
    }), et;
  }, [T, k, n]), A = F(
    ($, et = !1) => {
      if (!et || !C.current) {
        r(
          e.includes($) ? e.filter((pt) => pt !== $) : [...e, $]
        ), C.current = $;
        return;
      }
      const _ = T.findIndex((pt) => pt === C.current), z = T.findIndex((pt) => pt === $);
      if (_ === -1 || z === -1) return;
      const [G, nt] = [
        Math.min(_, z),
        Math.max(_, z)
      ], ot = T.slice(G, nt + 1).map((pt) => pt);
      r(
        e.includes($) ? e.filter((pt) => !ot.includes(pt)) : [.../* @__PURE__ */ new Set([...e, ...ot])]
      );
    },
    [e, r, T]
  ), M = ($) => {
    A($, I.current), I.current = !1;
  }, P = ($, et) => {
    $.preventDefault(), A(et, $.shiftKey);
  }, W = () => {
    r(T.map(($) => $));
  }, B = () => {
    r([]);
  }, Q = V(
    () => Object.values(Rt).filter(
      ($) => (s == null ? void 0 : s[$]) !== void 0 && Co(T, $).length === 0
    ).map(($) => ({ section: $, explanation: s == null ? void 0 : s[$] })),
    [s, T]
  );
  return /* @__PURE__ */ u(
    Qe,
    {
      open: b,
      onOpenChange: ($) => {
        R($), $ || E("");
      },
      children: [
        /* @__PURE__ */ a(xr, { asChild: !0, children: /* @__PURE__ */ u(
          J,
          {
            variant: "outline",
            role: "combobox",
            "aria-expanded": b,
            className: "tw:max-w-64 tw:justify-between",
            children: [
              e.length > 0 ? `${i}: ${e.length}` : c,
              /* @__PURE__ */ a(lc, { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
            ]
          }
        ) }),
        /* @__PURE__ */ a(
          tr,
          {
            className: "tw:max-h-(--radix-popover-content-available-height) tw:w-[500px] tw:max-w-[calc(100vw-2rem)] tw:p-0",
            align: "start",
            collisionPadding: 8,
            children: /* @__PURE__ */ u(
              er,
              {
                className: "tw:min-h-0",
                shouldFilter: !1,
                onKeyDown: ($) => {
                  $.key === "Enter" && (I.current = $.shiftKey);
                },
                children: [
                  /* @__PURE__ */ a(
                    xa,
                    {
                      className: "tw:shrink-0",
                      placeholder: l,
                      value: k,
                      onValueChange: E,
                      spaceSelectsHighlightedItem: !0
                    }
                  ),
                  /* @__PURE__ */ u("div", { className: "tw:flex tw:shrink-0 tw:justify-between tw:border-b tw:p-2", children: [
                    /* @__PURE__ */ a(
                      J,
                      {
                        variant: "ghost",
                        size: "sm",
                        onClick: W,
                        disabled: T.length === 0,
                        children: d
                      }
                    ),
                    /* @__PURE__ */ a(J, { variant: "ghost", size: "sm", onClick: B, children: w })
                  ] }),
                  /* @__PURE__ */ u(rr, { className: "tw:max-h-72 tw:min-h-0 tw:flex-1", children: [
                    /* @__PURE__ */ a(ka, { children: p }),
                    Object.values(Rt).filter(($) => j[$].length > 0).map(($, et) => {
                      const _ = j[$];
                      return /* @__PURE__ */ u(Ar, { children: [
                        et > 0 && /* @__PURE__ */ a(Kn, { alwaysRender: !0 }),
                        /* @__PURE__ */ a(
                          je,
                          {
                            heading: jn($, h, g, f, y),
                            children: _.map((z) => /* @__PURE__ */ a(
                              xi,
                              {
                                bookId: z,
                                isSelected: e.includes(z),
                                onSelect: () => M(z),
                                onMouseDown: (G) => P(G, z),
                                section: ea(z),
                                showCheck: !0,
                                localizedBookNames: n,
                                commandValue: lo(z, n),
                                className: "tw:flex tw:items-center"
                              },
                              z
                            ))
                          }
                        )
                      ] }, $);
                    })
                  ] }),
                  Q.length > 0 && /* @__PURE__ */ a("div", { className: "tw:shrink-0 tw:border-t tw:p-2", children: Q.map(({ section: $, explanation: et }) => /* @__PURE__ */ a("p", { className: "tw:text-xs tw:text-muted-foreground", children: et }, $)) })
                ]
              }
            )
          }
        )
      ]
    }
  );
}
function Bu({
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
function Fu({
  disabled: t,
  tooltipText: e,
  children: r,
  className: o
}) {
  return /* @__PURE__ */ a(Mt, { children: /* @__PURE__ */ u(_t, { children: [
    /* @__PURE__ */ a(Nt, { asChild: !0, children: /* @__PURE__ */ a(
      Bu,
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
function Uu({
  section: t,
  availableBookIds: e,
  selectedBookIds: r,
  onToggle: o,
  localizedStrings: n,
  disabledExplanation: s
}) {
  const i = Co(e, t).length === 0, c = n["%scripture_section_ot_short%"], l = n["%scripture_section_nt_short%"], d = n["%scripture_section_dc_short%"], w = n["%scripture_section_extra_short%"], p = /* @__PURE__ */ a(
    J,
    {
      variant: "outline",
      size: "sm",
      onClick: () => o(t),
      className: m(
        Gn(e, t, r) && !i && "tw:bg-primary tw:text-primary-foreground tw:hover:bg-primary/70 tw:hover:text-primary-foreground"
      ),
      disabled: i,
      children: Es(
        t,
        c,
        l,
        d,
        w
      )
    }
  );
  return s ? /* @__PURE__ */ a(
    Fu,
    {
      className: "tw:flex",
      disabled: i,
      tooltipText: s,
      children: p
    }
  ) : p;
}
const Vn = 5, Xa = 6;
function Ku({
  availableBookInfo: t,
  selectedBookIds: e,
  onChangeSelectedBookIds: r,
  localizedStrings: o,
  localizedBookNames: n,
  disabledSectionExplanations: s
}) {
  const i = o["%webView_book_selector_more%"], c = V(
    () => qn(t),
    [t]
  ), l = F(
    (d) => {
      const w = Co(c, d).map((p) => p);
      r(
        Gn(c, d, e) ? e.filter((p) => !w.includes(p)) : [.../* @__PURE__ */ new Set([...e, ...w])]
      );
    },
    [e, r, c]
  );
  return /* @__PURE__ */ u("div", { className: "tw:space-y-2", children: [
    /* @__PURE__ */ a("div", { className: "tw:flex tw:flex-wrap tw:gap-2", children: Object.values(Rt).map((d) => /* @__PURE__ */ a(
      Uu,
      {
        section: d,
        availableBookIds: c,
        selectedBookIds: e,
        onToggle: l,
        localizedStrings: o,
        disabledExplanation: s == null ? void 0 : s[d]
      },
      d
    )) }),
    /* @__PURE__ */ a(
      ju,
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
        e.length === Xa ? Xa : Vn
      ).map((d) => /* @__PURE__ */ a(zr, { className: "tw:hover:bg-secondary", variant: "secondary", children: ue(d, n) }, d)),
      e.length > Xa && /* @__PURE__ */ a(
        zr,
        {
          className: "tw:hover:bg-secondary",
          variant: "secondary",
          children: `+${e.length - Vn} ${i}`
        }
      )
    ] })
  ] });
}
const Hu = Object.freeze([
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
]), Fh = Object.freeze([
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
  ...Hu
]), At = (t, e) => t[e] ?? e, qu = Object.freeze([" ", "-"]);
function Uh({
  scope: t,
  availableScopes: e,
  onScopeChange: r,
  availableBookInfo: o,
  selectedBookIds: n,
  onSelectedBookIdsChange: s,
  localizedStrings: i,
  localizedBookNames: c,
  disabledSectionExplanations: l,
  id: d,
  variant: w = "radio",
  rangeStart: p,
  rangeEnd: h,
  onRangeStartChange: g,
  onRangeEndChange: f,
  currentScrRef: y,
  onCurrentScrRefChange: b,
  bookChapterControlLocalizedStrings: R,
  getEndVerse: k,
  hideLabel: E = !1,
  buttonClassName: C
}) {
  const I = At(
    i,
    "%webView_scope_selector_selected_text%"
  ), T = At(i, "%webView_scope_selector_verse%"), j = At(i, "%webView_scope_selector_chapter%"), A = At(i, "%webView_scope_selector_book%"), M = At(
    i,
    "%webView_scope_selector_current_verse%"
  ), P = At(
    i,
    "%webView_scope_selector_current_chapter%"
  ), W = At(i, "%webView_scope_selector_current_book%"), B = At(i, "%webView_scope_selector_choose_books%"), Q = At(i, "%webView_scope_selector_scope%"), $ = At(i, "%webView_scope_selector_select_books%"), et = At(i, "%webView_scope_selector_range%"), _ = At(i, "%webView_scope_selector_select_range%"), z = At(i, "%webView_scope_selector_range_start%"), G = At(i, "%webView_scope_selector_range_end%"), nt = At(i, "%webView_scope_selector_ok%"), ot = At(i, "%webView_scope_selector_cancel%"), pt = At(i, "%webView_scope_selector_navigate%"), ct = (L) => {
    if (!y) return;
    const tt = y.book.toUpperCase();
    switch (L) {
      case "verse":
        return Se(y, "id");
      case "chapter":
        return `${tt} ${y.chapterNum}`;
      case "book":
        return tt;
      default:
        return;
    }
  }, Z = [
    { value: "selectedText", label: I, id: "scope-selected-text" },
    {
      value: "verse",
      label: T,
      dropdownLabel: M,
      scrRefSuffix: ct("verse"),
      id: "scope-verse"
    },
    {
      value: "chapter",
      label: j,
      dropdownLabel: P,
      scrRefSuffix: ct("chapter"),
      id: "scope-chapter"
    },
    {
      value: "book",
      label: A,
      dropdownLabel: W,
      scrRefSuffix: ct("book"),
      id: "scope-book"
    },
    { value: "selectedBooks", label: B, id: "scope-selected" },
    { value: "range", label: et, id: "scope-range" }
  ], it = (L, tt, St = !1) => /* @__PURE__ */ u(wt, { children: [
    L,
    tt && !St && /* @__PURE__ */ u("span", { className: "tw:text-muted-foreground", children: [
      ": ",
      tt
    ] })
  ] }), gt = e ? Z.filter((L) => e.includes(L.value)) : Z, ft = y ?? Va, mt = p ?? ft, Zt = h ?? ft, vt = () => {
  }, Qt = U(null), zt = U(null), bt = U(!1), Ft = U(null), Ot = U(!1), [Ut, lt] = N(void 0), Et = U(!1), jt = U(!1), le = U(null), de = F((L) => {
    if (L) {
      lt("start"), Et.current = !1;
      return;
    }
    lt((tt) => tt === "start" ? void 0 : tt), Et.current && (Et.current = !1, requestAnimationFrame(() => {
      var St;
      const tt = (St = Qt.current) == null ? void 0 : St.querySelector("button");
      tt == null || tt.click();
    }));
  }, []), Kt = F((L) => {
    if (L) {
      lt("end"), jt.current = !1;
      return;
    }
    lt((tt) => tt === "end" ? void 0 : tt);
  }, []), He = F(
    (L) => {
      g == null || g(L), f == null || f(L), Et.current = !0;
    },
    [g, f]
  ), Ht = F(
    (L) => {
      f == null || f(L), jt.current = !0;
    },
    [f]
  ), ne = F(
    (L) => {
      r(L), L === "selectedBooks" && n.length === 0 && (y != null && y.book) && s([y.book]);
    },
    [r, n, y, s]
  ), te = gt.find((L) => L.value === t), D = () => t === "selectedBooks" && n.length > 0 ? n.map((L) => L.toUpperCase()).join(", ") : t === "range" ? _c(mt, Zt, {
    optionOrLocalizedBookName: "id",
    endRefOptionOrLocalizedBookName: "id",
    repeatBookName: !0
  }) : te ? it(te.label, te.scrRefSuffix) : t, yt = gt.filter(
    (L) => L.value !== "selectedBooks" && L.value !== "range"
  ), qt = gt.find((L) => L.value === "selectedBooks"), It = gt.find((L) => L.value === "range"), [re, Ce] = N(!1), [S, K] = N(void 0), [X, x] = N(void 0), [H, O] = N(void 0), [rt, dt] = N(void 0), [ht, kt] = N([]), Tt = w === "dropdown" && S === "selectedBooks", Pt = /* @__PURE__ */ a(
    Ku,
    {
      availableBookInfo: o,
      selectedBookIds: Tt ? ht : n,
      onChangeSelectedBookIds: Tt ? kt : s,
      localizedStrings: i,
      localizedBookNames: c,
      disabledSectionExplanations: l
    }
  ), ae = Ut === "end", jr = Ut === "start", or = "tw:text-muted-foreground", qe = w === "dropdown" && S === "range", Ra = qe ? O : He, Br = qe ? dt : f ? Ht : vt, kr = /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-wrap tw:items-end tw:gap-4", children: [
    /* @__PURE__ */ u("div", { className: "tw:grid tw:gap-2", children: [
      /* @__PURE__ */ a(Dt, { htmlFor: "scope-range-start", className: m(ae && or), children: z }),
      /* @__PURE__ */ a(
        ja,
        {
          id: "scope-range-start",
          scrRef: qe ? H ?? mt : mt,
          handleSubmit: Ra,
          localizedBookNames: c,
          localizedStrings: R,
          getEndVerse: k,
          submitKeys: qu,
          onOpenChange: de,
          className: m(ae && or),
          modal: !0
        }
      )
    ] }),
    /* @__PURE__ */ u("div", { ref: Qt, className: "tw:grid tw:gap-2", children: [
      /* @__PURE__ */ a(Dt, { htmlFor: "scope-range-end", className: m(jr && or), children: G }),
      /* @__PURE__ */ a(
        ja,
        {
          id: "scope-range-end",
          scrRef: qe ? rt ?? Zt : Zt,
          handleSubmit: Br,
          localizedBookNames: c,
          localizedStrings: R,
          getEndVerse: k,
          disableReferencesUpTo: qe ? H ?? mt : mt,
          onOpenChange: Kt,
          onCloseAutoFocus: (L) => {
            var tt;
            jt.current && (jt.current = !1, L.preventDefault(), (tt = le.current) == null || tt.focus());
          },
          className: m(jr && or),
          modal: !0,
          align: "start"
        }
      )
    ] })
  ] }), ge = U({}), _r = F(
    (L) => (tt) => {
      ge.current[L] = tt;
    },
    []
  ), Fr = U(null);
  Y(() => {
    if (!re) return;
    let L = 0;
    const tt = requestAnimationFrame(() => {
      L = requestAnimationFrame(() => {
        var St;
        (St = ge.current[t]) == null || St.focus();
      });
    });
    return () => {
      cancelAnimationFrame(tt), L && cancelAnimationFrame(L);
    };
  }, [re, t]);
  const [Ee, nr] = N(null), [Ge, Ur] = N(null), [Ye, Ma] = N(null), Kr = 200, [za, Oa] = N(!1);
  Y(() => {
    if (!Ye || typeof ResizeObserver > "u") return;
    const L = new ResizeObserver(([tt]) => {
      Oa(tt.contentRect.width < Kr);
    });
    return L.observe(Ye), () => L.disconnect();
  }, [Ye]);
  const Hr = F(
    (L) => {
      x(L), O(mt), dt(Zt), kt(n), Ce(!1), K(L);
    },
    [mt, Zt, n]
  ), qr = F(() => {
    X !== void 0 && (X === "range" ? (H && (g == null || g(H)), rt && (f == null || f(rt))) : X === "selectedBooks" && s(ht), ne(X), K(void 0), x(void 0));
  }, [
    X,
    H,
    rt,
    ht,
    g,
    f,
    s,
    ne
  ]), ir = F((L) => {
    L || (K(void 0), x(void 0));
  }, []), Gr = F((L) => {
    var tt;
    L.preventDefault(), (tt = Fr.current) == null || tt.focus();
  }, []), sr = (L) => t === L ? /* @__PURE__ */ a("span", { className: "tw:absolute tw:flex tw:h-3.5 tw:w-3.5 tw:items-center tw:justify-center tw:ltr:left-2 tw:rtl:right-2", children: /* @__PURE__ */ a(Be, { className: "tw:h-4 tw:w-4" }) }) : void 0;
  return /* @__PURE__ */ u("div", { id: d, className: "tw:grid tw:gap-4", children: [
    /* @__PURE__ */ u("div", { className: "tw:grid tw:gap-2", children: [
      !E && /* @__PURE__ */ a(Dt, { children: Q }),
      w === "dropdown" ? /* @__PURE__ */ u(Me, { open: re, onOpenChange: Ce, children: [
        /* @__PURE__ */ a(be, { asChild: !0, children: /* @__PURE__ */ u(
          J,
          {
            ref: Fr,
            variant: "outline",
            role: "combobox",
            className: m(
              "tw:w-full tw:justify-between tw:overflow-hidden tw:font-normal",
              C
            ),
            children: [
              /* @__PURE__ */ a("span", { className: "tw:min-w-0 tw:flex-1 tw:truncate tw:text-start", children: D() }),
              /* @__PURE__ */ a(Ze, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
            ]
          }
        ) }),
        /* @__PURE__ */ a(
          ze,
          {
            ref: Ma,
            className: "tw:w-[var(--radix-dropdown-menu-trigger-width)] tw:min-w-[12rem]",
            align: "start",
            children: /* @__PURE__ */ u(Pa, { container: Ye, children: [
              yt.map(({ value: L, label: tt, dropdownLabel: St, scrRefSuffix: v, id: q }) => /* @__PURE__ */ u(
                $e,
                {
                  ref: _r(L),
                  className: "tw:relative tw:ps-8 data-[highlighted]:tw:bg-accent data-[highlighted]:tw:text-accent-foreground",
                  onSelect: () => ne(L),
                  "data-selected": t === L ? "true" : void 0,
                  children: [
                    t === L && /* @__PURE__ */ a("span", { className: "tw:absolute tw:flex tw:h-3.5 tw:w-3.5 tw:items-center tw:justify-center tw:ltr:left-2 tw:rtl:right-2", children: /* @__PURE__ */ a(Be, { className: "tw:h-4 tw:w-4" }) }),
                    it(St ?? tt, v, za)
                  ]
                },
                q
              )),
              (qt || It) && /* @__PURE__ */ a(Je, {}),
              qt && /* @__PURE__ */ u(
                $e,
                {
                  ref: _r("selectedBooks"),
                  className: m(
                    "tw:relative tw:ps-8",
                    "data-[highlighted]:tw:bg-accent data-[highlighted]:tw:text-accent-foreground"
                  ),
                  onSelect: () => Hr("selectedBooks"),
                  "data-selected": t === "selectedBooks" ? "true" : void 0,
                  children: [
                    sr("selectedBooks"),
                    `${qt.label}…`
                  ]
                }
              ),
              It && /* @__PURE__ */ u(
                $e,
                {
                  ref: _r("range"),
                  className: m(
                    "tw:relative tw:ps-8",
                    "data-[highlighted]:tw:bg-accent data-[highlighted]:tw:text-accent-foreground"
                  ),
                  onSelect: () => Hr("range"),
                  "data-selected": t === "range" ? "true" : void 0,
                  children: [
                    sr("range"),
                    `${It.label}…`
                  ]
                }
              ),
              b && /* @__PURE__ */ u(wt, { children: [
                /* @__PURE__ */ a(Je, {}),
                /* @__PURE__ */ a(br, { className: "tw:px-2 tw:py-1.5 tw:text-xs tw:font-medium tw:text-muted-foreground", children: pt }),
                /* @__PURE__ */ a(
                  $e,
                  {
                    ref: Ft,
                    className: "tw:p-0",
                    onSelect: (L) => {
                      var tt, St;
                      if (L.preventDefault(), bt.current) {
                        bt.current = !1;
                        return;
                      }
                      Ot.current || (St = (tt = zt.current) == null ? void 0 : tt.querySelector("button")) == null || St.click();
                    },
                    children: /* @__PURE__ */ a(
                      "div",
                      {
                        ref: zt,
                        className: "tw:w-full tw:px-1 tw:pb-1",
                        onPointerDownCapture: (L) => {
                          const tt = L.target instanceof HTMLElement ? L.target : void 0;
                          tt != null && tt.closest("button") && (bt.current = !0, requestAnimationFrame(() => {
                            bt.current = !1;
                          }));
                        },
                        children: /* @__PURE__ */ a(
                          ja,
                          {
                            id: "scope-navigate",
                            scrRef: y ?? Va,
                            handleSubmit: b,
                            localizedBookNames: c,
                            localizedStrings: R,
                            getEndVerse: k,
                            triggerVariant: "ghost",
                            onOpenChange: (L) => {
                              Ot.current = L;
                            },
                            onCloseAutoFocus: (L) => {
                              var tt;
                              L.preventDefault(), (tt = Ft.current) == null || tt.focus();
                            },
                            modal: !0,
                            className: "tw:w-full tw:min-w-0 tw:max-w-none tw:justify-between tw:px-2 tw:font-normal",
                            triggerContent: /* @__PURE__ */ u(wt, { children: [
                              /* @__PURE__ */ a("span", { className: "tw:min-w-0 tw:flex-1 tw:truncate tw:text-start", children: Se(y ?? Va, "id") }),
                              /* @__PURE__ */ a(Ze, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
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
        xo,
        {
          value: t,
          onValueChange: ne,
          className: "tw:flex tw:flex-col tw:space-y-1",
          children: gt.map(({ value: L, label: tt, scrRefSuffix: St, id: v }) => /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center", children: [
            /* @__PURE__ */ a(wa, { className: "tw:me-2", value: L, id: v }),
            /* @__PURE__ */ a(Dt, { htmlFor: v, children: it(tt, St) })
          ] }, v))
        }
      )
    ] }),
    w === "radio" && t === "selectedBooks" && /* @__PURE__ */ u("div", { className: "tw:grid tw:gap-2", children: [
      /* @__PURE__ */ a(Dt, { children: $ }),
      Pt
    ] }),
    w === "radio" && t === "range" && kr,
    w === "dropdown" && qt && /* @__PURE__ */ a(Ja, { open: S === "selectedBooks", onOpenChange: ir, children: /* @__PURE__ */ a(
      Za,
      {
        ref: Ur,
        onCloseAutoFocus: Gr,
        onEscapeKeyDown: (L) => {
          Ge != null && Ge.querySelector('[data-state="open"]') && L.preventDefault();
        },
        children: /* @__PURE__ */ u(Pa, { container: Ge, children: [
          /* @__PURE__ */ a(Qa, { className: "tw:pe-8", children: /* @__PURE__ */ a(to, { children: B }) }),
          Pt,
          /* @__PURE__ */ u(Wo, { children: [
            /* @__PURE__ */ a(J, { variant: "outline", onClick: () => ir(!1), children: ot }),
            /* @__PURE__ */ a(J, { onClick: qr, children: nt })
          ] })
        ] })
      }
    ) }),
    w === "dropdown" && It && /* @__PURE__ */ a(Ja, { open: S === "range", onOpenChange: ir, children: /* @__PURE__ */ a(
      Za,
      {
        ref: nr,
        onCloseAutoFocus: Gr,
        onEscapeKeyDown: (L) => {
          Ee != null && Ee.querySelector('[data-state="open"]') && L.preventDefault();
        },
        children: /* @__PURE__ */ u(Pa, { container: Ee, children: [
          /* @__PURE__ */ a(Qa, { className: "tw:pe-8", children: /* @__PURE__ */ a(to, { children: _ }) }),
          kr,
          /* @__PURE__ */ u(Wo, { children: [
            /* @__PURE__ */ a(J, { variant: "outline", onClick: () => ir(!1), children: ot }),
            /* @__PURE__ */ a(J, { ref: le, onClick: qr, children: nt })
          ] })
        ] })
      }
    ) })
  ] });
}
function Kh({
  availableScrollGroupIds: t,
  scrollGroupId: e,
  onChangeScrollGroupId: r,
  localizedStrings: o = {},
  size: n = "sm",
  className: s,
  id: i,
  disabled: c
}) {
  const l = {
    ...$a,
    ...Object.fromEntries(
      Object.entries(o).map(
        ([w, p]) => [
          w,
          w === p && w in $a ? $a[w] : p
        ]
      )
    )
  }, d = ke();
  return /* @__PURE__ */ u(
    gr,
    {
      value: `${e}`,
      onValueChange: (w) => r(
        w === "undefined" ? void 0 : parseInt(w, 10)
      ),
      disabled: c,
      children: [
        /* @__PURE__ */ a(mr, { size: n, className: m("pr-twp tw:w-auto", s), children: /* @__PURE__ */ a(
          fr,
          {
            placeholder: l[tn(e)] ?? e
          }
        ) }),
        /* @__PURE__ */ a(
          vr,
          {
            id: i,
            align: d === "rtl" ? "end" : "start",
            style: { zIndex: Oe },
            children: t.map((w) => /* @__PURE__ */ a(pe, { value: `${w}`, children: l[tn(w)] }, `${w}`))
          }
        )
      ]
    }
  );
}
function Hh({ children: t }) {
  return /* @__PURE__ */ a("div", { className: "pr-twp tw:grid", children: t });
}
function qh({
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
function Gh({
  primary: t,
  secondary: e,
  includeSeparator: r = !1
}) {
  return /* @__PURE__ */ u("div", { className: "tw:space-y-4 tw:py-2", children: [
    /* @__PURE__ */ u("div", { children: [
      /* @__PURE__ */ a("h3", { className: "tw:text-lg tw:font-medium", children: t }),
      /* @__PURE__ */ a("p", { className: "tw:text-sm tw:text-muted-foreground", children: e })
    ] }),
    r ? /* @__PURE__ */ a(Or, {}) : ""
  ] });
}
function Qi(t, e) {
  var r;
  return (r = Object.entries(t).find(
    ([, o]) => "menuItem" in o && o.menuItem === e
  )) == null ? void 0 : r[0];
}
function ba({ icon: t, menuLabel: e, leading: r }) {
  return t ? /* @__PURE__ */ a(
    "img",
    {
      className: m("tw:max-h-5 tw:max-w-5", r ? "tw:me-2" : "tw:ms-2"),
      src: t,
      alt: `${r ? "Leading" : "Trailing"} icon for ${e}`
    }
  ) : void 0;
}
const ts = (t, e, r, o) => r ? Object.entries(t).filter(
  ([s, i]) => "column" in i && i.column === r || s === r
).sort(([, s], [, i]) => s.order - i.order).flatMap(([s]) => e.filter((c) => c.group === s).sort((c, l) => c.order - l.order).map((c) => /* @__PURE__ */ u(_t, { children: [
  /* @__PURE__ */ a(Nt, { asChild: !0, children: "command" in c ? /* @__PURE__ */ u(
    $e,
    {
      onClick: () => {
        o(c);
      },
      children: [
        c.iconPathBefore && /* @__PURE__ */ a(ba, { icon: c.iconPathBefore, menuLabel: c.label, leading: !0 }),
        c.label,
        c.iconPathAfter && /* @__PURE__ */ a(ba, { icon: c.iconPathAfter, menuLabel: c.label })
      ]
    },
    `dropdown-menu-item-${c.label}-${c.command}`
  ) : /* @__PURE__ */ u(Ts, { children: [
    /* @__PURE__ */ a(Ss, { children: c.label }),
    /* @__PURE__ */ a(Rs, { children: /* @__PURE__ */ a(Ds, { children: ts(
      t,
      e,
      Qi(t, c.id),
      o
    ) }) })
  ] }, `dropdown-menu-sub-${c.label}-${c.id}`) }),
  c.tooltip && /* @__PURE__ */ a(Ct, { children: c.tooltip })
] }, `tooltip-${c.label}-${"command" in c ? c.command : c.id}`))) : void 0;
function mo({
  onSelectMenuItem: t,
  menuData: e,
  tabLabel: r,
  icon: o,
  className: n,
  variant: s,
  buttonVariant: i = "ghost",
  id: c
}) {
  return /* @__PURE__ */ u(Me, { variant: s, children: [
    /* @__PURE__ */ a(be, { "aria-label": r, className: n, asChild: !0, id: c, children: /* @__PURE__ */ a(J, { variant: i, size: "icon", children: o ?? /* @__PURE__ */ a(dc, {}) }) }),
    /* @__PURE__ */ a(ze, { align: "start", style: { zIndex: Oe }, children: Object.entries(e.columns).filter(([, l]) => typeof l == "object").sort(([, l], [, d]) => typeof l == "boolean" || typeof d == "boolean" ? 0 : l.order - d.order).map(([l], d, w) => /* @__PURE__ */ u(Ar, { children: [
      /* @__PURE__ */ a(Fn, { children: /* @__PURE__ */ a(Mt, { children: ts(e.groups, e.items, l, t) }) }),
      d < w.length - 1 && /* @__PURE__ */ a(Je, {})
    ] }, l)) })
  ] });
}
const Gu = 8;
function Yu(t, e, r) {
  const o = e.findIndex((i) => t >= i), n = o === -1 ? e.length : o;
  if (r === void 0 || n >= r) return n;
  const s = e.findIndex(
    (i) => t >= i + Gu
  );
  return s === -1 ? r : Math.min(r, s);
}
function es(t, e) {
  const [r, o] = N(0), n = U(void 0);
  return Xt(() => {
    if (!t || typeof ResizeObserver > "u") return;
    const s = () => {
      const { width: c } = t.getBoundingClientRect(), l = n.current;
      n.current = c;
      const d = l === void 0 || l === 0;
      o(
        (w) => Yu(c, e, d ? void 0 : w)
      );
    };
    s();
    const i = new ResizeObserver(s);
    return i.observe(t), () => i.disconnect();
  }, [t, e]), r;
}
const Wu = Object.freeze([520, 420, 340]), rs = Wt.forwardRef(
  ({ id: t, className: e, children: r, shrinkStep: o }, n) => {
    const [s, i] = N(void 0), c = U(n);
    c.current = n;
    const l = F((p) => {
      i(p ?? void 0);
      const h = c.current;
      typeof h == "function" ? h(p) : h && (h.current = p);
    }, []), d = es(s, Wu), w = o ?? d;
    return /* @__PURE__ */ a(Po.Provider, { value: w, children: /* @__PURE__ */ a(
      "div",
      {
        ref: l,
        className: `tw:sticky tw:top-0 tw:box-border tw:flex tw:h-14 tw:flex-row tw:items-center tw:justify-between tw:gap-2 tw:overflow-clip tw:px-4 tw:py-2 tw:text-foreground tw:@container/toolbar ${e}`,
        id: t,
        children: r
      }
    ) });
  }
);
function Yh({
  onSelectProjectMenuItem: t,
  onSelectViewInfoMenuItem: e,
  projectMenuData: r,
  tabViewMenuData: o,
  id: n,
  className: s,
  startAreaChildren: i,
  centerAreaChildren: c,
  endAreaChildren: l,
  menuButtonIcon: d,
  shrinkStep: w
}) {
  return /* @__PURE__ */ u(
    rs,
    {
      className: `tw:w-full tw:border-b ${s}`,
      id: n,
      shrinkStep: w,
      children: [
        r && /* @__PURE__ */ a(
          mo,
          {
            onSelectMenuItem: t,
            menuData: r,
            tabLabel: "Project",
            icon: d ?? /* @__PURE__ */ a(wc, {}),
            buttonVariant: "ghost"
          }
        ),
        i && /* @__PURE__ */ a("div", { className: "tw:flex tw:min-w-0 tw:shrink tw:grow-[10] tw:flex-row tw:flex-nowrap tw:items-start tw:gap-x-1 tw:gap-y-2 tw:overflow-clip", children: i }),
        c && /* @__PURE__ */ a("div", { className: "tw:flex tw:shrink tw:grow-[1] tw:basis-0 tw:flex-row tw:flex-nowrap tw:items-start tw:justify-center tw:gap-x-1 tw:gap-y-2 tw:overflow-clip tw:@sm:basis-auto", children: c }),
        /* @__PURE__ */ u("div", { className: "tw:flex tw:shrink-0 tw:grow-[1] tw:flex-row-reverse tw:flex-nowrap tw:items-start tw:gap-x-1 tw:gap-y-2 tw:overflow-clip", children: [
          o && /* @__PURE__ */ a(
            mo,
            {
              onSelectMenuItem: e,
              menuData: o,
              tabLabel: "View Info",
              icon: /* @__PURE__ */ a(uc, {}),
              className: "tw:h-full"
            }
          ),
          l
        ] })
      ]
    }
  );
}
function Wh({
  onSelectProjectMenuItem: t,
  projectMenuData: e,
  id: r,
  className: o,
  menuButtonIcon: n
}) {
  return /* @__PURE__ */ a(rs, { className: "tw:pointer-events-none", id: r, children: e && /* @__PURE__ */ a(
    mo,
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
const as = Wt.forwardRef(({ className: t, ...e }, r) => {
  const o = ke();
  return /* @__PURE__ */ a(
    he.Root,
    {
      orientation: "vertical",
      ref: r,
      className: m("tw:flex tw:gap-1 tw:rounded-md tw:text-muted-foreground", t),
      ...e,
      dir: o
    }
  );
});
as.displayName = he.List.displayName;
const os = Wt.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ a(
  he.List,
  {
    ref: r,
    className: m(
      "tw:flex tw:items-center tw:w-[124px] tw:justify-center tw:rounded-md tw:bg-muted tw:p-1 tw:text-muted-foreground",
      t
    ),
    ...e
  }
));
os.displayName = he.List.displayName;
const Xu = Wt.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ a(
  he.Trigger,
  {
    ref: r,
    ...e,
    className: m(
      "tw:inline-flex tw:w-[116px] tw:cursor-pointer tw:items-center tw:justify-center tw:break-words tw:rounded-sm tw:border-0 tw:bg-muted tw:px-3 tw:py-1.5 tw:text-sm tw:font-medium tw:text-inherit tw:ring-offset-background tw:transition-all tw:hover:text-foreground tw:focus-visible:outline-hidden tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2 tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:data-[state=active]:bg-background tw:data-[state=active]:text-foreground tw:data-[state=active]:shadow-sm tw:overflow-clip",
      t
    )
  }
)), ns = Wt.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ a(
  he.Content,
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
ns.displayName = he.Content.displayName;
function Xh({
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
        Hn,
        {
          className: s,
          value: e,
          onSearch: r,
          placeholder: o
        }
      )
    ] }),
    /* @__PURE__ */ u(as, { children: [
      /* @__PURE__ */ a(os, { children: t.map((c) => /* @__PURE__ */ a(Xu, { value: c.value, children: c.value }, c.key)) }),
      t.map((c) => /* @__PURE__ */ a(ns, { value: c.value, children: c.content }, c.key))
    ] })
  ] });
}
function Ju({
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
  return /* @__PURE__ */ a(Ms.Provider, { value: o, children: /* @__PURE__ */ a(
    _e.Root,
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
function Zu({ ...t }) {
  return /* @__PURE__ */ a(_e.Menu, { "data-slot": "menubar-menu", ...t });
}
function Qu({ ...t }) {
  return /* @__PURE__ */ a(_e.Portal, { "data-slot": "menubar-portal", ...t });
}
function tp({
  className: t,
  ...e
}) {
  const r = $r();
  return /* @__PURE__ */ a(
    _e.Trigger,
    {
      "data-slot": "menubar-trigger",
      className: m(
        "tw:flex tw:items-center tw:rounded-sm tw:px-1.5 tw:py-[2px] tw:text-sm tw:font-medium tw:outline-hidden tw:select-none tw:hover:bg-muted tw:aria-expanded:bg-muted",
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation (portal-rendered content needs this)
        "pr-twp",
        // CUSTOM: Apply variant-driven styles from menu context
        Eo({ variant: r.variant, className: t })
      ),
      ...e
    }
  );
}
function ep({
  className: t,
  align: e = "start",
  alignOffset: r = -4,
  sideOffset: o = 8,
  // CUSTOM: Pull `style` out so the shared z-index can be applied under any caller-supplied style
  style: n,
  ...s
}) {
  const i = $r();
  return /* @__PURE__ */ a(Qu, { children: /* @__PURE__ */ a(
    _e.Content,
    {
      "data-slot": "menubar-content",
      align: e,
      alignOffset: r,
      sideOffset: o,
      className: m(
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
      style: { zIndex: Oe, ...n },
      ...s
    }
  ) });
}
function rp({
  className: t,
  inset: e,
  variant: r = "default",
  ...o
}) {
  const n = $r();
  return /* @__PURE__ */ a(
    _e.Item,
    {
      "data-slot": "menubar-item",
      "data-inset": e,
      "data-variant": r,
      className: m(
        "tw:group/menubar-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-[variant=destructive]:text-destructive tw:data-[variant=destructive]:focus:bg-destructive/10 tw:data-[variant=destructive]:focus:text-destructive tw:dark:data-[variant=destructive]:focus:bg-destructive/20 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:data-[variant=destructive]:*:[svg]:text-destructive!",
        // CUSTOM: Apply variant-driven styles from menu context
        Eo({ variant: n.variant, className: t })
      ),
      ...o
    }
  );
}
function ap({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    _e.Separator,
    {
      "data-slot": "menubar-separator",
      className: m("tw:-mx-1 tw:my-1 tw:h-px tw:bg-border", t),
      ...e
    }
  );
}
function op({ ...t }) {
  return /* @__PURE__ */ a(_e.Sub, { "data-slot": "menubar-sub", ...t });
}
function np({
  className: t,
  inset: e,
  children: r,
  ...o
}) {
  const n = $r();
  return /* @__PURE__ */ u(
    _e.SubTrigger,
    {
      "data-slot": "menubar-sub-trigger",
      "data-inset": e,
      className: m(
        "tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-none tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-inset:ps-7 tw:data-open:bg-accent tw:data-open:text-accent-foreground tw:[&_svg:not([class*=size-])]:size-4",
        // CUSTOM: Apply variant-driven styles from menu context
        Eo({ variant: n.variant, className: t })
      ),
      ...o,
      children: [
        r,
        /* @__PURE__ */ a(oi, { className: "tw:ms-auto tw:size-4" })
      ]
    }
  );
}
function ip({
  className: t,
  // CUSTOM: Pull `style` out so the shared z-index can be applied under any caller-supplied style
  style: e,
  ...r
}) {
  const o = $r();
  return /* @__PURE__ */ a(
    _e.SubContent,
    {
      "data-slot": "menubar-sub-content",
      className: m(
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
      style: { zIndex: Oe, ...e },
      ...r
    }
  );
}
const Tr = (t, e) => {
  setTimeout(() => {
    e.forEach((r) => {
      var o;
      (o = t.current) == null || o.dispatchEvent(new KeyboardEvent("keydown", r));
    });
  }, 0);
}, is = (t, e, r, o) => {
  if (!r) return;
  const n = Object.entries(t).filter(
    ([s, i]) => "column" in i && i.column === r || s === r
  ).sort(([, s], [, i]) => s.order - i.order);
  return n.flatMap(([s], i) => {
    const c = e.filter((d) => d.group === s).sort((d, w) => d.order - w.order).map((d) => /* @__PURE__ */ u(_t, { children: [
      /* @__PURE__ */ a(Nt, { asChild: !0, children: "command" in d ? /* @__PURE__ */ u(
        rp,
        {
          onClick: () => {
            o(d);
          },
          children: [
            d.iconPathBefore && /* @__PURE__ */ a(ba, { icon: d.iconPathBefore, menuLabel: d.label, leading: !0 }),
            d.label,
            d.iconPathAfter && /* @__PURE__ */ a(ba, { icon: d.iconPathAfter, menuLabel: d.label })
          ]
        },
        `menubar-item-${d.label}-${d.command}`
      ) : /* @__PURE__ */ u(op, { children: [
        /* @__PURE__ */ a(np, { children: d.label }),
        /* @__PURE__ */ a(ip, { children: is(
          t,
          e,
          Qi(t, d.id),
          o
        ) })
      ] }, `menubar-sub-${d.label}-${d.id}`) }),
      d.tooltip && /* @__PURE__ */ a(Ct, { children: d.tooltip })
    ] }, `tooltip-${d.label}-${"command" in d ? d.command : d.id}`)), l = [...c];
    return c.length > 0 && i < n.length - 1 && l.push(/* @__PURE__ */ a(ap, {}, `separator-${s}`)), l;
  });
};
function sp({
  menuData: t,
  onSelectMenuItem: e,
  onOpenChange: r,
  variant: o
}) {
  const n = U(void 0), s = U(void 0), i = U(void 0), c = U(void 0), l = U(void 0), d = (w) => {
    switch (w) {
      case "platform.app":
        return s;
      case "platform.window":
        return i;
      case "platform.layout":
        return c;
      case "platform.help":
        return l;
      default:
        return;
    }
  };
  if (Bl(["alt", "alt+p", "alt+l", "alt+n", "alt+h"], (w, p) => {
    var f, y, b, R;
    w.preventDefault();
    const h = { key: "Escape", code: "Escape", keyCode: 27, bubbles: !0 }, g = { key: " ", code: "Space", keyCode: 32, bubbles: !0 };
    switch (p.hotkey) {
      case "alt":
        Tr(s, [h]);
        break;
      case "alt+p":
        (f = s.current) == null || f.focus(), Tr(s, [h, g]);
        break;
      case "alt+l":
        (y = i.current) == null || y.focus(), Tr(i, [h, g]);
        break;
      case "alt+n":
        (b = c.current) == null || b.focus(), Tr(c, [h, g]);
        break;
      case "alt+h":
        (R = l.current) == null || R.focus(), Tr(l, [h, g]);
        break;
    }
  }), Y(() => {
    if (!r || !n.current) return;
    const w = new MutationObserver((g) => {
      g.forEach((f) => {
        if (f.attributeName === "data-state" && f.target instanceof HTMLElement) {
          const y = f.target.getAttribute("data-state");
          r(y === "open");
        }
      });
    });
    return n.current.querySelectorAll("[data-state]").forEach((g) => {
      w.observe(g, { attributes: !0 });
    }), () => w.disconnect();
  }, [r]), !!t)
    return /* @__PURE__ */ a(Ju, { ref: n, className: "pr-twp tw:border-0 tw:bg-transparent", variant: o, children: Object.entries(t.columns).filter(([, w]) => typeof w == "object").sort(([, w], [, p]) => typeof w == "boolean" || typeof p == "boolean" ? 0 : w.order - p.order).map(([w, p]) => /* @__PURE__ */ u(Zu, { children: [
      /* @__PURE__ */ a(tp, { ref: d(w), children: typeof p == "object" && "label" in p && p.label }),
      /* @__PURE__ */ a(
        ep,
        {
          style: { zIndex: Oe },
          children: /* @__PURE__ */ a(Mt, { children: is(t.groups, t.items, w, e) })
        }
      )
    ] }, w)) });
}
const cp = Object.freeze([950, 800, 700]);
function Jh(t) {
  switch (t) {
    case void 0:
      return;
    case "darwin":
      return "tw:ps-[85px]";
    default:
      return "tw:pe-[calc(138px+1rem)]";
  }
}
function Zh({
  menuData: t,
  onOpenChange: e,
  onSelectMenuItem: r,
  className: o,
  id: n,
  children: s,
  appMenuAreaChildren: i,
  configAreaChildren: c,
  shouldUseAsAppDragArea: l,
  menubarVariant: d = "default",
  shrinkStep: w
}) {
  const [p, h] = N(void 0), g = F(
    (b) => h(b ?? void 0),
    []
  ), f = es(p, cp), y = w ?? f;
  return /* @__PURE__ */ a(Po.Provider, { value: y, children: /* @__PURE__ */ a(
    "div",
    {
      className: m("tw:border tw:px-4 tw:text-foreground", o),
      style: { position: "relative" },
      id: n,
      children: /* @__PURE__ */ u(
        "div",
        {
          "data-testid": "toolbar-content-row",
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
                  i,
                  t && /* @__PURE__ */ a(
                    sp,
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
                "data-testid": "toolbar-content-area",
                className: "tw:flex tw:min-w-0 tw:shrink tw:items-center tw:gap-2 tw:overflow-clip tw:px-2",
                style: l ? { WebkitAppRegion: "no-drag" } : void 0,
                children: s
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
const lp = (t, e) => t[e] ?? e;
function Qh({
  knownUiLanguages: t,
  primaryLanguage: e = "en",
  fallbackLanguages: r = [],
  onLanguagesChange: o,
  onPrimaryLanguageChange: n,
  onFallbackLanguagesChange: s,
  localizedStrings: i,
  className: c,
  id: l
}) {
  const d = lp(
    i,
    "%settings_uiLanguageSelector_fallbackLanguages%"
  ), [w, p] = N(!1), h = (f) => {
    n && n(f), o && o([f, ...r.filter((y) => y !== f)]), s && r.find((y) => y === f) && s([...r.filter((y) => y !== f)]), p(!1);
  }, g = (f, y) => {
    var R, k, E, C, I, T;
    const b = y !== f ? ((k = (R = t[f]) == null ? void 0 : R.uiNames) == null ? void 0 : k[y]) ?? ((C = (E = t[f]) == null ? void 0 : E.uiNames) == null ? void 0 : C.en) : void 0;
    return b ? `${(I = t[f]) == null ? void 0 : I.autonym} (${b})` : (T = t[f]) == null ? void 0 : T.autonym;
  };
  return /* @__PURE__ */ u("div", { id: l, className: m("pr-twp tw:max-w-sm", c), children: [
    /* @__PURE__ */ u(
      gr,
      {
        name: "uiLanguage",
        value: e,
        onValueChange: h,
        open: w,
        onOpenChange: (f) => p(f),
        children: [
          /* @__PURE__ */ a(mr, { children: /* @__PURE__ */ a(fr, {}) }),
          /* @__PURE__ */ a(
            vr,
            {
              style: { zIndex: Oe },
              children: Object.keys(t).map((f) => /* @__PURE__ */ a(pe, { value: f, children: g(f, e) }, f))
            }
          )
        ]
      }
    ),
    e !== "en" && /* @__PURE__ */ a("div", { className: "tw:pt-3", children: /* @__PURE__ */ a(Dt, { className: "tw:font-normal tw:text-muted-foreground", children: Ve(d, {
      fallbackLanguages: (r == null ? void 0 : r.length) > 0 ? r.map((f) => g(f, e)).join(", ") : t.en.autonym
    }) }) })
  ] });
}
const tg = Object.freeze([
  "%firstRun_language_search_placeholder%",
  "%firstRun_language_noResults%",
  "%firstRun_language_selected%"
]);
function dp(t) {
  return [...t].sort(([e, r], [o, n]) => e === "en" && o !== "en" ? -1 : o === "en" && e !== "en" ? 1 : r.autonym.localeCompare(n.autonym));
}
function eg({
  languages: t,
  value: e,
  onChange: r,
  localizedStrings: o,
  className: n,
  id: s
}) {
  const [i, c] = N(""), l = V(
    () => dp(Object.entries(t)).map(([f, y]) => ({
      tag: f,
      info: y,
      keywords: [y.autonym, ...Object.values(y.uiNames ?? {}), ...y.otherNames ?? []]
    })),
    [t]
  ), d = V(() => {
    if (!i) return l;
    const f = i.toLowerCase();
    return l.filter(({ keywords: y }) => y.some((b) => b.toLowerCase().includes(f)));
  }, [l, i]), w = l.length > 1, p = o["%firstRun_language_search_placeholder%"] ?? "", h = o["%firstRun_language_noResults%"] ?? "", g = o["%firstRun_language_selected%"] ?? "";
  return /* @__PURE__ */ u(er, { id: s, className: m("pr-twp", n), shouldFilter: !1, children: [
    w && // Plain <input> (not CommandPrimitive.Input) so cmdk cannot update this field after
    // item selection. Arrow-key and Enter events from here bubble to the Command root div
    // where cmdk's keydown handler picks them up for list navigation.
    /* @__PURE__ */ a("div", { "data-slot": "command-input-wrapper", className: "tw:p-1 tw:pb-0", children: /* @__PURE__ */ u(zs, { className: "tw:h-8! tw:rounded-lg! tw:border-input/30 tw:bg-input/30 tw:shadow-none! tw:*:data-[slot=input-group-addon]:ps-2!", children: [
      /* @__PURE__ */ a(
        "input",
        {
          "data-slot": "command-input",
          type: "text",
          placeholder: p,
          "aria-label": p,
          value: i,
          onChange: (f) => c(f.currentTarget.value),
          className: "tw:w-full tw:text-sm tw:outline-hidden tw:disabled:cursor-not-allowed tw:disabled:opacity-50"
        }
      ),
      /* @__PURE__ */ a(Os, { children: /* @__PURE__ */ a(zc, { className: "tw:size-4 tw:shrink-0 tw:opacity-50" }) })
    ] }) }),
    /* @__PURE__ */ u(rr, { children: [
      /* @__PURE__ */ a(ka, { children: h }),
      d.map(({ tag: f, info: y }) => {
        const b = f === e;
        return /* @__PURE__ */ u(
          Ue,
          {
            value: f,
            "aria-current": b ? "true" : void 0,
            "data-checked": b ? "true" : void 0,
            onSelect: () => r(f),
            children: [
              /* @__PURE__ */ a("span", { dir: "auto", children: y.autonym }),
              b && /* @__PURE__ */ a("span", { className: "tw:sr-only", children: g })
            ]
          },
          f
        );
      })
    ] })
  ] });
}
function wp({ item: t, createLabel: e, createComplexLabel: r }) {
  return e ? /* @__PURE__ */ a(Dt, { children: e(t) }) : r ? /* @__PURE__ */ a(Dt, { children: r(t) }) : /* @__PURE__ */ a(Dt, { children: t });
}
function up({
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
      Xi,
      {
        className: "tw:me-2 tw:align-middle",
        checked: o.includes(c),
        onCheckedChange: (l) => n(c, l)
      }
    ),
    /* @__PURE__ */ a(
      wp,
      {
        item: c,
        createLabel: s,
        createComplexLabel: i
      }
    )
  ] }, c)) });
}
const rg = up;
function pp(t, e) {
  const [r, o] = N(t), [n, s] = N(e);
  return t !== r && (o(t), t && s(e)), t ? e : n;
}
function ag({
  open: t,
  anchorRect: e,
  message: r,
  confirmingKeyLabel: o,
  side: n = "bottom",
  align: s = "start",
  showArrow: i = !0
}) {
  const c = t ? en(r, { key: o }).join("") : "", {
    anchorRect: l,
    message: d,
    confirmingKeyLabel: w,
    showArrow: p
  } = pp(t, { anchorRect: e, message: r, confirmingKeyLabel: o, showArrow: i });
  return /* @__PURE__ */ u(Mt, { children: [
    /* @__PURE__ */ a("span", { role: "status", className: "tw:sr-only", children: c }),
    /* @__PURE__ */ u(_t, { open: t, onOpenChange: () => {
    }, children: [
      /* @__PURE__ */ a(
        Nt,
        {
          "aria-hidden": "true",
          tabIndex: -1,
          className: m(
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
        Ct,
        {
          side: n,
          align: s,
          showArrow: p,
          arrowPadding: 8,
          className: m(
            // Rely on TooltipContent's default tw:max-w-xs (320px) and normal wrapping: this hint's
            // text is short and usually fits on one line, but locale length varies (e.g. Spanish runs
            // longer than English), so allow it to wrap rather than force tw:whitespace-nowrap, which
            // could clip or overflow on a narrow webview.
            "tw:p-0 tw:has-data-[slot=kbd]:pe-0 tw:bg-background tw:text-destructive tw:border tw:border-destructive"
          ),
          arrowClassName: "tw:bg-[color-mix(in_oklab,var(--destructive)_10%,var(--background))] tw:fill-[color-mix(in_oklab,var(--destructive)_10%,var(--background))] tw:border tw:border-destructive",
          children: /* @__PURE__ */ a("div", { className: "tw:w-full tw:h-full tw:rounded-md tw:bg-destructive/10 tw:px-3 tw:py-1.5", children: en(d, {
            key: /* @__PURE__ */ a(
              eo,
              {
                className: m(
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
            /* @__PURE__ */ a(Ar, { children: h }, `key-${g}`)
          )) })
        }
      )
    ] })
  ] });
}
function og({
  cardKey: t,
  isSelected: e,
  onSelect: r,
  isDenied: o,
  isHidden: n = !1,
  className: s,
  children: i,
  selectedButtons: c,
  hoverButtons: l,
  dropdownContent: d,
  additionalContent: w,
  accentColor: p,
  showDropdownOnHover: h = !1
}) {
  const g = (b) => {
    if (b.key === "Enter" || b.key === " ") {
      if (b.target !== b.currentTarget) return;
      b.preventDefault(), r();
    }
  }, [f, y] = N(!1);
  return /* @__PURE__ */ u(
    "div",
    {
      hidden: n,
      onClick: r,
      onKeyDown: g,
      onMouseEnter: () => y(!0),
      onFocus: () => y(!0),
      role: "button",
      tabIndex: 0,
      "aria-pressed": e,
      className: m(
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
            !e && l && /* @__PURE__ */ a("div", { className: "tw:invisible tw:group-hover:visible", children: l }),
            d && (e || h && f) && /* @__PURE__ */ a(
              "div",
              {
                className: m(
                  !e && h && "tw:invisible tw:group-hover:visible"
                ),
                children: /* @__PURE__ */ u(Me, { children: [
                  /* @__PURE__ */ a(be, { className: m(p && "tw:me-1"), asChild: !0, children: /* @__PURE__ */ a(
                    J,
                    {
                      className: "tw:m-1 tw:h-6 tw:w-6",
                      variant: "ghost",
                      size: "icon",
                      onClick: (b) => b.stopPropagation(),
                      onFocus: (b) => b.stopPropagation(),
                      children: /* @__PURE__ */ a(pc, {})
                    }
                  ) }),
                  /* @__PURE__ */ a(ze, { align: "end", children: d })
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
function ng({ message: t, id: e, className: r }) {
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
function ig({
  id: t,
  isDisabled: e = !1,
  hasError: r = !1,
  isFullWidth: o = !1,
  helperText: n,
  label: s,
  placeholder: i,
  isRequired: c = !1,
  className: l,
  defaultValue: d,
  value: w,
  onChange: p,
  onFocus: h,
  onBlur: g
}) {
  return /* @__PURE__ */ u("div", { className: m("tw:inline-grid tw:items-center tw:gap-1.5", { "tw:w-full": o }), children: [
    /* @__PURE__ */ a(
      Dt,
      {
        htmlFor: t,
        className: m({
          "tw:text-red-600": r,
          "tw:hidden": !s
        }),
        children: `${s}${c ? "*" : ""}`
      }
    ),
    /* @__PURE__ */ a(
      _a,
      {
        id: t,
        disabled: e,
        placeholder: i,
        required: c,
        className: m(l, { "tw:border-red-600": r }),
        defaultValue: d,
        value: w,
        onChange: p,
        onFocus: h,
        onBlur: g
      }
    ),
    /* @__PURE__ */ a("p", { className: m({ "tw:hidden": !n }), children: n })
  ] });
}
function sg({ currentStep: t, totalSteps: e, locale: r }) {
  const o = r || "en", n = V(() => {
    const c = new ei(o);
    return (l) => c.format(l);
  }, [o]), s = Math.min(Math.max(t, 1), e), i = Array.from({ length: e }, (c, l) => l + 1);
  return /* @__PURE__ */ a("div", { className: "tw:flex tw:items-center", "aria-hidden": "true", children: i.map((c) => {
    let l = "upcoming";
    return c === s ? l = "active" : c < s && (l = "complete"), /* @__PURE__ */ u(Ar, { children: [
      c > 1 && /* @__PURE__ */ a("div", { className: "tw:h-px tw:flex-1 tw:bg-border" }),
      /* @__PURE__ */ a(
        "div",
        {
          "data-state": l,
          className: m(
            "tw:flex tw:h-8 tw:w-8 tw:shrink-0 tw:items-center tw:justify-center tw:rounded-full tw:text-sm tw:font-medium",
            l === "active" && "tw:bg-primary tw:text-primary-foreground",
            l === "complete" && "tw:bg-muted tw:text-muted-foreground",
            l === "upcoming" && "tw:border tw:border-input tw:text-muted-foreground"
          ),
          children: l === "complete" ? /* @__PURE__ */ a(Be, { className: "tw:h-4 tw:w-4" }) : n(c)
        }
      )
    ] }, c);
  }) });
}
function cg({ ...t }) {
  return /* @__PURE__ */ a(Lt.Root, { "data-slot": "context-menu", ...t });
}
function lg({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    Lt.Trigger,
    {
      "data-slot": "context-menu-trigger",
      className: m("tw:select-none", t),
      ...e
    }
  );
}
function dg({ ...t }) {
  return /* @__PURE__ */ a(Lt.Group, { "data-slot": "context-menu-group", ...t });
}
function wg({ ...t }) {
  return /* @__PURE__ */ a(Lt.Portal, { "data-slot": "context-menu-portal", ...t });
}
function ug({ ...t }) {
  return /* @__PURE__ */ a(Lt.Sub, { "data-slot": "context-menu-sub", ...t });
}
function pg({
  ...t
}) {
  return /* @__PURE__ */ a(Lt.RadioGroup, { "data-slot": "context-menu-radio-group", ...t });
}
function hg({
  className: t,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: e,
  ...r
}) {
  return /* @__PURE__ */ a(Lt.Portal, { children: /* @__PURE__ */ a(
    Lt.Content,
    {
      "data-slot": "context-menu-content",
      className: m(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        // CUSTOM: Fixed tw: prefix not being on some classes and removed erroneous empty tw: tokens
        // CUSTOM: Removed tw:z-50 to use the shared z-index constant below (see style prop)
        "pr-twp tw:max-h-(--radix-context-menu-content-available-height) tw:min-w-36 tw:origin-(--radix-context-menu-content-transform-origin) tw:overflow-x-hidden tw:overflow-y-auto tw:rounded-lg tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95 tw:animate-none! tw:bg-popover/70 tw:before:-z-1 tw:**:data-[slot$=-item]:focus:bg-foreground/10 tw:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 tw:**:data-[slot$=-separator]:bg-foreground/5 tw:**:data-[slot$=-trigger]:focus:bg-foreground/10 tw:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! tw:**:data-[variant=destructive]:focus:bg-foreground/10! tw:**:data-[variant=destructive]:text-accent-foreground! tw:**:data-[variant=destructive]:**:text-accent-foreground! tw:relative tw:before:pointer-events-none tw:before:absolute tw:before:inset-0 tw:before:rounded-[inherit] tw:before:backdrop-blur-2xl tw:before:backdrop-saturate-150",
        t
      ),
      style: { zIndex: Oe, ...e },
      ...r
    }
  ) });
}
function gg({
  className: t,
  inset: e,
  variant: r = "default",
  ...o
}) {
  return /* @__PURE__ */ a(
    Lt.Item,
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
function fg({
  className: t,
  inset: e,
  children: r,
  ...o
}) {
  return /* @__PURE__ */ u(
    Lt.SubTrigger,
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
        /* @__PURE__ */ a(oi, { className: "tw:ms-auto" })
      ]
    }
  );
}
function mg({
  className: t,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: e,
  ...r
}) {
  return /* @__PURE__ */ a(
    Lt.SubContent,
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
      style: { zIndex: Oe, ...e },
      ...r
    }
  );
}
function vg({
  className: t,
  children: e,
  checked: r,
  inset: o,
  ...n
}) {
  return /* @__PURE__ */ u(
    Lt.CheckboxItem,
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
        /* @__PURE__ */ a("span", { className: "tw:pointer-events-none tw:absolute tw:end-2", children: /* @__PURE__ */ a(Lt.ItemIndicator, { children: /* @__PURE__ */ a(Ca, {}) }) }),
        e
      ]
    }
  );
}
function bg({
  className: t,
  children: e,
  inset: r,
  ...o
}) {
  return /* @__PURE__ */ u(
    Lt.RadioItem,
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
        /* @__PURE__ */ a("span", { className: "tw:pointer-events-none tw:absolute tw:end-2", children: /* @__PURE__ */ a(Lt.ItemIndicator, { children: /* @__PURE__ */ a(Ca, {}) }) }),
        e
      ]
    }
  );
}
function xg({
  className: t,
  inset: e,
  ...r
}) {
  return /* @__PURE__ */ a(
    Lt.Label,
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
function yg({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    Lt.Separator,
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
function kg({ className: t, ...e }) {
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
function _g({ ...t }) {
  return /* @__PURE__ */ a(Ke.Root, { "data-slot": "drawer", ...t });
}
function Ng({ ...t }) {
  return /* @__PURE__ */ a(Ke.Trigger, { "data-slot": "drawer-trigger", ...t });
}
function hp({ ...t }) {
  return /* @__PURE__ */ a(Ke.Portal, { "data-slot": "drawer-portal", ...t });
}
function Cg({ ...t }) {
  return /* @__PURE__ */ a(Ke.Close, { "data-slot": "drawer-close", ...t });
}
function gp({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    Ke.Overlay,
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
function Eg({
  className: t,
  children: e,
  // CUSTOM: Destructure hideDrawerHandle to conditionally render the drag handle
  hideDrawerHandle: r = !1,
  ...o
}) {
  const n = ke();
  return /* @__PURE__ */ u(hp, { "data-slot": "drawer-portal", children: [
    /* @__PURE__ */ a(gp, {}),
    /* @__PURE__ */ u(
      Ke.Content,
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
function Tg({ className: t, ...e }) {
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
function Sg({ className: t, ...e }) {
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
function Rg({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    Ke.Title,
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
function Dg({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    Ke.Description,
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
function Mg({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "empty",
      className: m(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:flex tw:w-full tw:min-w-0 tw:flex-1 tw:flex-col tw:items-center tw:justify-center tw:gap-4 tw:rounded-xl tw:border-dashed tw:p-6 tw:text-center tw:text-balance",
        t
      ),
      ...e
    }
  );
}
function zg({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "empty-header",
      className: m(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:flex tw:max-w-sm tw:flex-col tw:items-center tw:gap-2",
        t
      ),
      ...e
    }
  );
}
const fp = Io(
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
function Og({
  className: t,
  variant: e = "default",
  ...r
}) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "empty-icon",
      "data-variant": e,
      className: m(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp",
        fp({ variant: e }),
        t
      ),
      ...r
    }
  );
}
function Ig({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "empty-title",
      className: m(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:font-heading tw:text-sm tw:font-medium tw:tracking-tight",
        t
      ),
      ...e
    }
  );
}
function Pg({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "empty-description",
      className: m(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:text-sm/relaxed tw:text-muted-foreground tw:[&>a]:underline tw:[&>a]:underline-offset-4 tw:[&>a:hover]:text-primary",
        t
      ),
      ...e
    }
  );
}
function $g({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "empty-content",
      className: m(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:flex tw:w-full tw:max-w-sm tw:min-w-0 tw:flex-col tw:items-center tw:gap-2.5 tw:text-sm tw:text-balance",
        t
      ),
      ...e
    }
  );
}
function Ag({
  className: t,
  value: e,
  ...r
}) {
  return /* @__PURE__ */ a(
    cn.Root,
    {
      "data-slot": "progress",
      className: m(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:relative tw:flex tw:h-1 tw:w-full tw:items-center tw:overflow-x-hidden tw:rounded-full tw:bg-muted",
        t
      ),
      ...r,
      children: /* @__PURE__ */ a(
        cn.Indicator,
        {
          "data-slot": "progress-indicator",
          className: "tw:size-full tw:flex-1 tw:bg-primary tw:transition-all",
          style: { transform: `translateX(-${100 - (e || 0)}%)` }
        }
      )
    }
  );
}
function Vg({ ...t }) {
  const { theme: e = "system" } = Fl();
  return /* @__PURE__ */ a(
    Ul,
    {
      theme: e === "light" || e === "dark" || e === "system" ? e : "system",
      className: "tw:toaster tw:group",
      icons: {
        success: /* @__PURE__ */ a(Ac, { className: "tw:size-4" }),
        info: /* @__PURE__ */ a($c, { className: "tw:size-4" }),
        warning: /* @__PURE__ */ a(Pc, { className: "tw:size-4" }),
        error: /* @__PURE__ */ a(Ic, { className: "tw:size-4" }),
        loading: /* @__PURE__ */ a(Oc, { className: "tw:size-4 tw:animate-spin" })
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
function Lg({
  className: t,
  defaultValue: e,
  value: r,
  min: o = 0,
  max: n = 100,
  ...s
}) {
  const i = ke(), c = Wt.useMemo(
    () => Array.isArray(r) ? r : Array.isArray(e) ? e : [o, n],
    [r, e, o, n]
  );
  return /* @__PURE__ */ u(
    Yr.Root,
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
      dir: i,
      ...s,
      children: [
        /* @__PURE__ */ a(
          Yr.Track,
          {
            "data-slot": "slider-track",
            className: "tw:relative tw:grow tw:overflow-hidden tw:rounded-full tw:bg-muted tw:data-horizontal:h-1 tw:data-horizontal:w-full tw:data-vertical:h-full tw:data-vertical:w-1",
            children: /* @__PURE__ */ a(
              Yr.Range,
              {
                "data-slot": "slider-range",
                className: "tw:absolute tw:bg-primary tw:select-none tw:data-horizontal:h-full tw:data-vertical:w-full"
              }
            )
          }
        ),
        Array.from({ length: c.length }, (l, d) => /* @__PURE__ */ a(
          Yr.Thumb,
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
function jg({
  className: t,
  size: e = "default",
  ...r
}) {
  return /* @__PURE__ */ a(
    ln.Root,
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
        ln.Thumb,
        {
          "data-slot": "switch-thumb",
          className: "tw:pointer-events-none tw:block tw:rounded-full tw:bg-background tw:ring-0 tw:transition-transform tw:group-data-[size=default]/switch:size-4 tw:group-data-[size=sm]/switch:size-3 tw:group-data-[size=default]/switch:data-checked:translate-x-[calc(100%-2px)] tw:rtl:group-data-[size=default]/switch:data-checked:-translate-x-[calc(100%-2px)] tw:group-data-[size=sm]/switch:data-checked:translate-x-[calc(100%-2px)] tw:rtl:group-data-[size=sm]/switch:data-checked:-translate-x-[calc(100%-2px)] tw:dark:data-checked:bg-primary-foreground tw:group-data-[size=default]/switch:data-unchecked:translate-x-0 tw:rtl:group-data-[size=default]/switch:data-unchecked:-translate-x-0 tw:group-data-[size=sm]/switch:data-unchecked:translate-x-0 tw:rtl:group-data-[size=sm]/switch:data-unchecked:-translate-x-0 tw:dark:data-unchecked:bg-foreground"
        }
      )
    }
  );
}
function Bg({
  className: t,
  orientation: e = "horizontal",
  ...r
}) {
  return /* @__PURE__ */ a(
    he.Root,
    {
      "data-slot": "tabs",
      "data-orientation": e,
      className: m("tw:group/tabs tw:flex tw:gap-2 tw:data-horizontal:flex-col", t),
      ...r
    }
  );
}
const mp = Io(
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
function Fg({
  className: t,
  variant: e = "default",
  ...r
}) {
  const o = ke();
  return /* @__PURE__ */ a(
    he.List,
    {
      "data-slot": "tabs-list",
      "data-variant": e,
      className: m("pr-twp", mp({ variant: e }), t),
      dir: o,
      ...r
    }
  );
}
function Ug({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    he.Trigger,
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
function Kg({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    he.Content,
    {
      "data-slot": "tabs-content",
      className: m("pr-twp tw:flex-1 tw:text-sm tw:outline-none", t),
      ...e
    }
  );
}
const Hg = (t, e) => {
  Y(() => {
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
}, qg = (t, e) => {
  Y(() => {
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
        } catch (l) {
          console.error("useEventAsync: error while unsubscribing from event", l);
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
function vp(t) {
  return {
    preserveValue: !0,
    ...t
  };
}
const Gg = (t, e, r = {}) => {
  const o = U(e);
  o.current = e;
  const n = U(r);
  n.current = vp(n.current);
  const [s, i] = N(() => o.current), [c, l] = N(!0);
  return Y(() => {
    let d = !0;
    return l(!!t), (async () => {
      if (t)
        try {
          const w = await t();
          d && (i(() => w), l(!1));
        } catch (w) {
          d && l(!1), console.error(
            "usePromise: the promise factory rejected, so there is no new value",
            w
          );
        }
    })(), () => {
      d = !1, n.current.preserveValue || i(() => o.current);
    };
  }, [t]), [s, c];
};
function Yg(t) {
  Y(() => {
    let e;
    return t && (e = document.createElement("style"), e.appendChild(document.createTextNode(t)), document.head.appendChild(e)), () => {
      e && document.head.removeChild(e);
    };
  }, [t]);
}
function Wg(t) {
  const e = V(() => Nc(t).slice().sort().join(" "), [t]);
  return V(() => e ? e.split(" ") : [], [e]);
}
const bp = () => {
  const [t, e] = N(
    () => document.body.getBoundingClientRect().height > 0
  );
  return Y(() => {
    const r = new IntersectionObserver((o) => {
      const n = o[o.length - 1];
      n && e(n.isIntersecting);
    });
    return r.observe(document.body), () => {
      r.disconnect();
    };
  }, []), t;
};
function Xg(t, e) {
  const [r, o] = N(!1), n = U(e);
  n.current = e;
  const s = U(t);
  s.current = t;
  const i = F(() => {
    s.current ? n.current() : o(!0);
  }, []);
  return Y(() => {
    !t || !r || (o(!1), n.current());
  }, [t, r]), i;
}
function xp(t, e, r) {
  return t ? r.dark : e === void 0 ? r.lightDefault : r.lightUnselected;
}
function Jg(t, e) {
  const r = bp();
  return xp(t, r, e);
}
function yp(t, e = "top") {
  if (!t || typeof document > "u") return;
  const r = document.head || document.querySelector("head"), o = r.querySelector(":first-child"), n = document.createElement("style");
  n.appendChild(document.createTextNode(t)), e === "top" && o ? r.insertBefore(n, o) : r.appendChild(n);
}
yp(`.banded-row:hover {
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
@layer properties{@supports (((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))){*,:before,:after,::backdrop{--tw-translate-x:0;--tw-translate-y:0;--tw-translate-z:0;--tw-rotate-x:initial;--tw-rotate-y:initial;--tw-rotate-z:initial;--tw-skew-x:initial;--tw-skew-y:initial;--tw-space-y-reverse:0;--tw-space-x-reverse:0;--tw-divide-x-reverse:0;--tw-border-style:solid;--tw-divide-y-reverse:0;--tw-leading:initial;--tw-font-weight:initial;--tw-tracking:initial;--tw-ordinal:initial;--tw-slashed-zero:initial;--tw-numeric-figure:initial;--tw-numeric-spacing:initial;--tw-numeric-fraction:initial;--tw-shadow:0 0 #0000;--tw-shadow-color:initial;--tw-shadow-alpha:100%;--tw-inset-shadow:0 0 #0000;--tw-inset-shadow-color:initial;--tw-inset-shadow-alpha:100%;--tw-ring-color:initial;--tw-ring-shadow:0 0 #0000;--tw-inset-ring-color:initial;--tw-inset-ring-shadow:0 0 #0000;--tw-ring-inset:initial;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-offset-shadow:0 0 #0000;--tw-blur:initial;--tw-brightness:initial;--tw-contrast:initial;--tw-grayscale:initial;--tw-hue-rotate:initial;--tw-invert:initial;--tw-opacity:initial;--tw-saturate:initial;--tw-sepia:initial;--tw-drop-shadow:initial;--tw-drop-shadow-color:initial;--tw-drop-shadow-alpha:100%;--tw-drop-shadow-size:initial;--tw-duration:initial;--tw-ease:initial;--tw-content:"";--tw-backdrop-blur:initial;--tw-backdrop-brightness:initial;--tw-backdrop-contrast:initial;--tw-backdrop-grayscale:initial;--tw-backdrop-hue-rotate:initial;--tw-backdrop-invert:initial;--tw-backdrop-opacity:initial;--tw-backdrop-saturate:initial;--tw-backdrop-sepia:initial;--tw-outline-style:solid;--tw-animation-delay:0s;--tw-animation-direction:normal;--tw-animation-duration:initial;--tw-animation-fill-mode:none;--tw-animation-iteration-count:1;--tw-enter-blur:0;--tw-enter-opacity:1;--tw-enter-rotate:0;--tw-enter-scale:1;--tw-enter-translate-x:0;--tw-enter-translate-y:0;--tw-exit-blur:0;--tw-exit-opacity:1;--tw-exit-rotate:0;--tw-exit-scale:1;--tw-exit-translate-x:0;--tw-exit-translate-y:0}}}@layer theme{:root,:host{--tw-font-mono:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;--tw-color-red-100:oklch(93.6% .032 17.717);--tw-color-red-200:oklch(88.5% .062 18.334);--tw-color-red-300:oklch(80.8% .114 19.571);--tw-color-red-400:oklch(70.4% .191 22.216);--tw-color-red-500:oklch(63.7% .237 25.331);--tw-color-red-600:oklch(57.7% .245 27.325);--tw-color-red-700:oklch(50.5% .213 27.518);--tw-color-red-800:oklch(44.4% .177 26.899);--tw-color-orange-100:oklch(95.4% .038 75.164);--tw-color-orange-800:oklch(47% .157 37.304);--tw-color-amber-200:oklch(92.4% .12 95.746);--tw-color-amber-400:oklch(82.8% .189 84.429);--tw-color-amber-500:oklch(76.9% .188 70.08);--tw-color-amber-600:oklch(66.6% .179 58.318);--tw-color-yellow-50:oklch(98.7% .026 102.212);--tw-color-yellow-100:oklch(97.3% .071 103.193);--tw-color-yellow-400:oklch(85.2% .199 91.936);--tw-color-yellow-500:oklch(79.5% .184 86.047);--tw-color-yellow-600:oklch(68.1% .162 75.834);--tw-color-yellow-700:oklch(55.4% .135 66.442);--tw-color-green-50:oklch(98.2% .018 155.826);--tw-color-green-100:oklch(96.2% .044 156.743);--tw-color-green-500:oklch(72.3% .219 149.579);--tw-color-green-600:oklch(62.7% .194 149.214);--tw-color-green-700:oklch(52.7% .154 150.069);--tw-color-green-800:oklch(44.8% .119 151.328);--tw-color-teal-400:oklch(77.7% .152 181.912);--tw-color-teal-500:oklch(70.4% .14 182.503);--tw-color-teal-600:oklch(60% .118 184.704);--tw-color-sky-400:oklch(74.6% .16 232.661);--tw-color-sky-500:oklch(68.5% .169 237.323);--tw-color-sky-600:oklch(58.8% .158 241.966);--tw-color-blue-50:oklch(97% .014 254.604);--tw-color-blue-100:oklch(93.2% .032 255.585);--tw-color-blue-400:oklch(70.7% .165 254.624);--tw-color-blue-500:oklch(62.3% .214 259.815);--tw-color-blue-600:oklch(54.6% .245 262.881);--tw-color-blue-800:oklch(42.4% .199 265.638);--tw-color-indigo-200:oklch(87% .065 274.039);--tw-color-purple-50:oklch(97.7% .014 308.299);--tw-color-purple-200:oklch(90.2% .063 306.703);--tw-color-purple-900:oklch(38.1% .176 304.987);--tw-color-rose-400:oklch(71.2% .194 13.428);--tw-color-rose-500:oklch(64.5% .246 16.439);--tw-color-rose-600:oklch(58.6% .253 17.585);--tw-color-slate-300:oklch(86.9% .022 252.894);--tw-color-slate-400:oklch(70.4% .04 256.788);--tw-color-slate-900:oklch(20.8% .042 265.755);--tw-color-gray-50:oklch(98.5% .002 247.839);--tw-color-gray-100:oklch(96.7% .003 264.542);--tw-color-gray-300:oklch(87.2% .01 258.338);--tw-color-gray-500:oklch(55.1% .027 264.364);--tw-color-gray-600:oklch(44.6% .03 256.802);--tw-color-gray-700:oklch(37.3% .034 259.733);--tw-color-gray-800:oklch(27.8% .033 256.848);--tw-color-zinc-400:oklch(70.5% .015 286.067);--tw-color-neutral-300:oklch(87% 0 0);--tw-color-black:#000;--tw-color-white:#fff;--tw-container-xs:20rem;--tw-container-sm:24rem;--tw-container-md:28rem;--tw-container-lg:32rem;--tw-container-2xl:42rem;--tw-container-3xl:48rem;--tw-container-4xl:56rem;--tw-container-6xl:72rem;--tw-text-xs:.75rem;--tw-text-xs--line-height:calc(1 / .75);--tw-text-sm:.875rem;--tw-text-sm--line-height:calc(1.25 / .875);--tw-text-base:1rem;--tw-text-base--line-height:calc(1.5 / 1);--tw-text-lg:1.125rem;--tw-text-lg--line-height:calc(1.75 / 1.125);--tw-text-xl:1.25rem;--tw-text-xl--line-height:calc(1.75 / 1.25);--tw-text-2xl:1.5rem;--tw-text-2xl--line-height:calc(2 / 1.5);--tw-text-3xl:1.875rem;--tw-text-3xl--line-height:calc(2.25 / 1.875);--tw-text-4xl:2.25rem;--tw-text-4xl--line-height:calc(2.5 / 2.25);--tw-text-5xl:3rem;--tw-text-5xl--line-height:1;--tw-font-weight-normal:400;--tw-font-weight-medium:500;--tw-font-weight-semibold:600;--tw-font-weight-bold:700;--tw-font-weight-extrabold:800;--tw-tracking-tight:-.025em;--tw-tracking-wider:.05em;--tw-tracking-widest:.1em;--tw-leading-tight:1.25;--tw-leading-snug:1.375;--tw-leading-relaxed:1.625;--tw-leading-loose:2;--tw-radius-xs:.125rem;--tw-radius-md:calc(var(--radius) * .8);--tw-drop-shadow-sm:0 1px 2px #00000026;--tw-animate-spin:spin 1s linear infinite;--tw-animate-pulse:pulse 2s cubic-bezier(.4, 0, .6, 1) infinite;--tw-blur-xs:4px;--tw-blur-2xl:40px;--tw-default-transition-duration:.15s;--tw-default-transition-timing-function:cubic-bezier(.4, 0, .2, 1);--tw-default-font-family:"IBM Plex Sans Variable", sans-serif;--tw-default-mono-font-family:var(--tw-font-mono)}}@layer base{.pr-twp,.pr-twp *{border-color:var(--border);outline-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.pr-twp,.pr-twp *{outline-color:color-mix(in oklab, var(--ring) 50%, transparent)}}body.pr-twp{background-color:var(--background);color:var(--foreground)}html.pr-twp{font-family:IBM Plex Sans Variable,sans-serif}:where(.pr-twp,.pr-twp *),:where(.pr-twp,.pr-twp *):after,:where(.pr-twp,.pr-twp *):before,:where(.pr-twp,.pr-twp *) ::backdrop{box-sizing:border-box;border:0 solid;margin:0;padding:0}:where(.pr-twp,.pr-twp *) ::file-selector-button{box-sizing:border-box;border:0 solid;margin:0;padding:0}.pr-twp{-webkit-text-size-adjust:100%;tab-size:4;line-height:1.5;font-family:var(--tw-default-font-family,ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");font-feature-settings:var(--tw-default-font-feature-settings,normal);font-variation-settings:var(--tw-default-font-variation-settings,normal);-webkit-tap-highlight-color:transparent}hr:where(.pr-twp,.pr-twp *){height:0;color:inherit;border-top-width:1px}abbr:where([title]):where(.pr-twp,.pr-twp *){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1:where(.pr-twp,.pr-twp *),h2:where(.pr-twp,.pr-twp *),h3:where(.pr-twp,.pr-twp *),h4:where(.pr-twp,.pr-twp *),h5:where(.pr-twp,.pr-twp *),h6:where(.pr-twp,.pr-twp *){font-size:inherit;font-weight:inherit}a:where(.pr-twp,.pr-twp *){color:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b:where(.pr-twp,.pr-twp *),strong:where(.pr-twp,.pr-twp *){font-weight:bolder}code:where(.pr-twp,.pr-twp *),kbd:where(.pr-twp,.pr-twp *),samp:where(.pr-twp,.pr-twp *),pre:where(.pr-twp,.pr-twp *){font-family:var(--tw-default-mono-font-family,ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace);font-feature-settings:var(--tw-default-mono-font-feature-settings,normal);font-variation-settings:var(--tw-default-mono-font-variation-settings,normal);font-size:1em}small:where(.pr-twp,.pr-twp *){font-size:80%}sub:where(.pr-twp,.pr-twp *),sup:where(.pr-twp,.pr-twp *){vertical-align:baseline;font-size:75%;line-height:0;position:relative}sub:where(.pr-twp,.pr-twp *){bottom:-.25em}sup:where(.pr-twp,.pr-twp *){top:-.5em}table:where(.pr-twp,.pr-twp *){text-indent:0;border-color:inherit;border-collapse:collapse}:-moz-focusring:where(.pr-twp,.pr-twp *){outline:auto}progress:where(.pr-twp,.pr-twp *){vertical-align:baseline}summary:where(.pr-twp,.pr-twp *){display:list-item}ol:where(.pr-twp,.pr-twp *),ul:where(.pr-twp,.pr-twp *),menu:where(.pr-twp,.pr-twp *){list-style:none}img:where(.pr-twp,.pr-twp *),svg:where(.pr-twp,.pr-twp *),video:where(.pr-twp,.pr-twp *),canvas:where(.pr-twp,.pr-twp *),audio:where(.pr-twp,.pr-twp *),iframe:where(.pr-twp,.pr-twp *),embed:where(.pr-twp,.pr-twp *),object:where(.pr-twp,.pr-twp *){vertical-align:middle;display:block}img:where(.pr-twp,.pr-twp *),video:where(.pr-twp,.pr-twp *){max-width:100%;height:auto}button:where(.pr-twp,.pr-twp *),input:where(.pr-twp,.pr-twp *),select:where(.pr-twp,.pr-twp *),optgroup:where(.pr-twp,.pr-twp *),textarea:where(.pr-twp,.pr-twp *){font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(.pr-twp,.pr-twp *) ::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(select:is([multiple],[size])) optgroup:where(.pr-twp,.pr-twp *){font-weight:bolder}:where(select:is([multiple],[size])) optgroup option:where(.pr-twp,.pr-twp *){padding-inline-start:20px}:where(.pr-twp,.pr-twp *) ::file-selector-button{margin-inline-end:4px}:where(.pr-twp,.pr-twp *) ::placeholder{opacity:1}@supports (not ((-webkit-appearance:-apple-pay-button))) or (contain-intrinsic-size:1px){:where(.pr-twp,.pr-twp *) ::placeholder{color:currentColor}@supports (color:color-mix(in lab, red, red)){:where(.pr-twp,.pr-twp *) ::placeholder{color:color-mix(in oklab, currentcolor 50%, transparent)}}}textarea:where(.pr-twp,.pr-twp *){resize:vertical}:where(.pr-twp,.pr-twp *) ::-webkit-search-decoration{-webkit-appearance:none}:where(.pr-twp,.pr-twp *) ::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit{display:inline-flex}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-fields-wrapper{padding:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-year-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-month-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-day-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-hour-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-minute-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-second-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-millisecond-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-meridiem-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-calendar-picker-indicator{line-height:1}:-moz-ui-invalid:where(.pr-twp,.pr-twp *){box-shadow:none}button:where(.pr-twp,.pr-twp *),input:where([type=button],[type=reset],[type=submit]):where(.pr-twp,.pr-twp *){appearance:button}:where(.pr-twp,.pr-twp *) ::file-selector-button{appearance:button}:where(.pr-twp,.pr-twp *) ::-webkit-inner-spin-button{height:auto}:where(.pr-twp,.pr-twp *) ::-webkit-outer-spin-button{height:auto}[hidden]:where(:not([hidden=until-found])):where(.pr-twp,.pr-twp *){display:none!important}}@layer components;@layer utilities{.tw\\:\\@container\\/card-header{container:card-header/inline-size}.tw\\:\\@container\\/search{container:search/inline-size}.tw\\:\\@container\\/toolbar{container:toolbar/inline-size}.tw\\:pointer-events-auto{pointer-events:auto}.tw\\:pointer-events-none{pointer-events:none}.tw\\:invisible{visibility:hidden}.tw\\:sr-only{clip-path:inset(50%);white-space:nowrap;border-width:0;width:1px;height:1px;margin:-1px;padding:0;position:absolute;overflow:hidden}.tw\\:absolute{position:absolute}.tw\\:fixed{position:fixed}.tw\\:relative{position:relative}.tw\\:sticky{position:sticky}.tw\\:inset-0{inset:calc(calc(var(--spacing)) * 0)}.tw\\:inset-y-0{inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:inset-s-3{inset-inline-start:calc(calc(var(--spacing)) * 3)}.tw\\:start-1\\.5{inset-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:start-1\\/2{inset-inline-start:50%}.tw\\:end-0{inset-inline-end:calc(calc(var(--spacing)) * 0)}.tw\\:end-1{inset-inline-end:calc(calc(var(--spacing)) * 1)}.tw\\:end-2{inset-inline-end:calc(calc(var(--spacing)) * 2)}.tw\\:end-3{inset-inline-end:calc(calc(var(--spacing)) * 3)}.tw\\:inset-e-0{inset-inline-end:calc(calc(var(--spacing)) * 0)}.tw\\:-top-\\[1px\\]{top:-1px}.tw\\:top-0{top:calc(calc(var(--spacing)) * 0)}.tw\\:top-1{top:calc(calc(var(--spacing)) * 1)}.tw\\:top-1\\.5{top:calc(calc(var(--spacing)) * 1.5)}.tw\\:top-1\\/2{top:50%}.tw\\:top-1\\/3{top:33.3333%}.tw\\:top-2{top:calc(calc(var(--spacing)) * 2)}.tw\\:top-2\\.5{top:calc(calc(var(--spacing)) * 2.5)}.tw\\:top-3\\.5{top:calc(calc(var(--spacing)) * 3.5)}.tw\\:top-\\[-1px\\]{top:-1px}.tw\\:top-full{top:100%}.tw\\:-right-1{right:calc(calc(var(--spacing)) * -1)}.tw\\:right-0{right:calc(calc(var(--spacing)) * 0)}.tw\\:right-1{right:calc(calc(var(--spacing)) * 1)}.tw\\:right-3{right:calc(calc(var(--spacing)) * 3)}.tw\\:bottom-0{bottom:calc(calc(var(--spacing)) * 0)}.tw\\:-left-\\[1px\\]{left:-1px}.tw\\:left-0{left:calc(calc(var(--spacing)) * 0)}.tw\\:left-1\\/2{left:50%}.tw\\:left-2{left:calc(calc(var(--spacing)) * 2)}.tw\\:left-3{left:calc(calc(var(--spacing)) * 3)}.tw\\:isolate{isolation:isolate}.tw\\:z-10{z-index:10}.tw\\:z-20{z-index:20}.tw\\:z-50{z-index:50}.tw\\:order-first{order:-9999}.tw\\:order-last{order:9999}.tw\\:col-span-1{grid-column:span 1/span 1}.tw\\:col-span-2{grid-column:span 2/span 2}.tw\\:col-span-3{grid-column:span 3/span 3}.tw\\:col-start-1{grid-column-start:1}.tw\\:col-start-2{grid-column-start:2}.tw\\:row-span-2{grid-row:span 2/span 2}.tw\\:row-start-1{grid-row-start:1}.tw\\:row-start-2{grid-row-start:2}.tw\\:m-0{margin:calc(calc(var(--spacing)) * 0)}.tw\\:m-1{margin:calc(calc(var(--spacing)) * 1)}.tw\\:m-2{margin:calc(calc(var(--spacing)) * 2)}.tw\\:-mx-1{margin-inline:calc(calc(var(--spacing)) * -1)}.tw\\:-mx-4{margin-inline:calc(calc(var(--spacing)) * -4)}.tw\\:mx-0{margin-inline:calc(calc(var(--spacing)) * 0)}.tw\\:mx-1{margin-inline:calc(calc(var(--spacing)) * 1)}.tw\\:mx-2{margin-inline:calc(calc(var(--spacing)) * 2)}.tw\\:mx-3\\.5{margin-inline:calc(calc(var(--spacing)) * 3.5)}.tw\\:mx-4{margin-inline:calc(calc(var(--spacing)) * 4)}.tw\\:mx-8{margin-inline:calc(calc(var(--spacing)) * 8)}.tw\\:my-1{margin-block:calc(calc(var(--spacing)) * 1)}.tw\\:my-2\\.5{margin-block:calc(calc(var(--spacing)) * 2.5)}.tw\\:my-4{margin-block:calc(calc(var(--spacing)) * 4)}.tw\\:my-auto{margin-block:auto}.tw\\:ms-1{margin-inline-start:calc(calc(var(--spacing)) * 1)}.tw\\:ms-2{margin-inline-start:calc(calc(var(--spacing)) * 2)}.tw\\:ms-5{margin-inline-start:calc(calc(var(--spacing)) * 5)}.tw\\:ms-auto{margin-inline-start:auto}.tw\\:me-1{margin-inline-end:calc(calc(var(--spacing)) * 1)}.tw\\:me-2{margin-inline-end:calc(calc(var(--spacing)) * 2)}.tw\\:prose{color:var(--tw-prose-body);max-width:65ch}.tw\\:prose :where(p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em}.tw\\:prose :where([class~=lead]):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-lead);margin-top:1.2em;margin-bottom:1.2em;font-size:1.25em;line-height:1.6}.tw\\:prose :where(a):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-links);font-weight:500;text-decoration:underline}.tw\\:prose :where(strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-bold);font-weight:600}.tw\\:prose :where(a strong):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(blockquote strong):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(thead th strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.tw\\:prose :where(ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em;padding-inline-start:1.625em;list-style-type:decimal}.tw\\:prose :where(ol[type=A]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-alpha}.tw\\:prose :where(ol[type=a]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-alpha}.tw\\:prose :where(ol[type=A s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-alpha}.tw\\:prose :where(ol[type=a s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-alpha}.tw\\:prose :where(ol[type=I]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-roman}.tw\\:prose :where(ol[type=i]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-roman}.tw\\:prose :where(ol[type=I s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-roman}.tw\\:prose :where(ol[type=i s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-roman}.tw\\:prose :where(ol[type="1"]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:decimal}.tw\\:prose :where(ul):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em;padding-inline-start:1.625em;list-style-type:disc}.tw\\:prose :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *))::marker{color:var(--tw-prose-counters);font-weight:400}.tw\\:prose :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *))::marker{color:var(--tw-prose-bullets)}.tw\\:prose :where(dt):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:1.25em;font-weight:600}.tw\\:prose :where(hr):not(:where([class~=not-prose],[class~=not-prose] *)){border-color:var(--tw-prose-hr);border-top-width:1px;margin-top:3em;margin-bottom:3em}.tw\\:prose :where(blockquote):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-quotes);border-inline-start-width:.25rem;border-inline-start-color:var(--tw-prose-quote-borders);quotes:"“""”""‘""’";margin-top:1.6em;margin-bottom:1.6em;padding-inline-start:1em;font-style:italic;font-weight:500}.tw\\:prose :where(blockquote p:first-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):before{content:open-quote}.tw\\:prose :where(blockquote p:last-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:close-quote}.tw\\:prose :where(h1):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:0;margin-bottom:.888889em;font-size:2.25em;font-weight:800;line-height:1.11111}.tw\\:prose :where(h1 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:900}.tw\\:prose :where(h2):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:2em;margin-bottom:1em;font-size:1.5em;font-weight:700;line-height:1.33333}.tw\\:prose :where(h2 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:800}.tw\\:prose :where(h3):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:1.6em;margin-bottom:.6em;font-size:1.25em;font-weight:600;line-height:1.6}.tw\\:prose :where(h3 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:700}.tw\\:prose :where(h4):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:1.5em;margin-bottom:.5em;font-weight:600;line-height:1.5}.tw\\:prose :where(h4 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:700}.tw\\:prose :where(img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.tw\\:prose :where(picture):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em;display:block}.tw\\:prose :where(video):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.tw\\:prose :where(kbd):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-kbd);box-shadow:0 0 0 1px rgb(var(--tw-prose-kbd-shadows) / 10%), 0 3px 0 rgb(var(--tw-prose-kbd-shadows) / 10%);padding-top:.1875em;padding-inline-end:.375em;padding-bottom:.1875em;border-radius:.3125rem;padding-inline-start:.375em;font-family:inherit;font-size:.875em;font-weight:500}.tw\\:prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-code);font-size:.875em;font-weight:600}.tw\\:prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)):before,.tw\\:prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:"\`"}.tw\\:prose :where(a code):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h1 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.tw\\:prose :where(h2 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-size:.875em}.tw\\:prose :where(h3 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-size:.9em}.tw\\:prose :where(h4 code):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(blockquote code):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(thead th code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.tw\\:prose :where(pre):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-pre-code);background-color:var(--tw-prose-pre-bg);padding-top:.857143em;padding-inline-end:1.14286em;padding-bottom:.857143em;border-radius:.375rem;margin-top:1.71429em;margin-bottom:1.71429em;padding-inline-start:1.14286em;font-size:.875em;font-weight:400;line-height:1.71429;overflow-x:auto}.tw\\:prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)){font-weight:inherit;color:inherit;font-size:inherit;font-family:inherit;line-height:inherit;background-color:#0000;border-width:0;border-radius:0;padding:0}.tw\\:prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)):before,.tw\\:prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:none}.tw\\:prose :where(table):not(:where([class~=not-prose],[class~=not-prose] *)){table-layout:auto;width:100%;margin-top:2em;margin-bottom:2em;font-size:.875em;line-height:1.71429}.tw\\:prose :where(thead):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:1px;border-bottom-color:var(--tw-prose-th-borders)}.tw\\:prose :where(thead th):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);vertical-align:bottom;padding-inline-end:.571429em;padding-bottom:.571429em;padding-inline-start:.571429em;font-weight:600}.tw\\:prose :where(tbody tr):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:1px;border-bottom-color:var(--tw-prose-td-borders)}.tw\\:prose :where(tbody tr:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:0}.tw\\:prose :where(tbody td):not(:where([class~=not-prose],[class~=not-prose] *)){vertical-align:baseline}.tw\\:prose :where(tfoot):not(:where([class~=not-prose],[class~=not-prose] *)){border-top-width:1px;border-top-color:var(--tw-prose-th-borders)}.tw\\:prose :where(tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){vertical-align:top}.tw\\:prose :where(th,td):not(:where([class~=not-prose],[class~=not-prose] *)){text-align:start}.tw\\:prose :where(figure>*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose :where(figcaption):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-captions);margin-top:.857143em;font-size:.875em;line-height:1.42857}.tw\\:prose{--tw-prose-body:var(--foreground);--tw-prose-headings:var(--foreground);--tw-prose-lead:var(--muted-foreground);--tw-prose-links:var(--primary);--tw-prose-bold:var(--foreground);--tw-prose-counters:var(--muted-foreground);--tw-prose-bullets:var(--muted-foreground);--tw-prose-hr:var(--border);--tw-prose-quotes:var(--foreground);--tw-prose-quote-borders:var(--border);--tw-prose-captions:var(--muted-foreground);--tw-prose-kbd:oklch(21% .034 264.665);--tw-prose-kbd-shadows:NaN NaN NaN;--tw-prose-code:var(--foreground);--tw-prose-pre-code:var(--muted-foreground);--tw-prose-pre-bg:var(--muted);--tw-prose-th-borders:var(--border);--tw-prose-td-borders:var(--border);--tw-prose-invert-body:var(--foreground);--tw-prose-invert-headings:var(--foreground);--tw-prose-invert-lead:var(--muted-foreground);--tw-prose-invert-links:var(--primary);--tw-prose-invert-bold:var(--foreground);--tw-prose-invert-counters:var(--muted-foreground);--tw-prose-invert-bullets:var(--muted-foreground);--tw-prose-invert-hr:var(--border);--tw-prose-invert-quotes:var(--foreground);--tw-prose-invert-quote-borders:var(--border);--tw-prose-invert-captions:var(--muted-foreground);--tw-prose-invert-kbd:#fff;--tw-prose-invert-kbd-shadows:255 255 255;--tw-prose-invert-code:var(--foreground);--tw-prose-invert-pre-code:var(--muted-foreground);--tw-prose-invert-pre-bg:var(--muted);--tw-prose-invert-th-borders:var(--border);--tw-prose-invert-td-borders:var(--border);font-size:1rem;line-height:1.75}.tw\\:prose :where(picture>img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose :where(li):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.5em;margin-bottom:.5em}.tw\\:prose :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:.375em}.tw\\:prose :where(.tw\\:prose>ul>li p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.75em;margin-bottom:.75em}.tw\\:prose :where(.tw\\:prose>ul>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em}.tw\\:prose :where(.tw\\:prose>ul>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.25em}.tw\\:prose :where(.tw\\:prose>ol>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em}.tw\\:prose :where(.tw\\:prose>ol>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.25em}.tw\\:prose :where(ul ul,ul ol,ol ul,ol ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.75em;margin-bottom:.75em}.tw\\:prose :where(dl):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em}.tw\\:prose :where(dd):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.5em;padding-inline-start:1.625em}.tw\\:prose :where(hr+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h2+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h3+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h4+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose :where(thead th:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose :where(thead th:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose :where(tbody td,tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.571429em;padding-inline-end:.571429em;padding-bottom:.571429em;padding-inline-start:.571429em}.tw\\:prose :where(tbody td:first-child,tfoot td:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose :where(tbody td:last-child,tfoot td:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose :where(figure):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.tw\\:prose :where(.tw\\:prose>:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose :where(.tw\\:prose>:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:0}.tw\\:prose-sm{font-size:.875rem;line-height:1.71429}.tw\\:prose-sm :where(p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em;margin-bottom:1.14286em}.tw\\:prose-sm :where([class~=lead]):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.888889em;margin-bottom:.888889em;font-size:1.28571em;line-height:1.55556}.tw\\:prose-sm :where(blockquote):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.33333em;margin-bottom:1.33333em;padding-inline-start:1.11111em}.tw\\:prose-sm :where(h1):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:.8em;font-size:2.14286em;line-height:1.2}.tw\\:prose-sm :where(h2):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.6em;margin-bottom:.8em;font-size:1.42857em;line-height:1.4}.tw\\:prose-sm :where(h3):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.55556em;margin-bottom:.444444em;font-size:1.28571em;line-height:1.55556}.tw\\:prose-sm :where(h4):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.42857em;margin-bottom:.571429em;line-height:1.42857}.tw\\:prose-sm :where(img):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(picture):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.71429em;margin-bottom:1.71429em}.tw\\:prose-sm :where(picture>img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose-sm :where(video):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.71429em;margin-bottom:1.71429em}.tw\\:prose-sm :where(kbd):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.142857em;padding-inline-end:.357143em;padding-bottom:.142857em;border-radius:.3125rem;padding-inline-start:.357143em;font-size:.857143em}.tw\\:prose-sm :where(code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.857143em}.tw\\:prose-sm :where(h2 code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.9em}.tw\\:prose-sm :where(h3 code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.888889em}.tw\\:prose-sm :where(pre):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.666667em;padding-inline-end:1em;padding-bottom:.666667em;border-radius:.25rem;margin-top:1.66667em;margin-bottom:1.66667em;padding-inline-start:1em;font-size:.857143em;line-height:1.66667}.tw\\:prose-sm :where(ol):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(ul):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em;margin-bottom:1.14286em;padding-inline-start:1.57143em}.tw\\:prose-sm :where(li):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.285714em;margin-bottom:.285714em}.tw\\:prose-sm :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:.428571em}.tw\\:prose-sm :where(.tw\\:prose-sm>ul>li p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.571429em;margin-bottom:.571429em}.tw\\:prose-sm :where(.tw\\:prose-sm>ul>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em}.tw\\:prose-sm :where(.tw\\:prose-sm>ul>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.14286em}.tw\\:prose-sm :where(.tw\\:prose-sm>ol>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em}.tw\\:prose-sm :where(.tw\\:prose-sm>ol>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.14286em}.tw\\:prose-sm :where(ul ul,ul ol,ol ul,ol ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.571429em;margin-bottom:.571429em}.tw\\:prose-sm :where(dl):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em;margin-bottom:1.14286em}.tw\\:prose-sm :where(dt):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em}.tw\\:prose-sm :where(dd):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.285714em;padding-inline-start:1.57143em}.tw\\:prose-sm :where(hr):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2.85714em;margin-bottom:2.85714em}.tw\\:prose-sm :where(hr+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(h2+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(h3+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(h4+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose-sm :where(table):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.857143em;line-height:1.5}.tw\\:prose-sm :where(thead th):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:1em;padding-bottom:.666667em;padding-inline-start:1em}.tw\\:prose-sm :where(thead th:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose-sm :where(thead th:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose-sm :where(tbody td,tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.666667em;padding-inline-end:1em;padding-bottom:.666667em;padding-inline-start:1em}.tw\\:prose-sm :where(tbody td:first-child,tfoot td:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose-sm :where(tbody td:last-child,tfoot td:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose-sm :where(figure):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.71429em;margin-bottom:1.71429em}.tw\\:prose-sm :where(figure>*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose-sm :where(figcaption):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.666667em;font-size:.857143em;line-height:1.33333}.tw\\:prose-sm :where(.tw\\:prose-sm>:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose-sm :where(.tw\\:prose-sm>:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:0}.tw\\:-mt-4{margin-top:calc(calc(var(--spacing)) * -4)}.tw\\:mt-0\\.5{margin-top:calc(calc(var(--spacing)) * .5)}.tw\\:mt-1{margin-top:calc(calc(var(--spacing)) * 1)}.tw\\:mt-2{margin-top:calc(calc(var(--spacing)) * 2)}.tw\\:mt-3{margin-top:calc(calc(var(--spacing)) * 3)}.tw\\:mt-4{margin-top:calc(calc(var(--spacing)) * 4)}.tw\\:mt-6{margin-top:calc(calc(var(--spacing)) * 6)}.tw\\:mt-auto{margin-top:auto}.tw\\:mr-1{margin-right:calc(calc(var(--spacing)) * 1)}.tw\\:mr-2{margin-right:calc(calc(var(--spacing)) * 2)}.tw\\:mr-3{margin-right:calc(calc(var(--spacing)) * 3)}.tw\\:-mb-4{margin-bottom:calc(calc(var(--spacing)) * -4)}.tw\\:mb-1{margin-bottom:calc(calc(var(--spacing)) * 1)}.tw\\:mb-2{margin-bottom:calc(calc(var(--spacing)) * 2)}.tw\\:mb-3{margin-bottom:calc(calc(var(--spacing)) * 3)}.tw\\:mb-4{margin-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:ml-1{margin-left:calc(calc(var(--spacing)) * 1)}.tw\\:ml-2{margin-left:calc(calc(var(--spacing)) * 2)}.tw\\:ml-4{margin-left:calc(calc(var(--spacing)) * 4)}.tw\\:ml-auto{margin-left:auto}.tw\\:box-border{box-sizing:border-box}.tw\\:line-clamp-3{-webkit-line-clamp:3;-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden}.tw\\:no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}.tw\\:no-scrollbar::-webkit-scrollbar{display:none}.tw\\:block{display:block}.tw\\:flex{display:flex}.tw\\:grid{display:grid}.tw\\:hidden{display:none}.tw\\:inline-block{display:inline-block}.tw\\:inline-flex{display:inline-flex}.tw\\:inline-grid{display:inline-grid}.tw\\:field-sizing-content{field-sizing:content}.tw\\:aspect-square{aspect-ratio:1}.tw\\:size-2{width:calc(calc(var(--spacing)) * 2);height:calc(calc(var(--spacing)) * 2)}.tw\\:size-2\\.5{width:calc(calc(var(--spacing)) * 2.5);height:calc(calc(var(--spacing)) * 2.5)}.tw\\:size-3{width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:size-3\\.5{width:calc(calc(var(--spacing)) * 3.5);height:calc(calc(var(--spacing)) * 3.5)}.tw\\:size-4{width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:size-6{width:calc(calc(var(--spacing)) * 6);height:calc(calc(var(--spacing)) * 6)}.tw\\:size-7{width:calc(calc(var(--spacing)) * 7);height:calc(calc(var(--spacing)) * 7)}.tw\\:size-8{width:calc(calc(var(--spacing)) * 8);height:calc(calc(var(--spacing)) * 8)}.tw\\:size-9{width:calc(calc(var(--spacing)) * 9);height:calc(calc(var(--spacing)) * 9)}.tw\\:size-10{width:calc(calc(var(--spacing)) * 10);height:calc(calc(var(--spacing)) * 10)}.tw\\:size-full{width:100%;height:100%}.tw\\:h-1{height:calc(calc(var(--spacing)) * 1)}.tw\\:h-2{height:calc(calc(var(--spacing)) * 2)}.tw\\:h-3{height:calc(calc(var(--spacing)) * 3)}.tw\\:h-3\\.5{height:calc(calc(var(--spacing)) * 3.5)}.tw\\:h-4{height:calc(calc(var(--spacing)) * 4)}.tw\\:h-5{height:calc(calc(var(--spacing)) * 5)}.tw\\:h-6{height:calc(calc(var(--spacing)) * 6)}.tw\\:h-7{height:calc(calc(var(--spacing)) * 7)}.tw\\:h-8{height:calc(calc(var(--spacing)) * 8)}.tw\\:h-8\\!{height:calc(calc(var(--spacing)) * 8)!important}.tw\\:h-8\\.5{height:calc(calc(var(--spacing)) * 8.5)}.tw\\:h-9{height:calc(calc(var(--spacing)) * 9)}.tw\\:h-10{height:calc(calc(var(--spacing)) * 10)}.tw\\:h-12{height:calc(calc(var(--spacing)) * 12)}.tw\\:h-14{height:calc(calc(var(--spacing)) * 14)}.tw\\:h-20{height:calc(calc(var(--spacing)) * 20)}.tw\\:h-24{height:calc(calc(var(--spacing)) * 24)}.tw\\:h-32{height:calc(calc(var(--spacing)) * 32)}.tw\\:h-40{height:calc(calc(var(--spacing)) * 40)}.tw\\:h-64{height:calc(calc(var(--spacing)) * 64)}.tw\\:h-80{height:calc(calc(var(--spacing)) * 80)}.tw\\:h-96{height:calc(calc(var(--spacing)) * 96)}.tw\\:h-\\[5px\\]{height:5px}.tw\\:h-\\[260px\\]{height:260px}.tw\\:h-\\[300px\\]{height:300px}.tw\\:h-\\[400px\\]{height:400px}.tw\\:h-\\[600px\\]{height:600px}.tw\\:h-\\[calc\\(100\\%-1px\\)\\]{height:calc(100% - 1px)}.tw\\:h-\\[calc\\(100\\%-2px\\)\\]{height:calc(100% - 2px)}.tw\\:h-auto{height:auto}.tw\\:h-full{height:100%}.tw\\:h-px{height:1px}.tw\\:h-screen{height:100vh}.tw\\:h-svh{height:100svh}.tw\\:max-h-\\(--radix-context-menu-content-available-height\\){max-height:var(--radix-context-menu-content-available-height)}.tw\\:max-h-\\(--radix-dropdown-menu-content-available-height\\){max-height:var(--radix-dropdown-menu-content-available-height)}.tw\\:max-h-\\(--radix-popover-content-available-height\\){max-height:var(--radix-popover-content-available-height)}.tw\\:max-h-\\(--radix-select-content-available-height\\){max-height:var(--radix-select-content-available-height)}.tw\\:max-h-5{max-height:calc(calc(var(--spacing)) * 5)}.tw\\:max-h-10{max-height:calc(calc(var(--spacing)) * 10)}.tw\\:max-h-72{max-height:calc(calc(var(--spacing)) * 72)}.tw\\:max-h-80{max-height:calc(calc(var(--spacing)) * 80)}.tw\\:max-h-\\[96\\%\\]{max-height:96%}.tw\\:max-h-\\[300px\\]{max-height:300px}.tw\\:min-h-0{min-height:calc(calc(var(--spacing)) * 0)}.tw\\:min-h-11{min-height:calc(calc(var(--spacing)) * 11)}.tw\\:min-h-16{min-height:calc(calc(var(--spacing)) * 16)}.tw\\:min-h-\\[200px\\]{min-height:200px}.tw\\:min-h-full{min-height:100%}.tw\\:min-h-svh{min-height:100svh}.tw\\:w-\\(--radix-dropdown-menu-trigger-width\\){width:var(--radix-dropdown-menu-trigger-width)}.tw\\:w-\\(--sidebar-width\\){width:var(--sidebar-width)}.tw\\:w-1{width:calc(calc(var(--spacing)) * 1)}.tw\\:w-1\\/2{width:50%}.tw\\:w-2{width:calc(calc(var(--spacing)) * 2)}.tw\\:w-3{width:calc(calc(var(--spacing)) * 3)}.tw\\:w-3\\.5{width:calc(calc(var(--spacing)) * 3.5)}.tw\\:w-3\\/4{width:75%}.tw\\:w-4{width:calc(calc(var(--spacing)) * 4)}.tw\\:w-4\\/5{width:80%}.tw\\:w-4\\/6{width:66.6667%}.tw\\:w-5{width:calc(calc(var(--spacing)) * 5)}.tw\\:w-5\\/6{width:83.3333%}.tw\\:w-6{width:calc(calc(var(--spacing)) * 6)}.tw\\:w-8{width:calc(calc(var(--spacing)) * 8)}.tw\\:w-9{width:calc(calc(var(--spacing)) * 9)}.tw\\:w-9\\/12{width:75%}.tw\\:w-10{width:calc(calc(var(--spacing)) * 10)}.tw\\:w-12{width:calc(calc(var(--spacing)) * 12)}.tw\\:w-14{width:calc(calc(var(--spacing)) * 14)}.tw\\:w-20{width:calc(calc(var(--spacing)) * 20)}.tw\\:w-24{width:calc(calc(var(--spacing)) * 24)}.tw\\:w-32{width:calc(calc(var(--spacing)) * 32)}.tw\\:w-48{width:calc(calc(var(--spacing)) * 48)}.tw\\:w-56{width:calc(calc(var(--spacing)) * 56)}.tw\\:w-60{width:calc(calc(var(--spacing)) * 60)}.tw\\:w-64{width:calc(calc(var(--spacing)) * 64)}.tw\\:w-72{width:calc(calc(var(--spacing)) * 72)}.tw\\:w-80{width:calc(calc(var(--spacing)) * 80)}.tw\\:w-96{width:calc(calc(var(--spacing)) * 96)}.tw\\:w-\\[1px\\]{width:1px}.tw\\:w-\\[5px\\]{width:5px}.tw\\:w-\\[70px\\]{width:70px}.tw\\:w-\\[100px\\]{width:100px}.tw\\:w-\\[116px\\]{width:116px}.tw\\:w-\\[124px\\]{width:124px}.tw\\:w-\\[150px\\]{width:150px}.tw\\:w-\\[180px\\]{width:180px}.tw\\:w-\\[200px\\]{width:200px}.tw\\:w-\\[250px\\]{width:250px}.tw\\:w-\\[260px\\]{width:260px}.tw\\:w-\\[280px\\]{width:280px}.tw\\:w-\\[300px\\]{width:300px}.tw\\:w-\\[320px\\]{width:320px}.tw\\:w-\\[350px\\]{width:350px}.tw\\:w-\\[400px\\]{width:400px}.tw\\:w-\\[420px\\]{width:420px}.tw\\:w-\\[500px\\]{width:500px}.tw\\:w-\\[560px\\]{width:560px}.tw\\:w-\\[600px\\]{width:600px}.tw\\:w-\\[calc\\(100\\%-2px\\)\\]{width:calc(100% - 2px)}.tw\\:w-\\[var\\(--radix-dropdown-menu-trigger-width\\)\\]{width:var(--radix-dropdown-menu-trigger-width)}.tw\\:w-auto{width:auto}.tw\\:w-fit{width:fit-content}.tw\\:w-full{width:100%}.tw\\:w-max{width:max-content}.tw\\:w-px{width:1px}.tw\\:max-w-\\(--skeleton-width\\){max-width:var(--skeleton-width)}.tw\\:max-w-2xl{max-width:var(--tw-container-2xl)}.tw\\:max-w-3xl{max-width:var(--tw-container-3xl)}.tw\\:max-w-4xl{max-width:var(--tw-container-4xl)}.tw\\:max-w-5{max-width:calc(calc(var(--spacing)) * 5)}.tw\\:max-w-6xl{max-width:var(--tw-container-6xl)}.tw\\:max-w-40{max-width:calc(calc(var(--spacing)) * 40)}.tw\\:max-w-48{max-width:calc(calc(var(--spacing)) * 48)}.tw\\:max-w-64{max-width:calc(calc(var(--spacing)) * 64)}.tw\\:max-w-96{max-width:calc(calc(var(--spacing)) * 96)}.tw\\:max-w-\\[200px\\]{max-width:200px}.tw\\:max-w-\\[220px\\]{max-width:220px}.tw\\:max-w-\\[calc\\(100\\%-2rem\\)\\]{max-width:calc(100% - 2rem)}.tw\\:max-w-\\[calc\\(100vw-2rem\\)\\]{max-width:calc(100vw - 2rem)}.tw\\:max-w-fit{max-width:fit-content}.tw\\:max-w-full{max-width:100%}.tw\\:max-w-lg{max-width:var(--tw-container-lg)}.tw\\:max-w-md{max-width:var(--tw-container-md)}.tw\\:max-w-none{max-width:none}.tw\\:max-w-sm{max-width:var(--tw-container-sm)}.tw\\:max-w-xs{max-width:var(--tw-container-xs)}.tw\\:min-w-0{min-width:calc(calc(var(--spacing)) * 0)}.tw\\:min-w-4{min-width:calc(calc(var(--spacing)) * 4)}.tw\\:min-w-5{min-width:calc(calc(var(--spacing)) * 5)}.tw\\:min-w-7{min-width:calc(calc(var(--spacing)) * 7)}.tw\\:min-w-8{min-width:calc(calc(var(--spacing)) * 8)}.tw\\:min-w-9{min-width:calc(calc(var(--spacing)) * 9)}.tw\\:min-w-16{min-width:calc(calc(var(--spacing)) * 16)}.tw\\:min-w-32{min-width:calc(calc(var(--spacing)) * 32)}.tw\\:min-w-36{min-width:calc(calc(var(--spacing)) * 36)}.tw\\:min-w-80{min-width:calc(calc(var(--spacing)) * 80)}.tw\\:min-w-\\[12rem\\]{min-width:12rem}.tw\\:min-w-\\[26px\\]{min-width:26px}.tw\\:min-w-\\[96px\\]{min-width:96px}.tw\\:min-w-\\[140px\\]{min-width:140px}.tw\\:min-w-\\[215px\\]{min-width:215px}.tw\\:min-w-\\[500px\\]{min-width:500px}.tw\\:min-w-min{min-width:min-content}.tw\\:flex-1{flex:1}.tw\\:shrink{flex-shrink:1}.tw\\:shrink-0{flex-shrink:0}.tw\\:shrink-\\[9999\\]{flex-shrink:9999}.tw\\:flex-grow,.tw\\:grow,.tw\\:grow-\\[1\\]{flex-grow:1}.tw\\:grow-\\[10\\]{flex-grow:10}.tw\\:basis-0{flex-basis:calc(calc(var(--spacing)) * 0)}.tw\\:caption-bottom{caption-side:bottom}.tw\\:border-collapse{border-collapse:collapse}.tw\\:origin-\\(--radix-context-menu-content-transform-origin\\){transform-origin:var(--radix-context-menu-content-transform-origin)}.tw\\:origin-\\(--radix-dropdown-menu-content-transform-origin\\){transform-origin:var(--radix-dropdown-menu-content-transform-origin)}.tw\\:origin-\\(--radix-menubar-content-transform-origin\\){transform-origin:var(--radix-menubar-content-transform-origin)}.tw\\:origin-\\(--radix-popover-content-transform-origin\\){transform-origin:var(--radix-popover-content-transform-origin)}.tw\\:origin-\\(--radix-select-content-transform-origin\\){transform-origin:var(--radix-select-content-transform-origin)}.tw\\:origin-\\(--radix-tooltip-content-transform-origin\\){transform-origin:var(--radix-tooltip-content-transform-origin)}.tw\\:-translate-x-1\\/2{--tw-translate-x:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:-translate-x-px{--tw-translate-x:-1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:translate-x-px{--tw-translate-x:1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:-translate-y-1\\/2{--tw-translate-y:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:translate-y-0{--tw-translate-y:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:translate-y-px{--tw-translate-y:1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rotate-45{rotate:45deg}.tw\\:rotate-180{rotate:180deg}.tw\\:transform{transform:var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,)}.tw\\:animate-none\\!{animation:none!important}.tw\\:animate-pulse{animation:var(--tw-animate-pulse)}.tw\\:animate-spin{animation:var(--tw-animate-spin)}.tw\\:cursor-default{cursor:default}.tw\\:cursor-ew-resize{cursor:ew-resize}.tw\\:cursor-not-allowed{cursor:not-allowed}.tw\\:cursor-pointer{cursor:pointer}.tw\\:cursor-text{cursor:text}.tw\\:touch-none{touch-action:none}.tw\\:resize{resize:both}.tw\\:resize-none{resize:none}.tw\\:scroll-m-20{scroll-margin:calc(calc(var(--spacing)) * 20)}.tw\\:scroll-my-1{scroll-margin-block:calc(calc(var(--spacing)) * 1)}.tw\\:scroll-py-1{scroll-padding-block:calc(calc(var(--spacing)) * 1)}.tw\\:list-inside{list-style-position:inside}.tw\\:list-outside{list-style-position:outside}.tw\\:\\!list-\\[lower-alpha\\]{list-style-type:lower-alpha!important}.tw\\:\\!list-\\[lower-roman\\]{list-style-type:lower-roman!important}.tw\\:\\!list-\\[upper-alpha\\]{list-style-type:upper-alpha!important}.tw\\:\\!list-\\[upper-roman\\]{list-style-type:upper-roman!important}.tw\\:\\!list-decimal{list-style-type:decimal!important}.tw\\:\\!list-disc{list-style-type:disc!important}.tw\\:list-decimal{list-style-type:decimal}.tw\\:list-disc{list-style-type:disc}.tw\\:list-none{list-style-type:none}.tw\\:grid-flow-col{grid-auto-flow:column}.tw\\:grid-flow-row{grid-auto-flow:row}.tw\\:auto-rows-min{grid-auto-rows:min-content}.tw\\:grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}.tw\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.tw\\:grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.tw\\:grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}.tw\\:grid-cols-\\[25\\%_25\\%_50\\%\\]{grid-template-columns:25% 25% 50%}.tw\\:grid-cols-\\[25\\%_50\\%_25\\%\\]{grid-template-columns:25% 50% 25%}.tw\\:grid-cols-\\[auto_auto_auto_auto\\]{grid-template-columns:auto auto auto auto}.tw\\:grid-cols-\\[min-content_1fr\\]{grid-template-columns:min-content 1fr}.tw\\:grid-cols-\\[min-content_min-content_1fr\\]{grid-template-columns:min-content min-content 1fr}.tw\\:grid-cols-subgrid{grid-template-columns:subgrid}.tw\\:flex-col{flex-direction:column}.tw\\:flex-col-reverse{flex-direction:column-reverse}.tw\\:flex-row{flex-direction:row}.tw\\:flex-row-reverse{flex-direction:row-reverse}.tw\\:flex-nowrap{flex-wrap:nowrap}.tw\\:flex-wrap{flex-wrap:wrap}.tw\\:place-content-center{place-content:center}.tw\\:content-center{align-content:center}.tw\\:items-baseline{align-items:baseline}.tw\\:items-center{align-items:center}.tw\\:items-end{align-items:flex-end}.tw\\:items-start{align-items:flex-start}.tw\\:items-stretch{align-items:stretch}.tw\\:justify-between{justify-content:space-between}.tw\\:justify-center{justify-content:center}.tw\\:justify-end{justify-content:flex-end}.tw\\:justify-start{justify-content:flex-start}.tw\\:gap-0{gap:calc(calc(var(--spacing)) * 0)}.tw\\:gap-0\\.5{gap:calc(calc(var(--spacing)) * .5)}.tw\\:gap-1{gap:calc(calc(var(--spacing)) * 1)}.tw\\:gap-1\\.5{gap:calc(calc(var(--spacing)) * 1.5)}.tw\\:gap-1\\.5\\!{gap:calc(calc(var(--spacing)) * 1.5)!important}.tw\\:gap-2{gap:calc(calc(var(--spacing)) * 2)}.tw\\:gap-2\\.5{gap:calc(calc(var(--spacing)) * 2.5)}.tw\\:gap-3{gap:calc(calc(var(--spacing)) * 3)}.tw\\:gap-4{gap:calc(calc(var(--spacing)) * 4)}.tw\\:gap-5{gap:calc(calc(var(--spacing)) * 5)}.tw\\:gap-6{gap:calc(calc(var(--spacing)) * 6)}.tw\\:gap-16{gap:calc(calc(var(--spacing)) * 16)}.tw\\:gap-\\[--spacing\\(var\\(--gap\\)\\)\\]{gap:calc(calc(var(--spacing)) * var(--gap))}.tw\\:gap-\\[12px\\]{gap:12px}:where(.tw\\:space-y-1>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 1) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 1) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-1\\.5>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 1.5) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 1.5) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-2>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 2) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 2) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-3>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 3) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 3) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-4>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 4) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 4) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-6>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 6) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 6) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-8>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 8) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 8) * calc(1 - var(--tw-space-y-reverse)))}.tw\\:gap-x-1{column-gap:calc(calc(var(--spacing)) * 1)}.tw\\:gap-x-2{column-gap:calc(calc(var(--spacing)) * 2)}.tw\\:gap-x-3{column-gap:calc(calc(var(--spacing)) * 3)}.tw\\:gap-x-4{column-gap:calc(calc(var(--spacing)) * 4)}:where(.tw\\:-space-x-2>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * -2) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * -2) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-2>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 2) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 2) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-3>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 3) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 3) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-4>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 4) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 4) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-6>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 6) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 6) * calc(1 - var(--tw-space-x-reverse)))}.tw\\:gap-y-1{row-gap:calc(calc(var(--spacing)) * 1)}.tw\\:gap-y-2{row-gap:calc(calc(var(--spacing)) * 2)}:where(.tw\\:divide-x>:not(:last-child)){--tw-divide-x-reverse:0;border-inline-style:var(--tw-border-style);border-inline-start-width:calc(1px * var(--tw-divide-x-reverse));border-inline-end-width:calc(1px * calc(1 - var(--tw-divide-x-reverse)))}:where(.tw\\:divide-y>:not(:last-child)){--tw-divide-y-reverse:0;border-bottom-style:var(--tw-border-style);border-top-style:var(--tw-border-style);border-top-width:calc(1px * var(--tw-divide-y-reverse));border-bottom-width:calc(1px * calc(1 - var(--tw-divide-y-reverse)))}.tw\\:self-start{align-self:flex-start}.tw\\:self-stretch{align-self:stretch}.tw\\:justify-self-end{justify-self:flex-end}.tw\\:truncate{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.tw\\:overflow-auto{overflow:auto}.tw\\:overflow-clip{overflow:clip}.tw\\:overflow-hidden{overflow:hidden}.tw\\:overflow-scroll{overflow:scroll}.tw\\:overflow-visible{overflow:visible}.tw\\:overflow-x-auto{overflow-x:auto}.tw\\:overflow-x-hidden{overflow-x:hidden}.tw\\:overflow-y-auto{overflow-y:auto}.tw\\:overflow-y-hidden{overflow-y:hidden}.tw\\:rounded{border-radius:.25rem}.tw\\:rounded-2xl{border-radius:calc(var(--radius) * 1.8)}.tw\\:rounded-4xl{border-radius:calc(var(--radius) * 2.6)}.tw\\:rounded-\\[4px\\]{border-radius:4px}.tw\\:rounded-\\[6px\\]{border-radius:6px}.tw\\:rounded-\\[calc\\(var\\(--radius\\)-3px\\)\\]{border-radius:calc(var(--radius) - 3px)}.tw\\:rounded-\\[min\\(var\\(--tw-radius-md\\)\\,10px\\)\\]{border-radius:min(var(--tw-radius-md), 10px)}.tw\\:rounded-\\[min\\(var\\(--tw-radius-md\\)\\,12px\\)\\]{border-radius:min(var(--tw-radius-md), 12px)}.tw\\:rounded-full{border-radius:3.40282e38px}.tw\\:rounded-lg{border-radius:var(--radius)}.tw\\:rounded-lg\\!{border-radius:var(--radius)!important}.tw\\:rounded-md{border-radius:calc(var(--radius) * .8)}.tw\\:rounded-none{border-radius:0}.tw\\:rounded-sm{border-radius:calc(var(--radius) * .6)}.tw\\:rounded-xl{border-radius:calc(var(--radius) * 1.4)}.tw\\:rounded-xl\\!{border-radius:calc(var(--radius) * 1.4)!important}.tw\\:rounded-xs{border-radius:var(--tw-radius-xs)}.tw\\:rounded-s-none{border-start-start-radius:0;border-end-start-radius:0}.tw\\:rounded-e-none{border-start-end-radius:0;border-end-end-radius:0}.tw\\:rounded-t-xl{border-top-left-radius:calc(var(--radius) * 1.4);border-top-right-radius:calc(var(--radius) * 1.4)}.tw\\:rounded-l-lg{border-top-left-radius:var(--radius);border-bottom-left-radius:var(--radius)}.tw\\:rounded-r-xl{border-top-right-radius:calc(var(--radius) * 1.4);border-bottom-right-radius:calc(var(--radius) * 1.4)}.tw\\:rounded-b-xl{border-bottom-right-radius:calc(var(--radius) * 1.4);border-bottom-left-radius:calc(var(--radius) * 1.4)}.tw\\:border{border-style:var(--tw-border-style);border-width:1px}.tw\\:border-0{border-style:var(--tw-border-style);border-width:0}.tw\\:border-2{border-style:var(--tw-border-style);border-width:2px}.tw\\:border-s{border-inline-start-style:var(--tw-border-style);border-inline-start-width:1px}.tw\\:border-s-0{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:border-s-2{border-inline-start-style:var(--tw-border-style);border-inline-start-width:2px}.tw\\:border-e{border-inline-end-style:var(--tw-border-style);border-inline-end-width:1px}.tw\\:border-e-0{border-inline-end-style:var(--tw-border-style);border-inline-end-width:0}.tw\\:border-t{border-top-style:var(--tw-border-style);border-top-width:1px}.tw\\:border-t-0{border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:border-b{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}.tw\\:border-b-0{border-bottom-style:var(--tw-border-style);border-bottom-width:0}.tw\\:border-l-2{border-left-style:var(--tw-border-style);border-left-width:2px}.tw\\:border-l-4{border-left-style:var(--tw-border-style);border-left-width:4px}.tw\\:border-dashed{--tw-border-style:dashed;border-style:dashed}.tw\\:border-none{--tw-border-style:none;border-style:none}.tw\\:border-solid{--tw-border-style:solid;border-style:solid}.tw\\:border-black{border-color:var(--tw-color-black)}.tw\\:border-blue-400{border-color:var(--tw-color-blue-400)}.tw\\:border-blue-500{border-color:var(--tw-color-blue-500)}.tw\\:border-border,.tw\\:border-border\\/50{border-color:var(--border)}@supports (color:color-mix(in lab, red, red)){.tw\\:border-border\\/50{border-color:color-mix(in oklab, var(--border) 50%, transparent)}}.tw\\:border-destructive{border-color:var(--destructive)}.tw\\:border-gray-300{border-color:var(--tw-color-gray-300)}.tw\\:border-input,.tw\\:border-input\\/30{border-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:border-input\\/30{border-color:color-mix(in oklab, var(--input) 30%, transparent)}}.tw\\:border-muted-foreground,.tw\\:border-muted-foreground\\/40{border-color:var(--muted-foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:border-muted-foreground\\/40{border-color:color-mix(in oklab, var(--muted-foreground) 40%, transparent)}}.tw\\:border-primary{border-color:var(--primary)}.tw\\:border-red-300{border-color:var(--tw-color-red-300)}.tw\\:border-red-400{border-color:var(--tw-color-red-400)}.tw\\:border-red-500{border-color:var(--tw-color-red-500)}.tw\\:border-red-600{border-color:var(--tw-color-red-600)}.tw\\:border-ring{border-color:var(--ring)}.tw\\:border-sidebar-border{border-color:var(--sidebar-border)}.tw\\:border-slate-300{border-color:var(--tw-color-slate-300)}.tw\\:border-transparent{border-color:#0000}.tw\\:border-yellow-400{border-color:var(--tw-color-yellow-400)}.tw\\:border-yellow-500{border-color:var(--tw-color-yellow-500)}.tw\\:border-s-amber-200{border-inline-start-color:var(--tw-color-amber-200)}.tw\\:border-s-indigo-200{border-inline-start-color:var(--tw-color-indigo-200)}.tw\\:border-s-purple-200{border-inline-start-color:var(--tw-color-purple-200)}.tw\\:border-s-red-200{border-inline-start-color:var(--tw-color-red-200)}.tw\\:\\!bg-destructive\\/50{background-color:var(--destructive)!important}@supports (color:color-mix(in lab, red, red)){.tw\\:\\!bg-destructive\\/50{background-color:color-mix(in oklab, var(--destructive) 50%, transparent)!important}}.tw\\:bg-\\[color-mix\\(in_oklab\\,var\\(--destructive\\)_10\\%\\,var\\(--background\\)\\)\\]{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-\\[color-mix\\(in_oklab\\,var\\(--destructive\\)_10\\%\\,var\\(--background\\)\\)\\]{background-color:color-mix(in oklab,var(--destructive) 10%,var(--background))}}.tw\\:bg-accent,.tw\\:bg-accent\\/50{background-color:var(--accent)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-accent\\/50{background-color:color-mix(in oklab, var(--accent) 50%, transparent)}}.tw\\:bg-amber-500,.tw\\:bg-amber-500\\/5{background-color:var(--tw-color-amber-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-amber-500\\/5{background-color:color-mix(in oklab, var(--tw-color-amber-500) 5%, transparent)}}.tw\\:bg-amber-500\\/15{background-color:var(--tw-color-amber-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-amber-500\\/15{background-color:color-mix(in oklab, var(--tw-color-amber-500) 15%, transparent)}}.tw\\:bg-background,.tw\\:bg-background\\/50{background-color:var(--background)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-background\\/50{background-color:color-mix(in oklab, var(--background) 50%, transparent)}}.tw\\:bg-black\\/10{background-color:var(--tw-color-black)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-black\\/10{background-color:color-mix(in oklab, var(--tw-color-black) 10%, transparent)}}.tw\\:bg-blue-50{background-color:var(--tw-color-blue-50)}.tw\\:bg-blue-100{background-color:var(--tw-color-blue-100)}.tw\\:bg-blue-400{background-color:var(--tw-color-blue-400)}.tw\\:bg-blue-500{background-color:var(--tw-color-blue-500)}.tw\\:bg-border{background-color:var(--border)}.tw\\:bg-card{background-color:var(--card)}.tw\\:bg-destructive\\/10{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-destructive\\/10{background-color:color-mix(in oklab, var(--destructive) 10%, transparent)}}.tw\\:bg-foreground{background-color:var(--foreground)}.tw\\:bg-gray-50{background-color:var(--tw-color-gray-50)}.tw\\:bg-gray-100{background-color:var(--tw-color-gray-100)}.tw\\:bg-gray-500{background-color:var(--tw-color-gray-500)}.tw\\:bg-green-50{background-color:var(--tw-color-green-50)}.tw\\:bg-green-100{background-color:var(--tw-color-green-100)}.tw\\:bg-green-500{background-color:var(--tw-color-green-500)}.tw\\:bg-input,.tw\\:bg-input\\/30{background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-input\\/30{background-color:color-mix(in oklab, var(--input) 30%, transparent)}}.tw\\:bg-muted,.tw\\:bg-muted\\/50{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-muted\\/50{background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:bg-neutral-300{background-color:var(--tw-color-neutral-300)}.tw\\:bg-orange-100{background-color:var(--tw-color-orange-100)}.tw\\:bg-popover,.tw\\:bg-popover\\/70{background-color:var(--popover)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-popover\\/70{background-color:color-mix(in oklab, var(--popover) 70%, transparent)}}.tw\\:bg-primary{background-color:var(--primary)}.tw\\:bg-primary-foreground{background-color:var(--primary-foreground)}.tw\\:bg-primary\\/30{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-primary\\/30{background-color:color-mix(in oklab, var(--primary) 30%, transparent)}}.tw\\:bg-purple-50{background-color:var(--tw-color-purple-50)}.tw\\:bg-red-100{background-color:var(--tw-color-red-100)}.tw\\:bg-red-500{background-color:var(--tw-color-red-500)}.tw\\:bg-rose-500,.tw\\:bg-rose-500\\/5{background-color:var(--tw-color-rose-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-rose-500\\/5{background-color:color-mix(in oklab, var(--tw-color-rose-500) 5%, transparent)}}.tw\\:bg-rose-500\\/15{background-color:var(--tw-color-rose-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-rose-500\\/15{background-color:color-mix(in oklab, var(--tw-color-rose-500) 15%, transparent)}}.tw\\:bg-secondary{background-color:var(--secondary)}.tw\\:bg-sidebar{background-color:var(--sidebar)}.tw\\:bg-sidebar-accent{background-color:var(--sidebar-accent)}.tw\\:bg-sidebar-border{background-color:var(--sidebar-border)}.tw\\:bg-sky-500,.tw\\:bg-sky-500\\/5{background-color:var(--tw-color-sky-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-sky-500\\/5{background-color:color-mix(in oklab, var(--tw-color-sky-500) 5%, transparent)}}.tw\\:bg-sky-500\\/15{background-color:var(--tw-color-sky-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-sky-500\\/15{background-color:color-mix(in oklab, var(--tw-color-sky-500) 15%, transparent)}}.tw\\:bg-teal-500,.tw\\:bg-teal-500\\/5{background-color:var(--tw-color-teal-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-teal-500\\/5{background-color:color-mix(in oklab, var(--tw-color-teal-500) 5%, transparent)}}.tw\\:bg-teal-500\\/15{background-color:var(--tw-color-teal-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-teal-500\\/15{background-color:color-mix(in oklab, var(--tw-color-teal-500) 15%, transparent)}}.tw\\:bg-transparent{background-color:#0000}.tw\\:bg-white{background-color:var(--tw-color-white)}.tw\\:bg-yellow-50{background-color:var(--tw-color-yellow-50)}.tw\\:bg-yellow-100{background-color:var(--tw-color-yellow-100)}.tw\\:bg-yellow-500{background-color:var(--tw-color-yellow-500)}.tw\\:bg-zinc-400{background-color:var(--tw-color-zinc-400)}.tw\\:bg-clip-padding{background-clip:padding-box}.tw\\:fill-\\[color-mix\\(in_oklab\\,var\\(--destructive\\)_10\\%\\,var\\(--background\\)\\)\\]{fill:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:fill-\\[color-mix\\(in_oklab\\,var\\(--destructive\\)_10\\%\\,var\\(--background\\)\\)\\]{fill:color-mix(in oklab,var(--destructive) 10%,var(--background))}}.tw\\:fill-destructive{fill:var(--destructive)}.tw\\:fill-foreground{fill:var(--foreground)}.tw\\:fill-yellow-400,.tw\\:fill-yellow-400\\/50{fill:var(--tw-color-yellow-400)}@supports (color:color-mix(in lab, red, red)){.tw\\:fill-yellow-400\\/50{fill:color-mix(in oklab, var(--tw-color-yellow-400) 50%, transparent)}}.tw\\:object-cover{object-fit:cover}.tw\\:\\!p-4{padding:calc(calc(var(--spacing)) * 4)!important}.tw\\:p-0{padding:calc(calc(var(--spacing)) * 0)}.tw\\:p-0\\.5{padding:calc(calc(var(--spacing)) * .5)}.tw\\:p-1{padding:calc(calc(var(--spacing)) * 1)}.tw\\:p-2{padding:calc(calc(var(--spacing)) * 2)}.tw\\:p-2\\.5{padding:calc(calc(var(--spacing)) * 2.5)}.tw\\:p-3{padding:calc(calc(var(--spacing)) * 3)}.tw\\:p-4{padding:calc(calc(var(--spacing)) * 4)}.tw\\:p-6{padding:calc(calc(var(--spacing)) * 6)}.tw\\:p-8{padding:calc(calc(var(--spacing)) * 8)}.tw\\:p-\\[1px\\]{padding:1px}.tw\\:p-\\[3px\\]{padding:3px}.tw\\:p-\\[10px\\]{padding:10px}.tw\\:p-\\[16px\\]{padding:16px}.tw\\:px-0{padding-inline:calc(calc(var(--spacing)) * 0)}.tw\\:px-0\\.5{padding-inline:calc(calc(var(--spacing)) * .5)}.tw\\:px-1{padding-inline:calc(calc(var(--spacing)) * 1)}.tw\\:px-1\\.5{padding-inline:calc(calc(var(--spacing)) * 1.5)}.tw\\:px-2{padding-inline:calc(calc(var(--spacing)) * 2)}.tw\\:px-2\\.5{padding-inline:calc(calc(var(--spacing)) * 2.5)}.tw\\:px-3{padding-inline:calc(calc(var(--spacing)) * 3)}.tw\\:px-4{padding-inline:calc(calc(var(--spacing)) * 4)}.tw\\:px-6{padding-inline:calc(calc(var(--spacing)) * 6)}.tw\\:py-0{padding-block:calc(calc(var(--spacing)) * 0)}.tw\\:py-0\\.5{padding-block:calc(calc(var(--spacing)) * .5)}.tw\\:py-1{padding-block:calc(calc(var(--spacing)) * 1)}.tw\\:py-1\\.5{padding-block:calc(calc(var(--spacing)) * 1.5)}.tw\\:py-2{padding-block:calc(calc(var(--spacing)) * 2)}.tw\\:py-3{padding-block:calc(calc(var(--spacing)) * 3)}.tw\\:py-4{padding-block:calc(calc(var(--spacing)) * 4)}.tw\\:py-6{padding-block:calc(calc(var(--spacing)) * 6)}.tw\\:py-8{padding-block:calc(calc(var(--spacing)) * 8)}.tw\\:py-\\[2px\\]{padding-block:2px}.tw\\:ps-1\\.5{padding-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:ps-2{padding-inline-start:calc(calc(var(--spacing)) * 2)}.tw\\:ps-2\\.5{padding-inline-start:calc(calc(var(--spacing)) * 2.5)}.tw\\:ps-4{padding-inline-start:calc(calc(var(--spacing)) * 4)}.tw\\:ps-7{padding-inline-start:calc(calc(var(--spacing)) * 7)}.tw\\:ps-8{padding-inline-start:calc(calc(var(--spacing)) * 8)}.tw\\:ps-9{padding-inline-start:calc(calc(var(--spacing)) * 9)}.tw\\:ps-12{padding-inline-start:calc(calc(var(--spacing)) * 12)}.tw\\:ps-\\[85px\\]{padding-inline-start:85px}.tw\\:pe-1{padding-inline-end:calc(calc(var(--spacing)) * 1)}.tw\\:pe-1\\.5{padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:pe-2{padding-inline-end:calc(calc(var(--spacing)) * 2)}.tw\\:pe-4{padding-inline-end:calc(calc(var(--spacing)) * 4)}.tw\\:pe-8{padding-inline-end:calc(calc(var(--spacing)) * 8)}.tw\\:pe-8\\!{padding-inline-end:calc(calc(var(--spacing)) * 8)!important}.tw\\:pe-9{padding-inline-end:calc(calc(var(--spacing)) * 9)}.tw\\:pe-\\[calc\\(138px\\+1rem\\)\\]{padding-inline-end:calc(138px + 1rem)}.tw\\:pe-\\[…\\]{padding-inline-end:…}.tw\\:pt-1{padding-top:calc(calc(var(--spacing)) * 1)}.tw\\:pt-2{padding-top:calc(calc(var(--spacing)) * 2)}.tw\\:pt-3{padding-top:calc(calc(var(--spacing)) * 3)}.tw\\:pt-4{padding-top:calc(calc(var(--spacing)) * 4)}.tw\\:pt-6{padding-top:calc(calc(var(--spacing)) * 6)}.tw\\:pr-0{padding-right:calc(calc(var(--spacing)) * 0)}.tw\\:pr-1{padding-right:calc(calc(var(--spacing)) * 1)}.tw\\:pr-2{padding-right:calc(calc(var(--spacing)) * 2)}.tw\\:pr-3{padding-right:calc(calc(var(--spacing)) * 3)}.tw\\:pr-4{padding-right:calc(calc(var(--spacing)) * 4)}.tw\\:pb-0{padding-bottom:calc(calc(var(--spacing)) * 0)}.tw\\:pb-1{padding-bottom:calc(calc(var(--spacing)) * 1)}.tw\\:pb-2{padding-bottom:calc(calc(var(--spacing)) * 2)}.tw\\:pb-3{padding-bottom:calc(calc(var(--spacing)) * 3)}.tw\\:pb-4{padding-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:pb-8{padding-bottom:calc(calc(var(--spacing)) * 8)}.tw\\:pb-12{padding-bottom:calc(calc(var(--spacing)) * 12)}.tw\\:pb-16{padding-bottom:calc(calc(var(--spacing)) * 16)}.tw\\:pb-24{padding-bottom:calc(calc(var(--spacing)) * 24)}.tw\\:pl-2{padding-left:calc(calc(var(--spacing)) * 2)}.tw\\:pl-3{padding-left:calc(calc(var(--spacing)) * 3)}.tw\\:pl-4{padding-left:calc(calc(var(--spacing)) * 4)}.tw\\:pl-5{padding-left:calc(calc(var(--spacing)) * 5)}.tw\\:pl-6{padding-left:calc(calc(var(--spacing)) * 6)}.tw\\:pl-8{padding-left:calc(calc(var(--spacing)) * 8)}.tw\\:text-center{text-align:center}.tw\\:text-end{text-align:end}.tw\\:text-left{text-align:left}.tw\\:text-right{text-align:right}.tw\\:text-start{text-align:start}.tw\\:align-middle{vertical-align:middle}.tw\\:font-heading{font-family:var(--font-sans)}.tw\\:font-mono{font-family:var(--tw-font-mono)}.tw\\:font-sans{font-family:IBM Plex Sans Variable,sans-serif}.tw\\:text-2xl{font-size:var(--tw-text-2xl);line-height:var(--tw-leading,var(--tw-text-2xl--line-height))}.tw\\:text-3xl{font-size:var(--tw-text-3xl);line-height:var(--tw-leading,var(--tw-text-3xl--line-height))}.tw\\:text-4xl{font-size:var(--tw-text-4xl);line-height:var(--tw-leading,var(--tw-text-4xl--line-height))}.tw\\:text-base{font-size:var(--tw-text-base);line-height:var(--tw-leading,var(--tw-text-base--line-height))}.tw\\:text-lg{font-size:var(--tw-text-lg);line-height:var(--tw-leading,var(--tw-text-lg--line-height))}.tw\\:text-sm{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:text-sm\\/relaxed{font-size:var(--tw-text-sm);line-height:var(--tw-leading-relaxed)}.tw\\:text-xl{font-size:var(--tw-text-xl);line-height:var(--tw-leading,var(--tw-text-xl--line-height))}.tw\\:text-xs{font-size:var(--tw-text-xs);line-height:var(--tw-leading,var(--tw-text-xs--line-height))}.tw\\:text-\\[0\\.8rem\\]{font-size:.8rem}.tw\\:leading-6{--tw-leading:calc(calc(var(--spacing)) * 6);line-height:calc(calc(var(--spacing)) * 6)}.tw\\:leading-loose{--tw-leading:var(--tw-leading-loose);line-height:var(--tw-leading-loose)}.tw\\:leading-none{--tw-leading:1;line-height:1}.tw\\:leading-relaxed{--tw-leading:var(--tw-leading-relaxed);line-height:var(--tw-leading-relaxed)}.tw\\:leading-snug{--tw-leading:var(--tw-leading-snug);line-height:var(--tw-leading-snug)}.tw\\:leading-tight{--tw-leading:var(--tw-leading-tight);line-height:var(--tw-leading-tight)}.tw\\:font-bold{--tw-font-weight:var(--tw-font-weight-bold);font-weight:var(--tw-font-weight-bold)}.tw\\:font-extrabold{--tw-font-weight:var(--tw-font-weight-extrabold);font-weight:var(--tw-font-weight-extrabold)}.tw\\:font-medium{--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}.tw\\:font-normal{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:font-semibold{--tw-font-weight:var(--tw-font-weight-semibold);font-weight:var(--tw-font-weight-semibold)}.tw\\:tracking-tight{--tw-tracking:var(--tw-tracking-tight);letter-spacing:var(--tw-tracking-tight)}.tw\\:tracking-wider{--tw-tracking:var(--tw-tracking-wider);letter-spacing:var(--tw-tracking-wider)}.tw\\:tracking-widest{--tw-tracking:var(--tw-tracking-widest);letter-spacing:var(--tw-tracking-widest)}.tw\\:text-balance{text-wrap:balance}.tw\\:text-nowrap{text-wrap:nowrap}.tw\\:break-words{overflow-wrap:break-word}.tw\\:text-clip{text-overflow:clip}.tw\\:text-ellipsis{text-overflow:ellipsis}.tw\\:whitespace-normal{white-space:normal}.tw\\:whitespace-nowrap{white-space:nowrap}.tw\\:whitespace-pre{white-space:pre}.tw\\:whitespace-pre-line{white-space:pre-line}.tw\\:whitespace-pre-wrap{white-space:pre-wrap}.tw\\:\\[color\\:blue\\]{color:#00f}.tw\\:text-accent-foreground{color:var(--accent-foreground)}.tw\\:text-amber-600{color:var(--tw-color-amber-600)}.tw\\:text-background{color:var(--background)}.tw\\:text-blue-400{color:var(--tw-color-blue-400)}.tw\\:text-blue-500{color:var(--tw-color-blue-500)}.tw\\:text-blue-600{color:var(--tw-color-blue-600)}.tw\\:text-blue-800{color:var(--tw-color-blue-800)}.tw\\:text-card-foreground{color:var(--card-foreground)}.tw\\:text-current{color:currentColor}.tw\\:text-destructive{color:var(--destructive)}.tw\\:text-foreground{color:var(--foreground)}.tw\\:text-foreground\\!{color:var(--foreground)!important}.tw\\:text-foreground\\/30{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/30{color:color-mix(in oklab, var(--foreground) 30%, transparent)}}.tw\\:text-foreground\\/50{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/50{color:color-mix(in oklab, var(--foreground) 50%, transparent)}}.tw\\:text-foreground\\/60{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/60{color:color-mix(in oklab, var(--foreground) 60%, transparent)}}.tw\\:text-foreground\\/70{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/70{color:color-mix(in oklab, var(--foreground) 70%, transparent)}}.tw\\:text-gray-300{color:var(--tw-color-gray-300)}.tw\\:text-gray-500{color:var(--tw-color-gray-500)}.tw\\:text-gray-600{color:var(--tw-color-gray-600)}.tw\\:text-gray-700{color:var(--tw-color-gray-700)}.tw\\:text-gray-800{color:var(--tw-color-gray-800)}.tw\\:text-green-600{color:var(--tw-color-green-600)}.tw\\:text-green-700{color:var(--tw-color-green-700)}.tw\\:text-green-800{color:var(--tw-color-green-800)}.tw\\:text-inherit{color:inherit}.tw\\:text-muted-foreground,.tw\\:text-muted-foreground\\/50{color:var(--muted-foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-muted-foreground\\/50{color:color-mix(in oklab, var(--muted-foreground) 50%, transparent)}}.tw\\:text-orange-800{color:var(--tw-color-orange-800)}.tw\\:text-popover-foreground{color:var(--popover-foreground)}.tw\\:text-primary{color:var(--primary)}.tw\\:text-primary-foreground{color:var(--primary-foreground)}.tw\\:text-purple-900{color:var(--tw-color-purple-900)}.tw\\:text-red-500{color:var(--tw-color-red-500)}.tw\\:text-red-600{color:var(--tw-color-red-600)}.tw\\:text-red-700{color:var(--tw-color-red-700)}.tw\\:text-red-800{color:var(--tw-color-red-800)}.tw\\:text-rose-600{color:var(--tw-color-rose-600)}.tw\\:text-secondary-foreground{color:var(--secondary-foreground)}.tw\\:text-sidebar-accent-foreground{color:var(--sidebar-accent-foreground)}.tw\\:text-sidebar-foreground,.tw\\:text-sidebar-foreground\\/70{color:var(--sidebar-foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-sidebar-foreground\\/70{color:color-mix(in oklab, var(--sidebar-foreground) 70%, transparent)}}.tw\\:text-sky-600{color:var(--tw-color-sky-600)}.tw\\:text-slate-900{color:var(--tw-color-slate-900)}.tw\\:text-teal-600{color:var(--tw-color-teal-600)}.tw\\:text-white{color:var(--tw-color-white)}.tw\\:text-yellow-400{color:var(--tw-color-yellow-400)}.tw\\:text-yellow-600{color:var(--tw-color-yellow-600)}.tw\\:text-yellow-700{color:var(--tw-color-yellow-700)}.tw\\:capitalize{text-transform:capitalize}.tw\\:uppercase{text-transform:uppercase}.tw\\:italic{font-style:italic}.tw\\:tabular-nums{--tw-numeric-spacing:tabular-nums;font-variant-numeric:var(--tw-ordinal,) var(--tw-slashed-zero,) var(--tw-numeric-figure,) var(--tw-numeric-spacing,) var(--tw-numeric-fraction,)}.tw\\:line-through{text-decoration-line:line-through}.tw\\:underline{text-decoration-line:underline}.tw\\:decoration-destructive{-webkit-text-decoration-color:var(--destructive);-webkit-text-decoration-color:var(--destructive);text-decoration-color:var(--destructive)}.tw\\:underline-offset-4{text-underline-offset:4px}.tw\\:opacity-0{opacity:0}.tw\\:opacity-40{opacity:.4}.tw\\:opacity-50{opacity:.5}.tw\\:opacity-60{opacity:.6}.tw\\:opacity-100{opacity:1}.tw\\:bg-blend-color{background-blend-mode:color}.tw\\:shadow{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-\\[0_0_0_1px_var\\(--sidebar-border\\)\\]{--tw-shadow:0 0 0 1px var(--tw-shadow-color,var(--sidebar-border));box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-lg{--tw-shadow:0 10px 15px -3px var(--tw-shadow-color,#0000001a), 0 4px 6px -4px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-md{--tw-shadow:0 4px 6px -1px var(--tw-shadow-color,#0000001a), 0 2px 4px -2px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-none{--tw-shadow:0 0 #0000;box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-none\\!{--tw-shadow:0 0 #0000!important;box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)!important}.tw\\:shadow-sm{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-xl{--tw-shadow:0 20px 25px -5px var(--tw-shadow-color,#0000001a), 0 8px 10px -6px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-0{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-1{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-2{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-background{--tw-ring-color:var(--background)}.tw\\:ring-foreground\\/10{--tw-ring-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:ring-foreground\\/10{--tw-ring-color:color-mix(in oklab, var(--foreground) 10%, transparent)}}.tw\\:ring-primary{--tw-ring-color:var(--primary)}.tw\\:ring-ring\\/50{--tw-ring-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.tw\\:ring-ring\\/50{--tw-ring-color:color-mix(in oklab, var(--ring) 50%, transparent)}}.tw\\:ring-sidebar-ring{--tw-ring-color:var(--sidebar-ring)}.tw\\:ring-offset-2{--tw-ring-offset-width:2px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}.tw\\:ring-offset-background{--tw-ring-offset-color:var(--background)}.tw\\:ring-offset-white{--tw-ring-offset-color:var(--tw-color-white)}.tw\\:outline-hidden{--tw-outline-style:none;outline-style:none}@media (forced-colors:active){.tw\\:outline-hidden{outline-offset:2px;outline:2px solid #0000}}.tw\\:drop-shadow-sm{--tw-drop-shadow-size:drop-shadow(0 1px 2px var(--tw-drop-shadow-color,#00000026));--tw-drop-shadow:drop-shadow(var(--tw-drop-shadow-sm));filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.tw\\:transition{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to,opacity,box-shadow,transform,translate,scale,rotate,filter,-webkit-backdrop-filter,backdrop-filter,display,content-visibility,overlay,pointer-events;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[color\\,box-shadow\\]{transition-property:color,box-shadow;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[left\\,right\\,width\\]{transition-property:left,right,width;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[margin\\,opacity\\]{transition-property:margin,opacity;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[width\\,height\\,padding\\]{transition-property:width,height,padding;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[width\\]{transition-property:width;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-all{transition-property:all;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-colors{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-opacity{transition-property:opacity;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-transform{transition-property:transform,translate,scale,rotate;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-none{transition-property:none}.tw\\:duration-100{--tw-duration:.1s;transition-duration:.1s}.tw\\:duration-200{--tw-duration:.2s;transition-duration:.2s}.tw\\:ease-linear{--tw-ease:linear;transition-timing-function:linear}.tw\\:prose-quoteless :where(blockquote p:first-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):before,.tw\\:prose-quoteless :where(blockquote p:last-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:none}.tw\\:outline-none{--tw-outline-style:none;outline-style:none}.tw\\:select-none{-webkit-user-select:none;user-select:none}.tw\\:group-focus-within\\/menu-item\\:opacity-100:is(:where(.tw\\:group\\/menu-item):focus-within *){opacity:1}@media (hover:hover){.tw\\:group-hover\\:visible:is(:where(.tw\\:group):hover *){visibility:visible}.tw\\:group-hover\\:hidden:is(:where(.tw\\:group):hover *){display:none}.tw\\:group-hover\\:opacity-100:is(:where(.tw\\:group):hover *),.tw\\:group-hover\\/menu-item\\:opacity-100:is(:where(.tw\\:group\\/menu-item):hover *){opacity:1}}.tw\\:group-focus\\/context-menu-item\\:text-accent-foreground:is(:where(.tw\\:group\\/context-menu-item):focus *),.tw\\:group-focus\\/dropdown-menu-item\\:text-accent-foreground:is(:where(.tw\\:group\\/dropdown-menu-item):focus *),.tw\\:group-focus\\/menubar-item\\:text-accent-foreground:is(:where(.tw\\:group\\/menubar-item):focus *){color:var(--accent-foreground)}.tw\\:group-has-disabled\\/field\\:opacity-50:is(:where(.tw\\:group\\/field):has(:disabled) *){opacity:.5}.tw\\:group-has-data-\\[sidebar\\=menu-action\\]\\/menu-item\\:pe-8:is(:where(.tw\\:group\\/menu-item):has([data-sidebar=menu-action]) *){padding-inline-end:calc(calc(var(--spacing)) * 8)}.tw\\:group-has-data-\\[size\\=lg\\]\\/avatar-group\\:size-10:is(:where(.tw\\:group\\/avatar-group):has([data-size=lg]) *){width:calc(calc(var(--spacing)) * 10);height:calc(calc(var(--spacing)) * 10)}.tw\\:group-has-data-\\[size\\=sm\\]\\/avatar-group\\:size-6:is(:where(.tw\\:group\\/avatar-group):has([data-size=sm]) *){width:calc(calc(var(--spacing)) * 6);height:calc(calc(var(--spacing)) * 6)}.tw\\:group-has-data-\\[slot\\=command-shortcut\\]\\/command-item\\:hidden:is(:where(.tw\\:group\\/command-item):has([data-slot=command-shortcut]) *){display:none}.tw\\:group-has-\\[\\>input\\]\\/input-group\\:pt-2:is(:where(.tw\\:group\\/input-group):has(>input) *){padding-top:calc(calc(var(--spacing)) * 2)}.tw\\:group-has-\\[\\>input\\]\\/input-group\\:pb-2:is(:where(.tw\\:group\\/input-group):has(>input) *){padding-bottom:calc(calc(var(--spacing)) * 2)}.tw\\:group-has-\\[\\>svg\\]\\/alert\\:col-start-2:is(:where(.tw\\:group\\/alert):has(>svg) *){grid-column-start:2}.tw\\:group-data-\\[checked\\=true\\]\\/command-item\\:opacity-100:is(:where(.tw\\:group\\/command-item)[data-checked=true] *){opacity:1}.tw\\:group-data-\\[collapsible\\=icon\\]\\:-mt-8:is(:where(.tw\\:group)[data-collapsible=icon] *){margin-top:calc(calc(var(--spacing)) * -8)}.tw\\:group-data-\\[collapsible\\=icon\\]\\:hidden:is(:where(.tw\\:group)[data-collapsible=icon] *){display:none}.tw\\:group-data-\\[collapsible\\=icon\\]\\:size-8\\!:is(:where(.tw\\:group)[data-collapsible=icon] *){width:calc(calc(var(--spacing)) * 8)!important;height:calc(calc(var(--spacing)) * 8)!important}.tw\\:group-data-\\[collapsible\\=icon\\]\\:w-\\(--sidebar-width-icon\\):is(:where(.tw\\:group)[data-collapsible=icon] *){width:var(--sidebar-width-icon)}.tw\\:group-data-\\[collapsible\\=icon\\]\\:w-\\[calc\\(var\\(--sidebar-width-icon\\)\\+\\(--spacing\\(4\\)\\)\\)\\]:is(:where(.tw\\:group)[data-collapsible=icon] *){width:calc(var(--sidebar-width-icon) + (calc(calc(var(--spacing)) * 4)))}.tw\\:group-data-\\[collapsible\\=icon\\]\\:w-\\[calc\\(var\\(--sidebar-width-icon\\)\\+\\(--spacing\\(4\\)\\)\\+2px\\)\\]:is(:where(.tw\\:group)[data-collapsible=icon] *){width:calc(var(--sidebar-width-icon) + (calc(calc(var(--spacing)) * 4)) + 2px)}.tw\\:group-data-\\[collapsible\\=icon\\]\\:overflow-hidden:is(:where(.tw\\:group)[data-collapsible=icon] *){overflow:hidden}.tw\\:group-data-\\[collapsible\\=icon\\]\\:p-0\\!:is(:where(.tw\\:group)[data-collapsible=icon] *){padding:calc(calc(var(--spacing)) * 0)!important}.tw\\:group-data-\\[collapsible\\=icon\\]\\:p-2\\!:is(:where(.tw\\:group)[data-collapsible=icon] *){padding:calc(calc(var(--spacing)) * 2)!important}.tw\\:group-data-\\[collapsible\\=icon\\]\\:opacity-0:is(:where(.tw\\:group)[data-collapsible=icon] *){opacity:0}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:right-\\[calc\\(var\\(--sidebar-width\\)\\*-1\\)\\]:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){right:calc(var(--sidebar-width) * -1)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:left-\\[calc\\(var\\(--sidebar-width\\)\\*-1\\)\\]:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){left:calc(var(--sidebar-width) * -1)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:w-0:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){width:calc(calc(var(--spacing)) * 0)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:translate-x-0:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){--tw-translate-x:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:group-data-\\[disabled\\=true\\]\\:pointer-events-none:is(:where(.tw\\:group)[data-disabled=true] *){pointer-events:none}.tw\\:group-data-\\[disabled\\=true\\]\\:opacity-50:is(:where(.tw\\:group)[data-disabled=true] *),.tw\\:group-data-\\[disabled\\=true\\]\\/input-group\\:opacity-50:is(:where(.tw\\:group\\/input-group)[data-disabled=true] *){opacity:.5}.tw\\:group-data-\\[side\\=primary\\]\\:-right-4:is(:where(.tw\\:group)[data-side=primary] *){right:calc(calc(var(--spacing)) * -4)}.tw\\:group-data-\\[side\\=primary\\]\\:border-e:is(:where(.tw\\:group)[data-side=primary] *){border-inline-end-style:var(--tw-border-style);border-inline-end-width:1px}.tw\\:group-data-\\[side\\=secondary\\]\\:left-0:is(:where(.tw\\:group)[data-side=secondary] *){left:calc(calc(var(--spacing)) * 0)}.tw\\:group-data-\\[side\\=secondary\\]\\:rotate-180:is(:where(.tw\\:group)[data-side=secondary] *){rotate:180deg}.tw\\:group-data-\\[side\\=secondary\\]\\:border-s:is(:where(.tw\\:group)[data-side=secondary] *){border-inline-start-style:var(--tw-border-style);border-inline-start-width:1px}.tw\\:group-data-\\[size\\=default\\]\\/avatar\\:size-2\\.5:is(:where(.tw\\:group\\/avatar)[data-size=default] *){width:calc(calc(var(--spacing)) * 2.5);height:calc(calc(var(--spacing)) * 2.5)}.tw\\:group-data-\\[size\\=default\\]\\/switch\\:size-4:is(:where(.tw\\:group\\/switch)[data-size=default] *){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[size\\=lg\\]\\/avatar\\:size-3:is(:where(.tw\\:group\\/avatar)[data-size=lg] *){width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[size\\=sm\\]\\/avatar\\:size-2:is(:where(.tw\\:group\\/avatar)[data-size=sm] *){width:calc(calc(var(--spacing)) * 2);height:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[size\\=sm\\]\\/avatar\\:text-xs:is(:where(.tw\\:group\\/avatar)[data-size=sm] *){font-size:var(--tw-text-xs);line-height:var(--tw-leading,var(--tw-text-xs--line-height))}.tw\\:group-data-\\[size\\=sm\\]\\/card\\:p-3:is(:where(.tw\\:group\\/card)[data-size=sm] *){padding:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[size\\=sm\\]\\/card\\:px-3:is(:where(.tw\\:group\\/card)[data-size=sm] *){padding-inline:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[size\\=sm\\]\\/card\\:text-sm:is(:where(.tw\\:group\\/card)[data-size=sm] *){font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:size-3:is(:where(.tw\\:group\\/switch)[data-size=sm] *){width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[spacing\\=0\\]\\/toggle-group\\:rounded-none:is(:where(.tw\\:group\\/toggle-group)[data-spacing="0"] *){border-radius:0}.tw\\:group-data-\\[spacing\\=0\\]\\/toggle-group\\:px-2:is(:where(.tw\\:group\\/toggle-group)[data-spacing="0"] *){padding-inline:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[variant\\=floating\\]\\:rounded-lg:is(:where(.tw\\:group)[data-variant=floating] *){border-radius:var(--radius)}.tw\\:group-data-\\[variant\\=floating\\]\\:shadow-sm:is(:where(.tw\\:group)[data-variant=floating] *){--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:group-data-\\[variant\\=floating\\]\\:ring-1:is(:where(.tw\\:group)[data-variant=floating] *){--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:group-data-\\[variant\\=floating\\]\\:ring-sidebar-border:is(:where(.tw\\:group)[data-variant=floating] *){--tw-ring-color:var(--sidebar-border)}.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:bg-transparent:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *){background-color:#0000}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:mx-auto:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){margin-inline:auto}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:mt-4:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){margin-top:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:block:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){display:block}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:h-1\\.5:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){height:calc(calc(var(--spacing)) * 1.5)}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:w-\\[100px\\]:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){width:100px}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:text-center:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){text-align:center}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:my-auto:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){margin-block:auto}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:me-4:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){margin-inline-end:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:block:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){display:block}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:h-\\[100px\\]:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){height:100px}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:w-1\\.5:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){width:calc(calc(var(--spacing)) * 1.5)}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:my-auto:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){margin-block:auto}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:ms-4:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){margin-inline-start:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:block:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){display:block}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:h-\\[100px\\]:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){height:100px}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:w-1\\.5:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){width:calc(calc(var(--spacing)) * 1.5)}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:mx-auto:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){margin-inline:auto}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:mb-4:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){margin-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:block:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){display:block}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:h-1\\.5:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){height:calc(calc(var(--spacing)) * 1.5)}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:w-\\[100px\\]:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){width:100px}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:text-center:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){text-align:center}.tw\\:group-data-selected\\/command-item\\:text-foreground:is(:where(.tw\\:group\\/command-item):where([data-selected=true]) *){color:var(--foreground)}.tw\\:group-data-horizontal\\/tabs\\:h-8:is(:where(.tw\\:group\\/tabs):where([data-orientation=horizontal]) *){height:calc(calc(var(--spacing)) * 8)}.tw\\:group-data-vertical\\/tabs\\:h-fit:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *){height:fit-content}.tw\\:group-data-vertical\\/tabs\\:w-full:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *){width:100%}.tw\\:group-data-vertical\\/tabs\\:flex-col:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *){flex-direction:column}.tw\\:group-data-vertical\\/tabs\\:justify-start:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *){justify-content:flex-start}@media (hover:hover){.tw\\:peer-hover\\/menu-button\\:text-sidebar-accent-foreground:is(:where(.tw\\:peer\\/menu-button):hover~*){color:var(--sidebar-accent-foreground)}.tw\\:peer-focus\\:group-hover\\:text-blue-500:is(:where(.tw\\:peer):focus~*):is(:where(.tw\\:group):hover *){color:var(--tw-color-blue-500)}}.tw\\:peer-disabled\\:cursor-not-allowed:is(:where(.tw\\:peer):disabled~*){cursor:not-allowed}.tw\\:peer-disabled\\:opacity-50:is(:where(.tw\\:peer):disabled~*){opacity:.5}.tw\\:peer-data-\\[size\\=default\\]\\/menu-button\\:top-1\\.5:is(:where(.tw\\:peer\\/menu-button)[data-size=default]~*){top:calc(calc(var(--spacing)) * 1.5)}.tw\\:peer-data-\\[size\\=lg\\]\\/menu-button\\:top-2\\.5:is(:where(.tw\\:peer\\/menu-button)[data-size=lg]~*){top:calc(calc(var(--spacing)) * 2.5)}.tw\\:peer-data-\\[size\\=sm\\]\\/menu-button\\:top-1:is(:where(.tw\\:peer\\/menu-button)[data-size=sm]~*){top:calc(calc(var(--spacing)) * 1)}.tw\\:peer-data-active\\/menu-button\\:text-sidebar-accent-foreground:is(:is(:where(.tw\\:peer\\/menu-button):where([data-state=active]),:where(.tw\\:peer\\/menu-button):where([data-active]:not([data-active=false])))~*){color:var(--sidebar-accent-foreground)}.tw\\:file\\:inline-flex::file-selector-button{display:inline-flex}.tw\\:file\\:h-6::file-selector-button{height:calc(calc(var(--spacing)) * 6)}.tw\\:file\\:border-0::file-selector-button{border-style:var(--tw-border-style);border-width:0}.tw\\:file\\:bg-transparent::file-selector-button{background-color:#0000}.tw\\:file\\:text-sm::file-selector-button{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:file\\:font-medium::file-selector-button{--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}.tw\\:file\\:text-foreground::file-selector-button{color:var(--foreground)}.tw\\:placeholder\\:text-muted-foreground::placeholder{color:var(--muted-foreground)}.tw\\:placeholder\\:text-slate-400::placeholder{color:var(--tw-color-slate-400)}.tw\\:before\\:pointer-events-none:before{content:var(--tw-content);pointer-events:none}.tw\\:before\\:absolute:before{content:var(--tw-content);position:absolute}.tw\\:before\\:inset-0:before{content:var(--tw-content);inset:calc(calc(var(--spacing)) * 0)}.tw\\:before\\:top-0\\.5:before{content:var(--tw-content);top:calc(calc(var(--spacing)) * .5)}.tw\\:before\\:left-0:before{content:var(--tw-content);left:calc(calc(var(--spacing)) * 0)}.tw\\:before\\:-z-1:before{content:var(--tw-content);z-index:calc(1 * -1)}.tw\\:before\\:block:before{content:var(--tw-content);display:block}.tw\\:before\\:hidden:before{content:var(--tw-content);display:none}.tw\\:before\\:h-4:before{content:var(--tw-content);height:calc(calc(var(--spacing)) * 4)}.tw\\:before\\:w-4:before{content:var(--tw-content);width:calc(calc(var(--spacing)) * 4)}.tw\\:before\\:cursor-pointer:before{content:var(--tw-content);cursor:pointer}.tw\\:before\\:rounded:before{content:var(--tw-content);border-radius:.25rem}.tw\\:before\\:rounded-\\[inherit\\]:before{content:var(--tw-content);border-radius:inherit}.tw\\:before\\:border:before{content:var(--tw-content);border-style:var(--tw-border-style);border-width:1px}.tw\\:before\\:border-primary:before{content:var(--tw-content);border-color:var(--primary)}.tw\\:before\\:bg-primary:before{content:var(--tw-content);background-color:var(--primary)}.tw\\:before\\:bg-cover:before{content:var(--tw-content);background-size:cover}.tw\\:before\\:bg-no-repeat:before{content:var(--tw-content);background-repeat:no-repeat}.tw\\:before\\:backdrop-blur-2xl:before{content:var(--tw-content);--tw-backdrop-blur:blur(var(--tw-blur-2xl));-webkit-backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)}.tw\\:before\\:backdrop-saturate-150:before{content:var(--tw-content);--tw-backdrop-saturate:saturate(150%);-webkit-backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)}.tw\\:before\\:content-\\[\\"\\"\\]:before{--tw-content:"";content:var(--tw-content)}.tw\\:before\\:content-\\[\\\\\\"\\\\\\"\\]:before{--tw-content:\\"\\";content:var(--tw-content)}.tw\\:after\\:absolute:after{content:var(--tw-content);position:absolute}.tw\\:after\\:-inset-2:after{content:var(--tw-content);inset:calc(calc(var(--spacing)) * -2)}.tw\\:after\\:inset-0:after{content:var(--tw-content);inset:calc(calc(var(--spacing)) * 0)}.tw\\:after\\:-inset-x-3:after{content:var(--tw-content);inset-inline:calc(calc(var(--spacing)) * -3)}.tw\\:after\\:-inset-y-2:after{content:var(--tw-content);inset-block:calc(calc(var(--spacing)) * -2)}.tw\\:after\\:inset-y-0:after{content:var(--tw-content);inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:after\\:start-1\\/2:after{content:var(--tw-content);inset-inline-start:50%}.tw\\:after\\:top-\\[6px\\]:after{content:var(--tw-content);top:6px}.tw\\:after\\:right-\\[7px\\]:after{content:var(--tw-content);right:7px}.tw\\:after\\:left-\\[7px\\]:after{content:var(--tw-content);left:7px}.tw\\:after\\:block:after{content:var(--tw-content);display:block}.tw\\:after\\:hidden:after{content:var(--tw-content);display:none}.tw\\:after\\:h-0\\.5:after{content:var(--tw-content);height:calc(calc(var(--spacing)) * .5)}.tw\\:after\\:h-\\[6px\\]:after{content:var(--tw-content);height:6px}.tw\\:after\\:w-1:after{content:var(--tw-content);width:calc(calc(var(--spacing)) * 1)}.tw\\:after\\:w-\\[2px\\]:after{content:var(--tw-content);width:2px}.tw\\:after\\:w-\\[3px\\]:after{content:var(--tw-content);width:3px}.tw\\:after\\:-translate-x-1\\/2:after{content:var(--tw-content);--tw-translate-x:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:after\\:rotate-45:after{content:var(--tw-content);rotate:45deg}.tw\\:after\\:cursor-pointer:after{content:var(--tw-content);cursor:pointer}.tw\\:after\\:rounded-full:after{content:var(--tw-content);border-radius:3.40282e38px}.tw\\:after\\:border:after{content:var(--tw-content);border-style:var(--tw-border-style);border-width:1px}.tw\\:after\\:border-t-0:after{content:var(--tw-content);border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:after\\:border-r-2:after{content:var(--tw-content);border-right-style:var(--tw-border-style);border-right-width:2px}.tw\\:after\\:border-b-2:after{content:var(--tw-content);border-bottom-style:var(--tw-border-style);border-bottom-width:2px}.tw\\:after\\:border-l-0:after{content:var(--tw-content);border-left-style:var(--tw-border-style);border-left-width:0}.tw\\:after\\:border-solid:after{content:var(--tw-content);--tw-border-style:solid;border-style:solid}.tw\\:after\\:border-border:after{content:var(--tw-content);border-color:var(--border)}.tw\\:after\\:border-white:after{content:var(--tw-content);border-color:var(--tw-color-white)}.tw\\:after\\:bg-foreground:after{content:var(--tw-content);background-color:var(--foreground)}.tw\\:after\\:bg-muted:after{content:var(--tw-content);background-color:var(--muted)}.tw\\:after\\:opacity-0:after{content:var(--tw-content);opacity:0}.tw\\:after\\:mix-blend-darken:after{content:var(--tw-content);mix-blend-mode:darken}.tw\\:after\\:transition-opacity:after{content:var(--tw-content);transition-property:opacity;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:after\\:content-\\[\\"\\"\\]:after{--tw-content:"";content:var(--tw-content)}.tw\\:after\\:content-\\[\\\\\\"\\\\\\"\\]:after{--tw-content:\\"\\";content:var(--tw-content)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:after\\:start-full:is(:where(.tw\\:group)[data-collapsible=offcanvas] *):after{content:var(--tw-content);inset-inline-start:100%}.tw\\:group-data-horizontal\\/tabs\\:after\\:inset-x-0:is(:where(.tw\\:group\\/tabs):where([data-orientation=horizontal]) *):after{content:var(--tw-content);inset-inline:calc(calc(var(--spacing)) * 0)}.tw\\:group-data-horizontal\\/tabs\\:after\\:bottom-\\[-5px\\]:is(:where(.tw\\:group\\/tabs):where([data-orientation=horizontal]) *):after{content:var(--tw-content);bottom:-5px}.tw\\:group-data-horizontal\\/tabs\\:after\\:h-0\\.5:is(:where(.tw\\:group\\/tabs):where([data-orientation=horizontal]) *):after{content:var(--tw-content);height:calc(calc(var(--spacing)) * .5)}.tw\\:group-data-vertical\\/tabs\\:after\\:inset-y-0:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *):after{content:var(--tw-content);inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:group-data-vertical\\/tabs\\:after\\:-end-1:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *):after{content:var(--tw-content);inset-inline-end:calc(calc(var(--spacing)) * -1)}.tw\\:group-data-vertical\\/tabs\\:after\\:w-0\\.5:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *):after{content:var(--tw-content);width:calc(calc(var(--spacing)) * .5)}.tw\\:first\\:mt-0:first-child{margin-top:calc(calc(var(--spacing)) * 0)}.tw\\:even\\:bg-muted:nth-child(2n){background-color:var(--muted)}.tw\\:focus-within\\:ring-2:focus-within{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-within\\:ring-ring:focus-within{--tw-ring-color:var(--ring)}.tw\\:focus-within\\:ring-offset-1:focus-within{--tw-ring-offset-width:1px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}@media (hover:hover){.tw\\:hover\\:-mt-4:hover{margin-top:calc(calc(var(--spacing)) * -4)}.tw\\:hover\\:cursor-pointer:hover{cursor:pointer}.tw\\:hover\\:bg-accent:hover,.tw\\:hover\\:bg-accent\\/30:hover{background-color:var(--accent)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-accent\\/30:hover{background-color:color-mix(in oklab, var(--accent) 30%, transparent)}}.tw\\:hover\\:bg-accent\\/80:hover{background-color:var(--accent)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-accent\\/80:hover{background-color:color-mix(in oklab, var(--accent) 80%, transparent)}}.tw\\:hover\\:bg-blue-600:hover{background-color:var(--tw-color-blue-600)}.tw\\:hover\\:bg-destructive\\/20:hover{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-destructive\\/20:hover{background-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:hover\\:bg-gray-50:hover{background-color:var(--tw-color-gray-50)}.tw\\:hover\\:bg-input:hover{background-color:var(--input)}.tw\\:hover\\:bg-muted:hover,.tw\\:hover\\:bg-muted\\/50:hover{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-muted\\/50:hover{background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:hover\\:bg-muted\\/80:hover{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-muted\\/80:hover{background-color:color-mix(in oklab, var(--muted) 80%, transparent)}}.tw\\:hover\\:bg-primary\\/10:hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-primary\\/10:hover{background-color:color-mix(in oklab, var(--primary) 10%, transparent)}}.tw\\:hover\\:bg-primary\\/70:hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-primary\\/70:hover{background-color:color-mix(in oklab, var(--primary) 70%, transparent)}}.tw\\:hover\\:bg-red-500:hover{background-color:var(--tw-color-red-500)}.tw\\:hover\\:bg-secondary:hover,.tw\\:hover\\:bg-secondary\\/80:hover{background-color:var(--secondary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-secondary\\/80:hover{background-color:color-mix(in oklab, var(--secondary) 80%, transparent)}}.tw\\:hover\\:bg-sidebar-accent:hover{background-color:var(--sidebar-accent)}.tw\\:hover\\:bg-transparent:hover{background-color:#0000}.tw\\:hover\\:text-foreground:hover{color:var(--foreground)}.tw\\:hover\\:text-muted-foreground:hover{color:var(--muted-foreground)}.tw\\:hover\\:text-primary-foreground:hover{color:var(--primary-foreground)}.tw\\:hover\\:text-sidebar-accent-foreground:hover{color:var(--sidebar-accent-foreground)}.tw\\:hover\\:underline:hover{text-decoration-line:underline}.tw\\:hover\\:opacity-80:hover{opacity:.8}.tw\\:hover\\:opacity-100:hover{opacity:1}.tw\\:hover\\:shadow-\\[0_0_0_1px_var\\(--sidebar-accent\\)\\]:hover{--tw-shadow:0 0 0 1px var(--tw-shadow-color,var(--sidebar-accent));box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:hover\\:shadow-md:hover{--tw-shadow:0 4px 6px -1px var(--tw-shadow-color,#0000001a), 0 2px 4px -2px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:hover\\:ring-3:hover{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:hover\\:group-data-\\[collapsible\\=offcanvas\\]\\:bg-sidebar:hover:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){background-color:var(--sidebar)}.tw\\:hover\\:after\\:bg-sidebar-border:hover:after{content:var(--tw-content);background-color:var(--sidebar-border)}}.tw\\:focus\\:relative:focus{position:relative}.tw\\:focus\\:z-10:focus{z-index:10}.tw\\:focus\\:bg-accent:focus{background-color:var(--accent)}.tw\\:focus\\:bg-muted:focus{background-color:var(--muted)}.tw\\:focus\\:text-accent-foreground:focus{color:var(--accent-foreground)}.tw\\:focus\\:text-foreground:focus{color:var(--foreground)}.tw\\:focus\\:ring-2:focus{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus\\:ring-ring:focus{--tw-ring-color:var(--ring)}.tw\\:focus\\:ring-offset-1:focus{--tw-ring-offset-width:1px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}.tw\\:focus\\:ring-offset-background:focus{--tw-ring-offset-color:var(--background)}.tw\\:focus\\:outline-hidden:focus{--tw-outline-style:none;outline-style:none}@media (forced-colors:active){.tw\\:focus\\:outline-hidden:focus{outline-offset:2px;outline:2px solid #0000}}:is(.tw\\:focus\\:\\*\\*\\:text-accent-foreground:focus *),:is(.tw\\:not-data-\\[variant\\=destructive\\]\\:focus\\:\\*\\*\\:text-accent-foreground:not([data-variant=destructive]):focus *){color:var(--accent-foreground)}.tw\\:focus-visible\\:relative:focus-visible{position:relative}.tw\\:focus-visible\\:z-10:focus-visible{z-index:10}.tw\\:focus-visible\\:border-destructive\\/40:focus-visible{border-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:focus-visible\\:border-destructive\\/40:focus-visible{border-color:color-mix(in oklab, var(--destructive) 40%, transparent)}}.tw\\:focus-visible\\:border-ring:focus-visible{border-color:var(--ring)}.tw\\:focus-visible\\:ring-0:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-visible\\:ring-1:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-visible\\:ring-2:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-visible\\:ring-3:focus-visible,.tw\\:focus-visible\\:ring-\\[3px\\]:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-visible\\:ring-\\[color\\:hsl\\(240\\,5\\%\\,64\\.9\\%\\)\\]:focus-visible{--tw-ring-color:#a1a1aa}.tw\\:focus-visible\\:ring-destructive\\/20:focus-visible{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:focus-visible\\:ring-destructive\\/20:focus-visible{--tw-ring-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:focus-visible\\:ring-ring:focus-visible,.tw\\:focus-visible\\:ring-ring\\/50:focus-visible{--tw-ring-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.tw\\:focus-visible\\:ring-ring\\/50:focus-visible{--tw-ring-color:color-mix(in oklab, var(--ring) 50%, transparent)}}.tw\\:focus-visible\\:ring-slate-400:focus-visible{--tw-ring-color:var(--tw-color-slate-400)}.tw\\:focus-visible\\:ring-offset-2:focus-visible{--tw-ring-offset-width:2px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}.tw\\:focus-visible\\:outline-hidden:focus-visible{--tw-outline-style:none;outline-style:none}@media (forced-colors:active){.tw\\:focus-visible\\:outline-hidden:focus-visible{outline-offset:2px;outline:2px solid #0000}}.tw\\:focus-visible\\:outline-1:focus-visible{outline-style:var(--tw-outline-style);outline-width:1px}.tw\\:focus-visible\\:outline-ring:focus-visible{outline-color:var(--ring)}.tw\\:focus-visible\\:outline-none:focus-visible{--tw-outline-style:none;outline-style:none}:is(.tw\\:\\*\\:focus-visible\\:relative>*):focus-visible{position:relative}:is(.tw\\:\\*\\:focus-visible\\:z-10>*):focus-visible{z-index:10}.tw\\:active\\:bg-sidebar-accent:active{background-color:var(--sidebar-accent)}.tw\\:active\\:text-sidebar-accent-foreground:active{color:var(--sidebar-accent-foreground)}.tw\\:active\\:ring-3:active{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:active\\:not-aria-\\[haspopup\\]\\:translate-y-px:active:not([aria-haspopup]){--tw-translate-y:1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:active\\:not-aria-\\[haspopup\\]\\:transform-\\[translateY\\(1px\\)\\]:active:not([aria-haspopup]){transform:translateY(1px)}.tw\\:disabled\\:pointer-events-none:disabled{pointer-events:none}.tw\\:disabled\\:cursor-not-allowed:disabled{cursor:not-allowed}.tw\\:disabled\\:bg-input\\/50:disabled{background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:disabled\\:bg-input\\/50:disabled{background-color:color-mix(in oklab, var(--input) 50%, transparent)}}.tw\\:disabled\\:bg-transparent:disabled{background-color:#0000}.tw\\:disabled\\:opacity-50:disabled{opacity:.5}:where([data-side=bottom]) .tw\\:in-data-\\[side\\=bottom\\]\\:translate-y-\\[calc\\(-50\\%-1px\\)\\]{--tw-translate-y:calc(-50% - 1px);translate:var(--tw-translate-x) var(--tw-translate-y)}:where([data-side=bottom]) .tw\\:in-data-\\[side\\=bottom\\]\\:\\[clip-path\\:polygon\\(100\\%_0\\,100\\%_100\\%\\,0_100\\%\\)\\]{clip-path:polygon(100% 0,100% 100%,0 100%)}:where([data-side=primary]) .tw\\:in-data-\\[side\\=primary\\]\\:cursor-w-resize{cursor:w-resize}:where([data-side=secondary]) .tw\\:in-data-\\[side\\=secondary\\]\\:cursor-e-resize{cursor:e-resize}:where([data-side=top]) .tw\\:in-data-\\[side\\=top\\]\\:translate-y-\\[calc\\(-50\\%-1px\\)\\]{--tw-translate-y:calc(-50% - 1px);translate:var(--tw-translate-x) var(--tw-translate-y)}:where([data-side=top]) .tw\\:in-data-\\[side\\=top\\]\\:\\[clip-path\\:polygon\\(100\\%_0\\,100\\%_100\\%\\,0_100\\%\\)\\]{clip-path:polygon(100% 0,100% 100%,0 100%)}:where([data-slot=button-group]) .tw\\:in-data-\\[slot\\=button-group\\]\\:rounded-lg{border-radius:var(--radius)}:where([data-slot=combobox-content]) .tw\\:in-data-\\[slot\\=combobox-content\\]\\:focus-within\\:border-inherit:focus-within{border-color:inherit}:where([data-slot=combobox-content]) .tw\\:in-data-\\[slot\\=combobox-content\\]\\:focus-within\\:ring-0:focus-within{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}:where([data-slot=dialog-content]) .tw\\:in-data-\\[slot\\=dialog-content\\]\\:rounded-lg\\!{border-radius:var(--radius)!important}:where([data-slot=tooltip-content]) .tw\\:in-data-\\[slot\\=tooltip-content\\]\\:bg-background\\/20{background-color:var(--background)}@supports (color:color-mix(in lab, red, red)){:where([data-slot=tooltip-content]) .tw\\:in-data-\\[slot\\=tooltip-content\\]\\:bg-background\\/20{background-color:color-mix(in oklab, var(--background) 20%, transparent)}}:where([data-slot=tooltip-content]) .tw\\:in-data-\\[slot\\=tooltip-content\\]\\:text-background{color:var(--background)}:where([data-slot=tooltip-content]) .tw\\:in-data-\\[slot\\=tooltip-content\\]\\:text-destructive{color:var(--destructive)}.tw\\:has-disabled\\:bg-input\\/50:has(:disabled){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:has-disabled\\:bg-input\\/50:has(:disabled){background-color:color-mix(in oklab, var(--input) 50%, transparent)}}.tw\\:has-disabled\\:opacity-50:has(:disabled){opacity:.5}.tw\\:has-aria-expanded\\:bg-muted\\/50:has([aria-expanded=true]){background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:has-aria-expanded\\:bg-muted\\/50:has([aria-expanded=true]){background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:has-data-\\[icon\\=inline-end\\]\\:pe-1:has([data-icon=inline-end]){padding-inline-end:calc(calc(var(--spacing)) * 1)}.tw\\:has-data-\\[icon\\=inline-end\\]\\:pe-1\\.5:has([data-icon=inline-end]){padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[icon\\=inline-end\\]\\:pe-2:has([data-icon=inline-end]){padding-inline-end:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[spacing\\=0\\]\\/toggle-group\\:has-data-\\[icon\\=inline-end\\]\\:pe-1\\.5:is(:where(.tw\\:group\\/toggle-group)[data-spacing="0"] *):has([data-icon=inline-end]){padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[icon\\=inline-start\\]\\:ps-1:has([data-icon=inline-start]){padding-inline-start:calc(calc(var(--spacing)) * 1)}.tw\\:has-data-\\[icon\\=inline-start\\]\\:ps-1\\.5:has([data-icon=inline-start]){padding-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[icon\\=inline-start\\]\\:ps-2:has([data-icon=inline-start]){padding-inline-start:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[spacing\\=0\\]\\/toggle-group\\:has-data-\\[icon\\=inline-start\\]\\:ps-1\\.5:is(:where(.tw\\:group\\/toggle-group)[data-spacing="0"] *):has([data-icon=inline-start]){padding-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[slot\\=alert-action\\]\\:relative:has([data-slot=alert-action]){position:relative}.tw\\:has-data-\\[slot\\=alert-action\\]\\:pe-18:has([data-slot=alert-action]){padding-inline-end:calc(calc(var(--spacing)) * 18)}.tw\\:has-data-\\[slot\\=card-action\\]\\:grid-cols-\\[1fr_auto\\]:has([data-slot=card-action]){grid-template-columns:1fr auto}.tw\\:has-data-\\[slot\\=card-description\\]\\:grid-rows-\\[auto_auto\\]:has([data-slot=card-description]){grid-template-rows:auto auto}.tw\\:has-data-\\[slot\\=card-footer\\]\\:pb-0:has([data-slot=card-footer]){padding-bottom:calc(calc(var(--spacing)) * 0)}.tw\\:has-data-\\[slot\\=kbd\\]\\:pe-0:has([data-slot=kbd]){padding-inline-end:calc(calc(var(--spacing)) * 0)}.tw\\:has-data-\\[slot\\=kbd\\]\\:pe-1\\.5:has([data-slot=kbd]){padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[variant\\=inset\\]\\:bg-sidebar:has([data-variant=inset]){background-color:var(--sidebar)}.tw\\:has-\\[\\[data-slot\\=input-group-control\\]\\:focus-visible\\]\\:border-ring:has([data-slot=input-group-control]:focus-visible){border-color:var(--ring)}.tw\\:has-\\[\\[data-slot\\=input-group-control\\]\\:focus-visible\\]\\:ring-3:has([data-slot=input-group-control]:focus-visible){--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:has-\\[\\[data-slot\\=input-group-control\\]\\:focus-visible\\]\\:ring-ring\\/50:has([data-slot=input-group-control]:focus-visible){--tw-ring-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.tw\\:has-\\[\\[data-slot\\=input-group-control\\]\\:focus-visible\\]\\:ring-ring\\/50:has([data-slot=input-group-control]:focus-visible){--tw-ring-color:color-mix(in oklab, var(--ring) 50%, transparent)}}.tw\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:border-destructive:has([data-slot][aria-invalid=true]){border-color:var(--destructive)}.tw\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-3:has([data-slot][aria-invalid=true]){--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-destructive\\/20:has([data-slot][aria-invalid=true]){--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-destructive\\/20:has([data-slot][aria-invalid=true]){--tw-ring-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:has-\\[\\>\\[data-align\\=block-end\\]\\]\\:h-auto:has(>[data-align=block-end]){height:auto}.tw\\:has-\\[\\>\\[data-align\\=block-end\\]\\]\\:flex-col:has(>[data-align=block-end]){flex-direction:column}.tw\\:has-\\[\\>\\[data-align\\=block-start\\]\\]\\:h-auto:has(>[data-align=block-start]){height:auto}.tw\\:has-\\[\\>\\[data-align\\=block-start\\]\\]\\:flex-col:has(>[data-align=block-start]){flex-direction:column}.tw\\:has-\\[\\>\\[data-slot\\=button-group\\]\\]\\:gap-2:has(>[data-slot=button-group]){gap:calc(calc(var(--spacing)) * 2)}.tw\\:has-\\[\\>button\\]\\:ms-\\[-0\\.3rem\\]:has(>button){margin-inline-start:-.3rem}.tw\\:has-\\[\\>button\\]\\:me-\\[-0\\.3rem\\]:has(>button){margin-inline-end:-.3rem}.tw\\:has-\\[\\>img\\]\\:grid-cols-\\[auto_1fr\\]:has(>img){grid-template-columns:auto 1fr}.tw\\:has-\\[\\>img\\]\\:gap-x-2:has(>img){column-gap:calc(calc(var(--spacing)) * 2)}.tw\\:has-\\[\\>img\\:first-child\\]\\:pt-0:has(>img:first-child){padding-top:calc(calc(var(--spacing)) * 0)}.tw\\:has-\\[\\>kbd\\]\\:ms-\\[-0\\.15rem\\]:has(>kbd){margin-inline-start:-.15rem}.tw\\:has-\\[\\>kbd\\]\\:me-\\[-0\\.15rem\\]:has(>kbd){margin-inline-end:-.15rem}.tw\\:has-\\[\\>svg\\]\\:grid-cols-\\[auto_1fr\\]:has(>svg){grid-template-columns:auto 1fr}.tw\\:has-\\[\\>svg\\]\\:gap-x-2:has(>svg){column-gap:calc(calc(var(--spacing)) * 2)}.tw\\:has-\\[\\>svg\\]\\:p-0:has(>svg){padding:calc(calc(var(--spacing)) * 0)}.tw\\:has-\\[\\>textarea\\]\\:h-auto:has(>textarea){height:auto}.tw\\:aria-disabled\\:pointer-events-none[aria-disabled=true]{pointer-events:none}.tw\\:aria-disabled\\:opacity-50[aria-disabled=true]{opacity:.5}.tw\\:aria-expanded\\:bg-muted[aria-expanded=true]{background-color:var(--muted)}.tw\\:aria-expanded\\:bg-secondary[aria-expanded=true]{background-color:var(--secondary)}.tw\\:aria-expanded\\:text-foreground[aria-expanded=true]{color:var(--foreground)}.tw\\:aria-expanded\\:text-secondary-foreground[aria-expanded=true]{color:var(--secondary-foreground)}.tw\\:aria-expanded\\:opacity-100[aria-expanded=true]{opacity:1}.tw\\:aria-invalid\\:border-destructive[aria-invalid=true]{border-color:var(--destructive)}.tw\\:aria-invalid\\:ring-0[aria-invalid=true]{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:aria-invalid\\:ring-3[aria-invalid=true]{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:aria-invalid\\:ring-destructive\\/20[aria-invalid=true]{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:aria-invalid\\:ring-destructive\\/20[aria-invalid=true]{--tw-ring-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:aria-invalid\\:aria-checked\\:border-primary[aria-invalid=true][aria-checked=true]{border-color:var(--primary)}.tw\\:aria-pressed\\:bg-muted[aria-pressed=true]{background-color:var(--muted)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:h-px[aria-orientation=horizontal]{height:1px}.tw\\:aria-\\[orientation\\=horizontal\\]\\:w-full[aria-orientation=horizontal]{width:100%}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:start-0[aria-orientation=horizontal]:after{content:var(--tw-content);inset-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:h-1[aria-orientation=horizontal]:after{content:var(--tw-content);height:calc(calc(var(--spacing)) * 1)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:w-full[aria-orientation=horizontal]:after{content:var(--tw-content);width:100%}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:translate-x-0[aria-orientation=horizontal]:after{content:var(--tw-content);--tw-translate-x:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:-translate-y-1\\/2[aria-orientation=horizontal]:after{content:var(--tw-content);--tw-translate-y:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:aria-\\[orientation\\=vertical\\]\\:flex-col[aria-orientation=vertical]{flex-direction:column}.tw\\:data-inset\\:ps-7[data-inset]{padding-inline-start:calc(calc(var(--spacing)) * 7)}.tw\\:data-placeholder\\:text-muted-foreground[data-placeholder]{color:var(--muted-foreground)}.tw\\:data-\\[align-trigger\\=false\\]\\:min-w-36[data-align-trigger=false]{min-width:calc(calc(var(--spacing)) * 36)}.tw\\:data-\\[align-trigger\\=true\\]\\:min-w-\\(--radix-select-trigger-width\\)[data-align-trigger=true]{min-width:var(--radix-select-trigger-width)}.tw\\:data-\\[align-trigger\\=true\\]\\:animate-none[data-align-trigger=true]{animation:none}.tw\\:data-\\[disabled\\=true\\]\\:pointer-events-none[data-disabled=true]{pointer-events:none}.tw\\:data-\\[disabled\\=true\\]\\:opacity-50[data-disabled=true]{opacity:.5}.tw\\:data-\\[position\\=popper\\]\\:h-\\(--radix-select-trigger-height\\)[data-position=popper]{height:var(--radix-select-trigger-height)}.tw\\:data-\\[position\\=popper\\]\\:w-full[data-position=popper]{width:100%}.tw\\:data-\\[position\\=popper\\]\\:min-w-\\(--radix-select-trigger-width\\)[data-position=popper]{min-width:var(--radix-select-trigger-width)}.tw\\:data-\\[side\\=bottom\\]\\:translate-y-1[data-side=bottom]{--tw-translate-y:calc(calc(var(--spacing)) * 1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=bottom\\]\\:slide-in-from-top-2[data-side=bottom]{--tw-enter-translate-y:calc(2*var(--spacing)*-1)}.tw\\:data-\\[side\\=left\\]\\:-translate-x-1[data-side=left]{--tw-translate-x:calc(calc(var(--spacing)) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=left\\]\\:slide-in-from-right-2[data-side=left]{--tw-enter-translate-x:calc(2*var(--spacing))}.tw\\:data-\\[side\\=right\\]\\:translate-x-1[data-side=right]{--tw-translate-x:calc(calc(var(--spacing)) * 1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=right\\]\\:slide-in-from-left-2[data-side=right]{--tw-enter-translate-x:calc(2*var(--spacing)*-1)}.tw\\:data-\\[side\\=top\\]\\:-translate-y-1[data-side=top]{--tw-translate-y:calc(calc(var(--spacing)) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=top\\]\\:slide-in-from-bottom-2[data-side=top]{--tw-enter-translate-y:calc(2*var(--spacing))}.tw\\:data-\\[size\\=default\\]\\:h-8[data-size=default]{height:calc(calc(var(--spacing)) * 8)}.tw\\:data-\\[size\\=default\\]\\:h-\\[18\\.4px\\][data-size=default]{height:18.4px}.tw\\:data-\\[size\\=default\\]\\:w-\\[32px\\][data-size=default]{width:32px}.tw\\:data-\\[size\\=lg\\]\\:size-10[data-size=lg]{width:calc(calc(var(--spacing)) * 10);height:calc(calc(var(--spacing)) * 10)}.tw\\:data-\\[size\\=md\\]\\:text-sm[data-size=md]{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:data-\\[size\\=sm\\]\\:size-6[data-size=sm]{width:calc(calc(var(--spacing)) * 6);height:calc(calc(var(--spacing)) * 6)}.tw\\:data-\\[size\\=sm\\]\\:h-7[data-size=sm]{height:calc(calc(var(--spacing)) * 7)}.tw\\:data-\\[size\\=sm\\]\\:h-\\[14px\\][data-size=sm]{height:14px}.tw\\:data-\\[size\\=sm\\]\\:w-\\[24px\\][data-size=sm]{width:24px}.tw\\:data-\\[size\\=sm\\]\\:gap-3[data-size=sm]{gap:calc(calc(var(--spacing)) * 3)}.tw\\:data-\\[size\\=sm\\]\\:rounded-\\[min\\(var\\(--tw-radius-md\\)\\,10px\\)\\][data-size=sm]{border-radius:min(var(--tw-radius-md), 10px)}.tw\\:data-\\[size\\=sm\\]\\:py-3[data-size=sm]{padding-block:calc(calc(var(--spacing)) * 3)}.tw\\:data-\\[size\\=sm\\]\\:text-xs[data-size=sm]{font-size:var(--tw-text-xs);line-height:var(--tw-leading,var(--tw-text-xs--line-height))}.tw\\:data-\\[size\\=sm\\]\\:has-data-\\[slot\\=card-footer\\]\\:pb-0[data-size=sm]:has([data-slot=card-footer]){padding-bottom:calc(calc(var(--spacing)) * 0)}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-item\\]\\:focus\\:bg-foreground\\/10 *)[data-slot$=-item]:focus{background-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-item\\]\\:focus\\:bg-foreground\\/10 *)[data-slot$=-item]:focus{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)}}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-item\\]\\:data-highlighted\\:bg-foreground\\/10 *)[data-slot$=-item][data-highlighted]{background-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-item\\]\\:data-highlighted\\:bg-foreground\\/10 *)[data-slot$=-item][data-highlighted]{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)}}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-separator\\]\\:bg-foreground\\/5 *)[data-slot$=-separator]{background-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-separator\\]\\:bg-foreground\\/5 *)[data-slot$=-separator]{background-color:color-mix(in oklab, var(--foreground) 5%, transparent)}}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-trigger\\]\\:focus\\:bg-foreground\\/10 *)[data-slot$=-trigger]:focus{background-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-trigger\\]\\:focus\\:bg-foreground\\/10 *)[data-slot$=-trigger]:focus{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)}}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-trigger\\]\\:aria-expanded\\:bg-foreground\\/10\\! *)[data-slot$=-trigger][aria-expanded=true]{background-color:var(--foreground)!important}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-trigger\\]\\:aria-expanded\\:bg-foreground\\/10\\! *)[data-slot$=-trigger][aria-expanded=true]{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)!important}}:is(.tw\\:\\*\\:data-\\[slot\\=alert-description\\]\\:text-destructive\\/90>*)[data-slot=alert-description]{color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\:data-\\[slot\\=alert-description\\]\\:text-destructive\\/90>*)[data-slot=alert-description]{color:color-mix(in oklab, var(--destructive) 90%, transparent)}}:is(.tw\\:\\*\\:data-\\[slot\\=avatar\\]\\:ring-2>*)[data-slot=avatar]{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}:is(.tw\\:\\*\\:data-\\[slot\\=avatar\\]\\:ring-background>*)[data-slot=avatar]{--tw-ring-color:var(--background)}:is(.tw\\:\\*\\:data-\\[slot\\=input-group-addon\\]\\:ps-2\\!>*)[data-slot=input-group-addon]{padding-inline-start:calc(calc(var(--spacing)) * 2)!important}:is(.tw\\:\\*\\*\\:data-\\[slot\\=kbd\\]\\:relative *)[data-slot=kbd]{position:relative}:is(.tw\\:\\*\\*\\:data-\\[slot\\=kbd\\]\\:isolate *)[data-slot=kbd]{isolation:isolate}:is(.tw\\:\\*\\*\\:data-\\[slot\\=kbd\\]\\:z-50 *)[data-slot=kbd]{z-index:50}:is(.tw\\:\\*\\*\\:data-\\[slot\\=kbd\\]\\:rounded-sm *)[data-slot=kbd]{border-radius:calc(var(--radius) * .6)}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:line-clamp-1>*)[data-slot=select-value]{-webkit-line-clamp:1;-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:flex>*)[data-slot=select-value]{display:flex}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:flex-1>*)[data-slot=select-value]{flex:1}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:items-center>*)[data-slot=select-value]{align-items:center}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:gap-1\\.5>*)[data-slot=select-value]{gap:calc(calc(var(--spacing)) * 1.5)}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:text-start>*)[data-slot=select-value]{text-align:start}.tw\\:group-data-horizontal\\/toggle-group\\:data-\\[spacing\\=0\\]\\:first\\:rounded-s-lg:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=horizontal]) *)[data-spacing="0"]:first-child{border-start-start-radius:var(--radius);border-end-start-radius:var(--radius)}.tw\\:group-data-vertical\\/toggle-group\\:data-\\[spacing\\=0\\]\\:first\\:rounded-t-lg:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=vertical]) *)[data-spacing="0"]:first-child{border-top-left-radius:var(--radius);border-top-right-radius:var(--radius)}.tw\\:group-data-horizontal\\/toggle-group\\:data-\\[spacing\\=0\\]\\:last\\:rounded-e-lg:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=horizontal]) *)[data-spacing="0"]:last-child{border-start-end-radius:var(--radius);border-end-end-radius:var(--radius)}.tw\\:group-data-vertical\\/toggle-group\\:data-\\[spacing\\=0\\]\\:last\\:rounded-b-lg:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=vertical]) *)[data-spacing="0"]:last-child{border-bottom-right-radius:var(--radius);border-bottom-left-radius:var(--radius)}.tw\\:data-\\[state\\=active\\]\\:bg-background[data-state=active]{background-color:var(--background)}.tw\\:data-\\[state\\=active\\]\\:text-foreground[data-state=active]{color:var(--foreground)}.tw\\:data-\\[state\\=active\\]\\:shadow-sm[data-state=active]{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:data-\\[state\\=closed\\]\\:overflow-hidden[data-state=closed]{overflow:hidden}.tw\\:data-\\[state\\=delayed-open\\]\\:animate-in[data-state=delayed-open]{animation:enter var(--tw-animation-duration,var(--tw-duration,.15s))var(--tw-ease,ease)var(--tw-animation-delay,0s)var(--tw-animation-iteration-count,1)var(--tw-animation-direction,normal)var(--tw-animation-fill-mode,none)}.tw\\:data-\\[state\\=delayed-open\\]\\:fade-in-0[data-state=delayed-open]{--tw-enter-opacity:0}.tw\\:data-\\[state\\=delayed-open\\]\\:zoom-in-95[data-state=delayed-open]{--tw-enter-scale:.95}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-soft-approved\\)\\][data-state=on]{background-color:var(--inv-soft-approved)}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-soft-unapproved\\)\\][data-state=on]{background-color:var(--inv-soft-unapproved)}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-soft-unknown\\)\\][data-state=on]{background-color:var(--inv-soft-unknown)}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-vivid-approved\\)\\][data-state=on]{background-color:var(--inv-vivid-approved)}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-vivid-unapproved\\)\\][data-state=on]{background-color:var(--inv-vivid-unapproved)}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-vivid-unknown\\)\\][data-state=on]{background-color:var(--inv-vivid-unknown)}.tw\\:data-\\[state\\=on\\]\\:bg-muted[data-state=on]{background-color:var(--muted)}.tw\\:data-\\[state\\=on\\]\\:text-\\[var\\(--inv-icon-approved\\)\\][data-state=on]{color:var(--inv-icon-approved)}.tw\\:data-\\[state\\=on\\]\\:text-\\[var\\(--inv-icon-unapproved\\)\\][data-state=on]{color:var(--inv-icon-unapproved)}.tw\\:data-\\[state\\=on\\]\\:text-\\[var\\(--inv-icon-unknown\\)\\][data-state=on]{color:var(--inv-icon-unknown)}.tw\\:data-\\[state\\=on\\]\\:text-\\[var\\(--inv-on\\)\\][data-state=on]{color:var(--inv-on)}.tw\\:data-\\[state\\=on\\]\\:text-foreground[data-state=on]{color:var(--foreground)}.tw\\:data-\\[state\\=open\\]\\:bg-accent[data-state=open]{background-color:var(--accent)}.tw\\:data-\\[state\\=open\\]\\:bg-muted[data-state=open]{background-color:var(--muted)}.tw\\:data-\\[state\\=open\\]\\:text-foreground[data-state=open]{color:var(--foreground)}.tw\\:data-\\[state\\=selected\\]\\:bg-muted[data-state=selected]{background-color:var(--muted)}.tw\\:data-\\[variant\\=destructive\\]\\:text-destructive[data-variant=destructive]{color:var(--destructive)}:is(:is(.tw\\:\\*\\*\\:data-\\[variant\\=destructive\\]\\:\\*\\*\\:text-accent-foreground\\! *)[data-variant=destructive] *),:is(.tw\\:\\*\\*\\:data-\\[variant\\=destructive\\]\\:text-accent-foreground\\! *)[data-variant=destructive]{color:var(--accent-foreground)!important}.tw\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-destructive\\/10[data-variant=destructive]:focus{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-destructive\\/10[data-variant=destructive]:focus{background-color:color-mix(in oklab, var(--destructive) 10%, transparent)}}.tw\\:data-\\[variant\\=destructive\\]\\:focus\\:text-destructive[data-variant=destructive]:focus{color:var(--destructive)}:is(.tw\\:\\*\\*\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-foreground\\/10\\! *)[data-variant=destructive]:focus{background-color:var(--foreground)!important}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-foreground\\/10\\! *)[data-variant=destructive]:focus{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)!important}}.tw\\:data-\\[variant\\=line\\]\\:rounded-none[data-variant=line]{border-radius:0}.tw\\:group-data-horizontal\\/toggle-group\\:data-\\[spacing\\=0\\]\\:data-\\[variant\\=outline\\]\\:border-s-0:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=horizontal]) *)[data-spacing="0"][data-variant=outline]{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:group-data-vertical\\/toggle-group\\:data-\\[spacing\\=0\\]\\:data-\\[variant\\=outline\\]\\:border-t-0:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=vertical]) *)[data-spacing="0"][data-variant=outline]{border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:group-data-horizontal\\/toggle-group\\:data-\\[spacing\\=0\\]\\:data-\\[variant\\=outline\\]\\:first\\:border-s:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=horizontal]) *)[data-spacing="0"][data-variant=outline]:first-child{border-inline-start-style:var(--tw-border-style);border-inline-start-width:1px}.tw\\:group-data-vertical\\/toggle-group\\:data-\\[spacing\\=0\\]\\:data-\\[variant\\=outline\\]\\:first\\:border-t:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=vertical]) *)[data-spacing="0"][data-variant=outline]:first-child{border-top-style:var(--tw-border-style);border-top-width:1px}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:inset-x-0[data-vaul-drawer-direction=bottom]{inset-inline:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:bottom-0[data-vaul-drawer-direction=bottom]{bottom:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:mt-24[data-vaul-drawer-direction=bottom]{margin-top:calc(calc(var(--spacing)) * 24)}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:max-h-\\[80vh\\][data-vaul-drawer-direction=bottom]{max-height:80vh}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:rounded-t-xl[data-vaul-drawer-direction=bottom]{border-top-left-radius:calc(var(--radius) * 1.4);border-top-right-radius:calc(var(--radius) * 1.4)}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:border-t[data-vaul-drawer-direction=bottom]{border-top-style:var(--tw-border-style);border-top-width:1px}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:inset-y-0[data-vaul-drawer-direction=left]{inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:left-0[data-vaul-drawer-direction=left]{left:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:w-3\\/4[data-vaul-drawer-direction=left]{width:75%}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:flex-row[data-vaul-drawer-direction=left]{flex-direction:row}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:rounded-r-xl[data-vaul-drawer-direction=left]{border-top-right-radius:calc(var(--radius) * 1.4);border-bottom-right-radius:calc(var(--radius) * 1.4)}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:border-r[data-vaul-drawer-direction=left]{border-right-style:var(--tw-border-style);border-right-width:1px}.tw\\:data-\\[vaul-drawer-direction\\=left\\/right\\]\\:flex-row[data-vaul-drawer-direction=left\\/right]{flex-direction:row}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:inset-y-0[data-vaul-drawer-direction=right]{inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:right-0[data-vaul-drawer-direction=right]{right:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:w-3\\/4[data-vaul-drawer-direction=right]{width:75%}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:flex-row[data-vaul-drawer-direction=right]{flex-direction:row}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:rounded-l-xl[data-vaul-drawer-direction=right]{border-top-left-radius:calc(var(--radius) * 1.4);border-bottom-left-radius:calc(var(--radius) * 1.4)}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:border-l[data-vaul-drawer-direction=right]{border-left-style:var(--tw-border-style);border-left-width:1px}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:inset-x-0[data-vaul-drawer-direction=top]{inset-inline:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:top-0[data-vaul-drawer-direction=top]{top:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:mb-24[data-vaul-drawer-direction=top]{margin-bottom:calc(calc(var(--spacing)) * 24)}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:max-h-\\[80vh\\][data-vaul-drawer-direction=top]{max-height:80vh}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:rounded-b-xl[data-vaul-drawer-direction=top]{border-bottom-right-radius:calc(var(--radius) * 1.4);border-bottom-left-radius:calc(var(--radius) * 1.4)}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:border-b[data-vaul-drawer-direction=top]{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}@supports ((-webkit-backdrop-filter:var(--tw)) or (backdrop-filter:var(--tw))){.tw\\:supports-backdrop-filter\\:backdrop-blur-xs{--tw-backdrop-blur:blur(var(--tw-blur-xs));-webkit-backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)}}@media (min-width:40rem){.tw\\:sm\\:flex{display:flex}.tw\\:sm\\:max-w-sm{max-width:var(--tw-container-sm)}.tw\\:sm\\:flex-row{flex-direction:row}.tw\\:sm\\:justify-end{justify-content:flex-end}.tw\\:sm\\:p-8{padding:calc(calc(var(--spacing)) * 8)}.tw\\:sm\\:text-start{text-align:start}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:sm\\:max-w-sm[data-vaul-drawer-direction=left],.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:sm\\:max-w-sm[data-vaul-drawer-direction=right]{max-width:var(--tw-container-sm)}}@media (min-width:48rem){.tw\\:md\\:block{display:block}.tw\\:md\\:flex{display:flex}.tw\\:md\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.tw\\:md\\:gap-0\\.5{gap:calc(calc(var(--spacing)) * .5)}.tw\\:md\\:text-start{text-align:start}.tw\\:md\\:text-sm{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:md\\:text-pretty{text-wrap:pretty}.tw\\:md\\:opacity-0{opacity:0}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:m-2:is(:where(.tw\\:peer)[data-variant=inset]~*){margin:calc(calc(var(--spacing)) * 2)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:ms-0:is(:where(.tw\\:peer)[data-variant=inset]~*){margin-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:rounded-xl:is(:where(.tw\\:peer)[data-variant=inset]~*){border-radius:calc(var(--radius) * 1.4)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:shadow-sm:is(:where(.tw\\:peer)[data-variant=inset]~*){--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:peer-data-\\[state\\=collapsed\\]\\:ms-2:is(:where(.tw\\:peer)[data-variant=inset]~*):is(:where(.tw\\:peer)[data-state=collapsed]~*){margin-inline-start:calc(calc(var(--spacing)) * 2)}.tw\\:md\\:after\\:hidden:after{content:var(--tw-content);display:none}}@media (min-width:64rem){.tw\\:lg\\:flex{display:flex}.tw\\:lg\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}:where(.tw\\:lg\\:space-x-8>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 8) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 8) * calc(1 - var(--tw-space-x-reverse)))}.tw\\:lg\\:text-5xl{font-size:var(--tw-text-5xl);line-height:var(--tw-leading,var(--tw-text-5xl--line-height))}}@media (min-width:48rem){@media (min-width:64rem){.tw\\:md\\:lg\\:hidden{display:none}}}@media (min-width:80rem){.tw\\:xl\\:auto-cols-fr{grid-auto-columns:minmax(0,1fr)}.tw\\:xl\\:grid-flow-col{grid-auto-flow:column}.tw\\:xl\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.tw\\:xl\\:grid-cols-none{grid-template-columns:none}.tw\\:xl\\:grid-rows-2{grid-template-rows:repeat(2,minmax(0,1fr))}}@container search not (min-width:7rem){.tw\\:\\@max-\\[7rem\\]\\/search\\:hidden{display:none}.tw\\:\\@max-\\[7rem\\]\\/search\\:ps-3{padding-inline-start:calc(calc(var(--spacing)) * 3)}}@container search not (min-width:4rem){.tw\\:\\@max-\\[4rem\\]\\/search\\:hidden{display:none}.tw\\:\\@max-\\[4rem\\]\\/search\\:pe-3{padding-inline-end:calc(calc(var(--spacing)) * 3)}}@container search not (min-width:3rem){.tw\\:\\@max-\\[3rem\\]\\/search\\:ps-0{padding-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:\\@max-\\[3rem\\]\\/search\\:pe-0{padding-inline-end:calc(calc(var(--spacing)) * 0)}}@container (min-width:24rem){.tw\\:\\@sm\\:basis-auto{flex-basis:auto}}.tw\\:ltr\\:left-2:where(:dir(ltr),[dir=ltr],[dir=ltr] *){left:calc(calc(var(--spacing)) * 2)}.tw\\:ltr\\:-translate-x-1\\/2:where(:dir(ltr),[dir=ltr],[dir=ltr] *){--tw-translate-x:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:right-2:where(:dir(rtl),[dir=rtl],[dir=rtl] *){right:calc(calc(var(--spacing)) * 2)}.tw\\:rtl\\:flex:where(:dir(rtl),[dir=rtl],[dir=rtl] *){display:flex}.tw\\:rtl\\:-translate-x-px:where(:dir(rtl),[dir=rtl],[dir=rtl] *){--tw-translate-x:-1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:translate-x-1\\/2:where(:dir(rtl),[dir=rtl],[dir=rtl] *){--tw-translate-x:calc(1 / 2 * 100%);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:translate-x-px:where(:dir(rtl),[dir=rtl],[dir=rtl] *){--tw-translate-x:1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:after\\:translate-x-1\\/2:where(:dir(rtl),[dir=rtl],[dir=rtl] *):after{content:var(--tw-content);--tw-translate-x:calc(1 / 2 * 100%);translate:var(--tw-translate-x) var(--tw-translate-y)}:where([data-side=primary]) .tw\\:rtl\\:in-data-\\[side\\=primary\\]\\:cursor-e-resize:where(:dir(rtl),[dir=rtl],[dir=rtl] *){cursor:e-resize}:where([data-side=secondary]) .tw\\:rtl\\:in-data-\\[side\\=secondary\\]\\:cursor-w-resize:where(:dir(rtl),[dir=rtl],[dir=rtl] *){cursor:w-resize}.tw\\:rtl\\:aria-\\[orientation\\=horizontal\\]\\:after\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *)[aria-orientation=horizontal]:after{content:var(--tw-content);--tw-translate-x:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:data-\\[side\\=left\\]\\:translate-x-1:where(:dir(rtl),[dir=rtl],[dir=rtl] *)[data-side=left]{--tw-translate-x:calc(calc(var(--spacing)) * 1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:data-\\[side\\=right\\]\\:-translate-x-1:where(:dir(rtl),[dir=rtl],[dir=rtl] *)[data-side=right]{--tw-translate-x:calc(calc(var(--spacing)) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:dark\\:border-input:is(.dark *){border-color:var(--input)}.tw\\:dark\\:bg-destructive\\/20:is(.dark *){background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:bg-destructive\\/20:is(.dark *){background-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:dark\\:bg-input\\/30:is(.dark *){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:bg-input\\/30:is(.dark *){background-color:color-mix(in oklab, var(--input) 30%, transparent)}}.tw\\:dark\\:bg-transparent:is(.dark *){background-color:#0000}.tw\\:dark\\:text-amber-400:is(.dark *){color:var(--tw-color-amber-400)}.tw\\:dark\\:text-muted-foreground:is(.dark *){color:var(--muted-foreground)}.tw\\:dark\\:text-rose-400:is(.dark *){color:var(--tw-color-rose-400)}.tw\\:dark\\:text-sky-400:is(.dark *){color:var(--tw-color-sky-400)}.tw\\:dark\\:text-teal-400:is(.dark *){color:var(--tw-color-teal-400)}.tw\\:dark\\:after\\:mix-blend-lighten:is(.dark *):after{content:var(--tw-content);mix-blend-mode:lighten}@media (hover:hover){.tw\\:dark\\:hover\\:bg-blue-500:is(.dark *):hover{background-color:var(--tw-color-blue-500)}.tw\\:dark\\:hover\\:bg-destructive\\/30:is(.dark *):hover{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:hover\\:bg-destructive\\/30:is(.dark *):hover{background-color:color-mix(in oklab, var(--destructive) 30%, transparent)}}.tw\\:dark\\:hover\\:bg-input\\/50:is(.dark *):hover{background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:hover\\:bg-input\\/50:is(.dark *):hover{background-color:color-mix(in oklab, var(--input) 50%, transparent)}}.tw\\:dark\\:hover\\:bg-muted\\/50:is(.dark *):hover{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:hover\\:bg-muted\\/50:is(.dark *):hover{background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:dark\\:hover\\:text-foreground:is(.dark *):hover{color:var(--foreground)}}.tw\\:dark\\:focus-visible\\:ring-destructive\\/40:is(.dark *):focus-visible{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:focus-visible\\:ring-destructive\\/40:is(.dark *):focus-visible{--tw-ring-color:color-mix(in oklab, var(--destructive) 40%, transparent)}}.tw\\:dark\\:disabled\\:bg-input\\/80:is(.dark *):disabled{background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:disabled\\:bg-input\\/80:is(.dark *):disabled{background-color:color-mix(in oklab, var(--input) 80%, transparent)}}.tw\\:dark\\:disabled\\:bg-transparent:is(.dark *):disabled{background-color:#0000}:where([data-slot=tooltip-content]) .tw\\:dark\\:in-data-\\[slot\\=tooltip-content\\]\\:bg-background\\/10:is(.dark *){background-color:var(--background)}@supports (color:color-mix(in lab, red, red)){:where([data-slot=tooltip-content]) .tw\\:dark\\:in-data-\\[slot\\=tooltip-content\\]\\:bg-background\\/10:is(.dark *){background-color:color-mix(in oklab, var(--background) 10%, transparent)}}.tw\\:dark\\:has-disabled\\:bg-input\\/80:is(.dark *):has(:disabled){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:has-disabled\\:bg-input\\/80:is(.dark *):has(:disabled){background-color:color-mix(in oklab, var(--input) 80%, transparent)}}.tw\\:dark\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-destructive\\/40:is(.dark *):has([data-slot][aria-invalid=true]){--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-destructive\\/40:is(.dark *):has([data-slot][aria-invalid=true]){--tw-ring-color:color-mix(in oklab, var(--destructive) 40%, transparent)}}.tw\\:dark\\:aria-invalid\\:border-destructive\\/50:is(.dark *)[aria-invalid=true]{border-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:aria-invalid\\:border-destructive\\/50:is(.dark *)[aria-invalid=true]{border-color:color-mix(in oklab, var(--destructive) 50%, transparent)}}.tw\\:dark\\:aria-invalid\\:ring-destructive\\/40:is(.dark *)[aria-invalid=true]{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:aria-invalid\\:ring-destructive\\/40:is(.dark *)[aria-invalid=true]{--tw-ring-color:color-mix(in oklab, var(--destructive) 40%, transparent)}}.tw\\:dark\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-destructive\\/20:is(.dark *)[data-variant=destructive]:focus{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-destructive\\/20:is(.dark *)[data-variant=destructive]:focus{background-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:data-open\\:animate-in:where([data-state=open]),.tw\\:data-open\\:animate-in:where([data-open]:not([data-open=false])){animation:enter var(--tw-animation-duration,var(--tw-duration,.15s))var(--tw-ease,ease)var(--tw-animation-delay,0s)var(--tw-animation-iteration-count,1)var(--tw-animation-direction,normal)var(--tw-animation-fill-mode,none)}.tw\\:data-open\\:bg-accent:where([data-state=open]),.tw\\:data-open\\:bg-accent:where([data-open]:not([data-open=false])){background-color:var(--accent)}.tw\\:data-open\\:text-accent-foreground:where([data-state=open]),.tw\\:data-open\\:text-accent-foreground:where([data-open]:not([data-open=false])){color:var(--accent-foreground)}.tw\\:data-open\\:fade-in-0:where([data-state=open]),.tw\\:data-open\\:fade-in-0:where([data-open]:not([data-open=false])){--tw-enter-opacity:0}.tw\\:data-open\\:zoom-in-95:where([data-state=open]),.tw\\:data-open\\:zoom-in-95:where([data-open]:not([data-open=false])){--tw-enter-scale:.95}@media (hover:hover){:is(.tw\\:data-open\\:hover\\:bg-sidebar-accent:where([data-state=open]),.tw\\:data-open\\:hover\\:bg-sidebar-accent:where([data-open]:not([data-open=false]))):hover{background-color:var(--sidebar-accent)}:is(.tw\\:data-open\\:hover\\:text-sidebar-accent-foreground:where([data-state=open]),.tw\\:data-open\\:hover\\:text-sidebar-accent-foreground:where([data-open]:not([data-open=false]))):hover{color:var(--sidebar-accent-foreground)}}.tw\\:data-closed\\:animate-out:where([data-state=closed]),.tw\\:data-closed\\:animate-out:where([data-closed]:not([data-closed=false])){animation:exit var(--tw-animation-duration,var(--tw-duration,.15s))var(--tw-ease,ease)var(--tw-animation-delay,0s)var(--tw-animation-iteration-count,1)var(--tw-animation-direction,normal)var(--tw-animation-fill-mode,none)}.tw\\:data-closed\\:fade-out-0:where([data-state=closed]),.tw\\:data-closed\\:fade-out-0:where([data-closed]:not([data-closed=false])){--tw-exit-opacity:0}.tw\\:data-closed\\:zoom-out-95:where([data-state=closed]),.tw\\:data-closed\\:zoom-out-95:where([data-closed]:not([data-closed=false])){--tw-exit-scale:.95}.tw\\:data-checked\\:border-primary:where([data-state=checked]),.tw\\:data-checked\\:border-primary:where([data-checked]:not([data-checked=false])){border-color:var(--primary)}.tw\\:data-checked\\:bg-primary:where([data-state=checked]),.tw\\:data-checked\\:bg-primary:where([data-checked]:not([data-checked=false])){background-color:var(--primary)}.tw\\:data-checked\\:text-primary-foreground:where([data-state=checked]),.tw\\:data-checked\\:text-primary-foreground:where([data-checked]:not([data-checked=false])){color:var(--primary-foreground)}.tw\\:group-data-\\[size\\=default\\]\\/switch\\:data-checked\\:translate-x-\\[calc\\(100\\%-2px\\)\\]:is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-state=checked]),.tw\\:group-data-\\[size\\=default\\]\\/switch\\:data-checked\\:translate-x-\\[calc\\(100\\%-2px\\)\\]:is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-checked]:not([data-checked=false])),.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:data-checked\\:translate-x-\\[calc\\(100\\%-2px\\)\\]:is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-state=checked]),.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:data-checked\\:translate-x-\\[calc\\(100\\%-2px\\)\\]:is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-checked]:not([data-checked=false])){--tw-translate-x:calc(100% - 2px);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:group-data-\\[size\\=default\\]\\/switch\\:data-checked\\:-translate-x-\\[calc\\(100\\%-2px\\)\\]:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-state=checked]),.tw\\:rtl\\:group-data-\\[size\\=default\\]\\/switch\\:data-checked\\:-translate-x-\\[calc\\(100\\%-2px\\)\\]:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-checked]:not([data-checked=false])),.tw\\:rtl\\:group-data-\\[size\\=sm\\]\\/switch\\:data-checked\\:-translate-x-\\[calc\\(100\\%-2px\\)\\]:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-state=checked]),.tw\\:rtl\\:group-data-\\[size\\=sm\\]\\/switch\\:data-checked\\:-translate-x-\\[calc\\(100\\%-2px\\)\\]:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-checked]:not([data-checked=false])){--tw-translate-x:calc(calc(100% - 2px) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:dark\\:data-checked\\:bg-primary:is(.dark *):where([data-state=checked]),.tw\\:dark\\:data-checked\\:bg-primary:is(.dark *):where([data-checked]:not([data-checked=false])){background-color:var(--primary)}.tw\\:dark\\:data-checked\\:bg-primary-foreground:is(.dark *):where([data-state=checked]),.tw\\:dark\\:data-checked\\:bg-primary-foreground:is(.dark *):where([data-checked]:not([data-checked=false])){background-color:var(--primary-foreground)}.tw\\:data-unchecked\\:bg-input:where([data-state=unchecked]),.tw\\:data-unchecked\\:bg-input:where([data-unchecked]:not([data-unchecked=false])){background-color:var(--input)}.tw\\:group-data-\\[size\\=default\\]\\/switch\\:data-unchecked\\:translate-x-0:is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-state=unchecked]),.tw\\:group-data-\\[size\\=default\\]\\/switch\\:data-unchecked\\:translate-x-0:is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-unchecked]:not([data-unchecked=false])),.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:data-unchecked\\:translate-x-0:is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-state=unchecked]),.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:data-unchecked\\:translate-x-0:is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-unchecked]:not([data-unchecked=false])),.tw\\:rtl\\:group-data-\\[size\\=default\\]\\/switch\\:data-unchecked\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-state=unchecked]),.tw\\:rtl\\:group-data-\\[size\\=default\\]\\/switch\\:data-unchecked\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-unchecked]:not([data-unchecked=false])),.tw\\:rtl\\:group-data-\\[size\\=sm\\]\\/switch\\:data-unchecked\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-state=unchecked]),.tw\\:rtl\\:group-data-\\[size\\=sm\\]\\/switch\\:data-unchecked\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-unchecked]:not([data-unchecked=false])){--tw-translate-x:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:dark\\:data-unchecked\\:bg-foreground:is(.dark *):where([data-state=unchecked]),.tw\\:dark\\:data-unchecked\\:bg-foreground:is(.dark *):where([data-unchecked]:not([data-unchecked=false])){background-color:var(--foreground)}.tw\\:dark\\:data-unchecked\\:bg-input\\/80:is(.dark *):where([data-state=unchecked]),.tw\\:dark\\:data-unchecked\\:bg-input\\/80:is(.dark *):where([data-unchecked]:not([data-unchecked=false])){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:data-unchecked\\:bg-input\\/80:is(.dark *):where([data-state=unchecked]),.tw\\:dark\\:data-unchecked\\:bg-input\\/80:is(.dark *):where([data-unchecked]:not([data-unchecked=false])){background-color:color-mix(in oklab, var(--input) 80%, transparent)}}.tw\\:data-selected\\:bg-muted:where([data-selected=true]),.tw\\:data-selected\\:bg-muted\\/50:where([data-selected=true]){background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:data-selected\\:bg-muted\\/50:where([data-selected=true]){background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:data-selected\\:bg-primary:where([data-selected=true]){background-color:var(--primary)}.tw\\:data-selected\\:bg-transparent:where([data-selected=true]){background-color:#0000}.tw\\:data-selected\\:text-foreground:where([data-selected=true]){color:var(--foreground)}.tw\\:data-selected\\:text-inherit:where([data-selected=true]){color:inherit}.tw\\:data-selected\\:text-muted-foreground\\/50:where([data-selected=true]){color:var(--muted-foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:data-selected\\:text-muted-foreground\\/50:where([data-selected=true]){color:color-mix(in oklab, var(--muted-foreground) 50%, transparent)}}.tw\\:data-selected\\:text-primary-foreground:where([data-selected=true]){color:var(--primary-foreground)}.tw\\:data-selected\\:ring-2:where([data-selected=true]){--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:data-selected\\:ring-primary-foreground\\/70:where([data-selected=true]){--tw-ring-color:var(--primary-foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:data-selected\\:ring-primary-foreground\\/70:where([data-selected=true]){--tw-ring-color:color-mix(in oklab, var(--primary-foreground) 70%, transparent)}}.tw\\:data-selected\\:ring-ring\\/50:where([data-selected=true]){--tw-ring-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.tw\\:data-selected\\:ring-ring\\/50:where([data-selected=true]){--tw-ring-color:color-mix(in oklab, var(--ring) 50%, transparent)}}.tw\\:data-selected\\:ring-inset:where([data-selected=true]){--tw-ring-inset:inset}@media (forced-colors:active){.tw\\:forced-colors\\:data-selected\\:outline-2:where([data-selected=true]){outline-style:var(--tw-outline-style);outline-width:2px}.tw\\:forced-colors\\:data-selected\\:-outline-offset-2:where([data-selected=true]){outline-offset:calc(2px * -1)}.tw\\:forced-colors\\:data-selected\\:outline-\\[color\\:Highlight\\]:where([data-selected=true]){outline-color:highlight}}.tw\\:data-disabled\\:pointer-events-none:where([data-disabled=true]),.tw\\:data-disabled\\:pointer-events-none:where([data-disabled]:not([data-disabled=false])){pointer-events:none}.tw\\:data-disabled\\:cursor-not-allowed:where([data-disabled=true]),.tw\\:data-disabled\\:cursor-not-allowed:where([data-disabled]:not([data-disabled=false])){cursor:not-allowed}.tw\\:data-disabled\\:opacity-50:where([data-disabled=true]),.tw\\:data-disabled\\:opacity-50:where([data-disabled]:not([data-disabled=false])){opacity:.5}.tw\\:data-active\\:bg-background:where([data-state=active]),.tw\\:data-active\\:bg-background:where([data-active]:not([data-active=false])){background-color:var(--background)}.tw\\:data-active\\:bg-sidebar-accent:where([data-state=active]),.tw\\:data-active\\:bg-sidebar-accent:where([data-active]:not([data-active=false])){background-color:var(--sidebar-accent)}.tw\\:data-active\\:font-medium:where([data-state=active]),.tw\\:data-active\\:font-medium:where([data-active]:not([data-active=false])){--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}.tw\\:data-active\\:text-foreground:where([data-state=active]),.tw\\:data-active\\:text-foreground:where([data-active]:not([data-active=false])){color:var(--foreground)}.tw\\:data-active\\:text-sidebar-accent-foreground:where([data-state=active]),.tw\\:data-active\\:text-sidebar-accent-foreground:where([data-active]:not([data-active=false])){color:var(--sidebar-accent-foreground)}.tw\\:group-data-\\[variant\\=default\\]\\/tabs-list\\:data-active\\:shadow-sm:is(:where(.tw\\:group\\/tabs-list)[data-variant=default] *):where([data-state=active]),.tw\\:group-data-\\[variant\\=default\\]\\/tabs-list\\:data-active\\:shadow-sm:is(:where(.tw\\:group\\/tabs-list)[data-variant=default] *):where([data-active]:not([data-active=false])){--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:bg-transparent:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:bg-transparent:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false])){background-color:#0000}.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:shadow-none:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:shadow-none:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false])){--tw-shadow:0 0 #0000;box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}:is(.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:after\\:opacity-100:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:after\\:opacity-100:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false]))):after{content:var(--tw-content);opacity:1}.tw\\:dark\\:data-active\\:border-input:is(.dark *):where([data-state=active]),.tw\\:dark\\:data-active\\:border-input:is(.dark *):where([data-active]:not([data-active=false])){border-color:var(--input)}.tw\\:dark\\:data-active\\:bg-input\\/30:is(.dark *):where([data-state=active]),.tw\\:dark\\:data-active\\:bg-input\\/30:is(.dark *):where([data-active]:not([data-active=false])){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:data-active\\:bg-input\\/30:is(.dark *):where([data-state=active]),.tw\\:dark\\:data-active\\:bg-input\\/30:is(.dark *):where([data-active]:not([data-active=false])){background-color:color-mix(in oklab, var(--input) 30%, transparent)}}.tw\\:dark\\:data-active\\:text-foreground:is(.dark *):where([data-state=active]),.tw\\:dark\\:data-active\\:text-foreground:is(.dark *):where([data-active]:not([data-active=false])){color:var(--foreground)}.tw\\:dark\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:border-transparent:is(.dark *):is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:dark\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:border-transparent:is(.dark *):is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false])){border-color:#0000}.tw\\:dark\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:bg-transparent:is(.dark *):is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:dark\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:bg-transparent:is(.dark *):is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false])){background-color:#0000}.tw\\:data-horizontal\\:mx-px:where([data-orientation=horizontal]){margin-inline:1px}.tw\\:data-horizontal\\:h-1:where([data-orientation=horizontal]){height:calc(calc(var(--spacing)) * 1)}.tw\\:data-horizontal\\:h-full:where([data-orientation=horizontal]){height:100%}.tw\\:data-horizontal\\:h-px:where([data-orientation=horizontal]){height:1px}.tw\\:data-horizontal\\:w-auto:where([data-orientation=horizontal]){width:auto}.tw\\:data-horizontal\\:w-full:where([data-orientation=horizontal]){width:100%}.tw\\:data-horizontal\\:flex-col:where([data-orientation=horizontal]){flex-direction:column}.tw\\:data-vertical\\:my-px:where([data-orientation=vertical]){margin-block:1px}.tw\\:data-vertical\\:h-auto:where([data-orientation=vertical]){height:auto}.tw\\:data-vertical\\:h-full:where([data-orientation=vertical]){height:100%}.tw\\:data-vertical\\:min-h-40:where([data-orientation=vertical]){min-height:calc(calc(var(--spacing)) * 40)}.tw\\:data-vertical\\:w-1:where([data-orientation=vertical]){width:calc(calc(var(--spacing)) * 1)}.tw\\:data-vertical\\:w-auto:where([data-orientation=vertical]){width:auto}.tw\\:data-vertical\\:w-full:where([data-orientation=vertical]){width:100%}.tw\\:data-vertical\\:w-px:where([data-orientation=vertical]){width:1px}.tw\\:data-vertical\\:flex-col:where([data-orientation=vertical]){flex-direction:column}.tw\\:data-vertical\\:items-stretch:where([data-orientation=vertical]){align-items:stretch}.tw\\:data-vertical\\:self-stretch:where([data-orientation=vertical]){align-self:stretch}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:mt-0 [data-lexical-editor=true]>blockquote{margin-top:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:border-s-0 [data-lexical-editor=true]>blockquote{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:ps-0 [data-lexical-editor=true]>blockquote{padding-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:font-normal [data-lexical-editor=true]>blockquote{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:text-foreground [data-lexical-editor=true]>blockquote{color:var(--foreground)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:not-italic [data-lexical-editor=true]>blockquote{font-style:normal}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:mt-0 [data-lexical-editor=\\"true\\"]>blockquote{margin-top:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:border-s-0 [data-lexical-editor=\\"true\\"]>blockquote{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:ps-0 [data-lexical-editor=\\"true\\"]>blockquote{padding-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:font-normal [data-lexical-editor=\\"true\\"]>blockquote{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:text-foreground [data-lexical-editor=\\"true\\"]>blockquote{color:var(--foreground)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:not-italic [data-lexical-editor=\\"true\\"]>blockquote{font-style:normal}.tw\\:\\[\\&_a\\]\\:underline a{text-decoration-line:underline}.tw\\:\\[\\&_a\\]\\:underline-offset-3 a{text-underline-offset:3px}@media (hover:hover){.tw\\:\\[\\&_a\\]\\:hover\\:text-foreground a:hover{color:var(--foreground)}}.tw\\:\\[\\&_p\\]\\:my-0 p{margin-block:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_p\\:not\\(\\:last-child\\)\\]\\:mb-4 p:not(:last-child){margin-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&_s\\]\\:text-destructive s{color:var(--destructive)}.tw\\:\\[\\&_s\\]\\:line-through s{text-decoration-line:line-through}.tw\\:\\[\\&_svg\\]\\:pointer-events-none svg{pointer-events:none}.tw\\:\\[\\&_svg\\]\\:size-4 svg{width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&_svg\\]\\:shrink-0 svg{flex-shrink:0}.tw\\:\\[\\&_svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-3 svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:\\[\\&_svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-3\\.5 svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 3.5);height:calc(calc(var(--spacing)) * 3.5)}.tw\\:\\[\\&_svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-4 svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&_tr\\]\\:border-b tr{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}.tw\\:\\[\\&_tr\\:last-child\\]\\:border-0 tr:last-child{border-style:var(--tw-border-style);border-width:0}.tw\\:\\[\\&_u\\]\\:font-semibold u{--tw-font-weight:var(--tw-font-weight-semibold);font-weight:var(--tw-font-weight-semibold)}.tw\\:\\[\\&_u\\]\\:text-success-foreground u{color:var(--success-foreground)}.tw\\:\\[\\&_u\\]\\:no-underline u{text-decoration-line:none}.tw\\:\\[\\&\\:has\\(\\[role\\=checkbox\\]\\)\\]\\:pe-0:has([role=checkbox]){padding-inline-end:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\.border-b\\]\\:pb-2.border-b{padding-bottom:calc(calc(var(--spacing)) * 2)}.tw\\:\\[\\.border-b\\]\\:pb-4.border-b{padding-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[size\\=sm\\]\\/card\\:\\[\\.border-b\\]\\:pb-3:is(:where(.tw\\:group\\/card)[data-size=sm] *).border-b{padding-bottom:calc(calc(var(--spacing)) * 3)}.tw\\:\\[\\.border-t\\]\\:pt-2.border-t{padding-top:calc(calc(var(--spacing)) * 2)}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:px-2 *)[cmdk-group-heading]{padding-inline:calc(calc(var(--spacing)) * 2)}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:py-1\\.5 *)[cmdk-group-heading]{padding-block:calc(calc(var(--spacing)) * 1.5)}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:text-xs *)[cmdk-group-heading]{font-size:var(--tw-text-xs);line-height:var(--tw-leading,var(--tw-text-xs--line-height))}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:font-medium *)[cmdk-group-heading]{--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:text-muted-foreground *)[cmdk-group-heading]{color:var(--muted-foreground)}:is(.tw\\:\\*\\:\\[a\\]\\:underline>*):is(a){text-decoration-line:underline}:is(.tw\\:\\*\\:\\[a\\]\\:underline-offset-3>*):is(a){text-underline-offset:3px}@media (hover:hover){.tw\\:\\[a\\]\\:hover\\:bg-destructive\\/20:is(a):hover{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:\\[a\\]\\:hover\\:bg-destructive\\/20:is(a):hover{background-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:\\[a\\]\\:hover\\:bg-muted:is(a):hover{background-color:var(--muted)}.tw\\:\\[a\\]\\:hover\\:bg-primary\\/80:is(a):hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:\\[a\\]\\:hover\\:bg-primary\\/80:is(a):hover{background-color:color-mix(in oklab, var(--primary) 80%, transparent)}}.tw\\:\\[a\\]\\:hover\\:bg-secondary\\/80:is(a):hover{background-color:var(--secondary)}@supports (color:color-mix(in lab, red, red)){.tw\\:\\[a\\]\\:hover\\:bg-secondary\\/80:is(a):hover{background-color:color-mix(in oklab, var(--secondary) 80%, transparent)}}.tw\\:\\[a\\]\\:hover\\:text-muted-foreground:is(a):hover{color:var(--muted-foreground)}:is(.tw\\:\\*\\:\\[a\\]\\:hover\\:text-foreground>*):is(a):hover{color:var(--foreground)}}:is(.tw\\:\\*\\:\\[img\\]\\:row-span-2>*):is(img){grid-row:span 2/span 2}:is(.tw\\:\\*\\:\\[img\\]\\:translate-y-0\\.5>*):is(img){--tw-translate-y:calc(calc(var(--spacing)) * .5);translate:var(--tw-translate-x) var(--tw-translate-y)}:is(.tw\\:\\*\\:\\[img\\]\\:text-current>*):is(img){color:currentColor}:is(.tw\\:\\*\\:\\[img\\:first-child\\]\\:rounded-t-xl>*):is(img:first-child){border-top-left-radius:calc(var(--radius) * 1.4);border-top-right-radius:calc(var(--radius) * 1.4)}:is(.tw\\:\\*\\:\\[img\\:last-child\\]\\:rounded-b-xl>*):is(img:last-child){border-bottom-right-radius:calc(var(--radius) * 1.4);border-bottom-left-radius:calc(var(--radius) * 1.4)}:is(.tw\\:\\*\\:\\[img\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-4>*):is(img:not([class*=size-])){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}:is(.tw\\:\\*\\:\\[span\\]\\:last\\:flex>*):is(span):last-child{display:flex}:is(.tw\\:\\*\\:\\[span\\]\\:last\\:items-center>*):is(span):last-child{align-items:center}:is(.tw\\:\\*\\:\\[span\\]\\:last\\:gap-2>*):is(span):last-child{gap:calc(calc(var(--spacing)) * 2)}:is(.tw\\:\\*\\:\\[svg\\]\\:row-span-2>*):is(svg){grid-row:span 2/span 2}:is(.tw\\:\\*\\:\\[svg\\]\\:translate-y-0\\.5>*):is(svg){--tw-translate-y:calc(calc(var(--spacing)) * .5);translate:var(--tw-translate-x) var(--tw-translate-y)}:is(.tw\\:\\*\\:\\[svg\\]\\:text-current>*):is(svg){color:currentColor}:is(.tw\\:focus\\:\\*\\:\\[svg\\]\\:text-accent-foreground:focus>*):is(svg){color:var(--accent-foreground)}:is(.tw\\:data-\\[variant\\=destructive\\]\\:\\*\\:\\[svg\\]\\:text-destructive[data-variant=destructive]>*):is(svg){color:var(--destructive)}:is(.tw\\:data-\\[variant\\=destructive\\]\\:\\*\\:\\[svg\\]\\:text-destructive\\![data-variant=destructive]>*):is(svg){color:var(--destructive)!important}:is(.tw\\:data-selected\\:\\*\\:\\[svg\\]\\:text-foreground:where([data-selected=true])>*):is(svg){color:var(--foreground)}:is(.tw\\:\\*\\:\\[svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-4>*):is(svg:not([class*=size-])){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:rounded-s-none>:not(:first-child){border-start-start-radius:0;border-end-start-radius:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:rounded-t-none>:not(:first-child){border-top-left-radius:0;border-top-right-radius:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:border-s-0>:not(:first-child){border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:border-t-0>:not(:first-child){border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:last-child\\)\\]\\:rounded-e-none>:not(:last-child){border-start-end-radius:0;border-end-end-radius:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:last-child\\)\\]\\:rounded-b-none>:not(:last-child){border-bottom-right-radius:0;border-bottom-left-radius:0}.tw\\:has-\\[select\\[aria-hidden\\=true\\]\\:last-child\\]\\:\\[\\&\\>\\[data-slot\\=select-trigger\\]\\:last-of-type\\]\\:rounded-e-lg:has(:is(select[aria-hidden=true]:last-child))>[data-slot=select-trigger]:last-of-type{border-start-end-radius:var(--radius);border-end-end-radius:var(--radius)}.tw\\:\\[\\&\\>\\[data-slot\\=select-trigger\\]\\:not\\(\\[class\\*\\=w-\\]\\)\\]\\:w-fit>[data-slot=select-trigger]:not([class*=w-]){width:fit-content}.tw\\:\\[\\&\\>\\[data-slot\\]\\:not\\(\\:has\\(\\~\\[data-slot\\]\\)\\)\\]\\:rounded-e-lg\\!>[data-slot]:not(:has(~[data-slot])){border-start-end-radius:var(--radius)!important;border-end-end-radius:var(--radius)!important}.tw\\:\\[\\&\\>\\[data-slot\\]\\:not\\(\\:has\\(\\~\\[data-slot\\]\\)\\)\\]\\:rounded-b-lg\\!>[data-slot]:not(:has(~[data-slot])){border-bottom-right-radius:var(--radius)!important;border-bottom-left-radius:var(--radius)!important}.tw\\:\\[\\&\\>a\\]\\:underline>a{text-decoration-line:underline}.tw\\:\\[\\&\\>a\\]\\:underline-offset-4>a{text-underline-offset:4px}.tw\\:\\[\\&\\>a\\:hover\\]\\:text-primary>a:hover{color:var(--primary)}.tw\\:\\[\\&\\>blockquote\\]\\:my-0>blockquote{margin-block:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&\\>blockquote\\]\\:border-s-0>blockquote{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&\\>blockquote\\]\\:p-0>blockquote{padding:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&\\>blockquote\\]\\:ps-0>blockquote{padding-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&\\>blockquote\\]\\:font-normal>blockquote{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:\\[\\&\\>blockquote\\]\\:text-foreground>blockquote{color:var(--foreground)}.tw\\:\\[\\&\\>blockquote\\]\\:not-italic>blockquote{font-style:normal}.tw\\:\\[\\&\\>input\\]\\:flex-1>input{flex:1}.tw\\:has-\\[\\>\\[data-align\\=block-end\\]\\]\\:\\[\\&\\>input\\]\\:pt-3:has(>[data-align=block-end])>input{padding-top:calc(calc(var(--spacing)) * 3)}.tw\\:has-\\[\\>\\[data-align\\=block-start\\]\\]\\:\\[\\&\\>input\\]\\:pb-3:has(>[data-align=block-start])>input{padding-bottom:calc(calc(var(--spacing)) * 3)}.tw\\:has-\\[\\>\\[data-align\\=inline-end\\]\\]\\:\\[\\&\\>input\\]\\:pe-1\\.5:has(>[data-align=inline-end])>input{padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-\\[\\>\\[data-align\\=inline-start\\]\\]\\:\\[\\&\\>input\\]\\:ps-1\\.5:has(>[data-align=inline-start])>input{padding-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:\\[\\&\\>kbd\\]\\:rounded-\\[calc\\(var\\(--radius\\)-5px\\)\\]>kbd{border-radius:calc(var(--radius) - 5px)}.tw\\:\\[\\&\\>li\\]\\:mt-2>li{margin-top:calc(calc(var(--spacing)) * 2)}.tw\\:\\[\\&\\>span\\:last-child\\]\\:truncate>span:last-child{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.tw\\:\\[\\&\\>svg\\]\\:pointer-events-none>svg{pointer-events:none}.tw\\:\\[\\&\\>svg\\]\\:hidden>svg{display:none}.tw\\:\\[\\&\\>svg\\]\\:size-3\\!>svg{width:calc(calc(var(--spacing)) * 3)!important;height:calc(calc(var(--spacing)) * 3)!important}.tw\\:\\[\\&\\>svg\\]\\:size-3\\.5>svg{width:calc(calc(var(--spacing)) * 3.5);height:calc(calc(var(--spacing)) * 3.5)}.tw\\:\\[\\&\\>svg\\]\\:size-4>svg{width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&\\>svg\\]\\:shrink-0>svg{flex-shrink:0}.tw\\:\\[\\&\\>svg\\]\\:text-sidebar-accent-foreground>svg{color:var(--sidebar-accent-foreground)}.tw\\:group-has-data-\\[size\\=lg\\]\\/avatar-group\\:\\[\\&\\>svg\\]\\:size-5:is(:where(.tw\\:group\\/avatar-group):has([data-size=lg]) *)>svg{width:calc(calc(var(--spacing)) * 5);height:calc(calc(var(--spacing)) * 5)}.tw\\:group-has-data-\\[size\\=sm\\]\\/avatar-group\\:\\[\\&\\>svg\\]\\:size-3:is(:where(.tw\\:group\\/avatar-group):has([data-size=sm]) *)>svg{width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[size\\=default\\]\\/avatar\\:\\[\\&\\>svg\\]\\:size-2:is(:where(.tw\\:group\\/avatar)[data-size=default] *)>svg,.tw\\:group-data-\\[size\\=lg\\]\\/avatar\\:\\[\\&\\>svg\\]\\:size-2:is(:where(.tw\\:group\\/avatar)[data-size=lg] *)>svg{width:calc(calc(var(--spacing)) * 2);height:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[size\\=sm\\]\\/avatar\\:\\[\\&\\>svg\\]\\:hidden:is(:where(.tw\\:group\\/avatar)[data-size=sm] *)>svg,.tw\\:\\[\\&\\>svg\\:last-child\\]\\:hidden>svg:last-child{display:none}.tw\\:\\[\\&\\>svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-3\\.5>svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 3.5);height:calc(calc(var(--spacing)) * 3.5)}.tw\\:\\[\\&\\>svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-4>svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&\\>tr\\]\\:last\\:border-b-0>tr:last-child{border-bottom-style:var(--tw-border-style);border-bottom-width:0}.tw\\:\\[\\&\\[align\\=center\\]\\]\\:text-center[align=center]{text-align:center}.tw\\:\\[\\&\\[align\\=right\\]\\]\\:text-right[align=right]{text-align:right}.tw\\:\\[\\&\\[aria-orientation\\=horizontal\\]\\>div\\]\\:rotate-90[aria-orientation=horizontal]>div{rotate:90deg}[data-side=primary][data-collapsible=offcanvas] .tw\\:\\[\\[data-side\\=primary\\]\\[data-collapsible\\=offcanvas\\]_\\&\\]\\:-end-2{inset-inline-end:calc(calc(var(--spacing)) * -2)}[data-side=primary][data-state=collapsed] .tw\\:\\[\\[data-side\\=primary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-e-resize{cursor:e-resize}[data-side=primary][data-state=collapsed] .tw\\:rtl\\:\\[\\[data-side\\=primary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-w-resize:where(:dir(rtl),[dir=rtl],[dir=rtl] *){cursor:w-resize}[data-side=secondary][data-collapsible=offcanvas] .tw\\:\\[\\[data-side\\=secondary\\]\\[data-collapsible\\=offcanvas\\]_\\&\\]\\:-start-2{inset-inline-start:calc(calc(var(--spacing)) * -2)}[data-side=secondary][data-state=collapsed] .tw\\:\\[\\[data-side\\=secondary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-w-resize{cursor:w-resize}[data-side=secondary][data-state=collapsed] .tw\\:rtl\\:\\[\\[data-side\\=secondary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-e-resize:where(:dir(rtl),[dir=rtl],[dir=rtl] *){cursor:e-resize}}@property --tw-animation-delay{syntax:"*";inherits:false;initial-value:0s}@property --tw-animation-direction{syntax:"*";inherits:false;initial-value:normal}@property --tw-animation-duration{syntax:"*";inherits:false}@property --tw-animation-fill-mode{syntax:"*";inherits:false;initial-value:none}@property --tw-animation-iteration-count{syntax:"*";inherits:false;initial-value:1}@property --tw-enter-blur{syntax:"*";inherits:false;initial-value:0}@property --tw-enter-opacity{syntax:"*";inherits:false;initial-value:1}@property --tw-enter-rotate{syntax:"*";inherits:false;initial-value:0}@property --tw-enter-scale{syntax:"*";inherits:false;initial-value:1}@property --tw-enter-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-enter-translate-y{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-blur{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-opacity{syntax:"*";inherits:false;initial-value:1}@property --tw-exit-rotate{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-scale{syntax:"*";inherits:false;initial-value:1}@property --tw-exit-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-translate-y{syntax:"*";inherits:false;initial-value:0}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-cyrillic-ext-wght-normal.woff2)format("woff2-variations");unicode-range:U+460-52F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-cyrillic-wght-normal.woff2)format("woff2-variations");unicode-range:U+301,U+400-45F,U+490-491,U+4B0-4B1,U+2116}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-greek-wght-normal.woff2)format("woff2-variations");unicode-range:U+370-377,U+37A-37F,U+384-38A,U+38C,U+38E-3A1,U+3A3-3FF}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-vietnamese-wght-normal.woff2)format("woff2-variations");unicode-range:U+102-103,U+110-111,U+128-129,U+168-169,U+1A0-1A1,U+1AF-1B0,U+300-301,U+303-304,U+308-309,U+323,U+329,U+1EA0-1EF9,U+20AB}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-latin-ext-wght-normal.woff2)format("woff2-variations");unicode-range:U+100-2BA,U+2BD-2C5,U+2C7-2CC,U+2CE-2D7,U+2DD-2FF,U+304,U+308,U+329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-latin-wght-normal.woff2)format("woff2-variations");unicode-range:U+??,U+131,U+152-153,U+2BB-2BC,U+2C6,U+2DA,U+2DC,U+304,U+308,U+329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}.light,:root{--radius:.625rem;--spacing:.25rem;--background:oklch(100% 0 0);--foreground:oklch(13.71% .036 258.53);--card:oklch(100% 0 0);--card-foreground:oklch(13.71% .036 258.53);--popover:oklch(98.43% .0018 248.56);--popover-foreground:oklch(13.71% .036 258.53);--primary:oklch(20.79% .0399 265.73);--primary-foreground:oklch(98.38% .0036 248.23);--secondary:oklch(95.89% .011 248.06);--secondary-foreground:oklch(20.79% .0399 265.73);--muted:oklch(95.89% .011 248.06);--muted-foreground:oklch(55.47% .0408 257.45);--accent:oklch(95.89% .011 248.06);--accent-foreground:oklch(20.79% .0399 265.73);--destructive:oklch(63.69% .2077 25.32);--destructive-foreground:oklch(98.38% .0036 248.23);--success-foreground:oklch(62.7% .194 149.214);--diff-deleted:oklch(57.7% .245 27.325);--warning:oklch(84% .16 84);--warning-foreground:oklch(28% .07 46);--border:oklch(92.9% .0127 255.58);--input:oklch(92.9% .0127 255.58);--ring:oklch(13.71% .036 258.53);--chart-1:oklch(64.6% .222 41.116);--chart-2:oklch(60% .118 184.704);--chart-3:oklch(39.8% .07 227.392);--chart-4:oklch(82.8% .189 84.429);--chart-5:oklch(76.9% .188 70.08);--sidebar:oklch(98.43% .0018 248.56);--sidebar-foreground:oklch(13.71% .036 258.53);--sidebar-primary:oklch(20.79% .0399 265.73);--sidebar-primary-foreground:oklch(98.38% .0036 248.23);--sidebar-accent:oklch(95.89% .011 248.06);--sidebar-accent-foreground:oklch(20.79% .0399 265.73);--sidebar-border:oklch(92.9% .0127 255.58);--sidebar-ring:oklch(13.71% .036 258.53)}.dark{--background:oklch(13.71% .036 258.53);--foreground:oklch(98.38% .0036 248.23);--card:oklch(13.71% .036 258.53);--card-foreground:oklch(98.38% .0036 248.23);--popover:oklch(13.71% .036 258.53);--popover-foreground:oklch(98.38% .0036 248.23);--primary:oklch(98.38% .0036 248.23);--primary-foreground:oklch(20.79% .0399 265.73);--secondary:oklch(28% .037 259.98);--secondary-foreground:oklch(98.38% .0036 248.23);--muted:oklch(28% .037 259.98);--muted-foreground:oklch(71.07% .0351 256.8);--accent:oklch(28% .037 259.98);--accent-foreground:oklch(98.38% .0036 248.23);--destructive:oklch(39.6% .1331 25.71);--destructive-foreground:oklch(98.38% .0036 248.23);--success-foreground:oklch(79.2% .209 151.711);--diff-deleted:oklch(70.4% .191 22.216);--warning:oklch(41% .11 46);--warning-foreground:oklch(99% .02 95);--border:oklch(44.54% .0374 257.3);--input:oklch(44.54% .0374 257.3);--ring:oklch(86.88% .0199 252.89);--chart-1:oklch(48.8% .243 264.376);--chart-2:oklch(69.6% .17 162.48);--chart-3:oklch(76.9% .188 70.08);--chart-4:oklch(62.7% .265 303.9);--chart-5:oklch(64.5% .246 16.439);--sidebar:oklch(13.71% .036 258.53);--sidebar-foreground:oklch(71.07% .0351 256.8);--sidebar-primary:oklch(98.38% .0036 248.23);--sidebar-primary-foreground:oklch(20.79% .0399 265.73);--sidebar-accent:oklch(28% .037 259.98);--sidebar-accent-foreground:oklch(71.07% .0351 256.8);--sidebar-border:oklch(28% .037 259.98);--sidebar-ring:oklch(86.88% .0199 252.89)}.paratext-light{--background:oklch(100% 0 0);--foreground:oklch(15.3% .006 107.1);--card:oklch(100% 0 0);--card-foreground:oklch(15.3% .006 107.1);--popover:oklch(100% 0 0);--popover-foreground:oklch(15.3% .006 107.1);--primary:oklch(55.5% .163 48.998);--primary-foreground:oklch(98.7% .022 95.277);--secondary:oklch(96.7% .001 286.375);--secondary-foreground:oklch(21% .006 285.885);--muted:oklch(96.6% .005 106.5);--muted-foreground:oklch(58% .031 107.3);--accent:oklch(96.6% .005 106.5);--accent-foreground:oklch(22.8% .013 107.4);--destructive:oklch(57.7% .245 27.325);--destructive-foreground:oklch(98.38% .0036 248.23);--success-foreground:oklch(62.7% .194 149.214);--diff-deleted:oklch(57.7% .245 27.325);--warning:oklch(84% .16 84);--warning-foreground:oklch(28% .07 46);--border:oklch(93% .007 106.5);--input:oklch(93% .007 106.5);--ring:oklch(73.7% .021 106.9);--chart-1:oklch(88% .011 106.6);--chart-2:oklch(58% .031 107.3);--chart-3:oklch(46.6% .025 107.3);--chart-4:oklch(39.4% .023 107.4);--chart-5:oklch(28.6% .016 107.4);--sidebar:oklch(98.8% .003 106.5);--sidebar-foreground:oklch(15.3% .006 107.1);--sidebar-primary:oklch(66.6% .179 58.318);--sidebar-primary-foreground:oklch(98.7% .022 95.277);--sidebar-accent:oklch(96.6% .005 106.5);--sidebar-accent-foreground:oklch(22.8% .013 107.4);--sidebar-border:oklch(93% .007 106.5);--sidebar-ring:oklch(73.7% .021 106.9)}.paratext-dark{--background:oklch(15.3% .006 107.1);--foreground:oklch(98.8% .003 106.5);--card:oklch(22.8% .013 107.4);--card-foreground:oklch(98.8% .003 106.5);--popover:oklch(22.8% .013 107.4);--popover-foreground:oklch(98.8% .003 106.5);--primary:oklch(47.3% .137 46.201);--primary-foreground:oklch(98.7% .022 95.277);--secondary:oklch(27.4% .006 286.033);--secondary-foreground:oklch(98.5% 0 0);--muted:oklch(28.6% .016 107.4);--muted-foreground:oklch(73.7% .021 106.9);--accent:oklch(28.6% .016 107.4);--accent-foreground:oklch(98.8% .003 106.5);--destructive:oklch(70.4% .191 22.216);--destructive-foreground:oklch(98.38% .0036 248.23);--success-foreground:oklch(79.2% .209 151.711);--diff-deleted:oklch(70.4% .191 22.216);--warning:oklch(41% .11 46);--warning-foreground:oklch(99% .02 95);--border:oklch(100% 0 0/.1);--input:oklch(100% 0 0/.15);--ring:oklch(58% .031 107.3);--chart-1:oklch(88% .011 106.6);--chart-2:oklch(58% .031 107.3);--chart-3:oklch(46.6% .025 107.3);--chart-4:oklch(39.4% .023 107.4);--chart-5:oklch(28.6% .016 107.4);--sidebar:oklch(22.8% .013 107.4);--sidebar-foreground:oklch(98.8% .003 106.5);--sidebar-primary:oklch(76.9% .188 70.08);--sidebar-primary-foreground:oklch(27.9% .077 45.635);--sidebar-accent:oklch(28.6% .016 107.4);--sidebar-accent-foreground:oklch(98.8% .003 106.5);--sidebar-border:oklch(100% 0 0/.1);--sidebar-ring:oklch(58% .031 107.3)}@property --tw-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-y{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-z{syntax:"*";inherits:false;initial-value:0}@property --tw-rotate-x{syntax:"*";inherits:false}@property --tw-rotate-y{syntax:"*";inherits:false}@property --tw-rotate-z{syntax:"*";inherits:false}@property --tw-skew-x{syntax:"*";inherits:false}@property --tw-skew-y{syntax:"*";inherits:false}@property --tw-space-y-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-space-x-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-divide-x-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-border-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-divide-y-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-leading{syntax:"*";inherits:false}@property --tw-font-weight{syntax:"*";inherits:false}@property --tw-tracking{syntax:"*";inherits:false}@property --tw-ordinal{syntax:"*";inherits:false}@property --tw-slashed-zero{syntax:"*";inherits:false}@property --tw-numeric-figure{syntax:"*";inherits:false}@property --tw-numeric-spacing{syntax:"*";inherits:false}@property --tw-numeric-fraction{syntax:"*";inherits:false}@property --tw-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-shadow-color{syntax:"*";inherits:false}@property --tw-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-inset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-shadow-color{syntax:"*";inherits:false}@property --tw-inset-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-ring-color{syntax:"*";inherits:false}@property --tw-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-ring-color{syntax:"*";inherits:false}@property --tw-inset-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-ring-inset{syntax:"*";inherits:false}@property --tw-ring-offset-width{syntax:"<length>";inherits:false;initial-value:0}@property --tw-ring-offset-color{syntax:"*";inherits:false;initial-value:#fff}@property --tw-ring-offset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-blur{syntax:"*";inherits:false}@property --tw-brightness{syntax:"*";inherits:false}@property --tw-contrast{syntax:"*";inherits:false}@property --tw-grayscale{syntax:"*";inherits:false}@property --tw-hue-rotate{syntax:"*";inherits:false}@property --tw-invert{syntax:"*";inherits:false}@property --tw-opacity{syntax:"*";inherits:false}@property --tw-saturate{syntax:"*";inherits:false}@property --tw-sepia{syntax:"*";inherits:false}@property --tw-drop-shadow{syntax:"*";inherits:false}@property --tw-drop-shadow-color{syntax:"*";inherits:false}@property --tw-drop-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-drop-shadow-size{syntax:"*";inherits:false}@property --tw-duration{syntax:"*";inherits:false}@property --tw-ease{syntax:"*";inherits:false}@property --tw-content{syntax:"*";inherits:false;initial-value:""}@property --tw-backdrop-blur{syntax:"*";inherits:false}@property --tw-backdrop-brightness{syntax:"*";inherits:false}@property --tw-backdrop-contrast{syntax:"*";inherits:false}@property --tw-backdrop-grayscale{syntax:"*";inherits:false}@property --tw-backdrop-hue-rotate{syntax:"*";inherits:false}@property --tw-backdrop-invert{syntax:"*";inherits:false}@property --tw-backdrop-opacity{syntax:"*";inherits:false}@property --tw-backdrop-saturate{syntax:"*";inherits:false}@property --tw-backdrop-sepia{syntax:"*";inherits:false}@property --tw-outline-style{syntax:"*";inherits:false;initial-value:solid}@keyframes spin{to{transform:rotate(360deg)}}@keyframes pulse{50%{opacity:.5}}@keyframes enter{0%{opacity:var(--tw-enter-opacity,1);transform:translate3d(var(--tw-enter-translate-x,0),var(--tw-enter-translate-y,0),0)scale3d(var(--tw-enter-scale,1),var(--tw-enter-scale,1),var(--tw-enter-scale,1))rotate(var(--tw-enter-rotate,0));filter:blur(var(--tw-enter-blur,0))}}@keyframes exit{to{opacity:var(--tw-exit-opacity,1);transform:translate3d(var(--tw-exit-translate-x,0),var(--tw-exit-translate-y,0),0)scale3d(var(--tw-exit-scale,1),var(--tw-exit-scale,1),var(--tw-exit-scale,1))rotate(var(--tw-exit-rotate,0));filter:blur(var(--tw-exit-blur,0))}}
`, "after-all");
export {
  tf as Alert,
  ef as AlertDescription,
  rf as AlertTitle,
  Rw as Avatar,
  Dw as AvatarFallback,
  nh as AvatarImage,
  Gp as BOOK_CHAPTER_CONTROL_STRING_KEYS,
  Yp as BOOK_SELECTOR_STRING_KEYS,
  zr as Badge,
  ja as BookChapterControl,
  po as BookSelectionMode,
  Wp as BookSelector,
  J as Button,
  ya as ButtonGroup,
  bo as ButtonGroupSeparator,
  af as ButtonGroupText,
  Ui as CANCEL_ACCEPT_BUTTONS_STRING_KEYS,
  Zp as COMMENT_EDITOR_STRING_KEYS,
  Ew as COMMENT_LIST_ELEMENT_ID,
  Qp as COMMENT_LIST_STRING_KEYS,
  Xp as CONFLICT_NOTE_STRING_KEYS,
  Ki as CancelAcceptButtons,
  Tw as Card,
  Sw as CardContent,
  ah as CardDescription,
  oh as CardFooter,
  eh as CardHeader,
  rh as CardTitle,
  ld as ChapterRangeSelector,
  Xi as Checkbox,
  rg as CheckboxGroup,
  up as Checklist,
  fn as ComboBox,
  er as Command,
  ka as CommandEmpty,
  je as CommandGroup,
  xa as CommandInput,
  Ue as CommandItem,
  rr as CommandList,
  Jp as CommentEditor,
  ih as CommentList,
  Ow as ConflictNoteCard,
  cg as ContextMenu,
  vg as ContextMenuCheckboxItem,
  hg as ContextMenuContent,
  dg as ContextMenuGroup,
  gg as ContextMenuItem,
  xg as ContextMenuLabel,
  wg as ContextMenuPortal,
  pg as ContextMenuRadioGroup,
  bg as ContextMenuRadioItem,
  yg as ContextMenuSeparator,
  kg as ContextMenuShortcut,
  ug as ContextMenuSub,
  mg as ContextMenuSubContent,
  fg as ContextMenuSubTrigger,
  lg as ContextMenuTrigger,
  Kw as DataTable,
  ag as DestructiveKeyConfirmation,
  Ja as Dialog,
  of as DialogClose,
  Za as DialogContent,
  nf as DialogDescription,
  Wo as DialogFooter,
  Qa as DialogHeader,
  sf as DialogOverlay,
  cf as DialogPortal,
  to as DialogTitle,
  lf as DialogTrigger,
  Fu as DisabledActionTooltip,
  Bu as DisabledTooltipWrapper,
  _g as Drawer,
  Cg as DrawerClose,
  Eg as DrawerContent,
  Dg as DrawerDescription,
  Sg as DrawerFooter,
  Tg as DrawerHeader,
  gp as DrawerOverlay,
  hp as DrawerPortal,
  Rg as DrawerTitle,
  Ng as DrawerTrigger,
  Me as DropdownMenu,
  Le as DropdownMenuCheckboxItem,
  ze as DropdownMenuContent,
  Fn as DropdownMenuGroup,
  $e as DropdownMenuItem,
  Gw as DropdownMenuItemType,
  br as DropdownMenuLabel,
  Rs as DropdownMenuPortal,
  gs as DropdownMenuRadioGroup,
  fs as DropdownMenuRadioItem,
  Je as DropdownMenuSeparator,
  df as DropdownMenuShortcut,
  Ts as DropdownMenuSub,
  Ds as DropdownMenuSubContent,
  Ss as DropdownMenuSubTrigger,
  be as DropdownMenuTrigger,
  Hw as ERROR_DUMP_STRING_KEYS,
  dh as ERROR_POPOVER_STRING_KEYS,
  Jw as EditorKeyboardShortcuts,
  Mg as Empty,
  $g as EmptyContent,
  Pg as EmptyDescription,
  zg as EmptyHeader,
  Og as EmptyMedia,
  ng as EmptyState,
  Ig as EmptyTitle,
  qw as ErrorDump,
  wh as ErrorPopover,
  mh as FOOTNOTE_EDITOR_STRING_KEYS,
  gh as Filter,
  uh as FilterDropdown,
  hh as Footer,
  fh as FootnoteEditor,
  hu as FootnoteItem,
  vh as FootnoteList,
  tg as INTERFACE_LANGUAGE_PICKER_STRING_KEYS,
  Ch as INVENTORY_STRING_KEYS,
  _a as Input,
  eg as InterfaceLanguagePicker,
  Eh as Inventory,
  eo as Kbd,
  wf as KbdGroup,
  Dt as Label,
  au as MARKER_MENU_STRING_KEYS,
  lh as MarkdownRenderer,
  iu as MarkerMenu,
  ph as MoreInfo,
  ms as MultiSelectComboBox,
  Xh as NavigationContentSearch,
  Qe as Popover,
  ks as PopoverAnchor,
  tr as PopoverContent,
  uf as PopoverDescription,
  pf as PopoverHeader,
  Pa as PopoverPortalContainerProvider,
  hf as PopoverTitle,
  xr as PopoverTrigger,
  Ag as Progress,
  xo as RadioGroup,
  wa as RadioGroupItem,
  Ql as RecentSearches,
  gf as ResizableHandle,
  ff as ResizablePanel,
  mf as ResizablePanelGroup,
  og as ResultsCard,
  Fh as SCOPE_SELECTOR_STRING_KEYS,
  Hu as SELECT_BOOKS_STRING_KEYS,
  aa as SHRINK_STEP,
  Uh as ScopeSelector,
  Bh as ScriptureResultsViewer,
  Kh as ScrollGroupSelector,
  Hn as SearchBar,
  gr as Select,
  Ku as SelectBooks,
  ju as SelectBooksPicker,
  vr as SelectContent,
  jw as SelectGroup,
  pe as SelectItem,
  sh as SelectLabel,
  Fw as SelectScrollDownButton,
  Bw as SelectScrollUpButton,
  ch as SelectSeparator,
  mr as SelectTrigger,
  fr as SelectValue,
  Or as Separator,
  Hh as SettingsList,
  Gh as SettingsListHeader,
  qh as SettingsListItem,
  zu as SettingsSidebar,
  jh as SettingsSidebarContentSearch,
  Po as ShrinkStepContext,
  Cu as Sidebar,
  Tu as SidebarContent,
  Mh as SidebarFooter,
  In as SidebarGroup,
  Oh as SidebarGroupAction,
  $n as SidebarGroupContent,
  Pn as SidebarGroupLabel,
  Dh as SidebarHeader,
  Rh as SidebarInput,
  Eu as SidebarInset,
  Su as SidebarMenu,
  Ih as SidebarMenuAction,
  Ph as SidebarMenuBadge,
  Mu as SidebarMenuButton,
  Ru as SidebarMenuItem,
  $h as SidebarMenuSkeleton,
  Ah as SidebarMenuSub,
  Lh as SidebarMenuSubButton,
  Vh as SidebarMenuSubItem,
  Nu as SidebarProvider,
  Sh as SidebarRail,
  zh as SidebarSeparator,
  Th as SidebarTrigger,
  dr as Skeleton,
  Lg as Slider,
  Vg as Sonner,
  vf as Spinner,
  jg as Switch,
  mo as TabDropdownMenu,
  Wh as TabFloatingMenu,
  Yh as TabToolbar,
  ko as Table,
  No as TableBody,
  bf as TableCaption,
  wr as TableCell,
  xf as TableFooter,
  ua as TableHead,
  _o as TableHeader,
  Ae as TableRow,
  Bg as Tabs,
  Kg as TabsContent,
  Fg as TabsList,
  Ug as TabsTrigger,
  ig as TextField,
  Hp as Textarea,
  Bn as ToggleGroup,
  ta as ToggleGroupItem,
  Zh as Toolbar,
  Yl as ToolbarCompoundLabel,
  _t as Tooltip,
  Ct as TooltipContent,
  Mt as TooltipProvider,
  Nt as TooltipTrigger,
  Ww as UNDO_REDO_BUTTONS_STRING_KEYS,
  Qh as UiLanguageSelector,
  Xw as UndoRedoButtons,
  as as VerticalTabs,
  ns as VerticalTabsContent,
  os as VerticalTabsList,
  Xu as VerticalTabsTrigger,
  sg as WizardStepper,
  Oe as Z_INDEX_ABOVE_DOCK,
  Un as Z_INDEX_ABOVE_POPOVER,
  yf as Z_INDEX_FIRST_RUN,
  kf as Z_INDEX_MODAL,
  _f as Z_INDEX_MODAL_BACKDROP,
  Cs as Z_INDEX_OVERLAY,
  Nf as badgeVariants,
  Cf as buttonGroupVariants,
  Ef as buttonVariants,
  m as cn,
  Nh as getBookIdFromUSFM,
  th as getCommentThreadElementId,
  Ta as getInventoryHeader,
  kh as getLinesFromUSFM,
  _h as getNumberFromUSFM,
  bu as getStatusForItem,
  Jh as getToolbarOSReservedSpaceClassName,
  xh as inventoryCountColumn,
  bh as inventoryItemColumn,
  yh as inventoryStatusColumn,
  yo as isMacOs,
  Tf as isWindows,
  cu as markerMenuItemToPaletteItem,
  xp as pickTabIconUrl,
  Rf as sonner,
  Hg as useEvent,
  qg as useEventAsync,
  Wg as useExtraValidMarkers,
  hs as useListbox,
  Gg as usePromise,
  qp as useRecentSearches,
  Xg as useRunWhenVisible,
  es as useShrinkStep,
  ql as useShrinkStepValue,
  Sa as useSidebar,
  Yg as useStylesheet,
  Jg as useTabIconSelection,
  Go as useTruncationTooltip,
  bp as useViewVisibility
};
//# sourceMappingURL=index.js.map
