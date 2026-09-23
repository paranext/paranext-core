var _s = Object.defineProperty;
var Ns = (t, e, r) => e in t ? _s(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var Wt = (t, e, r) => Ns(t, typeof e != "symbol" ? e + "" : e, r);
import { c as b, g as Ae, a as jr, C as tr, L as Gn, u as an, T as zt, b as kt, d as _t, e as Nt, A as ka, D as Be, f as Se, h as je, i as cr, j as Ge, B as tt, x as Cs, k as Es, l as Ts, I as Ss, m as Ro, n as Xe, r as Oe, o as Rs, p as Wn, P as lr, q as Rr, s as dr, t as wr, v as Ia, w as za, y as Do, z as ur, E as Pa, F as It, R as Oo, G as _a, H as co, J as lo, K as wo, M as uo, N as Yn, O as pa, Q as Mo, S as Hr, U as qr, V as xr, W as Ds, X as ir, Y as Ze, Z as Fe, _ as We, $ as yr, a0 as Io, a1 as zo, a2 as Na, a3 as Po, a4 as Zn, a5 as Os, a6 as Ms, a7 as Is, a8 as po, a9 as Xn, aa as Aa, ab as zs, ac as Jn, ad as Ps, ae as As, af as $s, ag as on, ah as Vs, ai as Ls, aj as Bs, ak as Qn, al as ti, am as Ao, an as js, ao as ei, ap as qa, aq as nn, ar as Ga, as as Fs, at as Us, au as Ks, av as Hs, aw as qs, ax as Gs, ay as Zr, az as $o, aA as Ws, aB as Ys } from "./resizable-DOlm3N_b.js";
import { aC as Nf, aD as Cf, aE as Ef, aF as Tf, aG as Sf, aH as Rf, aI as Df, aJ as Of, aK as Mf, aL as If, aM as zf, aN as Pf, aO as Af, aP as $f, aQ as Vf, aR as Lf, aS as Bf, aT as jf, aU as Ff, aV as Uf, aW as Kf, aX as Hf, aY as qf, aZ as Gf, a_ as Wf, a$ as Yf, b0 as Zf, b1 as Xf, b2 as Jf, b3 as Qf, b4 as tm, b5 as em, b6 as rm, b7 as am, b8 as om, b9 as nm, ba as im } from "./resizable-DOlm3N_b.js";
import { jsx as a, jsxs as u, Fragment as ht } from "react/jsx-runtime";
import { Canon as jt } from "@sillsdev/scripture";
import { Check as Je, Clock as sn, ChevronsLeft as cn, ChevronsRight as ln, ChevronUp as ri, ChevronDown as sr, ArrowLeft as Zs, ArrowRight as Xs, BoldIcon as Js, ItalicIcon as Qs, X as ai, AtSign as oi, Pencil as tc, Trash2 as ec, Undo2 as rc, ArrowUp as ni, MoreHorizontal as ac, MailOpen as oc, Mail as nc, FilterIcon as ic, ArrowLeftIcon as sc, ChevronLeftIcon as cc, ChevronRightIcon as lc, ArrowRightIcon as dc, Copy as ii, Filter as wc, User as uc, Link as pc, CircleHelp as hc, Undo as gc, Redo as fc, SquareX as si, FunctionSquare as ci, SquareSigma as li, Ban as mc, AlertCircle as ho, CircleCheckIcon as vc, CircleXIcon as bc, CircleHelpIcon as xc, ArrowUpIcon as yc, ArrowDownIcon as kc, ScrollText as _c, ChevronRight as Nc, ChevronLeft as Cc, ChevronsUpDown as Ec, MenuIcon as Tc, Menu as Sc, EllipsisVertical as Rc, MoreVertical as Dc } from "lucide-react";
import { Section as Mt, compareScrRefs as Ca, getChaptersForBook as Oc, formatScrRef as $e, formatReplacementString as Ye, getSectionForBook as ha, formatRelativeDate as Mc, sanitizeHtml as Vo, NumberFormat as di, formatBytes as Ic, getCurrentLocale as zc, usfmMarkers as ga, isPlatformError as Pc, ABORTED as Ac, getErrorMessage as $c, getFormatCallerFunction as Vc, deepEqual as Lc, isString as dn, scrRefToBBBCCCVVV as Wa, defaultScrRef as Ya, formatScrRefRange as Bc, getLocalizeKeyForScrollGroupId as wn, formatReplacementStringToArray as un, collectUsjMarkers as jc } from "platform-bible-utils";
import Zt, { useRef as V, useMemo as P, createContext as Dr, useContext as Xr, useState as N, useEffect as Z, useCallback as $, useId as Ea, useImperativeHandle as Fc, useLayoutEffect as Xt, Fragment as Jr, Component as Uc, createElement as go, Suspense as Kc, forwardRef as Lo, memo as wi } from "react";
import { IconSelector as ui, IconCheck as $a, IconChevronDown as Hc, IconChevronUp as qc, IconLayoutSidebar as Gc, IconLayoutSidebarRight as Wc, IconChevronRight as pi, IconSearch as Yc, IconLoader as Zc, IconAlertOctagon as Xc, IconAlertTriangle as Jc, IconInfoCircle as Qc, IconCircleCheck as tl } from "@tabler/icons-react";
import { createEditor as hi, $getRoot as Qe, $createParagraphNode as Qr, $getSelection as ae, HISTORY_MERGE_TAG as Bo, ParagraphNode as gi, TextNode as fi, $getPreviousSelection as el, $isRangeSelection as Re, $caretFromPoint as rl, $getSiblingCaret as mi, $getChildCaret as al, $getAdjacentChildCaret as ol, $isChildCaret as nl, $normalizeCaret as il, $setSelectionFromCaretRange as sl, $getCollapsedCaretRange as cl, $getCaretInDirection as pn, $splitAtPointCaretNext as ll, $isTextPointCaret as dl, $findMatchingParent as vi, $isElementNode as Gr, mergeRegister as Le, getDOMTextNode as wl, isHTMLElement as ul, CLEAR_EDITOR_COMMAND as bi, COMMAND_PRIORITY_EDITOR as jo, shallowMergeConfig as pl, defineExtension as ue, safeCast as pr, createState as hl, FORMAT_TEXT_COMMAND as xi, $isNodeSelection as yi, COMMAND_PRIORITY_LOW as ki, RootNode as gl, LineBreakNode as fl, TabNode as ml, $isEditorState as vl, createCommand as bl, CLICK_COMMAND as xl, isDOMNode as yl, $getNodeFromDOMNode as kl, $createNodeSelection as _l, $setSelection as Nl, $getEditor as Cl, DecoratorNode as fo, $getState as El, toggleTextFormatType as hn, TEXT_TYPE_TO_FORMAT as Tl, $setState as Sl, addClassNamesToElement as _i, $create as Rl, $getNodeByKey as Dl, removeClassNamesFromElement as Ol, KEY_TAB_COMMAND as Ml, $isBlockElementNode as Il, $createRangeSelection as zl, $normalizeSelection__EXPERIMENTAL as Pl, OUTDENT_CONTENT_COMMAND as Al, INDENT_CONTENT_COMMAND as gn, INSERT_TAB_COMMAND as $l, COMMAND_PRIORITY_CRITICAL as Fo, $isDecoratorNode as Vl, $isParagraphNode as Ll, $isTextNode as mo, SELECTION_CHANGE_COMMAND as Ni, $insertNodes as Bl } from "lexical";
import { HeadingNode as jl, QuoteNode as Fl, registerRichText as Ul } from "@lexical/rich-text";
import { flushSync as Kl, createPortal as Hl } from "react-dom";
import { $isTableSelection as ql } from "@lexical/table";
import { createHeadlessEditor as Ci } from "@lexical/headless";
import { $generateHtmlFromNodes as Gl, $generateNodesFromDOM as Wl } from "@lexical/html";
import { Avatar as Uo, Select as Jt, Checkbox as fn, Slot as ta, Tabs as be, Menubar as Me, ContextMenu as Ft, Progress as mn, Slider as sa, Switch as vn } from "radix-ui";
import { useReactTable as Ei, getFilteredRowModel as Yl, getSortedRowModel as Ti, getPaginationRowModel as Zl, getCoreRowModel as Si, flexRender as Fr, getGroupedRowModel as Xl, getExpandedRowModel as Jl } from "@tanstack/react-table";
import Ql from "markdown-to-jsx";
import { GENERATOR_NOTE_CALLER as vo, HIDDEN_NOTE_CALLER as bo, getDefaultViewOptions as td, isInsertEmbedOpOfType as Ar, getMarkerMenuItems as ed, defaultStyleInfo as rd, Editorial as ad } from "@eten-tech-foundation/platform-editor";
import { cva as Ri } from "class-variance-authority";
import { useHotkeys as od } from "react-hotkeys-hook";
import { Drawer as er } from "vaul";
import { useTheme as nd } from "next-themes";
import { Toaster as id } from "sonner";
import { toast as cm } from "sonner";
function mh({ className: t, ...e }) {
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
function Di({
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
  const v = V(!1), x = () => {
    p || (v.current || o == null || o(e), setTimeout(() => {
      v.current = !1;
    }, 100));
  }, g = (U) => {
    if (p) {
      U.preventDefault();
      return;
    }
    v.current = !0, n ? n(U) : o == null || o(e);
  }, T = P(
    () => Ae(e, d),
    [e, d]
  ), k = P(
    () => jr(e, d),
    [e, d]
  ), E = !!h && !p, C = `${T} (${k})`, A = E ? f || `${C}, ${h}` : C, j = /* @__PURE__ */ u(
    tr,
    {
      ref: t,
      value: l || `${e} ${jt.bookIdToEnglishName(e)}`,
      onSelect: x,
      onMouseDown: g,
      role: "option",
      "aria-selected": r,
      "aria-disabled": p || void 0,
      "aria-label": A,
      disabled: p,
      className: b(
        !w && Gn,
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
        E && "tw:bg-muted/50 tw:text-muted-foreground/50 tw:data-selected:bg-muted/50 tw:data-selected:text-muted-foreground/50"
      ),
      children: [
        c && /* @__PURE__ */ a(
          Je,
          {
            className: b(
              "tw:me-2 tw:h-4 tw:w-4 tw:shrink-0",
              r ? "tw:opacity-100" : "tw:opacity-0"
            )
          }
        ),
        /* @__PURE__ */ a("span", { className: "tw:min-w-0 tw:flex-1", children: T }),
        E && // Visible rather than hover-only: cmdk never moves DOM focus onto an item (the input keeps
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
              !E && "tw:text-muted-foreground"
            ),
            children: k
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
          "tw:border-s-red-200": s === Mt.OT,
          "tw:border-s-purple-200": s === Mt.NT,
          "tw:border-s-indigo-200": s === Mt.DC,
          "tw:border-s-amber-200": s === Mt.Extra
        }
      ),
      children: j
    }
  );
}
const sd = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
function cd(t) {
  return sd.some((e) => e === t);
}
function bn(t) {
  const e = new RegExp("^\\p{L}$", "u").test(t), r = /^[0-9]$/.test(t);
  return { isLetter: e, isDigit: r };
}
const ld = /^%[^%]*%$/;
function re(t, e) {
  return !t || ld.test(t) ? e : t;
}
const Ur = Object.freeze({
  /** Full labels. */
  WIDE: 0,
  /** Abbreviated primary label form. */
  TIGHT: 1,
  /** Secondary field clipped with an ellipsis — CSS does this on its own. */
  TIGHTER: 2,
  /** Secondary field dropped entirely; primary field alone. */
  MINIMUM: 3
}), Va = Dr(Ur.WIDE);
function dd() {
  return Xr(Va);
}
const Oi = Dr(void 0);
function Mi() {
  return Xr(Oi);
}
let xo = "keyboard", xn = !1;
function wd() {
  xn || typeof document > "u" || (xn = !0, document.addEventListener(
    "pointerdown",
    () => {
      xo = "pointer";
    },
    !0
  ), document.addEventListener(
    "keydown",
    () => {
      xo = "keyboard";
    },
    !0
  ));
}
function ud({
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
  } = an(), {
    ref: h,
    open: f,
    onPointerEnter: v,
    onPointerLeave: x
  } = an(), [g, T] = N(!1), [k, E] = N(!1), C = V(
    // React's ref API requires `null` as the initial value for DOM refs.
    // eslint-disable-next-line no-null/no-null
    null
  ), A = n && e !== void 0, j = s ?? (e !== void 0 && !n);
  Z(() => {
    var Q;
    wd();
    const ot = (Q = C.current) == null ? void 0 : Q.closest('button, [role="combobox"], [tabindex]');
    if (!ot) return;
    const y = (Y) => !!Y && Y.scrollWidth > Y.clientWidth, et = () => {
      xo !== "pointer" && (j || y(h.current) || y(d.current)) && E(!0);
    }, M = () => E(!1);
    return ot.addEventListener("focus", et), ot.addEventListener("blur", M), () => {
      ot.removeEventListener("focus", et), ot.removeEventListener("blur", M);
    };
  }, [j, h, d]);
  const U = $(() => {
    j && T(!0), v(), A && w();
  }, [
    j,
    A,
    v,
    w
  ]), z = $(() => {
    T(!1), E(!1), x(), p();
  }, [x, p]);
  Z(() => {
    j || T(!1);
  }, [j]);
  const R = /* @__PURE__ */ a("span", { ref: h, className: "tw:min-w-0 tw:shrink tw:truncate", children: t }, "primary"), O = A ? (
    // Weighted to absorb essentially all of the shrinking, so the primary field only starts losing
    // characters once this one has none left.
    /* @__PURE__ */ a("span", { ref: d, className: "tw:min-w-0 tw:shrink-[9999] tw:truncate", children: e }, "secondary")
  ) : void 0, [G, W] = o ? [O, R] : [R, O];
  return (
    // Nested TooltipProviders are harmless in Radix, so carrying our own means this works in any
    // host, including toolbars that never set one up.
    /* @__PURE__ */ a(zt, { children: /* @__PURE__ */ u(
      kt,
      {
        open: f || l || g || k,
        onOpenChange: (ot) => {
          ot || z();
        },
        children: [
          /* @__PURE__ */ a(_t, { asChild: !0, children: /* @__PURE__ */ u(
            "span",
            {
              ref: C,
              onPointerEnter: U,
              onPointerLeave: z,
              onPointerDown: z,
              className: b("tw:flex tw:min-w-0 tw:items-center", c),
              children: [
                G,
                G && W && /* @__PURE__ */ a("span", { className: "tw:shrink-0 tw:whitespace-pre", children: r }, "separator"),
                W
              ]
            }
          ) }),
          /* @__PURE__ */ a(Nt, { children: i })
        ]
      }
    ) })
  );
}
function yo(t, e) {
  return `${t} ${ka[t]}${e ? ` ${jr(t, e)} ${Ae(t, e)}` : ""}`;
}
function kr(t, e) {
  return `${t} ${ka[t] || ""} ${e}`;
}
function fa(t, e, r) {
  return `${kr(t, e)}:${r}`;
}
function Lr(t) {
  if (t.includes(":")) return;
  const e = /(\d+)$/.exec(t);
  if (!e) return;
  const r = parseInt(e[1], 10), o = t.indexOf(" ");
  if (o < 0) return;
  const n = t.slice(0, o);
  return t === kr(n, r) ? r : void 0;
}
function ca(t) {
  const e = /:(\d+)$/.exec(t);
  if (!e) return;
  const r = t.slice(0, t.length - e[0].length);
  if (Lr(r) !== void 0)
    return parseInt(e[1], 10);
}
const pd = "top-match", hd = "Show recent searches", gd = "Recent";
function fd({
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
  const [h, f] = N(!1), [v, x] = N(!1), g = Ea(), T = V(!1), k = w !== void 0, E = k ? w : h, C = n === "" ? "" : re(n, hd), A = re(s, gd), j = (O) => {
    O || (T.current = !0, x(!1)), k || f(O), p == null || p(O);
  }, U = (O) => {
    if (O && T.current) {
      T.current = !1;
      return;
    }
    x(O);
  };
  if (t.length === 0)
    return;
  const z = (O) => {
    e(O);
  }, R = /* @__PURE__ */ a(
    tt,
    {
      variant: l,
      size: "icon",
      className: d,
      "aria-label": C,
      onPointerEnter: () => {
        T.current = !1;
      },
      children: /* @__PURE__ */ a(sn, { className: "tw:h-4 tw:w-4" })
    }
  );
  return /* @__PURE__ */ u(Be, { open: E, onOpenChange: j, modal: !1, children: [
    /* @__PURE__ */ a(zt, { children: C ? /* @__PURE__ */ u(kt, { open: v, onOpenChange: U, children: [
      /* @__PURE__ */ a(_t, { asChild: !0, children: /* @__PURE__ */ a(Se, { asChild: !0, children: R }) }),
      /* @__PURE__ */ a(Nt, { children: C })
    ] }) : /* @__PURE__ */ a(Se, { asChild: !0, children: R }) }),
    /* @__PURE__ */ u(
      je,
      {
        id: i,
        "aria-labelledby": g,
        className: "tw:w-[300px]",
        align: "start",
        onKeyDown: (O) => O.stopPropagation(),
        children: [
          /* @__PURE__ */ a(cr, { id: g, children: A }),
          t.map((O) => /* @__PURE__ */ u(
            Ge,
            {
              onSelect: () => z(O),
              className: b("tw:flex tw:items-center", c),
              children: [
                /* @__PURE__ */ a(sn, { className: "tw:me-2 tw:h-4 tw:w-4 tw:opacity-50" }),
                /* @__PURE__ */ a("span", { children: r(O) })
              ]
            },
            o(O)
          ))
        ]
      }
    )
  ] });
}
function vh(t, e, r = (n, s) => n === s, o = 15) {
  return (n) => {
    const s = t.filter(
      (c) => !r(c, n)
    ), i = [n, ...s.slice(0, o - 1)];
    e(i);
  };
}
function la(t, e) {
  return !e || Ca(t, e) === 0;
}
function md(t, e, r, o, n) {
  const s = P(
    () => Cs(t, e),
    [t, e]
  ), i = P(
    () => Es(t, e),
    [t, e]
  ), c = P(
    () => Ts(t, e),
    [t, e]
  ), d = P(
    () => Ss(t, e),
    [t, e]
  ), l = $(
    (w) => {
      w && o(w);
    },
    [o]
  );
  return P(() => [
    {
      onClick: () => l(s),
      disabled: la(t, s),
      title: re(
        n == null ? void 0 : n["%webView_bookChapterControl_previousChapter%"],
        "Previous chapter"
      ),
      icon: r === "ltr" ? cn : ln,
      group: "chapter"
    },
    {
      onClick: () => l(i),
      disabled: la(t, i),
      title: re(
        n == null ? void 0 : n["%webView_bookChapterControl_nextChapter%"],
        "Next chapter"
      ),
      icon: r === "ltr" ? ln : cn,
      group: "chapter"
    },
    {
      onClick: () => l(c),
      disabled: la(t, c),
      title: re(
        n == null ? void 0 : n["%webView_bookChapterControl_previousVerse%"],
        "Previous verse"
      ),
      icon: ri,
      group: "verse"
    },
    {
      onClick: () => l(d),
      disabled: la(t, d),
      title: re(
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
const ma = {
  // Matches start of string (`^`), one or more non-colon/space words, optionally followed by space and more words (`([^:\s]+(?:\s+[^:\s]+)*)`), end of string (`$`), case-insensitive (`i`)
  BOOK_ONLY: /^([^:\s]+(?:\s+[^:\s]+)*)$/i,
  // Same as above, but followed by a space and a chapter number (`\s+(\d+)`)
  BOOK_CHAPTER: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,
  // Same as above, but followed by a colon and optionally a verse number (`:(\d*)`)
  BOOK_CHAPTER_VERSE: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i
}, vd = [
  ma.BOOK_ONLY,
  ma.BOOK_CHAPTER,
  ma.BOOK_CHAPTER_VERSE
];
function bd(t) {
  return ma.BOOK_CHAPTER_VERSE.test(t.trim());
}
function yn(t, e) {
  return jt.bookIdToNumber(t) < jt.bookIdToNumber(e.book);
}
function xd(t, e, r) {
  const o = jt.bookIdToNumber(t) - jt.bookIdToNumber(r.book);
  return o < 0 ? !0 : o > 0 ? !1 : e < r.chapterNum;
}
function Za(t, e, r, o) {
  const n = jt.bookIdToNumber(t) - jt.bookIdToNumber(o.book);
  return n < 0 ? !0 : n > 0 ? !1 : e < o.chapterNum ? !0 : e > o.chapterNum ? !1 : r < o.verseNum;
}
function qe(t) {
  return Oc(jt.bookIdToNumber(t));
}
function yd(t, e, r) {
  if (!t.trim() || e.length === 0) return;
  const o = vd.reduce(
    (n, s) => {
      if (n) return n;
      const i = s.exec(t.trim());
      if (i) {
        const [c, d = void 0, l = void 0] = i.slice(1);
        let w;
        const p = e.filter((h) => Ro(h, c, r));
        if (p.length === 1 && ([w] = p), !w && d) {
          if (jt.isBookIdValid(c)) {
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
          const f = ((v) => Object.keys(ka).find(
            (x) => ka[x].toLowerCase() === v.toLowerCase()
          ))(c);
          if (f && e.includes(f) && (w = f), !w && r) {
            const v = Array.from(r.entries()).find(
              ([, x]) => x.localizedName.toLowerCase() === c.toLowerCase()
            );
            v && e.includes(v[0]) && ([w] = v);
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
function ko(t) {
  return {
    [Mt.OT]: t.filter((e) => jt.isBookOT(e)),
    [Mt.NT]: t.filter((e) => jt.isBookNT(e)),
    [Mt.DC]: t.filter((e) => jt.isBookDC(e)),
    [Mt.Extra]: t.filter((e) => jt.extraBooks().includes(e))
  };
}
function kd(t, e) {
  const r = new Set(t), o = e.filter((l) => !r.has(l)), n = new Set(o), s = n.size === 0 ? t : jt.allBookIds.filter(
    (l) => r.has(l) || n.has(l)
  ), i = ko(s), c = Object.values(i).flat(), d = ko(t);
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
const _o = 6;
function _d(t) {
  return t === "ArrowLeft" ? "ArrowRight" : t === "ArrowRight" ? "ArrowLeft" : t;
}
function Nd({
  current: t,
  key: e,
  max: r,
  direction: o = "ltr"
}) {
  if (r <= 0) return t;
  if (t < 1 || t > r) return 1;
  switch (o === "rtl" ? _d(e) : e) {
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
function Ii({
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
        className: b("tw:grid tw:gap-1", d),
        style: { gridTemplateColumns: `repeat(${_o}, minmax(0, 1fr))` },
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
                !c && Gn,
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
function kn({
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
      Ii,
      {
        count: qe(t),
        valueBuilder: (d) => kr(t, d),
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
function _n({
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
      Ii,
      {
        count: r,
        valueBuilder: (w) => fa(t, e, w),
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
const Cd = "a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]";
function Ed(t) {
  return Array.from(t.querySelectorAll(Cd)).filter(
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
  triggerVariant: v = "outline",
  showTriggerChevron: x = !1,
  onOpenChange: g,
  onCloseAutoFocus: T,
  modal: k = !1,
  align: E = "center",
  ref: C,
  disabled: A
}) {
  const j = Oe(), U = dd(), [z, R] = N(!1), [O, G] = N(""), [W, ot] = N(""), [y, et] = N("books"), [M, Q] = N(void 0), [Y, L] = N(
    void 0
  ), [X, ut] = N(void 0), [mt, K] = N(!1), [gt, vt] = N(!1), [lt, Dt] = N(!1), [xt, Ot] = N(!1), xe = V(null), Qt = V(!1), $t = V(void 0), Ct = V(void 0), Ut = V(void 0), pe = V(void 0), he = V({}), se = V({}), bt = $(
    (m) => {
      e(m), d && d(m);
    },
    [e, d]
  ), oe = P(() => o ? o() : Rs, [o]), ce = P(
    () => o && n ? n() : [],
    [o, n]
  ), {
    projectBooksBySection: ye,
    reachableBooksBySection: te,
    reachableBooks: ne,
    projectBooks: ke,
    booksOutsideProject: Tt
  } = P(
    () => kd(oe, ce),
    [oe, ce]
  ), D = Tt.has(t.book), H = P(() => W.trim() ? ko(
    ne.filter((m) => Ro(m, W, s))
  ) : gt ? te : ye, [
    ye,
    te,
    ne,
    gt,
    W,
    s
  ]), _ = P(
    () => yd(W, ne, s),
    [W, ne, s]
  ), I = P(() => {
    if (!_) return;
    const m = O.startsWith(`${_.book} `) ? O : "", q = ca(m), it = Lr(m);
    return {
      book: _.book,
      chapterNum: it ?? _.chapterNum ?? 1,
      verseNum: q ?? _.verseNum ?? 1
    };
  }, [_, O]), J = V(!1);
  Z(() => {
    if (!J.current) {
      J.current = !0;
      return;
    }
    g == null || g(z);
  }, [z, g]);
  const B = $(() => {
    I && (p && Za(
      I.book,
      I.chapterNum,
      I.verseNum,
      p
    ) || (bt(I), R(!1), ot(""), G("")));
  }, [bt, I, p]), at = $(
    (m) => {
      const q = Y ?? (_ == null ? void 0 : _.book), it = X ?? (_ == null ? void 0 : _.chapterNum);
      !q || !it || (bt({
        book: q,
        chapterNum: it,
        verseNum: m
      }), R(!1));
    },
    [bt, Y, X, _]
  ), dt = $(
    (m) => {
      if (p && yn(m, p)) return;
      if (qe(m) <= 1) {
        bt({
          book: m,
          chapterNum: 1,
          verseNum: 1
        }), R(!1), ot("");
        return;
      }
      Q(m), et("chapters");
    },
    [bt, p]
  ), ct = $(
    (m) => {
      const q = y === "chapters" ? M : _ == null ? void 0 : _.book;
      if (q) {
        if (w && w(q, m) > 1) {
          L(q), ut(m), et("verses"), G("");
          return;
        }
        bt({
          book: q,
          chapterNum: m,
          verseNum: 1
        }), R(!1);
      }
    },
    [bt, y, M, _, w]
  ), pt = $(
    (m) => {
      bt(m), R(!1), ot("");
    },
    [bt]
  ), Et = md(
    t,
    gt ? ne : ke,
    j,
    e,
    i
  ), Rt = $((m) => {
    ot(m), Ot(!1);
  }, []), yt = $(() => {
    et("books"), Q(void 0), L(void 0), ut(void 0), Ot(!1), setTimeout(() => {
      var m;
      (m = Ct.current) == null || m.focus();
    }, 0);
  }, []), ge = $(() => {
    const m = Y;
    L(void 0), ut(void 0), m ? (Q(m), et("chapters"), G("")) : yt();
  }, [Y, yt]), Kt = $(
    (m) => {
      R(m), m && (et("books"), Q(void 0), L(void 0), ut(void 0), ot(""), Ot(!1), Dt(!1), vt(D));
    },
    [D]
  );
  Z(() => {
    A && Kt(!1);
  }, [A, Kt]);
  const [Vt, Ue] = N(0);
  Z(() => {
    var m;
    Vt !== 0 && ((m = Ct.current) == null || m.focus());
  }, [Vt]), Fc(
    C,
    () => ({
      open: () => {
        A || (Kt(!0), Ue((m) => m + 1));
      }
    }),
    [Kt, A]
  );
  const { otLong: _e, ntLong: Ne, dcLong: rr, extraLong: ar } = {
    otLong: i == null ? void 0 : i["%scripture_section_ot_long%"],
    ntLong: i == null ? void 0 : i["%scripture_section_nt_long%"],
    dcLong: i == null ? void 0 : i["%scripture_section_dc_long%"],
    extraLong: i == null ? void 0 : i["%scripture_section_extra_long%"]
  }, ze = $(
    (m) => Wn(m, _e, Ne, rr, ar),
    [_e, Ne, rr, ar]
  ), Ce = $(
    (m) => _ ? !!_.chapterNum && !m.toString().includes(_.chapterNum.toString()) : !1,
    [_]
  ), hr = P(
    () => $e(
      t,
      s ? Ae(t.book, s) : "English"
    ),
    [t, s]
  ), Mr = P(
    () => U >= Ur.TIGHT ? jr(t.book, s) : Ae(t.book, s),
    [t.book, s, U]
  ), Ir = `${t.chapterNum}:${t.verseNum}`, Ke = $((m) => (q) => {
    he.current[m] = q;
  }, []), S = $((m) => (q) => {
    se.current[m] = q;
  }, []), nt = P(
    () => bd(W),
    [W]
  ), st = P(() => !w || !_ || !_.chapterNum || !nt ? !1 : w(_.book, _.chapterNum) > 0, [w, _, nt]), Ht = y === "books" && !mt && !W.trim() && Tt.size > 0, zr = $(
    (m) => p ? yn(m, p) : !1,
    [p]
  ), Pe = $(
    (m) => (q) => p ? xd(m, q, p) : !1,
    [p]
  ), gr = $(
    (m, q) => (it) => p ? Za(m, q, it, p) : !1,
    [p]
  ), fr = re(
    i == null ? void 0 : i["%webView_bookChapterControl_selectChapter%"],
    "Select chapter"
  ), Ua = re(
    i == null ? void 0 : i["%webView_bookChapterControl_selectVerse%"],
    "Select verse"
  ), ea = y === "verses" ? re(
    i == null ? void 0 : i["%webView_bookChapterControl_backToChapters%"],
    "Back to chapters"
  ) : re(
    i == null ? void 0 : i["%webView_bookChapterControl_backToBooks%"],
    "Back to books"
  ), Ka = re(
    i == null ? void 0 : i["%webView_bookChapterControl_bookNotInProject%"],
    "Not in project"
  ), ra = re(
    i == null ? void 0 : i["%webView_bookChapterControl_bookNotInProjectDescription%"],
    "{book} is not in this project"
  ), aa = $(
    (m) => Ye(ra, {
      book: `${Ae(m, s)} (${jr(
        m,
        s
      )})`
    }),
    [ra, s]
  ), oa = re(
    i == null ? void 0 : i["%webView_bookChapterControl_showMoreBooks%"],
    "Show more books"
  ), mr = re(
    i == null ? void 0 : i["%webView_bookChapterControl_showProjectBooksOnly%"],
    "Show project books only"
  ), na = $(
    (m) => {
      (m.key === "Home" || m.key === "End") && m.stopPropagation(), h && h.includes(m.key) && _ && _.chapterNum !== void 0 && _.verseNum !== void 0 && (m.preventDefault(), m.stopPropagation(), B());
    },
    [h, _, B]
  ), ia = $(
    (m) => {
      var tn, en;
      if (m.ctrlKey) return;
      const q = m.target instanceof HTMLElement ? m.target : void 0;
      if (!(!!q && !!((tn = $t.current) != null && tn.contains(q))) && (q != null && q.closest('[role="menu"], [role="menuitem"]')))
        return;
      if (m.key === "Tab") {
        const At = $t.current ? Ed($t.current) : [];
        if (At.length === 0) {
          m.preventDefault(), m.stopPropagation();
          return;
        }
        const de = At[At.length - 1], Gt = m.shiftKey ? At[0] : de;
        document.activeElement === Gt && (m.preventDefault(), m.stopPropagation(), (m.shiftKey ? de : At[0]).focus());
        return;
      }
      const { isLetter: Lt, isDigit: qt } = bn(m.key);
      if ((y === "chapters" || y === "verses") && (m.key === " " || m.key === "Enter")) {
        if (!!(q != null && q.closest(
          'button, a, input, select, textarea, [role="button"]'
        ))) {
          m.stopPropagation();
          return;
        }
        const de = (() => {
          if (y === "verses") {
            const Pr = Y, rn = X, Ha = ca(O);
            return !Pr || !rn || Ha === void 0 ? void 0 : {
              isDisabled: gr(Pr, rn)(Ha),
              activate: () => at(Ha)
            };
          }
          const Gt = M, me = Lr(O);
          if (!(!Gt || me === void 0))
            return {
              isDisabled: Pe(Gt)(me),
              activate: () => ct(me)
            };
        })();
        if (de) {
          m.preventDefault(), m.stopPropagation(), de.isDisabled || de.activate();
          return;
        }
      }
      if (y === "books" && _ && !mt && m.key === "Enter" && !(q !== Ct.current && !!(q != null && q.closest('button, a, input, select, textarea, [role="button"]')))) {
        m.preventDefault(), m.stopPropagation(), B();
        return;
      }
      if ((y === "chapters" || y === "verses") && (Lt || qt)) {
        m.preventDefault(), m.stopPropagation();
        return;
      }
      if (m.key === "Backspace" && (y === "chapters" || y === "verses")) {
        m.preventDefault(), m.stopPropagation(), y === "verses" ? ge() : yt();
        return;
      }
      if (!cd(m.key) || mt) return;
      if (y === "books" && !xt && (m.key === "ArrowLeft" || m.key === "ArrowRight")) {
        const At = q === Ct.current ? Ct.current : void 0, de = (At == null ? void 0 : At.selectionStart) ?? 0, Gt = (At == null ? void 0 : At.selectionEnd) ?? 0, me = j === "rtl" ? m.key === "ArrowRight" : m.key === "ArrowLeft";
        if (!!At && (de !== Gt || (me ? de > 0 : Gt < At.value.length))) return;
      }
      if (m.shiftKey || y === "books" && q !== Ct.current && (q != null && q.closest('button, a, [role="button"]')))
        return;
      const St = (() => {
        const At = y === "books" && _ && st && _.chapterNum ? { bookId: _.book, chapterNum: _.chapterNum } : void 0, de = y === "verses" ? { bookId: Y, chapterNum: X } : At;
        if (de) {
          const { bookId: Gt, chapterNum: me } = de;
          return !Gt || !me || !w ? void 0 : {
            max: w(Gt, me),
            current: ca(O) ?? 0,
            buildValue: (Pr) => fa(Gt, me, Pr),
            refs: se,
            // In books view focus stays on the CommandInput so the user can keep typing; only
            // the dedicated grid views pull focus off the back button.
            takeFocus: y === "verses"
          };
        }
        if (y === "chapters" || y === "books" && _ && qe(_.book) > 1) {
          const Gt = y === "chapters" ? M : _ == null ? void 0 : _.book;
          return Gt ? {
            max: qe(Gt),
            current: Lr(O) ?? 0,
            buildValue: (me) => kr(Gt, me),
            refs: he,
            takeFocus: y === "chapters"
          } : void 0;
        }
      })();
      if (!St || St.max <= 0) return;
      y === "books" && Ot(!0), St.takeFocus && ((en = $t.current) == null || en.focus());
      const ee = Nd({
        current: St.current,
        key: m.key,
        max: St.max,
        direction: j
      });
      if (m.preventDefault(), m.stopPropagation(), ee === St.current) return;
      G(St.buildValue(ee));
      const Qo = St.refs.current[ee];
      Qo && Qo.scrollIntoView({ block: "nearest", behavior: "smooth" });
    },
    [
      y,
      _,
      st,
      mt,
      xt,
      j,
      yt,
      ge,
      ct,
      B,
      at,
      Pe,
      gr,
      M,
      Y,
      X,
      w,
      O
    ]
  ), F = $((m) => {
    var Lt, qt;
    if (m.shiftKey || m.key === "Tab" || m.key === " ") return;
    if (m.key === "Enter") {
      m.stopPropagation();
      return;
    }
    if (m.key === "ArrowUp" || m.key === "ArrowDown") {
      (Lt = Ct.current) == null || Lt.focus();
      return;
    }
    const { isLetter: q, isDigit: it } = bn(m.key);
    (q || it) && (m.preventDefault(), ot((St) => St + m.key), (qt = Ct.current) == null || qt.focus(), K(!1));
  }, []);
  Xt(() => {
    const m = setTimeout(() => {
      if (z && y === "books" && Ut.current && pe.current) {
        const q = Ut.current, it = pe.current, Lt = it.offsetTop, qt = q.clientHeight, St = it.clientHeight, ee = Lt - qt / 2 + St / 2;
        q.scrollTo({
          top: Math.max(0, ee),
          behavior: "smooth"
        }), G(yo(t.book));
      }
    }, 0);
    return () => {
      clearTimeout(m);
    };
  }, [z, y, W, _, t.book]), Xt(() => {
    if (y === "chapters" && M) {
      const m = M === t.book, q = m ? t.chapterNum : 1;
      G(kr(M, q)), setTimeout(() => {
        if (Ut.current)
          if (m) {
            const it = he.current[t.chapterNum];
            it && it.scrollIntoView({ block: "center", behavior: "smooth" });
          } else
            Ut.current.scrollTo({ top: 0 });
        $t.current && $t.current.focus();
      }, 0);
    }
  }, [y, M, _, t.book, t.chapterNum]), Xt(() => {
    if (y === "verses" && Y && X !== void 0) {
      const m = Y === t.book && X === t.chapterNum, q = m ? t.verseNum : 1;
      G(
        fa(Y, X, q)
      ), setTimeout(() => {
        if (Ut.current)
          if (m) {
            const it = se.current[t.verseNum];
            it && it.scrollIntoView({ block: "center", behavior: "smooth" });
          } else
            Ut.current.scrollTo({ top: 0 });
        $t.current && $t.current.focus();
      }, 0);
    }
  }, [
    y,
    Y,
    X,
    t.book,
    t.chapterNum,
    t.verseNum
  ]);
  const rt = _ ? `${_.book} ${_.chapterNum ?? ""} ${_.verseNum ?? ""} ${st}` : "", Pt = V(""), le = V(""), fe = P(() => {
    if (y !== "books" || !_ || mt) return;
    const { book: m, chapterNum: q, verseNum: it } = _;
    if (st && q && w)
      return {
        max: w(m, q),
        initial: it ?? (m === t.book && q === t.chapterNum ? t.verseNum : 1),
        parse: ca,
        buildValue: (qt) => fa(m, q, qt)
      };
    const Lt = qe(m);
    if (!(Lt <= 1))
      return {
        max: Lt,
        initial: q ?? (m === t.book ? t.chapterNum : 1),
        parse: Lr,
        buildValue: (qt) => kr(m, qt)
      };
  }, [
    y,
    _,
    mt,
    st,
    w,
    t.book,
    t.chapterNum,
    t.verseNum
  ]);
  return Xt(() => {
    if (y !== "books" || !_ || !fe || fe.max <= 0) {
      Pt.current = "";
      return;
    }
    const { max: m, initial: q, parse: it, buildValue: Lt } = fe, qt = (St) => {
      const ee = it(St);
      return ee !== void 0 && ee >= 1 && ee <= m && St === Lt(ee) ? ee : void 0;
    };
    if (Pt.current !== rt) {
      Pt.current = rt;
      const St = Lt(Math.min(Math.max(q, 1), m));
      le.current = St, G(St);
      return;
    }
    if (qt(O) !== void 0) {
      le.current = O;
      return;
    }
    G(
      qt(le.current) !== void 0 ? le.current : Lt(Math.min(Math.max(q, 1), m))
    );
  }, [y, _, fe, rt, O]), /* @__PURE__ */ u(lr, { open: z, onOpenChange: Kt, modal: k, children: [
    /* @__PURE__ */ a(Rr, { asChild: !0, children: /* @__PURE__ */ u(
      tt,
      {
        ref: xe,
        "aria-label": "book-chapter-trigger",
        variant: v,
        role: "combobox",
        "aria-expanded": z,
        disabled: A,
        className: b(
          "tw:h-8 tw:w-full tw:min-w-16 tw:max-w-48 tw:shrink tw:overflow-hidden tw:px-1",
          r
        ),
        onClick: (m) => {
          Qt.current && (Qt.current = !1, m.preventDefault());
        },
        children: [
          f ?? /* @__PURE__ */ a(
            ud,
            {
              primary: Mr,
              secondary: Ir,
              showSecondary: U < Ur.MINIMUM,
              isPartial: U >= Ur.TIGHT,
              fullText: hr
            }
          ),
          x && /* @__PURE__ */ a(
            ui,
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
        align: E,
        onKeyDownCapture: ia,
        onKeyDown: (m) => m.stopPropagation(),
        onPointerDownOutside: (m) => {
          const { target: q } = m;
          z && xe.current && q instanceof Node && xe.current.contains(q) && (Qt.current = !0, Kt(!1));
        },
        onCloseAutoFocus: T,
        children: /* @__PURE__ */ a(zt, { children: /* @__PURE__ */ u(
          wr,
          {
            ref: $t,
            loop: !0,
            value: O,
            onValueChange: G,
            disablePointerSelection: !0,
            shouldFilter: !1,
            children: [
              y === "books" ? /* @__PURE__ */ u(
                "div",
                {
                  className: b("tw:flex tw:items-end", mt && "tw:pb-1"),
                  onFocus: (m) => {
                    Dt(m.target !== Ct.current);
                  },
                  onBlur: (m) => {
                    m.currentTarget.contains(m.relatedTarget) || Dt(!1);
                  },
                  children: [
                    /* @__PURE__ */ u("div", { className: "tw:relative tw:flex-1", children: [
                      /* @__PURE__ */ a(
                        Ia,
                        {
                          ref: Ct,
                          value: W,
                          onValueChange: Rt,
                          onKeyDown: na,
                          onFocus: () => K(!1),
                          className: c && c.length > 0 ? "tw:pe-8!" : "",
                          spaceSelectsHighlightedItem: !0
                        }
                      ),
                      c && c.length > 0 && /* @__PURE__ */ a(
                        fd,
                        {
                          recentSearches: c,
                          onSearchItemSelect: pt,
                          renderItem: (m) => $e(m, "English"),
                          getItemKey: (m) => `${m.book}-${m.chapterNum}-${m.verseNum}`,
                          ariaLabel: i == null ? void 0 : i["%history_recentSearches_ariaLabel%"],
                          groupHeading: i == null ? void 0 : i["%history_recent%"],
                          buttonClassName: "tw:absolute tw:end-1 tw:top-1"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ a(za, { className: "tw:translate-y-px tw:gap-1 tw:pe-2", children: Et.map(
                      ({ onClick: m, disabled: q, title: it, icon: Lt, group: qt }, St) => {
                        const ee = /* @__PURE__ */ a(
                          tt,
                          {
                            variant: "ghost",
                            size: "sm",
                            onClick: () => {
                              K(!0), m();
                            },
                            disabled: q,
                            className: "tw:h-8.5 tw:w-6 tw:rounded-lg! tw:p-0",
                            "aria-label": it,
                            onKeyDown: F,
                            children: /* @__PURE__ */ a(Lt, {})
                          }
                        );
                        return (
                          // Keyed by position, not by `title`: the titles are localized, so they all
                          // change together the moment the strings resolve or the UI language does.
                          // Keying on them would remount all four buttons at that instant, dropping
                          // focus off whichever one the user was on and destroying an open tooltip.
                          // The set is fixed in size and order, so the index is stable.
                          // eslint-disable-next-line react/no-array-index-key
                          /* @__PURE__ */ u(Jr, { children: [
                            St > 0 && qt !== Et[St - 1].group && /* @__PURE__ */ a(Do, {}),
                            q ? (
                              // A disabled Button carries `pointer-events: none` from its own base
                              // variants, so it is not hit-tested: neither a Radix tooltip nor a
                              // `title` ON THE BUTTON can ever fire. These arrows come back disabled
                              // at the edges of the canon — Genesis 1:1 is the default state of a
                              // freshly opened project — which is exactly where a user asks what the
                              // button was for. The wrapper is still hit-tested, so the native
                              // tooltip it carries is the one hover explanation available here.
                              /* @__PURE__ */ a("span", { title: it, className: "tw:inline-flex", children: ee })
                            ) : /* @__PURE__ */ u(kt, { children: [
                              /* @__PURE__ */ a(_t, { asChild: !0, children: ee }),
                              /* @__PURE__ */ a(Nt, { children: it })
                            ] })
                          ] }, `${qt}-${St}`)
                        );
                      }
                    ) })
                  ]
                }
              ) : /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:border-b tw:px-3 tw:py-1", children: [
                /* @__PURE__ */ u(kt, { children: [
                  /* @__PURE__ */ a(_t, { asChild: !0, children: /* @__PURE__ */ a(
                    tt,
                    {
                      variant: "ghost",
                      size: "sm",
                      onClick: y === "verses" ? ge : yt,
                      className: "tw:me-2 tw:h-6 tw:w-6 tw:p-0",
                      tabIndex: -1,
                      "aria-label": ea,
                      children: j === "ltr" ? /* @__PURE__ */ a(Zs, { className: "tw:h-4 tw:w-4" }) : /* @__PURE__ */ a(Xs, { className: "tw:h-4 tw:w-4" })
                    }
                  ) }),
                  /* @__PURE__ */ a(Nt, { children: ea })
                ] }),
                y === "chapters" && M && /* @__PURE__ */ a("span", { tabIndex: -1, className: "tw:text-sm tw:font-medium", children: Ae(M, s) }),
                y === "verses" && Y && X !== void 0 && /* @__PURE__ */ a("span", { tabIndex: -1, className: "tw:text-sm tw:font-medium", children: `${Ae(Y, s)} ${X}` }),
                /* @__PURE__ */ a(
                  "span",
                  {
                    tabIndex: -1,
                    className: "tw:ms-auto tw:text-sm tw:font-medium tw:text-muted-foreground",
                    children: y === "verses" ? Ua : fr
                  }
                )
              ] }),
              !mt && /* @__PURE__ */ u(ur, { ref: Ut, children: [
                y === "books" && /* @__PURE__ */ u(ht, { children: [
                  !_ && Object.entries(H).map(([m, q]) => {
                    if (q.length !== 0)
                      return (
                        // We are mapping over filteredBooksByType, which uses Section as key type
                        // eslint-disable-next-line no-type-assertion/no-type-assertion
                        /* @__PURE__ */ a(Xe, { heading: ze(m), children: q.map((it) => /* @__PURE__ */ a(
                          Di,
                          {
                            bookId: it,
                            onSelect: (Lt) => dt(Lt),
                            section: ha(it),
                            commandValue: yo(it),
                            suppressKeyboardHighlight: lt,
                            ref: it === t.book ? pe : void 0,
                            localizedBookNames: s,
                            disabled: zr(it),
                            dimmedReason: Tt.has(it) ? Ka : void 0,
                            dimmedDescription: Tt.has(it) ? aa(it) : void 0
                          },
                          it
                        )) }, m)
                      );
                  }),
                  _ && I && /* @__PURE__ */ a(Xe, { children: /* @__PURE__ */ u(
                    tr,
                    {
                      value: pd,
                      onSelect: B,
                      disabled: !!p && Za(
                        I.book,
                        I.chapterNum,
                        I.verseNum,
                        p
                      ),
                      className: "tw:font-semibold tw:text-primary tw:hover:bg-muted tw:[&>svg:last-child]:hidden",
                      children: [
                        /* @__PURE__ */ a("span", { className: "tw:min-w-0 tw:flex-1", children: $e(
                          I,
                          Ae(_.book, s)
                        ) }),
                        /* @__PURE__ */ a("span", { className: "tw:ms-2 tw:shrink-0 tw:text-xs tw:text-muted-foreground", children: jr(_.book, s) })
                      ]
                    },
                    "top-match"
                  ) }),
                  _ && st && _.chapterNum && w && // No heading over this grid: the top-match row sits directly above it and
                  // already names the book and the reference the grid is refining, so a
                  // heading here only repeated the book back to the user one line later. The
                  // dedicated verses view still carries one, because there it is the only
                  // thing naming the book.
                  /* @__PURE__ */ a(
                    _n,
                    {
                      bookId: _.book,
                      chapterNum: _.chapterNum,
                      endVerse: w(_.book, _.chapterNum),
                      scrRef: t,
                      onVerseSelect: at,
                      setVerseRef: S,
                      isVerseDisabled: gr(_.book, _.chapterNum),
                      suppressKeyboardHighlight: lt,
                      className: "tw:px-4 tw:pb-4"
                    }
                  ),
                  _ && !st && qe(_.book) > 1 && // No heading here either, for the same reason as the verse preview above:
                  // the top-match row directly above already names the book.
                  /* @__PURE__ */ a(
                    kn,
                    {
                      bookId: _.book,
                      scrRef: t,
                      onChapterSelect: ct,
                      setChapterRef: Ke,
                      isChapterDimmed: Ce,
                      isChapterDisabled: Pe(_.book),
                      suppressKeyboardHighlight: lt,
                      className: "tw:px-4 tw:pb-4"
                    }
                  )
                ] }),
                y === "chapters" && M && /* @__PURE__ */ a(
                  kn,
                  {
                    bookId: M,
                    scrRef: t,
                    onChapterSelect: ct,
                    setChapterRef: Ke,
                    isChapterDisabled: Pe(M),
                    className: "tw:p-4"
                  }
                ),
                y === "verses" && Y && X !== void 0 && w && /* @__PURE__ */ a(
                  _n,
                  {
                    bookId: Y,
                    chapterNum: X,
                    endVerse: w(
                      Y,
                      X
                    ),
                    scrRef: t,
                    onVerseSelect: at,
                    setVerseRef: S,
                    isVerseDisabled: gr(
                      Y,
                      X
                    ),
                    className: "tw:p-4"
                  }
                )
              ] }),
              Ht && /* @__PURE__ */ a("div", { className: "tw:border-t tw:p-1", children: /* @__PURE__ */ a(
                tt,
                {
                  variant: "ghost",
                  size: "sm",
                  className: "tw:w-full tw:justify-start tw:font-normal",
                  onClick: () => vt((m) => !m),
                  children: gt ? mr : oa
                }
              ) })
            ]
          }
        ) })
      }
    )
  ] });
}
const bh = Object.freeze([
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
function Td(t) {
  return typeof t == "string" ? t : typeof t == "number" ? t.toString() : t.label;
}
function Nn({
  id: t,
  options: e = [],
  className: r,
  buttonClassName: o,
  popoverContentClassName: n,
  popoverContentStyle: s,
  value: i,
  onChange: c = () => {
  },
  getOptionLabel: d = Td,
  getButtonLabel: l,
  icon: w = void 0,
  buttonPlaceholder: p = "",
  textPlaceholder: h = "",
  commandEmptyMessage: f = "No option found",
  buttonVariant: v = "outline",
  alignDropDown: x = "start",
  isDisabled: g = !1,
  ariaLabel: T,
  ...k
}) {
  const [E, C] = N(!1), A = l ?? d, j = (z) => z.length > 0 && typeof z[0] == "object" && "options" in z[0], U = (z, R) => {
    const O = d(z), G = typeof z == "object" && "secondaryLabel" in z ? z.secondaryLabel : void 0, W = `${R ?? ""}${O}${G ?? ""}`;
    return /* @__PURE__ */ u(
      tr,
      {
        value: O,
        onSelect: () => {
          c(z), C(!1);
        },
        className: "tw:gap-1.5!",
        children: [
          /* @__PURE__ */ a(
            Je,
            {
              className: b("tw:h-4 tw:w-4 tw:shrink-0", {
                "tw:opacity-0": !i || d(i) !== O
              })
            }
          ),
          /* @__PURE__ */ u("span", { className: "tw:flex-1 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap", children: [
            O,
            G && /* @__PURE__ */ u("span", { className: "tw:text-muted-foreground", children: [
              " · ",
              G
            ] })
          ] })
        ]
      },
      W
    );
  };
  return /* @__PURE__ */ u(lr, { open: E, onOpenChange: C, ...k, children: [
    /* @__PURE__ */ a(Rr, { asChild: !0, children: /* @__PURE__ */ u(
      tt,
      {
        variant: v,
        role: "combobox",
        "aria-expanded": E,
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
            Ia,
            {
              placeholder: h,
              className: "tw:text-inherit",
              spaceSelectsHighlightedItem: !0
            }
          ),
          /* @__PURE__ */ a(Pa, { children: f }),
          /* @__PURE__ */ a(ur, { children: j(e) ? e.map((z) => /* @__PURE__ */ a(Xe, { heading: z.groupHeading, children: z.options.map((R) => U(R, z.groupHeading)) }, z.groupHeading)) : /* @__PURE__ */ a(Xe, { children: e.map((z) => U(z)) }) })
        ] })
      }
    )
  ] });
}
function Sd({
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
  return /* @__PURE__ */ u(ht, { children: [
    /* @__PURE__ */ a(It, { htmlFor: "start-chapters-combobox", children: "Chapters" }),
    /* @__PURE__ */ a(
      Nn,
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
    /* @__PURE__ */ a(It, { htmlFor: "end-chapters-combobox", children: "to" }),
    /* @__PURE__ */ a(
      Nn,
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
var No = /* @__PURE__ */ ((t) => (t.CurrentBook = "current book", t.ChooseBooks = "choose books", t))(No || {});
((t) => {
  t.CURRENT_BOOK = "current book", t.CHOOSE_BOOKS = "choose books";
})(No || (No = {}));
const xh = Object.freeze([
  "%webView_bookSelector_currentBook%",
  "%webView_bookSelector_choose%",
  "%webView_bookSelector_chooseBooks%"
]), Ja = (t, e) => t[e] ?? e;
function yh({
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
  const w = Ja(l, "%webView_bookSelector_currentBook%"), p = Ja(l, "%webView_bookSelector_choose%"), h = Ja(l, "%webView_bookSelector_chooseBooks%"), [f, v] = N(
    "current book"
    /* CurrentBook */
  ), x = (g) => {
    v(g), t(g);
  };
  return /* @__PURE__ */ a(
    Oo,
    {
      className: "pr-twp tw:flex",
      value: f,
      onValueChange: (g) => x(g),
      children: /* @__PURE__ */ u("div", { className: "tw:flex tw:w-full tw:flex-col tw:gap-4", children: [
        /* @__PURE__ */ u("div", { className: "tw:grid tw:grid-cols-[25%_25%_50%]", children: [
          /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center", children: [
            /* @__PURE__ */ a(_a, {
              value: "current book"
              /* CurrentBook */
            }),
            /* @__PURE__ */ a(It, { className: "tw:ms-1", children: w })
          ] }),
          /* @__PURE__ */ a(It, { className: "tw:flex tw:items-center", children: e }),
          /* @__PURE__ */ a("div", { className: "tw:flex tw:items-center tw:justify-end", children: /* @__PURE__ */ a(
            Sd,
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
            /* @__PURE__ */ a(_a, {
              value: "choose books"
              /* ChooseBooks */
            }),
            /* @__PURE__ */ a(It, { className: "tw:ms-1", children: h })
          ] }),
          /* @__PURE__ */ a(It, { className: "tw:flex tw:items-center", children: o.map((g) => jt.bookIdToEnglishName(g)).join(", ") }),
          /* @__PURE__ */ a(
            tt,
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
const zi = Dr(null);
function Rd(t, e) {
  return { getTheme: function() {
    return e ?? null;
  } };
}
function Ie() {
  const t = Xr(zi);
  return t == null && function(e, ...r) {
    const o = new URL("https://lexical.dev/docs/error"), n = new URLSearchParams();
    n.append("code", e);
    for (const s of r) n.append("v", s);
    throw o.search = n.toString(), Error(`Minified Lexical error #${e}; visit ${o.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
  }(8), t;
}
const Pi = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, Dd = Pi ? Xt : Z, da = { tag: Bo };
function Od({ initialConfig: t, children: e }) {
  const r = P(() => {
    const { theme: o, namespace: n, nodes: s, onError: i, editorState: c, html: d } = t, l = Rd(null, o), w = hi({ editable: t.editable, html: d, namespace: n, nodes: s, onError: (p) => i(p, w), theme: o });
    return function(p, h) {
      if (h !== null) {
        if (h === void 0) p.update(() => {
          const f = Qe();
          if (f.isEmpty()) {
            const v = Qr();
            f.append(v);
            const x = Pi ? document.activeElement : null;
            (ae() !== null || x !== null && x === p.getRootElement()) && v.select();
          }
        }, da);
        else if (h !== null) switch (typeof h) {
          case "string": {
            const f = p.parseEditorState(h);
            p.setEditorState(f, da);
            break;
          }
          case "object":
            p.setEditorState(h, da);
            break;
          case "function":
            p.update(() => {
              Qe().isEmpty() && h(p);
            }, da);
        }
      }
    }(w, c), [w, l];
  }, []);
  return Dd(() => {
    const o = t.editable, [n] = r;
    n.setEditable(o === void 0 || o);
  }, []), a(zi.Provider, { value: r, children: e });
}
const Md = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Xt : Z;
function Id({ ignoreHistoryMergeTagChange: t = !0, ignoreSelectionChange: e = !1, onChange: r }) {
  const [o] = Ie();
  return Md(() => {
    if (r) return o.registerUpdateListener(({ editorState: n, dirtyElements: s, dirtyLeaves: i, prevEditorState: c, tags: d }) => {
      e && s.size === 0 && i.size === 0 || t && d.has(Bo) || c.isEmpty() || r(n, o, d);
    });
  }, [o, t, e, r]), null;
}
const Ko = {
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
}, Ho = [
  jl,
  gi,
  fi,
  Fl
], zd = Dr(null), Qa = {
  didCatch: !1,
  error: null
};
class Pd extends Uc {
  constructor(e) {
    super(e), this.resetErrorBoundary = this.resetErrorBoundary.bind(this), this.state = Qa;
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
      }), this.setState(Qa);
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
    if (o && r.error !== null && Ad(e.resetKeys, n)) {
      var s, i;
      (s = (i = this.props).onReset) === null || s === void 0 || s.call(i, {
        next: n,
        prev: e.resetKeys,
        reason: "keys"
      }), this.setState(Qa);
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
        c = go(o, d);
      else if (n !== void 0)
        c = n;
      else
        throw i;
    }
    return go(zd.Provider, {
      value: {
        didCatch: s,
        error: i,
        resetErrorBoundary: this.resetErrorBoundary
      }
    }, c);
  }
}
function Ad() {
  let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  return t.length !== e.length || t.some((r, o) => !Object.is(r, e[o]));
}
function $d({ children: t, onError: e }) {
  return a(Pd, { fallback: a("div", { style: { border: "1px solid #f00", color: "#f00", padding: "8px" }, children: "An error was thrown." }), onError: e, children: t });
}
const Vd = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Xt : Z;
function Ld(t) {
  return { initialValueFn: () => t.isEditable(), subscribe: (e) => t.registerEditableListener(e) };
}
function Bd() {
  return function(t) {
    const [e] = Ie(), r = P(() => t(e), [e, t]), [o, n] = N(() => r.initialValueFn()), s = V(o);
    return Vd(() => {
      const { initialValueFn: i, subscribe: c } = r, d = i();
      return s.current !== d && (s.current = d, n(d)), c((l) => {
        s.current = l, n(l);
      });
    }, [r, t]), o;
  }(Ld);
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
function Ta(t, ...e) {
  const r = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const n of e) o.append("v", n);
  throw r.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
const Ai = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, Fd = Ai && "documentMode" in document ? document.documentMode : null;
!(!Ai || !("InputEvent" in window) || Fd) && "getTargetRanges" in new window.InputEvent("input");
function Te(t) {
  return `${t}px`;
}
const Ud = { attributes: !0, characterData: !0, childList: !0, subtree: !0 };
function Kd(t, e, r) {
  let o = null, n = null, s = null, i = [];
  const c = document.createElement("div");
  function d() {
    o === null && Ta(182), n === null && Ta(183);
    const { left: p, top: h } = n.getBoundingClientRect(), f = jd(t, e);
    var v, x;
    c.isConnected || (x = c, (v = n).insertBefore(x, v.firstChild));
    let g = !1;
    for (let T = 0; T < f.length; T++) {
      const k = f[T], E = i[T] || document.createElement("div"), C = E.style;
      C.position !== "absolute" && (C.position = "absolute", g = !0);
      const A = Te(k.left - p);
      C.left !== A && (C.left = A, g = !0);
      const j = Te(k.top - h);
      C.top !== j && (E.style.top = j, g = !0);
      const U = Te(k.width);
      C.width !== U && (E.style.width = U, g = !0);
      const z = Te(k.height);
      C.height !== z && (E.style.height = z, g = !0), E.parentNode !== c && (c.append(E), g = !0), i[T] = E;
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
    if (!ul(f)) return l();
    l(), o = h, n = f, s = new MutationObserver((v) => {
      const x = t.getRootElement(), g = x && x.parentElement;
      if (x !== o || g !== n) return p();
      for (const T of v) if (!c.contains(T.target)) return d();
    }), s.observe(f, Ud), d();
  });
  return () => {
    w(), l();
  };
}
function Cn(t, e, r) {
  if (t.type !== "text" && Gr(e)) {
    const o = e.getDOMSlot(r);
    return [o.element, o.getFirstChildOffset() + t.offset];
  }
  return [wl(r) || r, t.offset];
}
function Hd(t) {
  for (const e of t) {
    const r = e.style;
    r.background !== "Highlight" && (r.background = "Highlight"), r.color !== "HighlightText" && (r.color = "HighlightText"), r.marginTop !== Te(-1.5) && (r.marginTop = Te(-1.5)), r.paddingTop !== Te(4) && (r.paddingTop = Te(4)), r.paddingBottom !== Te(0) && (r.paddingBottom = Te(0));
  }
}
function qd(t, e = Hd) {
  let r = null, o = null, n = null, s = null, i = null, c = null, d = () => {
  };
  function l(w) {
    w.read(() => {
      const p = ae();
      if (!Re(p)) return r = null, n = null, s = null, c = null, d(), void (d = () => {
      });
      const [h, f] = function(z) {
        const R = z.getStartEndPoints();
        return z.isBackward() ? [R[1], R[0]] : R;
      }(p), v = h.getNode(), x = v.getKey(), g = h.offset, T = f.getNode(), k = T.getKey(), E = f.offset, C = t.getElementByKey(x), A = t.getElementByKey(k), j = r === null || C !== o || g !== n || x !== r.getKey(), U = s === null || A !== i || E !== c || k !== s.getKey();
      if ((j || U) && C !== null && A !== null) {
        const z = function(R, O, G, W, ot, y, et) {
          const M = (R._window ? R._window.document : document).createRange();
          return M.setStart(...Cn(O, G, W)), M.setEnd(...Cn(ot, y, et)), M;
        }(t, h, v, C, f, T, A);
        d(), d = Kd(t, z, e);
      }
      r = v, o = C, n = g, s = T, i = A, c = E;
    });
  }
  return l(t.getEditorState()), Le(t.registerUpdateListener(({ editorState: w }) => l(w)), () => {
    d();
  });
}
function Gd(t, e) {
  let r = null;
  const o = () => {
    const n = getSelection(), s = n && n.anchorNode, i = t.getRootElement();
    s !== null && i !== null && i.contains(s) ? r !== null && (r(), r = null) : r === null && (r = qd(t, e));
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
function Wd(t) {
  const e = vi(t, (r) => Gr(r) && !r.isInline());
  return Gr(e) || Ta(4, t.__key), e;
}
function Yd(t) {
  const e = ae() || el();
  let r;
  if (Re(e)) r = rl(e.focus, "next");
  else {
    if (e != null) {
      const i = e.getNodes(), c = i[i.length - 1];
      c && (r = mi(c, "next"));
    }
    r = r || al(Qe(), "previous").getFlipped().insert(Qr());
  }
  const o = Zd(t, r), n = ol(o), s = nl(n) ? il(n) : o;
  return sl(cl(s)), t.getLatest();
}
function Zd(t, e, r) {
  let o = pn(e, "next");
  for (let n = o; n; n = ll(n, r)) o = n;
  return dl(o) && Ta(283), o.insert(t.isInline() ? Qr().append(t) : t), pn(mi(t.getLatest(), "next"), e.direction);
}
function Xd(t) {
  const e = ae();
  if (!Re(e)) return !1;
  const r = /* @__PURE__ */ new Set(), o = e.getNodes();
  for (let n = 0; n < o.length; n++) {
    const s = o[n], i = s.getKey();
    if (r.has(i)) continue;
    const c = vi(s, (l) => Gr(l) && !l.isInline());
    if (c === null) continue;
    const d = c.getKey();
    c.canIndent() && !r.has(d) && (r.add(d), t(c));
  }
  return r.size > 0;
}
const Jd = Symbol.for("preact-signals");
function La() {
  if (Ve > 1) return void Ve--;
  let t, e = !1;
  for (!function() {
    let r = Sa;
    for (Sa = void 0; r !== void 0; ) r.S.v === r.v && (r.S.i = r.i), r = r.o;
  }(); Kr !== void 0; ) {
    let r = Kr;
    for (Kr = void 0, Ra++; r !== void 0; ) {
      const o = r.u;
      if (r.u = void 0, r.f &= -3, !(8 & r.f) && $i(r)) try {
        r.c();
      } catch (n) {
        e || (t = n, e = !0);
      }
      r = o;
    }
  }
  if (Ra = 0, Ve--, e) throw t;
}
function Qd(t) {
  if (Ve > 0) return t();
  Co = ++tw, Ve++;
  try {
    return t();
  } finally {
    La();
  }
}
let wt, Kr;
function En(t) {
  const e = wt;
  wt = void 0;
  try {
    return t();
  } finally {
    wt = e;
  }
}
let Sa, Ve = 0, Ra = 0, tw = 0, Co = 0, va = 0;
function Tn(t) {
  if (wt === void 0) return;
  let e = t.n;
  return e === void 0 || e.t !== wt ? (e = { i: 0, S: t, p: wt.s, n: void 0, t: wt, e: void 0, x: void 0, r: e }, wt.s !== void 0 && (wt.s.n = e), wt.s = e, t.n = e, 32 & wt.f && t.S(e), e) : e.i === -1 ? (e.i = 0, e.n !== void 0 && (e.n.p = e.p, e.p !== void 0 && (e.p.n = e.n), e.p = wt.s, e.n = void 0, wt.s.n = e, wt.s = e), e) : void 0;
}
function Yt(t, e) {
  this.v = t, this.i = 0, this.n = void 0, this.t = void 0, this.l = 0, this.W = e == null ? void 0 : e.watched, this.Z = e == null ? void 0 : e.unwatched, this.name = e == null ? void 0 : e.name;
}
function Wr(t, e) {
  return new Yt(t, e);
}
function $i(t) {
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
function Vi(t) {
  let e, r = t.s;
  for (; r !== void 0; ) {
    const o = r.p;
    r.i === -1 ? (r.S.U(r), o !== void 0 && (o.n = r.n), r.n !== void 0 && (r.n.p = o)) : e = r, r.S.n = r.r, r.r !== void 0 && (r.r = void 0), r = o;
  }
  t.s = e;
}
function or(t, e) {
  Yt.call(this, void 0), this.x = t, this.s = void 0, this.g = va - 1, this.f = 4, this.W = e == null ? void 0 : e.watched, this.Z = e == null ? void 0 : e.unwatched, this.name = e == null ? void 0 : e.name;
}
function ew(t, e) {
  return new or(t, e);
}
function Li(t) {
  const e = t.m;
  if (t.m = void 0, typeof e == "function") {
    Ve++;
    const r = wt;
    wt = void 0;
    try {
      e();
    } catch (o) {
      throw t.f &= -2, t.f |= 8, qo(t), o;
    } finally {
      wt = r, La();
    }
  }
}
function qo(t) {
  for (let e = t.s; e !== void 0; e = e.n) e.S.U(e);
  t.x = void 0, t.s = void 0, Li(t);
}
function rw(t) {
  if (wt !== this) throw new Error("Out-of-order effect");
  Vi(this), wt = t, this.f &= -2, 8 & this.f && qo(this), La();
}
function br(t, e) {
  this.x = t, this.m = void 0, this.s = void 0, this.u = void 0, this.f = 32, this.name = e == null ? void 0 : e.name;
}
function De(t, e) {
  const r = new br(t, e);
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
    const n = e[o], s = Wr(n === void 0 ? t[o] : n);
    r[o] = s;
  }
  return r;
}
Yt.prototype.brand = Jd, Yt.prototype.h = function() {
  return !0;
}, Yt.prototype.S = function(t) {
  const e = this.t;
  e !== t && t.e === void 0 && (t.x = e, this.t = t, e !== void 0 ? e.e = t : En(() => {
    var r;
    (r = this.W) == null || r.call(this);
  }));
}, Yt.prototype.U = function(t) {
  if (this.t !== void 0) {
    const e = t.e, r = t.x;
    e !== void 0 && (e.x = r, t.e = void 0), r !== void 0 && (r.e = e, t.x = void 0), t === this.t && (this.t = r, r === void 0 && En(() => {
      var o;
      (o = this.Z) == null || o.call(this);
    }));
  }
}, Yt.prototype.subscribe = function(t) {
  return De(() => {
    const e = this.value, r = wt;
    wt = void 0;
    try {
      t(e);
    } finally {
      wt = r;
    }
  }, { name: "sub" });
}, Yt.prototype.valueOf = function() {
  return this.value;
}, Yt.prototype.toString = function() {
  return this.value + "";
}, Yt.prototype.toJSON = function() {
  return this.value;
}, Yt.prototype.peek = function() {
  const t = wt;
  wt = void 0;
  try {
    return this.value;
  } finally {
    wt = t;
  }
}, Object.defineProperty(Yt.prototype, "value", { get() {
  const t = Tn(this);
  return t !== void 0 && (t.i = this.i), this.v;
}, set(t) {
  if (t !== this.v) {
    if (Ra > 100) throw new Error("Cycle detected");
    (function(e) {
      Ve !== 0 && Ra === 0 && e.l !== Co && (e.l = Co, Sa = { S: e, v: e.v, i: e.i, o: Sa });
    })(this), this.v = t, this.i++, va++, Ve++;
    try {
      for (let e = this.t; e !== void 0; e = e.x) e.t.N();
    } finally {
      La();
    }
  }
} }), or.prototype = new Yt(), or.prototype.h = function() {
  if (this.f &= -3, 1 & this.f) return !1;
  if ((36 & this.f) == 32 || (this.f &= -5, this.g === va)) return !0;
  if (this.g = va, this.f |= 1, this.i > 0 && !$i(this)) return this.f &= -2, !0;
  const t = wt;
  try {
    Sn(this), wt = this;
    const e = this.x();
    (16 & this.f || this.v !== e || this.i === 0) && (this.v = e, this.f &= -17, this.i++);
  } catch (e) {
    this.v = e, this.f |= 16, this.i++;
  }
  return wt = t, Vi(this), this.f &= -2, !0;
}, or.prototype.S = function(t) {
  if (this.t === void 0) {
    this.f |= 36;
    for (let e = this.s; e !== void 0; e = e.n) e.S.S(e);
  }
  Yt.prototype.S.call(this, t);
}, or.prototype.U = function(t) {
  if (this.t !== void 0 && (Yt.prototype.U.call(this, t), this.t === void 0)) {
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
  const t = Tn(this);
  if (this.h(), t !== void 0 && (t.i = this.i), 16 & this.f) throw this.v;
  return this.v;
} }), br.prototype.c = function() {
  const t = this.S();
  try {
    if (8 & this.f || this.x === void 0) return;
    const e = this.x();
    typeof e == "function" && (this.m = e);
  } finally {
    t();
  }
}, br.prototype.S = function() {
  if (1 & this.f) throw new Error("Cycle detected");
  this.f |= 1, this.f &= -9, Li(this), Sn(this), Ve++;
  const t = wt;
  return wt = this, rw.bind(this, t);
}, br.prototype.N = function() {
  2 & this.f || (this.f |= 2, this.u = Kr, Kr = this);
}, br.prototype.d = function() {
  this.f |= 8, 1 & this.f || qo(this);
}, br.prototype.dispose = function() {
  this.d();
};
ue({ build: (t, e, r) => Or(e), config: pr({ defaultSelection: "rootEnd", disabled: !1 }), name: "@lexical/extension/AutoFocus", register(t, e, r) {
  const o = r.getOutput();
  return De(() => o.disabled.value ? void 0 : t.registerRootListener((n) => {
    t.focus(() => {
      const s = document.activeElement;
      n === null || s !== null && n.contains(s) || n.focus({ preventScroll: !0 });
    }, { defaultSelection: o.defaultSelection.peek() });
  }));
} });
function Bi() {
  const t = Qe(), e = ae(), r = Qr();
  t.clear(), t.append(r), e !== null && r.select(), Re(e) && (e.format = 0);
}
function ji(t, e = Bi) {
  return t.registerCommand(bi, (r) => (t.update(e), !0), jo);
}
ue({ build: (t, e, r) => Or(e), config: pr({ $onClear: Bi }), name: "@lexical/extension/ClearEditor", register(t, e, r) {
  const { $onClear: o } = r.getOutput();
  return De(() => ji(t, o.value));
} });
function aw(t) {
  return (typeof t.nodes == "function" ? t.nodes() : t.nodes) || [];
}
const to = hl("format", { parse: (t) => typeof t == "number" ? t : 0 });
class Fi extends fo {
  $config() {
    return this.config("decorator-text", { extends: fo, stateConfigs: [{ flat: !0, stateConfig: to }] });
  }
  getFormat() {
    return El(this, to);
  }
  getFormatFlags(e, r) {
    return hn(this.getFormat(), e, r);
  }
  hasFormat(e) {
    const r = Tl[e];
    return (this.getFormat() & r) !== 0;
  }
  setFormat(e) {
    return Sl(this, to, e);
  }
  toggleFormat(e) {
    const r = this.getFormat(), o = hn(r, e, null);
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
function ow(t) {
  return t instanceof Fi;
}
ue({ name: "@lexical/extension/DecoratorText", nodes: () => [Fi], register: (t, e, r) => t.registerCommand(xi, (o) => {
  const n = ae();
  if (yi(n) || Re(n)) for (const s of n.getNodes()) ow(s) && s.toggleFormat(o);
  return !1;
}, ki) });
function Ui(t, e) {
  let r;
  return Wr(t(), { unwatched() {
    r && (r(), r = void 0);
  }, watched() {
    this.value = t(), r = e(this);
  } });
}
const Eo = ue({ build: (t) => Ui(() => t.getEditorState(), (e) => t.registerUpdateListener((r) => {
  e.value = r.editorState;
})), name: "@lexical/extension/EditorState" });
function ft(t, ...e) {
  const r = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const n of e) o.append("v", n);
  throw r.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
function Ki(t, e) {
  if (t && e && !Array.isArray(e) && typeof t == "object" && typeof e == "object") {
    const r = t, o = e;
    for (const n in o) r[n] = Ki(r[n], o[n]);
    return t;
  }
  return e;
}
const Go = 0, To = 1, Hi = 2, eo = 3, wa = 4, vr = 5, ro = 6, $r = 7;
function ao(t) {
  return t.id === Go;
}
function qi(t) {
  return t.id === Hi;
}
function nw(t) {
  return function(e) {
    return e.id === To;
  }(t) || ft(305, String(t.id), String(To)), Object.assign(t, { id: Hi });
}
const iw = /* @__PURE__ */ new Set();
class sw {
  constructor(e, r) {
    Wt(this, "builder");
    Wt(this, "configs");
    Wt(this, "_dependency");
    Wt(this, "_peerNameSet");
    Wt(this, "extension");
    Wt(this, "state");
    Wt(this, "_signal");
    this.builder = e, this.extension = r, this.configs = /* @__PURE__ */ new Set(), this.state = { id: Go };
  }
  mergeConfigs() {
    let e = this.extension.config || {};
    const r = this.extension.mergeConfig ? this.extension.mergeConfig.bind(this.extension) : pl;
    for (const o of this.configs) e = r(e, o);
    return e;
  }
  init(e) {
    const r = this.state;
    qi(r) || ft(306, String(r.id));
    const o = { getDependency: this.getInitDependency.bind(this), getDirectDependentNames: this.getDirectDependentNames.bind(this), getPeer: this.getInitPeer.bind(this), getPeerNameSet: this.getPeerNameSet.bind(this) }, n = { ...o, getDependency: this.getDependency.bind(this), getInitResult: this.getInitResult.bind(this), getPeer: this.getPeer.bind(this) }, s = function(c, d, l) {
      return Object.assign(c, { config: d, id: eo, registerState: l });
    }(r, this.mergeConfigs(), o);
    let i;
    this.state = s, this.extension.init && (i = this.extension.init(e, s.config, o)), this.state = function(c, d, l) {
      return Object.assign(c, { id: wa, initResult: d, registerState: l });
    }(s, i, n);
  }
  build(e) {
    const r = this.state;
    let o;
    r.id !== wa && ft(307, String(r.id), String(vr)), this.extension.build && (o = this.extension.build(e, r.config, r.registerState));
    const n = { ...r.registerState, getOutput: () => o, getSignal: this.getSignal.bind(this) };
    this.state = function(s, i, c) {
      return Object.assign(s, { id: vr, output: i, registerState: c });
    }(r, o, n);
  }
  register(e, r) {
    this._signal = r;
    const o = this.state;
    o.id !== vr && ft(308, String(o.id), String(vr));
    const n = this.extension.register && this.extension.register(e, o.config, o.registerState);
    return this.state = function(s) {
      return Object.assign(s, { id: ro });
    }(o), () => {
      const s = this.state;
      s.id !== $r && ft(309, String(o.id), String($r)), this.state = function(i) {
        return Object.assign(i, { id: vr });
      }(s), n && n();
    };
  }
  afterRegistration(e) {
    const r = this.state;
    let o;
    return r.id !== ro && ft(310, String(r.id), String(ro)), this.extension.afterRegistration && (o = this.extension.afterRegistration(e, r.config, r.registerState)), this.state = function(n) {
      return Object.assign(n, { id: $r });
    }(r), o;
  }
  getSignal() {
    return this._signal === void 0 && ft(311), this._signal;
  }
  getInitResult() {
    this.extension.init === void 0 && ft(312, this.extension.name);
    const e = this.state;
    return function(r) {
      return r.id >= wa;
    }(e) || ft(313, String(e.id), String(wa)), e.initResult;
  }
  getInitPeer(e) {
    const r = this.builder.extensionNameMap.get(e);
    return r ? r.getExtensionInitDependency() : void 0;
  }
  getExtensionInitDependency() {
    const e = this.state;
    return function(r) {
      return r.id >= eo;
    }(e) || ft(314, String(e.id), String(eo)), { config: e.config };
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
      return r.id >= $r;
    }(e) || ft(316, String(e.id), String($r)), e;
  }
  getDirectDependentNames() {
    return this.builder.incomingEdges.get(this.extension.name) || iw;
  }
  getPeerNameSet() {
    let e = this._peerNameSet;
    return e || (e = new Set((this.extension.peerDependencies || []).map(([r]) => r)), this._peerNameSet = e), e;
  }
  getExtensionDependency() {
    if (!this._dependency) {
      const e = this.state;
      (function(r) {
        return r.id >= vr;
      })(e) || ft(317, this.extension.name), this._dependency = { config: e.config, init: e.initResult, output: e.output };
    }
    return this._dependency;
  }
}
const Rn = { tag: Bo };
function cw() {
  const t = Qe();
  t.isEmpty() && t.append(Qr());
}
const lw = ue({ config: pr({ setOptions: Rn, updateOptions: Rn }), init: ({ $initialEditorState: t = cw }) => ({ $initialEditorState: t, initialized: !1 }), afterRegistration(t, { updateOptions: e, setOptions: r }, o) {
  const n = o.getInitResult();
  if (!n.initialized) {
    n.initialized = !0;
    const { $initialEditorState: s } = n;
    if (vl(s)) t.setEditorState(s, r);
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
}, name: "@lexical/extension/InitialState", nodes: [gl, fi, fl, ml, gi] }), Dn = Symbol.for("@lexical/extension/LexicalBuilder");
function On() {
}
function dw(t) {
  throw t;
}
function ua(t) {
  return Array.isArray(t) ? t : [t];
}
const oo = "0.43.0+prod.esm";
class _r {
  constructor(e) {
    Wt(this, "roots");
    Wt(this, "extensionNameMap");
    Wt(this, "outgoingConfigEdges");
    Wt(this, "incomingEdges");
    Wt(this, "conflicts");
    Wt(this, "_sortedExtensionReps");
    Wt(this, "PACKAGE_VERSION");
    this.outgoingConfigEdges = /* @__PURE__ */ new Map(), this.incomingEdges = /* @__PURE__ */ new Map(), this.extensionNameMap = /* @__PURE__ */ new Map(), this.conflicts = /* @__PURE__ */ new Map(), this.PACKAGE_VERSION = oo, this.roots = e;
    for (const r of e) this.addExtension(r);
  }
  static fromExtensions(e) {
    const r = [ua(lw)];
    for (const o of e) r.push(ua(o));
    return new _r(r);
  }
  static maybeFromEditor(e) {
    const r = e[Dn];
    return r && (r.PACKAGE_VERSION !== oo && ft(292, r.PACKAGE_VERSION, oo), r instanceof _r || ft(293)), r;
  }
  static fromEditor(e) {
    const r = _r.maybeFromEditor(e);
    return r === void 0 && ft(294), r;
  }
  constructEditor() {
    const { $initialEditorState: e, onError: r, ...o } = this.buildCreateEditorArgs(), n = Object.assign(hi({ ...o, ...r ? { onError: (s) => {
      r(s, n);
    } } : {} }), { [Dn]: this });
    for (const s of this.sortedExtensionReps()) s.build(n);
    return n;
  }
  buildEditor() {
    let e = On;
    function r() {
      try {
        e();
      } finally {
        e = On;
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
    const r = ua(e), [o] = r;
    typeof o.name != "string" && ft(297, typeof o.name);
    let n = this.extensionNameMap.get(o.name);
    if (n !== void 0 && n.extension !== o && ft(298, o.name), !n) {
      n = new sw(this, o), this.extensionNameMap.set(o.name, n);
      const s = this.conflicts.get(o.name);
      typeof s == "string" && ft(299, o.name, s);
      for (const i of o.conflictsWith || []) this.extensionNameMap.has(i) && ft(299, o.name, i), this.conflicts.set(i, o.name);
      for (const i of o.dependencies || []) {
        const c = ua(i);
        this.addEdge(o.name, c[0].name, c.slice(1)), this.addExtension(c);
      }
      for (const [i, c] of o.peerDependencies || []) this.addEdge(o.name, i, c ? [c] : []);
    }
  }
  sortedExtensionReps() {
    if (this._sortedExtensionReps) return this._sortedExtensionReps;
    const e = [], r = (o, n) => {
      let s = o.state;
      if (qi(s)) return;
      const i = o.extension.name;
      var c;
      ao(s) || ft(300, i, n || "[unknown]"), ao(c = s) || ft(304, String(c.id), String(Go)), s = Object.assign(c, { id: To }), o.state = s;
      const d = this.outgoingConfigEdges.get(i);
      if (d) for (const l of d.keys()) {
        const w = this.extensionNameMap.get(l);
        w && r(w, i);
      }
      s = nw(s), o.state = s, e.push(o);
    };
    for (const o of this.extensionNameMap.values()) ao(o.state) && r(o);
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
      if (p.onError !== void 0 && (e.onError = p.onError), p.disableEvents !== void 0 && (e.disableEvents = p.disableEvents), p.parentEditor !== void 0 && (e.parentEditor = p.parentEditor), p.editable !== void 0 && (e.editable = p.editable), p.namespace !== void 0 && (e.namespace = p.namespace), p.$initialEditorState !== void 0 && (e.$initialEditorState = p.$initialEditorState), p.nodes) for (const h of aw(p)) {
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
      p.theme && Ki(i, p.theme);
    }
    Object.keys(i).length > 0 && (e.theme = i), r.size && (e.nodes = [...r]);
    const d = Object.keys(s).length > 0, l = n.size > 0;
    (d || l) && (e.html = {}, d && (e.html.import = s), l && (e.html.export = n));
    for (const w of c) w.init(e);
    return e.onError || (e.onError = dw), e;
  }
}
const ww = /* @__PURE__ */ new Set(), Mn = ue({ build(t, e, r) {
  const o = r.getDependency(Eo).output, n = Wr({ watchedNodeKeys: /* @__PURE__ */ new Map() }), s = Ui(() => {
  }, () => De(() => {
    const i = s.peek(), { watchedNodeKeys: c } = n.value;
    let d, l = !1;
    o.value.read(() => {
      if (ae()) for (const [w, p] of c.entries()) {
        if (p.size === 0) {
          c.delete(w);
          continue;
        }
        const h = Dl(w), f = h && h.isSelected() || !1;
        l = l || f !== (!!i && i.has(w)), f && (d = d || /* @__PURE__ */ new Set(), d.add(w));
      }
    }), !l && d && i && d.size === i.size || (s.value = d);
  }));
  return { watchNodeKey: function(i) {
    const c = ew(() => (s.value || ww).has(i)), { watchedNodeKeys: d } = n.peek();
    let l = d.get(i);
    const w = l !== void 0;
    return l = l || /* @__PURE__ */ new Set(), l.add(c), w || (d.set(i, l), n.value = { watchedNodeKeys: d }), c;
  } };
}, dependencies: [Eo], name: "@lexical/extension/NodeSelection" }), uw = bl("INSERT_HORIZONTAL_RULE_COMMAND");
class Nr extends fo {
  static getType() {
    return "horizontalrule";
  }
  static clone(e) {
    return new Nr(e.__key);
  }
  static importJSON(e) {
    return Wo().updateFromJSON(e);
  }
  static importDOM() {
    return { hr: () => ({ conversion: pw, priority: 0 }) };
  }
  exportDOM() {
    return { element: document.createElement("hr") };
  }
  createDOM(e) {
    const r = document.createElement("hr");
    return _i(r, e.theme.hr), r;
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
function pw() {
  return { node: Wo() };
}
function Wo() {
  return Rl(Nr);
}
function hw(t) {
  return t instanceof Nr;
}
ue({ dependencies: [Eo, Mn], name: "@lexical/extension/HorizontalRule", nodes: () => [Nr], register(t, e, r) {
  const { watchNodeKey: o } = r.getDependency(Mn).output, n = Wr({ nodeSelections: /* @__PURE__ */ new Map() }), s = t._config.theme.hrSelected ?? "selected";
  return Le(t.registerCommand(uw, (i) => {
    const c = ae();
    if (!Re(c)) return !1;
    if (c.focus.getNode() !== null) {
      const d = Wo();
      Yd(d);
    }
    return !0;
  }, jo), t.registerCommand(xl, (i) => {
    if (yl(i.target)) {
      const c = kl(i.target);
      if (hw(c)) return function(d, l = !1) {
        const w = ae(), p = d.isSelected(), h = d.getKey();
        let f;
        l && yi(w) ? f = w : (f = _l(), Nl(f)), p ? f.delete(h) : f.add(h);
      }(c, i.shiftKey), !0;
    }
    return !1;
  }, ki), t.registerMutationListener(Nr, (i, c) => {
    Qd(() => {
      let d = !1;
      const { nodeSelections: l } = n.peek();
      for (const [w, p] of i.entries()) if (p === "destroyed") l.delete(w), d = !0;
      else {
        const h = l.get(w), f = t.getElementByKey(w);
        h ? h.domNode.value = f : (d = !0, l.set(w, { domNode: Wr(f), selectedSignal: o(w) }));
      }
      d && (n.value = { nodeSelections: l });
    });
  }), De(() => {
    const i = [];
    for (const { domNode: c, selectedSignal: d } of n.value.nodeSelections.values()) i.push(De(() => {
      const l = c.value;
      l && (d.value ? _i(l, s) : Ol(l, s));
    }));
    return Le(...i);
  }));
} });
ue({ build: (t, e) => Or({ inheritEditableFromParent: e.inheritEditableFromParent }), config: pr({ $getParentEditor: function() {
  const t = Cl();
  return _r.fromEditor(t), t;
}, inheritEditableFromParent: !1 }), init: (t, e, r) => {
  const o = e.$getParentEditor();
  t.parentEditor = o, t.theme = t.theme || o._config.theme;
}, name: "@lexical/extension/NestedEditor", register: (t, e, r) => De(() => {
  const o = t._parentEditor;
  if (o && r.getOutput().inheritEditableFromParent.value) return t.setEditable(o.isEditable()), o.registerEditableListener(t.setEditable.bind(t));
}) });
ue({ build: (t, e, r) => Or(e), config: pr({ disabled: !1, onReposition: void 0 }), name: "@lexical/utils/SelectionAlwaysOnDisplay", register: (t, e, r) => {
  const o = r.getOutput();
  return De(() => {
    if (!o.disabled.value) return Gd(t, o.onReposition.value);
  });
} });
function Gi(t) {
  return t.canBeEmpty();
}
function gw(t, e, r = Gi) {
  return Le(t.registerCommand(Ml, (o) => {
    const n = ae();
    if (!Re(n)) return !1;
    o.preventDefault();
    const s = function(i) {
      if (i.getNodes().filter((h) => Il(h) && h.canIndent()).length > 0) return !0;
      const c = i.anchor, d = i.focus, l = d.isBefore(c) ? d : c, w = l.getNode(), p = Wd(w);
      if (p.canIndent()) {
        const h = p.getKey();
        let f = zl();
        if (f.anchor.set(h, 0, "element"), f.focus.set(h, 0, "element"), f = Pl(f), f.anchor.is(l)) return !0;
      }
      return !1;
    }(n) ? o.shiftKey ? Al : gn : $l;
    return t.dispatchCommand(s, void 0);
  }, jo), t.registerCommand(gn, () => {
    const o = typeof e == "number" ? e : e ? e.peek() : null, n = ae();
    if (!Re(n)) return !1;
    const s = typeof r == "function" ? r : r.peek();
    return Xd((i) => {
      if (s(i)) {
        const c = i.getIndent() + 1;
        (!o || c < o) && i.setIndent(c);
      }
    });
  }, Fo));
}
ue({ build: (t, e, r) => Or(e), config: pr({ $canIndent: Gi, disabled: !1, maxIndent: null }), name: "@lexical/extension/TabIndentation", register(t, e, r) {
  const { disabled: o, maxIndent: n, $canIndent: s } = r.getOutput();
  return De(() => {
    if (!o.value) return gw(t, n, s);
  });
} });
const fw = ue({ name: "@lexical/react/ReactProvider" });
function mw() {
  return Qe().getTextContent();
}
function vw(t, e = !0) {
  if (t) return !1;
  let r = mw();
  return e && (r = r.trim()), r === "";
}
function bw(t) {
  if (!vw(t, !1)) return !1;
  const e = Qe().getChildren(), r = e.length;
  if (r > 1) return !1;
  for (let o = 0; o < r; o++) {
    const n = e[o];
    if (Vl(n)) return !1;
    if (Gr(n)) {
      if (!Ll(n) || n.__indent !== 0) return !1;
      const s = n.getChildren(), i = s.length;
      for (let c = 0; c < i; c++) {
        const d = s[o];
        if (!mo(d)) return !1;
      }
    }
  }
  return !0;
}
function Wi(t) {
  return () => bw(t);
}
function Yi(t) {
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
              const v = ae();
              if (Re(v)) {
                const x = v.anchor;
                let g = x.getNode(), T = 0, k = 0;
                if (mo(g) && l >= 0 && w >= 0 && (T = l, k = l + w, v.setTextNodeRange(g, T, g, k)), T === k && p === "" || (v.insertRawText(p), g = x.getNode()), mo(g)) {
                  T = h, k = h + f;
                  const E = g.getTextContentSize();
                  T = T > E ? E : T, k = k > E ? E : k, v.setTextNodeRange(g, T, g, k);
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
ue({ build: (t, e, r) => Or(e), config: pr({ disabled: typeof window > "u" }), name: "@lexical/dragon", register: (t, e, r) => De(() => r.getOutput().disabled.value ? void 0 : Yi(t)) });
function xw(t, ...e) {
  const r = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const n of e) o.append("v", n);
  throw r.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
const Yo = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Xt : Z;
function yw({ editor: t, ErrorBoundary: e }) {
  return function(r, o) {
    const [n, s] = N(() => r.getDecorators());
    return Yo(() => r.registerDecoratorListener((i) => {
      Kl(() => {
        s(i);
      });
    }), [r]), Z(() => {
      s(r.getDecorators());
    }, [r]), P(() => {
      const i = [], c = Object.keys(n);
      for (let d = 0; d < c.length; d++) {
        const l = c[d], w = a(o, { onError: (h) => r._onError(h), children: a(Kc, { fallback: null, children: n[l] }) }), p = r.getElementByKey(l);
        p !== null && i.push(Hl(w, p, l));
      }
      return i;
    }, [o, n, r]);
  }(t, e);
}
function kw({ editor: t, ErrorBoundary: e }) {
  return function(r) {
    const o = _r.maybeFromEditor(r);
    if (o && o.hasExtensionByName(fw.name)) {
      for (const n of ["@lexical/plain-text", "@lexical/rich-text"]) o.hasExtensionByName(n) && xw(320, n);
      return !0;
    }
    return !1;
  }(t) ? null : a(yw, { editor: t, ErrorBoundary: e });
}
function In(t) {
  return t.getEditorState().read(Wi(t.isComposing()));
}
function _w({ contentEditable: t, placeholder: e = null, ErrorBoundary: r }) {
  const [o] = Ie();
  return function(n) {
    Yo(() => Le(Ul(n), Yi(n)), [n]);
  }(o), u(ht, { children: [t, a(Nw, { content: e }), a(kw, { editor: o, ErrorBoundary: r })] });
}
function Nw({ content: t }) {
  const [e] = Ie(), r = function(n) {
    const [s, i] = N(() => In(n));
    return Yo(() => {
      function c() {
        const d = In(n);
        i(d);
      }
      return c(), Le(n.registerUpdateListener(() => {
        c();
      }), n.registerEditableListener(() => {
        c();
      }));
    }, [n]), s;
  }(e), o = Bd();
  return r ? typeof t == "function" ? t(o) : t : null;
}
function Cw({ defaultSelection: t }) {
  const [e] = Ie();
  return Z(() => {
    e.focus(() => {
      const r = document.activeElement, o = e.getRootElement();
      o === null || r !== null && o.contains(r) || o.focus({ preventScroll: !0 });
    }, { defaultSelection: t });
  }, [t, e]), null;
}
const Ew = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Xt : Z;
function Tw({ onClear: t }) {
  const [e] = Ie();
  return Ew(() => ji(e, t), [e, t]), null;
}
const Zi = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Xt : Z;
function Sw({ editor: t, ariaActiveDescendant: e, ariaAutoComplete: r, ariaControls: o, ariaDescribedBy: n, ariaErrorMessage: s, ariaExpanded: i, ariaInvalid: c, ariaLabel: d, ariaLabelledBy: l, ariaMultiline: w, ariaOwns: p, ariaRequired: h, autoCapitalize: f, className: v, id: x, role: g = "textbox", spellCheck: T = !0, style: k, tabIndex: E, "data-testid": C, ...A }, j) {
  const [U, z] = N(t.isEditable()), R = $((G) => {
    G && G.ownerDocument && G.ownerDocument.defaultView ? t.setRootElement(G) : t.setRootElement(null);
  }, [t]), O = P(() => /* @__PURE__ */ function(...G) {
    return (W) => {
      for (const ot of G) typeof ot == "function" ? ot(W) : ot != null && (ot.current = W);
    };
  }(j, R), [R, j]);
  return Zi(() => (z(t.isEditable()), t.registerEditableListener((G) => {
    z(G);
  })), [t]), a("div", { "aria-activedescendant": U ? e : void 0, "aria-autocomplete": U ? r : "none", "aria-controls": U ? o : void 0, "aria-describedby": n, ...s != null ? { "aria-errormessage": s } : {}, "aria-expanded": U && g === "combobox" ? !!i : void 0, ...c != null ? { "aria-invalid": c } : {}, "aria-label": d, "aria-labelledby": l, "aria-multiline": w, "aria-owns": U ? p : void 0, "aria-readonly": !U || void 0, "aria-required": h, autoCapitalize: f, className: v, contentEditable: U, "data-testid": C, id: x, ref: O, role: g, spellCheck: T, style: k, tabIndex: E, ...A });
}
const Rw = Lo(Sw);
function zn(t) {
  return t.getEditorState().read(Wi(t.isComposing()));
}
const Dw = Lo(Ow);
function Ow(t, e) {
  const { placeholder: r, ...o } = t, [n] = Ie();
  return u(ht, { children: [a(Rw, { editor: n, ...o, ref: e }), r != null && a(Mw, { editor: n, content: r })] });
}
function Mw({ content: t, editor: e }) {
  const r = function(i) {
    const [c, d] = N(() => zn(i));
    return Zi(() => {
      function l() {
        const w = zn(i);
        d(w);
      }
      return l(), Le(i.registerUpdateListener(() => {
        l();
      }), i.registerEditableListener(() => {
        l();
      }));
    }, [i]), c;
  }(e), [o, n] = N(e.isEditable());
  if (Xt(() => (n(e.isEditable()), e.registerEditableListener((i) => {
    n(i);
  })), [e]), !r) return null;
  let s = null;
  return typeof t == "function" ? s = t(o) : t !== null && (s = t), s === null ? null : a("div", { "aria-hidden": !0, children: s });
}
function Iw({
  placeholder: t,
  className: e,
  placeholderClassName: r
}) {
  return /* @__PURE__ */ a(
    Dw,
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
const Xi = Dr(void 0);
function zw({
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
  const t = Xr(Xi);
  if (!t)
    throw new Error("useToolbarContext must be used within a ToolbarContext provider");
  return t;
}
function Pw() {
  const [t, e] = N(void 0), r = $(() => {
    e(void 0);
  }, []), o = P(() => {
    if (t === void 0)
      return;
    const { title: s, content: i } = t;
    return /* @__PURE__ */ a(co, { open: !0, onOpenChange: r, children: /* @__PURE__ */ u(lo, { children: [
      /* @__PURE__ */ a(wo, { children: /* @__PURE__ */ a(uo, { children: s }) }),
      i
    ] }) });
  }, [t, r]), n = $(
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
function Aw({
  children: t
}) {
  const [e] = Ie(), [r, o] = N(e), [n, s] = N("paragraph"), [i, c] = Pw(), d = () => {
  };
  return Z(() => r.registerCommand(
    Ni,
    (l, w) => (o(w), !1),
    Fo
  ), [r]), /* @__PURE__ */ u(
    zw,
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
function $w(t) {
  const [e] = Ie(), { activeEditor: r } = Ji();
  Z(() => r.registerCommand(
    Ni,
    () => {
      const o = ae();
      return o && t(o), !1;
    },
    Fo
  ), [e, t]), Z(() => {
    r.getEditorState().read(() => {
      const o = ae();
      o && t(o);
    });
  }, [r, t]);
}
const Pn = [
  { format: "bold", icon: Js, label: "Bold" },
  { format: "italic", icon: Qs, label: "Italic" }
  // CUSTOM: TJ removed underline and strikethrough as they are not supported by the current comment
  // data conversion and are not in P9 anyway. We can add these back if we ever get this supported.
  /* { format: 'underline', icon: UnderlineIcon, label: 'Underline' },
  { format: 'strikethrough', icon: StrikethroughIcon, label: 'Strikethrough' }, */
];
function Vw() {
  const { activeEditor: t } = Ji(), [e, r] = N([]), o = $((n) => {
    if (Re(n) || ql(n)) {
      const s = [];
      Pn.forEach(({ format: i }) => {
        n.hasFormat(i) && s.push(i);
      }), r((i) => i.length !== s.length || !s.every((c) => i.includes(c)) ? s : i);
    }
  }, []);
  return $w(o), /* @__PURE__ */ a(
    Yn,
    {
      type: "multiple",
      value: e,
      onValueChange: r,
      variant: "outline",
      size: "sm",
      children: Pn.map(({ format: n, icon: s, label: i }) => /* @__PURE__ */ a(
        pa,
        {
          value: n,
          "aria-label": i,
          onClick: () => {
            t.dispatchCommand(xi, n);
          },
          children: /* @__PURE__ */ a(s, { className: "tw:h-4 tw:w-4" })
        },
        n
      ))
    }
  );
}
const Qi = "data-platform-content-zoom-root", ts = Dr(void 0);
function kh({ area: t, children: e }) {
  return /* @__PURE__ */ a(ts.Provider, { value: t ?? "", children: e });
}
function Ba() {
  const t = Xr(ts);
  return t === void 0 ? {} : { [Qi]: t };
}
function Lw({ onClear: t }) {
  const [e] = Ie();
  Z(() => {
    t && t(() => {
      e.dispatchCommand(bi, void 0);
    });
  }, [e, t]);
}
function Bw({
  placeholder: t = "Start typing ...",
  autoFocus: e = !1,
  onClear: r,
  actions: o
}) {
  const n = Ba(), [, s] = N(void 0);
  return /* @__PURE__ */ u("div", { className: "tw:relative", children: [
    /* @__PURE__ */ a(Aw, { children: () => (
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
          children: /* @__PURE__ */ a(Vw, {})
        }
      )
    ) }),
    /* @__PURE__ */ u("div", { className: "tw:relative", children: [
      /* @__PURE__ */ a(
        _w,
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
                  c !== void 0 && s(c);
                },
                ...n,
                children: /* @__PURE__ */ a(Iw, { placeholder: t })
              }
            )
          ),
          ErrorBoundary: $d
        }
      ),
      e && /* @__PURE__ */ a(Cw, { defaultSelection: "rootEnd" }),
      /* @__PURE__ */ a(Lw, { onClear: r }),
      /* @__PURE__ */ a(Tw, {})
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
  theme: Ko,
  nodes: Ho,
  onError: (t) => {
    console.error(t);
  }
};
function Da({
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
  const [l] = N(() => ({
    ...jw,
    ...t ? { editorState: t } : {},
    ...e ? { editorState: JSON.stringify(e) } : {}
  })), w = $(
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
        children: /* @__PURE__ */ a(Od, { initialConfig: l, children: /* @__PURE__ */ u(zt, { children: [
          /* @__PURE__ */ a(
            Bw,
            {
              placeholder: n,
              autoFocus: s,
              onClear: i,
              actions: d
            }
          ),
          /* @__PURE__ */ a(Id, { ignoreSelectionChange: !0, onChange: w })
        ] }) })
      }
    )
  );
}
function es(t) {
  const e = t.querySelector('[contenteditable="true"]');
  if (!e) return !1;
  e.focus();
  const r = window.getSelection(), o = document.createRange();
  return o.selectNodeContents(e), o.collapse(!1), r == null || r.removeAllRanges(), r == null || r.addRange(o), !0;
}
function rs(t) {
  return t ? t.some(
    (e) => e && "text" in e && e.text.trim().length > 0 ? !0 : !e || !("children" in e) ? !1 : rs(e.children)
  ) : !1;
}
function ie(t) {
  var e;
  return (e = t == null ? void 0 : t.root) != null && e.children ? rs(t.root.children) : !1;
}
function Fw(t) {
  if (!t || t.trim() === "")
    throw new Error("Input HTML is empty");
  const e = Ci({
    namespace: "EditorUtils",
    theme: Ko,
    nodes: Ho,
    onError: (o) => {
      console.error(o);
    }
  });
  let r;
  if (e.update(
    () => {
      const n = new DOMParser().parseFromString(t, "text/html"), s = Wl(e, n);
      Qe().clear(), Bl(s);
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
function Oa(t) {
  const e = Ci({
    namespace: "EditorUtils",
    theme: Ko,
    nodes: Ho,
    onError: (n) => {
      console.error(n);
    }
  }), r = e.parseEditorState(JSON.stringify(t));
  e.setEditorState(r);
  let o = "";
  return e.getEditorState().read(() => {
    o = Gl(e);
  }), o = o.replace(/\s+style="[^"]*"/g, "").replace(/\s+class="[^"]*"/g, "").replace(/<span>(.*?)<\/span>/g, "$1").replace(/<b><strong[^>]*>(.*?)<\/strong><\/b>/g, "<b>$1</b>").replace(/<strong><b[^>]*>(.*?)<\/b><\/strong>/g, "<b>$1</b>").replace(/<i><em[^>]*>(.*?)<\/em><\/i>/g, "<i>$1</i>").replace(/<em><i[^>]*>(.*?)<\/i><\/em>/g, "<i>$1</i>").replace(/<u><span[^>]*>(.*?)<\/span><\/u>/g, "<u>$1</u>").replace(/<s><span[^>]*>(.*?)<\/span><\/s>/g, "<s>$1</s>").replace(/<br\s*\/?>/gi, "<br/>"), o;
}
function Zo(t) {
  return ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Home", "End"].includes(t.key) ? (t.stopPropagation(), !0) : !1;
}
const as = Object.freeze([
  "%cancelButton_tooltip%",
  "%acceptButton_tooltip%"
]), An = (t, e) => t[e] ?? e;
function os({
  onCancelClick: t,
  onAcceptClick: e,
  canAccept: r = !0,
  localizedStrings: o = {},
  className: n = "tw:h-6 tw:w-6",
  acceptLabel: s
}) {
  const i = An(o, "%cancelButton_tooltip%"), c = s ?? An(o, "%acceptButton_tooltip%");
  return /* @__PURE__ */ u(za, { children: [
    /* @__PURE__ */ a(zt, { children: /* @__PURE__ */ u(kt, { children: [
      /* @__PURE__ */ a(_t, { asChild: !0, children: /* @__PURE__ */ a(
        tt,
        {
          "aria-label": i,
          className: n,
          size: "icon",
          onClick: t,
          variant: "secondary",
          children: /* @__PURE__ */ a(ai, {})
        }
      ) }),
      /* @__PURE__ */ a(Nt, { children: /* @__PURE__ */ a("p", { children: i }) })
    ] }) }),
    /* @__PURE__ */ a(Do, {}),
    /* @__PURE__ */ a(zt, { children: /* @__PURE__ */ u(kt, { children: [
      /* @__PURE__ */ a(_t, { asChild: !0, children: /* @__PURE__ */ a(
        tt,
        {
          "aria-label": c,
          className: n,
          size: "icon",
          onClick: e,
          disabled: !r,
          children: /* @__PURE__ */ a(Je, {})
        }
      ) }),
      /* @__PURE__ */ a(Nt, { children: /* @__PURE__ */ a("p", { children: c }) })
    ] }) })
  ] });
}
const Uw = "verseText", _h = Object.freeze([
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
function Br(t) {
  return t !== void 0 && Object.keys(t).length > 0;
}
function $n(t) {
  return t.editorState === void 0 && t.assignedUser === void 0 && !Br(t.commentEdits);
}
const ns = [
  "tw:prose tw:max-w-none tw:break-words tw:text-sm tw:font-normal tw:text-foreground",
  "tw:[&>blockquote]:border-s-0 tw:[&>blockquote]:p-0 tw:[&>blockquote]:ps-0 tw:[&>blockquote]:font-normal tw:[&>blockquote]:not-italic tw:[&>blockquote]:text-foreground",
  "tw:prose-quoteless"
].join(" ");
function is(t) {
  return (t == null ? void 0 : t.conflictType) === Uw;
}
function ss(t) {
  return t === "replaced" ? "reject" : t === "merged" ? "merged" : "accept";
}
function ba(t, e) {
  return t === "" ? e["%comment_assign_unassigned%"] ?? "Unassigned" : t === "Team" ? e["%comment_assign_team%"] ?? "Team" : t;
}
function Xo(t) {
  const e = Mo();
  return t.key === "Enter" && (e && t.metaKey || !e && t.ctrlKey);
}
function we(t, e, r) {
  const o = e[t];
  return o === void 0 || o === t ? r : o;
}
const Kw = {
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
}, Hw = {
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
function no(t, e) {
  return t === "" ? e["%commentEditor_unassigned%"] ?? "Unassigned" : t === "Team" ? e["%commentEditor_team%"] ?? "Team" : t;
}
function Nh({
  assignableUsers: t,
  onSave: e,
  onClose: r,
  localizedStrings: o,
  initialAssignedUser: n
}) {
  const [s, i] = N(Hw), [c, d] = N(n), [l, w] = N(!1), p = V(void 0), h = V(null);
  Z(() => {
    let g = !0;
    const T = h.current;
    if (!T) return;
    const k = setTimeout(() => {
      g && es(T);
    }, 300);
    return () => {
      g = !1, clearTimeout(k);
    };
  }, []);
  const f = $(() => {
    if (!ie(s)) return;
    const g = Oa(s);
    e(g, c);
  }, [s, e, c]), v = o["%commentEditor_placeholder%"] ?? "Type your comment here...", x = o["%commentEditor_assignTo_label%"] ?? "Assign to";
  return /* @__PURE__ */ u("div", { className: "pr-twp tw:grid tw:gap-3", children: [
    /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:justify-between", children: [
      /* @__PURE__ */ a("span", { className: "tw:text-sm tw:font-medium", children: x }),
      /* @__PURE__ */ a(
        os,
        {
          onCancelClick: r,
          onAcceptClick: f,
          canAccept: ie(s),
          localizedStrings: o,
          acceptLabel: o["%commentEditor_saveButton_tooltip%"]
        }
      )
    ] }),
    /* @__PURE__ */ a("div", { className: "tw:flex tw:items-center tw:gap-2", children: /* @__PURE__ */ u(lr, { open: l, onOpenChange: w, children: [
      /* @__PURE__ */ a(Rr, { asChild: !0, children: /* @__PURE__ */ u(
        tt,
        {
          variant: "outline",
          className: "tw:flex tw:w-full tw:items-center tw:justify-start tw:gap-2",
          disabled: t.length === 0,
          children: [
            /* @__PURE__ */ a(oi, { className: "tw:h-4 tw:w-4" }),
            /* @__PURE__ */ a("span", { children: no(c !== void 0 ? c : "", o) })
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
              children: /* @__PURE__ */ a("span", { children: no(g, o) })
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
          g.key === "Escape" ? (g.preventDefault(), g.stopPropagation(), r()) : Xo(g) && (g.preventDefault(), g.stopPropagation(), ie(s) && f());
        },
        onKeyDown: (g) => {
          Zo(g), (g.key === "Enter" || g.key === " ") && g.stopPropagation();
        },
        children: /* @__PURE__ */ a(
          Da,
          {
            editorSerializedState: s,
            onSerializedChange: (g) => i(g),
            placeholder: v,
            onClear: (g) => {
              p.current = g;
            }
          }
        )
      }
    )
  ] });
}
const Ch = Object.freeze([
  "%commentEditor_placeholder%",
  "%commentEditor_assignTo_label%",
  "%commentEditor_saveButton_tooltip%",
  "%commentEditor_unassigned%",
  "%commentEditor_team%",
  ...as
]), Eh = Object.freeze([
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
]), qw = "comment-list";
function Th(t) {
  return t;
}
function Gw({
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
function Sh({ className: t, ...e }) {
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
function Rh({ className: t, ...e }) {
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
function Dh({ className: t, ...e }) {
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
function Ww({ className: t, ...e }) {
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
function Oh({ className: t, ...e }) {
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
function Yr({
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
function Yw({
  className: t,
  size: e = "default",
  ...r
}) {
  return /* @__PURE__ */ a(
    Uo.Root,
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
function Mh({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    Uo.Image,
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
function Zw({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    Uo.Fallback,
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
function Vn({
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
  const w = Ba(), [p, h] = N(), f = d ?? p, x = f !== void 0 && o, g = l !== void 0, T = $(
    (y) => {
      g || h(y), l == null || l(y);
    },
    [g, l]
  ), k = V(null), E = V(!1);
  Z(() => {
    if (!x || !E.current) return;
    E.current = !1;
    let y = !0;
    const et = k.current;
    if (!et) return;
    const M = setTimeout(() => {
      y && es(et);
    }, 300);
    return () => {
      y = !1, clearTimeout(M);
    };
  }, [x]);
  const C = $(
    (y) => {
      y && y.stopPropagation(), T(void 0), i == null || i(!1);
    },
    [i, T]
  ), A = $(
    async (y) => {
      if (y && y.stopPropagation(), !f || !n) return;
      await n(
        t.id,
        Oa(f)
      ) && (T(void 0), i == null || i(!1));
    },
    [f, n, t.id, i, T]
  ), j = P(() => {
    const y = new Date(t.date), et = Mc(
      y,
      r["%comment_date_today%"],
      r["%comment_date_yesterday%"]
    ), M = y.toLocaleTimeString(void 0, {
      hour: "numeric",
      minute: "2-digit"
    });
    return Ye(r["%comment_dateAtTime%"], {
      date: et,
      time: M
    });
  }, [t.date, r]), U = P(() => t.user, [t.user]), z = P(
    () => t.user.split(" ").map((y) => y[0]).join("").toUpperCase().slice(0, 2),
    [t.user]
  ), R = P(() => Vo(t.contents), [t.contents]), O = P(
    () => t.contents.replace(/<[^>]*>/g, "").trim().length > 0,
    [t.contents]
  ), G = !!t.conflictResolutionAction && !O, W = P(() => {
    if (o && c)
      return /* @__PURE__ */ u(ht, { children: [
        /* @__PURE__ */ u(
          Ge,
          {
            onClick: (y) => {
              y.stopPropagation(), E.current = !0;
              const et = t.contents.trim() !== "";
              T(et ? Fw(t.contents) : Kw), i == null || i(!0);
            },
            children: [
              /* @__PURE__ */ a(tc, { className: "tw:me-2 tw:h-4 tw:w-4" }),
              r["%comment_editComment%"]
            ]
          }
        ),
        /* @__PURE__ */ u(
          Ge,
          {
            onClick: async (y) => {
              y.stopPropagation(), s && await s(t.id);
            },
            children: [
              /* @__PURE__ */ a(ec, { className: "tw:me-2 tw:h-4 tw:w-4" }),
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
    T
  ]), ot = !ie(f);
  return /* @__PURE__ */ u(
    "div",
    {
      className: b("tw:flex tw:w-full tw:flex-row tw:items-baseline tw:gap-2", {
        "tw:text-sm": e
      }),
      children: [
        /* @__PURE__ */ a(Yw, { className: "tw:h-8 tw:w-8", children: /* @__PURE__ */ a(Zw, { className: "tw:text-xs tw:font-medium", children: z }) }),
        /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-1 tw:flex-col tw:gap-1", children: [
          /* @__PURE__ */ u("div", { className: "tw:flex tw:w-full tw:flex-row tw:flex-wrap tw:items-baseline tw:gap-x-2", children: [
            /* @__PURE__ */ a("p", { className: "tw:text-sm tw:font-medium", children: U }),
            /* @__PURE__ */ a("p", { className: "tw:text-xs tw:font-normal tw:text-muted-foreground", children: j }),
            /* @__PURE__ */ a("div", { className: "tw:flex-1" }),
            e && t.assignedUser !== void 0 && /* @__PURE__ */ u(Hr, { variant: "secondary", className: "tw:text-xs tw:font-normal", children: [
              "→ ",
              ba(t.assignedUser, r)
            ] })
          ] }),
          x && /* @__PURE__ */ a(
            "div",
            {
              role: "textbox",
              tabIndex: -1,
              className: "tw:flex tw:flex-col tw:gap-2",
              ref: k,
              onKeyDownCapture: (y) => {
                y.key === "Escape" ? (y.preventDefault(), y.stopPropagation(), C()) : Xo(y) && (y.preventDefault(), y.stopPropagation(), ie(f) && A());
              },
              onKeyDown: (y) => {
                Zo(y), (y.key === "Enter" || y.key === " ") && y.stopPropagation();
              },
              onClick: (y) => {
                y.stopPropagation();
              },
              children: /* @__PURE__ */ a(
                Da,
                {
                  className: b(
                    // Don't render blockquote on the first child. All comments are wrapped in blockquote
                    // that has text-align corresponding to LTR or RTL, so the blockquote is important.
                    // But we don't want it to look like there's a blockquote there. Target the
                    // lowest-level Lexical editor element by attribute so Tailwind can apply styles to
                    // the blockquote directly inside the editor.
                    'tw:[&_[data-lexical-editor="true"]>blockquote]:mt-0 tw:[&_[data-lexical-editor="true"]>blockquote]:border-s-0 tw:[&_[data-lexical-editor="true"]>blockquote]:ps-0 tw:[&_[data-lexical-editor="true"]>blockquote]:font-normal tw:[&_[data-lexical-editor="true"]>blockquote]:not-italic tw:[&_[data-lexical-editor="true"]>blockquote]:text-foreground'
                  ),
                  editorSerializedState: f,
                  onSerializedChange: (y) => T(y),
                  actions: /* @__PURE__ */ u(ht, { children: [
                    /* @__PURE__ */ a("div", { className: "tw:flex-1" }),
                    /* @__PURE__ */ u(kt, { children: [
                      /* @__PURE__ */ a(_t, { asChild: !0, children: /* @__PURE__ */ a(
                        tt,
                        {
                          size: "icon-sm",
                          onClick: C,
                          variant: "outline",
                          className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                          "aria-label": we(
                            "%comment_aria_cancel_edit%",
                            r,
                            "Cancel edit"
                          ),
                          children: /* @__PURE__ */ a(rc, {})
                        }
                      ) }),
                      /* @__PURE__ */ a(Nt, { children: we(
                        "%comment_aria_cancel_edit%",
                        r,
                        "Cancel edit"
                      ) })
                    ] }),
                    /* @__PURE__ */ u(kt, { children: [
                      /* @__PURE__ */ a(_t, { asChild: !0, children: /* @__PURE__ */ a(
                        Yr,
                        {
                          isDisabled: ot,
                          disabledExplanation: we(
                            "%comment_aria_save_edit%",
                            r,
                            "Save edit"
                          ),
                          className: "tw:inline-flex",
                          children: /* @__PURE__ */ a(
                            tt,
                            {
                              size: "icon-sm",
                              onClick: A,
                              className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                              disabled: ot,
                              "aria-label": we(
                                "%comment_aria_save_edit%",
                                r,
                                "Save edit"
                              ),
                              children: /* @__PURE__ */ a(ni, {})
                            }
                          )
                        }
                      ) }),
                      /* @__PURE__ */ a(Nt, { children: we(
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
          !x && /* @__PURE__ */ u(ht, { children: [
            t.status === "Resolved" && !G && /* @__PURE__ */ a("div", { className: "tw:text-sm tw:italic", children: r["%comment_status_resolved%"] }),
            t.status === "Todo" && e && /* @__PURE__ */ a("div", { className: "tw:text-sm tw:italic", children: r["%comment_status_todo%"] }),
            G ? (
              // A platform-created conflict resolution comment carries an empty body — PT9 renders
              // its banner UI-side from conflictResolutionAction, it never stores text. So render the
              // localized, neutral outcome line here instead of the (empty) contents, styled like the
              // italic status lines above. These are the same neutral keys ConflictNoteCard's Result
              // region used to render inline. Only when the body IS empty: a resolution synced from
              // PT9 can carry the resolver's typed note alongside the action, and PT9 shows that text,
              // so the body branch below keeps it visible rather than discarding it for this banner.
              /* @__PURE__ */ a("div", { className: "tw:text-sm tw:italic", children: ss(t.conflictResolutionAction) === "merged" ? r["%conflict_note_outcome_combined%"] ?? "Combined both changes." : r["%conflict_note_outcome_used_other%"] ?? "Used the other change instead of the current text." })
            ) : /* @__PURE__ */ a(
              "div",
              {
                className: b(
                  // Shared note-body prose/blockquote treatment (also used by conflict-diff's
                  // DIFF_HTML_CLASSES). Layer this comment item's own extras on top: items-start +
                  // gap-2 for layout, and line-clamp while the thread is collapsed.
                  ns,
                  "tw:items-start tw:gap-2",
                  {
                    "tw:line-clamp-3": !o
                  }
                ),
                ...w,
                dangerouslySetInnerHTML: { __html: R }
              }
            )
          ] })
        ] }),
        W && /* @__PURE__ */ u(Be, { children: [
          /* @__PURE__ */ a(Se, { asChild: !0, children: /* @__PURE__ */ a(tt, { variant: "ghost", size: "icon", children: /* @__PURE__ */ a(ac, {}) }) }),
          /* @__PURE__ */ a(je, { align: "end", children: W })
        ] })
      ]
    }
  );
}
function cs({
  show: t,
  disabled: e = !1,
  onClick: r,
  ariaLabel: o
}) {
  if (t)
    return /* @__PURE__ */ a(
      tt,
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
        children: /* @__PURE__ */ a(Je, { className: "tw:h-4 tw:w-4" })
      }
    );
}
const Xw = {
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
}, ls = wi(function({
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
  handleDeleteComment: v,
  handleReadStatusChange: x,
  assignableUsers: g,
  canUserAddCommentToThread: T,
  canUserAssignThreadCallback: k,
  canUserResolveThreadCallback: E,
  canUserEditOrDeleteCommentCallback: C,
  isRead: A = !1,
  autoReadDelay: j = 5,
  onVerseRefClick: U,
  initialAssignedUser: z,
  activeComments: R,
  rootContentSlot: O,
  resolveActionSlot: G,
  spaceRootContentFromReplies: W = !1,
  draft: ot,
  onDraftChange: y
}) {
  var Ke;
  const et = Ba(), [M, Q] = N({}), Y = ot ?? M, L = Y.editorState ?? Xw, X = Y.assignedUser, ut = y !== void 0, mt = V(Y);
  mt.current = Y;
  const K = $(
    (S) => {
      const nt = { ...mt.current, ...S };
      mt.current = nt, ut || Q(nt), y == null || y(l, $n(nt) ? void 0 : nt);
    },
    [ut, y, l]
  ), gt = $(
    (S, nt) => {
      const st = { ...Y.commentEdits };
      nt === void 0 ? delete st[S] : st[S] = nt, K({
        commentEdits: Br(st) ? st : void 0
      });
    },
    [Y.commentEdits, K]
  ), [vt, lt] = N(), Dt = n, [xt, Ot] = N(!1), [xe, Qt] = N(!1), [$t, Ct] = N(!1), [Ut, pe] = N(!1), [he, se] = N(!1), [bt, oe] = N(A), [ce, ye] = N(!1), te = V(void 0), [ne, ke] = N(/* @__PURE__ */ new Map());
  Z(() => {
    let S = !0;
    return (async () => {
      const st = E ? await E(l) : !1;
      S && se(st);
    })(), () => {
      S = !1;
    };
  }, [l, E]), Z(() => {
    let S = !0;
    if (!n) {
      pe(!1), ke(/* @__PURE__ */ new Map());
      return;
    }
    return (async () => {
      const st = k ? await k(l) : !1;
      S && pe(st);
    })(), () => {
      S = !1;
    };
  }, [n, l, k]);
  const Tt = V("idle");
  Z(() => {
    if (!n) {
      Tt.current !== "idle" && (K({ assignedUser: void 0 }), lt(void 0), Tt.current = "idle");
      return;
    }
    Tt.current === "idle" && (Tt.current = "pending"), Ut ? Tt.current === "pending" && z !== void 0 && // Skip pre-population if the thread is already assigned to this user — doing so
    // would show "Assigning to: Alice" and enable the submit button for a no-op call.
    z !== i && (K({ assignedUser: z }), Tt.current = "auto-populated") : Tt.current === "auto-populated" && (K({ assignedUser: void 0 }), Tt.current = "pending");
  }, [n, z, Ut, i, K]);
  const D = V(vt);
  D.current = vt;
  const H = V(y);
  H.current = y;
  const _ = V(l);
  _.current = l, Z(() => () => {
    var nt;
    const { current: S } = mt;
    S.assignedUser !== void 0 && S.assignedUser === D.current && S.editorState === void 0 && !Br(S.commentEdits) && ((nt = H.current) == null || nt.call(H, _.current, void 0));
  }, []);
  const I = P(
    () => R ?? r.filter((S) => !S.deleted),
    [R, r]
  ), J = P(() => {
    const { commentEdits: S } = Y;
    if (!S) return S;
    const nt = new Set(I.map((Ht) => Ht.id)), st = Object.fromEntries(
      Object.entries(S).filter(([Ht]) => nt.has(Ht))
    );
    return Br(st) ? st : void 0;
  }, [Y, I]), B = xe || Br(J);
  Z(() => {
    let S = !0;
    if (!n || !C) {
      ke(/* @__PURE__ */ new Map());
      return;
    }
    return (async () => {
      const st = /* @__PURE__ */ new Map();
      await Promise.all(
        I.map(async (Ht) => {
          const zr = await C(Ht.id);
          S && st.set(Ht.id, zr);
        })
      ), S && ke(st);
    })(), () => {
      S = !1;
    };
  }, [n, I, C]);
  const at = P(() => I[0], [I]), dt = V(null), ct = V(void 0), pt = $(() => {
    var S;
    (S = ct.current) == null || S.call(ct), K({ editorState: void 0 });
  }, [K]), Et = $(
    (S) => {
      K({ editorState: ie(S) ? S : void 0 });
    },
    [K]
  ), Rt = $(() => {
    const S = !bt;
    oe(S), ye(!S), x == null || x(l, S);
  }, [bt, x, l]);
  Z(() => {
    Ot(!1);
  }, [n]), Z(() => {
    if (n && !bt && !ce && $n(Y)) {
      const S = setTimeout(() => {
        oe(!0), x == null || x(l, !0);
      }, j * 1e3);
      return te.current = S, () => clearTimeout(S);
    }
    te.current && (clearTimeout(te.current), te.current = void 0);
  }, [
    n,
    bt,
    ce,
    j,
    l,
    x,
    Y
  ]);
  const yt = P(
    () => ({
      singleReply: o["%comment_thread_single_reply%"],
      multipleReplies: o["%comment_thread_multiple_replies%"]
    }),
    [o]
  ), ge = P(() => {
    if (i === void 0)
      return;
    if (i === "")
      return o["%comment_assign_unassigned%"] ?? "Unassigned";
    const S = ba(i, o);
    return Ye(o["%comment_assigned_to%"], {
      assignedUser: S
    });
  }, [i, o]), Kt = P(() => I.slice(1), [I]), Vt = P(() => Kt.length ?? 0, [Kt.length]), Ue = P(() => Vt > 0, [Vt]), _e = P(() => {
    if (xt || Vt <= 2)
      return Kt;
    const S = new Set(Kt.slice(-2).map((nt) => nt.id));
    return Kt.filter(
      (nt) => {
        var st;
        return S.has(nt.id) || ((st = Y.commentEdits) == null ? void 0 : st[nt.id]) !== void 0;
      }
    );
  }, [Kt, Vt, xt, Y.commentEdits]), Ne = P(() => xt || Vt <= 2 ? 0 : Vt - _e.length, [Vt, xt, _e.length]), rr = P(
    () => Vt === 1 ? yt.singleReply : Ye(yt.multipleReplies, { count: Vt }),
    [Vt, yt]
  ), ar = P(
    () => Ne === 1 ? yt.singleReply : Ye(yt.multipleReplies, { count: Ne }),
    [Ne, yt]
  );
  Z(() => {
    !n && B && Ue && Qt(!1);
  }, [n, B, Ue]);
  const ze = $(
    async (S) => {
      S && S.stopPropagation();
      const nt = ie(L) ? Oa(L) : void 0;
      if (X !== void 0) {
        await h({
          threadId: l,
          contents: nt,
          assignedUser: X
        }) && (lt(X), nt && pt());
        return;
      }
      nt && await h({ threadId: l, contents: nt }) && pt();
    },
    [
      pt,
      L,
      h,
      X,
      l
    ]
  ), Ce = $(
    async (S) => {
      const nt = ie(L) ? Oa(L) : void 0, st = S.status ? S.assignedUser : X ?? S.assignedUser, Ht = await h({
        ...S,
        contents: nt,
        assignedUser: st
      });
      return Ht && (st !== void 0 && lt(st), nt && pt()), Ht;
    },
    [pt, L, h, X]
  );
  if (I.length === 0) return;
  const hr = !Ut || !g || g.length === 0 || !g.includes(c), Mr = !ie(L) && (X === void 0 || X === vt), Ir = /* @__PURE__ */ a(
    Vn,
    {
      comment: at,
      localizedStrings: o,
      isThreadExpanded: n,
      threadStatus: p,
      handleAddCommentToThread: Ce,
      handleUpdateComment: f,
      handleDeleteComment: v,
      onEditingChange: Qt,
      canEditOrDelete: (!B && ne.get(at.id)) ?? !1,
      canUserResolveThread: he,
      draftEditorState: (Ke = Y.commentEdits) == null ? void 0 : Ke[at.id],
      onDraftEditorStateChange: (S) => gt(at.id, S)
    }
  );
  return /* @__PURE__ */ a(
    Gw,
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
          "tw:bg-card": p !== "Resolved" && bt,
          "tw:bg-muted": p === "Resolved",
          "tw:bg-accent": !bt && p !== "Resolved"
        }
      ),
      onClick: () => {
        d(l);
      },
      tabIndex: -1,
      children: /* @__PURE__ */ u(Ww, { className: "tw:flex tw:flex-col tw:gap-2 tw:p-0", children: [
        /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:content-center tw:items-start tw:gap-2", children: [
          /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:gap-2", children: [
            ge && /* @__PURE__ */ a(Hr, { className: "tw:rounded-sm tw:bg-input tw:text-sm tw:font-normal tw:text-primary tw:hover:bg-input", children: ge }),
            /* @__PURE__ */ a(
              tt,
              {
                variant: "ghost",
                size: "icon",
                onClick: (S) => {
                  S.stopPropagation(), Rt();
                },
                className: "tw:text-muted-foreground tw:transition tw:hover:text-foreground",
                "aria-label": bt ? o["%comment_aria_mark_as_unread%"] ?? "Mark as unread" : o["%comment_aria_mark_as_read%"] ?? "Mark as read",
                children: bt ? /* @__PURE__ */ a(oc, {}) : /* @__PURE__ */ a(nc, {})
              }
            ),
            G === void 0 ? (
              // Generic status-resolve check (used by non-conflict threads and, via ConflictThread
              // leaving this slot undefined, by non-verseText conflicts, which resolve through a
              // plain status change). ConflictThread overrides this slot for verseText conflicts.
              /* @__PURE__ */ a(
                cs,
                {
                  show: he && p !== "Resolved",
                  onClick: () => Ce({ threadId: l, status: "Resolved" }),
                  ariaLabel: o["%comment_aria_resolve_thread%"] ?? "Resolve thread"
                }
              )
            ) : G
          ] }),
          /* @__PURE__ */ a("div", { className: "tw:flex tw:max-w-full tw:flex-wrap tw:items-baseline tw:gap-2", children: /* @__PURE__ */ u(
            "p",
            {
              ref: dt,
              className: b(
                "tw:flex-1 tw:overflow-hidden tw:text-ellipsis tw:text-sm tw:font-normal tw:text-muted-foreground",
                {
                  "tw:overflow-visible tw:text-clip tw:whitespace-normal tw:break-words": Dt
                },
                { "tw:whitespace-nowrap": !Dt }
              ),
              children: [
                s && U ? /* @__PURE__ */ a(
                  tt,
                  {
                    variant: "ghost",
                    size: "sm",
                    className: "tw:h-auto tw:px-1 tw:py-0 tw:text-sm tw:font-normal tw:text-muted-foreground",
                    onClick: (S) => {
                      S.stopPropagation(), U(w);
                    },
                    children: s
                  }
                ) : s,
                /* @__PURE__ */ u(
                  "span",
                  {
                    className: e,
                    ...et,
                    children: [
                      at.contextBefore,
                      /* @__PURE__ */ a("span", { className: "tw:font-bold", children: at.selectedText }),
                      at.contextAfter
                    ]
                  }
                )
              ]
            }
          ) }),
          O ?? Ir
        ] }),
        /* @__PURE__ */ u(ht, { children: [
          Ue && !n && /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:gap-5", children: [
            /* @__PURE__ */ a("div", { className: "tw:w-8", children: /* @__PURE__ */ a(qr, {}) }),
            /* @__PURE__ */ a("p", { className: "tw:text-sm tw:text-muted-foreground", children: rr })
          ] }),
          !n && ie(L) && /* @__PURE__ */ a(
            Da,
            {
              editorSerializedState: L,
              onSerializedChange: Et,
              placeholder: o["%comment_replyOrAssign%"]
            }
          ),
          n && /* @__PURE__ */ u(ht, { children: [
            W && _e.length > 0 && /* @__PURE__ */ a("div", { className: "tw:h-2", "data-slot": "root-content-reply-gap", "aria-hidden": "true" }),
            Ne > 0 && /* @__PURE__ */ u(
              "div",
              {
                className: "tw:flex tw:cursor-pointer tw:items-center tw:gap-5 tw:py-2",
                onClick: (S) => {
                  S.stopPropagation(), Ot(!0);
                },
                role: "button",
                tabIndex: 0,
                onKeyDown: (S) => {
                  (S.key === "Enter" || S.key === " ") && (S.preventDefault(), S.stopPropagation(), Ot(!0));
                },
                children: [
                  /* @__PURE__ */ a("div", { className: "tw:w-8", children: /* @__PURE__ */ a(qr, {}) }),
                  /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:gap-2", children: [
                    /* @__PURE__ */ a("p", { className: "tw:text-sm tw:text-muted-foreground", children: ar }),
                    xt ? /* @__PURE__ */ a(ri, {}) : /* @__PURE__ */ a(sr, {})
                  ] })
                ]
              }
            ),
            _e.map((S) => {
              var nt;
              return /* @__PURE__ */ a("div", { children: /* @__PURE__ */ a(
                Vn,
                {
                  comment: S,
                  localizedStrings: o,
                  isReply: !0,
                  isThreadExpanded: n,
                  handleUpdateComment: f,
                  handleDeleteComment: v,
                  onEditingChange: Qt,
                  canEditOrDelete: (!B && ne.get(S.id)) ?? !1,
                  draftEditorState: (nt = Y.commentEdits) == null ? void 0 : nt[S.id],
                  onDraftEditorStateChange: (st) => gt(S.id, st)
                }
              ) }, S.id);
            }),
            T !== !1 && (!B || ie(L)) && /* @__PURE__ */ a(
              "div",
              {
                role: "textbox",
                tabIndex: -1,
                className: "tw:w-full tw:space-y-2",
                onClick: (S) => S.stopPropagation(),
                onKeyDownCapture: (S) => {
                  Xo(S) && (S.preventDefault(), S.stopPropagation(), (ie(L) || X !== void 0 && X !== vt) && ze());
                },
                onKeyDown: (S) => {
                  Zo(S), (S.key === "Enter" || S.key === " ") && S.stopPropagation();
                },
                children: /* @__PURE__ */ a(
                  Da,
                  {
                    editorSerializedState: L,
                    onSerializedChange: Et,
                    placeholder: p === "Resolved" ? o["%comment_reopenResolved%"] : o["%comment_replyOrAssign%"],
                    autoFocus: !0,
                    onClear: (S) => {
                      ct.current = S;
                    },
                    actions: /* @__PURE__ */ u(ht, { children: [
                      X !== void 0 && (ie(L) || X !== vt) ? /* @__PURE__ */ a("span", { className: "tw:flex-1 tw:text-sm tw:text-muted-foreground", children: Ye(
                        we(
                          "%comment_assigning_to%",
                          o,
                          "Assigning to: {assignedUser}"
                        ),
                        {
                          assignedUser: ba(
                            X,
                            o
                          )
                        }
                      ) }) : /* @__PURE__ */ a("div", { className: "tw:flex-1" }),
                      /* @__PURE__ */ u(lr, { open: $t, onOpenChange: Ct, children: [
                        /* @__PURE__ */ u(kt, { children: [
                          /* @__PURE__ */ a(_t, { asChild: !0, children: /* @__PURE__ */ a(
                            Yr,
                            {
                              isDisabled: hr,
                              disabledExplanation: we(
                                "%comment_aria_assign_user%",
                                o,
                                "Assign user"
                              ),
                              children: /* @__PURE__ */ a(Rr, { asChild: !0, children: /* @__PURE__ */ a(
                                tt,
                                {
                                  size: "icon-sm",
                                  variant: "outline",
                                  className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                                  disabled: hr,
                                  "aria-label": we(
                                    "%comment_aria_assign_user%",
                                    o,
                                    "Assign user"
                                  ),
                                  children: /* @__PURE__ */ a(oi, {})
                                }
                              ) })
                            }
                          ) }),
                          /* @__PURE__ */ a(Nt, { children: we(
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
                            onKeyDown: (S) => {
                              S.key === "Escape" && (S.stopPropagation(), Ct(!1));
                            },
                            children: /* @__PURE__ */ a(wr, { children: /* @__PURE__ */ a(ur, { children: g == null ? void 0 : g.map((S) => /* @__PURE__ */ a(
                              tr,
                              {
                                onSelect: () => {
                                  K({
                                    assignedUser: S !== i ? S : void 0
                                  }), Tt.current = "user-selected", lt(void 0), Ct(!1);
                                },
                                className: "tw:flex tw:items-center",
                                children: /* @__PURE__ */ a("span", { children: ba(S, o) })
                              },
                              S || "unassigned"
                            )) }) })
                          }
                        )
                      ] }),
                      /* @__PURE__ */ u(kt, { children: [
                        /* @__PURE__ */ a(_t, { asChild: !0, children: /* @__PURE__ */ a(
                          Yr,
                          {
                            isDisabled: Mr,
                            disabledExplanation: we(
                              "%comment_aria_submit_comment%",
                              o,
                              "Submit comment"
                            ),
                            className: "tw:inline-flex",
                            children: /* @__PURE__ */ a(
                              tt,
                              {
                                size: "icon-sm",
                                onClick: ze,
                                className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                                disabled: Mr,
                                "aria-label": we(
                                  "%comment_aria_submit_comment%",
                                  o,
                                  "Submit comment"
                                ),
                                children: /* @__PURE__ */ a(ni, {})
                              }
                            )
                          }
                        ) }),
                        /* @__PURE__ */ a(Nt, { children: we(
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
}), Jw = b(
  ns,
  // `prose` gives block children (the top-level blockquote wrapper, and any p — whether nested
  // inside that blockquote or, in the non-verseText fallback, a direct child) vertical margins that
  // make these already-compact cards feel bulky. Zero both so the diff sits flush inside the card.
  "tw:[&>blockquote]:my-0 tw:[&_p]:my-0",
  "tw:[&_u]:font-semibold tw:[&_u]:text-success-foreground tw:[&_u]:no-underline",
  "tw:[&_s]:text-destructive tw:[&_s]:line-through"
), Qw = (t) => t.replace(/(\s+)(<\/[us]>)/g, "$2$1"), xa = (t) => Qw(Vo(t));
function ya({ html: t }) {
  const e = Ba();
  return /* @__PURE__ */ a(
    "div",
    {
      className: Jw,
      ...e,
      dangerouslySetInnerHTML: { __html: t }
    }
  );
}
function tu({
  comment: t,
  localizedStrings: e,
  availableActions: r = "acceptOrReject",
  resolvedResolution: o,
  onResolve: n,
  isResolving: s = !1
}) {
  const [i, c] = N("accept"), d = Ea(), l = Ea(), w = r === "loading", p = r === "accept", h = r === "none", f = r === "acceptRejectOrMerge", v = p ? "accept" : i, x = P(
    () => xa(t.rejectedText ?? ""),
    [t.rejectedText]
  ), g = P(
    () => xa(t.acceptedText ?? ""),
    [t.acceptedText]
  ), T = P(
    () => xa(t.mergedText ?? ""),
    [t.mergedText]
  ), k = P(() => Vo(t.contents), [t.contents]);
  if (!is(t))
    return /* @__PURE__ */ a(ya, { html: k });
  const E = (M) => {
    c(M === "reject" || M === "merge" ? M : "accept");
  }, C = e["%conflict_note_stale_notice%"] ?? "The verse was edited after this conflict was recorded, so 'Use the other change' is no longer available. Keep the current text to resolve.", A = f ? [
    {
      value: "merge",
      label: e["%conflict_note_option_combine%"] ?? "Combine both changes",
      html: T
    }
  ] : [], j = [
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
  ], U = v === "accept", z = s || U;
  let R;
  U ? R = e["%conflict_note_save_disabled_tooltip%"] ?? "Keeping the current text makes no change — resolve the thread with the ✓ to keep it." : s || (R = e["%conflict_note_save_warning%"] ?? "This can't be undone.");
  const O = e["%conflict_note_no_result%"] ?? "No result preview available.", G = /* @__PURE__ */ a("p", { className: "tw:text-muted-foreground", children: O }), W = (M) => M ? /* @__PURE__ */ a("p", { className: "tw:whitespace-pre-wrap tw:text-foreground", children: M }) : G, ot = () => {
    const M = o ?? "accept";
    return M === "merged" ? t.mergedText ? /* @__PURE__ */ a(ya, { html: T }) : G : W(M === "reject" ? t.rejectedResultText : t.resultText);
  }, y = (M) => p && M.value === "reject", et = (M) => {
    const Q = v === M.value, Y = `${l}-${M.value}`, L = y(M);
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
          htmlFor: Y,
          "data-slot": "conflict-resolution-option",
          "data-value": M.value,
          className: b(
            "tw:flex tw:flex-col tw:gap-1 tw:rounded-md tw:border tw:p-2",
            "tw:focus-within:ring-2 tw:focus-within:ring-ring tw:focus-within:ring-offset-1",
            Q ? "tw:border-border tw:bg-accent/50" : "tw:border-transparent tw:hover:bg-accent/30",
            L ? "tw:cursor-not-allowed tw:opacity-60" : "tw:cursor-pointer"
          ),
          children: [
            /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:gap-2", children: [
              /* @__PURE__ */ a(
                _a,
                {
                  id: Y,
                  value: M.value,
                  "aria-label": M.label,
                  disabled: L,
                  "aria-describedby": L ? d : void 0
                }
              ),
              /* @__PURE__ */ a("span", { "aria-hidden": !0, className: "tw:font-medium", children: M.label })
            ] }),
            L && // aria-describedby links the option to this visually-hidden notice so assistive tech
            // announces why the choice is read-only.
            /* @__PURE__ */ a("span", { id: d, className: "tw:sr-only", children: C }),
            /* @__PURE__ */ a(ya, { html: M.html })
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
        /* @__PURE__ */ a(xr, { className: "tw:h-8 tw:w-full" }),
        /* @__PURE__ */ a(xr, { className: "tw:h-8 tw:w-full" }),
        /* @__PURE__ */ a(xr, { className: "tw:h-8 tw:w-24" })
      ] }),
      !w && h && ot(),
      !w && !h && /* @__PURE__ */ u(ht, { children: [
        /* @__PURE__ */ a("p", { children: e["%conflict_note_choose_prompt%"] ?? "Select which change to keep:" }),
        /* @__PURE__ */ a(
          Oo,
          {
            value: v,
            onValueChange: E,
            disabled: s,
            "aria-label": e["%conflict_note_choose_aria_label%"] ?? "Choose resolution",
            children: j.map((M) => y(M) ? /* @__PURE__ */ a(zt, { delayDuration: 0, children: /* @__PURE__ */ u(kt, { children: [
              /* @__PURE__ */ a(_t, { asChild: !0, children: et(M) }),
              /* @__PURE__ */ a(Nt, { children: C })
            ] }) }, M.value) : et(M))
          }
        ),
        /* @__PURE__ */ a(zt, { delayDuration: 0, children: /* @__PURE__ */ u(kt, { children: [
          /* @__PURE__ */ a(_t, { asChild: !0, children: /* @__PURE__ */ a(
            Yr,
            {
              isDisabled: z && R !== void 0,
              disabledExplanation: R,
              className: "tw:inline-flex tw:self-start",
              children: /* @__PURE__ */ a(
                tt,
                {
                  size: "sm",
                  disabled: z,
                  onClick: () => n == null ? void 0 : n(v),
                  children: e["%conflict_note_save_and_resolve%"] ?? "Save and resolve"
                }
              )
            }
          ) }),
          R && /* @__PURE__ */ a(Nt, { children: R })
        ] }) })
      ] })
    ] })
  );
}
const eu = {
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
function ru({
  comment: t,
  localizedStrings: e,
  resolvedResolution: r
}) {
  const o = P(
    () => xa(t.rejectedText ?? ""),
    [t.rejectedText]
  );
  if (r) {
    const { key: s, fallback: i } = eu[r];
    return /* @__PURE__ */ a("p", { className: "tw:text-sm tw:font-normal tw:text-muted-foreground", children: e[s] ?? i });
  }
  const n = e["%conflict_note_summary_unresolved%"] ?? "Conflicting edits. Choose which change to keep.";
  return /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:gap-1", children: [
    /* @__PURE__ */ a("p", { className: "tw:text-sm tw:font-normal tw:text-muted-foreground", children: n }),
    o ? /* @__PURE__ */ a(ya, { html: o }) : void 0
  ] });
}
function au(t) {
  return t === "reject" ? "reject" : t === "merge" ? "merged" : "accept";
}
function ou({
  threadId: t,
  threadStatus: e,
  isSelected: r,
  activeComments: o,
  conflictResolution: n
}) {
  const [s, i] = N("loading"), [c, d] = N(!1), [l, w] = N(), p = n == null ? void 0 : n.getOptions, h = n == null ? void 0 : n.resolve;
  Z(() => {
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
  const f = V(!1), v = $(
    async (k) => {
      if (!(!h || f.current)) {
        f.current = !0, d(!0);
        try {
          await h(t, k) && (w(au(k)), i("none"));
        } catch {
        } finally {
          f.current = !1, d(!1);
        }
      }
    },
    [h, t]
  ), g = P(() => {
    if (e === "Resolved") {
      for (let k = o.length - 1; k >= 0; k -= 1)
        if (o[k].status === "Resolved")
          return ss(o[k].conflictResolutionAction);
      return "accept";
    }
  }, [e, o]) ?? l;
  return { conflictOptions: s, isResolving: c, resolve: v, resolvedResolution: g, showResolveCheck: s !== "loading" && s !== "none" };
}
const nu = wi(function(e) {
  const {
    comments: r,
    localizedStrings: o,
    isSelected: n = !1,
    threadId: s,
    threadStatus: i,
    conflictResolution: c
  } = e, d = P(() => r.filter((k) => !k.deleted), [r]), l = P(
    () => d.find((k) => k.conflictType) ?? d[0],
    [d]
  ), { conflictOptions: w, isResolving: p, resolve: h, resolvedResolution: f, showResolveCheck: v } = ou({
    threadId: s,
    threadStatus: i,
    isSelected: n,
    activeComments: d,
    conflictResolution: c
  }), x = is(l);
  let g;
  x && l && (g = n ? /* @__PURE__ */ a(
    tu,
    {
      comment: l,
      localizedStrings: o,
      availableActions: w,
      resolvedResolution: f,
      onResolve: h,
      isResolving: p
    }
  ) : /* @__PURE__ */ a(
    ru,
    {
      comment: l,
      localizedStrings: o,
      resolvedResolution: f
    }
  ));
  let T;
  return x && (T = /* @__PURE__ */ a(
    cs,
    {
      show: v,
      disabled: p,
      onClick: () => h("accept"),
      ariaLabel: o["%comment_aria_resolve_thread%"] ?? "Resolve thread"
    }
  )), /* @__PURE__ */ a(
    ls,
    {
      ...e,
      activeComments: d,
      rootContentSlot: g,
      resolveActionSlot: T,
      spaceRootContentFromReplies: x && n
    }
  );
});
function Ih({
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
  selectedThreadId: v,
  onSelectedThreadChange: x,
  onVerseRefClick: g,
  conflictResolution: T,
  drafts: k,
  onDraftChange: E
}) {
  const [C, A] = N(/* @__PURE__ */ new Set()), [j, U] = N(), [z, R] = N(), O = $(
    async (L) => {
      const X = await s(L);
      return X !== void 0 && L.assignedUser !== void 0 && L.assignedUser !== "" && R(L.assignedUser), X;
    },
    [s]
  );
  Z(() => {
    v && (A((L) => new Set(L).add(v)), U(v));
  }, [v]);
  const G = r.filter(
    (L) => L.comments.some((X) => !X.deleted)
  ), W = G.map((L) => ({ id: L.id })), ot = $(
    (L) => {
      A((X) => new Set(X).add(L.id)), U(L.id), x == null || x(L.id);
    },
    [x]
  ), y = $(
    (L) => {
      const X = C.has(L);
      A((ut) => {
        const mt = new Set(ut);
        return mt.has(L) ? mt.delete(L) : mt.add(L), mt;
      }), U(L), x == null || x(X ? void 0 : L);
    },
    [C, x]
  ), { listboxRef: et, activeId: M, handleKeyDown: Q } = Ds({
    options: W,
    onOptionSelect: ot
  }), Y = $(
    (L) => {
      L.key === "Escape" ? (j && C.has(j) && (A((X) => {
        const ut = new Set(X);
        return ut.delete(j), ut;
      }), U(void 0), x == null || x(void 0)), L.preventDefault(), L.stopPropagation()) : Q(L);
    },
    [j, C, Q, x]
  );
  return /* @__PURE__ */ a(
    "div",
    {
      id: qw,
      role: "listbox",
      tabIndex: 0,
      ref: et,
      "aria-activedescendant": M ?? void 0,
      "aria-label": "Comments",
      className: b(
        "tw:flex tw:w-full tw:flex-col tw:outline-hidden tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-1 tw:focus:ring-offset-background",
        t
      ),
      onKeyDown: Y,
      children: G.map((L) => {
        const X = {
          classNameForVerseText: e,
          comments: L.comments,
          localizedStrings: n,
          verseRef: L.verseRef,
          handleSelectThread: y,
          threadId: L.id,
          thread: L,
          isRead: L.isRead,
          isSelected: C.has(L.id),
          currentUser: o,
          assignedUser: L.assignedUser,
          threadStatus: L.status,
          handleAddCommentToThread: O,
          handleUpdateComment: i,
          handleDeleteComment: c,
          handleReadStatusChange: d,
          assignableUsers: l,
          canUserAddCommentToThread: w,
          canUserAssignThreadCallback: p,
          canUserResolveThreadCallback: h,
          canUserEditOrDeleteCommentCallback: f,
          onVerseRefClick: g,
          initialAssignedUser: z,
          draft: k == null ? void 0 : k[L.id],
          onDraftChange: E
        };
        return /* @__PURE__ */ a(
          "div",
          {
            className: b("tw:border-b tw:border-border tw:last:border-b-0", {
              "tw:opacity-60": L.status === "Resolved"
            }),
            children: L.type === "Conflict" ? /* @__PURE__ */ a(nu, { ...X, conflictResolution: T }) : /* @__PURE__ */ a(ls, { ...X })
          },
          L.id
        );
      })
    }
  );
}
const iu = Lo(
  function({ area: e, as: r = "div", ...o }, n) {
    const s = { [Qi]: e ?? "" };
    return go(r, { ...o, ...s, ref: n });
  }
);
iu.displayName = "ContentZoomRoot";
function su({ table: t }) {
  return /* @__PURE__ */ u(Be, { children: [
    /* @__PURE__ */ a(Se, { asChild: !0, children: /* @__PURE__ */ u(tt, { variant: "outline", size: "sm", className: "tw:ml-auto tw:hidden tw:h-8 tw:lg:flex", children: [
      /* @__PURE__ */ a(ic, { className: "tw:mr-2 tw:h-4 tw:w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ u(je, { align: "end", className: "tw:w-[150px]", children: [
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
function Cr({ ...t }) {
  return /* @__PURE__ */ a(Jt.Root, { "data-slot": "select", ...t });
}
function cu({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    Jt.Group,
    {
      "data-slot": "select-group",
      className: b("tw:scroll-my-1 tw:p-1", t),
      ...e
    }
  );
}
function Er({ ...t }) {
  return /* @__PURE__ */ a(Jt.Value, { "data-slot": "select-value", ...t });
}
function Tr({ className: t, size: e = "default", children: r, ...o }) {
  const n = Oe();
  return /* @__PURE__ */ u(
    Jt.Trigger,
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
        /* @__PURE__ */ a(Jt.Icon, { asChild: !0, children: /* @__PURE__ */ a(ui, { className: "tw:pointer-events-none tw:size-4 tw:text-muted-foreground" }) })
      ]
    }
  );
}
function Sr({
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
  const i = Oe();
  return /* @__PURE__ */ a(Jt.Portal, { children: /* @__PURE__ */ u(
    Jt.Content,
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
        /* @__PURE__ */ a(lu, {}),
        /* @__PURE__ */ a(
          Jt.Viewport,
          {
            "data-position": r,
            className: b(
              "tw:data-[position=popper]:h-(--radix-select-trigger-height) tw:data-[position=popper]:w-full tw:data-[position=popper]:min-w-(--radix-select-trigger-width)",
              r === "popper" && "tw:"
            ),
            children: /* @__PURE__ */ a("div", { dir: i, children: e })
          }
        ),
        /* @__PURE__ */ a(du, {})
      ]
    }
  ) });
}
function zh({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    Jt.Label,
    {
      "data-slot": "select-label",
      className: b("pr-twp tw:px-1.5 tw:py-1 tw:text-xs tw:text-muted-foreground", t),
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
    Jt.Item,
    {
      "data-slot": "select-item",
      className: b(
        "pr-twp tw:relative tw:flex tw:w-full tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:*:[span]:last:flex tw:*:[span]:last:items-center tw:*:[span]:last:gap-2",
        t
      ),
      ...r,
      children: [
        /* @__PURE__ */ a("span", { className: "tw:pointer-events-none tw:absolute tw:end-2 tw:flex tw:size-4 tw:items-center tw:justify-center", children: /* @__PURE__ */ a(Jt.ItemIndicator, { children: /* @__PURE__ */ a($a, { className: "tw:pointer-events-none" }) }) }),
        /* @__PURE__ */ a(Jt.ItemText, { children: e })
      ]
    }
  );
}
function Ph({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    Jt.Separator,
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
function lu({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    Jt.ScrollUpButton,
    {
      "data-slot": "select-scroll-up-button",
      className: b(
        "pr-twp tw:z-10 tw:flex tw:cursor-default tw:items-center tw:justify-center tw:bg-popover tw:py-1 tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      ...e,
      children: /* @__PURE__ */ a(qc, {})
    }
  );
}
function du({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    Jt.ScrollDownButton,
    {
      "data-slot": "select-scroll-down-button",
      className: b(
        "pr-twp tw:z-10 tw:flex tw:cursor-default tw:items-center tw:justify-center tw:bg-popover tw:py-1 tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      ...e,
      children: /* @__PURE__ */ a(Hc, {})
    }
  );
}
function wu({ table: t }) {
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
        Cr,
        {
          value: `${t.getState().pagination.pageSize}`,
          onValueChange: (e) => {
            t.setPageSize(Number(e));
          },
          children: [
            /* @__PURE__ */ a(Tr, { className: "tw:h-8 tw:w-[70px]", children: /* @__PURE__ */ a(Er, { placeholder: t.getState().pagination.pageSize }) }),
            /* @__PURE__ */ a(Sr, { side: "top", children: [10, 20, 30, 40, 50].map((e) => /* @__PURE__ */ a(ve, { value: `${e}`, children: e }, e)) })
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
        tt,
        {
          variant: "outline",
          size: "icon",
          className: "tw:hidden tw:h-8 tw:w-8 tw:p-0 tw:lg:flex",
          onClick: () => t.setPageIndex(0),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ a("span", { className: "tw:sr-only", children: "Go to first page" }),
            /* @__PURE__ */ a(sc, { className: "tw:h-4 tw:w-4" })
          ]
        }
      ),
      /* @__PURE__ */ u(
        tt,
        {
          variant: "outline",
          size: "icon",
          className: "tw:h-8 tw:w-8 tw:p-0",
          onClick: () => t.previousPage(),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ a("span", { className: "tw:sr-only", children: "Go to previous page" }),
            /* @__PURE__ */ a(cc, { className: "tw:h-4 tw:w-4" })
          ]
        }
      ),
      /* @__PURE__ */ u(
        tt,
        {
          variant: "outline",
          size: "icon",
          className: "tw:h-8 tw:w-8 tw:p-0",
          onClick: () => t.nextPage(),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ a("span", { className: "tw:sr-only", children: "Go to next page" }),
            /* @__PURE__ */ a(lc, { className: "tw:h-4 tw:w-4" })
          ]
        }
      ),
      /* @__PURE__ */ u(
        tt,
        {
          variant: "outline",
          size: "icon",
          className: "tw:hidden tw:h-8 tw:w-8 tw:p-0 tw:lg:flex",
          onClick: () => t.setPageIndex(t.getPageCount() - 1),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ a("span", { className: "tw:sr-only", children: "Go to last page" }),
            /* @__PURE__ */ a(dc, { className: "tw:h-4 tw:w-4" })
          ]
        }
      )
    ] })
  ] }) });
}
function uu({
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
  var j;
  const [w, p] = N([]), [h, f] = N([]), [v, x] = N({}), [g, T] = N({}), k = P(() => e ?? [], [e]), E = Ei({
    data: k,
    columns: t,
    getCoreRowModel: Si(),
    ...r && { getPaginationRowModel: Zl() },
    onSortingChange: p,
    getSortedRowModel: Ti(),
    onColumnFiltersChange: f,
    getFilteredRowModel: Yl(),
    onColumnVisibilityChange: x,
    onRowSelectionChange: T,
    state: {
      sorting: w,
      columnFilters: h,
      columnVisibility: v,
      rowSelection: g
    }
  }), C = E.getVisibleFlatColumns();
  let A;
  return d ? A = Array.from({ length: 10 }).map((R, O) => `skeleton-row-${O}`).map((R) => /* @__PURE__ */ a(We, { className: "tw:hover:bg-transparent", children: /* @__PURE__ */ a(yr, { colSpan: C.length ?? t.length, className: "tw:border-0 tw:p-0", children: /* @__PURE__ */ a("div", { className: "tw:w-full tw:py-2", children: /* @__PURE__ */ a(xr, { className: "tw:h-14 tw:w-full tw:rounded-md" }) }) }) }, R)) : ((j = E.getRowModel().rows) == null ? void 0 : j.length) > 0 ? A = E.getRowModel().rows.map((U) => /* @__PURE__ */ a(
    We,
    {
      onClick: () => i(U, E),
      "data-state": U.getIsSelected() && "selected",
      children: U.getVisibleCells().map((z) => /* @__PURE__ */ a(yr, { children: Fr(z.column.columnDef.cell, z.getContext()) }, z.id))
    },
    U.id
  )) : A = /* @__PURE__ */ a(We, { children: /* @__PURE__ */ a(yr, { colSpan: t.length, className: "tw:h-24 tw:text-center", children: l }) }), /* @__PURE__ */ u("div", { className: "pr-twp", id: c, children: [
    n && /* @__PURE__ */ a(su, { table: E }),
    /* @__PURE__ */ u(Io, { stickyHeader: s, children: [
      /* @__PURE__ */ a(zo, { stickyHeader: s, children: E.getHeaderGroups().map((U) => /* @__PURE__ */ a(We, { children: U.headers.map((z) => /* @__PURE__ */ a(Na, { className: "tw:p-0", children: z.isPlaceholder ? void 0 : Fr(z.column.columnDef.header, z.getContext()) }, z.id)) }, U.id)) }),
      /* @__PURE__ */ a(Po, { children: A })
    ] }),
    r && /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:justify-end tw:space-x-2 tw:py-4", children: [
      /* @__PURE__ */ a(
        tt,
        {
          variant: "outline",
          size: "sm",
          onClick: () => E.previousPage(),
          disabled: !E.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ a(
        tt,
        {
          variant: "outline",
          size: "sm",
          onClick: () => E.nextPage(),
          disabled: !E.getCanNextPage(),
          children: "Next"
        }
      )
    ] }),
    r && o && /* @__PURE__ */ a(wu, { table: E })
  ] });
}
function Ah({
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
      children: /* @__PURE__ */ a(Ql, { options: s, children: e })
    }
  );
}
const pu = Object.freeze([
  "%webView_error_dump_header%",
  "%webView_error_dump_info_message%"
]), Ln = (t, e) => t[e] ?? e;
function hu({
  errorDetails: t,
  handleCopyNotify: e,
  localizedStrings: r,
  id: o
}) {
  const n = Ln(r, "%webView_error_dump_header%"), s = Ln(r, "%webView_error_dump_info_message%");
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
          /* @__PURE__ */ a(tt, { variant: "secondary", size: "icon", className: "size-8", onClick: () => i(), children: /* @__PURE__ */ a(ii, {}) })
        ] }),
        /* @__PURE__ */ a("div", { className: "tw:prose tw:w-full", children: /* @__PURE__ */ a("pre", { className: "tw:text-xs", children: t }) })
      ]
    }
  );
}
const $h = Object.freeze([
  ...pu,
  "%webView_error_dump_copied_message%"
]);
function Vh({
  errorDetails: t,
  handleCopyNotify: e,
  localizedStrings: r,
  children: o,
  className: n,
  id: s
}) {
  const [i, c] = N(!1), d = () => {
    c(!0), e && e();
  };
  return /* @__PURE__ */ u(lr, { onOpenChange: (w) => {
    w || c(!1);
  }, children: [
    /* @__PURE__ */ a(Rr, { asChild: !0, children: o }),
    /* @__PURE__ */ u(dr, { id: s, className: b("tw:min-w-80 tw:max-w-96", n), children: [
      i && r["%webView_error_dump_copied_message%"] && /* @__PURE__ */ a(It, { children: r["%webView_error_dump_copied_message%"] }),
      /* @__PURE__ */ a(
        hu,
        {
          errorDetails: t,
          handleCopyNotify: d,
          localizedStrings: r
        }
      )
    ] })
  ] });
}
var gu = /* @__PURE__ */ ((t) => (t[t.Check = 0] = "Check", t[t.Radio = 1] = "Radio", t))(gu || {});
function Lh({ id: t, label: e, groups: r }) {
  const [o, n] = N(
    Object.fromEntries(
      r.map(
        (l, w) => l.itemType === 0 ? [w, []] : void 0
      ).filter((l) => !!l)
    )
  ), [s, i] = N({}), c = (l, w) => {
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
    /* @__PURE__ */ a(Se, { asChild: !0, children: /* @__PURE__ */ u(tt, { variant: "default", children: [
      /* @__PURE__ */ a(wc, { size: 16, className: "tw:mr-2 tw:h-4 tw:w-4" }),
      e,
      /* @__PURE__ */ a(sr, { size: 16, className: "tw:ml-2 tw:h-4 tw:w-4" })
    ] }) }),
    /* @__PURE__ */ a(je, { children: r.map((l, w) => /* @__PURE__ */ u("div", { children: [
      /* @__PURE__ */ a(cr, { children: l.label }),
      /* @__PURE__ */ a(Zn, { children: l.itemType === 0 ? /* @__PURE__ */ a(ht, { children: l.items.map((p, h) => /* @__PURE__ */ a("div", { children: /* @__PURE__ */ a(
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
function Bh({
  id: t,
  category: e,
  downloads: r,
  languages: o,
  moreInfoUrl: n,
  handleMoreInfoLinkClick: s,
  supportUrl: i,
  handleSupportLinkClick: c
}) {
  const d = new di("en", {
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
            /* @__PURE__ */ a(uc, { className: "tw:h-4 tw:w-4" }),
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
            tt,
            {
              onClick: () => s(),
              variant: "link",
              className: "tw:flex tw:h-auto tw:gap-1 tw:py-0 tw:text-xs tw:font-semibold tw:text-foreground",
              children: [
                "Website",
                /* @__PURE__ */ a(pc, { className: "tw:h-4 tw:w-4" })
              ]
            }
          ) }),
          i && /* @__PURE__ */ a("div", { className: "tw:flex tw:gap-1", children: /* @__PURE__ */ u(
            tt,
            {
              onClick: () => c(),
              variant: "link",
              className: "tw:flex tw:h-auto tw:gap-1 tw:py-0 tw:text-xs tw:font-semibold tw:text-foreground",
              children: [
                "Support",
                /* @__PURE__ */ a(hc, { className: "tw:h-4 tw:w-4" })
              ]
            }
          ) })
        ] })
      ]
    }
  );
}
function fu({ id: t, versionHistory: e }) {
  const [r, o] = N(!1), n = /* @__PURE__ */ new Date();
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
  const i = P(() => Ic(r), [r]), d = ((l) => {
    const w = new Intl.DisplayNames(zc(), { type: "language" });
    return l.map((p) => w.of(p));
  })(o);
  return /* @__PURE__ */ a("div", { id: t, className: "pr-twp tw:border-t tw:py-2", children: /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:gap-2 tw:divide-y", children: [
    Object.entries(n).length > 0 && /* @__PURE__ */ a(fu, { versionHistory: n }),
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
function Fh({
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
      Is,
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
      return /* @__PURE__ */ u(Hr, { variant: "muted", className: "tw:flex tw:items-center tw:gap-1", children: [
        /* @__PURE__ */ a(
          tt,
          {
            variant: "ghost",
            size: "icon",
            className: "tw:h-4 tw:w-4 tw:p-0 tw:hover:bg-transparent",
            onClick: () => r(e.filter((v) => v !== h)),
            children: /* @__PURE__ */ a(ai, { className: "tw:h-3 tw:w-3" })
          }
        ),
        (f = t.find((v) => v.value === h)) == null ? void 0 : f.label
      ] }, h);
    }) }) : /* @__PURE__ */ a(It, { children: w })
  ] });
}
const mu = Object.freeze([
  "%undoButton_tooltip%",
  "%redoButton_tooltip%"
]), Bn = (t, e) => t[e] ?? e;
function vu({
  onUndoClick: t,
  onRedoClick: e,
  canUndo: r = !0,
  canRedo: o = !0,
  localizedStrings: n = {},
  showKeyboardShortcuts: s = !0,
  className: i = "tw:h-6 tw:w-6",
  variant: c = "ghost"
}) {
  const d = Mo(), l = Bn(n, "%undoButton_tooltip%"), w = Bn(n, "%redoButton_tooltip%");
  return /* @__PURE__ */ u(za, { children: [
    /* @__PURE__ */ a(zt, { children: /* @__PURE__ */ u(kt, { children: [
      /* @__PURE__ */ a(_t, { asChild: !0, children: /* @__PURE__ */ a(
        tt,
        {
          "aria-label": l,
          className: i,
          size: "icon",
          onClick: t,
          disabled: !r,
          variant: c,
          children: /* @__PURE__ */ a(gc, {})
        }
      ) }),
      /* @__PURE__ */ a(Nt, { children: /* @__PURE__ */ u("p", { children: [
        l,
        s && /* @__PURE__ */ u(ht, { children: [
          " ",
          /* @__PURE__ */ a(po, { children: d ? "⌘Z" : "Ctrl+Z" })
        ] })
      ] }) })
    ] }) }),
    e && (c === "secondary" || c === "default") && /* @__PURE__ */ a(Do, {}),
    e && /* @__PURE__ */ a(zt, { children: /* @__PURE__ */ u(kt, { children: [
      /* @__PURE__ */ a(_t, { asChild: !0, children: /* @__PURE__ */ a(
        tt,
        {
          "aria-label": w,
          className: i,
          size: "icon",
          onClick: e,
          disabled: !o,
          variant: c,
          children: /* @__PURE__ */ a(fc, {})
        }
      ) }),
      /* @__PURE__ */ a(Nt, { children: /* @__PURE__ */ u("p", { children: [
        w,
        s && /* @__PURE__ */ u(ht, { children: [
          " ",
          /* @__PURE__ */ a(po, { children: d ? "⌘⇧Z" : "Ctrl+Y" })
        ] })
      ] }) })
    ] }) })
  ] });
}
function bu({
  children: t,
  editorRef: e,
  canUndo: r = !0,
  canRedo: o = !0
}) {
  const n = V(null);
  return Z(() => {
    var d;
    const s = Mo(), i = ((d = n.current) == null ? void 0 : d.querySelector(".editor-input")) ?? void 0, c = (l) => {
      var p, h, f, v;
      if (!i || document.activeElement !== i) return;
      const w = l.key.toLowerCase();
      if (s) {
        if (!l.metaKey) return;
        !l.shiftKey && w === "z" ? (l.preventDefault(), r && ((p = e.current) == null || p.undo())) : l.shiftKey && w === "z" && (l.preventDefault(), o && ((h = e.current) == null || h.redo()));
      } else {
        if (!l.ctrlKey) return;
        !l.shiftKey && w === "z" ? (l.preventDefault(), r && ((f = e.current) == null || f.undo())) : (w === "y" || l.shiftKey && w === "z") && (l.preventDefault(), o && ((v = e.current) == null || v.redo()));
      }
    };
    return document.addEventListener("keydown", c), () => document.removeEventListener("keydown", c);
  }, [o, r, e]), /* @__PURE__ */ a("div", { ref: n, children: t });
}
function xu() {
  const t = V(void 0), e = V(new DOMRect()), r = V({
    getBoundingClientRect: () => {
      var s;
      const n = (s = t.current) == null ? void 0 : s.measure();
      return n && (e.current = n), e.current;
    },
    get contextElement() {
      var n;
      return (n = t.current) == null ? void 0 : n.contextElement;
    }
  }), o = $((n) => {
    t.current = n, e.current = n.measure() ?? new DOMRect();
  }, []);
  return P(() => ({ virtualRef: r, setSource: o }), [o]);
}
function yu(t) {
  if (t.getClientRects().length !== 0)
    return t.getBoundingClientRect();
}
function ku(t) {
  return new DOMRect(t.left, t.top, 0, t.height);
}
function Uh(t) {
  if (t.getClientRects().length !== 0)
    return t.getBoundingClientRect();
}
const _u = (t, e, r) => t === "generated" ? /* @__PURE__ */ u(ht, { children: [
  /* @__PURE__ */ a("p", { children: "+" }),
  " ",
  e["%footnoteEditor_callerDropdown_item_generated%"]
] }) : t === "hidden" ? /* @__PURE__ */ u(ht, { children: [
  /* @__PURE__ */ a("p", { children: "-" }),
  " ",
  e["%footnoteEditor_callerDropdown_item_hidden%"]
] }) : /* @__PURE__ */ u(ht, { children: [
  /* @__PURE__ */ a("p", { children: r }),
  " ",
  e["%footnoteEditor_callerDropdown_item_custom%"]
] });
function Nu({
  callerType: t,
  customCaller: e,
  updateCaller: r,
  localizedStrings: o
}) {
  const n = V(null), s = V(null), i = V(!1), [c, d] = N(t), [l, w] = N(e), [p, h] = N(!1), f = V(!1), v = V(c);
  v.current = c;
  const x = V(l);
  x.current = l, Z(() => {
    d(t);
  }, [t]), Z(() => {
    l !== e && w(e);
  }, [e]);
  const g = (k) => {
    if (i.current = !1, h(k), !k) {
      const E = v.current, C = x.current;
      E !== "custom" || C ? (E !== t || C !== e) && r(E, C) : (d(t), w(e));
    }
  }, T = (k) => {
    var E, C, A, j;
    k.stopPropagation(), document.activeElement === s.current && k.key === "ArrowDown" || k.key === "ArrowRight" ? ((E = n.current) == null || E.focus(), i.current = !0) : document.activeElement === n.current && k.key === "ArrowUp" ? ((C = s.current) == null || C.focus(), i.current = !1) : document.activeElement === n.current && k.key === "ArrowLeft" && ((A = n.current) == null ? void 0 : A.selectionStart) === 0 && ((j = s.current) == null || j.focus(), i.current = !1), c === "custom" && k.key === "Enter" && (document.activeElement === s.current || document.activeElement === n.current) && g(!1);
  };
  return /* @__PURE__ */ u(Be, { open: p, onOpenChange: g, children: [
    /* @__PURE__ */ a(zt, { children: /* @__PURE__ */ u(kt, { children: [
      /* @__PURE__ */ a(_t, { asChild: !0, children: /* @__PURE__ */ a(Se, { asChild: !0, children: /* @__PURE__ */ a(tt, { variant: "outline", className: "tw:h-6", children: _u(t, o, e) }) }) }),
      /* @__PURE__ */ a(Nt, { children: o["%footnoteEditor_callerDropdown_tooltip%"] })
    ] }) }),
    /* @__PURE__ */ u(
      je,
      {
        style: { zIndex: Xn },
        onClick: () => {
          i.current && (i.current = !1);
        },
        onKeyDown: T,
        onMouseMove: () => {
          var k;
          i.current && ((k = n.current) == null || k.focus());
        },
        children: [
          /* @__PURE__ */ a(cr, { children: o["%footnoteEditor_callerDropdown_label%"] }),
          /* @__PURE__ */ a(ir, {}),
          /* @__PURE__ */ a(
            Ze,
            {
              checked: c === "generated",
              onCheckedChange: () => d("generated"),
              children: /* @__PURE__ */ u("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ a("span", { children: o["%footnoteEditor_callerDropdown_item_generated%"] }),
                /* @__PURE__ */ a("span", { className: "tw:w-10 tw:text-center", children: vo })
              ] })
            }
          ),
          /* @__PURE__ */ a(
            Ze,
            {
              checked: c === "hidden",
              onCheckedChange: () => d("hidden"),
              children: /* @__PURE__ */ u("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ a("span", { children: o["%footnoteEditor_callerDropdown_item_hidden%"] }),
                /* @__PURE__ */ a("span", { className: "tw:w-10 tw:text-center", children: bo })
              ] })
            }
          ),
          /* @__PURE__ */ a(
            Ze,
            {
              ref: s,
              checked: c === "custom",
              onCheckedChange: () => d("custom"),
              onPointerDown: () => {
                f.current = c === "custom";
              },
              onClick: (k) => {
                var E;
                if (k.stopPropagation(), f.current && k.target !== n.current) {
                  g(!1);
                  return;
                }
                i.current = !0, (E = n.current) == null || E.focus();
              },
              onSelect: (k) => k.preventDefault(),
              children: /* @__PURE__ */ u("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ a("span", { children: o["%footnoteEditor_callerDropdown_item_custom%"] }),
                /* @__PURE__ */ a(
                  Aa,
                  {
                    tabIndex: 0,
                    onMouseDown: (k) => {
                      k.stopPropagation(), d("custom"), i.current = !0;
                    },
                    ref: n,
                    className: "tw:h-auto tw:w-10 tw:p-0 tw:text-center",
                    value: l,
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
const Cu = (t, e) => t === "f" ? /* @__PURE__ */ u(ht, { children: [
  /* @__PURE__ */ a(ci, {}),
  " ",
  e["%footnoteEditor_noteType_footnote_label%"]
] }) : t === "fe" ? /* @__PURE__ */ u(ht, { children: [
  /* @__PURE__ */ a(li, {}),
  " ",
  e["%footnoteEditor_noteType_endNote_label%"]
] }) : /* @__PURE__ */ u(ht, { children: [
  /* @__PURE__ */ a(si, {}),
  " ",
  e["%footnoteEditor_noteType_crossReference_label%"]
] }), Eu = (t, e) => {
  if (t === "x")
    return e["%footnoteEditor_noteType_crossReference_label%"];
  let r = e["%footnoteEditor_noteType_endNote_label%"];
  return t === "f" && (r = e["%footnoteEditor_noteType_footnote_label%"]), Ye(e["%footnoteEditor_noteType_tooltip%"] ?? "", {
    noteType: r
  });
};
function Tu({
  noteType: t,
  handleNoteTypeChange: e,
  localizedStrings: r,
  isTypeSwitchable: o
}) {
  return /* @__PURE__ */ u(Be, { children: [
    /* @__PURE__ */ a(zt, { children: /* @__PURE__ */ u(kt, { children: [
      /* @__PURE__ */ a(_t, { asChild: !0, children: /* @__PURE__ */ a(Se, { asChild: !0, children: /* @__PURE__ */ a(tt, { variant: "outline", className: "tw:h-6", children: Cu(t, r) }) }) }),
      /* @__PURE__ */ a(Nt, { children: /* @__PURE__ */ a("p", { children: Eu(t, r) }) })
    ] }) }),
    /* @__PURE__ */ u(je, { style: { zIndex: Xn }, children: [
      /* @__PURE__ */ a(cr, { children: r["%footnoteEditor_noteTypeDropdown_label%"] }),
      /* @__PURE__ */ a(ir, {}),
      /* @__PURE__ */ u(
        Ze,
        {
          disabled: t !== "x" && !o,
          checked: t === "x",
          onCheckedChange: () => e("x"),
          className: "tw:gap-2",
          children: [
            /* @__PURE__ */ a(si, {}),
            /* @__PURE__ */ a("span", { children: r["%footnoteEditor_noteType_crossReference_label%"] })
          ]
        }
      ),
      /* @__PURE__ */ u(
        Ze,
        {
          disabled: t === "x" && !o,
          checked: t === "f",
          onCheckedChange: () => e("f"),
          className: "tw:gap-2",
          children: [
            /* @__PURE__ */ a(ci, {}),
            /* @__PURE__ */ a("span", { children: r["%footnoteEditor_noteType_footnote_label%"] })
          ]
        }
      ),
      /* @__PURE__ */ u(
        Ze,
        {
          disabled: t === "x" && !o,
          checked: t === "fe",
          onCheckedChange: () => e("fe"),
          className: "tw:gap-2",
          children: [
            /* @__PURE__ */ a(li, {}),
            /* @__PURE__ */ a("span", { children: r["%footnoteEditor_noteType_endNote_label%"] })
          ]
        }
      )
    ] })
  ] });
}
const Su = Object.freeze([
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
function Ru({ icon: t, className: e }) {
  return /* @__PURE__ */ a(t ?? mc, { className: e, size: 16 });
}
function Du({ state: t }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "marker-selection-state",
      className: "tw:flex tw:w-4 tw:min-w-4 tw:items-center tw:justify-center",
      children: t !== "none" && /* @__PURE__ */ a(Je, { size: 16 })
    }
  );
}
function jn({
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
        t.selectionState !== void 0 && /* @__PURE__ */ a(Du, { state: t.selectionState }),
        /* @__PURE__ */ a("div", { className: "tw:w-8 tw:min-w-8", children: t.marker ? (
          // Monospace: a USFM marker is a code, not prose, and should read as one. Deliberately
          // inherits the row's own foreground rather than taking a marker-specific colour.
          /* @__PURE__ */ a("span", { className: "tw:font-mono tw:text-xs", children: t.marker })
        ) : /* @__PURE__ */ a("div", { children: /* @__PURE__ */ a(Ru, { icon: t.icon }) }) }),
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
function Ou({
  localizedStrings: t,
  markerMenuItems: e,
  searchRef: r,
  searchPlaceholder: o
}) {
  const [n, s] = N(""), [i, c] = P(() => {
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
      Ia,
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
      /* @__PURE__ */ a(Pa, { children: t["%markerMenu_noResults%"] }),
      /* @__PURE__ */ a(Xe, { children: i.map((d) => {
        var l;
        return /* @__PURE__ */ a(
          jn,
          {
            item: d,
            localizedStrings: t
          },
          `item-${d.marker ?? ((l = d.icon) == null ? void 0 : l.displayName)}-${d.title.replaceAll(" ", "")}`
        );
      }) }),
      c.length > 0 && /* @__PURE__ */ u(ht, { children: [
        i.length > 0 && /* @__PURE__ */ a(Jn, { alwaysRender: !0 }),
        /* @__PURE__ */ a(Xe, { children: c.map((d) => {
          var l;
          return /* @__PURE__ */ a(
            jn,
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
function Mu(t, e, r, o) {
  if (!o || o === "p") return [];
  const n = ga[o];
  if (!(n != null && n.children)) return [];
  const s = [];
  return Object.entries(n.children).forEach(([, i]) => {
    s.push(
      ...i.map((c) => ({
        marker: c,
        title: r[ga[c].description] ?? ga[c].description,
        action: () => {
          var d;
          (d = t.current) == null || d.insertMarker(c), e();
        }
      }))
    );
  }), s.sort((i, c) => (i.marker ?? i.title).localeCompare(c.marker ?? c.title));
}
function Iu(t) {
  return {
    id: t.marker,
    label: t.marker,
    description: t.description,
    badge: t.kind === "closeTag" ? "%markerMenu_endTag_label%" : void 0,
    muted: !t.isBasic
  };
}
function zu(t) {
  var r;
  const e = (r = t.attributes) == null ? void 0 : r.char;
  e != null && e.style && (e.style === "ft" && (e.style = "xt"), e.style === "fr" && (e.style = "xo"), e.style === "fq" && (e.style = "xq"));
}
function Pu(t) {
  var r;
  const e = (r = t.attributes) == null ? void 0 : r.char;
  e != null && e.style && (e.style === "xt" && (e.style = "ft"), e.style === "xo" && (e.style = "fr"), e.style === "xq" && (e.style = "fq"));
}
const Au = {
  type: "USJ",
  version: "3.1",
  content: [
    {
      type: "para"
    }
  ]
};
function Kh({
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
  var Tt;
  const h = V(null), f = V(null), v = V(null);
  Xt(() => {
    if (!v.current) return;
    const D = parseFloat(getComputedStyle(v.current).width);
    D > 0 && (v.current.style.width = `${D}px`);
  }, []);
  const [x, g] = N("generated"), [T, k] = N("generated"), [E, C] = N("*"), [A, j] = N("*"), [U, z] = N("f"), [R, O] = N(!1), [G, W] = N(!0), [ot, y] = N(!1), et = V(!1), M = V(""), [Q, Y] = N(!1), L = xu(), [X, ut] = N(), mt = V(null), K = V(
    void 0
  ), gt = V(0), vt = V(void 0), lt = P(
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
        ...i.view ?? td(),
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
  ), Dt = P(
    () => Mu(
      h,
      () => Y(!1),
      d,
      X
    ),
    [d, X]
  );
  Z(() => {
    var D;
    Q || (D = h.current) == null || D.focus();
  }, [U, Q]);
  const xt = $(() => {
    var I, J, B;
    const D = (I = f.current) == null ? void 0 : I.querySelector(".editor-input"), H = D == null ? void 0 : D.querySelector("span.note"), _ = (B = (J = f.current) == null ? void 0 : J.ownerDocument.getSelection()) == null ? void 0 : B.anchorNode;
    return !!H && !!_ && H.contains(_);
  }, []);
  Z(() => {
    var J, B;
    let D, H, _;
    et.current = !1, vt.current = void 0, W(!0);
    const I = e == null ? void 0 : e.at(0);
    if (I && Ar("note", I)) {
      const at = (J = I.insert.note) == null ? void 0 : J.caller;
      let dt = "custom";
      at === vo ? dt = "generated" : at === bo ? dt = "hidden" : at && (C(at), j(at)), g(dt), k(dt), z(((B = I.insert.note) == null ? void 0 : B.style) ?? "f"), D = setTimeout(() => {
        var ct, pt, Et;
        (ct = h.current) == null || ct.applyUpdate([I]), (pt = h.current) == null || pt.selectNote(0), (Et = h.current) == null || Et.focus(), H = requestAnimationFrame(() => {
          _ = setTimeout(() => {
            var Rt, yt;
            xt() || ((Rt = h.current) == null || Rt.selectNote(0), (yt = h.current) == null || yt.focus());
          }, 0);
        });
      }, 0);
    }
    return () => {
      D && clearTimeout(D), H !== void 0 && cancelAnimationFrame(H), _ !== void 0 && clearTimeout(_);
    };
  }, [e, s, xt]);
  const Ot = $(
    (D = !1) => {
      var _, I, J;
      p == null || p();
      const H = (I = (_ = h.current) == null ? void 0 : _.getNoteOps(0)) == null ? void 0 : I.at(0);
      H && Ar("note", H) && (r == null || r([H]), D && l && s && ((J = l.current) == null || J.replaceEmbedUpdate(s, [H])));
    },
    [s, r, p, l]
  ), xe = $(
    (D, H) => {
      var J, B, at;
      const _ = (B = (J = h.current) == null ? void 0 : J.getNoteOps(0)) == null ? void 0 : B.at(0);
      if (!_ || !Ar("note", _) || !_.insert.note) return;
      let I;
      D === "custom" ? I = H : D === "generated" ? I = vo : I = bo, _.insert.note.caller !== I && (_.insert.note.caller = I, (at = h.current) == null || at.applyUpdate([_, { delete: 1 }]));
    },
    []
  ), Qt = $(() => {
    var D;
    K.current || (D = h.current) == null || D.commitPendingMarkerEdits(), Ot(!0), o();
  }, [o, Ot]), $t = V(Qt);
  Xt(() => {
    $t.current = Qt;
  });
  const Ct = V({ book: n.book, chapterNum: n.chapterNum });
  Xt(() => {
    (Ct.current.book !== n.book || Ct.current.chapterNum !== n.chapterNum) && (Ct.current = { book: n.book, chapterNum: n.chapterNum }, $t.current());
  }, [n.book, n.chapterNum]);
  const Ut = () => {
    var H;
    const D = (H = f.current) == null ? void 0 : H.getElementsByClassName("editor-input")[0];
    D != null && D.textContent && navigator.clipboard.writeText(D.textContent);
  }, pe = $(
    (D, H) => {
      p == null || p(), g(D), C(H), xe(D, H);
    },
    [xe, p]
  ), he = (D) => {
    var _, I, J, B, at;
    z(D);
    const H = (I = (_ = h.current) == null ? void 0 : _.getNoteOps(0)) == null ? void 0 : I.at(0);
    if (H && Ar("note", H)) {
      H.insert.note && (H.insert.note.style = D);
      const dt = (B = (J = H.insert.note) == null ? void 0 : J.contents) == null ? void 0 : B.ops;
      U !== "x" && D === "x" ? dt == null || dt.forEach((ct) => zu(ct)) : U === "x" && D !== "x" && (dt == null || dt.forEach((ct) => Pu(ct))), (at = h.current) == null || at.applyUpdate([H, { delete: 1 }]);
    }
  }, se = (D) => {
    ut(D.contextMarker), y(D.canRedo);
  }, bt = $(
    (D) => {
      var _, I, J, B, at;
      const H = (I = (_ = h.current) == null ? void 0 : _.getNoteOps(0)) == null ? void 0 : I.at(0);
      if (H && Ar("note", H)) {
        D.content.length > 1 && setTimeout(() => {
          var pt;
          (pt = h.current) == null || pt.applyUpdate([{ retain: 2 }, { delete: 1 }]);
        }, 0);
        const dt = (J = H.insert.note) == null ? void 0 : J.style, ct = (at = (B = H.insert.note) == null ? void 0 : B.contents) == null ? void 0 : at.ops;
        if (dt || O(!1), O(
          dt === "x" ? !!(ct != null && ct.every((pt) => {
            var Rt, yt;
            if (!((Rt = pt.attributes) != null && Rt.char)) return !0;
            const Et = ((yt = pt.attributes) == null ? void 0 : yt.char).style;
            return Et === "xt" || Et === "xo" || Et === "xq";
          })) : !!(ct != null && ct.every((pt) => {
            var Rt, yt;
            if (!((Rt = pt.attributes) != null && Rt.char)) return !0;
            const Et = ((yt = pt.attributes) == null ? void 0 : yt.char).style;
            return Et === "ft" || Et === "fr" || Et === "fq";
          }))
        ), !et.current) {
          et.current = !0, M.current = JSON.stringify(H), W(!0);
          return;
        }
        W(JSON.stringify(H) === M.current), Ot();
      } else
        O(!1), W(!0);
    },
    [Ot]
  ), oe = $(() => {
    const D = window.getSelection();
    if (!Dt.length || !D || D.rangeCount === 0)
      return;
    const H = f.current;
    if (!H) return;
    const _ = D.getRangeAt(0).cloneRange();
    L.setSource({
      measure: () => {
        const I = yu(_);
        return I && ku(I);
      },
      contextElement: H
    }), Y(!0);
  }, [Dt, L]), ce = V(() => {
  }), ye = $(
    (D, H, _) => {
      const { anchorRect: I } = D;
      if (!w || !I) return;
      const { passive: J } = _;
      As({
        items: H,
        passive: J,
        // No `shouldSpaceCommit`, deliberately: the Space note-marker exception exists for
        // Standard-view BODY text, where a materialized `\f ` literal absorbs the following word
        // as the new footnote's caller. This palette offers note-INTERNAL markers for content
        // already inside a note, so Space keeps its plain typed-literal commit here.
        sessionCounterRef: gt,
        setSession: (B) => {
          K.current = B;
        },
        clearSessionIfCurrent: (B) => on(K, B),
        // Through the ref so the palette always runs the CURRENT handler — the callback is
        // captured once, at show time, while the session it drives is replaced on every reopen.
        runSessionKey: (B) => ce.current(B),
        show: (B) => w.show(
          H.map(Iu),
          I,
          J,
          B
        ),
        restoreSelectionIfLost: () => {
          var B, at, dt;
          if (!((B = h.current) != null && B.getSelection())) {
            const ct = vt.current;
            ct ? (at = h.current) == null || at.setSelection(ct) : (dt = h.current) == null || dt.selectNote(0);
          }
        },
        focusEditor: () => {
          var B;
          return (B = h.current) == null ? void 0 : B.focus();
        },
        applyItem: (B) => {
          var at;
          return (at = h.current) == null ? void 0 : at.applyMarkerMenuSelection(B, {
            trigger: "backslash",
            // ACTIVE palette: the trigger was claimed and never landed, so there is never a
            // literal prefix for the apply to clean up.
            literalPrefixLanded: !1
          });
        },
        onShowError: (B) => {
          (!Pc(B) || B.code !== Ac) && console.warn(
            `FootnoteEditor: the marker palette did not open: ${$c(B)}`
          );
        }
      });
    },
    [w]
  ), te = $(() => {
    var _;
    const D = (_ = h.current) == null ? void 0 : _.getMarkerMenuContext();
    if (!D) return !1;
    const H = ed(lt.styleInfo ?? rd, D);
    return H.length === 0 ? !1 : (ye(D, H, { passive: !D.hasTextSelection }), !0);
  }, [ye, lt.styleInfo]), ne = $(
    (D) => {
      const H = K.current;
      if (!H || !w) return;
      $s(D, H, {
        // Overlay ops delegate to the host-supplied driver; the commit ops are EDITOR-side
        // applies this popover owns (it holds the editor ref). The table calls `dismiss()` right
        // after each, resolving the show promise `undefined` — which the openMarkerPalette
        // `.then` treats as a dismissal, so nothing double-applies.
        update: (I) => w.update(I),
        commit: () => w.commit(),
        dismiss: () => w.dismiss(),
        commitTyped: (I) => {
          var J;
          return (J = h.current) == null ? void 0 : J.commitTypedMarker(I);
        },
        commitTypedAndReopen: (I) => {
          var J;
          (J = h.current) == null || J.commitTypedMarker(I, { trailingSpace: !1 }), te();
        },
        commitTypedCloser: (I) => {
          var J;
          return (J = h.current) == null ? void 0 : J.commitTypedCloser(I);
        },
        commitItem: (I) => {
          var B;
          const J = H.items.find((at) => at.marker === I);
          J && ((B = h.current) == null || B.applyMarkerMenuSelection(J, {
            trigger: "backslash",
            literalPrefixLanded: !1
          }));
        }
      }) === "ended" && on(K, H.token);
    },
    [w, te]
  );
  Z(() => {
    ce.current = ne;
  }, [ne]), Z(() => {
    const D = (H) => {
      var J, B;
      const _ = (J = f.current) == null ? void 0 : J.querySelector(".editor-input");
      if (!_ || H.target !== _) return;
      const I = (B = h.current) == null ? void 0 : B.getSelection();
      I && (vt.current = I);
    };
    return document.addEventListener("focusout", D), () => document.removeEventListener("focusout", D);
  }, []), Z(() => {
    const D = () => {
      Q && Y(!1);
    };
    return window.addEventListener("click", D), () => {
      window.removeEventListener("click", D);
    };
  }, [Q]), Z(() => {
    var D;
    Q && ((D = mt.current) == null || D.focus());
  }, [Q]), Z(() => {
    var _;
    const D = () => {
      var I;
      return ((I = f.current) == null ? void 0 : I.querySelector(".editor-input")) ?? void 0;
    };
    if (((_ = lt.view) == null ? void 0 : _.markerMode) === "editable") {
      const I = (B) => {
        var ct, pt, Et, Rt;
        if (Ls(B)) return;
        const at = D();
        if (!at || document.activeElement !== at) return;
        if (K.current && w) {
          ce.current(B);
          return;
        }
        if (B.key === "Enter" && !xt()) {
          B.preventDefault(), B.stopPropagation(), (ct = h.current) == null || ct.selectNote(0), (pt = h.current) == null || pt.focus();
          return;
        }
        if (w && B.key === c) {
          if (!xt()) {
            B.preventDefault(), B.stopPropagation(), (Et = h.current) == null || Et.selectNote(0), (Rt = h.current) == null || Rt.focus();
            return;
          }
          te() && (B.preventDefault(), B.stopPropagation());
        }
      }, J = () => {
        var at, dt;
        const B = D();
        !B || document.activeElement !== B || xt() || ((at = h.current) == null || at.selectNote(0), (dt = h.current) == null || dt.focus());
      };
      return document.addEventListener("keydown", I, { capture: !0 }), document.addEventListener("paste", J, { capture: !0 }), () => {
        document.removeEventListener("keydown", I, { capture: !0 }), document.removeEventListener("paste", J, { capture: !0 });
      };
    }
    const H = (I) => {
      const J = D();
      !Q && J && document.activeElement === J && I.key === c ? (I.preventDefault(), oe()) : Q && I.key === "Escape" && (I.preventDefault(), Y(!1));
    };
    return document.addEventListener("keydown", H), () => {
      document.removeEventListener("keydown", H);
    };
  }, [
    Q,
    oe,
    c,
    (Tt = lt.view) == null ? void 0 : Tt.markerMode,
    lt.styleInfo,
    w,
    te,
    xt
  ]), Z(() => {
    const D = () => {
      var I, J, B;
      const H = ((I = f.current) == null ? void 0 : I.querySelector(".editor-input")) ?? void 0;
      if (!H || document.activeElement !== H) return;
      const _ = document.getSelection();
      _ && !_.isCollapsed || xt() || ((J = h.current) == null || J.selectNote(0), (B = h.current) == null || B.focus());
    };
    return document.addEventListener("pointerup", D), document.addEventListener("selectionchange", D), () => {
      document.removeEventListener("pointerup", D), document.removeEventListener("selectionchange", D);
    };
  }, [xt]);
  const ke = d["%footnoteEditor_copyButton_tooltip%"];
  return /* @__PURE__ */ u(ht, { children: [
    /* @__PURE__ */ u("div", { ref: v, className: "footnote-editor tw:grid tw:max-w-full tw:gap-[12px]", children: [
      /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-wrap tw:gap-y-2", children: [
        /* @__PURE__ */ u("div", { className: "tw:flex tw:gap-4", children: [
          /* @__PURE__ */ a(
            Tu,
            {
              isTypeSwitchable: R,
              noteType: U,
              handleNoteTypeChange: he,
              localizedStrings: d
            }
          ),
          /* @__PURE__ */ a(
            Nu,
            {
              callerType: x,
              customCaller: E,
              updateCaller: pe,
              localizedStrings: d
            }
          )
        ] }),
        /* @__PURE__ */ a("div", { className: "tw:flex tw:flex-1 tw:justify-end", children: /* @__PURE__ */ u(za, { children: [
          /* @__PURE__ */ a(
            vu,
            {
              onUndoClick: () => {
                var D;
                return (D = h.current) == null ? void 0 : D.undo();
              },
              onRedoClick: () => {
                var D;
                return (D = h.current) == null ? void 0 : D.redo();
              },
              canUndo: !G,
              canRedo: ot,
              localizedStrings: d
            }
          ),
          /* @__PURE__ */ a(
            os,
            {
              onCancelClick: o,
              onAcceptClick: Qt,
              canAccept: !G || T !== x || x === "custom" && E !== A,
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
              bu,
              {
                editorRef: h,
                canUndo: !G,
                canRedo: ot,
                children: /* @__PURE__ */ a(
                  ad,
                  {
                    options: lt,
                    onStateChange: se,
                    onUsjChange: bt,
                    defaultUsj: Au,
                    onScrRefChange: () => {
                    },
                    scrRef: n,
                    ref: h
                  }
                )
              }
            ) }),
            /* @__PURE__ */ a("div", { className: "tw:absolute tw:bottom-0 tw:right-0", children: /* @__PURE__ */ a(zt, { children: /* @__PURE__ */ u(kt, { children: [
              /* @__PURE__ */ a(_t, { asChild: !0, children: /* @__PURE__ */ a(
                tt,
                {
                  "aria-label": ke,
                  onClick: Ut,
                  className: "tw:h-6 tw:w-6",
                  variant: "ghost",
                  size: "icon",
                  children: /* @__PURE__ */ a(ii, {})
                }
              ) }),
              /* @__PURE__ */ a(Nt, { children: /* @__PURE__ */ a("p", { children: ke }) })
            ] }) }) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ u(lr, { open: Q, children: [
      /* @__PURE__ */ a(Vs, { virtualRef: L.virtualRef }),
      /* @__PURE__ */ a(
        dr,
        {
          className: "tw:w-[500px] tw:p-0",
          onClick: (D) => {
            D.preventDefault(), D.stopPropagation();
          },
          children: /* @__PURE__ */ a(
            Ou,
            {
              markerMenuItems: Dt,
              localizedStrings: d,
              searchRef: mt
            }
          )
        }
      )
    ] })
  ] });
}
const Hh = Object.freeze([
  ...Su,
  ...Object.entries(ga).map(([, t]) => t.description).filter((t) => !!t),
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
  ...mu,
  ...as
]);
function $u(t, e, r = !0, o = void 0) {
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
        Jo(t, c, r, !0, n),
        l && o
      ] }, `para-${d}`)
    );
  });
}
function Jo(t, e, r = !0, o = !0, n = []) {
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
              /* @__PURE__ */ a(ho, { className: "tw:h-4 tw:w-4 tw:fill-destructive" }),
              /* @__PURE__ */ a("span", { children: s }),
              /* @__PURE__ */ a(ho, { className: "tw:h-4 tw:w-4 tw:fill-destructive" })
            ]
          },
          c
        );
      }
      return Vu(s, c, r, [
        ...n,
        t ?? "unknown"
      ]);
    });
}
function Vu(t, e, r, o = []) {
  const { marker: n } = t;
  return /* @__PURE__ */ u("span", { children: [
    n ? r && /* @__PURE__ */ a("span", { className: "marker", children: `\\${n} ` }) : /* @__PURE__ */ a(
      ho,
      {
        className: "tw:text-error tw:mr-1 tw:inline-block tw:h-4 tw:w-4",
        "aria-label": "Missing marker"
      }
    ),
    Jo(n, t.content, r, !0, [
      ...o,
      n ?? "unknown"
    ])
  ] }, e);
}
function Lu({
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
  ] }), h = i && /* @__PURE__ */ u(ht, { children: [
    Jo(t.marker, [i], o, !1),
    " "
  ] }), f = !!d, v = !!w, x = !!p, g = e === "horizontal" ? "horizontal" : "vertical", T = o ? "marker-visible" : "", k = e === "horizontal" ? "tw:col-span-1" : "tw:col-span-2 tw:col-start-1 tw:row-start-2", E = b(g, T);
  return /* @__PURE__ */ u(ht, { children: [
    /* @__PURE__ */ u("div", { className: b("textual-note-header tw:col-span-1 tw:w-fit tw:text-nowrap", E), children: [
      d,
      f && (v || x) && " ",
      w,
      v && x && " ",
      p
    ] }),
    /* @__PURE__ */ a("div", { className: b("textual-note-header tw:col-span-1 tw:w-fit tw:text-nowrap", E), children: h }),
    /* @__PURE__ */ a(
      "div",
      {
        className: b(
          "textual-note-body tw:flex tw:flex-col tw:gap-1",
          k,
          E
        ),
        children: c && c.length > 0 && /* @__PURE__ */ a(ht, { children: $u(t.marker, c, o, l) })
      }
    )
  ] });
}
function qh({
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
  const p = l ?? Vc(r, void 0), h = (C, A) => {
    w == null || w(C, A, n);
  }, f = s ? r.findIndex((C) => C === s) : -1, [v, x] = N(f), g = (C, A, j) => {
    if (r.length)
      switch (C.key) {
        case "Enter":
        case " ":
          C.preventDefault(), w == null || w(A, j, n);
          break;
      }
  }, T = (C) => {
    if (r.length)
      switch (C.key) {
        case "ArrowDown":
          C.preventDefault(), x((A) => Math.min(A + 1, r.length - 1));
          break;
        case "ArrowUp":
          C.preventDefault(), x((A) => Math.max(A - 1, 0));
          break;
      }
  }, k = V([]);
  Z(() => {
    var C;
    v >= 0 && v < k.current.length && ((C = k.current[v]) == null || C.focus());
  }, [v]);
  const E = s ? r.findIndex((C) => C === s) : -1;
  return Z(() => {
    var C;
    E < 0 || E >= k.current.length || (C = k.current[E]) == null || C.scrollIntoView({ block: "nearest" });
  }, [E, i]), /* @__PURE__ */ a(
    "div",
    {
      role: "listbox",
      "aria-label": "Footnotes",
      tabIndex: v < 0 ? 0 : -1,
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
          children: r.map((C, A) => {
            const j = C === s, U = `${n}-${A}`;
            return (
              // The key belongs on the outermost node returned from the map — the Fragment — not on
              // the `<li>` nested inside it, which leaves the Fragment itself unkeyed.
              /* @__PURE__ */ u(Zt.Fragment, { children: [
                /* @__PURE__ */ a(
                  "li",
                  {
                    ref: (z) => {
                      k.current[A] = z;
                    },
                    role: "option",
                    "aria-selected": j,
                    "data-marker": C.marker,
                    "data-state": j ? "selected" : void 0,
                    tabIndex: A === v ? 0 : -1,
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
                    onClick: () => h(C, A),
                    onKeyDown: (z) => g(z, C, A),
                    children: /* @__PURE__ */ a(
                      Lu,
                      {
                        footnote: C,
                        layout: o,
                        formatCaller: () => p(C.caller, A),
                        showMarkers: c
                      }
                    )
                  }
                ),
                A < r.length - 1 && o === "vertical" && /* @__PURE__ */ a(qr, { tabIndex: -1, className: "tw:col-span-2" })
              ] }, U)
            );
          })
        }
      )
    }
  );
}
function Bu(t) {
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
  const n = r["%webView_inventory_occurrences_table_header_reference%"], s = r["%webView_inventory_occurrences_table_header_occurrence%"], i = P(() => {
    const c = [], d = /* @__PURE__ */ new Set();
    return t.forEach((l) => {
      const w = `${l.reference.book}:${l.reference.chapterNum}:${l.reference.verseNum}:${l.text}`;
      d.has(w) || (d.add(w), c.push(l));
    }), c;
  }, [t]);
  return /* @__PURE__ */ u(Io, { stickyHeader: !0, children: [
    /* @__PURE__ */ a(zo, { stickyHeader: !0, children: /* @__PURE__ */ u(We, { children: [
      /* @__PURE__ */ a(Na, { children: n }),
      /* @__PURE__ */ a(Na, { children: s })
    ] }) }),
    /* @__PURE__ */ a(Po, { children: i.length > 0 && i.map((c) => /* @__PURE__ */ u(
      We,
      {
        onClick: () => {
          e(c.reference);
        },
        children: [
          /* @__PURE__ */ a(yr, { children: $e(c.reference, "English") }),
          /* @__PURE__ */ a(yr, { className: o, children: Bu(c.text) })
        ]
      },
      `${c.reference.book} ${c.reference.chapterNum}:${c.reference.verseNum}-${c.text}`
    )) })
  ] });
}
function ds({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    fn.Root,
    {
      "data-slot": "checkbox",
      className: b(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:peer tw:relative tw:flex tw:size-4 tw:shrink-0 tw:items-center tw:justify-center tw:rounded-[4px] tw:border tw:border-input tw:transition-colors tw:outline-none tw:group-has-disabled/field:opacity-50 tw:after:absolute tw:after:-inset-x-3 tw:after:-inset-y-2 tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:aria-invalid:aria-checked:border-primary tw:dark:bg-input/30 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40 tw:data-checked:border-primary tw:data-checked:bg-primary tw:data-checked:text-primary-foreground tw:dark:data-checked:bg-primary",
        t
      ),
      ...e,
      children: /* @__PURE__ */ a(
        fn.Indicator,
        {
          "data-slot": "checkbox-indicator",
          className: "tw:grid tw:place-content-center tw:text-current tw:transition-none tw:[&>svg]:size-3.5",
          children: /* @__PURE__ */ a($a, {})
        }
      )
    }
  );
}
const Fu = (t) => {
  if (t === "asc")
    return /* @__PURE__ */ a(yc, { className: "tw:h-4 tw:w-4" });
  if (t === "desc")
    return /* @__PURE__ */ a(kc, { className: "tw:h-4 tw:w-4" });
}, ja = (t, e, r) => /* @__PURE__ */ a(zt, { children: /* @__PURE__ */ u(kt, { children: [
  /* @__PURE__ */ u(
    _t,
    {
      className: b("tw:flex tw:w-full tw:justify-start", r),
      variant: "ghost",
      onClick: () => t.toggleSorting(void 0),
      children: [
        /* @__PURE__ */ a("span", { className: "tw:w-6 tw:max-w-fit tw:flex-1 tw:overflow-hidden tw:text-ellipsis", children: e }),
        Fu(t.getIsSorted())
      ]
    }
  ),
  /* @__PURE__ */ a(Nt, { side: "bottom", children: e })
] }) }), Gh = (t) => ({
  accessorKey: "item",
  accessorFn: (e) => e.items[0],
  header: ({ column: e }) => ja(e, t)
}), Uu = (t, e) => ({
  accessorKey: `item${e}`,
  accessorFn: (r) => r.items[e],
  header: ({ column: r }) => ja(r, t)
}), Wh = (t) => ({
  accessorKey: "count",
  header: ({ column: e }) => ja(e, t, "tw:justify-end"),
  cell: ({ row: e }) => /* @__PURE__ */ a("div", { className: "tw:flex tw:justify-end tw:tabular-nums", children: e.getValue("count") })
}), io = (t, e, r, o, n, s) => {
  let i = [...r];
  t.forEach((d) => {
    e === "approved" ? i.includes(d) || i.push(d) : i = i.filter((l) => l !== d);
  }), o(i);
  let c = [...n];
  t.forEach((d) => {
    e === "unapproved" ? c.includes(d) || c.push(d) : c = c.filter((l) => l !== d);
  }), s(c);
}, Yh = (t, e, r, o, n) => ({
  accessorKey: "status",
  header: ({ column: s }) => ja(s, t, "tw:justify-center"),
  cell: ({ row: s }) => {
    const i = s.getValue("status"), c = s.getValue("item");
    return (
      // Center the status buttons in the cell to match the centered status column header (the
      // ToggleGroup would otherwise sit left-aligned).
      /* @__PURE__ */ a("div", { className: "tw:flex tw:justify-center", children: /* @__PURE__ */ u(Yn, { value: i, variant: "outline", type: "single", className: "tw:gap-0", children: [
        /* @__PURE__ */ a(
          pa,
          {
            onClick: (d) => {
              d.stopPropagation(), io(
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
            children: /* @__PURE__ */ a(vc, {})
          }
        ),
        /* @__PURE__ */ a(
          pa,
          {
            onClick: (d) => {
              d.stopPropagation(), io(
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
            children: /* @__PURE__ */ a(bc, {})
          }
        ),
        /* @__PURE__ */ a(
          pa,
          {
            onClick: (d) => {
              d.stopPropagation(), io(
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
            children: /* @__PURE__ */ a(xc, {})
          }
        )
      ] }) })
    );
  }
}), Zh = (t) => t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g), Xh = (t) => {
  const e = /^\\[vc]\s+(\d+)/, r = t.match(e);
  if (r)
    return +r[1];
}, Jh = (t) => {
  const e = t.match(/^\\id\s+([A-Za-z]+)/);
  return e ? e[1] : "";
}, Ku = (t, e, r) => r.includes(t) ? "unapproved" : e.includes(t) ? "approved" : "unknown", Qh = Object.freeze([
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
]), Hu = (t, e, r) => {
  let o = t;
  return e !== "all" && (o = o.filter(
    (n) => e === "approved" && n.status === "approved" || e === "unapproved" && n.status === "unapproved" || e === "unknown" && n.status === "unknown"
  )), r !== "" && (o = o.filter((n) => n.items[0].includes(r))), o;
}, qu = (t, e, r) => t.map((o) => {
  const n = dn(o.key) ? o.key : o.key[0];
  return {
    items: dn(o.key) ? [o.key] : o.key,
    count: o.count,
    status: o.status || Ku(n, e, r),
    occurrences: o.occurrences || []
  };
}), Ee = (t, e) => t[e] ?? e;
function tg({
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
  const f = Ee(r, "%webView_inventory_all%"), v = Ee(r, "%webView_inventory_approved%"), x = Ee(r, "%webView_inventory_unapproved%"), g = Ee(r, "%webView_inventory_unknown%"), T = Ee(r, "%webView_inventory_scope_currentBook%"), k = Ee(r, "%webView_inventory_scope_chapter%"), E = Ee(r, "%webView_inventory_scope_verse%"), C = Ee(r, "%webView_inventory_filter_text%"), A = Ee(
    r,
    "%webView_inventory_show_additional_items%"
  ), j = Ee(r, "%webView_inventory_no_results%"), [U, z] = N(!1), [R, O] = N("all"), [G, W] = N(""), [ot, y] = N([]), et = P(() => {
    const K = t ?? [];
    return K.length === 0 ? [] : qu(K, n, s);
  }, [t, n, s]), M = P(() => {
    if (U) return et;
    const K = [];
    return et.forEach((gt) => {
      const vt = gt.items[0], lt = K.find(
        (Dt) => Dt.items[0] === vt
      );
      lt ? (lt.count += gt.count, lt.occurrences = lt.occurrences.concat(gt.occurrences)) : K.push({
        items: [vt],
        count: gt.count,
        occurrences: gt.occurrences,
        status: gt.status
      });
    }), K;
  }, [U, et]), Q = P(() => M.length === 0 ? [] : Hu(M, R, G), [M, R, G]), Y = P(() => {
    var vt, lt;
    if (!U) return d;
    const K = (vt = o == null ? void 0 : o.tableHeaders) == null ? void 0 : vt.length;
    if (!K) return d;
    const gt = [];
    for (let Dt = 0; Dt < K; Dt++)
      gt.push(
        Uu(
          ((lt = o == null ? void 0 : o.tableHeaders) == null ? void 0 : lt[Dt]) || "Additional Item",
          Dt + 1
        )
      );
    return [...gt, ...d];
  }, [o == null ? void 0 : o.tableHeaders, d, U]);
  Z(() => {
    Q.length === 0 ? y([]) : Q.length === 1 && y(Q[0].items);
  }, [Q]);
  const L = (K, gt) => {
    gt.setRowSelection(() => {
      const lt = {};
      return lt[K.index] = !0, lt;
    });
    const vt = K.original.items;
    y(vt), h && vt.length > 0 && h(vt[0]);
  }, X = (K) => {
    if (K === "book" || K === "chapter" || K === "verse")
      c(K);
    else
      throw new Error(`Invalid scope value: ${K}`);
  }, ut = (K) => {
    if (K === "all" || K === "approved" || K === "unapproved" || K === "unknown")
      O(K);
    else
      throw new Error(`Invalid status filter value: ${K}`);
  }, mt = P(() => {
    if (M.length === 0 || ot.length === 0) return [];
    const K = M.filter((gt) => Lc(
      U ? gt.items : [gt.items[0]],
      ot
    ));
    if (K.length > 1) throw new Error("Selected item is not unique");
    return K.length === 0 ? [] : K[0].occurrences;
  }, [ot, U, M]);
  return /* @__PURE__ */ a("div", { id: l, className: "pr-twp tw:h-full tw:overflow-auto", children: /* @__PURE__ */ u("div", { className: "tw:flex tw:h-full tw:w-full tw:min-w-min tw:flex-col", children: [
    /* @__PURE__ */ u("div", { className: "tw:flex tw:items-stretch", style: { contain: "inline-size" }, children: [
      /* @__PURE__ */ u(
        Cr,
        {
          onValueChange: (K) => ut(K),
          defaultValue: R,
          children: [
            /* @__PURE__ */ a(Tr, { className: "tw:m-1 tw:w-auto tw:flex-1", children: /* @__PURE__ */ a(Er, { placeholder: "Select filter" }) }),
            /* @__PURE__ */ u(Sr, { children: [
              /* @__PURE__ */ a(ve, { value: "all", children: f }),
              /* @__PURE__ */ a(ve, { value: "approved", children: v }),
              /* @__PURE__ */ a(ve, { value: "unapproved", children: x }),
              /* @__PURE__ */ a(ve, { value: "unknown", children: g })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ u(Cr, { onValueChange: (K) => X(K), defaultValue: i, children: [
        /* @__PURE__ */ a(Tr, { className: "tw:m-1 tw:w-auto tw:flex-1", children: /* @__PURE__ */ a(Er, { placeholder: "Select scope" }) }),
        /* @__PURE__ */ u(Sr, { children: [
          /* @__PURE__ */ a(ve, { value: "book", children: T }),
          /* @__PURE__ */ a(ve, { value: "chapter", children: k }),
          /* @__PURE__ */ a(ve, { value: "verse", children: E })
        ] })
      ] }),
      /* @__PURE__ */ a(
        Aa,
        {
          className: "tw:m-1 tw:flex-1 tw:rounded-md tw:border",
          placeholder: C,
          value: G,
          onChange: (K) => {
            W(K.target.value);
          }
        }
      ),
      o && /* @__PURE__ */ a(zt, { children: /* @__PURE__ */ u(kt, { children: [
        /* @__PURE__ */ a(_t, { asChild: !0, children: /* @__PURE__ */ u("div", { className: "tw:m-1 tw:flex tw:w-fit tw:min-w-[26px] tw:items-center tw:rounded-md tw:border", children: [
          /* @__PURE__ */ a(
            ds,
            {
              className: "tw:m-1 tw:shrink-0",
              checked: U,
              onCheckedChange: (K) => {
                z(K);
              }
            }
          ),
          /* @__PURE__ */ a(It, { className: "tw:m-1 tw:truncate", children: (o == null ? void 0 : o.checkboxText) ?? A })
        ] }) }),
        /* @__PURE__ */ a(Nt, { children: (o == null ? void 0 : o.checkboxText) ?? A })
      ] }) })
    ] }),
    /* @__PURE__ */ a("div", { className: "tw:m-1 tw:flex-1 tw:overflow-auto tw:rounded-md tw:border", children: /* @__PURE__ */ a(
      uu,
      {
        columns: Y,
        data: Q,
        onRowClickHandler: L,
        stickyHeader: !0,
        isLoading: w,
        noResultsMessage: j
      }
    ) }),
    mt.length > 0 && /* @__PURE__ */ a("div", { className: "tw:m-1 tw:flex-1 tw:overflow-auto tw:rounded-md tw:border", children: /* @__PURE__ */ a(
      ju,
      {
        classNameForText: p,
        occurrenceData: mt,
        setScriptureReference: e,
        localizedStrings: r
      }
    ) })
  ] }) });
}
const Gu = "16rem", Wu = "3rem", ws = Zt.createContext(void 0);
function Fa() {
  const t = Zt.useContext(ws);
  if (!t)
    throw new Error("useSidebar must be used within a SidebarProvider.");
  return t;
}
function Yu({
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
  const [d, l] = Zt.useState(t), w = e ?? d, p = Zt.useCallback(
    (E) => {
      const C = typeof E == "function" ? E(w) : E;
      r ? r(C) : l(C);
    },
    [r, w]
  ), h = Zt.useCallback(() => p((E) => !E), [p]), f = w ? "expanded" : "collapsed", g = Oe() === "ltr" ? i : i === "primary" ? "secondary" : "primary", T = Zt.useMemo(
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
  ), k = {
    "--sidebar-width": Gu,
    "--sidebar-width-icon": Wu,
    ...n
  };
  return /* @__PURE__ */ a(ws.Provider, { value: T, children: /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "sidebar-wrapper",
      style: k,
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
function Zu({
  // CUSTOM: Removed 'side' prop from Sidebar - it is now read from context (moved to SidebarProvider)
  variant: t = "sidebar",
  collapsible: e = "offcanvas",
  className: r,
  children: o,
  ...n
}) {
  const s = Fa();
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
function eg({ className: t, onClick: e, ...r }) {
  const { toggleSidebar: o, side: n } = Fa();
  return /* @__PURE__ */ u(
    tt,
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
        n === "primary" ? /* @__PURE__ */ a(Gc, {}) : /* @__PURE__ */ a(Wc, {}),
        /* @__PURE__ */ a("span", { className: "tw:sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
}
function rg({ className: t, ...e }) {
  const { toggleSidebar: r } = Fa();
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
function Xu({ className: t, ...e }) {
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
function ag({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    Aa,
    {
      "data-slot": "sidebar-input",
      "data-sidebar": "input",
      className: b("tw:h-8 tw:w-full tw:bg-background tw:shadow-none", t),
      ...e
    }
  );
}
function og({ className: t, ...e }) {
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
function ng({ className: t, ...e }) {
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
function ig({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    qr,
    {
      "data-slot": "sidebar-separator",
      "data-sidebar": "separator",
      className: b("tw:mx-2 tw:w-auto tw:bg-sidebar-border", t),
      ...e
    }
  );
}
function Ju({ className: t, ...e }) {
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
function Fn({ className: t, ...e }) {
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
function Un({
  className: t,
  asChild: e = !1,
  ...r
}) {
  const o = e ? ta.Root : "div";
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
function sg({
  className: t,
  asChild: e = !1,
  ...r
}) {
  const o = e ? ta.Root : "button";
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
function Kn({ className: t, ...e }) {
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
function Qu({ className: t, ...e }) {
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
function tp({ className: t, ...e }) {
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
const ep = Ri(
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
function rp({
  asChild: t = !1,
  isActive: e = !1,
  variant: r = "default",
  size: o = "default",
  tooltip: n,
  className: s,
  ...i
}) {
  const c = t ? ta.Root : "button", { state: d } = Fa(), l = /* @__PURE__ */ a(
    c,
    {
      "data-slot": "sidebar-menu-button",
      "data-sidebar": "menu-button",
      "data-size": o,
      "data-active": e,
      className: b(ep({ variant: r, size: o }), s),
      ...i
    }
  );
  return n ? /* @__PURE__ */ u(kt, { children: [
    /* @__PURE__ */ a(_t, { asChild: !0, children: l }),
    /* @__PURE__ */ a(
      Nt,
      {
        side: "right",
        align: "center",
        hidden: d !== "collapsed",
        ...typeof n == "string" ? { children: n } : n
      }
    )
  ] }) : l;
}
function cg({
  className: t,
  asChild: e = !1,
  showOnHover: r = !1,
  ...o
}) {
  const n = e ? ta.Root : "button";
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
function lg({ className: t, ...e }) {
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
function dg({
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
      className: b("tw:flex tw:h-8 tw:items-center tw:gap-2 tw:rounded-md tw:px-2", t),
      ...r,
      children: [
        e && /* @__PURE__ */ a(xr, { className: "tw:size-4 tw:rounded-md", "data-sidebar": "menu-skeleton-icon" }),
        /* @__PURE__ */ a(
          xr,
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
function wg({ className: t, ...e }) {
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
function ug({ className: t, ...e }) {
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
function pg({
  asChild: t = !1,
  size: e = "md",
  isActive: r = !1,
  className: o,
  ...n
}) {
  const s = t ? ta.Root : "a";
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
function ap({
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
  const p = $(
    (g, T) => {
      o(g, T);
    },
    [o]
  ), h = $(
    (g) => {
      const T = r.find((k) => k.projectId === g);
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
  ), v = P(() => {
    const g = {
      buttonPlaceholder: c,
      ariaLabel: i
    };
    return d && (g.searchPlaceholder = d), l && (g.commandEmptyMessage = l), g;
  }, [c, i, d, l]), x = $(
    (g) => !n.projectId && g === n.label,
    [n]
  );
  return /* @__PURE__ */ a(
    Zu,
    {
      id: t,
      collapsible: "none",
      variant: "inset",
      className: b("tw:w-96 tw:gap-2 tw:overflow-y-auto", w),
      children: /* @__PURE__ */ u(Ju, { children: [
        /* @__PURE__ */ u(Fn, { children: [
          /* @__PURE__ */ a(Un, { className: "tw:text-sm", children: s }),
          /* @__PURE__ */ a(Kn, { children: /* @__PURE__ */ a(Qu, { children: Object.entries(e).map(([g, T]) => /* @__PURE__ */ a(tp, { children: /* @__PURE__ */ a(
            rp,
            {
              onClick: () => p(g),
              isActive: x(g),
              children: /* @__PURE__ */ a("span", { className: "tw:pl-3", children: T })
            }
          ) }, g)) }) })
        ] }),
        /* @__PURE__ */ u(Fn, { children: [
          /* @__PURE__ */ a(Un, { className: "tw:text-sm", children: i }),
          /* @__PURE__ */ a(Kn, { className: "tw:pl-3", children: /* @__PURE__ */ u(
            "div",
            {
              className: b(
                "tw:flex tw:w-full tw:items-center tw:gap-2 tw:rounded-md tw:px-2 tw:py-1",
                {
                  "tw:bg-sidebar-accent tw:text-sidebar-accent-foreground": n == null ? void 0 : n.projectId
                }
              ),
              children: [
                /* @__PURE__ */ a(_c, { className: "tw:h-4 tw:w-4 tw:shrink-0" }),
                /* @__PURE__ */ a(
                  Bs,
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
                    localizedStrings: v
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
function hg({
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
      Qn,
      {
        className: "tw:w-9/12",
        value: r,
        onSearch: o,
        placeholder: "Search app settings, extension settings, and project settings"
      }
    ) }),
    /* @__PURE__ */ u(
      Yu,
      {
        id: t,
        className: "tw:h-full tw:flex-1 tw:gap-4 tw:overflow-auto tw:border-t",
        children: [
          /* @__PURE__ */ a(
            ap,
            {
              className: b("tw:w-1/2 tw:min-w-[140px] tw:max-w-[220px] tw:border-e", n),
              ...s
            }
          ),
          /* @__PURE__ */ a(Xu, { className: "tw:min-w-[215px]", children: e })
        ]
      }
    )
  ] });
}
const He = "scrBook", op = "scrRef", nr = "source", np = "details", ip = "Scripture Reference", sp = "Scripture Book", us = "Type", cp = "Details";
function lp(t, e) {
  const r = e ?? !1;
  return [
    {
      accessorFn: (o) => `${o.start.book} ${o.start.chapterNum}:${o.start.verseNum}`,
      id: He,
      header: (t == null ? void 0 : t.scriptureReferenceColumnName) ?? ip,
      cell: (o) => {
        const n = o.row.original;
        return o.row.getIsGrouped() ? jt.bookIdToEnglishName(n.start.book) : o.row.groupingColumnId === He ? $e(n.start) : void 0;
      },
      getGroupingValue: (o) => jt.bookIdToNumber(o.start.book),
      sortingFn: (o, n) => Ca(o.original.start, n.original.start),
      enableGrouping: !0
    },
    {
      accessorFn: (o) => $e(o.start),
      id: op,
      header: void 0,
      cell: (o) => {
        const n = o.row.original;
        return o.row.getIsGrouped() ? void 0 : $e(n.start);
      },
      sortingFn: (o, n) => Ca(o.original.start, n.original.start),
      enableGrouping: !1
    },
    {
      accessorFn: (o) => o.source.displayName,
      id: nr,
      header: r ? (t == null ? void 0 : t.typeColumnName) ?? us : void 0,
      cell: (o) => r || o.row.getIsGrouped() ? o.getValue() : void 0,
      getGroupingValue: (o) => o.source.id,
      sortingFn: (o, n) => o.original.source.displayName.localeCompare(n.original.source.displayName),
      enableGrouping: !0
    },
    {
      accessorFn: (o) => o.detail,
      id: np,
      header: (t == null ? void 0 : t.detailsColumnName) ?? cp,
      cell: (o) => o.getValue(),
      enableGrouping: !1
    }
  ];
}
const dp = (t) => {
  if (!("offset" in t.start))
    throw new Error("No offset available in range start");
  if (t.end && !("offset" in t.end))
    throw new Error("No offset available in range end");
  const { offset: e } = t.start;
  let r = 0;
  return t.end && ({ offset: r } = t.end), !t.end || Ca(t.start, t.end) === 0 ? `${Wa(t.start)}+${e}` : `${Wa(t.start)}+${e}-${Wa(t.end)}+${r}`;
}, Hn = (t) => `${dp({ start: t.start, end: t.end })} ${t.source.displayName} ${t.detail}`;
function gg({
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
  const [l, w] = N([]), [p, h] = N([{ id: He, desc: !1 }]), [f, v] = N({}), x = P(
    () => t.flatMap((R) => R.data.map((O) => ({
      ...O,
      source: R.source
    }))),
    [t]
  ), g = P(
    () => lp(
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
    l.includes(nr) ? h([
      { id: nr, desc: !1 },
      { id: He, desc: !1 }
    ]) : h([{ id: He, desc: !1 }]);
  }, [l]);
  const T = Ei({
    data: x,
    columns: g,
    state: {
      grouping: l,
      sorting: p,
      rowSelection: f
    },
    onGroupingChange: w,
    onSortingChange: h,
    onRowSelectionChange: v,
    getExpandedRowModel: Jl(),
    getGroupedRowModel: Xl(),
    getCoreRowModel: Si(),
    getSortedRowModel: Ti(),
    getRowId: Hn,
    autoResetExpanded: !1,
    enableMultiRowSelection: !1,
    enableSubRowSelection: !1
  });
  Z(() => {
    if (c) {
      const R = T.getSelectedRowModel().rowsById, O = Object.keys(R);
      if (O.length === 1) {
        const G = x.find((W) => Hn(W) === O[0]) || void 0;
        G && c(G);
      }
    }
  }, [f, x, c, T]);
  const k = n ?? sp, E = s ?? us, C = [
    { label: "No Grouping", value: [] },
    { label: `Group by ${k}`, value: [He] },
    { label: `Group by ${E}`, value: [nr] },
    {
      label: `Group by ${k} and ${E}`,
      value: [He, nr]
    },
    {
      label: `Group by ${E} and ${k}`,
      value: [nr, He]
    }
  ], A = (R) => {
    w(JSON.parse(R));
  }, j = (R, O) => {
    !R.getIsGrouped() && !R.getIsSelected() && R.getToggleSelectedHandler()(O);
  }, U = (R, O) => R.getIsGrouped() ? "" : b("banded-row", O % 2 === 0 ? "even" : "odd"), z = (R, O, G) => {
    if (!((R == null ? void 0 : R.length) === 0 || O.depth < G.column.getGroupedIndex())) {
      if (O.getIsGrouped())
        switch (O.depth) {
          case 1:
            return "tw:ps-4";
          default:
            return;
        }
      switch (O.depth) {
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
      Cr,
      {
        value: JSON.stringify(l),
        onValueChange: (R) => {
          A(R);
        },
        children: [
          /* @__PURE__ */ a(Tr, { className: "tw:mb-1 tw:mt-2", children: /* @__PURE__ */ a(Er, {}) }),
          /* @__PURE__ */ a(Sr, { position: "item-aligned", children: /* @__PURE__ */ a(cu, { children: C.map((R) => /* @__PURE__ */ a(ve, { value: JSON.stringify(R.value), children: R.label }, R.label)) }) })
        ]
      }
    ),
    /* @__PURE__ */ u(Io, { className: "tw:relative tw:flex tw:flex-col tw:overflow-y-auto tw:p-0", children: [
      e && /* @__PURE__ */ a(zo, { children: T.getHeaderGroups().map((R) => /* @__PURE__ */ a(We, { children: R.headers.filter((O) => O.column.columnDef.header).map((O) => (
        /* For sticky column headers to work, we probably need to change the default definition of the shadcn Table component. See https://github.com/shadcn-ui/ui/issues/1151 */
        /* @__PURE__ */ a(Na, { colSpan: O.colSpan, className: "tw:sticky top-0", children: O.isPlaceholder ? void 0 : /* @__PURE__ */ u("div", { children: [
          O.column.getCanGroup() ? /* @__PURE__ */ a(
            tt,
            {
              variant: "ghost",
              title: `Toggle grouping by ${O.column.columnDef.header}`,
              onClick: O.column.getToggleGroupingHandler(),
              type: "button",
              children: O.column.getIsGrouped() ? "🛑" : "👊 "
            }
          ) : void 0,
          " ",
          Fr(O.column.columnDef.header, O.getContext())
        ] }) }, O.id)
      )) }, R.id)) }),
      /* @__PURE__ */ a(Po, { children: T.getRowModel().rows.map((R, O) => {
        const G = Oe();
        return /* @__PURE__ */ a(
          We,
          {
            "data-state": R.getIsSelected() ? "selected" : "",
            className: b(U(R, O)),
            onClick: (W) => j(R, W),
            children: R.getVisibleCells().map((W) => {
              if (!(W.getIsPlaceholder() || W.column.columnDef.enableGrouping && !W.getIsGrouped() && (W.column.columnDef.id !== nr || !r)))
                return /* @__PURE__ */ a(
                  yr,
                  {
                    className: b(
                      W.column.columnDef.id,
                      "tw:p-[1px]",
                      z(l, R, W)
                    ),
                    children: W.getIsGrouped() ? /* @__PURE__ */ u(
                      tt,
                      {
                        variant: "link",
                        onClick: R.getToggleExpandedHandler(),
                        type: "button",
                        children: [
                          R.getIsExpanded() && /* @__PURE__ */ a(sr, {}),
                          !R.getIsExpanded() && (G === "ltr" ? /* @__PURE__ */ a(Nc, {}) : /* @__PURE__ */ a(Cc, {})),
                          " ",
                          Fr(W.column.columnDef.cell, W.getContext()),
                          " (",
                          R.subRows.length,
                          ")"
                        ]
                      }
                    ) : Fr(W.column.columnDef.cell, W.getContext())
                  },
                  W.id
                );
            })
          },
          R.id
        );
      }) })
    ] })
  ] });
}
function wp({
  availableBookInfo: t,
  selectedBookIds: e,
  onChangeSelectedBookIds: r,
  localizedStrings: o,
  localizedBookNames: n,
  disabledSectionExplanations: s
}) {
  const i = o["%webView_book_selector_books_selected%"], c = o["%webView_book_selector_select_books%"], d = o["%webView_book_selector_search_books%"], l = o["%webView_book_selector_select_all%"], w = o["%webView_book_selector_clear_all%"], p = o["%webView_book_selector_no_book_found%"], { otLong: h, ntLong: f, dcLong: v, extraLong: x } = {
    otLong: o == null ? void 0 : o["%scripture_section_ot_long%"],
    ntLong: o == null ? void 0 : o["%scripture_section_nt_long%"],
    dcLong: o == null ? void 0 : o["%scripture_section_dc_long%"],
    extraLong: o == null ? void 0 : o["%scripture_section_extra_long%"]
  }, [g, T] = N(!1), [k, E] = N(""), C = V(void 0), A = V(!1), j = P(
    () => ti(t),
    [t]
  ), U = P(() => {
    if (!k.trim()) {
      const M = {
        [Mt.OT]: [],
        [Mt.NT]: [],
        [Mt.DC]: [],
        [Mt.Extra]: []
      };
      return j.forEach((Q) => {
        const Y = ha(Q);
        M[Y].push(Q);
      }), M;
    }
    const y = j.filter(
      (M) => Ro(M, k, n)
    ), et = {
      [Mt.OT]: [],
      [Mt.NT]: [],
      [Mt.DC]: [],
      [Mt.Extra]: []
    };
    return y.forEach((M) => {
      const Q = ha(M);
      et[Q].push(M);
    }), et;
  }, [j, k, n]), z = $(
    (y, et = !1) => {
      if (!et || !C.current) {
        r(
          e.includes(y) ? e.filter((ut) => ut !== y) : [...e, y]
        ), C.current = y;
        return;
      }
      const M = j.findIndex((ut) => ut === C.current), Q = j.findIndex((ut) => ut === y);
      if (M === -1 || Q === -1) return;
      const [Y, L] = [
        Math.min(M, Q),
        Math.max(M, Q)
      ], X = j.slice(Y, L + 1).map((ut) => ut);
      r(
        e.includes(y) ? e.filter((ut) => !X.includes(ut)) : [.../* @__PURE__ */ new Set([...e, ...X])]
      );
    },
    [e, r, j]
  ), R = (y) => {
    z(y, A.current), A.current = !1;
  }, O = (y, et) => {
    y.preventDefault(), z(et, y.shiftKey);
  }, G = () => {
    r(j.map((y) => y));
  }, W = () => {
    r([]);
  }, ot = P(
    () => Object.values(Mt).filter(
      (y) => (s == null ? void 0 : s[y]) !== void 0 && Ao(j, y).length === 0
    ).map((y) => ({ section: y, explanation: s == null ? void 0 : s[y] })),
    [s, j]
  );
  return /* @__PURE__ */ u(
    lr,
    {
      open: g,
      onOpenChange: (y) => {
        T(y), y || E("");
      },
      children: [
        /* @__PURE__ */ a(Rr, { asChild: !0, children: /* @__PURE__ */ u(
          tt,
          {
            variant: "outline",
            role: "combobox",
            "aria-expanded": g,
            className: "tw:max-w-64 tw:justify-between",
            children: [
              e.length > 0 ? `${i}: ${e.length}` : c,
              /* @__PURE__ */ a(Ec, { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
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
                onKeyDown: (y) => {
                  y.key === "Enter" && (A.current = y.shiftKey);
                },
                children: [
                  /* @__PURE__ */ a(
                    Ia,
                    {
                      className: "tw:shrink-0",
                      placeholder: d,
                      value: k,
                      onValueChange: E,
                      spaceSelectsHighlightedItem: !0
                    }
                  ),
                  /* @__PURE__ */ u("div", { className: "tw:flex tw:shrink-0 tw:justify-between tw:border-b tw:p-2", children: [
                    /* @__PURE__ */ a(
                      tt,
                      {
                        variant: "ghost",
                        size: "sm",
                        onClick: G,
                        disabled: j.length === 0,
                        children: l
                      }
                    ),
                    /* @__PURE__ */ a(tt, { variant: "ghost", size: "sm", onClick: W, children: w })
                  ] }),
                  /* @__PURE__ */ u(ur, { className: "tw:max-h-72 tw:min-h-0 tw:flex-1", children: [
                    /* @__PURE__ */ a(Pa, { children: p }),
                    Object.values(Mt).filter((y) => U[y].length > 0).map((y, et) => {
                      const M = U[y];
                      return /* @__PURE__ */ u(Jr, { children: [
                        et > 0 && /* @__PURE__ */ a(Jn, { alwaysRender: !0 }),
                        /* @__PURE__ */ a(
                          Xe,
                          {
                            heading: Wn(y, h, f, v, x),
                            children: M.map((Q) => /* @__PURE__ */ a(
                              Di,
                              {
                                bookId: Q,
                                isSelected: e.includes(Q),
                                onSelect: () => R(Q),
                                onMouseDown: (Y) => O(Y, Q),
                                section: ha(Q),
                                showCheck: !0,
                                localizedBookNames: n,
                                commandValue: yo(Q, n),
                                className: "tw:flex tw:items-center"
                              },
                              Q
                            ))
                          }
                        )
                      ] }, y);
                    })
                  ] }),
                  ot.length > 0 && /* @__PURE__ */ a("div", { className: "tw:shrink-0 tw:border-t tw:p-2", children: ot.map(({ section: y, explanation: et }) => /* @__PURE__ */ a("p", { className: "tw:text-xs tw:text-muted-foreground", children: et }, y)) })
                ]
              }
            )
          }
        )
      ]
    }
  );
}
function up({
  disabled: t,
  tooltipText: e,
  children: r,
  className: o
}) {
  return /* @__PURE__ */ a(zt, { children: /* @__PURE__ */ u(kt, { children: [
    /* @__PURE__ */ a(_t, { asChild: !0, children: /* @__PURE__ */ a(
      Yr,
      {
        className: o,
        isDisabled: t,
        disabledExplanation: e,
        children: r
      }
    ) }),
    t && /* @__PURE__ */ a(Nt, { children: /* @__PURE__ */ a("p", { className: "tw:max-w-xs tw:whitespace-pre-line", children: e }) })
  ] }) });
}
function pp({
  section: t,
  availableBookIds: e,
  selectedBookIds: r,
  onToggle: o,
  localizedStrings: n,
  disabledExplanation: s
}) {
  const i = Ao(e, t).length === 0, c = n["%scripture_section_ot_short%"], d = n["%scripture_section_nt_short%"], l = n["%scripture_section_dc_short%"], w = n["%scripture_section_extra_short%"], p = /* @__PURE__ */ a(
    tt,
    {
      variant: "outline",
      size: "sm",
      onClick: () => o(t),
      className: b(
        ei(e, t, r) && !i && "tw:bg-primary tw:text-primary-foreground tw:hover:bg-primary/70 tw:hover:text-primary-foreground"
      ),
      disabled: i,
      children: js(
        t,
        c,
        d,
        l,
        w
      )
    }
  );
  return s ? /* @__PURE__ */ a(
    up,
    {
      className: "tw:flex",
      disabled: i,
      tooltipText: s,
      children: p
    }
  ) : p;
}
const qn = 5, so = 6;
function hp({
  availableBookInfo: t,
  selectedBookIds: e,
  onChangeSelectedBookIds: r,
  localizedStrings: o,
  localizedBookNames: n,
  disabledSectionExplanations: s
}) {
  const i = o["%webView_book_selector_more%"], c = P(
    () => ti(t),
    [t]
  ), d = $(
    (l) => {
      const w = Ao(c, l).map((p) => p);
      r(
        ei(c, l, e) ? e.filter((p) => !w.includes(p)) : [.../* @__PURE__ */ new Set([...e, ...w])]
      );
    },
    [e, r, c]
  );
  return /* @__PURE__ */ u("div", { className: "tw:space-y-2", children: [
    /* @__PURE__ */ a("div", { className: "tw:flex tw:flex-wrap tw:gap-2", children: Object.values(Mt).map((l) => /* @__PURE__ */ a(
      pp,
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
      wp,
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
        e.length === so ? so : qn
      ).map((l) => /* @__PURE__ */ a(Hr, { className: "tw:hover:bg-secondary", variant: "secondary", children: Ae(l, n) }, l)),
      e.length > so && /* @__PURE__ */ a(
        Hr,
        {
          className: "tw:hover:bg-secondary",
          variant: "secondary",
          children: `+${e.length - qn} ${i}`
        }
      )
    ] })
  ] });
}
const gp = Object.freeze([
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
]), fg = Object.freeze([
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
  ...gp
]), Bt = (t, e) => t[e] ?? e, fp = Object.freeze([" ", "-"]);
function mg({
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
  onRangeStartChange: v,
  onRangeEndChange: x,
  currentScrRef: g,
  onCurrentScrRefChange: T,
  bookChapterControlLocalizedStrings: k,
  getEndVerse: E,
  hideLabel: C = !1,
  buttonClassName: A
}) {
  const j = Bt(
    i,
    "%webView_scope_selector_selected_text%"
  ), U = Bt(i, "%webView_scope_selector_verse%"), z = Bt(i, "%webView_scope_selector_chapter%"), R = Bt(i, "%webView_scope_selector_book%"), O = Bt(
    i,
    "%webView_scope_selector_current_verse%"
  ), G = Bt(
    i,
    "%webView_scope_selector_current_chapter%"
  ), W = Bt(i, "%webView_scope_selector_current_book%"), ot = Bt(i, "%webView_scope_selector_choose_books%"), y = Bt(i, "%webView_scope_selector_scope%"), et = Bt(i, "%webView_scope_selector_select_books%"), M = Bt(i, "%webView_scope_selector_range%"), Q = Bt(i, "%webView_scope_selector_select_range%"), Y = Bt(i, "%webView_scope_selector_range_start%"), L = Bt(i, "%webView_scope_selector_range_end%"), X = Bt(i, "%webView_scope_selector_ok%"), ut = Bt(i, "%webView_scope_selector_cancel%"), mt = Bt(i, "%webView_scope_selector_navigate%"), K = (F) => {
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
  }, gt = [
    { value: "selectedText", label: j, id: "scope-selected-text" },
    {
      value: "verse",
      label: U,
      dropdownLabel: O,
      scrRefSuffix: K("verse"),
      id: "scope-verse"
    },
    {
      value: "chapter",
      label: z,
      dropdownLabel: G,
      scrRefSuffix: K("chapter"),
      id: "scope-chapter"
    },
    {
      value: "book",
      label: R,
      dropdownLabel: W,
      scrRefSuffix: K("book"),
      id: "scope-book"
    },
    { value: "selectedBooks", label: ot, id: "scope-selected" },
    { value: "range", label: M, id: "scope-range" }
  ], vt = (F, rt, Pt = !1) => /* @__PURE__ */ u(ht, { children: [
    F,
    rt && !Pt && /* @__PURE__ */ u("span", { className: "tw:text-muted-foreground", children: [
      ": ",
      rt
    ] })
  ] }), lt = e ? gt.filter((F) => e.includes(F.value)) : gt, Dt = g ?? Ya, xt = h ?? Dt, Ot = f ?? Dt, xe = () => {
  }, Qt = V(null), $t = V(null), Ct = V(!1), Ut = V(null), pe = V(!1), [he, se] = N(void 0), bt = V(!1), oe = V(!1), ce = V(null), ye = $((F) => {
    if (F) {
      se("start"), bt.current = !1;
      return;
    }
    se((rt) => rt === "start" ? void 0 : rt), bt.current && (bt.current = !1, requestAnimationFrame(() => {
      var Pt;
      const rt = (Pt = Qt.current) == null ? void 0 : Pt.querySelector("button");
      rt == null || rt.click();
    }));
  }, []), te = $((F) => {
    if (F) {
      se("end"), oe.current = !1;
      return;
    }
    se((rt) => rt === "end" ? void 0 : rt);
  }, []), ne = $(
    (F) => {
      v == null || v(F), x == null || x(F), bt.current = !0;
    },
    [v, x]
  ), ke = $(
    (F) => {
      x == null || x(F), oe.current = !0;
    },
    [x]
  ), Tt = $(
    (F) => {
      r(F), F === "selectedBooks" && n.length === 0 && (g != null && g.book) && s([g.book]);
    },
    [r, n, g, s]
  ), D = lt.find((F) => F.value === t), H = () => t === "selectedBooks" && n.length > 0 ? n.map((F) => F.toUpperCase()).join(", ") : t === "range" ? Bc(xt, Ot, {
    optionOrLocalizedBookName: "id",
    endRefOptionOrLocalizedBookName: "id",
    repeatBookName: !0
  }) : D ? vt(D.label, D.scrRefSuffix) : t, _ = lt.filter(
    (F) => F.value !== "selectedBooks" && F.value !== "range"
  ), I = lt.find((F) => F.value === "selectedBooks"), J = lt.find((F) => F.value === "range"), [B, at] = N(!1), [dt, ct] = N(void 0), [pt, Et] = N(void 0), [Rt, yt] = N(void 0), [ge, Kt] = N(void 0), [Vt, Ue] = N([]), _e = p === "dropdown" && dt === "selectedBooks", Ne = /* @__PURE__ */ a(
    hp,
    {
      availableBookInfo: o,
      selectedBookIds: _e ? Vt : n,
      onChangeSelectedBookIds: _e ? Ue : s,
      localizedStrings: i,
      localizedBookNames: c,
      disabledSectionExplanations: d
    }
  ), rr = he === "end", ar = he === "start", ze = "tw:text-muted-foreground", Ce = p === "dropdown" && dt === "range", hr = Ce ? yt : ne, Ir = Ce ? Kt : x ? ke : xe, Ke = /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-wrap tw:items-end tw:gap-4", children: [
    /* @__PURE__ */ u("div", { className: "tw:grid tw:gap-2", children: [
      /* @__PURE__ */ a(It, { htmlFor: "scope-range-start", className: b(rr && ze), children: Y }),
      /* @__PURE__ */ a(
        Xa,
        {
          id: "scope-range-start",
          scrRef: Ce ? Rt ?? xt : xt,
          handleSubmit: hr,
          localizedBookNames: c,
          localizedStrings: k,
          getEndVerse: E,
          submitKeys: fp,
          onOpenChange: ye,
          className: b(rr && ze),
          modal: !0
        }
      )
    ] }),
    /* @__PURE__ */ u("div", { ref: Qt, className: "tw:grid tw:gap-2", children: [
      /* @__PURE__ */ a(It, { htmlFor: "scope-range-end", className: b(ar && ze), children: L }),
      /* @__PURE__ */ a(
        Xa,
        {
          id: "scope-range-end",
          scrRef: Ce ? ge ?? Ot : Ot,
          handleSubmit: Ir,
          localizedBookNames: c,
          localizedStrings: k,
          getEndVerse: E,
          disableReferencesUpTo: Ce ? Rt ?? xt : xt,
          onOpenChange: te,
          onCloseAutoFocus: (F) => {
            var rt;
            oe.current && (oe.current = !1, F.preventDefault(), (rt = ce.current) == null || rt.focus());
          },
          className: b(ar && ze),
          modal: !0,
          align: "start"
        }
      )
    ] })
  ] }), S = V({}), nt = $(
    (F) => (rt) => {
      S.current[F] = rt;
    },
    []
  ), st = V(null);
  Z(() => {
    if (!B) return;
    let F = 0;
    const rt = requestAnimationFrame(() => {
      F = requestAnimationFrame(() => {
        var Pt;
        (Pt = S.current[t]) == null || Pt.focus();
      });
    });
    return () => {
      cancelAnimationFrame(rt), F && cancelAnimationFrame(F);
    };
  }, [B, t]);
  const [Ht, zr] = N(null), [Pe, gr] = N(null), [fr, Ua] = N(null), ea = 200, [Ka, ra] = N(!1);
  Z(() => {
    if (!fr || typeof ResizeObserver > "u") return;
    const F = new ResizeObserver(([rt]) => {
      ra(rt.contentRect.width < ea);
    });
    return F.observe(fr), () => F.disconnect();
  }, [fr]);
  const aa = $(
    (F) => {
      Et(F), yt(xt), Kt(Ot), Ue(n), at(!1), ct(F);
    },
    [xt, Ot, n]
  ), oa = $(() => {
    pt !== void 0 && (pt === "range" ? (Rt && (v == null || v(Rt)), ge && (x == null || x(ge))) : pt === "selectedBooks" && s(Vt), Tt(pt), ct(void 0), Et(void 0));
  }, [
    pt,
    Rt,
    ge,
    Vt,
    v,
    x,
    s,
    Tt
  ]), mr = $((F) => {
    F || (ct(void 0), Et(void 0));
  }, []), na = $((F) => {
    var rt;
    F.preventDefault(), (rt = st.current) == null || rt.focus();
  }, []), ia = (F) => t === F ? /* @__PURE__ */ a("span", { className: "tw:absolute tw:flex tw:h-3.5 tw:w-3.5 tw:items-center tw:justify-center tw:ltr:left-2 tw:rtl:right-2", children: /* @__PURE__ */ a(Je, { className: "tw:h-4 tw:w-4" }) }) : void 0;
  return /* @__PURE__ */ u("div", { id: w, className: "tw:grid tw:gap-4", children: [
    /* @__PURE__ */ u("div", { className: "tw:grid tw:gap-2", children: [
      !C && /* @__PURE__ */ a(It, { children: y }),
      p === "dropdown" ? /* @__PURE__ */ u(Be, { open: B, onOpenChange: at, children: [
        /* @__PURE__ */ a(Se, { asChild: !0, children: /* @__PURE__ */ u(
          tt,
          {
            ref: st,
            variant: "outline",
            role: "combobox",
            className: b(
              "tw:w-full tw:justify-between tw:overflow-hidden tw:font-normal",
              A
            ),
            children: [
              /* @__PURE__ */ a("span", { className: "tw:min-w-0 tw:flex-1 tw:truncate tw:text-start", children: H() }),
              /* @__PURE__ */ a(sr, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
            ]
          }
        ) }),
        /* @__PURE__ */ a(
          je,
          {
            ref: Ua,
            className: "tw:w-[var(--radix-dropdown-menu-trigger-width)] tw:min-w-[12rem]",
            align: "start",
            children: /* @__PURE__ */ u(qa, { container: fr, children: [
              _.map(({ value: F, label: rt, dropdownLabel: Pt, scrRefSuffix: le, id: fe }) => {
                const m = l == null ? void 0 : l[F];
                return /* @__PURE__ */ u(
                  Ge,
                  {
                    ref: nt(F),
                    disabled: !!m,
                    className: "tw:relative tw:ps-8 data-[highlighted]:tw:bg-accent data-[highlighted]:tw:text-accent-foreground",
                    onSelect: () => Tt(F),
                    "data-selected": t === F ? "true" : void 0,
                    children: [
                      t === F && /* @__PURE__ */ a("span", { className: "tw:absolute tw:flex tw:h-3.5 tw:w-3.5 tw:items-center tw:justify-center tw:ltr:left-2 tw:rtl:right-2", children: /* @__PURE__ */ a(Je, { className: "tw:h-4 tw:w-4" }) }),
                      /* @__PURE__ */ u("span", { className: "tw:flex tw:min-w-0 tw:flex-col tw:gap-0.5", children: [
                        /* @__PURE__ */ a("span", { className: "tw:flex tw:items-center tw:gap-1.5", children: vt(Pt ?? rt, le, Ka) }),
                        m && /* @__PURE__ */ a("span", { className: "tw:text-xs tw:whitespace-normal tw:text-foreground", children: m })
                      ] })
                    ]
                  },
                  fe
                );
              }),
              (I || J) && /* @__PURE__ */ a(ir, {}),
              I && /* @__PURE__ */ u(
                Ge,
                {
                  ref: nt("selectedBooks"),
                  className: b(
                    "tw:relative tw:ps-8",
                    "data-[highlighted]:tw:bg-accent data-[highlighted]:tw:text-accent-foreground"
                  ),
                  onSelect: () => aa("selectedBooks"),
                  "data-selected": t === "selectedBooks" ? "true" : void 0,
                  children: [
                    ia("selectedBooks"),
                    `${I.label}…`
                  ]
                }
              ),
              J && /* @__PURE__ */ u(
                Ge,
                {
                  ref: nt("range"),
                  className: b(
                    "tw:relative tw:ps-8",
                    "data-[highlighted]:tw:bg-accent data-[highlighted]:tw:text-accent-foreground"
                  ),
                  onSelect: () => aa("range"),
                  "data-selected": t === "range" ? "true" : void 0,
                  children: [
                    ia("range"),
                    `${J.label}…`
                  ]
                }
              ),
              T && /* @__PURE__ */ u(ht, { children: [
                /* @__PURE__ */ a(ir, {}),
                /* @__PURE__ */ a(cr, { className: "tw:px-2 tw:py-1.5 tw:text-xs tw:font-medium tw:text-muted-foreground", children: mt }),
                /* @__PURE__ */ a(
                  Ge,
                  {
                    ref: Ut,
                    className: "tw:p-0",
                    onSelect: (F) => {
                      var rt, Pt;
                      if (F.preventDefault(), Ct.current) {
                        Ct.current = !1;
                        return;
                      }
                      pe.current || (Pt = (rt = $t.current) == null ? void 0 : rt.querySelector("button")) == null || Pt.click();
                    },
                    children: /* @__PURE__ */ a(
                      "div",
                      {
                        ref: $t,
                        className: "tw:w-full tw:px-1 tw:pb-1",
                        onPointerDownCapture: (F) => {
                          const rt = F.target instanceof HTMLElement ? F.target : void 0;
                          rt != null && rt.closest("button") && (Ct.current = !0, requestAnimationFrame(() => {
                            Ct.current = !1;
                          }));
                        },
                        children: /* @__PURE__ */ a(
                          Xa,
                          {
                            id: "scope-navigate",
                            scrRef: g ?? Ya,
                            handleSubmit: T,
                            localizedBookNames: c,
                            localizedStrings: k,
                            getEndVerse: E,
                            triggerVariant: "ghost",
                            onOpenChange: (F) => {
                              pe.current = F;
                            },
                            onCloseAutoFocus: (F) => {
                              var rt;
                              F.preventDefault(), (rt = Ut.current) == null || rt.focus();
                            },
                            modal: !0,
                            className: "tw:w-full tw:min-w-0 tw:max-w-none tw:justify-between tw:px-2 tw:font-normal",
                            triggerContent: /* @__PURE__ */ u(ht, { children: [
                              /* @__PURE__ */ a("span", { className: "tw:min-w-0 tw:flex-1 tw:truncate tw:text-start", children: $e(g ?? Ya, "id") }),
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
        Oo,
        {
          value: t,
          onValueChange: Tt,
          className: "tw:flex tw:flex-col tw:space-y-1",
          children: lt.map(({ value: F, label: rt, scrRefSuffix: Pt, id: le }) => {
            const fe = l == null ? void 0 : l[F];
            return /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:gap-0.5", children: [
              /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center", children: [
                /* @__PURE__ */ a(
                  _a,
                  {
                    className: "tw:me-2",
                    value: F,
                    id: le,
                    disabled: !!fe,
                    "aria-describedby": fe ? `${le}-explanation` : void 0
                  }
                ),
                /* @__PURE__ */ a(It, { htmlFor: le, children: vt(rt, Pt) })
              ] }),
              fe && // Indented to clear the radio so it reads as belonging to this row's label.
              /* @__PURE__ */ a(
                "span",
                {
                  id: `${le}-explanation`,
                  className: "tw:ms-6 tw:text-xs tw:whitespace-normal tw:text-muted-foreground",
                  children: fe
                }
              )
            ] }, le);
          })
        }
      )
    ] }),
    p === "radio" && t === "selectedBooks" && /* @__PURE__ */ u("div", { className: "tw:grid tw:gap-2", children: [
      /* @__PURE__ */ a(It, { children: et }),
      Ne
    ] }),
    p === "radio" && t === "range" && Ke,
    p === "dropdown" && I && /* @__PURE__ */ a(co, { open: dt === "selectedBooks", onOpenChange: mr, children: /* @__PURE__ */ a(
      lo,
      {
        ref: gr,
        onCloseAutoFocus: na,
        onEscapeKeyDown: (F) => {
          Pe != null && Pe.querySelector('[data-state="open"]') && F.preventDefault();
        },
        children: /* @__PURE__ */ u(qa, { container: Pe, children: [
          /* @__PURE__ */ a(wo, { className: "tw:pe-8", children: /* @__PURE__ */ a(uo, { children: ot }) }),
          Ne,
          /* @__PURE__ */ u(nn, { children: [
            /* @__PURE__ */ a(tt, { variant: "outline", onClick: () => mr(!1), children: ut }),
            /* @__PURE__ */ a(tt, { onClick: oa, children: X })
          ] })
        ] })
      }
    ) }),
    p === "dropdown" && J && /* @__PURE__ */ a(co, { open: dt === "range", onOpenChange: mr, children: /* @__PURE__ */ a(
      lo,
      {
        ref: zr,
        onCloseAutoFocus: na,
        onEscapeKeyDown: (F) => {
          Ht != null && Ht.querySelector('[data-state="open"]') && F.preventDefault();
        },
        children: /* @__PURE__ */ u(qa, { container: Ht, children: [
          /* @__PURE__ */ a(wo, { className: "tw:pe-8", children: /* @__PURE__ */ a(uo, { children: Q }) }),
          Ke,
          /* @__PURE__ */ u(nn, { children: [
            /* @__PURE__ */ a(tt, { variant: "outline", onClick: () => mr(!1), children: ut }),
            /* @__PURE__ */ a(tt, { ref: ce, onClick: oa, children: X })
          ] })
        ] })
      }
    ) })
  ] });
}
function vg({
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
    ...Ga,
    ...Object.fromEntries(
      Object.entries(o).map(
        ([w, p]) => [
          w,
          w === p && w in Ga ? Ga[w] : p
        ]
      )
    )
  }, l = Oe();
  return /* @__PURE__ */ u(
    Cr,
    {
      value: `${e}`,
      onValueChange: (w) => r(
        w === "undefined" ? void 0 : parseInt(w, 10)
      ),
      disabled: c,
      children: [
        /* @__PURE__ */ a(Tr, { size: n, className: b("pr-twp tw:w-auto", s), children: /* @__PURE__ */ a(
          Er,
          {
            placeholder: d[wn(e)] ?? e
          }
        ) }),
        /* @__PURE__ */ a(
          Sr,
          {
            id: i,
            align: l === "rtl" ? "end" : "start",
            style: { zIndex: Fe },
            children: t.map((w) => /* @__PURE__ */ a(ve, { value: `${w}`, children: d[wn(w)] }, `${w}`))
          }
        )
      ]
    }
  );
}
function bg({ children: t }) {
  return /* @__PURE__ */ a("div", { className: "pr-twp tw:grid", children: t });
}
function xg({
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
function yg({
  primary: t,
  secondary: e,
  includeSeparator: r = !1
}) {
  return /* @__PURE__ */ u("div", { className: "tw:space-y-4 tw:py-2", children: [
    /* @__PURE__ */ u("div", { children: [
      /* @__PURE__ */ a("h3", { className: "tw:text-lg tw:font-medium", children: t }),
      /* @__PURE__ */ a("p", { className: "tw:text-sm tw:text-muted-foreground", children: e })
    ] }),
    r ? /* @__PURE__ */ a(qr, {}) : ""
  ] });
}
function ps(t, e) {
  var r;
  return (r = Object.entries(t).find(
    ([, o]) => "menuItem" in o && o.menuItem === e
  )) == null ? void 0 : r[0];
}
function hs(t) {
  return Object.entries(t).flatMap(([e, r]) => typeof r == "object" ? [{ columnKey: e, column: r }] : []).sort((e, r) => e.column.order - r.column.order);
}
function gs(t, e, r) {
  return "column" in e && e.column === r || t === r;
}
function mp(t) {
  const e = new Set(t.items.map((o) => o.group)), r = Object.entries(t.groups).filter(
    ([o]) => e.has(o)
  );
  return hs(t.columns).filter(
    ({ columnKey: o }) => r.some(
      ([n, s]) => gs(n, s, o)
    )
  ).map(({ columnKey: o, column: n }) => ({ columnKey: o, label: n.label }));
}
function Ma({ icon: t, menuLabel: e, leading: r }) {
  return t ? /* @__PURE__ */ a(
    "img",
    {
      className: b("tw:max-h-5 tw:max-w-5", r ? "tw:me-2" : "tw:ms-2"),
      src: t,
      alt: `${r ? "Leading" : "Trailing"} icon for ${e}`
    }
  ) : void 0;
}
const fs = (t, e, r, o) => r ? Object.entries(t).filter(([s, i]) => gs(s, i, r)).sort(([, s], [, i]) => s.order - i.order).flatMap(([s]) => e.filter((c) => c.group === s).sort((c, d) => c.order - d.order).map((c) => /* @__PURE__ */ u(kt, { children: [
  /* @__PURE__ */ a(_t, { asChild: !0, children: "command" in c ? /* @__PURE__ */ u(
    Ge,
    {
      onClick: () => {
        o(c);
      },
      children: [
        c.iconPathBefore && /* @__PURE__ */ a(Ma, { icon: c.iconPathBefore, menuLabel: c.label, leading: !0 }),
        c.label,
        c.iconPathAfter && /* @__PURE__ */ a(Ma, { icon: c.iconPathAfter, menuLabel: c.label }),
        c.shortcut && /* @__PURE__ */ a(Fs, { children: c.shortcut })
      ]
    },
    `dropdown-menu-item-${c.label}-${c.command}`
  ) : /* @__PURE__ */ u(Us, { children: [
    /* @__PURE__ */ a(Ks, { children: c.label }),
    /* @__PURE__ */ a(Hs, { children: /* @__PURE__ */ a(qs, { children: fs(
      t,
      e,
      ps(t, c.id),
      o
    ) }) })
  ] }, `dropdown-menu-sub-${c.label}-${c.id}`) }),
  c.tooltip && /* @__PURE__ */ a(Nt, { children: c.tooltip })
] }, `tooltip-${c.label}-${"command" in c ? c.command : c.id}`))) : void 0;
function So({
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
  const l = Ea(), w = mp(e), p = s && w.length > 1;
  return /* @__PURE__ */ u(Be, { variant: i, children: [
    /* @__PURE__ */ a(Se, { "aria-label": r, className: n, asChild: !0, id: d, children: /* @__PURE__ */ a(tt, { variant: c, size: "icon", children: o ?? /* @__PURE__ */ a(Tc, {}) }) }),
    /* @__PURE__ */ a(je, { align: "start", style: { zIndex: Fe }, children: w.map(({ columnKey: h, label: f }, v) => {
      const x = `${l}-${h}`;
      return /* @__PURE__ */ u(Jr, { children: [
        /* @__PURE__ */ u(Zn, { "aria-labelledby": p ? x : void 0, children: [
          p && /* @__PURE__ */ a(cr, { id: x, children: f }),
          /* @__PURE__ */ a(zt, { children: fs(e.groups, e.items, h, t) })
        ] }),
        v < w.length - 1 && /* @__PURE__ */ a(ir, {})
      ] }, h);
    }) })
  ] });
}
const vp = 8;
function bp(t, e, r) {
  const o = e.findIndex((i) => t >= i), n = o === -1 ? e.length : o;
  if (r === void 0 || n >= r) return n;
  const s = e.findIndex(
    (i) => t >= i + vp
  );
  return s === -1 ? r : Math.min(r, s);
}
function ms(t, e) {
  const [r, o] = N(0), n = V(void 0);
  return Xt(() => {
    if (!t || typeof ResizeObserver > "u") return;
    const s = () => {
      const { width: c } = t.getBoundingClientRect(), d = n.current;
      n.current = c;
      const l = d === void 0 || d === 0;
      o(
        (w) => bp(c, e, l ? void 0 : w)
      );
    };
    s();
    const i = new ResizeObserver(s);
    return i.observe(t), () => i.disconnect();
  }, [t, e]), r;
}
const xp = Object.freeze([520, 420, 340]), vs = Zt.forwardRef(
  ({ id: t, className: e, children: r }, o) => {
    const [n, s] = N(void 0), i = V(o);
    i.current = o;
    const c = $((p) => {
      s(p ?? void 0);
      const h = i.current;
      typeof h == "function" ? h(p) : h && (h.current = p);
    }, []), d = ms(n, xp), l = Mi() ?? d, w = l >= Ur.MINIMUM;
    return /* @__PURE__ */ a(Va.Provider, { value: l, children: /* @__PURE__ */ a(
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
function kg({
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
  return /* @__PURE__ */ u(vs, { className: `tw:w-full tw:border-b ${s}`, id: n, children: [
    r && /* @__PURE__ */ a(
      So,
      {
        onSelectMenuItem: t,
        menuData: r,
        tabLabel: "Project",
        icon: l ?? /* @__PURE__ */ a(Sc, {}),
        buttonVariant: "ghost",
        showSectionHeadings: !0
      }
    ),
    i && /* @__PURE__ */ a("div", { className: "tw:flex tw:min-w-0 tw:shrink tw:grow-[10] tw:flex-row tw:flex-nowrap tw:items-start tw:gap-x-1 tw:gap-y-2 tw:overflow-clip", children: i }),
    c && /* @__PURE__ */ a("div", { className: "tw:flex tw:shrink tw:grow-[1] tw:basis-0 tw:flex-row tw:flex-nowrap tw:items-start tw:justify-center tw:gap-x-1 tw:gap-y-2 tw:overflow-clip tw:@sm:basis-auto", children: c }),
    /* @__PURE__ */ u("div", { className: "tw:flex tw:shrink-0 tw:grow-[1] tw:flex-row-reverse tw:flex-nowrap tw:items-start tw:gap-x-1 tw:gap-y-2 tw:overflow-clip", children: [
      o && /* @__PURE__ */ a(
        So,
        {
          onSelectMenuItem: e,
          menuData: o,
          tabLabel: "View Info",
          icon: /* @__PURE__ */ a(Rc, {}),
          className: "tw:h-full",
          showSectionHeadings: !0
        }
      ),
      d
    ] })
  ] });
}
function _g({
  onSelectProjectMenuItem: t,
  projectMenuData: e,
  id: r,
  className: o,
  menuButtonIcon: n
}) {
  return /* @__PURE__ */ a(vs, { className: "tw:pointer-events-none", id: r, children: e && /* @__PURE__ */ a(
    So,
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
const bs = Zt.forwardRef(({ className: t, ...e }, r) => {
  const o = Oe();
  return /* @__PURE__ */ a(
    be.Root,
    {
      orientation: "vertical",
      ref: r,
      className: b("tw:flex tw:gap-1 tw:rounded-md tw:text-muted-foreground", t),
      ...e,
      dir: o
    }
  );
});
bs.displayName = be.List.displayName;
const xs = Zt.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ a(
  be.List,
  {
    ref: r,
    className: b(
      "tw:flex tw:items-center tw:w-[124px] tw:justify-center tw:rounded-md tw:bg-muted tw:p-1 tw:text-muted-foreground",
      t
    ),
    ...e
  }
));
xs.displayName = be.List.displayName;
const yp = Zt.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ a(
  be.Trigger,
  {
    ref: r,
    ...e,
    className: b(
      "tw:inline-flex tw:w-[116px] tw:cursor-pointer tw:items-center tw:justify-center tw:break-words tw:rounded-sm tw:border-0 tw:bg-muted tw:px-3 tw:py-1.5 tw:text-sm tw:font-medium tw:text-inherit tw:ring-offset-background tw:transition-all tw:hover:text-foreground tw:focus-visible:outline-hidden tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2 tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:data-[state=active]:bg-background tw:data-[state=active]:text-foreground tw:data-[state=active]:shadow-sm tw:overflow-clip",
      t
    )
  }
)), ys = Zt.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ a(
  be.Content,
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
ys.displayName = be.Content.displayName;
function Ng({
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
        Qn,
        {
          className: s,
          value: e,
          onSearch: r,
          placeholder: o
        }
      )
    ] }),
    /* @__PURE__ */ u(bs, { children: [
      /* @__PURE__ */ a(xs, { children: t.map((c) => /* @__PURE__ */ a(yp, { value: c.value, children: c.value }, c.key)) }),
      t.map((c) => /* @__PURE__ */ a(ys, { value: c.value, children: c.content }, c.key))
    ] })
  ] });
}
function kp({
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
  return /* @__PURE__ */ a(Gs.Provider, { value: o, children: /* @__PURE__ */ a(
    Me.Root,
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
function _p({ ...t }) {
  return /* @__PURE__ */ a(Me.Menu, { "data-slot": "menubar-menu", ...t });
}
function Np({ ...t }) {
  return /* @__PURE__ */ a(Me.Portal, { "data-slot": "menubar-portal", ...t });
}
function Cp({
  className: t,
  ...e
}) {
  const r = Zr();
  return /* @__PURE__ */ a(
    Me.Trigger,
    {
      "data-slot": "menubar-trigger",
      className: b(
        "tw:flex tw:items-center tw:rounded-sm tw:px-1.5 tw:py-[2px] tw:text-sm tw:font-medium tw:outline-hidden tw:select-none tw:hover:bg-muted tw:aria-expanded:bg-muted",
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation (portal-rendered content needs this)
        "pr-twp",
        // CUSTOM: Apply variant-driven styles from menu context
        $o({ variant: r.variant, className: t })
      ),
      ...e
    }
  );
}
function Ep({
  className: t,
  align: e = "start",
  alignOffset: r = -4,
  sideOffset: o = 8,
  // CUSTOM: Pull `style` out so the shared z-index can be applied under any caller-supplied style
  style: n,
  ...s
}) {
  const i = Zr();
  return /* @__PURE__ */ a(Np, { children: /* @__PURE__ */ a(
    Me.Content,
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
function Tp({
  className: t,
  inset: e,
  variant: r = "default",
  ...o
}) {
  const n = Zr();
  return /* @__PURE__ */ a(
    Me.Item,
    {
      "data-slot": "menubar-item",
      "data-inset": e,
      "data-variant": r,
      className: b(
        "tw:group/menubar-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-[variant=destructive]:text-destructive tw:data-[variant=destructive]:focus:bg-destructive/10 tw:data-[variant=destructive]:focus:text-destructive tw:dark:data-[variant=destructive]:focus:bg-destructive/20 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:data-[variant=destructive]:*:[svg]:text-destructive!",
        // CUSTOM: Apply variant-driven styles from menu context
        $o({ variant: n.variant, className: t })
      ),
      ...o
    }
  );
}
function Sp({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    Me.Separator,
    {
      "data-slot": "menubar-separator",
      className: b("tw:-mx-1 tw:my-1 tw:h-px tw:bg-border", t),
      ...e
    }
  );
}
function Rp({ className: t, ...e }) {
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
function Dp({ ...t }) {
  return /* @__PURE__ */ a(Me.Sub, { "data-slot": "menubar-sub", ...t });
}
function Op({
  className: t,
  inset: e,
  children: r,
  ...o
}) {
  const n = Zr();
  return /* @__PURE__ */ u(
    Me.SubTrigger,
    {
      "data-slot": "menubar-sub-trigger",
      "data-inset": e,
      className: b(
        "tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-none tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-inset:ps-7 tw:data-open:bg-accent tw:data-open:text-accent-foreground tw:[&_svg:not([class*=size-])]:size-4",
        // CUSTOM: Apply variant-driven styles from menu context
        $o({ variant: n.variant, className: t })
      ),
      ...o,
      children: [
        r,
        /* @__PURE__ */ a(pi, { className: "tw:ms-auto tw:size-4" })
      ]
    }
  );
}
function Mp({
  className: t,
  // CUSTOM: Pull `style` out so the shared z-index can be applied under any caller-supplied style
  style: e,
  ...r
}) {
  const o = Zr();
  return /* @__PURE__ */ a(
    Me.SubContent,
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
const Vr = (t, e) => {
  setTimeout(() => {
    e.forEach((r) => {
      var o;
      (o = t.current) == null || o.dispatchEvent(new KeyboardEvent("keydown", r));
    });
  }, 0);
}, ks = (t, e, r, o) => {
  if (!r) return;
  const n = Object.entries(t).filter(
    ([s, i]) => "column" in i && i.column === r || s === r
  ).sort(([, s], [, i]) => s.order - i.order);
  return n.flatMap(([s], i) => {
    const c = e.filter((l) => l.group === s).sort((l, w) => l.order - w.order).map((l) => /* @__PURE__ */ u(kt, { children: [
      /* @__PURE__ */ a(_t, { asChild: !0, children: "command" in l ? /* @__PURE__ */ u(
        Tp,
        {
          onClick: () => {
            o(l);
          },
          children: [
            l.iconPathBefore && /* @__PURE__ */ a(Ma, { icon: l.iconPathBefore, menuLabel: l.label, leading: !0 }),
            l.label,
            l.iconPathAfter && /* @__PURE__ */ a(Ma, { icon: l.iconPathAfter, menuLabel: l.label }),
            l.shortcut && /* @__PURE__ */ a(Rp, { children: l.shortcut })
          ]
        },
        `menubar-item-${l.label}-${l.command}`
      ) : /* @__PURE__ */ u(Dp, { children: [
        /* @__PURE__ */ a(Op, { children: l.label }),
        /* @__PURE__ */ a(Mp, { children: ks(
          t,
          e,
          ps(t, l.id),
          o
        ) })
      ] }, `menubar-sub-${l.label}-${l.id}`) }),
      l.tooltip && /* @__PURE__ */ a(Nt, { children: l.tooltip })
    ] }, `tooltip-${l.label}-${"command" in l ? l.command : l.id}`)), d = [...c];
    return c.length > 0 && i < n.length - 1 && d.push(/* @__PURE__ */ a(Sp, {}, `separator-${s}`)), d;
  });
};
function Ip({
  menuData: t,
  onSelectMenuItem: e,
  onOpenChange: r,
  variant: o
}) {
  const n = V(void 0), s = V(void 0), i = V(void 0), c = V(void 0), d = V(void 0), l = (w) => {
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
  if (od(["alt", "alt+p", "alt+l", "alt+n", "alt+h"], (w, p) => {
    var v, x, g, T;
    w.preventDefault();
    const h = { key: "Escape", code: "Escape", keyCode: 27, bubbles: !0 }, f = { key: " ", code: "Space", keyCode: 32, bubbles: !0 };
    switch (p.hotkey) {
      case "alt":
        Vr(s, [h]);
        break;
      case "alt+p":
        (v = s.current) == null || v.focus(), Vr(s, [h, f]);
        break;
      case "alt+l":
        (x = i.current) == null || x.focus(), Vr(i, [h, f]);
        break;
      case "alt+n":
        (g = c.current) == null || g.focus(), Vr(c, [h, f]);
        break;
      case "alt+h":
        (T = d.current) == null || T.focus(), Vr(d, [h, f]);
        break;
    }
  }), Z(() => {
    if (!r || !n.current) return;
    const w = new MutationObserver((f) => {
      f.forEach((v) => {
        if (v.attributeName === "data-state" && v.target instanceof HTMLElement) {
          const x = v.target.getAttribute("data-state");
          r(x === "open");
        }
      });
    });
    return n.current.querySelectorAll("[data-state]").forEach((f) => {
      w.observe(f, { attributes: !0 });
    }), () => w.disconnect();
  }, [r]), !!t)
    return /* @__PURE__ */ a(kp, { ref: n, className: "pr-twp tw:border-0 tw:bg-transparent", variant: o, children: hs(t.columns).map(({ columnKey: w, column: p }) => /* @__PURE__ */ u(_p, { children: [
      /* @__PURE__ */ a(Cp, { ref: l(w), children: p.label }),
      /* @__PURE__ */ a(
        Ep,
        {
          style: { zIndex: Fe },
          children: /* @__PURE__ */ a(zt, { children: ks(t.groups, t.items, w, e) })
        }
      )
    ] }, w)) });
}
const zp = Object.freeze([950, 800, 700]);
function Cg(t) {
  switch (t) {
    case void 0:
      return;
    case "darwin":
      return "tw:ps-[85px]";
    default:
      return "tw:pe-[calc(138px+1rem)]";
  }
}
function Eg({
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
  const [w, p] = N(void 0), h = $(
    (x) => p(x ?? void 0),
    []
  ), f = ms(w, zp), v = Mi() ?? f;
  return /* @__PURE__ */ a(Va.Provider, { value: v, children: /* @__PURE__ */ a(
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
                    Ip,
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
const Pp = (t, e) => t[e] ?? e;
function Tg({
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
  const l = Pp(
    i,
    "%settings_uiLanguageSelector_fallbackLanguages%"
  ), [w, p] = N(!1), h = (v) => {
    n && n(v), o && o([v, ...r.filter((x) => x !== v)]), s && r.find((x) => x === v) && s([...r.filter((x) => x !== v)]), p(!1);
  }, f = (v, x) => {
    var T, k, E, C, A, j;
    const g = x !== v ? ((k = (T = t[v]) == null ? void 0 : T.uiNames) == null ? void 0 : k[x]) ?? ((C = (E = t[v]) == null ? void 0 : E.uiNames) == null ? void 0 : C.en) : void 0;
    return g ? `${(A = t[v]) == null ? void 0 : A.autonym} (${g})` : (j = t[v]) == null ? void 0 : j.autonym;
  };
  return /* @__PURE__ */ u("div", { id: d, className: b("pr-twp tw:max-w-sm", c), children: [
    /* @__PURE__ */ u(
      Cr,
      {
        name: "uiLanguage",
        value: e,
        onValueChange: h,
        open: w,
        onOpenChange: (v) => p(v),
        children: [
          /* @__PURE__ */ a(Tr, { children: /* @__PURE__ */ a(Er, {}) }),
          /* @__PURE__ */ a(
            Sr,
            {
              style: { zIndex: Fe },
              children: Object.keys(t).map((v) => /* @__PURE__ */ a(ve, { value: v, children: f(v, e) }, v))
            }
          )
        ]
      }
    ),
    e !== "en" && /* @__PURE__ */ a("div", { className: "tw:pt-3", children: /* @__PURE__ */ a(It, { className: "tw:font-normal tw:text-muted-foreground", children: Ye(l, {
      fallbackLanguages: (r == null ? void 0 : r.length) > 0 ? r.map((v) => f(v, e)).join(", ") : t.en.autonym
    }) }) })
  ] });
}
const Sg = Object.freeze([
  "%firstRun_language_search_placeholder%",
  "%firstRun_language_noResults%",
  "%firstRun_language_selected%"
]);
function Ap(t) {
  return [...t].sort(([e, r], [o, n]) => e === "en" && o !== "en" ? -1 : o === "en" && e !== "en" ? 1 : r.autonym.localeCompare(n.autonym));
}
function Rg({
  languages: t,
  value: e,
  onChange: r,
  localizedStrings: o,
  className: n,
  id: s
}) {
  const [i, c] = N(""), d = P(
    () => Ap(Object.entries(t)).map(([v, x]) => ({
      tag: v,
      info: x,
      keywords: [x.autonym, ...Object.values(x.uiNames ?? {}), ...x.otherNames ?? []]
    })),
    [t]
  ), l = P(() => {
    if (!i) return d;
    const v = i.toLowerCase();
    return d.filter(({ keywords: x }) => x.some((g) => g.toLowerCase().includes(v)));
  }, [d, i]), w = d.length > 1, p = o["%firstRun_language_search_placeholder%"] ?? "", h = o["%firstRun_language_noResults%"] ?? "", f = o["%firstRun_language_selected%"] ?? "";
  return /* @__PURE__ */ u(wr, { id: s, className: b("pr-twp", n), shouldFilter: !1, children: [
    w && // Plain <input> (not CommandPrimitive.Input) so cmdk cannot update this field after
    // item selection. Arrow-key and Enter events from here bubble to the Command root div
    // where cmdk's keydown handler picks them up for list navigation.
    /* @__PURE__ */ a("div", { "data-slot": "command-input-wrapper", className: "tw:p-1 tw:pb-0", children: /* @__PURE__ */ u(Ws, { className: "tw:h-8! tw:rounded-lg! tw:border-input/30 tw:bg-input/30 tw:shadow-none! tw:*:data-[slot=input-group-addon]:ps-2!", children: [
      /* @__PURE__ */ a(
        "input",
        {
          "data-slot": "command-input",
          type: "text",
          placeholder: p,
          "aria-label": p,
          value: i,
          onChange: (v) => c(v.currentTarget.value),
          className: "tw:w-full tw:text-sm tw:outline-hidden tw:disabled:cursor-not-allowed tw:disabled:opacity-50"
        }
      ),
      /* @__PURE__ */ a(Ys, { children: /* @__PURE__ */ a(Yc, { className: "tw:size-4 tw:shrink-0 tw:opacity-50" }) })
    ] }) }),
    /* @__PURE__ */ u(ur, { children: [
      /* @__PURE__ */ a(Pa, { children: h }),
      l.map(({ tag: v, info: x }) => {
        const g = v === e;
        return /* @__PURE__ */ u(
          tr,
          {
            value: v,
            "aria-current": g ? "true" : void 0,
            "data-checked": g ? "true" : void 0,
            onSelect: () => r(v),
            children: [
              /* @__PURE__ */ a("span", { dir: "auto", children: x.autonym }),
              g && /* @__PURE__ */ a("span", { className: "tw:sr-only", children: f })
            ]
          },
          v
        );
      })
    ] })
  ] });
}
function $p({ item: t, createLabel: e, createComplexLabel: r }) {
  return e ? /* @__PURE__ */ a(It, { children: e(t) }) : r ? /* @__PURE__ */ a(It, { children: r(t) }) : /* @__PURE__ */ a(It, { children: t });
}
function Vp({
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
      ds,
      {
        className: "tw:me-2 tw:align-middle",
        checked: o.includes(c),
        onCheckedChange: (d) => n(c, d)
      }
    ),
    /* @__PURE__ */ a(
      $p,
      {
        item: c,
        createLabel: s,
        createComplexLabel: i
      }
    )
  ] }, c)) });
}
const Dg = Vp;
function Lp(t, e) {
  const [r, o] = N(t), [n, s] = N(e);
  return t !== r && (o(t), t && s(e)), t ? e : n;
}
function Og({
  open: t,
  anchorRect: e,
  message: r,
  confirmingKeyLabel: o,
  side: n = "bottom",
  align: s = "start",
  showArrow: i = !0
}) {
  const c = t ? un(r, { key: o }).join("") : "", {
    anchorRect: d,
    message: l,
    confirmingKeyLabel: w,
    showArrow: p
  } = Lp(t, { anchorRect: e, message: r, confirmingKeyLabel: o, showArrow: i });
  return /* @__PURE__ */ u(zt, { children: [
    /* @__PURE__ */ a("span", { role: "status", className: "tw:sr-only", children: c }),
    /* @__PURE__ */ u(kt, { open: t, onOpenChange: () => {
    }, children: [
      /* @__PURE__ */ a(
        _t,
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
        Nt,
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
          children: /* @__PURE__ */ a("div", { className: "tw:w-full tw:h-full tw:rounded-md tw:bg-destructive/10 tw:px-3 tw:py-1.5", children: un(l, {
            key: /* @__PURE__ */ a(
              po,
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
            /* @__PURE__ */ a(Jr, { children: h }, `key-${f}`)
          )) })
        }
      )
    ] })
  ] });
}
function Mg({
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
  }, [v, x] = N(!1);
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
            l && (e || h && v) && /* @__PURE__ */ a(
              "div",
              {
                className: b(
                  !e && h && "tw:invisible tw:group-hover:visible"
                ),
                children: /* @__PURE__ */ u(Be, { children: [
                  /* @__PURE__ */ a(Se, { className: b(p && "tw:me-1"), asChild: !0, children: /* @__PURE__ */ a(
                    tt,
                    {
                      className: "tw:m-1 tw:h-6 tw:w-6",
                      variant: "ghost",
                      size: "icon",
                      onClick: (g) => g.stopPropagation(),
                      onFocus: (g) => g.stopPropagation(),
                      children: /* @__PURE__ */ a(Dc, {})
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
function Ig({
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
      It,
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
      Aa,
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
function zg({ currentStep: t, totalSteps: e, locale: r }) {
  const o = r || "en", n = P(() => {
    const c = new di(o);
    return (d) => c.format(d);
  }, [o]), s = Math.min(Math.max(t, 1), e), i = Array.from({ length: e }, (c, d) => d + 1);
  return /* @__PURE__ */ a("div", { className: "tw:flex tw:items-center", "aria-hidden": "true", children: i.map((c) => {
    let d = "upcoming";
    return c === s ? d = "active" : c < s && (d = "complete"), /* @__PURE__ */ u(Jr, { children: [
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
          children: d === "complete" ? /* @__PURE__ */ a(Je, { className: "tw:h-4 tw:w-4" }) : n(c)
        }
      )
    ] }, c);
  }) });
}
function Pg({ ...t }) {
  return /* @__PURE__ */ a(Ft.Root, { "data-slot": "context-menu", ...t });
}
function Ag({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    Ft.Trigger,
    {
      "data-slot": "context-menu-trigger",
      className: b("tw:select-none", t),
      ...e
    }
  );
}
function $g({ ...t }) {
  return /* @__PURE__ */ a(Ft.Group, { "data-slot": "context-menu-group", ...t });
}
function Vg({ ...t }) {
  return /* @__PURE__ */ a(Ft.Portal, { "data-slot": "context-menu-portal", ...t });
}
function Lg({ ...t }) {
  return /* @__PURE__ */ a(Ft.Sub, { "data-slot": "context-menu-sub", ...t });
}
function Bg({
  ...t
}) {
  return /* @__PURE__ */ a(Ft.RadioGroup, { "data-slot": "context-menu-radio-group", ...t });
}
function jg({
  className: t,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: e,
  ...r
}) {
  return /* @__PURE__ */ a(Ft.Portal, { children: /* @__PURE__ */ a(
    Ft.Content,
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
function Fg({
  className: t,
  inset: e,
  variant: r = "default",
  ...o
}) {
  return /* @__PURE__ */ a(
    Ft.Item,
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
function Ug({
  className: t,
  inset: e,
  children: r,
  ...o
}) {
  return /* @__PURE__ */ u(
    Ft.SubTrigger,
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
        /* @__PURE__ */ a(pi, { className: "tw:ms-auto" })
      ]
    }
  );
}
function Kg({
  className: t,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: e,
  ...r
}) {
  return /* @__PURE__ */ a(
    Ft.SubContent,
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
function Hg({
  className: t,
  children: e,
  checked: r,
  inset: o,
  ...n
}) {
  return /* @__PURE__ */ u(
    Ft.CheckboxItem,
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
        /* @__PURE__ */ a("span", { className: "tw:pointer-events-none tw:absolute tw:end-2", children: /* @__PURE__ */ a(Ft.ItemIndicator, { children: /* @__PURE__ */ a($a, {}) }) }),
        e
      ]
    }
  );
}
function qg({
  className: t,
  children: e,
  inset: r,
  ...o
}) {
  return /* @__PURE__ */ u(
    Ft.RadioItem,
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
        /* @__PURE__ */ a("span", { className: "tw:pointer-events-none tw:absolute tw:end-2", children: /* @__PURE__ */ a(Ft.ItemIndicator, { children: /* @__PURE__ */ a($a, {}) }) }),
        e
      ]
    }
  );
}
function Gg({
  className: t,
  inset: e,
  ...r
}) {
  return /* @__PURE__ */ a(
    Ft.Label,
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
function Wg({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    Ft.Separator,
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
function Yg({ className: t, ...e }) {
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
function Zg({ ...t }) {
  return /* @__PURE__ */ a(er.Root, { "data-slot": "drawer", ...t });
}
function Xg({ ...t }) {
  return /* @__PURE__ */ a(er.Trigger, { "data-slot": "drawer-trigger", ...t });
}
function Bp({ ...t }) {
  return /* @__PURE__ */ a(er.Portal, { "data-slot": "drawer-portal", ...t });
}
function Jg({ ...t }) {
  return /* @__PURE__ */ a(er.Close, { "data-slot": "drawer-close", ...t });
}
function jp({
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
function Qg({
  className: t,
  children: e,
  // CUSTOM: Destructure hideDrawerHandle to conditionally render the drag handle
  hideDrawerHandle: r = !1,
  ...o
}) {
  const n = Oe();
  return /* @__PURE__ */ u(Bp, { "data-slot": "drawer-portal", children: [
    /* @__PURE__ */ a(jp, {}),
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
function tf({ className: t, ...e }) {
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
function ef({ className: t, ...e }) {
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
function rf({ className: t, ...e }) {
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
function af({
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
function of({
  className: t,
  value: e,
  ...r
}) {
  return /* @__PURE__ */ a(
    mn.Root,
    {
      "data-slot": "progress",
      className: b(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:relative tw:flex tw:h-1 tw:w-full tw:items-center tw:overflow-x-hidden tw:rounded-full tw:bg-muted",
        t
      ),
      ...r,
      children: /* @__PURE__ */ a(
        mn.Indicator,
        {
          "data-slot": "progress-indicator",
          className: "tw:size-full tw:flex-1 tw:bg-primary tw:transition-all",
          style: { transform: `translateX(-${100 - (e || 0)}%)` }
        }
      )
    }
  );
}
function nf({ ...t }) {
  const { theme: e = "system" } = nd();
  return /* @__PURE__ */ a(
    id,
    {
      theme: e === "light" || e === "dark" || e === "system" ? e : "system",
      className: "tw:toaster tw:group",
      icons: {
        success: /* @__PURE__ */ a(tl, { className: "tw:size-4" }),
        info: /* @__PURE__ */ a(Qc, { className: "tw:size-4" }),
        warning: /* @__PURE__ */ a(Jc, { className: "tw:size-4" }),
        error: /* @__PURE__ */ a(Xc, { className: "tw:size-4" }),
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
function sf({
  className: t,
  defaultValue: e,
  value: r,
  min: o = 0,
  max: n = 100,
  ...s
}) {
  const i = Oe(), c = Zt.useMemo(
    () => Array.isArray(r) ? r : Array.isArray(e) ? e : [o, n],
    [r, e, o, n]
  );
  return /* @__PURE__ */ u(
    sa.Root,
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
          sa.Track,
          {
            "data-slot": "slider-track",
            className: "tw:relative tw:grow tw:overflow-hidden tw:rounded-full tw:bg-muted tw:data-horizontal:h-1 tw:data-horizontal:w-full tw:data-vertical:h-full tw:data-vertical:w-1",
            children: /* @__PURE__ */ a(
              sa.Range,
              {
                "data-slot": "slider-range",
                className: "tw:absolute tw:bg-primary tw:select-none tw:data-horizontal:h-full tw:data-vertical:w-full"
              }
            )
          }
        ),
        Array.from({ length: c.length }, (d, l) => /* @__PURE__ */ a(
          sa.Thumb,
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
function cf({
  className: t,
  size: e = "default",
  ...r
}) {
  return /* @__PURE__ */ a(
    vn.Root,
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
        vn.Thumb,
        {
          "data-slot": "switch-thumb",
          className: "tw:pointer-events-none tw:block tw:rounded-full tw:bg-background tw:ring-0 tw:transition-transform tw:group-data-[size=default]/switch:size-4 tw:group-data-[size=sm]/switch:size-3 tw:group-data-[size=default]/switch:data-checked:translate-x-[calc(100%-2px)] tw:rtl:group-data-[size=default]/switch:data-checked:-translate-x-[calc(100%-2px)] tw:group-data-[size=sm]/switch:data-checked:translate-x-[calc(100%-2px)] tw:rtl:group-data-[size=sm]/switch:data-checked:-translate-x-[calc(100%-2px)] tw:dark:data-checked:bg-primary-foreground tw:group-data-[size=default]/switch:data-unchecked:translate-x-0 tw:rtl:group-data-[size=default]/switch:data-unchecked:-translate-x-0 tw:group-data-[size=sm]/switch:data-unchecked:translate-x-0 tw:rtl:group-data-[size=sm]/switch:data-unchecked:-translate-x-0 tw:dark:data-unchecked:bg-foreground"
        }
      )
    }
  );
}
function lf({
  className: t,
  orientation: e = "horizontal",
  ...r
}) {
  return /* @__PURE__ */ a(
    be.Root,
    {
      "data-slot": "tabs",
      "data-orientation": e,
      className: b("tw:group/tabs tw:flex tw:gap-2 tw:data-horizontal:flex-col", t),
      ...r
    }
  );
}
const Fp = Ri(
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
function df({
  className: t,
  variant: e = "default",
  ...r
}) {
  const o = Oe();
  return /* @__PURE__ */ a(
    be.List,
    {
      "data-slot": "tabs-list",
      "data-variant": e,
      className: b("pr-twp", Fp({ variant: e }), t),
      dir: o,
      ...r
    }
  );
}
function wf({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    be.Trigger,
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
function uf({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    be.Content,
    {
      "data-slot": "tabs-content",
      className: b("pr-twp tw:flex-1 tw:text-sm tw:outline-none", t),
      ...e
    }
  );
}
const pf = (t, e) => {
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
}, hf = (t, e) => {
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
function Up(t) {
  return {
    preserveValue: !0,
    ...t
  };
}
const Kp = (t, e, r = {}) => {
  const o = V(e);
  o.current = e;
  const n = V(r);
  n.current = Up(n.current);
  const [s, i] = N(() => o.current), [c, d] = N(!0);
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
}, gf = (t) => {
  const [e, r] = N(!1), [o, n] = N(!1), [s, i] = N(0), c = V(void 0), d = P(() => {
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
  const [l, w] = Kp(d, void 0), p = $(() => {
    c.current && (r(!1), n(!1), i((h) => h + 1));
  }, []);
  return P(
    () => ({ data: l, isLoading: w, hasError: e, hasSettled: o, refetch: p }),
    [l, w, e, o, p]
  );
};
function ff(t) {
  Z(() => {
    let e;
    return t && (e = document.createElement("style"), e.appendChild(document.createTextNode(t)), document.head.appendChild(e)), () => {
      e && document.head.removeChild(e);
    };
  }, [t]);
}
function mf(t) {
  const e = P(() => jc(t).slice().sort().join(" "), [t]);
  return P(() => e ? e.split(" ") : [], [e]);
}
const Hp = () => {
  const [t, e] = N(
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
function vf(t, e) {
  const [r, o] = N(!1), n = V(e);
  n.current = e;
  const s = V(t);
  s.current = t;
  const i = $(() => {
    s.current ? n.current() : o(!0);
  }, []);
  return Z(() => {
    !t || !r || (o(!1), n.current());
  }, [t, r]), i;
}
function qp(t, e, r) {
  return t ? r.dark : e === void 0 ? r.lightDefault : r.lightUnselected;
}
function bf(t, e) {
  const r = Hp();
  return qp(t, r, e);
}
function xf({ value: t, children: e }) {
  return /* @__PURE__ */ a(Oi.Provider, { value: t, children: /* @__PURE__ */ a(Va.Provider, { value: t, children: e }) });
}
const yf = 300;
function Gp(t, e = "top") {
  if (!t || typeof document > "u") return;
  const r = document.head || document.querySelector("head"), o = r.querySelector(":first-child"), n = document.createElement("style");
  n.appendChild(document.createTextNode(t)), e === "top" && o ? r.insertBefore(n, o) : r.appendChild(n);
}
Gp(`/* By default the editor is too tall for the footnote editor, even while empty, so this makes it
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
@layer properties{@supports (((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))){*,:before,:after,::backdrop{--tw-translate-x:0;--tw-translate-y:0;--tw-translate-z:0;--tw-rotate-x:initial;--tw-rotate-y:initial;--tw-rotate-z:initial;--tw-skew-x:initial;--tw-skew-y:initial;--tw-space-y-reverse:0;--tw-space-x-reverse:0;--tw-divide-x-reverse:0;--tw-border-style:solid;--tw-divide-y-reverse:0;--tw-leading:initial;--tw-font-weight:initial;--tw-tracking:initial;--tw-ordinal:initial;--tw-slashed-zero:initial;--tw-numeric-figure:initial;--tw-numeric-spacing:initial;--tw-numeric-fraction:initial;--tw-shadow:0 0 #0000;--tw-shadow-color:initial;--tw-shadow-alpha:100%;--tw-inset-shadow:0 0 #0000;--tw-inset-shadow-color:initial;--tw-inset-shadow-alpha:100%;--tw-ring-color:initial;--tw-ring-shadow:0 0 #0000;--tw-inset-ring-color:initial;--tw-inset-ring-shadow:0 0 #0000;--tw-ring-inset:initial;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-offset-shadow:0 0 #0000;--tw-blur:initial;--tw-brightness:initial;--tw-contrast:initial;--tw-grayscale:initial;--tw-hue-rotate:initial;--tw-invert:initial;--tw-opacity:initial;--tw-saturate:initial;--tw-sepia:initial;--tw-drop-shadow:initial;--tw-drop-shadow-color:initial;--tw-drop-shadow-alpha:100%;--tw-drop-shadow-size:initial;--tw-duration:initial;--tw-ease:initial;--tw-content:"";--tw-backdrop-blur:initial;--tw-backdrop-brightness:initial;--tw-backdrop-contrast:initial;--tw-backdrop-grayscale:initial;--tw-backdrop-hue-rotate:initial;--tw-backdrop-invert:initial;--tw-backdrop-opacity:initial;--tw-backdrop-saturate:initial;--tw-backdrop-sepia:initial;--tw-outline-style:solid;--tw-animation-delay:0s;--tw-animation-direction:normal;--tw-animation-duration:initial;--tw-animation-fill-mode:none;--tw-animation-iteration-count:1;--tw-enter-blur:0;--tw-enter-opacity:1;--tw-enter-rotate:0;--tw-enter-scale:1;--tw-enter-translate-x:0;--tw-enter-translate-y:0;--tw-exit-blur:0;--tw-exit-opacity:1;--tw-exit-rotate:0;--tw-exit-scale:1;--tw-exit-translate-x:0;--tw-exit-translate-y:0}}}@layer theme{:root,:host{--tw-font-mono:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;--tw-color-red-100:oklch(93.6% .032 17.717);--tw-color-red-200:oklch(88.5% .062 18.334);--tw-color-red-300:oklch(80.8% .114 19.571);--tw-color-red-400:oklch(70.4% .191 22.216);--tw-color-red-500:oklch(63.7% .237 25.331);--tw-color-red-600:oklch(57.7% .245 27.325);--tw-color-red-700:oklch(50.5% .213 27.518);--tw-color-red-800:oklch(44.4% .177 26.899);--tw-color-orange-100:oklch(95.4% .038 75.164);--tw-color-orange-800:oklch(47% .157 37.304);--tw-color-amber-200:oklch(92.4% .12 95.746);--tw-color-amber-400:oklch(82.8% .189 84.429);--tw-color-amber-500:oklch(76.9% .188 70.08);--tw-color-amber-600:oklch(66.6% .179 58.318);--tw-color-yellow-50:oklch(98.7% .026 102.212);--tw-color-yellow-100:oklch(97.3% .071 103.193);--tw-color-yellow-400:oklch(85.2% .199 91.936);--tw-color-yellow-500:oklch(79.5% .184 86.047);--tw-color-yellow-600:oklch(68.1% .162 75.834);--tw-color-yellow-700:oklch(55.4% .135 66.442);--tw-color-green-50:oklch(98.2% .018 155.826);--tw-color-green-100:oklch(96.2% .044 156.743);--tw-color-green-500:oklch(72.3% .219 149.579);--tw-color-green-600:oklch(62.7% .194 149.214);--tw-color-green-700:oklch(52.7% .154 150.069);--tw-color-green-800:oklch(44.8% .119 151.328);--tw-color-teal-400:oklch(77.7% .152 181.912);--tw-color-teal-500:oklch(70.4% .14 182.503);--tw-color-teal-600:oklch(60% .118 184.704);--tw-color-sky-400:oklch(74.6% .16 232.661);--tw-color-sky-500:oklch(68.5% .169 237.323);--tw-color-sky-600:oklch(58.8% .158 241.966);--tw-color-blue-50:oklch(97% .014 254.604);--tw-color-blue-100:oklch(93.2% .032 255.585);--tw-color-blue-400:oklch(70.7% .165 254.624);--tw-color-blue-500:oklch(62.3% .214 259.815);--tw-color-blue-600:oklch(54.6% .245 262.881);--tw-color-blue-800:oklch(42.4% .199 265.638);--tw-color-indigo-200:oklch(87% .065 274.039);--tw-color-purple-50:oklch(97.7% .014 308.299);--tw-color-purple-200:oklch(90.2% .063 306.703);--tw-color-purple-900:oklch(38.1% .176 304.987);--tw-color-rose-400:oklch(71.2% .194 13.428);--tw-color-rose-500:oklch(64.5% .246 16.439);--tw-color-rose-600:oklch(58.6% .253 17.585);--tw-color-slate-300:oklch(86.9% .022 252.894);--tw-color-slate-400:oklch(70.4% .04 256.788);--tw-color-slate-900:oklch(20.8% .042 265.755);--tw-color-gray-50:oklch(98.5% .002 247.839);--tw-color-gray-100:oklch(96.7% .003 264.542);--tw-color-gray-300:oklch(87.2% .01 258.338);--tw-color-gray-500:oklch(55.1% .027 264.364);--tw-color-gray-600:oklch(44.6% .03 256.802);--tw-color-gray-700:oklch(37.3% .034 259.733);--tw-color-gray-800:oklch(27.8% .033 256.848);--tw-color-zinc-400:oklch(70.5% .015 286.067);--tw-color-neutral-300:oklch(87% 0 0);--tw-color-black:#000;--tw-color-white:#fff;--tw-container-xs:20rem;--tw-container-sm:24rem;--tw-container-md:28rem;--tw-container-lg:32rem;--tw-container-2xl:42rem;--tw-container-3xl:48rem;--tw-container-4xl:56rem;--tw-container-6xl:72rem;--tw-text-xs:.75rem;--tw-text-xs--line-height:calc(1 / .75);--tw-text-sm:.875rem;--tw-text-sm--line-height:calc(1.25 / .875);--tw-text-base:1rem;--tw-text-base--line-height:calc(1.5 / 1);--tw-text-lg:1.125rem;--tw-text-lg--line-height:calc(1.75 / 1.125);--tw-text-xl:1.25rem;--tw-text-xl--line-height:calc(1.75 / 1.25);--tw-text-2xl:1.5rem;--tw-text-2xl--line-height:calc(2 / 1.5);--tw-text-3xl:1.875rem;--tw-text-3xl--line-height:calc(2.25 / 1.875);--tw-text-4xl:2.25rem;--tw-text-4xl--line-height:calc(2.5 / 2.25);--tw-text-5xl:3rem;--tw-text-5xl--line-height:1;--tw-font-weight-normal:400;--tw-font-weight-medium:500;--tw-font-weight-semibold:600;--tw-font-weight-bold:700;--tw-font-weight-extrabold:800;--tw-tracking-tight:-.025em;--tw-tracking-wider:.05em;--tw-tracking-widest:.1em;--tw-leading-tight:1.25;--tw-leading-snug:1.375;--tw-leading-relaxed:1.625;--tw-leading-loose:2;--tw-radius-xs:.125rem;--tw-radius-md:calc(var(--radius) * .8);--tw-drop-shadow-sm:0 1px 2px #00000026;--tw-animate-spin:spin 1s linear infinite;--tw-animate-pulse:pulse 2s cubic-bezier(.4, 0, .6, 1) infinite;--tw-blur-xs:4px;--tw-blur-2xl:40px;--tw-default-transition-duration:.15s;--tw-default-transition-timing-function:cubic-bezier(.4, 0, .2, 1);--tw-default-font-family:"IBM Plex Sans Variable", sans-serif;--tw-default-mono-font-family:var(--tw-font-mono)}}@layer base{.pr-twp,.pr-twp *{border-color:var(--border);outline-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.pr-twp,.pr-twp *{outline-color:color-mix(in oklab, var(--ring) 50%, transparent)}}body.pr-twp{background-color:var(--background);color:var(--foreground)}html.pr-twp{font-family:IBM Plex Sans Variable,sans-serif}:where(.pr-twp,.pr-twp *),:where(.pr-twp,.pr-twp *):after,:where(.pr-twp,.pr-twp *):before,:where(.pr-twp,.pr-twp *) ::backdrop{box-sizing:border-box;border:0 solid;margin:0;padding:0}:where(.pr-twp,.pr-twp *) ::file-selector-button{box-sizing:border-box;border:0 solid;margin:0;padding:0}.pr-twp{-webkit-text-size-adjust:100%;tab-size:4;line-height:1.5;font-family:var(--tw-default-font-family,ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");font-feature-settings:var(--tw-default-font-feature-settings,normal);font-variation-settings:var(--tw-default-font-variation-settings,normal);-webkit-tap-highlight-color:transparent}hr:where(.pr-twp,.pr-twp *){height:0;color:inherit;border-top-width:1px}abbr:where([title]):where(.pr-twp,.pr-twp *){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1:where(.pr-twp,.pr-twp *),h2:where(.pr-twp,.pr-twp *),h3:where(.pr-twp,.pr-twp *),h4:where(.pr-twp,.pr-twp *),h5:where(.pr-twp,.pr-twp *),h6:where(.pr-twp,.pr-twp *){font-size:inherit;font-weight:inherit}a:where(.pr-twp,.pr-twp *){color:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b:where(.pr-twp,.pr-twp *),strong:where(.pr-twp,.pr-twp *){font-weight:bolder}code:where(.pr-twp,.pr-twp *),kbd:where(.pr-twp,.pr-twp *),samp:where(.pr-twp,.pr-twp *),pre:where(.pr-twp,.pr-twp *){font-family:var(--tw-default-mono-font-family,ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace);font-feature-settings:var(--tw-default-mono-font-feature-settings,normal);font-variation-settings:var(--tw-default-mono-font-variation-settings,normal);font-size:1em}small:where(.pr-twp,.pr-twp *){font-size:80%}sub:where(.pr-twp,.pr-twp *),sup:where(.pr-twp,.pr-twp *){vertical-align:baseline;font-size:75%;line-height:0;position:relative}sub:where(.pr-twp,.pr-twp *){bottom:-.25em}sup:where(.pr-twp,.pr-twp *){top:-.5em}table:where(.pr-twp,.pr-twp *){text-indent:0;border-color:inherit;border-collapse:collapse}:-moz-focusring:where(.pr-twp,.pr-twp *){outline:auto}progress:where(.pr-twp,.pr-twp *){vertical-align:baseline}summary:where(.pr-twp,.pr-twp *){display:list-item}ol:where(.pr-twp,.pr-twp *),ul:where(.pr-twp,.pr-twp *),menu:where(.pr-twp,.pr-twp *){list-style:none}img:where(.pr-twp,.pr-twp *),svg:where(.pr-twp,.pr-twp *),video:where(.pr-twp,.pr-twp *),canvas:where(.pr-twp,.pr-twp *),audio:where(.pr-twp,.pr-twp *),iframe:where(.pr-twp,.pr-twp *),embed:where(.pr-twp,.pr-twp *),object:where(.pr-twp,.pr-twp *){vertical-align:middle;display:block}img:where(.pr-twp,.pr-twp *),video:where(.pr-twp,.pr-twp *){max-width:100%;height:auto}button:where(.pr-twp,.pr-twp *),input:where(.pr-twp,.pr-twp *),select:where(.pr-twp,.pr-twp *),optgroup:where(.pr-twp,.pr-twp *),textarea:where(.pr-twp,.pr-twp *){font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(.pr-twp,.pr-twp *) ::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(select:is([multiple],[size])) optgroup:where(.pr-twp,.pr-twp *){font-weight:bolder}:where(select:is([multiple],[size])) optgroup option:where(.pr-twp,.pr-twp *){padding-inline-start:20px}:where(.pr-twp,.pr-twp *) ::file-selector-button{margin-inline-end:4px}:where(.pr-twp,.pr-twp *) ::placeholder{opacity:1}@supports (not ((-webkit-appearance:-apple-pay-button))) or (contain-intrinsic-size:1px){:where(.pr-twp,.pr-twp *) ::placeholder{color:currentColor}@supports (color:color-mix(in lab, red, red)){:where(.pr-twp,.pr-twp *) ::placeholder{color:color-mix(in oklab, currentcolor 50%, transparent)}}}textarea:where(.pr-twp,.pr-twp *){resize:vertical}:where(.pr-twp,.pr-twp *) ::-webkit-search-decoration{-webkit-appearance:none}:where(.pr-twp,.pr-twp *) ::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit{display:inline-flex}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-fields-wrapper{padding:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-year-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-month-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-day-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-hour-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-minute-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-second-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-millisecond-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-meridiem-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-calendar-picker-indicator{line-height:1}:-moz-ui-invalid:where(.pr-twp,.pr-twp *){box-shadow:none}button:where(.pr-twp,.pr-twp *),input:where([type=button],[type=reset],[type=submit]):where(.pr-twp,.pr-twp *){appearance:button}:where(.pr-twp,.pr-twp *) ::file-selector-button{appearance:button}:where(.pr-twp,.pr-twp *) ::-webkit-inner-spin-button{height:auto}:where(.pr-twp,.pr-twp *) ::-webkit-outer-spin-button{height:auto}[hidden]:where(:not([hidden=until-found])):where(.pr-twp,.pr-twp *){display:none!important}}@layer components;@layer utilities{.tw\\:\\@container\\/card-header{container:card-header/inline-size}.tw\\:\\@container\\/search{container:search/inline-size}.tw\\:\\@container\\/toolbar{container:toolbar/inline-size}.tw\\:pointer-events-auto{pointer-events:auto}.tw\\:pointer-events-none{pointer-events:none}.tw\\:invisible{visibility:hidden}.tw\\:sr-only{clip-path:inset(50%);white-space:nowrap;border-width:0;width:1px;height:1px;margin:-1px;padding:0;position:absolute;overflow:hidden}.tw\\:absolute{position:absolute}.tw\\:fixed{position:fixed}.tw\\:relative{position:relative}.tw\\:sticky{position:sticky}.tw\\:inset-0{inset:calc(calc(var(--spacing)) * 0)}.tw\\:inset-y-0{inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:inset-s-3{inset-inline-start:calc(calc(var(--spacing)) * 3)}.tw\\:start-1\\.5{inset-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:start-1\\/2{inset-inline-start:50%}.tw\\:end-0{inset-inline-end:calc(calc(var(--spacing)) * 0)}.tw\\:end-1{inset-inline-end:calc(calc(var(--spacing)) * 1)}.tw\\:end-2{inset-inline-end:calc(calc(var(--spacing)) * 2)}.tw\\:end-3{inset-inline-end:calc(calc(var(--spacing)) * 3)}.tw\\:inset-e-0{inset-inline-end:calc(calc(var(--spacing)) * 0)}.tw\\:-top-\\[1px\\]{top:-1px}.tw\\:top-0{top:calc(calc(var(--spacing)) * 0)}.tw\\:top-1{top:calc(calc(var(--spacing)) * 1)}.tw\\:top-1\\.5{top:calc(calc(var(--spacing)) * 1.5)}.tw\\:top-1\\/2{top:50%}.tw\\:top-1\\/3{top:33.3333%}.tw\\:top-2{top:calc(calc(var(--spacing)) * 2)}.tw\\:top-2\\.5{top:calc(calc(var(--spacing)) * 2.5)}.tw\\:top-3\\.5{top:calc(calc(var(--spacing)) * 3.5)}.tw\\:top-\\[-1px\\]{top:-1px}.tw\\:top-full{top:100%}.tw\\:-right-1{right:calc(calc(var(--spacing)) * -1)}.tw\\:right-0{right:calc(calc(var(--spacing)) * 0)}.tw\\:right-1{right:calc(calc(var(--spacing)) * 1)}.tw\\:right-3{right:calc(calc(var(--spacing)) * 3)}.tw\\:bottom-0{bottom:calc(calc(var(--spacing)) * 0)}.tw\\:-left-\\[1px\\]{left:-1px}.tw\\:left-0{left:calc(calc(var(--spacing)) * 0)}.tw\\:left-1\\/2{left:50%}.tw\\:left-2{left:calc(calc(var(--spacing)) * 2)}.tw\\:left-3{left:calc(calc(var(--spacing)) * 3)}.tw\\:isolate{isolation:isolate}.tw\\:z-10{z-index:10}.tw\\:z-20{z-index:20}.tw\\:z-50{z-index:50}.tw\\:order-first{order:-9999}.tw\\:order-last{order:9999}.tw\\:col-span-1{grid-column:span 1/span 1}.tw\\:col-span-2{grid-column:span 2/span 2}.tw\\:col-span-3{grid-column:span 3/span 3}.tw\\:col-start-1{grid-column-start:1}.tw\\:col-start-2{grid-column-start:2}.tw\\:row-span-2{grid-row:span 2/span 2}.tw\\:row-start-1{grid-row-start:1}.tw\\:row-start-2{grid-row-start:2}.tw\\:m-0{margin:calc(calc(var(--spacing)) * 0)}.tw\\:m-1{margin:calc(calc(var(--spacing)) * 1)}.tw\\:m-2{margin:calc(calc(var(--spacing)) * 2)}.tw\\:-mx-1{margin-inline:calc(calc(var(--spacing)) * -1)}.tw\\:-mx-4{margin-inline:calc(calc(var(--spacing)) * -4)}.tw\\:mx-0{margin-inline:calc(calc(var(--spacing)) * 0)}.tw\\:mx-1{margin-inline:calc(calc(var(--spacing)) * 1)}.tw\\:mx-2{margin-inline:calc(calc(var(--spacing)) * 2)}.tw\\:mx-3\\.5{margin-inline:calc(calc(var(--spacing)) * 3.5)}.tw\\:mx-4{margin-inline:calc(calc(var(--spacing)) * 4)}.tw\\:mx-8{margin-inline:calc(calc(var(--spacing)) * 8)}.tw\\:my-1{margin-block:calc(calc(var(--spacing)) * 1)}.tw\\:my-2\\.5{margin-block:calc(calc(var(--spacing)) * 2.5)}.tw\\:my-4{margin-block:calc(calc(var(--spacing)) * 4)}.tw\\:my-auto{margin-block:auto}.tw\\:ms-1{margin-inline-start:calc(calc(var(--spacing)) * 1)}.tw\\:ms-2{margin-inline-start:calc(calc(var(--spacing)) * 2)}.tw\\:ms-5{margin-inline-start:calc(calc(var(--spacing)) * 5)}.tw\\:ms-6{margin-inline-start:calc(calc(var(--spacing)) * 6)}.tw\\:ms-auto{margin-inline-start:auto}.tw\\:me-1{margin-inline-end:calc(calc(var(--spacing)) * 1)}.tw\\:me-2{margin-inline-end:calc(calc(var(--spacing)) * 2)}.tw\\:prose{color:var(--tw-prose-body);max-width:65ch}.tw\\:prose :where(p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em}.tw\\:prose :where([class~=lead]):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-lead);margin-top:1.2em;margin-bottom:1.2em;font-size:1.25em;line-height:1.6}.tw\\:prose :where(a):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-links);font-weight:500;text-decoration:underline}.tw\\:prose :where(strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-bold);font-weight:600}.tw\\:prose :where(a strong):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(blockquote strong):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(thead th strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.tw\\:prose :where(ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em;padding-inline-start:1.625em;list-style-type:decimal}.tw\\:prose :where(ol[type=A]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-alpha}.tw\\:prose :where(ol[type=a]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-alpha}.tw\\:prose :where(ol[type=A s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-alpha}.tw\\:prose :where(ol[type=a s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-alpha}.tw\\:prose :where(ol[type=I]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-roman}.tw\\:prose :where(ol[type=i]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-roman}.tw\\:prose :where(ol[type=I s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-roman}.tw\\:prose :where(ol[type=i s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-roman}.tw\\:prose :where(ol[type="1"]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:decimal}.tw\\:prose :where(ul):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em;padding-inline-start:1.625em;list-style-type:disc}.tw\\:prose :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *))::marker{color:var(--tw-prose-counters);font-weight:400}.tw\\:prose :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *))::marker{color:var(--tw-prose-bullets)}.tw\\:prose :where(dt):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:1.25em;font-weight:600}.tw\\:prose :where(hr):not(:where([class~=not-prose],[class~=not-prose] *)){border-color:var(--tw-prose-hr);border-top-width:1px;margin-top:3em;margin-bottom:3em}.tw\\:prose :where(blockquote):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-quotes);border-inline-start-width:.25rem;border-inline-start-color:var(--tw-prose-quote-borders);quotes:"“""”""‘""’";margin-top:1.6em;margin-bottom:1.6em;padding-inline-start:1em;font-style:italic;font-weight:500}.tw\\:prose :where(blockquote p:first-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):before{content:open-quote}.tw\\:prose :where(blockquote p:last-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:close-quote}.tw\\:prose :where(h1):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:0;margin-bottom:.888889em;font-size:2.25em;font-weight:800;line-height:1.11111}.tw\\:prose :where(h1 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:900}.tw\\:prose :where(h2):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:2em;margin-bottom:1em;font-size:1.5em;font-weight:700;line-height:1.33333}.tw\\:prose :where(h2 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:800}.tw\\:prose :where(h3):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:1.6em;margin-bottom:.6em;font-size:1.25em;font-weight:600;line-height:1.6}.tw\\:prose :where(h3 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:700}.tw\\:prose :where(h4):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:1.5em;margin-bottom:.5em;font-weight:600;line-height:1.5}.tw\\:prose :where(h4 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:700}.tw\\:prose :where(img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.tw\\:prose :where(picture):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em;display:block}.tw\\:prose :where(video):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.tw\\:prose :where(kbd):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-kbd);box-shadow:0 0 0 1px rgb(var(--tw-prose-kbd-shadows) / 10%), 0 3px 0 rgb(var(--tw-prose-kbd-shadows) / 10%);padding-top:.1875em;padding-inline-end:.375em;padding-bottom:.1875em;border-radius:.3125rem;padding-inline-start:.375em;font-family:inherit;font-size:.875em;font-weight:500}.tw\\:prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-code);font-size:.875em;font-weight:600}.tw\\:prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)):before,.tw\\:prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:"\`"}.tw\\:prose :where(a code):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h1 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.tw\\:prose :where(h2 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-size:.875em}.tw\\:prose :where(h3 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-size:.9em}.tw\\:prose :where(h4 code):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(blockquote code):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(thead th code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.tw\\:prose :where(pre):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-pre-code);background-color:var(--tw-prose-pre-bg);padding-top:.857143em;padding-inline-end:1.14286em;padding-bottom:.857143em;border-radius:.375rem;margin-top:1.71429em;margin-bottom:1.71429em;padding-inline-start:1.14286em;font-size:.875em;font-weight:400;line-height:1.71429;overflow-x:auto}.tw\\:prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)){font-weight:inherit;color:inherit;font-size:inherit;font-family:inherit;line-height:inherit;background-color:#0000;border-width:0;border-radius:0;padding:0}.tw\\:prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)):before,.tw\\:prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:none}.tw\\:prose :where(table):not(:where([class~=not-prose],[class~=not-prose] *)){table-layout:auto;width:100%;margin-top:2em;margin-bottom:2em;font-size:.875em;line-height:1.71429}.tw\\:prose :where(thead):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:1px;border-bottom-color:var(--tw-prose-th-borders)}.tw\\:prose :where(thead th):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);vertical-align:bottom;padding-inline-end:.571429em;padding-bottom:.571429em;padding-inline-start:.571429em;font-weight:600}.tw\\:prose :where(tbody tr):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:1px;border-bottom-color:var(--tw-prose-td-borders)}.tw\\:prose :where(tbody tr:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:0}.tw\\:prose :where(tbody td):not(:where([class~=not-prose],[class~=not-prose] *)){vertical-align:baseline}.tw\\:prose :where(tfoot):not(:where([class~=not-prose],[class~=not-prose] *)){border-top-width:1px;border-top-color:var(--tw-prose-th-borders)}.tw\\:prose :where(tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){vertical-align:top}.tw\\:prose :where(th,td):not(:where([class~=not-prose],[class~=not-prose] *)){text-align:start}.tw\\:prose :where(figure>*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose :where(figcaption):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-captions);margin-top:.857143em;font-size:.875em;line-height:1.42857}.tw\\:prose{--tw-prose-body:var(--foreground);--tw-prose-headings:var(--foreground);--tw-prose-lead:var(--muted-foreground);--tw-prose-links:var(--primary);--tw-prose-bold:var(--foreground);--tw-prose-counters:var(--muted-foreground);--tw-prose-bullets:var(--muted-foreground);--tw-prose-hr:var(--border);--tw-prose-quotes:var(--foreground);--tw-prose-quote-borders:var(--border);--tw-prose-captions:var(--muted-foreground);--tw-prose-kbd:oklch(21% .034 264.665);--tw-prose-kbd-shadows:NaN NaN NaN;--tw-prose-code:var(--foreground);--tw-prose-pre-code:var(--muted-foreground);--tw-prose-pre-bg:var(--muted);--tw-prose-th-borders:var(--border);--tw-prose-td-borders:var(--border);--tw-prose-invert-body:var(--foreground);--tw-prose-invert-headings:var(--foreground);--tw-prose-invert-lead:var(--muted-foreground);--tw-prose-invert-links:var(--primary);--tw-prose-invert-bold:var(--foreground);--tw-prose-invert-counters:var(--muted-foreground);--tw-prose-invert-bullets:var(--muted-foreground);--tw-prose-invert-hr:var(--border);--tw-prose-invert-quotes:var(--foreground);--tw-prose-invert-quote-borders:var(--border);--tw-prose-invert-captions:var(--muted-foreground);--tw-prose-invert-kbd:#fff;--tw-prose-invert-kbd-shadows:255 255 255;--tw-prose-invert-code:var(--foreground);--tw-prose-invert-pre-code:var(--muted-foreground);--tw-prose-invert-pre-bg:var(--muted);--tw-prose-invert-th-borders:var(--border);--tw-prose-invert-td-borders:var(--border);font-size:1rem;line-height:1.75}.tw\\:prose :where(picture>img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose :where(li):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.5em;margin-bottom:.5em}.tw\\:prose :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:.375em}.tw\\:prose :where(.tw\\:prose>ul>li p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.75em;margin-bottom:.75em}.tw\\:prose :where(.tw\\:prose>ul>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em}.tw\\:prose :where(.tw\\:prose>ul>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.25em}.tw\\:prose :where(.tw\\:prose>ol>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em}.tw\\:prose :where(.tw\\:prose>ol>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.25em}.tw\\:prose :where(ul ul,ul ol,ol ul,ol ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.75em;margin-bottom:.75em}.tw\\:prose :where(dl):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em}.tw\\:prose :where(dd):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.5em;padding-inline-start:1.625em}.tw\\:prose :where(hr+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h2+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h3+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h4+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose :where(thead th:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose :where(thead th:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose :where(tbody td,tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.571429em;padding-inline-end:.571429em;padding-bottom:.571429em;padding-inline-start:.571429em}.tw\\:prose :where(tbody td:first-child,tfoot td:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose :where(tbody td:last-child,tfoot td:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose :where(figure):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.tw\\:prose :where(.tw\\:prose>:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose :where(.tw\\:prose>:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:0}.tw\\:prose-sm{font-size:.875rem;line-height:1.71429}.tw\\:prose-sm :where(p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em;margin-bottom:1.14286em}.tw\\:prose-sm :where([class~=lead]):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.888889em;margin-bottom:.888889em;font-size:1.28571em;line-height:1.55556}.tw\\:prose-sm :where(blockquote):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.33333em;margin-bottom:1.33333em;padding-inline-start:1.11111em}.tw\\:prose-sm :where(h1):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:.8em;font-size:2.14286em;line-height:1.2}.tw\\:prose-sm :where(h2):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.6em;margin-bottom:.8em;font-size:1.42857em;line-height:1.4}.tw\\:prose-sm :where(h3):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.55556em;margin-bottom:.444444em;font-size:1.28571em;line-height:1.55556}.tw\\:prose-sm :where(h4):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.42857em;margin-bottom:.571429em;line-height:1.42857}.tw\\:prose-sm :where(img):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(picture):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.71429em;margin-bottom:1.71429em}.tw\\:prose-sm :where(picture>img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose-sm :where(video):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.71429em;margin-bottom:1.71429em}.tw\\:prose-sm :where(kbd):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.142857em;padding-inline-end:.357143em;padding-bottom:.142857em;border-radius:.3125rem;padding-inline-start:.357143em;font-size:.857143em}.tw\\:prose-sm :where(code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.857143em}.tw\\:prose-sm :where(h2 code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.9em}.tw\\:prose-sm :where(h3 code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.888889em}.tw\\:prose-sm :where(pre):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.666667em;padding-inline-end:1em;padding-bottom:.666667em;border-radius:.25rem;margin-top:1.66667em;margin-bottom:1.66667em;padding-inline-start:1em;font-size:.857143em;line-height:1.66667}.tw\\:prose-sm :where(ol):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(ul):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em;margin-bottom:1.14286em;padding-inline-start:1.57143em}.tw\\:prose-sm :where(li):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.285714em;margin-bottom:.285714em}.tw\\:prose-sm :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:.428571em}.tw\\:prose-sm :where(.tw\\:prose-sm>ul>li p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.571429em;margin-bottom:.571429em}.tw\\:prose-sm :where(.tw\\:prose-sm>ul>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em}.tw\\:prose-sm :where(.tw\\:prose-sm>ul>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.14286em}.tw\\:prose-sm :where(.tw\\:prose-sm>ol>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em}.tw\\:prose-sm :where(.tw\\:prose-sm>ol>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.14286em}.tw\\:prose-sm :where(ul ul,ul ol,ol ul,ol ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.571429em;margin-bottom:.571429em}.tw\\:prose-sm :where(dl):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em;margin-bottom:1.14286em}.tw\\:prose-sm :where(dt):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em}.tw\\:prose-sm :where(dd):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.285714em;padding-inline-start:1.57143em}.tw\\:prose-sm :where(hr):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2.85714em;margin-bottom:2.85714em}.tw\\:prose-sm :where(hr+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(h2+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(h3+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(h4+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose-sm :where(table):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.857143em;line-height:1.5}.tw\\:prose-sm :where(thead th):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:1em;padding-bottom:.666667em;padding-inline-start:1em}.tw\\:prose-sm :where(thead th:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose-sm :where(thead th:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose-sm :where(tbody td,tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.666667em;padding-inline-end:1em;padding-bottom:.666667em;padding-inline-start:1em}.tw\\:prose-sm :where(tbody td:first-child,tfoot td:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose-sm :where(tbody td:last-child,tfoot td:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose-sm :where(figure):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.71429em;margin-bottom:1.71429em}.tw\\:prose-sm :where(figure>*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose-sm :where(figcaption):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.666667em;font-size:.857143em;line-height:1.33333}.tw\\:prose-sm :where(.tw\\:prose-sm>:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose-sm :where(.tw\\:prose-sm>:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:0}.tw\\:-mt-4{margin-top:calc(calc(var(--spacing)) * -4)}.tw\\:mt-0\\.5{margin-top:calc(calc(var(--spacing)) * .5)}.tw\\:mt-1{margin-top:calc(calc(var(--spacing)) * 1)}.tw\\:mt-2{margin-top:calc(calc(var(--spacing)) * 2)}.tw\\:mt-3{margin-top:calc(calc(var(--spacing)) * 3)}.tw\\:mt-4{margin-top:calc(calc(var(--spacing)) * 4)}.tw\\:mt-6{margin-top:calc(calc(var(--spacing)) * 6)}.tw\\:mt-auto{margin-top:auto}.tw\\:mr-1{margin-right:calc(calc(var(--spacing)) * 1)}.tw\\:mr-2{margin-right:calc(calc(var(--spacing)) * 2)}.tw\\:mr-3{margin-right:calc(calc(var(--spacing)) * 3)}.tw\\:-mb-4{margin-bottom:calc(calc(var(--spacing)) * -4)}.tw\\:mb-1{margin-bottom:calc(calc(var(--spacing)) * 1)}.tw\\:mb-2{margin-bottom:calc(calc(var(--spacing)) * 2)}.tw\\:mb-3{margin-bottom:calc(calc(var(--spacing)) * 3)}.tw\\:mb-4{margin-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:ml-1{margin-left:calc(calc(var(--spacing)) * 1)}.tw\\:ml-2{margin-left:calc(calc(var(--spacing)) * 2)}.tw\\:ml-4{margin-left:calc(calc(var(--spacing)) * 4)}.tw\\:ml-auto{margin-left:auto}.tw\\:box-border{box-sizing:border-box}.tw\\:line-clamp-3{-webkit-line-clamp:3;-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden}.tw\\:no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}.tw\\:no-scrollbar::-webkit-scrollbar{display:none}.tw\\:block{display:block}.tw\\:flex{display:flex}.tw\\:grid{display:grid}.tw\\:hidden{display:none}.tw\\:inline-block{display:inline-block}.tw\\:inline-flex{display:inline-flex}.tw\\:inline-grid{display:inline-grid}.tw\\:field-sizing-content{field-sizing:content}.tw\\:aspect-square{aspect-ratio:1}.tw\\:size-2{width:calc(calc(var(--spacing)) * 2);height:calc(calc(var(--spacing)) * 2)}.tw\\:size-2\\.5{width:calc(calc(var(--spacing)) * 2.5);height:calc(calc(var(--spacing)) * 2.5)}.tw\\:size-3{width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:size-3\\.5{width:calc(calc(var(--spacing)) * 3.5);height:calc(calc(var(--spacing)) * 3.5)}.tw\\:size-4{width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:size-6{width:calc(calc(var(--spacing)) * 6);height:calc(calc(var(--spacing)) * 6)}.tw\\:size-7{width:calc(calc(var(--spacing)) * 7);height:calc(calc(var(--spacing)) * 7)}.tw\\:size-8{width:calc(calc(var(--spacing)) * 8);height:calc(calc(var(--spacing)) * 8)}.tw\\:size-9{width:calc(calc(var(--spacing)) * 9);height:calc(calc(var(--spacing)) * 9)}.tw\\:size-10{width:calc(calc(var(--spacing)) * 10);height:calc(calc(var(--spacing)) * 10)}.tw\\:size-full{width:100%;height:100%}.tw\\:h-1{height:calc(calc(var(--spacing)) * 1)}.tw\\:h-2{height:calc(calc(var(--spacing)) * 2)}.tw\\:h-3{height:calc(calc(var(--spacing)) * 3)}.tw\\:h-3\\.5{height:calc(calc(var(--spacing)) * 3.5)}.tw\\:h-4{height:calc(calc(var(--spacing)) * 4)}.tw\\:h-5{height:calc(calc(var(--spacing)) * 5)}.tw\\:h-6{height:calc(calc(var(--spacing)) * 6)}.tw\\:h-7{height:calc(calc(var(--spacing)) * 7)}.tw\\:h-8{height:calc(calc(var(--spacing)) * 8)}.tw\\:h-8\\!{height:calc(calc(var(--spacing)) * 8)!important}.tw\\:h-8\\.5{height:calc(calc(var(--spacing)) * 8.5)}.tw\\:h-9{height:calc(calc(var(--spacing)) * 9)}.tw\\:h-10{height:calc(calc(var(--spacing)) * 10)}.tw\\:h-12{height:calc(calc(var(--spacing)) * 12)}.tw\\:h-14{height:calc(calc(var(--spacing)) * 14)}.tw\\:h-20{height:calc(calc(var(--spacing)) * 20)}.tw\\:h-24{height:calc(calc(var(--spacing)) * 24)}.tw\\:h-32{height:calc(calc(var(--spacing)) * 32)}.tw\\:h-40{height:calc(calc(var(--spacing)) * 40)}.tw\\:h-64{height:calc(calc(var(--spacing)) * 64)}.tw\\:h-80{height:calc(calc(var(--spacing)) * 80)}.tw\\:h-96{height:calc(calc(var(--spacing)) * 96)}.tw\\:h-\\[5px\\]{height:5px}.tw\\:h-\\[260px\\]{height:260px}.tw\\:h-\\[300px\\]{height:300px}.tw\\:h-\\[400px\\]{height:400px}.tw\\:h-\\[600px\\]{height:600px}.tw\\:h-\\[calc\\(100\\%-1px\\)\\]{height:calc(100% - 1px)}.tw\\:h-\\[calc\\(100\\%-2px\\)\\]{height:calc(100% - 2px)}.tw\\:h-auto{height:auto}.tw\\:h-full{height:100%}.tw\\:h-px{height:1px}.tw\\:h-screen{height:100vh}.tw\\:h-svh{height:100svh}.tw\\:max-h-\\(--radix-context-menu-content-available-height\\){max-height:var(--radix-context-menu-content-available-height)}.tw\\:max-h-\\(--radix-dropdown-menu-content-available-height\\){max-height:var(--radix-dropdown-menu-content-available-height)}.tw\\:max-h-\\(--radix-popover-content-available-height\\){max-height:var(--radix-popover-content-available-height)}.tw\\:max-h-\\(--radix-select-content-available-height\\){max-height:var(--radix-select-content-available-height)}.tw\\:max-h-5{max-height:calc(calc(var(--spacing)) * 5)}.tw\\:max-h-10{max-height:calc(calc(var(--spacing)) * 10)}.tw\\:max-h-72{max-height:calc(calc(var(--spacing)) * 72)}.tw\\:max-h-80{max-height:calc(calc(var(--spacing)) * 80)}.tw\\:max-h-\\[96\\%\\]{max-height:96%}.tw\\:max-h-\\[300px\\]{max-height:300px}.tw\\:min-h-0{min-height:calc(calc(var(--spacing)) * 0)}.tw\\:min-h-11{min-height:calc(calc(var(--spacing)) * 11)}.tw\\:min-h-16{min-height:calc(calc(var(--spacing)) * 16)}.tw\\:min-h-\\[200px\\]{min-height:200px}.tw\\:min-h-full{min-height:100%}.tw\\:min-h-svh{min-height:100svh}.tw\\:w-\\(--radix-dropdown-menu-trigger-width\\){width:var(--radix-dropdown-menu-trigger-width)}.tw\\:w-\\(--sidebar-width\\){width:var(--sidebar-width)}.tw\\:w-1{width:calc(calc(var(--spacing)) * 1)}.tw\\:w-1\\/2{width:50%}.tw\\:w-2{width:calc(calc(var(--spacing)) * 2)}.tw\\:w-3{width:calc(calc(var(--spacing)) * 3)}.tw\\:w-3\\.5{width:calc(calc(var(--spacing)) * 3.5)}.tw\\:w-3\\/4{width:75%}.tw\\:w-4{width:calc(calc(var(--spacing)) * 4)}.tw\\:w-4\\/5{width:80%}.tw\\:w-4\\/6{width:66.6667%}.tw\\:w-5{width:calc(calc(var(--spacing)) * 5)}.tw\\:w-5\\/6{width:83.3333%}.tw\\:w-6{width:calc(calc(var(--spacing)) * 6)}.tw\\:w-8{width:calc(calc(var(--spacing)) * 8)}.tw\\:w-9{width:calc(calc(var(--spacing)) * 9)}.tw\\:w-9\\/12{width:75%}.tw\\:w-10{width:calc(calc(var(--spacing)) * 10)}.tw\\:w-12{width:calc(calc(var(--spacing)) * 12)}.tw\\:w-14{width:calc(calc(var(--spacing)) * 14)}.tw\\:w-20{width:calc(calc(var(--spacing)) * 20)}.tw\\:w-24{width:calc(calc(var(--spacing)) * 24)}.tw\\:w-32{width:calc(calc(var(--spacing)) * 32)}.tw\\:w-48{width:calc(calc(var(--spacing)) * 48)}.tw\\:w-56{width:calc(calc(var(--spacing)) * 56)}.tw\\:w-60{width:calc(calc(var(--spacing)) * 60)}.tw\\:w-64{width:calc(calc(var(--spacing)) * 64)}.tw\\:w-72{width:calc(calc(var(--spacing)) * 72)}.tw\\:w-80{width:calc(calc(var(--spacing)) * 80)}.tw\\:w-96{width:calc(calc(var(--spacing)) * 96)}.tw\\:w-\\[1px\\]{width:1px}.tw\\:w-\\[5px\\]{width:5px}.tw\\:w-\\[70px\\]{width:70px}.tw\\:w-\\[100px\\]{width:100px}.tw\\:w-\\[116px\\]{width:116px}.tw\\:w-\\[124px\\]{width:124px}.tw\\:w-\\[150px\\]{width:150px}.tw\\:w-\\[180px\\]{width:180px}.tw\\:w-\\[200px\\]{width:200px}.tw\\:w-\\[250px\\]{width:250px}.tw\\:w-\\[260px\\]{width:260px}.tw\\:w-\\[280px\\]{width:280px}.tw\\:w-\\[300px\\]{width:300px}.tw\\:w-\\[320px\\]{width:320px}.tw\\:w-\\[350px\\]{width:350px}.tw\\:w-\\[400px\\]{width:400px}.tw\\:w-\\[420px\\]{width:420px}.tw\\:w-\\[500px\\]{width:500px}.tw\\:w-\\[560px\\]{width:560px}.tw\\:w-\\[600px\\]{width:600px}.tw\\:w-\\[calc\\(100\\%-2px\\)\\]{width:calc(100% - 2px)}.tw\\:w-\\[var\\(--radix-dropdown-menu-trigger-width\\)\\]{width:var(--radix-dropdown-menu-trigger-width)}.tw\\:w-auto{width:auto}.tw\\:w-fit{width:fit-content}.tw\\:w-full{width:100%}.tw\\:w-max{width:max-content}.tw\\:w-px{width:1px}.tw\\:max-w-\\(--skeleton-width\\){max-width:var(--skeleton-width)}.tw\\:max-w-2xl{max-width:var(--tw-container-2xl)}.tw\\:max-w-3xl{max-width:var(--tw-container-3xl)}.tw\\:max-w-4xl{max-width:var(--tw-container-4xl)}.tw\\:max-w-5{max-width:calc(calc(var(--spacing)) * 5)}.tw\\:max-w-6xl{max-width:var(--tw-container-6xl)}.tw\\:max-w-40{max-width:calc(calc(var(--spacing)) * 40)}.tw\\:max-w-48{max-width:calc(calc(var(--spacing)) * 48)}.tw\\:max-w-64{max-width:calc(calc(var(--spacing)) * 64)}.tw\\:max-w-96{max-width:calc(calc(var(--spacing)) * 96)}.tw\\:max-w-\\[200px\\]{max-width:200px}.tw\\:max-w-\\[220px\\]{max-width:220px}.tw\\:max-w-\\[calc\\(100\\%-2rem\\)\\]{max-width:calc(100% - 2rem)}.tw\\:max-w-\\[calc\\(100vw-2rem\\)\\]{max-width:calc(100vw - 2rem)}.tw\\:max-w-fit{max-width:fit-content}.tw\\:max-w-full{max-width:100%}.tw\\:max-w-lg{max-width:var(--tw-container-lg)}.tw\\:max-w-md{max-width:var(--tw-container-md)}.tw\\:max-w-none{max-width:none}.tw\\:max-w-sm{max-width:var(--tw-container-sm)}.tw\\:max-w-xs{max-width:var(--tw-container-xs)}.tw\\:min-w-0{min-width:calc(calc(var(--spacing)) * 0)}.tw\\:min-w-4{min-width:calc(calc(var(--spacing)) * 4)}.tw\\:min-w-5{min-width:calc(calc(var(--spacing)) * 5)}.tw\\:min-w-7{min-width:calc(calc(var(--spacing)) * 7)}.tw\\:min-w-8{min-width:calc(calc(var(--spacing)) * 8)}.tw\\:min-w-9{min-width:calc(calc(var(--spacing)) * 9)}.tw\\:min-w-16{min-width:calc(calc(var(--spacing)) * 16)}.tw\\:min-w-32{min-width:calc(calc(var(--spacing)) * 32)}.tw\\:min-w-36{min-width:calc(calc(var(--spacing)) * 36)}.tw\\:min-w-80{min-width:calc(calc(var(--spacing)) * 80)}.tw\\:min-w-\\[12rem\\]{min-width:12rem}.tw\\:min-w-\\[26px\\]{min-width:26px}.tw\\:min-w-\\[96px\\]{min-width:96px}.tw\\:min-w-\\[140px\\]{min-width:140px}.tw\\:min-w-\\[215px\\]{min-width:215px}.tw\\:min-w-\\[500px\\]{min-width:500px}.tw\\:min-w-min{min-width:min-content}.tw\\:flex-1{flex:1}.tw\\:shrink{flex-shrink:1}.tw\\:shrink\\!{flex-shrink:1!important}.tw\\:shrink-0{flex-shrink:0}.tw\\:shrink-\\[9999\\]{flex-shrink:9999}.tw\\:flex-grow,.tw\\:grow,.tw\\:grow-\\[1\\]{flex-grow:1}.tw\\:grow-\\[10\\]{flex-grow:10}.tw\\:basis-0{flex-basis:calc(calc(var(--spacing)) * 0)}.tw\\:caption-bottom{caption-side:bottom}.tw\\:border-collapse{border-collapse:collapse}.tw\\:origin-\\(--radix-context-menu-content-transform-origin\\){transform-origin:var(--radix-context-menu-content-transform-origin)}.tw\\:origin-\\(--radix-dropdown-menu-content-transform-origin\\){transform-origin:var(--radix-dropdown-menu-content-transform-origin)}.tw\\:origin-\\(--radix-menubar-content-transform-origin\\){transform-origin:var(--radix-menubar-content-transform-origin)}.tw\\:origin-\\(--radix-popover-content-transform-origin\\){transform-origin:var(--radix-popover-content-transform-origin)}.tw\\:origin-\\(--radix-select-content-transform-origin\\){transform-origin:var(--radix-select-content-transform-origin)}.tw\\:origin-\\(--radix-tooltip-content-transform-origin\\){transform-origin:var(--radix-tooltip-content-transform-origin)}.tw\\:-translate-x-1\\/2{--tw-translate-x:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:-translate-x-px{--tw-translate-x:-1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:translate-x-px{--tw-translate-x:1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:-translate-y-1\\/2{--tw-translate-y:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:translate-y-0{--tw-translate-y:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:translate-y-px{--tw-translate-y:1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rotate-45{rotate:45deg}.tw\\:rotate-180{rotate:180deg}.tw\\:transform{transform:var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,)}.tw\\:animate-none\\!{animation:none!important}.tw\\:animate-pulse{animation:var(--tw-animate-pulse)}.tw\\:animate-spin{animation:var(--tw-animate-spin)}.tw\\:cursor-default{cursor:default}.tw\\:cursor-ew-resize{cursor:ew-resize}.tw\\:cursor-not-allowed{cursor:not-allowed}.tw\\:cursor-pointer{cursor:pointer}.tw\\:cursor-text{cursor:text}.tw\\:touch-none{touch-action:none}.tw\\:resize{resize:both}.tw\\:resize-none{resize:none}.tw\\:scroll-m-20{scroll-margin:calc(calc(var(--spacing)) * 20)}.tw\\:scroll-my-1{scroll-margin-block:calc(calc(var(--spacing)) * 1)}.tw\\:scroll-py-1{scroll-padding-block:calc(calc(var(--spacing)) * 1)}.tw\\:list-inside{list-style-position:inside}.tw\\:list-outside{list-style-position:outside}.tw\\:\\!list-\\[lower-alpha\\]{list-style-type:lower-alpha!important}.tw\\:\\!list-\\[lower-roman\\]{list-style-type:lower-roman!important}.tw\\:\\!list-\\[upper-alpha\\]{list-style-type:upper-alpha!important}.tw\\:\\!list-\\[upper-roman\\]{list-style-type:upper-roman!important}.tw\\:\\!list-decimal{list-style-type:decimal!important}.tw\\:\\!list-disc{list-style-type:disc!important}.tw\\:list-decimal{list-style-type:decimal}.tw\\:list-disc{list-style-type:disc}.tw\\:list-none{list-style-type:none}.tw\\:grid-flow-col{grid-auto-flow:column}.tw\\:grid-flow-row{grid-auto-flow:row}.tw\\:auto-rows-min{grid-auto-rows:min-content}.tw\\:grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}.tw\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.tw\\:grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.tw\\:grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}.tw\\:grid-cols-\\[25\\%_25\\%_50\\%\\]{grid-template-columns:25% 25% 50%}.tw\\:grid-cols-\\[25\\%_50\\%_25\\%\\]{grid-template-columns:25% 50% 25%}.tw\\:grid-cols-\\[auto_auto_auto_auto\\]{grid-template-columns:auto auto auto auto}.tw\\:grid-cols-\\[min-content_1fr\\]{grid-template-columns:min-content 1fr}.tw\\:grid-cols-\\[min-content_min-content_1fr\\]{grid-template-columns:min-content min-content 1fr}.tw\\:grid-cols-subgrid{grid-template-columns:subgrid}.tw\\:flex-col{flex-direction:column}.tw\\:flex-col-reverse{flex-direction:column-reverse}.tw\\:flex-row{flex-direction:row}.tw\\:flex-row-reverse{flex-direction:row-reverse}.tw\\:flex-nowrap{flex-wrap:nowrap}.tw\\:flex-wrap{flex-wrap:wrap}.tw\\:place-content-center{place-content:center}.tw\\:content-center{align-content:center}.tw\\:items-baseline{align-items:baseline}.tw\\:items-center{align-items:center}.tw\\:items-end{align-items:flex-end}.tw\\:items-start{align-items:flex-start}.tw\\:items-stretch{align-items:stretch}.tw\\:justify-between{justify-content:space-between}.tw\\:justify-center{justify-content:center}.tw\\:justify-end{justify-content:flex-end}.tw\\:justify-start{justify-content:flex-start}.tw\\:gap-0{gap:calc(calc(var(--spacing)) * 0)}.tw\\:gap-0\\.5{gap:calc(calc(var(--spacing)) * .5)}.tw\\:gap-1{gap:calc(calc(var(--spacing)) * 1)}.tw\\:gap-1\\.5{gap:calc(calc(var(--spacing)) * 1.5)}.tw\\:gap-1\\.5\\!{gap:calc(calc(var(--spacing)) * 1.5)!important}.tw\\:gap-2{gap:calc(calc(var(--spacing)) * 2)}.tw\\:gap-2\\.5{gap:calc(calc(var(--spacing)) * 2.5)}.tw\\:gap-3{gap:calc(calc(var(--spacing)) * 3)}.tw\\:gap-4{gap:calc(calc(var(--spacing)) * 4)}.tw\\:gap-5{gap:calc(calc(var(--spacing)) * 5)}.tw\\:gap-6{gap:calc(calc(var(--spacing)) * 6)}.tw\\:gap-8{gap:calc(calc(var(--spacing)) * 8)}.tw\\:gap-16{gap:calc(calc(var(--spacing)) * 16)}.tw\\:gap-\\[--spacing\\(var\\(--gap\\)\\)\\]{gap:calc(calc(var(--spacing)) * var(--gap))}.tw\\:gap-\\[12px\\]{gap:12px}:where(.tw\\:space-y-1>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 1) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 1) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-1\\.5>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 1.5) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 1.5) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-2>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 2) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 2) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-3>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 3) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 3) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-4>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 4) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 4) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-6>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 6) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 6) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-8>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 8) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 8) * calc(1 - var(--tw-space-y-reverse)))}.tw\\:gap-x-1{column-gap:calc(calc(var(--spacing)) * 1)}.tw\\:gap-x-2{column-gap:calc(calc(var(--spacing)) * 2)}.tw\\:gap-x-3{column-gap:calc(calc(var(--spacing)) * 3)}.tw\\:gap-x-4{column-gap:calc(calc(var(--spacing)) * 4)}:where(.tw\\:-space-x-2>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * -2) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * -2) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-2>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 2) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 2) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-3>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 3) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 3) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-4>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 4) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 4) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-6>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 6) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 6) * calc(1 - var(--tw-space-x-reverse)))}.tw\\:gap-y-1{row-gap:calc(calc(var(--spacing)) * 1)}.tw\\:gap-y-2{row-gap:calc(calc(var(--spacing)) * 2)}:where(.tw\\:divide-x>:not(:last-child)){--tw-divide-x-reverse:0;border-inline-style:var(--tw-border-style);border-inline-start-width:calc(1px * var(--tw-divide-x-reverse));border-inline-end-width:calc(1px * calc(1 - var(--tw-divide-x-reverse)))}:where(.tw\\:divide-y>:not(:last-child)){--tw-divide-y-reverse:0;border-bottom-style:var(--tw-border-style);border-top-style:var(--tw-border-style);border-top-width:calc(1px * var(--tw-divide-y-reverse));border-bottom-width:calc(1px * calc(1 - var(--tw-divide-y-reverse)))}.tw\\:self-start{align-self:flex-start}.tw\\:self-stretch{align-self:stretch}.tw\\:justify-self-end{justify-self:flex-end}.tw\\:truncate{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.tw\\:overflow-auto{overflow:auto}.tw\\:overflow-clip{overflow:clip}.tw\\:overflow-hidden{overflow:hidden}.tw\\:overflow-scroll{overflow:scroll}.tw\\:overflow-visible{overflow:visible}.tw\\:overflow-x-auto{overflow-x:auto}.tw\\:overflow-x-hidden{overflow-x:hidden}.tw\\:overflow-y-auto{overflow-y:auto}.tw\\:overflow-y-hidden{overflow-y:hidden}.tw\\:rounded{border-radius:.25rem}.tw\\:rounded-2xl{border-radius:calc(var(--radius) * 1.8)}.tw\\:rounded-4xl{border-radius:calc(var(--radius) * 2.6)}.tw\\:rounded-\\[4px\\]{border-radius:4px}.tw\\:rounded-\\[6px\\]{border-radius:6px}.tw\\:rounded-\\[calc\\(var\\(--radius\\)-3px\\)\\]{border-radius:calc(var(--radius) - 3px)}.tw\\:rounded-\\[min\\(var\\(--tw-radius-md\\)\\,10px\\)\\]{border-radius:min(var(--tw-radius-md), 10px)}.tw\\:rounded-\\[min\\(var\\(--tw-radius-md\\)\\,12px\\)\\]{border-radius:min(var(--tw-radius-md), 12px)}.tw\\:rounded-full{border-radius:3.40282e38px}.tw\\:rounded-lg{border-radius:var(--radius)}.tw\\:rounded-lg\\!{border-radius:var(--radius)!important}.tw\\:rounded-md{border-radius:calc(var(--radius) * .8)}.tw\\:rounded-none{border-radius:0}.tw\\:rounded-sm{border-radius:calc(var(--radius) * .6)}.tw\\:rounded-xl{border-radius:calc(var(--radius) * 1.4)}.tw\\:rounded-xl\\!{border-radius:calc(var(--radius) * 1.4)!important}.tw\\:rounded-xs{border-radius:var(--tw-radius-xs)}.tw\\:rounded-s-none{border-start-start-radius:0;border-end-start-radius:0}.tw\\:rounded-e-none{border-start-end-radius:0;border-end-end-radius:0}.tw\\:rounded-t-xl{border-top-left-radius:calc(var(--radius) * 1.4);border-top-right-radius:calc(var(--radius) * 1.4)}.tw\\:rounded-l-lg{border-top-left-radius:var(--radius);border-bottom-left-radius:var(--radius)}.tw\\:rounded-r-xl{border-top-right-radius:calc(var(--radius) * 1.4);border-bottom-right-radius:calc(var(--radius) * 1.4)}.tw\\:rounded-b-xl{border-bottom-right-radius:calc(var(--radius) * 1.4);border-bottom-left-radius:calc(var(--radius) * 1.4)}.tw\\:border{border-style:var(--tw-border-style);border-width:1px}.tw\\:border-0{border-style:var(--tw-border-style);border-width:0}.tw\\:border-2{border-style:var(--tw-border-style);border-width:2px}.tw\\:border-s{border-inline-start-style:var(--tw-border-style);border-inline-start-width:1px}.tw\\:border-s-0{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:border-s-2{border-inline-start-style:var(--tw-border-style);border-inline-start-width:2px}.tw\\:border-s-4{border-inline-start-style:var(--tw-border-style);border-inline-start-width:4px}.tw\\:border-e{border-inline-end-style:var(--tw-border-style);border-inline-end-width:1px}.tw\\:border-e-0{border-inline-end-style:var(--tw-border-style);border-inline-end-width:0}.tw\\:border-t{border-top-style:var(--tw-border-style);border-top-width:1px}.tw\\:border-t-0{border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:border-b{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}.tw\\:border-b-0{border-bottom-style:var(--tw-border-style);border-bottom-width:0}.tw\\:border-l-2{border-left-style:var(--tw-border-style);border-left-width:2px}.tw\\:border-l-4{border-left-style:var(--tw-border-style);border-left-width:4px}.tw\\:border-dashed{--tw-border-style:dashed;border-style:dashed}.tw\\:border-none{--tw-border-style:none;border-style:none}.tw\\:border-solid{--tw-border-style:solid;border-style:solid}.tw\\:border-black{border-color:var(--tw-color-black)}.tw\\:border-blue-400{border-color:var(--tw-color-blue-400)}.tw\\:border-blue-500{border-color:var(--tw-color-blue-500)}.tw\\:border-border,.tw\\:border-border\\/50{border-color:var(--border)}@supports (color:color-mix(in lab, red, red)){.tw\\:border-border\\/50{border-color:color-mix(in oklab, var(--border) 50%, transparent)}}.tw\\:border-destructive{border-color:var(--destructive)}.tw\\:border-foreground{border-color:var(--foreground)}.tw\\:border-gray-300{border-color:var(--tw-color-gray-300)}.tw\\:border-input,.tw\\:border-input\\/30{border-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:border-input\\/30{border-color:color-mix(in oklab, var(--input) 30%, transparent)}}.tw\\:border-muted-foreground,.tw\\:border-muted-foreground\\/40{border-color:var(--muted-foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:border-muted-foreground\\/40{border-color:color-mix(in oklab, var(--muted-foreground) 40%, transparent)}}.tw\\:border-primary{border-color:var(--primary)}.tw\\:border-red-300{border-color:var(--tw-color-red-300)}.tw\\:border-red-400{border-color:var(--tw-color-red-400)}.tw\\:border-red-500{border-color:var(--tw-color-red-500)}.tw\\:border-red-600{border-color:var(--tw-color-red-600)}.tw\\:border-ring{border-color:var(--ring)}.tw\\:border-sidebar-border{border-color:var(--sidebar-border)}.tw\\:border-slate-300{border-color:var(--tw-color-slate-300)}.tw\\:border-transparent{border-color:#0000}.tw\\:border-yellow-400{border-color:var(--tw-color-yellow-400)}.tw\\:border-yellow-500{border-color:var(--tw-color-yellow-500)}.tw\\:border-s-amber-200{border-inline-start-color:var(--tw-color-amber-200)}.tw\\:border-s-indigo-200{border-inline-start-color:var(--tw-color-indigo-200)}.tw\\:border-s-purple-200{border-inline-start-color:var(--tw-color-purple-200)}.tw\\:border-s-red-200{border-inline-start-color:var(--tw-color-red-200)}.tw\\:\\!bg-destructive\\/50{background-color:var(--destructive)!important}@supports (color:color-mix(in lab, red, red)){.tw\\:\\!bg-destructive\\/50{background-color:color-mix(in oklab, var(--destructive) 50%, transparent)!important}}.tw\\:bg-\\[color-mix\\(in_oklab\\,var\\(--destructive\\)_10\\%\\,var\\(--background\\)\\)\\]{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-\\[color-mix\\(in_oklab\\,var\\(--destructive\\)_10\\%\\,var\\(--background\\)\\)\\]{background-color:color-mix(in oklab,var(--destructive) 10%,var(--background))}}.tw\\:bg-accent,.tw\\:bg-accent\\/50{background-color:var(--accent)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-accent\\/50{background-color:color-mix(in oklab, var(--accent) 50%, transparent)}}.tw\\:bg-amber-500,.tw\\:bg-amber-500\\/5{background-color:var(--tw-color-amber-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-amber-500\\/5{background-color:color-mix(in oklab, var(--tw-color-amber-500) 5%, transparent)}}.tw\\:bg-amber-500\\/15{background-color:var(--tw-color-amber-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-amber-500\\/15{background-color:color-mix(in oklab, var(--tw-color-amber-500) 15%, transparent)}}.tw\\:bg-background,.tw\\:bg-background\\/50{background-color:var(--background)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-background\\/50{background-color:color-mix(in oklab, var(--background) 50%, transparent)}}.tw\\:bg-black\\/10{background-color:var(--tw-color-black)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-black\\/10{background-color:color-mix(in oklab, var(--tw-color-black) 10%, transparent)}}.tw\\:bg-blue-50{background-color:var(--tw-color-blue-50)}.tw\\:bg-blue-100{background-color:var(--tw-color-blue-100)}.tw\\:bg-blue-400{background-color:var(--tw-color-blue-400)}.tw\\:bg-blue-500{background-color:var(--tw-color-blue-500)}.tw\\:bg-border{background-color:var(--border)}.tw\\:bg-card{background-color:var(--card)}.tw\\:bg-destructive\\/10{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-destructive\\/10{background-color:color-mix(in oklab, var(--destructive) 10%, transparent)}}.tw\\:bg-foreground{background-color:var(--foreground)}.tw\\:bg-gray-50{background-color:var(--tw-color-gray-50)}.tw\\:bg-gray-100{background-color:var(--tw-color-gray-100)}.tw\\:bg-gray-500{background-color:var(--tw-color-gray-500)}.tw\\:bg-green-50{background-color:var(--tw-color-green-50)}.tw\\:bg-green-100{background-color:var(--tw-color-green-100)}.tw\\:bg-green-500{background-color:var(--tw-color-green-500)}.tw\\:bg-input,.tw\\:bg-input\\/30{background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-input\\/30{background-color:color-mix(in oklab, var(--input) 30%, transparent)}}.tw\\:bg-muted,.tw\\:bg-muted\\/50{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-muted\\/50{background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:bg-neutral-300{background-color:var(--tw-color-neutral-300)}.tw\\:bg-orange-100{background-color:var(--tw-color-orange-100)}.tw\\:bg-popover,.tw\\:bg-popover\\/70{background-color:var(--popover)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-popover\\/70{background-color:color-mix(in oklab, var(--popover) 70%, transparent)}}.tw\\:bg-primary{background-color:var(--primary)}.tw\\:bg-primary-foreground{background-color:var(--primary-foreground)}.tw\\:bg-primary\\/30{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-primary\\/30{background-color:color-mix(in oklab, var(--primary) 30%, transparent)}}.tw\\:bg-purple-50{background-color:var(--tw-color-purple-50)}.tw\\:bg-red-100{background-color:var(--tw-color-red-100)}.tw\\:bg-red-500{background-color:var(--tw-color-red-500)}.tw\\:bg-rose-500,.tw\\:bg-rose-500\\/5{background-color:var(--tw-color-rose-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-rose-500\\/5{background-color:color-mix(in oklab, var(--tw-color-rose-500) 5%, transparent)}}.tw\\:bg-rose-500\\/15{background-color:var(--tw-color-rose-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-rose-500\\/15{background-color:color-mix(in oklab, var(--tw-color-rose-500) 15%, transparent)}}.tw\\:bg-secondary{background-color:var(--secondary)}.tw\\:bg-sidebar{background-color:var(--sidebar)}.tw\\:bg-sidebar-accent{background-color:var(--sidebar-accent)}.tw\\:bg-sidebar-border{background-color:var(--sidebar-border)}.tw\\:bg-sky-500,.tw\\:bg-sky-500\\/5{background-color:var(--tw-color-sky-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-sky-500\\/5{background-color:color-mix(in oklab, var(--tw-color-sky-500) 5%, transparent)}}.tw\\:bg-sky-500\\/15{background-color:var(--tw-color-sky-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-sky-500\\/15{background-color:color-mix(in oklab, var(--tw-color-sky-500) 15%, transparent)}}.tw\\:bg-teal-500,.tw\\:bg-teal-500\\/5{background-color:var(--tw-color-teal-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-teal-500\\/5{background-color:color-mix(in oklab, var(--tw-color-teal-500) 5%, transparent)}}.tw\\:bg-teal-500\\/15{background-color:var(--tw-color-teal-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-teal-500\\/15{background-color:color-mix(in oklab, var(--tw-color-teal-500) 15%, transparent)}}.tw\\:bg-transparent{background-color:#0000}.tw\\:bg-white{background-color:var(--tw-color-white)}.tw\\:bg-yellow-50{background-color:var(--tw-color-yellow-50)}.tw\\:bg-yellow-100{background-color:var(--tw-color-yellow-100)}.tw\\:bg-yellow-500{background-color:var(--tw-color-yellow-500)}.tw\\:bg-zinc-400{background-color:var(--tw-color-zinc-400)}.tw\\:bg-clip-padding{background-clip:padding-box}.tw\\:fill-\\[color-mix\\(in_oklab\\,var\\(--destructive\\)_10\\%\\,var\\(--background\\)\\)\\]{fill:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:fill-\\[color-mix\\(in_oklab\\,var\\(--destructive\\)_10\\%\\,var\\(--background\\)\\)\\]{fill:color-mix(in oklab,var(--destructive) 10%,var(--background))}}.tw\\:fill-destructive{fill:var(--destructive)}.tw\\:fill-foreground{fill:var(--foreground)}.tw\\:fill-yellow-400,.tw\\:fill-yellow-400\\/50{fill:var(--tw-color-yellow-400)}@supports (color:color-mix(in lab, red, red)){.tw\\:fill-yellow-400\\/50{fill:color-mix(in oklab, var(--tw-color-yellow-400) 50%, transparent)}}.tw\\:object-cover{object-fit:cover}.tw\\:\\!p-4{padding:calc(calc(var(--spacing)) * 4)!important}.tw\\:p-0{padding:calc(calc(var(--spacing)) * 0)}.tw\\:p-0\\.5{padding:calc(calc(var(--spacing)) * .5)}.tw\\:p-1{padding:calc(calc(var(--spacing)) * 1)}.tw\\:p-2{padding:calc(calc(var(--spacing)) * 2)}.tw\\:p-2\\.5{padding:calc(calc(var(--spacing)) * 2.5)}.tw\\:p-3{padding:calc(calc(var(--spacing)) * 3)}.tw\\:p-4{padding:calc(calc(var(--spacing)) * 4)}.tw\\:p-6{padding:calc(calc(var(--spacing)) * 6)}.tw\\:p-8{padding:calc(calc(var(--spacing)) * 8)}.tw\\:p-\\[1px\\]{padding:1px}.tw\\:p-\\[3px\\]{padding:3px}.tw\\:p-\\[10px\\]{padding:10px}.tw\\:p-\\[16px\\]{padding:16px}.tw\\:px-0{padding-inline:calc(calc(var(--spacing)) * 0)}.tw\\:px-0\\.5{padding-inline:calc(calc(var(--spacing)) * .5)}.tw\\:px-1{padding-inline:calc(calc(var(--spacing)) * 1)}.tw\\:px-1\\.5{padding-inline:calc(calc(var(--spacing)) * 1.5)}.tw\\:px-2{padding-inline:calc(calc(var(--spacing)) * 2)}.tw\\:px-2\\.5{padding-inline:calc(calc(var(--spacing)) * 2.5)}.tw\\:px-3{padding-inline:calc(calc(var(--spacing)) * 3)}.tw\\:px-4{padding-inline:calc(calc(var(--spacing)) * 4)}.tw\\:px-6{padding-inline:calc(calc(var(--spacing)) * 6)}.tw\\:py-0{padding-block:calc(calc(var(--spacing)) * 0)}.tw\\:py-0\\.5{padding-block:calc(calc(var(--spacing)) * .5)}.tw\\:py-1{padding-block:calc(calc(var(--spacing)) * 1)}.tw\\:py-1\\.5{padding-block:calc(calc(var(--spacing)) * 1.5)}.tw\\:py-2{padding-block:calc(calc(var(--spacing)) * 2)}.tw\\:py-3{padding-block:calc(calc(var(--spacing)) * 3)}.tw\\:py-4{padding-block:calc(calc(var(--spacing)) * 4)}.tw\\:py-6{padding-block:calc(calc(var(--spacing)) * 6)}.tw\\:py-8{padding-block:calc(calc(var(--spacing)) * 8)}.tw\\:py-\\[2px\\]{padding-block:2px}.tw\\:ps-1\\.5{padding-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:ps-2{padding-inline-start:calc(calc(var(--spacing)) * 2)}.tw\\:ps-2\\.5{padding-inline-start:calc(calc(var(--spacing)) * 2.5)}.tw\\:ps-4{padding-inline-start:calc(calc(var(--spacing)) * 4)}.tw\\:ps-6{padding-inline-start:calc(calc(var(--spacing)) * 6)}.tw\\:ps-7{padding-inline-start:calc(calc(var(--spacing)) * 7)}.tw\\:ps-8{padding-inline-start:calc(calc(var(--spacing)) * 8)}.tw\\:ps-9{padding-inline-start:calc(calc(var(--spacing)) * 9)}.tw\\:ps-12{padding-inline-start:calc(calc(var(--spacing)) * 12)}.tw\\:ps-\\[85px\\]{padding-inline-start:85px}.tw\\:pe-1{padding-inline-end:calc(calc(var(--spacing)) * 1)}.tw\\:pe-1\\.5{padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:pe-2{padding-inline-end:calc(calc(var(--spacing)) * 2)}.tw\\:pe-4{padding-inline-end:calc(calc(var(--spacing)) * 4)}.tw\\:pe-8{padding-inline-end:calc(calc(var(--spacing)) * 8)}.tw\\:pe-8\\!{padding-inline-end:calc(calc(var(--spacing)) * 8)!important}.tw\\:pe-9{padding-inline-end:calc(calc(var(--spacing)) * 9)}.tw\\:pe-\\[calc\\(138px\\+1rem\\)\\]{padding-inline-end:calc(138px + 1rem)}.tw\\:pe-\\[…\\]{padding-inline-end:…}.tw\\:pt-1{padding-top:calc(calc(var(--spacing)) * 1)}.tw\\:pt-2{padding-top:calc(calc(var(--spacing)) * 2)}.tw\\:pt-3{padding-top:calc(calc(var(--spacing)) * 3)}.tw\\:pt-4{padding-top:calc(calc(var(--spacing)) * 4)}.tw\\:pt-6{padding-top:calc(calc(var(--spacing)) * 6)}.tw\\:pr-0{padding-right:calc(calc(var(--spacing)) * 0)}.tw\\:pr-1{padding-right:calc(calc(var(--spacing)) * 1)}.tw\\:pr-2{padding-right:calc(calc(var(--spacing)) * 2)}.tw\\:pr-3{padding-right:calc(calc(var(--spacing)) * 3)}.tw\\:pr-4{padding-right:calc(calc(var(--spacing)) * 4)}.tw\\:pb-0{padding-bottom:calc(calc(var(--spacing)) * 0)}.tw\\:pb-1{padding-bottom:calc(calc(var(--spacing)) * 1)}.tw\\:pb-2{padding-bottom:calc(calc(var(--spacing)) * 2)}.tw\\:pb-3{padding-bottom:calc(calc(var(--spacing)) * 3)}.tw\\:pb-4{padding-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:pb-8{padding-bottom:calc(calc(var(--spacing)) * 8)}.tw\\:pb-12{padding-bottom:calc(calc(var(--spacing)) * 12)}.tw\\:pb-16{padding-bottom:calc(calc(var(--spacing)) * 16)}.tw\\:pb-24{padding-bottom:calc(calc(var(--spacing)) * 24)}.tw\\:pl-2{padding-left:calc(calc(var(--spacing)) * 2)}.tw\\:pl-3{padding-left:calc(calc(var(--spacing)) * 3)}.tw\\:pl-4{padding-left:calc(calc(var(--spacing)) * 4)}.tw\\:pl-5{padding-left:calc(calc(var(--spacing)) * 5)}.tw\\:pl-6{padding-left:calc(calc(var(--spacing)) * 6)}.tw\\:pl-8{padding-left:calc(calc(var(--spacing)) * 8)}.tw\\:text-center{text-align:center}.tw\\:text-end{text-align:end}.tw\\:text-left{text-align:left}.tw\\:text-right{text-align:right}.tw\\:text-start{text-align:start}.tw\\:align-middle{vertical-align:middle}.tw\\:font-heading{font-family:var(--font-sans)}.tw\\:font-mono{font-family:var(--tw-font-mono)}.tw\\:font-sans{font-family:IBM Plex Sans Variable,sans-serif}.tw\\:text-2xl{font-size:var(--tw-text-2xl);line-height:var(--tw-leading,var(--tw-text-2xl--line-height))}.tw\\:text-3xl{font-size:var(--tw-text-3xl);line-height:var(--tw-leading,var(--tw-text-3xl--line-height))}.tw\\:text-4xl{font-size:var(--tw-text-4xl);line-height:var(--tw-leading,var(--tw-text-4xl--line-height))}.tw\\:text-base{font-size:var(--tw-text-base);line-height:var(--tw-leading,var(--tw-text-base--line-height))}.tw\\:text-lg{font-size:var(--tw-text-lg);line-height:var(--tw-leading,var(--tw-text-lg--line-height))}.tw\\:text-sm{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:text-sm\\/relaxed{font-size:var(--tw-text-sm);line-height:var(--tw-leading-relaxed)}.tw\\:text-xl{font-size:var(--tw-text-xl);line-height:var(--tw-leading,var(--tw-text-xl--line-height))}.tw\\:text-xs{font-size:var(--tw-text-xs);line-height:var(--tw-leading,var(--tw-text-xs--line-height))}.tw\\:text-\\[0\\.8rem\\]{font-size:.8rem}.tw\\:leading-6{--tw-leading:calc(calc(var(--spacing)) * 6);line-height:calc(calc(var(--spacing)) * 6)}.tw\\:leading-loose{--tw-leading:var(--tw-leading-loose);line-height:var(--tw-leading-loose)}.tw\\:leading-none{--tw-leading:1;line-height:1}.tw\\:leading-relaxed{--tw-leading:var(--tw-leading-relaxed);line-height:var(--tw-leading-relaxed)}.tw\\:leading-snug{--tw-leading:var(--tw-leading-snug);line-height:var(--tw-leading-snug)}.tw\\:leading-tight{--tw-leading:var(--tw-leading-tight);line-height:var(--tw-leading-tight)}.tw\\:font-bold{--tw-font-weight:var(--tw-font-weight-bold);font-weight:var(--tw-font-weight-bold)}.tw\\:font-extrabold{--tw-font-weight:var(--tw-font-weight-extrabold);font-weight:var(--tw-font-weight-extrabold)}.tw\\:font-medium{--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}.tw\\:font-normal{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:font-semibold{--tw-font-weight:var(--tw-font-weight-semibold);font-weight:var(--tw-font-weight-semibold)}.tw\\:tracking-tight{--tw-tracking:var(--tw-tracking-tight);letter-spacing:var(--tw-tracking-tight)}.tw\\:tracking-wider{--tw-tracking:var(--tw-tracking-wider);letter-spacing:var(--tw-tracking-wider)}.tw\\:tracking-widest{--tw-tracking:var(--tw-tracking-widest);letter-spacing:var(--tw-tracking-widest)}.tw\\:text-balance{text-wrap:balance}.tw\\:text-nowrap{text-wrap:nowrap}.tw\\:break-words{overflow-wrap:break-word}.tw\\:text-clip{text-overflow:clip}.tw\\:text-ellipsis{text-overflow:ellipsis}.tw\\:whitespace-normal{white-space:normal}.tw\\:whitespace-nowrap{white-space:nowrap}.tw\\:whitespace-pre{white-space:pre}.tw\\:whitespace-pre-line{white-space:pre-line}.tw\\:whitespace-pre-wrap{white-space:pre-wrap}.tw\\:\\[color\\:blue\\]{color:#00f}.tw\\:text-accent-foreground{color:var(--accent-foreground)}.tw\\:text-amber-600{color:var(--tw-color-amber-600)}.tw\\:text-background{color:var(--background)}.tw\\:text-blue-400{color:var(--tw-color-blue-400)}.tw\\:text-blue-500{color:var(--tw-color-blue-500)}.tw\\:text-blue-600{color:var(--tw-color-blue-600)}.tw\\:text-blue-800{color:var(--tw-color-blue-800)}.tw\\:text-card-foreground{color:var(--card-foreground)}.tw\\:text-current{color:currentColor}.tw\\:text-destructive{color:var(--destructive)}.tw\\:text-foreground{color:var(--foreground)}.tw\\:text-foreground\\!{color:var(--foreground)!important}.tw\\:text-foreground\\/30{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/30{color:color-mix(in oklab, var(--foreground) 30%, transparent)}}.tw\\:text-foreground\\/50{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/50{color:color-mix(in oklab, var(--foreground) 50%, transparent)}}.tw\\:text-foreground\\/60{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/60{color:color-mix(in oklab, var(--foreground) 60%, transparent)}}.tw\\:text-foreground\\/70{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/70{color:color-mix(in oklab, var(--foreground) 70%, transparent)}}.tw\\:text-gray-300{color:var(--tw-color-gray-300)}.tw\\:text-gray-500{color:var(--tw-color-gray-500)}.tw\\:text-gray-600{color:var(--tw-color-gray-600)}.tw\\:text-gray-700{color:var(--tw-color-gray-700)}.tw\\:text-gray-800{color:var(--tw-color-gray-800)}.tw\\:text-green-600{color:var(--tw-color-green-600)}.tw\\:text-green-700{color:var(--tw-color-green-700)}.tw\\:text-green-800{color:var(--tw-color-green-800)}.tw\\:text-inherit{color:inherit}.tw\\:text-muted-foreground,.tw\\:text-muted-foreground\\/50{color:var(--muted-foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-muted-foreground\\/50{color:color-mix(in oklab, var(--muted-foreground) 50%, transparent)}}.tw\\:text-orange-800{color:var(--tw-color-orange-800)}.tw\\:text-popover-foreground{color:var(--popover-foreground)}.tw\\:text-primary{color:var(--primary)}.tw\\:text-primary-foreground{color:var(--primary-foreground)}.tw\\:text-purple-900{color:var(--tw-color-purple-900)}.tw\\:text-red-500{color:var(--tw-color-red-500)}.tw\\:text-red-600{color:var(--tw-color-red-600)}.tw\\:text-red-700{color:var(--tw-color-red-700)}.tw\\:text-red-800{color:var(--tw-color-red-800)}.tw\\:text-rose-600{color:var(--tw-color-rose-600)}.tw\\:text-secondary-foreground{color:var(--secondary-foreground)}.tw\\:text-sidebar-accent-foreground{color:var(--sidebar-accent-foreground)}.tw\\:text-sidebar-foreground,.tw\\:text-sidebar-foreground\\/70{color:var(--sidebar-foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-sidebar-foreground\\/70{color:color-mix(in oklab, var(--sidebar-foreground) 70%, transparent)}}.tw\\:text-sky-600{color:var(--tw-color-sky-600)}.tw\\:text-slate-900{color:var(--tw-color-slate-900)}.tw\\:text-teal-600{color:var(--tw-color-teal-600)}.tw\\:text-white{color:var(--tw-color-white)}.tw\\:text-yellow-400{color:var(--tw-color-yellow-400)}.tw\\:text-yellow-600{color:var(--tw-color-yellow-600)}.tw\\:text-yellow-700{color:var(--tw-color-yellow-700)}.tw\\:capitalize{text-transform:capitalize}.tw\\:uppercase{text-transform:uppercase}.tw\\:italic{font-style:italic}.tw\\:tabular-nums{--tw-numeric-spacing:tabular-nums;font-variant-numeric:var(--tw-ordinal,) var(--tw-slashed-zero,) var(--tw-numeric-figure,) var(--tw-numeric-spacing,) var(--tw-numeric-fraction,)}.tw\\:line-through{text-decoration-line:line-through}.tw\\:underline{text-decoration-line:underline}.tw\\:decoration-destructive{-webkit-text-decoration-color:var(--destructive);-webkit-text-decoration-color:var(--destructive);text-decoration-color:var(--destructive)}.tw\\:underline-offset-4{text-underline-offset:4px}.tw\\:opacity-0{opacity:0}.tw\\:opacity-40{opacity:.4}.tw\\:opacity-50{opacity:.5}.tw\\:opacity-60{opacity:.6}.tw\\:opacity-100{opacity:1}.tw\\:bg-blend-color{background-blend-mode:color}.tw\\:shadow{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-\\[0_0_0_1px_var\\(--sidebar-border\\)\\]{--tw-shadow:0 0 0 1px var(--tw-shadow-color,var(--sidebar-border));box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-lg{--tw-shadow:0 10px 15px -3px var(--tw-shadow-color,#0000001a), 0 4px 6px -4px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-md{--tw-shadow:0 4px 6px -1px var(--tw-shadow-color,#0000001a), 0 2px 4px -2px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-none{--tw-shadow:0 0 #0000;box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-none\\!{--tw-shadow:0 0 #0000!important;box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)!important}.tw\\:shadow-sm{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-xl{--tw-shadow:0 20px 25px -5px var(--tw-shadow-color,#0000001a), 0 8px 10px -6px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-0{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-1{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-2{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-background{--tw-ring-color:var(--background)}.tw\\:ring-foreground\\/10{--tw-ring-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:ring-foreground\\/10{--tw-ring-color:color-mix(in oklab, var(--foreground) 10%, transparent)}}.tw\\:ring-primary{--tw-ring-color:var(--primary)}.tw\\:ring-ring\\/50{--tw-ring-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.tw\\:ring-ring\\/50{--tw-ring-color:color-mix(in oklab, var(--ring) 50%, transparent)}}.tw\\:ring-sidebar-ring{--tw-ring-color:var(--sidebar-ring)}.tw\\:ring-offset-2{--tw-ring-offset-width:2px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}.tw\\:ring-offset-background{--tw-ring-offset-color:var(--background)}.tw\\:ring-offset-white{--tw-ring-offset-color:var(--tw-color-white)}.tw\\:outline-hidden{--tw-outline-style:none;outline-style:none}@media (forced-colors:active){.tw\\:outline-hidden{outline-offset:2px;outline:2px solid #0000}}.tw\\:drop-shadow-sm{--tw-drop-shadow-size:drop-shadow(0 1px 2px var(--tw-drop-shadow-color,#00000026));--tw-drop-shadow:drop-shadow(var(--tw-drop-shadow-sm));filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.tw\\:transition{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to,opacity,box-shadow,transform,translate,scale,rotate,filter,-webkit-backdrop-filter,backdrop-filter,display,content-visibility,overlay,pointer-events;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[color\\,box-shadow\\]{transition-property:color,box-shadow;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[left\\,right\\,width\\]{transition-property:left,right,width;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[margin\\,opacity\\]{transition-property:margin,opacity;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[width\\,height\\,padding\\]{transition-property:width,height,padding;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[width\\]{transition-property:width;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-all{transition-property:all;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-colors{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-opacity{transition-property:opacity;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-transform{transition-property:transform,translate,scale,rotate;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-none{transition-property:none}.tw\\:duration-100{--tw-duration:.1s;transition-duration:.1s}.tw\\:duration-200{--tw-duration:.2s;transition-duration:.2s}.tw\\:ease-linear{--tw-ease:linear;transition-timing-function:linear}.tw\\:prose-quoteless :where(blockquote p:first-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):before,.tw\\:prose-quoteless :where(blockquote p:last-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:none}.tw\\:outline-none{--tw-outline-style:none;outline-style:none}.tw\\:select-none{-webkit-user-select:none;user-select:none}.tw\\:\\[unicode-bidi\\:plaintext\\]{unicode-bidi:plaintext}.tw\\:group-focus-within\\/menu-item\\:opacity-100:is(:where(.tw\\:group\\/menu-item):focus-within *){opacity:1}@media (hover:hover){.tw\\:group-hover\\:visible:is(:where(.tw\\:group):hover *){visibility:visible}.tw\\:group-hover\\:hidden:is(:where(.tw\\:group):hover *){display:none}.tw\\:group-hover\\:opacity-100:is(:where(.tw\\:group):hover *),.tw\\:group-hover\\/menu-item\\:opacity-100:is(:where(.tw\\:group\\/menu-item):hover *){opacity:1}}.tw\\:group-focus\\/context-menu-item\\:text-accent-foreground:is(:where(.tw\\:group\\/context-menu-item):focus *),.tw\\:group-focus\\/dropdown-menu-item\\:text-accent-foreground:is(:where(.tw\\:group\\/dropdown-menu-item):focus *),.tw\\:group-focus\\/menubar-item\\:text-accent-foreground:is(:where(.tw\\:group\\/menubar-item):focus *){color:var(--accent-foreground)}.tw\\:group-has-disabled\\/field\\:opacity-50:is(:where(.tw\\:group\\/field):has(:disabled) *){opacity:.5}.tw\\:group-has-data-\\[sidebar\\=menu-action\\]\\/menu-item\\:pe-8:is(:where(.tw\\:group\\/menu-item):has([data-sidebar=menu-action]) *){padding-inline-end:calc(calc(var(--spacing)) * 8)}.tw\\:group-has-data-\\[size\\=lg\\]\\/avatar-group\\:size-10:is(:where(.tw\\:group\\/avatar-group):has([data-size=lg]) *){width:calc(calc(var(--spacing)) * 10);height:calc(calc(var(--spacing)) * 10)}.tw\\:group-has-data-\\[size\\=sm\\]\\/avatar-group\\:size-6:is(:where(.tw\\:group\\/avatar-group):has([data-size=sm]) *){width:calc(calc(var(--spacing)) * 6);height:calc(calc(var(--spacing)) * 6)}.tw\\:group-has-data-\\[slot\\=command-shortcut\\]\\/command-item\\:hidden:is(:where(.tw\\:group\\/command-item):has([data-slot=command-shortcut]) *){display:none}.tw\\:group-has-\\[\\>input\\]\\/input-group\\:pt-2:is(:where(.tw\\:group\\/input-group):has(>input) *){padding-top:calc(calc(var(--spacing)) * 2)}.tw\\:group-has-\\[\\>input\\]\\/input-group\\:pb-2:is(:where(.tw\\:group\\/input-group):has(>input) *){padding-bottom:calc(calc(var(--spacing)) * 2)}.tw\\:group-has-\\[\\>svg\\]\\/alert\\:col-start-2:is(:where(.tw\\:group\\/alert):has(>svg) *){grid-column-start:2}.tw\\:group-data-\\[checked\\=true\\]\\/command-item\\:opacity-100:is(:where(.tw\\:group\\/command-item)[data-checked=true] *){opacity:1}.tw\\:group-data-\\[collapsible\\=icon\\]\\:-mt-8:is(:where(.tw\\:group)[data-collapsible=icon] *){margin-top:calc(calc(var(--spacing)) * -8)}.tw\\:group-data-\\[collapsible\\=icon\\]\\:hidden:is(:where(.tw\\:group)[data-collapsible=icon] *){display:none}.tw\\:group-data-\\[collapsible\\=icon\\]\\:size-8\\!:is(:where(.tw\\:group)[data-collapsible=icon] *){width:calc(calc(var(--spacing)) * 8)!important;height:calc(calc(var(--spacing)) * 8)!important}.tw\\:group-data-\\[collapsible\\=icon\\]\\:w-\\(--sidebar-width-icon\\):is(:where(.tw\\:group)[data-collapsible=icon] *){width:var(--sidebar-width-icon)}.tw\\:group-data-\\[collapsible\\=icon\\]\\:w-\\[calc\\(var\\(--sidebar-width-icon\\)\\+\\(--spacing\\(4\\)\\)\\)\\]:is(:where(.tw\\:group)[data-collapsible=icon] *){width:calc(var(--sidebar-width-icon) + (calc(calc(var(--spacing)) * 4)))}.tw\\:group-data-\\[collapsible\\=icon\\]\\:w-\\[calc\\(var\\(--sidebar-width-icon\\)\\+\\(--spacing\\(4\\)\\)\\+2px\\)\\]:is(:where(.tw\\:group)[data-collapsible=icon] *){width:calc(var(--sidebar-width-icon) + (calc(calc(var(--spacing)) * 4)) + 2px)}.tw\\:group-data-\\[collapsible\\=icon\\]\\:overflow-hidden:is(:where(.tw\\:group)[data-collapsible=icon] *){overflow:hidden}.tw\\:group-data-\\[collapsible\\=icon\\]\\:p-0\\!:is(:where(.tw\\:group)[data-collapsible=icon] *){padding:calc(calc(var(--spacing)) * 0)!important}.tw\\:group-data-\\[collapsible\\=icon\\]\\:p-2\\!:is(:where(.tw\\:group)[data-collapsible=icon] *){padding:calc(calc(var(--spacing)) * 2)!important}.tw\\:group-data-\\[collapsible\\=icon\\]\\:opacity-0:is(:where(.tw\\:group)[data-collapsible=icon] *){opacity:0}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:right-\\[calc\\(var\\(--sidebar-width\\)\\*-1\\)\\]:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){right:calc(var(--sidebar-width) * -1)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:left-\\[calc\\(var\\(--sidebar-width\\)\\*-1\\)\\]:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){left:calc(var(--sidebar-width) * -1)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:w-0:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){width:calc(calc(var(--spacing)) * 0)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:translate-x-0:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){--tw-translate-x:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:group-data-\\[disabled\\=true\\]\\:pointer-events-none:is(:where(.tw\\:group)[data-disabled=true] *){pointer-events:none}.tw\\:group-data-\\[disabled\\=true\\]\\:opacity-50:is(:where(.tw\\:group)[data-disabled=true] *),.tw\\:group-data-\\[disabled\\=true\\]\\/input-group\\:opacity-50:is(:where(.tw\\:group\\/input-group)[data-disabled=true] *){opacity:.5}.tw\\:group-data-\\[side\\=primary\\]\\:-right-4:is(:where(.tw\\:group)[data-side=primary] *){right:calc(calc(var(--spacing)) * -4)}.tw\\:group-data-\\[side\\=primary\\]\\:border-e:is(:where(.tw\\:group)[data-side=primary] *){border-inline-end-style:var(--tw-border-style);border-inline-end-width:1px}.tw\\:group-data-\\[side\\=secondary\\]\\:left-0:is(:where(.tw\\:group)[data-side=secondary] *){left:calc(calc(var(--spacing)) * 0)}.tw\\:group-data-\\[side\\=secondary\\]\\:rotate-180:is(:where(.tw\\:group)[data-side=secondary] *){rotate:180deg}.tw\\:group-data-\\[side\\=secondary\\]\\:border-s:is(:where(.tw\\:group)[data-side=secondary] *){border-inline-start-style:var(--tw-border-style);border-inline-start-width:1px}.tw\\:group-data-\\[size\\=default\\]\\/avatar\\:size-2\\.5:is(:where(.tw\\:group\\/avatar)[data-size=default] *){width:calc(calc(var(--spacing)) * 2.5);height:calc(calc(var(--spacing)) * 2.5)}.tw\\:group-data-\\[size\\=default\\]\\/switch\\:size-4:is(:where(.tw\\:group\\/switch)[data-size=default] *){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[size\\=lg\\]\\/avatar\\:size-3:is(:where(.tw\\:group\\/avatar)[data-size=lg] *){width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[size\\=sm\\]\\/avatar\\:size-2:is(:where(.tw\\:group\\/avatar)[data-size=sm] *){width:calc(calc(var(--spacing)) * 2);height:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[size\\=sm\\]\\/avatar\\:text-xs:is(:where(.tw\\:group\\/avatar)[data-size=sm] *){font-size:var(--tw-text-xs);line-height:var(--tw-leading,var(--tw-text-xs--line-height))}.tw\\:group-data-\\[size\\=sm\\]\\/card\\:p-3:is(:where(.tw\\:group\\/card)[data-size=sm] *){padding:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[size\\=sm\\]\\/card\\:px-3:is(:where(.tw\\:group\\/card)[data-size=sm] *){padding-inline:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[size\\=sm\\]\\/card\\:text-sm:is(:where(.tw\\:group\\/card)[data-size=sm] *){font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:size-3:is(:where(.tw\\:group\\/switch)[data-size=sm] *){width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[spacing\\=0\\]\\/toggle-group\\:rounded-none:is(:where(.tw\\:group\\/toggle-group)[data-spacing="0"] *){border-radius:0}.tw\\:group-data-\\[spacing\\=0\\]\\/toggle-group\\:px-2:is(:where(.tw\\:group\\/toggle-group)[data-spacing="0"] *){padding-inline:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[variant\\=floating\\]\\:rounded-lg:is(:where(.tw\\:group)[data-variant=floating] *){border-radius:var(--radius)}.tw\\:group-data-\\[variant\\=floating\\]\\:shadow-sm:is(:where(.tw\\:group)[data-variant=floating] *){--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:group-data-\\[variant\\=floating\\]\\:ring-1:is(:where(.tw\\:group)[data-variant=floating] *){--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:group-data-\\[variant\\=floating\\]\\:ring-sidebar-border:is(:where(.tw\\:group)[data-variant=floating] *){--tw-ring-color:var(--sidebar-border)}.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:bg-transparent:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *){background-color:#0000}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:mx-auto:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){margin-inline:auto}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:mt-4:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){margin-top:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:block:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){display:block}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:h-1\\.5:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){height:calc(calc(var(--spacing)) * 1.5)}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:w-\\[100px\\]:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){width:100px}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:text-center:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){text-align:center}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:my-auto:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){margin-block:auto}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:me-4:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){margin-inline-end:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:block:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){display:block}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:h-\\[100px\\]:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){height:100px}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:w-1\\.5:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){width:calc(calc(var(--spacing)) * 1.5)}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:my-auto:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){margin-block:auto}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:ms-4:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){margin-inline-start:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:block:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){display:block}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:h-\\[100px\\]:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){height:100px}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:w-1\\.5:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){width:calc(calc(var(--spacing)) * 1.5)}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:mx-auto:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){margin-inline:auto}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:mb-4:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){margin-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:block:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){display:block}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:h-1\\.5:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){height:calc(calc(var(--spacing)) * 1.5)}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:w-\\[100px\\]:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){width:100px}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:text-center:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){text-align:center}.tw\\:group-data-selected\\/command-item\\:text-foreground:is(:where(.tw\\:group\\/command-item):where([data-selected=true]) *){color:var(--foreground)}.tw\\:group-data-horizontal\\/tabs\\:h-8:is(:where(.tw\\:group\\/tabs):where([data-orientation=horizontal]) *){height:calc(calc(var(--spacing)) * 8)}.tw\\:group-data-vertical\\/tabs\\:h-fit:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *){height:fit-content}.tw\\:group-data-vertical\\/tabs\\:w-full:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *){width:100%}.tw\\:group-data-vertical\\/tabs\\:flex-col:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *){flex-direction:column}.tw\\:group-data-vertical\\/tabs\\:justify-start:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *){justify-content:flex-start}@media (hover:hover){.tw\\:peer-hover\\/menu-button\\:text-sidebar-accent-foreground:is(:where(.tw\\:peer\\/menu-button):hover~*){color:var(--sidebar-accent-foreground)}.tw\\:peer-focus\\:group-hover\\:text-blue-500:is(:where(.tw\\:peer):focus~*):is(:where(.tw\\:group):hover *){color:var(--tw-color-blue-500)}}.tw\\:peer-disabled\\:cursor-not-allowed:is(:where(.tw\\:peer):disabled~*){cursor:not-allowed}.tw\\:peer-disabled\\:opacity-50:is(:where(.tw\\:peer):disabled~*){opacity:.5}.tw\\:peer-data-\\[size\\=default\\]\\/menu-button\\:top-1\\.5:is(:where(.tw\\:peer\\/menu-button)[data-size=default]~*){top:calc(calc(var(--spacing)) * 1.5)}.tw\\:peer-data-\\[size\\=lg\\]\\/menu-button\\:top-2\\.5:is(:where(.tw\\:peer\\/menu-button)[data-size=lg]~*){top:calc(calc(var(--spacing)) * 2.5)}.tw\\:peer-data-\\[size\\=sm\\]\\/menu-button\\:top-1:is(:where(.tw\\:peer\\/menu-button)[data-size=sm]~*){top:calc(calc(var(--spacing)) * 1)}.tw\\:peer-data-active\\/menu-button\\:text-sidebar-accent-foreground:is(:is(:where(.tw\\:peer\\/menu-button):where([data-state=active]),:where(.tw\\:peer\\/menu-button):where([data-active]:not([data-active=false])))~*){color:var(--sidebar-accent-foreground)}.tw\\:file\\:inline-flex::file-selector-button{display:inline-flex}.tw\\:file\\:h-6::file-selector-button{height:calc(calc(var(--spacing)) * 6)}.tw\\:file\\:border-0::file-selector-button{border-style:var(--tw-border-style);border-width:0}.tw\\:file\\:bg-transparent::file-selector-button{background-color:#0000}.tw\\:file\\:text-sm::file-selector-button{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:file\\:font-medium::file-selector-button{--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}.tw\\:file\\:text-foreground::file-selector-button{color:var(--foreground)}.tw\\:placeholder\\:text-muted-foreground::placeholder{color:var(--muted-foreground)}.tw\\:placeholder\\:text-slate-400::placeholder{color:var(--tw-color-slate-400)}.tw\\:before\\:pointer-events-none:before{content:var(--tw-content);pointer-events:none}.tw\\:before\\:absolute:before{content:var(--tw-content);position:absolute}.tw\\:before\\:inset-0:before{content:var(--tw-content);inset:calc(calc(var(--spacing)) * 0)}.tw\\:before\\:top-0\\.5:before{content:var(--tw-content);top:calc(calc(var(--spacing)) * .5)}.tw\\:before\\:left-0:before{content:var(--tw-content);left:calc(calc(var(--spacing)) * 0)}.tw\\:before\\:-z-1:before{content:var(--tw-content);z-index:calc(1 * -1)}.tw\\:before\\:block:before{content:var(--tw-content);display:block}.tw\\:before\\:hidden:before{content:var(--tw-content);display:none}.tw\\:before\\:h-4:before{content:var(--tw-content);height:calc(calc(var(--spacing)) * 4)}.tw\\:before\\:w-4:before{content:var(--tw-content);width:calc(calc(var(--spacing)) * 4)}.tw\\:before\\:cursor-pointer:before{content:var(--tw-content);cursor:pointer}.tw\\:before\\:rounded:before{content:var(--tw-content);border-radius:.25rem}.tw\\:before\\:rounded-\\[inherit\\]:before{content:var(--tw-content);border-radius:inherit}.tw\\:before\\:border:before{content:var(--tw-content);border-style:var(--tw-border-style);border-width:1px}.tw\\:before\\:border-primary:before{content:var(--tw-content);border-color:var(--primary)}.tw\\:before\\:bg-primary:before{content:var(--tw-content);background-color:var(--primary)}.tw\\:before\\:bg-cover:before{content:var(--tw-content);background-size:cover}.tw\\:before\\:bg-no-repeat:before{content:var(--tw-content);background-repeat:no-repeat}.tw\\:before\\:backdrop-blur-2xl:before{content:var(--tw-content);--tw-backdrop-blur:blur(var(--tw-blur-2xl));-webkit-backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)}.tw\\:before\\:backdrop-saturate-150:before{content:var(--tw-content);--tw-backdrop-saturate:saturate(150%);-webkit-backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)}.tw\\:before\\:content-\\[\\"\\"\\]:before{--tw-content:"";content:var(--tw-content)}.tw\\:before\\:content-\\[\\\\\\"\\\\\\"\\]:before{--tw-content:\\"\\";content:var(--tw-content)}.tw\\:after\\:absolute:after{content:var(--tw-content);position:absolute}.tw\\:after\\:-inset-2:after{content:var(--tw-content);inset:calc(calc(var(--spacing)) * -2)}.tw\\:after\\:inset-0:after{content:var(--tw-content);inset:calc(calc(var(--spacing)) * 0)}.tw\\:after\\:-inset-x-3:after{content:var(--tw-content);inset-inline:calc(calc(var(--spacing)) * -3)}.tw\\:after\\:-inset-y-2:after{content:var(--tw-content);inset-block:calc(calc(var(--spacing)) * -2)}.tw\\:after\\:inset-y-0:after{content:var(--tw-content);inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:after\\:start-1\\/2:after{content:var(--tw-content);inset-inline-start:50%}.tw\\:after\\:top-\\[6px\\]:after{content:var(--tw-content);top:6px}.tw\\:after\\:right-\\[7px\\]:after{content:var(--tw-content);right:7px}.tw\\:after\\:left-\\[7px\\]:after{content:var(--tw-content);left:7px}.tw\\:after\\:block:after{content:var(--tw-content);display:block}.tw\\:after\\:hidden:after{content:var(--tw-content);display:none}.tw\\:after\\:h-0\\.5:after{content:var(--tw-content);height:calc(calc(var(--spacing)) * .5)}.tw\\:after\\:h-\\[6px\\]:after{content:var(--tw-content);height:6px}.tw\\:after\\:w-1:after{content:var(--tw-content);width:calc(calc(var(--spacing)) * 1)}.tw\\:after\\:w-\\[2px\\]:after{content:var(--tw-content);width:2px}.tw\\:after\\:w-\\[3px\\]:after{content:var(--tw-content);width:3px}.tw\\:after\\:-translate-x-1\\/2:after{content:var(--tw-content);--tw-translate-x:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:after\\:rotate-45:after{content:var(--tw-content);rotate:45deg}.tw\\:after\\:cursor-pointer:after{content:var(--tw-content);cursor:pointer}.tw\\:after\\:rounded-full:after{content:var(--tw-content);border-radius:3.40282e38px}.tw\\:after\\:border:after{content:var(--tw-content);border-style:var(--tw-border-style);border-width:1px}.tw\\:after\\:border-t-0:after{content:var(--tw-content);border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:after\\:border-r-2:after{content:var(--tw-content);border-right-style:var(--tw-border-style);border-right-width:2px}.tw\\:after\\:border-b-2:after{content:var(--tw-content);border-bottom-style:var(--tw-border-style);border-bottom-width:2px}.tw\\:after\\:border-l-0:after{content:var(--tw-content);border-left-style:var(--tw-border-style);border-left-width:0}.tw\\:after\\:border-solid:after{content:var(--tw-content);--tw-border-style:solid;border-style:solid}.tw\\:after\\:border-border:after{content:var(--tw-content);border-color:var(--border)}.tw\\:after\\:border-white:after{content:var(--tw-content);border-color:var(--tw-color-white)}.tw\\:after\\:bg-foreground:after{content:var(--tw-content);background-color:var(--foreground)}.tw\\:after\\:bg-muted:after{content:var(--tw-content);background-color:var(--muted)}.tw\\:after\\:opacity-0:after{content:var(--tw-content);opacity:0}.tw\\:after\\:mix-blend-darken:after{content:var(--tw-content);mix-blend-mode:darken}.tw\\:after\\:transition-opacity:after{content:var(--tw-content);transition-property:opacity;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:after\\:content-\\[\\"\\"\\]:after{--tw-content:"";content:var(--tw-content)}.tw\\:after\\:content-\\[\\\\\\"\\\\\\"\\]:after{--tw-content:\\"\\";content:var(--tw-content)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:after\\:start-full:is(:where(.tw\\:group)[data-collapsible=offcanvas] *):after{content:var(--tw-content);inset-inline-start:100%}.tw\\:group-data-horizontal\\/tabs\\:after\\:inset-x-0:is(:where(.tw\\:group\\/tabs):where([data-orientation=horizontal]) *):after{content:var(--tw-content);inset-inline:calc(calc(var(--spacing)) * 0)}.tw\\:group-data-horizontal\\/tabs\\:after\\:bottom-\\[-5px\\]:is(:where(.tw\\:group\\/tabs):where([data-orientation=horizontal]) *):after{content:var(--tw-content);bottom:-5px}.tw\\:group-data-horizontal\\/tabs\\:after\\:h-0\\.5:is(:where(.tw\\:group\\/tabs):where([data-orientation=horizontal]) *):after{content:var(--tw-content);height:calc(calc(var(--spacing)) * .5)}.tw\\:group-data-vertical\\/tabs\\:after\\:inset-y-0:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *):after{content:var(--tw-content);inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:group-data-vertical\\/tabs\\:after\\:-end-1:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *):after{content:var(--tw-content);inset-inline-end:calc(calc(var(--spacing)) * -1)}.tw\\:group-data-vertical\\/tabs\\:after\\:w-0\\.5:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *):after{content:var(--tw-content);width:calc(calc(var(--spacing)) * .5)}.tw\\:first\\:mt-0:first-child{margin-top:calc(calc(var(--spacing)) * 0)}.tw\\:last\\:border-b-0:last-child{border-bottom-style:var(--tw-border-style);border-bottom-width:0}.tw\\:even\\:bg-muted:nth-child(2n){background-color:var(--muted)}.tw\\:focus-within\\:ring-2:focus-within{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-within\\:ring-ring:focus-within{--tw-ring-color:var(--ring)}.tw\\:focus-within\\:ring-offset-1:focus-within{--tw-ring-offset-width:1px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}@media (hover:hover){.tw\\:hover\\:-mt-4:hover{margin-top:calc(calc(var(--spacing)) * -4)}.tw\\:hover\\:cursor-pointer:hover{cursor:pointer}.tw\\:hover\\:bg-accent:hover,.tw\\:hover\\:bg-accent\\/30:hover{background-color:var(--accent)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-accent\\/30:hover{background-color:color-mix(in oklab, var(--accent) 30%, transparent)}}.tw\\:hover\\:bg-accent\\/80:hover{background-color:var(--accent)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-accent\\/80:hover{background-color:color-mix(in oklab, var(--accent) 80%, transparent)}}.tw\\:hover\\:bg-blue-600:hover{background-color:var(--tw-color-blue-600)}.tw\\:hover\\:bg-destructive\\/20:hover{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-destructive\\/20:hover{background-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:hover\\:bg-gray-50:hover{background-color:var(--tw-color-gray-50)}.tw\\:hover\\:bg-input:hover{background-color:var(--input)}.tw\\:hover\\:bg-muted:hover,.tw\\:hover\\:bg-muted\\/50:hover{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-muted\\/50:hover{background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:hover\\:bg-muted\\/80:hover{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-muted\\/80:hover{background-color:color-mix(in oklab, var(--muted) 80%, transparent)}}.tw\\:hover\\:bg-primary\\/10:hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-primary\\/10:hover{background-color:color-mix(in oklab, var(--primary) 10%, transparent)}}.tw\\:hover\\:bg-primary\\/70:hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-primary\\/70:hover{background-color:color-mix(in oklab, var(--primary) 70%, transparent)}}.tw\\:hover\\:bg-primary\\/90:hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-primary\\/90:hover{background-color:color-mix(in oklab, var(--primary) 90%, transparent)}}.tw\\:hover\\:bg-red-500:hover{background-color:var(--tw-color-red-500)}.tw\\:hover\\:bg-secondary:hover,.tw\\:hover\\:bg-secondary\\/80:hover{background-color:var(--secondary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-secondary\\/80:hover{background-color:color-mix(in oklab, var(--secondary) 80%, transparent)}}.tw\\:hover\\:bg-sidebar-accent:hover{background-color:var(--sidebar-accent)}.tw\\:hover\\:bg-transparent:hover{background-color:#0000}.tw\\:hover\\:text-foreground:hover{color:var(--foreground)}.tw\\:hover\\:text-muted-foreground:hover{color:var(--muted-foreground)}.tw\\:hover\\:text-primary-foreground:hover{color:var(--primary-foreground)}.tw\\:hover\\:text-sidebar-accent-foreground:hover{color:var(--sidebar-accent-foreground)}.tw\\:hover\\:underline:hover{text-decoration-line:underline}.tw\\:hover\\:opacity-80:hover{opacity:.8}.tw\\:hover\\:opacity-100:hover{opacity:1}.tw\\:hover\\:shadow-\\[0_0_0_1px_var\\(--sidebar-accent\\)\\]:hover{--tw-shadow:0 0 0 1px var(--tw-shadow-color,var(--sidebar-accent));box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:hover\\:shadow-md:hover{--tw-shadow:0 4px 6px -1px var(--tw-shadow-color,#0000001a), 0 2px 4px -2px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:hover\\:ring-3:hover{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:hover\\:group-data-\\[collapsible\\=offcanvas\\]\\:bg-sidebar:hover:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){background-color:var(--sidebar)}.tw\\:hover\\:after\\:bg-sidebar-border:hover:after{content:var(--tw-content);background-color:var(--sidebar-border)}}.tw\\:focus\\:relative:focus{position:relative}.tw\\:focus\\:z-10:focus{z-index:10}.tw\\:focus\\:bg-accent:focus{background-color:var(--accent)}.tw\\:focus\\:bg-muted:focus{background-color:var(--muted)}.tw\\:focus\\:text-accent-foreground:focus{color:var(--accent-foreground)}.tw\\:focus\\:text-foreground:focus{color:var(--foreground)}.tw\\:focus\\:ring-2:focus{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus\\:ring-ring:focus{--tw-ring-color:var(--ring)}.tw\\:focus\\:ring-offset-1:focus{--tw-ring-offset-width:1px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}.tw\\:focus\\:ring-offset-background:focus{--tw-ring-offset-color:var(--background)}.tw\\:focus\\:outline-hidden:focus{--tw-outline-style:none;outline-style:none}@media (forced-colors:active){.tw\\:focus\\:outline-hidden:focus{outline-offset:2px;outline:2px solid #0000}}:is(.tw\\:focus\\:\\*\\*\\:text-accent-foreground:focus *),:is(.tw\\:not-data-\\[variant\\=destructive\\]\\:focus\\:\\*\\*\\:text-accent-foreground:not([data-variant=destructive]):focus *){color:var(--accent-foreground)}.tw\\:focus-visible\\:relative:focus-visible{position:relative}.tw\\:focus-visible\\:z-10:focus-visible{z-index:10}.tw\\:focus-visible\\:border-destructive\\/40:focus-visible{border-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:focus-visible\\:border-destructive\\/40:focus-visible{border-color:color-mix(in oklab, var(--destructive) 40%, transparent)}}.tw\\:focus-visible\\:border-ring:focus-visible{border-color:var(--ring)}.tw\\:focus-visible\\:ring-0:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-visible\\:ring-1:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-visible\\:ring-2:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-visible\\:ring-3:focus-visible,.tw\\:focus-visible\\:ring-\\[3px\\]:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-visible\\:ring-\\[color\\:hsl\\(240\\,5\\%\\,64\\.9\\%\\)\\]:focus-visible{--tw-ring-color:#a1a1aa}.tw\\:focus-visible\\:ring-destructive\\/20:focus-visible{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:focus-visible\\:ring-destructive\\/20:focus-visible{--tw-ring-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:focus-visible\\:ring-ring:focus-visible,.tw\\:focus-visible\\:ring-ring\\/50:focus-visible{--tw-ring-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.tw\\:focus-visible\\:ring-ring\\/50:focus-visible{--tw-ring-color:color-mix(in oklab, var(--ring) 50%, transparent)}}.tw\\:focus-visible\\:ring-slate-400:focus-visible{--tw-ring-color:var(--tw-color-slate-400)}.tw\\:focus-visible\\:ring-offset-2:focus-visible{--tw-ring-offset-width:2px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}.tw\\:focus-visible\\:outline-hidden:focus-visible{--tw-outline-style:none;outline-style:none}@media (forced-colors:active){.tw\\:focus-visible\\:outline-hidden:focus-visible{outline-offset:2px;outline:2px solid #0000}}.tw\\:focus-visible\\:outline-1:focus-visible{outline-style:var(--tw-outline-style);outline-width:1px}.tw\\:focus-visible\\:outline-ring:focus-visible{outline-color:var(--ring)}.tw\\:focus-visible\\:outline-none:focus-visible{--tw-outline-style:none;outline-style:none}:is(.tw\\:\\*\\:focus-visible\\:relative>*):focus-visible{position:relative}:is(.tw\\:\\*\\:focus-visible\\:z-10>*):focus-visible{z-index:10}.tw\\:active\\:bg-sidebar-accent:active{background-color:var(--sidebar-accent)}.tw\\:active\\:text-sidebar-accent-foreground:active{color:var(--sidebar-accent-foreground)}.tw\\:active\\:ring-3:active{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:active\\:not-aria-\\[haspopup\\]\\:translate-y-px:active:not([aria-haspopup]){--tw-translate-y:1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:active\\:not-aria-\\[haspopup\\]\\:transform-\\[translateY\\(1px\\)\\]:active:not([aria-haspopup]){transform:translateY(1px)}.tw\\:disabled\\:pointer-events-none:disabled{pointer-events:none}.tw\\:disabled\\:cursor-not-allowed:disabled{cursor:not-allowed}.tw\\:disabled\\:bg-input\\/50:disabled{background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:disabled\\:bg-input\\/50:disabled{background-color:color-mix(in oklab, var(--input) 50%, transparent)}}.tw\\:disabled\\:bg-transparent:disabled{background-color:#0000}.tw\\:disabled\\:opacity-50:disabled{opacity:.5}:where([data-side=bottom]) .tw\\:in-data-\\[side\\=bottom\\]\\:translate-y-\\[calc\\(-50\\%-1px\\)\\]{--tw-translate-y:calc(-50% - 1px);translate:var(--tw-translate-x) var(--tw-translate-y)}:where([data-side=bottom]) .tw\\:in-data-\\[side\\=bottom\\]\\:\\[clip-path\\:polygon\\(100\\%_0\\,100\\%_100\\%\\,0_100\\%\\)\\]{clip-path:polygon(100% 0,100% 100%,0 100%)}:where([data-side=primary]) .tw\\:in-data-\\[side\\=primary\\]\\:cursor-w-resize{cursor:w-resize}:where([data-side=secondary]) .tw\\:in-data-\\[side\\=secondary\\]\\:cursor-e-resize{cursor:e-resize}:where([data-side=top]) .tw\\:in-data-\\[side\\=top\\]\\:translate-y-\\[calc\\(-50\\%-1px\\)\\]{--tw-translate-y:calc(-50% - 1px);translate:var(--tw-translate-x) var(--tw-translate-y)}:where([data-side=top]) .tw\\:in-data-\\[side\\=top\\]\\:\\[clip-path\\:polygon\\(100\\%_0\\,100\\%_100\\%\\,0_100\\%\\)\\]{clip-path:polygon(100% 0,100% 100%,0 100%)}:where([data-slot=button-group]) .tw\\:in-data-\\[slot\\=button-group\\]\\:rounded-lg{border-radius:var(--radius)}:where([data-slot=combobox-content]) .tw\\:in-data-\\[slot\\=combobox-content\\]\\:focus-within\\:border-inherit:focus-within{border-color:inherit}:where([data-slot=combobox-content]) .tw\\:in-data-\\[slot\\=combobox-content\\]\\:focus-within\\:ring-0:focus-within{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}:where([data-slot=dialog-content]) .tw\\:in-data-\\[slot\\=dialog-content\\]\\:rounded-lg\\!{border-radius:var(--radius)!important}:where([data-slot=tooltip-content]) .tw\\:in-data-\\[slot\\=tooltip-content\\]\\:bg-background\\/20{background-color:var(--background)}@supports (color:color-mix(in lab, red, red)){:where([data-slot=tooltip-content]) .tw\\:in-data-\\[slot\\=tooltip-content\\]\\:bg-background\\/20{background-color:color-mix(in oklab, var(--background) 20%, transparent)}}:where([data-slot=tooltip-content]) .tw\\:in-data-\\[slot\\=tooltip-content\\]\\:text-background{color:var(--background)}:where([data-slot=tooltip-content]) .tw\\:in-data-\\[slot\\=tooltip-content\\]\\:text-destructive{color:var(--destructive)}.tw\\:has-disabled\\:bg-input\\/50:has(:disabled){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:has-disabled\\:bg-input\\/50:has(:disabled){background-color:color-mix(in oklab, var(--input) 50%, transparent)}}.tw\\:has-disabled\\:opacity-50:has(:disabled){opacity:.5}.tw\\:has-aria-expanded\\:bg-muted\\/50:has([aria-expanded=true]){background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:has-aria-expanded\\:bg-muted\\/50:has([aria-expanded=true]){background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:has-data-\\[icon\\=inline-end\\]\\:pe-1:has([data-icon=inline-end]){padding-inline-end:calc(calc(var(--spacing)) * 1)}.tw\\:has-data-\\[icon\\=inline-end\\]\\:pe-1\\.5:has([data-icon=inline-end]){padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[icon\\=inline-end\\]\\:pe-2:has([data-icon=inline-end]){padding-inline-end:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[spacing\\=0\\]\\/toggle-group\\:has-data-\\[icon\\=inline-end\\]\\:pe-1\\.5:is(:where(.tw\\:group\\/toggle-group)[data-spacing="0"] *):has([data-icon=inline-end]){padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[icon\\=inline-start\\]\\:ps-1:has([data-icon=inline-start]){padding-inline-start:calc(calc(var(--spacing)) * 1)}.tw\\:has-data-\\[icon\\=inline-start\\]\\:ps-1\\.5:has([data-icon=inline-start]){padding-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[icon\\=inline-start\\]\\:ps-2:has([data-icon=inline-start]){padding-inline-start:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[spacing\\=0\\]\\/toggle-group\\:has-data-\\[icon\\=inline-start\\]\\:ps-1\\.5:is(:where(.tw\\:group\\/toggle-group)[data-spacing="0"] *):has([data-icon=inline-start]){padding-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[slot\\=alert-action\\]\\:relative:has([data-slot=alert-action]){position:relative}.tw\\:has-data-\\[slot\\=alert-action\\]\\:pe-18:has([data-slot=alert-action]){padding-inline-end:calc(calc(var(--spacing)) * 18)}.tw\\:has-data-\\[slot\\=card-action\\]\\:grid-cols-\\[1fr_auto\\]:has([data-slot=card-action]){grid-template-columns:1fr auto}.tw\\:has-data-\\[slot\\=card-description\\]\\:grid-rows-\\[auto_auto\\]:has([data-slot=card-description]){grid-template-rows:auto auto}.tw\\:has-data-\\[slot\\=card-footer\\]\\:pb-0:has([data-slot=card-footer]){padding-bottom:calc(calc(var(--spacing)) * 0)}.tw\\:has-data-\\[slot\\=kbd\\]\\:pe-0:has([data-slot=kbd]){padding-inline-end:calc(calc(var(--spacing)) * 0)}.tw\\:has-data-\\[slot\\=kbd\\]\\:pe-1\\.5:has([data-slot=kbd]){padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[variant\\=inset\\]\\:bg-sidebar:has([data-variant=inset]){background-color:var(--sidebar)}.tw\\:has-\\[\\[data-slot\\=input-group-control\\]\\:focus-visible\\]\\:border-ring:has([data-slot=input-group-control]:focus-visible){border-color:var(--ring)}.tw\\:has-\\[\\[data-slot\\=input-group-control\\]\\:focus-visible\\]\\:ring-3:has([data-slot=input-group-control]:focus-visible){--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:has-\\[\\[data-slot\\=input-group-control\\]\\:focus-visible\\]\\:ring-ring\\/50:has([data-slot=input-group-control]:focus-visible){--tw-ring-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.tw\\:has-\\[\\[data-slot\\=input-group-control\\]\\:focus-visible\\]\\:ring-ring\\/50:has([data-slot=input-group-control]:focus-visible){--tw-ring-color:color-mix(in oklab, var(--ring) 50%, transparent)}}.tw\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:border-destructive:has([data-slot][aria-invalid=true]){border-color:var(--destructive)}.tw\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-3:has([data-slot][aria-invalid=true]){--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-destructive\\/20:has([data-slot][aria-invalid=true]){--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-destructive\\/20:has([data-slot][aria-invalid=true]){--tw-ring-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:has-\\[\\>\\[data-align\\=block-end\\]\\]\\:h-auto:has(>[data-align=block-end]){height:auto}.tw\\:has-\\[\\>\\[data-align\\=block-end\\]\\]\\:flex-col:has(>[data-align=block-end]){flex-direction:column}.tw\\:has-\\[\\>\\[data-align\\=block-start\\]\\]\\:h-auto:has(>[data-align=block-start]){height:auto}.tw\\:has-\\[\\>\\[data-align\\=block-start\\]\\]\\:flex-col:has(>[data-align=block-start]){flex-direction:column}.tw\\:has-\\[\\>\\[data-slot\\=button-group\\]\\]\\:gap-2:has(>[data-slot=button-group]){gap:calc(calc(var(--spacing)) * 2)}.tw\\:has-\\[\\>button\\]\\:ms-\\[-0\\.3rem\\]:has(>button){margin-inline-start:-.3rem}.tw\\:has-\\[\\>button\\]\\:me-\\[-0\\.3rem\\]:has(>button){margin-inline-end:-.3rem}.tw\\:has-\\[\\>img\\]\\:grid-cols-\\[auto_1fr\\]:has(>img){grid-template-columns:auto 1fr}.tw\\:has-\\[\\>img\\]\\:gap-x-2:has(>img){column-gap:calc(calc(var(--spacing)) * 2)}.tw\\:has-\\[\\>img\\:first-child\\]\\:pt-0:has(>img:first-child){padding-top:calc(calc(var(--spacing)) * 0)}.tw\\:has-\\[\\>kbd\\]\\:ms-\\[-0\\.15rem\\]:has(>kbd){margin-inline-start:-.15rem}.tw\\:has-\\[\\>kbd\\]\\:me-\\[-0\\.15rem\\]:has(>kbd){margin-inline-end:-.15rem}.tw\\:has-\\[\\>svg\\]\\:grid-cols-\\[auto_1fr\\]:has(>svg){grid-template-columns:auto 1fr}.tw\\:has-\\[\\>svg\\]\\:gap-x-2:has(>svg){column-gap:calc(calc(var(--spacing)) * 2)}.tw\\:has-\\[\\>svg\\]\\:p-0:has(>svg){padding:calc(calc(var(--spacing)) * 0)}.tw\\:has-\\[\\>textarea\\]\\:h-auto:has(>textarea){height:auto}.tw\\:aria-disabled\\:pointer-events-none[aria-disabled=true]{pointer-events:none}.tw\\:aria-disabled\\:opacity-50[aria-disabled=true]{opacity:.5}.tw\\:aria-expanded\\:bg-muted[aria-expanded=true]{background-color:var(--muted)}.tw\\:aria-expanded\\:bg-secondary[aria-expanded=true]{background-color:var(--secondary)}.tw\\:aria-expanded\\:text-foreground[aria-expanded=true]{color:var(--foreground)}.tw\\:aria-expanded\\:text-secondary-foreground[aria-expanded=true]{color:var(--secondary-foreground)}.tw\\:aria-expanded\\:opacity-100[aria-expanded=true]{opacity:1}.tw\\:aria-invalid\\:border-destructive[aria-invalid=true]{border-color:var(--destructive)}.tw\\:aria-invalid\\:ring-0[aria-invalid=true]{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:aria-invalid\\:ring-3[aria-invalid=true]{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:aria-invalid\\:ring-destructive\\/20[aria-invalid=true]{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:aria-invalid\\:ring-destructive\\/20[aria-invalid=true]{--tw-ring-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:aria-invalid\\:aria-checked\\:border-primary[aria-invalid=true][aria-checked=true]{border-color:var(--primary)}.tw\\:aria-pressed\\:bg-muted[aria-pressed=true]{background-color:var(--muted)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:h-px[aria-orientation=horizontal]{height:1px}.tw\\:aria-\\[orientation\\=horizontal\\]\\:w-full[aria-orientation=horizontal]{width:100%}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:start-0[aria-orientation=horizontal]:after{content:var(--tw-content);inset-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:h-1[aria-orientation=horizontal]:after{content:var(--tw-content);height:calc(calc(var(--spacing)) * 1)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:w-full[aria-orientation=horizontal]:after{content:var(--tw-content);width:100%}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:translate-x-0[aria-orientation=horizontal]:after{content:var(--tw-content);--tw-translate-x:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:-translate-y-1\\/2[aria-orientation=horizontal]:after{content:var(--tw-content);--tw-translate-y:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:aria-\\[orientation\\=vertical\\]\\:flex-col[aria-orientation=vertical]{flex-direction:column}.tw\\:data-inset\\:ps-7[data-inset]{padding-inline-start:calc(calc(var(--spacing)) * 7)}.tw\\:data-placeholder\\:text-muted-foreground[data-placeholder]{color:var(--muted-foreground)}.tw\\:data-\\[align-trigger\\=false\\]\\:min-w-36[data-align-trigger=false]{min-width:calc(calc(var(--spacing)) * 36)}.tw\\:data-\\[align-trigger\\=true\\]\\:min-w-\\(--radix-select-trigger-width\\)[data-align-trigger=true]{min-width:var(--radix-select-trigger-width)}.tw\\:data-\\[align-trigger\\=true\\]\\:animate-none[data-align-trigger=true]{animation:none}.tw\\:data-\\[disabled\\=true\\]\\:pointer-events-none[data-disabled=true]{pointer-events:none}.tw\\:data-\\[disabled\\=true\\]\\:opacity-50[data-disabled=true]{opacity:.5}.tw\\:data-\\[position\\=popper\\]\\:h-\\(--radix-select-trigger-height\\)[data-position=popper]{height:var(--radix-select-trigger-height)}.tw\\:data-\\[position\\=popper\\]\\:w-full[data-position=popper]{width:100%}.tw\\:data-\\[position\\=popper\\]\\:min-w-\\(--radix-select-trigger-width\\)[data-position=popper]{min-width:var(--radix-select-trigger-width)}.tw\\:data-\\[side\\=bottom\\]\\:translate-y-1[data-side=bottom]{--tw-translate-y:calc(calc(var(--spacing)) * 1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=bottom\\]\\:slide-in-from-top-2[data-side=bottom]{--tw-enter-translate-y:calc(2*var(--spacing)*-1)}.tw\\:data-\\[side\\=left\\]\\:-translate-x-1[data-side=left]{--tw-translate-x:calc(calc(var(--spacing)) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=left\\]\\:slide-in-from-right-2[data-side=left]{--tw-enter-translate-x:calc(2*var(--spacing))}.tw\\:data-\\[side\\=right\\]\\:translate-x-1[data-side=right]{--tw-translate-x:calc(calc(var(--spacing)) * 1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=right\\]\\:slide-in-from-left-2[data-side=right]{--tw-enter-translate-x:calc(2*var(--spacing)*-1)}.tw\\:data-\\[side\\=top\\]\\:-translate-y-1[data-side=top]{--tw-translate-y:calc(calc(var(--spacing)) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=top\\]\\:slide-in-from-bottom-2[data-side=top]{--tw-enter-translate-y:calc(2*var(--spacing))}.tw\\:data-\\[size\\=default\\]\\:h-8[data-size=default]{height:calc(calc(var(--spacing)) * 8)}.tw\\:data-\\[size\\=default\\]\\:h-\\[18\\.4px\\][data-size=default]{height:18.4px}.tw\\:data-\\[size\\=default\\]\\:w-\\[32px\\][data-size=default]{width:32px}.tw\\:data-\\[size\\=lg\\]\\:size-10[data-size=lg]{width:calc(calc(var(--spacing)) * 10);height:calc(calc(var(--spacing)) * 10)}.tw\\:data-\\[size\\=md\\]\\:text-sm[data-size=md]{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:data-\\[size\\=sm\\]\\:size-6[data-size=sm]{width:calc(calc(var(--spacing)) * 6);height:calc(calc(var(--spacing)) * 6)}.tw\\:data-\\[size\\=sm\\]\\:h-7[data-size=sm]{height:calc(calc(var(--spacing)) * 7)}.tw\\:data-\\[size\\=sm\\]\\:h-\\[14px\\][data-size=sm]{height:14px}.tw\\:data-\\[size\\=sm\\]\\:w-\\[24px\\][data-size=sm]{width:24px}.tw\\:data-\\[size\\=sm\\]\\:gap-3[data-size=sm]{gap:calc(calc(var(--spacing)) * 3)}.tw\\:data-\\[size\\=sm\\]\\:rounded-\\[min\\(var\\(--tw-radius-md\\)\\,10px\\)\\][data-size=sm]{border-radius:min(var(--tw-radius-md), 10px)}.tw\\:data-\\[size\\=sm\\]\\:py-3[data-size=sm]{padding-block:calc(calc(var(--spacing)) * 3)}.tw\\:data-\\[size\\=sm\\]\\:text-xs[data-size=sm]{font-size:var(--tw-text-xs);line-height:var(--tw-leading,var(--tw-text-xs--line-height))}.tw\\:data-\\[size\\=sm\\]\\:has-data-\\[slot\\=card-footer\\]\\:pb-0[data-size=sm]:has([data-slot=card-footer]){padding-bottom:calc(calc(var(--spacing)) * 0)}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-item\\]\\:focus\\:bg-foreground\\/10 *)[data-slot$=-item]:focus{background-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-item\\]\\:focus\\:bg-foreground\\/10 *)[data-slot$=-item]:focus{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)}}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-item\\]\\:data-highlighted\\:bg-foreground\\/10 *)[data-slot$=-item][data-highlighted]{background-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-item\\]\\:data-highlighted\\:bg-foreground\\/10 *)[data-slot$=-item][data-highlighted]{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)}}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-separator\\]\\:bg-foreground\\/5 *)[data-slot$=-separator]{background-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-separator\\]\\:bg-foreground\\/5 *)[data-slot$=-separator]{background-color:color-mix(in oklab, var(--foreground) 5%, transparent)}}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-trigger\\]\\:focus\\:bg-foreground\\/10 *)[data-slot$=-trigger]:focus{background-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-trigger\\]\\:focus\\:bg-foreground\\/10 *)[data-slot$=-trigger]:focus{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)}}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-trigger\\]\\:aria-expanded\\:bg-foreground\\/10\\! *)[data-slot$=-trigger][aria-expanded=true]{background-color:var(--foreground)!important}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-trigger\\]\\:aria-expanded\\:bg-foreground\\/10\\! *)[data-slot$=-trigger][aria-expanded=true]{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)!important}}:is(.tw\\:\\*\\:data-\\[slot\\=alert-description\\]\\:text-destructive\\/90>*)[data-slot=alert-description]{color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\:data-\\[slot\\=alert-description\\]\\:text-destructive\\/90>*)[data-slot=alert-description]{color:color-mix(in oklab, var(--destructive) 90%, transparent)}}:is(.tw\\:\\*\\:data-\\[slot\\=avatar\\]\\:ring-2>*)[data-slot=avatar]{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}:is(.tw\\:\\*\\:data-\\[slot\\=avatar\\]\\:ring-background>*)[data-slot=avatar]{--tw-ring-color:var(--background)}:is(.tw\\:\\*\\:data-\\[slot\\=input-group-addon\\]\\:ps-2\\!>*)[data-slot=input-group-addon]{padding-inline-start:calc(calc(var(--spacing)) * 2)!important}:is(.tw\\:\\*\\*\\:data-\\[slot\\=kbd\\]\\:relative *)[data-slot=kbd]{position:relative}:is(.tw\\:\\*\\*\\:data-\\[slot\\=kbd\\]\\:isolate *)[data-slot=kbd]{isolation:isolate}:is(.tw\\:\\*\\*\\:data-\\[slot\\=kbd\\]\\:z-50 *)[data-slot=kbd]{z-index:50}:is(.tw\\:\\*\\*\\:data-\\[slot\\=kbd\\]\\:rounded-sm *)[data-slot=kbd]{border-radius:calc(var(--radius) * .6)}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:line-clamp-1>*)[data-slot=select-value]{-webkit-line-clamp:1;-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:flex>*)[data-slot=select-value]{display:flex}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:flex-1>*)[data-slot=select-value]{flex:1}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:items-center>*)[data-slot=select-value]{align-items:center}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:gap-1\\.5>*)[data-slot=select-value]{gap:calc(calc(var(--spacing)) * 1.5)}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:text-start>*)[data-slot=select-value]{text-align:start}.tw\\:group-data-horizontal\\/toggle-group\\:data-\\[spacing\\=0\\]\\:first\\:rounded-s-lg:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=horizontal]) *)[data-spacing="0"]:first-child{border-start-start-radius:var(--radius);border-end-start-radius:var(--radius)}.tw\\:group-data-vertical\\/toggle-group\\:data-\\[spacing\\=0\\]\\:first\\:rounded-t-lg:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=vertical]) *)[data-spacing="0"]:first-child{border-top-left-radius:var(--radius);border-top-right-radius:var(--radius)}.tw\\:group-data-horizontal\\/toggle-group\\:data-\\[spacing\\=0\\]\\:last\\:rounded-e-lg:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=horizontal]) *)[data-spacing="0"]:last-child{border-start-end-radius:var(--radius);border-end-end-radius:var(--radius)}.tw\\:group-data-vertical\\/toggle-group\\:data-\\[spacing\\=0\\]\\:last\\:rounded-b-lg:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=vertical]) *)[data-spacing="0"]:last-child{border-bottom-right-radius:var(--radius);border-bottom-left-radius:var(--radius)}.tw\\:data-\\[state\\=active\\]\\:bg-background[data-state=active]{background-color:var(--background)}.tw\\:data-\\[state\\=active\\]\\:text-foreground[data-state=active]{color:var(--foreground)}.tw\\:data-\\[state\\=active\\]\\:shadow-sm[data-state=active]{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:data-\\[state\\=closed\\]\\:overflow-hidden[data-state=closed]{overflow:hidden}.tw\\:data-\\[state\\=delayed-open\\]\\:animate-in[data-state=delayed-open]{animation:enter var(--tw-animation-duration,var(--tw-duration,.15s))var(--tw-ease,ease)var(--tw-animation-delay,0s)var(--tw-animation-iteration-count,1)var(--tw-animation-direction,normal)var(--tw-animation-fill-mode,none)}.tw\\:data-\\[state\\=delayed-open\\]\\:fade-in-0[data-state=delayed-open]{--tw-enter-opacity:0}.tw\\:data-\\[state\\=delayed-open\\]\\:zoom-in-95[data-state=delayed-open]{--tw-enter-scale:.95}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-soft-approved\\)\\][data-state=on]{background-color:var(--inv-soft-approved)}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-soft-unapproved\\)\\][data-state=on]{background-color:var(--inv-soft-unapproved)}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-soft-unknown\\)\\][data-state=on]{background-color:var(--inv-soft-unknown)}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-vivid-approved\\)\\][data-state=on]{background-color:var(--inv-vivid-approved)}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-vivid-unapproved\\)\\][data-state=on]{background-color:var(--inv-vivid-unapproved)}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-vivid-unknown\\)\\][data-state=on]{background-color:var(--inv-vivid-unknown)}.tw\\:data-\\[state\\=on\\]\\:bg-muted[data-state=on]{background-color:var(--muted)}.tw\\:data-\\[state\\=on\\]\\:text-\\[var\\(--inv-icon-approved\\)\\][data-state=on]{color:var(--inv-icon-approved)}.tw\\:data-\\[state\\=on\\]\\:text-\\[var\\(--inv-icon-unapproved\\)\\][data-state=on]{color:var(--inv-icon-unapproved)}.tw\\:data-\\[state\\=on\\]\\:text-\\[var\\(--inv-icon-unknown\\)\\][data-state=on]{color:var(--inv-icon-unknown)}.tw\\:data-\\[state\\=on\\]\\:text-\\[var\\(--inv-on\\)\\][data-state=on]{color:var(--inv-on)}.tw\\:data-\\[state\\=on\\]\\:text-foreground[data-state=on]{color:var(--foreground)}.tw\\:data-\\[state\\=open\\]\\:bg-accent[data-state=open]{background-color:var(--accent)}.tw\\:data-\\[state\\=open\\]\\:bg-muted[data-state=open]{background-color:var(--muted)}.tw\\:data-\\[state\\=open\\]\\:text-foreground[data-state=open]{color:var(--foreground)}.tw\\:data-\\[state\\=selected\\]\\:bg-muted[data-state=selected]{background-color:var(--muted)}.tw\\:data-\\[variant\\=destructive\\]\\:text-destructive[data-variant=destructive]{color:var(--destructive)}:is(:is(.tw\\:\\*\\*\\:data-\\[variant\\=destructive\\]\\:\\*\\*\\:text-accent-foreground\\! *)[data-variant=destructive] *),:is(.tw\\:\\*\\*\\:data-\\[variant\\=destructive\\]\\:text-accent-foreground\\! *)[data-variant=destructive]{color:var(--accent-foreground)!important}.tw\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-destructive\\/10[data-variant=destructive]:focus{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-destructive\\/10[data-variant=destructive]:focus{background-color:color-mix(in oklab, var(--destructive) 10%, transparent)}}.tw\\:data-\\[variant\\=destructive\\]\\:focus\\:text-destructive[data-variant=destructive]:focus{color:var(--destructive)}:is(.tw\\:\\*\\*\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-foreground\\/10\\! *)[data-variant=destructive]:focus{background-color:var(--foreground)!important}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-foreground\\/10\\! *)[data-variant=destructive]:focus{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)!important}}.tw\\:data-\\[variant\\=line\\]\\:rounded-none[data-variant=line]{border-radius:0}.tw\\:group-data-horizontal\\/toggle-group\\:data-\\[spacing\\=0\\]\\:data-\\[variant\\=outline\\]\\:border-s-0:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=horizontal]) *)[data-spacing="0"][data-variant=outline]{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:group-data-vertical\\/toggle-group\\:data-\\[spacing\\=0\\]\\:data-\\[variant\\=outline\\]\\:border-t-0:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=vertical]) *)[data-spacing="0"][data-variant=outline]{border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:group-data-horizontal\\/toggle-group\\:data-\\[spacing\\=0\\]\\:data-\\[variant\\=outline\\]\\:first\\:border-s:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=horizontal]) *)[data-spacing="0"][data-variant=outline]:first-child{border-inline-start-style:var(--tw-border-style);border-inline-start-width:1px}.tw\\:group-data-vertical\\/toggle-group\\:data-\\[spacing\\=0\\]\\:data-\\[variant\\=outline\\]\\:first\\:border-t:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=vertical]) *)[data-spacing="0"][data-variant=outline]:first-child{border-top-style:var(--tw-border-style);border-top-width:1px}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:inset-x-0[data-vaul-drawer-direction=bottom]{inset-inline:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:bottom-0[data-vaul-drawer-direction=bottom]{bottom:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:mt-24[data-vaul-drawer-direction=bottom]{margin-top:calc(calc(var(--spacing)) * 24)}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:max-h-\\[80vh\\][data-vaul-drawer-direction=bottom]{max-height:80vh}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:rounded-t-xl[data-vaul-drawer-direction=bottom]{border-top-left-radius:calc(var(--radius) * 1.4);border-top-right-radius:calc(var(--radius) * 1.4)}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:border-t[data-vaul-drawer-direction=bottom]{border-top-style:var(--tw-border-style);border-top-width:1px}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:inset-y-0[data-vaul-drawer-direction=left]{inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:left-0[data-vaul-drawer-direction=left]{left:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:w-3\\/4[data-vaul-drawer-direction=left]{width:75%}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:flex-row[data-vaul-drawer-direction=left]{flex-direction:row}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:rounded-r-xl[data-vaul-drawer-direction=left]{border-top-right-radius:calc(var(--radius) * 1.4);border-bottom-right-radius:calc(var(--radius) * 1.4)}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:border-r[data-vaul-drawer-direction=left]{border-right-style:var(--tw-border-style);border-right-width:1px}.tw\\:data-\\[vaul-drawer-direction\\=left\\/right\\]\\:flex-row[data-vaul-drawer-direction=left\\/right]{flex-direction:row}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:inset-y-0[data-vaul-drawer-direction=right]{inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:right-0[data-vaul-drawer-direction=right]{right:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:w-3\\/4[data-vaul-drawer-direction=right]{width:75%}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:flex-row[data-vaul-drawer-direction=right]{flex-direction:row}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:rounded-l-xl[data-vaul-drawer-direction=right]{border-top-left-radius:calc(var(--radius) * 1.4);border-bottom-left-radius:calc(var(--radius) * 1.4)}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:border-l[data-vaul-drawer-direction=right]{border-left-style:var(--tw-border-style);border-left-width:1px}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:inset-x-0[data-vaul-drawer-direction=top]{inset-inline:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:top-0[data-vaul-drawer-direction=top]{top:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:mb-24[data-vaul-drawer-direction=top]{margin-bottom:calc(calc(var(--spacing)) * 24)}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:max-h-\\[80vh\\][data-vaul-drawer-direction=top]{max-height:80vh}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:rounded-b-xl[data-vaul-drawer-direction=top]{border-bottom-right-radius:calc(var(--radius) * 1.4);border-bottom-left-radius:calc(var(--radius) * 1.4)}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:border-b[data-vaul-drawer-direction=top]{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}@supports ((-webkit-backdrop-filter:var(--tw)) or (backdrop-filter:var(--tw))){.tw\\:supports-backdrop-filter\\:backdrop-blur-xs{--tw-backdrop-blur:blur(var(--tw-blur-xs));-webkit-backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)}}@media (min-width:40rem){.tw\\:sm\\:flex{display:flex}.tw\\:sm\\:max-w-sm{max-width:var(--tw-container-sm)}.tw\\:sm\\:flex-row{flex-direction:row}.tw\\:sm\\:justify-end{justify-content:flex-end}.tw\\:sm\\:p-8{padding:calc(calc(var(--spacing)) * 8)}.tw\\:sm\\:text-start{text-align:start}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:sm\\:max-w-sm[data-vaul-drawer-direction=left],.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:sm\\:max-w-sm[data-vaul-drawer-direction=right]{max-width:var(--tw-container-sm)}}@media (min-width:48rem){.tw\\:md\\:block{display:block}.tw\\:md\\:flex{display:flex}.tw\\:md\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.tw\\:md\\:gap-0\\.5{gap:calc(calc(var(--spacing)) * .5)}.tw\\:md\\:text-start{text-align:start}.tw\\:md\\:text-sm{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:md\\:text-pretty{text-wrap:pretty}.tw\\:md\\:opacity-0{opacity:0}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:m-2:is(:where(.tw\\:peer)[data-variant=inset]~*){margin:calc(calc(var(--spacing)) * 2)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:ms-0:is(:where(.tw\\:peer)[data-variant=inset]~*){margin-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:rounded-xl:is(:where(.tw\\:peer)[data-variant=inset]~*){border-radius:calc(var(--radius) * 1.4)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:shadow-sm:is(:where(.tw\\:peer)[data-variant=inset]~*){--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:peer-data-\\[state\\=collapsed\\]\\:ms-2:is(:where(.tw\\:peer)[data-variant=inset]~*):is(:where(.tw\\:peer)[data-state=collapsed]~*){margin-inline-start:calc(calc(var(--spacing)) * 2)}.tw\\:md\\:after\\:hidden:after{content:var(--tw-content);display:none}}@media (min-width:64rem){.tw\\:lg\\:flex{display:flex}.tw\\:lg\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}:where(.tw\\:lg\\:space-x-8>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 8) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 8) * calc(1 - var(--tw-space-x-reverse)))}.tw\\:lg\\:text-5xl{font-size:var(--tw-text-5xl);line-height:var(--tw-leading,var(--tw-text-5xl--line-height))}}@media (min-width:48rem){@media (min-width:64rem){.tw\\:md\\:lg\\:hidden{display:none}}}@media (min-width:80rem){.tw\\:xl\\:auto-cols-fr{grid-auto-columns:minmax(0,1fr)}.tw\\:xl\\:grid-flow-col{grid-auto-flow:column}.tw\\:xl\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.tw\\:xl\\:grid-cols-none{grid-template-columns:none}.tw\\:xl\\:grid-rows-2{grid-template-rows:repeat(2,minmax(0,1fr))}}@container search not (min-width:7rem){.tw\\:\\@max-\\[7rem\\]\\/search\\:hidden{display:none}.tw\\:\\@max-\\[7rem\\]\\/search\\:ps-3{padding-inline-start:calc(calc(var(--spacing)) * 3)}}@container search not (min-width:4rem){.tw\\:\\@max-\\[4rem\\]\\/search\\:hidden{display:none}.tw\\:\\@max-\\[4rem\\]\\/search\\:pe-3{padding-inline-end:calc(calc(var(--spacing)) * 3)}}@container search not (min-width:3rem){.tw\\:\\@max-\\[3rem\\]\\/search\\:ps-0{padding-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:\\@max-\\[3rem\\]\\/search\\:pe-0{padding-inline-end:calc(calc(var(--spacing)) * 0)}}@container (min-width:24rem){.tw\\:\\@sm\\:basis-auto{flex-basis:auto}}.tw\\:ltr\\:left-2:where(:dir(ltr),[dir=ltr],[dir=ltr] *){left:calc(calc(var(--spacing)) * 2)}.tw\\:ltr\\:-translate-x-1\\/2:where(:dir(ltr),[dir=ltr],[dir=ltr] *){--tw-translate-x:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:right-2:where(:dir(rtl),[dir=rtl],[dir=rtl] *){right:calc(calc(var(--spacing)) * 2)}.tw\\:rtl\\:flex:where(:dir(rtl),[dir=rtl],[dir=rtl] *){display:flex}.tw\\:rtl\\:-translate-x-px:where(:dir(rtl),[dir=rtl],[dir=rtl] *){--tw-translate-x:-1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:translate-x-1\\/2:where(:dir(rtl),[dir=rtl],[dir=rtl] *){--tw-translate-x:calc(1 / 2 * 100%);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:translate-x-px:where(:dir(rtl),[dir=rtl],[dir=rtl] *){--tw-translate-x:1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:after\\:translate-x-1\\/2:where(:dir(rtl),[dir=rtl],[dir=rtl] *):after{content:var(--tw-content);--tw-translate-x:calc(1 / 2 * 100%);translate:var(--tw-translate-x) var(--tw-translate-y)}:where([data-side=primary]) .tw\\:rtl\\:in-data-\\[side\\=primary\\]\\:cursor-e-resize:where(:dir(rtl),[dir=rtl],[dir=rtl] *){cursor:e-resize}:where([data-side=secondary]) .tw\\:rtl\\:in-data-\\[side\\=secondary\\]\\:cursor-w-resize:where(:dir(rtl),[dir=rtl],[dir=rtl] *){cursor:w-resize}.tw\\:rtl\\:aria-\\[orientation\\=horizontal\\]\\:after\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *)[aria-orientation=horizontal]:after{content:var(--tw-content);--tw-translate-x:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:data-\\[side\\=left\\]\\:translate-x-1:where(:dir(rtl),[dir=rtl],[dir=rtl] *)[data-side=left]{--tw-translate-x:calc(calc(var(--spacing)) * 1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:data-\\[side\\=right\\]\\:-translate-x-1:where(:dir(rtl),[dir=rtl],[dir=rtl] *)[data-side=right]{--tw-translate-x:calc(calc(var(--spacing)) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:dark\\:border-input:is(.dark *){border-color:var(--input)}.tw\\:dark\\:bg-destructive\\/20:is(.dark *){background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:bg-destructive\\/20:is(.dark *){background-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:dark\\:bg-input\\/30:is(.dark *){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:bg-input\\/30:is(.dark *){background-color:color-mix(in oklab, var(--input) 30%, transparent)}}.tw\\:dark\\:bg-transparent:is(.dark *){background-color:#0000}.tw\\:dark\\:text-amber-400:is(.dark *){color:var(--tw-color-amber-400)}.tw\\:dark\\:text-muted-foreground:is(.dark *){color:var(--muted-foreground)}.tw\\:dark\\:text-rose-400:is(.dark *){color:var(--tw-color-rose-400)}.tw\\:dark\\:text-sky-400:is(.dark *){color:var(--tw-color-sky-400)}.tw\\:dark\\:text-teal-400:is(.dark *){color:var(--tw-color-teal-400)}.tw\\:dark\\:after\\:mix-blend-lighten:is(.dark *):after{content:var(--tw-content);mix-blend-mode:lighten}@media (hover:hover){.tw\\:dark\\:hover\\:bg-blue-500:is(.dark *):hover{background-color:var(--tw-color-blue-500)}.tw\\:dark\\:hover\\:bg-destructive\\/30:is(.dark *):hover{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:hover\\:bg-destructive\\/30:is(.dark *):hover{background-color:color-mix(in oklab, var(--destructive) 30%, transparent)}}.tw\\:dark\\:hover\\:bg-input\\/50:is(.dark *):hover{background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:hover\\:bg-input\\/50:is(.dark *):hover{background-color:color-mix(in oklab, var(--input) 50%, transparent)}}.tw\\:dark\\:hover\\:bg-muted\\/50:is(.dark *):hover{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:hover\\:bg-muted\\/50:is(.dark *):hover{background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:dark\\:hover\\:text-foreground:is(.dark *):hover{color:var(--foreground)}}.tw\\:dark\\:focus-visible\\:ring-destructive\\/40:is(.dark *):focus-visible{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:focus-visible\\:ring-destructive\\/40:is(.dark *):focus-visible{--tw-ring-color:color-mix(in oklab, var(--destructive) 40%, transparent)}}.tw\\:dark\\:disabled\\:bg-input\\/80:is(.dark *):disabled{background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:disabled\\:bg-input\\/80:is(.dark *):disabled{background-color:color-mix(in oklab, var(--input) 80%, transparent)}}.tw\\:dark\\:disabled\\:bg-transparent:is(.dark *):disabled{background-color:#0000}:where([data-slot=tooltip-content]) .tw\\:dark\\:in-data-\\[slot\\=tooltip-content\\]\\:bg-background\\/10:is(.dark *){background-color:var(--background)}@supports (color:color-mix(in lab, red, red)){:where([data-slot=tooltip-content]) .tw\\:dark\\:in-data-\\[slot\\=tooltip-content\\]\\:bg-background\\/10:is(.dark *){background-color:color-mix(in oklab, var(--background) 10%, transparent)}}.tw\\:dark\\:has-disabled\\:bg-input\\/80:is(.dark *):has(:disabled){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:has-disabled\\:bg-input\\/80:is(.dark *):has(:disabled){background-color:color-mix(in oklab, var(--input) 80%, transparent)}}.tw\\:dark\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-destructive\\/40:is(.dark *):has([data-slot][aria-invalid=true]){--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-destructive\\/40:is(.dark *):has([data-slot][aria-invalid=true]){--tw-ring-color:color-mix(in oklab, var(--destructive) 40%, transparent)}}.tw\\:dark\\:aria-invalid\\:border-destructive\\/50:is(.dark *)[aria-invalid=true]{border-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:aria-invalid\\:border-destructive\\/50:is(.dark *)[aria-invalid=true]{border-color:color-mix(in oklab, var(--destructive) 50%, transparent)}}.tw\\:dark\\:aria-invalid\\:ring-destructive\\/40:is(.dark *)[aria-invalid=true]{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:aria-invalid\\:ring-destructive\\/40:is(.dark *)[aria-invalid=true]{--tw-ring-color:color-mix(in oklab, var(--destructive) 40%, transparent)}}.tw\\:dark\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-destructive\\/20:is(.dark *)[data-variant=destructive]:focus{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-destructive\\/20:is(.dark *)[data-variant=destructive]:focus{background-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:data-open\\:animate-in:where([data-state=open]),.tw\\:data-open\\:animate-in:where([data-open]:not([data-open=false])){animation:enter var(--tw-animation-duration,var(--tw-duration,.15s))var(--tw-ease,ease)var(--tw-animation-delay,0s)var(--tw-animation-iteration-count,1)var(--tw-animation-direction,normal)var(--tw-animation-fill-mode,none)}.tw\\:data-open\\:bg-accent:where([data-state=open]),.tw\\:data-open\\:bg-accent:where([data-open]:not([data-open=false])){background-color:var(--accent)}.tw\\:data-open\\:text-accent-foreground:where([data-state=open]),.tw\\:data-open\\:text-accent-foreground:where([data-open]:not([data-open=false])){color:var(--accent-foreground)}.tw\\:data-open\\:fade-in-0:where([data-state=open]),.tw\\:data-open\\:fade-in-0:where([data-open]:not([data-open=false])){--tw-enter-opacity:0}.tw\\:data-open\\:zoom-in-95:where([data-state=open]),.tw\\:data-open\\:zoom-in-95:where([data-open]:not([data-open=false])){--tw-enter-scale:.95}@media (hover:hover){:is(.tw\\:data-open\\:hover\\:bg-sidebar-accent:where([data-state=open]),.tw\\:data-open\\:hover\\:bg-sidebar-accent:where([data-open]:not([data-open=false]))):hover{background-color:var(--sidebar-accent)}:is(.tw\\:data-open\\:hover\\:text-sidebar-accent-foreground:where([data-state=open]),.tw\\:data-open\\:hover\\:text-sidebar-accent-foreground:where([data-open]:not([data-open=false]))):hover{color:var(--sidebar-accent-foreground)}}.tw\\:data-closed\\:animate-out:where([data-state=closed]),.tw\\:data-closed\\:animate-out:where([data-closed]:not([data-closed=false])){animation:exit var(--tw-animation-duration,var(--tw-duration,.15s))var(--tw-ease,ease)var(--tw-animation-delay,0s)var(--tw-animation-iteration-count,1)var(--tw-animation-direction,normal)var(--tw-animation-fill-mode,none)}.tw\\:data-closed\\:fade-out-0:where([data-state=closed]),.tw\\:data-closed\\:fade-out-0:where([data-closed]:not([data-closed=false])){--tw-exit-opacity:0}.tw\\:data-closed\\:zoom-out-95:where([data-state=closed]),.tw\\:data-closed\\:zoom-out-95:where([data-closed]:not([data-closed=false])){--tw-exit-scale:.95}.tw\\:data-checked\\:border-primary:where([data-state=checked]),.tw\\:data-checked\\:border-primary:where([data-checked]:not([data-checked=false])){border-color:var(--primary)}.tw\\:data-checked\\:bg-primary:where([data-state=checked]),.tw\\:data-checked\\:bg-primary:where([data-checked]:not([data-checked=false])){background-color:var(--primary)}.tw\\:data-checked\\:text-primary-foreground:where([data-state=checked]),.tw\\:data-checked\\:text-primary-foreground:where([data-checked]:not([data-checked=false])){color:var(--primary-foreground)}.tw\\:group-data-\\[size\\=default\\]\\/switch\\:data-checked\\:translate-x-\\[calc\\(100\\%-2px\\)\\]:is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-state=checked]),.tw\\:group-data-\\[size\\=default\\]\\/switch\\:data-checked\\:translate-x-\\[calc\\(100\\%-2px\\)\\]:is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-checked]:not([data-checked=false])),.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:data-checked\\:translate-x-\\[calc\\(100\\%-2px\\)\\]:is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-state=checked]),.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:data-checked\\:translate-x-\\[calc\\(100\\%-2px\\)\\]:is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-checked]:not([data-checked=false])){--tw-translate-x:calc(100% - 2px);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:group-data-\\[size\\=default\\]\\/switch\\:data-checked\\:-translate-x-\\[calc\\(100\\%-2px\\)\\]:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-state=checked]),.tw\\:rtl\\:group-data-\\[size\\=default\\]\\/switch\\:data-checked\\:-translate-x-\\[calc\\(100\\%-2px\\)\\]:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-checked]:not([data-checked=false])),.tw\\:rtl\\:group-data-\\[size\\=sm\\]\\/switch\\:data-checked\\:-translate-x-\\[calc\\(100\\%-2px\\)\\]:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-state=checked]),.tw\\:rtl\\:group-data-\\[size\\=sm\\]\\/switch\\:data-checked\\:-translate-x-\\[calc\\(100\\%-2px\\)\\]:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-checked]:not([data-checked=false])){--tw-translate-x:calc(calc(100% - 2px) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:dark\\:data-checked\\:bg-primary:is(.dark *):where([data-state=checked]),.tw\\:dark\\:data-checked\\:bg-primary:is(.dark *):where([data-checked]:not([data-checked=false])){background-color:var(--primary)}.tw\\:dark\\:data-checked\\:bg-primary-foreground:is(.dark *):where([data-state=checked]),.tw\\:dark\\:data-checked\\:bg-primary-foreground:is(.dark *):where([data-checked]:not([data-checked=false])){background-color:var(--primary-foreground)}.tw\\:data-unchecked\\:bg-input:where([data-state=unchecked]),.tw\\:data-unchecked\\:bg-input:where([data-unchecked]:not([data-unchecked=false])){background-color:var(--input)}.tw\\:group-data-\\[size\\=default\\]\\/switch\\:data-unchecked\\:translate-x-0:is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-state=unchecked]),.tw\\:group-data-\\[size\\=default\\]\\/switch\\:data-unchecked\\:translate-x-0:is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-unchecked]:not([data-unchecked=false])),.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:data-unchecked\\:translate-x-0:is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-state=unchecked]),.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:data-unchecked\\:translate-x-0:is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-unchecked]:not([data-unchecked=false])),.tw\\:rtl\\:group-data-\\[size\\=default\\]\\/switch\\:data-unchecked\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-state=unchecked]),.tw\\:rtl\\:group-data-\\[size\\=default\\]\\/switch\\:data-unchecked\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-unchecked]:not([data-unchecked=false])),.tw\\:rtl\\:group-data-\\[size\\=sm\\]\\/switch\\:data-unchecked\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-state=unchecked]),.tw\\:rtl\\:group-data-\\[size\\=sm\\]\\/switch\\:data-unchecked\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-unchecked]:not([data-unchecked=false])){--tw-translate-x:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:dark\\:data-unchecked\\:bg-foreground:is(.dark *):where([data-state=unchecked]),.tw\\:dark\\:data-unchecked\\:bg-foreground:is(.dark *):where([data-unchecked]:not([data-unchecked=false])){background-color:var(--foreground)}.tw\\:dark\\:data-unchecked\\:bg-input\\/80:is(.dark *):where([data-state=unchecked]),.tw\\:dark\\:data-unchecked\\:bg-input\\/80:is(.dark *):where([data-unchecked]:not([data-unchecked=false])){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:data-unchecked\\:bg-input\\/80:is(.dark *):where([data-state=unchecked]),.tw\\:dark\\:data-unchecked\\:bg-input\\/80:is(.dark *):where([data-unchecked]:not([data-unchecked=false])){background-color:color-mix(in oklab, var(--input) 80%, transparent)}}.tw\\:data-selected\\:bg-muted:where([data-selected=true]),.tw\\:data-selected\\:bg-muted\\/50:where([data-selected=true]){background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:data-selected\\:bg-muted\\/50:where([data-selected=true]){background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:data-selected\\:bg-primary:where([data-selected=true]){background-color:var(--primary)}.tw\\:data-selected\\:bg-transparent:where([data-selected=true]){background-color:#0000}.tw\\:data-selected\\:text-foreground:where([data-selected=true]){color:var(--foreground)}.tw\\:data-selected\\:text-inherit:where([data-selected=true]){color:inherit}.tw\\:data-selected\\:text-muted-foreground\\/50:where([data-selected=true]){color:var(--muted-foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:data-selected\\:text-muted-foreground\\/50:where([data-selected=true]){color:color-mix(in oklab, var(--muted-foreground) 50%, transparent)}}.tw\\:data-selected\\:text-primary-foreground:where([data-selected=true]){color:var(--primary-foreground)}.tw\\:data-selected\\:ring-2:where([data-selected=true]){--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:data-selected\\:ring-primary-foreground\\/70:where([data-selected=true]){--tw-ring-color:var(--primary-foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:data-selected\\:ring-primary-foreground\\/70:where([data-selected=true]){--tw-ring-color:color-mix(in oklab, var(--primary-foreground) 70%, transparent)}}.tw\\:data-selected\\:ring-ring\\/50:where([data-selected=true]){--tw-ring-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.tw\\:data-selected\\:ring-ring\\/50:where([data-selected=true]){--tw-ring-color:color-mix(in oklab, var(--ring) 50%, transparent)}}.tw\\:data-selected\\:ring-inset:where([data-selected=true]){--tw-ring-inset:inset}@media (forced-colors:active){.tw\\:forced-colors\\:data-selected\\:outline-2:where([data-selected=true]){outline-style:var(--tw-outline-style);outline-width:2px}.tw\\:forced-colors\\:data-selected\\:-outline-offset-2:where([data-selected=true]){outline-offset:calc(2px * -1)}.tw\\:forced-colors\\:data-selected\\:outline-\\[color\\:Highlight\\]:where([data-selected=true]){outline-color:highlight}}.tw\\:data-disabled\\:pointer-events-none:where([data-disabled=true]),.tw\\:data-disabled\\:pointer-events-none:where([data-disabled]:not([data-disabled=false])){pointer-events:none}.tw\\:data-disabled\\:cursor-not-allowed:where([data-disabled=true]),.tw\\:data-disabled\\:cursor-not-allowed:where([data-disabled]:not([data-disabled=false])){cursor:not-allowed}.tw\\:data-disabled\\:opacity-50:where([data-disabled=true]),.tw\\:data-disabled\\:opacity-50:where([data-disabled]:not([data-disabled=false])){opacity:.5}.tw\\:data-active\\:bg-background:where([data-state=active]),.tw\\:data-active\\:bg-background:where([data-active]:not([data-active=false])){background-color:var(--background)}.tw\\:data-active\\:bg-sidebar-accent:where([data-state=active]),.tw\\:data-active\\:bg-sidebar-accent:where([data-active]:not([data-active=false])){background-color:var(--sidebar-accent)}.tw\\:data-active\\:font-medium:where([data-state=active]),.tw\\:data-active\\:font-medium:where([data-active]:not([data-active=false])){--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}.tw\\:data-active\\:text-foreground:where([data-state=active]),.tw\\:data-active\\:text-foreground:where([data-active]:not([data-active=false])){color:var(--foreground)}.tw\\:data-active\\:text-sidebar-accent-foreground:where([data-state=active]),.tw\\:data-active\\:text-sidebar-accent-foreground:where([data-active]:not([data-active=false])){color:var(--sidebar-accent-foreground)}.tw\\:group-data-\\[variant\\=default\\]\\/tabs-list\\:data-active\\:shadow-sm:is(:where(.tw\\:group\\/tabs-list)[data-variant=default] *):where([data-state=active]),.tw\\:group-data-\\[variant\\=default\\]\\/tabs-list\\:data-active\\:shadow-sm:is(:where(.tw\\:group\\/tabs-list)[data-variant=default] *):where([data-active]:not([data-active=false])){--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:bg-transparent:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:bg-transparent:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false])){background-color:#0000}.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:shadow-none:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:shadow-none:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false])){--tw-shadow:0 0 #0000;box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}:is(.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:after\\:opacity-100:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:after\\:opacity-100:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false]))):after{content:var(--tw-content);opacity:1}.tw\\:dark\\:data-active\\:border-input:is(.dark *):where([data-state=active]),.tw\\:dark\\:data-active\\:border-input:is(.dark *):where([data-active]:not([data-active=false])){border-color:var(--input)}.tw\\:dark\\:data-active\\:bg-input\\/30:is(.dark *):where([data-state=active]),.tw\\:dark\\:data-active\\:bg-input\\/30:is(.dark *):where([data-active]:not([data-active=false])){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:data-active\\:bg-input\\/30:is(.dark *):where([data-state=active]),.tw\\:dark\\:data-active\\:bg-input\\/30:is(.dark *):where([data-active]:not([data-active=false])){background-color:color-mix(in oklab, var(--input) 30%, transparent)}}.tw\\:dark\\:data-active\\:text-foreground:is(.dark *):where([data-state=active]),.tw\\:dark\\:data-active\\:text-foreground:is(.dark *):where([data-active]:not([data-active=false])){color:var(--foreground)}.tw\\:dark\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:border-transparent:is(.dark *):is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:dark\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:border-transparent:is(.dark *):is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false])){border-color:#0000}.tw\\:dark\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:bg-transparent:is(.dark *):is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:dark\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:bg-transparent:is(.dark *):is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false])){background-color:#0000}.tw\\:data-horizontal\\:mx-px:where([data-orientation=horizontal]){margin-inline:1px}.tw\\:data-horizontal\\:h-1:where([data-orientation=horizontal]){height:calc(calc(var(--spacing)) * 1)}.tw\\:data-horizontal\\:h-full:where([data-orientation=horizontal]){height:100%}.tw\\:data-horizontal\\:h-px:where([data-orientation=horizontal]){height:1px}.tw\\:data-horizontal\\:w-auto:where([data-orientation=horizontal]){width:auto}.tw\\:data-horizontal\\:w-full:where([data-orientation=horizontal]){width:100%}.tw\\:data-horizontal\\:flex-col:where([data-orientation=horizontal]){flex-direction:column}.tw\\:data-vertical\\:my-px:where([data-orientation=vertical]){margin-block:1px}.tw\\:data-vertical\\:h-auto:where([data-orientation=vertical]){height:auto}.tw\\:data-vertical\\:h-full:where([data-orientation=vertical]){height:100%}.tw\\:data-vertical\\:min-h-40:where([data-orientation=vertical]){min-height:calc(calc(var(--spacing)) * 40)}.tw\\:data-vertical\\:w-1:where([data-orientation=vertical]){width:calc(calc(var(--spacing)) * 1)}.tw\\:data-vertical\\:w-auto:where([data-orientation=vertical]){width:auto}.tw\\:data-vertical\\:w-full:where([data-orientation=vertical]){width:100%}.tw\\:data-vertical\\:w-px:where([data-orientation=vertical]){width:1px}.tw\\:data-vertical\\:flex-col:where([data-orientation=vertical]){flex-direction:column}.tw\\:data-vertical\\:items-stretch:where([data-orientation=vertical]){align-items:stretch}.tw\\:data-vertical\\:self-stretch:where([data-orientation=vertical]){align-self:stretch}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:mt-0 [data-lexical-editor=true]>blockquote{margin-top:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:border-s-0 [data-lexical-editor=true]>blockquote{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:ps-0 [data-lexical-editor=true]>blockquote{padding-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:font-normal [data-lexical-editor=true]>blockquote{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:text-foreground [data-lexical-editor=true]>blockquote{color:var(--foreground)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:not-italic [data-lexical-editor=true]>blockquote{font-style:normal}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:mt-0 [data-lexical-editor=\\"true\\"]>blockquote{margin-top:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:border-s-0 [data-lexical-editor=\\"true\\"]>blockquote{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:ps-0 [data-lexical-editor=\\"true\\"]>blockquote{padding-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:font-normal [data-lexical-editor=\\"true\\"]>blockquote{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:text-foreground [data-lexical-editor=\\"true\\"]>blockquote{color:var(--foreground)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:not-italic [data-lexical-editor=\\"true\\"]>blockquote{font-style:normal}.tw\\:\\[\\&_a\\]\\:underline a{text-decoration-line:underline}.tw\\:\\[\\&_a\\]\\:underline-offset-3 a{text-underline-offset:3px}@media (hover:hover){.tw\\:\\[\\&_a\\]\\:hover\\:text-foreground a:hover{color:var(--foreground)}}.tw\\:\\[\\&_p\\]\\:my-0 p{margin-block:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_p\\:not\\(\\:last-child\\)\\]\\:mb-4 p:not(:last-child){margin-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&_s\\]\\:text-destructive s{color:var(--destructive)}.tw\\:\\[\\&_s\\]\\:line-through s{text-decoration-line:line-through}.tw\\:\\[\\&_svg\\]\\:pointer-events-none svg{pointer-events:none}.tw\\:\\[\\&_svg\\]\\:size-4 svg{width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&_svg\\]\\:shrink-0 svg{flex-shrink:0}.tw\\:\\[\\&_svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-3 svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:\\[\\&_svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-3\\.5 svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 3.5);height:calc(calc(var(--spacing)) * 3.5)}.tw\\:\\[\\&_svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-4 svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&_tr\\]\\:border-b tr{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}.tw\\:\\[\\&_tr\\:last-child\\]\\:border-0 tr:last-child{border-style:var(--tw-border-style);border-width:0}.tw\\:\\[\\&_u\\]\\:font-semibold u{--tw-font-weight:var(--tw-font-weight-semibold);font-weight:var(--tw-font-weight-semibold)}.tw\\:\\[\\&_u\\]\\:text-success-foreground u{color:var(--success-foreground)}.tw\\:\\[\\&_u\\]\\:no-underline u{text-decoration-line:none}.tw\\:\\[\\&\\:has\\(\\[role\\=checkbox\\]\\)\\]\\:pe-0:has([role=checkbox]){padding-inline-end:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\.border-b\\]\\:pb-2.border-b{padding-bottom:calc(calc(var(--spacing)) * 2)}.tw\\:\\[\\.border-b\\]\\:pb-4.border-b{padding-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[size\\=sm\\]\\/card\\:\\[\\.border-b\\]\\:pb-3:is(:where(.tw\\:group\\/card)[data-size=sm] *).border-b{padding-bottom:calc(calc(var(--spacing)) * 3)}.tw\\:\\[\\.border-t\\]\\:pt-2.border-t{padding-top:calc(calc(var(--spacing)) * 2)}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:px-2 *)[cmdk-group-heading]{padding-inline:calc(calc(var(--spacing)) * 2)}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:py-1\\.5 *)[cmdk-group-heading]{padding-block:calc(calc(var(--spacing)) * 1.5)}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:text-xs *)[cmdk-group-heading]{font-size:var(--tw-text-xs);line-height:var(--tw-leading,var(--tw-text-xs--line-height))}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:font-medium *)[cmdk-group-heading]{--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:text-muted-foreground *)[cmdk-group-heading]{color:var(--muted-foreground)}:is(.tw\\:\\*\\:\\[a\\]\\:underline>*):is(a){text-decoration-line:underline}:is(.tw\\:\\*\\:\\[a\\]\\:underline-offset-3>*):is(a){text-underline-offset:3px}@media (hover:hover){.tw\\:\\[a\\]\\:hover\\:bg-destructive\\/20:is(a):hover{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:\\[a\\]\\:hover\\:bg-destructive\\/20:is(a):hover{background-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:\\[a\\]\\:hover\\:bg-muted:is(a):hover{background-color:var(--muted)}.tw\\:\\[a\\]\\:hover\\:bg-primary\\/80:is(a):hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:\\[a\\]\\:hover\\:bg-primary\\/80:is(a):hover{background-color:color-mix(in oklab, var(--primary) 80%, transparent)}}.tw\\:\\[a\\]\\:hover\\:bg-secondary\\/80:is(a):hover{background-color:var(--secondary)}@supports (color:color-mix(in lab, red, red)){.tw\\:\\[a\\]\\:hover\\:bg-secondary\\/80:is(a):hover{background-color:color-mix(in oklab, var(--secondary) 80%, transparent)}}.tw\\:\\[a\\]\\:hover\\:text-muted-foreground:is(a):hover{color:var(--muted-foreground)}:is(.tw\\:\\*\\:\\[a\\]\\:hover\\:text-foreground>*):is(a):hover{color:var(--foreground)}}:is(.tw\\:\\*\\:\\[img\\]\\:row-span-2>*):is(img){grid-row:span 2/span 2}:is(.tw\\:\\*\\:\\[img\\]\\:translate-y-0\\.5>*):is(img){--tw-translate-y:calc(calc(var(--spacing)) * .5);translate:var(--tw-translate-x) var(--tw-translate-y)}:is(.tw\\:\\*\\:\\[img\\]\\:text-current>*):is(img){color:currentColor}:is(.tw\\:\\*\\:\\[img\\:first-child\\]\\:rounded-t-xl>*):is(img:first-child){border-top-left-radius:calc(var(--radius) * 1.4);border-top-right-radius:calc(var(--radius) * 1.4)}:is(.tw\\:\\*\\:\\[img\\:last-child\\]\\:rounded-b-xl>*):is(img:last-child){border-bottom-right-radius:calc(var(--radius) * 1.4);border-bottom-left-radius:calc(var(--radius) * 1.4)}:is(.tw\\:\\*\\:\\[img\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-4>*):is(img:not([class*=size-])){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}:is(.tw\\:\\*\\:\\[span\\]\\:last\\:flex>*):is(span):last-child{display:flex}:is(.tw\\:\\*\\:\\[span\\]\\:last\\:items-center>*):is(span):last-child{align-items:center}:is(.tw\\:\\*\\:\\[span\\]\\:last\\:gap-2>*):is(span):last-child{gap:calc(calc(var(--spacing)) * 2)}:is(.tw\\:\\*\\:\\[svg\\]\\:row-span-2>*):is(svg){grid-row:span 2/span 2}:is(.tw\\:\\*\\:\\[svg\\]\\:translate-y-0\\.5>*):is(svg){--tw-translate-y:calc(calc(var(--spacing)) * .5);translate:var(--tw-translate-x) var(--tw-translate-y)}:is(.tw\\:\\*\\:\\[svg\\]\\:text-current>*):is(svg){color:currentColor}:is(.tw\\:focus\\:\\*\\:\\[svg\\]\\:text-accent-foreground:focus>*):is(svg){color:var(--accent-foreground)}:is(.tw\\:data-\\[variant\\=destructive\\]\\:\\*\\:\\[svg\\]\\:text-destructive[data-variant=destructive]>*):is(svg){color:var(--destructive)}:is(.tw\\:data-\\[variant\\=destructive\\]\\:\\*\\:\\[svg\\]\\:text-destructive\\![data-variant=destructive]>*):is(svg){color:var(--destructive)!important}:is(.tw\\:data-selected\\:\\*\\:\\[svg\\]\\:text-foreground:where([data-selected=true])>*):is(svg){color:var(--foreground)}:is(.tw\\:\\*\\:\\[svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-4>*):is(svg:not([class*=size-])){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:rounded-s-none>:not(:first-child){border-start-start-radius:0;border-end-start-radius:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:rounded-t-none>:not(:first-child){border-top-left-radius:0;border-top-right-radius:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:border-s-0>:not(:first-child){border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:border-t-0>:not(:first-child){border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:last-child\\)\\]\\:rounded-e-none>:not(:last-child){border-start-end-radius:0;border-end-end-radius:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:last-child\\)\\]\\:rounded-b-none>:not(:last-child){border-bottom-right-radius:0;border-bottom-left-radius:0}.tw\\:has-\\[select\\[aria-hidden\\=true\\]\\:last-child\\]\\:\\[\\&\\>\\[data-slot\\=select-trigger\\]\\:last-of-type\\]\\:rounded-e-lg:has(:is(select[aria-hidden=true]:last-child))>[data-slot=select-trigger]:last-of-type{border-start-end-radius:var(--radius);border-end-end-radius:var(--radius)}.tw\\:\\[\\&\\>\\[data-slot\\=select-trigger\\]\\:not\\(\\[class\\*\\=w-\\]\\)\\]\\:w-fit>[data-slot=select-trigger]:not([class*=w-]){width:fit-content}.tw\\:\\[\\&\\>\\[data-slot\\]\\:not\\(\\:has\\(\\~\\[data-slot\\]\\)\\)\\]\\:rounded-e-lg\\!>[data-slot]:not(:has(~[data-slot])){border-start-end-radius:var(--radius)!important;border-end-end-radius:var(--radius)!important}.tw\\:\\[\\&\\>\\[data-slot\\]\\:not\\(\\:has\\(\\~\\[data-slot\\]\\)\\)\\]\\:rounded-b-lg\\!>[data-slot]:not(:has(~[data-slot])){border-bottom-right-radius:var(--radius)!important;border-bottom-left-radius:var(--radius)!important}.tw\\:\\[\\&\\>a\\]\\:underline>a{text-decoration-line:underline}.tw\\:\\[\\&\\>a\\]\\:underline-offset-4>a{text-underline-offset:4px}.tw\\:\\[\\&\\>a\\:hover\\]\\:text-primary>a:hover{color:var(--primary)}.tw\\:\\[\\&\\>blockquote\\]\\:my-0>blockquote{margin-block:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&\\>blockquote\\]\\:border-s-0>blockquote{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&\\>blockquote\\]\\:p-0>blockquote{padding:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&\\>blockquote\\]\\:ps-0>blockquote{padding-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&\\>blockquote\\]\\:font-normal>blockquote{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:\\[\\&\\>blockquote\\]\\:text-foreground>blockquote{color:var(--foreground)}.tw\\:\\[\\&\\>blockquote\\]\\:not-italic>blockquote{font-style:normal}.tw\\:\\[\\&\\>input\\]\\:flex-1>input{flex:1}.tw\\:has-\\[\\>\\[data-align\\=block-end\\]\\]\\:\\[\\&\\>input\\]\\:pt-3:has(>[data-align=block-end])>input{padding-top:calc(calc(var(--spacing)) * 3)}.tw\\:has-\\[\\>\\[data-align\\=block-start\\]\\]\\:\\[\\&\\>input\\]\\:pb-3:has(>[data-align=block-start])>input{padding-bottom:calc(calc(var(--spacing)) * 3)}.tw\\:has-\\[\\>\\[data-align\\=inline-end\\]\\]\\:\\[\\&\\>input\\]\\:pe-1\\.5:has(>[data-align=inline-end])>input{padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-\\[\\>\\[data-align\\=inline-start\\]\\]\\:\\[\\&\\>input\\]\\:ps-1\\.5:has(>[data-align=inline-start])>input{padding-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:\\[\\&\\>kbd\\]\\:rounded-\\[calc\\(var\\(--radius\\)-5px\\)\\]>kbd{border-radius:calc(var(--radius) - 5px)}.tw\\:\\[\\&\\>li\\]\\:mt-2>li{margin-top:calc(calc(var(--spacing)) * 2)}.tw\\:\\[\\&\\>span\\:last-child\\]\\:truncate>span:last-child{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.tw\\:\\[\\&\\>svg\\]\\:pointer-events-none>svg{pointer-events:none}.tw\\:\\[\\&\\>svg\\]\\:hidden>svg{display:none}.tw\\:\\[\\&\\>svg\\]\\:size-3\\!>svg{width:calc(calc(var(--spacing)) * 3)!important;height:calc(calc(var(--spacing)) * 3)!important}.tw\\:\\[\\&\\>svg\\]\\:size-3\\.5>svg{width:calc(calc(var(--spacing)) * 3.5);height:calc(calc(var(--spacing)) * 3.5)}.tw\\:\\[\\&\\>svg\\]\\:size-4>svg{width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&\\>svg\\]\\:shrink-0>svg{flex-shrink:0}.tw\\:\\[\\&\\>svg\\]\\:text-sidebar-accent-foreground>svg{color:var(--sidebar-accent-foreground)}.tw\\:group-has-data-\\[size\\=lg\\]\\/avatar-group\\:\\[\\&\\>svg\\]\\:size-5:is(:where(.tw\\:group\\/avatar-group):has([data-size=lg]) *)>svg{width:calc(calc(var(--spacing)) * 5);height:calc(calc(var(--spacing)) * 5)}.tw\\:group-has-data-\\[size\\=sm\\]\\/avatar-group\\:\\[\\&\\>svg\\]\\:size-3:is(:where(.tw\\:group\\/avatar-group):has([data-size=sm]) *)>svg{width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[size\\=default\\]\\/avatar\\:\\[\\&\\>svg\\]\\:size-2:is(:where(.tw\\:group\\/avatar)[data-size=default] *)>svg,.tw\\:group-data-\\[size\\=lg\\]\\/avatar\\:\\[\\&\\>svg\\]\\:size-2:is(:where(.tw\\:group\\/avatar)[data-size=lg] *)>svg{width:calc(calc(var(--spacing)) * 2);height:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[size\\=sm\\]\\/avatar\\:\\[\\&\\>svg\\]\\:hidden:is(:where(.tw\\:group\\/avatar)[data-size=sm] *)>svg,.tw\\:\\[\\&\\>svg\\:last-child\\]\\:hidden>svg:last-child{display:none}.tw\\:\\[\\&\\>svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-3\\.5>svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 3.5);height:calc(calc(var(--spacing)) * 3.5)}.tw\\:\\[\\&\\>svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-4>svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&\\>tr\\]\\:last\\:border-b-0>tr:last-child{border-bottom-style:var(--tw-border-style);border-bottom-width:0}.tw\\:\\[\\&\\[align\\=center\\]\\]\\:text-center[align=center]{text-align:center}.tw\\:\\[\\&\\[align\\=right\\]\\]\\:text-right[align=right]{text-align:right}.tw\\:\\[\\&\\[aria-orientation\\=horizontal\\]\\>div\\]\\:rotate-90[aria-orientation=horizontal]>div{rotate:90deg}[data-side=primary][data-collapsible=offcanvas] .tw\\:\\[\\[data-side\\=primary\\]\\[data-collapsible\\=offcanvas\\]_\\&\\]\\:-end-2{inset-inline-end:calc(calc(var(--spacing)) * -2)}[data-side=primary][data-state=collapsed] .tw\\:\\[\\[data-side\\=primary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-e-resize{cursor:e-resize}[data-side=primary][data-state=collapsed] .tw\\:rtl\\:\\[\\[data-side\\=primary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-w-resize:where(:dir(rtl),[dir=rtl],[dir=rtl] *){cursor:w-resize}[data-side=secondary][data-collapsible=offcanvas] .tw\\:\\[\\[data-side\\=secondary\\]\\[data-collapsible\\=offcanvas\\]_\\&\\]\\:-start-2{inset-inline-start:calc(calc(var(--spacing)) * -2)}[data-side=secondary][data-state=collapsed] .tw\\:\\[\\[data-side\\=secondary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-w-resize{cursor:w-resize}[data-side=secondary][data-state=collapsed] .tw\\:rtl\\:\\[\\[data-side\\=secondary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-e-resize:where(:dir(rtl),[dir=rtl],[dir=rtl] *){cursor:e-resize}}@property --tw-animation-delay{syntax:"*";inherits:false;initial-value:0s}@property --tw-animation-direction{syntax:"*";inherits:false;initial-value:normal}@property --tw-animation-duration{syntax:"*";inherits:false}@property --tw-animation-fill-mode{syntax:"*";inherits:false;initial-value:none}@property --tw-animation-iteration-count{syntax:"*";inherits:false;initial-value:1}@property --tw-enter-blur{syntax:"*";inherits:false;initial-value:0}@property --tw-enter-opacity{syntax:"*";inherits:false;initial-value:1}@property --tw-enter-rotate{syntax:"*";inherits:false;initial-value:0}@property --tw-enter-scale{syntax:"*";inherits:false;initial-value:1}@property --tw-enter-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-enter-translate-y{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-blur{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-opacity{syntax:"*";inherits:false;initial-value:1}@property --tw-exit-rotate{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-scale{syntax:"*";inherits:false;initial-value:1}@property --tw-exit-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-translate-y{syntax:"*";inherits:false;initial-value:0}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-cyrillic-ext-wght-normal.woff2)format("woff2-variations");unicode-range:U+460-52F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-cyrillic-wght-normal.woff2)format("woff2-variations");unicode-range:U+301,U+400-45F,U+490-491,U+4B0-4B1,U+2116}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-greek-wght-normal.woff2)format("woff2-variations");unicode-range:U+370-377,U+37A-37F,U+384-38A,U+38C,U+38E-3A1,U+3A3-3FF}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-vietnamese-wght-normal.woff2)format("woff2-variations");unicode-range:U+102-103,U+110-111,U+128-129,U+168-169,U+1A0-1A1,U+1AF-1B0,U+300-301,U+303-304,U+308-309,U+323,U+329,U+1EA0-1EF9,U+20AB}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-latin-ext-wght-normal.woff2)format("woff2-variations");unicode-range:U+100-2BA,U+2BD-2C5,U+2C7-2CC,U+2CE-2D7,U+2DD-2FF,U+304,U+308,U+329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-latin-wght-normal.woff2)format("woff2-variations");unicode-range:U+??,U+131,U+152-153,U+2BB-2BC,U+2C6,U+2DA,U+2DC,U+304,U+308,U+329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}.light,:root{--radius:.625rem;--spacing:.25rem;--background:oklch(100% 0 0);--foreground:oklch(13.71% .036 258.53);--card:oklch(100% 0 0);--card-foreground:oklch(13.71% .036 258.53);--popover:oklch(98.43% .0018 248.56);--popover-foreground:oklch(13.71% .036 258.53);--primary:oklch(20.79% .0399 265.73);--primary-foreground:oklch(98.38% .0036 248.23);--secondary:oklch(95.89% .011 248.06);--secondary-foreground:oklch(20.79% .0399 265.73);--muted:oklch(95.89% .011 248.06);--muted-foreground:oklch(55.47% .0408 257.45);--accent:oklch(95.89% .011 248.06);--accent-foreground:oklch(20.79% .0399 265.73);--destructive:oklch(63.69% .2077 25.32);--destructive-foreground:oklch(98.38% .0036 248.23);--success-foreground:oklch(62.7% .194 149.214);--diff-deleted:oklch(57.7% .245 27.325);--warning:oklch(84% .16 84);--warning-foreground:oklch(28% .07 46);--border:oklch(92.9% .0127 255.58);--input:oklch(92.9% .0127 255.58);--ring:oklch(13.71% .036 258.53);--chart-1:oklch(64.6% .222 41.116);--chart-2:oklch(60% .118 184.704);--chart-3:oklch(39.8% .07 227.392);--chart-4:oklch(82.8% .189 84.429);--chart-5:oklch(76.9% .188 70.08);--sidebar:oklch(98.43% .0018 248.56);--sidebar-foreground:oklch(13.71% .036 258.53);--sidebar-primary:oklch(20.79% .0399 265.73);--sidebar-primary-foreground:oklch(98.38% .0036 248.23);--sidebar-accent:oklch(95.89% .011 248.06);--sidebar-accent-foreground:oklch(20.79% .0399 265.73);--sidebar-border:oklch(92.9% .0127 255.58);--sidebar-ring:oklch(13.71% .036 258.53)}.dark{--background:oklch(13.71% .036 258.53);--foreground:oklch(98.38% .0036 248.23);--card:oklch(13.71% .036 258.53);--card-foreground:oklch(98.38% .0036 248.23);--popover:oklch(13.71% .036 258.53);--popover-foreground:oklch(98.38% .0036 248.23);--primary:oklch(98.38% .0036 248.23);--primary-foreground:oklch(20.79% .0399 265.73);--secondary:oklch(28% .037 259.98);--secondary-foreground:oklch(98.38% .0036 248.23);--muted:oklch(28% .037 259.98);--muted-foreground:oklch(71.07% .0351 256.8);--accent:oklch(28% .037 259.98);--accent-foreground:oklch(98.38% .0036 248.23);--destructive:oklch(39.6% .1331 25.71);--destructive-foreground:oklch(98.38% .0036 248.23);--success-foreground:oklch(79.2% .209 151.711);--diff-deleted:oklch(70.4% .191 22.216);--warning:oklch(41% .11 46);--warning-foreground:oklch(99% .02 95);--border:oklch(44.54% .0374 257.3);--input:oklch(44.54% .0374 257.3);--ring:oklch(86.88% .0199 252.89);--chart-1:oklch(48.8% .243 264.376);--chart-2:oklch(69.6% .17 162.48);--chart-3:oklch(76.9% .188 70.08);--chart-4:oklch(62.7% .265 303.9);--chart-5:oklch(64.5% .246 16.439);--sidebar:oklch(13.71% .036 258.53);--sidebar-foreground:oklch(71.07% .0351 256.8);--sidebar-primary:oklch(98.38% .0036 248.23);--sidebar-primary-foreground:oklch(20.79% .0399 265.73);--sidebar-accent:oklch(28% .037 259.98);--sidebar-accent-foreground:oklch(71.07% .0351 256.8);--sidebar-border:oklch(28% .037 259.98);--sidebar-ring:oklch(86.88% .0199 252.89)}.paratext-light{--background:oklch(100% 0 0);--foreground:oklch(15.3% .006 107.1);--card:oklch(100% 0 0);--card-foreground:oklch(15.3% .006 107.1);--popover:oklch(100% 0 0);--popover-foreground:oklch(15.3% .006 107.1);--primary:oklch(55.5% .163 48.998);--primary-foreground:oklch(98.7% .022 95.277);--secondary:oklch(96.7% .001 286.375);--secondary-foreground:oklch(21% .006 285.885);--muted:oklch(96.6% .005 106.5);--muted-foreground:oklch(58% .031 107.3);--accent:oklch(96.6% .005 106.5);--accent-foreground:oklch(22.8% .013 107.4);--destructive:oklch(57.7% .245 27.325);--destructive-foreground:oklch(98.38% .0036 248.23);--success-foreground:oklch(62.7% .194 149.214);--diff-deleted:oklch(57.7% .245 27.325);--warning:oklch(84% .16 84);--warning-foreground:oklch(28% .07 46);--border:oklch(93% .007 106.5);--input:oklch(93% .007 106.5);--ring:oklch(73.7% .021 106.9);--chart-1:oklch(88% .011 106.6);--chart-2:oklch(58% .031 107.3);--chart-3:oklch(46.6% .025 107.3);--chart-4:oklch(39.4% .023 107.4);--chart-5:oklch(28.6% .016 107.4);--sidebar:oklch(98.8% .003 106.5);--sidebar-foreground:oklch(15.3% .006 107.1);--sidebar-primary:oklch(66.6% .179 58.318);--sidebar-primary-foreground:oklch(98.7% .022 95.277);--sidebar-accent:oklch(96.6% .005 106.5);--sidebar-accent-foreground:oklch(22.8% .013 107.4);--sidebar-border:oklch(93% .007 106.5);--sidebar-ring:oklch(73.7% .021 106.9)}.paratext-dark{--background:oklch(15.3% .006 107.1);--foreground:oklch(98.8% .003 106.5);--card:oklch(22.8% .013 107.4);--card-foreground:oklch(98.8% .003 106.5);--popover:oklch(22.8% .013 107.4);--popover-foreground:oklch(98.8% .003 106.5);--primary:oklch(47.3% .137 46.201);--primary-foreground:oklch(98.7% .022 95.277);--secondary:oklch(27.4% .006 286.033);--secondary-foreground:oklch(98.5% 0 0);--muted:oklch(28.6% .016 107.4);--muted-foreground:oklch(73.7% .021 106.9);--accent:oklch(28.6% .016 107.4);--accent-foreground:oklch(98.8% .003 106.5);--destructive:oklch(70.4% .191 22.216);--destructive-foreground:oklch(98.38% .0036 248.23);--success-foreground:oklch(79.2% .209 151.711);--diff-deleted:oklch(70.4% .191 22.216);--warning:oklch(41% .11 46);--warning-foreground:oklch(99% .02 95);--border:oklch(100% 0 0/.1);--input:oklch(100% 0 0/.15);--ring:oklch(58% .031 107.3);--chart-1:oklch(88% .011 106.6);--chart-2:oklch(58% .031 107.3);--chart-3:oklch(46.6% .025 107.3);--chart-4:oklch(39.4% .023 107.4);--chart-5:oklch(28.6% .016 107.4);--sidebar:oklch(22.8% .013 107.4);--sidebar-foreground:oklch(98.8% .003 106.5);--sidebar-primary:oklch(76.9% .188 70.08);--sidebar-primary-foreground:oklch(27.9% .077 45.635);--sidebar-accent:oklch(28.6% .016 107.4);--sidebar-accent-foreground:oklch(98.8% .003 106.5);--sidebar-border:oklch(100% 0 0/.1);--sidebar-ring:oklch(58% .031 107.3)}@property --tw-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-y{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-z{syntax:"*";inherits:false;initial-value:0}@property --tw-rotate-x{syntax:"*";inherits:false}@property --tw-rotate-y{syntax:"*";inherits:false}@property --tw-rotate-z{syntax:"*";inherits:false}@property --tw-skew-x{syntax:"*";inherits:false}@property --tw-skew-y{syntax:"*";inherits:false}@property --tw-space-y-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-space-x-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-divide-x-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-border-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-divide-y-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-leading{syntax:"*";inherits:false}@property --tw-font-weight{syntax:"*";inherits:false}@property --tw-tracking{syntax:"*";inherits:false}@property --tw-ordinal{syntax:"*";inherits:false}@property --tw-slashed-zero{syntax:"*";inherits:false}@property --tw-numeric-figure{syntax:"*";inherits:false}@property --tw-numeric-spacing{syntax:"*";inherits:false}@property --tw-numeric-fraction{syntax:"*";inherits:false}@property --tw-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-shadow-color{syntax:"*";inherits:false}@property --tw-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-inset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-shadow-color{syntax:"*";inherits:false}@property --tw-inset-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-ring-color{syntax:"*";inherits:false}@property --tw-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-ring-color{syntax:"*";inherits:false}@property --tw-inset-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-ring-inset{syntax:"*";inherits:false}@property --tw-ring-offset-width{syntax:"<length>";inherits:false;initial-value:0}@property --tw-ring-offset-color{syntax:"*";inherits:false;initial-value:#fff}@property --tw-ring-offset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-blur{syntax:"*";inherits:false}@property --tw-brightness{syntax:"*";inherits:false}@property --tw-contrast{syntax:"*";inherits:false}@property --tw-grayscale{syntax:"*";inherits:false}@property --tw-hue-rotate{syntax:"*";inherits:false}@property --tw-invert{syntax:"*";inherits:false}@property --tw-opacity{syntax:"*";inherits:false}@property --tw-saturate{syntax:"*";inherits:false}@property --tw-sepia{syntax:"*";inherits:false}@property --tw-drop-shadow{syntax:"*";inherits:false}@property --tw-drop-shadow-color{syntax:"*";inherits:false}@property --tw-drop-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-drop-shadow-size{syntax:"*";inherits:false}@property --tw-duration{syntax:"*";inherits:false}@property --tw-ease{syntax:"*";inherits:false}@property --tw-content{syntax:"*";inherits:false;initial-value:""}@property --tw-backdrop-blur{syntax:"*";inherits:false}@property --tw-backdrop-brightness{syntax:"*";inherits:false}@property --tw-backdrop-contrast{syntax:"*";inherits:false}@property --tw-backdrop-grayscale{syntax:"*";inherits:false}@property --tw-backdrop-hue-rotate{syntax:"*";inherits:false}@property --tw-backdrop-invert{syntax:"*";inherits:false}@property --tw-backdrop-opacity{syntax:"*";inherits:false}@property --tw-backdrop-saturate{syntax:"*";inherits:false}@property --tw-backdrop-sepia{syntax:"*";inherits:false}@property --tw-outline-style{syntax:"*";inherits:false;initial-value:solid}@keyframes spin{to{transform:rotate(360deg)}}@keyframes pulse{50%{opacity:.5}}@keyframes enter{0%{opacity:var(--tw-enter-opacity,1);transform:translate3d(var(--tw-enter-translate-x,0),var(--tw-enter-translate-y,0),0)scale3d(var(--tw-enter-scale,1),var(--tw-enter-scale,1),var(--tw-enter-scale,1))rotate(var(--tw-enter-rotate,0));filter:blur(var(--tw-enter-blur,0))}}@keyframes exit{to{opacity:var(--tw-exit-opacity,1);transform:translate3d(var(--tw-exit-translate-x,0),var(--tw-exit-translate-y,0),0)scale3d(var(--tw-exit-scale,1),var(--tw-exit-scale,1),var(--tw-exit-scale,1))rotate(var(--tw-exit-rotate,0));filter:blur(var(--tw-exit-blur,0))}}
`, "after-all");
export {
  Nf as Alert,
  Cf as AlertDescription,
  Ef as AlertTitle,
  Yw as Avatar,
  Zw as AvatarFallback,
  Mh as AvatarImage,
  bh as BOOK_CHAPTER_CONTROL_STRING_KEYS,
  xh as BOOK_SELECTOR_STRING_KEYS,
  Hr as Badge,
  Xa as BookChapterControl,
  No as BookSelectionMode,
  yh as BookSelector,
  tt as Button,
  za as ButtonGroup,
  Do as ButtonGroupSeparator,
  Tf as ButtonGroupText,
  as as CANCEL_ACCEPT_BUTTONS_STRING_KEYS,
  Ch as COMMENT_EDITOR_STRING_KEYS,
  qw as COMMENT_LIST_ELEMENT_ID,
  Eh as COMMENT_LIST_STRING_KEYS,
  _h as CONFLICT_NOTE_STRING_KEYS,
  Qi as CONTENT_ZOOM_ROOT_ATTRIBUTE,
  os as CancelAcceptButtons,
  Gw as Card,
  Ww as CardContent,
  Dh as CardDescription,
  Oh as CardFooter,
  Sh as CardHeader,
  Rh as CardTitle,
  Sd as ChapterRangeSelector,
  ds as Checkbox,
  Dg as CheckboxGroup,
  Vp as Checklist,
  Nn as ComboBox,
  wr as Command,
  Pa as CommandEmpty,
  Xe as CommandGroup,
  Ia as CommandInput,
  tr as CommandItem,
  ur as CommandList,
  Nh as CommentEditor,
  Ih as CommentList,
  tu as ConflictNoteCard,
  iu as ContentZoomRoot,
  kh as ContentZoomTextProvider,
  Pg as ContextMenu,
  Hg as ContextMenuCheckboxItem,
  jg as ContextMenuContent,
  $g as ContextMenuGroup,
  Fg as ContextMenuItem,
  Gg as ContextMenuLabel,
  Vg as ContextMenuPortal,
  Bg as ContextMenuRadioGroup,
  qg as ContextMenuRadioItem,
  Wg as ContextMenuSeparator,
  Yg as ContextMenuShortcut,
  Lg as ContextMenuSub,
  Kg as ContextMenuSubContent,
  Ug as ContextMenuSubTrigger,
  Ag as ContextMenuTrigger,
  uu as DataTable,
  Og as DestructiveKeyConfirmation,
  co as Dialog,
  Sf as DialogClose,
  lo as DialogContent,
  Rf as DialogDescription,
  nn as DialogFooter,
  wo as DialogHeader,
  Df as DialogOverlay,
  Of as DialogPortal,
  uo as DialogTitle,
  Mf as DialogTrigger,
  up as DisabledActionTooltip,
  Yr as DisabledTooltipWrapper,
  Zg as Drawer,
  Jg as DrawerClose,
  Qg as DrawerContent,
  af as DrawerDescription,
  ef as DrawerFooter,
  tf as DrawerHeader,
  jp as DrawerOverlay,
  Bp as DrawerPortal,
  rf as DrawerTitle,
  Xg as DrawerTrigger,
  Be as DropdownMenu,
  Ze as DropdownMenuCheckboxItem,
  je as DropdownMenuContent,
  Zn as DropdownMenuGroup,
  Ge as DropdownMenuItem,
  gu as DropdownMenuItemType,
  cr as DropdownMenuLabel,
  Hs as DropdownMenuPortal,
  Os as DropdownMenuRadioGroup,
  Ms as DropdownMenuRadioItem,
  ir as DropdownMenuSeparator,
  Fs as DropdownMenuShortcut,
  Us as DropdownMenuSub,
  qs as DropdownMenuSubContent,
  Ks as DropdownMenuSubTrigger,
  Se as DropdownMenuTrigger,
  pu as ERROR_DUMP_STRING_KEYS,
  $h as ERROR_POPOVER_STRING_KEYS,
  bu as EditorKeyboardShortcuts,
  If as Empty,
  zf as EmptyContent,
  Pf as EmptyDescription,
  Af as EmptyHeader,
  $f as EmptyMedia,
  Vf as EmptyState,
  Lf as EmptyTitle,
  hu as ErrorDump,
  Vh as ErrorPopover,
  Hh as FOOTNOTE_EDITOR_STRING_KEYS,
  Fh as Filter,
  Lh as FilterDropdown,
  jh as Footer,
  Kh as FootnoteEditor,
  Lu as FootnoteItem,
  qh as FootnoteList,
  Sg as INTERFACE_LANGUAGE_PICKER_STRING_KEYS,
  Qh as INVENTORY_STRING_KEYS,
  Aa as Input,
  Rg as InterfaceLanguagePicker,
  tg as Inventory,
  po as Kbd,
  Bf as KbdGroup,
  It as Label,
  Su as MARKER_MENU_STRING_KEYS,
  Ah as MarkdownRenderer,
  Ou as MarkerMenu,
  Bh as MoreInfo,
  Is as MultiSelectComboBox,
  Ng as NavigationContentSearch,
  lr as Popover,
  Vs as PopoverAnchor,
  dr as PopoverContent,
  jf as PopoverDescription,
  Ff as PopoverHeader,
  qa as PopoverPortalContainerProvider,
  Uf as PopoverTitle,
  Rr as PopoverTrigger,
  of as Progress,
  Oo as RadioGroup,
  _a as RadioGroupItem,
  fd as RecentSearches,
  Kf as ResizableHandle,
  Hf as ResizablePanel,
  qf as ResizablePanelGroup,
  Mg as ResultsCard,
  Gf as RetryableErrorView,
  fg as SCOPE_SELECTOR_STRING_KEYS,
  gp as SELECT_BOOKS_STRING_KEYS,
  Ur as SHRINK_STEP,
  mg as ScopeSelector,
  gg as ScriptureResultsViewer,
  vg as ScrollGroupSelector,
  Qn as SearchBar,
  Cr as Select,
  hp as SelectBooks,
  wp as SelectBooksPicker,
  Sr as SelectContent,
  cu as SelectGroup,
  ve as SelectItem,
  zh as SelectLabel,
  du as SelectScrollDownButton,
  lu as SelectScrollUpButton,
  Ph as SelectSeparator,
  Tr as SelectTrigger,
  Er as SelectValue,
  qr as Separator,
  bg as SettingsList,
  yg as SettingsListHeader,
  xg as SettingsListItem,
  ap as SettingsSidebar,
  hg as SettingsSidebarContentSearch,
  Va as ShrinkStepContext,
  xf as ShrinkStepOverride,
  Oi as ShrinkStepOverrideContext,
  Zu as Sidebar,
  Ju as SidebarContent,
  ng as SidebarFooter,
  Fn as SidebarGroup,
  sg as SidebarGroupAction,
  Kn as SidebarGroupContent,
  Un as SidebarGroupLabel,
  og as SidebarHeader,
  ag as SidebarInput,
  Xu as SidebarInset,
  Qu as SidebarMenu,
  cg as SidebarMenuAction,
  lg as SidebarMenuBadge,
  rp as SidebarMenuButton,
  tp as SidebarMenuItem,
  dg as SidebarMenuSkeleton,
  wg as SidebarMenuSub,
  pg as SidebarMenuSubButton,
  ug as SidebarMenuSubItem,
  Yu as SidebarProvider,
  rg as SidebarRail,
  ig as SidebarSeparator,
  eg as SidebarTrigger,
  xr as Skeleton,
  sf as Slider,
  nf as Sonner,
  Wf as Spinner,
  cf as Switch,
  yf as TOOLTIP_DELAY_MS,
  So as TabDropdownMenu,
  _g as TabFloatingMenu,
  kg as TabToolbar,
  Io as Table,
  Po as TableBody,
  Yf as TableCaption,
  yr as TableCell,
  Zf as TableFooter,
  Na as TableHead,
  zo as TableHeader,
  We as TableRow,
  lf as Tabs,
  uf as TabsContent,
  df as TabsList,
  wf as TabsTrigger,
  Ig as TextField,
  mh as Textarea,
  Yn as ToggleGroup,
  pa as ToggleGroupItem,
  Eg as Toolbar,
  ud as ToolbarCompoundLabel,
  kt as Tooltip,
  Nt as TooltipContent,
  zt as TooltipProvider,
  _t as TooltipTrigger,
  mu as UNDO_REDO_BUTTONS_STRING_KEYS,
  Tg as UiLanguageSelector,
  vu as UndoRedoButtons,
  bs as VerticalTabs,
  ys as VerticalTabsContent,
  xs as VerticalTabsList,
  yp as VerticalTabsTrigger,
  zg as WizardStepper,
  Fe as Z_INDEX_ABOVE_DOCK,
  Xn as Z_INDEX_ABOVE_POPOVER,
  Xf as Z_INDEX_CONNECTION_LOST,
  Jf as Z_INDEX_FIRST_RUN,
  Qf as Z_INDEX_MODAL,
  tm as Z_INDEX_MODAL_BACKDROP,
  em as Z_INDEX_ONBOARDING_TOUR,
  rm as Z_INDEX_OVERLAY,
  am as badgeVariants,
  om as buttonGroupVariants,
  nm as buttonVariants,
  b as cn,
  Jh as getBookIdFromUSFM,
  Th as getCommentThreadElementId,
  ja as getInventoryHeader,
  Zh as getLinesFromUSFM,
  Xh as getNumberFromUSFM,
  Ku as getStatusForItem,
  Cg as getToolbarOSReservedSpaceClassName,
  Wh as inventoryCountColumn,
  Gh as inventoryItemColumn,
  Yh as inventoryStatusColumn,
  $n as isCommentDraftEmpty,
  Mo as isMacOs,
  im as isWindows,
  ku as leftEdgeRect,
  we as localizeOrFallback,
  Iu as markerMenuItemToPaletteItem,
  Uh as measureElement,
  yu as measureRange,
  qp as pickTabIconUrl,
  cm as sonner,
  Ba as useContentZoomTextProps,
  pf as useEvent,
  hf as useEventAsync,
  mf as useExtraValidMarkers,
  Ds as useListbox,
  xu as useLivePopoverAnchor,
  Kp as usePromise,
  vh as useRecentSearches,
  gf as useRetryablePromise,
  vf as useRunWhenVisible,
  ms as useShrinkStep,
  Mi as useShrinkStepOverride,
  dd as useShrinkStepValue,
  Fa as useSidebar,
  ff as useStylesheet,
  bf as useTabIconSelection,
  an as useTruncationTooltip,
  Hp as useViewVisibility
};
//# sourceMappingURL=index.js.map
