var Cs = Object.defineProperty;
var Es = (t, e, r) => e in t ? Cs(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var $t = (t, e, r) => Es(t, typeof e != "symbol" ? e + "" : e, r);
import { c as b, g as Re, a as Ur, C as or, L as Fn, t as Ts, u as Qo, T as Jt, b as kt, d as _t, e as Nt, f as Un, A as ka, r as jt, D as nr, h as Ue, i as ir, j as Jr, k as Be, B as J, O as Ss, P as Rs, x as Os, l as zs, m as _o, n as er, o as le, p as Ds, q as Kn, s as Cr, v as Er, w as Tr, y as Sr, z as No, E as Is, F as Ms, G as Rr, H as Co, I as gt, R as Eo, J as _a, K as so, M as co, N as lo, Q as wo, S as Ps, U as As, V as Hn, W as qr, X as Wr, Y as gr, Z as $s, _ as br, $ as To, a0 as Vs, a1 as Ie, a2 as je, a3 as fr, a4 as So, a5 as Ro, a6 as Na, a7 as Oo, a8 as Gn, a9 as Ls, aa as Bs, ab as js, ac as Fs, ad as Us, ae as zo, af as qn, ag as Ks, ah as Wn, ai as Yn, aj as Do, ak as Hs, al as Gs, am as Xn, an as Ka, ao as qs, ap as tn, aq as Ha, ar as Ws, as as Ys, at as Xs, au as Zs, av as Zn, aw as Js, ax as Qs, ay as tc, az as ec, aA as rc, aB as ac, aC as Ia, aD as Ma, aE as Jn, aF as oc, aG as nc, aH as ic } from "./resizable-CV2Exr2E.js";
import { aI as _f, aJ as Nf, aK as Cf, aL as Ef, aM as Tf, aN as Sf, aO as Rf, aP as Of, aQ as zf, aR as Df, aS as If, aT as Mf, aU as Pf, aV as Af, aW as $f, aX as Vf, aY as Lf, aZ as Bf, a_ as jf, a$ as Ff, b0 as Uf, b1 as Kf, b2 as Hf, b3 as Gf, b4 as qf, b5 as Wf, b6 as Yf, b7 as Xf, b8 as Zf, b9 as Jf, ba as Qf, bb as tm, bc as em, bd as rm, be as am, bf as om, bg as nm, bh as im, bi as sm, bj as cm, bk as lm, bl as dm, bm as wm, bn as um, bo as pm, bp as hm, bq as gm, br as fm, bs as mm, bt as vm, bu as bm, bv as xm, bw as ym, bx as km } from "./resizable-CV2Exr2E.js";
import { jsx as a, jsxs as p, Fragment as yt } from "react/jsx-runtime";
import { Canon as St } from "@sillsdev/scripture";
import { Section as ht, compareScrRefs as Ca, getChaptersForBook as sc, formatScrRef as Oe, formatReplacementString as tr, getSectionForBook as pa, formatRelativeDate as cc, sanitizeHtml as Io, NumberFormat as Qn, formatBytes as lc, getCurrentLocale as dc, usfmMarkers as wc, getFormatCallerFunction as uc, deepEqual as pc, isString as en, scrRefToBBBCCCVVV as Ga, defaultScrRef as qa, formatScrRefRange as hc, getLocalizeKeyForScrollGroupId as rn, formatReplacementStringToArray as an, collectUsjMarkers as gc } from "platform-bible-utils";
import Rt, { useRef as U, useMemo as A, createContext as Or, useContext as Qr, useEffect as W, useState as E, useCallback as B, useId as Ea, useImperativeHandle as fc, useLayoutEffect as Ft, Fragment as rr, Component as mc, createElement as uo, Suspense as vc, forwardRef as Mo, memo as ti } from "react";
import { Clock as on, ChevronsLeft as nn, ChevronsRight as sn, ChevronUp as ei, ChevronDown as ar, ArrowLeft as bc, ArrowRight as xc, BoldIcon as yc, ItalicIcon as kc, AtSign as ri, Pencil as _c, Trash2 as Nc, Undo2 as Cc, ArrowUp as ai, MoreHorizontal as Ec, Check as Ta, MailOpen as Tc, Mail as Sc, FilterIcon as Rc, ArrowLeftIcon as Oc, ChevronLeftIcon as zc, ChevronRightIcon as Dc, ArrowRightIcon as Ic, Copy as Mc, Filter as Pc, User as Ac, Link as $c, CircleHelp as Vc, X as Lc, AlertCircle as Bc, CircleCheckIcon as jc, CircleXIcon as Fc, CircleHelpIcon as Uc, ArrowUpIcon as Kc, ArrowDownIcon as Hc, ScrollText as Gc, ChevronRight as qc, ChevronLeft as Wc, ChevronsUpDown as Yc, MenuIcon as Xc, Menu as Zc, EllipsisVertical as Jc, MoreVertical as Qc } from "lucide-react";
import { IconSelector as oi, IconCheck as zr, IconChevronDown as tl, IconChevronUp as el, IconLayoutSidebar as rl, IconLayoutSidebarRight as al, IconChevronRight as ni, IconSearch as ol, IconLoader as nl, IconAlertOctagon as il, IconAlertTriangle as sl, IconInfoCircle as cl, IconCircleCheck as ll } from "@tabler/icons-react";
import { createEditor as ii, $getRoot as Ke, $createParagraphNode as ta, $getSelection as Ut, HISTORY_MERGE_TAG as Po, ParagraphNode as si, TextNode as ci, $getPreviousSelection as dl, $isRangeSelection as xe, $caretFromPoint as wl, $getSiblingCaret as li, $getChildCaret as ul, $getAdjacentChildCaret as pl, $isChildCaret as hl, $normalizeCaret as gl, $setSelectionFromCaretRange as fl, $getCollapsedCaretRange as ml, $getCaretInDirection as cn, $splitAtPointCaretNext as vl, $isTextPointCaret as bl, $findMatchingParent as di, $isElementNode as Yr, mergeRegister as De, getDOMTextNode as xl, isHTMLElement as yl, CLEAR_EDITOR_COMMAND as wi, COMMAND_PRIORITY_EDITOR as Ao, shallowMergeConfig as kl, defineExtension as te, safeCast as sr, createState as _l, FORMAT_TEXT_COMMAND as ui, $isNodeSelection as pi, COMMAND_PRIORITY_LOW as hi, RootNode as Nl, LineBreakNode as Cl, TabNode as El, $isEditorState as Tl, createCommand as Sl, CLICK_COMMAND as Rl, isDOMNode as Ol, $getNodeFromDOMNode as zl, $createNodeSelection as Dl, $setSelection as Il, $getEditor as Ml, DecoratorNode as po, $getState as Pl, toggleTextFormatType as ln, TEXT_TYPE_TO_FORMAT as Al, $setState as $l, addClassNamesToElement as gi, $create as Vl, $getNodeByKey as Ll, removeClassNamesFromElement as Bl, KEY_TAB_COMMAND as jl, $isBlockElementNode as Fl, $createRangeSelection as Ul, $normalizeSelection__EXPERIMENTAL as Kl, OUTDENT_CONTENT_COMMAND as Hl, INDENT_CONTENT_COMMAND as dn, INSERT_TAB_COMMAND as Gl, COMMAND_PRIORITY_CRITICAL as $o, $isDecoratorNode as ql, $isParagraphNode as Wl, $isTextNode as ho, SELECTION_CHANGE_COMMAND as fi, $insertNodes as Yl } from "lexical";
import { HeadingNode as Xl, QuoteNode as Zl, registerRichText as Jl } from "@lexical/rich-text";
import { flushSync as Ql, createPortal as td } from "react-dom";
import { $isTableSelection as ed } from "@lexical/table";
import { ToggleGroup as mi, Avatar as Vo, Select as Lt, Checkbox as wn, Slot as ea, Tabs as de, Menubar as Qt, ContextMenu as Ot, Progress as un, Slider as ia, Switch as pn } from "radix-ui";
import { cva as Lo } from "class-variance-authority";
import { createHeadlessEditor as vi } from "@lexical/headless";
import { $generateHtmlFromNodes as rd, $generateNodesFromDOM as ad } from "@lexical/html";
import { useReactTable as bi, getFilteredRowModel as od, getSortedRowModel as xi, getPaginationRowModel as nd, getCoreRowModel as yi, flexRender as Kr, getGroupedRowModel as id, getExpandedRowModel as sd } from "@tanstack/react-table";
import cd from "markdown-to-jsx";
import { useHotkeys as ld } from "react-hotkeys-hook";
import { Drawer as He } from "vaul";
import { useTheme as dd } from "next-themes";
import { Toaster as wd } from "sonner";
import { toast as Nm } from "sonner";
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
function ki({
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
  disabled: u = !1,
  dimmedReason: g,
  dimmedDescription: f
}) {
  const N = U(!1), m = () => {
    u || (N.current || o == null || o(e), setTimeout(() => {
      N.current = !1;
    }, 100));
  }, h = (D) => {
    if (u) {
      D.preventDefault();
      return;
    }
    N.current = !0, n ? n(D) : o == null || o(e);
  }, y = A(
    () => Re(e, d),
    [e, d]
  ), k = A(
    () => Ur(e, d),
    [e, d]
  ), C = !!g && !u, P = `${y} (${k})`, j = C ? f || `${P}, ${g}` : P, z = /* @__PURE__ */ p(
    or,
    {
      ref: t,
      value: l || `${e} ${St.bookIdToEnglishName(e)}`,
      onSelect: m,
      onMouseDown: h,
      role: "option",
      "aria-selected": r,
      "aria-disabled": u || void 0,
      "aria-label": j,
      disabled: u,
      "data-checked": c ? !!r : void 0,
      className: b(
        !w && Fn,
        // Suppress CommandItem's own data-selected background and text color so the keyboard
        // highlight is the ring alone. Book rows and grid cells belong to one control and share one
        // highlight language; a background here would make the same keyboard state look different
        // depending on which view the user is in.
        "tw:data-selected:bg-transparent tw:data-selected:text-inherit",
        // Hover keeps its own background so pointer feedback stays distinct from the ring, which
        // marks the item Enter will submit.
        "tw:hover:bg-muted",
        s,
        u && "tw:cursor-not-allowed tw:opacity-50",
        // Mirrors NumberedItemGrid's dimmed-vs-disabled split — same tokens, so chapter/verse cells
        // and book rows grey identically inside one popover: dimmed is presentation only, so it
        // never sets aria-disabled or blocks onSelect, and it yields to disabled. Restated under
        // data-selected so a dimmed row keeps its dimming while the keyboard highlight is on it,
        // rather than losing it to the suppression rule above.
        C && "tw:bg-muted/50 tw:text-muted-foreground/50 tw:data-selected:bg-muted/50 tw:data-selected:text-muted-foreground/50"
      ),
      children: [
        /* @__PURE__ */ a("span", { className: "tw:min-w-0 tw:flex-1", children: y }),
        C && // Visible rather than hover-only: cmdk never moves DOM focus onto an item (the input keeps
        // it and highlights via data-selected), so a tooltip would never open for a keyboard user.
        // Rendered text also survives the highlight, which recolours the row.
        /* @__PURE__ */ a("span", { className: "tw:ms-2 tw:shrink-0 tw:text-xs tw:italic", children: g }),
        /* @__PURE__ */ a(
          "span",
          {
            className: b(
              "tw:ms-2 tw:shrink-0 tw:text-xs",
              // Inherits the row's dimmed colour instead of setting its own, so the whole row dims
              // evenly rather than leaving the id at full strength beside a dimmed name.
              !C && "tw:text-muted-foreground"
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
          "tw:border-s-red-200": i === ht.OT,
          "tw:border-s-purple-200": i === ht.NT,
          "tw:border-s-indigo-200": i === ht.DC,
          "tw:border-s-amber-200": i === ht.Extra
        }
      ),
      children: z
    }
  );
}
const ud = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
function pd(t) {
  return ud.some((e) => e === t);
}
function hn(t) {
  const e = new RegExp("^\\p{L}$", "u").test(t), r = /^[0-9]$/.test(t);
  return { isLetter: e, isDigit: r };
}
const Hr = Object.freeze({
  /** Full labels. */
  WIDE: 0,
  /** Abbreviated primary label form. */
  TIGHT: 1,
  /** Secondary field clipped with an ellipsis — CSS does this on its own. */
  TIGHTER: 2,
  /** Secondary field dropped entirely; primary field alone. */
  MINIMUM: 3
}), Pa = Or(Hr.WIDE);
function hd() {
  return Qr(Pa);
}
const _i = Or(void 0);
function Ni() {
  return Qr(_i);
}
function Ci() {
  W(() => {
    Ts();
  }, []);
}
function gd({
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
    onPointerLeave: u
  } = Qo(), {
    ref: g,
    open: f,
    onPointerEnter: N,
    onPointerLeave: m
  } = Qo(), [h, y] = E(!1), [k, C] = E(!1), P = U(
    // React's ref API requires `null` as the initial value for DOM refs.
    // eslint-disable-next-line no-null/no-null
    null
  ), j = n && e !== void 0, z = i ?? (e !== void 0 && !n);
  Ci(), W(() => {
    var T;
    const X = (T = P.current) == null ? void 0 : T.closest('button, [role="combobox"], [tabindex]');
    if (!X) return;
    const x = (L) => !!L && L.scrollWidth > L.clientWidth, Y = () => {
      Un() !== "pointer" && (z || x(g.current) || x(d.current)) && C(!0);
    }, _ = () => C(!1);
    return X.addEventListener("focus", Y), X.addEventListener("blur", _), () => {
      X.removeEventListener("focus", Y), X.removeEventListener("blur", _);
    };
  }, [z, g, d]);
  const D = B(() => {
    z && y(!0), N(), j && w();
  }, [
    z,
    j,
    N,
    w
  ]), I = B(() => {
    y(!1), C(!1), m(), u();
  }, [m, u]);
  W(() => {
    z || y(!1);
  }, [z]);
  const R = /* @__PURE__ */ a("span", { ref: g, className: "tw:min-w-0 tw:shrink tw:truncate", children: t }, "primary"), O = j ? (
    // Weighted to absorb essentially all of the shrinking, so the primary field only starts losing
    // characters once this one has none left.
    /* @__PURE__ */ a("span", { ref: d, className: "tw:min-w-0 tw:shrink-[9999] tw:truncate", children: e }, "secondary")
  ) : void 0, [H, q] = o ? [O, R] : [R, O];
  return (
    // Nested TooltipProviders are harmless in Radix, so carrying our own means this works in any
    // host, including toolbars that never set one up.
    /* @__PURE__ */ a(Jt, { children: /* @__PURE__ */ p(
      kt,
      {
        open: f || l || h || k,
        onOpenChange: (X) => {
          X || I();
        },
        children: [
          /* @__PURE__ */ a(_t, { asChild: !0, children: /* @__PURE__ */ p(
            "span",
            {
              ref: P,
              onPointerEnter: D,
              onPointerLeave: I,
              onPointerDown: I,
              className: b("tw:flex tw:min-w-0 tw:items-center", c),
              children: [
                H,
                H && q && /* @__PURE__ */ a("span", { className: "tw:shrink-0 tw:whitespace-pre", children: r }, "separator"),
                q
              ]
            }
          ) }),
          /* @__PURE__ */ a(Nt, { dir: "auto", children: s })
        ]
      }
    ) })
  );
}
function go(t, e) {
  return `${t} ${ka[t]}${e ? ` ${Ur(t, e)} ${Re(t, e)}` : ""}`;
}
function mr(t, e) {
  return `${t} ${ka[t] || ""} ${e}`;
}
function ha(t, e, r) {
  return `${mr(t, e)}:${r}`;
}
function jr(t) {
  if (t.includes(":")) return;
  const e = /(\d+)$/.exec(t);
  if (!e) return;
  const r = parseInt(e[1], 10), o = t.indexOf(" ");
  if (o < 0) return;
  const n = t.slice(0, o);
  return t === mr(n, r) ? r : void 0;
}
function sa(t) {
  const e = /:(\d+)$/.exec(t);
  if (!e) return;
  const r = t.slice(0, t.length - e[0].length);
  if (jr(r) !== void 0)
    return parseInt(e[1], 10);
}
const fd = "top-match", md = "Show recent searches", vd = "Recent";
function bd({
  recentSearches: t,
  onSearchItemSelect: e,
  renderItem: r = (g) => String(g),
  getItemKey: o = (g) => String(g),
  ariaLabel: n,
  groupHeading: i,
  id: s,
  classNameForItems: c,
  buttonClassName: d = "tw:absolute tw:end-0 tw:top-0 tw:h-full tw:px-3 tw:py-2",
  buttonVariant: l = "ghost",
  open: w,
  onOpenChange: u
}) {
  const [g, f] = E(!1), [N, m] = E(!1), h = Ea(), y = U(!1), k = w !== void 0, C = k ? w : g, P = n === "" ? "" : jt(n, md), j = jt(i, vd), z = (O) => {
    O || (y.current = !0, m(!1)), k || f(O), u == null || u(O);
  }, D = (O) => {
    if (O && y.current) {
      y.current = !1;
      return;
    }
    m(O);
  };
  if (t.length === 0)
    return;
  const I = (O) => {
    e(O);
  }, R = /* @__PURE__ */ a(
    J,
    {
      variant: l,
      size: "icon",
      className: d,
      "aria-label": P,
      ...s !== void 0 ? { "aria-controls": C ? s : void 0 } : {},
      onPointerEnter: () => {
        y.current = !1;
      },
      children: /* @__PURE__ */ a(on, { className: "tw:h-4 tw:w-4" })
    }
  );
  return /* @__PURE__ */ p(nr, { open: C, onOpenChange: z, modal: !1, children: [
    /* @__PURE__ */ a(Jt, { children: P ? /* @__PURE__ */ p(kt, { open: N, onOpenChange: D, children: [
      /* @__PURE__ */ a(_t, { asChild: !0, children: /* @__PURE__ */ a(Ue, { asChild: !0, children: R }) }),
      /* @__PURE__ */ a(Nt, { children: P })
    ] }) : /* @__PURE__ */ a(Ue, { asChild: !0, children: R }) }),
    /* @__PURE__ */ p(
      ir,
      {
        ...s !== void 0 ? { id: s } : {},
        "aria-labelledby": h,
        className: "tw:w-[300px]",
        align: "start",
        onKeyDown: (O) => O.stopPropagation(),
        children: [
          /* @__PURE__ */ a(Jr, { id: h, children: j }),
          t.map((O) => /* @__PURE__ */ p(
            Be,
            {
              onSelect: () => I(O),
              className: b("tw:flex tw:items-center", c),
              children: [
                /* @__PURE__ */ a(on, { className: "tw:me-2 tw:h-4 tw:w-4 tw:opacity-50" }),
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
function vh(t, e, r = (n, i) => n === i, o = 15) {
  return (n) => {
    const i = t.filter(
      (c) => !r(c, n)
    ), s = [n, ...i.slice(0, o - 1)];
    e(s);
  };
}
function ca(t, e) {
  return !e || Ca(t, e) === 0;
}
function xd(t, e, r, o, n) {
  const i = A(
    () => Ss(t, e),
    [t, e]
  ), s = A(
    () => Rs(t, e),
    [t, e]
  ), c = A(
    () => Os(t, e),
    [t, e]
  ), d = A(
    () => zs(t, e),
    [t, e]
  ), l = B(
    (w) => {
      w && o(w);
    },
    [o]
  );
  return A(() => [
    {
      onClick: () => l(i),
      disabled: ca(t, i),
      title: jt(
        n == null ? void 0 : n["%webView_bookChapterControl_previousChapter%"],
        "Previous chapter"
      ),
      icon: r === "ltr" ? nn : sn,
      group: "chapter"
    },
    {
      onClick: () => l(s),
      disabled: ca(t, s),
      title: jt(
        n == null ? void 0 : n["%webView_bookChapterControl_nextChapter%"],
        "Next chapter"
      ),
      icon: r === "ltr" ? sn : nn,
      group: "chapter"
    },
    {
      onClick: () => l(c),
      disabled: ca(t, c),
      title: jt(
        n == null ? void 0 : n["%webView_bookChapterControl_previousVerse%"],
        "Previous verse"
      ),
      icon: ei,
      group: "verse"
    },
    {
      onClick: () => l(d),
      disabled: ca(t, d),
      title: jt(
        n == null ? void 0 : n["%webView_bookChapterControl_nextVerse%"],
        "Next verse"
      ),
      icon: ar,
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
const ga = {
  // Matches start of string (`^`), one or more non-colon/space words, optionally followed by space and more words (`([^:\s]+(?:\s+[^:\s]+)*)`), end of string (`$`), case-insensitive (`i`)
  BOOK_ONLY: /^([^:\s]+(?:\s+[^:\s]+)*)$/i,
  // Same as above, but followed by a space and a chapter number (`\s+(\d+)`)
  BOOK_CHAPTER: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,
  // Same as above, but followed by a colon and optionally a verse number (`:(\d*)`)
  BOOK_CHAPTER_VERSE: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i
}, yd = [
  ga.BOOK_ONLY,
  ga.BOOK_CHAPTER,
  ga.BOOK_CHAPTER_VERSE
];
function kd(t) {
  return ga.BOOK_CHAPTER_VERSE.test(t.trim());
}
function gn(t, e) {
  return St.bookIdToNumber(t) < St.bookIdToNumber(e.book);
}
function _d(t, e, r) {
  const o = St.bookIdToNumber(t) - St.bookIdToNumber(r.book);
  return o < 0 ? !0 : o > 0 ? !1 : e < r.chapterNum;
}
function Wa(t, e, r, o) {
  const n = St.bookIdToNumber(t) - St.bookIdToNumber(o.book);
  return n < 0 ? !0 : n > 0 ? !1 : e < o.chapterNum ? !0 : e > o.chapterNum ? !1 : r < o.verseNum;
}
function Le(t) {
  return sc(St.bookIdToNumber(t));
}
function Nd(t, e, r) {
  if (!t.trim() || e.length === 0) return;
  const o = yd.reduce(
    (n, i) => {
      if (n) return n;
      const s = i.exec(t.trim());
      if (s) {
        const [c, d = void 0, l = void 0] = s.slice(1);
        let w;
        const u = e.filter((g) => _o(g, c, r));
        if (u.length === 1 && ([w] = u), !w && d) {
          if (St.isBookIdValid(c)) {
            const g = c.toUpperCase();
            e.includes(g) && (w = g);
          }
          if (!w && r) {
            const g = Array.from(r.entries()).find(
              ([, f]) => f.localizedId.toLowerCase() === c.toLowerCase()
            );
            g && e.includes(g[0]) && ([w] = g);
          }
        }
        if (!w && d) {
          const f = ((N) => Object.keys(ka).find(
            (m) => ka[m].toLowerCase() === N.toLowerCase()
          ))(c);
          if (f && e.includes(f) && (w = f), !w && r) {
            const N = Array.from(r.entries()).find(
              ([, m]) => m.localizedName.toLowerCase() === c.toLowerCase()
            );
            N && e.includes(N[0]) && ([w] = N);
          }
        }
        if (w) {
          let g = d ? parseInt(d, 10) : void 0;
          g && g > Le(w) && (g = Math.max(Le(w), 1));
          const f = l ? parseInt(l, 10) : void 0;
          return {
            book: w,
            chapterNum: g,
            verseNum: f
          };
        }
      }
    },
    void 0
  );
  if (o) return o;
}
function fo(t) {
  return {
    [ht.OT]: t.filter((e) => St.isBookOT(e)),
    [ht.NT]: t.filter((e) => St.isBookNT(e)),
    [ht.DC]: t.filter((e) => St.isBookDC(e)),
    [ht.Extra]: t.filter((e) => St.extraBooks().includes(e))
  };
}
function Cd(t, e) {
  const r = new Set(t), o = e.filter((l) => !r.has(l)), n = new Set(o), i = n.size === 0 ? t : St.allBookIds.filter(
    (l) => r.has(l) || n.has(l)
  ), s = fo(i), c = Object.values(s).flat(), d = fo(t);
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
const mo = 6;
function Ed(t) {
  return t === "ArrowLeft" ? "ArrowRight" : t === "ArrowRight" ? "ArrowLeft" : t;
}
function Td({
  current: t,
  key: e,
  max: r,
  direction: o = "ltr"
}) {
  if (r <= 0) return t;
  if (t < 1 || t > r) return 1;
  switch (o === "rtl" ? Ed(e) : e) {
    case "ArrowLeft":
      return t > 1 ? t - 1 : r;
    case "ArrowRight":
      return t < r ? t + 1 : 1;
    case "ArrowUp":
      return Math.max(1, t - mo);
    case "ArrowDown":
      return Math.min(r, t + mo);
    default:
      return t;
  }
}
function Ei({
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
    return /* @__PURE__ */ a(er, { children: /* @__PURE__ */ a(
      "div",
      {
        className: b("tw:grid tw:gap-1", d),
        style: { gridTemplateColumns: `repeat(${mo}, minmax(0, 1fr))` },
        children: Array.from({ length: t }, (l, w) => w + 1).map((l) => {
          const w = (n == null ? void 0 : n(l)) ?? !1;
          return /* @__PURE__ */ a(
            or,
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
                // Give cells pointer feedback distinct from the keyboard focus ring.
                "tw:hover:bg-muted",
                !c && Fn,
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
function fn({
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
      Ei,
      {
        count: Le(t),
        valueBuilder: (d) => mr(t, d),
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
function mn({
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
      Ei,
      {
        count: r,
        valueBuilder: (w) => ha(t, e, w),
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
const Sd = "a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]";
function Rd(t) {
  return Array.from(t.querySelectorAll(Sd)).filter(
    (e) => e.tabIndex >= 0
  );
}
function Ya({
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
  disableReferencesUpTo: u,
  submitKeys: g,
  triggerContent: f,
  triggerVariant: N = "outline",
  showTriggerChevron: m = !1,
  onOpenChange: h,
  onCloseAutoFocus: y,
  modal: k = !1,
  align: C = "center",
  ref: P,
  disabled: j
}) {
  const z = le(), D = hd(), [I, R] = E(!1), [O, H] = E(""), [q, X] = E(""), [x, Y] = E("books"), [_, T] = E(void 0), [L, $] = E(
    void 0
  ), [K, at] = E(void 0), [et, G] = E(!1), [it, ct] = E(!1), [st, zt] = E(!1), [Dt, Bt] = E(!1), Me = U(null), we = U(!1), Ge = U(null), ft = U(void 0), Ct = U(void 0), Kt = U(void 0), _e = U(void 0), ue = U({}), Et = U({}), mt = B(
    (v) => {
      e(v), d && d(v);
    },
    [e, d]
  ), Pe = A(() => o ? o() : Ds, [o]), qe = A(
    () => o && n ? n() : [],
    [o, n]
  ), {
    projectBooksBySection: Ne,
    reachableBooksBySection: We,
    reachableBooks: ee,
    projectBooks: It,
    booksOutsideProject: re
  } = A(
    () => Cd(Pe, qe),
    [Pe, qe]
  ), Ce = re.has(t.book), cr = A(() => q.trim() ? fo(
    ee.filter((v) => _o(v, q, i))
  ) : it ? We : Ne, [
    Ne,
    We,
    ee,
    it,
    q,
    i
  ]), M = A(
    () => Nd(q, ee, i),
    [q, ee, i]
  ), vt = A(() => {
    if (!M) return;
    const v = O.startsWith(`${M.book} `) ? O : "", F = sa(v), tt = jr(v);
    return {
      book: M.book,
      chapterNum: tt ?? M.chapterNum ?? 1,
      verseNum: F ?? M.verseNum ?? 1
    };
  }, [M, O]), Yt = U(!1);
  W(() => {
    if (!Yt.current) {
      Yt.current = !0;
      return;
    }
    h == null || h(I);
  }, [I, h]);
  const Mt = B(() => {
    vt && (u && Wa(
      vt.book,
      vt.chapterNum,
      vt.verseNum,
      u
    ) || (mt(vt), R(!1), X(""), H("")));
  }, [mt, vt, u]), ae = B(
    (v) => {
      const F = L ?? (M == null ? void 0 : M.book), tt = K ?? (M == null ? void 0 : M.chapterNum);
      !F || !tt || (mt({
        book: F,
        chapterNum: tt,
        verseNum: v
      }), R(!1));
    },
    [mt, L, K, M]
  ), pe = B(
    (v) => {
      if (u && gn(v, u)) return;
      if (Le(v) <= 1) {
        mt({
          book: v,
          chapterNum: 1,
          verseNum: 1
        }), R(!1), X("");
        return;
      }
      T(v), Y("chapters");
    },
    [mt, u]
  ), Pt = B(
    (v) => {
      const F = x === "chapters" ? _ : M == null ? void 0 : M.book;
      if (F) {
        if (w && w(F, v) > 1) {
          $(F), at(v), Y("verses"), H("");
          return;
        }
        mt({
          book: F,
          chapterNum: v,
          verseNum: 1
        }), R(!1);
      }
    },
    [mt, x, _, M, w]
  ), Ae = B(
    (v) => {
      mt(v), R(!1), X("");
    },
    [mt]
  ), he = xd(
    t,
    it ? ee : It,
    z,
    e,
    s
  ), oe = B((v) => {
    X(v), Bt(!1);
  }, []), Ht = B(() => {
    Y("books"), T(void 0), $(void 0), at(void 0), Bt(!1), setTimeout(() => {
      var v;
      (v = Ct.current) == null || v.focus();
    }, 0);
  }, []), Gt = B(() => {
    const v = L;
    $(void 0), at(void 0), v ? (T(v), Y("chapters"), H("")) : Ht();
  }, [L, Ht]), wt = B(
    (v) => {
      R(v), v && (Y("books"), T(void 0), $(void 0), at(void 0), X(""), Bt(!1), zt(!1), G(!1), ct(Ce));
    },
    [Ce]
  );
  W(() => {
    j && wt(!1);
  }, [j, wt]);
  const [Ee, Te] = E(0);
  W(() => {
    var v;
    Ee !== 0 && ((v = Ct.current) == null || v.focus());
  }, [Ee]), fc(
    P,
    () => ({
      open: () => {
        j || (wt(!0), Te((v) => v + 1));
      }
    }),
    [wt, j]
  );
  const { otLong: ge, ntLong: Ye, dcLong: Xe, extraLong: fe } = {
    otLong: s == null ? void 0 : s["%scripture_section_ot_long%"],
    ntLong: s == null ? void 0 : s["%scripture_section_nt_long%"],
    dcLong: s == null ? void 0 : s["%scripture_section_dc_long%"],
    extraLong: s == null ? void 0 : s["%scripture_section_extra_long%"]
  }, me = B(
    (v) => Kn(v, ge, Ye, Xe, fe),
    [ge, Ye, Xe, fe]
  ), lr = B(
    (v) => M ? !!M.chapterNum && !v.toString().includes(M.chapterNum.toString()) : !1,
    [M]
  ), Mr = A(
    () => Oe(
      t,
      i ? Re(t.book, i) : "English"
    ),
    [t, i]
  ), Pr = A(
    () => D >= Hr.TIGHT ? Ur(t.book, i) : Re(t.book, i),
    [t.book, i, D]
  ), Ze = `${t.chapterNum}:${t.verseNum}`, S = B((v) => (F) => {
    ue.current[v] = F;
  }, []), Q = B((v) => (F) => {
    Et.current[v] = F;
  }, []), rt = A(
    () => kd(q),
    [q]
  ), lt = A(() => !w || !M || !M.chapterNum || !rt ? !1 : w(M.book, M.chapterNum) > 0, [w, M, rt]), Ar = x === "books" && !et && !q.trim() && re.size > 0, dr = B(
    (v) => u ? gn(v, u) : !1,
    [u]
  ), wr = B(
    (v) => (F) => u ? _d(v, F, u) : !1,
    [u]
  ), Se = B(
    (v, F) => (tt) => u ? Wa(v, F, tt, u) : !1,
    [u]
  ), Ba = jt(
    s == null ? void 0 : s["%webView_bookChapterControl_selectChapter%"],
    "Select chapter"
  ), ja = jt(
    s == null ? void 0 : s["%webView_bookChapterControl_selectVerse%"],
    "Select verse"
  ), ra = x === "verses" ? jt(
    s == null ? void 0 : s["%webView_bookChapterControl_backToChapters%"],
    "Back to chapters"
  ) : jt(
    s == null ? void 0 : s["%webView_bookChapterControl_backToBooks%"],
    "Back to books"
  ), Fa = jt(
    s == null ? void 0 : s["%webView_bookChapterControl_bookNotInProject%"],
    "Not in project"
  ), $r = jt(
    s == null ? void 0 : s["%webView_bookChapterControl_bookNotInProjectDescription%"],
    "{book} is not in this project"
  ), aa = B(
    (v) => tr($r, {
      book: `${Re(v, i)} (${Ur(
        v,
        i
      )})`
    }),
    [$r, i]
  ), ur = jt(
    s == null ? void 0 : s["%webView_bookChapterControl_showMoreBooks%"],
    "Show more books"
  ), oa = jt(
    s == null ? void 0 : s["%webView_bookChapterControl_showProjectBooksOnly%"],
    "Show project books only"
  ), na = B(
    (v) => {
      (v.key === "Home" || v.key === "End") && v.stopPropagation(), g && g.includes(v.key) && M && M.chapterNum !== void 0 && M.verseNum !== void 0 && (v.preventDefault(), v.stopPropagation(), Mt());
    },
    [g, M, Mt]
  ), V = B(
    (v) => {
      var Xo, Zo;
      if (v.ctrlKey) return;
      const F = v.target instanceof HTMLElement ? v.target : void 0;
      if (!(!!F && !!((Xo = ft.current) != null && Xo.contains(F))) && (F != null && F.closest('[role="menu"], [role="menuitem"]')))
        return;
      if (v.key === "Tab") {
        const xt = ft.current ? Rd(ft.current) : [];
        if (xt.length === 0) {
          v.preventDefault(), v.stopPropagation();
          return;
        }
        const Xt = xt[xt.length - 1], At = v.shiftKey ? xt[0] : Xt;
        document.activeElement === At && (v.preventDefault(), v.stopPropagation(), (v.shiftKey ? Xt : xt[0]).focus());
        return;
      }
      const { isLetter: ut, isDigit: pt } = hn(v.key);
      if ((x === "chapters" || x === "verses") && (v.key === " " || v.key === "Enter")) {
        if (!!(F != null && F.closest(
          'button, a, input, select, textarea, [role="button"]'
        ))) {
          v.stopPropagation();
          return;
        }
        const Xt = (() => {
          if (x === "verses") {
            const Vr = L, Jo = K, Ua = sa(O);
            return !Vr || !Jo || Ua === void 0 ? void 0 : {
              isDisabled: Se(Vr, Jo)(Ua),
              activate: () => ae(Ua)
            };
          }
          const At = _, se = jr(O);
          if (!(!At || se === void 0))
            return {
              isDisabled: wr(At)(se),
              activate: () => Pt(se)
            };
        })();
        if (Xt) {
          v.preventDefault(), v.stopPropagation(), Xt.isDisabled || Xt.activate();
          return;
        }
      }
      if (x === "books" && M && !et && v.key === "Enter" && !(F !== Ct.current && !!(F != null && F.closest('button, a, input, select, textarea, [role="button"]')))) {
        v.preventDefault(), v.stopPropagation(), Mt();
        return;
      }
      if ((x === "chapters" || x === "verses") && (ut || pt)) {
        v.preventDefault(), v.stopPropagation();
        return;
      }
      if (v.key === "Backspace" && (x === "chapters" || x === "verses")) {
        v.preventDefault(), v.stopPropagation(), x === "verses" ? Gt() : Ht();
        return;
      }
      if (!pd(v.key) || et) return;
      if (x === "books" && !Dt && (v.key === "ArrowLeft" || v.key === "ArrowRight")) {
        const xt = F === Ct.current ? Ct.current : void 0, Xt = (xt == null ? void 0 : xt.selectionStart) ?? 0, At = (xt == null ? void 0 : xt.selectionEnd) ?? 0, se = z === "rtl" ? v.key === "ArrowRight" : v.key === "ArrowLeft";
        if (!!xt && (Xt !== At || (se ? Xt > 0 : At < xt.value.length))) return;
      }
      if (v.shiftKey || x === "books" && F !== Ct.current && (F != null && F.closest('button, a, [role="button"]')))
        return;
      const dt = (() => {
        const xt = x === "books" && M && lt && M.chapterNum ? { bookId: M.book, chapterNum: M.chapterNum } : void 0, Xt = x === "verses" ? { bookId: L, chapterNum: K } : xt;
        if (Xt) {
          const { bookId: At, chapterNum: se } = Xt;
          return !At || !se || !w ? void 0 : {
            max: w(At, se),
            current: sa(O) ?? 0,
            buildValue: (Vr) => ha(At, se, Vr),
            refs: Et,
            // In books view focus stays on the CommandInput so the user can keep typing; only
            // the dedicated grid views pull focus off the back button.
            takeFocus: x === "verses"
          };
        }
        if (x === "chapters" || x === "books" && M && Le(M.book) > 1) {
          const At = x === "chapters" ? _ : M == null ? void 0 : M.book;
          return At ? {
            max: Le(At),
            current: jr(O) ?? 0,
            buildValue: (se) => mr(At, se),
            refs: ue,
            takeFocus: x === "chapters"
          } : void 0;
        }
      })();
      if (!dt || dt.max <= 0) return;
      x === "books" && Bt(!0), dt.takeFocus && ((Zo = ft.current) == null || Zo.focus());
      const qt = Td({
        current: dt.current,
        key: v.key,
        max: dt.max,
        direction: z
      });
      if (v.preventDefault(), v.stopPropagation(), qt === dt.current) return;
      H(dt.buildValue(qt));
      const Yo = dt.refs.current[qt];
      Yo && Yo.scrollIntoView({ block: "nearest", behavior: "smooth" });
    },
    [
      x,
      M,
      lt,
      et,
      Dt,
      z,
      Ht,
      Gt,
      Pt,
      Mt,
      ae,
      wr,
      Se,
      _,
      L,
      K,
      w,
      O
    ]
  ), Z = B((v) => {
    var ut, pt;
    if (v.shiftKey || v.key === "Tab" || v.key === " ") return;
    if (v.key === "Enter") {
      v.stopPropagation();
      return;
    }
    if (v.key === "ArrowUp" || v.key === "ArrowDown") {
      (ut = Ct.current) == null || ut.focus();
      return;
    }
    const { isLetter: F, isDigit: tt } = hn(v.key);
    (F || tt) && (v.preventDefault(), X((dt) => dt + v.key), (pt = Ct.current) == null || pt.focus(), G(!1));
  }, []);
  Ft(() => {
    const v = setTimeout(() => {
      if (I && x === "books" && Kt.current && _e.current) {
        const F = Kt.current, tt = _e.current, ut = tt.offsetTop, pt = F.clientHeight, dt = tt.clientHeight, qt = ut - pt / 2 + dt / 2;
        F.scrollTo({
          top: Math.max(0, qt),
          behavior: "smooth"
        }), H(go(t.book));
      }
    }, 0);
    return () => {
      clearTimeout(v);
    };
  }, [I, x, q, M, t.book]), Ft(() => {
    if (x === "chapters" && _) {
      const v = _ === t.book, F = v ? t.chapterNum : 1;
      H(mr(_, F)), setTimeout(() => {
        if (Kt.current)
          if (v) {
            const tt = ue.current[t.chapterNum];
            tt && tt.scrollIntoView({ block: "center", behavior: "smooth" });
          } else
            Kt.current.scrollTo({ top: 0 });
        ft.current && ft.current.focus();
      }, 0);
    }
  }, [x, _, M, t.book, t.chapterNum]), Ft(() => {
    if (x === "verses" && L && K !== void 0) {
      const v = L === t.book && K === t.chapterNum, F = v ? t.verseNum : 1;
      H(
        ha(L, K, F)
      ), setTimeout(() => {
        if (Kt.current)
          if (v) {
            const tt = Et.current[t.verseNum];
            tt && tt.scrollIntoView({ block: "center", behavior: "smooth" });
          } else
            Kt.current.scrollTo({ top: 0 });
        ft.current && ft.current.focus();
      }, 0);
    }
  }, [
    x,
    L,
    K,
    t.book,
    t.chapterNum,
    t.verseNum
  ]);
  const bt = M ? `${M.book} ${M.chapterNum ?? ""} ${M.verseNum ?? ""} ${lt}` : "", ne = U(""), ie = U(""), $e = A(() => {
    if (x !== "books" || !M || et) return;
    const { book: v, chapterNum: F, verseNum: tt } = M;
    if (lt && F && w)
      return {
        max: w(v, F),
        initial: tt ?? (v === t.book && F === t.chapterNum ? t.verseNum : 1),
        parse: sa,
        buildValue: (pt) => ha(v, F, pt)
      };
    const ut = Le(v);
    if (!(ut <= 1))
      return {
        max: ut,
        initial: F ?? (v === t.book ? t.chapterNum : 1),
        parse: jr,
        buildValue: (pt) => mr(v, pt)
      };
  }, [
    x,
    M,
    et,
    lt,
    w,
    t.book,
    t.chapterNum,
    t.verseNum
  ]);
  return Ft(() => {
    if (x !== "books" || !M || !$e || $e.max <= 0) {
      ne.current = "";
      return;
    }
    const { max: v, initial: F, parse: tt, buildValue: ut } = $e, pt = (dt) => {
      const qt = tt(dt);
      return qt !== void 0 && qt >= 1 && qt <= v && dt === ut(qt) ? qt : void 0;
    };
    if (ne.current !== bt) {
      ne.current = bt;
      const dt = ut(Math.min(Math.max(F, 1), v));
      ie.current = dt, H(dt);
      return;
    }
    if (pt(O) !== void 0) {
      ie.current = O;
      return;
    }
    H(
      pt(ie.current) !== void 0 ? ie.current : ut(Math.min(Math.max(F, 1), v))
    );
  }, [x, M, $e, bt, O]), /* @__PURE__ */ p(Cr, { open: I, onOpenChange: wt, modal: k, children: [
    /* @__PURE__ */ a(Er, { asChild: !0, children: /* @__PURE__ */ p(
      J,
      {
        ref: Me,
        "aria-label": "book-chapter-trigger",
        variant: N,
        role: "combobox",
        "aria-expanded": I,
        ...l !== void 0 ? { "aria-controls": l } : {},
        disabled: j,
        className: b(
          "tw:h-8 tw:w-full tw:min-w-16 tw:max-w-48 tw:shrink tw:overflow-hidden tw:px-1",
          r
        ),
        onClick: (v) => {
          we.current && (we.current = !1, v.preventDefault());
        },
        children: [
          f ?? /* @__PURE__ */ a(
            gd,
            {
              primary: Pr,
              secondary: Ze,
              showSecondary: D < Hr.MINIMUM,
              isPartial: D >= Hr.TIGHT,
              fullText: Mr
            }
          ),
          m && /* @__PURE__ */ a(
            oi,
            {
              "data-testid": "book-chapter-control-chevron",
              className: "tw:ms-2 tw:size-4 tw:shrink-0 tw:opacity-50"
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ a(
      Tr,
      {
        ...l !== void 0 ? { id: l } : {},
        ref: Ge,
        forceMount: !0,
        className: "tw:w-[280px] tw:p-0",
        align: C,
        onKeyDownCapture: V,
        onKeyDown: (v) => v.stopPropagation(),
        onPointerDownOutside: (v) => {
          const { target: F } = v;
          I && Me.current && F instanceof Node && Me.current.contains(F) && (we.current = !0, wt(!1));
        },
        onInteractOutside: (v) => {
          !k && I && et && v.preventDefault();
        },
        onEscapeKeyDown: (v) => {
          var ut, pt;
          if (k || !I || !et) return;
          const { target: F } = v;
          F instanceof Node && (!!((ut = Ge.current) != null && ut.contains(F)) || !!((pt = Me.current) != null && pt.contains(F))) || v.preventDefault();
        },
        onCloseAutoFocus: y,
        children: /* @__PURE__ */ a(Jt, { children: /* @__PURE__ */ p(
          Sr,
          {
            ref: ft,
            loop: !0,
            value: O,
            onValueChange: H,
            disablePointerSelection: !0,
            shouldFilter: !1,
            children: [
              x === "books" ? /* @__PURE__ */ p(
                "div",
                {
                  className: b("tw:flex tw:items-end", et && "tw:pb-1"),
                  onFocus: (v) => {
                    zt(v.target !== Ct.current);
                  },
                  onBlur: (v) => {
                    v.currentTarget.contains(v.relatedTarget) || zt(!1);
                  },
                  children: [
                    /* @__PURE__ */ p("div", { className: "tw:relative tw:flex-1", children: [
                      /* @__PURE__ */ a(
                        No,
                        {
                          ref: Ct,
                          value: q,
                          onValueChange: oe,
                          onKeyDown: na,
                          onFocus: () => G(!1),
                          className: c && c.length > 0 ? "tw:pe-8!" : "",
                          spaceSelectsHighlightedItem: !0
                        }
                      ),
                      c && c.length > 0 && /* @__PURE__ */ a(
                        bd,
                        {
                          recentSearches: c,
                          onSearchItemSelect: Ae,
                          renderItem: (v) => Oe(v, "English"),
                          getItemKey: (v) => `${v.book}-${v.chapterNum}-${v.verseNum}`,
                          ariaLabel: s == null ? void 0 : s["%history_recentSearches_ariaLabel%"],
                          groupHeading: s == null ? void 0 : s["%history_recent%"],
                          buttonClassName: "tw:absolute tw:end-1 tw:top-1"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ a(Is, { className: "tw:translate-y-px tw:gap-1 tw:pe-2", children: he.map(
                      ({ onClick: v, disabled: F, title: tt, icon: ut, group: pt }, dt) => {
                        const qt = /* @__PURE__ */ a(
                          J,
                          {
                            variant: "ghost",
                            size: "sm",
                            onClick: () => {
                              F || (G(!0), v());
                            },
                            "aria-disabled": F,
                            className: "tw:h-8.5 tw:w-6 tw:rounded-lg! tw:p-0 tw:aria-disabled:cursor-default tw:aria-disabled:opacity-50 tw:aria-disabled:hover:bg-transparent! tw:aria-disabled:hover:text-inherit! tw:dark:aria-disabled:hover:bg-transparent! tw:aria-disabled:active:transform-none!",
                            "aria-label": tt,
                            onKeyDown: Z,
                            children: /* @__PURE__ */ a(ut, {})
                          }
                        );
                        return (
                          // Keyed by position, not by `title`: the titles are localized, so they all
                          // change together the moment the strings resolve or the UI language does.
                          // Keying on them would remount all four buttons at that instant, dropping
                          // focus off whichever one the user was on and destroying an open tooltip.
                          // The set is fixed in size and order, so the index is stable.
                          // eslint-disable-next-line react/no-array-index-key
                          /* @__PURE__ */ p(rr, { children: [
                            dt > 0 && pt !== he[dt - 1].group && /* @__PURE__ */ a(Ms, {}),
                            /* @__PURE__ */ p(kt, { children: [
                              /* @__PURE__ */ a(_t, { asChild: !0, children: qt }),
                              /* @__PURE__ */ a(Nt, { children: tt })
                            ] })
                          ] }, `${pt}-${dt}`)
                        );
                      }
                    ) })
                  ]
                }
              ) : /* @__PURE__ */ p("div", { className: "tw:flex tw:items-center tw:border-b tw:px-3 tw:py-1", children: [
                /* @__PURE__ */ p(kt, { children: [
                  /* @__PURE__ */ a(_t, { asChild: !0, children: /* @__PURE__ */ a(
                    J,
                    {
                      variant: "ghost",
                      size: "sm",
                      onClick: x === "verses" ? Gt : Ht,
                      className: "tw:me-2 tw:h-6 tw:w-6 tw:p-0",
                      tabIndex: -1,
                      "aria-label": ra,
                      children: z === "ltr" ? /* @__PURE__ */ a(bc, { className: "tw:h-4 tw:w-4" }) : /* @__PURE__ */ a(xc, { className: "tw:h-4 tw:w-4" })
                    }
                  ) }),
                  /* @__PURE__ */ a(Nt, { children: ra })
                ] }),
                x === "chapters" && _ && /* @__PURE__ */ a("span", { tabIndex: -1, className: "tw:text-sm tw:font-medium", children: Re(_, i) }),
                x === "verses" && L && K !== void 0 && /* @__PURE__ */ a("span", { tabIndex: -1, className: "tw:text-sm tw:font-medium", children: `${Re(L, i)} ${K}` }),
                /* @__PURE__ */ a(
                  "span",
                  {
                    tabIndex: -1,
                    className: "tw:ms-auto tw:text-sm tw:font-medium tw:text-muted-foreground",
                    children: x === "verses" ? ja : Ba
                  }
                )
              ] }),
              !et && /* @__PURE__ */ p(Rr, { ref: Kt, children: [
                x === "books" && /* @__PURE__ */ p(yt, { children: [
                  !M && Object.entries(cr).map(([v, F]) => {
                    if (F.length !== 0)
                      return (
                        // We are mapping over filteredBooksByType, which uses Section as key type
                        // eslint-disable-next-line no-type-assertion/no-type-assertion
                        /* @__PURE__ */ a(er, { heading: me(v), children: F.map((tt) => /* @__PURE__ */ a(
                          ki,
                          {
                            bookId: tt,
                            onSelect: (ut) => pe(ut),
                            section: pa(tt),
                            commandValue: go(tt),
                            suppressKeyboardHighlight: st,
                            ref: tt === t.book ? _e : void 0,
                            localizedBookNames: i,
                            disabled: dr(tt),
                            dimmedReason: re.has(tt) ? Fa : void 0,
                            dimmedDescription: re.has(tt) ? aa(tt) : void 0
                          },
                          tt
                        )) }, v)
                      );
                  }),
                  M && vt && /* @__PURE__ */ a(er, { children: /* @__PURE__ */ p(
                    or,
                    {
                      value: fd,
                      onSelect: Mt,
                      disabled: !!u && Wa(
                        vt.book,
                        vt.chapterNum,
                        vt.verseNum,
                        u
                      ),
                      className: "tw:font-semibold tw:text-primary tw:hover:bg-muted",
                      children: [
                        /* @__PURE__ */ a("span", { className: "tw:min-w-0 tw:flex-1", children: Oe(
                          vt,
                          Re(M.book, i)
                        ) }),
                        /* @__PURE__ */ a("span", { className: "tw:ms-2 tw:shrink-0 tw:text-xs tw:text-muted-foreground", children: Ur(M.book, i) })
                      ]
                    },
                    "top-match"
                  ) }),
                  M && lt && M.chapterNum && w && // No heading over this grid: the top-match row sits directly above it and
                  // already names the book and the reference the grid is refining, so a
                  // heading here only repeated the book back to the user one line later. The
                  // dedicated verses view still carries one, because there it is the only
                  // thing naming the book.
                  /* @__PURE__ */ a(
                    mn,
                    {
                      bookId: M.book,
                      chapterNum: M.chapterNum,
                      endVerse: w(M.book, M.chapterNum),
                      scrRef: t,
                      onVerseSelect: ae,
                      setVerseRef: Q,
                      isVerseDisabled: Se(M.book, M.chapterNum),
                      suppressKeyboardHighlight: st,
                      className: "tw:px-4 tw:pb-4"
                    }
                  ),
                  M && !lt && Le(M.book) > 1 && // No heading here either, for the same reason as the verse preview above:
                  // the top-match row directly above already names the book.
                  /* @__PURE__ */ a(
                    fn,
                    {
                      bookId: M.book,
                      scrRef: t,
                      onChapterSelect: Pt,
                      setChapterRef: S,
                      isChapterDimmed: lr,
                      isChapterDisabled: wr(M.book),
                      suppressKeyboardHighlight: st,
                      className: "tw:px-4 tw:pb-4"
                    }
                  )
                ] }),
                x === "chapters" && _ && /* @__PURE__ */ a(
                  fn,
                  {
                    bookId: _,
                    scrRef: t,
                    onChapterSelect: Pt,
                    setChapterRef: S,
                    isChapterDisabled: wr(_),
                    className: "tw:p-4"
                  }
                ),
                x === "verses" && L && K !== void 0 && w && /* @__PURE__ */ a(
                  mn,
                  {
                    bookId: L,
                    chapterNum: K,
                    endVerse: w(
                      L,
                      K
                    ),
                    scrRef: t,
                    onVerseSelect: ae,
                    setVerseRef: Q,
                    isVerseDisabled: Se(
                      L,
                      K
                    ),
                    className: "tw:p-4"
                  }
                )
              ] }),
              Ar && /* @__PURE__ */ a("div", { className: "tw:border-t tw:p-1", children: /* @__PURE__ */ a(
                J,
                {
                  variant: "ghost",
                  size: "sm",
                  className: "tw:w-full tw:justify-start tw:font-normal",
                  onClick: () => ct((v) => !v),
                  children: it ? oa : ur
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
function Od(t) {
  return typeof t == "string" ? t : typeof t == "number" ? t.toString() : t.label;
}
function vn({
  id: t,
  options: e = [],
  className: r,
  buttonClassName: o,
  popoverContentClassName: n,
  popoverContentStyle: i,
  value: s,
  onChange: c = () => {
  },
  getOptionLabel: d = Od,
  getButtonLabel: l,
  icon: w = void 0,
  buttonPlaceholder: u = "",
  textPlaceholder: g = "",
  commandEmptyMessage: f = "No option found",
  buttonVariant: N = "outline",
  alignDropDown: m = "start",
  isDisabled: h = !1,
  ariaLabel: y,
  ...k
}) {
  const [C, P] = E(!1), j = l ?? d, z = (I) => I.length > 0 && typeof I[0] == "object" && "options" in I[0], D = (I, R) => {
    const O = d(I), H = typeof I == "object" && "secondaryLabel" in I ? I.secondaryLabel : void 0, q = `${R ?? ""}${O}${H ?? ""}`;
    return /* @__PURE__ */ a(
      or,
      {
        value: O,
        onSelect: () => {
          c(I), P(!1);
        },
        "data-checked": !!s && d(s) === O,
        children: /* @__PURE__ */ p("span", { className: "tw:flex-1 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap", children: [
          O,
          H && /* @__PURE__ */ p("span", { className: "tw:text-muted-foreground", children: [
            " · ",
            H
          ] })
        ] })
      },
      q
    );
  };
  return /* @__PURE__ */ p(Cr, { open: C, onOpenChange: P, ...k, children: [
    /* @__PURE__ */ a(Er, { asChild: !0, children: /* @__PURE__ */ p(
      J,
      {
        variant: N,
        role: "combobox",
        "aria-expanded": C,
        "aria-label": y,
        id: t,
        className: b(
          "tw:flex tw:w-[200px] tw:items-center tw:justify-between tw:overflow-hidden",
          o ?? r
        ),
        disabled: h,
        children: [
          /* @__PURE__ */ p("div", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-center tw:overflow-hidden", children: [
            w && /* @__PURE__ */ a("div", { className: "tw:shrink-0 tw:pe-2", children: w }),
            /* @__PURE__ */ a(
              "span",
              {
                className: b(
                  "tw:min-w-0 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap tw:text-start"
                ),
                children: s ? j(s) : u
              }
            )
          ] }),
          /* @__PURE__ */ a(ar, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ a(
      Tr,
      {
        align: m,
        className: b("tw:w-[200px] tw:p-0", n),
        style: i,
        children: /* @__PURE__ */ p(Sr, { children: [
          /* @__PURE__ */ a(
            No,
            {
              placeholder: g,
              className: "tw:text-inherit",
              spaceSelectsHighlightedItem: !0
            }
          ),
          /* @__PURE__ */ a(Co, { children: f }),
          /* @__PURE__ */ a(Rr, { children: z(e) ? e.map((I) => /* @__PURE__ */ a(er, { heading: I.groupHeading, children: I.options.map((R) => D(R, I.groupHeading)) }, I.groupHeading)) : /* @__PURE__ */ a(er, { children: e.map((I) => D(I)) }) })
        ] })
      }
    )
  ] });
}
function zd({
  startChapter: t,
  endChapter: e,
  handleSelectStartChapter: r,
  handleSelectEndChapter: o,
  isDisabled: n = !1,
  chapterCount: i
}) {
  const s = A(
    () => Array.from({ length: i }, (l, w) => w + 1),
    [i]
  );
  return /* @__PURE__ */ p(yt, { children: [
    /* @__PURE__ */ a(gt, { htmlFor: "start-chapters-combobox", children: "Chapters" }),
    /* @__PURE__ */ a(
      vn,
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
    /* @__PURE__ */ a(gt, { htmlFor: "end-chapters-combobox", children: "to" }),
    /* @__PURE__ */ a(
      vn,
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
var vo = /* @__PURE__ */ ((t) => (t.CurrentBook = "current book", t.ChooseBooks = "choose books", t))(vo || {});
((t) => {
  t.CURRENT_BOOK = "current book", t.CHOOSE_BOOKS = "choose books";
})(vo || (vo = {}));
const xh = Object.freeze([
  "%webView_bookSelector_currentBook%",
  "%webView_bookSelector_choose%",
  "%webView_bookSelector_chooseBooks%"
]), Xa = (t, e) => t[e] ?? e;
function yh({
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
  const w = Xa(l, "%webView_bookSelector_currentBook%"), u = Xa(l, "%webView_bookSelector_choose%"), g = Xa(l, "%webView_bookSelector_chooseBooks%"), [f, N] = E(
    "current book"
    /* CurrentBook */
  ), m = (h) => {
    N(h), t(h);
  };
  return /* @__PURE__ */ a(
    Eo,
    {
      className: "pr-twp tw:flex",
      value: f,
      onValueChange: (h) => m(h),
      children: /* @__PURE__ */ p("div", { className: "tw:flex tw:w-full tw:flex-col tw:gap-4", children: [
        /* @__PURE__ */ p("div", { className: "tw:grid tw:grid-cols-[25%_25%_50%]", children: [
          /* @__PURE__ */ p("div", { className: "tw:flex tw:items-center", children: [
            /* @__PURE__ */ a(_a, {
              value: "current book"
              /* CurrentBook */
            }),
            /* @__PURE__ */ a(gt, { className: "tw:ms-1", children: w })
          ] }),
          /* @__PURE__ */ a(gt, { className: "tw:flex tw:items-center", children: e }),
          /* @__PURE__ */ a("div", { className: "tw:flex tw:items-center tw:justify-end", children: /* @__PURE__ */ a(
            zd,
            {
              isDisabled: f === "choose books",
              handleSelectStartChapter: d,
              handleSelectEndChapter: s,
              chapterCount: n,
              startChapter: c,
              endChapter: i
            }
          ) })
        ] }),
        /* @__PURE__ */ p("div", { className: "tw:grid tw:grid-cols-[25%_50%_25%]", children: [
          /* @__PURE__ */ p("div", { className: "tw:flex tw:items-center", children: [
            /* @__PURE__ */ a(_a, {
              value: "choose books"
              /* ChooseBooks */
            }),
            /* @__PURE__ */ a(gt, { className: "tw:ms-1", children: g })
          ] }),
          /* @__PURE__ */ a(gt, { className: "tw:flex tw:items-center", children: o.map((h) => St.bookIdToEnglishName(h)).join(", ") }),
          /* @__PURE__ */ a(
            J,
            {
              disabled: f === "current book",
              onClick: () => r(),
              children: u
            }
          )
        ] })
      ] })
    }
  );
}
const Ti = Or(null);
function Dd(t, e) {
  return { getTheme: function() {
    return e ?? null;
  } };
}
function ke() {
  const t = Qr(Ti);
  return t == null && function(e, ...r) {
    const o = new URL("https://lexical.dev/docs/error"), n = new URLSearchParams();
    n.append("code", e);
    for (const i of r) n.append("v", i);
    throw o.search = n.toString(), Error(`Minified Lexical error #${e}; visit ${o.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
  }(8), t;
}
const Si = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, Id = Si ? Ft : W, la = { tag: Po };
function Md({ initialConfig: t, children: e }) {
  const r = A(() => {
    const { theme: o, namespace: n, nodes: i, onError: s, editorState: c, html: d } = t, l = Dd(null, o), w = ii({ editable: t.editable, html: d, namespace: n, nodes: i, onError: (u) => s(u, w), theme: o });
    return function(u, g) {
      if (g !== null) {
        if (g === void 0) u.update(() => {
          const f = Ke();
          if (f.isEmpty()) {
            const N = ta();
            f.append(N);
            const m = Si ? document.activeElement : null;
            (Ut() !== null || m !== null && m === u.getRootElement()) && N.select();
          }
        }, la);
        else if (g !== null) switch (typeof g) {
          case "string": {
            const f = u.parseEditorState(g);
            u.setEditorState(f, la);
            break;
          }
          case "object":
            u.setEditorState(g, la);
            break;
          case "function":
            u.update(() => {
              Ke().isEmpty() && g(u);
            }, la);
        }
      }
    }(w, c), [w, l];
  }, []);
  return Id(() => {
    const o = t.editable, [n] = r;
    n.setEditable(o === void 0 || o);
  }, []), a(Ti.Provider, { value: r, children: e });
}
const Pd = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Ft : W;
function Ad({ ignoreHistoryMergeTagChange: t = !0, ignoreSelectionChange: e = !1, onChange: r }) {
  const [o] = ke();
  return Pd(() => {
    if (r) return o.registerUpdateListener(({ editorState: n, dirtyElements: i, dirtyLeaves: s, prevEditorState: c, tags: d }) => {
      e && i.size === 0 && s.size === 0 || t && d.has(Po) || c.isEmpty() || r(n, o, d);
    });
  }, [o, t, e, r]), null;
}
const Bo = {
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
  Xl,
  si,
  ci,
  Zl
], $d = Or(null), Za = {
  didCatch: !1,
  error: null
};
class Vd extends mc {
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
      for (var r, o, n = arguments.length, i = new Array(n), s = 0; s < n; s++)
        i[s] = arguments[s];
      (r = (o = this.props).onReset) === null || r === void 0 || r.call(o, {
        args: i,
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
    if (o && r.error !== null && Ld(e.resetKeys, n)) {
      var i, s;
      (i = (s = this.props).onReset) === null || i === void 0 || i.call(s, {
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
        c = uo(o, d);
      else if (n !== void 0)
        c = n;
      else
        throw s;
    }
    return uo($d.Provider, {
      value: {
        didCatch: i,
        error: s,
        resetErrorBoundary: this.resetErrorBoundary
      }
    }, c);
  }
}
function Ld() {
  let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  return t.length !== e.length || t.some((r, o) => !Object.is(r, e[o]));
}
function Bd({ children: t, onError: e }) {
  return a(Vd, { fallback: a("div", { style: { border: "1px solid #f00", color: "#f00", padding: "8px" }, children: "An error was thrown." }), onError: e, children: t });
}
const jd = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Ft : W;
function Fd(t) {
  return { initialValueFn: () => t.isEditable(), subscribe: (e) => t.registerEditableListener(e) };
}
function Ud() {
  return function(t) {
    const [e] = ke(), r = A(() => t(e), [e, t]), [o, n] = E(() => r.initialValueFn()), i = U(o);
    return jd(() => {
      const { initialValueFn: s, subscribe: c } = r, d = s();
      return i.current !== d && (i.current = d, n(d)), c((l) => {
        i.current = l, n(l);
      });
    }, [r, t]), o;
  }(Fd);
}
function Kd(t, e) {
  const r = t.getRootElement();
  if (r === null) return [];
  const o = r.getBoundingClientRect(), n = getComputedStyle(r), i = parseFloat(n.paddingLeft) + parseFloat(n.paddingRight), s = Array.from(e.getClientRects());
  let c, d = s.length;
  s.sort((l, w) => {
    const u = l.top - w.top;
    return Math.abs(u) <= 3 ? l.left - w.left : u;
  });
  for (let l = 0; l < d; l++) {
    const w = s[l], u = c && c.top <= w.top && c.top + c.height > w.top && c.left + c.width > w.left, g = w.width + i === o.width;
    u || g ? (s.splice(l--, 1), d--) : c = w;
  }
  return s;
}
function Sa(t, ...e) {
  const r = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const n of e) o.append("v", n);
  throw r.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
const Ri = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, Hd = Ri && "documentMode" in document ? document.documentMode : null;
!(!Ri || !("InputEvent" in window) || Hd) && "getTargetRanges" in new window.InputEvent("input");
function be(t) {
  return `${t}px`;
}
const Gd = { attributes: !0, characterData: !0, childList: !0, subtree: !0 };
function qd(t, e, r) {
  let o = null, n = null, i = null, s = [];
  const c = document.createElement("div");
  function d() {
    o === null && Sa(182), n === null && Sa(183);
    const { left: u, top: g } = n.getBoundingClientRect(), f = Kd(t, e);
    var N, m;
    c.isConnected || (m = c, (N = n).insertBefore(m, N.firstChild));
    let h = !1;
    for (let y = 0; y < f.length; y++) {
      const k = f[y], C = s[y] || document.createElement("div"), P = C.style;
      P.position !== "absolute" && (P.position = "absolute", h = !0);
      const j = be(k.left - u);
      P.left !== j && (P.left = j, h = !0);
      const z = be(k.top - g);
      P.top !== z && (C.style.top = z, h = !0);
      const D = be(k.width);
      P.width !== D && (C.style.width = D, h = !0);
      const I = be(k.height);
      P.height !== I && (C.style.height = I, h = !0), C.parentNode !== c && (c.append(C), h = !0), s[y] = C;
    }
    for (; s.length > f.length; ) s.pop();
    h && r(s);
  }
  function l() {
    n = null, o = null, i !== null && i.disconnect(), i = null, c.remove();
    for (const u of s) u.remove();
    s = [];
  }
  c.style.position = "relative";
  const w = t.registerRootListener(function u() {
    const g = t.getRootElement();
    if (g === null) return l();
    const f = g.parentElement;
    if (!yl(f)) return l();
    l(), o = g, n = f, i = new MutationObserver((N) => {
      const m = t.getRootElement(), h = m && m.parentElement;
      if (m !== o || h !== n) return u();
      for (const y of N) if (!c.contains(y.target)) return d();
    }), i.observe(f, Gd), d();
  });
  return () => {
    w(), l();
  };
}
function bn(t, e, r) {
  if (t.type !== "text" && Yr(e)) {
    const o = e.getDOMSlot(r);
    return [o.element, o.getFirstChildOffset() + t.offset];
  }
  return [xl(r) || r, t.offset];
}
function Wd(t) {
  for (const e of t) {
    const r = e.style;
    r.background !== "Highlight" && (r.background = "Highlight"), r.color !== "HighlightText" && (r.color = "HighlightText"), r.marginTop !== be(-1.5) && (r.marginTop = be(-1.5)), r.paddingTop !== be(4) && (r.paddingTop = be(4)), r.paddingBottom !== be(0) && (r.paddingBottom = be(0));
  }
}
function Yd(t, e = Wd) {
  let r = null, o = null, n = null, i = null, s = null, c = null, d = () => {
  };
  function l(w) {
    w.read(() => {
      const u = Ut();
      if (!xe(u)) return r = null, n = null, i = null, c = null, d(), void (d = () => {
      });
      const [g, f] = function(I) {
        const R = I.getStartEndPoints();
        return I.isBackward() ? [R[1], R[0]] : R;
      }(u), N = g.getNode(), m = N.getKey(), h = g.offset, y = f.getNode(), k = y.getKey(), C = f.offset, P = t.getElementByKey(m), j = t.getElementByKey(k), z = r === null || P !== o || h !== n || m !== r.getKey(), D = i === null || j !== s || C !== c || k !== i.getKey();
      if ((z || D) && P !== null && j !== null) {
        const I = function(R, O, H, q, X, x, Y) {
          const _ = (R._window ? R._window.document : document).createRange();
          return _.setStart(...bn(O, H, q)), _.setEnd(...bn(X, x, Y)), _;
        }(t, g, N, P, f, y, j);
        d(), d = qd(t, I, e);
      }
      r = N, o = P, n = h, i = y, s = j, c = C;
    });
  }
  return l(t.getEditorState()), De(t.registerUpdateListener(({ editorState: w }) => l(w)), () => {
    d();
  });
}
function Xd(t, e) {
  let r = null;
  const o = () => {
    const n = getSelection(), i = n && n.anchorNode, s = t.getRootElement();
    i !== null && s !== null && s.contains(i) ? r !== null && (r(), r = null) : r === null && (r = Yd(t, e));
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
function Zd(t) {
  const e = di(t, (r) => Yr(r) && !r.isInline());
  return Yr(e) || Sa(4, t.__key), e;
}
function Jd(t) {
  const e = Ut() || dl();
  let r;
  if (xe(e)) r = wl(e.focus, "next");
  else {
    if (e != null) {
      const s = e.getNodes(), c = s[s.length - 1];
      c && (r = li(c, "next"));
    }
    r = r || ul(Ke(), "previous").getFlipped().insert(ta());
  }
  const o = Qd(t, r), n = pl(o), i = hl(n) ? gl(n) : o;
  return fl(ml(i)), t.getLatest();
}
function Qd(t, e, r) {
  let o = cn(e, "next");
  for (let n = o; n; n = vl(n, r)) o = n;
  return bl(o) && Sa(283), o.insert(t.isInline() ? ta().append(t) : t), cn(li(t.getLatest(), "next"), e.direction);
}
function tw(t) {
  const e = Ut();
  if (!xe(e)) return !1;
  const r = /* @__PURE__ */ new Set(), o = e.getNodes();
  for (let n = 0; n < o.length; n++) {
    const i = o[n], s = i.getKey();
    if (r.has(s)) continue;
    const c = di(i, (l) => Yr(l) && !l.isInline());
    if (c === null) continue;
    const d = c.getKey();
    c.canIndent() && !r.has(d) && (r.add(d), t(c));
  }
  return r.size > 0;
}
const ew = Symbol.for("preact-signals");
function Aa() {
  if (ze > 1) return void ze--;
  let t, e = !1;
  for (!function() {
    let r = Ra;
    for (Ra = void 0; r !== void 0; ) r.S.v === r.v && (r.S.i = r.i), r = r.o;
  }(); Gr !== void 0; ) {
    let r = Gr;
    for (Gr = void 0, Oa++; r !== void 0; ) {
      const o = r.u;
      if (r.u = void 0, r.f &= -3, !(8 & r.f) && Oi(r)) try {
        r.c();
      } catch (n) {
        e || (t = n, e = !0);
      }
      r = o;
    }
  }
  if (Oa = 0, ze--, e) throw t;
}
function rw(t) {
  if (ze > 0) return t();
  bo = ++aw, ze++;
  try {
    return t();
  } finally {
    Aa();
  }
}
let ot, Gr;
function xn(t) {
  const e = ot;
  ot = void 0;
  try {
    return t();
  } finally {
    ot = e;
  }
}
let Ra, ze = 0, Oa = 0, aw = 0, bo = 0, fa = 0;
function yn(t) {
  if (ot === void 0) return;
  let e = t.n;
  return e === void 0 || e.t !== ot ? (e = { i: 0, S: t, p: ot.s, n: void 0, t: ot, e: void 0, x: void 0, r: e }, ot.s !== void 0 && (ot.s.n = e), ot.s = e, t.n = e, 32 & ot.f && t.S(e), e) : e.i === -1 ? (e.i = 0, e.n !== void 0 && (e.n.p = e.p, e.p !== void 0 && (e.p.n = e.n), e.p = ot.s, e.n = void 0, ot.s.n = e, ot.s = e), e) : void 0;
}
function Vt(t, e) {
  this.v = t, this.i = 0, this.n = void 0, this.t = void 0, this.l = 0, this.W = e == null ? void 0 : e.watched, this.Z = e == null ? void 0 : e.unwatched, this.name = e == null ? void 0 : e.name;
}
function Xr(t, e) {
  return new Vt(t, e);
}
function Oi(t) {
  for (let e = t.s; e !== void 0; e = e.n) if (e.S.i !== e.i || !e.S.h() || e.S.i !== e.i) return !0;
  return !1;
}
function kn(t) {
  for (let e = t.s; e !== void 0; e = e.n) {
    const r = e.S.n;
    if (r !== void 0 && (e.r = r), e.S.n = e, e.i = -1, e.n === void 0) {
      t.s = e;
      break;
    }
  }
}
function zi(t) {
  let e, r = t.s;
  for (; r !== void 0; ) {
    const o = r.p;
    r.i === -1 ? (r.S.U(r), o !== void 0 && (o.n = r.n), r.n !== void 0 && (r.n.p = o)) : e = r, r.S.n = r.r, r.r !== void 0 && (r.r = void 0), r = o;
  }
  t.s = e;
}
function Je(t, e) {
  Vt.call(this, void 0), this.x = t, this.s = void 0, this.g = fa - 1, this.f = 4, this.W = e == null ? void 0 : e.watched, this.Z = e == null ? void 0 : e.unwatched, this.name = e == null ? void 0 : e.name;
}
function ow(t, e) {
  return new Je(t, e);
}
function Di(t) {
  const e = t.m;
  if (t.m = void 0, typeof e == "function") {
    ze++;
    const r = ot;
    ot = void 0;
    try {
      e();
    } catch (o) {
      throw t.f &= -2, t.f |= 8, Fo(t), o;
    } finally {
      ot = r, Aa();
    }
  }
}
function Fo(t) {
  for (let e = t.s; e !== void 0; e = e.n) e.S.U(e);
  t.x = void 0, t.s = void 0, Di(t);
}
function nw(t) {
  if (ot !== this) throw new Error("Out-of-order effect");
  zi(this), ot = t, this.f &= -2, 8 & this.f && Fo(this), Aa();
}
function hr(t, e) {
  this.x = t, this.m = void 0, this.s = void 0, this.u = void 0, this.f = 32, this.name = e == null ? void 0 : e.name;
}
function ye(t, e) {
  const r = new hr(t, e);
  try {
    r.c();
  } catch (n) {
    throw r.d(), n;
  }
  const o = r.d.bind(r);
  return o[Symbol.dispose] = o, o;
}
function Dr(t, e = {}) {
  const r = {};
  for (const o in t) {
    const n = e[o], i = Xr(n === void 0 ? t[o] : n);
    r[o] = i;
  }
  return r;
}
Vt.prototype.brand = ew, Vt.prototype.h = function() {
  return !0;
}, Vt.prototype.S = function(t) {
  const e = this.t;
  e !== t && t.e === void 0 && (t.x = e, this.t = t, e !== void 0 ? e.e = t : xn(() => {
    var r;
    (r = this.W) == null || r.call(this);
  }));
}, Vt.prototype.U = function(t) {
  if (this.t !== void 0) {
    const e = t.e, r = t.x;
    e !== void 0 && (e.x = r, t.e = void 0), r !== void 0 && (r.e = e, t.x = void 0), t === this.t && (this.t = r, r === void 0 && xn(() => {
      var o;
      (o = this.Z) == null || o.call(this);
    }));
  }
}, Vt.prototype.subscribe = function(t) {
  return ye(() => {
    const e = this.value, r = ot;
    ot = void 0;
    try {
      t(e);
    } finally {
      ot = r;
    }
  }, { name: "sub" });
}, Vt.prototype.valueOf = function() {
  return this.value;
}, Vt.prototype.toString = function() {
  return this.value + "";
}, Vt.prototype.toJSON = function() {
  return this.value;
}, Vt.prototype.peek = function() {
  const t = ot;
  ot = void 0;
  try {
    return this.value;
  } finally {
    ot = t;
  }
}, Object.defineProperty(Vt.prototype, "value", { get() {
  const t = yn(this);
  return t !== void 0 && (t.i = this.i), this.v;
}, set(t) {
  if (t !== this.v) {
    if (Oa > 100) throw new Error("Cycle detected");
    (function(e) {
      ze !== 0 && Oa === 0 && e.l !== bo && (e.l = bo, Ra = { S: e, v: e.v, i: e.i, o: Ra });
    })(this), this.v = t, this.i++, fa++, ze++;
    try {
      for (let e = this.t; e !== void 0; e = e.x) e.t.N();
    } finally {
      Aa();
    }
  }
} }), Je.prototype = new Vt(), Je.prototype.h = function() {
  if (this.f &= -3, 1 & this.f) return !1;
  if ((36 & this.f) == 32 || (this.f &= -5, this.g === fa)) return !0;
  if (this.g = fa, this.f |= 1, this.i > 0 && !Oi(this)) return this.f &= -2, !0;
  const t = ot;
  try {
    kn(this), ot = this;
    const e = this.x();
    (16 & this.f || this.v !== e || this.i === 0) && (this.v = e, this.f &= -17, this.i++);
  } catch (e) {
    this.v = e, this.f |= 16, this.i++;
  }
  return ot = t, zi(this), this.f &= -2, !0;
}, Je.prototype.S = function(t) {
  if (this.t === void 0) {
    this.f |= 36;
    for (let e = this.s; e !== void 0; e = e.n) e.S.S(e);
  }
  Vt.prototype.S.call(this, t);
}, Je.prototype.U = function(t) {
  if (this.t !== void 0 && (Vt.prototype.U.call(this, t), this.t === void 0)) {
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
  const t = yn(this);
  if (this.h(), t !== void 0 && (t.i = this.i), 16 & this.f) throw this.v;
  return this.v;
} }), hr.prototype.c = function() {
  const t = this.S();
  try {
    if (8 & this.f || this.x === void 0) return;
    const e = this.x();
    typeof e == "function" && (this.m = e);
  } finally {
    t();
  }
}, hr.prototype.S = function() {
  if (1 & this.f) throw new Error("Cycle detected");
  this.f |= 1, this.f &= -9, Di(this), kn(this), ze++;
  const t = ot;
  return ot = this, nw.bind(this, t);
}, hr.prototype.N = function() {
  2 & this.f || (this.f |= 2, this.u = Gr, Gr = this);
}, hr.prototype.d = function() {
  this.f |= 8, 1 & this.f || Fo(this);
}, hr.prototype.dispose = function() {
  this.d();
};
te({ build: (t, e, r) => Dr(e), config: sr({ defaultSelection: "rootEnd", disabled: !1 }), name: "@lexical/extension/AutoFocus", register(t, e, r) {
  const o = r.getOutput();
  return ye(() => o.disabled.value ? void 0 : t.registerRootListener((n) => {
    t.focus(() => {
      const i = document.activeElement;
      n === null || i !== null && n.contains(i) || n.focus({ preventScroll: !0 });
    }, { defaultSelection: o.defaultSelection.peek() });
  }));
} });
function Ii() {
  const t = Ke(), e = Ut(), r = ta();
  t.clear(), t.append(r), e !== null && r.select(), xe(e) && (e.format = 0);
}
function Mi(t, e = Ii) {
  return t.registerCommand(wi, (r) => (t.update(e), !0), Ao);
}
te({ build: (t, e, r) => Dr(e), config: sr({ $onClear: Ii }), name: "@lexical/extension/ClearEditor", register(t, e, r) {
  const { $onClear: o } = r.getOutput();
  return ye(() => Mi(t, o.value));
} });
function iw(t) {
  return (typeof t.nodes == "function" ? t.nodes() : t.nodes) || [];
}
const Ja = _l("format", { parse: (t) => typeof t == "number" ? t : 0 });
class Pi extends po {
  $config() {
    return this.config("decorator-text", { extends: po, stateConfigs: [{ flat: !0, stateConfig: Ja }] });
  }
  getFormat() {
    return Pl(this, Ja);
  }
  getFormatFlags(e, r) {
    return ln(this.getFormat(), e, r);
  }
  hasFormat(e) {
    const r = Al[e];
    return (this.getFormat() & r) !== 0;
  }
  setFormat(e) {
    return $l(this, Ja, e);
  }
  toggleFormat(e) {
    const r = this.getFormat(), o = ln(r, e, null);
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
function sw(t) {
  return t instanceof Pi;
}
te({ name: "@lexical/extension/DecoratorText", nodes: () => [Pi], register: (t, e, r) => t.registerCommand(ui, (o) => {
  const n = Ut();
  if (pi(n) || xe(n)) for (const i of n.getNodes()) sw(i) && i.toggleFormat(o);
  return !1;
}, hi) });
function Ai(t, e) {
  let r;
  return Xr(t(), { unwatched() {
    r && (r(), r = void 0);
  }, watched() {
    this.value = t(), r = e(this);
  } });
}
const xo = te({ build: (t) => Ai(() => t.getEditorState(), (e) => t.registerUpdateListener((r) => {
  e.value = r.editorState;
})), name: "@lexical/extension/EditorState" });
function nt(t, ...e) {
  const r = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const n of e) o.append("v", n);
  throw r.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
function $i(t, e) {
  if (t && e && !Array.isArray(e) && typeof t == "object" && typeof e == "object") {
    const r = t, o = e;
    for (const n in o) r[n] = $i(r[n], o[n]);
    return t;
  }
  return e;
}
const Uo = 0, yo = 1, Vi = 2, Qa = 3, da = 4, pr = 5, to = 6, Lr = 7;
function eo(t) {
  return t.id === Uo;
}
function Li(t) {
  return t.id === Vi;
}
function cw(t) {
  return function(e) {
    return e.id === yo;
  }(t) || nt(305, String(t.id), String(yo)), Object.assign(t, { id: Vi });
}
const lw = /* @__PURE__ */ new Set();
class dw {
  constructor(e, r) {
    $t(this, "builder");
    $t(this, "configs");
    $t(this, "_dependency");
    $t(this, "_peerNameSet");
    $t(this, "extension");
    $t(this, "state");
    $t(this, "_signal");
    this.builder = e, this.extension = r, this.configs = /* @__PURE__ */ new Set(), this.state = { id: Uo };
  }
  mergeConfigs() {
    let e = this.extension.config || {};
    const r = this.extension.mergeConfig ? this.extension.mergeConfig.bind(this.extension) : kl;
    for (const o of this.configs) e = r(e, o);
    return e;
  }
  init(e) {
    const r = this.state;
    Li(r) || nt(306, String(r.id));
    const o = { getDependency: this.getInitDependency.bind(this), getDirectDependentNames: this.getDirectDependentNames.bind(this), getPeer: this.getInitPeer.bind(this), getPeerNameSet: this.getPeerNameSet.bind(this) }, n = { ...o, getDependency: this.getDependency.bind(this), getInitResult: this.getInitResult.bind(this), getPeer: this.getPeer.bind(this) }, i = function(c, d, l) {
      return Object.assign(c, { config: d, id: Qa, registerState: l });
    }(r, this.mergeConfigs(), o);
    let s;
    this.state = i, this.extension.init && (s = this.extension.init(e, i.config, o)), this.state = function(c, d, l) {
      return Object.assign(c, { id: da, initResult: d, registerState: l });
    }(i, s, n);
  }
  build(e) {
    const r = this.state;
    let o;
    r.id !== da && nt(307, String(r.id), String(pr)), this.extension.build && (o = this.extension.build(e, r.config, r.registerState));
    const n = { ...r.registerState, getOutput: () => o, getSignal: this.getSignal.bind(this) };
    this.state = function(i, s, c) {
      return Object.assign(i, { id: pr, output: s, registerState: c });
    }(r, o, n);
  }
  register(e, r) {
    this._signal = r;
    const o = this.state;
    o.id !== pr && nt(308, String(o.id), String(pr));
    const n = this.extension.register && this.extension.register(e, o.config, o.registerState);
    return this.state = function(i) {
      return Object.assign(i, { id: to });
    }(o), () => {
      const i = this.state;
      i.id !== Lr && nt(309, String(o.id), String(Lr)), this.state = function(s) {
        return Object.assign(s, { id: pr });
      }(i), n && n();
    };
  }
  afterRegistration(e) {
    const r = this.state;
    let o;
    return r.id !== to && nt(310, String(r.id), String(to)), this.extension.afterRegistration && (o = this.extension.afterRegistration(e, r.config, r.registerState)), this.state = function(n) {
      return Object.assign(n, { id: Lr });
    }(r), o;
  }
  getSignal() {
    return this._signal === void 0 && nt(311), this._signal;
  }
  getInitResult() {
    this.extension.init === void 0 && nt(312, this.extension.name);
    const e = this.state;
    return function(r) {
      return r.id >= da;
    }(e) || nt(313, String(e.id), String(da)), e.initResult;
  }
  getInitPeer(e) {
    const r = this.builder.extensionNameMap.get(e);
    return r ? r.getExtensionInitDependency() : void 0;
  }
  getExtensionInitDependency() {
    const e = this.state;
    return function(r) {
      return r.id >= Qa;
    }(e) || nt(314, String(e.id), String(Qa)), { config: e.config };
  }
  getPeer(e) {
    const r = this.builder.extensionNameMap.get(e);
    return r ? r.getExtensionDependency() : void 0;
  }
  getInitDependency(e) {
    const r = this.builder.getExtensionRep(e);
    return r === void 0 && nt(315, this.extension.name, e.name), r.getExtensionInitDependency();
  }
  getDependency(e) {
    const r = this.builder.getExtensionRep(e);
    return r === void 0 && nt(315, this.extension.name, e.name), r.getExtensionDependency();
  }
  getState() {
    const e = this.state;
    return function(r) {
      return r.id >= Lr;
    }(e) || nt(316, String(e.id), String(Lr)), e;
  }
  getDirectDependentNames() {
    return this.builder.incomingEdges.get(this.extension.name) || lw;
  }
  getPeerNameSet() {
    let e = this._peerNameSet;
    return e || (e = new Set((this.extension.peerDependencies || []).map(([r]) => r)), this._peerNameSet = e), e;
  }
  getExtensionDependency() {
    if (!this._dependency) {
      const e = this.state;
      (function(r) {
        return r.id >= pr;
      })(e) || nt(317, this.extension.name), this._dependency = { config: e.config, init: e.initResult, output: e.output };
    }
    return this._dependency;
  }
}
const _n = { tag: Po };
function ww() {
  const t = Ke();
  t.isEmpty() && t.append(ta());
}
const uw = te({ config: sr({ setOptions: _n, updateOptions: _n }), init: ({ $initialEditorState: t = ww }) => ({ $initialEditorState: t, initialized: !1 }), afterRegistration(t, { updateOptions: e, setOptions: r }, o) {
  const n = o.getInitResult();
  if (!n.initialized) {
    n.initialized = !0;
    const { $initialEditorState: i } = n;
    if (Tl(i)) t.setEditorState(i, r);
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
}, name: "@lexical/extension/InitialState", nodes: [Nl, ci, Cl, El, si] }), Nn = Symbol.for("@lexical/extension/LexicalBuilder");
function Cn() {
}
function pw(t) {
  throw t;
}
function wa(t) {
  return Array.isArray(t) ? t : [t];
}
const ro = "0.43.0+prod.esm";
class vr {
  constructor(e) {
    $t(this, "roots");
    $t(this, "extensionNameMap");
    $t(this, "outgoingConfigEdges");
    $t(this, "incomingEdges");
    $t(this, "conflicts");
    $t(this, "_sortedExtensionReps");
    $t(this, "PACKAGE_VERSION");
    this.outgoingConfigEdges = /* @__PURE__ */ new Map(), this.incomingEdges = /* @__PURE__ */ new Map(), this.extensionNameMap = /* @__PURE__ */ new Map(), this.conflicts = /* @__PURE__ */ new Map(), this.PACKAGE_VERSION = ro, this.roots = e;
    for (const r of e) this.addExtension(r);
  }
  static fromExtensions(e) {
    const r = [wa(uw)];
    for (const o of e) r.push(wa(o));
    return new vr(r);
  }
  static maybeFromEditor(e) {
    const r = e[Nn];
    return r && (r.PACKAGE_VERSION !== ro && nt(292, r.PACKAGE_VERSION, ro), r instanceof vr || nt(293)), r;
  }
  static fromEditor(e) {
    const r = vr.maybeFromEditor(e);
    return r === void 0 && nt(294), r;
  }
  constructEditor() {
    const { $initialEditorState: e, onError: r, ...o } = this.buildCreateEditorArgs(), n = Object.assign(ii({ ...o, ...r ? { onError: (i) => {
      r(i, n);
    } } : {} }), { [Nn]: this });
    for (const i of this.sortedExtensionReps()) i.build(n);
    return n;
  }
  buildEditor() {
    let e = Cn;
    function r() {
      try {
        e();
      } finally {
        e = Cn;
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
    if (r) return r.extension !== e && nt(295, e.name), r;
  }
  addEdge(e, r, o) {
    const n = this.outgoingConfigEdges.get(e);
    n ? n.set(r, o) : this.outgoingConfigEdges.set(e, /* @__PURE__ */ new Map([[r, o]]));
    const i = this.incomingEdges.get(r);
    i ? i.add(e) : this.incomingEdges.set(r, /* @__PURE__ */ new Set([e]));
  }
  addExtension(e) {
    this._sortedExtensionReps !== void 0 && nt(296);
    const r = wa(e), [o] = r;
    typeof o.name != "string" && nt(297, typeof o.name);
    let n = this.extensionNameMap.get(o.name);
    if (n !== void 0 && n.extension !== o && nt(298, o.name), !n) {
      n = new dw(this, o), this.extensionNameMap.set(o.name, n);
      const i = this.conflicts.get(o.name);
      typeof i == "string" && nt(299, o.name, i);
      for (const s of o.conflictsWith || []) this.extensionNameMap.has(s) && nt(299, o.name, s), this.conflicts.set(s, o.name);
      for (const s of o.dependencies || []) {
        const c = wa(s);
        this.addEdge(o.name, c[0].name, c.slice(1)), this.addExtension(c);
      }
      for (const [s, c] of o.peerDependencies || []) this.addEdge(o.name, s, c ? [c] : []);
    }
  }
  sortedExtensionReps() {
    if (this._sortedExtensionReps) return this._sortedExtensionReps;
    const e = [], r = (o, n) => {
      let i = o.state;
      if (Li(i)) return;
      const s = o.extension.name;
      var c;
      eo(i) || nt(300, s, n || "[unknown]"), eo(c = i) || nt(304, String(c.id), String(Uo)), i = Object.assign(c, { id: yo }), o.state = i;
      const d = this.outgoingConfigEdges.get(s);
      if (d) for (const l of d.keys()) {
        const w = this.extensionNameMap.get(l);
        w && r(w, s);
      }
      i = cw(i), o.state = i, e.push(o);
    };
    for (const o of this.extensionNameMap.values()) eo(o.state) && r(o);
    for (const o of e) for (const [n, i] of this.outgoingConfigEdges.get(o.extension.name) || []) if (i.length > 0) {
      const s = this.extensionNameMap.get(n);
      if (s) for (const c of i) s.configs.add(c);
    }
    for (const [o, ...n] of this.roots) if (n.length > 0) {
      const i = this.extensionNameMap.get(o.name);
      i === void 0 && nt(301, o.name);
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
    return De(...n);
  }
  buildCreateEditorArgs() {
    const e = {}, r = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map(), i = {}, s = {}, c = this.sortedExtensionReps();
    for (const w of c) {
      const { extension: u } = w;
      if (u.onError !== void 0 && (e.onError = u.onError), u.disableEvents !== void 0 && (e.disableEvents = u.disableEvents), u.parentEditor !== void 0 && (e.parentEditor = u.parentEditor), u.editable !== void 0 && (e.editable = u.editable), u.namespace !== void 0 && (e.namespace = u.namespace), u.$initialEditorState !== void 0 && (e.$initialEditorState = u.$initialEditorState), u.nodes) for (const g of iw(u)) {
        if (typeof g != "function") {
          const f = o.get(g.replace);
          f && nt(302, u.name, g.replace.name, f.extension.name), o.set(g.replace, w);
        }
        r.add(g);
      }
      if (u.html) {
        if (u.html.export) for (const [g, f] of u.html.export.entries()) n.set(g, f);
        u.html.import && Object.assign(i, u.html.import);
      }
      u.theme && $i(s, u.theme);
    }
    Object.keys(s).length > 0 && (e.theme = s), r.size && (e.nodes = [...r]);
    const d = Object.keys(i).length > 0, l = n.size > 0;
    (d || l) && (e.html = {}, d && (e.html.import = i), l && (e.html.export = n));
    for (const w of c) w.init(e);
    return e.onError || (e.onError = pw), e;
  }
}
const hw = /* @__PURE__ */ new Set(), En = te({ build(t, e, r) {
  const o = r.getDependency(xo).output, n = Xr({ watchedNodeKeys: /* @__PURE__ */ new Map() }), i = Ai(() => {
  }, () => ye(() => {
    const s = i.peek(), { watchedNodeKeys: c } = n.value;
    let d, l = !1;
    o.value.read(() => {
      if (Ut()) for (const [w, u] of c.entries()) {
        if (u.size === 0) {
          c.delete(w);
          continue;
        }
        const g = Ll(w), f = g && g.isSelected() || !1;
        l = l || f !== (!!s && s.has(w)), f && (d = d || /* @__PURE__ */ new Set(), d.add(w));
      }
    }), !l && d && s && d.size === s.size || (i.value = d);
  }));
  return { watchNodeKey: function(s) {
    const c = ow(() => (i.value || hw).has(s)), { watchedNodeKeys: d } = n.peek();
    let l = d.get(s);
    const w = l !== void 0;
    return l = l || /* @__PURE__ */ new Set(), l.add(c), w || (d.set(s, l), n.value = { watchedNodeKeys: d }), c;
  } };
}, dependencies: [xo], name: "@lexical/extension/NodeSelection" }), gw = Sl("INSERT_HORIZONTAL_RULE_COMMAND");
class xr extends po {
  static getType() {
    return "horizontalrule";
  }
  static clone(e) {
    return new xr(e.__key);
  }
  static importJSON(e) {
    return Ko().updateFromJSON(e);
  }
  static importDOM() {
    return { hr: () => ({ conversion: fw, priority: 0 }) };
  }
  exportDOM() {
    return { element: document.createElement("hr") };
  }
  createDOM(e) {
    const r = document.createElement("hr");
    return gi(r, e.theme.hr), r;
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
function fw() {
  return { node: Ko() };
}
function Ko() {
  return Vl(xr);
}
function mw(t) {
  return t instanceof xr;
}
te({ dependencies: [xo, En], name: "@lexical/extension/HorizontalRule", nodes: () => [xr], register(t, e, r) {
  const { watchNodeKey: o } = r.getDependency(En).output, n = Xr({ nodeSelections: /* @__PURE__ */ new Map() }), i = t._config.theme.hrSelected ?? "selected";
  return De(t.registerCommand(gw, (s) => {
    const c = Ut();
    if (!xe(c)) return !1;
    if (c.focus.getNode() !== null) {
      const d = Ko();
      Jd(d);
    }
    return !0;
  }, Ao), t.registerCommand(Rl, (s) => {
    if (Ol(s.target)) {
      const c = zl(s.target);
      if (mw(c)) return function(d, l = !1) {
        const w = Ut(), u = d.isSelected(), g = d.getKey();
        let f;
        l && pi(w) ? f = w : (f = Dl(), Il(f)), u ? f.delete(g) : f.add(g);
      }(c, s.shiftKey), !0;
    }
    return !1;
  }, hi), t.registerMutationListener(xr, (s, c) => {
    rw(() => {
      let d = !1;
      const { nodeSelections: l } = n.peek();
      for (const [w, u] of s.entries()) if (u === "destroyed") l.delete(w), d = !0;
      else {
        const g = l.get(w), f = t.getElementByKey(w);
        g ? g.domNode.value = f : (d = !0, l.set(w, { domNode: Xr(f), selectedSignal: o(w) }));
      }
      d && (n.value = { nodeSelections: l });
    });
  }), ye(() => {
    const s = [];
    for (const { domNode: c, selectedSignal: d } of n.value.nodeSelections.values()) s.push(ye(() => {
      const l = c.value;
      l && (d.value ? gi(l, i) : Bl(l, i));
    }));
    return De(...s);
  }));
} });
te({ build: (t, e) => Dr({ inheritEditableFromParent: e.inheritEditableFromParent }), config: sr({ $getParentEditor: function() {
  const t = Ml();
  return vr.fromEditor(t), t;
}, inheritEditableFromParent: !1 }), init: (t, e, r) => {
  const o = e.$getParentEditor();
  t.parentEditor = o, t.theme = t.theme || o._config.theme;
}, name: "@lexical/extension/NestedEditor", register: (t, e, r) => ye(() => {
  const o = t._parentEditor;
  if (o && r.getOutput().inheritEditableFromParent.value) return t.setEditable(o.isEditable()), o.registerEditableListener(t.setEditable.bind(t));
}) });
te({ build: (t, e, r) => Dr(e), config: sr({ disabled: !1, onReposition: void 0 }), name: "@lexical/utils/SelectionAlwaysOnDisplay", register: (t, e, r) => {
  const o = r.getOutput();
  return ye(() => {
    if (!o.disabled.value) return Xd(t, o.onReposition.value);
  });
} });
function Bi(t) {
  return t.canBeEmpty();
}
function vw(t, e, r = Bi) {
  return De(t.registerCommand(jl, (o) => {
    const n = Ut();
    if (!xe(n)) return !1;
    o.preventDefault();
    const i = function(s) {
      if (s.getNodes().filter((g) => Fl(g) && g.canIndent()).length > 0) return !0;
      const c = s.anchor, d = s.focus, l = d.isBefore(c) ? d : c, w = l.getNode(), u = Zd(w);
      if (u.canIndent()) {
        const g = u.getKey();
        let f = Ul();
        if (f.anchor.set(g, 0, "element"), f.focus.set(g, 0, "element"), f = Kl(f), f.anchor.is(l)) return !0;
      }
      return !1;
    }(n) ? o.shiftKey ? Hl : dn : Gl;
    return t.dispatchCommand(i, void 0);
  }, Ao), t.registerCommand(dn, () => {
    const o = typeof e == "number" ? e : e ? e.peek() : null, n = Ut();
    if (!xe(n)) return !1;
    const i = typeof r == "function" ? r : r.peek();
    return tw((s) => {
      if (i(s)) {
        const c = s.getIndent() + 1;
        (!o || c < o) && s.setIndent(c);
      }
    });
  }, $o));
}
te({ build: (t, e, r) => Dr(e), config: sr({ $canIndent: Bi, disabled: !1, maxIndent: null }), name: "@lexical/extension/TabIndentation", register(t, e, r) {
  const { disabled: o, maxIndent: n, $canIndent: i } = r.getOutput();
  return ye(() => {
    if (!o.value) return vw(t, n, i);
  });
} });
const bw = te({ name: "@lexical/react/ReactProvider" });
function xw() {
  return Ke().getTextContent();
}
function yw(t, e = !0) {
  if (t) return !1;
  let r = xw();
  return e && (r = r.trim()), r === "";
}
function kw(t) {
  if (!yw(t, !1)) return !1;
  const e = Ke().getChildren(), r = e.length;
  if (r > 1) return !1;
  for (let o = 0; o < r; o++) {
    const n = e[o];
    if (ql(n)) return !1;
    if (Yr(n)) {
      if (!Wl(n) || n.__indent !== 0) return !1;
      const i = n.getChildren(), s = i.length;
      for (let c = 0; c < s; c++) {
        const d = i[o];
        if (!ho(d)) return !1;
      }
    }
  }
  return !0;
}
function ji(t) {
  return () => kw(t);
}
function Fi(t) {
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
            const [l, w, u, g, f] = d;
            t.update(() => {
              const N = Ut();
              if (xe(N)) {
                const m = N.anchor;
                let h = m.getNode(), y = 0, k = 0;
                if (ho(h) && l >= 0 && w >= 0 && (y = l, k = l + w, N.setTextNodeRange(h, y, h, k)), y === k && u === "" || (N.insertRawText(u), h = m.getNode()), ho(h)) {
                  y = g, k = g + f;
                  const C = h.getTextContentSize();
                  y = y > C ? C : y, k = k > C ? C : k, N.setTextNodeRange(h, y, h, k);
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
te({ build: (t, e, r) => Dr(e), config: sr({ disabled: typeof window > "u" }), name: "@lexical/dragon", register: (t, e, r) => ye(() => r.getOutput().disabled.value ? void 0 : Fi(t)) });
function _w(t, ...e) {
  const r = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const n of e) o.append("v", n);
  throw r.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
const Ho = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Ft : W;
function Nw({ editor: t, ErrorBoundary: e }) {
  return function(r, o) {
    const [n, i] = E(() => r.getDecorators());
    return Ho(() => r.registerDecoratorListener((s) => {
      Ql(() => {
        i(s);
      });
    }), [r]), W(() => {
      i(r.getDecorators());
    }, [r]), A(() => {
      const s = [], c = Object.keys(n);
      for (let d = 0; d < c.length; d++) {
        const l = c[d], w = a(o, { onError: (g) => r._onError(g), children: a(vc, { fallback: null, children: n[l] }) }), u = r.getElementByKey(l);
        u !== null && s.push(td(w, u, l));
      }
      return s;
    }, [o, n, r]);
  }(t, e);
}
function Cw({ editor: t, ErrorBoundary: e }) {
  return function(r) {
    const o = vr.maybeFromEditor(r);
    if (o && o.hasExtensionByName(bw.name)) {
      for (const n of ["@lexical/plain-text", "@lexical/rich-text"]) o.hasExtensionByName(n) && _w(320, n);
      return !0;
    }
    return !1;
  }(t) ? null : a(Nw, { editor: t, ErrorBoundary: e });
}
function Tn(t) {
  return t.getEditorState().read(ji(t.isComposing()));
}
function Ew({ contentEditable: t, placeholder: e = null, ErrorBoundary: r }) {
  const [o] = ke();
  return function(n) {
    Ho(() => De(Jl(n), Fi(n)), [n]);
  }(o), p(yt, { children: [t, a(Tw, { content: e }), a(Cw, { editor: o, ErrorBoundary: r })] });
}
function Tw({ content: t }) {
  const [e] = ke(), r = function(n) {
    const [i, s] = E(() => Tn(n));
    return Ho(() => {
      function c() {
        const d = Tn(n);
        s(d);
      }
      return c(), De(n.registerUpdateListener(() => {
        c();
      }), n.registerEditableListener(() => {
        c();
      }));
    }, [n]), i;
  }(e), o = Ud();
  return r ? typeof t == "function" ? t(o) : t : null;
}
function Sw({ defaultSelection: t }) {
  const [e] = ke();
  return W(() => {
    e.focus(() => {
      const r = document.activeElement, o = e.getRootElement();
      o === null || r !== null && o.contains(r) || o.focus({ preventScroll: !0 });
    }, { defaultSelection: t });
  }, [t, e]), null;
}
const Rw = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Ft : W;
function Ow({ onClear: t }) {
  const [e] = ke();
  return Rw(() => Mi(e, t), [e, t]), null;
}
const Ui = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Ft : W;
function zw({ editor: t, ariaActiveDescendant: e, ariaAutoComplete: r, ariaControls: o, ariaDescribedBy: n, ariaErrorMessage: i, ariaExpanded: s, ariaInvalid: c, ariaLabel: d, ariaLabelledBy: l, ariaMultiline: w, ariaOwns: u, ariaRequired: g, autoCapitalize: f, className: N, id: m, role: h = "textbox", spellCheck: y = !0, style: k, tabIndex: C, "data-testid": P, ...j }, z) {
  const [D, I] = E(t.isEditable()), R = B((H) => {
    H && H.ownerDocument && H.ownerDocument.defaultView ? t.setRootElement(H) : t.setRootElement(null);
  }, [t]), O = A(() => /* @__PURE__ */ function(...H) {
    return (q) => {
      for (const X of H) typeof X == "function" ? X(q) : X != null && (X.current = q);
    };
  }(z, R), [R, z]);
  return Ui(() => (I(t.isEditable()), t.registerEditableListener((H) => {
    I(H);
  })), [t]), a("div", { "aria-activedescendant": D ? e : void 0, "aria-autocomplete": D ? r : "none", "aria-controls": D ? o : void 0, "aria-describedby": n, ...i != null ? { "aria-errormessage": i } : {}, "aria-expanded": D && h === "combobox" ? !!s : void 0, ...c != null ? { "aria-invalid": c } : {}, "aria-label": d, "aria-labelledby": l, "aria-multiline": w, "aria-owns": D ? u : void 0, "aria-readonly": !D || void 0, "aria-required": g, autoCapitalize: f, className: N, contentEditable: D, "data-testid": P, id: m, ref: O, role: h, spellCheck: y, style: k, tabIndex: C, ...j });
}
const Dw = Mo(zw);
function Sn(t) {
  return t.getEditorState().read(ji(t.isComposing()));
}
const Iw = Mo(Mw);
function Mw(t, e) {
  const { placeholder: r, ...o } = t, [n] = ke();
  return p(yt, { children: [a(Dw, { editor: n, ...o, ref: e }), r != null && a(Pw, { editor: n, content: r })] });
}
function Pw({ content: t, editor: e }) {
  const r = function(s) {
    const [c, d] = E(() => Sn(s));
    return Ui(() => {
      function l() {
        const w = Sn(s);
        d(w);
      }
      return l(), De(s.registerUpdateListener(() => {
        l();
      }), s.registerEditableListener(() => {
        l();
      }));
    }, [s]), c;
  }(e), [o, n] = E(e.isEditable());
  if (Ft(() => (n(e.isEditable()), e.registerEditableListener((s) => {
    n(s);
  })), [e]), !r) return null;
  let i = null;
  return typeof t == "function" ? i = t(o) : t !== null && (i = t), i === null ? null : a("div", { "aria-hidden": !0, children: i });
}
function Aw({
  placeholder: t,
  className: e,
  placeholderClassName: r
}) {
  return /* @__PURE__ */ a(
    Iw,
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
const Ki = Or(void 0);
function $w({
  activeEditor: t,
  $updateToolbar: e,
  blockType: r,
  setBlockType: o,
  showModal: n,
  children: i
}) {
  const s = A(
    () => ({
      activeEditor: t,
      $updateToolbar: e,
      blockType: r,
      setBlockType: o,
      showModal: n
    }),
    [t, e, r, o, n]
  );
  return /* @__PURE__ */ a(Ki.Provider, { value: s, children: i });
}
function Hi() {
  const t = Qr(Ki);
  if (!t)
    throw new Error("useToolbarContext must be used within a ToolbarContext provider");
  return t;
}
function Vw() {
  const [t, e] = E(void 0), r = B(() => {
    e(void 0);
  }, []), o = A(() => {
    if (t === void 0)
      return;
    const { title: i, content: s } = t;
    return /* @__PURE__ */ a(so, { open: !0, onOpenChange: r, children: /* @__PURE__ */ p(co, { children: [
      /* @__PURE__ */ a(lo, { children: /* @__PURE__ */ a(wo, { children: i }) }),
      s
    ] }) });
  }, [t, r]), n = B(
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
function Lw({
  children: t
}) {
  const [e] = ke(), [r, o] = E(e), [n, i] = E("paragraph"), [s, c] = Vw(), d = () => {
  };
  return W(() => r.registerCommand(
    fi,
    (l, w) => (o(w), !1),
    $o
  ), [r]), /* @__PURE__ */ p(
    $w,
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
function Bw(t) {
  const [e] = ke(), { activeEditor: r } = Hi();
  W(() => r.registerCommand(
    fi,
    () => {
      const o = Ut();
      return o && t(o), !1;
    },
    $o
  ), [e, t]), W(() => {
    r.getEditorState().read(() => {
      const o = Ut();
      o && t(o);
    });
  }, [r, t]);
}
const jw = Lo(
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
), Gi = Rt.createContext({
  size: "default",
  variant: "default",
  spacing: 0,
  orientation: "horizontal"
});
function qi({
  className: t,
  variant: e,
  size: r,
  spacing: o = 0,
  orientation: n = "horizontal",
  children: i,
  ...s
}) {
  const c = le();
  return /* @__PURE__ */ a(
    mi.Root,
    {
      "data-slot": "toggle-group",
      "data-variant": e,
      "data-size": r,
      "data-spacing": o,
      "data-orientation": n,
      style: { "--gap": o },
      className: b(
        "pr-twp tw:group/toggle-group tw:flex tw:w-fit tw:flex-row tw:items-center tw:gap-[--spacing(var(--gap))] tw:rounded-lg tw:data-[size=sm]:rounded-[min(var(--tw-radius-md),10px)] tw:data-vertical:flex-col tw:data-vertical:items-stretch",
        t
      ),
      dir: c,
      ...s,
      children: /* @__PURE__ */ a(
        Gi.Provider,
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
function ma({
  className: t,
  children: e,
  variant: r = "default",
  size: o = "default",
  ...n
}) {
  const i = Rt.useContext(Gi);
  return /* @__PURE__ */ a(
    mi.Item,
    {
      "data-slot": "toggle-group-item",
      "data-variant": i.variant || r,
      "data-size": i.size || o,
      "data-spacing": i.spacing,
      className: b(
        "tw:shrink-0 tw:group-data-[spacing=0]/toggle-group:rounded-none tw:group-data-[spacing=0]/toggle-group:px-2 tw:focus:z-10 tw:focus-visible:z-10 tw:group-data-[spacing=0]/toggle-group:has-data-[icon=inline-end]:pe-1.5 tw:group-data-[spacing=0]/toggle-group:has-data-[icon=inline-start]:ps-1.5 tw:group-data-horizontal/toggle-group:data-[spacing=0]:first:rounded-s-lg tw:group-data-vertical/toggle-group:data-[spacing=0]:first:rounded-t-lg tw:group-data-horizontal/toggle-group:data-[spacing=0]:last:rounded-e-lg tw:group-data-vertical/toggle-group:data-[spacing=0]:last:rounded-b-lg tw:group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:border-s-0 tw:group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0 tw:group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-s tw:group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t",
        jw({
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
const Rn = [
  { format: "bold", icon: yc, label: "Bold" },
  { format: "italic", icon: kc, label: "Italic" }
  // CUSTOM: TJ removed underline and strikethrough as they are not supported by the current comment
  // data conversion and are not in P9 anyway. We can add these back if we ever get this supported.
  /* { format: 'underline', icon: UnderlineIcon, label: 'Underline' },
  { format: 'strikethrough', icon: StrikethroughIcon, label: 'Strikethrough' }, */
];
function Fw() {
  const { activeEditor: t } = Hi(), [e, r] = E([]), o = B((n) => {
    if (xe(n) || ed(n)) {
      const i = [];
      Rn.forEach(({ format: s }) => {
        n.hasFormat(s) && i.push(s);
      }), r((s) => s.length !== i.length || !i.every((c) => s.includes(c)) ? i : s);
    }
  }, []);
  return Bw(o), /* @__PURE__ */ a(
    qi,
    {
      type: "multiple",
      value: e,
      onValueChange: r,
      variant: "outline",
      size: "sm",
      children: Rn.map(({ format: n, icon: i, label: s }) => /* @__PURE__ */ a(
        ma,
        {
          value: n,
          "aria-label": s,
          onClick: () => {
            t.dispatchCommand(ui, n);
          },
          children: /* @__PURE__ */ a(i, { className: "tw:h-4 tw:w-4" })
        },
        n
      ))
    }
  );
}
const Wi = "data-platform-content-zoom-root", kh = "data-platform-content-zoom-scope", Yi = "data-platform-content-zoom-label", Xi = Or(void 0);
function _h({ area: t, label: e, children: r }) {
  const o = A(
    () => ({
      [Wi]: t ?? "",
      // An empty label names nothing, so it writes no attribute, as on `ContentZoomRoot`.
      ...e ? { [Yi]: e } : {}
    }),
    [t, e]
  );
  return /* @__PURE__ */ a(Xi.Provider, { value: o, children: r });
}
function Ir() {
  return Qr(Xi) ?? {};
}
function Uw({ onClear: t }) {
  const [e] = ke();
  W(() => {
    t && t(() => {
      e.dispatchCommand(wi, void 0);
    });
  }, [e, t]);
}
function Kw({
  placeholder: t = "Start typing ...",
  autoFocus: e = !1,
  onClear: r,
  actions: o
}) {
  const n = Ir(), [, i] = E(void 0);
  return /* @__PURE__ */ p("div", { className: "tw:relative", children: [
    /* @__PURE__ */ a(Lw, { children: () => (
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
          children: /* @__PURE__ */ a(Fw, {})
        }
      )
    ) }),
    /* @__PURE__ */ p("div", { className: "tw:relative", children: [
      /* @__PURE__ */ a(
        Ew,
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
                children: /* @__PURE__ */ a(Aw, { placeholder: t })
              }
            )
          ),
          ErrorBoundary: Bd
        }
      ),
      e && /* @__PURE__ */ a(Sw, { defaultSelection: "rootEnd" }),
      /* @__PURE__ */ a(Uw, { onClear: r }),
      /* @__PURE__ */ a(Ow, {})
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
const Hw = {
  namespace: "commentEditor",
  theme: Bo,
  nodes: jo,
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
    ...Hw,
    ...t ? { editorState: t } : {},
    ...e ? { editorState: JSON.stringify(e) } : {}
  })), w = B(
    (u) => {
      r == null || r(u), o == null || o(u.toJSON());
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
        children: /* @__PURE__ */ a(Md, { initialConfig: l, children: /* @__PURE__ */ p(Jt, { children: [
          /* @__PURE__ */ a(
            Kw,
            {
              placeholder: n,
              autoFocus: i,
              onClear: s,
              actions: d
            }
          ),
          /* @__PURE__ */ a(Ad, { ignoreSelectionChange: !0, onChange: w })
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
function Ji(t) {
  return t ? t.some(
    (e) => e && "text" in e && e.text.trim().length > 0 ? !0 : !e || !("children" in e) ? !1 : Ji(e.children)
  ) : !1;
}
function Wt(t) {
  var e;
  return (e = t == null ? void 0 : t.root) != null && e.children ? Ji(t.root.children) : !1;
}
function Gw(t) {
  if (!t || t.trim() === "")
    throw new Error("Input HTML is empty");
  const e = vi({
    namespace: "EditorUtils",
    theme: Bo,
    nodes: jo,
    onError: (o) => {
      console.error(o);
    }
  });
  let r;
  if (e.update(
    () => {
      const n = new DOMParser().parseFromString(t, "text/html"), i = ad(e, n);
      Ke().clear(), Yl(i);
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
function Da(t) {
  const e = vi({
    namespace: "EditorUtils",
    theme: Bo,
    nodes: jo,
    onError: (n) => {
      console.error(n);
    }
  }), r = e.parseEditorState(JSON.stringify(t));
  e.setEditorState(r);
  let o = "";
  return e.getEditorState().read(() => {
    o = rd(e);
  }), o = o.replace(/\s+style="[^"]*"/g, "").replace(/\s+class="[^"]*"/g, "").replace(/<span>(.*?)<\/span>/g, "$1").replace(/<b><strong[^>]*>(.*?)<\/strong><\/b>/g, "<b>$1</b>").replace(/<strong><b[^>]*>(.*?)<\/b><\/strong>/g, "<b>$1</b>").replace(/<i><em[^>]*>(.*?)<\/em><\/i>/g, "<i>$1</i>").replace(/<em><i[^>]*>(.*?)<\/i><\/em>/g, "<i>$1</i>").replace(/<u><span[^>]*>(.*?)<\/span><\/u>/g, "<u>$1</u>").replace(/<s><span[^>]*>(.*?)<\/span><\/s>/g, "<s>$1</s>").replace(/<br\s*\/?>/gi, "<br/>"), o;
}
function Go(t) {
  return ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Home", "End"].includes(t.key) ? (t.stopPropagation(), !0) : !1;
}
const qw = "verseText", Nh = Object.freeze([
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
function Fr(t) {
  return t !== void 0 && Object.keys(t).length > 0;
}
function On(t) {
  return t.editorState === void 0 && t.assignedUser === void 0 && !Fr(t.commentEdits);
}
const Qi = [
  "tw:prose tw:max-w-none tw:break-words tw:text-sm tw:font-normal tw:text-foreground",
  "tw:[&>blockquote]:border-s-0 tw:[&>blockquote]:p-0 tw:[&>blockquote]:ps-0 tw:[&>blockquote]:font-normal tw:[&>blockquote]:not-italic tw:[&>blockquote]:text-foreground",
  "tw:prose-quoteless"
].join(" ");
function ts(t) {
  return (t == null ? void 0 : t.conflictType) === qw;
}
function es(t) {
  return t === "replaced" ? "reject" : t === "merged" ? "merged" : "accept";
}
function va(t, e) {
  return t === "" ? e["%comment_assign_unassigned%"] ?? "Unassigned" : t === "Team" ? e["%comment_assign_team%"] ?? "Team" : t;
}
function qo(t) {
  const e = Ps();
  return t.key === "Enter" && (e && t.metaKey || !e && t.ctrlKey);
}
function Zt(t, e, r) {
  const o = e[t];
  return o === void 0 || o === t ? r : o;
}
const Ww = {
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
}, Yw = {
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
  const [i, s] = E(Yw), [c, d] = E(n), [l, w] = E(!1), u = U(void 0), g = U(null);
  W(() => {
    let h = !0;
    const y = g.current;
    if (!y) return;
    const k = setTimeout(() => {
      h && Zi(y);
    }, 300);
    return () => {
      h = !1, clearTimeout(k);
    };
  }, []);
  const f = B(() => {
    if (!Wt(i)) return;
    const h = Da(i);
    e(h, c);
  }, [i, e, c]), N = o["%commentEditor_placeholder%"] ?? "Type your comment here...", m = o["%commentEditor_assignTo_label%"] ?? "Assign to";
  return /* @__PURE__ */ p("div", { className: "pr-twp tw:grid tw:gap-3", children: [
    /* @__PURE__ */ p("div", { className: "tw:flex tw:items-center tw:justify-between", children: [
      /* @__PURE__ */ a("span", { className: "tw:text-sm tw:font-medium", children: m }),
      /* @__PURE__ */ a(
        As,
        {
          onCancelClick: r,
          onAcceptClick: f,
          canAccept: Wt(i),
          localizedStrings: o,
          acceptLabel: o["%commentEditor_saveButton_tooltip%"]
        }
      )
    ] }),
    /* @__PURE__ */ a("div", { className: "tw:flex tw:items-center tw:gap-2", children: /* @__PURE__ */ p(Cr, { open: l, onOpenChange: w, children: [
      /* @__PURE__ */ a(Er, { asChild: !0, children: /* @__PURE__ */ p(
        J,
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
        Tr,
        {
          className: "tw:w-auto tw:p-0",
          align: "start",
          onKeyDown: (h) => {
            h.key === "Escape" && (h.stopPropagation(), w(!1));
          },
          children: /* @__PURE__ */ a(Sr, { children: /* @__PURE__ */ a(Rr, { children: t.map((h) => /* @__PURE__ */ a(
            or,
            {
              onSelect: () => {
                d(h || void 0), w(!1);
              },
              className: "tw:flex tw:items-center",
              children: /* @__PURE__ */ a("span", { children: ao(h, o) })
            },
            h || "unassigned"
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
        onKeyDownCapture: (h) => {
          h.key === "Escape" ? (h.preventDefault(), h.stopPropagation(), r()) : qo(h) && (h.preventDefault(), h.stopPropagation(), Wt(i) && f());
        },
        onKeyDown: (h) => {
          Go(h), (h.key === "Enter" || h.key === " ") && h.stopPropagation();
        },
        children: /* @__PURE__ */ a(
          za,
          {
            editorSerializedState: i,
            onSerializedChange: (h) => s(h),
            placeholder: N,
            onClear: (h) => {
              u.current = h;
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
  ...Hn
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
]), Xw = "comment-list";
function Sh(t) {
  return t;
}
function Zw({
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
function Rh({ className: t, ...e }) {
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
function Oh({ className: t, ...e }) {
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
function zh({ className: t, ...e }) {
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
function Jw({ className: t, ...e }) {
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
function Dh({ className: t, ...e }) {
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
function Zr({
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
function Qw({
  className: t,
  size: e = "default",
  ...r
}) {
  return /* @__PURE__ */ a(
    Vo.Root,
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
function Ih({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    Vo.Image,
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
function tu({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    Vo.Fallback,
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
function zn({
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
  const w = Ir(), [u, g] = E(), f = d ?? u, m = f !== void 0 && o, h = l !== void 0, y = B(
    (x) => {
      h || g(x), l == null || l(x);
    },
    [h, l]
  ), k = U(null), C = U(!1);
  W(() => {
    if (!m || !C.current) return;
    C.current = !1;
    let x = !0;
    const Y = k.current;
    if (!Y) return;
    const _ = setTimeout(() => {
      x && Zi(Y);
    }, 300);
    return () => {
      x = !1, clearTimeout(_);
    };
  }, [m]);
  const P = B(
    (x) => {
      x && x.stopPropagation(), y(void 0), s == null || s(!1);
    },
    [s, y]
  ), j = B(
    async (x) => {
      if (x && x.stopPropagation(), !f || !n) return;
      await n(
        t.id,
        Da(f)
      ) && (y(void 0), s == null || s(!1));
    },
    [f, n, t.id, s, y]
  ), z = A(() => {
    const x = new Date(t.date), Y = cc(
      x,
      r["%comment_date_today%"],
      r["%comment_date_yesterday%"]
    ), _ = x.toLocaleTimeString(void 0, {
      hour: "numeric",
      minute: "2-digit"
    });
    return tr(r["%comment_dateAtTime%"], {
      date: Y,
      time: _
    });
  }, [t.date, r]), D = A(() => t.user, [t.user]), I = A(
    () => t.user.split(" ").map((x) => x[0]).join("").toUpperCase().slice(0, 2),
    [t.user]
  ), R = A(() => Io(t.contents), [t.contents]), O = A(
    () => t.contents.replace(/<[^>]*>/g, "").trim().length > 0,
    [t.contents]
  ), H = !!t.conflictResolutionAction && !O, q = A(() => {
    if (o && c)
      return /* @__PURE__ */ p(yt, { children: [
        /* @__PURE__ */ p(
          Be,
          {
            onClick: (x) => {
              x.stopPropagation(), C.current = !0;
              const Y = t.contents.trim() !== "";
              y(Y ? Gw(t.contents) : Ww), s == null || s(!0);
            },
            children: [
              /* @__PURE__ */ a(_c, { className: "tw:me-2 tw:h-4 tw:w-4" }),
              r["%comment_editComment%"]
            ]
          }
        ),
        /* @__PURE__ */ p(
          Be,
          {
            onClick: async (x) => {
              x.stopPropagation(), i && await i(t.id);
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
    y
  ]), X = !Wt(f);
  return /* @__PURE__ */ p(
    "div",
    {
      className: b("tw:flex tw:w-full tw:flex-row tw:items-baseline tw:gap-2", {
        "tw:text-sm": e
      }),
      children: [
        /* @__PURE__ */ a(Qw, { className: "tw:h-8 tw:w-8", children: /* @__PURE__ */ a(tu, { className: "tw:text-xs tw:font-medium", children: I }) }),
        /* @__PURE__ */ p("div", { className: "tw:flex tw:flex-1 tw:flex-col tw:gap-1", children: [
          /* @__PURE__ */ p("div", { className: "tw:flex tw:w-full tw:flex-row tw:flex-wrap tw:items-baseline tw:gap-x-2", children: [
            /* @__PURE__ */ a("p", { className: "tw:text-sm tw:font-medium", children: D }),
            /* @__PURE__ */ a("p", { className: "tw:text-xs tw:font-normal tw:text-muted-foreground", children: z }),
            /* @__PURE__ */ a("div", { className: "tw:flex-1" }),
            e && t.assignedUser !== void 0 && /* @__PURE__ */ p(qr, { variant: "secondary", className: "tw:text-xs tw:font-normal", children: [
              "→ ",
              va(t.assignedUser, r)
            ] })
          ] }),
          m && /* @__PURE__ */ a(
            "div",
            {
              role: "textbox",
              tabIndex: -1,
              className: "tw:flex tw:flex-col tw:gap-2",
              ref: k,
              onKeyDownCapture: (x) => {
                x.key === "Escape" ? (x.preventDefault(), x.stopPropagation(), P()) : qo(x) && (x.preventDefault(), x.stopPropagation(), Wt(f) && j());
              },
              onKeyDown: (x) => {
                Go(x), (x.key === "Enter" || x.key === " ") && x.stopPropagation();
              },
              onClick: (x) => {
                x.stopPropagation();
              },
              children: /* @__PURE__ */ a(
                za,
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
                  onSerializedChange: (x) => y(x),
                  actions: /* @__PURE__ */ p(yt, { children: [
                    /* @__PURE__ */ a("div", { className: "tw:flex-1" }),
                    /* @__PURE__ */ p(kt, { children: [
                      /* @__PURE__ */ a(_t, { asChild: !0, children: /* @__PURE__ */ a(
                        J,
                        {
                          size: "icon-sm",
                          onClick: P,
                          variant: "outline",
                          className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                          "aria-label": Zt(
                            "%comment_aria_cancel_edit%",
                            r,
                            "Cancel edit"
                          ),
                          children: /* @__PURE__ */ a(Cc, {})
                        }
                      ) }),
                      /* @__PURE__ */ a(Nt, { children: Zt(
                        "%comment_aria_cancel_edit%",
                        r,
                        "Cancel edit"
                      ) })
                    ] }),
                    /* @__PURE__ */ p(kt, { children: [
                      /* @__PURE__ */ a(_t, { asChild: !0, children: /* @__PURE__ */ a(
                        Zr,
                        {
                          isDisabled: X,
                          disabledExplanation: Zt(
                            "%comment_aria_save_edit%",
                            r,
                            "Save edit"
                          ),
                          className: "tw:inline-flex",
                          children: /* @__PURE__ */ a(
                            J,
                            {
                              size: "icon-sm",
                              onClick: j,
                              className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                              disabled: X,
                              "aria-label": Zt(
                                "%comment_aria_save_edit%",
                                r,
                                "Save edit"
                              ),
                              children: /* @__PURE__ */ a(ai, {})
                            }
                          )
                        }
                      ) }),
                      /* @__PURE__ */ a(Nt, { children: Zt(
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
          !m && /* @__PURE__ */ p(yt, { children: [
            t.status === "Resolved" && !H && /* @__PURE__ */ a("div", { className: "tw:text-sm tw:italic", children: r["%comment_status_resolved%"] }),
            t.status === "Todo" && e && /* @__PURE__ */ a("div", { className: "tw:text-sm tw:italic", children: r["%comment_status_todo%"] }),
            H ? (
              // A platform-created conflict resolution comment carries an empty body — PT9 renders
              // its banner UI-side from conflictResolutionAction, it never stores text. So render the
              // localized, neutral outcome line here instead of the (empty) contents, styled like the
              // italic status lines above. These are the same neutral keys ConflictNoteCard's Result
              // region used to render inline. Only when the body IS empty: a resolution synced from
              // PT9 can carry the resolver's typed note alongside the action, and PT9 shows that text,
              // so the body branch below keeps it visible rather than discarding it for this banner.
              /* @__PURE__ */ a("div", { className: "tw:text-sm tw:italic", children: es(t.conflictResolutionAction) === "merged" ? r["%conflict_note_outcome_combined%"] ?? "Combined both changes." : r["%conflict_note_outcome_used_other%"] ?? "Used the other change instead of the current text." })
            ) : /* @__PURE__ */ a(
              "div",
              {
                className: b(
                  // Shared note-body prose/blockquote treatment (also used by conflict-diff's
                  // DIFF_HTML_CLASSES). Layer this comment item's own extras on top: items-start +
                  // gap-2 for layout, and line-clamp while the thread is collapsed.
                  Qi,
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
        q && /* @__PURE__ */ p(nr, { children: [
          /* @__PURE__ */ a(Ue, { asChild: !0, children: /* @__PURE__ */ a(J, { variant: "ghost", size: "icon", children: /* @__PURE__ */ a(Ec, {}) }) }),
          /* @__PURE__ */ a(ir, { align: "end", children: q })
        ] })
      ]
    }
  );
}
function rs({
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
        className: b(
          "tw:ms-auto",
          "tw:text-primary tw:transition-opacity tw:duration-200 tw:hover:bg-primary/10",
          "tw:opacity-0 tw:group-hover:opacity-100"
        ),
        onClick: (n) => {
          n.stopPropagation(), r();
        },
        "aria-label": o,
        children: /* @__PURE__ */ a(Ta, { className: "tw:h-4 tw:w-4" })
      }
    );
}
const eu = {
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
}, as = ti(function({
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
  threadStatus: u,
  handleAddCommentToThread: g,
  handleUpdateComment: f,
  handleDeleteComment: N,
  handleReadStatusChange: m,
  assignableUsers: h,
  canUserAddCommentToThread: y,
  canUserAssignThreadCallback: k,
  canUserResolveThreadCallback: C,
  canUserEditOrDeleteCommentCallback: P,
  isRead: j = !1,
  autoReadDelay: z = 5,
  onVerseRefClick: D,
  initialAssignedUser: I,
  activeComments: R,
  rootContentSlot: O,
  resolveActionSlot: H,
  spaceRootContentFromReplies: q = !1,
  draft: X,
  onDraftChange: x
}) {
  var Ze;
  const Y = Ir(), [_, T] = E({}), L = X ?? _, $ = L.editorState ?? eu, K = L.assignedUser, at = x !== void 0, et = U(L);
  et.current = L;
  const G = B(
    (S) => {
      const Q = { ...et.current, ...S };
      et.current = Q, at || T(Q), x == null || x(l, On(Q) ? void 0 : Q);
    },
    [at, x, l]
  ), it = B(
    (S, Q) => {
      const rt = { ...L.commentEdits };
      Q === void 0 ? delete rt[S] : rt[S] = Q, G({
        commentEdits: Fr(rt) ? rt : void 0
      });
    },
    [L.commentEdits, G]
  ), [ct, st] = E(), zt = n, [Dt, Bt] = E(!1), [Me, we] = E(!1), [Ge, ft] = E(!1), [Ct, Kt] = E(!1), [_e, ue] = E(!1), [Et, mt] = E(j), [Pe, qe] = E(!1), Ne = U(void 0), [We, ee] = E(/* @__PURE__ */ new Map());
  W(() => {
    let S = !0;
    return (async () => {
      const rt = C ? await C(l) : !1;
      S && ue(rt);
    })(), () => {
      S = !1;
    };
  }, [l, C]), W(() => {
    let S = !0;
    if (!n) {
      Kt(!1), ee(/* @__PURE__ */ new Map());
      return;
    }
    return (async () => {
      const rt = k ? await k(l) : !1;
      S && Kt(rt);
    })(), () => {
      S = !1;
    };
  }, [n, l, k]);
  const It = U("idle");
  W(() => {
    if (!n) {
      It.current !== "idle" && (G({ assignedUser: void 0 }), st(void 0), It.current = "idle");
      return;
    }
    It.current === "idle" && (It.current = "pending"), Ct ? It.current === "pending" && I !== void 0 && // Skip pre-population if the thread is already assigned to this user — doing so
    // would show "Assigning to: Alice" and enable the submit button for a no-op call.
    I !== s && (G({ assignedUser: I }), It.current = "auto-populated") : It.current === "auto-populated" && (G({ assignedUser: void 0 }), It.current = "pending");
  }, [n, I, Ct, s, G]);
  const re = U(ct);
  re.current = ct;
  const Ce = U(x);
  Ce.current = x;
  const cr = U(l);
  cr.current = l, W(() => () => {
    var Q;
    const { current: S } = et;
    S.assignedUser !== void 0 && S.assignedUser === re.current && S.editorState === void 0 && !Fr(S.commentEdits) && ((Q = Ce.current) == null || Q.call(Ce, cr.current, void 0));
  }, []);
  const M = A(
    () => R ?? r.filter((S) => !S.deleted),
    [R, r]
  ), vt = A(() => {
    const { commentEdits: S } = L;
    if (!S) return S;
    const Q = new Set(M.map((lt) => lt.id)), rt = Object.fromEntries(
      Object.entries(S).filter(([lt]) => Q.has(lt))
    );
    return Fr(rt) ? rt : void 0;
  }, [L, M]), Yt = Me || Fr(vt);
  W(() => {
    let S = !0;
    if (!n || !P) {
      ee(/* @__PURE__ */ new Map());
      return;
    }
    return (async () => {
      const rt = /* @__PURE__ */ new Map();
      await Promise.all(
        M.map(async (lt) => {
          const Ar = await P(lt.id);
          S && rt.set(lt.id, Ar);
        })
      ), S && ee(rt);
    })(), () => {
      S = !1;
    };
  }, [n, M, P]);
  const Mt = A(() => M[0], [M]), ae = U(null), pe = U(void 0), Pt = B(() => {
    var S;
    (S = pe.current) == null || S.call(pe), G({ editorState: void 0 });
  }, [G]), Ae = B(
    (S) => {
      G({ editorState: Wt(S) ? S : void 0 });
    },
    [G]
  ), he = B(() => {
    const S = !Et;
    mt(S), qe(!S), m == null || m(l, S);
  }, [Et, m, l]);
  W(() => {
    Bt(!1);
  }, [n]), W(() => {
    if (n && !Et && !Pe && On(L)) {
      const S = setTimeout(() => {
        mt(!0), m == null || m(l, !0);
      }, z * 1e3);
      return Ne.current = S, () => clearTimeout(S);
    }
    Ne.current && (clearTimeout(Ne.current), Ne.current = void 0);
  }, [
    n,
    Et,
    Pe,
    z,
    l,
    m,
    L
  ]);
  const oe = A(
    () => ({
      singleReply: o["%comment_thread_single_reply%"],
      multipleReplies: o["%comment_thread_multiple_replies%"]
    }),
    [o]
  ), Ht = A(() => {
    if (s === void 0)
      return;
    if (s === "")
      return o["%comment_assign_unassigned%"] ?? "Unassigned";
    const S = va(s, o);
    return tr(o["%comment_assigned_to%"], {
      assignedUser: S
    });
  }, [s, o]), Gt = A(() => M.slice(1), [M]), wt = A(() => Gt.length ?? 0, [Gt.length]), Ee = A(() => wt > 0, [wt]), Te = A(() => {
    if (Dt || wt <= 2)
      return Gt;
    const S = new Set(Gt.slice(-2).map((Q) => Q.id));
    return Gt.filter(
      (Q) => {
        var rt;
        return S.has(Q.id) || ((rt = L.commentEdits) == null ? void 0 : rt[Q.id]) !== void 0;
      }
    );
  }, [Gt, wt, Dt, L.commentEdits]), ge = A(() => Dt || wt <= 2 ? 0 : wt - Te.length, [wt, Dt, Te.length]), Ye = A(
    () => wt === 1 ? oe.singleReply : tr(oe.multipleReplies, { count: wt }),
    [wt, oe]
  ), Xe = A(
    () => ge === 1 ? oe.singleReply : tr(oe.multipleReplies, { count: ge }),
    [ge, oe]
  );
  W(() => {
    !n && Yt && Ee && we(!1);
  }, [n, Yt, Ee]);
  const fe = B(
    async (S) => {
      S && S.stopPropagation();
      const Q = Wt($) ? Da($) : void 0;
      if (K !== void 0) {
        await g({
          threadId: l,
          contents: Q,
          assignedUser: K
        }) && (st(K), Q && Pt());
        return;
      }
      Q && await g({ threadId: l, contents: Q }) && Pt();
    },
    [
      Pt,
      $,
      g,
      K,
      l
    ]
  ), me = B(
    async (S) => {
      const Q = Wt($) ? Da($) : void 0, rt = S.status ? S.assignedUser : K ?? S.assignedUser, lt = await g({
        ...S,
        contents: Q,
        assignedUser: rt
      });
      return lt && (rt !== void 0 && st(rt), Q && Pt()), lt;
    },
    [Pt, $, g, K]
  );
  if (M.length === 0) return;
  const lr = !Ct || !h || h.length === 0 || !h.includes(c), Mr = !Wt($) && (K === void 0 || K === ct), Pr = /* @__PURE__ */ a(
    zn,
    {
      comment: Mt,
      localizedStrings: o,
      isThreadExpanded: n,
      threadStatus: u,
      handleAddCommentToThread: me,
      handleUpdateComment: f,
      handleDeleteComment: N,
      onEditingChange: we,
      canEditOrDelete: (!Yt && We.get(Mt.id)) ?? !1,
      canUserResolveThread: _e,
      draftEditorState: (Ze = L.commentEdits) == null ? void 0 : Ze[Mt.id],
      onDraftEditorStateChange: (S) => it(Mt.id, S)
    }
  );
  return /* @__PURE__ */ a(
    Zw,
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
          "tw:bg-card": u !== "Resolved" && Et,
          "tw:bg-muted": u === "Resolved",
          "tw:bg-accent": !Et && u !== "Resolved"
        }
      ),
      onClick: () => {
        d(l);
      },
      tabIndex: -1,
      children: /* @__PURE__ */ p(Jw, { className: "tw:flex tw:flex-col tw:gap-2 tw:p-0", children: [
        /* @__PURE__ */ p("div", { className: "tw:flex tw:flex-col tw:content-center tw:items-start tw:gap-2", children: [
          /* @__PURE__ */ p("div", { className: "tw:flex tw:items-center tw:gap-2", children: [
            Ht && /* @__PURE__ */ a(qr, { className: "tw:rounded-sm tw:bg-input tw:text-sm tw:font-normal tw:text-primary tw:hover:bg-input", children: Ht }),
            /* @__PURE__ */ a(
              J,
              {
                variant: "ghost",
                size: "icon",
                onClick: (S) => {
                  S.stopPropagation(), he();
                },
                className: "tw:text-muted-foreground tw:transition tw:hover:text-foreground",
                "aria-label": Et ? o["%comment_aria_mark_as_unread%"] ?? "Mark as unread" : o["%comment_aria_mark_as_read%"] ?? "Mark as read",
                children: Et ? /* @__PURE__ */ a(Tc, {}) : /* @__PURE__ */ a(Sc, {})
              }
            ),
            H === void 0 ? (
              // Generic status-resolve check (used by non-conflict threads and, via ConflictThread
              // leaving this slot undefined, by non-verseText conflicts, which resolve through a
              // plain status change). ConflictThread overrides this slot for verseText conflicts.
              /* @__PURE__ */ a(
                rs,
                {
                  show: _e && u !== "Resolved",
                  onClick: () => me({ threadId: l, status: "Resolved" }),
                  ariaLabel: o["%comment_aria_resolve_thread%"] ?? "Resolve thread"
                }
              )
            ) : H
          ] }),
          /* @__PURE__ */ a("div", { className: "tw:flex tw:max-w-full tw:flex-wrap tw:items-baseline tw:gap-2", children: /* @__PURE__ */ p(
            "p",
            {
              ref: ae,
              className: b(
                "tw:flex-1 tw:overflow-hidden tw:text-ellipsis tw:text-sm tw:font-normal tw:text-muted-foreground",
                {
                  "tw:overflow-visible tw:text-clip tw:whitespace-normal tw:break-words": zt
                },
                { "tw:whitespace-nowrap": !zt }
              ),
              children: [
                i && D ? /* @__PURE__ */ a(
                  J,
                  {
                    variant: "ghost",
                    size: "sm",
                    className: "tw:h-auto tw:px-1 tw:py-0 tw:text-sm tw:font-normal tw:text-muted-foreground",
                    onClick: (S) => {
                      S.stopPropagation(), D(w);
                    },
                    children: i
                  }
                ) : i,
                /* @__PURE__ */ p(
                  "span",
                  {
                    className: e,
                    ...Y,
                    children: [
                      Mt.contextBefore,
                      /* @__PURE__ */ a("span", { className: "tw:font-bold", children: Mt.selectedText }),
                      Mt.contextAfter
                    ]
                  }
                )
              ]
            }
          ) }),
          O ?? Pr
        ] }),
        /* @__PURE__ */ p(yt, { children: [
          Ee && !n && /* @__PURE__ */ p("div", { className: "tw:flex tw:items-center tw:gap-5", children: [
            /* @__PURE__ */ a("div", { className: "tw:w-8", children: /* @__PURE__ */ a(Wr, {}) }),
            /* @__PURE__ */ a("p", { className: "tw:text-sm tw:text-muted-foreground", children: Ye })
          ] }),
          !n && Wt($) && /* @__PURE__ */ a(
            za,
            {
              editorSerializedState: $,
              onSerializedChange: Ae,
              placeholder: o["%comment_replyOrAssign%"]
            }
          ),
          n && /* @__PURE__ */ p(yt, { children: [
            q && Te.length > 0 && /* @__PURE__ */ a("div", { className: "tw:h-2", "data-slot": "root-content-reply-gap", "aria-hidden": "true" }),
            ge > 0 && /* @__PURE__ */ p(
              "div",
              {
                className: "tw:flex tw:cursor-pointer tw:items-center tw:gap-5 tw:py-2",
                onClick: (S) => {
                  S.stopPropagation(), Bt(!0);
                },
                role: "button",
                tabIndex: 0,
                onKeyDown: (S) => {
                  (S.key === "Enter" || S.key === " ") && (S.preventDefault(), S.stopPropagation(), Bt(!0));
                },
                children: [
                  /* @__PURE__ */ a("div", { className: "tw:w-8", children: /* @__PURE__ */ a(Wr, {}) }),
                  /* @__PURE__ */ p("div", { className: "tw:flex tw:items-center tw:gap-2", children: [
                    /* @__PURE__ */ a("p", { className: "tw:text-sm tw:text-muted-foreground", children: Xe }),
                    Dt ? /* @__PURE__ */ a(ei, {}) : /* @__PURE__ */ a(ar, {})
                  ] })
                ]
              }
            ),
            Te.map((S) => {
              var Q;
              return /* @__PURE__ */ a("div", { children: /* @__PURE__ */ a(
                zn,
                {
                  comment: S,
                  localizedStrings: o,
                  isReply: !0,
                  isThreadExpanded: n,
                  handleUpdateComment: f,
                  handleDeleteComment: N,
                  onEditingChange: we,
                  canEditOrDelete: (!Yt && We.get(S.id)) ?? !1,
                  draftEditorState: (Q = L.commentEdits) == null ? void 0 : Q[S.id],
                  onDraftEditorStateChange: (rt) => it(S.id, rt)
                }
              ) }, S.id);
            }),
            y !== !1 && (!Yt || Wt($)) && /* @__PURE__ */ a(
              "div",
              {
                role: "textbox",
                tabIndex: -1,
                className: "tw:w-full tw:space-y-2",
                onClick: (S) => S.stopPropagation(),
                onKeyDownCapture: (S) => {
                  qo(S) && (S.preventDefault(), S.stopPropagation(), (Wt($) || K !== void 0 && K !== ct) && fe());
                },
                onKeyDown: (S) => {
                  Go(S), (S.key === "Enter" || S.key === " ") && S.stopPropagation();
                },
                children: /* @__PURE__ */ a(
                  za,
                  {
                    editorSerializedState: $,
                    onSerializedChange: Ae,
                    placeholder: u === "Resolved" ? o["%comment_reopenResolved%"] : o["%comment_replyOrAssign%"],
                    autoFocus: !0,
                    onClear: (S) => {
                      pe.current = S;
                    },
                    actions: /* @__PURE__ */ p(yt, { children: [
                      K !== void 0 && (Wt($) || K !== ct) ? /* @__PURE__ */ a("span", { className: "tw:flex-1 tw:text-sm tw:text-muted-foreground", children: tr(
                        Zt(
                          "%comment_assigning_to%",
                          o,
                          "Assigning to: {assignedUser}"
                        ),
                        {
                          assignedUser: va(
                            K,
                            o
                          )
                        }
                      ) }) : /* @__PURE__ */ a("div", { className: "tw:flex-1" }),
                      /* @__PURE__ */ p(Cr, { open: Ge, onOpenChange: ft, children: [
                        /* @__PURE__ */ p(kt, { children: [
                          /* @__PURE__ */ a(_t, { asChild: !0, children: /* @__PURE__ */ a(
                            Zr,
                            {
                              isDisabled: lr,
                              disabledExplanation: Zt(
                                "%comment_aria_assign_user%",
                                o,
                                "Assign user"
                              ),
                              children: /* @__PURE__ */ a(Er, { asChild: !0, children: /* @__PURE__ */ a(
                                J,
                                {
                                  size: "icon-sm",
                                  variant: "outline",
                                  className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                                  disabled: lr,
                                  "aria-label": Zt(
                                    "%comment_aria_assign_user%",
                                    o,
                                    "Assign user"
                                  ),
                                  children: /* @__PURE__ */ a(ri, {})
                                }
                              ) })
                            }
                          ) }),
                          /* @__PURE__ */ a(Nt, { children: Zt(
                            "%comment_aria_assign_user%",
                            o,
                            "Assign user"
                          ) })
                        ] }),
                        /* @__PURE__ */ a(
                          Tr,
                          {
                            className: "tw:w-auto tw:p-0",
                            align: "end",
                            onKeyDown: (S) => {
                              S.key === "Escape" && (S.stopPropagation(), ft(!1));
                            },
                            children: /* @__PURE__ */ a(Sr, { children: /* @__PURE__ */ a(Rr, { children: h == null ? void 0 : h.map((S) => /* @__PURE__ */ a(
                              or,
                              {
                                onSelect: () => {
                                  G({
                                    assignedUser: S !== s ? S : void 0
                                  }), It.current = "user-selected", st(void 0), ft(!1);
                                },
                                className: "tw:flex tw:items-center",
                                children: /* @__PURE__ */ a("span", { children: va(S, o) })
                              },
                              S || "unassigned"
                            )) }) })
                          }
                        )
                      ] }),
                      /* @__PURE__ */ p(kt, { children: [
                        /* @__PURE__ */ a(_t, { asChild: !0, children: /* @__PURE__ */ a(
                          Zr,
                          {
                            isDisabled: Mr,
                            disabledExplanation: Zt(
                              "%comment_aria_submit_comment%",
                              o,
                              "Submit comment"
                            ),
                            className: "tw:inline-flex",
                            children: /* @__PURE__ */ a(
                              J,
                              {
                                size: "icon-sm",
                                onClick: fe,
                                className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                                disabled: Mr,
                                "aria-label": Zt(
                                  "%comment_aria_submit_comment%",
                                  o,
                                  "Submit comment"
                                ),
                                children: /* @__PURE__ */ a(ai, {})
                              }
                            )
                          }
                        ) }),
                        /* @__PURE__ */ a(Nt, { children: Zt(
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
}), ru = b(
  Qi,
  // `prose` gives block children (the top-level blockquote wrapper, and any p — whether nested
  // inside that blockquote or, in the non-verseText fallback, a direct child) vertical margins that
  // make these already-compact cards feel bulky. Zero both so the diff sits flush inside the card.
  "tw:[&>blockquote]:my-0 tw:[&_p]:my-0",
  "tw:[&_u]:font-semibold tw:[&_u]:text-success-foreground tw:[&_u]:no-underline",
  "tw:[&_s]:text-destructive tw:[&_s]:line-through"
), au = (t) => t.replace(/(\s+)(<\/[us]>)/g, "$2$1"), ba = (t) => au(Io(t));
function xa({ html: t }) {
  const e = Ir();
  return /* @__PURE__ */ a(
    "div",
    {
      className: ru,
      ...e,
      dangerouslySetInnerHTML: { __html: t }
    }
  );
}
function ou({
  comment: t,
  localizedStrings: e,
  availableActions: r = "acceptOrReject",
  resolvedResolution: o,
  onResolve: n,
  isResolving: i = !1
}) {
  const [s, c] = E("accept"), d = Ea(), l = Ea(), w = Ir(), u = r === "loading", g = r === "accept", f = r === "none", N = r === "acceptRejectOrMerge", m = g ? "accept" : s, h = A(
    () => ba(t.rejectedText ?? ""),
    [t.rejectedText]
  ), y = A(
    () => ba(t.acceptedText ?? ""),
    [t.acceptedText]
  ), k = A(
    () => ba(t.mergedText ?? ""),
    [t.mergedText]
  ), C = A(() => Io(t.contents), [t.contents]);
  if (!ts(t))
    return /* @__PURE__ */ a(xa, { html: C });
  const P = (T) => {
    c(T === "reject" || T === "merge" ? T : "accept");
  }, j = e["%conflict_note_stale_notice%"] ?? "The verse was edited after this conflict was recorded, so 'Use the other change' is no longer available. Keep the current text to resolve.", z = N ? [
    {
      value: "merge",
      label: e["%conflict_note_option_combine%"] ?? "Combine both changes",
      html: k
    }
  ] : [], D = [
    {
      value: "accept",
      label: e["%conflict_note_option_keep_current%"] ?? "Keep the current text",
      html: y
    },
    {
      value: "reject",
      label: e["%conflict_note_option_use_other%"] ?? "Use the other change",
      html: h
    },
    ...z
  ], I = m === "accept", R = i || I;
  let O;
  I ? O = e["%conflict_note_save_disabled_tooltip%"] ?? "Keeping the current text makes no change — resolve the thread with the ✓ to keep it." : i || (O = e["%conflict_note_save_warning%"] ?? "This can't be undone.");
  const H = e["%conflict_note_no_result%"] ?? "No result preview available.", q = /* @__PURE__ */ a("p", { className: "tw:text-muted-foreground", children: H }), X = (T) => T ? /* @__PURE__ */ a(
    "p",
    {
      className: "tw:whitespace-pre-wrap tw:text-foreground",
      ...w,
      children: T
    }
  ) : q, x = () => {
    const T = o ?? "accept";
    return T === "merged" ? t.mergedText ? /* @__PURE__ */ a(xa, { html: k }) : q : X(T === "reject" ? t.rejectedResultText : t.resultText);
  }, Y = (T) => g && T.value === "reject", _ = (T) => {
    const L = m === T.value, $ = `${l}-${T.value}`, K = Y(T);
    return (
      // The whole card is a label, so a click anywhere in it forwards to the radio and selects the
      // option (no separate click handler needed). The radio keeps role=radio / aria-checked /
      // arrow-key navigation; its aria-label names the option so the inline diff isn't pulled into
      // the accessible name. The visible label text is aria-hidden to avoid announcing it twice (once
      // as the radio's name, once as adjacent text). The radio and title sit side by side on one flex
      // row (a `gap`, not a directional margin, so the browser's own RTL mirroring of `flex-row`
      // puts the radio on the correct logical side without extra dir-aware classes), with the diff
      // below as a sibling.
      /* @__PURE__ */ p(
        "label",
        {
          htmlFor: $,
          "data-slot": "conflict-resolution-option",
          "data-value": T.value,
          className: b(
            "tw:flex tw:flex-col tw:gap-1 tw:rounded-md tw:border tw:p-2",
            "tw:focus-within:ring-2 tw:focus-within:ring-ring tw:focus-within:ring-offset-1",
            L ? "tw:border-border tw:bg-accent/50" : "tw:border-transparent tw:hover:bg-accent/30",
            K ? "tw:cursor-not-allowed tw:opacity-60" : "tw:cursor-pointer"
          ),
          children: [
            /* @__PURE__ */ p("div", { className: "tw:flex tw:items-center tw:gap-2", children: [
              /* @__PURE__ */ a(
                _a,
                {
                  id: $,
                  value: T.value,
                  "aria-label": T.label,
                  disabled: K,
                  "aria-describedby": K ? d : void 0
                }
              ),
              /* @__PURE__ */ a("span", { "aria-hidden": !0, className: "tw:font-medium", children: T.label })
            ] }),
            K && // aria-describedby links the option to this visually-hidden notice so assistive tech
            // announces why the choice is read-only.
            /* @__PURE__ */ a("span", { id: d, className: "tw:sr-only", children: j }),
            /* @__PURE__ */ a(xa, { html: T.html })
          ]
        },
        T.value
      )
    );
  };
  return (
    // Contain every click inside the card (selecting an option, pressing Save) so it never bubbles
    // up to toggle the enclosing CommentThread open/closed. The thread toggles on click only, so a
    // single onClick guard at the root is enough; this container is not itself an interactive control
    // and needs no keyboard handler (the thread has no keyboard toggle to intercept).
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
    /* @__PURE__ */ p("div", { className: "tw:flex tw:flex-col tw:gap-3 tw:text-sm", onClick: (T) => T.stopPropagation(), children: [
      /* @__PURE__ */ a("p", { children: e["%conflict_note_description_verseText%"] ?? "Conflicting changes were made to the verse text." }),
      u && /* @__PURE__ */ p("div", { className: "tw:flex tw:flex-col tw:gap-2", "data-slot": "conflict-loading", children: [
        /* @__PURE__ */ a(gr, { className: "tw:h-8 tw:w-full" }),
        /* @__PURE__ */ a(gr, { className: "tw:h-8 tw:w-full" }),
        /* @__PURE__ */ a(gr, { className: "tw:h-8 tw:w-24" })
      ] }),
      !u && f && x(),
      !u && !f && /* @__PURE__ */ p(yt, { children: [
        /* @__PURE__ */ a("p", { children: e["%conflict_note_choose_prompt%"] ?? "Select which change to keep:" }),
        /* @__PURE__ */ a(
          Eo,
          {
            value: m,
            onValueChange: P,
            disabled: i,
            "aria-label": e["%conflict_note_choose_aria_label%"] ?? "Choose resolution",
            children: D.map((T) => Y(T) ? /* @__PURE__ */ a(Jt, { delayDuration: 0, children: /* @__PURE__ */ p(kt, { children: [
              /* @__PURE__ */ a(_t, { asChild: !0, children: _(T) }),
              /* @__PURE__ */ a(Nt, { children: j })
            ] }) }, T.value) : _(T))
          }
        ),
        /* @__PURE__ */ a(Jt, { delayDuration: 0, children: /* @__PURE__ */ p(kt, { children: [
          /* @__PURE__ */ a(_t, { asChild: !0, children: /* @__PURE__ */ a(
            Zr,
            {
              isDisabled: R && O !== void 0,
              disabledExplanation: O,
              className: "tw:inline-flex tw:self-start",
              children: /* @__PURE__ */ a(
                J,
                {
                  size: "sm",
                  disabled: R,
                  onClick: () => n == null ? void 0 : n(m),
                  children: e["%conflict_note_save_and_resolve%"] ?? "Save and resolve"
                }
              )
            }
          ) }),
          O && /* @__PURE__ */ a(Nt, { children: O })
        ] }) })
      ] })
    ] })
  );
}
const nu = {
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
function iu({
  comment: t,
  localizedStrings: e,
  resolvedResolution: r
}) {
  const o = A(
    () => ba(t.rejectedText ?? ""),
    [t.rejectedText]
  );
  if (r) {
    const { key: i, fallback: s } = nu[r];
    return /* @__PURE__ */ a("p", { className: "tw:text-sm tw:font-normal tw:text-muted-foreground", children: e[i] ?? s });
  }
  const n = e["%conflict_note_summary_unresolved%"] ?? "Conflicting edits. Choose which change to keep.";
  return /* @__PURE__ */ p("div", { className: "tw:flex tw:flex-col tw:gap-1", children: [
    /* @__PURE__ */ a("p", { className: "tw:text-sm tw:font-normal tw:text-muted-foreground", children: n }),
    o ? /* @__PURE__ */ a(xa, { html: o }) : void 0
  ] });
}
function su(t) {
  return t === "reject" ? "reject" : t === "merge" ? "merged" : "accept";
}
function cu({
  threadId: t,
  threadStatus: e,
  isSelected: r,
  activeComments: o,
  conflictResolution: n
}) {
  const [i, s] = E("loading"), [c, d] = E(!1), [l, w] = E(), u = n == null ? void 0 : n.getOptions, g = n == null ? void 0 : n.resolve;
  W(() => {
    let k = !0;
    if (!r) {
      s("loading");
      return;
    }
    return (async () => {
      let P;
      try {
        P = u ? await u(t) : "none";
      } catch {
        P = "none";
      }
      k && (s(P), P !== "none" && w(void 0));
    })(), () => {
      k = !1;
    };
  }, [r, t, e, u]);
  const f = U(!1), N = B(
    async (k) => {
      if (!(!g || f.current)) {
        f.current = !0, d(!0);
        try {
          await g(t, k) && (w(su(k)), s("none"));
        } catch {
        } finally {
          f.current = !1, d(!1);
        }
      }
    },
    [g, t]
  ), h = A(() => {
    if (e === "Resolved") {
      for (let k = o.length - 1; k >= 0; k -= 1)
        if (o[k].status === "Resolved")
          return es(o[k].conflictResolutionAction);
      return "accept";
    }
  }, [e, o]) ?? l;
  return { conflictOptions: i, isResolving: c, resolve: N, resolvedResolution: h, showResolveCheck: i !== "loading" && i !== "none" };
}
const lu = ti(function(e) {
  const {
    comments: r,
    localizedStrings: o,
    isSelected: n = !1,
    threadId: i,
    threadStatus: s,
    conflictResolution: c
  } = e, d = A(() => r.filter((k) => !k.deleted), [r]), l = A(
    () => d.find((k) => k.conflictType) ?? d[0],
    [d]
  ), { conflictOptions: w, isResolving: u, resolve: g, resolvedResolution: f, showResolveCheck: N } = cu({
    threadId: i,
    threadStatus: s,
    isSelected: n,
    activeComments: d,
    conflictResolution: c
  }), m = ts(l);
  let h;
  m && l && (h = n ? /* @__PURE__ */ a(
    ou,
    {
      comment: l,
      localizedStrings: o,
      availableActions: w,
      resolvedResolution: f,
      onResolve: g,
      isResolving: u
    }
  ) : /* @__PURE__ */ a(
    iu,
    {
      comment: l,
      localizedStrings: o,
      resolvedResolution: f
    }
  ));
  let y;
  return m && (y = /* @__PURE__ */ a(
    rs,
    {
      show: N,
      disabled: u,
      onClick: () => g("accept"),
      ariaLabel: o["%comment_aria_resolve_thread%"] ?? "Resolve thread"
    }
  )), /* @__PURE__ */ a(
    as,
    {
      ...e,
      activeComments: d,
      rootContentSlot: h,
      resolveActionSlot: y,
      spaceRootContentFromReplies: m && n
    }
  );
});
function Mh({
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
  canUserAssignThreadCallback: u,
  canUserResolveThreadCallback: g,
  canUserEditOrDeleteCommentCallback: f,
  selectedThreadId: N,
  onSelectedThreadChange: m,
  onVerseRefClick: h,
  conflictResolution: y,
  drafts: k,
  onDraftChange: C
}) {
  const [P, j] = E(/* @__PURE__ */ new Set()), [z, D] = E(), [I, R] = E(), O = B(
    async ($) => {
      const K = await i($);
      return K !== void 0 && $.assignedUser !== void 0 && $.assignedUser !== "" && R($.assignedUser), K;
    },
    [i]
  );
  W(() => {
    N && (j(($) => new Set($).add(N)), D(N));
  }, [N]);
  const H = r.filter(
    ($) => $.comments.some((K) => !K.deleted)
  ), q = H.map(($) => ({ id: $.id })), X = B(
    ($) => {
      j((K) => new Set(K).add($.id)), D($.id), m == null || m($.id);
    },
    [m]
  ), x = B(
    ($) => {
      const K = P.has($);
      j((at) => {
        const et = new Set(at);
        return et.has($) ? et.delete($) : et.add($), et;
      }), D($), m == null || m(K ? void 0 : $);
    },
    [P, m]
  ), { listboxRef: Y, activeId: _, handleKeyDown: T } = $s({
    options: q,
    onOptionSelect: X
  }), L = B(
    ($) => {
      $.key === "Escape" ? (z && P.has(z) && (j((K) => {
        const at = new Set(K);
        return at.delete(z), at;
      }), D(void 0), m == null || m(void 0)), $.preventDefault(), $.stopPropagation()) : T($);
    },
    [z, P, T, m]
  );
  return /* @__PURE__ */ a(
    "div",
    {
      id: Xw,
      role: "listbox",
      tabIndex: 0,
      ref: Y,
      "aria-activedescendant": _ ?? void 0,
      "aria-label": "Comments",
      className: b(
        "tw:flex tw:w-full tw:flex-col tw:outline-hidden tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-1 tw:focus:ring-offset-background",
        t
      ),
      onKeyDown: L,
      children: H.map(($) => {
        const K = {
          classNameForVerseText: e,
          comments: $.comments,
          localizedStrings: n,
          verseRef: $.verseRef,
          handleSelectThread: x,
          threadId: $.id,
          thread: $,
          isRead: $.isRead,
          isSelected: P.has($.id),
          currentUser: o,
          assignedUser: $.assignedUser,
          threadStatus: $.status,
          handleAddCommentToThread: O,
          handleUpdateComment: s,
          handleDeleteComment: c,
          handleReadStatusChange: d,
          assignableUsers: l,
          canUserAddCommentToThread: w,
          canUserAssignThreadCallback: u,
          canUserResolveThreadCallback: g,
          canUserEditOrDeleteCommentCallback: f,
          onVerseRefClick: h,
          initialAssignedUser: I,
          draft: k == null ? void 0 : k[$.id],
          onDraftChange: C
        };
        return /* @__PURE__ */ a(
          "div",
          {
            className: b("tw:border-b tw:border-border tw:last:border-b-0", {
              "tw:opacity-60": $.status === "Resolved"
            }),
            children: $.type === "Conflict" ? /* @__PURE__ */ a(lu, { ...K, conflictResolution: y }) : /* @__PURE__ */ a(as, { ...K })
          },
          $.id
        );
      })
    }
  );
}
const du = Mo(
  function({ area: e, as: r = "div", label: o, ...n }, i) {
    const s = {
      [Wi]: e ?? "",
      ...o ? { [Yi]: o } : {}
    };
    return uo(r, { ...n, ...s, ref: i });
  }
);
du.displayName = "ContentZoomRoot";
function wu({ table: t }) {
  return /* @__PURE__ */ p(nr, { children: [
    /* @__PURE__ */ a(Ue, { asChild: !0, children: /* @__PURE__ */ p(J, { variant: "outline", size: "sm", className: "tw:ml-auto tw:hidden tw:h-8 tw:lg:flex", children: [
      /* @__PURE__ */ a(Rc, { className: "tw:mr-2 tw:h-4 tw:w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ p(ir, { align: "end", className: "tw:w-[150px]", children: [
      /* @__PURE__ */ a(Jr, { children: "Toggle columns" }),
      /* @__PURE__ */ a(br, {}),
      t.getAllColumns().filter((e) => e.getCanHide()).map((e) => /* @__PURE__ */ a(
        To,
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
function yr({ ...t }) {
  return /* @__PURE__ */ a(Lt.Root, { "data-slot": "select", ...t });
}
function uu({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    Lt.Group,
    {
      "data-slot": "select-group",
      className: b("tw:scroll-my-1 tw:p-1", t),
      ...e
    }
  );
}
function kr({ ...t }) {
  return /* @__PURE__ */ a(Lt.Value, { "data-slot": "select-value", ...t });
}
function _r({ className: t, size: e = "default", children: r, ...o }) {
  const n = le();
  return /* @__PURE__ */ p(
    Lt.Trigger,
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
        /* @__PURE__ */ a(Lt.Icon, { asChild: !0, children: /* @__PURE__ */ a(oi, { className: "tw:pointer-events-none tw:size-4 tw:text-muted-foreground" }) })
      ]
    }
  );
}
function Nr({
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
  // CUSTOM: Destructure onCloseAutoFocus so the caller's handler runs inside the gated handler below
  onCloseAutoFocus: i,
  ...s
}) {
  const c = Vs(i), d = le();
  return /* @__PURE__ */ a(Lt.Portal, { children: /* @__PURE__ */ p(
    Lt.Content,
    {
      "data-slot": "select-content",
      "data-align-trigger": r === "item-aligned",
      className: b(
        "pr-twp tw:relative tw:max-h-(--radix-select-content-available-height) tw:data-[align-trigger=true]:min-w-(--radix-select-trigger-width) tw:data-[align-trigger=false]:min-w-36 tw:origin-(--radix-select-content-transform-origin) tw:overflow-x-hidden tw:overflow-y-auto tw:rounded-lg tw:bg-popover tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:data-[align-trigger=true]:animate-none tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95 tw:animate-none! tw:**:data-[slot$=-item]:focus:bg-foreground/10 tw:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 tw:**:data-[slot$=-separator]:bg-foreground/5 tw:**:data-[slot$=-trigger]:focus:bg-foreground/10 tw:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! tw:**:data-[variant=destructive]:focus:bg-foreground/10! tw:**:data-[variant=destructive]:text-accent-foreground! tw:**:data-[variant=destructive]:**:text-accent-foreground! tw:relative",
        r === "popper" && "tw:data-[side=bottom]:translate-y-1 tw:data-[side=left]:-translate-x-1 tw:rtl:data-[side=left]:translate-x-1 tw:data-[side=right]:translate-x-1 tw:rtl:data-[side=right]:-translate-x-1 tw:data-[side=top]:-translate-y-1",
        t
      ),
      style: { zIndex: Ie, ...n },
      position: r,
      align: o,
      onCloseAutoFocus: c,
      ...s,
      children: [
        /* @__PURE__ */ a(pu, {}),
        /* @__PURE__ */ a(
          Lt.Viewport,
          {
            "data-position": r,
            className: b(
              "tw:data-[position=popper]:h-(--radix-select-trigger-height) tw:data-[position=popper]:w-full tw:data-[position=popper]:min-w-(--radix-select-trigger-width)",
              r === "popper" && "tw:"
            ),
            children: /* @__PURE__ */ a("div", { dir: d, children: e })
          }
        ),
        /* @__PURE__ */ a(hu, {})
      ]
    }
  ) });
}
function Ph({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    Lt.Label,
    {
      "data-slot": "select-label",
      className: b("pr-twp tw:px-1.5 tw:py-1 tw:text-xs tw:text-muted-foreground", t),
      ...e
    }
  );
}
function ce({
  className: t,
  children: e,
  ...r
}) {
  return /* @__PURE__ */ p(
    Lt.Item,
    {
      "data-slot": "select-item",
      className: b(
        "pr-twp tw:relative tw:flex tw:w-full tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-1.5 tw:ps-7 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:*:[span]:last:flex tw:*:[span]:last:items-center tw:*:[span]:last:gap-2",
        t
      ),
      ...r,
      children: [
        /* @__PURE__ */ a("span", { className: "tw:pointer-events-none tw:absolute tw:start-1.5 tw:flex tw:size-4 tw:items-center tw:justify-center", children: /* @__PURE__ */ a(Lt.ItemIndicator, { children: /* @__PURE__ */ a(zr, { className: "tw:pointer-events-none" }) }) }),
        /* @__PURE__ */ a(Lt.ItemText, { children: e })
      ]
    }
  );
}
function Ah({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    Lt.Separator,
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
function pu({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    Lt.ScrollUpButton,
    {
      "data-slot": "select-scroll-up-button",
      className: b(
        "pr-twp tw:z-10 tw:flex tw:cursor-default tw:items-center tw:justify-center tw:bg-popover tw:py-1 tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      ...e,
      children: /* @__PURE__ */ a(el, {})
    }
  );
}
function hu({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    Lt.ScrollDownButton,
    {
      "data-slot": "select-scroll-down-button",
      className: b(
        "pr-twp tw:z-10 tw:flex tw:cursor-default tw:items-center tw:justify-center tw:bg-popover tw:py-1 tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      ...e,
      children: /* @__PURE__ */ a(tl, {})
    }
  );
}
function gu({ table: t }) {
  return /* @__PURE__ */ a("div", { className: "tw:flex tw:items-center tw:justify-between tw:px-2 tw:pb-3 tw:pt-3", children: /* @__PURE__ */ p("div", { className: "tw:flex tw:items-center tw:space-x-6 tw:lg:space-x-8", children: [
    /* @__PURE__ */ p("div", { className: "tw:flex-1 tw:text-sm tw:text-muted-foreground", children: [
      t.getFilteredSelectedRowModel().rows.length,
      " of",
      " ",
      t.getFilteredRowModel().rows.length,
      " row(s) selected"
    ] }),
    /* @__PURE__ */ p("div", { className: "tw:flex tw:items-center tw:space-x-2", children: [
      /* @__PURE__ */ a("p", { className: "tw:text-nowrap tw:text-sm tw:font-medium", children: "Rows per page" }),
      /* @__PURE__ */ p(
        yr,
        {
          value: `${t.getState().pagination.pageSize}`,
          onValueChange: (e) => {
            t.setPageSize(Number(e));
          },
          children: [
            /* @__PURE__ */ a(_r, { className: "tw:h-8 tw:w-[70px]", children: /* @__PURE__ */ a(kr, { placeholder: t.getState().pagination.pageSize }) }),
            /* @__PURE__ */ a(Nr, { side: "top", children: [10, 20, 30, 40, 50].map((e) => /* @__PURE__ */ a(ce, { value: `${e}`, children: e }, e)) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ p("div", { className: "tw:flex tw:w-[100px] tw:items-center tw:justify-center tw:text-sm tw:font-medium", children: [
      "Page ",
      t.getState().pagination.pageIndex + 1,
      " of ",
      t.getPageCount()
    ] }),
    /* @__PURE__ */ p("div", { className: "tw:flex tw:items-center tw:space-x-2", children: [
      /* @__PURE__ */ p(
        J,
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
      /* @__PURE__ */ p(
        J,
        {
          variant: "outline",
          size: "icon",
          className: "tw:h-8 tw:w-8 tw:p-0",
          onClick: () => t.previousPage(),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ a("span", { className: "tw:sr-only", children: "Go to previous page" }),
            /* @__PURE__ */ a(zc, { className: "tw:h-4 tw:w-4" })
          ]
        }
      ),
      /* @__PURE__ */ p(
        J,
        {
          variant: "outline",
          size: "icon",
          className: "tw:h-8 tw:w-8 tw:p-0",
          onClick: () => t.nextPage(),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ a("span", { className: "tw:sr-only", children: "Go to next page" }),
            /* @__PURE__ */ a(Dc, { className: "tw:h-4 tw:w-4" })
          ]
        }
      ),
      /* @__PURE__ */ p(
        J,
        {
          variant: "outline",
          size: "icon",
          className: "tw:hidden tw:h-8 tw:w-8 tw:p-0 tw:lg:flex",
          onClick: () => t.setPageIndex(t.getPageCount() - 1),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ a("span", { className: "tw:sr-only", children: "Go to last page" }),
            /* @__PURE__ */ a(Ic, { className: "tw:h-4 tw:w-4" })
          ]
        }
      )
    ] })
  ] }) });
}
function fu({
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
  var z;
  const [w, u] = E([]), [g, f] = E([]), [N, m] = E({}), [h, y] = E({}), k = A(() => e ?? [], [e]), C = bi({
    data: k,
    columns: t,
    getCoreRowModel: yi(),
    ...r && { getPaginationRowModel: nd() },
    onSortingChange: u,
    getSortedRowModel: xi(),
    onColumnFiltersChange: f,
    getFilteredRowModel: od(),
    onColumnVisibilityChange: m,
    onRowSelectionChange: y,
    state: {
      sorting: w,
      columnFilters: g,
      columnVisibility: N,
      rowSelection: h
    }
  }), P = C.getVisibleFlatColumns();
  let j;
  return d ? j = Array.from({ length: 10 }).map((R, O) => `skeleton-row-${O}`).map((R) => /* @__PURE__ */ a(je, { className: "tw:hover:bg-transparent", children: /* @__PURE__ */ a(fr, { colSpan: P.length ?? t.length, className: "tw:border-0 tw:p-0", children: /* @__PURE__ */ a("div", { className: "tw:w-full tw:py-2", children: /* @__PURE__ */ a(gr, { className: "tw:h-14 tw:w-full tw:rounded-md" }) }) }) }, R)) : ((z = C.getRowModel().rows) == null ? void 0 : z.length) > 0 ? j = C.getRowModel().rows.map((D) => /* @__PURE__ */ a(
    je,
    {
      onClick: () => s(D, C),
      "data-state": D.getIsSelected() && "selected",
      children: D.getVisibleCells().map((I) => /* @__PURE__ */ a(fr, { children: Kr(I.column.columnDef.cell, I.getContext()) }, I.id))
    },
    D.id
  )) : j = /* @__PURE__ */ a(je, { children: /* @__PURE__ */ a(fr, { colSpan: t.length, className: "tw:h-24 tw:text-center", children: l }) }), /* @__PURE__ */ p("div", { className: "pr-twp", id: c, children: [
    n && /* @__PURE__ */ a(wu, { table: C }),
    /* @__PURE__ */ p(So, { stickyHeader: i, children: [
      /* @__PURE__ */ a(Ro, { stickyHeader: i, children: C.getHeaderGroups().map((D) => /* @__PURE__ */ a(je, { children: D.headers.map((I) => /* @__PURE__ */ a(Na, { className: "tw:p-0", children: I.isPlaceholder ? void 0 : Kr(I.column.columnDef.header, I.getContext()) }, I.id)) }, D.id)) }),
      /* @__PURE__ */ a(Oo, { children: j })
    ] }),
    r && /* @__PURE__ */ p("div", { className: "tw:flex tw:items-center tw:justify-end tw:space-x-2 tw:py-4", children: [
      /* @__PURE__ */ a(
        J,
        {
          variant: "outline",
          size: "sm",
          onClick: () => C.previousPage(),
          disabled: !C.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ a(
        J,
        {
          variant: "outline",
          size: "sm",
          onClick: () => C.nextPage(),
          disabled: !C.getCanNextPage(),
          children: "Next"
        }
      )
    ] }),
    r && o && /* @__PURE__ */ a(gu, { table: C })
  ] });
}
function $h({
  id: t,
  markdown: e,
  className: r,
  anchorTarget: o,
  truncate: n
}) {
  const i = A(
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
      children: /* @__PURE__ */ a(cd, { options: i, children: e })
    }
  );
}
const mu = Object.freeze([
  "%webView_error_dump_copy_button%",
  "%webView_error_dump_header%",
  "%webView_error_dump_info_message%"
]), oo = (t, e) => t[e] ?? e;
function vu({
  errorDetails: t,
  handleCopyNotify: e,
  localizedStrings: r,
  id: o
}) {
  const n = oo(r, "%webView_error_dump_header%"), i = oo(r, "%webView_error_dump_info_message%"), s = oo(r, "%webView_error_dump_copy_button%");
  async function c() {
    try {
      await navigator.clipboard.writeText(t);
    } catch {
      return;
    }
    e && e();
  }
  return /* @__PURE__ */ p(
    "div",
    {
      id: o,
      className: "tw:inline-flex tw:w-full tw:flex-col tw:items-start tw:justify-start tw:gap-4",
      children: [
        /* @__PURE__ */ p("div", { className: "tw:inline-flex tw:items-start tw:justify-start tw:gap-4 tw:self-stretch", children: [
          /* @__PURE__ */ p("div", { className: "tw:inline-flex tw:flex-1 tw:flex-col tw:items-start tw:justify-start", children: [
            /* @__PURE__ */ a("div", { className: "tw:text-color-text tw:justify-center tw:text-center tw:text-lg tw:font-semibold tw:leading-loose", children: n }),
            /* @__PURE__ */ a("div", { className: "tw:justify-center tw:self-stretch tw:text-sm tw:font-normal tw:leading-tight tw:text-muted-foreground", children: i })
          ] }),
          /* @__PURE__ */ a(
            J,
            {
              variant: "secondary",
              size: "icon",
              "aria-label": s,
              onClick: () => {
                c();
              },
              children: /* @__PURE__ */ a(Mc, {})
            }
          )
        ] }),
        /* @__PURE__ */ a("div", { className: "tw:prose tw:w-full", children: /* @__PURE__ */ a("pre", { className: "tw:text-xs", children: t }) })
      ]
    }
  );
}
const Vh = Object.freeze([
  ...mu,
  "%webView_error_dump_copied_message%"
]);
function Lh({
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
  return /* @__PURE__ */ p(Cr, { onOpenChange: (w) => {
    w || c(!1);
  }, children: [
    /* @__PURE__ */ a(Er, { asChild: !0, ...i !== void 0 ? { "aria-controls": i } : {}, children: o }),
    /* @__PURE__ */ p(
      Tr,
      {
        ...i !== void 0 ? { id: i } : {},
        className: b("tw:min-w-80 tw:max-w-96", n),
        children: [
          s && r["%webView_error_dump_copied_message%"] && /* @__PURE__ */ a(gt, { children: r["%webView_error_dump_copied_message%"] }),
          /* @__PURE__ */ a(
            vu,
            {
              errorDetails: t,
              handleCopyNotify: d,
              localizedStrings: r
            }
          )
        ]
      }
    )
  ] });
}
var bu = /* @__PURE__ */ ((t) => (t[t.Check = 0] = "Check", t[t.Radio = 1] = "Radio", t))(bu || {});
function Bh({ id: t, label: e, groups: r }) {
  const [o, n] = E(
    Object.fromEntries(
      r.map(
        (l, w) => l.itemType === 0 ? [w, []] : void 0
      ).filter((l) => !!l)
    )
  ), [i, s] = E({}), c = (l, w) => {
    const u = !o[l][w];
    n((f) => (f[l][w] = u, { ...f }));
    const g = r[l].items[w];
    g.onUpdate(g.id, u);
  }, d = (l, w) => {
    s((g) => (g[l] = w, { ...g }));
    const u = r[l].items.find((g) => g.id === w);
    u ? u.onUpdate(w) : console.error(`Could not find dropdown radio item with id '${w}'!`);
  };
  return /* @__PURE__ */ a("div", { id: t, children: /* @__PURE__ */ p(nr, { children: [
    /* @__PURE__ */ a(Ue, { asChild: !0, children: /* @__PURE__ */ p(J, { variant: "default", children: [
      /* @__PURE__ */ a(Pc, { size: 16, className: "tw:mr-2 tw:h-4 tw:w-4" }),
      e,
      /* @__PURE__ */ a(ar, { size: 16, className: "tw:ml-2 tw:h-4 tw:w-4" })
    ] }) }),
    /* @__PURE__ */ a(ir, { children: r.map((l, w) => /* @__PURE__ */ p("div", { children: [
      /* @__PURE__ */ a(Jr, { children: l.label }),
      /* @__PURE__ */ a(Gn, { children: l.itemType === 0 ? /* @__PURE__ */ a(yt, { children: l.items.map((u, g) => /* @__PURE__ */ a("div", { children: /* @__PURE__ */ a(
        To,
        {
          checked: o[w][g],
          onCheckedChange: () => c(w, g),
          children: u.label
        }
      ) }, u.id)) }) : /* @__PURE__ */ a(
        Ls,
        {
          value: i[w],
          onValueChange: (u) => d(w, u),
          children: l.items.map((u) => /* @__PURE__ */ a("div", { children: /* @__PURE__ */ a(Bs, { value: u.id, children: u.label }) }, u.id))
        }
      ) }),
      /* @__PURE__ */ a(br, {})
    ] }, l.label)) })
  ] }) });
}
function jh({
  id: t,
  category: e,
  downloads: r,
  languages: o,
  moreInfoUrl: n,
  handleMoreInfoLinkClick: i,
  supportUrl: s,
  handleSupportLinkClick: c
}) {
  const d = new Qn("en", {
    notation: "compact",
    compactDisplay: "short"
  }).format(Object.values(r).reduce((w, u) => w + u, 0)), l = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };
  return /* @__PURE__ */ p(
    "div",
    {
      id: t,
      className: "pr-twp tw:flex tw:items-center tw:justify-center tw:divide-x tw:border-b tw:border-t tw:py-2 tw:text-center",
      children: [
        e && /* @__PURE__ */ p("div", { className: "tw:flex tw:flex-col tw:items-center tw:gap-1 tw:px-4", children: [
          /* @__PURE__ */ a("div", { className: "tw:flex", children: /* @__PURE__ */ a("span", { className: "tw:text-xs tw:font-semibold tw:text-foreground", children: e }) }),
          /* @__PURE__ */ a("span", { className: "tw:text-xs tw:text-foreground", children: "CATEGORY" })
        ] }),
        /* @__PURE__ */ p("div", { className: "tw:flex tw:flex-col tw:items-center tw:gap-1 tw:px-4", children: [
          /* @__PURE__ */ p("div", { className: "tw:flex tw:gap-1", children: [
            /* @__PURE__ */ a(Ac, { className: "tw:h-4 tw:w-4" }),
            /* @__PURE__ */ a("span", { className: "tw:text-xs tw:font-semibold tw:text-foreground", children: d })
          ] }),
          /* @__PURE__ */ a("span", { className: "tw:text-xs tw:text-foreground", children: "USERS" })
        ] }),
        /* @__PURE__ */ p("div", { className: "tw:flex tw:flex-col tw:items-center tw:gap-1 tw:px-4", children: [
          /* @__PURE__ */ a("div", { className: "tw:flex tw:gap-2", children: o.slice(0, 3).map((w) => /* @__PURE__ */ a("span", { className: "tw:text-xs tw:font-semibold tw:text-foreground", children: w.toUpperCase() }, w)) }),
          o.length > 3 && /* @__PURE__ */ p(
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
        (n || s) && /* @__PURE__ */ p("div", { className: "tw:flex tw:flex-col tw:gap-1 tw:px-4", children: [
          n && /* @__PURE__ */ a("div", { className: "tw:flex tw:gap-1", children: /* @__PURE__ */ p(
            J,
            {
              onClick: () => i(),
              variant: "link",
              className: "tw:flex tw:h-auto tw:gap-1 tw:py-0 tw:text-xs tw:font-semibold tw:text-foreground",
              children: [
                "Website",
                /* @__PURE__ */ a($c, { className: "tw:h-4 tw:w-4" })
              ]
            }
          ) }),
          s && /* @__PURE__ */ a("div", { className: "tw:flex tw:gap-1", children: /* @__PURE__ */ p(
            J,
            {
              onClick: () => c(),
              variant: "link",
              className: "tw:flex tw:h-auto tw:gap-1 tw:py-0 tw:text-xs tw:font-semibold tw:text-foreground",
              children: [
                "Support",
                /* @__PURE__ */ a(Vc, { className: "tw:h-4 tw:w-4" })
              ]
            }
          ) })
        ] })
      ]
    }
  );
}
function xu({ id: t, versionHistory: e }) {
  const [r, o] = E(!1), n = /* @__PURE__ */ new Date();
  function i(c) {
    const d = new Date(c), l = new Date(n.getTime() - d.getTime()), w = l.getUTCFullYear() - 1970, u = l.getUTCMonth(), g = l.getUTCDate() - 1;
    let f = "";
    return w > 0 ? f = `${w.toString()} year${w === 1 ? "" : "s"} ago` : u > 0 ? f = `${u.toString()} month${u === 1 ? "" : "s"} ago` : g === 0 ? f = "today" : f = `${g.toString()} day${g === 1 ? "" : "s"} ago`, f;
  }
  const s = Object.entries(e).sort((c, d) => d[0].localeCompare(c[0]));
  return /* @__PURE__ */ p("div", { className: "pr-twp", id: t, children: [
    /* @__PURE__ */ a("h3", { className: "tw:text-md tw:font-semibold", children: "What`s New" }),
    /* @__PURE__ */ a("ul", { className: "tw:list-disc tw:pl-5 tw:pr-4 tw:text-xs tw:text-foreground", children: (r ? s : s.slice(0, 5)).map((c) => /* @__PURE__ */ p("div", { className: "tw:mt-3 tw:flex tw:justify-between", children: [
      /* @__PURE__ */ a("div", { className: "tw:text-foreground", children: /* @__PURE__ */ a("li", { className: "tw:prose tw:text-xs", children: /* @__PURE__ */ a("span", { children: c[1].description }) }) }),
      /* @__PURE__ */ p("div", { className: "tw:justify-end tw:text-right", children: [
        /* @__PURE__ */ p("div", { children: [
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
function Fh({
  id: t,
  publisherDisplayName: e,
  fileSize: r,
  locales: o,
  versionHistory: n,
  currentVersion: i
}) {
  const s = A(() => lc(r), [r]), d = ((l) => {
    const w = new Intl.DisplayNames(dc(), { type: "language" });
    return l.map((u) => w.of(u));
  })(o);
  return /* @__PURE__ */ a("div", { id: t, className: "pr-twp tw:border-t tw:py-2", children: /* @__PURE__ */ p("div", { className: "tw:flex tw:flex-col tw:gap-2 tw:divide-y", children: [
    Object.entries(n).length > 0 && /* @__PURE__ */ a(xu, { versionHistory: n }),
    /* @__PURE__ */ p("div", { className: "tw:flex tw:flex-col tw:gap-2 tw:py-2", children: [
      /* @__PURE__ */ a("h2", { className: "tw:text-md tw:font-semibold", children: "Information" }),
      /* @__PURE__ */ p("div", { className: "tw:flex tw:items-start tw:justify-between tw:text-xs tw:text-foreground", children: [
        /* @__PURE__ */ p("p", { className: "tw:flex tw:flex-col tw:justify-start tw:gap-1", children: [
          /* @__PURE__ */ a("span", { children: "Publisher" }),
          /* @__PURE__ */ a("span", { className: "tw:font-semibold", children: e }),
          /* @__PURE__ */ a("span", { children: "Size" }),
          /* @__PURE__ */ a("span", { className: "tw:font-semibold", children: s })
        ] }),
        /* @__PURE__ */ a("div", { className: "tw:flex tw:w-3/4 tw:items-center tw:justify-between tw:text-xs tw:text-foreground", children: /* @__PURE__ */ p("p", { className: "tw:flex tw:flex-col tw:justify-start tw:gap-1", children: [
          /* @__PURE__ */ a("span", { children: "Version" }),
          /* @__PURE__ */ a("span", { className: "tw:font-semibold", children: i }),
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
  commandEmptyMessage: i,
  customSelectedText: s,
  isDisabled: c,
  sortSelected: d,
  showScrollCue: l,
  icon: w,
  className: u,
  badgesPlaceholder: g,
  id: f
}) {
  return /* @__PURE__ */ p("div", { id: f, className: "tw:flex tw:items-center tw:gap-2", children: [
    /* @__PURE__ */ a(
      js,
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
        className: u
      }
    ),
    e.length > 0 ? /* @__PURE__ */ a("div", { className: "tw:flex tw:flex-wrap tw:items-center tw:gap-2", children: e.map((N) => {
      var m;
      return /* @__PURE__ */ p(qr, { variant: "muted", className: "tw:flex tw:items-center tw:gap-1", children: [
        /* @__PURE__ */ a(
          J,
          {
            variant: "ghost",
            size: "icon",
            className: "tw:h-4 tw:w-4 tw:p-0 tw:hover:bg-transparent",
            onClick: () => r(e.filter((h) => h !== N)),
            children: /* @__PURE__ */ a(Lc, { className: "tw:h-3 tw:w-3" })
          }
        ),
        (m = t.find((h) => h.value === N)) == null ? void 0 : m.label
      ] }, N);
    }) }) : /* @__PURE__ */ a(gt, { children: g })
  ] });
}
const Dn = " ";
function yu(t, e) {
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
function In(t) {
  return t.nextNode() ?? void 0;
}
function os(t) {
  return t.data.endsWith(Dn) ? t.data.length - Dn.length : t.data.length;
}
function ku(t, e, r) {
  var l, w;
  const o = t.querySelector(".note-category-value");
  if (o != null && o.contains(e)) return { utf16Offset: r, field: "category" };
  const n = (l = e.parentElement) == null ? void 0 : l.closest(".marker");
  if (!o || !n || !t.contains(n)) return { utf16Offset: 0 };
  const i = n === t.querySelector(".marker"), s = ((w = o.textContent) == null ? void 0 : w.length) ?? 0, c = i ? 0 : s;
  return r > os(e) ? { utf16Offset: c, field: "category" } : { utf16Offset: c, field: "category", glyph: { index: !i && s === 0 ? 1 : 0, offset: r } };
}
function Mn(t, e, r) {
  var s;
  const o = document.createTreeWalker(t, NodeFilter.SHOW_TEXT);
  let n = 0, i = 0;
  for (let c = In(o); c; c = In(o)) {
    const d = yu(c, t);
    if (d === "category") {
      if (c === e) {
        const l = (s = c.parentElement) == null ? void 0 : s.closest(".note-category");
        return l ? ku(l, c, r) : { utf16Offset: 0 };
      }
    } else if (d === "display") {
      if (c === e) return { utf16Offset: n };
    } else if (d === "glyph") {
      if (c === e)
        return r > os(c) ? { utf16Offset: n } : { utf16Offset: n, glyph: { index: i, offset: r } };
      i += 1;
    } else {
      if (c === e) return { utf16Offset: n + r };
      n += c.data.length, c.data.length > 0 && (i = 0);
    }
  }
  return "end";
}
function Pn(t) {
  return t.nodeType === Node.TEXT_NODE ? t : document.createTreeWalker(t, NodeFilter.SHOW_TEXT).nextNode() ?? void 0;
}
function _u(t, e, r) {
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
    const c = Pn(o);
    return c ? Mn(o, c, 0) : "end";
  }
  if (!o.contains(n)) return "end";
  if (n.nodeType === Node.ELEMENT_NODE) {
    const c = n.childNodes[i], d = c ? Pn(c) : void 0;
    if (!d) return "end";
    n = d, i = 0;
  }
  return n.nodeType !== Node.TEXT_NODE ? "end" : Mn(o, n, i);
}
const Kh = Object.freeze([
  ...Fs,
  ...Object.entries(wc).map(([, t]) => t.description).filter((t) => !!t),
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
  ...Us,
  ...Hn
]), ns = " ", Nu = "\uFEFF";
function is(t) {
  return t.closed !== "false";
}
function Cu(t, e, r = !0, o = void 0, n = void 0) {
  const i = [];
  let s = [];
  (e ?? []).forEach((d) => {
    typeof d != "string" && d.marker === "fp" ? (s.length > 0 && i.push(s), s = [d]) : s.push(d);
  }), s.length > 0 && i.push(s);
  const c = i.length > 0;
  return c || i.push([]), i.map((d, l) => {
    const w = l === 0, u = l === i.length - 1;
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
      /* @__PURE__ */ p("p", { className: "notetext", children: [
        w && !c && /* @__PURE__ */ a("span", { className: "note-placeholder", children: Nu }),
        w && n,
        ss(t, d, r),
        u && o
      ] }, `${t ?? "note"}-p${l}`)
    );
  });
}
function ss(t, e, r = !0, o = !1) {
  if (!(!e || e.length === 0))
    return e.map((n, i) => {
      const s = `${t ?? "note"}-${i}`;
      return typeof n == "string" ? /* @__PURE__ */ a("span", { className: b(`usfm_${t}`), children: n }, s) : Eu(n, s, r, o);
    });
}
function Eu(t, e, r, o = !1) {
  const { marker: n } = t;
  if (t.type === "unmatched")
    return /* @__PURE__ */ a("span", { className: "marker", children: `\\${n}` }, e);
  const i = `${o ? "+" : ""}${n}`;
  return /* @__PURE__ */ p("span", { children: [
    n ? r && /* @__PURE__ */ a("span", { className: "marker", children: `\\${i}${ns}` }) : /* @__PURE__ */ a(
      Bc,
      {
        className: "tw:text-error tw:mr-1 tw:inline-block tw:h-4 tw:w-4",
        "aria-label": "Missing marker"
      }
    ),
    ss(
      n,
      t.content,
      r,
      /* isNestedContent */
      !0
    ),
    n && r && is(t) && /* @__PURE__ */ a("span", { className: "marker", children: `\\${i}*` })
  ] }, e);
}
function Tu({
  footnote: t,
  layout: e = "horizontal",
  formatCaller: r,
  showMarkers: o = !0
}) {
  const n = r ? r(t.caller) : t.caller, i = n !== t.caller, s = o ? /* @__PURE__ */ a("span", { className: "marker", children: `\\${t.marker}` }) : void 0, c = o && is(t) ? /* @__PURE__ */ a("span", { className: "marker note-closer", children: `\\${t.marker}*` }) : void 0, d = t.category ? (
    // Given its own class rather than a `usfm_*` one for the same reason the caller has one:
    // `\cat` delimits the value but is not a style for it. The value is the note's data and stays
    // visible either way; the `\cat` glyphs are marker display and follow the same switch every
    // other marker in this component does.
    //
    // The class is also what keeps the whole run out of the content caret origin (`RowTextKind`
    // in `footnote-caret.utils.ts`): the category is a FIELD on the note, not part of its
    // `content`, and the editor builds its own category display as `attribute`-typed text, which
    // `EditorRef.selectNoteTextOffset` skips. A click in the run maps to the category instead.
    /* @__PURE__ */ p("span", { className: "note-category", children: [
      o && /* @__PURE__ */ a("span", { className: "marker", children: `\\cat${ns}` }),
      /* @__PURE__ */ a("span", { className: "note-category-value", children: t.category }),
      o && /* @__PURE__ */ a("span", { className: "marker", children: "\\cat*" }),
      !o && " "
    ] })
  ) : void 0, l = n && // USFM does not specify a marker for caller, so instead of a usfm_* class, we use a
  // specific class name in case styling is needed.
  /* @__PURE__ */ a("span", { className: b("note-caller tw:inline-block", { formatted: i }), children: n }), w = e === "horizontal" ? "horizontal" : "vertical", u = o ? "marker-visible" : "", g = e === "horizontal" ? "tw:col-span-1" : "tw:col-span-2 tw:col-start-1 tw:row-start-2", f = b(w, u);
  return /* @__PURE__ */ p(yt, { children: [
    /* @__PURE__ */ p("div", { className: b("textual-note-header tw:col-span-1 tw:w-fit tw:text-nowrap", f), children: [
      s,
      !!s && !!l && " ",
      l
    ] }),
    /* @__PURE__ */ a(
      "div",
      {
        className: b(
          "textual-note-body tw:flex tw:flex-col tw:gap-1",
          g,
          f
        ),
        children: Cu(
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
const Su = "editing-row", Ru = 1e3;
function Ou(t) {
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
function zu(t, e) {
  const r = t.getBoundingClientRect(), o = (e == null ? void 0 : e.getBoundingClientRect().height) ?? 0, n = Ou(t);
  if (!e || r.height <= o || !n) {
    t.scrollIntoView({ block: "nearest" });
    return;
  }
  n.bottom - r.top <= o ? t.scrollIntoView({ block: "start" }) : r.bottom - n.top <= o && t.scrollIntoView({ block: "end" });
}
function ua(t, e, r, o) {
  let n = Math.min(Math.max(t + e, 0), r);
  if (n === o) {
    const i = Math.min(Math.max(n + e, 0), r);
    n = i === n ? t : i;
  }
  return n === o ? t : n;
}
function Hh({
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
  onFootnoteSelected: u,
  onFootnoteEditRequested: g,
  onFocusedFootnoteChange: f,
  editingFootnoteIndex: N,
  renderEditingFootnote: m
}) {
  const h = w ?? uc(o, void 0), y = m ? N : void 0, k = U([]), C = U(null), P = U(null), j = (_, T, L) => {
    if (g) {
      const $ = k.current[T], K = $ ? _u(L.clientX, L.clientY, $) : "end";
      g(_, T, i, K);
      return;
    }
    u == null || u(_, T, i);
  }, z = s ? o.findIndex((_) => _ === s) : -1, [D, I] = E(z), R = (_) => {
    var T;
    I(_), _ >= 0 && _ < k.current.length && ((T = k.current[_]) == null || T.focus());
  }, O = (_, T, L) => {
    if (o.length)
      switch (_.key) {
        case "Enter":
          _.preventDefault(), g ? g(T, L, i, "end") : u == null || u(T, L, i);
          break;
        case " ":
          _.preventDefault(), u == null || u(T, L, i);
          break;
      }
  }, H = o.length - 1, q = (_) => {
    if (o.length && !(_.target !== _.currentTarget && !(_.target instanceof HTMLElement && _.target.closest('li[role="option"]'))))
      switch (_.key) {
        case "ArrowDown":
          _.preventDefault(), R(ua(D, 1, H, y));
          break;
        case "ArrowUp":
          _.preventDefault(), R(ua(D, -1, H, y));
          break;
      }
  };
  W(() => {
    y === void 0 || D !== y || I((_) => {
      const T = ua(_, 1, H, y);
      if (T !== _) return T;
      const L = ua(_, -1, H, y);
      return L !== _ ? L : -1;
    });
  }, [y, D, H]);
  const X = U(void 0), x = (_) => {
    X.current !== _ && (X.current = _, f == null || f(_));
  };
  W(() => {
    const _ = X.current;
    if (_ === void 0) return;
    const T = k.current[_];
    (!T || T.ownerDocument.activeElement !== T) && (X.current = void 0, f == null || f(void 0));
  });
  const Y = s ? o.findIndex((_) => _ === s) : -1;
  return W(() => {
    var _;
    Y < 0 || Y >= k.current.length || (_ = k.current[Y]) == null || _.scrollIntoView({ block: "nearest" });
  }, [Y, c]), W(() => {
    const _ = C.current;
    if (y === void 0 || !_) return;
    const T = () => zu(_, P.current);
    if (T(), typeof ResizeObserver > "u") return;
    const L = new ResizeObserver(T);
    L.observe(_);
    const $ = setTimeout(() => L.disconnect(), Ru);
    return () => {
      clearTimeout($), L.disconnect();
    };
  }, [y, c]), // Every row is its own tab stop (see the row `tabIndex` below), so the list is not one as
  // well - a stop here would put an extra, contentless press between whatever precedes the list
  // and its first note. It stays programmatically focusable (`-1`) because arrow-key navigation
  // starts by focusing it. With NO rows there is no row to be that stop, so the list takes the
  // turn itself rather than leaving the region unreachable by keyboard.
  /* @__PURE__ */ a(
    "div",
    {
      ref: P,
      role: "listbox",
      "aria-label": t,
      tabIndex: o.length === 0 ? 0 : -1,
      className: b("tw:h-full tw:overflow-y-auto", e),
      onKeyDown: q,
      children: /* @__PURE__ */ a(
        "ul",
        {
          className: b(
            "tw:p-0.5 tw:pt-1",
            "tw:grid",
            // Two columns in both layouts: the note's marker+caller, then its text. PT9 keeps the
            // `\fr`/`\xo` target reference inside the note text rather than aligning it in a column
            // of its own, so there is no third column to size.
            "tw:grid-cols-[min-content_1fr]",
            !l && "formatted-font"
          ),
          children: o.map((_, T) => {
            const L = _ === s, $ = T === N && !!m, K = $ ? Su : `${i}-${T}`, at = T < o.length - 1 && n === "vertical" && /* @__PURE__ */ a(Wr, { tabIndex: -1, className: "tw:col-span-2" });
            return $ ? /* @__PURE__ */ p(rr, { children: [
              /* @__PURE__ */ a(
                "li",
                {
                  ref: C,
                  "data-state": "editing",
                  className: b(
                    "tw:gap-x-3 tw:gap-y-1 tw:p-2",
                    "tw:w-full tw:rounded-sm tw:border-0 tw:shadow-none",
                    // PT9 highlights the entry being edited (light yellow); warning is the theme's
                    // amber-family token so this stays theme-aware in dark mode.
                    "tw:bg-warning/15",
                    "tw:col-span-2",
                    n === "vertical" && "tw:row-span-2",
                    r
                  ),
                  children: m(_, T)
                }
              ),
              at
            ] }, K) : (
              // The key belongs on the outermost node returned from the map — the Fragment — not on
              // the `<li>` nested inside it, which leaves the Fragment itself unkeyed.
              /* @__PURE__ */ p(rr, { children: [
                /* @__PURE__ */ a(
                  "li",
                  {
                    ref: (et) => {
                      k.current[T] = et;
                    },
                    role: "option",
                    "aria-selected": L,
                    "data-marker": _.marker,
                    "data-state": L ? "selected" : void 0,
                    tabIndex: 0,
                    className: b(
                      "tw:gap-x-3 tw:gap-y-1 tw:p-2 tw:data-[state=selected]:bg-muted",
                      // Both handlers make the row a click target, so both earn the hover affordance -
                      // a consumer that only opens rows for editing would otherwise render rows that
                      // respond to a click but look inert.
                      (u || g) && "tw:hover:bg-muted/50",
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
                    onClick: (et) => j(_, T, et),
                    onFocus: () => {
                      I(T), x(T);
                    },
                    onBlur: () => x(void 0),
                    onKeyDown: (et) => O(et, _, T),
                    children: /* @__PURE__ */ a(
                      Tu,
                      {
                        footnote: _,
                        layout: n,
                        formatCaller: () => h(_.caller, T),
                        showMarkers: d
                      }
                    )
                  }
                ),
                at
              ] }, K)
            );
          })
        }
      )
    }
  );
}
function Du(t) {
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
  const n = Ir(), i = r["%webView_inventory_occurrences_table_header_reference%"], s = r["%webView_inventory_occurrences_table_header_occurrence%"], c = A(() => {
    const d = [], l = /* @__PURE__ */ new Set();
    return t.forEach((w) => {
      const u = `${w.reference.book}:${w.reference.chapterNum}:${w.reference.verseNum}:${w.text}`;
      l.has(u) || (l.add(u), d.push(w));
    }), d;
  }, [t]);
  return /* @__PURE__ */ p(So, { stickyHeader: !0, children: [
    /* @__PURE__ */ a(Ro, { stickyHeader: !0, children: /* @__PURE__ */ p(je, { children: [
      /* @__PURE__ */ a(Na, { children: i }),
      /* @__PURE__ */ a(Na, { children: s })
    ] }) }),
    /* @__PURE__ */ a(Oo, { children: c.length > 0 && c.map((d) => /* @__PURE__ */ p(
      je,
      {
        onClick: () => {
          e(d.reference);
        },
        children: [
          /* @__PURE__ */ a(fr, { children: Oe(d.reference, "English") }),
          /* @__PURE__ */ a(
            fr,
            {
              className: o,
              "data-platform-content-zoom-root": n["data-platform-content-zoom-root"],
              "data-platform-content-zoom-label": n["data-platform-content-zoom-label"],
              children: Du(d.text)
            }
          )
        ]
      },
      `${d.reference.book} ${d.reference.chapterNum}:${d.reference.verseNum}-${d.text}`
    )) })
  ] });
}
function cs({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    wn.Root,
    {
      "data-slot": "checkbox",
      className: b(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:peer tw:relative tw:flex tw:size-4 tw:shrink-0 tw:items-center tw:justify-center tw:rounded-[4px] tw:border tw:border-input tw:transition-colors tw:outline-none tw:group-has-disabled/field:opacity-50 tw:after:absolute tw:after:-inset-x-3 tw:after:-inset-y-2 tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:aria-invalid:aria-checked:border-primary tw:dark:bg-input/30 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40 tw:data-checked:border-primary tw:data-checked:bg-primary tw:data-checked:text-primary-foreground tw:dark:data-checked:bg-primary",
        t
      ),
      ...e,
      children: /* @__PURE__ */ a(
        wn.Indicator,
        {
          "data-slot": "checkbox-indicator",
          className: "tw:grid tw:place-content-center tw:text-current tw:transition-none tw:[&>svg]:size-3.5",
          children: /* @__PURE__ */ a(zr, {})
        }
      )
    }
  );
}
const Mu = (t) => {
  if (t === "asc")
    return /* @__PURE__ */ a(Kc, { className: "tw:h-4 tw:w-4" });
  if (t === "desc")
    return /* @__PURE__ */ a(Hc, { className: "tw:h-4 tw:w-4" });
}, $a = (t, e, r) => /* @__PURE__ */ a(Jt, { children: /* @__PURE__ */ p(kt, { children: [
  /* @__PURE__ */ p(
    _t,
    {
      className: b("tw:flex tw:w-full tw:justify-start", r),
      variant: "ghost",
      onClick: () => t.toggleSorting(void 0),
      children: [
        /* @__PURE__ */ a("span", { className: "tw:w-6 tw:max-w-fit tw:flex-1 tw:overflow-hidden tw:text-ellipsis", children: e }),
        Mu(t.getIsSorted())
      ]
    }
  ),
  /* @__PURE__ */ a(Nt, { side: "bottom", children: e })
] }) }), Gh = (t) => ({
  accessorKey: "item",
  accessorFn: (e) => e.items[0],
  header: ({ column: e }) => $a(e, t)
}), Pu = (t, e) => ({
  accessorKey: `item${e}`,
  accessorFn: (r) => r.items[e],
  header: ({ column: r }) => $a(r, t)
}), qh = (t) => ({
  accessorKey: "count",
  header: ({ column: e }) => $a(e, t, "tw:justify-end"),
  cell: ({ row: e }) => /* @__PURE__ */ a("div", { className: "tw:flex tw:justify-end tw:tabular-nums", children: e.getValue("count") })
}), no = (t, e, r, o, n, i) => {
  let s = [...r];
  t.forEach((d) => {
    e === "approved" ? s.includes(d) || s.push(d) : s = s.filter((l) => l !== d);
  }), o(s);
  let c = [...n];
  t.forEach((d) => {
    e === "unapproved" ? c.includes(d) || c.push(d) : c = c.filter((l) => l !== d);
  }), i(c);
}, Wh = (t, e, r, o, n) => ({
  accessorKey: "status",
  header: ({ column: i }) => $a(i, t, "tw:justify-center"),
  cell: ({ row: i }) => {
    const s = i.getValue("status"), c = i.getValue("item");
    return (
      // Center the status buttons in the cell to match the centered status column header (the
      // ToggleGroup would otherwise sit left-aligned).
      /* @__PURE__ */ a("div", { className: "tw:flex tw:justify-center", children: /* @__PURE__ */ p(qi, { value: s, variant: "outline", type: "single", className: "tw:gap-0", children: [
        /* @__PURE__ */ a(
          ma,
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
            children: /* @__PURE__ */ a(jc, {})
          }
        ),
        /* @__PURE__ */ a(
          ma,
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
            children: /* @__PURE__ */ a(Fc, {})
          }
        ),
        /* @__PURE__ */ a(
          ma,
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
            children: /* @__PURE__ */ a(Uc, {})
          }
        )
      ] }) })
    );
  }
}), Yh = (t) => t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g), Xh = (t) => {
  const e = /^\\[vc]\s+(\d+)/, r = t.match(e);
  if (r)
    return +r[1];
}, Zh = (t) => {
  const e = t.match(/^\\id\s+([A-Za-z]+)/);
  return e ? e[1] : "";
}, Au = (t, e, r) => r.includes(t) ? "unapproved" : e.includes(t) ? "approved" : "unknown", Jh = Object.freeze([
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
  const n = en(o.key) ? o.key : o.key[0];
  return {
    items: en(o.key) ? [o.key] : o.key,
    count: o.count,
    status: o.status || Au(n, e, r),
    occurrences: o.occurrences || []
  };
}), ve = (t, e) => t[e] ?? e;
function Qh({
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
  classNameForVerseText: u,
  onItemSelected: g
}) {
  const f = ve(r, "%webView_inventory_all%"), N = ve(r, "%webView_inventory_approved%"), m = ve(r, "%webView_inventory_unapproved%"), h = ve(r, "%webView_inventory_unknown%"), y = ve(r, "%webView_inventory_scope_currentBook%"), k = ve(r, "%webView_inventory_scope_chapter%"), C = ve(r, "%webView_inventory_scope_verse%"), P = ve(r, "%webView_inventory_filter_text%"), j = ve(
    r,
    "%webView_inventory_show_additional_items%"
  ), z = ve(r, "%webView_inventory_no_results%"), [D, I] = E(!1), [R, O] = E("all"), [H, q] = E(""), [X, x] = E([]), Y = A(() => {
    const G = t ?? [];
    return G.length === 0 ? [] : Vu(G, n, i);
  }, [t, n, i]), _ = A(() => {
    if (D) return Y;
    const G = [];
    return Y.forEach((it) => {
      const ct = it.items[0], st = G.find(
        (zt) => zt.items[0] === ct
      );
      st ? (st.count += it.count, st.occurrences = st.occurrences.concat(it.occurrences)) : G.push({
        items: [ct],
        count: it.count,
        occurrences: it.occurrences,
        status: it.status
      });
    }), G;
  }, [D, Y]), T = A(() => _.length === 0 ? [] : $u(_, R, H), [_, R, H]), L = A(() => {
    var ct, st;
    if (!D) return d;
    const G = (ct = o == null ? void 0 : o.tableHeaders) == null ? void 0 : ct.length;
    if (!G) return d;
    const it = [];
    for (let zt = 0; zt < G; zt++)
      it.push(
        Pu(
          ((st = o == null ? void 0 : o.tableHeaders) == null ? void 0 : st[zt]) || "Additional Item",
          zt + 1
        )
      );
    return [...it, ...d];
  }, [o == null ? void 0 : o.tableHeaders, d, D]);
  W(() => {
    T.length === 0 ? x([]) : T.length === 1 && x(T[0].items);
  }, [T]);
  const $ = (G, it) => {
    it.setRowSelection(() => {
      const st = {};
      return st[G.index] = !0, st;
    });
    const ct = G.original.items;
    x(ct), g && ct.length > 0 && g(ct[0]);
  }, K = (G) => {
    if (G === "book" || G === "chapter" || G === "verse")
      c(G);
    else
      throw new Error(`Invalid scope value: ${G}`);
  }, at = (G) => {
    if (G === "all" || G === "approved" || G === "unapproved" || G === "unknown")
      O(G);
    else
      throw new Error(`Invalid status filter value: ${G}`);
  }, et = A(() => {
    if (_.length === 0 || X.length === 0) return [];
    const G = _.filter((it) => pc(
      D ? it.items : [it.items[0]],
      X
    ));
    if (G.length > 1) throw new Error("Selected item is not unique");
    return G.length === 0 ? [] : G[0].occurrences;
  }, [X, D, _]);
  return /* @__PURE__ */ a("div", { id: l, className: "pr-twp tw:h-full tw:overflow-auto", children: /* @__PURE__ */ p("div", { className: "tw:flex tw:h-full tw:w-full tw:min-w-min tw:flex-col", children: [
    /* @__PURE__ */ p("div", { className: "tw:flex tw:items-stretch", style: { contain: "inline-size" }, children: [
      /* @__PURE__ */ p(
        yr,
        {
          onValueChange: (G) => at(G),
          defaultValue: R,
          children: [
            /* @__PURE__ */ a(_r, { className: "tw:m-1 tw:w-auto tw:flex-1", children: /* @__PURE__ */ a(kr, { placeholder: "Select filter" }) }),
            /* @__PURE__ */ p(Nr, { children: [
              /* @__PURE__ */ a(ce, { value: "all", children: f }),
              /* @__PURE__ */ a(ce, { value: "approved", children: N }),
              /* @__PURE__ */ a(ce, { value: "unapproved", children: m }),
              /* @__PURE__ */ a(ce, { value: "unknown", children: h })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ p(yr, { onValueChange: (G) => K(G), defaultValue: s, children: [
        /* @__PURE__ */ a(_r, { className: "tw:m-1 tw:w-auto tw:flex-1", children: /* @__PURE__ */ a(kr, { placeholder: "Select scope" }) }),
        /* @__PURE__ */ p(Nr, { children: [
          /* @__PURE__ */ a(ce, { value: "book", children: y }),
          /* @__PURE__ */ a(ce, { value: "chapter", children: k }),
          /* @__PURE__ */ a(ce, { value: "verse", children: C })
        ] })
      ] }),
      /* @__PURE__ */ a(
        zo,
        {
          className: "tw:m-1 tw:flex-1 tw:rounded-md tw:border",
          placeholder: P,
          value: H,
          onChange: (G) => {
            q(G.target.value);
          }
        }
      ),
      o && /* @__PURE__ */ a(Jt, { children: /* @__PURE__ */ p(kt, { children: [
        /* @__PURE__ */ a(_t, { asChild: !0, children: /* @__PURE__ */ p("div", { className: "tw:m-1 tw:flex tw:w-fit tw:min-w-[26px] tw:items-center tw:rounded-md tw:border", children: [
          /* @__PURE__ */ a(
            cs,
            {
              className: "tw:m-1 tw:shrink-0",
              checked: D,
              onCheckedChange: (G) => {
                I(G);
              }
            }
          ),
          /* @__PURE__ */ a(gt, { className: "tw:m-1 tw:truncate", children: (o == null ? void 0 : o.checkboxText) ?? j })
        ] }) }),
        /* @__PURE__ */ a(Nt, { children: (o == null ? void 0 : o.checkboxText) ?? j })
      ] }) })
    ] }),
    /* @__PURE__ */ a("div", { className: "tw:m-1 tw:flex-1 tw:overflow-auto tw:rounded-md tw:border", children: /* @__PURE__ */ a(
      fu,
      {
        columns: L,
        data: T,
        onRowClickHandler: $,
        stickyHeader: !0,
        isLoading: w,
        noResultsMessage: z
      }
    ) }),
    et.length > 0 && /* @__PURE__ */ a("div", { className: "tw:m-1 tw:flex-1 tw:overflow-auto tw:rounded-md tw:border", children: /* @__PURE__ */ a(
      Iu,
      {
        classNameForText: u,
        occurrenceData: et,
        setScriptureReference: e,
        localizedStrings: r
      }
    ) })
  ] }) });
}
function Lu(t, e) {
  return Object.entries(t).filter(([, r]) => "menuItem" in r && r.menuItem === e).sort(([, r], [, o]) => r.order - o.order).map(([r]) => r);
}
function Bu(t, e) {
  return Object.entries(t).filter(([r, o]) => ds(r, o, e)).sort(([, r], [, o]) => r.order - o.order).map(([r]) => r);
}
function ls(t) {
  return Object.entries(t).flatMap(([e, r]) => typeof r == "object" ? [{ columnKey: e, column: r }] : []).sort((e, r) => e.column.order - r.column.order);
}
function ds(t, e, r) {
  return "column" in e && e.column === r || t === r;
}
function ju(t) {
  const e = new Set(t.items.map((o) => o.group)), r = Object.entries(t.groups).filter(
    ([o]) => e.has(o)
  );
  return ls(t.columns).filter(
    ({ columnKey: o }) => r.some(
      ([n, i]) => ds(n, i, o)
    )
  ).map(({ columnKey: o, column: n }) => ({
    columnKey: o,
    label: n.label,
    isHeaderHidden: n.isHeaderHidden ?? !1
  }));
}
function Va(t) {
  return t.some((e) => qn(e.iconNameBefore) || e.iconPathBefore) ? "icon" : "none";
}
function Wo(t, e) {
  let r = !1;
  return t.flatMap(({ groupKey: o, items: n }) => {
    if (n.length === 0) return [];
    const i = r ? [e(o)] : [];
    return r = !0, [...i, ...n];
  });
}
function ws(t, e) {
  return e.map((r) => ({
    groupKey: r,
    items: t.items.filter((o) => o.group === r).sort((o, n) => o.order - n.order).map(
      (o) => "command" in o ? { item: o } : {
        item: o,
        subGroups: ws(
          t,
          Lu(t.groups, o.id)
        )
      }
    )
  }));
}
function us(t) {
  return t ? {
    columns: ls(t.columns).map((e) => ({
      ...e,
      groups: ws(t, Bu(t.groups, e.columnKey))
    }))
  } : { columns: [] };
}
const Fu = "16rem", Uu = "3rem", ps = Rt.createContext(void 0);
function La() {
  const t = Rt.useContext(ps);
  if (!t)
    throw new Error("useSidebar must be used within a SidebarProvider.");
  return t;
}
function Ku({
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
  const [d, l] = Rt.useState(t), w = e ?? d, u = Rt.useCallback(
    (C) => {
      const P = typeof C == "function" ? C(w) : C;
      r ? r(P) : l(P);
    },
    [r, w]
  ), g = Rt.useCallback(() => u((C) => !C), [u]), f = w ? "expanded" : "collapsed", h = le() === "ltr" ? s : s === "primary" ? "secondary" : "primary", y = Rt.useMemo(
    () => ({
      state: f,
      open: w,
      setOpen: u,
      toggleSidebar: g,
      // CUSTOM: Passes direction-aware side into context so SidebarTrigger icon and Sidebar
      // positioning both respond correctly in RTL layouts
      side: h
    }),
    [f, w, u, g, h]
  ), k = {
    "--sidebar-width": Fu,
    "--sidebar-width-icon": Uu,
    ...n
  };
  return /* @__PURE__ */ a(ps.Provider, { value: y, children: /* @__PURE__ */ a(
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
      children: i
    }
  ) });
}
function Hu({
  // CUSTOM: Removed 'side' prop from Sidebar - it is now read from context (moved to SidebarProvider)
  variant: t = "sidebar",
  collapsible: e = "offcanvas",
  className: r,
  children: o,
  ...n
}) {
  const i = La();
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
  ) : /* @__PURE__ */ p(
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
            "data-side": i.side,
            className: b(
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
function tg({ className: t, onClick: e, ...r }) {
  const { toggleSidebar: o, side: n } = La();
  return /* @__PURE__ */ p(
    J,
    {
      "data-sidebar": "trigger",
      "data-slot": "sidebar-trigger",
      variant: "ghost",
      size: "icon-sm",
      className: b(t),
      onClick: (i) => {
        e == null || e(i), o();
      },
      ...r,
      children: [
        n === "primary" ? /* @__PURE__ */ a(rl, {}) : /* @__PURE__ */ a(al, {}),
        /* @__PURE__ */ a("span", { className: "tw:sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
}
function eg({ className: t, ...e }) {
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
function Gu({ className: t, ...e }) {
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
function rg({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    zo,
    {
      "data-slot": "sidebar-input",
      "data-sidebar": "input",
      className: b("tw:h-8 tw:w-full tw:bg-background tw:shadow-none", t),
      ...e
    }
  );
}
function ag({ className: t, ...e }) {
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
function og({ className: t, ...e }) {
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
function ng({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    Wr,
    {
      "data-slot": "sidebar-separator",
      "data-sidebar": "separator",
      className: b("tw:mx-2 tw:w-auto tw:bg-sidebar-border", t),
      ...e
    }
  );
}
function qu({ className: t, ...e }) {
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
function An({ className: t, ...e }) {
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
function $n({
  className: t,
  asChild: e = !1,
  ...r
}) {
  const o = e ? ea.Root : "div";
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
function ig({
  className: t,
  asChild: e = !1,
  ...r
}) {
  const o = e ? ea.Root : "button";
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
function Vn({ className: t, ...e }) {
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
function Wu({ className: t, ...e }) {
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
function Yu({ className: t, ...e }) {
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
const Xu = Lo(
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
function Zu({
  asChild: t = !1,
  isActive: e = !1,
  variant: r = "default",
  size: o = "default",
  tooltip: n,
  className: i,
  ...s
}) {
  const c = t ? ea.Root : "button", { state: d } = La(), l = /* @__PURE__ */ a(
    c,
    {
      "data-slot": "sidebar-menu-button",
      "data-sidebar": "menu-button",
      "data-size": o,
      "data-active": e,
      className: b(Xu({ variant: r, size: o }), i),
      ...s
    }
  );
  return n ? /* @__PURE__ */ p(kt, { children: [
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
function sg({
  className: t,
  asChild: e = !1,
  showOnHover: r = !1,
  ...o
}) {
  const n = e ? ea.Root : "button";
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
function cg({ className: t, ...e }) {
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
function lg({
  className: t,
  showIcon: e = !1,
  ...r
}) {
  const [o] = Rt.useState(() => `${Math.floor(Math.random() * 40) + 50}%`), n = { "--skeleton-width": o };
  return /* @__PURE__ */ p(
    "div",
    {
      "data-slot": "sidebar-menu-skeleton",
      "data-sidebar": "menu-skeleton",
      className: b("tw:flex tw:h-8 tw:items-center tw:gap-2 tw:rounded-md tw:px-2", t),
      ...r,
      children: [
        e && /* @__PURE__ */ a(gr, { className: "tw:size-4 tw:rounded-md", "data-sidebar": "menu-skeleton-icon" }),
        /* @__PURE__ */ a(
          gr,
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
function dg({ className: t, ...e }) {
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
function wg({ className: t, ...e }) {
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
function ug({
  asChild: t = !1,
  size: e = "md",
  isActive: r = !1,
  className: o,
  ...n
}) {
  const i = t ? ea.Root : "a";
  return /* @__PURE__ */ a(
    i,
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
function Ju({
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
  const u = B(
    (h, y) => {
      o(h, y);
    },
    [o]
  ), g = B(
    (h) => {
      const y = r.find((k) => k.projectId === h);
      return y ? y.projectName : h;
    },
    [r]
  ), f = A(
    () => r.map((h) => ({
      id: h.projectId,
      shortName: h.projectName,
      fullName: h.projectFullName
    })),
    [r]
  ), N = A(() => {
    const h = {
      buttonPlaceholder: c,
      ariaLabel: s
    };
    return d && (h.searchPlaceholder = d), l && (h.commandEmptyMessage = l), h;
  }, [c, s, d, l]), m = B(
    (h) => !n.projectId && h === n.label,
    [n]
  );
  return /* @__PURE__ */ a(
    Hu,
    {
      id: t,
      collapsible: "none",
      variant: "inset",
      className: b("tw:w-96 tw:gap-2 tw:overflow-y-auto", w),
      children: /* @__PURE__ */ p(qu, { children: [
        /* @__PURE__ */ p(An, { children: [
          /* @__PURE__ */ a($n, { className: "tw:text-sm", children: i }),
          /* @__PURE__ */ a(Vn, { children: /* @__PURE__ */ a(Wu, { children: Object.entries(e).map(([h, y]) => /* @__PURE__ */ a(Yu, { children: /* @__PURE__ */ a(
            Zu,
            {
              onClick: () => u(h),
              isActive: m(h),
              children: /* @__PURE__ */ a("span", { className: "tw:pl-3", children: y })
            }
          ) }, h)) }) })
        ] }),
        /* @__PURE__ */ p(An, { children: [
          /* @__PURE__ */ a($n, { className: "tw:text-sm", children: s }),
          /* @__PURE__ */ a(Vn, { className: "tw:pl-3", children: /* @__PURE__ */ p(
            "div",
            {
              className: b(
                "tw:flex tw:w-full tw:items-center tw:gap-2 tw:rounded-md tw:px-2 tw:py-1",
                {
                  "tw:bg-sidebar-accent tw:text-sidebar-accent-foreground": n == null ? void 0 : n.projectId
                }
              ),
              children: [
                /* @__PURE__ */ a(Gc, { className: "tw:h-4 tw:w-4 tw:shrink-0" }),
                /* @__PURE__ */ a(
                  Ks,
                  {
                    mode: "project",
                    projects: f,
                    openTabs: [],
                    selection: { projectId: (n == null ? void 0 : n.projectId) ?? "" },
                    onChangeSelection: ({ projectId: h }) => {
                      if (!h) return;
                      const y = g(h);
                      u(y, h);
                    },
                    buttonVariant: "ghost",
                    buttonClassName: "tw:h-8 tw:w-full tw:flex-1 tw:justify-start tw:font-normal",
                    localizedStrings: N,
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
function pg({
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
  return /* @__PURE__ */ p("div", { className: "tw:box-border tw:flex tw:h-full tw:flex-col", children: [
    /* @__PURE__ */ a("div", { className: "tw:box-border tw:flex tw:items-center tw:justify-center tw:py-4", children: /* @__PURE__ */ a(
      Wn,
      {
        className: "tw:w-9/12",
        value: r,
        onSearch: o,
        placeholder: "Search app settings, extension settings, and project settings"
      }
    ) }),
    /* @__PURE__ */ p(
      Ku,
      {
        id: t,
        className: "tw:h-full tw:flex-1 tw:gap-4 tw:overflow-auto tw:border-t",
        children: [
          /* @__PURE__ */ a(
            Ju,
            {
              className: b("tw:w-1/2 tw:min-w-[140px] tw:max-w-[220px] tw:border-e", n),
              ...i
            }
          ),
          /* @__PURE__ */ a(Gu, { className: "tw:min-w-[215px]", children: e })
        ]
      }
    )
  ] });
}
const Ve = "scrBook", Qu = "scrRef", Qe = "source", tp = "details", ep = "Scripture Reference", rp = "Scripture Book", hs = "Type", ap = "Details";
function op(t, e) {
  const r = e ?? !1;
  return [
    {
      accessorFn: (o) => `${o.start.book} ${o.start.chapterNum}:${o.start.verseNum}`,
      id: Ve,
      header: (t == null ? void 0 : t.scriptureReferenceColumnName) ?? ep,
      cell: (o) => {
        const n = o.row.original;
        return o.row.getIsGrouped() ? St.bookIdToEnglishName(n.start.book) : o.row.groupingColumnId === Ve ? Oe(n.start) : void 0;
      },
      getGroupingValue: (o) => St.bookIdToNumber(o.start.book),
      sortingFn: (o, n) => Ca(o.original.start, n.original.start),
      enableGrouping: !0
    },
    {
      accessorFn: (o) => Oe(o.start),
      id: Qu,
      header: void 0,
      cell: (o) => {
        const n = o.row.original;
        return o.row.getIsGrouped() ? void 0 : Oe(n.start);
      },
      sortingFn: (o, n) => Ca(o.original.start, n.original.start),
      enableGrouping: !1
    },
    {
      accessorFn: (o) => o.source.displayName,
      id: Qe,
      header: r ? (t == null ? void 0 : t.typeColumnName) ?? hs : void 0,
      cell: (o) => r || o.row.getIsGrouped() ? o.getValue() : void 0,
      getGroupingValue: (o) => o.source.id,
      sortingFn: (o, n) => o.original.source.displayName.localeCompare(n.original.source.displayName),
      enableGrouping: !0
    },
    {
      accessorFn: (o) => o.detail,
      id: tp,
      header: (t == null ? void 0 : t.detailsColumnName) ?? ap,
      cell: (o) => o.getValue(),
      enableGrouping: !1
    }
  ];
}
const np = (t) => {
  if (!("offset" in t.start))
    throw new Error("No offset available in range start");
  if (t.end && !("offset" in t.end))
    throw new Error("No offset available in range end");
  const { offset: e } = t.start;
  let r = 0;
  return t.end && ({ offset: r } = t.end), !t.end || Ca(t.start, t.end) === 0 ? `${Ga(t.start)}+${e}` : `${Ga(t.start)}+${e}-${Ga(t.end)}+${r}`;
}, Ln = (t) => `${np({ start: t.start, end: t.end })} ${t.source.displayName} ${t.detail}`;
function hg({
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
  const [l, w] = E([]), [u, g] = E([{ id: Ve, desc: !1 }]), [f, N] = E({}), m = A(
    () => t.flatMap((R) => R.data.map((O) => ({
      ...O,
      source: R.source
    }))),
    [t]
  ), h = A(
    () => op(
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
    l.includes(Qe) ? g([
      { id: Qe, desc: !1 },
      { id: Ve, desc: !1 }
    ]) : g([{ id: Ve, desc: !1 }]);
  }, [l]);
  const y = bi({
    data: m,
    columns: h,
    state: {
      grouping: l,
      sorting: u,
      rowSelection: f
    },
    onGroupingChange: w,
    onSortingChange: g,
    onRowSelectionChange: N,
    getExpandedRowModel: sd(),
    getGroupedRowModel: id(),
    getCoreRowModel: yi(),
    getSortedRowModel: xi(),
    getRowId: Ln,
    autoResetExpanded: !1,
    enableMultiRowSelection: !1,
    enableSubRowSelection: !1
  });
  W(() => {
    if (c) {
      const R = y.getSelectedRowModel().rowsById, O = Object.keys(R);
      if (O.length === 1) {
        const H = m.find((q) => Ln(q) === O[0]) || void 0;
        H && c(H);
      }
    }
  }, [f, m, c, y]);
  const k = n ?? rp, C = i ?? hs, P = [
    { label: "No Grouping", value: [] },
    { label: `Group by ${k}`, value: [Ve] },
    { label: `Group by ${C}`, value: [Qe] },
    {
      label: `Group by ${k} and ${C}`,
      value: [Ve, Qe]
    },
    {
      label: `Group by ${C} and ${k}`,
      value: [Qe, Ve]
    }
  ], j = (R) => {
    w(JSON.parse(R));
  }, z = (R, O) => {
    !R.getIsGrouped() && !R.getIsSelected() && R.getToggleSelectedHandler()(O);
  }, D = (R, O) => R.getIsGrouped() ? "" : b("banded-row", O % 2 === 0 ? "even" : "odd"), I = (R, O, H) => {
    if (!((R == null ? void 0 : R.length) === 0 || O.depth < H.column.getGroupedIndex())) {
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
  return /* @__PURE__ */ p("div", { id: d, className: "pr-twp tw:flex tw:h-full tw:w-full tw:flex-col", children: [
    !e && /* @__PURE__ */ p(
      yr,
      {
        value: JSON.stringify(l),
        onValueChange: (R) => {
          j(R);
        },
        children: [
          /* @__PURE__ */ a(_r, { className: "tw:mb-1 tw:mt-2", children: /* @__PURE__ */ a(kr, {}) }),
          /* @__PURE__ */ a(Nr, { position: "item-aligned", children: /* @__PURE__ */ a(uu, { children: P.map((R) => /* @__PURE__ */ a(ce, { value: JSON.stringify(R.value), children: R.label }, R.label)) }) })
        ]
      }
    ),
    /* @__PURE__ */ p(So, { className: "tw:relative tw:flex tw:flex-col tw:overflow-y-auto tw:p-0", children: [
      e && /* @__PURE__ */ a(Ro, { children: y.getHeaderGroups().map((R) => /* @__PURE__ */ a(je, { children: R.headers.filter((O) => O.column.columnDef.header).map((O) => (
        /* For sticky column headers to work, we probably need to change the default definition of the shadcn Table component. See https://github.com/shadcn-ui/ui/issues/1151 */
        /* @__PURE__ */ a(Na, { colSpan: O.colSpan, className: "tw:sticky top-0", children: O.isPlaceholder ? void 0 : /* @__PURE__ */ p("div", { children: [
          O.column.getCanGroup() ? /* @__PURE__ */ a(
            J,
            {
              variant: "ghost",
              title: `Toggle grouping by ${O.column.columnDef.header}`,
              onClick: O.column.getToggleGroupingHandler(),
              type: "button",
              children: O.column.getIsGrouped() ? "🛑" : "👊 "
            }
          ) : void 0,
          " ",
          Kr(O.column.columnDef.header, O.getContext())
        ] }) }, O.id)
      )) }, R.id)) }),
      /* @__PURE__ */ a(Oo, { children: y.getRowModel().rows.map((R, O) => {
        const H = le();
        return /* @__PURE__ */ a(
          je,
          {
            "data-state": R.getIsSelected() ? "selected" : "",
            className: b(D(R, O)),
            onClick: (q) => z(R, q),
            children: R.getVisibleCells().map((q) => {
              if (!(q.getIsPlaceholder() || q.column.columnDef.enableGrouping && !q.getIsGrouped() && (q.column.columnDef.id !== Qe || !r)))
                return /* @__PURE__ */ a(
                  fr,
                  {
                    className: b(
                      q.column.columnDef.id,
                      "tw:p-[1px]",
                      I(l, R, q)
                    ),
                    children: q.getIsGrouped() ? /* @__PURE__ */ p(
                      J,
                      {
                        variant: "link",
                        onClick: R.getToggleExpandedHandler(),
                        type: "button",
                        children: [
                          R.getIsExpanded() && /* @__PURE__ */ a(ar, {}),
                          !R.getIsExpanded() && (H === "ltr" ? /* @__PURE__ */ a(qc, {}) : /* @__PURE__ */ a(Wc, {})),
                          " ",
                          Kr(q.column.columnDef.cell, q.getContext()),
                          " (",
                          R.subRows.length,
                          ")"
                        ]
                      }
                    ) : Kr(q.column.columnDef.cell, q.getContext())
                  },
                  q.id
                );
            })
          },
          R.id
        );
      }) })
    ] })
  ] });
}
function ip({
  availableBookInfo: t,
  selectedBookIds: e,
  onChangeSelectedBookIds: r,
  localizedStrings: o,
  localizedBookNames: n,
  disabledSectionExplanations: i
}) {
  const s = o["%webView_book_selector_books_selected%"], c = o["%webView_book_selector_select_books%"], d = o["%webView_book_selector_search_books%"], l = o["%webView_book_selector_select_all%"], w = o["%webView_book_selector_clear_all%"], u = o["%webView_book_selector_no_book_found%"], { otLong: g, ntLong: f, dcLong: N, extraLong: m } = {
    otLong: o == null ? void 0 : o["%scripture_section_ot_long%"],
    ntLong: o == null ? void 0 : o["%scripture_section_nt_long%"],
    dcLong: o == null ? void 0 : o["%scripture_section_dc_long%"],
    extraLong: o == null ? void 0 : o["%scripture_section_extra_long%"]
  }, [h, y] = E(!1), [k, C] = E(""), P = U(void 0), j = U(!1), z = A(
    () => Yn(t),
    [t]
  ), D = A(() => {
    if (!k.trim()) {
      const _ = {
        [ht.OT]: [],
        [ht.NT]: [],
        [ht.DC]: [],
        [ht.Extra]: []
      };
      return z.forEach((T) => {
        const L = pa(T);
        _[L].push(T);
      }), _;
    }
    const x = z.filter(
      (_) => _o(_, k, n)
    ), Y = {
      [ht.OT]: [],
      [ht.NT]: [],
      [ht.DC]: [],
      [ht.Extra]: []
    };
    return x.forEach((_) => {
      const T = pa(_);
      Y[T].push(_);
    }), Y;
  }, [z, k, n]), I = B(
    (x, Y = !1) => {
      if (!Y || !P.current) {
        r(
          e.includes(x) ? e.filter((at) => at !== x) : [...e, x]
        ), P.current = x;
        return;
      }
      const _ = z.findIndex((at) => at === P.current), T = z.findIndex((at) => at === x);
      if (_ === -1 || T === -1) return;
      const [L, $] = [
        Math.min(_, T),
        Math.max(_, T)
      ], K = z.slice(L, $ + 1).map((at) => at);
      r(
        e.includes(x) ? e.filter((at) => !K.includes(at)) : [.../* @__PURE__ */ new Set([...e, ...K])]
      );
    },
    [e, r, z]
  ), R = (x) => {
    I(x, j.current), j.current = !1;
  }, O = (x, Y) => {
    x.preventDefault(), I(Y, x.shiftKey);
  }, H = () => {
    r(z.map((x) => x));
  }, q = () => {
    r([]);
  }, X = A(
    () => Object.values(ht).filter(
      (x) => (i == null ? void 0 : i[x]) !== void 0 && Do(z, x).length === 0
    ).map((x) => ({ section: x, explanation: i == null ? void 0 : i[x] })),
    [i, z]
  );
  return /* @__PURE__ */ p(
    Cr,
    {
      open: h,
      onOpenChange: (x) => {
        y(x), x || C("");
      },
      children: [
        /* @__PURE__ */ a(Er, { asChild: !0, children: /* @__PURE__ */ p(
          J,
          {
            variant: "outline",
            role: "combobox",
            "aria-expanded": h,
            className: "tw:max-w-64 tw:justify-between",
            children: [
              e.length > 0 ? `${s}: ${e.length}` : c,
              /* @__PURE__ */ a(Yc, { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
            ]
          }
        ) }),
        /* @__PURE__ */ a(
          Tr,
          {
            className: "tw:max-h-(--radix-popover-content-available-height) tw:w-[500px] tw:max-w-[calc(100vw-2rem)] tw:p-0",
            align: "start",
            collisionPadding: 8,
            children: /* @__PURE__ */ p(
              Sr,
              {
                className: "tw:min-h-0",
                shouldFilter: !1,
                onKeyDown: (x) => {
                  x.key === "Enter" && (j.current = x.shiftKey);
                },
                children: [
                  /* @__PURE__ */ a(
                    No,
                    {
                      className: "tw:shrink-0",
                      placeholder: d,
                      value: k,
                      onValueChange: C,
                      spaceSelectsHighlightedItem: !0
                    }
                  ),
                  /* @__PURE__ */ p("div", { className: "tw:flex tw:shrink-0 tw:justify-between tw:border-b tw:p-2", children: [
                    /* @__PURE__ */ a(
                      J,
                      {
                        variant: "ghost",
                        size: "sm",
                        onClick: H,
                        disabled: z.length === 0,
                        children: l
                      }
                    ),
                    /* @__PURE__ */ a(J, { variant: "ghost", size: "sm", onClick: q, children: w })
                  ] }),
                  /* @__PURE__ */ p(Rr, { className: "tw:max-h-72 tw:min-h-0 tw:flex-1", children: [
                    /* @__PURE__ */ a(Co, { children: u }),
                    Object.values(ht).filter((x) => D[x].length > 0).map((x, Y) => {
                      const _ = D[x];
                      return /* @__PURE__ */ p(rr, { children: [
                        Y > 0 && /* @__PURE__ */ a(Hs, { alwaysRender: !0 }),
                        /* @__PURE__ */ a(
                          er,
                          {
                            heading: Kn(x, g, f, N, m),
                            children: _.map((T) => /* @__PURE__ */ a(
                              ki,
                              {
                                bookId: T,
                                isSelected: e.includes(T),
                                onSelect: () => R(T),
                                onMouseDown: (L) => O(L, T),
                                section: pa(T),
                                showCheck: !0,
                                localizedBookNames: n,
                                commandValue: go(T, n),
                                className: "tw:flex tw:items-center"
                              },
                              T
                            ))
                          }
                        )
                      ] }, x);
                    })
                  ] }),
                  X.length > 0 && /* @__PURE__ */ a("div", { className: "tw:shrink-0 tw:border-t tw:p-2", children: X.map(({ section: x, explanation: Y }) => /* @__PURE__ */ a("p", { className: "tw:text-xs tw:text-muted-foreground", children: Y }, x)) })
                ]
              }
            )
          }
        )
      ]
    }
  );
}
function sp({
  disabled: t,
  tooltipText: e,
  children: r,
  className: o
}) {
  return /* @__PURE__ */ a(Jt, { children: /* @__PURE__ */ p(kt, { children: [
    /* @__PURE__ */ a(_t, { asChild: !0, children: /* @__PURE__ */ a(
      Zr,
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
function cp({
  section: t,
  availableBookIds: e,
  selectedBookIds: r,
  onToggle: o,
  localizedStrings: n,
  disabledExplanation: i
}) {
  const s = Do(e, t).length === 0, c = n["%scripture_section_ot_short%"], d = n["%scripture_section_nt_short%"], l = n["%scripture_section_dc_short%"], w = n["%scripture_section_extra_short%"], u = /* @__PURE__ */ a(
    J,
    {
      variant: "outline",
      size: "sm",
      onClick: () => o(t),
      className: b(
        Xn(e, t, r) && !s && "tw:bg-primary tw:text-primary-foreground tw:hover:bg-primary/70 tw:hover:text-primary-foreground"
      ),
      disabled: s,
      children: Gs(
        t,
        c,
        d,
        l,
        w
      )
    }
  );
  return i ? /* @__PURE__ */ a(
    sp,
    {
      className: "tw:flex",
      disabled: s,
      tooltipText: i,
      children: u
    }
  ) : u;
}
const Bn = 5, io = 6;
function lp({
  availableBookInfo: t,
  selectedBookIds: e,
  onChangeSelectedBookIds: r,
  localizedStrings: o,
  localizedBookNames: n,
  disabledSectionExplanations: i
}) {
  const s = o["%webView_book_selector_more%"], c = A(
    () => Yn(t),
    [t]
  ), d = B(
    (l) => {
      const w = Do(c, l).map((u) => u);
      r(
        Xn(c, l, e) ? e.filter((u) => !w.includes(u)) : [.../* @__PURE__ */ new Set([...e, ...w])]
      );
    },
    [e, r, c]
  );
  return /* @__PURE__ */ p("div", { className: "tw:space-y-2", children: [
    /* @__PURE__ */ a("div", { className: "tw:flex tw:flex-wrap tw:gap-2", children: Object.values(ht).map((l) => /* @__PURE__ */ a(
      cp,
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
      ip,
      {
        availableBookInfo: t,
        selectedBookIds: e,
        onChangeSelectedBookIds: r,
        localizedStrings: o,
        localizedBookNames: n,
        disabledSectionExplanations: i
      }
    ),
    e.length > 0 && /* @__PURE__ */ p("div", { className: "tw:mt-2 tw:flex tw:flex-wrap tw:gap-1", children: [
      e.slice(
        0,
        e.length === io ? io : Bn
      ).map((l) => /* @__PURE__ */ a(qr, { className: "tw:hover:bg-secondary", variant: "secondary", children: Re(l, n) }, l)),
      e.length > io && /* @__PURE__ */ a(
        qr,
        {
          className: "tw:hover:bg-secondary",
          variant: "secondary",
          children: `+${e.length - Bn} ${s}`
        }
      )
    ] })
  ] });
}
const dp = Object.freeze([
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
]), gg = Object.freeze([
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
  ...dp
]), Tt = (t, e) => t[e] ?? e, wp = Object.freeze([" ", "-"]);
function fg({
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
  variant: u = "radio",
  rangeStart: g,
  rangeEnd: f,
  onRangeStartChange: N,
  onRangeEndChange: m,
  currentScrRef: h,
  onCurrentScrRefChange: y,
  bookChapterControlLocalizedStrings: k,
  getEndVerse: C,
  hideLabel: P = !1,
  buttonClassName: j
}) {
  const z = Tt(
    s,
    "%webView_scope_selector_selected_text%"
  ), D = Tt(s, "%webView_scope_selector_verse%"), I = Tt(s, "%webView_scope_selector_chapter%"), R = Tt(s, "%webView_scope_selector_book%"), O = Tt(
    s,
    "%webView_scope_selector_current_verse%"
  ), H = Tt(
    s,
    "%webView_scope_selector_current_chapter%"
  ), q = Tt(s, "%webView_scope_selector_current_book%"), X = Tt(s, "%webView_scope_selector_choose_books%"), x = Tt(s, "%webView_scope_selector_scope%"), Y = Tt(s, "%webView_scope_selector_select_books%"), _ = Tt(s, "%webView_scope_selector_range%"), T = Tt(s, "%webView_scope_selector_select_range%"), L = Tt(s, "%webView_scope_selector_range_start%"), $ = Tt(s, "%webView_scope_selector_range_end%"), K = Tt(s, "%webView_scope_selector_ok%"), at = Tt(s, "%webView_scope_selector_cancel%"), et = Tt(s, "%webView_scope_selector_navigate%"), G = (V) => {
    if (!h) return;
    const Z = h.book.toUpperCase();
    switch (V) {
      case "verse":
        return Oe(h, "id");
      case "chapter":
        return `${Z} ${h.chapterNum}`;
      case "book":
        return Z;
      default:
        return;
    }
  }, it = [
    { value: "selectedText", label: z, id: "scope-selected-text" },
    {
      value: "verse",
      label: D,
      dropdownLabel: O,
      scrRefSuffix: G("verse"),
      id: "scope-verse"
    },
    {
      value: "chapter",
      label: I,
      dropdownLabel: H,
      scrRefSuffix: G("chapter"),
      id: "scope-chapter"
    },
    {
      value: "book",
      label: R,
      dropdownLabel: q,
      scrRefSuffix: G("book"),
      id: "scope-book"
    },
    { value: "selectedBooks", label: X, id: "scope-selected" },
    { value: "range", label: _, id: "scope-range" }
  ], ct = (V, Z, bt = !1) => /* @__PURE__ */ p(yt, { children: [
    V,
    Z && !bt && /* @__PURE__ */ p("span", { className: "tw:text-muted-foreground", children: [
      ": ",
      Z
    ] })
  ] }), st = e ? it.filter((V) => e.includes(V.value)) : it, zt = h ?? qa, Dt = g ?? zt, Bt = f ?? zt, Me = () => {
  }, we = U(null), Ge = U(null), ft = U(!1), Ct = U(null), Kt = U(!1), [_e, ue] = E(void 0), Et = U(!1), mt = U(!1), Pe = U(null), qe = B((V) => {
    if (V) {
      ue("start"), Et.current = !1;
      return;
    }
    ue((Z) => Z === "start" ? void 0 : Z), Et.current && (Et.current = !1, requestAnimationFrame(() => {
      var bt;
      const Z = (bt = we.current) == null ? void 0 : bt.querySelector("button");
      Z == null || Z.click();
    }));
  }, []), Ne = B((V) => {
    if (V) {
      ue("end"), mt.current = !1;
      return;
    }
    ue((Z) => Z === "end" ? void 0 : Z);
  }, []), We = B(
    (V) => {
      N == null || N(V), m == null || m(V), Et.current = !0;
    },
    [N, m]
  ), ee = B(
    (V) => {
      m == null || m(V), mt.current = !0;
    },
    [m]
  ), It = B(
    (V) => {
      r(V), V === "selectedBooks" && n.length === 0 && (h != null && h.book) && i([h.book]);
    },
    [r, n, h, i]
  ), re = st.find((V) => V.value === t), Ce = () => t === "selectedBooks" && n.length > 0 ? n.map((V) => V.toUpperCase()).join(", ") : t === "range" ? hc(Dt, Bt, {
    optionOrLocalizedBookName: "id",
    endRefOptionOrLocalizedBookName: "id",
    repeatBookName: !0
  }) : re ? ct(re.label, re.scrRefSuffix) : t, cr = st.filter(
    (V) => V.value !== "selectedBooks" && V.value !== "range"
  ), M = st.find((V) => V.value === "selectedBooks"), vt = st.find((V) => V.value === "range"), [Yt, Mt] = E(!1), [ae, pe] = E(void 0), [Pt, Ae] = E(void 0), [he, oe] = E(void 0), [Ht, Gt] = E(void 0), [wt, Ee] = E([]), Te = u === "dropdown" && ae === "selectedBooks", ge = /* @__PURE__ */ a(
    lp,
    {
      availableBookInfo: o,
      selectedBookIds: Te ? wt : n,
      onChangeSelectedBookIds: Te ? Ee : i,
      localizedStrings: s,
      localizedBookNames: c,
      disabledSectionExplanations: d
    }
  ), Ye = _e === "end", Xe = _e === "start", fe = "tw:text-muted-foreground", me = u === "dropdown" && ae === "range", lr = me ? oe : We, Pr = me ? Gt : m ? ee : Me, Ze = /* @__PURE__ */ p("div", { className: "tw:flex tw:flex-wrap tw:items-end tw:gap-4", children: [
    /* @__PURE__ */ p("div", { className: "tw:grid tw:gap-2", children: [
      /* @__PURE__ */ a(gt, { htmlFor: "scope-range-start", className: b(Ye && fe), children: L }),
      /* @__PURE__ */ a(
        Ya,
        {
          id: "scope-range-start",
          scrRef: me ? he ?? Dt : Dt,
          handleSubmit: lr,
          localizedBookNames: c,
          localizedStrings: k,
          getEndVerse: C,
          submitKeys: wp,
          onOpenChange: qe,
          className: b(Ye && fe),
          modal: !0
        }
      )
    ] }),
    /* @__PURE__ */ p("div", { ref: we, className: "tw:grid tw:gap-2", children: [
      /* @__PURE__ */ a(gt, { htmlFor: "scope-range-end", className: b(Xe && fe), children: $ }),
      /* @__PURE__ */ a(
        Ya,
        {
          id: "scope-range-end",
          scrRef: me ? Ht ?? Bt : Bt,
          handleSubmit: Pr,
          localizedBookNames: c,
          localizedStrings: k,
          getEndVerse: C,
          disableReferencesUpTo: me ? he ?? Dt : Dt,
          onOpenChange: Ne,
          onCloseAutoFocus: (V) => {
            var Z;
            mt.current && (mt.current = !1, V.preventDefault(), (Z = Pe.current) == null || Z.focus());
          },
          className: b(Xe && fe),
          modal: !0,
          align: "start"
        }
      )
    ] })
  ] }), S = U({}), Q = B(
    (V) => (Z) => {
      S.current[V] = Z;
    },
    []
  ), rt = U(null);
  W(() => {
    if (!Yt) return;
    let V = 0;
    const Z = requestAnimationFrame(() => {
      V = requestAnimationFrame(() => {
        var bt;
        (bt = S.current[t]) == null || bt.focus();
      });
    });
    return () => {
      cancelAnimationFrame(Z), V && cancelAnimationFrame(V);
    };
  }, [Yt, t]);
  const [lt, Ar] = E(null), [dr, wr] = E(null), [Se, Ba] = E(null), ja = 200, [ra, Fa] = E(!1);
  W(() => {
    if (!Se || typeof ResizeObserver > "u") return;
    const V = new ResizeObserver(([Z]) => {
      Fa(Z.contentRect.width < ja);
    });
    return V.observe(Se), () => V.disconnect();
  }, [Se]);
  const $r = B(
    (V) => {
      Ae(V), oe(Dt), Gt(Bt), Ee(n), Mt(!1), pe(V);
    },
    [Dt, Bt, n]
  ), aa = B(() => {
    Pt !== void 0 && (Pt === "range" ? (he && (N == null || N(he)), Ht && (m == null || m(Ht))) : Pt === "selectedBooks" && i(wt), It(Pt), pe(void 0), Ae(void 0));
  }, [
    Pt,
    he,
    Ht,
    wt,
    N,
    m,
    i,
    It
  ]), ur = B((V) => {
    V || (pe(void 0), Ae(void 0));
  }, []), oa = B((V) => {
    var Z;
    V.preventDefault(), (Z = rt.current) == null || Z.focus();
  }, []), na = (V) => t === V ? /* @__PURE__ */ a("span", { className: "tw:absolute tw:flex tw:h-3.5 tw:w-3.5 tw:items-center tw:justify-center tw:ltr:left-2 tw:rtl:right-2", children: /* @__PURE__ */ a(Ta, { className: "tw:h-4 tw:w-4" }) }) : void 0;
  return /* @__PURE__ */ p("div", { id: w, className: "tw:grid tw:gap-4", children: [
    /* @__PURE__ */ p("div", { className: "tw:grid tw:gap-2", children: [
      !P && /* @__PURE__ */ a(gt, { children: x }),
      u === "dropdown" ? /* @__PURE__ */ p(nr, { open: Yt, onOpenChange: Mt, children: [
        /* @__PURE__ */ a(Ue, { asChild: !0, children: /* @__PURE__ */ p(
          J,
          {
            ref: rt,
            variant: "outline",
            role: "combobox",
            className: b(
              "tw:w-full tw:justify-between tw:overflow-hidden tw:font-normal",
              j
            ),
            children: [
              /* @__PURE__ */ a("span", { className: "tw:min-w-0 tw:flex-1 tw:truncate tw:text-start", children: Ce() }),
              /* @__PURE__ */ a(ar, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
            ]
          }
        ) }),
        /* @__PURE__ */ a(
          ir,
          {
            ref: Ba,
            className: "tw:w-[var(--radix-dropdown-menu-trigger-width)] tw:min-w-[12rem]",
            align: "start",
            children: /* @__PURE__ */ p(Ka, { container: Se, children: [
              cr.map(({ value: V, label: Z, dropdownLabel: bt, scrRefSuffix: ne, id: ie }) => {
                const $e = l == null ? void 0 : l[V];
                return /* @__PURE__ */ p(
                  Be,
                  {
                    ref: Q(V),
                    disabled: !!$e,
                    className: "tw:relative tw:ps-8 data-[highlighted]:tw:bg-accent data-[highlighted]:tw:text-accent-foreground",
                    onSelect: () => It(V),
                    "data-selected": t === V ? "true" : void 0,
                    children: [
                      t === V && /* @__PURE__ */ a("span", { className: "tw:absolute tw:flex tw:h-3.5 tw:w-3.5 tw:items-center tw:justify-center tw:ltr:left-2 tw:rtl:right-2", children: /* @__PURE__ */ a(Ta, { className: "tw:h-4 tw:w-4" }) }),
                      /* @__PURE__ */ p("span", { className: "tw:flex tw:min-w-0 tw:flex-col tw:gap-0.5", children: [
                        /* @__PURE__ */ a("span", { className: "tw:flex tw:items-center tw:gap-1.5", children: ct(bt ?? Z, ne, ra) }),
                        $e && /* @__PURE__ */ a("span", { className: "tw:text-xs tw:whitespace-normal tw:text-foreground", children: $e })
                      ] })
                    ]
                  },
                  ie
                );
              }),
              (M || vt) && /* @__PURE__ */ a(br, {}),
              M && /* @__PURE__ */ p(
                Be,
                {
                  ref: Q("selectedBooks"),
                  className: b(
                    "tw:relative tw:ps-8",
                    "data-[highlighted]:tw:bg-accent data-[highlighted]:tw:text-accent-foreground"
                  ),
                  onSelect: () => $r("selectedBooks"),
                  "data-selected": t === "selectedBooks" ? "true" : void 0,
                  children: [
                    na("selectedBooks"),
                    `${M.label}…`
                  ]
                }
              ),
              vt && /* @__PURE__ */ p(
                Be,
                {
                  ref: Q("range"),
                  className: b(
                    "tw:relative tw:ps-8",
                    "data-[highlighted]:tw:bg-accent data-[highlighted]:tw:text-accent-foreground"
                  ),
                  onSelect: () => $r("range"),
                  "data-selected": t === "range" ? "true" : void 0,
                  children: [
                    na("range"),
                    `${vt.label}…`
                  ]
                }
              ),
              y && /* @__PURE__ */ p(yt, { children: [
                /* @__PURE__ */ a(br, {}),
                /* @__PURE__ */ a(Jr, { className: "tw:px-2 tw:py-1.5 tw:text-xs tw:font-medium tw:text-muted-foreground", children: et }),
                /* @__PURE__ */ a(
                  Be,
                  {
                    ref: Ct,
                    className: "tw:p-0",
                    onSelect: (V) => {
                      var Z, bt;
                      if (V.preventDefault(), ft.current) {
                        ft.current = !1;
                        return;
                      }
                      Kt.current || (bt = (Z = Ge.current) == null ? void 0 : Z.querySelector("button")) == null || bt.click();
                    },
                    children: /* @__PURE__ */ a(
                      "div",
                      {
                        ref: Ge,
                        className: "tw:w-full tw:px-1 tw:pb-1",
                        onPointerDownCapture: (V) => {
                          const Z = V.target instanceof HTMLElement ? V.target : void 0;
                          Z != null && Z.closest("button") && (ft.current = !0, requestAnimationFrame(() => {
                            ft.current = !1;
                          }));
                        },
                        children: /* @__PURE__ */ a(
                          Ya,
                          {
                            id: "scope-navigate",
                            scrRef: h ?? qa,
                            handleSubmit: y,
                            localizedBookNames: c,
                            localizedStrings: k,
                            getEndVerse: C,
                            triggerVariant: "ghost",
                            onOpenChange: (V) => {
                              Kt.current = V;
                            },
                            onCloseAutoFocus: (V) => {
                              V.preventDefault(), qs(() => {
                                var Z;
                                return (Z = Ct.current) == null ? void 0 : Z.focus();
                              });
                            },
                            modal: !0,
                            className: "tw:w-full tw:min-w-0 tw:max-w-none tw:justify-between tw:px-2 tw:font-normal",
                            triggerContent: /* @__PURE__ */ p(yt, { children: [
                              /* @__PURE__ */ a("span", { className: "tw:min-w-0 tw:flex-1 tw:truncate tw:text-start", children: Oe(h ?? qa, "id") }),
                              /* @__PURE__ */ a(ar, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
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
        Eo,
        {
          value: t,
          onValueChange: It,
          className: "tw:flex tw:flex-col tw:space-y-1",
          children: st.map(({ value: V, label: Z, scrRefSuffix: bt, id: ne }) => {
            const ie = l == null ? void 0 : l[V];
            return /* @__PURE__ */ p("div", { className: "tw:flex tw:flex-col tw:gap-0.5", children: [
              /* @__PURE__ */ p("div", { className: "tw:flex tw:items-center", children: [
                /* @__PURE__ */ a(
                  _a,
                  {
                    className: "tw:me-2",
                    value: V,
                    id: ne,
                    disabled: !!ie,
                    "aria-describedby": ie ? `${ne}-explanation` : void 0
                  }
                ),
                /* @__PURE__ */ a(gt, { htmlFor: ne, children: ct(Z, bt) })
              ] }),
              ie && // Indented to clear the radio so it reads as belonging to this row's label.
              /* @__PURE__ */ a(
                "span",
                {
                  id: `${ne}-explanation`,
                  className: "tw:ms-6 tw:text-xs tw:whitespace-normal tw:text-muted-foreground",
                  children: ie
                }
              )
            ] }, ne);
          })
        }
      )
    ] }),
    u === "radio" && t === "selectedBooks" && /* @__PURE__ */ p("div", { className: "tw:grid tw:gap-2", children: [
      /* @__PURE__ */ a(gt, { children: Y }),
      ge
    ] }),
    u === "radio" && t === "range" && Ze,
    u === "dropdown" && M && /* @__PURE__ */ a(so, { open: ae === "selectedBooks", onOpenChange: ur, children: /* @__PURE__ */ a(
      co,
      {
        ref: wr,
        onCloseAutoFocus: oa,
        onEscapeKeyDown: (V) => {
          dr != null && dr.querySelector('[data-state="open"]') && V.preventDefault();
        },
        children: /* @__PURE__ */ p(Ka, { container: dr, children: [
          /* @__PURE__ */ a(lo, { className: "tw:pe-8", children: /* @__PURE__ */ a(wo, { children: X }) }),
          ge,
          /* @__PURE__ */ p(tn, { children: [
            /* @__PURE__ */ a(J, { variant: "outline", onClick: () => ur(!1), children: at }),
            /* @__PURE__ */ a(J, { onClick: aa, children: K })
          ] })
        ] })
      }
    ) }),
    u === "dropdown" && vt && /* @__PURE__ */ a(so, { open: ae === "range", onOpenChange: ur, children: /* @__PURE__ */ a(
      co,
      {
        ref: Ar,
        onCloseAutoFocus: oa,
        onEscapeKeyDown: (V) => {
          lt != null && lt.querySelector('[data-state="open"]') && V.preventDefault();
        },
        children: /* @__PURE__ */ p(Ka, { container: lt, children: [
          /* @__PURE__ */ a(lo, { className: "tw:pe-8", children: /* @__PURE__ */ a(wo, { children: T }) }),
          Ze,
          /* @__PURE__ */ p(tn, { children: [
            /* @__PURE__ */ a(J, { variant: "outline", onClick: () => ur(!1), children: at }),
            /* @__PURE__ */ a(J, { ref: Pe, onClick: aa, children: K })
          ] })
        ] })
      }
    ) })
  ] });
}
const jn = -17;
function mg({
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
    ...Ha,
    ...Object.fromEntries(
      Object.entries(o).map(
        ([w, u]) => [
          w,
          w === u && w in Ha ? Ha[w] : u
        ]
      )
    )
  }, l = le();
  return /* @__PURE__ */ p(
    yr,
    {
      value: `${e}`,
      onValueChange: (w) => r(
        w === "undefined" ? void 0 : parseInt(w, 10)
      ),
      disabled: c,
      children: [
        /* @__PURE__ */ a(_r, { size: n, className: b("pr-twp tw:w-auto", i), children: /* @__PURE__ */ a(
          kr,
          {
            placeholder: d[rn(e)] ?? e
          }
        ) }),
        /* @__PURE__ */ a(
          Nr,
          {
            id: s,
            align: l === "rtl" ? "end" : "start",
            alignOffset: jn,
            style: {
              zIndex: Ie,
              minWidth: `calc(var(--radix-select-trigger-width) - ${jn}px)`
            },
            children: t.map((w) => /* @__PURE__ */ a(ce, { value: `${w}`, children: d[rn(w)] }, `${w}`))
          }
        )
      ]
    }
  );
}
function vg({ children: t }) {
  return /* @__PURE__ */ a("div", { className: "pr-twp tw:grid", children: t });
}
function bg({
  primary: t,
  secondary: e,
  children: r,
  isLoading: o = !1,
  loadingMessage: n
}) {
  return /* @__PURE__ */ p("div", { className: "tw:flex tw:items-center tw:justify-between tw:space-x-4 tw:py-2", children: [
    /* @__PURE__ */ p("div", { children: [
      /* @__PURE__ */ a("p", { className: "tw:text-sm tw:font-medium tw:leading-none", children: t }),
      /* @__PURE__ */ a("p", { className: "tw:whitespace-normal tw:break-words tw:text-sm tw:text-muted-foreground", children: e })
    ] }),
    o ? /* @__PURE__ */ a("p", { className: "tw:text-sm tw:text-muted-foreground", children: n }) : /* @__PURE__ */ a("div", { children: r })
  ] });
}
function xg({
  primary: t,
  secondary: e,
  includeSeparator: r = !1
}) {
  return /* @__PURE__ */ p("div", { className: "tw:space-y-4 tw:py-2", children: [
    /* @__PURE__ */ p("div", { children: [
      /* @__PURE__ */ a("h3", { className: "tw:text-lg tw:font-medium", children: t }),
      /* @__PURE__ */ a("p", { className: "tw:text-sm tw:text-muted-foreground", children: e })
    ] }),
    r ? /* @__PURE__ */ a(Wr, {}) : ""
  ] });
}
function Fe({ icon: t, iconName: e, menuLabel: r, leading: o, leadingSlot: n }) {
  const i = o ? "tw:me-2" : "tw:ms-2";
  if (qn(e)) return /* @__PURE__ */ a(Ws, { name: e, className: i });
  if (!t && o && n === "icon")
    return /* @__PURE__ */ a(
      "span",
      {
        "aria-hidden": "true",
        "data-slot": "menu-icon-spacer",
        className: b("tw:inline-block tw:w-4 tw:shrink-0", i)
      }
    );
  if (!t) return;
  const s = `${o ? "Leading" : "Trailing"} icon for ${r}`;
  return o ? /* @__PURE__ */ a(
    "span",
    {
      "data-slot": "menu-icon-image-box",
      className: b(
        "tw:inline-flex tw:w-4 tw:shrink-0 tw:items-center tw:justify-center",
        i
      ),
      children: /* @__PURE__ */ a("img", { className: "tw:max-h-4 tw:max-w-4", src: t, alt: s })
    }
  ) : /* @__PURE__ */ a("img", { className: b("tw:max-h-4 tw:max-w-4", i), src: t, alt: s });
}
function gs({ checked: t }) {
  return /* @__PURE__ */ a(
    "span",
    {
      "aria-hidden": !0,
      "data-slot": "menu-check-slot",
      className: "tw:-me-0.5 tw:inline-flex tw:w-3 tw:shrink-0 tw:items-center tw:justify-center",
      children: t && /* @__PURE__ */ a(zr, { className: "tw:size-3" })
    }
  );
}
const up = (t) => /* @__PURE__ */ a(br, {}, `separator-${t}`), fs = (t, e, r) => t.map(({ groupKey: o, items: n }) => ({
  groupKey: o,
  items: n.map(({ item: i, subGroups: s = [] }) => {
    if ("command" in i) {
      const d = i.checked !== void 0, l = /* @__PURE__ */ p(yt, { children: [
        /* @__PURE__ */ a(
          Fe,
          {
            iconName: i.iconNameBefore,
            icon: i.iconPathBefore,
            menuLabel: i.label,
            leading: !0,
            leadingSlot: r
          }
        ),
        d && /* @__PURE__ */ a(gs, { checked: !!i.checked }),
        i.label,
        /* @__PURE__ */ a(
          Fe,
          {
            iconName: i.iconNameAfter,
            icon: i.iconPathAfter,
            menuLabel: i.label
          }
        ),
        i.shortcut && /* @__PURE__ */ a(Zs, { className: "tw:ps-4", children: /* @__PURE__ */ a(Zn, { hint: i.shortcut }) })
      ] }), w = () => {
        e(i);
      };
      return /* @__PURE__ */ p(kt, { children: [
        /* @__PURE__ */ a(_t, { asChild: !0, children: d ? /* @__PURE__ */ a(
          To,
          {
            className: "tw:ps-1.5 tw:[&>[data-slot=dropdown-menu-checkbox-item-indicator]]:hidden",
            checked: i.checked,
            disabled: i.disabled,
            onSelect: w,
            children: l
          },
          `dropdown-menu-item-${i.label}-${i.command}`
        ) : /* @__PURE__ */ a(
          Be,
          {
            disabled: i.disabled,
            onSelect: w,
            children: l
          },
          `dropdown-menu-item-${i.label}-${i.command}`
        ) }),
        i.tooltip && /* @__PURE__ */ a(Nt, { children: i.tooltip })
      ] }, `tooltip-${i.label}-${i.command}`);
    }
    const c = /* @__PURE__ */ p(Js, { disabled: i.disabled, children: [
      /* @__PURE__ */ a(
        Fe,
        {
          iconName: i.iconNameBefore,
          menuLabel: i.label,
          leading: !0,
          leadingSlot: r
        }
      ),
      i.label,
      /* @__PURE__ */ a(Fe, { iconName: i.iconNameAfter, menuLabel: i.label })
    ] });
    return /* @__PURE__ */ p(Qs, { children: [
      i.tooltip ? /* @__PURE__ */ p(kt, { children: [
        /* @__PURE__ */ a(_t, { asChild: !0, children: c }),
        /* @__PURE__ */ a(Nt, { children: i.tooltip })
      ] }) : c,
      /* @__PURE__ */ a(tc, { children: /* @__PURE__ */ a(ec, { children: Wo(
        fs(
          s,
          e,
          Va(
            s.flatMap((d) => d.items.map(({ item: l }) => l))
          )
        ),
        up
      ) }) })
    ] }, `dropdown-menu-sub-${i.label}-${i.id}`);
  })
}));
function ko({
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
  const l = Ea(), w = A(() => us(e), [e]), u = ju(e), g = i && u.length > 1, f = new Map(
    w.columns.map(({ columnKey: k, groups: C }) => [k, C])
  ), N = (k) => f.get(k) ?? [], m = Va(
    u.flatMap(
      ({ columnKey: k }) => N(k).flatMap((C) => C.items.map(({ item: P }) => P))
    )
  );
  Ci();
  const h = U(null), y = () => Xs(h.current ?? void 0);
  return /* @__PURE__ */ p(nr, { variant: s, children: [
    /* @__PURE__ */ a(Ue, { "aria-label": r, className: n, asChild: !0, id: d, children: /* @__PURE__ */ a(
      J,
      {
        ref: h,
        variant: c,
        size: "icon",
        className: Ys,
        onKeyDown: y,
        onBlur: y,
        children: o ?? /* @__PURE__ */ a(Xc, {})
      }
    ) }),
    /* @__PURE__ */ a(
      ir,
      {
        align: "start",
        style: { zIndex: Ie },
        onCloseAutoFocus: () => {
          Un() === "pointer" && rc(h.current ?? void 0);
        },
        children: u.map(({ columnKey: k, label: C, isHeaderHidden: P }, j) => {
          const z = `${l}-${k}`;
          return /* @__PURE__ */ p(rr, { children: [
            /* @__PURE__ */ p(Gn, { "aria-labelledby": g ? z : void 0, children: [
              g && // A section shown without its heading keeps it for assistive technology only
              /* @__PURE__ */ a(
                Jr,
                {
                  id: z,
                  className: P ? "tw:sr-only" : void 0,
                  children: C
                }
              ),
              /* @__PURE__ */ a(Jt, { children: fs(
                N(k),
                t,
                m
              ).flatMap((D) => D.items) })
            ] }),
            j < u.length - 1 && /* @__PURE__ */ a(br, {})
          ] }, k);
        })
      }
    )
  ] });
}
const pp = 8;
function hp(t, e, r) {
  const o = e.findIndex((s) => t >= s), n = o === -1 ? e.length : o;
  if (r === void 0 || n >= r) return n;
  const i = e.findIndex(
    (s) => t >= s + pp
  );
  return i === -1 ? r : Math.min(r, i);
}
function ms(t, e) {
  const [r, o] = E(0), n = U(void 0);
  return Ft(() => {
    if (!t || typeof ResizeObserver > "u") return;
    const i = () => {
      const { width: c } = t.getBoundingClientRect(), d = n.current;
      n.current = c;
      const l = d === void 0 || d === 0;
      o(
        (w) => hp(c, e, l ? void 0 : w)
      );
    };
    i();
    const s = new ResizeObserver(i);
    return s.observe(t), () => s.disconnect();
  }, [t, e]), r;
}
const gp = Object.freeze([520, 420, 340]), vs = Rt.forwardRef(
  ({ id: t, className: e, children: r }, o) => {
    const [n, i] = E(void 0), s = U(o);
    s.current = o;
    const c = B((u) => {
      i(u ?? void 0);
      const g = s.current;
      typeof g == "function" ? g(u) : g && (g.current = u);
    }, []), d = ms(n, gp), l = Ni() ?? d, w = l >= Hr.MINIMUM;
    return /* @__PURE__ */ a(Pa.Provider, { value: l, children: /* @__PURE__ */ a(
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
function yg({
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
  return /* @__PURE__ */ p(vs, { className: `tw:w-full tw:border-b ${i}`, id: n, children: [
    r && /* @__PURE__ */ a(
      ko,
      {
        onSelectMenuItem: t,
        menuData: r,
        tabLabel: "Project",
        icon: l ?? /* @__PURE__ */ a(Zc, {}),
        buttonVariant: "ghost",
        showSectionHeadings: !0
      }
    ),
    s && /* @__PURE__ */ a("div", { className: "tw:flex tw:min-w-0 tw:shrink tw:grow-[10] tw:flex-row tw:flex-nowrap tw:items-start tw:gap-x-1 tw:gap-y-2 tw:overflow-clip", children: s }),
    c && /* @__PURE__ */ a("div", { className: "tw:flex tw:shrink tw:grow-[1] tw:basis-0 tw:flex-row tw:flex-nowrap tw:items-start tw:justify-center tw:gap-x-1 tw:gap-y-2 tw:overflow-clip tw:@sm:basis-auto", children: c }),
    /* @__PURE__ */ p("div", { className: "tw:flex tw:shrink-0 tw:grow-[1] tw:flex-row-reverse tw:flex-nowrap tw:items-start tw:gap-x-1 tw:gap-y-2 tw:overflow-clip", children: [
      o && /* @__PURE__ */ a(
        ko,
        {
          onSelectMenuItem: e,
          menuData: o,
          tabLabel: "View Info",
          icon: /* @__PURE__ */ a(Jc, {}),
          className: "tw:h-full",
          showSectionHeadings: !0
        }
      ),
      d
    ] })
  ] });
}
function kg({
  onSelectProjectMenuItem: t,
  projectMenuData: e,
  id: r,
  className: o,
  menuButtonIcon: n
}) {
  return /* @__PURE__ */ a(vs, { className: "tw:pointer-events-none", id: r, children: e && /* @__PURE__ */ a(
    ko,
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
const bs = Rt.forwardRef(({ className: t, ...e }, r) => {
  const o = le();
  return /* @__PURE__ */ a(
    de.Root,
    {
      orientation: "vertical",
      ref: r,
      className: b("tw:flex tw:gap-1 tw:rounded-md tw:text-muted-foreground", t),
      ...e,
      dir: o
    }
  );
});
bs.displayName = de.List.displayName;
const xs = Rt.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ a(
  de.List,
  {
    ref: r,
    className: b(
      "tw:flex tw:items-center tw:w-[124px] tw:justify-center tw:rounded-md tw:bg-muted tw:p-1 tw:text-muted-foreground",
      t
    ),
    ...e
  }
));
xs.displayName = de.List.displayName;
const fp = Rt.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ a(
  de.Trigger,
  {
    ref: r,
    ...e,
    className: b(
      "tw:inline-flex tw:w-[116px] tw:cursor-pointer tw:items-center tw:justify-center tw:break-words tw:rounded-sm tw:border-0 tw:bg-muted tw:px-3 tw:py-1.5 tw:text-sm tw:font-medium tw:text-inherit tw:ring-offset-background tw:transition-all tw:hover:text-foreground tw:focus-visible:outline-hidden tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2 tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:data-[state=active]:bg-background tw:data-[state=active]:text-foreground tw:data-[state=active]:shadow-sm tw:overflow-clip",
      t
    )
  }
)), ys = Rt.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ a(
  de.Content,
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
ys.displayName = de.Content.displayName;
function _g({
  tabList: t,
  searchValue: e,
  onSearch: r,
  searchPlaceholder: o,
  headerTitle: n,
  searchClassName: i,
  id: s
}) {
  return /* @__PURE__ */ p("div", { id: s, className: "pr-twp", children: [
    /* @__PURE__ */ p("div", { className: "tw:sticky tw:top-0 tw:space-y-2 tw:pb-2", children: [
      n ? /* @__PURE__ */ a("h1", { children: n }) : "",
      /* @__PURE__ */ a(
        Wn,
        {
          className: i,
          value: e,
          onSearch: r,
          placeholder: o
        }
      )
    ] }),
    /* @__PURE__ */ p(bs, { children: [
      /* @__PURE__ */ a(xs, { children: t.map((c) => /* @__PURE__ */ a(fp, { value: c.value, children: c.value }, c.key)) }),
      t.map((c) => /* @__PURE__ */ a(ys, { value: c.value, children: c.content }, c.key))
    ] })
  ] });
}
function mp({
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
  return /* @__PURE__ */ a(ac.Provider, { value: o, children: /* @__PURE__ */ a(
    Qt.Root,
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
function vp({ ...t }) {
  return /* @__PURE__ */ a(Qt.Menu, { "data-slot": "menubar-menu", ...t });
}
function bp({ ...t }) {
  return /* @__PURE__ */ a(Qt.Portal, { "data-slot": "menubar-portal", ...t });
}
function xp({
  className: t,
  ...e
}) {
  const r = Ia();
  return /* @__PURE__ */ a(
    Qt.Trigger,
    {
      "data-slot": "menubar-trigger",
      className: b(
        "tw:flex tw:items-center tw:rounded-sm tw:px-1.5 tw:py-[2px] tw:text-sm tw:font-medium tw:outline-hidden tw:select-none tw:hover:bg-muted tw:aria-expanded:bg-muted",
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation (portal-rendered content needs this)
        "pr-twp",
        // CUSTOM: Apply variant-driven styles from menu context
        Ma({ variant: r.variant, className: t })
      ),
      ...e
    }
  );
}
function yp({
  className: t,
  align: e = "start",
  alignOffset: r = -4,
  sideOffset: o = 8,
  // CUSTOM: Pull `style` out so the shared z-index can be applied under any caller-supplied style
  style: n,
  // CUSTOM: Destructure ref (a regular prop in React 19) and onCloseAutoFocus so
  // useDismissOnWindowBlur can compose them with its own
  ref: i,
  onCloseAutoFocus: s,
  ...c
}) {
  const d = Jn({ ref: i, onCloseAutoFocus: s });
  return /* @__PURE__ */ a(bp, { children: /* @__PURE__ */ a(
    Qt.Content,
    {
      "data-slot": "menubar-content",
      ...d,
      align: e,
      alignOffset: r,
      sideOffset: o,
      className: b(
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
      style: { zIndex: Ie, ...n },
      ...c
    }
  ) });
}
function kp({
  className: t,
  inset: e,
  variant: r = "default",
  ...o
}) {
  const n = Ia();
  return /* @__PURE__ */ a(
    Qt.Item,
    {
      "data-slot": "menubar-item",
      "data-inset": e,
      "data-variant": r,
      className: b(
        "tw:group/menubar-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-[variant=destructive]:text-destructive tw:data-[variant=destructive]:focus:bg-destructive/10 tw:data-[variant=destructive]:focus:text-destructive tw:dark:data-[variant=destructive]:focus:bg-destructive/20 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:data-[variant=destructive]:*:[svg]:text-destructive!",
        // CUSTOM: Apply variant-driven styles from menu context
        Ma({ variant: n.variant, className: t })
      ),
      ...o
    }
  );
}
function _p({
  className: t,
  children: e,
  checked: r,
  inset: o,
  ...n
}) {
  const i = Ia();
  return /* @__PURE__ */ p(
    Qt.CheckboxItem,
    {
      "data-slot": "menubar-checkbox-item",
      "data-inset": o,
      className: b(
        // CUSTOM: Added `tw:data-disabled:opacity-50` so a disabled checkbox item dims like every other
        // disabled menu item, and `tw:[&_svg:not([class*=size-])]:size-4` so icons inside it get the same
        // 16px size as in MenubarItem. Both were missing from the checkbox item's class list.
        "tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-1.5 tw:ps-7 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        // CUSTOM: Apply variant-driven styles from menu context
        Ma({ variant: i.variant, className: t })
      ),
      checked: r,
      ...n,
      children: [
        /* @__PURE__ */ a(
          "span",
          {
            className: "tw:pointer-events-none tw:absolute tw:start-1.5 tw:flex tw:size-4 tw:items-center tw:justify-center tw:[&_svg:not([class*=size-])]:size-4",
            "data-slot": "menubar-checkbox-item-indicator",
            children: /* @__PURE__ */ a(Qt.ItemIndicator, { children: /* @__PURE__ */ a(zr, {}) })
          }
        ),
        e
      ]
    }
  );
}
function Np({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    Qt.Separator,
    {
      "data-slot": "menubar-separator",
      className: b("tw:-mx-1 tw:my-1 tw:h-px tw:bg-border", t),
      ...e
    }
  );
}
function Cp({ className: t, ...e }) {
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
function Ep({ ...t }) {
  return /* @__PURE__ */ a(Qt.Sub, { "data-slot": "menubar-sub", ...t });
}
function Tp({
  className: t,
  inset: e,
  children: r,
  ...o
}) {
  const n = Ia();
  return /* @__PURE__ */ p(
    Qt.SubTrigger,
    {
      "data-slot": "menubar-sub-trigger",
      "data-inset": e,
      className: b(
        "tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-none tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-inset:ps-7 tw:data-open:bg-accent tw:data-open:text-accent-foreground tw:[&_svg:not([class*=size-])]:size-4",
        // CUSTOM: Apply variant-driven styles from menu context
        Ma({ variant: n.variant, className: t })
      ),
      ...o,
      children: [
        r,
        /* @__PURE__ */ a(ni, { className: "tw:ms-auto tw:size-4" })
      ]
    }
  );
}
function Sp({
  className: t,
  // CUSTOM: Pull `style` out so the shared z-index can be applied under any caller-supplied style
  style: e,
  ...r
}) {
  return /* @__PURE__ */ a(
    Qt.SubContent,
    {
      "data-slot": "menubar-sub-content",
      className: b(
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
      style: { zIndex: Ie, ...e },
      ...r
    }
  );
}
const ya = "platform.app", Br = (t, e) => {
  setTimeout(() => {
    e.forEach((r) => {
      var o;
      (o = t.current) == null || o.dispatchEvent(new KeyboardEvent("keydown", r));
    });
  }, 0);
}, ks = (t) => /* @__PURE__ */ a(Np, {}, `separator-${t}`), _s = (t, e, r) => t.map(({ groupKey: o, items: n }) => ({
  groupKey: o,
  items: n.map(({ item: i, subGroups: s = [] }) => {
    let c;
    if ("command" in i) {
      const d = i.checked !== void 0, l = /* @__PURE__ */ p(yt, { children: [
        /* @__PURE__ */ a(
          Fe,
          {
            iconName: i.iconNameBefore,
            icon: i.iconPathBefore,
            menuLabel: i.label,
            leading: !0,
            leadingSlot: r
          }
        ),
        d && /* @__PURE__ */ a(gs, { checked: !!i.checked }),
        i.label,
        /* @__PURE__ */ a(
          Fe,
          {
            iconName: i.iconNameAfter,
            icon: i.iconPathAfter,
            menuLabel: i.label
          }
        ),
        i.shortcut && /* @__PURE__ */ a(Cp, { className: "tw:ps-4", children: /* @__PURE__ */ a(Zn, { hint: i.shortcut }) })
      ] }), w = () => {
        e(i);
      };
      c = d ? /* @__PURE__ */ a(
        _p,
        {
          className: "tw:ps-1.5 tw:[&>[data-slot=menubar-checkbox-item-indicator]]:hidden",
          checked: i.checked,
          disabled: i.disabled,
          onSelect: w,
          children: l
        },
        `menubar-item-${i.label}-${i.command}`
      ) : /* @__PURE__ */ a(
        kp,
        {
          disabled: i.disabled,
          onSelect: w,
          children: l
        },
        `menubar-item-${i.label}-${i.command}`
      );
    } else
      c = /* @__PURE__ */ p(Ep, { children: [
        /* @__PURE__ */ p(Tp, { disabled: i.disabled, children: [
          /* @__PURE__ */ a(
            Fe,
            {
              iconName: i.iconNameBefore,
              menuLabel: i.label,
              leading: !0,
              leadingSlot: r
            }
          ),
          i.label,
          /* @__PURE__ */ a(Fe, { iconName: i.iconNameAfter, menuLabel: i.label })
        ] }),
        /* @__PURE__ */ a(Sp, { children: Wo(
          _s(
            s,
            e,
            Va(
              s.flatMap((d) => d.items.map((l) => l.item))
            )
          ),
          ks
        ) })
      ] }, `menubar-sub-${i.label}-${i.id}`);
    return /* @__PURE__ */ p(kt, { children: [
      /* @__PURE__ */ a(_t, { asChild: !0, children: c }),
      i.tooltip && /* @__PURE__ */ a(Nt, { children: i.tooltip })
    ] }, `tooltip-${i.label}-${"command" in i ? i.command : i.id}`);
  })
}));
function Rp({
  menuData: t,
  onSelectMenuItem: e,
  onOpenChange: r,
  variant: o,
  value: n,
  onValueChange: i
}) {
  const s = U(void 0), c = U(void 0), d = U(void 0), l = U(void 0), w = U(void 0), u = A(() => us(t), [t]), g = (f) => {
    switch (f) {
      case ya:
        return c;
      case "platform.window":
        return d;
      case "platform.layout":
        return l;
      case "platform.help":
        return w;
      default:
        return;
    }
  };
  if (ld(["alt", "alt+p", "alt+l", "alt+n", "alt+h"], (f, N) => {
    var y, k, C, P;
    f.preventDefault();
    const m = { key: "Escape", code: "Escape", keyCode: 27, bubbles: !0 }, h = { key: " ", code: "Space", keyCode: 32, bubbles: !0 };
    switch (N.hotkey) {
      case "alt":
        Br(c, [m]);
        break;
      case "alt+p":
        (y = c.current) == null || y.focus(), Br(c, [m, h]);
        break;
      case "alt+l":
        (k = d.current) == null || k.focus(), Br(d, [m, h]);
        break;
      case "alt+n":
        (C = l.current) == null || C.focus(), Br(l, [m, h]);
        break;
      case "alt+h":
        (P = w.current) == null || P.focus(), Br(w, [m, h]);
        break;
    }
  }), W(() => {
    if (!r || !s.current) return;
    const f = new MutationObserver((h) => {
      h.forEach((y) => {
        if (y.attributeName === "data-state" && y.target instanceof HTMLElement) {
          const k = y.target.getAttribute("data-state");
          r(k === "open");
        }
      });
    });
    return s.current.querySelectorAll("[data-state]").forEach((h) => {
      f.observe(h, { attributes: !0 });
    }), () => f.disconnect();
  }, [r]), !!t)
    return /* @__PURE__ */ a(
      mp,
      {
        ref: s,
        className: "pr-twp tw:border-0 tw:bg-transparent",
        variant: o,
        value: n,
        onValueChange: i,
        children: u.columns.map(({ columnKey: f, column: N, groups: m }) => /* @__PURE__ */ p(vp, { value: f, children: [
          /* @__PURE__ */ a(xp, { ref: g(f), children: N.label }),
          /* @__PURE__ */ a(
            yp,
            {
              style: { zIndex: Ie },
              children: /* @__PURE__ */ a(Jt, { children: Wo(
                _s(
                  m,
                  e,
                  Va(
                    m.flatMap((h) => h.items.map((y) => y.item))
                  )
                ),
                ks
              ) })
            }
          )
        ] }, f))
      }
    );
}
const Op = Object.freeze([950, 800, 700]);
function Ng(t) {
  switch (t) {
    case void 0:
      return;
    case "darwin":
      return "tw:ps-[85px]";
    default:
      return "tw:pe-[calc(138px+1rem)]";
  }
}
function Cg({
  menuData: t,
  onOpenChange: e,
  onSelectMenuItem: r,
  className: o,
  id: n,
  children: i,
  appMenuIcon: s,
  appMenuAreaChildren: c,
  configAreaChildren: d,
  shouldUseAsAppDragArea: l,
  menubarVariant: w = "default"
}) {
  const [u, g] = E(""), f = U(!1), N = B(() => {
    f.current = u === ya;
  }, [u]), m = B(() => {
    const j = f.current || u === ya;
    f.current = !1, g(j ? "" : ya);
  }, [u]), [h, y] = E(void 0), k = B(
    (j) => y(j ?? void 0),
    []
  ), C = ms(h, Op), P = Ni() ?? C;
  return /* @__PURE__ */ a(Pa.Provider, { value: P, children: /* @__PURE__ */ a(
    "div",
    {
      className: b("tw:border tw:px-4 tw:text-foreground", o),
      style: { position: "relative" },
      id: n,
      children: /* @__PURE__ */ p(
        "div",
        {
          "data-testid": "toolbar-content-row",
          className: "tw:flex tw:h-full tw:w-full tw:justify-between tw:overflow-hidden",
          ref: k,
          style: l ? { WebkitAppRegion: "drag" } : void 0,
          children: [
            /* @__PURE__ */ a("div", { className: "tw:flex tw:shrink-0 tw:grow tw:basis-0", children: /* @__PURE__ */ p(
              "div",
              {
                className: "tw:flex tw:items-center tw:gap-2",
                style: l ? { WebkitAppRegion: "no-drag" } : void 0,
                children: [
                  s && (t ? (
                    // A secondary, pointer-only way into the app menu: the app menu's own trigger,
                    // right beside it, and Alt+P are the accessible entry points. So it is
                    // deliberately out of the tab order and has no tooltip, ARIA menu attributes
                    // or label of its own.
                    /* @__PURE__ */ a(
                      "button",
                      {
                        type: "button",
                        tabIndex: -1,
                        className: "tw:flex tw:shrink-0 tw:items-center tw:rounded-md tw:border-0 tw:bg-transparent tw:p-0",
                        onPointerDown: N,
                        onClick: m,
                        children: s
                      }
                    )
                  ) : s),
                  c,
                  t && /* @__PURE__ */ a(
                    Rp,
                    {
                      menuData: t,
                      onOpenChange: e,
                      onSelectMenuItem: r,
                      variant: w,
                      value: u,
                      onValueChange: g
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
                children: i
              }
            ),
            /* @__PURE__ */ a("div", { className: "tw:flex tw:min-w-0 tw:grow tw:basis-0 tw:justify-end", children: /* @__PURE__ */ a(
              "div",
              {
                className: "tw:flex tw:min-w-0 tw:items-center tw:gap-2 tw:pe-1",
                style: l ? { WebkitAppRegion: "no-drag" } : void 0,
                children: d
              }
            ) })
          ]
        }
      )
    }
  ) });
}
const zp = (t, e) => t[e] ?? e;
function Eg({
  knownUiLanguages: t,
  primaryLanguage: e = "en",
  fallbackLanguages: r = [],
  onLanguagesChange: o,
  onPrimaryLanguageChange: n,
  onFallbackLanguagesChange: i,
  localizedStrings: s,
  className: c,
  id: d,
  disabled: l = !1
}) {
  const w = zp(
    s,
    "%settings_uiLanguageSelector_fallbackLanguages%"
  ), [u, g] = E(!1), f = (m) => {
    n && n(m), o && o([m, ...r.filter((h) => h !== m)]), i && r.find((h) => h === m) && i([...r.filter((h) => h !== m)]), g(!1);
  }, N = (m, h) => {
    var k, C, P, j, z, D;
    const y = h !== m ? ((C = (k = t[m]) == null ? void 0 : k.uiNames) == null ? void 0 : C[h]) ?? ((j = (P = t[m]) == null ? void 0 : P.uiNames) == null ? void 0 : j.en) : void 0;
    return y ? `${(z = t[m]) == null ? void 0 : z.autonym} (${y})` : (D = t[m]) == null ? void 0 : D.autonym;
  };
  return /* @__PURE__ */ p("div", { id: d, className: b("pr-twp tw:max-w-sm", c), children: [
    /* @__PURE__ */ p(
      yr,
      {
        name: "uiLanguage",
        value: e,
        onValueChange: f,
        open: u,
        onOpenChange: (m) => g(m),
        disabled: l,
        children: [
          /* @__PURE__ */ a(_r, { children: /* @__PURE__ */ a(kr, {}) }),
          /* @__PURE__ */ a(
            Nr,
            {
              style: { zIndex: Ie },
              children: Object.keys(t).map((m) => /* @__PURE__ */ a(ce, { value: m, children: N(m, e) }, m))
            }
          )
        ]
      }
    ),
    e !== "en" && /* @__PURE__ */ a("div", { className: "tw:pt-3", children: /* @__PURE__ */ a(gt, { className: "tw:font-normal tw:text-muted-foreground", children: tr(w, {
      fallbackLanguages: (r == null ? void 0 : r.length) > 0 ? r.map((m) => N(m, e)).join(", ") : t.en.autonym
    }) }) })
  ] });
}
const Tg = Object.freeze([
  "%firstRun_language_search_placeholder%",
  "%firstRun_language_noResults%",
  "%firstRun_language_selected%"
]);
function Ns(t) {
  return t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}
function Dp(t, e) {
  if (!e) return t;
  const r = Ns(e);
  return t.filter(({ keywords: o }) => o.some((n) => n.includes(r)));
}
function Ip(t) {
  return [...t].sort(([e, r], [o, n]) => e === "en" && o !== "en" ? -1 : o === "en" && e !== "en" ? 1 : r.autonym.localeCompare(n.autonym));
}
function Sg({
  languages: t,
  value: e,
  onChange: r,
  localizedStrings: o,
  className: n,
  id: i
}) {
  const [s, c] = E(""), [d, l] = E(), w = U(null), u = U(null), g = U(/* @__PURE__ */ new Map()), [f, N] = E(), m = A(
    () => Ip(Object.entries(t)).map(([z, D]) => ({
      tag: z,
      info: D,
      keywords: [
        D.autonym,
        ...Object.values(D.uiNames ?? {}),
        ...D.otherNames ?? []
      ].map(Ns)
    })),
    [t]
  ), h = A(() => Dp(m, s), [m, s]), y = A(() => {
    var D;
    const z = (I) => !!I && h.some((R) => R.tag === I);
    return z(d) ? d : z(e) ? e : ((D = h[0]) == null ? void 0 : D.tag) ?? "";
  }, [d, e, h]), k = m.length > 1;
  Ft(() => {
    var z;
    N((z = u.current) == null ? void 0 : z.id);
  }, []), Ft(() => {
    const z = g.current.get(y), D = k ? w.current : void 0;
    D && (z ? D.setAttribute("aria-activedescendant", z.id) : D.removeAttribute("aria-activedescendant")), z && y !== d && z.scrollIntoView({ block: "nearest" });
  }, [y, d, k]);
  const C = o["%firstRun_language_search_placeholder%"] ?? "", P = o["%firstRun_language_noResults%"] ?? "", j = o["%firstRun_language_selected%"] ?? "";
  return /* @__PURE__ */ p(
    Sr,
    {
      id: i,
      className: b("pr-twp", n),
      shouldFilter: !1,
      value: y,
      onValueChange: l,
      children: [
        k && // Plain <input> (not CommandPrimitive.Input) so cmdk cannot update this field after
        // item selection. Arrow-key and Enter events from here bubble to the Command root div
        // where cmdk's keydown handler picks them up for list navigation.
        /* @__PURE__ */ a("div", { "data-slot": "command-input-wrapper", className: "tw:p-1 tw:pb-0", children: /* @__PURE__ */ p(oc, { className: "tw:h-8! tw:rounded-lg! tw:border-input/30 tw:bg-input/30 tw:shadow-none! tw:*:data-[slot=input-group-addon]:ps-2!", children: [
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
              placeholder: C,
              "aria-label": C,
              value: s,
              onChange: (z) => {
                c(z.currentTarget.value), l(void 0);
              },
              className: "tw:w-full tw:text-sm tw:outline-hidden tw:disabled:cursor-not-allowed tw:disabled:opacity-50"
            }
          ),
          /* @__PURE__ */ a(nc, { children: /* @__PURE__ */ a(ol, { className: "tw:size-4 tw:shrink-0 tw:opacity-50" }) })
        ] }) }),
        /* @__PURE__ */ p(Rr, { ref: u, children: [
          /* @__PURE__ */ a(Co, { children: P }),
          /* @__PURE__ */ a(er, { children: h.map(({ tag: z, info: D }) => {
            const I = z === e;
            return /* @__PURE__ */ p(
              or,
              {
                ref: (R) => {
                  R ? g.current.set(z, R) : g.current.delete(z);
                },
                value: z,
                "data-checked": I,
                "aria-checked": void 0,
                onSelect: () => r(z),
                children: [
                  /* @__PURE__ */ a("span", { dir: "auto", children: D.autonym }),
                  I && /* @__PURE__ */ a("span", { className: "tw:sr-only", children: j })
                ]
              },
              z
            );
          }) })
        ] })
      ]
    }
  );
}
function Mp({ item: t, createLabel: e, createComplexLabel: r }) {
  return e ? /* @__PURE__ */ a(gt, { children: e(t) }) : r ? /* @__PURE__ */ a(gt, { children: r(t) }) : /* @__PURE__ */ a(gt, { children: t });
}
function Pp({
  id: t,
  className: e,
  listItems: r,
  selectedListItems: o,
  handleSelectListItem: n,
  createLabel: i,
  createComplexLabel: s
}) {
  return /* @__PURE__ */ a("div", { id: t, className: e, children: r.map((c) => /* @__PURE__ */ p("div", { className: "tw:m-2 tw:flex tw:items-center", children: [
    /* @__PURE__ */ a(
      cs,
      {
        className: "tw:me-2 tw:align-middle",
        checked: o.includes(c),
        onCheckedChange: (d) => n(c, d)
      }
    ),
    /* @__PURE__ */ a(
      Mp,
      {
        item: c,
        createLabel: i,
        createComplexLabel: s
      }
    )
  ] }, c)) });
}
const Rg = Pp;
function Ap(t, e) {
  const [r, o] = E(t), [n, i] = E(e);
  return t !== r && (o(t), t && i(e)), t ? e : n;
}
function Og({
  open: t,
  anchorRect: e,
  message: r,
  confirmingKeyLabel: o,
  side: n = "bottom",
  align: i = "start",
  showArrow: s = !0
}) {
  const c = t ? an(r, { key: o }).join("") : "", {
    anchorRect: d,
    message: l,
    confirmingKeyLabel: w,
    showArrow: u
  } = Ap(t, { anchorRect: e, message: r, confirmingKeyLabel: o, showArrow: s });
  return /* @__PURE__ */ p(Jt, { children: [
    /* @__PURE__ */ a("span", { role: "status", className: "tw:sr-only", children: c }),
    /* @__PURE__ */ p(kt, { open: t, onOpenChange: () => {
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
          align: i,
          showArrow: u,
          arrowPadding: 8,
          className: b(
            // Rely on TooltipContent's default tw:max-w-xs (320px) and normal wrapping: this hint's
            // text is short and usually fits on one line, but locale length varies (e.g. Spanish runs
            // longer than English), so allow it to wrap rather than force tw:whitespace-nowrap, which
            // could clip or overflow on a narrow webview.
            "tw:p-0 tw:has-data-[slot=kbd]:pe-0 tw:bg-background tw:text-destructive tw:border tw:border-destructive"
          ),
          arrowClassName: "tw:bg-[color-mix(in_oklab,var(--destructive)_10%,var(--background))] tw:fill-[color-mix(in_oklab,var(--destructive)_10%,var(--background))] tw:border tw:border-destructive",
          children: /* @__PURE__ */ a("div", { className: "tw:w-full tw:h-full tw:rounded-md tw:bg-destructive/10 tw:px-3 tw:py-1.5", children: an(l, {
            key: /* @__PURE__ */ a(
              ic,
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
          }).map((g, f) => (
            // The array is static per render (one fixed localized string + one kbd), so index is
            // a stable, safe key — same rationale as source-language-indexed-list.component.tsx's
            // disable.
            // eslint-disable-next-line react/no-array-index-key
            /* @__PURE__ */ a(rr, { children: g }, `key-${f}`)
          )) })
        }
      )
    ] })
  ] });
}
function zg({
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
  accentColor: u,
  showDropdownOnHover: g = !1
}) {
  const f = (h) => {
    if (h.key === "Enter" || h.key === " ") {
      if (h.target !== h.currentTarget) return;
      h.preventDefault(), r();
    }
  }, [N, m] = E(!1);
  return /* @__PURE__ */ p(
    "div",
    {
      hidden: n,
      onClick: r,
      onKeyDown: f,
      onMouseEnter: () => m(!0),
      onFocus: () => m(!0),
      role: "button",
      tabIndex: 0,
      "aria-pressed": e,
      className: b(
        "tw:group tw:relative tw:min-w-36 tw:rounded-xl tw:border tw:shadow-none tw:hover:bg-muted/50",
        { "tw:opacity-50 tw:hover:opacity-100": o && !e },
        { "tw:bg-accent": e },
        { "tw:bg-transparent": !e },
        i
      ),
      children: [
        /* @__PURE__ */ p("div", { className: "tw:flex tw:flex-col tw:gap-2 tw:p-4", children: [
          /* @__PURE__ */ p("div", { className: "tw:flex tw:justify-between tw:overflow-hidden", children: [
            /* @__PURE__ */ a("div", { className: "tw:min-w-0 tw:flex-1", children: s }),
            e && c,
            !e && d && /* @__PURE__ */ a("div", { className: "tw:invisible tw:group-hover:visible", children: d }),
            l && (e || g && N) && /* @__PURE__ */ a(
              "div",
              {
                className: b(
                  !e && g && "tw:invisible tw:group-hover:visible"
                ),
                children: /* @__PURE__ */ p(nr, { children: [
                  /* @__PURE__ */ a(Ue, { className: b(u && "tw:me-1"), asChild: !0, children: /* @__PURE__ */ a(
                    J,
                    {
                      className: "tw:m-1 tw:h-6 tw:w-6",
                      variant: "ghost",
                      size: "icon",
                      onClick: (h) => h.stopPropagation(),
                      onFocus: (h) => h.stopPropagation(),
                      children: /* @__PURE__ */ a(Qc, {})
                    }
                  ) }),
                  /* @__PURE__ */ a(ir, { align: "end", children: l })
                ] })
              }
            )
          ] }),
          w && /* @__PURE__ */ a("div", { className: "tw:w-fit tw:min-w-0 tw:max-w-full tw:overflow-hidden", children: w })
        ] }),
        u && /* @__PURE__ */ a(
          "div",
          {
            className: `tw:absolute tw:right-0 tw:top-0 tw:h-full tw:w-2 tw:rounded-r-xl ${u}`
          }
        )
      ]
    },
    t
  );
}
function Dg({
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
  onChange: u,
  onFocus: g,
  onBlur: f
}) {
  return /* @__PURE__ */ p("div", { className: b("tw:inline-grid tw:items-center tw:gap-1.5", { "tw:w-full": o }), children: [
    /* @__PURE__ */ a(
      gt,
      {
        htmlFor: t,
        className: b({
          "tw:text-red-600": r,
          "tw:hidden": !i
        }),
        children: `${i}${c ? "*" : ""}`
      }
    ),
    /* @__PURE__ */ a(
      zo,
      {
        id: t,
        disabled: e,
        placeholder: s,
        required: c,
        className: b(d, { "tw:border-red-600": r }),
        defaultValue: l,
        value: w,
        onChange: u,
        onFocus: g,
        onBlur: f
      }
    ),
    /* @__PURE__ */ a("p", { className: b({ "tw:hidden": !n }), children: n })
  ] });
}
function Ig({
  currentStep: t,
  totalSteps: e,
  locale: r,
  completedSteps: o
}) {
  const n = r || "en", i = A(() => {
    const d = new Qn(n);
    return (l) => d.format(l);
  }, [n]), s = Math.min(Math.max(t, 1), e), c = Array.from({ length: e }, (d, l) => l + 1);
  return /* @__PURE__ */ a("div", { className: "tw:flex tw:items-center", "aria-hidden": "true", children: c.map((d) => {
    let l = "upcoming";
    return d === s ? l = "active" : (o ? o.includes(d) : d < s) && (l = "complete"), /* @__PURE__ */ p(rr, { children: [
      d > 1 && /* @__PURE__ */ a("div", { className: "tw:h-px tw:flex-1 tw:bg-border" }),
      /* @__PURE__ */ a(
        "div",
        {
          "data-state": l,
          className: b(
            "tw:flex tw:h-8 tw:w-8 tw:shrink-0 tw:items-center tw:justify-center tw:rounded-full tw:text-sm tw:font-medium",
            l === "active" && "tw:bg-primary tw:text-primary-foreground",
            l === "complete" && "tw:bg-muted tw:text-muted-foreground",
            l === "upcoming" && "tw:border tw:border-input tw:text-muted-foreground"
          ),
          children: l === "complete" ? /* @__PURE__ */ a(Ta, { className: "tw:h-4 tw:w-4" }) : i(d)
        }
      )
    ] }, d);
  }) });
}
function Mg({ ...t }) {
  return /* @__PURE__ */ a(Ot.Root, { "data-slot": "context-menu", ...t });
}
function Pg({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    Ot.Trigger,
    {
      "data-slot": "context-menu-trigger",
      className: b("tw:select-none", t),
      ...e
    }
  );
}
function Ag({ ...t }) {
  return /* @__PURE__ */ a(Ot.Group, { "data-slot": "context-menu-group", ...t });
}
function $g({ ...t }) {
  return /* @__PURE__ */ a(Ot.Portal, { "data-slot": "context-menu-portal", ...t });
}
function Vg({ ...t }) {
  return /* @__PURE__ */ a(Ot.Sub, { "data-slot": "context-menu-sub", ...t });
}
function Lg({
  ...t
}) {
  return /* @__PURE__ */ a(Ot.RadioGroup, { "data-slot": "context-menu-radio-group", ...t });
}
function Bg({
  className: t,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: e,
  // CUSTOM: Destructure ref (a regular prop in React 19) and onCloseAutoFocus so
  // useDismissOnWindowBlur can compose them with its own
  ref: r,
  onCloseAutoFocus: o,
  ...n
}) {
  const i = Jn({ ref: r, onCloseAutoFocus: o });
  return /* @__PURE__ */ a(Ot.Portal, { children: /* @__PURE__ */ a(
    Ot.Content,
    {
      "data-slot": "context-menu-content",
      ...i,
      className: b(
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
      style: { zIndex: Ie, ...e },
      ...n
    }
  ) });
}
function jg({
  className: t,
  inset: e,
  variant: r = "default",
  ...o
}) {
  return /* @__PURE__ */ a(
    Ot.Item,
    {
      "data-slot": "context-menu-item",
      "data-inset": e,
      "data-variant": r,
      className: b(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:group/context-menu-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-inset:ps-7 tw:data-[variant=destructive]:text-destructive tw:data-[variant=destructive]:focus:bg-destructive/10 tw:data-[variant=destructive]:focus:text-destructive tw:dark:data-[variant=destructive]:focus:bg-destructive/20 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:focus:*:[svg]:text-accent-foreground tw:data-[variant=destructive]:*:[svg]:text-destructive",
        // CUSTOM: Added tw:not-data-[variant=destructive]:focus:**:text-accent-foreground, which
        // recolors every descendant of a highlighted non-destructive item to the accent foreground.
        // A descendant that sets its own color, such as the muted Kbd keycaps in a
        // ContextMenuShortcut, otherwise keeps its muted color on the accent background while the
        // text around it turns accent-foreground. DropdownMenuItem and MenubarItem carry the same
        // rule.
        "tw:not-data-[variant=destructive]:focus:**:text-accent-foreground",
        t
      ),
      ...o
    }
  );
}
function Fg({
  className: t,
  inset: e,
  children: r,
  ...o
}) {
  return /* @__PURE__ */ p(
    Ot.SubTrigger,
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
        /* @__PURE__ */ a(ni, { className: "tw:ms-auto" })
      ]
    }
  );
}
function Ug({
  className: t,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: e,
  ...r
}) {
  return /* @__PURE__ */ a(
    Ot.SubContent,
    {
      "data-slot": "context-menu-sub-content",
      className: b(
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
      style: { zIndex: Ie, ...e },
      ...r
    }
  );
}
function Kg({
  className: t,
  children: e,
  checked: r,
  inset: o,
  ...n
}) {
  return /* @__PURE__ */ p(
    Ot.CheckboxItem,
    {
      "data-slot": "context-menu-checkbox-item",
      "data-inset": o,
      className: b(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        // CUSTOM: Replaced tw:pe-8 tw:ps-1.5 with tw:pe-1.5 tw:ps-7 so the space kept for the
        // check indicator is on the leading side, matching MenubarCheckboxItem/MenubarRadioItem; the
        // item text then lines up with tw:data-inset:ps-7 labels and items
        "pr-twp tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-1.5 tw:ps-7 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      checked: r,
      ...n,
      children: [
        /* @__PURE__ */ a("span", { className: "tw:pointer-events-none tw:absolute tw:start-1.5 tw:flex tw:size-4 tw:items-center tw:justify-center", children: /* @__PURE__ */ a(Ot.ItemIndicator, { children: /* @__PURE__ */ a(zr, {}) }) }),
        e
      ]
    }
  );
}
function Hg({
  className: t,
  children: e,
  inset: r,
  ...o
}) {
  return /* @__PURE__ */ p(
    Ot.RadioItem,
    {
      "data-slot": "context-menu-radio-item",
      "data-inset": r,
      className: b(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        // CUSTOM: Replaced tw:pe-8 tw:ps-1.5 with tw:pe-1.5 tw:ps-7 so the space kept for the
        // check indicator is on the leading side, matching MenubarCheckboxItem/MenubarRadioItem; the
        // item text then lines up with tw:data-inset:ps-7 labels and items
        "pr-twp tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-1.5 tw:ps-7 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      ...o,
      children: [
        /* @__PURE__ */ a("span", { className: "tw:pointer-events-none tw:absolute tw:start-1.5 tw:flex tw:size-4 tw:items-center tw:justify-center", children: /* @__PURE__ */ a(Ot.ItemIndicator, { children: /* @__PURE__ */ a(zr, {}) }) }),
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
    Ot.Label,
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
function qg({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    Ot.Separator,
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
function Wg({ className: t, ...e }) {
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
function Yg({ ...t }) {
  return /* @__PURE__ */ a(He.Root, { "data-slot": "drawer", ...t });
}
function Xg({ ...t }) {
  return /* @__PURE__ */ a(He.Trigger, { "data-slot": "drawer-trigger", ...t });
}
function $p({ ...t }) {
  return /* @__PURE__ */ a(He.Portal, { "data-slot": "drawer-portal", ...t });
}
function Zg({ ...t }) {
  return /* @__PURE__ */ a(He.Close, { "data-slot": "drawer-close", ...t });
}
function Vp({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    He.Overlay,
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
function Jg({
  className: t,
  children: e,
  // CUSTOM: Destructure hideDrawerHandle to conditionally render the drag handle
  hideDrawerHandle: r = !1,
  ...o
}) {
  const n = le();
  return /* @__PURE__ */ p($p, { "data-slot": "drawer-portal", children: [
    /* @__PURE__ */ a(Vp, {}),
    /* @__PURE__ */ p(
      He.Content,
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
function Qg({ className: t, ...e }) {
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
function tf({ className: t, ...e }) {
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
function ef({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    He.Title,
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
function rf({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    He.Description,
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
function af({
  className: t,
  value: e,
  ...r
}) {
  return /* @__PURE__ */ a(
    un.Root,
    {
      "data-slot": "progress",
      className: b(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:relative tw:flex tw:h-1 tw:w-full tw:items-center tw:overflow-x-hidden tw:rounded-full tw:bg-muted",
        t
      ),
      ...r,
      children: /* @__PURE__ */ a(
        un.Indicator,
        {
          "data-slot": "progress-indicator",
          className: "tw:size-full tw:flex-1 tw:bg-primary tw:transition-all",
          style: { transform: `translateX(-${100 - (e || 0)}%)` }
        }
      )
    }
  );
}
function of({ ...t }) {
  const { theme: e = "system" } = dd();
  return /* @__PURE__ */ a(
    wd,
    {
      theme: e === "light" || e === "dark" || e === "system" ? e : "system",
      className: "tw:toaster tw:group",
      icons: {
        success: /* @__PURE__ */ a(ll, { className: "tw:size-4" }),
        info: /* @__PURE__ */ a(cl, { className: "tw:size-4" }),
        warning: /* @__PURE__ */ a(sl, { className: "tw:size-4" }),
        error: /* @__PURE__ */ a(il, { className: "tw:size-4" }),
        loading: /* @__PURE__ */ a(nl, { className: "tw:size-4 tw:animate-spin" })
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
function nf({
  className: t,
  defaultValue: e,
  value: r,
  min: o = 0,
  max: n = 100,
  ...i
}) {
  const s = le(), c = Rt.useMemo(
    () => Array.isArray(r) ? r : Array.isArray(e) ? e : [o, n],
    [r, e, o, n]
  );
  return /* @__PURE__ */ p(
    ia.Root,
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
      dir: s,
      ...i,
      children: [
        /* @__PURE__ */ a(
          ia.Track,
          {
            "data-slot": "slider-track",
            className: "tw:relative tw:grow tw:overflow-hidden tw:rounded-full tw:bg-muted tw:data-horizontal:h-1 tw:data-horizontal:w-full tw:data-vertical:h-full tw:data-vertical:w-1",
            children: /* @__PURE__ */ a(
              ia.Range,
              {
                "data-slot": "slider-range",
                className: "tw:absolute tw:bg-primary tw:select-none tw:data-horizontal:h-full tw:data-vertical:w-full"
              }
            )
          }
        ),
        Array.from({ length: c.length }, (d, l) => /* @__PURE__ */ a(
          ia.Thumb,
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
function sf({
  className: t,
  size: e = "default",
  ...r
}) {
  return /* @__PURE__ */ a(
    pn.Root,
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
        pn.Thumb,
        {
          "data-slot": "switch-thumb",
          className: "tw:pointer-events-none tw:block tw:rounded-full tw:bg-background tw:ring-0 tw:transition-transform tw:group-data-[size=default]/switch:size-4 tw:group-data-[size=sm]/switch:size-3 tw:group-data-[size=default]/switch:data-checked:translate-x-[calc(100%-2px)] tw:rtl:group-data-[size=default]/switch:data-checked:-translate-x-[calc(100%-2px)] tw:group-data-[size=sm]/switch:data-checked:translate-x-[calc(100%-2px)] tw:rtl:group-data-[size=sm]/switch:data-checked:-translate-x-[calc(100%-2px)] tw:dark:data-checked:bg-primary-foreground tw:group-data-[size=default]/switch:data-unchecked:translate-x-0 tw:rtl:group-data-[size=default]/switch:data-unchecked:-translate-x-0 tw:group-data-[size=sm]/switch:data-unchecked:translate-x-0 tw:rtl:group-data-[size=sm]/switch:data-unchecked:-translate-x-0 tw:dark:data-unchecked:bg-foreground"
        }
      )
    }
  );
}
function cf({
  className: t,
  orientation: e = "horizontal",
  ...r
}) {
  return /* @__PURE__ */ a(
    de.Root,
    {
      "data-slot": "tabs",
      "data-orientation": e,
      className: b("tw:group/tabs tw:flex tw:gap-2 tw:data-horizontal:flex-col", t),
      ...r
    }
  );
}
const Lp = Lo(
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
function lf({
  className: t,
  variant: e = "default",
  ...r
}) {
  const o = le();
  return /* @__PURE__ */ a(
    de.List,
    {
      "data-slot": "tabs-list",
      "data-variant": e,
      className: b("pr-twp", Lp({ variant: e }), t),
      dir: o,
      ...r
    }
  );
}
function df({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    de.Trigger,
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
function wf({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    de.Content,
    {
      "data-slot": "tabs-content",
      className: b("pr-twp tw:flex-1 tw:text-sm tw:outline-none", t),
      ...e
    }
  );
}
const Bp = (t, e) => {
  W(() => {
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
}, uf = (t, e) => {
  W(() => {
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
function jp(t) {
  return {
    preserveValue: !0,
    ...t
  };
}
const Fp = (t, e, r = {}) => {
  const o = U(e);
  o.current = e;
  const n = U(r);
  n.current = jp(n.current);
  const [i, s] = E(() => o.current), [c, d] = E(!0);
  return W(() => {
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
}, pf = (t) => {
  const [e, r] = E(!1), [o, n] = E(!1), [i, s] = E(0), c = U(void 0), d = A(() => {
    if (!t) return;
    const g = async () => {
      try {
        const f = await t();
        return c.current === g && (r(!1), n(!0)), f;
      } catch (f) {
        throw c.current === g && (r(!0), n(!0)), f;
      }
    };
    return g;
  }, [t, i]);
  W(() => {
    c.current = d, r(!1), n(!d);
  }, [d]);
  const [l, w] = Fp(d, void 0), u = B(() => {
    c.current && (r(!1), n(!1), s((g) => g + 1));
  }, []);
  return A(
    () => ({ data: l, isLoading: w, hasError: e, hasSettled: o, refetch: u }),
    [l, w, e, o, u]
  );
}, Up = 10, Kp = 3e3, Hp = () => !1;
function hf({
  read: t,
  event: e,
  isValid: r,
  seedRetries: o = Up,
  seedRetryDelayMs: n = Kp,
  recheckIntervalMs: i,
  shouldRecheck: s = Hp,
  enabled: c = !0
}) {
  const [d, l] = E(void 0), [w, u] = E(!1), g = U(0), f = B(
    async (m) => {
      const h = g.current, y = await t();
      !m() || g.current !== h || !r(y) || (l(y), u(!1));
    },
    [t, r]
  );
  W(() => {
    if (!c) {
      l(void 0), u(!1);
      return;
    }
    let m = !0, h;
    const y = g.current, k = async (C) => {
      if (g.current === y)
        try {
          await f(() => m);
        } catch {
          if (!m || g.current !== y) return;
          C > 0 ? h = setTimeout(() => k(C - 1), n) : u(!0);
        }
    };
    return k(o), () => {
      m = !1, clearTimeout(h);
    };
  }, [c, f, o, n]);
  const N = c && s(d);
  return W(() => {
    if (!N || i === void 0) return;
    let m = !0;
    const h = setInterval(() => {
      f(() => m).catch(() => {
      });
    }, i);
    return () => {
      m = !1, clearInterval(h);
    };
  }, [N, i, f]), Bp(
    e,
    B(
      (m) => {
        !c || !r(m) || (g.current += 1, l(m), u(!1));
      },
      [c, r]
    )
  ), { value: d, hasSeedFailed: w };
}
function gf(t) {
  W(() => {
    let e;
    return t && (e = document.createElement("style"), e.appendChild(document.createTextNode(t)), document.head.appendChild(e)), () => {
      e && document.head.removeChild(e);
    };
  }, [t]);
}
function ff(t) {
  const e = A(() => gc(t).slice().sort().join(" "), [t]);
  return A(() => e ? e.split(" ") : [], [e]);
}
const Gp = () => {
  const [t, e] = E(
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
function mf(t, e) {
  const [r, o] = E(!1), n = U(e);
  n.current = e;
  const i = U(t);
  i.current = t;
  const s = B(() => {
    i.current ? n.current() : o(!0);
  }, []);
  return W(() => {
    !t || !r || (o(!1), n.current());
  }, [t, r]), s;
}
function qp(t, e, r) {
  return t ? r.dark : e === void 0 ? r.lightDefault : r.lightUnselected;
}
function vf(t, e) {
  const r = Gp();
  return qp(t, r, e);
}
function bf({ value: t, children: e }) {
  return /* @__PURE__ */ a(_i.Provider, { value: t, children: /* @__PURE__ */ a(Pa.Provider, { value: t, children: e }) });
}
const xf = 300;
function Wp(t, e = "top") {
  if (!t || typeof document > "u") return;
  const r = document.head || document.querySelector("head"), o = r.querySelector(":first-child"), n = document.createElement("style");
  n.appendChild(document.createTextNode(t)), e === "top" && o ? r.insertBefore(n, o) : r.appendChild(n);
}
Wp(`/* By default the editor is too tall for the footnote editor, even while empty, so this makes it
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
@layer properties{@supports (((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))){*,:before,:after,::backdrop{--tw-translate-x:0;--tw-translate-y:0;--tw-translate-z:0;--tw-rotate-x:initial;--tw-rotate-y:initial;--tw-rotate-z:initial;--tw-skew-x:initial;--tw-skew-y:initial;--tw-space-y-reverse:0;--tw-space-x-reverse:0;--tw-divide-x-reverse:0;--tw-border-style:solid;--tw-divide-y-reverse:0;--tw-gradient-position:initial;--tw-gradient-from:#0000;--tw-gradient-via:#0000;--tw-gradient-to:#0000;--tw-gradient-stops:initial;--tw-gradient-via-stops:initial;--tw-gradient-from-position:0%;--tw-gradient-via-position:50%;--tw-gradient-to-position:100%;--tw-leading:initial;--tw-font-weight:initial;--tw-tracking:initial;--tw-ordinal:initial;--tw-slashed-zero:initial;--tw-numeric-figure:initial;--tw-numeric-spacing:initial;--tw-numeric-fraction:initial;--tw-shadow:0 0 #0000;--tw-shadow-color:initial;--tw-shadow-alpha:100%;--tw-inset-shadow:0 0 #0000;--tw-inset-shadow-color:initial;--tw-inset-shadow-alpha:100%;--tw-ring-color:initial;--tw-ring-shadow:0 0 #0000;--tw-inset-ring-color:initial;--tw-inset-ring-shadow:0 0 #0000;--tw-ring-inset:initial;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-offset-shadow:0 0 #0000;--tw-blur:initial;--tw-brightness:initial;--tw-contrast:initial;--tw-grayscale:initial;--tw-hue-rotate:initial;--tw-invert:initial;--tw-opacity:initial;--tw-saturate:initial;--tw-sepia:initial;--tw-drop-shadow:initial;--tw-drop-shadow-color:initial;--tw-drop-shadow-alpha:100%;--tw-drop-shadow-size:initial;--tw-duration:initial;--tw-ease:initial;--tw-content:"";--tw-outline-style:solid;--tw-backdrop-blur:initial;--tw-backdrop-brightness:initial;--tw-backdrop-contrast:initial;--tw-backdrop-grayscale:initial;--tw-backdrop-hue-rotate:initial;--tw-backdrop-invert:initial;--tw-backdrop-opacity:initial;--tw-backdrop-saturate:initial;--tw-backdrop-sepia:initial;--tw-animation-delay:0s;--tw-animation-direction:normal;--tw-animation-duration:initial;--tw-animation-fill-mode:none;--tw-animation-iteration-count:1;--tw-enter-blur:0;--tw-enter-opacity:1;--tw-enter-rotate:0;--tw-enter-scale:1;--tw-enter-translate-x:0;--tw-enter-translate-y:0;--tw-exit-blur:0;--tw-exit-opacity:1;--tw-exit-rotate:0;--tw-exit-scale:1;--tw-exit-translate-x:0;--tw-exit-translate-y:0}}}@layer theme{:root,:host{--tw-font-mono:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;--tw-color-red-100:oklch(93.6% .032 17.717);--tw-color-red-200:oklch(88.5% .062 18.334);--tw-color-red-300:oklch(80.8% .114 19.571);--tw-color-red-400:oklch(70.4% .191 22.216);--tw-color-red-500:oklch(63.7% .237 25.331);--tw-color-red-600:oklch(57.7% .245 27.325);--tw-color-red-700:oklch(50.5% .213 27.518);--tw-color-red-800:oklch(44.4% .177 26.899);--tw-color-orange-100:oklch(95.4% .038 75.164);--tw-color-orange-800:oklch(47% .157 37.304);--tw-color-amber-200:oklch(92.4% .12 95.746);--tw-color-amber-400:oklch(82.8% .189 84.429);--tw-color-amber-500:oklch(76.9% .188 70.08);--tw-color-amber-600:oklch(66.6% .179 58.318);--tw-color-yellow-50:oklch(98.7% .026 102.212);--tw-color-yellow-100:oklch(97.3% .071 103.193);--tw-color-yellow-400:oklch(85.2% .199 91.936);--tw-color-yellow-500:oklch(79.5% .184 86.047);--tw-color-yellow-600:oklch(68.1% .162 75.834);--tw-color-yellow-700:oklch(55.4% .135 66.442);--tw-color-green-50:oklch(98.2% .018 155.826);--tw-color-green-100:oklch(96.2% .044 156.743);--tw-color-green-500:oklch(72.3% .219 149.579);--tw-color-green-600:oklch(62.7% .194 149.214);--tw-color-green-700:oklch(52.7% .154 150.069);--tw-color-green-800:oklch(44.8% .119 151.328);--tw-color-teal-400:oklch(77.7% .152 181.912);--tw-color-teal-500:oklch(70.4% .14 182.503);--tw-color-teal-600:oklch(60% .118 184.704);--tw-color-sky-400:oklch(74.6% .16 232.661);--tw-color-sky-500:oklch(68.5% .169 237.323);--tw-color-sky-600:oklch(58.8% .158 241.966);--tw-color-blue-50:oklch(97% .014 254.604);--tw-color-blue-100:oklch(93.2% .032 255.585);--tw-color-blue-400:oklch(70.7% .165 254.624);--tw-color-blue-500:oklch(62.3% .214 259.815);--tw-color-blue-600:oklch(54.6% .245 262.881);--tw-color-blue-800:oklch(42.4% .199 265.638);--tw-color-indigo-200:oklch(87% .065 274.039);--tw-color-purple-50:oklch(97.7% .014 308.299);--tw-color-purple-200:oklch(90.2% .063 306.703);--tw-color-purple-900:oklch(38.1% .176 304.987);--tw-color-rose-400:oklch(71.2% .194 13.428);--tw-color-rose-500:oklch(64.5% .246 16.439);--tw-color-rose-600:oklch(58.6% .253 17.585);--tw-color-slate-300:oklch(86.9% .022 252.894);--tw-color-slate-400:oklch(70.4% .04 256.788);--tw-color-slate-900:oklch(20.8% .042 265.755);--tw-color-gray-50:oklch(98.5% .002 247.839);--tw-color-gray-100:oklch(96.7% .003 264.542);--tw-color-gray-300:oklch(87.2% .01 258.338);--tw-color-gray-500:oklch(55.1% .027 264.364);--tw-color-gray-600:oklch(44.6% .03 256.802);--tw-color-gray-700:oklch(37.3% .034 259.733);--tw-color-gray-800:oklch(27.8% .033 256.848);--tw-color-zinc-400:oklch(70.5% .015 286.067);--tw-color-neutral-300:oklch(87% 0 0);--tw-color-black:#000;--tw-color-white:#fff;--tw-container-xs:20rem;--tw-container-sm:24rem;--tw-container-md:28rem;--tw-container-lg:32rem;--tw-container-2xl:42rem;--tw-container-3xl:48rem;--tw-container-4xl:56rem;--tw-container-6xl:72rem;--tw-text-xs:.75rem;--tw-text-xs--line-height:calc(1 / .75);--tw-text-sm:.875rem;--tw-text-sm--line-height:calc(1.25 / .875);--tw-text-base:1rem;--tw-text-base--line-height:calc(1.5 / 1);--tw-text-lg:1.125rem;--tw-text-lg--line-height:calc(1.75 / 1.125);--tw-text-xl:1.25rem;--tw-text-xl--line-height:calc(1.75 / 1.25);--tw-text-2xl:1.5rem;--tw-text-2xl--line-height:calc(2 / 1.5);--tw-text-3xl:1.875rem;--tw-text-3xl--line-height:calc(2.25 / 1.875);--tw-text-4xl:2.25rem;--tw-text-4xl--line-height:calc(2.5 / 2.25);--tw-text-5xl:3rem;--tw-text-5xl--line-height:1;--tw-font-weight-normal:400;--tw-font-weight-medium:500;--tw-font-weight-semibold:600;--tw-font-weight-bold:700;--tw-font-weight-extrabold:800;--tw-tracking-tight:-.025em;--tw-tracking-normal:0em;--tw-tracking-wider:.05em;--tw-tracking-widest:.1em;--tw-leading-tight:1.25;--tw-leading-snug:1.375;--tw-leading-relaxed:1.625;--tw-leading-loose:2;--tw-radius-xs:.125rem;--tw-radius-md:calc(var(--radius) * .8);--tw-drop-shadow-sm:0 1px 2px #00000026;--tw-animate-spin:spin 1s linear infinite;--tw-animate-pulse:pulse 2s cubic-bezier(.4, 0, .6, 1) infinite;--tw-blur-xs:4px;--tw-default-transition-duration:.15s;--tw-default-transition-timing-function:cubic-bezier(.4, 0, .2, 1);--tw-default-font-family:"IBM Plex Sans Variable", sans-serif;--tw-default-mono-font-family:var(--tw-font-mono)}}@layer base{.pr-twp,.pr-twp *{border-color:var(--border);outline-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.pr-twp,.pr-twp *{outline-color:color-mix(in oklab, var(--ring) 50%, transparent)}}body.pr-twp{background-color:var(--background);color:var(--foreground)}html.pr-twp{font-family:IBM Plex Sans Variable,sans-serif}:where(.pr-twp,.pr-twp *),:where(.pr-twp,.pr-twp *):after,:where(.pr-twp,.pr-twp *):before,:where(.pr-twp,.pr-twp *) ::backdrop{box-sizing:border-box;border:0 solid;margin:0;padding:0}:where(.pr-twp,.pr-twp *) ::file-selector-button{box-sizing:border-box;border:0 solid;margin:0;padding:0}.pr-twp{-webkit-text-size-adjust:100%;tab-size:4;line-height:1.5;font-family:var(--tw-default-font-family,ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");font-feature-settings:var(--tw-default-font-feature-settings,normal);font-variation-settings:var(--tw-default-font-variation-settings,normal);-webkit-tap-highlight-color:transparent}hr:where(.pr-twp,.pr-twp *){height:0;color:inherit;border-top-width:1px}abbr:where([title]):where(.pr-twp,.pr-twp *){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1:where(.pr-twp,.pr-twp *),h2:where(.pr-twp,.pr-twp *),h3:where(.pr-twp,.pr-twp *),h4:where(.pr-twp,.pr-twp *),h5:where(.pr-twp,.pr-twp *),h6:where(.pr-twp,.pr-twp *){font-size:inherit;font-weight:inherit}a:where(.pr-twp,.pr-twp *){color:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b:where(.pr-twp,.pr-twp *),strong:where(.pr-twp,.pr-twp *){font-weight:bolder}code:where(.pr-twp,.pr-twp *),kbd:where(.pr-twp,.pr-twp *),samp:where(.pr-twp,.pr-twp *),pre:where(.pr-twp,.pr-twp *){font-family:var(--tw-default-mono-font-family,ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace);font-feature-settings:var(--tw-default-mono-font-feature-settings,normal);font-variation-settings:var(--tw-default-mono-font-variation-settings,normal);font-size:1em}small:where(.pr-twp,.pr-twp *){font-size:80%}sub:where(.pr-twp,.pr-twp *),sup:where(.pr-twp,.pr-twp *){vertical-align:baseline;font-size:75%;line-height:0;position:relative}sub:where(.pr-twp,.pr-twp *){bottom:-.25em}sup:where(.pr-twp,.pr-twp *){top:-.5em}table:where(.pr-twp,.pr-twp *){text-indent:0;border-color:inherit;border-collapse:collapse}:-moz-focusring:where(.pr-twp,.pr-twp *){outline:auto}progress:where(.pr-twp,.pr-twp *){vertical-align:baseline}summary:where(.pr-twp,.pr-twp *){display:list-item}ol:where(.pr-twp,.pr-twp *),ul:where(.pr-twp,.pr-twp *),menu:where(.pr-twp,.pr-twp *){list-style:none}img:where(.pr-twp,.pr-twp *),svg:where(.pr-twp,.pr-twp *),video:where(.pr-twp,.pr-twp *),canvas:where(.pr-twp,.pr-twp *),audio:where(.pr-twp,.pr-twp *),iframe:where(.pr-twp,.pr-twp *),embed:where(.pr-twp,.pr-twp *),object:where(.pr-twp,.pr-twp *){vertical-align:middle;display:block}img:where(.pr-twp,.pr-twp *),video:where(.pr-twp,.pr-twp *){max-width:100%;height:auto}button:where(.pr-twp,.pr-twp *),input:where(.pr-twp,.pr-twp *),select:where(.pr-twp,.pr-twp *),optgroup:where(.pr-twp,.pr-twp *),textarea:where(.pr-twp,.pr-twp *){font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(.pr-twp,.pr-twp *) ::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(select:is([multiple],[size])) optgroup:where(.pr-twp,.pr-twp *){font-weight:bolder}:where(select:is([multiple],[size])) optgroup option:where(.pr-twp,.pr-twp *){padding-inline-start:20px}:where(.pr-twp,.pr-twp *) ::file-selector-button{margin-inline-end:4px}:where(.pr-twp,.pr-twp *) ::placeholder{opacity:1}@supports (not ((-webkit-appearance:-apple-pay-button))) or (contain-intrinsic-size:1px){:where(.pr-twp,.pr-twp *) ::placeholder{color:currentColor}@supports (color:color-mix(in lab, red, red)){:where(.pr-twp,.pr-twp *) ::placeholder{color:color-mix(in oklab, currentcolor 50%, transparent)}}}textarea:where(.pr-twp,.pr-twp *){resize:vertical}:where(.pr-twp,.pr-twp *) ::-webkit-search-decoration{-webkit-appearance:none}:where(.pr-twp,.pr-twp *) ::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit{display:inline-flex}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-fields-wrapper{padding:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-year-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-month-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-day-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-hour-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-minute-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-second-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-millisecond-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-meridiem-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-calendar-picker-indicator{line-height:1}:-moz-ui-invalid:where(.pr-twp,.pr-twp *){box-shadow:none}button:where(.pr-twp,.pr-twp *),input:where([type=button],[type=reset],[type=submit]):where(.pr-twp,.pr-twp *){appearance:button}:where(.pr-twp,.pr-twp *) ::file-selector-button{appearance:button}:where(.pr-twp,.pr-twp *) ::-webkit-inner-spin-button{height:auto}:where(.pr-twp,.pr-twp *) ::-webkit-outer-spin-button{height:auto}[hidden]:where(:not([hidden=until-found])):where(.pr-twp,.pr-twp *){display:none!important}}@layer components;@layer utilities{.tw\\:\\@container\\/card-header{container:card-header/inline-size}.tw\\:\\@container\\/search{container:search/inline-size}.tw\\:\\@container\\/toolbar{container:toolbar/inline-size}.tw\\:pointer-events-auto{pointer-events:auto}.tw\\:pointer-events-none{pointer-events:none}.tw\\:invisible{visibility:hidden}.tw\\:sr-only{clip-path:inset(50%);white-space:nowrap;border-width:0;width:1px;height:1px;margin:-1px;padding:0;position:absolute;overflow:hidden}.tw\\:absolute{position:absolute}.tw\\:fixed{position:fixed}.tw\\:relative{position:relative}.tw\\:sticky{position:sticky}.tw\\:inset-0{inset:calc(calc(var(--spacing)) * 0)}.tw\\:inset-x-0{inset-inline:calc(calc(var(--spacing)) * 0)}.tw\\:inset-y-0{inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:inset-s-3{inset-inline-start:calc(calc(var(--spacing)) * 3)}.tw\\:start-1\\.5{inset-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:start-1\\/2{inset-inline-start:50%}.tw\\:end-0{inset-inline-end:calc(calc(var(--spacing)) * 0)}.tw\\:end-1{inset-inline-end:calc(calc(var(--spacing)) * 1)}.tw\\:end-2{inset-inline-end:calc(calc(var(--spacing)) * 2)}.tw\\:end-3{inset-inline-end:calc(calc(var(--spacing)) * 3)}.tw\\:inset-e-0{inset-inline-end:calc(calc(var(--spacing)) * 0)}.tw\\:-top-\\[1px\\]{top:-1px}.tw\\:top-0{top:calc(calc(var(--spacing)) * 0)}.tw\\:top-1{top:calc(calc(var(--spacing)) * 1)}.tw\\:top-1\\.5{top:calc(calc(var(--spacing)) * 1.5)}.tw\\:top-1\\/2{top:50%}.tw\\:top-1\\/3{top:33.3333%}.tw\\:top-2{top:calc(calc(var(--spacing)) * 2)}.tw\\:top-2\\.5{top:calc(calc(var(--spacing)) * 2.5)}.tw\\:top-3\\.5{top:calc(calc(var(--spacing)) * 3.5)}.tw\\:top-\\[-1px\\]{top:-1px}.tw\\:top-full{top:100%}.tw\\:-right-1{right:calc(calc(var(--spacing)) * -1)}.tw\\:right-0{right:calc(calc(var(--spacing)) * 0)}.tw\\:right-1{right:calc(calc(var(--spacing)) * 1)}.tw\\:right-3{right:calc(calc(var(--spacing)) * 3)}.tw\\:bottom-0{bottom:calc(calc(var(--spacing)) * 0)}.tw\\:-left-\\[1px\\]{left:-1px}.tw\\:left-0{left:calc(calc(var(--spacing)) * 0)}.tw\\:left-1\\/2{left:50%}.tw\\:left-2{left:calc(calc(var(--spacing)) * 2)}.tw\\:left-3{left:calc(calc(var(--spacing)) * 3)}.tw\\:isolate{isolation:isolate}.tw\\:z-10{z-index:10}.tw\\:z-20{z-index:20}.tw\\:z-50{z-index:50}.tw\\:order-first{order:-9999}.tw\\:order-last{order:9999}.tw\\:col-span-1{grid-column:span 1/span 1}.tw\\:col-span-2{grid-column:span 2/span 2}.tw\\:col-span-3{grid-column:span 3/span 3}.tw\\:col-start-1{grid-column-start:1}.tw\\:col-start-2{grid-column-start:2}.tw\\:row-span-2{grid-row:span 2/span 2}.tw\\:row-start-1{grid-row-start:1}.tw\\:row-start-2{grid-row-start:2}.tw\\:m-0{margin:calc(calc(var(--spacing)) * 0)}.tw\\:m-1{margin:calc(calc(var(--spacing)) * 1)}.tw\\:m-2{margin:calc(calc(var(--spacing)) * 2)}.tw\\:-mx-1{margin-inline:calc(calc(var(--spacing)) * -1)}.tw\\:-mx-4{margin-inline:calc(calc(var(--spacing)) * -4)}.tw\\:mx-0{margin-inline:calc(calc(var(--spacing)) * 0)}.tw\\:mx-1{margin-inline:calc(calc(var(--spacing)) * 1)}.tw\\:mx-2{margin-inline:calc(calc(var(--spacing)) * 2)}.tw\\:mx-3\\.5{margin-inline:calc(calc(var(--spacing)) * 3.5)}.tw\\:mx-4{margin-inline:calc(calc(var(--spacing)) * 4)}.tw\\:mx-8{margin-inline:calc(calc(var(--spacing)) * 8)}.tw\\:my-1{margin-block:calc(calc(var(--spacing)) * 1)}.tw\\:my-2\\.5{margin-block:calc(calc(var(--spacing)) * 2.5)}.tw\\:my-4{margin-block:calc(calc(var(--spacing)) * 4)}.tw\\:my-auto{margin-block:auto}.tw\\:ms-1{margin-inline-start:calc(calc(var(--spacing)) * 1)}.tw\\:ms-2{margin-inline-start:calc(calc(var(--spacing)) * 2)}.tw\\:ms-5{margin-inline-start:calc(calc(var(--spacing)) * 5)}.tw\\:ms-6{margin-inline-start:calc(calc(var(--spacing)) * 6)}.tw\\:ms-auto{margin-inline-start:auto}.tw\\:-me-0\\.5{margin-inline-end:calc(calc(var(--spacing)) * -.5)}.tw\\:me-1{margin-inline-end:calc(calc(var(--spacing)) * 1)}.tw\\:me-2{margin-inline-end:calc(calc(var(--spacing)) * 2)}.tw\\:prose{color:var(--tw-prose-body);max-width:65ch}.tw\\:prose :where(p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em}.tw\\:prose :where([class~=lead]):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-lead);margin-top:1.2em;margin-bottom:1.2em;font-size:1.25em;line-height:1.6}.tw\\:prose :where(a):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-links);font-weight:500;text-decoration:underline}.tw\\:prose :where(strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-bold);font-weight:600}.tw\\:prose :where(a strong):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(blockquote strong):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(thead th strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.tw\\:prose :where(ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em;padding-inline-start:1.625em;list-style-type:decimal}.tw\\:prose :where(ol[type=A]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-alpha}.tw\\:prose :where(ol[type=a]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-alpha}.tw\\:prose :where(ol[type=A s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-alpha}.tw\\:prose :where(ol[type=a s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-alpha}.tw\\:prose :where(ol[type=I]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-roman}.tw\\:prose :where(ol[type=i]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-roman}.tw\\:prose :where(ol[type=I s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-roman}.tw\\:prose :where(ol[type=i s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-roman}.tw\\:prose :where(ol[type="1"]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:decimal}.tw\\:prose :where(ul):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em;padding-inline-start:1.625em;list-style-type:disc}.tw\\:prose :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *))::marker{color:var(--tw-prose-counters);font-weight:400}.tw\\:prose :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *))::marker{color:var(--tw-prose-bullets)}.tw\\:prose :where(dt):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:1.25em;font-weight:600}.tw\\:prose :where(hr):not(:where([class~=not-prose],[class~=not-prose] *)){border-color:var(--tw-prose-hr);border-top-width:1px;margin-top:3em;margin-bottom:3em}.tw\\:prose :where(blockquote):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-quotes);border-inline-start-width:.25rem;border-inline-start-color:var(--tw-prose-quote-borders);quotes:"“""”""‘""’";margin-top:1.6em;margin-bottom:1.6em;padding-inline-start:1em;font-style:italic;font-weight:500}.tw\\:prose :where(blockquote p:first-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):before{content:open-quote}.tw\\:prose :where(blockquote p:last-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:close-quote}.tw\\:prose :where(h1):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:0;margin-bottom:.888889em;font-size:2.25em;font-weight:800;line-height:1.11111}.tw\\:prose :where(h1 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:900}.tw\\:prose :where(h2):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:2em;margin-bottom:1em;font-size:1.5em;font-weight:700;line-height:1.33333}.tw\\:prose :where(h2 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:800}.tw\\:prose :where(h3):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:1.6em;margin-bottom:.6em;font-size:1.25em;font-weight:600;line-height:1.6}.tw\\:prose :where(h3 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:700}.tw\\:prose :where(h4):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:1.5em;margin-bottom:.5em;font-weight:600;line-height:1.5}.tw\\:prose :where(h4 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:700}.tw\\:prose :where(img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.tw\\:prose :where(picture):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em;display:block}.tw\\:prose :where(video):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.tw\\:prose :where(kbd):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-kbd);box-shadow:0 0 0 1px rgb(var(--tw-prose-kbd-shadows) / 10%), 0 3px 0 rgb(var(--tw-prose-kbd-shadows) / 10%);padding-top:.1875em;padding-inline-end:.375em;padding-bottom:.1875em;border-radius:.3125rem;padding-inline-start:.375em;font-family:inherit;font-size:.875em;font-weight:500}.tw\\:prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-code);font-size:.875em;font-weight:600}.tw\\:prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)):before,.tw\\:prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:"\`"}.tw\\:prose :where(a code):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h1 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.tw\\:prose :where(h2 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-size:.875em}.tw\\:prose :where(h3 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-size:.9em}.tw\\:prose :where(h4 code):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(blockquote code):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(thead th code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.tw\\:prose :where(pre):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-pre-code);background-color:var(--tw-prose-pre-bg);padding-top:.857143em;padding-inline-end:1.14286em;padding-bottom:.857143em;border-radius:.375rem;margin-top:1.71429em;margin-bottom:1.71429em;padding-inline-start:1.14286em;font-size:.875em;font-weight:400;line-height:1.71429;overflow-x:auto}.tw\\:prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)){font-weight:inherit;color:inherit;font-size:inherit;font-family:inherit;line-height:inherit;background-color:#0000;border-width:0;border-radius:0;padding:0}.tw\\:prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)):before,.tw\\:prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:none}.tw\\:prose :where(table):not(:where([class~=not-prose],[class~=not-prose] *)){table-layout:auto;width:100%;margin-top:2em;margin-bottom:2em;font-size:.875em;line-height:1.71429}.tw\\:prose :where(thead):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:1px;border-bottom-color:var(--tw-prose-th-borders)}.tw\\:prose :where(thead th):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);vertical-align:bottom;padding-inline-end:.571429em;padding-bottom:.571429em;padding-inline-start:.571429em;font-weight:600}.tw\\:prose :where(tbody tr):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:1px;border-bottom-color:var(--tw-prose-td-borders)}.tw\\:prose :where(tbody tr:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:0}.tw\\:prose :where(tbody td):not(:where([class~=not-prose],[class~=not-prose] *)){vertical-align:baseline}.tw\\:prose :where(tfoot):not(:where([class~=not-prose],[class~=not-prose] *)){border-top-width:1px;border-top-color:var(--tw-prose-th-borders)}.tw\\:prose :where(tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){vertical-align:top}.tw\\:prose :where(th,td):not(:where([class~=not-prose],[class~=not-prose] *)){text-align:start}.tw\\:prose :where(figure>*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose :where(figcaption):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-captions);margin-top:.857143em;font-size:.875em;line-height:1.42857}.tw\\:prose{--tw-prose-body:var(--foreground);--tw-prose-headings:var(--foreground);--tw-prose-lead:var(--muted-foreground);--tw-prose-links:var(--primary);--tw-prose-bold:var(--foreground);--tw-prose-counters:var(--muted-foreground);--tw-prose-bullets:var(--muted-foreground);--tw-prose-hr:var(--border);--tw-prose-quotes:var(--foreground);--tw-prose-quote-borders:var(--border);--tw-prose-captions:var(--muted-foreground);--tw-prose-kbd:oklch(21% .034 264.665);--tw-prose-kbd-shadows:NaN NaN NaN;--tw-prose-code:var(--foreground);--tw-prose-pre-code:var(--muted-foreground);--tw-prose-pre-bg:var(--muted);--tw-prose-th-borders:var(--border);--tw-prose-td-borders:var(--border);--tw-prose-invert-body:var(--foreground);--tw-prose-invert-headings:var(--foreground);--tw-prose-invert-lead:var(--muted-foreground);--tw-prose-invert-links:var(--primary);--tw-prose-invert-bold:var(--foreground);--tw-prose-invert-counters:var(--muted-foreground);--tw-prose-invert-bullets:var(--muted-foreground);--tw-prose-invert-hr:var(--border);--tw-prose-invert-quotes:var(--foreground);--tw-prose-invert-quote-borders:var(--border);--tw-prose-invert-captions:var(--muted-foreground);--tw-prose-invert-kbd:#fff;--tw-prose-invert-kbd-shadows:255 255 255;--tw-prose-invert-code:var(--foreground);--tw-prose-invert-pre-code:var(--muted-foreground);--tw-prose-invert-pre-bg:var(--muted);--tw-prose-invert-th-borders:var(--border);--tw-prose-invert-td-borders:var(--border);font-size:1rem;line-height:1.75}.tw\\:prose :where(picture>img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose :where(li):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.5em;margin-bottom:.5em}.tw\\:prose :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:.375em}.tw\\:prose :where(.tw\\:prose>ul>li p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.75em;margin-bottom:.75em}.tw\\:prose :where(.tw\\:prose>ul>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em}.tw\\:prose :where(.tw\\:prose>ul>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.25em}.tw\\:prose :where(.tw\\:prose>ol>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em}.tw\\:prose :where(.tw\\:prose>ol>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.25em}.tw\\:prose :where(ul ul,ul ol,ol ul,ol ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.75em;margin-bottom:.75em}.tw\\:prose :where(dl):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em}.tw\\:prose :where(dd):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.5em;padding-inline-start:1.625em}.tw\\:prose :where(hr+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h2+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h3+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h4+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose :where(thead th:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose :where(thead th:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose :where(tbody td,tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.571429em;padding-inline-end:.571429em;padding-bottom:.571429em;padding-inline-start:.571429em}.tw\\:prose :where(tbody td:first-child,tfoot td:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose :where(tbody td:last-child,tfoot td:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose :where(figure):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.tw\\:prose :where(.tw\\:prose>:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose :where(.tw\\:prose>:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:0}.tw\\:prose-sm{font-size:.875rem;line-height:1.71429}.tw\\:prose-sm :where(p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em;margin-bottom:1.14286em}.tw\\:prose-sm :where([class~=lead]):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.888889em;margin-bottom:.888889em;font-size:1.28571em;line-height:1.55556}.tw\\:prose-sm :where(blockquote):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.33333em;margin-bottom:1.33333em;padding-inline-start:1.11111em}.tw\\:prose-sm :where(h1):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:.8em;font-size:2.14286em;line-height:1.2}.tw\\:prose-sm :where(h2):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.6em;margin-bottom:.8em;font-size:1.42857em;line-height:1.4}.tw\\:prose-sm :where(h3):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.55556em;margin-bottom:.444444em;font-size:1.28571em;line-height:1.55556}.tw\\:prose-sm :where(h4):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.42857em;margin-bottom:.571429em;line-height:1.42857}.tw\\:prose-sm :where(img):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(picture):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.71429em;margin-bottom:1.71429em}.tw\\:prose-sm :where(picture>img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose-sm :where(video):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.71429em;margin-bottom:1.71429em}.tw\\:prose-sm :where(kbd):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.142857em;padding-inline-end:.357143em;padding-bottom:.142857em;border-radius:.3125rem;padding-inline-start:.357143em;font-size:.857143em}.tw\\:prose-sm :where(code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.857143em}.tw\\:prose-sm :where(h2 code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.9em}.tw\\:prose-sm :where(h3 code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.888889em}.tw\\:prose-sm :where(pre):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.666667em;padding-inline-end:1em;padding-bottom:.666667em;border-radius:.25rem;margin-top:1.66667em;margin-bottom:1.66667em;padding-inline-start:1em;font-size:.857143em;line-height:1.66667}.tw\\:prose-sm :where(ol):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(ul):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em;margin-bottom:1.14286em;padding-inline-start:1.57143em}.tw\\:prose-sm :where(li):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.285714em;margin-bottom:.285714em}.tw\\:prose-sm :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:.428571em}.tw\\:prose-sm :where(.tw\\:prose-sm>ul>li p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.571429em;margin-bottom:.571429em}.tw\\:prose-sm :where(.tw\\:prose-sm>ul>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em}.tw\\:prose-sm :where(.tw\\:prose-sm>ul>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.14286em}.tw\\:prose-sm :where(.tw\\:prose-sm>ol>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em}.tw\\:prose-sm :where(.tw\\:prose-sm>ol>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.14286em}.tw\\:prose-sm :where(ul ul,ul ol,ol ul,ol ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.571429em;margin-bottom:.571429em}.tw\\:prose-sm :where(dl):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em;margin-bottom:1.14286em}.tw\\:prose-sm :where(dt):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em}.tw\\:prose-sm :where(dd):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.285714em;padding-inline-start:1.57143em}.tw\\:prose-sm :where(hr):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2.85714em;margin-bottom:2.85714em}.tw\\:prose-sm :where(hr+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(h2+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(h3+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(h4+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose-sm :where(table):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.857143em;line-height:1.5}.tw\\:prose-sm :where(thead th):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:1em;padding-bottom:.666667em;padding-inline-start:1em}.tw\\:prose-sm :where(thead th:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose-sm :where(thead th:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose-sm :where(tbody td,tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.666667em;padding-inline-end:1em;padding-bottom:.666667em;padding-inline-start:1em}.tw\\:prose-sm :where(tbody td:first-child,tfoot td:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose-sm :where(tbody td:last-child,tfoot td:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose-sm :where(figure):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.71429em;margin-bottom:1.71429em}.tw\\:prose-sm :where(figure>*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose-sm :where(figcaption):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.666667em;font-size:.857143em;line-height:1.33333}.tw\\:prose-sm :where(.tw\\:prose-sm>:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose-sm :where(.tw\\:prose-sm>:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:0}.tw\\:-mt-4{margin-top:calc(calc(var(--spacing)) * -4)}.tw\\:mt-0\\.5{margin-top:calc(calc(var(--spacing)) * .5)}.tw\\:mt-1{margin-top:calc(calc(var(--spacing)) * 1)}.tw\\:mt-2{margin-top:calc(calc(var(--spacing)) * 2)}.tw\\:mt-3{margin-top:calc(calc(var(--spacing)) * 3)}.tw\\:mt-4{margin-top:calc(calc(var(--spacing)) * 4)}.tw\\:mt-6{margin-top:calc(calc(var(--spacing)) * 6)}.tw\\:mt-auto{margin-top:auto}.tw\\:mr-1{margin-right:calc(calc(var(--spacing)) * 1)}.tw\\:mr-2{margin-right:calc(calc(var(--spacing)) * 2)}.tw\\:mr-3{margin-right:calc(calc(var(--spacing)) * 3)}.tw\\:-mb-4{margin-bottom:calc(calc(var(--spacing)) * -4)}.tw\\:mb-1{margin-bottom:calc(calc(var(--spacing)) * 1)}.tw\\:mb-2{margin-bottom:calc(calc(var(--spacing)) * 2)}.tw\\:mb-3{margin-bottom:calc(calc(var(--spacing)) * 3)}.tw\\:mb-4{margin-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:ml-1{margin-left:calc(calc(var(--spacing)) * 1)}.tw\\:ml-2{margin-left:calc(calc(var(--spacing)) * 2)}.tw\\:ml-4{margin-left:calc(calc(var(--spacing)) * 4)}.tw\\:ml-auto{margin-left:auto}.tw\\:box-border{box-sizing:border-box}.tw\\:line-clamp-3{-webkit-line-clamp:3;-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden}.tw\\:no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}.tw\\:no-scrollbar::-webkit-scrollbar{display:none}.tw\\:block{display:block}.tw\\:flex{display:flex}.tw\\:grid{display:grid}.tw\\:hidden{display:none}.tw\\:inline-block{display:inline-block}.tw\\:inline-flex{display:inline-flex}.tw\\:inline-grid{display:inline-grid}.tw\\:field-sizing-content{field-sizing:content}.tw\\:aspect-square{aspect-ratio:1}.tw\\:size-2{width:calc(calc(var(--spacing)) * 2);height:calc(calc(var(--spacing)) * 2)}.tw\\:size-2\\.5{width:calc(calc(var(--spacing)) * 2.5);height:calc(calc(var(--spacing)) * 2.5)}.tw\\:size-3{width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:size-3\\.5{width:calc(calc(var(--spacing)) * 3.5);height:calc(calc(var(--spacing)) * 3.5)}.tw\\:size-4{width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:size-5{width:calc(calc(var(--spacing)) * 5);height:calc(calc(var(--spacing)) * 5)}.tw\\:size-6{width:calc(calc(var(--spacing)) * 6);height:calc(calc(var(--spacing)) * 6)}.tw\\:size-7{width:calc(calc(var(--spacing)) * 7);height:calc(calc(var(--spacing)) * 7)}.tw\\:size-8{width:calc(calc(var(--spacing)) * 8);height:calc(calc(var(--spacing)) * 8)}.tw\\:size-9{width:calc(calc(var(--spacing)) * 9);height:calc(calc(var(--spacing)) * 9)}.tw\\:size-10{width:calc(calc(var(--spacing)) * 10);height:calc(calc(var(--spacing)) * 10)}.tw\\:size-full{width:100%;height:100%}.tw\\:h-1{height:calc(calc(var(--spacing)) * 1)}.tw\\:h-2{height:calc(calc(var(--spacing)) * 2)}.tw\\:h-3{height:calc(calc(var(--spacing)) * 3)}.tw\\:h-3\\.5{height:calc(calc(var(--spacing)) * 3.5)}.tw\\:h-4{height:calc(calc(var(--spacing)) * 4)}.tw\\:h-5{height:calc(calc(var(--spacing)) * 5)}.tw\\:h-6{height:calc(calc(var(--spacing)) * 6)}.tw\\:h-7{height:calc(calc(var(--spacing)) * 7)}.tw\\:h-8{height:calc(calc(var(--spacing)) * 8)}.tw\\:h-8\\!{height:calc(calc(var(--spacing)) * 8)!important}.tw\\:h-8\\.5{height:calc(calc(var(--spacing)) * 8.5)}.tw\\:h-9{height:calc(calc(var(--spacing)) * 9)}.tw\\:h-10{height:calc(calc(var(--spacing)) * 10)}.tw\\:h-12{height:calc(calc(var(--spacing)) * 12)}.tw\\:h-14{height:calc(calc(var(--spacing)) * 14)}.tw\\:h-20{height:calc(calc(var(--spacing)) * 20)}.tw\\:h-24{height:calc(calc(var(--spacing)) * 24)}.tw\\:h-32{height:calc(calc(var(--spacing)) * 32)}.tw\\:h-40{height:calc(calc(var(--spacing)) * 40)}.tw\\:h-64{height:calc(calc(var(--spacing)) * 64)}.tw\\:h-80{height:calc(calc(var(--spacing)) * 80)}.tw\\:h-96{height:calc(calc(var(--spacing)) * 96)}.tw\\:h-\\[5px\\]{height:5px}.tw\\:h-\\[260px\\]{height:260px}.tw\\:h-\\[300px\\]{height:300px}.tw\\:h-\\[400px\\]{height:400px}.tw\\:h-\\[600px\\]{height:600px}.tw\\:h-\\[calc\\(100\\%-1px\\)\\]{height:calc(100% - 1px)}.tw\\:h-\\[calc\\(100\\%-2px\\)\\]{height:calc(100% - 2px)}.tw\\:h-auto{height:auto}.tw\\:h-full{height:100%}.tw\\:h-px{height:1px}.tw\\:h-screen{height:100vh}.tw\\:h-svh{height:100svh}.tw\\:max-h-\\(--radix-context-menu-content-available-height\\){max-height:var(--radix-context-menu-content-available-height)}.tw\\:max-h-\\(--radix-dropdown-menu-content-available-height\\){max-height:var(--radix-dropdown-menu-content-available-height)}.tw\\:max-h-\\(--radix-popover-content-available-height\\){max-height:var(--radix-popover-content-available-height)}.tw\\:max-h-\\(--radix-select-content-available-height\\){max-height:var(--radix-select-content-available-height)}.tw\\:max-h-4{max-height:calc(calc(var(--spacing)) * 4)}.tw\\:max-h-10{max-height:calc(calc(var(--spacing)) * 10)}.tw\\:max-h-72{max-height:calc(calc(var(--spacing)) * 72)}.tw\\:max-h-80{max-height:calc(calc(var(--spacing)) * 80)}.tw\\:max-h-\\[96\\%\\]{max-height:96%}.tw\\:max-h-\\[300px\\]{max-height:300px}.tw\\:min-h-0{min-height:calc(calc(var(--spacing)) * 0)}.tw\\:min-h-11{min-height:calc(calc(var(--spacing)) * 11)}.tw\\:min-h-16{min-height:calc(calc(var(--spacing)) * 16)}.tw\\:min-h-\\[200px\\]{min-height:200px}.tw\\:min-h-full{min-height:100%}.tw\\:min-h-svh{min-height:100svh}.tw\\:w-\\(--radix-dropdown-menu-trigger-width\\){width:var(--radix-dropdown-menu-trigger-width)}.tw\\:w-\\(--sidebar-width\\){width:var(--sidebar-width)}.tw\\:w-1{width:calc(calc(var(--spacing)) * 1)}.tw\\:w-1\\/2{width:50%}.tw\\:w-1\\/4{width:25%}.tw\\:w-1\\/6{width:16.6667%}.tw\\:w-2{width:calc(calc(var(--spacing)) * 2)}.tw\\:w-3{width:calc(calc(var(--spacing)) * 3)}.tw\\:w-3\\.5{width:calc(calc(var(--spacing)) * 3.5)}.tw\\:w-3\\/4{width:75%}.tw\\:w-4{width:calc(calc(var(--spacing)) * 4)}.tw\\:w-4\\/5{width:80%}.tw\\:w-4\\/6{width:66.6667%}.tw\\:w-5{width:calc(calc(var(--spacing)) * 5)}.tw\\:w-5\\/6{width:83.3333%}.tw\\:w-6{width:calc(calc(var(--spacing)) * 6)}.tw\\:w-7{width:calc(calc(var(--spacing)) * 7)}.tw\\:w-8{width:calc(calc(var(--spacing)) * 8)}.tw\\:w-9{width:calc(calc(var(--spacing)) * 9)}.tw\\:w-9\\/12{width:75%}.tw\\:w-10{width:calc(calc(var(--spacing)) * 10)}.tw\\:w-12{width:calc(calc(var(--spacing)) * 12)}.tw\\:w-14{width:calc(calc(var(--spacing)) * 14)}.tw\\:w-20{width:calc(calc(var(--spacing)) * 20)}.tw\\:w-24{width:calc(calc(var(--spacing)) * 24)}.tw\\:w-32{width:calc(calc(var(--spacing)) * 32)}.tw\\:w-48{width:calc(calc(var(--spacing)) * 48)}.tw\\:w-56{width:calc(calc(var(--spacing)) * 56)}.tw\\:w-60{width:calc(calc(var(--spacing)) * 60)}.tw\\:w-64{width:calc(calc(var(--spacing)) * 64)}.tw\\:w-72{width:calc(calc(var(--spacing)) * 72)}.tw\\:w-80{width:calc(calc(var(--spacing)) * 80)}.tw\\:w-96{width:calc(calc(var(--spacing)) * 96)}.tw\\:w-\\[1px\\]{width:1px}.tw\\:w-\\[5px\\]{width:5px}.tw\\:w-\\[70px\\]{width:70px}.tw\\:w-\\[100px\\]{width:100px}.tw\\:w-\\[116px\\]{width:116px}.tw\\:w-\\[124px\\]{width:124px}.tw\\:w-\\[150px\\]{width:150px}.tw\\:w-\\[180px\\]{width:180px}.tw\\:w-\\[200px\\]{width:200px}.tw\\:w-\\[250px\\]{width:250px}.tw\\:w-\\[260px\\]{width:260px}.tw\\:w-\\[270px\\]{width:270px}.tw\\:w-\\[280px\\]{width:280px}.tw\\:w-\\[300px\\]{width:300px}.tw\\:w-\\[320px\\]{width:320px}.tw\\:w-\\[350px\\]{width:350px}.tw\\:w-\\[380px\\]{width:380px}.tw\\:w-\\[400px\\]{width:400px}.tw\\:w-\\[420px\\]{width:420px}.tw\\:w-\\[500px\\]{width:500px}.tw\\:w-\\[560px\\]{width:560px}.tw\\:w-\\[600px\\]{width:600px}.tw\\:w-\\[700px\\]{width:700px}.tw\\:w-\\[calc\\(100\\%-2px\\)\\]{width:calc(100% - 2px)}.tw\\:w-\\[var\\(--radix-dropdown-menu-trigger-width\\)\\]{width:var(--radix-dropdown-menu-trigger-width)}.tw\\:w-auto{width:auto}.tw\\:w-fit{width:fit-content}.tw\\:w-full{width:100%}.tw\\:w-max{width:max-content}.tw\\:w-px{width:1px}.tw\\:max-w-\\(--skeleton-width\\){max-width:var(--skeleton-width)}.tw\\:max-w-0{max-width:calc(calc(var(--spacing)) * 0)}.tw\\:max-w-2xl{max-width:var(--tw-container-2xl)}.tw\\:max-w-3xl{max-width:var(--tw-container-3xl)}.tw\\:max-w-4{max-width:calc(calc(var(--spacing)) * 4)}.tw\\:max-w-4xl{max-width:var(--tw-container-4xl)}.tw\\:max-w-6xl{max-width:var(--tw-container-6xl)}.tw\\:max-w-40{max-width:calc(calc(var(--spacing)) * 40)}.tw\\:max-w-48{max-width:calc(calc(var(--spacing)) * 48)}.tw\\:max-w-64{max-width:calc(calc(var(--spacing)) * 64)}.tw\\:max-w-96{max-width:calc(calc(var(--spacing)) * 96)}.tw\\:max-w-\\[200px\\]{max-width:200px}.tw\\:max-w-\\[220px\\]{max-width:220px}.tw\\:max-w-\\[600px\\]{max-width:600px}.tw\\:max-w-\\[calc\\(100\\%-2rem\\)\\]{max-width:calc(100% - 2rem)}.tw\\:max-w-\\[calc\\(100vw-2rem\\)\\]{max-width:calc(100vw - 2rem)}.tw\\:max-w-fit{max-width:fit-content}.tw\\:max-w-full{max-width:100%}.tw\\:max-w-lg{max-width:var(--tw-container-lg)}.tw\\:max-w-md{max-width:var(--tw-container-md)}.tw\\:max-w-none{max-width:none}.tw\\:max-w-sm{max-width:var(--tw-container-sm)}.tw\\:max-w-xs{max-width:var(--tw-container-xs)}.tw\\:min-w-0{min-width:calc(calc(var(--spacing)) * 0)}.tw\\:min-w-4{min-width:calc(calc(var(--spacing)) * 4)}.tw\\:min-w-5{min-width:calc(calc(var(--spacing)) * 5)}.tw\\:min-w-7{min-width:calc(calc(var(--spacing)) * 7)}.tw\\:min-w-8{min-width:calc(calc(var(--spacing)) * 8)}.tw\\:min-w-9{min-width:calc(calc(var(--spacing)) * 9)}.tw\\:min-w-16{min-width:calc(calc(var(--spacing)) * 16)}.tw\\:min-w-32{min-width:calc(calc(var(--spacing)) * 32)}.tw\\:min-w-36{min-width:calc(calc(var(--spacing)) * 36)}.tw\\:min-w-80{min-width:calc(calc(var(--spacing)) * 80)}.tw\\:min-w-\\[12rem\\]{min-width:12rem}.tw\\:min-w-\\[26px\\]{min-width:26px}.tw\\:min-w-\\[96px\\]{min-width:96px}.tw\\:min-w-\\[140px\\]{min-width:140px}.tw\\:min-w-\\[215px\\]{min-width:215px}.tw\\:min-w-\\[500px\\]{min-width:500px}.tw\\:min-w-min{min-width:min-content}.tw\\:flex-1{flex:1}.tw\\:shrink{flex-shrink:1}.tw\\:shrink\\!{flex-shrink:1!important}.tw\\:shrink-0{flex-shrink:0}.tw\\:shrink-\\[9999\\]{flex-shrink:9999}.tw\\:flex-grow,.tw\\:grow,.tw\\:grow-\\[1\\]{flex-grow:1}.tw\\:grow-\\[10\\]{flex-grow:10}.tw\\:basis-0{flex-basis:calc(calc(var(--spacing)) * 0)}.tw\\:table-fixed{table-layout:fixed}.tw\\:caption-bottom{caption-side:bottom}.tw\\:border-collapse{border-collapse:collapse}.tw\\:origin-\\(--radix-context-menu-content-transform-origin\\){transform-origin:var(--radix-context-menu-content-transform-origin)}.tw\\:origin-\\(--radix-dropdown-menu-content-transform-origin\\){transform-origin:var(--radix-dropdown-menu-content-transform-origin)}.tw\\:origin-\\(--radix-menubar-content-transform-origin\\){transform-origin:var(--radix-menubar-content-transform-origin)}.tw\\:origin-\\(--radix-popover-content-transform-origin\\){transform-origin:var(--radix-popover-content-transform-origin)}.tw\\:origin-\\(--radix-select-content-transform-origin\\){transform-origin:var(--radix-select-content-transform-origin)}.tw\\:origin-\\(--radix-tooltip-content-transform-origin\\){transform-origin:var(--radix-tooltip-content-transform-origin)}.tw\\:-translate-x-1\\/2{--tw-translate-x:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:-translate-x-px{--tw-translate-x:-1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:translate-x-px{--tw-translate-x:1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:-translate-y-1\\/2{--tw-translate-y:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:translate-y-0{--tw-translate-y:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:translate-y-\\[calc\\(-50\\%-1px\\)\\]{--tw-translate-y:calc(-50% - 1px);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:translate-y-px{--tw-translate-y:1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rotate-45{rotate:45deg}.tw\\:rotate-180{rotate:180deg}.tw\\:transform{transform:var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,)}.tw\\:animate-none\\!{animation:none!important}.tw\\:animate-pulse{animation:var(--tw-animate-pulse)}.tw\\:animate-spin{animation:var(--tw-animate-spin)}.tw\\:cursor-default{cursor:default}.tw\\:cursor-ew-resize{cursor:ew-resize}.tw\\:cursor-not-allowed{cursor:not-allowed}.tw\\:cursor-pointer{cursor:pointer}.tw\\:cursor-text{cursor:text}.tw\\:touch-none{touch-action:none}.tw\\:resize{resize:both}.tw\\:resize-none{resize:none}.tw\\:scroll-m-20{scroll-margin:calc(calc(var(--spacing)) * 20)}.tw\\:scroll-my-1{scroll-margin-block:calc(calc(var(--spacing)) * 1)}.tw\\:scroll-py-1{scroll-padding-block:calc(calc(var(--spacing)) * 1)}.tw\\:list-inside{list-style-position:inside}.tw\\:list-outside{list-style-position:outside}.tw\\:\\!list-\\[lower-alpha\\]{list-style-type:lower-alpha!important}.tw\\:\\!list-\\[lower-roman\\]{list-style-type:lower-roman!important}.tw\\:\\!list-\\[upper-alpha\\]{list-style-type:upper-alpha!important}.tw\\:\\!list-\\[upper-roman\\]{list-style-type:upper-roman!important}.tw\\:\\!list-decimal{list-style-type:decimal!important}.tw\\:\\!list-disc{list-style-type:disc!important}.tw\\:list-decimal{list-style-type:decimal}.tw\\:list-disc{list-style-type:disc}.tw\\:list-none{list-style-type:none}.tw\\:grid-flow-col{grid-auto-flow:column}.tw\\:grid-flow-row{grid-auto-flow:row}.tw\\:auto-rows-min{grid-auto-rows:min-content}.tw\\:grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}.tw\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.tw\\:grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.tw\\:grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}.tw\\:grid-cols-\\[25\\%_25\\%_50\\%\\]{grid-template-columns:25% 25% 50%}.tw\\:grid-cols-\\[25\\%_50\\%_25\\%\\]{grid-template-columns:25% 50% 25%}.tw\\:grid-cols-\\[auto_auto_auto_auto\\]{grid-template-columns:auto auto auto auto}.tw\\:grid-cols-\\[min-content_1fr\\]{grid-template-columns:min-content 1fr}.tw\\:grid-cols-subgrid{grid-template-columns:subgrid}.tw\\:flex-col{flex-direction:column}.tw\\:flex-col-reverse{flex-direction:column-reverse}.tw\\:flex-row{flex-direction:row}.tw\\:flex-row-reverse{flex-direction:row-reverse}.tw\\:flex-nowrap{flex-wrap:nowrap}.tw\\:flex-wrap{flex-wrap:wrap}.tw\\:place-content-center{place-content:center}.tw\\:content-center{align-content:center}.tw\\:items-baseline{align-items:baseline}.tw\\:items-center{align-items:center}.tw\\:items-end{align-items:flex-end}.tw\\:items-start{align-items:flex-start}.tw\\:items-stretch{align-items:stretch}.tw\\:justify-between{justify-content:space-between}.tw\\:justify-center{justify-content:center}.tw\\:justify-end{justify-content:flex-end}.tw\\:justify-start{justify-content:flex-start}.tw\\:gap-0{gap:calc(calc(var(--spacing)) * 0)}.tw\\:gap-0\\.5{gap:calc(calc(var(--spacing)) * .5)}.tw\\:gap-1{gap:calc(calc(var(--spacing)) * 1)}.tw\\:gap-1\\.5{gap:calc(calc(var(--spacing)) * 1.5)}.tw\\:gap-2{gap:calc(calc(var(--spacing)) * 2)}.tw\\:gap-2\\.5{gap:calc(calc(var(--spacing)) * 2.5)}.tw\\:gap-3{gap:calc(calc(var(--spacing)) * 3)}.tw\\:gap-4{gap:calc(calc(var(--spacing)) * 4)}.tw\\:gap-5{gap:calc(calc(var(--spacing)) * 5)}.tw\\:gap-6{gap:calc(calc(var(--spacing)) * 6)}.tw\\:gap-8{gap:calc(calc(var(--spacing)) * 8)}.tw\\:gap-16{gap:calc(calc(var(--spacing)) * 16)}.tw\\:gap-\\[--spacing\\(var\\(--gap\\)\\)\\]{gap:calc(calc(var(--spacing)) * var(--gap))}.tw\\:gap-\\[12px\\]{gap:12px}:where(.tw\\:space-y-1>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 1) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 1) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-1\\.5>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 1.5) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 1.5) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-2>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 2) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 2) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-3>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 3) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 3) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-4>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 4) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 4) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-6>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 6) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 6) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-8>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 8) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 8) * calc(1 - var(--tw-space-y-reverse)))}.tw\\:gap-x-1{column-gap:calc(calc(var(--spacing)) * 1)}.tw\\:gap-x-2{column-gap:calc(calc(var(--spacing)) * 2)}.tw\\:gap-x-3{column-gap:calc(calc(var(--spacing)) * 3)}.tw\\:gap-x-4{column-gap:calc(calc(var(--spacing)) * 4)}:where(.tw\\:-space-x-2>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * -2) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * -2) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-2>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 2) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 2) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-3>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 3) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 3) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-4>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 4) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 4) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-6>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 6) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 6) * calc(1 - var(--tw-space-x-reverse)))}.tw\\:gap-y-1{row-gap:calc(calc(var(--spacing)) * 1)}.tw\\:gap-y-2{row-gap:calc(calc(var(--spacing)) * 2)}:where(.tw\\:divide-x>:not(:last-child)){--tw-divide-x-reverse:0;border-inline-style:var(--tw-border-style);border-inline-start-width:calc(1px * var(--tw-divide-x-reverse));border-inline-end-width:calc(1px * calc(1 - var(--tw-divide-x-reverse)))}:where(.tw\\:divide-y>:not(:last-child)){--tw-divide-y-reverse:0;border-bottom-style:var(--tw-border-style);border-top-style:var(--tw-border-style);border-top-width:calc(1px * var(--tw-divide-y-reverse));border-bottom-width:calc(1px * calc(1 - var(--tw-divide-y-reverse)))}.tw\\:self-start{align-self:flex-start}.tw\\:self-stretch{align-self:stretch}.tw\\:justify-self-end{justify-self:flex-end}.tw\\:truncate{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.tw\\:overflow-auto{overflow:auto}.tw\\:overflow-clip{overflow:clip}.tw\\:overflow-hidden{overflow:hidden}.tw\\:overflow-scroll{overflow:scroll}.tw\\:overflow-visible{overflow:visible}.tw\\:overflow-x-auto{overflow-x:auto}.tw\\:overflow-x-hidden{overflow-x:hidden}.tw\\:overflow-y-auto{overflow-y:auto}.tw\\:overflow-y-hidden{overflow-y:hidden}.tw\\:rounded{border-radius:.25rem}.tw\\:rounded-2xl{border-radius:calc(var(--radius) * 1.8)}.tw\\:rounded-4xl{border-radius:calc(var(--radius) * 2.6)}.tw\\:rounded-\\[4px\\]{border-radius:4px}.tw\\:rounded-\\[6px\\]{border-radius:6px}.tw\\:rounded-\\[calc\\(var\\(--radius\\)-3px\\)\\]{border-radius:calc(var(--radius) - 3px)}.tw\\:rounded-\\[min\\(var\\(--tw-radius-md\\)\\,10px\\)\\]{border-radius:min(var(--tw-radius-md), 10px)}.tw\\:rounded-\\[min\\(var\\(--tw-radius-md\\)\\,12px\\)\\]{border-radius:min(var(--tw-radius-md), 12px)}.tw\\:rounded-full{border-radius:3.40282e38px}.tw\\:rounded-lg{border-radius:var(--radius)}.tw\\:rounded-lg\\!{border-radius:var(--radius)!important}.tw\\:rounded-md{border-radius:calc(var(--radius) * .8)}.tw\\:rounded-none{border-radius:0}.tw\\:rounded-sm{border-radius:calc(var(--radius) * .6)}.tw\\:rounded-xl{border-radius:calc(var(--radius) * 1.4)}.tw\\:rounded-xl\\!{border-radius:calc(var(--radius) * 1.4)!important}.tw\\:rounded-xs{border-radius:var(--tw-radius-xs)}.tw\\:rounded-s-none{border-start-start-radius:0;border-end-start-radius:0}.tw\\:rounded-e-none{border-start-end-radius:0;border-end-end-radius:0}.tw\\:rounded-t-xl{border-top-left-radius:calc(var(--radius) * 1.4);border-top-right-radius:calc(var(--radius) * 1.4)}.tw\\:rounded-l-lg{border-top-left-radius:var(--radius);border-bottom-left-radius:var(--radius)}.tw\\:rounded-r-xl{border-top-right-radius:calc(var(--radius) * 1.4);border-bottom-right-radius:calc(var(--radius) * 1.4)}.tw\\:rounded-b-xl{border-bottom-right-radius:calc(var(--radius) * 1.4);border-bottom-left-radius:calc(var(--radius) * 1.4)}.tw\\:border{border-style:var(--tw-border-style);border-width:1px}.tw\\:border-0{border-style:var(--tw-border-style);border-width:0}.tw\\:border-2{border-style:var(--tw-border-style);border-width:2px}.tw\\:border-s{border-inline-start-style:var(--tw-border-style);border-inline-start-width:1px}.tw\\:border-s-0{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:border-s-2{border-inline-start-style:var(--tw-border-style);border-inline-start-width:2px}.tw\\:border-s-4{border-inline-start-style:var(--tw-border-style);border-inline-start-width:4px}.tw\\:border-e{border-inline-end-style:var(--tw-border-style);border-inline-end-width:1px}.tw\\:border-e-0{border-inline-end-style:var(--tw-border-style);border-inline-end-width:0}.tw\\:border-t{border-top-style:var(--tw-border-style);border-top-width:1px}.tw\\:border-t-0{border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:border-b{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}.tw\\:border-b-0{border-bottom-style:var(--tw-border-style);border-bottom-width:0}.tw\\:border-l-2{border-left-style:var(--tw-border-style);border-left-width:2px}.tw\\:border-l-4{border-left-style:var(--tw-border-style);border-left-width:4px}.tw\\:border-dashed{--tw-border-style:dashed;border-style:dashed}.tw\\:border-none{--tw-border-style:none;border-style:none}.tw\\:border-solid{--tw-border-style:solid;border-style:solid}.tw\\:border-black{border-color:var(--tw-color-black)}.tw\\:border-blue-400{border-color:var(--tw-color-blue-400)}.tw\\:border-blue-500{border-color:var(--tw-color-blue-500)}.tw\\:border-border,.tw\\:border-border\\/50{border-color:var(--border)}@supports (color:color-mix(in lab, red, red)){.tw\\:border-border\\/50{border-color:color-mix(in oklab, var(--border) 50%, transparent)}}.tw\\:border-destructive{border-color:var(--destructive)}.tw\\:border-foreground{border-color:var(--foreground)}.tw\\:border-gray-300{border-color:var(--tw-color-gray-300)}.tw\\:border-input,.tw\\:border-input\\/30{border-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:border-input\\/30{border-color:color-mix(in oklab, var(--input) 30%, transparent)}}.tw\\:border-muted-foreground,.tw\\:border-muted-foreground\\/40{border-color:var(--muted-foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:border-muted-foreground\\/40{border-color:color-mix(in oklab, var(--muted-foreground) 40%, transparent)}}.tw\\:border-primary{border-color:var(--primary)}.tw\\:border-red-300{border-color:var(--tw-color-red-300)}.tw\\:border-red-400{border-color:var(--tw-color-red-400)}.tw\\:border-red-500{border-color:var(--tw-color-red-500)}.tw\\:border-red-600{border-color:var(--tw-color-red-600)}.tw\\:border-ring{border-color:var(--ring)}.tw\\:border-sidebar-border{border-color:var(--sidebar-border)}.tw\\:border-slate-300{border-color:var(--tw-color-slate-300)}.tw\\:border-transparent{border-color:#0000}.tw\\:border-yellow-400{border-color:var(--tw-color-yellow-400)}.tw\\:border-yellow-500{border-color:var(--tw-color-yellow-500)}.tw\\:border-s-amber-200{border-inline-start-color:var(--tw-color-amber-200)}.tw\\:border-s-indigo-200{border-inline-start-color:var(--tw-color-indigo-200)}.tw\\:border-s-purple-200{border-inline-start-color:var(--tw-color-purple-200)}.tw\\:border-s-red-200{border-inline-start-color:var(--tw-color-red-200)}.tw\\:\\!bg-destructive\\/50{background-color:var(--destructive)!important}@supports (color:color-mix(in lab, red, red)){.tw\\:\\!bg-destructive\\/50{background-color:color-mix(in oklab, var(--destructive) 50%, transparent)!important}}.tw\\:bg-\\[color-mix\\(in_oklab\\,var\\(--destructive\\)_10\\%\\,var\\(--background\\)\\)\\]{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-\\[color-mix\\(in_oklab\\,var\\(--destructive\\)_10\\%\\,var\\(--background\\)\\)\\]{background-color:color-mix(in oklab,var(--destructive) 10%,var(--background))}}.tw\\:bg-accent,.tw\\:bg-accent\\/50{background-color:var(--accent)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-accent\\/50{background-color:color-mix(in oklab, var(--accent) 50%, transparent)}}.tw\\:bg-amber-500,.tw\\:bg-amber-500\\/5{background-color:var(--tw-color-amber-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-amber-500\\/5{background-color:color-mix(in oklab, var(--tw-color-amber-500) 5%, transparent)}}.tw\\:bg-amber-500\\/15{background-color:var(--tw-color-amber-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-amber-500\\/15{background-color:color-mix(in oklab, var(--tw-color-amber-500) 15%, transparent)}}.tw\\:bg-background,.tw\\:bg-background\\/50{background-color:var(--background)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-background\\/50{background-color:color-mix(in oklab, var(--background) 50%, transparent)}}.tw\\:bg-black\\/10{background-color:var(--tw-color-black)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-black\\/10{background-color:color-mix(in oklab, var(--tw-color-black) 10%, transparent)}}.tw\\:bg-blue-50{background-color:var(--tw-color-blue-50)}.tw\\:bg-blue-100{background-color:var(--tw-color-blue-100)}.tw\\:bg-blue-400{background-color:var(--tw-color-blue-400)}.tw\\:bg-blue-500{background-color:var(--tw-color-blue-500)}.tw\\:bg-border{background-color:var(--border)}.tw\\:bg-card{background-color:var(--card)}.tw\\:bg-destructive\\/10{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-destructive\\/10{background-color:color-mix(in oklab, var(--destructive) 10%, transparent)}}.tw\\:bg-foreground{background-color:var(--foreground)}.tw\\:bg-gray-50{background-color:var(--tw-color-gray-50)}.tw\\:bg-gray-100{background-color:var(--tw-color-gray-100)}.tw\\:bg-gray-500{background-color:var(--tw-color-gray-500)}.tw\\:bg-green-50{background-color:var(--tw-color-green-50)}.tw\\:bg-green-100{background-color:var(--tw-color-green-100)}.tw\\:bg-green-500{background-color:var(--tw-color-green-500)}.tw\\:bg-input,.tw\\:bg-input\\/30{background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-input\\/30{background-color:color-mix(in oklab, var(--input) 30%, transparent)}}.tw\\:bg-muted,.tw\\:bg-muted\\/50{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-muted\\/50{background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:bg-neutral-300{background-color:var(--tw-color-neutral-300)}.tw\\:bg-orange-100{background-color:var(--tw-color-orange-100)}.tw\\:bg-popover,.tw\\:bg-popover\\/70{background-color:var(--popover)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-popover\\/70{background-color:color-mix(in oklab, var(--popover) 70%, transparent)}}.tw\\:bg-primary{background-color:var(--primary)}.tw\\:bg-primary-foreground{background-color:var(--primary-foreground)}.tw\\:bg-primary\\/30{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-primary\\/30{background-color:color-mix(in oklab, var(--primary) 30%, transparent)}}.tw\\:bg-purple-50{background-color:var(--tw-color-purple-50)}.tw\\:bg-red-100{background-color:var(--tw-color-red-100)}.tw\\:bg-red-500{background-color:var(--tw-color-red-500)}.tw\\:bg-rose-500,.tw\\:bg-rose-500\\/5{background-color:var(--tw-color-rose-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-rose-500\\/5{background-color:color-mix(in oklab, var(--tw-color-rose-500) 5%, transparent)}}.tw\\:bg-rose-500\\/15{background-color:var(--tw-color-rose-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-rose-500\\/15{background-color:color-mix(in oklab, var(--tw-color-rose-500) 15%, transparent)}}.tw\\:bg-secondary{background-color:var(--secondary)}.tw\\:bg-sidebar{background-color:var(--sidebar)}.tw\\:bg-sidebar-accent{background-color:var(--sidebar-accent)}.tw\\:bg-sidebar-border{background-color:var(--sidebar-border)}.tw\\:bg-sky-500,.tw\\:bg-sky-500\\/5{background-color:var(--tw-color-sky-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-sky-500\\/5{background-color:color-mix(in oklab, var(--tw-color-sky-500) 5%, transparent)}}.tw\\:bg-sky-500\\/15{background-color:var(--tw-color-sky-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-sky-500\\/15{background-color:color-mix(in oklab, var(--tw-color-sky-500) 15%, transparent)}}.tw\\:bg-teal-500,.tw\\:bg-teal-500\\/5{background-color:var(--tw-color-teal-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-teal-500\\/5{background-color:color-mix(in oklab, var(--tw-color-teal-500) 5%, transparent)}}.tw\\:bg-teal-500\\/15{background-color:var(--tw-color-teal-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-teal-500\\/15{background-color:color-mix(in oklab, var(--tw-color-teal-500) 15%, transparent)}}.tw\\:bg-transparent{background-color:#0000}.tw\\:bg-warning\\/15{background-color:var(--warning)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-warning\\/15{background-color:color-mix(in oklab, var(--warning) 15%, transparent)}}.tw\\:bg-white{background-color:var(--tw-color-white)}.tw\\:bg-yellow-50{background-color:var(--tw-color-yellow-50)}.tw\\:bg-yellow-100{background-color:var(--tw-color-yellow-100)}.tw\\:bg-yellow-500{background-color:var(--tw-color-yellow-500)}.tw\\:bg-zinc-400{background-color:var(--tw-color-zinc-400)}.tw\\:bg-gradient-to-t{--tw-gradient-position:to top in oklab;background-image:linear-gradient(var(--tw-gradient-stops))}.tw\\:from-popover{--tw-gradient-from:var(--popover);--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))}.tw\\:to-transparent{--tw-gradient-to:transparent;--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))}.tw\\:bg-clip-padding{background-clip:padding-box}.tw\\:fill-\\[color-mix\\(in_oklab\\,var\\(--destructive\\)_10\\%\\,var\\(--background\\)\\)\\]{fill:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:fill-\\[color-mix\\(in_oklab\\,var\\(--destructive\\)_10\\%\\,var\\(--background\\)\\)\\]{fill:color-mix(in oklab,var(--destructive) 10%,var(--background))}}.tw\\:fill-foreground{fill:var(--foreground)}.tw\\:fill-yellow-400,.tw\\:fill-yellow-400\\/50{fill:var(--tw-color-yellow-400)}@supports (color:color-mix(in lab, red, red)){.tw\\:fill-yellow-400\\/50{fill:color-mix(in oklab, var(--tw-color-yellow-400) 50%, transparent)}}.tw\\:object-cover{object-fit:cover}.tw\\:\\!p-4{padding:calc(calc(var(--spacing)) * 4)!important}.tw\\:p-0{padding:calc(calc(var(--spacing)) * 0)}.tw\\:p-0\\.5{padding:calc(calc(var(--spacing)) * .5)}.tw\\:p-1{padding:calc(calc(var(--spacing)) * 1)}.tw\\:p-2{padding:calc(calc(var(--spacing)) * 2)}.tw\\:p-2\\.5{padding:calc(calc(var(--spacing)) * 2.5)}.tw\\:p-3{padding:calc(calc(var(--spacing)) * 3)}.tw\\:p-4{padding:calc(calc(var(--spacing)) * 4)}.tw\\:p-6{padding:calc(calc(var(--spacing)) * 6)}.tw\\:p-8{padding:calc(calc(var(--spacing)) * 8)}.tw\\:p-\\[1px\\]{padding:1px}.tw\\:p-\\[3px\\]{padding:3px}.tw\\:p-\\[10px\\]{padding:10px}.tw\\:p-\\[16px\\]{padding:16px}.tw\\:px-0{padding-inline:calc(calc(var(--spacing)) * 0)}.tw\\:px-0\\.5{padding-inline:calc(calc(var(--spacing)) * .5)}.tw\\:px-1{padding-inline:calc(calc(var(--spacing)) * 1)}.tw\\:px-1\\.5{padding-inline:calc(calc(var(--spacing)) * 1.5)}.tw\\:px-2{padding-inline:calc(calc(var(--spacing)) * 2)}.tw\\:px-2\\.5{padding-inline:calc(calc(var(--spacing)) * 2.5)}.tw\\:px-3{padding-inline:calc(calc(var(--spacing)) * 3)}.tw\\:px-4{padding-inline:calc(calc(var(--spacing)) * 4)}.tw\\:px-6{padding-inline:calc(calc(var(--spacing)) * 6)}.tw\\:py-0{padding-block:calc(calc(var(--spacing)) * 0)}.tw\\:py-0\\.5{padding-block:calc(calc(var(--spacing)) * .5)}.tw\\:py-1{padding-block:calc(calc(var(--spacing)) * 1)}.tw\\:py-1\\.5{padding-block:calc(calc(var(--spacing)) * 1.5)}.tw\\:py-2{padding-block:calc(calc(var(--spacing)) * 2)}.tw\\:py-3{padding-block:calc(calc(var(--spacing)) * 3)}.tw\\:py-4{padding-block:calc(calc(var(--spacing)) * 4)}.tw\\:py-6{padding-block:calc(calc(var(--spacing)) * 6)}.tw\\:py-8{padding-block:calc(calc(var(--spacing)) * 8)}.tw\\:py-\\[2px\\]{padding-block:2px}.tw\\:ps-1\\.5{padding-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:ps-2{padding-inline-start:calc(calc(var(--spacing)) * 2)}.tw\\:ps-2\\.5{padding-inline-start:calc(calc(var(--spacing)) * 2.5)}.tw\\:ps-4{padding-inline-start:calc(calc(var(--spacing)) * 4)}.tw\\:ps-6{padding-inline-start:calc(calc(var(--spacing)) * 6)}.tw\\:ps-7{padding-inline-start:calc(calc(var(--spacing)) * 7)}.tw\\:ps-8{padding-inline-start:calc(calc(var(--spacing)) * 8)}.tw\\:ps-9{padding-inline-start:calc(calc(var(--spacing)) * 9)}.tw\\:ps-12{padding-inline-start:calc(calc(var(--spacing)) * 12)}.tw\\:ps-\\[85px\\]{padding-inline-start:85px}.tw\\:ps-px{padding-inline-start:1px}.tw\\:pe-1{padding-inline-end:calc(calc(var(--spacing)) * 1)}.tw\\:pe-1\\.5{padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:pe-2{padding-inline-end:calc(calc(var(--spacing)) * 2)}.tw\\:pe-4{padding-inline-end:calc(calc(var(--spacing)) * 4)}.tw\\:pe-8{padding-inline-end:calc(calc(var(--spacing)) * 8)}.tw\\:pe-8\\!{padding-inline-end:calc(calc(var(--spacing)) * 8)!important}.tw\\:pe-9{padding-inline-end:calc(calc(var(--spacing)) * 9)}.tw\\:pe-\\[calc\\(138px\\+1rem\\)\\]{padding-inline-end:calc(138px + 1rem)}.tw\\:pe-\\[…\\]{padding-inline-end:…}.tw\\:pt-0{padding-top:calc(calc(var(--spacing)) * 0)}.tw\\:pt-1{padding-top:calc(calc(var(--spacing)) * 1)}.tw\\:pt-2{padding-top:calc(calc(var(--spacing)) * 2)}.tw\\:pt-3{padding-top:calc(calc(var(--spacing)) * 3)}.tw\\:pt-4{padding-top:calc(calc(var(--spacing)) * 4)}.tw\\:pt-6{padding-top:calc(calc(var(--spacing)) * 6)}.tw\\:pr-0{padding-right:calc(calc(var(--spacing)) * 0)}.tw\\:pr-3{padding-right:calc(calc(var(--spacing)) * 3)}.tw\\:pr-4{padding-right:calc(calc(var(--spacing)) * 4)}.tw\\:pb-0{padding-bottom:calc(calc(var(--spacing)) * 0)}.tw\\:pb-1{padding-bottom:calc(calc(var(--spacing)) * 1)}.tw\\:pb-2{padding-bottom:calc(calc(var(--spacing)) * 2)}.tw\\:pb-3{padding-bottom:calc(calc(var(--spacing)) * 3)}.tw\\:pb-4{padding-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:pb-8{padding-bottom:calc(calc(var(--spacing)) * 8)}.tw\\:pb-12{padding-bottom:calc(calc(var(--spacing)) * 12)}.tw\\:pb-16{padding-bottom:calc(calc(var(--spacing)) * 16)}.tw\\:pb-24{padding-bottom:calc(calc(var(--spacing)) * 24)}.tw\\:pl-2{padding-left:calc(calc(var(--spacing)) * 2)}.tw\\:pl-3{padding-left:calc(calc(var(--spacing)) * 3)}.tw\\:pl-4{padding-left:calc(calc(var(--spacing)) * 4)}.tw\\:pl-5{padding-left:calc(calc(var(--spacing)) * 5)}.tw\\:pl-6{padding-left:calc(calc(var(--spacing)) * 6)}.tw\\:pl-8{padding-left:calc(calc(var(--spacing)) * 8)}.tw\\:text-center{text-align:center}.tw\\:text-end{text-align:end}.tw\\:text-left{text-align:left}.tw\\:text-right{text-align:right}.tw\\:text-start{text-align:start}.tw\\:align-middle{vertical-align:middle}.tw\\:font-heading{font-family:var(--font-sans)}.tw\\:font-mono{font-family:var(--tw-font-mono)}.tw\\:font-sans{font-family:IBM Plex Sans Variable,sans-serif}.tw\\:text-2xl{font-size:var(--tw-text-2xl);line-height:var(--tw-leading,var(--tw-text-2xl--line-height))}.tw\\:text-3xl{font-size:var(--tw-text-3xl);line-height:var(--tw-leading,var(--tw-text-3xl--line-height))}.tw\\:text-4xl{font-size:var(--tw-text-4xl);line-height:var(--tw-leading,var(--tw-text-4xl--line-height))}.tw\\:text-base{font-size:var(--tw-text-base);line-height:var(--tw-leading,var(--tw-text-base--line-height))}.tw\\:text-lg{font-size:var(--tw-text-lg);line-height:var(--tw-leading,var(--tw-text-lg--line-height))}.tw\\:text-sm{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:text-sm\\/relaxed{font-size:var(--tw-text-sm);line-height:var(--tw-leading-relaxed)}.tw\\:text-xl{font-size:var(--tw-text-xl);line-height:var(--tw-leading,var(--tw-text-xl--line-height))}.tw\\:text-xs{font-size:var(--tw-text-xs);line-height:var(--tw-leading,var(--tw-text-xs--line-height))}.tw\\:text-\\[0\\.8rem\\]{font-size:.8rem}.tw\\:leading-6{--tw-leading:calc(calc(var(--spacing)) * 6);line-height:calc(calc(var(--spacing)) * 6)}.tw\\:leading-loose{--tw-leading:var(--tw-leading-loose);line-height:var(--tw-leading-loose)}.tw\\:leading-none{--tw-leading:1;line-height:1}.tw\\:leading-relaxed{--tw-leading:var(--tw-leading-relaxed);line-height:var(--tw-leading-relaxed)}.tw\\:leading-snug{--tw-leading:var(--tw-leading-snug);line-height:var(--tw-leading-snug)}.tw\\:leading-tight{--tw-leading:var(--tw-leading-tight);line-height:var(--tw-leading-tight)}.tw\\:font-bold{--tw-font-weight:var(--tw-font-weight-bold);font-weight:var(--tw-font-weight-bold)}.tw\\:font-extrabold{--tw-font-weight:var(--tw-font-weight-extrabold);font-weight:var(--tw-font-weight-extrabold)}.tw\\:font-medium{--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}.tw\\:font-normal{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:font-semibold{--tw-font-weight:var(--tw-font-weight-semibold);font-weight:var(--tw-font-weight-semibold)}.tw\\:tracking-normal{--tw-tracking:var(--tw-tracking-normal);letter-spacing:var(--tw-tracking-normal)}.tw\\:tracking-tight{--tw-tracking:var(--tw-tracking-tight);letter-spacing:var(--tw-tracking-tight)}.tw\\:tracking-wider{--tw-tracking:var(--tw-tracking-wider);letter-spacing:var(--tw-tracking-wider)}.tw\\:tracking-widest{--tw-tracking:var(--tw-tracking-widest);letter-spacing:var(--tw-tracking-widest)}.tw\\:text-balance{text-wrap:balance}.tw\\:text-nowrap{text-wrap:nowrap}.tw\\:text-wrap{text-wrap:wrap}.tw\\:break-words{overflow-wrap:break-word}.tw\\:text-clip{text-overflow:clip}.tw\\:text-ellipsis{text-overflow:ellipsis}.tw\\:whitespace-normal{white-space:normal}.tw\\:whitespace-nowrap{white-space:nowrap}.tw\\:whitespace-pre{white-space:pre}.tw\\:whitespace-pre-line{white-space:pre-line}.tw\\:whitespace-pre-wrap{white-space:pre-wrap}.tw\\:\\[color\\:blue\\]{color:#00f}.tw\\:text-accent-foreground{color:var(--accent-foreground)}.tw\\:text-amber-600{color:var(--tw-color-amber-600)}.tw\\:text-background{color:var(--background)}.tw\\:text-blue-400{color:var(--tw-color-blue-400)}.tw\\:text-blue-500{color:var(--tw-color-blue-500)}.tw\\:text-blue-600{color:var(--tw-color-blue-600)}.tw\\:text-blue-800{color:var(--tw-color-blue-800)}.tw\\:text-card-foreground{color:var(--card-foreground)}.tw\\:text-current{color:currentColor}.tw\\:text-destructive{color:var(--destructive)}.tw\\:text-foreground{color:var(--foreground)}.tw\\:text-foreground\\!{color:var(--foreground)!important}.tw\\:text-foreground\\/30{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/30{color:color-mix(in oklab, var(--foreground) 30%, transparent)}}.tw\\:text-foreground\\/50{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/50{color:color-mix(in oklab, var(--foreground) 50%, transparent)}}.tw\\:text-foreground\\/60{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/60{color:color-mix(in oklab, var(--foreground) 60%, transparent)}}.tw\\:text-foreground\\/70{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/70{color:color-mix(in oklab, var(--foreground) 70%, transparent)}}.tw\\:text-gray-300{color:var(--tw-color-gray-300)}.tw\\:text-gray-500{color:var(--tw-color-gray-500)}.tw\\:text-gray-600{color:var(--tw-color-gray-600)}.tw\\:text-gray-700{color:var(--tw-color-gray-700)}.tw\\:text-gray-800{color:var(--tw-color-gray-800)}.tw\\:text-green-600{color:var(--tw-color-green-600)}.tw\\:text-green-700{color:var(--tw-color-green-700)}.tw\\:text-green-800{color:var(--tw-color-green-800)}.tw\\:text-inherit{color:inherit}.tw\\:text-muted-foreground,.tw\\:text-muted-foreground\\/50{color:var(--muted-foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-muted-foreground\\/50{color:color-mix(in oklab, var(--muted-foreground) 50%, transparent)}}.tw\\:text-orange-800{color:var(--tw-color-orange-800)}.tw\\:text-popover-foreground{color:var(--popover-foreground)}.tw\\:text-primary{color:var(--primary)}.tw\\:text-primary-foreground{color:var(--primary-foreground)}.tw\\:text-purple-900{color:var(--tw-color-purple-900)}.tw\\:text-red-500{color:var(--tw-color-red-500)}.tw\\:text-red-600{color:var(--tw-color-red-600)}.tw\\:text-red-700{color:var(--tw-color-red-700)}.tw\\:text-red-800{color:var(--tw-color-red-800)}.tw\\:text-rose-600{color:var(--tw-color-rose-600)}.tw\\:text-secondary-foreground{color:var(--secondary-foreground)}.tw\\:text-sidebar-accent-foreground{color:var(--sidebar-accent-foreground)}.tw\\:text-sidebar-foreground,.tw\\:text-sidebar-foreground\\/70{color:var(--sidebar-foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-sidebar-foreground\\/70{color:color-mix(in oklab, var(--sidebar-foreground) 70%, transparent)}}.tw\\:text-sky-600{color:var(--tw-color-sky-600)}.tw\\:text-slate-900{color:var(--tw-color-slate-900)}.tw\\:text-teal-600{color:var(--tw-color-teal-600)}.tw\\:text-white{color:var(--tw-color-white)}.tw\\:text-yellow-400{color:var(--tw-color-yellow-400)}.tw\\:text-yellow-600{color:var(--tw-color-yellow-600)}.tw\\:text-yellow-700{color:var(--tw-color-yellow-700)}.tw\\:capitalize{text-transform:capitalize}.tw\\:uppercase{text-transform:uppercase}.tw\\:italic{font-style:italic}.tw\\:tabular-nums{--tw-numeric-spacing:tabular-nums;font-variant-numeric:var(--tw-ordinal,) var(--tw-slashed-zero,) var(--tw-numeric-figure,) var(--tw-numeric-spacing,) var(--tw-numeric-fraction,)}.tw\\:line-through{text-decoration-line:line-through}.tw\\:underline{text-decoration-line:underline}.tw\\:underline-offset-4{text-underline-offset:4px}.tw\\:opacity-0{opacity:0}.tw\\:opacity-40{opacity:.4}.tw\\:opacity-50{opacity:.5}.tw\\:opacity-60{opacity:.6}.tw\\:bg-blend-color{background-blend-mode:color}.tw\\:shadow{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-\\[0_0_0_1px_var\\(--sidebar-border\\)\\]{--tw-shadow:0 0 0 1px var(--tw-shadow-color,var(--sidebar-border));box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-lg{--tw-shadow:0 10px 15px -3px var(--tw-shadow-color,#0000001a), 0 4px 6px -4px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-md{--tw-shadow:0 4px 6px -1px var(--tw-shadow-color,#0000001a), 0 2px 4px -2px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-none{--tw-shadow:0 0 #0000;box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-none\\!{--tw-shadow:0 0 #0000!important;box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)!important}.tw\\:shadow-sm{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-xl{--tw-shadow:0 20px 25px -5px var(--tw-shadow-color,#0000001a), 0 8px 10px -6px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-0{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-1{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-2{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-background{--tw-ring-color:var(--background)}.tw\\:ring-foreground\\/10{--tw-ring-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:ring-foreground\\/10{--tw-ring-color:color-mix(in oklab, var(--foreground) 10%, transparent)}}.tw\\:ring-primary{--tw-ring-color:var(--primary)}.tw\\:ring-ring\\/50{--tw-ring-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.tw\\:ring-ring\\/50{--tw-ring-color:color-mix(in oklab, var(--ring) 50%, transparent)}}.tw\\:ring-sidebar-ring{--tw-ring-color:var(--sidebar-ring)}.tw\\:ring-offset-2{--tw-ring-offset-width:2px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}.tw\\:ring-offset-background{--tw-ring-offset-color:var(--background)}.tw\\:ring-offset-white{--tw-ring-offset-color:var(--tw-color-white)}.tw\\:outline-hidden{--tw-outline-style:none;outline-style:none}@media (forced-colors:active){.tw\\:outline-hidden{outline-offset:2px;outline:2px solid #0000}}.tw\\:drop-shadow-sm{--tw-drop-shadow-size:drop-shadow(0 1px 2px var(--tw-drop-shadow-color,#00000026));--tw-drop-shadow:drop-shadow(var(--tw-drop-shadow-sm));filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.tw\\:transition{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to,opacity,box-shadow,transform,translate,scale,rotate,filter,-webkit-backdrop-filter,backdrop-filter,display,content-visibility,overlay,pointer-events;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[color\\,box-shadow\\]{transition-property:color,box-shadow;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[left\\,right\\,width\\]{transition-property:left,right,width;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[margin\\,opacity\\]{transition-property:margin,opacity;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[width\\,height\\,padding\\]{transition-property:width,height,padding;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[width\\]{transition-property:width;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-all{transition-property:all;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-colors{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-opacity{transition-property:opacity;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-transform{transition-property:transform,translate,scale,rotate;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-none{transition-property:none}.tw\\:duration-100{--tw-duration:.1s;transition-duration:.1s}.tw\\:duration-200{--tw-duration:.2s;transition-duration:.2s}.tw\\:ease-linear{--tw-ease:linear;transition-timing-function:linear}.tw\\:prose-quoteless :where(blockquote p:first-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):before,.tw\\:prose-quoteless :where(blockquote p:last-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:none}.tw\\:outline-none{--tw-outline-style:none;outline-style:none}.tw\\:select-none{-webkit-user-select:none;user-select:none}.tw\\:\\[unicode-bidi\\:plaintext\\]{unicode-bidi:plaintext}.tw\\:group-focus-within\\/menu-item\\:opacity-100:is(:where(.tw\\:group\\/menu-item):focus-within *){opacity:1}@media (hover:hover){.tw\\:group-hover\\:visible:is(:where(.tw\\:group):hover *){visibility:visible}.tw\\:group-hover\\:hidden:is(:where(.tw\\:group):hover *){display:none}.tw\\:group-hover\\:opacity-100:is(:where(.tw\\:group):hover *),.tw\\:group-hover\\/menu-item\\:opacity-100:is(:where(.tw\\:group\\/menu-item):hover *){opacity:1}}.tw\\:group-focus\\/context-menu-item\\:text-accent-foreground:is(:where(.tw\\:group\\/context-menu-item):focus *),.tw\\:group-focus\\/dropdown-menu-item\\:text-accent-foreground:is(:where(.tw\\:group\\/dropdown-menu-item):focus *),.tw\\:group-focus\\/menubar-item\\:text-accent-foreground:is(:where(.tw\\:group\\/menubar-item):focus *){color:var(--accent-foreground)}.tw\\:group-has-disabled\\/field\\:opacity-50:is(:where(.tw\\:group\\/field):has(:disabled) *){opacity:.5}.tw\\:group-has-data-\\[sidebar\\=menu-action\\]\\/menu-item\\:pe-8:is(:where(.tw\\:group\\/menu-item):has([data-sidebar=menu-action]) *){padding-inline-end:calc(calc(var(--spacing)) * 8)}.tw\\:group-has-data-\\[size\\=lg\\]\\/avatar-group\\:size-10:is(:where(.tw\\:group\\/avatar-group):has([data-size=lg]) *){width:calc(calc(var(--spacing)) * 10);height:calc(calc(var(--spacing)) * 10)}.tw\\:group-has-data-\\[size\\=sm\\]\\/avatar-group\\:size-6:is(:where(.tw\\:group\\/avatar-group):has([data-size=sm]) *){width:calc(calc(var(--spacing)) * 6);height:calc(calc(var(--spacing)) * 6)}.tw\\:group-has-\\[\\>input\\]\\/input-group\\:pt-2:is(:where(.tw\\:group\\/input-group):has(>input) *){padding-top:calc(calc(var(--spacing)) * 2)}.tw\\:group-has-\\[\\>input\\]\\/input-group\\:pb-2:is(:where(.tw\\:group\\/input-group):has(>input) *){padding-bottom:calc(calc(var(--spacing)) * 2)}.tw\\:group-has-\\[\\>svg\\]\\/alert\\:col-start-2:is(:where(.tw\\:group\\/alert):has(>svg) *){grid-column-start:2}.tw\\:group-data-\\[collapsible\\=icon\\]\\:-mt-8:is(:where(.tw\\:group)[data-collapsible=icon] *){margin-top:calc(calc(var(--spacing)) * -8)}.tw\\:group-data-\\[collapsible\\=icon\\]\\:hidden:is(:where(.tw\\:group)[data-collapsible=icon] *){display:none}.tw\\:group-data-\\[collapsible\\=icon\\]\\:size-8\\!:is(:where(.tw\\:group)[data-collapsible=icon] *){width:calc(calc(var(--spacing)) * 8)!important;height:calc(calc(var(--spacing)) * 8)!important}.tw\\:group-data-\\[collapsible\\=icon\\]\\:w-\\(--sidebar-width-icon\\):is(:where(.tw\\:group)[data-collapsible=icon] *){width:var(--sidebar-width-icon)}.tw\\:group-data-\\[collapsible\\=icon\\]\\:w-\\[calc\\(var\\(--sidebar-width-icon\\)\\+\\(--spacing\\(4\\)\\)\\)\\]:is(:where(.tw\\:group)[data-collapsible=icon] *){width:calc(var(--sidebar-width-icon) + (calc(calc(var(--spacing)) * 4)))}.tw\\:group-data-\\[collapsible\\=icon\\]\\:w-\\[calc\\(var\\(--sidebar-width-icon\\)\\+\\(--spacing\\(4\\)\\)\\+2px\\)\\]:is(:where(.tw\\:group)[data-collapsible=icon] *){width:calc(var(--sidebar-width-icon) + (calc(calc(var(--spacing)) * 4)) + 2px)}.tw\\:group-data-\\[collapsible\\=icon\\]\\:overflow-hidden:is(:where(.tw\\:group)[data-collapsible=icon] *){overflow:hidden}.tw\\:group-data-\\[collapsible\\=icon\\]\\:p-0\\!:is(:where(.tw\\:group)[data-collapsible=icon] *){padding:calc(calc(var(--spacing)) * 0)!important}.tw\\:group-data-\\[collapsible\\=icon\\]\\:p-2\\!:is(:where(.tw\\:group)[data-collapsible=icon] *){padding:calc(calc(var(--spacing)) * 2)!important}.tw\\:group-data-\\[collapsible\\=icon\\]\\:opacity-0:is(:where(.tw\\:group)[data-collapsible=icon] *){opacity:0}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:right-\\[calc\\(var\\(--sidebar-width\\)\\*-1\\)\\]:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){right:calc(var(--sidebar-width) * -1)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:left-\\[calc\\(var\\(--sidebar-width\\)\\*-1\\)\\]:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){left:calc(var(--sidebar-width) * -1)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:w-0:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){width:calc(calc(var(--spacing)) * 0)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:translate-x-0:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){--tw-translate-x:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:group-data-\\[disabled\\=true\\]\\:pointer-events-none:is(:where(.tw\\:group)[data-disabled=true] *){pointer-events:none}.tw\\:group-data-\\[disabled\\=true\\]\\:opacity-50:is(:where(.tw\\:group)[data-disabled=true] *),.tw\\:group-data-\\[disabled\\=true\\]\\/input-group\\:opacity-50:is(:where(.tw\\:group\\/input-group)[data-disabled=true] *){opacity:.5}.tw\\:group-data-\\[side\\=primary\\]\\:-right-4:is(:where(.tw\\:group)[data-side=primary] *){right:calc(calc(var(--spacing)) * -4)}.tw\\:group-data-\\[side\\=primary\\]\\:border-e:is(:where(.tw\\:group)[data-side=primary] *){border-inline-end-style:var(--tw-border-style);border-inline-end-width:1px}.tw\\:group-data-\\[side\\=secondary\\]\\:left-0:is(:where(.tw\\:group)[data-side=secondary] *){left:calc(calc(var(--spacing)) * 0)}.tw\\:group-data-\\[side\\=secondary\\]\\:rotate-180:is(:where(.tw\\:group)[data-side=secondary] *){rotate:180deg}.tw\\:group-data-\\[side\\=secondary\\]\\:border-s:is(:where(.tw\\:group)[data-side=secondary] *){border-inline-start-style:var(--tw-border-style);border-inline-start-width:1px}.tw\\:group-data-\\[size\\=default\\]\\/avatar\\:size-2\\.5:is(:where(.tw\\:group\\/avatar)[data-size=default] *){width:calc(calc(var(--spacing)) * 2.5);height:calc(calc(var(--spacing)) * 2.5)}.tw\\:group-data-\\[size\\=default\\]\\/switch\\:size-4:is(:where(.tw\\:group\\/switch)[data-size=default] *){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[size\\=lg\\]\\/avatar\\:size-3:is(:where(.tw\\:group\\/avatar)[data-size=lg] *){width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[size\\=sm\\]\\/avatar\\:size-2:is(:where(.tw\\:group\\/avatar)[data-size=sm] *){width:calc(calc(var(--spacing)) * 2);height:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[size\\=sm\\]\\/avatar\\:text-xs:is(:where(.tw\\:group\\/avatar)[data-size=sm] *){font-size:var(--tw-text-xs);line-height:var(--tw-leading,var(--tw-text-xs--line-height))}.tw\\:group-data-\\[size\\=sm\\]\\/card\\:p-3:is(:where(.tw\\:group\\/card)[data-size=sm] *){padding:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[size\\=sm\\]\\/card\\:px-3:is(:where(.tw\\:group\\/card)[data-size=sm] *){padding-inline:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[size\\=sm\\]\\/card\\:text-sm:is(:where(.tw\\:group\\/card)[data-size=sm] *){font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:size-3:is(:where(.tw\\:group\\/switch)[data-size=sm] *){width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[spacing\\=0\\]\\/toggle-group\\:rounded-none:is(:where(.tw\\:group\\/toggle-group)[data-spacing="0"] *){border-radius:0}.tw\\:group-data-\\[spacing\\=0\\]\\/toggle-group\\:px-2:is(:where(.tw\\:group\\/toggle-group)[data-spacing="0"] *){padding-inline:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[variant\\=floating\\]\\:rounded-lg:is(:where(.tw\\:group)[data-variant=floating] *){border-radius:var(--radius)}.tw\\:group-data-\\[variant\\=floating\\]\\:shadow-sm:is(:where(.tw\\:group)[data-variant=floating] *){--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:group-data-\\[variant\\=floating\\]\\:ring-1:is(:where(.tw\\:group)[data-variant=floating] *){--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:group-data-\\[variant\\=floating\\]\\:ring-sidebar-border:is(:where(.tw\\:group)[data-variant=floating] *){--tw-ring-color:var(--sidebar-border)}.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:bg-transparent:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *){background-color:#0000}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:mx-auto:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){margin-inline:auto}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:mt-4:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){margin-top:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:block:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){display:block}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:h-1\\.5:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){height:calc(calc(var(--spacing)) * 1.5)}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:w-\\[100px\\]:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){width:100px}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:text-center:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){text-align:center}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:my-auto:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){margin-block:auto}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:me-4:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){margin-inline-end:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:block:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){display:block}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:h-\\[100px\\]:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){height:100px}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:w-1\\.5:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){width:calc(calc(var(--spacing)) * 1.5)}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:my-auto:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){margin-block:auto}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:ms-4:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){margin-inline-start:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:block:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){display:block}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:h-\\[100px\\]:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){height:100px}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:w-1\\.5:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){width:calc(calc(var(--spacing)) * 1.5)}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:mx-auto:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){margin-inline:auto}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:mb-4:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){margin-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:block:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){display:block}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:h-1\\.5:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){height:calc(calc(var(--spacing)) * 1.5)}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:w-\\[100px\\]:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){width:100px}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:text-center:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){text-align:center}.tw\\:group-data-selected\\/command-item\\:text-foreground:is(:where(.tw\\:group\\/command-item):where([data-selected=true]) *){color:var(--foreground)}.tw\\:group-data-horizontal\\/tabs\\:h-8:is(:where(.tw\\:group\\/tabs):where([data-orientation=horizontal]) *){height:calc(calc(var(--spacing)) * 8)}.tw\\:group-data-vertical\\/tabs\\:h-fit:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *){height:fit-content}.tw\\:group-data-vertical\\/tabs\\:w-full:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *){width:100%}.tw\\:group-data-vertical\\/tabs\\:flex-col:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *){flex-direction:column}.tw\\:group-data-vertical\\/tabs\\:justify-start:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *){justify-content:flex-start}@media (hover:hover){.tw\\:peer-hover\\/menu-button\\:text-sidebar-accent-foreground:is(:where(.tw\\:peer\\/menu-button):hover~*){color:var(--sidebar-accent-foreground)}.tw\\:peer-focus\\:group-hover\\:text-blue-500:is(:where(.tw\\:peer):focus~*):is(:where(.tw\\:group):hover *){color:var(--tw-color-blue-500)}}.tw\\:peer-disabled\\:cursor-not-allowed:is(:where(.tw\\:peer):disabled~*){cursor:not-allowed}.tw\\:peer-disabled\\:opacity-50:is(:where(.tw\\:peer):disabled~*){opacity:.5}.tw\\:peer-data-\\[size\\=default\\]\\/menu-button\\:top-1\\.5:is(:where(.tw\\:peer\\/menu-button)[data-size=default]~*){top:calc(calc(var(--spacing)) * 1.5)}.tw\\:peer-data-\\[size\\=lg\\]\\/menu-button\\:top-2\\.5:is(:where(.tw\\:peer\\/menu-button)[data-size=lg]~*){top:calc(calc(var(--spacing)) * 2.5)}.tw\\:peer-data-\\[size\\=sm\\]\\/menu-button\\:top-1:is(:where(.tw\\:peer\\/menu-button)[data-size=sm]~*){top:calc(calc(var(--spacing)) * 1)}.tw\\:peer-data-active\\/menu-button\\:text-sidebar-accent-foreground:is(:is(:where(.tw\\:peer\\/menu-button):where([data-state=active]),:where(.tw\\:peer\\/menu-button):where([data-active]:not([data-active=false])))~*){color:var(--sidebar-accent-foreground)}.tw\\:file\\:inline-flex::file-selector-button{display:inline-flex}.tw\\:file\\:h-6::file-selector-button{height:calc(calc(var(--spacing)) * 6)}.tw\\:file\\:border-0::file-selector-button{border-style:var(--tw-border-style);border-width:0}.tw\\:file\\:bg-transparent::file-selector-button{background-color:#0000}.tw\\:file\\:text-sm::file-selector-button{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:file\\:font-medium::file-selector-button{--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}.tw\\:file\\:text-foreground::file-selector-button{color:var(--foreground)}.tw\\:placeholder\\:text-muted-foreground::placeholder{color:var(--muted-foreground)}.tw\\:placeholder\\:text-slate-400::placeholder{color:var(--tw-color-slate-400)}.tw\\:before\\:absolute:before{content:var(--tw-content);position:absolute}.tw\\:before\\:top-0\\.5:before{content:var(--tw-content);top:calc(calc(var(--spacing)) * .5)}.tw\\:before\\:left-0:before{content:var(--tw-content);left:calc(calc(var(--spacing)) * 0)}.tw\\:before\\:block:before{content:var(--tw-content);display:block}.tw\\:before\\:hidden:before{content:var(--tw-content);display:none}.tw\\:before\\:h-4:before{content:var(--tw-content);height:calc(calc(var(--spacing)) * 4)}.tw\\:before\\:w-4:before{content:var(--tw-content);width:calc(calc(var(--spacing)) * 4)}.tw\\:before\\:cursor-pointer:before{content:var(--tw-content);cursor:pointer}.tw\\:before\\:rounded:before{content:var(--tw-content);border-radius:.25rem}.tw\\:before\\:border:before{content:var(--tw-content);border-style:var(--tw-border-style);border-width:1px}.tw\\:before\\:border-primary:before{content:var(--tw-content);border-color:var(--primary)}.tw\\:before\\:bg-primary:before{content:var(--tw-content);background-color:var(--primary)}.tw\\:before\\:bg-cover:before{content:var(--tw-content);background-size:cover}.tw\\:before\\:bg-no-repeat:before{content:var(--tw-content);background-repeat:no-repeat}.tw\\:before\\:content-\\[\\"\\"\\]:before{--tw-content:"";content:var(--tw-content)}.tw\\:before\\:content-\\[\\\\\\"\\\\\\"\\]:before{--tw-content:\\"\\";content:var(--tw-content)}.tw\\:after\\:absolute:after{content:var(--tw-content);position:absolute}.tw\\:after\\:-inset-2:after{content:var(--tw-content);inset:calc(calc(var(--spacing)) * -2)}.tw\\:after\\:inset-0:after{content:var(--tw-content);inset:calc(calc(var(--spacing)) * 0)}.tw\\:after\\:-inset-x-3:after{content:var(--tw-content);inset-inline:calc(calc(var(--spacing)) * -3)}.tw\\:after\\:-inset-y-2:after{content:var(--tw-content);inset-block:calc(calc(var(--spacing)) * -2)}.tw\\:after\\:inset-y-0:after{content:var(--tw-content);inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:after\\:start-1\\/2:after{content:var(--tw-content);inset-inline-start:50%}.tw\\:after\\:top-\\[6px\\]:after{content:var(--tw-content);top:6px}.tw\\:after\\:right-\\[7px\\]:after{content:var(--tw-content);right:7px}.tw\\:after\\:left-\\[7px\\]:after{content:var(--tw-content);left:7px}.tw\\:after\\:block:after{content:var(--tw-content);display:block}.tw\\:after\\:hidden:after{content:var(--tw-content);display:none}.tw\\:after\\:h-0\\.5:after{content:var(--tw-content);height:calc(calc(var(--spacing)) * .5)}.tw\\:after\\:h-\\[6px\\]:after{content:var(--tw-content);height:6px}.tw\\:after\\:w-1:after{content:var(--tw-content);width:calc(calc(var(--spacing)) * 1)}.tw\\:after\\:w-\\[2px\\]:after{content:var(--tw-content);width:2px}.tw\\:after\\:w-\\[3px\\]:after{content:var(--tw-content);width:3px}.tw\\:after\\:-translate-x-1\\/2:after{content:var(--tw-content);--tw-translate-x:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:after\\:rotate-45:after{content:var(--tw-content);rotate:45deg}.tw\\:after\\:cursor-pointer:after{content:var(--tw-content);cursor:pointer}.tw\\:after\\:rounded-full:after{content:var(--tw-content);border-radius:3.40282e38px}.tw\\:after\\:border:after{content:var(--tw-content);border-style:var(--tw-border-style);border-width:1px}.tw\\:after\\:border-t-0:after{content:var(--tw-content);border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:after\\:border-r-2:after{content:var(--tw-content);border-right-style:var(--tw-border-style);border-right-width:2px}.tw\\:after\\:border-b-2:after{content:var(--tw-content);border-bottom-style:var(--tw-border-style);border-bottom-width:2px}.tw\\:after\\:border-l-0:after{content:var(--tw-content);border-left-style:var(--tw-border-style);border-left-width:0}.tw\\:after\\:border-solid:after{content:var(--tw-content);--tw-border-style:solid;border-style:solid}.tw\\:after\\:border-border:after{content:var(--tw-content);border-color:var(--border)}.tw\\:after\\:border-white:after{content:var(--tw-content);border-color:var(--tw-color-white)}.tw\\:after\\:bg-foreground:after{content:var(--tw-content);background-color:var(--foreground)}.tw\\:after\\:bg-muted:after{content:var(--tw-content);background-color:var(--muted)}.tw\\:after\\:opacity-0:after{content:var(--tw-content);opacity:0}.tw\\:after\\:mix-blend-darken:after{content:var(--tw-content);mix-blend-mode:darken}.tw\\:after\\:transition-opacity:after{content:var(--tw-content);transition-property:opacity;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:after\\:content-\\[\\"\\"\\]:after{--tw-content:"";content:var(--tw-content)}.tw\\:after\\:content-\\[\\\\\\"\\\\\\"\\]:after{--tw-content:\\"\\";content:var(--tw-content)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:after\\:start-full:is(:where(.tw\\:group)[data-collapsible=offcanvas] *):after{content:var(--tw-content);inset-inline-start:100%}.tw\\:group-data-horizontal\\/tabs\\:after\\:inset-x-0:is(:where(.tw\\:group\\/tabs):where([data-orientation=horizontal]) *):after{content:var(--tw-content);inset-inline:calc(calc(var(--spacing)) * 0)}.tw\\:group-data-horizontal\\/tabs\\:after\\:bottom-\\[-5px\\]:is(:where(.tw\\:group\\/tabs):where([data-orientation=horizontal]) *):after{content:var(--tw-content);bottom:-5px}.tw\\:group-data-horizontal\\/tabs\\:after\\:h-0\\.5:is(:where(.tw\\:group\\/tabs):where([data-orientation=horizontal]) *):after{content:var(--tw-content);height:calc(calc(var(--spacing)) * .5)}.tw\\:group-data-vertical\\/tabs\\:after\\:inset-y-0:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *):after{content:var(--tw-content);inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:group-data-vertical\\/tabs\\:after\\:-end-1:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *):after{content:var(--tw-content);inset-inline-end:calc(calc(var(--spacing)) * -1)}.tw\\:group-data-vertical\\/tabs\\:after\\:w-0\\.5:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *):after{content:var(--tw-content);width:calc(calc(var(--spacing)) * .5)}.tw\\:first\\:mt-0:first-child{margin-top:calc(calc(var(--spacing)) * 0)}.tw\\:last\\:border-b-0:last-child{border-bottom-style:var(--tw-border-style);border-bottom-width:0}.tw\\:even\\:bg-muted:nth-child(2n){background-color:var(--muted)}.tw\\:focus-within\\:ring-2:focus-within{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-within\\:ring-ring:focus-within{--tw-ring-color:var(--ring)}.tw\\:focus-within\\:ring-offset-1:focus-within{--tw-ring-offset-width:1px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}@media (hover:hover){.tw\\:hover\\:-mt-4:hover{margin-top:calc(calc(var(--spacing)) * -4)}.tw\\:hover\\:cursor-pointer:hover{cursor:pointer}.tw\\:hover\\:bg-accent:hover,.tw\\:hover\\:bg-accent\\/30:hover{background-color:var(--accent)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-accent\\/30:hover{background-color:color-mix(in oklab, var(--accent) 30%, transparent)}}.tw\\:hover\\:bg-accent\\/80:hover{background-color:var(--accent)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-accent\\/80:hover{background-color:color-mix(in oklab, var(--accent) 80%, transparent)}}.tw\\:hover\\:bg-blue-600:hover{background-color:var(--tw-color-blue-600)}.tw\\:hover\\:bg-destructive\\/20:hover{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-destructive\\/20:hover{background-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:hover\\:bg-gray-50:hover{background-color:var(--tw-color-gray-50)}.tw\\:hover\\:bg-input:hover{background-color:var(--input)}.tw\\:hover\\:bg-muted:hover,.tw\\:hover\\:bg-muted\\/50:hover{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-muted\\/50:hover{background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:hover\\:bg-muted\\/80:hover{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-muted\\/80:hover{background-color:color-mix(in oklab, var(--muted) 80%, transparent)}}.tw\\:hover\\:bg-primary\\/10:hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-primary\\/10:hover{background-color:color-mix(in oklab, var(--primary) 10%, transparent)}}.tw\\:hover\\:bg-primary\\/70:hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-primary\\/70:hover{background-color:color-mix(in oklab, var(--primary) 70%, transparent)}}.tw\\:hover\\:bg-primary\\/90:hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-primary\\/90:hover{background-color:color-mix(in oklab, var(--primary) 90%, transparent)}}.tw\\:hover\\:bg-red-500:hover{background-color:var(--tw-color-red-500)}.tw\\:hover\\:bg-secondary:hover,.tw\\:hover\\:bg-secondary\\/80:hover{background-color:var(--secondary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-secondary\\/80:hover{background-color:color-mix(in oklab, var(--secondary) 80%, transparent)}}.tw\\:hover\\:bg-sidebar-accent:hover{background-color:var(--sidebar-accent)}.tw\\:hover\\:bg-transparent:hover{background-color:#0000}.tw\\:hover\\:text-foreground:hover{color:var(--foreground)}.tw\\:hover\\:text-muted-foreground:hover{color:var(--muted-foreground)}.tw\\:hover\\:text-primary-foreground:hover{color:var(--primary-foreground)}.tw\\:hover\\:text-sidebar-accent-foreground:hover{color:var(--sidebar-accent-foreground)}.tw\\:hover\\:underline:hover{text-decoration-line:underline}.tw\\:hover\\:opacity-80:hover{opacity:.8}.tw\\:hover\\:opacity-100:hover{opacity:1}.tw\\:hover\\:shadow-\\[0_0_0_1px_var\\(--sidebar-accent\\)\\]:hover{--tw-shadow:0 0 0 1px var(--tw-shadow-color,var(--sidebar-accent));box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:hover\\:shadow-md:hover{--tw-shadow:0 4px 6px -1px var(--tw-shadow-color,#0000001a), 0 2px 4px -2px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:hover\\:ring-3:hover{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:hover\\:group-data-\\[collapsible\\=offcanvas\\]\\:bg-sidebar:hover:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){background-color:var(--sidebar)}.tw\\:hover\\:after\\:bg-sidebar-border:hover:after{content:var(--tw-content);background-color:var(--sidebar-border)}}.tw\\:focus\\:relative:focus{position:relative}.tw\\:focus\\:z-10:focus{z-index:10}.tw\\:focus\\:bg-accent:focus{background-color:var(--accent)}.tw\\:focus\\:bg-muted:focus{background-color:var(--muted)}.tw\\:focus\\:text-accent-foreground:focus{color:var(--accent-foreground)}.tw\\:focus\\:text-foreground:focus{color:var(--foreground)}.tw\\:focus\\:ring-2:focus{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus\\:ring-ring:focus{--tw-ring-color:var(--ring)}.tw\\:focus\\:ring-offset-1:focus{--tw-ring-offset-width:1px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}.tw\\:focus\\:ring-offset-background:focus{--tw-ring-offset-color:var(--background)}.tw\\:focus\\:outline-hidden:focus{--tw-outline-style:none;outline-style:none}@media (forced-colors:active){.tw\\:focus\\:outline-hidden:focus{outline-offset:2px;outline:2px solid #0000}}:is(.tw\\:focus\\:\\*\\*\\:text-accent-foreground:focus *),:is(.tw\\:not-data-\\[variant\\=destructive\\]\\:focus\\:\\*\\*\\:text-accent-foreground:not([data-variant=destructive]):focus *){color:var(--accent-foreground)}.tw\\:focus-visible\\:z-10:focus-visible{z-index:10}.tw\\:focus-visible\\:border-destructive\\/40:focus-visible{border-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:focus-visible\\:border-destructive\\/40:focus-visible{border-color:color-mix(in oklab, var(--destructive) 40%, transparent)}}.tw\\:focus-visible\\:border-ring:focus-visible{border-color:var(--ring)}.tw\\:focus-visible\\:ring-0:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-visible\\:ring-1:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-visible\\:ring-2:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-visible\\:ring-3:focus-visible,.tw\\:focus-visible\\:ring-\\[3px\\]:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-visible\\:ring-\\[color\\:hsl\\(240\\,5\\%\\,64\\.9\\%\\)\\]:focus-visible{--tw-ring-color:#a1a1aa}.tw\\:focus-visible\\:ring-destructive\\/20:focus-visible{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:focus-visible\\:ring-destructive\\/20:focus-visible{--tw-ring-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:focus-visible\\:ring-ring:focus-visible,.tw\\:focus-visible\\:ring-ring\\/50:focus-visible{--tw-ring-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.tw\\:focus-visible\\:ring-ring\\/50:focus-visible{--tw-ring-color:color-mix(in oklab, var(--ring) 50%, transparent)}}.tw\\:focus-visible\\:ring-slate-400:focus-visible{--tw-ring-color:var(--tw-color-slate-400)}.tw\\:focus-visible\\:ring-offset-2:focus-visible{--tw-ring-offset-width:2px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}.tw\\:focus-visible\\:outline-hidden:focus-visible{--tw-outline-style:none;outline-style:none}@media (forced-colors:active){.tw\\:focus-visible\\:outline-hidden:focus-visible{outline-offset:2px;outline:2px solid #0000}}.tw\\:focus-visible\\:outline-1:focus-visible{outline-style:var(--tw-outline-style);outline-width:1px}.tw\\:focus-visible\\:outline-ring:focus-visible{outline-color:var(--ring)}.tw\\:focus-visible\\:outline-none:focus-visible{--tw-outline-style:none;outline-style:none}.tw\\:focus-visible\\:ring-inset:focus-visible{--tw-ring-inset:inset}:is(.tw\\:\\*\\:focus-visible\\:relative>*):focus-visible{position:relative}:is(.tw\\:\\*\\:focus-visible\\:z-10>*):focus-visible{z-index:10}.tw\\:active\\:bg-sidebar-accent:active{background-color:var(--sidebar-accent)}.tw\\:active\\:text-sidebar-accent-foreground:active{color:var(--sidebar-accent-foreground)}.tw\\:active\\:ring-3:active{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:active\\:not-aria-\\[haspopup\\]\\:translate-y-px:active:not([aria-haspopup]){--tw-translate-y:1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:active\\:not-aria-\\[haspopup\\]\\:transform-\\[translateY\\(1px\\)\\]:active:not([aria-haspopup]){transform:translateY(1px)}.tw\\:disabled\\:pointer-events-none:disabled{pointer-events:none}.tw\\:disabled\\:cursor-not-allowed:disabled{cursor:not-allowed}.tw\\:disabled\\:bg-input\\/50:disabled{background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:disabled\\:bg-input\\/50:disabled{background-color:color-mix(in oklab, var(--input) 50%, transparent)}}.tw\\:disabled\\:bg-transparent:disabled{background-color:#0000}.tw\\:disabled\\:opacity-50:disabled{opacity:.5}:where([data-side=bottom]) .tw\\:in-data-\\[side\\=bottom\\]\\:translate-y-\\[calc\\(-50\\%-1px\\)\\]{--tw-translate-y:calc(-50% - 1px);translate:var(--tw-translate-x) var(--tw-translate-y)}:where([data-side=bottom]) .tw\\:in-data-\\[side\\=bottom\\]\\:\\[clip-path\\:polygon\\(100\\%_0\\,100\\%_100\\%\\,0_100\\%\\)\\]{clip-path:polygon(100% 0,100% 100%,0 100%)}:where([data-side=primary]) .tw\\:in-data-\\[side\\=primary\\]\\:cursor-w-resize{cursor:w-resize}:where([data-side=secondary]) .tw\\:in-data-\\[side\\=secondary\\]\\:cursor-e-resize{cursor:e-resize}:where([data-side=top]) .tw\\:in-data-\\[side\\=top\\]\\:translate-y-\\[calc\\(-50\\%-1px\\)\\]{--tw-translate-y:calc(-50% - 1px);translate:var(--tw-translate-x) var(--tw-translate-y)}:where([data-side=top]) .tw\\:in-data-\\[side\\=top\\]\\:\\[clip-path\\:polygon\\(100\\%_0\\,100\\%_100\\%\\,0_100\\%\\)\\]{clip-path:polygon(100% 0,100% 100%,0 100%)}:where([data-slot=button-group]) .tw\\:in-data-\\[slot\\=button-group\\]\\:rounded-lg{border-radius:var(--radius)}:where([data-slot=combobox-content]) .tw\\:in-data-\\[slot\\=combobox-content\\]\\:focus-within\\:border-inherit:focus-within{border-color:inherit}:where([data-slot=combobox-content]) .tw\\:in-data-\\[slot\\=combobox-content\\]\\:focus-within\\:ring-0:focus-within{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}:where([data-slot=dialog-content]) .tw\\:in-data-\\[slot\\=dialog-content\\]\\:rounded-lg\\!{border-radius:var(--radius)!important}:where([data-slot=tooltip-content]) .tw\\:in-data-\\[slot\\=tooltip-content\\]\\:bg-background\\/20{background-color:var(--background)}@supports (color:color-mix(in lab, red, red)){:where([data-slot=tooltip-content]) .tw\\:in-data-\\[slot\\=tooltip-content\\]\\:bg-background\\/20{background-color:color-mix(in oklab, var(--background) 20%, transparent)}}:where([data-slot=tooltip-content]) .tw\\:in-data-\\[slot\\=tooltip-content\\]\\:text-background{color:var(--background)}:where([data-slot=tooltip-content]) .tw\\:in-data-\\[slot\\=tooltip-content\\]\\:text-destructive{color:var(--destructive)}.tw\\:has-disabled\\:bg-input\\/50:has(:disabled){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:has-disabled\\:bg-input\\/50:has(:disabled){background-color:color-mix(in oklab, var(--input) 50%, transparent)}}.tw\\:has-disabled\\:opacity-50:has(:disabled){opacity:.5}.tw\\:has-aria-expanded\\:bg-muted\\/50:has([aria-expanded=true]){background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:has-aria-expanded\\:bg-muted\\/50:has([aria-expanded=true]){background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:has-data-\\[icon\\=inline-end\\]\\:pe-1:has([data-icon=inline-end]){padding-inline-end:calc(calc(var(--spacing)) * 1)}.tw\\:has-data-\\[icon\\=inline-end\\]\\:pe-1\\.5:has([data-icon=inline-end]){padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[icon\\=inline-end\\]\\:pe-2:has([data-icon=inline-end]){padding-inline-end:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[spacing\\=0\\]\\/toggle-group\\:has-data-\\[icon\\=inline-end\\]\\:pe-1\\.5:is(:where(.tw\\:group\\/toggle-group)[data-spacing="0"] *):has([data-icon=inline-end]){padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[icon\\=inline-start\\]\\:ps-1:has([data-icon=inline-start]){padding-inline-start:calc(calc(var(--spacing)) * 1)}.tw\\:has-data-\\[icon\\=inline-start\\]\\:ps-1\\.5:has([data-icon=inline-start]){padding-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[icon\\=inline-start\\]\\:ps-2:has([data-icon=inline-start]){padding-inline-start:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[spacing\\=0\\]\\/toggle-group\\:has-data-\\[icon\\=inline-start\\]\\:ps-1\\.5:is(:where(.tw\\:group\\/toggle-group)[data-spacing="0"] *):has([data-icon=inline-start]){padding-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[slot\\=alert-action\\]\\:relative:has([data-slot=alert-action]){position:relative}.tw\\:has-data-\\[slot\\=alert-action\\]\\:pe-18:has([data-slot=alert-action]){padding-inline-end:calc(calc(var(--spacing)) * 18)}.tw\\:has-data-\\[slot\\=card-action\\]\\:grid-cols-\\[1fr_auto\\]:has([data-slot=card-action]){grid-template-columns:1fr auto}.tw\\:has-data-\\[slot\\=card-description\\]\\:grid-rows-\\[auto_auto\\]:has([data-slot=card-description]){grid-template-rows:auto auto}.tw\\:has-data-\\[slot\\=card-footer\\]\\:pb-0:has([data-slot=card-footer]){padding-bottom:calc(calc(var(--spacing)) * 0)}.tw\\:has-data-\\[slot\\=kbd\\]\\:pe-0:has([data-slot=kbd]){padding-inline-end:calc(calc(var(--spacing)) * 0)}.tw\\:has-data-\\[slot\\=kbd\\]\\:pe-1\\.5:has([data-slot=kbd]){padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[variant\\=inset\\]\\:bg-sidebar:has([data-variant=inset]){background-color:var(--sidebar)}.tw\\:has-\\[\\[data-slot\\=input-group-control\\]\\:focus-visible\\]\\:border-ring:has([data-slot=input-group-control]:focus-visible){border-color:var(--ring)}.tw\\:has-\\[\\[data-slot\\=input-group-control\\]\\:focus-visible\\]\\:ring-3:has([data-slot=input-group-control]:focus-visible){--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:has-\\[\\[data-slot\\=input-group-control\\]\\:focus-visible\\]\\:ring-ring\\/50:has([data-slot=input-group-control]:focus-visible){--tw-ring-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.tw\\:has-\\[\\[data-slot\\=input-group-control\\]\\:focus-visible\\]\\:ring-ring\\/50:has([data-slot=input-group-control]:focus-visible){--tw-ring-color:color-mix(in oklab, var(--ring) 50%, transparent)}}.tw\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:border-destructive:has([data-slot][aria-invalid=true]){border-color:var(--destructive)}.tw\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-3:has([data-slot][aria-invalid=true]){--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-destructive\\/20:has([data-slot][aria-invalid=true]){--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-destructive\\/20:has([data-slot][aria-invalid=true]){--tw-ring-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:has-\\[\\>\\[data-align\\=block-end\\]\\]\\:h-auto:has(>[data-align=block-end]){height:auto}.tw\\:has-\\[\\>\\[data-align\\=block-end\\]\\]\\:flex-col:has(>[data-align=block-end]){flex-direction:column}.tw\\:has-\\[\\>\\[data-align\\=block-start\\]\\]\\:h-auto:has(>[data-align=block-start]){height:auto}.tw\\:has-\\[\\>\\[data-align\\=block-start\\]\\]\\:flex-col:has(>[data-align=block-start]){flex-direction:column}.tw\\:has-\\[\\>\\[data-slot\\=button-group\\]\\]\\:gap-2:has(>[data-slot=button-group]){gap:calc(calc(var(--spacing)) * 2)}.tw\\:has-\\[\\>button\\]\\:ms-\\[-0\\.3rem\\]:has(>button){margin-inline-start:-.3rem}.tw\\:has-\\[\\>button\\]\\:me-\\[-0\\.3rem\\]:has(>button){margin-inline-end:-.3rem}.tw\\:has-\\[\\>img\\]\\:grid-cols-\\[auto_1fr\\]:has(>img){grid-template-columns:auto 1fr}.tw\\:has-\\[\\>img\\]\\:gap-x-2:has(>img){column-gap:calc(calc(var(--spacing)) * 2)}.tw\\:has-\\[\\>img\\:first-child\\]\\:pt-0:has(>img:first-child){padding-top:calc(calc(var(--spacing)) * 0)}.tw\\:has-\\[\\>kbd\\]\\:ms-\\[-0\\.15rem\\]:has(>kbd){margin-inline-start:-.15rem}.tw\\:has-\\[\\>kbd\\]\\:me-\\[-0\\.15rem\\]:has(>kbd){margin-inline-end:-.15rem}.tw\\:has-\\[\\>svg\\]\\:grid-cols-\\[auto_1fr\\]:has(>svg){grid-template-columns:auto 1fr}.tw\\:has-\\[\\>svg\\]\\:gap-x-2:has(>svg){column-gap:calc(calc(var(--spacing)) * 2)}.tw\\:has-\\[\\>svg\\]\\:p-0:has(>svg){padding:calc(calc(var(--spacing)) * 0)}.tw\\:has-\\[\\>textarea\\]\\:h-auto:has(>textarea){height:auto}.tw\\:aria-disabled\\:pointer-events-none[aria-disabled=true]{pointer-events:none}.tw\\:aria-disabled\\:cursor-default[aria-disabled=true]{cursor:default}.tw\\:aria-disabled\\:opacity-50[aria-disabled=true]{opacity:.5}@media (hover:hover){.tw\\:aria-disabled\\:hover\\:bg-transparent\\![aria-disabled=true]:hover{background-color:#0000!important}.tw\\:aria-disabled\\:hover\\:text-inherit\\![aria-disabled=true]:hover{color:inherit!important}}.tw\\:aria-disabled\\:active\\:transform-none\\![aria-disabled=true]:active{transform:none!important}.tw\\:aria-expanded\\:bg-muted[aria-expanded=true]{background-color:var(--muted)}.tw\\:aria-expanded\\:bg-secondary[aria-expanded=true]{background-color:var(--secondary)}.tw\\:aria-expanded\\:text-foreground[aria-expanded=true]{color:var(--foreground)}.tw\\:aria-expanded\\:text-secondary-foreground[aria-expanded=true]{color:var(--secondary-foreground)}.tw\\:aria-expanded\\:opacity-100[aria-expanded=true]{opacity:1}.tw\\:aria-invalid\\:border-destructive[aria-invalid=true]{border-color:var(--destructive)}.tw\\:aria-invalid\\:ring-0[aria-invalid=true]{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:aria-invalid\\:ring-3[aria-invalid=true]{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:aria-invalid\\:ring-destructive\\/20[aria-invalid=true]{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:aria-invalid\\:ring-destructive\\/20[aria-invalid=true]{--tw-ring-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:aria-invalid\\:aria-checked\\:border-primary[aria-invalid=true][aria-checked=true]{border-color:var(--primary)}.tw\\:aria-pressed\\:bg-muted[aria-pressed=true]{background-color:var(--muted)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:h-px[aria-orientation=horizontal]{height:1px}.tw\\:aria-\\[orientation\\=horizontal\\]\\:w-full[aria-orientation=horizontal]{width:100%}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:start-0[aria-orientation=horizontal]:after{content:var(--tw-content);inset-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:h-1[aria-orientation=horizontal]:after{content:var(--tw-content);height:calc(calc(var(--spacing)) * 1)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:w-full[aria-orientation=horizontal]:after{content:var(--tw-content);width:100%}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:translate-x-0[aria-orientation=horizontal]:after{content:var(--tw-content);--tw-translate-x:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:-translate-y-1\\/2[aria-orientation=horizontal]:after{content:var(--tw-content);--tw-translate-y:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:aria-\\[orientation\\=vertical\\]\\:flex-col[aria-orientation=vertical]{flex-direction:column}.tw\\:data-inset\\:ps-7[data-inset]{padding-inline-start:calc(calc(var(--spacing)) * 7)}.tw\\:data-placeholder\\:text-muted-foreground[data-placeholder]{color:var(--muted-foreground)}.tw\\:data-quiet-focus\\:focus-visible\\:border-transparent[data-quiet-focus]:focus-visible{border-color:#0000}.tw\\:data-quiet-focus\\:focus-visible\\:ring-0[data-quiet-focus]:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:data-quiet-focus\\:focus-visible\\:outline-none[data-quiet-focus]:focus-visible{--tw-outline-style:none;outline-style:none}.tw\\:data-\\[align-trigger\\=false\\]\\:min-w-36[data-align-trigger=false]{min-width:calc(calc(var(--spacing)) * 36)}.tw\\:data-\\[align-trigger\\=true\\]\\:min-w-\\(--radix-select-trigger-width\\)[data-align-trigger=true]{min-width:var(--radix-select-trigger-width)}.tw\\:data-\\[align-trigger\\=true\\]\\:animate-none[data-align-trigger=true]{animation:none}.tw\\:data-\\[disabled\\=true\\]\\:pointer-events-auto[data-disabled=true]{pointer-events:auto}.tw\\:data-\\[disabled\\=true\\]\\:pointer-events-none[data-disabled=true]{pointer-events:none}.tw\\:data-\\[disabled\\=true\\]\\:cursor-not-allowed[data-disabled=true]{cursor:not-allowed}.tw\\:data-\\[disabled\\=true\\]\\:opacity-50[data-disabled=true]{opacity:.5}.tw\\:data-\\[position\\=popper\\]\\:h-\\(--radix-select-trigger-height\\)[data-position=popper]{height:var(--radix-select-trigger-height)}.tw\\:data-\\[position\\=popper\\]\\:w-full[data-position=popper]{width:100%}.tw\\:data-\\[position\\=popper\\]\\:min-w-\\(--radix-select-trigger-width\\)[data-position=popper]{min-width:var(--radix-select-trigger-width)}.tw\\:data-\\[side\\=bottom\\]\\:translate-y-1[data-side=bottom]{--tw-translate-y:calc(calc(var(--spacing)) * 1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=bottom\\]\\:slide-in-from-top-2[data-side=bottom]{--tw-enter-translate-y:calc(2*var(--spacing)*-1)}.tw\\:data-\\[side\\=left\\]\\:-translate-x-1[data-side=left]{--tw-translate-x:calc(calc(var(--spacing)) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=left\\]\\:slide-in-from-right-2[data-side=left]{--tw-enter-translate-x:calc(2*var(--spacing))}.tw\\:data-\\[side\\=right\\]\\:translate-x-1[data-side=right]{--tw-translate-x:calc(calc(var(--spacing)) * 1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=right\\]\\:slide-in-from-left-2[data-side=right]{--tw-enter-translate-x:calc(2*var(--spacing)*-1)}.tw\\:data-\\[side\\=top\\]\\:-translate-y-1[data-side=top]{--tw-translate-y:calc(calc(var(--spacing)) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=top\\]\\:slide-in-from-bottom-2[data-side=top]{--tw-enter-translate-y:calc(2*var(--spacing))}.tw\\:data-\\[size\\=default\\]\\:h-8[data-size=default]{height:calc(calc(var(--spacing)) * 8)}.tw\\:data-\\[size\\=default\\]\\:h-\\[18\\.4px\\][data-size=default]{height:18.4px}.tw\\:data-\\[size\\=default\\]\\:w-\\[32px\\][data-size=default]{width:32px}.tw\\:data-\\[size\\=lg\\]\\:size-10[data-size=lg]{width:calc(calc(var(--spacing)) * 10);height:calc(calc(var(--spacing)) * 10)}.tw\\:data-\\[size\\=md\\]\\:text-sm[data-size=md]{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:data-\\[size\\=sm\\]\\:size-6[data-size=sm]{width:calc(calc(var(--spacing)) * 6);height:calc(calc(var(--spacing)) * 6)}.tw\\:data-\\[size\\=sm\\]\\:h-7[data-size=sm]{height:calc(calc(var(--spacing)) * 7)}.tw\\:data-\\[size\\=sm\\]\\:h-\\[14px\\][data-size=sm]{height:14px}.tw\\:data-\\[size\\=sm\\]\\:w-\\[24px\\][data-size=sm]{width:24px}.tw\\:data-\\[size\\=sm\\]\\:gap-3[data-size=sm]{gap:calc(calc(var(--spacing)) * 3)}.tw\\:data-\\[size\\=sm\\]\\:rounded-\\[min\\(var\\(--tw-radius-md\\)\\,10px\\)\\][data-size=sm]{border-radius:min(var(--tw-radius-md), 10px)}.tw\\:data-\\[size\\=sm\\]\\:py-3[data-size=sm]{padding-block:calc(calc(var(--spacing)) * 3)}.tw\\:data-\\[size\\=sm\\]\\:text-xs[data-size=sm]{font-size:var(--tw-text-xs);line-height:var(--tw-leading,var(--tw-text-xs--line-height))}.tw\\:data-\\[size\\=sm\\]\\:has-data-\\[slot\\=card-footer\\]\\:pb-0[data-size=sm]:has([data-slot=card-footer]){padding-bottom:calc(calc(var(--spacing)) * 0)}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-item\\]\\:focus\\:bg-foreground\\/10 *)[data-slot$=-item]:focus{background-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-item\\]\\:focus\\:bg-foreground\\/10 *)[data-slot$=-item]:focus{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)}}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-item\\]\\:data-highlighted\\:bg-foreground\\/10 *)[data-slot$=-item][data-highlighted]{background-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-item\\]\\:data-highlighted\\:bg-foreground\\/10 *)[data-slot$=-item][data-highlighted]{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)}}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-separator\\]\\:bg-foreground\\/5 *)[data-slot$=-separator]{background-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-separator\\]\\:bg-foreground\\/5 *)[data-slot$=-separator]{background-color:color-mix(in oklab, var(--foreground) 5%, transparent)}}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-trigger\\]\\:focus\\:bg-foreground\\/10 *)[data-slot$=-trigger]:focus{background-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-trigger\\]\\:focus\\:bg-foreground\\/10 *)[data-slot$=-trigger]:focus{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)}}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-trigger\\]\\:aria-expanded\\:bg-foreground\\/10\\! *)[data-slot$=-trigger][aria-expanded=true]{background-color:var(--foreground)!important}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-trigger\\]\\:aria-expanded\\:bg-foreground\\/10\\! *)[data-slot$=-trigger][aria-expanded=true]{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)!important}}:is(.tw\\:\\*\\:data-\\[slot\\=alert-description\\]\\:text-destructive\\/90>*)[data-slot=alert-description]{color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\:data-\\[slot\\=alert-description\\]\\:text-destructive\\/90>*)[data-slot=alert-description]{color:color-mix(in oklab, var(--destructive) 90%, transparent)}}:is(.tw\\:\\*\\:data-\\[slot\\=avatar\\]\\:ring-2>*)[data-slot=avatar]{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}:is(.tw\\:\\*\\:data-\\[slot\\=avatar\\]\\:ring-background>*)[data-slot=avatar]{--tw-ring-color:var(--background)}:is(.tw\\:\\*\\:data-\\[slot\\=input-group-addon\\]\\:ps-2\\!>*)[data-slot=input-group-addon]{padding-inline-start:calc(calc(var(--spacing)) * 2)!important}:is(.tw\\:\\*\\*\\:data-\\[slot\\=kbd\\]\\:relative *)[data-slot=kbd]{position:relative}:is(.tw\\:\\*\\*\\:data-\\[slot\\=kbd\\]\\:isolate *)[data-slot=kbd]{isolation:isolate}:is(.tw\\:\\*\\*\\:data-\\[slot\\=kbd\\]\\:z-50 *)[data-slot=kbd]{z-index:50}:is(.tw\\:\\*\\*\\:data-\\[slot\\=kbd\\]\\:rounded-sm *)[data-slot=kbd]{border-radius:calc(var(--radius) * .6)}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:line-clamp-1>*)[data-slot=select-value]{-webkit-line-clamp:1;-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:flex>*)[data-slot=select-value]{display:flex}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:flex-1>*)[data-slot=select-value]{flex:1}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:items-center>*)[data-slot=select-value]{align-items:center}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:gap-1\\.5>*)[data-slot=select-value]{gap:calc(calc(var(--spacing)) * 1.5)}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:text-start>*)[data-slot=select-value]{text-align:start}.tw\\:group-data-horizontal\\/toggle-group\\:data-\\[spacing\\=0\\]\\:first\\:rounded-s-lg:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=horizontal]) *)[data-spacing="0"]:first-child{border-start-start-radius:var(--radius);border-end-start-radius:var(--radius)}.tw\\:group-data-vertical\\/toggle-group\\:data-\\[spacing\\=0\\]\\:first\\:rounded-t-lg:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=vertical]) *)[data-spacing="0"]:first-child{border-top-left-radius:var(--radius);border-top-right-radius:var(--radius)}.tw\\:group-data-horizontal\\/toggle-group\\:data-\\[spacing\\=0\\]\\:last\\:rounded-e-lg:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=horizontal]) *)[data-spacing="0"]:last-child{border-start-end-radius:var(--radius);border-end-end-radius:var(--radius)}.tw\\:group-data-vertical\\/toggle-group\\:data-\\[spacing\\=0\\]\\:last\\:rounded-b-lg:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=vertical]) *)[data-spacing="0"]:last-child{border-bottom-right-radius:var(--radius);border-bottom-left-radius:var(--radius)}.tw\\:data-\\[state\\=active\\]\\:bg-background[data-state=active]{background-color:var(--background)}.tw\\:data-\\[state\\=active\\]\\:text-foreground[data-state=active]{color:var(--foreground)}.tw\\:data-\\[state\\=active\\]\\:shadow-sm[data-state=active]{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:data-\\[state\\=closed\\]\\:overflow-hidden[data-state=closed]{overflow:hidden}.tw\\:data-\\[state\\=delayed-open\\]\\:animate-in[data-state=delayed-open]{animation:enter var(--tw-animation-duration,var(--tw-duration,.15s))var(--tw-ease,ease)var(--tw-animation-delay,0s)var(--tw-animation-iteration-count,1)var(--tw-animation-direction,normal)var(--tw-animation-fill-mode,none)}.tw\\:data-\\[state\\=delayed-open\\]\\:fade-in-0[data-state=delayed-open]{--tw-enter-opacity:0}.tw\\:data-\\[state\\=delayed-open\\]\\:zoom-in-95[data-state=delayed-open]{--tw-enter-scale:.95}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-soft-approved\\)\\][data-state=on]{background-color:var(--inv-soft-approved)}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-soft-unapproved\\)\\][data-state=on]{background-color:var(--inv-soft-unapproved)}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-soft-unknown\\)\\][data-state=on]{background-color:var(--inv-soft-unknown)}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-vivid-approved\\)\\][data-state=on]{background-color:var(--inv-vivid-approved)}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-vivid-unapproved\\)\\][data-state=on]{background-color:var(--inv-vivid-unapproved)}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-vivid-unknown\\)\\][data-state=on]{background-color:var(--inv-vivid-unknown)}.tw\\:data-\\[state\\=on\\]\\:bg-muted[data-state=on]{background-color:var(--muted)}.tw\\:data-\\[state\\=on\\]\\:text-\\[var\\(--inv-icon-approved\\)\\][data-state=on]{color:var(--inv-icon-approved)}.tw\\:data-\\[state\\=on\\]\\:text-\\[var\\(--inv-icon-unapproved\\)\\][data-state=on]{color:var(--inv-icon-unapproved)}.tw\\:data-\\[state\\=on\\]\\:text-\\[var\\(--inv-icon-unknown\\)\\][data-state=on]{color:var(--inv-icon-unknown)}.tw\\:data-\\[state\\=on\\]\\:text-\\[var\\(--inv-on\\)\\][data-state=on]{color:var(--inv-on)}.tw\\:data-\\[state\\=on\\]\\:text-foreground[data-state=on]{color:var(--foreground)}.tw\\:data-\\[state\\=open\\]\\:bg-accent[data-state=open]{background-color:var(--accent)}.tw\\:data-\\[state\\=open\\]\\:bg-muted[data-state=open]{background-color:var(--muted)}.tw\\:data-\\[state\\=open\\]\\:text-foreground[data-state=open]{color:var(--foreground)}.tw\\:data-\\[state\\=selected\\]\\:bg-muted[data-state=selected]{background-color:var(--muted)}.tw\\:data-\\[variant\\=destructive\\]\\:text-destructive[data-variant=destructive]{color:var(--destructive)}:is(:is(.tw\\:\\*\\*\\:data-\\[variant\\=destructive\\]\\:\\*\\*\\:text-accent-foreground\\! *)[data-variant=destructive] *),:is(.tw\\:\\*\\*\\:data-\\[variant\\=destructive\\]\\:text-accent-foreground\\! *)[data-variant=destructive]{color:var(--accent-foreground)!important}.tw\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-destructive\\/10[data-variant=destructive]:focus{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-destructive\\/10[data-variant=destructive]:focus{background-color:color-mix(in oklab, var(--destructive) 10%, transparent)}}.tw\\:data-\\[variant\\=destructive\\]\\:focus\\:text-destructive[data-variant=destructive]:focus{color:var(--destructive)}:is(.tw\\:\\*\\*\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-foreground\\/10\\! *)[data-variant=destructive]:focus{background-color:var(--foreground)!important}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-foreground\\/10\\! *)[data-variant=destructive]:focus{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)!important}}.tw\\:data-\\[variant\\=line\\]\\:rounded-none[data-variant=line]{border-radius:0}.tw\\:group-data-horizontal\\/toggle-group\\:data-\\[spacing\\=0\\]\\:data-\\[variant\\=outline\\]\\:border-s-0:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=horizontal]) *)[data-spacing="0"][data-variant=outline]{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:group-data-vertical\\/toggle-group\\:data-\\[spacing\\=0\\]\\:data-\\[variant\\=outline\\]\\:border-t-0:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=vertical]) *)[data-spacing="0"][data-variant=outline]{border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:group-data-horizontal\\/toggle-group\\:data-\\[spacing\\=0\\]\\:data-\\[variant\\=outline\\]\\:first\\:border-s:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=horizontal]) *)[data-spacing="0"][data-variant=outline]:first-child{border-inline-start-style:var(--tw-border-style);border-inline-start-width:1px}.tw\\:group-data-vertical\\/toggle-group\\:data-\\[spacing\\=0\\]\\:data-\\[variant\\=outline\\]\\:first\\:border-t:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=vertical]) *)[data-spacing="0"][data-variant=outline]:first-child{border-top-style:var(--tw-border-style);border-top-width:1px}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:inset-x-0[data-vaul-drawer-direction=bottom]{inset-inline:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:bottom-0[data-vaul-drawer-direction=bottom]{bottom:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:mt-24[data-vaul-drawer-direction=bottom]{margin-top:calc(calc(var(--spacing)) * 24)}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:max-h-\\[80vh\\][data-vaul-drawer-direction=bottom]{max-height:80vh}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:rounded-t-xl[data-vaul-drawer-direction=bottom]{border-top-left-radius:calc(var(--radius) * 1.4);border-top-right-radius:calc(var(--radius) * 1.4)}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:border-t[data-vaul-drawer-direction=bottom]{border-top-style:var(--tw-border-style);border-top-width:1px}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:inset-y-0[data-vaul-drawer-direction=left]{inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:left-0[data-vaul-drawer-direction=left]{left:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:w-3\\/4[data-vaul-drawer-direction=left]{width:75%}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:flex-row[data-vaul-drawer-direction=left]{flex-direction:row}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:rounded-r-xl[data-vaul-drawer-direction=left]{border-top-right-radius:calc(var(--radius) * 1.4);border-bottom-right-radius:calc(var(--radius) * 1.4)}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:border-r[data-vaul-drawer-direction=left]{border-right-style:var(--tw-border-style);border-right-width:1px}.tw\\:data-\\[vaul-drawer-direction\\=left\\/right\\]\\:flex-row[data-vaul-drawer-direction=left\\/right]{flex-direction:row}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:inset-y-0[data-vaul-drawer-direction=right]{inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:right-0[data-vaul-drawer-direction=right]{right:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:w-3\\/4[data-vaul-drawer-direction=right]{width:75%}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:flex-row[data-vaul-drawer-direction=right]{flex-direction:row}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:rounded-l-xl[data-vaul-drawer-direction=right]{border-top-left-radius:calc(var(--radius) * 1.4);border-bottom-left-radius:calc(var(--radius) * 1.4)}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:border-l[data-vaul-drawer-direction=right]{border-left-style:var(--tw-border-style);border-left-width:1px}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:inset-x-0[data-vaul-drawer-direction=top]{inset-inline:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:top-0[data-vaul-drawer-direction=top]{top:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:mb-24[data-vaul-drawer-direction=top]{margin-bottom:calc(calc(var(--spacing)) * 24)}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:max-h-\\[80vh\\][data-vaul-drawer-direction=top]{max-height:80vh}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:rounded-b-xl[data-vaul-drawer-direction=top]{border-bottom-right-radius:calc(var(--radius) * 1.4);border-bottom-left-radius:calc(var(--radius) * 1.4)}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:border-b[data-vaul-drawer-direction=top]{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}@supports ((-webkit-backdrop-filter:var(--tw)) or (backdrop-filter:var(--tw))){.tw\\:supports-backdrop-filter\\:backdrop-blur-xs{--tw-backdrop-blur:blur(var(--tw-blur-xs));-webkit-backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)}}@media (min-width:40rem){.tw\\:sm\\:flex{display:flex}.tw\\:sm\\:max-w-sm{max-width:var(--tw-container-sm)}.tw\\:sm\\:flex-row{flex-direction:row}.tw\\:sm\\:justify-end{justify-content:flex-end}.tw\\:sm\\:p-8{padding:calc(calc(var(--spacing)) * 8)}.tw\\:sm\\:text-start{text-align:start}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:sm\\:max-w-sm[data-vaul-drawer-direction=left],.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:sm\\:max-w-sm[data-vaul-drawer-direction=right]{max-width:var(--tw-container-sm)}}@media (min-width:48rem){.tw\\:md\\:block{display:block}.tw\\:md\\:flex{display:flex}.tw\\:md\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.tw\\:md\\:gap-0\\.5{gap:calc(calc(var(--spacing)) * .5)}.tw\\:md\\:text-start{text-align:start}.tw\\:md\\:text-sm{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:md\\:text-pretty{text-wrap:pretty}.tw\\:md\\:opacity-0{opacity:0}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:m-2:is(:where(.tw\\:peer)[data-variant=inset]~*){margin:calc(calc(var(--spacing)) * 2)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:ms-0:is(:where(.tw\\:peer)[data-variant=inset]~*){margin-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:rounded-xl:is(:where(.tw\\:peer)[data-variant=inset]~*){border-radius:calc(var(--radius) * 1.4)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:shadow-sm:is(:where(.tw\\:peer)[data-variant=inset]~*){--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:peer-data-\\[state\\=collapsed\\]\\:ms-2:is(:where(.tw\\:peer)[data-variant=inset]~*):is(:where(.tw\\:peer)[data-state=collapsed]~*){margin-inline-start:calc(calc(var(--spacing)) * 2)}.tw\\:md\\:after\\:hidden:after{content:var(--tw-content);display:none}}@media (min-width:64rem){.tw\\:lg\\:flex{display:flex}.tw\\:lg\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}:where(.tw\\:lg\\:space-x-8>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 8) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 8) * calc(1 - var(--tw-space-x-reverse)))}.tw\\:lg\\:text-5xl{font-size:var(--tw-text-5xl);line-height:var(--tw-leading,var(--tw-text-5xl--line-height))}}@media (min-width:48rem){@media (min-width:64rem){.tw\\:md\\:lg\\:hidden{display:none}}}@media (min-width:80rem){.tw\\:xl\\:auto-cols-fr{grid-auto-columns:minmax(0,1fr)}.tw\\:xl\\:grid-flow-col{grid-auto-flow:column}.tw\\:xl\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.tw\\:xl\\:grid-cols-none{grid-template-columns:none}.tw\\:xl\\:grid-rows-2{grid-template-rows:repeat(2,minmax(0,1fr))}}@container search not (min-width:7rem){.tw\\:\\@max-\\[7rem\\]\\/search\\:hidden{display:none}.tw\\:\\@max-\\[7rem\\]\\/search\\:ps-3{padding-inline-start:calc(calc(var(--spacing)) * 3)}}@container search not (min-width:4rem){.tw\\:\\@max-\\[4rem\\]\\/search\\:hidden{display:none}.tw\\:\\@max-\\[4rem\\]\\/search\\:pe-3{padding-inline-end:calc(calc(var(--spacing)) * 3)}}@container search not (min-width:3rem){.tw\\:\\@max-\\[3rem\\]\\/search\\:ps-0{padding-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:\\@max-\\[3rem\\]\\/search\\:pe-0{padding-inline-end:calc(calc(var(--spacing)) * 0)}}@container (min-width:24rem){.tw\\:\\@sm\\:basis-auto{flex-basis:auto}}.tw\\:ltr\\:left-2:where(:dir(ltr),[dir=ltr],[dir=ltr] *){left:calc(calc(var(--spacing)) * 2)}.tw\\:ltr\\:-translate-x-1\\/2:where(:dir(ltr),[dir=ltr],[dir=ltr] *){--tw-translate-x:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:right-2:where(:dir(rtl),[dir=rtl],[dir=rtl] *){right:calc(calc(var(--spacing)) * 2)}.tw\\:rtl\\:flex:where(:dir(rtl),[dir=rtl],[dir=rtl] *){display:flex}.tw\\:rtl\\:-translate-x-px:where(:dir(rtl),[dir=rtl],[dir=rtl] *){--tw-translate-x:-1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:translate-x-1\\/2:where(:dir(rtl),[dir=rtl],[dir=rtl] *){--tw-translate-x:calc(1 / 2 * 100%);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:translate-x-px:where(:dir(rtl),[dir=rtl],[dir=rtl] *){--tw-translate-x:1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:after\\:translate-x-1\\/2:where(:dir(rtl),[dir=rtl],[dir=rtl] *):after{content:var(--tw-content);--tw-translate-x:calc(1 / 2 * 100%);translate:var(--tw-translate-x) var(--tw-translate-y)}:where([data-side=primary]) .tw\\:rtl\\:in-data-\\[side\\=primary\\]\\:cursor-e-resize:where(:dir(rtl),[dir=rtl],[dir=rtl] *){cursor:e-resize}:where([data-side=secondary]) .tw\\:rtl\\:in-data-\\[side\\=secondary\\]\\:cursor-w-resize:where(:dir(rtl),[dir=rtl],[dir=rtl] *){cursor:w-resize}.tw\\:rtl\\:aria-\\[orientation\\=horizontal\\]\\:after\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *)[aria-orientation=horizontal]:after{content:var(--tw-content);--tw-translate-x:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:data-\\[side\\=left\\]\\:translate-x-1:where(:dir(rtl),[dir=rtl],[dir=rtl] *)[data-side=left]{--tw-translate-x:calc(calc(var(--spacing)) * 1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:data-\\[side\\=right\\]\\:-translate-x-1:where(:dir(rtl),[dir=rtl],[dir=rtl] *)[data-side=right]{--tw-translate-x:calc(calc(var(--spacing)) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:dark\\:border-input:is(.dark *){border-color:var(--input)}.tw\\:dark\\:bg-destructive\\/20:is(.dark *){background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:bg-destructive\\/20:is(.dark *){background-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:dark\\:bg-input\\/30:is(.dark *){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:bg-input\\/30:is(.dark *){background-color:color-mix(in oklab, var(--input) 30%, transparent)}}.tw\\:dark\\:bg-transparent:is(.dark *){background-color:#0000}.tw\\:dark\\:text-amber-400:is(.dark *){color:var(--tw-color-amber-400)}.tw\\:dark\\:text-muted-foreground:is(.dark *){color:var(--muted-foreground)}.tw\\:dark\\:text-rose-400:is(.dark *){color:var(--tw-color-rose-400)}.tw\\:dark\\:text-sky-400:is(.dark *){color:var(--tw-color-sky-400)}.tw\\:dark\\:text-teal-400:is(.dark *){color:var(--tw-color-teal-400)}.tw\\:dark\\:after\\:mix-blend-lighten:is(.dark *):after{content:var(--tw-content);mix-blend-mode:lighten}@media (hover:hover){.tw\\:dark\\:hover\\:bg-blue-500:is(.dark *):hover{background-color:var(--tw-color-blue-500)}.tw\\:dark\\:hover\\:bg-destructive\\/30:is(.dark *):hover{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:hover\\:bg-destructive\\/30:is(.dark *):hover{background-color:color-mix(in oklab, var(--destructive) 30%, transparent)}}.tw\\:dark\\:hover\\:bg-input\\/50:is(.dark *):hover{background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:hover\\:bg-input\\/50:is(.dark *):hover{background-color:color-mix(in oklab, var(--input) 50%, transparent)}}.tw\\:dark\\:hover\\:bg-muted\\/50:is(.dark *):hover{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:hover\\:bg-muted\\/50:is(.dark *):hover{background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:dark\\:hover\\:text-foreground:is(.dark *):hover{color:var(--foreground)}}.tw\\:dark\\:focus-visible\\:ring-destructive\\/40:is(.dark *):focus-visible{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:focus-visible\\:ring-destructive\\/40:is(.dark *):focus-visible{--tw-ring-color:color-mix(in oklab, var(--destructive) 40%, transparent)}}.tw\\:dark\\:disabled\\:bg-input\\/80:is(.dark *):disabled{background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:disabled\\:bg-input\\/80:is(.dark *):disabled{background-color:color-mix(in oklab, var(--input) 80%, transparent)}}.tw\\:dark\\:disabled\\:bg-transparent:is(.dark *):disabled{background-color:#0000}:where([data-slot=tooltip-content]) .tw\\:dark\\:in-data-\\[slot\\=tooltip-content\\]\\:bg-background\\/10:is(.dark *){background-color:var(--background)}@supports (color:color-mix(in lab, red, red)){:where([data-slot=tooltip-content]) .tw\\:dark\\:in-data-\\[slot\\=tooltip-content\\]\\:bg-background\\/10:is(.dark *){background-color:color-mix(in oklab, var(--background) 10%, transparent)}}.tw\\:dark\\:has-disabled\\:bg-input\\/80:is(.dark *):has(:disabled){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:has-disabled\\:bg-input\\/80:is(.dark *):has(:disabled){background-color:color-mix(in oklab, var(--input) 80%, transparent)}}.tw\\:dark\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-destructive\\/40:is(.dark *):has([data-slot][aria-invalid=true]){--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-destructive\\/40:is(.dark *):has([data-slot][aria-invalid=true]){--tw-ring-color:color-mix(in oklab, var(--destructive) 40%, transparent)}}@media (hover:hover){.tw\\:dark\\:aria-disabled\\:hover\\:bg-transparent\\!:is(.dark *)[aria-disabled=true]:hover{background-color:#0000!important}}.tw\\:dark\\:aria-invalid\\:border-destructive\\/50:is(.dark *)[aria-invalid=true]{border-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:aria-invalid\\:border-destructive\\/50:is(.dark *)[aria-invalid=true]{border-color:color-mix(in oklab, var(--destructive) 50%, transparent)}}.tw\\:dark\\:aria-invalid\\:ring-destructive\\/40:is(.dark *)[aria-invalid=true]{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:aria-invalid\\:ring-destructive\\/40:is(.dark *)[aria-invalid=true]{--tw-ring-color:color-mix(in oklab, var(--destructive) 40%, transparent)}}.tw\\:dark\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-destructive\\/20:is(.dark *)[data-variant=destructive]:focus{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-destructive\\/20:is(.dark *)[data-variant=destructive]:focus{background-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:data-open\\:animate-in:where([data-state=open]),.tw\\:data-open\\:animate-in:where([data-open]:not([data-open=false])){animation:enter var(--tw-animation-duration,var(--tw-duration,.15s))var(--tw-ease,ease)var(--tw-animation-delay,0s)var(--tw-animation-iteration-count,1)var(--tw-animation-direction,normal)var(--tw-animation-fill-mode,none)}.tw\\:data-open\\:bg-accent:where([data-state=open]),.tw\\:data-open\\:bg-accent:where([data-open]:not([data-open=false])){background-color:var(--accent)}.tw\\:data-open\\:text-accent-foreground:where([data-state=open]),.tw\\:data-open\\:text-accent-foreground:where([data-open]:not([data-open=false])){color:var(--accent-foreground)}.tw\\:data-open\\:fade-in-0:where([data-state=open]),.tw\\:data-open\\:fade-in-0:where([data-open]:not([data-open=false])){--tw-enter-opacity:0}.tw\\:data-open\\:zoom-in-95:where([data-state=open]),.tw\\:data-open\\:zoom-in-95:where([data-open]:not([data-open=false])){--tw-enter-scale:.95}@media (hover:hover){:is(.tw\\:data-open\\:hover\\:bg-sidebar-accent:where([data-state=open]),.tw\\:data-open\\:hover\\:bg-sidebar-accent:where([data-open]:not([data-open=false]))):hover{background-color:var(--sidebar-accent)}:is(.tw\\:data-open\\:hover\\:text-sidebar-accent-foreground:where([data-state=open]),.tw\\:data-open\\:hover\\:text-sidebar-accent-foreground:where([data-open]:not([data-open=false]))):hover{color:var(--sidebar-accent-foreground)}}.tw\\:data-closed\\:animate-none\\!:where([data-state=closed]),.tw\\:data-closed\\:animate-none\\!:where([data-closed]:not([data-closed=false])){animation:none!important}.tw\\:data-closed\\:animate-out:where([data-state=closed]),.tw\\:data-closed\\:animate-out:where([data-closed]:not([data-closed=false])){animation:exit var(--tw-animation-duration,var(--tw-duration,.15s))var(--tw-ease,ease)var(--tw-animation-delay,0s)var(--tw-animation-iteration-count,1)var(--tw-animation-direction,normal)var(--tw-animation-fill-mode,none)}.tw\\:data-closed\\:fade-out-0:where([data-state=closed]),.tw\\:data-closed\\:fade-out-0:where([data-closed]:not([data-closed=false])){--tw-exit-opacity:0}.tw\\:data-closed\\:zoom-out-95:where([data-state=closed]),.tw\\:data-closed\\:zoom-out-95:where([data-closed]:not([data-closed=false])){--tw-exit-scale:.95}.tw\\:data-checked\\:border-primary:where([data-state=checked]),.tw\\:data-checked\\:border-primary:where([data-checked]:not([data-checked=false])){border-color:var(--primary)}.tw\\:data-checked\\:bg-primary:where([data-state=checked]),.tw\\:data-checked\\:bg-primary:where([data-checked]:not([data-checked=false])){background-color:var(--primary)}.tw\\:data-checked\\:text-primary-foreground:where([data-state=checked]),.tw\\:data-checked\\:text-primary-foreground:where([data-checked]:not([data-checked=false])){color:var(--primary-foreground)}.tw\\:group-data-\\[size\\=default\\]\\/switch\\:data-checked\\:translate-x-\\[calc\\(100\\%-2px\\)\\]:is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-state=checked]),.tw\\:group-data-\\[size\\=default\\]\\/switch\\:data-checked\\:translate-x-\\[calc\\(100\\%-2px\\)\\]:is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-checked]:not([data-checked=false])),.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:data-checked\\:translate-x-\\[calc\\(100\\%-2px\\)\\]:is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-state=checked]),.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:data-checked\\:translate-x-\\[calc\\(100\\%-2px\\)\\]:is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-checked]:not([data-checked=false])){--tw-translate-x:calc(100% - 2px);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:group-data-\\[size\\=default\\]\\/switch\\:data-checked\\:-translate-x-\\[calc\\(100\\%-2px\\)\\]:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-state=checked]),.tw\\:rtl\\:group-data-\\[size\\=default\\]\\/switch\\:data-checked\\:-translate-x-\\[calc\\(100\\%-2px\\)\\]:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-checked]:not([data-checked=false])),.tw\\:rtl\\:group-data-\\[size\\=sm\\]\\/switch\\:data-checked\\:-translate-x-\\[calc\\(100\\%-2px\\)\\]:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-state=checked]),.tw\\:rtl\\:group-data-\\[size\\=sm\\]\\/switch\\:data-checked\\:-translate-x-\\[calc\\(100\\%-2px\\)\\]:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-checked]:not([data-checked=false])){--tw-translate-x:calc(calc(100% - 2px) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:dark\\:data-checked\\:bg-primary:is(.dark *):where([data-state=checked]),.tw\\:dark\\:data-checked\\:bg-primary:is(.dark *):where([data-checked]:not([data-checked=false])){background-color:var(--primary)}.tw\\:dark\\:data-checked\\:bg-primary-foreground:is(.dark *):where([data-state=checked]),.tw\\:dark\\:data-checked\\:bg-primary-foreground:is(.dark *):where([data-checked]:not([data-checked=false])){background-color:var(--primary-foreground)}.tw\\:data-unchecked\\:bg-input:where([data-state=unchecked]),.tw\\:data-unchecked\\:bg-input:where([data-unchecked]:not([data-unchecked=false])){background-color:var(--input)}.tw\\:group-data-\\[size\\=default\\]\\/switch\\:data-unchecked\\:translate-x-0:is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-state=unchecked]),.tw\\:group-data-\\[size\\=default\\]\\/switch\\:data-unchecked\\:translate-x-0:is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-unchecked]:not([data-unchecked=false])),.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:data-unchecked\\:translate-x-0:is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-state=unchecked]),.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:data-unchecked\\:translate-x-0:is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-unchecked]:not([data-unchecked=false])),.tw\\:rtl\\:group-data-\\[size\\=default\\]\\/switch\\:data-unchecked\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-state=unchecked]),.tw\\:rtl\\:group-data-\\[size\\=default\\]\\/switch\\:data-unchecked\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-unchecked]:not([data-unchecked=false])),.tw\\:rtl\\:group-data-\\[size\\=sm\\]\\/switch\\:data-unchecked\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-state=unchecked]),.tw\\:rtl\\:group-data-\\[size\\=sm\\]\\/switch\\:data-unchecked\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-unchecked]:not([data-unchecked=false])){--tw-translate-x:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:dark\\:data-unchecked\\:bg-foreground:is(.dark *):where([data-state=unchecked]),.tw\\:dark\\:data-unchecked\\:bg-foreground:is(.dark *):where([data-unchecked]:not([data-unchecked=false])){background-color:var(--foreground)}.tw\\:dark\\:data-unchecked\\:bg-input\\/80:is(.dark *):where([data-state=unchecked]),.tw\\:dark\\:data-unchecked\\:bg-input\\/80:is(.dark *):where([data-unchecked]:not([data-unchecked=false])){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:data-unchecked\\:bg-input\\/80:is(.dark *):where([data-state=unchecked]),.tw\\:dark\\:data-unchecked\\:bg-input\\/80:is(.dark *):where([data-unchecked]:not([data-unchecked=false])){background-color:color-mix(in oklab, var(--input) 80%, transparent)}}.tw\\:data-selected\\:bg-muted:where([data-selected=true]),.tw\\:data-selected\\:bg-muted\\/50:where([data-selected=true]){background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:data-selected\\:bg-muted\\/50:where([data-selected=true]){background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:data-selected\\:bg-primary:where([data-selected=true]){background-color:var(--primary)}.tw\\:data-selected\\:bg-transparent:where([data-selected=true]){background-color:#0000}.tw\\:data-selected\\:text-foreground:where([data-selected=true]){color:var(--foreground)}.tw\\:data-selected\\:text-inherit:where([data-selected=true]){color:inherit}.tw\\:data-selected\\:text-muted-foreground\\/50:where([data-selected=true]){color:var(--muted-foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:data-selected\\:text-muted-foreground\\/50:where([data-selected=true]){color:color-mix(in oklab, var(--muted-foreground) 50%, transparent)}}.tw\\:data-selected\\:text-primary-foreground:where([data-selected=true]){color:var(--primary-foreground)}.tw\\:data-selected\\:ring-2:where([data-selected=true]){--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:data-selected\\:ring-primary-foreground\\/70:where([data-selected=true]){--tw-ring-color:var(--primary-foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:data-selected\\:ring-primary-foreground\\/70:where([data-selected=true]){--tw-ring-color:color-mix(in oklab, var(--primary-foreground) 70%, transparent)}}.tw\\:data-selected\\:ring-ring\\/50:where([data-selected=true]){--tw-ring-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.tw\\:data-selected\\:ring-ring\\/50:where([data-selected=true]){--tw-ring-color:color-mix(in oklab, var(--ring) 50%, transparent)}}.tw\\:data-selected\\:ring-inset:where([data-selected=true]){--tw-ring-inset:inset}@media (forced-colors:active){.tw\\:forced-colors\\:data-selected\\:outline-2:where([data-selected=true]){outline-style:var(--tw-outline-style);outline-width:2px}.tw\\:forced-colors\\:data-selected\\:-outline-offset-2:where([data-selected=true]){outline-offset:calc(2px * -1)}.tw\\:forced-colors\\:data-selected\\:outline-\\[color\\:Highlight\\]:where([data-selected=true]){outline-color:highlight}}.tw\\:data-disabled\\:pointer-events-none:where([data-disabled=true]),.tw\\:data-disabled\\:pointer-events-none:where([data-disabled]:not([data-disabled=false])){pointer-events:none}.tw\\:data-disabled\\:cursor-not-allowed:where([data-disabled=true]),.tw\\:data-disabled\\:cursor-not-allowed:where([data-disabled]:not([data-disabled=false])){cursor:not-allowed}.tw\\:data-disabled\\:opacity-50:where([data-disabled=true]),.tw\\:data-disabled\\:opacity-50:where([data-disabled]:not([data-disabled=false])){opacity:.5}.tw\\:data-active\\:bg-background:where([data-state=active]),.tw\\:data-active\\:bg-background:where([data-active]:not([data-active=false])){background-color:var(--background)}.tw\\:data-active\\:bg-sidebar-accent:where([data-state=active]),.tw\\:data-active\\:bg-sidebar-accent:where([data-active]:not([data-active=false])){background-color:var(--sidebar-accent)}.tw\\:data-active\\:font-medium:where([data-state=active]),.tw\\:data-active\\:font-medium:where([data-active]:not([data-active=false])){--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}.tw\\:data-active\\:text-foreground:where([data-state=active]),.tw\\:data-active\\:text-foreground:where([data-active]:not([data-active=false])){color:var(--foreground)}.tw\\:data-active\\:text-sidebar-accent-foreground:where([data-state=active]),.tw\\:data-active\\:text-sidebar-accent-foreground:where([data-active]:not([data-active=false])){color:var(--sidebar-accent-foreground)}.tw\\:group-data-\\[variant\\=default\\]\\/tabs-list\\:data-active\\:shadow-sm:is(:where(.tw\\:group\\/tabs-list)[data-variant=default] *):where([data-state=active]),.tw\\:group-data-\\[variant\\=default\\]\\/tabs-list\\:data-active\\:shadow-sm:is(:where(.tw\\:group\\/tabs-list)[data-variant=default] *):where([data-active]:not([data-active=false])){--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:bg-transparent:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:bg-transparent:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false])){background-color:#0000}.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:shadow-none:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:shadow-none:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false])){--tw-shadow:0 0 #0000;box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}:is(.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:after\\:opacity-100:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:after\\:opacity-100:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false]))):after{content:var(--tw-content);opacity:1}.tw\\:dark\\:data-active\\:border-input:is(.dark *):where([data-state=active]),.tw\\:dark\\:data-active\\:border-input:is(.dark *):where([data-active]:not([data-active=false])){border-color:var(--input)}.tw\\:dark\\:data-active\\:bg-input\\/30:is(.dark *):where([data-state=active]),.tw\\:dark\\:data-active\\:bg-input\\/30:is(.dark *):where([data-active]:not([data-active=false])){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:data-active\\:bg-input\\/30:is(.dark *):where([data-state=active]),.tw\\:dark\\:data-active\\:bg-input\\/30:is(.dark *):where([data-active]:not([data-active=false])){background-color:color-mix(in oklab, var(--input) 30%, transparent)}}.tw\\:dark\\:data-active\\:text-foreground:is(.dark *):where([data-state=active]),.tw\\:dark\\:data-active\\:text-foreground:is(.dark *):where([data-active]:not([data-active=false])){color:var(--foreground)}.tw\\:dark\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:border-transparent:is(.dark *):is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:dark\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:border-transparent:is(.dark *):is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false])){border-color:#0000}.tw\\:dark\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:bg-transparent:is(.dark *):is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:dark\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:bg-transparent:is(.dark *):is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false])){background-color:#0000}.tw\\:data-horizontal\\:mx-px:where([data-orientation=horizontal]){margin-inline:1px}.tw\\:data-horizontal\\:h-1:where([data-orientation=horizontal]){height:calc(calc(var(--spacing)) * 1)}.tw\\:data-horizontal\\:h-full:where([data-orientation=horizontal]){height:100%}.tw\\:data-horizontal\\:h-px:where([data-orientation=horizontal]){height:1px}.tw\\:data-horizontal\\:w-auto:where([data-orientation=horizontal]){width:auto}.tw\\:data-horizontal\\:w-full:where([data-orientation=horizontal]){width:100%}.tw\\:data-horizontal\\:flex-col:where([data-orientation=horizontal]){flex-direction:column}.tw\\:data-vertical\\:my-px:where([data-orientation=vertical]){margin-block:1px}.tw\\:data-vertical\\:h-auto:where([data-orientation=vertical]){height:auto}.tw\\:data-vertical\\:h-full:where([data-orientation=vertical]){height:100%}.tw\\:data-vertical\\:min-h-40:where([data-orientation=vertical]){min-height:calc(calc(var(--spacing)) * 40)}.tw\\:data-vertical\\:w-1:where([data-orientation=vertical]){width:calc(calc(var(--spacing)) * 1)}.tw\\:data-vertical\\:w-auto:where([data-orientation=vertical]){width:auto}.tw\\:data-vertical\\:w-full:where([data-orientation=vertical]){width:100%}.tw\\:data-vertical\\:w-px:where([data-orientation=vertical]){width:1px}.tw\\:data-vertical\\:flex-col:where([data-orientation=vertical]){flex-direction:column}.tw\\:data-vertical\\:items-stretch:where([data-orientation=vertical]){align-items:stretch}.tw\\:data-vertical\\:self-stretch:where([data-orientation=vertical]){align-self:stretch}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:mt-0 [data-lexical-editor=true]>blockquote{margin-top:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:border-s-0 [data-lexical-editor=true]>blockquote{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:ps-0 [data-lexical-editor=true]>blockquote{padding-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:font-normal [data-lexical-editor=true]>blockquote{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:text-foreground [data-lexical-editor=true]>blockquote{color:var(--foreground)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:not-italic [data-lexical-editor=true]>blockquote{font-style:normal}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:mt-0 [data-lexical-editor=\\"true\\"]>blockquote{margin-top:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:border-s-0 [data-lexical-editor=\\"true\\"]>blockquote{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:ps-0 [data-lexical-editor=\\"true\\"]>blockquote{padding-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:font-normal [data-lexical-editor=\\"true\\"]>blockquote{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:text-foreground [data-lexical-editor=\\"true\\"]>blockquote{color:var(--foreground)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:not-italic [data-lexical-editor=\\"true\\"]>blockquote{font-style:normal}.tw\\:\\[\\&_a\\]\\:underline a{text-decoration-line:underline}.tw\\:\\[\\&_a\\]\\:underline-offset-3 a{text-underline-offset:3px}@media (hover:hover){.tw\\:\\[\\&_a\\]\\:hover\\:text-foreground a:hover{color:var(--foreground)}}.tw\\:\\[\\&_p\\]\\:my-0 p{margin-block:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_p\\:not\\(\\:last-child\\)\\]\\:mb-4 p:not(:last-child){margin-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&_s\\]\\:text-destructive s{color:var(--destructive)}.tw\\:\\[\\&_s\\]\\:line-through s{text-decoration-line:line-through}.tw\\:\\[\\&_svg\\]\\:pointer-events-none svg{pointer-events:none}.tw\\:\\[\\&_svg\\]\\:size-4 svg{width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&_svg\\]\\:shrink-0 svg{flex-shrink:0}.tw\\:\\[\\&_svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-3 svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:\\[\\&_svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-3\\.5 svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 3.5);height:calc(calc(var(--spacing)) * 3.5)}.tw\\:\\[\\&_svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-4 svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&_tr\\]\\:border-b tr{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}.tw\\:\\[\\&_tr\\:last-child\\]\\:border-0 tr:last-child{border-style:var(--tw-border-style);border-width:0}.tw\\:\\[\\&_u\\]\\:font-semibold u{--tw-font-weight:var(--tw-font-weight-semibold);font-weight:var(--tw-font-weight-semibold)}.tw\\:\\[\\&_u\\]\\:text-success-foreground u{color:var(--success-foreground)}.tw\\:\\[\\&_u\\]\\:no-underline u{text-decoration-line:none}.tw\\:\\[\\&\\:has\\(\\[role\\=checkbox\\]\\)\\]\\:pe-0:has([role=checkbox]){padding-inline-end:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\.border-b\\]\\:pb-2.border-b{padding-bottom:calc(calc(var(--spacing)) * 2)}.tw\\:\\[\\.border-b\\]\\:pb-4.border-b{padding-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[size\\=sm\\]\\/card\\:\\[\\.border-b\\]\\:pb-3:is(:where(.tw\\:group\\/card)[data-size=sm] *).border-b{padding-bottom:calc(calc(var(--spacing)) * 3)}.tw\\:\\[\\.border-t\\]\\:pt-2.border-t{padding-top:calc(calc(var(--spacing)) * 2)}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:px-2 *)[cmdk-group-heading]{padding-inline:calc(calc(var(--spacing)) * 2)}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:py-1\\.5 *)[cmdk-group-heading]{padding-block:calc(calc(var(--spacing)) * 1.5)}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:text-xs *)[cmdk-group-heading]{font-size:var(--tw-text-xs);line-height:var(--tw-leading,var(--tw-text-xs--line-height))}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:font-medium *)[cmdk-group-heading]{--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:text-muted-foreground *)[cmdk-group-heading]{color:var(--muted-foreground)}:is(.tw\\:\\*\\:\\[a\\]\\:underline>*):is(a){text-decoration-line:underline}:is(.tw\\:\\*\\:\\[a\\]\\:underline-offset-3>*):is(a){text-underline-offset:3px}@media (hover:hover){.tw\\:\\[a\\]\\:hover\\:bg-destructive\\/20:is(a):hover{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:\\[a\\]\\:hover\\:bg-destructive\\/20:is(a):hover{background-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:\\[a\\]\\:hover\\:bg-muted:is(a):hover{background-color:var(--muted)}.tw\\:\\[a\\]\\:hover\\:bg-primary\\/80:is(a):hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:\\[a\\]\\:hover\\:bg-primary\\/80:is(a):hover{background-color:color-mix(in oklab, var(--primary) 80%, transparent)}}.tw\\:\\[a\\]\\:hover\\:bg-secondary\\/80:is(a):hover{background-color:var(--secondary)}@supports (color:color-mix(in lab, red, red)){.tw\\:\\[a\\]\\:hover\\:bg-secondary\\/80:is(a):hover{background-color:color-mix(in oklab, var(--secondary) 80%, transparent)}}.tw\\:\\[a\\]\\:hover\\:text-muted-foreground:is(a):hover{color:var(--muted-foreground)}:is(.tw\\:\\*\\:\\[a\\]\\:hover\\:text-foreground>*):is(a):hover{color:var(--foreground)}}:is(.tw\\:\\*\\:\\[img\\]\\:row-span-2>*):is(img){grid-row:span 2/span 2}:is(.tw\\:\\*\\:\\[img\\]\\:translate-y-0\\.5>*):is(img){--tw-translate-y:calc(calc(var(--spacing)) * .5);translate:var(--tw-translate-x) var(--tw-translate-y)}:is(.tw\\:\\*\\:\\[img\\]\\:text-current>*):is(img){color:currentColor}:is(.tw\\:\\*\\:\\[img\\:first-child\\]\\:rounded-t-xl>*):is(img:first-child){border-top-left-radius:calc(var(--radius) * 1.4);border-top-right-radius:calc(var(--radius) * 1.4)}:is(.tw\\:\\*\\:\\[img\\:last-child\\]\\:rounded-b-xl>*):is(img:last-child){border-bottom-right-radius:calc(var(--radius) * 1.4);border-bottom-left-radius:calc(var(--radius) * 1.4)}:is(.tw\\:\\*\\:\\[img\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-4>*):is(img:not([class*=size-])){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}:is(.tw\\:\\*\\:\\[span\\]\\:last\\:flex>*):is(span):last-child{display:flex}:is(.tw\\:\\*\\:\\[span\\]\\:last\\:items-center>*):is(span):last-child{align-items:center}:is(.tw\\:\\*\\:\\[span\\]\\:last\\:gap-2>*):is(span):last-child{gap:calc(calc(var(--spacing)) * 2)}:is(.tw\\:\\*\\:\\[svg\\]\\:row-span-2>*):is(svg){grid-row:span 2/span 2}:is(.tw\\:\\*\\:\\[svg\\]\\:translate-y-0\\.5>*):is(svg){--tw-translate-y:calc(calc(var(--spacing)) * .5);translate:var(--tw-translate-x) var(--tw-translate-y)}:is(.tw\\:\\*\\:\\[svg\\]\\:text-current>*):is(svg){color:currentColor}:is(.tw\\:focus\\:\\*\\:\\[svg\\]\\:text-accent-foreground:focus>*):is(svg){color:var(--accent-foreground)}:is(.tw\\:data-\\[variant\\=destructive\\]\\:\\*\\:\\[svg\\]\\:text-destructive[data-variant=destructive]>*):is(svg){color:var(--destructive)}:is(.tw\\:data-\\[variant\\=destructive\\]\\:\\*\\:\\[svg\\]\\:text-destructive\\![data-variant=destructive]>*):is(svg){color:var(--destructive)!important}:is(.tw\\:data-selected\\:\\*\\:\\[svg\\]\\:text-foreground:where([data-selected=true])>*):is(svg){color:var(--foreground)}:is(.tw\\:\\*\\:\\[svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-4>*):is(svg:not([class*=size-])){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:rounded-s-none>:not(:first-child){border-start-start-radius:0;border-end-start-radius:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:rounded-t-none>:not(:first-child){border-top-left-radius:0;border-top-right-radius:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:border-s-0>:not(:first-child){border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:border-t-0>:not(:first-child){border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:last-child\\)\\]\\:rounded-e-none>:not(:last-child){border-start-end-radius:0;border-end-end-radius:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:last-child\\)\\]\\:rounded-b-none>:not(:last-child){border-bottom-right-radius:0;border-bottom-left-radius:0}.tw\\:\\[\\&\\>\\[data-slot\\=dropdown-menu-checkbox-item-indicator\\]\\]\\:hidden>[data-slot=dropdown-menu-checkbox-item-indicator],.tw\\:\\[\\&\\>\\[data-slot\\=menubar-checkbox-item-indicator\\]\\]\\:hidden>[data-slot=menubar-checkbox-item-indicator]{display:none}.tw\\:has-\\[select\\[aria-hidden\\=true\\]\\:last-child\\]\\:\\[\\&\\>\\[data-slot\\=select-trigger\\]\\:last-of-type\\]\\:rounded-e-lg:has(:is(select[aria-hidden=true]:last-child))>[data-slot=select-trigger]:last-of-type{border-start-end-radius:var(--radius);border-end-end-radius:var(--radius)}.tw\\:\\[\\&\\>\\[data-slot\\=select-trigger\\]\\:not\\(\\[class\\*\\=w-\\]\\)\\]\\:w-fit>[data-slot=select-trigger]:not([class*=w-]){width:fit-content}.tw\\:\\[\\&\\>\\[data-slot\\]\\:not\\(\\:has\\(\\~\\[data-slot\\]\\)\\)\\]\\:rounded-e-lg\\!>[data-slot]:not(:has(~[data-slot])){border-start-end-radius:var(--radius)!important;border-end-end-radius:var(--radius)!important}.tw\\:\\[\\&\\>\\[data-slot\\]\\:not\\(\\:has\\(\\~\\[data-slot\\]\\)\\)\\]\\:rounded-b-lg\\!>[data-slot]:not(:has(~[data-slot])){border-bottom-right-radius:var(--radius)!important;border-bottom-left-radius:var(--radius)!important}.tw\\:\\[\\&\\>a\\]\\:underline>a{text-decoration-line:underline}.tw\\:\\[\\&\\>a\\]\\:underline-offset-4>a{text-underline-offset:4px}.tw\\:\\[\\&\\>a\\:hover\\]\\:text-primary>a:hover{color:var(--primary)}.tw\\:\\[\\&\\>blockquote\\]\\:my-0>blockquote{margin-block:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&\\>blockquote\\]\\:border-s-0>blockquote{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&\\>blockquote\\]\\:p-0>blockquote{padding:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&\\>blockquote\\]\\:ps-0>blockquote{padding-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&\\>blockquote\\]\\:font-normal>blockquote{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:\\[\\&\\>blockquote\\]\\:text-foreground>blockquote{color:var(--foreground)}.tw\\:\\[\\&\\>blockquote\\]\\:not-italic>blockquote{font-style:normal}.tw\\:\\[\\&\\>input\\]\\:flex-1>input{flex:1}.tw\\:has-\\[\\>\\[data-align\\=block-end\\]\\]\\:\\[\\&\\>input\\]\\:pt-3:has(>[data-align=block-end])>input{padding-top:calc(calc(var(--spacing)) * 3)}.tw\\:has-\\[\\>\\[data-align\\=block-start\\]\\]\\:\\[\\&\\>input\\]\\:pb-3:has(>[data-align=block-start])>input{padding-bottom:calc(calc(var(--spacing)) * 3)}.tw\\:has-\\[\\>\\[data-align\\=inline-end\\]\\]\\:\\[\\&\\>input\\]\\:pe-1\\.5:has(>[data-align=inline-end])>input{padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-\\[\\>\\[data-align\\=inline-start\\]\\]\\:\\[\\&\\>input\\]\\:ps-1\\.5:has(>[data-align=inline-start])>input{padding-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:\\[\\&\\>kbd\\]\\:rounded-\\[calc\\(var\\(--radius\\)-5px\\)\\]>kbd{border-radius:calc(var(--radius) - 5px)}.tw\\:\\[\\&\\>li\\]\\:mt-2>li{margin-top:calc(calc(var(--spacing)) * 2)}.tw\\:\\[\\&\\>span\\:last-child\\]\\:truncate>span:last-child{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.tw\\:\\[\\&\\>svg\\]\\:pointer-events-none>svg{pointer-events:none}.tw\\:\\[\\&\\>svg\\]\\:size-3\\!>svg{width:calc(calc(var(--spacing)) * 3)!important;height:calc(calc(var(--spacing)) * 3)!important}.tw\\:\\[\\&\\>svg\\]\\:size-3\\.5>svg{width:calc(calc(var(--spacing)) * 3.5);height:calc(calc(var(--spacing)) * 3.5)}.tw\\:\\[\\&\\>svg\\]\\:size-4>svg{width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&\\>svg\\]\\:shrink-0>svg{flex-shrink:0}.tw\\:\\[\\&\\>svg\\]\\:text-sidebar-accent-foreground>svg{color:var(--sidebar-accent-foreground)}.tw\\:group-has-data-\\[size\\=lg\\]\\/avatar-group\\:\\[\\&\\>svg\\]\\:size-5:is(:where(.tw\\:group\\/avatar-group):has([data-size=lg]) *)>svg{width:calc(calc(var(--spacing)) * 5);height:calc(calc(var(--spacing)) * 5)}.tw\\:group-has-data-\\[size\\=sm\\]\\/avatar-group\\:\\[\\&\\>svg\\]\\:size-3:is(:where(.tw\\:group\\/avatar-group):has([data-size=sm]) *)>svg{width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[size\\=default\\]\\/avatar\\:\\[\\&\\>svg\\]\\:size-2:is(:where(.tw\\:group\\/avatar)[data-size=default] *)>svg,.tw\\:group-data-\\[size\\=lg\\]\\/avatar\\:\\[\\&\\>svg\\]\\:size-2:is(:where(.tw\\:group\\/avatar)[data-size=lg] *)>svg{width:calc(calc(var(--spacing)) * 2);height:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[size\\=sm\\]\\/avatar\\:\\[\\&\\>svg\\]\\:hidden:is(:where(.tw\\:group\\/avatar)[data-size=sm] *)>svg{display:none}.tw\\:\\[\\&\\>svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-3\\.5>svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 3.5);height:calc(calc(var(--spacing)) * 3.5)}.tw\\:\\[\\&\\>svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-4>svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&\\>tr\\]\\:last\\:border-b-0>tr:last-child{border-bottom-style:var(--tw-border-style);border-bottom-width:0}.tw\\:\\[\\&\\[align\\=center\\]\\]\\:text-center[align=center]{text-align:center}.tw\\:\\[\\&\\[align\\=right\\]\\]\\:text-right[align=right]{text-align:right}.tw\\:\\[\\&\\[aria-orientation\\=horizontal\\]\\>div\\]\\:rotate-90[aria-orientation=horizontal]>div{rotate:90deg}[data-side=primary][data-collapsible=offcanvas] .tw\\:\\[\\[data-side\\=primary\\]\\[data-collapsible\\=offcanvas\\]_\\&\\]\\:-end-2{inset-inline-end:calc(calc(var(--spacing)) * -2)}[data-side=primary][data-state=collapsed] .tw\\:\\[\\[data-side\\=primary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-e-resize{cursor:e-resize}[data-side=primary][data-state=collapsed] .tw\\:rtl\\:\\[\\[data-side\\=primary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-w-resize:where(:dir(rtl),[dir=rtl],[dir=rtl] *){cursor:w-resize}[data-side=secondary][data-collapsible=offcanvas] .tw\\:\\[\\[data-side\\=secondary\\]\\[data-collapsible\\=offcanvas\\]_\\&\\]\\:-start-2{inset-inline-start:calc(calc(var(--spacing)) * -2)}[data-side=secondary][data-state=collapsed] .tw\\:\\[\\[data-side\\=secondary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-w-resize{cursor:w-resize}[data-side=secondary][data-state=collapsed] .tw\\:rtl\\:\\[\\[data-side\\=secondary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-e-resize:where(:dir(rtl),[dir=rtl],[dir=rtl] *){cursor:e-resize}}@property --tw-animation-delay{syntax:"*";inherits:false;initial-value:0s}@property --tw-animation-direction{syntax:"*";inherits:false;initial-value:normal}@property --tw-animation-duration{syntax:"*";inherits:false}@property --tw-animation-fill-mode{syntax:"*";inherits:false;initial-value:none}@property --tw-animation-iteration-count{syntax:"*";inherits:false;initial-value:1}@property --tw-enter-blur{syntax:"*";inherits:false;initial-value:0}@property --tw-enter-opacity{syntax:"*";inherits:false;initial-value:1}@property --tw-enter-rotate{syntax:"*";inherits:false;initial-value:0}@property --tw-enter-scale{syntax:"*";inherits:false;initial-value:1}@property --tw-enter-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-enter-translate-y{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-blur{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-opacity{syntax:"*";inherits:false;initial-value:1}@property --tw-exit-rotate{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-scale{syntax:"*";inherits:false;initial-value:1}@property --tw-exit-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-translate-y{syntax:"*";inherits:false;initial-value:0}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-cyrillic-ext-wght-normal.woff2)format("woff2-variations");unicode-range:U+460-52F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-cyrillic-wght-normal.woff2)format("woff2-variations");unicode-range:U+301,U+400-45F,U+490-491,U+4B0-4B1,U+2116}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-greek-wght-normal.woff2)format("woff2-variations");unicode-range:U+370-377,U+37A-37F,U+384-38A,U+38C,U+38E-3A1,U+3A3-3FF}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-vietnamese-wght-normal.woff2)format("woff2-variations");unicode-range:U+102-103,U+110-111,U+128-129,U+168-169,U+1A0-1A1,U+1AF-1B0,U+300-301,U+303-304,U+308-309,U+323,U+329,U+1EA0-1EF9,U+20AB}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-latin-ext-wght-normal.woff2)format("woff2-variations");unicode-range:U+100-2BA,U+2BD-2C5,U+2C7-2CC,U+2CE-2D7,U+2DD-2FF,U+304,U+308,U+329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-latin-wght-normal.woff2)format("woff2-variations");unicode-range:U+??,U+131,U+152-153,U+2BB-2BC,U+2C6,U+2DA,U+2DC,U+304,U+308,U+329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}.light,:root{--radius:.625rem;--spacing:.25rem;--background:oklch(100% 0 0);--foreground:oklch(13.71% .036 258.53);--card:oklch(100% 0 0);--card-foreground:oklch(13.71% .036 258.53);--popover:oklch(98.43% .0018 248.56);--popover-foreground:oklch(13.71% .036 258.53);--primary:oklch(20.79% .0399 265.73);--primary-foreground:oklch(98.38% .0036 248.23);--secondary:oklch(95.89% .011 248.06);--secondary-foreground:oklch(20.79% .0399 265.73);--muted:oklch(95.89% .011 248.06);--muted-foreground:oklch(55.47% .0408 257.45);--accent:oklch(95.89% .011 248.06);--accent-foreground:oklch(20.79% .0399 265.73);--destructive:oklch(63.69% .2077 25.32);--destructive-foreground:oklch(98.38% .0036 248.23);--success-foreground:oklch(62.7% .194 149.214);--diff-deleted:oklch(57.7% .245 27.325);--warning:oklch(84% .16 84);--warning-foreground:oklch(28% .07 46);--border:oklch(92.9% .0127 255.58);--input:oklch(92.9% .0127 255.58);--ring:oklch(13.71% .036 258.53);--chart-1:oklch(64.6% .222 41.116);--chart-2:oklch(60% .118 184.704);--chart-3:oklch(39.8% .07 227.392);--chart-4:oklch(82.8% .189 84.429);--chart-5:oklch(76.9% .188 70.08);--sidebar:oklch(98.43% .0018 248.56);--sidebar-foreground:oklch(13.71% .036 258.53);--sidebar-primary:oklch(20.79% .0399 265.73);--sidebar-primary-foreground:oklch(98.38% .0036 248.23);--sidebar-accent:oklch(95.89% .011 248.06);--sidebar-accent-foreground:oklch(20.79% .0399 265.73);--sidebar-border:oklch(92.9% .0127 255.58);--sidebar-ring:oklch(13.71% .036 258.53)}.dark{--background:oklch(13.71% .036 258.53);--foreground:oklch(98.38% .0036 248.23);--card:oklch(13.71% .036 258.53);--card-foreground:oklch(98.38% .0036 248.23);--popover:oklch(13.71% .036 258.53);--popover-foreground:oklch(98.38% .0036 248.23);--primary:oklch(98.38% .0036 248.23);--primary-foreground:oklch(20.79% .0399 265.73);--secondary:oklch(28% .037 259.98);--secondary-foreground:oklch(98.38% .0036 248.23);--muted:oklch(28% .037 259.98);--muted-foreground:oklch(71.07% .0351 256.8);--accent:oklch(28% .037 259.98);--accent-foreground:oklch(98.38% .0036 248.23);--destructive:oklch(39.6% .1331 25.71);--destructive-foreground:oklch(98.38% .0036 248.23);--success-foreground:oklch(79.2% .209 151.711);--diff-deleted:oklch(70.4% .191 22.216);--warning:oklch(41% .11 46);--warning-foreground:oklch(99% .02 95);--border:oklch(44.54% .0374 257.3);--input:oklch(44.54% .0374 257.3);--ring:oklch(86.88% .0199 252.89);--chart-1:oklch(48.8% .243 264.376);--chart-2:oklch(69.6% .17 162.48);--chart-3:oklch(76.9% .188 70.08);--chart-4:oklch(62.7% .265 303.9);--chart-5:oklch(64.5% .246 16.439);--sidebar:oklch(13.71% .036 258.53);--sidebar-foreground:oklch(71.07% .0351 256.8);--sidebar-primary:oklch(98.38% .0036 248.23);--sidebar-primary-foreground:oklch(20.79% .0399 265.73);--sidebar-accent:oklch(28% .037 259.98);--sidebar-accent-foreground:oklch(71.07% .0351 256.8);--sidebar-border:oklch(28% .037 259.98);--sidebar-ring:oklch(86.88% .0199 252.89)}.paratext-light{--background:oklch(100% 0 0);--foreground:oklch(15.3% .006 107.1);--card:oklch(100% 0 0);--card-foreground:oklch(15.3% .006 107.1);--popover:oklch(100% 0 0);--popover-foreground:oklch(15.3% .006 107.1);--primary:oklch(55.5% .163 48.998);--primary-foreground:oklch(98.7% .022 95.277);--secondary:oklch(96.7% .001 286.375);--secondary-foreground:oklch(21% .006 285.885);--muted:oklch(96.6% .005 106.5);--muted-foreground:oklch(58% .031 107.3);--accent:oklch(96.6% .005 106.5);--accent-foreground:oklch(22.8% .013 107.4);--destructive:oklch(57.7% .245 27.325);--destructive-foreground:oklch(98.38% .0036 248.23);--success-foreground:oklch(62.7% .194 149.214);--diff-deleted:oklch(57.7% .245 27.325);--warning:oklch(84% .16 84);--warning-foreground:oklch(28% .07 46);--border:oklch(93% .007 106.5);--input:oklch(93% .007 106.5);--ring:oklch(73.7% .021 106.9);--chart-1:oklch(88% .011 106.6);--chart-2:oklch(58% .031 107.3);--chart-3:oklch(46.6% .025 107.3);--chart-4:oklch(39.4% .023 107.4);--chart-5:oklch(28.6% .016 107.4);--sidebar:oklch(98.8% .003 106.5);--sidebar-foreground:oklch(15.3% .006 107.1);--sidebar-primary:oklch(66.6% .179 58.318);--sidebar-primary-foreground:oklch(98.7% .022 95.277);--sidebar-accent:oklch(96.6% .005 106.5);--sidebar-accent-foreground:oklch(22.8% .013 107.4);--sidebar-border:oklch(93% .007 106.5);--sidebar-ring:oklch(73.7% .021 106.9)}.paratext-dark{--background:oklch(15.3% .006 107.1);--foreground:oklch(98.8% .003 106.5);--card:oklch(22.8% .013 107.4);--card-foreground:oklch(98.8% .003 106.5);--popover:oklch(22.8% .013 107.4);--popover-foreground:oklch(98.8% .003 106.5);--primary:oklch(47.3% .137 46.201);--primary-foreground:oklch(98.7% .022 95.277);--secondary:oklch(27.4% .006 286.033);--secondary-foreground:oklch(98.5% 0 0);--muted:oklch(28.6% .016 107.4);--muted-foreground:oklch(73.7% .021 106.9);--accent:oklch(28.6% .016 107.4);--accent-foreground:oklch(98.8% .003 106.5);--destructive:oklch(70.4% .191 22.216);--destructive-foreground:oklch(98.38% .0036 248.23);--success-foreground:oklch(79.2% .209 151.711);--diff-deleted:oklch(70.4% .191 22.216);--warning:oklch(41% .11 46);--warning-foreground:oklch(99% .02 95);--border:oklch(100% 0 0/.1);--input:oklch(100% 0 0/.15);--ring:oklch(58% .031 107.3);--chart-1:oklch(88% .011 106.6);--chart-2:oklch(58% .031 107.3);--chart-3:oklch(46.6% .025 107.3);--chart-4:oklch(39.4% .023 107.4);--chart-5:oklch(28.6% .016 107.4);--sidebar:oklch(22.8% .013 107.4);--sidebar-foreground:oklch(98.8% .003 106.5);--sidebar-primary:oklch(76.9% .188 70.08);--sidebar-primary-foreground:oklch(27.9% .077 45.635);--sidebar-accent:oklch(28.6% .016 107.4);--sidebar-accent-foreground:oklch(98.8% .003 106.5);--sidebar-border:oklch(100% 0 0/.1);--sidebar-ring:oklch(58% .031 107.3)}@property --tw-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-y{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-z{syntax:"*";inherits:false;initial-value:0}@property --tw-rotate-x{syntax:"*";inherits:false}@property --tw-rotate-y{syntax:"*";inherits:false}@property --tw-rotate-z{syntax:"*";inherits:false}@property --tw-skew-x{syntax:"*";inherits:false}@property --tw-skew-y{syntax:"*";inherits:false}@property --tw-space-y-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-space-x-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-divide-x-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-border-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-divide-y-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-gradient-position{syntax:"*";inherits:false}@property --tw-gradient-from{syntax:"<color>";inherits:false;initial-value:#0000}@property --tw-gradient-via{syntax:"<color>";inherits:false;initial-value:#0000}@property --tw-gradient-to{syntax:"<color>";inherits:false;initial-value:#0000}@property --tw-gradient-stops{syntax:"*";inherits:false}@property --tw-gradient-via-stops{syntax:"*";inherits:false}@property --tw-gradient-from-position{syntax:"<length-percentage>";inherits:false;initial-value:0%}@property --tw-gradient-via-position{syntax:"<length-percentage>";inherits:false;initial-value:50%}@property --tw-gradient-to-position{syntax:"<length-percentage>";inherits:false;initial-value:100%}@property --tw-leading{syntax:"*";inherits:false}@property --tw-font-weight{syntax:"*";inherits:false}@property --tw-tracking{syntax:"*";inherits:false}@property --tw-ordinal{syntax:"*";inherits:false}@property --tw-slashed-zero{syntax:"*";inherits:false}@property --tw-numeric-figure{syntax:"*";inherits:false}@property --tw-numeric-spacing{syntax:"*";inherits:false}@property --tw-numeric-fraction{syntax:"*";inherits:false}@property --tw-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-shadow-color{syntax:"*";inherits:false}@property --tw-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-inset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-shadow-color{syntax:"*";inherits:false}@property --tw-inset-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-ring-color{syntax:"*";inherits:false}@property --tw-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-ring-color{syntax:"*";inherits:false}@property --tw-inset-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-ring-inset{syntax:"*";inherits:false}@property --tw-ring-offset-width{syntax:"<length>";inherits:false;initial-value:0}@property --tw-ring-offset-color{syntax:"*";inherits:false;initial-value:#fff}@property --tw-ring-offset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-blur{syntax:"*";inherits:false}@property --tw-brightness{syntax:"*";inherits:false}@property --tw-contrast{syntax:"*";inherits:false}@property --tw-grayscale{syntax:"*";inherits:false}@property --tw-hue-rotate{syntax:"*";inherits:false}@property --tw-invert{syntax:"*";inherits:false}@property --tw-opacity{syntax:"*";inherits:false}@property --tw-saturate{syntax:"*";inherits:false}@property --tw-sepia{syntax:"*";inherits:false}@property --tw-drop-shadow{syntax:"*";inherits:false}@property --tw-drop-shadow-color{syntax:"*";inherits:false}@property --tw-drop-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-drop-shadow-size{syntax:"*";inherits:false}@property --tw-duration{syntax:"*";inherits:false}@property --tw-ease{syntax:"*";inherits:false}@property --tw-content{syntax:"*";inherits:false;initial-value:""}@property --tw-outline-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-backdrop-blur{syntax:"*";inherits:false}@property --tw-backdrop-brightness{syntax:"*";inherits:false}@property --tw-backdrop-contrast{syntax:"*";inherits:false}@property --tw-backdrop-grayscale{syntax:"*";inherits:false}@property --tw-backdrop-hue-rotate{syntax:"*";inherits:false}@property --tw-backdrop-invert{syntax:"*";inherits:false}@property --tw-backdrop-opacity{syntax:"*";inherits:false}@property --tw-backdrop-saturate{syntax:"*";inherits:false}@property --tw-backdrop-sepia{syntax:"*";inherits:false}@keyframes spin{to{transform:rotate(360deg)}}@keyframes pulse{50%{opacity:.5}}@keyframes enter{0%{opacity:var(--tw-enter-opacity,1);transform:translate3d(var(--tw-enter-translate-x,0),var(--tw-enter-translate-y,0),0)scale3d(var(--tw-enter-scale,1),var(--tw-enter-scale,1),var(--tw-enter-scale,1))rotate(var(--tw-enter-rotate,0));filter:blur(var(--tw-enter-blur,0))}}@keyframes exit{to{opacity:var(--tw-exit-opacity,1);transform:translate3d(var(--tw-exit-translate-x,0),var(--tw-exit-translate-y,0),0)scale3d(var(--tw-exit-scale,1),var(--tw-exit-scale,1),var(--tw-exit-scale,1))rotate(var(--tw-exit-rotate,0));filter:blur(var(--tw-exit-blur,0))}}
`, "after-all");
export {
  _f as Alert,
  Nf as AlertDescription,
  Cf as AlertTitle,
  Qw as Avatar,
  tu as AvatarFallback,
  Ih as AvatarImage,
  bh as BOOK_CHAPTER_CONTROL_STRING_KEYS,
  xh as BOOK_SELECTOR_STRING_KEYS,
  qr as Badge,
  Ya as BookChapterControl,
  vo as BookSelectionMode,
  yh as BookSelector,
  J as Button,
  Is as ButtonGroup,
  Ms as ButtonGroupSeparator,
  Ef as ButtonGroupText,
  Hn as CANCEL_ACCEPT_BUTTONS_STRING_KEYS,
  Eh as COMMENT_EDITOR_STRING_KEYS,
  Xw as COMMENT_LIST_ELEMENT_ID,
  Th as COMMENT_LIST_STRING_KEYS,
  Nh as CONFLICT_NOTE_STRING_KEYS,
  Yi as CONTENT_ZOOM_LABEL_ATTRIBUTE,
  Wi as CONTENT_ZOOM_ROOT_ATTRIBUTE,
  kh as CONTENT_ZOOM_SCOPE_ATTRIBUTE,
  As as CancelAcceptButtons,
  Zw as Card,
  Jw as CardContent,
  zh as CardDescription,
  Dh as CardFooter,
  Rh as CardHeader,
  Oh as CardTitle,
  zd as ChapterRangeSelector,
  cs as Checkbox,
  Rg as CheckboxGroup,
  Pp as Checklist,
  vn as ComboBox,
  Sr as Command,
  Co as CommandEmpty,
  er as CommandGroup,
  No as CommandInput,
  or as CommandItem,
  Rr as CommandList,
  Ch as CommentEditor,
  Mh as CommentList,
  ou as ConflictNoteCard,
  du as ContentZoomRoot,
  _h as ContentZoomTextProvider,
  Mg as ContextMenu,
  Kg as ContextMenuCheckboxItem,
  Bg as ContextMenuContent,
  Ag as ContextMenuGroup,
  jg as ContextMenuItem,
  Gg as ContextMenuLabel,
  $g as ContextMenuPortal,
  Lg as ContextMenuRadioGroup,
  Hg as ContextMenuRadioItem,
  qg as ContextMenuSeparator,
  Wg as ContextMenuShortcut,
  Vg as ContextMenuSub,
  Ug as ContextMenuSubContent,
  Fg as ContextMenuSubTrigger,
  Pg as ContextMenuTrigger,
  fu as DataTable,
  Og as DestructiveKeyConfirmation,
  so as Dialog,
  Tf as DialogClose,
  co as DialogContent,
  Sf as DialogDescription,
  tn as DialogFooter,
  lo as DialogHeader,
  Rf as DialogOverlay,
  Of as DialogPortal,
  wo as DialogTitle,
  zf as DialogTrigger,
  sp as DisabledActionTooltip,
  Zr as DisabledTooltipWrapper,
  Yg as Drawer,
  Zg as DrawerClose,
  Jg as DrawerContent,
  rf as DrawerDescription,
  tf as DrawerFooter,
  Qg as DrawerHeader,
  Vp as DrawerOverlay,
  $p as DrawerPortal,
  ef as DrawerTitle,
  Xg as DrawerTrigger,
  nr as DropdownMenu,
  To as DropdownMenuCheckboxItem,
  ir as DropdownMenuContent,
  Gn as DropdownMenuGroup,
  Be as DropdownMenuItem,
  bu as DropdownMenuItemType,
  Jr as DropdownMenuLabel,
  tc as DropdownMenuPortal,
  Ls as DropdownMenuRadioGroup,
  Bs as DropdownMenuRadioItem,
  br as DropdownMenuSeparator,
  Zs as DropdownMenuShortcut,
  Qs as DropdownMenuSub,
  ec as DropdownMenuSubContent,
  Js as DropdownMenuSubTrigger,
  Ue as DropdownMenuTrigger,
  mu as ERROR_DUMP_STRING_KEYS,
  Vh as ERROR_POPOVER_STRING_KEYS,
  Df as EditorKeyboardShortcuts,
  If as Empty,
  Mf as EmptyContent,
  Pf as EmptyDescription,
  Af as EmptyHeader,
  $f as EmptyMedia,
  Vf as EmptyState,
  Lf as EmptyTitle,
  vu as ErrorDump,
  Lh as ErrorPopover,
  Kh as FOOTNOTE_EDITOR_STRING_KEYS,
  Uh as Filter,
  Bh as FilterDropdown,
  Fh as Footer,
  Bf as FootnoteEditor,
  Tu as FootnoteItem,
  Hh as FootnoteList,
  jf as INLINE_APPLY_DEBOUNCE_MS,
  Tg as INTERFACE_LANGUAGE_PICKER_STRING_KEYS,
  Jh as INVENTORY_STRING_KEYS,
  zo as Input,
  Sg as InterfaceLanguagePicker,
  Qh as Inventory,
  ic as Kbd,
  Ff as KbdGroup,
  gt as Label,
  Fs as MARKER_MENU_STRING_KEYS,
  $h as MarkdownRenderer,
  Uf as MarkerMenu,
  jh as MoreInfo,
  js as MultiSelectComboBox,
  _g as NavigationContentSearch,
  Cr as Popover,
  Kf as PopoverAnchor,
  Tr as PopoverContent,
  Hf as PopoverDescription,
  Gf as PopoverHeader,
  Ka as PopoverPortalContainerProvider,
  qf as PopoverTitle,
  Er as PopoverTrigger,
  af as Progress,
  Eo as RadioGroup,
  _a as RadioGroupItem,
  bd as RecentSearches,
  Wf as ResizableHandle,
  Yf as ResizablePanel,
  Xf as ResizablePanelGroup,
  zg as ResultsCard,
  Zf as RetryableErrorView,
  gg as SCOPE_SELECTOR_STRING_KEYS,
  dp as SELECT_BOOKS_STRING_KEYS,
  Hr as SHRINK_STEP,
  fg as ScopeSelector,
  hg as ScriptureResultsViewer,
  mg as ScrollGroupSelector,
  Wn as SearchBar,
  yr as Select,
  lp as SelectBooks,
  ip as SelectBooksPicker,
  Nr as SelectContent,
  uu as SelectGroup,
  ce as SelectItem,
  Ph as SelectLabel,
  hu as SelectScrollDownButton,
  pu as SelectScrollUpButton,
  Ah as SelectSeparator,
  _r as SelectTrigger,
  kr as SelectValue,
  Wr as Separator,
  vg as SettingsList,
  xg as SettingsListHeader,
  bg as SettingsListItem,
  Ju as SettingsSidebar,
  pg as SettingsSidebarContentSearch,
  Pa as ShrinkStepContext,
  bf as ShrinkStepOverride,
  _i as ShrinkStepOverrideContext,
  Hu as Sidebar,
  qu as SidebarContent,
  og as SidebarFooter,
  An as SidebarGroup,
  ig as SidebarGroupAction,
  Vn as SidebarGroupContent,
  $n as SidebarGroupLabel,
  ag as SidebarHeader,
  rg as SidebarInput,
  Gu as SidebarInset,
  Wu as SidebarMenu,
  sg as SidebarMenuAction,
  cg as SidebarMenuBadge,
  Zu as SidebarMenuButton,
  Yu as SidebarMenuItem,
  lg as SidebarMenuSkeleton,
  dg as SidebarMenuSub,
  ug as SidebarMenuSubButton,
  wg as SidebarMenuSubItem,
  Ku as SidebarProvider,
  eg as SidebarRail,
  ng as SidebarSeparator,
  tg as SidebarTrigger,
  gr as Skeleton,
  nf as Slider,
  of as Sonner,
  Jf as Spinner,
  sf as Switch,
  xf as TOOLTIP_DELAY_MS,
  ko as TabDropdownMenu,
  kg as TabFloatingMenu,
  yg as TabToolbar,
  So as Table,
  Oo as TableBody,
  Qf as TableCaption,
  fr as TableCell,
  tm as TableFooter,
  Na as TableHead,
  Ro as TableHeader,
  je as TableRow,
  cf as Tabs,
  wf as TabsContent,
  lf as TabsList,
  df as TabsTrigger,
  Dg as TextField,
  mh as Textarea,
  qi as ToggleGroup,
  ma as ToggleGroupItem,
  Cg as Toolbar,
  gd as ToolbarCompoundLabel,
  kt as Tooltip,
  Nt as TooltipContent,
  em as TooltipPortalContainerProvider,
  Jt as TooltipProvider,
  _t as TooltipTrigger,
  Us as UNDO_REDO_BUTTONS_STRING_KEYS,
  Eg as UiLanguageSelector,
  rm as UndoRedoButtons,
  bs as VerticalTabs,
  ys as VerticalTabsContent,
  xs as VerticalTabsList,
  fp as VerticalTabsTrigger,
  Ig as WizardStepper,
  Ie as Z_INDEX_ABOVE_DOCK,
  am as Z_INDEX_ABOVE_POPOVER,
  om as Z_INDEX_CONNECTION_LOST,
  nm as Z_INDEX_FIRST_RUN,
  im as Z_INDEX_MODAL,
  sm as Z_INDEX_MODAL_BACKDROP,
  cm as Z_INDEX_NESTED_MODAL,
  lm as Z_INDEX_NESTED_MODAL_BACKDROP,
  dm as Z_INDEX_ONBOARDING_TOUR,
  wm as Z_INDEX_OVERLAY,
  um as badgeVariants,
  pm as buttonGroupVariants,
  hm as buttonVariants,
  b as cn,
  Zh as getBookIdFromUSFM,
  _u as getCaretPositionFromClick,
  Sh as getCommentThreadElementId,
  $a as getInventoryHeader,
  Yh as getLinesFromUSFM,
  Xh as getNumberFromUSFM,
  Au as getStatusForItem,
  Ng as getToolbarOSReservedSpaceClassName,
  qh as inventoryCountColumn,
  Gh as inventoryItemColumn,
  Wh as inventoryStatusColumn,
  On as isCommentDraftEmpty,
  ds as isGroupUnderColumnOrSubMenu,
  Ps as isMacOs,
  gm as isRunningInWebView,
  fm as isUnclosedNoteOp,
  mm as isWindows,
  vm as leftEdgeRect,
  Zt as localizeOrFallback,
  bm as measureBox,
  qp as pickTabIconUrl,
  xm as shouldSuppressFocusReturn,
  Nm as sonner,
  Ir as useContentZoomTextProps,
  Jn as useDismissOnWindowBlur,
  Bp as useEvent,
  uf as useEventAsync,
  hf as useEventSeededState,
  ff as useExtraValidMarkers,
  ym as useHasContentBelow,
  $s as useListbox,
  km as useLivePopoverAnchor,
  Fp as usePromise,
  vh as useRecentSearches,
  pf as useRetryablePromise,
  mf as useRunWhenVisible,
  ms as useShrinkStep,
  Ni as useShrinkStepOverride,
  hd as useShrinkStepValue,
  La as useSidebar,
  gf as useStylesheet,
  vf as useTabIconSelection,
  Qo as useTruncationTooltip,
  Gp as useViewVisibility
};
//# sourceMappingURL=index.js.map
