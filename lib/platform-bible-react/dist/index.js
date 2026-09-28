var As = Object.defineProperty;
var $s = (t, e, r) => e in t ? As(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var oe = (t, e, r) => $s(t, typeof e != "symbol" ? e + "" : e, r);
import { c as x, g as Ge, a as Hr, C as lr, L as Zn, t as Vs, u as rn, T as Pt, b as _t, d as Nt, e as Ct, f as Xn, A as Na, r as de, D as Xe, h as je, i as Je, j as fr, k as rr, B as ot, x as Ls, l as Bs, m as js, I as Fs, n as So, o as ir, p as Ke, q as Us, s as Jn, P as mr, v as Pr, w as vr, y as br, z as za, E as Aa, F as Ro, G as xr, H as $a, J as It, R as Oo, K as Ca, M as lo, N as wo, O as uo, Q as po, S as Qn, U as fa, V as Do, W as Yr, X as Zr, Y as Cr, Z as Ks, _ as pr, $ as nr, a0 as Qe, a1 as ar, a2 as Er, a3 as Mo, a4 as Io, a5 as Ea, a6 as Po, a7 as ti, a8 as Hs, a9 as qs, aa as Gs, ab as ho, ac as ei, ad as Va, ae as Ws, af as ri, ag as Ys, ah as Zs, ai as Xs, aj as an, ak as Js, al as on, am as Qs, an as ai, ao as oi, ap as zo, aq as tc, ar as ni, as as qa, at as nn, au as Ga, av as ec, aw as rc, ax as ac, ay as oc, az as nc, aA as ic, aB as sc, aC as cc, aD as lc, aE as Ao, aF as $o, aG as dc, aH as wc } from "./resizable-BGI0UufA.js";
import { aI as Hf, aJ as qf, aK as Gf, aL as Wf, aM as Yf, aN as Zf, aO as Xf, aP as Jf, aQ as Qf, aR as tm, aS as em, aT as rm, aU as am, aV as om, aW as nm, aX as im, aY as sm, aZ as cm, a_ as lm, a$ as dm, b0 as wm, b1 as um, b2 as pm, b3 as hm, b4 as gm, b5 as fm, b6 as mm, b7 as vm, b8 as bm, b9 as xm, ba as ym, bb as km, bc as _m, bd as Nm, be as Cm, bf as Em, bg as Tm, bh as Sm, bi as Rm, bj as Om } from "./resizable-BGI0UufA.js";
import { jsx as a, jsxs as u, Fragment as xt } from "react/jsx-runtime";
import { Canon as Gt } from "@sillsdev/scripture";
import { Check as sr, Clock as sn, ChevronsLeft as cn, ChevronsRight as ln, ChevronUp as ii, ChevronDown as hr, ArrowLeft as uc, ArrowRight as pc, BoldIcon as hc, ItalicIcon as gc, X as si, AtSign as ci, Pencil as fc, Trash2 as mc, Undo2 as vc, ArrowUp as li, MoreHorizontal as bc, MailOpen as xc, Mail as yc, FilterIcon as kc, ArrowLeftIcon as _c, ChevronLeftIcon as Nc, ChevronRightIcon as Cc, ArrowRightIcon as Ec, Copy as di, Filter as Tc, User as Sc, Link as Rc, CircleHelp as Oc, Undo as Dc, Redo as Mc, SquareX as wi, FunctionSquare as ui, SquareSigma as pi, Ban as Ic, AlertCircle as Pc, CircleCheckIcon as zc, CircleXIcon as Ac, CircleHelpIcon as $c, ArrowUpIcon as Vc, ArrowDownIcon as Lc, ScrollText as Bc, ChevronRight as jc, ChevronLeft as Fc, ChevronsUpDown as Uc, MenuIcon as Kc, Menu as Hc, EllipsisVertical as qc, MoreVertical as Gc } from "lucide-react";
import { Section as Mt, compareScrRefs as Ta, getChaptersForBook as Wc, formatScrRef as We, formatReplacementString as or, getSectionForBook as ma, formatRelativeDate as Yc, sanitizeHtml as Vo, NumberFormat as hi, formatBytes as Zc, getCurrentLocale as Xc, usfmMarkers as Fr, deepEqual as gi, isPlatformError as Jc, ABORTED as Qc, getErrorMessage as tl, getFormatCallerFunction as el, isString as dn, scrRefToBBBCCCVVV as Wa, defaultScrRef as Ya, formatScrRefRange as rl, getLocalizeKeyForScrollGroupId as wn, formatReplacementStringToArray as un, collectUsjMarkers as al } from "platform-bible-utils";
import we, { useRef as M, useMemo as V, createContext as zr, useContext as ta, useEffect as Z, useState as C, useCallback as $, useId as Sa, useImperativeHandle as fi, useLayoutEffect as Lt, Fragment as gr, Component as ol, createElement as go, Suspense as nl, forwardRef as Lo, memo as mi } from "react";
import { IconSelector as vi, IconCheck as La, IconChevronDown as il, IconChevronUp as sl, IconLayoutSidebar as cl, IconLayoutSidebarRight as ll, IconChevronRight as bi, IconSearch as dl, IconLoader as wl, IconAlertOctagon as ul, IconAlertTriangle as pl, IconInfoCircle as hl, IconCircleCheck as gl } from "@tabler/icons-react";
import { createEditor as xi, $getRoot as cr, $createParagraphNode as ea, $getSelection as ue, HISTORY_MERGE_TAG as Bo, ParagraphNode as yi, TextNode as ki, $getPreviousSelection as fl, $isRangeSelection as Fe, $caretFromPoint as ml, $getSiblingCaret as _i, $getChildCaret as vl, $getAdjacentChildCaret as bl, $isChildCaret as xl, $normalizeCaret as yl, $setSelectionFromCaretRange as kl, $getCollapsedCaretRange as _l, $getCaretInDirection as pn, $splitAtPointCaretNext as Nl, $isTextPointCaret as Cl, $findMatchingParent as Ni, $isElementNode as Xr, mergeRegister as Ze, getDOMTextNode as El, isHTMLElement as Tl, CLEAR_EDITOR_COMMAND as Ci, COMMAND_PRIORITY_EDITOR as jo, shallowMergeConfig as Sl, defineExtension as Se, safeCast as yr, createState as Rl, FORMAT_TEXT_COMMAND as Ei, $isNodeSelection as Ti, COMMAND_PRIORITY_LOW as Si, RootNode as Ol, LineBreakNode as Dl, TabNode as Ml, $isEditorState as Il, createCommand as Pl, CLICK_COMMAND as zl, isDOMNode as Al, $getNodeFromDOMNode as $l, $createNodeSelection as Vl, $setSelection as Ll, $getEditor as Bl, DecoratorNode as fo, $getState as jl, toggleTextFormatType as hn, TEXT_TYPE_TO_FORMAT as Fl, $setState as Ul, addClassNamesToElement as Ri, $create as Kl, $getNodeByKey as Hl, removeClassNamesFromElement as ql, KEY_TAB_COMMAND as Gl, $isBlockElementNode as Wl, $createRangeSelection as Yl, $normalizeSelection__EXPERIMENTAL as Zl, OUTDENT_CONTENT_COMMAND as Xl, INDENT_CONTENT_COMMAND as gn, INSERT_TAB_COMMAND as Jl, COMMAND_PRIORITY_CRITICAL as Fo, $isDecoratorNode as Ql, $isParagraphNode as td, $isTextNode as mo, SELECTION_CHANGE_COMMAND as Oi, $insertNodes as ed } from "lexical";
import { HeadingNode as rd, QuoteNode as ad, registerRichText as od } from "@lexical/rich-text";
import { flushSync as nd, createPortal as id } from "react-dom";
import { $isTableSelection as sd } from "@lexical/table";
import { createHeadlessEditor as Di } from "@lexical/headless";
import { $generateHtmlFromNodes as cd, $generateNodesFromDOM as ld } from "@lexical/html";
import { Avatar as Uo, Select as ie, Checkbox as fn, Slot as ra, Tabs as Pe, Menubar as He, ContextMenu as Wt, Progress as mn, Slider as la, Switch as vn } from "radix-ui";
import { useReactTable as Mi, getFilteredRowModel as dd, getSortedRowModel as Ii, getPaginationRowModel as wd, getCoreRowModel as Pi, flexRender as qr, getGroupedRowModel as ud, getExpandedRowModel as pd } from "@tanstack/react-table";
import hd from "markdown-to-jsx";
import { GENERATOR_NOTE_CALLER as vo, HIDDEN_NOTE_CALLER as bo, getDefaultViewOptions as gd, isInsertEmbedOpOfType as Lr, getMarkerMenuItems as fd, defaultStyleInfo as md, Editorial as vd } from "@eten-tech-foundation/platform-editor";
import { cva as zi } from "class-variance-authority";
import { useHotkeys as bd } from "react-hotkeys-hook";
import { Drawer as dr } from "vaul";
import { useTheme as xd } from "next-themes";
import { Toaster as yd } from "sonner";
import { toast as Mm } from "sonner";
function Vh({ className: t, ...e }) {
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
function Ai({
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
  dimmedDescription: v
}) {
  const y = M(!1), f = () => {
    p || (y.current || o == null || o(e), setTimeout(() => {
      y.current = !1;
    }, 100));
  }, m = (z) => {
    if (p) {
      z.preventDefault();
      return;
    }
    y.current = !0, n ? n(z) : o == null || o(e);
  }, N = V(
    () => Ge(e, d),
    [e, d]
  ), T = V(
    () => Hr(e, d),
    [e, d]
  ), D = !!h && !p, E = `${N} (${T})`, L = D ? v || `${E}, ${h}` : E, S = /* @__PURE__ */ u(
    lr,
    {
      ref: t,
      value: l || `${e} ${Gt.bookIdToEnglishName(e)}`,
      onSelect: f,
      onMouseDown: m,
      role: "option",
      "aria-selected": r,
      "aria-disabled": p || void 0,
      "aria-label": L,
      disabled: p,
      className: x(
        !w && Zn,
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
        D && "tw:bg-muted/50 tw:text-muted-foreground/50 tw:data-selected:bg-muted/50 tw:data-selected:text-muted-foreground/50"
      ),
      children: [
        c && /* @__PURE__ */ a(
          sr,
          {
            className: x(
              "tw:me-2 tw:h-4 tw:w-4 tw:shrink-0",
              r ? "tw:opacity-100" : "tw:opacity-0"
            )
          }
        ),
        /* @__PURE__ */ a("span", { className: "tw:min-w-0 tw:flex-1", children: N }),
        D && // Visible rather than hover-only: cmdk never moves DOM focus onto an item (the input keeps
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
              !D && "tw:text-muted-foreground"
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
          "tw:border-s-red-200": s === Mt.OT,
          "tw:border-s-purple-200": s === Mt.NT,
          "tw:border-s-indigo-200": s === Mt.DC,
          "tw:border-s-amber-200": s === Mt.Extra
        }
      ),
      children: S
    }
  );
}
const kd = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
function _d(t) {
  return kd.some((e) => e === t);
}
function bn(t) {
  const e = new RegExp("^\\p{L}$", "u").test(t), r = /^[0-9]$/.test(t);
  return { isLetter: e, isDigit: r };
}
const Gr = Object.freeze({
  /** Full labels. */
  WIDE: 0,
  /** Abbreviated primary label form. */
  TIGHT: 1,
  /** Secondary field clipped with an ellipsis — CSS does this on its own. */
  TIGHTER: 2,
  /** Secondary field dropped entirely; primary field alone. */
  MINIMUM: 3
}), Ba = zr(Gr.WIDE);
function Nd() {
  return ta(Ba);
}
const $i = zr(void 0);
function Vi() {
  return ta($i);
}
function Li() {
  Z(() => {
    Vs();
  }, []);
}
function Cd({
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
  } = rn(), {
    ref: h,
    open: v,
    onPointerEnter: y,
    onPointerLeave: f
  } = rn(), [m, N] = C(!1), [T, D] = C(!1), E = M(
    // React's ref API requires `null` as the initial value for DOM refs.
    // eslint-disable-next-line no-null/no-null
    null
  ), L = n && e !== void 0, S = s ?? (e !== void 0 && !n);
  Li(), Z(() => {
    var B;
    const rt = (B = E.current) == null ? void 0 : B.closest('button, [role="combobox"], [tabindex]');
    if (!rt) return;
    const g = (X) => !!X && X.scrollWidth > X.clientWidth, j = () => {
      Xn() !== "pointer" && (S || g(h.current) || g(d.current)) && D(!0);
    }, F = () => D(!1);
    return rt.addEventListener("focus", j), rt.addEventListener("blur", F), () => {
      rt.removeEventListener("focus", j), rt.removeEventListener("blur", F);
    };
  }, [S, h, d]);
  const z = $(() => {
    S && N(!0), y(), L && w();
  }, [
    S,
    L,
    y,
    w
  ]), I = $(() => {
    N(!1), D(!1), f(), p();
  }, [f, p]);
  Z(() => {
    S || N(!1);
  }, [S]);
  const R = /* @__PURE__ */ a("span", { ref: h, className: "tw:min-w-0 tw:shrink tw:truncate", children: t }, "primary"), O = L ? (
    // Weighted to absorb essentially all of the shrinking, so the primary field only starts losing
    // characters once this one has none left.
    /* @__PURE__ */ a("span", { ref: d, className: "tw:min-w-0 tw:shrink-[9999] tw:truncate", children: e }, "secondary")
  ) : void 0, [J, et] = o ? [O, R] : [R, O];
  return (
    // Nested TooltipProviders are harmless in Radix, so carrying our own means this works in any
    // host, including toolbars that never set one up.
    /* @__PURE__ */ a(Pt, { children: /* @__PURE__ */ u(
      _t,
      {
        open: v || l || m || T,
        onOpenChange: (rt) => {
          rt || I();
        },
        children: [
          /* @__PURE__ */ a(Nt, { asChild: !0, children: /* @__PURE__ */ u(
            "span",
            {
              ref: E,
              onPointerEnter: z,
              onPointerLeave: I,
              onPointerDown: I,
              className: x("tw:flex tw:min-w-0 tw:items-center", c),
              children: [
                J,
                J && et && /* @__PURE__ */ a("span", { className: "tw:shrink-0 tw:whitespace-pre", children: r }, "separator"),
                et
              ]
            }
          ) }),
          /* @__PURE__ */ a(Ct, { dir: "auto", children: i })
        ]
      }
    ) })
  );
}
function xo(t, e) {
  return `${t} ${Na[t]}${e ? ` ${Hr(t, e)} ${Ge(t, e)}` : ""}`;
}
function Tr(t, e) {
  return `${t} ${Na[t] || ""} ${e}`;
}
function va(t, e, r) {
  return `${Tr(t, e)}:${r}`;
}
function Ur(t) {
  if (t.includes(":")) return;
  const e = /(\d+)$/.exec(t);
  if (!e) return;
  const r = parseInt(e[1], 10), o = t.indexOf(" ");
  if (o < 0) return;
  const n = t.slice(0, o);
  return t === Tr(n, r) ? r : void 0;
}
function da(t) {
  const e = /:(\d+)$/.exec(t);
  if (!e) return;
  const r = t.slice(0, t.length - e[0].length);
  if (Ur(r) !== void 0)
    return parseInt(e[1], 10);
}
const Ed = "top-match", Td = "Show recent searches", Sd = "Recent";
function Rd({
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
  const [h, v] = C(!1), [y, f] = C(!1), m = Sa(), N = M(!1), T = w !== void 0, D = T ? w : h, E = n === "" ? "" : de(n, Td), L = de(s, Sd), S = (O) => {
    O || (N.current = !0, f(!1)), T || v(O), p == null || p(O);
  }, z = (O) => {
    if (O && N.current) {
      N.current = !1;
      return;
    }
    f(O);
  };
  if (t.length === 0)
    return;
  const I = (O) => {
    e(O);
  }, R = /* @__PURE__ */ a(
    ot,
    {
      variant: l,
      size: "icon",
      className: d,
      "aria-label": E,
      onPointerEnter: () => {
        N.current = !1;
      },
      children: /* @__PURE__ */ a(sn, { className: "tw:h-4 tw:w-4" })
    }
  );
  return /* @__PURE__ */ u(Xe, { open: D, onOpenChange: S, modal: !1, children: [
    /* @__PURE__ */ a(Pt, { children: E ? /* @__PURE__ */ u(_t, { open: y, onOpenChange: z, children: [
      /* @__PURE__ */ a(Nt, { asChild: !0, children: /* @__PURE__ */ a(je, { asChild: !0, children: R }) }),
      /* @__PURE__ */ a(Ct, { children: E })
    ] }) : /* @__PURE__ */ a(je, { asChild: !0, children: R }) }),
    /* @__PURE__ */ u(
      Je,
      {
        id: i,
        "aria-labelledby": m,
        className: "tw:w-[300px]",
        align: "start",
        onKeyDown: (O) => O.stopPropagation(),
        children: [
          /* @__PURE__ */ a(fr, { id: m, children: L }),
          t.map((O) => /* @__PURE__ */ u(
            rr,
            {
              onSelect: () => I(O),
              className: x("tw:flex tw:items-center", c),
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
function Lh(t, e, r = (n, s) => n === s, o = 15) {
  return (n) => {
    const s = t.filter(
      (c) => !r(c, n)
    ), i = [n, ...s.slice(0, o - 1)];
    e(i);
  };
}
function wa(t, e) {
  return !e || Ta(t, e) === 0;
}
function Od(t, e, r, o, n) {
  const s = V(
    () => Ls(t, e),
    [t, e]
  ), i = V(
    () => Bs(t, e),
    [t, e]
  ), c = V(
    () => js(t, e),
    [t, e]
  ), d = V(
    () => Fs(t, e),
    [t, e]
  ), l = $(
    (w) => {
      w && o(w);
    },
    [o]
  );
  return V(() => [
    {
      onClick: () => l(s),
      disabled: wa(t, s),
      title: de(
        n == null ? void 0 : n["%webView_bookChapterControl_previousChapter%"],
        "Previous chapter"
      ),
      icon: r === "ltr" ? cn : ln,
      group: "chapter"
    },
    {
      onClick: () => l(i),
      disabled: wa(t, i),
      title: de(
        n == null ? void 0 : n["%webView_bookChapterControl_nextChapter%"],
        "Next chapter"
      ),
      icon: r === "ltr" ? ln : cn,
      group: "chapter"
    },
    {
      onClick: () => l(c),
      disabled: wa(t, c),
      title: de(
        n == null ? void 0 : n["%webView_bookChapterControl_previousVerse%"],
        "Previous verse"
      ),
      icon: ii,
      group: "verse"
    },
    {
      onClick: () => l(d),
      disabled: wa(t, d),
      title: de(
        n == null ? void 0 : n["%webView_bookChapterControl_nextVerse%"],
        "Next verse"
      ),
      icon: hr,
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
const ba = {
  // Matches start of string (`^`), one or more non-colon/space words, optionally followed by space and more words (`([^:\s]+(?:\s+[^:\s]+)*)`), end of string (`$`), case-insensitive (`i`)
  BOOK_ONLY: /^([^:\s]+(?:\s+[^:\s]+)*)$/i,
  // Same as above, but followed by a space and a chapter number (`\s+(\d+)`)
  BOOK_CHAPTER: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,
  // Same as above, but followed by a colon and optionally a verse number (`:(\d*)`)
  BOOK_CHAPTER_VERSE: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i
}, Dd = [
  ba.BOOK_ONLY,
  ba.BOOK_CHAPTER,
  ba.BOOK_CHAPTER_VERSE
];
function Md(t) {
  return ba.BOOK_CHAPTER_VERSE.test(t.trim());
}
function xn(t, e) {
  return Gt.bookIdToNumber(t) < Gt.bookIdToNumber(e.book);
}
function Id(t, e, r) {
  const o = Gt.bookIdToNumber(t) - Gt.bookIdToNumber(r.book);
  return o < 0 ? !0 : o > 0 ? !1 : e < r.chapterNum;
}
function Za(t, e, r, o) {
  const n = Gt.bookIdToNumber(t) - Gt.bookIdToNumber(o.book);
  return n < 0 ? !0 : n > 0 ? !1 : e < o.chapterNum ? !0 : e > o.chapterNum ? !1 : r < o.verseNum;
}
function er(t) {
  return Wc(Gt.bookIdToNumber(t));
}
function Pd(t, e, r) {
  if (!t.trim() || e.length === 0) return;
  const o = Dd.reduce(
    (n, s) => {
      if (n) return n;
      const i = s.exec(t.trim());
      if (i) {
        const [c, d = void 0, l = void 0] = i.slice(1);
        let w;
        const p = e.filter((h) => So(h, c, r));
        if (p.length === 1 && ([w] = p), !w && d) {
          if (Gt.isBookIdValid(c)) {
            const h = c.toUpperCase();
            e.includes(h) && (w = h);
          }
          if (!w && r) {
            const h = Array.from(r.entries()).find(
              ([, v]) => v.localizedId.toLowerCase() === c.toLowerCase()
            );
            h && e.includes(h[0]) && ([w] = h);
          }
        }
        if (!w && d) {
          const v = ((y) => Object.keys(Na).find(
            (f) => Na[f].toLowerCase() === y.toLowerCase()
          ))(c);
          if (v && e.includes(v) && (w = v), !w && r) {
            const y = Array.from(r.entries()).find(
              ([, f]) => f.localizedName.toLowerCase() === c.toLowerCase()
            );
            y && e.includes(y[0]) && ([w] = y);
          }
        }
        if (w) {
          let h = d ? parseInt(d, 10) : void 0;
          h && h > er(w) && (h = Math.max(er(w), 1));
          const v = l ? parseInt(l, 10) : void 0;
          return {
            book: w,
            chapterNum: h,
            verseNum: v
          };
        }
      }
    },
    void 0
  );
  if (o) return o;
}
function yo(t) {
  return {
    [Mt.OT]: t.filter((e) => Gt.isBookOT(e)),
    [Mt.NT]: t.filter((e) => Gt.isBookNT(e)),
    [Mt.DC]: t.filter((e) => Gt.isBookDC(e)),
    [Mt.Extra]: t.filter((e) => Gt.extraBooks().includes(e))
  };
}
function zd(t, e) {
  const r = new Set(t), o = e.filter((l) => !r.has(l)), n = new Set(o), s = n.size === 0 ? t : Gt.allBookIds.filter(
    (l) => r.has(l) || n.has(l)
  ), i = yo(s), c = Object.values(i).flat(), d = yo(t);
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
const ko = 6;
function Ad(t) {
  return t === "ArrowLeft" ? "ArrowRight" : t === "ArrowRight" ? "ArrowLeft" : t;
}
function $d({
  current: t,
  key: e,
  max: r,
  direction: o = "ltr"
}) {
  if (r <= 0) return t;
  if (t < 1 || t > r) return 1;
  switch (o === "rtl" ? Ad(e) : e) {
    case "ArrowLeft":
      return t > 1 ? t - 1 : r;
    case "ArrowRight":
      return t < r ? t + 1 : 1;
    case "ArrowUp":
      return Math.max(1, t - ko);
    case "ArrowDown":
      return Math.min(r, t + ko);
    default:
      return t;
  }
}
function Bi({
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
    return /* @__PURE__ */ a(ir, { children: /* @__PURE__ */ a(
      "div",
      {
        className: x("tw:grid tw:gap-1", d),
        style: { gridTemplateColumns: `repeat(${ko}, minmax(0, 1fr))` },
        children: Array.from({ length: t }, (l, w) => w + 1).map((l) => {
          const w = (n == null ? void 0 : n(l)) ?? !1;
          return /* @__PURE__ */ a(
            lr,
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
                !c && Zn,
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
      Bi,
      {
        count: er(t),
        valueBuilder: (d) => Tr(t, d),
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
      Bi,
      {
        count: r,
        valueBuilder: (w) => va(t, e, w),
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
const Vd = "a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]";
function Ld(t) {
  return Array.from(t.querySelectorAll(Vd)).filter(
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
  triggerContent: v,
  triggerVariant: y = "outline",
  showTriggerChevron: f = !1,
  onOpenChange: m,
  onCloseAutoFocus: N,
  modal: T = !1,
  align: D = "center",
  ref: E,
  disabled: L
}) {
  const S = Ke(), z = Nd(), [I, R] = C(!1), [O, J] = C(""), [et, rt] = C(""), [g, j] = C("books"), [F, B] = C(void 0), [X, U] = C(
    void 0
  ), [W, ct] = C(void 0), [vt, Q] = C(!1), [wt, ht] = C(!1), [gt, ft] = C(!1), [Tt, zt] = C(!1), ze = M(null), be = M(!1), Bt = M(void 0), lt = M(void 0), Yt = M(void 0), xe = M(void 0), pe = M({}), Jt = M({}), ut = $(
    (b) => {
      e(b), d && d(b);
    },
    [e, d]
  ), jt = V(() => o ? o() : Us, [o]), ye = V(
    () => o && n ? n() : [],
    [o, n]
  ), {
    projectBooksBySection: Zt,
    reachableBooksBySection: Ft,
    reachableBooks: se,
    projectBooks: Ae,
    booksOutsideProject: bt
  } = V(
    () => zd(jt, ye),
    [jt, ye]
  ), he = bt.has(t.book), Qt = V(() => et.trim() ? yo(
    se.filter((b) => So(b, et, s))
  ) : wt ? Ft : Zt, [
    Zt,
    Ft,
    se,
    wt,
    et,
    s
  ]), A = V(
    () => Pd(et, se, s),
    [et, se, s]
  ), pt = V(() => {
    if (!A) return;
    const b = O.startsWith(`${A.book} `) ? O : "", Y = da(b), st = Ur(b);
    return {
      book: A.book,
      chapterNum: st ?? A.chapterNum ?? 1,
      verseNum: Y ?? A.verseNum ?? 1
    };
  }, [A, O]), ke = M(!1);
  Z(() => {
    if (!ke.current) {
      ke.current = !0;
      return;
    }
    m == null || m(I);
  }, [I, m]);
  const Ot = $(() => {
    pt && (p && Za(
      pt.book,
      pt.chapterNum,
      pt.verseNum,
      p
    ) || (ut(pt), R(!1), rt(""), J("")));
  }, [ut, pt, p]), Dt = $(
    (b) => {
      const Y = X ?? (A == null ? void 0 : A.book), st = W ?? (A == null ? void 0 : A.chapterNum);
      !Y || !st || (ut({
        book: Y,
        chapterNum: st,
        verseNum: b
      }), R(!1));
    },
    [ut, X, W, A]
  ), _e = $(
    (b) => {
      if (p && xn(b, p)) return;
      if (er(b) <= 1) {
        ut({
          book: b,
          chapterNum: 1,
          verseNum: 1
        }), R(!1), rt("");
        return;
      }
      B(b), j("chapters");
    },
    [ut, p]
  ), te = $(
    (b) => {
      const Y = g === "chapters" ? F : A == null ? void 0 : A.book;
      if (Y) {
        if (w && w(Y, b) > 1) {
          U(Y), ct(b), j("verses"), J("");
          return;
        }
        ut({
          book: Y,
          chapterNum: b,
          verseNum: 1
        }), R(!1);
      }
    },
    [ut, g, F, A, w]
  ), ee = $(
    (b) => {
      ut(b), R(!1), rt("");
    },
    [ut]
  ), Re = Od(
    t,
    wt ? se : Ae,
    S,
    e,
    i
  ), Oe = $((b) => {
    rt(b), zt(!1);
  }, []), Ut = $(() => {
    j("books"), B(void 0), U(void 0), ct(void 0), zt(!1), setTimeout(() => {
      var b;
      (b = lt.current) == null || b.focus();
    }, 0);
  }, []), ce = $(() => {
    const b = X;
    U(void 0), ct(void 0), b ? (B(b), j("chapters"), J("")) : Ut();
  }, [X, Ut]), St = $(
    (b) => {
      R(b), b && (j("books"), B(void 0), U(void 0), ct(void 0), rt(""), zt(!1), ft(!1), ht(he));
    },
    [he]
  );
  Z(() => {
    L && St(!1);
  }, [L, St]);
  const [Rt, ge] = C(0);
  Z(() => {
    var b;
    Rt !== 0 && ((b = lt.current) == null || b.focus());
  }, [Rt]), fi(
    E,
    () => ({
      open: () => {
        L || (St(!0), ge((b) => b + 1));
      }
    }),
    [St, L]
  );
  const { otLong: fe, ntLong: me, dcLong: $e, extraLong: Ve } = {
    otLong: i == null ? void 0 : i["%scripture_section_ot_long%"],
    ntLong: i == null ? void 0 : i["%scripture_section_nt_long%"],
    dcLong: i == null ? void 0 : i["%scripture_section_dc_long%"],
    extraLong: i == null ? void 0 : i["%scripture_section_extra_long%"]
  }, k = $(
    (b) => Jn(b, fe, me, $e, Ve),
    [fe, me, $e, Ve]
  ), P = $(
    (b) => A ? !!A.chapterNum && !b.toString().includes(A.chapterNum.toString()) : !1,
    [A]
  ), H = V(
    () => We(
      t,
      s ? Ge(t.book, s) : "English"
    ),
    [t, s]
  ), q = V(
    () => z >= Gr.TIGHT ? Hr(t.book, s) : Ge(t.book, s),
    [t.book, s, z]
  ), at = `${t.chapterNum}:${t.verseNum}`, G = $((b) => (Y) => {
    pe.current[b] = Y;
  }, []), _ = $((b) => (Y) => {
    Jt.current[b] = Y;
  }, []), tt = V(
    () => Md(et),
    [et]
  ), nt = V(() => !w || !A || !A.chapterNum || !tt ? !1 : w(A.book, A.chapterNum) > 0, [w, A, tt]), yt = g === "books" && !vt && !et.trim() && bt.size > 0, At = $(
    (b) => p ? xn(b, p) : !1,
    [p]
  ), kt = $(
    (b) => (Y) => p ? Id(b, Y, p) : !1,
    [p]
  ), Kt = $(
    (b, Y) => (st) => p ? Za(b, Y, st, p) : !1,
    [p]
  ), re = de(
    i == null ? void 0 : i["%webView_bookChapterControl_selectChapter%"],
    "Select chapter"
  ), Ne = de(
    i == null ? void 0 : i["%webView_bookChapterControl_selectVerse%"],
    "Select verse"
  ), aa = g === "verses" ? de(
    i == null ? void 0 : i["%webView_bookChapterControl_backToChapters%"],
    "Back to chapters"
  ) : de(
    i == null ? void 0 : i["%webView_bookChapterControl_backToBooks%"],
    "Back to books"
  ), Ka = de(
    i == null ? void 0 : i["%webView_bookChapterControl_bookNotInProject%"],
    "Not in project"
  ), oa = de(
    i == null ? void 0 : i["%webView_bookChapterControl_bookNotInProjectDescription%"],
    "{book} is not in this project"
  ), na = $(
    (b) => or(oa, {
      book: `${Ge(b, s)} (${Hr(
        b,
        s
      )})`
    }),
    [oa, s]
  ), ia = de(
    i == null ? void 0 : i["%webView_bookChapterControl_showMoreBooks%"],
    "Show more books"
  ), kr = de(
    i == null ? void 0 : i["%webView_bookChapterControl_showProjectBooksOnly%"],
    "Show project books only"
  ), sa = $(
    (b) => {
      (b.key === "Home" || b.key === "End") && b.stopPropagation(), h && h.includes(b.key) && A && A.chapterNum !== void 0 && A.verseNum !== void 0 && (b.preventDefault(), b.stopPropagation(), Ot());
    },
    [h, A, Ot]
  ), ca = $(
    (b) => {
      var Qo, tn;
      if (b.ctrlKey) return;
      const Y = b.target instanceof HTMLElement ? b.target : void 0;
      if (!(!!Y && !!((Qo = Bt.current) != null && Qo.contains(Y))) && (Y != null && Y.closest('[role="menu"], [role="menuitem"]')))
        return;
      if (b.key === "Tab") {
        const Vt = Bt.current ? Ld(Bt.current) : [];
        if (Vt.length === 0) {
          b.preventDefault(), b.stopPropagation();
          return;
        }
        const Ee = Vt[Vt.length - 1], ae = b.shiftKey ? Vt[0] : Ee;
        document.activeElement === ae && (b.preventDefault(), b.stopPropagation(), (b.shiftKey ? Ee : Vt[0]).focus());
        return;
      }
      const { isLetter: Ht, isDigit: Xt } = bn(b.key);
      if ((g === "chapters" || g === "verses") && (b.key === " " || b.key === "Enter")) {
        if (!!(Y != null && Y.closest(
          'button, a, input, select, textarea, [role="button"]'
        ))) {
          b.stopPropagation();
          return;
        }
        const Ee = (() => {
          if (g === "verses") {
            const Vr = X, en = W, Ha = da(O);
            return !Vr || !en || Ha === void 0 ? void 0 : {
              isDisabled: Kt(Vr, en)(Ha),
              activate: () => Dt(Ha)
            };
          }
          const ae = F, Me = Ur(O);
          if (!(!ae || Me === void 0))
            return {
              isDisabled: kt(ae)(Me),
              activate: () => te(Me)
            };
        })();
        if (Ee) {
          b.preventDefault(), b.stopPropagation(), Ee.isDisabled || Ee.activate();
          return;
        }
      }
      if (g === "books" && A && !vt && b.key === "Enter" && !(Y !== lt.current && !!(Y != null && Y.closest('button, a, input, select, textarea, [role="button"]')))) {
        b.preventDefault(), b.stopPropagation(), Ot();
        return;
      }
      if ((g === "chapters" || g === "verses") && (Ht || Xt)) {
        b.preventDefault(), b.stopPropagation();
        return;
      }
      if (b.key === "Backspace" && (g === "chapters" || g === "verses")) {
        b.preventDefault(), b.stopPropagation(), g === "verses" ? ce() : Ut();
        return;
      }
      if (!_d(b.key) || vt) return;
      if (g === "books" && !Tt && (b.key === "ArrowLeft" || b.key === "ArrowRight")) {
        const Vt = Y === lt.current ? lt.current : void 0, Ee = (Vt == null ? void 0 : Vt.selectionStart) ?? 0, ae = (Vt == null ? void 0 : Vt.selectionEnd) ?? 0, Me = S === "rtl" ? b.key === "ArrowRight" : b.key === "ArrowLeft";
        if (!!Vt && (Ee !== ae || (Me ? Ee > 0 : ae < Vt.value.length))) return;
      }
      if (b.shiftKey || g === "books" && Y !== lt.current && (Y != null && Y.closest('button, a, [role="button"]')))
        return;
      const Et = (() => {
        const Vt = g === "books" && A && nt && A.chapterNum ? { bookId: A.book, chapterNum: A.chapterNum } : void 0, Ee = g === "verses" ? { bookId: X, chapterNum: W } : Vt;
        if (Ee) {
          const { bookId: ae, chapterNum: Me } = Ee;
          return !ae || !Me || !w ? void 0 : {
            max: w(ae, Me),
            current: da(O) ?? 0,
            buildValue: (Vr) => va(ae, Me, Vr),
            refs: Jt,
            // In books view focus stays on the CommandInput so the user can keep typing; only
            // the dedicated grid views pull focus off the back button.
            takeFocus: g === "verses"
          };
        }
        if (g === "chapters" || g === "books" && A && er(A.book) > 1) {
          const ae = g === "chapters" ? F : A == null ? void 0 : A.book;
          return ae ? {
            max: er(ae),
            current: Ur(O) ?? 0,
            buildValue: (Me) => Tr(ae, Me),
            refs: pe,
            takeFocus: g === "chapters"
          } : void 0;
        }
      })();
      if (!Et || Et.max <= 0) return;
      g === "books" && zt(!0), Et.takeFocus && ((tn = Bt.current) == null || tn.focus());
      const le = $d({
        current: Et.current,
        key: b.key,
        max: Et.max,
        direction: S
      });
      if (b.preventDefault(), b.stopPropagation(), le === Et.current) return;
      J(Et.buildValue(le));
      const Jo = Et.refs.current[le];
      Jo && Jo.scrollIntoView({ block: "nearest", behavior: "smooth" });
    },
    [
      g,
      A,
      nt,
      vt,
      Tt,
      S,
      Ut,
      ce,
      te,
      Ot,
      Dt,
      kt,
      Kt,
      F,
      X,
      W,
      w,
      O
    ]
  ), K = $((b) => {
    var Ht, Xt;
    if (b.shiftKey || b.key === "Tab" || b.key === " ") return;
    if (b.key === "Enter") {
      b.stopPropagation();
      return;
    }
    if (b.key === "ArrowUp" || b.key === "ArrowDown") {
      (Ht = lt.current) == null || Ht.focus();
      return;
    }
    const { isLetter: Y, isDigit: st } = bn(b.key);
    (Y || st) && (b.preventDefault(), rt((Et) => Et + b.key), (Xt = lt.current) == null || Xt.focus(), Q(!1));
  }, []);
  Lt(() => {
    const b = setTimeout(() => {
      if (I && g === "books" && Yt.current && xe.current) {
        const Y = Yt.current, st = xe.current, Ht = st.offsetTop, Xt = Y.clientHeight, Et = st.clientHeight, le = Ht - Xt / 2 + Et / 2;
        Y.scrollTo({
          top: Math.max(0, le),
          behavior: "smooth"
        }), J(xo(t.book));
      }
    }, 0);
    return () => {
      clearTimeout(b);
    };
  }, [I, g, et, A, t.book]), Lt(() => {
    if (g === "chapters" && F) {
      const b = F === t.book, Y = b ? t.chapterNum : 1;
      J(Tr(F, Y)), setTimeout(() => {
        if (Yt.current)
          if (b) {
            const st = pe.current[t.chapterNum];
            st && st.scrollIntoView({ block: "center", behavior: "smooth" });
          } else
            Yt.current.scrollTo({ top: 0 });
        Bt.current && Bt.current.focus();
      }, 0);
    }
  }, [g, F, A, t.book, t.chapterNum]), Lt(() => {
    if (g === "verses" && X && W !== void 0) {
      const b = X === t.book && W === t.chapterNum, Y = b ? t.verseNum : 1;
      J(
        va(X, W, Y)
      ), setTimeout(() => {
        if (Yt.current)
          if (b) {
            const st = Jt.current[t.verseNum];
            st && st.scrollIntoView({ block: "center", behavior: "smooth" });
          } else
            Yt.current.scrollTo({ top: 0 });
        Bt.current && Bt.current.focus();
      }, 0);
    }
  }, [
    g,
    X,
    W,
    t.book,
    t.chapterNum,
    t.verseNum
  ]);
  const it = A ? `${A.book} ${A.chapterNum ?? ""} ${A.verseNum ?? ""} ${nt}` : "", $t = M(""), Ce = M(""), De = V(() => {
    if (g !== "books" || !A || vt) return;
    const { book: b, chapterNum: Y, verseNum: st } = A;
    if (nt && Y && w)
      return {
        max: w(b, Y),
        initial: st ?? (b === t.book && Y === t.chapterNum ? t.verseNum : 1),
        parse: da,
        buildValue: (Xt) => va(b, Y, Xt)
      };
    const Ht = er(b);
    if (!(Ht <= 1))
      return {
        max: Ht,
        initial: Y ?? (b === t.book ? t.chapterNum : 1),
        parse: Ur,
        buildValue: (Xt) => Tr(b, Xt)
      };
  }, [
    g,
    A,
    vt,
    nt,
    w,
    t.book,
    t.chapterNum,
    t.verseNum
  ]);
  return Lt(() => {
    if (g !== "books" || !A || !De || De.max <= 0) {
      $t.current = "";
      return;
    }
    const { max: b, initial: Y, parse: st, buildValue: Ht } = De, Xt = (Et) => {
      const le = st(Et);
      return le !== void 0 && le >= 1 && le <= b && Et === Ht(le) ? le : void 0;
    };
    if ($t.current !== it) {
      $t.current = it;
      const Et = Ht(Math.min(Math.max(Y, 1), b));
      Ce.current = Et, J(Et);
      return;
    }
    if (Xt(O) !== void 0) {
      Ce.current = O;
      return;
    }
    J(
      Xt(Ce.current) !== void 0 ? Ce.current : Ht(Math.min(Math.max(Y, 1), b))
    );
  }, [g, A, De, it, O]), /* @__PURE__ */ u(mr, { open: I, onOpenChange: St, modal: T, children: [
    /* @__PURE__ */ a(Pr, { asChild: !0, children: /* @__PURE__ */ u(
      ot,
      {
        ref: ze,
        "aria-label": "book-chapter-trigger",
        variant: y,
        role: "combobox",
        "aria-expanded": I,
        disabled: L,
        className: x(
          "tw:h-8 tw:w-full tw:min-w-16 tw:max-w-48 tw:shrink tw:overflow-hidden tw:px-1",
          r
        ),
        onClick: (b) => {
          be.current && (be.current = !1, b.preventDefault());
        },
        children: [
          v ?? /* @__PURE__ */ a(
            Cd,
            {
              primary: q,
              secondary: at,
              showSecondary: z < Gr.MINIMUM,
              isPartial: z >= Gr.TIGHT,
              fullText: H
            }
          ),
          f && /* @__PURE__ */ a(
            vi,
            {
              "data-testid": "book-chapter-control-chevron",
              className: "tw:ms-2 tw:size-4 tw:shrink-0 tw:opacity-50"
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ a(
      vr,
      {
        id: l,
        forceMount: !0,
        className: "tw:w-[280px] tw:p-0",
        align: D,
        onKeyDownCapture: ca,
        onKeyDown: (b) => b.stopPropagation(),
        onPointerDownOutside: (b) => {
          const { target: Y } = b;
          I && ze.current && Y instanceof Node && ze.current.contains(Y) && (be.current = !0, St(!1));
        },
        onCloseAutoFocus: N,
        children: /* @__PURE__ */ a(Pt, { children: /* @__PURE__ */ u(
          br,
          {
            ref: Bt,
            loop: !0,
            value: O,
            onValueChange: J,
            disablePointerSelection: !0,
            shouldFilter: !1,
            children: [
              g === "books" ? /* @__PURE__ */ u(
                "div",
                {
                  className: x("tw:flex tw:items-end", vt && "tw:pb-1"),
                  onFocus: (b) => {
                    ft(b.target !== lt.current);
                  },
                  onBlur: (b) => {
                    b.currentTarget.contains(b.relatedTarget) || ft(!1);
                  },
                  children: [
                    /* @__PURE__ */ u("div", { className: "tw:relative tw:flex-1", children: [
                      /* @__PURE__ */ a(
                        za,
                        {
                          ref: lt,
                          value: et,
                          onValueChange: Oe,
                          onKeyDown: sa,
                          onFocus: () => Q(!1),
                          className: c && c.length > 0 ? "tw:pe-8!" : "",
                          spaceSelectsHighlightedItem: !0
                        }
                      ),
                      c && c.length > 0 && /* @__PURE__ */ a(
                        Rd,
                        {
                          recentSearches: c,
                          onSearchItemSelect: ee,
                          renderItem: (b) => We(b, "English"),
                          getItemKey: (b) => `${b.book}-${b.chapterNum}-${b.verseNum}`,
                          ariaLabel: i == null ? void 0 : i["%history_recentSearches_ariaLabel%"],
                          groupHeading: i == null ? void 0 : i["%history_recent%"],
                          buttonClassName: "tw:absolute tw:end-1 tw:top-1"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ a(Aa, { className: "tw:translate-y-px tw:gap-1 tw:pe-2", children: Re.map(
                      ({ onClick: b, disabled: Y, title: st, icon: Ht, group: Xt }, Et) => {
                        const le = /* @__PURE__ */ a(
                          ot,
                          {
                            variant: "ghost",
                            size: "sm",
                            onClick: () => {
                              Q(!0), b();
                            },
                            disabled: Y,
                            className: "tw:h-8.5 tw:w-6 tw:rounded-lg! tw:p-0",
                            "aria-label": st,
                            onKeyDown: K,
                            children: /* @__PURE__ */ a(Ht, {})
                          }
                        );
                        return (
                          // Keyed by position, not by `title`: the titles are localized, so they all
                          // change together the moment the strings resolve or the UI language does.
                          // Keying on them would remount all four buttons at that instant, dropping
                          // focus off whichever one the user was on and destroying an open tooltip.
                          // The set is fixed in size and order, so the index is stable.
                          // eslint-disable-next-line react/no-array-index-key
                          /* @__PURE__ */ u(gr, { children: [
                            Et > 0 && Xt !== Re[Et - 1].group && /* @__PURE__ */ a(Ro, {}),
                            Y ? (
                              // A disabled Button carries `pointer-events: none` from its own base
                              // variants, so it is not hit-tested: neither a Radix tooltip nor a
                              // `title` ON THE BUTTON can ever fire. These arrows come back disabled
                              // at the edges of the canon — Genesis 1:1 is the default state of a
                              // freshly opened project — which is exactly where a user asks what the
                              // button was for. The wrapper is still hit-tested, so the native
                              // tooltip it carries is the one hover explanation available here.
                              /* @__PURE__ */ a("span", { title: st, className: "tw:inline-flex", children: le })
                            ) : /* @__PURE__ */ u(_t, { children: [
                              /* @__PURE__ */ a(Nt, { asChild: !0, children: le }),
                              /* @__PURE__ */ a(Ct, { children: st })
                            ] })
                          ] }, `${Xt}-${Et}`)
                        );
                      }
                    ) })
                  ]
                }
              ) : /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:border-b tw:px-3 tw:py-1", children: [
                /* @__PURE__ */ u(_t, { children: [
                  /* @__PURE__ */ a(Nt, { asChild: !0, children: /* @__PURE__ */ a(
                    ot,
                    {
                      variant: "ghost",
                      size: "sm",
                      onClick: g === "verses" ? ce : Ut,
                      className: "tw:me-2 tw:h-6 tw:w-6 tw:p-0",
                      tabIndex: -1,
                      "aria-label": aa,
                      children: S === "ltr" ? /* @__PURE__ */ a(uc, { className: "tw:h-4 tw:w-4" }) : /* @__PURE__ */ a(pc, { className: "tw:h-4 tw:w-4" })
                    }
                  ) }),
                  /* @__PURE__ */ a(Ct, { children: aa })
                ] }),
                g === "chapters" && F && /* @__PURE__ */ a("span", { tabIndex: -1, className: "tw:text-sm tw:font-medium", children: Ge(F, s) }),
                g === "verses" && X && W !== void 0 && /* @__PURE__ */ a("span", { tabIndex: -1, className: "tw:text-sm tw:font-medium", children: `${Ge(X, s)} ${W}` }),
                /* @__PURE__ */ a(
                  "span",
                  {
                    tabIndex: -1,
                    className: "tw:ms-auto tw:text-sm tw:font-medium tw:text-muted-foreground",
                    children: g === "verses" ? Ne : re
                  }
                )
              ] }),
              !vt && /* @__PURE__ */ u(xr, { ref: Yt, children: [
                g === "books" && /* @__PURE__ */ u(xt, { children: [
                  !A && Object.entries(Qt).map(([b, Y]) => {
                    if (Y.length !== 0)
                      return (
                        // We are mapping over filteredBooksByType, which uses Section as key type
                        // eslint-disable-next-line no-type-assertion/no-type-assertion
                        /* @__PURE__ */ a(ir, { heading: k(b), children: Y.map((st) => /* @__PURE__ */ a(
                          Ai,
                          {
                            bookId: st,
                            onSelect: (Ht) => _e(Ht),
                            section: ma(st),
                            commandValue: xo(st),
                            suppressKeyboardHighlight: gt,
                            ref: st === t.book ? xe : void 0,
                            localizedBookNames: s,
                            disabled: At(st),
                            dimmedReason: bt.has(st) ? Ka : void 0,
                            dimmedDescription: bt.has(st) ? na(st) : void 0
                          },
                          st
                        )) }, b)
                      );
                  }),
                  A && pt && /* @__PURE__ */ a(ir, { children: /* @__PURE__ */ u(
                    lr,
                    {
                      value: Ed,
                      onSelect: Ot,
                      disabled: !!p && Za(
                        pt.book,
                        pt.chapterNum,
                        pt.verseNum,
                        p
                      ),
                      className: "tw:font-semibold tw:text-primary tw:hover:bg-muted tw:[&>svg:last-child]:hidden",
                      children: [
                        /* @__PURE__ */ a("span", { className: "tw:min-w-0 tw:flex-1", children: We(
                          pt,
                          Ge(A.book, s)
                        ) }),
                        /* @__PURE__ */ a("span", { className: "tw:ms-2 tw:shrink-0 tw:text-xs tw:text-muted-foreground", children: Hr(A.book, s) })
                      ]
                    },
                    "top-match"
                  ) }),
                  A && nt && A.chapterNum && w && // No heading over this grid: the top-match row sits directly above it and
                  // already names the book and the reference the grid is refining, so a
                  // heading here only repeated the book back to the user one line later. The
                  // dedicated verses view still carries one, because there it is the only
                  // thing naming the book.
                  /* @__PURE__ */ a(
                    kn,
                    {
                      bookId: A.book,
                      chapterNum: A.chapterNum,
                      endVerse: w(A.book, A.chapterNum),
                      scrRef: t,
                      onVerseSelect: Dt,
                      setVerseRef: _,
                      isVerseDisabled: Kt(A.book, A.chapterNum),
                      suppressKeyboardHighlight: gt,
                      className: "tw:px-4 tw:pb-4"
                    }
                  ),
                  A && !nt && er(A.book) > 1 && // No heading here either, for the same reason as the verse preview above:
                  // the top-match row directly above already names the book.
                  /* @__PURE__ */ a(
                    yn,
                    {
                      bookId: A.book,
                      scrRef: t,
                      onChapterSelect: te,
                      setChapterRef: G,
                      isChapterDimmed: P,
                      isChapterDisabled: kt(A.book),
                      suppressKeyboardHighlight: gt,
                      className: "tw:px-4 tw:pb-4"
                    }
                  )
                ] }),
                g === "chapters" && F && /* @__PURE__ */ a(
                  yn,
                  {
                    bookId: F,
                    scrRef: t,
                    onChapterSelect: te,
                    setChapterRef: G,
                    isChapterDisabled: kt(F),
                    className: "tw:p-4"
                  }
                ),
                g === "verses" && X && W !== void 0 && w && /* @__PURE__ */ a(
                  kn,
                  {
                    bookId: X,
                    chapterNum: W,
                    endVerse: w(
                      X,
                      W
                    ),
                    scrRef: t,
                    onVerseSelect: Dt,
                    setVerseRef: _,
                    isVerseDisabled: Kt(
                      X,
                      W
                    ),
                    className: "tw:p-4"
                  }
                )
              ] }),
              yt && /* @__PURE__ */ a("div", { className: "tw:border-t tw:p-1", children: /* @__PURE__ */ a(
                ot,
                {
                  variant: "ghost",
                  size: "sm",
                  className: "tw:w-full tw:justify-start tw:font-normal",
                  onClick: () => ht((b) => !b),
                  children: wt ? kr : ia
                }
              ) })
            ]
          }
        ) })
      }
    )
  ] });
}
const Bh = Object.freeze([
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
function Bd(t) {
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
  getOptionLabel: d = Bd,
  getButtonLabel: l,
  icon: w = void 0,
  buttonPlaceholder: p = "",
  textPlaceholder: h = "",
  commandEmptyMessage: v = "No option found",
  buttonVariant: y = "outline",
  alignDropDown: f = "start",
  isDisabled: m = !1,
  ariaLabel: N,
  ...T
}) {
  const [D, E] = C(!1), L = l ?? d, S = (I) => I.length > 0 && typeof I[0] == "object" && "options" in I[0], z = (I, R) => {
    const O = d(I), J = typeof I == "object" && "secondaryLabel" in I ? I.secondaryLabel : void 0, et = `${R ?? ""}${O}${J ?? ""}`;
    return /* @__PURE__ */ u(
      lr,
      {
        value: O,
        onSelect: () => {
          c(I), E(!1);
        },
        className: "tw:gap-1.5!",
        children: [
          /* @__PURE__ */ a(
            sr,
            {
              className: x("tw:h-4 tw:w-4 tw:shrink-0", {
                "tw:opacity-0": !i || d(i) !== O
              })
            }
          ),
          /* @__PURE__ */ u("span", { className: "tw:flex-1 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap", children: [
            O,
            J && /* @__PURE__ */ u("span", { className: "tw:text-muted-foreground", children: [
              " · ",
              J
            ] })
          ] })
        ]
      },
      et
    );
  };
  return /* @__PURE__ */ u(mr, { open: D, onOpenChange: E, ...T, children: [
    /* @__PURE__ */ a(Pr, { asChild: !0, children: /* @__PURE__ */ u(
      ot,
      {
        variant: y,
        role: "combobox",
        "aria-expanded": D,
        "aria-label": N,
        id: t,
        className: x(
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
                className: x(
                  "tw:min-w-0 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap tw:text-start"
                ),
                children: i ? L(i) : p
              }
            )
          ] }),
          /* @__PURE__ */ a(hr, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ a(
      vr,
      {
        align: f,
        className: x("tw:w-[200px] tw:p-0", n),
        style: s,
        children: /* @__PURE__ */ u(br, { children: [
          /* @__PURE__ */ a(
            za,
            {
              placeholder: h,
              className: "tw:text-inherit",
              spaceSelectsHighlightedItem: !0
            }
          ),
          /* @__PURE__ */ a($a, { children: v }),
          /* @__PURE__ */ a(xr, { children: S(e) ? e.map((I) => /* @__PURE__ */ a(ir, { heading: I.groupHeading, children: I.options.map((R) => z(R, I.groupHeading)) }, I.groupHeading)) : /* @__PURE__ */ a(ir, { children: e.map((I) => z(I)) }) })
        ] })
      }
    )
  ] });
}
function jd({
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
  return /* @__PURE__ */ u(xt, { children: [
    /* @__PURE__ */ a(It, { htmlFor: "start-chapters-combobox", children: "Chapters" }),
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
    /* @__PURE__ */ a(It, { htmlFor: "end-chapters-combobox", children: "to" }),
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
var _o = /* @__PURE__ */ ((t) => (t.CurrentBook = "current book", t.ChooseBooks = "choose books", t))(_o || {});
((t) => {
  t.CURRENT_BOOK = "current book", t.CHOOSE_BOOKS = "choose books";
})(_o || (_o = {}));
const jh = Object.freeze([
  "%webView_bookSelector_currentBook%",
  "%webView_bookSelector_choose%",
  "%webView_bookSelector_chooseBooks%"
]), Ja = (t, e) => t[e] ?? e;
function Fh({
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
  const w = Ja(l, "%webView_bookSelector_currentBook%"), p = Ja(l, "%webView_bookSelector_choose%"), h = Ja(l, "%webView_bookSelector_chooseBooks%"), [v, y] = C(
    "current book"
    /* CurrentBook */
  ), f = (m) => {
    y(m), t(m);
  };
  return /* @__PURE__ */ a(
    Oo,
    {
      className: "pr-twp tw:flex",
      value: v,
      onValueChange: (m) => f(m),
      children: /* @__PURE__ */ u("div", { className: "tw:flex tw:w-full tw:flex-col tw:gap-4", children: [
        /* @__PURE__ */ u("div", { className: "tw:grid tw:grid-cols-[25%_25%_50%]", children: [
          /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center", children: [
            /* @__PURE__ */ a(Ca, {
              value: "current book"
              /* CurrentBook */
            }),
            /* @__PURE__ */ a(It, { className: "tw:ms-1", children: w })
          ] }),
          /* @__PURE__ */ a(It, { className: "tw:flex tw:items-center", children: e }),
          /* @__PURE__ */ a("div", { className: "tw:flex tw:items-center tw:justify-end", children: /* @__PURE__ */ a(
            jd,
            {
              isDisabled: v === "choose books",
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
            /* @__PURE__ */ a(Ca, {
              value: "choose books"
              /* ChooseBooks */
            }),
            /* @__PURE__ */ a(It, { className: "tw:ms-1", children: h })
          ] }),
          /* @__PURE__ */ a(It, { className: "tw:flex tw:items-center", children: o.map((m) => Gt.bookIdToEnglishName(m)).join(", ") }),
          /* @__PURE__ */ a(
            ot,
            {
              disabled: v === "current book",
              onClick: () => r(),
              children: p
            }
          )
        ] })
      ] })
    }
  );
}
const ji = zr(null);
function Fd(t, e) {
  return { getTheme: function() {
    return e ?? null;
  } };
}
function qe() {
  const t = ta(ji);
  return t == null && function(e, ...r) {
    const o = new URL("https://lexical.dev/docs/error"), n = new URLSearchParams();
    n.append("code", e);
    for (const s of r) n.append("v", s);
    throw o.search = n.toString(), Error(`Minified Lexical error #${e}; visit ${o.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
  }(8), t;
}
const Fi = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, Ud = Fi ? Lt : Z, ua = { tag: Bo };
function Kd({ initialConfig: t, children: e }) {
  const r = V(() => {
    const { theme: o, namespace: n, nodes: s, onError: i, editorState: c, html: d } = t, l = Fd(null, o), w = xi({ editable: t.editable, html: d, namespace: n, nodes: s, onError: (p) => i(p, w), theme: o });
    return function(p, h) {
      if (h !== null) {
        if (h === void 0) p.update(() => {
          const v = cr();
          if (v.isEmpty()) {
            const y = ea();
            v.append(y);
            const f = Fi ? document.activeElement : null;
            (ue() !== null || f !== null && f === p.getRootElement()) && y.select();
          }
        }, ua);
        else if (h !== null) switch (typeof h) {
          case "string": {
            const v = p.parseEditorState(h);
            p.setEditorState(v, ua);
            break;
          }
          case "object":
            p.setEditorState(h, ua);
            break;
          case "function":
            p.update(() => {
              cr().isEmpty() && h(p);
            }, ua);
        }
      }
    }(w, c), [w, l];
  }, []);
  return Ud(() => {
    const o = t.editable, [n] = r;
    n.setEditable(o === void 0 || o);
  }, []), a(ji.Provider, { value: r, children: e });
}
const Hd = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Lt : Z;
function qd({ ignoreHistoryMergeTagChange: t = !0, ignoreSelectionChange: e = !1, onChange: r }) {
  const [o] = qe();
  return Hd(() => {
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
  rd,
  yi,
  ki,
  ad
], Gd = zr(null), Qa = {
  didCatch: !1,
  error: null
};
class Wd extends ol {
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
    if (o && r.error !== null && Yd(e.resetKeys, n)) {
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
    return go(Gd.Provider, {
      value: {
        didCatch: s,
        error: i,
        resetErrorBoundary: this.resetErrorBoundary
      }
    }, c);
  }
}
function Yd() {
  let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  return t.length !== e.length || t.some((r, o) => !Object.is(r, e[o]));
}
function Zd({ children: t, onError: e }) {
  return a(Wd, { fallback: a("div", { style: { border: "1px solid #f00", color: "#f00", padding: "8px" }, children: "An error was thrown." }), onError: e, children: t });
}
const Xd = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Lt : Z;
function Jd(t) {
  return { initialValueFn: () => t.isEditable(), subscribe: (e) => t.registerEditableListener(e) };
}
function Qd() {
  return function(t) {
    const [e] = qe(), r = V(() => t(e), [e, t]), [o, n] = C(() => r.initialValueFn()), s = M(o);
    return Xd(() => {
      const { initialValueFn: i, subscribe: c } = r, d = i();
      return s.current !== d && (s.current = d, n(d)), c((l) => {
        s.current = l, n(l);
      });
    }, [r, t]), o;
  }(Jd);
}
function tw(t, e) {
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
function Ra(t, ...e) {
  const r = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const n of e) o.append("v", n);
  throw r.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
const Ui = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, ew = Ui && "documentMode" in document ? document.documentMode : null;
!(!Ui || !("InputEvent" in window) || ew) && "getTargetRanges" in new window.InputEvent("input");
function Be(t) {
  return `${t}px`;
}
const rw = { attributes: !0, characterData: !0, childList: !0, subtree: !0 };
function aw(t, e, r) {
  let o = null, n = null, s = null, i = [];
  const c = document.createElement("div");
  function d() {
    o === null && Ra(182), n === null && Ra(183);
    const { left: p, top: h } = n.getBoundingClientRect(), v = tw(t, e);
    var y, f;
    c.isConnected || (f = c, (y = n).insertBefore(f, y.firstChild));
    let m = !1;
    for (let N = 0; N < v.length; N++) {
      const T = v[N], D = i[N] || document.createElement("div"), E = D.style;
      E.position !== "absolute" && (E.position = "absolute", m = !0);
      const L = Be(T.left - p);
      E.left !== L && (E.left = L, m = !0);
      const S = Be(T.top - h);
      E.top !== S && (D.style.top = S, m = !0);
      const z = Be(T.width);
      E.width !== z && (D.style.width = z, m = !0);
      const I = Be(T.height);
      E.height !== I && (D.style.height = I, m = !0), D.parentNode !== c && (c.append(D), m = !0), i[N] = D;
    }
    for (; i.length > v.length; ) i.pop();
    m && r(i);
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
    const v = h.parentElement;
    if (!Tl(v)) return l();
    l(), o = h, n = v, s = new MutationObserver((y) => {
      const f = t.getRootElement(), m = f && f.parentElement;
      if (f !== o || m !== n) return p();
      for (const N of y) if (!c.contains(N.target)) return d();
    }), s.observe(v, rw), d();
  });
  return () => {
    w(), l();
  };
}
function Nn(t, e, r) {
  if (t.type !== "text" && Xr(e)) {
    const o = e.getDOMSlot(r);
    return [o.element, o.getFirstChildOffset() + t.offset];
  }
  return [El(r) || r, t.offset];
}
function ow(t) {
  for (const e of t) {
    const r = e.style;
    r.background !== "Highlight" && (r.background = "Highlight"), r.color !== "HighlightText" && (r.color = "HighlightText"), r.marginTop !== Be(-1.5) && (r.marginTop = Be(-1.5)), r.paddingTop !== Be(4) && (r.paddingTop = Be(4)), r.paddingBottom !== Be(0) && (r.paddingBottom = Be(0));
  }
}
function nw(t, e = ow) {
  let r = null, o = null, n = null, s = null, i = null, c = null, d = () => {
  };
  function l(w) {
    w.read(() => {
      const p = ue();
      if (!Fe(p)) return r = null, n = null, s = null, c = null, d(), void (d = () => {
      });
      const [h, v] = function(I) {
        const R = I.getStartEndPoints();
        return I.isBackward() ? [R[1], R[0]] : R;
      }(p), y = h.getNode(), f = y.getKey(), m = h.offset, N = v.getNode(), T = N.getKey(), D = v.offset, E = t.getElementByKey(f), L = t.getElementByKey(T), S = r === null || E !== o || m !== n || f !== r.getKey(), z = s === null || L !== i || D !== c || T !== s.getKey();
      if ((S || z) && E !== null && L !== null) {
        const I = function(R, O, J, et, rt, g, j) {
          const F = (R._window ? R._window.document : document).createRange();
          return F.setStart(...Nn(O, J, et)), F.setEnd(...Nn(rt, g, j)), F;
        }(t, h, y, E, v, N, L);
        d(), d = aw(t, I, e);
      }
      r = y, o = E, n = m, s = N, i = L, c = D;
    });
  }
  return l(t.getEditorState()), Ze(t.registerUpdateListener(({ editorState: w }) => l(w)), () => {
    d();
  });
}
function iw(t, e) {
  let r = null;
  const o = () => {
    const n = getSelection(), s = n && n.anchorNode, i = t.getRootElement();
    s !== null && i !== null && i.contains(s) ? r !== null && (r(), r = null) : r === null && (r = nw(t, e));
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
function sw(t) {
  const e = Ni(t, (r) => Xr(r) && !r.isInline());
  return Xr(e) || Ra(4, t.__key), e;
}
function cw(t) {
  const e = ue() || fl();
  let r;
  if (Fe(e)) r = ml(e.focus, "next");
  else {
    if (e != null) {
      const i = e.getNodes(), c = i[i.length - 1];
      c && (r = _i(c, "next"));
    }
    r = r || vl(cr(), "previous").getFlipped().insert(ea());
  }
  const o = lw(t, r), n = bl(o), s = xl(n) ? yl(n) : o;
  return kl(_l(s)), t.getLatest();
}
function lw(t, e, r) {
  let o = pn(e, "next");
  for (let n = o; n; n = Nl(n, r)) o = n;
  return Cl(o) && Ra(283), o.insert(t.isInline() ? ea().append(t) : t), pn(_i(t.getLatest(), "next"), e.direction);
}
function dw(t) {
  const e = ue();
  if (!Fe(e)) return !1;
  const r = /* @__PURE__ */ new Set(), o = e.getNodes();
  for (let n = 0; n < o.length; n++) {
    const s = o[n], i = s.getKey();
    if (r.has(i)) continue;
    const c = Ni(s, (l) => Xr(l) && !l.isInline());
    if (c === null) continue;
    const d = c.getKey();
    c.canIndent() && !r.has(d) && (r.add(d), t(c));
  }
  return r.size > 0;
}
const ww = Symbol.for("preact-signals");
function ja() {
  if (Ye > 1) return void Ye--;
  let t, e = !1;
  for (!function() {
    let r = Oa;
    for (Oa = void 0; r !== void 0; ) r.S.v === r.v && (r.S.i = r.i), r = r.o;
  }(); Wr !== void 0; ) {
    let r = Wr;
    for (Wr = void 0, Da++; r !== void 0; ) {
      const o = r.u;
      if (r.u = void 0, r.f &= -3, !(8 & r.f) && Ki(r)) try {
        r.c();
      } catch (n) {
        e || (t = n, e = !0);
      }
      r = o;
    }
  }
  if (Da = 0, Ye--, e) throw t;
}
function uw(t) {
  if (Ye > 0) return t();
  No = ++pw, Ye++;
  try {
    return t();
  } finally {
    ja();
  }
}
let dt, Wr;
function Cn(t) {
  const e = dt;
  dt = void 0;
  try {
    return t();
  } finally {
    dt = e;
  }
}
let Oa, Ye = 0, Da = 0, pw = 0, No = 0, xa = 0;
function En(t) {
  if (dt === void 0) return;
  let e = t.n;
  return e === void 0 || e.t !== dt ? (e = { i: 0, S: t, p: dt.s, n: void 0, t: dt, e: void 0, x: void 0, r: e }, dt.s !== void 0 && (dt.s.n = e), dt.s = e, t.n = e, 32 & dt.f && t.S(e), e) : e.i === -1 ? (e.i = 0, e.n !== void 0 && (e.n.p = e.p, e.p !== void 0 && (e.p.n = e.n), e.p = dt.s, e.n = void 0, dt.s.n = e, dt.s = e), e) : void 0;
}
function ne(t, e) {
  this.v = t, this.i = 0, this.n = void 0, this.t = void 0, this.l = 0, this.W = e == null ? void 0 : e.watched, this.Z = e == null ? void 0 : e.unwatched, this.name = e == null ? void 0 : e.name;
}
function Jr(t, e) {
  return new ne(t, e);
}
function Ki(t) {
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
function Hi(t) {
  let e, r = t.s;
  for (; r !== void 0; ) {
    const o = r.p;
    r.i === -1 ? (r.S.U(r), o !== void 0 && (o.n = r.n), r.n !== void 0 && (r.n.p = o)) : e = r, r.S.n = r.r, r.r !== void 0 && (r.r = void 0), r = o;
  }
  t.s = e;
}
function wr(t, e) {
  ne.call(this, void 0), this.x = t, this.s = void 0, this.g = xa - 1, this.f = 4, this.W = e == null ? void 0 : e.watched, this.Z = e == null ? void 0 : e.unwatched, this.name = e == null ? void 0 : e.name;
}
function hw(t, e) {
  return new wr(t, e);
}
function qi(t) {
  const e = t.m;
  if (t.m = void 0, typeof e == "function") {
    Ye++;
    const r = dt;
    dt = void 0;
    try {
      e();
    } catch (o) {
      throw t.f &= -2, t.f |= 8, qo(t), o;
    } finally {
      dt = r, ja();
    }
  }
}
function qo(t) {
  for (let e = t.s; e !== void 0; e = e.n) e.S.U(e);
  t.x = void 0, t.s = void 0, qi(t);
}
function gw(t) {
  if (dt !== this) throw new Error("Out-of-order effect");
  Hi(this), dt = t, this.f &= -2, 8 & this.f && qo(this), ja();
}
function Nr(t, e) {
  this.x = t, this.m = void 0, this.s = void 0, this.u = void 0, this.f = 32, this.name = e == null ? void 0 : e.name;
}
function Ue(t, e) {
  const r = new Nr(t, e);
  try {
    r.c();
  } catch (n) {
    throw r.d(), n;
  }
  const o = r.d.bind(r);
  return o[Symbol.dispose] = o, o;
}
function Ar(t, e = {}) {
  const r = {};
  for (const o in t) {
    const n = e[o], s = Jr(n === void 0 ? t[o] : n);
    r[o] = s;
  }
  return r;
}
ne.prototype.brand = ww, ne.prototype.h = function() {
  return !0;
}, ne.prototype.S = function(t) {
  const e = this.t;
  e !== t && t.e === void 0 && (t.x = e, this.t = t, e !== void 0 ? e.e = t : Cn(() => {
    var r;
    (r = this.W) == null || r.call(this);
  }));
}, ne.prototype.U = function(t) {
  if (this.t !== void 0) {
    const e = t.e, r = t.x;
    e !== void 0 && (e.x = r, t.e = void 0), r !== void 0 && (r.e = e, t.x = void 0), t === this.t && (this.t = r, r === void 0 && Cn(() => {
      var o;
      (o = this.Z) == null || o.call(this);
    }));
  }
}, ne.prototype.subscribe = function(t) {
  return Ue(() => {
    const e = this.value, r = dt;
    dt = void 0;
    try {
      t(e);
    } finally {
      dt = r;
    }
  }, { name: "sub" });
}, ne.prototype.valueOf = function() {
  return this.value;
}, ne.prototype.toString = function() {
  return this.value + "";
}, ne.prototype.toJSON = function() {
  return this.value;
}, ne.prototype.peek = function() {
  const t = dt;
  dt = void 0;
  try {
    return this.value;
  } finally {
    dt = t;
  }
}, Object.defineProperty(ne.prototype, "value", { get() {
  const t = En(this);
  return t !== void 0 && (t.i = this.i), this.v;
}, set(t) {
  if (t !== this.v) {
    if (Da > 100) throw new Error("Cycle detected");
    (function(e) {
      Ye !== 0 && Da === 0 && e.l !== No && (e.l = No, Oa = { S: e, v: e.v, i: e.i, o: Oa });
    })(this), this.v = t, this.i++, xa++, Ye++;
    try {
      for (let e = this.t; e !== void 0; e = e.x) e.t.N();
    } finally {
      ja();
    }
  }
} }), wr.prototype = new ne(), wr.prototype.h = function() {
  if (this.f &= -3, 1 & this.f) return !1;
  if ((36 & this.f) == 32 || (this.f &= -5, this.g === xa)) return !0;
  if (this.g = xa, this.f |= 1, this.i > 0 && !Ki(this)) return this.f &= -2, !0;
  const t = dt;
  try {
    Tn(this), dt = this;
    const e = this.x();
    (16 & this.f || this.v !== e || this.i === 0) && (this.v = e, this.f &= -17, this.i++);
  } catch (e) {
    this.v = e, this.f |= 16, this.i++;
  }
  return dt = t, Hi(this), this.f &= -2, !0;
}, wr.prototype.S = function(t) {
  if (this.t === void 0) {
    this.f |= 36;
    for (let e = this.s; e !== void 0; e = e.n) e.S.S(e);
  }
  ne.prototype.S.call(this, t);
}, wr.prototype.U = function(t) {
  if (this.t !== void 0 && (ne.prototype.U.call(this, t), this.t === void 0)) {
    this.f &= -33;
    for (let e = this.s; e !== void 0; e = e.n) e.S.U(e);
  }
}, wr.prototype.N = function() {
  if (!(2 & this.f)) {
    this.f |= 6;
    for (let t = this.t; t !== void 0; t = t.x) t.t.N();
  }
}, Object.defineProperty(wr.prototype, "value", { get() {
  if (1 & this.f) throw new Error("Cycle detected");
  const t = En(this);
  if (this.h(), t !== void 0 && (t.i = this.i), 16 & this.f) throw this.v;
  return this.v;
} }), Nr.prototype.c = function() {
  const t = this.S();
  try {
    if (8 & this.f || this.x === void 0) return;
    const e = this.x();
    typeof e == "function" && (this.m = e);
  } finally {
    t();
  }
}, Nr.prototype.S = function() {
  if (1 & this.f) throw new Error("Cycle detected");
  this.f |= 1, this.f &= -9, qi(this), Tn(this), Ye++;
  const t = dt;
  return dt = this, gw.bind(this, t);
}, Nr.prototype.N = function() {
  2 & this.f || (this.f |= 2, this.u = Wr, Wr = this);
}, Nr.prototype.d = function() {
  this.f |= 8, 1 & this.f || qo(this);
}, Nr.prototype.dispose = function() {
  this.d();
};
Se({ build: (t, e, r) => Ar(e), config: yr({ defaultSelection: "rootEnd", disabled: !1 }), name: "@lexical/extension/AutoFocus", register(t, e, r) {
  const o = r.getOutput();
  return Ue(() => o.disabled.value ? void 0 : t.registerRootListener((n) => {
    t.focus(() => {
      const s = document.activeElement;
      n === null || s !== null && n.contains(s) || n.focus({ preventScroll: !0 });
    }, { defaultSelection: o.defaultSelection.peek() });
  }));
} });
function Gi() {
  const t = cr(), e = ue(), r = ea();
  t.clear(), t.append(r), e !== null && r.select(), Fe(e) && (e.format = 0);
}
function Wi(t, e = Gi) {
  return t.registerCommand(Ci, (r) => (t.update(e), !0), jo);
}
Se({ build: (t, e, r) => Ar(e), config: yr({ $onClear: Gi }), name: "@lexical/extension/ClearEditor", register(t, e, r) {
  const { $onClear: o } = r.getOutput();
  return Ue(() => Wi(t, o.value));
} });
function fw(t) {
  return (typeof t.nodes == "function" ? t.nodes() : t.nodes) || [];
}
const to = Rl("format", { parse: (t) => typeof t == "number" ? t : 0 });
class Yi extends fo {
  $config() {
    return this.config("decorator-text", { extends: fo, stateConfigs: [{ flat: !0, stateConfig: to }] });
  }
  getFormat() {
    return jl(this, to);
  }
  getFormatFlags(e, r) {
    return hn(this.getFormat(), e, r);
  }
  hasFormat(e) {
    const r = Fl[e];
    return (this.getFormat() & r) !== 0;
  }
  setFormat(e) {
    return Ul(this, to, e);
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
function mw(t) {
  return t instanceof Yi;
}
Se({ name: "@lexical/extension/DecoratorText", nodes: () => [Yi], register: (t, e, r) => t.registerCommand(Ei, (o) => {
  const n = ue();
  if (Ti(n) || Fe(n)) for (const s of n.getNodes()) mw(s) && s.toggleFormat(o);
  return !1;
}, Si) });
function Zi(t, e) {
  let r;
  return Jr(t(), { unwatched() {
    r && (r(), r = void 0);
  }, watched() {
    this.value = t(), r = e(this);
  } });
}
const Co = Se({ build: (t) => Zi(() => t.getEditorState(), (e) => t.registerUpdateListener((r) => {
  e.value = r.editorState;
})), name: "@lexical/extension/EditorState" });
function mt(t, ...e) {
  const r = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const n of e) o.append("v", n);
  throw r.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
function Xi(t, e) {
  if (t && e && !Array.isArray(e) && typeof t == "object" && typeof e == "object") {
    const r = t, o = e;
    for (const n in o) r[n] = Xi(r[n], o[n]);
    return t;
  }
  return e;
}
const Go = 0, Eo = 1, Ji = 2, eo = 3, pa = 4, _r = 5, ro = 6, Br = 7;
function ao(t) {
  return t.id === Go;
}
function Qi(t) {
  return t.id === Ji;
}
function vw(t) {
  return function(e) {
    return e.id === Eo;
  }(t) || mt(305, String(t.id), String(Eo)), Object.assign(t, { id: Ji });
}
const bw = /* @__PURE__ */ new Set();
class xw {
  constructor(e, r) {
    oe(this, "builder");
    oe(this, "configs");
    oe(this, "_dependency");
    oe(this, "_peerNameSet");
    oe(this, "extension");
    oe(this, "state");
    oe(this, "_signal");
    this.builder = e, this.extension = r, this.configs = /* @__PURE__ */ new Set(), this.state = { id: Go };
  }
  mergeConfigs() {
    let e = this.extension.config || {};
    const r = this.extension.mergeConfig ? this.extension.mergeConfig.bind(this.extension) : Sl;
    for (const o of this.configs) e = r(e, o);
    return e;
  }
  init(e) {
    const r = this.state;
    Qi(r) || mt(306, String(r.id));
    const o = { getDependency: this.getInitDependency.bind(this), getDirectDependentNames: this.getDirectDependentNames.bind(this), getPeer: this.getInitPeer.bind(this), getPeerNameSet: this.getPeerNameSet.bind(this) }, n = { ...o, getDependency: this.getDependency.bind(this), getInitResult: this.getInitResult.bind(this), getPeer: this.getPeer.bind(this) }, s = function(c, d, l) {
      return Object.assign(c, { config: d, id: eo, registerState: l });
    }(r, this.mergeConfigs(), o);
    let i;
    this.state = s, this.extension.init && (i = this.extension.init(e, s.config, o)), this.state = function(c, d, l) {
      return Object.assign(c, { id: pa, initResult: d, registerState: l });
    }(s, i, n);
  }
  build(e) {
    const r = this.state;
    let o;
    r.id !== pa && mt(307, String(r.id), String(_r)), this.extension.build && (o = this.extension.build(e, r.config, r.registerState));
    const n = { ...r.registerState, getOutput: () => o, getSignal: this.getSignal.bind(this) };
    this.state = function(s, i, c) {
      return Object.assign(s, { id: _r, output: i, registerState: c });
    }(r, o, n);
  }
  register(e, r) {
    this._signal = r;
    const o = this.state;
    o.id !== _r && mt(308, String(o.id), String(_r));
    const n = this.extension.register && this.extension.register(e, o.config, o.registerState);
    return this.state = function(s) {
      return Object.assign(s, { id: ro });
    }(o), () => {
      const s = this.state;
      s.id !== Br && mt(309, String(o.id), String(Br)), this.state = function(i) {
        return Object.assign(i, { id: _r });
      }(s), n && n();
    };
  }
  afterRegistration(e) {
    const r = this.state;
    let o;
    return r.id !== ro && mt(310, String(r.id), String(ro)), this.extension.afterRegistration && (o = this.extension.afterRegistration(e, r.config, r.registerState)), this.state = function(n) {
      return Object.assign(n, { id: Br });
    }(r), o;
  }
  getSignal() {
    return this._signal === void 0 && mt(311), this._signal;
  }
  getInitResult() {
    this.extension.init === void 0 && mt(312, this.extension.name);
    const e = this.state;
    return function(r) {
      return r.id >= pa;
    }(e) || mt(313, String(e.id), String(pa)), e.initResult;
  }
  getInitPeer(e) {
    const r = this.builder.extensionNameMap.get(e);
    return r ? r.getExtensionInitDependency() : void 0;
  }
  getExtensionInitDependency() {
    const e = this.state;
    return function(r) {
      return r.id >= eo;
    }(e) || mt(314, String(e.id), String(eo)), { config: e.config };
  }
  getPeer(e) {
    const r = this.builder.extensionNameMap.get(e);
    return r ? r.getExtensionDependency() : void 0;
  }
  getInitDependency(e) {
    const r = this.builder.getExtensionRep(e);
    return r === void 0 && mt(315, this.extension.name, e.name), r.getExtensionInitDependency();
  }
  getDependency(e) {
    const r = this.builder.getExtensionRep(e);
    return r === void 0 && mt(315, this.extension.name, e.name), r.getExtensionDependency();
  }
  getState() {
    const e = this.state;
    return function(r) {
      return r.id >= Br;
    }(e) || mt(316, String(e.id), String(Br)), e;
  }
  getDirectDependentNames() {
    return this.builder.incomingEdges.get(this.extension.name) || bw;
  }
  getPeerNameSet() {
    let e = this._peerNameSet;
    return e || (e = new Set((this.extension.peerDependencies || []).map(([r]) => r)), this._peerNameSet = e), e;
  }
  getExtensionDependency() {
    if (!this._dependency) {
      const e = this.state;
      (function(r) {
        return r.id >= _r;
      })(e) || mt(317, this.extension.name), this._dependency = { config: e.config, init: e.initResult, output: e.output };
    }
    return this._dependency;
  }
}
const Sn = { tag: Bo };
function yw() {
  const t = cr();
  t.isEmpty() && t.append(ea());
}
const kw = Se({ config: yr({ setOptions: Sn, updateOptions: Sn }), init: ({ $initialEditorState: t = yw }) => ({ $initialEditorState: t, initialized: !1 }), afterRegistration(t, { updateOptions: e, setOptions: r }, o) {
  const n = o.getInitResult();
  if (!n.initialized) {
    n.initialized = !0;
    const { $initialEditorState: s } = n;
    if (Il(s)) t.setEditorState(s, r);
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
}, name: "@lexical/extension/InitialState", nodes: [Ol, ki, Dl, Ml, yi] }), Rn = Symbol.for("@lexical/extension/LexicalBuilder");
function On() {
}
function _w(t) {
  throw t;
}
function ha(t) {
  return Array.isArray(t) ? t : [t];
}
const oo = "0.43.0+prod.esm";
class Sr {
  constructor(e) {
    oe(this, "roots");
    oe(this, "extensionNameMap");
    oe(this, "outgoingConfigEdges");
    oe(this, "incomingEdges");
    oe(this, "conflicts");
    oe(this, "_sortedExtensionReps");
    oe(this, "PACKAGE_VERSION");
    this.outgoingConfigEdges = /* @__PURE__ */ new Map(), this.incomingEdges = /* @__PURE__ */ new Map(), this.extensionNameMap = /* @__PURE__ */ new Map(), this.conflicts = /* @__PURE__ */ new Map(), this.PACKAGE_VERSION = oo, this.roots = e;
    for (const r of e) this.addExtension(r);
  }
  static fromExtensions(e) {
    const r = [ha(kw)];
    for (const o of e) r.push(ha(o));
    return new Sr(r);
  }
  static maybeFromEditor(e) {
    const r = e[Rn];
    return r && (r.PACKAGE_VERSION !== oo && mt(292, r.PACKAGE_VERSION, oo), r instanceof Sr || mt(293)), r;
  }
  static fromEditor(e) {
    const r = Sr.maybeFromEditor(e);
    return r === void 0 && mt(294), r;
  }
  constructEditor() {
    const { $initialEditorState: e, onError: r, ...o } = this.buildCreateEditorArgs(), n = Object.assign(xi({ ...o, ...r ? { onError: (s) => {
      r(s, n);
    } } : {} }), { [Rn]: this });
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
    return e = Ze(this.registerEditor(o), () => o.setRootElement(null)), o;
  }
  hasExtensionByName(e) {
    return this.extensionNameMap.has(e);
  }
  getExtensionRep(e) {
    const r = this.extensionNameMap.get(e.name);
    if (r) return r.extension !== e && mt(295, e.name), r;
  }
  addEdge(e, r, o) {
    const n = this.outgoingConfigEdges.get(e);
    n ? n.set(r, o) : this.outgoingConfigEdges.set(e, /* @__PURE__ */ new Map([[r, o]]));
    const s = this.incomingEdges.get(r);
    s ? s.add(e) : this.incomingEdges.set(r, /* @__PURE__ */ new Set([e]));
  }
  addExtension(e) {
    this._sortedExtensionReps !== void 0 && mt(296);
    const r = ha(e), [o] = r;
    typeof o.name != "string" && mt(297, typeof o.name);
    let n = this.extensionNameMap.get(o.name);
    if (n !== void 0 && n.extension !== o && mt(298, o.name), !n) {
      n = new xw(this, o), this.extensionNameMap.set(o.name, n);
      const s = this.conflicts.get(o.name);
      typeof s == "string" && mt(299, o.name, s);
      for (const i of o.conflictsWith || []) this.extensionNameMap.has(i) && mt(299, o.name, i), this.conflicts.set(i, o.name);
      for (const i of o.dependencies || []) {
        const c = ha(i);
        this.addEdge(o.name, c[0].name, c.slice(1)), this.addExtension(c);
      }
      for (const [i, c] of o.peerDependencies || []) this.addEdge(o.name, i, c ? [c] : []);
    }
  }
  sortedExtensionReps() {
    if (this._sortedExtensionReps) return this._sortedExtensionReps;
    const e = [], r = (o, n) => {
      let s = o.state;
      if (Qi(s)) return;
      const i = o.extension.name;
      var c;
      ao(s) || mt(300, i, n || "[unknown]"), ao(c = s) || mt(304, String(c.id), String(Go)), s = Object.assign(c, { id: Eo }), o.state = s;
      const d = this.outgoingConfigEdges.get(i);
      if (d) for (const l of d.keys()) {
        const w = this.extensionNameMap.get(l);
        w && r(w, i);
      }
      s = vw(s), o.state = s, e.push(o);
    };
    for (const o of this.extensionNameMap.values()) ao(o.state) && r(o);
    for (const o of e) for (const [n, s] of this.outgoingConfigEdges.get(o.extension.name) || []) if (s.length > 0) {
      const i = this.extensionNameMap.get(n);
      if (i) for (const c of s) i.configs.add(c);
    }
    for (const [o, ...n] of this.roots) if (n.length > 0) {
      const s = this.extensionNameMap.get(o.name);
      s === void 0 && mt(301, o.name);
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
    return Ze(...n);
  }
  buildCreateEditorArgs() {
    const e = {}, r = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map(), s = {}, i = {}, c = this.sortedExtensionReps();
    for (const w of c) {
      const { extension: p } = w;
      if (p.onError !== void 0 && (e.onError = p.onError), p.disableEvents !== void 0 && (e.disableEvents = p.disableEvents), p.parentEditor !== void 0 && (e.parentEditor = p.parentEditor), p.editable !== void 0 && (e.editable = p.editable), p.namespace !== void 0 && (e.namespace = p.namespace), p.$initialEditorState !== void 0 && (e.$initialEditorState = p.$initialEditorState), p.nodes) for (const h of fw(p)) {
        if (typeof h != "function") {
          const v = o.get(h.replace);
          v && mt(302, p.name, h.replace.name, v.extension.name), o.set(h.replace, w);
        }
        r.add(h);
      }
      if (p.html) {
        if (p.html.export) for (const [h, v] of p.html.export.entries()) n.set(h, v);
        p.html.import && Object.assign(s, p.html.import);
      }
      p.theme && Xi(i, p.theme);
    }
    Object.keys(i).length > 0 && (e.theme = i), r.size && (e.nodes = [...r]);
    const d = Object.keys(s).length > 0, l = n.size > 0;
    (d || l) && (e.html = {}, d && (e.html.import = s), l && (e.html.export = n));
    for (const w of c) w.init(e);
    return e.onError || (e.onError = _w), e;
  }
}
const Nw = /* @__PURE__ */ new Set(), Dn = Se({ build(t, e, r) {
  const o = r.getDependency(Co).output, n = Jr({ watchedNodeKeys: /* @__PURE__ */ new Map() }), s = Zi(() => {
  }, () => Ue(() => {
    const i = s.peek(), { watchedNodeKeys: c } = n.value;
    let d, l = !1;
    o.value.read(() => {
      if (ue()) for (const [w, p] of c.entries()) {
        if (p.size === 0) {
          c.delete(w);
          continue;
        }
        const h = Hl(w), v = h && h.isSelected() || !1;
        l = l || v !== (!!i && i.has(w)), v && (d = d || /* @__PURE__ */ new Set(), d.add(w));
      }
    }), !l && d && i && d.size === i.size || (s.value = d);
  }));
  return { watchNodeKey: function(i) {
    const c = hw(() => (s.value || Nw).has(i)), { watchedNodeKeys: d } = n.peek();
    let l = d.get(i);
    const w = l !== void 0;
    return l = l || /* @__PURE__ */ new Set(), l.add(c), w || (d.set(i, l), n.value = { watchedNodeKeys: d }), c;
  } };
}, dependencies: [Co], name: "@lexical/extension/NodeSelection" }), Cw = Pl("INSERT_HORIZONTAL_RULE_COMMAND");
class Rr extends fo {
  static getType() {
    return "horizontalrule";
  }
  static clone(e) {
    return new Rr(e.__key);
  }
  static importJSON(e) {
    return Wo().updateFromJSON(e);
  }
  static importDOM() {
    return { hr: () => ({ conversion: Ew, priority: 0 }) };
  }
  exportDOM() {
    return { element: document.createElement("hr") };
  }
  createDOM(e) {
    const r = document.createElement("hr");
    return Ri(r, e.theme.hr), r;
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
function Ew() {
  return { node: Wo() };
}
function Wo() {
  return Kl(Rr);
}
function Tw(t) {
  return t instanceof Rr;
}
Se({ dependencies: [Co, Dn], name: "@lexical/extension/HorizontalRule", nodes: () => [Rr], register(t, e, r) {
  const { watchNodeKey: o } = r.getDependency(Dn).output, n = Jr({ nodeSelections: /* @__PURE__ */ new Map() }), s = t._config.theme.hrSelected ?? "selected";
  return Ze(t.registerCommand(Cw, (i) => {
    const c = ue();
    if (!Fe(c)) return !1;
    if (c.focus.getNode() !== null) {
      const d = Wo();
      cw(d);
    }
    return !0;
  }, jo), t.registerCommand(zl, (i) => {
    if (Al(i.target)) {
      const c = $l(i.target);
      if (Tw(c)) return function(d, l = !1) {
        const w = ue(), p = d.isSelected(), h = d.getKey();
        let v;
        l && Ti(w) ? v = w : (v = Vl(), Ll(v)), p ? v.delete(h) : v.add(h);
      }(c, i.shiftKey), !0;
    }
    return !1;
  }, Si), t.registerMutationListener(Rr, (i, c) => {
    uw(() => {
      let d = !1;
      const { nodeSelections: l } = n.peek();
      for (const [w, p] of i.entries()) if (p === "destroyed") l.delete(w), d = !0;
      else {
        const h = l.get(w), v = t.getElementByKey(w);
        h ? h.domNode.value = v : (d = !0, l.set(w, { domNode: Jr(v), selectedSignal: o(w) }));
      }
      d && (n.value = { nodeSelections: l });
    });
  }), Ue(() => {
    const i = [];
    for (const { domNode: c, selectedSignal: d } of n.value.nodeSelections.values()) i.push(Ue(() => {
      const l = c.value;
      l && (d.value ? Ri(l, s) : ql(l, s));
    }));
    return Ze(...i);
  }));
} });
Se({ build: (t, e) => Ar({ inheritEditableFromParent: e.inheritEditableFromParent }), config: yr({ $getParentEditor: function() {
  const t = Bl();
  return Sr.fromEditor(t), t;
}, inheritEditableFromParent: !1 }), init: (t, e, r) => {
  const o = e.$getParentEditor();
  t.parentEditor = o, t.theme = t.theme || o._config.theme;
}, name: "@lexical/extension/NestedEditor", register: (t, e, r) => Ue(() => {
  const o = t._parentEditor;
  if (o && r.getOutput().inheritEditableFromParent.value) return t.setEditable(o.isEditable()), o.registerEditableListener(t.setEditable.bind(t));
}) });
Se({ build: (t, e, r) => Ar(e), config: yr({ disabled: !1, onReposition: void 0 }), name: "@lexical/utils/SelectionAlwaysOnDisplay", register: (t, e, r) => {
  const o = r.getOutput();
  return Ue(() => {
    if (!o.disabled.value) return iw(t, o.onReposition.value);
  });
} });
function ts(t) {
  return t.canBeEmpty();
}
function Sw(t, e, r = ts) {
  return Ze(t.registerCommand(Gl, (o) => {
    const n = ue();
    if (!Fe(n)) return !1;
    o.preventDefault();
    const s = function(i) {
      if (i.getNodes().filter((h) => Wl(h) && h.canIndent()).length > 0) return !0;
      const c = i.anchor, d = i.focus, l = d.isBefore(c) ? d : c, w = l.getNode(), p = sw(w);
      if (p.canIndent()) {
        const h = p.getKey();
        let v = Yl();
        if (v.anchor.set(h, 0, "element"), v.focus.set(h, 0, "element"), v = Zl(v), v.anchor.is(l)) return !0;
      }
      return !1;
    }(n) ? o.shiftKey ? Xl : gn : Jl;
    return t.dispatchCommand(s, void 0);
  }, jo), t.registerCommand(gn, () => {
    const o = typeof e == "number" ? e : e ? e.peek() : null, n = ue();
    if (!Fe(n)) return !1;
    const s = typeof r == "function" ? r : r.peek();
    return dw((i) => {
      if (s(i)) {
        const c = i.getIndent() + 1;
        (!o || c < o) && i.setIndent(c);
      }
    });
  }, Fo));
}
Se({ build: (t, e, r) => Ar(e), config: yr({ $canIndent: ts, disabled: !1, maxIndent: null }), name: "@lexical/extension/TabIndentation", register(t, e, r) {
  const { disabled: o, maxIndent: n, $canIndent: s } = r.getOutput();
  return Ue(() => {
    if (!o.value) return Sw(t, n, s);
  });
} });
const Rw = Se({ name: "@lexical/react/ReactProvider" });
function Ow() {
  return cr().getTextContent();
}
function Dw(t, e = !0) {
  if (t) return !1;
  let r = Ow();
  return e && (r = r.trim()), r === "";
}
function Mw(t) {
  if (!Dw(t, !1)) return !1;
  const e = cr().getChildren(), r = e.length;
  if (r > 1) return !1;
  for (let o = 0; o < r; o++) {
    const n = e[o];
    if (Ql(n)) return !1;
    if (Xr(n)) {
      if (!td(n) || n.__indent !== 0) return !1;
      const s = n.getChildren(), i = s.length;
      for (let c = 0; c < i; c++) {
        const d = s[o];
        if (!mo(d)) return !1;
      }
    }
  }
  return !0;
}
function es(t) {
  return () => Mw(t);
}
function rs(t) {
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
            const [l, w, p, h, v] = d;
            t.update(() => {
              const y = ue();
              if (Fe(y)) {
                const f = y.anchor;
                let m = f.getNode(), N = 0, T = 0;
                if (mo(m) && l >= 0 && w >= 0 && (N = l, T = l + w, y.setTextNodeRange(m, N, m, T)), N === T && p === "" || (y.insertRawText(p), m = f.getNode()), mo(m)) {
                  N = h, T = h + v;
                  const D = m.getTextContentSize();
                  N = N > D ? D : N, T = T > D ? D : T, y.setTextNodeRange(m, N, m, T);
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
Se({ build: (t, e, r) => Ar(e), config: yr({ disabled: typeof window > "u" }), name: "@lexical/dragon", register: (t, e, r) => Ue(() => r.getOutput().disabled.value ? void 0 : rs(t)) });
function Iw(t, ...e) {
  const r = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const n of e) o.append("v", n);
  throw r.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
const Yo = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Lt : Z;
function Pw({ editor: t, ErrorBoundary: e }) {
  return function(r, o) {
    const [n, s] = C(() => r.getDecorators());
    return Yo(() => r.registerDecoratorListener((i) => {
      nd(() => {
        s(i);
      });
    }), [r]), Z(() => {
      s(r.getDecorators());
    }, [r]), V(() => {
      const i = [], c = Object.keys(n);
      for (let d = 0; d < c.length; d++) {
        const l = c[d], w = a(o, { onError: (h) => r._onError(h), children: a(nl, { fallback: null, children: n[l] }) }), p = r.getElementByKey(l);
        p !== null && i.push(id(w, p, l));
      }
      return i;
    }, [o, n, r]);
  }(t, e);
}
function zw({ editor: t, ErrorBoundary: e }) {
  return function(r) {
    const o = Sr.maybeFromEditor(r);
    if (o && o.hasExtensionByName(Rw.name)) {
      for (const n of ["@lexical/plain-text", "@lexical/rich-text"]) o.hasExtensionByName(n) && Iw(320, n);
      return !0;
    }
    return !1;
  }(t) ? null : a(Pw, { editor: t, ErrorBoundary: e });
}
function Mn(t) {
  return t.getEditorState().read(es(t.isComposing()));
}
function Aw({ contentEditable: t, placeholder: e = null, ErrorBoundary: r }) {
  const [o] = qe();
  return function(n) {
    Yo(() => Ze(od(n), rs(n)), [n]);
  }(o), u(xt, { children: [t, a($w, { content: e }), a(zw, { editor: o, ErrorBoundary: r })] });
}
function $w({ content: t }) {
  const [e] = qe(), r = function(n) {
    const [s, i] = C(() => Mn(n));
    return Yo(() => {
      function c() {
        const d = Mn(n);
        i(d);
      }
      return c(), Ze(n.registerUpdateListener(() => {
        c();
      }), n.registerEditableListener(() => {
        c();
      }));
    }, [n]), s;
  }(e), o = Qd();
  return r ? typeof t == "function" ? t(o) : t : null;
}
function Vw({ defaultSelection: t }) {
  const [e] = qe();
  return Z(() => {
    e.focus(() => {
      const r = document.activeElement, o = e.getRootElement();
      o === null || r !== null && o.contains(r) || o.focus({ preventScroll: !0 });
    }, { defaultSelection: t });
  }, [t, e]), null;
}
const Lw = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Lt : Z;
function Bw({ onClear: t }) {
  const [e] = qe();
  return Lw(() => Wi(e, t), [e, t]), null;
}
const as = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Lt : Z;
function jw({ editor: t, ariaActiveDescendant: e, ariaAutoComplete: r, ariaControls: o, ariaDescribedBy: n, ariaErrorMessage: s, ariaExpanded: i, ariaInvalid: c, ariaLabel: d, ariaLabelledBy: l, ariaMultiline: w, ariaOwns: p, ariaRequired: h, autoCapitalize: v, className: y, id: f, role: m = "textbox", spellCheck: N = !0, style: T, tabIndex: D, "data-testid": E, ...L }, S) {
  const [z, I] = C(t.isEditable()), R = $((J) => {
    J && J.ownerDocument && J.ownerDocument.defaultView ? t.setRootElement(J) : t.setRootElement(null);
  }, [t]), O = V(() => /* @__PURE__ */ function(...J) {
    return (et) => {
      for (const rt of J) typeof rt == "function" ? rt(et) : rt != null && (rt.current = et);
    };
  }(S, R), [R, S]);
  return as(() => (I(t.isEditable()), t.registerEditableListener((J) => {
    I(J);
  })), [t]), a("div", { "aria-activedescendant": z ? e : void 0, "aria-autocomplete": z ? r : "none", "aria-controls": z ? o : void 0, "aria-describedby": n, ...s != null ? { "aria-errormessage": s } : {}, "aria-expanded": z && m === "combobox" ? !!i : void 0, ...c != null ? { "aria-invalid": c } : {}, "aria-label": d, "aria-labelledby": l, "aria-multiline": w, "aria-owns": z ? p : void 0, "aria-readonly": !z || void 0, "aria-required": h, autoCapitalize: v, className: y, contentEditable: z, "data-testid": E, id: f, ref: O, role: m, spellCheck: N, style: T, tabIndex: D, ...L });
}
const Fw = Lo(jw);
function In(t) {
  return t.getEditorState().read(es(t.isComposing()));
}
const Uw = Lo(Kw);
function Kw(t, e) {
  const { placeholder: r, ...o } = t, [n] = qe();
  return u(xt, { children: [a(Fw, { editor: n, ...o, ref: e }), r != null && a(Hw, { editor: n, content: r })] });
}
function Hw({ content: t, editor: e }) {
  const r = function(i) {
    const [c, d] = C(() => In(i));
    return as(() => {
      function l() {
        const w = In(i);
        d(w);
      }
      return l(), Ze(i.registerUpdateListener(() => {
        l();
      }), i.registerEditableListener(() => {
        l();
      }));
    }, [i]), c;
  }(e), [o, n] = C(e.isEditable());
  if (Lt(() => (n(e.isEditable()), e.registerEditableListener((i) => {
    n(i);
  })), [e]), !r) return null;
  let s = null;
  return typeof t == "function" ? s = t(o) : t !== null && (s = t), s === null ? null : a("div", { "aria-hidden": !0, children: s });
}
function qw({
  placeholder: t,
  className: e,
  placeholderClassName: r
}) {
  return /* @__PURE__ */ a(
    Uw,
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
const os = zr(void 0);
function Gw({
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
  return /* @__PURE__ */ a(os.Provider, { value: i, children: s });
}
function ns() {
  const t = ta(os);
  if (!t)
    throw new Error("useToolbarContext must be used within a ToolbarContext provider");
  return t;
}
function Ww() {
  const [t, e] = C(void 0), r = $(() => {
    e(void 0);
  }, []), o = V(() => {
    if (t === void 0)
      return;
    const { title: s, content: i } = t;
    return /* @__PURE__ */ a(lo, { open: !0, onOpenChange: r, children: /* @__PURE__ */ u(wo, { children: [
      /* @__PURE__ */ a(uo, { children: /* @__PURE__ */ a(po, { children: s }) }),
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
function Yw({
  children: t
}) {
  const [e] = qe(), [r, o] = C(e), [n, s] = C("paragraph"), [i, c] = Ww(), d = () => {
  };
  return Z(() => r.registerCommand(
    Oi,
    (l, w) => (o(w), !1),
    Fo
  ), [r]), /* @__PURE__ */ u(
    Gw,
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
function Zw(t) {
  const [e] = qe(), { activeEditor: r } = ns();
  Z(() => r.registerCommand(
    Oi,
    () => {
      const o = ue();
      return o && t(o), !1;
    },
    Fo
  ), [e, t]), Z(() => {
    r.getEditorState().read(() => {
      const o = ue();
      o && t(o);
    });
  }, [r, t]);
}
const Pn = [
  { format: "bold", icon: hc, label: "Bold" },
  { format: "italic", icon: gc, label: "Italic" }
  // CUSTOM: TJ removed underline and strikethrough as they are not supported by the current comment
  // data conversion and are not in P9 anyway. We can add these back if we ever get this supported.
  /* { format: 'underline', icon: UnderlineIcon, label: 'Underline' },
  { format: 'strikethrough', icon: StrikethroughIcon, label: 'Strikethrough' }, */
];
function Xw() {
  const { activeEditor: t } = ns(), [e, r] = C([]), o = $((n) => {
    if (Fe(n) || sd(n)) {
      const s = [];
      Pn.forEach(({ format: i }) => {
        n.hasFormat(i) && s.push(i);
      }), r((i) => i.length !== s.length || !s.every((c) => i.includes(c)) ? s : i);
    }
  }, []);
  return Zw(o), /* @__PURE__ */ a(
    Qn,
    {
      type: "multiple",
      value: e,
      onValueChange: r,
      variant: "outline",
      size: "sm",
      children: Pn.map(({ format: n, icon: s, label: i }) => /* @__PURE__ */ a(
        fa,
        {
          value: n,
          "aria-label": i,
          onClick: () => {
            t.dispatchCommand(Ei, n);
          },
          children: /* @__PURE__ */ a(s, { className: "tw:h-4 tw:w-4" })
        },
        n
      ))
    }
  );
}
const is = "data-platform-content-zoom-root", Uh = "data-platform-content-zoom-scope", ss = "data-platform-content-zoom-label", cs = zr(void 0);
function Kh({ area: t, label: e, children: r }) {
  const o = V(
    () => ({
      [is]: t ?? "",
      // An empty label names nothing, so it writes no attribute, as on `ContentZoomRoot`.
      ...e ? { [ss]: e } : {}
    }),
    [t, e]
  );
  return /* @__PURE__ */ a(cs.Provider, { value: o, children: r });
}
function $r() {
  return ta(cs) ?? {};
}
function Jw({ onClear: t }) {
  const [e] = qe();
  Z(() => {
    t && t(() => {
      e.dispatchCommand(Ci, void 0);
    });
  }, [e, t]);
}
function Qw({
  placeholder: t = "Start typing ...",
  autoFocus: e = !1,
  onClear: r,
  actions: o
}) {
  const n = $r(), [, s] = C(void 0);
  return /* @__PURE__ */ u("div", { className: "tw:relative", children: [
    /* @__PURE__ */ a(Yw, { children: () => (
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
          children: /* @__PURE__ */ a(Xw, {})
        }
      )
    ) }),
    /* @__PURE__ */ u("div", { className: "tw:relative", children: [
      /* @__PURE__ */ a(
        Aw,
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
                children: /* @__PURE__ */ a(qw, { placeholder: t })
              }
            )
          ),
          ErrorBoundary: Zd
        }
      ),
      e && /* @__PURE__ */ a(Vw, { defaultSelection: "rootEnd" }),
      /* @__PURE__ */ a(Jw, { onClear: r }),
      /* @__PURE__ */ a(Bw, {})
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
const tu = {
  namespace: "commentEditor",
  theme: Ko,
  nodes: Ho,
  onError: (t) => {
    console.error(t);
  }
};
function Ma({
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
  const [l] = C(() => ({
    ...tu,
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
        className: x(
          "pr-twp tw:overflow-hidden tw:rounded-lg tw:border tw:bg-background tw:shadow",
          c
        ),
        children: /* @__PURE__ */ a(Kd, { initialConfig: l, children: /* @__PURE__ */ u(Pt, { children: [
          /* @__PURE__ */ a(
            Qw,
            {
              placeholder: n,
              autoFocus: s,
              onClear: i,
              actions: d
            }
          ),
          /* @__PURE__ */ a(qd, { ignoreSelectionChange: !0, onChange: w })
        ] }) })
      }
    )
  );
}
function ls(t) {
  const e = t.querySelector('[contenteditable="true"]');
  if (!e) return !1;
  e.focus();
  const r = window.getSelection(), o = document.createRange();
  return o.selectNodeContents(e), o.collapse(!1), r == null || r.removeAllRanges(), r == null || r.addRange(o), !0;
}
function ds(t) {
  return t ? t.some(
    (e) => e && "text" in e && e.text.trim().length > 0 ? !0 : !e || !("children" in e) ? !1 : ds(e.children)
  ) : !1;
}
function ve(t) {
  var e;
  return (e = t == null ? void 0 : t.root) != null && e.children ? ds(t.root.children) : !1;
}
function eu(t) {
  if (!t || t.trim() === "")
    throw new Error("Input HTML is empty");
  const e = Di({
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
      const n = new DOMParser().parseFromString(t, "text/html"), s = ld(e, n);
      cr().clear(), ed(s);
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
function Ia(t) {
  const e = Di({
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
    o = cd(e);
  }), o = o.replace(/\s+style="[^"]*"/g, "").replace(/\s+class="[^"]*"/g, "").replace(/<span>(.*?)<\/span>/g, "$1").replace(/<b><strong[^>]*>(.*?)<\/strong><\/b>/g, "<b>$1</b>").replace(/<strong><b[^>]*>(.*?)<\/b><\/strong>/g, "<b>$1</b>").replace(/<i><em[^>]*>(.*?)<\/em><\/i>/g, "<i>$1</i>").replace(/<em><i[^>]*>(.*?)<\/i><\/em>/g, "<i>$1</i>").replace(/<u><span[^>]*>(.*?)<\/span><\/u>/g, "<u>$1</u>").replace(/<s><span[^>]*>(.*?)<\/span><\/s>/g, "<s>$1</s>").replace(/<br\s*\/?>/gi, "<br/>"), o;
}
function Zo(t) {
  return ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Home", "End"].includes(t.key) ? (t.stopPropagation(), !0) : !1;
}
const ws = Object.freeze([
  "%cancelButton_tooltip%",
  "%acceptButton_tooltip%"
]), zn = (t, e) => t[e] ?? e;
function us({
  onCancelClick: t,
  onAcceptClick: e,
  canAccept: r = !0,
  localizedStrings: o = {},
  className: n = "tw:h-6 tw:w-6",
  acceptLabel: s
}) {
  const i = zn(o, "%cancelButton_tooltip%"), c = s ?? zn(o, "%acceptButton_tooltip%");
  return /* @__PURE__ */ u(Aa, { children: [
    /* @__PURE__ */ a(Pt, { children: /* @__PURE__ */ u(_t, { children: [
      /* @__PURE__ */ a(Nt, { asChild: !0, children: /* @__PURE__ */ a(
        ot,
        {
          "aria-label": i,
          className: n,
          size: "icon",
          onClick: t,
          variant: "secondary",
          children: /* @__PURE__ */ a(si, {})
        }
      ) }),
      /* @__PURE__ */ a(Ct, { children: /* @__PURE__ */ a("p", { children: i }) })
    ] }) }),
    /* @__PURE__ */ a(Ro, {}),
    /* @__PURE__ */ a(Pt, { children: /* @__PURE__ */ u(_t, { children: [
      /* @__PURE__ */ a(Nt, { asChild: !0, children: /* @__PURE__ */ a(
        ot,
        {
          "aria-label": c,
          className: n,
          size: "icon",
          onClick: e,
          disabled: !r,
          children: /* @__PURE__ */ a(sr, {})
        }
      ) }),
      /* @__PURE__ */ a(Ct, { children: /* @__PURE__ */ a("p", { children: c }) })
    ] }) })
  ] });
}
const ru = "verseText", Hh = Object.freeze([
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
function Kr(t) {
  return t !== void 0 && Object.keys(t).length > 0;
}
function An(t) {
  return t.editorState === void 0 && t.assignedUser === void 0 && !Kr(t.commentEdits);
}
const ps = [
  "tw:prose tw:max-w-none tw:break-words tw:text-sm tw:font-normal tw:text-foreground",
  "tw:[&>blockquote]:border-s-0 tw:[&>blockquote]:p-0 tw:[&>blockquote]:ps-0 tw:[&>blockquote]:font-normal tw:[&>blockquote]:not-italic tw:[&>blockquote]:text-foreground",
  "tw:prose-quoteless"
].join(" ");
function hs(t) {
  return (t == null ? void 0 : t.conflictType) === ru;
}
function gs(t) {
  return t === "replaced" ? "reject" : t === "merged" ? "merged" : "accept";
}
function ya(t, e) {
  return t === "" ? e["%comment_assign_unassigned%"] ?? "Unassigned" : t === "Team" ? e["%comment_assign_team%"] ?? "Team" : t;
}
function Xo(t) {
  const e = Do();
  return t.key === "Enter" && (e && t.metaKey || !e && t.ctrlKey);
}
function Te(t, e, r) {
  const o = e[t];
  return o === void 0 || o === t ? r : o;
}
const au = {
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
}, ou = {
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
function qh({
  assignableUsers: t,
  onSave: e,
  onClose: r,
  localizedStrings: o,
  initialAssignedUser: n
}) {
  const [s, i] = C(ou), [c, d] = C(n), [l, w] = C(!1), p = M(void 0), h = M(null);
  Z(() => {
    let m = !0;
    const N = h.current;
    if (!N) return;
    const T = setTimeout(() => {
      m && ls(N);
    }, 300);
    return () => {
      m = !1, clearTimeout(T);
    };
  }, []);
  const v = $(() => {
    if (!ve(s)) return;
    const m = Ia(s);
    e(m, c);
  }, [s, e, c]), y = o["%commentEditor_placeholder%"] ?? "Type your comment here...", f = o["%commentEditor_assignTo_label%"] ?? "Assign to";
  return /* @__PURE__ */ u("div", { className: "pr-twp tw:grid tw:gap-3", children: [
    /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:justify-between", children: [
      /* @__PURE__ */ a("span", { className: "tw:text-sm tw:font-medium", children: f }),
      /* @__PURE__ */ a(
        us,
        {
          onCancelClick: r,
          onAcceptClick: v,
          canAccept: ve(s),
          localizedStrings: o,
          acceptLabel: o["%commentEditor_saveButton_tooltip%"]
        }
      )
    ] }),
    /* @__PURE__ */ a("div", { className: "tw:flex tw:items-center tw:gap-2", children: /* @__PURE__ */ u(mr, { open: l, onOpenChange: w, children: [
      /* @__PURE__ */ a(Pr, { asChild: !0, children: /* @__PURE__ */ u(
        ot,
        {
          variant: "outline",
          className: "tw:flex tw:w-full tw:items-center tw:justify-start tw:gap-2",
          disabled: t.length === 0,
          children: [
            /* @__PURE__ */ a(ci, { className: "tw:h-4 tw:w-4" }),
            /* @__PURE__ */ a("span", { children: no(c !== void 0 ? c : "", o) })
          ]
        }
      ) }),
      /* @__PURE__ */ a(
        vr,
        {
          className: "tw:w-auto tw:p-0",
          align: "start",
          onKeyDown: (m) => {
            m.key === "Escape" && (m.stopPropagation(), w(!1));
          },
          children: /* @__PURE__ */ a(br, { children: /* @__PURE__ */ a(xr, { children: t.map((m) => /* @__PURE__ */ a(
            lr,
            {
              onSelect: () => {
                d(m || void 0), w(!1);
              },
              className: "tw:flex tw:items-center",
              children: /* @__PURE__ */ a("span", { children: no(m, o) })
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
          m.key === "Escape" ? (m.preventDefault(), m.stopPropagation(), r()) : Xo(m) && (m.preventDefault(), m.stopPropagation(), ve(s) && v());
        },
        onKeyDown: (m) => {
          Zo(m), (m.key === "Enter" || m.key === " ") && m.stopPropagation();
        },
        children: /* @__PURE__ */ a(
          Ma,
          {
            editorSerializedState: s,
            onSerializedChange: (m) => i(m),
            placeholder: y,
            onClear: (m) => {
              p.current = m;
            }
          }
        )
      }
    )
  ] });
}
const Gh = Object.freeze([
  "%commentEditor_placeholder%",
  "%commentEditor_assignTo_label%",
  "%commentEditor_saveButton_tooltip%",
  "%commentEditor_unassigned%",
  "%commentEditor_team%",
  ...ws
]), Wh = Object.freeze([
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
]), nu = "comment-list";
function Yh(t) {
  return t;
}
function iu({
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
function Zh({ className: t, ...e }) {
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
function Xh({ className: t, ...e }) {
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
function Jh({ className: t, ...e }) {
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
function su({ className: t, ...e }) {
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
function Qh({ className: t, ...e }) {
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
function Qr({
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
function cu({
  className: t,
  size: e = "default",
  ...r
}) {
  return /* @__PURE__ */ a(
    Uo.Root,
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
function tg({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    Uo.Image,
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
function lu({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    Uo.Fallback,
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
function $n({
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
  const w = $r(), [p, h] = C(), v = d ?? p, f = v !== void 0 && o, m = l !== void 0, N = $(
    (g) => {
      m || h(g), l == null || l(g);
    },
    [m, l]
  ), T = M(null), D = M(!1);
  Z(() => {
    if (!f || !D.current) return;
    D.current = !1;
    let g = !0;
    const j = T.current;
    if (!j) return;
    const F = setTimeout(() => {
      g && ls(j);
    }, 300);
    return () => {
      g = !1, clearTimeout(F);
    };
  }, [f]);
  const E = $(
    (g) => {
      g && g.stopPropagation(), N(void 0), i == null || i(!1);
    },
    [i, N]
  ), L = $(
    async (g) => {
      if (g && g.stopPropagation(), !v || !n) return;
      await n(
        t.id,
        Ia(v)
      ) && (N(void 0), i == null || i(!1));
    },
    [v, n, t.id, i, N]
  ), S = V(() => {
    const g = new Date(t.date), j = Yc(
      g,
      r["%comment_date_today%"],
      r["%comment_date_yesterday%"]
    ), F = g.toLocaleTimeString(void 0, {
      hour: "numeric",
      minute: "2-digit"
    });
    return or(r["%comment_dateAtTime%"], {
      date: j,
      time: F
    });
  }, [t.date, r]), z = V(() => t.user, [t.user]), I = V(
    () => t.user.split(" ").map((g) => g[0]).join("").toUpperCase().slice(0, 2),
    [t.user]
  ), R = V(() => Vo(t.contents), [t.contents]), O = V(
    () => t.contents.replace(/<[^>]*>/g, "").trim().length > 0,
    [t.contents]
  ), J = !!t.conflictResolutionAction && !O, et = V(() => {
    if (o && c)
      return /* @__PURE__ */ u(xt, { children: [
        /* @__PURE__ */ u(
          rr,
          {
            onClick: (g) => {
              g.stopPropagation(), D.current = !0;
              const j = t.contents.trim() !== "";
              N(j ? eu(t.contents) : au), i == null || i(!0);
            },
            children: [
              /* @__PURE__ */ a(fc, { className: "tw:me-2 tw:h-4 tw:w-4" }),
              r["%comment_editComment%"]
            ]
          }
        ),
        /* @__PURE__ */ u(
          rr,
          {
            onClick: async (g) => {
              g.stopPropagation(), s && await s(t.id);
            },
            children: [
              /* @__PURE__ */ a(mc, { className: "tw:me-2 tw:h-4 tw:w-4" }),
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
    N
  ]), rt = !ve(v);
  return /* @__PURE__ */ u(
    "div",
    {
      className: x("tw:flex tw:w-full tw:flex-row tw:items-baseline tw:gap-2", {
        "tw:text-sm": e
      }),
      children: [
        /* @__PURE__ */ a(cu, { className: "tw:h-8 tw:w-8", children: /* @__PURE__ */ a(lu, { className: "tw:text-xs tw:font-medium", children: I }) }),
        /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-1 tw:flex-col tw:gap-1", children: [
          /* @__PURE__ */ u("div", { className: "tw:flex tw:w-full tw:flex-row tw:flex-wrap tw:items-baseline tw:gap-x-2", children: [
            /* @__PURE__ */ a("p", { className: "tw:text-sm tw:font-medium", children: z }),
            /* @__PURE__ */ a("p", { className: "tw:text-xs tw:font-normal tw:text-muted-foreground", children: S }),
            /* @__PURE__ */ a("div", { className: "tw:flex-1" }),
            e && t.assignedUser !== void 0 && /* @__PURE__ */ u(Yr, { variant: "secondary", className: "tw:text-xs tw:font-normal", children: [
              "→ ",
              ya(t.assignedUser, r)
            ] })
          ] }),
          f && /* @__PURE__ */ a(
            "div",
            {
              role: "textbox",
              tabIndex: -1,
              className: "tw:flex tw:flex-col tw:gap-2",
              ref: T,
              onKeyDownCapture: (g) => {
                g.key === "Escape" ? (g.preventDefault(), g.stopPropagation(), E()) : Xo(g) && (g.preventDefault(), g.stopPropagation(), ve(v) && L());
              },
              onKeyDown: (g) => {
                Zo(g), (g.key === "Enter" || g.key === " ") && g.stopPropagation();
              },
              onClick: (g) => {
                g.stopPropagation();
              },
              children: /* @__PURE__ */ a(
                Ma,
                {
                  className: x(
                    // Don't render blockquote on the first child. All comments are wrapped in blockquote
                    // that has text-align corresponding to LTR or RTL, so the blockquote is important.
                    // But we don't want it to look like there's a blockquote there. Target the
                    // lowest-level Lexical editor element by attribute so Tailwind can apply styles to
                    // the blockquote directly inside the editor.
                    'tw:[&_[data-lexical-editor="true"]>blockquote]:mt-0 tw:[&_[data-lexical-editor="true"]>blockquote]:border-s-0 tw:[&_[data-lexical-editor="true"]>blockquote]:ps-0 tw:[&_[data-lexical-editor="true"]>blockquote]:font-normal tw:[&_[data-lexical-editor="true"]>blockquote]:not-italic tw:[&_[data-lexical-editor="true"]>blockquote]:text-foreground'
                  ),
                  editorSerializedState: v,
                  onSerializedChange: (g) => N(g),
                  actions: /* @__PURE__ */ u(xt, { children: [
                    /* @__PURE__ */ a("div", { className: "tw:flex-1" }),
                    /* @__PURE__ */ u(_t, { children: [
                      /* @__PURE__ */ a(Nt, { asChild: !0, children: /* @__PURE__ */ a(
                        ot,
                        {
                          size: "icon-sm",
                          onClick: E,
                          variant: "outline",
                          className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                          "aria-label": Te(
                            "%comment_aria_cancel_edit%",
                            r,
                            "Cancel edit"
                          ),
                          children: /* @__PURE__ */ a(vc, {})
                        }
                      ) }),
                      /* @__PURE__ */ a(Ct, { children: Te(
                        "%comment_aria_cancel_edit%",
                        r,
                        "Cancel edit"
                      ) })
                    ] }),
                    /* @__PURE__ */ u(_t, { children: [
                      /* @__PURE__ */ a(Nt, { asChild: !0, children: /* @__PURE__ */ a(
                        Qr,
                        {
                          isDisabled: rt,
                          disabledExplanation: Te(
                            "%comment_aria_save_edit%",
                            r,
                            "Save edit"
                          ),
                          className: "tw:inline-flex",
                          children: /* @__PURE__ */ a(
                            ot,
                            {
                              size: "icon-sm",
                              onClick: L,
                              className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                              disabled: rt,
                              "aria-label": Te(
                                "%comment_aria_save_edit%",
                                r,
                                "Save edit"
                              ),
                              children: /* @__PURE__ */ a(li, {})
                            }
                          )
                        }
                      ) }),
                      /* @__PURE__ */ a(Ct, { children: Te(
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
          !f && /* @__PURE__ */ u(xt, { children: [
            t.status === "Resolved" && !J && /* @__PURE__ */ a("div", { className: "tw:text-sm tw:italic", children: r["%comment_status_resolved%"] }),
            t.status === "Todo" && e && /* @__PURE__ */ a("div", { className: "tw:text-sm tw:italic", children: r["%comment_status_todo%"] }),
            J ? (
              // A platform-created conflict resolution comment carries an empty body — PT9 renders
              // its banner UI-side from conflictResolutionAction, it never stores text. So render the
              // localized, neutral outcome line here instead of the (empty) contents, styled like the
              // italic status lines above. These are the same neutral keys ConflictNoteCard's Result
              // region used to render inline. Only when the body IS empty: a resolution synced from
              // PT9 can carry the resolver's typed note alongside the action, and PT9 shows that text,
              // so the body branch below keeps it visible rather than discarding it for this banner.
              /* @__PURE__ */ a("div", { className: "tw:text-sm tw:italic", children: gs(t.conflictResolutionAction) === "merged" ? r["%conflict_note_outcome_combined%"] ?? "Combined both changes." : r["%conflict_note_outcome_used_other%"] ?? "Used the other change instead of the current text." })
            ) : /* @__PURE__ */ a(
              "div",
              {
                className: x(
                  // Shared note-body prose/blockquote treatment (also used by conflict-diff's
                  // DIFF_HTML_CLASSES). Layer this comment item's own extras on top: items-start +
                  // gap-2 for layout, and line-clamp while the thread is collapsed.
                  ps,
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
        et && /* @__PURE__ */ u(Xe, { children: [
          /* @__PURE__ */ a(je, { asChild: !0, children: /* @__PURE__ */ a(ot, { variant: "ghost", size: "icon", children: /* @__PURE__ */ a(bc, {}) }) }),
          /* @__PURE__ */ a(Je, { align: "end", children: et })
        ] })
      ]
    }
  );
}
function fs({
  show: t,
  disabled: e = !1,
  onClick: r,
  ariaLabel: o
}) {
  if (t)
    return /* @__PURE__ */ a(
      ot,
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
        children: /* @__PURE__ */ a(sr, { className: "tw:h-4 tw:w-4" })
      }
    );
}
const du = {
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
}, ms = mi(function({
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
  handleUpdateComment: v,
  handleDeleteComment: y,
  handleReadStatusChange: f,
  assignableUsers: m,
  canUserAddCommentToThread: N,
  canUserAssignThreadCallback: T,
  canUserResolveThreadCallback: D,
  canUserEditOrDeleteCommentCallback: E,
  isRead: L = !1,
  autoReadDelay: S = 5,
  onVerseRefClick: z,
  initialAssignedUser: I,
  activeComments: R,
  rootContentSlot: O,
  resolveActionSlot: J,
  spaceRootContentFromReplies: et = !1,
  draft: rt,
  onDraftChange: g
}) {
  var G;
  const j = $r(), [F, B] = C({}), X = rt ?? F, U = X.editorState ?? du, W = X.assignedUser, ct = g !== void 0, vt = M(X);
  vt.current = X;
  const Q = $(
    (_) => {
      const tt = { ...vt.current, ..._ };
      vt.current = tt, ct || B(tt), g == null || g(l, An(tt) ? void 0 : tt);
    },
    [ct, g, l]
  ), wt = $(
    (_, tt) => {
      const nt = { ...X.commentEdits };
      tt === void 0 ? delete nt[_] : nt[_] = tt, Q({
        commentEdits: Kr(nt) ? nt : void 0
      });
    },
    [X.commentEdits, Q]
  ), [ht, gt] = C(), ft = n, [Tt, zt] = C(!1), [ze, be] = C(!1), [Bt, lt] = C(!1), [Yt, xe] = C(!1), [pe, Jt] = C(!1), [ut, jt] = C(L), [ye, Zt] = C(!1), Ft = M(void 0), [se, Ae] = C(/* @__PURE__ */ new Map());
  Z(() => {
    let _ = !0;
    return (async () => {
      const nt = D ? await D(l) : !1;
      _ && Jt(nt);
    })(), () => {
      _ = !1;
    };
  }, [l, D]), Z(() => {
    let _ = !0;
    if (!n) {
      xe(!1), Ae(/* @__PURE__ */ new Map());
      return;
    }
    return (async () => {
      const nt = T ? await T(l) : !1;
      _ && xe(nt);
    })(), () => {
      _ = !1;
    };
  }, [n, l, T]);
  const bt = M("idle");
  Z(() => {
    if (!n) {
      bt.current !== "idle" && (Q({ assignedUser: void 0 }), gt(void 0), bt.current = "idle");
      return;
    }
    bt.current === "idle" && (bt.current = "pending"), Yt ? bt.current === "pending" && I !== void 0 && // Skip pre-population if the thread is already assigned to this user — doing so
    // would show "Assigning to: Alice" and enable the submit button for a no-op call.
    I !== i && (Q({ assignedUser: I }), bt.current = "auto-populated") : bt.current === "auto-populated" && (Q({ assignedUser: void 0 }), bt.current = "pending");
  }, [n, I, Yt, i, Q]);
  const he = M(ht);
  he.current = ht;
  const Qt = M(g);
  Qt.current = g;
  const A = M(l);
  A.current = l, Z(() => () => {
    var tt;
    const { current: _ } = vt;
    _.assignedUser !== void 0 && _.assignedUser === he.current && _.editorState === void 0 && !Kr(_.commentEdits) && ((tt = Qt.current) == null || tt.call(Qt, A.current, void 0));
  }, []);
  const pt = V(
    () => R ?? r.filter((_) => !_.deleted),
    [R, r]
  ), ke = V(() => {
    const { commentEdits: _ } = X;
    if (!_) return _;
    const tt = new Set(pt.map((yt) => yt.id)), nt = Object.fromEntries(
      Object.entries(_).filter(([yt]) => tt.has(yt))
    );
    return Kr(nt) ? nt : void 0;
  }, [X, pt]), Ot = ze || Kr(ke);
  Z(() => {
    let _ = !0;
    if (!n || !E) {
      Ae(/* @__PURE__ */ new Map());
      return;
    }
    return (async () => {
      const nt = /* @__PURE__ */ new Map();
      await Promise.all(
        pt.map(async (yt) => {
          const At = await E(yt.id);
          _ && nt.set(yt.id, At);
        })
      ), _ && Ae(nt);
    })(), () => {
      _ = !1;
    };
  }, [n, pt, E]);
  const Dt = V(() => pt[0], [pt]), _e = M(null), te = M(void 0), ee = $(() => {
    var _;
    (_ = te.current) == null || _.call(te), Q({ editorState: void 0 });
  }, [Q]), Re = $(
    (_) => {
      Q({ editorState: ve(_) ? _ : void 0 });
    },
    [Q]
  ), Oe = $(() => {
    const _ = !ut;
    jt(_), Zt(!_), f == null || f(l, _);
  }, [ut, f, l]);
  Z(() => {
    zt(!1);
  }, [n]), Z(() => {
    if (n && !ut && !ye && An(X)) {
      const _ = setTimeout(() => {
        jt(!0), f == null || f(l, !0);
      }, S * 1e3);
      return Ft.current = _, () => clearTimeout(_);
    }
    Ft.current && (clearTimeout(Ft.current), Ft.current = void 0);
  }, [
    n,
    ut,
    ye,
    S,
    l,
    f,
    X
  ]);
  const Ut = V(
    () => ({
      singleReply: o["%comment_thread_single_reply%"],
      multipleReplies: o["%comment_thread_multiple_replies%"]
    }),
    [o]
  ), ce = V(() => {
    if (i === void 0)
      return;
    if (i === "")
      return o["%comment_assign_unassigned%"] ?? "Unassigned";
    const _ = ya(i, o);
    return or(o["%comment_assigned_to%"], {
      assignedUser: _
    });
  }, [i, o]), St = V(() => pt.slice(1), [pt]), Rt = V(() => St.length ?? 0, [St.length]), ge = V(() => Rt > 0, [Rt]), fe = V(() => {
    if (Tt || Rt <= 2)
      return St;
    const _ = new Set(St.slice(-2).map((tt) => tt.id));
    return St.filter(
      (tt) => {
        var nt;
        return _.has(tt.id) || ((nt = X.commentEdits) == null ? void 0 : nt[tt.id]) !== void 0;
      }
    );
  }, [St, Rt, Tt, X.commentEdits]), me = V(() => Tt || Rt <= 2 ? 0 : Rt - fe.length, [Rt, Tt, fe.length]), $e = V(
    () => Rt === 1 ? Ut.singleReply : or(Ut.multipleReplies, { count: Rt }),
    [Rt, Ut]
  ), Ve = V(
    () => me === 1 ? Ut.singleReply : or(Ut.multipleReplies, { count: me }),
    [me, Ut]
  );
  Z(() => {
    !n && Ot && ge && be(!1);
  }, [n, Ot, ge]);
  const k = $(
    async (_) => {
      _ && _.stopPropagation();
      const tt = ve(U) ? Ia(U) : void 0;
      if (W !== void 0) {
        await h({
          threadId: l,
          contents: tt,
          assignedUser: W
        }) && (gt(W), tt && ee());
        return;
      }
      tt && await h({ threadId: l, contents: tt }) && ee();
    },
    [
      ee,
      U,
      h,
      W,
      l
    ]
  ), P = $(
    async (_) => {
      const tt = ve(U) ? Ia(U) : void 0, nt = _.status ? _.assignedUser : W ?? _.assignedUser, yt = await h({
        ..._,
        contents: tt,
        assignedUser: nt
      });
      return yt && (nt !== void 0 && gt(nt), tt && ee()), yt;
    },
    [ee, U, h, W]
  );
  if (pt.length === 0) return;
  const H = !Yt || !m || m.length === 0 || !m.includes(c), q = !ve(U) && (W === void 0 || W === ht), at = /* @__PURE__ */ a(
    $n,
    {
      comment: Dt,
      localizedStrings: o,
      isThreadExpanded: n,
      threadStatus: p,
      handleAddCommentToThread: P,
      handleUpdateComment: v,
      handleDeleteComment: y,
      onEditingChange: be,
      canEditOrDelete: (!Ot && se.get(Dt.id)) ?? !1,
      canUserResolveThread: pe,
      draftEditorState: (G = X.commentEdits) == null ? void 0 : G[Dt.id],
      onDraftEditorStateChange: (_) => wt(Dt.id, _)
    }
  );
  return /* @__PURE__ */ a(
    iu,
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
          "tw:bg-card": p !== "Resolved" && ut,
          "tw:bg-muted": p === "Resolved",
          "tw:bg-accent": !ut && p !== "Resolved"
        }
      ),
      onClick: () => {
        d(l);
      },
      tabIndex: -1,
      children: /* @__PURE__ */ u(su, { className: "tw:flex tw:flex-col tw:gap-2 tw:p-0", children: [
        /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:content-center tw:items-start tw:gap-2", children: [
          /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:gap-2", children: [
            ce && /* @__PURE__ */ a(Yr, { className: "tw:rounded-sm tw:bg-input tw:text-sm tw:font-normal tw:text-primary tw:hover:bg-input", children: ce }),
            /* @__PURE__ */ a(
              ot,
              {
                variant: "ghost",
                size: "icon",
                onClick: (_) => {
                  _.stopPropagation(), Oe();
                },
                className: "tw:text-muted-foreground tw:transition tw:hover:text-foreground",
                "aria-label": ut ? o["%comment_aria_mark_as_unread%"] ?? "Mark as unread" : o["%comment_aria_mark_as_read%"] ?? "Mark as read",
                children: ut ? /* @__PURE__ */ a(xc, {}) : /* @__PURE__ */ a(yc, {})
              }
            ),
            J === void 0 ? (
              // Generic status-resolve check (used by non-conflict threads and, via ConflictThread
              // leaving this slot undefined, by non-verseText conflicts, which resolve through a
              // plain status change). ConflictThread overrides this slot for verseText conflicts.
              /* @__PURE__ */ a(
                fs,
                {
                  show: pe && p !== "Resolved",
                  onClick: () => P({ threadId: l, status: "Resolved" }),
                  ariaLabel: o["%comment_aria_resolve_thread%"] ?? "Resolve thread"
                }
              )
            ) : J
          ] }),
          /* @__PURE__ */ a("div", { className: "tw:flex tw:max-w-full tw:flex-wrap tw:items-baseline tw:gap-2", children: /* @__PURE__ */ u(
            "p",
            {
              ref: _e,
              className: x(
                "tw:flex-1 tw:overflow-hidden tw:text-ellipsis tw:text-sm tw:font-normal tw:text-muted-foreground",
                {
                  "tw:overflow-visible tw:text-clip tw:whitespace-normal tw:break-words": ft
                },
                { "tw:whitespace-nowrap": !ft }
              ),
              children: [
                s && z ? /* @__PURE__ */ a(
                  ot,
                  {
                    variant: "ghost",
                    size: "sm",
                    className: "tw:h-auto tw:px-1 tw:py-0 tw:text-sm tw:font-normal tw:text-muted-foreground",
                    onClick: (_) => {
                      _.stopPropagation(), z(w);
                    },
                    children: s
                  }
                ) : s,
                /* @__PURE__ */ u(
                  "span",
                  {
                    className: e,
                    ...j,
                    children: [
                      Dt.contextBefore,
                      /* @__PURE__ */ a("span", { className: "tw:font-bold", children: Dt.selectedText }),
                      Dt.contextAfter
                    ]
                  }
                )
              ]
            }
          ) }),
          O ?? at
        ] }),
        /* @__PURE__ */ u(xt, { children: [
          ge && !n && /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:gap-5", children: [
            /* @__PURE__ */ a("div", { className: "tw:w-8", children: /* @__PURE__ */ a(Zr, {}) }),
            /* @__PURE__ */ a("p", { className: "tw:text-sm tw:text-muted-foreground", children: $e })
          ] }),
          !n && ve(U) && /* @__PURE__ */ a(
            Ma,
            {
              editorSerializedState: U,
              onSerializedChange: Re,
              placeholder: o["%comment_replyOrAssign%"]
            }
          ),
          n && /* @__PURE__ */ u(xt, { children: [
            et && fe.length > 0 && /* @__PURE__ */ a("div", { className: "tw:h-2", "data-slot": "root-content-reply-gap", "aria-hidden": "true" }),
            me > 0 && /* @__PURE__ */ u(
              "div",
              {
                className: "tw:flex tw:cursor-pointer tw:items-center tw:gap-5 tw:py-2",
                onClick: (_) => {
                  _.stopPropagation(), zt(!0);
                },
                role: "button",
                tabIndex: 0,
                onKeyDown: (_) => {
                  (_.key === "Enter" || _.key === " ") && (_.preventDefault(), _.stopPropagation(), zt(!0));
                },
                children: [
                  /* @__PURE__ */ a("div", { className: "tw:w-8", children: /* @__PURE__ */ a(Zr, {}) }),
                  /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:gap-2", children: [
                    /* @__PURE__ */ a("p", { className: "tw:text-sm tw:text-muted-foreground", children: Ve }),
                    Tt ? /* @__PURE__ */ a(ii, {}) : /* @__PURE__ */ a(hr, {})
                  ] })
                ]
              }
            ),
            fe.map((_) => {
              var tt;
              return /* @__PURE__ */ a("div", { children: /* @__PURE__ */ a(
                $n,
                {
                  comment: _,
                  localizedStrings: o,
                  isReply: !0,
                  isThreadExpanded: n,
                  handleUpdateComment: v,
                  handleDeleteComment: y,
                  onEditingChange: be,
                  canEditOrDelete: (!Ot && se.get(_.id)) ?? !1,
                  draftEditorState: (tt = X.commentEdits) == null ? void 0 : tt[_.id],
                  onDraftEditorStateChange: (nt) => wt(_.id, nt)
                }
              ) }, _.id);
            }),
            N !== !1 && (!Ot || ve(U)) && /* @__PURE__ */ a(
              "div",
              {
                role: "textbox",
                tabIndex: -1,
                className: "tw:w-full tw:space-y-2",
                onClick: (_) => _.stopPropagation(),
                onKeyDownCapture: (_) => {
                  Xo(_) && (_.preventDefault(), _.stopPropagation(), (ve(U) || W !== void 0 && W !== ht) && k());
                },
                onKeyDown: (_) => {
                  Zo(_), (_.key === "Enter" || _.key === " ") && _.stopPropagation();
                },
                children: /* @__PURE__ */ a(
                  Ma,
                  {
                    editorSerializedState: U,
                    onSerializedChange: Re,
                    placeholder: p === "Resolved" ? o["%comment_reopenResolved%"] : o["%comment_replyOrAssign%"],
                    autoFocus: !0,
                    onClear: (_) => {
                      te.current = _;
                    },
                    actions: /* @__PURE__ */ u(xt, { children: [
                      W !== void 0 && (ve(U) || W !== ht) ? /* @__PURE__ */ a("span", { className: "tw:flex-1 tw:text-sm tw:text-muted-foreground", children: or(
                        Te(
                          "%comment_assigning_to%",
                          o,
                          "Assigning to: {assignedUser}"
                        ),
                        {
                          assignedUser: ya(
                            W,
                            o
                          )
                        }
                      ) }) : /* @__PURE__ */ a("div", { className: "tw:flex-1" }),
                      /* @__PURE__ */ u(mr, { open: Bt, onOpenChange: lt, children: [
                        /* @__PURE__ */ u(_t, { children: [
                          /* @__PURE__ */ a(Nt, { asChild: !0, children: /* @__PURE__ */ a(
                            Qr,
                            {
                              isDisabled: H,
                              disabledExplanation: Te(
                                "%comment_aria_assign_user%",
                                o,
                                "Assign user"
                              ),
                              children: /* @__PURE__ */ a(Pr, { asChild: !0, children: /* @__PURE__ */ a(
                                ot,
                                {
                                  size: "icon-sm",
                                  variant: "outline",
                                  className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                                  disabled: H,
                                  "aria-label": Te(
                                    "%comment_aria_assign_user%",
                                    o,
                                    "Assign user"
                                  ),
                                  children: /* @__PURE__ */ a(ci, {})
                                }
                              ) })
                            }
                          ) }),
                          /* @__PURE__ */ a(Ct, { children: Te(
                            "%comment_aria_assign_user%",
                            o,
                            "Assign user"
                          ) })
                        ] }),
                        /* @__PURE__ */ a(
                          vr,
                          {
                            className: "tw:w-auto tw:p-0",
                            align: "end",
                            onKeyDown: (_) => {
                              _.key === "Escape" && (_.stopPropagation(), lt(!1));
                            },
                            children: /* @__PURE__ */ a(br, { children: /* @__PURE__ */ a(xr, { children: m == null ? void 0 : m.map((_) => /* @__PURE__ */ a(
                              lr,
                              {
                                onSelect: () => {
                                  Q({
                                    assignedUser: _ !== i ? _ : void 0
                                  }), bt.current = "user-selected", gt(void 0), lt(!1);
                                },
                                className: "tw:flex tw:items-center",
                                children: /* @__PURE__ */ a("span", { children: ya(_, o) })
                              },
                              _ || "unassigned"
                            )) }) })
                          }
                        )
                      ] }),
                      /* @__PURE__ */ u(_t, { children: [
                        /* @__PURE__ */ a(Nt, { asChild: !0, children: /* @__PURE__ */ a(
                          Qr,
                          {
                            isDisabled: q,
                            disabledExplanation: Te(
                              "%comment_aria_submit_comment%",
                              o,
                              "Submit comment"
                            ),
                            className: "tw:inline-flex",
                            children: /* @__PURE__ */ a(
                              ot,
                              {
                                size: "icon-sm",
                                onClick: k,
                                className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                                disabled: q,
                                "aria-label": Te(
                                  "%comment_aria_submit_comment%",
                                  o,
                                  "Submit comment"
                                ),
                                children: /* @__PURE__ */ a(li, {})
                              }
                            )
                          }
                        ) }),
                        /* @__PURE__ */ a(Ct, { children: Te(
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
}), wu = x(
  ps,
  // `prose` gives block children (the top-level blockquote wrapper, and any p — whether nested
  // inside that blockquote or, in the non-verseText fallback, a direct child) vertical margins that
  // make these already-compact cards feel bulky. Zero both so the diff sits flush inside the card.
  "tw:[&>blockquote]:my-0 tw:[&_p]:my-0",
  "tw:[&_u]:font-semibold tw:[&_u]:text-success-foreground tw:[&_u]:no-underline",
  "tw:[&_s]:text-destructive tw:[&_s]:line-through"
), uu = (t) => t.replace(/(\s+)(<\/[us]>)/g, "$2$1"), ka = (t) => uu(Vo(t));
function _a({ html: t }) {
  const e = $r();
  return /* @__PURE__ */ a(
    "div",
    {
      className: wu,
      ...e,
      dangerouslySetInnerHTML: { __html: t }
    }
  );
}
function pu({
  comment: t,
  localizedStrings: e,
  availableActions: r = "acceptOrReject",
  resolvedResolution: o,
  onResolve: n,
  isResolving: s = !1
}) {
  const [i, c] = C("accept"), d = Sa(), l = Sa(), w = $r(), p = r === "loading", h = r === "accept", v = r === "none", y = r === "acceptRejectOrMerge", f = h ? "accept" : i, m = V(
    () => ka(t.rejectedText ?? ""),
    [t.rejectedText]
  ), N = V(
    () => ka(t.acceptedText ?? ""),
    [t.acceptedText]
  ), T = V(
    () => ka(t.mergedText ?? ""),
    [t.mergedText]
  ), D = V(() => Vo(t.contents), [t.contents]);
  if (!hs(t))
    return /* @__PURE__ */ a(_a, { html: D });
  const E = (B) => {
    c(B === "reject" || B === "merge" ? B : "accept");
  }, L = e["%conflict_note_stale_notice%"] ?? "The verse was edited after this conflict was recorded, so 'Use the other change' is no longer available. Keep the current text to resolve.", S = y ? [
    {
      value: "merge",
      label: e["%conflict_note_option_combine%"] ?? "Combine both changes",
      html: T
    }
  ] : [], z = [
    {
      value: "accept",
      label: e["%conflict_note_option_keep_current%"] ?? "Keep the current text",
      html: N
    },
    {
      value: "reject",
      label: e["%conflict_note_option_use_other%"] ?? "Use the other change",
      html: m
    },
    ...S
  ], I = f === "accept", R = s || I;
  let O;
  I ? O = e["%conflict_note_save_disabled_tooltip%"] ?? "Keeping the current text makes no change — resolve the thread with the ✓ to keep it." : s || (O = e["%conflict_note_save_warning%"] ?? "This can't be undone.");
  const J = e["%conflict_note_no_result%"] ?? "No result preview available.", et = /* @__PURE__ */ a("p", { className: "tw:text-muted-foreground", children: J }), rt = (B) => B ? /* @__PURE__ */ a(
    "p",
    {
      className: "tw:whitespace-pre-wrap tw:text-foreground",
      ...w,
      children: B
    }
  ) : et, g = () => {
    const B = o ?? "accept";
    return B === "merged" ? t.mergedText ? /* @__PURE__ */ a(_a, { html: T }) : et : rt(B === "reject" ? t.rejectedResultText : t.resultText);
  }, j = (B) => h && B.value === "reject", F = (B) => {
    const X = f === B.value, U = `${l}-${B.value}`, W = j(B);
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
          htmlFor: U,
          "data-slot": "conflict-resolution-option",
          "data-value": B.value,
          className: x(
            "tw:flex tw:flex-col tw:gap-1 tw:rounded-md tw:border tw:p-2",
            "tw:focus-within:ring-2 tw:focus-within:ring-ring tw:focus-within:ring-offset-1",
            X ? "tw:border-border tw:bg-accent/50" : "tw:border-transparent tw:hover:bg-accent/30",
            W ? "tw:cursor-not-allowed tw:opacity-60" : "tw:cursor-pointer"
          ),
          children: [
            /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:gap-2", children: [
              /* @__PURE__ */ a(
                Ca,
                {
                  id: U,
                  value: B.value,
                  "aria-label": B.label,
                  disabled: W,
                  "aria-describedby": W ? d : void 0
                }
              ),
              /* @__PURE__ */ a("span", { "aria-hidden": !0, className: "tw:font-medium", children: B.label })
            ] }),
            W && // aria-describedby links the option to this visually-hidden notice so assistive tech
            // announces why the choice is read-only.
            /* @__PURE__ */ a("span", { id: d, className: "tw:sr-only", children: L }),
            /* @__PURE__ */ a(_a, { html: B.html })
          ]
        },
        B.value
      )
    );
  };
  return (
    // Contain every click inside the card (selecting an option, pressing Save) so it never bubbles
    // up to toggle the enclosing CommentThread open/closed. The thread toggles on click only, so a
    // single onClick guard at the root is enough; this container is not itself an interactive control
    // and needs no keyboard handler (the thread has no keyboard toggle to intercept).
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
    /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:gap-3 tw:text-sm", onClick: (B) => B.stopPropagation(), children: [
      /* @__PURE__ */ a("p", { children: e["%conflict_note_description_verseText%"] ?? "Conflicting changes were made to the verse text." }),
      p && /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:gap-2", "data-slot": "conflict-loading", children: [
        /* @__PURE__ */ a(Cr, { className: "tw:h-8 tw:w-full" }),
        /* @__PURE__ */ a(Cr, { className: "tw:h-8 tw:w-full" }),
        /* @__PURE__ */ a(Cr, { className: "tw:h-8 tw:w-24" })
      ] }),
      !p && v && g(),
      !p && !v && /* @__PURE__ */ u(xt, { children: [
        /* @__PURE__ */ a("p", { children: e["%conflict_note_choose_prompt%"] ?? "Select which change to keep:" }),
        /* @__PURE__ */ a(
          Oo,
          {
            value: f,
            onValueChange: E,
            disabled: s,
            "aria-label": e["%conflict_note_choose_aria_label%"] ?? "Choose resolution",
            children: z.map((B) => j(B) ? /* @__PURE__ */ a(Pt, { delayDuration: 0, children: /* @__PURE__ */ u(_t, { children: [
              /* @__PURE__ */ a(Nt, { asChild: !0, children: F(B) }),
              /* @__PURE__ */ a(Ct, { children: L })
            ] }) }, B.value) : F(B))
          }
        ),
        /* @__PURE__ */ a(Pt, { delayDuration: 0, children: /* @__PURE__ */ u(_t, { children: [
          /* @__PURE__ */ a(Nt, { asChild: !0, children: /* @__PURE__ */ a(
            Qr,
            {
              isDisabled: R && O !== void 0,
              disabledExplanation: O,
              className: "tw:inline-flex tw:self-start",
              children: /* @__PURE__ */ a(
                ot,
                {
                  size: "sm",
                  disabled: R,
                  onClick: () => n == null ? void 0 : n(f),
                  children: e["%conflict_note_save_and_resolve%"] ?? "Save and resolve"
                }
              )
            }
          ) }),
          O && /* @__PURE__ */ a(Ct, { children: O })
        ] }) })
      ] })
    ] })
  );
}
const hu = {
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
function gu({
  comment: t,
  localizedStrings: e,
  resolvedResolution: r
}) {
  const o = V(
    () => ka(t.rejectedText ?? ""),
    [t.rejectedText]
  );
  if (r) {
    const { key: s, fallback: i } = hu[r];
    return /* @__PURE__ */ a("p", { className: "tw:text-sm tw:font-normal tw:text-muted-foreground", children: e[s] ?? i });
  }
  const n = e["%conflict_note_summary_unresolved%"] ?? "Conflicting edits. Choose which change to keep.";
  return /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:gap-1", children: [
    /* @__PURE__ */ a("p", { className: "tw:text-sm tw:font-normal tw:text-muted-foreground", children: n }),
    o ? /* @__PURE__ */ a(_a, { html: o }) : void 0
  ] });
}
function fu(t) {
  return t === "reject" ? "reject" : t === "merge" ? "merged" : "accept";
}
function mu({
  threadId: t,
  threadStatus: e,
  isSelected: r,
  activeComments: o,
  conflictResolution: n
}) {
  const [s, i] = C("loading"), [c, d] = C(!1), [l, w] = C(), p = n == null ? void 0 : n.getOptions, h = n == null ? void 0 : n.resolve;
  Z(() => {
    let T = !0;
    if (!r) {
      i("loading");
      return;
    }
    return (async () => {
      let E;
      try {
        E = p ? await p(t) : "none";
      } catch {
        E = "none";
      }
      T && (i(E), E !== "none" && w(void 0));
    })(), () => {
      T = !1;
    };
  }, [r, t, e, p]);
  const v = M(!1), y = $(
    async (T) => {
      if (!(!h || v.current)) {
        v.current = !0, d(!0);
        try {
          await h(t, T) && (w(fu(T)), i("none"));
        } catch {
        } finally {
          v.current = !1, d(!1);
        }
      }
    },
    [h, t]
  ), m = V(() => {
    if (e === "Resolved") {
      for (let T = o.length - 1; T >= 0; T -= 1)
        if (o[T].status === "Resolved")
          return gs(o[T].conflictResolutionAction);
      return "accept";
    }
  }, [e, o]) ?? l;
  return { conflictOptions: s, isResolving: c, resolve: y, resolvedResolution: m, showResolveCheck: s !== "loading" && s !== "none" };
}
const vu = mi(function(e) {
  const {
    comments: r,
    localizedStrings: o,
    isSelected: n = !1,
    threadId: s,
    threadStatus: i,
    conflictResolution: c
  } = e, d = V(() => r.filter((T) => !T.deleted), [r]), l = V(
    () => d.find((T) => T.conflictType) ?? d[0],
    [d]
  ), { conflictOptions: w, isResolving: p, resolve: h, resolvedResolution: v, showResolveCheck: y } = mu({
    threadId: s,
    threadStatus: i,
    isSelected: n,
    activeComments: d,
    conflictResolution: c
  }), f = hs(l);
  let m;
  f && l && (m = n ? /* @__PURE__ */ a(
    pu,
    {
      comment: l,
      localizedStrings: o,
      availableActions: w,
      resolvedResolution: v,
      onResolve: h,
      isResolving: p
    }
  ) : /* @__PURE__ */ a(
    gu,
    {
      comment: l,
      localizedStrings: o,
      resolvedResolution: v
    }
  ));
  let N;
  return f && (N = /* @__PURE__ */ a(
    fs,
    {
      show: y,
      disabled: p,
      onClick: () => h("accept"),
      ariaLabel: o["%comment_aria_resolve_thread%"] ?? "Resolve thread"
    }
  )), /* @__PURE__ */ a(
    ms,
    {
      ...e,
      activeComments: d,
      rootContentSlot: m,
      resolveActionSlot: N,
      spaceRootContentFromReplies: f && n
    }
  );
});
function eg({
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
  canUserEditOrDeleteCommentCallback: v,
  selectedThreadId: y,
  onSelectedThreadChange: f,
  onVerseRefClick: m,
  conflictResolution: N,
  drafts: T,
  onDraftChange: D
}) {
  const [E, L] = C(/* @__PURE__ */ new Set()), [S, z] = C(), [I, R] = C(), O = $(
    async (U) => {
      const W = await s(U);
      return W !== void 0 && U.assignedUser !== void 0 && U.assignedUser !== "" && R(U.assignedUser), W;
    },
    [s]
  );
  Z(() => {
    y && (L((U) => new Set(U).add(y)), z(y));
  }, [y]);
  const J = r.filter(
    (U) => U.comments.some((W) => !W.deleted)
  ), et = J.map((U) => ({ id: U.id })), rt = $(
    (U) => {
      L((W) => new Set(W).add(U.id)), z(U.id), f == null || f(U.id);
    },
    [f]
  ), g = $(
    (U) => {
      const W = E.has(U);
      L((ct) => {
        const vt = new Set(ct);
        return vt.has(U) ? vt.delete(U) : vt.add(U), vt;
      }), z(U), f == null || f(W ? void 0 : U);
    },
    [E, f]
  ), { listboxRef: j, activeId: F, handleKeyDown: B } = Ks({
    options: et,
    onOptionSelect: rt
  }), X = $(
    (U) => {
      U.key === "Escape" ? (S && E.has(S) && (L((W) => {
        const ct = new Set(W);
        return ct.delete(S), ct;
      }), z(void 0), f == null || f(void 0)), U.preventDefault(), U.stopPropagation()) : B(U);
    },
    [S, E, B, f]
  );
  return /* @__PURE__ */ a(
    "div",
    {
      id: nu,
      role: "listbox",
      tabIndex: 0,
      ref: j,
      "aria-activedescendant": F ?? void 0,
      "aria-label": "Comments",
      className: x(
        "tw:flex tw:w-full tw:flex-col tw:outline-hidden tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-1 tw:focus:ring-offset-background",
        t
      ),
      onKeyDown: X,
      children: J.map((U) => {
        const W = {
          classNameForVerseText: e,
          comments: U.comments,
          localizedStrings: n,
          verseRef: U.verseRef,
          handleSelectThread: g,
          threadId: U.id,
          thread: U,
          isRead: U.isRead,
          isSelected: E.has(U.id),
          currentUser: o,
          assignedUser: U.assignedUser,
          threadStatus: U.status,
          handleAddCommentToThread: O,
          handleUpdateComment: i,
          handleDeleteComment: c,
          handleReadStatusChange: d,
          assignableUsers: l,
          canUserAddCommentToThread: w,
          canUserAssignThreadCallback: p,
          canUserResolveThreadCallback: h,
          canUserEditOrDeleteCommentCallback: v,
          onVerseRefClick: m,
          initialAssignedUser: I,
          draft: T == null ? void 0 : T[U.id],
          onDraftChange: D
        };
        return /* @__PURE__ */ a(
          "div",
          {
            className: x("tw:border-b tw:border-border tw:last:border-b-0", {
              "tw:opacity-60": U.status === "Resolved"
            }),
            children: U.type === "Conflict" ? /* @__PURE__ */ a(vu, { ...W, conflictResolution: N }) : /* @__PURE__ */ a(ms, { ...W })
          },
          U.id
        );
      })
    }
  );
}
const bu = Lo(
  function({ area: e, as: r = "div", label: o, ...n }, s) {
    const i = {
      [is]: e ?? "",
      ...o ? { [ss]: o } : {}
    };
    return go(r, { ...n, ...i, ref: s });
  }
);
bu.displayName = "ContentZoomRoot";
function xu({ table: t }) {
  return /* @__PURE__ */ u(Xe, { children: [
    /* @__PURE__ */ a(je, { asChild: !0, children: /* @__PURE__ */ u(ot, { variant: "outline", size: "sm", className: "tw:ml-auto tw:hidden tw:h-8 tw:lg:flex", children: [
      /* @__PURE__ */ a(kc, { className: "tw:mr-2 tw:h-4 tw:w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ u(Je, { align: "end", className: "tw:w-[150px]", children: [
      /* @__PURE__ */ a(fr, { children: "Toggle columns" }),
      /* @__PURE__ */ a(pr, {}),
      t.getAllColumns().filter((e) => e.getCanHide()).map((e) => /* @__PURE__ */ a(
        nr,
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
function Or({ ...t }) {
  return /* @__PURE__ */ a(ie.Root, { "data-slot": "select", ...t });
}
function yu({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    ie.Group,
    {
      "data-slot": "select-group",
      className: x("tw:scroll-my-1 tw:p-1", t),
      ...e
    }
  );
}
function Dr({ ...t }) {
  return /* @__PURE__ */ a(ie.Value, { "data-slot": "select-value", ...t });
}
function Mr({ className: t, size: e = "default", children: r, ...o }) {
  const n = Ke();
  return /* @__PURE__ */ u(
    ie.Trigger,
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
        /* @__PURE__ */ a(ie.Icon, { asChild: !0, children: /* @__PURE__ */ a(vi, { className: "tw:pointer-events-none tw:size-4 tw:text-muted-foreground" }) })
      ]
    }
  );
}
function Ir({
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
  const i = Ke();
  return /* @__PURE__ */ a(ie.Portal, { children: /* @__PURE__ */ u(
    ie.Content,
    {
      "data-slot": "select-content",
      "data-align-trigger": r === "item-aligned",
      className: x(
        "pr-twp tw:relative tw:max-h-(--radix-select-content-available-height) tw:data-[align-trigger=true]:min-w-(--radix-select-trigger-width) tw:data-[align-trigger=false]:min-w-36 tw:origin-(--radix-select-content-transform-origin) tw:overflow-x-hidden tw:overflow-y-auto tw:rounded-lg tw:bg-popover tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:data-[align-trigger=true]:animate-none tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95 tw:animate-none! tw:**:data-[slot$=-item]:focus:bg-foreground/10 tw:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 tw:**:data-[slot$=-separator]:bg-foreground/5 tw:**:data-[slot$=-trigger]:focus:bg-foreground/10 tw:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! tw:**:data-[variant=destructive]:focus:bg-foreground/10! tw:**:data-[variant=destructive]:text-accent-foreground! tw:**:data-[variant=destructive]:**:text-accent-foreground! tw:relative",
        r === "popper" && "tw:data-[side=bottom]:translate-y-1 tw:data-[side=left]:-translate-x-1 tw:rtl:data-[side=left]:translate-x-1 tw:data-[side=right]:translate-x-1 tw:rtl:data-[side=right]:-translate-x-1 tw:data-[side=top]:-translate-y-1",
        t
      ),
      style: { zIndex: Qe, ...n },
      position: r,
      align: o,
      ...s,
      children: [
        /* @__PURE__ */ a(ku, {}),
        /* @__PURE__ */ a(
          ie.Viewport,
          {
            "data-position": r,
            className: x(
              "tw:data-[position=popper]:h-(--radix-select-trigger-height) tw:data-[position=popper]:w-full tw:data-[position=popper]:min-w-(--radix-select-trigger-width)",
              r === "popper" && "tw:"
            ),
            children: /* @__PURE__ */ a("div", { dir: i, children: e })
          }
        ),
        /* @__PURE__ */ a(_u, {})
      ]
    }
  ) });
}
function rg({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    ie.Label,
    {
      "data-slot": "select-label",
      className: x("pr-twp tw:px-1.5 tw:py-1 tw:text-xs tw:text-muted-foreground", t),
      ...e
    }
  );
}
function Ie({
  className: t,
  children: e,
  ...r
}) {
  return /* @__PURE__ */ u(
    ie.Item,
    {
      "data-slot": "select-item",
      className: x(
        "pr-twp tw:relative tw:flex tw:w-full tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:*:[span]:last:flex tw:*:[span]:last:items-center tw:*:[span]:last:gap-2",
        t
      ),
      ...r,
      children: [
        /* @__PURE__ */ a("span", { className: "tw:pointer-events-none tw:absolute tw:end-2 tw:flex tw:size-4 tw:items-center tw:justify-center", children: /* @__PURE__ */ a(ie.ItemIndicator, { children: /* @__PURE__ */ a(La, { className: "tw:pointer-events-none" }) }) }),
        /* @__PURE__ */ a(ie.ItemText, { children: e })
      ]
    }
  );
}
function ag({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    ie.Separator,
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
function ku({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    ie.ScrollUpButton,
    {
      "data-slot": "select-scroll-up-button",
      className: x(
        "pr-twp tw:z-10 tw:flex tw:cursor-default tw:items-center tw:justify-center tw:bg-popover tw:py-1 tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      ...e,
      children: /* @__PURE__ */ a(sl, {})
    }
  );
}
function _u({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    ie.ScrollDownButton,
    {
      "data-slot": "select-scroll-down-button",
      className: x(
        "pr-twp tw:z-10 tw:flex tw:cursor-default tw:items-center tw:justify-center tw:bg-popover tw:py-1 tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      ...e,
      children: /* @__PURE__ */ a(il, {})
    }
  );
}
function Nu({ table: t }) {
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
        Or,
        {
          value: `${t.getState().pagination.pageSize}`,
          onValueChange: (e) => {
            t.setPageSize(Number(e));
          },
          children: [
            /* @__PURE__ */ a(Mr, { className: "tw:h-8 tw:w-[70px]", children: /* @__PURE__ */ a(Dr, { placeholder: t.getState().pagination.pageSize }) }),
            /* @__PURE__ */ a(Ir, { side: "top", children: [10, 20, 30, 40, 50].map((e) => /* @__PURE__ */ a(Ie, { value: `${e}`, children: e }, e)) })
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
        ot,
        {
          variant: "outline",
          size: "icon",
          className: "tw:hidden tw:h-8 tw:w-8 tw:p-0 tw:lg:flex",
          onClick: () => t.setPageIndex(0),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ a("span", { className: "tw:sr-only", children: "Go to first page" }),
            /* @__PURE__ */ a(_c, { className: "tw:h-4 tw:w-4" })
          ]
        }
      ),
      /* @__PURE__ */ u(
        ot,
        {
          variant: "outline",
          size: "icon",
          className: "tw:h-8 tw:w-8 tw:p-0",
          onClick: () => t.previousPage(),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ a("span", { className: "tw:sr-only", children: "Go to previous page" }),
            /* @__PURE__ */ a(Nc, { className: "tw:h-4 tw:w-4" })
          ]
        }
      ),
      /* @__PURE__ */ u(
        ot,
        {
          variant: "outline",
          size: "icon",
          className: "tw:h-8 tw:w-8 tw:p-0",
          onClick: () => t.nextPage(),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ a("span", { className: "tw:sr-only", children: "Go to next page" }),
            /* @__PURE__ */ a(Cc, { className: "tw:h-4 tw:w-4" })
          ]
        }
      ),
      /* @__PURE__ */ u(
        ot,
        {
          variant: "outline",
          size: "icon",
          className: "tw:hidden tw:h-8 tw:w-8 tw:p-0 tw:lg:flex",
          onClick: () => t.setPageIndex(t.getPageCount() - 1),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ a("span", { className: "tw:sr-only", children: "Go to last page" }),
            /* @__PURE__ */ a(Ec, { className: "tw:h-4 tw:w-4" })
          ]
        }
      )
    ] })
  ] }) });
}
function Cu({
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
  var S;
  const [w, p] = C([]), [h, v] = C([]), [y, f] = C({}), [m, N] = C({}), T = V(() => e ?? [], [e]), D = Mi({
    data: T,
    columns: t,
    getCoreRowModel: Pi(),
    ...r && { getPaginationRowModel: wd() },
    onSortingChange: p,
    getSortedRowModel: Ii(),
    onColumnFiltersChange: v,
    getFilteredRowModel: dd(),
    onColumnVisibilityChange: f,
    onRowSelectionChange: N,
    state: {
      sorting: w,
      columnFilters: h,
      columnVisibility: y,
      rowSelection: m
    }
  }), E = D.getVisibleFlatColumns();
  let L;
  return d ? L = Array.from({ length: 10 }).map((R, O) => `skeleton-row-${O}`).map((R) => /* @__PURE__ */ a(ar, { className: "tw:hover:bg-transparent", children: /* @__PURE__ */ a(Er, { colSpan: E.length ?? t.length, className: "tw:border-0 tw:p-0", children: /* @__PURE__ */ a("div", { className: "tw:w-full tw:py-2", children: /* @__PURE__ */ a(Cr, { className: "tw:h-14 tw:w-full tw:rounded-md" }) }) }) }, R)) : ((S = D.getRowModel().rows) == null ? void 0 : S.length) > 0 ? L = D.getRowModel().rows.map((z) => /* @__PURE__ */ a(
    ar,
    {
      onClick: () => i(z, D),
      "data-state": z.getIsSelected() && "selected",
      children: z.getVisibleCells().map((I) => /* @__PURE__ */ a(Er, { children: qr(I.column.columnDef.cell, I.getContext()) }, I.id))
    },
    z.id
  )) : L = /* @__PURE__ */ a(ar, { children: /* @__PURE__ */ a(Er, { colSpan: t.length, className: "tw:h-24 tw:text-center", children: l }) }), /* @__PURE__ */ u("div", { className: "pr-twp", id: c, children: [
    n && /* @__PURE__ */ a(xu, { table: D }),
    /* @__PURE__ */ u(Mo, { stickyHeader: s, children: [
      /* @__PURE__ */ a(Io, { stickyHeader: s, children: D.getHeaderGroups().map((z) => /* @__PURE__ */ a(ar, { children: z.headers.map((I) => /* @__PURE__ */ a(Ea, { className: "tw:p-0", children: I.isPlaceholder ? void 0 : qr(I.column.columnDef.header, I.getContext()) }, I.id)) }, z.id)) }),
      /* @__PURE__ */ a(Po, { children: L })
    ] }),
    r && /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:justify-end tw:space-x-2 tw:py-4", children: [
      /* @__PURE__ */ a(
        ot,
        {
          variant: "outline",
          size: "sm",
          onClick: () => D.previousPage(),
          disabled: !D.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ a(
        ot,
        {
          variant: "outline",
          size: "sm",
          onClick: () => D.nextPage(),
          disabled: !D.getCanNextPage(),
          children: "Next"
        }
      )
    ] }),
    r && o && /* @__PURE__ */ a(Nu, { table: D })
  ] });
}
function og({
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
      className: x(
        "pr-twp tw:prose",
        {
          "tw:line-clamp-3 tw:max-h-10 tw:overflow-hidden tw:text-ellipsis tw:break-words": n
        },
        r
      ),
      children: /* @__PURE__ */ a(hd, { options: s, children: e })
    }
  );
}
const Eu = Object.freeze([
  "%webView_error_dump_header%",
  "%webView_error_dump_info_message%"
]), Vn = (t, e) => t[e] ?? e;
function Tu({
  errorDetails: t,
  handleCopyNotify: e,
  localizedStrings: r,
  id: o
}) {
  const n = Vn(r, "%webView_error_dump_header%"), s = Vn(r, "%webView_error_dump_info_message%");
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
          /* @__PURE__ */ a(ot, { variant: "secondary", size: "icon", className: "size-8", onClick: () => i(), children: /* @__PURE__ */ a(di, {}) })
        ] }),
        /* @__PURE__ */ a("div", { className: "tw:prose tw:w-full", children: /* @__PURE__ */ a("pre", { className: "tw:text-xs", children: t }) })
      ]
    }
  );
}
const ng = Object.freeze([
  ...Eu,
  "%webView_error_dump_copied_message%"
]);
function ig({
  errorDetails: t,
  handleCopyNotify: e,
  localizedStrings: r,
  children: o,
  className: n,
  id: s
}) {
  const [i, c] = C(!1), d = () => {
    c(!0), e && e();
  };
  return /* @__PURE__ */ u(mr, { onOpenChange: (w) => {
    w || c(!1);
  }, children: [
    /* @__PURE__ */ a(Pr, { asChild: !0, children: o }),
    /* @__PURE__ */ u(vr, { id: s, className: x("tw:min-w-80 tw:max-w-96", n), children: [
      i && r["%webView_error_dump_copied_message%"] && /* @__PURE__ */ a(It, { children: r["%webView_error_dump_copied_message%"] }),
      /* @__PURE__ */ a(
        Tu,
        {
          errorDetails: t,
          handleCopyNotify: d,
          localizedStrings: r
        }
      )
    ] })
  ] });
}
var Su = /* @__PURE__ */ ((t) => (t[t.Check = 0] = "Check", t[t.Radio = 1] = "Radio", t))(Su || {});
function sg({ id: t, label: e, groups: r }) {
  const [o, n] = C(
    Object.fromEntries(
      r.map(
        (l, w) => l.itemType === 0 ? [w, []] : void 0
      ).filter((l) => !!l)
    )
  ), [s, i] = C({}), c = (l, w) => {
    const p = !o[l][w];
    n((v) => (v[l][w] = p, { ...v }));
    const h = r[l].items[w];
    h.onUpdate(h.id, p);
  }, d = (l, w) => {
    i((h) => (h[l] = w, { ...h }));
    const p = r[l].items.find((h) => h.id === w);
    p ? p.onUpdate(w) : console.error(`Could not find dropdown radio item with id '${w}'!`);
  };
  return /* @__PURE__ */ a("div", { id: t, children: /* @__PURE__ */ u(Xe, { children: [
    /* @__PURE__ */ a(je, { asChild: !0, children: /* @__PURE__ */ u(ot, { variant: "default", children: [
      /* @__PURE__ */ a(Tc, { size: 16, className: "tw:mr-2 tw:h-4 tw:w-4" }),
      e,
      /* @__PURE__ */ a(hr, { size: 16, className: "tw:ml-2 tw:h-4 tw:w-4" })
    ] }) }),
    /* @__PURE__ */ a(Je, { children: r.map((l, w) => /* @__PURE__ */ u("div", { children: [
      /* @__PURE__ */ a(fr, { children: l.label }),
      /* @__PURE__ */ a(ti, { children: l.itemType === 0 ? /* @__PURE__ */ a(xt, { children: l.items.map((p, h) => /* @__PURE__ */ a("div", { children: /* @__PURE__ */ a(
        nr,
        {
          checked: o[w][h],
          onCheckedChange: () => c(w, h),
          children: p.label
        }
      ) }, p.id)) }) : /* @__PURE__ */ a(
        Hs,
        {
          value: s[w],
          onValueChange: (p) => d(w, p),
          children: l.items.map((p) => /* @__PURE__ */ a("div", { children: /* @__PURE__ */ a(qs, { value: p.id, children: p.label }) }, p.id))
        }
      ) }),
      /* @__PURE__ */ a(pr, {})
    ] }, l.label)) })
  ] }) });
}
function cg({
  id: t,
  category: e,
  downloads: r,
  languages: o,
  moreInfoUrl: n,
  handleMoreInfoLinkClick: s,
  supportUrl: i,
  handleSupportLinkClick: c
}) {
  const d = new hi("en", {
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
            /* @__PURE__ */ a(Sc, { className: "tw:h-4 tw:w-4" }),
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
            ot,
            {
              onClick: () => s(),
              variant: "link",
              className: "tw:flex tw:h-auto tw:gap-1 tw:py-0 tw:text-xs tw:font-semibold tw:text-foreground",
              children: [
                "Website",
                /* @__PURE__ */ a(Rc, { className: "tw:h-4 tw:w-4" })
              ]
            }
          ) }),
          i && /* @__PURE__ */ a("div", { className: "tw:flex tw:gap-1", children: /* @__PURE__ */ u(
            ot,
            {
              onClick: () => c(),
              variant: "link",
              className: "tw:flex tw:h-auto tw:gap-1 tw:py-0 tw:text-xs tw:font-semibold tw:text-foreground",
              children: [
                "Support",
                /* @__PURE__ */ a(Oc, { className: "tw:h-4 tw:w-4" })
              ]
            }
          ) })
        ] })
      ]
    }
  );
}
function Ru({ id: t, versionHistory: e }) {
  const [r, o] = C(!1), n = /* @__PURE__ */ new Date();
  function s(c) {
    const d = new Date(c), l = new Date(n.getTime() - d.getTime()), w = l.getUTCFullYear() - 1970, p = l.getUTCMonth(), h = l.getUTCDate() - 1;
    let v = "";
    return w > 0 ? v = `${w.toString()} year${w === 1 ? "" : "s"} ago` : p > 0 ? v = `${p.toString()} month${p === 1 ? "" : "s"} ago` : h === 0 ? v = "today" : v = `${h.toString()} day${h === 1 ? "" : "s"} ago`, v;
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
function lg({
  id: t,
  publisherDisplayName: e,
  fileSize: r,
  locales: o,
  versionHistory: n,
  currentVersion: s
}) {
  const i = V(() => Zc(r), [r]), d = ((l) => {
    const w = new Intl.DisplayNames(Xc(), { type: "language" });
    return l.map((p) => w.of(p));
  })(o);
  return /* @__PURE__ */ a("div", { id: t, className: "pr-twp tw:border-t tw:py-2", children: /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:gap-2 tw:divide-y", children: [
    Object.entries(n).length > 0 && /* @__PURE__ */ a(Ru, { versionHistory: n }),
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
function dg({
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
  id: v
}) {
  return /* @__PURE__ */ u("div", { id: v, className: "tw:flex tw:items-center tw:gap-2", children: [
    /* @__PURE__ */ a(
      Gs,
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
    e.length > 0 ? /* @__PURE__ */ a("div", { className: "tw:flex tw:flex-wrap tw:items-center tw:gap-2", children: e.map((y) => {
      var f;
      return /* @__PURE__ */ u(Yr, { variant: "muted", className: "tw:flex tw:items-center tw:gap-1", children: [
        /* @__PURE__ */ a(
          ot,
          {
            variant: "ghost",
            size: "icon",
            className: "tw:h-4 tw:w-4 tw:p-0 tw:hover:bg-transparent",
            onClick: () => r(e.filter((m) => m !== y)),
            children: /* @__PURE__ */ a(si, { className: "tw:h-3 tw:w-3" })
          }
        ),
        (f = t.find((m) => m.value === y)) == null ? void 0 : f.label
      ] }, y);
    }) }) : /* @__PURE__ */ a(It, { children: h })
  ] });
}
const Ln = " ";
function Ou(t, e) {
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
function Bn(t) {
  return t.nextNode() ?? void 0;
}
function vs(t) {
  return t.data.endsWith(Ln) ? t.data.length - Ln.length : t.data.length;
}
function Du(t, e, r) {
  var l, w;
  const o = t.querySelector(".note-category-value");
  if (o != null && o.contains(e)) return { utf16Offset: r, field: "category" };
  const n = (l = e.parentElement) == null ? void 0 : l.closest(".marker");
  if (!o || !n || !t.contains(n)) return { utf16Offset: 0 };
  const s = n === t.querySelector(".marker"), i = ((w = o.textContent) == null ? void 0 : w.length) ?? 0, c = s ? 0 : i;
  return r > vs(e) ? { utf16Offset: c, field: "category" } : { utf16Offset: c, field: "category", glyph: { index: !s && i === 0 ? 1 : 0, offset: r } };
}
function jn(t, e, r) {
  var i;
  const o = document.createTreeWalker(t, NodeFilter.SHOW_TEXT);
  let n = 0, s = 0;
  for (let c = Bn(o); c; c = Bn(o)) {
    const d = Ou(c, t);
    if (d === "category") {
      if (c === e) {
        const l = (i = c.parentElement) == null ? void 0 : i.closest(".note-category");
        return l ? Du(l, c, r) : { utf16Offset: 0 };
      }
    } else if (d === "display") {
      if (c === e) return { utf16Offset: n };
    } else if (d === "glyph") {
      if (c === e)
        return r > vs(c) ? { utf16Offset: n } : { utf16Offset: n, glyph: { index: s, offset: r } };
      s += 1;
    } else {
      if (c === e) return { utf16Offset: n + r };
      n += c.data.length, c.data.length > 0 && (s = 0);
    }
  }
  return "end";
}
function Fn(t) {
  return t.nodeType === Node.TEXT_NODE ? t : document.createTreeWalker(t, NodeFilter.SHOW_TEXT).nextNode() ?? void 0;
}
function Mu(t, e, r) {
  var i;
  const o = r.querySelector(".textual-note-body");
  if (!o) return "end";
  let n, s = 0;
  if (typeof document.caretPositionFromPoint == "function") {
    const c = document.caretPositionFromPoint(t, e);
    c && (n = c.offsetNode, s = c.offset);
  } else if (typeof document.caretRangeFromPoint == "function") {
    const c = document.caretRangeFromPoint(t, e);
    c && (n = c.startContainer, s = c.startOffset);
  }
  if (!n) return "end";
  if ((i = r.querySelector(".textual-note-header")) != null && i.contains(n)) {
    const c = Fn(o);
    return c ? jn(o, c, 0) : "end";
  }
  if (!o.contains(n)) return "end";
  if (n.nodeType === Node.ELEMENT_NODE) {
    const c = n.childNodes[s], d = c ? Fn(c) : void 0;
    if (!d) return "end";
    n = d, s = 0;
  }
  return n.nodeType !== Node.TEXT_NODE ? "end" : jn(o, n, s);
}
const Iu = Object.freeze([
  "%undoButton_tooltip%",
  "%redoButton_tooltip%"
]), Un = (t, e) => t[e] ?? e;
function Pu({
  onUndoClick: t,
  onRedoClick: e,
  canUndo: r = !0,
  canRedo: o = !0,
  localizedStrings: n = {},
  showKeyboardShortcuts: s = !0,
  className: i = "tw:h-6 tw:w-6",
  variant: c = "ghost"
}) {
  const d = Do(), l = Un(n, "%undoButton_tooltip%"), w = Un(n, "%redoButton_tooltip%");
  return /* @__PURE__ */ u(Aa, { children: [
    /* @__PURE__ */ a(Pt, { children: /* @__PURE__ */ u(_t, { children: [
      /* @__PURE__ */ a(Nt, { asChild: !0, children: /* @__PURE__ */ a(
        ot,
        {
          "aria-label": l,
          className: i,
          size: "icon",
          onClick: t,
          disabled: !r,
          variant: c,
          children: /* @__PURE__ */ a(Dc, {})
        }
      ) }),
      /* @__PURE__ */ a(Ct, { children: /* @__PURE__ */ u("p", { children: [
        l,
        s && /* @__PURE__ */ u(xt, { children: [
          " ",
          /* @__PURE__ */ a(ho, { children: d ? "⌘Z" : "Ctrl+Z" })
        ] })
      ] }) })
    ] }) }),
    e && (c === "secondary" || c === "default") && /* @__PURE__ */ a(Ro, {}),
    e && /* @__PURE__ */ a(Pt, { children: /* @__PURE__ */ u(_t, { children: [
      /* @__PURE__ */ a(Nt, { asChild: !0, children: /* @__PURE__ */ a(
        ot,
        {
          "aria-label": w,
          className: i,
          size: "icon",
          onClick: e,
          disabled: !o,
          variant: c,
          children: /* @__PURE__ */ a(Mc, {})
        }
      ) }),
      /* @__PURE__ */ a(Ct, { children: /* @__PURE__ */ u("p", { children: [
        w,
        s && /* @__PURE__ */ u(xt, { children: [
          " ",
          /* @__PURE__ */ a(ho, { children: d ? "⌘⇧Z" : "Ctrl+Y" })
        ] })
      ] }) })
    ] }) })
  ] });
}
function zu({
  children: t,
  editorRef: e,
  canUndo: r = !0,
  canRedo: o = !0
}) {
  const n = M(null);
  return Z(() => {
    var d;
    const s = Do(), i = ((d = n.current) == null ? void 0 : d.querySelector(".editor-input")) ?? void 0, c = (l) => {
      var p, h, v, y;
      if (!i || document.activeElement !== i) return;
      const w = l.key.toLowerCase();
      if (s) {
        if (!l.metaKey) return;
        !l.shiftKey && w === "z" ? (l.preventDefault(), r && ((p = e.current) == null || p.undo())) : l.shiftKey && w === "z" && (l.preventDefault(), o && ((h = e.current) == null || h.redo()));
      } else {
        if (!l.ctrlKey) return;
        !l.shiftKey && w === "z" ? (l.preventDefault(), r && ((v = e.current) == null || v.undo())) : (w === "y" || l.shiftKey && w === "z") && (l.preventDefault(), o && ((y = e.current) == null || y.redo()));
      }
    };
    return document.addEventListener("keydown", c), () => document.removeEventListener("keydown", c);
  }, [o, r, e]), /* @__PURE__ */ a("div", { ref: n, children: t });
}
function Au() {
  const t = M(void 0), e = M(new DOMRect()), r = M({
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
  return V(() => ({ virtualRef: r, setSource: o }), [o]);
}
function $u(t) {
  if (t.getClientRects().length !== 0)
    return t.getBoundingClientRect();
}
function Vu(t) {
  return new DOMRect(t.left, t.top, 0, t.height);
}
const Lu = (t, e, r) => t === "generated" ? /* @__PURE__ */ u(xt, { children: [
  /* @__PURE__ */ a("p", { children: "+" }),
  " ",
  e["%footnoteEditor_callerDropdown_item_generated%"]
] }) : t === "hidden" ? /* @__PURE__ */ u(xt, { children: [
  /* @__PURE__ */ a("p", { children: "-" }),
  " ",
  e["%footnoteEditor_callerDropdown_item_hidden%"]
] }) : /* @__PURE__ */ u(xt, { children: [
  /* @__PURE__ */ a("p", { children: r }),
  " ",
  e["%footnoteEditor_callerDropdown_item_custom%"]
] });
function Bu({
  callerType: t,
  customCaller: e,
  updateCaller: r,
  localizedStrings: o,
  focusNoteText: n
}) {
  const s = M(!1), i = M(null), c = M(null), d = M(!1), [l, w] = C(t), [p, h] = C(e), [v, y] = C(!1), f = M(!1), m = M(l);
  m.current = l;
  const N = M(p);
  N.current = p, Z(() => {
    w(t);
  }, [t]), Z(() => {
    p !== e && h(e);
  }, [e]);
  const T = (E) => {
    if (d.current = !1, y(E), !E) {
      const L = m.current, S = N.current;
      L !== "custom" || S ? (L !== t || S !== e) && (s.current = !0, r(L, S)) : (w(t), h(e));
    }
  }, D = (E) => {
    var L, S, z, I;
    E.stopPropagation(), document.activeElement === c.current && E.key === "ArrowDown" || E.key === "ArrowRight" ? ((L = i.current) == null || L.focus(), d.current = !0) : document.activeElement === i.current && E.key === "ArrowUp" ? ((S = c.current) == null || S.focus(), d.current = !1) : document.activeElement === i.current && E.key === "ArrowLeft" && ((z = i.current) == null ? void 0 : z.selectionStart) === 0 && ((I = c.current) == null || I.focus(), d.current = !1), l === "custom" && E.key === "Enter" && (document.activeElement === c.current || document.activeElement === i.current) && T(!1);
  };
  return /* @__PURE__ */ u(Xe, { open: v, onOpenChange: T, children: [
    /* @__PURE__ */ a(Pt, { children: /* @__PURE__ */ u(_t, { children: [
      /* @__PURE__ */ a(Nt, { asChild: !0, children: /* @__PURE__ */ a(je, { asChild: !0, children: /* @__PURE__ */ a(ot, { variant: "outline", className: "tw:h-6", children: Lu(t, o, e) }) }) }),
      /* @__PURE__ */ a(Ct, { children: o["%footnoteEditor_callerDropdown_tooltip%"] })
    ] }) }),
    /* @__PURE__ */ u(
      Je,
      {
        style: { zIndex: ei },
        onEscapeKeyDown: () => {
          m.current = t, N.current = e, w(t), h(e);
        },
        onCloseAutoFocus: (E) => {
          s.current && (s.current = !1, E.preventDefault(), n());
        },
        onClick: () => {
          d.current && (d.current = !1);
        },
        onKeyDown: D,
        onMouseMove: () => {
          var E;
          d.current && ((E = i.current) == null || E.focus());
        },
        children: [
          /* @__PURE__ */ a(fr, { children: o["%footnoteEditor_callerDropdown_label%"] }),
          /* @__PURE__ */ a(pr, {}),
          /* @__PURE__ */ a(
            nr,
            {
              checked: l === "generated",
              onCheckedChange: () => w("generated"),
              children: /* @__PURE__ */ u("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ a("span", { children: o["%footnoteEditor_callerDropdown_item_generated%"] }),
                /* @__PURE__ */ a("span", { className: "tw:w-10 tw:text-center", children: vo })
              ] })
            }
          ),
          /* @__PURE__ */ a(
            nr,
            {
              checked: l === "hidden",
              onCheckedChange: () => w("hidden"),
              children: /* @__PURE__ */ u("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ a("span", { children: o["%footnoteEditor_callerDropdown_item_hidden%"] }),
                /* @__PURE__ */ a("span", { className: "tw:w-10 tw:text-center", children: bo })
              ] })
            }
          ),
          /* @__PURE__ */ a(
            nr,
            {
              ref: c,
              checked: l === "custom",
              onCheckedChange: () => w("custom"),
              onPointerDown: () => {
                f.current = l === "custom";
              },
              onClick: (E) => {
                var L;
                if (E.stopPropagation(), f.current && E.target !== i.current) {
                  T(!1);
                  return;
                }
                d.current = !0, (L = i.current) == null || L.focus();
              },
              onSelect: (E) => E.preventDefault(),
              children: /* @__PURE__ */ u("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ a("span", { children: o["%footnoteEditor_callerDropdown_item_custom%"] }),
                /* @__PURE__ */ a(
                  Va,
                  {
                    tabIndex: 0,
                    onMouseDown: (E) => {
                      E.stopPropagation(), w("custom"), d.current = !0;
                    },
                    ref: i,
                    className: "tw:h-auto tw:w-10 tw:p-0 tw:text-center",
                    value: p,
                    onKeyDown: (E) => {
                      E.key === "Enter" || E.key === "ArrowUp" || E.key === "ArrowDown" || E.key === "ArrowLeft" || E.key === "ArrowRight" || E.stopPropagation();
                    },
                    maxLength: 1,
                    onChange: (E) => h(E.target.value)
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
const ju = (t, e) => t === "f" ? /* @__PURE__ */ u(xt, { children: [
  /* @__PURE__ */ a(ui, {}),
  " ",
  e["%footnoteEditor_noteType_footnote_label%"]
] }) : t === "fe" ? /* @__PURE__ */ u(xt, { children: [
  /* @__PURE__ */ a(pi, {}),
  " ",
  e["%footnoteEditor_noteType_endNote_label%"]
] }) : /* @__PURE__ */ u(xt, { children: [
  /* @__PURE__ */ a(wi, {}),
  " ",
  e["%footnoteEditor_noteType_crossReference_label%"]
] }), Fu = (t, e) => {
  if (t === "x")
    return e["%footnoteEditor_noteType_crossReference_label%"];
  let r = e["%footnoteEditor_noteType_endNote_label%"];
  return t === "f" && (r = e["%footnoteEditor_noteType_footnote_label%"]), or(e["%footnoteEditor_noteType_tooltip%"] ?? "", {
    noteType: r
  });
};
function Uu({
  noteType: t,
  handleNoteTypeChange: e,
  localizedStrings: r,
  isTypeSwitchable: o,
  focusNoteText: n
}) {
  const s = M(!1), i = (c) => {
    c !== t && (s.current = !0, e(c));
  };
  return /* @__PURE__ */ u(Xe, { children: [
    /* @__PURE__ */ a(Pt, { children: /* @__PURE__ */ u(_t, { children: [
      /* @__PURE__ */ a(Nt, { asChild: !0, children: /* @__PURE__ */ a(je, { asChild: !0, children: /* @__PURE__ */ a(ot, { variant: "outline", className: "tw:h-6", children: ju(t, r) }) }) }),
      /* @__PURE__ */ a(Ct, { children: /* @__PURE__ */ a("p", { children: Fu(t, r) }) })
    ] }) }),
    /* @__PURE__ */ u(
      Je,
      {
        style: { zIndex: ei },
        onCloseAutoFocus: (c) => {
          s.current && (s.current = !1, c.preventDefault(), n());
        },
        children: [
          /* @__PURE__ */ a(fr, { children: r["%footnoteEditor_noteTypeDropdown_label%"] }),
          /* @__PURE__ */ a(pr, {}),
          /* @__PURE__ */ u(
            nr,
            {
              disabled: t !== "x" && !o,
              checked: t === "x",
              onCheckedChange: () => i("x"),
              className: "tw:gap-2",
              children: [
                /* @__PURE__ */ a(wi, {}),
                /* @__PURE__ */ a("span", { children: r["%footnoteEditor_noteType_crossReference_label%"] })
              ]
            }
          ),
          /* @__PURE__ */ u(
            nr,
            {
              disabled: t === "x" && !o,
              checked: t === "f",
              onCheckedChange: () => i("f"),
              className: "tw:gap-2",
              children: [
                /* @__PURE__ */ a(ui, {}),
                /* @__PURE__ */ a("span", { children: r["%footnoteEditor_noteType_footnote_label%"] })
              ]
            }
          ),
          /* @__PURE__ */ u(
            nr,
            {
              disabled: t === "x" && !o,
              checked: t === "fe",
              onCheckedChange: () => i("fe"),
              className: "tw:gap-2",
              children: [
                /* @__PURE__ */ a(pi, {}),
                /* @__PURE__ */ a("span", { children: r["%footnoteEditor_noteType_endNote_label%"] })
              ]
            }
          )
        ]
      }
    )
  ] });
}
const Ku = Object.freeze([
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
function Hu({ icon: t, className: e }) {
  return /* @__PURE__ */ a(t ?? Ic, { className: e, size: 16 });
}
function qu({ state: t }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "marker-selection-state",
      className: "tw:flex tw:w-4 tw:min-w-4 tw:items-center tw:justify-center",
      children: t !== "none" && /* @__PURE__ */ a(sr, { size: 16 })
    }
  );
}
function Kn({
  item: t,
  localizedStrings: e
}) {
  return /* @__PURE__ */ u(
    lr,
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
        t.selectionState !== void 0 && /* @__PURE__ */ a(qu, { state: t.selectionState }),
        /* @__PURE__ */ a("div", { className: "tw:w-8 tw:min-w-8", children: t.marker ? (
          // Monospace: a USFM marker is a code, not prose, and should read as one. Deliberately
          // inherits the row's own foreground rather than taking a marker-specific colour.
          /* @__PURE__ */ a("span", { className: "tw:font-mono tw:text-xs", children: t.marker })
        ) : /* @__PURE__ */ a("div", { children: /* @__PURE__ */ a(Hu, { icon: t.icon }) }) }),
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
        (t.isDisallowed || t.isDeprecated) && /* @__PURE__ */ a(Ys, { className: "tw:font-sans", children: t.isDisallowed ? e["%markerMenu_disallowed_label%"] : e["%markerMenu_deprecated_label%"] })
      ]
    }
  );
}
function Gu({
  localizedStrings: t,
  markerMenuItems: e,
  searchRef: r,
  searchPlaceholder: o
}) {
  const [n, s] = C(""), [i, c] = V(() => {
    const d = Ws(n.trim().toLowerCase());
    if (!d) {
      const p = e.filter((h) => !h.isDisallowed);
      return [p.length > 0 ? p : e, []];
    }
    const l = e.filter((p) => {
      var v;
      const h = (v = p.marker) == null ? void 0 : v.toLowerCase();
      return p.isDisallowed ? h === d : h == null ? void 0 : h.includes(d);
    }), w = e.filter(
      (p) => p.title.toLowerCase().includes(d) && !l.includes(p)
    );
    return [l, w];
  }, [n, e]);
  return /* @__PURE__ */ u(br, { className: "tw:p-1", shouldFilter: !1, loop: !0, children: [
    /* @__PURE__ */ a(
      za,
      {
        className: "marker-menu-search",
        ref: r,
        value: n,
        onValueChange: (d) => s(d),
        placeholder: o ?? t["%markerMenu_searchPlaceholder%"],
        spaceSelectsHighlightedItem: !0
      }
    ),
    /* @__PURE__ */ u(xr, { children: [
      /* @__PURE__ */ a($a, { children: t["%markerMenu_noResults%"] }),
      /* @__PURE__ */ a(ir, { children: i.map((d) => {
        var l;
        return /* @__PURE__ */ a(
          Kn,
          {
            item: d,
            localizedStrings: t
          },
          `item-${d.marker ?? ((l = d.icon) == null ? void 0 : l.displayName)}-${d.title.replaceAll(" ", "")}`
        );
      }) }),
      c.length > 0 && /* @__PURE__ */ u(xt, { children: [
        i.length > 0 && /* @__PURE__ */ a(ri, { alwaysRender: !0 }),
        /* @__PURE__ */ a(ir, { children: c.map((d) => {
          var l;
          return /* @__PURE__ */ a(
            Kn,
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
function Wu(t, e, r, o, n) {
  if (!o || o === "p") return [];
  const s = Fr[o], i = s != null && s.children ? s : n && Fr[n];
  if (!i || !i.children) return [];
  const c = [];
  return Object.entries(i.children).forEach(([, d]) => {
    c.push(
      ...d.map((l) => ({
        marker: l,
        title: r[Fr[l].description] ?? Fr[l].description,
        action: () => {
          var w;
          (w = t.current) == null || w.insertMarker(l), e();
        }
      }))
    );
  }), c.sort((d, l) => (d.marker ?? d.title).localeCompare(l.marker ?? l.title));
}
function Yu(t) {
  return {
    id: t.marker,
    label: t.marker,
    description: t.description,
    badge: t.kind === "closeTag" ? "%markerMenu_endTag_label%" : void 0,
    muted: !t.isBasic
  };
}
function Zu(t) {
  return t.reduce(
    (e, r) => e + (typeof r.insert == "string" ? r.insert.length : 1),
    0
  );
}
function Xu(t) {
  var r;
  const e = (r = t.attributes) == null ? void 0 : r.char;
  e != null && e.style && (e.style === "ft" && (e.style = "xt"), e.style === "fr" && (e.style = "xo"), e.style === "fq" && (e.style = "xq"));
}
function Ju(t) {
  var r;
  const e = (r = t.attributes) == null ? void 0 : r.char;
  e != null && e.style && (e.style === "xt" && (e.style = "ft"), e.style === "xo" && (e.style = "fr"), e.style === "xq" && (e.style = "fq"));
}
const Qu = 300, io = "*", tp = {
  type: "USJ",
  version: "3.1",
  content: [
    {
      type: "para"
    }
  ]
};
function wg({
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
  inline: w = !1,
  ref: p,
  initialCaretPosition: h,
  markerPalette: v,
  onNoteEdit: y
}) {
  var Ve;
  const f = M(null), m = M(null), N = M(null), T = M(s);
  Z(() => {
    T.current = s;
  }, [s]);
  const D = M(h);
  Z(() => {
    D.current = h;
  }, [h]);
  const E = $(() => {
    var P, H;
    const k = D.current;
    k !== void 0 && k !== "end" ? (P = f.current) == null || P.selectNoteTextOffset(0, k.utf16Offset, {
      field: k.field,
      glyph: k.glyph
    }) : (H = f.current) == null || H.selectNote(0);
  }, []);
  Lt(() => {
    if (w || !N.current) return;
    const k = parseFloat(getComputedStyle(N.current).width);
    k > 0 && (N.current.style.width = `${k}px`);
  }, [w]);
  const [L, S] = C("generated"), [z, I] = C("generated"), [R, O] = C(io), [J, et] = C(io), [rt, g] = C("f"), [j, F] = C(!1), [B, X] = C(!0), [U, W] = C(!1), ct = M(!1), vt = M(""), Q = M(!1), wt = M(void 0), ht = M([]), gt = $(() => {
    var P, H;
    const k = (P = f.current) == null ? void 0 : P.getOpsAfterNote(0);
    k != null && k.length && (ht.current = [...ht.current, ...k], (H = f.current) == null || H.applyUpdate([{ retain: 1 }, { delete: Zu(k) }]));
  }, []), [ft, Tt] = C(!1), zt = Au(), [ze, be] = C(), Bt = M(null), lt = M(
    void 0
  ), Yt = M(0), xe = M(v);
  Z(() => {
    xe.current = v;
  }, [v]), Z(
    () => () => {
      var k;
      lt.current && (lt.current = void 0, (k = xe.current) == null || k.dismiss());
    },
    []
  );
  const pe = M(void 0), Jt = $(() => {
    var P, H, q;
    if ((P = f.current) != null && P.getSelection()) return;
    const k = pe.current;
    k ? (H = f.current) == null || H.setSelection(k) : (q = f.current) == null || q.selectNote(0);
  }, []), ut = $(() => {
    var k;
    Jt(), (k = f.current) == null || k.focus();
  }, [Jt]), jt = V(
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
        ...i.view ?? gd(),
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
  ), ye = V(
    () => Wu(
      f,
      () => Tt(!1),
      d,
      ze,
      rt
    ),
    [d, ze, rt]
  );
  Z(() => {
    var k;
    ft || (k = f.current) == null || k.focus();
  }, [rt, ft]);
  const Zt = $(() => {
    var q, at, G;
    const k = (q = m.current) == null ? void 0 : q.querySelector(".editor-input"), P = k == null ? void 0 : k.querySelector("span.note"), H = (G = (at = m.current) == null ? void 0 : at.ownerDocument.getSelection()) == null ? void 0 : G.anchorNode;
    return !!P && !!H && P.contains(H);
  }, []), Ft = $(
    (k = !1) => {
      var H, q, at;
      y == null || y();
      const P = (q = (H = f.current) == null ? void 0 : H.getNoteOps(0)) == null ? void 0 : q.at(0);
      if (P && Lr("note", P) && (r == null || r([P]), k && l && T.current)) {
        const G = ht.current;
        if (w && G.length === 0 && gi(P, wt.current))
          return;
        wt.current = P, ht.current = [], (at = l.current) == null || at.replaceEmbedUpdate(T.current, [
          P,
          ...G
        ]);
      }
    },
    [w, r, y, l]
  ), se = $(
    (k) => {
      var H, q, at;
      const P = (H = f.current) == null ? void 0 : H.getSelection();
      (q = f.current) == null || q.applyUpdate([k, { delete: 1 }]), P && ((at = f.current) == null || at.setSelection(P)), ut();
    },
    [ut]
  ), Ae = $(
    (k, P) => {
      var at, G, _;
      lt.current || (at = f.current) == null || at.commitPendingMarkerEdits();
      const H = (_ = (G = f.current) == null ? void 0 : G.getNoteOps(0)) == null ? void 0 : _.at(0);
      if (!H || !Lr("note", H) || !H.insert.note) return;
      let q;
      k === "custom" ? q = P : k === "generated" ? q = vo : q = bo, H.insert.note.caller !== q && (H.insert.note.caller = q, se(H));
    },
    [se]
  ), bt = M(void 0), he = M(Ft);
  Z(() => {
    he.current = Ft;
  }, [Ft]);
  const Qt = $(() => {
    bt.current !== void 0 && (clearTimeout(bt.current), bt.current = void 0);
  }, []), A = $(() => {
    bt.current !== void 0 && (Qt(), he.current(!0));
  }, [Qt]), pt = $(() => {
    Qt(), bt.current = setTimeout(() => {
      bt.current = void 0, he.current(!0);
    }, Qu);
  }, [Qt]);
  Z(() => {
    var at, G;
    let k, P, H;
    ct.current = !1, Q.current = !1, pe.current = void 0, X(!0);
    const q = e == null ? void 0 : e.at(0);
    if (wt.current = q, ht.current = [], q && Lr("note", q)) {
      const _ = (at = q.insert.note) == null ? void 0 : at.caller;
      let tt = "custom";
      _ === vo ? tt = "generated" : _ === bo && (tt = "hidden");
      const nt = tt === "custom" && _ !== void 0 ? _ : io;
      O(nt), et(nt), S(tt), I(tt), g(((G = q.insert.note) == null ? void 0 : G.style) ?? "f"), k = setTimeout(() => {
        var At, kt, Kt, re;
        const yt = (kt = (At = f.current) == null ? void 0 : At.getNoteOps(0)) == null ? void 0 : kt.at(0);
        (Kt = f.current) == null || Kt.applyUpdate(yt ? [q, { delete: 1 }] : [q]), E(), (re = f.current) == null || re.focus(), P = requestAnimationFrame(() => {
          H = setTimeout(() => {
            var Ne;
            Zt() || (E(), (Ne = f.current) == null || Ne.focus());
          }, 0);
        });
      }, 0);
    }
    return () => {
      A(), D.current = void 0, k && clearTimeout(k), P !== void 0 && cancelAnimationFrame(P), H !== void 0 && clearTimeout(H);
    };
  }, [e, A, Zt, E]), Lt(() => () => A(), [A]);
  const ke = $(() => {
    var k;
    Q.current && (lt.current || (k = f.current) == null || k.commitPendingMarkerEdits(), A());
  }, [A]);
  fi(
    p,
    () => ({
      flushPendingEdits: ke,
      focus: () => {
        var k;
        return (k = f.current) == null ? void 0 : k.focus();
      },
      containsFocus: () => {
        const k = N.current;
        return !!k && k.contains(k.ownerDocument.activeElement);
      }
    }),
    [ke]
  );
  const Ot = $(() => {
    var k, P;
    if (!lt.current) {
      const H = (k = m.current) == null ? void 0 : k.querySelector(".editor-input");
      H != null && H.contains(H.ownerDocument.activeElement) && H.blur(), (P = f.current) == null || P.commitPendingMarkerEdits();
    }
    w ? A() : (Qt(), Ft(!0)), o();
  }, [Qt, A, w, o, Ft]), Dt = M(Ot);
  Lt(() => {
    Dt.current = Ot;
  });
  const _e = M({ book: n.book, chapterNum: n.chapterNum });
  Lt(() => {
    (_e.current.book !== n.book || _e.current.chapterNum !== n.chapterNum) && (_e.current = { book: n.book, chapterNum: n.chapterNum }, Dt.current());
  }, [n.book, n.chapterNum]);
  const te = () => {
    var P;
    const k = (P = m.current) == null ? void 0 : P.getElementsByClassName("editor-input")[0];
    k != null && k.textContent && navigator.clipboard.writeText(k.textContent);
  }, ee = $(
    (k, P) => {
      y == null || y(), S(k), O(P), Ae(k, P), w && A();
    },
    [Ae, A, w, y]
  ), Re = (k) => {
    var H, q, at, G, _;
    g(k), lt.current || (H = f.current) == null || H.commitPendingMarkerEdits();
    const P = (at = (q = f.current) == null ? void 0 : q.getNoteOps(0)) == null ? void 0 : at.at(0);
    if (P && Lr("note", P)) {
      P.insert.note && (P.insert.note.style = k);
      const tt = (_ = (G = P.insert.note) == null ? void 0 : G.contents) == null ? void 0 : _.ops;
      rt !== "x" && k === "x" ? tt == null || tt.forEach((nt) => Xu(nt)) : rt === "x" && k !== "x" && (tt == null || tt.forEach((nt) => Ju(nt))), se(P), w && A();
    }
  }, Oe = (k) => {
    be(k.contextMarker), W(k.canRedo);
  }, Ut = $(
    (k) => {
      var H, q, at, G, _, tt, nt;
      const P = (q = (H = f.current) == null ? void 0 : H.getNoteOps(0)) == null ? void 0 : q.at(0);
      if (P && Lr("note", P)) {
        k.content.length > 1 && setTimeout(() => {
          var kt;
          (kt = f.current) == null || kt.applyUpdate([{ retain: 2 }, { delete: 1 }]);
        }, 0);
        const yt = (at = P.insert.note) == null ? void 0 : at.style, At = (_ = (G = P.insert.note) == null ? void 0 : G.contents) == null ? void 0 : _.ops;
        if (yt || F(!1), F(
          yt === "x" ? !!(At != null && At.every((kt) => {
            var re, Ne;
            if (!((re = kt.attributes) != null && re.char)) return !0;
            const Kt = ((Ne = kt.attributes) == null ? void 0 : Ne.char).style;
            return Kt === "xt" || Kt === "xo" || Kt === "xq";
          })) : !!(At != null && At.every((kt) => {
            var re, Ne;
            if (!((re = kt.attributes) != null && re.char)) return !0;
            const Kt = ((Ne = kt.attributes) == null ? void 0 : Ne.char).style;
            return Kt === "ft" || Kt === "fr" || Kt === "fq";
          }))
        ), !ct.current) {
          ct.current = !0, vt.current = JSON.stringify(P), X(!0);
          return;
        }
        Q.current = !0, (nt = (tt = f.current) == null ? void 0 : tt.getOpsAfterNote(0)) != null && nt.length && setTimeout(gt, 0), X(JSON.stringify(P) === vt.current), Ft(), w && pt();
      } else
        F(!1), X(!0);
    },
    [w, Ft, pt, gt]
  ), ce = $(() => {
    const k = window.getSelection();
    if (!ye.length || !k || k.rangeCount === 0)
      return;
    const P = m.current;
    if (!P) return;
    const H = k.getRangeAt(0).cloneRange();
    zt.setSource({
      measure: () => {
        const q = $u(H);
        return q && Vu(q);
      },
      contextElement: P
    }), Tt(!0);
  }, [ye, zt]), St = M(() => {
  }), Rt = $(
    (k, P, H) => {
      const { anchorRect: q } = k;
      if (!v || !q) return;
      const { passive: at } = H;
      Zs({
        items: P,
        passive: at,
        // No `shouldSpaceCommit`, deliberately: the Space note-marker exception exists for
        // Standard-view BODY text, where a materialized `\f ` literal absorbs the following word
        // as the new footnote's caller. This palette offers note-INTERNAL markers for content
        // already inside a note, so Space keeps its plain typed-literal commit here.
        sessionCounterRef: Yt,
        setSession: (G) => {
          lt.current = G;
        },
        clearSessionIfCurrent: (G) => an(lt, G),
        // Through the ref so the palette always runs the CURRENT handler — the callback is
        // captured once, at show time, while the session it drives is replaced on every reopen.
        runSessionKey: (G) => St.current(G),
        show: (G) => v.show(
          P.map(Yu),
          q,
          at,
          G
        ),
        // What a lost selection costs on this path specifically: the apply lands the marker as an
        // invalid trailing span after the note's closing marker while the typed literal strands at
        // the real caret (live-observed: a red `\fq` after `\f*`).
        restoreSelectionIfLost: Jt,
        focusEditor: () => {
          var G;
          return (G = f.current) == null ? void 0 : G.focus();
        },
        applyItem: (G) => {
          var _;
          return (_ = f.current) == null ? void 0 : _.applyMarkerMenuSelection(G, {
            trigger: "backslash",
            // ACTIVE palette: the trigger was claimed and never landed, so there is never a
            // literal prefix for the apply to clean up.
            literalPrefixLanded: !1
          });
        },
        onShowError: (G) => {
          (!Jc(G) || G.code !== Qc) && console.warn(
            `FootnoteEditor: the marker palette did not open: ${tl(G)}`
          );
        }
      });
    },
    [v, Jt]
  ), ge = $(() => {
    var H;
    const k = (H = f.current) == null ? void 0 : H.getMarkerMenuContext();
    if (!k) return !1;
    const P = fd(jt.styleInfo ?? md, k);
    return P.length === 0 ? !1 : (Rt(k, P, { passive: !k.hasTextSelection }), !0);
  }, [Rt, jt.styleInfo]), fe = $(
    (k) => {
      const P = lt.current;
      if (!P || !v) return;
      Xs(k, P, {
        // Overlay ops delegate to the host-supplied driver; the commit ops are EDITOR-side
        // applies this popover owns (it holds the editor ref). The table calls `dismiss()` right
        // after each, resolving the show promise `undefined` — which the openMarkerPalette
        // `.then` treats as a dismissal, so nothing double-applies.
        update: (q) => v.update(q),
        commit: () => v.commit(),
        dismiss: () => v.dismiss(),
        commitTyped: (q) => {
          var at;
          return (at = f.current) == null ? void 0 : at.commitTypedMarker(q);
        },
        commitTypedAndReopen: (q) => {
          var at;
          (at = f.current) == null || at.commitTypedMarker(q, { trailingSpace: !1 }), ge();
        },
        commitTypedCloser: (q) => {
          var at;
          return (at = f.current) == null ? void 0 : at.commitTypedCloser(q);
        },
        commitItem: (q) => {
          var G;
          const at = P.items.find((_) => _.marker === q);
          at && ((G = f.current) == null || G.applyMarkerMenuSelection(at, {
            trigger: "backslash",
            literalPrefixLanded: !1
          }));
        }
      }) === "ended" && an(lt, P.token);
    },
    [v, ge]
  );
  Z(() => {
    St.current = fe;
  }, [fe]), Z(() => {
    const k = (P) => {
      var at, G;
      const H = (at = m.current) == null ? void 0 : at.querySelector(".editor-input");
      if (!H || P.target !== H) return;
      const q = (G = f.current) == null ? void 0 : G.getSelection();
      q && (pe.current = q);
    };
    return document.addEventListener("focusout", k), () => document.removeEventListener("focusout", k);
  }, []), Z(() => {
    const k = () => {
      ft && Tt(!1);
    };
    return window.addEventListener("click", k), () => {
      window.removeEventListener("click", k);
    };
  }, [ft]), Z(() => {
    var k;
    ft && ((k = Bt.current) == null || k.focus());
  }, [ft]), Z(() => {
    var H;
    const k = () => {
      var q;
      return ((q = m.current) == null ? void 0 : q.querySelector(".editor-input")) ?? void 0;
    };
    if (((H = jt.view) == null ? void 0 : H.markerMode) === "editable") {
      const q = (G) => {
        var nt, yt, At, kt;
        if (on(G)) return;
        const _ = lt.current, tt = k();
        if (!(!tt || document.activeElement !== tt)) {
          if (_ && v) {
            St.current(G);
            return;
          }
          if (G.key === "Enter" && !Zt()) {
            G.preventDefault(), G.stopPropagation(), (nt = f.current) == null || nt.selectNote(0), (yt = f.current) == null || yt.focus();
            return;
          }
          if (v && G.key === c) {
            if (!Zt()) {
              G.preventDefault(), G.stopPropagation(), (At = f.current) == null || At.selectNote(0), (kt = f.current) == null || kt.focus();
              return;
            }
            ge() && (G.preventDefault(), G.stopPropagation());
          }
        }
      }, at = () => {
        var _, tt;
        const G = k();
        !G || document.activeElement !== G || Zt() || ((_ = f.current) == null || _.selectNote(0), (tt = f.current) == null || tt.focus());
      };
      return document.addEventListener("keydown", q, { capture: !0 }), document.addEventListener("paste", at, { capture: !0 }), () => {
        document.removeEventListener("keydown", q, { capture: !0 }), document.removeEventListener("paste", at, { capture: !0 });
      };
    }
    const P = (q) => {
      const at = k();
      !ft && at && document.activeElement === at && q.key === c ? (q.preventDefault(), ce()) : ft && q.key === "Escape" && (q.preventDefault(), Tt(!1));
    };
    return document.addEventListener("keydown", P), () => {
      document.removeEventListener("keydown", P);
    };
  }, [
    ft,
    ce,
    c,
    (Ve = jt.view) == null ? void 0 : Ve.markerMode,
    jt.styleInfo,
    v,
    ge,
    Zt
  ]), Z(() => {
    const k = N.current;
    if (!w || !k) return;
    const P = (H) => {
      H.key !== "Escape" || H.defaultPrevented || on(H) || (H.preventDefault(), H.stopPropagation(), Dt.current());
    };
    return k.addEventListener("keydown", P), () => k.removeEventListener("keydown", P);
  }, [w]), Z(() => {
    const k = () => {
      var q, at, G;
      const P = ((q = m.current) == null ? void 0 : q.querySelector(".editor-input")) ?? void 0;
      if (!P || document.activeElement !== P) return;
      const H = document.getSelection();
      H && !H.isCollapsed || Zt() || ((at = f.current) == null || at.selectNote(0), (G = f.current) == null || G.focus());
    };
    return document.addEventListener("pointerup", k), document.addEventListener("selectionchange", k), () => {
      document.removeEventListener("pointerup", k), document.removeEventListener("selectionchange", k);
    };
  }, [Zt]);
  const me = d["%footnoteEditor_copyButton_tooltip%"], $e = /* @__PURE__ */ a(
    Pu,
    {
      onUndoClick: () => {
        var k;
        return (k = f.current) == null ? void 0 : k.undo();
      },
      onRedoClick: () => {
        var k;
        return (k = f.current) == null ? void 0 : k.redo();
      },
      canUndo: !B,
      canRedo: U,
      localizedStrings: d
    }
  );
  return /* @__PURE__ */ u(xt, { children: [
    /* @__PURE__ */ u(
      "div",
      {
        ref: N,
        className: x("footnote-editor tw:grid tw:max-w-full tw:gap-[12px]", w && "tw:w-full"),
        children: [
          /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-wrap tw:gap-y-2", children: [
            /* @__PURE__ */ u("div", { className: x("tw:flex tw:gap-4", w && "tw:flex-wrap"), children: [
              /* @__PURE__ */ a(
                Uu,
                {
                  isTypeSwitchable: j,
                  noteType: rt,
                  handleNoteTypeChange: Re,
                  localizedStrings: d,
                  focusNoteText: ut
                }
              ),
              /* @__PURE__ */ a(
                Bu,
                {
                  callerType: L,
                  customCaller: R,
                  updateCaller: ee,
                  localizedStrings: d,
                  focusNoteText: ut
                }
              ),
              w && $e
            ] }),
            !w && /* @__PURE__ */ a("div", { className: "tw:flex tw:flex-1 tw:justify-end", children: /* @__PURE__ */ u(Aa, { children: [
              $e,
              /* @__PURE__ */ a(
                us,
                {
                  onCancelClick: o,
                  onAcceptClick: Ot,
                  canAccept: !B || z !== L || L === "custom" && R !== J,
                  localizedStrings: d,
                  acceptLabel: d["%footnoteEditor_saveButton_tooltip%"]
                }
              )
            ] }) })
          ] }),
          /* @__PURE__ */ u(
            "div",
            {
              ref: m,
              className: "tw:relative tw:rounded-[6px] tw:border-2 tw:border-ring",
              children: [
                /* @__PURE__ */ a("div", { className: t, children: /* @__PURE__ */ a(
                  zu,
                  {
                    editorRef: f,
                    canUndo: !B,
                    canRedo: U,
                    children: /* @__PURE__ */ a(
                      vd,
                      {
                        options: jt,
                        onStateChange: Oe,
                        onUsjChange: Ut,
                        defaultUsj: tp,
                        onScrRefChange: () => {
                        },
                        scrRef: n,
                        ref: f
                      }
                    )
                  }
                ) }),
                /* @__PURE__ */ a("div", { className: "tw:absolute tw:bottom-0 tw:end-0", children: /* @__PURE__ */ a(Pt, { children: /* @__PURE__ */ u(_t, { children: [
                  /* @__PURE__ */ a(Nt, { asChild: !0, children: /* @__PURE__ */ a(
                    ot,
                    {
                      "aria-label": me,
                      onClick: te,
                      className: "tw:h-6 tw:w-6",
                      variant: "ghost",
                      size: "icon",
                      children: /* @__PURE__ */ a(di, {})
                    }
                  ) }),
                  /* @__PURE__ */ a(Ct, { children: /* @__PURE__ */ a("p", { children: me }) })
                ] }) }) })
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ u(mr, { open: ft, children: [
      /* @__PURE__ */ a(Js, { virtualRef: zt.virtualRef }),
      /* @__PURE__ */ a(
        vr,
        {
          className: "tw:w-[500px] tw:p-0",
          onClick: (k) => {
            k.preventDefault(), k.stopPropagation();
          },
          children: /* @__PURE__ */ a(
            Gu,
            {
              markerMenuItems: ye,
              localizedStrings: d,
              searchRef: Bt
            }
          )
        }
      )
    ] })
  ] });
}
const ug = Object.freeze([
  ...Ku,
  ...Object.entries(Fr).map(([, t]) => t.description).filter((t) => !!t),
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
  ...Iu,
  ...ws
]), bs = " ", ep = "\uFEFF";
function xs(t) {
  return t.closed !== "false";
}
function rp(t, e, r = !0, o = void 0, n = void 0) {
  const s = [];
  let i = [];
  (e ?? []).forEach((d) => {
    typeof d != "string" && d.marker === "fp" ? (i.length > 0 && s.push(i), i = [d]) : i.push(d);
  }), i.length > 0 && s.push(i);
  const c = s.length > 0;
  return c || s.push([]), s.map((d, l) => {
    const w = l === 0, p = l === s.length - 1;
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
        w && !c && /* @__PURE__ */ a("span", { className: "note-placeholder", children: ep }),
        w && n,
        ys(t, d, r),
        p && o
      ] }, `${t ?? "note"}-p${l}`)
    );
  });
}
function ys(t, e, r = !0, o = !1) {
  if (!(!e || e.length === 0))
    return e.map((n, s) => {
      const i = `${t ?? "note"}-${s}`;
      return typeof n == "string" ? /* @__PURE__ */ a("span", { className: x(`usfm_${t}`), children: n }, i) : ap(n, i, r, o);
    });
}
function ap(t, e, r, o = !1) {
  const { marker: n } = t;
  if (t.type === "unmatched")
    return /* @__PURE__ */ a("span", { className: "marker", children: `\\${n}` }, e);
  const s = `${o ? "+" : ""}${n}`;
  return /* @__PURE__ */ u("span", { children: [
    n ? r && /* @__PURE__ */ a("span", { className: "marker", children: `\\${s}${bs}` }) : /* @__PURE__ */ a(
      Pc,
      {
        className: "tw:text-error tw:mr-1 tw:inline-block tw:h-4 tw:w-4",
        "aria-label": "Missing marker"
      }
    ),
    ys(
      n,
      t.content,
      r,
      /* isNestedContent */
      !0
    ),
    n && r && xs(t) && /* @__PURE__ */ a("span", { className: "marker", children: `\\${s}*` })
  ] }, e);
}
function op({
  footnote: t,
  layout: e = "horizontal",
  formatCaller: r,
  showMarkers: o = !0
}) {
  const n = r ? r(t.caller) : t.caller, s = n !== t.caller, i = o ? /* @__PURE__ */ a("span", { className: "marker", children: `\\${t.marker}` }) : void 0, c = o && xs(t) ? /* @__PURE__ */ a("span", { className: "marker note-closer", children: `\\${t.marker}*` }) : void 0, d = t.category ? (
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
      o && /* @__PURE__ */ a("span", { className: "marker", children: `\\cat${bs}` }),
      /* @__PURE__ */ a("span", { className: "note-category-value", children: t.category }),
      o && /* @__PURE__ */ a("span", { className: "marker", children: "\\cat*" }),
      !o && " "
    ] })
  ) : void 0, l = n && // USFM does not specify a marker for caller, so instead of a usfm_* class, we use a
  // specific class name in case styling is needed.
  /* @__PURE__ */ a("span", { className: x("note-caller tw:inline-block", { formatted: s }), children: n }), w = e === "horizontal" ? "horizontal" : "vertical", p = o ? "marker-visible" : "", h = e === "horizontal" ? "tw:col-span-1" : "tw:col-span-2 tw:col-start-1 tw:row-start-2", v = x(w, p);
  return /* @__PURE__ */ u(xt, { children: [
    /* @__PURE__ */ u("div", { className: x("textual-note-header tw:col-span-1 tw:w-fit tw:text-nowrap", v), children: [
      i,
      !!i && !!l && " ",
      l
    ] }),
    /* @__PURE__ */ a(
      "div",
      {
        className: x(
          "textual-note-body tw:flex tw:flex-col tw:gap-1",
          h,
          v
        ),
        children: rp(
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
const np = "editing-row";
function ga(t, e, r, o) {
  let n = Math.min(Math.max(t + e, 0), r);
  if (n === o) {
    const s = Math.min(Math.max(n + e, 0), r);
    n = s === n ? t : s;
  }
  return n === o ? t : n;
}
function pg({
  ariaLabel: t = "Footnotes",
  className: e,
  classNameForItems: r,
  footnotes: o,
  layout: n = "horizontal",
  listId: s,
  selectedFootnote: i,
  selectionRequest: c,
  showMarkers: d = !0,
  suppressFormatting: l = !1,
  formatCaller: w,
  onFootnoteSelected: p,
  onFootnoteEditRequested: h,
  onFocusedFootnoteChange: v,
  editingFootnoteIndex: y,
  renderEditingFootnote: f
}) {
  const m = w ?? el(o, void 0), N = f ? y : void 0, T = M([]), D = (g, j, F) => {
    if (h) {
      const B = T.current[j], X = B ? Mu(F.clientX, F.clientY, B) : "end";
      h(g, j, s, X);
      return;
    }
    p == null || p(g, j, s);
  }, E = i ? o.findIndex((g) => g === i) : -1, [L, S] = C(E), z = (g) => {
    var j;
    S(g), g >= 0 && g < T.current.length && ((j = T.current[g]) == null || j.focus());
  }, I = (g, j, F) => {
    if (o.length)
      switch (g.key) {
        case "Enter":
          g.preventDefault(), h ? h(j, F, s, "end") : p == null || p(j, F, s);
          break;
        case " ":
          g.preventDefault(), p == null || p(j, F, s);
          break;
      }
  }, R = o.length - 1, O = (g) => {
    if (o.length && !(g.target !== g.currentTarget && !(g.target instanceof HTMLElement && g.target.closest('li[role="option"]'))))
      switch (g.key) {
        case "ArrowDown":
          g.preventDefault(), z(ga(L, 1, R, N));
          break;
        case "ArrowUp":
          g.preventDefault(), z(ga(L, -1, R, N));
          break;
      }
  };
  Z(() => {
    N === void 0 || L !== N || S((g) => {
      const j = ga(g, 1, R, N);
      if (j !== g) return j;
      const F = ga(g, -1, R, N);
      return F !== g ? F : -1;
    });
  }, [N, L, R]);
  const J = M(void 0), et = (g) => {
    J.current !== g && (J.current = g, v == null || v(g));
  };
  Z(() => {
    const g = J.current;
    if (g === void 0) return;
    const j = T.current[g];
    (!j || j.ownerDocument.activeElement !== j) && (J.current = void 0, v == null || v(void 0));
  });
  const rt = i ? o.findIndex((g) => g === i) : -1;
  return Z(() => {
    var g;
    rt < 0 || rt >= T.current.length || (g = T.current[rt]) == null || g.scrollIntoView({ block: "nearest" });
  }, [rt, c]), // Every row is its own tab stop (see the row `tabIndex` below), so the list is not one as
  // well - a stop here would put an extra, contentless press between whatever precedes the list
  // and its first note. It stays programmatically focusable (`-1`) because arrow-key navigation
  // starts by focusing it. With NO rows there is no row to be that stop, so the list takes the
  // turn itself rather than leaving the region unreachable by keyboard.
  /* @__PURE__ */ a(
    "div",
    {
      role: "listbox",
      "aria-label": t,
      tabIndex: o.length === 0 ? 0 : -1,
      className: x("tw:h-full tw:overflow-y-auto", e),
      onKeyDown: O,
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
          children: o.map((g, j) => {
            const F = g === i, B = j === y && !!f, X = B ? np : `${s}-${j}`, U = j < o.length - 1 && n === "vertical" && /* @__PURE__ */ a(Zr, { tabIndex: -1, className: "tw:col-span-2" });
            return B ? /* @__PURE__ */ u(gr, { children: [
              /* @__PURE__ */ a(
                "li",
                {
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
                  children: f(g, j)
                }
              ),
              U
            ] }, X) : (
              // The key belongs on the outermost node returned from the map — the Fragment — not on
              // the `<li>` nested inside it, which leaves the Fragment itself unkeyed.
              /* @__PURE__ */ u(gr, { children: [
                /* @__PURE__ */ a(
                  "li",
                  {
                    ref: (W) => {
                      T.current[j] = W;
                    },
                    role: "option",
                    "aria-selected": F,
                    "data-marker": g.marker,
                    "data-state": F ? "selected" : void 0,
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
                    onClick: (W) => D(g, j, W),
                    onFocus: () => {
                      S(j), et(j);
                    },
                    onBlur: () => et(void 0),
                    onKeyDown: (W) => I(W, g, j),
                    children: /* @__PURE__ */ a(
                      op,
                      {
                        footnote: g,
                        layout: n,
                        formatCaller: () => m(g.caller, j),
                        showMarkers: d
                      }
                    )
                  }
                ),
                U
              ] }, X)
            );
          })
        }
      )
    }
  );
}
function ip(t) {
  const e = [];
  let r = 0;
  const o = /\\\\(.+?)\\\\/g;
  let n;
  for (; (n = o.exec(t)) !== null; )
    n.index > r && e.push(t.substring(r, n.index)), e.push(/* @__PURE__ */ a("strong", { children: n[1] }, n.index)), r = o.lastIndex;
  return r < t.length && e.push(t.substring(r)), e.length > 0 ? e : [t];
}
function sp({
  occurrenceData: t,
  setScriptureReference: e,
  localizedStrings: r,
  classNameForText: o
}) {
  const n = $r(), s = r["%webView_inventory_occurrences_table_header_reference%"], i = r["%webView_inventory_occurrences_table_header_occurrence%"], c = V(() => {
    const d = [], l = /* @__PURE__ */ new Set();
    return t.forEach((w) => {
      const p = `${w.reference.book}:${w.reference.chapterNum}:${w.reference.verseNum}:${w.text}`;
      l.has(p) || (l.add(p), d.push(w));
    }), d;
  }, [t]);
  return /* @__PURE__ */ u(Mo, { stickyHeader: !0, children: [
    /* @__PURE__ */ a(Io, { stickyHeader: !0, children: /* @__PURE__ */ u(ar, { children: [
      /* @__PURE__ */ a(Ea, { children: s }),
      /* @__PURE__ */ a(Ea, { children: i })
    ] }) }),
    /* @__PURE__ */ a(Po, { children: c.length > 0 && c.map((d) => /* @__PURE__ */ u(
      ar,
      {
        onClick: () => {
          e(d.reference);
        },
        children: [
          /* @__PURE__ */ a(Er, { children: We(d.reference, "English") }),
          /* @__PURE__ */ a(
            Er,
            {
              className: o,
              "data-platform-content-zoom-root": n["data-platform-content-zoom-root"],
              "data-platform-content-zoom-label": n["data-platform-content-zoom-label"],
              children: ip(d.text)
            }
          )
        ]
      },
      `${d.reference.book} ${d.reference.chapterNum}:${d.reference.verseNum}-${d.text}`
    )) })
  ] });
}
function ks({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    fn.Root,
    {
      "data-slot": "checkbox",
      className: x(
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
          children: /* @__PURE__ */ a(La, {})
        }
      )
    }
  );
}
const cp = (t) => {
  if (t === "asc")
    return /* @__PURE__ */ a(Vc, { className: "tw:h-4 tw:w-4" });
  if (t === "desc")
    return /* @__PURE__ */ a(Lc, { className: "tw:h-4 tw:w-4" });
}, Fa = (t, e, r) => /* @__PURE__ */ a(Pt, { children: /* @__PURE__ */ u(_t, { children: [
  /* @__PURE__ */ u(
    Nt,
    {
      className: x("tw:flex tw:w-full tw:justify-start", r),
      variant: "ghost",
      onClick: () => t.toggleSorting(void 0),
      children: [
        /* @__PURE__ */ a("span", { className: "tw:w-6 tw:max-w-fit tw:flex-1 tw:overflow-hidden tw:text-ellipsis", children: e }),
        cp(t.getIsSorted())
      ]
    }
  ),
  /* @__PURE__ */ a(Ct, { side: "bottom", children: e })
] }) }), hg = (t) => ({
  accessorKey: "item",
  accessorFn: (e) => e.items[0],
  header: ({ column: e }) => Fa(e, t)
}), lp = (t, e) => ({
  accessorKey: `item${e}`,
  accessorFn: (r) => r.items[e],
  header: ({ column: r }) => Fa(r, t)
}), gg = (t) => ({
  accessorKey: "count",
  header: ({ column: e }) => Fa(e, t, "tw:justify-end"),
  cell: ({ row: e }) => /* @__PURE__ */ a("div", { className: "tw:flex tw:justify-end tw:tabular-nums", children: e.getValue("count") })
}), so = (t, e, r, o, n, s) => {
  let i = [...r];
  t.forEach((d) => {
    e === "approved" ? i.includes(d) || i.push(d) : i = i.filter((l) => l !== d);
  }), o(i);
  let c = [...n];
  t.forEach((d) => {
    e === "unapproved" ? c.includes(d) || c.push(d) : c = c.filter((l) => l !== d);
  }), s(c);
}, fg = (t, e, r, o, n) => ({
  accessorKey: "status",
  header: ({ column: s }) => Fa(s, t, "tw:justify-center"),
  cell: ({ row: s }) => {
    const i = s.getValue("status"), c = s.getValue("item");
    return (
      // Center the status buttons in the cell to match the centered status column header (the
      // ToggleGroup would otherwise sit left-aligned).
      /* @__PURE__ */ a("div", { className: "tw:flex tw:justify-center", children: /* @__PURE__ */ u(Qn, { value: i, variant: "outline", type: "single", className: "tw:gap-0", children: [
        /* @__PURE__ */ a(
          fa,
          {
            onClick: (d) => {
              d.stopPropagation(), so(
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
            children: /* @__PURE__ */ a(zc, {})
          }
        ),
        /* @__PURE__ */ a(
          fa,
          {
            onClick: (d) => {
              d.stopPropagation(), so(
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
            children: /* @__PURE__ */ a(Ac, {})
          }
        ),
        /* @__PURE__ */ a(
          fa,
          {
            onClick: (d) => {
              d.stopPropagation(), so(
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
            children: /* @__PURE__ */ a($c, {})
          }
        )
      ] }) })
    );
  }
}), mg = (t) => t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g), vg = (t) => {
  const e = /^\\[vc]\s+(\d+)/, r = t.match(e);
  if (r)
    return +r[1];
}, bg = (t) => {
  const e = t.match(/^\\id\s+([A-Za-z]+)/);
  return e ? e[1] : "";
}, dp = (t, e, r) => r.includes(t) ? "unapproved" : e.includes(t) ? "approved" : "unknown", xg = Object.freeze([
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
]), wp = (t, e, r) => {
  let o = t;
  return e !== "all" && (o = o.filter(
    (n) => e === "approved" && n.status === "approved" || e === "unapproved" && n.status === "unapproved" || e === "unknown" && n.status === "unknown"
  )), r !== "" && (o = o.filter((n) => n.items[0].includes(r))), o;
}, up = (t, e, r) => t.map((o) => {
  const n = dn(o.key) ? o.key : o.key[0];
  return {
    items: dn(o.key) ? [o.key] : o.key,
    count: o.count,
    status: o.status || dp(n, e, r),
    occurrences: o.occurrences || []
  };
}), Le = (t, e) => t[e] ?? e;
function yg({
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
  const v = Le(r, "%webView_inventory_all%"), y = Le(r, "%webView_inventory_approved%"), f = Le(r, "%webView_inventory_unapproved%"), m = Le(r, "%webView_inventory_unknown%"), N = Le(r, "%webView_inventory_scope_currentBook%"), T = Le(r, "%webView_inventory_scope_chapter%"), D = Le(r, "%webView_inventory_scope_verse%"), E = Le(r, "%webView_inventory_filter_text%"), L = Le(
    r,
    "%webView_inventory_show_additional_items%"
  ), S = Le(r, "%webView_inventory_no_results%"), [z, I] = C(!1), [R, O] = C("all"), [J, et] = C(""), [rt, g] = C([]), j = V(() => {
    const Q = t ?? [];
    return Q.length === 0 ? [] : up(Q, n, s);
  }, [t, n, s]), F = V(() => {
    if (z) return j;
    const Q = [];
    return j.forEach((wt) => {
      const ht = wt.items[0], gt = Q.find(
        (ft) => ft.items[0] === ht
      );
      gt ? (gt.count += wt.count, gt.occurrences = gt.occurrences.concat(wt.occurrences)) : Q.push({
        items: [ht],
        count: wt.count,
        occurrences: wt.occurrences,
        status: wt.status
      });
    }), Q;
  }, [z, j]), B = V(() => F.length === 0 ? [] : wp(F, R, J), [F, R, J]), X = V(() => {
    var ht, gt;
    if (!z) return d;
    const Q = (ht = o == null ? void 0 : o.tableHeaders) == null ? void 0 : ht.length;
    if (!Q) return d;
    const wt = [];
    for (let ft = 0; ft < Q; ft++)
      wt.push(
        lp(
          ((gt = o == null ? void 0 : o.tableHeaders) == null ? void 0 : gt[ft]) || "Additional Item",
          ft + 1
        )
      );
    return [...wt, ...d];
  }, [o == null ? void 0 : o.tableHeaders, d, z]);
  Z(() => {
    B.length === 0 ? g([]) : B.length === 1 && g(B[0].items);
  }, [B]);
  const U = (Q, wt) => {
    wt.setRowSelection(() => {
      const gt = {};
      return gt[Q.index] = !0, gt;
    });
    const ht = Q.original.items;
    g(ht), h && ht.length > 0 && h(ht[0]);
  }, W = (Q) => {
    if (Q === "book" || Q === "chapter" || Q === "verse")
      c(Q);
    else
      throw new Error(`Invalid scope value: ${Q}`);
  }, ct = (Q) => {
    if (Q === "all" || Q === "approved" || Q === "unapproved" || Q === "unknown")
      O(Q);
    else
      throw new Error(`Invalid status filter value: ${Q}`);
  }, vt = V(() => {
    if (F.length === 0 || rt.length === 0) return [];
    const Q = F.filter((wt) => gi(
      z ? wt.items : [wt.items[0]],
      rt
    ));
    if (Q.length > 1) throw new Error("Selected item is not unique");
    return Q.length === 0 ? [] : Q[0].occurrences;
  }, [rt, z, F]);
  return /* @__PURE__ */ a("div", { id: l, className: "pr-twp tw:h-full tw:overflow-auto", children: /* @__PURE__ */ u("div", { className: "tw:flex tw:h-full tw:w-full tw:min-w-min tw:flex-col", children: [
    /* @__PURE__ */ u("div", { className: "tw:flex tw:items-stretch", style: { contain: "inline-size" }, children: [
      /* @__PURE__ */ u(
        Or,
        {
          onValueChange: (Q) => ct(Q),
          defaultValue: R,
          children: [
            /* @__PURE__ */ a(Mr, { className: "tw:m-1 tw:w-auto tw:flex-1", children: /* @__PURE__ */ a(Dr, { placeholder: "Select filter" }) }),
            /* @__PURE__ */ u(Ir, { children: [
              /* @__PURE__ */ a(Ie, { value: "all", children: v }),
              /* @__PURE__ */ a(Ie, { value: "approved", children: y }),
              /* @__PURE__ */ a(Ie, { value: "unapproved", children: f }),
              /* @__PURE__ */ a(Ie, { value: "unknown", children: m })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ u(Or, { onValueChange: (Q) => W(Q), defaultValue: i, children: [
        /* @__PURE__ */ a(Mr, { className: "tw:m-1 tw:w-auto tw:flex-1", children: /* @__PURE__ */ a(Dr, { placeholder: "Select scope" }) }),
        /* @__PURE__ */ u(Ir, { children: [
          /* @__PURE__ */ a(Ie, { value: "book", children: N }),
          /* @__PURE__ */ a(Ie, { value: "chapter", children: T }),
          /* @__PURE__ */ a(Ie, { value: "verse", children: D })
        ] })
      ] }),
      /* @__PURE__ */ a(
        Va,
        {
          className: "tw:m-1 tw:flex-1 tw:rounded-md tw:border",
          placeholder: E,
          value: J,
          onChange: (Q) => {
            et(Q.target.value);
          }
        }
      ),
      o && /* @__PURE__ */ a(Pt, { children: /* @__PURE__ */ u(_t, { children: [
        /* @__PURE__ */ a(Nt, { asChild: !0, children: /* @__PURE__ */ u("div", { className: "tw:m-1 tw:flex tw:w-fit tw:min-w-[26px] tw:items-center tw:rounded-md tw:border", children: [
          /* @__PURE__ */ a(
            ks,
            {
              className: "tw:m-1 tw:shrink-0",
              checked: z,
              onCheckedChange: (Q) => {
                I(Q);
              }
            }
          ),
          /* @__PURE__ */ a(It, { className: "tw:m-1 tw:truncate", children: (o == null ? void 0 : o.checkboxText) ?? L })
        ] }) }),
        /* @__PURE__ */ a(Ct, { children: (o == null ? void 0 : o.checkboxText) ?? L })
      ] }) })
    ] }),
    /* @__PURE__ */ a("div", { className: "tw:m-1 tw:flex-1 tw:overflow-auto tw:rounded-md tw:border", children: /* @__PURE__ */ a(
      Cu,
      {
        columns: X,
        data: B,
        onRowClickHandler: U,
        stickyHeader: !0,
        isLoading: w,
        noResultsMessage: S
      }
    ) }),
    vt.length > 0 && /* @__PURE__ */ a("div", { className: "tw:m-1 tw:flex-1 tw:overflow-auto tw:rounded-md tw:border", children: /* @__PURE__ */ a(
      sp,
      {
        classNameForText: p,
        occurrenceData: vt,
        setScriptureReference: e,
        localizedStrings: r
      }
    ) })
  ] }) });
}
const pp = "16rem", hp = "3rem", _s = we.createContext(void 0);
function Ua() {
  const t = we.useContext(_s);
  if (!t)
    throw new Error("useSidebar must be used within a SidebarProvider.");
  return t;
}
function gp({
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
  const [d, l] = we.useState(t), w = e ?? d, p = we.useCallback(
    (D) => {
      const E = typeof D == "function" ? D(w) : D;
      r ? r(E) : l(E);
    },
    [r, w]
  ), h = we.useCallback(() => p((D) => !D), [p]), v = w ? "expanded" : "collapsed", m = Ke() === "ltr" ? i : i === "primary" ? "secondary" : "primary", N = we.useMemo(
    () => ({
      state: v,
      open: w,
      setOpen: p,
      toggleSidebar: h,
      // CUSTOM: Passes direction-aware side into context so SidebarTrigger icon and Sidebar
      // positioning both respond correctly in RTL layouts
      side: m
    }),
    [v, w, p, h, m]
  ), T = {
    "--sidebar-width": pp,
    "--sidebar-width-icon": hp,
    ...n
  };
  return /* @__PURE__ */ a(_s.Provider, { value: N, children: /* @__PURE__ */ a(
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
      children: s
    }
  ) });
}
function fp({
  // CUSTOM: Removed 'side' prop from Sidebar - it is now read from context (moved to SidebarProvider)
  variant: t = "sidebar",
  collapsible: e = "offcanvas",
  className: r,
  children: o,
  ...n
}) {
  const s = Ua();
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
            "data-side": s.side,
            className: x(
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
function kg({ className: t, onClick: e, ...r }) {
  const { toggleSidebar: o, side: n } = Ua();
  return /* @__PURE__ */ u(
    ot,
    {
      "data-sidebar": "trigger",
      "data-slot": "sidebar-trigger",
      variant: "ghost",
      size: "icon-sm",
      className: x(t),
      onClick: (s) => {
        e == null || e(s), o();
      },
      ...r,
      children: [
        n === "primary" ? /* @__PURE__ */ a(cl, {}) : /* @__PURE__ */ a(ll, {}),
        /* @__PURE__ */ a("span", { className: "tw:sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
}
function _g({ className: t, ...e }) {
  const { toggleSidebar: r } = Ua();
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
function mp({ className: t, ...e }) {
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
function Ng({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    Va,
    {
      "data-slot": "sidebar-input",
      "data-sidebar": "input",
      className: x("tw:h-8 tw:w-full tw:bg-background tw:shadow-none", t),
      ...e
    }
  );
}
function Cg({ className: t, ...e }) {
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
function Eg({ className: t, ...e }) {
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
function Tg({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    Zr,
    {
      "data-slot": "sidebar-separator",
      "data-sidebar": "separator",
      className: x("tw:mx-2 tw:w-auto tw:bg-sidebar-border", t),
      ...e
    }
  );
}
function vp({ className: t, ...e }) {
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
function Hn({ className: t, ...e }) {
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
function qn({
  className: t,
  asChild: e = !1,
  ...r
}) {
  const o = e ? ra.Root : "div";
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
function Sg({
  className: t,
  asChild: e = !1,
  ...r
}) {
  const o = e ? ra.Root : "button";
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
function Gn({ className: t, ...e }) {
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
function bp({ className: t, ...e }) {
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
function xp({ className: t, ...e }) {
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
const yp = zi(
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
function kp({
  asChild: t = !1,
  isActive: e = !1,
  variant: r = "default",
  size: o = "default",
  tooltip: n,
  className: s,
  ...i
}) {
  const c = t ? ra.Root : "button", { state: d } = Ua(), l = /* @__PURE__ */ a(
    c,
    {
      "data-slot": "sidebar-menu-button",
      "data-sidebar": "menu-button",
      "data-size": o,
      "data-active": e,
      className: x(yp({ variant: r, size: o }), s),
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
function Rg({
  className: t,
  asChild: e = !1,
  showOnHover: r = !1,
  ...o
}) {
  const n = e ? ra.Root : "button";
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
function Og({ className: t, ...e }) {
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
function Dg({
  className: t,
  showIcon: e = !1,
  ...r
}) {
  const [o] = we.useState(() => `${Math.floor(Math.random() * 40) + 50}%`), n = { "--skeleton-width": o };
  return /* @__PURE__ */ u(
    "div",
    {
      "data-slot": "sidebar-menu-skeleton",
      "data-sidebar": "menu-skeleton",
      className: x("tw:flex tw:h-8 tw:items-center tw:gap-2 tw:rounded-md tw:px-2", t),
      ...r,
      children: [
        e && /* @__PURE__ */ a(Cr, { className: "tw:size-4 tw:rounded-md", "data-sidebar": "menu-skeleton-icon" }),
        /* @__PURE__ */ a(
          Cr,
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
function Mg({ className: t, ...e }) {
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
function Ig({ className: t, ...e }) {
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
function Pg({
  asChild: t = !1,
  size: e = "md",
  isActive: r = !1,
  className: o,
  ...n
}) {
  const s = t ? ra.Root : "a";
  return /* @__PURE__ */ a(
    s,
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
function _p({
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
    (m, N) => {
      o(m, N);
    },
    [o]
  ), h = $(
    (m) => {
      const N = r.find((T) => T.projectId === m);
      return N ? N.projectName : m;
    },
    [r]
  ), v = V(
    () => r.map((m) => ({
      id: m.projectId,
      shortName: m.projectName,
      fullName: m.projectFullName
    })),
    [r]
  ), y = V(() => {
    const m = {
      buttonPlaceholder: c,
      ariaLabel: i
    };
    return d && (m.searchPlaceholder = d), l && (m.commandEmptyMessage = l), m;
  }, [c, i, d, l]), f = $(
    (m) => !n.projectId && m === n.label,
    [n]
  );
  return /* @__PURE__ */ a(
    fp,
    {
      id: t,
      collapsible: "none",
      variant: "inset",
      className: x("tw:w-96 tw:gap-2 tw:overflow-y-auto", w),
      children: /* @__PURE__ */ u(vp, { children: [
        /* @__PURE__ */ u(Hn, { children: [
          /* @__PURE__ */ a(qn, { className: "tw:text-sm", children: s }),
          /* @__PURE__ */ a(Gn, { children: /* @__PURE__ */ a(bp, { children: Object.entries(e).map(([m, N]) => /* @__PURE__ */ a(xp, { children: /* @__PURE__ */ a(
            kp,
            {
              onClick: () => p(m),
              isActive: f(m),
              children: /* @__PURE__ */ a("span", { className: "tw:pl-3", children: N })
            }
          ) }, m)) }) })
        ] }),
        /* @__PURE__ */ u(Hn, { children: [
          /* @__PURE__ */ a(qn, { className: "tw:text-sm", children: i }),
          /* @__PURE__ */ a(Gn, { className: "tw:pl-3", children: /* @__PURE__ */ u(
            "div",
            {
              className: x(
                "tw:flex tw:w-full tw:items-center tw:gap-2 tw:rounded-md tw:px-2 tw:py-1",
                {
                  "tw:bg-sidebar-accent tw:text-sidebar-accent-foreground": n == null ? void 0 : n.projectId
                }
              ),
              children: [
                /* @__PURE__ */ a(Bc, { className: "tw:h-4 tw:w-4 tw:shrink-0" }),
                /* @__PURE__ */ a(
                  Qs,
                  {
                    mode: "project",
                    projects: v,
                    openTabs: [],
                    selection: { projectId: (n == null ? void 0 : n.projectId) ?? "" },
                    onChangeSelection: ({ projectId: m }) => {
                      if (!m) return;
                      const N = h(m);
                      p(N, m);
                    },
                    buttonVariant: "ghost",
                    buttonClassName: "tw:h-8 tw:w-full tw:flex-1 tw:justify-start tw:font-normal",
                    localizedStrings: y,
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
function zg({
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
      ai,
      {
        className: "tw:w-9/12",
        value: r,
        onSearch: o,
        placeholder: "Search app settings, extension settings, and project settings"
      }
    ) }),
    /* @__PURE__ */ u(
      gp,
      {
        id: t,
        className: "tw:h-full tw:flex-1 tw:gap-4 tw:overflow-auto tw:border-t",
        children: [
          /* @__PURE__ */ a(
            _p,
            {
              className: x("tw:w-1/2 tw:min-w-[140px] tw:max-w-[220px] tw:border-e", n),
              ...s
            }
          ),
          /* @__PURE__ */ a(mp, { className: "tw:min-w-[215px]", children: e })
        ]
      }
    )
  ] });
}
const tr = "scrBook", Np = "scrRef", ur = "source", Cp = "details", Ep = "Scripture Reference", Tp = "Scripture Book", Ns = "Type", Sp = "Details";
function Rp(t, e) {
  const r = e ?? !1;
  return [
    {
      accessorFn: (o) => `${o.start.book} ${o.start.chapterNum}:${o.start.verseNum}`,
      id: tr,
      header: (t == null ? void 0 : t.scriptureReferenceColumnName) ?? Ep,
      cell: (o) => {
        const n = o.row.original;
        return o.row.getIsGrouped() ? Gt.bookIdToEnglishName(n.start.book) : o.row.groupingColumnId === tr ? We(n.start) : void 0;
      },
      getGroupingValue: (o) => Gt.bookIdToNumber(o.start.book),
      sortingFn: (o, n) => Ta(o.original.start, n.original.start),
      enableGrouping: !0
    },
    {
      accessorFn: (o) => We(o.start),
      id: Np,
      header: void 0,
      cell: (o) => {
        const n = o.row.original;
        return o.row.getIsGrouped() ? void 0 : We(n.start);
      },
      sortingFn: (o, n) => Ta(o.original.start, n.original.start),
      enableGrouping: !1
    },
    {
      accessorFn: (o) => o.source.displayName,
      id: ur,
      header: r ? (t == null ? void 0 : t.typeColumnName) ?? Ns : void 0,
      cell: (o) => r || o.row.getIsGrouped() ? o.getValue() : void 0,
      getGroupingValue: (o) => o.source.id,
      sortingFn: (o, n) => o.original.source.displayName.localeCompare(n.original.source.displayName),
      enableGrouping: !0
    },
    {
      accessorFn: (o) => o.detail,
      id: Cp,
      header: (t == null ? void 0 : t.detailsColumnName) ?? Sp,
      cell: (o) => o.getValue(),
      enableGrouping: !1
    }
  ];
}
const Op = (t) => {
  if (!("offset" in t.start))
    throw new Error("No offset available in range start");
  if (t.end && !("offset" in t.end))
    throw new Error("No offset available in range end");
  const { offset: e } = t.start;
  let r = 0;
  return t.end && ({ offset: r } = t.end), !t.end || Ta(t.start, t.end) === 0 ? `${Wa(t.start)}+${e}` : `${Wa(t.start)}+${e}-${Wa(t.end)}+${r}`;
}, Wn = (t) => `${Op({ start: t.start, end: t.end })} ${t.source.displayName} ${t.detail}`;
function Ag({
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
  const [l, w] = C([]), [p, h] = C([{ id: tr, desc: !1 }]), [v, y] = C({}), f = V(
    () => t.flatMap((R) => R.data.map((O) => ({
      ...O,
      source: R.source
    }))),
    [t]
  ), m = V(
    () => Rp(
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
    l.includes(ur) ? h([
      { id: ur, desc: !1 },
      { id: tr, desc: !1 }
    ]) : h([{ id: tr, desc: !1 }]);
  }, [l]);
  const N = Mi({
    data: f,
    columns: m,
    state: {
      grouping: l,
      sorting: p,
      rowSelection: v
    },
    onGroupingChange: w,
    onSortingChange: h,
    onRowSelectionChange: y,
    getExpandedRowModel: pd(),
    getGroupedRowModel: ud(),
    getCoreRowModel: Pi(),
    getSortedRowModel: Ii(),
    getRowId: Wn,
    autoResetExpanded: !1,
    enableMultiRowSelection: !1,
    enableSubRowSelection: !1
  });
  Z(() => {
    if (c) {
      const R = N.getSelectedRowModel().rowsById, O = Object.keys(R);
      if (O.length === 1) {
        const J = f.find((et) => Wn(et) === O[0]) || void 0;
        J && c(J);
      }
    }
  }, [v, f, c, N]);
  const T = n ?? Tp, D = s ?? Ns, E = [
    { label: "No Grouping", value: [] },
    { label: `Group by ${T}`, value: [tr] },
    { label: `Group by ${D}`, value: [ur] },
    {
      label: `Group by ${T} and ${D}`,
      value: [tr, ur]
    },
    {
      label: `Group by ${D} and ${T}`,
      value: [ur, tr]
    }
  ], L = (R) => {
    w(JSON.parse(R));
  }, S = (R, O) => {
    !R.getIsGrouped() && !R.getIsSelected() && R.getToggleSelectedHandler()(O);
  }, z = (R, O) => R.getIsGrouped() ? "" : x("banded-row", O % 2 === 0 ? "even" : "odd"), I = (R, O, J) => {
    if (!((R == null ? void 0 : R.length) === 0 || O.depth < J.column.getGroupedIndex())) {
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
      Or,
      {
        value: JSON.stringify(l),
        onValueChange: (R) => {
          L(R);
        },
        children: [
          /* @__PURE__ */ a(Mr, { className: "tw:mb-1 tw:mt-2", children: /* @__PURE__ */ a(Dr, {}) }),
          /* @__PURE__ */ a(Ir, { position: "item-aligned", children: /* @__PURE__ */ a(yu, { children: E.map((R) => /* @__PURE__ */ a(Ie, { value: JSON.stringify(R.value), children: R.label }, R.label)) }) })
        ]
      }
    ),
    /* @__PURE__ */ u(Mo, { className: "tw:relative tw:flex tw:flex-col tw:overflow-y-auto tw:p-0", children: [
      e && /* @__PURE__ */ a(Io, { children: N.getHeaderGroups().map((R) => /* @__PURE__ */ a(ar, { children: R.headers.filter((O) => O.column.columnDef.header).map((O) => (
        /* For sticky column headers to work, we probably need to change the default definition of the shadcn Table component. See https://github.com/shadcn-ui/ui/issues/1151 */
        /* @__PURE__ */ a(Ea, { colSpan: O.colSpan, className: "tw:sticky top-0", children: O.isPlaceholder ? void 0 : /* @__PURE__ */ u("div", { children: [
          O.column.getCanGroup() ? /* @__PURE__ */ a(
            ot,
            {
              variant: "ghost",
              title: `Toggle grouping by ${O.column.columnDef.header}`,
              onClick: O.column.getToggleGroupingHandler(),
              type: "button",
              children: O.column.getIsGrouped() ? "🛑" : "👊 "
            }
          ) : void 0,
          " ",
          qr(O.column.columnDef.header, O.getContext())
        ] }) }, O.id)
      )) }, R.id)) }),
      /* @__PURE__ */ a(Po, { children: N.getRowModel().rows.map((R, O) => {
        const J = Ke();
        return /* @__PURE__ */ a(
          ar,
          {
            "data-state": R.getIsSelected() ? "selected" : "",
            className: x(z(R, O)),
            onClick: (et) => S(R, et),
            children: R.getVisibleCells().map((et) => {
              if (!(et.getIsPlaceholder() || et.column.columnDef.enableGrouping && !et.getIsGrouped() && (et.column.columnDef.id !== ur || !r)))
                return /* @__PURE__ */ a(
                  Er,
                  {
                    className: x(
                      et.column.columnDef.id,
                      "tw:p-[1px]",
                      I(l, R, et)
                    ),
                    children: et.getIsGrouped() ? /* @__PURE__ */ u(
                      ot,
                      {
                        variant: "link",
                        onClick: R.getToggleExpandedHandler(),
                        type: "button",
                        children: [
                          R.getIsExpanded() && /* @__PURE__ */ a(hr, {}),
                          !R.getIsExpanded() && (J === "ltr" ? /* @__PURE__ */ a(jc, {}) : /* @__PURE__ */ a(Fc, {})),
                          " ",
                          qr(et.column.columnDef.cell, et.getContext()),
                          " (",
                          R.subRows.length,
                          ")"
                        ]
                      }
                    ) : qr(et.column.columnDef.cell, et.getContext())
                  },
                  et.id
                );
            })
          },
          R.id
        );
      }) })
    ] })
  ] });
}
function Dp({
  availableBookInfo: t,
  selectedBookIds: e,
  onChangeSelectedBookIds: r,
  localizedStrings: o,
  localizedBookNames: n,
  disabledSectionExplanations: s
}) {
  const i = o["%webView_book_selector_books_selected%"], c = o["%webView_book_selector_select_books%"], d = o["%webView_book_selector_search_books%"], l = o["%webView_book_selector_select_all%"], w = o["%webView_book_selector_clear_all%"], p = o["%webView_book_selector_no_book_found%"], { otLong: h, ntLong: v, dcLong: y, extraLong: f } = {
    otLong: o == null ? void 0 : o["%scripture_section_ot_long%"],
    ntLong: o == null ? void 0 : o["%scripture_section_nt_long%"],
    dcLong: o == null ? void 0 : o["%scripture_section_dc_long%"],
    extraLong: o == null ? void 0 : o["%scripture_section_extra_long%"]
  }, [m, N] = C(!1), [T, D] = C(""), E = M(void 0), L = M(!1), S = V(
    () => oi(t),
    [t]
  ), z = V(() => {
    if (!T.trim()) {
      const F = {
        [Mt.OT]: [],
        [Mt.NT]: [],
        [Mt.DC]: [],
        [Mt.Extra]: []
      };
      return S.forEach((B) => {
        const X = ma(B);
        F[X].push(B);
      }), F;
    }
    const g = S.filter(
      (F) => So(F, T, n)
    ), j = {
      [Mt.OT]: [],
      [Mt.NT]: [],
      [Mt.DC]: [],
      [Mt.Extra]: []
    };
    return g.forEach((F) => {
      const B = ma(F);
      j[B].push(F);
    }), j;
  }, [S, T, n]), I = $(
    (g, j = !1) => {
      if (!j || !E.current) {
        r(
          e.includes(g) ? e.filter((ct) => ct !== g) : [...e, g]
        ), E.current = g;
        return;
      }
      const F = S.findIndex((ct) => ct === E.current), B = S.findIndex((ct) => ct === g);
      if (F === -1 || B === -1) return;
      const [X, U] = [
        Math.min(F, B),
        Math.max(F, B)
      ], W = S.slice(X, U + 1).map((ct) => ct);
      r(
        e.includes(g) ? e.filter((ct) => !W.includes(ct)) : [.../* @__PURE__ */ new Set([...e, ...W])]
      );
    },
    [e, r, S]
  ), R = (g) => {
    I(g, L.current), L.current = !1;
  }, O = (g, j) => {
    g.preventDefault(), I(j, g.shiftKey);
  }, J = () => {
    r(S.map((g) => g));
  }, et = () => {
    r([]);
  }, rt = V(
    () => Object.values(Mt).filter(
      (g) => (s == null ? void 0 : s[g]) !== void 0 && zo(S, g).length === 0
    ).map((g) => ({ section: g, explanation: s == null ? void 0 : s[g] })),
    [s, S]
  );
  return /* @__PURE__ */ u(
    mr,
    {
      open: m,
      onOpenChange: (g) => {
        N(g), g || D("");
      },
      children: [
        /* @__PURE__ */ a(Pr, { asChild: !0, children: /* @__PURE__ */ u(
          ot,
          {
            variant: "outline",
            role: "combobox",
            "aria-expanded": m,
            className: "tw:max-w-64 tw:justify-between",
            children: [
              e.length > 0 ? `${i}: ${e.length}` : c,
              /* @__PURE__ */ a(Uc, { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
            ]
          }
        ) }),
        /* @__PURE__ */ a(
          vr,
          {
            className: "tw:max-h-(--radix-popover-content-available-height) tw:w-[500px] tw:max-w-[calc(100vw-2rem)] tw:p-0",
            align: "start",
            collisionPadding: 8,
            children: /* @__PURE__ */ u(
              br,
              {
                className: "tw:min-h-0",
                shouldFilter: !1,
                onKeyDown: (g) => {
                  g.key === "Enter" && (L.current = g.shiftKey);
                },
                children: [
                  /* @__PURE__ */ a(
                    za,
                    {
                      className: "tw:shrink-0",
                      placeholder: d,
                      value: T,
                      onValueChange: D,
                      spaceSelectsHighlightedItem: !0
                    }
                  ),
                  /* @__PURE__ */ u("div", { className: "tw:flex tw:shrink-0 tw:justify-between tw:border-b tw:p-2", children: [
                    /* @__PURE__ */ a(
                      ot,
                      {
                        variant: "ghost",
                        size: "sm",
                        onClick: J,
                        disabled: S.length === 0,
                        children: l
                      }
                    ),
                    /* @__PURE__ */ a(ot, { variant: "ghost", size: "sm", onClick: et, children: w })
                  ] }),
                  /* @__PURE__ */ u(xr, { className: "tw:max-h-72 tw:min-h-0 tw:flex-1", children: [
                    /* @__PURE__ */ a($a, { children: p }),
                    Object.values(Mt).filter((g) => z[g].length > 0).map((g, j) => {
                      const F = z[g];
                      return /* @__PURE__ */ u(gr, { children: [
                        j > 0 && /* @__PURE__ */ a(ri, { alwaysRender: !0 }),
                        /* @__PURE__ */ a(
                          ir,
                          {
                            heading: Jn(g, h, v, y, f),
                            children: F.map((B) => /* @__PURE__ */ a(
                              Ai,
                              {
                                bookId: B,
                                isSelected: e.includes(B),
                                onSelect: () => R(B),
                                onMouseDown: (X) => O(X, B),
                                section: ma(B),
                                showCheck: !0,
                                localizedBookNames: n,
                                commandValue: xo(B, n),
                                className: "tw:flex tw:items-center"
                              },
                              B
                            ))
                          }
                        )
                      ] }, g);
                    })
                  ] }),
                  rt.length > 0 && /* @__PURE__ */ a("div", { className: "tw:shrink-0 tw:border-t tw:p-2", children: rt.map(({ section: g, explanation: j }) => /* @__PURE__ */ a("p", { className: "tw:text-xs tw:text-muted-foreground", children: j }, g)) })
                ]
              }
            )
          }
        )
      ]
    }
  );
}
function Mp({
  disabled: t,
  tooltipText: e,
  children: r,
  className: o
}) {
  return /* @__PURE__ */ a(Pt, { children: /* @__PURE__ */ u(_t, { children: [
    /* @__PURE__ */ a(Nt, { asChild: !0, children: /* @__PURE__ */ a(
      Qr,
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
function Ip({
  section: t,
  availableBookIds: e,
  selectedBookIds: r,
  onToggle: o,
  localizedStrings: n,
  disabledExplanation: s
}) {
  const i = zo(e, t).length === 0, c = n["%scripture_section_ot_short%"], d = n["%scripture_section_nt_short%"], l = n["%scripture_section_dc_short%"], w = n["%scripture_section_extra_short%"], p = /* @__PURE__ */ a(
    ot,
    {
      variant: "outline",
      size: "sm",
      onClick: () => o(t),
      className: x(
        ni(e, t, r) && !i && "tw:bg-primary tw:text-primary-foreground tw:hover:bg-primary/70 tw:hover:text-primary-foreground"
      ),
      disabled: i,
      children: tc(
        t,
        c,
        d,
        l,
        w
      )
    }
  );
  return s ? /* @__PURE__ */ a(
    Mp,
    {
      className: "tw:flex",
      disabled: i,
      tooltipText: s,
      children: p
    }
  ) : p;
}
const Yn = 5, co = 6;
function Pp({
  availableBookInfo: t,
  selectedBookIds: e,
  onChangeSelectedBookIds: r,
  localizedStrings: o,
  localizedBookNames: n,
  disabledSectionExplanations: s
}) {
  const i = o["%webView_book_selector_more%"], c = V(
    () => oi(t),
    [t]
  ), d = $(
    (l) => {
      const w = zo(c, l).map((p) => p);
      r(
        ni(c, l, e) ? e.filter((p) => !w.includes(p)) : [.../* @__PURE__ */ new Set([...e, ...w])]
      );
    },
    [e, r, c]
  );
  return /* @__PURE__ */ u("div", { className: "tw:space-y-2", children: [
    /* @__PURE__ */ a("div", { className: "tw:flex tw:flex-wrap tw:gap-2", children: Object.values(Mt).map((l) => /* @__PURE__ */ a(
      Ip,
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
      Dp,
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
        e.length === co ? co : Yn
      ).map((l) => /* @__PURE__ */ a(Yr, { className: "tw:hover:bg-secondary", variant: "secondary", children: Ge(l, n) }, l)),
      e.length > co && /* @__PURE__ */ a(
        Yr,
        {
          className: "tw:hover:bg-secondary",
          variant: "secondary",
          children: `+${e.length - Yn} ${i}`
        }
      )
    ] })
  ] });
}
const zp = Object.freeze([
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
]), $g = Object.freeze([
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
  ...zp
]), qt = (t, e) => t[e] ?? e, Ap = Object.freeze([" ", "-"]);
function Vg({
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
  rangeEnd: v,
  onRangeStartChange: y,
  onRangeEndChange: f,
  currentScrRef: m,
  onCurrentScrRefChange: N,
  bookChapterControlLocalizedStrings: T,
  getEndVerse: D,
  hideLabel: E = !1,
  buttonClassName: L
}) {
  const S = qt(
    i,
    "%webView_scope_selector_selected_text%"
  ), z = qt(i, "%webView_scope_selector_verse%"), I = qt(i, "%webView_scope_selector_chapter%"), R = qt(i, "%webView_scope_selector_book%"), O = qt(
    i,
    "%webView_scope_selector_current_verse%"
  ), J = qt(
    i,
    "%webView_scope_selector_current_chapter%"
  ), et = qt(i, "%webView_scope_selector_current_book%"), rt = qt(i, "%webView_scope_selector_choose_books%"), g = qt(i, "%webView_scope_selector_scope%"), j = qt(i, "%webView_scope_selector_select_books%"), F = qt(i, "%webView_scope_selector_range%"), B = qt(i, "%webView_scope_selector_select_range%"), X = qt(i, "%webView_scope_selector_range_start%"), U = qt(i, "%webView_scope_selector_range_end%"), W = qt(i, "%webView_scope_selector_ok%"), ct = qt(i, "%webView_scope_selector_cancel%"), vt = qt(i, "%webView_scope_selector_navigate%"), Q = (K) => {
    if (!m) return;
    const it = m.book.toUpperCase();
    switch (K) {
      case "verse":
        return We(m, "id");
      case "chapter":
        return `${it} ${m.chapterNum}`;
      case "book":
        return it;
      default:
        return;
    }
  }, wt = [
    { value: "selectedText", label: S, id: "scope-selected-text" },
    {
      value: "verse",
      label: z,
      dropdownLabel: O,
      scrRefSuffix: Q("verse"),
      id: "scope-verse"
    },
    {
      value: "chapter",
      label: I,
      dropdownLabel: J,
      scrRefSuffix: Q("chapter"),
      id: "scope-chapter"
    },
    {
      value: "book",
      label: R,
      dropdownLabel: et,
      scrRefSuffix: Q("book"),
      id: "scope-book"
    },
    { value: "selectedBooks", label: rt, id: "scope-selected" },
    { value: "range", label: F, id: "scope-range" }
  ], ht = (K, it, $t = !1) => /* @__PURE__ */ u(xt, { children: [
    K,
    it && !$t && /* @__PURE__ */ u("span", { className: "tw:text-muted-foreground", children: [
      ": ",
      it
    ] })
  ] }), gt = e ? wt.filter((K) => e.includes(K.value)) : wt, ft = m ?? Ya, Tt = h ?? ft, zt = v ?? ft, ze = () => {
  }, be = M(null), Bt = M(null), lt = M(!1), Yt = M(null), xe = M(!1), [pe, Jt] = C(void 0), ut = M(!1), jt = M(!1), ye = M(null), Zt = $((K) => {
    if (K) {
      Jt("start"), ut.current = !1;
      return;
    }
    Jt((it) => it === "start" ? void 0 : it), ut.current && (ut.current = !1, requestAnimationFrame(() => {
      var $t;
      const it = ($t = be.current) == null ? void 0 : $t.querySelector("button");
      it == null || it.click();
    }));
  }, []), Ft = $((K) => {
    if (K) {
      Jt("end"), jt.current = !1;
      return;
    }
    Jt((it) => it === "end" ? void 0 : it);
  }, []), se = $(
    (K) => {
      y == null || y(K), f == null || f(K), ut.current = !0;
    },
    [y, f]
  ), Ae = $(
    (K) => {
      f == null || f(K), jt.current = !0;
    },
    [f]
  ), bt = $(
    (K) => {
      r(K), K === "selectedBooks" && n.length === 0 && (m != null && m.book) && s([m.book]);
    },
    [r, n, m, s]
  ), he = gt.find((K) => K.value === t), Qt = () => t === "selectedBooks" && n.length > 0 ? n.map((K) => K.toUpperCase()).join(", ") : t === "range" ? rl(Tt, zt, {
    optionOrLocalizedBookName: "id",
    endRefOptionOrLocalizedBookName: "id",
    repeatBookName: !0
  }) : he ? ht(he.label, he.scrRefSuffix) : t, A = gt.filter(
    (K) => K.value !== "selectedBooks" && K.value !== "range"
  ), pt = gt.find((K) => K.value === "selectedBooks"), ke = gt.find((K) => K.value === "range"), [Ot, Dt] = C(!1), [_e, te] = C(void 0), [ee, Re] = C(void 0), [Oe, Ut] = C(void 0), [ce, St] = C(void 0), [Rt, ge] = C([]), fe = p === "dropdown" && _e === "selectedBooks", me = /* @__PURE__ */ a(
    Pp,
    {
      availableBookInfo: o,
      selectedBookIds: fe ? Rt : n,
      onChangeSelectedBookIds: fe ? ge : s,
      localizedStrings: i,
      localizedBookNames: c,
      disabledSectionExplanations: d
    }
  ), $e = pe === "end", Ve = pe === "start", k = "tw:text-muted-foreground", P = p === "dropdown" && _e === "range", H = P ? Ut : se, at = P ? St : f ? Ae : ze, G = /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-wrap tw:items-end tw:gap-4", children: [
    /* @__PURE__ */ u("div", { className: "tw:grid tw:gap-2", children: [
      /* @__PURE__ */ a(It, { htmlFor: "scope-range-start", className: x($e && k), children: X }),
      /* @__PURE__ */ a(
        Xa,
        {
          id: "scope-range-start",
          scrRef: P ? Oe ?? Tt : Tt,
          handleSubmit: H,
          localizedBookNames: c,
          localizedStrings: T,
          getEndVerse: D,
          submitKeys: Ap,
          onOpenChange: Zt,
          className: x($e && k),
          modal: !0
        }
      )
    ] }),
    /* @__PURE__ */ u("div", { ref: be, className: "tw:grid tw:gap-2", children: [
      /* @__PURE__ */ a(It, { htmlFor: "scope-range-end", className: x(Ve && k), children: U }),
      /* @__PURE__ */ a(
        Xa,
        {
          id: "scope-range-end",
          scrRef: P ? ce ?? zt : zt,
          handleSubmit: at,
          localizedBookNames: c,
          localizedStrings: T,
          getEndVerse: D,
          disableReferencesUpTo: P ? Oe ?? Tt : Tt,
          onOpenChange: Ft,
          onCloseAutoFocus: (K) => {
            var it;
            jt.current && (jt.current = !1, K.preventDefault(), (it = ye.current) == null || it.focus());
          },
          className: x(Ve && k),
          modal: !0,
          align: "start"
        }
      )
    ] })
  ] }), _ = M({}), tt = $(
    (K) => (it) => {
      _.current[K] = it;
    },
    []
  ), nt = M(null);
  Z(() => {
    if (!Ot) return;
    let K = 0;
    const it = requestAnimationFrame(() => {
      K = requestAnimationFrame(() => {
        var $t;
        ($t = _.current[t]) == null || $t.focus();
      });
    });
    return () => {
      cancelAnimationFrame(it), K && cancelAnimationFrame(K);
    };
  }, [Ot, t]);
  const [yt, At] = C(null), [kt, Kt] = C(null), [re, Ne] = C(null), aa = 200, [Ka, oa] = C(!1);
  Z(() => {
    if (!re || typeof ResizeObserver > "u") return;
    const K = new ResizeObserver(([it]) => {
      oa(it.contentRect.width < aa);
    });
    return K.observe(re), () => K.disconnect();
  }, [re]);
  const na = $(
    (K) => {
      Re(K), Ut(Tt), St(zt), ge(n), Dt(!1), te(K);
    },
    [Tt, zt, n]
  ), ia = $(() => {
    ee !== void 0 && (ee === "range" ? (Oe && (y == null || y(Oe)), ce && (f == null || f(ce))) : ee === "selectedBooks" && s(Rt), bt(ee), te(void 0), Re(void 0));
  }, [
    ee,
    Oe,
    ce,
    Rt,
    y,
    f,
    s,
    bt
  ]), kr = $((K) => {
    K || (te(void 0), Re(void 0));
  }, []), sa = $((K) => {
    var it;
    K.preventDefault(), (it = nt.current) == null || it.focus();
  }, []), ca = (K) => t === K ? /* @__PURE__ */ a("span", { className: "tw:absolute tw:flex tw:h-3.5 tw:w-3.5 tw:items-center tw:justify-center tw:ltr:left-2 tw:rtl:right-2", children: /* @__PURE__ */ a(sr, { className: "tw:h-4 tw:w-4" }) }) : void 0;
  return /* @__PURE__ */ u("div", { id: w, className: "tw:grid tw:gap-4", children: [
    /* @__PURE__ */ u("div", { className: "tw:grid tw:gap-2", children: [
      !E && /* @__PURE__ */ a(It, { children: g }),
      p === "dropdown" ? /* @__PURE__ */ u(Xe, { open: Ot, onOpenChange: Dt, children: [
        /* @__PURE__ */ a(je, { asChild: !0, children: /* @__PURE__ */ u(
          ot,
          {
            ref: nt,
            variant: "outline",
            role: "combobox",
            className: x(
              "tw:w-full tw:justify-between tw:overflow-hidden tw:font-normal",
              L
            ),
            children: [
              /* @__PURE__ */ a("span", { className: "tw:min-w-0 tw:flex-1 tw:truncate tw:text-start", children: Qt() }),
              /* @__PURE__ */ a(hr, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
            ]
          }
        ) }),
        /* @__PURE__ */ a(
          Je,
          {
            ref: Ne,
            className: "tw:w-[var(--radix-dropdown-menu-trigger-width)] tw:min-w-[12rem]",
            align: "start",
            children: /* @__PURE__ */ u(qa, { container: re, children: [
              A.map(({ value: K, label: it, dropdownLabel: $t, scrRefSuffix: Ce, id: De }) => {
                const b = l == null ? void 0 : l[K];
                return /* @__PURE__ */ u(
                  rr,
                  {
                    ref: tt(K),
                    disabled: !!b,
                    className: "tw:relative tw:ps-8 data-[highlighted]:tw:bg-accent data-[highlighted]:tw:text-accent-foreground",
                    onSelect: () => bt(K),
                    "data-selected": t === K ? "true" : void 0,
                    children: [
                      t === K && /* @__PURE__ */ a("span", { className: "tw:absolute tw:flex tw:h-3.5 tw:w-3.5 tw:items-center tw:justify-center tw:ltr:left-2 tw:rtl:right-2", children: /* @__PURE__ */ a(sr, { className: "tw:h-4 tw:w-4" }) }),
                      /* @__PURE__ */ u("span", { className: "tw:flex tw:min-w-0 tw:flex-col tw:gap-0.5", children: [
                        /* @__PURE__ */ a("span", { className: "tw:flex tw:items-center tw:gap-1.5", children: ht($t ?? it, Ce, Ka) }),
                        b && /* @__PURE__ */ a("span", { className: "tw:text-xs tw:whitespace-normal tw:text-foreground", children: b })
                      ] })
                    ]
                  },
                  De
                );
              }),
              (pt || ke) && /* @__PURE__ */ a(pr, {}),
              pt && /* @__PURE__ */ u(
                rr,
                {
                  ref: tt("selectedBooks"),
                  className: x(
                    "tw:relative tw:ps-8",
                    "data-[highlighted]:tw:bg-accent data-[highlighted]:tw:text-accent-foreground"
                  ),
                  onSelect: () => na("selectedBooks"),
                  "data-selected": t === "selectedBooks" ? "true" : void 0,
                  children: [
                    ca("selectedBooks"),
                    `${pt.label}…`
                  ]
                }
              ),
              ke && /* @__PURE__ */ u(
                rr,
                {
                  ref: tt("range"),
                  className: x(
                    "tw:relative tw:ps-8",
                    "data-[highlighted]:tw:bg-accent data-[highlighted]:tw:text-accent-foreground"
                  ),
                  onSelect: () => na("range"),
                  "data-selected": t === "range" ? "true" : void 0,
                  children: [
                    ca("range"),
                    `${ke.label}…`
                  ]
                }
              ),
              N && /* @__PURE__ */ u(xt, { children: [
                /* @__PURE__ */ a(pr, {}),
                /* @__PURE__ */ a(fr, { className: "tw:px-2 tw:py-1.5 tw:text-xs tw:font-medium tw:text-muted-foreground", children: vt }),
                /* @__PURE__ */ a(
                  rr,
                  {
                    ref: Yt,
                    className: "tw:p-0",
                    onSelect: (K) => {
                      var it, $t;
                      if (K.preventDefault(), lt.current) {
                        lt.current = !1;
                        return;
                      }
                      xe.current || ($t = (it = Bt.current) == null ? void 0 : it.querySelector("button")) == null || $t.click();
                    },
                    children: /* @__PURE__ */ a(
                      "div",
                      {
                        ref: Bt,
                        className: "tw:w-full tw:px-1 tw:pb-1",
                        onPointerDownCapture: (K) => {
                          const it = K.target instanceof HTMLElement ? K.target : void 0;
                          it != null && it.closest("button") && (lt.current = !0, requestAnimationFrame(() => {
                            lt.current = !1;
                          }));
                        },
                        children: /* @__PURE__ */ a(
                          Xa,
                          {
                            id: "scope-navigate",
                            scrRef: m ?? Ya,
                            handleSubmit: N,
                            localizedBookNames: c,
                            localizedStrings: T,
                            getEndVerse: D,
                            triggerVariant: "ghost",
                            onOpenChange: (K) => {
                              xe.current = K;
                            },
                            onCloseAutoFocus: (K) => {
                              var it;
                              K.preventDefault(), (it = Yt.current) == null || it.focus();
                            },
                            modal: !0,
                            className: "tw:w-full tw:min-w-0 tw:max-w-none tw:justify-between tw:px-2 tw:font-normal",
                            triggerContent: /* @__PURE__ */ u(xt, { children: [
                              /* @__PURE__ */ a("span", { className: "tw:min-w-0 tw:flex-1 tw:truncate tw:text-start", children: We(m ?? Ya, "id") }),
                              /* @__PURE__ */ a(hr, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
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
          onValueChange: bt,
          className: "tw:flex tw:flex-col tw:space-y-1",
          children: gt.map(({ value: K, label: it, scrRefSuffix: $t, id: Ce }) => {
            const De = l == null ? void 0 : l[K];
            return /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:gap-0.5", children: [
              /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center", children: [
                /* @__PURE__ */ a(
                  Ca,
                  {
                    className: "tw:me-2",
                    value: K,
                    id: Ce,
                    disabled: !!De,
                    "aria-describedby": De ? `${Ce}-explanation` : void 0
                  }
                ),
                /* @__PURE__ */ a(It, { htmlFor: Ce, children: ht(it, $t) })
              ] }),
              De && // Indented to clear the radio so it reads as belonging to this row's label.
              /* @__PURE__ */ a(
                "span",
                {
                  id: `${Ce}-explanation`,
                  className: "tw:ms-6 tw:text-xs tw:whitespace-normal tw:text-muted-foreground",
                  children: De
                }
              )
            ] }, Ce);
          })
        }
      )
    ] }),
    p === "radio" && t === "selectedBooks" && /* @__PURE__ */ u("div", { className: "tw:grid tw:gap-2", children: [
      /* @__PURE__ */ a(It, { children: j }),
      me
    ] }),
    p === "radio" && t === "range" && G,
    p === "dropdown" && pt && /* @__PURE__ */ a(lo, { open: _e === "selectedBooks", onOpenChange: kr, children: /* @__PURE__ */ a(
      wo,
      {
        ref: Kt,
        onCloseAutoFocus: sa,
        onEscapeKeyDown: (K) => {
          kt != null && kt.querySelector('[data-state="open"]') && K.preventDefault();
        },
        children: /* @__PURE__ */ u(qa, { container: kt, children: [
          /* @__PURE__ */ a(uo, { className: "tw:pe-8", children: /* @__PURE__ */ a(po, { children: rt }) }),
          me,
          /* @__PURE__ */ u(nn, { children: [
            /* @__PURE__ */ a(ot, { variant: "outline", onClick: () => kr(!1), children: ct }),
            /* @__PURE__ */ a(ot, { onClick: ia, children: W })
          ] })
        ] })
      }
    ) }),
    p === "dropdown" && ke && /* @__PURE__ */ a(lo, { open: _e === "range", onOpenChange: kr, children: /* @__PURE__ */ a(
      wo,
      {
        ref: At,
        onCloseAutoFocus: sa,
        onEscapeKeyDown: (K) => {
          yt != null && yt.querySelector('[data-state="open"]') && K.preventDefault();
        },
        children: /* @__PURE__ */ u(qa, { container: yt, children: [
          /* @__PURE__ */ a(uo, { className: "tw:pe-8", children: /* @__PURE__ */ a(po, { children: B }) }),
          G,
          /* @__PURE__ */ u(nn, { children: [
            /* @__PURE__ */ a(ot, { variant: "outline", onClick: () => kr(!1), children: ct }),
            /* @__PURE__ */ a(ot, { ref: ye, onClick: ia, children: W })
          ] })
        ] })
      }
    ) })
  ] });
}
function Lg({
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
  }, l = Ke();
  return /* @__PURE__ */ u(
    Or,
    {
      value: `${e}`,
      onValueChange: (w) => r(
        w === "undefined" ? void 0 : parseInt(w, 10)
      ),
      disabled: c,
      children: [
        /* @__PURE__ */ a(Mr, { size: n, className: x("pr-twp tw:w-auto", s), children: /* @__PURE__ */ a(
          Dr,
          {
            placeholder: d[wn(e)] ?? e
          }
        ) }),
        /* @__PURE__ */ a(
          Ir,
          {
            id: i,
            align: l === "rtl" ? "end" : "start",
            style: { zIndex: Qe },
            children: t.map((w) => /* @__PURE__ */ a(Ie, { value: `${w}`, children: d[wn(w)] }, `${w}`))
          }
        )
      ]
    }
  );
}
function Bg({ children: t }) {
  return /* @__PURE__ */ a("div", { className: "pr-twp tw:grid", children: t });
}
function jg({
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
function Fg({
  primary: t,
  secondary: e,
  includeSeparator: r = !1
}) {
  return /* @__PURE__ */ u("div", { className: "tw:space-y-4 tw:py-2", children: [
    /* @__PURE__ */ u("div", { children: [
      /* @__PURE__ */ a("h3", { className: "tw:text-lg tw:font-medium", children: t }),
      /* @__PURE__ */ a("p", { className: "tw:text-sm tw:text-muted-foreground", children: e })
    ] }),
    r ? /* @__PURE__ */ a(Zr, {}) : ""
  ] });
}
function Cs(t, e) {
  var r;
  return (r = Object.entries(t).find(
    ([, o]) => "menuItem" in o && o.menuItem === e
  )) == null ? void 0 : r[0];
}
function Es(t) {
  return Object.entries(t).flatMap(([e, r]) => typeof r == "object" ? [{ columnKey: e, column: r }] : []).sort((e, r) => e.column.order - r.column.order);
}
function Ts(t, e, r) {
  return "column" in e && e.column === r || t === r;
}
function $p(t) {
  const e = new Set(t.items.map((o) => o.group)), r = Object.entries(t.groups).filter(
    ([o]) => e.has(o)
  );
  return Es(t.columns).filter(
    ({ columnKey: o }) => r.some(
      ([n, s]) => Ts(n, s, o)
    )
  ).map(({ columnKey: o, column: n }) => ({ columnKey: o, label: n.label }));
}
function Pa({ icon: t, menuLabel: e, leading: r }) {
  return t ? /* @__PURE__ */ a(
    "img",
    {
      className: x("tw:max-h-5 tw:max-w-5", r ? "tw:me-2" : "tw:ms-2"),
      src: t,
      alt: `${r ? "Leading" : "Trailing"} icon for ${e}`
    }
  ) : void 0;
}
const Ss = (t, e, r, o) => r ? Object.entries(t).filter(([s, i]) => Ts(s, i, r)).sort(([, s], [, i]) => s.order - i.order).flatMap(([s]) => e.filter((c) => c.group === s).sort((c, d) => c.order - d.order).map((c) => /* @__PURE__ */ u(_t, { children: [
  /* @__PURE__ */ a(Nt, { asChild: !0, children: "command" in c ? /* @__PURE__ */ u(
    rr,
    {
      onClick: () => {
        o(c);
      },
      children: [
        c.iconPathBefore && /* @__PURE__ */ a(Pa, { icon: c.iconPathBefore, menuLabel: c.label, leading: !0 }),
        c.label,
        c.iconPathAfter && /* @__PURE__ */ a(Pa, { icon: c.iconPathAfter, menuLabel: c.label }),
        c.shortcut && /* @__PURE__ */ a(ac, { children: c.shortcut })
      ]
    },
    `dropdown-menu-item-${c.label}-${c.command}`
  ) : /* @__PURE__ */ u(oc, { children: [
    /* @__PURE__ */ a(nc, { children: c.label }),
    /* @__PURE__ */ a(ic, { children: /* @__PURE__ */ a(sc, { children: Ss(
      t,
      e,
      Cs(t, c.id),
      o
    ) }) })
  ] }, `dropdown-menu-sub-${c.label}-${c.id}`) }),
  c.tooltip && /* @__PURE__ */ a(Ct, { children: c.tooltip })
] }, `tooltip-${c.label}-${"command" in c ? c.command : c.id}`))) : void 0;
function To({
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
  const l = Sa(), w = $p(e), p = s && w.length > 1;
  Li();
  const h = M(null), v = () => rc(h.current ?? void 0);
  return /* @__PURE__ */ u(Xe, { variant: i, children: [
    /* @__PURE__ */ a(je, { "aria-label": r, className: n, asChild: !0, id: d, children: /* @__PURE__ */ a(
      ot,
      {
        ref: h,
        variant: c,
        size: "icon",
        className: ec,
        onKeyDown: v,
        onBlur: v,
        children: o ?? /* @__PURE__ */ a(Kc, {})
      }
    ) }),
    /* @__PURE__ */ a(
      Je,
      {
        align: "start",
        style: { zIndex: Qe },
        onCloseAutoFocus: () => {
          Xn() === "pointer" && cc(h.current ?? void 0);
        },
        children: w.map(({ columnKey: y, label: f }, m) => {
          const N = `${l}-${y}`;
          return /* @__PURE__ */ u(gr, { children: [
            /* @__PURE__ */ u(ti, { "aria-labelledby": p ? N : void 0, children: [
              p && /* @__PURE__ */ a(fr, { id: N, children: f }),
              /* @__PURE__ */ a(Pt, { children: Ss(e.groups, e.items, y, t) })
            ] }),
            m < w.length - 1 && /* @__PURE__ */ a(pr, {})
          ] }, y);
        })
      }
    )
  ] });
}
const Vp = 8;
function Lp(t, e, r) {
  const o = e.findIndex((i) => t >= i), n = o === -1 ? e.length : o;
  if (r === void 0 || n >= r) return n;
  const s = e.findIndex(
    (i) => t >= i + Vp
  );
  return s === -1 ? r : Math.min(r, s);
}
function Rs(t, e) {
  const [r, o] = C(0), n = M(void 0);
  return Lt(() => {
    if (!t || typeof ResizeObserver > "u") return;
    const s = () => {
      const { width: c } = t.getBoundingClientRect(), d = n.current;
      n.current = c;
      const l = d === void 0 || d === 0;
      o(
        (w) => Lp(c, e, l ? void 0 : w)
      );
    };
    s();
    const i = new ResizeObserver(s);
    return i.observe(t), () => i.disconnect();
  }, [t, e]), r;
}
const Bp = Object.freeze([520, 420, 340]), Os = we.forwardRef(
  ({ id: t, className: e, children: r }, o) => {
    const [n, s] = C(void 0), i = M(o);
    i.current = o;
    const c = $((p) => {
      s(p ?? void 0);
      const h = i.current;
      typeof h == "function" ? h(p) : h && (h.current = p);
    }, []), d = Rs(n, Bp), l = Vi() ?? d, w = l >= Gr.MINIMUM;
    return /* @__PURE__ */ a(Ba.Provider, { value: l, children: /* @__PURE__ */ a(
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
function Ug({
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
  return /* @__PURE__ */ u(Os, { className: `tw:w-full tw:border-b ${s}`, id: n, children: [
    r && /* @__PURE__ */ a(
      To,
      {
        onSelectMenuItem: t,
        menuData: r,
        tabLabel: "Project",
        icon: l ?? /* @__PURE__ */ a(Hc, {}),
        buttonVariant: "ghost",
        showSectionHeadings: !0
      }
    ),
    i && /* @__PURE__ */ a("div", { className: "tw:flex tw:min-w-0 tw:shrink tw:grow-[10] tw:flex-row tw:flex-nowrap tw:items-start tw:gap-x-1 tw:gap-y-2 tw:overflow-clip", children: i }),
    c && /* @__PURE__ */ a("div", { className: "tw:flex tw:shrink tw:grow-[1] tw:basis-0 tw:flex-row tw:flex-nowrap tw:items-start tw:justify-center tw:gap-x-1 tw:gap-y-2 tw:overflow-clip tw:@sm:basis-auto", children: c }),
    /* @__PURE__ */ u("div", { className: "tw:flex tw:shrink-0 tw:grow-[1] tw:flex-row-reverse tw:flex-nowrap tw:items-start tw:gap-x-1 tw:gap-y-2 tw:overflow-clip", children: [
      o && /* @__PURE__ */ a(
        To,
        {
          onSelectMenuItem: e,
          menuData: o,
          tabLabel: "View Info",
          icon: /* @__PURE__ */ a(qc, {}),
          className: "tw:h-full",
          showSectionHeadings: !0
        }
      ),
      d
    ] })
  ] });
}
function Kg({
  onSelectProjectMenuItem: t,
  projectMenuData: e,
  id: r,
  className: o,
  menuButtonIcon: n
}) {
  return /* @__PURE__ */ a(Os, { className: "tw:pointer-events-none", id: r, children: e && /* @__PURE__ */ a(
    To,
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
const Ds = we.forwardRef(({ className: t, ...e }, r) => {
  const o = Ke();
  return /* @__PURE__ */ a(
    Pe.Root,
    {
      orientation: "vertical",
      ref: r,
      className: x("tw:flex tw:gap-1 tw:rounded-md tw:text-muted-foreground", t),
      ...e,
      dir: o
    }
  );
});
Ds.displayName = Pe.List.displayName;
const Ms = we.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ a(
  Pe.List,
  {
    ref: r,
    className: x(
      "tw:flex tw:items-center tw:w-[124px] tw:justify-center tw:rounded-md tw:bg-muted tw:p-1 tw:text-muted-foreground",
      t
    ),
    ...e
  }
));
Ms.displayName = Pe.List.displayName;
const jp = we.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ a(
  Pe.Trigger,
  {
    ref: r,
    ...e,
    className: x(
      "tw:inline-flex tw:w-[116px] tw:cursor-pointer tw:items-center tw:justify-center tw:break-words tw:rounded-sm tw:border-0 tw:bg-muted tw:px-3 tw:py-1.5 tw:text-sm tw:font-medium tw:text-inherit tw:ring-offset-background tw:transition-all tw:hover:text-foreground tw:focus-visible:outline-hidden tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2 tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:data-[state=active]:bg-background tw:data-[state=active]:text-foreground tw:data-[state=active]:shadow-sm tw:overflow-clip",
      t
    )
  }
)), Is = we.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ a(
  Pe.Content,
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
Is.displayName = Pe.Content.displayName;
function Hg({
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
        ai,
        {
          className: s,
          value: e,
          onSearch: r,
          placeholder: o
        }
      )
    ] }),
    /* @__PURE__ */ u(Ds, { children: [
      /* @__PURE__ */ a(Ms, { children: t.map((c) => /* @__PURE__ */ a(jp, { value: c.value, children: c.value }, c.key)) }),
      t.map((c) => /* @__PURE__ */ a(Is, { value: c.value, children: c.content }, c.key))
    ] })
  ] });
}
function Fp({
  className: t,
  // CUSTOM: Added variant prop to allow callers to apply visual style variants to all menu items
  variant: e = "default",
  ...r
}) {
  const o = we.useMemo(
    () => ({
      variant: e
    }),
    [e]
  );
  return /* @__PURE__ */ a(lc.Provider, { value: o, children: /* @__PURE__ */ a(
    He.Root,
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
function Up({ ...t }) {
  return /* @__PURE__ */ a(He.Menu, { "data-slot": "menubar-menu", ...t });
}
function Kp({ ...t }) {
  return /* @__PURE__ */ a(He.Portal, { "data-slot": "menubar-portal", ...t });
}
function Hp({
  className: t,
  ...e
}) {
  const r = Ao();
  return /* @__PURE__ */ a(
    He.Trigger,
    {
      "data-slot": "menubar-trigger",
      className: x(
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
function qp({
  className: t,
  align: e = "start",
  alignOffset: r = -4,
  sideOffset: o = 8,
  // CUSTOM: Pull `style` out so the shared z-index can be applied under any caller-supplied style
  style: n,
  ...s
}) {
  return /* @__PURE__ */ a(Kp, { children: /* @__PURE__ */ a(
    He.Content,
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
      style: { zIndex: Qe, ...n },
      ...s
    }
  ) });
}
function Gp({
  className: t,
  inset: e,
  variant: r = "default",
  ...o
}) {
  const n = Ao();
  return /* @__PURE__ */ a(
    He.Item,
    {
      "data-slot": "menubar-item",
      "data-inset": e,
      "data-variant": r,
      className: x(
        "tw:group/menubar-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-[variant=destructive]:text-destructive tw:data-[variant=destructive]:focus:bg-destructive/10 tw:data-[variant=destructive]:focus:text-destructive tw:dark:data-[variant=destructive]:focus:bg-destructive/20 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:data-[variant=destructive]:*:[svg]:text-destructive!",
        // CUSTOM: Apply variant-driven styles from menu context
        $o({ variant: n.variant, className: t })
      ),
      ...o
    }
  );
}
function Wp({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    He.Separator,
    {
      "data-slot": "menubar-separator",
      className: x("tw:-mx-1 tw:my-1 tw:h-px tw:bg-border", t),
      ...e
    }
  );
}
function Yp({ className: t, ...e }) {
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
function Zp({ ...t }) {
  return /* @__PURE__ */ a(He.Sub, { "data-slot": "menubar-sub", ...t });
}
function Xp({
  className: t,
  inset: e,
  children: r,
  ...o
}) {
  const n = Ao();
  return /* @__PURE__ */ u(
    He.SubTrigger,
    {
      "data-slot": "menubar-sub-trigger",
      "data-inset": e,
      className: x(
        "tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-none tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-inset:ps-7 tw:data-open:bg-accent tw:data-open:text-accent-foreground tw:[&_svg:not([class*=size-])]:size-4",
        // CUSTOM: Apply variant-driven styles from menu context
        $o({ variant: n.variant, className: t })
      ),
      ...o,
      children: [
        r,
        /* @__PURE__ */ a(bi, { className: "tw:ms-auto tw:size-4" })
      ]
    }
  );
}
function Jp({
  className: t,
  // CUSTOM: Pull `style` out so the shared z-index can be applied under any caller-supplied style
  style: e,
  ...r
}) {
  return /* @__PURE__ */ a(
    He.SubContent,
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
      style: { zIndex: Qe, ...e },
      ...r
    }
  );
}
const jr = (t, e) => {
  setTimeout(() => {
    e.forEach((r) => {
      var o;
      (o = t.current) == null || o.dispatchEvent(new KeyboardEvent("keydown", r));
    });
  }, 0);
}, Ps = (t, e, r, o) => {
  if (!r) return;
  const n = Object.entries(t).filter(
    ([s, i]) => "column" in i && i.column === r || s === r
  ).sort(([, s], [, i]) => s.order - i.order);
  return n.flatMap(([s], i) => {
    const c = e.filter((l) => l.group === s).sort((l, w) => l.order - w.order).map((l) => /* @__PURE__ */ u(_t, { children: [
      /* @__PURE__ */ a(Nt, { asChild: !0, children: "command" in l ? /* @__PURE__ */ u(
        Gp,
        {
          onClick: () => {
            o(l);
          },
          children: [
            l.iconPathBefore && /* @__PURE__ */ a(Pa, { icon: l.iconPathBefore, menuLabel: l.label, leading: !0 }),
            l.label,
            l.iconPathAfter && /* @__PURE__ */ a(Pa, { icon: l.iconPathAfter, menuLabel: l.label }),
            l.shortcut && /* @__PURE__ */ a(Yp, { children: l.shortcut })
          ]
        },
        `menubar-item-${l.label}-${l.command}`
      ) : /* @__PURE__ */ u(Zp, { children: [
        /* @__PURE__ */ a(Xp, { children: l.label }),
        /* @__PURE__ */ a(Jp, { children: Ps(
          t,
          e,
          Cs(t, l.id),
          o
        ) })
      ] }, `menubar-sub-${l.label}-${l.id}`) }),
      l.tooltip && /* @__PURE__ */ a(Ct, { children: l.tooltip })
    ] }, `tooltip-${l.label}-${"command" in l ? l.command : l.id}`)), d = [...c];
    return c.length > 0 && i < n.length - 1 && d.push(/* @__PURE__ */ a(Wp, {}, `separator-${s}`)), d;
  });
};
function Qp({
  menuData: t,
  onSelectMenuItem: e,
  onOpenChange: r,
  variant: o
}) {
  const n = M(void 0), s = M(void 0), i = M(void 0), c = M(void 0), d = M(void 0), l = (w) => {
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
  if (bd(["alt", "alt+p", "alt+l", "alt+n", "alt+h"], (w, p) => {
    var y, f, m, N;
    w.preventDefault();
    const h = { key: "Escape", code: "Escape", keyCode: 27, bubbles: !0 }, v = { key: " ", code: "Space", keyCode: 32, bubbles: !0 };
    switch (p.hotkey) {
      case "alt":
        jr(s, [h]);
        break;
      case "alt+p":
        (y = s.current) == null || y.focus(), jr(s, [h, v]);
        break;
      case "alt+l":
        (f = i.current) == null || f.focus(), jr(i, [h, v]);
        break;
      case "alt+n":
        (m = c.current) == null || m.focus(), jr(c, [h, v]);
        break;
      case "alt+h":
        (N = d.current) == null || N.focus(), jr(d, [h, v]);
        break;
    }
  }), Z(() => {
    if (!r || !n.current) return;
    const w = new MutationObserver((v) => {
      v.forEach((y) => {
        if (y.attributeName === "data-state" && y.target instanceof HTMLElement) {
          const f = y.target.getAttribute("data-state");
          r(f === "open");
        }
      });
    });
    return n.current.querySelectorAll("[data-state]").forEach((v) => {
      w.observe(v, { attributes: !0 });
    }), () => w.disconnect();
  }, [r]), !!t)
    return /* @__PURE__ */ a(Fp, { ref: n, className: "pr-twp tw:border-0 tw:bg-transparent", variant: o, children: Es(t.columns).map(({ columnKey: w, column: p }) => /* @__PURE__ */ u(Up, { children: [
      /* @__PURE__ */ a(Hp, { ref: l(w), children: p.label }),
      /* @__PURE__ */ a(
        qp,
        {
          style: { zIndex: Qe },
          children: /* @__PURE__ */ a(Pt, { children: Ps(t.groups, t.items, w, e) })
        }
      )
    ] }, w)) });
}
const th = Object.freeze([950, 800, 700]);
function qg(t) {
  switch (t) {
    case void 0:
      return;
    case "darwin":
      return "tw:ps-[85px]";
    default:
      return "tw:pe-[calc(138px+1rem)]";
  }
}
function Gg({
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
  const [w, p] = C(void 0), h = $(
    (f) => p(f ?? void 0),
    []
  ), v = Rs(w, th), y = Vi() ?? v;
  return /* @__PURE__ */ a(Ba.Provider, { value: y, children: /* @__PURE__ */ a(
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
                  i,
                  t && /* @__PURE__ */ a(
                    Qp,
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
const eh = (t, e) => t[e] ?? e;
function Wg({
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
  const l = eh(
    i,
    "%settings_uiLanguageSelector_fallbackLanguages%"
  ), [w, p] = C(!1), h = (y) => {
    n && n(y), o && o([y, ...r.filter((f) => f !== y)]), s && r.find((f) => f === y) && s([...r.filter((f) => f !== y)]), p(!1);
  }, v = (y, f) => {
    var N, T, D, E, L, S;
    const m = f !== y ? ((T = (N = t[y]) == null ? void 0 : N.uiNames) == null ? void 0 : T[f]) ?? ((E = (D = t[y]) == null ? void 0 : D.uiNames) == null ? void 0 : E.en) : void 0;
    return m ? `${(L = t[y]) == null ? void 0 : L.autonym} (${m})` : (S = t[y]) == null ? void 0 : S.autonym;
  };
  return /* @__PURE__ */ u("div", { id: d, className: x("pr-twp tw:max-w-sm", c), children: [
    /* @__PURE__ */ u(
      Or,
      {
        name: "uiLanguage",
        value: e,
        onValueChange: h,
        open: w,
        onOpenChange: (y) => p(y),
        children: [
          /* @__PURE__ */ a(Mr, { children: /* @__PURE__ */ a(Dr, {}) }),
          /* @__PURE__ */ a(
            Ir,
            {
              style: { zIndex: Qe },
              children: Object.keys(t).map((y) => /* @__PURE__ */ a(Ie, { value: y, children: v(y, e) }, y))
            }
          )
        ]
      }
    ),
    e !== "en" && /* @__PURE__ */ a("div", { className: "tw:pt-3", children: /* @__PURE__ */ a(It, { className: "tw:font-normal tw:text-muted-foreground", children: or(l, {
      fallbackLanguages: (r == null ? void 0 : r.length) > 0 ? r.map((y) => v(y, e)).join(", ") : t.en.autonym
    }) }) })
  ] });
}
const Yg = Object.freeze([
  "%firstRun_language_search_placeholder%",
  "%firstRun_language_noResults%",
  "%firstRun_language_selected%"
]);
function zs(t) {
  return t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}
function rh(t, e) {
  if (!e) return t;
  const r = zs(e);
  return t.filter(({ keywords: o }) => o.some((n) => n.includes(r)));
}
function ah(t) {
  return [...t].sort(([e, r], [o, n]) => e === "en" && o !== "en" ? -1 : o === "en" && e !== "en" ? 1 : r.autonym.localeCompare(n.autonym));
}
function Zg({
  languages: t,
  value: e,
  onChange: r,
  localizedStrings: o,
  className: n,
  id: s
}) {
  const [i, c] = C(""), [d, l] = C(), w = M(null), p = M(null), h = M(/* @__PURE__ */ new Map()), [v, y] = C(), f = V(
    () => ah(Object.entries(t)).map(([S, z]) => ({
      tag: S,
      info: z,
      keywords: [
        z.autonym,
        ...Object.values(z.uiNames ?? {}),
        ...z.otherNames ?? []
      ].map(zs)
    })),
    [t]
  ), m = V(() => rh(f, i), [f, i]), N = V(() => {
    var z;
    const S = (I) => !!I && m.some((R) => R.tag === I);
    return S(d) ? d : S(e) ? e : ((z = m[0]) == null ? void 0 : z.tag) ?? "";
  }, [d, e, m]), T = f.length > 1;
  Lt(() => {
    var S;
    y((S = p.current) == null ? void 0 : S.id);
  }, []), Lt(() => {
    const S = h.current.get(N), z = T ? w.current : void 0;
    z && (S ? z.setAttribute("aria-activedescendant", S.id) : z.removeAttribute("aria-activedescendant")), S && N !== d && S.scrollIntoView({ block: "nearest" });
  }, [N, d, T]);
  const D = o["%firstRun_language_search_placeholder%"] ?? "", E = o["%firstRun_language_noResults%"] ?? "", L = o["%firstRun_language_selected%"] ?? "";
  return /* @__PURE__ */ u(
    br,
    {
      id: s,
      className: x("pr-twp", n),
      shouldFilter: !1,
      value: N,
      onValueChange: l,
      children: [
        T && // Plain <input> (not CommandPrimitive.Input) so cmdk cannot update this field after
        // item selection. Arrow-key and Enter events from here bubble to the Command root div
        // where cmdk's keydown handler picks them up for list navigation.
        /* @__PURE__ */ a("div", { "data-slot": "command-input-wrapper", className: "tw:p-1 tw:pb-0", children: /* @__PURE__ */ u(dc, { className: "tw:h-8! tw:rounded-lg! tw:border-input/30 tw:bg-input/30 tw:shadow-none! tw:*:data-[slot=input-group-addon]:ps-2!", children: [
          /* @__PURE__ */ a(
            "input",
            {
              ref: w,
              "data-slot": "command-input",
              type: "text",
              role: "combobox",
              "aria-expanded": !0,
              "aria-controls": v,
              "aria-autocomplete": "list",
              placeholder: D,
              "aria-label": D,
              value: i,
              onChange: (S) => {
                c(S.currentTarget.value), l(void 0);
              },
              className: "tw:w-full tw:text-sm tw:outline-hidden tw:disabled:cursor-not-allowed tw:disabled:opacity-50"
            }
          ),
          /* @__PURE__ */ a(wc, { children: /* @__PURE__ */ a(dl, { className: "tw:size-4 tw:shrink-0 tw:opacity-50" }) })
        ] }) }),
        /* @__PURE__ */ u(xr, { ref: p, children: [
          /* @__PURE__ */ a($a, { children: E }),
          m.map(({ tag: S, info: z }) => {
            const I = S === e;
            return /* @__PURE__ */ u(
              lr,
              {
                ref: (R) => {
                  R ? h.current.set(S, R) : h.current.delete(S);
                },
                value: S,
                "aria-current": I ? "true" : void 0,
                "data-checked": I ? "true" : void 0,
                onSelect: () => r(S),
                children: [
                  /* @__PURE__ */ a("span", { dir: "auto", children: z.autonym }),
                  I && /* @__PURE__ */ a("span", { className: "tw:sr-only", children: L })
                ]
              },
              S
            );
          })
        ] })
      ]
    }
  );
}
function oh({ item: t, createLabel: e, createComplexLabel: r }) {
  return e ? /* @__PURE__ */ a(It, { children: e(t) }) : r ? /* @__PURE__ */ a(It, { children: r(t) }) : /* @__PURE__ */ a(It, { children: t });
}
function nh({
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
      ks,
      {
        className: "tw:me-2 tw:align-middle",
        checked: o.includes(c),
        onCheckedChange: (d) => n(c, d)
      }
    ),
    /* @__PURE__ */ a(
      oh,
      {
        item: c,
        createLabel: s,
        createComplexLabel: i
      }
    )
  ] }, c)) });
}
const Xg = nh;
function ih(t, e) {
  const [r, o] = C(t), [n, s] = C(e);
  return t !== r && (o(t), t && s(e)), t ? e : n;
}
function Jg({
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
  } = ih(t, { anchorRect: e, message: r, confirmingKeyLabel: o, showArrow: i });
  return /* @__PURE__ */ u(Pt, { children: [
    /* @__PURE__ */ a("span", { role: "status", className: "tw:sr-only", children: c }),
    /* @__PURE__ */ u(_t, { open: t, onOpenChange: () => {
    }, children: [
      /* @__PURE__ */ a(
        Nt,
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
        Ct,
        {
          side: n,
          align: s,
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
          children: /* @__PURE__ */ a("div", { className: "tw:w-full tw:h-full tw:rounded-md tw:bg-destructive/10 tw:px-3 tw:py-1.5", children: un(l, {
            key: /* @__PURE__ */ a(
              ho,
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
          }).map((h, v) => (
            // The array is static per render (one fixed localized string + one kbd), so index is
            // a stable, safe key — same rationale as source-language-indexed-list.component.tsx's
            // disable.
            // eslint-disable-next-line react/no-array-index-key
            /* @__PURE__ */ a(gr, { children: h }, `key-${v}`)
          )) })
        }
      )
    ] })
  ] });
}
function Qg({
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
  const v = (m) => {
    if (m.key === "Enter" || m.key === " ") {
      if (m.target !== m.currentTarget) return;
      m.preventDefault(), r();
    }
  }, [y, f] = C(!1);
  return /* @__PURE__ */ u(
    "div",
    {
      hidden: n,
      onClick: r,
      onKeyDown: v,
      onMouseEnter: () => f(!0),
      onFocus: () => f(!0),
      role: "button",
      tabIndex: 0,
      "aria-pressed": e,
      className: x(
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
            l && (e || h && y) && /* @__PURE__ */ a(
              "div",
              {
                className: x(
                  !e && h && "tw:invisible tw:group-hover:visible"
                ),
                children: /* @__PURE__ */ u(Xe, { children: [
                  /* @__PURE__ */ a(je, { className: x(p && "tw:me-1"), asChild: !0, children: /* @__PURE__ */ a(
                    ot,
                    {
                      className: "tw:m-1 tw:h-6 tw:w-6",
                      variant: "ghost",
                      size: "icon",
                      onClick: (m) => m.stopPropagation(),
                      onFocus: (m) => m.stopPropagation(),
                      children: /* @__PURE__ */ a(Gc, {})
                    }
                  ) }),
                  /* @__PURE__ */ a(Je, { align: "end", children: l })
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
function tf({
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
  onBlur: v
}) {
  return /* @__PURE__ */ u("div", { className: x("tw:inline-grid tw:items-center tw:gap-1.5", { "tw:w-full": o }), children: [
    /* @__PURE__ */ a(
      It,
      {
        htmlFor: t,
        className: x({
          "tw:text-red-600": r,
          "tw:hidden": !s
        }),
        children: `${s}${c ? "*" : ""}`
      }
    ),
    /* @__PURE__ */ a(
      Va,
      {
        id: t,
        disabled: e,
        placeholder: i,
        required: c,
        className: x(d, { "tw:border-red-600": r }),
        defaultValue: l,
        value: w,
        onChange: p,
        onFocus: h,
        onBlur: v
      }
    ),
    /* @__PURE__ */ a("p", { className: x({ "tw:hidden": !n }), children: n })
  ] });
}
function ef({ currentStep: t, totalSteps: e, locale: r }) {
  const o = r || "en", n = V(() => {
    const c = new hi(o);
    return (d) => c.format(d);
  }, [o]), s = Math.min(Math.max(t, 1), e), i = Array.from({ length: e }, (c, d) => d + 1);
  return /* @__PURE__ */ a("div", { className: "tw:flex tw:items-center", "aria-hidden": "true", children: i.map((c) => {
    let d = "upcoming";
    return c === s ? d = "active" : c < s && (d = "complete"), /* @__PURE__ */ u(gr, { children: [
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
          children: d === "complete" ? /* @__PURE__ */ a(sr, { className: "tw:h-4 tw:w-4" }) : n(c)
        }
      )
    ] }, c);
  }) });
}
function rf({ ...t }) {
  return /* @__PURE__ */ a(Wt.Root, { "data-slot": "context-menu", ...t });
}
function af({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    Wt.Trigger,
    {
      "data-slot": "context-menu-trigger",
      className: x("tw:select-none", t),
      ...e
    }
  );
}
function of({ ...t }) {
  return /* @__PURE__ */ a(Wt.Group, { "data-slot": "context-menu-group", ...t });
}
function nf({ ...t }) {
  return /* @__PURE__ */ a(Wt.Portal, { "data-slot": "context-menu-portal", ...t });
}
function sf({ ...t }) {
  return /* @__PURE__ */ a(Wt.Sub, { "data-slot": "context-menu-sub", ...t });
}
function cf({
  ...t
}) {
  return /* @__PURE__ */ a(Wt.RadioGroup, { "data-slot": "context-menu-radio-group", ...t });
}
function lf({
  className: t,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: e,
  ...r
}) {
  return /* @__PURE__ */ a(Wt.Portal, { children: /* @__PURE__ */ a(
    Wt.Content,
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
      style: { zIndex: Qe, ...e },
      ...r
    }
  ) });
}
function df({
  className: t,
  inset: e,
  variant: r = "default",
  ...o
}) {
  return /* @__PURE__ */ a(
    Wt.Item,
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
function wf({
  className: t,
  inset: e,
  children: r,
  ...o
}) {
  return /* @__PURE__ */ u(
    Wt.SubTrigger,
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
        /* @__PURE__ */ a(bi, { className: "tw:ms-auto" })
      ]
    }
  );
}
function uf({
  className: t,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: e,
  ...r
}) {
  return /* @__PURE__ */ a(
    Wt.SubContent,
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
      style: { zIndex: Qe, ...e },
      ...r
    }
  );
}
function pf({
  className: t,
  children: e,
  checked: r,
  inset: o,
  ...n
}) {
  return /* @__PURE__ */ u(
    Wt.CheckboxItem,
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
        /* @__PURE__ */ a("span", { className: "tw:pointer-events-none tw:absolute tw:end-2", children: /* @__PURE__ */ a(Wt.ItemIndicator, { children: /* @__PURE__ */ a(La, {}) }) }),
        e
      ]
    }
  );
}
function hf({
  className: t,
  children: e,
  inset: r,
  ...o
}) {
  return /* @__PURE__ */ u(
    Wt.RadioItem,
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
        /* @__PURE__ */ a("span", { className: "tw:pointer-events-none tw:absolute tw:end-2", children: /* @__PURE__ */ a(Wt.ItemIndicator, { children: /* @__PURE__ */ a(La, {}) }) }),
        e
      ]
    }
  );
}
function gf({
  className: t,
  inset: e,
  ...r
}) {
  return /* @__PURE__ */ a(
    Wt.Label,
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
function ff({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    Wt.Separator,
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
function mf({ className: t, ...e }) {
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
function vf({ ...t }) {
  return /* @__PURE__ */ a(dr.Root, { "data-slot": "drawer", ...t });
}
function bf({ ...t }) {
  return /* @__PURE__ */ a(dr.Trigger, { "data-slot": "drawer-trigger", ...t });
}
function sh({ ...t }) {
  return /* @__PURE__ */ a(dr.Portal, { "data-slot": "drawer-portal", ...t });
}
function xf({ ...t }) {
  return /* @__PURE__ */ a(dr.Close, { "data-slot": "drawer-close", ...t });
}
function ch({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    dr.Overlay,
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
function yf({
  className: t,
  children: e,
  // CUSTOM: Destructure hideDrawerHandle to conditionally render the drag handle
  hideDrawerHandle: r = !1,
  ...o
}) {
  const n = Ke();
  return /* @__PURE__ */ u(sh, { "data-slot": "drawer-portal", children: [
    /* @__PURE__ */ a(ch, {}),
    /* @__PURE__ */ u(
      dr.Content,
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
function kf({ className: t, ...e }) {
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
function _f({ className: t, ...e }) {
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
function Nf({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    dr.Title,
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
function Cf({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    dr.Description,
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
function Ef({
  className: t,
  value: e,
  ...r
}) {
  return /* @__PURE__ */ a(
    mn.Root,
    {
      "data-slot": "progress",
      className: x(
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
function Tf({ ...t }) {
  const { theme: e = "system" } = xd();
  return /* @__PURE__ */ a(
    yd,
    {
      theme: e === "light" || e === "dark" || e === "system" ? e : "system",
      className: "tw:toaster tw:group",
      icons: {
        success: /* @__PURE__ */ a(gl, { className: "tw:size-4" }),
        info: /* @__PURE__ */ a(hl, { className: "tw:size-4" }),
        warning: /* @__PURE__ */ a(pl, { className: "tw:size-4" }),
        error: /* @__PURE__ */ a(ul, { className: "tw:size-4" }),
        loading: /* @__PURE__ */ a(wl, { className: "tw:size-4 tw:animate-spin" })
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
function Sf({
  className: t,
  defaultValue: e,
  value: r,
  min: o = 0,
  max: n = 100,
  ...s
}) {
  const i = Ke(), c = we.useMemo(
    () => Array.isArray(r) ? r : Array.isArray(e) ? e : [o, n],
    [r, e, o, n]
  );
  return /* @__PURE__ */ u(
    la.Root,
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
      dir: i,
      ...s,
      children: [
        /* @__PURE__ */ a(
          la.Track,
          {
            "data-slot": "slider-track",
            className: "tw:relative tw:grow tw:overflow-hidden tw:rounded-full tw:bg-muted tw:data-horizontal:h-1 tw:data-horizontal:w-full tw:data-vertical:h-full tw:data-vertical:w-1",
            children: /* @__PURE__ */ a(
              la.Range,
              {
                "data-slot": "slider-range",
                className: "tw:absolute tw:bg-primary tw:select-none tw:data-horizontal:h-full tw:data-vertical:w-full"
              }
            )
          }
        ),
        Array.from({ length: c.length }, (d, l) => /* @__PURE__ */ a(
          la.Thumb,
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
function Rf({
  className: t,
  size: e = "default",
  ...r
}) {
  return /* @__PURE__ */ a(
    vn.Root,
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
        vn.Thumb,
        {
          "data-slot": "switch-thumb",
          className: "tw:pointer-events-none tw:block tw:rounded-full tw:bg-background tw:ring-0 tw:transition-transform tw:group-data-[size=default]/switch:size-4 tw:group-data-[size=sm]/switch:size-3 tw:group-data-[size=default]/switch:data-checked:translate-x-[calc(100%-2px)] tw:rtl:group-data-[size=default]/switch:data-checked:-translate-x-[calc(100%-2px)] tw:group-data-[size=sm]/switch:data-checked:translate-x-[calc(100%-2px)] tw:rtl:group-data-[size=sm]/switch:data-checked:-translate-x-[calc(100%-2px)] tw:dark:data-checked:bg-primary-foreground tw:group-data-[size=default]/switch:data-unchecked:translate-x-0 tw:rtl:group-data-[size=default]/switch:data-unchecked:-translate-x-0 tw:group-data-[size=sm]/switch:data-unchecked:translate-x-0 tw:rtl:group-data-[size=sm]/switch:data-unchecked:-translate-x-0 tw:dark:data-unchecked:bg-foreground"
        }
      )
    }
  );
}
function Of({
  className: t,
  orientation: e = "horizontal",
  ...r
}) {
  return /* @__PURE__ */ a(
    Pe.Root,
    {
      "data-slot": "tabs",
      "data-orientation": e,
      className: x("tw:group/tabs tw:flex tw:gap-2 tw:data-horizontal:flex-col", t),
      ...r
    }
  );
}
const lh = zi(
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
function Df({
  className: t,
  variant: e = "default",
  ...r
}) {
  const o = Ke();
  return /* @__PURE__ */ a(
    Pe.List,
    {
      "data-slot": "tabs-list",
      "data-variant": e,
      className: x("pr-twp", lh({ variant: e }), t),
      dir: o,
      ...r
    }
  );
}
function Mf({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    Pe.Trigger,
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
function If({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    Pe.Content,
    {
      "data-slot": "tabs-content",
      className: x("pr-twp tw:flex-1 tw:text-sm tw:outline-none", t),
      ...e
    }
  );
}
const Pf = (t, e) => {
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
}, zf = (t, e) => {
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
function dh(t) {
  return {
    preserveValue: !0,
    ...t
  };
}
const wh = (t, e, r = {}) => {
  const o = M(e);
  o.current = e;
  const n = M(r);
  n.current = dh(n.current);
  const [s, i] = C(() => o.current), [c, d] = C(!0);
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
}, Af = (t) => {
  const [e, r] = C(!1), [o, n] = C(!1), [s, i] = C(0), c = M(void 0), d = V(() => {
    if (!t) return;
    const h = async () => {
      try {
        const v = await t();
        return c.current === h && (r(!1), n(!0)), v;
      } catch (v) {
        throw c.current === h && (r(!0), n(!0)), v;
      }
    };
    return h;
  }, [t, s]);
  Z(() => {
    c.current = d, r(!1), n(!d);
  }, [d]);
  const [l, w] = wh(d, void 0), p = $(() => {
    c.current && (r(!1), n(!1), i((h) => h + 1));
  }, []);
  return V(
    () => ({ data: l, isLoading: w, hasError: e, hasSettled: o, refetch: p }),
    [l, w, e, o, p]
  );
};
function $f(t) {
  Z(() => {
    let e;
    return t && (e = document.createElement("style"), e.appendChild(document.createTextNode(t)), document.head.appendChild(e)), () => {
      e && document.head.removeChild(e);
    };
  }, [t]);
}
function Vf(t) {
  const e = V(() => al(t).slice().sort().join(" "), [t]);
  return V(() => e ? e.split(" ") : [], [e]);
}
const uh = () => {
  const [t, e] = C(
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
function Lf(t, e) {
  const [r, o] = C(!1), n = M(e);
  n.current = e;
  const s = M(t);
  s.current = t;
  const i = $(() => {
    s.current ? n.current() : o(!0);
  }, []);
  return Z(() => {
    !t || !r || (o(!1), n.current());
  }, [t, r]), i;
}
function ph(t, e, r) {
  return t ? r.dark : e === void 0 ? r.lightDefault : r.lightUnselected;
}
function Bf(t, e) {
  const r = uh();
  return ph(t, r, e);
}
function jf({ value: t, children: e }) {
  return /* @__PURE__ */ a($i.Provider, { value: t, children: /* @__PURE__ */ a(Ba.Provider, { value: t, children: e }) });
}
const Ff = 300;
function hh(t, e = "top") {
  if (!t || typeof document > "u") return;
  const r = document.head || document.querySelector("head"), o = r.querySelector(":first-child"), n = document.createElement("style");
  n.appendChild(document.createTextNode(t)), e === "top" && o ? r.insertBefore(n, o) : r.appendChild(n);
}
hh(`/* By default the editor is too tall for the footnote editor, even while empty, so this makes it
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
@layer properties{@supports (((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))){*,:before,:after,::backdrop{--tw-translate-x:0;--tw-translate-y:0;--tw-translate-z:0;--tw-rotate-x:initial;--tw-rotate-y:initial;--tw-rotate-z:initial;--tw-skew-x:initial;--tw-skew-y:initial;--tw-space-y-reverse:0;--tw-space-x-reverse:0;--tw-divide-x-reverse:0;--tw-border-style:solid;--tw-divide-y-reverse:0;--tw-gradient-position:initial;--tw-gradient-from:#0000;--tw-gradient-via:#0000;--tw-gradient-to:#0000;--tw-gradient-stops:initial;--tw-gradient-via-stops:initial;--tw-gradient-from-position:0%;--tw-gradient-via-position:50%;--tw-gradient-to-position:100%;--tw-leading:initial;--tw-font-weight:initial;--tw-tracking:initial;--tw-ordinal:initial;--tw-slashed-zero:initial;--tw-numeric-figure:initial;--tw-numeric-spacing:initial;--tw-numeric-fraction:initial;--tw-shadow:0 0 #0000;--tw-shadow-color:initial;--tw-shadow-alpha:100%;--tw-inset-shadow:0 0 #0000;--tw-inset-shadow-color:initial;--tw-inset-shadow-alpha:100%;--tw-ring-color:initial;--tw-ring-shadow:0 0 #0000;--tw-inset-ring-color:initial;--tw-inset-ring-shadow:0 0 #0000;--tw-ring-inset:initial;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-offset-shadow:0 0 #0000;--tw-blur:initial;--tw-brightness:initial;--tw-contrast:initial;--tw-grayscale:initial;--tw-hue-rotate:initial;--tw-invert:initial;--tw-opacity:initial;--tw-saturate:initial;--tw-sepia:initial;--tw-drop-shadow:initial;--tw-drop-shadow-color:initial;--tw-drop-shadow-alpha:100%;--tw-drop-shadow-size:initial;--tw-duration:initial;--tw-ease:initial;--tw-content:"";--tw-outline-style:solid;--tw-backdrop-blur:initial;--tw-backdrop-brightness:initial;--tw-backdrop-contrast:initial;--tw-backdrop-grayscale:initial;--tw-backdrop-hue-rotate:initial;--tw-backdrop-invert:initial;--tw-backdrop-opacity:initial;--tw-backdrop-saturate:initial;--tw-backdrop-sepia:initial;--tw-animation-delay:0s;--tw-animation-direction:normal;--tw-animation-duration:initial;--tw-animation-fill-mode:none;--tw-animation-iteration-count:1;--tw-enter-blur:0;--tw-enter-opacity:1;--tw-enter-rotate:0;--tw-enter-scale:1;--tw-enter-translate-x:0;--tw-enter-translate-y:0;--tw-exit-blur:0;--tw-exit-opacity:1;--tw-exit-rotate:0;--tw-exit-scale:1;--tw-exit-translate-x:0;--tw-exit-translate-y:0}}}@layer theme{:root,:host{--tw-font-mono:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;--tw-color-red-100:oklch(93.6% .032 17.717);--tw-color-red-200:oklch(88.5% .062 18.334);--tw-color-red-300:oklch(80.8% .114 19.571);--tw-color-red-400:oklch(70.4% .191 22.216);--tw-color-red-500:oklch(63.7% .237 25.331);--tw-color-red-600:oklch(57.7% .245 27.325);--tw-color-red-700:oklch(50.5% .213 27.518);--tw-color-red-800:oklch(44.4% .177 26.899);--tw-color-orange-100:oklch(95.4% .038 75.164);--tw-color-orange-800:oklch(47% .157 37.304);--tw-color-amber-200:oklch(92.4% .12 95.746);--tw-color-amber-400:oklch(82.8% .189 84.429);--tw-color-amber-500:oklch(76.9% .188 70.08);--tw-color-amber-600:oklch(66.6% .179 58.318);--tw-color-yellow-50:oklch(98.7% .026 102.212);--tw-color-yellow-100:oklch(97.3% .071 103.193);--tw-color-yellow-400:oklch(85.2% .199 91.936);--tw-color-yellow-500:oklch(79.5% .184 86.047);--tw-color-yellow-600:oklch(68.1% .162 75.834);--tw-color-yellow-700:oklch(55.4% .135 66.442);--tw-color-green-50:oklch(98.2% .018 155.826);--tw-color-green-100:oklch(96.2% .044 156.743);--tw-color-green-500:oklch(72.3% .219 149.579);--tw-color-green-600:oklch(62.7% .194 149.214);--tw-color-green-700:oklch(52.7% .154 150.069);--tw-color-green-800:oklch(44.8% .119 151.328);--tw-color-teal-400:oklch(77.7% .152 181.912);--tw-color-teal-500:oklch(70.4% .14 182.503);--tw-color-teal-600:oklch(60% .118 184.704);--tw-color-sky-400:oklch(74.6% .16 232.661);--tw-color-sky-500:oklch(68.5% .169 237.323);--tw-color-sky-600:oklch(58.8% .158 241.966);--tw-color-blue-50:oklch(97% .014 254.604);--tw-color-blue-100:oklch(93.2% .032 255.585);--tw-color-blue-400:oklch(70.7% .165 254.624);--tw-color-blue-500:oklch(62.3% .214 259.815);--tw-color-blue-600:oklch(54.6% .245 262.881);--tw-color-blue-800:oklch(42.4% .199 265.638);--tw-color-indigo-200:oklch(87% .065 274.039);--tw-color-purple-50:oklch(97.7% .014 308.299);--tw-color-purple-200:oklch(90.2% .063 306.703);--tw-color-purple-900:oklch(38.1% .176 304.987);--tw-color-rose-400:oklch(71.2% .194 13.428);--tw-color-rose-500:oklch(64.5% .246 16.439);--tw-color-rose-600:oklch(58.6% .253 17.585);--tw-color-slate-300:oklch(86.9% .022 252.894);--tw-color-slate-400:oklch(70.4% .04 256.788);--tw-color-slate-900:oklch(20.8% .042 265.755);--tw-color-gray-50:oklch(98.5% .002 247.839);--tw-color-gray-100:oklch(96.7% .003 264.542);--tw-color-gray-300:oklch(87.2% .01 258.338);--tw-color-gray-500:oklch(55.1% .027 264.364);--tw-color-gray-600:oklch(44.6% .03 256.802);--tw-color-gray-700:oklch(37.3% .034 259.733);--tw-color-gray-800:oklch(27.8% .033 256.848);--tw-color-zinc-400:oklch(70.5% .015 286.067);--tw-color-neutral-300:oklch(87% 0 0);--tw-color-black:#000;--tw-color-white:#fff;--tw-container-xs:20rem;--tw-container-sm:24rem;--tw-container-md:28rem;--tw-container-lg:32rem;--tw-container-2xl:42rem;--tw-container-3xl:48rem;--tw-container-4xl:56rem;--tw-container-6xl:72rem;--tw-text-xs:.75rem;--tw-text-xs--line-height:calc(1 / .75);--tw-text-sm:.875rem;--tw-text-sm--line-height:calc(1.25 / .875);--tw-text-base:1rem;--tw-text-base--line-height:calc(1.5 / 1);--tw-text-lg:1.125rem;--tw-text-lg--line-height:calc(1.75 / 1.125);--tw-text-xl:1.25rem;--tw-text-xl--line-height:calc(1.75 / 1.25);--tw-text-2xl:1.5rem;--tw-text-2xl--line-height:calc(2 / 1.5);--tw-text-3xl:1.875rem;--tw-text-3xl--line-height:calc(2.25 / 1.875);--tw-text-4xl:2.25rem;--tw-text-4xl--line-height:calc(2.5 / 2.25);--tw-text-5xl:3rem;--tw-text-5xl--line-height:1;--tw-font-weight-normal:400;--tw-font-weight-medium:500;--tw-font-weight-semibold:600;--tw-font-weight-bold:700;--tw-font-weight-extrabold:800;--tw-tracking-tight:-.025em;--tw-tracking-wider:.05em;--tw-tracking-widest:.1em;--tw-leading-tight:1.25;--tw-leading-snug:1.375;--tw-leading-relaxed:1.625;--tw-leading-loose:2;--tw-radius-xs:.125rem;--tw-radius-md:calc(var(--radius) * .8);--tw-drop-shadow-sm:0 1px 2px #00000026;--tw-animate-spin:spin 1s linear infinite;--tw-animate-pulse:pulse 2s cubic-bezier(.4, 0, .6, 1) infinite;--tw-blur-xs:4px;--tw-blur-2xl:40px;--tw-default-transition-duration:.15s;--tw-default-transition-timing-function:cubic-bezier(.4, 0, .2, 1);--tw-default-font-family:"IBM Plex Sans Variable", sans-serif;--tw-default-mono-font-family:var(--tw-font-mono)}}@layer base{.pr-twp,.pr-twp *{border-color:var(--border);outline-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.pr-twp,.pr-twp *{outline-color:color-mix(in oklab, var(--ring) 50%, transparent)}}body.pr-twp{background-color:var(--background);color:var(--foreground)}html.pr-twp{font-family:IBM Plex Sans Variable,sans-serif}:where(.pr-twp,.pr-twp *),:where(.pr-twp,.pr-twp *):after,:where(.pr-twp,.pr-twp *):before,:where(.pr-twp,.pr-twp *) ::backdrop{box-sizing:border-box;border:0 solid;margin:0;padding:0}:where(.pr-twp,.pr-twp *) ::file-selector-button{box-sizing:border-box;border:0 solid;margin:0;padding:0}.pr-twp{-webkit-text-size-adjust:100%;tab-size:4;line-height:1.5;font-family:var(--tw-default-font-family,ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");font-feature-settings:var(--tw-default-font-feature-settings,normal);font-variation-settings:var(--tw-default-font-variation-settings,normal);-webkit-tap-highlight-color:transparent}hr:where(.pr-twp,.pr-twp *){height:0;color:inherit;border-top-width:1px}abbr:where([title]):where(.pr-twp,.pr-twp *){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1:where(.pr-twp,.pr-twp *),h2:where(.pr-twp,.pr-twp *),h3:where(.pr-twp,.pr-twp *),h4:where(.pr-twp,.pr-twp *),h5:where(.pr-twp,.pr-twp *),h6:where(.pr-twp,.pr-twp *){font-size:inherit;font-weight:inherit}a:where(.pr-twp,.pr-twp *){color:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b:where(.pr-twp,.pr-twp *),strong:where(.pr-twp,.pr-twp *){font-weight:bolder}code:where(.pr-twp,.pr-twp *),kbd:where(.pr-twp,.pr-twp *),samp:where(.pr-twp,.pr-twp *),pre:where(.pr-twp,.pr-twp *){font-family:var(--tw-default-mono-font-family,ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace);font-feature-settings:var(--tw-default-mono-font-feature-settings,normal);font-variation-settings:var(--tw-default-mono-font-variation-settings,normal);font-size:1em}small:where(.pr-twp,.pr-twp *){font-size:80%}sub:where(.pr-twp,.pr-twp *),sup:where(.pr-twp,.pr-twp *){vertical-align:baseline;font-size:75%;line-height:0;position:relative}sub:where(.pr-twp,.pr-twp *){bottom:-.25em}sup:where(.pr-twp,.pr-twp *){top:-.5em}table:where(.pr-twp,.pr-twp *){text-indent:0;border-color:inherit;border-collapse:collapse}:-moz-focusring:where(.pr-twp,.pr-twp *){outline:auto}progress:where(.pr-twp,.pr-twp *){vertical-align:baseline}summary:where(.pr-twp,.pr-twp *){display:list-item}ol:where(.pr-twp,.pr-twp *),ul:where(.pr-twp,.pr-twp *),menu:where(.pr-twp,.pr-twp *){list-style:none}img:where(.pr-twp,.pr-twp *),svg:where(.pr-twp,.pr-twp *),video:where(.pr-twp,.pr-twp *),canvas:where(.pr-twp,.pr-twp *),audio:where(.pr-twp,.pr-twp *),iframe:where(.pr-twp,.pr-twp *),embed:where(.pr-twp,.pr-twp *),object:where(.pr-twp,.pr-twp *){vertical-align:middle;display:block}img:where(.pr-twp,.pr-twp *),video:where(.pr-twp,.pr-twp *){max-width:100%;height:auto}button:where(.pr-twp,.pr-twp *),input:where(.pr-twp,.pr-twp *),select:where(.pr-twp,.pr-twp *),optgroup:where(.pr-twp,.pr-twp *),textarea:where(.pr-twp,.pr-twp *){font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(.pr-twp,.pr-twp *) ::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(select:is([multiple],[size])) optgroup:where(.pr-twp,.pr-twp *){font-weight:bolder}:where(select:is([multiple],[size])) optgroup option:where(.pr-twp,.pr-twp *){padding-inline-start:20px}:where(.pr-twp,.pr-twp *) ::file-selector-button{margin-inline-end:4px}:where(.pr-twp,.pr-twp *) ::placeholder{opacity:1}@supports (not ((-webkit-appearance:-apple-pay-button))) or (contain-intrinsic-size:1px){:where(.pr-twp,.pr-twp *) ::placeholder{color:currentColor}@supports (color:color-mix(in lab, red, red)){:where(.pr-twp,.pr-twp *) ::placeholder{color:color-mix(in oklab, currentcolor 50%, transparent)}}}textarea:where(.pr-twp,.pr-twp *){resize:vertical}:where(.pr-twp,.pr-twp *) ::-webkit-search-decoration{-webkit-appearance:none}:where(.pr-twp,.pr-twp *) ::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit{display:inline-flex}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-fields-wrapper{padding:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-year-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-month-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-day-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-hour-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-minute-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-second-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-millisecond-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-meridiem-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-calendar-picker-indicator{line-height:1}:-moz-ui-invalid:where(.pr-twp,.pr-twp *){box-shadow:none}button:where(.pr-twp,.pr-twp *),input:where([type=button],[type=reset],[type=submit]):where(.pr-twp,.pr-twp *){appearance:button}:where(.pr-twp,.pr-twp *) ::file-selector-button{appearance:button}:where(.pr-twp,.pr-twp *) ::-webkit-inner-spin-button{height:auto}:where(.pr-twp,.pr-twp *) ::-webkit-outer-spin-button{height:auto}[hidden]:where(:not([hidden=until-found])):where(.pr-twp,.pr-twp *){display:none!important}}@layer components;@layer utilities{.tw\\:\\@container\\/card-header{container:card-header/inline-size}.tw\\:\\@container\\/search{container:search/inline-size}.tw\\:\\@container\\/toolbar{container:toolbar/inline-size}.tw\\:pointer-events-auto{pointer-events:auto}.tw\\:pointer-events-none{pointer-events:none}.tw\\:invisible{visibility:hidden}.tw\\:sr-only{clip-path:inset(50%);white-space:nowrap;border-width:0;width:1px;height:1px;margin:-1px;padding:0;position:absolute;overflow:hidden}.tw\\:absolute{position:absolute}.tw\\:fixed{position:fixed}.tw\\:relative{position:relative}.tw\\:sticky{position:sticky}.tw\\:inset-0{inset:calc(calc(var(--spacing)) * 0)}.tw\\:inset-x-0{inset-inline:calc(calc(var(--spacing)) * 0)}.tw\\:inset-y-0{inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:inset-s-3{inset-inline-start:calc(calc(var(--spacing)) * 3)}.tw\\:start-1\\.5{inset-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:start-1\\/2{inset-inline-start:50%}.tw\\:end-0{inset-inline-end:calc(calc(var(--spacing)) * 0)}.tw\\:end-1{inset-inline-end:calc(calc(var(--spacing)) * 1)}.tw\\:end-2{inset-inline-end:calc(calc(var(--spacing)) * 2)}.tw\\:end-3{inset-inline-end:calc(calc(var(--spacing)) * 3)}.tw\\:inset-e-0{inset-inline-end:calc(calc(var(--spacing)) * 0)}.tw\\:-top-\\[1px\\]{top:-1px}.tw\\:top-0{top:calc(calc(var(--spacing)) * 0)}.tw\\:top-1{top:calc(calc(var(--spacing)) * 1)}.tw\\:top-1\\.5{top:calc(calc(var(--spacing)) * 1.5)}.tw\\:top-1\\/2{top:50%}.tw\\:top-1\\/3{top:33.3333%}.tw\\:top-2{top:calc(calc(var(--spacing)) * 2)}.tw\\:top-2\\.5{top:calc(calc(var(--spacing)) * 2.5)}.tw\\:top-3\\.5{top:calc(calc(var(--spacing)) * 3.5)}.tw\\:top-\\[-1px\\]{top:-1px}.tw\\:top-full{top:100%}.tw\\:-right-1{right:calc(calc(var(--spacing)) * -1)}.tw\\:right-0{right:calc(calc(var(--spacing)) * 0)}.tw\\:right-1{right:calc(calc(var(--spacing)) * 1)}.tw\\:right-3{right:calc(calc(var(--spacing)) * 3)}.tw\\:bottom-0{bottom:calc(calc(var(--spacing)) * 0)}.tw\\:-left-\\[1px\\]{left:-1px}.tw\\:left-0{left:calc(calc(var(--spacing)) * 0)}.tw\\:left-1\\/2{left:50%}.tw\\:left-2{left:calc(calc(var(--spacing)) * 2)}.tw\\:left-3{left:calc(calc(var(--spacing)) * 3)}.tw\\:isolate{isolation:isolate}.tw\\:z-10{z-index:10}.tw\\:z-20{z-index:20}.tw\\:z-50{z-index:50}.tw\\:order-first{order:-9999}.tw\\:order-last{order:9999}.tw\\:col-span-1{grid-column:span 1/span 1}.tw\\:col-span-2{grid-column:span 2/span 2}.tw\\:col-span-3{grid-column:span 3/span 3}.tw\\:col-start-1{grid-column-start:1}.tw\\:col-start-2{grid-column-start:2}.tw\\:row-span-2{grid-row:span 2/span 2}.tw\\:row-start-1{grid-row-start:1}.tw\\:row-start-2{grid-row-start:2}.tw\\:m-0{margin:calc(calc(var(--spacing)) * 0)}.tw\\:m-1{margin:calc(calc(var(--spacing)) * 1)}.tw\\:m-2{margin:calc(calc(var(--spacing)) * 2)}.tw\\:-mx-1{margin-inline:calc(calc(var(--spacing)) * -1)}.tw\\:-mx-4{margin-inline:calc(calc(var(--spacing)) * -4)}.tw\\:mx-0{margin-inline:calc(calc(var(--spacing)) * 0)}.tw\\:mx-1{margin-inline:calc(calc(var(--spacing)) * 1)}.tw\\:mx-2{margin-inline:calc(calc(var(--spacing)) * 2)}.tw\\:mx-3\\.5{margin-inline:calc(calc(var(--spacing)) * 3.5)}.tw\\:mx-4{margin-inline:calc(calc(var(--spacing)) * 4)}.tw\\:mx-8{margin-inline:calc(calc(var(--spacing)) * 8)}.tw\\:my-1{margin-block:calc(calc(var(--spacing)) * 1)}.tw\\:my-2\\.5{margin-block:calc(calc(var(--spacing)) * 2.5)}.tw\\:my-4{margin-block:calc(calc(var(--spacing)) * 4)}.tw\\:my-auto{margin-block:auto}.tw\\:ms-1{margin-inline-start:calc(calc(var(--spacing)) * 1)}.tw\\:ms-2{margin-inline-start:calc(calc(var(--spacing)) * 2)}.tw\\:ms-5{margin-inline-start:calc(calc(var(--spacing)) * 5)}.tw\\:ms-6{margin-inline-start:calc(calc(var(--spacing)) * 6)}.tw\\:ms-auto{margin-inline-start:auto}.tw\\:me-1{margin-inline-end:calc(calc(var(--spacing)) * 1)}.tw\\:me-2{margin-inline-end:calc(calc(var(--spacing)) * 2)}.tw\\:prose{color:var(--tw-prose-body);max-width:65ch}.tw\\:prose :where(p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em}.tw\\:prose :where([class~=lead]):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-lead);margin-top:1.2em;margin-bottom:1.2em;font-size:1.25em;line-height:1.6}.tw\\:prose :where(a):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-links);font-weight:500;text-decoration:underline}.tw\\:prose :where(strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-bold);font-weight:600}.tw\\:prose :where(a strong):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(blockquote strong):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(thead th strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.tw\\:prose :where(ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em;padding-inline-start:1.625em;list-style-type:decimal}.tw\\:prose :where(ol[type=A]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-alpha}.tw\\:prose :where(ol[type=a]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-alpha}.tw\\:prose :where(ol[type=A s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-alpha}.tw\\:prose :where(ol[type=a s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-alpha}.tw\\:prose :where(ol[type=I]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-roman}.tw\\:prose :where(ol[type=i]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-roman}.tw\\:prose :where(ol[type=I s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-roman}.tw\\:prose :where(ol[type=i s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-roman}.tw\\:prose :where(ol[type="1"]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:decimal}.tw\\:prose :where(ul):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em;padding-inline-start:1.625em;list-style-type:disc}.tw\\:prose :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *))::marker{color:var(--tw-prose-counters);font-weight:400}.tw\\:prose :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *))::marker{color:var(--tw-prose-bullets)}.tw\\:prose :where(dt):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:1.25em;font-weight:600}.tw\\:prose :where(hr):not(:where([class~=not-prose],[class~=not-prose] *)){border-color:var(--tw-prose-hr);border-top-width:1px;margin-top:3em;margin-bottom:3em}.tw\\:prose :where(blockquote):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-quotes);border-inline-start-width:.25rem;border-inline-start-color:var(--tw-prose-quote-borders);quotes:"“""”""‘""’";margin-top:1.6em;margin-bottom:1.6em;padding-inline-start:1em;font-style:italic;font-weight:500}.tw\\:prose :where(blockquote p:first-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):before{content:open-quote}.tw\\:prose :where(blockquote p:last-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:close-quote}.tw\\:prose :where(h1):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:0;margin-bottom:.888889em;font-size:2.25em;font-weight:800;line-height:1.11111}.tw\\:prose :where(h1 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:900}.tw\\:prose :where(h2):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:2em;margin-bottom:1em;font-size:1.5em;font-weight:700;line-height:1.33333}.tw\\:prose :where(h2 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:800}.tw\\:prose :where(h3):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:1.6em;margin-bottom:.6em;font-size:1.25em;font-weight:600;line-height:1.6}.tw\\:prose :where(h3 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:700}.tw\\:prose :where(h4):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:1.5em;margin-bottom:.5em;font-weight:600;line-height:1.5}.tw\\:prose :where(h4 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:700}.tw\\:prose :where(img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.tw\\:prose :where(picture):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em;display:block}.tw\\:prose :where(video):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.tw\\:prose :where(kbd):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-kbd);box-shadow:0 0 0 1px rgb(var(--tw-prose-kbd-shadows) / 10%), 0 3px 0 rgb(var(--tw-prose-kbd-shadows) / 10%);padding-top:.1875em;padding-inline-end:.375em;padding-bottom:.1875em;border-radius:.3125rem;padding-inline-start:.375em;font-family:inherit;font-size:.875em;font-weight:500}.tw\\:prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-code);font-size:.875em;font-weight:600}.tw\\:prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)):before,.tw\\:prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:"\`"}.tw\\:prose :where(a code):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h1 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.tw\\:prose :where(h2 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-size:.875em}.tw\\:prose :where(h3 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-size:.9em}.tw\\:prose :where(h4 code):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(blockquote code):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(thead th code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.tw\\:prose :where(pre):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-pre-code);background-color:var(--tw-prose-pre-bg);padding-top:.857143em;padding-inline-end:1.14286em;padding-bottom:.857143em;border-radius:.375rem;margin-top:1.71429em;margin-bottom:1.71429em;padding-inline-start:1.14286em;font-size:.875em;font-weight:400;line-height:1.71429;overflow-x:auto}.tw\\:prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)){font-weight:inherit;color:inherit;font-size:inherit;font-family:inherit;line-height:inherit;background-color:#0000;border-width:0;border-radius:0;padding:0}.tw\\:prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)):before,.tw\\:prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:none}.tw\\:prose :where(table):not(:where([class~=not-prose],[class~=not-prose] *)){table-layout:auto;width:100%;margin-top:2em;margin-bottom:2em;font-size:.875em;line-height:1.71429}.tw\\:prose :where(thead):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:1px;border-bottom-color:var(--tw-prose-th-borders)}.tw\\:prose :where(thead th):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);vertical-align:bottom;padding-inline-end:.571429em;padding-bottom:.571429em;padding-inline-start:.571429em;font-weight:600}.tw\\:prose :where(tbody tr):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:1px;border-bottom-color:var(--tw-prose-td-borders)}.tw\\:prose :where(tbody tr:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:0}.tw\\:prose :where(tbody td):not(:where([class~=not-prose],[class~=not-prose] *)){vertical-align:baseline}.tw\\:prose :where(tfoot):not(:where([class~=not-prose],[class~=not-prose] *)){border-top-width:1px;border-top-color:var(--tw-prose-th-borders)}.tw\\:prose :where(tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){vertical-align:top}.tw\\:prose :where(th,td):not(:where([class~=not-prose],[class~=not-prose] *)){text-align:start}.tw\\:prose :where(figure>*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose :where(figcaption):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-captions);margin-top:.857143em;font-size:.875em;line-height:1.42857}.tw\\:prose{--tw-prose-body:var(--foreground);--tw-prose-headings:var(--foreground);--tw-prose-lead:var(--muted-foreground);--tw-prose-links:var(--primary);--tw-prose-bold:var(--foreground);--tw-prose-counters:var(--muted-foreground);--tw-prose-bullets:var(--muted-foreground);--tw-prose-hr:var(--border);--tw-prose-quotes:var(--foreground);--tw-prose-quote-borders:var(--border);--tw-prose-captions:var(--muted-foreground);--tw-prose-kbd:oklch(21% .034 264.665);--tw-prose-kbd-shadows:NaN NaN NaN;--tw-prose-code:var(--foreground);--tw-prose-pre-code:var(--muted-foreground);--tw-prose-pre-bg:var(--muted);--tw-prose-th-borders:var(--border);--tw-prose-td-borders:var(--border);--tw-prose-invert-body:var(--foreground);--tw-prose-invert-headings:var(--foreground);--tw-prose-invert-lead:var(--muted-foreground);--tw-prose-invert-links:var(--primary);--tw-prose-invert-bold:var(--foreground);--tw-prose-invert-counters:var(--muted-foreground);--tw-prose-invert-bullets:var(--muted-foreground);--tw-prose-invert-hr:var(--border);--tw-prose-invert-quotes:var(--foreground);--tw-prose-invert-quote-borders:var(--border);--tw-prose-invert-captions:var(--muted-foreground);--tw-prose-invert-kbd:#fff;--tw-prose-invert-kbd-shadows:255 255 255;--tw-prose-invert-code:var(--foreground);--tw-prose-invert-pre-code:var(--muted-foreground);--tw-prose-invert-pre-bg:var(--muted);--tw-prose-invert-th-borders:var(--border);--tw-prose-invert-td-borders:var(--border);font-size:1rem;line-height:1.75}.tw\\:prose :where(picture>img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose :where(li):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.5em;margin-bottom:.5em}.tw\\:prose :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:.375em}.tw\\:prose :where(.tw\\:prose>ul>li p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.75em;margin-bottom:.75em}.tw\\:prose :where(.tw\\:prose>ul>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em}.tw\\:prose :where(.tw\\:prose>ul>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.25em}.tw\\:prose :where(.tw\\:prose>ol>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em}.tw\\:prose :where(.tw\\:prose>ol>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.25em}.tw\\:prose :where(ul ul,ul ol,ol ul,ol ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.75em;margin-bottom:.75em}.tw\\:prose :where(dl):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em}.tw\\:prose :where(dd):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.5em;padding-inline-start:1.625em}.tw\\:prose :where(hr+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h2+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h3+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h4+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose :where(thead th:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose :where(thead th:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose :where(tbody td,tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.571429em;padding-inline-end:.571429em;padding-bottom:.571429em;padding-inline-start:.571429em}.tw\\:prose :where(tbody td:first-child,tfoot td:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose :where(tbody td:last-child,tfoot td:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose :where(figure):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.tw\\:prose :where(.tw\\:prose>:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose :where(.tw\\:prose>:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:0}.tw\\:prose-sm{font-size:.875rem;line-height:1.71429}.tw\\:prose-sm :where(p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em;margin-bottom:1.14286em}.tw\\:prose-sm :where([class~=lead]):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.888889em;margin-bottom:.888889em;font-size:1.28571em;line-height:1.55556}.tw\\:prose-sm :where(blockquote):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.33333em;margin-bottom:1.33333em;padding-inline-start:1.11111em}.tw\\:prose-sm :where(h1):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:.8em;font-size:2.14286em;line-height:1.2}.tw\\:prose-sm :where(h2):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.6em;margin-bottom:.8em;font-size:1.42857em;line-height:1.4}.tw\\:prose-sm :where(h3):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.55556em;margin-bottom:.444444em;font-size:1.28571em;line-height:1.55556}.tw\\:prose-sm :where(h4):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.42857em;margin-bottom:.571429em;line-height:1.42857}.tw\\:prose-sm :where(img):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(picture):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.71429em;margin-bottom:1.71429em}.tw\\:prose-sm :where(picture>img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose-sm :where(video):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.71429em;margin-bottom:1.71429em}.tw\\:prose-sm :where(kbd):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.142857em;padding-inline-end:.357143em;padding-bottom:.142857em;border-radius:.3125rem;padding-inline-start:.357143em;font-size:.857143em}.tw\\:prose-sm :where(code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.857143em}.tw\\:prose-sm :where(h2 code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.9em}.tw\\:prose-sm :where(h3 code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.888889em}.tw\\:prose-sm :where(pre):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.666667em;padding-inline-end:1em;padding-bottom:.666667em;border-radius:.25rem;margin-top:1.66667em;margin-bottom:1.66667em;padding-inline-start:1em;font-size:.857143em;line-height:1.66667}.tw\\:prose-sm :where(ol):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(ul):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em;margin-bottom:1.14286em;padding-inline-start:1.57143em}.tw\\:prose-sm :where(li):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.285714em;margin-bottom:.285714em}.tw\\:prose-sm :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:.428571em}.tw\\:prose-sm :where(.tw\\:prose-sm>ul>li p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.571429em;margin-bottom:.571429em}.tw\\:prose-sm :where(.tw\\:prose-sm>ul>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em}.tw\\:prose-sm :where(.tw\\:prose-sm>ul>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.14286em}.tw\\:prose-sm :where(.tw\\:prose-sm>ol>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em}.tw\\:prose-sm :where(.tw\\:prose-sm>ol>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.14286em}.tw\\:prose-sm :where(ul ul,ul ol,ol ul,ol ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.571429em;margin-bottom:.571429em}.tw\\:prose-sm :where(dl):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em;margin-bottom:1.14286em}.tw\\:prose-sm :where(dt):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em}.tw\\:prose-sm :where(dd):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.285714em;padding-inline-start:1.57143em}.tw\\:prose-sm :where(hr):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2.85714em;margin-bottom:2.85714em}.tw\\:prose-sm :where(hr+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(h2+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(h3+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(h4+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose-sm :where(table):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.857143em;line-height:1.5}.tw\\:prose-sm :where(thead th):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:1em;padding-bottom:.666667em;padding-inline-start:1em}.tw\\:prose-sm :where(thead th:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose-sm :where(thead th:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose-sm :where(tbody td,tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.666667em;padding-inline-end:1em;padding-bottom:.666667em;padding-inline-start:1em}.tw\\:prose-sm :where(tbody td:first-child,tfoot td:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose-sm :where(tbody td:last-child,tfoot td:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose-sm :where(figure):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.71429em;margin-bottom:1.71429em}.tw\\:prose-sm :where(figure>*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose-sm :where(figcaption):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.666667em;font-size:.857143em;line-height:1.33333}.tw\\:prose-sm :where(.tw\\:prose-sm>:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose-sm :where(.tw\\:prose-sm>:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:0}.tw\\:-mt-4{margin-top:calc(calc(var(--spacing)) * -4)}.tw\\:mt-0\\.5{margin-top:calc(calc(var(--spacing)) * .5)}.tw\\:mt-1{margin-top:calc(calc(var(--spacing)) * 1)}.tw\\:mt-2{margin-top:calc(calc(var(--spacing)) * 2)}.tw\\:mt-3{margin-top:calc(calc(var(--spacing)) * 3)}.tw\\:mt-4{margin-top:calc(calc(var(--spacing)) * 4)}.tw\\:mt-6{margin-top:calc(calc(var(--spacing)) * 6)}.tw\\:mt-auto{margin-top:auto}.tw\\:mr-1{margin-right:calc(calc(var(--spacing)) * 1)}.tw\\:mr-2{margin-right:calc(calc(var(--spacing)) * 2)}.tw\\:mr-3{margin-right:calc(calc(var(--spacing)) * 3)}.tw\\:-mb-4{margin-bottom:calc(calc(var(--spacing)) * -4)}.tw\\:mb-1{margin-bottom:calc(calc(var(--spacing)) * 1)}.tw\\:mb-2{margin-bottom:calc(calc(var(--spacing)) * 2)}.tw\\:mb-3{margin-bottom:calc(calc(var(--spacing)) * 3)}.tw\\:mb-4{margin-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:ml-1{margin-left:calc(calc(var(--spacing)) * 1)}.tw\\:ml-2{margin-left:calc(calc(var(--spacing)) * 2)}.tw\\:ml-4{margin-left:calc(calc(var(--spacing)) * 4)}.tw\\:ml-auto{margin-left:auto}.tw\\:box-border{box-sizing:border-box}.tw\\:line-clamp-3{-webkit-line-clamp:3;-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden}.tw\\:no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}.tw\\:no-scrollbar::-webkit-scrollbar{display:none}.tw\\:block{display:block}.tw\\:flex{display:flex}.tw\\:grid{display:grid}.tw\\:hidden{display:none}.tw\\:inline-block{display:inline-block}.tw\\:inline-flex{display:inline-flex}.tw\\:inline-grid{display:inline-grid}.tw\\:field-sizing-content{field-sizing:content}.tw\\:aspect-square{aspect-ratio:1}.tw\\:size-2{width:calc(calc(var(--spacing)) * 2);height:calc(calc(var(--spacing)) * 2)}.tw\\:size-2\\.5{width:calc(calc(var(--spacing)) * 2.5);height:calc(calc(var(--spacing)) * 2.5)}.tw\\:size-3{width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:size-3\\.5{width:calc(calc(var(--spacing)) * 3.5);height:calc(calc(var(--spacing)) * 3.5)}.tw\\:size-4{width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:size-6{width:calc(calc(var(--spacing)) * 6);height:calc(calc(var(--spacing)) * 6)}.tw\\:size-7{width:calc(calc(var(--spacing)) * 7);height:calc(calc(var(--spacing)) * 7)}.tw\\:size-8{width:calc(calc(var(--spacing)) * 8);height:calc(calc(var(--spacing)) * 8)}.tw\\:size-9{width:calc(calc(var(--spacing)) * 9);height:calc(calc(var(--spacing)) * 9)}.tw\\:size-10{width:calc(calc(var(--spacing)) * 10);height:calc(calc(var(--spacing)) * 10)}.tw\\:size-full{width:100%;height:100%}.tw\\:h-1{height:calc(calc(var(--spacing)) * 1)}.tw\\:h-2{height:calc(calc(var(--spacing)) * 2)}.tw\\:h-3{height:calc(calc(var(--spacing)) * 3)}.tw\\:h-3\\.5{height:calc(calc(var(--spacing)) * 3.5)}.tw\\:h-4{height:calc(calc(var(--spacing)) * 4)}.tw\\:h-5{height:calc(calc(var(--spacing)) * 5)}.tw\\:h-6{height:calc(calc(var(--spacing)) * 6)}.tw\\:h-7{height:calc(calc(var(--spacing)) * 7)}.tw\\:h-8{height:calc(calc(var(--spacing)) * 8)}.tw\\:h-8\\!{height:calc(calc(var(--spacing)) * 8)!important}.tw\\:h-8\\.5{height:calc(calc(var(--spacing)) * 8.5)}.tw\\:h-9{height:calc(calc(var(--spacing)) * 9)}.tw\\:h-10{height:calc(calc(var(--spacing)) * 10)}.tw\\:h-12{height:calc(calc(var(--spacing)) * 12)}.tw\\:h-14{height:calc(calc(var(--spacing)) * 14)}.tw\\:h-20{height:calc(calc(var(--spacing)) * 20)}.tw\\:h-24{height:calc(calc(var(--spacing)) * 24)}.tw\\:h-32{height:calc(calc(var(--spacing)) * 32)}.tw\\:h-40{height:calc(calc(var(--spacing)) * 40)}.tw\\:h-64{height:calc(calc(var(--spacing)) * 64)}.tw\\:h-80{height:calc(calc(var(--spacing)) * 80)}.tw\\:h-96{height:calc(calc(var(--spacing)) * 96)}.tw\\:h-\\[5px\\]{height:5px}.tw\\:h-\\[260px\\]{height:260px}.tw\\:h-\\[300px\\]{height:300px}.tw\\:h-\\[400px\\]{height:400px}.tw\\:h-\\[600px\\]{height:600px}.tw\\:h-\\[calc\\(100\\%-1px\\)\\]{height:calc(100% - 1px)}.tw\\:h-\\[calc\\(100\\%-2px\\)\\]{height:calc(100% - 2px)}.tw\\:h-auto{height:auto}.tw\\:h-full{height:100%}.tw\\:h-px{height:1px}.tw\\:h-screen{height:100vh}.tw\\:h-svh{height:100svh}.tw\\:max-h-\\(--radix-context-menu-content-available-height\\){max-height:var(--radix-context-menu-content-available-height)}.tw\\:max-h-\\(--radix-dropdown-menu-content-available-height\\){max-height:var(--radix-dropdown-menu-content-available-height)}.tw\\:max-h-\\(--radix-popover-content-available-height\\){max-height:var(--radix-popover-content-available-height)}.tw\\:max-h-\\(--radix-select-content-available-height\\){max-height:var(--radix-select-content-available-height)}.tw\\:max-h-5{max-height:calc(calc(var(--spacing)) * 5)}.tw\\:max-h-10{max-height:calc(calc(var(--spacing)) * 10)}.tw\\:max-h-72{max-height:calc(calc(var(--spacing)) * 72)}.tw\\:max-h-80{max-height:calc(calc(var(--spacing)) * 80)}.tw\\:max-h-\\[96\\%\\]{max-height:96%}.tw\\:max-h-\\[300px\\]{max-height:300px}.tw\\:min-h-0{min-height:calc(calc(var(--spacing)) * 0)}.tw\\:min-h-11{min-height:calc(calc(var(--spacing)) * 11)}.tw\\:min-h-16{min-height:calc(calc(var(--spacing)) * 16)}.tw\\:min-h-\\[200px\\]{min-height:200px}.tw\\:min-h-full{min-height:100%}.tw\\:min-h-svh{min-height:100svh}.tw\\:w-\\(--radix-dropdown-menu-trigger-width\\){width:var(--radix-dropdown-menu-trigger-width)}.tw\\:w-\\(--sidebar-width\\){width:var(--sidebar-width)}.tw\\:w-1{width:calc(calc(var(--spacing)) * 1)}.tw\\:w-1\\/2{width:50%}.tw\\:w-1\\/4{width:25%}.tw\\:w-1\\/6{width:16.6667%}.tw\\:w-2{width:calc(calc(var(--spacing)) * 2)}.tw\\:w-3{width:calc(calc(var(--spacing)) * 3)}.tw\\:w-3\\.5{width:calc(calc(var(--spacing)) * 3.5)}.tw\\:w-3\\/4{width:75%}.tw\\:w-4{width:calc(calc(var(--spacing)) * 4)}.tw\\:w-4\\/5{width:80%}.tw\\:w-4\\/6{width:66.6667%}.tw\\:w-5{width:calc(calc(var(--spacing)) * 5)}.tw\\:w-5\\/6{width:83.3333%}.tw\\:w-6{width:calc(calc(var(--spacing)) * 6)}.tw\\:w-7{width:calc(calc(var(--spacing)) * 7)}.tw\\:w-8{width:calc(calc(var(--spacing)) * 8)}.tw\\:w-9{width:calc(calc(var(--spacing)) * 9)}.tw\\:w-9\\/12{width:75%}.tw\\:w-10{width:calc(calc(var(--spacing)) * 10)}.tw\\:w-12{width:calc(calc(var(--spacing)) * 12)}.tw\\:w-14{width:calc(calc(var(--spacing)) * 14)}.tw\\:w-20{width:calc(calc(var(--spacing)) * 20)}.tw\\:w-24{width:calc(calc(var(--spacing)) * 24)}.tw\\:w-32{width:calc(calc(var(--spacing)) * 32)}.tw\\:w-48{width:calc(calc(var(--spacing)) * 48)}.tw\\:w-56{width:calc(calc(var(--spacing)) * 56)}.tw\\:w-60{width:calc(calc(var(--spacing)) * 60)}.tw\\:w-64{width:calc(calc(var(--spacing)) * 64)}.tw\\:w-72{width:calc(calc(var(--spacing)) * 72)}.tw\\:w-80{width:calc(calc(var(--spacing)) * 80)}.tw\\:w-96{width:calc(calc(var(--spacing)) * 96)}.tw\\:w-\\[1px\\]{width:1px}.tw\\:w-\\[5px\\]{width:5px}.tw\\:w-\\[70px\\]{width:70px}.tw\\:w-\\[100px\\]{width:100px}.tw\\:w-\\[116px\\]{width:116px}.tw\\:w-\\[124px\\]{width:124px}.tw\\:w-\\[150px\\]{width:150px}.tw\\:w-\\[180px\\]{width:180px}.tw\\:w-\\[200px\\]{width:200px}.tw\\:w-\\[250px\\]{width:250px}.tw\\:w-\\[260px\\]{width:260px}.tw\\:w-\\[270px\\]{width:270px}.tw\\:w-\\[280px\\]{width:280px}.tw\\:w-\\[300px\\]{width:300px}.tw\\:w-\\[320px\\]{width:320px}.tw\\:w-\\[350px\\]{width:350px}.tw\\:w-\\[400px\\]{width:400px}.tw\\:w-\\[420px\\]{width:420px}.tw\\:w-\\[500px\\]{width:500px}.tw\\:w-\\[560px\\]{width:560px}.tw\\:w-\\[600px\\]{width:600px}.tw\\:w-\\[700px\\]{width:700px}.tw\\:w-\\[calc\\(100\\%-2px\\)\\]{width:calc(100% - 2px)}.tw\\:w-\\[var\\(--radix-dropdown-menu-trigger-width\\)\\]{width:var(--radix-dropdown-menu-trigger-width)}.tw\\:w-auto{width:auto}.tw\\:w-fit{width:fit-content}.tw\\:w-full{width:100%}.tw\\:w-max{width:max-content}.tw\\:w-px{width:1px}.tw\\:max-w-\\(--skeleton-width\\){max-width:var(--skeleton-width)}.tw\\:max-w-0{max-width:calc(calc(var(--spacing)) * 0)}.tw\\:max-w-2xl{max-width:var(--tw-container-2xl)}.tw\\:max-w-3xl{max-width:var(--tw-container-3xl)}.tw\\:max-w-4xl{max-width:var(--tw-container-4xl)}.tw\\:max-w-5{max-width:calc(calc(var(--spacing)) * 5)}.tw\\:max-w-6xl{max-width:var(--tw-container-6xl)}.tw\\:max-w-40{max-width:calc(calc(var(--spacing)) * 40)}.tw\\:max-w-48{max-width:calc(calc(var(--spacing)) * 48)}.tw\\:max-w-64{max-width:calc(calc(var(--spacing)) * 64)}.tw\\:max-w-96{max-width:calc(calc(var(--spacing)) * 96)}.tw\\:max-w-\\[200px\\]{max-width:200px}.tw\\:max-w-\\[220px\\]{max-width:220px}.tw\\:max-w-\\[600px\\]{max-width:600px}.tw\\:max-w-\\[calc\\(100\\%-2rem\\)\\]{max-width:calc(100% - 2rem)}.tw\\:max-w-\\[calc\\(100vw-2rem\\)\\]{max-width:calc(100vw - 2rem)}.tw\\:max-w-fit{max-width:fit-content}.tw\\:max-w-full{max-width:100%}.tw\\:max-w-lg{max-width:var(--tw-container-lg)}.tw\\:max-w-md{max-width:var(--tw-container-md)}.tw\\:max-w-none{max-width:none}.tw\\:max-w-sm{max-width:var(--tw-container-sm)}.tw\\:max-w-xs{max-width:var(--tw-container-xs)}.tw\\:min-w-0{min-width:calc(calc(var(--spacing)) * 0)}.tw\\:min-w-4{min-width:calc(calc(var(--spacing)) * 4)}.tw\\:min-w-5{min-width:calc(calc(var(--spacing)) * 5)}.tw\\:min-w-7{min-width:calc(calc(var(--spacing)) * 7)}.tw\\:min-w-8{min-width:calc(calc(var(--spacing)) * 8)}.tw\\:min-w-9{min-width:calc(calc(var(--spacing)) * 9)}.tw\\:min-w-16{min-width:calc(calc(var(--spacing)) * 16)}.tw\\:min-w-32{min-width:calc(calc(var(--spacing)) * 32)}.tw\\:min-w-36{min-width:calc(calc(var(--spacing)) * 36)}.tw\\:min-w-80{min-width:calc(calc(var(--spacing)) * 80)}.tw\\:min-w-\\[12rem\\]{min-width:12rem}.tw\\:min-w-\\[26px\\]{min-width:26px}.tw\\:min-w-\\[96px\\]{min-width:96px}.tw\\:min-w-\\[140px\\]{min-width:140px}.tw\\:min-w-\\[215px\\]{min-width:215px}.tw\\:min-w-\\[500px\\]{min-width:500px}.tw\\:min-w-min{min-width:min-content}.tw\\:flex-1{flex:1}.tw\\:shrink{flex-shrink:1}.tw\\:shrink\\!{flex-shrink:1!important}.tw\\:shrink-0{flex-shrink:0}.tw\\:shrink-\\[9999\\]{flex-shrink:9999}.tw\\:flex-grow,.tw\\:grow,.tw\\:grow-\\[1\\]{flex-grow:1}.tw\\:grow-\\[10\\]{flex-grow:10}.tw\\:basis-0{flex-basis:calc(calc(var(--spacing)) * 0)}.tw\\:table-fixed{table-layout:fixed}.tw\\:caption-bottom{caption-side:bottom}.tw\\:border-collapse{border-collapse:collapse}.tw\\:origin-\\(--radix-context-menu-content-transform-origin\\){transform-origin:var(--radix-context-menu-content-transform-origin)}.tw\\:origin-\\(--radix-dropdown-menu-content-transform-origin\\){transform-origin:var(--radix-dropdown-menu-content-transform-origin)}.tw\\:origin-\\(--radix-menubar-content-transform-origin\\){transform-origin:var(--radix-menubar-content-transform-origin)}.tw\\:origin-\\(--radix-popover-content-transform-origin\\){transform-origin:var(--radix-popover-content-transform-origin)}.tw\\:origin-\\(--radix-select-content-transform-origin\\){transform-origin:var(--radix-select-content-transform-origin)}.tw\\:origin-\\(--radix-tooltip-content-transform-origin\\){transform-origin:var(--radix-tooltip-content-transform-origin)}.tw\\:-translate-x-1\\/2{--tw-translate-x:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:-translate-x-px{--tw-translate-x:-1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:translate-x-px{--tw-translate-x:1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:-translate-y-1\\/2{--tw-translate-y:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:translate-y-0{--tw-translate-y:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:translate-y-px{--tw-translate-y:1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rotate-45{rotate:45deg}.tw\\:rotate-180{rotate:180deg}.tw\\:transform{transform:var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,)}.tw\\:animate-none\\!{animation:none!important}.tw\\:animate-pulse{animation:var(--tw-animate-pulse)}.tw\\:animate-spin{animation:var(--tw-animate-spin)}.tw\\:cursor-default{cursor:default}.tw\\:cursor-ew-resize{cursor:ew-resize}.tw\\:cursor-not-allowed{cursor:not-allowed}.tw\\:cursor-pointer{cursor:pointer}.tw\\:cursor-text{cursor:text}.tw\\:touch-none{touch-action:none}.tw\\:resize{resize:both}.tw\\:resize-none{resize:none}.tw\\:scroll-m-20{scroll-margin:calc(calc(var(--spacing)) * 20)}.tw\\:scroll-my-1{scroll-margin-block:calc(calc(var(--spacing)) * 1)}.tw\\:scroll-py-1{scroll-padding-block:calc(calc(var(--spacing)) * 1)}.tw\\:list-inside{list-style-position:inside}.tw\\:list-outside{list-style-position:outside}.tw\\:\\!list-\\[lower-alpha\\]{list-style-type:lower-alpha!important}.tw\\:\\!list-\\[lower-roman\\]{list-style-type:lower-roman!important}.tw\\:\\!list-\\[upper-alpha\\]{list-style-type:upper-alpha!important}.tw\\:\\!list-\\[upper-roman\\]{list-style-type:upper-roman!important}.tw\\:\\!list-decimal{list-style-type:decimal!important}.tw\\:\\!list-disc{list-style-type:disc!important}.tw\\:list-decimal{list-style-type:decimal}.tw\\:list-disc{list-style-type:disc}.tw\\:list-none{list-style-type:none}.tw\\:grid-flow-col{grid-auto-flow:column}.tw\\:grid-flow-row{grid-auto-flow:row}.tw\\:auto-rows-min{grid-auto-rows:min-content}.tw\\:grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}.tw\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.tw\\:grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.tw\\:grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}.tw\\:grid-cols-\\[25\\%_25\\%_50\\%\\]{grid-template-columns:25% 25% 50%}.tw\\:grid-cols-\\[25\\%_50\\%_25\\%\\]{grid-template-columns:25% 50% 25%}.tw\\:grid-cols-\\[auto_auto_auto_auto\\]{grid-template-columns:auto auto auto auto}.tw\\:grid-cols-\\[min-content_1fr\\]{grid-template-columns:min-content 1fr}.tw\\:grid-cols-subgrid{grid-template-columns:subgrid}.tw\\:flex-col{flex-direction:column}.tw\\:flex-col-reverse{flex-direction:column-reverse}.tw\\:flex-row{flex-direction:row}.tw\\:flex-row-reverse{flex-direction:row-reverse}.tw\\:flex-nowrap{flex-wrap:nowrap}.tw\\:flex-wrap{flex-wrap:wrap}.tw\\:place-content-center{place-content:center}.tw\\:content-center{align-content:center}.tw\\:items-baseline{align-items:baseline}.tw\\:items-center{align-items:center}.tw\\:items-end{align-items:flex-end}.tw\\:items-start{align-items:flex-start}.tw\\:items-stretch{align-items:stretch}.tw\\:justify-between{justify-content:space-between}.tw\\:justify-center{justify-content:center}.tw\\:justify-end{justify-content:flex-end}.tw\\:justify-start{justify-content:flex-start}.tw\\:gap-0{gap:calc(calc(var(--spacing)) * 0)}.tw\\:gap-0\\.5{gap:calc(calc(var(--spacing)) * .5)}.tw\\:gap-1{gap:calc(calc(var(--spacing)) * 1)}.tw\\:gap-1\\.5{gap:calc(calc(var(--spacing)) * 1.5)}.tw\\:gap-1\\.5\\!{gap:calc(calc(var(--spacing)) * 1.5)!important}.tw\\:gap-2{gap:calc(calc(var(--spacing)) * 2)}.tw\\:gap-2\\.5{gap:calc(calc(var(--spacing)) * 2.5)}.tw\\:gap-3{gap:calc(calc(var(--spacing)) * 3)}.tw\\:gap-4{gap:calc(calc(var(--spacing)) * 4)}.tw\\:gap-5{gap:calc(calc(var(--spacing)) * 5)}.tw\\:gap-6{gap:calc(calc(var(--spacing)) * 6)}.tw\\:gap-8{gap:calc(calc(var(--spacing)) * 8)}.tw\\:gap-16{gap:calc(calc(var(--spacing)) * 16)}.tw\\:gap-\\[--spacing\\(var\\(--gap\\)\\)\\]{gap:calc(calc(var(--spacing)) * var(--gap))}.tw\\:gap-\\[12px\\]{gap:12px}:where(.tw\\:space-y-1>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 1) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 1) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-1\\.5>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 1.5) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 1.5) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-2>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 2) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 2) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-3>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 3) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 3) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-4>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 4) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 4) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-6>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 6) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 6) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-8>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 8) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 8) * calc(1 - var(--tw-space-y-reverse)))}.tw\\:gap-x-1{column-gap:calc(calc(var(--spacing)) * 1)}.tw\\:gap-x-2{column-gap:calc(calc(var(--spacing)) * 2)}.tw\\:gap-x-3{column-gap:calc(calc(var(--spacing)) * 3)}.tw\\:gap-x-4{column-gap:calc(calc(var(--spacing)) * 4)}:where(.tw\\:-space-x-2>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * -2) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * -2) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-2>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 2) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 2) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-3>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 3) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 3) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-4>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 4) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 4) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-6>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 6) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 6) * calc(1 - var(--tw-space-x-reverse)))}.tw\\:gap-y-1{row-gap:calc(calc(var(--spacing)) * 1)}.tw\\:gap-y-2{row-gap:calc(calc(var(--spacing)) * 2)}:where(.tw\\:divide-x>:not(:last-child)){--tw-divide-x-reverse:0;border-inline-style:var(--tw-border-style);border-inline-start-width:calc(1px * var(--tw-divide-x-reverse));border-inline-end-width:calc(1px * calc(1 - var(--tw-divide-x-reverse)))}:where(.tw\\:divide-y>:not(:last-child)){--tw-divide-y-reverse:0;border-bottom-style:var(--tw-border-style);border-top-style:var(--tw-border-style);border-top-width:calc(1px * var(--tw-divide-y-reverse));border-bottom-width:calc(1px * calc(1 - var(--tw-divide-y-reverse)))}.tw\\:self-start{align-self:flex-start}.tw\\:self-stretch{align-self:stretch}.tw\\:justify-self-end{justify-self:flex-end}.tw\\:truncate{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.tw\\:overflow-auto{overflow:auto}.tw\\:overflow-clip{overflow:clip}.tw\\:overflow-hidden{overflow:hidden}.tw\\:overflow-scroll{overflow:scroll}.tw\\:overflow-visible{overflow:visible}.tw\\:overflow-x-auto{overflow-x:auto}.tw\\:overflow-x-hidden{overflow-x:hidden}.tw\\:overflow-y-auto{overflow-y:auto}.tw\\:overflow-y-hidden{overflow-y:hidden}.tw\\:rounded{border-radius:.25rem}.tw\\:rounded-2xl{border-radius:calc(var(--radius) * 1.8)}.tw\\:rounded-4xl{border-radius:calc(var(--radius) * 2.6)}.tw\\:rounded-\\[4px\\]{border-radius:4px}.tw\\:rounded-\\[6px\\]{border-radius:6px}.tw\\:rounded-\\[calc\\(var\\(--radius\\)-3px\\)\\]{border-radius:calc(var(--radius) - 3px)}.tw\\:rounded-\\[min\\(var\\(--tw-radius-md\\)\\,10px\\)\\]{border-radius:min(var(--tw-radius-md), 10px)}.tw\\:rounded-\\[min\\(var\\(--tw-radius-md\\)\\,12px\\)\\]{border-radius:min(var(--tw-radius-md), 12px)}.tw\\:rounded-full{border-radius:3.40282e38px}.tw\\:rounded-lg{border-radius:var(--radius)}.tw\\:rounded-lg\\!{border-radius:var(--radius)!important}.tw\\:rounded-md{border-radius:calc(var(--radius) * .8)}.tw\\:rounded-none{border-radius:0}.tw\\:rounded-sm{border-radius:calc(var(--radius) * .6)}.tw\\:rounded-xl{border-radius:calc(var(--radius) * 1.4)}.tw\\:rounded-xl\\!{border-radius:calc(var(--radius) * 1.4)!important}.tw\\:rounded-xs{border-radius:var(--tw-radius-xs)}.tw\\:rounded-s-none{border-start-start-radius:0;border-end-start-radius:0}.tw\\:rounded-e-none{border-start-end-radius:0;border-end-end-radius:0}.tw\\:rounded-t-xl{border-top-left-radius:calc(var(--radius) * 1.4);border-top-right-radius:calc(var(--radius) * 1.4)}.tw\\:rounded-l-lg{border-top-left-radius:var(--radius);border-bottom-left-radius:var(--radius)}.tw\\:rounded-r-xl{border-top-right-radius:calc(var(--radius) * 1.4);border-bottom-right-radius:calc(var(--radius) * 1.4)}.tw\\:rounded-b-xl{border-bottom-right-radius:calc(var(--radius) * 1.4);border-bottom-left-radius:calc(var(--radius) * 1.4)}.tw\\:border{border-style:var(--tw-border-style);border-width:1px}.tw\\:border-0{border-style:var(--tw-border-style);border-width:0}.tw\\:border-2{border-style:var(--tw-border-style);border-width:2px}.tw\\:border-s{border-inline-start-style:var(--tw-border-style);border-inline-start-width:1px}.tw\\:border-s-0{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:border-s-2{border-inline-start-style:var(--tw-border-style);border-inline-start-width:2px}.tw\\:border-s-4{border-inline-start-style:var(--tw-border-style);border-inline-start-width:4px}.tw\\:border-e{border-inline-end-style:var(--tw-border-style);border-inline-end-width:1px}.tw\\:border-e-0{border-inline-end-style:var(--tw-border-style);border-inline-end-width:0}.tw\\:border-t{border-top-style:var(--tw-border-style);border-top-width:1px}.tw\\:border-t-0{border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:border-b{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}.tw\\:border-b-0{border-bottom-style:var(--tw-border-style);border-bottom-width:0}.tw\\:border-l-2{border-left-style:var(--tw-border-style);border-left-width:2px}.tw\\:border-l-4{border-left-style:var(--tw-border-style);border-left-width:4px}.tw\\:border-dashed{--tw-border-style:dashed;border-style:dashed}.tw\\:border-none{--tw-border-style:none;border-style:none}.tw\\:border-solid{--tw-border-style:solid;border-style:solid}.tw\\:border-black{border-color:var(--tw-color-black)}.tw\\:border-blue-400{border-color:var(--tw-color-blue-400)}.tw\\:border-blue-500{border-color:var(--tw-color-blue-500)}.tw\\:border-border,.tw\\:border-border\\/50{border-color:var(--border)}@supports (color:color-mix(in lab, red, red)){.tw\\:border-border\\/50{border-color:color-mix(in oklab, var(--border) 50%, transparent)}}.tw\\:border-destructive{border-color:var(--destructive)}.tw\\:border-foreground{border-color:var(--foreground)}.tw\\:border-gray-300{border-color:var(--tw-color-gray-300)}.tw\\:border-input,.tw\\:border-input\\/30{border-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:border-input\\/30{border-color:color-mix(in oklab, var(--input) 30%, transparent)}}.tw\\:border-muted-foreground,.tw\\:border-muted-foreground\\/40{border-color:var(--muted-foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:border-muted-foreground\\/40{border-color:color-mix(in oklab, var(--muted-foreground) 40%, transparent)}}.tw\\:border-primary{border-color:var(--primary)}.tw\\:border-red-300{border-color:var(--tw-color-red-300)}.tw\\:border-red-400{border-color:var(--tw-color-red-400)}.tw\\:border-red-500{border-color:var(--tw-color-red-500)}.tw\\:border-red-600{border-color:var(--tw-color-red-600)}.tw\\:border-ring{border-color:var(--ring)}.tw\\:border-sidebar-border{border-color:var(--sidebar-border)}.tw\\:border-slate-300{border-color:var(--tw-color-slate-300)}.tw\\:border-transparent{border-color:#0000}.tw\\:border-yellow-400{border-color:var(--tw-color-yellow-400)}.tw\\:border-yellow-500{border-color:var(--tw-color-yellow-500)}.tw\\:border-s-amber-200{border-inline-start-color:var(--tw-color-amber-200)}.tw\\:border-s-indigo-200{border-inline-start-color:var(--tw-color-indigo-200)}.tw\\:border-s-purple-200{border-inline-start-color:var(--tw-color-purple-200)}.tw\\:border-s-red-200{border-inline-start-color:var(--tw-color-red-200)}.tw\\:\\!bg-destructive\\/50{background-color:var(--destructive)!important}@supports (color:color-mix(in lab, red, red)){.tw\\:\\!bg-destructive\\/50{background-color:color-mix(in oklab, var(--destructive) 50%, transparent)!important}}.tw\\:bg-\\[color-mix\\(in_oklab\\,var\\(--destructive\\)_10\\%\\,var\\(--background\\)\\)\\]{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-\\[color-mix\\(in_oklab\\,var\\(--destructive\\)_10\\%\\,var\\(--background\\)\\)\\]{background-color:color-mix(in oklab,var(--destructive) 10%,var(--background))}}.tw\\:bg-accent,.tw\\:bg-accent\\/50{background-color:var(--accent)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-accent\\/50{background-color:color-mix(in oklab, var(--accent) 50%, transparent)}}.tw\\:bg-amber-500,.tw\\:bg-amber-500\\/5{background-color:var(--tw-color-amber-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-amber-500\\/5{background-color:color-mix(in oklab, var(--tw-color-amber-500) 5%, transparent)}}.tw\\:bg-amber-500\\/15{background-color:var(--tw-color-amber-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-amber-500\\/15{background-color:color-mix(in oklab, var(--tw-color-amber-500) 15%, transparent)}}.tw\\:bg-background,.tw\\:bg-background\\/50{background-color:var(--background)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-background\\/50{background-color:color-mix(in oklab, var(--background) 50%, transparent)}}.tw\\:bg-black\\/10{background-color:var(--tw-color-black)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-black\\/10{background-color:color-mix(in oklab, var(--tw-color-black) 10%, transparent)}}.tw\\:bg-blue-50{background-color:var(--tw-color-blue-50)}.tw\\:bg-blue-100{background-color:var(--tw-color-blue-100)}.tw\\:bg-blue-400{background-color:var(--tw-color-blue-400)}.tw\\:bg-blue-500{background-color:var(--tw-color-blue-500)}.tw\\:bg-border{background-color:var(--border)}.tw\\:bg-card{background-color:var(--card)}.tw\\:bg-destructive\\/10{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-destructive\\/10{background-color:color-mix(in oklab, var(--destructive) 10%, transparent)}}.tw\\:bg-foreground{background-color:var(--foreground)}.tw\\:bg-gray-50{background-color:var(--tw-color-gray-50)}.tw\\:bg-gray-100{background-color:var(--tw-color-gray-100)}.tw\\:bg-gray-500{background-color:var(--tw-color-gray-500)}.tw\\:bg-green-50{background-color:var(--tw-color-green-50)}.tw\\:bg-green-100{background-color:var(--tw-color-green-100)}.tw\\:bg-green-500{background-color:var(--tw-color-green-500)}.tw\\:bg-input,.tw\\:bg-input\\/30{background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-input\\/30{background-color:color-mix(in oklab, var(--input) 30%, transparent)}}.tw\\:bg-muted,.tw\\:bg-muted\\/50{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-muted\\/50{background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:bg-neutral-300{background-color:var(--tw-color-neutral-300)}.tw\\:bg-orange-100{background-color:var(--tw-color-orange-100)}.tw\\:bg-popover,.tw\\:bg-popover\\/70{background-color:var(--popover)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-popover\\/70{background-color:color-mix(in oklab, var(--popover) 70%, transparent)}}.tw\\:bg-primary{background-color:var(--primary)}.tw\\:bg-primary-foreground{background-color:var(--primary-foreground)}.tw\\:bg-primary\\/30{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-primary\\/30{background-color:color-mix(in oklab, var(--primary) 30%, transparent)}}.tw\\:bg-purple-50{background-color:var(--tw-color-purple-50)}.tw\\:bg-red-100{background-color:var(--tw-color-red-100)}.tw\\:bg-red-500{background-color:var(--tw-color-red-500)}.tw\\:bg-rose-500,.tw\\:bg-rose-500\\/5{background-color:var(--tw-color-rose-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-rose-500\\/5{background-color:color-mix(in oklab, var(--tw-color-rose-500) 5%, transparent)}}.tw\\:bg-rose-500\\/15{background-color:var(--tw-color-rose-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-rose-500\\/15{background-color:color-mix(in oklab, var(--tw-color-rose-500) 15%, transparent)}}.tw\\:bg-secondary{background-color:var(--secondary)}.tw\\:bg-sidebar{background-color:var(--sidebar)}.tw\\:bg-sidebar-accent{background-color:var(--sidebar-accent)}.tw\\:bg-sidebar-border{background-color:var(--sidebar-border)}.tw\\:bg-sky-500,.tw\\:bg-sky-500\\/5{background-color:var(--tw-color-sky-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-sky-500\\/5{background-color:color-mix(in oklab, var(--tw-color-sky-500) 5%, transparent)}}.tw\\:bg-sky-500\\/15{background-color:var(--tw-color-sky-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-sky-500\\/15{background-color:color-mix(in oklab, var(--tw-color-sky-500) 15%, transparent)}}.tw\\:bg-teal-500,.tw\\:bg-teal-500\\/5{background-color:var(--tw-color-teal-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-teal-500\\/5{background-color:color-mix(in oklab, var(--tw-color-teal-500) 5%, transparent)}}.tw\\:bg-teal-500\\/15{background-color:var(--tw-color-teal-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-teal-500\\/15{background-color:color-mix(in oklab, var(--tw-color-teal-500) 15%, transparent)}}.tw\\:bg-transparent{background-color:#0000}.tw\\:bg-warning\\/15{background-color:var(--warning)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-warning\\/15{background-color:color-mix(in oklab, var(--warning) 15%, transparent)}}.tw\\:bg-white{background-color:var(--tw-color-white)}.tw\\:bg-yellow-50{background-color:var(--tw-color-yellow-50)}.tw\\:bg-yellow-100{background-color:var(--tw-color-yellow-100)}.tw\\:bg-yellow-500{background-color:var(--tw-color-yellow-500)}.tw\\:bg-zinc-400{background-color:var(--tw-color-zinc-400)}.tw\\:bg-gradient-to-t{--tw-gradient-position:to top in oklab;background-image:linear-gradient(var(--tw-gradient-stops))}.tw\\:from-popover{--tw-gradient-from:var(--popover);--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))}.tw\\:to-transparent{--tw-gradient-to:transparent;--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))}.tw\\:bg-clip-padding{background-clip:padding-box}.tw\\:fill-\\[color-mix\\(in_oklab\\,var\\(--destructive\\)_10\\%\\,var\\(--background\\)\\)\\]{fill:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:fill-\\[color-mix\\(in_oklab\\,var\\(--destructive\\)_10\\%\\,var\\(--background\\)\\)\\]{fill:color-mix(in oklab,var(--destructive) 10%,var(--background))}}.tw\\:fill-foreground{fill:var(--foreground)}.tw\\:fill-yellow-400,.tw\\:fill-yellow-400\\/50{fill:var(--tw-color-yellow-400)}@supports (color:color-mix(in lab, red, red)){.tw\\:fill-yellow-400\\/50{fill:color-mix(in oklab, var(--tw-color-yellow-400) 50%, transparent)}}.tw\\:object-cover{object-fit:cover}.tw\\:\\!p-4{padding:calc(calc(var(--spacing)) * 4)!important}.tw\\:p-0{padding:calc(calc(var(--spacing)) * 0)}.tw\\:p-0\\.5{padding:calc(calc(var(--spacing)) * .5)}.tw\\:p-1{padding:calc(calc(var(--spacing)) * 1)}.tw\\:p-2{padding:calc(calc(var(--spacing)) * 2)}.tw\\:p-2\\.5{padding:calc(calc(var(--spacing)) * 2.5)}.tw\\:p-3{padding:calc(calc(var(--spacing)) * 3)}.tw\\:p-4{padding:calc(calc(var(--spacing)) * 4)}.tw\\:p-6{padding:calc(calc(var(--spacing)) * 6)}.tw\\:p-8{padding:calc(calc(var(--spacing)) * 8)}.tw\\:p-\\[1px\\]{padding:1px}.tw\\:p-\\[3px\\]{padding:3px}.tw\\:p-\\[10px\\]{padding:10px}.tw\\:p-\\[16px\\]{padding:16px}.tw\\:px-0{padding-inline:calc(calc(var(--spacing)) * 0)}.tw\\:px-0\\.5{padding-inline:calc(calc(var(--spacing)) * .5)}.tw\\:px-1{padding-inline:calc(calc(var(--spacing)) * 1)}.tw\\:px-1\\.5{padding-inline:calc(calc(var(--spacing)) * 1.5)}.tw\\:px-2{padding-inline:calc(calc(var(--spacing)) * 2)}.tw\\:px-2\\.5{padding-inline:calc(calc(var(--spacing)) * 2.5)}.tw\\:px-3{padding-inline:calc(calc(var(--spacing)) * 3)}.tw\\:px-4{padding-inline:calc(calc(var(--spacing)) * 4)}.tw\\:px-6{padding-inline:calc(calc(var(--spacing)) * 6)}.tw\\:py-0{padding-block:calc(calc(var(--spacing)) * 0)}.tw\\:py-0\\.5{padding-block:calc(calc(var(--spacing)) * .5)}.tw\\:py-1{padding-block:calc(calc(var(--spacing)) * 1)}.tw\\:py-1\\.5{padding-block:calc(calc(var(--spacing)) * 1.5)}.tw\\:py-2{padding-block:calc(calc(var(--spacing)) * 2)}.tw\\:py-3{padding-block:calc(calc(var(--spacing)) * 3)}.tw\\:py-4{padding-block:calc(calc(var(--spacing)) * 4)}.tw\\:py-6{padding-block:calc(calc(var(--spacing)) * 6)}.tw\\:py-8{padding-block:calc(calc(var(--spacing)) * 8)}.tw\\:py-\\[2px\\]{padding-block:2px}.tw\\:ps-1\\.5{padding-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:ps-2{padding-inline-start:calc(calc(var(--spacing)) * 2)}.tw\\:ps-2\\.5{padding-inline-start:calc(calc(var(--spacing)) * 2.5)}.tw\\:ps-4{padding-inline-start:calc(calc(var(--spacing)) * 4)}.tw\\:ps-6{padding-inline-start:calc(calc(var(--spacing)) * 6)}.tw\\:ps-7{padding-inline-start:calc(calc(var(--spacing)) * 7)}.tw\\:ps-8{padding-inline-start:calc(calc(var(--spacing)) * 8)}.tw\\:ps-9{padding-inline-start:calc(calc(var(--spacing)) * 9)}.tw\\:ps-12{padding-inline-start:calc(calc(var(--spacing)) * 12)}.tw\\:ps-\\[85px\\]{padding-inline-start:85px}.tw\\:pe-1{padding-inline-end:calc(calc(var(--spacing)) * 1)}.tw\\:pe-1\\.5{padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:pe-2{padding-inline-end:calc(calc(var(--spacing)) * 2)}.tw\\:pe-4{padding-inline-end:calc(calc(var(--spacing)) * 4)}.tw\\:pe-8{padding-inline-end:calc(calc(var(--spacing)) * 8)}.tw\\:pe-8\\!{padding-inline-end:calc(calc(var(--spacing)) * 8)!important}.tw\\:pe-9{padding-inline-end:calc(calc(var(--spacing)) * 9)}.tw\\:pe-\\[calc\\(138px\\+1rem\\)\\]{padding-inline-end:calc(138px + 1rem)}.tw\\:pe-\\[…\\]{padding-inline-end:…}.tw\\:pt-1{padding-top:calc(calc(var(--spacing)) * 1)}.tw\\:pt-2{padding-top:calc(calc(var(--spacing)) * 2)}.tw\\:pt-3{padding-top:calc(calc(var(--spacing)) * 3)}.tw\\:pt-4{padding-top:calc(calc(var(--spacing)) * 4)}.tw\\:pt-6{padding-top:calc(calc(var(--spacing)) * 6)}.tw\\:pr-0{padding-right:calc(calc(var(--spacing)) * 0)}.tw\\:pr-3{padding-right:calc(calc(var(--spacing)) * 3)}.tw\\:pr-4{padding-right:calc(calc(var(--spacing)) * 4)}.tw\\:pb-0{padding-bottom:calc(calc(var(--spacing)) * 0)}.tw\\:pb-1{padding-bottom:calc(calc(var(--spacing)) * 1)}.tw\\:pb-2{padding-bottom:calc(calc(var(--spacing)) * 2)}.tw\\:pb-3{padding-bottom:calc(calc(var(--spacing)) * 3)}.tw\\:pb-4{padding-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:pb-8{padding-bottom:calc(calc(var(--spacing)) * 8)}.tw\\:pb-12{padding-bottom:calc(calc(var(--spacing)) * 12)}.tw\\:pb-16{padding-bottom:calc(calc(var(--spacing)) * 16)}.tw\\:pb-24{padding-bottom:calc(calc(var(--spacing)) * 24)}.tw\\:pl-2{padding-left:calc(calc(var(--spacing)) * 2)}.tw\\:pl-3{padding-left:calc(calc(var(--spacing)) * 3)}.tw\\:pl-4{padding-left:calc(calc(var(--spacing)) * 4)}.tw\\:pl-5{padding-left:calc(calc(var(--spacing)) * 5)}.tw\\:pl-6{padding-left:calc(calc(var(--spacing)) * 6)}.tw\\:pl-8{padding-left:calc(calc(var(--spacing)) * 8)}.tw\\:text-center{text-align:center}.tw\\:text-end{text-align:end}.tw\\:text-left{text-align:left}.tw\\:text-right{text-align:right}.tw\\:text-start{text-align:start}.tw\\:align-middle{vertical-align:middle}.tw\\:font-heading{font-family:var(--font-sans)}.tw\\:font-mono{font-family:var(--tw-font-mono)}.tw\\:font-sans{font-family:IBM Plex Sans Variable,sans-serif}.tw\\:text-2xl{font-size:var(--tw-text-2xl);line-height:var(--tw-leading,var(--tw-text-2xl--line-height))}.tw\\:text-3xl{font-size:var(--tw-text-3xl);line-height:var(--tw-leading,var(--tw-text-3xl--line-height))}.tw\\:text-4xl{font-size:var(--tw-text-4xl);line-height:var(--tw-leading,var(--tw-text-4xl--line-height))}.tw\\:text-base{font-size:var(--tw-text-base);line-height:var(--tw-leading,var(--tw-text-base--line-height))}.tw\\:text-lg{font-size:var(--tw-text-lg);line-height:var(--tw-leading,var(--tw-text-lg--line-height))}.tw\\:text-sm{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:text-sm\\/relaxed{font-size:var(--tw-text-sm);line-height:var(--tw-leading-relaxed)}.tw\\:text-xl{font-size:var(--tw-text-xl);line-height:var(--tw-leading,var(--tw-text-xl--line-height))}.tw\\:text-xs{font-size:var(--tw-text-xs);line-height:var(--tw-leading,var(--tw-text-xs--line-height))}.tw\\:text-\\[0\\.8rem\\]{font-size:.8rem}.tw\\:leading-6{--tw-leading:calc(calc(var(--spacing)) * 6);line-height:calc(calc(var(--spacing)) * 6)}.tw\\:leading-loose{--tw-leading:var(--tw-leading-loose);line-height:var(--tw-leading-loose)}.tw\\:leading-none{--tw-leading:1;line-height:1}.tw\\:leading-relaxed{--tw-leading:var(--tw-leading-relaxed);line-height:var(--tw-leading-relaxed)}.tw\\:leading-snug{--tw-leading:var(--tw-leading-snug);line-height:var(--tw-leading-snug)}.tw\\:leading-tight{--tw-leading:var(--tw-leading-tight);line-height:var(--tw-leading-tight)}.tw\\:font-bold{--tw-font-weight:var(--tw-font-weight-bold);font-weight:var(--tw-font-weight-bold)}.tw\\:font-extrabold{--tw-font-weight:var(--tw-font-weight-extrabold);font-weight:var(--tw-font-weight-extrabold)}.tw\\:font-medium{--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}.tw\\:font-normal{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:font-semibold{--tw-font-weight:var(--tw-font-weight-semibold);font-weight:var(--tw-font-weight-semibold)}.tw\\:tracking-tight{--tw-tracking:var(--tw-tracking-tight);letter-spacing:var(--tw-tracking-tight)}.tw\\:tracking-wider{--tw-tracking:var(--tw-tracking-wider);letter-spacing:var(--tw-tracking-wider)}.tw\\:tracking-widest{--tw-tracking:var(--tw-tracking-widest);letter-spacing:var(--tw-tracking-widest)}.tw\\:text-balance{text-wrap:balance}.tw\\:text-nowrap{text-wrap:nowrap}.tw\\:break-words{overflow-wrap:break-word}.tw\\:text-clip{text-overflow:clip}.tw\\:text-ellipsis{text-overflow:ellipsis}.tw\\:whitespace-normal{white-space:normal}.tw\\:whitespace-nowrap{white-space:nowrap}.tw\\:whitespace-pre{white-space:pre}.tw\\:whitespace-pre-line{white-space:pre-line}.tw\\:whitespace-pre-wrap{white-space:pre-wrap}.tw\\:\\[color\\:blue\\]{color:#00f}.tw\\:text-accent-foreground{color:var(--accent-foreground)}.tw\\:text-amber-600{color:var(--tw-color-amber-600)}.tw\\:text-background{color:var(--background)}.tw\\:text-blue-400{color:var(--tw-color-blue-400)}.tw\\:text-blue-500{color:var(--tw-color-blue-500)}.tw\\:text-blue-600{color:var(--tw-color-blue-600)}.tw\\:text-blue-800{color:var(--tw-color-blue-800)}.tw\\:text-card-foreground{color:var(--card-foreground)}.tw\\:text-current{color:currentColor}.tw\\:text-destructive{color:var(--destructive)}.tw\\:text-foreground{color:var(--foreground)}.tw\\:text-foreground\\!{color:var(--foreground)!important}.tw\\:text-foreground\\/30{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/30{color:color-mix(in oklab, var(--foreground) 30%, transparent)}}.tw\\:text-foreground\\/50{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/50{color:color-mix(in oklab, var(--foreground) 50%, transparent)}}.tw\\:text-foreground\\/60{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/60{color:color-mix(in oklab, var(--foreground) 60%, transparent)}}.tw\\:text-foreground\\/70{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/70{color:color-mix(in oklab, var(--foreground) 70%, transparent)}}.tw\\:text-gray-300{color:var(--tw-color-gray-300)}.tw\\:text-gray-500{color:var(--tw-color-gray-500)}.tw\\:text-gray-600{color:var(--tw-color-gray-600)}.tw\\:text-gray-700{color:var(--tw-color-gray-700)}.tw\\:text-gray-800{color:var(--tw-color-gray-800)}.tw\\:text-green-600{color:var(--tw-color-green-600)}.tw\\:text-green-700{color:var(--tw-color-green-700)}.tw\\:text-green-800{color:var(--tw-color-green-800)}.tw\\:text-inherit{color:inherit}.tw\\:text-muted-foreground,.tw\\:text-muted-foreground\\/50{color:var(--muted-foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-muted-foreground\\/50{color:color-mix(in oklab, var(--muted-foreground) 50%, transparent)}}.tw\\:text-orange-800{color:var(--tw-color-orange-800)}.tw\\:text-popover-foreground{color:var(--popover-foreground)}.tw\\:text-primary{color:var(--primary)}.tw\\:text-primary-foreground{color:var(--primary-foreground)}.tw\\:text-purple-900{color:var(--tw-color-purple-900)}.tw\\:text-red-500{color:var(--tw-color-red-500)}.tw\\:text-red-600{color:var(--tw-color-red-600)}.tw\\:text-red-700{color:var(--tw-color-red-700)}.tw\\:text-red-800{color:var(--tw-color-red-800)}.tw\\:text-rose-600{color:var(--tw-color-rose-600)}.tw\\:text-secondary-foreground{color:var(--secondary-foreground)}.tw\\:text-sidebar-accent-foreground{color:var(--sidebar-accent-foreground)}.tw\\:text-sidebar-foreground,.tw\\:text-sidebar-foreground\\/70{color:var(--sidebar-foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-sidebar-foreground\\/70{color:color-mix(in oklab, var(--sidebar-foreground) 70%, transparent)}}.tw\\:text-sky-600{color:var(--tw-color-sky-600)}.tw\\:text-slate-900{color:var(--tw-color-slate-900)}.tw\\:text-teal-600{color:var(--tw-color-teal-600)}.tw\\:text-white{color:var(--tw-color-white)}.tw\\:text-yellow-400{color:var(--tw-color-yellow-400)}.tw\\:text-yellow-600{color:var(--tw-color-yellow-600)}.tw\\:text-yellow-700{color:var(--tw-color-yellow-700)}.tw\\:capitalize{text-transform:capitalize}.tw\\:uppercase{text-transform:uppercase}.tw\\:italic{font-style:italic}.tw\\:tabular-nums{--tw-numeric-spacing:tabular-nums;font-variant-numeric:var(--tw-ordinal,) var(--tw-slashed-zero,) var(--tw-numeric-figure,) var(--tw-numeric-spacing,) var(--tw-numeric-fraction,)}.tw\\:line-through{text-decoration-line:line-through}.tw\\:underline{text-decoration-line:underline}.tw\\:underline-offset-4{text-underline-offset:4px}.tw\\:opacity-0{opacity:0}.tw\\:opacity-40{opacity:.4}.tw\\:opacity-50{opacity:.5}.tw\\:opacity-60{opacity:.6}.tw\\:opacity-100{opacity:1}.tw\\:bg-blend-color{background-blend-mode:color}.tw\\:shadow{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-\\[0_0_0_1px_var\\(--sidebar-border\\)\\]{--tw-shadow:0 0 0 1px var(--tw-shadow-color,var(--sidebar-border));box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-lg{--tw-shadow:0 10px 15px -3px var(--tw-shadow-color,#0000001a), 0 4px 6px -4px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-md{--tw-shadow:0 4px 6px -1px var(--tw-shadow-color,#0000001a), 0 2px 4px -2px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-none{--tw-shadow:0 0 #0000;box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-none\\!{--tw-shadow:0 0 #0000!important;box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)!important}.tw\\:shadow-sm{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-xl{--tw-shadow:0 20px 25px -5px var(--tw-shadow-color,#0000001a), 0 8px 10px -6px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-0{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-1{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-2{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-background{--tw-ring-color:var(--background)}.tw\\:ring-foreground\\/10{--tw-ring-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:ring-foreground\\/10{--tw-ring-color:color-mix(in oklab, var(--foreground) 10%, transparent)}}.tw\\:ring-primary{--tw-ring-color:var(--primary)}.tw\\:ring-ring\\/50{--tw-ring-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.tw\\:ring-ring\\/50{--tw-ring-color:color-mix(in oklab, var(--ring) 50%, transparent)}}.tw\\:ring-sidebar-ring{--tw-ring-color:var(--sidebar-ring)}.tw\\:ring-offset-2{--tw-ring-offset-width:2px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}.tw\\:ring-offset-background{--tw-ring-offset-color:var(--background)}.tw\\:ring-offset-white{--tw-ring-offset-color:var(--tw-color-white)}.tw\\:outline-hidden{--tw-outline-style:none;outline-style:none}@media (forced-colors:active){.tw\\:outline-hidden{outline-offset:2px;outline:2px solid #0000}}.tw\\:drop-shadow-sm{--tw-drop-shadow-size:drop-shadow(0 1px 2px var(--tw-drop-shadow-color,#00000026));--tw-drop-shadow:drop-shadow(var(--tw-drop-shadow-sm));filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.tw\\:transition{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to,opacity,box-shadow,transform,translate,scale,rotate,filter,-webkit-backdrop-filter,backdrop-filter,display,content-visibility,overlay,pointer-events;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[color\\,box-shadow\\]{transition-property:color,box-shadow;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[left\\,right\\,width\\]{transition-property:left,right,width;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[margin\\,opacity\\]{transition-property:margin,opacity;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[width\\,height\\,padding\\]{transition-property:width,height,padding;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[width\\]{transition-property:width;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-all{transition-property:all;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-colors{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-opacity{transition-property:opacity;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-transform{transition-property:transform,translate,scale,rotate;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-none{transition-property:none}.tw\\:duration-100{--tw-duration:.1s;transition-duration:.1s}.tw\\:duration-200{--tw-duration:.2s;transition-duration:.2s}.tw\\:ease-linear{--tw-ease:linear;transition-timing-function:linear}.tw\\:prose-quoteless :where(blockquote p:first-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):before,.tw\\:prose-quoteless :where(blockquote p:last-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:none}.tw\\:outline-none{--tw-outline-style:none;outline-style:none}.tw\\:select-none{-webkit-user-select:none;user-select:none}.tw\\:\\[unicode-bidi\\:plaintext\\]{unicode-bidi:plaintext}.tw\\:group-focus-within\\/menu-item\\:opacity-100:is(:where(.tw\\:group\\/menu-item):focus-within *){opacity:1}@media (hover:hover){.tw\\:group-hover\\:visible:is(:where(.tw\\:group):hover *){visibility:visible}.tw\\:group-hover\\:hidden:is(:where(.tw\\:group):hover *){display:none}.tw\\:group-hover\\:opacity-100:is(:where(.tw\\:group):hover *),.tw\\:group-hover\\/menu-item\\:opacity-100:is(:where(.tw\\:group\\/menu-item):hover *){opacity:1}}.tw\\:group-focus\\/context-menu-item\\:text-accent-foreground:is(:where(.tw\\:group\\/context-menu-item):focus *),.tw\\:group-focus\\/dropdown-menu-item\\:text-accent-foreground:is(:where(.tw\\:group\\/dropdown-menu-item):focus *),.tw\\:group-focus\\/menubar-item\\:text-accent-foreground:is(:where(.tw\\:group\\/menubar-item):focus *){color:var(--accent-foreground)}.tw\\:group-has-disabled\\/field\\:opacity-50:is(:where(.tw\\:group\\/field):has(:disabled) *){opacity:.5}.tw\\:group-has-data-\\[sidebar\\=menu-action\\]\\/menu-item\\:pe-8:is(:where(.tw\\:group\\/menu-item):has([data-sidebar=menu-action]) *){padding-inline-end:calc(calc(var(--spacing)) * 8)}.tw\\:group-has-data-\\[size\\=lg\\]\\/avatar-group\\:size-10:is(:where(.tw\\:group\\/avatar-group):has([data-size=lg]) *){width:calc(calc(var(--spacing)) * 10);height:calc(calc(var(--spacing)) * 10)}.tw\\:group-has-data-\\[size\\=sm\\]\\/avatar-group\\:size-6:is(:where(.tw\\:group\\/avatar-group):has([data-size=sm]) *){width:calc(calc(var(--spacing)) * 6);height:calc(calc(var(--spacing)) * 6)}.tw\\:group-has-data-\\[slot\\=command-shortcut\\]\\/command-item\\:hidden:is(:where(.tw\\:group\\/command-item):has([data-slot=command-shortcut]) *){display:none}.tw\\:group-has-\\[\\>input\\]\\/input-group\\:pt-2:is(:where(.tw\\:group\\/input-group):has(>input) *){padding-top:calc(calc(var(--spacing)) * 2)}.tw\\:group-has-\\[\\>input\\]\\/input-group\\:pb-2:is(:where(.tw\\:group\\/input-group):has(>input) *){padding-bottom:calc(calc(var(--spacing)) * 2)}.tw\\:group-has-\\[\\>svg\\]\\/alert\\:col-start-2:is(:where(.tw\\:group\\/alert):has(>svg) *){grid-column-start:2}.tw\\:group-data-\\[checked\\=true\\]\\/command-item\\:opacity-100:is(:where(.tw\\:group\\/command-item)[data-checked=true] *){opacity:1}.tw\\:group-data-\\[collapsible\\=icon\\]\\:-mt-8:is(:where(.tw\\:group)[data-collapsible=icon] *){margin-top:calc(calc(var(--spacing)) * -8)}.tw\\:group-data-\\[collapsible\\=icon\\]\\:hidden:is(:where(.tw\\:group)[data-collapsible=icon] *){display:none}.tw\\:group-data-\\[collapsible\\=icon\\]\\:size-8\\!:is(:where(.tw\\:group)[data-collapsible=icon] *){width:calc(calc(var(--spacing)) * 8)!important;height:calc(calc(var(--spacing)) * 8)!important}.tw\\:group-data-\\[collapsible\\=icon\\]\\:w-\\(--sidebar-width-icon\\):is(:where(.tw\\:group)[data-collapsible=icon] *){width:var(--sidebar-width-icon)}.tw\\:group-data-\\[collapsible\\=icon\\]\\:w-\\[calc\\(var\\(--sidebar-width-icon\\)\\+\\(--spacing\\(4\\)\\)\\)\\]:is(:where(.tw\\:group)[data-collapsible=icon] *){width:calc(var(--sidebar-width-icon) + (calc(calc(var(--spacing)) * 4)))}.tw\\:group-data-\\[collapsible\\=icon\\]\\:w-\\[calc\\(var\\(--sidebar-width-icon\\)\\+\\(--spacing\\(4\\)\\)\\+2px\\)\\]:is(:where(.tw\\:group)[data-collapsible=icon] *){width:calc(var(--sidebar-width-icon) + (calc(calc(var(--spacing)) * 4)) + 2px)}.tw\\:group-data-\\[collapsible\\=icon\\]\\:overflow-hidden:is(:where(.tw\\:group)[data-collapsible=icon] *){overflow:hidden}.tw\\:group-data-\\[collapsible\\=icon\\]\\:p-0\\!:is(:where(.tw\\:group)[data-collapsible=icon] *){padding:calc(calc(var(--spacing)) * 0)!important}.tw\\:group-data-\\[collapsible\\=icon\\]\\:p-2\\!:is(:where(.tw\\:group)[data-collapsible=icon] *){padding:calc(calc(var(--spacing)) * 2)!important}.tw\\:group-data-\\[collapsible\\=icon\\]\\:opacity-0:is(:where(.tw\\:group)[data-collapsible=icon] *){opacity:0}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:right-\\[calc\\(var\\(--sidebar-width\\)\\*-1\\)\\]:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){right:calc(var(--sidebar-width) * -1)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:left-\\[calc\\(var\\(--sidebar-width\\)\\*-1\\)\\]:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){left:calc(var(--sidebar-width) * -1)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:w-0:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){width:calc(calc(var(--spacing)) * 0)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:translate-x-0:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){--tw-translate-x:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:group-data-\\[disabled\\=true\\]\\:pointer-events-none:is(:where(.tw\\:group)[data-disabled=true] *){pointer-events:none}.tw\\:group-data-\\[disabled\\=true\\]\\:opacity-50:is(:where(.tw\\:group)[data-disabled=true] *),.tw\\:group-data-\\[disabled\\=true\\]\\/input-group\\:opacity-50:is(:where(.tw\\:group\\/input-group)[data-disabled=true] *){opacity:.5}.tw\\:group-data-\\[side\\=primary\\]\\:-right-4:is(:where(.tw\\:group)[data-side=primary] *){right:calc(calc(var(--spacing)) * -4)}.tw\\:group-data-\\[side\\=primary\\]\\:border-e:is(:where(.tw\\:group)[data-side=primary] *){border-inline-end-style:var(--tw-border-style);border-inline-end-width:1px}.tw\\:group-data-\\[side\\=secondary\\]\\:left-0:is(:where(.tw\\:group)[data-side=secondary] *){left:calc(calc(var(--spacing)) * 0)}.tw\\:group-data-\\[side\\=secondary\\]\\:rotate-180:is(:where(.tw\\:group)[data-side=secondary] *){rotate:180deg}.tw\\:group-data-\\[side\\=secondary\\]\\:border-s:is(:where(.tw\\:group)[data-side=secondary] *){border-inline-start-style:var(--tw-border-style);border-inline-start-width:1px}.tw\\:group-data-\\[size\\=default\\]\\/avatar\\:size-2\\.5:is(:where(.tw\\:group\\/avatar)[data-size=default] *){width:calc(calc(var(--spacing)) * 2.5);height:calc(calc(var(--spacing)) * 2.5)}.tw\\:group-data-\\[size\\=default\\]\\/switch\\:size-4:is(:where(.tw\\:group\\/switch)[data-size=default] *){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[size\\=lg\\]\\/avatar\\:size-3:is(:where(.tw\\:group\\/avatar)[data-size=lg] *){width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[size\\=sm\\]\\/avatar\\:size-2:is(:where(.tw\\:group\\/avatar)[data-size=sm] *){width:calc(calc(var(--spacing)) * 2);height:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[size\\=sm\\]\\/avatar\\:text-xs:is(:where(.tw\\:group\\/avatar)[data-size=sm] *){font-size:var(--tw-text-xs);line-height:var(--tw-leading,var(--tw-text-xs--line-height))}.tw\\:group-data-\\[size\\=sm\\]\\/card\\:p-3:is(:where(.tw\\:group\\/card)[data-size=sm] *){padding:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[size\\=sm\\]\\/card\\:px-3:is(:where(.tw\\:group\\/card)[data-size=sm] *){padding-inline:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[size\\=sm\\]\\/card\\:text-sm:is(:where(.tw\\:group\\/card)[data-size=sm] *){font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:size-3:is(:where(.tw\\:group\\/switch)[data-size=sm] *){width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[spacing\\=0\\]\\/toggle-group\\:rounded-none:is(:where(.tw\\:group\\/toggle-group)[data-spacing="0"] *){border-radius:0}.tw\\:group-data-\\[spacing\\=0\\]\\/toggle-group\\:px-2:is(:where(.tw\\:group\\/toggle-group)[data-spacing="0"] *){padding-inline:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[variant\\=floating\\]\\:rounded-lg:is(:where(.tw\\:group)[data-variant=floating] *){border-radius:var(--radius)}.tw\\:group-data-\\[variant\\=floating\\]\\:shadow-sm:is(:where(.tw\\:group)[data-variant=floating] *){--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:group-data-\\[variant\\=floating\\]\\:ring-1:is(:where(.tw\\:group)[data-variant=floating] *){--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:group-data-\\[variant\\=floating\\]\\:ring-sidebar-border:is(:where(.tw\\:group)[data-variant=floating] *){--tw-ring-color:var(--sidebar-border)}.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:bg-transparent:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *){background-color:#0000}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:mx-auto:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){margin-inline:auto}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:mt-4:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){margin-top:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:block:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){display:block}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:h-1\\.5:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){height:calc(calc(var(--spacing)) * 1.5)}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:w-\\[100px\\]:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){width:100px}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:text-center:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){text-align:center}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:my-auto:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){margin-block:auto}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:me-4:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){margin-inline-end:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:block:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){display:block}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:h-\\[100px\\]:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){height:100px}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:w-1\\.5:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){width:calc(calc(var(--spacing)) * 1.5)}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:my-auto:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){margin-block:auto}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:ms-4:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){margin-inline-start:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:block:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){display:block}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:h-\\[100px\\]:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){height:100px}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:w-1\\.5:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){width:calc(calc(var(--spacing)) * 1.5)}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:mx-auto:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){margin-inline:auto}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:mb-4:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){margin-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:block:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){display:block}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:h-1\\.5:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){height:calc(calc(var(--spacing)) * 1.5)}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:w-\\[100px\\]:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){width:100px}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:text-center:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){text-align:center}.tw\\:group-data-selected\\/command-item\\:text-foreground:is(:where(.tw\\:group\\/command-item):where([data-selected=true]) *){color:var(--foreground)}.tw\\:group-data-horizontal\\/tabs\\:h-8:is(:where(.tw\\:group\\/tabs):where([data-orientation=horizontal]) *){height:calc(calc(var(--spacing)) * 8)}.tw\\:group-data-vertical\\/tabs\\:h-fit:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *){height:fit-content}.tw\\:group-data-vertical\\/tabs\\:w-full:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *){width:100%}.tw\\:group-data-vertical\\/tabs\\:flex-col:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *){flex-direction:column}.tw\\:group-data-vertical\\/tabs\\:justify-start:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *){justify-content:flex-start}@media (hover:hover){.tw\\:peer-hover\\/menu-button\\:text-sidebar-accent-foreground:is(:where(.tw\\:peer\\/menu-button):hover~*){color:var(--sidebar-accent-foreground)}.tw\\:peer-focus\\:group-hover\\:text-blue-500:is(:where(.tw\\:peer):focus~*):is(:where(.tw\\:group):hover *){color:var(--tw-color-blue-500)}}.tw\\:peer-disabled\\:cursor-not-allowed:is(:where(.tw\\:peer):disabled~*){cursor:not-allowed}.tw\\:peer-disabled\\:opacity-50:is(:where(.tw\\:peer):disabled~*){opacity:.5}.tw\\:peer-data-\\[size\\=default\\]\\/menu-button\\:top-1\\.5:is(:where(.tw\\:peer\\/menu-button)[data-size=default]~*){top:calc(calc(var(--spacing)) * 1.5)}.tw\\:peer-data-\\[size\\=lg\\]\\/menu-button\\:top-2\\.5:is(:where(.tw\\:peer\\/menu-button)[data-size=lg]~*){top:calc(calc(var(--spacing)) * 2.5)}.tw\\:peer-data-\\[size\\=sm\\]\\/menu-button\\:top-1:is(:where(.tw\\:peer\\/menu-button)[data-size=sm]~*){top:calc(calc(var(--spacing)) * 1)}.tw\\:peer-data-active\\/menu-button\\:text-sidebar-accent-foreground:is(:is(:where(.tw\\:peer\\/menu-button):where([data-state=active]),:where(.tw\\:peer\\/menu-button):where([data-active]:not([data-active=false])))~*){color:var(--sidebar-accent-foreground)}.tw\\:file\\:inline-flex::file-selector-button{display:inline-flex}.tw\\:file\\:h-6::file-selector-button{height:calc(calc(var(--spacing)) * 6)}.tw\\:file\\:border-0::file-selector-button{border-style:var(--tw-border-style);border-width:0}.tw\\:file\\:bg-transparent::file-selector-button{background-color:#0000}.tw\\:file\\:text-sm::file-selector-button{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:file\\:font-medium::file-selector-button{--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}.tw\\:file\\:text-foreground::file-selector-button{color:var(--foreground)}.tw\\:placeholder\\:text-muted-foreground::placeholder{color:var(--muted-foreground)}.tw\\:placeholder\\:text-slate-400::placeholder{color:var(--tw-color-slate-400)}.tw\\:before\\:absolute:before{content:var(--tw-content);position:absolute}.tw\\:before\\:top-0\\.5:before{content:var(--tw-content);top:calc(calc(var(--spacing)) * .5)}.tw\\:before\\:left-0:before{content:var(--tw-content);left:calc(calc(var(--spacing)) * 0)}.tw\\:before\\:block:before{content:var(--tw-content);display:block}.tw\\:before\\:hidden:before{content:var(--tw-content);display:none}.tw\\:before\\:h-4:before{content:var(--tw-content);height:calc(calc(var(--spacing)) * 4)}.tw\\:before\\:w-4:before{content:var(--tw-content);width:calc(calc(var(--spacing)) * 4)}.tw\\:before\\:cursor-pointer:before{content:var(--tw-content);cursor:pointer}.tw\\:before\\:rounded:before{content:var(--tw-content);border-radius:.25rem}.tw\\:before\\:border:before{content:var(--tw-content);border-style:var(--tw-border-style);border-width:1px}.tw\\:before\\:border-primary:before{content:var(--tw-content);border-color:var(--primary)}.tw\\:before\\:bg-primary:before{content:var(--tw-content);background-color:var(--primary)}.tw\\:before\\:bg-cover:before{content:var(--tw-content);background-size:cover}.tw\\:before\\:bg-no-repeat:before{content:var(--tw-content);background-repeat:no-repeat}.tw\\:before\\:content-\\[\\"\\"\\]:before{--tw-content:"";content:var(--tw-content)}.tw\\:before\\:content-\\[\\\\\\"\\\\\\"\\]:before{--tw-content:\\"\\";content:var(--tw-content)}.tw\\:after\\:absolute:after{content:var(--tw-content);position:absolute}.tw\\:after\\:-inset-2:after{content:var(--tw-content);inset:calc(calc(var(--spacing)) * -2)}.tw\\:after\\:inset-0:after{content:var(--tw-content);inset:calc(calc(var(--spacing)) * 0)}.tw\\:after\\:-inset-x-3:after{content:var(--tw-content);inset-inline:calc(calc(var(--spacing)) * -3)}.tw\\:after\\:-inset-y-2:after{content:var(--tw-content);inset-block:calc(calc(var(--spacing)) * -2)}.tw\\:after\\:inset-y-0:after{content:var(--tw-content);inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:after\\:start-1\\/2:after{content:var(--tw-content);inset-inline-start:50%}.tw\\:after\\:top-\\[6px\\]:after{content:var(--tw-content);top:6px}.tw\\:after\\:right-\\[7px\\]:after{content:var(--tw-content);right:7px}.tw\\:after\\:left-\\[7px\\]:after{content:var(--tw-content);left:7px}.tw\\:after\\:block:after{content:var(--tw-content);display:block}.tw\\:after\\:hidden:after{content:var(--tw-content);display:none}.tw\\:after\\:h-0\\.5:after{content:var(--tw-content);height:calc(calc(var(--spacing)) * .5)}.tw\\:after\\:h-\\[6px\\]:after{content:var(--tw-content);height:6px}.tw\\:after\\:w-1:after{content:var(--tw-content);width:calc(calc(var(--spacing)) * 1)}.tw\\:after\\:w-\\[2px\\]:after{content:var(--tw-content);width:2px}.tw\\:after\\:w-\\[3px\\]:after{content:var(--tw-content);width:3px}.tw\\:after\\:-translate-x-1\\/2:after{content:var(--tw-content);--tw-translate-x:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:after\\:rotate-45:after{content:var(--tw-content);rotate:45deg}.tw\\:after\\:cursor-pointer:after{content:var(--tw-content);cursor:pointer}.tw\\:after\\:rounded-full:after{content:var(--tw-content);border-radius:3.40282e38px}.tw\\:after\\:border:after{content:var(--tw-content);border-style:var(--tw-border-style);border-width:1px}.tw\\:after\\:border-t-0:after{content:var(--tw-content);border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:after\\:border-r-2:after{content:var(--tw-content);border-right-style:var(--tw-border-style);border-right-width:2px}.tw\\:after\\:border-b-2:after{content:var(--tw-content);border-bottom-style:var(--tw-border-style);border-bottom-width:2px}.tw\\:after\\:border-l-0:after{content:var(--tw-content);border-left-style:var(--tw-border-style);border-left-width:0}.tw\\:after\\:border-solid:after{content:var(--tw-content);--tw-border-style:solid;border-style:solid}.tw\\:after\\:border-border:after{content:var(--tw-content);border-color:var(--border)}.tw\\:after\\:border-white:after{content:var(--tw-content);border-color:var(--tw-color-white)}.tw\\:after\\:bg-foreground:after{content:var(--tw-content);background-color:var(--foreground)}.tw\\:after\\:bg-muted:after{content:var(--tw-content);background-color:var(--muted)}.tw\\:after\\:opacity-0:after{content:var(--tw-content);opacity:0}.tw\\:after\\:mix-blend-darken:after{content:var(--tw-content);mix-blend-mode:darken}.tw\\:after\\:transition-opacity:after{content:var(--tw-content);transition-property:opacity;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:after\\:content-\\[\\"\\"\\]:after{--tw-content:"";content:var(--tw-content)}.tw\\:after\\:content-\\[\\\\\\"\\\\\\"\\]:after{--tw-content:\\"\\";content:var(--tw-content)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:after\\:start-full:is(:where(.tw\\:group)[data-collapsible=offcanvas] *):after{content:var(--tw-content);inset-inline-start:100%}.tw\\:group-data-horizontal\\/tabs\\:after\\:inset-x-0:is(:where(.tw\\:group\\/tabs):where([data-orientation=horizontal]) *):after{content:var(--tw-content);inset-inline:calc(calc(var(--spacing)) * 0)}.tw\\:group-data-horizontal\\/tabs\\:after\\:bottom-\\[-5px\\]:is(:where(.tw\\:group\\/tabs):where([data-orientation=horizontal]) *):after{content:var(--tw-content);bottom:-5px}.tw\\:group-data-horizontal\\/tabs\\:after\\:h-0\\.5:is(:where(.tw\\:group\\/tabs):where([data-orientation=horizontal]) *):after{content:var(--tw-content);height:calc(calc(var(--spacing)) * .5)}.tw\\:group-data-vertical\\/tabs\\:after\\:inset-y-0:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *):after{content:var(--tw-content);inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:group-data-vertical\\/tabs\\:after\\:-end-1:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *):after{content:var(--tw-content);inset-inline-end:calc(calc(var(--spacing)) * -1)}.tw\\:group-data-vertical\\/tabs\\:after\\:w-0\\.5:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *):after{content:var(--tw-content);width:calc(calc(var(--spacing)) * .5)}.tw\\:first\\:mt-0:first-child{margin-top:calc(calc(var(--spacing)) * 0)}.tw\\:last\\:border-b-0:last-child{border-bottom-style:var(--tw-border-style);border-bottom-width:0}.tw\\:even\\:bg-muted:nth-child(2n){background-color:var(--muted)}.tw\\:focus-within\\:ring-2:focus-within{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-within\\:ring-ring:focus-within{--tw-ring-color:var(--ring)}.tw\\:focus-within\\:ring-offset-1:focus-within{--tw-ring-offset-width:1px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}@media (hover:hover){.tw\\:hover\\:-mt-4:hover{margin-top:calc(calc(var(--spacing)) * -4)}.tw\\:hover\\:cursor-pointer:hover{cursor:pointer}.tw\\:hover\\:bg-accent:hover,.tw\\:hover\\:bg-accent\\/30:hover{background-color:var(--accent)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-accent\\/30:hover{background-color:color-mix(in oklab, var(--accent) 30%, transparent)}}.tw\\:hover\\:bg-accent\\/80:hover{background-color:var(--accent)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-accent\\/80:hover{background-color:color-mix(in oklab, var(--accent) 80%, transparent)}}.tw\\:hover\\:bg-blue-600:hover{background-color:var(--tw-color-blue-600)}.tw\\:hover\\:bg-destructive\\/20:hover{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-destructive\\/20:hover{background-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:hover\\:bg-gray-50:hover{background-color:var(--tw-color-gray-50)}.tw\\:hover\\:bg-input:hover{background-color:var(--input)}.tw\\:hover\\:bg-muted:hover,.tw\\:hover\\:bg-muted\\/50:hover{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-muted\\/50:hover{background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:hover\\:bg-muted\\/80:hover{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-muted\\/80:hover{background-color:color-mix(in oklab, var(--muted) 80%, transparent)}}.tw\\:hover\\:bg-primary\\/10:hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-primary\\/10:hover{background-color:color-mix(in oklab, var(--primary) 10%, transparent)}}.tw\\:hover\\:bg-primary\\/70:hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-primary\\/70:hover{background-color:color-mix(in oklab, var(--primary) 70%, transparent)}}.tw\\:hover\\:bg-primary\\/90:hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-primary\\/90:hover{background-color:color-mix(in oklab, var(--primary) 90%, transparent)}}.tw\\:hover\\:bg-red-500:hover{background-color:var(--tw-color-red-500)}.tw\\:hover\\:bg-secondary:hover,.tw\\:hover\\:bg-secondary\\/80:hover{background-color:var(--secondary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-secondary\\/80:hover{background-color:color-mix(in oklab, var(--secondary) 80%, transparent)}}.tw\\:hover\\:bg-sidebar-accent:hover{background-color:var(--sidebar-accent)}.tw\\:hover\\:bg-transparent:hover{background-color:#0000}.tw\\:hover\\:text-foreground:hover{color:var(--foreground)}.tw\\:hover\\:text-muted-foreground:hover{color:var(--muted-foreground)}.tw\\:hover\\:text-primary-foreground:hover{color:var(--primary-foreground)}.tw\\:hover\\:text-sidebar-accent-foreground:hover{color:var(--sidebar-accent-foreground)}.tw\\:hover\\:underline:hover{text-decoration-line:underline}.tw\\:hover\\:opacity-80:hover{opacity:.8}.tw\\:hover\\:opacity-100:hover{opacity:1}.tw\\:hover\\:shadow-\\[0_0_0_1px_var\\(--sidebar-accent\\)\\]:hover{--tw-shadow:0 0 0 1px var(--tw-shadow-color,var(--sidebar-accent));box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:hover\\:shadow-md:hover{--tw-shadow:0 4px 6px -1px var(--tw-shadow-color,#0000001a), 0 2px 4px -2px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:hover\\:ring-3:hover{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:hover\\:group-data-\\[collapsible\\=offcanvas\\]\\:bg-sidebar:hover:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){background-color:var(--sidebar)}.tw\\:hover\\:after\\:bg-sidebar-border:hover:after{content:var(--tw-content);background-color:var(--sidebar-border)}}.tw\\:focus\\:relative:focus{position:relative}.tw\\:focus\\:z-10:focus{z-index:10}.tw\\:focus\\:bg-accent:focus{background-color:var(--accent)}.tw\\:focus\\:bg-muted:focus{background-color:var(--muted)}.tw\\:focus\\:text-accent-foreground:focus{color:var(--accent-foreground)}.tw\\:focus\\:text-foreground:focus{color:var(--foreground)}.tw\\:focus\\:ring-2:focus{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus\\:ring-ring:focus{--tw-ring-color:var(--ring)}.tw\\:focus\\:ring-offset-1:focus{--tw-ring-offset-width:1px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}.tw\\:focus\\:ring-offset-background:focus{--tw-ring-offset-color:var(--background)}.tw\\:focus\\:outline-hidden:focus{--tw-outline-style:none;outline-style:none}@media (forced-colors:active){.tw\\:focus\\:outline-hidden:focus{outline-offset:2px;outline:2px solid #0000}}:is(.tw\\:focus\\:\\*\\*\\:text-accent-foreground:focus *),:is(.tw\\:not-data-\\[variant\\=destructive\\]\\:focus\\:\\*\\*\\:text-accent-foreground:not([data-variant=destructive]):focus *){color:var(--accent-foreground)}.tw\\:focus-visible\\:z-10:focus-visible{z-index:10}.tw\\:focus-visible\\:border-destructive\\/40:focus-visible{border-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:focus-visible\\:border-destructive\\/40:focus-visible{border-color:color-mix(in oklab, var(--destructive) 40%, transparent)}}.tw\\:focus-visible\\:border-ring:focus-visible{border-color:var(--ring)}.tw\\:focus-visible\\:ring-0:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-visible\\:ring-1:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-visible\\:ring-2:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-visible\\:ring-3:focus-visible,.tw\\:focus-visible\\:ring-\\[3px\\]:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-visible\\:ring-\\[color\\:hsl\\(240\\,5\\%\\,64\\.9\\%\\)\\]:focus-visible{--tw-ring-color:#a1a1aa}.tw\\:focus-visible\\:ring-destructive\\/20:focus-visible{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:focus-visible\\:ring-destructive\\/20:focus-visible{--tw-ring-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:focus-visible\\:ring-ring:focus-visible,.tw\\:focus-visible\\:ring-ring\\/50:focus-visible{--tw-ring-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.tw\\:focus-visible\\:ring-ring\\/50:focus-visible{--tw-ring-color:color-mix(in oklab, var(--ring) 50%, transparent)}}.tw\\:focus-visible\\:ring-slate-400:focus-visible{--tw-ring-color:var(--tw-color-slate-400)}.tw\\:focus-visible\\:ring-offset-2:focus-visible{--tw-ring-offset-width:2px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}.tw\\:focus-visible\\:outline-hidden:focus-visible{--tw-outline-style:none;outline-style:none}@media (forced-colors:active){.tw\\:focus-visible\\:outline-hidden:focus-visible{outline-offset:2px;outline:2px solid #0000}}.tw\\:focus-visible\\:outline-1:focus-visible{outline-style:var(--tw-outline-style);outline-width:1px}.tw\\:focus-visible\\:outline-ring:focus-visible{outline-color:var(--ring)}.tw\\:focus-visible\\:outline-none:focus-visible{--tw-outline-style:none;outline-style:none}.tw\\:focus-visible\\:ring-inset:focus-visible{--tw-ring-inset:inset}:is(.tw\\:\\*\\:focus-visible\\:relative>*):focus-visible{position:relative}:is(.tw\\:\\*\\:focus-visible\\:z-10>*):focus-visible{z-index:10}.tw\\:active\\:bg-sidebar-accent:active{background-color:var(--sidebar-accent)}.tw\\:active\\:text-sidebar-accent-foreground:active{color:var(--sidebar-accent-foreground)}.tw\\:active\\:ring-3:active{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:active\\:not-aria-\\[haspopup\\]\\:translate-y-px:active:not([aria-haspopup]){--tw-translate-y:1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:active\\:not-aria-\\[haspopup\\]\\:transform-\\[translateY\\(1px\\)\\]:active:not([aria-haspopup]){transform:translateY(1px)}.tw\\:disabled\\:pointer-events-none:disabled{pointer-events:none}.tw\\:disabled\\:cursor-not-allowed:disabled{cursor:not-allowed}.tw\\:disabled\\:bg-input\\/50:disabled{background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:disabled\\:bg-input\\/50:disabled{background-color:color-mix(in oklab, var(--input) 50%, transparent)}}.tw\\:disabled\\:bg-transparent:disabled{background-color:#0000}.tw\\:disabled\\:opacity-50:disabled{opacity:.5}:where([data-side=bottom]) .tw\\:in-data-\\[side\\=bottom\\]\\:translate-y-\\[calc\\(-50\\%-1px\\)\\]{--tw-translate-y:calc(-50% - 1px);translate:var(--tw-translate-x) var(--tw-translate-y)}:where([data-side=bottom]) .tw\\:in-data-\\[side\\=bottom\\]\\:\\[clip-path\\:polygon\\(100\\%_0\\,100\\%_100\\%\\,0_100\\%\\)\\]{clip-path:polygon(100% 0,100% 100%,0 100%)}:where([data-side=primary]) .tw\\:in-data-\\[side\\=primary\\]\\:cursor-w-resize{cursor:w-resize}:where([data-side=secondary]) .tw\\:in-data-\\[side\\=secondary\\]\\:cursor-e-resize{cursor:e-resize}:where([data-side=top]) .tw\\:in-data-\\[side\\=top\\]\\:translate-y-\\[calc\\(-50\\%-1px\\)\\]{--tw-translate-y:calc(-50% - 1px);translate:var(--tw-translate-x) var(--tw-translate-y)}:where([data-side=top]) .tw\\:in-data-\\[side\\=top\\]\\:\\[clip-path\\:polygon\\(100\\%_0\\,100\\%_100\\%\\,0_100\\%\\)\\]{clip-path:polygon(100% 0,100% 100%,0 100%)}:where([data-slot=button-group]) .tw\\:in-data-\\[slot\\=button-group\\]\\:rounded-lg{border-radius:var(--radius)}:where([data-slot=combobox-content]) .tw\\:in-data-\\[slot\\=combobox-content\\]\\:focus-within\\:border-inherit:focus-within{border-color:inherit}:where([data-slot=combobox-content]) .tw\\:in-data-\\[slot\\=combobox-content\\]\\:focus-within\\:ring-0:focus-within{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}:where([data-slot=dialog-content]) .tw\\:in-data-\\[slot\\=dialog-content\\]\\:rounded-lg\\!{border-radius:var(--radius)!important}:where([data-slot=tooltip-content]) .tw\\:in-data-\\[slot\\=tooltip-content\\]\\:bg-background\\/20{background-color:var(--background)}@supports (color:color-mix(in lab, red, red)){:where([data-slot=tooltip-content]) .tw\\:in-data-\\[slot\\=tooltip-content\\]\\:bg-background\\/20{background-color:color-mix(in oklab, var(--background) 20%, transparent)}}:where([data-slot=tooltip-content]) .tw\\:in-data-\\[slot\\=tooltip-content\\]\\:text-background{color:var(--background)}:where([data-slot=tooltip-content]) .tw\\:in-data-\\[slot\\=tooltip-content\\]\\:text-destructive{color:var(--destructive)}.tw\\:has-disabled\\:bg-input\\/50:has(:disabled){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:has-disabled\\:bg-input\\/50:has(:disabled){background-color:color-mix(in oklab, var(--input) 50%, transparent)}}.tw\\:has-disabled\\:opacity-50:has(:disabled){opacity:.5}.tw\\:has-aria-expanded\\:bg-muted\\/50:has([aria-expanded=true]){background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:has-aria-expanded\\:bg-muted\\/50:has([aria-expanded=true]){background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:has-data-\\[icon\\=inline-end\\]\\:pe-1:has([data-icon=inline-end]){padding-inline-end:calc(calc(var(--spacing)) * 1)}.tw\\:has-data-\\[icon\\=inline-end\\]\\:pe-1\\.5:has([data-icon=inline-end]){padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[icon\\=inline-end\\]\\:pe-2:has([data-icon=inline-end]){padding-inline-end:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[spacing\\=0\\]\\/toggle-group\\:has-data-\\[icon\\=inline-end\\]\\:pe-1\\.5:is(:where(.tw\\:group\\/toggle-group)[data-spacing="0"] *):has([data-icon=inline-end]){padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[icon\\=inline-start\\]\\:ps-1:has([data-icon=inline-start]){padding-inline-start:calc(calc(var(--spacing)) * 1)}.tw\\:has-data-\\[icon\\=inline-start\\]\\:ps-1\\.5:has([data-icon=inline-start]){padding-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[icon\\=inline-start\\]\\:ps-2:has([data-icon=inline-start]){padding-inline-start:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[spacing\\=0\\]\\/toggle-group\\:has-data-\\[icon\\=inline-start\\]\\:ps-1\\.5:is(:where(.tw\\:group\\/toggle-group)[data-spacing="0"] *):has([data-icon=inline-start]){padding-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[slot\\=alert-action\\]\\:relative:has([data-slot=alert-action]){position:relative}.tw\\:has-data-\\[slot\\=alert-action\\]\\:pe-18:has([data-slot=alert-action]){padding-inline-end:calc(calc(var(--spacing)) * 18)}.tw\\:has-data-\\[slot\\=card-action\\]\\:grid-cols-\\[1fr_auto\\]:has([data-slot=card-action]){grid-template-columns:1fr auto}.tw\\:has-data-\\[slot\\=card-description\\]\\:grid-rows-\\[auto_auto\\]:has([data-slot=card-description]){grid-template-rows:auto auto}.tw\\:has-data-\\[slot\\=card-footer\\]\\:pb-0:has([data-slot=card-footer]){padding-bottom:calc(calc(var(--spacing)) * 0)}.tw\\:has-data-\\[slot\\=kbd\\]\\:pe-0:has([data-slot=kbd]){padding-inline-end:calc(calc(var(--spacing)) * 0)}.tw\\:has-data-\\[slot\\=kbd\\]\\:pe-1\\.5:has([data-slot=kbd]){padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[variant\\=inset\\]\\:bg-sidebar:has([data-variant=inset]){background-color:var(--sidebar)}.tw\\:has-\\[\\[data-slot\\=input-group-control\\]\\:focus-visible\\]\\:border-ring:has([data-slot=input-group-control]:focus-visible){border-color:var(--ring)}.tw\\:has-\\[\\[data-slot\\=input-group-control\\]\\:focus-visible\\]\\:ring-3:has([data-slot=input-group-control]:focus-visible){--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:has-\\[\\[data-slot\\=input-group-control\\]\\:focus-visible\\]\\:ring-ring\\/50:has([data-slot=input-group-control]:focus-visible){--tw-ring-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.tw\\:has-\\[\\[data-slot\\=input-group-control\\]\\:focus-visible\\]\\:ring-ring\\/50:has([data-slot=input-group-control]:focus-visible){--tw-ring-color:color-mix(in oklab, var(--ring) 50%, transparent)}}.tw\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:border-destructive:has([data-slot][aria-invalid=true]){border-color:var(--destructive)}.tw\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-3:has([data-slot][aria-invalid=true]){--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-destructive\\/20:has([data-slot][aria-invalid=true]){--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-destructive\\/20:has([data-slot][aria-invalid=true]){--tw-ring-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:has-\\[\\>\\[data-align\\=block-end\\]\\]\\:h-auto:has(>[data-align=block-end]){height:auto}.tw\\:has-\\[\\>\\[data-align\\=block-end\\]\\]\\:flex-col:has(>[data-align=block-end]){flex-direction:column}.tw\\:has-\\[\\>\\[data-align\\=block-start\\]\\]\\:h-auto:has(>[data-align=block-start]){height:auto}.tw\\:has-\\[\\>\\[data-align\\=block-start\\]\\]\\:flex-col:has(>[data-align=block-start]){flex-direction:column}.tw\\:has-\\[\\>\\[data-slot\\=button-group\\]\\]\\:gap-2:has(>[data-slot=button-group]){gap:calc(calc(var(--spacing)) * 2)}.tw\\:has-\\[\\>button\\]\\:ms-\\[-0\\.3rem\\]:has(>button){margin-inline-start:-.3rem}.tw\\:has-\\[\\>button\\]\\:me-\\[-0\\.3rem\\]:has(>button){margin-inline-end:-.3rem}.tw\\:has-\\[\\>img\\]\\:grid-cols-\\[auto_1fr\\]:has(>img){grid-template-columns:auto 1fr}.tw\\:has-\\[\\>img\\]\\:gap-x-2:has(>img){column-gap:calc(calc(var(--spacing)) * 2)}.tw\\:has-\\[\\>img\\:first-child\\]\\:pt-0:has(>img:first-child){padding-top:calc(calc(var(--spacing)) * 0)}.tw\\:has-\\[\\>kbd\\]\\:ms-\\[-0\\.15rem\\]:has(>kbd){margin-inline-start:-.15rem}.tw\\:has-\\[\\>kbd\\]\\:me-\\[-0\\.15rem\\]:has(>kbd){margin-inline-end:-.15rem}.tw\\:has-\\[\\>svg\\]\\:grid-cols-\\[auto_1fr\\]:has(>svg){grid-template-columns:auto 1fr}.tw\\:has-\\[\\>svg\\]\\:gap-x-2:has(>svg){column-gap:calc(calc(var(--spacing)) * 2)}.tw\\:has-\\[\\>svg\\]\\:p-0:has(>svg){padding:calc(calc(var(--spacing)) * 0)}.tw\\:has-\\[\\>textarea\\]\\:h-auto:has(>textarea){height:auto}.tw\\:aria-disabled\\:pointer-events-none[aria-disabled=true]{pointer-events:none}.tw\\:aria-disabled\\:opacity-50[aria-disabled=true]{opacity:.5}.tw\\:aria-expanded\\:bg-muted[aria-expanded=true]{background-color:var(--muted)}.tw\\:aria-expanded\\:bg-secondary[aria-expanded=true]{background-color:var(--secondary)}.tw\\:aria-expanded\\:text-foreground[aria-expanded=true]{color:var(--foreground)}.tw\\:aria-expanded\\:text-secondary-foreground[aria-expanded=true]{color:var(--secondary-foreground)}.tw\\:aria-expanded\\:opacity-100[aria-expanded=true]{opacity:1}.tw\\:aria-invalid\\:border-destructive[aria-invalid=true]{border-color:var(--destructive)}.tw\\:aria-invalid\\:ring-0[aria-invalid=true]{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:aria-invalid\\:ring-3[aria-invalid=true]{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:aria-invalid\\:ring-destructive\\/20[aria-invalid=true]{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:aria-invalid\\:ring-destructive\\/20[aria-invalid=true]{--tw-ring-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:aria-invalid\\:aria-checked\\:border-primary[aria-invalid=true][aria-checked=true]{border-color:var(--primary)}.tw\\:aria-pressed\\:bg-muted[aria-pressed=true]{background-color:var(--muted)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:h-px[aria-orientation=horizontal]{height:1px}.tw\\:aria-\\[orientation\\=horizontal\\]\\:w-full[aria-orientation=horizontal]{width:100%}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:start-0[aria-orientation=horizontal]:after{content:var(--tw-content);inset-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:h-1[aria-orientation=horizontal]:after{content:var(--tw-content);height:calc(calc(var(--spacing)) * 1)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:w-full[aria-orientation=horizontal]:after{content:var(--tw-content);width:100%}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:translate-x-0[aria-orientation=horizontal]:after{content:var(--tw-content);--tw-translate-x:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:-translate-y-1\\/2[aria-orientation=horizontal]:after{content:var(--tw-content);--tw-translate-y:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:aria-\\[orientation\\=vertical\\]\\:flex-col[aria-orientation=vertical]{flex-direction:column}.tw\\:data-inset\\:ps-7[data-inset]{padding-inline-start:calc(calc(var(--spacing)) * 7)}.tw\\:data-placeholder\\:text-muted-foreground[data-placeholder]{color:var(--muted-foreground)}.tw\\:data-quiet-focus\\:focus-visible\\:border-transparent[data-quiet-focus]:focus-visible{border-color:#0000}.tw\\:data-quiet-focus\\:focus-visible\\:ring-0[data-quiet-focus]:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:data-quiet-focus\\:focus-visible\\:outline-none[data-quiet-focus]:focus-visible{--tw-outline-style:none;outline-style:none}.tw\\:data-\\[align-trigger\\=false\\]\\:min-w-36[data-align-trigger=false]{min-width:calc(calc(var(--spacing)) * 36)}.tw\\:data-\\[align-trigger\\=true\\]\\:min-w-\\(--radix-select-trigger-width\\)[data-align-trigger=true]{min-width:var(--radix-select-trigger-width)}.tw\\:data-\\[align-trigger\\=true\\]\\:animate-none[data-align-trigger=true]{animation:none}.tw\\:data-\\[disabled\\=true\\]\\:pointer-events-none[data-disabled=true]{pointer-events:none}.tw\\:data-\\[disabled\\=true\\]\\:opacity-50[data-disabled=true]{opacity:.5}.tw\\:data-\\[position\\=popper\\]\\:h-\\(--radix-select-trigger-height\\)[data-position=popper]{height:var(--radix-select-trigger-height)}.tw\\:data-\\[position\\=popper\\]\\:w-full[data-position=popper]{width:100%}.tw\\:data-\\[position\\=popper\\]\\:min-w-\\(--radix-select-trigger-width\\)[data-position=popper]{min-width:var(--radix-select-trigger-width)}.tw\\:data-\\[side\\=bottom\\]\\:translate-y-1[data-side=bottom]{--tw-translate-y:calc(calc(var(--spacing)) * 1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=bottom\\]\\:slide-in-from-top-2[data-side=bottom]{--tw-enter-translate-y:calc(2*var(--spacing)*-1)}.tw\\:data-\\[side\\=left\\]\\:-translate-x-1[data-side=left]{--tw-translate-x:calc(calc(var(--spacing)) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=left\\]\\:slide-in-from-right-2[data-side=left]{--tw-enter-translate-x:calc(2*var(--spacing))}.tw\\:data-\\[side\\=right\\]\\:translate-x-1[data-side=right]{--tw-translate-x:calc(calc(var(--spacing)) * 1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=right\\]\\:slide-in-from-left-2[data-side=right]{--tw-enter-translate-x:calc(2*var(--spacing)*-1)}.tw\\:data-\\[side\\=top\\]\\:-translate-y-1[data-side=top]{--tw-translate-y:calc(calc(var(--spacing)) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=top\\]\\:slide-in-from-bottom-2[data-side=top]{--tw-enter-translate-y:calc(2*var(--spacing))}.tw\\:data-\\[size\\=default\\]\\:h-8[data-size=default]{height:calc(calc(var(--spacing)) * 8)}.tw\\:data-\\[size\\=default\\]\\:h-\\[18\\.4px\\][data-size=default]{height:18.4px}.tw\\:data-\\[size\\=default\\]\\:w-\\[32px\\][data-size=default]{width:32px}.tw\\:data-\\[size\\=lg\\]\\:size-10[data-size=lg]{width:calc(calc(var(--spacing)) * 10);height:calc(calc(var(--spacing)) * 10)}.tw\\:data-\\[size\\=md\\]\\:text-sm[data-size=md]{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:data-\\[size\\=sm\\]\\:size-6[data-size=sm]{width:calc(calc(var(--spacing)) * 6);height:calc(calc(var(--spacing)) * 6)}.tw\\:data-\\[size\\=sm\\]\\:h-7[data-size=sm]{height:calc(calc(var(--spacing)) * 7)}.tw\\:data-\\[size\\=sm\\]\\:h-\\[14px\\][data-size=sm]{height:14px}.tw\\:data-\\[size\\=sm\\]\\:w-\\[24px\\][data-size=sm]{width:24px}.tw\\:data-\\[size\\=sm\\]\\:gap-3[data-size=sm]{gap:calc(calc(var(--spacing)) * 3)}.tw\\:data-\\[size\\=sm\\]\\:rounded-\\[min\\(var\\(--tw-radius-md\\)\\,10px\\)\\][data-size=sm]{border-radius:min(var(--tw-radius-md), 10px)}.tw\\:data-\\[size\\=sm\\]\\:py-3[data-size=sm]{padding-block:calc(calc(var(--spacing)) * 3)}.tw\\:data-\\[size\\=sm\\]\\:text-xs[data-size=sm]{font-size:var(--tw-text-xs);line-height:var(--tw-leading,var(--tw-text-xs--line-height))}.tw\\:data-\\[size\\=sm\\]\\:has-data-\\[slot\\=card-footer\\]\\:pb-0[data-size=sm]:has([data-slot=card-footer]){padding-bottom:calc(calc(var(--spacing)) * 0)}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-item\\]\\:focus\\:bg-foreground\\/10 *)[data-slot$=-item]:focus{background-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-item\\]\\:focus\\:bg-foreground\\/10 *)[data-slot$=-item]:focus{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)}}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-item\\]\\:data-highlighted\\:bg-foreground\\/10 *)[data-slot$=-item][data-highlighted]{background-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-item\\]\\:data-highlighted\\:bg-foreground\\/10 *)[data-slot$=-item][data-highlighted]{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)}}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-separator\\]\\:bg-foreground\\/5 *)[data-slot$=-separator]{background-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-separator\\]\\:bg-foreground\\/5 *)[data-slot$=-separator]{background-color:color-mix(in oklab, var(--foreground) 5%, transparent)}}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-trigger\\]\\:focus\\:bg-foreground\\/10 *)[data-slot$=-trigger]:focus{background-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-trigger\\]\\:focus\\:bg-foreground\\/10 *)[data-slot$=-trigger]:focus{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)}}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-trigger\\]\\:aria-expanded\\:bg-foreground\\/10\\! *)[data-slot$=-trigger][aria-expanded=true]{background-color:var(--foreground)!important}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-trigger\\]\\:aria-expanded\\:bg-foreground\\/10\\! *)[data-slot$=-trigger][aria-expanded=true]{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)!important}}:is(.tw\\:\\*\\:data-\\[slot\\=alert-description\\]\\:text-destructive\\/90>*)[data-slot=alert-description]{color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\:data-\\[slot\\=alert-description\\]\\:text-destructive\\/90>*)[data-slot=alert-description]{color:color-mix(in oklab, var(--destructive) 90%, transparent)}}:is(.tw\\:\\*\\:data-\\[slot\\=avatar\\]\\:ring-2>*)[data-slot=avatar]{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}:is(.tw\\:\\*\\:data-\\[slot\\=avatar\\]\\:ring-background>*)[data-slot=avatar]{--tw-ring-color:var(--background)}:is(.tw\\:\\*\\:data-\\[slot\\=input-group-addon\\]\\:ps-2\\!>*)[data-slot=input-group-addon]{padding-inline-start:calc(calc(var(--spacing)) * 2)!important}:is(.tw\\:\\*\\*\\:data-\\[slot\\=kbd\\]\\:relative *)[data-slot=kbd]{position:relative}:is(.tw\\:\\*\\*\\:data-\\[slot\\=kbd\\]\\:isolate *)[data-slot=kbd]{isolation:isolate}:is(.tw\\:\\*\\*\\:data-\\[slot\\=kbd\\]\\:z-50 *)[data-slot=kbd]{z-index:50}:is(.tw\\:\\*\\*\\:data-\\[slot\\=kbd\\]\\:rounded-sm *)[data-slot=kbd]{border-radius:calc(var(--radius) * .6)}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:line-clamp-1>*)[data-slot=select-value]{-webkit-line-clamp:1;-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:flex>*)[data-slot=select-value]{display:flex}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:flex-1>*)[data-slot=select-value]{flex:1}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:items-center>*)[data-slot=select-value]{align-items:center}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:gap-1\\.5>*)[data-slot=select-value]{gap:calc(calc(var(--spacing)) * 1.5)}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:text-start>*)[data-slot=select-value]{text-align:start}.tw\\:group-data-horizontal\\/toggle-group\\:data-\\[spacing\\=0\\]\\:first\\:rounded-s-lg:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=horizontal]) *)[data-spacing="0"]:first-child{border-start-start-radius:var(--radius);border-end-start-radius:var(--radius)}.tw\\:group-data-vertical\\/toggle-group\\:data-\\[spacing\\=0\\]\\:first\\:rounded-t-lg:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=vertical]) *)[data-spacing="0"]:first-child{border-top-left-radius:var(--radius);border-top-right-radius:var(--radius)}.tw\\:group-data-horizontal\\/toggle-group\\:data-\\[spacing\\=0\\]\\:last\\:rounded-e-lg:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=horizontal]) *)[data-spacing="0"]:last-child{border-start-end-radius:var(--radius);border-end-end-radius:var(--radius)}.tw\\:group-data-vertical\\/toggle-group\\:data-\\[spacing\\=0\\]\\:last\\:rounded-b-lg:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=vertical]) *)[data-spacing="0"]:last-child{border-bottom-right-radius:var(--radius);border-bottom-left-radius:var(--radius)}.tw\\:data-\\[state\\=active\\]\\:bg-background[data-state=active]{background-color:var(--background)}.tw\\:data-\\[state\\=active\\]\\:text-foreground[data-state=active]{color:var(--foreground)}.tw\\:data-\\[state\\=active\\]\\:shadow-sm[data-state=active]{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:data-\\[state\\=closed\\]\\:overflow-hidden[data-state=closed]{overflow:hidden}.tw\\:data-\\[state\\=delayed-open\\]\\:animate-in[data-state=delayed-open]{animation:enter var(--tw-animation-duration,var(--tw-duration,.15s))var(--tw-ease,ease)var(--tw-animation-delay,0s)var(--tw-animation-iteration-count,1)var(--tw-animation-direction,normal)var(--tw-animation-fill-mode,none)}.tw\\:data-\\[state\\=delayed-open\\]\\:fade-in-0[data-state=delayed-open]{--tw-enter-opacity:0}.tw\\:data-\\[state\\=delayed-open\\]\\:zoom-in-95[data-state=delayed-open]{--tw-enter-scale:.95}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-soft-approved\\)\\][data-state=on]{background-color:var(--inv-soft-approved)}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-soft-unapproved\\)\\][data-state=on]{background-color:var(--inv-soft-unapproved)}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-soft-unknown\\)\\][data-state=on]{background-color:var(--inv-soft-unknown)}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-vivid-approved\\)\\][data-state=on]{background-color:var(--inv-vivid-approved)}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-vivid-unapproved\\)\\][data-state=on]{background-color:var(--inv-vivid-unapproved)}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-vivid-unknown\\)\\][data-state=on]{background-color:var(--inv-vivid-unknown)}.tw\\:data-\\[state\\=on\\]\\:bg-muted[data-state=on]{background-color:var(--muted)}.tw\\:data-\\[state\\=on\\]\\:text-\\[var\\(--inv-icon-approved\\)\\][data-state=on]{color:var(--inv-icon-approved)}.tw\\:data-\\[state\\=on\\]\\:text-\\[var\\(--inv-icon-unapproved\\)\\][data-state=on]{color:var(--inv-icon-unapproved)}.tw\\:data-\\[state\\=on\\]\\:text-\\[var\\(--inv-icon-unknown\\)\\][data-state=on]{color:var(--inv-icon-unknown)}.tw\\:data-\\[state\\=on\\]\\:text-\\[var\\(--inv-on\\)\\][data-state=on]{color:var(--inv-on)}.tw\\:data-\\[state\\=on\\]\\:text-foreground[data-state=on]{color:var(--foreground)}.tw\\:data-\\[state\\=open\\]\\:bg-accent[data-state=open]{background-color:var(--accent)}.tw\\:data-\\[state\\=open\\]\\:bg-muted[data-state=open]{background-color:var(--muted)}.tw\\:data-\\[state\\=open\\]\\:text-foreground[data-state=open]{color:var(--foreground)}.tw\\:data-\\[state\\=selected\\]\\:bg-muted[data-state=selected]{background-color:var(--muted)}.tw\\:data-\\[variant\\=destructive\\]\\:text-destructive[data-variant=destructive]{color:var(--destructive)}:is(:is(.tw\\:\\*\\*\\:data-\\[variant\\=destructive\\]\\:\\*\\*\\:text-accent-foreground\\! *)[data-variant=destructive] *),:is(.tw\\:\\*\\*\\:data-\\[variant\\=destructive\\]\\:text-accent-foreground\\! *)[data-variant=destructive]{color:var(--accent-foreground)!important}.tw\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-destructive\\/10[data-variant=destructive]:focus{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-destructive\\/10[data-variant=destructive]:focus{background-color:color-mix(in oklab, var(--destructive) 10%, transparent)}}.tw\\:data-\\[variant\\=destructive\\]\\:focus\\:text-destructive[data-variant=destructive]:focus{color:var(--destructive)}:is(.tw\\:\\*\\*\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-foreground\\/10\\! *)[data-variant=destructive]:focus{background-color:var(--foreground)!important}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-foreground\\/10\\! *)[data-variant=destructive]:focus{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)!important}}.tw\\:data-\\[variant\\=line\\]\\:rounded-none[data-variant=line]{border-radius:0}.tw\\:group-data-horizontal\\/toggle-group\\:data-\\[spacing\\=0\\]\\:data-\\[variant\\=outline\\]\\:border-s-0:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=horizontal]) *)[data-spacing="0"][data-variant=outline]{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:group-data-vertical\\/toggle-group\\:data-\\[spacing\\=0\\]\\:data-\\[variant\\=outline\\]\\:border-t-0:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=vertical]) *)[data-spacing="0"][data-variant=outline]{border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:group-data-horizontal\\/toggle-group\\:data-\\[spacing\\=0\\]\\:data-\\[variant\\=outline\\]\\:first\\:border-s:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=horizontal]) *)[data-spacing="0"][data-variant=outline]:first-child{border-inline-start-style:var(--tw-border-style);border-inline-start-width:1px}.tw\\:group-data-vertical\\/toggle-group\\:data-\\[spacing\\=0\\]\\:data-\\[variant\\=outline\\]\\:first\\:border-t:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=vertical]) *)[data-spacing="0"][data-variant=outline]:first-child{border-top-style:var(--tw-border-style);border-top-width:1px}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:inset-x-0[data-vaul-drawer-direction=bottom]{inset-inline:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:bottom-0[data-vaul-drawer-direction=bottom]{bottom:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:mt-24[data-vaul-drawer-direction=bottom]{margin-top:calc(calc(var(--spacing)) * 24)}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:max-h-\\[80vh\\][data-vaul-drawer-direction=bottom]{max-height:80vh}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:rounded-t-xl[data-vaul-drawer-direction=bottom]{border-top-left-radius:calc(var(--radius) * 1.4);border-top-right-radius:calc(var(--radius) * 1.4)}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:border-t[data-vaul-drawer-direction=bottom]{border-top-style:var(--tw-border-style);border-top-width:1px}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:inset-y-0[data-vaul-drawer-direction=left]{inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:left-0[data-vaul-drawer-direction=left]{left:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:w-3\\/4[data-vaul-drawer-direction=left]{width:75%}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:flex-row[data-vaul-drawer-direction=left]{flex-direction:row}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:rounded-r-xl[data-vaul-drawer-direction=left]{border-top-right-radius:calc(var(--radius) * 1.4);border-bottom-right-radius:calc(var(--radius) * 1.4)}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:border-r[data-vaul-drawer-direction=left]{border-right-style:var(--tw-border-style);border-right-width:1px}.tw\\:data-\\[vaul-drawer-direction\\=left\\/right\\]\\:flex-row[data-vaul-drawer-direction=left\\/right]{flex-direction:row}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:inset-y-0[data-vaul-drawer-direction=right]{inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:right-0[data-vaul-drawer-direction=right]{right:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:w-3\\/4[data-vaul-drawer-direction=right]{width:75%}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:flex-row[data-vaul-drawer-direction=right]{flex-direction:row}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:rounded-l-xl[data-vaul-drawer-direction=right]{border-top-left-radius:calc(var(--radius) * 1.4);border-bottom-left-radius:calc(var(--radius) * 1.4)}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:border-l[data-vaul-drawer-direction=right]{border-left-style:var(--tw-border-style);border-left-width:1px}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:inset-x-0[data-vaul-drawer-direction=top]{inset-inline:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:top-0[data-vaul-drawer-direction=top]{top:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:mb-24[data-vaul-drawer-direction=top]{margin-bottom:calc(calc(var(--spacing)) * 24)}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:max-h-\\[80vh\\][data-vaul-drawer-direction=top]{max-height:80vh}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:rounded-b-xl[data-vaul-drawer-direction=top]{border-bottom-right-radius:calc(var(--radius) * 1.4);border-bottom-left-radius:calc(var(--radius) * 1.4)}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:border-b[data-vaul-drawer-direction=top]{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}@supports ((-webkit-backdrop-filter:var(--tw)) or (backdrop-filter:var(--tw))){.tw\\:supports-backdrop-filter\\:backdrop-blur-xs{--tw-backdrop-blur:blur(var(--tw-blur-xs));-webkit-backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)}}@media (min-width:40rem){.tw\\:sm\\:flex{display:flex}.tw\\:sm\\:max-w-sm{max-width:var(--tw-container-sm)}.tw\\:sm\\:flex-row{flex-direction:row}.tw\\:sm\\:justify-end{justify-content:flex-end}.tw\\:sm\\:p-8{padding:calc(calc(var(--spacing)) * 8)}.tw\\:sm\\:text-start{text-align:start}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:sm\\:max-w-sm[data-vaul-drawer-direction=left],.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:sm\\:max-w-sm[data-vaul-drawer-direction=right]{max-width:var(--tw-container-sm)}}@media (min-width:48rem){.tw\\:md\\:block{display:block}.tw\\:md\\:flex{display:flex}.tw\\:md\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.tw\\:md\\:gap-0\\.5{gap:calc(calc(var(--spacing)) * .5)}.tw\\:md\\:text-start{text-align:start}.tw\\:md\\:text-sm{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:md\\:text-pretty{text-wrap:pretty}.tw\\:md\\:opacity-0{opacity:0}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:m-2:is(:where(.tw\\:peer)[data-variant=inset]~*){margin:calc(calc(var(--spacing)) * 2)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:ms-0:is(:where(.tw\\:peer)[data-variant=inset]~*){margin-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:rounded-xl:is(:where(.tw\\:peer)[data-variant=inset]~*){border-radius:calc(var(--radius) * 1.4)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:shadow-sm:is(:where(.tw\\:peer)[data-variant=inset]~*){--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:peer-data-\\[state\\=collapsed\\]\\:ms-2:is(:where(.tw\\:peer)[data-variant=inset]~*):is(:where(.tw\\:peer)[data-state=collapsed]~*){margin-inline-start:calc(calc(var(--spacing)) * 2)}.tw\\:md\\:after\\:hidden:after{content:var(--tw-content);display:none}}@media (min-width:64rem){.tw\\:lg\\:flex{display:flex}.tw\\:lg\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}:where(.tw\\:lg\\:space-x-8>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 8) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 8) * calc(1 - var(--tw-space-x-reverse)))}.tw\\:lg\\:text-5xl{font-size:var(--tw-text-5xl);line-height:var(--tw-leading,var(--tw-text-5xl--line-height))}}@media (min-width:48rem){@media (min-width:64rem){.tw\\:md\\:lg\\:hidden{display:none}}}@media (min-width:80rem){.tw\\:xl\\:auto-cols-fr{grid-auto-columns:minmax(0,1fr)}.tw\\:xl\\:grid-flow-col{grid-auto-flow:column}.tw\\:xl\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.tw\\:xl\\:grid-cols-none{grid-template-columns:none}.tw\\:xl\\:grid-rows-2{grid-template-rows:repeat(2,minmax(0,1fr))}}@container search not (min-width:7rem){.tw\\:\\@max-\\[7rem\\]\\/search\\:hidden{display:none}.tw\\:\\@max-\\[7rem\\]\\/search\\:ps-3{padding-inline-start:calc(calc(var(--spacing)) * 3)}}@container search not (min-width:4rem){.tw\\:\\@max-\\[4rem\\]\\/search\\:hidden{display:none}.tw\\:\\@max-\\[4rem\\]\\/search\\:pe-3{padding-inline-end:calc(calc(var(--spacing)) * 3)}}@container search not (min-width:3rem){.tw\\:\\@max-\\[3rem\\]\\/search\\:ps-0{padding-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:\\@max-\\[3rem\\]\\/search\\:pe-0{padding-inline-end:calc(calc(var(--spacing)) * 0)}}@container (min-width:24rem){.tw\\:\\@sm\\:basis-auto{flex-basis:auto}}.tw\\:ltr\\:left-2:where(:dir(ltr),[dir=ltr],[dir=ltr] *){left:calc(calc(var(--spacing)) * 2)}.tw\\:ltr\\:-translate-x-1\\/2:where(:dir(ltr),[dir=ltr],[dir=ltr] *){--tw-translate-x:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:right-2:where(:dir(rtl),[dir=rtl],[dir=rtl] *){right:calc(calc(var(--spacing)) * 2)}.tw\\:rtl\\:flex:where(:dir(rtl),[dir=rtl],[dir=rtl] *){display:flex}.tw\\:rtl\\:-translate-x-px:where(:dir(rtl),[dir=rtl],[dir=rtl] *){--tw-translate-x:-1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:translate-x-1\\/2:where(:dir(rtl),[dir=rtl],[dir=rtl] *){--tw-translate-x:calc(1 / 2 * 100%);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:translate-x-px:where(:dir(rtl),[dir=rtl],[dir=rtl] *){--tw-translate-x:1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:after\\:translate-x-1\\/2:where(:dir(rtl),[dir=rtl],[dir=rtl] *):after{content:var(--tw-content);--tw-translate-x:calc(1 / 2 * 100%);translate:var(--tw-translate-x) var(--tw-translate-y)}:where([data-side=primary]) .tw\\:rtl\\:in-data-\\[side\\=primary\\]\\:cursor-e-resize:where(:dir(rtl),[dir=rtl],[dir=rtl] *){cursor:e-resize}:where([data-side=secondary]) .tw\\:rtl\\:in-data-\\[side\\=secondary\\]\\:cursor-w-resize:where(:dir(rtl),[dir=rtl],[dir=rtl] *){cursor:w-resize}.tw\\:rtl\\:aria-\\[orientation\\=horizontal\\]\\:after\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *)[aria-orientation=horizontal]:after{content:var(--tw-content);--tw-translate-x:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:data-\\[side\\=left\\]\\:translate-x-1:where(:dir(rtl),[dir=rtl],[dir=rtl] *)[data-side=left]{--tw-translate-x:calc(calc(var(--spacing)) * 1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:data-\\[side\\=right\\]\\:-translate-x-1:where(:dir(rtl),[dir=rtl],[dir=rtl] *)[data-side=right]{--tw-translate-x:calc(calc(var(--spacing)) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:dark\\:border-input:is(.dark *){border-color:var(--input)}.tw\\:dark\\:bg-destructive\\/20:is(.dark *){background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:bg-destructive\\/20:is(.dark *){background-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:dark\\:bg-input\\/30:is(.dark *){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:bg-input\\/30:is(.dark *){background-color:color-mix(in oklab, var(--input) 30%, transparent)}}.tw\\:dark\\:bg-transparent:is(.dark *){background-color:#0000}.tw\\:dark\\:text-amber-400:is(.dark *){color:var(--tw-color-amber-400)}.tw\\:dark\\:text-muted-foreground:is(.dark *){color:var(--muted-foreground)}.tw\\:dark\\:text-rose-400:is(.dark *){color:var(--tw-color-rose-400)}.tw\\:dark\\:text-sky-400:is(.dark *){color:var(--tw-color-sky-400)}.tw\\:dark\\:text-teal-400:is(.dark *){color:var(--tw-color-teal-400)}.tw\\:dark\\:after\\:mix-blend-lighten:is(.dark *):after{content:var(--tw-content);mix-blend-mode:lighten}@media (hover:hover){.tw\\:dark\\:hover\\:bg-blue-500:is(.dark *):hover{background-color:var(--tw-color-blue-500)}.tw\\:dark\\:hover\\:bg-destructive\\/30:is(.dark *):hover{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:hover\\:bg-destructive\\/30:is(.dark *):hover{background-color:color-mix(in oklab, var(--destructive) 30%, transparent)}}.tw\\:dark\\:hover\\:bg-input\\/50:is(.dark *):hover{background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:hover\\:bg-input\\/50:is(.dark *):hover{background-color:color-mix(in oklab, var(--input) 50%, transparent)}}.tw\\:dark\\:hover\\:bg-muted\\/50:is(.dark *):hover{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:hover\\:bg-muted\\/50:is(.dark *):hover{background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:dark\\:hover\\:text-foreground:is(.dark *):hover{color:var(--foreground)}}.tw\\:dark\\:focus-visible\\:ring-destructive\\/40:is(.dark *):focus-visible{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:focus-visible\\:ring-destructive\\/40:is(.dark *):focus-visible{--tw-ring-color:color-mix(in oklab, var(--destructive) 40%, transparent)}}.tw\\:dark\\:disabled\\:bg-input\\/80:is(.dark *):disabled{background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:disabled\\:bg-input\\/80:is(.dark *):disabled{background-color:color-mix(in oklab, var(--input) 80%, transparent)}}.tw\\:dark\\:disabled\\:bg-transparent:is(.dark *):disabled{background-color:#0000}:where([data-slot=tooltip-content]) .tw\\:dark\\:in-data-\\[slot\\=tooltip-content\\]\\:bg-background\\/10:is(.dark *){background-color:var(--background)}@supports (color:color-mix(in lab, red, red)){:where([data-slot=tooltip-content]) .tw\\:dark\\:in-data-\\[slot\\=tooltip-content\\]\\:bg-background\\/10:is(.dark *){background-color:color-mix(in oklab, var(--background) 10%, transparent)}}.tw\\:dark\\:has-disabled\\:bg-input\\/80:is(.dark *):has(:disabled){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:has-disabled\\:bg-input\\/80:is(.dark *):has(:disabled){background-color:color-mix(in oklab, var(--input) 80%, transparent)}}.tw\\:dark\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-destructive\\/40:is(.dark *):has([data-slot][aria-invalid=true]){--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-destructive\\/40:is(.dark *):has([data-slot][aria-invalid=true]){--tw-ring-color:color-mix(in oklab, var(--destructive) 40%, transparent)}}.tw\\:dark\\:aria-invalid\\:border-destructive\\/50:is(.dark *)[aria-invalid=true]{border-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:aria-invalid\\:border-destructive\\/50:is(.dark *)[aria-invalid=true]{border-color:color-mix(in oklab, var(--destructive) 50%, transparent)}}.tw\\:dark\\:aria-invalid\\:ring-destructive\\/40:is(.dark *)[aria-invalid=true]{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:aria-invalid\\:ring-destructive\\/40:is(.dark *)[aria-invalid=true]{--tw-ring-color:color-mix(in oklab, var(--destructive) 40%, transparent)}}.tw\\:dark\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-destructive\\/20:is(.dark *)[data-variant=destructive]:focus{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-destructive\\/20:is(.dark *)[data-variant=destructive]:focus{background-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:data-open\\:animate-in:where([data-state=open]),.tw\\:data-open\\:animate-in:where([data-open]:not([data-open=false])){animation:enter var(--tw-animation-duration,var(--tw-duration,.15s))var(--tw-ease,ease)var(--tw-animation-delay,0s)var(--tw-animation-iteration-count,1)var(--tw-animation-direction,normal)var(--tw-animation-fill-mode,none)}.tw\\:data-open\\:bg-accent:where([data-state=open]),.tw\\:data-open\\:bg-accent:where([data-open]:not([data-open=false])){background-color:var(--accent)}.tw\\:data-open\\:text-accent-foreground:where([data-state=open]),.tw\\:data-open\\:text-accent-foreground:where([data-open]:not([data-open=false])){color:var(--accent-foreground)}.tw\\:data-open\\:fade-in-0:where([data-state=open]),.tw\\:data-open\\:fade-in-0:where([data-open]:not([data-open=false])){--tw-enter-opacity:0}.tw\\:data-open\\:zoom-in-95:where([data-state=open]),.tw\\:data-open\\:zoom-in-95:where([data-open]:not([data-open=false])){--tw-enter-scale:.95}@media (hover:hover){:is(.tw\\:data-open\\:hover\\:bg-sidebar-accent:where([data-state=open]),.tw\\:data-open\\:hover\\:bg-sidebar-accent:where([data-open]:not([data-open=false]))):hover{background-color:var(--sidebar-accent)}:is(.tw\\:data-open\\:hover\\:text-sidebar-accent-foreground:where([data-state=open]),.tw\\:data-open\\:hover\\:text-sidebar-accent-foreground:where([data-open]:not([data-open=false]))):hover{color:var(--sidebar-accent-foreground)}}.tw\\:data-closed\\:animate-out:where([data-state=closed]),.tw\\:data-closed\\:animate-out:where([data-closed]:not([data-closed=false])){animation:exit var(--tw-animation-duration,var(--tw-duration,.15s))var(--tw-ease,ease)var(--tw-animation-delay,0s)var(--tw-animation-iteration-count,1)var(--tw-animation-direction,normal)var(--tw-animation-fill-mode,none)}.tw\\:data-closed\\:fade-out-0:where([data-state=closed]),.tw\\:data-closed\\:fade-out-0:where([data-closed]:not([data-closed=false])){--tw-exit-opacity:0}.tw\\:data-closed\\:zoom-out-95:where([data-state=closed]),.tw\\:data-closed\\:zoom-out-95:where([data-closed]:not([data-closed=false])){--tw-exit-scale:.95}.tw\\:data-checked\\:border-primary:where([data-state=checked]),.tw\\:data-checked\\:border-primary:where([data-checked]:not([data-checked=false])){border-color:var(--primary)}.tw\\:data-checked\\:bg-primary:where([data-state=checked]),.tw\\:data-checked\\:bg-primary:where([data-checked]:not([data-checked=false])){background-color:var(--primary)}.tw\\:data-checked\\:text-primary-foreground:where([data-state=checked]),.tw\\:data-checked\\:text-primary-foreground:where([data-checked]:not([data-checked=false])){color:var(--primary-foreground)}.tw\\:group-data-\\[size\\=default\\]\\/switch\\:data-checked\\:translate-x-\\[calc\\(100\\%-2px\\)\\]:is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-state=checked]),.tw\\:group-data-\\[size\\=default\\]\\/switch\\:data-checked\\:translate-x-\\[calc\\(100\\%-2px\\)\\]:is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-checked]:not([data-checked=false])),.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:data-checked\\:translate-x-\\[calc\\(100\\%-2px\\)\\]:is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-state=checked]),.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:data-checked\\:translate-x-\\[calc\\(100\\%-2px\\)\\]:is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-checked]:not([data-checked=false])){--tw-translate-x:calc(100% - 2px);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:group-data-\\[size\\=default\\]\\/switch\\:data-checked\\:-translate-x-\\[calc\\(100\\%-2px\\)\\]:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-state=checked]),.tw\\:rtl\\:group-data-\\[size\\=default\\]\\/switch\\:data-checked\\:-translate-x-\\[calc\\(100\\%-2px\\)\\]:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-checked]:not([data-checked=false])),.tw\\:rtl\\:group-data-\\[size\\=sm\\]\\/switch\\:data-checked\\:-translate-x-\\[calc\\(100\\%-2px\\)\\]:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-state=checked]),.tw\\:rtl\\:group-data-\\[size\\=sm\\]\\/switch\\:data-checked\\:-translate-x-\\[calc\\(100\\%-2px\\)\\]:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-checked]:not([data-checked=false])){--tw-translate-x:calc(calc(100% - 2px) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:dark\\:data-checked\\:bg-primary:is(.dark *):where([data-state=checked]),.tw\\:dark\\:data-checked\\:bg-primary:is(.dark *):where([data-checked]:not([data-checked=false])){background-color:var(--primary)}.tw\\:dark\\:data-checked\\:bg-primary-foreground:is(.dark *):where([data-state=checked]),.tw\\:dark\\:data-checked\\:bg-primary-foreground:is(.dark *):where([data-checked]:not([data-checked=false])){background-color:var(--primary-foreground)}.tw\\:data-unchecked\\:bg-input:where([data-state=unchecked]),.tw\\:data-unchecked\\:bg-input:where([data-unchecked]:not([data-unchecked=false])){background-color:var(--input)}.tw\\:group-data-\\[size\\=default\\]\\/switch\\:data-unchecked\\:translate-x-0:is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-state=unchecked]),.tw\\:group-data-\\[size\\=default\\]\\/switch\\:data-unchecked\\:translate-x-0:is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-unchecked]:not([data-unchecked=false])),.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:data-unchecked\\:translate-x-0:is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-state=unchecked]),.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:data-unchecked\\:translate-x-0:is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-unchecked]:not([data-unchecked=false])),.tw\\:rtl\\:group-data-\\[size\\=default\\]\\/switch\\:data-unchecked\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-state=unchecked]),.tw\\:rtl\\:group-data-\\[size\\=default\\]\\/switch\\:data-unchecked\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-unchecked]:not([data-unchecked=false])),.tw\\:rtl\\:group-data-\\[size\\=sm\\]\\/switch\\:data-unchecked\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-state=unchecked]),.tw\\:rtl\\:group-data-\\[size\\=sm\\]\\/switch\\:data-unchecked\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-unchecked]:not([data-unchecked=false])){--tw-translate-x:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:dark\\:data-unchecked\\:bg-foreground:is(.dark *):where([data-state=unchecked]),.tw\\:dark\\:data-unchecked\\:bg-foreground:is(.dark *):where([data-unchecked]:not([data-unchecked=false])){background-color:var(--foreground)}.tw\\:dark\\:data-unchecked\\:bg-input\\/80:is(.dark *):where([data-state=unchecked]),.tw\\:dark\\:data-unchecked\\:bg-input\\/80:is(.dark *):where([data-unchecked]:not([data-unchecked=false])){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:data-unchecked\\:bg-input\\/80:is(.dark *):where([data-state=unchecked]),.tw\\:dark\\:data-unchecked\\:bg-input\\/80:is(.dark *):where([data-unchecked]:not([data-unchecked=false])){background-color:color-mix(in oklab, var(--input) 80%, transparent)}}.tw\\:data-selected\\:bg-muted:where([data-selected=true]),.tw\\:data-selected\\:bg-muted\\/50:where([data-selected=true]){background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:data-selected\\:bg-muted\\/50:where([data-selected=true]){background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:data-selected\\:bg-primary:where([data-selected=true]){background-color:var(--primary)}.tw\\:data-selected\\:bg-transparent:where([data-selected=true]){background-color:#0000}.tw\\:data-selected\\:text-foreground:where([data-selected=true]){color:var(--foreground)}.tw\\:data-selected\\:text-inherit:where([data-selected=true]){color:inherit}.tw\\:data-selected\\:text-muted-foreground\\/50:where([data-selected=true]){color:var(--muted-foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:data-selected\\:text-muted-foreground\\/50:where([data-selected=true]){color:color-mix(in oklab, var(--muted-foreground) 50%, transparent)}}.tw\\:data-selected\\:text-primary-foreground:where([data-selected=true]){color:var(--primary-foreground)}.tw\\:data-selected\\:ring-2:where([data-selected=true]){--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:data-selected\\:ring-primary-foreground\\/70:where([data-selected=true]){--tw-ring-color:var(--primary-foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:data-selected\\:ring-primary-foreground\\/70:where([data-selected=true]){--tw-ring-color:color-mix(in oklab, var(--primary-foreground) 70%, transparent)}}.tw\\:data-selected\\:ring-ring\\/50:where([data-selected=true]){--tw-ring-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.tw\\:data-selected\\:ring-ring\\/50:where([data-selected=true]){--tw-ring-color:color-mix(in oklab, var(--ring) 50%, transparent)}}.tw\\:data-selected\\:ring-inset:where([data-selected=true]){--tw-ring-inset:inset}@media (forced-colors:active){.tw\\:forced-colors\\:data-selected\\:outline-2:where([data-selected=true]){outline-style:var(--tw-outline-style);outline-width:2px}.tw\\:forced-colors\\:data-selected\\:-outline-offset-2:where([data-selected=true]){outline-offset:calc(2px * -1)}.tw\\:forced-colors\\:data-selected\\:outline-\\[color\\:Highlight\\]:where([data-selected=true]){outline-color:highlight}}.tw\\:data-disabled\\:pointer-events-none:where([data-disabled=true]),.tw\\:data-disabled\\:pointer-events-none:where([data-disabled]:not([data-disabled=false])){pointer-events:none}.tw\\:data-disabled\\:cursor-not-allowed:where([data-disabled=true]),.tw\\:data-disabled\\:cursor-not-allowed:where([data-disabled]:not([data-disabled=false])){cursor:not-allowed}.tw\\:data-disabled\\:opacity-50:where([data-disabled=true]),.tw\\:data-disabled\\:opacity-50:where([data-disabled]:not([data-disabled=false])){opacity:.5}.tw\\:data-active\\:bg-background:where([data-state=active]),.tw\\:data-active\\:bg-background:where([data-active]:not([data-active=false])){background-color:var(--background)}.tw\\:data-active\\:bg-sidebar-accent:where([data-state=active]),.tw\\:data-active\\:bg-sidebar-accent:where([data-active]:not([data-active=false])){background-color:var(--sidebar-accent)}.tw\\:data-active\\:font-medium:where([data-state=active]),.tw\\:data-active\\:font-medium:where([data-active]:not([data-active=false])){--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}.tw\\:data-active\\:text-foreground:where([data-state=active]),.tw\\:data-active\\:text-foreground:where([data-active]:not([data-active=false])){color:var(--foreground)}.tw\\:data-active\\:text-sidebar-accent-foreground:where([data-state=active]),.tw\\:data-active\\:text-sidebar-accent-foreground:where([data-active]:not([data-active=false])){color:var(--sidebar-accent-foreground)}.tw\\:group-data-\\[variant\\=default\\]\\/tabs-list\\:data-active\\:shadow-sm:is(:where(.tw\\:group\\/tabs-list)[data-variant=default] *):where([data-state=active]),.tw\\:group-data-\\[variant\\=default\\]\\/tabs-list\\:data-active\\:shadow-sm:is(:where(.tw\\:group\\/tabs-list)[data-variant=default] *):where([data-active]:not([data-active=false])){--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:bg-transparent:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:bg-transparent:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false])){background-color:#0000}.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:shadow-none:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:shadow-none:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false])){--tw-shadow:0 0 #0000;box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}:is(.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:after\\:opacity-100:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:after\\:opacity-100:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false]))):after{content:var(--tw-content);opacity:1}.tw\\:dark\\:data-active\\:border-input:is(.dark *):where([data-state=active]),.tw\\:dark\\:data-active\\:border-input:is(.dark *):where([data-active]:not([data-active=false])){border-color:var(--input)}.tw\\:dark\\:data-active\\:bg-input\\/30:is(.dark *):where([data-state=active]),.tw\\:dark\\:data-active\\:bg-input\\/30:is(.dark *):where([data-active]:not([data-active=false])){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:data-active\\:bg-input\\/30:is(.dark *):where([data-state=active]),.tw\\:dark\\:data-active\\:bg-input\\/30:is(.dark *):where([data-active]:not([data-active=false])){background-color:color-mix(in oklab, var(--input) 30%, transparent)}}.tw\\:dark\\:data-active\\:text-foreground:is(.dark *):where([data-state=active]),.tw\\:dark\\:data-active\\:text-foreground:is(.dark *):where([data-active]:not([data-active=false])){color:var(--foreground)}.tw\\:dark\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:border-transparent:is(.dark *):is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:dark\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:border-transparent:is(.dark *):is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false])){border-color:#0000}.tw\\:dark\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:bg-transparent:is(.dark *):is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:dark\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:bg-transparent:is(.dark *):is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false])){background-color:#0000}.tw\\:data-horizontal\\:mx-px:where([data-orientation=horizontal]){margin-inline:1px}.tw\\:data-horizontal\\:h-1:where([data-orientation=horizontal]){height:calc(calc(var(--spacing)) * 1)}.tw\\:data-horizontal\\:h-full:where([data-orientation=horizontal]){height:100%}.tw\\:data-horizontal\\:h-px:where([data-orientation=horizontal]){height:1px}.tw\\:data-horizontal\\:w-auto:where([data-orientation=horizontal]){width:auto}.tw\\:data-horizontal\\:w-full:where([data-orientation=horizontal]){width:100%}.tw\\:data-horizontal\\:flex-col:where([data-orientation=horizontal]){flex-direction:column}.tw\\:data-vertical\\:my-px:where([data-orientation=vertical]){margin-block:1px}.tw\\:data-vertical\\:h-auto:where([data-orientation=vertical]){height:auto}.tw\\:data-vertical\\:h-full:where([data-orientation=vertical]){height:100%}.tw\\:data-vertical\\:min-h-40:where([data-orientation=vertical]){min-height:calc(calc(var(--spacing)) * 40)}.tw\\:data-vertical\\:w-1:where([data-orientation=vertical]){width:calc(calc(var(--spacing)) * 1)}.tw\\:data-vertical\\:w-auto:where([data-orientation=vertical]){width:auto}.tw\\:data-vertical\\:w-full:where([data-orientation=vertical]){width:100%}.tw\\:data-vertical\\:w-px:where([data-orientation=vertical]){width:1px}.tw\\:data-vertical\\:flex-col:where([data-orientation=vertical]){flex-direction:column}.tw\\:data-vertical\\:items-stretch:where([data-orientation=vertical]){align-items:stretch}.tw\\:data-vertical\\:self-stretch:where([data-orientation=vertical]){align-self:stretch}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:mt-0 [data-lexical-editor=true]>blockquote{margin-top:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:border-s-0 [data-lexical-editor=true]>blockquote{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:ps-0 [data-lexical-editor=true]>blockquote{padding-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:font-normal [data-lexical-editor=true]>blockquote{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:text-foreground [data-lexical-editor=true]>blockquote{color:var(--foreground)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:not-italic [data-lexical-editor=true]>blockquote{font-style:normal}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:mt-0 [data-lexical-editor=\\"true\\"]>blockquote{margin-top:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:border-s-0 [data-lexical-editor=\\"true\\"]>blockquote{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:ps-0 [data-lexical-editor=\\"true\\"]>blockquote{padding-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:font-normal [data-lexical-editor=\\"true\\"]>blockquote{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:text-foreground [data-lexical-editor=\\"true\\"]>blockquote{color:var(--foreground)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:not-italic [data-lexical-editor=\\"true\\"]>blockquote{font-style:normal}.tw\\:\\[\\&_a\\]\\:underline a{text-decoration-line:underline}.tw\\:\\[\\&_a\\]\\:underline-offset-3 a{text-underline-offset:3px}@media (hover:hover){.tw\\:\\[\\&_a\\]\\:hover\\:text-foreground a:hover{color:var(--foreground)}}.tw\\:\\[\\&_p\\]\\:my-0 p{margin-block:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_p\\:not\\(\\:last-child\\)\\]\\:mb-4 p:not(:last-child){margin-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&_s\\]\\:text-destructive s{color:var(--destructive)}.tw\\:\\[\\&_s\\]\\:line-through s{text-decoration-line:line-through}.tw\\:\\[\\&_svg\\]\\:pointer-events-none svg{pointer-events:none}.tw\\:\\[\\&_svg\\]\\:size-4 svg{width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&_svg\\]\\:shrink-0 svg{flex-shrink:0}.tw\\:\\[\\&_svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-3 svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:\\[\\&_svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-3\\.5 svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 3.5);height:calc(calc(var(--spacing)) * 3.5)}.tw\\:\\[\\&_svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-4 svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&_tr\\]\\:border-b tr{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}.tw\\:\\[\\&_tr\\:last-child\\]\\:border-0 tr:last-child{border-style:var(--tw-border-style);border-width:0}.tw\\:\\[\\&_u\\]\\:font-semibold u{--tw-font-weight:var(--tw-font-weight-semibold);font-weight:var(--tw-font-weight-semibold)}.tw\\:\\[\\&_u\\]\\:text-success-foreground u{color:var(--success-foreground)}.tw\\:\\[\\&_u\\]\\:no-underline u{text-decoration-line:none}.tw\\:\\[\\&\\:has\\(\\[role\\=checkbox\\]\\)\\]\\:pe-0:has([role=checkbox]){padding-inline-end:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\.border-b\\]\\:pb-2.border-b{padding-bottom:calc(calc(var(--spacing)) * 2)}.tw\\:\\[\\.border-b\\]\\:pb-4.border-b{padding-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[size\\=sm\\]\\/card\\:\\[\\.border-b\\]\\:pb-3:is(:where(.tw\\:group\\/card)[data-size=sm] *).border-b{padding-bottom:calc(calc(var(--spacing)) * 3)}.tw\\:\\[\\.border-t\\]\\:pt-2.border-t{padding-top:calc(calc(var(--spacing)) * 2)}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:px-2 *)[cmdk-group-heading]{padding-inline:calc(calc(var(--spacing)) * 2)}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:py-1\\.5 *)[cmdk-group-heading]{padding-block:calc(calc(var(--spacing)) * 1.5)}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:text-xs *)[cmdk-group-heading]{font-size:var(--tw-text-xs);line-height:var(--tw-leading,var(--tw-text-xs--line-height))}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:font-medium *)[cmdk-group-heading]{--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:text-muted-foreground *)[cmdk-group-heading]{color:var(--muted-foreground)}:is(.tw\\:\\*\\:\\[a\\]\\:underline>*):is(a){text-decoration-line:underline}:is(.tw\\:\\*\\:\\[a\\]\\:underline-offset-3>*):is(a){text-underline-offset:3px}@media (hover:hover){.tw\\:\\[a\\]\\:hover\\:bg-destructive\\/20:is(a):hover{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:\\[a\\]\\:hover\\:bg-destructive\\/20:is(a):hover{background-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:\\[a\\]\\:hover\\:bg-muted:is(a):hover{background-color:var(--muted)}.tw\\:\\[a\\]\\:hover\\:bg-primary\\/80:is(a):hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:\\[a\\]\\:hover\\:bg-primary\\/80:is(a):hover{background-color:color-mix(in oklab, var(--primary) 80%, transparent)}}.tw\\:\\[a\\]\\:hover\\:bg-secondary\\/80:is(a):hover{background-color:var(--secondary)}@supports (color:color-mix(in lab, red, red)){.tw\\:\\[a\\]\\:hover\\:bg-secondary\\/80:is(a):hover{background-color:color-mix(in oklab, var(--secondary) 80%, transparent)}}.tw\\:\\[a\\]\\:hover\\:text-muted-foreground:is(a):hover{color:var(--muted-foreground)}:is(.tw\\:\\*\\:\\[a\\]\\:hover\\:text-foreground>*):is(a):hover{color:var(--foreground)}}:is(.tw\\:\\*\\:\\[img\\]\\:row-span-2>*):is(img){grid-row:span 2/span 2}:is(.tw\\:\\*\\:\\[img\\]\\:translate-y-0\\.5>*):is(img){--tw-translate-y:calc(calc(var(--spacing)) * .5);translate:var(--tw-translate-x) var(--tw-translate-y)}:is(.tw\\:\\*\\:\\[img\\]\\:text-current>*):is(img){color:currentColor}:is(.tw\\:\\*\\:\\[img\\:first-child\\]\\:rounded-t-xl>*):is(img:first-child){border-top-left-radius:calc(var(--radius) * 1.4);border-top-right-radius:calc(var(--radius) * 1.4)}:is(.tw\\:\\*\\:\\[img\\:last-child\\]\\:rounded-b-xl>*):is(img:last-child){border-bottom-right-radius:calc(var(--radius) * 1.4);border-bottom-left-radius:calc(var(--radius) * 1.4)}:is(.tw\\:\\*\\:\\[img\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-4>*):is(img:not([class*=size-])){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}:is(.tw\\:\\*\\:\\[span\\]\\:last\\:flex>*):is(span):last-child{display:flex}:is(.tw\\:\\*\\:\\[span\\]\\:last\\:items-center>*):is(span):last-child{align-items:center}:is(.tw\\:\\*\\:\\[span\\]\\:last\\:gap-2>*):is(span):last-child{gap:calc(calc(var(--spacing)) * 2)}:is(.tw\\:\\*\\:\\[svg\\]\\:row-span-2>*):is(svg){grid-row:span 2/span 2}:is(.tw\\:\\*\\:\\[svg\\]\\:translate-y-0\\.5>*):is(svg){--tw-translate-y:calc(calc(var(--spacing)) * .5);translate:var(--tw-translate-x) var(--tw-translate-y)}:is(.tw\\:\\*\\:\\[svg\\]\\:text-current>*):is(svg){color:currentColor}:is(.tw\\:focus\\:\\*\\:\\[svg\\]\\:text-accent-foreground:focus>*):is(svg){color:var(--accent-foreground)}:is(.tw\\:data-\\[variant\\=destructive\\]\\:\\*\\:\\[svg\\]\\:text-destructive[data-variant=destructive]>*):is(svg){color:var(--destructive)}:is(.tw\\:data-\\[variant\\=destructive\\]\\:\\*\\:\\[svg\\]\\:text-destructive\\![data-variant=destructive]>*):is(svg){color:var(--destructive)!important}:is(.tw\\:data-selected\\:\\*\\:\\[svg\\]\\:text-foreground:where([data-selected=true])>*):is(svg){color:var(--foreground)}:is(.tw\\:\\*\\:\\[svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-4>*):is(svg:not([class*=size-])){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:rounded-s-none>:not(:first-child){border-start-start-radius:0;border-end-start-radius:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:rounded-t-none>:not(:first-child){border-top-left-radius:0;border-top-right-radius:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:border-s-0>:not(:first-child){border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:border-t-0>:not(:first-child){border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:last-child\\)\\]\\:rounded-e-none>:not(:last-child){border-start-end-radius:0;border-end-end-radius:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:last-child\\)\\]\\:rounded-b-none>:not(:last-child){border-bottom-right-radius:0;border-bottom-left-radius:0}.tw\\:has-\\[select\\[aria-hidden\\=true\\]\\:last-child\\]\\:\\[\\&\\>\\[data-slot\\=select-trigger\\]\\:last-of-type\\]\\:rounded-e-lg:has(:is(select[aria-hidden=true]:last-child))>[data-slot=select-trigger]:last-of-type{border-start-end-radius:var(--radius);border-end-end-radius:var(--radius)}.tw\\:\\[\\&\\>\\[data-slot\\=select-trigger\\]\\:not\\(\\[class\\*\\=w-\\]\\)\\]\\:w-fit>[data-slot=select-trigger]:not([class*=w-]){width:fit-content}.tw\\:\\[\\&\\>\\[data-slot\\]\\:not\\(\\:has\\(\\~\\[data-slot\\]\\)\\)\\]\\:rounded-e-lg\\!>[data-slot]:not(:has(~[data-slot])){border-start-end-radius:var(--radius)!important;border-end-end-radius:var(--radius)!important}.tw\\:\\[\\&\\>\\[data-slot\\]\\:not\\(\\:has\\(\\~\\[data-slot\\]\\)\\)\\]\\:rounded-b-lg\\!>[data-slot]:not(:has(~[data-slot])){border-bottom-right-radius:var(--radius)!important;border-bottom-left-radius:var(--radius)!important}.tw\\:\\[\\&\\>a\\]\\:underline>a{text-decoration-line:underline}.tw\\:\\[\\&\\>a\\]\\:underline-offset-4>a{text-underline-offset:4px}.tw\\:\\[\\&\\>a\\:hover\\]\\:text-primary>a:hover{color:var(--primary)}.tw\\:\\[\\&\\>blockquote\\]\\:my-0>blockquote{margin-block:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&\\>blockquote\\]\\:border-s-0>blockquote{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&\\>blockquote\\]\\:p-0>blockquote{padding:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&\\>blockquote\\]\\:ps-0>blockquote{padding-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&\\>blockquote\\]\\:font-normal>blockquote{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:\\[\\&\\>blockquote\\]\\:text-foreground>blockquote{color:var(--foreground)}.tw\\:\\[\\&\\>blockquote\\]\\:not-italic>blockquote{font-style:normal}.tw\\:\\[\\&\\>input\\]\\:flex-1>input{flex:1}.tw\\:has-\\[\\>\\[data-align\\=block-end\\]\\]\\:\\[\\&\\>input\\]\\:pt-3:has(>[data-align=block-end])>input{padding-top:calc(calc(var(--spacing)) * 3)}.tw\\:has-\\[\\>\\[data-align\\=block-start\\]\\]\\:\\[\\&\\>input\\]\\:pb-3:has(>[data-align=block-start])>input{padding-bottom:calc(calc(var(--spacing)) * 3)}.tw\\:has-\\[\\>\\[data-align\\=inline-end\\]\\]\\:\\[\\&\\>input\\]\\:pe-1\\.5:has(>[data-align=inline-end])>input{padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-\\[\\>\\[data-align\\=inline-start\\]\\]\\:\\[\\&\\>input\\]\\:ps-1\\.5:has(>[data-align=inline-start])>input{padding-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:\\[\\&\\>kbd\\]\\:rounded-\\[calc\\(var\\(--radius\\)-5px\\)\\]>kbd{border-radius:calc(var(--radius) - 5px)}.tw\\:\\[\\&\\>li\\]\\:mt-2>li{margin-top:calc(calc(var(--spacing)) * 2)}.tw\\:\\[\\&\\>span\\:last-child\\]\\:truncate>span:last-child{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.tw\\:\\[\\&\\>svg\\]\\:pointer-events-none>svg{pointer-events:none}.tw\\:\\[\\&\\>svg\\]\\:hidden>svg{display:none}.tw\\:\\[\\&\\>svg\\]\\:size-3\\!>svg{width:calc(calc(var(--spacing)) * 3)!important;height:calc(calc(var(--spacing)) * 3)!important}.tw\\:\\[\\&\\>svg\\]\\:size-3\\.5>svg{width:calc(calc(var(--spacing)) * 3.5);height:calc(calc(var(--spacing)) * 3.5)}.tw\\:\\[\\&\\>svg\\]\\:size-4>svg{width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&\\>svg\\]\\:shrink-0>svg{flex-shrink:0}.tw\\:\\[\\&\\>svg\\]\\:text-sidebar-accent-foreground>svg{color:var(--sidebar-accent-foreground)}.tw\\:group-has-data-\\[size\\=lg\\]\\/avatar-group\\:\\[\\&\\>svg\\]\\:size-5:is(:where(.tw\\:group\\/avatar-group):has([data-size=lg]) *)>svg{width:calc(calc(var(--spacing)) * 5);height:calc(calc(var(--spacing)) * 5)}.tw\\:group-has-data-\\[size\\=sm\\]\\/avatar-group\\:\\[\\&\\>svg\\]\\:size-3:is(:where(.tw\\:group\\/avatar-group):has([data-size=sm]) *)>svg{width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[size\\=default\\]\\/avatar\\:\\[\\&\\>svg\\]\\:size-2:is(:where(.tw\\:group\\/avatar)[data-size=default] *)>svg,.tw\\:group-data-\\[size\\=lg\\]\\/avatar\\:\\[\\&\\>svg\\]\\:size-2:is(:where(.tw\\:group\\/avatar)[data-size=lg] *)>svg{width:calc(calc(var(--spacing)) * 2);height:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[size\\=sm\\]\\/avatar\\:\\[\\&\\>svg\\]\\:hidden:is(:where(.tw\\:group\\/avatar)[data-size=sm] *)>svg,.tw\\:\\[\\&\\>svg\\:last-child\\]\\:hidden>svg:last-child{display:none}.tw\\:\\[\\&\\>svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-3\\.5>svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 3.5);height:calc(calc(var(--spacing)) * 3.5)}.tw\\:\\[\\&\\>svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-4>svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&\\>tr\\]\\:last\\:border-b-0>tr:last-child{border-bottom-style:var(--tw-border-style);border-bottom-width:0}.tw\\:\\[\\&\\[align\\=center\\]\\]\\:text-center[align=center]{text-align:center}.tw\\:\\[\\&\\[align\\=right\\]\\]\\:text-right[align=right]{text-align:right}.tw\\:\\[\\&\\[aria-orientation\\=horizontal\\]\\>div\\]\\:rotate-90[aria-orientation=horizontal]>div{rotate:90deg}[data-side=primary][data-collapsible=offcanvas] .tw\\:\\[\\[data-side\\=primary\\]\\[data-collapsible\\=offcanvas\\]_\\&\\]\\:-end-2{inset-inline-end:calc(calc(var(--spacing)) * -2)}[data-side=primary][data-state=collapsed] .tw\\:\\[\\[data-side\\=primary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-e-resize{cursor:e-resize}[data-side=primary][data-state=collapsed] .tw\\:rtl\\:\\[\\[data-side\\=primary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-w-resize:where(:dir(rtl),[dir=rtl],[dir=rtl] *){cursor:w-resize}[data-side=secondary][data-collapsible=offcanvas] .tw\\:\\[\\[data-side\\=secondary\\]\\[data-collapsible\\=offcanvas\\]_\\&\\]\\:-start-2{inset-inline-start:calc(calc(var(--spacing)) * -2)}[data-side=secondary][data-state=collapsed] .tw\\:\\[\\[data-side\\=secondary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-w-resize{cursor:w-resize}[data-side=secondary][data-state=collapsed] .tw\\:rtl\\:\\[\\[data-side\\=secondary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-e-resize:where(:dir(rtl),[dir=rtl],[dir=rtl] *){cursor:e-resize}}@property --tw-animation-delay{syntax:"*";inherits:false;initial-value:0s}@property --tw-animation-direction{syntax:"*";inherits:false;initial-value:normal}@property --tw-animation-duration{syntax:"*";inherits:false}@property --tw-animation-fill-mode{syntax:"*";inherits:false;initial-value:none}@property --tw-animation-iteration-count{syntax:"*";inherits:false;initial-value:1}@property --tw-enter-blur{syntax:"*";inherits:false;initial-value:0}@property --tw-enter-opacity{syntax:"*";inherits:false;initial-value:1}@property --tw-enter-rotate{syntax:"*";inherits:false;initial-value:0}@property --tw-enter-scale{syntax:"*";inherits:false;initial-value:1}@property --tw-enter-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-enter-translate-y{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-blur{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-opacity{syntax:"*";inherits:false;initial-value:1}@property --tw-exit-rotate{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-scale{syntax:"*";inherits:false;initial-value:1}@property --tw-exit-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-translate-y{syntax:"*";inherits:false;initial-value:0}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-cyrillic-ext-wght-normal.woff2)format("woff2-variations");unicode-range:U+460-52F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-cyrillic-wght-normal.woff2)format("woff2-variations");unicode-range:U+301,U+400-45F,U+490-491,U+4B0-4B1,U+2116}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-greek-wght-normal.woff2)format("woff2-variations");unicode-range:U+370-377,U+37A-37F,U+384-38A,U+38C,U+38E-3A1,U+3A3-3FF}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-vietnamese-wght-normal.woff2)format("woff2-variations");unicode-range:U+102-103,U+110-111,U+128-129,U+168-169,U+1A0-1A1,U+1AF-1B0,U+300-301,U+303-304,U+308-309,U+323,U+329,U+1EA0-1EF9,U+20AB}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-latin-ext-wght-normal.woff2)format("woff2-variations");unicode-range:U+100-2BA,U+2BD-2C5,U+2C7-2CC,U+2CE-2D7,U+2DD-2FF,U+304,U+308,U+329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-latin-wght-normal.woff2)format("woff2-variations");unicode-range:U+??,U+131,U+152-153,U+2BB-2BC,U+2C6,U+2DA,U+2DC,U+304,U+308,U+329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}.light,:root{--radius:.625rem;--spacing:.25rem;--background:oklch(100% 0 0);--foreground:oklch(13.71% .036 258.53);--card:oklch(100% 0 0);--card-foreground:oklch(13.71% .036 258.53);--popover:oklch(98.43% .0018 248.56);--popover-foreground:oklch(13.71% .036 258.53);--primary:oklch(20.79% .0399 265.73);--primary-foreground:oklch(98.38% .0036 248.23);--secondary:oklch(95.89% .011 248.06);--secondary-foreground:oklch(20.79% .0399 265.73);--muted:oklch(95.89% .011 248.06);--muted-foreground:oklch(55.47% .0408 257.45);--accent:oklch(95.89% .011 248.06);--accent-foreground:oklch(20.79% .0399 265.73);--destructive:oklch(63.69% .2077 25.32);--destructive-foreground:oklch(98.38% .0036 248.23);--success-foreground:oklch(62.7% .194 149.214);--diff-deleted:oklch(57.7% .245 27.325);--warning:oklch(84% .16 84);--warning-foreground:oklch(28% .07 46);--border:oklch(92.9% .0127 255.58);--input:oklch(92.9% .0127 255.58);--ring:oklch(13.71% .036 258.53);--chart-1:oklch(64.6% .222 41.116);--chart-2:oklch(60% .118 184.704);--chart-3:oklch(39.8% .07 227.392);--chart-4:oklch(82.8% .189 84.429);--chart-5:oklch(76.9% .188 70.08);--sidebar:oklch(98.43% .0018 248.56);--sidebar-foreground:oklch(13.71% .036 258.53);--sidebar-primary:oklch(20.79% .0399 265.73);--sidebar-primary-foreground:oklch(98.38% .0036 248.23);--sidebar-accent:oklch(95.89% .011 248.06);--sidebar-accent-foreground:oklch(20.79% .0399 265.73);--sidebar-border:oklch(92.9% .0127 255.58);--sidebar-ring:oklch(13.71% .036 258.53)}.dark{--background:oklch(13.71% .036 258.53);--foreground:oklch(98.38% .0036 248.23);--card:oklch(13.71% .036 258.53);--card-foreground:oklch(98.38% .0036 248.23);--popover:oklch(13.71% .036 258.53);--popover-foreground:oklch(98.38% .0036 248.23);--primary:oklch(98.38% .0036 248.23);--primary-foreground:oklch(20.79% .0399 265.73);--secondary:oklch(28% .037 259.98);--secondary-foreground:oklch(98.38% .0036 248.23);--muted:oklch(28% .037 259.98);--muted-foreground:oklch(71.07% .0351 256.8);--accent:oklch(28% .037 259.98);--accent-foreground:oklch(98.38% .0036 248.23);--destructive:oklch(39.6% .1331 25.71);--destructive-foreground:oklch(98.38% .0036 248.23);--success-foreground:oklch(79.2% .209 151.711);--diff-deleted:oklch(70.4% .191 22.216);--warning:oklch(41% .11 46);--warning-foreground:oklch(99% .02 95);--border:oklch(44.54% .0374 257.3);--input:oklch(44.54% .0374 257.3);--ring:oklch(86.88% .0199 252.89);--chart-1:oklch(48.8% .243 264.376);--chart-2:oklch(69.6% .17 162.48);--chart-3:oklch(76.9% .188 70.08);--chart-4:oklch(62.7% .265 303.9);--chart-5:oklch(64.5% .246 16.439);--sidebar:oklch(13.71% .036 258.53);--sidebar-foreground:oklch(71.07% .0351 256.8);--sidebar-primary:oklch(98.38% .0036 248.23);--sidebar-primary-foreground:oklch(20.79% .0399 265.73);--sidebar-accent:oklch(28% .037 259.98);--sidebar-accent-foreground:oklch(71.07% .0351 256.8);--sidebar-border:oklch(28% .037 259.98);--sidebar-ring:oklch(86.88% .0199 252.89)}.paratext-light{--background:oklch(100% 0 0);--foreground:oklch(15.3% .006 107.1);--card:oklch(100% 0 0);--card-foreground:oklch(15.3% .006 107.1);--popover:oklch(100% 0 0);--popover-foreground:oklch(15.3% .006 107.1);--primary:oklch(55.5% .163 48.998);--primary-foreground:oklch(98.7% .022 95.277);--secondary:oklch(96.7% .001 286.375);--secondary-foreground:oklch(21% .006 285.885);--muted:oklch(96.6% .005 106.5);--muted-foreground:oklch(58% .031 107.3);--accent:oklch(96.6% .005 106.5);--accent-foreground:oklch(22.8% .013 107.4);--destructive:oklch(57.7% .245 27.325);--destructive-foreground:oklch(98.38% .0036 248.23);--success-foreground:oklch(62.7% .194 149.214);--diff-deleted:oklch(57.7% .245 27.325);--warning:oklch(84% .16 84);--warning-foreground:oklch(28% .07 46);--border:oklch(93% .007 106.5);--input:oklch(93% .007 106.5);--ring:oklch(73.7% .021 106.9);--chart-1:oklch(88% .011 106.6);--chart-2:oklch(58% .031 107.3);--chart-3:oklch(46.6% .025 107.3);--chart-4:oklch(39.4% .023 107.4);--chart-5:oklch(28.6% .016 107.4);--sidebar:oklch(98.8% .003 106.5);--sidebar-foreground:oklch(15.3% .006 107.1);--sidebar-primary:oklch(66.6% .179 58.318);--sidebar-primary-foreground:oklch(98.7% .022 95.277);--sidebar-accent:oklch(96.6% .005 106.5);--sidebar-accent-foreground:oklch(22.8% .013 107.4);--sidebar-border:oklch(93% .007 106.5);--sidebar-ring:oklch(73.7% .021 106.9)}.paratext-dark{--background:oklch(15.3% .006 107.1);--foreground:oklch(98.8% .003 106.5);--card:oklch(22.8% .013 107.4);--card-foreground:oklch(98.8% .003 106.5);--popover:oklch(22.8% .013 107.4);--popover-foreground:oklch(98.8% .003 106.5);--primary:oklch(47.3% .137 46.201);--primary-foreground:oklch(98.7% .022 95.277);--secondary:oklch(27.4% .006 286.033);--secondary-foreground:oklch(98.5% 0 0);--muted:oklch(28.6% .016 107.4);--muted-foreground:oklch(73.7% .021 106.9);--accent:oklch(28.6% .016 107.4);--accent-foreground:oklch(98.8% .003 106.5);--destructive:oklch(70.4% .191 22.216);--destructive-foreground:oklch(98.38% .0036 248.23);--success-foreground:oklch(79.2% .209 151.711);--diff-deleted:oklch(70.4% .191 22.216);--warning:oklch(41% .11 46);--warning-foreground:oklch(99% .02 95);--border:oklch(100% 0 0/.1);--input:oklch(100% 0 0/.15);--ring:oklch(58% .031 107.3);--chart-1:oklch(88% .011 106.6);--chart-2:oklch(58% .031 107.3);--chart-3:oklch(46.6% .025 107.3);--chart-4:oklch(39.4% .023 107.4);--chart-5:oklch(28.6% .016 107.4);--sidebar:oklch(22.8% .013 107.4);--sidebar-foreground:oklch(98.8% .003 106.5);--sidebar-primary:oklch(76.9% .188 70.08);--sidebar-primary-foreground:oklch(27.9% .077 45.635);--sidebar-accent:oklch(28.6% .016 107.4);--sidebar-accent-foreground:oklch(98.8% .003 106.5);--sidebar-border:oklch(100% 0 0/.1);--sidebar-ring:oklch(58% .031 107.3)}@property --tw-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-y{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-z{syntax:"*";inherits:false;initial-value:0}@property --tw-rotate-x{syntax:"*";inherits:false}@property --tw-rotate-y{syntax:"*";inherits:false}@property --tw-rotate-z{syntax:"*";inherits:false}@property --tw-skew-x{syntax:"*";inherits:false}@property --tw-skew-y{syntax:"*";inherits:false}@property --tw-space-y-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-space-x-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-divide-x-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-border-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-divide-y-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-gradient-position{syntax:"*";inherits:false}@property --tw-gradient-from{syntax:"<color>";inherits:false;initial-value:#0000}@property --tw-gradient-via{syntax:"<color>";inherits:false;initial-value:#0000}@property --tw-gradient-to{syntax:"<color>";inherits:false;initial-value:#0000}@property --tw-gradient-stops{syntax:"*";inherits:false}@property --tw-gradient-via-stops{syntax:"*";inherits:false}@property --tw-gradient-from-position{syntax:"<length-percentage>";inherits:false;initial-value:0%}@property --tw-gradient-via-position{syntax:"<length-percentage>";inherits:false;initial-value:50%}@property --tw-gradient-to-position{syntax:"<length-percentage>";inherits:false;initial-value:100%}@property --tw-leading{syntax:"*";inherits:false}@property --tw-font-weight{syntax:"*";inherits:false}@property --tw-tracking{syntax:"*";inherits:false}@property --tw-ordinal{syntax:"*";inherits:false}@property --tw-slashed-zero{syntax:"*";inherits:false}@property --tw-numeric-figure{syntax:"*";inherits:false}@property --tw-numeric-spacing{syntax:"*";inherits:false}@property --tw-numeric-fraction{syntax:"*";inherits:false}@property --tw-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-shadow-color{syntax:"*";inherits:false}@property --tw-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-inset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-shadow-color{syntax:"*";inherits:false}@property --tw-inset-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-ring-color{syntax:"*";inherits:false}@property --tw-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-ring-color{syntax:"*";inherits:false}@property --tw-inset-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-ring-inset{syntax:"*";inherits:false}@property --tw-ring-offset-width{syntax:"<length>";inherits:false;initial-value:0}@property --tw-ring-offset-color{syntax:"*";inherits:false;initial-value:#fff}@property --tw-ring-offset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-blur{syntax:"*";inherits:false}@property --tw-brightness{syntax:"*";inherits:false}@property --tw-contrast{syntax:"*";inherits:false}@property --tw-grayscale{syntax:"*";inherits:false}@property --tw-hue-rotate{syntax:"*";inherits:false}@property --tw-invert{syntax:"*";inherits:false}@property --tw-opacity{syntax:"*";inherits:false}@property --tw-saturate{syntax:"*";inherits:false}@property --tw-sepia{syntax:"*";inherits:false}@property --tw-drop-shadow{syntax:"*";inherits:false}@property --tw-drop-shadow-color{syntax:"*";inherits:false}@property --tw-drop-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-drop-shadow-size{syntax:"*";inherits:false}@property --tw-duration{syntax:"*";inherits:false}@property --tw-ease{syntax:"*";inherits:false}@property --tw-content{syntax:"*";inherits:false;initial-value:""}@property --tw-outline-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-backdrop-blur{syntax:"*";inherits:false}@property --tw-backdrop-brightness{syntax:"*";inherits:false}@property --tw-backdrop-contrast{syntax:"*";inherits:false}@property --tw-backdrop-grayscale{syntax:"*";inherits:false}@property --tw-backdrop-hue-rotate{syntax:"*";inherits:false}@property --tw-backdrop-invert{syntax:"*";inherits:false}@property --tw-backdrop-opacity{syntax:"*";inherits:false}@property --tw-backdrop-saturate{syntax:"*";inherits:false}@property --tw-backdrop-sepia{syntax:"*";inherits:false}@keyframes spin{to{transform:rotate(360deg)}}@keyframes pulse{50%{opacity:.5}}@keyframes enter{0%{opacity:var(--tw-enter-opacity,1);transform:translate3d(var(--tw-enter-translate-x,0),var(--tw-enter-translate-y,0),0)scale3d(var(--tw-enter-scale,1),var(--tw-enter-scale,1),var(--tw-enter-scale,1))rotate(var(--tw-enter-rotate,0));filter:blur(var(--tw-enter-blur,0))}}@keyframes exit{to{opacity:var(--tw-exit-opacity,1);transform:translate3d(var(--tw-exit-translate-x,0),var(--tw-exit-translate-y,0),0)scale3d(var(--tw-exit-scale,1),var(--tw-exit-scale,1),var(--tw-exit-scale,1))rotate(var(--tw-exit-rotate,0));filter:blur(var(--tw-exit-blur,0))}}
`, "after-all");
export {
  Hf as Alert,
  qf as AlertDescription,
  Gf as AlertTitle,
  cu as Avatar,
  lu as AvatarFallback,
  tg as AvatarImage,
  Bh as BOOK_CHAPTER_CONTROL_STRING_KEYS,
  jh as BOOK_SELECTOR_STRING_KEYS,
  Yr as Badge,
  Xa as BookChapterControl,
  _o as BookSelectionMode,
  Fh as BookSelector,
  ot as Button,
  Aa as ButtonGroup,
  Ro as ButtonGroupSeparator,
  Wf as ButtonGroupText,
  ws as CANCEL_ACCEPT_BUTTONS_STRING_KEYS,
  Gh as COMMENT_EDITOR_STRING_KEYS,
  nu as COMMENT_LIST_ELEMENT_ID,
  Wh as COMMENT_LIST_STRING_KEYS,
  Hh as CONFLICT_NOTE_STRING_KEYS,
  ss as CONTENT_ZOOM_LABEL_ATTRIBUTE,
  is as CONTENT_ZOOM_ROOT_ATTRIBUTE,
  Uh as CONTENT_ZOOM_SCOPE_ATTRIBUTE,
  us as CancelAcceptButtons,
  iu as Card,
  su as CardContent,
  Jh as CardDescription,
  Qh as CardFooter,
  Zh as CardHeader,
  Xh as CardTitle,
  jd as ChapterRangeSelector,
  ks as Checkbox,
  Xg as CheckboxGroup,
  nh as Checklist,
  _n as ComboBox,
  br as Command,
  $a as CommandEmpty,
  ir as CommandGroup,
  za as CommandInput,
  lr as CommandItem,
  xr as CommandList,
  qh as CommentEditor,
  eg as CommentList,
  pu as ConflictNoteCard,
  bu as ContentZoomRoot,
  Kh as ContentZoomTextProvider,
  rf as ContextMenu,
  pf as ContextMenuCheckboxItem,
  lf as ContextMenuContent,
  of as ContextMenuGroup,
  df as ContextMenuItem,
  gf as ContextMenuLabel,
  nf as ContextMenuPortal,
  cf as ContextMenuRadioGroup,
  hf as ContextMenuRadioItem,
  ff as ContextMenuSeparator,
  mf as ContextMenuShortcut,
  sf as ContextMenuSub,
  uf as ContextMenuSubContent,
  wf as ContextMenuSubTrigger,
  af as ContextMenuTrigger,
  Cu as DataTable,
  Jg as DestructiveKeyConfirmation,
  lo as Dialog,
  Yf as DialogClose,
  wo as DialogContent,
  Zf as DialogDescription,
  nn as DialogFooter,
  uo as DialogHeader,
  Xf as DialogOverlay,
  Jf as DialogPortal,
  po as DialogTitle,
  Qf as DialogTrigger,
  Mp as DisabledActionTooltip,
  Qr as DisabledTooltipWrapper,
  vf as Drawer,
  xf as DrawerClose,
  yf as DrawerContent,
  Cf as DrawerDescription,
  _f as DrawerFooter,
  kf as DrawerHeader,
  ch as DrawerOverlay,
  sh as DrawerPortal,
  Nf as DrawerTitle,
  bf as DrawerTrigger,
  Xe as DropdownMenu,
  nr as DropdownMenuCheckboxItem,
  Je as DropdownMenuContent,
  ti as DropdownMenuGroup,
  rr as DropdownMenuItem,
  Su as DropdownMenuItemType,
  fr as DropdownMenuLabel,
  ic as DropdownMenuPortal,
  Hs as DropdownMenuRadioGroup,
  qs as DropdownMenuRadioItem,
  pr as DropdownMenuSeparator,
  ac as DropdownMenuShortcut,
  oc as DropdownMenuSub,
  sc as DropdownMenuSubContent,
  nc as DropdownMenuSubTrigger,
  je as DropdownMenuTrigger,
  Eu as ERROR_DUMP_STRING_KEYS,
  ng as ERROR_POPOVER_STRING_KEYS,
  zu as EditorKeyboardShortcuts,
  tm as Empty,
  em as EmptyContent,
  rm as EmptyDescription,
  am as EmptyHeader,
  om as EmptyMedia,
  nm as EmptyState,
  im as EmptyTitle,
  Tu as ErrorDump,
  ig as ErrorPopover,
  ug as FOOTNOTE_EDITOR_STRING_KEYS,
  dg as Filter,
  sg as FilterDropdown,
  lg as Footer,
  wg as FootnoteEditor,
  op as FootnoteItem,
  pg as FootnoteList,
  Qu as INLINE_APPLY_DEBOUNCE_MS,
  Yg as INTERFACE_LANGUAGE_PICKER_STRING_KEYS,
  xg as INVENTORY_STRING_KEYS,
  Va as Input,
  Zg as InterfaceLanguagePicker,
  yg as Inventory,
  ho as Kbd,
  sm as KbdGroup,
  It as Label,
  Ku as MARKER_MENU_STRING_KEYS,
  og as MarkdownRenderer,
  Gu as MarkerMenu,
  cg as MoreInfo,
  Gs as MultiSelectComboBox,
  Hg as NavigationContentSearch,
  mr as Popover,
  Js as PopoverAnchor,
  vr as PopoverContent,
  cm as PopoverDescription,
  lm as PopoverHeader,
  qa as PopoverPortalContainerProvider,
  dm as PopoverTitle,
  Pr as PopoverTrigger,
  Ef as Progress,
  Oo as RadioGroup,
  Ca as RadioGroupItem,
  Rd as RecentSearches,
  wm as ResizableHandle,
  um as ResizablePanel,
  pm as ResizablePanelGroup,
  Qg as ResultsCard,
  hm as RetryableErrorView,
  $g as SCOPE_SELECTOR_STRING_KEYS,
  zp as SELECT_BOOKS_STRING_KEYS,
  Gr as SHRINK_STEP,
  Vg as ScopeSelector,
  Ag as ScriptureResultsViewer,
  Lg as ScrollGroupSelector,
  ai as SearchBar,
  Or as Select,
  Pp as SelectBooks,
  Dp as SelectBooksPicker,
  Ir as SelectContent,
  yu as SelectGroup,
  Ie as SelectItem,
  rg as SelectLabel,
  _u as SelectScrollDownButton,
  ku as SelectScrollUpButton,
  ag as SelectSeparator,
  Mr as SelectTrigger,
  Dr as SelectValue,
  Zr as Separator,
  Bg as SettingsList,
  Fg as SettingsListHeader,
  jg as SettingsListItem,
  _p as SettingsSidebar,
  zg as SettingsSidebarContentSearch,
  Ba as ShrinkStepContext,
  jf as ShrinkStepOverride,
  $i as ShrinkStepOverrideContext,
  fp as Sidebar,
  vp as SidebarContent,
  Eg as SidebarFooter,
  Hn as SidebarGroup,
  Sg as SidebarGroupAction,
  Gn as SidebarGroupContent,
  qn as SidebarGroupLabel,
  Cg as SidebarHeader,
  Ng as SidebarInput,
  mp as SidebarInset,
  bp as SidebarMenu,
  Rg as SidebarMenuAction,
  Og as SidebarMenuBadge,
  kp as SidebarMenuButton,
  xp as SidebarMenuItem,
  Dg as SidebarMenuSkeleton,
  Mg as SidebarMenuSub,
  Pg as SidebarMenuSubButton,
  Ig as SidebarMenuSubItem,
  gp as SidebarProvider,
  _g as SidebarRail,
  Tg as SidebarSeparator,
  kg as SidebarTrigger,
  Cr as Skeleton,
  Sf as Slider,
  Tf as Sonner,
  gm as Spinner,
  Rf as Switch,
  Ff as TOOLTIP_DELAY_MS,
  To as TabDropdownMenu,
  Kg as TabFloatingMenu,
  Ug as TabToolbar,
  Mo as Table,
  Po as TableBody,
  fm as TableCaption,
  Er as TableCell,
  mm as TableFooter,
  Ea as TableHead,
  Io as TableHeader,
  ar as TableRow,
  Of as Tabs,
  If as TabsContent,
  Df as TabsList,
  Mf as TabsTrigger,
  tf as TextField,
  Vh as Textarea,
  Qn as ToggleGroup,
  fa as ToggleGroupItem,
  Gg as Toolbar,
  Cd as ToolbarCompoundLabel,
  _t as Tooltip,
  Ct as TooltipContent,
  Pt as TooltipProvider,
  Nt as TooltipTrigger,
  Iu as UNDO_REDO_BUTTONS_STRING_KEYS,
  Wg as UiLanguageSelector,
  Pu as UndoRedoButtons,
  Ds as VerticalTabs,
  Is as VerticalTabsContent,
  Ms as VerticalTabsList,
  jp as VerticalTabsTrigger,
  ef as WizardStepper,
  Qe as Z_INDEX_ABOVE_DOCK,
  ei as Z_INDEX_ABOVE_POPOVER,
  vm as Z_INDEX_CONNECTION_LOST,
  bm as Z_INDEX_FIRST_RUN,
  xm as Z_INDEX_MODAL,
  ym as Z_INDEX_MODAL_BACKDROP,
  km as Z_INDEX_NESTED_MODAL,
  _m as Z_INDEX_NESTED_MODAL_BACKDROP,
  Nm as Z_INDEX_ONBOARDING_TOUR,
  Cm as Z_INDEX_OVERLAY,
  Em as badgeVariants,
  Tm as buttonGroupVariants,
  Sm as buttonVariants,
  x as cn,
  bg as getBookIdFromUSFM,
  Mu as getCaretPositionFromClick,
  Yh as getCommentThreadElementId,
  Fa as getInventoryHeader,
  mg as getLinesFromUSFM,
  vg as getNumberFromUSFM,
  dp as getStatusForItem,
  qg as getToolbarOSReservedSpaceClassName,
  gg as inventoryCountColumn,
  hg as inventoryItemColumn,
  fg as inventoryStatusColumn,
  An as isCommentDraftEmpty,
  Do as isMacOs,
  Rm as isWindows,
  Vu as leftEdgeRect,
  Te as localizeOrFallback,
  Yu as markerMenuItemToPaletteItem,
  $u as measureBox,
  ph as pickTabIconUrl,
  Mm as sonner,
  $r as useContentZoomTextProps,
  Pf as useEvent,
  zf as useEventAsync,
  Vf as useExtraValidMarkers,
  Om as useHasContentBelow,
  Ks as useListbox,
  Au as useLivePopoverAnchor,
  wh as usePromise,
  Lh as useRecentSearches,
  Af as useRetryablePromise,
  Lf as useRunWhenVisible,
  Rs as useShrinkStep,
  Vi as useShrinkStepOverride,
  Nd as useShrinkStepValue,
  Ua as useSidebar,
  $f as useStylesheet,
  Bf as useTabIconSelection,
  rn as useTruncationTooltip,
  uh as useViewVisibility
};
//# sourceMappingURL=index.js.map
