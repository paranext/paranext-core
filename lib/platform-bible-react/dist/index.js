var xs = Object.defineProperty;
var ys = (t, e, r) => e in t ? xs(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var At = (t, e, r) => ys(t, typeof e != "symbol" ? e + "" : e, r);
import { c as v, g as Re, a as jr, C as ar, L as Vn, t as ks, u as Zo, T as Qt, b as vt, d as bt, e as xt, f as Ln, A as ya, r as Kt, D as or, h as Ke, i as nr, j as Zr, k as je, B as J, l as _s, m as Ns, n as Cs, I as Es, o as bo, p as mr, q as ne, s as Ts, v as Bn, P as Cr, w as Er, x as Tr, y as Sr, z as xo, E as Ss, F as Rs, G as Rr, H as yo, J as gt, R as ko, K as ka, M as ao, N as oo, O as no, Q as io, S as Os, U as zs, V as jn, W as Hr, X as Gr, Y as pr, Z as Ds, _ as vr, $ as Fn, a0 as Me, a1 as Fe, a2 as hr, a3 as _o, a4 as No, a5 as _a, a6 as Co, a7 as Un, a8 as Ms, a9 as Is, aa as Ps, ab as $s, ac as As, ad as Eo, ae as Kn, af as Vs, ag as Hn, ah as Gn, ai as To, aj as Ls, ak as Bs, al as qn, am as Ba, an as Xo, ao as ja, ap as js, aq as Fs, ar as Us, as as Ks, at as Wn, au as Hs, av as Gs, aw as qs, ax as Ws, ay as Ys, az as Zs, aA as So, aB as Ro, aC as Xs, aD as Js, aE as Qs } from "./resizable-DAC2BWUP.js";
import { aF as wf, aG as uf, aH as pf, aI as hf, aJ as gf, aK as ff, aL as mf, aM as vf, aN as bf, aO as xf, aP as yf, aQ as kf, aR as _f, aS as Nf, aT as Cf, aU as Ef, aV as Tf, aW as Sf, aX as Rf, aY as Of, aZ as zf, a_ as Df, a$ as Mf, b0 as If, b1 as Pf, b2 as $f, b3 as Af, b4 as Vf, b5 as Lf, b6 as Bf, b7 as jf, b8 as Ff, b9 as Uf, ba as Kf, bb as Hf, bc as Gf, bd as qf, be as Wf, bf as Yf, bg as Zf, bh as Xf, bi as Jf, bj as Qf, bk as tm, bl as em, bm as rm, bn as am, bo as om, bp as nm, bq as im, br as sm, bs as cm } from "./resizable-DAC2BWUP.js";
import { jsx as o, jsxs as p, Fragment as Dt } from "react/jsx-runtime";
import { Canon as Nt } from "@sillsdev/scripture";
import { Check as br, Clock as Jo, ChevronsLeft as Qo, ChevronsRight as tn, ChevronUp as Yn, ChevronDown as er, ArrowLeft as tc, ArrowRight as ec, BoldIcon as rc, ItalicIcon as ac, AtSign as Zn, Pencil as oc, Trash2 as nc, Undo2 as ic, ArrowUp as Xn, MoreHorizontal as sc, MailOpen as cc, Mail as lc, FilterIcon as dc, ArrowLeftIcon as wc, ChevronLeftIcon as uc, ChevronRightIcon as pc, ArrowRightIcon as hc, Copy as gc, Filter as fc, User as mc, Link as vc, CircleHelp as bc, X as xc, AlertCircle as yc, CircleCheckIcon as kc, CircleXIcon as _c, CircleHelpIcon as Nc, ArrowUpIcon as Cc, ArrowDownIcon as Ec, ScrollText as Tc, ChevronRight as Sc, ChevronLeft as Rc, ChevronsUpDown as Oc, MenuIcon as zc, Menu as Dc, EllipsisVertical as Mc, MoreVertical as Ic } from "lucide-react";
import { Section as ht, compareScrRefs as Na, getChaptersForBook as Pc, formatScrRef as Oe, formatReplacementString as tr, getSectionForBook as pa, formatRelativeDate as $c, sanitizeHtml as Oo, NumberFormat as Jn, formatBytes as Ac, getCurrentLocale as Vc, usfmMarkers as Lc, getFormatCallerFunction as Bc, deepEqual as jc, isString as en, scrRefToBBBCCCVVV as Fa, defaultScrRef as Ua, formatScrRefRange as Fc, getLocalizeKeyForScrollGroupId as rn, formatReplacementStringToArray as an, collectUsjMarkers as Uc } from "platform-bible-utils";
import Ct, { useRef as H, useMemo as I, createContext as Or, useContext as Xr, useEffect as Y, useState as E, useCallback as B, useId as Ca, useImperativeHandle as Kc, useLayoutEffect as Ht, Fragment as rr, Component as Hc, createElement as so, Suspense as Gc, forwardRef as zo, memo as Qn } from "react";
import { IconSelector as ti, IconCheck as za, IconChevronDown as qc, IconChevronUp as Wc, IconLayoutSidebar as Yc, IconLayoutSidebarRight as Zc, IconChevronRight as ei, IconSearch as Xc, IconLoader as Jc, IconAlertOctagon as Qc, IconAlertTriangle as tl, IconInfoCircle as el, IconCircleCheck as rl } from "@tabler/icons-react";
import { createEditor as ri, $getRoot as He, $createParagraphNode as Jr, $getSelection as Gt, HISTORY_MERGE_TAG as Do, ParagraphNode as ai, TextNode as oi, $getPreviousSelection as al, $isRangeSelection as fe, $caretFromPoint as ol, $getSiblingCaret as ni, $getChildCaret as nl, $getAdjacentChildCaret as il, $isChildCaret as sl, $normalizeCaret as cl, $setSelectionFromCaretRange as ll, $getCollapsedCaretRange as dl, $getCaretInDirection as on, $splitAtPointCaretNext as wl, $isTextPointCaret as ul, $findMatchingParent as ii, $isElementNode as qr, mergeRegister as De, getDOMTextNode as pl, isHTMLElement as hl, CLEAR_EDITOR_COMMAND as si, COMMAND_PRIORITY_EDITOR as Mo, shallowMergeConfig as gl, defineExtension as te, safeCast as ir, createState as fl, FORMAT_TEXT_COMMAND as ci, $isNodeSelection as li, COMMAND_PRIORITY_LOW as di, RootNode as ml, LineBreakNode as vl, TabNode as bl, $isEditorState as xl, createCommand as yl, CLICK_COMMAND as kl, isDOMNode as _l, $getNodeFromDOMNode as Nl, $createNodeSelection as Cl, $setSelection as El, $getEditor as Tl, DecoratorNode as co, $getState as Sl, toggleTextFormatType as nn, TEXT_TYPE_TO_FORMAT as Rl, $setState as Ol, addClassNamesToElement as wi, $create as zl, $getNodeByKey as Dl, removeClassNamesFromElement as Ml, KEY_TAB_COMMAND as Il, $isBlockElementNode as Pl, $createRangeSelection as $l, $normalizeSelection__EXPERIMENTAL as Al, OUTDENT_CONTENT_COMMAND as Vl, INDENT_CONTENT_COMMAND as sn, INSERT_TAB_COMMAND as Ll, COMMAND_PRIORITY_CRITICAL as Io, $isDecoratorNode as Bl, $isParagraphNode as jl, $isTextNode as lo, SELECTION_CHANGE_COMMAND as ui, $insertNodes as Fl } from "lexical";
import { HeadingNode as Ul, QuoteNode as Kl, registerRichText as Hl } from "@lexical/rich-text";
import { flushSync as Gl, createPortal as ql } from "react-dom";
import { $isTableSelection as Wl } from "@lexical/table";
import { ToggleGroup as pi, Avatar as Po, Select as Lt, Checkbox as cn, Slot as Qr, Tabs as ie, Menubar as ve, ContextMenu as Et, Progress as ln, Slider as ia, Switch as dn } from "radix-ui";
import { cva as $o } from "class-variance-authority";
import { createHeadlessEditor as hi } from "@lexical/headless";
import { $generateHtmlFromNodes as Yl, $generateNodesFromDOM as Zl } from "@lexical/html";
import { useReactTable as gi, getFilteredRowModel as Xl, getSortedRowModel as fi, getPaginationRowModel as Jl, getCoreRowModel as mi, flexRender as Fr, getGroupedRowModel as Ql, getExpandedRowModel as td } from "@tanstack/react-table";
import ed from "markdown-to-jsx";
import { useHotkeys as rd } from "react-hotkeys-hook";
import { Drawer as Ge } from "vaul";
import { useTheme as ad } from "next-themes";
import { Toaster as od } from "sonner";
import { toast as dm } from "sonner";
function nh({ className: t, ...e }) {
  return /* @__PURE__ */ o(
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
function vi({
  ref: t,
  bookId: e,
  isSelected: r,
  onSelect: a,
  onMouseDown: n,
  section: i,
  className: s,
  showCheck: c = !1,
  localizedBookNames: d,
  commandValue: l,
  suppressKeyboardHighlight: w = !1,
  disabled: u = !1,
  dimmedReason: h,
  dimmedDescription: f
}) {
  const _ = H(!1), b = () => {
    u || (_.current || a == null || a(e), setTimeout(() => {
      _.current = !1;
    }, 100));
  }, g = (D) => {
    if (u) {
      D.preventDefault();
      return;
    }
    _.current = !0, n ? n(D) : a == null || a(e);
  }, k = I(
    () => Re(e, d),
    [e, d]
  ), y = I(
    () => jr(e, d),
    [e, d]
  ), S = !!h && !u, P = `${k} (${y})`, j = S ? f || `${P}, ${h}` : P, z = /* @__PURE__ */ p(
    ar,
    {
      ref: t,
      value: l || `${e} ${Nt.bookIdToEnglishName(e)}`,
      onSelect: b,
      onMouseDown: g,
      role: "option",
      "aria-selected": r,
      "aria-disabled": u || void 0,
      "aria-label": j,
      disabled: u,
      className: v(
        !w && Vn,
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
        u && "tw:cursor-not-allowed tw:opacity-50",
        // Mirrors NumberedItemGrid's dimmed-vs-disabled split — same tokens, so chapter/verse cells
        // and book rows grey identically inside one popover: dimmed is presentation only, so it
        // never sets aria-disabled or blocks onSelect, and it yields to disabled. Restated under
        // data-selected so a dimmed row keeps its dimming while the keyboard highlight is on it,
        // rather than losing it to the suppression rule above.
        S && "tw:bg-muted/50 tw:text-muted-foreground/50 tw:data-selected:bg-muted/50 tw:data-selected:text-muted-foreground/50"
      ),
      children: [
        c && /* @__PURE__ */ o(
          br,
          {
            className: v(
              "tw:me-2 tw:h-4 tw:w-4 tw:shrink-0",
              r ? "tw:opacity-100" : "tw:opacity-0"
            )
          }
        ),
        /* @__PURE__ */ o("span", { className: "tw:min-w-0 tw:flex-1", children: k }),
        S && // Visible rather than hover-only: cmdk never moves DOM focus onto an item (the input keeps
        // it and highlights via data-selected), so a tooltip would never open for a keyboard user.
        // Rendered text also survives the highlight, which recolours the row.
        /* @__PURE__ */ o("span", { className: "tw:ms-2 tw:shrink-0 tw:text-xs tw:italic", children: h }),
        /* @__PURE__ */ o(
          "span",
          {
            className: v(
              "tw:ms-2 tw:shrink-0 tw:text-xs",
              // Inherits the row's dimmed colour instead of setting its own, so the whole row dims
              // evenly rather than leaving the id at full strength beside a dimmed name.
              !S && "tw:text-muted-foreground"
            ),
            children: y
          }
        )
      ]
    }
  );
  return /* @__PURE__ */ o(
    "div",
    {
      className: v(
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
const nd = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
function id(t) {
  return nd.some((e) => e === t);
}
function wn(t) {
  const e = new RegExp("^\\p{L}$", "u").test(t), r = /^[0-9]$/.test(t);
  return { isLetter: e, isDigit: r };
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
}), Da = Or(Ur.WIDE);
function sd() {
  return Xr(Da);
}
const bi = Or(void 0);
function xi() {
  return Xr(bi);
}
function yi() {
  Y(() => {
    ks();
  }, []);
}
function cd({
  primary: t,
  secondary: e,
  separator: r = " ",
  secondaryFirst: a = !1,
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
  } = Zo(), {
    ref: h,
    open: f,
    onPointerEnter: _,
    onPointerLeave: b
  } = Zo(), [g, k] = E(!1), [y, S] = E(!1), P = H(
    // React's ref API requires `null` as the initial value for DOM refs.
    // eslint-disable-next-line no-null/no-null
    null
  ), j = n && e !== void 0, z = i ?? (e !== void 0 && !n);
  yi(), Y(() => {
    var C;
    const Z = (C = P.current) == null ? void 0 : C.closest('button, [role="combobox"], [tabindex]');
    if (!Z) return;
    const x = (L) => !!L && L.scrollWidth > L.clientWidth, W = () => {
      Ln() !== "pointer" && (z || x(h.current) || x(d.current)) && S(!0);
    }, N = () => S(!1);
    return Z.addEventListener("focus", W), Z.addEventListener("blur", N), () => {
      Z.removeEventListener("focus", W), Z.removeEventListener("blur", N);
    };
  }, [z, h, d]);
  const D = B(() => {
    z && k(!0), _(), j && w();
  }, [
    z,
    j,
    _,
    w
  ]), M = B(() => {
    k(!1), S(!1), b(), u();
  }, [b, u]);
  Y(() => {
    z || k(!1);
  }, [z]);
  const R = /* @__PURE__ */ o("span", { ref: h, className: "tw:min-w-0 tw:shrink tw:truncate", children: t }, "primary"), O = j ? (
    // Weighted to absorb essentially all of the shrinking, so the primary field only starts losing
    // characters once this one has none left.
    /* @__PURE__ */ o("span", { ref: d, className: "tw:min-w-0 tw:shrink-[9999] tw:truncate", children: e }, "secondary")
  ) : void 0, [K, q] = a ? [O, R] : [R, O];
  return (
    // Nested TooltipProviders are harmless in Radix, so carrying our own means this works in any
    // host, including toolbars that never set one up.
    /* @__PURE__ */ o(Qt, { children: /* @__PURE__ */ p(
      vt,
      {
        open: f || l || g || y,
        onOpenChange: (Z) => {
          Z || M();
        },
        children: [
          /* @__PURE__ */ o(bt, { asChild: !0, children: /* @__PURE__ */ p(
            "span",
            {
              ref: P,
              onPointerEnter: D,
              onPointerLeave: M,
              onPointerDown: M,
              className: v("tw:flex tw:min-w-0 tw:items-center", c),
              children: [
                K,
                K && q && /* @__PURE__ */ o("span", { className: "tw:shrink-0 tw:whitespace-pre", children: r }, "separator"),
                q
              ]
            }
          ) }),
          /* @__PURE__ */ o(xt, { dir: "auto", children: s })
        ]
      }
    ) })
  );
}
function wo(t, e) {
  return `${t} ${ya[t]}${e ? ` ${jr(t, e)} ${Re(t, e)}` : ""}`;
}
function gr(t, e) {
  return `${t} ${ya[t] || ""} ${e}`;
}
function ha(t, e, r) {
  return `${gr(t, e)}:${r}`;
}
function Lr(t) {
  if (t.includes(":")) return;
  const e = /(\d+)$/.exec(t);
  if (!e) return;
  const r = parseInt(e[1], 10), a = t.indexOf(" ");
  if (a < 0) return;
  const n = t.slice(0, a);
  return t === gr(n, r) ? r : void 0;
}
function sa(t) {
  const e = /:(\d+)$/.exec(t);
  if (!e) return;
  const r = t.slice(0, t.length - e[0].length);
  if (Lr(r) !== void 0)
    return parseInt(e[1], 10);
}
const ld = "top-match", dd = "Show recent searches", wd = "Recent";
function ud({
  recentSearches: t,
  onSearchItemSelect: e,
  renderItem: r = (h) => String(h),
  getItemKey: a = (h) => String(h),
  ariaLabel: n,
  groupHeading: i,
  id: s,
  classNameForItems: c,
  buttonClassName: d = "tw:absolute tw:end-0 tw:top-0 tw:h-full tw:px-3 tw:py-2",
  buttonVariant: l = "ghost",
  open: w,
  onOpenChange: u
}) {
  const [h, f] = E(!1), [_, b] = E(!1), g = Ca(), k = H(!1), y = w !== void 0, S = y ? w : h, P = n === "" ? "" : Kt(n, dd), j = Kt(i, wd), z = (O) => {
    O || (k.current = !0, b(!1)), y || f(O), u == null || u(O);
  }, D = (O) => {
    if (O && k.current) {
      k.current = !1;
      return;
    }
    b(O);
  };
  if (t.length === 0)
    return;
  const M = (O) => {
    e(O);
  }, R = /* @__PURE__ */ o(
    J,
    {
      variant: l,
      size: "icon",
      className: d,
      "aria-label": P,
      onPointerEnter: () => {
        k.current = !1;
      },
      children: /* @__PURE__ */ o(Jo, { className: "tw:h-4 tw:w-4" })
    }
  );
  return /* @__PURE__ */ p(or, { open: S, onOpenChange: z, modal: !1, children: [
    /* @__PURE__ */ o(Qt, { children: P ? /* @__PURE__ */ p(vt, { open: _, onOpenChange: D, children: [
      /* @__PURE__ */ o(bt, { asChild: !0, children: /* @__PURE__ */ o(Ke, { asChild: !0, children: R }) }),
      /* @__PURE__ */ o(xt, { children: P })
    ] }) : /* @__PURE__ */ o(Ke, { asChild: !0, children: R }) }),
    /* @__PURE__ */ p(
      nr,
      {
        id: s,
        "aria-labelledby": g,
        className: "tw:w-[300px]",
        align: "start",
        onKeyDown: (O) => O.stopPropagation(),
        children: [
          /* @__PURE__ */ o(Zr, { id: g, children: j }),
          t.map((O) => /* @__PURE__ */ p(
            je,
            {
              onSelect: () => M(O),
              className: v("tw:flex tw:items-center", c),
              children: [
                /* @__PURE__ */ o(Jo, { className: "tw:me-2 tw:h-4 tw:w-4 tw:opacity-50" }),
                /* @__PURE__ */ o("span", { children: r(O) })
              ]
            },
            a(O)
          ))
        ]
      }
    )
  ] });
}
function ih(t, e, r = (n, i) => n === i, a = 15) {
  return (n) => {
    const i = t.filter(
      (c) => !r(c, n)
    ), s = [n, ...i.slice(0, a - 1)];
    e(s);
  };
}
function ca(t, e) {
  return !e || Na(t, e) === 0;
}
function pd(t, e, r, a, n) {
  const i = I(
    () => _s(t, e),
    [t, e]
  ), s = I(
    () => Ns(t, e),
    [t, e]
  ), c = I(
    () => Cs(t, e),
    [t, e]
  ), d = I(
    () => Es(t, e),
    [t, e]
  ), l = B(
    (w) => {
      w && a(w);
    },
    [a]
  );
  return I(() => [
    {
      onClick: () => l(i),
      disabled: ca(t, i),
      title: Kt(
        n == null ? void 0 : n["%webView_bookChapterControl_previousChapter%"],
        "Previous chapter"
      ),
      icon: r === "ltr" ? Qo : tn,
      group: "chapter"
    },
    {
      onClick: () => l(s),
      disabled: ca(t, s),
      title: Kt(
        n == null ? void 0 : n["%webView_bookChapterControl_nextChapter%"],
        "Next chapter"
      ),
      icon: r === "ltr" ? tn : Qo,
      group: "chapter"
    },
    {
      onClick: () => l(c),
      disabled: ca(t, c),
      title: Kt(
        n == null ? void 0 : n["%webView_bookChapterControl_previousVerse%"],
        "Previous verse"
      ),
      icon: Yn,
      group: "verse"
    },
    {
      onClick: () => l(d),
      disabled: ca(t, d),
      title: Kt(
        n == null ? void 0 : n["%webView_bookChapterControl_nextVerse%"],
        "Next verse"
      ),
      icon: er,
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
}, hd = [
  ga.BOOK_ONLY,
  ga.BOOK_CHAPTER,
  ga.BOOK_CHAPTER_VERSE
];
function gd(t) {
  return ga.BOOK_CHAPTER_VERSE.test(t.trim());
}
function un(t, e) {
  return Nt.bookIdToNumber(t) < Nt.bookIdToNumber(e.book);
}
function fd(t, e, r) {
  const a = Nt.bookIdToNumber(t) - Nt.bookIdToNumber(r.book);
  return a < 0 ? !0 : a > 0 ? !1 : e < r.chapterNum;
}
function Ka(t, e, r, a) {
  const n = Nt.bookIdToNumber(t) - Nt.bookIdToNumber(a.book);
  return n < 0 ? !0 : n > 0 ? !1 : e < a.chapterNum ? !0 : e > a.chapterNum ? !1 : r < a.verseNum;
}
function Be(t) {
  return Pc(Nt.bookIdToNumber(t));
}
function md(t, e, r) {
  if (!t.trim() || e.length === 0) return;
  const a = hd.reduce(
    (n, i) => {
      if (n) return n;
      const s = i.exec(t.trim());
      if (s) {
        const [c, d = void 0, l = void 0] = s.slice(1);
        let w;
        const u = e.filter((h) => bo(h, c, r));
        if (u.length === 1 && ([w] = u), !w && d) {
          if (Nt.isBookIdValid(c)) {
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
          const f = ((_) => Object.keys(ya).find(
            (b) => ya[b].toLowerCase() === _.toLowerCase()
          ))(c);
          if (f && e.includes(f) && (w = f), !w && r) {
            const _ = Array.from(r.entries()).find(
              ([, b]) => b.localizedName.toLowerCase() === c.toLowerCase()
            );
            _ && e.includes(_[0]) && ([w] = _);
          }
        }
        if (w) {
          let h = d ? parseInt(d, 10) : void 0;
          h && h > Be(w) && (h = Math.max(Be(w), 1));
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
  if (a) return a;
}
function uo(t) {
  return {
    [ht.OT]: t.filter((e) => Nt.isBookOT(e)),
    [ht.NT]: t.filter((e) => Nt.isBookNT(e)),
    [ht.DC]: t.filter((e) => Nt.isBookDC(e)),
    [ht.Extra]: t.filter((e) => Nt.extraBooks().includes(e))
  };
}
function vd(t, e) {
  const r = new Set(t), a = e.filter((l) => !r.has(l)), n = new Set(a), i = n.size === 0 ? t : Nt.allBookIds.filter(
    (l) => r.has(l) || n.has(l)
  ), s = uo(i), c = Object.values(s).flat(), d = uo(t);
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
const po = 6;
function bd(t) {
  return t === "ArrowLeft" ? "ArrowRight" : t === "ArrowRight" ? "ArrowLeft" : t;
}
function xd({
  current: t,
  key: e,
  max: r,
  direction: a = "ltr"
}) {
  if (r <= 0) return t;
  if (t < 1 || t > r) return 1;
  switch (a === "rtl" ? bd(e) : e) {
    case "ArrowLeft":
      return t > 1 ? t - 1 : r;
    case "ArrowRight":
      return t < r ? t + 1 : 1;
    case "ArrowUp":
      return Math.max(1, t - po);
    case "ArrowDown":
      return Math.min(r, t + po);
    default:
      return t;
  }
}
function ki({
  count: t,
  valueBuilder: e,
  onSelect: r,
  itemRef: a,
  isDisabled: n,
  isDimmed: i,
  isSelected: s,
  suppressKeyboardHighlight: c = !1,
  className: d
}) {
  if (!(t <= 0))
    return /* @__PURE__ */ o(mr, { children: /* @__PURE__ */ o(
      "div",
      {
        className: v("tw:grid tw:gap-1", d),
        style: { gridTemplateColumns: `repeat(${po}, minmax(0, 1fr))` },
        children: Array.from({ length: t }, (l, w) => w + 1).map((l) => {
          const w = (n == null ? void 0 : n(l)) ?? !1;
          return /* @__PURE__ */ o(
            ar,
            {
              value: e(l),
              onSelect: () => {
                w || r(l);
              },
              ref: a(l),
              disabled: w,
              "aria-disabled": w || void 0,
              className: v(
                "tw:h-8 tw:w-8 tw:cursor-pointer tw:justify-center tw:rounded-md tw:text-center tw:text-sm",
                // Hide CommandItem's own trailing check icon (a multiselect affordance this grid
                // doesn't use) and give cells pointer feedback distinct from the keyboard focus ring.
                "tw:[&>svg]:hidden tw:hover:bg-muted",
                !c && Vn,
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
function pn({
  bookId: t,
  scrRef: e,
  onChapterSelect: r,
  setChapterRef: a,
  isChapterDimmed: n,
  isChapterDisabled: i,
  suppressKeyboardHighlight: s,
  className: c
}) {
  if (t)
    return /* @__PURE__ */ o(
      ki,
      {
        count: Be(t),
        valueBuilder: (d) => gr(t, d),
        onSelect: r,
        itemRef: a,
        isDisabled: i,
        isDimmed: n,
        isSelected: (d) => t === e.book && d === e.chapterNum,
        suppressKeyboardHighlight: s,
        className: c
      }
    );
}
function hn({
  bookId: t,
  chapterNum: e,
  endVerse: r,
  scrRef: a,
  onVerseSelect: n,
  setVerseRef: i,
  isVerseDimmed: s,
  isVerseDisabled: c,
  suppressKeyboardHighlight: d,
  className: l
}) {
  if (!(!t || r <= 0))
    return /* @__PURE__ */ o(
      ki,
      {
        count: r,
        valueBuilder: (w) => ha(t, e, w),
        onSelect: n,
        itemRef: i,
        isDisabled: c,
        isDimmed: s,
        isSelected: (w) => t === a.book && e === a.chapterNum && w === a.verseNum,
        suppressKeyboardHighlight: d,
        className: l
      }
    );
}
const yd = "a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]";
function kd(t) {
  return Array.from(t.querySelectorAll(yd)).filter(
    (e) => e.tabIndex >= 0
  );
}
function Ha({
  scrRef: t,
  handleSubmit: e,
  className: r,
  getActiveBookIds: a,
  getAdditionalBookIds: n,
  localizedBookNames: i,
  localizedStrings: s,
  recentSearches: c,
  onAddRecentSearch: d,
  id: l,
  getEndVerse: w,
  disableReferencesUpTo: u,
  submitKeys: h,
  triggerContent: f,
  triggerVariant: _ = "outline",
  showTriggerChevron: b = !1,
  onOpenChange: g,
  onCloseAutoFocus: k,
  modal: y = !1,
  align: S = "center",
  ref: P,
  disabled: j
}) {
  const z = ne(), D = sd(), [M, R] = E(!1), [O, K] = E(""), [q, Z] = E(""), [x, W] = E("books"), [N, C] = E(void 0), [L, $] = E(
    void 0
  ), [U, rt] = E(void 0), [ot, G] = E(!1), [st, dt] = E(!1), [ct, Tt] = E(!1), [St, Bt] = E(!1), qe = H(null), se = H(!1), jt = H(void 0), ut = H(void 0), Ft = H(void 0), xe = H(void 0), ye = H({}), ce = H({}), lt = B(
    (m) => {
      e(m), d && d(m);
    },
    [e, d]
  ), le = I(() => a ? a() : Ts, [a]), Ie = I(
    () => a && n ? n() : [],
    [a, n]
  ), {
    projectBooksBySection: We,
    reachableBooksBySection: ke,
    reachableBooks: de,
    projectBooks: Ye,
    booksOutsideProject: pt
  } = I(
    () => vd(le, Ie),
    [le, Ie]
  ), _e = pt.has(t.book), Pe = I(() => q.trim() ? uo(
    de.filter((m) => bo(m, q, i))
  ) : st ? ke : We, [
    We,
    ke,
    de,
    st,
    q,
    i
  ]), A = I(
    () => md(q, de, i),
    [q, de, i]
  ), it = I(() => {
    if (!A) return;
    const m = O.startsWith(`${A.book} `) ? O : "", F = sa(m), tt = Lr(m);
    return {
      book: A.book,
      chapterNum: tt ?? A.chapterNum ?? 1,
      verseNum: F ?? A.verseNum ?? 1
    };
  }, [A, O]), Ne = H(!1);
  Y(() => {
    if (!Ne.current) {
      Ne.current = !0;
      return;
    }
    g == null || g(M);
  }, [M, g]);
  const Mt = B(() => {
    it && (u && Ka(
      it.book,
      it.chapterNum,
      it.verseNum,
      u
    ) || (lt(it), R(!1), Z(""), K("")));
  }, [lt, it, u]), It = B(
    (m) => {
      const F = L ?? (A == null ? void 0 : A.book), tt = U ?? (A == null ? void 0 : A.chapterNum);
      !F || !tt || (lt({
        book: F,
        chapterNum: tt,
        verseNum: m
      }), R(!1));
    },
    [lt, L, U, A]
  ), $e = B(
    (m) => {
      if (u && un(m, u)) return;
      if (Be(m) <= 1) {
        lt({
          book: m,
          chapterNum: 1,
          verseNum: 1
        }), R(!1), Z("");
        return;
      }
      C(m), W("chapters");
    },
    [lt, u]
  ), qt = B(
    (m) => {
      const F = x === "chapters" ? N : A == null ? void 0 : A.book;
      if (F) {
        if (w && w(F, m) > 1) {
          $(F), rt(m), W("verses"), K("");
          return;
        }
        lt({
          book: F,
          chapterNum: m,
          verseNum: 1
        }), R(!1);
      }
    },
    [lt, x, N, A, w]
  ), Wt = B(
    (m) => {
      lt(m), R(!1), Z("");
    },
    [lt]
  ), Ce = pd(
    t,
    st ? de : Ye,
    z,
    e,
    s
  ), Ee = B((m) => {
    Z(m), Bt(!1);
  }, []), Pt = B(() => {
    W("books"), C(void 0), $(void 0), rt(void 0), Bt(!1), setTimeout(() => {
      var m;
      (m = ut.current) == null || m.focus();
    }, 0);
  }, []), ee = B(() => {
    const m = L;
    $(void 0), rt(void 0), m ? (C(m), W("chapters"), K("")) : Pt();
  }, [L, Pt]), Rt = B(
    (m) => {
      R(m), m && (W("books"), C(void 0), $(void 0), rt(void 0), Z(""), Bt(!1), Tt(!1), dt(_e));
    },
    [_e]
  );
  Y(() => {
    j && Rt(!1);
  }, [j, Rt]);
  const [yt, Ae] = E(0);
  Y(() => {
    var m;
    yt !== 0 && ((m = ut.current) == null || m.focus());
  }, [yt]), Kc(
    P,
    () => ({
      open: () => {
        j || (Rt(!0), Ae((m) => m + 1));
      }
    }),
    [Rt, j]
  );
  const { otLong: we, ntLong: ue, dcLong: Ze, extraLong: Xe } = {
    otLong: s == null ? void 0 : s["%scripture_section_ot_long%"],
    ntLong: s == null ? void 0 : s["%scripture_section_nt_long%"],
    dcLong: s == null ? void 0 : s["%scripture_section_dc_long%"],
    extraLong: s == null ? void 0 : s["%scripture_section_extra_long%"]
  }, Te = B(
    (m) => Bn(m, we, ue, Ze, Xe),
    [we, ue, Ze, Xe]
  ), pe = B(
    (m) => A ? !!A.chapterNum && !m.toString().includes(A.chapterNum.toString()) : !1,
    [A]
  ), sr = I(
    () => Oe(
      t,
      i ? Re(t.book, i) : "English"
    ),
    [t, i]
  ), Mr = I(
    () => D >= Ur.TIGHT ? jr(t.book, i) : Re(t.book, i),
    [t.book, i, D]
  ), Ir = `${t.chapterNum}:${t.verseNum}`, Ve = B((m) => (F) => {
    ye.current[m] = F;
  }, []), T = B((m) => (F) => {
    ce.current[m] = F;
  }, []), Q = I(
    () => gd(q),
    [q]
  ), et = I(() => !w || !A || !A.chapterNum || !Q ? !1 : w(A.book, A.chapterNum) > 0, [w, A, Q]), Ot = x === "books" && !ot && !q.trim() && pt.size > 0, Pr = B(
    (m) => u ? un(m, u) : !1,
    [u]
  ), Se = B(
    (m) => (F) => u ? fd(m, F, u) : !1,
    [u]
  ), cr = B(
    (m, F) => (tt) => u ? Ka(m, F, tt, u) : !1,
    [u]
  ), lr = Kt(
    s == null ? void 0 : s["%webView_bookChapterControl_selectChapter%"],
    "Select chapter"
  ), Aa = Kt(
    s == null ? void 0 : s["%webView_bookChapterControl_selectVerse%"],
    "Select verse"
  ), ta = x === "verses" ? Kt(
    s == null ? void 0 : s["%webView_bookChapterControl_backToChapters%"],
    "Back to chapters"
  ) : Kt(
    s == null ? void 0 : s["%webView_bookChapterControl_backToBooks%"],
    "Back to books"
  ), Va = Kt(
    s == null ? void 0 : s["%webView_bookChapterControl_bookNotInProject%"],
    "Not in project"
  ), ea = Kt(
    s == null ? void 0 : s["%webView_bookChapterControl_bookNotInProjectDescription%"],
    "{book} is not in this project"
  ), ra = B(
    (m) => tr(ea, {
      book: `${Re(m, i)} (${jr(
        m,
        i
      )})`
    }),
    [ea, i]
  ), aa = Kt(
    s == null ? void 0 : s["%webView_bookChapterControl_showMoreBooks%"],
    "Show more books"
  ), dr = Kt(
    s == null ? void 0 : s["%webView_bookChapterControl_showProjectBooksOnly%"],
    "Show project books only"
  ), oa = B(
    (m) => {
      (m.key === "Home" || m.key === "End") && m.stopPropagation(), h && h.includes(m.key) && A && A.chapterNum !== void 0 && A.verseNum !== void 0 && (m.preventDefault(), m.stopPropagation(), Mt());
    },
    [h, A, Mt]
  ), na = B(
    (m) => {
      var qo, Wo;
      if (m.ctrlKey) return;
      const F = m.target instanceof HTMLElement ? m.target : void 0;
      if (!(!!F && !!((qo = jt.current) != null && qo.contains(F))) && (F != null && F.closest('[role="menu"], [role="menuitem"]')))
        return;
      if (m.key === "Tab") {
        const mt = jt.current ? kd(jt.current) : [];
        if (mt.length === 0) {
          m.preventDefault(), m.stopPropagation();
          return;
        }
        const Xt = mt[mt.length - 1], $t = m.shiftKey ? mt[0] : Xt;
        document.activeElement === $t && (m.preventDefault(), m.stopPropagation(), (m.shiftKey ? Xt : mt[0]).focus());
        return;
      }
      const { isLetter: kt, isDigit: zt } = wn(m.key);
      if ((x === "chapters" || x === "verses") && (m.key === " " || m.key === "Enter")) {
        if (!!(F != null && F.closest(
          'button, a, input, select, textarea, [role="button"]'
        ))) {
          m.stopPropagation();
          return;
        }
        const Xt = (() => {
          if (x === "verses") {
            const $r = L, Yo = U, La = sa(O);
            return !$r || !Yo || La === void 0 ? void 0 : {
              isDisabled: cr($r, Yo)(La),
              activate: () => It(La)
            };
          }
          const $t = N, ae = Lr(O);
          if (!(!$t || ae === void 0))
            return {
              isDisabled: Se($t)(ae),
              activate: () => qt(ae)
            };
        })();
        if (Xt) {
          m.preventDefault(), m.stopPropagation(), Xt.isDisabled || Xt.activate();
          return;
        }
      }
      if (x === "books" && A && !ot && m.key === "Enter" && !(F !== ut.current && !!(F != null && F.closest('button, a, input, select, textarea, [role="button"]')))) {
        m.preventDefault(), m.stopPropagation(), Mt();
        return;
      }
      if ((x === "chapters" || x === "verses") && (kt || zt)) {
        m.preventDefault(), m.stopPropagation();
        return;
      }
      if (m.key === "Backspace" && (x === "chapters" || x === "verses")) {
        m.preventDefault(), m.stopPropagation(), x === "verses" ? ee() : Pt();
        return;
      }
      if (!id(m.key) || ot) return;
      if (x === "books" && !St && (m.key === "ArrowLeft" || m.key === "ArrowRight")) {
        const mt = F === ut.current ? ut.current : void 0, Xt = (mt == null ? void 0 : mt.selectionStart) ?? 0, $t = (mt == null ? void 0 : mt.selectionEnd) ?? 0, ae = z === "rtl" ? m.key === "ArrowRight" : m.key === "ArrowLeft";
        if (!!mt && (Xt !== $t || (ae ? Xt > 0 : $t < mt.value.length))) return;
      }
      if (m.shiftKey || x === "books" && F !== ut.current && (F != null && F.closest('button, a, [role="button"]')))
        return;
      const wt = (() => {
        const mt = x === "books" && A && et && A.chapterNum ? { bookId: A.book, chapterNum: A.chapterNum } : void 0, Xt = x === "verses" ? { bookId: L, chapterNum: U } : mt;
        if (Xt) {
          const { bookId: $t, chapterNum: ae } = Xt;
          return !$t || !ae || !w ? void 0 : {
            max: w($t, ae),
            current: sa(O) ?? 0,
            buildValue: ($r) => ha($t, ae, $r),
            refs: ce,
            // In books view focus stays on the CommandInput so the user can keep typing; only
            // the dedicated grid views pull focus off the back button.
            takeFocus: x === "verses"
          };
        }
        if (x === "chapters" || x === "books" && A && Be(A.book) > 1) {
          const $t = x === "chapters" ? N : A == null ? void 0 : A.book;
          return $t ? {
            max: Be($t),
            current: Lr(O) ?? 0,
            buildValue: (ae) => gr($t, ae),
            refs: ye,
            takeFocus: x === "chapters"
          } : void 0;
        }
      })();
      if (!wt || wt.max <= 0) return;
      x === "books" && Bt(!0), wt.takeFocus && ((Wo = jt.current) == null || Wo.focus());
      const Ut = xd({
        current: wt.current,
        key: m.key,
        max: wt.max,
        direction: z
      });
      if (m.preventDefault(), m.stopPropagation(), Ut === wt.current) return;
      K(wt.buildValue(Ut));
      const Go = wt.refs.current[Ut];
      Go && Go.scrollIntoView({ block: "nearest", behavior: "smooth" });
    },
    [
      x,
      A,
      et,
      ot,
      St,
      z,
      Pt,
      ee,
      qt,
      Mt,
      It,
      Se,
      cr,
      N,
      L,
      U,
      w,
      O
    ]
  ), V = B((m) => {
    var kt, zt;
    if (m.shiftKey || m.key === "Tab" || m.key === " ") return;
    if (m.key === "Enter") {
      m.stopPropagation();
      return;
    }
    if (m.key === "ArrowUp" || m.key === "ArrowDown") {
      (kt = ut.current) == null || kt.focus();
      return;
    }
    const { isLetter: F, isDigit: tt } = wn(m.key);
    (F || tt) && (m.preventDefault(), Z((wt) => wt + m.key), (zt = ut.current) == null || zt.focus(), G(!1));
  }, []);
  Ht(() => {
    const m = setTimeout(() => {
      if (M && x === "books" && Ft.current && xe.current) {
        const F = Ft.current, tt = xe.current, kt = tt.offsetTop, zt = F.clientHeight, wt = tt.clientHeight, Ut = kt - zt / 2 + wt / 2;
        F.scrollTo({
          top: Math.max(0, Ut),
          behavior: "smooth"
        }), K(wo(t.book));
      }
    }, 0);
    return () => {
      clearTimeout(m);
    };
  }, [M, x, q, A, t.book]), Ht(() => {
    if (x === "chapters" && N) {
      const m = N === t.book, F = m ? t.chapterNum : 1;
      K(gr(N, F)), setTimeout(() => {
        if (Ft.current)
          if (m) {
            const tt = ye.current[t.chapterNum];
            tt && tt.scrollIntoView({ block: "center", behavior: "smooth" });
          } else
            Ft.current.scrollTo({ top: 0 });
        jt.current && jt.current.focus();
      }, 0);
    }
  }, [x, N, A, t.book, t.chapterNum]), Ht(() => {
    if (x === "verses" && L && U !== void 0) {
      const m = L === t.book && U === t.chapterNum, F = m ? t.verseNum : 1;
      K(
        ha(L, U, F)
      ), setTimeout(() => {
        if (Ft.current)
          if (m) {
            const tt = ce.current[t.verseNum];
            tt && tt.scrollIntoView({ block: "center", behavior: "smooth" });
          } else
            Ft.current.scrollTo({ top: 0 });
        jt.current && jt.current.focus();
      }, 0);
    }
  }, [
    x,
    L,
    U,
    t.book,
    t.chapterNum,
    t.verseNum
  ]);
  const X = A ? `${A.book} ${A.chapterNum ?? ""} ${A.verseNum ?? ""} ${et}` : "", ft = H(""), Zt = H(""), re = I(() => {
    if (x !== "books" || !A || ot) return;
    const { book: m, chapterNum: F, verseNum: tt } = A;
    if (et && F && w)
      return {
        max: w(m, F),
        initial: tt ?? (m === t.book && F === t.chapterNum ? t.verseNum : 1),
        parse: sa,
        buildValue: (zt) => ha(m, F, zt)
      };
    const kt = Be(m);
    if (!(kt <= 1))
      return {
        max: kt,
        initial: F ?? (m === t.book ? t.chapterNum : 1),
        parse: Lr,
        buildValue: (zt) => gr(m, zt)
      };
  }, [
    x,
    A,
    ot,
    et,
    w,
    t.book,
    t.chapterNum,
    t.verseNum
  ]);
  return Ht(() => {
    if (x !== "books" || !A || !re || re.max <= 0) {
      ft.current = "";
      return;
    }
    const { max: m, initial: F, parse: tt, buildValue: kt } = re, zt = (wt) => {
      const Ut = tt(wt);
      return Ut !== void 0 && Ut >= 1 && Ut <= m && wt === kt(Ut) ? Ut : void 0;
    };
    if (ft.current !== X) {
      ft.current = X;
      const wt = kt(Math.min(Math.max(F, 1), m));
      Zt.current = wt, K(wt);
      return;
    }
    if (zt(O) !== void 0) {
      Zt.current = O;
      return;
    }
    K(
      zt(Zt.current) !== void 0 ? Zt.current : kt(Math.min(Math.max(F, 1), m))
    );
  }, [x, A, re, X, O]), /* @__PURE__ */ p(Cr, { open: M, onOpenChange: Rt, modal: y, children: [
    /* @__PURE__ */ o(Er, { asChild: !0, children: /* @__PURE__ */ p(
      J,
      {
        ref: qe,
        "aria-label": "book-chapter-trigger",
        variant: _,
        role: "combobox",
        "aria-expanded": M,
        disabled: j,
        className: v(
          "tw:h-8 tw:w-full tw:min-w-16 tw:max-w-48 tw:shrink tw:overflow-hidden tw:px-1",
          r
        ),
        onClick: (m) => {
          se.current && (se.current = !1, m.preventDefault());
        },
        children: [
          f ?? /* @__PURE__ */ o(
            cd,
            {
              primary: Mr,
              secondary: Ir,
              showSecondary: D < Ur.MINIMUM,
              isPartial: D >= Ur.TIGHT,
              fullText: sr
            }
          ),
          b && /* @__PURE__ */ o(
            ti,
            {
              "data-testid": "book-chapter-control-chevron",
              className: "tw:ms-2 tw:size-4 tw:shrink-0 tw:opacity-50"
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ o(
      Tr,
      {
        id: l,
        forceMount: !0,
        className: "tw:w-[280px] tw:p-0",
        align: S,
        onKeyDownCapture: na,
        onKeyDown: (m) => m.stopPropagation(),
        onPointerDownOutside: (m) => {
          const { target: F } = m;
          M && qe.current && F instanceof Node && qe.current.contains(F) && (se.current = !0, Rt(!1));
        },
        onCloseAutoFocus: k,
        children: /* @__PURE__ */ o(Qt, { children: /* @__PURE__ */ p(
          Sr,
          {
            ref: jt,
            loop: !0,
            value: O,
            onValueChange: K,
            disablePointerSelection: !0,
            shouldFilter: !1,
            children: [
              x === "books" ? /* @__PURE__ */ p(
                "div",
                {
                  className: v("tw:flex tw:items-end", ot && "tw:pb-1"),
                  onFocus: (m) => {
                    Tt(m.target !== ut.current);
                  },
                  onBlur: (m) => {
                    m.currentTarget.contains(m.relatedTarget) || Tt(!1);
                  },
                  children: [
                    /* @__PURE__ */ p("div", { className: "tw:relative tw:flex-1", children: [
                      /* @__PURE__ */ o(
                        xo,
                        {
                          ref: ut,
                          value: q,
                          onValueChange: Ee,
                          onKeyDown: oa,
                          onFocus: () => G(!1),
                          className: c && c.length > 0 ? "tw:pe-8!" : "",
                          spaceSelectsHighlightedItem: !0
                        }
                      ),
                      c && c.length > 0 && /* @__PURE__ */ o(
                        ud,
                        {
                          recentSearches: c,
                          onSearchItemSelect: Wt,
                          renderItem: (m) => Oe(m, "English"),
                          getItemKey: (m) => `${m.book}-${m.chapterNum}-${m.verseNum}`,
                          ariaLabel: s == null ? void 0 : s["%history_recentSearches_ariaLabel%"],
                          groupHeading: s == null ? void 0 : s["%history_recent%"],
                          buttonClassName: "tw:absolute tw:end-1 tw:top-1"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ o(Ss, { className: "tw:translate-y-px tw:gap-1 tw:pe-2", children: Ce.map(
                      ({ onClick: m, disabled: F, title: tt, icon: kt, group: zt }, wt) => {
                        const Ut = /* @__PURE__ */ o(
                          J,
                          {
                            variant: "ghost",
                            size: "sm",
                            onClick: () => {
                              G(!0), m();
                            },
                            disabled: F,
                            className: "tw:h-8.5 tw:w-6 tw:rounded-lg! tw:p-0",
                            "aria-label": tt,
                            onKeyDown: V,
                            children: /* @__PURE__ */ o(kt, {})
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
                            wt > 0 && zt !== Ce[wt - 1].group && /* @__PURE__ */ o(Rs, {}),
                            F ? (
                              // A disabled Button carries `pointer-events: none` from its own base
                              // variants, so it is not hit-tested: neither a Radix tooltip nor a
                              // `title` ON THE BUTTON can ever fire. These arrows come back disabled
                              // at the edges of the canon — Genesis 1:1 is the default state of a
                              // freshly opened project — which is exactly where a user asks what the
                              // button was for. The wrapper is still hit-tested, so the native
                              // tooltip it carries is the one hover explanation available here.
                              /* @__PURE__ */ o("span", { title: tt, className: "tw:inline-flex", children: Ut })
                            ) : /* @__PURE__ */ p(vt, { children: [
                              /* @__PURE__ */ o(bt, { asChild: !0, children: Ut }),
                              /* @__PURE__ */ o(xt, { children: tt })
                            ] })
                          ] }, `${zt}-${wt}`)
                        );
                      }
                    ) })
                  ]
                }
              ) : /* @__PURE__ */ p("div", { className: "tw:flex tw:items-center tw:border-b tw:px-3 tw:py-1", children: [
                /* @__PURE__ */ p(vt, { children: [
                  /* @__PURE__ */ o(bt, { asChild: !0, children: /* @__PURE__ */ o(
                    J,
                    {
                      variant: "ghost",
                      size: "sm",
                      onClick: x === "verses" ? ee : Pt,
                      className: "tw:me-2 tw:h-6 tw:w-6 tw:p-0",
                      tabIndex: -1,
                      "aria-label": ta,
                      children: z === "ltr" ? /* @__PURE__ */ o(tc, { className: "tw:h-4 tw:w-4" }) : /* @__PURE__ */ o(ec, { className: "tw:h-4 tw:w-4" })
                    }
                  ) }),
                  /* @__PURE__ */ o(xt, { children: ta })
                ] }),
                x === "chapters" && N && /* @__PURE__ */ o("span", { tabIndex: -1, className: "tw:text-sm tw:font-medium", children: Re(N, i) }),
                x === "verses" && L && U !== void 0 && /* @__PURE__ */ o("span", { tabIndex: -1, className: "tw:text-sm tw:font-medium", children: `${Re(L, i)} ${U}` }),
                /* @__PURE__ */ o(
                  "span",
                  {
                    tabIndex: -1,
                    className: "tw:ms-auto tw:text-sm tw:font-medium tw:text-muted-foreground",
                    children: x === "verses" ? Aa : lr
                  }
                )
              ] }),
              !ot && /* @__PURE__ */ p(Rr, { ref: Ft, children: [
                x === "books" && /* @__PURE__ */ p(Dt, { children: [
                  !A && Object.entries(Pe).map(([m, F]) => {
                    if (F.length !== 0)
                      return (
                        // We are mapping over filteredBooksByType, which uses Section as key type
                        // eslint-disable-next-line no-type-assertion/no-type-assertion
                        /* @__PURE__ */ o(mr, { heading: Te(m), children: F.map((tt) => /* @__PURE__ */ o(
                          vi,
                          {
                            bookId: tt,
                            onSelect: (kt) => $e(kt),
                            section: pa(tt),
                            commandValue: wo(tt),
                            suppressKeyboardHighlight: ct,
                            ref: tt === t.book ? xe : void 0,
                            localizedBookNames: i,
                            disabled: Pr(tt),
                            dimmedReason: pt.has(tt) ? Va : void 0,
                            dimmedDescription: pt.has(tt) ? ra(tt) : void 0
                          },
                          tt
                        )) }, m)
                      );
                  }),
                  A && it && /* @__PURE__ */ o(mr, { children: /* @__PURE__ */ p(
                    ar,
                    {
                      value: ld,
                      onSelect: Mt,
                      disabled: !!u && Ka(
                        it.book,
                        it.chapterNum,
                        it.verseNum,
                        u
                      ),
                      className: "tw:font-semibold tw:text-primary tw:hover:bg-muted tw:[&>svg:last-child]:hidden",
                      children: [
                        /* @__PURE__ */ o("span", { className: "tw:min-w-0 tw:flex-1", children: Oe(
                          it,
                          Re(A.book, i)
                        ) }),
                        /* @__PURE__ */ o("span", { className: "tw:ms-2 tw:shrink-0 tw:text-xs tw:text-muted-foreground", children: jr(A.book, i) })
                      ]
                    },
                    "top-match"
                  ) }),
                  A && et && A.chapterNum && w && // No heading over this grid: the top-match row sits directly above it and
                  // already names the book and the reference the grid is refining, so a
                  // heading here only repeated the book back to the user one line later. The
                  // dedicated verses view still carries one, because there it is the only
                  // thing naming the book.
                  /* @__PURE__ */ o(
                    hn,
                    {
                      bookId: A.book,
                      chapterNum: A.chapterNum,
                      endVerse: w(A.book, A.chapterNum),
                      scrRef: t,
                      onVerseSelect: It,
                      setVerseRef: T,
                      isVerseDisabled: cr(A.book, A.chapterNum),
                      suppressKeyboardHighlight: ct,
                      className: "tw:px-4 tw:pb-4"
                    }
                  ),
                  A && !et && Be(A.book) > 1 && // No heading here either, for the same reason as the verse preview above:
                  // the top-match row directly above already names the book.
                  /* @__PURE__ */ o(
                    pn,
                    {
                      bookId: A.book,
                      scrRef: t,
                      onChapterSelect: qt,
                      setChapterRef: Ve,
                      isChapterDimmed: pe,
                      isChapterDisabled: Se(A.book),
                      suppressKeyboardHighlight: ct,
                      className: "tw:px-4 tw:pb-4"
                    }
                  )
                ] }),
                x === "chapters" && N && /* @__PURE__ */ o(
                  pn,
                  {
                    bookId: N,
                    scrRef: t,
                    onChapterSelect: qt,
                    setChapterRef: Ve,
                    isChapterDisabled: Se(N),
                    className: "tw:p-4"
                  }
                ),
                x === "verses" && L && U !== void 0 && w && /* @__PURE__ */ o(
                  hn,
                  {
                    bookId: L,
                    chapterNum: U,
                    endVerse: w(
                      L,
                      U
                    ),
                    scrRef: t,
                    onVerseSelect: It,
                    setVerseRef: T,
                    isVerseDisabled: cr(
                      L,
                      U
                    ),
                    className: "tw:p-4"
                  }
                )
              ] }),
              Ot && /* @__PURE__ */ o("div", { className: "tw:border-t tw:p-1", children: /* @__PURE__ */ o(
                J,
                {
                  variant: "ghost",
                  size: "sm",
                  className: "tw:w-full tw:justify-start tw:font-normal",
                  onClick: () => dt((m) => !m),
                  children: st ? dr : aa
                }
              ) })
            ]
          }
        ) })
      }
    )
  ] });
}
const sh = Object.freeze([
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
function _d(t) {
  return typeof t == "string" ? t : typeof t == "number" ? t.toString() : t.label;
}
function gn({
  id: t,
  options: e = [],
  className: r,
  buttonClassName: a,
  popoverContentClassName: n,
  popoverContentStyle: i,
  value: s,
  onChange: c = () => {
  },
  getOptionLabel: d = _d,
  getButtonLabel: l,
  icon: w = void 0,
  buttonPlaceholder: u = "",
  textPlaceholder: h = "",
  commandEmptyMessage: f = "No option found",
  buttonVariant: _ = "outline",
  alignDropDown: b = "start",
  isDisabled: g = !1,
  ariaLabel: k,
  ...y
}) {
  const [S, P] = E(!1), j = l ?? d, z = (M) => M.length > 0 && typeof M[0] == "object" && "options" in M[0], D = (M, R) => {
    const O = d(M), K = typeof M == "object" && "secondaryLabel" in M ? M.secondaryLabel : void 0, q = `${R ?? ""}${O}${K ?? ""}`;
    return /* @__PURE__ */ p(
      ar,
      {
        value: O,
        onSelect: () => {
          c(M), P(!1);
        },
        className: "tw:gap-1.5!",
        children: [
          /* @__PURE__ */ o(
            br,
            {
              className: v("tw:h-4 tw:w-4 tw:shrink-0", {
                "tw:opacity-0": !s || d(s) !== O
              })
            }
          ),
          /* @__PURE__ */ p("span", { className: "tw:flex-1 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap", children: [
            O,
            K && /* @__PURE__ */ p("span", { className: "tw:text-muted-foreground", children: [
              " · ",
              K
            ] })
          ] })
        ]
      },
      q
    );
  };
  return /* @__PURE__ */ p(Cr, { open: S, onOpenChange: P, ...y, children: [
    /* @__PURE__ */ o(Er, { asChild: !0, children: /* @__PURE__ */ p(
      J,
      {
        variant: _,
        role: "combobox",
        "aria-expanded": S,
        "aria-label": k,
        id: t,
        className: v(
          "tw:flex tw:w-[200px] tw:items-center tw:justify-between tw:overflow-hidden",
          a ?? r
        ),
        disabled: g,
        children: [
          /* @__PURE__ */ p("div", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-center tw:overflow-hidden", children: [
            w && /* @__PURE__ */ o("div", { className: "tw:shrink-0 tw:pe-2", children: w }),
            /* @__PURE__ */ o(
              "span",
              {
                className: v(
                  "tw:min-w-0 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap tw:text-start"
                ),
                children: s ? j(s) : u
              }
            )
          ] }),
          /* @__PURE__ */ o(er, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ o(
      Tr,
      {
        align: b,
        className: v("tw:w-[200px] tw:p-0", n),
        style: i,
        children: /* @__PURE__ */ p(Sr, { children: [
          /* @__PURE__ */ o(
            xo,
            {
              placeholder: h,
              className: "tw:text-inherit",
              spaceSelectsHighlightedItem: !0
            }
          ),
          /* @__PURE__ */ o(yo, { children: f }),
          /* @__PURE__ */ o(Rr, { children: z(e) ? e.map((M) => /* @__PURE__ */ o(mr, { heading: M.groupHeading, children: M.options.map((R) => D(R, M.groupHeading)) }, M.groupHeading)) : /* @__PURE__ */ o(mr, { children: e.map((M) => D(M)) }) })
        ] })
      }
    )
  ] });
}
function Nd({
  startChapter: t,
  endChapter: e,
  handleSelectStartChapter: r,
  handleSelectEndChapter: a,
  isDisabled: n = !1,
  chapterCount: i
}) {
  const s = I(
    () => Array.from({ length: i }, (l, w) => w + 1),
    [i]
  );
  return /* @__PURE__ */ p(Dt, { children: [
    /* @__PURE__ */ o(gt, { htmlFor: "start-chapters-combobox", children: "Chapters" }),
    /* @__PURE__ */ o(
      gn,
      {
        isDisabled: n,
        onChange: (l) => {
          r(l), l > e && a(l);
        },
        buttonClassName: "tw:me-2 tw:ms-2 tw:w-20",
        options: s,
        getOptionLabel: (l) => l.toString(),
        value: t
      },
      "start chapter"
    ),
    /* @__PURE__ */ o(gt, { htmlFor: "end-chapters-combobox", children: "to" }),
    /* @__PURE__ */ o(
      gn,
      {
        isDisabled: n,
        onChange: (l) => {
          a(l), l < t && r(l);
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
var ho = /* @__PURE__ */ ((t) => (t.CurrentBook = "current book", t.ChooseBooks = "choose books", t))(ho || {});
((t) => {
  t.CURRENT_BOOK = "current book", t.CHOOSE_BOOKS = "choose books";
})(ho || (ho = {}));
const ch = Object.freeze([
  "%webView_bookSelector_currentBook%",
  "%webView_bookSelector_choose%",
  "%webView_bookSelector_chooseBooks%"
]), Ga = (t, e) => t[e] ?? e;
function lh({
  handleBookSelectionModeChange: t,
  currentBookName: e,
  onSelectBooks: r,
  selectedBookIds: a,
  chapterCount: n,
  endChapter: i,
  handleSelectEndChapter: s,
  startChapter: c,
  handleSelectStartChapter: d,
  localizedStrings: l
}) {
  const w = Ga(l, "%webView_bookSelector_currentBook%"), u = Ga(l, "%webView_bookSelector_choose%"), h = Ga(l, "%webView_bookSelector_chooseBooks%"), [f, _] = E(
    "current book"
    /* CurrentBook */
  ), b = (g) => {
    _(g), t(g);
  };
  return /* @__PURE__ */ o(
    ko,
    {
      className: "pr-twp tw:flex",
      value: f,
      onValueChange: (g) => b(g),
      children: /* @__PURE__ */ p("div", { className: "tw:flex tw:w-full tw:flex-col tw:gap-4", children: [
        /* @__PURE__ */ p("div", { className: "tw:grid tw:grid-cols-[25%_25%_50%]", children: [
          /* @__PURE__ */ p("div", { className: "tw:flex tw:items-center", children: [
            /* @__PURE__ */ o(ka, {
              value: "current book"
              /* CurrentBook */
            }),
            /* @__PURE__ */ o(gt, { className: "tw:ms-1", children: w })
          ] }),
          /* @__PURE__ */ o(gt, { className: "tw:flex tw:items-center", children: e }),
          /* @__PURE__ */ o("div", { className: "tw:flex tw:items-center tw:justify-end", children: /* @__PURE__ */ o(
            Nd,
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
            /* @__PURE__ */ o(ka, {
              value: "choose books"
              /* ChooseBooks */
            }),
            /* @__PURE__ */ o(gt, { className: "tw:ms-1", children: h })
          ] }),
          /* @__PURE__ */ o(gt, { className: "tw:flex tw:items-center", children: a.map((g) => Nt.bookIdToEnglishName(g)).join(", ") }),
          /* @__PURE__ */ o(
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
const _i = Or(null);
function Cd(t, e) {
  return { getTheme: function() {
    return e ?? null;
  } };
}
function be() {
  const t = Xr(_i);
  return t == null && function(e, ...r) {
    const a = new URL("https://lexical.dev/docs/error"), n = new URLSearchParams();
    n.append("code", e);
    for (const i of r) n.append("v", i);
    throw a.search = n.toString(), Error(`Minified Lexical error #${e}; visit ${a.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
  }(8), t;
}
const Ni = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, Ed = Ni ? Ht : Y, la = { tag: Do };
function Td({ initialConfig: t, children: e }) {
  const r = I(() => {
    const { theme: a, namespace: n, nodes: i, onError: s, editorState: c, html: d } = t, l = Cd(null, a), w = ri({ editable: t.editable, html: d, namespace: n, nodes: i, onError: (u) => s(u, w), theme: a });
    return function(u, h) {
      if (h !== null) {
        if (h === void 0) u.update(() => {
          const f = He();
          if (f.isEmpty()) {
            const _ = Jr();
            f.append(_);
            const b = Ni ? document.activeElement : null;
            (Gt() !== null || b !== null && b === u.getRootElement()) && _.select();
          }
        }, la);
        else if (h !== null) switch (typeof h) {
          case "string": {
            const f = u.parseEditorState(h);
            u.setEditorState(f, la);
            break;
          }
          case "object":
            u.setEditorState(h, la);
            break;
          case "function":
            u.update(() => {
              He().isEmpty() && h(u);
            }, la);
        }
      }
    }(w, c), [w, l];
  }, []);
  return Ed(() => {
    const a = t.editable, [n] = r;
    n.setEditable(a === void 0 || a);
  }, []), o(_i.Provider, { value: r, children: e });
}
const Sd = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Ht : Y;
function Rd({ ignoreHistoryMergeTagChange: t = !0, ignoreSelectionChange: e = !1, onChange: r }) {
  const [a] = be();
  return Sd(() => {
    if (r) return a.registerUpdateListener(({ editorState: n, dirtyElements: i, dirtyLeaves: s, prevEditorState: c, tags: d }) => {
      e && i.size === 0 && s.size === 0 || t && d.has(Do) || c.isEmpty() || r(n, a, d);
    });
  }, [a, t, e, r]), null;
}
const Ao = {
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
}, Vo = [
  Ul,
  ai,
  oi,
  Kl
], Od = Or(null), qa = {
  didCatch: !1,
  error: null
};
class zd extends Hc {
  constructor(e) {
    super(e), this.resetErrorBoundary = this.resetErrorBoundary.bind(this), this.state = qa;
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
      for (var r, a, n = arguments.length, i = new Array(n), s = 0; s < n; s++)
        i[s] = arguments[s];
      (r = (a = this.props).onReset) === null || r === void 0 || r.call(a, {
        args: i,
        reason: "imperative-api"
      }), this.setState(qa);
    }
  }
  componentDidCatch(e, r) {
    var a, n;
    (a = (n = this.props).onError) === null || a === void 0 || a.call(n, e, r);
  }
  componentDidUpdate(e, r) {
    const {
      didCatch: a
    } = this.state, {
      resetKeys: n
    } = this.props;
    if (a && r.error !== null && Dd(e.resetKeys, n)) {
      var i, s;
      (i = (s = this.props).onReset) === null || i === void 0 || i.call(s, {
        next: n,
        prev: e.resetKeys,
        reason: "keys"
      }), this.setState(qa);
    }
  }
  render() {
    const {
      children: e,
      fallbackRender: r,
      FallbackComponent: a,
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
      else if (a)
        c = so(a, d);
      else if (n !== void 0)
        c = n;
      else
        throw s;
    }
    return so(Od.Provider, {
      value: {
        didCatch: i,
        error: s,
        resetErrorBoundary: this.resetErrorBoundary
      }
    }, c);
  }
}
function Dd() {
  let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  return t.length !== e.length || t.some((r, a) => !Object.is(r, e[a]));
}
function Md({ children: t, onError: e }) {
  return o(zd, { fallback: o("div", { style: { border: "1px solid #f00", color: "#f00", padding: "8px" }, children: "An error was thrown." }), onError: e, children: t });
}
const Id = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Ht : Y;
function Pd(t) {
  return { initialValueFn: () => t.isEditable(), subscribe: (e) => t.registerEditableListener(e) };
}
function $d() {
  return function(t) {
    const [e] = be(), r = I(() => t(e), [e, t]), [a, n] = E(() => r.initialValueFn()), i = H(a);
    return Id(() => {
      const { initialValueFn: s, subscribe: c } = r, d = s();
      return i.current !== d && (i.current = d, n(d)), c((l) => {
        i.current = l, n(l);
      });
    }, [r, t]), a;
  }(Pd);
}
function Ad(t, e) {
  const r = t.getRootElement();
  if (r === null) return [];
  const a = r.getBoundingClientRect(), n = getComputedStyle(r), i = parseFloat(n.paddingLeft) + parseFloat(n.paddingRight), s = Array.from(e.getClientRects());
  let c, d = s.length;
  s.sort((l, w) => {
    const u = l.top - w.top;
    return Math.abs(u) <= 3 ? l.left - w.left : u;
  });
  for (let l = 0; l < d; l++) {
    const w = s[l], u = c && c.top <= w.top && c.top + c.height > w.top && c.left + c.width > w.left, h = w.width + i === a.width;
    u || h ? (s.splice(l--, 1), d--) : c = w;
  }
  return s;
}
function Ea(t, ...e) {
  const r = new URL("https://lexical.dev/docs/error"), a = new URLSearchParams();
  a.append("code", t);
  for (const n of e) a.append("v", n);
  throw r.search = a.toString(), Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
const Ci = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, Vd = Ci && "documentMode" in document ? document.documentMode : null;
!(!Ci || !("InputEvent" in window) || Vd) && "getTargetRanges" in new window.InputEvent("input");
function ge(t) {
  return `${t}px`;
}
const Ld = { attributes: !0, characterData: !0, childList: !0, subtree: !0 };
function Bd(t, e, r) {
  let a = null, n = null, i = null, s = [];
  const c = document.createElement("div");
  function d() {
    a === null && Ea(182), n === null && Ea(183);
    const { left: u, top: h } = n.getBoundingClientRect(), f = Ad(t, e);
    var _, b;
    c.isConnected || (b = c, (_ = n).insertBefore(b, _.firstChild));
    let g = !1;
    for (let k = 0; k < f.length; k++) {
      const y = f[k], S = s[k] || document.createElement("div"), P = S.style;
      P.position !== "absolute" && (P.position = "absolute", g = !0);
      const j = ge(y.left - u);
      P.left !== j && (P.left = j, g = !0);
      const z = ge(y.top - h);
      P.top !== z && (S.style.top = z, g = !0);
      const D = ge(y.width);
      P.width !== D && (S.style.width = D, g = !0);
      const M = ge(y.height);
      P.height !== M && (S.style.height = M, g = !0), S.parentNode !== c && (c.append(S), g = !0), s[k] = S;
    }
    for (; s.length > f.length; ) s.pop();
    g && r(s);
  }
  function l() {
    n = null, a = null, i !== null && i.disconnect(), i = null, c.remove();
    for (const u of s) u.remove();
    s = [];
  }
  c.style.position = "relative";
  const w = t.registerRootListener(function u() {
    const h = t.getRootElement();
    if (h === null) return l();
    const f = h.parentElement;
    if (!hl(f)) return l();
    l(), a = h, n = f, i = new MutationObserver((_) => {
      const b = t.getRootElement(), g = b && b.parentElement;
      if (b !== a || g !== n) return u();
      for (const k of _) if (!c.contains(k.target)) return d();
    }), i.observe(f, Ld), d();
  });
  return () => {
    w(), l();
  };
}
function fn(t, e, r) {
  if (t.type !== "text" && qr(e)) {
    const a = e.getDOMSlot(r);
    return [a.element, a.getFirstChildOffset() + t.offset];
  }
  return [pl(r) || r, t.offset];
}
function jd(t) {
  for (const e of t) {
    const r = e.style;
    r.background !== "Highlight" && (r.background = "Highlight"), r.color !== "HighlightText" && (r.color = "HighlightText"), r.marginTop !== ge(-1.5) && (r.marginTop = ge(-1.5)), r.paddingTop !== ge(4) && (r.paddingTop = ge(4)), r.paddingBottom !== ge(0) && (r.paddingBottom = ge(0));
  }
}
function Fd(t, e = jd) {
  let r = null, a = null, n = null, i = null, s = null, c = null, d = () => {
  };
  function l(w) {
    w.read(() => {
      const u = Gt();
      if (!fe(u)) return r = null, n = null, i = null, c = null, d(), void (d = () => {
      });
      const [h, f] = function(M) {
        const R = M.getStartEndPoints();
        return M.isBackward() ? [R[1], R[0]] : R;
      }(u), _ = h.getNode(), b = _.getKey(), g = h.offset, k = f.getNode(), y = k.getKey(), S = f.offset, P = t.getElementByKey(b), j = t.getElementByKey(y), z = r === null || P !== a || g !== n || b !== r.getKey(), D = i === null || j !== s || S !== c || y !== i.getKey();
      if ((z || D) && P !== null && j !== null) {
        const M = function(R, O, K, q, Z, x, W) {
          const N = (R._window ? R._window.document : document).createRange();
          return N.setStart(...fn(O, K, q)), N.setEnd(...fn(Z, x, W)), N;
        }(t, h, _, P, f, k, j);
        d(), d = Bd(t, M, e);
      }
      r = _, a = P, n = g, i = k, s = j, c = S;
    });
  }
  return l(t.getEditorState()), De(t.registerUpdateListener(({ editorState: w }) => l(w)), () => {
    d();
  });
}
function Ud(t, e) {
  let r = null;
  const a = () => {
    const n = getSelection(), i = n && n.anchorNode, s = t.getRootElement();
    i !== null && s !== null && s.contains(i) ? r !== null && (r(), r = null) : r === null && (r = Fd(t, e));
  };
  return t.registerRootListener((n) => {
    if (n) {
      const i = n.ownerDocument;
      return i.addEventListener("selectionchange", a), a(), () => {
        r !== null && r(), i.removeEventListener("selectionchange", a);
      };
    }
  });
}
function Kd(t) {
  const e = ii(t, (r) => qr(r) && !r.isInline());
  return qr(e) || Ea(4, t.__key), e;
}
function Hd(t) {
  const e = Gt() || al();
  let r;
  if (fe(e)) r = ol(e.focus, "next");
  else {
    if (e != null) {
      const s = e.getNodes(), c = s[s.length - 1];
      c && (r = ni(c, "next"));
    }
    r = r || nl(He(), "previous").getFlipped().insert(Jr());
  }
  const a = Gd(t, r), n = il(a), i = sl(n) ? cl(n) : a;
  return ll(dl(i)), t.getLatest();
}
function Gd(t, e, r) {
  let a = on(e, "next");
  for (let n = a; n; n = wl(n, r)) a = n;
  return ul(a) && Ea(283), a.insert(t.isInline() ? Jr().append(t) : t), on(ni(t.getLatest(), "next"), e.direction);
}
function qd(t) {
  const e = Gt();
  if (!fe(e)) return !1;
  const r = /* @__PURE__ */ new Set(), a = e.getNodes();
  for (let n = 0; n < a.length; n++) {
    const i = a[n], s = i.getKey();
    if (r.has(s)) continue;
    const c = ii(i, (l) => qr(l) && !l.isInline());
    if (c === null) continue;
    const d = c.getKey();
    c.canIndent() && !r.has(d) && (r.add(d), t(c));
  }
  return r.size > 0;
}
const Wd = Symbol.for("preact-signals");
function Ma() {
  if (ze > 1) return void ze--;
  let t, e = !1;
  for (!function() {
    let r = Ta;
    for (Ta = void 0; r !== void 0; ) r.S.v === r.v && (r.S.i = r.i), r = r.o;
  }(); Kr !== void 0; ) {
    let r = Kr;
    for (Kr = void 0, Sa++; r !== void 0; ) {
      const a = r.u;
      if (r.u = void 0, r.f &= -3, !(8 & r.f) && Ei(r)) try {
        r.c();
      } catch (n) {
        e || (t = n, e = !0);
      }
      r = a;
    }
  }
  if (Sa = 0, ze--, e) throw t;
}
function Yd(t) {
  if (ze > 0) return t();
  go = ++Zd, ze++;
  try {
    return t();
  } finally {
    Ma();
  }
}
let at, Kr;
function mn(t) {
  const e = at;
  at = void 0;
  try {
    return t();
  } finally {
    at = e;
  }
}
let Ta, ze = 0, Sa = 0, Zd = 0, go = 0, fa = 0;
function vn(t) {
  if (at === void 0) return;
  let e = t.n;
  return e === void 0 || e.t !== at ? (e = { i: 0, S: t, p: at.s, n: void 0, t: at, e: void 0, x: void 0, r: e }, at.s !== void 0 && (at.s.n = e), at.s = e, t.n = e, 32 & at.f && t.S(e), e) : e.i === -1 ? (e.i = 0, e.n !== void 0 && (e.n.p = e.p, e.p !== void 0 && (e.p.n = e.n), e.p = at.s, e.n = void 0, at.s.n = e, at.s = e), e) : void 0;
}
function Vt(t, e) {
  this.v = t, this.i = 0, this.n = void 0, this.t = void 0, this.l = 0, this.W = e == null ? void 0 : e.watched, this.Z = e == null ? void 0 : e.unwatched, this.name = e == null ? void 0 : e.name;
}
function Wr(t, e) {
  return new Vt(t, e);
}
function Ei(t) {
  for (let e = t.s; e !== void 0; e = e.n) if (e.S.i !== e.i || !e.S.h() || e.S.i !== e.i) return !0;
  return !1;
}
function bn(t) {
  for (let e = t.s; e !== void 0; e = e.n) {
    const r = e.S.n;
    if (r !== void 0 && (e.r = r), e.S.n = e, e.i = -1, e.n === void 0) {
      t.s = e;
      break;
    }
  }
}
function Ti(t) {
  let e, r = t.s;
  for (; r !== void 0; ) {
    const a = r.p;
    r.i === -1 ? (r.S.U(r), a !== void 0 && (a.n = r.n), r.n !== void 0 && (r.n.p = a)) : e = r, r.S.n = r.r, r.r !== void 0 && (r.r = void 0), r = a;
  }
  t.s = e;
}
function Je(t, e) {
  Vt.call(this, void 0), this.x = t, this.s = void 0, this.g = fa - 1, this.f = 4, this.W = e == null ? void 0 : e.watched, this.Z = e == null ? void 0 : e.unwatched, this.name = e == null ? void 0 : e.name;
}
function Xd(t, e) {
  return new Je(t, e);
}
function Si(t) {
  const e = t.m;
  if (t.m = void 0, typeof e == "function") {
    ze++;
    const r = at;
    at = void 0;
    try {
      e();
    } catch (a) {
      throw t.f &= -2, t.f |= 8, Lo(t), a;
    } finally {
      at = r, Ma();
    }
  }
}
function Lo(t) {
  for (let e = t.s; e !== void 0; e = e.n) e.S.U(e);
  t.x = void 0, t.s = void 0, Si(t);
}
function Jd(t) {
  if (at !== this) throw new Error("Out-of-order effect");
  Ti(this), at = t, this.f &= -2, 8 & this.f && Lo(this), Ma();
}
function ur(t, e) {
  this.x = t, this.m = void 0, this.s = void 0, this.u = void 0, this.f = 32, this.name = e == null ? void 0 : e.name;
}
function me(t, e) {
  const r = new ur(t, e);
  try {
    r.c();
  } catch (n) {
    throw r.d(), n;
  }
  const a = r.d.bind(r);
  return a[Symbol.dispose] = a, a;
}
function zr(t, e = {}) {
  const r = {};
  for (const a in t) {
    const n = e[a], i = Wr(n === void 0 ? t[a] : n);
    r[a] = i;
  }
  return r;
}
Vt.prototype.brand = Wd, Vt.prototype.h = function() {
  return !0;
}, Vt.prototype.S = function(t) {
  const e = this.t;
  e !== t && t.e === void 0 && (t.x = e, this.t = t, e !== void 0 ? e.e = t : mn(() => {
    var r;
    (r = this.W) == null || r.call(this);
  }));
}, Vt.prototype.U = function(t) {
  if (this.t !== void 0) {
    const e = t.e, r = t.x;
    e !== void 0 && (e.x = r, t.e = void 0), r !== void 0 && (r.e = e, t.x = void 0), t === this.t && (this.t = r, r === void 0 && mn(() => {
      var a;
      (a = this.Z) == null || a.call(this);
    }));
  }
}, Vt.prototype.subscribe = function(t) {
  return me(() => {
    const e = this.value, r = at;
    at = void 0;
    try {
      t(e);
    } finally {
      at = r;
    }
  }, { name: "sub" });
}, Vt.prototype.valueOf = function() {
  return this.value;
}, Vt.prototype.toString = function() {
  return this.value + "";
}, Vt.prototype.toJSON = function() {
  return this.value;
}, Vt.prototype.peek = function() {
  const t = at;
  at = void 0;
  try {
    return this.value;
  } finally {
    at = t;
  }
}, Object.defineProperty(Vt.prototype, "value", { get() {
  const t = vn(this);
  return t !== void 0 && (t.i = this.i), this.v;
}, set(t) {
  if (t !== this.v) {
    if (Sa > 100) throw new Error("Cycle detected");
    (function(e) {
      ze !== 0 && Sa === 0 && e.l !== go && (e.l = go, Ta = { S: e, v: e.v, i: e.i, o: Ta });
    })(this), this.v = t, this.i++, fa++, ze++;
    try {
      for (let e = this.t; e !== void 0; e = e.x) e.t.N();
    } finally {
      Ma();
    }
  }
} }), Je.prototype = new Vt(), Je.prototype.h = function() {
  if (this.f &= -3, 1 & this.f) return !1;
  if ((36 & this.f) == 32 || (this.f &= -5, this.g === fa)) return !0;
  if (this.g = fa, this.f |= 1, this.i > 0 && !Ei(this)) return this.f &= -2, !0;
  const t = at;
  try {
    bn(this), at = this;
    const e = this.x();
    (16 & this.f || this.v !== e || this.i === 0) && (this.v = e, this.f &= -17, this.i++);
  } catch (e) {
    this.v = e, this.f |= 16, this.i++;
  }
  return at = t, Ti(this), this.f &= -2, !0;
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
  const t = vn(this);
  if (this.h(), t !== void 0 && (t.i = this.i), 16 & this.f) throw this.v;
  return this.v;
} }), ur.prototype.c = function() {
  const t = this.S();
  try {
    if (8 & this.f || this.x === void 0) return;
    const e = this.x();
    typeof e == "function" && (this.m = e);
  } finally {
    t();
  }
}, ur.prototype.S = function() {
  if (1 & this.f) throw new Error("Cycle detected");
  this.f |= 1, this.f &= -9, Si(this), bn(this), ze++;
  const t = at;
  return at = this, Jd.bind(this, t);
}, ur.prototype.N = function() {
  2 & this.f || (this.f |= 2, this.u = Kr, Kr = this);
}, ur.prototype.d = function() {
  this.f |= 8, 1 & this.f || Lo(this);
}, ur.prototype.dispose = function() {
  this.d();
};
te({ build: (t, e, r) => zr(e), config: ir({ defaultSelection: "rootEnd", disabled: !1 }), name: "@lexical/extension/AutoFocus", register(t, e, r) {
  const a = r.getOutput();
  return me(() => a.disabled.value ? void 0 : t.registerRootListener((n) => {
    t.focus(() => {
      const i = document.activeElement;
      n === null || i !== null && n.contains(i) || n.focus({ preventScroll: !0 });
    }, { defaultSelection: a.defaultSelection.peek() });
  }));
} });
function Ri() {
  const t = He(), e = Gt(), r = Jr();
  t.clear(), t.append(r), e !== null && r.select(), fe(e) && (e.format = 0);
}
function Oi(t, e = Ri) {
  return t.registerCommand(si, (r) => (t.update(e), !0), Mo);
}
te({ build: (t, e, r) => zr(e), config: ir({ $onClear: Ri }), name: "@lexical/extension/ClearEditor", register(t, e, r) {
  const { $onClear: a } = r.getOutput();
  return me(() => Oi(t, a.value));
} });
function Qd(t) {
  return (typeof t.nodes == "function" ? t.nodes() : t.nodes) || [];
}
const Wa = fl("format", { parse: (t) => typeof t == "number" ? t : 0 });
class zi extends co {
  $config() {
    return this.config("decorator-text", { extends: co, stateConfigs: [{ flat: !0, stateConfig: Wa }] });
  }
  getFormat() {
    return Sl(this, Wa);
  }
  getFormatFlags(e, r) {
    return nn(this.getFormat(), e, r);
  }
  hasFormat(e) {
    const r = Rl[e];
    return (this.getFormat() & r) !== 0;
  }
  setFormat(e) {
    return Ol(this, Wa, e);
  }
  toggleFormat(e) {
    const r = this.getFormat(), a = nn(r, e, null);
    return this.setFormat(a);
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
function tw(t) {
  return t instanceof zi;
}
te({ name: "@lexical/extension/DecoratorText", nodes: () => [zi], register: (t, e, r) => t.registerCommand(ci, (a) => {
  const n = Gt();
  if (li(n) || fe(n)) for (const i of n.getNodes()) tw(i) && i.toggleFormat(a);
  return !1;
}, di) });
function Di(t, e) {
  let r;
  return Wr(t(), { unwatched() {
    r && (r(), r = void 0);
  }, watched() {
    this.value = t(), r = e(this);
  } });
}
const fo = te({ build: (t) => Di(() => t.getEditorState(), (e) => t.registerUpdateListener((r) => {
  e.value = r.editorState;
})), name: "@lexical/extension/EditorState" });
function nt(t, ...e) {
  const r = new URL("https://lexical.dev/docs/error"), a = new URLSearchParams();
  a.append("code", t);
  for (const n of e) a.append("v", n);
  throw r.search = a.toString(), Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
function Mi(t, e) {
  if (t && e && !Array.isArray(e) && typeof t == "object" && typeof e == "object") {
    const r = t, a = e;
    for (const n in a) r[n] = Mi(r[n], a[n]);
    return t;
  }
  return e;
}
const Bo = 0, mo = 1, Ii = 2, Ya = 3, da = 4, wr = 5, Za = 6, Ar = 7;
function Xa(t) {
  return t.id === Bo;
}
function Pi(t) {
  return t.id === Ii;
}
function ew(t) {
  return function(e) {
    return e.id === mo;
  }(t) || nt(305, String(t.id), String(mo)), Object.assign(t, { id: Ii });
}
const rw = /* @__PURE__ */ new Set();
class aw {
  constructor(e, r) {
    At(this, "builder");
    At(this, "configs");
    At(this, "_dependency");
    At(this, "_peerNameSet");
    At(this, "extension");
    At(this, "state");
    At(this, "_signal");
    this.builder = e, this.extension = r, this.configs = /* @__PURE__ */ new Set(), this.state = { id: Bo };
  }
  mergeConfigs() {
    let e = this.extension.config || {};
    const r = this.extension.mergeConfig ? this.extension.mergeConfig.bind(this.extension) : gl;
    for (const a of this.configs) e = r(e, a);
    return e;
  }
  init(e) {
    const r = this.state;
    Pi(r) || nt(306, String(r.id));
    const a = { getDependency: this.getInitDependency.bind(this), getDirectDependentNames: this.getDirectDependentNames.bind(this), getPeer: this.getInitPeer.bind(this), getPeerNameSet: this.getPeerNameSet.bind(this) }, n = { ...a, getDependency: this.getDependency.bind(this), getInitResult: this.getInitResult.bind(this), getPeer: this.getPeer.bind(this) }, i = function(c, d, l) {
      return Object.assign(c, { config: d, id: Ya, registerState: l });
    }(r, this.mergeConfigs(), a);
    let s;
    this.state = i, this.extension.init && (s = this.extension.init(e, i.config, a)), this.state = function(c, d, l) {
      return Object.assign(c, { id: da, initResult: d, registerState: l });
    }(i, s, n);
  }
  build(e) {
    const r = this.state;
    let a;
    r.id !== da && nt(307, String(r.id), String(wr)), this.extension.build && (a = this.extension.build(e, r.config, r.registerState));
    const n = { ...r.registerState, getOutput: () => a, getSignal: this.getSignal.bind(this) };
    this.state = function(i, s, c) {
      return Object.assign(i, { id: wr, output: s, registerState: c });
    }(r, a, n);
  }
  register(e, r) {
    this._signal = r;
    const a = this.state;
    a.id !== wr && nt(308, String(a.id), String(wr));
    const n = this.extension.register && this.extension.register(e, a.config, a.registerState);
    return this.state = function(i) {
      return Object.assign(i, { id: Za });
    }(a), () => {
      const i = this.state;
      i.id !== Ar && nt(309, String(a.id), String(Ar)), this.state = function(s) {
        return Object.assign(s, { id: wr });
      }(i), n && n();
    };
  }
  afterRegistration(e) {
    const r = this.state;
    let a;
    return r.id !== Za && nt(310, String(r.id), String(Za)), this.extension.afterRegistration && (a = this.extension.afterRegistration(e, r.config, r.registerState)), this.state = function(n) {
      return Object.assign(n, { id: Ar });
    }(r), a;
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
      return r.id >= Ya;
    }(e) || nt(314, String(e.id), String(Ya)), { config: e.config };
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
      return r.id >= Ar;
    }(e) || nt(316, String(e.id), String(Ar)), e;
  }
  getDirectDependentNames() {
    return this.builder.incomingEdges.get(this.extension.name) || rw;
  }
  getPeerNameSet() {
    let e = this._peerNameSet;
    return e || (e = new Set((this.extension.peerDependencies || []).map(([r]) => r)), this._peerNameSet = e), e;
  }
  getExtensionDependency() {
    if (!this._dependency) {
      const e = this.state;
      (function(r) {
        return r.id >= wr;
      })(e) || nt(317, this.extension.name), this._dependency = { config: e.config, init: e.initResult, output: e.output };
    }
    return this._dependency;
  }
}
const xn = { tag: Do };
function ow() {
  const t = He();
  t.isEmpty() && t.append(Jr());
}
const nw = te({ config: ir({ setOptions: xn, updateOptions: xn }), init: ({ $initialEditorState: t = ow }) => ({ $initialEditorState: t, initialized: !1 }), afterRegistration(t, { updateOptions: e, setOptions: r }, a) {
  const n = a.getInitResult();
  if (!n.initialized) {
    n.initialized = !0;
    const { $initialEditorState: i } = n;
    if (xl(i)) t.setEditorState(i, r);
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
}, name: "@lexical/extension/InitialState", nodes: [ml, oi, vl, bl, ai] }), yn = Symbol.for("@lexical/extension/LexicalBuilder");
function kn() {
}
function iw(t) {
  throw t;
}
function wa(t) {
  return Array.isArray(t) ? t : [t];
}
const Ja = "0.43.0+prod.esm";
class fr {
  constructor(e) {
    At(this, "roots");
    At(this, "extensionNameMap");
    At(this, "outgoingConfigEdges");
    At(this, "incomingEdges");
    At(this, "conflicts");
    At(this, "_sortedExtensionReps");
    At(this, "PACKAGE_VERSION");
    this.outgoingConfigEdges = /* @__PURE__ */ new Map(), this.incomingEdges = /* @__PURE__ */ new Map(), this.extensionNameMap = /* @__PURE__ */ new Map(), this.conflicts = /* @__PURE__ */ new Map(), this.PACKAGE_VERSION = Ja, this.roots = e;
    for (const r of e) this.addExtension(r);
  }
  static fromExtensions(e) {
    const r = [wa(nw)];
    for (const a of e) r.push(wa(a));
    return new fr(r);
  }
  static maybeFromEditor(e) {
    const r = e[yn];
    return r && (r.PACKAGE_VERSION !== Ja && nt(292, r.PACKAGE_VERSION, Ja), r instanceof fr || nt(293)), r;
  }
  static fromEditor(e) {
    const r = fr.maybeFromEditor(e);
    return r === void 0 && nt(294), r;
  }
  constructEditor() {
    const { $initialEditorState: e, onError: r, ...a } = this.buildCreateEditorArgs(), n = Object.assign(ri({ ...a, ...r ? { onError: (i) => {
      r(i, n);
    } } : {} }), { [yn]: this });
    for (const i of this.sortedExtensionReps()) i.build(n);
    return n;
  }
  buildEditor() {
    let e = kn;
    function r() {
      try {
        e();
      } finally {
        e = kn;
      }
    }
    const a = Object.assign(this.constructEditor(), { dispose: r, [Symbol.dispose]: r });
    return e = De(this.registerEditor(a), () => a.setRootElement(null)), a;
  }
  hasExtensionByName(e) {
    return this.extensionNameMap.has(e);
  }
  getExtensionRep(e) {
    const r = this.extensionNameMap.get(e.name);
    if (r) return r.extension !== e && nt(295, e.name), r;
  }
  addEdge(e, r, a) {
    const n = this.outgoingConfigEdges.get(e);
    n ? n.set(r, a) : this.outgoingConfigEdges.set(e, /* @__PURE__ */ new Map([[r, a]]));
    const i = this.incomingEdges.get(r);
    i ? i.add(e) : this.incomingEdges.set(r, /* @__PURE__ */ new Set([e]));
  }
  addExtension(e) {
    this._sortedExtensionReps !== void 0 && nt(296);
    const r = wa(e), [a] = r;
    typeof a.name != "string" && nt(297, typeof a.name);
    let n = this.extensionNameMap.get(a.name);
    if (n !== void 0 && n.extension !== a && nt(298, a.name), !n) {
      n = new aw(this, a), this.extensionNameMap.set(a.name, n);
      const i = this.conflicts.get(a.name);
      typeof i == "string" && nt(299, a.name, i);
      for (const s of a.conflictsWith || []) this.extensionNameMap.has(s) && nt(299, a.name, s), this.conflicts.set(s, a.name);
      for (const s of a.dependencies || []) {
        const c = wa(s);
        this.addEdge(a.name, c[0].name, c.slice(1)), this.addExtension(c);
      }
      for (const [s, c] of a.peerDependencies || []) this.addEdge(a.name, s, c ? [c] : []);
    }
  }
  sortedExtensionReps() {
    if (this._sortedExtensionReps) return this._sortedExtensionReps;
    const e = [], r = (a, n) => {
      let i = a.state;
      if (Pi(i)) return;
      const s = a.extension.name;
      var c;
      Xa(i) || nt(300, s, n || "[unknown]"), Xa(c = i) || nt(304, String(c.id), String(Bo)), i = Object.assign(c, { id: mo }), a.state = i;
      const d = this.outgoingConfigEdges.get(s);
      if (d) for (const l of d.keys()) {
        const w = this.extensionNameMap.get(l);
        w && r(w, s);
      }
      i = ew(i), a.state = i, e.push(a);
    };
    for (const a of this.extensionNameMap.values()) Xa(a.state) && r(a);
    for (const a of e) for (const [n, i] of this.outgoingConfigEdges.get(a.extension.name) || []) if (i.length > 0) {
      const s = this.extensionNameMap.get(n);
      if (s) for (const c of i) s.configs.add(c);
    }
    for (const [a, ...n] of this.roots) if (n.length > 0) {
      const i = this.extensionNameMap.get(a.name);
      i === void 0 && nt(301, a.name);
      for (const s of n) i.configs.add(s);
    }
    return this._sortedExtensionReps = e, this._sortedExtensionReps;
  }
  registerEditor(e) {
    const r = this.sortedExtensionReps(), a = new AbortController(), n = [() => a.abort()], i = a.signal;
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
    const e = {}, r = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map(), i = {}, s = {}, c = this.sortedExtensionReps();
    for (const w of c) {
      const { extension: u } = w;
      if (u.onError !== void 0 && (e.onError = u.onError), u.disableEvents !== void 0 && (e.disableEvents = u.disableEvents), u.parentEditor !== void 0 && (e.parentEditor = u.parentEditor), u.editable !== void 0 && (e.editable = u.editable), u.namespace !== void 0 && (e.namespace = u.namespace), u.$initialEditorState !== void 0 && (e.$initialEditorState = u.$initialEditorState), u.nodes) for (const h of Qd(u)) {
        if (typeof h != "function") {
          const f = a.get(h.replace);
          f && nt(302, u.name, h.replace.name, f.extension.name), a.set(h.replace, w);
        }
        r.add(h);
      }
      if (u.html) {
        if (u.html.export) for (const [h, f] of u.html.export.entries()) n.set(h, f);
        u.html.import && Object.assign(i, u.html.import);
      }
      u.theme && Mi(s, u.theme);
    }
    Object.keys(s).length > 0 && (e.theme = s), r.size && (e.nodes = [...r]);
    const d = Object.keys(i).length > 0, l = n.size > 0;
    (d || l) && (e.html = {}, d && (e.html.import = i), l && (e.html.export = n));
    for (const w of c) w.init(e);
    return e.onError || (e.onError = iw), e;
  }
}
const sw = /* @__PURE__ */ new Set(), _n = te({ build(t, e, r) {
  const a = r.getDependency(fo).output, n = Wr({ watchedNodeKeys: /* @__PURE__ */ new Map() }), i = Di(() => {
  }, () => me(() => {
    const s = i.peek(), { watchedNodeKeys: c } = n.value;
    let d, l = !1;
    a.value.read(() => {
      if (Gt()) for (const [w, u] of c.entries()) {
        if (u.size === 0) {
          c.delete(w);
          continue;
        }
        const h = Dl(w), f = h && h.isSelected() || !1;
        l = l || f !== (!!s && s.has(w)), f && (d = d || /* @__PURE__ */ new Set(), d.add(w));
      }
    }), !l && d && s && d.size === s.size || (i.value = d);
  }));
  return { watchNodeKey: function(s) {
    const c = Xd(() => (i.value || sw).has(s)), { watchedNodeKeys: d } = n.peek();
    let l = d.get(s);
    const w = l !== void 0;
    return l = l || /* @__PURE__ */ new Set(), l.add(c), w || (d.set(s, l), n.value = { watchedNodeKeys: d }), c;
  } };
}, dependencies: [fo], name: "@lexical/extension/NodeSelection" }), cw = yl("INSERT_HORIZONTAL_RULE_COMMAND");
class xr extends co {
  static getType() {
    return "horizontalrule";
  }
  static clone(e) {
    return new xr(e.__key);
  }
  static importJSON(e) {
    return jo().updateFromJSON(e);
  }
  static importDOM() {
    return { hr: () => ({ conversion: lw, priority: 0 }) };
  }
  exportDOM() {
    return { element: document.createElement("hr") };
  }
  createDOM(e) {
    const r = document.createElement("hr");
    return wi(r, e.theme.hr), r;
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
function lw() {
  return { node: jo() };
}
function jo() {
  return zl(xr);
}
function dw(t) {
  return t instanceof xr;
}
te({ dependencies: [fo, _n], name: "@lexical/extension/HorizontalRule", nodes: () => [xr], register(t, e, r) {
  const { watchNodeKey: a } = r.getDependency(_n).output, n = Wr({ nodeSelections: /* @__PURE__ */ new Map() }), i = t._config.theme.hrSelected ?? "selected";
  return De(t.registerCommand(cw, (s) => {
    const c = Gt();
    if (!fe(c)) return !1;
    if (c.focus.getNode() !== null) {
      const d = jo();
      Hd(d);
    }
    return !0;
  }, Mo), t.registerCommand(kl, (s) => {
    if (_l(s.target)) {
      const c = Nl(s.target);
      if (dw(c)) return function(d, l = !1) {
        const w = Gt(), u = d.isSelected(), h = d.getKey();
        let f;
        l && li(w) ? f = w : (f = Cl(), El(f)), u ? f.delete(h) : f.add(h);
      }(c, s.shiftKey), !0;
    }
    return !1;
  }, di), t.registerMutationListener(xr, (s, c) => {
    Yd(() => {
      let d = !1;
      const { nodeSelections: l } = n.peek();
      for (const [w, u] of s.entries()) if (u === "destroyed") l.delete(w), d = !0;
      else {
        const h = l.get(w), f = t.getElementByKey(w);
        h ? h.domNode.value = f : (d = !0, l.set(w, { domNode: Wr(f), selectedSignal: a(w) }));
      }
      d && (n.value = { nodeSelections: l });
    });
  }), me(() => {
    const s = [];
    for (const { domNode: c, selectedSignal: d } of n.value.nodeSelections.values()) s.push(me(() => {
      const l = c.value;
      l && (d.value ? wi(l, i) : Ml(l, i));
    }));
    return De(...s);
  }));
} });
te({ build: (t, e) => zr({ inheritEditableFromParent: e.inheritEditableFromParent }), config: ir({ $getParentEditor: function() {
  const t = Tl();
  return fr.fromEditor(t), t;
}, inheritEditableFromParent: !1 }), init: (t, e, r) => {
  const a = e.$getParentEditor();
  t.parentEditor = a, t.theme = t.theme || a._config.theme;
}, name: "@lexical/extension/NestedEditor", register: (t, e, r) => me(() => {
  const a = t._parentEditor;
  if (a && r.getOutput().inheritEditableFromParent.value) return t.setEditable(a.isEditable()), a.registerEditableListener(t.setEditable.bind(t));
}) });
te({ build: (t, e, r) => zr(e), config: ir({ disabled: !1, onReposition: void 0 }), name: "@lexical/utils/SelectionAlwaysOnDisplay", register: (t, e, r) => {
  const a = r.getOutput();
  return me(() => {
    if (!a.disabled.value) return Ud(t, a.onReposition.value);
  });
} });
function $i(t) {
  return t.canBeEmpty();
}
function ww(t, e, r = $i) {
  return De(t.registerCommand(Il, (a) => {
    const n = Gt();
    if (!fe(n)) return !1;
    a.preventDefault();
    const i = function(s) {
      if (s.getNodes().filter((h) => Pl(h) && h.canIndent()).length > 0) return !0;
      const c = s.anchor, d = s.focus, l = d.isBefore(c) ? d : c, w = l.getNode(), u = Kd(w);
      if (u.canIndent()) {
        const h = u.getKey();
        let f = $l();
        if (f.anchor.set(h, 0, "element"), f.focus.set(h, 0, "element"), f = Al(f), f.anchor.is(l)) return !0;
      }
      return !1;
    }(n) ? a.shiftKey ? Vl : sn : Ll;
    return t.dispatchCommand(i, void 0);
  }, Mo), t.registerCommand(sn, () => {
    const a = typeof e == "number" ? e : e ? e.peek() : null, n = Gt();
    if (!fe(n)) return !1;
    const i = typeof r == "function" ? r : r.peek();
    return qd((s) => {
      if (i(s)) {
        const c = s.getIndent() + 1;
        (!a || c < a) && s.setIndent(c);
      }
    });
  }, Io));
}
te({ build: (t, e, r) => zr(e), config: ir({ $canIndent: $i, disabled: !1, maxIndent: null }), name: "@lexical/extension/TabIndentation", register(t, e, r) {
  const { disabled: a, maxIndent: n, $canIndent: i } = r.getOutput();
  return me(() => {
    if (!a.value) return ww(t, n, i);
  });
} });
const uw = te({ name: "@lexical/react/ReactProvider" });
function pw() {
  return He().getTextContent();
}
function hw(t, e = !0) {
  if (t) return !1;
  let r = pw();
  return e && (r = r.trim()), r === "";
}
function gw(t) {
  if (!hw(t, !1)) return !1;
  const e = He().getChildren(), r = e.length;
  if (r > 1) return !1;
  for (let a = 0; a < r; a++) {
    const n = e[a];
    if (Bl(n)) return !1;
    if (qr(n)) {
      if (!jl(n) || n.__indent !== 0) return !1;
      const i = n.getChildren(), s = i.length;
      for (let c = 0; c < s; c++) {
        const d = i[a];
        if (!lo(d)) return !1;
      }
    }
  }
  return !0;
}
function Ai(t) {
  return () => gw(t);
}
function Vi(t) {
  const e = window.location.origin, r = (a) => {
    if (a.origin !== e) return;
    const n = t.getRootElement();
    if (document.activeElement !== n) return;
    const i = a.data;
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
            const [l, w, u, h, f] = d;
            t.update(() => {
              const _ = Gt();
              if (fe(_)) {
                const b = _.anchor;
                let g = b.getNode(), k = 0, y = 0;
                if (lo(g) && l >= 0 && w >= 0 && (k = l, y = l + w, _.setTextNodeRange(g, k, g, y)), k === y && u === "" || (_.insertRawText(u), g = b.getNode()), lo(g)) {
                  k = h, y = h + f;
                  const S = g.getTextContentSize();
                  k = k > S ? S : k, y = y > S ? S : y, _.setTextNodeRange(g, k, g, y);
                }
                a.stopImmediatePropagation();
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
te({ build: (t, e, r) => zr(e), config: ir({ disabled: typeof window > "u" }), name: "@lexical/dragon", register: (t, e, r) => me(() => r.getOutput().disabled.value ? void 0 : Vi(t)) });
function fw(t, ...e) {
  const r = new URL("https://lexical.dev/docs/error"), a = new URLSearchParams();
  a.append("code", t);
  for (const n of e) a.append("v", n);
  throw r.search = a.toString(), Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
const Fo = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Ht : Y;
function mw({ editor: t, ErrorBoundary: e }) {
  return function(r, a) {
    const [n, i] = E(() => r.getDecorators());
    return Fo(() => r.registerDecoratorListener((s) => {
      Gl(() => {
        i(s);
      });
    }), [r]), Y(() => {
      i(r.getDecorators());
    }, [r]), I(() => {
      const s = [], c = Object.keys(n);
      for (let d = 0; d < c.length; d++) {
        const l = c[d], w = o(a, { onError: (h) => r._onError(h), children: o(Gc, { fallback: null, children: n[l] }) }), u = r.getElementByKey(l);
        u !== null && s.push(ql(w, u, l));
      }
      return s;
    }, [a, n, r]);
  }(t, e);
}
function vw({ editor: t, ErrorBoundary: e }) {
  return function(r) {
    const a = fr.maybeFromEditor(r);
    if (a && a.hasExtensionByName(uw.name)) {
      for (const n of ["@lexical/plain-text", "@lexical/rich-text"]) a.hasExtensionByName(n) && fw(320, n);
      return !0;
    }
    return !1;
  }(t) ? null : o(mw, { editor: t, ErrorBoundary: e });
}
function Nn(t) {
  return t.getEditorState().read(Ai(t.isComposing()));
}
function bw({ contentEditable: t, placeholder: e = null, ErrorBoundary: r }) {
  const [a] = be();
  return function(n) {
    Fo(() => De(Hl(n), Vi(n)), [n]);
  }(a), p(Dt, { children: [t, o(xw, { content: e }), o(vw, { editor: a, ErrorBoundary: r })] });
}
function xw({ content: t }) {
  const [e] = be(), r = function(n) {
    const [i, s] = E(() => Nn(n));
    return Fo(() => {
      function c() {
        const d = Nn(n);
        s(d);
      }
      return c(), De(n.registerUpdateListener(() => {
        c();
      }), n.registerEditableListener(() => {
        c();
      }));
    }, [n]), i;
  }(e), a = $d();
  return r ? typeof t == "function" ? t(a) : t : null;
}
function yw({ defaultSelection: t }) {
  const [e] = be();
  return Y(() => {
    e.focus(() => {
      const r = document.activeElement, a = e.getRootElement();
      a === null || r !== null && a.contains(r) || a.focus({ preventScroll: !0 });
    }, { defaultSelection: t });
  }, [t, e]), null;
}
const kw = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Ht : Y;
function _w({ onClear: t }) {
  const [e] = be();
  return kw(() => Oi(e, t), [e, t]), null;
}
const Li = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Ht : Y;
function Nw({ editor: t, ariaActiveDescendant: e, ariaAutoComplete: r, ariaControls: a, ariaDescribedBy: n, ariaErrorMessage: i, ariaExpanded: s, ariaInvalid: c, ariaLabel: d, ariaLabelledBy: l, ariaMultiline: w, ariaOwns: u, ariaRequired: h, autoCapitalize: f, className: _, id: b, role: g = "textbox", spellCheck: k = !0, style: y, tabIndex: S, "data-testid": P, ...j }, z) {
  const [D, M] = E(t.isEditable()), R = B((K) => {
    K && K.ownerDocument && K.ownerDocument.defaultView ? t.setRootElement(K) : t.setRootElement(null);
  }, [t]), O = I(() => /* @__PURE__ */ function(...K) {
    return (q) => {
      for (const Z of K) typeof Z == "function" ? Z(q) : Z != null && (Z.current = q);
    };
  }(z, R), [R, z]);
  return Li(() => (M(t.isEditable()), t.registerEditableListener((K) => {
    M(K);
  })), [t]), o("div", { "aria-activedescendant": D ? e : void 0, "aria-autocomplete": D ? r : "none", "aria-controls": D ? a : void 0, "aria-describedby": n, ...i != null ? { "aria-errormessage": i } : {}, "aria-expanded": D && g === "combobox" ? !!s : void 0, ...c != null ? { "aria-invalid": c } : {}, "aria-label": d, "aria-labelledby": l, "aria-multiline": w, "aria-owns": D ? u : void 0, "aria-readonly": !D || void 0, "aria-required": h, autoCapitalize: f, className: _, contentEditable: D, "data-testid": P, id: b, ref: O, role: g, spellCheck: k, style: y, tabIndex: S, ...j });
}
const Cw = zo(Nw);
function Cn(t) {
  return t.getEditorState().read(Ai(t.isComposing()));
}
const Ew = zo(Tw);
function Tw(t, e) {
  const { placeholder: r, ...a } = t, [n] = be();
  return p(Dt, { children: [o(Cw, { editor: n, ...a, ref: e }), r != null && o(Sw, { editor: n, content: r })] });
}
function Sw({ content: t, editor: e }) {
  const r = function(s) {
    const [c, d] = E(() => Cn(s));
    return Li(() => {
      function l() {
        const w = Cn(s);
        d(w);
      }
      return l(), De(s.registerUpdateListener(() => {
        l();
      }), s.registerEditableListener(() => {
        l();
      }));
    }, [s]), c;
  }(e), [a, n] = E(e.isEditable());
  if (Ht(() => (n(e.isEditable()), e.registerEditableListener((s) => {
    n(s);
  })), [e]), !r) return null;
  let i = null;
  return typeof t == "function" ? i = t(a) : t !== null && (i = t), i === null ? null : o("div", { "aria-hidden": !0, children: i });
}
function Rw({
  placeholder: t,
  className: e,
  placeholderClassName: r
}) {
  return /* @__PURE__ */ o(
    Ew,
    {
      className: e ?? "ContentEditable__root tw:relative tw:block tw:min-h-11 tw:overflow-auto tw:px-3 tw:py-3 tw:text-sm tw:outline-hidden",
      "aria-placeholder": t,
      placeholder: /* @__PURE__ */ o(
        "div",
        {
          className: r ?? "tw:pointer-events-none tw:absolute tw:top-0 tw:select-none tw:overflow-hidden tw:text-ellipsis tw:px-3 tw:py-3 tw:text-sm tw:text-muted-foreground",
          children: t
        }
      )
    }
  );
}
const Bi = Or(void 0);
function Ow({
  activeEditor: t,
  $updateToolbar: e,
  blockType: r,
  setBlockType: a,
  showModal: n,
  children: i
}) {
  const s = I(
    () => ({
      activeEditor: t,
      $updateToolbar: e,
      blockType: r,
      setBlockType: a,
      showModal: n
    }),
    [t, e, r, a, n]
  );
  return /* @__PURE__ */ o(Bi.Provider, { value: s, children: i });
}
function ji() {
  const t = Xr(Bi);
  if (!t)
    throw new Error("useToolbarContext must be used within a ToolbarContext provider");
  return t;
}
function zw() {
  const [t, e] = E(void 0), r = B(() => {
    e(void 0);
  }, []), a = I(() => {
    if (t === void 0)
      return;
    const { title: i, content: s } = t;
    return /* @__PURE__ */ o(ao, { open: !0, onOpenChange: r, children: /* @__PURE__ */ p(oo, { children: [
      /* @__PURE__ */ o(no, { children: /* @__PURE__ */ o(io, { children: i }) }),
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
  return [a, n];
}
function Dw({
  children: t
}) {
  const [e] = be(), [r, a] = E(e), [n, i] = E("paragraph"), [s, c] = zw(), d = () => {
  };
  return Y(() => r.registerCommand(
    ui,
    (l, w) => (a(w), !1),
    Io
  ), [r]), /* @__PURE__ */ p(
    Ow,
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
function Mw(t) {
  const [e] = be(), { activeEditor: r } = ji();
  Y(() => r.registerCommand(
    ui,
    () => {
      const a = Gt();
      return a && t(a), !1;
    },
    Io
  ), [e, t]), Y(() => {
    r.getEditorState().read(() => {
      const a = Gt();
      a && t(a);
    });
  }, [r, t]);
}
const Iw = $o(
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
), Fi = Ct.createContext({
  size: "default",
  variant: "default",
  spacing: 0,
  orientation: "horizontal"
});
function Ui({
  className: t,
  variant: e,
  size: r,
  spacing: a = 0,
  orientation: n = "horizontal",
  children: i,
  ...s
}) {
  const c = ne();
  return /* @__PURE__ */ o(
    pi.Root,
    {
      "data-slot": "toggle-group",
      "data-variant": e,
      "data-size": r,
      "data-spacing": a,
      "data-orientation": n,
      style: { "--gap": a },
      className: v(
        "pr-twp tw:group/toggle-group tw:flex tw:w-fit tw:flex-row tw:items-center tw:gap-[--spacing(var(--gap))] tw:rounded-lg tw:data-[size=sm]:rounded-[min(var(--tw-radius-md),10px)] tw:data-vertical:flex-col tw:data-vertical:items-stretch",
        t
      ),
      dir: c,
      ...s,
      children: /* @__PURE__ */ o(
        Fi.Provider,
        {
          value: Ct.useMemo(
            () => ({ variant: e, size: r, spacing: a, orientation: n }),
            [e, r, a, n]
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
  size: a = "default",
  ...n
}) {
  const i = Ct.useContext(Fi);
  return /* @__PURE__ */ o(
    pi.Item,
    {
      "data-slot": "toggle-group-item",
      "data-variant": i.variant || r,
      "data-size": i.size || a,
      "data-spacing": i.spacing,
      className: v(
        "tw:shrink-0 tw:group-data-[spacing=0]/toggle-group:rounded-none tw:group-data-[spacing=0]/toggle-group:px-2 tw:focus:z-10 tw:focus-visible:z-10 tw:group-data-[spacing=0]/toggle-group:has-data-[icon=inline-end]:pe-1.5 tw:group-data-[spacing=0]/toggle-group:has-data-[icon=inline-start]:ps-1.5 tw:group-data-horizontal/toggle-group:data-[spacing=0]:first:rounded-s-lg tw:group-data-vertical/toggle-group:data-[spacing=0]:first:rounded-t-lg tw:group-data-horizontal/toggle-group:data-[spacing=0]:last:rounded-e-lg tw:group-data-vertical/toggle-group:data-[spacing=0]:last:rounded-b-lg tw:group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:border-s-0 tw:group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0 tw:group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-s tw:group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t",
        Iw({
          variant: i.variant || r,
          size: i.size || a
        }),
        t
      ),
      ...n,
      children: e
    }
  );
}
const En = [
  { format: "bold", icon: rc, label: "Bold" },
  { format: "italic", icon: ac, label: "Italic" }
  // CUSTOM: TJ removed underline and strikethrough as they are not supported by the current comment
  // data conversion and are not in P9 anyway. We can add these back if we ever get this supported.
  /* { format: 'underline', icon: UnderlineIcon, label: 'Underline' },
  { format: 'strikethrough', icon: StrikethroughIcon, label: 'Strikethrough' }, */
];
function Pw() {
  const { activeEditor: t } = ji(), [e, r] = E([]), a = B((n) => {
    if (fe(n) || Wl(n)) {
      const i = [];
      En.forEach(({ format: s }) => {
        n.hasFormat(s) && i.push(s);
      }), r((s) => s.length !== i.length || !i.every((c) => s.includes(c)) ? i : s);
    }
  }, []);
  return Mw(a), /* @__PURE__ */ o(
    Ui,
    {
      type: "multiple",
      value: e,
      onValueChange: r,
      variant: "outline",
      size: "sm",
      children: En.map(({ format: n, icon: i, label: s }) => /* @__PURE__ */ o(
        ma,
        {
          value: n,
          "aria-label": s,
          onClick: () => {
            t.dispatchCommand(ci, n);
          },
          children: /* @__PURE__ */ o(i, { className: "tw:h-4 tw:w-4" })
        },
        n
      ))
    }
  );
}
const Ki = "data-platform-content-zoom-root", dh = "data-platform-content-zoom-scope", Hi = "data-platform-content-zoom-label", Gi = Or(void 0);
function wh({ area: t, label: e, children: r }) {
  const a = I(
    () => ({
      [Ki]: t ?? "",
      // An empty label names nothing, so it writes no attribute, as on `ContentZoomRoot`.
      ...e ? { [Hi]: e } : {}
    }),
    [t, e]
  );
  return /* @__PURE__ */ o(Gi.Provider, { value: a, children: r });
}
function Dr() {
  return Xr(Gi) ?? {};
}
function $w({ onClear: t }) {
  const [e] = be();
  Y(() => {
    t && t(() => {
      e.dispatchCommand(si, void 0);
    });
  }, [e, t]);
}
function Aw({
  placeholder: t = "Start typing ...",
  autoFocus: e = !1,
  onClear: r,
  actions: a
}) {
  const n = Dr(), [, i] = E(void 0);
  return /* @__PURE__ */ p("div", { className: "tw:relative", children: [
    /* @__PURE__ */ o(Dw, { children: () => (
      // Sticky, but deliberately with no z-index of its own. `position: sticky` pins relative
      // to the nearest scrolling ancestor, not this element's own overflow — `Plugins` is
      // shared by consumers (e.g. the comments panel's editor, whose scrolling ancestor is the
      // thread list) where the toolbar does need to stay pinned while its container scrolls.
      // With z-index left at its default (auto), this box establishes no stacking level of its
      // own, so a host's positioned chrome with an explicit z-index (e.g. a sticky panel
      // header) paints above it on stacking order rather than losing to it on DOM position.
      /* @__PURE__ */ o(
        "div",
        {
          "data-testid": "editor-format-toolbar",
          className: "tw:sticky tw:top-0 tw:flex tw:gap-2 tw:overflow-auto tw:border-b tw:p-1",
          children: /* @__PURE__ */ o(Pw, {})
        }
      )
    ) }),
    /* @__PURE__ */ p("div", { className: "tw:relative", children: [
      /* @__PURE__ */ o(
        bw,
        {
          contentEditable: (
            // CUSTOM: Spread the content-zoom text marker onto the content-editable wrapper so text
            // typed into a comment zooms like the saved note beside it, while the format toolbar
            // above and the actions below keep interface scale. It marks nothing outside a
            // ContentZoomTextProvider (the Scripture editor's comment pop-up has none).
            /* @__PURE__ */ o(
              "div",
              {
                ref: (c) => {
                  c !== void 0 && i(c);
                },
                ...n,
                children: /* @__PURE__ */ o(Rw, { placeholder: t })
              }
            )
          ),
          ErrorBoundary: Md
        }
      ),
      e && /* @__PURE__ */ o(yw, { defaultSelection: "rootEnd" }),
      /* @__PURE__ */ o($w, { onClear: r }),
      /* @__PURE__ */ o(_w, {})
    ] }),
    a && /* @__PURE__ */ o(
      "div",
      {
        "data-slot": "editor-actions",
        className: "tw:flex tw:flex-row tw:items-center tw:gap-2 tw:border-t tw:px-2 tw:py-1.5",
        children: a
      }
    )
  ] });
}
const Vw = {
  namespace: "commentEditor",
  theme: Ao,
  nodes: Vo,
  onError: (t) => {
    console.error(t);
  }
};
function Ra({
  editorState: t,
  editorSerializedState: e,
  onChange: r,
  onSerializedChange: a,
  placeholder: n = "Start typing…",
  autoFocus: i = !1,
  onClear: s,
  className: c,
  actions: d
}) {
  const [l] = E(() => ({
    ...Vw,
    ...t ? { editorState: t } : {},
    ...e ? { editorState: JSON.stringify(e) } : {}
  })), w = B(
    (u) => {
      r == null || r(u), a == null || a(u.toJSON());
    },
    [r, a]
  );
  return (
    // CUSTOM: Added `className` prop
    /* @__PURE__ */ o(
      "div",
      {
        className: v(
          "pr-twp tw:overflow-hidden tw:rounded-lg tw:border tw:bg-background tw:shadow",
          c
        ),
        children: /* @__PURE__ */ o(Td, { initialConfig: l, children: /* @__PURE__ */ p(Qt, { children: [
          /* @__PURE__ */ o(
            Aw,
            {
              placeholder: n,
              autoFocus: i,
              onClear: s,
              actions: d
            }
          ),
          /* @__PURE__ */ o(Rd, { ignoreSelectionChange: !0, onChange: w })
        ] }) })
      }
    )
  );
}
function qi(t) {
  const e = t.querySelector('[contenteditable="true"]');
  if (!e) return !1;
  e.focus();
  const r = window.getSelection(), a = document.createRange();
  return a.selectNodeContents(e), a.collapse(!1), r == null || r.removeAllRanges(), r == null || r.addRange(a), !0;
}
function Wi(t) {
  return t ? t.some(
    (e) => e && "text" in e && e.text.trim().length > 0 ? !0 : !e || !("children" in e) ? !1 : Wi(e.children)
  ) : !1;
}
function Yt(t) {
  var e;
  return (e = t == null ? void 0 : t.root) != null && e.children ? Wi(t.root.children) : !1;
}
function Lw(t) {
  if (!t || t.trim() === "")
    throw new Error("Input HTML is empty");
  const e = hi({
    namespace: "EditorUtils",
    theme: Ao,
    nodes: Vo,
    onError: (a) => {
      console.error(a);
    }
  });
  let r;
  if (e.update(
    () => {
      const n = new DOMParser().parseFromString(t, "text/html"), i = Zl(e, n);
      He().clear(), Fl(i);
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
  const e = hi({
    namespace: "EditorUtils",
    theme: Ao,
    nodes: Vo,
    onError: (n) => {
      console.error(n);
    }
  }), r = e.parseEditorState(JSON.stringify(t));
  e.setEditorState(r);
  let a = "";
  return e.getEditorState().read(() => {
    a = Yl(e);
  }), a = a.replace(/\s+style="[^"]*"/g, "").replace(/\s+class="[^"]*"/g, "").replace(/<span>(.*?)<\/span>/g, "$1").replace(/<b><strong[^>]*>(.*?)<\/strong><\/b>/g, "<b>$1</b>").replace(/<strong><b[^>]*>(.*?)<\/b><\/strong>/g, "<b>$1</b>").replace(/<i><em[^>]*>(.*?)<\/em><\/i>/g, "<i>$1</i>").replace(/<em><i[^>]*>(.*?)<\/i><\/em>/g, "<i>$1</i>").replace(/<u><span[^>]*>(.*?)<\/span><\/u>/g, "<u>$1</u>").replace(/<s><span[^>]*>(.*?)<\/span><\/s>/g, "<s>$1</s>").replace(/<br\s*\/?>/gi, "<br/>"), a;
}
function Uo(t) {
  return ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Home", "End"].includes(t.key) ? (t.stopPropagation(), !0) : !1;
}
const Bw = "verseText", uh = Object.freeze([
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
function Tn(t) {
  return t.editorState === void 0 && t.assignedUser === void 0 && !Br(t.commentEdits);
}
const Yi = [
  "tw:prose tw:max-w-none tw:break-words tw:text-sm tw:font-normal tw:text-foreground",
  "tw:[&>blockquote]:border-s-0 tw:[&>blockquote]:p-0 tw:[&>blockquote]:ps-0 tw:[&>blockquote]:font-normal tw:[&>blockquote]:not-italic tw:[&>blockquote]:text-foreground",
  "tw:prose-quoteless"
].join(" ");
function Zi(t) {
  return (t == null ? void 0 : t.conflictType) === Bw;
}
function Xi(t) {
  return t === "replaced" ? "reject" : t === "merged" ? "merged" : "accept";
}
function va(t, e) {
  return t === "" ? e["%comment_assign_unassigned%"] ?? "Unassigned" : t === "Team" ? e["%comment_assign_team%"] ?? "Team" : t;
}
function Ko(t) {
  const e = Os();
  return t.key === "Enter" && (e && t.metaKey || !e && t.ctrlKey);
}
function Jt(t, e, r) {
  const a = e[t];
  return a === void 0 || a === t ? r : a;
}
const jw = {
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
}, Fw = {
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
function Qa(t, e) {
  return t === "" ? e["%commentEditor_unassigned%"] ?? "Unassigned" : t === "Team" ? e["%commentEditor_team%"] ?? "Team" : t;
}
function ph({
  assignableUsers: t,
  onSave: e,
  onClose: r,
  localizedStrings: a,
  initialAssignedUser: n
}) {
  const [i, s] = E(Fw), [c, d] = E(n), [l, w] = E(!1), u = H(void 0), h = H(null);
  Y(() => {
    let g = !0;
    const k = h.current;
    if (!k) return;
    const y = setTimeout(() => {
      g && qi(k);
    }, 300);
    return () => {
      g = !1, clearTimeout(y);
    };
  }, []);
  const f = B(() => {
    if (!Yt(i)) return;
    const g = Oa(i);
    e(g, c);
  }, [i, e, c]), _ = a["%commentEditor_placeholder%"] ?? "Type your comment here...", b = a["%commentEditor_assignTo_label%"] ?? "Assign to";
  return /* @__PURE__ */ p("div", { className: "pr-twp tw:grid tw:gap-3", children: [
    /* @__PURE__ */ p("div", { className: "tw:flex tw:items-center tw:justify-between", children: [
      /* @__PURE__ */ o("span", { className: "tw:text-sm tw:font-medium", children: b }),
      /* @__PURE__ */ o(
        zs,
        {
          onCancelClick: r,
          onAcceptClick: f,
          canAccept: Yt(i),
          localizedStrings: a,
          acceptLabel: a["%commentEditor_saveButton_tooltip%"]
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { className: "tw:flex tw:items-center tw:gap-2", children: /* @__PURE__ */ p(Cr, { open: l, onOpenChange: w, children: [
      /* @__PURE__ */ o(Er, { asChild: !0, children: /* @__PURE__ */ p(
        J,
        {
          variant: "outline",
          className: "tw:flex tw:w-full tw:items-center tw:justify-start tw:gap-2",
          disabled: t.length === 0,
          children: [
            /* @__PURE__ */ o(Zn, { className: "tw:h-4 tw:w-4" }),
            /* @__PURE__ */ o("span", { children: Qa(c !== void 0 ? c : "", a) })
          ]
        }
      ) }),
      /* @__PURE__ */ o(
        Tr,
        {
          className: "tw:w-auto tw:p-0",
          align: "start",
          onKeyDown: (g) => {
            g.key === "Escape" && (g.stopPropagation(), w(!1));
          },
          children: /* @__PURE__ */ o(Sr, { children: /* @__PURE__ */ o(Rr, { children: t.map((g) => /* @__PURE__ */ o(
            ar,
            {
              onSelect: () => {
                d(g || void 0), w(!1);
              },
              className: "tw:flex tw:items-center",
              children: /* @__PURE__ */ o("span", { children: Qa(g, a) })
            },
            g || "unassigned"
          )) }) })
        }
      )
    ] }) }),
    /* @__PURE__ */ o(
      "div",
      {
        ref: h,
        role: "textbox",
        tabIndex: -1,
        className: "tw:outline-hidden",
        onKeyDownCapture: (g) => {
          g.key === "Escape" ? (g.preventDefault(), g.stopPropagation(), r()) : Ko(g) && (g.preventDefault(), g.stopPropagation(), Yt(i) && f());
        },
        onKeyDown: (g) => {
          Uo(g), (g.key === "Enter" || g.key === " ") && g.stopPropagation();
        },
        children: /* @__PURE__ */ o(
          Ra,
          {
            editorSerializedState: i,
            onSerializedChange: (g) => s(g),
            placeholder: _,
            onClear: (g) => {
              u.current = g;
            }
          }
        )
      }
    )
  ] });
}
const hh = Object.freeze([
  "%commentEditor_placeholder%",
  "%commentEditor_assignTo_label%",
  "%commentEditor_saveButton_tooltip%",
  "%commentEditor_unassigned%",
  "%commentEditor_team%",
  ...jn
]), gh = Object.freeze([
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
]), Uw = "comment-list";
function fh(t) {
  return t;
}
function Kw({
  className: t,
  size: e = "default",
  ...r
}) {
  return /* @__PURE__ */ o(
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
function mh({ className: t, ...e }) {
  return /* @__PURE__ */ o(
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
function vh({ className: t, ...e }) {
  return /* @__PURE__ */ o(
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
function bh({ className: t, ...e }) {
  return /* @__PURE__ */ o(
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
function Hw({ className: t, ...e }) {
  return /* @__PURE__ */ o(
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
function xh({ className: t, ...e }) {
  return /* @__PURE__ */ o(
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
function Yr({
  children: t,
  isDisabled: e,
  disabledExplanation: r,
  ...a
}) {
  return /* @__PURE__ */ o(
    "div",
    {
      ...a,
      role: e ? "group" : void 0,
      tabIndex: e ? 0 : void 0,
      "aria-label": e ? r : void 0,
      children: t
    }
  );
}
function Gw({
  className: t,
  size: e = "default",
  ...r
}) {
  return /* @__PURE__ */ o(
    Po.Root,
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
function yh({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    Po.Image,
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
function qw({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ o(
    Po.Fallback,
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
function Sn({
  comment: t,
  isReply: e = !1,
  localizedStrings: r,
  isThreadExpanded: a = !1,
  handleUpdateComment: n,
  handleDeleteComment: i,
  onEditingChange: s,
  canEditOrDelete: c = !1,
  draftEditorState: d,
  onDraftEditorStateChange: l
}) {
  const w = Dr(), [u, h] = E(), f = d ?? u, b = f !== void 0 && a, g = l !== void 0, k = B(
    (x) => {
      g || h(x), l == null || l(x);
    },
    [g, l]
  ), y = H(null), S = H(!1);
  Y(() => {
    if (!b || !S.current) return;
    S.current = !1;
    let x = !0;
    const W = y.current;
    if (!W) return;
    const N = setTimeout(() => {
      x && qi(W);
    }, 300);
    return () => {
      x = !1, clearTimeout(N);
    };
  }, [b]);
  const P = B(
    (x) => {
      x && x.stopPropagation(), k(void 0), s == null || s(!1);
    },
    [s, k]
  ), j = B(
    async (x) => {
      if (x && x.stopPropagation(), !f || !n) return;
      await n(
        t.id,
        Oa(f)
      ) && (k(void 0), s == null || s(!1));
    },
    [f, n, t.id, s, k]
  ), z = I(() => {
    const x = new Date(t.date), W = $c(
      x,
      r["%comment_date_today%"],
      r["%comment_date_yesterday%"]
    ), N = x.toLocaleTimeString(void 0, {
      hour: "numeric",
      minute: "2-digit"
    });
    return tr(r["%comment_dateAtTime%"], {
      date: W,
      time: N
    });
  }, [t.date, r]), D = I(() => t.user, [t.user]), M = I(
    () => t.user.split(" ").map((x) => x[0]).join("").toUpperCase().slice(0, 2),
    [t.user]
  ), R = I(() => Oo(t.contents), [t.contents]), O = I(
    () => t.contents.replace(/<[^>]*>/g, "").trim().length > 0,
    [t.contents]
  ), K = !!t.conflictResolutionAction && !O, q = I(() => {
    if (a && c)
      return /* @__PURE__ */ p(Dt, { children: [
        /* @__PURE__ */ p(
          je,
          {
            onClick: (x) => {
              x.stopPropagation(), S.current = !0;
              const W = t.contents.trim() !== "";
              k(W ? Lw(t.contents) : jw), s == null || s(!0);
            },
            children: [
              /* @__PURE__ */ o(oc, { className: "tw:me-2 tw:h-4 tw:w-4" }),
              r["%comment_editComment%"]
            ]
          }
        ),
        /* @__PURE__ */ p(
          je,
          {
            onClick: async (x) => {
              x.stopPropagation(), i && await i(t.id);
            },
            children: [
              /* @__PURE__ */ o(nc, { className: "tw:me-2 tw:h-4 tw:w-4" }),
              r["%comment_deleteComment%"]
            ]
          }
        )
      ] });
  }, [
    c,
    a,
    r,
    t.contents,
    t.id,
    i,
    s,
    k
  ]), Z = !Yt(f);
  return /* @__PURE__ */ p(
    "div",
    {
      className: v("tw:flex tw:w-full tw:flex-row tw:items-baseline tw:gap-2", {
        "tw:text-sm": e
      }),
      children: [
        /* @__PURE__ */ o(Gw, { className: "tw:h-8 tw:w-8", children: /* @__PURE__ */ o(qw, { className: "tw:text-xs tw:font-medium", children: M }) }),
        /* @__PURE__ */ p("div", { className: "tw:flex tw:flex-1 tw:flex-col tw:gap-1", children: [
          /* @__PURE__ */ p("div", { className: "tw:flex tw:w-full tw:flex-row tw:flex-wrap tw:items-baseline tw:gap-x-2", children: [
            /* @__PURE__ */ o("p", { className: "tw:text-sm tw:font-medium", children: D }),
            /* @__PURE__ */ o("p", { className: "tw:text-xs tw:font-normal tw:text-muted-foreground", children: z }),
            /* @__PURE__ */ o("div", { className: "tw:flex-1" }),
            e && t.assignedUser !== void 0 && /* @__PURE__ */ p(Hr, { variant: "secondary", className: "tw:text-xs tw:font-normal", children: [
              "→ ",
              va(t.assignedUser, r)
            ] })
          ] }),
          b && /* @__PURE__ */ o(
            "div",
            {
              role: "textbox",
              tabIndex: -1,
              className: "tw:flex tw:flex-col tw:gap-2",
              ref: y,
              onKeyDownCapture: (x) => {
                x.key === "Escape" ? (x.preventDefault(), x.stopPropagation(), P()) : Ko(x) && (x.preventDefault(), x.stopPropagation(), Yt(f) && j());
              },
              onKeyDown: (x) => {
                Uo(x), (x.key === "Enter" || x.key === " ") && x.stopPropagation();
              },
              onClick: (x) => {
                x.stopPropagation();
              },
              children: /* @__PURE__ */ o(
                Ra,
                {
                  className: v(
                    // Don't render blockquote on the first child. All comments are wrapped in blockquote
                    // that has text-align corresponding to LTR or RTL, so the blockquote is important.
                    // But we don't want it to look like there's a blockquote there. Target the
                    // lowest-level Lexical editor element by attribute so Tailwind can apply styles to
                    // the blockquote directly inside the editor.
                    'tw:[&_[data-lexical-editor="true"]>blockquote]:mt-0 tw:[&_[data-lexical-editor="true"]>blockquote]:border-s-0 tw:[&_[data-lexical-editor="true"]>blockquote]:ps-0 tw:[&_[data-lexical-editor="true"]>blockquote]:font-normal tw:[&_[data-lexical-editor="true"]>blockquote]:not-italic tw:[&_[data-lexical-editor="true"]>blockquote]:text-foreground'
                  ),
                  editorSerializedState: f,
                  onSerializedChange: (x) => k(x),
                  actions: /* @__PURE__ */ p(Dt, { children: [
                    /* @__PURE__ */ o("div", { className: "tw:flex-1" }),
                    /* @__PURE__ */ p(vt, { children: [
                      /* @__PURE__ */ o(bt, { asChild: !0, children: /* @__PURE__ */ o(
                        J,
                        {
                          size: "icon-sm",
                          onClick: P,
                          variant: "outline",
                          className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                          "aria-label": Jt(
                            "%comment_aria_cancel_edit%",
                            r,
                            "Cancel edit"
                          ),
                          children: /* @__PURE__ */ o(ic, {})
                        }
                      ) }),
                      /* @__PURE__ */ o(xt, { children: Jt(
                        "%comment_aria_cancel_edit%",
                        r,
                        "Cancel edit"
                      ) })
                    ] }),
                    /* @__PURE__ */ p(vt, { children: [
                      /* @__PURE__ */ o(bt, { asChild: !0, children: /* @__PURE__ */ o(
                        Yr,
                        {
                          isDisabled: Z,
                          disabledExplanation: Jt(
                            "%comment_aria_save_edit%",
                            r,
                            "Save edit"
                          ),
                          className: "tw:inline-flex",
                          children: /* @__PURE__ */ o(
                            J,
                            {
                              size: "icon-sm",
                              onClick: j,
                              className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                              disabled: Z,
                              "aria-label": Jt(
                                "%comment_aria_save_edit%",
                                r,
                                "Save edit"
                              ),
                              children: /* @__PURE__ */ o(Xn, {})
                            }
                          )
                        }
                      ) }),
                      /* @__PURE__ */ o(xt, { children: Jt(
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
          !b && /* @__PURE__ */ p(Dt, { children: [
            t.status === "Resolved" && !K && /* @__PURE__ */ o("div", { className: "tw:text-sm tw:italic", children: r["%comment_status_resolved%"] }),
            t.status === "Todo" && e && /* @__PURE__ */ o("div", { className: "tw:text-sm tw:italic", children: r["%comment_status_todo%"] }),
            K ? (
              // A platform-created conflict resolution comment carries an empty body — PT9 renders
              // its banner UI-side from conflictResolutionAction, it never stores text. So render the
              // localized, neutral outcome line here instead of the (empty) contents, styled like the
              // italic status lines above. These are the same neutral keys ConflictNoteCard's Result
              // region used to render inline. Only when the body IS empty: a resolution synced from
              // PT9 can carry the resolver's typed note alongside the action, and PT9 shows that text,
              // so the body branch below keeps it visible rather than discarding it for this banner.
              /* @__PURE__ */ o("div", { className: "tw:text-sm tw:italic", children: Xi(t.conflictResolutionAction) === "merged" ? r["%conflict_note_outcome_combined%"] ?? "Combined both changes." : r["%conflict_note_outcome_used_other%"] ?? "Used the other change instead of the current text." })
            ) : /* @__PURE__ */ o(
              "div",
              {
                className: v(
                  // Shared note-body prose/blockquote treatment (also used by conflict-diff's
                  // DIFF_HTML_CLASSES). Layer this comment item's own extras on top: items-start +
                  // gap-2 for layout, and line-clamp while the thread is collapsed.
                  Yi,
                  "tw:items-start tw:gap-2",
                  {
                    "tw:line-clamp-3": !a
                  }
                ),
                ...w,
                dangerouslySetInnerHTML: { __html: R }
              }
            )
          ] })
        ] }),
        q && /* @__PURE__ */ p(or, { children: [
          /* @__PURE__ */ o(Ke, { asChild: !0, children: /* @__PURE__ */ o(J, { variant: "ghost", size: "icon", children: /* @__PURE__ */ o(sc, {}) }) }),
          /* @__PURE__ */ o(nr, { align: "end", children: q })
        ] })
      ]
    }
  );
}
function Ji({
  show: t,
  disabled: e = !1,
  onClick: r,
  ariaLabel: a
}) {
  if (t)
    return /* @__PURE__ */ o(
      J,
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
        "aria-label": a,
        children: /* @__PURE__ */ o(br, { className: "tw:h-4 tw:w-4" })
      }
    );
}
const Ww = {
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
}, Qi = Qn(function({
  classNameForVerseText: e,
  comments: r,
  localizedStrings: a,
  isSelected: n = !1,
  verseRef: i,
  assignedUser: s,
  currentUser: c,
  handleSelectThread: d,
  threadId: l,
  thread: w,
  threadStatus: u,
  handleAddCommentToThread: h,
  handleUpdateComment: f,
  handleDeleteComment: _,
  handleReadStatusChange: b,
  assignableUsers: g,
  canUserAddCommentToThread: k,
  canUserAssignThreadCallback: y,
  canUserResolveThreadCallback: S,
  canUserEditOrDeleteCommentCallback: P,
  isRead: j = !1,
  autoReadDelay: z = 5,
  onVerseRefClick: D,
  initialAssignedUser: M,
  activeComments: R,
  rootContentSlot: O,
  resolveActionSlot: K,
  spaceRootContentFromReplies: q = !1,
  draft: Z,
  onDraftChange: x
}) {
  var Ve;
  const W = Dr(), [N, C] = E({}), L = Z ?? N, $ = L.editorState ?? Ww, U = L.assignedUser, rt = x !== void 0, ot = H(L);
  ot.current = L;
  const G = B(
    (T) => {
      const Q = { ...ot.current, ...T };
      ot.current = Q, rt || C(Q), x == null || x(l, Tn(Q) ? void 0 : Q);
    },
    [rt, x, l]
  ), st = B(
    (T, Q) => {
      const et = { ...L.commentEdits };
      Q === void 0 ? delete et[T] : et[T] = Q, G({
        commentEdits: Br(et) ? et : void 0
      });
    },
    [L.commentEdits, G]
  ), [dt, ct] = E(), Tt = n, [St, Bt] = E(!1), [qe, se] = E(!1), [jt, ut] = E(!1), [Ft, xe] = E(!1), [ye, ce] = E(!1), [lt, le] = E(j), [Ie, We] = E(!1), ke = H(void 0), [de, Ye] = E(/* @__PURE__ */ new Map());
  Y(() => {
    let T = !0;
    return (async () => {
      const et = S ? await S(l) : !1;
      T && ce(et);
    })(), () => {
      T = !1;
    };
  }, [l, S]), Y(() => {
    let T = !0;
    if (!n) {
      xe(!1), Ye(/* @__PURE__ */ new Map());
      return;
    }
    return (async () => {
      const et = y ? await y(l) : !1;
      T && xe(et);
    })(), () => {
      T = !1;
    };
  }, [n, l, y]);
  const pt = H("idle");
  Y(() => {
    if (!n) {
      pt.current !== "idle" && (G({ assignedUser: void 0 }), ct(void 0), pt.current = "idle");
      return;
    }
    pt.current === "idle" && (pt.current = "pending"), Ft ? pt.current === "pending" && M !== void 0 && // Skip pre-population if the thread is already assigned to this user — doing so
    // would show "Assigning to: Alice" and enable the submit button for a no-op call.
    M !== s && (G({ assignedUser: M }), pt.current = "auto-populated") : pt.current === "auto-populated" && (G({ assignedUser: void 0 }), pt.current = "pending");
  }, [n, M, Ft, s, G]);
  const _e = H(dt);
  _e.current = dt;
  const Pe = H(x);
  Pe.current = x;
  const A = H(l);
  A.current = l, Y(() => () => {
    var Q;
    const { current: T } = ot;
    T.assignedUser !== void 0 && T.assignedUser === _e.current && T.editorState === void 0 && !Br(T.commentEdits) && ((Q = Pe.current) == null || Q.call(Pe, A.current, void 0));
  }, []);
  const it = I(
    () => R ?? r.filter((T) => !T.deleted),
    [R, r]
  ), Ne = I(() => {
    const { commentEdits: T } = L;
    if (!T) return T;
    const Q = new Set(it.map((Ot) => Ot.id)), et = Object.fromEntries(
      Object.entries(T).filter(([Ot]) => Q.has(Ot))
    );
    return Br(et) ? et : void 0;
  }, [L, it]), Mt = qe || Br(Ne);
  Y(() => {
    let T = !0;
    if (!n || !P) {
      Ye(/* @__PURE__ */ new Map());
      return;
    }
    return (async () => {
      const et = /* @__PURE__ */ new Map();
      await Promise.all(
        it.map(async (Ot) => {
          const Pr = await P(Ot.id);
          T && et.set(Ot.id, Pr);
        })
      ), T && Ye(et);
    })(), () => {
      T = !1;
    };
  }, [n, it, P]);
  const It = I(() => it[0], [it]), $e = H(null), qt = H(void 0), Wt = B(() => {
    var T;
    (T = qt.current) == null || T.call(qt), G({ editorState: void 0 });
  }, [G]), Ce = B(
    (T) => {
      G({ editorState: Yt(T) ? T : void 0 });
    },
    [G]
  ), Ee = B(() => {
    const T = !lt;
    le(T), We(!T), b == null || b(l, T);
  }, [lt, b, l]);
  Y(() => {
    Bt(!1);
  }, [n]), Y(() => {
    if (n && !lt && !Ie && Tn(L)) {
      const T = setTimeout(() => {
        le(!0), b == null || b(l, !0);
      }, z * 1e3);
      return ke.current = T, () => clearTimeout(T);
    }
    ke.current && (clearTimeout(ke.current), ke.current = void 0);
  }, [
    n,
    lt,
    Ie,
    z,
    l,
    b,
    L
  ]);
  const Pt = I(
    () => ({
      singleReply: a["%comment_thread_single_reply%"],
      multipleReplies: a["%comment_thread_multiple_replies%"]
    }),
    [a]
  ), ee = I(() => {
    if (s === void 0)
      return;
    if (s === "")
      return a["%comment_assign_unassigned%"] ?? "Unassigned";
    const T = va(s, a);
    return tr(a["%comment_assigned_to%"], {
      assignedUser: T
    });
  }, [s, a]), Rt = I(() => it.slice(1), [it]), yt = I(() => Rt.length ?? 0, [Rt.length]), Ae = I(() => yt > 0, [yt]), we = I(() => {
    if (St || yt <= 2)
      return Rt;
    const T = new Set(Rt.slice(-2).map((Q) => Q.id));
    return Rt.filter(
      (Q) => {
        var et;
        return T.has(Q.id) || ((et = L.commentEdits) == null ? void 0 : et[Q.id]) !== void 0;
      }
    );
  }, [Rt, yt, St, L.commentEdits]), ue = I(() => St || yt <= 2 ? 0 : yt - we.length, [yt, St, we.length]), Ze = I(
    () => yt === 1 ? Pt.singleReply : tr(Pt.multipleReplies, { count: yt }),
    [yt, Pt]
  ), Xe = I(
    () => ue === 1 ? Pt.singleReply : tr(Pt.multipleReplies, { count: ue }),
    [ue, Pt]
  );
  Y(() => {
    !n && Mt && Ae && se(!1);
  }, [n, Mt, Ae]);
  const Te = B(
    async (T) => {
      T && T.stopPropagation();
      const Q = Yt($) ? Oa($) : void 0;
      if (U !== void 0) {
        await h({
          threadId: l,
          contents: Q,
          assignedUser: U
        }) && (ct(U), Q && Wt());
        return;
      }
      Q && await h({ threadId: l, contents: Q }) && Wt();
    },
    [
      Wt,
      $,
      h,
      U,
      l
    ]
  ), pe = B(
    async (T) => {
      const Q = Yt($) ? Oa($) : void 0, et = T.status ? T.assignedUser : U ?? T.assignedUser, Ot = await h({
        ...T,
        contents: Q,
        assignedUser: et
      });
      return Ot && (et !== void 0 && ct(et), Q && Wt()), Ot;
    },
    [Wt, $, h, U]
  );
  if (it.length === 0) return;
  const sr = !Ft || !g || g.length === 0 || !g.includes(c), Mr = !Yt($) && (U === void 0 || U === dt), Ir = /* @__PURE__ */ o(
    Sn,
    {
      comment: It,
      localizedStrings: a,
      isThreadExpanded: n,
      threadStatus: u,
      handleAddCommentToThread: pe,
      handleUpdateComment: f,
      handleDeleteComment: _,
      onEditingChange: se,
      canEditOrDelete: (!Mt && de.get(It.id)) ?? !1,
      canUserResolveThread: ye,
      draftEditorState: (Ve = L.commentEdits) == null ? void 0 : Ve[It.id],
      onDraftEditorStateChange: (T) => st(It.id, T)
    }
  );
  return /* @__PURE__ */ o(
    Kw,
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
          "tw:bg-card": u !== "Resolved" && lt,
          "tw:bg-muted": u === "Resolved",
          "tw:bg-accent": !lt && u !== "Resolved"
        }
      ),
      onClick: () => {
        d(l);
      },
      tabIndex: -1,
      children: /* @__PURE__ */ p(Hw, { className: "tw:flex tw:flex-col tw:gap-2 tw:p-0", children: [
        /* @__PURE__ */ p("div", { className: "tw:flex tw:flex-col tw:content-center tw:items-start tw:gap-2", children: [
          /* @__PURE__ */ p("div", { className: "tw:flex tw:items-center tw:gap-2", children: [
            ee && /* @__PURE__ */ o(Hr, { className: "tw:rounded-sm tw:bg-input tw:text-sm tw:font-normal tw:text-primary tw:hover:bg-input", children: ee }),
            /* @__PURE__ */ o(
              J,
              {
                variant: "ghost",
                size: "icon",
                onClick: (T) => {
                  T.stopPropagation(), Ee();
                },
                className: "tw:text-muted-foreground tw:transition tw:hover:text-foreground",
                "aria-label": lt ? a["%comment_aria_mark_as_unread%"] ?? "Mark as unread" : a["%comment_aria_mark_as_read%"] ?? "Mark as read",
                children: lt ? /* @__PURE__ */ o(cc, {}) : /* @__PURE__ */ o(lc, {})
              }
            ),
            K === void 0 ? (
              // Generic status-resolve check (used by non-conflict threads and, via ConflictThread
              // leaving this slot undefined, by non-verseText conflicts, which resolve through a
              // plain status change). ConflictThread overrides this slot for verseText conflicts.
              /* @__PURE__ */ o(
                Ji,
                {
                  show: ye && u !== "Resolved",
                  onClick: () => pe({ threadId: l, status: "Resolved" }),
                  ariaLabel: a["%comment_aria_resolve_thread%"] ?? "Resolve thread"
                }
              )
            ) : K
          ] }),
          /* @__PURE__ */ o("div", { className: "tw:flex tw:max-w-full tw:flex-wrap tw:items-baseline tw:gap-2", children: /* @__PURE__ */ p(
            "p",
            {
              ref: $e,
              className: v(
                "tw:flex-1 tw:overflow-hidden tw:text-ellipsis tw:text-sm tw:font-normal tw:text-muted-foreground",
                {
                  "tw:overflow-visible tw:text-clip tw:whitespace-normal tw:break-words": Tt
                },
                { "tw:whitespace-nowrap": !Tt }
              ),
              children: [
                i && D ? /* @__PURE__ */ o(
                  J,
                  {
                    variant: "ghost",
                    size: "sm",
                    className: "tw:h-auto tw:px-1 tw:py-0 tw:text-sm tw:font-normal tw:text-muted-foreground",
                    onClick: (T) => {
                      T.stopPropagation(), D(w);
                    },
                    children: i
                  }
                ) : i,
                /* @__PURE__ */ p(
                  "span",
                  {
                    className: e,
                    ...W,
                    children: [
                      It.contextBefore,
                      /* @__PURE__ */ o("span", { className: "tw:font-bold", children: It.selectedText }),
                      It.contextAfter
                    ]
                  }
                )
              ]
            }
          ) }),
          O ?? Ir
        ] }),
        /* @__PURE__ */ p(Dt, { children: [
          Ae && !n && /* @__PURE__ */ p("div", { className: "tw:flex tw:items-center tw:gap-5", children: [
            /* @__PURE__ */ o("div", { className: "tw:w-8", children: /* @__PURE__ */ o(Gr, {}) }),
            /* @__PURE__ */ o("p", { className: "tw:text-sm tw:text-muted-foreground", children: Ze })
          ] }),
          !n && Yt($) && /* @__PURE__ */ o(
            Ra,
            {
              editorSerializedState: $,
              onSerializedChange: Ce,
              placeholder: a["%comment_replyOrAssign%"]
            }
          ),
          n && /* @__PURE__ */ p(Dt, { children: [
            q && we.length > 0 && /* @__PURE__ */ o("div", { className: "tw:h-2", "data-slot": "root-content-reply-gap", "aria-hidden": "true" }),
            ue > 0 && /* @__PURE__ */ p(
              "div",
              {
                className: "tw:flex tw:cursor-pointer tw:items-center tw:gap-5 tw:py-2",
                onClick: (T) => {
                  T.stopPropagation(), Bt(!0);
                },
                role: "button",
                tabIndex: 0,
                onKeyDown: (T) => {
                  (T.key === "Enter" || T.key === " ") && (T.preventDefault(), T.stopPropagation(), Bt(!0));
                },
                children: [
                  /* @__PURE__ */ o("div", { className: "tw:w-8", children: /* @__PURE__ */ o(Gr, {}) }),
                  /* @__PURE__ */ p("div", { className: "tw:flex tw:items-center tw:gap-2", children: [
                    /* @__PURE__ */ o("p", { className: "tw:text-sm tw:text-muted-foreground", children: Xe }),
                    St ? /* @__PURE__ */ o(Yn, {}) : /* @__PURE__ */ o(er, {})
                  ] })
                ]
              }
            ),
            we.map((T) => {
              var Q;
              return /* @__PURE__ */ o("div", { children: /* @__PURE__ */ o(
                Sn,
                {
                  comment: T,
                  localizedStrings: a,
                  isReply: !0,
                  isThreadExpanded: n,
                  handleUpdateComment: f,
                  handleDeleteComment: _,
                  onEditingChange: se,
                  canEditOrDelete: (!Mt && de.get(T.id)) ?? !1,
                  draftEditorState: (Q = L.commentEdits) == null ? void 0 : Q[T.id],
                  onDraftEditorStateChange: (et) => st(T.id, et)
                }
              ) }, T.id);
            }),
            k !== !1 && (!Mt || Yt($)) && /* @__PURE__ */ o(
              "div",
              {
                role: "textbox",
                tabIndex: -1,
                className: "tw:w-full tw:space-y-2",
                onClick: (T) => T.stopPropagation(),
                onKeyDownCapture: (T) => {
                  Ko(T) && (T.preventDefault(), T.stopPropagation(), (Yt($) || U !== void 0 && U !== dt) && Te());
                },
                onKeyDown: (T) => {
                  Uo(T), (T.key === "Enter" || T.key === " ") && T.stopPropagation();
                },
                children: /* @__PURE__ */ o(
                  Ra,
                  {
                    editorSerializedState: $,
                    onSerializedChange: Ce,
                    placeholder: u === "Resolved" ? a["%comment_reopenResolved%"] : a["%comment_replyOrAssign%"],
                    autoFocus: !0,
                    onClear: (T) => {
                      qt.current = T;
                    },
                    actions: /* @__PURE__ */ p(Dt, { children: [
                      U !== void 0 && (Yt($) || U !== dt) ? /* @__PURE__ */ o("span", { className: "tw:flex-1 tw:text-sm tw:text-muted-foreground", children: tr(
                        Jt(
                          "%comment_assigning_to%",
                          a,
                          "Assigning to: {assignedUser}"
                        ),
                        {
                          assignedUser: va(
                            U,
                            a
                          )
                        }
                      ) }) : /* @__PURE__ */ o("div", { className: "tw:flex-1" }),
                      /* @__PURE__ */ p(Cr, { open: jt, onOpenChange: ut, children: [
                        /* @__PURE__ */ p(vt, { children: [
                          /* @__PURE__ */ o(bt, { asChild: !0, children: /* @__PURE__ */ o(
                            Yr,
                            {
                              isDisabled: sr,
                              disabledExplanation: Jt(
                                "%comment_aria_assign_user%",
                                a,
                                "Assign user"
                              ),
                              children: /* @__PURE__ */ o(Er, { asChild: !0, children: /* @__PURE__ */ o(
                                J,
                                {
                                  size: "icon-sm",
                                  variant: "outline",
                                  className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                                  disabled: sr,
                                  "aria-label": Jt(
                                    "%comment_aria_assign_user%",
                                    a,
                                    "Assign user"
                                  ),
                                  children: /* @__PURE__ */ o(Zn, {})
                                }
                              ) })
                            }
                          ) }),
                          /* @__PURE__ */ o(xt, { children: Jt(
                            "%comment_aria_assign_user%",
                            a,
                            "Assign user"
                          ) })
                        ] }),
                        /* @__PURE__ */ o(
                          Tr,
                          {
                            className: "tw:w-auto tw:p-0",
                            align: "end",
                            onKeyDown: (T) => {
                              T.key === "Escape" && (T.stopPropagation(), ut(!1));
                            },
                            children: /* @__PURE__ */ o(Sr, { children: /* @__PURE__ */ o(Rr, { children: g == null ? void 0 : g.map((T) => /* @__PURE__ */ o(
                              ar,
                              {
                                onSelect: () => {
                                  G({
                                    assignedUser: T !== s ? T : void 0
                                  }), pt.current = "user-selected", ct(void 0), ut(!1);
                                },
                                className: "tw:flex tw:items-center",
                                children: /* @__PURE__ */ o("span", { children: va(T, a) })
                              },
                              T || "unassigned"
                            )) }) })
                          }
                        )
                      ] }),
                      /* @__PURE__ */ p(vt, { children: [
                        /* @__PURE__ */ o(bt, { asChild: !0, children: /* @__PURE__ */ o(
                          Yr,
                          {
                            isDisabled: Mr,
                            disabledExplanation: Jt(
                              "%comment_aria_submit_comment%",
                              a,
                              "Submit comment"
                            ),
                            className: "tw:inline-flex",
                            children: /* @__PURE__ */ o(
                              J,
                              {
                                size: "icon-sm",
                                onClick: Te,
                                className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                                disabled: Mr,
                                "aria-label": Jt(
                                  "%comment_aria_submit_comment%",
                                  a,
                                  "Submit comment"
                                ),
                                children: /* @__PURE__ */ o(Xn, {})
                              }
                            )
                          }
                        ) }),
                        /* @__PURE__ */ o(xt, { children: Jt(
                          "%comment_aria_submit_comment%",
                          a,
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
}), Yw = v(
  Yi,
  // `prose` gives block children (the top-level blockquote wrapper, and any p — whether nested
  // inside that blockquote or, in the non-verseText fallback, a direct child) vertical margins that
  // make these already-compact cards feel bulky. Zero both so the diff sits flush inside the card.
  "tw:[&>blockquote]:my-0 tw:[&_p]:my-0",
  "tw:[&_u]:font-semibold tw:[&_u]:text-success-foreground tw:[&_u]:no-underline",
  "tw:[&_s]:text-destructive tw:[&_s]:line-through"
), Zw = (t) => t.replace(/(\s+)(<\/[us]>)/g, "$2$1"), ba = (t) => Zw(Oo(t));
function xa({ html: t }) {
  const e = Dr();
  return /* @__PURE__ */ o(
    "div",
    {
      className: Yw,
      ...e,
      dangerouslySetInnerHTML: { __html: t }
    }
  );
}
function Xw({
  comment: t,
  localizedStrings: e,
  availableActions: r = "acceptOrReject",
  resolvedResolution: a,
  onResolve: n,
  isResolving: i = !1
}) {
  const [s, c] = E("accept"), d = Ca(), l = Ca(), w = Dr(), u = r === "loading", h = r === "accept", f = r === "none", _ = r === "acceptRejectOrMerge", b = h ? "accept" : s, g = I(
    () => ba(t.rejectedText ?? ""),
    [t.rejectedText]
  ), k = I(
    () => ba(t.acceptedText ?? ""),
    [t.acceptedText]
  ), y = I(
    () => ba(t.mergedText ?? ""),
    [t.mergedText]
  ), S = I(() => Oo(t.contents), [t.contents]);
  if (!Zi(t))
    return /* @__PURE__ */ o(xa, { html: S });
  const P = (C) => {
    c(C === "reject" || C === "merge" ? C : "accept");
  }, j = e["%conflict_note_stale_notice%"] ?? "The verse was edited after this conflict was recorded, so 'Use the other change' is no longer available. Keep the current text to resolve.", z = _ ? [
    {
      value: "merge",
      label: e["%conflict_note_option_combine%"] ?? "Combine both changes",
      html: y
    }
  ] : [], D = [
    {
      value: "accept",
      label: e["%conflict_note_option_keep_current%"] ?? "Keep the current text",
      html: k
    },
    {
      value: "reject",
      label: e["%conflict_note_option_use_other%"] ?? "Use the other change",
      html: g
    },
    ...z
  ], M = b === "accept", R = i || M;
  let O;
  M ? O = e["%conflict_note_save_disabled_tooltip%"] ?? "Keeping the current text makes no change — resolve the thread with the ✓ to keep it." : i || (O = e["%conflict_note_save_warning%"] ?? "This can't be undone.");
  const K = e["%conflict_note_no_result%"] ?? "No result preview available.", q = /* @__PURE__ */ o("p", { className: "tw:text-muted-foreground", children: K }), Z = (C) => C ? /* @__PURE__ */ o(
    "p",
    {
      className: "tw:whitespace-pre-wrap tw:text-foreground",
      ...w,
      children: C
    }
  ) : q, x = () => {
    const C = a ?? "accept";
    return C === "merged" ? t.mergedText ? /* @__PURE__ */ o(xa, { html: y }) : q : Z(C === "reject" ? t.rejectedResultText : t.resultText);
  }, W = (C) => h && C.value === "reject", N = (C) => {
    const L = b === C.value, $ = `${l}-${C.value}`, U = W(C);
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
          "data-value": C.value,
          className: v(
            "tw:flex tw:flex-col tw:gap-1 tw:rounded-md tw:border tw:p-2",
            "tw:focus-within:ring-2 tw:focus-within:ring-ring tw:focus-within:ring-offset-1",
            L ? "tw:border-border tw:bg-accent/50" : "tw:border-transparent tw:hover:bg-accent/30",
            U ? "tw:cursor-not-allowed tw:opacity-60" : "tw:cursor-pointer"
          ),
          children: [
            /* @__PURE__ */ p("div", { className: "tw:flex tw:items-center tw:gap-2", children: [
              /* @__PURE__ */ o(
                ka,
                {
                  id: $,
                  value: C.value,
                  "aria-label": C.label,
                  disabled: U,
                  "aria-describedby": U ? d : void 0
                }
              ),
              /* @__PURE__ */ o("span", { "aria-hidden": !0, className: "tw:font-medium", children: C.label })
            ] }),
            U && // aria-describedby links the option to this visually-hidden notice so assistive tech
            // announces why the choice is read-only.
            /* @__PURE__ */ o("span", { id: d, className: "tw:sr-only", children: j }),
            /* @__PURE__ */ o(xa, { html: C.html })
          ]
        },
        C.value
      )
    );
  };
  return (
    // Contain every click inside the card (selecting an option, pressing Save) so it never bubbles
    // up to toggle the enclosing CommentThread open/closed. The thread toggles on click only, so a
    // single onClick guard at the root is enough; this container is not itself an interactive control
    // and needs no keyboard handler (the thread has no keyboard toggle to intercept).
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
    /* @__PURE__ */ p("div", { className: "tw:flex tw:flex-col tw:gap-3 tw:text-sm", onClick: (C) => C.stopPropagation(), children: [
      /* @__PURE__ */ o("p", { children: e["%conflict_note_description_verseText%"] ?? "Conflicting changes were made to the verse text." }),
      u && /* @__PURE__ */ p("div", { className: "tw:flex tw:flex-col tw:gap-2", "data-slot": "conflict-loading", children: [
        /* @__PURE__ */ o(pr, { className: "tw:h-8 tw:w-full" }),
        /* @__PURE__ */ o(pr, { className: "tw:h-8 tw:w-full" }),
        /* @__PURE__ */ o(pr, { className: "tw:h-8 tw:w-24" })
      ] }),
      !u && f && x(),
      !u && !f && /* @__PURE__ */ p(Dt, { children: [
        /* @__PURE__ */ o("p", { children: e["%conflict_note_choose_prompt%"] ?? "Select which change to keep:" }),
        /* @__PURE__ */ o(
          ko,
          {
            value: b,
            onValueChange: P,
            disabled: i,
            "aria-label": e["%conflict_note_choose_aria_label%"] ?? "Choose resolution",
            children: D.map((C) => W(C) ? /* @__PURE__ */ o(Qt, { delayDuration: 0, children: /* @__PURE__ */ p(vt, { children: [
              /* @__PURE__ */ o(bt, { asChild: !0, children: N(C) }),
              /* @__PURE__ */ o(xt, { children: j })
            ] }) }, C.value) : N(C))
          }
        ),
        /* @__PURE__ */ o(Qt, { delayDuration: 0, children: /* @__PURE__ */ p(vt, { children: [
          /* @__PURE__ */ o(bt, { asChild: !0, children: /* @__PURE__ */ o(
            Yr,
            {
              isDisabled: R && O !== void 0,
              disabledExplanation: O,
              className: "tw:inline-flex tw:self-start",
              children: /* @__PURE__ */ o(
                J,
                {
                  size: "sm",
                  disabled: R,
                  onClick: () => n == null ? void 0 : n(b),
                  children: e["%conflict_note_save_and_resolve%"] ?? "Save and resolve"
                }
              )
            }
          ) }),
          O && /* @__PURE__ */ o(xt, { children: O })
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
function Qw({
  comment: t,
  localizedStrings: e,
  resolvedResolution: r
}) {
  const a = I(
    () => ba(t.rejectedText ?? ""),
    [t.rejectedText]
  );
  if (r) {
    const { key: i, fallback: s } = Jw[r];
    return /* @__PURE__ */ o("p", { className: "tw:text-sm tw:font-normal tw:text-muted-foreground", children: e[i] ?? s });
  }
  const n = e["%conflict_note_summary_unresolved%"] ?? "Conflicting edits. Choose which change to keep.";
  return /* @__PURE__ */ p("div", { className: "tw:flex tw:flex-col tw:gap-1", children: [
    /* @__PURE__ */ o("p", { className: "tw:text-sm tw:font-normal tw:text-muted-foreground", children: n }),
    a ? /* @__PURE__ */ o(xa, { html: a }) : void 0
  ] });
}
function tu(t) {
  return t === "reject" ? "reject" : t === "merge" ? "merged" : "accept";
}
function eu({
  threadId: t,
  threadStatus: e,
  isSelected: r,
  activeComments: a,
  conflictResolution: n
}) {
  const [i, s] = E("loading"), [c, d] = E(!1), [l, w] = E(), u = n == null ? void 0 : n.getOptions, h = n == null ? void 0 : n.resolve;
  Y(() => {
    let y = !0;
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
      y && (s(P), P !== "none" && w(void 0));
    })(), () => {
      y = !1;
    };
  }, [r, t, e, u]);
  const f = H(!1), _ = B(
    async (y) => {
      if (!(!h || f.current)) {
        f.current = !0, d(!0);
        try {
          await h(t, y) && (w(tu(y)), s("none"));
        } catch {
        } finally {
          f.current = !1, d(!1);
        }
      }
    },
    [h, t]
  ), g = I(() => {
    if (e === "Resolved") {
      for (let y = a.length - 1; y >= 0; y -= 1)
        if (a[y].status === "Resolved")
          return Xi(a[y].conflictResolutionAction);
      return "accept";
    }
  }, [e, a]) ?? l;
  return { conflictOptions: i, isResolving: c, resolve: _, resolvedResolution: g, showResolveCheck: i !== "loading" && i !== "none" };
}
const ru = Qn(function(e) {
  const {
    comments: r,
    localizedStrings: a,
    isSelected: n = !1,
    threadId: i,
    threadStatus: s,
    conflictResolution: c
  } = e, d = I(() => r.filter((y) => !y.deleted), [r]), l = I(
    () => d.find((y) => y.conflictType) ?? d[0],
    [d]
  ), { conflictOptions: w, isResolving: u, resolve: h, resolvedResolution: f, showResolveCheck: _ } = eu({
    threadId: i,
    threadStatus: s,
    isSelected: n,
    activeComments: d,
    conflictResolution: c
  }), b = Zi(l);
  let g;
  b && l && (g = n ? /* @__PURE__ */ o(
    Xw,
    {
      comment: l,
      localizedStrings: a,
      availableActions: w,
      resolvedResolution: f,
      onResolve: h,
      isResolving: u
    }
  ) : /* @__PURE__ */ o(
    Qw,
    {
      comment: l,
      localizedStrings: a,
      resolvedResolution: f
    }
  ));
  let k;
  return b && (k = /* @__PURE__ */ o(
    Ji,
    {
      show: _,
      disabled: u,
      onClick: () => h("accept"),
      ariaLabel: a["%comment_aria_resolve_thread%"] ?? "Resolve thread"
    }
  )), /* @__PURE__ */ o(
    Qi,
    {
      ...e,
      activeComments: d,
      rootContentSlot: g,
      resolveActionSlot: k,
      spaceRootContentFromReplies: b && n
    }
  );
});
function kh({
  className: t = "",
  classNameForVerseText: e,
  threads: r,
  currentUser: a,
  localizedStrings: n,
  handleAddCommentToThread: i,
  handleUpdateComment: s,
  handleDeleteComment: c,
  handleReadStatusChange: d,
  assignableUsers: l,
  canUserAddCommentToThread: w,
  canUserAssignThreadCallback: u,
  canUserResolveThreadCallback: h,
  canUserEditOrDeleteCommentCallback: f,
  selectedThreadId: _,
  onSelectedThreadChange: b,
  onVerseRefClick: g,
  conflictResolution: k,
  drafts: y,
  onDraftChange: S
}) {
  const [P, j] = E(/* @__PURE__ */ new Set()), [z, D] = E(), [M, R] = E(), O = B(
    async ($) => {
      const U = await i($);
      return U !== void 0 && $.assignedUser !== void 0 && $.assignedUser !== "" && R($.assignedUser), U;
    },
    [i]
  );
  Y(() => {
    _ && (j(($) => new Set($).add(_)), D(_));
  }, [_]);
  const K = r.filter(
    ($) => $.comments.some((U) => !U.deleted)
  ), q = K.map(($) => ({ id: $.id })), Z = B(
    ($) => {
      j((U) => new Set(U).add($.id)), D($.id), b == null || b($.id);
    },
    [b]
  ), x = B(
    ($) => {
      const U = P.has($);
      j((rt) => {
        const ot = new Set(rt);
        return ot.has($) ? ot.delete($) : ot.add($), ot;
      }), D($), b == null || b(U ? void 0 : $);
    },
    [P, b]
  ), { listboxRef: W, activeId: N, handleKeyDown: C } = Ds({
    options: q,
    onOptionSelect: Z
  }), L = B(
    ($) => {
      $.key === "Escape" ? (z && P.has(z) && (j((U) => {
        const rt = new Set(U);
        return rt.delete(z), rt;
      }), D(void 0), b == null || b(void 0)), $.preventDefault(), $.stopPropagation()) : C($);
    },
    [z, P, C, b]
  );
  return /* @__PURE__ */ o(
    "div",
    {
      id: Uw,
      role: "listbox",
      tabIndex: 0,
      ref: W,
      "aria-activedescendant": N ?? void 0,
      "aria-label": "Comments",
      className: v(
        "tw:flex tw:w-full tw:flex-col tw:outline-hidden tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-1 tw:focus:ring-offset-background",
        t
      ),
      onKeyDown: L,
      children: K.map(($) => {
        const U = {
          classNameForVerseText: e,
          comments: $.comments,
          localizedStrings: n,
          verseRef: $.verseRef,
          handleSelectThread: x,
          threadId: $.id,
          thread: $,
          isRead: $.isRead,
          isSelected: P.has($.id),
          currentUser: a,
          assignedUser: $.assignedUser,
          threadStatus: $.status,
          handleAddCommentToThread: O,
          handleUpdateComment: s,
          handleDeleteComment: c,
          handleReadStatusChange: d,
          assignableUsers: l,
          canUserAddCommentToThread: w,
          canUserAssignThreadCallback: u,
          canUserResolveThreadCallback: h,
          canUserEditOrDeleteCommentCallback: f,
          onVerseRefClick: g,
          initialAssignedUser: M,
          draft: y == null ? void 0 : y[$.id],
          onDraftChange: S
        };
        return /* @__PURE__ */ o(
          "div",
          {
            className: v("tw:border-b tw:border-border tw:last:border-b-0", {
              "tw:opacity-60": $.status === "Resolved"
            }),
            children: $.type === "Conflict" ? /* @__PURE__ */ o(ru, { ...U, conflictResolution: k }) : /* @__PURE__ */ o(Qi, { ...U })
          },
          $.id
        );
      })
    }
  );
}
const au = zo(
  function({ area: e, as: r = "div", label: a, ...n }, i) {
    const s = {
      [Ki]: e ?? "",
      ...a ? { [Hi]: a } : {}
    };
    return so(r, { ...n, ...s, ref: i });
  }
);
au.displayName = "ContentZoomRoot";
function ou({ table: t }) {
  return /* @__PURE__ */ p(or, { children: [
    /* @__PURE__ */ o(Ke, { asChild: !0, children: /* @__PURE__ */ p(J, { variant: "outline", size: "sm", className: "tw:ml-auto tw:hidden tw:h-8 tw:lg:flex", children: [
      /* @__PURE__ */ o(dc, { className: "tw:mr-2 tw:h-4 tw:w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ p(nr, { align: "end", className: "tw:w-[150px]", children: [
      /* @__PURE__ */ o(Zr, { children: "Toggle columns" }),
      /* @__PURE__ */ o(vr, {}),
      t.getAllColumns().filter((e) => e.getCanHide()).map((e) => /* @__PURE__ */ o(
        Fn,
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
  return /* @__PURE__ */ o(Lt.Root, { "data-slot": "select", ...t });
}
function nu({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    Lt.Group,
    {
      "data-slot": "select-group",
      className: v("tw:scroll-my-1 tw:p-1", t),
      ...e
    }
  );
}
function kr({ ...t }) {
  return /* @__PURE__ */ o(Lt.Value, { "data-slot": "select-value", ...t });
}
function _r({ className: t, size: e = "default", children: r, ...a }) {
  const n = ne();
  return /* @__PURE__ */ p(
    Lt.Trigger,
    {
      "data-slot": "select-trigger",
      "data-size": e,
      className: v(
        "pr-twp tw:flex tw:w-fit tw:items-center tw:gap-2 tw:rounded-lg tw:border tw:border-input tw:bg-transparent tw:py-2 tw:pe-2 tw:ps-2.5 tw:text-sm tw:whitespace-nowrap tw:transition-colors tw:outline-none tw:select-none tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:data-placeholder:text-muted-foreground tw:data-[size=default]:h-8 tw:data-[size=sm]:h-7 tw:data-[size=sm]:rounded-[min(var(--tw-radius-md),10px)] tw:*:data-[slot=select-value]:line-clamp-1 tw:*:data-[slot=select-value]:flex tw:*:data-[slot=select-value]:flex-1 tw:*:data-[slot=select-value]:items-center tw:*:data-[slot=select-value]:gap-1.5 tw:*:data-[slot=select-value]:text-start tw:dark:bg-input/30 tw:dark:hover:bg-input/50 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      dir: n,
      ...a,
      children: [
        r,
        /* @__PURE__ */ o(Lt.Icon, { asChild: !0, children: /* @__PURE__ */ o(ti, { className: "tw:pointer-events-none tw:size-4 tw:text-muted-foreground" }) })
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
  align: a = "center",
  // CUSTOM: Destructure style to merge with the shared z-index constant below
  style: n,
  ...i
}) {
  const s = ne();
  return /* @__PURE__ */ o(Lt.Portal, { children: /* @__PURE__ */ p(
    Lt.Content,
    {
      "data-slot": "select-content",
      "data-align-trigger": r === "item-aligned",
      className: v(
        "pr-twp tw:relative tw:max-h-(--radix-select-content-available-height) tw:data-[align-trigger=true]:min-w-(--radix-select-trigger-width) tw:data-[align-trigger=false]:min-w-36 tw:origin-(--radix-select-content-transform-origin) tw:overflow-x-hidden tw:overflow-y-auto tw:rounded-lg tw:bg-popover tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:data-[align-trigger=true]:animate-none tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95 tw:animate-none! tw:**:data-[slot$=-item]:focus:bg-foreground/10 tw:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 tw:**:data-[slot$=-separator]:bg-foreground/5 tw:**:data-[slot$=-trigger]:focus:bg-foreground/10 tw:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! tw:**:data-[variant=destructive]:focus:bg-foreground/10! tw:**:data-[variant=destructive]:text-accent-foreground! tw:**:data-[variant=destructive]:**:text-accent-foreground! tw:relative",
        r === "popper" && "tw:data-[side=bottom]:translate-y-1 tw:data-[side=left]:-translate-x-1 tw:rtl:data-[side=left]:translate-x-1 tw:data-[side=right]:translate-x-1 tw:rtl:data-[side=right]:-translate-x-1 tw:data-[side=top]:-translate-y-1",
        t
      ),
      style: { zIndex: Me, ...n },
      position: r,
      align: a,
      ...i,
      children: [
        /* @__PURE__ */ o(iu, {}),
        /* @__PURE__ */ o(
          Lt.Viewport,
          {
            "data-position": r,
            className: v(
              "tw:data-[position=popper]:h-(--radix-select-trigger-height) tw:data-[position=popper]:w-full tw:data-[position=popper]:min-w-(--radix-select-trigger-width)",
              r === "popper" && "tw:"
            ),
            children: /* @__PURE__ */ o("div", { dir: s, children: e })
          }
        ),
        /* @__PURE__ */ o(su, {})
      ]
    }
  ) });
}
function _h({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    Lt.Label,
    {
      "data-slot": "select-label",
      className: v("pr-twp tw:px-1.5 tw:py-1 tw:text-xs tw:text-muted-foreground", t),
      ...e
    }
  );
}
function oe({
  className: t,
  children: e,
  ...r
}) {
  return /* @__PURE__ */ p(
    Lt.Item,
    {
      "data-slot": "select-item",
      className: v(
        "pr-twp tw:relative tw:flex tw:w-full tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:*:[span]:last:flex tw:*:[span]:last:items-center tw:*:[span]:last:gap-2",
        t
      ),
      ...r,
      children: [
        /* @__PURE__ */ o("span", { className: "tw:pointer-events-none tw:absolute tw:end-2 tw:flex tw:size-4 tw:items-center tw:justify-center", children: /* @__PURE__ */ o(Lt.ItemIndicator, { children: /* @__PURE__ */ o(za, { className: "tw:pointer-events-none" }) }) }),
        /* @__PURE__ */ o(Lt.ItemText, { children: e })
      ]
    }
  );
}
function Nh({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ o(
    Lt.Separator,
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
function iu({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ o(
    Lt.ScrollUpButton,
    {
      "data-slot": "select-scroll-up-button",
      className: v(
        "pr-twp tw:z-10 tw:flex tw:cursor-default tw:items-center tw:justify-center tw:bg-popover tw:py-1 tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      ...e,
      children: /* @__PURE__ */ o(Wc, {})
    }
  );
}
function su({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ o(
    Lt.ScrollDownButton,
    {
      "data-slot": "select-scroll-down-button",
      className: v(
        "pr-twp tw:z-10 tw:flex tw:cursor-default tw:items-center tw:justify-center tw:bg-popover tw:py-1 tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      ...e,
      children: /* @__PURE__ */ o(qc, {})
    }
  );
}
function cu({ table: t }) {
  return /* @__PURE__ */ o("div", { className: "tw:flex tw:items-center tw:justify-between tw:px-2 tw:pb-3 tw:pt-3", children: /* @__PURE__ */ p("div", { className: "tw:flex tw:items-center tw:space-x-6 tw:lg:space-x-8", children: [
    /* @__PURE__ */ p("div", { className: "tw:flex-1 tw:text-sm tw:text-muted-foreground", children: [
      t.getFilteredSelectedRowModel().rows.length,
      " of",
      " ",
      t.getFilteredRowModel().rows.length,
      " row(s) selected"
    ] }),
    /* @__PURE__ */ p("div", { className: "tw:flex tw:items-center tw:space-x-2", children: [
      /* @__PURE__ */ o("p", { className: "tw:text-nowrap tw:text-sm tw:font-medium", children: "Rows per page" }),
      /* @__PURE__ */ p(
        yr,
        {
          value: `${t.getState().pagination.pageSize}`,
          onValueChange: (e) => {
            t.setPageSize(Number(e));
          },
          children: [
            /* @__PURE__ */ o(_r, { className: "tw:h-8 tw:w-[70px]", children: /* @__PURE__ */ o(kr, { placeholder: t.getState().pagination.pageSize }) }),
            /* @__PURE__ */ o(Nr, { side: "top", children: [10, 20, 30, 40, 50].map((e) => /* @__PURE__ */ o(oe, { value: `${e}`, children: e }, e)) })
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
            /* @__PURE__ */ o("span", { className: "tw:sr-only", children: "Go to first page" }),
            /* @__PURE__ */ o(wc, { className: "tw:h-4 tw:w-4" })
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
            /* @__PURE__ */ o("span", { className: "tw:sr-only", children: "Go to previous page" }),
            /* @__PURE__ */ o(uc, { className: "tw:h-4 tw:w-4" })
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
            /* @__PURE__ */ o("span", { className: "tw:sr-only", children: "Go to next page" }),
            /* @__PURE__ */ o(pc, { className: "tw:h-4 tw:w-4" })
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
            /* @__PURE__ */ o("span", { className: "tw:sr-only", children: "Go to last page" }),
            /* @__PURE__ */ o(hc, { className: "tw:h-4 tw:w-4" })
          ]
        }
      )
    ] })
  ] }) });
}
function lu({
  columns: t,
  data: e,
  enablePagination: r = !1,
  showPaginationControls: a = !1,
  showColumnVisibilityControls: n = !1,
  stickyHeader: i = !1,
  onRowClickHandler: s = () => {
  },
  id: c,
  isLoading: d = !1,
  noResultsMessage: l
}) {
  var z;
  const [w, u] = E([]), [h, f] = E([]), [_, b] = E({}), [g, k] = E({}), y = I(() => e ?? [], [e]), S = gi({
    data: y,
    columns: t,
    getCoreRowModel: mi(),
    ...r && { getPaginationRowModel: Jl() },
    onSortingChange: u,
    getSortedRowModel: fi(),
    onColumnFiltersChange: f,
    getFilteredRowModel: Xl(),
    onColumnVisibilityChange: b,
    onRowSelectionChange: k,
    state: {
      sorting: w,
      columnFilters: h,
      columnVisibility: _,
      rowSelection: g
    }
  }), P = S.getVisibleFlatColumns();
  let j;
  return d ? j = Array.from({ length: 10 }).map((R, O) => `skeleton-row-${O}`).map((R) => /* @__PURE__ */ o(Fe, { className: "tw:hover:bg-transparent", children: /* @__PURE__ */ o(hr, { colSpan: P.length ?? t.length, className: "tw:border-0 tw:p-0", children: /* @__PURE__ */ o("div", { className: "tw:w-full tw:py-2", children: /* @__PURE__ */ o(pr, { className: "tw:h-14 tw:w-full tw:rounded-md" }) }) }) }, R)) : ((z = S.getRowModel().rows) == null ? void 0 : z.length) > 0 ? j = S.getRowModel().rows.map((D) => /* @__PURE__ */ o(
    Fe,
    {
      onClick: () => s(D, S),
      "data-state": D.getIsSelected() && "selected",
      children: D.getVisibleCells().map((M) => /* @__PURE__ */ o(hr, { children: Fr(M.column.columnDef.cell, M.getContext()) }, M.id))
    },
    D.id
  )) : j = /* @__PURE__ */ o(Fe, { children: /* @__PURE__ */ o(hr, { colSpan: t.length, className: "tw:h-24 tw:text-center", children: l }) }), /* @__PURE__ */ p("div", { className: "pr-twp", id: c, children: [
    n && /* @__PURE__ */ o(ou, { table: S }),
    /* @__PURE__ */ p(_o, { stickyHeader: i, children: [
      /* @__PURE__ */ o(No, { stickyHeader: i, children: S.getHeaderGroups().map((D) => /* @__PURE__ */ o(Fe, { children: D.headers.map((M) => /* @__PURE__ */ o(_a, { className: "tw:p-0", children: M.isPlaceholder ? void 0 : Fr(M.column.columnDef.header, M.getContext()) }, M.id)) }, D.id)) }),
      /* @__PURE__ */ o(Co, { children: j })
    ] }),
    r && /* @__PURE__ */ p("div", { className: "tw:flex tw:items-center tw:justify-end tw:space-x-2 tw:py-4", children: [
      /* @__PURE__ */ o(
        J,
        {
          variant: "outline",
          size: "sm",
          onClick: () => S.previousPage(),
          disabled: !S.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ o(
        J,
        {
          variant: "outline",
          size: "sm",
          onClick: () => S.nextPage(),
          disabled: !S.getCanNextPage(),
          children: "Next"
        }
      )
    ] }),
    r && a && /* @__PURE__ */ o(cu, { table: S })
  ] });
}
function Ch({
  id: t,
  markdown: e,
  className: r,
  anchorTarget: a,
  truncate: n
}) {
  const i = I(
    () => ({
      overrides: {
        a: {
          props: {
            target: a,
            // Harden links opened in a new tab against reverse-tabnabbing (the opened page can
            // otherwise reach back through window.opener).
            rel: a === "_blank" ? "noopener noreferrer" : void 0
          }
        }
      }
    }),
    [a]
  );
  return /* @__PURE__ */ o(
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
      children: /* @__PURE__ */ o(ed, { options: i, children: e })
    }
  );
}
const du = Object.freeze([
  "%webView_error_dump_copy_button%",
  "%webView_error_dump_header%",
  "%webView_error_dump_info_message%"
]), to = (t, e) => t[e] ?? e;
function wu({
  errorDetails: t,
  handleCopyNotify: e,
  localizedStrings: r,
  id: a
}) {
  const n = to(r, "%webView_error_dump_header%"), i = to(r, "%webView_error_dump_info_message%"), s = to(r, "%webView_error_dump_copy_button%");
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
      id: a,
      className: "tw:inline-flex tw:w-full tw:flex-col tw:items-start tw:justify-start tw:gap-4",
      children: [
        /* @__PURE__ */ p("div", { className: "tw:inline-flex tw:items-start tw:justify-start tw:gap-4 tw:self-stretch", children: [
          /* @__PURE__ */ p("div", { className: "tw:inline-flex tw:flex-1 tw:flex-col tw:items-start tw:justify-start", children: [
            /* @__PURE__ */ o("div", { className: "tw:text-color-text tw:justify-center tw:text-center tw:text-lg tw:font-semibold tw:leading-loose", children: n }),
            /* @__PURE__ */ o("div", { className: "tw:justify-center tw:self-stretch tw:text-sm tw:font-normal tw:leading-tight tw:text-muted-foreground", children: i })
          ] }),
          /* @__PURE__ */ o(
            J,
            {
              variant: "secondary",
              size: "icon",
              "aria-label": s,
              onClick: () => {
                c();
              },
              children: /* @__PURE__ */ o(gc, {})
            }
          )
        ] }),
        /* @__PURE__ */ o("div", { className: "tw:prose tw:w-full", children: /* @__PURE__ */ o("pre", { className: "tw:text-xs", children: t }) })
      ]
    }
  );
}
const Eh = Object.freeze([
  ...du,
  "%webView_error_dump_copied_message%"
]);
function Th({
  errorDetails: t,
  handleCopyNotify: e,
  localizedStrings: r,
  children: a,
  className: n,
  id: i
}) {
  const [s, c] = E(!1), d = () => {
    c(!0), e && e();
  };
  return /* @__PURE__ */ p(Cr, { onOpenChange: (w) => {
    w || c(!1);
  }, children: [
    /* @__PURE__ */ o(Er, { asChild: !0, children: a }),
    /* @__PURE__ */ p(Tr, { id: i, className: v("tw:min-w-80 tw:max-w-96", n), children: [
      s && r["%webView_error_dump_copied_message%"] && /* @__PURE__ */ o(gt, { children: r["%webView_error_dump_copied_message%"] }),
      /* @__PURE__ */ o(
        wu,
        {
          errorDetails: t,
          handleCopyNotify: d,
          localizedStrings: r
        }
      )
    ] })
  ] });
}
var uu = /* @__PURE__ */ ((t) => (t[t.Check = 0] = "Check", t[t.Radio = 1] = "Radio", t))(uu || {});
function Sh({ id: t, label: e, groups: r }) {
  const [a, n] = E(
    Object.fromEntries(
      r.map(
        (l, w) => l.itemType === 0 ? [w, []] : void 0
      ).filter((l) => !!l)
    )
  ), [i, s] = E({}), c = (l, w) => {
    const u = !a[l][w];
    n((f) => (f[l][w] = u, { ...f }));
    const h = r[l].items[w];
    h.onUpdate(h.id, u);
  }, d = (l, w) => {
    s((h) => (h[l] = w, { ...h }));
    const u = r[l].items.find((h) => h.id === w);
    u ? u.onUpdate(w) : console.error(`Could not find dropdown radio item with id '${w}'!`);
  };
  return /* @__PURE__ */ o("div", { id: t, children: /* @__PURE__ */ p(or, { children: [
    /* @__PURE__ */ o(Ke, { asChild: !0, children: /* @__PURE__ */ p(J, { variant: "default", children: [
      /* @__PURE__ */ o(fc, { size: 16, className: "tw:mr-2 tw:h-4 tw:w-4" }),
      e,
      /* @__PURE__ */ o(er, { size: 16, className: "tw:ml-2 tw:h-4 tw:w-4" })
    ] }) }),
    /* @__PURE__ */ o(nr, { children: r.map((l, w) => /* @__PURE__ */ p("div", { children: [
      /* @__PURE__ */ o(Zr, { children: l.label }),
      /* @__PURE__ */ o(Un, { children: l.itemType === 0 ? /* @__PURE__ */ o(Dt, { children: l.items.map((u, h) => /* @__PURE__ */ o("div", { children: /* @__PURE__ */ o(
        Fn,
        {
          checked: a[w][h],
          onCheckedChange: () => c(w, h),
          children: u.label
        }
      ) }, u.id)) }) : /* @__PURE__ */ o(
        Ms,
        {
          value: i[w],
          onValueChange: (u) => d(w, u),
          children: l.items.map((u) => /* @__PURE__ */ o("div", { children: /* @__PURE__ */ o(Is, { value: u.id, children: u.label }) }, u.id))
        }
      ) }),
      /* @__PURE__ */ o(vr, {})
    ] }, l.label)) })
  ] }) });
}
function Rh({
  id: t,
  category: e,
  downloads: r,
  languages: a,
  moreInfoUrl: n,
  handleMoreInfoLinkClick: i,
  supportUrl: s,
  handleSupportLinkClick: c
}) {
  const d = new Jn("en", {
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
          /* @__PURE__ */ o("div", { className: "tw:flex", children: /* @__PURE__ */ o("span", { className: "tw:text-xs tw:font-semibold tw:text-foreground", children: e }) }),
          /* @__PURE__ */ o("span", { className: "tw:text-xs tw:text-foreground", children: "CATEGORY" })
        ] }),
        /* @__PURE__ */ p("div", { className: "tw:flex tw:flex-col tw:items-center tw:gap-1 tw:px-4", children: [
          /* @__PURE__ */ p("div", { className: "tw:flex tw:gap-1", children: [
            /* @__PURE__ */ o(mc, { className: "tw:h-4 tw:w-4" }),
            /* @__PURE__ */ o("span", { className: "tw:text-xs tw:font-semibold tw:text-foreground", children: d })
          ] }),
          /* @__PURE__ */ o("span", { className: "tw:text-xs tw:text-foreground", children: "USERS" })
        ] }),
        /* @__PURE__ */ p("div", { className: "tw:flex tw:flex-col tw:items-center tw:gap-1 tw:px-4", children: [
          /* @__PURE__ */ o("div", { className: "tw:flex tw:gap-2", children: a.slice(0, 3).map((w) => /* @__PURE__ */ o("span", { className: "tw:text-xs tw:font-semibold tw:text-foreground", children: w.toUpperCase() }, w)) }),
          a.length > 3 && /* @__PURE__ */ p(
            "button",
            {
              type: "button",
              onClick: () => l(),
              className: "tw:text-xs tw:text-foreground tw:underline",
              children: [
                "+",
                a.length - 3,
                " more languages"
              ]
            }
          )
        ] }),
        (n || s) && /* @__PURE__ */ p("div", { className: "tw:flex tw:flex-col tw:gap-1 tw:px-4", children: [
          n && /* @__PURE__ */ o("div", { className: "tw:flex tw:gap-1", children: /* @__PURE__ */ p(
            J,
            {
              onClick: () => i(),
              variant: "link",
              className: "tw:flex tw:h-auto tw:gap-1 tw:py-0 tw:text-xs tw:font-semibold tw:text-foreground",
              children: [
                "Website",
                /* @__PURE__ */ o(vc, { className: "tw:h-4 tw:w-4" })
              ]
            }
          ) }),
          s && /* @__PURE__ */ o("div", { className: "tw:flex tw:gap-1", children: /* @__PURE__ */ p(
            J,
            {
              onClick: () => c(),
              variant: "link",
              className: "tw:flex tw:h-auto tw:gap-1 tw:py-0 tw:text-xs tw:font-semibold tw:text-foreground",
              children: [
                "Support",
                /* @__PURE__ */ o(bc, { className: "tw:h-4 tw:w-4" })
              ]
            }
          ) })
        ] })
      ]
    }
  );
}
function pu({ id: t, versionHistory: e }) {
  const [r, a] = E(!1), n = /* @__PURE__ */ new Date();
  function i(c) {
    const d = new Date(c), l = new Date(n.getTime() - d.getTime()), w = l.getUTCFullYear() - 1970, u = l.getUTCMonth(), h = l.getUTCDate() - 1;
    let f = "";
    return w > 0 ? f = `${w.toString()} year${w === 1 ? "" : "s"} ago` : u > 0 ? f = `${u.toString()} month${u === 1 ? "" : "s"} ago` : h === 0 ? f = "today" : f = `${h.toString()} day${h === 1 ? "" : "s"} ago`, f;
  }
  const s = Object.entries(e).sort((c, d) => d[0].localeCompare(c[0]));
  return /* @__PURE__ */ p("div", { className: "pr-twp", id: t, children: [
    /* @__PURE__ */ o("h3", { className: "tw:text-md tw:font-semibold", children: "What`s New" }),
    /* @__PURE__ */ o("ul", { className: "tw:list-disc tw:pl-5 tw:pr-4 tw:text-xs tw:text-foreground", children: (r ? s : s.slice(0, 5)).map((c) => /* @__PURE__ */ p("div", { className: "tw:mt-3 tw:flex tw:justify-between", children: [
      /* @__PURE__ */ o("div", { className: "tw:text-foreground", children: /* @__PURE__ */ o("li", { className: "tw:prose tw:text-xs", children: /* @__PURE__ */ o("span", { children: c[1].description }) }) }),
      /* @__PURE__ */ p("div", { className: "tw:justify-end tw:text-right", children: [
        /* @__PURE__ */ p("div", { children: [
          "Version ",
          c[0]
        ] }),
        /* @__PURE__ */ o("div", { children: i(c[1].date) })
      ] })
    ] }, c[0])) }),
    s.length > 5 && /* @__PURE__ */ o(
      "button",
      {
        type: "button",
        onClick: () => a(!r),
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
  locales: a,
  versionHistory: n,
  currentVersion: i
}) {
  const s = I(() => Ac(r), [r]), d = ((l) => {
    const w = new Intl.DisplayNames(Vc(), { type: "language" });
    return l.map((u) => w.of(u));
  })(a);
  return /* @__PURE__ */ o("div", { id: t, className: "pr-twp tw:border-t tw:py-2", children: /* @__PURE__ */ p("div", { className: "tw:flex tw:flex-col tw:gap-2 tw:divide-y", children: [
    Object.entries(n).length > 0 && /* @__PURE__ */ o(pu, { versionHistory: n }),
    /* @__PURE__ */ p("div", { className: "tw:flex tw:flex-col tw:gap-2 tw:py-2", children: [
      /* @__PURE__ */ o("h2", { className: "tw:text-md tw:font-semibold", children: "Information" }),
      /* @__PURE__ */ p("div", { className: "tw:flex tw:items-start tw:justify-between tw:text-xs tw:text-foreground", children: [
        /* @__PURE__ */ p("p", { className: "tw:flex tw:flex-col tw:justify-start tw:gap-1", children: [
          /* @__PURE__ */ o("span", { children: "Publisher" }),
          /* @__PURE__ */ o("span", { className: "tw:font-semibold", children: e }),
          /* @__PURE__ */ o("span", { children: "Size" }),
          /* @__PURE__ */ o("span", { className: "tw:font-semibold", children: s })
        ] }),
        /* @__PURE__ */ o("div", { className: "tw:flex tw:w-3/4 tw:items-center tw:justify-between tw:text-xs tw:text-foreground", children: /* @__PURE__ */ p("p", { className: "tw:flex tw:flex-col tw:justify-start tw:gap-1", children: [
          /* @__PURE__ */ o("span", { children: "Version" }),
          /* @__PURE__ */ o("span", { className: "tw:font-semibold", children: i }),
          /* @__PURE__ */ o("span", { children: "Languages" }),
          /* @__PURE__ */ o("span", { className: "tw:font-semibold", children: d.join(", ") })
        ] }) })
      ] })
    ] })
  ] }) });
}
function zh({
  entries: t,
  selected: e,
  onChange: r,
  placeholder: a,
  searchPlaceholder: n,
  commandEmptyMessage: i,
  customSelectedText: s,
  isDisabled: c,
  sortSelected: d,
  showScrollCue: l,
  icon: w,
  className: u,
  badgesPlaceholder: h,
  id: f
}) {
  return /* @__PURE__ */ p("div", { id: f, className: "tw:flex tw:items-center tw:gap-2", children: [
    /* @__PURE__ */ o(
      Ps,
      {
        entries: t,
        selected: e,
        onChange: r,
        placeholder: a,
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
    e.length > 0 ? /* @__PURE__ */ o("div", { className: "tw:flex tw:flex-wrap tw:items-center tw:gap-2", children: e.map((_) => {
      var b;
      return /* @__PURE__ */ p(Hr, { variant: "muted", className: "tw:flex tw:items-center tw:gap-1", children: [
        /* @__PURE__ */ o(
          J,
          {
            variant: "ghost",
            size: "icon",
            className: "tw:h-4 tw:w-4 tw:p-0 tw:hover:bg-transparent",
            onClick: () => r(e.filter((g) => g !== _)),
            children: /* @__PURE__ */ o(xc, { className: "tw:h-3 tw:w-3" })
          }
        ),
        (b = t.find((g) => g.value === _)) == null ? void 0 : b.label
      ] }, _);
    }) }) : /* @__PURE__ */ o(gt, { children: h })
  ] });
}
const Rn = " ";
function hu(t, e) {
  let r = "content", a = t.parentElement;
  for (; a && a !== e; ) {
    const { classList: n } = a;
    if (n.contains("note-category")) return "category";
    if (n.contains("note-closer") || n.contains("note-placeholder"))
      return "display";
    n.contains("marker") && (r = "glyph"), a = a.parentElement;
  }
  return r;
}
function On(t) {
  return t.nextNode() ?? void 0;
}
function ts(t) {
  return t.data.endsWith(Rn) ? t.data.length - Rn.length : t.data.length;
}
function gu(t, e, r) {
  var l, w;
  const a = t.querySelector(".note-category-value");
  if (a != null && a.contains(e)) return { utf16Offset: r, field: "category" };
  const n = (l = e.parentElement) == null ? void 0 : l.closest(".marker");
  if (!a || !n || !t.contains(n)) return { utf16Offset: 0 };
  const i = n === t.querySelector(".marker"), s = ((w = a.textContent) == null ? void 0 : w.length) ?? 0, c = i ? 0 : s;
  return r > ts(e) ? { utf16Offset: c, field: "category" } : { utf16Offset: c, field: "category", glyph: { index: !i && s === 0 ? 1 : 0, offset: r } };
}
function zn(t, e, r) {
  var s;
  const a = document.createTreeWalker(t, NodeFilter.SHOW_TEXT);
  let n = 0, i = 0;
  for (let c = On(a); c; c = On(a)) {
    const d = hu(c, t);
    if (d === "category") {
      if (c === e) {
        const l = (s = c.parentElement) == null ? void 0 : s.closest(".note-category");
        return l ? gu(l, c, r) : { utf16Offset: 0 };
      }
    } else if (d === "display") {
      if (c === e) return { utf16Offset: n };
    } else if (d === "glyph") {
      if (c === e)
        return r > ts(c) ? { utf16Offset: n } : { utf16Offset: n, glyph: { index: i, offset: r } };
      i += 1;
    } else {
      if (c === e) return { utf16Offset: n + r };
      n += c.data.length, c.data.length > 0 && (i = 0);
    }
  }
  return "end";
}
function Dn(t) {
  return t.nodeType === Node.TEXT_NODE ? t : document.createTreeWalker(t, NodeFilter.SHOW_TEXT).nextNode() ?? void 0;
}
function fu(t, e, r) {
  var s;
  const a = r.querySelector(".textual-note-body");
  if (!a) return "end";
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
    const c = Dn(a);
    return c ? zn(a, c, 0) : "end";
  }
  if (!a.contains(n)) return "end";
  if (n.nodeType === Node.ELEMENT_NODE) {
    const c = n.childNodes[i], d = c ? Dn(c) : void 0;
    if (!d) return "end";
    n = d, i = 0;
  }
  return n.nodeType !== Node.TEXT_NODE ? "end" : zn(a, n, i);
}
const Dh = Object.freeze([
  ...$s,
  ...Object.entries(Lc).map(([, t]) => t.description).filter((t) => !!t),
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
  ...As,
  ...jn
]), es = " ", mu = "\uFEFF";
function rs(t) {
  return t.closed !== "false";
}
function vu(t, e, r = !0, a = void 0, n = void 0) {
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
        w && !c && /* @__PURE__ */ o("span", { className: "note-placeholder", children: mu }),
        w && n,
        as(t, d, r),
        u && a
      ] }, `${t ?? "note"}-p${l}`)
    );
  });
}
function as(t, e, r = !0, a = !1) {
  if (!(!e || e.length === 0))
    return e.map((n, i) => {
      const s = `${t ?? "note"}-${i}`;
      return typeof n == "string" ? /* @__PURE__ */ o("span", { className: v(`usfm_${t}`), children: n }, s) : bu(n, s, r, a);
    });
}
function bu(t, e, r, a = !1) {
  const { marker: n } = t;
  if (t.type === "unmatched")
    return /* @__PURE__ */ o("span", { className: "marker", children: `\\${n}` }, e);
  const i = `${a ? "+" : ""}${n}`;
  return /* @__PURE__ */ p("span", { children: [
    n ? r && /* @__PURE__ */ o("span", { className: "marker", children: `\\${i}${es}` }) : /* @__PURE__ */ o(
      yc,
      {
        className: "tw:text-error tw:mr-1 tw:inline-block tw:h-4 tw:w-4",
        "aria-label": "Missing marker"
      }
    ),
    as(
      n,
      t.content,
      r,
      /* isNestedContent */
      !0
    ),
    n && r && rs(t) && /* @__PURE__ */ o("span", { className: "marker", children: `\\${i}*` })
  ] }, e);
}
function xu({
  footnote: t,
  layout: e = "horizontal",
  formatCaller: r,
  showMarkers: a = !0
}) {
  const n = r ? r(t.caller) : t.caller, i = n !== t.caller, s = a ? /* @__PURE__ */ o("span", { className: "marker", children: `\\${t.marker}` }) : void 0, c = a && rs(t) ? /* @__PURE__ */ o("span", { className: "marker note-closer", children: `\\${t.marker}*` }) : void 0, d = t.category ? (
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
      a && /* @__PURE__ */ o("span", { className: "marker", children: `\\cat${es}` }),
      /* @__PURE__ */ o("span", { className: "note-category-value", children: t.category }),
      a && /* @__PURE__ */ o("span", { className: "marker", children: "\\cat*" }),
      !a && " "
    ] })
  ) : void 0, l = n && // USFM does not specify a marker for caller, so instead of a usfm_* class, we use a
  // specific class name in case styling is needed.
  /* @__PURE__ */ o("span", { className: v("note-caller tw:inline-block", { formatted: i }), children: n }), w = e === "horizontal" ? "horizontal" : "vertical", u = a ? "marker-visible" : "", h = e === "horizontal" ? "tw:col-span-1" : "tw:col-span-2 tw:col-start-1 tw:row-start-2", f = v(w, u);
  return /* @__PURE__ */ p(Dt, { children: [
    /* @__PURE__ */ p("div", { className: v("textual-note-header tw:col-span-1 tw:w-fit tw:text-nowrap", f), children: [
      s,
      !!s && !!l && " ",
      l
    ] }),
    /* @__PURE__ */ o(
      "div",
      {
        className: v(
          "textual-note-body tw:flex tw:flex-col tw:gap-1",
          h,
          f
        ),
        children: vu(
          t.marker,
          t.content,
          a,
          c,
          d
        )
      }
    )
  ] });
}
const yu = "editing-row", ku = 1e3;
function _u(t) {
  const e = t.ownerDocument.getSelection();
  if (!e || e.rangeCount === 0 || !t.contains(e.focusNode))
    return;
  const r = e.getRangeAt(0).cloneRange();
  r.collapse(!1);
  const a = typeof r.getBoundingClientRect == "function" ? r.getBoundingClientRect() : void 0;
  if (a && (a.height > 0 || a.top !== 0)) return a;
  const { focusNode: n } = e, i = n instanceof Element ? n : n == null ? void 0 : n.parentElement;
  return i == null ? void 0 : i.getBoundingClientRect();
}
function Nu(t, e) {
  const r = t.getBoundingClientRect(), a = (e == null ? void 0 : e.getBoundingClientRect().height) ?? 0, n = _u(t);
  if (!e || r.height <= a || !n) {
    t.scrollIntoView({ block: "nearest" });
    return;
  }
  n.bottom - r.top <= a ? t.scrollIntoView({ block: "start" }) : r.bottom - n.top <= a && t.scrollIntoView({ block: "end" });
}
function ua(t, e, r, a) {
  let n = Math.min(Math.max(t + e, 0), r);
  if (n === a) {
    const i = Math.min(Math.max(n + e, 0), r);
    n = i === n ? t : i;
  }
  return n === a ? t : n;
}
function Mh({
  ariaLabel: t = "Footnotes",
  className: e,
  classNameForItems: r,
  footnotes: a,
  layout: n = "horizontal",
  listId: i,
  selectedFootnote: s,
  selectionRequest: c,
  showMarkers: d = !0,
  suppressFormatting: l = !1,
  formatCaller: w,
  onFootnoteSelected: u,
  onFootnoteEditRequested: h,
  onFocusedFootnoteChange: f,
  editingFootnoteIndex: _,
  renderEditingFootnote: b
}) {
  const g = w ?? Bc(a, void 0), k = b ? _ : void 0, y = H([]), S = H(null), P = H(null), j = (N, C, L) => {
    if (h) {
      const $ = y.current[C], U = $ ? fu(L.clientX, L.clientY, $) : "end";
      h(N, C, i, U);
      return;
    }
    u == null || u(N, C, i);
  }, z = s ? a.findIndex((N) => N === s) : -1, [D, M] = E(z), R = (N) => {
    var C;
    M(N), N >= 0 && N < y.current.length && ((C = y.current[N]) == null || C.focus());
  }, O = (N, C, L) => {
    if (a.length)
      switch (N.key) {
        case "Enter":
          N.preventDefault(), h ? h(C, L, i, "end") : u == null || u(C, L, i);
          break;
        case " ":
          N.preventDefault(), u == null || u(C, L, i);
          break;
      }
  }, K = a.length - 1, q = (N) => {
    if (a.length && !(N.target !== N.currentTarget && !(N.target instanceof HTMLElement && N.target.closest('li[role="option"]'))))
      switch (N.key) {
        case "ArrowDown":
          N.preventDefault(), R(ua(D, 1, K, k));
          break;
        case "ArrowUp":
          N.preventDefault(), R(ua(D, -1, K, k));
          break;
      }
  };
  Y(() => {
    k === void 0 || D !== k || M((N) => {
      const C = ua(N, 1, K, k);
      if (C !== N) return C;
      const L = ua(N, -1, K, k);
      return L !== N ? L : -1;
    });
  }, [k, D, K]);
  const Z = H(void 0), x = (N) => {
    Z.current !== N && (Z.current = N, f == null || f(N));
  };
  Y(() => {
    const N = Z.current;
    if (N === void 0) return;
    const C = y.current[N];
    (!C || C.ownerDocument.activeElement !== C) && (Z.current = void 0, f == null || f(void 0));
  });
  const W = s ? a.findIndex((N) => N === s) : -1;
  return Y(() => {
    var N;
    W < 0 || W >= y.current.length || (N = y.current[W]) == null || N.scrollIntoView({ block: "nearest" });
  }, [W, c]), Y(() => {
    const N = S.current;
    if (k === void 0 || !N) return;
    const C = () => Nu(N, P.current);
    if (C(), typeof ResizeObserver > "u") return;
    const L = new ResizeObserver(C);
    L.observe(N);
    const $ = setTimeout(() => L.disconnect(), ku);
    return () => {
      clearTimeout($), L.disconnect();
    };
  }, [k, c]), // Every row is its own tab stop (see the row `tabIndex` below), so the list is not one as
  // well - a stop here would put an extra, contentless press between whatever precedes the list
  // and its first note. It stays programmatically focusable (`-1`) because arrow-key navigation
  // starts by focusing it. With NO rows there is no row to be that stop, so the list takes the
  // turn itself rather than leaving the region unreachable by keyboard.
  /* @__PURE__ */ o(
    "div",
    {
      ref: P,
      role: "listbox",
      "aria-label": t,
      tabIndex: a.length === 0 ? 0 : -1,
      className: v("tw:h-full tw:overflow-y-auto", e),
      onKeyDown: q,
      children: /* @__PURE__ */ o(
        "ul",
        {
          className: v(
            "tw:p-0.5 tw:pt-1",
            "tw:grid",
            // Two columns in both layouts: the note's marker+caller, then its text. PT9 keeps the
            // `\fr`/`\xo` target reference inside the note text rather than aligning it in a column
            // of its own, so there is no third column to size.
            "tw:grid-cols-[min-content_1fr]",
            !l && "formatted-font"
          ),
          children: a.map((N, C) => {
            const L = N === s, $ = C === _ && !!b, U = $ ? yu : `${i}-${C}`, rt = C < a.length - 1 && n === "vertical" && /* @__PURE__ */ o(Gr, { tabIndex: -1, className: "tw:col-span-2" });
            return $ ? /* @__PURE__ */ p(rr, { children: [
              /* @__PURE__ */ o(
                "li",
                {
                  ref: S,
                  "data-state": "editing",
                  className: v(
                    "tw:gap-x-3 tw:gap-y-1 tw:p-2",
                    "tw:w-full tw:rounded-sm tw:border-0 tw:shadow-none",
                    // PT9 highlights the entry being edited (light yellow); warning is the theme's
                    // amber-family token so this stays theme-aware in dark mode.
                    "tw:bg-warning/15",
                    "tw:col-span-2",
                    n === "vertical" && "tw:row-span-2",
                    r
                  ),
                  children: b(N, C)
                }
              ),
              rt
            ] }, U) : (
              // The key belongs on the outermost node returned from the map — the Fragment — not on
              // the `<li>` nested inside it, which leaves the Fragment itself unkeyed.
              /* @__PURE__ */ p(rr, { children: [
                /* @__PURE__ */ o(
                  "li",
                  {
                    ref: (ot) => {
                      y.current[C] = ot;
                    },
                    role: "option",
                    "aria-selected": L,
                    "data-marker": N.marker,
                    "data-state": L ? "selected" : void 0,
                    tabIndex: 0,
                    className: v(
                      "tw:gap-x-3 tw:gap-y-1 tw:p-2 tw:data-[state=selected]:bg-muted",
                      // Both handlers make the row a click target, so both earn the hover affordance -
                      // a consumer that only opens rows for editing would otherwise render rows that
                      // respond to a click but look inert.
                      (u || h) && "tw:hover:bg-muted/50",
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
                    onClick: (ot) => j(N, C, ot),
                    onFocus: () => {
                      M(C), x(C);
                    },
                    onBlur: () => x(void 0),
                    onKeyDown: (ot) => O(ot, N, C),
                    children: /* @__PURE__ */ o(
                      xu,
                      {
                        footnote: N,
                        layout: n,
                        formatCaller: () => g(N.caller, C),
                        showMarkers: d
                      }
                    )
                  }
                ),
                rt
              ] }, U)
            );
          })
        }
      )
    }
  );
}
function Cu(t) {
  const e = [];
  let r = 0;
  const a = /\\\\(.+?)\\\\/g;
  let n;
  for (; (n = a.exec(t)) !== null; )
    n.index > r && e.push(t.substring(r, n.index)), e.push(/* @__PURE__ */ o("strong", { children: n[1] }, n.index)), r = a.lastIndex;
  return r < t.length && e.push(t.substring(r)), e.length > 0 ? e : [t];
}
function Eu({
  occurrenceData: t,
  setScriptureReference: e,
  localizedStrings: r,
  classNameForText: a
}) {
  const n = Dr(), i = r["%webView_inventory_occurrences_table_header_reference%"], s = r["%webView_inventory_occurrences_table_header_occurrence%"], c = I(() => {
    const d = [], l = /* @__PURE__ */ new Set();
    return t.forEach((w) => {
      const u = `${w.reference.book}:${w.reference.chapterNum}:${w.reference.verseNum}:${w.text}`;
      l.has(u) || (l.add(u), d.push(w));
    }), d;
  }, [t]);
  return /* @__PURE__ */ p(_o, { stickyHeader: !0, children: [
    /* @__PURE__ */ o(No, { stickyHeader: !0, children: /* @__PURE__ */ p(Fe, { children: [
      /* @__PURE__ */ o(_a, { children: i }),
      /* @__PURE__ */ o(_a, { children: s })
    ] }) }),
    /* @__PURE__ */ o(Co, { children: c.length > 0 && c.map((d) => /* @__PURE__ */ p(
      Fe,
      {
        onClick: () => {
          e(d.reference);
        },
        children: [
          /* @__PURE__ */ o(hr, { children: Oe(d.reference, "English") }),
          /* @__PURE__ */ o(
            hr,
            {
              className: a,
              "data-platform-content-zoom-root": n["data-platform-content-zoom-root"],
              "data-platform-content-zoom-label": n["data-platform-content-zoom-label"],
              children: Cu(d.text)
            }
          )
        ]
      },
      `${d.reference.book} ${d.reference.chapterNum}:${d.reference.verseNum}-${d.text}`
    )) })
  ] });
}
function os({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    cn.Root,
    {
      "data-slot": "checkbox",
      className: v(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:peer tw:relative tw:flex tw:size-4 tw:shrink-0 tw:items-center tw:justify-center tw:rounded-[4px] tw:border tw:border-input tw:transition-colors tw:outline-none tw:group-has-disabled/field:opacity-50 tw:after:absolute tw:after:-inset-x-3 tw:after:-inset-y-2 tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:aria-invalid:aria-checked:border-primary tw:dark:bg-input/30 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40 tw:data-checked:border-primary tw:data-checked:bg-primary tw:data-checked:text-primary-foreground tw:dark:data-checked:bg-primary",
        t
      ),
      ...e,
      children: /* @__PURE__ */ o(
        cn.Indicator,
        {
          "data-slot": "checkbox-indicator",
          className: "tw:grid tw:place-content-center tw:text-current tw:transition-none tw:[&>svg]:size-3.5",
          children: /* @__PURE__ */ o(za, {})
        }
      )
    }
  );
}
const Tu = (t) => {
  if (t === "asc")
    return /* @__PURE__ */ o(Cc, { className: "tw:h-4 tw:w-4" });
  if (t === "desc")
    return /* @__PURE__ */ o(Ec, { className: "tw:h-4 tw:w-4" });
}, Ia = (t, e, r) => /* @__PURE__ */ o(Qt, { children: /* @__PURE__ */ p(vt, { children: [
  /* @__PURE__ */ p(
    bt,
    {
      className: v("tw:flex tw:w-full tw:justify-start", r),
      variant: "ghost",
      onClick: () => t.toggleSorting(void 0),
      children: [
        /* @__PURE__ */ o("span", { className: "tw:w-6 tw:max-w-fit tw:flex-1 tw:overflow-hidden tw:text-ellipsis", children: e }),
        Tu(t.getIsSorted())
      ]
    }
  ),
  /* @__PURE__ */ o(xt, { side: "bottom", children: e })
] }) }), Ih = (t) => ({
  accessorKey: "item",
  accessorFn: (e) => e.items[0],
  header: ({ column: e }) => Ia(e, t)
}), Su = (t, e) => ({
  accessorKey: `item${e}`,
  accessorFn: (r) => r.items[e],
  header: ({ column: r }) => Ia(r, t)
}), Ph = (t) => ({
  accessorKey: "count",
  header: ({ column: e }) => Ia(e, t, "tw:justify-end"),
  cell: ({ row: e }) => /* @__PURE__ */ o("div", { className: "tw:flex tw:justify-end tw:tabular-nums", children: e.getValue("count") })
}), eo = (t, e, r, a, n, i) => {
  let s = [...r];
  t.forEach((d) => {
    e === "approved" ? s.includes(d) || s.push(d) : s = s.filter((l) => l !== d);
  }), a(s);
  let c = [...n];
  t.forEach((d) => {
    e === "unapproved" ? c.includes(d) || c.push(d) : c = c.filter((l) => l !== d);
  }), i(c);
}, $h = (t, e, r, a, n) => ({
  accessorKey: "status",
  header: ({ column: i }) => Ia(i, t, "tw:justify-center"),
  cell: ({ row: i }) => {
    const s = i.getValue("status"), c = i.getValue("item");
    return (
      // Center the status buttons in the cell to match the centered status column header (the
      // ToggleGroup would otherwise sit left-aligned).
      /* @__PURE__ */ o("div", { className: "tw:flex tw:justify-center", children: /* @__PURE__ */ p(Ui, { value: s, variant: "outline", type: "single", className: "tw:gap-0", children: [
        /* @__PURE__ */ o(
          ma,
          {
            onClick: (d) => {
              d.stopPropagation(), eo(
                [c],
                "approved",
                e,
                r,
                a,
                n
              );
            },
            value: "approved",
            className: "tw:rounded-e-none tw:border-e-0",
            children: /* @__PURE__ */ o(kc, {})
          }
        ),
        /* @__PURE__ */ o(
          ma,
          {
            onClick: (d) => {
              d.stopPropagation(), eo(
                [c],
                "unapproved",
                e,
                r,
                a,
                n
              );
            },
            value: "unapproved",
            className: "tw:rounded-none",
            children: /* @__PURE__ */ o(_c, {})
          }
        ),
        /* @__PURE__ */ o(
          ma,
          {
            onClick: (d) => {
              d.stopPropagation(), eo(
                [c],
                "unknown",
                e,
                r,
                a,
                n
              );
            },
            value: "unknown",
            className: "tw:rounded-s-none tw:border-s-0",
            children: /* @__PURE__ */ o(Nc, {})
          }
        )
      ] }) })
    );
  }
}), Ah = (t) => t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g), Vh = (t) => {
  const e = /^\\[vc]\s+(\d+)/, r = t.match(e);
  if (r)
    return +r[1];
}, Lh = (t) => {
  const e = t.match(/^\\id\s+([A-Za-z]+)/);
  return e ? e[1] : "";
}, Ru = (t, e, r) => r.includes(t) ? "unapproved" : e.includes(t) ? "approved" : "unknown", Bh = Object.freeze([
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
]), Ou = (t, e, r) => {
  let a = t;
  return e !== "all" && (a = a.filter(
    (n) => e === "approved" && n.status === "approved" || e === "unapproved" && n.status === "unapproved" || e === "unknown" && n.status === "unknown"
  )), r !== "" && (a = a.filter((n) => n.items[0].includes(r))), a;
}, zu = (t, e, r) => t.map((a) => {
  const n = en(a.key) ? a.key : a.key[0];
  return {
    items: en(a.key) ? [a.key] : a.key,
    count: a.count,
    status: a.status || Ru(n, e, r),
    occurrences: a.occurrences || []
  };
}), he = (t, e) => t[e] ?? e;
function jh({
  inventoryItems: t,
  setVerseRef: e,
  localizedStrings: r,
  additionalItemsLabels: a,
  approvedItems: n,
  unapprovedItems: i,
  scope: s,
  onScopeChange: c,
  columns: d,
  id: l,
  areInventoryItemsLoading: w = !1,
  classNameForVerseText: u,
  onItemSelected: h
}) {
  const f = he(r, "%webView_inventory_all%"), _ = he(r, "%webView_inventory_approved%"), b = he(r, "%webView_inventory_unapproved%"), g = he(r, "%webView_inventory_unknown%"), k = he(r, "%webView_inventory_scope_currentBook%"), y = he(r, "%webView_inventory_scope_chapter%"), S = he(r, "%webView_inventory_scope_verse%"), P = he(r, "%webView_inventory_filter_text%"), j = he(
    r,
    "%webView_inventory_show_additional_items%"
  ), z = he(r, "%webView_inventory_no_results%"), [D, M] = E(!1), [R, O] = E("all"), [K, q] = E(""), [Z, x] = E([]), W = I(() => {
    const G = t ?? [];
    return G.length === 0 ? [] : zu(G, n, i);
  }, [t, n, i]), N = I(() => {
    if (D) return W;
    const G = [];
    return W.forEach((st) => {
      const dt = st.items[0], ct = G.find(
        (Tt) => Tt.items[0] === dt
      );
      ct ? (ct.count += st.count, ct.occurrences = ct.occurrences.concat(st.occurrences)) : G.push({
        items: [dt],
        count: st.count,
        occurrences: st.occurrences,
        status: st.status
      });
    }), G;
  }, [D, W]), C = I(() => N.length === 0 ? [] : Ou(N, R, K), [N, R, K]), L = I(() => {
    var dt, ct;
    if (!D) return d;
    const G = (dt = a == null ? void 0 : a.tableHeaders) == null ? void 0 : dt.length;
    if (!G) return d;
    const st = [];
    for (let Tt = 0; Tt < G; Tt++)
      st.push(
        Su(
          ((ct = a == null ? void 0 : a.tableHeaders) == null ? void 0 : ct[Tt]) || "Additional Item",
          Tt + 1
        )
      );
    return [...st, ...d];
  }, [a == null ? void 0 : a.tableHeaders, d, D]);
  Y(() => {
    C.length === 0 ? x([]) : C.length === 1 && x(C[0].items);
  }, [C]);
  const $ = (G, st) => {
    st.setRowSelection(() => {
      const ct = {};
      return ct[G.index] = !0, ct;
    });
    const dt = G.original.items;
    x(dt), h && dt.length > 0 && h(dt[0]);
  }, U = (G) => {
    if (G === "book" || G === "chapter" || G === "verse")
      c(G);
    else
      throw new Error(`Invalid scope value: ${G}`);
  }, rt = (G) => {
    if (G === "all" || G === "approved" || G === "unapproved" || G === "unknown")
      O(G);
    else
      throw new Error(`Invalid status filter value: ${G}`);
  }, ot = I(() => {
    if (N.length === 0 || Z.length === 0) return [];
    const G = N.filter((st) => jc(
      D ? st.items : [st.items[0]],
      Z
    ));
    if (G.length > 1) throw new Error("Selected item is not unique");
    return G.length === 0 ? [] : G[0].occurrences;
  }, [Z, D, N]);
  return /* @__PURE__ */ o("div", { id: l, className: "pr-twp tw:h-full tw:overflow-auto", children: /* @__PURE__ */ p("div", { className: "tw:flex tw:h-full tw:w-full tw:min-w-min tw:flex-col", children: [
    /* @__PURE__ */ p("div", { className: "tw:flex tw:items-stretch", style: { contain: "inline-size" }, children: [
      /* @__PURE__ */ p(
        yr,
        {
          onValueChange: (G) => rt(G),
          defaultValue: R,
          children: [
            /* @__PURE__ */ o(_r, { className: "tw:m-1 tw:w-auto tw:flex-1", children: /* @__PURE__ */ o(kr, { placeholder: "Select filter" }) }),
            /* @__PURE__ */ p(Nr, { children: [
              /* @__PURE__ */ o(oe, { value: "all", children: f }),
              /* @__PURE__ */ o(oe, { value: "approved", children: _ }),
              /* @__PURE__ */ o(oe, { value: "unapproved", children: b }),
              /* @__PURE__ */ o(oe, { value: "unknown", children: g })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ p(yr, { onValueChange: (G) => U(G), defaultValue: s, children: [
        /* @__PURE__ */ o(_r, { className: "tw:m-1 tw:w-auto tw:flex-1", children: /* @__PURE__ */ o(kr, { placeholder: "Select scope" }) }),
        /* @__PURE__ */ p(Nr, { children: [
          /* @__PURE__ */ o(oe, { value: "book", children: k }),
          /* @__PURE__ */ o(oe, { value: "chapter", children: y }),
          /* @__PURE__ */ o(oe, { value: "verse", children: S })
        ] })
      ] }),
      /* @__PURE__ */ o(
        Eo,
        {
          className: "tw:m-1 tw:flex-1 tw:rounded-md tw:border",
          placeholder: P,
          value: K,
          onChange: (G) => {
            q(G.target.value);
          }
        }
      ),
      a && /* @__PURE__ */ o(Qt, { children: /* @__PURE__ */ p(vt, { children: [
        /* @__PURE__ */ o(bt, { asChild: !0, children: /* @__PURE__ */ p("div", { className: "tw:m-1 tw:flex tw:w-fit tw:min-w-[26px] tw:items-center tw:rounded-md tw:border", children: [
          /* @__PURE__ */ o(
            os,
            {
              className: "tw:m-1 tw:shrink-0",
              checked: D,
              onCheckedChange: (G) => {
                M(G);
              }
            }
          ),
          /* @__PURE__ */ o(gt, { className: "tw:m-1 tw:truncate", children: (a == null ? void 0 : a.checkboxText) ?? j })
        ] }) }),
        /* @__PURE__ */ o(xt, { children: (a == null ? void 0 : a.checkboxText) ?? j })
      ] }) })
    ] }),
    /* @__PURE__ */ o("div", { className: "tw:m-1 tw:flex-1 tw:overflow-auto tw:rounded-md tw:border", children: /* @__PURE__ */ o(
      lu,
      {
        columns: L,
        data: C,
        onRowClickHandler: $,
        stickyHeader: !0,
        isLoading: w,
        noResultsMessage: z
      }
    ) }),
    ot.length > 0 && /* @__PURE__ */ o("div", { className: "tw:m-1 tw:flex-1 tw:overflow-auto tw:rounded-md tw:border", children: /* @__PURE__ */ o(
      Eu,
      {
        classNameForText: u,
        occurrenceData: ot,
        setScriptureReference: e,
        localizedStrings: r
      }
    ) })
  ] }) });
}
function Du(t, e) {
  return Object.entries(t).filter(([, r]) => "menuItem" in r && r.menuItem === e).sort(([, r], [, a]) => r.order - a.order).map(([r]) => r);
}
function Mu(t, e) {
  return Object.entries(t).filter(([r, a]) => is(r, a, e)).sort(([, r], [, a]) => r.order - a.order).map(([r]) => r);
}
function ns(t) {
  return Object.entries(t).flatMap(([e, r]) => typeof r == "object" ? [{ columnKey: e, column: r }] : []).sort((e, r) => e.column.order - r.column.order);
}
function is(t, e, r) {
  return "column" in e && e.column === r || t === r;
}
function Iu(t) {
  const e = new Set(t.items.map((a) => a.group)), r = Object.entries(t.groups).filter(
    ([a]) => e.has(a)
  );
  return ns(t.columns).filter(
    ({ columnKey: a }) => r.some(
      ([n, i]) => is(n, i, a)
    )
  ).map(({ columnKey: a, column: n }) => ({
    columnKey: a,
    label: n.label,
    isHeaderHidden: n.isHeaderHidden ?? !1
  }));
}
function Pa(t) {
  return t.some((e) => Kn(e.iconNameBefore) || e.iconPathBefore) ? "icon" : "none";
}
function Ho(t, e) {
  let r = !1;
  return t.flatMap(({ groupKey: a, items: n }) => {
    if (n.length === 0) return [];
    const i = r ? [e(a)] : [];
    return r = !0, [...i, ...n];
  });
}
function ss(t, e) {
  return e.map((r) => ({
    groupKey: r,
    items: t.items.filter((a) => a.group === r).sort((a, n) => a.order - n.order).map(
      (a) => "command" in a ? { item: a } : {
        item: a,
        subGroups: ss(
          t,
          Du(t.groups, a.id)
        )
      }
    )
  }));
}
function cs(t) {
  return t ? {
    columns: ns(t.columns).map((e) => ({
      ...e,
      groups: ss(t, Mu(t.groups, e.columnKey))
    }))
  } : { columns: [] };
}
const Pu = "16rem", $u = "3rem", ls = Ct.createContext(void 0);
function $a() {
  const t = Ct.useContext(ls);
  if (!t)
    throw new Error("useSidebar must be used within a SidebarProvider.");
  return t;
}
function Au({
  defaultOpen: t = !0,
  open: e,
  onOpenChange: r,
  className: a,
  style: n,
  children: i,
  // CUSTOM: Added 'side' prop at provider level so direction-aware side can be propagated via context
  side: s = "primary",
  ...c
}) {
  const [d, l] = Ct.useState(t), w = e ?? d, u = Ct.useCallback(
    (S) => {
      const P = typeof S == "function" ? S(w) : S;
      r ? r(P) : l(P);
    },
    [r, w]
  ), h = Ct.useCallback(() => u((S) => !S), [u]), f = w ? "expanded" : "collapsed", g = ne() === "ltr" ? s : s === "primary" ? "secondary" : "primary", k = Ct.useMemo(
    () => ({
      state: f,
      open: w,
      setOpen: u,
      toggleSidebar: h,
      // CUSTOM: Passes direction-aware side into context so SidebarTrigger icon and Sidebar
      // positioning both respond correctly in RTL layouts
      side: g
    }),
    [f, w, u, h, g]
  ), y = {
    "--sidebar-width": Pu,
    "--sidebar-width-icon": $u,
    ...n
  };
  return /* @__PURE__ */ o(ls.Provider, { value: k, children: /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "sidebar-wrapper",
      style: y,
      className: v(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        // CUSTOM: Removed tw:min-h-svh - not appropriate in Platform.Bible's windowed layout
        "pr-twp tw:group/sidebar-wrapper tw:flex tw:w-full tw:has-data-[variant=inset]:bg-sidebar",
        a
      ),
      ...c,
      children: i
    }
  ) });
}
function Vu({
  // CUSTOM: Removed 'side' prop from Sidebar - it is now read from context (moved to SidebarProvider)
  variant: t = "sidebar",
  collapsible: e = "offcanvas",
  className: r,
  children: a,
  ...n
}) {
  const i = $a();
  return e === "none" ? /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "sidebar",
      className: v(
        "tw:flex tw:h-full tw:w-(--sidebar-width) tw:flex-col tw:bg-sidebar tw:text-sidebar-foreground",
        r
      ),
      ...n,
      children: a
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
        /* @__PURE__ */ o(
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
        /* @__PURE__ */ o(
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
            children: /* @__PURE__ */ o(
              "div",
              {
                "data-sidebar": "sidebar",
                "data-slot": "sidebar-inner",
                className: "tw:flex tw:size-full tw:flex-col tw:bg-sidebar tw:group-data-[variant=floating]:rounded-lg tw:group-data-[variant=floating]:shadow-sm tw:group-data-[variant=floating]:ring-1 tw:group-data-[variant=floating]:ring-sidebar-border",
                children: a
              }
            )
          }
        )
      ]
    }
  );
}
function Fh({ className: t, onClick: e, ...r }) {
  const { toggleSidebar: a, side: n } = $a();
  return /* @__PURE__ */ p(
    J,
    {
      "data-sidebar": "trigger",
      "data-slot": "sidebar-trigger",
      variant: "ghost",
      size: "icon-sm",
      className: v(t),
      onClick: (i) => {
        e == null || e(i), a();
      },
      ...r,
      children: [
        n === "primary" ? /* @__PURE__ */ o(Yc, {}) : /* @__PURE__ */ o(Zc, {}),
        /* @__PURE__ */ o("span", { className: "tw:sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
}
function Uh({ className: t, ...e }) {
  const { toggleSidebar: r } = $a();
  return /* @__PURE__ */ o(
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
function Lu({ className: t, ...e }) {
  return /* @__PURE__ */ o(
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
function Kh({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    Eo,
    {
      "data-slot": "sidebar-input",
      "data-sidebar": "input",
      className: v("tw:h-8 tw:w-full tw:bg-background tw:shadow-none", t),
      ...e
    }
  );
}
function Hh({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "sidebar-header",
      "data-sidebar": "header",
      className: v("tw:flex tw:flex-col tw:gap-2 tw:p-2", t),
      ...e
    }
  );
}
function Gh({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "sidebar-footer",
      "data-sidebar": "footer",
      className: v("tw:flex tw:flex-col tw:gap-2 tw:p-2", t),
      ...e
    }
  );
}
function qh({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    Gr,
    {
      "data-slot": "sidebar-separator",
      "data-sidebar": "separator",
      className: v("tw:mx-2 tw:w-auto tw:bg-sidebar-border", t),
      ...e
    }
  );
}
function Bu({ className: t, ...e }) {
  return /* @__PURE__ */ o(
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
function Mn({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "sidebar-group",
      "data-sidebar": "group",
      className: v("tw:relative tw:flex tw:w-full tw:min-w-0 tw:flex-col tw:p-2", t),
      ...e
    }
  );
}
function In({
  className: t,
  asChild: e = !1,
  ...r
}) {
  const a = e ? Qr.Root : "div";
  return /* @__PURE__ */ o(
    a,
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
function Wh({
  className: t,
  asChild: e = !1,
  ...r
}) {
  const a = e ? Qr.Root : "button";
  return /* @__PURE__ */ o(
    a,
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
function Pn({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "sidebar-group-content",
      "data-sidebar": "group-content",
      className: v("tw:w-full tw:text-sm", t),
      ...e
    }
  );
}
function ju({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "ul",
    {
      "data-slot": "sidebar-menu",
      "data-sidebar": "menu",
      className: v("tw:flex tw:w-full tw:min-w-0 tw:flex-col tw:gap-0", t),
      ...e
    }
  );
}
function Fu({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "li",
    {
      "data-slot": "sidebar-menu-item",
      "data-sidebar": "menu-item",
      className: v("tw:group/menu-item tw:relative", t),
      ...e
    }
  );
}
const Uu = $o(
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
function Ku({
  asChild: t = !1,
  isActive: e = !1,
  variant: r = "default",
  size: a = "default",
  tooltip: n,
  className: i,
  ...s
}) {
  const c = t ? Qr.Root : "button", { state: d } = $a(), l = /* @__PURE__ */ o(
    c,
    {
      "data-slot": "sidebar-menu-button",
      "data-sidebar": "menu-button",
      "data-size": a,
      "data-active": e,
      className: v(Uu({ variant: r, size: a }), i),
      ...s
    }
  );
  return n ? /* @__PURE__ */ p(vt, { children: [
    /* @__PURE__ */ o(bt, { asChild: !0, children: l }),
    /* @__PURE__ */ o(
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
function Yh({
  className: t,
  asChild: e = !1,
  showOnHover: r = !1,
  ...a
}) {
  const n = e ? Qr.Root : "button";
  return /* @__PURE__ */ o(
    n,
    {
      "data-slot": "sidebar-menu-action",
      "data-sidebar": "menu-action",
      className: v(
        "tw:absolute tw:top-1.5 tw:end-1 tw:flex tw:aspect-square tw:w-5 tw:items-center tw:justify-center tw:rounded-md tw:p-0 tw:text-sidebar-foreground tw:ring-sidebar-ring tw:outline-hidden tw:transition-transform tw:group-data-[collapsible=icon]:hidden tw:peer-hover/menu-button:text-sidebar-accent-foreground tw:peer-data-[size=default]/menu-button:top-1.5 tw:peer-data-[size=lg]/menu-button:top-2.5 tw:peer-data-[size=sm]/menu-button:top-1 tw:after:absolute tw:after:-inset-2 tw:hover:bg-sidebar-accent tw:hover:text-sidebar-accent-foreground tw:focus-visible:ring-2 tw:md:after:hidden tw:[&>svg]:size-4 tw:[&>svg]:shrink-0",
        r && "tw:group-focus-within/menu-item:opacity-100 tw:group-hover/menu-item:opacity-100 tw:peer-data-active/menu-button:text-sidebar-accent-foreground tw:aria-expanded:opacity-100 tw:md:opacity-0",
        t
      ),
      ...a
    }
  );
}
function Zh({ className: t, ...e }) {
  return /* @__PURE__ */ o(
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
function Xh({
  className: t,
  showIcon: e = !1,
  ...r
}) {
  const [a] = Ct.useState(() => `${Math.floor(Math.random() * 40) + 50}%`), n = { "--skeleton-width": a };
  return /* @__PURE__ */ p(
    "div",
    {
      "data-slot": "sidebar-menu-skeleton",
      "data-sidebar": "menu-skeleton",
      className: v("tw:flex tw:h-8 tw:items-center tw:gap-2 tw:rounded-md tw:px-2", t),
      ...r,
      children: [
        e && /* @__PURE__ */ o(pr, { className: "tw:size-4 tw:rounded-md", "data-sidebar": "menu-skeleton-icon" }),
        /* @__PURE__ */ o(
          pr,
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
function Jh({ className: t, ...e }) {
  return /* @__PURE__ */ o(
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
function Qh({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "li",
    {
      "data-slot": "sidebar-menu-sub-item",
      "data-sidebar": "menu-sub-item",
      className: v("tw:group/menu-sub-item tw:relative", t),
      ...e
    }
  );
}
function tg({
  asChild: t = !1,
  size: e = "md",
  isActive: r = !1,
  className: a,
  ...n
}) {
  const i = t ? Qr.Root : "a";
  return /* @__PURE__ */ o(
    i,
    {
      "data-slot": "sidebar-menu-sub-button",
      "data-sidebar": "menu-sub-button",
      "data-size": e,
      "data-active": r,
      className: v(
        "tw:flex tw:h-7 tw:min-w-0 tw:-translate-x-px tw:rtl:translate-x-px tw:items-center tw:gap-2 tw:overflow-hidden tw:rounded-md tw:px-2 tw:text-sidebar-foreground tw:ring-sidebar-ring tw:outline-hidden tw:group-data-[collapsible=icon]:hidden tw:hover:bg-sidebar-accent tw:hover:text-sidebar-accent-foreground tw:focus-visible:ring-2 tw:active:bg-sidebar-accent tw:active:text-sidebar-accent-foreground tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:aria-disabled:pointer-events-none tw:aria-disabled:opacity-50 tw:data-[size=md]:text-sm tw:data-[size=sm]:text-xs tw:data-active:bg-sidebar-accent tw:data-active:text-sidebar-accent-foreground tw:[&>span:last-child]:truncate tw:[&>svg]:size-4 tw:[&>svg]:shrink-0 tw:[&>svg]:text-sidebar-accent-foreground",
        a
      ),
      ...n
    }
  );
}
function Hu({
  id: t,
  extensionLabels: e,
  projectInfo: r,
  handleSelectSidebarItem: a,
  selectedSidebarItem: n,
  extensionsSidebarGroupLabel: i,
  projectsSidebarGroupLabel: s,
  buttonPlaceholderText: c,
  searchPlaceholderText: d,
  noResultsText: l,
  className: w
}) {
  const u = B(
    (g, k) => {
      a(g, k);
    },
    [a]
  ), h = B(
    (g) => {
      const k = r.find((y) => y.projectId === g);
      return k ? k.projectName : g;
    },
    [r]
  ), f = I(
    () => r.map((g) => ({
      id: g.projectId,
      shortName: g.projectName,
      fullName: g.projectFullName
    })),
    [r]
  ), _ = I(() => {
    const g = {
      buttonPlaceholder: c,
      ariaLabel: s
    };
    return d && (g.searchPlaceholder = d), l && (g.commandEmptyMessage = l), g;
  }, [c, s, d, l]), b = B(
    (g) => !n.projectId && g === n.label,
    [n]
  );
  return /* @__PURE__ */ o(
    Vu,
    {
      id: t,
      collapsible: "none",
      variant: "inset",
      className: v("tw:w-96 tw:gap-2 tw:overflow-y-auto", w),
      children: /* @__PURE__ */ p(Bu, { children: [
        /* @__PURE__ */ p(Mn, { children: [
          /* @__PURE__ */ o(In, { className: "tw:text-sm", children: i }),
          /* @__PURE__ */ o(Pn, { children: /* @__PURE__ */ o(ju, { children: Object.entries(e).map(([g, k]) => /* @__PURE__ */ o(Fu, { children: /* @__PURE__ */ o(
            Ku,
            {
              onClick: () => u(g),
              isActive: b(g),
              children: /* @__PURE__ */ o("span", { className: "tw:pl-3", children: k })
            }
          ) }, g)) }) })
        ] }),
        /* @__PURE__ */ p(Mn, { children: [
          /* @__PURE__ */ o(In, { className: "tw:text-sm", children: s }),
          /* @__PURE__ */ o(Pn, { className: "tw:pl-3", children: /* @__PURE__ */ p(
            "div",
            {
              className: v(
                "tw:flex tw:w-full tw:items-center tw:gap-2 tw:rounded-md tw:px-2 tw:py-1",
                {
                  "tw:bg-sidebar-accent tw:text-sidebar-accent-foreground": n == null ? void 0 : n.projectId
                }
              ),
              children: [
                /* @__PURE__ */ o(Tc, { className: "tw:h-4 tw:w-4 tw:shrink-0" }),
                /* @__PURE__ */ o(
                  Vs,
                  {
                    mode: "project",
                    projects: f,
                    openTabs: [],
                    selection: { projectId: (n == null ? void 0 : n.projectId) ?? "" },
                    onChangeSelection: ({ projectId: g }) => {
                      if (!g) return;
                      const k = h(g);
                      u(k, g);
                    },
                    buttonVariant: "ghost",
                    buttonClassName: "tw:h-8 tw:w-full tw:flex-1 tw:justify-start tw:font-normal",
                    localizedStrings: _,
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
function eg({
  id: t,
  children: e,
  searchValue: r,
  onSearch: a,
  className: n,
  // Everything else on this type comes from `SettingsSidebarProps`, so forward it wholesale: a
  // prop added to the sidebar reaches it without a matching edit here. `id` is destructured out
  // because it belongs to the SidebarProvider below, not to the sidebar.
  ...i
}) {
  return /* @__PURE__ */ p("div", { className: "tw:box-border tw:flex tw:h-full tw:flex-col", children: [
    /* @__PURE__ */ o("div", { className: "tw:box-border tw:flex tw:items-center tw:justify-center tw:py-4", children: /* @__PURE__ */ o(
      Hn,
      {
        className: "tw:w-9/12",
        value: r,
        onSearch: a,
        placeholder: "Search app settings, extension settings, and project settings"
      }
    ) }),
    /* @__PURE__ */ p(
      Au,
      {
        id: t,
        className: "tw:h-full tw:flex-1 tw:gap-4 tw:overflow-auto tw:border-t",
        children: [
          /* @__PURE__ */ o(
            Hu,
            {
              className: v("tw:w-1/2 tw:min-w-[140px] tw:max-w-[220px] tw:border-e", n),
              ...i
            }
          ),
          /* @__PURE__ */ o(Lu, { className: "tw:min-w-[215px]", children: e })
        ]
      }
    )
  ] });
}
const Le = "scrBook", Gu = "scrRef", Qe = "source", qu = "details", Wu = "Scripture Reference", Yu = "Scripture Book", ds = "Type", Zu = "Details";
function Xu(t, e) {
  const r = e ?? !1;
  return [
    {
      accessorFn: (a) => `${a.start.book} ${a.start.chapterNum}:${a.start.verseNum}`,
      id: Le,
      header: (t == null ? void 0 : t.scriptureReferenceColumnName) ?? Wu,
      cell: (a) => {
        const n = a.row.original;
        return a.row.getIsGrouped() ? Nt.bookIdToEnglishName(n.start.book) : a.row.groupingColumnId === Le ? Oe(n.start) : void 0;
      },
      getGroupingValue: (a) => Nt.bookIdToNumber(a.start.book),
      sortingFn: (a, n) => Na(a.original.start, n.original.start),
      enableGrouping: !0
    },
    {
      accessorFn: (a) => Oe(a.start),
      id: Gu,
      header: void 0,
      cell: (a) => {
        const n = a.row.original;
        return a.row.getIsGrouped() ? void 0 : Oe(n.start);
      },
      sortingFn: (a, n) => Na(a.original.start, n.original.start),
      enableGrouping: !1
    },
    {
      accessorFn: (a) => a.source.displayName,
      id: Qe,
      header: r ? (t == null ? void 0 : t.typeColumnName) ?? ds : void 0,
      cell: (a) => r || a.row.getIsGrouped() ? a.getValue() : void 0,
      getGroupingValue: (a) => a.source.id,
      sortingFn: (a, n) => a.original.source.displayName.localeCompare(n.original.source.displayName),
      enableGrouping: !0
    },
    {
      accessorFn: (a) => a.detail,
      id: qu,
      header: (t == null ? void 0 : t.detailsColumnName) ?? Zu,
      cell: (a) => a.getValue(),
      enableGrouping: !1
    }
  ];
}
const Ju = (t) => {
  if (!("offset" in t.start))
    throw new Error("No offset available in range start");
  if (t.end && !("offset" in t.end))
    throw new Error("No offset available in range end");
  const { offset: e } = t.start;
  let r = 0;
  return t.end && ({ offset: r } = t.end), !t.end || Na(t.start, t.end) === 0 ? `${Fa(t.start)}+${e}` : `${Fa(t.start)}+${e}-${Fa(t.end)}+${r}`;
}, $n = (t) => `${Ju({ start: t.start, end: t.end })} ${t.source.displayName} ${t.detail}`;
function rg({
  sources: t,
  showColumnHeaders: e = !1,
  showSourceColumn: r = !1,
  scriptureReferenceColumnName: a,
  scriptureBookGroupName: n,
  typeColumnName: i,
  detailsColumnName: s,
  onRowSelected: c,
  id: d
}) {
  const [l, w] = E([]), [u, h] = E([{ id: Le, desc: !1 }]), [f, _] = E({}), b = I(
    () => t.flatMap((R) => R.data.map((O) => ({
      ...O,
      source: R.source
    }))),
    [t]
  ), g = I(
    () => Xu(
      {
        scriptureReferenceColumnName: a,
        typeColumnName: i,
        detailsColumnName: s
      },
      r
    ),
    [a, i, s, r]
  );
  Y(() => {
    l.includes(Qe) ? h([
      { id: Qe, desc: !1 },
      { id: Le, desc: !1 }
    ]) : h([{ id: Le, desc: !1 }]);
  }, [l]);
  const k = gi({
    data: b,
    columns: g,
    state: {
      grouping: l,
      sorting: u,
      rowSelection: f
    },
    onGroupingChange: w,
    onSortingChange: h,
    onRowSelectionChange: _,
    getExpandedRowModel: td(),
    getGroupedRowModel: Ql(),
    getCoreRowModel: mi(),
    getSortedRowModel: fi(),
    getRowId: $n,
    autoResetExpanded: !1,
    enableMultiRowSelection: !1,
    enableSubRowSelection: !1
  });
  Y(() => {
    if (c) {
      const R = k.getSelectedRowModel().rowsById, O = Object.keys(R);
      if (O.length === 1) {
        const K = b.find((q) => $n(q) === O[0]) || void 0;
        K && c(K);
      }
    }
  }, [f, b, c, k]);
  const y = n ?? Yu, S = i ?? ds, P = [
    { label: "No Grouping", value: [] },
    { label: `Group by ${y}`, value: [Le] },
    { label: `Group by ${S}`, value: [Qe] },
    {
      label: `Group by ${y} and ${S}`,
      value: [Le, Qe]
    },
    {
      label: `Group by ${S} and ${y}`,
      value: [Qe, Le]
    }
  ], j = (R) => {
    w(JSON.parse(R));
  }, z = (R, O) => {
    !R.getIsGrouped() && !R.getIsSelected() && R.getToggleSelectedHandler()(O);
  }, D = (R, O) => R.getIsGrouped() ? "" : v("banded-row", O % 2 === 0 ? "even" : "odd"), M = (R, O, K) => {
    if (!((R == null ? void 0 : R.length) === 0 || O.depth < K.column.getGroupedIndex())) {
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
          /* @__PURE__ */ o(_r, { className: "tw:mb-1 tw:mt-2", children: /* @__PURE__ */ o(kr, {}) }),
          /* @__PURE__ */ o(Nr, { position: "item-aligned", children: /* @__PURE__ */ o(nu, { children: P.map((R) => /* @__PURE__ */ o(oe, { value: JSON.stringify(R.value), children: R.label }, R.label)) }) })
        ]
      }
    ),
    /* @__PURE__ */ p(_o, { className: "tw:relative tw:flex tw:flex-col tw:overflow-y-auto tw:p-0", children: [
      e && /* @__PURE__ */ o(No, { children: k.getHeaderGroups().map((R) => /* @__PURE__ */ o(Fe, { children: R.headers.filter((O) => O.column.columnDef.header).map((O) => (
        /* For sticky column headers to work, we probably need to change the default definition of the shadcn Table component. See https://github.com/shadcn-ui/ui/issues/1151 */
        /* @__PURE__ */ o(_a, { colSpan: O.colSpan, className: "tw:sticky top-0", children: O.isPlaceholder ? void 0 : /* @__PURE__ */ p("div", { children: [
          O.column.getCanGroup() ? /* @__PURE__ */ o(
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
          Fr(O.column.columnDef.header, O.getContext())
        ] }) }, O.id)
      )) }, R.id)) }),
      /* @__PURE__ */ o(Co, { children: k.getRowModel().rows.map((R, O) => {
        const K = ne();
        return /* @__PURE__ */ o(
          Fe,
          {
            "data-state": R.getIsSelected() ? "selected" : "",
            className: v(D(R, O)),
            onClick: (q) => z(R, q),
            children: R.getVisibleCells().map((q) => {
              if (!(q.getIsPlaceholder() || q.column.columnDef.enableGrouping && !q.getIsGrouped() && (q.column.columnDef.id !== Qe || !r)))
                return /* @__PURE__ */ o(
                  hr,
                  {
                    className: v(
                      q.column.columnDef.id,
                      "tw:p-[1px]",
                      M(l, R, q)
                    ),
                    children: q.getIsGrouped() ? /* @__PURE__ */ p(
                      J,
                      {
                        variant: "link",
                        onClick: R.getToggleExpandedHandler(),
                        type: "button",
                        children: [
                          R.getIsExpanded() && /* @__PURE__ */ o(er, {}),
                          !R.getIsExpanded() && (K === "ltr" ? /* @__PURE__ */ o(Sc, {}) : /* @__PURE__ */ o(Rc, {})),
                          " ",
                          Fr(q.column.columnDef.cell, q.getContext()),
                          " (",
                          R.subRows.length,
                          ")"
                        ]
                      }
                    ) : Fr(q.column.columnDef.cell, q.getContext())
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
function Qu({
  availableBookInfo: t,
  selectedBookIds: e,
  onChangeSelectedBookIds: r,
  localizedStrings: a,
  localizedBookNames: n,
  disabledSectionExplanations: i
}) {
  const s = a["%webView_book_selector_books_selected%"], c = a["%webView_book_selector_select_books%"], d = a["%webView_book_selector_search_books%"], l = a["%webView_book_selector_select_all%"], w = a["%webView_book_selector_clear_all%"], u = a["%webView_book_selector_no_book_found%"], { otLong: h, ntLong: f, dcLong: _, extraLong: b } = {
    otLong: a == null ? void 0 : a["%scripture_section_ot_long%"],
    ntLong: a == null ? void 0 : a["%scripture_section_nt_long%"],
    dcLong: a == null ? void 0 : a["%scripture_section_dc_long%"],
    extraLong: a == null ? void 0 : a["%scripture_section_extra_long%"]
  }, [g, k] = E(!1), [y, S] = E(""), P = H(void 0), j = H(!1), z = I(
    () => Gn(t),
    [t]
  ), D = I(() => {
    if (!y.trim()) {
      const N = {
        [ht.OT]: [],
        [ht.NT]: [],
        [ht.DC]: [],
        [ht.Extra]: []
      };
      return z.forEach((C) => {
        const L = pa(C);
        N[L].push(C);
      }), N;
    }
    const x = z.filter(
      (N) => bo(N, y, n)
    ), W = {
      [ht.OT]: [],
      [ht.NT]: [],
      [ht.DC]: [],
      [ht.Extra]: []
    };
    return x.forEach((N) => {
      const C = pa(N);
      W[C].push(N);
    }), W;
  }, [z, y, n]), M = B(
    (x, W = !1) => {
      if (!W || !P.current) {
        r(
          e.includes(x) ? e.filter((rt) => rt !== x) : [...e, x]
        ), P.current = x;
        return;
      }
      const N = z.findIndex((rt) => rt === P.current), C = z.findIndex((rt) => rt === x);
      if (N === -1 || C === -1) return;
      const [L, $] = [
        Math.min(N, C),
        Math.max(N, C)
      ], U = z.slice(L, $ + 1).map((rt) => rt);
      r(
        e.includes(x) ? e.filter((rt) => !U.includes(rt)) : [.../* @__PURE__ */ new Set([...e, ...U])]
      );
    },
    [e, r, z]
  ), R = (x) => {
    M(x, j.current), j.current = !1;
  }, O = (x, W) => {
    x.preventDefault(), M(W, x.shiftKey);
  }, K = () => {
    r(z.map((x) => x));
  }, q = () => {
    r([]);
  }, Z = I(
    () => Object.values(ht).filter(
      (x) => (i == null ? void 0 : i[x]) !== void 0 && To(z, x).length === 0
    ).map((x) => ({ section: x, explanation: i == null ? void 0 : i[x] })),
    [i, z]
  );
  return /* @__PURE__ */ p(
    Cr,
    {
      open: g,
      onOpenChange: (x) => {
        k(x), x || S("");
      },
      children: [
        /* @__PURE__ */ o(Er, { asChild: !0, children: /* @__PURE__ */ p(
          J,
          {
            variant: "outline",
            role: "combobox",
            "aria-expanded": g,
            className: "tw:max-w-64 tw:justify-between",
            children: [
              e.length > 0 ? `${s}: ${e.length}` : c,
              /* @__PURE__ */ o(Oc, { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
            ]
          }
        ) }),
        /* @__PURE__ */ o(
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
                  /* @__PURE__ */ o(
                    xo,
                    {
                      className: "tw:shrink-0",
                      placeholder: d,
                      value: y,
                      onValueChange: S,
                      spaceSelectsHighlightedItem: !0
                    }
                  ),
                  /* @__PURE__ */ p("div", { className: "tw:flex tw:shrink-0 tw:justify-between tw:border-b tw:p-2", children: [
                    /* @__PURE__ */ o(
                      J,
                      {
                        variant: "ghost",
                        size: "sm",
                        onClick: K,
                        disabled: z.length === 0,
                        children: l
                      }
                    ),
                    /* @__PURE__ */ o(J, { variant: "ghost", size: "sm", onClick: q, children: w })
                  ] }),
                  /* @__PURE__ */ p(Rr, { className: "tw:max-h-72 tw:min-h-0 tw:flex-1", children: [
                    /* @__PURE__ */ o(yo, { children: u }),
                    Object.values(ht).filter((x) => D[x].length > 0).map((x, W) => {
                      const N = D[x];
                      return /* @__PURE__ */ p(rr, { children: [
                        W > 0 && /* @__PURE__ */ o(Ls, { alwaysRender: !0 }),
                        /* @__PURE__ */ o(
                          mr,
                          {
                            heading: Bn(x, h, f, _, b),
                            children: N.map((C) => /* @__PURE__ */ o(
                              vi,
                              {
                                bookId: C,
                                isSelected: e.includes(C),
                                onSelect: () => R(C),
                                onMouseDown: (L) => O(L, C),
                                section: pa(C),
                                showCheck: !0,
                                localizedBookNames: n,
                                commandValue: wo(C, n),
                                className: "tw:flex tw:items-center"
                              },
                              C
                            ))
                          }
                        )
                      ] }, x);
                    })
                  ] }),
                  Z.length > 0 && /* @__PURE__ */ o("div", { className: "tw:shrink-0 tw:border-t tw:p-2", children: Z.map(({ section: x, explanation: W }) => /* @__PURE__ */ o("p", { className: "tw:text-xs tw:text-muted-foreground", children: W }, x)) })
                ]
              }
            )
          }
        )
      ]
    }
  );
}
function tp({
  disabled: t,
  tooltipText: e,
  children: r,
  className: a
}) {
  return /* @__PURE__ */ o(Qt, { children: /* @__PURE__ */ p(vt, { children: [
    /* @__PURE__ */ o(bt, { asChild: !0, children: /* @__PURE__ */ o(
      Yr,
      {
        className: a,
        isDisabled: t,
        disabledExplanation: e,
        children: r
      }
    ) }),
    t && /* @__PURE__ */ o(xt, { children: /* @__PURE__ */ o("p", { className: "tw:max-w-xs tw:whitespace-pre-line", children: e }) })
  ] }) });
}
function ep({
  section: t,
  availableBookIds: e,
  selectedBookIds: r,
  onToggle: a,
  localizedStrings: n,
  disabledExplanation: i
}) {
  const s = To(e, t).length === 0, c = n["%scripture_section_ot_short%"], d = n["%scripture_section_nt_short%"], l = n["%scripture_section_dc_short%"], w = n["%scripture_section_extra_short%"], u = /* @__PURE__ */ o(
    J,
    {
      variant: "outline",
      size: "sm",
      onClick: () => a(t),
      className: v(
        qn(e, t, r) && !s && "tw:bg-primary tw:text-primary-foreground tw:hover:bg-primary/70 tw:hover:text-primary-foreground"
      ),
      disabled: s,
      children: Bs(
        t,
        c,
        d,
        l,
        w
      )
    }
  );
  return i ? /* @__PURE__ */ o(
    tp,
    {
      className: "tw:flex",
      disabled: s,
      tooltipText: i,
      children: u
    }
  ) : u;
}
const An = 5, ro = 6;
function rp({
  availableBookInfo: t,
  selectedBookIds: e,
  onChangeSelectedBookIds: r,
  localizedStrings: a,
  localizedBookNames: n,
  disabledSectionExplanations: i
}) {
  const s = a["%webView_book_selector_more%"], c = I(
    () => Gn(t),
    [t]
  ), d = B(
    (l) => {
      const w = To(c, l).map((u) => u);
      r(
        qn(c, l, e) ? e.filter((u) => !w.includes(u)) : [.../* @__PURE__ */ new Set([...e, ...w])]
      );
    },
    [e, r, c]
  );
  return /* @__PURE__ */ p("div", { className: "tw:space-y-2", children: [
    /* @__PURE__ */ o("div", { className: "tw:flex tw:flex-wrap tw:gap-2", children: Object.values(ht).map((l) => /* @__PURE__ */ o(
      ep,
      {
        section: l,
        availableBookIds: c,
        selectedBookIds: e,
        onToggle: d,
        localizedStrings: a,
        disabledExplanation: i == null ? void 0 : i[l]
      },
      l
    )) }),
    /* @__PURE__ */ o(
      Qu,
      {
        availableBookInfo: t,
        selectedBookIds: e,
        onChangeSelectedBookIds: r,
        localizedStrings: a,
        localizedBookNames: n,
        disabledSectionExplanations: i
      }
    ),
    e.length > 0 && /* @__PURE__ */ p("div", { className: "tw:mt-2 tw:flex tw:flex-wrap tw:gap-1", children: [
      e.slice(
        0,
        e.length === ro ? ro : An
      ).map((l) => /* @__PURE__ */ o(Hr, { className: "tw:hover:bg-secondary", variant: "secondary", children: Re(l, n) }, l)),
      e.length > ro && /* @__PURE__ */ o(
        Hr,
        {
          className: "tw:hover:bg-secondary",
          variant: "secondary",
          children: `+${e.length - An} ${s}`
        }
      )
    ] })
  ] });
}
const ap = Object.freeze([
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
]), ag = Object.freeze([
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
  ...ap
]), _t = (t, e) => t[e] ?? e, op = Object.freeze([" ", "-"]);
function og({
  scope: t,
  availableScopes: e,
  onScopeChange: r,
  availableBookInfo: a,
  selectedBookIds: n,
  onSelectedBookIdsChange: i,
  localizedStrings: s,
  localizedBookNames: c,
  disabledSectionExplanations: d,
  disabledScopeExplanations: l,
  id: w,
  variant: u = "radio",
  rangeStart: h,
  rangeEnd: f,
  onRangeStartChange: _,
  onRangeEndChange: b,
  currentScrRef: g,
  onCurrentScrRefChange: k,
  bookChapterControlLocalizedStrings: y,
  getEndVerse: S,
  hideLabel: P = !1,
  buttonClassName: j
}) {
  const z = _t(
    s,
    "%webView_scope_selector_selected_text%"
  ), D = _t(s, "%webView_scope_selector_verse%"), M = _t(s, "%webView_scope_selector_chapter%"), R = _t(s, "%webView_scope_selector_book%"), O = _t(
    s,
    "%webView_scope_selector_current_verse%"
  ), K = _t(
    s,
    "%webView_scope_selector_current_chapter%"
  ), q = _t(s, "%webView_scope_selector_current_book%"), Z = _t(s, "%webView_scope_selector_choose_books%"), x = _t(s, "%webView_scope_selector_scope%"), W = _t(s, "%webView_scope_selector_select_books%"), N = _t(s, "%webView_scope_selector_range%"), C = _t(s, "%webView_scope_selector_select_range%"), L = _t(s, "%webView_scope_selector_range_start%"), $ = _t(s, "%webView_scope_selector_range_end%"), U = _t(s, "%webView_scope_selector_ok%"), rt = _t(s, "%webView_scope_selector_cancel%"), ot = _t(s, "%webView_scope_selector_navigate%"), G = (V) => {
    if (!g) return;
    const X = g.book.toUpperCase();
    switch (V) {
      case "verse":
        return Oe(g, "id");
      case "chapter":
        return `${X} ${g.chapterNum}`;
      case "book":
        return X;
      default:
        return;
    }
  }, st = [
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
      label: M,
      dropdownLabel: K,
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
    { value: "selectedBooks", label: Z, id: "scope-selected" },
    { value: "range", label: N, id: "scope-range" }
  ], dt = (V, X, ft = !1) => /* @__PURE__ */ p(Dt, { children: [
    V,
    X && !ft && /* @__PURE__ */ p("span", { className: "tw:text-muted-foreground", children: [
      ": ",
      X
    ] })
  ] }), ct = e ? st.filter((V) => e.includes(V.value)) : st, Tt = g ?? Ua, St = h ?? Tt, Bt = f ?? Tt, qe = () => {
  }, se = H(null), jt = H(null), ut = H(!1), Ft = H(null), xe = H(!1), [ye, ce] = E(void 0), lt = H(!1), le = H(!1), Ie = H(null), We = B((V) => {
    if (V) {
      ce("start"), lt.current = !1;
      return;
    }
    ce((X) => X === "start" ? void 0 : X), lt.current && (lt.current = !1, requestAnimationFrame(() => {
      var ft;
      const X = (ft = se.current) == null ? void 0 : ft.querySelector("button");
      X == null || X.click();
    }));
  }, []), ke = B((V) => {
    if (V) {
      ce("end"), le.current = !1;
      return;
    }
    ce((X) => X === "end" ? void 0 : X);
  }, []), de = B(
    (V) => {
      _ == null || _(V), b == null || b(V), lt.current = !0;
    },
    [_, b]
  ), Ye = B(
    (V) => {
      b == null || b(V), le.current = !0;
    },
    [b]
  ), pt = B(
    (V) => {
      r(V), V === "selectedBooks" && n.length === 0 && (g != null && g.book) && i([g.book]);
    },
    [r, n, g, i]
  ), _e = ct.find((V) => V.value === t), Pe = () => t === "selectedBooks" && n.length > 0 ? n.map((V) => V.toUpperCase()).join(", ") : t === "range" ? Fc(St, Bt, {
    optionOrLocalizedBookName: "id",
    endRefOptionOrLocalizedBookName: "id",
    repeatBookName: !0
  }) : _e ? dt(_e.label, _e.scrRefSuffix) : t, A = ct.filter(
    (V) => V.value !== "selectedBooks" && V.value !== "range"
  ), it = ct.find((V) => V.value === "selectedBooks"), Ne = ct.find((V) => V.value === "range"), [Mt, It] = E(!1), [$e, qt] = E(void 0), [Wt, Ce] = E(void 0), [Ee, Pt] = E(void 0), [ee, Rt] = E(void 0), [yt, Ae] = E([]), we = u === "dropdown" && $e === "selectedBooks", ue = /* @__PURE__ */ o(
    rp,
    {
      availableBookInfo: a,
      selectedBookIds: we ? yt : n,
      onChangeSelectedBookIds: we ? Ae : i,
      localizedStrings: s,
      localizedBookNames: c,
      disabledSectionExplanations: d
    }
  ), Ze = ye === "end", Xe = ye === "start", Te = "tw:text-muted-foreground", pe = u === "dropdown" && $e === "range", sr = pe ? Pt : de, Ir = pe ? Rt : b ? Ye : qe, Ve = /* @__PURE__ */ p("div", { className: "tw:flex tw:flex-wrap tw:items-end tw:gap-4", children: [
    /* @__PURE__ */ p("div", { className: "tw:grid tw:gap-2", children: [
      /* @__PURE__ */ o(gt, { htmlFor: "scope-range-start", className: v(Ze && Te), children: L }),
      /* @__PURE__ */ o(
        Ha,
        {
          id: "scope-range-start",
          scrRef: pe ? Ee ?? St : St,
          handleSubmit: sr,
          localizedBookNames: c,
          localizedStrings: y,
          getEndVerse: S,
          submitKeys: op,
          onOpenChange: We,
          className: v(Ze && Te),
          modal: !0
        }
      )
    ] }),
    /* @__PURE__ */ p("div", { ref: se, className: "tw:grid tw:gap-2", children: [
      /* @__PURE__ */ o(gt, { htmlFor: "scope-range-end", className: v(Xe && Te), children: $ }),
      /* @__PURE__ */ o(
        Ha,
        {
          id: "scope-range-end",
          scrRef: pe ? ee ?? Bt : Bt,
          handleSubmit: Ir,
          localizedBookNames: c,
          localizedStrings: y,
          getEndVerse: S,
          disableReferencesUpTo: pe ? Ee ?? St : St,
          onOpenChange: ke,
          onCloseAutoFocus: (V) => {
            var X;
            le.current && (le.current = !1, V.preventDefault(), (X = Ie.current) == null || X.focus());
          },
          className: v(Xe && Te),
          modal: !0,
          align: "start"
        }
      )
    ] })
  ] }), T = H({}), Q = B(
    (V) => (X) => {
      T.current[V] = X;
    },
    []
  ), et = H(null);
  Y(() => {
    if (!Mt) return;
    let V = 0;
    const X = requestAnimationFrame(() => {
      V = requestAnimationFrame(() => {
        var ft;
        (ft = T.current[t]) == null || ft.focus();
      });
    });
    return () => {
      cancelAnimationFrame(X), V && cancelAnimationFrame(V);
    };
  }, [Mt, t]);
  const [Ot, Pr] = E(null), [Se, cr] = E(null), [lr, Aa] = E(null), ta = 200, [Va, ea] = E(!1);
  Y(() => {
    if (!lr || typeof ResizeObserver > "u") return;
    const V = new ResizeObserver(([X]) => {
      ea(X.contentRect.width < ta);
    });
    return V.observe(lr), () => V.disconnect();
  }, [lr]);
  const ra = B(
    (V) => {
      Ce(V), Pt(St), Rt(Bt), Ae(n), It(!1), qt(V);
    },
    [St, Bt, n]
  ), aa = B(() => {
    Wt !== void 0 && (Wt === "range" ? (Ee && (_ == null || _(Ee)), ee && (b == null || b(ee))) : Wt === "selectedBooks" && i(yt), pt(Wt), qt(void 0), Ce(void 0));
  }, [
    Wt,
    Ee,
    ee,
    yt,
    _,
    b,
    i,
    pt
  ]), dr = B((V) => {
    V || (qt(void 0), Ce(void 0));
  }, []), oa = B((V) => {
    var X;
    V.preventDefault(), (X = et.current) == null || X.focus();
  }, []), na = (V) => t === V ? /* @__PURE__ */ o("span", { className: "tw:absolute tw:flex tw:h-3.5 tw:w-3.5 tw:items-center tw:justify-center tw:ltr:left-2 tw:rtl:right-2", children: /* @__PURE__ */ o(br, { className: "tw:h-4 tw:w-4" }) }) : void 0;
  return /* @__PURE__ */ p("div", { id: w, className: "tw:grid tw:gap-4", children: [
    /* @__PURE__ */ p("div", { className: "tw:grid tw:gap-2", children: [
      !P && /* @__PURE__ */ o(gt, { children: x }),
      u === "dropdown" ? /* @__PURE__ */ p(or, { open: Mt, onOpenChange: It, children: [
        /* @__PURE__ */ o(Ke, { asChild: !0, children: /* @__PURE__ */ p(
          J,
          {
            ref: et,
            variant: "outline",
            role: "combobox",
            className: v(
              "tw:w-full tw:justify-between tw:overflow-hidden tw:font-normal",
              j
            ),
            children: [
              /* @__PURE__ */ o("span", { className: "tw:min-w-0 tw:flex-1 tw:truncate tw:text-start", children: Pe() }),
              /* @__PURE__ */ o(er, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
            ]
          }
        ) }),
        /* @__PURE__ */ o(
          nr,
          {
            ref: Aa,
            className: "tw:w-[var(--radix-dropdown-menu-trigger-width)] tw:min-w-[12rem]",
            align: "start",
            children: /* @__PURE__ */ p(Ba, { container: lr, children: [
              A.map(({ value: V, label: X, dropdownLabel: ft, scrRefSuffix: Zt, id: re }) => {
                const m = l == null ? void 0 : l[V];
                return /* @__PURE__ */ p(
                  je,
                  {
                    ref: Q(V),
                    disabled: !!m,
                    className: "tw:relative tw:ps-8 data-[highlighted]:tw:bg-accent data-[highlighted]:tw:text-accent-foreground",
                    onSelect: () => pt(V),
                    "data-selected": t === V ? "true" : void 0,
                    children: [
                      t === V && /* @__PURE__ */ o("span", { className: "tw:absolute tw:flex tw:h-3.5 tw:w-3.5 tw:items-center tw:justify-center tw:ltr:left-2 tw:rtl:right-2", children: /* @__PURE__ */ o(br, { className: "tw:h-4 tw:w-4" }) }),
                      /* @__PURE__ */ p("span", { className: "tw:flex tw:min-w-0 tw:flex-col tw:gap-0.5", children: [
                        /* @__PURE__ */ o("span", { className: "tw:flex tw:items-center tw:gap-1.5", children: dt(ft ?? X, Zt, Va) }),
                        m && /* @__PURE__ */ o("span", { className: "tw:text-xs tw:whitespace-normal tw:text-foreground", children: m })
                      ] })
                    ]
                  },
                  re
                );
              }),
              (it || Ne) && /* @__PURE__ */ o(vr, {}),
              it && /* @__PURE__ */ p(
                je,
                {
                  ref: Q("selectedBooks"),
                  className: v(
                    "tw:relative tw:ps-8",
                    "data-[highlighted]:tw:bg-accent data-[highlighted]:tw:text-accent-foreground"
                  ),
                  onSelect: () => ra("selectedBooks"),
                  "data-selected": t === "selectedBooks" ? "true" : void 0,
                  children: [
                    na("selectedBooks"),
                    `${it.label}…`
                  ]
                }
              ),
              Ne && /* @__PURE__ */ p(
                je,
                {
                  ref: Q("range"),
                  className: v(
                    "tw:relative tw:ps-8",
                    "data-[highlighted]:tw:bg-accent data-[highlighted]:tw:text-accent-foreground"
                  ),
                  onSelect: () => ra("range"),
                  "data-selected": t === "range" ? "true" : void 0,
                  children: [
                    na("range"),
                    `${Ne.label}…`
                  ]
                }
              ),
              k && /* @__PURE__ */ p(Dt, { children: [
                /* @__PURE__ */ o(vr, {}),
                /* @__PURE__ */ o(Zr, { className: "tw:px-2 tw:py-1.5 tw:text-xs tw:font-medium tw:text-muted-foreground", children: ot }),
                /* @__PURE__ */ o(
                  je,
                  {
                    ref: Ft,
                    className: "tw:p-0",
                    onSelect: (V) => {
                      var X, ft;
                      if (V.preventDefault(), ut.current) {
                        ut.current = !1;
                        return;
                      }
                      xe.current || (ft = (X = jt.current) == null ? void 0 : X.querySelector("button")) == null || ft.click();
                    },
                    children: /* @__PURE__ */ o(
                      "div",
                      {
                        ref: jt,
                        className: "tw:w-full tw:px-1 tw:pb-1",
                        onPointerDownCapture: (V) => {
                          const X = V.target instanceof HTMLElement ? V.target : void 0;
                          X != null && X.closest("button") && (ut.current = !0, requestAnimationFrame(() => {
                            ut.current = !1;
                          }));
                        },
                        children: /* @__PURE__ */ o(
                          Ha,
                          {
                            id: "scope-navigate",
                            scrRef: g ?? Ua,
                            handleSubmit: k,
                            localizedBookNames: c,
                            localizedStrings: y,
                            getEndVerse: S,
                            triggerVariant: "ghost",
                            onOpenChange: (V) => {
                              xe.current = V;
                            },
                            onCloseAutoFocus: (V) => {
                              var X;
                              V.preventDefault(), (X = Ft.current) == null || X.focus();
                            },
                            modal: !0,
                            className: "tw:w-full tw:min-w-0 tw:max-w-none tw:justify-between tw:px-2 tw:font-normal",
                            triggerContent: /* @__PURE__ */ p(Dt, { children: [
                              /* @__PURE__ */ o("span", { className: "tw:min-w-0 tw:flex-1 tw:truncate tw:text-start", children: Oe(g ?? Ua, "id") }),
                              /* @__PURE__ */ o(er, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
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
      ] }) : /* @__PURE__ */ o(
        ko,
        {
          value: t,
          onValueChange: pt,
          className: "tw:flex tw:flex-col tw:space-y-1",
          children: ct.map(({ value: V, label: X, scrRefSuffix: ft, id: Zt }) => {
            const re = l == null ? void 0 : l[V];
            return /* @__PURE__ */ p("div", { className: "tw:flex tw:flex-col tw:gap-0.5", children: [
              /* @__PURE__ */ p("div", { className: "tw:flex tw:items-center", children: [
                /* @__PURE__ */ o(
                  ka,
                  {
                    className: "tw:me-2",
                    value: V,
                    id: Zt,
                    disabled: !!re,
                    "aria-describedby": re ? `${Zt}-explanation` : void 0
                  }
                ),
                /* @__PURE__ */ o(gt, { htmlFor: Zt, children: dt(X, ft) })
              ] }),
              re && // Indented to clear the radio so it reads as belonging to this row's label.
              /* @__PURE__ */ o(
                "span",
                {
                  id: `${Zt}-explanation`,
                  className: "tw:ms-6 tw:text-xs tw:whitespace-normal tw:text-muted-foreground",
                  children: re
                }
              )
            ] }, Zt);
          })
        }
      )
    ] }),
    u === "radio" && t === "selectedBooks" && /* @__PURE__ */ p("div", { className: "tw:grid tw:gap-2", children: [
      /* @__PURE__ */ o(gt, { children: W }),
      ue
    ] }),
    u === "radio" && t === "range" && Ve,
    u === "dropdown" && it && /* @__PURE__ */ o(ao, { open: $e === "selectedBooks", onOpenChange: dr, children: /* @__PURE__ */ o(
      oo,
      {
        ref: cr,
        onCloseAutoFocus: oa,
        onEscapeKeyDown: (V) => {
          Se != null && Se.querySelector('[data-state="open"]') && V.preventDefault();
        },
        children: /* @__PURE__ */ p(Ba, { container: Se, children: [
          /* @__PURE__ */ o(no, { className: "tw:pe-8", children: /* @__PURE__ */ o(io, { children: Z }) }),
          ue,
          /* @__PURE__ */ p(Xo, { children: [
            /* @__PURE__ */ o(J, { variant: "outline", onClick: () => dr(!1), children: rt }),
            /* @__PURE__ */ o(J, { onClick: aa, children: U })
          ] })
        ] })
      }
    ) }),
    u === "dropdown" && Ne && /* @__PURE__ */ o(ao, { open: $e === "range", onOpenChange: dr, children: /* @__PURE__ */ o(
      oo,
      {
        ref: Pr,
        onCloseAutoFocus: oa,
        onEscapeKeyDown: (V) => {
          Ot != null && Ot.querySelector('[data-state="open"]') && V.preventDefault();
        },
        children: /* @__PURE__ */ p(Ba, { container: Ot, children: [
          /* @__PURE__ */ o(no, { className: "tw:pe-8", children: /* @__PURE__ */ o(io, { children: C }) }),
          Ve,
          /* @__PURE__ */ p(Xo, { children: [
            /* @__PURE__ */ o(J, { variant: "outline", onClick: () => dr(!1), children: rt }),
            /* @__PURE__ */ o(J, { ref: Ie, onClick: aa, children: U })
          ] })
        ] })
      }
    ) })
  ] });
}
function ng({
  availableScrollGroupIds: t,
  scrollGroupId: e,
  onChangeScrollGroupId: r,
  localizedStrings: a = {},
  size: n = "sm",
  className: i,
  id: s,
  disabled: c
}) {
  const d = {
    ...ja,
    ...Object.fromEntries(
      Object.entries(a).map(
        ([w, u]) => [
          w,
          w === u && w in ja ? ja[w] : u
        ]
      )
    )
  }, l = ne();
  return /* @__PURE__ */ p(
    yr,
    {
      value: `${e}`,
      onValueChange: (w) => r(
        w === "undefined" ? void 0 : parseInt(w, 10)
      ),
      disabled: c,
      children: [
        /* @__PURE__ */ o(_r, { size: n, className: v("pr-twp tw:w-auto", i), children: /* @__PURE__ */ o(
          kr,
          {
            placeholder: d[rn(e)] ?? e
          }
        ) }),
        /* @__PURE__ */ o(
          Nr,
          {
            id: s,
            align: l === "rtl" ? "end" : "start",
            style: { zIndex: Me },
            children: t.map((w) => /* @__PURE__ */ o(oe, { value: `${w}`, children: d[rn(w)] }, `${w}`))
          }
        )
      ]
    }
  );
}
function ig({ children: t }) {
  return /* @__PURE__ */ o("div", { className: "pr-twp tw:grid", children: t });
}
function sg({
  primary: t,
  secondary: e,
  children: r,
  isLoading: a = !1,
  loadingMessage: n
}) {
  return /* @__PURE__ */ p("div", { className: "tw:flex tw:items-center tw:justify-between tw:space-x-4 tw:py-2", children: [
    /* @__PURE__ */ p("div", { children: [
      /* @__PURE__ */ o("p", { className: "tw:text-sm tw:font-medium tw:leading-none", children: t }),
      /* @__PURE__ */ o("p", { className: "tw:whitespace-normal tw:break-words tw:text-sm tw:text-muted-foreground", children: e })
    ] }),
    a ? /* @__PURE__ */ o("p", { className: "tw:text-sm tw:text-muted-foreground", children: n }) : /* @__PURE__ */ o("div", { children: r })
  ] });
}
function cg({
  primary: t,
  secondary: e,
  includeSeparator: r = !1
}) {
  return /* @__PURE__ */ p("div", { className: "tw:space-y-4 tw:py-2", children: [
    /* @__PURE__ */ p("div", { children: [
      /* @__PURE__ */ o("h3", { className: "tw:text-lg tw:font-medium", children: t }),
      /* @__PURE__ */ o("p", { className: "tw:text-sm tw:text-muted-foreground", children: e })
    ] }),
    r ? /* @__PURE__ */ o(Gr, {}) : ""
  ] });
}
function Ue({ icon: t, iconName: e, menuLabel: r, leading: a, leadingSlot: n }) {
  const i = a ? "tw:me-2" : "tw:ms-2";
  if (Kn(e)) return /* @__PURE__ */ o(js, { name: e, className: i });
  if (!t && a && n === "icon")
    return /* @__PURE__ */ o(
      "span",
      {
        "aria-hidden": "true",
        "data-slot": "menu-icon-spacer",
        className: v("tw:inline-block tw:w-4 tw:shrink-0", i)
      }
    );
  if (!t) return;
  const s = `${a ? "Leading" : "Trailing"} icon for ${r}`;
  return a ? /* @__PURE__ */ o(
    "span",
    {
      "data-slot": "menu-icon-image-box",
      className: v(
        "tw:inline-flex tw:w-4 tw:shrink-0 tw:items-center tw:justify-center",
        i
      ),
      children: /* @__PURE__ */ o("img", { className: "tw:max-h-4 tw:max-w-4", src: t, alt: s })
    }
  ) : /* @__PURE__ */ o("img", { className: v("tw:max-h-4 tw:max-w-4", i), src: t, alt: s });
}
const np = (t) => /* @__PURE__ */ o(vr, {}, `separator-${t}`), ws = (t, e, r) => t.map(({ groupKey: a, items: n }) => ({
  groupKey: a,
  items: n.map(({ item: i, subGroups: s = [] }) => {
    if ("command" in i)
      return /* @__PURE__ */ p(vt, { children: [
        /* @__PURE__ */ o(bt, { asChild: !0, children: /* @__PURE__ */ p(
          je,
          {
            onClick: () => {
              e(i);
            },
            children: [
              /* @__PURE__ */ o(
                Ue,
                {
                  iconName: i.iconNameBefore,
                  icon: i.iconPathBefore,
                  menuLabel: i.label,
                  leading: !0,
                  leadingSlot: r
                }
              ),
              i.label,
              /* @__PURE__ */ o(
                Ue,
                {
                  iconName: i.iconNameAfter,
                  icon: i.iconPathAfter,
                  menuLabel: i.label
                }
              ),
              i.shortcut && /* @__PURE__ */ o(Ks, { className: "tw:ps-4", children: /* @__PURE__ */ o(Wn, { hint: i.shortcut }) })
            ]
          },
          `dropdown-menu-item-${i.label}-${i.command}`
        ) }),
        i.tooltip && /* @__PURE__ */ o(xt, { children: i.tooltip })
      ] }, `tooltip-${i.label}-${i.command}`);
    const c = /* @__PURE__ */ p(Hs, { children: [
      /* @__PURE__ */ o(
        Ue,
        {
          iconName: i.iconNameBefore,
          menuLabel: i.label,
          leading: !0,
          leadingSlot: r
        }
      ),
      i.label,
      /* @__PURE__ */ o(Ue, { iconName: i.iconNameAfter, menuLabel: i.label })
    ] });
    return /* @__PURE__ */ p(Gs, { children: [
      i.tooltip ? /* @__PURE__ */ p(vt, { children: [
        /* @__PURE__ */ o(bt, { asChild: !0, children: c }),
        /* @__PURE__ */ o(xt, { children: i.tooltip })
      ] }) : c,
      /* @__PURE__ */ o(qs, { children: /* @__PURE__ */ o(Ws, { children: Ho(
        ws(
          s,
          e,
          Pa(
            s.flatMap((d) => d.items.map((l) => l.item))
          )
        ),
        np
      ) }) })
    ] }, `dropdown-menu-sub-${i.label}-${i.id}`);
  })
}));
function vo({
  onSelectMenuItem: t,
  menuData: e,
  tabLabel: r,
  icon: a,
  className: n,
  showSectionHeadings: i = !1,
  variant: s,
  buttonVariant: c = "ghost",
  id: d
}) {
  const l = Ca(), w = I(() => cs(e), [e]), u = Iu(e), h = i && u.length > 1, f = new Map(
    w.columns.map(({ columnKey: y, groups: S }) => [y, S])
  ), _ = (y) => f.get(y) ?? [], b = Pa(
    u.flatMap(
      ({ columnKey: y }) => _(y).flatMap((S) => S.items.map((P) => P.item))
    )
  );
  yi();
  const g = H(null), k = () => Us(g.current ?? void 0);
  return /* @__PURE__ */ p(or, { variant: s, children: [
    /* @__PURE__ */ o(Ke, { "aria-label": r, className: n, asChild: !0, id: d, children: /* @__PURE__ */ o(
      J,
      {
        ref: g,
        variant: c,
        size: "icon",
        className: Fs,
        onKeyDown: k,
        onBlur: k,
        children: a ?? /* @__PURE__ */ o(zc, {})
      }
    ) }),
    /* @__PURE__ */ o(
      nr,
      {
        align: "start",
        style: { zIndex: Me },
        onCloseAutoFocus: () => {
          Ln() === "pointer" && Ys(g.current ?? void 0);
        },
        children: u.map(({ columnKey: y, label: S, isHeaderHidden: P }, j) => {
          const z = `${l}-${y}`;
          return /* @__PURE__ */ p(rr, { children: [
            /* @__PURE__ */ p(Un, { "aria-labelledby": h ? z : void 0, children: [
              h && // A section shown without its heading keeps it for assistive technology only
              /* @__PURE__ */ o(
                Zr,
                {
                  id: z,
                  className: P ? "tw:sr-only" : void 0,
                  children: S
                }
              ),
              /* @__PURE__ */ o(Qt, { children: ws(
                _(y),
                t,
                b
              ).flatMap((D) => D.items) })
            ] }),
            j < u.length - 1 && /* @__PURE__ */ o(vr, {})
          ] }, y);
        })
      }
    )
  ] });
}
const ip = 8;
function sp(t, e, r) {
  const a = e.findIndex((s) => t >= s), n = a === -1 ? e.length : a;
  if (r === void 0 || n >= r) return n;
  const i = e.findIndex(
    (s) => t >= s + ip
  );
  return i === -1 ? r : Math.min(r, i);
}
function us(t, e) {
  const [r, a] = E(0), n = H(void 0);
  return Ht(() => {
    if (!t || typeof ResizeObserver > "u") return;
    const i = () => {
      const { width: c } = t.getBoundingClientRect(), d = n.current;
      n.current = c;
      const l = d === void 0 || d === 0;
      a(
        (w) => sp(c, e, l ? void 0 : w)
      );
    };
    i();
    const s = new ResizeObserver(i);
    return s.observe(t), () => s.disconnect();
  }, [t, e]), r;
}
const cp = Object.freeze([520, 420, 340]), ps = Ct.forwardRef(
  ({ id: t, className: e, children: r }, a) => {
    const [n, i] = E(void 0), s = H(a);
    s.current = a;
    const c = B((u) => {
      i(u ?? void 0);
      const h = s.current;
      typeof h == "function" ? h(u) : h && (h.current = u);
    }, []), d = us(n, cp), l = xi() ?? d, w = l >= Ur.MINIMUM;
    return /* @__PURE__ */ o(Da.Provider, { value: l, children: /* @__PURE__ */ o(
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
function lg({
  onSelectProjectMenuItem: t,
  onSelectViewInfoMenuItem: e,
  projectMenuData: r,
  tabViewMenuData: a,
  id: n,
  className: i,
  startAreaChildren: s,
  centerAreaChildren: c,
  endAreaChildren: d,
  menuButtonIcon: l
}) {
  return /* @__PURE__ */ p(ps, { className: `tw:w-full tw:border-b ${i}`, id: n, children: [
    r && /* @__PURE__ */ o(
      vo,
      {
        onSelectMenuItem: t,
        menuData: r,
        tabLabel: "Project",
        icon: l ?? /* @__PURE__ */ o(Dc, {}),
        buttonVariant: "ghost",
        showSectionHeadings: !0
      }
    ),
    s && /* @__PURE__ */ o("div", { className: "tw:flex tw:min-w-0 tw:shrink tw:grow-[10] tw:flex-row tw:flex-nowrap tw:items-start tw:gap-x-1 tw:gap-y-2 tw:overflow-clip", children: s }),
    c && /* @__PURE__ */ o("div", { className: "tw:flex tw:shrink tw:grow-[1] tw:basis-0 tw:flex-row tw:flex-nowrap tw:items-start tw:justify-center tw:gap-x-1 tw:gap-y-2 tw:overflow-clip tw:@sm:basis-auto", children: c }),
    /* @__PURE__ */ p("div", { className: "tw:flex tw:shrink-0 tw:grow-[1] tw:flex-row-reverse tw:flex-nowrap tw:items-start tw:gap-x-1 tw:gap-y-2 tw:overflow-clip", children: [
      a && /* @__PURE__ */ o(
        vo,
        {
          onSelectMenuItem: e,
          menuData: a,
          tabLabel: "View Info",
          icon: /* @__PURE__ */ o(Mc, {}),
          className: "tw:h-full",
          showSectionHeadings: !0
        }
      ),
      d
    ] })
  ] });
}
function dg({
  onSelectProjectMenuItem: t,
  projectMenuData: e,
  id: r,
  className: a,
  menuButtonIcon: n
}) {
  return /* @__PURE__ */ o(ps, { className: "tw:pointer-events-none", id: r, children: e && /* @__PURE__ */ o(
    vo,
    {
      onSelectMenuItem: t,
      menuData: e,
      tabLabel: "Project",
      icon: n,
      className: `tw:pointer-events-auto tw:shadow-lg ${a}`,
      buttonVariant: "outline",
      showSectionHeadings: !0
    }
  ) });
}
const hs = Ct.forwardRef(({ className: t, ...e }, r) => {
  const a = ne();
  return /* @__PURE__ */ o(
    ie.Root,
    {
      orientation: "vertical",
      ref: r,
      className: v("tw:flex tw:gap-1 tw:rounded-md tw:text-muted-foreground", t),
      ...e,
      dir: a
    }
  );
});
hs.displayName = ie.List.displayName;
const gs = Ct.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ o(
  ie.List,
  {
    ref: r,
    className: v(
      "tw:flex tw:items-center tw:w-[124px] tw:justify-center tw:rounded-md tw:bg-muted tw:p-1 tw:text-muted-foreground",
      t
    ),
    ...e
  }
));
gs.displayName = ie.List.displayName;
const lp = Ct.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ o(
  ie.Trigger,
  {
    ref: r,
    ...e,
    className: v(
      "tw:inline-flex tw:w-[116px] tw:cursor-pointer tw:items-center tw:justify-center tw:break-words tw:rounded-sm tw:border-0 tw:bg-muted tw:px-3 tw:py-1.5 tw:text-sm tw:font-medium tw:text-inherit tw:ring-offset-background tw:transition-all tw:hover:text-foreground tw:focus-visible:outline-hidden tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2 tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:data-[state=active]:bg-background tw:data-[state=active]:text-foreground tw:data-[state=active]:shadow-sm tw:overflow-clip",
      t
    )
  }
)), fs = Ct.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ o(
  ie.Content,
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
fs.displayName = ie.Content.displayName;
function wg({
  tabList: t,
  searchValue: e,
  onSearch: r,
  searchPlaceholder: a,
  headerTitle: n,
  searchClassName: i,
  id: s
}) {
  return /* @__PURE__ */ p("div", { id: s, className: "pr-twp", children: [
    /* @__PURE__ */ p("div", { className: "tw:sticky tw:top-0 tw:space-y-2 tw:pb-2", children: [
      n ? /* @__PURE__ */ o("h1", { children: n }) : "",
      /* @__PURE__ */ o(
        Hn,
        {
          className: i,
          value: e,
          onSearch: r,
          placeholder: a
        }
      )
    ] }),
    /* @__PURE__ */ p(hs, { children: [
      /* @__PURE__ */ o(gs, { children: t.map((c) => /* @__PURE__ */ o(lp, { value: c.value, children: c.value }, c.key)) }),
      t.map((c) => /* @__PURE__ */ o(fs, { value: c.value, children: c.content }, c.key))
    ] })
  ] });
}
function dp({
  className: t,
  // CUSTOM: Added variant prop to allow callers to apply visual style variants to all menu items
  variant: e = "default",
  ...r
}) {
  const a = Ct.useMemo(
    () => ({
      variant: e
    }),
    [e]
  );
  return /* @__PURE__ */ o(Zs.Provider, { value: a, children: /* @__PURE__ */ o(
    ve.Root,
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
function wp({ ...t }) {
  return /* @__PURE__ */ o(ve.Menu, { "data-slot": "menubar-menu", ...t });
}
function up({ ...t }) {
  return /* @__PURE__ */ o(ve.Portal, { "data-slot": "menubar-portal", ...t });
}
function pp({
  className: t,
  ...e
}) {
  const r = So();
  return /* @__PURE__ */ o(
    ve.Trigger,
    {
      "data-slot": "menubar-trigger",
      className: v(
        "tw:flex tw:items-center tw:rounded-sm tw:px-1.5 tw:py-[2px] tw:text-sm tw:font-medium tw:outline-hidden tw:select-none tw:hover:bg-muted tw:aria-expanded:bg-muted",
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation (portal-rendered content needs this)
        "pr-twp",
        // CUSTOM: Apply variant-driven styles from menu context
        Ro({ variant: r.variant, className: t })
      ),
      ...e
    }
  );
}
function hp({
  className: t,
  align: e = "start",
  alignOffset: r = -4,
  sideOffset: a = 8,
  // CUSTOM: Pull `style` out so the shared z-index can be applied under any caller-supplied style
  style: n,
  ...i
}) {
  return /* @__PURE__ */ o(up, { children: /* @__PURE__ */ o(
    ve.Content,
    {
      "data-slot": "menubar-content",
      align: e,
      alignOffset: r,
      sideOffset: a,
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
      style: { zIndex: Me, ...n },
      ...i
    }
  ) });
}
function gp({
  className: t,
  inset: e,
  variant: r = "default",
  ...a
}) {
  const n = So();
  return /* @__PURE__ */ o(
    ve.Item,
    {
      "data-slot": "menubar-item",
      "data-inset": e,
      "data-variant": r,
      className: v(
        "tw:group/menubar-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-[variant=destructive]:text-destructive tw:data-[variant=destructive]:focus:bg-destructive/10 tw:data-[variant=destructive]:focus:text-destructive tw:dark:data-[variant=destructive]:focus:bg-destructive/20 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:data-[variant=destructive]:*:[svg]:text-destructive!",
        // CUSTOM: Apply variant-driven styles from menu context
        Ro({ variant: n.variant, className: t })
      ),
      ...a
    }
  );
}
function fp({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ o(
    ve.Separator,
    {
      "data-slot": "menubar-separator",
      className: v("tw:-mx-1 tw:my-1 tw:h-px tw:bg-border", t),
      ...e
    }
  );
}
function mp({ className: t, ...e }) {
  return /* @__PURE__ */ o(
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
function vp({ ...t }) {
  return /* @__PURE__ */ o(ve.Sub, { "data-slot": "menubar-sub", ...t });
}
function bp({
  className: t,
  inset: e,
  children: r,
  ...a
}) {
  const n = So();
  return /* @__PURE__ */ p(
    ve.SubTrigger,
    {
      "data-slot": "menubar-sub-trigger",
      "data-inset": e,
      className: v(
        "tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-none tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-inset:ps-7 tw:data-open:bg-accent tw:data-open:text-accent-foreground tw:[&_svg:not([class*=size-])]:size-4",
        // CUSTOM: Apply variant-driven styles from menu context
        Ro({ variant: n.variant, className: t })
      ),
      ...a,
      children: [
        r,
        /* @__PURE__ */ o(ei, { className: "tw:ms-auto tw:size-4" })
      ]
    }
  );
}
function xp({
  className: t,
  // CUSTOM: Pull `style` out so the shared z-index can be applied under any caller-supplied style
  style: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    ve.SubContent,
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
      style: { zIndex: Me, ...e },
      ...r
    }
  );
}
const Vr = (t, e) => {
  setTimeout(() => {
    e.forEach((r) => {
      var a;
      (a = t.current) == null || a.dispatchEvent(new KeyboardEvent("keydown", r));
    });
  }, 0);
}, ms = (t) => /* @__PURE__ */ o(fp, {}, `separator-${t}`), vs = (t, e, r) => t.map(({ groupKey: a, items: n }) => ({
  groupKey: a,
  items: n.map(({ item: i, subGroups: s = [] }) => /* @__PURE__ */ p(vt, { children: [
    /* @__PURE__ */ o(bt, { asChild: !0, children: "command" in i ? /* @__PURE__ */ p(
      gp,
      {
        onClick: () => {
          e(i);
        },
        children: [
          /* @__PURE__ */ o(
            Ue,
            {
              iconName: i.iconNameBefore,
              icon: i.iconPathBefore,
              menuLabel: i.label,
              leading: !0,
              leadingSlot: r
            }
          ),
          i.label,
          /* @__PURE__ */ o(
            Ue,
            {
              iconName: i.iconNameAfter,
              icon: i.iconPathAfter,
              menuLabel: i.label
            }
          ),
          i.shortcut && /* @__PURE__ */ o(mp, { className: "tw:ps-4", children: /* @__PURE__ */ o(Wn, { hint: i.shortcut }) })
        ]
      },
      `menubar-item-${i.label}-${i.command}`
    ) : /* @__PURE__ */ p(vp, { children: [
      /* @__PURE__ */ p(bp, { children: [
        /* @__PURE__ */ o(
          Ue,
          {
            iconName: i.iconNameBefore,
            menuLabel: i.label,
            leading: !0,
            leadingSlot: r
          }
        ),
        i.label,
        /* @__PURE__ */ o(Ue, { iconName: i.iconNameAfter, menuLabel: i.label })
      ] }),
      /* @__PURE__ */ o(xp, { children: Ho(
        vs(
          s,
          e,
          Pa(
            s.flatMap((c) => c.items.map((d) => d.item))
          )
        ),
        ms
      ) })
    ] }, `menubar-sub-${i.label}-${i.id}`) }),
    i.tooltip && /* @__PURE__ */ o(xt, { children: i.tooltip })
  ] }, `tooltip-${i.label}-${"command" in i ? i.command : i.id}`))
}));
function yp({
  menuData: t,
  onSelectMenuItem: e,
  onOpenChange: r,
  variant: a
}) {
  const n = H(void 0), i = H(void 0), s = H(void 0), c = H(void 0), d = H(void 0), l = I(() => cs(t), [t]), w = (u) => {
    switch (u) {
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
  if (rd(["alt", "alt+p", "alt+l", "alt+n", "alt+h"], (u, h) => {
    var b, g, k, y;
    u.preventDefault();
    const f = { key: "Escape", code: "Escape", keyCode: 27, bubbles: !0 }, _ = { key: " ", code: "Space", keyCode: 32, bubbles: !0 };
    switch (h.hotkey) {
      case "alt":
        Vr(i, [f]);
        break;
      case "alt+p":
        (b = i.current) == null || b.focus(), Vr(i, [f, _]);
        break;
      case "alt+l":
        (g = s.current) == null || g.focus(), Vr(s, [f, _]);
        break;
      case "alt+n":
        (k = c.current) == null || k.focus(), Vr(c, [f, _]);
        break;
      case "alt+h":
        (y = d.current) == null || y.focus(), Vr(d, [f, _]);
        break;
    }
  }), Y(() => {
    if (!r || !n.current) return;
    const u = new MutationObserver((_) => {
      _.forEach((b) => {
        if (b.attributeName === "data-state" && b.target instanceof HTMLElement) {
          const g = b.target.getAttribute("data-state");
          r(g === "open");
        }
      });
    });
    return n.current.querySelectorAll("[data-state]").forEach((_) => {
      u.observe(_, { attributes: !0 });
    }), () => u.disconnect();
  }, [r]), !!t)
    return /* @__PURE__ */ o(dp, { ref: n, className: "pr-twp tw:border-0 tw:bg-transparent", variant: a, children: l.columns.map(({ columnKey: u, column: h, groups: f }) => /* @__PURE__ */ p(wp, { children: [
      /* @__PURE__ */ o(pp, { ref: w(u), children: h.label }),
      /* @__PURE__ */ o(
        hp,
        {
          style: { zIndex: Me },
          children: /* @__PURE__ */ o(Qt, { children: Ho(
            vs(
              f,
              e,
              Pa(
                f.flatMap((_) => _.items.map((b) => b.item))
              )
            ),
            ms
          ) })
        }
      )
    ] }, u)) });
}
const kp = Object.freeze([950, 800, 700]);
function ug(t) {
  switch (t) {
    case void 0:
      return;
    case "darwin":
      return "tw:ps-[85px]";
    default:
      return "tw:pe-[calc(138px+1rem)]";
  }
}
function pg({
  menuData: t,
  onOpenChange: e,
  onSelectMenuItem: r,
  className: a,
  id: n,
  children: i,
  appMenuAreaChildren: s,
  configAreaChildren: c,
  shouldUseAsAppDragArea: d,
  menubarVariant: l = "default"
}) {
  const [w, u] = E(void 0), h = B(
    (b) => u(b ?? void 0),
    []
  ), f = us(w, kp), _ = xi() ?? f;
  return /* @__PURE__ */ o(Da.Provider, { value: _, children: /* @__PURE__ */ o(
    "div",
    {
      className: v("tw:border tw:px-4 tw:text-foreground", a),
      style: { position: "relative" },
      id: n,
      children: /* @__PURE__ */ p(
        "div",
        {
          "data-testid": "toolbar-content-row",
          className: "tw:flex tw:h-full tw:w-full tw:justify-between tw:overflow-hidden",
          ref: h,
          style: d ? { WebkitAppRegion: "drag" } : void 0,
          children: [
            /* @__PURE__ */ o("div", { className: "tw:flex tw:shrink-0 tw:grow tw:basis-0", children: /* @__PURE__ */ p(
              "div",
              {
                className: "tw:flex tw:items-center tw:gap-2",
                style: d ? { WebkitAppRegion: "no-drag" } : void 0,
                children: [
                  s,
                  t && /* @__PURE__ */ o(
                    yp,
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
            /* @__PURE__ */ o(
              "div",
              {
                "data-testid": "toolbar-content-area",
                className: "tw:flex tw:min-w-0 tw:shrink tw:items-center tw:gap-2 tw:overflow-clip tw:px-2",
                style: d ? { WebkitAppRegion: "no-drag" } : void 0,
                children: i
              }
            ),
            /* @__PURE__ */ o("div", { className: "tw:flex tw:min-w-0 tw:grow tw:basis-0 tw:justify-end", children: /* @__PURE__ */ o(
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
const _p = (t, e) => t[e] ?? e;
function hg({
  knownUiLanguages: t,
  primaryLanguage: e = "en",
  fallbackLanguages: r = [],
  onLanguagesChange: a,
  onPrimaryLanguageChange: n,
  onFallbackLanguagesChange: i,
  localizedStrings: s,
  className: c,
  id: d,
  disabled: l = !1
}) {
  const w = _p(
    s,
    "%settings_uiLanguageSelector_fallbackLanguages%"
  ), [u, h] = E(!1), f = (b) => {
    n && n(b), a && a([b, ...r.filter((g) => g !== b)]), i && r.find((g) => g === b) && i([...r.filter((g) => g !== b)]), h(!1);
  }, _ = (b, g) => {
    var y, S, P, j, z, D;
    const k = g !== b ? ((S = (y = t[b]) == null ? void 0 : y.uiNames) == null ? void 0 : S[g]) ?? ((j = (P = t[b]) == null ? void 0 : P.uiNames) == null ? void 0 : j.en) : void 0;
    return k ? `${(z = t[b]) == null ? void 0 : z.autonym} (${k})` : (D = t[b]) == null ? void 0 : D.autonym;
  };
  return /* @__PURE__ */ p("div", { id: d, className: v("pr-twp tw:max-w-sm", c), children: [
    /* @__PURE__ */ p(
      yr,
      {
        name: "uiLanguage",
        value: e,
        onValueChange: f,
        open: u,
        onOpenChange: (b) => h(b),
        disabled: l,
        children: [
          /* @__PURE__ */ o(_r, { children: /* @__PURE__ */ o(kr, {}) }),
          /* @__PURE__ */ o(
            Nr,
            {
              style: { zIndex: Me },
              children: Object.keys(t).map((b) => /* @__PURE__ */ o(oe, { value: b, children: _(b, e) }, b))
            }
          )
        ]
      }
    ),
    e !== "en" && /* @__PURE__ */ o("div", { className: "tw:pt-3", children: /* @__PURE__ */ o(gt, { className: "tw:font-normal tw:text-muted-foreground", children: tr(w, {
      fallbackLanguages: (r == null ? void 0 : r.length) > 0 ? r.map((b) => _(b, e)).join(", ") : t.en.autonym
    }) }) })
  ] });
}
const gg = Object.freeze([
  "%firstRun_language_search_placeholder%",
  "%firstRun_language_noResults%",
  "%firstRun_language_selected%"
]);
function bs(t) {
  return t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}
function Np(t, e) {
  if (!e) return t;
  const r = bs(e);
  return t.filter(({ keywords: a }) => a.some((n) => n.includes(r)));
}
function Cp(t) {
  return [...t].sort(([e, r], [a, n]) => e === "en" && a !== "en" ? -1 : a === "en" && e !== "en" ? 1 : r.autonym.localeCompare(n.autonym));
}
function fg({
  languages: t,
  value: e,
  onChange: r,
  localizedStrings: a,
  className: n,
  id: i
}) {
  const [s, c] = E(""), [d, l] = E(), w = H(null), u = H(null), h = H(/* @__PURE__ */ new Map()), [f, _] = E(), b = I(
    () => Cp(Object.entries(t)).map(([z, D]) => ({
      tag: z,
      info: D,
      keywords: [
        D.autonym,
        ...Object.values(D.uiNames ?? {}),
        ...D.otherNames ?? []
      ].map(bs)
    })),
    [t]
  ), g = I(() => Np(b, s), [b, s]), k = I(() => {
    var D;
    const z = (M) => !!M && g.some((R) => R.tag === M);
    return z(d) ? d : z(e) ? e : ((D = g[0]) == null ? void 0 : D.tag) ?? "";
  }, [d, e, g]), y = b.length > 1;
  Ht(() => {
    var z;
    _((z = u.current) == null ? void 0 : z.id);
  }, []), Ht(() => {
    const z = h.current.get(k), D = y ? w.current : void 0;
    D && (z ? D.setAttribute("aria-activedescendant", z.id) : D.removeAttribute("aria-activedescendant")), z && k !== d && z.scrollIntoView({ block: "nearest" });
  }, [k, d, y]);
  const S = a["%firstRun_language_search_placeholder%"] ?? "", P = a["%firstRun_language_noResults%"] ?? "", j = a["%firstRun_language_selected%"] ?? "";
  return /* @__PURE__ */ p(
    Sr,
    {
      id: i,
      className: v("pr-twp", n),
      shouldFilter: !1,
      value: k,
      onValueChange: l,
      children: [
        y && // Plain <input> (not CommandPrimitive.Input) so cmdk cannot update this field after
        // item selection. Arrow-key and Enter events from here bubble to the Command root div
        // where cmdk's keydown handler picks them up for list navigation.
        /* @__PURE__ */ o("div", { "data-slot": "command-input-wrapper", className: "tw:p-1 tw:pb-0", children: /* @__PURE__ */ p(Xs, { className: "tw:h-8! tw:rounded-lg! tw:border-input/30 tw:bg-input/30 tw:shadow-none! tw:*:data-[slot=input-group-addon]:ps-2!", children: [
          /* @__PURE__ */ o(
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
              value: s,
              onChange: (z) => {
                c(z.currentTarget.value), l(void 0);
              },
              className: "tw:w-full tw:text-sm tw:outline-hidden tw:disabled:cursor-not-allowed tw:disabled:opacity-50"
            }
          ),
          /* @__PURE__ */ o(Js, { children: /* @__PURE__ */ o(Xc, { className: "tw:size-4 tw:shrink-0 tw:opacity-50" }) })
        ] }) }),
        /* @__PURE__ */ p(Rr, { ref: u, children: [
          /* @__PURE__ */ o(yo, { children: P }),
          g.map(({ tag: z, info: D }) => {
            const M = z === e;
            return /* @__PURE__ */ p(
              ar,
              {
                ref: (R) => {
                  R ? h.current.set(z, R) : h.current.delete(z);
                },
                value: z,
                "aria-current": M ? "true" : void 0,
                "data-checked": M ? "true" : void 0,
                onSelect: () => r(z),
                children: [
                  /* @__PURE__ */ o("span", { dir: "auto", children: D.autonym }),
                  M && /* @__PURE__ */ o("span", { className: "tw:sr-only", children: j })
                ]
              },
              z
            );
          })
        ] })
      ]
    }
  );
}
function Ep({ item: t, createLabel: e, createComplexLabel: r }) {
  return e ? /* @__PURE__ */ o(gt, { children: e(t) }) : r ? /* @__PURE__ */ o(gt, { children: r(t) }) : /* @__PURE__ */ o(gt, { children: t });
}
function Tp({
  id: t,
  className: e,
  listItems: r,
  selectedListItems: a,
  handleSelectListItem: n,
  createLabel: i,
  createComplexLabel: s
}) {
  return /* @__PURE__ */ o("div", { id: t, className: e, children: r.map((c) => /* @__PURE__ */ p("div", { className: "tw:m-2 tw:flex tw:items-center", children: [
    /* @__PURE__ */ o(
      os,
      {
        className: "tw:me-2 tw:align-middle",
        checked: a.includes(c),
        onCheckedChange: (d) => n(c, d)
      }
    ),
    /* @__PURE__ */ o(
      Ep,
      {
        item: c,
        createLabel: i,
        createComplexLabel: s
      }
    )
  ] }, c)) });
}
const mg = Tp;
function Sp(t, e) {
  const [r, a] = E(t), [n, i] = E(e);
  return t !== r && (a(t), t && i(e)), t ? e : n;
}
function vg({
  open: t,
  anchorRect: e,
  message: r,
  confirmingKeyLabel: a,
  side: n = "bottom",
  align: i = "start",
  showArrow: s = !0
}) {
  const c = t ? an(r, { key: a }).join("") : "", {
    anchorRect: d,
    message: l,
    confirmingKeyLabel: w,
    showArrow: u
  } = Sp(t, { anchorRect: e, message: r, confirmingKeyLabel: a, showArrow: s });
  return /* @__PURE__ */ p(Qt, { children: [
    /* @__PURE__ */ o("span", { role: "status", className: "tw:sr-only", children: c }),
    /* @__PURE__ */ p(vt, { open: t, onOpenChange: () => {
    }, children: [
      /* @__PURE__ */ o(
        bt,
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
      /* @__PURE__ */ o(
        xt,
        {
          side: n,
          align: i,
          showArrow: u,
          arrowPadding: 8,
          className: v(
            // Rely on TooltipContent's default tw:max-w-xs (320px) and normal wrapping: this hint's
            // text is short and usually fits on one line, but locale length varies (e.g. Spanish runs
            // longer than English), so allow it to wrap rather than force tw:whitespace-nowrap, which
            // could clip or overflow on a narrow webview.
            "tw:p-0 tw:has-data-[slot=kbd]:pe-0 tw:bg-background tw:text-destructive tw:border tw:border-destructive"
          ),
          arrowClassName: "tw:bg-[color-mix(in_oklab,var(--destructive)_10%,var(--background))] tw:fill-[color-mix(in_oklab,var(--destructive)_10%,var(--background))] tw:border tw:border-destructive",
          children: /* @__PURE__ */ o("div", { className: "tw:w-full tw:h-full tw:rounded-md tw:bg-destructive/10 tw:px-3 tw:py-1.5", children: an(l, {
            key: /* @__PURE__ */ o(
              Qs,
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
            /* @__PURE__ */ o(rr, { children: h }, `key-${f}`)
          )) })
        }
      )
    ] })
  ] });
}
function bg({
  cardKey: t,
  isSelected: e,
  onSelect: r,
  isDenied: a,
  isHidden: n = !1,
  className: i,
  children: s,
  selectedButtons: c,
  hoverButtons: d,
  dropdownContent: l,
  additionalContent: w,
  accentColor: u,
  showDropdownOnHover: h = !1
}) {
  const f = (g) => {
    if (g.key === "Enter" || g.key === " ") {
      if (g.target !== g.currentTarget) return;
      g.preventDefault(), r();
    }
  }, [_, b] = E(!1);
  return /* @__PURE__ */ p(
    "div",
    {
      hidden: n,
      onClick: r,
      onKeyDown: f,
      onMouseEnter: () => b(!0),
      onFocus: () => b(!0),
      role: "button",
      tabIndex: 0,
      "aria-pressed": e,
      className: v(
        "tw:group tw:relative tw:min-w-36 tw:rounded-xl tw:border tw:shadow-none tw:hover:bg-muted/50",
        { "tw:opacity-50 tw:hover:opacity-100": a && !e },
        { "tw:bg-accent": e },
        { "tw:bg-transparent": !e },
        i
      ),
      children: [
        /* @__PURE__ */ p("div", { className: "tw:flex tw:flex-col tw:gap-2 tw:p-4", children: [
          /* @__PURE__ */ p("div", { className: "tw:flex tw:justify-between tw:overflow-hidden", children: [
            /* @__PURE__ */ o("div", { className: "tw:min-w-0 tw:flex-1", children: s }),
            e && c,
            !e && d && /* @__PURE__ */ o("div", { className: "tw:invisible tw:group-hover:visible", children: d }),
            l && (e || h && _) && /* @__PURE__ */ o(
              "div",
              {
                className: v(
                  !e && h && "tw:invisible tw:group-hover:visible"
                ),
                children: /* @__PURE__ */ p(or, { children: [
                  /* @__PURE__ */ o(Ke, { className: v(u && "tw:me-1"), asChild: !0, children: /* @__PURE__ */ o(
                    J,
                    {
                      className: "tw:m-1 tw:h-6 tw:w-6",
                      variant: "ghost",
                      size: "icon",
                      onClick: (g) => g.stopPropagation(),
                      onFocus: (g) => g.stopPropagation(),
                      children: /* @__PURE__ */ o(Ic, {})
                    }
                  ) }),
                  /* @__PURE__ */ o(nr, { align: "end", children: l })
                ] })
              }
            )
          ] }),
          w && /* @__PURE__ */ o("div", { className: "tw:w-fit tw:min-w-0 tw:max-w-full tw:overflow-hidden", children: w })
        ] }),
        u && /* @__PURE__ */ o(
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
function xg({
  id: t,
  isDisabled: e = !1,
  hasError: r = !1,
  isFullWidth: a = !1,
  helperText: n,
  label: i,
  placeholder: s,
  isRequired: c = !1,
  className: d,
  defaultValue: l,
  value: w,
  onChange: u,
  onFocus: h,
  onBlur: f
}) {
  return /* @__PURE__ */ p("div", { className: v("tw:inline-grid tw:items-center tw:gap-1.5", { "tw:w-full": a }), children: [
    /* @__PURE__ */ o(
      gt,
      {
        htmlFor: t,
        className: v({
          "tw:text-red-600": r,
          "tw:hidden": !i
        }),
        children: `${i}${c ? "*" : ""}`
      }
    ),
    /* @__PURE__ */ o(
      Eo,
      {
        id: t,
        disabled: e,
        placeholder: s,
        required: c,
        className: v(d, { "tw:border-red-600": r }),
        defaultValue: l,
        value: w,
        onChange: u,
        onFocus: h,
        onBlur: f
      }
    ),
    /* @__PURE__ */ o("p", { className: v({ "tw:hidden": !n }), children: n })
  ] });
}
function yg({
  currentStep: t,
  totalSteps: e,
  locale: r,
  completedSteps: a
}) {
  const n = r || "en", i = I(() => {
    const d = new Jn(n);
    return (l) => d.format(l);
  }, [n]), s = Math.min(Math.max(t, 1), e), c = Array.from({ length: e }, (d, l) => l + 1);
  return /* @__PURE__ */ o("div", { className: "tw:flex tw:items-center", "aria-hidden": "true", children: c.map((d) => {
    let l = "upcoming";
    return d === s ? l = "active" : (a ? a.includes(d) : d < s) && (l = "complete"), /* @__PURE__ */ p(rr, { children: [
      d > 1 && /* @__PURE__ */ o("div", { className: "tw:h-px tw:flex-1 tw:bg-border" }),
      /* @__PURE__ */ o(
        "div",
        {
          "data-state": l,
          className: v(
            "tw:flex tw:h-8 tw:w-8 tw:shrink-0 tw:items-center tw:justify-center tw:rounded-full tw:text-sm tw:font-medium",
            l === "active" && "tw:bg-primary tw:text-primary-foreground",
            l === "complete" && "tw:bg-muted tw:text-muted-foreground",
            l === "upcoming" && "tw:border tw:border-input tw:text-muted-foreground"
          ),
          children: l === "complete" ? /* @__PURE__ */ o(br, { className: "tw:h-4 tw:w-4" }) : i(d)
        }
      )
    ] }, d);
  }) });
}
function kg({ ...t }) {
  return /* @__PURE__ */ o(Et.Root, { "data-slot": "context-menu", ...t });
}
function _g({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ o(
    Et.Trigger,
    {
      "data-slot": "context-menu-trigger",
      className: v("tw:select-none", t),
      ...e
    }
  );
}
function Ng({ ...t }) {
  return /* @__PURE__ */ o(Et.Group, { "data-slot": "context-menu-group", ...t });
}
function Cg({ ...t }) {
  return /* @__PURE__ */ o(Et.Portal, { "data-slot": "context-menu-portal", ...t });
}
function Eg({ ...t }) {
  return /* @__PURE__ */ o(Et.Sub, { "data-slot": "context-menu-sub", ...t });
}
function Tg({
  ...t
}) {
  return /* @__PURE__ */ o(Et.RadioGroup, { "data-slot": "context-menu-radio-group", ...t });
}
function Sg({
  className: t,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: e,
  ...r
}) {
  return /* @__PURE__ */ o(Et.Portal, { children: /* @__PURE__ */ o(
    Et.Content,
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
      style: { zIndex: Me, ...e },
      ...r
    }
  ) });
}
function Rg({
  className: t,
  inset: e,
  variant: r = "default",
  ...a
}) {
  return /* @__PURE__ */ o(
    Et.Item,
    {
      "data-slot": "context-menu-item",
      "data-inset": e,
      "data-variant": r,
      className: v(
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
      ...a
    }
  );
}
function Og({
  className: t,
  inset: e,
  children: r,
  ...a
}) {
  return /* @__PURE__ */ p(
    Et.SubTrigger,
    {
      "data-slot": "context-menu-sub-trigger",
      "data-inset": e,
      className: v(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-inset:ps-7 tw:data-open:bg-accent tw:data-open:text-accent-foreground tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      ...a,
      children: [
        r,
        /* @__PURE__ */ o(ei, { className: "tw:ms-auto" })
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
  return /* @__PURE__ */ o(
    Et.SubContent,
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
      style: { zIndex: Me, ...e },
      ...r
    }
  );
}
function Dg({
  className: t,
  children: e,
  checked: r,
  inset: a,
  ...n
}) {
  return /* @__PURE__ */ p(
    Et.CheckboxItem,
    {
      "data-slot": "context-menu-checkbox-item",
      "data-inset": a,
      className: v(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      checked: r,
      ...n,
      children: [
        /* @__PURE__ */ o("span", { className: "tw:pointer-events-none tw:absolute tw:end-2", children: /* @__PURE__ */ o(Et.ItemIndicator, { children: /* @__PURE__ */ o(za, {}) }) }),
        e
      ]
    }
  );
}
function Mg({
  className: t,
  children: e,
  inset: r,
  ...a
}) {
  return /* @__PURE__ */ p(
    Et.RadioItem,
    {
      "data-slot": "context-menu-radio-item",
      "data-inset": r,
      className: v(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      ...a,
      children: [
        /* @__PURE__ */ o("span", { className: "tw:pointer-events-none tw:absolute tw:end-2", children: /* @__PURE__ */ o(Et.ItemIndicator, { children: /* @__PURE__ */ o(za, {}) }) }),
        e
      ]
    }
  );
}
function Ig({
  className: t,
  inset: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    Et.Label,
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
function Pg({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ o(
    Et.Separator,
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
function $g({ className: t, ...e }) {
  return /* @__PURE__ */ o(
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
function Ag({ ...t }) {
  return /* @__PURE__ */ o(Ge.Root, { "data-slot": "drawer", ...t });
}
function Vg({ ...t }) {
  return /* @__PURE__ */ o(Ge.Trigger, { "data-slot": "drawer-trigger", ...t });
}
function Rp({ ...t }) {
  return /* @__PURE__ */ o(Ge.Portal, { "data-slot": "drawer-portal", ...t });
}
function Lg({ ...t }) {
  return /* @__PURE__ */ o(Ge.Close, { "data-slot": "drawer-close", ...t });
}
function Op({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ o(
    Ge.Overlay,
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
function Bg({
  className: t,
  children: e,
  // CUSTOM: Destructure hideDrawerHandle to conditionally render the drag handle
  hideDrawerHandle: r = !1,
  ...a
}) {
  const n = ne();
  return /* @__PURE__ */ p(Rp, { "data-slot": "drawer-portal", children: [
    /* @__PURE__ */ o(Op, {}),
    /* @__PURE__ */ p(
      Ge.Content,
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
        ...a,
        children: [
          !r && /* @__PURE__ */ o("div", { className: "tw:hidden tw:shrink-0 tw:rounded-full tw:bg-muted tw:group-data-[vaul-drawer-direction=bottom]/drawer-content:mx-auto tw:group-data-[vaul-drawer-direction=bottom]/drawer-content:mt-4 tw:group-data-[vaul-drawer-direction=bottom]/drawer-content:h-1.5 tw:group-data-[vaul-drawer-direction=bottom]/drawer-content:w-[100px] tw:group-data-[vaul-drawer-direction=bottom]/drawer-content:block tw:group-data-[vaul-drawer-direction=right]/drawer-content:my-auto tw:group-data-[vaul-drawer-direction=right]/drawer-content:ms-4 tw:group-data-[vaul-drawer-direction=right]/drawer-content:h-[100px] tw:group-data-[vaul-drawer-direction=right]/drawer-content:w-1.5 tw:group-data-[vaul-drawer-direction=right]/drawer-content:block" }),
          /* @__PURE__ */ o("div", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:flex-col", dir: n, children: e }),
          !r && /* @__PURE__ */ o("div", { className: "tw:hidden tw:shrink-0 tw:rounded-full tw:bg-muted tw:group-data-[vaul-drawer-direction=top]/drawer-content:mx-auto tw:group-data-[vaul-drawer-direction=top]/drawer-content:mb-4 tw:group-data-[vaul-drawer-direction=top]/drawer-content:h-1.5 tw:group-data-[vaul-drawer-direction=top]/drawer-content:w-[100px] tw:group-data-[vaul-drawer-direction=top]/drawer-content:block tw:group-data-[vaul-drawer-direction=left]/drawer-content:my-auto tw:group-data-[vaul-drawer-direction=left]/drawer-content:me-4 tw:group-data-[vaul-drawer-direction=left]/drawer-content:h-[100px] tw:group-data-[vaul-drawer-direction=left]/drawer-content:w-1.5 tw:group-data-[vaul-drawer-direction=left]/drawer-content:block" })
        ]
      }
    )
  ] });
}
function jg({ className: t, ...e }) {
  return /* @__PURE__ */ o(
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
function Fg({ className: t, ...e }) {
  return /* @__PURE__ */ o(
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
function Ug({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    Ge.Title,
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
function Kg({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ o(
    Ge.Description,
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
function Hg({
  className: t,
  value: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    ln.Root,
    {
      "data-slot": "progress",
      className: v(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:relative tw:flex tw:h-1 tw:w-full tw:items-center tw:overflow-x-hidden tw:rounded-full tw:bg-muted",
        t
      ),
      ...r,
      children: /* @__PURE__ */ o(
        ln.Indicator,
        {
          "data-slot": "progress-indicator",
          className: "tw:size-full tw:flex-1 tw:bg-primary tw:transition-all",
          style: { transform: `translateX(-${100 - (e || 0)}%)` }
        }
      )
    }
  );
}
function Gg({ ...t }) {
  const { theme: e = "system" } = ad();
  return /* @__PURE__ */ o(
    od,
    {
      theme: e === "light" || e === "dark" || e === "system" ? e : "system",
      className: "tw:toaster tw:group",
      icons: {
        success: /* @__PURE__ */ o(rl, { className: "tw:size-4" }),
        info: /* @__PURE__ */ o(el, { className: "tw:size-4" }),
        warning: /* @__PURE__ */ o(tl, { className: "tw:size-4" }),
        error: /* @__PURE__ */ o(Qc, { className: "tw:size-4" }),
        loading: /* @__PURE__ */ o(Jc, { className: "tw:size-4 tw:animate-spin" })
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
function qg({
  className: t,
  defaultValue: e,
  value: r,
  min: a = 0,
  max: n = 100,
  ...i
}) {
  const s = ne(), c = Ct.useMemo(
    () => Array.isArray(r) ? r : Array.isArray(e) ? e : [a, n],
    [r, e, a, n]
  );
  return /* @__PURE__ */ p(
    ia.Root,
    {
      "data-slot": "slider",
      defaultValue: e,
      value: r,
      min: a,
      max: n,
      className: v(
        "pr-twp tw:relative tw:flex tw:w-full tw:touch-none tw:items-center tw:select-none tw:data-disabled:opacity-50 tw:data-vertical:h-full tw:data-vertical:min-h-40 tw:data-vertical:w-auto tw:data-vertical:flex-col",
        t
      ),
      dir: s,
      ...i,
      children: [
        /* @__PURE__ */ o(
          ia.Track,
          {
            "data-slot": "slider-track",
            className: "tw:relative tw:grow tw:overflow-hidden tw:rounded-full tw:bg-muted tw:data-horizontal:h-1 tw:data-horizontal:w-full tw:data-vertical:h-full tw:data-vertical:w-1",
            children: /* @__PURE__ */ o(
              ia.Range,
              {
                "data-slot": "slider-range",
                className: "tw:absolute tw:bg-primary tw:select-none tw:data-horizontal:h-full tw:data-vertical:w-full"
              }
            )
          }
        ),
        Array.from({ length: c.length }, (d, l) => /* @__PURE__ */ o(
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
function Wg({
  className: t,
  size: e = "default",
  ...r
}) {
  return /* @__PURE__ */ o(
    dn.Root,
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
      children: /* @__PURE__ */ o(
        dn.Thumb,
        {
          "data-slot": "switch-thumb",
          className: "tw:pointer-events-none tw:block tw:rounded-full tw:bg-background tw:ring-0 tw:transition-transform tw:group-data-[size=default]/switch:size-4 tw:group-data-[size=sm]/switch:size-3 tw:group-data-[size=default]/switch:data-checked:translate-x-[calc(100%-2px)] tw:rtl:group-data-[size=default]/switch:data-checked:-translate-x-[calc(100%-2px)] tw:group-data-[size=sm]/switch:data-checked:translate-x-[calc(100%-2px)] tw:rtl:group-data-[size=sm]/switch:data-checked:-translate-x-[calc(100%-2px)] tw:dark:data-checked:bg-primary-foreground tw:group-data-[size=default]/switch:data-unchecked:translate-x-0 tw:rtl:group-data-[size=default]/switch:data-unchecked:-translate-x-0 tw:group-data-[size=sm]/switch:data-unchecked:translate-x-0 tw:rtl:group-data-[size=sm]/switch:data-unchecked:-translate-x-0 tw:dark:data-unchecked:bg-foreground"
        }
      )
    }
  );
}
function Yg({
  className: t,
  orientation: e = "horizontal",
  ...r
}) {
  return /* @__PURE__ */ o(
    ie.Root,
    {
      "data-slot": "tabs",
      "data-orientation": e,
      className: v("tw:group/tabs tw:flex tw:gap-2 tw:data-horizontal:flex-col", t),
      ...r
    }
  );
}
const zp = $o(
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
function Zg({
  className: t,
  variant: e = "default",
  ...r
}) {
  const a = ne();
  return /* @__PURE__ */ o(
    ie.List,
    {
      "data-slot": "tabs-list",
      "data-variant": e,
      className: v("pr-twp", zp({ variant: e }), t),
      dir: a,
      ...r
    }
  );
}
function Xg({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    ie.Trigger,
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
function Jg({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    ie.Content,
    {
      "data-slot": "tabs-content",
      className: v("pr-twp tw:flex-1 tw:text-sm tw:outline-none", t),
      ...e
    }
  );
}
const Qg = (t, e) => {
  Y(() => {
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
}, tf = (t, e) => {
  Y(() => {
    if (!t) return;
    let r = !1, a, n = !1;
    const i = (c) => {
      r || e(c);
    }, s = () => {
      if (n || !a) return;
      n = !0;
      const c = a;
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
        a = await Promise.resolve(t(i)), r && s();
      } catch (c) {
        console.error("useEventAsync: error while subscribing to event", c);
      }
    })(), () => {
      r = !0, s();
    };
  }, [t, e]);
};
function Dp(t) {
  return {
    preserveValue: !0,
    ...t
  };
}
const Mp = (t, e, r = {}) => {
  const a = H(e);
  a.current = e;
  const n = H(r);
  n.current = Dp(n.current);
  const [i, s] = E(() => a.current), [c, d] = E(!0);
  return Y(() => {
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
      l = !1, n.current.preserveValue || s(() => a.current);
    };
  }, [t]), [i, c];
}, ef = (t) => {
  const [e, r] = E(!1), [a, n] = E(!1), [i, s] = E(0), c = H(void 0), d = I(() => {
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
  }, [t, i]);
  Y(() => {
    c.current = d, r(!1), n(!d);
  }, [d]);
  const [l, w] = Mp(d, void 0), u = B(() => {
    c.current && (r(!1), n(!1), s((h) => h + 1));
  }, []);
  return I(
    () => ({ data: l, isLoading: w, hasError: e, hasSettled: a, refetch: u }),
    [l, w, e, a, u]
  );
};
function rf(t) {
  Y(() => {
    let e;
    return t && (e = document.createElement("style"), e.appendChild(document.createTextNode(t)), document.head.appendChild(e)), () => {
      e && document.head.removeChild(e);
    };
  }, [t]);
}
function af(t) {
  const e = I(() => Uc(t).slice().sort().join(" "), [t]);
  return I(() => e ? e.split(" ") : [], [e]);
}
const Ip = () => {
  const [t, e] = E(
    () => document.body.getBoundingClientRect().height > 0
  );
  return Y(() => {
    const r = new IntersectionObserver((a) => {
      const n = a[a.length - 1];
      n && e(n.isIntersecting);
    });
    return r.observe(document.body), () => {
      r.disconnect();
    };
  }, []), t;
};
function of(t, e) {
  const [r, a] = E(!1), n = H(e);
  n.current = e;
  const i = H(t);
  i.current = t;
  const s = B(() => {
    i.current ? n.current() : a(!0);
  }, []);
  return Y(() => {
    !t || !r || (a(!1), n.current());
  }, [t, r]), s;
}
function Pp(t, e, r) {
  return t ? r.dark : e === void 0 ? r.lightDefault : r.lightUnselected;
}
function nf(t, e) {
  const r = Ip();
  return Pp(t, r, e);
}
function sf({ value: t, children: e }) {
  return /* @__PURE__ */ o(bi.Provider, { value: t, children: /* @__PURE__ */ o(Da.Provider, { value: t, children: e }) });
}
const cf = 300;
function $p(t, e = "top") {
  if (!t || typeof document > "u") return;
  const r = document.head || document.querySelector("head"), a = r.querySelector(":first-child"), n = document.createElement("style");
  n.appendChild(document.createTextNode(t)), e === "top" && a ? r.insertBefore(n, a) : r.appendChild(n);
}
$p(`/* By default the editor is too tall for the footnote editor, even while empty, so this makes it
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
@layer properties{@supports (((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))){*,:before,:after,::backdrop{--tw-translate-x:0;--tw-translate-y:0;--tw-translate-z:0;--tw-rotate-x:initial;--tw-rotate-y:initial;--tw-rotate-z:initial;--tw-skew-x:initial;--tw-skew-y:initial;--tw-space-y-reverse:0;--tw-space-x-reverse:0;--tw-divide-x-reverse:0;--tw-border-style:solid;--tw-divide-y-reverse:0;--tw-gradient-position:initial;--tw-gradient-from:#0000;--tw-gradient-via:#0000;--tw-gradient-to:#0000;--tw-gradient-stops:initial;--tw-gradient-via-stops:initial;--tw-gradient-from-position:0%;--tw-gradient-via-position:50%;--tw-gradient-to-position:100%;--tw-leading:initial;--tw-font-weight:initial;--tw-tracking:initial;--tw-ordinal:initial;--tw-slashed-zero:initial;--tw-numeric-figure:initial;--tw-numeric-spacing:initial;--tw-numeric-fraction:initial;--tw-shadow:0 0 #0000;--tw-shadow-color:initial;--tw-shadow-alpha:100%;--tw-inset-shadow:0 0 #0000;--tw-inset-shadow-color:initial;--tw-inset-shadow-alpha:100%;--tw-ring-color:initial;--tw-ring-shadow:0 0 #0000;--tw-inset-ring-color:initial;--tw-inset-ring-shadow:0 0 #0000;--tw-ring-inset:initial;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-offset-shadow:0 0 #0000;--tw-blur:initial;--tw-brightness:initial;--tw-contrast:initial;--tw-grayscale:initial;--tw-hue-rotate:initial;--tw-invert:initial;--tw-opacity:initial;--tw-saturate:initial;--tw-sepia:initial;--tw-drop-shadow:initial;--tw-drop-shadow-color:initial;--tw-drop-shadow-alpha:100%;--tw-drop-shadow-size:initial;--tw-duration:initial;--tw-ease:initial;--tw-content:"";--tw-outline-style:solid;--tw-backdrop-blur:initial;--tw-backdrop-brightness:initial;--tw-backdrop-contrast:initial;--tw-backdrop-grayscale:initial;--tw-backdrop-hue-rotate:initial;--tw-backdrop-invert:initial;--tw-backdrop-opacity:initial;--tw-backdrop-saturate:initial;--tw-backdrop-sepia:initial;--tw-animation-delay:0s;--tw-animation-direction:normal;--tw-animation-duration:initial;--tw-animation-fill-mode:none;--tw-animation-iteration-count:1;--tw-enter-blur:0;--tw-enter-opacity:1;--tw-enter-rotate:0;--tw-enter-scale:1;--tw-enter-translate-x:0;--tw-enter-translate-y:0;--tw-exit-blur:0;--tw-exit-opacity:1;--tw-exit-rotate:0;--tw-exit-scale:1;--tw-exit-translate-x:0;--tw-exit-translate-y:0}}}@layer theme{:root,:host{--tw-font-mono:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;--tw-color-red-100:oklch(93.6% .032 17.717);--tw-color-red-200:oklch(88.5% .062 18.334);--tw-color-red-300:oklch(80.8% .114 19.571);--tw-color-red-400:oklch(70.4% .191 22.216);--tw-color-red-500:oklch(63.7% .237 25.331);--tw-color-red-600:oklch(57.7% .245 27.325);--tw-color-red-700:oklch(50.5% .213 27.518);--tw-color-red-800:oklch(44.4% .177 26.899);--tw-color-orange-100:oklch(95.4% .038 75.164);--tw-color-orange-800:oklch(47% .157 37.304);--tw-color-amber-200:oklch(92.4% .12 95.746);--tw-color-amber-400:oklch(82.8% .189 84.429);--tw-color-amber-500:oklch(76.9% .188 70.08);--tw-color-amber-600:oklch(66.6% .179 58.318);--tw-color-yellow-50:oklch(98.7% .026 102.212);--tw-color-yellow-100:oklch(97.3% .071 103.193);--tw-color-yellow-400:oklch(85.2% .199 91.936);--tw-color-yellow-500:oklch(79.5% .184 86.047);--tw-color-yellow-600:oklch(68.1% .162 75.834);--tw-color-yellow-700:oklch(55.4% .135 66.442);--tw-color-green-50:oklch(98.2% .018 155.826);--tw-color-green-100:oklch(96.2% .044 156.743);--tw-color-green-500:oklch(72.3% .219 149.579);--tw-color-green-600:oklch(62.7% .194 149.214);--tw-color-green-700:oklch(52.7% .154 150.069);--tw-color-green-800:oklch(44.8% .119 151.328);--tw-color-teal-400:oklch(77.7% .152 181.912);--tw-color-teal-500:oklch(70.4% .14 182.503);--tw-color-teal-600:oklch(60% .118 184.704);--tw-color-sky-400:oklch(74.6% .16 232.661);--tw-color-sky-500:oklch(68.5% .169 237.323);--tw-color-sky-600:oklch(58.8% .158 241.966);--tw-color-blue-50:oklch(97% .014 254.604);--tw-color-blue-100:oklch(93.2% .032 255.585);--tw-color-blue-400:oklch(70.7% .165 254.624);--tw-color-blue-500:oklch(62.3% .214 259.815);--tw-color-blue-600:oklch(54.6% .245 262.881);--tw-color-blue-800:oklch(42.4% .199 265.638);--tw-color-indigo-200:oklch(87% .065 274.039);--tw-color-purple-50:oklch(97.7% .014 308.299);--tw-color-purple-200:oklch(90.2% .063 306.703);--tw-color-purple-900:oklch(38.1% .176 304.987);--tw-color-rose-400:oklch(71.2% .194 13.428);--tw-color-rose-500:oklch(64.5% .246 16.439);--tw-color-rose-600:oklch(58.6% .253 17.585);--tw-color-slate-300:oklch(86.9% .022 252.894);--tw-color-slate-400:oklch(70.4% .04 256.788);--tw-color-slate-900:oklch(20.8% .042 265.755);--tw-color-gray-50:oklch(98.5% .002 247.839);--tw-color-gray-100:oklch(96.7% .003 264.542);--tw-color-gray-300:oklch(87.2% .01 258.338);--tw-color-gray-500:oklch(55.1% .027 264.364);--tw-color-gray-600:oklch(44.6% .03 256.802);--tw-color-gray-700:oklch(37.3% .034 259.733);--tw-color-gray-800:oklch(27.8% .033 256.848);--tw-color-zinc-400:oklch(70.5% .015 286.067);--tw-color-neutral-300:oklch(87% 0 0);--tw-color-black:#000;--tw-color-white:#fff;--tw-container-xs:20rem;--tw-container-sm:24rem;--tw-container-md:28rem;--tw-container-lg:32rem;--tw-container-2xl:42rem;--tw-container-3xl:48rem;--tw-container-4xl:56rem;--tw-container-6xl:72rem;--tw-text-xs:.75rem;--tw-text-xs--line-height:calc(1 / .75);--tw-text-sm:.875rem;--tw-text-sm--line-height:calc(1.25 / .875);--tw-text-base:1rem;--tw-text-base--line-height:calc(1.5 / 1);--tw-text-lg:1.125rem;--tw-text-lg--line-height:calc(1.75 / 1.125);--tw-text-xl:1.25rem;--tw-text-xl--line-height:calc(1.75 / 1.25);--tw-text-2xl:1.5rem;--tw-text-2xl--line-height:calc(2 / 1.5);--tw-text-3xl:1.875rem;--tw-text-3xl--line-height:calc(2.25 / 1.875);--tw-text-4xl:2.25rem;--tw-text-4xl--line-height:calc(2.5 / 2.25);--tw-text-5xl:3rem;--tw-text-5xl--line-height:1;--tw-font-weight-normal:400;--tw-font-weight-medium:500;--tw-font-weight-semibold:600;--tw-font-weight-bold:700;--tw-font-weight-extrabold:800;--tw-tracking-tight:-.025em;--tw-tracking-normal:0em;--tw-tracking-wider:.05em;--tw-tracking-widest:.1em;--tw-leading-tight:1.25;--tw-leading-snug:1.375;--tw-leading-relaxed:1.625;--tw-leading-loose:2;--tw-radius-xs:.125rem;--tw-radius-md:calc(var(--radius) * .8);--tw-drop-shadow-sm:0 1px 2px #00000026;--tw-animate-spin:spin 1s linear infinite;--tw-animate-pulse:pulse 2s cubic-bezier(.4, 0, .6, 1) infinite;--tw-blur-xs:4px;--tw-default-transition-duration:.15s;--tw-default-transition-timing-function:cubic-bezier(.4, 0, .2, 1);--tw-default-font-family:"IBM Plex Sans Variable", sans-serif;--tw-default-mono-font-family:var(--tw-font-mono)}}@layer base{.pr-twp,.pr-twp *{border-color:var(--border);outline-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.pr-twp,.pr-twp *{outline-color:color-mix(in oklab, var(--ring) 50%, transparent)}}body.pr-twp{background-color:var(--background);color:var(--foreground)}html.pr-twp{font-family:IBM Plex Sans Variable,sans-serif}:where(.pr-twp,.pr-twp *),:where(.pr-twp,.pr-twp *):after,:where(.pr-twp,.pr-twp *):before,:where(.pr-twp,.pr-twp *) ::backdrop{box-sizing:border-box;border:0 solid;margin:0;padding:0}:where(.pr-twp,.pr-twp *) ::file-selector-button{box-sizing:border-box;border:0 solid;margin:0;padding:0}.pr-twp{-webkit-text-size-adjust:100%;tab-size:4;line-height:1.5;font-family:var(--tw-default-font-family,ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");font-feature-settings:var(--tw-default-font-feature-settings,normal);font-variation-settings:var(--tw-default-font-variation-settings,normal);-webkit-tap-highlight-color:transparent}hr:where(.pr-twp,.pr-twp *){height:0;color:inherit;border-top-width:1px}abbr:where([title]):where(.pr-twp,.pr-twp *){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1:where(.pr-twp,.pr-twp *),h2:where(.pr-twp,.pr-twp *),h3:where(.pr-twp,.pr-twp *),h4:where(.pr-twp,.pr-twp *),h5:where(.pr-twp,.pr-twp *),h6:where(.pr-twp,.pr-twp *){font-size:inherit;font-weight:inherit}a:where(.pr-twp,.pr-twp *){color:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b:where(.pr-twp,.pr-twp *),strong:where(.pr-twp,.pr-twp *){font-weight:bolder}code:where(.pr-twp,.pr-twp *),kbd:where(.pr-twp,.pr-twp *),samp:where(.pr-twp,.pr-twp *),pre:where(.pr-twp,.pr-twp *){font-family:var(--tw-default-mono-font-family,ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace);font-feature-settings:var(--tw-default-mono-font-feature-settings,normal);font-variation-settings:var(--tw-default-mono-font-variation-settings,normal);font-size:1em}small:where(.pr-twp,.pr-twp *){font-size:80%}sub:where(.pr-twp,.pr-twp *),sup:where(.pr-twp,.pr-twp *){vertical-align:baseline;font-size:75%;line-height:0;position:relative}sub:where(.pr-twp,.pr-twp *){bottom:-.25em}sup:where(.pr-twp,.pr-twp *){top:-.5em}table:where(.pr-twp,.pr-twp *){text-indent:0;border-color:inherit;border-collapse:collapse}:-moz-focusring:where(.pr-twp,.pr-twp *){outline:auto}progress:where(.pr-twp,.pr-twp *){vertical-align:baseline}summary:where(.pr-twp,.pr-twp *){display:list-item}ol:where(.pr-twp,.pr-twp *),ul:where(.pr-twp,.pr-twp *),menu:where(.pr-twp,.pr-twp *){list-style:none}img:where(.pr-twp,.pr-twp *),svg:where(.pr-twp,.pr-twp *),video:where(.pr-twp,.pr-twp *),canvas:where(.pr-twp,.pr-twp *),audio:where(.pr-twp,.pr-twp *),iframe:where(.pr-twp,.pr-twp *),embed:where(.pr-twp,.pr-twp *),object:where(.pr-twp,.pr-twp *){vertical-align:middle;display:block}img:where(.pr-twp,.pr-twp *),video:where(.pr-twp,.pr-twp *){max-width:100%;height:auto}button:where(.pr-twp,.pr-twp *),input:where(.pr-twp,.pr-twp *),select:where(.pr-twp,.pr-twp *),optgroup:where(.pr-twp,.pr-twp *),textarea:where(.pr-twp,.pr-twp *){font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(.pr-twp,.pr-twp *) ::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(select:is([multiple],[size])) optgroup:where(.pr-twp,.pr-twp *){font-weight:bolder}:where(select:is([multiple],[size])) optgroup option:where(.pr-twp,.pr-twp *){padding-inline-start:20px}:where(.pr-twp,.pr-twp *) ::file-selector-button{margin-inline-end:4px}:where(.pr-twp,.pr-twp *) ::placeholder{opacity:1}@supports (not ((-webkit-appearance:-apple-pay-button))) or (contain-intrinsic-size:1px){:where(.pr-twp,.pr-twp *) ::placeholder{color:currentColor}@supports (color:color-mix(in lab, red, red)){:where(.pr-twp,.pr-twp *) ::placeholder{color:color-mix(in oklab, currentcolor 50%, transparent)}}}textarea:where(.pr-twp,.pr-twp *){resize:vertical}:where(.pr-twp,.pr-twp *) ::-webkit-search-decoration{-webkit-appearance:none}:where(.pr-twp,.pr-twp *) ::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit{display:inline-flex}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-fields-wrapper{padding:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-year-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-month-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-day-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-hour-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-minute-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-second-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-millisecond-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-meridiem-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-calendar-picker-indicator{line-height:1}:-moz-ui-invalid:where(.pr-twp,.pr-twp *){box-shadow:none}button:where(.pr-twp,.pr-twp *),input:where([type=button],[type=reset],[type=submit]):where(.pr-twp,.pr-twp *){appearance:button}:where(.pr-twp,.pr-twp *) ::file-selector-button{appearance:button}:where(.pr-twp,.pr-twp *) ::-webkit-inner-spin-button{height:auto}:where(.pr-twp,.pr-twp *) ::-webkit-outer-spin-button{height:auto}[hidden]:where(:not([hidden=until-found])):where(.pr-twp,.pr-twp *){display:none!important}}@layer components;@layer utilities{.tw\\:\\@container\\/card-header{container:card-header/inline-size}.tw\\:\\@container\\/search{container:search/inline-size}.tw\\:\\@container\\/toolbar{container:toolbar/inline-size}.tw\\:pointer-events-auto{pointer-events:auto}.tw\\:pointer-events-none{pointer-events:none}.tw\\:invisible{visibility:hidden}.tw\\:sr-only{clip-path:inset(50%);white-space:nowrap;border-width:0;width:1px;height:1px;margin:-1px;padding:0;position:absolute;overflow:hidden}.tw\\:absolute{position:absolute}.tw\\:fixed{position:fixed}.tw\\:relative{position:relative}.tw\\:sticky{position:sticky}.tw\\:inset-0{inset:calc(calc(var(--spacing)) * 0)}.tw\\:inset-x-0{inset-inline:calc(calc(var(--spacing)) * 0)}.tw\\:inset-y-0{inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:inset-s-3{inset-inline-start:calc(calc(var(--spacing)) * 3)}.tw\\:start-1\\.5{inset-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:start-1\\/2{inset-inline-start:50%}.tw\\:end-0{inset-inline-end:calc(calc(var(--spacing)) * 0)}.tw\\:end-1{inset-inline-end:calc(calc(var(--spacing)) * 1)}.tw\\:end-2{inset-inline-end:calc(calc(var(--spacing)) * 2)}.tw\\:end-3{inset-inline-end:calc(calc(var(--spacing)) * 3)}.tw\\:inset-e-0{inset-inline-end:calc(calc(var(--spacing)) * 0)}.tw\\:-top-\\[1px\\]{top:-1px}.tw\\:top-0{top:calc(calc(var(--spacing)) * 0)}.tw\\:top-1{top:calc(calc(var(--spacing)) * 1)}.tw\\:top-1\\.5{top:calc(calc(var(--spacing)) * 1.5)}.tw\\:top-1\\/2{top:50%}.tw\\:top-1\\/3{top:33.3333%}.tw\\:top-2{top:calc(calc(var(--spacing)) * 2)}.tw\\:top-2\\.5{top:calc(calc(var(--spacing)) * 2.5)}.tw\\:top-3\\.5{top:calc(calc(var(--spacing)) * 3.5)}.tw\\:top-\\[-1px\\]{top:-1px}.tw\\:top-full{top:100%}.tw\\:-right-1{right:calc(calc(var(--spacing)) * -1)}.tw\\:right-0{right:calc(calc(var(--spacing)) * 0)}.tw\\:right-1{right:calc(calc(var(--spacing)) * 1)}.tw\\:right-3{right:calc(calc(var(--spacing)) * 3)}.tw\\:bottom-0{bottom:calc(calc(var(--spacing)) * 0)}.tw\\:-left-\\[1px\\]{left:-1px}.tw\\:left-0{left:calc(calc(var(--spacing)) * 0)}.tw\\:left-1\\/2{left:50%}.tw\\:left-2{left:calc(calc(var(--spacing)) * 2)}.tw\\:left-3{left:calc(calc(var(--spacing)) * 3)}.tw\\:isolate{isolation:isolate}.tw\\:z-10{z-index:10}.tw\\:z-20{z-index:20}.tw\\:z-50{z-index:50}.tw\\:order-first{order:-9999}.tw\\:order-last{order:9999}.tw\\:col-span-1{grid-column:span 1/span 1}.tw\\:col-span-2{grid-column:span 2/span 2}.tw\\:col-span-3{grid-column:span 3/span 3}.tw\\:col-start-1{grid-column-start:1}.tw\\:col-start-2{grid-column-start:2}.tw\\:row-span-2{grid-row:span 2/span 2}.tw\\:row-start-1{grid-row-start:1}.tw\\:row-start-2{grid-row-start:2}.tw\\:m-0{margin:calc(calc(var(--spacing)) * 0)}.tw\\:m-1{margin:calc(calc(var(--spacing)) * 1)}.tw\\:m-2{margin:calc(calc(var(--spacing)) * 2)}.tw\\:-mx-1{margin-inline:calc(calc(var(--spacing)) * -1)}.tw\\:-mx-4{margin-inline:calc(calc(var(--spacing)) * -4)}.tw\\:mx-0{margin-inline:calc(calc(var(--spacing)) * 0)}.tw\\:mx-1{margin-inline:calc(calc(var(--spacing)) * 1)}.tw\\:mx-2{margin-inline:calc(calc(var(--spacing)) * 2)}.tw\\:mx-3\\.5{margin-inline:calc(calc(var(--spacing)) * 3.5)}.tw\\:mx-4{margin-inline:calc(calc(var(--spacing)) * 4)}.tw\\:mx-8{margin-inline:calc(calc(var(--spacing)) * 8)}.tw\\:my-1{margin-block:calc(calc(var(--spacing)) * 1)}.tw\\:my-2\\.5{margin-block:calc(calc(var(--spacing)) * 2.5)}.tw\\:my-4{margin-block:calc(calc(var(--spacing)) * 4)}.tw\\:my-auto{margin-block:auto}.tw\\:ms-1{margin-inline-start:calc(calc(var(--spacing)) * 1)}.tw\\:ms-2{margin-inline-start:calc(calc(var(--spacing)) * 2)}.tw\\:ms-5{margin-inline-start:calc(calc(var(--spacing)) * 5)}.tw\\:ms-6{margin-inline-start:calc(calc(var(--spacing)) * 6)}.tw\\:ms-auto{margin-inline-start:auto}.tw\\:me-1{margin-inline-end:calc(calc(var(--spacing)) * 1)}.tw\\:me-2{margin-inline-end:calc(calc(var(--spacing)) * 2)}.tw\\:prose{color:var(--tw-prose-body);max-width:65ch}.tw\\:prose :where(p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em}.tw\\:prose :where([class~=lead]):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-lead);margin-top:1.2em;margin-bottom:1.2em;font-size:1.25em;line-height:1.6}.tw\\:prose :where(a):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-links);font-weight:500;text-decoration:underline}.tw\\:prose :where(strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-bold);font-weight:600}.tw\\:prose :where(a strong):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(blockquote strong):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(thead th strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.tw\\:prose :where(ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em;padding-inline-start:1.625em;list-style-type:decimal}.tw\\:prose :where(ol[type=A]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-alpha}.tw\\:prose :where(ol[type=a]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-alpha}.tw\\:prose :where(ol[type=A s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-alpha}.tw\\:prose :where(ol[type=a s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-alpha}.tw\\:prose :where(ol[type=I]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-roman}.tw\\:prose :where(ol[type=i]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-roman}.tw\\:prose :where(ol[type=I s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-roman}.tw\\:prose :where(ol[type=i s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-roman}.tw\\:prose :where(ol[type="1"]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:decimal}.tw\\:prose :where(ul):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em;padding-inline-start:1.625em;list-style-type:disc}.tw\\:prose :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *))::marker{color:var(--tw-prose-counters);font-weight:400}.tw\\:prose :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *))::marker{color:var(--tw-prose-bullets)}.tw\\:prose :where(dt):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:1.25em;font-weight:600}.tw\\:prose :where(hr):not(:where([class~=not-prose],[class~=not-prose] *)){border-color:var(--tw-prose-hr);border-top-width:1px;margin-top:3em;margin-bottom:3em}.tw\\:prose :where(blockquote):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-quotes);border-inline-start-width:.25rem;border-inline-start-color:var(--tw-prose-quote-borders);quotes:"“""”""‘""’";margin-top:1.6em;margin-bottom:1.6em;padding-inline-start:1em;font-style:italic;font-weight:500}.tw\\:prose :where(blockquote p:first-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):before{content:open-quote}.tw\\:prose :where(blockquote p:last-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:close-quote}.tw\\:prose :where(h1):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:0;margin-bottom:.888889em;font-size:2.25em;font-weight:800;line-height:1.11111}.tw\\:prose :where(h1 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:900}.tw\\:prose :where(h2):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:2em;margin-bottom:1em;font-size:1.5em;font-weight:700;line-height:1.33333}.tw\\:prose :where(h2 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:800}.tw\\:prose :where(h3):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:1.6em;margin-bottom:.6em;font-size:1.25em;font-weight:600;line-height:1.6}.tw\\:prose :where(h3 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:700}.tw\\:prose :where(h4):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:1.5em;margin-bottom:.5em;font-weight:600;line-height:1.5}.tw\\:prose :where(h4 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:700}.tw\\:prose :where(img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.tw\\:prose :where(picture):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em;display:block}.tw\\:prose :where(video):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.tw\\:prose :where(kbd):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-kbd);box-shadow:0 0 0 1px rgb(var(--tw-prose-kbd-shadows) / 10%), 0 3px 0 rgb(var(--tw-prose-kbd-shadows) / 10%);padding-top:.1875em;padding-inline-end:.375em;padding-bottom:.1875em;border-radius:.3125rem;padding-inline-start:.375em;font-family:inherit;font-size:.875em;font-weight:500}.tw\\:prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-code);font-size:.875em;font-weight:600}.tw\\:prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)):before,.tw\\:prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:"\`"}.tw\\:prose :where(a code):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h1 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.tw\\:prose :where(h2 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-size:.875em}.tw\\:prose :where(h3 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-size:.9em}.tw\\:prose :where(h4 code):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(blockquote code):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(thead th code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.tw\\:prose :where(pre):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-pre-code);background-color:var(--tw-prose-pre-bg);padding-top:.857143em;padding-inline-end:1.14286em;padding-bottom:.857143em;border-radius:.375rem;margin-top:1.71429em;margin-bottom:1.71429em;padding-inline-start:1.14286em;font-size:.875em;font-weight:400;line-height:1.71429;overflow-x:auto}.tw\\:prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)){font-weight:inherit;color:inherit;font-size:inherit;font-family:inherit;line-height:inherit;background-color:#0000;border-width:0;border-radius:0;padding:0}.tw\\:prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)):before,.tw\\:prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:none}.tw\\:prose :where(table):not(:where([class~=not-prose],[class~=not-prose] *)){table-layout:auto;width:100%;margin-top:2em;margin-bottom:2em;font-size:.875em;line-height:1.71429}.tw\\:prose :where(thead):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:1px;border-bottom-color:var(--tw-prose-th-borders)}.tw\\:prose :where(thead th):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);vertical-align:bottom;padding-inline-end:.571429em;padding-bottom:.571429em;padding-inline-start:.571429em;font-weight:600}.tw\\:prose :where(tbody tr):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:1px;border-bottom-color:var(--tw-prose-td-borders)}.tw\\:prose :where(tbody tr:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:0}.tw\\:prose :where(tbody td):not(:where([class~=not-prose],[class~=not-prose] *)){vertical-align:baseline}.tw\\:prose :where(tfoot):not(:where([class~=not-prose],[class~=not-prose] *)){border-top-width:1px;border-top-color:var(--tw-prose-th-borders)}.tw\\:prose :where(tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){vertical-align:top}.tw\\:prose :where(th,td):not(:where([class~=not-prose],[class~=not-prose] *)){text-align:start}.tw\\:prose :where(figure>*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose :where(figcaption):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-captions);margin-top:.857143em;font-size:.875em;line-height:1.42857}.tw\\:prose{--tw-prose-body:var(--foreground);--tw-prose-headings:var(--foreground);--tw-prose-lead:var(--muted-foreground);--tw-prose-links:var(--primary);--tw-prose-bold:var(--foreground);--tw-prose-counters:var(--muted-foreground);--tw-prose-bullets:var(--muted-foreground);--tw-prose-hr:var(--border);--tw-prose-quotes:var(--foreground);--tw-prose-quote-borders:var(--border);--tw-prose-captions:var(--muted-foreground);--tw-prose-kbd:oklch(21% .034 264.665);--tw-prose-kbd-shadows:NaN NaN NaN;--tw-prose-code:var(--foreground);--tw-prose-pre-code:var(--muted-foreground);--tw-prose-pre-bg:var(--muted);--tw-prose-th-borders:var(--border);--tw-prose-td-borders:var(--border);--tw-prose-invert-body:var(--foreground);--tw-prose-invert-headings:var(--foreground);--tw-prose-invert-lead:var(--muted-foreground);--tw-prose-invert-links:var(--primary);--tw-prose-invert-bold:var(--foreground);--tw-prose-invert-counters:var(--muted-foreground);--tw-prose-invert-bullets:var(--muted-foreground);--tw-prose-invert-hr:var(--border);--tw-prose-invert-quotes:var(--foreground);--tw-prose-invert-quote-borders:var(--border);--tw-prose-invert-captions:var(--muted-foreground);--tw-prose-invert-kbd:#fff;--tw-prose-invert-kbd-shadows:255 255 255;--tw-prose-invert-code:var(--foreground);--tw-prose-invert-pre-code:var(--muted-foreground);--tw-prose-invert-pre-bg:var(--muted);--tw-prose-invert-th-borders:var(--border);--tw-prose-invert-td-borders:var(--border);font-size:1rem;line-height:1.75}.tw\\:prose :where(picture>img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose :where(li):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.5em;margin-bottom:.5em}.tw\\:prose :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:.375em}.tw\\:prose :where(.tw\\:prose>ul>li p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.75em;margin-bottom:.75em}.tw\\:prose :where(.tw\\:prose>ul>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em}.tw\\:prose :where(.tw\\:prose>ul>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.25em}.tw\\:prose :where(.tw\\:prose>ol>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em}.tw\\:prose :where(.tw\\:prose>ol>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.25em}.tw\\:prose :where(ul ul,ul ol,ol ul,ol ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.75em;margin-bottom:.75em}.tw\\:prose :where(dl):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em}.tw\\:prose :where(dd):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.5em;padding-inline-start:1.625em}.tw\\:prose :where(hr+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h2+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h3+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h4+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose :where(thead th:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose :where(thead th:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose :where(tbody td,tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.571429em;padding-inline-end:.571429em;padding-bottom:.571429em;padding-inline-start:.571429em}.tw\\:prose :where(tbody td:first-child,tfoot td:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose :where(tbody td:last-child,tfoot td:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose :where(figure):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.tw\\:prose :where(.tw\\:prose>:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose :where(.tw\\:prose>:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:0}.tw\\:prose-sm{font-size:.875rem;line-height:1.71429}.tw\\:prose-sm :where(p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em;margin-bottom:1.14286em}.tw\\:prose-sm :where([class~=lead]):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.888889em;margin-bottom:.888889em;font-size:1.28571em;line-height:1.55556}.tw\\:prose-sm :where(blockquote):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.33333em;margin-bottom:1.33333em;padding-inline-start:1.11111em}.tw\\:prose-sm :where(h1):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:.8em;font-size:2.14286em;line-height:1.2}.tw\\:prose-sm :where(h2):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.6em;margin-bottom:.8em;font-size:1.42857em;line-height:1.4}.tw\\:prose-sm :where(h3):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.55556em;margin-bottom:.444444em;font-size:1.28571em;line-height:1.55556}.tw\\:prose-sm :where(h4):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.42857em;margin-bottom:.571429em;line-height:1.42857}.tw\\:prose-sm :where(img):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(picture):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.71429em;margin-bottom:1.71429em}.tw\\:prose-sm :where(picture>img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose-sm :where(video):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.71429em;margin-bottom:1.71429em}.tw\\:prose-sm :where(kbd):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.142857em;padding-inline-end:.357143em;padding-bottom:.142857em;border-radius:.3125rem;padding-inline-start:.357143em;font-size:.857143em}.tw\\:prose-sm :where(code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.857143em}.tw\\:prose-sm :where(h2 code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.9em}.tw\\:prose-sm :where(h3 code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.888889em}.tw\\:prose-sm :where(pre):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.666667em;padding-inline-end:1em;padding-bottom:.666667em;border-radius:.25rem;margin-top:1.66667em;margin-bottom:1.66667em;padding-inline-start:1em;font-size:.857143em;line-height:1.66667}.tw\\:prose-sm :where(ol):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(ul):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em;margin-bottom:1.14286em;padding-inline-start:1.57143em}.tw\\:prose-sm :where(li):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.285714em;margin-bottom:.285714em}.tw\\:prose-sm :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:.428571em}.tw\\:prose-sm :where(.tw\\:prose-sm>ul>li p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.571429em;margin-bottom:.571429em}.tw\\:prose-sm :where(.tw\\:prose-sm>ul>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em}.tw\\:prose-sm :where(.tw\\:prose-sm>ul>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.14286em}.tw\\:prose-sm :where(.tw\\:prose-sm>ol>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em}.tw\\:prose-sm :where(.tw\\:prose-sm>ol>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.14286em}.tw\\:prose-sm :where(ul ul,ul ol,ol ul,ol ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.571429em;margin-bottom:.571429em}.tw\\:prose-sm :where(dl):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em;margin-bottom:1.14286em}.tw\\:prose-sm :where(dt):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em}.tw\\:prose-sm :where(dd):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.285714em;padding-inline-start:1.57143em}.tw\\:prose-sm :where(hr):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2.85714em;margin-bottom:2.85714em}.tw\\:prose-sm :where(hr+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(h2+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(h3+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(h4+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose-sm :where(table):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.857143em;line-height:1.5}.tw\\:prose-sm :where(thead th):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:1em;padding-bottom:.666667em;padding-inline-start:1em}.tw\\:prose-sm :where(thead th:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose-sm :where(thead th:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose-sm :where(tbody td,tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.666667em;padding-inline-end:1em;padding-bottom:.666667em;padding-inline-start:1em}.tw\\:prose-sm :where(tbody td:first-child,tfoot td:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose-sm :where(tbody td:last-child,tfoot td:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose-sm :where(figure):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.71429em;margin-bottom:1.71429em}.tw\\:prose-sm :where(figure>*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose-sm :where(figcaption):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.666667em;font-size:.857143em;line-height:1.33333}.tw\\:prose-sm :where(.tw\\:prose-sm>:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose-sm :where(.tw\\:prose-sm>:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:0}.tw\\:-mt-4{margin-top:calc(calc(var(--spacing)) * -4)}.tw\\:mt-0\\.5{margin-top:calc(calc(var(--spacing)) * .5)}.tw\\:mt-1{margin-top:calc(calc(var(--spacing)) * 1)}.tw\\:mt-2{margin-top:calc(calc(var(--spacing)) * 2)}.tw\\:mt-3{margin-top:calc(calc(var(--spacing)) * 3)}.tw\\:mt-4{margin-top:calc(calc(var(--spacing)) * 4)}.tw\\:mt-6{margin-top:calc(calc(var(--spacing)) * 6)}.tw\\:mt-auto{margin-top:auto}.tw\\:mr-1{margin-right:calc(calc(var(--spacing)) * 1)}.tw\\:mr-2{margin-right:calc(calc(var(--spacing)) * 2)}.tw\\:mr-3{margin-right:calc(calc(var(--spacing)) * 3)}.tw\\:-mb-4{margin-bottom:calc(calc(var(--spacing)) * -4)}.tw\\:mb-1{margin-bottom:calc(calc(var(--spacing)) * 1)}.tw\\:mb-2{margin-bottom:calc(calc(var(--spacing)) * 2)}.tw\\:mb-3{margin-bottom:calc(calc(var(--spacing)) * 3)}.tw\\:mb-4{margin-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:ml-1{margin-left:calc(calc(var(--spacing)) * 1)}.tw\\:ml-2{margin-left:calc(calc(var(--spacing)) * 2)}.tw\\:ml-4{margin-left:calc(calc(var(--spacing)) * 4)}.tw\\:ml-auto{margin-left:auto}.tw\\:box-border{box-sizing:border-box}.tw\\:line-clamp-3{-webkit-line-clamp:3;-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden}.tw\\:no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}.tw\\:no-scrollbar::-webkit-scrollbar{display:none}.tw\\:block{display:block}.tw\\:flex{display:flex}.tw\\:grid{display:grid}.tw\\:hidden{display:none}.tw\\:inline-block{display:inline-block}.tw\\:inline-flex{display:inline-flex}.tw\\:inline-grid{display:inline-grid}.tw\\:field-sizing-content{field-sizing:content}.tw\\:aspect-square{aspect-ratio:1}.tw\\:size-2{width:calc(calc(var(--spacing)) * 2);height:calc(calc(var(--spacing)) * 2)}.tw\\:size-2\\.5{width:calc(calc(var(--spacing)) * 2.5);height:calc(calc(var(--spacing)) * 2.5)}.tw\\:size-3{width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:size-3\\.5{width:calc(calc(var(--spacing)) * 3.5);height:calc(calc(var(--spacing)) * 3.5)}.tw\\:size-4{width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:size-5{width:calc(calc(var(--spacing)) * 5);height:calc(calc(var(--spacing)) * 5)}.tw\\:size-6{width:calc(calc(var(--spacing)) * 6);height:calc(calc(var(--spacing)) * 6)}.tw\\:size-7{width:calc(calc(var(--spacing)) * 7);height:calc(calc(var(--spacing)) * 7)}.tw\\:size-8{width:calc(calc(var(--spacing)) * 8);height:calc(calc(var(--spacing)) * 8)}.tw\\:size-9{width:calc(calc(var(--spacing)) * 9);height:calc(calc(var(--spacing)) * 9)}.tw\\:size-10{width:calc(calc(var(--spacing)) * 10);height:calc(calc(var(--spacing)) * 10)}.tw\\:size-full{width:100%;height:100%}.tw\\:h-1{height:calc(calc(var(--spacing)) * 1)}.tw\\:h-2{height:calc(calc(var(--spacing)) * 2)}.tw\\:h-3{height:calc(calc(var(--spacing)) * 3)}.tw\\:h-3\\.5{height:calc(calc(var(--spacing)) * 3.5)}.tw\\:h-4{height:calc(calc(var(--spacing)) * 4)}.tw\\:h-5{height:calc(calc(var(--spacing)) * 5)}.tw\\:h-6{height:calc(calc(var(--spacing)) * 6)}.tw\\:h-7{height:calc(calc(var(--spacing)) * 7)}.tw\\:h-8{height:calc(calc(var(--spacing)) * 8)}.tw\\:h-8\\!{height:calc(calc(var(--spacing)) * 8)!important}.tw\\:h-8\\.5{height:calc(calc(var(--spacing)) * 8.5)}.tw\\:h-9{height:calc(calc(var(--spacing)) * 9)}.tw\\:h-10{height:calc(calc(var(--spacing)) * 10)}.tw\\:h-12{height:calc(calc(var(--spacing)) * 12)}.tw\\:h-14{height:calc(calc(var(--spacing)) * 14)}.tw\\:h-20{height:calc(calc(var(--spacing)) * 20)}.tw\\:h-24{height:calc(calc(var(--spacing)) * 24)}.tw\\:h-32{height:calc(calc(var(--spacing)) * 32)}.tw\\:h-40{height:calc(calc(var(--spacing)) * 40)}.tw\\:h-64{height:calc(calc(var(--spacing)) * 64)}.tw\\:h-80{height:calc(calc(var(--spacing)) * 80)}.tw\\:h-96{height:calc(calc(var(--spacing)) * 96)}.tw\\:h-\\[5px\\]{height:5px}.tw\\:h-\\[260px\\]{height:260px}.tw\\:h-\\[300px\\]{height:300px}.tw\\:h-\\[400px\\]{height:400px}.tw\\:h-\\[600px\\]{height:600px}.tw\\:h-\\[calc\\(100\\%-1px\\)\\]{height:calc(100% - 1px)}.tw\\:h-\\[calc\\(100\\%-2px\\)\\]{height:calc(100% - 2px)}.tw\\:h-auto{height:auto}.tw\\:h-full{height:100%}.tw\\:h-px{height:1px}.tw\\:h-screen{height:100vh}.tw\\:h-svh{height:100svh}.tw\\:max-h-\\(--radix-context-menu-content-available-height\\){max-height:var(--radix-context-menu-content-available-height)}.tw\\:max-h-\\(--radix-dropdown-menu-content-available-height\\){max-height:var(--radix-dropdown-menu-content-available-height)}.tw\\:max-h-\\(--radix-popover-content-available-height\\){max-height:var(--radix-popover-content-available-height)}.tw\\:max-h-\\(--radix-select-content-available-height\\){max-height:var(--radix-select-content-available-height)}.tw\\:max-h-4{max-height:calc(calc(var(--spacing)) * 4)}.tw\\:max-h-10{max-height:calc(calc(var(--spacing)) * 10)}.tw\\:max-h-72{max-height:calc(calc(var(--spacing)) * 72)}.tw\\:max-h-80{max-height:calc(calc(var(--spacing)) * 80)}.tw\\:max-h-\\[96\\%\\]{max-height:96%}.tw\\:max-h-\\[300px\\]{max-height:300px}.tw\\:min-h-0{min-height:calc(calc(var(--spacing)) * 0)}.tw\\:min-h-11{min-height:calc(calc(var(--spacing)) * 11)}.tw\\:min-h-16{min-height:calc(calc(var(--spacing)) * 16)}.tw\\:min-h-\\[200px\\]{min-height:200px}.tw\\:min-h-full{min-height:100%}.tw\\:min-h-svh{min-height:100svh}.tw\\:w-\\(--radix-dropdown-menu-trigger-width\\){width:var(--radix-dropdown-menu-trigger-width)}.tw\\:w-\\(--sidebar-width\\){width:var(--sidebar-width)}.tw\\:w-1{width:calc(calc(var(--spacing)) * 1)}.tw\\:w-1\\/2{width:50%}.tw\\:w-1\\/4{width:25%}.tw\\:w-1\\/6{width:16.6667%}.tw\\:w-2{width:calc(calc(var(--spacing)) * 2)}.tw\\:w-3{width:calc(calc(var(--spacing)) * 3)}.tw\\:w-3\\.5{width:calc(calc(var(--spacing)) * 3.5)}.tw\\:w-3\\/4{width:75%}.tw\\:w-4{width:calc(calc(var(--spacing)) * 4)}.tw\\:w-4\\/5{width:80%}.tw\\:w-4\\/6{width:66.6667%}.tw\\:w-5{width:calc(calc(var(--spacing)) * 5)}.tw\\:w-5\\/6{width:83.3333%}.tw\\:w-6{width:calc(calc(var(--spacing)) * 6)}.tw\\:w-7{width:calc(calc(var(--spacing)) * 7)}.tw\\:w-8{width:calc(calc(var(--spacing)) * 8)}.tw\\:w-9{width:calc(calc(var(--spacing)) * 9)}.tw\\:w-9\\/12{width:75%}.tw\\:w-10{width:calc(calc(var(--spacing)) * 10)}.tw\\:w-12{width:calc(calc(var(--spacing)) * 12)}.tw\\:w-14{width:calc(calc(var(--spacing)) * 14)}.tw\\:w-20{width:calc(calc(var(--spacing)) * 20)}.tw\\:w-24{width:calc(calc(var(--spacing)) * 24)}.tw\\:w-32{width:calc(calc(var(--spacing)) * 32)}.tw\\:w-48{width:calc(calc(var(--spacing)) * 48)}.tw\\:w-56{width:calc(calc(var(--spacing)) * 56)}.tw\\:w-60{width:calc(calc(var(--spacing)) * 60)}.tw\\:w-64{width:calc(calc(var(--spacing)) * 64)}.tw\\:w-72{width:calc(calc(var(--spacing)) * 72)}.tw\\:w-80{width:calc(calc(var(--spacing)) * 80)}.tw\\:w-96{width:calc(calc(var(--spacing)) * 96)}.tw\\:w-\\[1px\\]{width:1px}.tw\\:w-\\[5px\\]{width:5px}.tw\\:w-\\[70px\\]{width:70px}.tw\\:w-\\[100px\\]{width:100px}.tw\\:w-\\[116px\\]{width:116px}.tw\\:w-\\[124px\\]{width:124px}.tw\\:w-\\[150px\\]{width:150px}.tw\\:w-\\[180px\\]{width:180px}.tw\\:w-\\[200px\\]{width:200px}.tw\\:w-\\[250px\\]{width:250px}.tw\\:w-\\[260px\\]{width:260px}.tw\\:w-\\[270px\\]{width:270px}.tw\\:w-\\[280px\\]{width:280px}.tw\\:w-\\[300px\\]{width:300px}.tw\\:w-\\[320px\\]{width:320px}.tw\\:w-\\[350px\\]{width:350px}.tw\\:w-\\[380px\\]{width:380px}.tw\\:w-\\[400px\\]{width:400px}.tw\\:w-\\[420px\\]{width:420px}.tw\\:w-\\[500px\\]{width:500px}.tw\\:w-\\[560px\\]{width:560px}.tw\\:w-\\[600px\\]{width:600px}.tw\\:w-\\[700px\\]{width:700px}.tw\\:w-\\[calc\\(100\\%-2px\\)\\]{width:calc(100% - 2px)}.tw\\:w-\\[var\\(--radix-dropdown-menu-trigger-width\\)\\]{width:var(--radix-dropdown-menu-trigger-width)}.tw\\:w-auto{width:auto}.tw\\:w-fit{width:fit-content}.tw\\:w-full{width:100%}.tw\\:w-max{width:max-content}.tw\\:w-px{width:1px}.tw\\:max-w-\\(--skeleton-width\\){max-width:var(--skeleton-width)}.tw\\:max-w-0{max-width:calc(calc(var(--spacing)) * 0)}.tw\\:max-w-2xl{max-width:var(--tw-container-2xl)}.tw\\:max-w-3xl{max-width:var(--tw-container-3xl)}.tw\\:max-w-4{max-width:calc(calc(var(--spacing)) * 4)}.tw\\:max-w-4xl{max-width:var(--tw-container-4xl)}.tw\\:max-w-6xl{max-width:var(--tw-container-6xl)}.tw\\:max-w-40{max-width:calc(calc(var(--spacing)) * 40)}.tw\\:max-w-48{max-width:calc(calc(var(--spacing)) * 48)}.tw\\:max-w-64{max-width:calc(calc(var(--spacing)) * 64)}.tw\\:max-w-96{max-width:calc(calc(var(--spacing)) * 96)}.tw\\:max-w-\\[200px\\]{max-width:200px}.tw\\:max-w-\\[220px\\]{max-width:220px}.tw\\:max-w-\\[600px\\]{max-width:600px}.tw\\:max-w-\\[calc\\(100\\%-2rem\\)\\]{max-width:calc(100% - 2rem)}.tw\\:max-w-\\[calc\\(100vw-2rem\\)\\]{max-width:calc(100vw - 2rem)}.tw\\:max-w-fit{max-width:fit-content}.tw\\:max-w-full{max-width:100%}.tw\\:max-w-lg{max-width:var(--tw-container-lg)}.tw\\:max-w-md{max-width:var(--tw-container-md)}.tw\\:max-w-none{max-width:none}.tw\\:max-w-sm{max-width:var(--tw-container-sm)}.tw\\:max-w-xs{max-width:var(--tw-container-xs)}.tw\\:min-w-0{min-width:calc(calc(var(--spacing)) * 0)}.tw\\:min-w-4{min-width:calc(calc(var(--spacing)) * 4)}.tw\\:min-w-5{min-width:calc(calc(var(--spacing)) * 5)}.tw\\:min-w-7{min-width:calc(calc(var(--spacing)) * 7)}.tw\\:min-w-8{min-width:calc(calc(var(--spacing)) * 8)}.tw\\:min-w-9{min-width:calc(calc(var(--spacing)) * 9)}.tw\\:min-w-16{min-width:calc(calc(var(--spacing)) * 16)}.tw\\:min-w-32{min-width:calc(calc(var(--spacing)) * 32)}.tw\\:min-w-36{min-width:calc(calc(var(--spacing)) * 36)}.tw\\:min-w-80{min-width:calc(calc(var(--spacing)) * 80)}.tw\\:min-w-\\[12rem\\]{min-width:12rem}.tw\\:min-w-\\[26px\\]{min-width:26px}.tw\\:min-w-\\[96px\\]{min-width:96px}.tw\\:min-w-\\[140px\\]{min-width:140px}.tw\\:min-w-\\[215px\\]{min-width:215px}.tw\\:min-w-\\[500px\\]{min-width:500px}.tw\\:min-w-min{min-width:min-content}.tw\\:flex-1{flex:1}.tw\\:shrink{flex-shrink:1}.tw\\:shrink\\!{flex-shrink:1!important}.tw\\:shrink-0{flex-shrink:0}.tw\\:shrink-\\[9999\\]{flex-shrink:9999}.tw\\:flex-grow,.tw\\:grow,.tw\\:grow-\\[1\\]{flex-grow:1}.tw\\:grow-\\[10\\]{flex-grow:10}.tw\\:basis-0{flex-basis:calc(calc(var(--spacing)) * 0)}.tw\\:table-fixed{table-layout:fixed}.tw\\:caption-bottom{caption-side:bottom}.tw\\:border-collapse{border-collapse:collapse}.tw\\:origin-\\(--radix-context-menu-content-transform-origin\\){transform-origin:var(--radix-context-menu-content-transform-origin)}.tw\\:origin-\\(--radix-dropdown-menu-content-transform-origin\\){transform-origin:var(--radix-dropdown-menu-content-transform-origin)}.tw\\:origin-\\(--radix-menubar-content-transform-origin\\){transform-origin:var(--radix-menubar-content-transform-origin)}.tw\\:origin-\\(--radix-popover-content-transform-origin\\){transform-origin:var(--radix-popover-content-transform-origin)}.tw\\:origin-\\(--radix-select-content-transform-origin\\){transform-origin:var(--radix-select-content-transform-origin)}.tw\\:origin-\\(--radix-tooltip-content-transform-origin\\){transform-origin:var(--radix-tooltip-content-transform-origin)}.tw\\:-translate-x-1\\/2{--tw-translate-x:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:-translate-x-px{--tw-translate-x:-1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:translate-x-px{--tw-translate-x:1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:-translate-y-1\\/2{--tw-translate-y:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:translate-y-0{--tw-translate-y:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:translate-y-px{--tw-translate-y:1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rotate-45{rotate:45deg}.tw\\:rotate-180{rotate:180deg}.tw\\:transform{transform:var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,)}.tw\\:animate-none\\!{animation:none!important}.tw\\:animate-pulse{animation:var(--tw-animate-pulse)}.tw\\:animate-spin{animation:var(--tw-animate-spin)}.tw\\:cursor-default{cursor:default}.tw\\:cursor-ew-resize{cursor:ew-resize}.tw\\:cursor-not-allowed{cursor:not-allowed}.tw\\:cursor-pointer{cursor:pointer}.tw\\:cursor-text{cursor:text}.tw\\:touch-none{touch-action:none}.tw\\:resize{resize:both}.tw\\:resize-none{resize:none}.tw\\:scroll-m-20{scroll-margin:calc(calc(var(--spacing)) * 20)}.tw\\:scroll-my-1{scroll-margin-block:calc(calc(var(--spacing)) * 1)}.tw\\:scroll-py-1{scroll-padding-block:calc(calc(var(--spacing)) * 1)}.tw\\:list-inside{list-style-position:inside}.tw\\:list-outside{list-style-position:outside}.tw\\:\\!list-\\[lower-alpha\\]{list-style-type:lower-alpha!important}.tw\\:\\!list-\\[lower-roman\\]{list-style-type:lower-roman!important}.tw\\:\\!list-\\[upper-alpha\\]{list-style-type:upper-alpha!important}.tw\\:\\!list-\\[upper-roman\\]{list-style-type:upper-roman!important}.tw\\:\\!list-decimal{list-style-type:decimal!important}.tw\\:\\!list-disc{list-style-type:disc!important}.tw\\:list-decimal{list-style-type:decimal}.tw\\:list-disc{list-style-type:disc}.tw\\:list-none{list-style-type:none}.tw\\:grid-flow-col{grid-auto-flow:column}.tw\\:grid-flow-row{grid-auto-flow:row}.tw\\:auto-rows-min{grid-auto-rows:min-content}.tw\\:grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}.tw\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.tw\\:grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.tw\\:grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}.tw\\:grid-cols-\\[25\\%_25\\%_50\\%\\]{grid-template-columns:25% 25% 50%}.tw\\:grid-cols-\\[25\\%_50\\%_25\\%\\]{grid-template-columns:25% 50% 25%}.tw\\:grid-cols-\\[auto_auto_auto_auto\\]{grid-template-columns:auto auto auto auto}.tw\\:grid-cols-\\[min-content_1fr\\]{grid-template-columns:min-content 1fr}.tw\\:grid-cols-subgrid{grid-template-columns:subgrid}.tw\\:flex-col{flex-direction:column}.tw\\:flex-col-reverse{flex-direction:column-reverse}.tw\\:flex-row{flex-direction:row}.tw\\:flex-row-reverse{flex-direction:row-reverse}.tw\\:flex-nowrap{flex-wrap:nowrap}.tw\\:flex-wrap{flex-wrap:wrap}.tw\\:place-content-center{place-content:center}.tw\\:content-center{align-content:center}.tw\\:items-baseline{align-items:baseline}.tw\\:items-center{align-items:center}.tw\\:items-end{align-items:flex-end}.tw\\:items-start{align-items:flex-start}.tw\\:items-stretch{align-items:stretch}.tw\\:justify-between{justify-content:space-between}.tw\\:justify-center{justify-content:center}.tw\\:justify-end{justify-content:flex-end}.tw\\:justify-start{justify-content:flex-start}.tw\\:gap-0{gap:calc(calc(var(--spacing)) * 0)}.tw\\:gap-0\\.5{gap:calc(calc(var(--spacing)) * .5)}.tw\\:gap-1{gap:calc(calc(var(--spacing)) * 1)}.tw\\:gap-1\\.5{gap:calc(calc(var(--spacing)) * 1.5)}.tw\\:gap-1\\.5\\!{gap:calc(calc(var(--spacing)) * 1.5)!important}.tw\\:gap-2{gap:calc(calc(var(--spacing)) * 2)}.tw\\:gap-2\\.5{gap:calc(calc(var(--spacing)) * 2.5)}.tw\\:gap-3{gap:calc(calc(var(--spacing)) * 3)}.tw\\:gap-4{gap:calc(calc(var(--spacing)) * 4)}.tw\\:gap-5{gap:calc(calc(var(--spacing)) * 5)}.tw\\:gap-6{gap:calc(calc(var(--spacing)) * 6)}.tw\\:gap-8{gap:calc(calc(var(--spacing)) * 8)}.tw\\:gap-16{gap:calc(calc(var(--spacing)) * 16)}.tw\\:gap-\\[--spacing\\(var\\(--gap\\)\\)\\]{gap:calc(calc(var(--spacing)) * var(--gap))}.tw\\:gap-\\[12px\\]{gap:12px}:where(.tw\\:space-y-1>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 1) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 1) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-1\\.5>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 1.5) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 1.5) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-2>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 2) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 2) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-3>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 3) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 3) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-4>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 4) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 4) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-6>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 6) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 6) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-8>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 8) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 8) * calc(1 - var(--tw-space-y-reverse)))}.tw\\:gap-x-1{column-gap:calc(calc(var(--spacing)) * 1)}.tw\\:gap-x-2{column-gap:calc(calc(var(--spacing)) * 2)}.tw\\:gap-x-3{column-gap:calc(calc(var(--spacing)) * 3)}.tw\\:gap-x-4{column-gap:calc(calc(var(--spacing)) * 4)}:where(.tw\\:-space-x-2>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * -2) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * -2) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-2>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 2) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 2) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-3>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 3) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 3) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-4>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 4) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 4) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-6>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 6) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 6) * calc(1 - var(--tw-space-x-reverse)))}.tw\\:gap-y-1{row-gap:calc(calc(var(--spacing)) * 1)}.tw\\:gap-y-2{row-gap:calc(calc(var(--spacing)) * 2)}:where(.tw\\:divide-x>:not(:last-child)){--tw-divide-x-reverse:0;border-inline-style:var(--tw-border-style);border-inline-start-width:calc(1px * var(--tw-divide-x-reverse));border-inline-end-width:calc(1px * calc(1 - var(--tw-divide-x-reverse)))}:where(.tw\\:divide-y>:not(:last-child)){--tw-divide-y-reverse:0;border-bottom-style:var(--tw-border-style);border-top-style:var(--tw-border-style);border-top-width:calc(1px * var(--tw-divide-y-reverse));border-bottom-width:calc(1px * calc(1 - var(--tw-divide-y-reverse)))}.tw\\:self-start{align-self:flex-start}.tw\\:self-stretch{align-self:stretch}.tw\\:justify-self-end{justify-self:flex-end}.tw\\:truncate{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.tw\\:overflow-auto{overflow:auto}.tw\\:overflow-clip{overflow:clip}.tw\\:overflow-hidden{overflow:hidden}.tw\\:overflow-scroll{overflow:scroll}.tw\\:overflow-visible{overflow:visible}.tw\\:overflow-x-auto{overflow-x:auto}.tw\\:overflow-x-hidden{overflow-x:hidden}.tw\\:overflow-y-auto{overflow-y:auto}.tw\\:overflow-y-hidden{overflow-y:hidden}.tw\\:rounded{border-radius:.25rem}.tw\\:rounded-2xl{border-radius:calc(var(--radius) * 1.8)}.tw\\:rounded-4xl{border-radius:calc(var(--radius) * 2.6)}.tw\\:rounded-\\[4px\\]{border-radius:4px}.tw\\:rounded-\\[6px\\]{border-radius:6px}.tw\\:rounded-\\[calc\\(var\\(--radius\\)-3px\\)\\]{border-radius:calc(var(--radius) - 3px)}.tw\\:rounded-\\[min\\(var\\(--tw-radius-md\\)\\,10px\\)\\]{border-radius:min(var(--tw-radius-md), 10px)}.tw\\:rounded-\\[min\\(var\\(--tw-radius-md\\)\\,12px\\)\\]{border-radius:min(var(--tw-radius-md), 12px)}.tw\\:rounded-full{border-radius:3.40282e38px}.tw\\:rounded-lg{border-radius:var(--radius)}.tw\\:rounded-lg\\!{border-radius:var(--radius)!important}.tw\\:rounded-md{border-radius:calc(var(--radius) * .8)}.tw\\:rounded-none{border-radius:0}.tw\\:rounded-sm{border-radius:calc(var(--radius) * .6)}.tw\\:rounded-xl{border-radius:calc(var(--radius) * 1.4)}.tw\\:rounded-xl\\!{border-radius:calc(var(--radius) * 1.4)!important}.tw\\:rounded-xs{border-radius:var(--tw-radius-xs)}.tw\\:rounded-s-none{border-start-start-radius:0;border-end-start-radius:0}.tw\\:rounded-e-none{border-start-end-radius:0;border-end-end-radius:0}.tw\\:rounded-t-xl{border-top-left-radius:calc(var(--radius) * 1.4);border-top-right-radius:calc(var(--radius) * 1.4)}.tw\\:rounded-l-lg{border-top-left-radius:var(--radius);border-bottom-left-radius:var(--radius)}.tw\\:rounded-r-xl{border-top-right-radius:calc(var(--radius) * 1.4);border-bottom-right-radius:calc(var(--radius) * 1.4)}.tw\\:rounded-b-xl{border-bottom-right-radius:calc(var(--radius) * 1.4);border-bottom-left-radius:calc(var(--radius) * 1.4)}.tw\\:border{border-style:var(--tw-border-style);border-width:1px}.tw\\:border-0{border-style:var(--tw-border-style);border-width:0}.tw\\:border-2{border-style:var(--tw-border-style);border-width:2px}.tw\\:border-s{border-inline-start-style:var(--tw-border-style);border-inline-start-width:1px}.tw\\:border-s-0{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:border-s-2{border-inline-start-style:var(--tw-border-style);border-inline-start-width:2px}.tw\\:border-s-4{border-inline-start-style:var(--tw-border-style);border-inline-start-width:4px}.tw\\:border-e{border-inline-end-style:var(--tw-border-style);border-inline-end-width:1px}.tw\\:border-e-0{border-inline-end-style:var(--tw-border-style);border-inline-end-width:0}.tw\\:border-t{border-top-style:var(--tw-border-style);border-top-width:1px}.tw\\:border-t-0{border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:border-b{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}.tw\\:border-b-0{border-bottom-style:var(--tw-border-style);border-bottom-width:0}.tw\\:border-l-2{border-left-style:var(--tw-border-style);border-left-width:2px}.tw\\:border-l-4{border-left-style:var(--tw-border-style);border-left-width:4px}.tw\\:border-dashed{--tw-border-style:dashed;border-style:dashed}.tw\\:border-none{--tw-border-style:none;border-style:none}.tw\\:border-solid{--tw-border-style:solid;border-style:solid}.tw\\:border-black{border-color:var(--tw-color-black)}.tw\\:border-blue-400{border-color:var(--tw-color-blue-400)}.tw\\:border-blue-500{border-color:var(--tw-color-blue-500)}.tw\\:border-border,.tw\\:border-border\\/50{border-color:var(--border)}@supports (color:color-mix(in lab, red, red)){.tw\\:border-border\\/50{border-color:color-mix(in oklab, var(--border) 50%, transparent)}}.tw\\:border-destructive{border-color:var(--destructive)}.tw\\:border-foreground{border-color:var(--foreground)}.tw\\:border-gray-300{border-color:var(--tw-color-gray-300)}.tw\\:border-input,.tw\\:border-input\\/30{border-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:border-input\\/30{border-color:color-mix(in oklab, var(--input) 30%, transparent)}}.tw\\:border-muted-foreground,.tw\\:border-muted-foreground\\/40{border-color:var(--muted-foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:border-muted-foreground\\/40{border-color:color-mix(in oklab, var(--muted-foreground) 40%, transparent)}}.tw\\:border-primary{border-color:var(--primary)}.tw\\:border-red-300{border-color:var(--tw-color-red-300)}.tw\\:border-red-400{border-color:var(--tw-color-red-400)}.tw\\:border-red-500{border-color:var(--tw-color-red-500)}.tw\\:border-red-600{border-color:var(--tw-color-red-600)}.tw\\:border-ring{border-color:var(--ring)}.tw\\:border-sidebar-border{border-color:var(--sidebar-border)}.tw\\:border-slate-300{border-color:var(--tw-color-slate-300)}.tw\\:border-transparent{border-color:#0000}.tw\\:border-yellow-400{border-color:var(--tw-color-yellow-400)}.tw\\:border-yellow-500{border-color:var(--tw-color-yellow-500)}.tw\\:border-s-amber-200{border-inline-start-color:var(--tw-color-amber-200)}.tw\\:border-s-indigo-200{border-inline-start-color:var(--tw-color-indigo-200)}.tw\\:border-s-purple-200{border-inline-start-color:var(--tw-color-purple-200)}.tw\\:border-s-red-200{border-inline-start-color:var(--tw-color-red-200)}.tw\\:\\!bg-destructive\\/50{background-color:var(--destructive)!important}@supports (color:color-mix(in lab, red, red)){.tw\\:\\!bg-destructive\\/50{background-color:color-mix(in oklab, var(--destructive) 50%, transparent)!important}}.tw\\:bg-\\[color-mix\\(in_oklab\\,var\\(--destructive\\)_10\\%\\,var\\(--background\\)\\)\\]{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-\\[color-mix\\(in_oklab\\,var\\(--destructive\\)_10\\%\\,var\\(--background\\)\\)\\]{background-color:color-mix(in oklab,var(--destructive) 10%,var(--background))}}.tw\\:bg-accent,.tw\\:bg-accent\\/50{background-color:var(--accent)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-accent\\/50{background-color:color-mix(in oklab, var(--accent) 50%, transparent)}}.tw\\:bg-amber-500,.tw\\:bg-amber-500\\/5{background-color:var(--tw-color-amber-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-amber-500\\/5{background-color:color-mix(in oklab, var(--tw-color-amber-500) 5%, transparent)}}.tw\\:bg-amber-500\\/15{background-color:var(--tw-color-amber-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-amber-500\\/15{background-color:color-mix(in oklab, var(--tw-color-amber-500) 15%, transparent)}}.tw\\:bg-background,.tw\\:bg-background\\/50{background-color:var(--background)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-background\\/50{background-color:color-mix(in oklab, var(--background) 50%, transparent)}}.tw\\:bg-black\\/10{background-color:var(--tw-color-black)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-black\\/10{background-color:color-mix(in oklab, var(--tw-color-black) 10%, transparent)}}.tw\\:bg-blue-50{background-color:var(--tw-color-blue-50)}.tw\\:bg-blue-100{background-color:var(--tw-color-blue-100)}.tw\\:bg-blue-400{background-color:var(--tw-color-blue-400)}.tw\\:bg-blue-500{background-color:var(--tw-color-blue-500)}.tw\\:bg-border{background-color:var(--border)}.tw\\:bg-card{background-color:var(--card)}.tw\\:bg-destructive\\/10{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-destructive\\/10{background-color:color-mix(in oklab, var(--destructive) 10%, transparent)}}.tw\\:bg-foreground{background-color:var(--foreground)}.tw\\:bg-gray-50{background-color:var(--tw-color-gray-50)}.tw\\:bg-gray-100{background-color:var(--tw-color-gray-100)}.tw\\:bg-gray-500{background-color:var(--tw-color-gray-500)}.tw\\:bg-green-50{background-color:var(--tw-color-green-50)}.tw\\:bg-green-100{background-color:var(--tw-color-green-100)}.tw\\:bg-green-500{background-color:var(--tw-color-green-500)}.tw\\:bg-input,.tw\\:bg-input\\/30{background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-input\\/30{background-color:color-mix(in oklab, var(--input) 30%, transparent)}}.tw\\:bg-muted,.tw\\:bg-muted\\/50{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-muted\\/50{background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:bg-neutral-300{background-color:var(--tw-color-neutral-300)}.tw\\:bg-orange-100{background-color:var(--tw-color-orange-100)}.tw\\:bg-popover,.tw\\:bg-popover\\/70{background-color:var(--popover)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-popover\\/70{background-color:color-mix(in oklab, var(--popover) 70%, transparent)}}.tw\\:bg-primary{background-color:var(--primary)}.tw\\:bg-primary-foreground{background-color:var(--primary-foreground)}.tw\\:bg-primary\\/30{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-primary\\/30{background-color:color-mix(in oklab, var(--primary) 30%, transparent)}}.tw\\:bg-purple-50{background-color:var(--tw-color-purple-50)}.tw\\:bg-red-100{background-color:var(--tw-color-red-100)}.tw\\:bg-red-500{background-color:var(--tw-color-red-500)}.tw\\:bg-rose-500,.tw\\:bg-rose-500\\/5{background-color:var(--tw-color-rose-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-rose-500\\/5{background-color:color-mix(in oklab, var(--tw-color-rose-500) 5%, transparent)}}.tw\\:bg-rose-500\\/15{background-color:var(--tw-color-rose-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-rose-500\\/15{background-color:color-mix(in oklab, var(--tw-color-rose-500) 15%, transparent)}}.tw\\:bg-secondary{background-color:var(--secondary)}.tw\\:bg-sidebar{background-color:var(--sidebar)}.tw\\:bg-sidebar-accent{background-color:var(--sidebar-accent)}.tw\\:bg-sidebar-border{background-color:var(--sidebar-border)}.tw\\:bg-sky-500,.tw\\:bg-sky-500\\/5{background-color:var(--tw-color-sky-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-sky-500\\/5{background-color:color-mix(in oklab, var(--tw-color-sky-500) 5%, transparent)}}.tw\\:bg-sky-500\\/15{background-color:var(--tw-color-sky-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-sky-500\\/15{background-color:color-mix(in oklab, var(--tw-color-sky-500) 15%, transparent)}}.tw\\:bg-teal-500,.tw\\:bg-teal-500\\/5{background-color:var(--tw-color-teal-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-teal-500\\/5{background-color:color-mix(in oklab, var(--tw-color-teal-500) 5%, transparent)}}.tw\\:bg-teal-500\\/15{background-color:var(--tw-color-teal-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-teal-500\\/15{background-color:color-mix(in oklab, var(--tw-color-teal-500) 15%, transparent)}}.tw\\:bg-transparent{background-color:#0000}.tw\\:bg-warning\\/15{background-color:var(--warning)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-warning\\/15{background-color:color-mix(in oklab, var(--warning) 15%, transparent)}}.tw\\:bg-white{background-color:var(--tw-color-white)}.tw\\:bg-yellow-50{background-color:var(--tw-color-yellow-50)}.tw\\:bg-yellow-100{background-color:var(--tw-color-yellow-100)}.tw\\:bg-yellow-500{background-color:var(--tw-color-yellow-500)}.tw\\:bg-zinc-400{background-color:var(--tw-color-zinc-400)}.tw\\:bg-gradient-to-t{--tw-gradient-position:to top in oklab;background-image:linear-gradient(var(--tw-gradient-stops))}.tw\\:from-popover{--tw-gradient-from:var(--popover);--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))}.tw\\:to-transparent{--tw-gradient-to:transparent;--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))}.tw\\:bg-clip-padding{background-clip:padding-box}.tw\\:fill-\\[color-mix\\(in_oklab\\,var\\(--destructive\\)_10\\%\\,var\\(--background\\)\\)\\]{fill:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:fill-\\[color-mix\\(in_oklab\\,var\\(--destructive\\)_10\\%\\,var\\(--background\\)\\)\\]{fill:color-mix(in oklab,var(--destructive) 10%,var(--background))}}.tw\\:fill-foreground{fill:var(--foreground)}.tw\\:fill-yellow-400,.tw\\:fill-yellow-400\\/50{fill:var(--tw-color-yellow-400)}@supports (color:color-mix(in lab, red, red)){.tw\\:fill-yellow-400\\/50{fill:color-mix(in oklab, var(--tw-color-yellow-400) 50%, transparent)}}.tw\\:object-cover{object-fit:cover}.tw\\:\\!p-4{padding:calc(calc(var(--spacing)) * 4)!important}.tw\\:p-0{padding:calc(calc(var(--spacing)) * 0)}.tw\\:p-0\\.5{padding:calc(calc(var(--spacing)) * .5)}.tw\\:p-1{padding:calc(calc(var(--spacing)) * 1)}.tw\\:p-2{padding:calc(calc(var(--spacing)) * 2)}.tw\\:p-2\\.5{padding:calc(calc(var(--spacing)) * 2.5)}.tw\\:p-3{padding:calc(calc(var(--spacing)) * 3)}.tw\\:p-4{padding:calc(calc(var(--spacing)) * 4)}.tw\\:p-6{padding:calc(calc(var(--spacing)) * 6)}.tw\\:p-8{padding:calc(calc(var(--spacing)) * 8)}.tw\\:p-\\[1px\\]{padding:1px}.tw\\:p-\\[3px\\]{padding:3px}.tw\\:p-\\[10px\\]{padding:10px}.tw\\:p-\\[16px\\]{padding:16px}.tw\\:px-0{padding-inline:calc(calc(var(--spacing)) * 0)}.tw\\:px-0\\.5{padding-inline:calc(calc(var(--spacing)) * .5)}.tw\\:px-1{padding-inline:calc(calc(var(--spacing)) * 1)}.tw\\:px-1\\.5{padding-inline:calc(calc(var(--spacing)) * 1.5)}.tw\\:px-2{padding-inline:calc(calc(var(--spacing)) * 2)}.tw\\:px-2\\.5{padding-inline:calc(calc(var(--spacing)) * 2.5)}.tw\\:px-3{padding-inline:calc(calc(var(--spacing)) * 3)}.tw\\:px-4{padding-inline:calc(calc(var(--spacing)) * 4)}.tw\\:px-6{padding-inline:calc(calc(var(--spacing)) * 6)}.tw\\:py-0{padding-block:calc(calc(var(--spacing)) * 0)}.tw\\:py-0\\.5{padding-block:calc(calc(var(--spacing)) * .5)}.tw\\:py-1{padding-block:calc(calc(var(--spacing)) * 1)}.tw\\:py-1\\.5{padding-block:calc(calc(var(--spacing)) * 1.5)}.tw\\:py-2{padding-block:calc(calc(var(--spacing)) * 2)}.tw\\:py-3{padding-block:calc(calc(var(--spacing)) * 3)}.tw\\:py-4{padding-block:calc(calc(var(--spacing)) * 4)}.tw\\:py-6{padding-block:calc(calc(var(--spacing)) * 6)}.tw\\:py-8{padding-block:calc(calc(var(--spacing)) * 8)}.tw\\:py-\\[2px\\]{padding-block:2px}.tw\\:ps-1\\.5{padding-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:ps-2{padding-inline-start:calc(calc(var(--spacing)) * 2)}.tw\\:ps-2\\.5{padding-inline-start:calc(calc(var(--spacing)) * 2.5)}.tw\\:ps-4{padding-inline-start:calc(calc(var(--spacing)) * 4)}.tw\\:ps-6{padding-inline-start:calc(calc(var(--spacing)) * 6)}.tw\\:ps-7{padding-inline-start:calc(calc(var(--spacing)) * 7)}.tw\\:ps-8{padding-inline-start:calc(calc(var(--spacing)) * 8)}.tw\\:ps-9{padding-inline-start:calc(calc(var(--spacing)) * 9)}.tw\\:ps-12{padding-inline-start:calc(calc(var(--spacing)) * 12)}.tw\\:ps-\\[85px\\]{padding-inline-start:85px}.tw\\:pe-1{padding-inline-end:calc(calc(var(--spacing)) * 1)}.tw\\:pe-1\\.5{padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:pe-2{padding-inline-end:calc(calc(var(--spacing)) * 2)}.tw\\:pe-4{padding-inline-end:calc(calc(var(--spacing)) * 4)}.tw\\:pe-8{padding-inline-end:calc(calc(var(--spacing)) * 8)}.tw\\:pe-8\\!{padding-inline-end:calc(calc(var(--spacing)) * 8)!important}.tw\\:pe-9{padding-inline-end:calc(calc(var(--spacing)) * 9)}.tw\\:pe-\\[calc\\(138px\\+1rem\\)\\]{padding-inline-end:calc(138px + 1rem)}.tw\\:pe-\\[…\\]{padding-inline-end:…}.tw\\:pt-1{padding-top:calc(calc(var(--spacing)) * 1)}.tw\\:pt-2{padding-top:calc(calc(var(--spacing)) * 2)}.tw\\:pt-3{padding-top:calc(calc(var(--spacing)) * 3)}.tw\\:pt-4{padding-top:calc(calc(var(--spacing)) * 4)}.tw\\:pt-6{padding-top:calc(calc(var(--spacing)) * 6)}.tw\\:pr-0{padding-right:calc(calc(var(--spacing)) * 0)}.tw\\:pr-3{padding-right:calc(calc(var(--spacing)) * 3)}.tw\\:pr-4{padding-right:calc(calc(var(--spacing)) * 4)}.tw\\:pb-0{padding-bottom:calc(calc(var(--spacing)) * 0)}.tw\\:pb-1{padding-bottom:calc(calc(var(--spacing)) * 1)}.tw\\:pb-2{padding-bottom:calc(calc(var(--spacing)) * 2)}.tw\\:pb-3{padding-bottom:calc(calc(var(--spacing)) * 3)}.tw\\:pb-4{padding-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:pb-8{padding-bottom:calc(calc(var(--spacing)) * 8)}.tw\\:pb-12{padding-bottom:calc(calc(var(--spacing)) * 12)}.tw\\:pb-16{padding-bottom:calc(calc(var(--spacing)) * 16)}.tw\\:pb-24{padding-bottom:calc(calc(var(--spacing)) * 24)}.tw\\:pl-2{padding-left:calc(calc(var(--spacing)) * 2)}.tw\\:pl-3{padding-left:calc(calc(var(--spacing)) * 3)}.tw\\:pl-4{padding-left:calc(calc(var(--spacing)) * 4)}.tw\\:pl-5{padding-left:calc(calc(var(--spacing)) * 5)}.tw\\:pl-6{padding-left:calc(calc(var(--spacing)) * 6)}.tw\\:pl-8{padding-left:calc(calc(var(--spacing)) * 8)}.tw\\:text-center{text-align:center}.tw\\:text-end{text-align:end}.tw\\:text-left{text-align:left}.tw\\:text-right{text-align:right}.tw\\:text-start{text-align:start}.tw\\:align-middle{vertical-align:middle}.tw\\:font-heading{font-family:var(--font-sans)}.tw\\:font-mono{font-family:var(--tw-font-mono)}.tw\\:font-sans{font-family:IBM Plex Sans Variable,sans-serif}.tw\\:text-2xl{font-size:var(--tw-text-2xl);line-height:var(--tw-leading,var(--tw-text-2xl--line-height))}.tw\\:text-3xl{font-size:var(--tw-text-3xl);line-height:var(--tw-leading,var(--tw-text-3xl--line-height))}.tw\\:text-4xl{font-size:var(--tw-text-4xl);line-height:var(--tw-leading,var(--tw-text-4xl--line-height))}.tw\\:text-base{font-size:var(--tw-text-base);line-height:var(--tw-leading,var(--tw-text-base--line-height))}.tw\\:text-lg{font-size:var(--tw-text-lg);line-height:var(--tw-leading,var(--tw-text-lg--line-height))}.tw\\:text-sm{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:text-sm\\/relaxed{font-size:var(--tw-text-sm);line-height:var(--tw-leading-relaxed)}.tw\\:text-xl{font-size:var(--tw-text-xl);line-height:var(--tw-leading,var(--tw-text-xl--line-height))}.tw\\:text-xs{font-size:var(--tw-text-xs);line-height:var(--tw-leading,var(--tw-text-xs--line-height))}.tw\\:text-\\[0\\.8rem\\]{font-size:.8rem}.tw\\:leading-6{--tw-leading:calc(calc(var(--spacing)) * 6);line-height:calc(calc(var(--spacing)) * 6)}.tw\\:leading-loose{--tw-leading:var(--tw-leading-loose);line-height:var(--tw-leading-loose)}.tw\\:leading-none{--tw-leading:1;line-height:1}.tw\\:leading-relaxed{--tw-leading:var(--tw-leading-relaxed);line-height:var(--tw-leading-relaxed)}.tw\\:leading-snug{--tw-leading:var(--tw-leading-snug);line-height:var(--tw-leading-snug)}.tw\\:leading-tight{--tw-leading:var(--tw-leading-tight);line-height:var(--tw-leading-tight)}.tw\\:font-bold{--tw-font-weight:var(--tw-font-weight-bold);font-weight:var(--tw-font-weight-bold)}.tw\\:font-extrabold{--tw-font-weight:var(--tw-font-weight-extrabold);font-weight:var(--tw-font-weight-extrabold)}.tw\\:font-medium{--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}.tw\\:font-normal{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:font-semibold{--tw-font-weight:var(--tw-font-weight-semibold);font-weight:var(--tw-font-weight-semibold)}.tw\\:tracking-normal{--tw-tracking:var(--tw-tracking-normal);letter-spacing:var(--tw-tracking-normal)}.tw\\:tracking-tight{--tw-tracking:var(--tw-tracking-tight);letter-spacing:var(--tw-tracking-tight)}.tw\\:tracking-wider{--tw-tracking:var(--tw-tracking-wider);letter-spacing:var(--tw-tracking-wider)}.tw\\:tracking-widest{--tw-tracking:var(--tw-tracking-widest);letter-spacing:var(--tw-tracking-widest)}.tw\\:text-balance{text-wrap:balance}.tw\\:text-nowrap{text-wrap:nowrap}.tw\\:text-wrap{text-wrap:wrap}.tw\\:break-words{overflow-wrap:break-word}.tw\\:text-clip{text-overflow:clip}.tw\\:text-ellipsis{text-overflow:ellipsis}.tw\\:whitespace-normal{white-space:normal}.tw\\:whitespace-nowrap{white-space:nowrap}.tw\\:whitespace-pre{white-space:pre}.tw\\:whitespace-pre-line{white-space:pre-line}.tw\\:whitespace-pre-wrap{white-space:pre-wrap}.tw\\:\\[color\\:blue\\]{color:#00f}.tw\\:text-accent-foreground{color:var(--accent-foreground)}.tw\\:text-amber-600{color:var(--tw-color-amber-600)}.tw\\:text-background{color:var(--background)}.tw\\:text-blue-400{color:var(--tw-color-blue-400)}.tw\\:text-blue-500{color:var(--tw-color-blue-500)}.tw\\:text-blue-600{color:var(--tw-color-blue-600)}.tw\\:text-blue-800{color:var(--tw-color-blue-800)}.tw\\:text-card-foreground{color:var(--card-foreground)}.tw\\:text-current{color:currentColor}.tw\\:text-destructive{color:var(--destructive)}.tw\\:text-foreground{color:var(--foreground)}.tw\\:text-foreground\\!{color:var(--foreground)!important}.tw\\:text-foreground\\/30{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/30{color:color-mix(in oklab, var(--foreground) 30%, transparent)}}.tw\\:text-foreground\\/50{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/50{color:color-mix(in oklab, var(--foreground) 50%, transparent)}}.tw\\:text-foreground\\/60{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/60{color:color-mix(in oklab, var(--foreground) 60%, transparent)}}.tw\\:text-foreground\\/70{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/70{color:color-mix(in oklab, var(--foreground) 70%, transparent)}}.tw\\:text-gray-300{color:var(--tw-color-gray-300)}.tw\\:text-gray-500{color:var(--tw-color-gray-500)}.tw\\:text-gray-600{color:var(--tw-color-gray-600)}.tw\\:text-gray-700{color:var(--tw-color-gray-700)}.tw\\:text-gray-800{color:var(--tw-color-gray-800)}.tw\\:text-green-600{color:var(--tw-color-green-600)}.tw\\:text-green-700{color:var(--tw-color-green-700)}.tw\\:text-green-800{color:var(--tw-color-green-800)}.tw\\:text-inherit{color:inherit}.tw\\:text-muted-foreground,.tw\\:text-muted-foreground\\/50{color:var(--muted-foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-muted-foreground\\/50{color:color-mix(in oklab, var(--muted-foreground) 50%, transparent)}}.tw\\:text-orange-800{color:var(--tw-color-orange-800)}.tw\\:text-popover-foreground{color:var(--popover-foreground)}.tw\\:text-primary{color:var(--primary)}.tw\\:text-primary-foreground{color:var(--primary-foreground)}.tw\\:text-purple-900{color:var(--tw-color-purple-900)}.tw\\:text-red-500{color:var(--tw-color-red-500)}.tw\\:text-red-600{color:var(--tw-color-red-600)}.tw\\:text-red-700{color:var(--tw-color-red-700)}.tw\\:text-red-800{color:var(--tw-color-red-800)}.tw\\:text-rose-600{color:var(--tw-color-rose-600)}.tw\\:text-secondary-foreground{color:var(--secondary-foreground)}.tw\\:text-sidebar-accent-foreground{color:var(--sidebar-accent-foreground)}.tw\\:text-sidebar-foreground,.tw\\:text-sidebar-foreground\\/70{color:var(--sidebar-foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-sidebar-foreground\\/70{color:color-mix(in oklab, var(--sidebar-foreground) 70%, transparent)}}.tw\\:text-sky-600{color:var(--tw-color-sky-600)}.tw\\:text-slate-900{color:var(--tw-color-slate-900)}.tw\\:text-teal-600{color:var(--tw-color-teal-600)}.tw\\:text-white{color:var(--tw-color-white)}.tw\\:text-yellow-400{color:var(--tw-color-yellow-400)}.tw\\:text-yellow-600{color:var(--tw-color-yellow-600)}.tw\\:text-yellow-700{color:var(--tw-color-yellow-700)}.tw\\:capitalize{text-transform:capitalize}.tw\\:uppercase{text-transform:uppercase}.tw\\:italic{font-style:italic}.tw\\:tabular-nums{--tw-numeric-spacing:tabular-nums;font-variant-numeric:var(--tw-ordinal,) var(--tw-slashed-zero,) var(--tw-numeric-figure,) var(--tw-numeric-spacing,) var(--tw-numeric-fraction,)}.tw\\:line-through{text-decoration-line:line-through}.tw\\:underline{text-decoration-line:underline}.tw\\:underline-offset-4{text-underline-offset:4px}.tw\\:opacity-0{opacity:0}.tw\\:opacity-40{opacity:.4}.tw\\:opacity-50{opacity:.5}.tw\\:opacity-60{opacity:.6}.tw\\:opacity-100{opacity:1}.tw\\:bg-blend-color{background-blend-mode:color}.tw\\:shadow{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-\\[0_0_0_1px_var\\(--sidebar-border\\)\\]{--tw-shadow:0 0 0 1px var(--tw-shadow-color,var(--sidebar-border));box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-lg{--tw-shadow:0 10px 15px -3px var(--tw-shadow-color,#0000001a), 0 4px 6px -4px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-md{--tw-shadow:0 4px 6px -1px var(--tw-shadow-color,#0000001a), 0 2px 4px -2px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-none{--tw-shadow:0 0 #0000;box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-none\\!{--tw-shadow:0 0 #0000!important;box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)!important}.tw\\:shadow-sm{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-xl{--tw-shadow:0 20px 25px -5px var(--tw-shadow-color,#0000001a), 0 8px 10px -6px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-0{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-1{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-2{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-background{--tw-ring-color:var(--background)}.tw\\:ring-foreground\\/10{--tw-ring-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:ring-foreground\\/10{--tw-ring-color:color-mix(in oklab, var(--foreground) 10%, transparent)}}.tw\\:ring-primary{--tw-ring-color:var(--primary)}.tw\\:ring-ring\\/50{--tw-ring-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.tw\\:ring-ring\\/50{--tw-ring-color:color-mix(in oklab, var(--ring) 50%, transparent)}}.tw\\:ring-sidebar-ring{--tw-ring-color:var(--sidebar-ring)}.tw\\:ring-offset-2{--tw-ring-offset-width:2px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}.tw\\:ring-offset-background{--tw-ring-offset-color:var(--background)}.tw\\:ring-offset-white{--tw-ring-offset-color:var(--tw-color-white)}.tw\\:outline-hidden{--tw-outline-style:none;outline-style:none}@media (forced-colors:active){.tw\\:outline-hidden{outline-offset:2px;outline:2px solid #0000}}.tw\\:drop-shadow-sm{--tw-drop-shadow-size:drop-shadow(0 1px 2px var(--tw-drop-shadow-color,#00000026));--tw-drop-shadow:drop-shadow(var(--tw-drop-shadow-sm));filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.tw\\:transition{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to,opacity,box-shadow,transform,translate,scale,rotate,filter,-webkit-backdrop-filter,backdrop-filter,display,content-visibility,overlay,pointer-events;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[color\\,box-shadow\\]{transition-property:color,box-shadow;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[left\\,right\\,width\\]{transition-property:left,right,width;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[margin\\,opacity\\]{transition-property:margin,opacity;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[width\\,height\\,padding\\]{transition-property:width,height,padding;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[width\\]{transition-property:width;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-all{transition-property:all;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-colors{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-opacity{transition-property:opacity;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-transform{transition-property:transform,translate,scale,rotate;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-none{transition-property:none}.tw\\:duration-100{--tw-duration:.1s;transition-duration:.1s}.tw\\:duration-200{--tw-duration:.2s;transition-duration:.2s}.tw\\:ease-linear{--tw-ease:linear;transition-timing-function:linear}.tw\\:prose-quoteless :where(blockquote p:first-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):before,.tw\\:prose-quoteless :where(blockquote p:last-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:none}.tw\\:outline-none{--tw-outline-style:none;outline-style:none}.tw\\:select-none{-webkit-user-select:none;user-select:none}.tw\\:\\[unicode-bidi\\:plaintext\\]{unicode-bidi:plaintext}.tw\\:group-focus-within\\/menu-item\\:opacity-100:is(:where(.tw\\:group\\/menu-item):focus-within *){opacity:1}@media (hover:hover){.tw\\:group-hover\\:visible:is(:where(.tw\\:group):hover *){visibility:visible}.tw\\:group-hover\\:hidden:is(:where(.tw\\:group):hover *){display:none}.tw\\:group-hover\\:opacity-100:is(:where(.tw\\:group):hover *),.tw\\:group-hover\\/menu-item\\:opacity-100:is(:where(.tw\\:group\\/menu-item):hover *){opacity:1}}.tw\\:group-focus\\/context-menu-item\\:text-accent-foreground:is(:where(.tw\\:group\\/context-menu-item):focus *),.tw\\:group-focus\\/dropdown-menu-item\\:text-accent-foreground:is(:where(.tw\\:group\\/dropdown-menu-item):focus *),.tw\\:group-focus\\/menubar-item\\:text-accent-foreground:is(:where(.tw\\:group\\/menubar-item):focus *){color:var(--accent-foreground)}.tw\\:group-has-disabled\\/field\\:opacity-50:is(:where(.tw\\:group\\/field):has(:disabled) *){opacity:.5}.tw\\:group-has-data-\\[sidebar\\=menu-action\\]\\/menu-item\\:pe-8:is(:where(.tw\\:group\\/menu-item):has([data-sidebar=menu-action]) *){padding-inline-end:calc(calc(var(--spacing)) * 8)}.tw\\:group-has-data-\\[size\\=lg\\]\\/avatar-group\\:size-10:is(:where(.tw\\:group\\/avatar-group):has([data-size=lg]) *){width:calc(calc(var(--spacing)) * 10);height:calc(calc(var(--spacing)) * 10)}.tw\\:group-has-data-\\[size\\=sm\\]\\/avatar-group\\:size-6:is(:where(.tw\\:group\\/avatar-group):has([data-size=sm]) *){width:calc(calc(var(--spacing)) * 6);height:calc(calc(var(--spacing)) * 6)}.tw\\:group-has-data-\\[slot\\=command-shortcut\\]\\/command-item\\:hidden:is(:where(.tw\\:group\\/command-item):has([data-slot=command-shortcut]) *){display:none}.tw\\:group-has-\\[\\>input\\]\\/input-group\\:pt-2:is(:where(.tw\\:group\\/input-group):has(>input) *){padding-top:calc(calc(var(--spacing)) * 2)}.tw\\:group-has-\\[\\>input\\]\\/input-group\\:pb-2:is(:where(.tw\\:group\\/input-group):has(>input) *){padding-bottom:calc(calc(var(--spacing)) * 2)}.tw\\:group-has-\\[\\>svg\\]\\/alert\\:col-start-2:is(:where(.tw\\:group\\/alert):has(>svg) *){grid-column-start:2}.tw\\:group-data-\\[checked\\=true\\]\\/command-item\\:opacity-100:is(:where(.tw\\:group\\/command-item)[data-checked=true] *){opacity:1}.tw\\:group-data-\\[collapsible\\=icon\\]\\:-mt-8:is(:where(.tw\\:group)[data-collapsible=icon] *){margin-top:calc(calc(var(--spacing)) * -8)}.tw\\:group-data-\\[collapsible\\=icon\\]\\:hidden:is(:where(.tw\\:group)[data-collapsible=icon] *){display:none}.tw\\:group-data-\\[collapsible\\=icon\\]\\:size-8\\!:is(:where(.tw\\:group)[data-collapsible=icon] *){width:calc(calc(var(--spacing)) * 8)!important;height:calc(calc(var(--spacing)) * 8)!important}.tw\\:group-data-\\[collapsible\\=icon\\]\\:w-\\(--sidebar-width-icon\\):is(:where(.tw\\:group)[data-collapsible=icon] *){width:var(--sidebar-width-icon)}.tw\\:group-data-\\[collapsible\\=icon\\]\\:w-\\[calc\\(var\\(--sidebar-width-icon\\)\\+\\(--spacing\\(4\\)\\)\\)\\]:is(:where(.tw\\:group)[data-collapsible=icon] *){width:calc(var(--sidebar-width-icon) + (calc(calc(var(--spacing)) * 4)))}.tw\\:group-data-\\[collapsible\\=icon\\]\\:w-\\[calc\\(var\\(--sidebar-width-icon\\)\\+\\(--spacing\\(4\\)\\)\\+2px\\)\\]:is(:where(.tw\\:group)[data-collapsible=icon] *){width:calc(var(--sidebar-width-icon) + (calc(calc(var(--spacing)) * 4)) + 2px)}.tw\\:group-data-\\[collapsible\\=icon\\]\\:overflow-hidden:is(:where(.tw\\:group)[data-collapsible=icon] *){overflow:hidden}.tw\\:group-data-\\[collapsible\\=icon\\]\\:p-0\\!:is(:where(.tw\\:group)[data-collapsible=icon] *){padding:calc(calc(var(--spacing)) * 0)!important}.tw\\:group-data-\\[collapsible\\=icon\\]\\:p-2\\!:is(:where(.tw\\:group)[data-collapsible=icon] *){padding:calc(calc(var(--spacing)) * 2)!important}.tw\\:group-data-\\[collapsible\\=icon\\]\\:opacity-0:is(:where(.tw\\:group)[data-collapsible=icon] *){opacity:0}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:right-\\[calc\\(var\\(--sidebar-width\\)\\*-1\\)\\]:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){right:calc(var(--sidebar-width) * -1)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:left-\\[calc\\(var\\(--sidebar-width\\)\\*-1\\)\\]:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){left:calc(var(--sidebar-width) * -1)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:w-0:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){width:calc(calc(var(--spacing)) * 0)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:translate-x-0:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){--tw-translate-x:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:group-data-\\[disabled\\=true\\]\\:pointer-events-none:is(:where(.tw\\:group)[data-disabled=true] *){pointer-events:none}.tw\\:group-data-\\[disabled\\=true\\]\\:opacity-50:is(:where(.tw\\:group)[data-disabled=true] *),.tw\\:group-data-\\[disabled\\=true\\]\\/input-group\\:opacity-50:is(:where(.tw\\:group\\/input-group)[data-disabled=true] *){opacity:.5}.tw\\:group-data-\\[side\\=primary\\]\\:-right-4:is(:where(.tw\\:group)[data-side=primary] *){right:calc(calc(var(--spacing)) * -4)}.tw\\:group-data-\\[side\\=primary\\]\\:border-e:is(:where(.tw\\:group)[data-side=primary] *){border-inline-end-style:var(--tw-border-style);border-inline-end-width:1px}.tw\\:group-data-\\[side\\=secondary\\]\\:left-0:is(:where(.tw\\:group)[data-side=secondary] *){left:calc(calc(var(--spacing)) * 0)}.tw\\:group-data-\\[side\\=secondary\\]\\:rotate-180:is(:where(.tw\\:group)[data-side=secondary] *){rotate:180deg}.tw\\:group-data-\\[side\\=secondary\\]\\:border-s:is(:where(.tw\\:group)[data-side=secondary] *){border-inline-start-style:var(--tw-border-style);border-inline-start-width:1px}.tw\\:group-data-\\[size\\=default\\]\\/avatar\\:size-2\\.5:is(:where(.tw\\:group\\/avatar)[data-size=default] *){width:calc(calc(var(--spacing)) * 2.5);height:calc(calc(var(--spacing)) * 2.5)}.tw\\:group-data-\\[size\\=default\\]\\/switch\\:size-4:is(:where(.tw\\:group\\/switch)[data-size=default] *){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[size\\=lg\\]\\/avatar\\:size-3:is(:where(.tw\\:group\\/avatar)[data-size=lg] *){width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[size\\=sm\\]\\/avatar\\:size-2:is(:where(.tw\\:group\\/avatar)[data-size=sm] *){width:calc(calc(var(--spacing)) * 2);height:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[size\\=sm\\]\\/avatar\\:text-xs:is(:where(.tw\\:group\\/avatar)[data-size=sm] *){font-size:var(--tw-text-xs);line-height:var(--tw-leading,var(--tw-text-xs--line-height))}.tw\\:group-data-\\[size\\=sm\\]\\/card\\:p-3:is(:where(.tw\\:group\\/card)[data-size=sm] *){padding:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[size\\=sm\\]\\/card\\:px-3:is(:where(.tw\\:group\\/card)[data-size=sm] *){padding-inline:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[size\\=sm\\]\\/card\\:text-sm:is(:where(.tw\\:group\\/card)[data-size=sm] *){font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:size-3:is(:where(.tw\\:group\\/switch)[data-size=sm] *){width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[spacing\\=0\\]\\/toggle-group\\:rounded-none:is(:where(.tw\\:group\\/toggle-group)[data-spacing="0"] *){border-radius:0}.tw\\:group-data-\\[spacing\\=0\\]\\/toggle-group\\:px-2:is(:where(.tw\\:group\\/toggle-group)[data-spacing="0"] *){padding-inline:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[variant\\=floating\\]\\:rounded-lg:is(:where(.tw\\:group)[data-variant=floating] *){border-radius:var(--radius)}.tw\\:group-data-\\[variant\\=floating\\]\\:shadow-sm:is(:where(.tw\\:group)[data-variant=floating] *){--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:group-data-\\[variant\\=floating\\]\\:ring-1:is(:where(.tw\\:group)[data-variant=floating] *){--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:group-data-\\[variant\\=floating\\]\\:ring-sidebar-border:is(:where(.tw\\:group)[data-variant=floating] *){--tw-ring-color:var(--sidebar-border)}.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:bg-transparent:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *){background-color:#0000}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:mx-auto:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){margin-inline:auto}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:mt-4:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){margin-top:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:block:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){display:block}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:h-1\\.5:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){height:calc(calc(var(--spacing)) * 1.5)}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:w-\\[100px\\]:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){width:100px}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:text-center:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){text-align:center}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:my-auto:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){margin-block:auto}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:me-4:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){margin-inline-end:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:block:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){display:block}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:h-\\[100px\\]:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){height:100px}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:w-1\\.5:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){width:calc(calc(var(--spacing)) * 1.5)}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:my-auto:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){margin-block:auto}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:ms-4:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){margin-inline-start:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:block:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){display:block}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:h-\\[100px\\]:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){height:100px}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:w-1\\.5:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){width:calc(calc(var(--spacing)) * 1.5)}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:mx-auto:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){margin-inline:auto}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:mb-4:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){margin-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:block:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){display:block}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:h-1\\.5:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){height:calc(calc(var(--spacing)) * 1.5)}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:w-\\[100px\\]:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){width:100px}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:text-center:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){text-align:center}.tw\\:group-data-selected\\/command-item\\:text-foreground:is(:where(.tw\\:group\\/command-item):where([data-selected=true]) *){color:var(--foreground)}.tw\\:group-data-horizontal\\/tabs\\:h-8:is(:where(.tw\\:group\\/tabs):where([data-orientation=horizontal]) *){height:calc(calc(var(--spacing)) * 8)}.tw\\:group-data-vertical\\/tabs\\:h-fit:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *){height:fit-content}.tw\\:group-data-vertical\\/tabs\\:w-full:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *){width:100%}.tw\\:group-data-vertical\\/tabs\\:flex-col:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *){flex-direction:column}.tw\\:group-data-vertical\\/tabs\\:justify-start:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *){justify-content:flex-start}@media (hover:hover){.tw\\:peer-hover\\/menu-button\\:text-sidebar-accent-foreground:is(:where(.tw\\:peer\\/menu-button):hover~*){color:var(--sidebar-accent-foreground)}.tw\\:peer-focus\\:group-hover\\:text-blue-500:is(:where(.tw\\:peer):focus~*):is(:where(.tw\\:group):hover *){color:var(--tw-color-blue-500)}}.tw\\:peer-disabled\\:cursor-not-allowed:is(:where(.tw\\:peer):disabled~*){cursor:not-allowed}.tw\\:peer-disabled\\:opacity-50:is(:where(.tw\\:peer):disabled~*){opacity:.5}.tw\\:peer-data-\\[size\\=default\\]\\/menu-button\\:top-1\\.5:is(:where(.tw\\:peer\\/menu-button)[data-size=default]~*){top:calc(calc(var(--spacing)) * 1.5)}.tw\\:peer-data-\\[size\\=lg\\]\\/menu-button\\:top-2\\.5:is(:where(.tw\\:peer\\/menu-button)[data-size=lg]~*){top:calc(calc(var(--spacing)) * 2.5)}.tw\\:peer-data-\\[size\\=sm\\]\\/menu-button\\:top-1:is(:where(.tw\\:peer\\/menu-button)[data-size=sm]~*){top:calc(calc(var(--spacing)) * 1)}.tw\\:peer-data-active\\/menu-button\\:text-sidebar-accent-foreground:is(:is(:where(.tw\\:peer\\/menu-button):where([data-state=active]),:where(.tw\\:peer\\/menu-button):where([data-active]:not([data-active=false])))~*){color:var(--sidebar-accent-foreground)}.tw\\:file\\:inline-flex::file-selector-button{display:inline-flex}.tw\\:file\\:h-6::file-selector-button{height:calc(calc(var(--spacing)) * 6)}.tw\\:file\\:border-0::file-selector-button{border-style:var(--tw-border-style);border-width:0}.tw\\:file\\:bg-transparent::file-selector-button{background-color:#0000}.tw\\:file\\:text-sm::file-selector-button{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:file\\:font-medium::file-selector-button{--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}.tw\\:file\\:text-foreground::file-selector-button{color:var(--foreground)}.tw\\:placeholder\\:text-muted-foreground::placeholder{color:var(--muted-foreground)}.tw\\:placeholder\\:text-slate-400::placeholder{color:var(--tw-color-slate-400)}.tw\\:before\\:absolute:before{content:var(--tw-content);position:absolute}.tw\\:before\\:top-0\\.5:before{content:var(--tw-content);top:calc(calc(var(--spacing)) * .5)}.tw\\:before\\:left-0:before{content:var(--tw-content);left:calc(calc(var(--spacing)) * 0)}.tw\\:before\\:block:before{content:var(--tw-content);display:block}.tw\\:before\\:hidden:before{content:var(--tw-content);display:none}.tw\\:before\\:h-4:before{content:var(--tw-content);height:calc(calc(var(--spacing)) * 4)}.tw\\:before\\:w-4:before{content:var(--tw-content);width:calc(calc(var(--spacing)) * 4)}.tw\\:before\\:cursor-pointer:before{content:var(--tw-content);cursor:pointer}.tw\\:before\\:rounded:before{content:var(--tw-content);border-radius:.25rem}.tw\\:before\\:border:before{content:var(--tw-content);border-style:var(--tw-border-style);border-width:1px}.tw\\:before\\:border-primary:before{content:var(--tw-content);border-color:var(--primary)}.tw\\:before\\:bg-primary:before{content:var(--tw-content);background-color:var(--primary)}.tw\\:before\\:bg-cover:before{content:var(--tw-content);background-size:cover}.tw\\:before\\:bg-no-repeat:before{content:var(--tw-content);background-repeat:no-repeat}.tw\\:before\\:content-\\[\\"\\"\\]:before{--tw-content:"";content:var(--tw-content)}.tw\\:before\\:content-\\[\\\\\\"\\\\\\"\\]:before{--tw-content:\\"\\";content:var(--tw-content)}.tw\\:after\\:absolute:after{content:var(--tw-content);position:absolute}.tw\\:after\\:-inset-2:after{content:var(--tw-content);inset:calc(calc(var(--spacing)) * -2)}.tw\\:after\\:inset-0:after{content:var(--tw-content);inset:calc(calc(var(--spacing)) * 0)}.tw\\:after\\:-inset-x-3:after{content:var(--tw-content);inset-inline:calc(calc(var(--spacing)) * -3)}.tw\\:after\\:-inset-y-2:after{content:var(--tw-content);inset-block:calc(calc(var(--spacing)) * -2)}.tw\\:after\\:inset-y-0:after{content:var(--tw-content);inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:after\\:start-1\\/2:after{content:var(--tw-content);inset-inline-start:50%}.tw\\:after\\:top-\\[6px\\]:after{content:var(--tw-content);top:6px}.tw\\:after\\:right-\\[7px\\]:after{content:var(--tw-content);right:7px}.tw\\:after\\:left-\\[7px\\]:after{content:var(--tw-content);left:7px}.tw\\:after\\:block:after{content:var(--tw-content);display:block}.tw\\:after\\:hidden:after{content:var(--tw-content);display:none}.tw\\:after\\:h-0\\.5:after{content:var(--tw-content);height:calc(calc(var(--spacing)) * .5)}.tw\\:after\\:h-\\[6px\\]:after{content:var(--tw-content);height:6px}.tw\\:after\\:w-1:after{content:var(--tw-content);width:calc(calc(var(--spacing)) * 1)}.tw\\:after\\:w-\\[2px\\]:after{content:var(--tw-content);width:2px}.tw\\:after\\:w-\\[3px\\]:after{content:var(--tw-content);width:3px}.tw\\:after\\:-translate-x-1\\/2:after{content:var(--tw-content);--tw-translate-x:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:after\\:rotate-45:after{content:var(--tw-content);rotate:45deg}.tw\\:after\\:cursor-pointer:after{content:var(--tw-content);cursor:pointer}.tw\\:after\\:rounded-full:after{content:var(--tw-content);border-radius:3.40282e38px}.tw\\:after\\:border:after{content:var(--tw-content);border-style:var(--tw-border-style);border-width:1px}.tw\\:after\\:border-t-0:after{content:var(--tw-content);border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:after\\:border-r-2:after{content:var(--tw-content);border-right-style:var(--tw-border-style);border-right-width:2px}.tw\\:after\\:border-b-2:after{content:var(--tw-content);border-bottom-style:var(--tw-border-style);border-bottom-width:2px}.tw\\:after\\:border-l-0:after{content:var(--tw-content);border-left-style:var(--tw-border-style);border-left-width:0}.tw\\:after\\:border-solid:after{content:var(--tw-content);--tw-border-style:solid;border-style:solid}.tw\\:after\\:border-border:after{content:var(--tw-content);border-color:var(--border)}.tw\\:after\\:border-white:after{content:var(--tw-content);border-color:var(--tw-color-white)}.tw\\:after\\:bg-foreground:after{content:var(--tw-content);background-color:var(--foreground)}.tw\\:after\\:bg-muted:after{content:var(--tw-content);background-color:var(--muted)}.tw\\:after\\:opacity-0:after{content:var(--tw-content);opacity:0}.tw\\:after\\:mix-blend-darken:after{content:var(--tw-content);mix-blend-mode:darken}.tw\\:after\\:transition-opacity:after{content:var(--tw-content);transition-property:opacity;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:after\\:content-\\[\\"\\"\\]:after{--tw-content:"";content:var(--tw-content)}.tw\\:after\\:content-\\[\\\\\\"\\\\\\"\\]:after{--tw-content:\\"\\";content:var(--tw-content)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:after\\:start-full:is(:where(.tw\\:group)[data-collapsible=offcanvas] *):after{content:var(--tw-content);inset-inline-start:100%}.tw\\:group-data-horizontal\\/tabs\\:after\\:inset-x-0:is(:where(.tw\\:group\\/tabs):where([data-orientation=horizontal]) *):after{content:var(--tw-content);inset-inline:calc(calc(var(--spacing)) * 0)}.tw\\:group-data-horizontal\\/tabs\\:after\\:bottom-\\[-5px\\]:is(:where(.tw\\:group\\/tabs):where([data-orientation=horizontal]) *):after{content:var(--tw-content);bottom:-5px}.tw\\:group-data-horizontal\\/tabs\\:after\\:h-0\\.5:is(:where(.tw\\:group\\/tabs):where([data-orientation=horizontal]) *):after{content:var(--tw-content);height:calc(calc(var(--spacing)) * .5)}.tw\\:group-data-vertical\\/tabs\\:after\\:inset-y-0:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *):after{content:var(--tw-content);inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:group-data-vertical\\/tabs\\:after\\:-end-1:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *):after{content:var(--tw-content);inset-inline-end:calc(calc(var(--spacing)) * -1)}.tw\\:group-data-vertical\\/tabs\\:after\\:w-0\\.5:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *):after{content:var(--tw-content);width:calc(calc(var(--spacing)) * .5)}.tw\\:first\\:mt-0:first-child{margin-top:calc(calc(var(--spacing)) * 0)}.tw\\:last\\:border-b-0:last-child{border-bottom-style:var(--tw-border-style);border-bottom-width:0}.tw\\:even\\:bg-muted:nth-child(2n){background-color:var(--muted)}.tw\\:focus-within\\:ring-2:focus-within{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-within\\:ring-ring:focus-within{--tw-ring-color:var(--ring)}.tw\\:focus-within\\:ring-offset-1:focus-within{--tw-ring-offset-width:1px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}@media (hover:hover){.tw\\:hover\\:-mt-4:hover{margin-top:calc(calc(var(--spacing)) * -4)}.tw\\:hover\\:cursor-pointer:hover{cursor:pointer}.tw\\:hover\\:bg-accent:hover,.tw\\:hover\\:bg-accent\\/30:hover{background-color:var(--accent)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-accent\\/30:hover{background-color:color-mix(in oklab, var(--accent) 30%, transparent)}}.tw\\:hover\\:bg-accent\\/80:hover{background-color:var(--accent)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-accent\\/80:hover{background-color:color-mix(in oklab, var(--accent) 80%, transparent)}}.tw\\:hover\\:bg-blue-600:hover{background-color:var(--tw-color-blue-600)}.tw\\:hover\\:bg-destructive\\/20:hover{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-destructive\\/20:hover{background-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:hover\\:bg-gray-50:hover{background-color:var(--tw-color-gray-50)}.tw\\:hover\\:bg-input:hover{background-color:var(--input)}.tw\\:hover\\:bg-muted:hover,.tw\\:hover\\:bg-muted\\/50:hover{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-muted\\/50:hover{background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:hover\\:bg-muted\\/80:hover{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-muted\\/80:hover{background-color:color-mix(in oklab, var(--muted) 80%, transparent)}}.tw\\:hover\\:bg-primary\\/10:hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-primary\\/10:hover{background-color:color-mix(in oklab, var(--primary) 10%, transparent)}}.tw\\:hover\\:bg-primary\\/70:hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-primary\\/70:hover{background-color:color-mix(in oklab, var(--primary) 70%, transparent)}}.tw\\:hover\\:bg-primary\\/90:hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-primary\\/90:hover{background-color:color-mix(in oklab, var(--primary) 90%, transparent)}}.tw\\:hover\\:bg-red-500:hover{background-color:var(--tw-color-red-500)}.tw\\:hover\\:bg-secondary:hover,.tw\\:hover\\:bg-secondary\\/80:hover{background-color:var(--secondary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-secondary\\/80:hover{background-color:color-mix(in oklab, var(--secondary) 80%, transparent)}}.tw\\:hover\\:bg-sidebar-accent:hover{background-color:var(--sidebar-accent)}.tw\\:hover\\:bg-transparent:hover{background-color:#0000}.tw\\:hover\\:text-foreground:hover{color:var(--foreground)}.tw\\:hover\\:text-muted-foreground:hover{color:var(--muted-foreground)}.tw\\:hover\\:text-primary-foreground:hover{color:var(--primary-foreground)}.tw\\:hover\\:text-sidebar-accent-foreground:hover{color:var(--sidebar-accent-foreground)}.tw\\:hover\\:underline:hover{text-decoration-line:underline}.tw\\:hover\\:opacity-80:hover{opacity:.8}.tw\\:hover\\:opacity-100:hover{opacity:1}.tw\\:hover\\:shadow-\\[0_0_0_1px_var\\(--sidebar-accent\\)\\]:hover{--tw-shadow:0 0 0 1px var(--tw-shadow-color,var(--sidebar-accent));box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:hover\\:shadow-md:hover{--tw-shadow:0 4px 6px -1px var(--tw-shadow-color,#0000001a), 0 2px 4px -2px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:hover\\:ring-3:hover{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:hover\\:group-data-\\[collapsible\\=offcanvas\\]\\:bg-sidebar:hover:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){background-color:var(--sidebar)}.tw\\:hover\\:after\\:bg-sidebar-border:hover:after{content:var(--tw-content);background-color:var(--sidebar-border)}}.tw\\:focus\\:relative:focus{position:relative}.tw\\:focus\\:z-10:focus{z-index:10}.tw\\:focus\\:bg-accent:focus{background-color:var(--accent)}.tw\\:focus\\:bg-muted:focus{background-color:var(--muted)}.tw\\:focus\\:text-accent-foreground:focus{color:var(--accent-foreground)}.tw\\:focus\\:text-foreground:focus{color:var(--foreground)}.tw\\:focus\\:ring-2:focus{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus\\:ring-ring:focus{--tw-ring-color:var(--ring)}.tw\\:focus\\:ring-offset-1:focus{--tw-ring-offset-width:1px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}.tw\\:focus\\:ring-offset-background:focus{--tw-ring-offset-color:var(--background)}.tw\\:focus\\:outline-hidden:focus{--tw-outline-style:none;outline-style:none}@media (forced-colors:active){.tw\\:focus\\:outline-hidden:focus{outline-offset:2px;outline:2px solid #0000}}:is(.tw\\:focus\\:\\*\\*\\:text-accent-foreground:focus *),:is(.tw\\:not-data-\\[variant\\=destructive\\]\\:focus\\:\\*\\*\\:text-accent-foreground:not([data-variant=destructive]):focus *){color:var(--accent-foreground)}.tw\\:focus-visible\\:z-10:focus-visible{z-index:10}.tw\\:focus-visible\\:border-destructive\\/40:focus-visible{border-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:focus-visible\\:border-destructive\\/40:focus-visible{border-color:color-mix(in oklab, var(--destructive) 40%, transparent)}}.tw\\:focus-visible\\:border-ring:focus-visible{border-color:var(--ring)}.tw\\:focus-visible\\:ring-0:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-visible\\:ring-1:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-visible\\:ring-2:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-visible\\:ring-3:focus-visible,.tw\\:focus-visible\\:ring-\\[3px\\]:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-visible\\:ring-\\[color\\:hsl\\(240\\,5\\%\\,64\\.9\\%\\)\\]:focus-visible{--tw-ring-color:#a1a1aa}.tw\\:focus-visible\\:ring-destructive\\/20:focus-visible{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:focus-visible\\:ring-destructive\\/20:focus-visible{--tw-ring-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:focus-visible\\:ring-ring:focus-visible,.tw\\:focus-visible\\:ring-ring\\/50:focus-visible{--tw-ring-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.tw\\:focus-visible\\:ring-ring\\/50:focus-visible{--tw-ring-color:color-mix(in oklab, var(--ring) 50%, transparent)}}.tw\\:focus-visible\\:ring-slate-400:focus-visible{--tw-ring-color:var(--tw-color-slate-400)}.tw\\:focus-visible\\:ring-offset-2:focus-visible{--tw-ring-offset-width:2px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}.tw\\:focus-visible\\:outline-hidden:focus-visible{--tw-outline-style:none;outline-style:none}@media (forced-colors:active){.tw\\:focus-visible\\:outline-hidden:focus-visible{outline-offset:2px;outline:2px solid #0000}}.tw\\:focus-visible\\:outline-1:focus-visible{outline-style:var(--tw-outline-style);outline-width:1px}.tw\\:focus-visible\\:outline-ring:focus-visible{outline-color:var(--ring)}.tw\\:focus-visible\\:outline-none:focus-visible{--tw-outline-style:none;outline-style:none}.tw\\:focus-visible\\:ring-inset:focus-visible{--tw-ring-inset:inset}:is(.tw\\:\\*\\:focus-visible\\:relative>*):focus-visible{position:relative}:is(.tw\\:\\*\\:focus-visible\\:z-10>*):focus-visible{z-index:10}.tw\\:active\\:bg-sidebar-accent:active{background-color:var(--sidebar-accent)}.tw\\:active\\:text-sidebar-accent-foreground:active{color:var(--sidebar-accent-foreground)}.tw\\:active\\:ring-3:active{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:active\\:not-aria-\\[haspopup\\]\\:translate-y-px:active:not([aria-haspopup]){--tw-translate-y:1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:active\\:not-aria-\\[haspopup\\]\\:transform-\\[translateY\\(1px\\)\\]:active:not([aria-haspopup]){transform:translateY(1px)}.tw\\:disabled\\:pointer-events-none:disabled{pointer-events:none}.tw\\:disabled\\:cursor-not-allowed:disabled{cursor:not-allowed}.tw\\:disabled\\:bg-input\\/50:disabled{background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:disabled\\:bg-input\\/50:disabled{background-color:color-mix(in oklab, var(--input) 50%, transparent)}}.tw\\:disabled\\:bg-transparent:disabled{background-color:#0000}.tw\\:disabled\\:opacity-50:disabled{opacity:.5}:where([data-side=bottom]) .tw\\:in-data-\\[side\\=bottom\\]\\:translate-y-\\[calc\\(-50\\%-1px\\)\\]{--tw-translate-y:calc(-50% - 1px);translate:var(--tw-translate-x) var(--tw-translate-y)}:where([data-side=bottom]) .tw\\:in-data-\\[side\\=bottom\\]\\:\\[clip-path\\:polygon\\(100\\%_0\\,100\\%_100\\%\\,0_100\\%\\)\\]{clip-path:polygon(100% 0,100% 100%,0 100%)}:where([data-side=primary]) .tw\\:in-data-\\[side\\=primary\\]\\:cursor-w-resize{cursor:w-resize}:where([data-side=secondary]) .tw\\:in-data-\\[side\\=secondary\\]\\:cursor-e-resize{cursor:e-resize}:where([data-side=top]) .tw\\:in-data-\\[side\\=top\\]\\:translate-y-\\[calc\\(-50\\%-1px\\)\\]{--tw-translate-y:calc(-50% - 1px);translate:var(--tw-translate-x) var(--tw-translate-y)}:where([data-side=top]) .tw\\:in-data-\\[side\\=top\\]\\:\\[clip-path\\:polygon\\(100\\%_0\\,100\\%_100\\%\\,0_100\\%\\)\\]{clip-path:polygon(100% 0,100% 100%,0 100%)}:where([data-slot=button-group]) .tw\\:in-data-\\[slot\\=button-group\\]\\:rounded-lg{border-radius:var(--radius)}:where([data-slot=combobox-content]) .tw\\:in-data-\\[slot\\=combobox-content\\]\\:focus-within\\:border-inherit:focus-within{border-color:inherit}:where([data-slot=combobox-content]) .tw\\:in-data-\\[slot\\=combobox-content\\]\\:focus-within\\:ring-0:focus-within{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}:where([data-slot=dialog-content]) .tw\\:in-data-\\[slot\\=dialog-content\\]\\:rounded-lg\\!{border-radius:var(--radius)!important}:where([data-slot=tooltip-content]) .tw\\:in-data-\\[slot\\=tooltip-content\\]\\:bg-background\\/20{background-color:var(--background)}@supports (color:color-mix(in lab, red, red)){:where([data-slot=tooltip-content]) .tw\\:in-data-\\[slot\\=tooltip-content\\]\\:bg-background\\/20{background-color:color-mix(in oklab, var(--background) 20%, transparent)}}:where([data-slot=tooltip-content]) .tw\\:in-data-\\[slot\\=tooltip-content\\]\\:text-background{color:var(--background)}:where([data-slot=tooltip-content]) .tw\\:in-data-\\[slot\\=tooltip-content\\]\\:text-destructive{color:var(--destructive)}.tw\\:has-disabled\\:bg-input\\/50:has(:disabled){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:has-disabled\\:bg-input\\/50:has(:disabled){background-color:color-mix(in oklab, var(--input) 50%, transparent)}}.tw\\:has-disabled\\:opacity-50:has(:disabled){opacity:.5}.tw\\:has-aria-expanded\\:bg-muted\\/50:has([aria-expanded=true]){background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:has-aria-expanded\\:bg-muted\\/50:has([aria-expanded=true]){background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:has-data-\\[icon\\=inline-end\\]\\:pe-1:has([data-icon=inline-end]){padding-inline-end:calc(calc(var(--spacing)) * 1)}.tw\\:has-data-\\[icon\\=inline-end\\]\\:pe-1\\.5:has([data-icon=inline-end]){padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[icon\\=inline-end\\]\\:pe-2:has([data-icon=inline-end]){padding-inline-end:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[spacing\\=0\\]\\/toggle-group\\:has-data-\\[icon\\=inline-end\\]\\:pe-1\\.5:is(:where(.tw\\:group\\/toggle-group)[data-spacing="0"] *):has([data-icon=inline-end]){padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[icon\\=inline-start\\]\\:ps-1:has([data-icon=inline-start]){padding-inline-start:calc(calc(var(--spacing)) * 1)}.tw\\:has-data-\\[icon\\=inline-start\\]\\:ps-1\\.5:has([data-icon=inline-start]){padding-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[icon\\=inline-start\\]\\:ps-2:has([data-icon=inline-start]){padding-inline-start:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[spacing\\=0\\]\\/toggle-group\\:has-data-\\[icon\\=inline-start\\]\\:ps-1\\.5:is(:where(.tw\\:group\\/toggle-group)[data-spacing="0"] *):has([data-icon=inline-start]){padding-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[slot\\=alert-action\\]\\:relative:has([data-slot=alert-action]){position:relative}.tw\\:has-data-\\[slot\\=alert-action\\]\\:pe-18:has([data-slot=alert-action]){padding-inline-end:calc(calc(var(--spacing)) * 18)}.tw\\:has-data-\\[slot\\=card-action\\]\\:grid-cols-\\[1fr_auto\\]:has([data-slot=card-action]){grid-template-columns:1fr auto}.tw\\:has-data-\\[slot\\=card-description\\]\\:grid-rows-\\[auto_auto\\]:has([data-slot=card-description]){grid-template-rows:auto auto}.tw\\:has-data-\\[slot\\=card-footer\\]\\:pb-0:has([data-slot=card-footer]){padding-bottom:calc(calc(var(--spacing)) * 0)}.tw\\:has-data-\\[slot\\=kbd\\]\\:pe-0:has([data-slot=kbd]){padding-inline-end:calc(calc(var(--spacing)) * 0)}.tw\\:has-data-\\[slot\\=kbd\\]\\:pe-1\\.5:has([data-slot=kbd]){padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[variant\\=inset\\]\\:bg-sidebar:has([data-variant=inset]){background-color:var(--sidebar)}.tw\\:has-\\[\\[data-slot\\=input-group-control\\]\\:focus-visible\\]\\:border-ring:has([data-slot=input-group-control]:focus-visible){border-color:var(--ring)}.tw\\:has-\\[\\[data-slot\\=input-group-control\\]\\:focus-visible\\]\\:ring-3:has([data-slot=input-group-control]:focus-visible){--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:has-\\[\\[data-slot\\=input-group-control\\]\\:focus-visible\\]\\:ring-ring\\/50:has([data-slot=input-group-control]:focus-visible){--tw-ring-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.tw\\:has-\\[\\[data-slot\\=input-group-control\\]\\:focus-visible\\]\\:ring-ring\\/50:has([data-slot=input-group-control]:focus-visible){--tw-ring-color:color-mix(in oklab, var(--ring) 50%, transparent)}}.tw\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:border-destructive:has([data-slot][aria-invalid=true]){border-color:var(--destructive)}.tw\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-3:has([data-slot][aria-invalid=true]){--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-destructive\\/20:has([data-slot][aria-invalid=true]){--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-destructive\\/20:has([data-slot][aria-invalid=true]){--tw-ring-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:has-\\[\\>\\[data-align\\=block-end\\]\\]\\:h-auto:has(>[data-align=block-end]){height:auto}.tw\\:has-\\[\\>\\[data-align\\=block-end\\]\\]\\:flex-col:has(>[data-align=block-end]){flex-direction:column}.tw\\:has-\\[\\>\\[data-align\\=block-start\\]\\]\\:h-auto:has(>[data-align=block-start]){height:auto}.tw\\:has-\\[\\>\\[data-align\\=block-start\\]\\]\\:flex-col:has(>[data-align=block-start]){flex-direction:column}.tw\\:has-\\[\\>\\[data-slot\\=button-group\\]\\]\\:gap-2:has(>[data-slot=button-group]){gap:calc(calc(var(--spacing)) * 2)}.tw\\:has-\\[\\>button\\]\\:ms-\\[-0\\.3rem\\]:has(>button){margin-inline-start:-.3rem}.tw\\:has-\\[\\>button\\]\\:me-\\[-0\\.3rem\\]:has(>button){margin-inline-end:-.3rem}.tw\\:has-\\[\\>img\\]\\:grid-cols-\\[auto_1fr\\]:has(>img){grid-template-columns:auto 1fr}.tw\\:has-\\[\\>img\\]\\:gap-x-2:has(>img){column-gap:calc(calc(var(--spacing)) * 2)}.tw\\:has-\\[\\>img\\:first-child\\]\\:pt-0:has(>img:first-child){padding-top:calc(calc(var(--spacing)) * 0)}.tw\\:has-\\[\\>kbd\\]\\:ms-\\[-0\\.15rem\\]:has(>kbd){margin-inline-start:-.15rem}.tw\\:has-\\[\\>kbd\\]\\:me-\\[-0\\.15rem\\]:has(>kbd){margin-inline-end:-.15rem}.tw\\:has-\\[\\>svg\\]\\:grid-cols-\\[auto_1fr\\]:has(>svg){grid-template-columns:auto 1fr}.tw\\:has-\\[\\>svg\\]\\:gap-x-2:has(>svg){column-gap:calc(calc(var(--spacing)) * 2)}.tw\\:has-\\[\\>svg\\]\\:p-0:has(>svg){padding:calc(calc(var(--spacing)) * 0)}.tw\\:has-\\[\\>textarea\\]\\:h-auto:has(>textarea){height:auto}.tw\\:aria-disabled\\:pointer-events-none[aria-disabled=true]{pointer-events:none}.tw\\:aria-disabled\\:opacity-50[aria-disabled=true]{opacity:.5}.tw\\:aria-expanded\\:bg-muted[aria-expanded=true]{background-color:var(--muted)}.tw\\:aria-expanded\\:bg-secondary[aria-expanded=true]{background-color:var(--secondary)}.tw\\:aria-expanded\\:text-foreground[aria-expanded=true]{color:var(--foreground)}.tw\\:aria-expanded\\:text-secondary-foreground[aria-expanded=true]{color:var(--secondary-foreground)}.tw\\:aria-expanded\\:opacity-100[aria-expanded=true]{opacity:1}.tw\\:aria-invalid\\:border-destructive[aria-invalid=true]{border-color:var(--destructive)}.tw\\:aria-invalid\\:ring-0[aria-invalid=true]{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:aria-invalid\\:ring-3[aria-invalid=true]{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:aria-invalid\\:ring-destructive\\/20[aria-invalid=true]{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:aria-invalid\\:ring-destructive\\/20[aria-invalid=true]{--tw-ring-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:aria-invalid\\:aria-checked\\:border-primary[aria-invalid=true][aria-checked=true]{border-color:var(--primary)}.tw\\:aria-pressed\\:bg-muted[aria-pressed=true]{background-color:var(--muted)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:h-px[aria-orientation=horizontal]{height:1px}.tw\\:aria-\\[orientation\\=horizontal\\]\\:w-full[aria-orientation=horizontal]{width:100%}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:start-0[aria-orientation=horizontal]:after{content:var(--tw-content);inset-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:h-1[aria-orientation=horizontal]:after{content:var(--tw-content);height:calc(calc(var(--spacing)) * 1)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:w-full[aria-orientation=horizontal]:after{content:var(--tw-content);width:100%}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:translate-x-0[aria-orientation=horizontal]:after{content:var(--tw-content);--tw-translate-x:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:-translate-y-1\\/2[aria-orientation=horizontal]:after{content:var(--tw-content);--tw-translate-y:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:aria-\\[orientation\\=vertical\\]\\:flex-col[aria-orientation=vertical]{flex-direction:column}.tw\\:data-inset\\:ps-7[data-inset]{padding-inline-start:calc(calc(var(--spacing)) * 7)}.tw\\:data-placeholder\\:text-muted-foreground[data-placeholder]{color:var(--muted-foreground)}.tw\\:data-quiet-focus\\:focus-visible\\:border-transparent[data-quiet-focus]:focus-visible{border-color:#0000}.tw\\:data-quiet-focus\\:focus-visible\\:ring-0[data-quiet-focus]:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:data-quiet-focus\\:focus-visible\\:outline-none[data-quiet-focus]:focus-visible{--tw-outline-style:none;outline-style:none}.tw\\:data-\\[align-trigger\\=false\\]\\:min-w-36[data-align-trigger=false]{min-width:calc(calc(var(--spacing)) * 36)}.tw\\:data-\\[align-trigger\\=true\\]\\:min-w-\\(--radix-select-trigger-width\\)[data-align-trigger=true]{min-width:var(--radix-select-trigger-width)}.tw\\:data-\\[align-trigger\\=true\\]\\:animate-none[data-align-trigger=true]{animation:none}.tw\\:data-\\[disabled\\=true\\]\\:pointer-events-auto[data-disabled=true]{pointer-events:auto}.tw\\:data-\\[disabled\\=true\\]\\:pointer-events-none[data-disabled=true]{pointer-events:none}.tw\\:data-\\[disabled\\=true\\]\\:cursor-not-allowed[data-disabled=true]{cursor:not-allowed}.tw\\:data-\\[disabled\\=true\\]\\:opacity-50[data-disabled=true]{opacity:.5}.tw\\:data-\\[position\\=popper\\]\\:h-\\(--radix-select-trigger-height\\)[data-position=popper]{height:var(--radix-select-trigger-height)}.tw\\:data-\\[position\\=popper\\]\\:w-full[data-position=popper]{width:100%}.tw\\:data-\\[position\\=popper\\]\\:min-w-\\(--radix-select-trigger-width\\)[data-position=popper]{min-width:var(--radix-select-trigger-width)}.tw\\:data-\\[side\\=bottom\\]\\:translate-y-1[data-side=bottom]{--tw-translate-y:calc(calc(var(--spacing)) * 1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=bottom\\]\\:slide-in-from-top-2[data-side=bottom]{--tw-enter-translate-y:calc(2*var(--spacing)*-1)}.tw\\:data-\\[side\\=left\\]\\:-translate-x-1[data-side=left]{--tw-translate-x:calc(calc(var(--spacing)) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=left\\]\\:slide-in-from-right-2[data-side=left]{--tw-enter-translate-x:calc(2*var(--spacing))}.tw\\:data-\\[side\\=right\\]\\:translate-x-1[data-side=right]{--tw-translate-x:calc(calc(var(--spacing)) * 1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=right\\]\\:slide-in-from-left-2[data-side=right]{--tw-enter-translate-x:calc(2*var(--spacing)*-1)}.tw\\:data-\\[side\\=top\\]\\:-translate-y-1[data-side=top]{--tw-translate-y:calc(calc(var(--spacing)) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=top\\]\\:slide-in-from-bottom-2[data-side=top]{--tw-enter-translate-y:calc(2*var(--spacing))}.tw\\:data-\\[size\\=default\\]\\:h-8[data-size=default]{height:calc(calc(var(--spacing)) * 8)}.tw\\:data-\\[size\\=default\\]\\:h-\\[18\\.4px\\][data-size=default]{height:18.4px}.tw\\:data-\\[size\\=default\\]\\:w-\\[32px\\][data-size=default]{width:32px}.tw\\:data-\\[size\\=lg\\]\\:size-10[data-size=lg]{width:calc(calc(var(--spacing)) * 10);height:calc(calc(var(--spacing)) * 10)}.tw\\:data-\\[size\\=md\\]\\:text-sm[data-size=md]{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:data-\\[size\\=sm\\]\\:size-6[data-size=sm]{width:calc(calc(var(--spacing)) * 6);height:calc(calc(var(--spacing)) * 6)}.tw\\:data-\\[size\\=sm\\]\\:h-7[data-size=sm]{height:calc(calc(var(--spacing)) * 7)}.tw\\:data-\\[size\\=sm\\]\\:h-\\[14px\\][data-size=sm]{height:14px}.tw\\:data-\\[size\\=sm\\]\\:w-\\[24px\\][data-size=sm]{width:24px}.tw\\:data-\\[size\\=sm\\]\\:gap-3[data-size=sm]{gap:calc(calc(var(--spacing)) * 3)}.tw\\:data-\\[size\\=sm\\]\\:rounded-\\[min\\(var\\(--tw-radius-md\\)\\,10px\\)\\][data-size=sm]{border-radius:min(var(--tw-radius-md), 10px)}.tw\\:data-\\[size\\=sm\\]\\:py-3[data-size=sm]{padding-block:calc(calc(var(--spacing)) * 3)}.tw\\:data-\\[size\\=sm\\]\\:text-xs[data-size=sm]{font-size:var(--tw-text-xs);line-height:var(--tw-leading,var(--tw-text-xs--line-height))}.tw\\:data-\\[size\\=sm\\]\\:has-data-\\[slot\\=card-footer\\]\\:pb-0[data-size=sm]:has([data-slot=card-footer]){padding-bottom:calc(calc(var(--spacing)) * 0)}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-item\\]\\:focus\\:bg-foreground\\/10 *)[data-slot$=-item]:focus{background-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-item\\]\\:focus\\:bg-foreground\\/10 *)[data-slot$=-item]:focus{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)}}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-item\\]\\:data-highlighted\\:bg-foreground\\/10 *)[data-slot$=-item][data-highlighted]{background-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-item\\]\\:data-highlighted\\:bg-foreground\\/10 *)[data-slot$=-item][data-highlighted]{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)}}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-separator\\]\\:bg-foreground\\/5 *)[data-slot$=-separator]{background-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-separator\\]\\:bg-foreground\\/5 *)[data-slot$=-separator]{background-color:color-mix(in oklab, var(--foreground) 5%, transparent)}}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-trigger\\]\\:focus\\:bg-foreground\\/10 *)[data-slot$=-trigger]:focus{background-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-trigger\\]\\:focus\\:bg-foreground\\/10 *)[data-slot$=-trigger]:focus{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)}}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-trigger\\]\\:aria-expanded\\:bg-foreground\\/10\\! *)[data-slot$=-trigger][aria-expanded=true]{background-color:var(--foreground)!important}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-trigger\\]\\:aria-expanded\\:bg-foreground\\/10\\! *)[data-slot$=-trigger][aria-expanded=true]{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)!important}}:is(.tw\\:\\*\\:data-\\[slot\\=alert-description\\]\\:text-destructive\\/90>*)[data-slot=alert-description]{color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\:data-\\[slot\\=alert-description\\]\\:text-destructive\\/90>*)[data-slot=alert-description]{color:color-mix(in oklab, var(--destructive) 90%, transparent)}}:is(.tw\\:\\*\\:data-\\[slot\\=avatar\\]\\:ring-2>*)[data-slot=avatar]{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}:is(.tw\\:\\*\\:data-\\[slot\\=avatar\\]\\:ring-background>*)[data-slot=avatar]{--tw-ring-color:var(--background)}:is(.tw\\:\\*\\:data-\\[slot\\=input-group-addon\\]\\:ps-2\\!>*)[data-slot=input-group-addon]{padding-inline-start:calc(calc(var(--spacing)) * 2)!important}:is(.tw\\:\\*\\*\\:data-\\[slot\\=kbd\\]\\:relative *)[data-slot=kbd]{position:relative}:is(.tw\\:\\*\\*\\:data-\\[slot\\=kbd\\]\\:isolate *)[data-slot=kbd]{isolation:isolate}:is(.tw\\:\\*\\*\\:data-\\[slot\\=kbd\\]\\:z-50 *)[data-slot=kbd]{z-index:50}:is(.tw\\:\\*\\*\\:data-\\[slot\\=kbd\\]\\:rounded-sm *)[data-slot=kbd]{border-radius:calc(var(--radius) * .6)}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:line-clamp-1>*)[data-slot=select-value]{-webkit-line-clamp:1;-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:flex>*)[data-slot=select-value]{display:flex}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:flex-1>*)[data-slot=select-value]{flex:1}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:items-center>*)[data-slot=select-value]{align-items:center}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:gap-1\\.5>*)[data-slot=select-value]{gap:calc(calc(var(--spacing)) * 1.5)}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:text-start>*)[data-slot=select-value]{text-align:start}.tw\\:group-data-horizontal\\/toggle-group\\:data-\\[spacing\\=0\\]\\:first\\:rounded-s-lg:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=horizontal]) *)[data-spacing="0"]:first-child{border-start-start-radius:var(--radius);border-end-start-radius:var(--radius)}.tw\\:group-data-vertical\\/toggle-group\\:data-\\[spacing\\=0\\]\\:first\\:rounded-t-lg:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=vertical]) *)[data-spacing="0"]:first-child{border-top-left-radius:var(--radius);border-top-right-radius:var(--radius)}.tw\\:group-data-horizontal\\/toggle-group\\:data-\\[spacing\\=0\\]\\:last\\:rounded-e-lg:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=horizontal]) *)[data-spacing="0"]:last-child{border-start-end-radius:var(--radius);border-end-end-radius:var(--radius)}.tw\\:group-data-vertical\\/toggle-group\\:data-\\[spacing\\=0\\]\\:last\\:rounded-b-lg:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=vertical]) *)[data-spacing="0"]:last-child{border-bottom-right-radius:var(--radius);border-bottom-left-radius:var(--radius)}.tw\\:data-\\[state\\=active\\]\\:bg-background[data-state=active]{background-color:var(--background)}.tw\\:data-\\[state\\=active\\]\\:text-foreground[data-state=active]{color:var(--foreground)}.tw\\:data-\\[state\\=active\\]\\:shadow-sm[data-state=active]{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:data-\\[state\\=closed\\]\\:overflow-hidden[data-state=closed]{overflow:hidden}.tw\\:data-\\[state\\=delayed-open\\]\\:animate-in[data-state=delayed-open]{animation:enter var(--tw-animation-duration,var(--tw-duration,.15s))var(--tw-ease,ease)var(--tw-animation-delay,0s)var(--tw-animation-iteration-count,1)var(--tw-animation-direction,normal)var(--tw-animation-fill-mode,none)}.tw\\:data-\\[state\\=delayed-open\\]\\:fade-in-0[data-state=delayed-open]{--tw-enter-opacity:0}.tw\\:data-\\[state\\=delayed-open\\]\\:zoom-in-95[data-state=delayed-open]{--tw-enter-scale:.95}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-soft-approved\\)\\][data-state=on]{background-color:var(--inv-soft-approved)}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-soft-unapproved\\)\\][data-state=on]{background-color:var(--inv-soft-unapproved)}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-soft-unknown\\)\\][data-state=on]{background-color:var(--inv-soft-unknown)}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-vivid-approved\\)\\][data-state=on]{background-color:var(--inv-vivid-approved)}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-vivid-unapproved\\)\\][data-state=on]{background-color:var(--inv-vivid-unapproved)}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-vivid-unknown\\)\\][data-state=on]{background-color:var(--inv-vivid-unknown)}.tw\\:data-\\[state\\=on\\]\\:bg-muted[data-state=on]{background-color:var(--muted)}.tw\\:data-\\[state\\=on\\]\\:text-\\[var\\(--inv-icon-approved\\)\\][data-state=on]{color:var(--inv-icon-approved)}.tw\\:data-\\[state\\=on\\]\\:text-\\[var\\(--inv-icon-unapproved\\)\\][data-state=on]{color:var(--inv-icon-unapproved)}.tw\\:data-\\[state\\=on\\]\\:text-\\[var\\(--inv-icon-unknown\\)\\][data-state=on]{color:var(--inv-icon-unknown)}.tw\\:data-\\[state\\=on\\]\\:text-\\[var\\(--inv-on\\)\\][data-state=on]{color:var(--inv-on)}.tw\\:data-\\[state\\=on\\]\\:text-foreground[data-state=on]{color:var(--foreground)}.tw\\:data-\\[state\\=open\\]\\:bg-accent[data-state=open]{background-color:var(--accent)}.tw\\:data-\\[state\\=open\\]\\:bg-muted[data-state=open]{background-color:var(--muted)}.tw\\:data-\\[state\\=open\\]\\:text-foreground[data-state=open]{color:var(--foreground)}.tw\\:data-\\[state\\=selected\\]\\:bg-muted[data-state=selected]{background-color:var(--muted)}.tw\\:data-\\[variant\\=destructive\\]\\:text-destructive[data-variant=destructive]{color:var(--destructive)}:is(:is(.tw\\:\\*\\*\\:data-\\[variant\\=destructive\\]\\:\\*\\*\\:text-accent-foreground\\! *)[data-variant=destructive] *),:is(.tw\\:\\*\\*\\:data-\\[variant\\=destructive\\]\\:text-accent-foreground\\! *)[data-variant=destructive]{color:var(--accent-foreground)!important}.tw\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-destructive\\/10[data-variant=destructive]:focus{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-destructive\\/10[data-variant=destructive]:focus{background-color:color-mix(in oklab, var(--destructive) 10%, transparent)}}.tw\\:data-\\[variant\\=destructive\\]\\:focus\\:text-destructive[data-variant=destructive]:focus{color:var(--destructive)}:is(.tw\\:\\*\\*\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-foreground\\/10\\! *)[data-variant=destructive]:focus{background-color:var(--foreground)!important}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-foreground\\/10\\! *)[data-variant=destructive]:focus{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)!important}}.tw\\:data-\\[variant\\=line\\]\\:rounded-none[data-variant=line]{border-radius:0}.tw\\:group-data-horizontal\\/toggle-group\\:data-\\[spacing\\=0\\]\\:data-\\[variant\\=outline\\]\\:border-s-0:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=horizontal]) *)[data-spacing="0"][data-variant=outline]{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:group-data-vertical\\/toggle-group\\:data-\\[spacing\\=0\\]\\:data-\\[variant\\=outline\\]\\:border-t-0:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=vertical]) *)[data-spacing="0"][data-variant=outline]{border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:group-data-horizontal\\/toggle-group\\:data-\\[spacing\\=0\\]\\:data-\\[variant\\=outline\\]\\:first\\:border-s:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=horizontal]) *)[data-spacing="0"][data-variant=outline]:first-child{border-inline-start-style:var(--tw-border-style);border-inline-start-width:1px}.tw\\:group-data-vertical\\/toggle-group\\:data-\\[spacing\\=0\\]\\:data-\\[variant\\=outline\\]\\:first\\:border-t:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=vertical]) *)[data-spacing="0"][data-variant=outline]:first-child{border-top-style:var(--tw-border-style);border-top-width:1px}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:inset-x-0[data-vaul-drawer-direction=bottom]{inset-inline:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:bottom-0[data-vaul-drawer-direction=bottom]{bottom:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:mt-24[data-vaul-drawer-direction=bottom]{margin-top:calc(calc(var(--spacing)) * 24)}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:max-h-\\[80vh\\][data-vaul-drawer-direction=bottom]{max-height:80vh}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:rounded-t-xl[data-vaul-drawer-direction=bottom]{border-top-left-radius:calc(var(--radius) * 1.4);border-top-right-radius:calc(var(--radius) * 1.4)}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:border-t[data-vaul-drawer-direction=bottom]{border-top-style:var(--tw-border-style);border-top-width:1px}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:inset-y-0[data-vaul-drawer-direction=left]{inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:left-0[data-vaul-drawer-direction=left]{left:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:w-3\\/4[data-vaul-drawer-direction=left]{width:75%}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:flex-row[data-vaul-drawer-direction=left]{flex-direction:row}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:rounded-r-xl[data-vaul-drawer-direction=left]{border-top-right-radius:calc(var(--radius) * 1.4);border-bottom-right-radius:calc(var(--radius) * 1.4)}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:border-r[data-vaul-drawer-direction=left]{border-right-style:var(--tw-border-style);border-right-width:1px}.tw\\:data-\\[vaul-drawer-direction\\=left\\/right\\]\\:flex-row[data-vaul-drawer-direction=left\\/right]{flex-direction:row}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:inset-y-0[data-vaul-drawer-direction=right]{inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:right-0[data-vaul-drawer-direction=right]{right:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:w-3\\/4[data-vaul-drawer-direction=right]{width:75%}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:flex-row[data-vaul-drawer-direction=right]{flex-direction:row}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:rounded-l-xl[data-vaul-drawer-direction=right]{border-top-left-radius:calc(var(--radius) * 1.4);border-bottom-left-radius:calc(var(--radius) * 1.4)}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:border-l[data-vaul-drawer-direction=right]{border-left-style:var(--tw-border-style);border-left-width:1px}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:inset-x-0[data-vaul-drawer-direction=top]{inset-inline:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:top-0[data-vaul-drawer-direction=top]{top:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:mb-24[data-vaul-drawer-direction=top]{margin-bottom:calc(calc(var(--spacing)) * 24)}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:max-h-\\[80vh\\][data-vaul-drawer-direction=top]{max-height:80vh}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:rounded-b-xl[data-vaul-drawer-direction=top]{border-bottom-right-radius:calc(var(--radius) * 1.4);border-bottom-left-radius:calc(var(--radius) * 1.4)}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:border-b[data-vaul-drawer-direction=top]{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}@supports ((-webkit-backdrop-filter:var(--tw)) or (backdrop-filter:var(--tw))){.tw\\:supports-backdrop-filter\\:backdrop-blur-xs{--tw-backdrop-blur:blur(var(--tw-blur-xs));-webkit-backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)}}@media (min-width:40rem){.tw\\:sm\\:flex{display:flex}.tw\\:sm\\:max-w-sm{max-width:var(--tw-container-sm)}.tw\\:sm\\:flex-row{flex-direction:row}.tw\\:sm\\:justify-end{justify-content:flex-end}.tw\\:sm\\:p-8{padding:calc(calc(var(--spacing)) * 8)}.tw\\:sm\\:text-start{text-align:start}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:sm\\:max-w-sm[data-vaul-drawer-direction=left],.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:sm\\:max-w-sm[data-vaul-drawer-direction=right]{max-width:var(--tw-container-sm)}}@media (min-width:48rem){.tw\\:md\\:block{display:block}.tw\\:md\\:flex{display:flex}.tw\\:md\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.tw\\:md\\:gap-0\\.5{gap:calc(calc(var(--spacing)) * .5)}.tw\\:md\\:text-start{text-align:start}.tw\\:md\\:text-sm{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:md\\:text-pretty{text-wrap:pretty}.tw\\:md\\:opacity-0{opacity:0}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:m-2:is(:where(.tw\\:peer)[data-variant=inset]~*){margin:calc(calc(var(--spacing)) * 2)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:ms-0:is(:where(.tw\\:peer)[data-variant=inset]~*){margin-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:rounded-xl:is(:where(.tw\\:peer)[data-variant=inset]~*){border-radius:calc(var(--radius) * 1.4)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:shadow-sm:is(:where(.tw\\:peer)[data-variant=inset]~*){--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:peer-data-\\[state\\=collapsed\\]\\:ms-2:is(:where(.tw\\:peer)[data-variant=inset]~*):is(:where(.tw\\:peer)[data-state=collapsed]~*){margin-inline-start:calc(calc(var(--spacing)) * 2)}.tw\\:md\\:after\\:hidden:after{content:var(--tw-content);display:none}}@media (min-width:64rem){.tw\\:lg\\:flex{display:flex}.tw\\:lg\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}:where(.tw\\:lg\\:space-x-8>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 8) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 8) * calc(1 - var(--tw-space-x-reverse)))}.tw\\:lg\\:text-5xl{font-size:var(--tw-text-5xl);line-height:var(--tw-leading,var(--tw-text-5xl--line-height))}}@media (min-width:48rem){@media (min-width:64rem){.tw\\:md\\:lg\\:hidden{display:none}}}@media (min-width:80rem){.tw\\:xl\\:auto-cols-fr{grid-auto-columns:minmax(0,1fr)}.tw\\:xl\\:grid-flow-col{grid-auto-flow:column}.tw\\:xl\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.tw\\:xl\\:grid-cols-none{grid-template-columns:none}.tw\\:xl\\:grid-rows-2{grid-template-rows:repeat(2,minmax(0,1fr))}}@container search not (min-width:7rem){.tw\\:\\@max-\\[7rem\\]\\/search\\:hidden{display:none}.tw\\:\\@max-\\[7rem\\]\\/search\\:ps-3{padding-inline-start:calc(calc(var(--spacing)) * 3)}}@container search not (min-width:4rem){.tw\\:\\@max-\\[4rem\\]\\/search\\:hidden{display:none}.tw\\:\\@max-\\[4rem\\]\\/search\\:pe-3{padding-inline-end:calc(calc(var(--spacing)) * 3)}}@container search not (min-width:3rem){.tw\\:\\@max-\\[3rem\\]\\/search\\:ps-0{padding-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:\\@max-\\[3rem\\]\\/search\\:pe-0{padding-inline-end:calc(calc(var(--spacing)) * 0)}}@container (min-width:24rem){.tw\\:\\@sm\\:basis-auto{flex-basis:auto}}.tw\\:ltr\\:left-2:where(:dir(ltr),[dir=ltr],[dir=ltr] *){left:calc(calc(var(--spacing)) * 2)}.tw\\:ltr\\:-translate-x-1\\/2:where(:dir(ltr),[dir=ltr],[dir=ltr] *){--tw-translate-x:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:right-2:where(:dir(rtl),[dir=rtl],[dir=rtl] *){right:calc(calc(var(--spacing)) * 2)}.tw\\:rtl\\:flex:where(:dir(rtl),[dir=rtl],[dir=rtl] *){display:flex}.tw\\:rtl\\:-translate-x-px:where(:dir(rtl),[dir=rtl],[dir=rtl] *){--tw-translate-x:-1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:translate-x-1\\/2:where(:dir(rtl),[dir=rtl],[dir=rtl] *){--tw-translate-x:calc(1 / 2 * 100%);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:translate-x-px:where(:dir(rtl),[dir=rtl],[dir=rtl] *){--tw-translate-x:1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:after\\:translate-x-1\\/2:where(:dir(rtl),[dir=rtl],[dir=rtl] *):after{content:var(--tw-content);--tw-translate-x:calc(1 / 2 * 100%);translate:var(--tw-translate-x) var(--tw-translate-y)}:where([data-side=primary]) .tw\\:rtl\\:in-data-\\[side\\=primary\\]\\:cursor-e-resize:where(:dir(rtl),[dir=rtl],[dir=rtl] *){cursor:e-resize}:where([data-side=secondary]) .tw\\:rtl\\:in-data-\\[side\\=secondary\\]\\:cursor-w-resize:where(:dir(rtl),[dir=rtl],[dir=rtl] *){cursor:w-resize}.tw\\:rtl\\:aria-\\[orientation\\=horizontal\\]\\:after\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *)[aria-orientation=horizontal]:after{content:var(--tw-content);--tw-translate-x:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:data-\\[side\\=left\\]\\:translate-x-1:where(:dir(rtl),[dir=rtl],[dir=rtl] *)[data-side=left]{--tw-translate-x:calc(calc(var(--spacing)) * 1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:data-\\[side\\=right\\]\\:-translate-x-1:where(:dir(rtl),[dir=rtl],[dir=rtl] *)[data-side=right]{--tw-translate-x:calc(calc(var(--spacing)) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:dark\\:border-input:is(.dark *){border-color:var(--input)}.tw\\:dark\\:bg-destructive\\/20:is(.dark *){background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:bg-destructive\\/20:is(.dark *){background-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:dark\\:bg-input\\/30:is(.dark *){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:bg-input\\/30:is(.dark *){background-color:color-mix(in oklab, var(--input) 30%, transparent)}}.tw\\:dark\\:bg-transparent:is(.dark *){background-color:#0000}.tw\\:dark\\:text-amber-400:is(.dark *){color:var(--tw-color-amber-400)}.tw\\:dark\\:text-muted-foreground:is(.dark *){color:var(--muted-foreground)}.tw\\:dark\\:text-rose-400:is(.dark *){color:var(--tw-color-rose-400)}.tw\\:dark\\:text-sky-400:is(.dark *){color:var(--tw-color-sky-400)}.tw\\:dark\\:text-teal-400:is(.dark *){color:var(--tw-color-teal-400)}.tw\\:dark\\:after\\:mix-blend-lighten:is(.dark *):after{content:var(--tw-content);mix-blend-mode:lighten}@media (hover:hover){.tw\\:dark\\:hover\\:bg-blue-500:is(.dark *):hover{background-color:var(--tw-color-blue-500)}.tw\\:dark\\:hover\\:bg-destructive\\/30:is(.dark *):hover{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:hover\\:bg-destructive\\/30:is(.dark *):hover{background-color:color-mix(in oklab, var(--destructive) 30%, transparent)}}.tw\\:dark\\:hover\\:bg-input\\/50:is(.dark *):hover{background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:hover\\:bg-input\\/50:is(.dark *):hover{background-color:color-mix(in oklab, var(--input) 50%, transparent)}}.tw\\:dark\\:hover\\:bg-muted\\/50:is(.dark *):hover{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:hover\\:bg-muted\\/50:is(.dark *):hover{background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:dark\\:hover\\:text-foreground:is(.dark *):hover{color:var(--foreground)}}.tw\\:dark\\:focus-visible\\:ring-destructive\\/40:is(.dark *):focus-visible{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:focus-visible\\:ring-destructive\\/40:is(.dark *):focus-visible{--tw-ring-color:color-mix(in oklab, var(--destructive) 40%, transparent)}}.tw\\:dark\\:disabled\\:bg-input\\/80:is(.dark *):disabled{background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:disabled\\:bg-input\\/80:is(.dark *):disabled{background-color:color-mix(in oklab, var(--input) 80%, transparent)}}.tw\\:dark\\:disabled\\:bg-transparent:is(.dark *):disabled{background-color:#0000}:where([data-slot=tooltip-content]) .tw\\:dark\\:in-data-\\[slot\\=tooltip-content\\]\\:bg-background\\/10:is(.dark *){background-color:var(--background)}@supports (color:color-mix(in lab, red, red)){:where([data-slot=tooltip-content]) .tw\\:dark\\:in-data-\\[slot\\=tooltip-content\\]\\:bg-background\\/10:is(.dark *){background-color:color-mix(in oklab, var(--background) 10%, transparent)}}.tw\\:dark\\:has-disabled\\:bg-input\\/80:is(.dark *):has(:disabled){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:has-disabled\\:bg-input\\/80:is(.dark *):has(:disabled){background-color:color-mix(in oklab, var(--input) 80%, transparent)}}.tw\\:dark\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-destructive\\/40:is(.dark *):has([data-slot][aria-invalid=true]){--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-destructive\\/40:is(.dark *):has([data-slot][aria-invalid=true]){--tw-ring-color:color-mix(in oklab, var(--destructive) 40%, transparent)}}.tw\\:dark\\:aria-invalid\\:border-destructive\\/50:is(.dark *)[aria-invalid=true]{border-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:aria-invalid\\:border-destructive\\/50:is(.dark *)[aria-invalid=true]{border-color:color-mix(in oklab, var(--destructive) 50%, transparent)}}.tw\\:dark\\:aria-invalid\\:ring-destructive\\/40:is(.dark *)[aria-invalid=true]{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:aria-invalid\\:ring-destructive\\/40:is(.dark *)[aria-invalid=true]{--tw-ring-color:color-mix(in oklab, var(--destructive) 40%, transparent)}}.tw\\:dark\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-destructive\\/20:is(.dark *)[data-variant=destructive]:focus{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-destructive\\/20:is(.dark *)[data-variant=destructive]:focus{background-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:data-open\\:animate-in:where([data-state=open]),.tw\\:data-open\\:animate-in:where([data-open]:not([data-open=false])){animation:enter var(--tw-animation-duration,var(--tw-duration,.15s))var(--tw-ease,ease)var(--tw-animation-delay,0s)var(--tw-animation-iteration-count,1)var(--tw-animation-direction,normal)var(--tw-animation-fill-mode,none)}.tw\\:data-open\\:bg-accent:where([data-state=open]),.tw\\:data-open\\:bg-accent:where([data-open]:not([data-open=false])){background-color:var(--accent)}.tw\\:data-open\\:text-accent-foreground:where([data-state=open]),.tw\\:data-open\\:text-accent-foreground:where([data-open]:not([data-open=false])){color:var(--accent-foreground)}.tw\\:data-open\\:fade-in-0:where([data-state=open]),.tw\\:data-open\\:fade-in-0:where([data-open]:not([data-open=false])){--tw-enter-opacity:0}.tw\\:data-open\\:zoom-in-95:where([data-state=open]),.tw\\:data-open\\:zoom-in-95:where([data-open]:not([data-open=false])){--tw-enter-scale:.95}@media (hover:hover){:is(.tw\\:data-open\\:hover\\:bg-sidebar-accent:where([data-state=open]),.tw\\:data-open\\:hover\\:bg-sidebar-accent:where([data-open]:not([data-open=false]))):hover{background-color:var(--sidebar-accent)}:is(.tw\\:data-open\\:hover\\:text-sidebar-accent-foreground:where([data-state=open]),.tw\\:data-open\\:hover\\:text-sidebar-accent-foreground:where([data-open]:not([data-open=false]))):hover{color:var(--sidebar-accent-foreground)}}.tw\\:data-closed\\:animate-out:where([data-state=closed]),.tw\\:data-closed\\:animate-out:where([data-closed]:not([data-closed=false])){animation:exit var(--tw-animation-duration,var(--tw-duration,.15s))var(--tw-ease,ease)var(--tw-animation-delay,0s)var(--tw-animation-iteration-count,1)var(--tw-animation-direction,normal)var(--tw-animation-fill-mode,none)}.tw\\:data-closed\\:fade-out-0:where([data-state=closed]),.tw\\:data-closed\\:fade-out-0:where([data-closed]:not([data-closed=false])){--tw-exit-opacity:0}.tw\\:data-closed\\:zoom-out-95:where([data-state=closed]),.tw\\:data-closed\\:zoom-out-95:where([data-closed]:not([data-closed=false])){--tw-exit-scale:.95}.tw\\:data-checked\\:border-primary:where([data-state=checked]),.tw\\:data-checked\\:border-primary:where([data-checked]:not([data-checked=false])){border-color:var(--primary)}.tw\\:data-checked\\:bg-primary:where([data-state=checked]),.tw\\:data-checked\\:bg-primary:where([data-checked]:not([data-checked=false])){background-color:var(--primary)}.tw\\:data-checked\\:text-primary-foreground:where([data-state=checked]),.tw\\:data-checked\\:text-primary-foreground:where([data-checked]:not([data-checked=false])){color:var(--primary-foreground)}.tw\\:group-data-\\[size\\=default\\]\\/switch\\:data-checked\\:translate-x-\\[calc\\(100\\%-2px\\)\\]:is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-state=checked]),.tw\\:group-data-\\[size\\=default\\]\\/switch\\:data-checked\\:translate-x-\\[calc\\(100\\%-2px\\)\\]:is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-checked]:not([data-checked=false])),.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:data-checked\\:translate-x-\\[calc\\(100\\%-2px\\)\\]:is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-state=checked]),.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:data-checked\\:translate-x-\\[calc\\(100\\%-2px\\)\\]:is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-checked]:not([data-checked=false])){--tw-translate-x:calc(100% - 2px);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:group-data-\\[size\\=default\\]\\/switch\\:data-checked\\:-translate-x-\\[calc\\(100\\%-2px\\)\\]:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-state=checked]),.tw\\:rtl\\:group-data-\\[size\\=default\\]\\/switch\\:data-checked\\:-translate-x-\\[calc\\(100\\%-2px\\)\\]:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-checked]:not([data-checked=false])),.tw\\:rtl\\:group-data-\\[size\\=sm\\]\\/switch\\:data-checked\\:-translate-x-\\[calc\\(100\\%-2px\\)\\]:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-state=checked]),.tw\\:rtl\\:group-data-\\[size\\=sm\\]\\/switch\\:data-checked\\:-translate-x-\\[calc\\(100\\%-2px\\)\\]:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-checked]:not([data-checked=false])){--tw-translate-x:calc(calc(100% - 2px) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:dark\\:data-checked\\:bg-primary:is(.dark *):where([data-state=checked]),.tw\\:dark\\:data-checked\\:bg-primary:is(.dark *):where([data-checked]:not([data-checked=false])){background-color:var(--primary)}.tw\\:dark\\:data-checked\\:bg-primary-foreground:is(.dark *):where([data-state=checked]),.tw\\:dark\\:data-checked\\:bg-primary-foreground:is(.dark *):where([data-checked]:not([data-checked=false])){background-color:var(--primary-foreground)}.tw\\:data-unchecked\\:bg-input:where([data-state=unchecked]),.tw\\:data-unchecked\\:bg-input:where([data-unchecked]:not([data-unchecked=false])){background-color:var(--input)}.tw\\:group-data-\\[size\\=default\\]\\/switch\\:data-unchecked\\:translate-x-0:is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-state=unchecked]),.tw\\:group-data-\\[size\\=default\\]\\/switch\\:data-unchecked\\:translate-x-0:is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-unchecked]:not([data-unchecked=false])),.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:data-unchecked\\:translate-x-0:is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-state=unchecked]),.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:data-unchecked\\:translate-x-0:is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-unchecked]:not([data-unchecked=false])),.tw\\:rtl\\:group-data-\\[size\\=default\\]\\/switch\\:data-unchecked\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-state=unchecked]),.tw\\:rtl\\:group-data-\\[size\\=default\\]\\/switch\\:data-unchecked\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-unchecked]:not([data-unchecked=false])),.tw\\:rtl\\:group-data-\\[size\\=sm\\]\\/switch\\:data-unchecked\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-state=unchecked]),.tw\\:rtl\\:group-data-\\[size\\=sm\\]\\/switch\\:data-unchecked\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-unchecked]:not([data-unchecked=false])){--tw-translate-x:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:dark\\:data-unchecked\\:bg-foreground:is(.dark *):where([data-state=unchecked]),.tw\\:dark\\:data-unchecked\\:bg-foreground:is(.dark *):where([data-unchecked]:not([data-unchecked=false])){background-color:var(--foreground)}.tw\\:dark\\:data-unchecked\\:bg-input\\/80:is(.dark *):where([data-state=unchecked]),.tw\\:dark\\:data-unchecked\\:bg-input\\/80:is(.dark *):where([data-unchecked]:not([data-unchecked=false])){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:data-unchecked\\:bg-input\\/80:is(.dark *):where([data-state=unchecked]),.tw\\:dark\\:data-unchecked\\:bg-input\\/80:is(.dark *):where([data-unchecked]:not([data-unchecked=false])){background-color:color-mix(in oklab, var(--input) 80%, transparent)}}.tw\\:data-selected\\:bg-muted:where([data-selected=true]),.tw\\:data-selected\\:bg-muted\\/50:where([data-selected=true]){background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:data-selected\\:bg-muted\\/50:where([data-selected=true]){background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:data-selected\\:bg-primary:where([data-selected=true]){background-color:var(--primary)}.tw\\:data-selected\\:bg-transparent:where([data-selected=true]){background-color:#0000}.tw\\:data-selected\\:text-foreground:where([data-selected=true]){color:var(--foreground)}.tw\\:data-selected\\:text-inherit:where([data-selected=true]){color:inherit}.tw\\:data-selected\\:text-muted-foreground\\/50:where([data-selected=true]){color:var(--muted-foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:data-selected\\:text-muted-foreground\\/50:where([data-selected=true]){color:color-mix(in oklab, var(--muted-foreground) 50%, transparent)}}.tw\\:data-selected\\:text-primary-foreground:where([data-selected=true]){color:var(--primary-foreground)}.tw\\:data-selected\\:ring-2:where([data-selected=true]){--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:data-selected\\:ring-primary-foreground\\/70:where([data-selected=true]){--tw-ring-color:var(--primary-foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:data-selected\\:ring-primary-foreground\\/70:where([data-selected=true]){--tw-ring-color:color-mix(in oklab, var(--primary-foreground) 70%, transparent)}}.tw\\:data-selected\\:ring-ring\\/50:where([data-selected=true]){--tw-ring-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.tw\\:data-selected\\:ring-ring\\/50:where([data-selected=true]){--tw-ring-color:color-mix(in oklab, var(--ring) 50%, transparent)}}.tw\\:data-selected\\:ring-inset:where([data-selected=true]){--tw-ring-inset:inset}@media (forced-colors:active){.tw\\:forced-colors\\:data-selected\\:outline-2:where([data-selected=true]){outline-style:var(--tw-outline-style);outline-width:2px}.tw\\:forced-colors\\:data-selected\\:-outline-offset-2:where([data-selected=true]){outline-offset:calc(2px * -1)}.tw\\:forced-colors\\:data-selected\\:outline-\\[color\\:Highlight\\]:where([data-selected=true]){outline-color:highlight}}.tw\\:data-disabled\\:pointer-events-none:where([data-disabled=true]),.tw\\:data-disabled\\:pointer-events-none:where([data-disabled]:not([data-disabled=false])){pointer-events:none}.tw\\:data-disabled\\:cursor-not-allowed:where([data-disabled=true]),.tw\\:data-disabled\\:cursor-not-allowed:where([data-disabled]:not([data-disabled=false])){cursor:not-allowed}.tw\\:data-disabled\\:opacity-50:where([data-disabled=true]),.tw\\:data-disabled\\:opacity-50:where([data-disabled]:not([data-disabled=false])){opacity:.5}.tw\\:data-active\\:bg-background:where([data-state=active]),.tw\\:data-active\\:bg-background:where([data-active]:not([data-active=false])){background-color:var(--background)}.tw\\:data-active\\:bg-sidebar-accent:where([data-state=active]),.tw\\:data-active\\:bg-sidebar-accent:where([data-active]:not([data-active=false])){background-color:var(--sidebar-accent)}.tw\\:data-active\\:font-medium:where([data-state=active]),.tw\\:data-active\\:font-medium:where([data-active]:not([data-active=false])){--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}.tw\\:data-active\\:text-foreground:where([data-state=active]),.tw\\:data-active\\:text-foreground:where([data-active]:not([data-active=false])){color:var(--foreground)}.tw\\:data-active\\:text-sidebar-accent-foreground:where([data-state=active]),.tw\\:data-active\\:text-sidebar-accent-foreground:where([data-active]:not([data-active=false])){color:var(--sidebar-accent-foreground)}.tw\\:group-data-\\[variant\\=default\\]\\/tabs-list\\:data-active\\:shadow-sm:is(:where(.tw\\:group\\/tabs-list)[data-variant=default] *):where([data-state=active]),.tw\\:group-data-\\[variant\\=default\\]\\/tabs-list\\:data-active\\:shadow-sm:is(:where(.tw\\:group\\/tabs-list)[data-variant=default] *):where([data-active]:not([data-active=false])){--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:bg-transparent:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:bg-transparent:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false])){background-color:#0000}.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:shadow-none:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:shadow-none:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false])){--tw-shadow:0 0 #0000;box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}:is(.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:after\\:opacity-100:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:after\\:opacity-100:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false]))):after{content:var(--tw-content);opacity:1}.tw\\:dark\\:data-active\\:border-input:is(.dark *):where([data-state=active]),.tw\\:dark\\:data-active\\:border-input:is(.dark *):where([data-active]:not([data-active=false])){border-color:var(--input)}.tw\\:dark\\:data-active\\:bg-input\\/30:is(.dark *):where([data-state=active]),.tw\\:dark\\:data-active\\:bg-input\\/30:is(.dark *):where([data-active]:not([data-active=false])){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:data-active\\:bg-input\\/30:is(.dark *):where([data-state=active]),.tw\\:dark\\:data-active\\:bg-input\\/30:is(.dark *):where([data-active]:not([data-active=false])){background-color:color-mix(in oklab, var(--input) 30%, transparent)}}.tw\\:dark\\:data-active\\:text-foreground:is(.dark *):where([data-state=active]),.tw\\:dark\\:data-active\\:text-foreground:is(.dark *):where([data-active]:not([data-active=false])){color:var(--foreground)}.tw\\:dark\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:border-transparent:is(.dark *):is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:dark\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:border-transparent:is(.dark *):is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false])){border-color:#0000}.tw\\:dark\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:bg-transparent:is(.dark *):is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:dark\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:bg-transparent:is(.dark *):is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false])){background-color:#0000}.tw\\:data-horizontal\\:mx-px:where([data-orientation=horizontal]){margin-inline:1px}.tw\\:data-horizontal\\:h-1:where([data-orientation=horizontal]){height:calc(calc(var(--spacing)) * 1)}.tw\\:data-horizontal\\:h-full:where([data-orientation=horizontal]){height:100%}.tw\\:data-horizontal\\:h-px:where([data-orientation=horizontal]){height:1px}.tw\\:data-horizontal\\:w-auto:where([data-orientation=horizontal]){width:auto}.tw\\:data-horizontal\\:w-full:where([data-orientation=horizontal]){width:100%}.tw\\:data-horizontal\\:flex-col:where([data-orientation=horizontal]){flex-direction:column}.tw\\:data-vertical\\:my-px:where([data-orientation=vertical]){margin-block:1px}.tw\\:data-vertical\\:h-auto:where([data-orientation=vertical]){height:auto}.tw\\:data-vertical\\:h-full:where([data-orientation=vertical]){height:100%}.tw\\:data-vertical\\:min-h-40:where([data-orientation=vertical]){min-height:calc(calc(var(--spacing)) * 40)}.tw\\:data-vertical\\:w-1:where([data-orientation=vertical]){width:calc(calc(var(--spacing)) * 1)}.tw\\:data-vertical\\:w-auto:where([data-orientation=vertical]){width:auto}.tw\\:data-vertical\\:w-full:where([data-orientation=vertical]){width:100%}.tw\\:data-vertical\\:w-px:where([data-orientation=vertical]){width:1px}.tw\\:data-vertical\\:flex-col:where([data-orientation=vertical]){flex-direction:column}.tw\\:data-vertical\\:items-stretch:where([data-orientation=vertical]){align-items:stretch}.tw\\:data-vertical\\:self-stretch:where([data-orientation=vertical]){align-self:stretch}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:mt-0 [data-lexical-editor=true]>blockquote{margin-top:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:border-s-0 [data-lexical-editor=true]>blockquote{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:ps-0 [data-lexical-editor=true]>blockquote{padding-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:font-normal [data-lexical-editor=true]>blockquote{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:text-foreground [data-lexical-editor=true]>blockquote{color:var(--foreground)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:not-italic [data-lexical-editor=true]>blockquote{font-style:normal}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:mt-0 [data-lexical-editor=\\"true\\"]>blockquote{margin-top:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:border-s-0 [data-lexical-editor=\\"true\\"]>blockquote{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:ps-0 [data-lexical-editor=\\"true\\"]>blockquote{padding-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:font-normal [data-lexical-editor=\\"true\\"]>blockquote{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:text-foreground [data-lexical-editor=\\"true\\"]>blockquote{color:var(--foreground)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:not-italic [data-lexical-editor=\\"true\\"]>blockquote{font-style:normal}.tw\\:\\[\\&_a\\]\\:underline a{text-decoration-line:underline}.tw\\:\\[\\&_a\\]\\:underline-offset-3 a{text-underline-offset:3px}@media (hover:hover){.tw\\:\\[\\&_a\\]\\:hover\\:text-foreground a:hover{color:var(--foreground)}}.tw\\:\\[\\&_p\\]\\:my-0 p{margin-block:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_p\\:not\\(\\:last-child\\)\\]\\:mb-4 p:not(:last-child){margin-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&_s\\]\\:text-destructive s{color:var(--destructive)}.tw\\:\\[\\&_s\\]\\:line-through s{text-decoration-line:line-through}.tw\\:\\[\\&_svg\\]\\:pointer-events-none svg{pointer-events:none}.tw\\:\\[\\&_svg\\]\\:size-4 svg{width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&_svg\\]\\:shrink-0 svg{flex-shrink:0}.tw\\:\\[\\&_svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-3 svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:\\[\\&_svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-3\\.5 svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 3.5);height:calc(calc(var(--spacing)) * 3.5)}.tw\\:\\[\\&_svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-4 svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&_tr\\]\\:border-b tr{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}.tw\\:\\[\\&_tr\\:last-child\\]\\:border-0 tr:last-child{border-style:var(--tw-border-style);border-width:0}.tw\\:\\[\\&_u\\]\\:font-semibold u{--tw-font-weight:var(--tw-font-weight-semibold);font-weight:var(--tw-font-weight-semibold)}.tw\\:\\[\\&_u\\]\\:text-success-foreground u{color:var(--success-foreground)}.tw\\:\\[\\&_u\\]\\:no-underline u{text-decoration-line:none}.tw\\:\\[\\&\\:has\\(\\[role\\=checkbox\\]\\)\\]\\:pe-0:has([role=checkbox]){padding-inline-end:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\.border-b\\]\\:pb-2.border-b{padding-bottom:calc(calc(var(--spacing)) * 2)}.tw\\:\\[\\.border-b\\]\\:pb-4.border-b{padding-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[size\\=sm\\]\\/card\\:\\[\\.border-b\\]\\:pb-3:is(:where(.tw\\:group\\/card)[data-size=sm] *).border-b{padding-bottom:calc(calc(var(--spacing)) * 3)}.tw\\:\\[\\.border-t\\]\\:pt-2.border-t{padding-top:calc(calc(var(--spacing)) * 2)}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:px-2 *)[cmdk-group-heading]{padding-inline:calc(calc(var(--spacing)) * 2)}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:py-1\\.5 *)[cmdk-group-heading]{padding-block:calc(calc(var(--spacing)) * 1.5)}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:text-xs *)[cmdk-group-heading]{font-size:var(--tw-text-xs);line-height:var(--tw-leading,var(--tw-text-xs--line-height))}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:font-medium *)[cmdk-group-heading]{--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:text-muted-foreground *)[cmdk-group-heading]{color:var(--muted-foreground)}:is(.tw\\:\\*\\:\\[a\\]\\:underline>*):is(a){text-decoration-line:underline}:is(.tw\\:\\*\\:\\[a\\]\\:underline-offset-3>*):is(a){text-underline-offset:3px}@media (hover:hover){.tw\\:\\[a\\]\\:hover\\:bg-destructive\\/20:is(a):hover{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:\\[a\\]\\:hover\\:bg-destructive\\/20:is(a):hover{background-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:\\[a\\]\\:hover\\:bg-muted:is(a):hover{background-color:var(--muted)}.tw\\:\\[a\\]\\:hover\\:bg-primary\\/80:is(a):hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:\\[a\\]\\:hover\\:bg-primary\\/80:is(a):hover{background-color:color-mix(in oklab, var(--primary) 80%, transparent)}}.tw\\:\\[a\\]\\:hover\\:bg-secondary\\/80:is(a):hover{background-color:var(--secondary)}@supports (color:color-mix(in lab, red, red)){.tw\\:\\[a\\]\\:hover\\:bg-secondary\\/80:is(a):hover{background-color:color-mix(in oklab, var(--secondary) 80%, transparent)}}.tw\\:\\[a\\]\\:hover\\:text-muted-foreground:is(a):hover{color:var(--muted-foreground)}:is(.tw\\:\\*\\:\\[a\\]\\:hover\\:text-foreground>*):is(a):hover{color:var(--foreground)}}:is(.tw\\:\\*\\:\\[img\\]\\:row-span-2>*):is(img){grid-row:span 2/span 2}:is(.tw\\:\\*\\:\\[img\\]\\:translate-y-0\\.5>*):is(img){--tw-translate-y:calc(calc(var(--spacing)) * .5);translate:var(--tw-translate-x) var(--tw-translate-y)}:is(.tw\\:\\*\\:\\[img\\]\\:text-current>*):is(img){color:currentColor}:is(.tw\\:\\*\\:\\[img\\:first-child\\]\\:rounded-t-xl>*):is(img:first-child){border-top-left-radius:calc(var(--radius) * 1.4);border-top-right-radius:calc(var(--radius) * 1.4)}:is(.tw\\:\\*\\:\\[img\\:last-child\\]\\:rounded-b-xl>*):is(img:last-child){border-bottom-right-radius:calc(var(--radius) * 1.4);border-bottom-left-radius:calc(var(--radius) * 1.4)}:is(.tw\\:\\*\\:\\[img\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-4>*):is(img:not([class*=size-])){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}:is(.tw\\:\\*\\:\\[span\\]\\:last\\:flex>*):is(span):last-child{display:flex}:is(.tw\\:\\*\\:\\[span\\]\\:last\\:items-center>*):is(span):last-child{align-items:center}:is(.tw\\:\\*\\:\\[span\\]\\:last\\:gap-2>*):is(span):last-child{gap:calc(calc(var(--spacing)) * 2)}:is(.tw\\:\\*\\:\\[svg\\]\\:row-span-2>*):is(svg){grid-row:span 2/span 2}:is(.tw\\:\\*\\:\\[svg\\]\\:translate-y-0\\.5>*):is(svg){--tw-translate-y:calc(calc(var(--spacing)) * .5);translate:var(--tw-translate-x) var(--tw-translate-y)}:is(.tw\\:\\*\\:\\[svg\\]\\:text-current>*):is(svg){color:currentColor}:is(.tw\\:focus\\:\\*\\:\\[svg\\]\\:text-accent-foreground:focus>*):is(svg){color:var(--accent-foreground)}:is(.tw\\:data-\\[variant\\=destructive\\]\\:\\*\\:\\[svg\\]\\:text-destructive[data-variant=destructive]>*):is(svg){color:var(--destructive)}:is(.tw\\:data-\\[variant\\=destructive\\]\\:\\*\\:\\[svg\\]\\:text-destructive\\![data-variant=destructive]>*):is(svg){color:var(--destructive)!important}:is(.tw\\:data-selected\\:\\*\\:\\[svg\\]\\:text-foreground:where([data-selected=true])>*):is(svg){color:var(--foreground)}:is(.tw\\:\\*\\:\\[svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-4>*):is(svg:not([class*=size-])){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:rounded-s-none>:not(:first-child){border-start-start-radius:0;border-end-start-radius:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:rounded-t-none>:not(:first-child){border-top-left-radius:0;border-top-right-radius:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:border-s-0>:not(:first-child){border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:border-t-0>:not(:first-child){border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:last-child\\)\\]\\:rounded-e-none>:not(:last-child){border-start-end-radius:0;border-end-end-radius:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:last-child\\)\\]\\:rounded-b-none>:not(:last-child){border-bottom-right-radius:0;border-bottom-left-radius:0}.tw\\:has-\\[select\\[aria-hidden\\=true\\]\\:last-child\\]\\:\\[\\&\\>\\[data-slot\\=select-trigger\\]\\:last-of-type\\]\\:rounded-e-lg:has(:is(select[aria-hidden=true]:last-child))>[data-slot=select-trigger]:last-of-type{border-start-end-radius:var(--radius);border-end-end-radius:var(--radius)}.tw\\:\\[\\&\\>\\[data-slot\\=select-trigger\\]\\:not\\(\\[class\\*\\=w-\\]\\)\\]\\:w-fit>[data-slot=select-trigger]:not([class*=w-]){width:fit-content}.tw\\:\\[\\&\\>\\[data-slot\\]\\:not\\(\\:has\\(\\~\\[data-slot\\]\\)\\)\\]\\:rounded-e-lg\\!>[data-slot]:not(:has(~[data-slot])){border-start-end-radius:var(--radius)!important;border-end-end-radius:var(--radius)!important}.tw\\:\\[\\&\\>\\[data-slot\\]\\:not\\(\\:has\\(\\~\\[data-slot\\]\\)\\)\\]\\:rounded-b-lg\\!>[data-slot]:not(:has(~[data-slot])){border-bottom-right-radius:var(--radius)!important;border-bottom-left-radius:var(--radius)!important}.tw\\:\\[\\&\\>a\\]\\:underline>a{text-decoration-line:underline}.tw\\:\\[\\&\\>a\\]\\:underline-offset-4>a{text-underline-offset:4px}.tw\\:\\[\\&\\>a\\:hover\\]\\:text-primary>a:hover{color:var(--primary)}.tw\\:\\[\\&\\>blockquote\\]\\:my-0>blockquote{margin-block:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&\\>blockquote\\]\\:border-s-0>blockquote{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&\\>blockquote\\]\\:p-0>blockquote{padding:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&\\>blockquote\\]\\:ps-0>blockquote{padding-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&\\>blockquote\\]\\:font-normal>blockquote{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:\\[\\&\\>blockquote\\]\\:text-foreground>blockquote{color:var(--foreground)}.tw\\:\\[\\&\\>blockquote\\]\\:not-italic>blockquote{font-style:normal}.tw\\:\\[\\&\\>input\\]\\:flex-1>input{flex:1}.tw\\:has-\\[\\>\\[data-align\\=block-end\\]\\]\\:\\[\\&\\>input\\]\\:pt-3:has(>[data-align=block-end])>input{padding-top:calc(calc(var(--spacing)) * 3)}.tw\\:has-\\[\\>\\[data-align\\=block-start\\]\\]\\:\\[\\&\\>input\\]\\:pb-3:has(>[data-align=block-start])>input{padding-bottom:calc(calc(var(--spacing)) * 3)}.tw\\:has-\\[\\>\\[data-align\\=inline-end\\]\\]\\:\\[\\&\\>input\\]\\:pe-1\\.5:has(>[data-align=inline-end])>input{padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-\\[\\>\\[data-align\\=inline-start\\]\\]\\:\\[\\&\\>input\\]\\:ps-1\\.5:has(>[data-align=inline-start])>input{padding-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:\\[\\&\\>kbd\\]\\:rounded-\\[calc\\(var\\(--radius\\)-5px\\)\\]>kbd{border-radius:calc(var(--radius) - 5px)}.tw\\:\\[\\&\\>li\\]\\:mt-2>li{margin-top:calc(calc(var(--spacing)) * 2)}.tw\\:\\[\\&\\>span\\:last-child\\]\\:truncate>span:last-child{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.tw\\:\\[\\&\\>svg\\]\\:pointer-events-none>svg{pointer-events:none}.tw\\:\\[\\&\\>svg\\]\\:hidden>svg{display:none}.tw\\:\\[\\&\\>svg\\]\\:size-3\\!>svg{width:calc(calc(var(--spacing)) * 3)!important;height:calc(calc(var(--spacing)) * 3)!important}.tw\\:\\[\\&\\>svg\\]\\:size-3\\.5>svg{width:calc(calc(var(--spacing)) * 3.5);height:calc(calc(var(--spacing)) * 3.5)}.tw\\:\\[\\&\\>svg\\]\\:size-4>svg{width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&\\>svg\\]\\:shrink-0>svg{flex-shrink:0}.tw\\:\\[\\&\\>svg\\]\\:text-sidebar-accent-foreground>svg{color:var(--sidebar-accent-foreground)}.tw\\:group-has-data-\\[size\\=lg\\]\\/avatar-group\\:\\[\\&\\>svg\\]\\:size-5:is(:where(.tw\\:group\\/avatar-group):has([data-size=lg]) *)>svg{width:calc(calc(var(--spacing)) * 5);height:calc(calc(var(--spacing)) * 5)}.tw\\:group-has-data-\\[size\\=sm\\]\\/avatar-group\\:\\[\\&\\>svg\\]\\:size-3:is(:where(.tw\\:group\\/avatar-group):has([data-size=sm]) *)>svg{width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[size\\=default\\]\\/avatar\\:\\[\\&\\>svg\\]\\:size-2:is(:where(.tw\\:group\\/avatar)[data-size=default] *)>svg,.tw\\:group-data-\\[size\\=lg\\]\\/avatar\\:\\[\\&\\>svg\\]\\:size-2:is(:where(.tw\\:group\\/avatar)[data-size=lg] *)>svg{width:calc(calc(var(--spacing)) * 2);height:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[size\\=sm\\]\\/avatar\\:\\[\\&\\>svg\\]\\:hidden:is(:where(.tw\\:group\\/avatar)[data-size=sm] *)>svg,.tw\\:\\[\\&\\>svg\\:last-child\\]\\:hidden>svg:last-child{display:none}.tw\\:\\[\\&\\>svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-3\\.5>svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 3.5);height:calc(calc(var(--spacing)) * 3.5)}.tw\\:\\[\\&\\>svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-4>svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&\\>tr\\]\\:last\\:border-b-0>tr:last-child{border-bottom-style:var(--tw-border-style);border-bottom-width:0}.tw\\:\\[\\&\\[align\\=center\\]\\]\\:text-center[align=center]{text-align:center}.tw\\:\\[\\&\\[align\\=right\\]\\]\\:text-right[align=right]{text-align:right}.tw\\:\\[\\&\\[aria-orientation\\=horizontal\\]\\>div\\]\\:rotate-90[aria-orientation=horizontal]>div{rotate:90deg}[data-side=primary][data-collapsible=offcanvas] .tw\\:\\[\\[data-side\\=primary\\]\\[data-collapsible\\=offcanvas\\]_\\&\\]\\:-end-2{inset-inline-end:calc(calc(var(--spacing)) * -2)}[data-side=primary][data-state=collapsed] .tw\\:\\[\\[data-side\\=primary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-e-resize{cursor:e-resize}[data-side=primary][data-state=collapsed] .tw\\:rtl\\:\\[\\[data-side\\=primary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-w-resize:where(:dir(rtl),[dir=rtl],[dir=rtl] *){cursor:w-resize}[data-side=secondary][data-collapsible=offcanvas] .tw\\:\\[\\[data-side\\=secondary\\]\\[data-collapsible\\=offcanvas\\]_\\&\\]\\:-start-2{inset-inline-start:calc(calc(var(--spacing)) * -2)}[data-side=secondary][data-state=collapsed] .tw\\:\\[\\[data-side\\=secondary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-w-resize{cursor:w-resize}[data-side=secondary][data-state=collapsed] .tw\\:rtl\\:\\[\\[data-side\\=secondary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-e-resize:where(:dir(rtl),[dir=rtl],[dir=rtl] *){cursor:e-resize}}@property --tw-animation-delay{syntax:"*";inherits:false;initial-value:0s}@property --tw-animation-direction{syntax:"*";inherits:false;initial-value:normal}@property --tw-animation-duration{syntax:"*";inherits:false}@property --tw-animation-fill-mode{syntax:"*";inherits:false;initial-value:none}@property --tw-animation-iteration-count{syntax:"*";inherits:false;initial-value:1}@property --tw-enter-blur{syntax:"*";inherits:false;initial-value:0}@property --tw-enter-opacity{syntax:"*";inherits:false;initial-value:1}@property --tw-enter-rotate{syntax:"*";inherits:false;initial-value:0}@property --tw-enter-scale{syntax:"*";inherits:false;initial-value:1}@property --tw-enter-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-enter-translate-y{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-blur{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-opacity{syntax:"*";inherits:false;initial-value:1}@property --tw-exit-rotate{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-scale{syntax:"*";inherits:false;initial-value:1}@property --tw-exit-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-translate-y{syntax:"*";inherits:false;initial-value:0}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-cyrillic-ext-wght-normal.woff2)format("woff2-variations");unicode-range:U+460-52F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-cyrillic-wght-normal.woff2)format("woff2-variations");unicode-range:U+301,U+400-45F,U+490-491,U+4B0-4B1,U+2116}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-greek-wght-normal.woff2)format("woff2-variations");unicode-range:U+370-377,U+37A-37F,U+384-38A,U+38C,U+38E-3A1,U+3A3-3FF}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-vietnamese-wght-normal.woff2)format("woff2-variations");unicode-range:U+102-103,U+110-111,U+128-129,U+168-169,U+1A0-1A1,U+1AF-1B0,U+300-301,U+303-304,U+308-309,U+323,U+329,U+1EA0-1EF9,U+20AB}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-latin-ext-wght-normal.woff2)format("woff2-variations");unicode-range:U+100-2BA,U+2BD-2C5,U+2C7-2CC,U+2CE-2D7,U+2DD-2FF,U+304,U+308,U+329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-latin-wght-normal.woff2)format("woff2-variations");unicode-range:U+??,U+131,U+152-153,U+2BB-2BC,U+2C6,U+2DA,U+2DC,U+304,U+308,U+329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}.light,:root{--radius:.625rem;--spacing:.25rem;--background:oklch(100% 0 0);--foreground:oklch(13.71% .036 258.53);--card:oklch(100% 0 0);--card-foreground:oklch(13.71% .036 258.53);--popover:oklch(98.43% .0018 248.56);--popover-foreground:oklch(13.71% .036 258.53);--primary:oklch(20.79% .0399 265.73);--primary-foreground:oklch(98.38% .0036 248.23);--secondary:oklch(95.89% .011 248.06);--secondary-foreground:oklch(20.79% .0399 265.73);--muted:oklch(95.89% .011 248.06);--muted-foreground:oklch(55.47% .0408 257.45);--accent:oklch(95.89% .011 248.06);--accent-foreground:oklch(20.79% .0399 265.73);--destructive:oklch(63.69% .2077 25.32);--destructive-foreground:oklch(98.38% .0036 248.23);--success-foreground:oklch(62.7% .194 149.214);--diff-deleted:oklch(57.7% .245 27.325);--warning:oklch(84% .16 84);--warning-foreground:oklch(28% .07 46);--border:oklch(92.9% .0127 255.58);--input:oklch(92.9% .0127 255.58);--ring:oklch(13.71% .036 258.53);--chart-1:oklch(64.6% .222 41.116);--chart-2:oklch(60% .118 184.704);--chart-3:oklch(39.8% .07 227.392);--chart-4:oklch(82.8% .189 84.429);--chart-5:oklch(76.9% .188 70.08);--sidebar:oklch(98.43% .0018 248.56);--sidebar-foreground:oklch(13.71% .036 258.53);--sidebar-primary:oklch(20.79% .0399 265.73);--sidebar-primary-foreground:oklch(98.38% .0036 248.23);--sidebar-accent:oklch(95.89% .011 248.06);--sidebar-accent-foreground:oklch(20.79% .0399 265.73);--sidebar-border:oklch(92.9% .0127 255.58);--sidebar-ring:oklch(13.71% .036 258.53)}.dark{--background:oklch(13.71% .036 258.53);--foreground:oklch(98.38% .0036 248.23);--card:oklch(13.71% .036 258.53);--card-foreground:oklch(98.38% .0036 248.23);--popover:oklch(13.71% .036 258.53);--popover-foreground:oklch(98.38% .0036 248.23);--primary:oklch(98.38% .0036 248.23);--primary-foreground:oklch(20.79% .0399 265.73);--secondary:oklch(28% .037 259.98);--secondary-foreground:oklch(98.38% .0036 248.23);--muted:oklch(28% .037 259.98);--muted-foreground:oklch(71.07% .0351 256.8);--accent:oklch(28% .037 259.98);--accent-foreground:oklch(98.38% .0036 248.23);--destructive:oklch(39.6% .1331 25.71);--destructive-foreground:oklch(98.38% .0036 248.23);--success-foreground:oklch(79.2% .209 151.711);--diff-deleted:oklch(70.4% .191 22.216);--warning:oklch(41% .11 46);--warning-foreground:oklch(99% .02 95);--border:oklch(44.54% .0374 257.3);--input:oklch(44.54% .0374 257.3);--ring:oklch(86.88% .0199 252.89);--chart-1:oklch(48.8% .243 264.376);--chart-2:oklch(69.6% .17 162.48);--chart-3:oklch(76.9% .188 70.08);--chart-4:oklch(62.7% .265 303.9);--chart-5:oklch(64.5% .246 16.439);--sidebar:oklch(13.71% .036 258.53);--sidebar-foreground:oklch(71.07% .0351 256.8);--sidebar-primary:oklch(98.38% .0036 248.23);--sidebar-primary-foreground:oklch(20.79% .0399 265.73);--sidebar-accent:oklch(28% .037 259.98);--sidebar-accent-foreground:oklch(71.07% .0351 256.8);--sidebar-border:oklch(28% .037 259.98);--sidebar-ring:oklch(86.88% .0199 252.89)}.paratext-light{--background:oklch(100% 0 0);--foreground:oklch(15.3% .006 107.1);--card:oklch(100% 0 0);--card-foreground:oklch(15.3% .006 107.1);--popover:oklch(100% 0 0);--popover-foreground:oklch(15.3% .006 107.1);--primary:oklch(55.5% .163 48.998);--primary-foreground:oklch(98.7% .022 95.277);--secondary:oklch(96.7% .001 286.375);--secondary-foreground:oklch(21% .006 285.885);--muted:oklch(96.6% .005 106.5);--muted-foreground:oklch(58% .031 107.3);--accent:oklch(96.6% .005 106.5);--accent-foreground:oklch(22.8% .013 107.4);--destructive:oklch(57.7% .245 27.325);--destructive-foreground:oklch(98.38% .0036 248.23);--success-foreground:oklch(62.7% .194 149.214);--diff-deleted:oklch(57.7% .245 27.325);--warning:oklch(84% .16 84);--warning-foreground:oklch(28% .07 46);--border:oklch(93% .007 106.5);--input:oklch(93% .007 106.5);--ring:oklch(73.7% .021 106.9);--chart-1:oklch(88% .011 106.6);--chart-2:oklch(58% .031 107.3);--chart-3:oklch(46.6% .025 107.3);--chart-4:oklch(39.4% .023 107.4);--chart-5:oklch(28.6% .016 107.4);--sidebar:oklch(98.8% .003 106.5);--sidebar-foreground:oklch(15.3% .006 107.1);--sidebar-primary:oklch(66.6% .179 58.318);--sidebar-primary-foreground:oklch(98.7% .022 95.277);--sidebar-accent:oklch(96.6% .005 106.5);--sidebar-accent-foreground:oklch(22.8% .013 107.4);--sidebar-border:oklch(93% .007 106.5);--sidebar-ring:oklch(73.7% .021 106.9)}.paratext-dark{--background:oklch(15.3% .006 107.1);--foreground:oklch(98.8% .003 106.5);--card:oklch(22.8% .013 107.4);--card-foreground:oklch(98.8% .003 106.5);--popover:oklch(22.8% .013 107.4);--popover-foreground:oklch(98.8% .003 106.5);--primary:oklch(47.3% .137 46.201);--primary-foreground:oklch(98.7% .022 95.277);--secondary:oklch(27.4% .006 286.033);--secondary-foreground:oklch(98.5% 0 0);--muted:oklch(28.6% .016 107.4);--muted-foreground:oklch(73.7% .021 106.9);--accent:oklch(28.6% .016 107.4);--accent-foreground:oklch(98.8% .003 106.5);--destructive:oklch(70.4% .191 22.216);--destructive-foreground:oklch(98.38% .0036 248.23);--success-foreground:oklch(79.2% .209 151.711);--diff-deleted:oklch(70.4% .191 22.216);--warning:oklch(41% .11 46);--warning-foreground:oklch(99% .02 95);--border:oklch(100% 0 0/.1);--input:oklch(100% 0 0/.15);--ring:oklch(58% .031 107.3);--chart-1:oklch(88% .011 106.6);--chart-2:oklch(58% .031 107.3);--chart-3:oklch(46.6% .025 107.3);--chart-4:oklch(39.4% .023 107.4);--chart-5:oklch(28.6% .016 107.4);--sidebar:oklch(22.8% .013 107.4);--sidebar-foreground:oklch(98.8% .003 106.5);--sidebar-primary:oklch(76.9% .188 70.08);--sidebar-primary-foreground:oklch(27.9% .077 45.635);--sidebar-accent:oklch(28.6% .016 107.4);--sidebar-accent-foreground:oklch(98.8% .003 106.5);--sidebar-border:oklch(100% 0 0/.1);--sidebar-ring:oklch(58% .031 107.3)}@property --tw-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-y{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-z{syntax:"*";inherits:false;initial-value:0}@property --tw-rotate-x{syntax:"*";inherits:false}@property --tw-rotate-y{syntax:"*";inherits:false}@property --tw-rotate-z{syntax:"*";inherits:false}@property --tw-skew-x{syntax:"*";inherits:false}@property --tw-skew-y{syntax:"*";inherits:false}@property --tw-space-y-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-space-x-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-divide-x-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-border-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-divide-y-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-gradient-position{syntax:"*";inherits:false}@property --tw-gradient-from{syntax:"<color>";inherits:false;initial-value:#0000}@property --tw-gradient-via{syntax:"<color>";inherits:false;initial-value:#0000}@property --tw-gradient-to{syntax:"<color>";inherits:false;initial-value:#0000}@property --tw-gradient-stops{syntax:"*";inherits:false}@property --tw-gradient-via-stops{syntax:"*";inherits:false}@property --tw-gradient-from-position{syntax:"<length-percentage>";inherits:false;initial-value:0%}@property --tw-gradient-via-position{syntax:"<length-percentage>";inherits:false;initial-value:50%}@property --tw-gradient-to-position{syntax:"<length-percentage>";inherits:false;initial-value:100%}@property --tw-leading{syntax:"*";inherits:false}@property --tw-font-weight{syntax:"*";inherits:false}@property --tw-tracking{syntax:"*";inherits:false}@property --tw-ordinal{syntax:"*";inherits:false}@property --tw-slashed-zero{syntax:"*";inherits:false}@property --tw-numeric-figure{syntax:"*";inherits:false}@property --tw-numeric-spacing{syntax:"*";inherits:false}@property --tw-numeric-fraction{syntax:"*";inherits:false}@property --tw-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-shadow-color{syntax:"*";inherits:false}@property --tw-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-inset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-shadow-color{syntax:"*";inherits:false}@property --tw-inset-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-ring-color{syntax:"*";inherits:false}@property --tw-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-ring-color{syntax:"*";inherits:false}@property --tw-inset-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-ring-inset{syntax:"*";inherits:false}@property --tw-ring-offset-width{syntax:"<length>";inherits:false;initial-value:0}@property --tw-ring-offset-color{syntax:"*";inherits:false;initial-value:#fff}@property --tw-ring-offset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-blur{syntax:"*";inherits:false}@property --tw-brightness{syntax:"*";inherits:false}@property --tw-contrast{syntax:"*";inherits:false}@property --tw-grayscale{syntax:"*";inherits:false}@property --tw-hue-rotate{syntax:"*";inherits:false}@property --tw-invert{syntax:"*";inherits:false}@property --tw-opacity{syntax:"*";inherits:false}@property --tw-saturate{syntax:"*";inherits:false}@property --tw-sepia{syntax:"*";inherits:false}@property --tw-drop-shadow{syntax:"*";inherits:false}@property --tw-drop-shadow-color{syntax:"*";inherits:false}@property --tw-drop-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-drop-shadow-size{syntax:"*";inherits:false}@property --tw-duration{syntax:"*";inherits:false}@property --tw-ease{syntax:"*";inherits:false}@property --tw-content{syntax:"*";inherits:false;initial-value:""}@property --tw-outline-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-backdrop-blur{syntax:"*";inherits:false}@property --tw-backdrop-brightness{syntax:"*";inherits:false}@property --tw-backdrop-contrast{syntax:"*";inherits:false}@property --tw-backdrop-grayscale{syntax:"*";inherits:false}@property --tw-backdrop-hue-rotate{syntax:"*";inherits:false}@property --tw-backdrop-invert{syntax:"*";inherits:false}@property --tw-backdrop-opacity{syntax:"*";inherits:false}@property --tw-backdrop-saturate{syntax:"*";inherits:false}@property --tw-backdrop-sepia{syntax:"*";inherits:false}@keyframes spin{to{transform:rotate(360deg)}}@keyframes pulse{50%{opacity:.5}}@keyframes enter{0%{opacity:var(--tw-enter-opacity,1);transform:translate3d(var(--tw-enter-translate-x,0),var(--tw-enter-translate-y,0),0)scale3d(var(--tw-enter-scale,1),var(--tw-enter-scale,1),var(--tw-enter-scale,1))rotate(var(--tw-enter-rotate,0));filter:blur(var(--tw-enter-blur,0))}}@keyframes exit{to{opacity:var(--tw-exit-opacity,1);transform:translate3d(var(--tw-exit-translate-x,0),var(--tw-exit-translate-y,0),0)scale3d(var(--tw-exit-scale,1),var(--tw-exit-scale,1),var(--tw-exit-scale,1))rotate(var(--tw-exit-rotate,0));filter:blur(var(--tw-exit-blur,0))}}
`, "after-all");
export {
  wf as Alert,
  uf as AlertDescription,
  pf as AlertTitle,
  Gw as Avatar,
  qw as AvatarFallback,
  yh as AvatarImage,
  sh as BOOK_CHAPTER_CONTROL_STRING_KEYS,
  ch as BOOK_SELECTOR_STRING_KEYS,
  Hr as Badge,
  Ha as BookChapterControl,
  ho as BookSelectionMode,
  lh as BookSelector,
  J as Button,
  Ss as ButtonGroup,
  Rs as ButtonGroupSeparator,
  hf as ButtonGroupText,
  jn as CANCEL_ACCEPT_BUTTONS_STRING_KEYS,
  hh as COMMENT_EDITOR_STRING_KEYS,
  Uw as COMMENT_LIST_ELEMENT_ID,
  gh as COMMENT_LIST_STRING_KEYS,
  uh as CONFLICT_NOTE_STRING_KEYS,
  Hi as CONTENT_ZOOM_LABEL_ATTRIBUTE,
  Ki as CONTENT_ZOOM_ROOT_ATTRIBUTE,
  dh as CONTENT_ZOOM_SCOPE_ATTRIBUTE,
  zs as CancelAcceptButtons,
  Kw as Card,
  Hw as CardContent,
  bh as CardDescription,
  xh as CardFooter,
  mh as CardHeader,
  vh as CardTitle,
  Nd as ChapterRangeSelector,
  os as Checkbox,
  mg as CheckboxGroup,
  Tp as Checklist,
  gn as ComboBox,
  Sr as Command,
  yo as CommandEmpty,
  mr as CommandGroup,
  xo as CommandInput,
  ar as CommandItem,
  Rr as CommandList,
  ph as CommentEditor,
  kh as CommentList,
  Xw as ConflictNoteCard,
  au as ContentZoomRoot,
  wh as ContentZoomTextProvider,
  kg as ContextMenu,
  Dg as ContextMenuCheckboxItem,
  Sg as ContextMenuContent,
  Ng as ContextMenuGroup,
  Rg as ContextMenuItem,
  Ig as ContextMenuLabel,
  Cg as ContextMenuPortal,
  Tg as ContextMenuRadioGroup,
  Mg as ContextMenuRadioItem,
  Pg as ContextMenuSeparator,
  $g as ContextMenuShortcut,
  Eg as ContextMenuSub,
  zg as ContextMenuSubContent,
  Og as ContextMenuSubTrigger,
  _g as ContextMenuTrigger,
  lu as DataTable,
  vg as DestructiveKeyConfirmation,
  ao as Dialog,
  gf as DialogClose,
  oo as DialogContent,
  ff as DialogDescription,
  Xo as DialogFooter,
  no as DialogHeader,
  mf as DialogOverlay,
  vf as DialogPortal,
  io as DialogTitle,
  bf as DialogTrigger,
  tp as DisabledActionTooltip,
  Yr as DisabledTooltipWrapper,
  Ag as Drawer,
  Lg as DrawerClose,
  Bg as DrawerContent,
  Kg as DrawerDescription,
  Fg as DrawerFooter,
  jg as DrawerHeader,
  Op as DrawerOverlay,
  Rp as DrawerPortal,
  Ug as DrawerTitle,
  Vg as DrawerTrigger,
  or as DropdownMenu,
  Fn as DropdownMenuCheckboxItem,
  nr as DropdownMenuContent,
  Un as DropdownMenuGroup,
  je as DropdownMenuItem,
  uu as DropdownMenuItemType,
  Zr as DropdownMenuLabel,
  qs as DropdownMenuPortal,
  Ms as DropdownMenuRadioGroup,
  Is as DropdownMenuRadioItem,
  vr as DropdownMenuSeparator,
  Ks as DropdownMenuShortcut,
  Gs as DropdownMenuSub,
  Ws as DropdownMenuSubContent,
  Hs as DropdownMenuSubTrigger,
  Ke as DropdownMenuTrigger,
  du as ERROR_DUMP_STRING_KEYS,
  Eh as ERROR_POPOVER_STRING_KEYS,
  xf as EditorKeyboardShortcuts,
  yf as Empty,
  kf as EmptyContent,
  _f as EmptyDescription,
  Nf as EmptyHeader,
  Cf as EmptyMedia,
  Ef as EmptyState,
  Tf as EmptyTitle,
  wu as ErrorDump,
  Th as ErrorPopover,
  Dh as FOOTNOTE_EDITOR_STRING_KEYS,
  zh as Filter,
  Sh as FilterDropdown,
  Oh as Footer,
  Sf as FootnoteEditor,
  xu as FootnoteItem,
  Mh as FootnoteList,
  Rf as INLINE_APPLY_DEBOUNCE_MS,
  gg as INTERFACE_LANGUAGE_PICKER_STRING_KEYS,
  Bh as INVENTORY_STRING_KEYS,
  Eo as Input,
  fg as InterfaceLanguagePicker,
  jh as Inventory,
  Qs as Kbd,
  Of as KbdGroup,
  gt as Label,
  $s as MARKER_MENU_STRING_KEYS,
  Ch as MarkdownRenderer,
  zf as MarkerMenu,
  Rh as MoreInfo,
  Ps as MultiSelectComboBox,
  wg as NavigationContentSearch,
  Cr as Popover,
  Df as PopoverAnchor,
  Tr as PopoverContent,
  Mf as PopoverDescription,
  If as PopoverHeader,
  Ba as PopoverPortalContainerProvider,
  Pf as PopoverTitle,
  Er as PopoverTrigger,
  Hg as Progress,
  ko as RadioGroup,
  ka as RadioGroupItem,
  ud as RecentSearches,
  $f as ResizableHandle,
  Af as ResizablePanel,
  Vf as ResizablePanelGroup,
  bg as ResultsCard,
  Lf as RetryableErrorView,
  ag as SCOPE_SELECTOR_STRING_KEYS,
  ap as SELECT_BOOKS_STRING_KEYS,
  Ur as SHRINK_STEP,
  og as ScopeSelector,
  rg as ScriptureResultsViewer,
  ng as ScrollGroupSelector,
  Hn as SearchBar,
  yr as Select,
  rp as SelectBooks,
  Qu as SelectBooksPicker,
  Nr as SelectContent,
  nu as SelectGroup,
  oe as SelectItem,
  _h as SelectLabel,
  su as SelectScrollDownButton,
  iu as SelectScrollUpButton,
  Nh as SelectSeparator,
  _r as SelectTrigger,
  kr as SelectValue,
  Gr as Separator,
  ig as SettingsList,
  cg as SettingsListHeader,
  sg as SettingsListItem,
  Hu as SettingsSidebar,
  eg as SettingsSidebarContentSearch,
  Da as ShrinkStepContext,
  sf as ShrinkStepOverride,
  bi as ShrinkStepOverrideContext,
  Vu as Sidebar,
  Bu as SidebarContent,
  Gh as SidebarFooter,
  Mn as SidebarGroup,
  Wh as SidebarGroupAction,
  Pn as SidebarGroupContent,
  In as SidebarGroupLabel,
  Hh as SidebarHeader,
  Kh as SidebarInput,
  Lu as SidebarInset,
  ju as SidebarMenu,
  Yh as SidebarMenuAction,
  Zh as SidebarMenuBadge,
  Ku as SidebarMenuButton,
  Fu as SidebarMenuItem,
  Xh as SidebarMenuSkeleton,
  Jh as SidebarMenuSub,
  tg as SidebarMenuSubButton,
  Qh as SidebarMenuSubItem,
  Au as SidebarProvider,
  Uh as SidebarRail,
  qh as SidebarSeparator,
  Fh as SidebarTrigger,
  pr as Skeleton,
  qg as Slider,
  Gg as Sonner,
  Bf as Spinner,
  Wg as Switch,
  cf as TOOLTIP_DELAY_MS,
  vo as TabDropdownMenu,
  dg as TabFloatingMenu,
  lg as TabToolbar,
  _o as Table,
  Co as TableBody,
  jf as TableCaption,
  hr as TableCell,
  Ff as TableFooter,
  _a as TableHead,
  No as TableHeader,
  Fe as TableRow,
  Yg as Tabs,
  Jg as TabsContent,
  Zg as TabsList,
  Xg as TabsTrigger,
  xg as TextField,
  nh as Textarea,
  Ui as ToggleGroup,
  ma as ToggleGroupItem,
  pg as Toolbar,
  cd as ToolbarCompoundLabel,
  vt as Tooltip,
  xt as TooltipContent,
  Uf as TooltipPortalContainerProvider,
  Qt as TooltipProvider,
  bt as TooltipTrigger,
  As as UNDO_REDO_BUTTONS_STRING_KEYS,
  hg as UiLanguageSelector,
  Kf as UndoRedoButtons,
  hs as VerticalTabs,
  fs as VerticalTabsContent,
  gs as VerticalTabsList,
  lp as VerticalTabsTrigger,
  yg as WizardStepper,
  Me as Z_INDEX_ABOVE_DOCK,
  Hf as Z_INDEX_ABOVE_POPOVER,
  Gf as Z_INDEX_CONNECTION_LOST,
  qf as Z_INDEX_FIRST_RUN,
  Wf as Z_INDEX_MODAL,
  Yf as Z_INDEX_MODAL_BACKDROP,
  Zf as Z_INDEX_NESTED_MODAL,
  Xf as Z_INDEX_NESTED_MODAL_BACKDROP,
  Jf as Z_INDEX_ONBOARDING_TOUR,
  Qf as Z_INDEX_OVERLAY,
  tm as badgeVariants,
  em as buttonGroupVariants,
  rm as buttonVariants,
  v as cn,
  Lh as getBookIdFromUSFM,
  fu as getCaretPositionFromClick,
  fh as getCommentThreadElementId,
  Ia as getInventoryHeader,
  Ah as getLinesFromUSFM,
  Vh as getNumberFromUSFM,
  Ru as getStatusForItem,
  ug as getToolbarOSReservedSpaceClassName,
  Ph as inventoryCountColumn,
  Ih as inventoryItemColumn,
  $h as inventoryStatusColumn,
  Tn as isCommentDraftEmpty,
  is as isGroupUnderColumnOrSubMenu,
  Os as isMacOs,
  am as isUnclosedNoteOp,
  om as isWindows,
  nm as leftEdgeRect,
  Jt as localizeOrFallback,
  im as measureBox,
  Pp as pickTabIconUrl,
  dm as sonner,
  Dr as useContentZoomTextProps,
  Qg as useEvent,
  tf as useEventAsync,
  af as useExtraValidMarkers,
  sm as useHasContentBelow,
  Ds as useListbox,
  cm as useLivePopoverAnchor,
  Mp as usePromise,
  ih as useRecentSearches,
  ef as useRetryablePromise,
  of as useRunWhenVisible,
  us as useShrinkStep,
  xi as useShrinkStepOverride,
  sd as useShrinkStepValue,
  $a as useSidebar,
  rf as useStylesheet,
  nf as useTabIconSelection,
  Zo as useTruncationTooltip,
  Ip as useViewVisibility
};
//# sourceMappingURL=index.js.map
