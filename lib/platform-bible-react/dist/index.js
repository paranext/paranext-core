var cs = Object.defineProperty;
var ls = (t, e, r) => e in t ? cs(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var Ht = (t, e, r) => ls(t, typeof e != "symbol" ? e + "" : e, r);
import { c as m, g as fe, a as Tr, C as ke, T as St, b as It, d as Rt, e as Dt, A as de, P as Pe, f as De, B as Z, h as $e, i as Ae, j as je, k as be, x as ds, l as ws, m as us, I as ps, n as ho, r as _e, o as hs, p as zn, q as Pr, s as $r, L as Tt, R as go, t as na, D as Ua, u as Ha, v as Ka, w as qa, y as On, z as Xr, E as fo, F as Mn, G as mo, H as ar, J as ze, K as Le, M as Be, N as Ve, S as Dr, O as wr, Q as gs, U as or, V as Ye, W as Se, Z as Xe, X as Ke, Y as ur, _ as vo, $ as bo, a0 as ia, a1 as xo, a2 as Pn, a3 as $n, a4 as Ya, a5 as fs, a6 as Wa, a7 as An, a8 as pa, a9 as ms, aa as yo, ab as vs, ac as bs, ad as xs, ae as Lo, af as ys, ag as ks, ah as Jr, ai as _s, aj as jn, ak as Ln, al as ko, am as Ns, an as Bn, ao as Sa, ap as Bo, aq as Cs, ar as Es, as as Ts, at as Ss, au as Is, av as Ar, aw as _o, ax as Rs, ay as Ds } from "./resizable-B1exdhUM.js";
import { az as Qg, aA as tf, aB as ef, aC as rf, aD as af, aE as of, aF as nf, aG as sf, aH as cf, aI as lf, aJ as df, aK as wf, aL as uf, aM as pf, aN as hf, aO as gf, aP as ff, aQ as mf, aR as vf, aS as bf, aT as xf, aU as yf, aV as kf, aW as _f, aX as Nf, aY as Cf, aZ as Ef, a_ as Tf, a$ as Sf, b0 as If, b1 as Rf, b2 as Df, b3 as zf, b4 as Of, b5 as Mf, b6 as Pf } from "./resizable-B1exdhUM.js";
import { jsx as a, jsxs as u, Fragment as it } from "react/jsx-runtime";
import { Canon as Pt } from "@sillsdev/scripture";
import { Check as Oe, Clock as Vo, ChevronsLeft as Go, ChevronsRight as Fo, ChevronLeft as Xa, ChevronRight as Ja, ArrowLeft as zs, ArrowRight as Vn, ChevronDown as nr, BoldIcon as Os, ItalicIcon as Ms, X as No, AtSign as Gn, Pencil as Ps, Trash2 as $s, ArrowUp as Fn, MoreHorizontal as As, MailOpen as js, Mail as Ls, ChevronUp as Bs, FilterIcon as Vs, ArrowLeftIcon as Gs, ChevronLeftIcon as Fs, ChevronRightIcon as Us, ArrowRightIcon as Hs, Copy as Un, Filter as Hn, User as Ks, Link as qs, CircleHelp as Ys, Undo as Ws, Redo as Xs, SquareX as Kn, FunctionSquare as qn, SquareSigma as Yn, Ban as Js, AlertCircle as Za, CircleCheckIcon as Zs, CircleXIcon as Qs, CircleHelpIcon as tc, ArrowUpIcon as ec, ArrowDownIcon as rc, Loader2 as ac, ChevronsUpDown as Wn, ScrollText as oc, MenuIcon as nc, Menu as ic, EllipsisVertical as sc, MoreVertical as cc } from "lucide-react";
import { Section as Et, getChaptersForBook as lc, formatScrRef as Ie, formatReplacementString as qe, getSectionForBook as Zr, formatRelativeDate as dc, sanitizeHtml as Co, NumberFormat as Xn, formatBytes as wc, getCurrentLocale as uc, usfmMarkers as Qr, isPlatformError as pc, ABORTED as hc, getErrorMessage as gc, getFormatCallerFunction as fc, deepEqual as mc, isString as Uo, normalizeProjectId as ve, getLocalizeKeyForScrollGroupId as Qa, compareScrRefs as to, scrRefToBBBCCCVVV as Ia, defaultScrRef as Ra, formatScrRefRange as vc, formatReplacementStringToArray as Ho, collectUsjMarkers as bc } from "platform-bible-utils";
import Yt, { useRef as K, useMemo as $, createContext as jr, useContext as ha, useState as N, useCallback as B, useEffect as J, useImperativeHandle as xc, useLayoutEffect as ee, Component as yc, createElement as Ko, Suspense as kc, forwardRef as Jn, useId as qo, Fragment as Lr } from "react";
import { IconSelector as Zn, IconCheck as ga, IconChevronDown as _c, IconChevronUp as Nc, IconLayoutSidebar as Cc, IconLayoutSidebarRight as Ec, IconChevronRight as Qn, IconSearch as Tc, IconLoader as Sc, IconAlertOctagon as Ic, IconAlertTriangle as Rc, IconInfoCircle as Dc, IconCircleCheck as zc } from "@tabler/icons-react";
import { createEditor as ti, $getRoot as We, $createParagraphNode as Br, $getSelection as re, HISTORY_MERGE_TAG as Eo, ParagraphNode as ei, TextNode as ri, $getPreviousSelection as Oc, $isRangeSelection as xe, $caretFromPoint as Mc, $getSiblingCaret as ai, $getChildCaret as Pc, $getAdjacentChildCaret as $c, $isChildCaret as Ac, $normalizeCaret as jc, $setSelectionFromCaretRange as Lc, $getCollapsedCaretRange as Bc, $getCaretInDirection as Yo, $splitAtPointCaretNext as Vc, $isTextPointCaret as Gc, $findMatchingParent as oi, $isElementNode as zr, mergeRegister as Me, getDOMTextNode as Fc, isHTMLElement as Uc, CLEAR_EDITOR_COMMAND as ni, COMMAND_PRIORITY_EDITOR as To, shallowMergeConfig as Hc, defineExtension as se, safeCast as ir, createState as Kc, FORMAT_TEXT_COMMAND as ii, $isNodeSelection as si, COMMAND_PRIORITY_LOW as ci, RootNode as qc, LineBreakNode as Yc, TabNode as Wc, $isEditorState as Xc, createCommand as Jc, CLICK_COMMAND as Zc, isDOMNode as Qc, $getNodeFromDOMNode as tl, $createNodeSelection as el, $setSelection as rl, $getEditor as al, DecoratorNode as eo, $getState as ol, toggleTextFormatType as Wo, TEXT_TYPE_TO_FORMAT as nl, $setState as il, addClassNamesToElement as li, $create as sl, $getNodeByKey as cl, removeClassNamesFromElement as ll, KEY_TAB_COMMAND as dl, $isBlockElementNode as wl, $createRangeSelection as ul, $normalizeSelection__EXPERIMENTAL as pl, OUTDENT_CONTENT_COMMAND as hl, INDENT_CONTENT_COMMAND as Xo, INSERT_TAB_COMMAND as gl, COMMAND_PRIORITY_CRITICAL as So, $isDecoratorNode as fl, $isParagraphNode as ml, $isTextNode as ro, SELECTION_CHANGE_COMMAND as di, $insertNodes as vl } from "lexical";
import { HeadingNode as bl, QuoteNode as xl, registerRichText as yl } from "@lexical/rich-text";
import { flushSync as kl, createPortal as _l } from "react-dom";
import { $isTableSelection as Nl } from "@lexical/table";
import { createHeadlessEditor as wi } from "@lexical/headless";
import { $generateHtmlFromNodes as Cl, $generateNodesFromDOM as El } from "@lexical/html";
import { Avatar as Io, Select as Wt, Checkbox as Jo, Slot as Vr, Tabs as we, Menubar as Ne, ContextMenu as $t, Progress as Zo, Slider as Hr, Switch as Qo } from "radix-ui";
import { useReactTable as ui, getFilteredRowModel as Tl, getSortedRowModel as pi, getPaginationRowModel as Sl, getCoreRowModel as hi, flexRender as Sr, getGroupedRowModel as Il, getExpandedRowModel as Rl } from "@tanstack/react-table";
import Dl from "markdown-to-jsx";
import { GENERATOR_NOTE_CALLER as ao, HIDDEN_NOTE_CALLER as oo, getDefaultViewOptions as zl, isInsertEmbedOpOfType as Nr, getMarkerMenuItems as Ol, defaultStyleInfo as Ml, Editorial as Pl } from "@eten-tech-foundation/platform-editor";
import { cva as gi } from "class-variance-authority";
import { useHotkeys as $l } from "react-hotkeys-hook";
import { Drawer as Je } from "vaul";
import { useTheme as Al } from "next-themes";
import { Toaster as jl } from "sonner";
import { toast as Af } from "sonner";
function Xp({ className: t, ...e }) {
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
function fi({
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
  disabled: w = !1,
  dimmedReason: h,
  dimmedDescription: p
}) {
  const g = K(!1), f = () => {
    w || (g.current || o == null || o(e), setTimeout(() => {
      g.current = !1;
    }, 100));
  }, b = (I) => {
    if (w) {
      I.preventDefault();
      return;
    }
    g.current = !0, n ? n(I) : o == null || o(e);
  }, v = $(
    () => fe(e, l),
    [e, l]
  ), D = $(
    () => Tr(e, l),
    [e, l]
  ), k = !!h && !w, T = `${v} (${D})`, R = k ? p || `${T}, ${h}` : T, M = /* @__PURE__ */ u(
    ke,
    {
      ref: t,
      value: d || `${e} ${Pt.bookIdToEnglishName(e)}`,
      onSelect: f,
      onMouseDown: b,
      role: "option",
      "aria-selected": r,
      "aria-disabled": w || void 0,
      "aria-label": R,
      disabled: w,
      className: m(
        s,
        w && "tw:cursor-not-allowed tw:opacity-50",
        // Mirrors NumberedItemGrid's dimmed-vs-disabled split — same tokens, so chapter/verse cells
        // and book rows grey identically inside one popover: dimmed is presentation only, so it
        // never sets aria-disabled or blocks onSelect, and it yields to disabled.
        k && "tw:bg-muted/50 tw:text-muted-foreground/50"
      ),
      children: [
        c && /* @__PURE__ */ a(
          Oe,
          {
            className: m(
              "tw:me-2 tw:h-4 tw:w-4 tw:shrink-0",
              r ? "tw:opacity-100" : "tw:opacity-0"
            )
          }
        ),
        /* @__PURE__ */ a("span", { className: "tw:min-w-0 tw:flex-1", children: v }),
        k && // Visible rather than hover-only: cmdk never moves DOM focus onto an item (the input keeps
        // it and highlights via data-selected), so a tooltip would never open for a keyboard user.
        // Rendered text also survives the highlight, which recolours the row.
        /* @__PURE__ */ a("span", { className: "tw:ms-2 tw:shrink-0 tw:text-xs tw:italic", children: h }),
        /* @__PURE__ */ a(
          "span",
          {
            className: m(
              "tw:ms-2 tw:shrink-0 tw:text-xs",
              // Inherits the row's dimmed colour instead of setting its own, so the whole row dims
              // evenly rather than leaving the id at full strength beside a dimmed name.
              !k && "tw:text-muted-foreground"
            ),
            children: D
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
          "tw:border-s-red-200": i === Et.OT,
          "tw:border-s-purple-200": i === Et.NT,
          "tw:border-s-indigo-200": i === Et.DC,
          "tw:border-s-amber-200": i === Et.Extra
        }
      ),
      children: M
    }
  );
}
const Ir = Object.freeze({
  /** Full labels. */
  WIDE: 0,
  /** Abbreviated primary label form. */
  TIGHT: 1,
  /** Secondary field clipped with an ellipsis — CSS does this on its own. */
  TIGHTER: 2,
  /** Secondary field dropped entirely; primary field alone. */
  MINIMUM: 3
}), fa = jr(Ir.WIDE);
function Ll() {
  return ha(fa);
}
const mi = jr(void 0);
function vi() {
  return ha(mi);
}
function no() {
  const [t, e] = N(!1), r = K(null), o = B(() => {
    const i = r.current;
    i && i.scrollWidth > i.clientWidth && e(!0);
  }, []), n = B(() => e(!1), []);
  return { ref: r, open: t, onPointerEnter: o, onPointerLeave: n };
}
let io = "keyboard", tn = !1;
function Bl() {
  tn || typeof document > "u" || (tn = !0, document.addEventListener(
    "pointerdown",
    () => {
      io = "pointer";
    },
    !0
  ), document.addEventListener(
    "keydown",
    () => {
      io = "keyboard";
    },
    !0
  ));
}
function Vl({
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
    ref: l,
    open: d,
    onPointerEnter: w,
    onPointerLeave: h
  } = no(), {
    ref: p,
    open: g,
    onPointerEnter: f,
    onPointerLeave: b
  } = no(), [v, D] = N(!1), [k, T] = N(!1), R = K(
    // React's ref API requires `null` as the initial value for DOM refs.
    // eslint-disable-next-line no-null/no-null
    null
  ), M = n && e !== void 0, I = i ?? (e !== void 0 && !n);
  J(() => {
    var C;
    Bl();
    const E = (C = R.current) == null ? void 0 : C.closest('button, [role="combobox"], [tabindex]');
    if (!E) return;
    const x = (U) => !!U && U.scrollWidth > U.clientWidth, G = () => {
      io !== "pointer" && (I || x(p.current) || x(l.current)) && T(!0);
    }, S = () => T(!1);
    return E.addEventListener("focus", G), E.addEventListener("blur", S), () => {
      E.removeEventListener("focus", G), E.removeEventListener("blur", S);
    };
  }, [I, p, l]);
  const j = B(() => {
    I && D(!0), f(), M && w();
  }, [
    I,
    M,
    f,
    w
  ]), P = B(() => {
    D(!1), T(!1), b(), h();
  }, [b, h]);
  J(() => {
    I || D(!1);
  }, [I]);
  const O = /* @__PURE__ */ a("span", { ref: p, className: "tw:min-w-0 tw:shrink tw:truncate", children: t }, "primary"), q = M ? (
    // Weighted to absorb essentially all of the shrinking, so the primary field only starts losing
    // characters once this one has none left.
    /* @__PURE__ */ a("span", { ref: l, className: "tw:min-w-0 tw:shrink-[9999] tw:truncate", children: e }, "secondary")
  ) : void 0, [W, F] = o ? [q, O] : [O, q];
  return (
    // Nested TooltipProviders are harmless in Radix, so carrying our own means this works in any
    // host, including toolbars that never set one up.
    /* @__PURE__ */ a(St, { children: /* @__PURE__ */ u(
      It,
      {
        open: g || d || v || k,
        onOpenChange: (E) => {
          E || P();
        },
        children: [
          /* @__PURE__ */ a(Rt, { asChild: !0, children: /* @__PURE__ */ u(
            "span",
            {
              ref: R,
              onPointerEnter: j,
              onPointerLeave: P,
              onPointerDown: P,
              className: m("tw:flex tw:min-w-0 tw:items-center", c),
              children: [
                W,
                W && F && /* @__PURE__ */ a("span", { className: "tw:shrink-0 tw:whitespace-pre", children: r }, "separator"),
                F
              ]
            }
          ) }),
          /* @__PURE__ */ a(Dt, { children: s })
        ]
      }
    ) })
  );
}
function bi(t, e, r) {
  return `${t} ${de[t]}${e ? ` ${Tr(t, e)} ${fe(t, e)}` : ""}`;
}
function Gl({
  recentSearches: t,
  onSearchItemSelect: e,
  renderItem: r = (p) => String(p),
  getItemKey: o = (p) => String(p),
  ariaLabel: n = "Show recent searches",
  groupHeading: i = "Recent",
  id: s,
  classNameForItems: c,
  buttonClassName: l = "tw:absolute tw:right-0 tw:top-0 tw:h-full tw:px-3 tw:py-2",
  buttonVariant: d = "ghost",
  open: w,
  onOpenChange: h
}) {
  const [p, g] = N(!1), f = w !== void 0, b = f ? w : p, v = (k) => {
    f || g(k), h == null || h(k);
  };
  if (t.length === 0)
    return;
  const D = (k) => {
    e(k), v(!1);
  };
  return /* @__PURE__ */ u(Pe, { open: b, onOpenChange: v, children: [
    /* @__PURE__ */ a(De, { asChild: !0, children: /* @__PURE__ */ a(
      Z,
      {
        variant: d,
        size: "icon",
        className: l,
        "aria-label": n,
        children: /* @__PURE__ */ a(Vo, { className: "tw:h-4 tw:w-4" })
      }
    ) }),
    /* @__PURE__ */ a($e, { id: s, className: "tw:w-[300px] tw:p-0", align: "start", children: /* @__PURE__ */ a(Ae, { children: /* @__PURE__ */ a(je, { children: /* @__PURE__ */ a(be, { heading: i, children: t.map((k) => /* @__PURE__ */ u(
      ke,
      {
        onSelect: () => D(k),
        className: m("tw:flex tw:items-center", c),
        children: [
          /* @__PURE__ */ a(Vo, { className: "tw:mr-2 tw:h-4 tw:w-4 tw:opacity-50" }),
          /* @__PURE__ */ a("span", { children: r(k) })
        ]
      },
      o(k)
    )) }) }) }) })
  ] });
}
function Jp(t, e, r = (n, i) => n === i, o = 15) {
  return (n) => {
    const i = t.filter(
      (c) => !r(c, n)
    ), s = [n, ...i.slice(0, o - 1)];
    e(s);
  };
}
function Kr(t, e) {
  return !e || e.book === t.book && e.chapterNum === t.chapterNum && e.verseNum === t.verseNum;
}
function Fl(t, e, r, o) {
  const n = $(
    () => ds(t, e),
    [t, e]
  ), i = $(
    () => ws(t, e),
    [t, e]
  ), s = $(
    () => us(t, e),
    [t, e]
  ), c = $(
    () => ps(t, e),
    [t, e]
  ), l = B(
    (d) => {
      d && o(d);
    },
    [o]
  );
  return $(() => [
    {
      onClick: () => l(n),
      disabled: Kr(t, n),
      title: "Previous chapter",
      icon: r === "ltr" ? Go : Fo
    },
    {
      onClick: () => l(s),
      disabled: Kr(t, s),
      title: "Previous verse",
      icon: r === "ltr" ? Xa : Ja
    },
    {
      onClick: () => l(c),
      disabled: Kr(t, c),
      title: "Next verse",
      icon: r === "ltr" ? Ja : Xa
    },
    {
      onClick: () => l(i),
      disabled: Kr(t, i),
      title: "Next chapter",
      icon: r === "ltr" ? Fo : Go
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
const ta = {
  // Matches start of string (`^`), one or more non-colon/space words, optionally followed by space and more words (`([^:\s]+(?:\s+[^:\s]+)*)`), end of string (`$`), case-insensitive (`i`)
  BOOK_ONLY: /^([^:\s]+(?:\s+[^:\s]+)*)$/i,
  // Same as above, but followed by a space and a chapter number (`\s+(\d+)`)
  BOOK_CHAPTER: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,
  // Same as above, but followed by a colon and optionally a verse number (`:(\d*)`)
  BOOK_CHAPTER_VERSE: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i
}, Ul = [
  ta.BOOK_ONLY,
  ta.BOOK_CHAPTER,
  ta.BOOK_CHAPTER_VERSE
];
function Hl(t) {
  return ta.BOOK_CHAPTER_VERSE.test(t.trim());
}
function en(t, e) {
  return Pt.bookIdToNumber(t) < Pt.bookIdToNumber(e.book);
}
function Kl(t, e, r) {
  const o = Pt.bookIdToNumber(t) - Pt.bookIdToNumber(r.book);
  return o < 0 ? !0 : o > 0 ? !1 : e < r.chapterNum;
}
function Da(t, e, r, o) {
  const n = Pt.bookIdToNumber(t) - Pt.bookIdToNumber(o.book);
  return n < 0 ? !0 : n > 0 ? !1 : e < o.chapterNum ? !0 : e > o.chapterNum ? !1 : r < o.verseNum;
}
function rn(t) {
  const e = /^[a-zA-Z]$/.test(t), r = /^[0-9]$/.test(t);
  return { isLetter: e, isDigit: r };
}
function pr(t) {
  return lc(Pt.bookIdToNumber(t));
}
function ql(t, e, r) {
  if (!t.trim() || e.length === 0) return;
  const o = Ul.reduce(
    (n, i) => {
      if (n) return n;
      const s = i.exec(t.trim());
      if (s) {
        const [c, l = void 0, d = void 0] = s.slice(1);
        let w;
        const h = e.filter((p) => ho(p, c, r));
        if (h.length === 1 && ([w] = h), !w && l) {
          if (Pt.isBookIdValid(c)) {
            const p = c.toUpperCase();
            e.includes(p) && (w = p);
          }
          if (!w && r) {
            const p = Array.from(r.entries()).find(
              ([, g]) => g.localizedId.toLowerCase() === c.toLowerCase()
            );
            p && e.includes(p[0]) && ([w] = p);
          }
        }
        if (!w && l) {
          const g = ((f) => Object.keys(de).find(
            (b) => de[b].toLowerCase() === f.toLowerCase()
          ))(c);
          if (g && e.includes(g) && (w = g), !w && r) {
            const f = Array.from(r.entries()).find(
              ([, b]) => b.localizedName.toLowerCase() === c.toLowerCase()
            );
            f && e.includes(f[0]) && ([w] = f);
          }
        }
        if (w) {
          let p = l ? parseInt(l, 10) : void 0;
          p && p > pr(w) && (p = Math.max(pr(w), 1));
          const g = d ? parseInt(d, 10) : void 0;
          return {
            book: w,
            chapterNum: p,
            verseNum: g
          };
        }
      }
    },
    void 0
  );
  if (o) return o;
}
function so(t) {
  return {
    [Et.OT]: t.filter((e) => Pt.isBookOT(e)),
    [Et.NT]: t.filter((e) => Pt.isBookNT(e)),
    [Et.DC]: t.filter((e) => Pt.isBookDC(e)),
    [Et.Extra]: t.filter((e) => Pt.extraBooks().includes(e))
  };
}
function Yl(t, e) {
  const r = new Set(t), o = e.filter((d) => !r.has(d)), n = new Set(o), i = n.size === 0 ? t : Pt.allBookIds.filter(
    (d) => r.has(d) || n.has(d)
  ), s = so(i), c = Object.values(s).flat(), l = so(t);
  return {
    projectBooksBySection: l,
    reachableBooksBySection: s,
    reachableBooks: c,
    // Grouped and flattened like `reachableBooks`, so it inherits the same peripheral-id exclusion.
    projectBooks: Object.values(l).flat(),
    // Derived from the grouped-and-flattened list, so a peripheral id that grouping dropped can
    // never be marked dimmed for a list it is not part of.
    booksOutsideProject: new Set(c.filter((d) => !r.has(d)))
  };
}
function xi({
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
    return /* @__PURE__ */ a(be, { children: /* @__PURE__ */ a("div", { className: m("tw:grid tw:grid-cols-6 tw:gap-1", c), children: Array.from({ length: t }, (l, d) => d + 1).map((l) => {
      const d = (n == null ? void 0 : n(l)) ?? !1;
      return /* @__PURE__ */ a(
        ke,
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
function an({
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
      xi,
      {
        count: pr(t),
        valueBuilder: (c) => `${t} ${de[t] || ""} ${c}`,
        onSelect: r,
        itemRef: o,
        isDisabled: i,
        isDimmed: n,
        isSelected: (c) => t === e.book && c === e.chapterNum,
        className: s
      }
    );
}
function on({
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
      xi,
      {
        count: r,
        valueBuilder: (d) => `${t} ${de[t] || ""} ${e}:${d}`,
        onSelect: n,
        itemRef: i,
        isDisabled: c,
        isDimmed: s,
        isSelected: (d) => t === o.book && e === o.chapterNum && d === o.verseNum,
        className: l
      }
    );
}
function za({
  scrRef: t,
  handleSubmit: e,
  className: r,
  getActiveBookIds: o,
  getAdditionalBookIds: n,
  localizedBookNames: i,
  localizedStrings: s,
  recentSearches: c,
  onAddRecentSearch: l,
  id: d,
  getEndVerse: w,
  disableReferencesUpTo: h,
  submitKeys: p,
  triggerContent: g,
  triggerVariant: f = "outline",
  showTriggerChevron: b = !1,
  onOpenChange: v,
  onCloseAutoFocus: D,
  modal: k = !1,
  align: T = "center",
  ref: R,
  disabled: M
}) {
  const I = _e(), j = Ll(), [P, O] = N(!1), [q, W] = N(""), [F, E] = N(""), [x, G] = N("books"), [S, C] = N(void 0), [U, ot] = N(
    void 0
  ), [nt, ut] = N(void 0), [Bt, Q] = N(!1), [ct, ft] = N(!1), mt = K(null), vt = K(!1), _t = K(void 0), ht = K(void 0), Vt = K(void 0), ae = K(void 0), zt = K({}), Gt = K({}), gt = B(
    (_) => {
      e(_), l && l(_);
    },
    [e, l]
  ), Xt = $(() => o ? o() : hs, [o]), xt = $(
    () => o && n ? n() : [],
    [o, n]
  ), {
    projectBooksBySection: Nt,
    reachableBooksBySection: At,
    reachableBooks: Jt,
    projectBooks: ue,
    booksOutsideProject: Zt
  } = $(
    () => Yl(Xt, xt),
    [Xt, xt]
  ), Ge = Zt.has(t.book), ne = $(() => F.trim() ? so(
    Jt.filter((_) => ho(_, F, i))
  ) : ct ? At : Nt, [
    Nt,
    At,
    Jt,
    ct,
    F,
    i
  ]), L = $(
    () => ql(F, Jt, i),
    [F, Jt, i]
  ), Ft = K(!1);
  J(() => {
    if (!Ft.current) {
      Ft.current = !0;
      return;
    }
    v == null || v(P);
  }, [P, v]);
  const yt = B(() => {
    if (L) {
      const _ = L.chapterNum ?? 1, rt = L.verseNum ?? 1;
      if (h && Da(L.book, _, rt, h))
        return;
      gt({
        book: L.book,
        chapterNum: _,
        verseNum: rt
      }), O(!1), E(""), W("");
    }
  }, [gt, L, h]), ce = B(
    (_) => {
      const rt = U ?? (L == null ? void 0 : L.book), at = nt ?? (L == null ? void 0 : L.chapterNum);
      !rt || !at || (gt({
        book: rt,
        chapterNum: at,
        verseNum: _
      }), O(!1));
    },
    [gt, U, nt, L]
  ), Qt = B(
    (_) => {
      if (h && en(_, h)) return;
      if (pr(_) <= 1) {
        gt({
          book: _,
          chapterNum: 1,
          verseNum: 1
        }), O(!1), E("");
        return;
      }
      C(_), G("chapters");
    },
    [gt, h]
  ), Ut = B(
    (_) => {
      const rt = x === "chapters" ? S : L == null ? void 0 : L.book;
      if (rt) {
        if (w && w(rt, _) > 1) {
          ot(rt), ut(_), G("verses"), W("");
          return;
        }
        gt({
          book: rt,
          chapterNum: _,
          verseNum: 1
        }), O(!1);
      }
    },
    [gt, x, S, L, w]
  ), pe = B(
    (_) => {
      gt(_), O(!1), E("");
    },
    [gt]
  ), Ee = Fl(
    t,
    ct ? Jt : ue,
    I,
    e
  ), z = B(() => {
    G("books"), C(void 0), ot(void 0), ut(void 0), setTimeout(() => {
      ht.current && ht.current.focus();
    }, 0);
  }, []), H = B(() => {
    const _ = U;
    ot(void 0), ut(void 0), _ ? (C(_), G("chapters"), W("")) : z();
  }, [U, z]), X = B(
    (_) => {
      O(_), _ && (G("books"), C(void 0), ot(void 0), ut(void 0), E(""), ft(Ge));
    },
    [Ge]
  );
  J(() => {
    M && X(!1);
  }, [M, X]);
  const [y, Y] = N(0);
  J(() => {
    var _;
    y !== 0 && ((_ = ht.current) == null || _.focus());
  }, [y]), xc(
    R,
    () => ({
      open: () => {
        M || (X(!0), Y((_) => _ + 1));
      }
    }),
    [X, M]
  );
  const { otLong: A, ntLong: et, dcLong: lt, extraLong: pt } = {
    otLong: s == null ? void 0 : s["%scripture_section_ot_long%"],
    ntLong: s == null ? void 0 : s["%scripture_section_nt_long%"],
    dcLong: s == null ? void 0 : s["%scripture_section_dc_long%"],
    extraLong: s == null ? void 0 : s["%scripture_section_extra_long%"]
  }, Ct = B(
    (_) => zn(_, A, et, lt, pt),
    [A, et, lt, pt]
  ), Ot = B(
    (_) => L ? !!L.chapterNum && !_.toString().includes(L.chapterNum.toString()) : !1,
    [L]
  ), jt = $(
    () => Ie(
      t,
      i ? fe(t.book, i) : "English"
    ),
    [t, i]
  ), oe = $(
    () => j >= Ir.TIGHT ? Tr(t.book, i) : fe(t.book, i),
    [t.book, i, j]
  ), Gr = `${t.chapterNum}:${t.verseNum}`, Ze = B((_) => (rt) => {
    zt.current[_] = rt;
  }, []), Fe = B((_) => (rt) => {
    Gt.current[_] = rt;
  }, []), Fr = $(
    () => Hl(F),
    [F]
  ), xa = $(() => !w || !L || !L.chapterNum || !Fr ? !1 : w(L.book, L.chapterNum) > 0, [w, L, Fr]), ya = x === "books" && !Bt && !F.trim() && Zt.size > 0, Ur = B(
    (_) => h ? en(_, h) : !1,
    [h]
  ), yr = B(
    (_) => (rt) => h ? Kl(_, rt, h) : !1,
    [h]
  ), sr = B(
    (_, rt) => (at) => h ? Da(_, rt, at, h) : !1,
    [h]
  ), kr = (s == null ? void 0 : s["%webView_bookChapterControl_selectChapter%"]) || "Select chapter", Qe = (s == null ? void 0 : s["%webView_bookChapterControl_selectVerse%"]) || "Select verse", ka = (s == null ? void 0 : s["%webView_bookChapterControl_bookNotInProject%"]) || "Not in project", tr = (s == null ? void 0 : s["%webView_bookChapterControl_bookNotInProjectDescription%"]) || "{book} is not in this project", _a = B(
    (_) => qe(tr, {
      book: `${fe(_, i)} (${Tr(
        _,
        i
      )})`
    }),
    [tr, i]
  ), cr = (s == null ? void 0 : s["%webView_bookChapterControl_showMoreBooks%"]) || "Show more books", Na = (s == null ? void 0 : s["%webView_bookChapterControl_showProjectBooksOnly%"]) || "Show project books only", Ca = B(
    (_) => {
      (_.key === "Home" || _.key === "End") && _.stopPropagation(), p && p.includes(_.key) && L && L.chapterNum !== void 0 && L.verseNum !== void 0 && (_.preventDefault(), _.stopPropagation(), yt());
    },
    [p, L, yt]
  ), Ea = B(
    (_) => {
      var Te, V, tt;
      if (_.ctrlKey) return;
      const { isLetter: rt, isDigit: at } = rn(_.key);
      if ((x === "chapters" || x === "verses") && (_.key === " " || _.key === "Enter")) {
        const dt = _.target instanceof HTMLElement ? _.target : void 0;
        if (!!(dt != null && dt.closest(
          'button, a, input, select, textarea, [role="button"]'
        ))) {
          _.stopPropagation();
          return;
        }
        const Lt = (Te = _t.current) == null ? void 0 : Te.querySelector(
          '[cmdk-item][data-selected="true"]:not([data-disabled="true"])'
        );
        if (Lt) {
          _.preventDefault(), _.stopPropagation(), Lt.click();
          return;
        }
      }
      if ((x === "chapters" || x === "verses") && (rt || at)) {
        _.preventDefault(), _.stopPropagation();
        return;
      }
      if (x === "chapters" && _.key === "Backspace") {
        _.preventDefault(), _.stopPropagation(), z();
        return;
      }
      if (x === "verses" && _.key === "Backspace") {
        _.preventDefault(), _.stopPropagation(), H();
        return;
      }
      const te = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(_.key);
      if (x === "verses" && te) {
        const dt = U, bt = nt;
        if (!dt || !bt || !w) return;
        const Lt = w(dt, bt);
        if (!Lt) return;
        (V = _t.current) == null || V.focus();
        const kt = (() => {
          if (!q) return 1;
          const _r = q.match(/:(\d+)$/);
          return _r ? parseInt(_r[1], 10) : 0;
        })();
        let he = kt;
        const Ue = 6;
        switch (_.key) {
          case "ArrowLeft":
            kt !== 0 && (he = kt > 1 ? kt - 1 : Lt);
            break;
          case "ArrowRight":
            kt !== 0 && (he = kt < Lt ? kt + 1 : 1);
            break;
          case "ArrowUp":
            he = kt === 0 ? Lt : Math.max(1, kt - Ue);
            break;
          case "ArrowDown":
            he = kt === 0 ? 1 : Math.min(Lt, kt + Ue);
            break;
          default:
            return;
        }
        he !== kt && (_.preventDefault(), _.stopPropagation(), W(
          `${dt} ${de[dt] || ""} ${bt}:${he}`
        ), setTimeout(() => {
          const _r = Gt.current[he];
          _r && _r.scrollIntoView({ block: "nearest", behavior: "smooth" });
        }, 0));
        return;
      }
      if ((x === "chapters" || x === "books" && L) && te) {
        const dt = x === "chapters" ? S : L == null ? void 0 : L.book;
        if (!dt) return;
        x === "chapters" && ((tt = _t.current) == null || tt.focus());
        const bt = (() => {
          if (!q) return 1;
          const Ue = q.match(/(\d+)$/);
          return Ue ? parseInt(Ue[1], 10) : 0;
        })(), Lt = pr(dt);
        if (!Lt) return;
        let kt = bt;
        const he = 6;
        switch (_.key) {
          case "ArrowLeft":
            bt !== 0 && (kt = bt > 1 ? bt - 1 : Lt);
            break;
          case "ArrowRight":
            bt !== 0 && (kt = bt < Lt ? bt + 1 : 1);
            break;
          case "ArrowUp":
            kt = bt === 0 ? Lt : Math.max(1, bt - he);
            break;
          case "ArrowDown":
            kt = bt === 0 ? 1 : Math.min(Lt, bt + he);
            break;
          default:
            return;
        }
        kt !== bt && (_.preventDefault(), _.stopPropagation(), W(
          `${dt} ${de[dt] || ""} ${kt}`
        ), setTimeout(() => {
          const Ue = zt.current[kt];
          Ue && Ue.scrollIntoView({ block: "nearest", behavior: "smooth" });
        }, 0));
      }
    },
    [
      x,
      L,
      z,
      H,
      S,
      U,
      nt,
      w,
      q
    ]
  ), Ta = B((_) => {
    var te;
    if (_.shiftKey || _.key === "Tab" || _.key === " ") return;
    if (_.key === "Enter") {
      _.stopPropagation();
      return;
    }
    if (_.key === "ArrowUp" || _.key === "ArrowDown") {
      (te = ht.current) == null || te.focus();
      return;
    }
    const { isLetter: rt, isDigit: at } = rn(_.key);
    (rt || at) && (_.preventDefault(), E((Te) => Te + _.key), ht.current.focus(), Q(!1));
  }, []);
  return ee(() => {
    const _ = setTimeout(() => {
      if (P && x === "books" && Vt.current && ae.current) {
        const rt = Vt.current, at = ae.current, te = at.offsetTop, Te = rt.clientHeight, V = at.clientHeight, tt = te - Te / 2 + V / 2;
        rt.scrollTo({
          top: Math.max(0, tt),
          behavior: "smooth"
        }), W(bi(t.book));
      }
    }, 0);
    return () => {
      clearTimeout(_);
    };
  }, [P, x, F, L, t.book]), ee(() => {
    if (x === "chapters" && S) {
      const _ = S === t.book, rt = _ ? t.chapterNum : 1;
      W(
        `${S} ${de[S] || ""} ${rt}`
      ), setTimeout(() => {
        if (Vt.current)
          if (_) {
            const at = zt.current[t.chapterNum];
            at && at.scrollIntoView({ block: "center", behavior: "smooth" });
          } else
            Vt.current.scrollTo({ top: 0 });
        _t.current && _t.current.focus();
      }, 0);
    }
  }, [x, S, L, t.book, t.chapterNum]), ee(() => {
    if (x === "verses" && U && nt !== void 0) {
      const _ = U === t.book && nt === t.chapterNum, rt = _ ? t.verseNum : 1;
      W(
        `${U} ${de[U] || ""} ${nt}:${rt}`
      ), setTimeout(() => {
        if (Vt.current)
          if (_) {
            const at = Gt.current[t.verseNum];
            at && at.scrollIntoView({ block: "center", behavior: "smooth" });
          } else
            Vt.current.scrollTo({ top: 0 });
        _t.current && _t.current.focus();
      }, 0);
    }
  }, [
    x,
    U,
    nt,
    t.book,
    t.chapterNum,
    t.verseNum
  ]), /* @__PURE__ */ u(Pe, { open: P, onOpenChange: X, modal: k, children: [
    /* @__PURE__ */ a(De, { asChild: !0, children: /* @__PURE__ */ u(
      Z,
      {
        ref: mt,
        "aria-label": "book-chapter-trigger",
        variant: f,
        role: "combobox",
        "aria-expanded": P,
        disabled: M,
        className: m(
          "tw:h-8 tw:w-full tw:min-w-16 tw:max-w-48 tw:shrink tw:overflow-hidden tw:px-1",
          r
        ),
        onClick: (_) => {
          vt.current && (vt.current = !1, _.preventDefault());
        },
        children: [
          g ?? /* @__PURE__ */ a(
            Vl,
            {
              primary: oe,
              secondary: Gr,
              showSecondary: j < Ir.MINIMUM,
              isPartial: j >= Ir.TIGHT,
              fullText: jt
            }
          ),
          b && /* @__PURE__ */ a(
            Zn,
            {
              "data-testid": "book-chapter-control-chevron",
              className: "tw:ms-2 tw:size-4 tw:shrink-0 tw:opacity-50"
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ a(
      $e,
      {
        id: d,
        forceMount: !0,
        className: "tw:w-[280px] tw:p-0",
        align: T,
        onKeyDownCapture: Ea,
        onKeyDown: (_) => _.stopPropagation(),
        onPointerDownOutside: (_) => {
          const { target: rt } = _;
          P && mt.current && rt instanceof Node && mt.current.contains(rt) && (vt.current = !0, X(!1));
        },
        onCloseAutoFocus: D,
        children: /* @__PURE__ */ u(
          Ae,
          {
            ref: _t,
            loop: !0,
            value: q,
            onValueChange: W,
            shouldFilter: !1,
            children: [
              x === "books" ? /* @__PURE__ */ u("div", { className: "tw:flex tw:items-end", children: [
                /* @__PURE__ */ u("div", { className: "tw:relative tw:flex-1", children: [
                  /* @__PURE__ */ a(
                    Pr,
                    {
                      ref: ht,
                      value: F,
                      onValueChange: E,
                      onKeyDown: Ca,
                      onFocus: () => Q(!1),
                      className: c && c.length > 0 ? "tw:!pr-10" : "",
                      spaceSelectsHighlightedItem: !0
                    }
                  ),
                  c && c.length > 0 && /* @__PURE__ */ a(
                    Gl,
                    {
                      recentSearches: c,
                      onSearchItemSelect: pe,
                      renderItem: (_) => Ie(_, "English"),
                      getItemKey: (_) => `${_.book}-${_.chapterNum}-${_.verseNum}`,
                      ariaLabel: s == null ? void 0 : s["%history_recentSearches_ariaLabel%"],
                      groupHeading: s == null ? void 0 : s["%history_recent%"]
                    }
                  )
                ] }),
                /* @__PURE__ */ a("div", { className: "tw:flex tw:items-center tw:gap-1 tw:border-b tw:pe-2", children: Ee.map(
                  ({ onClick: _, disabled: rt, title: at, icon: te }) => /* @__PURE__ */ a(
                    Z,
                    {
                      variant: "ghost",
                      size: "sm",
                      onClick: () => {
                        Q(!0), _();
                      },
                      disabled: rt,
                      className: "tw:h-10 tw:w-4 tw:p-0",
                      title: at,
                      onKeyDown: Ta,
                      children: /* @__PURE__ */ a(te, {})
                    },
                    at
                  )
                ) })
              ] }) : /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:border-b tw:px-3 tw:py-2", children: [
                /* @__PURE__ */ a(
                  Z,
                  {
                    variant: "ghost",
                    size: "sm",
                    onClick: x === "verses" ? H : z,
                    className: "tw:mr-2 tw:h-6 tw:w-6 tw:p-0",
                    tabIndex: -1,
                    children: I === "ltr" ? /* @__PURE__ */ a(zs, { className: "tw:h-4 tw:w-4" }) : /* @__PURE__ */ a(Vn, { className: "tw:h-4 tw:w-4" })
                  }
                ),
                x === "chapters" && S && /* @__PURE__ */ a("span", { tabIndex: -1, className: "tw:text-sm tw:font-medium", children: fe(S, i) }),
                x === "verses" && U && nt !== void 0 && /* @__PURE__ */ a("span", { tabIndex: -1, className: "tw:text-sm tw:font-medium", children: `${fe(U, i)} ${nt}` }),
                /* @__PURE__ */ a(
                  "span",
                  {
                    tabIndex: -1,
                    className: "tw:ms-auto tw:text-sm tw:font-medium tw:text-muted-foreground",
                    children: x === "verses" ? Qe : kr
                  }
                )
              ] }),
              !Bt && /* @__PURE__ */ u(je, { ref: Vt, children: [
                x === "books" && /* @__PURE__ */ u(it, { children: [
                  !L && Object.entries(ne).map(([_, rt]) => {
                    if (rt.length !== 0)
                      return (
                        // We are mapping over filteredBooksByType, which uses Section as key type
                        // eslint-disable-next-line no-type-assertion/no-type-assertion
                        /* @__PURE__ */ a(be, { heading: Ct(_), children: rt.map((at) => /* @__PURE__ */ a(
                          fi,
                          {
                            bookId: at,
                            onSelect: (te) => Qt(te),
                            section: Zr(at),
                            commandValue: `${at} ${de[at]}`,
                            ref: at === t.book ? ae : void 0,
                            localizedBookNames: i,
                            disabled: Ur(at),
                            dimmedReason: Zt.has(at) ? ka : void 0,
                            dimmedDescription: Zt.has(at) ? _a(at) : void 0
                          },
                          at
                        )) }, _)
                      );
                  }),
                  L && /* @__PURE__ */ a(be, { children: /* @__PURE__ */ a(
                    ke,
                    {
                      value: `${L.book} ${de[L.book]} ${L.chapterNum || ""}:${L.verseNum || ""})}`,
                      onSelect: yt,
                      disabled: !!h && Da(
                        L.book,
                        L.chapterNum ?? 1,
                        L.verseNum ?? 1,
                        h
                      ),
                      className: "tw:font-semibold tw:text-primary",
                      children: Ie(
                        {
                          book: L.book,
                          chapterNum: L.chapterNum ?? 1,
                          verseNum: L.verseNum ?? 1
                        },
                        // 'English', matching the trigger formatter's fallback above: with no
                        // localizedBookNames prop (no app code passes one today), `undefined`
                        // made formatScrRef render the raw book CODE ("OBA 1:1") here while the
                        // trigger showed "Obadiah 1:1" — the same reference in two spellings in
                        // one control.
                        i ? Tr(L.book, i) : "English"
                      )
                    },
                    "top-match"
                  ) }),
                  L && xa && L.chapterNum && w && /* @__PURE__ */ u(it, { children: [
                    /* @__PURE__ */ u("div", { className: "tw:mb-2 tw:flex tw:items-center tw:justify-between tw:px-3 tw:text-sm tw:font-medium tw:text-muted-foreground", children: [
                      /* @__PURE__ */ a("span", { children: `${fe(L.book, i)} ${L.chapterNum}` }),
                      /* @__PURE__ */ a("span", { children: Qe })
                    ] }),
                    /* @__PURE__ */ a(
                      on,
                      {
                        bookId: L.book,
                        chapterNum: L.chapterNum,
                        endVerse: w(L.book, L.chapterNum),
                        scrRef: t,
                        onVerseSelect: ce,
                        setVerseRef: Fe,
                        isVerseDisabled: sr(L.book, L.chapterNum),
                        className: "tw:px-4 tw:pb-4"
                      }
                    )
                  ] }),
                  L && !xa && pr(L.book) > 1 && /* @__PURE__ */ u(it, { children: [
                    /* @__PURE__ */ u("div", { className: "tw:mb-2 tw:flex tw:items-center tw:justify-between tw:px-3 tw:text-sm tw:font-medium tw:text-muted-foreground", children: [
                      /* @__PURE__ */ a("span", { children: fe(L.book, i) }),
                      /* @__PURE__ */ a("span", { children: kr })
                    ] }),
                    /* @__PURE__ */ a(
                      an,
                      {
                        bookId: L.book,
                        scrRef: t,
                        onChapterSelect: Ut,
                        setChapterRef: Ze,
                        isChapterDimmed: Ot,
                        isChapterDisabled: yr(L.book),
                        className: "tw:px-4 tw:pb-4"
                      }
                    )
                  ] })
                ] }),
                x === "chapters" && S && /* @__PURE__ */ a(
                  an,
                  {
                    bookId: S,
                    scrRef: t,
                    onChapterSelect: Ut,
                    setChapterRef: Ze,
                    isChapterDisabled: yr(S),
                    className: "tw:p-4"
                  }
                ),
                x === "verses" && U && nt !== void 0 && w && /* @__PURE__ */ a(
                  on,
                  {
                    bookId: U,
                    chapterNum: nt,
                    endVerse: w(U, nt),
                    scrRef: t,
                    onVerseSelect: ce,
                    setVerseRef: Fe,
                    isVerseDisabled: sr(
                      U,
                      nt
                    ),
                    className: "tw:p-4"
                  }
                )
              ] }),
              ya && /* @__PURE__ */ a("div", { className: "tw:border-t tw:p-1", children: /* @__PURE__ */ a(
                Z,
                {
                  variant: "ghost",
                  size: "sm",
                  className: "tw:w-full tw:justify-start tw:font-normal",
                  onClick: () => ft((_) => !_),
                  children: ct ? Na : cr
                }
              ) })
            ]
          }
        )
      }
    )
  ] });
}
const Zp = Object.freeze([
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
  "%webView_bookChapterControl_showProjectBooksOnly%"
]);
function Wl(t) {
  return typeof t == "string" ? t : typeof t == "number" ? t.toString() : t.label;
}
function nn({
  id: t,
  options: e = [],
  className: r,
  buttonClassName: o,
  popoverContentClassName: n,
  popoverContentStyle: i,
  value: s,
  onChange: c = () => {
  },
  getOptionLabel: l = Wl,
  getButtonLabel: d,
  icon: w = void 0,
  buttonPlaceholder: h = "",
  textPlaceholder: p = "",
  commandEmptyMessage: g = "No option found",
  buttonVariant: f = "outline",
  alignDropDown: b = "start",
  isDisabled: v = !1,
  ariaLabel: D,
  ...k
}) {
  const [T, R] = N(!1), M = d ?? l, I = (P) => P.length > 0 && typeof P[0] == "object" && "options" in P[0], j = (P, O) => {
    const q = l(P), W = typeof P == "object" && "secondaryLabel" in P ? P.secondaryLabel : void 0, F = `${O ?? ""}${q}${W ?? ""}`;
    return /* @__PURE__ */ u(
      ke,
      {
        value: q,
        onSelect: () => {
          c(P), R(!1);
        },
        className: "tw:gap-1.5!",
        children: [
          /* @__PURE__ */ a(
            Oe,
            {
              className: m("tw:h-4 tw:w-4 tw:shrink-0", {
                "tw:opacity-0": !s || l(s) !== q
              })
            }
          ),
          /* @__PURE__ */ u("span", { className: "tw:flex-1 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap", children: [
            q,
            W && /* @__PURE__ */ u("span", { className: "tw:text-muted-foreground", children: [
              " · ",
              W
            ] })
          ] })
        ]
      },
      F
    );
  };
  return /* @__PURE__ */ u(Pe, { open: T, onOpenChange: R, ...k, children: [
    /* @__PURE__ */ a(De, { asChild: !0, children: /* @__PURE__ */ u(
      Z,
      {
        variant: f,
        role: "combobox",
        "aria-expanded": T,
        "aria-label": D,
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
                children: s ? M(s) : h
              }
            )
          ] }),
          /* @__PURE__ */ a(nr, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ a(
      $e,
      {
        align: b,
        className: m("tw:w-[200px] tw:p-0", n),
        style: i,
        children: /* @__PURE__ */ u(Ae, { children: [
          /* @__PURE__ */ a(
            Pr,
            {
              placeholder: p,
              className: "tw:text-inherit",
              spaceSelectsHighlightedItem: !0
            }
          ),
          /* @__PURE__ */ a($r, { children: g }),
          /* @__PURE__ */ a(je, { children: I(e) ? e.map((P) => /* @__PURE__ */ a(be, { heading: P.groupHeading, children: P.options.map((O) => j(O, P.groupHeading)) }, P.groupHeading)) : /* @__PURE__ */ a(be, { children: e.map((P) => j(P)) }) })
        ] })
      }
    )
  ] });
}
function Xl({
  startChapter: t,
  endChapter: e,
  handleSelectStartChapter: r,
  handleSelectEndChapter: o,
  isDisabled: n = !1,
  chapterCount: i
}) {
  const s = $(
    () => Array.from({ length: i }, (d, w) => w + 1),
    [i]
  );
  return /* @__PURE__ */ u(it, { children: [
    /* @__PURE__ */ a(Tt, { htmlFor: "start-chapters-combobox", children: "Chapters" }),
    /* @__PURE__ */ a(
      nn,
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
    /* @__PURE__ */ a(Tt, { htmlFor: "end-chapters-combobox", children: "to" }),
    /* @__PURE__ */ a(
      nn,
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
var co = /* @__PURE__ */ ((t) => (t.CurrentBook = "current book", t.ChooseBooks = "choose books", t))(co || {});
((t) => {
  t.CURRENT_BOOK = "current book", t.CHOOSE_BOOKS = "choose books";
})(co || (co = {}));
const Qp = Object.freeze([
  "%webView_bookSelector_currentBook%",
  "%webView_bookSelector_choose%",
  "%webView_bookSelector_chooseBooks%"
]), Oa = (t, e) => t[e] ?? e;
function th({
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
  const w = Oa(d, "%webView_bookSelector_currentBook%"), h = Oa(d, "%webView_bookSelector_choose%"), p = Oa(d, "%webView_bookSelector_chooseBooks%"), [g, f] = N(
    "current book"
    /* CurrentBook */
  ), b = (v) => {
    f(v), t(v);
  };
  return /* @__PURE__ */ a(
    go,
    {
      className: "pr-twp tw:flex",
      value: g,
      onValueChange: (v) => b(v),
      children: /* @__PURE__ */ u("div", { className: "tw:flex tw:w-full tw:flex-col tw:gap-4", children: [
        /* @__PURE__ */ u("div", { className: "tw:grid tw:grid-cols-[25%_25%_50%]", children: [
          /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center", children: [
            /* @__PURE__ */ a(na, {
              value: "current book"
              /* CurrentBook */
            }),
            /* @__PURE__ */ a(Tt, { className: "tw:ms-1", children: w })
          ] }),
          /* @__PURE__ */ a(Tt, { className: "tw:flex tw:items-center", children: e }),
          /* @__PURE__ */ a("div", { className: "tw:flex tw:items-center tw:justify-end", children: /* @__PURE__ */ a(
            Xl,
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
            /* @__PURE__ */ a(na, {
              value: "choose books"
              /* ChooseBooks */
            }),
            /* @__PURE__ */ a(Tt, { className: "tw:ms-1", children: p })
          ] }),
          /* @__PURE__ */ a(Tt, { className: "tw:flex tw:items-center", children: o.map((v) => Pt.bookIdToEnglishName(v)).join(", ") }),
          /* @__PURE__ */ a(
            Z,
            {
              disabled: g === "current book",
              onClick: () => r(),
              children: h
            }
          )
        ] })
      ] })
    }
  );
}
const yi = jr(null);
function Jl(t, e) {
  return { getTheme: function() {
    return e ?? null;
  } };
}
function Ce() {
  const t = ha(yi);
  return t == null && function(e, ...r) {
    const o = new URL("https://lexical.dev/docs/error"), n = new URLSearchParams();
    n.append("code", e);
    for (const i of r) n.append("v", i);
    throw o.search = n.toString(), Error(`Minified Lexical error #${e}; visit ${o.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
  }(8), t;
}
const ki = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, Zl = ki ? ee : J, qr = { tag: Eo };
function Ql({ initialConfig: t, children: e }) {
  const r = $(() => {
    const { theme: o, namespace: n, nodes: i, onError: s, editorState: c, html: l } = t, d = Jl(null, o), w = ti({ editable: t.editable, html: l, namespace: n, nodes: i, onError: (h) => s(h, w), theme: o });
    return function(h, p) {
      if (p !== null) {
        if (p === void 0) h.update(() => {
          const g = We();
          if (g.isEmpty()) {
            const f = Br();
            g.append(f);
            const b = ki ? document.activeElement : null;
            (re() !== null || b !== null && b === h.getRootElement()) && f.select();
          }
        }, qr);
        else if (p !== null) switch (typeof p) {
          case "string": {
            const g = h.parseEditorState(p);
            h.setEditorState(g, qr);
            break;
          }
          case "object":
            h.setEditorState(p, qr);
            break;
          case "function":
            h.update(() => {
              We().isEmpty() && p(h);
            }, qr);
        }
      }
    }(w, c), [w, d];
  }, []);
  return Zl(() => {
    const o = t.editable, [n] = r;
    n.setEditable(o === void 0 || o);
  }, []), a(yi.Provider, { value: r, children: e });
}
const td = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? ee : J;
function ed({ ignoreHistoryMergeTagChange: t = !0, ignoreSelectionChange: e = !1, onChange: r }) {
  const [o] = Ce();
  return td(() => {
    if (r) return o.registerUpdateListener(({ editorState: n, dirtyElements: i, dirtyLeaves: s, prevEditorState: c, tags: l }) => {
      e && i.size === 0 && s.size === 0 || t && l.has(Eo) || c.isEmpty() || r(n, o, l);
    });
  }, [o, t, e, r]), null;
}
const Ro = {
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
}, Do = [
  bl,
  ei,
  ri,
  xl
], rd = jr(null), Ma = {
  didCatch: !1,
  error: null
};
class ad extends yc {
  constructor(e) {
    super(e), this.resetErrorBoundary = this.resetErrorBoundary.bind(this), this.state = Ma;
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
      }), this.setState(Ma);
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
    if (o && r.error !== null && od(e.resetKeys, n)) {
      var i, s;
      (i = (s = this.props).onReset) === null || i === void 0 || i.call(s, {
        next: n,
        prev: e.resetKeys,
        reason: "keys"
      }), this.setState(Ma);
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
        c = Ko(o, l);
      else if (n !== void 0)
        c = n;
      else
        throw s;
    }
    return Ko(rd.Provider, {
      value: {
        didCatch: i,
        error: s,
        resetErrorBoundary: this.resetErrorBoundary
      }
    }, c);
  }
}
function od() {
  let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  return t.length !== e.length || t.some((r, o) => !Object.is(r, e[o]));
}
function nd({ children: t, onError: e }) {
  return a(ad, { fallback: a("div", { style: { border: "1px solid #f00", color: "#f00", padding: "8px" }, children: "An error was thrown." }), onError: e, children: t });
}
const id = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? ee : J;
function sd(t) {
  return { initialValueFn: () => t.isEditable(), subscribe: (e) => t.registerEditableListener(e) };
}
function cd() {
  return function(t) {
    const [e] = Ce(), r = $(() => t(e), [e, t]), [o, n] = N(() => r.initialValueFn()), i = K(o);
    return id(() => {
      const { initialValueFn: s, subscribe: c } = r, l = s();
      return i.current !== l && (i.current = l, n(l)), c((d) => {
        i.current = d, n(d);
      });
    }, [r, t]), o;
  }(sd);
}
function ld(t, e) {
  const r = t.getRootElement();
  if (r === null) return [];
  const o = r.getBoundingClientRect(), n = getComputedStyle(r), i = parseFloat(n.paddingLeft) + parseFloat(n.paddingRight), s = Array.from(e.getClientRects());
  let c, l = s.length;
  s.sort((d, w) => {
    const h = d.top - w.top;
    return Math.abs(h) <= 3 ? d.left - w.left : h;
  });
  for (let d = 0; d < l; d++) {
    const w = s[d], h = c && c.top <= w.top && c.top + c.height > w.top && c.left + c.width > w.left, p = w.width + i === o.width;
    h || p ? (s.splice(d--, 1), l--) : c = w;
  }
  return s;
}
function sa(t, ...e) {
  const r = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const n of e) o.append("v", n);
  throw r.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
const _i = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, dd = _i && "documentMode" in document ? document.documentMode : null;
!(!_i || !("InputEvent" in window) || dd) && "getTargetRanges" in new window.InputEvent("input");
function me(t) {
  return `${t}px`;
}
const wd = { attributes: !0, characterData: !0, childList: !0, subtree: !0 };
function ud(t, e, r) {
  let o = null, n = null, i = null, s = [];
  const c = document.createElement("div");
  function l() {
    o === null && sa(182), n === null && sa(183);
    const { left: h, top: p } = n.getBoundingClientRect(), g = ld(t, e);
    var f, b;
    c.isConnected || (b = c, (f = n).insertBefore(b, f.firstChild));
    let v = !1;
    for (let D = 0; D < g.length; D++) {
      const k = g[D], T = s[D] || document.createElement("div"), R = T.style;
      R.position !== "absolute" && (R.position = "absolute", v = !0);
      const M = me(k.left - h);
      R.left !== M && (R.left = M, v = !0);
      const I = me(k.top - p);
      R.top !== I && (T.style.top = I, v = !0);
      const j = me(k.width);
      R.width !== j && (T.style.width = j, v = !0);
      const P = me(k.height);
      R.height !== P && (T.style.height = P, v = !0), T.parentNode !== c && (c.append(T), v = !0), s[D] = T;
    }
    for (; s.length > g.length; ) s.pop();
    v && r(s);
  }
  function d() {
    n = null, o = null, i !== null && i.disconnect(), i = null, c.remove();
    for (const h of s) h.remove();
    s = [];
  }
  c.style.position = "relative";
  const w = t.registerRootListener(function h() {
    const p = t.getRootElement();
    if (p === null) return d();
    const g = p.parentElement;
    if (!Uc(g)) return d();
    d(), o = p, n = g, i = new MutationObserver((f) => {
      const b = t.getRootElement(), v = b && b.parentElement;
      if (b !== o || v !== n) return h();
      for (const D of f) if (!c.contains(D.target)) return l();
    }), i.observe(g, wd), l();
  });
  return () => {
    w(), d();
  };
}
function sn(t, e, r) {
  if (t.type !== "text" && zr(e)) {
    const o = e.getDOMSlot(r);
    return [o.element, o.getFirstChildOffset() + t.offset];
  }
  return [Fc(r) || r, t.offset];
}
function pd(t) {
  for (const e of t) {
    const r = e.style;
    r.background !== "Highlight" && (r.background = "Highlight"), r.color !== "HighlightText" && (r.color = "HighlightText"), r.marginTop !== me(-1.5) && (r.marginTop = me(-1.5)), r.paddingTop !== me(4) && (r.paddingTop = me(4)), r.paddingBottom !== me(0) && (r.paddingBottom = me(0));
  }
}
function hd(t, e = pd) {
  let r = null, o = null, n = null, i = null, s = null, c = null, l = () => {
  };
  function d(w) {
    w.read(() => {
      const h = re();
      if (!xe(h)) return r = null, n = null, i = null, c = null, l(), void (l = () => {
      });
      const [p, g] = function(P) {
        const O = P.getStartEndPoints();
        return P.isBackward() ? [O[1], O[0]] : O;
      }(h), f = p.getNode(), b = f.getKey(), v = p.offset, D = g.getNode(), k = D.getKey(), T = g.offset, R = t.getElementByKey(b), M = t.getElementByKey(k), I = r === null || R !== o || v !== n || b !== r.getKey(), j = i === null || M !== s || T !== c || k !== i.getKey();
      if ((I || j) && R !== null && M !== null) {
        const P = function(O, q, W, F, E, x, G) {
          const S = (O._window ? O._window.document : document).createRange();
          return S.setStart(...sn(q, W, F)), S.setEnd(...sn(E, x, G)), S;
        }(t, p, f, R, g, D, M);
        l(), l = ud(t, P, e);
      }
      r = f, o = R, n = v, i = D, s = M, c = T;
    });
  }
  return d(t.getEditorState()), Me(t.registerUpdateListener(({ editorState: w }) => d(w)), () => {
    l();
  });
}
function gd(t, e) {
  let r = null;
  const o = () => {
    const n = getSelection(), i = n && n.anchorNode, s = t.getRootElement();
    i !== null && s !== null && s.contains(i) ? r !== null && (r(), r = null) : r === null && (r = hd(t, e));
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
function fd(t) {
  const e = oi(t, (r) => zr(r) && !r.isInline());
  return zr(e) || sa(4, t.__key), e;
}
function md(t) {
  const e = re() || Oc();
  let r;
  if (xe(e)) r = Mc(e.focus, "next");
  else {
    if (e != null) {
      const s = e.getNodes(), c = s[s.length - 1];
      c && (r = ai(c, "next"));
    }
    r = r || Pc(We(), "previous").getFlipped().insert(Br());
  }
  const o = vd(t, r), n = $c(o), i = Ac(n) ? jc(n) : o;
  return Lc(Bc(i)), t.getLatest();
}
function vd(t, e, r) {
  let o = Yo(e, "next");
  for (let n = o; n; n = Vc(n, r)) o = n;
  return Gc(o) && sa(283), o.insert(t.isInline() ? Br().append(t) : t), Yo(ai(t.getLatest(), "next"), e.direction);
}
function bd(t) {
  const e = re();
  if (!xe(e)) return !1;
  const r = /* @__PURE__ */ new Set(), o = e.getNodes();
  for (let n = 0; n < o.length; n++) {
    const i = o[n], s = i.getKey();
    if (r.has(s)) continue;
    const c = oi(i, (d) => zr(d) && !d.isInline());
    if (c === null) continue;
    const l = c.getKey();
    c.canIndent() && !r.has(l) && (r.add(l), t(c));
  }
  return r.size > 0;
}
const xd = Symbol.for("preact-signals");
function ma() {
  if (Re > 1) return void Re--;
  let t, e = !1;
  for (!function() {
    let r = ca;
    for (ca = void 0; r !== void 0; ) r.S.v === r.v && (r.S.i = r.i), r = r.o;
  }(); Rr !== void 0; ) {
    let r = Rr;
    for (Rr = void 0, la++; r !== void 0; ) {
      const o = r.u;
      if (r.u = void 0, r.f &= -3, !(8 & r.f) && Ni(r)) try {
        r.c();
      } catch (n) {
        e || (t = n, e = !0);
      }
      r = o;
    }
  }
  if (la = 0, Re--, e) throw t;
}
function yd(t) {
  if (Re > 0) return t();
  lo = ++kd, Re++;
  try {
    return t();
  } finally {
    ma();
  }
}
let st, Rr;
function cn(t) {
  const e = st;
  st = void 0;
  try {
    return t();
  } finally {
    st = e;
  }
}
let ca, Re = 0, la = 0, kd = 0, lo = 0, ea = 0;
function ln(t) {
  if (st === void 0) return;
  let e = t.n;
  return e === void 0 || e.t !== st ? (e = { i: 0, S: t, p: st.s, n: void 0, t: st, e: void 0, x: void 0, r: e }, st.s !== void 0 && (st.s.n = e), st.s = e, t.n = e, 32 & st.f && t.S(e), e) : e.i === -1 ? (e.i = 0, e.n !== void 0 && (e.n.p = e.p, e.p !== void 0 && (e.p.n = e.n), e.p = st.s, e.n = void 0, st.s.n = e, st.s = e), e) : void 0;
}
function Kt(t, e) {
  this.v = t, this.i = 0, this.n = void 0, this.t = void 0, this.l = 0, this.W = e == null ? void 0 : e.watched, this.Z = e == null ? void 0 : e.unwatched, this.name = e == null ? void 0 : e.name;
}
function Or(t, e) {
  return new Kt(t, e);
}
function Ni(t) {
  for (let e = t.s; e !== void 0; e = e.n) if (e.S.i !== e.i || !e.S.h() || e.S.i !== e.i) return !0;
  return !1;
}
function dn(t) {
  for (let e = t.s; e !== void 0; e = e.n) {
    const r = e.S.n;
    if (r !== void 0 && (e.r = r), e.S.n = e, e.i = -1, e.n === void 0) {
      t.s = e;
      break;
    }
  }
}
function Ci(t) {
  let e, r = t.s;
  for (; r !== void 0; ) {
    const o = r.p;
    r.i === -1 ? (r.S.U(r), o !== void 0 && (o.n = r.n), r.n !== void 0 && (r.n.p = o)) : e = r, r.S.n = r.r, r.r !== void 0 && (r.r = void 0), r = o;
  }
  t.s = e;
}
function er(t, e) {
  Kt.call(this, void 0), this.x = t, this.s = void 0, this.g = ea - 1, this.f = 4, this.W = e == null ? void 0 : e.watched, this.Z = e == null ? void 0 : e.unwatched, this.name = e == null ? void 0 : e.name;
}
function _d(t, e) {
  return new er(t, e);
}
function Ei(t) {
  const e = t.m;
  if (t.m = void 0, typeof e == "function") {
    Re++;
    const r = st;
    st = void 0;
    try {
      e();
    } catch (o) {
      throw t.f &= -2, t.f |= 8, zo(t), o;
    } finally {
      st = r, ma();
    }
  }
}
function zo(t) {
  for (let e = t.s; e !== void 0; e = e.n) e.S.U(e);
  t.x = void 0, t.s = void 0, Ei(t);
}
function Nd(t) {
  if (st !== this) throw new Error("Out-of-order effect");
  Ci(this), st = t, this.f &= -2, 8 & this.f && zo(this), ma();
}
function dr(t, e) {
  this.x = t, this.m = void 0, this.s = void 0, this.u = void 0, this.f = 32, this.name = e == null ? void 0 : e.name;
}
function ye(t, e) {
  const r = new dr(t, e);
  try {
    r.c();
  } catch (n) {
    throw r.d(), n;
  }
  const o = r.d.bind(r);
  return o[Symbol.dispose] = o, o;
}
function xr(t, e = {}) {
  const r = {};
  for (const o in t) {
    const n = e[o], i = Or(n === void 0 ? t[o] : n);
    r[o] = i;
  }
  return r;
}
Kt.prototype.brand = xd, Kt.prototype.h = function() {
  return !0;
}, Kt.prototype.S = function(t) {
  const e = this.t;
  e !== t && t.e === void 0 && (t.x = e, this.t = t, e !== void 0 ? e.e = t : cn(() => {
    var r;
    (r = this.W) == null || r.call(this);
  }));
}, Kt.prototype.U = function(t) {
  if (this.t !== void 0) {
    const e = t.e, r = t.x;
    e !== void 0 && (e.x = r, t.e = void 0), r !== void 0 && (r.e = e, t.x = void 0), t === this.t && (this.t = r, r === void 0 && cn(() => {
      var o;
      (o = this.Z) == null || o.call(this);
    }));
  }
}, Kt.prototype.subscribe = function(t) {
  return ye(() => {
    const e = this.value, r = st;
    st = void 0;
    try {
      t(e);
    } finally {
      st = r;
    }
  }, { name: "sub" });
}, Kt.prototype.valueOf = function() {
  return this.value;
}, Kt.prototype.toString = function() {
  return this.value + "";
}, Kt.prototype.toJSON = function() {
  return this.value;
}, Kt.prototype.peek = function() {
  const t = st;
  st = void 0;
  try {
    return this.value;
  } finally {
    st = t;
  }
}, Object.defineProperty(Kt.prototype, "value", { get() {
  const t = ln(this);
  return t !== void 0 && (t.i = this.i), this.v;
}, set(t) {
  if (t !== this.v) {
    if (la > 100) throw new Error("Cycle detected");
    (function(e) {
      Re !== 0 && la === 0 && e.l !== lo && (e.l = lo, ca = { S: e, v: e.v, i: e.i, o: ca });
    })(this), this.v = t, this.i++, ea++, Re++;
    try {
      for (let e = this.t; e !== void 0; e = e.x) e.t.N();
    } finally {
      ma();
    }
  }
} }), er.prototype = new Kt(), er.prototype.h = function() {
  if (this.f &= -3, 1 & this.f) return !1;
  if ((36 & this.f) == 32 || (this.f &= -5, this.g === ea)) return !0;
  if (this.g = ea, this.f |= 1, this.i > 0 && !Ni(this)) return this.f &= -2, !0;
  const t = st;
  try {
    dn(this), st = this;
    const e = this.x();
    (16 & this.f || this.v !== e || this.i === 0) && (this.v = e, this.f &= -17, this.i++);
  } catch (e) {
    this.v = e, this.f |= 16, this.i++;
  }
  return st = t, Ci(this), this.f &= -2, !0;
}, er.prototype.S = function(t) {
  if (this.t === void 0) {
    this.f |= 36;
    for (let e = this.s; e !== void 0; e = e.n) e.S.S(e);
  }
  Kt.prototype.S.call(this, t);
}, er.prototype.U = function(t) {
  if (this.t !== void 0 && (Kt.prototype.U.call(this, t), this.t === void 0)) {
    this.f &= -33;
    for (let e = this.s; e !== void 0; e = e.n) e.S.U(e);
  }
}, er.prototype.N = function() {
  if (!(2 & this.f)) {
    this.f |= 6;
    for (let t = this.t; t !== void 0; t = t.x) t.t.N();
  }
}, Object.defineProperty(er.prototype, "value", { get() {
  if (1 & this.f) throw new Error("Cycle detected");
  const t = ln(this);
  if (this.h(), t !== void 0 && (t.i = this.i), 16 & this.f) throw this.v;
  return this.v;
} }), dr.prototype.c = function() {
  const t = this.S();
  try {
    if (8 & this.f || this.x === void 0) return;
    const e = this.x();
    typeof e == "function" && (this.m = e);
  } finally {
    t();
  }
}, dr.prototype.S = function() {
  if (1 & this.f) throw new Error("Cycle detected");
  this.f |= 1, this.f &= -9, Ei(this), dn(this), Re++;
  const t = st;
  return st = this, Nd.bind(this, t);
}, dr.prototype.N = function() {
  2 & this.f || (this.f |= 2, this.u = Rr, Rr = this);
}, dr.prototype.d = function() {
  this.f |= 8, 1 & this.f || zo(this);
}, dr.prototype.dispose = function() {
  this.d();
};
se({ build: (t, e, r) => xr(e), config: ir({ defaultSelection: "rootEnd", disabled: !1 }), name: "@lexical/extension/AutoFocus", register(t, e, r) {
  const o = r.getOutput();
  return ye(() => o.disabled.value ? void 0 : t.registerRootListener((n) => {
    t.focus(() => {
      const i = document.activeElement;
      n === null || i !== null && n.contains(i) || n.focus({ preventScroll: !0 });
    }, { defaultSelection: o.defaultSelection.peek() });
  }));
} });
function Ti() {
  const t = We(), e = re(), r = Br();
  t.clear(), t.append(r), e !== null && r.select(), xe(e) && (e.format = 0);
}
function Si(t, e = Ti) {
  return t.registerCommand(ni, (r) => (t.update(e), !0), To);
}
se({ build: (t, e, r) => xr(e), config: ir({ $onClear: Ti }), name: "@lexical/extension/ClearEditor", register(t, e, r) {
  const { $onClear: o } = r.getOutput();
  return ye(() => Si(t, o.value));
} });
function Cd(t) {
  return (typeof t.nodes == "function" ? t.nodes() : t.nodes) || [];
}
const Pa = Kc("format", { parse: (t) => typeof t == "number" ? t : 0 });
class Ii extends eo {
  $config() {
    return this.config("decorator-text", { extends: eo, stateConfigs: [{ flat: !0, stateConfig: Pa }] });
  }
  getFormat() {
    return ol(this, Pa);
  }
  getFormatFlags(e, r) {
    return Wo(this.getFormat(), e, r);
  }
  hasFormat(e) {
    const r = nl[e];
    return (this.getFormat() & r) !== 0;
  }
  setFormat(e) {
    return il(this, Pa, e);
  }
  toggleFormat(e) {
    const r = this.getFormat(), o = Wo(r, e, null);
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
function Ed(t) {
  return t instanceof Ii;
}
se({ name: "@lexical/extension/DecoratorText", nodes: () => [Ii], register: (t, e, r) => t.registerCommand(ii, (o) => {
  const n = re();
  if (si(n) || xe(n)) for (const i of n.getNodes()) Ed(i) && i.toggleFormat(o);
  return !1;
}, ci) });
function Ri(t, e) {
  let r;
  return Or(t(), { unwatched() {
    r && (r(), r = void 0);
  }, watched() {
    this.value = t(), r = e(this);
  } });
}
const wo = se({ build: (t) => Ri(() => t.getEditorState(), (e) => t.registerUpdateListener((r) => {
  e.value = r.editorState;
})), name: "@lexical/extension/EditorState" });
function wt(t, ...e) {
  const r = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const n of e) o.append("v", n);
  throw r.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
function Di(t, e) {
  if (t && e && !Array.isArray(e) && typeof t == "object" && typeof e == "object") {
    const r = t, o = e;
    for (const n in o) r[n] = Di(r[n], o[n]);
    return t;
  }
  return e;
}
const Oo = 0, uo = 1, zi = 2, $a = 3, Yr = 4, lr = 5, Aa = 6, Cr = 7;
function ja(t) {
  return t.id === Oo;
}
function Oi(t) {
  return t.id === zi;
}
function Td(t) {
  return function(e) {
    return e.id === uo;
  }(t) || wt(305, String(t.id), String(uo)), Object.assign(t, { id: zi });
}
const Sd = /* @__PURE__ */ new Set();
class Id {
  constructor(e, r) {
    Ht(this, "builder");
    Ht(this, "configs");
    Ht(this, "_dependency");
    Ht(this, "_peerNameSet");
    Ht(this, "extension");
    Ht(this, "state");
    Ht(this, "_signal");
    this.builder = e, this.extension = r, this.configs = /* @__PURE__ */ new Set(), this.state = { id: Oo };
  }
  mergeConfigs() {
    let e = this.extension.config || {};
    const r = this.extension.mergeConfig ? this.extension.mergeConfig.bind(this.extension) : Hc;
    for (const o of this.configs) e = r(e, o);
    return e;
  }
  init(e) {
    const r = this.state;
    Oi(r) || wt(306, String(r.id));
    const o = { getDependency: this.getInitDependency.bind(this), getDirectDependentNames: this.getDirectDependentNames.bind(this), getPeer: this.getInitPeer.bind(this), getPeerNameSet: this.getPeerNameSet.bind(this) }, n = { ...o, getDependency: this.getDependency.bind(this), getInitResult: this.getInitResult.bind(this), getPeer: this.getPeer.bind(this) }, i = function(c, l, d) {
      return Object.assign(c, { config: l, id: $a, registerState: d });
    }(r, this.mergeConfigs(), o);
    let s;
    this.state = i, this.extension.init && (s = this.extension.init(e, i.config, o)), this.state = function(c, l, d) {
      return Object.assign(c, { id: Yr, initResult: l, registerState: d });
    }(i, s, n);
  }
  build(e) {
    const r = this.state;
    let o;
    r.id !== Yr && wt(307, String(r.id), String(lr)), this.extension.build && (o = this.extension.build(e, r.config, r.registerState));
    const n = { ...r.registerState, getOutput: () => o, getSignal: this.getSignal.bind(this) };
    this.state = function(i, s, c) {
      return Object.assign(i, { id: lr, output: s, registerState: c });
    }(r, o, n);
  }
  register(e, r) {
    this._signal = r;
    const o = this.state;
    o.id !== lr && wt(308, String(o.id), String(lr));
    const n = this.extension.register && this.extension.register(e, o.config, o.registerState);
    return this.state = function(i) {
      return Object.assign(i, { id: Aa });
    }(o), () => {
      const i = this.state;
      i.id !== Cr && wt(309, String(o.id), String(Cr)), this.state = function(s) {
        return Object.assign(s, { id: lr });
      }(i), n && n();
    };
  }
  afterRegistration(e) {
    const r = this.state;
    let o;
    return r.id !== Aa && wt(310, String(r.id), String(Aa)), this.extension.afterRegistration && (o = this.extension.afterRegistration(e, r.config, r.registerState)), this.state = function(n) {
      return Object.assign(n, { id: Cr });
    }(r), o;
  }
  getSignal() {
    return this._signal === void 0 && wt(311), this._signal;
  }
  getInitResult() {
    this.extension.init === void 0 && wt(312, this.extension.name);
    const e = this.state;
    return function(r) {
      return r.id >= Yr;
    }(e) || wt(313, String(e.id), String(Yr)), e.initResult;
  }
  getInitPeer(e) {
    const r = this.builder.extensionNameMap.get(e);
    return r ? r.getExtensionInitDependency() : void 0;
  }
  getExtensionInitDependency() {
    const e = this.state;
    return function(r) {
      return r.id >= $a;
    }(e) || wt(314, String(e.id), String($a)), { config: e.config };
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
      return r.id >= Cr;
    }(e) || wt(316, String(e.id), String(Cr)), e;
  }
  getDirectDependentNames() {
    return this.builder.incomingEdges.get(this.extension.name) || Sd;
  }
  getPeerNameSet() {
    let e = this._peerNameSet;
    return e || (e = new Set((this.extension.peerDependencies || []).map(([r]) => r)), this._peerNameSet = e), e;
  }
  getExtensionDependency() {
    if (!this._dependency) {
      const e = this.state;
      (function(r) {
        return r.id >= lr;
      })(e) || wt(317, this.extension.name), this._dependency = { config: e.config, init: e.initResult, output: e.output };
    }
    return this._dependency;
  }
}
const wn = { tag: Eo };
function Rd() {
  const t = We();
  t.isEmpty() && t.append(Br());
}
const Dd = se({ config: ir({ setOptions: wn, updateOptions: wn }), init: ({ $initialEditorState: t = Rd }) => ({ $initialEditorState: t, initialized: !1 }), afterRegistration(t, { updateOptions: e, setOptions: r }, o) {
  const n = o.getInitResult();
  if (!n.initialized) {
    n.initialized = !0;
    const { $initialEditorState: i } = n;
    if (Xc(i)) t.setEditorState(i, r);
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
}, name: "@lexical/extension/InitialState", nodes: [qc, ri, Yc, Wc, ei] }), un = Symbol.for("@lexical/extension/LexicalBuilder");
function pn() {
}
function zd(t) {
  throw t;
}
function Wr(t) {
  return Array.isArray(t) ? t : [t];
}
const La = "0.43.0+prod.esm";
class hr {
  constructor(e) {
    Ht(this, "roots");
    Ht(this, "extensionNameMap");
    Ht(this, "outgoingConfigEdges");
    Ht(this, "incomingEdges");
    Ht(this, "conflicts");
    Ht(this, "_sortedExtensionReps");
    Ht(this, "PACKAGE_VERSION");
    this.outgoingConfigEdges = /* @__PURE__ */ new Map(), this.incomingEdges = /* @__PURE__ */ new Map(), this.extensionNameMap = /* @__PURE__ */ new Map(), this.conflicts = /* @__PURE__ */ new Map(), this.PACKAGE_VERSION = La, this.roots = e;
    for (const r of e) this.addExtension(r);
  }
  static fromExtensions(e) {
    const r = [Wr(Dd)];
    for (const o of e) r.push(Wr(o));
    return new hr(r);
  }
  static maybeFromEditor(e) {
    const r = e[un];
    return r && (r.PACKAGE_VERSION !== La && wt(292, r.PACKAGE_VERSION, La), r instanceof hr || wt(293)), r;
  }
  static fromEditor(e) {
    const r = hr.maybeFromEditor(e);
    return r === void 0 && wt(294), r;
  }
  constructEditor() {
    const { $initialEditorState: e, onError: r, ...o } = this.buildCreateEditorArgs(), n = Object.assign(ti({ ...o, ...r ? { onError: (i) => {
      r(i, n);
    } } : {} }), { [un]: this });
    for (const i of this.sortedExtensionReps()) i.build(n);
    return n;
  }
  buildEditor() {
    let e = pn;
    function r() {
      try {
        e();
      } finally {
        e = pn;
      }
    }
    const o = Object.assign(this.constructEditor(), { dispose: r, [Symbol.dispose]: r });
    return e = Me(this.registerEditor(o), () => o.setRootElement(null)), o;
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
    const r = Wr(e), [o] = r;
    typeof o.name != "string" && wt(297, typeof o.name);
    let n = this.extensionNameMap.get(o.name);
    if (n !== void 0 && n.extension !== o && wt(298, o.name), !n) {
      n = new Id(this, o), this.extensionNameMap.set(o.name, n);
      const i = this.conflicts.get(o.name);
      typeof i == "string" && wt(299, o.name, i);
      for (const s of o.conflictsWith || []) this.extensionNameMap.has(s) && wt(299, o.name, s), this.conflicts.set(s, o.name);
      for (const s of o.dependencies || []) {
        const c = Wr(s);
        this.addEdge(o.name, c[0].name, c.slice(1)), this.addExtension(c);
      }
      for (const [s, c] of o.peerDependencies || []) this.addEdge(o.name, s, c ? [c] : []);
    }
  }
  sortedExtensionReps() {
    if (this._sortedExtensionReps) return this._sortedExtensionReps;
    const e = [], r = (o, n) => {
      let i = o.state;
      if (Oi(i)) return;
      const s = o.extension.name;
      var c;
      ja(i) || wt(300, s, n || "[unknown]"), ja(c = i) || wt(304, String(c.id), String(Oo)), i = Object.assign(c, { id: uo }), o.state = i;
      const l = this.outgoingConfigEdges.get(s);
      if (l) for (const d of l.keys()) {
        const w = this.extensionNameMap.get(d);
        w && r(w, s);
      }
      i = Td(i), o.state = i, e.push(o);
    };
    for (const o of this.extensionNameMap.values()) ja(o.state) && r(o);
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
    return Me(...n);
  }
  buildCreateEditorArgs() {
    const e = {}, r = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map(), i = {}, s = {}, c = this.sortedExtensionReps();
    for (const w of c) {
      const { extension: h } = w;
      if (h.onError !== void 0 && (e.onError = h.onError), h.disableEvents !== void 0 && (e.disableEvents = h.disableEvents), h.parentEditor !== void 0 && (e.parentEditor = h.parentEditor), h.editable !== void 0 && (e.editable = h.editable), h.namespace !== void 0 && (e.namespace = h.namespace), h.$initialEditorState !== void 0 && (e.$initialEditorState = h.$initialEditorState), h.nodes) for (const p of Cd(h)) {
        if (typeof p != "function") {
          const g = o.get(p.replace);
          g && wt(302, h.name, p.replace.name, g.extension.name), o.set(p.replace, w);
        }
        r.add(p);
      }
      if (h.html) {
        if (h.html.export) for (const [p, g] of h.html.export.entries()) n.set(p, g);
        h.html.import && Object.assign(i, h.html.import);
      }
      h.theme && Di(s, h.theme);
    }
    Object.keys(s).length > 0 && (e.theme = s), r.size && (e.nodes = [...r]);
    const l = Object.keys(i).length > 0, d = n.size > 0;
    (l || d) && (e.html = {}, l && (e.html.import = i), d && (e.html.export = n));
    for (const w of c) w.init(e);
    return e.onError || (e.onError = zd), e;
  }
}
const Od = /* @__PURE__ */ new Set(), hn = se({ build(t, e, r) {
  const o = r.getDependency(wo).output, n = Or({ watchedNodeKeys: /* @__PURE__ */ new Map() }), i = Ri(() => {
  }, () => ye(() => {
    const s = i.peek(), { watchedNodeKeys: c } = n.value;
    let l, d = !1;
    o.value.read(() => {
      if (re()) for (const [w, h] of c.entries()) {
        if (h.size === 0) {
          c.delete(w);
          continue;
        }
        const p = cl(w), g = p && p.isSelected() || !1;
        d = d || g !== (!!s && s.has(w)), g && (l = l || /* @__PURE__ */ new Set(), l.add(w));
      }
    }), !d && l && s && l.size === s.size || (i.value = l);
  }));
  return { watchNodeKey: function(s) {
    const c = _d(() => (i.value || Od).has(s)), { watchedNodeKeys: l } = n.peek();
    let d = l.get(s);
    const w = d !== void 0;
    return d = d || /* @__PURE__ */ new Set(), d.add(c), w || (l.set(s, d), n.value = { watchedNodeKeys: l }), c;
  } };
}, dependencies: [wo], name: "@lexical/extension/NodeSelection" }), Md = Jc("INSERT_HORIZONTAL_RULE_COMMAND");
class gr extends eo {
  static getType() {
    return "horizontalrule";
  }
  static clone(e) {
    return new gr(e.__key);
  }
  static importJSON(e) {
    return Mo().updateFromJSON(e);
  }
  static importDOM() {
    return { hr: () => ({ conversion: Pd, priority: 0 }) };
  }
  exportDOM() {
    return { element: document.createElement("hr") };
  }
  createDOM(e) {
    const r = document.createElement("hr");
    return li(r, e.theme.hr), r;
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
function Pd() {
  return { node: Mo() };
}
function Mo() {
  return sl(gr);
}
function $d(t) {
  return t instanceof gr;
}
se({ dependencies: [wo, hn], name: "@lexical/extension/HorizontalRule", nodes: () => [gr], register(t, e, r) {
  const { watchNodeKey: o } = r.getDependency(hn).output, n = Or({ nodeSelections: /* @__PURE__ */ new Map() }), i = t._config.theme.hrSelected ?? "selected";
  return Me(t.registerCommand(Md, (s) => {
    const c = re();
    if (!xe(c)) return !1;
    if (c.focus.getNode() !== null) {
      const l = Mo();
      md(l);
    }
    return !0;
  }, To), t.registerCommand(Zc, (s) => {
    if (Qc(s.target)) {
      const c = tl(s.target);
      if ($d(c)) return function(l, d = !1) {
        const w = re(), h = l.isSelected(), p = l.getKey();
        let g;
        d && si(w) ? g = w : (g = el(), rl(g)), h ? g.delete(p) : g.add(p);
      }(c, s.shiftKey), !0;
    }
    return !1;
  }, ci), t.registerMutationListener(gr, (s, c) => {
    yd(() => {
      let l = !1;
      const { nodeSelections: d } = n.peek();
      for (const [w, h] of s.entries()) if (h === "destroyed") d.delete(w), l = !0;
      else {
        const p = d.get(w), g = t.getElementByKey(w);
        p ? p.domNode.value = g : (l = !0, d.set(w, { domNode: Or(g), selectedSignal: o(w) }));
      }
      l && (n.value = { nodeSelections: d });
    });
  }), ye(() => {
    const s = [];
    for (const { domNode: c, selectedSignal: l } of n.value.nodeSelections.values()) s.push(ye(() => {
      const d = c.value;
      d && (l.value ? li(d, i) : ll(d, i));
    }));
    return Me(...s);
  }));
} });
se({ build: (t, e) => xr({ inheritEditableFromParent: e.inheritEditableFromParent }), config: ir({ $getParentEditor: function() {
  const t = al();
  return hr.fromEditor(t), t;
}, inheritEditableFromParent: !1 }), init: (t, e, r) => {
  const o = e.$getParentEditor();
  t.parentEditor = o, t.theme = t.theme || o._config.theme;
}, name: "@lexical/extension/NestedEditor", register: (t, e, r) => ye(() => {
  const o = t._parentEditor;
  if (o && r.getOutput().inheritEditableFromParent.value) return t.setEditable(o.isEditable()), o.registerEditableListener(t.setEditable.bind(t));
}) });
se({ build: (t, e, r) => xr(e), config: ir({ disabled: !1, onReposition: void 0 }), name: "@lexical/utils/SelectionAlwaysOnDisplay", register: (t, e, r) => {
  const o = r.getOutput();
  return ye(() => {
    if (!o.disabled.value) return gd(t, o.onReposition.value);
  });
} });
function Mi(t) {
  return t.canBeEmpty();
}
function Ad(t, e, r = Mi) {
  return Me(t.registerCommand(dl, (o) => {
    const n = re();
    if (!xe(n)) return !1;
    o.preventDefault();
    const i = function(s) {
      if (s.getNodes().filter((p) => wl(p) && p.canIndent()).length > 0) return !0;
      const c = s.anchor, l = s.focus, d = l.isBefore(c) ? l : c, w = d.getNode(), h = fd(w);
      if (h.canIndent()) {
        const p = h.getKey();
        let g = ul();
        if (g.anchor.set(p, 0, "element"), g.focus.set(p, 0, "element"), g = pl(g), g.anchor.is(d)) return !0;
      }
      return !1;
    }(n) ? o.shiftKey ? hl : Xo : gl;
    return t.dispatchCommand(i, void 0);
  }, To), t.registerCommand(Xo, () => {
    const o = typeof e == "number" ? e : e ? e.peek() : null, n = re();
    if (!xe(n)) return !1;
    const i = typeof r == "function" ? r : r.peek();
    return bd((s) => {
      if (i(s)) {
        const c = s.getIndent() + 1;
        (!o || c < o) && s.setIndent(c);
      }
    });
  }, So));
}
se({ build: (t, e, r) => xr(e), config: ir({ $canIndent: Mi, disabled: !1, maxIndent: null }), name: "@lexical/extension/TabIndentation", register(t, e, r) {
  const { disabled: o, maxIndent: n, $canIndent: i } = r.getOutput();
  return ye(() => {
    if (!o.value) return Ad(t, n, i);
  });
} });
const jd = se({ name: "@lexical/react/ReactProvider" });
function Ld() {
  return We().getTextContent();
}
function Bd(t, e = !0) {
  if (t) return !1;
  let r = Ld();
  return e && (r = r.trim()), r === "";
}
function Vd(t) {
  if (!Bd(t, !1)) return !1;
  const e = We().getChildren(), r = e.length;
  if (r > 1) return !1;
  for (let o = 0; o < r; o++) {
    const n = e[o];
    if (fl(n)) return !1;
    if (zr(n)) {
      if (!ml(n) || n.__indent !== 0) return !1;
      const i = n.getChildren(), s = i.length;
      for (let c = 0; c < s; c++) {
        const l = i[o];
        if (!ro(l)) return !1;
      }
    }
  }
  return !0;
}
function Pi(t) {
  return () => Vd(t);
}
function $i(t) {
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
            const [d, w, h, p, g] = l;
            t.update(() => {
              const f = re();
              if (xe(f)) {
                const b = f.anchor;
                let v = b.getNode(), D = 0, k = 0;
                if (ro(v) && d >= 0 && w >= 0 && (D = d, k = d + w, f.setTextNodeRange(v, D, v, k)), D === k && h === "" || (f.insertRawText(h), v = b.getNode()), ro(v)) {
                  D = p, k = p + g;
                  const T = v.getTextContentSize();
                  D = D > T ? T : D, k = k > T ? T : k, f.setTextNodeRange(v, D, v, k);
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
se({ build: (t, e, r) => xr(e), config: ir({ disabled: typeof window > "u" }), name: "@lexical/dragon", register: (t, e, r) => ye(() => r.getOutput().disabled.value ? void 0 : $i(t)) });
function Gd(t, ...e) {
  const r = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const n of e) o.append("v", n);
  throw r.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
const Po = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? ee : J;
function Fd({ editor: t, ErrorBoundary: e }) {
  return function(r, o) {
    const [n, i] = N(() => r.getDecorators());
    return Po(() => r.registerDecoratorListener((s) => {
      kl(() => {
        i(s);
      });
    }), [r]), J(() => {
      i(r.getDecorators());
    }, [r]), $(() => {
      const s = [], c = Object.keys(n);
      for (let l = 0; l < c.length; l++) {
        const d = c[l], w = a(o, { onError: (p) => r._onError(p), children: a(kc, { fallback: null, children: n[d] }) }), h = r.getElementByKey(d);
        h !== null && s.push(_l(w, h, d));
      }
      return s;
    }, [o, n, r]);
  }(t, e);
}
function Ud({ editor: t, ErrorBoundary: e }) {
  return function(r) {
    const o = hr.maybeFromEditor(r);
    if (o && o.hasExtensionByName(jd.name)) {
      for (const n of ["@lexical/plain-text", "@lexical/rich-text"]) o.hasExtensionByName(n) && Gd(320, n);
      return !0;
    }
    return !1;
  }(t) ? null : a(Fd, { editor: t, ErrorBoundary: e });
}
function gn(t) {
  return t.getEditorState().read(Pi(t.isComposing()));
}
function Hd({ contentEditable: t, placeholder: e = null, ErrorBoundary: r }) {
  const [o] = Ce();
  return function(n) {
    Po(() => Me(yl(n), $i(n)), [n]);
  }(o), u(it, { children: [t, a(Kd, { content: e }), a(Ud, { editor: o, ErrorBoundary: r })] });
}
function Kd({ content: t }) {
  const [e] = Ce(), r = function(n) {
    const [i, s] = N(() => gn(n));
    return Po(() => {
      function c() {
        const l = gn(n);
        s(l);
      }
      return c(), Me(n.registerUpdateListener(() => {
        c();
      }), n.registerEditableListener(() => {
        c();
      }));
    }, [n]), i;
  }(e), o = cd();
  return r ? typeof t == "function" ? t(o) : t : null;
}
function qd({ defaultSelection: t }) {
  const [e] = Ce();
  return J(() => {
    e.focus(() => {
      const r = document.activeElement, o = e.getRootElement();
      o === null || r !== null && o.contains(r) || o.focus({ preventScroll: !0 });
    }, { defaultSelection: t });
  }, [t, e]), null;
}
const Yd = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? ee : J;
function Wd({ onClear: t }) {
  const [e] = Ce();
  return Yd(() => Si(e, t), [e, t]), null;
}
const Ai = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? ee : J;
function Xd({ editor: t, ariaActiveDescendant: e, ariaAutoComplete: r, ariaControls: o, ariaDescribedBy: n, ariaErrorMessage: i, ariaExpanded: s, ariaInvalid: c, ariaLabel: l, ariaLabelledBy: d, ariaMultiline: w, ariaOwns: h, ariaRequired: p, autoCapitalize: g, className: f, id: b, role: v = "textbox", spellCheck: D = !0, style: k, tabIndex: T, "data-testid": R, ...M }, I) {
  const [j, P] = N(t.isEditable()), O = B((W) => {
    W && W.ownerDocument && W.ownerDocument.defaultView ? t.setRootElement(W) : t.setRootElement(null);
  }, [t]), q = $(() => /* @__PURE__ */ function(...W) {
    return (F) => {
      for (const E of W) typeof E == "function" ? E(F) : E != null && (E.current = F);
    };
  }(I, O), [O, I]);
  return Ai(() => (P(t.isEditable()), t.registerEditableListener((W) => {
    P(W);
  })), [t]), a("div", { "aria-activedescendant": j ? e : void 0, "aria-autocomplete": j ? r : "none", "aria-controls": j ? o : void 0, "aria-describedby": n, ...i != null ? { "aria-errormessage": i } : {}, "aria-expanded": j && v === "combobox" ? !!s : void 0, ...c != null ? { "aria-invalid": c } : {}, "aria-label": l, "aria-labelledby": d, "aria-multiline": w, "aria-owns": j ? h : void 0, "aria-readonly": !j || void 0, "aria-required": p, autoCapitalize: g, className: f, contentEditable: j, "data-testid": R, id: b, ref: q, role: v, spellCheck: D, style: k, tabIndex: T, ...M });
}
const Jd = Jn(Xd);
function fn(t) {
  return t.getEditorState().read(Pi(t.isComposing()));
}
const Zd = Jn(Qd);
function Qd(t, e) {
  const { placeholder: r, ...o } = t, [n] = Ce();
  return u(it, { children: [a(Jd, { editor: n, ...o, ref: e }), r != null && a(tw, { editor: n, content: r })] });
}
function tw({ content: t, editor: e }) {
  const r = function(s) {
    const [c, l] = N(() => fn(s));
    return Ai(() => {
      function d() {
        const w = fn(s);
        l(w);
      }
      return d(), Me(s.registerUpdateListener(() => {
        d();
      }), s.registerEditableListener(() => {
        d();
      }));
    }, [s]), c;
  }(e), [o, n] = N(e.isEditable());
  if (ee(() => (n(e.isEditable()), e.registerEditableListener((s) => {
    n(s);
  })), [e]), !r) return null;
  let i = null;
  return typeof t == "function" ? i = t(o) : t !== null && (i = t), i === null ? null : a("div", { "aria-hidden": !0, children: i });
}
function ew({
  placeholder: t,
  className: e,
  placeholderClassName: r
}) {
  return /* @__PURE__ */ a(
    Zd,
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
const ji = jr(void 0);
function rw({
  activeEditor: t,
  $updateToolbar: e,
  blockType: r,
  setBlockType: o,
  showModal: n,
  children: i
}) {
  const s = $(
    () => ({
      activeEditor: t,
      $updateToolbar: e,
      blockType: r,
      setBlockType: o,
      showModal: n
    }),
    [t, e, r, o, n]
  );
  return /* @__PURE__ */ a(ji.Provider, { value: s, children: i });
}
function Li() {
  const t = ha(ji);
  if (!t)
    throw new Error("useToolbarContext must be used within a ToolbarContext provider");
  return t;
}
function aw() {
  const [t, e] = N(void 0), r = B(() => {
    e(void 0);
  }, []), o = $(() => {
    if (t === void 0)
      return;
    const { title: i, content: s } = t;
    return /* @__PURE__ */ a(Ua, { open: !0, onOpenChange: r, children: /* @__PURE__ */ u(Ha, { children: [
      /* @__PURE__ */ a(Ka, { children: /* @__PURE__ */ a(qa, { children: i }) }),
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
function ow({
  children: t
}) {
  const [e] = Ce(), [r, o] = N(e), [n, i] = N("paragraph"), [s, c] = aw(), l = () => {
  };
  return J(() => r.registerCommand(
    di,
    (d, w) => (o(w), !1),
    So
  ), [r]), /* @__PURE__ */ u(
    rw,
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
function nw(t) {
  const [e] = Ce(), { activeEditor: r } = Li();
  J(() => r.registerCommand(
    di,
    () => {
      const o = re();
      return o && t(o), !1;
    },
    So
  ), [e, t]), J(() => {
    r.getEditorState().read(() => {
      const o = re();
      o && t(o);
    });
  }, [r, t]);
}
const mn = [
  { format: "bold", icon: Os, label: "Bold" },
  { format: "italic", icon: Ms, label: "Italic" }
  // CUSTOM: TJ removed underline and strikethrough as they are not supported by the current comment
  // data conversion and are not in P9 anyway. We can add these back if we ever get this supported.
  /* { format: 'underline', icon: UnderlineIcon, label: 'Underline' },
  { format: 'strikethrough', icon: StrikethroughIcon, label: 'Strikethrough' }, */
];
function iw() {
  const { activeEditor: t } = Li(), [e, r] = N([]), o = B((n) => {
    if (xe(n) || Nl(n)) {
      const i = [];
      mn.forEach(({ format: s }) => {
        n.hasFormat(s) && i.push(s);
      }), r((s) => s.length !== i.length || !i.every((c) => s.includes(c)) ? i : s);
    }
  }, []);
  return nw(o), /* @__PURE__ */ a(
    On,
    {
      type: "multiple",
      value: e,
      onValueChange: r,
      variant: "outline",
      size: "sm",
      children: mn.map(({ format: n, icon: i, label: s }) => /* @__PURE__ */ a(
        Xr,
        {
          value: n,
          "aria-label": s,
          onClick: () => {
            t.dispatchCommand(ii, n);
          },
          children: /* @__PURE__ */ a(i, { className: "tw:h-4 tw:w-4" })
        },
        n
      ))
    }
  );
}
function sw({ onClear: t }) {
  const [e] = Ce();
  J(() => {
    t && t(() => {
      e.dispatchCommand(ni, void 0);
    });
  }, [e, t]);
}
function cw({
  placeholder: t = "Start typing ...",
  autoFocus: e = !1,
  onClear: r
}) {
  const [, o] = N(void 0);
  return /* @__PURE__ */ u("div", { className: "tw:relative", children: [
    /* @__PURE__ */ a(ow, { children: () => /* @__PURE__ */ a("div", { className: "tw:sticky tw:top-0 tw:z-10 tw:flex tw:gap-2 tw:overflow-auto tw:border-b tw:p-1", children: /* @__PURE__ */ a(iw, {}) }) }),
    /* @__PURE__ */ u("div", { className: "tw:relative", children: [
      /* @__PURE__ */ a(
        Hd,
        {
          contentEditable: /* @__PURE__ */ a("div", { ref: (i) => {
            i !== void 0 && o(i);
          }, children: /* @__PURE__ */ a(ew, { placeholder: t }) }),
          ErrorBoundary: nd
        }
      ),
      e && /* @__PURE__ */ a(qd, { defaultSelection: "rootEnd" }),
      /* @__PURE__ */ a(sw, { onClear: r }),
      /* @__PURE__ */ a(Wd, {})
    ] })
  ] });
}
const lw = {
  namespace: "commentEditor",
  theme: Ro,
  nodes: Do,
  onError: (t) => {
    console.error(t);
  }
};
function da({
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
          Ql,
          {
            initialConfig: {
              ...lw,
              ...t ? { editorState: t } : {},
              ...e ? { editorState: JSON.stringify(e) } : {}
            },
            children: /* @__PURE__ */ u(St, { children: [
              /* @__PURE__ */ a(cw, { placeholder: n, autoFocus: i, onClear: s }),
              /* @__PURE__ */ a(
                ed,
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
function Vi(t) {
  return t ? t.some(
    (e) => e && "text" in e && e.text.trim().length > 0 ? !0 : !e || !("children" in e) ? !1 : Vi(e.children)
  ) : !1;
}
function ie(t) {
  var e;
  return (e = t == null ? void 0 : t.root) != null && e.children ? Vi(t.root.children) : !1;
}
function dw(t) {
  if (!t || t.trim() === "")
    throw new Error("Input HTML is empty");
  const e = wi({
    namespace: "EditorUtils",
    theme: Ro,
    nodes: Do,
    onError: (o) => {
      console.error(o);
    }
  });
  let r;
  if (e.update(
    () => {
      const n = new DOMParser().parseFromString(t, "text/html"), i = El(e, n);
      We().clear(), vl(i);
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
function wa(t) {
  const e = wi({
    namespace: "EditorUtils",
    theme: Ro,
    nodes: Do,
    onError: (n) => {
      console.error(n);
    }
  }), r = e.parseEditorState(JSON.stringify(t));
  e.setEditorState(r);
  let o = "";
  return e.getEditorState().read(() => {
    o = Cl(e);
  }), o = o.replace(/\s+style="[^"]*"/g, "").replace(/\s+class="[^"]*"/g, "").replace(/<span>(.*?)<\/span>/g, "$1").replace(/<b><strong[^>]*>(.*?)<\/strong><\/b>/g, "<b>$1</b>").replace(/<strong><b[^>]*>(.*?)<\/b><\/strong>/g, "<b>$1</b>").replace(/<i><em[^>]*>(.*?)<\/em><\/i>/g, "<i>$1</i>").replace(/<em><i[^>]*>(.*?)<\/i><\/em>/g, "<i>$1</i>").replace(/<u><span[^>]*>(.*?)<\/span><\/u>/g, "<u>$1</u>").replace(/<s><span[^>]*>(.*?)<\/span><\/s>/g, "<s>$1</s>").replace(/<br\s*\/?>/gi, "<br/>"), o;
}
function $o(t) {
  return ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Home", "End"].includes(t.key) ? (t.stopPropagation(), !0) : !1;
}
const Gi = Object.freeze([
  "%cancelButton_tooltip%",
  "%acceptButton_tooltip%"
]), vn = (t, e) => t[e] ?? e;
function Fi({
  onCancelClick: t,
  onAcceptClick: e,
  canAccept: r = !0,
  localizedStrings: o = {},
  className: n = "tw:h-6 tw:w-6",
  acceptLabel: i
}) {
  const s = vn(o, "%cancelButton_tooltip%"), c = i ?? vn(o, "%acceptButton_tooltip%");
  return /* @__PURE__ */ u(fo, { children: [
    /* @__PURE__ */ a(St, { children: /* @__PURE__ */ u(It, { children: [
      /* @__PURE__ */ a(Rt, { asChild: !0, children: /* @__PURE__ */ a(
        Z,
        {
          "aria-label": s,
          className: n,
          size: "icon",
          onClick: t,
          variant: "secondary",
          children: /* @__PURE__ */ a(No, {})
        }
      ) }),
      /* @__PURE__ */ a(Dt, { children: /* @__PURE__ */ a("p", { children: s }) })
    ] }) }),
    /* @__PURE__ */ a(Mn, {}),
    /* @__PURE__ */ a(St, { children: /* @__PURE__ */ u(It, { children: [
      /* @__PURE__ */ a(Rt, { asChild: !0, children: /* @__PURE__ */ a(
        Z,
        {
          "aria-label": c,
          className: n,
          size: "icon",
          onClick: e,
          disabled: !r,
          children: /* @__PURE__ */ a(Oe, {})
        }
      ) }),
      /* @__PURE__ */ a(Dt, { children: /* @__PURE__ */ a("p", { children: c }) })
    ] }) })
  ] });
}
const ww = "verseText", eh = Object.freeze([
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
]), Ui = [
  "tw:prose tw:max-w-none tw:break-words tw:text-sm tw:font-normal tw:text-foreground",
  "tw:[&>blockquote]:border-s-0 tw:[&>blockquote]:p-0 tw:[&>blockquote]:ps-0 tw:[&>blockquote]:font-normal tw:[&>blockquote]:not-italic tw:[&>blockquote]:text-foreground",
  "tw:prose-quoteless"
].join(" ");
function Hi(t) {
  return (t == null ? void 0 : t.conflictType) === ww;
}
function Ki(t) {
  return t === "replaced" ? "reject" : t === "merged" ? "merged" : "accept";
}
function ra(t, e) {
  return t === "" ? e["%comment_assign_unassigned%"] ?? "Unassigned" : t === "Team" ? e["%comment_assign_team%"] ?? "Team" : t;
}
function Ao(t) {
  const e = mo();
  return t.key === "Enter" && (e && t.metaKey || !e && t.ctrlKey);
}
const uw = {
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
function Ba(t, e) {
  return t === "" ? e["%commentEditor_unassigned%"] ?? "Unassigned" : t === "Team" ? e["%commentEditor_team%"] ?? "Team" : t;
}
function rh({
  assignableUsers: t,
  onSave: e,
  onClose: r,
  localizedStrings: o,
  initialAssignedUser: n
}) {
  const [i, s] = N(uw), [c, l] = N(n), [d, w] = N(!1), h = K(void 0), p = K(null);
  J(() => {
    let v = !0;
    const D = p.current;
    if (!D) return;
    const k = setTimeout(() => {
      v && Bi(D);
    }, 300);
    return () => {
      v = !1, clearTimeout(k);
    };
  }, []);
  const g = B(() => {
    if (!ie(i)) return;
    const v = wa(i);
    e(v, c);
  }, [i, e, c]), f = o["%commentEditor_placeholder%"] ?? "Type your comment here...", b = o["%commentEditor_assignTo_label%"] ?? "Assign to";
  return /* @__PURE__ */ u("div", { className: "pr-twp tw:grid tw:gap-3", children: [
    /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:justify-between", children: [
      /* @__PURE__ */ a("span", { className: "tw:text-sm tw:font-medium", children: b }),
      /* @__PURE__ */ a(
        Fi,
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
      /* @__PURE__ */ a(De, { asChild: !0, children: /* @__PURE__ */ u(
        Z,
        {
          variant: "outline",
          className: "tw:flex tw:w-full tw:items-center tw:justify-start tw:gap-2",
          disabled: t.length === 0,
          children: [
            /* @__PURE__ */ a(Gn, { className: "tw:h-4 tw:w-4" }),
            /* @__PURE__ */ a("span", { children: Ba(c !== void 0 ? c : "", o) })
          ]
        }
      ) }),
      /* @__PURE__ */ a(
        $e,
        {
          className: "tw:w-auto tw:p-0",
          align: "start",
          onKeyDown: (v) => {
            v.key === "Escape" && (v.stopPropagation(), w(!1));
          },
          children: /* @__PURE__ */ a(Ae, { children: /* @__PURE__ */ a(je, { children: t.map((v) => /* @__PURE__ */ a(
            ke,
            {
              onSelect: () => {
                l(v || void 0), w(!1);
              },
              className: "tw:flex tw:items-center",
              children: /* @__PURE__ */ a("span", { children: Ba(v, o) })
            },
            v || "unassigned"
          )) }) })
        }
      )
    ] }) }),
    /* @__PURE__ */ a(
      "div",
      {
        ref: p,
        role: "textbox",
        tabIndex: -1,
        className: "tw:outline-hidden",
        onKeyDownCapture: (v) => {
          v.key === "Escape" ? (v.preventDefault(), v.stopPropagation(), r()) : Ao(v) && (v.preventDefault(), v.stopPropagation(), ie(i) && g());
        },
        onKeyDown: (v) => {
          $o(v), (v.key === "Enter" || v.key === " ") && v.stopPropagation();
        },
        children: /* @__PURE__ */ a(
          da,
          {
            editorSerializedState: i,
            onSerializedChange: (v) => s(v),
            placeholder: f,
            onClear: (v) => {
              h.current = v;
            }
          }
        )
      }
    )
  ] });
}
const ah = Object.freeze([
  "%commentEditor_placeholder%",
  "%commentEditor_assignTo_label%",
  "%commentEditor_saveButton_tooltip%",
  "%commentEditor_unassigned%",
  "%commentEditor_team%",
  ...Gi
]), oh = Object.freeze([
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
]), pw = "comment-list";
function nh(t) {
  return t;
}
function hw({
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
function ih({ className: t, ...e }) {
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
function sh({ className: t, ...e }) {
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
function ch({ className: t, ...e }) {
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
function gw({ className: t, ...e }) {
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
function lh({ className: t, ...e }) {
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
function fw({
  className: t,
  size: e = "default",
  ...r
}) {
  return /* @__PURE__ */ a(
    Io.Root,
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
function dh({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    Io.Image,
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
function mw({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    Io.Fallback,
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
function bn({
  comment: t,
  isReply: e = !1,
  localizedStrings: r,
  isThreadExpanded: o = !1,
  handleUpdateComment: n,
  handleDeleteComment: i,
  onEditingChange: s,
  canEditOrDelete: c = !1
}) {
  const [l, d] = N(!1), [w, h] = N(), p = K(null);
  J(() => {
    if (!l) return;
    let I = !0;
    const j = p.current;
    if (!j) return;
    const P = setTimeout(() => {
      I && Bi(j);
    }, 300);
    return () => {
      I = !1, clearTimeout(P);
    };
  }, [l]);
  const g = B(
    (I) => {
      I && I.stopPropagation(), d(!1), h(void 0), s == null || s(!1);
    },
    [s]
  ), f = B(
    async (I) => {
      if (I && I.stopPropagation(), !w || !n) return;
      await n(
        t.id,
        wa(w)
      ) && (d(!1), h(void 0), s == null || s(!1));
    },
    [w, n, t.id, s]
  ), b = $(() => {
    const I = new Date(t.date), j = dc(
      I,
      r["%comment_date_today%"],
      r["%comment_date_yesterday%"]
    ), P = I.toLocaleTimeString(void 0, {
      hour: "numeric",
      minute: "2-digit"
    });
    return qe(r["%comment_dateAtTime%"], {
      date: j,
      time: P
    });
  }, [t.date, r]), v = $(() => t.user, [t.user]), D = $(
    () => t.user.split(" ").map((I) => I[0]).join("").toUpperCase().slice(0, 2),
    [t.user]
  ), k = $(() => Co(t.contents), [t.contents]), T = $(
    () => t.contents.replace(/<[^>]*>/g, "").trim().length > 0,
    [t.contents]
  ), R = !!t.conflictResolutionAction && !T, M = $(() => {
    if (o && c)
      return /* @__PURE__ */ u(it, { children: [
        /* @__PURE__ */ u(
          ar,
          {
            onClick: (I) => {
              I.stopPropagation(), d(!0), h(dw(t.contents)), s == null || s(!0);
            },
            children: [
              /* @__PURE__ */ a(Ps, { className: "tw:me-2 tw:h-4 tw:w-4" }),
              r["%comment_editComment%"]
            ]
          }
        ),
        /* @__PURE__ */ u(
          ar,
          {
            onClick: async (I) => {
              I.stopPropagation(), i && await i(t.id);
            },
            children: [
              /* @__PURE__ */ a($s, { className: "tw:me-2 tw:h-4 tw:w-4" }),
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
        /* @__PURE__ */ a(fw, { className: "tw:h-8 tw:w-8", children: /* @__PURE__ */ a(mw, { className: "tw:text-xs tw:font-medium", children: D }) }),
        /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-1 tw:flex-col tw:gap-2", children: [
          /* @__PURE__ */ u("div", { className: "tw:flex tw:w-full tw:flex-row tw:flex-wrap tw:items-baseline tw:gap-x-2", children: [
            /* @__PURE__ */ a("p", { className: "tw:text-sm tw:font-medium", children: v }),
            /* @__PURE__ */ a("p", { className: "tw:text-xs tw:font-normal tw:text-muted-foreground", children: b }),
            /* @__PURE__ */ a("div", { className: "tw:flex-1" }),
            e && t.assignedUser !== void 0 && /* @__PURE__ */ u(ze, { variant: "secondary", className: "tw:text-xs tw:font-normal", children: [
              "→ ",
              ra(t.assignedUser, r)
            ] })
          ] }),
          l && /* @__PURE__ */ u(
            "div",
            {
              role: "textbox",
              tabIndex: -1,
              className: "tw:flex tw:flex-col tw:gap-2",
              ref: p,
              onKeyDownCapture: (I) => {
                I.key === "Escape" ? (I.preventDefault(), I.stopPropagation(), g()) : Ao(I) && (I.preventDefault(), I.stopPropagation(), ie(w) && f());
              },
              onKeyDown: (I) => {
                $o(I), (I.key === "Enter" || I.key === " ") && I.stopPropagation();
              },
              onClick: (I) => {
                I.stopPropagation();
              },
              children: [
                /* @__PURE__ */ a(
                  da,
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
                    onSerializedChange: (I) => h(I)
                  }
                ),
                /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-row tw:items-start tw:justify-end tw:gap-2", children: [
                  /* @__PURE__ */ a(
                    Z,
                    {
                      size: "icon",
                      onClick: g,
                      variant: "outline",
                      className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                      children: /* @__PURE__ */ a(No, {})
                    }
                  ),
                  /* @__PURE__ */ a(
                    Z,
                    {
                      size: "icon",
                      onClick: f,
                      className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                      disabled: !ie(w),
                      children: /* @__PURE__ */ a(Fn, {})
                    }
                  )
                ] })
              ]
            }
          ),
          !l && /* @__PURE__ */ u(it, { children: [
            t.status === "Resolved" && !R && /* @__PURE__ */ a("div", { className: "tw:text-sm tw:italic", children: r["%comment_status_resolved%"] }),
            t.status === "Todo" && e && /* @__PURE__ */ a("div", { className: "tw:text-sm tw:italic", children: r["%comment_status_todo%"] }),
            R ? (
              // A platform-created conflict resolution comment carries an empty body — PT9 renders
              // its banner UI-side from conflictResolutionAction, it never stores text. So render the
              // localized, neutral outcome line here instead of the (empty) contents, styled like the
              // italic status lines above. These are the same neutral keys ConflictNoteCard's Result
              // region used to render inline. Only when the body IS empty: a resolution synced from
              // PT9 can carry the resolver's typed note alongside the action, and PT9 shows that text,
              // so the body branch below keeps it visible rather than discarding it for this banner.
              /* @__PURE__ */ a("div", { className: "tw:text-sm tw:italic", children: Ki(t.conflictResolutionAction) === "merged" ? r["%conflict_note_outcome_combined%"] ?? "Combined both changes." : r["%conflict_note_outcome_used_other%"] ?? "Used the other change instead of the current text." })
            ) : /* @__PURE__ */ a(
              "div",
              {
                className: m(
                  // Shared note-body prose/blockquote treatment (also used by conflict-diff's
                  // DIFF_HTML_CLASSES). Layer this comment item's own extras on top: items-start +
                  // gap-2 for layout, and line-clamp while the thread is collapsed.
                  Ui,
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
        M && /* @__PURE__ */ u(Le, { children: [
          /* @__PURE__ */ a(Be, { asChild: !0, children: /* @__PURE__ */ a(Z, { variant: "ghost", size: "icon", children: /* @__PURE__ */ a(As, {}) }) }),
          /* @__PURE__ */ a(Ve, { align: "end", children: M })
        ] })
      ]
    }
  );
}
function qi({
  show: t,
  disabled: e = !1,
  onClick: r,
  ariaLabel: o
}) {
  if (t)
    return /* @__PURE__ */ a(
      Z,
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
        children: /* @__PURE__ */ a(Oe, { className: "tw:h-4 tw:w-4" })
      }
    );
}
const xn = {
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
function Yi({
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
  handleAddCommentToThread: h,
  handleUpdateComment: p,
  handleDeleteComment: g,
  handleReadStatusChange: f,
  assignableUsers: b,
  canUserAddCommentToThread: v,
  canUserAssignThreadCallback: D,
  canUserResolveThreadCallback: k,
  canUserEditOrDeleteCommentCallback: T,
  isRead: R = !1,
  autoReadDelay: M = 5,
  onVerseRefClick: I,
  initialAssignedUser: j,
  activeComments: P,
  rootContentSlot: O,
  resolveActionSlot: q,
  spaceRootContentFromReplies: W = !1
}) {
  const [F, E] = N(xn), [x, G] = N(), [S, C] = N(), U = o, [ot, nt] = N(!1), [ut, Bt] = N(!1), [Q, ct] = N(!1), [ft, mt] = N(!1), [vt, _t] = N(!1), [ht, Vt] = N(R), [ae, zt] = N(!1), Gt = K(void 0), [gt, Xt] = N(/* @__PURE__ */ new Map());
  J(() => {
    let y = !0;
    return (async () => {
      const A = k ? await k(l) : !1;
      y && _t(A);
    })(), () => {
      y = !1;
    };
  }, [l, k]), J(() => {
    let y = !0;
    if (!o) {
      mt(!1), Xt(/* @__PURE__ */ new Map());
      return;
    }
    return (async () => {
      const A = D ? await D(l) : !1;
      y && mt(A);
    })(), () => {
      y = !1;
    };
  }, [o, l, D]);
  const xt = K("idle");
  J(() => {
    if (!o) {
      xt.current !== "idle" && (G(void 0), C(void 0), xt.current = "idle");
      return;
    }
    xt.current === "idle" && (xt.current = "pending"), ft ? xt.current === "pending" && j !== void 0 && // Skip pre-population if the thread is already assigned to this user — doing so
    // would show "Assigning to: Alice" and enable the submit button for a no-op call.
    j !== i && (G(j), xt.current = "auto-populated") : xt.current === "auto-populated" && (G(void 0), xt.current = "pending");
  }, [o, j, ft, i]);
  const Nt = $(
    () => P ?? e.filter((y) => !y.deleted),
    [P, e]
  );
  J(() => {
    let y = !0;
    if (!o || !T) {
      Xt(/* @__PURE__ */ new Map());
      return;
    }
    return (async () => {
      const A = /* @__PURE__ */ new Map();
      await Promise.all(
        Nt.map(async (et) => {
          const lt = await T(et.id);
          y && A.set(et.id, lt);
        })
      ), y && Xt(A);
    })(), () => {
      y = !1;
    };
  }, [o, Nt, T]);
  const At = $(() => Nt[0], [Nt]), Jt = K(null), ue = K(void 0), Zt = B(() => {
    var y;
    (y = ue.current) == null || y.call(ue), E(xn);
  }, []), Ge = B(() => {
    const y = !ht;
    Vt(y), zt(!y), f == null || f(l, y);
  }, [ht, f, l]);
  J(() => {
    nt(!1);
  }, [o]), J(() => {
    if (o && !ht && !ae) {
      const y = setTimeout(() => {
        Vt(!0), f == null || f(l, !0);
      }, M * 1e3);
      return Gt.current = y, () => clearTimeout(y);
    }
    Gt.current && (clearTimeout(Gt.current), Gt.current = void 0);
  }, [o, ht, ae, M, l, f]);
  const ne = $(
    () => ({
      singleReply: r["%comment_thread_single_reply%"],
      multipleReplies: r["%comment_thread_multiple_replies%"]
    }),
    [r]
  ), L = $(() => {
    if (i === void 0)
      return;
    if (i === "")
      return r["%comment_assign_unassigned%"] ?? "Unassigned";
    const y = ra(i, r);
    return qe(r["%comment_assigned_to%"], {
      assignedUser: y
    });
  }, [i, r]), Ft = $(() => Nt.slice(1), [Nt]), yt = $(() => Ft.length ?? 0, [Ft.length]), ce = $(() => yt > 0, [yt]), Qt = $(() => ot || yt <= 2 ? Ft : Ft.slice(-2), [Ft, yt, ot]), Ut = $(() => ot || yt <= 2 ? 0 : yt - 2, [yt, ot]), pe = $(
    () => yt === 1 ? ne.singleReply : qe(ne.multipleReplies, { count: yt }),
    [yt, ne]
  ), Ee = $(
    () => Ut === 1 ? ne.singleReply : qe(ne.multipleReplies, { count: Ut }),
    [Ut, ne]
  );
  J(() => {
    !o && ut && ce && Bt(!1);
  }, [o, ut, ce]);
  const z = B(
    async (y) => {
      y && y.stopPropagation();
      const Y = ie(F) ? wa(F) : void 0;
      if (x !== void 0) {
        await h({
          threadId: l,
          contents: Y,
          assignedUser: x
        }) && (C(x), Y && Zt());
        return;
      }
      Y && await h({ threadId: l, contents: Y }) && Zt();
    },
    [
      Zt,
      F,
      h,
      x,
      l
    ]
  ), H = B(
    async (y) => {
      const Y = ie(F) ? wa(F) : void 0, A = y.status ? y.assignedUser : x ?? y.assignedUser, et = await h({
        ...y,
        contents: Y,
        assignedUser: A
      });
      return et && (A !== void 0 && C(A), Y && Zt()), et;
    },
    [Zt, F, h, x]
  );
  if (Nt.length === 0) return;
  const X = /* @__PURE__ */ a(
    bn,
    {
      comment: At,
      localizedStrings: r,
      isThreadExpanded: o,
      threadStatus: w,
      handleAddCommentToThread: H,
      handleUpdateComment: p,
      handleDeleteComment: g,
      onEditingChange: Bt,
      canEditOrDelete: (!ut && gt.get(At.id)) ?? !1,
      canUserResolveThread: vt
    }
  );
  return /* @__PURE__ */ a(
    hw,
    {
      role: "option",
      "aria-selected": o,
      id: l,
      className: m(
        "tw:group tw:w-full tw:rounded-none tw:border-none tw:p-4 tw:outline-hidden tw:transition-all tw:duration-200 tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-1 tw:focus:ring-offset-background",
        { "tw:cursor-pointer tw:hover:shadow-md": !o },
        {
          "tw:bg-primary-foreground": !o && w !== "Resolved" && ht,
          "tw:bg-background": o && w !== "Resolved" && ht,
          "tw:bg-muted": w === "Resolved",
          "tw:bg-accent": !ht && !o && w !== "Resolved"
        }
      ),
      onClick: () => {
        c(l);
      },
      tabIndex: -1,
      children: /* @__PURE__ */ u(gw, { className: "tw:flex tw:flex-col tw:gap-2 tw:p-0", children: [
        /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:content-center tw:items-start tw:gap-4", children: [
          /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:gap-2", children: [
            L && /* @__PURE__ */ a(ze, { className: "tw:rounded-sm tw:bg-input tw:text-sm tw:font-normal tw:text-primary tw:hover:bg-input", children: L }),
            /* @__PURE__ */ a(
              Z,
              {
                variant: "ghost",
                size: "icon",
                onClick: (y) => {
                  y.stopPropagation(), Ge();
                },
                className: "tw:text-muted-foreground tw:transition tw:hover:text-foreground",
                "aria-label": ht ? r["%comment_aria_mark_as_unread%"] ?? "Mark as unread" : r["%comment_aria_mark_as_read%"] ?? "Mark as read",
                children: ht ? /* @__PURE__ */ a(js, {}) : /* @__PURE__ */ a(Ls, {})
              }
            ),
            q === void 0 ? (
              // Generic status-resolve check (used by non-conflict threads and, via ConflictThread
              // leaving this slot undefined, by non-verseText conflicts, which resolve through a
              // plain status change). ConflictThread overrides this slot for verseText conflicts.
              /* @__PURE__ */ a(
                qi,
                {
                  show: vt && w !== "Resolved",
                  onClick: () => H({ threadId: l, status: "Resolved" }),
                  ariaLabel: r["%comment_aria_resolve_thread%"] ?? "Resolve thread"
                }
              )
            ) : q
          ] }),
          /* @__PURE__ */ a("div", { className: "tw:flex tw:max-w-full tw:flex-wrap tw:items-baseline tw:gap-2", children: /* @__PURE__ */ u(
            "p",
            {
              ref: Jt,
              className: m(
                "tw:flex-1 tw:overflow-hidden tw:text-ellipsis tw:text-sm tw:font-normal tw:text-muted-foreground",
                {
                  "tw:overflow-visible tw:text-clip tw:whitespace-normal tw:break-words": U
                },
                { "tw:whitespace-nowrap": !U }
              ),
              children: [
                n && I ? /* @__PURE__ */ a(
                  Z,
                  {
                    variant: "ghost",
                    size: "sm",
                    className: "tw:h-auto tw:px-1 tw:py-0 tw:text-sm tw:font-normal tw:text-muted-foreground",
                    onClick: (y) => {
                      y.stopPropagation(), I(d);
                    },
                    children: n
                  }
                ) : n,
                /* @__PURE__ */ u("span", { className: t, children: [
                  At.contextBefore,
                  /* @__PURE__ */ a("span", { className: "tw:font-bold", children: At.selectedText }),
                  At.contextAfter
                ] })
              ]
            }
          ) }),
          O ?? X
        ] }),
        /* @__PURE__ */ u(it, { children: [
          ce && !o && /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:gap-5", children: [
            /* @__PURE__ */ a("div", { className: "tw:w-8", children: /* @__PURE__ */ a(Dr, {}) }),
            /* @__PURE__ */ a("p", { className: "tw:text-sm tw:text-muted-foreground", children: pe })
          ] }),
          !o && ie(F) && /* @__PURE__ */ a(
            da,
            {
              editorSerializedState: F,
              onSerializedChange: (y) => E(y),
              placeholder: r["%comment_replyOrAssign%"]
            }
          ),
          o && /* @__PURE__ */ u(it, { children: [
            W && Qt.length > 0 && /* @__PURE__ */ a("div", { className: "tw:h-2", "data-slot": "root-content-reply-gap", "aria-hidden": "true" }),
            Ut > 0 && /* @__PURE__ */ u(
              "div",
              {
                className: "tw:flex tw:cursor-pointer tw:items-center tw:gap-5 tw:py-2",
                onClick: (y) => {
                  y.stopPropagation(), nt(!0);
                },
                role: "button",
                tabIndex: 0,
                onKeyDown: (y) => {
                  (y.key === "Enter" || y.key === " ") && (y.preventDefault(), y.stopPropagation(), nt(!0));
                },
                children: [
                  /* @__PURE__ */ a("div", { className: "tw:w-8", children: /* @__PURE__ */ a(Dr, {}) }),
                  /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:gap-2", children: [
                    /* @__PURE__ */ a("p", { className: "tw:text-sm tw:text-muted-foreground", children: Ee }),
                    ot ? /* @__PURE__ */ a(Bs, {}) : /* @__PURE__ */ a(nr, {})
                  ] })
                ]
              }
            ),
            Qt.map((y) => /* @__PURE__ */ a("div", { children: /* @__PURE__ */ a(
              bn,
              {
                comment: y,
                localizedStrings: r,
                isReply: !0,
                isThreadExpanded: o,
                handleUpdateComment: p,
                handleDeleteComment: g,
                onEditingChange: Bt,
                canEditOrDelete: (!ut && gt.get(y.id)) ?? !1
              }
            ) }, y.id)),
            v !== !1 && (!ut || ie(F)) && /* @__PURE__ */ u(
              "div",
              {
                role: "textbox",
                tabIndex: -1,
                className: "tw:w-full tw:space-y-2",
                onClick: (y) => y.stopPropagation(),
                onKeyDownCapture: (y) => {
                  Ao(y) && (y.preventDefault(), y.stopPropagation(), (ie(F) || x !== void 0 && x !== S) && z());
                },
                onKeyDown: (y) => {
                  $o(y), (y.key === "Enter" || y.key === " ") && y.stopPropagation();
                },
                children: [
                  /* @__PURE__ */ a(
                    da,
                    {
                      editorSerializedState: F,
                      onSerializedChange: (y) => E(y),
                      placeholder: w === "Resolved" ? r["%comment_reopenResolved%"] : r["%comment_replyOrAssign%"],
                      autoFocus: !0,
                      onClear: (y) => {
                        ue.current = y;
                      }
                    }
                  ),
                  /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-row tw:items-center tw:justify-end tw:gap-2", children: [
                    x !== void 0 && (ie(F) || x !== S) && /* @__PURE__ */ a("span", { className: "tw:flex-1 tw:text-sm tw:text-muted-foreground", children: qe(
                      r["%comment_assigning_to%"] ?? "Assigning to: {assignedUser}",
                      {
                        assignedUser: ra(
                          x,
                          r
                        )
                      }
                    ) }),
                    /* @__PURE__ */ u(Pe, { open: Q, onOpenChange: ct, children: [
                      /* @__PURE__ */ a(De, { asChild: !0, children: /* @__PURE__ */ a(
                        Z,
                        {
                          size: "icon",
                          variant: "outline",
                          className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                          disabled: !ft || !b || b.length === 0 || !b.includes(s),
                          "aria-label": r["%comment_aria_assign_user%"] ?? "Assign user",
                          children: /* @__PURE__ */ a(Gn, {})
                        }
                      ) }),
                      /* @__PURE__ */ a(
                        $e,
                        {
                          className: "tw:w-auto tw:p-0",
                          align: "end",
                          onKeyDown: (y) => {
                            y.key === "Escape" && (y.stopPropagation(), ct(!1));
                          },
                          children: /* @__PURE__ */ a(Ae, { children: /* @__PURE__ */ a(je, { children: b == null ? void 0 : b.map((y) => /* @__PURE__ */ a(
                            ke,
                            {
                              onSelect: () => {
                                G(y !== i ? y : void 0), xt.current = "user-selected", C(void 0), ct(!1);
                              },
                              className: "tw:flex tw:items-center",
                              children: /* @__PURE__ */ a("span", { children: ra(y, r) })
                            },
                            y || "unassigned"
                          )) }) })
                        }
                      )
                    ] }),
                    /* @__PURE__ */ a(
                      Z,
                      {
                        size: "icon",
                        onClick: z,
                        className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                        disabled: !ie(F) && (x === void 0 || x === S),
                        "aria-label": r["%comment_aria_submit_comment%"] ?? "Submit comment",
                        children: /* @__PURE__ */ a(Fn, {})
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
const vw = m(
  Ui,
  // `prose` gives block children (the top-level blockquote wrapper, and any p — whether nested
  // inside that blockquote or, in the non-verseText fallback, a direct child) vertical margins that
  // make these already-compact cards feel bulky. Zero both so the diff sits flush inside the card.
  "tw:[&>blockquote]:my-0 tw:[&_p]:my-0",
  "tw:[&_u]:font-semibold tw:[&_u]:text-success-foreground tw:[&_u]:no-underline",
  "tw:[&_s]:text-destructive tw:[&_s]:line-through"
), bw = (t) => t.replace(/(\s+)(<\/[us]>)/g, "$2$1"), aa = (t) => bw(Co(t));
function oa({ html: t }) {
  return /* @__PURE__ */ a(
    "div",
    {
      className: vw,
      dangerouslySetInnerHTML: { __html: t }
    }
  );
}
function xw({
  comment: t,
  localizedStrings: e,
  availableActions: r = "acceptOrReject",
  resolvedResolution: o,
  onResolve: n,
  isResolving: i = !1
}) {
  const [s, c] = N("accept"), l = qo(), d = qo(), w = r === "loading", h = r === "accept", p = r === "none", g = r === "acceptRejectOrMerge", f = h ? "accept" : s, b = $(
    () => aa(t.rejectedText ?? ""),
    [t.rejectedText]
  ), v = $(
    () => aa(t.acceptedText ?? ""),
    [t.acceptedText]
  ), D = $(
    () => aa(t.mergedText ?? ""),
    [t.mergedText]
  ), k = $(() => Co(t.contents), [t.contents]);
  if (!Hi(t))
    return /* @__PURE__ */ a(oa, { html: k });
  const T = (S) => {
    c(S === "reject" || S === "merge" ? S : "accept");
  }, R = e["%conflict_note_stale_notice%"] ?? "The verse was edited after this conflict was recorded, so 'Use the other change' is no longer available. Keep the current text to resolve.", M = g ? [
    {
      value: "merge",
      label: e["%conflict_note_option_combine%"] ?? "Combine both changes",
      html: D
    }
  ] : [], I = [
    {
      value: "accept",
      label: e["%conflict_note_option_keep_current%"] ?? "Keep the current text",
      html: v
    },
    {
      value: "reject",
      label: e["%conflict_note_option_use_other%"] ?? "Use the other change",
      html: b
    },
    ...M
  ], j = f === "accept", P = i || j;
  let O;
  j ? O = e["%conflict_note_save_disabled_tooltip%"] ?? "Keeping the current text makes no change — resolve the thread with the ✓ to keep it." : i || (O = e["%conflict_note_save_warning%"] ?? "This can't be undone.");
  const q = e["%conflict_note_no_result%"] ?? "No result preview available.", W = /* @__PURE__ */ a("p", { className: "tw:text-muted-foreground", children: q }), F = (S) => S ? /* @__PURE__ */ a("p", { className: "tw:whitespace-pre-wrap tw:text-foreground", children: S }) : W, E = () => {
    const S = o ?? "accept";
    return S === "merged" ? t.mergedText ? /* @__PURE__ */ a(oa, { html: D }) : W : F(S === "reject" ? t.rejectedResultText : t.resultText);
  }, x = (S) => h && S.value === "reject", G = (S) => {
    const C = f === S.value, U = `${d}-${S.value}`, ot = x(S);
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
          "data-value": S.value,
          className: m(
            "tw:flex tw:flex-col tw:gap-1 tw:rounded-md tw:border tw:p-2",
            "tw:focus-within:ring-2 tw:focus-within:ring-ring tw:focus-within:ring-offset-1",
            C ? "tw:border-border tw:bg-accent/50" : "tw:border-transparent tw:hover:bg-accent/30",
            ot ? "tw:cursor-not-allowed tw:opacity-60" : "tw:cursor-pointer"
          ),
          children: [
            /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:gap-2", children: [
              /* @__PURE__ */ a(
                na,
                {
                  id: U,
                  value: S.value,
                  "aria-label": S.label,
                  disabled: ot,
                  "aria-describedby": ot ? l : void 0
                }
              ),
              /* @__PURE__ */ a("span", { "aria-hidden": !0, className: "tw:font-medium", children: S.label })
            ] }),
            ot && // aria-describedby links the option to this visually-hidden notice so assistive tech
            // announces why the choice is read-only.
            /* @__PURE__ */ a("span", { id: l, className: "tw:sr-only", children: R }),
            /* @__PURE__ */ a(oa, { html: S.html })
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
      w && /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:gap-2", "data-slot": "conflict-loading", children: [
        /* @__PURE__ */ a(wr, { className: "tw:h-8 tw:w-full" }),
        /* @__PURE__ */ a(wr, { className: "tw:h-8 tw:w-full" }),
        /* @__PURE__ */ a(wr, { className: "tw:h-8 tw:w-24" })
      ] }),
      !w && p && E(),
      !w && !p && /* @__PURE__ */ u(it, { children: [
        /* @__PURE__ */ a("p", { children: e["%conflict_note_choose_prompt%"] ?? "Select which change to keep:" }),
        /* @__PURE__ */ a(
          go,
          {
            value: f,
            onValueChange: T,
            disabled: i,
            "aria-label": e["%conflict_note_choose_aria_label%"] ?? "Choose resolution",
            children: I.map((S) => x(S) ? /* @__PURE__ */ a(St, { delayDuration: 0, children: /* @__PURE__ */ u(It, { children: [
              /* @__PURE__ */ a(Rt, { asChild: !0, children: G(S) }),
              /* @__PURE__ */ a(Dt, { children: R })
            ] }) }, S.value) : G(S))
          }
        ),
        /* @__PURE__ */ a(St, { delayDuration: 0, children: /* @__PURE__ */ u(It, { children: [
          /* @__PURE__ */ a(Rt, { asChild: !0, children: /* @__PURE__ */ a("span", { className: "tw:inline-flex tw:self-start", children: /* @__PURE__ */ a(
            Z,
            {
              size: "sm",
              disabled: P,
              onClick: () => n == null ? void 0 : n(f),
              children: e["%conflict_note_save_and_resolve%"] ?? "Save and resolve"
            }
          ) }) }),
          O && /* @__PURE__ */ a(Dt, { children: O })
        ] }) })
      ] })
    ] })
  );
}
const yw = {
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
function kw({
  comment: t,
  localizedStrings: e,
  resolvedResolution: r
}) {
  const o = $(
    () => aa(t.rejectedText ?? ""),
    [t.rejectedText]
  );
  if (r) {
    const { key: i, fallback: s } = yw[r];
    return /* @__PURE__ */ a("p", { className: "tw:text-sm tw:font-normal tw:text-muted-foreground", children: e[i] ?? s });
  }
  const n = e["%conflict_note_summary_unresolved%"] ?? "Conflicting edits. Choose which change to keep.";
  return /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:gap-1", children: [
    /* @__PURE__ */ a("p", { className: "tw:text-sm tw:font-normal tw:text-muted-foreground", children: n }),
    o ? /* @__PURE__ */ a(oa, { html: o }) : void 0
  ] });
}
function _w(t) {
  return t === "reject" ? "reject" : t === "merge" ? "merged" : "accept";
}
function Nw({
  threadId: t,
  threadStatus: e,
  isSelected: r,
  activeComments: o,
  conflictResolution: n
}) {
  const [i, s] = N("loading"), [c, l] = N(!1), [d, w] = N(), h = n == null ? void 0 : n.getOptions, p = n == null ? void 0 : n.resolve;
  J(() => {
    let k = !0;
    if (!r) {
      s("loading");
      return;
    }
    return (async () => {
      let R;
      try {
        R = h ? await h(t) : "none";
      } catch {
        R = "none";
      }
      k && (s(R), R !== "none" && w(void 0));
    })(), () => {
      k = !1;
    };
  }, [r, t, e, h]);
  const g = K(!1), f = B(
    async (k) => {
      if (!(!p || g.current)) {
        g.current = !0, l(!0);
        try {
          await p(t, k) && (w(_w(k)), s("none"));
        } catch {
        } finally {
          g.current = !1, l(!1);
        }
      }
    },
    [p, t]
  ), v = $(() => {
    if (e === "Resolved") {
      for (let k = o.length - 1; k >= 0; k -= 1)
        if (o[k].status === "Resolved")
          return Ki(o[k].conflictResolutionAction);
      return "accept";
    }
  }, [e, o]) ?? d;
  return { conflictOptions: i, isResolving: c, resolve: f, resolvedResolution: v, showResolveCheck: i !== "loading" && i !== "none" };
}
function Cw(t) {
  const {
    comments: e,
    localizedStrings: r,
    isSelected: o = !1,
    threadId: n,
    threadStatus: i,
    conflictResolution: s
  } = t, c = $(() => e.filter((D) => !D.deleted), [e]), l = $(
    () => c.find((D) => D.conflictType) ?? c[0],
    [c]
  ), { conflictOptions: d, isResolving: w, resolve: h, resolvedResolution: p, showResolveCheck: g } = Nw({
    threadId: n,
    threadStatus: i,
    isSelected: o,
    activeComments: c,
    conflictResolution: s
  }), f = Hi(l);
  let b;
  f && l && (b = o ? /* @__PURE__ */ a(
    xw,
    {
      comment: l,
      localizedStrings: r,
      availableActions: d,
      resolvedResolution: p,
      onResolve: h,
      isResolving: w
    }
  ) : /* @__PURE__ */ a(
    kw,
    {
      comment: l,
      localizedStrings: r,
      resolvedResolution: p
    }
  ));
  let v;
  return f && (v = /* @__PURE__ */ a(
    qi,
    {
      show: g,
      disabled: w,
      onClick: () => h("accept"),
      ariaLabel: r["%comment_aria_resolve_thread%"] ?? "Resolve thread"
    }
  )), /* @__PURE__ */ a(
    Yi,
    {
      ...t,
      activeComments: c,
      rootContentSlot: b,
      resolveActionSlot: v,
      spaceRootContentFromReplies: f && o
    }
  );
}
function wh({
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
  canUserAssignThreadCallback: h,
  canUserResolveThreadCallback: p,
  canUserEditOrDeleteCommentCallback: g,
  selectedThreadId: f,
  onSelectedThreadChange: b,
  onVerseRefClick: v,
  conflictResolution: D
}) {
  const [k, T] = N(/* @__PURE__ */ new Set()), [R, M] = N(), [I, j] = N(), P = B(
    async (C) => {
      const U = await i(C);
      return U !== void 0 && C.assignedUser !== void 0 && C.assignedUser !== "" && j(C.assignedUser), U;
    },
    [i]
  );
  J(() => {
    f && (T((C) => new Set(C).add(f)), M(f));
  }, [f]);
  const O = r.filter(
    (C) => C.comments.some((U) => !U.deleted)
  ), q = O.map((C) => ({ id: C.id })), W = B(
    (C) => {
      T((U) => new Set(U).add(C.id)), M(C.id), b == null || b(C.id);
    },
    [b]
  ), F = B(
    (C) => {
      const U = k.has(C);
      T((ot) => {
        const nt = new Set(ot);
        return nt.has(C) ? nt.delete(C) : nt.add(C), nt;
      }), M(C), b == null || b(U ? void 0 : C);
    },
    [k, b]
  ), { listboxRef: E, activeId: x, handleKeyDown: G } = gs({
    options: q,
    onOptionSelect: W
  }), S = B(
    (C) => {
      C.key === "Escape" ? (R && k.has(R) && (T((U) => {
        const ot = new Set(U);
        return ot.delete(R), ot;
      }), M(void 0), b == null || b(void 0)), C.preventDefault(), C.stopPropagation()) : G(C);
    },
    [R, k, G, b]
  );
  return /* @__PURE__ */ a(
    "div",
    {
      id: pw,
      role: "listbox",
      tabIndex: 0,
      ref: E,
      "aria-activedescendant": x ?? void 0,
      "aria-label": "Comments",
      className: m(
        "tw:flex tw:w-full tw:flex-col tw:space-y-3 tw:outline-hidden tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-1 tw:focus:ring-offset-background",
        t
      ),
      onKeyDown: S,
      children: O.map((C) => {
        const U = {
          classNameForVerseText: e,
          comments: C.comments,
          localizedStrings: n,
          verseRef: C.verseRef,
          handleSelectThread: F,
          threadId: C.id,
          thread: C,
          isRead: C.isRead,
          isSelected: k.has(C.id),
          currentUser: o,
          assignedUser: C.assignedUser,
          threadStatus: C.status,
          handleAddCommentToThread: P,
          handleUpdateComment: s,
          handleDeleteComment: c,
          handleReadStatusChange: l,
          assignableUsers: d,
          canUserAddCommentToThread: w,
          canUserAssignThreadCallback: h,
          canUserResolveThreadCallback: p,
          canUserEditOrDeleteCommentCallback: g,
          onVerseRefClick: v,
          initialAssignedUser: I
        };
        return /* @__PURE__ */ a(
          "div",
          {
            className: m({
              "tw:opacity-60": C.status === "Resolved"
            }),
            children: C.type === "Conflict" ? /* @__PURE__ */ a(Cw, { ...U, conflictResolution: D }) : /* @__PURE__ */ a(Yi, { ...U })
          },
          C.id
        );
      })
    }
  );
}
function Ew({ table: t }) {
  return /* @__PURE__ */ u(Le, { children: [
    /* @__PURE__ */ a(Be, { asChild: !0, children: /* @__PURE__ */ u(Z, { variant: "outline", size: "sm", className: "tw:ml-auto tw:hidden tw:h-8 tw:lg:flex", children: [
      /* @__PURE__ */ a(Vs, { className: "tw:mr-2 tw:h-4 tw:w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ u(Ve, { align: "end", className: "tw:w-[150px]", children: [
      /* @__PURE__ */ a(or, { children: "Toggle columns" }),
      /* @__PURE__ */ a(Ye, {}),
      t.getAllColumns().filter((e) => e.getCanHide()).map((e) => /* @__PURE__ */ a(
        Se,
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
function fr({ ...t }) {
  return /* @__PURE__ */ a(Wt.Root, { "data-slot": "select", ...t });
}
function Tw({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    Wt.Group,
    {
      "data-slot": "select-group",
      className: m("tw:scroll-my-1 tw:p-1", t),
      ...e
    }
  );
}
function mr({ ...t }) {
  return /* @__PURE__ */ a(Wt.Value, { "data-slot": "select-value", ...t });
}
function vr({ className: t, size: e = "default", children: r, ...o }) {
  const n = _e();
  return /* @__PURE__ */ u(
    Wt.Trigger,
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
        /* @__PURE__ */ a(Wt.Icon, { asChild: !0, children: /* @__PURE__ */ a(Zn, { className: "tw:pointer-events-none tw:size-4 tw:text-muted-foreground" }) })
      ]
    }
  );
}
function br({
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
  const s = _e();
  return /* @__PURE__ */ a(Wt.Portal, { children: /* @__PURE__ */ u(
    Wt.Content,
    {
      "data-slot": "select-content",
      "data-align-trigger": r === "item-aligned",
      className: m(
        "pr-twp tw:relative tw:max-h-(--radix-select-content-available-height) tw:data-[align-trigger=true]:min-w-(--radix-select-trigger-width) tw:data-[align-trigger=false]:min-w-36 tw:origin-(--radix-select-content-transform-origin) tw:overflow-x-hidden tw:overflow-y-auto tw:rounded-lg tw:bg-popover tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:data-[align-trigger=true]:animate-none tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95 tw:animate-none! tw:bg-popover/70 tw:before:-z-1 tw:**:data-[slot$=-item]:focus:bg-foreground/10 tw:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 tw:**:data-[slot$=-separator]:bg-foreground/5 tw:**:data-[slot$=-trigger]:focus:bg-foreground/10 tw:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! tw:**:data-[variant=destructive]:focus:bg-foreground/10! tw:**:data-[variant=destructive]:text-accent-foreground! tw:**:data-[variant=destructive]:**:text-accent-foreground! tw:relative tw:before:pointer-events-none tw:before:absolute tw:before:inset-0 tw:before:rounded-[inherit] tw:before:backdrop-blur-2xl tw:before:backdrop-saturate-150",
        r === "popper" && "tw:data-[side=bottom]:translate-y-1 tw:data-[side=left]:-translate-x-1 tw:rtl:data-[side=left]:translate-x-1 tw:data-[side=right]:translate-x-1 tw:rtl:data-[side=right]:-translate-x-1 tw:data-[side=top]:-translate-y-1",
        t
      ),
      style: { zIndex: Xe, ...n },
      position: r,
      align: o,
      ...i,
      children: [
        /* @__PURE__ */ a(Sw, {}),
        /* @__PURE__ */ a(
          Wt.Viewport,
          {
            "data-position": r,
            className: m(
              "tw:data-[position=popper]:h-(--radix-select-trigger-height) tw:data-[position=popper]:w-full tw:data-[position=popper]:min-w-(--radix-select-trigger-width)",
              r === "popper" && "tw:"
            ),
            children: /* @__PURE__ */ a("div", { dir: s, children: e })
          }
        ),
        /* @__PURE__ */ a(Iw, {})
      ]
    }
  ) });
}
function uh({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    Wt.Label,
    {
      "data-slot": "select-label",
      className: m("pr-twp tw:px-1.5 tw:py-1 tw:text-xs tw:text-muted-foreground", t),
      ...e
    }
  );
}
function le({
  className: t,
  children: e,
  ...r
}) {
  return /* @__PURE__ */ u(
    Wt.Item,
    {
      "data-slot": "select-item",
      className: m(
        "pr-twp tw:relative tw:flex tw:w-full tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:*:[span]:last:flex tw:*:[span]:last:items-center tw:*:[span]:last:gap-2",
        t
      ),
      ...r,
      children: [
        /* @__PURE__ */ a("span", { className: "tw:pointer-events-none tw:absolute tw:end-2 tw:flex tw:size-4 tw:items-center tw:justify-center", children: /* @__PURE__ */ a(Wt.ItemIndicator, { children: /* @__PURE__ */ a(ga, { className: "tw:pointer-events-none" }) }) }),
        /* @__PURE__ */ a(Wt.ItemText, { children: e })
      ]
    }
  );
}
function ph({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    Wt.Separator,
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
function Sw({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    Wt.ScrollUpButton,
    {
      "data-slot": "select-scroll-up-button",
      className: m(
        "pr-twp tw:z-10 tw:flex tw:cursor-default tw:items-center tw:justify-center tw:bg-popover tw:py-1 tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      ...e,
      children: /* @__PURE__ */ a(Nc, {})
    }
  );
}
function Iw({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    Wt.ScrollDownButton,
    {
      "data-slot": "select-scroll-down-button",
      className: m(
        "pr-twp tw:z-10 tw:flex tw:cursor-default tw:items-center tw:justify-center tw:bg-popover tw:py-1 tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      ...e,
      children: /* @__PURE__ */ a(_c, {})
    }
  );
}
function Rw({ table: t }) {
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
        fr,
        {
          value: `${t.getState().pagination.pageSize}`,
          onValueChange: (e) => {
            t.setPageSize(Number(e));
          },
          children: [
            /* @__PURE__ */ a(vr, { className: "tw:h-8 tw:w-[70px]", children: /* @__PURE__ */ a(mr, { placeholder: t.getState().pagination.pageSize }) }),
            /* @__PURE__ */ a(br, { side: "top", children: [10, 20, 30, 40, 50].map((e) => /* @__PURE__ */ a(le, { value: `${e}`, children: e }, e)) })
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
        Z,
        {
          variant: "outline",
          size: "icon",
          className: "tw:hidden tw:h-8 tw:w-8 tw:p-0 tw:lg:flex",
          onClick: () => t.setPageIndex(0),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ a("span", { className: "tw:sr-only", children: "Go to first page" }),
            /* @__PURE__ */ a(Gs, { className: "tw:h-4 tw:w-4" })
          ]
        }
      ),
      /* @__PURE__ */ u(
        Z,
        {
          variant: "outline",
          size: "icon",
          className: "tw:h-8 tw:w-8 tw:p-0",
          onClick: () => t.previousPage(),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ a("span", { className: "tw:sr-only", children: "Go to previous page" }),
            /* @__PURE__ */ a(Fs, { className: "tw:h-4 tw:w-4" })
          ]
        }
      ),
      /* @__PURE__ */ u(
        Z,
        {
          variant: "outline",
          size: "icon",
          className: "tw:h-8 tw:w-8 tw:p-0",
          onClick: () => t.nextPage(),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ a("span", { className: "tw:sr-only", children: "Go to next page" }),
            /* @__PURE__ */ a(Us, { className: "tw:h-4 tw:w-4" })
          ]
        }
      ),
      /* @__PURE__ */ u(
        Z,
        {
          variant: "outline",
          size: "icon",
          className: "tw:hidden tw:h-8 tw:w-8 tw:p-0 tw:lg:flex",
          onClick: () => t.setPageIndex(t.getPageCount() - 1),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ a("span", { className: "tw:sr-only", children: "Go to last page" }),
            /* @__PURE__ */ a(Hs, { className: "tw:h-4 tw:w-4" })
          ]
        }
      )
    ] })
  ] }) });
}
function Dw({
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
  var I;
  const [w, h] = N([]), [p, g] = N([]), [f, b] = N({}), [v, D] = N({}), k = $(() => e ?? [], [e]), T = ui({
    data: k,
    columns: t,
    getCoreRowModel: hi(),
    ...r && { getPaginationRowModel: Sl() },
    onSortingChange: h,
    getSortedRowModel: pi(),
    onColumnFiltersChange: g,
    getFilteredRowModel: Tl(),
    onColumnVisibilityChange: b,
    onRowSelectionChange: D,
    state: {
      sorting: w,
      columnFilters: p,
      columnVisibility: f,
      rowSelection: v
    }
  }), R = T.getVisibleFlatColumns();
  let M;
  return l ? M = Array.from({ length: 10 }).map((O, q) => `skeleton-row-${q}`).map((O) => /* @__PURE__ */ a(Ke, { className: "tw:hover:bg-transparent", children: /* @__PURE__ */ a(ur, { colSpan: R.length ?? t.length, className: "tw:border-0 tw:p-0", children: /* @__PURE__ */ a("div", { className: "tw:w-full tw:py-2", children: /* @__PURE__ */ a(wr, { className: "tw:h-14 tw:w-full tw:rounded-md" }) }) }) }, O)) : ((I = T.getRowModel().rows) == null ? void 0 : I.length) > 0 ? M = T.getRowModel().rows.map((j) => /* @__PURE__ */ a(
    Ke,
    {
      onClick: () => s(j, T),
      "data-state": j.getIsSelected() && "selected",
      children: j.getVisibleCells().map((P) => /* @__PURE__ */ a(ur, { children: Sr(P.column.columnDef.cell, P.getContext()) }, P.id))
    },
    j.id
  )) : M = /* @__PURE__ */ a(Ke, { children: /* @__PURE__ */ a(ur, { colSpan: t.length, className: "tw:h-24 tw:text-center", children: d }) }), /* @__PURE__ */ u("div", { className: "pr-twp", id: c, children: [
    n && /* @__PURE__ */ a(Ew, { table: T }),
    /* @__PURE__ */ u(vo, { stickyHeader: i, children: [
      /* @__PURE__ */ a(bo, { stickyHeader: i, children: T.getHeaderGroups().map((j) => /* @__PURE__ */ a(Ke, { children: j.headers.map((P) => /* @__PURE__ */ a(ia, { className: "tw:p-0", children: P.isPlaceholder ? void 0 : Sr(P.column.columnDef.header, P.getContext()) }, P.id)) }, j.id)) }),
      /* @__PURE__ */ a(xo, { children: M })
    ] }),
    r && /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:justify-end tw:space-x-2 tw:py-4", children: [
      /* @__PURE__ */ a(
        Z,
        {
          variant: "outline",
          size: "sm",
          onClick: () => T.previousPage(),
          disabled: !T.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ a(
        Z,
        {
          variant: "outline",
          size: "sm",
          onClick: () => T.nextPage(),
          disabled: !T.getCanNextPage(),
          children: "Next"
        }
      )
    ] }),
    r && o && /* @__PURE__ */ a(Rw, { table: T })
  ] });
}
function hh({
  id: t,
  markdown: e,
  className: r,
  anchorTarget: o,
  truncate: n
}) {
  const i = $(
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
      children: /* @__PURE__ */ a(Dl, { options: i, children: e })
    }
  );
}
const zw = Object.freeze([
  "%webView_error_dump_header%",
  "%webView_error_dump_info_message%"
]), yn = (t, e) => t[e] ?? e;
function Ow({
  errorDetails: t,
  handleCopyNotify: e,
  localizedStrings: r,
  id: o
}) {
  const n = yn(r, "%webView_error_dump_header%"), i = yn(r, "%webView_error_dump_info_message%");
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
          /* @__PURE__ */ a(Z, { variant: "secondary", size: "icon", className: "size-8", onClick: () => s(), children: /* @__PURE__ */ a(Un, {}) })
        ] }),
        /* @__PURE__ */ a("div", { className: "tw:prose tw:w-full", children: /* @__PURE__ */ a("pre", { className: "tw:text-xs", children: t }) })
      ]
    }
  );
}
const gh = Object.freeze([
  ...zw,
  "%webView_error_dump_copied_message%"
]);
function fh({
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
    /* @__PURE__ */ a(De, { asChild: !0, children: o }),
    /* @__PURE__ */ u($e, { id: i, className: m("tw:min-w-80 tw:max-w-96", n), children: [
      s && r["%webView_error_dump_copied_message%"] && /* @__PURE__ */ a(Tt, { children: r["%webView_error_dump_copied_message%"] }),
      /* @__PURE__ */ a(
        Ow,
        {
          errorDetails: t,
          handleCopyNotify: l,
          localizedStrings: r
        }
      )
    ] })
  ] });
}
var Mw = /* @__PURE__ */ ((t) => (t[t.Check = 0] = "Check", t[t.Radio = 1] = "Radio", t))(Mw || {});
function mh({ id: t, label: e, groups: r }) {
  const [o, n] = N(
    Object.fromEntries(
      r.map(
        (d, w) => d.itemType === 0 ? [w, []] : void 0
      ).filter((d) => !!d)
    )
  ), [i, s] = N({}), c = (d, w) => {
    const h = !o[d][w];
    n((g) => (g[d][w] = h, { ...g }));
    const p = r[d].items[w];
    p.onUpdate(p.id, h);
  }, l = (d, w) => {
    s((p) => (p[d] = w, { ...p }));
    const h = r[d].items.find((p) => p.id === w);
    h ? h.onUpdate(w) : console.error(`Could not find dropdown radio item with id '${w}'!`);
  };
  return /* @__PURE__ */ a("div", { id: t, children: /* @__PURE__ */ u(Le, { children: [
    /* @__PURE__ */ a(Be, { asChild: !0, children: /* @__PURE__ */ u(Z, { variant: "default", children: [
      /* @__PURE__ */ a(Hn, { size: 16, className: "tw:mr-2 tw:h-4 tw:w-4" }),
      e,
      /* @__PURE__ */ a(nr, { size: 16, className: "tw:ml-2 tw:h-4 tw:w-4" })
    ] }) }),
    /* @__PURE__ */ a(Ve, { children: r.map((d, w) => /* @__PURE__ */ u("div", { children: [
      /* @__PURE__ */ a(or, { children: d.label }),
      /* @__PURE__ */ a(Pn, { children: d.itemType === 0 ? /* @__PURE__ */ a(it, { children: d.items.map((h, p) => /* @__PURE__ */ a("div", { children: /* @__PURE__ */ a(
        Se,
        {
          checked: o[w][p],
          onCheckedChange: () => c(w, p),
          children: h.label
        }
      ) }, h.id)) }) : /* @__PURE__ */ a(
        $n,
        {
          value: i[w],
          onValueChange: (h) => l(w, h),
          children: d.items.map((h) => /* @__PURE__ */ a("div", { children: /* @__PURE__ */ a(Ya, { value: h.id, children: h.label }) }, h.id))
        }
      ) }),
      /* @__PURE__ */ a(Ye, {})
    ] }, d.label)) })
  ] }) });
}
function vh({
  id: t,
  category: e,
  downloads: r,
  languages: o,
  moreInfoUrl: n,
  handleMoreInfoLinkClick: i,
  supportUrl: s,
  handleSupportLinkClick: c
}) {
  const l = new Xn("en", {
    notation: "compact",
    compactDisplay: "short"
  }).format(Object.values(r).reduce((w, h) => w + h, 0)), d = () => {
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
            /* @__PURE__ */ a(Ks, { className: "tw:h-4 tw:w-4" }),
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
            Z,
            {
              onClick: () => i(),
              variant: "link",
              className: "tw:flex tw:h-auto tw:gap-1 tw:py-0 tw:text-xs tw:font-semibold tw:text-foreground",
              children: [
                "Website",
                /* @__PURE__ */ a(qs, { className: "tw:h-4 tw:w-4" })
              ]
            }
          ) }),
          s && /* @__PURE__ */ a("div", { className: "tw:flex tw:gap-1", children: /* @__PURE__ */ u(
            Z,
            {
              onClick: () => c(),
              variant: "link",
              className: "tw:flex tw:h-auto tw:gap-1 tw:py-0 tw:text-xs tw:font-semibold tw:text-foreground",
              children: [
                "Support",
                /* @__PURE__ */ a(Ys, { className: "tw:h-4 tw:w-4" })
              ]
            }
          ) })
        ] })
      ]
    }
  );
}
function Pw({ id: t, versionHistory: e }) {
  const [r, o] = N(!1), n = /* @__PURE__ */ new Date();
  function i(c) {
    const l = new Date(c), d = new Date(n.getTime() - l.getTime()), w = d.getUTCFullYear() - 1970, h = d.getUTCMonth(), p = d.getUTCDate() - 1;
    let g = "";
    return w > 0 ? g = `${w.toString()} year${w === 1 ? "" : "s"} ago` : h > 0 ? g = `${h.toString()} month${h === 1 ? "" : "s"} ago` : p === 0 ? g = "today" : g = `${p.toString()} day${p === 1 ? "" : "s"} ago`, g;
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
function bh({
  id: t,
  publisherDisplayName: e,
  fileSize: r,
  locales: o,
  versionHistory: n,
  currentVersion: i
}) {
  const s = $(() => wc(r), [r]), l = ((d) => {
    const w = new Intl.DisplayNames(uc(), { type: "language" });
    return d.map((h) => w.of(h));
  })(o);
  return /* @__PURE__ */ a("div", { id: t, className: "pr-twp tw:border-t tw:py-2", children: /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:gap-2 tw:divide-y", children: [
    Object.entries(n).length > 0 && /* @__PURE__ */ a(Pw, { versionHistory: n }),
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
function xh({
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
  id: h
}) {
  return /* @__PURE__ */ u("div", { id: h, className: "tw:flex tw:items-center tw:gap-2", children: [
    /* @__PURE__ */ a(
      fs,
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
    e.length > 0 ? /* @__PURE__ */ a("div", { className: "tw:flex tw:flex-wrap tw:items-center tw:gap-2", children: e.map((p) => {
      var g;
      return /* @__PURE__ */ u(ze, { variant: "muted", className: "tw:flex tw:items-center tw:gap-1", children: [
        /* @__PURE__ */ a(
          Z,
          {
            variant: "ghost",
            size: "icon",
            className: "tw:h-4 tw:w-4 tw:p-0 tw:hover:bg-transparent",
            onClick: () => r(e.filter((f) => f !== p)),
            children: /* @__PURE__ */ a(No, { className: "tw:h-3 tw:w-3" })
          }
        ),
        (g = t.find((f) => f.value === p)) == null ? void 0 : g.label
      ] }, p);
    }) }) : /* @__PURE__ */ a(Tt, { children: w })
  ] });
}
const $w = Object.freeze([
  "%undoButton_tooltip%",
  "%redoButton_tooltip%"
]), kn = (t, e) => t[e] ?? e;
function Aw({
  onUndoClick: t,
  onRedoClick: e,
  canUndo: r = !0,
  canRedo: o = !0,
  localizedStrings: n = {},
  showKeyboardShortcuts: i = !0,
  className: s = "tw:h-6 tw:w-6",
  variant: c = "ghost"
}) {
  const l = mo(), d = kn(n, "%undoButton_tooltip%"), w = kn(n, "%redoButton_tooltip%");
  return /* @__PURE__ */ u(fo, { children: [
    /* @__PURE__ */ a(St, { children: /* @__PURE__ */ u(It, { children: [
      /* @__PURE__ */ a(Rt, { asChild: !0, children: /* @__PURE__ */ a(
        Z,
        {
          "aria-label": d,
          className: s,
          size: "icon",
          onClick: t,
          disabled: !r,
          variant: c,
          children: /* @__PURE__ */ a(Ws, {})
        }
      ) }),
      /* @__PURE__ */ a(Dt, { children: /* @__PURE__ */ u("p", { children: [
        d,
        i && /* @__PURE__ */ u(it, { children: [
          " ",
          /* @__PURE__ */ a(Wa, { children: l ? "⌘Z" : "Ctrl+Z" })
        ] })
      ] }) })
    ] }) }),
    e && (c === "secondary" || c === "default") && /* @__PURE__ */ a(Mn, {}),
    e && /* @__PURE__ */ a(St, { children: /* @__PURE__ */ u(It, { children: [
      /* @__PURE__ */ a(Rt, { asChild: !0, children: /* @__PURE__ */ a(
        Z,
        {
          "aria-label": w,
          className: s,
          size: "icon",
          onClick: e,
          disabled: !o,
          variant: c,
          children: /* @__PURE__ */ a(Xs, {})
        }
      ) }),
      /* @__PURE__ */ a(Dt, { children: /* @__PURE__ */ u("p", { children: [
        w,
        i && /* @__PURE__ */ u(it, { children: [
          " ",
          /* @__PURE__ */ a(Wa, { children: l ? "⌘⇧Z" : "Ctrl+Y" })
        ] })
      ] }) })
    ] }) })
  ] });
}
function jw({
  children: t,
  editorRef: e,
  canUndo: r = !0,
  canRedo: o = !0
}) {
  const n = K(null);
  return J(() => {
    var l;
    const i = mo(), s = ((l = n.current) == null ? void 0 : l.querySelector(".editor-input")) ?? void 0, c = (d) => {
      var h, p, g, f;
      if (!s || document.activeElement !== s) return;
      const w = d.key.toLowerCase();
      if (i) {
        if (!d.metaKey) return;
        !d.shiftKey && w === "z" ? (d.preventDefault(), r && ((h = e.current) == null || h.undo())) : d.shiftKey && w === "z" && (d.preventDefault(), o && ((p = e.current) == null || p.redo()));
      } else {
        if (!d.ctrlKey) return;
        !d.shiftKey && w === "z" ? (d.preventDefault(), r && ((g = e.current) == null || g.undo())) : (w === "y" || d.shiftKey && w === "z") && (d.preventDefault(), o && ((f = e.current) == null || f.redo()));
      }
    };
    return document.addEventListener("keydown", c), () => document.removeEventListener("keydown", c);
  }, [o, r, e]), /* @__PURE__ */ a("div", { ref: n, children: t });
}
const Lw = (t, e, r) => t === "generated" ? /* @__PURE__ */ u(it, { children: [
  /* @__PURE__ */ a("p", { children: "+" }),
  " ",
  e["%footnoteEditor_callerDropdown_item_generated%"]
] }) : t === "hidden" ? /* @__PURE__ */ u(it, { children: [
  /* @__PURE__ */ a("p", { children: "-" }),
  " ",
  e["%footnoteEditor_callerDropdown_item_hidden%"]
] }) : /* @__PURE__ */ u(it, { children: [
  /* @__PURE__ */ a("p", { children: r }),
  " ",
  e["%footnoteEditor_callerDropdown_item_custom%"]
] });
function Bw({
  callerType: t,
  customCaller: e,
  updateCaller: r,
  localizedStrings: o
}) {
  const n = K(null), i = K(null), s = K(!1), [c, l] = N(t), [d, w] = N(e), [h, p] = N(!1), g = K(!1), f = K(c);
  f.current = c;
  const b = K(d);
  b.current = d, J(() => {
    l(t);
  }, [t]), J(() => {
    d !== e && w(e);
  }, [e]);
  const v = (k) => {
    if (s.current = !1, p(k), !k) {
      const T = f.current, R = b.current;
      T !== "custom" || R ? (T !== t || R !== e) && r(T, R) : (l(t), w(e));
    }
  }, D = (k) => {
    var T, R, M, I;
    k.stopPropagation(), document.activeElement === i.current && k.key === "ArrowDown" || k.key === "ArrowRight" ? ((T = n.current) == null || T.focus(), s.current = !0) : document.activeElement === n.current && k.key === "ArrowUp" ? ((R = i.current) == null || R.focus(), s.current = !1) : document.activeElement === n.current && k.key === "ArrowLeft" && ((M = n.current) == null ? void 0 : M.selectionStart) === 0 && ((I = i.current) == null || I.focus(), s.current = !1), c === "custom" && k.key === "Enter" && (document.activeElement === i.current || document.activeElement === n.current) && v(!1);
  };
  return /* @__PURE__ */ u(Le, { open: h, onOpenChange: v, children: [
    /* @__PURE__ */ a(St, { children: /* @__PURE__ */ u(It, { children: [
      /* @__PURE__ */ a(Rt, { asChild: !0, children: /* @__PURE__ */ a(Be, { asChild: !0, children: /* @__PURE__ */ a(Z, { variant: "outline", className: "tw:h-6", children: Lw(t, o, e) }) }) }),
      /* @__PURE__ */ a(Dt, { children: o["%footnoteEditor_callerDropdown_tooltip%"] })
    ] }) }),
    /* @__PURE__ */ u(
      Ve,
      {
        style: { zIndex: An },
        onClick: () => {
          s.current && (s.current = !1);
        },
        onKeyDown: D,
        onMouseMove: () => {
          var k;
          s.current && ((k = n.current) == null || k.focus());
        },
        children: [
          /* @__PURE__ */ a(or, { children: o["%footnoteEditor_callerDropdown_label%"] }),
          /* @__PURE__ */ a(Ye, {}),
          /* @__PURE__ */ a(
            Se,
            {
              checked: c === "generated",
              onCheckedChange: () => l("generated"),
              children: /* @__PURE__ */ u("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ a("span", { children: o["%footnoteEditor_callerDropdown_item_generated%"] }),
                /* @__PURE__ */ a("span", { className: "tw:w-10 tw:text-center", children: ao })
              ] })
            }
          ),
          /* @__PURE__ */ a(
            Se,
            {
              checked: c === "hidden",
              onCheckedChange: () => l("hidden"),
              children: /* @__PURE__ */ u("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ a("span", { children: o["%footnoteEditor_callerDropdown_item_hidden%"] }),
                /* @__PURE__ */ a("span", { className: "tw:w-10 tw:text-center", children: oo })
              ] })
            }
          ),
          /* @__PURE__ */ a(
            Se,
            {
              ref: i,
              checked: c === "custom",
              onCheckedChange: () => l("custom"),
              onPointerDown: () => {
                g.current = c === "custom";
              },
              onClick: (k) => {
                var T;
                if (k.stopPropagation(), g.current && k.target !== n.current) {
                  v(!1);
                  return;
                }
                s.current = !0, (T = n.current) == null || T.focus();
              },
              onSelect: (k) => k.preventDefault(),
              children: /* @__PURE__ */ u("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ a("span", { children: o["%footnoteEditor_callerDropdown_item_custom%"] }),
                /* @__PURE__ */ a(
                  pa,
                  {
                    tabIndex: 0,
                    onMouseDown: (k) => {
                      k.stopPropagation(), l("custom"), s.current = !0;
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
const Vw = (t, e) => t === "f" ? /* @__PURE__ */ u(it, { children: [
  /* @__PURE__ */ a(qn, {}),
  " ",
  e["%footnoteEditor_noteType_footnote_label%"]
] }) : t === "fe" ? /* @__PURE__ */ u(it, { children: [
  /* @__PURE__ */ a(Yn, {}),
  " ",
  e["%footnoteEditor_noteType_endNote_label%"]
] }) : /* @__PURE__ */ u(it, { children: [
  /* @__PURE__ */ a(Kn, {}),
  " ",
  e["%footnoteEditor_noteType_crossReference_label%"]
] }), Gw = (t, e) => {
  if (t === "x")
    return e["%footnoteEditor_noteType_crossReference_label%"];
  let r = e["%footnoteEditor_noteType_endNote_label%"];
  return t === "f" && (r = e["%footnoteEditor_noteType_footnote_label%"]), qe(e["%footnoteEditor_noteType_tooltip%"] ?? "", {
    noteType: r
  });
};
function Fw({
  noteType: t,
  handleNoteTypeChange: e,
  localizedStrings: r,
  isTypeSwitchable: o
}) {
  return /* @__PURE__ */ u(Le, { children: [
    /* @__PURE__ */ a(St, { children: /* @__PURE__ */ u(It, { children: [
      /* @__PURE__ */ a(Rt, { asChild: !0, children: /* @__PURE__ */ a(Be, { asChild: !0, children: /* @__PURE__ */ a(Z, { variant: "outline", className: "tw:h-6", children: Vw(t, r) }) }) }),
      /* @__PURE__ */ a(Dt, { children: /* @__PURE__ */ a("p", { children: Gw(t, r) }) })
    ] }) }),
    /* @__PURE__ */ u(Ve, { style: { zIndex: An }, children: [
      /* @__PURE__ */ a(or, { children: r["%footnoteEditor_noteTypeDropdown_label%"] }),
      /* @__PURE__ */ a(Ye, {}),
      /* @__PURE__ */ u(
        Se,
        {
          disabled: t !== "x" && !o,
          checked: t === "x",
          onCheckedChange: () => e("x"),
          className: "tw:gap-2",
          children: [
            /* @__PURE__ */ a(Kn, {}),
            /* @__PURE__ */ a("span", { children: r["%footnoteEditor_noteType_crossReference_label%"] })
          ]
        }
      ),
      /* @__PURE__ */ u(
        Se,
        {
          disabled: t === "x" && !o,
          checked: t === "f",
          onCheckedChange: () => e("f"),
          className: "tw:gap-2",
          children: [
            /* @__PURE__ */ a(qn, {}),
            /* @__PURE__ */ a("span", { children: r["%footnoteEditor_noteType_footnote_label%"] })
          ]
        }
      ),
      /* @__PURE__ */ u(
        Se,
        {
          disabled: t === "x" && !o,
          checked: t === "fe",
          onCheckedChange: () => e("fe"),
          className: "tw:gap-2",
          children: [
            /* @__PURE__ */ a(Yn, {}),
            /* @__PURE__ */ a("span", { children: r["%footnoteEditor_noteType_endNote_label%"] })
          ]
        }
      )
    ] })
  ] });
}
const Uw = Object.freeze([
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
function Hw({ icon: t, className: e }) {
  return /* @__PURE__ */ a(t ?? Js, { className: e, size: 16 });
}
function Kw({ state: t }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "marker-selection-state",
      className: "tw:flex tw:w-4 tw:min-w-4 tw:items-center tw:justify-center",
      children: t !== "none" && /* @__PURE__ */ a(Oe, { size: 16 })
    }
  );
}
function _n({
  item: t,
  localizedStrings: e
}) {
  return /* @__PURE__ */ u(
    ke,
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
        t.selectionState !== void 0 && /* @__PURE__ */ a(Kw, { state: t.selectionState }),
        /* @__PURE__ */ a("div", { className: "tw:w-8 tw:min-w-8", children: t.marker ? (
          // Monospace: a USFM marker is a code, not prose, and should read as one. Deliberately
          // inherits the row's own foreground rather than taking a marker-specific colour.
          /* @__PURE__ */ a("span", { className: "tw:font-mono tw:text-xs", children: t.marker })
        ) : /* @__PURE__ */ a("div", { children: /* @__PURE__ */ a(Hw, { icon: t.icon }) }) }),
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
        (t.isDisallowed || t.isDeprecated) && /* @__PURE__ */ a(vs, { className: "tw:font-sans", children: t.isDisallowed ? e["%markerMenu_disallowed_label%"] : e["%markerMenu_deprecated_label%"] })
      ]
    }
  );
}
function qw({
  localizedStrings: t,
  markerMenuItems: e,
  searchRef: r,
  searchPlaceholder: o
}) {
  const [n, i] = N(""), [s, c] = $(() => {
    const l = ms(n.trim().toLowerCase());
    if (!l) {
      const h = e.filter((p) => !p.isDisallowed);
      return [h.length > 0 ? h : e, []];
    }
    const d = e.filter((h) => {
      var g;
      const p = (g = h.marker) == null ? void 0 : g.toLowerCase();
      return h.isDisallowed ? p === l : p == null ? void 0 : p.includes(l);
    }), w = e.filter(
      (h) => h.title.toLowerCase().includes(l) && !d.includes(h)
    );
    return [d, w];
  }, [n, e]);
  return /* @__PURE__ */ u(Ae, { className: "tw:p-1", shouldFilter: !1, loop: !0, children: [
    /* @__PURE__ */ a(
      Pr,
      {
        className: "marker-menu-search",
        ref: r,
        value: n,
        onValueChange: (l) => i(l),
        placeholder: o ?? t["%markerMenu_searchPlaceholder%"],
        spaceSelectsHighlightedItem: !0
      }
    ),
    /* @__PURE__ */ u(je, { children: [
      /* @__PURE__ */ a($r, { children: t["%markerMenu_noResults%"] }),
      /* @__PURE__ */ a(be, { children: s.map((l) => {
        var d;
        return /* @__PURE__ */ a(
          _n,
          {
            item: l,
            localizedStrings: t
          },
          `item-${l.marker ?? ((d = l.icon) == null ? void 0 : d.displayName)}-${l.title.replaceAll(" ", "")}`
        );
      }) }),
      c.length > 0 && /* @__PURE__ */ u(it, { children: [
        s.length > 0 && /* @__PURE__ */ a(yo, { alwaysRender: !0 }),
        /* @__PURE__ */ a(be, { children: c.map((l) => {
          var d;
          return /* @__PURE__ */ a(
            _n,
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
function Yw(t, e, r, o) {
  if (!o || o === "p") return [];
  const n = Qr[o];
  if (!(n != null && n.children)) return [];
  const i = [];
  return Object.entries(n.children).forEach(([, s]) => {
    i.push(
      ...s.map((c) => ({
        marker: c,
        title: r[Qr[c].description] ?? Qr[c].description,
        action: () => {
          var l;
          (l = t.current) == null || l.insertMarker(c), e();
        }
      }))
    );
  }), i.sort((s, c) => (s.marker ?? s.title).localeCompare(c.marker ?? c.title));
}
function Ww(t) {
  return {
    id: t.marker,
    label: t.marker,
    description: t.description,
    badge: t.kind === "closeTag" ? "%markerMenu_endTag_label%" : void 0,
    muted: !t.isBasic
  };
}
function Xw(t) {
  var r;
  const e = (r = t.attributes) == null ? void 0 : r.char;
  e != null && e.style && (e.style === "ft" && (e.style = "xt"), e.style === "fr" && (e.style = "xo"), e.style === "fq" && (e.style = "xq"));
}
function Jw(t) {
  var r;
  const e = (r = t.attributes) == null ? void 0 : r.char;
  e != null && e.style && (e.style === "xt" && (e.style = "ft"), e.style === "xo" && (e.style = "fr"), e.style === "xq" && (e.style = "fq"));
}
const Zw = {
  type: "USJ",
  version: "3.1",
  content: [
    {
      type: "para"
    }
  ]
};
function yh({
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
  markerPalette: w,
  onNoteEdit: h
}) {
  var Ee;
  const p = K(null), g = K(null), f = K(null), b = K(null);
  ee(() => {
    if (!b.current) return;
    const { width: z } = b.current.getBoundingClientRect();
    z > 0 && (b.current.style.width = `${z}px`);
  }, []);
  const [v, D] = N("generated"), [k, T] = N("generated"), [R, M] = N("*"), [I, j] = N("*"), [P, O] = N("f"), [q, W] = N(!1), [F, E] = N(!0), [x, G] = N(!1), S = K(!1), C = K(""), [U, ot] = N(!1), [nt, ut] = N(), [Bt, Q] = N(), [ct, ft] = N(), [mt, vt] = N(), _t = K(null), ht = K(
    void 0
  ), Vt = K(0), ae = K(void 0), zt = $(
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
        ...s.view ?? zl(),
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
  ), Gt = $(
    () => Yw(
      p,
      () => ot(!1),
      l,
      mt
    ),
    [l, mt]
  );
  J(() => {
    var z;
    U || (z = p.current) == null || z.focus();
  }, [P, U]);
  const gt = B(() => {
    var y, Y, A;
    const z = (y = g.current) == null ? void 0 : y.querySelector(".editor-input"), H = z == null ? void 0 : z.querySelector("span.note"), X = (A = (Y = g.current) == null ? void 0 : Y.ownerDocument.getSelection()) == null ? void 0 : A.anchorNode;
    return !!H && !!X && H.contains(X);
  }, []);
  J(() => {
    var Y, A;
    let z, H, X;
    S.current = !1, ae.current = void 0, E(!0);
    const y = e == null ? void 0 : e.at(0);
    if (y && Nr("note", y)) {
      const et = (Y = y.insert.note) == null ? void 0 : Y.caller;
      let lt = "custom";
      et === ao ? lt = "generated" : et === oo ? lt = "hidden" : et && (M(et), j(et)), D(lt), T(lt), O(((A = y.insert.note) == null ? void 0 : A.style) ?? "f"), z = setTimeout(() => {
        var pt, Ct, Ot;
        (pt = p.current) == null || pt.applyUpdate([y]), (Ct = p.current) == null || Ct.selectNote(0), (Ot = p.current) == null || Ot.focus(), H = requestAnimationFrame(() => {
          X = setTimeout(() => {
            var jt, oe;
            gt() || ((jt = p.current) == null || jt.selectNote(0), (oe = p.current) == null || oe.focus());
          }, 0);
        });
      }, 0);
    }
    return () => {
      z && clearTimeout(z), H !== void 0 && cancelAnimationFrame(H), X !== void 0 && clearTimeout(X);
    };
  }, [e, i, gt]);
  const Xt = B(
    (z = !1) => {
      var X, y, Y;
      h == null || h();
      const H = (y = (X = p.current) == null ? void 0 : X.getNoteOps(0)) == null ? void 0 : y.at(0);
      H && Nr("note", H) && (r == null || r([H]), z && d && i && ((Y = d.current) == null || Y.replaceEmbedUpdate(i, [H])));
    },
    [i, r, h, d]
  ), xt = B(
    (z, H) => {
      var Y, A, et;
      const X = (A = (Y = p.current) == null ? void 0 : Y.getNoteOps(0)) == null ? void 0 : A.at(0);
      if (!X || !Nr("note", X) || !X.insert.note) return;
      let y;
      z === "custom" ? y = H : z === "generated" ? y = ao : y = oo, X.insert.note.caller !== y && (X.insert.note.caller = y, (et = p.current) == null || et.applyUpdate([X, { delete: 1 }]));
    },
    []
  ), Nt = B(() => {
    var z;
    ht.current || (z = p.current) == null || z.commitPendingMarkerEdits(), Xt(!0), o();
  }, [o, Xt]), At = K(Nt);
  ee(() => {
    At.current = Nt;
  });
  const Jt = K({ book: n.book, chapterNum: n.chapterNum });
  ee(() => {
    (Jt.current.book !== n.book || Jt.current.chapterNum !== n.chapterNum) && (Jt.current = { book: n.book, chapterNum: n.chapterNum }, At.current());
  }, [n.book, n.chapterNum]);
  const ue = () => {
    var H;
    const z = (H = g.current) == null ? void 0 : H.getElementsByClassName("editor-input")[0];
    z != null && z.textContent && navigator.clipboard.writeText(z.textContent);
  }, Zt = B(
    (z, H) => {
      h == null || h(), D(z), M(H), xt(z, H);
    },
    [xt, h]
  ), Ge = (z) => {
    var X, y, Y, A, et;
    O(z);
    const H = (y = (X = p.current) == null ? void 0 : X.getNoteOps(0)) == null ? void 0 : y.at(0);
    if (H && Nr("note", H)) {
      H.insert.note && (H.insert.note.style = z);
      const lt = (A = (Y = H.insert.note) == null ? void 0 : Y.contents) == null ? void 0 : A.ops;
      P !== "x" && z === "x" ? lt == null || lt.forEach((pt) => Xw(pt)) : P === "x" && z !== "x" && (lt == null || lt.forEach((pt) => Jw(pt))), (et = p.current) == null || et.applyUpdate([H, { delete: 1 }]);
    }
  }, ne = (z) => {
    vt(z.contextMarker), G(z.canRedo);
  }, L = B(
    (z) => {
      var X, y, Y, A, et;
      const H = (y = (X = p.current) == null ? void 0 : X.getNoteOps(0)) == null ? void 0 : y.at(0);
      if (H && Nr("note", H)) {
        z.content.length > 1 && setTimeout(() => {
          var Ct;
          (Ct = p.current) == null || Ct.applyUpdate([{ retain: 2 }, { delete: 1 }]);
        }, 0);
        const lt = (Y = H.insert.note) == null ? void 0 : Y.style, pt = (et = (A = H.insert.note) == null ? void 0 : A.contents) == null ? void 0 : et.ops;
        if (lt || W(!1), W(
          lt === "x" ? !!(pt != null && pt.every((Ct) => {
            var jt, oe;
            if (!((jt = Ct.attributes) != null && jt.char)) return !0;
            const Ot = ((oe = Ct.attributes) == null ? void 0 : oe.char).style;
            return Ot === "xt" || Ot === "xo" || Ot === "xq";
          })) : !!(pt != null && pt.every((Ct) => {
            var jt, oe;
            if (!((jt = Ct.attributes) != null && jt.char)) return !0;
            const Ot = ((oe = Ct.attributes) == null ? void 0 : oe.char).style;
            return Ot === "ft" || Ot === "fr" || Ot === "fq";
          }))
        ), !S.current) {
          S.current = !0, C.current = JSON.stringify(H), E(!0);
          return;
        }
        E(JSON.stringify(H) === C.current), Xt();
      } else
        W(!1), E(!0);
    },
    [Xt]
  ), Ft = B(() => {
    const z = window.getSelection();
    if (f.current && Gt.length && z && z.rangeCount > 0) {
      const H = z.getRangeAt(0).getBoundingClientRect(), X = f.current.getBoundingClientRect();
      ut(H.left - X.left), Q(H.top - X.top), ft(H.height), ot(!0);
    }
  }, [Gt, f]), yt = K(() => {
  }), ce = B(
    (z, H, X) => {
      const { anchorRect: y } = z;
      if (!w || !y) return;
      const { passive: Y } = X;
      bs({
        items: H,
        passive: Y,
        // No `shouldSpaceCommit`, deliberately: the Space note-marker exception exists for
        // Standard-view BODY text, where a materialized `\f ` literal absorbs the following word
        // as the new footnote's caller. This palette offers note-INTERNAL markers for content
        // already inside a note, so Space keeps its plain typed-literal commit here.
        sessionCounterRef: Vt,
        setSession: (A) => {
          ht.current = A;
        },
        clearSessionIfCurrent: (A) => Lo(ht, A),
        // Through the ref so the palette always runs the CURRENT handler — the callback is
        // captured once, at show time, while the session it drives is replaced on every reopen.
        runSessionKey: (A) => yt.current(A),
        show: (A) => w.show(
          H.map(Ww),
          y,
          Y,
          A
        ),
        restoreSelectionIfLost: () => {
          var A, et, lt;
          if (!((A = p.current) != null && A.getSelection())) {
            const pt = ae.current;
            pt ? (et = p.current) == null || et.setSelection(pt) : (lt = p.current) == null || lt.selectNote(0);
          }
        },
        focusEditor: () => {
          var A;
          return (A = p.current) == null ? void 0 : A.focus();
        },
        applyItem: (A) => {
          var et;
          return (et = p.current) == null ? void 0 : et.applyMarkerMenuSelection(A, {
            trigger: "backslash",
            // ACTIVE palette: the trigger was claimed and never landed, so there is never a
            // literal prefix for the apply to clean up.
            literalPrefixLanded: !1
          });
        },
        onShowError: (A) => {
          (!pc(A) || A.code !== hc) && console.warn(
            `FootnoteEditor: the marker palette did not open: ${gc(A)}`
          );
        }
      });
    },
    [w]
  ), Qt = B(() => {
    var X;
    const z = (X = p.current) == null ? void 0 : X.getMarkerMenuContext();
    if (!z) return !1;
    const H = Ol(zt.styleInfo ?? Ml, z);
    return H.length === 0 ? !1 : (ce(z, H, { passive: !z.hasTextSelection }), !0);
  }, [ce, zt.styleInfo]), Ut = B(
    (z) => {
      const H = ht.current;
      if (!H || !w) return;
      xs(z, H, {
        // Overlay ops delegate to the host-supplied driver; the commit ops are EDITOR-side
        // applies this popover owns (it holds the editor ref). The table calls `dismiss()` right
        // after each, resolving the show promise `undefined` — which the openMarkerPalette
        // `.then` treats as a dismissal, so nothing double-applies.
        update: (y) => w.update(y),
        commit: () => w.commit(),
        dismiss: () => w.dismiss(),
        commitTyped: (y) => {
          var Y;
          return (Y = p.current) == null ? void 0 : Y.commitTypedMarker(y);
        },
        commitTypedAndReopen: (y) => {
          var Y;
          (Y = p.current) == null || Y.commitTypedMarker(y, { trailingSpace: !1 }), Qt();
        },
        commitTypedCloser: (y) => {
          var Y;
          return (Y = p.current) == null ? void 0 : Y.commitTypedCloser(y);
        },
        commitItem: (y) => {
          var A;
          const Y = H.items.find((et) => et.marker === y);
          Y && ((A = p.current) == null || A.applyMarkerMenuSelection(Y, {
            trigger: "backslash",
            literalPrefixLanded: !1
          }));
        }
      }) === "ended" && Lo(ht, H.token);
    },
    [w, Qt]
  );
  J(() => {
    yt.current = Ut;
  }, [Ut]), J(() => {
    const z = (H) => {
      var Y, A;
      const X = (Y = g.current) == null ? void 0 : Y.querySelector(".editor-input");
      if (!X || H.target !== X) return;
      const y = (A = p.current) == null ? void 0 : A.getSelection();
      y && (ae.current = y);
    };
    return document.addEventListener("focusout", z), () => document.removeEventListener("focusout", z);
  }, []), J(() => {
    const z = () => {
      U && ot(!1);
    };
    return window.addEventListener("click", z), () => {
      window.removeEventListener("click", z);
    };
  }, [U]), J(() => {
    var z;
    U && ((z = _t.current) == null || z.focus());
  }, [U]), J(() => {
    var X;
    const z = () => {
      var y;
      return ((y = g.current) == null ? void 0 : y.querySelector(".editor-input")) ?? void 0;
    };
    if (((X = zt.view) == null ? void 0 : X.markerMode) === "editable") {
      const y = (A) => {
        var pt, Ct, Ot, jt;
        if (ks(A)) return;
        const et = z();
        if (!et || document.activeElement !== et) return;
        if (ht.current && w) {
          yt.current(A);
          return;
        }
        if (A.key === "Enter" && !gt()) {
          A.preventDefault(), A.stopPropagation(), (pt = p.current) == null || pt.selectNote(0), (Ct = p.current) == null || Ct.focus();
          return;
        }
        if (w && A.key === c) {
          if (!gt()) {
            A.preventDefault(), A.stopPropagation(), (Ot = p.current) == null || Ot.selectNote(0), (jt = p.current) == null || jt.focus();
            return;
          }
          Qt() && (A.preventDefault(), A.stopPropagation());
        }
      }, Y = () => {
        var et, lt;
        const A = z();
        !A || document.activeElement !== A || gt() || ((et = p.current) == null || et.selectNote(0), (lt = p.current) == null || lt.focus());
      };
      return document.addEventListener("keydown", y, { capture: !0 }), document.addEventListener("paste", Y, { capture: !0 }), () => {
        document.removeEventListener("keydown", y, { capture: !0 }), document.removeEventListener("paste", Y, { capture: !0 });
      };
    }
    const H = (y) => {
      const Y = z();
      !U && Y && document.activeElement === Y && y.key === c ? (y.preventDefault(), Ft()) : U && y.key === "Escape" && (y.preventDefault(), ot(!1));
    };
    return document.addEventListener("keydown", H), () => {
      document.removeEventListener("keydown", H);
    };
  }, [
    U,
    Ft,
    c,
    (Ee = zt.view) == null ? void 0 : Ee.markerMode,
    zt.styleInfo,
    w,
    Qt,
    gt
  ]), J(() => {
    const z = () => {
      var y, Y, A;
      const H = ((y = g.current) == null ? void 0 : y.querySelector(".editor-input")) ?? void 0;
      if (!H || document.activeElement !== H) return;
      const X = document.getSelection();
      X && !X.isCollapsed || gt() || ((Y = p.current) == null || Y.selectNote(0), (A = p.current) == null || A.focus());
    };
    return document.addEventListener("pointerup", z), document.addEventListener("selectionchange", z), () => {
      document.removeEventListener("pointerup", z), document.removeEventListener("selectionchange", z);
    };
  }, [gt]);
  const pe = l["%footnoteEditor_copyButton_tooltip%"];
  return /* @__PURE__ */ u(it, { children: [
    /* @__PURE__ */ u("div", { ref: b, className: "footnote-editor tw:grid tw:gap-[12px]", children: [
      /* @__PURE__ */ u("div", { className: "tw:flex", children: [
        /* @__PURE__ */ u("div", { className: "tw:flex tw:gap-4", children: [
          /* @__PURE__ */ a(
            Fw,
            {
              isTypeSwitchable: q,
              noteType: P,
              handleNoteTypeChange: Ge,
              localizedStrings: l
            }
          ),
          /* @__PURE__ */ a(
            Bw,
            {
              callerType: v,
              customCaller: R,
              updateCaller: Zt,
              localizedStrings: l
            }
          )
        ] }),
        /* @__PURE__ */ a("div", { className: "tw:flex tw:w-full tw:justify-end", children: /* @__PURE__ */ u(fo, { children: [
          /* @__PURE__ */ a(
            Aw,
            {
              onUndoClick: () => {
                var z;
                return (z = p.current) == null ? void 0 : z.undo();
              },
              onRedoClick: () => {
                var z;
                return (z = p.current) == null ? void 0 : z.redo();
              },
              canUndo: !F,
              canRedo: x,
              localizedStrings: l
            }
          ),
          /* @__PURE__ */ a(
            Fi,
            {
              onCancelClick: o,
              onAcceptClick: Nt,
              canAccept: !F || k !== v || v === "custom" && R !== I,
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
              jw,
              {
                editorRef: p,
                canUndo: !F,
                canRedo: x,
                children: /* @__PURE__ */ a(
                  Pl,
                  {
                    options: zt,
                    onStateChange: ne,
                    onUsjChange: L,
                    defaultUsj: Zw,
                    onScrRefChange: () => {
                    },
                    scrRef: n,
                    ref: p
                  }
                )
              }
            ) }),
            /* @__PURE__ */ a("div", { className: "tw:absolute tw:bottom-0 tw:right-0", children: /* @__PURE__ */ a(St, { children: /* @__PURE__ */ u(It, { children: [
              /* @__PURE__ */ a(Rt, { asChild: !0, children: /* @__PURE__ */ a(
                Z,
                {
                  "aria-label": pe,
                  onClick: ue,
                  className: "tw:h-6 tw:w-6",
                  variant: "ghost",
                  size: "icon",
                  children: /* @__PURE__ */ a(Un, {})
                }
              ) }),
              /* @__PURE__ */ a(Dt, { children: /* @__PURE__ */ a("p", { children: pe }) })
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
    /* @__PURE__ */ u(Pe, { open: U, children: [
      /* @__PURE__ */ a(
        ys,
        {
          className: "tw:absolute",
          style: {
            top: Bt,
            left: nt,
            height: ct,
            width: 0,
            pointerEvents: "none"
          }
        }
      ),
      /* @__PURE__ */ a(
        $e,
        {
          className: "tw:w-[500px] tw:p-0",
          onClick: (z) => {
            z.preventDefault(), z.stopPropagation();
          },
          children: /* @__PURE__ */ a(
            qw,
            {
              markerMenuItems: Gt,
              localizedStrings: l,
              searchRef: _t
            }
          )
        }
      )
    ] })
  ] });
}
const kh = Object.freeze([
  ...Uw,
  ...Object.entries(Qr).map(([, t]) => t.description).filter((t) => !!t),
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
  ...$w,
  ...Gi
]);
function Qw(t, e, r = !0, o = void 0) {
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
        jo(t, c, r, !0, n),
        d && o
      ] }, `para-${l}`)
    );
  });
}
function jo(t, e, r = !0, o = !0, n = []) {
  if (!(!e || e.length === 0))
    return e.map((i, s) => {
      const c = `part-${s}`;
      if (typeof i == "string") {
        if (o) {
          const l = m(`usfm_${t}`);
          return /* @__PURE__ */ a("span", { className: l, children: i }, c);
        }
        return /* @__PURE__ */ u(
          "span",
          {
            className: "tw:inline-flex tw:items-center tw:gap-1 tw:underline tw:decoration-destructive",
            children: [
              /* @__PURE__ */ a(Za, { className: "tw:h-4 tw:w-4 tw:fill-destructive" }),
              /* @__PURE__ */ a("span", { children: i }),
              /* @__PURE__ */ a(Za, { className: "tw:h-4 tw:w-4 tw:fill-destructive" })
            ]
          },
          c
        );
      }
      return tu(i, c, r, [
        ...n,
        t ?? "unknown"
      ]);
    });
}
function tu(t, e, r, o = []) {
  const { marker: n } = t;
  return /* @__PURE__ */ u("span", { children: [
    n ? r && /* @__PURE__ */ a("span", { className: "marker", children: `\\${n} ` }) : /* @__PURE__ */ a(
      Za,
      {
        className: "tw:text-error tw:mr-1 tw:inline-block tw:h-4 tw:w-4",
        "aria-label": "Missing marker"
      }
    ),
    jo(n, t.content, r, !0, [
      ...o,
      n ?? "unknown"
    ])
  ] }, e);
}
function eu({
  footnote: t,
  layout: e = "horizontal",
  formatCaller: r,
  showMarkers: o = !0
}) {
  const n = r ? r(t.caller) : t.caller, i = n !== t.caller;
  let s, c = t.content;
  Array.isArray(t.content) && t.content.length > 0 && typeof t.content[0] != "string" && (t.content[0].marker === "fr" || t.content[0].marker === "xo") && ([s, ...c] = t.content);
  const l = o ? /* @__PURE__ */ a("span", { className: "marker", children: `\\${t.marker}` }) : void 0, d = o ? /* @__PURE__ */ a("span", { className: "marker", children: ` \\${t.marker}*` }) : void 0, w = n && // USFM does not specify a marker for caller, so instead of a usfm_* class, we use a
  // specific class name in case styling is needed.
  /* @__PURE__ */ a("span", { className: m("note-caller tw:inline-block", { formatted: i }), children: n }), h = t.category && /* @__PURE__ */ u("span", { className: "note-category tw:inline-block", children: [
    o && /* @__PURE__ */ a("span", { className: "marker", children: "\\cat " }),
    t.category,
    o && /* @__PURE__ */ a("span", { className: "marker", children: "\\cat*" })
  ] }), p = s && /* @__PURE__ */ u(it, { children: [
    jo(t.marker, [s], o, !1),
    " "
  ] }), g = !!l, f = !!w, b = !!h, v = e === "horizontal" ? "horizontal" : "vertical", D = o ? "marker-visible" : "", k = e === "horizontal" ? "tw:col-span-1" : "tw:col-span-2 tw:col-start-1 tw:row-start-2", T = m(v, D);
  return /* @__PURE__ */ u(it, { children: [
    /* @__PURE__ */ u("div", { className: m("textual-note-header tw:col-span-1 tw:w-fit tw:text-nowrap", T), children: [
      l,
      g && (f || b) && " ",
      w,
      f && b && " ",
      h
    ] }),
    /* @__PURE__ */ a("div", { className: m("textual-note-header tw:col-span-1 tw:w-fit tw:text-nowrap", T), children: p }),
    /* @__PURE__ */ a(
      "div",
      {
        className: m(
          "textual-note-body tw:flex tw:flex-col tw:gap-1",
          k,
          T
        ),
        children: c && c.length > 0 && /* @__PURE__ */ a(it, { children: Qw(t.marker, c, o, d) })
      }
    )
  ] });
}
function _h({
  className: t,
  classNameForItems: e,
  footnotes: r,
  layout: o = "horizontal",
  listId: n,
  selectedFootnote: i,
  selectionRequest: s,
  showMarkers: c = !0,
  suppressFormatting: l = !1,
  formatCaller: d,
  onFootnoteSelected: w
}) {
  const h = d ?? fc(r, void 0), p = (R, M) => {
    w == null || w(R, M, n);
  }, g = i ? r.findIndex((R) => R === i) : -1, [f, b] = N(g), v = (R, M, I) => {
    if (r.length)
      switch (R.key) {
        case "Enter":
        case " ":
          R.preventDefault(), w == null || w(M, I, n);
          break;
      }
  }, D = (R) => {
    if (r.length)
      switch (R.key) {
        case "ArrowDown":
          R.preventDefault(), b((M) => Math.min(M + 1, r.length - 1));
          break;
        case "ArrowUp":
          R.preventDefault(), b((M) => Math.max(M - 1, 0));
          break;
      }
  }, k = K([]);
  J(() => {
    var R;
    f >= 0 && f < k.current.length && ((R = k.current[f]) == null || R.focus());
  }, [f]);
  const T = i ? r.findIndex((R) => R === i) : -1;
  return J(() => {
    var R;
    T < 0 || T >= k.current.length || (R = k.current[T]) == null || R.scrollIntoView({ block: "nearest" });
  }, [T, s]), /* @__PURE__ */ a(
    "div",
    {
      role: "listbox",
      "aria-label": "Footnotes",
      tabIndex: f < 0 ? 0 : -1,
      className: m("tw:h-full tw:overflow-y-auto", t),
      onKeyDown: D,
      children: /* @__PURE__ */ a(
        "ul",
        {
          className: m(
            "tw:p-0.5 tw:pt-1",
            "tw:grid",
            o === "horizontal" ? "tw:grid-cols-[min-content_min-content_1fr]" : "tw:grid-cols-[min-content_1fr]",
            !l && "formatted-font"
          ),
          children: r.map((R, M) => {
            const I = R === i, j = `${n}-${M}`;
            return (
              // The key belongs on the outermost node returned from the map — the Fragment — not on
              // the `<li>` nested inside it, which leaves the Fragment itself unkeyed.
              /* @__PURE__ */ u(Yt.Fragment, { children: [
                /* @__PURE__ */ a(
                  "li",
                  {
                    ref: (P) => {
                      k.current[M] = P;
                    },
                    role: "option",
                    "aria-selected": I,
                    "data-marker": R.marker,
                    "data-state": I ? "selected" : void 0,
                    tabIndex: M === f ? 0 : -1,
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
                    onClick: () => p(R, M),
                    onKeyDown: (P) => v(P, R, M),
                    children: /* @__PURE__ */ a(
                      eu,
                      {
                        footnote: R,
                        layout: o,
                        formatCaller: () => h(R.caller, M),
                        showMarkers: c
                      }
                    )
                  }
                ),
                M < r.length - 1 && o === "vertical" && /* @__PURE__ */ a(Dr, { tabIndex: -1, className: "tw:col-span-2" })
              ] }, j)
            );
          })
        }
      )
    }
  );
}
function ru(t) {
  const e = [];
  let r = 0;
  const o = /\\\\(.+?)\\\\/g;
  let n;
  for (; (n = o.exec(t)) !== null; )
    n.index > r && e.push(t.substring(r, n.index)), e.push(/* @__PURE__ */ a("strong", { children: n[1] }, n.index)), r = o.lastIndex;
  return r < t.length && e.push(t.substring(r)), e.length > 0 ? e : [t];
}
function au({
  occurrenceData: t,
  setScriptureReference: e,
  localizedStrings: r,
  classNameForText: o
}) {
  const n = r["%webView_inventory_occurrences_table_header_reference%"], i = r["%webView_inventory_occurrences_table_header_occurrence%"], s = $(() => {
    const c = [], l = /* @__PURE__ */ new Set();
    return t.forEach((d) => {
      const w = `${d.reference.book}:${d.reference.chapterNum}:${d.reference.verseNum}:${d.text}`;
      l.has(w) || (l.add(w), c.push(d));
    }), c;
  }, [t]);
  return /* @__PURE__ */ u(vo, { stickyHeader: !0, children: [
    /* @__PURE__ */ a(bo, { stickyHeader: !0, children: /* @__PURE__ */ u(Ke, { children: [
      /* @__PURE__ */ a(ia, { children: n }),
      /* @__PURE__ */ a(ia, { children: i })
    ] }) }),
    /* @__PURE__ */ a(xo, { children: s.length > 0 && s.map((c) => /* @__PURE__ */ u(
      Ke,
      {
        onClick: () => {
          e(c.reference);
        },
        children: [
          /* @__PURE__ */ a(ur, { children: Ie(c.reference, "English") }),
          /* @__PURE__ */ a(ur, { className: o, children: ru(c.text) })
        ]
      },
      `${c.reference.book} ${c.reference.chapterNum}:${c.reference.verseNum}-${c.text}`
    )) })
  ] });
}
function Wi({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    Jo.Root,
    {
      "data-slot": "checkbox",
      className: m(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:peer tw:relative tw:flex tw:size-4 tw:shrink-0 tw:items-center tw:justify-center tw:rounded-[4px] tw:border tw:border-input tw:transition-colors tw:outline-none tw:group-has-disabled/field:opacity-50 tw:after:absolute tw:after:-inset-x-3 tw:after:-inset-y-2 tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:aria-invalid:aria-checked:border-primary tw:dark:bg-input/30 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40 tw:data-checked:border-primary tw:data-checked:bg-primary tw:data-checked:text-primary-foreground tw:dark:data-checked:bg-primary",
        t
      ),
      ...e,
      children: /* @__PURE__ */ a(
        Jo.Indicator,
        {
          "data-slot": "checkbox-indicator",
          className: "tw:grid tw:place-content-center tw:text-current tw:transition-none tw:[&>svg]:size-3.5",
          children: /* @__PURE__ */ a(ga, {})
        }
      )
    }
  );
}
const ou = (t) => {
  if (t === "asc")
    return /* @__PURE__ */ a(ec, { className: "tw:h-4 tw:w-4" });
  if (t === "desc")
    return /* @__PURE__ */ a(rc, { className: "tw:h-4 tw:w-4" });
}, va = (t, e, r) => /* @__PURE__ */ a(St, { children: /* @__PURE__ */ u(It, { children: [
  /* @__PURE__ */ u(
    Rt,
    {
      className: m("tw:flex tw:w-full tw:justify-start", r),
      variant: "ghost",
      onClick: () => t.toggleSorting(void 0),
      children: [
        /* @__PURE__ */ a("span", { className: "tw:w-6 tw:max-w-fit tw:flex-1 tw:overflow-hidden tw:text-ellipsis", children: e }),
        ou(t.getIsSorted())
      ]
    }
  ),
  /* @__PURE__ */ a(Dt, { side: "bottom", children: e })
] }) }), Nh = (t) => ({
  accessorKey: "item",
  accessorFn: (e) => e.items[0],
  header: ({ column: e }) => va(e, t)
}), nu = (t, e) => ({
  accessorKey: `item${e}`,
  accessorFn: (r) => r.items[e],
  header: ({ column: r }) => va(r, t)
}), Ch = (t) => ({
  accessorKey: "count",
  header: ({ column: e }) => va(e, t, "tw:justify-end"),
  cell: ({ row: e }) => /* @__PURE__ */ a("div", { className: "tw:flex tw:justify-end tw:tabular-nums", children: e.getValue("count") })
}), Va = (t, e, r, o, n, i) => {
  let s = [...r];
  t.forEach((l) => {
    e === "approved" ? s.includes(l) || s.push(l) : s = s.filter((d) => d !== l);
  }), o(s);
  let c = [...n];
  t.forEach((l) => {
    e === "unapproved" ? c.includes(l) || c.push(l) : c = c.filter((d) => d !== l);
  }), i(c);
}, Eh = (t, e, r, o, n) => ({
  accessorKey: "status",
  header: ({ column: i }) => va(i, t, "tw:justify-center"),
  cell: ({ row: i }) => {
    const s = i.getValue("status"), c = i.getValue("item");
    return (
      // Center the status buttons in the cell to match the centered status column header (the
      // ToggleGroup would otherwise sit left-aligned).
      /* @__PURE__ */ a("div", { className: "tw:flex tw:justify-center", children: /* @__PURE__ */ u(On, { value: s, variant: "outline", type: "single", className: "tw:gap-0", children: [
        /* @__PURE__ */ a(
          Xr,
          {
            onClick: (l) => {
              l.stopPropagation(), Va(
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
            children: /* @__PURE__ */ a(Zs, {})
          }
        ),
        /* @__PURE__ */ a(
          Xr,
          {
            onClick: (l) => {
              l.stopPropagation(), Va(
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
            children: /* @__PURE__ */ a(Qs, {})
          }
        ),
        /* @__PURE__ */ a(
          Xr,
          {
            onClick: (l) => {
              l.stopPropagation(), Va(
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
            children: /* @__PURE__ */ a(tc, {})
          }
        )
      ] }) })
    );
  }
}), Th = (t) => t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g), Sh = (t) => {
  const e = /^\\[vc]\s+(\d+)/, r = t.match(e);
  if (r)
    return +r[1];
}, Ih = (t) => {
  const e = t.match(/^\\id\s+([A-Za-z]+)/);
  return e ? e[1] : "";
}, iu = (t, e, r) => r.includes(t) ? "unapproved" : e.includes(t) ? "approved" : "unknown", Rh = Object.freeze([
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
]), su = (t, e, r) => {
  let o = t;
  return e !== "all" && (o = o.filter(
    (n) => e === "approved" && n.status === "approved" || e === "unapproved" && n.status === "unapproved" || e === "unknown" && n.status === "unknown"
  )), r !== "" && (o = o.filter((n) => n.items[0].includes(r))), o;
}, cu = (t, e, r) => t.map((o) => {
  const n = Uo(o.key) ? o.key : o.key[0];
  return {
    items: Uo(o.key) ? [o.key] : o.key,
    count: o.count,
    status: o.status || iu(n, e, r),
    occurrences: o.occurrences || []
  };
}), ge = (t, e) => t[e] ?? e;
function Dh({
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
  classNameForVerseText: h,
  onItemSelected: p
}) {
  const g = ge(r, "%webView_inventory_all%"), f = ge(r, "%webView_inventory_approved%"), b = ge(r, "%webView_inventory_unapproved%"), v = ge(r, "%webView_inventory_unknown%"), D = ge(r, "%webView_inventory_scope_currentBook%"), k = ge(r, "%webView_inventory_scope_chapter%"), T = ge(r, "%webView_inventory_scope_verse%"), R = ge(r, "%webView_inventory_filter_text%"), M = ge(
    r,
    "%webView_inventory_show_additional_items%"
  ), I = ge(r, "%webView_inventory_no_results%"), [j, P] = N(!1), [O, q] = N("all"), [W, F] = N(""), [E, x] = N([]), G = $(() => {
    const Q = t ?? [];
    return Q.length === 0 ? [] : cu(Q, n, i);
  }, [t, n, i]), S = $(() => {
    if (j) return G;
    const Q = [];
    return G.forEach((ct) => {
      const ft = ct.items[0], mt = Q.find(
        (vt) => vt.items[0] === ft
      );
      mt ? (mt.count += ct.count, mt.occurrences = mt.occurrences.concat(ct.occurrences)) : Q.push({
        items: [ft],
        count: ct.count,
        occurrences: ct.occurrences,
        status: ct.status
      });
    }), Q;
  }, [j, G]), C = $(() => S.length === 0 ? [] : su(S, O, W), [S, O, W]), U = $(() => {
    var ft, mt;
    if (!j) return l;
    const Q = (ft = o == null ? void 0 : o.tableHeaders) == null ? void 0 : ft.length;
    if (!Q) return l;
    const ct = [];
    for (let vt = 0; vt < Q; vt++)
      ct.push(
        nu(
          ((mt = o == null ? void 0 : o.tableHeaders) == null ? void 0 : mt[vt]) || "Additional Item",
          vt + 1
        )
      );
    return [...ct, ...l];
  }, [o == null ? void 0 : o.tableHeaders, l, j]);
  J(() => {
    C.length === 0 ? x([]) : C.length === 1 && x(C[0].items);
  }, [C]);
  const ot = (Q, ct) => {
    ct.setRowSelection(() => {
      const mt = {};
      return mt[Q.index] = !0, mt;
    });
    const ft = Q.original.items;
    x(ft), p && ft.length > 0 && p(ft[0]);
  }, nt = (Q) => {
    if (Q === "book" || Q === "chapter" || Q === "verse")
      c(Q);
    else
      throw new Error(`Invalid scope value: ${Q}`);
  }, ut = (Q) => {
    if (Q === "all" || Q === "approved" || Q === "unapproved" || Q === "unknown")
      q(Q);
    else
      throw new Error(`Invalid status filter value: ${Q}`);
  }, Bt = $(() => {
    if (S.length === 0 || E.length === 0) return [];
    const Q = S.filter((ct) => mc(
      j ? ct.items : [ct.items[0]],
      E
    ));
    if (Q.length > 1) throw new Error("Selected item is not unique");
    return Q.length === 0 ? [] : Q[0].occurrences;
  }, [E, j, S]);
  return /* @__PURE__ */ a("div", { id: d, className: "pr-twp tw:h-full tw:overflow-auto", children: /* @__PURE__ */ u("div", { className: "tw:flex tw:h-full tw:w-full tw:min-w-min tw:flex-col", children: [
    /* @__PURE__ */ u("div", { className: "tw:flex tw:items-stretch", style: { contain: "inline-size" }, children: [
      /* @__PURE__ */ u(
        fr,
        {
          onValueChange: (Q) => ut(Q),
          defaultValue: O,
          children: [
            /* @__PURE__ */ a(vr, { className: "tw:m-1 tw:w-auto tw:flex-1", children: /* @__PURE__ */ a(mr, { placeholder: "Select filter" }) }),
            /* @__PURE__ */ u(br, { children: [
              /* @__PURE__ */ a(le, { value: "all", children: g }),
              /* @__PURE__ */ a(le, { value: "approved", children: f }),
              /* @__PURE__ */ a(le, { value: "unapproved", children: b }),
              /* @__PURE__ */ a(le, { value: "unknown", children: v })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ u(fr, { onValueChange: (Q) => nt(Q), defaultValue: s, children: [
        /* @__PURE__ */ a(vr, { className: "tw:m-1 tw:w-auto tw:flex-1", children: /* @__PURE__ */ a(mr, { placeholder: "Select scope" }) }),
        /* @__PURE__ */ u(br, { children: [
          /* @__PURE__ */ a(le, { value: "book", children: D }),
          /* @__PURE__ */ a(le, { value: "chapter", children: k }),
          /* @__PURE__ */ a(le, { value: "verse", children: T })
        ] })
      ] }),
      /* @__PURE__ */ a(
        pa,
        {
          className: "tw:m-1 tw:flex-1 tw:rounded-md tw:border",
          placeholder: R,
          value: W,
          onChange: (Q) => {
            F(Q.target.value);
          }
        }
      ),
      o && /* @__PURE__ */ a(St, { children: /* @__PURE__ */ u(It, { children: [
        /* @__PURE__ */ a(Rt, { asChild: !0, children: /* @__PURE__ */ u("div", { className: "tw:m-1 tw:flex tw:w-fit tw:min-w-[26px] tw:items-center tw:rounded-md tw:border", children: [
          /* @__PURE__ */ a(
            Wi,
            {
              className: "tw:m-1 tw:shrink-0",
              checked: j,
              onCheckedChange: (Q) => {
                P(Q);
              }
            }
          ),
          /* @__PURE__ */ a(Tt, { className: "tw:m-1 tw:truncate", children: (o == null ? void 0 : o.checkboxText) ?? M })
        ] }) }),
        /* @__PURE__ */ a(Dt, { children: (o == null ? void 0 : o.checkboxText) ?? M })
      ] }) })
    ] }),
    /* @__PURE__ */ a("div", { className: "tw:m-1 tw:flex-1 tw:overflow-auto tw:rounded-md tw:border", children: /* @__PURE__ */ a(
      Dw,
      {
        columns: U,
        data: C,
        onRowClickHandler: ot,
        stickyHeader: !0,
        isLoading: w,
        noResultsMessage: I
      }
    ) }),
    Bt.length > 0 && /* @__PURE__ */ a("div", { className: "tw:m-1 tw:flex-1 tw:overflow-auto tw:rounded-md tw:border", children: /* @__PURE__ */ a(
      au,
      {
        classNameForText: h,
        occurrenceData: Bt,
        setScriptureReference: e,
        localizedStrings: r
      }
    ) })
  ] }) });
}
function lu(t) {
  const e = /* @__PURE__ */ new Map();
  return t.forEach((r) => {
    const o = ve(r.projectId), n = e.get(o), i = {
      scrollGroupId: r.scrollGroupId,
      scrollGroupScrRefLabel: r.scrollGroupScrRefLabel
    };
    n ? n.some((s) => s.scrollGroupId === r.scrollGroupId) || n.push(i) : e.set(o, [i]);
  }), e.forEach((r) => r.sort((o, n) => o.scrollGroupId - n.scrollGroupId)), e;
}
function Nn(t, e, r) {
  return t.some((o) => o.projectId === e && o.scrollGroupId === r);
}
function Ga(t) {
  const e = lu(t.openTabs);
  if (t.mode === "project") {
    const n = t.selection.projectId;
    return t.projects.map((i) => {
      const s = e.get(ve(i.id)) ?? [];
      return {
        rowKey: i.id,
        projectId: i.id,
        shortName: i.shortName,
        fullName: i.fullName,
        language: i.language,
        languageCode: i.languageCode,
        scrollGroupId: void 0,
        scrollGroupScrRefLabel: void 0,
        openGroups: s.map((c) => c.scrollGroupId),
        isSelected: n === i.id,
        isMuted: s.length === 0,
        isBoundButClosed: !1,
        isDisabled: i.isDisabled === !0,
        disabledReason: i.disabledReason,
        versificationId: i.versificationId,
        versificationName: i.versificationName,
        type: i.type,
        typeName: i.typeName,
        lastUsedAt: i.lastUsedAt
      };
    });
  }
  let r = [];
  t.mode === "project-multi" ? r = t.selection.pairs : t.selection.projectId !== void 0 && (r = [
    {
      projectId: t.selection.projectId,
      scrollGroupId: t.selection.scrollGroupId
    }
  ]);
  const o = [];
  return t.projects.forEach((n) => {
    const i = e.get(ve(n.id));
    if (!i || i.length === 0) {
      o.push({
        rowKey: `project:${n.id}`,
        projectId: n.id,
        shortName: n.shortName,
        fullName: n.fullName,
        language: n.language,
        languageCode: n.languageCode,
        scrollGroupId: void 0,
        scrollGroupScrRefLabel: void 0,
        openGroups: [],
        isSelected: Nn(r, n.id, void 0),
        isMuted: !0,
        isBoundButClosed: !1,
        isDisabled: n.isDisabled === !0,
        disabledReason: n.disabledReason,
        versificationId: n.versificationId,
        versificationName: n.versificationName,
        type: n.type,
        typeName: n.typeName,
        lastUsedAt: n.lastUsedAt
      });
      return;
    }
    i.forEach((s) => {
      o.push({
        rowKey: `tab:${n.id}:${s.scrollGroupId}`,
        projectId: n.id,
        shortName: n.shortName,
        fullName: n.fullName,
        language: n.language,
        languageCode: n.languageCode,
        scrollGroupId: s.scrollGroupId,
        scrollGroupScrRefLabel: s.scrollGroupScrRefLabel,
        openGroups: [],
        isSelected: Nn(r, n.id, s.scrollGroupId),
        isMuted: !1,
        isBoundButClosed: !1,
        isDisabled: n.isDisabled === !0,
        disabledReason: n.disabledReason,
        versificationId: n.versificationId,
        versificationName: n.versificationName,
        type: n.type,
        typeName: n.typeName,
        lastUsedAt: n.lastUsedAt
      });
    });
  }), r.forEach((n) => {
    if (n.scrollGroupId === void 0 || o.some((s) => s.projectId === n.projectId && s.scrollGroupId === n.scrollGroupId))
      return;
    const i = t.projects.find((s) => s.id === n.projectId);
    i && o.push({
      rowKey: `closed:${i.id}:${n.scrollGroupId}`,
      projectId: i.id,
      shortName: i.shortName,
      fullName: i.fullName,
      language: i.language,
      languageCode: i.languageCode,
      scrollGroupId: n.scrollGroupId,
      scrollGroupScrRefLabel: void 0,
      openGroups: [],
      isSelected: !0,
      isMuted: !1,
      isBoundButClosed: !0,
      isDisabled: i.isDisabled === !0,
      disabledReason: i.disabledReason,
      versificationId: i.versificationId,
      versificationName: i.versificationName,
      type: i.type,
      typeName: i.typeName,
      lastUsedAt: i.lastUsedAt
    });
  }), o;
}
function Cn(t) {
  return t.isBoundButClosed ? !1 : t.scrollGroupId !== void 0 ? !0 : t.openGroups.length > 0;
}
function qt(t, e) {
  const r = t.shortName.localeCompare(e.shortName, void 0, { sensitivity: "base" });
  if (r !== 0) return r;
  const o = t.scrollGroupId ?? Number.POSITIVE_INFINITY, n = e.scrollGroupId ?? Number.POSITIVE_INFINITY;
  return o - n;
}
function En(t, e) {
  if (!e)
    return [{ kind: "flat", rows: [...t].sort(qt) }];
  const r = t.filter(Cn).sort(qt), o = t.filter((i) => !Cn(i)).sort(qt);
  if (r.length === 0)
    return [{ kind: "flat", rows: o }];
  const n = [{ kind: "openTabs", rows: r }];
  return o.length > 0 && n.push({ kind: "other", rows: o }), n;
}
function du(t, e, r) {
  const o = /* @__PURE__ */ new Map(), n = [];
  t.forEach((c) => {
    const l = c.versificationId;
    if (l === void 0 || l === "") {
      n.push(c);
      return;
    }
    const d = c.versificationName ?? l, w = o.get(l);
    w ? (w.rows.push(c), !w.label && c.versificationName && (w.label = c.versificationName)) : o.set(l, { label: d, rows: [c] });
  });
  const i = [...o.entries()].map(([c, { label: l, rows: d }]) => ({
    id: c,
    label: l,
    rows: [...d].sort(qt)
  }));
  i.sort((c, l) => c.id === e ? -1 : l.id === e ? 1 : c.label.localeCompare(l.label, void 0, { sensitivity: "base" }));
  const s = i.map(({ id: c, label: l, rows: d }) => ({
    kind: "versification",
    rows: d,
    label: l,
    isPriority: c === e
  }));
  return n.length > 0 && s.push({
    kind: "versification",
    rows: [...n].sort(qt),
    label: r,
    isPriority: !1
  }), s;
}
function wu(t, e) {
  const r = /* @__PURE__ */ new Map(), o = [];
  t.forEach((s) => {
    const c = s.language;
    if (!c) {
      o.push(s);
      return;
    }
    const l = r.get(c);
    l ? l.push(s) : r.set(c, [s]);
  });
  const n = [...r.entries()].map(([s, c]) => ({
    label: s,
    rows: [...c].sort(qt)
  }));
  n.sort((s, c) => s.label.localeCompare(c.label, void 0, { sensitivity: "base" }));
  const i = n.map(({ label: s, rows: c }) => ({
    kind: "language",
    rows: c,
    label: s
  }));
  return o.length > 0 && i.push({
    kind: "language",
    rows: [...o].sort(qt),
    label: e
  }), i;
}
function uu(t, e) {
  const r = /* @__PURE__ */ new Map(), o = [];
  t.forEach((s) => {
    const c = s.type;
    if (!c) {
      o.push(s);
      return;
    }
    const l = s.typeName ?? c, d = r.get(c);
    d ? (d.rows.push(s), d.label === c && s.typeName && (d.label = s.typeName)) : r.set(c, { label: l, rows: [s] });
  });
  const n = [...r.values()].map(({ label: s, rows: c }) => ({
    label: s,
    rows: [...c].sort(qt)
  }));
  n.sort((s, c) => s.label.localeCompare(c.label, void 0, { sensitivity: "base" }));
  const i = n.map(({ label: s, rows: c }) => ({
    kind: "type",
    rows: c,
    label: s
  }));
  return o.length > 0 && i.push({
    kind: "type",
    rows: [...o].sort(qt),
    label: e
  }), i;
}
function pu(t, e, r) {
  const o = [], n = [];
  t.forEach((s) => {
    typeof s.lastUsedAt == "number" ? o.push(s) : n.push(s);
  }), o.sort((s, c) => (c.lastUsedAt ?? 0) - (s.lastUsedAt ?? 0)), n.sort(qt);
  const i = [];
  return o.length > 0 && i.push({ kind: "lastUsed", rows: o, label: e }), n.length > 0 && i.push({ kind: "lastUsed", rows: n, label: r }), i;
}
const Xi = "__unmatched__";
function hu(t) {
  const e = /* @__PURE__ */ new Set();
  return t.map((r) => r.id).find((r) => r === Xi || e.has(r) ? !0 : (e.add(r), !1));
}
function gu(t, e, r) {
  if (e.length === 0)
    return [{ kind: "flat", rows: [...t].sort(qt) }];
  const o = hu(e);
  o !== void 0 && console.warn(
    `ProjectSelector: duplicate custom section id "${o}" — the first section with this id wins and later ones sharing it are ignored for matching purposes.`
  );
  const n = /* @__PURE__ */ new Map(), i = (w) => {
    const h = n.get(w);
    if (h !== void 0) return h;
    const p = r.get(w), g = p ? e.findIndex((f) => f.match(p)) : -1;
    return n.set(w, g), g;
  }, s = e.map(() => []), c = [];
  t.forEach((w) => {
    const h = i(ve(w.projectId));
    h < 0 ? c.push(w) : s[h].push(w);
  });
  const l = (w, h) => {
    const { compare: p } = h;
    return p ? [...w].sort((g, f) => {
      const b = r.get(ve(g.projectId)), v = r.get(ve(f.projectId));
      if (!b || !v) return qt(g, f);
      const D = p(b, v);
      return D !== 0 ? D : qt(g, f);
    }) : [...w].sort(qt);
  }, d = [];
  return e.forEach((w, h) => {
    const p = s[h];
    p.length !== 0 && d.push({
      kind: "custom",
      id: w.id,
      rows: l(p, w),
      label: w.label
    });
  }), c.length > 0 && d.push({
    kind: "custom",
    id: Xi,
    rows: [...c].sort(qt)
  }), d;
}
const Ji = Xe + 50, fu = {
  searchPlaceholder: "Search projects & resources",
  filterAriaLabel: "Filter",
  groupSectionLabel: "Group by",
  filterSectionLabel: "Filter",
  filterGroupNone: "None",
  filterGroupByOpenTabs: "Open tabs",
  filterGroupByLanguage: "Language",
  filterGroupByLastUsed: "Last used",
  filterGroupByVersification: "Versification",
  filterGroupByType: "Type",
  filterGroupByCustom: "Custom",
  filterShowSelectedOnly: "Show selected only",
  openTabsSectionHeading: "Opened project & resource tabs",
  otherProjectsSectionHeading: "Your projects & resources",
  versificationUnknownSectionHeading: "Unknown versification",
  languageUnknownSectionHeading: "Unknown language",
  typeUnknownSectionHeading: "Unknown type",
  lastUsedRecentSectionHeading: "Recently used",
  lastUsedOtherSectionHeading: "Other",
  boundButClosedTooltip: "Bound to {group} · not currently open",
  openButtonLabel: "Open",
  selectAll: "Select all",
  clearAll: "Clear all"
};
function mu(t) {
  return { ...fu, ...t };
}
function Mr(t) {
  return Jr[Qa(t)] ?? String(t);
}
const vu = [
  "openTabs",
  "lastUsed",
  "language",
  "versification",
  "type"
], bu = {
  backgroundImage: "linear-gradient(to top right, transparent calc(50% - 1px), currentColor calc(50% - 0.5px), currentColor calc(50% + 0.5px), transparent calc(50% + 1px))"
};
function xu({ scrollGroupId: t, isBoundButClosed: e }) {
  const r = Mr(t);
  return e ? /* @__PURE__ */ a(
    ze,
    {
      variant: "outline",
      className: "tw:relative tw:text-muted-foreground",
      style: bu,
      children: r
    }
  ) : /* @__PURE__ */ a(ze, { variant: "secondary", children: r });
}
function yu({
  row: t,
  mode: e,
  strings: r,
  onClick: o,
  onOpen: n,
  selectedRowRef: i,
  indicator: s
}) {
  const {
    ref: c,
    open: l,
    onPointerEnter: d,
    onPointerLeave: w
  } = no(), [h, p] = N(!1), g = !!(t.language || t.languageCode), f = g || !!t.scrollGroupScrRefLabel || t.isBoundButClosed || t.isDisabled && !!t.disabledReason, b = l || h, v = B(() => {
    if (f) {
      p(!0);
      return;
    }
    d();
  }, [f, d]), D = B(() => {
    p(!1), w();
  }, [w]), k = /* @__PURE__ */ a(Oe, { className: m("tw:h-4 tw:w-4", t.isSelected ? "tw:opacity-100" : "tw:opacity-0") });
  let T;
  e === "project" ? t.openGroups.length > 0 && (T = /* @__PURE__ */ a("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:gap-1", children: t.openGroups.map((j) => /* @__PURE__ */ a(ze, { variant: "secondary", children: Mr(j) }, j)) })) : t.scrollGroupId !== void 0 && (T = /* @__PURE__ */ u("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:items-center tw:gap-2", children: [
    /* @__PURE__ */ a(
      xu,
      {
        scrollGroupId: t.scrollGroupId,
        isBoundButClosed: t.isBoundButClosed
      }
    ),
    t.isBoundButClosed && n && /* @__PURE__ */ u(
      Z,
      {
        size: "sm",
        variant: "ghost",
        className: "tw:h-6 tw:gap-1 tw:px-2 tw:text-xs",
        onClick: (j) => {
          j.stopPropagation(), n(t);
        },
        onMouseDown: (j) => j.stopPropagation(),
        "aria-label": r.openButtonLabel,
        title: r.openButtonLabel,
        children: [
          /* @__PURE__ */ a(Vn, { className: "tw:h-3 tw:w-3" }),
          r.openButtonLabel
        ]
      }
    )
  ] }));
  const R = /* @__PURE__ */ u(
    ke,
    {
      ref: t.isSelected ? i : void 0,
      value: `${t.rowKey} ${t.shortName} ${t.fullName} ${t.language ?? ""} ${t.languageCode ?? ""}`,
      onSelect: () => {
        t.isDisabled || o(t);
      },
      disabled: t.isDisabled,
      onPointerEnter: v,
      onPointerLeave: D,
      className: "tw:flex tw:items-center tw:gap-2 tw:pe-4",
      "data-selected": t.isSelected,
      children: [
        /* @__PURE__ */ a("span", { className: "tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center", children: k }),
        s && /* @__PURE__ */ a("span", { className: "tw:flex tw:shrink-0 tw:items-center tw:justify-center", children: s }),
        /* @__PURE__ */ u(
          "span",
          {
            ref: c,
            className: "tw:flex tw:min-w-0 tw:flex-1 tw:flex-col tw:items-start tw:overflow-hidden tw:text-start",
            children: [
              /* @__PURE__ */ a("span", { className: "tw:w-full tw:truncate tw:font-medium", children: t.shortName }),
              t.fullName && t.fullName !== t.shortName && /* @__PURE__ */ a("span", { className: "tw:w-full tw:truncate tw:text-xs tw:text-muted-foreground", children: t.fullName })
            ]
          }
        ),
        T
      ]
    }
  ), M = t.scrollGroupId !== void 0 ? Mr(t.scrollGroupId) : void 0, I = t.isBoundButClosed && M ? r.boundButClosedTooltip.replace("{group}", M) : void 0;
  return /* @__PURE__ */ u(It, { open: b, delayDuration: 400, children: [
    /* @__PURE__ */ a(Rt, { asChild: !0, children: R }),
    /* @__PURE__ */ u(
      Dt,
      {
        side: "top",
        align: "center",
        sideOffset: 8,
        collisionPadding: 16,
        className: "tw:max-w-xs tw:text-center",
        style: { zIndex: Ji },
        children: [
          /* @__PURE__ */ a("div", { className: "tw:font-semibold", children: t.fullName }),
          g && /* @__PURE__ */ u("div", { className: "tw:text-sm", children: [
            t.language,
            t.languageCode && /* @__PURE__ */ u("span", { className: "tw:text-muted-foreground", children: [
              " (",
              t.languageCode,
              ")"
            ] })
          ] }),
          !t.isBoundButClosed && t.scrollGroupScrRefLabel && M && /* @__PURE__ */ u("div", { className: "tw:text-sm", children: [
            t.scrollGroupScrRefLabel,
            /* @__PURE__ */ u("span", { className: "tw:text-muted-foreground", children: [
              " (",
              M,
              ")"
            ] })
          ] }),
          I && /* @__PURE__ */ a("div", { className: "tw:text-sm tw:italic", children: I }),
          t.isDisabled && t.disabledReason && /* @__PURE__ */ a("div", { className: "tw:text-sm tw:italic tw:text-muted-foreground", children: t.disabledReason })
        ]
      }
    )
  ] });
}
function ku(t) {
  return t === "none" || t === "openTabs" || t === "lastUsed" || t === "language" || t === "versification" || t === "type" || t === "custom";
}
function _u(t, e) {
  switch (t) {
    case "openTabs":
      return e.filterGroupByOpenTabs;
    case "language":
      return e.filterGroupByLanguage;
    case "lastUsed":
      return e.filterGroupByLastUsed;
    case "versification":
      return e.filterGroupByVersification;
    case "type":
      return e.filterGroupByType;
    case "custom":
      return e.filterGroupByCustom;
    default:
      return t;
  }
}
function Nu({
  availableGroupings: t,
  activeGrouping: e,
  onChangeGrouping: r,
  showSelectedOnly: o,
  onChangeShowSelectedOnly: n,
  strings: i
}) {
  const s = !!o;
  return /* @__PURE__ */ u(Le, { children: [
    /* @__PURE__ */ a(Be, { asChild: !0, children: /* @__PURE__ */ a(
      Z,
      {
        variant: "ghost",
        size: "sm",
        className: m(
          "tw:h-8 tw:w-8 tw:shrink-0 tw:p-0",
          // Match shadcn Toggle's "on" styling so the funnel reads as a toggle-group button
          // that's currently pressed when a filter is active.
          s && "tw:bg-accent tw:text-accent-foreground tw:hover:bg-accent/80 tw:data-[state=open]:bg-accent"
        ),
        "aria-label": i.filterAriaLabel,
        "aria-pressed": s,
        title: i.filterAriaLabel,
        onMouseDown: (c) => c.preventDefault(),
        children: /* @__PURE__ */ a(Hn, { className: "tw:h-4 tw:w-4" })
      }
    ) }),
    /* @__PURE__ */ u(
      Ve,
      {
        align: "end",
        className: "tw:w-56",
        style: { zIndex: Ji },
        children: [
          t.length > 0 && /* @__PURE__ */ u(it, { children: [
            /* @__PURE__ */ a(or, { children: i.groupSectionLabel }),
            /* @__PURE__ */ u(
              $n,
              {
                value: e,
                onValueChange: (c) => {
                  ku(c) && r(c);
                },
                children: [
                  /* @__PURE__ */ a(Ya, { value: "none", children: i.filterGroupNone }),
                  t.map((c) => /* @__PURE__ */ a(Ya, { value: c, children: _u(c, i) }, c))
                ]
              }
            )
          ] }),
          n && /* @__PURE__ */ u(it, { children: [
            t.length > 0 && /* @__PURE__ */ a(Ye, {}),
            /* @__PURE__ */ a(or, { children: i.filterSectionLabel }),
            /* @__PURE__ */ a(
              Se,
              {
                checked: !!o,
                onCheckedChange: n,
                onSelect: (c) => c.preventDefault(),
                children: i.filterShowSelectedOnly
              }
            )
          ] })
        ]
      }
    )
  ] });
}
function Cu(t) {
  const [e, r] = N(!1), [o, n] = N(""), i = t.availableGroupings ?? vu, [s, c] = N(() => {
    if (t.defaultGrouping) {
      if (t.defaultGrouping === "none") return "none";
      if (i.includes(t.defaultGrouping)) return t.defaultGrouping;
    }
    return t.defaultGroupByOpenTabs === !1 ? "none" : i.includes("openTabs") ? "openTabs" : "none";
  }), [l, d] = N(!1), w = K(null), h = B((E) => {
    r(E), E || n("");
  }, []);
  J(() => {
    if (!e) return;
    const E = window.requestAnimationFrame(() => {
      const x = w.current;
      x && x.scrollIntoView({ block: "nearest", behavior: "auto" });
    });
    return () => window.cancelAnimationFrame(E);
  }, [e]);
  const p = mu(t.localizedStrings), g = $(() => t.mode === "project" ? Ga({
    mode: "project",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }) : t.mode === "project-multi" ? Ga({
    mode: "project-multi",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }) : Ga({
    mode: "projectScrollGroup",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }), [t.mode, t.projects, t.openTabs, t.selection]), f = $(() => {
    const E = o.trim().toLowerCase();
    let x = g;
    return E && (x = x.filter(
      (G) => G.shortName.toLowerCase().includes(E) || G.fullName.toLowerCase().includes(E) || (G.language ?? "").toLowerCase().includes(E) || (G.languageCode ?? "").toLowerCase().includes(E)
    )), t.mode === "project-multi" && l && (x = x.filter((G) => G.isSelected)), x;
  }, [g, o, t.mode, l]), b = $(
    () => new Map(t.projects.map((E) => [ve(E.id), E])),
    [t.projects]
  ), { renderProjectIndicator: v } = t, D = B(
    (E) => {
      if (!v) return;
      const x = b.get(ve(E.projectId));
      return x ? v(x) : void 0;
    },
    [v, b]
  ), k = $(() => {
    switch (s) {
      case "openTabs":
        return En(f, !0);
      case "lastUsed":
        return pu(
          f,
          p.lastUsedRecentSectionHeading,
          p.lastUsedOtherSectionHeading
        );
      case "language":
        return wu(f, p.languageUnknownSectionHeading);
      case "versification":
        return du(
          f,
          t.priorityVersificationId,
          p.versificationUnknownSectionHeading
        );
      case "type":
        return uu(f, p.typeUnknownSectionHeading);
      case "custom":
        return gu(f, t.customSections ?? [], b);
      case "none":
      default:
        return En(f, !1);
    }
  }, [
    f,
    s,
    t.customSections,
    b,
    t.priorityVersificationId,
    p.versificationUnknownSectionHeading,
    p.languageUnknownSectionHeading,
    p.lastUsedRecentSectionHeading,
    p.lastUsedOtherSectionHeading,
    p.typeUnknownSectionHeading
  ]), T = $(() => {
    if (t.mode !== "project-multi") return [];
    const E = [];
    return t.projects.forEach((x) => {
      const G = t.openTabs.filter(
        (C) => ve(C.projectId) === ve(x.id)
      );
      if (G.length === 0) {
        E.push({ projectId: x.id });
        return;
      }
      const S = /* @__PURE__ */ new Set();
      G.forEach((C) => {
        S.has(C.scrollGroupId) || (S.add(C.scrollGroupId), E.push({ projectId: x.id, scrollGroupId: C.scrollGroupId }));
      });
    }), E;
  }, [t.mode, t.projects, t.openTabs]), R = (E) => {
    if (E.scrollGroupId !== void 0) {
      if (t.mode === "projectScrollGroup") {
        t.onOpenProjectInGroup(E.projectId, E.scrollGroupId);
        return;
      }
      t.mode === "project-multi" && t.onOpenProjectInGroup && t.onOpenProjectInGroup(E.projectId, E.scrollGroupId);
    }
  }, M = (E) => {
    switch (t.mode) {
      case "project": {
        t.onChangeSelection({ projectId: E.projectId }), r(!1);
        return;
      }
      case "project-multi": {
        const x = t.selection.pairs, G = (C) => C.projectId === E.projectId && C.scrollGroupId === E.scrollGroupId, S = x.some(G) ? x.filter((C) => !G(C)) : [...x, { projectId: E.projectId, scrollGroupId: E.scrollGroupId }];
        t.onChangeSelection({ pairs: S }), S.length === 0 && l && d(!1);
        return;
      }
      case "projectScrollGroup": {
        if (E.isBoundButClosed && E.scrollGroupId !== void 0) {
          t.onOpenProjectInGroup(E.projectId, E.scrollGroupId), r(!1);
          return;
        }
        if (E.scrollGroupId !== void 0) {
          t.onChangeSelection({
            projectId: E.projectId,
            scrollGroupId: E.scrollGroupId
          }), r(!1);
          return;
        }
        const x = t.selection.scrollGroupId ?? 0;
        t.onChangeSelection({ projectId: E.projectId, scrollGroupId: x }), t.onOpenProjectInGroup(E.projectId, x), r(!1);
      }
    }
  }, I = () => {
    if (t.mode !== "project-multi") return;
    const E = t.selection.pairs, x = new Set(E.map((S) => `${S.projectId}:${S.scrollGroupId ?? ""}`)), G = [...E];
    T.forEach((S) => {
      const C = `${S.projectId}:${S.scrollGroupId ?? ""}`;
      x.has(C) || (x.add(C), G.push(S));
    }), t.onChangeSelection({ pairs: G });
  }, j = () => {
    t.mode === "project-multi" && (t.onChangeSelection({ pairs: [] }), l && d(!1));
  }, P = $(() => {
    switch (t.mode) {
      case "project": {
        const E = t.projects.find((G) => G.id === t.selection.projectId);
        let x = E ? E.shortName : t.buttonPlaceholder ?? "";
        return E && t.triggerLabelFormat === "shortNameAndFullName" && E.fullName && E.fullName !== E.shortName && (x = `${E.shortName} - ${E.fullName}`), { node: x, title: x };
      }
      case "project-multi": {
        const { pairs: E } = t.selection;
        if (E.length === 0) {
          const C = t.buttonPlaceholder ?? "";
          return { node: C, title: C };
        }
        const x = [];
        if (E.forEach((C) => {
          const U = t.projects.find((ot) => ot.id === C.projectId);
          U && x.push({ project: U, scrollGroupId: C.scrollGroupId });
        }), x.length === 0) {
          const C = t.buttonPlaceholder ?? "";
          return { node: C, title: C };
        }
        if (t.getSelectedText) {
          const C = t.getSelectedText(x);
          return { node: C, title: C };
        }
        const G = x.map(
          ({ project: C, scrollGroupId: U }) => U === void 0 ? C.shortName : `${C.shortName} (${Mr(U)})`
        ).join(", ");
        if (x.length === 1) return { node: G, title: G };
        const S = x.length.toString();
        return {
          node: /* @__PURE__ */ u(it, { children: [
            /* @__PURE__ */ a(ze, { variant: "muted", className: "tw:shrink-0", children: S }),
            /* @__PURE__ */ a("span", { className: "tw:min-w-0 tw:truncate", children: G })
          ] }),
          title: `${S} ${G}`
        };
      }
      case "projectScrollGroup": {
        const E = t.projects.find((S) => S.id === t.selection.projectId);
        if (!E) {
          const S = t.buttonPlaceholder ?? "";
          return { node: S, title: S };
        }
        const x = t.selection.scrollGroupId;
        if (x === void 0)
          return { node: E.shortName, title: E.shortName };
        const G = `${E.shortName} · ${Mr(x)}`;
        return { node: G, title: G };
      }
      default:
        return { node: "", title: "" };
    }
  }, [t]);
  let O;
  t.isLoading ? O = /* @__PURE__ */ a(ac, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:animate-spin tw:opacity-50" }) : t.hideTriggerChevron ? O = void 0 : t.mode === "project-multi" ? O = /* @__PURE__ */ a(Wn, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" }) : O = /* @__PURE__ */ a(nr, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" });
  const q = t.mode === "projectScrollGroup" || t.mode === "project-multi" && t.onOpenProjectInGroup ? R : void 0, W = /* @__PURE__ */ u(
    Z,
    {
      variant: t.buttonVariant ?? "outline",
      role: "combobox",
      "aria-expanded": e,
      "aria-label": t.ariaLabel,
      disabled: (t.isDisabled ?? !1) || (t.isLoading ?? !1),
      className: m(
        "tw:flex tw:w-[180px] tw:items-center tw:justify-between tw:overflow-hidden",
        t.buttonClassName
      ),
      children: [
        /* @__PURE__ */ a("span", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-baseline tw:gap-2 tw:overflow-hidden tw:whitespace-nowrap tw:text-start", children: typeof P.node == "string" ? /* @__PURE__ */ a("span", { className: "tw:min-w-0 tw:truncate", children: P.node }) : P.node }),
        O
      ]
    }
  ), F = P.title ? /* @__PURE__ */ a(St, { delayDuration: 400, children: /* @__PURE__ */ u(It, { children: [
    /* @__PURE__ */ a(Rt, { asChild: !0, children: /* @__PURE__ */ a(De, { asChild: !0, children: W }) }),
    /* @__PURE__ */ a(Dt, { children: P.title })
  ] }) }) : /* @__PURE__ */ a(De, { asChild: !0, children: W });
  return /* @__PURE__ */ u(Pe, { open: e, onOpenChange: h, children: [
    F,
    /* @__PURE__ */ a(
      $e,
      {
        align: t.alignDropDown ?? "start",
        collisionPadding: 16,
        className: m("tw:w-80 tw:max-w-[calc(100vw-2rem)] tw:p-0", t.popoverContentClassName),
        style: t.popoverContentStyle,
        children: /* @__PURE__ */ a(St, { delayDuration: 400, children: /* @__PURE__ */ u(Ae, { shouldFilter: !1, children: [
          /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:border-b tw:pe-2", children: [
            /* @__PURE__ */ a("div", { className: "tw:flex-1", children: /* @__PURE__ */ a(
              Pr,
              {
                value: o,
                onValueChange: n,
                placeholder: p.searchPlaceholder,
                className: "tw:border-0",
                spaceSelectsHighlightedItem: !0
              }
            ) }),
            !t.hideFilterMenu && (i.length > 0 || t.mode === "project-multi") && /* @__PURE__ */ a(
              Nu,
              {
                availableGroupings: i,
                activeGrouping: s,
                onChangeGrouping: c,
                showSelectedOnly: t.mode === "project-multi" ? l : void 0,
                onChangeShowSelectedOnly: t.mode === "project-multi" ? d : void 0,
                strings: p
              }
            )
          ] }),
          t.mode === "project-multi" && /* @__PURE__ */ u("div", { className: "tw:flex tw:justify-between tw:border-b tw:py-2 tw:pe-4 tw:ps-2", children: [
            /* @__PURE__ */ a(Z, { variant: "ghost", size: "sm", onClick: I, children: `${p.selectAll} (${T.length.toString()})` }),
            /* @__PURE__ */ a(Z, { variant: "ghost", size: "sm", onClick: j, children: `${p.clearAll} (${t.selection.pairs.length.toString()})` })
          ] }),
          /* @__PURE__ */ u(je, { children: [
            /* @__PURE__ */ a($r, { children: t.commandEmptyMessage ?? "No projects found" }),
            k.map((E, x) => (
              // Grouping schemes emit several sections of the same `kind`, so the key needs more
              // than that: custom sections carry an explicit `id`, and the rest are distinguished
              // by their heading label.
              /* @__PURE__ */ u(Lr, { children: [
                /* @__PURE__ */ a(be, { heading: Eu(E, p), children: E.rows.map((G) => /* @__PURE__ */ a(
                  yu,
                  {
                    row: G,
                    mode: t.mode,
                    strings: p,
                    onClick: M,
                    onOpen: q,
                    selectedRowRef: w,
                    indicator: D(G)
                  },
                  G.rowKey
                )) }),
                x < k.length - 1 && /* @__PURE__ */ a(yo, {})
              ] }, E.id ?? `${E.kind}:${E.label ?? ""}`)
            ))
          ] })
        ] }) })
      }
    )
  ] });
}
function Eu(t, e) {
  switch (t.kind) {
    case "openTabs":
      return e.openTabsSectionHeading;
    case "other":
      return e.otherProjectsSectionHeading;
    case "versification":
    case "language":
    case "type":
    case "lastUsed":
    case "custom":
      return t.label;
    case "flat":
    default:
      return;
  }
}
const Tu = "16rem", Su = "3rem", Zi = Yt.createContext(void 0);
function ba() {
  const t = Yt.useContext(Zi);
  if (!t)
    throw new Error("useSidebar must be used within a SidebarProvider.");
  return t;
}
function Iu({
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
  const [l, d] = Yt.useState(t), w = e ?? l, h = Yt.useCallback(
    (T) => {
      const R = typeof T == "function" ? T(w) : T;
      r ? r(R) : d(R);
    },
    [r, w]
  ), p = Yt.useCallback(() => h((T) => !T), [h]), g = w ? "expanded" : "collapsed", v = _e() === "ltr" ? s : s === "primary" ? "secondary" : "primary", D = Yt.useMemo(
    () => ({
      state: g,
      open: w,
      setOpen: h,
      toggleSidebar: p,
      // CUSTOM: Passes direction-aware side into context so SidebarTrigger icon and Sidebar
      // positioning both respond correctly in RTL layouts
      side: v
    }),
    [g, w, h, p, v]
  ), k = {
    "--sidebar-width": Tu,
    "--sidebar-width-icon": Su,
    ...n
  };
  return /* @__PURE__ */ a(Zi.Provider, { value: D, children: /* @__PURE__ */ a(
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
      children: i
    }
  ) });
}
function Ru({
  // CUSTOM: Removed 'side' prop from Sidebar - it is now read from context (moved to SidebarProvider)
  variant: t = "sidebar",
  collapsible: e = "offcanvas",
  className: r,
  children: o,
  ...n
}) {
  const i = ba();
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
function zh({ className: t, onClick: e, ...r }) {
  const { toggleSidebar: o, side: n } = ba();
  return /* @__PURE__ */ u(
    Z,
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
        n === "primary" ? /* @__PURE__ */ a(Cc, {}) : /* @__PURE__ */ a(Ec, {}),
        /* @__PURE__ */ a("span", { className: "tw:sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
}
function Oh({ className: t, ...e }) {
  const { toggleSidebar: r } = ba();
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
function Du({ className: t, ...e }) {
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
function Mh({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    pa,
    {
      "data-slot": "sidebar-input",
      "data-sidebar": "input",
      className: m("tw:h-8 tw:w-full tw:bg-background tw:shadow-none", t),
      ...e
    }
  );
}
function Ph({ className: t, ...e }) {
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
function $h({ className: t, ...e }) {
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
function Ah({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    Dr,
    {
      "data-slot": "sidebar-separator",
      "data-sidebar": "separator",
      className: m("tw:mx-2 tw:w-auto tw:bg-sidebar-border", t),
      ...e
    }
  );
}
function zu({ className: t, ...e }) {
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
function Tn({ className: t, ...e }) {
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
function Sn({
  className: t,
  asChild: e = !1,
  ...r
}) {
  const o = e ? Vr.Root : "div";
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
function jh({
  className: t,
  asChild: e = !1,
  ...r
}) {
  const o = e ? Vr.Root : "button";
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
function In({ className: t, ...e }) {
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
function Ou({ className: t, ...e }) {
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
function Mu({ className: t, ...e }) {
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
const Pu = gi(
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
function $u({
  asChild: t = !1,
  isActive: e = !1,
  variant: r = "default",
  size: o = "default",
  tooltip: n,
  className: i,
  ...s
}) {
  const c = t ? Vr.Root : "button", { state: l } = ba(), d = /* @__PURE__ */ a(
    c,
    {
      "data-slot": "sidebar-menu-button",
      "data-sidebar": "menu-button",
      "data-size": o,
      "data-active": e,
      className: m(Pu({ variant: r, size: o }), i),
      ...s
    }
  );
  return n ? /* @__PURE__ */ u(It, { children: [
    /* @__PURE__ */ a(Rt, { asChild: !0, children: d }),
    /* @__PURE__ */ a(
      Dt,
      {
        side: "right",
        align: "center",
        hidden: l !== "collapsed",
        ...typeof n == "string" ? { children: n } : n
      }
    )
  ] }) : d;
}
function Lh({
  className: t,
  asChild: e = !1,
  showOnHover: r = !1,
  ...o
}) {
  const n = e ? Vr.Root : "button";
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
function Bh({ className: t, ...e }) {
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
function Vh({
  className: t,
  showIcon: e = !1,
  ...r
}) {
  const [o] = Yt.useState(() => `${Math.floor(Math.random() * 40) + 50}%`), n = { "--skeleton-width": o };
  return /* @__PURE__ */ u(
    "div",
    {
      "data-slot": "sidebar-menu-skeleton",
      "data-sidebar": "menu-skeleton",
      className: m("tw:flex tw:h-8 tw:items-center tw:gap-2 tw:rounded-md tw:px-2", t),
      ...r,
      children: [
        e && /* @__PURE__ */ a(wr, { className: "tw:size-4 tw:rounded-md", "data-sidebar": "menu-skeleton-icon" }),
        /* @__PURE__ */ a(
          wr,
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
function Gh({ className: t, ...e }) {
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
function Fh({ className: t, ...e }) {
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
function Uh({
  asChild: t = !1,
  size: e = "md",
  isActive: r = !1,
  className: o,
  ...n
}) {
  const i = t ? Vr.Root : "a";
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
function Au({
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
  const d = B(
    (g, f) => {
      o(g, f);
    },
    [o]
  ), w = B(
    (g) => {
      const f = r.find((b) => b.projectId === g);
      return f ? f.projectName : g;
    },
    [r]
  ), h = $(
    () => r.map((g) => ({
      id: g.projectId,
      shortName: g.projectName,
      fullName: g.projectName
    })),
    [r]
  ), p = B(
    (g) => !n.projectId && g === n.label,
    [n]
  );
  return /* @__PURE__ */ a(
    Ru,
    {
      id: t,
      collapsible: "none",
      variant: "inset",
      className: m("tw:w-96 tw:gap-2 tw:overflow-y-auto", l),
      children: /* @__PURE__ */ u(zu, { children: [
        /* @__PURE__ */ u(Tn, { children: [
          /* @__PURE__ */ a(Sn, { className: "tw:text-sm", children: i }),
          /* @__PURE__ */ a(In, { children: /* @__PURE__ */ a(Ou, { children: Object.entries(e).map(([g, f]) => /* @__PURE__ */ a(Mu, { children: /* @__PURE__ */ a(
            $u,
            {
              onClick: () => d(g),
              isActive: p(g),
              children: /* @__PURE__ */ a("span", { className: "tw:pl-3", children: f })
            }
          ) }, g)) }) })
        ] }),
        /* @__PURE__ */ u(Tn, { children: [
          /* @__PURE__ */ a(Sn, { className: "tw:text-sm", children: s }),
          /* @__PURE__ */ a(In, { className: "tw:pl-3", children: /* @__PURE__ */ u(
            "div",
            {
              className: m(
                "tw:flex tw:w-full tw:items-center tw:gap-2 tw:rounded-md tw:px-2 tw:py-1",
                {
                  "tw:bg-sidebar-accent tw:text-sidebar-accent-foreground": n == null ? void 0 : n.projectId
                }
              ),
              children: [
                /* @__PURE__ */ a(oc, { className: "tw:h-4 tw:w-4 tw:shrink-0" }),
                /* @__PURE__ */ a(
                  Cu,
                  {
                    mode: "project",
                    projects: h,
                    openTabs: [],
                    availableGroupings: ["openTabs"],
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
                    popoverContentStyle: { zIndex: _s }
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
function Hh({
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
      jn,
      {
        className: "tw:w-9/12",
        value: s,
        onSearch: c,
        placeholder: "Search app settings, extension settings, and project settings"
      }
    ) }),
    /* @__PURE__ */ u(
      Iu,
      {
        id: t,
        className: "tw:h-full tw:flex-1 tw:gap-4 tw:overflow-auto tw:border-t",
        children: [
          /* @__PURE__ */ a(
            Au,
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
          /* @__PURE__ */ a(Du, { className: "tw:min-w-[215px]", children: o })
        ]
      }
    )
  ] });
}
const He = "scrBook", ju = "scrRef", rr = "source", Lu = "details", Bu = "Scripture Reference", Vu = "Scripture Book", Qi = "Type", Gu = "Details";
function Fu(t, e) {
  const r = e ?? !1;
  return [
    {
      accessorFn: (o) => `${o.start.book} ${o.start.chapterNum}:${o.start.verseNum}`,
      id: He,
      header: (t == null ? void 0 : t.scriptureReferenceColumnName) ?? Bu,
      cell: (o) => {
        const n = o.row.original;
        return o.row.getIsGrouped() ? Pt.bookIdToEnglishName(n.start.book) : o.row.groupingColumnId === He ? Ie(n.start) : void 0;
      },
      getGroupingValue: (o) => Pt.bookIdToNumber(o.start.book),
      sortingFn: (o, n) => to(o.original.start, n.original.start),
      enableGrouping: !0
    },
    {
      accessorFn: (o) => Ie(o.start),
      id: ju,
      header: void 0,
      cell: (o) => {
        const n = o.row.original;
        return o.row.getIsGrouped() ? void 0 : Ie(n.start);
      },
      sortingFn: (o, n) => to(o.original.start, n.original.start),
      enableGrouping: !1
    },
    {
      accessorFn: (o) => o.source.displayName,
      id: rr,
      header: r ? (t == null ? void 0 : t.typeColumnName) ?? Qi : void 0,
      cell: (o) => r || o.row.getIsGrouped() ? o.getValue() : void 0,
      getGroupingValue: (o) => o.source.id,
      sortingFn: (o, n) => o.original.source.displayName.localeCompare(n.original.source.displayName),
      enableGrouping: !0
    },
    {
      accessorFn: (o) => o.detail,
      id: Lu,
      header: (t == null ? void 0 : t.detailsColumnName) ?? Gu,
      cell: (o) => o.getValue(),
      enableGrouping: !1
    }
  ];
}
const Uu = (t) => {
  if (!("offset" in t.start))
    throw new Error("No offset available in range start");
  if (t.end && !("offset" in t.end))
    throw new Error("No offset available in range end");
  const { offset: e } = t.start;
  let r = 0;
  return t.end && ({ offset: r } = t.end), !t.end || to(t.start, t.end) === 0 ? `${Ia(t.start)}+${e}` : `${Ia(t.start)}+${e}-${Ia(t.end)}+${r}`;
}, Rn = (t) => `${Uu({ start: t.start, end: t.end })} ${t.source.displayName} ${t.detail}`;
function Kh({
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
  const [d, w] = N([]), [h, p] = N([{ id: He, desc: !1 }]), [g, f] = N({}), b = $(
    () => t.flatMap((O) => O.data.map((q) => ({
      ...q,
      source: O.source
    }))),
    [t]
  ), v = $(
    () => Fu(
      {
        scriptureReferenceColumnName: o,
        typeColumnName: i,
        detailsColumnName: s
      },
      r
    ),
    [o, i, s, r]
  );
  J(() => {
    d.includes(rr) ? p([
      { id: rr, desc: !1 },
      { id: He, desc: !1 }
    ]) : p([{ id: He, desc: !1 }]);
  }, [d]);
  const D = ui({
    data: b,
    columns: v,
    state: {
      grouping: d,
      sorting: h,
      rowSelection: g
    },
    onGroupingChange: w,
    onSortingChange: p,
    onRowSelectionChange: f,
    getExpandedRowModel: Rl(),
    getGroupedRowModel: Il(),
    getCoreRowModel: hi(),
    getSortedRowModel: pi(),
    getRowId: Rn,
    autoResetExpanded: !1,
    enableMultiRowSelection: !1,
    enableSubRowSelection: !1
  });
  J(() => {
    if (c) {
      const O = D.getSelectedRowModel().rowsById, q = Object.keys(O);
      if (q.length === 1) {
        const W = b.find((F) => Rn(F) === q[0]) || void 0;
        W && c(W);
      }
    }
  }, [g, b, c, D]);
  const k = n ?? Vu, T = i ?? Qi, R = [
    { label: "No Grouping", value: [] },
    { label: `Group by ${k}`, value: [He] },
    { label: `Group by ${T}`, value: [rr] },
    {
      label: `Group by ${k} and ${T}`,
      value: [He, rr]
    },
    {
      label: `Group by ${T} and ${k}`,
      value: [rr, He]
    }
  ], M = (O) => {
    w(JSON.parse(O));
  }, I = (O, q) => {
    !O.getIsGrouped() && !O.getIsSelected() && O.getToggleSelectedHandler()(q);
  }, j = (O, q) => O.getIsGrouped() ? "" : m("banded-row", q % 2 === 0 ? "even" : "odd"), P = (O, q, W) => {
    if (!((O == null ? void 0 : O.length) === 0 || q.depth < W.column.getGroupedIndex())) {
      if (q.getIsGrouped())
        switch (q.depth) {
          case 1:
            return "tw:ps-4";
          default:
            return;
        }
      switch (q.depth) {
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
      fr,
      {
        value: JSON.stringify(d),
        onValueChange: (O) => {
          M(O);
        },
        children: [
          /* @__PURE__ */ a(vr, { className: "tw:mb-1 tw:mt-2", children: /* @__PURE__ */ a(mr, {}) }),
          /* @__PURE__ */ a(br, { position: "item-aligned", children: /* @__PURE__ */ a(Tw, { children: R.map((O) => /* @__PURE__ */ a(le, { value: JSON.stringify(O.value), children: O.label }, O.label)) }) })
        ]
      }
    ),
    /* @__PURE__ */ u(vo, { className: "tw:relative tw:flex tw:flex-col tw:overflow-y-auto tw:p-0", children: [
      e && /* @__PURE__ */ a(bo, { children: D.getHeaderGroups().map((O) => /* @__PURE__ */ a(Ke, { children: O.headers.filter((q) => q.column.columnDef.header).map((q) => (
        /* For sticky column headers to work, we probably need to change the default definition of the shadcn Table component. See https://github.com/shadcn-ui/ui/issues/1151 */
        /* @__PURE__ */ a(ia, { colSpan: q.colSpan, className: "tw:sticky top-0", children: q.isPlaceholder ? void 0 : /* @__PURE__ */ u("div", { children: [
          q.column.getCanGroup() ? /* @__PURE__ */ a(
            Z,
            {
              variant: "ghost",
              title: `Toggle grouping by ${q.column.columnDef.header}`,
              onClick: q.column.getToggleGroupingHandler(),
              type: "button",
              children: q.column.getIsGrouped() ? "🛑" : "👊 "
            }
          ) : void 0,
          " ",
          Sr(q.column.columnDef.header, q.getContext())
        ] }) }, q.id)
      )) }, O.id)) }),
      /* @__PURE__ */ a(xo, { children: D.getRowModel().rows.map((O, q) => {
        const W = _e();
        return /* @__PURE__ */ a(
          Ke,
          {
            "data-state": O.getIsSelected() ? "selected" : "",
            className: m(j(O, q)),
            onClick: (F) => I(O, F),
            children: O.getVisibleCells().map((F) => {
              if (!(F.getIsPlaceholder() || F.column.columnDef.enableGrouping && !F.getIsGrouped() && (F.column.columnDef.id !== rr || !r)))
                return /* @__PURE__ */ a(
                  ur,
                  {
                    className: m(
                      F.column.columnDef.id,
                      "tw:p-[1px]",
                      P(d, O, F)
                    ),
                    children: F.getIsGrouped() ? /* @__PURE__ */ u(
                      Z,
                      {
                        variant: "link",
                        onClick: O.getToggleExpandedHandler(),
                        type: "button",
                        children: [
                          O.getIsExpanded() && /* @__PURE__ */ a(nr, {}),
                          !O.getIsExpanded() && (W === "ltr" ? /* @__PURE__ */ a(Ja, {}) : /* @__PURE__ */ a(Xa, {})),
                          " ",
                          Sr(F.column.columnDef.cell, F.getContext()),
                          " (",
                          O.subRows.length,
                          ")"
                        ]
                      }
                    ) : Sr(F.column.columnDef.cell, F.getContext())
                  },
                  F.id
                );
            })
          },
          O.id
        );
      }) })
    ] })
  ] });
}
function Hu({
  availableBookInfo: t,
  selectedBookIds: e,
  onChangeSelectedBookIds: r,
  localizedStrings: o,
  localizedBookNames: n,
  disabledSectionExplanations: i
}) {
  const s = o["%webView_book_selector_books_selected%"], c = o["%webView_book_selector_select_books%"], l = o["%webView_book_selector_search_books%"], d = o["%webView_book_selector_select_all%"], w = o["%webView_book_selector_clear_all%"], h = o["%webView_book_selector_no_book_found%"], { otLong: p, ntLong: g, dcLong: f, extraLong: b } = {
    otLong: o == null ? void 0 : o["%scripture_section_ot_long%"],
    ntLong: o == null ? void 0 : o["%scripture_section_nt_long%"],
    dcLong: o == null ? void 0 : o["%scripture_section_dc_long%"],
    extraLong: o == null ? void 0 : o["%scripture_section_extra_long%"]
  }, [v, D] = N(!1), [k, T] = N(""), R = K(void 0), M = K(!1), I = $(
    () => Ln(t),
    [t]
  ), j = $(() => {
    if (!k.trim()) {
      const S = {
        [Et.OT]: [],
        [Et.NT]: [],
        [Et.DC]: [],
        [Et.Extra]: []
      };
      return I.forEach((C) => {
        const U = Zr(C);
        S[U].push(C);
      }), S;
    }
    const x = I.filter(
      (S) => ho(S, k, n)
    ), G = {
      [Et.OT]: [],
      [Et.NT]: [],
      [Et.DC]: [],
      [Et.Extra]: []
    };
    return x.forEach((S) => {
      const C = Zr(S);
      G[C].push(S);
    }), G;
  }, [I, k, n]), P = B(
    (x, G = !1) => {
      if (!G || !R.current) {
        r(
          e.includes(x) ? e.filter((ut) => ut !== x) : [...e, x]
        ), R.current = x;
        return;
      }
      const S = I.findIndex((ut) => ut === R.current), C = I.findIndex((ut) => ut === x);
      if (S === -1 || C === -1) return;
      const [U, ot] = [
        Math.min(S, C),
        Math.max(S, C)
      ], nt = I.slice(U, ot + 1).map((ut) => ut);
      r(
        e.includes(x) ? e.filter((ut) => !nt.includes(ut)) : [.../* @__PURE__ */ new Set([...e, ...nt])]
      );
    },
    [e, r, I]
  ), O = (x) => {
    P(x, M.current), M.current = !1;
  }, q = (x, G) => {
    x.preventDefault(), P(G, x.shiftKey);
  }, W = () => {
    r(I.map((x) => x));
  }, F = () => {
    r([]);
  }, E = $(
    () => Object.values(Et).filter(
      (x) => (i == null ? void 0 : i[x]) !== void 0 && ko(I, x).length === 0
    ).map((x) => ({ section: x, explanation: i == null ? void 0 : i[x] })),
    [i, I]
  );
  return /* @__PURE__ */ u(
    Pe,
    {
      open: v,
      onOpenChange: (x) => {
        D(x), x || T("");
      },
      children: [
        /* @__PURE__ */ a(De, { asChild: !0, children: /* @__PURE__ */ u(
          Z,
          {
            variant: "outline",
            role: "combobox",
            "aria-expanded": v,
            className: "tw:max-w-64 tw:justify-between",
            children: [
              e.length > 0 ? `${s}: ${e.length}` : c,
              /* @__PURE__ */ a(Wn, { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
            ]
          }
        ) }),
        /* @__PURE__ */ a(
          $e,
          {
            className: "tw:max-h-(--radix-popover-content-available-height) tw:w-[500px] tw:max-w-[calc(100vw-2rem)] tw:p-0",
            align: "start",
            collisionPadding: 8,
            children: /* @__PURE__ */ u(
              Ae,
              {
                className: "tw:min-h-0",
                shouldFilter: !1,
                onKeyDown: (x) => {
                  x.key === "Enter" && (M.current = x.shiftKey);
                },
                children: [
                  /* @__PURE__ */ a(
                    Pr,
                    {
                      className: "tw:shrink-0",
                      placeholder: l,
                      value: k,
                      onValueChange: T,
                      spaceSelectsHighlightedItem: !0
                    }
                  ),
                  /* @__PURE__ */ u("div", { className: "tw:flex tw:shrink-0 tw:justify-between tw:border-b tw:p-2", children: [
                    /* @__PURE__ */ a(
                      Z,
                      {
                        variant: "ghost",
                        size: "sm",
                        onClick: W,
                        disabled: I.length === 0,
                        children: d
                      }
                    ),
                    /* @__PURE__ */ a(Z, { variant: "ghost", size: "sm", onClick: F, children: w })
                  ] }),
                  /* @__PURE__ */ u(je, { className: "tw:max-h-72 tw:min-h-0 tw:flex-1", children: [
                    /* @__PURE__ */ a($r, { children: h }),
                    Object.values(Et).filter((x) => j[x].length > 0).map((x, G) => {
                      const S = j[x];
                      return /* @__PURE__ */ u(Lr, { children: [
                        G > 0 && /* @__PURE__ */ a(yo, { alwaysRender: !0 }),
                        /* @__PURE__ */ a(
                          be,
                          {
                            heading: zn(x, p, g, f, b),
                            children: S.map((C) => /* @__PURE__ */ a(
                              fi,
                              {
                                bookId: C,
                                isSelected: e.includes(C),
                                onSelect: () => O(C),
                                onMouseDown: (U) => q(U, C),
                                section: Zr(C),
                                showCheck: !0,
                                localizedBookNames: n,
                                commandValue: bi(C, n),
                                className: "tw:flex tw:items-center"
                              },
                              C
                            ))
                          }
                        )
                      ] }, x);
                    })
                  ] }),
                  E.length > 0 && /* @__PURE__ */ a("div", { className: "tw:shrink-0 tw:border-t tw:p-2", children: E.map(({ section: x, explanation: G }) => /* @__PURE__ */ a("p", { className: "tw:text-xs tw:text-muted-foreground", children: G }, x)) })
                ]
              }
            )
          }
        )
      ]
    }
  );
}
function Ku({
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
function qu({
  disabled: t,
  tooltipText: e,
  children: r,
  className: o
}) {
  return /* @__PURE__ */ a(St, { children: /* @__PURE__ */ u(It, { children: [
    /* @__PURE__ */ a(Rt, { asChild: !0, children: /* @__PURE__ */ a(
      Ku,
      {
        className: o,
        isDisabled: t,
        disabledExplanation: e,
        children: r
      }
    ) }),
    t && /* @__PURE__ */ a(Dt, { children: /* @__PURE__ */ a("p", { className: "tw:max-w-xs tw:whitespace-pre-line", children: e }) })
  ] }) });
}
function Yu({
  section: t,
  availableBookIds: e,
  selectedBookIds: r,
  onToggle: o,
  localizedStrings: n,
  disabledExplanation: i
}) {
  const s = ko(e, t).length === 0, c = n["%scripture_section_ot_short%"], l = n["%scripture_section_nt_short%"], d = n["%scripture_section_dc_short%"], w = n["%scripture_section_extra_short%"], h = /* @__PURE__ */ a(
    Z,
    {
      variant: "outline",
      size: "sm",
      onClick: () => o(t),
      className: m(
        Bn(e, t, r) && !s && "tw:bg-primary tw:text-primary-foreground tw:hover:bg-primary/70 tw:hover:text-primary-foreground"
      ),
      disabled: s,
      children: Ns(
        t,
        c,
        l,
        d,
        w
      )
    }
  );
  return i ? /* @__PURE__ */ a(
    qu,
    {
      className: "tw:flex",
      disabled: s,
      tooltipText: i,
      children: h
    }
  ) : h;
}
const Dn = 5, Fa = 6;
function Wu({
  availableBookInfo: t,
  selectedBookIds: e,
  onChangeSelectedBookIds: r,
  localizedStrings: o,
  localizedBookNames: n,
  disabledSectionExplanations: i
}) {
  const s = o["%webView_book_selector_more%"], c = $(
    () => Ln(t),
    [t]
  ), l = B(
    (d) => {
      const w = ko(c, d).map((h) => h);
      r(
        Bn(c, d, e) ? e.filter((h) => !w.includes(h)) : [.../* @__PURE__ */ new Set([...e, ...w])]
      );
    },
    [e, r, c]
  );
  return /* @__PURE__ */ u("div", { className: "tw:space-y-2", children: [
    /* @__PURE__ */ a("div", { className: "tw:flex tw:flex-wrap tw:gap-2", children: Object.values(Et).map((d) => /* @__PURE__ */ a(
      Yu,
      {
        section: d,
        availableBookIds: c,
        selectedBookIds: e,
        onToggle: l,
        localizedStrings: o,
        disabledExplanation: i == null ? void 0 : i[d]
      },
      d
    )) }),
    /* @__PURE__ */ a(
      Hu,
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
        e.length === Fa ? Fa : Dn
      ).map((d) => /* @__PURE__ */ a(ze, { className: "tw:hover:bg-secondary", variant: "secondary", children: fe(d, n) }, d)),
      e.length > Fa && /* @__PURE__ */ a(
        ze,
        {
          className: "tw:hover:bg-secondary",
          variant: "secondary",
          children: `+${e.length - Dn} ${s}`
        }
      )
    ] })
  ] });
}
const Xu = Object.freeze([
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
]), qh = Object.freeze([
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
  ...Xu
]), Mt = (t, e) => t[e] ?? e, Ju = Object.freeze([" ", "-"]);
function Yh({
  scope: t,
  availableScopes: e,
  onScopeChange: r,
  availableBookInfo: o,
  selectedBookIds: n,
  onSelectedBookIdsChange: i,
  localizedStrings: s,
  localizedBookNames: c,
  disabledSectionExplanations: l,
  id: d,
  variant: w = "radio",
  rangeStart: h,
  rangeEnd: p,
  onRangeStartChange: g,
  onRangeEndChange: f,
  currentScrRef: b,
  onCurrentScrRefChange: v,
  bookChapterControlLocalizedStrings: D,
  getEndVerse: k,
  hideLabel: T = !1,
  buttonClassName: R
}) {
  const M = Mt(
    s,
    "%webView_scope_selector_selected_text%"
  ), I = Mt(s, "%webView_scope_selector_verse%"), j = Mt(s, "%webView_scope_selector_chapter%"), P = Mt(s, "%webView_scope_selector_book%"), O = Mt(
    s,
    "%webView_scope_selector_current_verse%"
  ), q = Mt(
    s,
    "%webView_scope_selector_current_chapter%"
  ), W = Mt(s, "%webView_scope_selector_current_book%"), F = Mt(s, "%webView_scope_selector_choose_books%"), E = Mt(s, "%webView_scope_selector_scope%"), x = Mt(s, "%webView_scope_selector_select_books%"), G = Mt(s, "%webView_scope_selector_range%"), S = Mt(s, "%webView_scope_selector_select_range%"), C = Mt(s, "%webView_scope_selector_range_start%"), U = Mt(s, "%webView_scope_selector_range_end%"), ot = Mt(s, "%webView_scope_selector_ok%"), nt = Mt(s, "%webView_scope_selector_cancel%"), ut = Mt(s, "%webView_scope_selector_navigate%"), Bt = (V) => {
    if (!b) return;
    const tt = b.book.toUpperCase();
    switch (V) {
      case "verse":
        return Ie(b, "id");
      case "chapter":
        return `${tt} ${b.chapterNum}`;
      case "book":
        return tt;
      default:
        return;
    }
  }, Q = [
    { value: "selectedText", label: M, id: "scope-selected-text" },
    {
      value: "verse",
      label: I,
      dropdownLabel: O,
      scrRefSuffix: Bt("verse"),
      id: "scope-verse"
    },
    {
      value: "chapter",
      label: j,
      dropdownLabel: q,
      scrRefSuffix: Bt("chapter"),
      id: "scope-chapter"
    },
    {
      value: "book",
      label: P,
      dropdownLabel: W,
      scrRefSuffix: Bt("book"),
      id: "scope-book"
    },
    { value: "selectedBooks", label: F, id: "scope-selected" },
    { value: "range", label: G, id: "scope-range" }
  ], ct = (V, tt, dt = !1) => /* @__PURE__ */ u(it, { children: [
    V,
    tt && !dt && /* @__PURE__ */ u("span", { className: "tw:text-muted-foreground", children: [
      ": ",
      tt
    ] })
  ] }), ft = e ? Q.filter((V) => e.includes(V.value)) : Q, mt = b ?? Ra, vt = h ?? mt, _t = p ?? mt, ht = () => {
  }, Vt = K(null), ae = K(null), zt = K(!1), Gt = K(null), gt = K(!1), [Xt, xt] = N(void 0), Nt = K(!1), At = K(!1), Jt = K(null), ue = B((V) => {
    if (V) {
      xt("start"), Nt.current = !1;
      return;
    }
    xt((tt) => tt === "start" ? void 0 : tt), Nt.current && (Nt.current = !1, requestAnimationFrame(() => {
      var dt;
      const tt = (dt = Vt.current) == null ? void 0 : dt.querySelector("button");
      tt == null || tt.click();
    }));
  }, []), Zt = B((V) => {
    if (V) {
      xt("end"), At.current = !1;
      return;
    }
    xt((tt) => tt === "end" ? void 0 : tt);
  }, []), Ge = B(
    (V) => {
      g == null || g(V), f == null || f(V), Nt.current = !0;
    },
    [g, f]
  ), ne = B(
    (V) => {
      f == null || f(V), At.current = !0;
    },
    [f]
  ), L = B(
    (V) => {
      r(V), V === "selectedBooks" && n.length === 0 && (b != null && b.book) && i([b.book]);
    },
    [r, n, b, i]
  ), Ft = ft.find((V) => V.value === t), yt = () => t === "selectedBooks" && n.length > 0 ? n.map((V) => V.toUpperCase()).join(", ") : t === "range" ? vc(vt, _t, {
    optionOrLocalizedBookName: "id",
    endRefOptionOrLocalizedBookName: "id",
    repeatBookName: !0
  }) : Ft ? ct(Ft.label, Ft.scrRefSuffix) : t, ce = ft.filter(
    (V) => V.value !== "selectedBooks" && V.value !== "range"
  ), Qt = ft.find((V) => V.value === "selectedBooks"), Ut = ft.find((V) => V.value === "range"), [pe, Ee] = N(!1), [z, H] = N(void 0), [X, y] = N(void 0), [Y, A] = N(void 0), [et, lt] = N(void 0), [pt, Ct] = N([]), Ot = w === "dropdown" && z === "selectedBooks", jt = /* @__PURE__ */ a(
    Wu,
    {
      availableBookInfo: o,
      selectedBookIds: Ot ? pt : n,
      onChangeSelectedBookIds: Ot ? Ct : i,
      localizedStrings: s,
      localizedBookNames: c,
      disabledSectionExplanations: l
    }
  ), oe = Xt === "end", Gr = Xt === "start", Ze = "tw:text-muted-foreground", Fe = w === "dropdown" && z === "range", Fr = Fe ? A : Ge, ya = Fe ? lt : f ? ne : ht, Ur = /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-wrap tw:items-end tw:gap-4", children: [
    /* @__PURE__ */ u("div", { className: "tw:grid tw:gap-2", children: [
      /* @__PURE__ */ a(Tt, { htmlFor: "scope-range-start", className: m(oe && Ze), children: C }),
      /* @__PURE__ */ a(
        za,
        {
          id: "scope-range-start",
          scrRef: Fe ? Y ?? vt : vt,
          handleSubmit: Fr,
          localizedBookNames: c,
          localizedStrings: D,
          getEndVerse: k,
          submitKeys: Ju,
          onOpenChange: ue,
          className: m(oe && Ze),
          modal: !0
        }
      )
    ] }),
    /* @__PURE__ */ u("div", { ref: Vt, className: "tw:grid tw:gap-2", children: [
      /* @__PURE__ */ a(Tt, { htmlFor: "scope-range-end", className: m(Gr && Ze), children: U }),
      /* @__PURE__ */ a(
        za,
        {
          id: "scope-range-end",
          scrRef: Fe ? et ?? _t : _t,
          handleSubmit: ya,
          localizedBookNames: c,
          localizedStrings: D,
          getEndVerse: k,
          disableReferencesUpTo: Fe ? Y ?? vt : vt,
          onOpenChange: Zt,
          onCloseAutoFocus: (V) => {
            var tt;
            At.current && (At.current = !1, V.preventDefault(), (tt = Jt.current) == null || tt.focus());
          },
          className: m(Gr && Ze),
          modal: !0,
          align: "start"
        }
      )
    ] })
  ] }), yr = K({}), sr = B(
    (V) => (tt) => {
      yr.current[V] = tt;
    },
    []
  ), kr = K(null);
  J(() => {
    if (!pe) return;
    let V = 0;
    const tt = requestAnimationFrame(() => {
      V = requestAnimationFrame(() => {
        var dt;
        (dt = yr.current[t]) == null || dt.focus();
      });
    });
    return () => {
      cancelAnimationFrame(tt), V && cancelAnimationFrame(V);
    };
  }, [pe, t]);
  const [Qe, ka] = N(null), [tr, _a] = N(null), [cr, Na] = N(null), Ca = 200, [Ea, Ta] = N(!1);
  J(() => {
    if (!cr || typeof ResizeObserver > "u") return;
    const V = new ResizeObserver(([tt]) => {
      Ta(tt.contentRect.width < Ca);
    });
    return V.observe(cr), () => V.disconnect();
  }, [cr]);
  const _ = B(
    (V) => {
      y(V), A(vt), lt(_t), Ct(n), Ee(!1), H(V);
    },
    [vt, _t, n]
  ), rt = B(() => {
    X !== void 0 && (X === "range" ? (Y && (g == null || g(Y)), et && (f == null || f(et))) : X === "selectedBooks" && i(pt), L(X), H(void 0), y(void 0));
  }, [
    X,
    Y,
    et,
    pt,
    g,
    f,
    i,
    L
  ]), at = B((V) => {
    V || (H(void 0), y(void 0));
  }, []), te = B((V) => {
    var tt;
    V.preventDefault(), (tt = kr.current) == null || tt.focus();
  }, []), Te = (V) => t === V ? /* @__PURE__ */ a("span", { className: "tw:absolute tw:flex tw:h-3.5 tw:w-3.5 tw:items-center tw:justify-center tw:ltr:left-2 tw:rtl:right-2", children: /* @__PURE__ */ a(Oe, { className: "tw:h-4 tw:w-4" }) }) : void 0;
  return /* @__PURE__ */ u("div", { id: d, className: "tw:grid tw:gap-4", children: [
    /* @__PURE__ */ u("div", { className: "tw:grid tw:gap-2", children: [
      !T && /* @__PURE__ */ a(Tt, { children: E }),
      w === "dropdown" ? /* @__PURE__ */ u(Le, { open: pe, onOpenChange: Ee, children: [
        /* @__PURE__ */ a(Be, { asChild: !0, children: /* @__PURE__ */ u(
          Z,
          {
            ref: kr,
            variant: "outline",
            role: "combobox",
            className: m(
              "tw:w-full tw:justify-between tw:overflow-hidden tw:font-normal",
              R
            ),
            children: [
              /* @__PURE__ */ a("span", { className: "tw:min-w-0 tw:flex-1 tw:truncate tw:text-start", children: yt() }),
              /* @__PURE__ */ a(nr, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
            ]
          }
        ) }),
        /* @__PURE__ */ a(
          Ve,
          {
            ref: Na,
            className: "tw:w-[var(--radix-dropdown-menu-trigger-width)] tw:min-w-[12rem]",
            align: "start",
            children: /* @__PURE__ */ u(Sa, { container: cr, children: [
              ce.map(({ value: V, label: tt, dropdownLabel: dt, scrRefSuffix: bt, id: Lt }) => /* @__PURE__ */ u(
                ar,
                {
                  ref: sr(V),
                  className: "tw:relative tw:ps-8 data-[highlighted]:tw:bg-accent data-[highlighted]:tw:text-accent-foreground",
                  onSelect: () => L(V),
                  "data-selected": t === V ? "true" : void 0,
                  children: [
                    t === V && /* @__PURE__ */ a("span", { className: "tw:absolute tw:flex tw:h-3.5 tw:w-3.5 tw:items-center tw:justify-center tw:ltr:left-2 tw:rtl:right-2", children: /* @__PURE__ */ a(Oe, { className: "tw:h-4 tw:w-4" }) }),
                    ct(dt ?? tt, bt, Ea)
                  ]
                },
                Lt
              )),
              (Qt || Ut) && /* @__PURE__ */ a(Ye, {}),
              Qt && /* @__PURE__ */ u(
                ar,
                {
                  ref: sr("selectedBooks"),
                  className: m(
                    "tw:relative tw:ps-8",
                    "data-[highlighted]:tw:bg-accent data-[highlighted]:tw:text-accent-foreground"
                  ),
                  onSelect: () => _("selectedBooks"),
                  "data-selected": t === "selectedBooks" ? "true" : void 0,
                  children: [
                    Te("selectedBooks"),
                    `${Qt.label}…`
                  ]
                }
              ),
              Ut && /* @__PURE__ */ u(
                ar,
                {
                  ref: sr("range"),
                  className: m(
                    "tw:relative tw:ps-8",
                    "data-[highlighted]:tw:bg-accent data-[highlighted]:tw:text-accent-foreground"
                  ),
                  onSelect: () => _("range"),
                  "data-selected": t === "range" ? "true" : void 0,
                  children: [
                    Te("range"),
                    `${Ut.label}…`
                  ]
                }
              ),
              v && /* @__PURE__ */ u(it, { children: [
                /* @__PURE__ */ a(Ye, {}),
                /* @__PURE__ */ a(or, { className: "tw:px-2 tw:py-1.5 tw:text-xs tw:font-medium tw:text-muted-foreground", children: ut }),
                /* @__PURE__ */ a(
                  ar,
                  {
                    ref: Gt,
                    className: "tw:p-0",
                    onSelect: (V) => {
                      var tt, dt;
                      if (V.preventDefault(), zt.current) {
                        zt.current = !1;
                        return;
                      }
                      gt.current || (dt = (tt = ae.current) == null ? void 0 : tt.querySelector("button")) == null || dt.click();
                    },
                    children: /* @__PURE__ */ a(
                      "div",
                      {
                        ref: ae,
                        className: "tw:w-full tw:px-1 tw:pb-1",
                        onPointerDownCapture: (V) => {
                          const tt = V.target instanceof HTMLElement ? V.target : void 0;
                          tt != null && tt.closest("button") && (zt.current = !0, requestAnimationFrame(() => {
                            zt.current = !1;
                          }));
                        },
                        children: /* @__PURE__ */ a(
                          za,
                          {
                            id: "scope-navigate",
                            scrRef: b ?? Ra,
                            handleSubmit: v,
                            localizedBookNames: c,
                            localizedStrings: D,
                            getEndVerse: k,
                            triggerVariant: "ghost",
                            onOpenChange: (V) => {
                              gt.current = V;
                            },
                            onCloseAutoFocus: (V) => {
                              var tt;
                              V.preventDefault(), (tt = Gt.current) == null || tt.focus();
                            },
                            modal: !0,
                            className: "tw:w-full tw:min-w-0 tw:max-w-none tw:justify-between tw:px-2 tw:font-normal",
                            triggerContent: /* @__PURE__ */ u(it, { children: [
                              /* @__PURE__ */ a("span", { className: "tw:min-w-0 tw:flex-1 tw:truncate tw:text-start", children: Ie(b ?? Ra, "id") }),
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
        go,
        {
          value: t,
          onValueChange: L,
          className: "tw:flex tw:flex-col tw:space-y-1",
          children: ft.map(({ value: V, label: tt, scrRefSuffix: dt, id: bt }) => /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center", children: [
            /* @__PURE__ */ a(na, { className: "tw:me-2", value: V, id: bt }),
            /* @__PURE__ */ a(Tt, { htmlFor: bt, children: ct(tt, dt) })
          ] }, bt))
        }
      )
    ] }),
    w === "radio" && t === "selectedBooks" && /* @__PURE__ */ u("div", { className: "tw:grid tw:gap-2", children: [
      /* @__PURE__ */ a(Tt, { children: x }),
      jt
    ] }),
    w === "radio" && t === "range" && Ur,
    w === "dropdown" && Qt && /* @__PURE__ */ a(Ua, { open: z === "selectedBooks", onOpenChange: at, children: /* @__PURE__ */ a(
      Ha,
      {
        ref: _a,
        onCloseAutoFocus: te,
        onEscapeKeyDown: (V) => {
          tr != null && tr.querySelector('[data-state="open"]') && V.preventDefault();
        },
        children: /* @__PURE__ */ u(Sa, { container: tr, children: [
          /* @__PURE__ */ a(Ka, { className: "tw:pe-8", children: /* @__PURE__ */ a(qa, { children: F }) }),
          jt,
          /* @__PURE__ */ u(Bo, { children: [
            /* @__PURE__ */ a(Z, { variant: "outline", onClick: () => at(!1), children: nt }),
            /* @__PURE__ */ a(Z, { onClick: rt, children: ot })
          ] })
        ] })
      }
    ) }),
    w === "dropdown" && Ut && /* @__PURE__ */ a(Ua, { open: z === "range", onOpenChange: at, children: /* @__PURE__ */ a(
      Ha,
      {
        ref: ka,
        onCloseAutoFocus: te,
        onEscapeKeyDown: (V) => {
          Qe != null && Qe.querySelector('[data-state="open"]') && V.preventDefault();
        },
        children: /* @__PURE__ */ u(Sa, { container: Qe, children: [
          /* @__PURE__ */ a(Ka, { className: "tw:pe-8", children: /* @__PURE__ */ a(qa, { children: S }) }),
          Ur,
          /* @__PURE__ */ u(Bo, { children: [
            /* @__PURE__ */ a(Z, { variant: "outline", onClick: () => at(!1), children: nt }),
            /* @__PURE__ */ a(Z, { ref: Jt, onClick: rt, children: ot })
          ] })
        ] })
      }
    ) })
  ] });
}
function Wh({
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
    ...Jr,
    ...Object.fromEntries(
      Object.entries(o).map(
        ([w, h]) => [
          w,
          w === h && w in Jr ? Jr[w] : h
        ]
      )
    )
  }, d = _e();
  return /* @__PURE__ */ u(
    fr,
    {
      value: `${e}`,
      onValueChange: (w) => r(
        w === "undefined" ? void 0 : parseInt(w, 10)
      ),
      disabled: c,
      children: [
        /* @__PURE__ */ a(vr, { size: n, className: m("pr-twp tw:w-auto", i), children: /* @__PURE__ */ a(
          mr,
          {
            placeholder: l[Qa(e)] ?? e
          }
        ) }),
        /* @__PURE__ */ a(
          br,
          {
            id: s,
            align: d === "rtl" ? "end" : "start",
            style: { zIndex: Xe },
            children: t.map((w) => /* @__PURE__ */ a(le, { value: `${w}`, children: l[Qa(w)] }, `${w}`))
          }
        )
      ]
    }
  );
}
function Xh({ children: t }) {
  return /* @__PURE__ */ a("div", { className: "pr-twp tw:grid", children: t });
}
function Jh({
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
function Zh({
  primary: t,
  secondary: e,
  includeSeparator: r = !1
}) {
  return /* @__PURE__ */ u("div", { className: "tw:space-y-4 tw:py-2", children: [
    /* @__PURE__ */ u("div", { children: [
      /* @__PURE__ */ a("h3", { className: "tw:text-lg tw:font-medium", children: t }),
      /* @__PURE__ */ a("p", { className: "tw:text-sm tw:text-muted-foreground", children: e })
    ] }),
    r ? /* @__PURE__ */ a(Dr, {}) : ""
  ] });
}
function ts(t, e) {
  var r;
  return (r = Object.entries(t).find(
    ([, o]) => "menuItem" in o && o.menuItem === e
  )) == null ? void 0 : r[0];
}
function ua({ icon: t, menuLabel: e, leading: r }) {
  return t ? /* @__PURE__ */ a(
    "img",
    {
      className: m("tw:max-h-5 tw:max-w-5", r ? "tw:me-2" : "tw:ms-2"),
      src: t,
      alt: `${r ? "Leading" : "Trailing"} icon for ${e}`
    }
  ) : void 0;
}
const es = (t, e, r, o) => r ? Object.entries(t).filter(
  ([i, s]) => "column" in s && s.column === r || i === r
).sort(([, i], [, s]) => i.order - s.order).flatMap(([i]) => e.filter((c) => c.group === i).sort((c, l) => c.order - l.order).map((c) => /* @__PURE__ */ u(It, { children: [
  /* @__PURE__ */ a(Rt, { asChild: !0, children: "command" in c ? /* @__PURE__ */ u(
    ar,
    {
      onClick: () => {
        o(c);
      },
      children: [
        c.iconPathBefore && /* @__PURE__ */ a(ua, { icon: c.iconPathBefore, menuLabel: c.label, leading: !0 }),
        c.label,
        c.iconPathAfter && /* @__PURE__ */ a(ua, { icon: c.iconPathAfter, menuLabel: c.label })
      ]
    },
    `dropdown-menu-item-${c.label}-${c.command}`
  ) : /* @__PURE__ */ u(Cs, { children: [
    /* @__PURE__ */ a(Es, { children: c.label }),
    /* @__PURE__ */ a(Ts, { children: /* @__PURE__ */ a(Ss, { children: es(
      t,
      e,
      ts(t, c.id),
      o
    ) }) })
  ] }, `dropdown-menu-sub-${c.label}-${c.id}`) }),
  c.tooltip && /* @__PURE__ */ a(Dt, { children: c.tooltip })
] }, `tooltip-${c.label}-${"command" in c ? c.command : c.id}`))) : void 0;
function po({
  onSelectMenuItem: t,
  menuData: e,
  tabLabel: r,
  icon: o,
  className: n,
  variant: i,
  buttonVariant: s = "ghost",
  id: c
}) {
  return /* @__PURE__ */ u(Le, { variant: i, children: [
    /* @__PURE__ */ a(Be, { "aria-label": r, className: n, asChild: !0, id: c, children: /* @__PURE__ */ a(Z, { variant: s, size: "icon", children: o ?? /* @__PURE__ */ a(nc, {}) }) }),
    /* @__PURE__ */ a(Ve, { align: "start", style: { zIndex: Xe }, children: Object.entries(e.columns).filter(([, l]) => typeof l == "object").sort(([, l], [, d]) => typeof l == "boolean" || typeof d == "boolean" ? 0 : l.order - d.order).map(([l], d, w) => /* @__PURE__ */ u(Lr, { children: [
      /* @__PURE__ */ a(Pn, { children: /* @__PURE__ */ a(St, { children: es(e.groups, e.items, l, t) }) }),
      d < w.length - 1 && /* @__PURE__ */ a(Ye, {})
    ] }, l)) })
  ] });
}
const Zu = 8;
function Qu(t, e, r) {
  const o = e.findIndex((s) => t >= s), n = o === -1 ? e.length : o;
  if (r === void 0 || n >= r) return n;
  const i = e.findIndex(
    (s) => t >= s + Zu
  );
  return i === -1 ? r : Math.min(r, i);
}
function rs(t, e) {
  const [r, o] = N(0), n = K(void 0);
  return ee(() => {
    if (!t || typeof ResizeObserver > "u") return;
    const i = () => {
      const { width: c } = t.getBoundingClientRect(), l = n.current;
      n.current = c;
      const d = l === void 0 || l === 0;
      o(
        (w) => Qu(c, e, d ? void 0 : w)
      );
    };
    i();
    const s = new ResizeObserver(i);
    return s.observe(t), () => s.disconnect();
  }, [t, e]), r;
}
const tp = Object.freeze([520, 420, 340]), as = Yt.forwardRef(
  ({ id: t, className: e, children: r }, o) => {
    const [n, i] = N(void 0), s = K(o);
    s.current = o;
    const c = B((h) => {
      i(h ?? void 0);
      const p = s.current;
      typeof p == "function" ? p(h) : p && (p.current = h);
    }, []), l = rs(n, tp), d = vi() ?? l, w = d >= Ir.MINIMUM;
    return /* @__PURE__ */ a(fa.Provider, { value: d, children: /* @__PURE__ */ a(
      "div",
      {
        ref: c,
        className: m(
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
function Qh({
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
  return /* @__PURE__ */ u(as, { className: `tw:w-full tw:border-b ${i}`, id: n, children: [
    r && /* @__PURE__ */ a(
      po,
      {
        onSelectMenuItem: t,
        menuData: r,
        tabLabel: "Project",
        icon: d ?? /* @__PURE__ */ a(ic, {}),
        buttonVariant: "ghost"
      }
    ),
    s && /* @__PURE__ */ a("div", { className: "tw:flex tw:min-w-0 tw:shrink tw:grow-[10] tw:flex-row tw:flex-nowrap tw:items-start tw:gap-x-1 tw:gap-y-2 tw:overflow-clip", children: s }),
    c && /* @__PURE__ */ a("div", { className: "tw:flex tw:shrink tw:grow-[1] tw:basis-0 tw:flex-row tw:flex-nowrap tw:items-start tw:justify-center tw:gap-x-1 tw:gap-y-2 tw:overflow-clip tw:@sm:basis-auto", children: c }),
    /* @__PURE__ */ u("div", { className: "tw:flex tw:shrink-0 tw:grow-[1] tw:flex-row-reverse tw:flex-nowrap tw:items-start tw:gap-x-1 tw:gap-y-2 tw:overflow-clip", children: [
      o && /* @__PURE__ */ a(
        po,
        {
          onSelectMenuItem: e,
          menuData: o,
          tabLabel: "View Info",
          icon: /* @__PURE__ */ a(sc, {}),
          className: "tw:h-full"
        }
      ),
      l
    ] })
  ] });
}
function tg({
  onSelectProjectMenuItem: t,
  projectMenuData: e,
  id: r,
  className: o,
  menuButtonIcon: n
}) {
  return /* @__PURE__ */ a(as, { className: "tw:pointer-events-none", id: r, children: e && /* @__PURE__ */ a(
    po,
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
const os = Yt.forwardRef(({ className: t, ...e }, r) => {
  const o = _e();
  return /* @__PURE__ */ a(
    we.Root,
    {
      orientation: "vertical",
      ref: r,
      className: m("tw:flex tw:gap-1 tw:rounded-md tw:text-muted-foreground", t),
      ...e,
      dir: o
    }
  );
});
os.displayName = we.List.displayName;
const ns = Yt.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ a(
  we.List,
  {
    ref: r,
    className: m(
      "tw:flex tw:items-center tw:w-[124px] tw:justify-center tw:rounded-md tw:bg-muted tw:p-1 tw:text-muted-foreground",
      t
    ),
    ...e
  }
));
ns.displayName = we.List.displayName;
const ep = Yt.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ a(
  we.Trigger,
  {
    ref: r,
    ...e,
    className: m(
      "tw:inline-flex tw:w-[116px] tw:cursor-pointer tw:items-center tw:justify-center tw:break-words tw:rounded-sm tw:border-0 tw:bg-muted tw:px-3 tw:py-1.5 tw:text-sm tw:font-medium tw:text-inherit tw:ring-offset-background tw:transition-all tw:hover:text-foreground tw:focus-visible:outline-hidden tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2 tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:data-[state=active]:bg-background tw:data-[state=active]:text-foreground tw:data-[state=active]:shadow-sm tw:overflow-clip",
      t
    )
  }
)), is = Yt.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ a(
  we.Content,
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
is.displayName = we.Content.displayName;
function eg({
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
        jn,
        {
          className: i,
          value: e,
          onSearch: r,
          placeholder: o
        }
      )
    ] }),
    /* @__PURE__ */ u(os, { children: [
      /* @__PURE__ */ a(ns, { children: t.map((c) => /* @__PURE__ */ a(ep, { value: c.value, children: c.value }, c.key)) }),
      t.map((c) => /* @__PURE__ */ a(is, { value: c.value, children: c.content }, c.key))
    ] })
  ] });
}
function rp({
  className: t,
  // CUSTOM: Added variant prop to allow callers to apply visual style variants to all menu items
  variant: e = "default",
  ...r
}) {
  const o = Yt.useMemo(
    () => ({
      variant: e
    }),
    [e]
  );
  return /* @__PURE__ */ a(Is.Provider, { value: o, children: /* @__PURE__ */ a(
    Ne.Root,
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
function ap({ ...t }) {
  return /* @__PURE__ */ a(Ne.Menu, { "data-slot": "menubar-menu", ...t });
}
function op({ ...t }) {
  return /* @__PURE__ */ a(Ne.Portal, { "data-slot": "menubar-portal", ...t });
}
function np({
  className: t,
  ...e
}) {
  const r = Ar();
  return /* @__PURE__ */ a(
    Ne.Trigger,
    {
      "data-slot": "menubar-trigger",
      className: m(
        "tw:flex tw:items-center tw:rounded-sm tw:px-1.5 tw:py-[2px] tw:text-sm tw:font-medium tw:outline-hidden tw:select-none tw:hover:bg-muted tw:aria-expanded:bg-muted",
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation (portal-rendered content needs this)
        "pr-twp",
        // CUSTOM: Apply variant-driven styles from menu context
        _o({ variant: r.variant, className: t })
      ),
      ...e
    }
  );
}
function ip({
  className: t,
  align: e = "start",
  alignOffset: r = -4,
  sideOffset: o = 8,
  ...n
}) {
  const i = Ar();
  return /* @__PURE__ */ a(op, { children: /* @__PURE__ */ a(
    Ne.Content,
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
function sp({
  className: t,
  inset: e,
  variant: r = "default",
  ...o
}) {
  const n = Ar();
  return /* @__PURE__ */ a(
    Ne.Item,
    {
      "data-slot": "menubar-item",
      "data-inset": e,
      "data-variant": r,
      className: m(
        "tw:group/menubar-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-[variant=destructive]:text-destructive tw:data-[variant=destructive]:focus:bg-destructive/10 tw:data-[variant=destructive]:focus:text-destructive tw:dark:data-[variant=destructive]:focus:bg-destructive/20 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:data-[variant=destructive]:*:[svg]:text-destructive!",
        // CUSTOM: Apply variant-driven styles from menu context
        _o({ variant: n.variant, className: t })
      ),
      ...o
    }
  );
}
function cp({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    Ne.Separator,
    {
      "data-slot": "menubar-separator",
      className: m("tw:-mx-1 tw:my-1 tw:h-px tw:bg-border", t),
      ...e
    }
  );
}
function lp({ ...t }) {
  return /* @__PURE__ */ a(Ne.Sub, { "data-slot": "menubar-sub", ...t });
}
function dp({
  className: t,
  inset: e,
  children: r,
  ...o
}) {
  const n = Ar();
  return /* @__PURE__ */ u(
    Ne.SubTrigger,
    {
      "data-slot": "menubar-sub-trigger",
      "data-inset": e,
      className: m(
        "tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-none tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-inset:ps-7 tw:data-open:bg-accent tw:data-open:text-accent-foreground tw:[&_svg:not([class*=size-])]:size-4",
        // CUSTOM: Apply variant-driven styles from menu context
        _o({ variant: n.variant, className: t })
      ),
      ...o,
      children: [
        r,
        /* @__PURE__ */ a(Qn, { className: "tw:ms-auto tw:size-4" })
      ]
    }
  );
}
function wp({
  className: t,
  ...e
}) {
  const r = Ar();
  return /* @__PURE__ */ a(
    Ne.SubContent,
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
const Er = (t, e) => {
  setTimeout(() => {
    e.forEach((r) => {
      var o;
      (o = t.current) == null || o.dispatchEvent(new KeyboardEvent("keydown", r));
    });
  }, 0);
}, ss = (t, e, r, o) => {
  if (!r) return;
  const n = Object.entries(t).filter(
    ([i, s]) => "column" in s && s.column === r || i === r
  ).sort(([, i], [, s]) => i.order - s.order);
  return n.flatMap(([i], s) => {
    const c = e.filter((d) => d.group === i).sort((d, w) => d.order - w.order).map((d) => /* @__PURE__ */ u(It, { children: [
      /* @__PURE__ */ a(Rt, { asChild: !0, children: "command" in d ? /* @__PURE__ */ u(
        sp,
        {
          onClick: () => {
            o(d);
          },
          children: [
            d.iconPathBefore && /* @__PURE__ */ a(ua, { icon: d.iconPathBefore, menuLabel: d.label, leading: !0 }),
            d.label,
            d.iconPathAfter && /* @__PURE__ */ a(ua, { icon: d.iconPathAfter, menuLabel: d.label })
          ]
        },
        `menubar-item-${d.label}-${d.command}`
      ) : /* @__PURE__ */ u(lp, { children: [
        /* @__PURE__ */ a(dp, { children: d.label }),
        /* @__PURE__ */ a(wp, { children: ss(
          t,
          e,
          ts(t, d.id),
          o
        ) })
      ] }, `menubar-sub-${d.label}-${d.id}`) }),
      d.tooltip && /* @__PURE__ */ a(Dt, { children: d.tooltip })
    ] }, `tooltip-${d.label}-${"command" in d ? d.command : d.id}`)), l = [...c];
    return c.length > 0 && s < n.length - 1 && l.push(/* @__PURE__ */ a(cp, {}, `separator-${i}`)), l;
  });
};
function up({
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
  if ($l(["alt", "alt+p", "alt+l", "alt+n", "alt+h"], (w, h) => {
    var f, b, v, D;
    w.preventDefault();
    const p = { key: "Escape", code: "Escape", keyCode: 27, bubbles: !0 }, g = { key: " ", code: "Space", keyCode: 32, bubbles: !0 };
    switch (h.hotkey) {
      case "alt":
        Er(i, [p]);
        break;
      case "alt+p":
        (f = i.current) == null || f.focus(), Er(i, [p, g]);
        break;
      case "alt+l":
        (b = s.current) == null || b.focus(), Er(s, [p, g]);
        break;
      case "alt+n":
        (v = c.current) == null || v.focus(), Er(c, [p, g]);
        break;
      case "alt+h":
        (D = l.current) == null || D.focus(), Er(l, [p, g]);
        break;
    }
  }), J(() => {
    if (!r || !n.current) return;
    const w = new MutationObserver((g) => {
      g.forEach((f) => {
        if (f.attributeName === "data-state" && f.target instanceof HTMLElement) {
          const b = f.target.getAttribute("data-state");
          r(b === "open");
        }
      });
    });
    return n.current.querySelectorAll("[data-state]").forEach((g) => {
      w.observe(g, { attributes: !0 });
    }), () => w.disconnect();
  }, [r]), !!t)
    return /* @__PURE__ */ a(rp, { ref: n, className: "pr-twp tw:border-0 tw:bg-transparent", variant: o, children: Object.entries(t.columns).filter(([, w]) => typeof w == "object").sort(([, w], [, h]) => typeof w == "boolean" || typeof h == "boolean" ? 0 : w.order - h.order).map(([w, h]) => /* @__PURE__ */ u(ap, { children: [
      /* @__PURE__ */ a(np, { ref: d(w), children: typeof h == "object" && "label" in h && h.label }),
      /* @__PURE__ */ a(
        ip,
        {
          style: { zIndex: Xe },
          children: /* @__PURE__ */ a(St, { children: ss(t.groups, t.items, w, e) })
        }
      )
    ] }, w)) });
}
const pp = Object.freeze([950, 800, 700]);
function rg(t) {
  switch (t) {
    case void 0:
      return;
    case "darwin":
      return "tw:ps-[85px]";
    default:
      return "tw:pe-[calc(138px+1rem)]";
  }
}
function ag({
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
  const [w, h] = N(void 0), p = B(
    (b) => h(b ?? void 0),
    []
  ), g = rs(w, pp), f = vi() ?? g;
  return /* @__PURE__ */ a(fa.Provider, { value: f, children: /* @__PURE__ */ a(
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
          ref: p,
          style: l ? { WebkitAppRegion: "drag" } : void 0,
          children: [
            /* @__PURE__ */ a("div", { className: "tw:flex tw:shrink-0 tw:grow tw:basis-0", children: /* @__PURE__ */ u(
              "div",
              {
                className: "tw:flex tw:items-center tw:gap-2",
                style: l ? { WebkitAppRegion: "no-drag" } : void 0,
                children: [
                  s,
                  t && /* @__PURE__ */ a(
                    up,
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
  ) });
}
const hp = (t, e) => t[e] ?? e;
function og({
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
  const d = hp(
    s,
    "%settings_uiLanguageSelector_fallbackLanguages%"
  ), [w, h] = N(!1), p = (f) => {
    n && n(f), o && o([f, ...r.filter((b) => b !== f)]), i && r.find((b) => b === f) && i([...r.filter((b) => b !== f)]), h(!1);
  }, g = (f, b) => {
    var D, k, T, R, M, I;
    const v = b !== f ? ((k = (D = t[f]) == null ? void 0 : D.uiNames) == null ? void 0 : k[b]) ?? ((R = (T = t[f]) == null ? void 0 : T.uiNames) == null ? void 0 : R.en) : void 0;
    return v ? `${(M = t[f]) == null ? void 0 : M.autonym} (${v})` : (I = t[f]) == null ? void 0 : I.autonym;
  };
  return /* @__PURE__ */ u("div", { id: l, className: m("pr-twp tw:max-w-sm", c), children: [
    /* @__PURE__ */ u(
      fr,
      {
        name: "uiLanguage",
        value: e,
        onValueChange: p,
        open: w,
        onOpenChange: (f) => h(f),
        children: [
          /* @__PURE__ */ a(vr, { children: /* @__PURE__ */ a(mr, {}) }),
          /* @__PURE__ */ a(
            br,
            {
              style: { zIndex: Xe },
              children: Object.keys(t).map((f) => /* @__PURE__ */ a(le, { value: f, children: g(f, e) }, f))
            }
          )
        ]
      }
    ),
    e !== "en" && /* @__PURE__ */ a("div", { className: "tw:pt-3", children: /* @__PURE__ */ a(Tt, { className: "tw:font-normal tw:text-muted-foreground", children: qe(d, {
      fallbackLanguages: (r == null ? void 0 : r.length) > 0 ? r.map((f) => g(f, e)).join(", ") : t.en.autonym
    }) }) })
  ] });
}
const ng = Object.freeze([
  "%firstRun_language_search_placeholder%",
  "%firstRun_language_noResults%",
  "%firstRun_language_selected%"
]);
function gp(t) {
  return [...t].sort(([e, r], [o, n]) => e === "en" && o !== "en" ? -1 : o === "en" && e !== "en" ? 1 : r.autonym.localeCompare(n.autonym));
}
function ig({
  languages: t,
  value: e,
  onChange: r,
  localizedStrings: o,
  className: n,
  id: i
}) {
  const [s, c] = N(""), l = $(
    () => gp(Object.entries(t)).map(([f, b]) => ({
      tag: f,
      info: b,
      keywords: [b.autonym, ...Object.values(b.uiNames ?? {}), ...b.otherNames ?? []]
    })),
    [t]
  ), d = $(() => {
    if (!s) return l;
    const f = s.toLowerCase();
    return l.filter(({ keywords: b }) => b.some((v) => v.toLowerCase().includes(f)));
  }, [l, s]), w = l.length > 1, h = o["%firstRun_language_search_placeholder%"] ?? "", p = o["%firstRun_language_noResults%"] ?? "", g = o["%firstRun_language_selected%"] ?? "";
  return /* @__PURE__ */ u(Ae, { id: i, className: m("pr-twp", n), shouldFilter: !1, children: [
    w && // Plain <input> (not CommandPrimitive.Input) so cmdk cannot update this field after
    // item selection. Arrow-key and Enter events from here bubble to the Command root div
    // where cmdk's keydown handler picks them up for list navigation.
    /* @__PURE__ */ a("div", { "data-slot": "command-input-wrapper", className: "tw:p-1 tw:pb-0", children: /* @__PURE__ */ u(Rs, { className: "tw:h-8! tw:rounded-lg! tw:border-input/30 tw:bg-input/30 tw:shadow-none! tw:*:data-[slot=input-group-addon]:ps-2!", children: [
      /* @__PURE__ */ a(
        "input",
        {
          "data-slot": "command-input",
          type: "text",
          placeholder: h,
          "aria-label": h,
          value: s,
          onChange: (f) => c(f.currentTarget.value),
          className: "tw:w-full tw:text-sm tw:outline-hidden tw:disabled:cursor-not-allowed tw:disabled:opacity-50"
        }
      ),
      /* @__PURE__ */ a(Ds, { children: /* @__PURE__ */ a(Tc, { className: "tw:size-4 tw:shrink-0 tw:opacity-50" }) })
    ] }) }),
    /* @__PURE__ */ u(je, { children: [
      /* @__PURE__ */ a($r, { children: p }),
      d.map(({ tag: f, info: b }) => {
        const v = f === e;
        return /* @__PURE__ */ u(
          ke,
          {
            value: f,
            "aria-current": v ? "true" : void 0,
            "data-checked": v ? "true" : void 0,
            onSelect: () => r(f),
            children: [
              /* @__PURE__ */ a("span", { dir: "auto", children: b.autonym }),
              v && /* @__PURE__ */ a("span", { className: "tw:sr-only", children: g })
            ]
          },
          f
        );
      })
    ] })
  ] });
}
function fp({ item: t, createLabel: e, createComplexLabel: r }) {
  return e ? /* @__PURE__ */ a(Tt, { children: e(t) }) : r ? /* @__PURE__ */ a(Tt, { children: r(t) }) : /* @__PURE__ */ a(Tt, { children: t });
}
function mp({
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
      Wi,
      {
        className: "tw:me-2 tw:align-middle",
        checked: o.includes(c),
        onCheckedChange: (l) => n(c, l)
      }
    ),
    /* @__PURE__ */ a(
      fp,
      {
        item: c,
        createLabel: i,
        createComplexLabel: s
      }
    )
  ] }, c)) });
}
const sg = mp;
function vp(t, e) {
  const [r, o] = N(t), [n, i] = N(e);
  return t !== r && (o(t), t && i(e)), t ? e : n;
}
function cg({
  open: t,
  anchorRect: e,
  message: r,
  confirmingKeyLabel: o,
  side: n = "bottom",
  align: i = "start",
  showArrow: s = !0
}) {
  const c = t ? Ho(r, { key: o }).join("") : "", {
    anchorRect: l,
    message: d,
    confirmingKeyLabel: w,
    showArrow: h
  } = vp(t, { anchorRect: e, message: r, confirmingKeyLabel: o, showArrow: s });
  return /* @__PURE__ */ u(St, { children: [
    /* @__PURE__ */ a("span", { role: "status", className: "tw:sr-only", children: c }),
    /* @__PURE__ */ u(It, { open: t, onOpenChange: () => {
    }, children: [
      /* @__PURE__ */ a(
        Rt,
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
        Dt,
        {
          side: n,
          align: i,
          showArrow: h,
          arrowPadding: 8,
          className: m(
            // Rely on TooltipContent's default tw:max-w-xs (320px) and normal wrapping: this hint's
            // text is short and usually fits on one line, but locale length varies (e.g. Spanish runs
            // longer than English), so allow it to wrap rather than force tw:whitespace-nowrap, which
            // could clip or overflow on a narrow webview.
            "tw:p-0 tw:has-data-[slot=kbd]:pe-0 tw:bg-background tw:text-destructive tw:border tw:border-destructive"
          ),
          arrowClassName: "tw:bg-[color-mix(in_oklab,var(--destructive)_10%,var(--background))] tw:fill-[color-mix(in_oklab,var(--destructive)_10%,var(--background))] tw:border tw:border-destructive",
          children: /* @__PURE__ */ a("div", { className: "tw:w-full tw:h-full tw:rounded-md tw:bg-destructive/10 tw:px-3 tw:py-1.5", children: Ho(d, {
            key: /* @__PURE__ */ a(
              Wa,
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
          }).map((p, g) => (
            // The array is static per render (one fixed localized string + one kbd), so index is
            // a stable, safe key — same rationale as source-language-indexed-list.component.tsx's
            // disable.
            // eslint-disable-next-line react/no-array-index-key
            /* @__PURE__ */ a(Lr, { children: p }, `key-${g}`)
          )) })
        }
      )
    ] })
  ] });
}
function lg({
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
  accentColor: h,
  showDropdownOnHover: p = !1
}) {
  const g = (v) => {
    if (v.key === "Enter" || v.key === " ") {
      if (v.target !== v.currentTarget) return;
      v.preventDefault(), r();
    }
  }, [f, b] = N(!1);
  return /* @__PURE__ */ u(
    "div",
    {
      hidden: n,
      onClick: r,
      onKeyDown: g,
      onMouseEnter: () => b(!0),
      onFocus: () => b(!0),
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
            !e && l && /* @__PURE__ */ a("div", { className: "tw:invisible tw:group-hover:visible", children: l }),
            d && (e || p && f) && /* @__PURE__ */ a(
              "div",
              {
                className: m(
                  !e && p && "tw:invisible tw:group-hover:visible"
                ),
                children: /* @__PURE__ */ u(Le, { children: [
                  /* @__PURE__ */ a(Be, { className: m(h && "tw:me-1"), asChild: !0, children: /* @__PURE__ */ a(
                    Z,
                    {
                      className: "tw:m-1 tw:h-6 tw:w-6",
                      variant: "ghost",
                      size: "icon",
                      onClick: (v) => v.stopPropagation(),
                      onFocus: (v) => v.stopPropagation(),
                      children: /* @__PURE__ */ a(cc, {})
                    }
                  ) }),
                  /* @__PURE__ */ a(Ve, { align: "end", children: d })
                ] })
              }
            )
          ] }),
          w && /* @__PURE__ */ a("div", { className: "tw:w-fit tw:min-w-0 tw:max-w-full tw:overflow-hidden", children: w })
        ] }),
        h && /* @__PURE__ */ a(
          "div",
          {
            className: `tw:absolute tw:right-0 tw:top-0 tw:h-full tw:w-2 tw:rounded-r-xl ${h}`
          }
        )
      ]
    },
    t
  );
}
function dg({
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
  onChange: h,
  onFocus: p,
  onBlur: g
}) {
  return /* @__PURE__ */ u("div", { className: m("tw:inline-grid tw:items-center tw:gap-1.5", { "tw:w-full": o }), children: [
    /* @__PURE__ */ a(
      Tt,
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
      pa,
      {
        id: t,
        disabled: e,
        placeholder: s,
        required: c,
        className: m(l, { "tw:border-red-600": r }),
        defaultValue: d,
        value: w,
        onChange: h,
        onFocus: p,
        onBlur: g
      }
    ),
    /* @__PURE__ */ a("p", { className: m({ "tw:hidden": !n }), children: n })
  ] });
}
function wg({ currentStep: t, totalSteps: e, locale: r }) {
  const o = r || "en", n = $(() => {
    const c = new Xn(o);
    return (l) => c.format(l);
  }, [o]), i = Math.min(Math.max(t, 1), e), s = Array.from({ length: e }, (c, l) => l + 1);
  return /* @__PURE__ */ a("div", { className: "tw:flex tw:items-center", "aria-hidden": "true", children: s.map((c) => {
    let l = "upcoming";
    return c === i ? l = "active" : c < i && (l = "complete"), /* @__PURE__ */ u(Lr, { children: [
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
          children: l === "complete" ? /* @__PURE__ */ a(Oe, { className: "tw:h-4 tw:w-4" }) : n(c)
        }
      )
    ] }, c);
  }) });
}
function ug({ ...t }) {
  return /* @__PURE__ */ a($t.Root, { "data-slot": "context-menu", ...t });
}
function pg({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    $t.Trigger,
    {
      "data-slot": "context-menu-trigger",
      className: m("tw:select-none", t),
      ...e
    }
  );
}
function hg({ ...t }) {
  return /* @__PURE__ */ a($t.Group, { "data-slot": "context-menu-group", ...t });
}
function gg({ ...t }) {
  return /* @__PURE__ */ a($t.Portal, { "data-slot": "context-menu-portal", ...t });
}
function fg({ ...t }) {
  return /* @__PURE__ */ a($t.Sub, { "data-slot": "context-menu-sub", ...t });
}
function mg({
  ...t
}) {
  return /* @__PURE__ */ a($t.RadioGroup, { "data-slot": "context-menu-radio-group", ...t });
}
function vg({
  className: t,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: e,
  ...r
}) {
  return /* @__PURE__ */ a($t.Portal, { children: /* @__PURE__ */ a(
    $t.Content,
    {
      "data-slot": "context-menu-content",
      className: m(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        // CUSTOM: Fixed tw: prefix not being on some classes and removed erroneous empty tw: tokens
        // CUSTOM: Removed tw:z-50 to use the shared z-index constant below (see style prop)
        "pr-twp tw:max-h-(--radix-context-menu-content-available-height) tw:min-w-36 tw:origin-(--radix-context-menu-content-transform-origin) tw:overflow-x-hidden tw:overflow-y-auto tw:rounded-lg tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95 tw:animate-none! tw:bg-popover/70 tw:before:-z-1 tw:**:data-[slot$=-item]:focus:bg-foreground/10 tw:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 tw:**:data-[slot$=-separator]:bg-foreground/5 tw:**:data-[slot$=-trigger]:focus:bg-foreground/10 tw:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! tw:**:data-[variant=destructive]:focus:bg-foreground/10! tw:**:data-[variant=destructive]:text-accent-foreground! tw:**:data-[variant=destructive]:**:text-accent-foreground! tw:relative tw:before:pointer-events-none tw:before:absolute tw:before:inset-0 tw:before:rounded-[inherit] tw:before:backdrop-blur-2xl tw:before:backdrop-saturate-150",
        t
      ),
      style: { zIndex: Xe, ...e },
      ...r
    }
  ) });
}
function bg({
  className: t,
  inset: e,
  variant: r = "default",
  ...o
}) {
  return /* @__PURE__ */ a(
    $t.Item,
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
function xg({
  className: t,
  inset: e,
  children: r,
  ...o
}) {
  return /* @__PURE__ */ u(
    $t.SubTrigger,
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
        /* @__PURE__ */ a(Qn, { className: "tw:ms-auto" })
      ]
    }
  );
}
function yg({
  className: t,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: e,
  ...r
}) {
  return /* @__PURE__ */ a(
    $t.SubContent,
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
      style: { zIndex: Xe, ...e },
      ...r
    }
  );
}
function kg({
  className: t,
  children: e,
  checked: r,
  inset: o,
  ...n
}) {
  return /* @__PURE__ */ u(
    $t.CheckboxItem,
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
        /* @__PURE__ */ a("span", { className: "tw:pointer-events-none tw:absolute tw:end-2", children: /* @__PURE__ */ a($t.ItemIndicator, { children: /* @__PURE__ */ a(ga, {}) }) }),
        e
      ]
    }
  );
}
function _g({
  className: t,
  children: e,
  inset: r,
  ...o
}) {
  return /* @__PURE__ */ u(
    $t.RadioItem,
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
        /* @__PURE__ */ a("span", { className: "tw:pointer-events-none tw:absolute tw:end-2", children: /* @__PURE__ */ a($t.ItemIndicator, { children: /* @__PURE__ */ a(ga, {}) }) }),
        e
      ]
    }
  );
}
function Ng({
  className: t,
  inset: e,
  ...r
}) {
  return /* @__PURE__ */ a(
    $t.Label,
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
function Cg({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    $t.Separator,
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
function Eg({ className: t, ...e }) {
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
function Tg({ ...t }) {
  return /* @__PURE__ */ a(Je.Root, { "data-slot": "drawer", ...t });
}
function Sg({ ...t }) {
  return /* @__PURE__ */ a(Je.Trigger, { "data-slot": "drawer-trigger", ...t });
}
function bp({ ...t }) {
  return /* @__PURE__ */ a(Je.Portal, { "data-slot": "drawer-portal", ...t });
}
function Ig({ ...t }) {
  return /* @__PURE__ */ a(Je.Close, { "data-slot": "drawer-close", ...t });
}
function xp({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    Je.Overlay,
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
function Rg({
  className: t,
  children: e,
  // CUSTOM: Destructure hideDrawerHandle to conditionally render the drag handle
  hideDrawerHandle: r = !1,
  ...o
}) {
  const n = _e();
  return /* @__PURE__ */ u(bp, { "data-slot": "drawer-portal", children: [
    /* @__PURE__ */ a(xp, {}),
    /* @__PURE__ */ u(
      Je.Content,
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
function Dg({ className: t, ...e }) {
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
function zg({ className: t, ...e }) {
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
function Og({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    Je.Title,
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
function Mg({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    Je.Description,
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
function Pg({
  className: t,
  value: e,
  ...r
}) {
  return /* @__PURE__ */ a(
    Zo.Root,
    {
      "data-slot": "progress",
      className: m(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:relative tw:flex tw:h-1 tw:w-full tw:items-center tw:overflow-x-hidden tw:rounded-full tw:bg-muted",
        t
      ),
      ...r,
      children: /* @__PURE__ */ a(
        Zo.Indicator,
        {
          "data-slot": "progress-indicator",
          className: "tw:size-full tw:flex-1 tw:bg-primary tw:transition-all",
          style: { transform: `translateX(-${100 - (e || 0)}%)` }
        }
      )
    }
  );
}
function $g({ ...t }) {
  const { theme: e = "system" } = Al();
  return /* @__PURE__ */ a(
    jl,
    {
      theme: e === "light" || e === "dark" || e === "system" ? e : "system",
      className: "tw:toaster tw:group",
      icons: {
        success: /* @__PURE__ */ a(zc, { className: "tw:size-4" }),
        info: /* @__PURE__ */ a(Dc, { className: "tw:size-4" }),
        warning: /* @__PURE__ */ a(Rc, { className: "tw:size-4" }),
        error: /* @__PURE__ */ a(Ic, { className: "tw:size-4" }),
        loading: /* @__PURE__ */ a(Sc, { className: "tw:size-4 tw:animate-spin" })
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
function Ag({
  className: t,
  defaultValue: e,
  value: r,
  min: o = 0,
  max: n = 100,
  ...i
}) {
  const s = _e(), c = Yt.useMemo(
    () => Array.isArray(r) ? r : Array.isArray(e) ? e : [o, n],
    [r, e, o, n]
  );
  return /* @__PURE__ */ u(
    Hr.Root,
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
          Hr.Track,
          {
            "data-slot": "slider-track",
            className: "tw:relative tw:grow tw:overflow-hidden tw:rounded-full tw:bg-muted tw:data-horizontal:h-1 tw:data-horizontal:w-full tw:data-vertical:h-full tw:data-vertical:w-1",
            children: /* @__PURE__ */ a(
              Hr.Range,
              {
                "data-slot": "slider-range",
                className: "tw:absolute tw:bg-primary tw:select-none tw:data-horizontal:h-full tw:data-vertical:w-full"
              }
            )
          }
        ),
        Array.from({ length: c.length }, (l, d) => /* @__PURE__ */ a(
          Hr.Thumb,
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
    Qo.Root,
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
        Qo.Thumb,
        {
          "data-slot": "switch-thumb",
          className: "tw:pointer-events-none tw:block tw:rounded-full tw:bg-background tw:ring-0 tw:transition-transform tw:group-data-[size=default]/switch:size-4 tw:group-data-[size=sm]/switch:size-3 tw:group-data-[size=default]/switch:data-checked:translate-x-[calc(100%-2px)] tw:rtl:group-data-[size=default]/switch:data-checked:-translate-x-[calc(100%-2px)] tw:group-data-[size=sm]/switch:data-checked:translate-x-[calc(100%-2px)] tw:rtl:group-data-[size=sm]/switch:data-checked:-translate-x-[calc(100%-2px)] tw:dark:data-checked:bg-primary-foreground tw:group-data-[size=default]/switch:data-unchecked:translate-x-0 tw:rtl:group-data-[size=default]/switch:data-unchecked:-translate-x-0 tw:group-data-[size=sm]/switch:data-unchecked:translate-x-0 tw:rtl:group-data-[size=sm]/switch:data-unchecked:-translate-x-0 tw:dark:data-unchecked:bg-foreground"
        }
      )
    }
  );
}
function Lg({
  className: t,
  orientation: e = "horizontal",
  ...r
}) {
  return /* @__PURE__ */ a(
    we.Root,
    {
      "data-slot": "tabs",
      "data-orientation": e,
      className: m("tw:group/tabs tw:flex tw:gap-2 tw:data-horizontal:flex-col", t),
      ...r
    }
  );
}
const yp = gi(
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
function Bg({
  className: t,
  variant: e = "default",
  ...r
}) {
  const o = _e();
  return /* @__PURE__ */ a(
    we.List,
    {
      "data-slot": "tabs-list",
      "data-variant": e,
      className: m("pr-twp", yp({ variant: e }), t),
      dir: o,
      ...r
    }
  );
}
function Vg({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    we.Trigger,
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
function Gg({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    we.Content,
    {
      "data-slot": "tabs-content",
      className: m("pr-twp tw:flex-1 tw:text-sm tw:outline-none", t),
      ...e
    }
  );
}
const Fg = (t, e) => {
  J(() => {
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
}, Ug = (t, e) => {
  J(() => {
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
          console.error("useEventAsync: error while unsubscribing from event", l);
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
function kp(t) {
  return {
    preserveValue: !0,
    ...t
  };
}
const _p = (t, e, r = {}) => {
  const o = K(e);
  o.current = e;
  const n = K(r);
  n.current = kp(n.current);
  const [i, s] = N(() => o.current), [c, l] = N(!0);
  return J(() => {
    let d = !0;
    return l(!!t), (async () => {
      if (t)
        try {
          const w = await t();
          d && (s(() => w), l(!1));
        } catch (w) {
          d && l(!1), console.error(
            "usePromise: the promise factory rejected, so there is no new value",
            w
          );
        }
    })(), () => {
      d = !1, n.current.preserveValue || s(() => o.current);
    };
  }, [t]), [i, c];
}, Hg = (t) => {
  const [e, r] = N(!1), [o, n] = N(!1), [i, s] = N(0), c = K(void 0), l = $(() => {
    if (!t) return;
    const p = async () => {
      try {
        const g = await t();
        return c.current === p && (r(!1), n(!0)), g;
      } catch (g) {
        throw c.current === p && (r(!0), n(!0)), g;
      }
    };
    return p;
  }, [t, i]);
  J(() => {
    c.current = l, r(!1), n(!l);
  }, [l]);
  const [d, w] = _p(l, void 0), h = B(() => {
    c.current && (r(!1), n(!1), s((p) => p + 1));
  }, []);
  return $(
    () => ({ data: d, isLoading: w, hasError: e, hasSettled: o, refetch: h }),
    [d, w, e, o, h]
  );
};
function Kg(t) {
  J(() => {
    let e;
    return t && (e = document.createElement("style"), e.appendChild(document.createTextNode(t)), document.head.appendChild(e)), () => {
      e && document.head.removeChild(e);
    };
  }, [t]);
}
function qg(t) {
  const e = $(() => bc(t).slice().sort().join(" "), [t]);
  return $(() => e ? e.split(" ") : [], [e]);
}
const Np = () => {
  const [t, e] = N(
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
function Yg(t, e) {
  const [r, o] = N(!1), n = K(e);
  n.current = e;
  const i = K(t);
  i.current = t;
  const s = B(() => {
    i.current ? n.current() : o(!0);
  }, []);
  return J(() => {
    !t || !r || (o(!1), n.current());
  }, [t, r]), s;
}
function Cp(t, e, r) {
  return t ? r.dark : e === void 0 ? r.lightDefault : r.lightUnselected;
}
function Wg(t, e) {
  const r = Np();
  return Cp(t, r, e);
}
function Xg({ value: t, children: e }) {
  return /* @__PURE__ */ a(mi.Provider, { value: t, children: /* @__PURE__ */ a(fa.Provider, { value: t, children: e }) });
}
function Ep(t, e = "top") {
  if (!t || typeof document > "u") return;
  const r = document.head || document.querySelector("head"), o = r.querySelector(":first-child"), n = document.createElement("style");
  n.appendChild(document.createTextNode(t)), e === "top" && o ? r.insertBefore(n, o) : r.appendChild(n);
}
Ep(`/* By default the editor is too tall for the footnote editor, even while empty, so this makes it
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
@layer properties{@supports (((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))){*,:before,:after,::backdrop{--tw-translate-x:0;--tw-translate-y:0;--tw-translate-z:0;--tw-rotate-x:initial;--tw-rotate-y:initial;--tw-rotate-z:initial;--tw-skew-x:initial;--tw-skew-y:initial;--tw-space-y-reverse:0;--tw-space-x-reverse:0;--tw-divide-x-reverse:0;--tw-border-style:solid;--tw-divide-y-reverse:0;--tw-leading:initial;--tw-font-weight:initial;--tw-tracking:initial;--tw-ordinal:initial;--tw-slashed-zero:initial;--tw-numeric-figure:initial;--tw-numeric-spacing:initial;--tw-numeric-fraction:initial;--tw-shadow:0 0 #0000;--tw-shadow-color:initial;--tw-shadow-alpha:100%;--tw-inset-shadow:0 0 #0000;--tw-inset-shadow-color:initial;--tw-inset-shadow-alpha:100%;--tw-ring-color:initial;--tw-ring-shadow:0 0 #0000;--tw-inset-ring-color:initial;--tw-inset-ring-shadow:0 0 #0000;--tw-ring-inset:initial;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-offset-shadow:0 0 #0000;--tw-blur:initial;--tw-brightness:initial;--tw-contrast:initial;--tw-grayscale:initial;--tw-hue-rotate:initial;--tw-invert:initial;--tw-opacity:initial;--tw-saturate:initial;--tw-sepia:initial;--tw-drop-shadow:initial;--tw-drop-shadow-color:initial;--tw-drop-shadow-alpha:100%;--tw-drop-shadow-size:initial;--tw-duration:initial;--tw-ease:initial;--tw-content:"";--tw-backdrop-blur:initial;--tw-backdrop-brightness:initial;--tw-backdrop-contrast:initial;--tw-backdrop-grayscale:initial;--tw-backdrop-hue-rotate:initial;--tw-backdrop-invert:initial;--tw-backdrop-opacity:initial;--tw-backdrop-saturate:initial;--tw-backdrop-sepia:initial;--tw-outline-style:solid;--tw-animation-delay:0s;--tw-animation-direction:normal;--tw-animation-duration:initial;--tw-animation-fill-mode:none;--tw-animation-iteration-count:1;--tw-enter-blur:0;--tw-enter-opacity:1;--tw-enter-rotate:0;--tw-enter-scale:1;--tw-enter-translate-x:0;--tw-enter-translate-y:0;--tw-exit-blur:0;--tw-exit-opacity:1;--tw-exit-rotate:0;--tw-exit-scale:1;--tw-exit-translate-x:0;--tw-exit-translate-y:0}}}@layer theme{:root,:host{--tw-font-mono:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;--tw-color-red-100:oklch(93.6% .032 17.717);--tw-color-red-200:oklch(88.5% .062 18.334);--tw-color-red-300:oklch(80.8% .114 19.571);--tw-color-red-400:oklch(70.4% .191 22.216);--tw-color-red-500:oklch(63.7% .237 25.331);--tw-color-red-600:oklch(57.7% .245 27.325);--tw-color-red-700:oklch(50.5% .213 27.518);--tw-color-red-800:oklch(44.4% .177 26.899);--tw-color-orange-100:oklch(95.4% .038 75.164);--tw-color-orange-800:oklch(47% .157 37.304);--tw-color-amber-200:oklch(92.4% .12 95.746);--tw-color-amber-400:oklch(82.8% .189 84.429);--tw-color-amber-500:oklch(76.9% .188 70.08);--tw-color-amber-600:oklch(66.6% .179 58.318);--tw-color-yellow-50:oklch(98.7% .026 102.212);--tw-color-yellow-100:oklch(97.3% .071 103.193);--tw-color-yellow-400:oklch(85.2% .199 91.936);--tw-color-yellow-500:oklch(79.5% .184 86.047);--tw-color-yellow-600:oklch(68.1% .162 75.834);--tw-color-yellow-700:oklch(55.4% .135 66.442);--tw-color-green-50:oklch(98.2% .018 155.826);--tw-color-green-100:oklch(96.2% .044 156.743);--tw-color-green-500:oklch(72.3% .219 149.579);--tw-color-green-600:oklch(62.7% .194 149.214);--tw-color-green-700:oklch(52.7% .154 150.069);--tw-color-green-800:oklch(44.8% .119 151.328);--tw-color-teal-400:oklch(77.7% .152 181.912);--tw-color-teal-500:oklch(70.4% .14 182.503);--tw-color-teal-600:oklch(60% .118 184.704);--tw-color-sky-400:oklch(74.6% .16 232.661);--tw-color-sky-500:oklch(68.5% .169 237.323);--tw-color-sky-600:oklch(58.8% .158 241.966);--tw-color-blue-50:oklch(97% .014 254.604);--tw-color-blue-100:oklch(93.2% .032 255.585);--tw-color-blue-400:oklch(70.7% .165 254.624);--tw-color-blue-500:oklch(62.3% .214 259.815);--tw-color-blue-600:oklch(54.6% .245 262.881);--tw-color-blue-800:oklch(42.4% .199 265.638);--tw-color-indigo-200:oklch(87% .065 274.039);--tw-color-purple-50:oklch(97.7% .014 308.299);--tw-color-purple-200:oklch(90.2% .063 306.703);--tw-color-purple-900:oklch(38.1% .176 304.987);--tw-color-rose-400:oklch(71.2% .194 13.428);--tw-color-rose-500:oklch(64.5% .246 16.439);--tw-color-rose-600:oklch(58.6% .253 17.585);--tw-color-slate-300:oklch(86.9% .022 252.894);--tw-color-slate-400:oklch(70.4% .04 256.788);--tw-color-slate-900:oklch(20.8% .042 265.755);--tw-color-gray-50:oklch(98.5% .002 247.839);--tw-color-gray-100:oklch(96.7% .003 264.542);--tw-color-gray-300:oklch(87.2% .01 258.338);--tw-color-gray-500:oklch(55.1% .027 264.364);--tw-color-gray-600:oklch(44.6% .03 256.802);--tw-color-gray-700:oklch(37.3% .034 259.733);--tw-color-gray-800:oklch(27.8% .033 256.848);--tw-color-zinc-400:oklch(70.5% .015 286.067);--tw-color-neutral-300:oklch(87% 0 0);--tw-color-black:#000;--tw-color-white:#fff;--tw-container-xs:20rem;--tw-container-sm:24rem;--tw-container-md:28rem;--tw-container-lg:32rem;--tw-container-2xl:42rem;--tw-container-3xl:48rem;--tw-container-4xl:56rem;--tw-container-6xl:72rem;--tw-text-xs:.75rem;--tw-text-xs--line-height:calc(1 / .75);--tw-text-sm:.875rem;--tw-text-sm--line-height:calc(1.25 / .875);--tw-text-base:1rem;--tw-text-base--line-height:calc(1.5 / 1);--tw-text-lg:1.125rem;--tw-text-lg--line-height:calc(1.75 / 1.125);--tw-text-xl:1.25rem;--tw-text-xl--line-height:calc(1.75 / 1.25);--tw-text-2xl:1.5rem;--tw-text-2xl--line-height:calc(2 / 1.5);--tw-text-3xl:1.875rem;--tw-text-3xl--line-height:calc(2.25 / 1.875);--tw-text-4xl:2.25rem;--tw-text-4xl--line-height:calc(2.5 / 2.25);--tw-text-5xl:3rem;--tw-text-5xl--line-height:1;--tw-font-weight-normal:400;--tw-font-weight-medium:500;--tw-font-weight-semibold:600;--tw-font-weight-bold:700;--tw-font-weight-extrabold:800;--tw-tracking-tight:-.025em;--tw-tracking-wider:.05em;--tw-tracking-widest:.1em;--tw-leading-tight:1.25;--tw-leading-snug:1.375;--tw-leading-relaxed:1.625;--tw-leading-loose:2;--tw-radius-xs:.125rem;--tw-radius-md:calc(var(--radius) * .8);--tw-drop-shadow-sm:0 1px 2px #00000026;--tw-animate-spin:spin 1s linear infinite;--tw-animate-pulse:pulse 2s cubic-bezier(.4, 0, .6, 1) infinite;--tw-blur-xs:4px;--tw-blur-2xl:40px;--tw-default-transition-duration:.15s;--tw-default-transition-timing-function:cubic-bezier(.4, 0, .2, 1);--tw-default-font-family:"IBM Plex Sans Variable", sans-serif;--tw-default-mono-font-family:var(--tw-font-mono)}}@layer base{.pr-twp,.pr-twp *{border-color:var(--border);outline-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.pr-twp,.pr-twp *{outline-color:color-mix(in oklab, var(--ring) 50%, transparent)}}body.pr-twp{background-color:var(--background);color:var(--foreground)}html.pr-twp{font-family:IBM Plex Sans Variable,sans-serif}:where(.pr-twp,.pr-twp *),:where(.pr-twp,.pr-twp *):after,:where(.pr-twp,.pr-twp *):before,:where(.pr-twp,.pr-twp *) ::backdrop{box-sizing:border-box;border:0 solid;margin:0;padding:0}:where(.pr-twp,.pr-twp *) ::file-selector-button{box-sizing:border-box;border:0 solid;margin:0;padding:0}.pr-twp{-webkit-text-size-adjust:100%;tab-size:4;line-height:1.5;font-family:var(--tw-default-font-family,ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");font-feature-settings:var(--tw-default-font-feature-settings,normal);font-variation-settings:var(--tw-default-font-variation-settings,normal);-webkit-tap-highlight-color:transparent}hr:where(.pr-twp,.pr-twp *){height:0;color:inherit;border-top-width:1px}abbr:where([title]):where(.pr-twp,.pr-twp *){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1:where(.pr-twp,.pr-twp *),h2:where(.pr-twp,.pr-twp *),h3:where(.pr-twp,.pr-twp *),h4:where(.pr-twp,.pr-twp *),h5:where(.pr-twp,.pr-twp *),h6:where(.pr-twp,.pr-twp *){font-size:inherit;font-weight:inherit}a:where(.pr-twp,.pr-twp *){color:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b:where(.pr-twp,.pr-twp *),strong:where(.pr-twp,.pr-twp *){font-weight:bolder}code:where(.pr-twp,.pr-twp *),kbd:where(.pr-twp,.pr-twp *),samp:where(.pr-twp,.pr-twp *),pre:where(.pr-twp,.pr-twp *){font-family:var(--tw-default-mono-font-family,ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace);font-feature-settings:var(--tw-default-mono-font-feature-settings,normal);font-variation-settings:var(--tw-default-mono-font-variation-settings,normal);font-size:1em}small:where(.pr-twp,.pr-twp *){font-size:80%}sub:where(.pr-twp,.pr-twp *),sup:where(.pr-twp,.pr-twp *){vertical-align:baseline;font-size:75%;line-height:0;position:relative}sub:where(.pr-twp,.pr-twp *){bottom:-.25em}sup:where(.pr-twp,.pr-twp *){top:-.5em}table:where(.pr-twp,.pr-twp *){text-indent:0;border-color:inherit;border-collapse:collapse}:-moz-focusring:where(.pr-twp,.pr-twp *){outline:auto}progress:where(.pr-twp,.pr-twp *){vertical-align:baseline}summary:where(.pr-twp,.pr-twp *){display:list-item}ol:where(.pr-twp,.pr-twp *),ul:where(.pr-twp,.pr-twp *),menu:where(.pr-twp,.pr-twp *){list-style:none}img:where(.pr-twp,.pr-twp *),svg:where(.pr-twp,.pr-twp *),video:where(.pr-twp,.pr-twp *),canvas:where(.pr-twp,.pr-twp *),audio:where(.pr-twp,.pr-twp *),iframe:where(.pr-twp,.pr-twp *),embed:where(.pr-twp,.pr-twp *),object:where(.pr-twp,.pr-twp *){vertical-align:middle;display:block}img:where(.pr-twp,.pr-twp *),video:where(.pr-twp,.pr-twp *){max-width:100%;height:auto}button:where(.pr-twp,.pr-twp *),input:where(.pr-twp,.pr-twp *),select:where(.pr-twp,.pr-twp *),optgroup:where(.pr-twp,.pr-twp *),textarea:where(.pr-twp,.pr-twp *){font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(.pr-twp,.pr-twp *) ::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(select:is([multiple],[size])) optgroup:where(.pr-twp,.pr-twp *){font-weight:bolder}:where(select:is([multiple],[size])) optgroup option:where(.pr-twp,.pr-twp *){padding-inline-start:20px}:where(.pr-twp,.pr-twp *) ::file-selector-button{margin-inline-end:4px}:where(.pr-twp,.pr-twp *) ::placeholder{opacity:1}@supports (not ((-webkit-appearance:-apple-pay-button))) or (contain-intrinsic-size:1px){:where(.pr-twp,.pr-twp *) ::placeholder{color:currentColor}@supports (color:color-mix(in lab, red, red)){:where(.pr-twp,.pr-twp *) ::placeholder{color:color-mix(in oklab, currentcolor 50%, transparent)}}}textarea:where(.pr-twp,.pr-twp *){resize:vertical}:where(.pr-twp,.pr-twp *) ::-webkit-search-decoration{-webkit-appearance:none}:where(.pr-twp,.pr-twp *) ::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit{display:inline-flex}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-fields-wrapper{padding:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-year-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-month-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-day-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-hour-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-minute-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-second-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-millisecond-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-meridiem-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-calendar-picker-indicator{line-height:1}:-moz-ui-invalid:where(.pr-twp,.pr-twp *){box-shadow:none}button:where(.pr-twp,.pr-twp *),input:where([type=button],[type=reset],[type=submit]):where(.pr-twp,.pr-twp *){appearance:button}:where(.pr-twp,.pr-twp *) ::file-selector-button{appearance:button}:where(.pr-twp,.pr-twp *) ::-webkit-inner-spin-button{height:auto}:where(.pr-twp,.pr-twp *) ::-webkit-outer-spin-button{height:auto}[hidden]:where(:not([hidden=until-found])):where(.pr-twp,.pr-twp *){display:none!important}}@layer components;@layer utilities{.tw\\:\\@container\\/card-header{container:card-header/inline-size}.tw\\:\\@container\\/search{container:search/inline-size}.tw\\:\\@container\\/toolbar{container:toolbar/inline-size}.tw\\:pointer-events-auto{pointer-events:auto}.tw\\:pointer-events-none{pointer-events:none}.tw\\:invisible{visibility:hidden}.tw\\:sr-only{clip-path:inset(50%);white-space:nowrap;border-width:0;width:1px;height:1px;margin:-1px;padding:0;position:absolute;overflow:hidden}.tw\\:absolute{position:absolute}.tw\\:fixed{position:fixed}.tw\\:relative{position:relative}.tw\\:sticky{position:sticky}.tw\\:inset-0{inset:calc(calc(var(--spacing)) * 0)}.tw\\:inset-y-0{inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:inset-s-3{inset-inline-start:calc(calc(var(--spacing)) * 3)}.tw\\:start-1\\.5{inset-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:start-1\\/2{inset-inline-start:50%}.tw\\:end-0{inset-inline-end:calc(calc(var(--spacing)) * 0)}.tw\\:end-1{inset-inline-end:calc(calc(var(--spacing)) * 1)}.tw\\:end-2{inset-inline-end:calc(calc(var(--spacing)) * 2)}.tw\\:end-3{inset-inline-end:calc(calc(var(--spacing)) * 3)}.tw\\:inset-e-0{inset-inline-end:calc(calc(var(--spacing)) * 0)}.tw\\:-top-\\[1px\\]{top:-1px}.tw\\:top-0{top:calc(calc(var(--spacing)) * 0)}.tw\\:top-1\\.5{top:calc(calc(var(--spacing)) * 1.5)}.tw\\:top-1\\/2{top:50%}.tw\\:top-1\\/3{top:33.3333%}.tw\\:top-2{top:calc(calc(var(--spacing)) * 2)}.tw\\:top-2\\.5{top:calc(calc(var(--spacing)) * 2.5)}.tw\\:top-3\\.5{top:calc(calc(var(--spacing)) * 3.5)}.tw\\:top-\\[-1px\\]{top:-1px}.tw\\:top-full{top:100%}.tw\\:-right-1{right:calc(calc(var(--spacing)) * -1)}.tw\\:right-0{right:calc(calc(var(--spacing)) * 0)}.tw\\:right-1{right:calc(calc(var(--spacing)) * 1)}.tw\\:right-3{right:calc(calc(var(--spacing)) * 3)}.tw\\:bottom-0{bottom:calc(calc(var(--spacing)) * 0)}.tw\\:-left-\\[1px\\]{left:-1px}.tw\\:left-0{left:calc(calc(var(--spacing)) * 0)}.tw\\:left-1\\/2{left:50%}.tw\\:left-2{left:calc(calc(var(--spacing)) * 2)}.tw\\:left-3{left:calc(calc(var(--spacing)) * 3)}.tw\\:isolate{isolation:isolate}.tw\\:z-10{z-index:10}.tw\\:z-20{z-index:20}.tw\\:z-50{z-index:50}.tw\\:order-first{order:-9999}.tw\\:order-last{order:9999}.tw\\:col-span-1{grid-column:span 1/span 1}.tw\\:col-span-2{grid-column:span 2/span 2}.tw\\:col-span-3{grid-column:span 3/span 3}.tw\\:col-start-1{grid-column-start:1}.tw\\:col-start-2{grid-column-start:2}.tw\\:row-span-2{grid-row:span 2/span 2}.tw\\:row-start-1{grid-row-start:1}.tw\\:row-start-2{grid-row-start:2}.tw\\:m-0{margin:calc(calc(var(--spacing)) * 0)}.tw\\:m-1{margin:calc(calc(var(--spacing)) * 1)}.tw\\:m-2{margin:calc(calc(var(--spacing)) * 2)}.tw\\:-mx-1{margin-inline:calc(calc(var(--spacing)) * -1)}.tw\\:-mx-4{margin-inline:calc(calc(var(--spacing)) * -4)}.tw\\:mx-0{margin-inline:calc(calc(var(--spacing)) * 0)}.tw\\:mx-1{margin-inline:calc(calc(var(--spacing)) * 1)}.tw\\:mx-2{margin-inline:calc(calc(var(--spacing)) * 2)}.tw\\:mx-3\\.5{margin-inline:calc(calc(var(--spacing)) * 3.5)}.tw\\:mx-4{margin-inline:calc(calc(var(--spacing)) * 4)}.tw\\:mx-8{margin-inline:calc(calc(var(--spacing)) * 8)}.tw\\:my-1{margin-block:calc(calc(var(--spacing)) * 1)}.tw\\:my-2\\.5{margin-block:calc(calc(var(--spacing)) * 2.5)}.tw\\:my-4{margin-block:calc(calc(var(--spacing)) * 4)}.tw\\:my-auto{margin-block:auto}.tw\\:ms-1{margin-inline-start:calc(calc(var(--spacing)) * 1)}.tw\\:ms-2{margin-inline-start:calc(calc(var(--spacing)) * 2)}.tw\\:ms-5{margin-inline-start:calc(calc(var(--spacing)) * 5)}.tw\\:ms-auto{margin-inline-start:auto}.tw\\:me-1{margin-inline-end:calc(calc(var(--spacing)) * 1)}.tw\\:me-2{margin-inline-end:calc(calc(var(--spacing)) * 2)}.tw\\:prose{color:var(--tw-prose-body);max-width:65ch}.tw\\:prose :where(p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em}.tw\\:prose :where([class~=lead]):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-lead);margin-top:1.2em;margin-bottom:1.2em;font-size:1.25em;line-height:1.6}.tw\\:prose :where(a):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-links);font-weight:500;text-decoration:underline}.tw\\:prose :where(strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-bold);font-weight:600}.tw\\:prose :where(a strong):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(blockquote strong):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(thead th strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.tw\\:prose :where(ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em;padding-inline-start:1.625em;list-style-type:decimal}.tw\\:prose :where(ol[type=A]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-alpha}.tw\\:prose :where(ol[type=a]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-alpha}.tw\\:prose :where(ol[type=A s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-alpha}.tw\\:prose :where(ol[type=a s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-alpha}.tw\\:prose :where(ol[type=I]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-roman}.tw\\:prose :where(ol[type=i]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-roman}.tw\\:prose :where(ol[type=I s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-roman}.tw\\:prose :where(ol[type=i s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-roman}.tw\\:prose :where(ol[type="1"]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:decimal}.tw\\:prose :where(ul):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em;padding-inline-start:1.625em;list-style-type:disc}.tw\\:prose :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *))::marker{color:var(--tw-prose-counters);font-weight:400}.tw\\:prose :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *))::marker{color:var(--tw-prose-bullets)}.tw\\:prose :where(dt):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:1.25em;font-weight:600}.tw\\:prose :where(hr):not(:where([class~=not-prose],[class~=not-prose] *)){border-color:var(--tw-prose-hr);border-top-width:1px;margin-top:3em;margin-bottom:3em}.tw\\:prose :where(blockquote):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-quotes);border-inline-start-width:.25rem;border-inline-start-color:var(--tw-prose-quote-borders);quotes:"“""”""‘""’";margin-top:1.6em;margin-bottom:1.6em;padding-inline-start:1em;font-style:italic;font-weight:500}.tw\\:prose :where(blockquote p:first-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):before{content:open-quote}.tw\\:prose :where(blockquote p:last-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:close-quote}.tw\\:prose :where(h1):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:0;margin-bottom:.888889em;font-size:2.25em;font-weight:800;line-height:1.11111}.tw\\:prose :where(h1 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:900}.tw\\:prose :where(h2):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:2em;margin-bottom:1em;font-size:1.5em;font-weight:700;line-height:1.33333}.tw\\:prose :where(h2 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:800}.tw\\:prose :where(h3):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:1.6em;margin-bottom:.6em;font-size:1.25em;font-weight:600;line-height:1.6}.tw\\:prose :where(h3 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:700}.tw\\:prose :where(h4):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:1.5em;margin-bottom:.5em;font-weight:600;line-height:1.5}.tw\\:prose :where(h4 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:700}.tw\\:prose :where(img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.tw\\:prose :where(picture):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em;display:block}.tw\\:prose :where(video):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.tw\\:prose :where(kbd):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-kbd);box-shadow:0 0 0 1px rgb(var(--tw-prose-kbd-shadows) / 10%), 0 3px 0 rgb(var(--tw-prose-kbd-shadows) / 10%);padding-top:.1875em;padding-inline-end:.375em;padding-bottom:.1875em;border-radius:.3125rem;padding-inline-start:.375em;font-family:inherit;font-size:.875em;font-weight:500}.tw\\:prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-code);font-size:.875em;font-weight:600}.tw\\:prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)):before,.tw\\:prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:"\`"}.tw\\:prose :where(a code):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h1 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.tw\\:prose :where(h2 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-size:.875em}.tw\\:prose :where(h3 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-size:.9em}.tw\\:prose :where(h4 code):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(blockquote code):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(thead th code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.tw\\:prose :where(pre):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-pre-code);background-color:var(--tw-prose-pre-bg);padding-top:.857143em;padding-inline-end:1.14286em;padding-bottom:.857143em;border-radius:.375rem;margin-top:1.71429em;margin-bottom:1.71429em;padding-inline-start:1.14286em;font-size:.875em;font-weight:400;line-height:1.71429;overflow-x:auto}.tw\\:prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)){font-weight:inherit;color:inherit;font-size:inherit;font-family:inherit;line-height:inherit;background-color:#0000;border-width:0;border-radius:0;padding:0}.tw\\:prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)):before,.tw\\:prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:none}.tw\\:prose :where(table):not(:where([class~=not-prose],[class~=not-prose] *)){table-layout:auto;width:100%;margin-top:2em;margin-bottom:2em;font-size:.875em;line-height:1.71429}.tw\\:prose :where(thead):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:1px;border-bottom-color:var(--tw-prose-th-borders)}.tw\\:prose :where(thead th):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);vertical-align:bottom;padding-inline-end:.571429em;padding-bottom:.571429em;padding-inline-start:.571429em;font-weight:600}.tw\\:prose :where(tbody tr):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:1px;border-bottom-color:var(--tw-prose-td-borders)}.tw\\:prose :where(tbody tr:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:0}.tw\\:prose :where(tbody td):not(:where([class~=not-prose],[class~=not-prose] *)){vertical-align:baseline}.tw\\:prose :where(tfoot):not(:where([class~=not-prose],[class~=not-prose] *)){border-top-width:1px;border-top-color:var(--tw-prose-th-borders)}.tw\\:prose :where(tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){vertical-align:top}.tw\\:prose :where(th,td):not(:where([class~=not-prose],[class~=not-prose] *)){text-align:start}.tw\\:prose :where(figure>*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose :where(figcaption):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-captions);margin-top:.857143em;font-size:.875em;line-height:1.42857}.tw\\:prose{--tw-prose-body:var(--foreground);--tw-prose-headings:var(--foreground);--tw-prose-lead:var(--muted-foreground);--tw-prose-links:var(--primary);--tw-prose-bold:var(--foreground);--tw-prose-counters:var(--muted-foreground);--tw-prose-bullets:var(--muted-foreground);--tw-prose-hr:var(--border);--tw-prose-quotes:var(--foreground);--tw-prose-quote-borders:var(--border);--tw-prose-captions:var(--muted-foreground);--tw-prose-kbd:oklch(21% .034 264.665);--tw-prose-kbd-shadows:NaN NaN NaN;--tw-prose-code:var(--foreground);--tw-prose-pre-code:var(--muted-foreground);--tw-prose-pre-bg:var(--muted);--tw-prose-th-borders:var(--border);--tw-prose-td-borders:var(--border);--tw-prose-invert-body:var(--foreground);--tw-prose-invert-headings:var(--foreground);--tw-prose-invert-lead:var(--muted-foreground);--tw-prose-invert-links:var(--primary);--tw-prose-invert-bold:var(--foreground);--tw-prose-invert-counters:var(--muted-foreground);--tw-prose-invert-bullets:var(--muted-foreground);--tw-prose-invert-hr:var(--border);--tw-prose-invert-quotes:var(--foreground);--tw-prose-invert-quote-borders:var(--border);--tw-prose-invert-captions:var(--muted-foreground);--tw-prose-invert-kbd:#fff;--tw-prose-invert-kbd-shadows:255 255 255;--tw-prose-invert-code:var(--foreground);--tw-prose-invert-pre-code:var(--muted-foreground);--tw-prose-invert-pre-bg:var(--muted);--tw-prose-invert-th-borders:var(--border);--tw-prose-invert-td-borders:var(--border);font-size:1rem;line-height:1.75}.tw\\:prose :where(picture>img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose :where(li):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.5em;margin-bottom:.5em}.tw\\:prose :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:.375em}.tw\\:prose :where(.tw\\:prose>ul>li p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.75em;margin-bottom:.75em}.tw\\:prose :where(.tw\\:prose>ul>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em}.tw\\:prose :where(.tw\\:prose>ul>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.25em}.tw\\:prose :where(.tw\\:prose>ol>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em}.tw\\:prose :where(.tw\\:prose>ol>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.25em}.tw\\:prose :where(ul ul,ul ol,ol ul,ol ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.75em;margin-bottom:.75em}.tw\\:prose :where(dl):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em}.tw\\:prose :where(dd):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.5em;padding-inline-start:1.625em}.tw\\:prose :where(hr+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h2+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h3+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h4+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose :where(thead th:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose :where(thead th:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose :where(tbody td,tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.571429em;padding-inline-end:.571429em;padding-bottom:.571429em;padding-inline-start:.571429em}.tw\\:prose :where(tbody td:first-child,tfoot td:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose :where(tbody td:last-child,tfoot td:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose :where(figure):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.tw\\:prose :where(.tw\\:prose>:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose :where(.tw\\:prose>:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:0}.tw\\:prose-sm{font-size:.875rem;line-height:1.71429}.tw\\:prose-sm :where(p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em;margin-bottom:1.14286em}.tw\\:prose-sm :where([class~=lead]):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.888889em;margin-bottom:.888889em;font-size:1.28571em;line-height:1.55556}.tw\\:prose-sm :where(blockquote):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.33333em;margin-bottom:1.33333em;padding-inline-start:1.11111em}.tw\\:prose-sm :where(h1):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:.8em;font-size:2.14286em;line-height:1.2}.tw\\:prose-sm :where(h2):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.6em;margin-bottom:.8em;font-size:1.42857em;line-height:1.4}.tw\\:prose-sm :where(h3):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.55556em;margin-bottom:.444444em;font-size:1.28571em;line-height:1.55556}.tw\\:prose-sm :where(h4):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.42857em;margin-bottom:.571429em;line-height:1.42857}.tw\\:prose-sm :where(img):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(picture):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.71429em;margin-bottom:1.71429em}.tw\\:prose-sm :where(picture>img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose-sm :where(video):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.71429em;margin-bottom:1.71429em}.tw\\:prose-sm :where(kbd):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.142857em;padding-inline-end:.357143em;padding-bottom:.142857em;border-radius:.3125rem;padding-inline-start:.357143em;font-size:.857143em}.tw\\:prose-sm :where(code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.857143em}.tw\\:prose-sm :where(h2 code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.9em}.tw\\:prose-sm :where(h3 code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.888889em}.tw\\:prose-sm :where(pre):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.666667em;padding-inline-end:1em;padding-bottom:.666667em;border-radius:.25rem;margin-top:1.66667em;margin-bottom:1.66667em;padding-inline-start:1em;font-size:.857143em;line-height:1.66667}.tw\\:prose-sm :where(ol):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(ul):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em;margin-bottom:1.14286em;padding-inline-start:1.57143em}.tw\\:prose-sm :where(li):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.285714em;margin-bottom:.285714em}.tw\\:prose-sm :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:.428571em}.tw\\:prose-sm :where(.tw\\:prose-sm>ul>li p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.571429em;margin-bottom:.571429em}.tw\\:prose-sm :where(.tw\\:prose-sm>ul>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em}.tw\\:prose-sm :where(.tw\\:prose-sm>ul>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.14286em}.tw\\:prose-sm :where(.tw\\:prose-sm>ol>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em}.tw\\:prose-sm :where(.tw\\:prose-sm>ol>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.14286em}.tw\\:prose-sm :where(ul ul,ul ol,ol ul,ol ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.571429em;margin-bottom:.571429em}.tw\\:prose-sm :where(dl):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em;margin-bottom:1.14286em}.tw\\:prose-sm :where(dt):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em}.tw\\:prose-sm :where(dd):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.285714em;padding-inline-start:1.57143em}.tw\\:prose-sm :where(hr):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2.85714em;margin-bottom:2.85714em}.tw\\:prose-sm :where(hr+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(h2+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(h3+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(h4+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose-sm :where(table):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.857143em;line-height:1.5}.tw\\:prose-sm :where(thead th):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:1em;padding-bottom:.666667em;padding-inline-start:1em}.tw\\:prose-sm :where(thead th:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose-sm :where(thead th:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose-sm :where(tbody td,tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.666667em;padding-inline-end:1em;padding-bottom:.666667em;padding-inline-start:1em}.tw\\:prose-sm :where(tbody td:first-child,tfoot td:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose-sm :where(tbody td:last-child,tfoot td:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose-sm :where(figure):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.71429em;margin-bottom:1.71429em}.tw\\:prose-sm :where(figure>*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose-sm :where(figcaption):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.666667em;font-size:.857143em;line-height:1.33333}.tw\\:prose-sm :where(.tw\\:prose-sm>:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose-sm :where(.tw\\:prose-sm>:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:0}.tw\\:-mt-4{margin-top:calc(calc(var(--spacing)) * -4)}.tw\\:mt-0\\.5{margin-top:calc(calc(var(--spacing)) * .5)}.tw\\:mt-1{margin-top:calc(calc(var(--spacing)) * 1)}.tw\\:mt-2{margin-top:calc(calc(var(--spacing)) * 2)}.tw\\:mt-3{margin-top:calc(calc(var(--spacing)) * 3)}.tw\\:mt-4{margin-top:calc(calc(var(--spacing)) * 4)}.tw\\:mt-6{margin-top:calc(calc(var(--spacing)) * 6)}.tw\\:mt-auto{margin-top:auto}.tw\\:mr-1{margin-right:calc(calc(var(--spacing)) * 1)}.tw\\:mr-2{margin-right:calc(calc(var(--spacing)) * 2)}.tw\\:mr-3{margin-right:calc(calc(var(--spacing)) * 3)}.tw\\:-mb-4{margin-bottom:calc(calc(var(--spacing)) * -4)}.tw\\:mb-1{margin-bottom:calc(calc(var(--spacing)) * 1)}.tw\\:mb-2{margin-bottom:calc(calc(var(--spacing)) * 2)}.tw\\:mb-3{margin-bottom:calc(calc(var(--spacing)) * 3)}.tw\\:mb-4{margin-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:ml-1{margin-left:calc(calc(var(--spacing)) * 1)}.tw\\:ml-2{margin-left:calc(calc(var(--spacing)) * 2)}.tw\\:ml-4{margin-left:calc(calc(var(--spacing)) * 4)}.tw\\:ml-auto{margin-left:auto}.tw\\:box-border{box-sizing:border-box}.tw\\:line-clamp-3{-webkit-line-clamp:3;-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden}.tw\\:no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}.tw\\:no-scrollbar::-webkit-scrollbar{display:none}.tw\\:block{display:block}.tw\\:flex{display:flex}.tw\\:grid{display:grid}.tw\\:hidden{display:none}.tw\\:inline-block{display:inline-block}.tw\\:inline-flex{display:inline-flex}.tw\\:inline-grid{display:inline-grid}.tw\\:field-sizing-content{field-sizing:content}.tw\\:aspect-square{aspect-ratio:1}.tw\\:size-2{width:calc(calc(var(--spacing)) * 2);height:calc(calc(var(--spacing)) * 2)}.tw\\:size-2\\.5{width:calc(calc(var(--spacing)) * 2.5);height:calc(calc(var(--spacing)) * 2.5)}.tw\\:size-3{width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:size-3\\.5{width:calc(calc(var(--spacing)) * 3.5);height:calc(calc(var(--spacing)) * 3.5)}.tw\\:size-4{width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:size-6{width:calc(calc(var(--spacing)) * 6);height:calc(calc(var(--spacing)) * 6)}.tw\\:size-7{width:calc(calc(var(--spacing)) * 7);height:calc(calc(var(--spacing)) * 7)}.tw\\:size-8{width:calc(calc(var(--spacing)) * 8);height:calc(calc(var(--spacing)) * 8)}.tw\\:size-9{width:calc(calc(var(--spacing)) * 9);height:calc(calc(var(--spacing)) * 9)}.tw\\:size-10{width:calc(calc(var(--spacing)) * 10);height:calc(calc(var(--spacing)) * 10)}.tw\\:size-full{width:100%;height:100%}.tw\\:h-1{height:calc(calc(var(--spacing)) * 1)}.tw\\:h-2{height:calc(calc(var(--spacing)) * 2)}.tw\\:h-3{height:calc(calc(var(--spacing)) * 3)}.tw\\:h-3\\.5{height:calc(calc(var(--spacing)) * 3.5)}.tw\\:h-4{height:calc(calc(var(--spacing)) * 4)}.tw\\:h-5{height:calc(calc(var(--spacing)) * 5)}.tw\\:h-6{height:calc(calc(var(--spacing)) * 6)}.tw\\:h-7{height:calc(calc(var(--spacing)) * 7)}.tw\\:h-8{height:calc(calc(var(--spacing)) * 8)}.tw\\:h-8\\!{height:calc(calc(var(--spacing)) * 8)!important}.tw\\:h-9{height:calc(calc(var(--spacing)) * 9)}.tw\\:h-10{height:calc(calc(var(--spacing)) * 10)}.tw\\:h-12{height:calc(calc(var(--spacing)) * 12)}.tw\\:h-14{height:calc(calc(var(--spacing)) * 14)}.tw\\:h-20{height:calc(calc(var(--spacing)) * 20)}.tw\\:h-24{height:calc(calc(var(--spacing)) * 24)}.tw\\:h-32{height:calc(calc(var(--spacing)) * 32)}.tw\\:h-40{height:calc(calc(var(--spacing)) * 40)}.tw\\:h-64{height:calc(calc(var(--spacing)) * 64)}.tw\\:h-80{height:calc(calc(var(--spacing)) * 80)}.tw\\:h-96{height:calc(calc(var(--spacing)) * 96)}.tw\\:h-\\[5px\\]{height:5px}.tw\\:h-\\[260px\\]{height:260px}.tw\\:h-\\[300px\\]{height:300px}.tw\\:h-\\[400px\\]{height:400px}.tw\\:h-\\[600px\\]{height:600px}.tw\\:h-\\[calc\\(100\\%-1px\\)\\]{height:calc(100% - 1px)}.tw\\:h-\\[calc\\(100\\%-2px\\)\\]{height:calc(100% - 2px)}.tw\\:h-auto{height:auto}.tw\\:h-full{height:100%}.tw\\:h-px{height:1px}.tw\\:h-screen{height:100vh}.tw\\:h-svh{height:100svh}.tw\\:max-h-\\(--radix-context-menu-content-available-height\\){max-height:var(--radix-context-menu-content-available-height)}.tw\\:max-h-\\(--radix-dropdown-menu-content-available-height\\){max-height:var(--radix-dropdown-menu-content-available-height)}.tw\\:max-h-\\(--radix-popover-content-available-height\\){max-height:var(--radix-popover-content-available-height)}.tw\\:max-h-\\(--radix-select-content-available-height\\){max-height:var(--radix-select-content-available-height)}.tw\\:max-h-5{max-height:calc(calc(var(--spacing)) * 5)}.tw\\:max-h-10{max-height:calc(calc(var(--spacing)) * 10)}.tw\\:max-h-72{max-height:calc(calc(var(--spacing)) * 72)}.tw\\:max-h-80{max-height:calc(calc(var(--spacing)) * 80)}.tw\\:max-h-\\[96\\%\\]{max-height:96%}.tw\\:max-h-\\[300px\\]{max-height:300px}.tw\\:min-h-0{min-height:calc(calc(var(--spacing)) * 0)}.tw\\:min-h-11{min-height:calc(calc(var(--spacing)) * 11)}.tw\\:min-h-16{min-height:calc(calc(var(--spacing)) * 16)}.tw\\:min-h-\\[200px\\]{min-height:200px}.tw\\:min-h-full{min-height:100%}.tw\\:min-h-svh{min-height:100svh}.tw\\:w-\\(--radix-dropdown-menu-trigger-width\\){width:var(--radix-dropdown-menu-trigger-width)}.tw\\:w-\\(--sidebar-width\\){width:var(--sidebar-width)}.tw\\:w-1{width:calc(calc(var(--spacing)) * 1)}.tw\\:w-1\\/2{width:50%}.tw\\:w-2{width:calc(calc(var(--spacing)) * 2)}.tw\\:w-3{width:calc(calc(var(--spacing)) * 3)}.tw\\:w-3\\.5{width:calc(calc(var(--spacing)) * 3.5)}.tw\\:w-3\\/4{width:75%}.tw\\:w-4{width:calc(calc(var(--spacing)) * 4)}.tw\\:w-4\\/5{width:80%}.tw\\:w-4\\/6{width:66.6667%}.tw\\:w-5{width:calc(calc(var(--spacing)) * 5)}.tw\\:w-5\\/6{width:83.3333%}.tw\\:w-6{width:calc(calc(var(--spacing)) * 6)}.tw\\:w-8{width:calc(calc(var(--spacing)) * 8)}.tw\\:w-9{width:calc(calc(var(--spacing)) * 9)}.tw\\:w-9\\/12{width:75%}.tw\\:w-10{width:calc(calc(var(--spacing)) * 10)}.tw\\:w-12{width:calc(calc(var(--spacing)) * 12)}.tw\\:w-14{width:calc(calc(var(--spacing)) * 14)}.tw\\:w-20{width:calc(calc(var(--spacing)) * 20)}.tw\\:w-24{width:calc(calc(var(--spacing)) * 24)}.tw\\:w-32{width:calc(calc(var(--spacing)) * 32)}.tw\\:w-48{width:calc(calc(var(--spacing)) * 48)}.tw\\:w-56{width:calc(calc(var(--spacing)) * 56)}.tw\\:w-60{width:calc(calc(var(--spacing)) * 60)}.tw\\:w-64{width:calc(calc(var(--spacing)) * 64)}.tw\\:w-72{width:calc(calc(var(--spacing)) * 72)}.tw\\:w-80{width:calc(calc(var(--spacing)) * 80)}.tw\\:w-96{width:calc(calc(var(--spacing)) * 96)}.tw\\:w-\\[1px\\]{width:1px}.tw\\:w-\\[5px\\]{width:5px}.tw\\:w-\\[70px\\]{width:70px}.tw\\:w-\\[100px\\]{width:100px}.tw\\:w-\\[116px\\]{width:116px}.tw\\:w-\\[124px\\]{width:124px}.tw\\:w-\\[150px\\]{width:150px}.tw\\:w-\\[180px\\]{width:180px}.tw\\:w-\\[200px\\]{width:200px}.tw\\:w-\\[250px\\]{width:250px}.tw\\:w-\\[260px\\]{width:260px}.tw\\:w-\\[280px\\]{width:280px}.tw\\:w-\\[300px\\]{width:300px}.tw\\:w-\\[320px\\]{width:320px}.tw\\:w-\\[350px\\]{width:350px}.tw\\:w-\\[400px\\]{width:400px}.tw\\:w-\\[420px\\]{width:420px}.tw\\:w-\\[500px\\]{width:500px}.tw\\:w-\\[560px\\]{width:560px}.tw\\:w-\\[600px\\]{width:600px}.tw\\:w-\\[calc\\(100\\%-2px\\)\\]{width:calc(100% - 2px)}.tw\\:w-\\[var\\(--radix-dropdown-menu-trigger-width\\)\\]{width:var(--radix-dropdown-menu-trigger-width)}.tw\\:w-auto{width:auto}.tw\\:w-fit{width:fit-content}.tw\\:w-full{width:100%}.tw\\:w-max{width:max-content}.tw\\:w-px{width:1px}.tw\\:max-w-\\(--skeleton-width\\){max-width:var(--skeleton-width)}.tw\\:max-w-2xl{max-width:var(--tw-container-2xl)}.tw\\:max-w-3xl{max-width:var(--tw-container-3xl)}.tw\\:max-w-4xl{max-width:var(--tw-container-4xl)}.tw\\:max-w-5{max-width:calc(calc(var(--spacing)) * 5)}.tw\\:max-w-6xl{max-width:var(--tw-container-6xl)}.tw\\:max-w-40{max-width:calc(calc(var(--spacing)) * 40)}.tw\\:max-w-48{max-width:calc(calc(var(--spacing)) * 48)}.tw\\:max-w-64{max-width:calc(calc(var(--spacing)) * 64)}.tw\\:max-w-96{max-width:calc(calc(var(--spacing)) * 96)}.tw\\:max-w-\\[200px\\]{max-width:200px}.tw\\:max-w-\\[220px\\]{max-width:220px}.tw\\:max-w-\\[calc\\(100\\%-2rem\\)\\]{max-width:calc(100% - 2rem)}.tw\\:max-w-\\[calc\\(100vw-2rem\\)\\]{max-width:calc(100vw - 2rem)}.tw\\:max-w-fit{max-width:fit-content}.tw\\:max-w-full{max-width:100%}.tw\\:max-w-lg{max-width:var(--tw-container-lg)}.tw\\:max-w-md{max-width:var(--tw-container-md)}.tw\\:max-w-none{max-width:none}.tw\\:max-w-sm{max-width:var(--tw-container-sm)}.tw\\:max-w-xs{max-width:var(--tw-container-xs)}.tw\\:min-w-0{min-width:calc(calc(var(--spacing)) * 0)}.tw\\:min-w-4{min-width:calc(calc(var(--spacing)) * 4)}.tw\\:min-w-5{min-width:calc(calc(var(--spacing)) * 5)}.tw\\:min-w-7{min-width:calc(calc(var(--spacing)) * 7)}.tw\\:min-w-8{min-width:calc(calc(var(--spacing)) * 8)}.tw\\:min-w-9{min-width:calc(calc(var(--spacing)) * 9)}.tw\\:min-w-16{min-width:calc(calc(var(--spacing)) * 16)}.tw\\:min-w-32{min-width:calc(calc(var(--spacing)) * 32)}.tw\\:min-w-36{min-width:calc(calc(var(--spacing)) * 36)}.tw\\:min-w-80{min-width:calc(calc(var(--spacing)) * 80)}.tw\\:min-w-\\[12rem\\]{min-width:12rem}.tw\\:min-w-\\[26px\\]{min-width:26px}.tw\\:min-w-\\[96px\\]{min-width:96px}.tw\\:min-w-\\[140px\\]{min-width:140px}.tw\\:min-w-\\[215px\\]{min-width:215px}.tw\\:min-w-\\[500px\\]{min-width:500px}.tw\\:min-w-min{min-width:min-content}.tw\\:flex-1{flex:1}.tw\\:shrink{flex-shrink:1}.tw\\:shrink-0{flex-shrink:0}.tw\\:shrink-\\[9999\\]{flex-shrink:9999}.tw\\:flex-grow,.tw\\:grow,.tw\\:grow-\\[1\\]{flex-grow:1}.tw\\:grow-\\[10\\]{flex-grow:10}.tw\\:basis-0{flex-basis:calc(calc(var(--spacing)) * 0)}.tw\\:caption-bottom{caption-side:bottom}.tw\\:border-collapse{border-collapse:collapse}.tw\\:origin-\\(--radix-context-menu-content-transform-origin\\){transform-origin:var(--radix-context-menu-content-transform-origin)}.tw\\:origin-\\(--radix-dropdown-menu-content-transform-origin\\){transform-origin:var(--radix-dropdown-menu-content-transform-origin)}.tw\\:origin-\\(--radix-menubar-content-transform-origin\\){transform-origin:var(--radix-menubar-content-transform-origin)}.tw\\:origin-\\(--radix-popover-content-transform-origin\\){transform-origin:var(--radix-popover-content-transform-origin)}.tw\\:origin-\\(--radix-select-content-transform-origin\\){transform-origin:var(--radix-select-content-transform-origin)}.tw\\:origin-\\(--radix-tooltip-content-transform-origin\\){transform-origin:var(--radix-tooltip-content-transform-origin)}.tw\\:-translate-x-1\\/2{--tw-translate-x:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:-translate-x-px{--tw-translate-x:-1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:translate-x-px{--tw-translate-x:1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:-translate-y-1\\/2{--tw-translate-y:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:translate-y-0{--tw-translate-y:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rotate-45{rotate:45deg}.tw\\:rotate-180{rotate:180deg}.tw\\:transform{transform:var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,)}.tw\\:animate-none\\!{animation:none!important}.tw\\:animate-pulse{animation:var(--tw-animate-pulse)}.tw\\:animate-spin{animation:var(--tw-animate-spin)}.tw\\:cursor-default{cursor:default}.tw\\:cursor-ew-resize{cursor:ew-resize}.tw\\:cursor-not-allowed{cursor:not-allowed}.tw\\:cursor-pointer{cursor:pointer}.tw\\:cursor-text{cursor:text}.tw\\:touch-none{touch-action:none}.tw\\:resize{resize:both}.tw\\:resize-none{resize:none}.tw\\:scroll-m-20{scroll-margin:calc(calc(var(--spacing)) * 20)}.tw\\:scroll-my-1{scroll-margin-block:calc(calc(var(--spacing)) * 1)}.tw\\:scroll-py-1{scroll-padding-block:calc(calc(var(--spacing)) * 1)}.tw\\:list-inside{list-style-position:inside}.tw\\:list-outside{list-style-position:outside}.tw\\:\\!list-\\[lower-alpha\\]{list-style-type:lower-alpha!important}.tw\\:\\!list-\\[lower-roman\\]{list-style-type:lower-roman!important}.tw\\:\\!list-\\[upper-alpha\\]{list-style-type:upper-alpha!important}.tw\\:\\!list-\\[upper-roman\\]{list-style-type:upper-roman!important}.tw\\:\\!list-decimal{list-style-type:decimal!important}.tw\\:\\!list-disc{list-style-type:disc!important}.tw\\:list-decimal{list-style-type:decimal}.tw\\:list-disc{list-style-type:disc}.tw\\:list-none{list-style-type:none}.tw\\:grid-flow-col{grid-auto-flow:column}.tw\\:grid-flow-row{grid-auto-flow:row}.tw\\:auto-rows-min{grid-auto-rows:min-content}.tw\\:grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}.tw\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.tw\\:grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.tw\\:grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}.tw\\:grid-cols-6{grid-template-columns:repeat(6,minmax(0,1fr))}.tw\\:grid-cols-\\[25\\%_25\\%_50\\%\\]{grid-template-columns:25% 25% 50%}.tw\\:grid-cols-\\[25\\%_50\\%_25\\%\\]{grid-template-columns:25% 50% 25%}.tw\\:grid-cols-\\[auto_auto_auto_auto\\]{grid-template-columns:auto auto auto auto}.tw\\:grid-cols-\\[min-content_1fr\\]{grid-template-columns:min-content 1fr}.tw\\:grid-cols-\\[min-content_min-content_1fr\\]{grid-template-columns:min-content min-content 1fr}.tw\\:grid-cols-subgrid{grid-template-columns:subgrid}.tw\\:flex-col{flex-direction:column}.tw\\:flex-col-reverse{flex-direction:column-reverse}.tw\\:flex-row{flex-direction:row}.tw\\:flex-row-reverse{flex-direction:row-reverse}.tw\\:flex-nowrap{flex-wrap:nowrap}.tw\\:flex-wrap{flex-wrap:wrap}.tw\\:place-content-center{place-content:center}.tw\\:content-center{align-content:center}.tw\\:items-baseline{align-items:baseline}.tw\\:items-center{align-items:center}.tw\\:items-end{align-items:flex-end}.tw\\:items-start{align-items:flex-start}.tw\\:items-stretch{align-items:stretch}.tw\\:justify-between{justify-content:space-between}.tw\\:justify-center{justify-content:center}.tw\\:justify-end{justify-content:flex-end}.tw\\:justify-start{justify-content:flex-start}.tw\\:gap-0{gap:calc(calc(var(--spacing)) * 0)}.tw\\:gap-0\\.5{gap:calc(calc(var(--spacing)) * .5)}.tw\\:gap-1{gap:calc(calc(var(--spacing)) * 1)}.tw\\:gap-1\\.5{gap:calc(calc(var(--spacing)) * 1.5)}.tw\\:gap-1\\.5\\!{gap:calc(calc(var(--spacing)) * 1.5)!important}.tw\\:gap-2{gap:calc(calc(var(--spacing)) * 2)}.tw\\:gap-2\\.5{gap:calc(calc(var(--spacing)) * 2.5)}.tw\\:gap-3{gap:calc(calc(var(--spacing)) * 3)}.tw\\:gap-4{gap:calc(calc(var(--spacing)) * 4)}.tw\\:gap-5{gap:calc(calc(var(--spacing)) * 5)}.tw\\:gap-6{gap:calc(calc(var(--spacing)) * 6)}.tw\\:gap-16{gap:calc(calc(var(--spacing)) * 16)}.tw\\:gap-\\[--spacing\\(var\\(--gap\\)\\)\\]{gap:calc(calc(var(--spacing)) * var(--gap))}.tw\\:gap-\\[12px\\]{gap:12px}:where(.tw\\:space-y-1>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 1) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 1) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-1\\.5>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 1.5) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 1.5) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-2>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 2) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 2) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-3>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 3) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 3) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-4>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 4) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 4) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-6>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 6) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 6) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-8>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 8) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 8) * calc(1 - var(--tw-space-y-reverse)))}.tw\\:gap-x-1{column-gap:calc(calc(var(--spacing)) * 1)}.tw\\:gap-x-2{column-gap:calc(calc(var(--spacing)) * 2)}.tw\\:gap-x-3{column-gap:calc(calc(var(--spacing)) * 3)}.tw\\:gap-x-4{column-gap:calc(calc(var(--spacing)) * 4)}:where(.tw\\:-space-x-2>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * -2) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * -2) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-2>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 2) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 2) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-3>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 3) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 3) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-4>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 4) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 4) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-6>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 6) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 6) * calc(1 - var(--tw-space-x-reverse)))}.tw\\:gap-y-1{row-gap:calc(calc(var(--spacing)) * 1)}.tw\\:gap-y-2{row-gap:calc(calc(var(--spacing)) * 2)}:where(.tw\\:divide-x>:not(:last-child)){--tw-divide-x-reverse:0;border-inline-style:var(--tw-border-style);border-inline-start-width:calc(1px * var(--tw-divide-x-reverse));border-inline-end-width:calc(1px * calc(1 - var(--tw-divide-x-reverse)))}:where(.tw\\:divide-y>:not(:last-child)){--tw-divide-y-reverse:0;border-bottom-style:var(--tw-border-style);border-top-style:var(--tw-border-style);border-top-width:calc(1px * var(--tw-divide-y-reverse));border-bottom-width:calc(1px * calc(1 - var(--tw-divide-y-reverse)))}.tw\\:self-start{align-self:flex-start}.tw\\:self-stretch{align-self:stretch}.tw\\:justify-self-end{justify-self:flex-end}.tw\\:truncate{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.tw\\:overflow-auto{overflow:auto}.tw\\:overflow-clip{overflow:clip}.tw\\:overflow-hidden{overflow:hidden}.tw\\:overflow-scroll{overflow:scroll}.tw\\:overflow-visible{overflow:visible}.tw\\:overflow-x-auto{overflow-x:auto}.tw\\:overflow-x-hidden{overflow-x:hidden}.tw\\:overflow-y-auto{overflow-y:auto}.tw\\:overflow-y-hidden{overflow-y:hidden}.tw\\:rounded{border-radius:.25rem}.tw\\:rounded-2xl{border-radius:calc(var(--radius) * 1.8)}.tw\\:rounded-4xl{border-radius:calc(var(--radius) * 2.6)}.tw\\:rounded-\\[4px\\]{border-radius:4px}.tw\\:rounded-\\[6px\\]{border-radius:6px}.tw\\:rounded-\\[calc\\(var\\(--radius\\)-3px\\)\\]{border-radius:calc(var(--radius) - 3px)}.tw\\:rounded-\\[min\\(var\\(--tw-radius-md\\)\\,10px\\)\\]{border-radius:min(var(--tw-radius-md), 10px)}.tw\\:rounded-\\[min\\(var\\(--tw-radius-md\\)\\,12px\\)\\]{border-radius:min(var(--tw-radius-md), 12px)}.tw\\:rounded-full{border-radius:3.40282e38px}.tw\\:rounded-lg{border-radius:var(--radius)}.tw\\:rounded-lg\\!{border-radius:var(--radius)!important}.tw\\:rounded-md{border-radius:calc(var(--radius) * .8)}.tw\\:rounded-none{border-radius:0}.tw\\:rounded-sm{border-radius:calc(var(--radius) * .6)}.tw\\:rounded-xl{border-radius:calc(var(--radius) * 1.4)}.tw\\:rounded-xl\\!{border-radius:calc(var(--radius) * 1.4)!important}.tw\\:rounded-xs{border-radius:var(--tw-radius-xs)}.tw\\:rounded-s-none{border-start-start-radius:0;border-end-start-radius:0}.tw\\:rounded-e-none{border-start-end-radius:0;border-end-end-radius:0}.tw\\:rounded-t-xl{border-top-left-radius:calc(var(--radius) * 1.4);border-top-right-radius:calc(var(--radius) * 1.4)}.tw\\:rounded-l-lg{border-top-left-radius:var(--radius);border-bottom-left-radius:var(--radius)}.tw\\:rounded-r-xl{border-top-right-radius:calc(var(--radius) * 1.4);border-bottom-right-radius:calc(var(--radius) * 1.4)}.tw\\:rounded-b-xl{border-bottom-right-radius:calc(var(--radius) * 1.4);border-bottom-left-radius:calc(var(--radius) * 1.4)}.tw\\:border{border-style:var(--tw-border-style);border-width:1px}.tw\\:border-0{border-style:var(--tw-border-style);border-width:0}.tw\\:border-2{border-style:var(--tw-border-style);border-width:2px}.tw\\:border-s{border-inline-start-style:var(--tw-border-style);border-inline-start-width:1px}.tw\\:border-s-0{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:border-s-2{border-inline-start-style:var(--tw-border-style);border-inline-start-width:2px}.tw\\:border-e{border-inline-end-style:var(--tw-border-style);border-inline-end-width:1px}.tw\\:border-e-0{border-inline-end-style:var(--tw-border-style);border-inline-end-width:0}.tw\\:border-t{border-top-style:var(--tw-border-style);border-top-width:1px}.tw\\:border-t-0{border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:border-b{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}.tw\\:border-b-0{border-bottom-style:var(--tw-border-style);border-bottom-width:0}.tw\\:border-l-2{border-left-style:var(--tw-border-style);border-left-width:2px}.tw\\:border-l-4{border-left-style:var(--tw-border-style);border-left-width:4px}.tw\\:border-dashed{--tw-border-style:dashed;border-style:dashed}.tw\\:border-none{--tw-border-style:none;border-style:none}.tw\\:border-solid{--tw-border-style:solid;border-style:solid}.tw\\:border-black{border-color:var(--tw-color-black)}.tw\\:border-blue-400{border-color:var(--tw-color-blue-400)}.tw\\:border-blue-500{border-color:var(--tw-color-blue-500)}.tw\\:border-border,.tw\\:border-border\\/50{border-color:var(--border)}@supports (color:color-mix(in lab, red, red)){.tw\\:border-border\\/50{border-color:color-mix(in oklab, var(--border) 50%, transparent)}}.tw\\:border-destructive{border-color:var(--destructive)}.tw\\:border-gray-300{border-color:var(--tw-color-gray-300)}.tw\\:border-input,.tw\\:border-input\\/30{border-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:border-input\\/30{border-color:color-mix(in oklab, var(--input) 30%, transparent)}}.tw\\:border-muted-foreground,.tw\\:border-muted-foreground\\/40{border-color:var(--muted-foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:border-muted-foreground\\/40{border-color:color-mix(in oklab, var(--muted-foreground) 40%, transparent)}}.tw\\:border-primary{border-color:var(--primary)}.tw\\:border-red-300{border-color:var(--tw-color-red-300)}.tw\\:border-red-400{border-color:var(--tw-color-red-400)}.tw\\:border-red-500{border-color:var(--tw-color-red-500)}.tw\\:border-red-600{border-color:var(--tw-color-red-600)}.tw\\:border-ring{border-color:var(--ring)}.tw\\:border-sidebar-border{border-color:var(--sidebar-border)}.tw\\:border-slate-300{border-color:var(--tw-color-slate-300)}.tw\\:border-transparent{border-color:#0000}.tw\\:border-yellow-400{border-color:var(--tw-color-yellow-400)}.tw\\:border-yellow-500{border-color:var(--tw-color-yellow-500)}.tw\\:border-s-amber-200{border-inline-start-color:var(--tw-color-amber-200)}.tw\\:border-s-indigo-200{border-inline-start-color:var(--tw-color-indigo-200)}.tw\\:border-s-purple-200{border-inline-start-color:var(--tw-color-purple-200)}.tw\\:border-s-red-200{border-inline-start-color:var(--tw-color-red-200)}.tw\\:\\!bg-destructive\\/50{background-color:var(--destructive)!important}@supports (color:color-mix(in lab, red, red)){.tw\\:\\!bg-destructive\\/50{background-color:color-mix(in oklab, var(--destructive) 50%, transparent)!important}}.tw\\:bg-\\[color-mix\\(in_oklab\\,var\\(--destructive\\)_10\\%\\,var\\(--background\\)\\)\\]{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-\\[color-mix\\(in_oklab\\,var\\(--destructive\\)_10\\%\\,var\\(--background\\)\\)\\]{background-color:color-mix(in oklab,var(--destructive) 10%,var(--background))}}.tw\\:bg-accent,.tw\\:bg-accent\\/50{background-color:var(--accent)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-accent\\/50{background-color:color-mix(in oklab, var(--accent) 50%, transparent)}}.tw\\:bg-amber-500,.tw\\:bg-amber-500\\/5{background-color:var(--tw-color-amber-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-amber-500\\/5{background-color:color-mix(in oklab, var(--tw-color-amber-500) 5%, transparent)}}.tw\\:bg-amber-500\\/15{background-color:var(--tw-color-amber-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-amber-500\\/15{background-color:color-mix(in oklab, var(--tw-color-amber-500) 15%, transparent)}}.tw\\:bg-background,.tw\\:bg-background\\/50{background-color:var(--background)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-background\\/50{background-color:color-mix(in oklab, var(--background) 50%, transparent)}}.tw\\:bg-black\\/10{background-color:var(--tw-color-black)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-black\\/10{background-color:color-mix(in oklab, var(--tw-color-black) 10%, transparent)}}.tw\\:bg-blue-50{background-color:var(--tw-color-blue-50)}.tw\\:bg-blue-100{background-color:var(--tw-color-blue-100)}.tw\\:bg-blue-400{background-color:var(--tw-color-blue-400)}.tw\\:bg-blue-500{background-color:var(--tw-color-blue-500)}.tw\\:bg-border{background-color:var(--border)}.tw\\:bg-card{background-color:var(--card)}.tw\\:bg-destructive\\/10{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-destructive\\/10{background-color:color-mix(in oklab, var(--destructive) 10%, transparent)}}.tw\\:bg-foreground{background-color:var(--foreground)}.tw\\:bg-gray-50{background-color:var(--tw-color-gray-50)}.tw\\:bg-gray-100{background-color:var(--tw-color-gray-100)}.tw\\:bg-gray-500{background-color:var(--tw-color-gray-500)}.tw\\:bg-green-50{background-color:var(--tw-color-green-50)}.tw\\:bg-green-100{background-color:var(--tw-color-green-100)}.tw\\:bg-green-500{background-color:var(--tw-color-green-500)}.tw\\:bg-input,.tw\\:bg-input\\/30{background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-input\\/30{background-color:color-mix(in oklab, var(--input) 30%, transparent)}}.tw\\:bg-muted,.tw\\:bg-muted\\/50{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-muted\\/50{background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:bg-neutral-300{background-color:var(--tw-color-neutral-300)}.tw\\:bg-orange-100{background-color:var(--tw-color-orange-100)}.tw\\:bg-popover,.tw\\:bg-popover\\/70{background-color:var(--popover)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-popover\\/70{background-color:color-mix(in oklab, var(--popover) 70%, transparent)}}.tw\\:bg-primary{background-color:var(--primary)}.tw\\:bg-primary-foreground{background-color:var(--primary-foreground)}.tw\\:bg-primary\\/30{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-primary\\/30{background-color:color-mix(in oklab, var(--primary) 30%, transparent)}}.tw\\:bg-purple-50{background-color:var(--tw-color-purple-50)}.tw\\:bg-red-100{background-color:var(--tw-color-red-100)}.tw\\:bg-red-500{background-color:var(--tw-color-red-500)}.tw\\:bg-rose-500,.tw\\:bg-rose-500\\/5{background-color:var(--tw-color-rose-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-rose-500\\/5{background-color:color-mix(in oklab, var(--tw-color-rose-500) 5%, transparent)}}.tw\\:bg-rose-500\\/15{background-color:var(--tw-color-rose-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-rose-500\\/15{background-color:color-mix(in oklab, var(--tw-color-rose-500) 15%, transparent)}}.tw\\:bg-secondary{background-color:var(--secondary)}.tw\\:bg-sidebar{background-color:var(--sidebar)}.tw\\:bg-sidebar-accent{background-color:var(--sidebar-accent)}.tw\\:bg-sidebar-border{background-color:var(--sidebar-border)}.tw\\:bg-sky-500,.tw\\:bg-sky-500\\/5{background-color:var(--tw-color-sky-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-sky-500\\/5{background-color:color-mix(in oklab, var(--tw-color-sky-500) 5%, transparent)}}.tw\\:bg-sky-500\\/15{background-color:var(--tw-color-sky-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-sky-500\\/15{background-color:color-mix(in oklab, var(--tw-color-sky-500) 15%, transparent)}}.tw\\:bg-teal-500,.tw\\:bg-teal-500\\/5{background-color:var(--tw-color-teal-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-teal-500\\/5{background-color:color-mix(in oklab, var(--tw-color-teal-500) 5%, transparent)}}.tw\\:bg-teal-500\\/15{background-color:var(--tw-color-teal-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-teal-500\\/15{background-color:color-mix(in oklab, var(--tw-color-teal-500) 15%, transparent)}}.tw\\:bg-transparent{background-color:#0000}.tw\\:bg-white{background-color:var(--tw-color-white)}.tw\\:bg-yellow-50{background-color:var(--tw-color-yellow-50)}.tw\\:bg-yellow-100{background-color:var(--tw-color-yellow-100)}.tw\\:bg-yellow-500{background-color:var(--tw-color-yellow-500)}.tw\\:bg-zinc-400{background-color:var(--tw-color-zinc-400)}.tw\\:bg-clip-padding{background-clip:padding-box}.tw\\:fill-\\[color-mix\\(in_oklab\\,var\\(--destructive\\)_10\\%\\,var\\(--background\\)\\)\\]{fill:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:fill-\\[color-mix\\(in_oklab\\,var\\(--destructive\\)_10\\%\\,var\\(--background\\)\\)\\]{fill:color-mix(in oklab,var(--destructive) 10%,var(--background))}}.tw\\:fill-destructive{fill:var(--destructive)}.tw\\:fill-foreground{fill:var(--foreground)}.tw\\:fill-yellow-400,.tw\\:fill-yellow-400\\/50{fill:var(--tw-color-yellow-400)}@supports (color:color-mix(in lab, red, red)){.tw\\:fill-yellow-400\\/50{fill:color-mix(in oklab, var(--tw-color-yellow-400) 50%, transparent)}}.tw\\:object-cover{object-fit:cover}.tw\\:\\!p-4{padding:calc(calc(var(--spacing)) * 4)!important}.tw\\:p-0{padding:calc(calc(var(--spacing)) * 0)}.tw\\:p-0\\.5{padding:calc(calc(var(--spacing)) * .5)}.tw\\:p-1{padding:calc(calc(var(--spacing)) * 1)}.tw\\:p-2{padding:calc(calc(var(--spacing)) * 2)}.tw\\:p-2\\.5{padding:calc(calc(var(--spacing)) * 2.5)}.tw\\:p-3{padding:calc(calc(var(--spacing)) * 3)}.tw\\:p-4{padding:calc(calc(var(--spacing)) * 4)}.tw\\:p-6{padding:calc(calc(var(--spacing)) * 6)}.tw\\:p-8{padding:calc(calc(var(--spacing)) * 8)}.tw\\:p-\\[1px\\]{padding:1px}.tw\\:p-\\[3px\\]{padding:3px}.tw\\:p-\\[10px\\]{padding:10px}.tw\\:p-\\[16px\\]{padding:16px}.tw\\:px-0{padding-inline:calc(calc(var(--spacing)) * 0)}.tw\\:px-0\\.5{padding-inline:calc(calc(var(--spacing)) * .5)}.tw\\:px-1{padding-inline:calc(calc(var(--spacing)) * 1)}.tw\\:px-1\\.5{padding-inline:calc(calc(var(--spacing)) * 1.5)}.tw\\:px-2{padding-inline:calc(calc(var(--spacing)) * 2)}.tw\\:px-2\\.5{padding-inline:calc(calc(var(--spacing)) * 2.5)}.tw\\:px-3{padding-inline:calc(calc(var(--spacing)) * 3)}.tw\\:px-4{padding-inline:calc(calc(var(--spacing)) * 4)}.tw\\:px-6{padding-inline:calc(calc(var(--spacing)) * 6)}.tw\\:py-0{padding-block:calc(calc(var(--spacing)) * 0)}.tw\\:py-0\\.5{padding-block:calc(calc(var(--spacing)) * .5)}.tw\\:py-1{padding-block:calc(calc(var(--spacing)) * 1)}.tw\\:py-1\\.5{padding-block:calc(calc(var(--spacing)) * 1.5)}.tw\\:py-2{padding-block:calc(calc(var(--spacing)) * 2)}.tw\\:py-3{padding-block:calc(calc(var(--spacing)) * 3)}.tw\\:py-4{padding-block:calc(calc(var(--spacing)) * 4)}.tw\\:py-6{padding-block:calc(calc(var(--spacing)) * 6)}.tw\\:py-8{padding-block:calc(calc(var(--spacing)) * 8)}.tw\\:py-\\[2px\\]{padding-block:2px}.tw\\:ps-1\\.5{padding-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:ps-2{padding-inline-start:calc(calc(var(--spacing)) * 2)}.tw\\:ps-2\\.5{padding-inline-start:calc(calc(var(--spacing)) * 2.5)}.tw\\:ps-4{padding-inline-start:calc(calc(var(--spacing)) * 4)}.tw\\:ps-7{padding-inline-start:calc(calc(var(--spacing)) * 7)}.tw\\:ps-8{padding-inline-start:calc(calc(var(--spacing)) * 8)}.tw\\:ps-9{padding-inline-start:calc(calc(var(--spacing)) * 9)}.tw\\:ps-12{padding-inline-start:calc(calc(var(--spacing)) * 12)}.tw\\:ps-\\[85px\\]{padding-inline-start:85px}.tw\\:pe-1{padding-inline-end:calc(calc(var(--spacing)) * 1)}.tw\\:pe-1\\.5{padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:pe-2{padding-inline-end:calc(calc(var(--spacing)) * 2)}.tw\\:pe-4{padding-inline-end:calc(calc(var(--spacing)) * 4)}.tw\\:pe-8{padding-inline-end:calc(calc(var(--spacing)) * 8)}.tw\\:pe-9{padding-inline-end:calc(calc(var(--spacing)) * 9)}.tw\\:pe-\\[calc\\(138px\\+1rem\\)\\]{padding-inline-end:calc(138px + 1rem)}.tw\\:pe-\\[…\\]{padding-inline-end:…}.tw\\:pt-1{padding-top:calc(calc(var(--spacing)) * 1)}.tw\\:pt-2{padding-top:calc(calc(var(--spacing)) * 2)}.tw\\:pt-3{padding-top:calc(calc(var(--spacing)) * 3)}.tw\\:pt-4{padding-top:calc(calc(var(--spacing)) * 4)}.tw\\:pt-6{padding-top:calc(calc(var(--spacing)) * 6)}.tw\\:\\!pr-10{padding-right:calc(calc(var(--spacing)) * 10)!important}.tw\\:pr-0{padding-right:calc(calc(var(--spacing)) * 0)}.tw\\:pr-1{padding-right:calc(calc(var(--spacing)) * 1)}.tw\\:pr-2{padding-right:calc(calc(var(--spacing)) * 2)}.tw\\:pr-3{padding-right:calc(calc(var(--spacing)) * 3)}.tw\\:pr-4{padding-right:calc(calc(var(--spacing)) * 4)}.tw\\:pb-0{padding-bottom:calc(calc(var(--spacing)) * 0)}.tw\\:pb-1{padding-bottom:calc(calc(var(--spacing)) * 1)}.tw\\:pb-2{padding-bottom:calc(calc(var(--spacing)) * 2)}.tw\\:pb-3{padding-bottom:calc(calc(var(--spacing)) * 3)}.tw\\:pb-4{padding-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:pb-8{padding-bottom:calc(calc(var(--spacing)) * 8)}.tw\\:pb-12{padding-bottom:calc(calc(var(--spacing)) * 12)}.tw\\:pb-16{padding-bottom:calc(calc(var(--spacing)) * 16)}.tw\\:pb-24{padding-bottom:calc(calc(var(--spacing)) * 24)}.tw\\:pl-2{padding-left:calc(calc(var(--spacing)) * 2)}.tw\\:pl-3{padding-left:calc(calc(var(--spacing)) * 3)}.tw\\:pl-4{padding-left:calc(calc(var(--spacing)) * 4)}.tw\\:pl-5{padding-left:calc(calc(var(--spacing)) * 5)}.tw\\:pl-6{padding-left:calc(calc(var(--spacing)) * 6)}.tw\\:pl-8{padding-left:calc(calc(var(--spacing)) * 8)}.tw\\:text-center{text-align:center}.tw\\:text-end{text-align:end}.tw\\:text-left{text-align:left}.tw\\:text-right{text-align:right}.tw\\:text-start{text-align:start}.tw\\:align-middle{vertical-align:middle}.tw\\:font-heading{font-family:var(--font-sans)}.tw\\:font-mono{font-family:var(--tw-font-mono)}.tw\\:font-sans{font-family:IBM Plex Sans Variable,sans-serif}.tw\\:text-2xl{font-size:var(--tw-text-2xl);line-height:var(--tw-leading,var(--tw-text-2xl--line-height))}.tw\\:text-3xl{font-size:var(--tw-text-3xl);line-height:var(--tw-leading,var(--tw-text-3xl--line-height))}.tw\\:text-4xl{font-size:var(--tw-text-4xl);line-height:var(--tw-leading,var(--tw-text-4xl--line-height))}.tw\\:text-base{font-size:var(--tw-text-base);line-height:var(--tw-leading,var(--tw-text-base--line-height))}.tw\\:text-lg{font-size:var(--tw-text-lg);line-height:var(--tw-leading,var(--tw-text-lg--line-height))}.tw\\:text-sm{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:text-sm\\/relaxed{font-size:var(--tw-text-sm);line-height:var(--tw-leading-relaxed)}.tw\\:text-xl{font-size:var(--tw-text-xl);line-height:var(--tw-leading,var(--tw-text-xl--line-height))}.tw\\:text-xs{font-size:var(--tw-text-xs);line-height:var(--tw-leading,var(--tw-text-xs--line-height))}.tw\\:text-\\[0\\.8rem\\]{font-size:.8rem}.tw\\:leading-6{--tw-leading:calc(calc(var(--spacing)) * 6);line-height:calc(calc(var(--spacing)) * 6)}.tw\\:leading-loose{--tw-leading:var(--tw-leading-loose);line-height:var(--tw-leading-loose)}.tw\\:leading-none{--tw-leading:1;line-height:1}.tw\\:leading-relaxed{--tw-leading:var(--tw-leading-relaxed);line-height:var(--tw-leading-relaxed)}.tw\\:leading-snug{--tw-leading:var(--tw-leading-snug);line-height:var(--tw-leading-snug)}.tw\\:leading-tight{--tw-leading:var(--tw-leading-tight);line-height:var(--tw-leading-tight)}.tw\\:font-bold{--tw-font-weight:var(--tw-font-weight-bold);font-weight:var(--tw-font-weight-bold)}.tw\\:font-extrabold{--tw-font-weight:var(--tw-font-weight-extrabold);font-weight:var(--tw-font-weight-extrabold)}.tw\\:font-medium{--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}.tw\\:font-normal{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:font-semibold{--tw-font-weight:var(--tw-font-weight-semibold);font-weight:var(--tw-font-weight-semibold)}.tw\\:tracking-tight{--tw-tracking:var(--tw-tracking-tight);letter-spacing:var(--tw-tracking-tight)}.tw\\:tracking-wider{--tw-tracking:var(--tw-tracking-wider);letter-spacing:var(--tw-tracking-wider)}.tw\\:tracking-widest{--tw-tracking:var(--tw-tracking-widest);letter-spacing:var(--tw-tracking-widest)}.tw\\:text-balance{text-wrap:balance}.tw\\:text-nowrap{text-wrap:nowrap}.tw\\:break-words{overflow-wrap:break-word}.tw\\:text-clip{text-overflow:clip}.tw\\:text-ellipsis{text-overflow:ellipsis}.tw\\:whitespace-normal{white-space:normal}.tw\\:whitespace-nowrap{white-space:nowrap}.tw\\:whitespace-pre{white-space:pre}.tw\\:whitespace-pre-line{white-space:pre-line}.tw\\:whitespace-pre-wrap{white-space:pre-wrap}.tw\\:\\[color\\:blue\\]{color:#00f}.tw\\:text-accent-foreground{color:var(--accent-foreground)}.tw\\:text-amber-600{color:var(--tw-color-amber-600)}.tw\\:text-background{color:var(--background)}.tw\\:text-blue-400{color:var(--tw-color-blue-400)}.tw\\:text-blue-500{color:var(--tw-color-blue-500)}.tw\\:text-blue-600{color:var(--tw-color-blue-600)}.tw\\:text-blue-800{color:var(--tw-color-blue-800)}.tw\\:text-card-foreground{color:var(--card-foreground)}.tw\\:text-current{color:currentColor}.tw\\:text-destructive{color:var(--destructive)}.tw\\:text-foreground{color:var(--foreground)}.tw\\:text-foreground\\!{color:var(--foreground)!important}.tw\\:text-foreground\\/30{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/30{color:color-mix(in oklab, var(--foreground) 30%, transparent)}}.tw\\:text-foreground\\/50{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/50{color:color-mix(in oklab, var(--foreground) 50%, transparent)}}.tw\\:text-foreground\\/60{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/60{color:color-mix(in oklab, var(--foreground) 60%, transparent)}}.tw\\:text-foreground\\/70{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/70{color:color-mix(in oklab, var(--foreground) 70%, transparent)}}.tw\\:text-gray-300{color:var(--tw-color-gray-300)}.tw\\:text-gray-500{color:var(--tw-color-gray-500)}.tw\\:text-gray-600{color:var(--tw-color-gray-600)}.tw\\:text-gray-700{color:var(--tw-color-gray-700)}.tw\\:text-gray-800{color:var(--tw-color-gray-800)}.tw\\:text-green-600{color:var(--tw-color-green-600)}.tw\\:text-green-700{color:var(--tw-color-green-700)}.tw\\:text-green-800{color:var(--tw-color-green-800)}.tw\\:text-inherit{color:inherit}.tw\\:text-muted-foreground,.tw\\:text-muted-foreground\\/50{color:var(--muted-foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-muted-foreground\\/50{color:color-mix(in oklab, var(--muted-foreground) 50%, transparent)}}.tw\\:text-orange-800{color:var(--tw-color-orange-800)}.tw\\:text-popover-foreground{color:var(--popover-foreground)}.tw\\:text-primary{color:var(--primary)}.tw\\:text-primary-foreground{color:var(--primary-foreground)}.tw\\:text-purple-900{color:var(--tw-color-purple-900)}.tw\\:text-red-500{color:var(--tw-color-red-500)}.tw\\:text-red-600{color:var(--tw-color-red-600)}.tw\\:text-red-700{color:var(--tw-color-red-700)}.tw\\:text-red-800{color:var(--tw-color-red-800)}.tw\\:text-rose-600{color:var(--tw-color-rose-600)}.tw\\:text-secondary-foreground{color:var(--secondary-foreground)}.tw\\:text-sidebar-accent-foreground{color:var(--sidebar-accent-foreground)}.tw\\:text-sidebar-foreground,.tw\\:text-sidebar-foreground\\/70{color:var(--sidebar-foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-sidebar-foreground\\/70{color:color-mix(in oklab, var(--sidebar-foreground) 70%, transparent)}}.tw\\:text-sky-600{color:var(--tw-color-sky-600)}.tw\\:text-slate-900{color:var(--tw-color-slate-900)}.tw\\:text-teal-600{color:var(--tw-color-teal-600)}.tw\\:text-white{color:var(--tw-color-white)}.tw\\:text-yellow-400{color:var(--tw-color-yellow-400)}.tw\\:text-yellow-600{color:var(--tw-color-yellow-600)}.tw\\:text-yellow-700{color:var(--tw-color-yellow-700)}.tw\\:capitalize{text-transform:capitalize}.tw\\:uppercase{text-transform:uppercase}.tw\\:italic{font-style:italic}.tw\\:tabular-nums{--tw-numeric-spacing:tabular-nums;font-variant-numeric:var(--tw-ordinal,) var(--tw-slashed-zero,) var(--tw-numeric-figure,) var(--tw-numeric-spacing,) var(--tw-numeric-fraction,)}.tw\\:line-through{text-decoration-line:line-through}.tw\\:underline{text-decoration-line:underline}.tw\\:decoration-destructive{-webkit-text-decoration-color:var(--destructive);-webkit-text-decoration-color:var(--destructive);text-decoration-color:var(--destructive)}.tw\\:underline-offset-4{text-underline-offset:4px}.tw\\:opacity-0{opacity:0}.tw\\:opacity-40{opacity:.4}.tw\\:opacity-50{opacity:.5}.tw\\:opacity-60{opacity:.6}.tw\\:opacity-100{opacity:1}.tw\\:bg-blend-color{background-blend-mode:color}.tw\\:shadow{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-\\[0_0_0_1px_var\\(--sidebar-border\\)\\]{--tw-shadow:0 0 0 1px var(--tw-shadow-color,var(--sidebar-border));box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-lg{--tw-shadow:0 10px 15px -3px var(--tw-shadow-color,#0000001a), 0 4px 6px -4px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-md{--tw-shadow:0 4px 6px -1px var(--tw-shadow-color,#0000001a), 0 2px 4px -2px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-none{--tw-shadow:0 0 #0000;box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-none\\!{--tw-shadow:0 0 #0000!important;box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)!important}.tw\\:shadow-sm{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-xl{--tw-shadow:0 20px 25px -5px var(--tw-shadow-color,#0000001a), 0 8px 10px -6px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-0{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-1{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-2{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-background{--tw-ring-color:var(--background)}.tw\\:ring-foreground\\/10{--tw-ring-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:ring-foreground\\/10{--tw-ring-color:color-mix(in oklab, var(--foreground) 10%, transparent)}}.tw\\:ring-primary{--tw-ring-color:var(--primary)}.tw\\:ring-ring\\/50{--tw-ring-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.tw\\:ring-ring\\/50{--tw-ring-color:color-mix(in oklab, var(--ring) 50%, transparent)}}.tw\\:ring-sidebar-ring{--tw-ring-color:var(--sidebar-ring)}.tw\\:ring-offset-2{--tw-ring-offset-width:2px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}.tw\\:ring-offset-background{--tw-ring-offset-color:var(--background)}.tw\\:ring-offset-white{--tw-ring-offset-color:var(--tw-color-white)}.tw\\:outline-hidden{--tw-outline-style:none;outline-style:none}@media (forced-colors:active){.tw\\:outline-hidden{outline-offset:2px;outline:2px solid #0000}}.tw\\:drop-shadow-sm{--tw-drop-shadow-size:drop-shadow(0 1px 2px var(--tw-drop-shadow-color,#00000026));--tw-drop-shadow:drop-shadow(var(--tw-drop-shadow-sm));filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.tw\\:transition{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to,opacity,box-shadow,transform,translate,scale,rotate,filter,-webkit-backdrop-filter,backdrop-filter,display,content-visibility,overlay,pointer-events;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[color\\,box-shadow\\]{transition-property:color,box-shadow;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[left\\,right\\,width\\]{transition-property:left,right,width;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[margin\\,opacity\\]{transition-property:margin,opacity;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[width\\,height\\,padding\\]{transition-property:width,height,padding;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[width\\]{transition-property:width;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-all{transition-property:all;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-colors{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-opacity{transition-property:opacity;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-transform{transition-property:transform,translate,scale,rotate;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-none{transition-property:none}.tw\\:duration-100{--tw-duration:.1s;transition-duration:.1s}.tw\\:duration-200{--tw-duration:.2s;transition-duration:.2s}.tw\\:ease-linear{--tw-ease:linear;transition-timing-function:linear}.tw\\:prose-quoteless :where(blockquote p:first-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):before,.tw\\:prose-quoteless :where(blockquote p:last-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:none}.tw\\:outline-none{--tw-outline-style:none;outline-style:none}.tw\\:select-none{-webkit-user-select:none;user-select:none}.tw\\:group-focus-within\\/menu-item\\:opacity-100:is(:where(.tw\\:group\\/menu-item):focus-within *){opacity:1}@media (hover:hover){.tw\\:group-hover\\:visible:is(:where(.tw\\:group):hover *){visibility:visible}.tw\\:group-hover\\:hidden:is(:where(.tw\\:group):hover *){display:none}.tw\\:group-hover\\:opacity-100:is(:where(.tw\\:group):hover *),.tw\\:group-hover\\/menu-item\\:opacity-100:is(:where(.tw\\:group\\/menu-item):hover *){opacity:1}}.tw\\:group-focus\\/context-menu-item\\:text-accent-foreground:is(:where(.tw\\:group\\/context-menu-item):focus *),.tw\\:group-focus\\/dropdown-menu-item\\:text-accent-foreground:is(:where(.tw\\:group\\/dropdown-menu-item):focus *),.tw\\:group-focus\\/menubar-item\\:text-accent-foreground:is(:where(.tw\\:group\\/menubar-item):focus *){color:var(--accent-foreground)}.tw\\:group-has-disabled\\/field\\:opacity-50:is(:where(.tw\\:group\\/field):has(:disabled) *){opacity:.5}.tw\\:group-has-data-\\[sidebar\\=menu-action\\]\\/menu-item\\:pe-8:is(:where(.tw\\:group\\/menu-item):has([data-sidebar=menu-action]) *){padding-inline-end:calc(calc(var(--spacing)) * 8)}.tw\\:group-has-data-\\[size\\=lg\\]\\/avatar-group\\:size-10:is(:where(.tw\\:group\\/avatar-group):has([data-size=lg]) *){width:calc(calc(var(--spacing)) * 10);height:calc(calc(var(--spacing)) * 10)}.tw\\:group-has-data-\\[size\\=sm\\]\\/avatar-group\\:size-6:is(:where(.tw\\:group\\/avatar-group):has([data-size=sm]) *){width:calc(calc(var(--spacing)) * 6);height:calc(calc(var(--spacing)) * 6)}.tw\\:group-has-data-\\[slot\\=command-shortcut\\]\\/command-item\\:hidden:is(:where(.tw\\:group\\/command-item):has([data-slot=command-shortcut]) *){display:none}.tw\\:group-has-\\[\\>input\\]\\/input-group\\:pt-2:is(:where(.tw\\:group\\/input-group):has(>input) *){padding-top:calc(calc(var(--spacing)) * 2)}.tw\\:group-has-\\[\\>input\\]\\/input-group\\:pb-2:is(:where(.tw\\:group\\/input-group):has(>input) *){padding-bottom:calc(calc(var(--spacing)) * 2)}.tw\\:group-has-\\[\\>svg\\]\\/alert\\:col-start-2:is(:where(.tw\\:group\\/alert):has(>svg) *){grid-column-start:2}.tw\\:group-data-\\[checked\\=true\\]\\/command-item\\:opacity-100:is(:where(.tw\\:group\\/command-item)[data-checked=true] *){opacity:1}.tw\\:group-data-\\[collapsible\\=icon\\]\\:-mt-8:is(:where(.tw\\:group)[data-collapsible=icon] *){margin-top:calc(calc(var(--spacing)) * -8)}.tw\\:group-data-\\[collapsible\\=icon\\]\\:hidden:is(:where(.tw\\:group)[data-collapsible=icon] *){display:none}.tw\\:group-data-\\[collapsible\\=icon\\]\\:size-8\\!:is(:where(.tw\\:group)[data-collapsible=icon] *){width:calc(calc(var(--spacing)) * 8)!important;height:calc(calc(var(--spacing)) * 8)!important}.tw\\:group-data-\\[collapsible\\=icon\\]\\:w-\\(--sidebar-width-icon\\):is(:where(.tw\\:group)[data-collapsible=icon] *){width:var(--sidebar-width-icon)}.tw\\:group-data-\\[collapsible\\=icon\\]\\:w-\\[calc\\(var\\(--sidebar-width-icon\\)\\+\\(--spacing\\(4\\)\\)\\)\\]:is(:where(.tw\\:group)[data-collapsible=icon] *){width:calc(var(--sidebar-width-icon) + (calc(calc(var(--spacing)) * 4)))}.tw\\:group-data-\\[collapsible\\=icon\\]\\:w-\\[calc\\(var\\(--sidebar-width-icon\\)\\+\\(--spacing\\(4\\)\\)\\+2px\\)\\]:is(:where(.tw\\:group)[data-collapsible=icon] *){width:calc(var(--sidebar-width-icon) + (calc(calc(var(--spacing)) * 4)) + 2px)}.tw\\:group-data-\\[collapsible\\=icon\\]\\:overflow-hidden:is(:where(.tw\\:group)[data-collapsible=icon] *){overflow:hidden}.tw\\:group-data-\\[collapsible\\=icon\\]\\:p-0\\!:is(:where(.tw\\:group)[data-collapsible=icon] *){padding:calc(calc(var(--spacing)) * 0)!important}.tw\\:group-data-\\[collapsible\\=icon\\]\\:p-2\\!:is(:where(.tw\\:group)[data-collapsible=icon] *){padding:calc(calc(var(--spacing)) * 2)!important}.tw\\:group-data-\\[collapsible\\=icon\\]\\:opacity-0:is(:where(.tw\\:group)[data-collapsible=icon] *){opacity:0}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:right-\\[calc\\(var\\(--sidebar-width\\)\\*-1\\)\\]:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){right:calc(var(--sidebar-width) * -1)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:left-\\[calc\\(var\\(--sidebar-width\\)\\*-1\\)\\]:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){left:calc(var(--sidebar-width) * -1)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:w-0:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){width:calc(calc(var(--spacing)) * 0)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:translate-x-0:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){--tw-translate-x:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:group-data-\\[disabled\\=true\\]\\:pointer-events-none:is(:where(.tw\\:group)[data-disabled=true] *){pointer-events:none}.tw\\:group-data-\\[disabled\\=true\\]\\:opacity-50:is(:where(.tw\\:group)[data-disabled=true] *),.tw\\:group-data-\\[disabled\\=true\\]\\/input-group\\:opacity-50:is(:where(.tw\\:group\\/input-group)[data-disabled=true] *){opacity:.5}.tw\\:group-data-\\[side\\=primary\\]\\:-right-4:is(:where(.tw\\:group)[data-side=primary] *){right:calc(calc(var(--spacing)) * -4)}.tw\\:group-data-\\[side\\=primary\\]\\:border-e:is(:where(.tw\\:group)[data-side=primary] *){border-inline-end-style:var(--tw-border-style);border-inline-end-width:1px}.tw\\:group-data-\\[side\\=secondary\\]\\:left-0:is(:where(.tw\\:group)[data-side=secondary] *){left:calc(calc(var(--spacing)) * 0)}.tw\\:group-data-\\[side\\=secondary\\]\\:rotate-180:is(:where(.tw\\:group)[data-side=secondary] *){rotate:180deg}.tw\\:group-data-\\[side\\=secondary\\]\\:border-s:is(:where(.tw\\:group)[data-side=secondary] *){border-inline-start-style:var(--tw-border-style);border-inline-start-width:1px}.tw\\:group-data-\\[size\\=default\\]\\/avatar\\:size-2\\.5:is(:where(.tw\\:group\\/avatar)[data-size=default] *){width:calc(calc(var(--spacing)) * 2.5);height:calc(calc(var(--spacing)) * 2.5)}.tw\\:group-data-\\[size\\=default\\]\\/switch\\:size-4:is(:where(.tw\\:group\\/switch)[data-size=default] *){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[size\\=lg\\]\\/avatar\\:size-3:is(:where(.tw\\:group\\/avatar)[data-size=lg] *){width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[size\\=sm\\]\\/avatar\\:size-2:is(:where(.tw\\:group\\/avatar)[data-size=sm] *){width:calc(calc(var(--spacing)) * 2);height:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[size\\=sm\\]\\/avatar\\:text-xs:is(:where(.tw\\:group\\/avatar)[data-size=sm] *){font-size:var(--tw-text-xs);line-height:var(--tw-leading,var(--tw-text-xs--line-height))}.tw\\:group-data-\\[size\\=sm\\]\\/card\\:p-3:is(:where(.tw\\:group\\/card)[data-size=sm] *){padding:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[size\\=sm\\]\\/card\\:px-3:is(:where(.tw\\:group\\/card)[data-size=sm] *){padding-inline:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[size\\=sm\\]\\/card\\:text-sm:is(:where(.tw\\:group\\/card)[data-size=sm] *){font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:size-3:is(:where(.tw\\:group\\/switch)[data-size=sm] *){width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[spacing\\=0\\]\\/toggle-group\\:rounded-none:is(:where(.tw\\:group\\/toggle-group)[data-spacing="0"] *){border-radius:0}.tw\\:group-data-\\[spacing\\=0\\]\\/toggle-group\\:px-2:is(:where(.tw\\:group\\/toggle-group)[data-spacing="0"] *){padding-inline:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[variant\\=floating\\]\\:rounded-lg:is(:where(.tw\\:group)[data-variant=floating] *){border-radius:var(--radius)}.tw\\:group-data-\\[variant\\=floating\\]\\:shadow-sm:is(:where(.tw\\:group)[data-variant=floating] *){--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:group-data-\\[variant\\=floating\\]\\:ring-1:is(:where(.tw\\:group)[data-variant=floating] *){--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:group-data-\\[variant\\=floating\\]\\:ring-sidebar-border:is(:where(.tw\\:group)[data-variant=floating] *){--tw-ring-color:var(--sidebar-border)}.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:bg-transparent:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *){background-color:#0000}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:mx-auto:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){margin-inline:auto}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:mt-4:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){margin-top:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:block:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){display:block}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:h-1\\.5:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){height:calc(calc(var(--spacing)) * 1.5)}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:w-\\[100px\\]:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){width:100px}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:text-center:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){text-align:center}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:my-auto:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){margin-block:auto}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:me-4:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){margin-inline-end:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:block:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){display:block}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:h-\\[100px\\]:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){height:100px}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:w-1\\.5:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){width:calc(calc(var(--spacing)) * 1.5)}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:my-auto:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){margin-block:auto}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:ms-4:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){margin-inline-start:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:block:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){display:block}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:h-\\[100px\\]:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){height:100px}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:w-1\\.5:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){width:calc(calc(var(--spacing)) * 1.5)}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:mx-auto:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){margin-inline:auto}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:mb-4:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){margin-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:block:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){display:block}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:h-1\\.5:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){height:calc(calc(var(--spacing)) * 1.5)}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:w-\\[100px\\]:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){width:100px}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:text-center:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){text-align:center}.tw\\:group-data-selected\\/command-item\\:text-foreground:is(:where(.tw\\:group\\/command-item):where([data-selected=true]) *){color:var(--foreground)}.tw\\:group-data-horizontal\\/tabs\\:h-8:is(:where(.tw\\:group\\/tabs):where([data-orientation=horizontal]) *){height:calc(calc(var(--spacing)) * 8)}.tw\\:group-data-vertical\\/tabs\\:h-fit:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *){height:fit-content}.tw\\:group-data-vertical\\/tabs\\:w-full:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *){width:100%}.tw\\:group-data-vertical\\/tabs\\:flex-col:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *){flex-direction:column}.tw\\:group-data-vertical\\/tabs\\:justify-start:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *){justify-content:flex-start}@media (hover:hover){.tw\\:peer-hover\\/menu-button\\:text-sidebar-accent-foreground:is(:where(.tw\\:peer\\/menu-button):hover~*){color:var(--sidebar-accent-foreground)}.tw\\:peer-focus\\:group-hover\\:text-blue-500:is(:where(.tw\\:peer):focus~*):is(:where(.tw\\:group):hover *){color:var(--tw-color-blue-500)}}.tw\\:peer-disabled\\:cursor-not-allowed:is(:where(.tw\\:peer):disabled~*){cursor:not-allowed}.tw\\:peer-disabled\\:opacity-50:is(:where(.tw\\:peer):disabled~*){opacity:.5}.tw\\:peer-data-\\[size\\=default\\]\\/menu-button\\:top-1\\.5:is(:where(.tw\\:peer\\/menu-button)[data-size=default]~*){top:calc(calc(var(--spacing)) * 1.5)}.tw\\:peer-data-\\[size\\=lg\\]\\/menu-button\\:top-2\\.5:is(:where(.tw\\:peer\\/menu-button)[data-size=lg]~*){top:calc(calc(var(--spacing)) * 2.5)}.tw\\:peer-data-\\[size\\=sm\\]\\/menu-button\\:top-1:is(:where(.tw\\:peer\\/menu-button)[data-size=sm]~*){top:calc(calc(var(--spacing)) * 1)}.tw\\:peer-data-active\\/menu-button\\:text-sidebar-accent-foreground:is(:is(:where(.tw\\:peer\\/menu-button):where([data-state=active]),:where(.tw\\:peer\\/menu-button):where([data-active]:not([data-active=false])))~*){color:var(--sidebar-accent-foreground)}.tw\\:file\\:inline-flex::file-selector-button{display:inline-flex}.tw\\:file\\:h-6::file-selector-button{height:calc(calc(var(--spacing)) * 6)}.tw\\:file\\:border-0::file-selector-button{border-style:var(--tw-border-style);border-width:0}.tw\\:file\\:bg-transparent::file-selector-button{background-color:#0000}.tw\\:file\\:text-sm::file-selector-button{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:file\\:font-medium::file-selector-button{--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}.tw\\:file\\:text-foreground::file-selector-button{color:var(--foreground)}.tw\\:placeholder\\:text-muted-foreground::placeholder{color:var(--muted-foreground)}.tw\\:placeholder\\:text-slate-400::placeholder{color:var(--tw-color-slate-400)}.tw\\:before\\:pointer-events-none:before{content:var(--tw-content);pointer-events:none}.tw\\:before\\:absolute:before{content:var(--tw-content);position:absolute}.tw\\:before\\:inset-0:before{content:var(--tw-content);inset:calc(calc(var(--spacing)) * 0)}.tw\\:before\\:top-0\\.5:before{content:var(--tw-content);top:calc(calc(var(--spacing)) * .5)}.tw\\:before\\:left-0:before{content:var(--tw-content);left:calc(calc(var(--spacing)) * 0)}.tw\\:before\\:-z-1:before{content:var(--tw-content);z-index:calc(1 * -1)}.tw\\:before\\:block:before{content:var(--tw-content);display:block}.tw\\:before\\:hidden:before{content:var(--tw-content);display:none}.tw\\:before\\:h-4:before{content:var(--tw-content);height:calc(calc(var(--spacing)) * 4)}.tw\\:before\\:w-4:before{content:var(--tw-content);width:calc(calc(var(--spacing)) * 4)}.tw\\:before\\:cursor-pointer:before{content:var(--tw-content);cursor:pointer}.tw\\:before\\:rounded:before{content:var(--tw-content);border-radius:.25rem}.tw\\:before\\:rounded-\\[inherit\\]:before{content:var(--tw-content);border-radius:inherit}.tw\\:before\\:border:before{content:var(--tw-content);border-style:var(--tw-border-style);border-width:1px}.tw\\:before\\:border-primary:before{content:var(--tw-content);border-color:var(--primary)}.tw\\:before\\:bg-primary:before{content:var(--tw-content);background-color:var(--primary)}.tw\\:before\\:bg-cover:before{content:var(--tw-content);background-size:cover}.tw\\:before\\:bg-no-repeat:before{content:var(--tw-content);background-repeat:no-repeat}.tw\\:before\\:backdrop-blur-2xl:before{content:var(--tw-content);--tw-backdrop-blur:blur(var(--tw-blur-2xl));-webkit-backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)}.tw\\:before\\:backdrop-saturate-150:before{content:var(--tw-content);--tw-backdrop-saturate:saturate(150%);-webkit-backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)}.tw\\:before\\:content-\\[\\"\\"\\]:before{--tw-content:"";content:var(--tw-content)}.tw\\:before\\:content-\\[\\\\\\"\\\\\\"\\]:before{--tw-content:\\"\\";content:var(--tw-content)}.tw\\:after\\:absolute:after{content:var(--tw-content);position:absolute}.tw\\:after\\:-inset-2:after{content:var(--tw-content);inset:calc(calc(var(--spacing)) * -2)}.tw\\:after\\:inset-0:after{content:var(--tw-content);inset:calc(calc(var(--spacing)) * 0)}.tw\\:after\\:-inset-x-3:after{content:var(--tw-content);inset-inline:calc(calc(var(--spacing)) * -3)}.tw\\:after\\:-inset-y-2:after{content:var(--tw-content);inset-block:calc(calc(var(--spacing)) * -2)}.tw\\:after\\:inset-y-0:after{content:var(--tw-content);inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:after\\:start-1\\/2:after{content:var(--tw-content);inset-inline-start:50%}.tw\\:after\\:top-\\[6px\\]:after{content:var(--tw-content);top:6px}.tw\\:after\\:right-\\[7px\\]:after{content:var(--tw-content);right:7px}.tw\\:after\\:left-\\[7px\\]:after{content:var(--tw-content);left:7px}.tw\\:after\\:block:after{content:var(--tw-content);display:block}.tw\\:after\\:hidden:after{content:var(--tw-content);display:none}.tw\\:after\\:h-0\\.5:after{content:var(--tw-content);height:calc(calc(var(--spacing)) * .5)}.tw\\:after\\:h-\\[6px\\]:after{content:var(--tw-content);height:6px}.tw\\:after\\:w-1:after{content:var(--tw-content);width:calc(calc(var(--spacing)) * 1)}.tw\\:after\\:w-\\[2px\\]:after{content:var(--tw-content);width:2px}.tw\\:after\\:w-\\[3px\\]:after{content:var(--tw-content);width:3px}.tw\\:after\\:-translate-x-1\\/2:after{content:var(--tw-content);--tw-translate-x:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:after\\:rotate-45:after{content:var(--tw-content);rotate:45deg}.tw\\:after\\:cursor-pointer:after{content:var(--tw-content);cursor:pointer}.tw\\:after\\:rounded-full:after{content:var(--tw-content);border-radius:3.40282e38px}.tw\\:after\\:border:after{content:var(--tw-content);border-style:var(--tw-border-style);border-width:1px}.tw\\:after\\:border-t-0:after{content:var(--tw-content);border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:after\\:border-r-2:after{content:var(--tw-content);border-right-style:var(--tw-border-style);border-right-width:2px}.tw\\:after\\:border-b-2:after{content:var(--tw-content);border-bottom-style:var(--tw-border-style);border-bottom-width:2px}.tw\\:after\\:border-l-0:after{content:var(--tw-content);border-left-style:var(--tw-border-style);border-left-width:0}.tw\\:after\\:border-solid:after{content:var(--tw-content);--tw-border-style:solid;border-style:solid}.tw\\:after\\:border-border:after{content:var(--tw-content);border-color:var(--border)}.tw\\:after\\:border-white:after{content:var(--tw-content);border-color:var(--tw-color-white)}.tw\\:after\\:bg-foreground:after{content:var(--tw-content);background-color:var(--foreground)}.tw\\:after\\:bg-muted:after{content:var(--tw-content);background-color:var(--muted)}.tw\\:after\\:opacity-0:after{content:var(--tw-content);opacity:0}.tw\\:after\\:mix-blend-darken:after{content:var(--tw-content);mix-blend-mode:darken}.tw\\:after\\:transition-opacity:after{content:var(--tw-content);transition-property:opacity;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:after\\:content-\\[\\"\\"\\]:after{--tw-content:"";content:var(--tw-content)}.tw\\:after\\:content-\\[\\\\\\"\\\\\\"\\]:after{--tw-content:\\"\\";content:var(--tw-content)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:after\\:start-full:is(:where(.tw\\:group)[data-collapsible=offcanvas] *):after{content:var(--tw-content);inset-inline-start:100%}.tw\\:group-data-horizontal\\/tabs\\:after\\:inset-x-0:is(:where(.tw\\:group\\/tabs):where([data-orientation=horizontal]) *):after{content:var(--tw-content);inset-inline:calc(calc(var(--spacing)) * 0)}.tw\\:group-data-horizontal\\/tabs\\:after\\:bottom-\\[-5px\\]:is(:where(.tw\\:group\\/tabs):where([data-orientation=horizontal]) *):after{content:var(--tw-content);bottom:-5px}.tw\\:group-data-horizontal\\/tabs\\:after\\:h-0\\.5:is(:where(.tw\\:group\\/tabs):where([data-orientation=horizontal]) *):after{content:var(--tw-content);height:calc(calc(var(--spacing)) * .5)}.tw\\:group-data-vertical\\/tabs\\:after\\:inset-y-0:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *):after{content:var(--tw-content);inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:group-data-vertical\\/tabs\\:after\\:-end-1:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *):after{content:var(--tw-content);inset-inline-end:calc(calc(var(--spacing)) * -1)}.tw\\:group-data-vertical\\/tabs\\:after\\:w-0\\.5:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *):after{content:var(--tw-content);width:calc(calc(var(--spacing)) * .5)}.tw\\:first\\:mt-0:first-child{margin-top:calc(calc(var(--spacing)) * 0)}.tw\\:even\\:bg-muted:nth-child(2n){background-color:var(--muted)}.tw\\:focus-within\\:ring-2:focus-within{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-within\\:ring-ring:focus-within{--tw-ring-color:var(--ring)}.tw\\:focus-within\\:ring-offset-1:focus-within{--tw-ring-offset-width:1px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}@media (hover:hover){.tw\\:hover\\:-mt-4:hover{margin-top:calc(calc(var(--spacing)) * -4)}.tw\\:hover\\:cursor-pointer:hover{cursor:pointer}.tw\\:hover\\:bg-accent:hover,.tw\\:hover\\:bg-accent\\/30:hover{background-color:var(--accent)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-accent\\/30:hover{background-color:color-mix(in oklab, var(--accent) 30%, transparent)}}.tw\\:hover\\:bg-accent\\/80:hover{background-color:var(--accent)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-accent\\/80:hover{background-color:color-mix(in oklab, var(--accent) 80%, transparent)}}.tw\\:hover\\:bg-blue-600:hover{background-color:var(--tw-color-blue-600)}.tw\\:hover\\:bg-destructive\\/20:hover{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-destructive\\/20:hover{background-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:hover\\:bg-gray-50:hover{background-color:var(--tw-color-gray-50)}.tw\\:hover\\:bg-input:hover{background-color:var(--input)}.tw\\:hover\\:bg-muted:hover,.tw\\:hover\\:bg-muted\\/50:hover{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-muted\\/50:hover{background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:hover\\:bg-muted\\/80:hover{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-muted\\/80:hover{background-color:color-mix(in oklab, var(--muted) 80%, transparent)}}.tw\\:hover\\:bg-primary\\/10:hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-primary\\/10:hover{background-color:color-mix(in oklab, var(--primary) 10%, transparent)}}.tw\\:hover\\:bg-primary\\/70:hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-primary\\/70:hover{background-color:color-mix(in oklab, var(--primary) 70%, transparent)}}.tw\\:hover\\:bg-red-500:hover{background-color:var(--tw-color-red-500)}.tw\\:hover\\:bg-secondary:hover,.tw\\:hover\\:bg-secondary\\/80:hover{background-color:var(--secondary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-secondary\\/80:hover{background-color:color-mix(in oklab, var(--secondary) 80%, transparent)}}.tw\\:hover\\:bg-sidebar-accent:hover{background-color:var(--sidebar-accent)}.tw\\:hover\\:bg-transparent:hover{background-color:#0000}.tw\\:hover\\:text-foreground:hover{color:var(--foreground)}.tw\\:hover\\:text-muted-foreground:hover{color:var(--muted-foreground)}.tw\\:hover\\:text-primary-foreground:hover{color:var(--primary-foreground)}.tw\\:hover\\:text-sidebar-accent-foreground:hover{color:var(--sidebar-accent-foreground)}.tw\\:hover\\:underline:hover{text-decoration-line:underline}.tw\\:hover\\:opacity-80:hover{opacity:.8}.tw\\:hover\\:opacity-100:hover{opacity:1}.tw\\:hover\\:shadow-\\[0_0_0_1px_var\\(--sidebar-accent\\)\\]:hover{--tw-shadow:0 0 0 1px var(--tw-shadow-color,var(--sidebar-accent));box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:hover\\:shadow-md:hover{--tw-shadow:0 4px 6px -1px var(--tw-shadow-color,#0000001a), 0 2px 4px -2px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:hover\\:ring-3:hover{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:hover\\:group-data-\\[collapsible\\=offcanvas\\]\\:bg-sidebar:hover:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){background-color:var(--sidebar)}.tw\\:hover\\:after\\:bg-sidebar-border:hover:after{content:var(--tw-content);background-color:var(--sidebar-border)}}.tw\\:focus\\:relative:focus{position:relative}.tw\\:focus\\:z-10:focus{z-index:10}.tw\\:focus\\:bg-accent:focus{background-color:var(--accent)}.tw\\:focus\\:bg-muted:focus{background-color:var(--muted)}.tw\\:focus\\:text-accent-foreground:focus{color:var(--accent-foreground)}.tw\\:focus\\:text-foreground:focus{color:var(--foreground)}.tw\\:focus\\:ring-2:focus{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus\\:ring-ring:focus{--tw-ring-color:var(--ring)}.tw\\:focus\\:ring-offset-1:focus{--tw-ring-offset-width:1px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}.tw\\:focus\\:ring-offset-background:focus{--tw-ring-offset-color:var(--background)}.tw\\:focus\\:outline-hidden:focus{--tw-outline-style:none;outline-style:none}@media (forced-colors:active){.tw\\:focus\\:outline-hidden:focus{outline-offset:2px;outline:2px solid #0000}}:is(.tw\\:focus\\:\\*\\*\\:text-accent-foreground:focus *),:is(.tw\\:not-data-\\[variant\\=destructive\\]\\:focus\\:\\*\\*\\:text-accent-foreground:not([data-variant=destructive]):focus *){color:var(--accent-foreground)}.tw\\:focus-visible\\:relative:focus-visible{position:relative}.tw\\:focus-visible\\:z-10:focus-visible{z-index:10}.tw\\:focus-visible\\:border-destructive\\/40:focus-visible{border-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:focus-visible\\:border-destructive\\/40:focus-visible{border-color:color-mix(in oklab, var(--destructive) 40%, transparent)}}.tw\\:focus-visible\\:border-ring:focus-visible{border-color:var(--ring)}.tw\\:focus-visible\\:ring-0:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-visible\\:ring-1:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-visible\\:ring-2:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-visible\\:ring-3:focus-visible,.tw\\:focus-visible\\:ring-\\[3px\\]:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-visible\\:ring-\\[color\\:hsl\\(240\\,5\\%\\,64\\.9\\%\\)\\]:focus-visible{--tw-ring-color:#a1a1aa}.tw\\:focus-visible\\:ring-destructive\\/20:focus-visible{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:focus-visible\\:ring-destructive\\/20:focus-visible{--tw-ring-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:focus-visible\\:ring-ring:focus-visible,.tw\\:focus-visible\\:ring-ring\\/50:focus-visible{--tw-ring-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.tw\\:focus-visible\\:ring-ring\\/50:focus-visible{--tw-ring-color:color-mix(in oklab, var(--ring) 50%, transparent)}}.tw\\:focus-visible\\:ring-slate-400:focus-visible{--tw-ring-color:var(--tw-color-slate-400)}.tw\\:focus-visible\\:ring-offset-2:focus-visible{--tw-ring-offset-width:2px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}.tw\\:focus-visible\\:outline-hidden:focus-visible{--tw-outline-style:none;outline-style:none}@media (forced-colors:active){.tw\\:focus-visible\\:outline-hidden:focus-visible{outline-offset:2px;outline:2px solid #0000}}.tw\\:focus-visible\\:outline-1:focus-visible{outline-style:var(--tw-outline-style);outline-width:1px}.tw\\:focus-visible\\:outline-ring:focus-visible{outline-color:var(--ring)}.tw\\:focus-visible\\:outline-none:focus-visible{--tw-outline-style:none;outline-style:none}:is(.tw\\:\\*\\:focus-visible\\:relative>*):focus-visible{position:relative}:is(.tw\\:\\*\\:focus-visible\\:z-10>*):focus-visible{z-index:10}.tw\\:active\\:bg-sidebar-accent:active{background-color:var(--sidebar-accent)}.tw\\:active\\:text-sidebar-accent-foreground:active{color:var(--sidebar-accent-foreground)}.tw\\:active\\:ring-3:active{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:active\\:not-aria-\\[haspopup\\]\\:translate-y-px:active:not([aria-haspopup]){--tw-translate-y:1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:active\\:not-aria-\\[haspopup\\]\\:transform-\\[translateY\\(1px\\)\\]:active:not([aria-haspopup]){transform:translateY(1px)}.tw\\:disabled\\:pointer-events-none:disabled{pointer-events:none}.tw\\:disabled\\:cursor-not-allowed:disabled{cursor:not-allowed}.tw\\:disabled\\:bg-input\\/50:disabled{background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:disabled\\:bg-input\\/50:disabled{background-color:color-mix(in oklab, var(--input) 50%, transparent)}}.tw\\:disabled\\:bg-transparent:disabled{background-color:#0000}.tw\\:disabled\\:opacity-50:disabled{opacity:.5}:where([data-side=bottom]) .tw\\:in-data-\\[side\\=bottom\\]\\:translate-y-\\[calc\\(-50\\%-1px\\)\\]{--tw-translate-y:calc(-50% - 1px);translate:var(--tw-translate-x) var(--tw-translate-y)}:where([data-side=bottom]) .tw\\:in-data-\\[side\\=bottom\\]\\:\\[clip-path\\:polygon\\(100\\%_0\\,100\\%_100\\%\\,0_100\\%\\)\\]{clip-path:polygon(100% 0,100% 100%,0 100%)}:where([data-side=primary]) .tw\\:in-data-\\[side\\=primary\\]\\:cursor-w-resize{cursor:w-resize}:where([data-side=secondary]) .tw\\:in-data-\\[side\\=secondary\\]\\:cursor-e-resize{cursor:e-resize}:where([data-side=top]) .tw\\:in-data-\\[side\\=top\\]\\:translate-y-\\[calc\\(-50\\%-1px\\)\\]{--tw-translate-y:calc(-50% - 1px);translate:var(--tw-translate-x) var(--tw-translate-y)}:where([data-side=top]) .tw\\:in-data-\\[side\\=top\\]\\:\\[clip-path\\:polygon\\(100\\%_0\\,100\\%_100\\%\\,0_100\\%\\)\\]{clip-path:polygon(100% 0,100% 100%,0 100%)}:where([data-slot=button-group]) .tw\\:in-data-\\[slot\\=button-group\\]\\:rounded-lg{border-radius:var(--radius)}:where([data-slot=combobox-content]) .tw\\:in-data-\\[slot\\=combobox-content\\]\\:focus-within\\:border-inherit:focus-within{border-color:inherit}:where([data-slot=combobox-content]) .tw\\:in-data-\\[slot\\=combobox-content\\]\\:focus-within\\:ring-0:focus-within{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}:where([data-slot=dialog-content]) .tw\\:in-data-\\[slot\\=dialog-content\\]\\:rounded-lg\\!{border-radius:var(--radius)!important}:where([data-slot=tooltip-content]) .tw\\:in-data-\\[slot\\=tooltip-content\\]\\:bg-background\\/20{background-color:var(--background)}@supports (color:color-mix(in lab, red, red)){:where([data-slot=tooltip-content]) .tw\\:in-data-\\[slot\\=tooltip-content\\]\\:bg-background\\/20{background-color:color-mix(in oklab, var(--background) 20%, transparent)}}:where([data-slot=tooltip-content]) .tw\\:in-data-\\[slot\\=tooltip-content\\]\\:text-background{color:var(--background)}:where([data-slot=tooltip-content]) .tw\\:in-data-\\[slot\\=tooltip-content\\]\\:text-destructive{color:var(--destructive)}.tw\\:has-disabled\\:bg-input\\/50:has(:disabled){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:has-disabled\\:bg-input\\/50:has(:disabled){background-color:color-mix(in oklab, var(--input) 50%, transparent)}}.tw\\:has-disabled\\:opacity-50:has(:disabled){opacity:.5}.tw\\:has-aria-expanded\\:bg-muted\\/50:has([aria-expanded=true]){background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:has-aria-expanded\\:bg-muted\\/50:has([aria-expanded=true]){background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:has-data-\\[icon\\=inline-end\\]\\:pe-1:has([data-icon=inline-end]){padding-inline-end:calc(calc(var(--spacing)) * 1)}.tw\\:has-data-\\[icon\\=inline-end\\]\\:pe-1\\.5:has([data-icon=inline-end]){padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[icon\\=inline-end\\]\\:pe-2:has([data-icon=inline-end]){padding-inline-end:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[spacing\\=0\\]\\/toggle-group\\:has-data-\\[icon\\=inline-end\\]\\:pe-1\\.5:is(:where(.tw\\:group\\/toggle-group)[data-spacing="0"] *):has([data-icon=inline-end]){padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[icon\\=inline-start\\]\\:ps-1:has([data-icon=inline-start]){padding-inline-start:calc(calc(var(--spacing)) * 1)}.tw\\:has-data-\\[icon\\=inline-start\\]\\:ps-1\\.5:has([data-icon=inline-start]){padding-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[icon\\=inline-start\\]\\:ps-2:has([data-icon=inline-start]){padding-inline-start:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[spacing\\=0\\]\\/toggle-group\\:has-data-\\[icon\\=inline-start\\]\\:ps-1\\.5:is(:where(.tw\\:group\\/toggle-group)[data-spacing="0"] *):has([data-icon=inline-start]){padding-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[slot\\=alert-action\\]\\:relative:has([data-slot=alert-action]){position:relative}.tw\\:has-data-\\[slot\\=alert-action\\]\\:pe-18:has([data-slot=alert-action]){padding-inline-end:calc(calc(var(--spacing)) * 18)}.tw\\:has-data-\\[slot\\=card-action\\]\\:grid-cols-\\[1fr_auto\\]:has([data-slot=card-action]){grid-template-columns:1fr auto}.tw\\:has-data-\\[slot\\=card-description\\]\\:grid-rows-\\[auto_auto\\]:has([data-slot=card-description]){grid-template-rows:auto auto}.tw\\:has-data-\\[slot\\=card-footer\\]\\:pb-0:has([data-slot=card-footer]){padding-bottom:calc(calc(var(--spacing)) * 0)}.tw\\:has-data-\\[slot\\=kbd\\]\\:pe-0:has([data-slot=kbd]){padding-inline-end:calc(calc(var(--spacing)) * 0)}.tw\\:has-data-\\[slot\\=kbd\\]\\:pe-1\\.5:has([data-slot=kbd]){padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[variant\\=inset\\]\\:bg-sidebar:has([data-variant=inset]){background-color:var(--sidebar)}.tw\\:has-\\[\\[data-slot\\=input-group-control\\]\\:focus-visible\\]\\:border-ring:has([data-slot=input-group-control]:focus-visible){border-color:var(--ring)}.tw\\:has-\\[\\[data-slot\\=input-group-control\\]\\:focus-visible\\]\\:ring-3:has([data-slot=input-group-control]:focus-visible){--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:has-\\[\\[data-slot\\=input-group-control\\]\\:focus-visible\\]\\:ring-ring\\/50:has([data-slot=input-group-control]:focus-visible){--tw-ring-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.tw\\:has-\\[\\[data-slot\\=input-group-control\\]\\:focus-visible\\]\\:ring-ring\\/50:has([data-slot=input-group-control]:focus-visible){--tw-ring-color:color-mix(in oklab, var(--ring) 50%, transparent)}}.tw\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:border-destructive:has([data-slot][aria-invalid=true]){border-color:var(--destructive)}.tw\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-3:has([data-slot][aria-invalid=true]){--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-destructive\\/20:has([data-slot][aria-invalid=true]){--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-destructive\\/20:has([data-slot][aria-invalid=true]){--tw-ring-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:has-\\[\\>\\[data-align\\=block-end\\]\\]\\:h-auto:has(>[data-align=block-end]){height:auto}.tw\\:has-\\[\\>\\[data-align\\=block-end\\]\\]\\:flex-col:has(>[data-align=block-end]){flex-direction:column}.tw\\:has-\\[\\>\\[data-align\\=block-start\\]\\]\\:h-auto:has(>[data-align=block-start]){height:auto}.tw\\:has-\\[\\>\\[data-align\\=block-start\\]\\]\\:flex-col:has(>[data-align=block-start]){flex-direction:column}.tw\\:has-\\[\\>\\[data-slot\\=button-group\\]\\]\\:gap-2:has(>[data-slot=button-group]){gap:calc(calc(var(--spacing)) * 2)}.tw\\:has-\\[\\>button\\]\\:ms-\\[-0\\.3rem\\]:has(>button){margin-inline-start:-.3rem}.tw\\:has-\\[\\>button\\]\\:me-\\[-0\\.3rem\\]:has(>button){margin-inline-end:-.3rem}.tw\\:has-\\[\\>img\\]\\:grid-cols-\\[auto_1fr\\]:has(>img){grid-template-columns:auto 1fr}.tw\\:has-\\[\\>img\\]\\:gap-x-2:has(>img){column-gap:calc(calc(var(--spacing)) * 2)}.tw\\:has-\\[\\>img\\:first-child\\]\\:pt-0:has(>img:first-child){padding-top:calc(calc(var(--spacing)) * 0)}.tw\\:has-\\[\\>kbd\\]\\:ms-\\[-0\\.15rem\\]:has(>kbd){margin-inline-start:-.15rem}.tw\\:has-\\[\\>kbd\\]\\:me-\\[-0\\.15rem\\]:has(>kbd){margin-inline-end:-.15rem}.tw\\:has-\\[\\>svg\\]\\:grid-cols-\\[auto_1fr\\]:has(>svg){grid-template-columns:auto 1fr}.tw\\:has-\\[\\>svg\\]\\:gap-x-2:has(>svg){column-gap:calc(calc(var(--spacing)) * 2)}.tw\\:has-\\[\\>svg\\]\\:p-0:has(>svg){padding:calc(calc(var(--spacing)) * 0)}.tw\\:has-\\[\\>textarea\\]\\:h-auto:has(>textarea){height:auto}.tw\\:aria-disabled\\:pointer-events-none[aria-disabled=true]{pointer-events:none}.tw\\:aria-disabled\\:opacity-50[aria-disabled=true]{opacity:.5}.tw\\:aria-expanded\\:bg-muted[aria-expanded=true]{background-color:var(--muted)}.tw\\:aria-expanded\\:bg-secondary[aria-expanded=true]{background-color:var(--secondary)}.tw\\:aria-expanded\\:text-foreground[aria-expanded=true]{color:var(--foreground)}.tw\\:aria-expanded\\:text-secondary-foreground[aria-expanded=true]{color:var(--secondary-foreground)}.tw\\:aria-expanded\\:opacity-100[aria-expanded=true]{opacity:1}.tw\\:aria-invalid\\:border-destructive[aria-invalid=true]{border-color:var(--destructive)}.tw\\:aria-invalid\\:ring-0[aria-invalid=true]{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:aria-invalid\\:ring-3[aria-invalid=true]{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:aria-invalid\\:ring-destructive\\/20[aria-invalid=true]{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:aria-invalid\\:ring-destructive\\/20[aria-invalid=true]{--tw-ring-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:aria-invalid\\:aria-checked\\:border-primary[aria-invalid=true][aria-checked=true]{border-color:var(--primary)}.tw\\:aria-pressed\\:bg-muted[aria-pressed=true]{background-color:var(--muted)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:h-px[aria-orientation=horizontal]{height:1px}.tw\\:aria-\\[orientation\\=horizontal\\]\\:w-full[aria-orientation=horizontal]{width:100%}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:start-0[aria-orientation=horizontal]:after{content:var(--tw-content);inset-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:h-1[aria-orientation=horizontal]:after{content:var(--tw-content);height:calc(calc(var(--spacing)) * 1)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:w-full[aria-orientation=horizontal]:after{content:var(--tw-content);width:100%}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:translate-x-0[aria-orientation=horizontal]:after{content:var(--tw-content);--tw-translate-x:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:-translate-y-1\\/2[aria-orientation=horizontal]:after{content:var(--tw-content);--tw-translate-y:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:aria-\\[orientation\\=vertical\\]\\:flex-col[aria-orientation=vertical]{flex-direction:column}.tw\\:data-inset\\:ps-7[data-inset]{padding-inline-start:calc(calc(var(--spacing)) * 7)}.tw\\:data-placeholder\\:text-muted-foreground[data-placeholder]{color:var(--muted-foreground)}.tw\\:data-\\[align-trigger\\=false\\]\\:min-w-36[data-align-trigger=false]{min-width:calc(calc(var(--spacing)) * 36)}.tw\\:data-\\[align-trigger\\=true\\]\\:min-w-\\(--radix-select-trigger-width\\)[data-align-trigger=true]{min-width:var(--radix-select-trigger-width)}.tw\\:data-\\[align-trigger\\=true\\]\\:animate-none[data-align-trigger=true]{animation:none}.tw\\:data-\\[disabled\\=true\\]\\:pointer-events-none[data-disabled=true]{pointer-events:none}.tw\\:data-\\[disabled\\=true\\]\\:opacity-50[data-disabled=true]{opacity:.5}.tw\\:data-\\[position\\=popper\\]\\:h-\\(--radix-select-trigger-height\\)[data-position=popper]{height:var(--radix-select-trigger-height)}.tw\\:data-\\[position\\=popper\\]\\:w-full[data-position=popper]{width:100%}.tw\\:data-\\[position\\=popper\\]\\:min-w-\\(--radix-select-trigger-width\\)[data-position=popper]{min-width:var(--radix-select-trigger-width)}.tw\\:data-\\[side\\=bottom\\]\\:translate-y-1[data-side=bottom]{--tw-translate-y:calc(calc(var(--spacing)) * 1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=bottom\\]\\:slide-in-from-top-2[data-side=bottom]{--tw-enter-translate-y:calc(2*var(--spacing)*-1)}.tw\\:data-\\[side\\=left\\]\\:-translate-x-1[data-side=left]{--tw-translate-x:calc(calc(var(--spacing)) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=left\\]\\:slide-in-from-right-2[data-side=left]{--tw-enter-translate-x:calc(2*var(--spacing))}.tw\\:data-\\[side\\=right\\]\\:translate-x-1[data-side=right]{--tw-translate-x:calc(calc(var(--spacing)) * 1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=right\\]\\:slide-in-from-left-2[data-side=right]{--tw-enter-translate-x:calc(2*var(--spacing)*-1)}.tw\\:data-\\[side\\=top\\]\\:-translate-y-1[data-side=top]{--tw-translate-y:calc(calc(var(--spacing)) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=top\\]\\:slide-in-from-bottom-2[data-side=top]{--tw-enter-translate-y:calc(2*var(--spacing))}.tw\\:data-\\[size\\=default\\]\\:h-8[data-size=default]{height:calc(calc(var(--spacing)) * 8)}.tw\\:data-\\[size\\=default\\]\\:h-\\[18\\.4px\\][data-size=default]{height:18.4px}.tw\\:data-\\[size\\=default\\]\\:w-\\[32px\\][data-size=default]{width:32px}.tw\\:data-\\[size\\=lg\\]\\:size-10[data-size=lg]{width:calc(calc(var(--spacing)) * 10);height:calc(calc(var(--spacing)) * 10)}.tw\\:data-\\[size\\=md\\]\\:text-sm[data-size=md]{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:data-\\[size\\=sm\\]\\:size-6[data-size=sm]{width:calc(calc(var(--spacing)) * 6);height:calc(calc(var(--spacing)) * 6)}.tw\\:data-\\[size\\=sm\\]\\:h-7[data-size=sm]{height:calc(calc(var(--spacing)) * 7)}.tw\\:data-\\[size\\=sm\\]\\:h-\\[14px\\][data-size=sm]{height:14px}.tw\\:data-\\[size\\=sm\\]\\:w-\\[24px\\][data-size=sm]{width:24px}.tw\\:data-\\[size\\=sm\\]\\:gap-3[data-size=sm]{gap:calc(calc(var(--spacing)) * 3)}.tw\\:data-\\[size\\=sm\\]\\:rounded-\\[min\\(var\\(--tw-radius-md\\)\\,10px\\)\\][data-size=sm]{border-radius:min(var(--tw-radius-md), 10px)}.tw\\:data-\\[size\\=sm\\]\\:py-3[data-size=sm]{padding-block:calc(calc(var(--spacing)) * 3)}.tw\\:data-\\[size\\=sm\\]\\:text-xs[data-size=sm]{font-size:var(--tw-text-xs);line-height:var(--tw-leading,var(--tw-text-xs--line-height))}.tw\\:data-\\[size\\=sm\\]\\:has-data-\\[slot\\=card-footer\\]\\:pb-0[data-size=sm]:has([data-slot=card-footer]){padding-bottom:calc(calc(var(--spacing)) * 0)}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-item\\]\\:focus\\:bg-foreground\\/10 *)[data-slot$=-item]:focus{background-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-item\\]\\:focus\\:bg-foreground\\/10 *)[data-slot$=-item]:focus{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)}}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-item\\]\\:data-highlighted\\:bg-foreground\\/10 *)[data-slot$=-item][data-highlighted]{background-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-item\\]\\:data-highlighted\\:bg-foreground\\/10 *)[data-slot$=-item][data-highlighted]{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)}}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-separator\\]\\:bg-foreground\\/5 *)[data-slot$=-separator]{background-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-separator\\]\\:bg-foreground\\/5 *)[data-slot$=-separator]{background-color:color-mix(in oklab, var(--foreground) 5%, transparent)}}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-trigger\\]\\:focus\\:bg-foreground\\/10 *)[data-slot$=-trigger]:focus{background-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-trigger\\]\\:focus\\:bg-foreground\\/10 *)[data-slot$=-trigger]:focus{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)}}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-trigger\\]\\:aria-expanded\\:bg-foreground\\/10\\! *)[data-slot$=-trigger][aria-expanded=true]{background-color:var(--foreground)!important}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-trigger\\]\\:aria-expanded\\:bg-foreground\\/10\\! *)[data-slot$=-trigger][aria-expanded=true]{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)!important}}:is(.tw\\:\\*\\:data-\\[slot\\=alert-description\\]\\:text-destructive\\/90>*)[data-slot=alert-description]{color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\:data-\\[slot\\=alert-description\\]\\:text-destructive\\/90>*)[data-slot=alert-description]{color:color-mix(in oklab, var(--destructive) 90%, transparent)}}:is(.tw\\:\\*\\:data-\\[slot\\=avatar\\]\\:ring-2>*)[data-slot=avatar]{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}:is(.tw\\:\\*\\:data-\\[slot\\=avatar\\]\\:ring-background>*)[data-slot=avatar]{--tw-ring-color:var(--background)}:is(.tw\\:\\*\\:data-\\[slot\\=input-group-addon\\]\\:ps-2\\!>*)[data-slot=input-group-addon]{padding-inline-start:calc(calc(var(--spacing)) * 2)!important}:is(.tw\\:\\*\\*\\:data-\\[slot\\=kbd\\]\\:relative *)[data-slot=kbd]{position:relative}:is(.tw\\:\\*\\*\\:data-\\[slot\\=kbd\\]\\:isolate *)[data-slot=kbd]{isolation:isolate}:is(.tw\\:\\*\\*\\:data-\\[slot\\=kbd\\]\\:z-50 *)[data-slot=kbd]{z-index:50}:is(.tw\\:\\*\\*\\:data-\\[slot\\=kbd\\]\\:rounded-sm *)[data-slot=kbd]{border-radius:calc(var(--radius) * .6)}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:line-clamp-1>*)[data-slot=select-value]{-webkit-line-clamp:1;-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:flex>*)[data-slot=select-value]{display:flex}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:flex-1>*)[data-slot=select-value]{flex:1}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:items-center>*)[data-slot=select-value]{align-items:center}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:gap-1\\.5>*)[data-slot=select-value]{gap:calc(calc(var(--spacing)) * 1.5)}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:text-start>*)[data-slot=select-value]{text-align:start}.tw\\:group-data-horizontal\\/toggle-group\\:data-\\[spacing\\=0\\]\\:first\\:rounded-s-lg:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=horizontal]) *)[data-spacing="0"]:first-child{border-start-start-radius:var(--radius);border-end-start-radius:var(--radius)}.tw\\:group-data-vertical\\/toggle-group\\:data-\\[spacing\\=0\\]\\:first\\:rounded-t-lg:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=vertical]) *)[data-spacing="0"]:first-child{border-top-left-radius:var(--radius);border-top-right-radius:var(--radius)}.tw\\:group-data-horizontal\\/toggle-group\\:data-\\[spacing\\=0\\]\\:last\\:rounded-e-lg:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=horizontal]) *)[data-spacing="0"]:last-child{border-start-end-radius:var(--radius);border-end-end-radius:var(--radius)}.tw\\:group-data-vertical\\/toggle-group\\:data-\\[spacing\\=0\\]\\:last\\:rounded-b-lg:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=vertical]) *)[data-spacing="0"]:last-child{border-bottom-right-radius:var(--radius);border-bottom-left-radius:var(--radius)}.tw\\:data-\\[state\\=active\\]\\:bg-background[data-state=active]{background-color:var(--background)}.tw\\:data-\\[state\\=active\\]\\:text-foreground[data-state=active]{color:var(--foreground)}.tw\\:data-\\[state\\=active\\]\\:shadow-sm[data-state=active]{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:data-\\[state\\=closed\\]\\:overflow-hidden[data-state=closed]{overflow:hidden}.tw\\:data-\\[state\\=delayed-open\\]\\:animate-in[data-state=delayed-open]{animation:enter var(--tw-animation-duration,var(--tw-duration,.15s))var(--tw-ease,ease)var(--tw-animation-delay,0s)var(--tw-animation-iteration-count,1)var(--tw-animation-direction,normal)var(--tw-animation-fill-mode,none)}.tw\\:data-\\[state\\=delayed-open\\]\\:fade-in-0[data-state=delayed-open]{--tw-enter-opacity:0}.tw\\:data-\\[state\\=delayed-open\\]\\:zoom-in-95[data-state=delayed-open]{--tw-enter-scale:.95}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-soft-approved\\)\\][data-state=on]{background-color:var(--inv-soft-approved)}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-soft-unapproved\\)\\][data-state=on]{background-color:var(--inv-soft-unapproved)}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-soft-unknown\\)\\][data-state=on]{background-color:var(--inv-soft-unknown)}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-vivid-approved\\)\\][data-state=on]{background-color:var(--inv-vivid-approved)}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-vivid-unapproved\\)\\][data-state=on]{background-color:var(--inv-vivid-unapproved)}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-vivid-unknown\\)\\][data-state=on]{background-color:var(--inv-vivid-unknown)}.tw\\:data-\\[state\\=on\\]\\:bg-muted[data-state=on]{background-color:var(--muted)}.tw\\:data-\\[state\\=on\\]\\:text-\\[var\\(--inv-icon-approved\\)\\][data-state=on]{color:var(--inv-icon-approved)}.tw\\:data-\\[state\\=on\\]\\:text-\\[var\\(--inv-icon-unapproved\\)\\][data-state=on]{color:var(--inv-icon-unapproved)}.tw\\:data-\\[state\\=on\\]\\:text-\\[var\\(--inv-icon-unknown\\)\\][data-state=on]{color:var(--inv-icon-unknown)}.tw\\:data-\\[state\\=on\\]\\:text-\\[var\\(--inv-on\\)\\][data-state=on]{color:var(--inv-on)}.tw\\:data-\\[state\\=on\\]\\:text-foreground[data-state=on]{color:var(--foreground)}.tw\\:data-\\[state\\=open\\]\\:bg-accent[data-state=open]{background-color:var(--accent)}.tw\\:data-\\[state\\=open\\]\\:bg-muted[data-state=open]{background-color:var(--muted)}.tw\\:data-\\[state\\=open\\]\\:text-foreground[data-state=open]{color:var(--foreground)}.tw\\:data-\\[state\\=selected\\]\\:bg-muted[data-state=selected]{background-color:var(--muted)}.tw\\:data-\\[variant\\=destructive\\]\\:text-destructive[data-variant=destructive]{color:var(--destructive)}:is(:is(.tw\\:\\*\\*\\:data-\\[variant\\=destructive\\]\\:\\*\\*\\:text-accent-foreground\\! *)[data-variant=destructive] *),:is(.tw\\:\\*\\*\\:data-\\[variant\\=destructive\\]\\:text-accent-foreground\\! *)[data-variant=destructive]{color:var(--accent-foreground)!important}.tw\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-destructive\\/10[data-variant=destructive]:focus{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-destructive\\/10[data-variant=destructive]:focus{background-color:color-mix(in oklab, var(--destructive) 10%, transparent)}}.tw\\:data-\\[variant\\=destructive\\]\\:focus\\:text-destructive[data-variant=destructive]:focus{color:var(--destructive)}:is(.tw\\:\\*\\*\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-foreground\\/10\\! *)[data-variant=destructive]:focus{background-color:var(--foreground)!important}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-foreground\\/10\\! *)[data-variant=destructive]:focus{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)!important}}.tw\\:data-\\[variant\\=line\\]\\:rounded-none[data-variant=line]{border-radius:0}.tw\\:group-data-horizontal\\/toggle-group\\:data-\\[spacing\\=0\\]\\:data-\\[variant\\=outline\\]\\:border-s-0:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=horizontal]) *)[data-spacing="0"][data-variant=outline]{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:group-data-vertical\\/toggle-group\\:data-\\[spacing\\=0\\]\\:data-\\[variant\\=outline\\]\\:border-t-0:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=vertical]) *)[data-spacing="0"][data-variant=outline]{border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:group-data-horizontal\\/toggle-group\\:data-\\[spacing\\=0\\]\\:data-\\[variant\\=outline\\]\\:first\\:border-s:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=horizontal]) *)[data-spacing="0"][data-variant=outline]:first-child{border-inline-start-style:var(--tw-border-style);border-inline-start-width:1px}.tw\\:group-data-vertical\\/toggle-group\\:data-\\[spacing\\=0\\]\\:data-\\[variant\\=outline\\]\\:first\\:border-t:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=vertical]) *)[data-spacing="0"][data-variant=outline]:first-child{border-top-style:var(--tw-border-style);border-top-width:1px}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:inset-x-0[data-vaul-drawer-direction=bottom]{inset-inline:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:bottom-0[data-vaul-drawer-direction=bottom]{bottom:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:mt-24[data-vaul-drawer-direction=bottom]{margin-top:calc(calc(var(--spacing)) * 24)}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:max-h-\\[80vh\\][data-vaul-drawer-direction=bottom]{max-height:80vh}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:rounded-t-xl[data-vaul-drawer-direction=bottom]{border-top-left-radius:calc(var(--radius) * 1.4);border-top-right-radius:calc(var(--radius) * 1.4)}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:border-t[data-vaul-drawer-direction=bottom]{border-top-style:var(--tw-border-style);border-top-width:1px}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:inset-y-0[data-vaul-drawer-direction=left]{inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:left-0[data-vaul-drawer-direction=left]{left:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:w-3\\/4[data-vaul-drawer-direction=left]{width:75%}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:flex-row[data-vaul-drawer-direction=left]{flex-direction:row}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:rounded-r-xl[data-vaul-drawer-direction=left]{border-top-right-radius:calc(var(--radius) * 1.4);border-bottom-right-radius:calc(var(--radius) * 1.4)}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:border-r[data-vaul-drawer-direction=left]{border-right-style:var(--tw-border-style);border-right-width:1px}.tw\\:data-\\[vaul-drawer-direction\\=left\\/right\\]\\:flex-row[data-vaul-drawer-direction=left\\/right]{flex-direction:row}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:inset-y-0[data-vaul-drawer-direction=right]{inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:right-0[data-vaul-drawer-direction=right]{right:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:w-3\\/4[data-vaul-drawer-direction=right]{width:75%}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:flex-row[data-vaul-drawer-direction=right]{flex-direction:row}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:rounded-l-xl[data-vaul-drawer-direction=right]{border-top-left-radius:calc(var(--radius) * 1.4);border-bottom-left-radius:calc(var(--radius) * 1.4)}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:border-l[data-vaul-drawer-direction=right]{border-left-style:var(--tw-border-style);border-left-width:1px}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:inset-x-0[data-vaul-drawer-direction=top]{inset-inline:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:top-0[data-vaul-drawer-direction=top]{top:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:mb-24[data-vaul-drawer-direction=top]{margin-bottom:calc(calc(var(--spacing)) * 24)}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:max-h-\\[80vh\\][data-vaul-drawer-direction=top]{max-height:80vh}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:rounded-b-xl[data-vaul-drawer-direction=top]{border-bottom-right-radius:calc(var(--radius) * 1.4);border-bottom-left-radius:calc(var(--radius) * 1.4)}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:border-b[data-vaul-drawer-direction=top]{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}@supports ((-webkit-backdrop-filter:var(--tw)) or (backdrop-filter:var(--tw))){.tw\\:supports-backdrop-filter\\:backdrop-blur-xs{--tw-backdrop-blur:blur(var(--tw-blur-xs));-webkit-backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)}}@media (min-width:40rem){.tw\\:sm\\:flex{display:flex}.tw\\:sm\\:max-w-sm{max-width:var(--tw-container-sm)}.tw\\:sm\\:flex-row{flex-direction:row}.tw\\:sm\\:justify-end{justify-content:flex-end}.tw\\:sm\\:p-8{padding:calc(calc(var(--spacing)) * 8)}.tw\\:sm\\:text-start{text-align:start}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:sm\\:max-w-sm[data-vaul-drawer-direction=left],.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:sm\\:max-w-sm[data-vaul-drawer-direction=right]{max-width:var(--tw-container-sm)}}@media (min-width:48rem){.tw\\:md\\:block{display:block}.tw\\:md\\:flex{display:flex}.tw\\:md\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.tw\\:md\\:gap-0\\.5{gap:calc(calc(var(--spacing)) * .5)}.tw\\:md\\:text-start{text-align:start}.tw\\:md\\:text-sm{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:md\\:text-pretty{text-wrap:pretty}.tw\\:md\\:opacity-0{opacity:0}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:m-2:is(:where(.tw\\:peer)[data-variant=inset]~*){margin:calc(calc(var(--spacing)) * 2)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:ms-0:is(:where(.tw\\:peer)[data-variant=inset]~*){margin-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:rounded-xl:is(:where(.tw\\:peer)[data-variant=inset]~*){border-radius:calc(var(--radius) * 1.4)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:shadow-sm:is(:where(.tw\\:peer)[data-variant=inset]~*){--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:peer-data-\\[state\\=collapsed\\]\\:ms-2:is(:where(.tw\\:peer)[data-variant=inset]~*):is(:where(.tw\\:peer)[data-state=collapsed]~*){margin-inline-start:calc(calc(var(--spacing)) * 2)}.tw\\:md\\:after\\:hidden:after{content:var(--tw-content);display:none}}@media (min-width:64rem){.tw\\:lg\\:flex{display:flex}.tw\\:lg\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}:where(.tw\\:lg\\:space-x-8>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 8) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 8) * calc(1 - var(--tw-space-x-reverse)))}.tw\\:lg\\:text-5xl{font-size:var(--tw-text-5xl);line-height:var(--tw-leading,var(--tw-text-5xl--line-height))}}@media (min-width:48rem){@media (min-width:64rem){.tw\\:md\\:lg\\:hidden{display:none}}}@media (min-width:80rem){.tw\\:xl\\:auto-cols-fr{grid-auto-columns:minmax(0,1fr)}.tw\\:xl\\:grid-flow-col{grid-auto-flow:column}.tw\\:xl\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.tw\\:xl\\:grid-cols-none{grid-template-columns:none}.tw\\:xl\\:grid-rows-2{grid-template-rows:repeat(2,minmax(0,1fr))}}@container search not (min-width:7rem){.tw\\:\\@max-\\[7rem\\]\\/search\\:hidden{display:none}.tw\\:\\@max-\\[7rem\\]\\/search\\:ps-3{padding-inline-start:calc(calc(var(--spacing)) * 3)}}@container search not (min-width:4rem){.tw\\:\\@max-\\[4rem\\]\\/search\\:hidden{display:none}.tw\\:\\@max-\\[4rem\\]\\/search\\:pe-3{padding-inline-end:calc(calc(var(--spacing)) * 3)}}@container search not (min-width:3rem){.tw\\:\\@max-\\[3rem\\]\\/search\\:ps-0{padding-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:\\@max-\\[3rem\\]\\/search\\:pe-0{padding-inline-end:calc(calc(var(--spacing)) * 0)}}@container (min-width:24rem){.tw\\:\\@sm\\:basis-auto{flex-basis:auto}}.tw\\:ltr\\:left-2:where(:dir(ltr),[dir=ltr],[dir=ltr] *){left:calc(calc(var(--spacing)) * 2)}.tw\\:ltr\\:-translate-x-1\\/2:where(:dir(ltr),[dir=ltr],[dir=ltr] *){--tw-translate-x:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:right-2:where(:dir(rtl),[dir=rtl],[dir=rtl] *){right:calc(calc(var(--spacing)) * 2)}.tw\\:rtl\\:flex:where(:dir(rtl),[dir=rtl],[dir=rtl] *){display:flex}.tw\\:rtl\\:-translate-x-px:where(:dir(rtl),[dir=rtl],[dir=rtl] *){--tw-translate-x:-1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:translate-x-1\\/2:where(:dir(rtl),[dir=rtl],[dir=rtl] *){--tw-translate-x:calc(1 / 2 * 100%);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:translate-x-px:where(:dir(rtl),[dir=rtl],[dir=rtl] *){--tw-translate-x:1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:after\\:translate-x-1\\/2:where(:dir(rtl),[dir=rtl],[dir=rtl] *):after{content:var(--tw-content);--tw-translate-x:calc(1 / 2 * 100%);translate:var(--tw-translate-x) var(--tw-translate-y)}:where([data-side=primary]) .tw\\:rtl\\:in-data-\\[side\\=primary\\]\\:cursor-e-resize:where(:dir(rtl),[dir=rtl],[dir=rtl] *){cursor:e-resize}:where([data-side=secondary]) .tw\\:rtl\\:in-data-\\[side\\=secondary\\]\\:cursor-w-resize:where(:dir(rtl),[dir=rtl],[dir=rtl] *){cursor:w-resize}.tw\\:rtl\\:aria-\\[orientation\\=horizontal\\]\\:after\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *)[aria-orientation=horizontal]:after{content:var(--tw-content);--tw-translate-x:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:data-\\[side\\=left\\]\\:translate-x-1:where(:dir(rtl),[dir=rtl],[dir=rtl] *)[data-side=left]{--tw-translate-x:calc(calc(var(--spacing)) * 1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:data-\\[side\\=right\\]\\:-translate-x-1:where(:dir(rtl),[dir=rtl],[dir=rtl] *)[data-side=right]{--tw-translate-x:calc(calc(var(--spacing)) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:dark\\:border-input:is(.dark *){border-color:var(--input)}.tw\\:dark\\:bg-destructive\\/20:is(.dark *){background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:bg-destructive\\/20:is(.dark *){background-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:dark\\:bg-input\\/30:is(.dark *){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:bg-input\\/30:is(.dark *){background-color:color-mix(in oklab, var(--input) 30%, transparent)}}.tw\\:dark\\:bg-transparent:is(.dark *){background-color:#0000}.tw\\:dark\\:text-amber-400:is(.dark *){color:var(--tw-color-amber-400)}.tw\\:dark\\:text-muted-foreground:is(.dark *){color:var(--muted-foreground)}.tw\\:dark\\:text-rose-400:is(.dark *){color:var(--tw-color-rose-400)}.tw\\:dark\\:text-sky-400:is(.dark *){color:var(--tw-color-sky-400)}.tw\\:dark\\:text-teal-400:is(.dark *){color:var(--tw-color-teal-400)}.tw\\:dark\\:after\\:mix-blend-lighten:is(.dark *):after{content:var(--tw-content);mix-blend-mode:lighten}@media (hover:hover){.tw\\:dark\\:hover\\:bg-blue-500:is(.dark *):hover{background-color:var(--tw-color-blue-500)}.tw\\:dark\\:hover\\:bg-destructive\\/30:is(.dark *):hover{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:hover\\:bg-destructive\\/30:is(.dark *):hover{background-color:color-mix(in oklab, var(--destructive) 30%, transparent)}}.tw\\:dark\\:hover\\:bg-input\\/50:is(.dark *):hover{background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:hover\\:bg-input\\/50:is(.dark *):hover{background-color:color-mix(in oklab, var(--input) 50%, transparent)}}.tw\\:dark\\:hover\\:bg-muted\\/50:is(.dark *):hover{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:hover\\:bg-muted\\/50:is(.dark *):hover{background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:dark\\:hover\\:text-foreground:is(.dark *):hover{color:var(--foreground)}}.tw\\:dark\\:focus-visible\\:ring-destructive\\/40:is(.dark *):focus-visible{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:focus-visible\\:ring-destructive\\/40:is(.dark *):focus-visible{--tw-ring-color:color-mix(in oklab, var(--destructive) 40%, transparent)}}.tw\\:dark\\:disabled\\:bg-input\\/80:is(.dark *):disabled{background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:disabled\\:bg-input\\/80:is(.dark *):disabled{background-color:color-mix(in oklab, var(--input) 80%, transparent)}}.tw\\:dark\\:disabled\\:bg-transparent:is(.dark *):disabled{background-color:#0000}:where([data-slot=tooltip-content]) .tw\\:dark\\:in-data-\\[slot\\=tooltip-content\\]\\:bg-background\\/10:is(.dark *){background-color:var(--background)}@supports (color:color-mix(in lab, red, red)){:where([data-slot=tooltip-content]) .tw\\:dark\\:in-data-\\[slot\\=tooltip-content\\]\\:bg-background\\/10:is(.dark *){background-color:color-mix(in oklab, var(--background) 10%, transparent)}}.tw\\:dark\\:has-disabled\\:bg-input\\/80:is(.dark *):has(:disabled){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:has-disabled\\:bg-input\\/80:is(.dark *):has(:disabled){background-color:color-mix(in oklab, var(--input) 80%, transparent)}}.tw\\:dark\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-destructive\\/40:is(.dark *):has([data-slot][aria-invalid=true]){--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-destructive\\/40:is(.dark *):has([data-slot][aria-invalid=true]){--tw-ring-color:color-mix(in oklab, var(--destructive) 40%, transparent)}}.tw\\:dark\\:aria-invalid\\:border-destructive\\/50:is(.dark *)[aria-invalid=true]{border-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:aria-invalid\\:border-destructive\\/50:is(.dark *)[aria-invalid=true]{border-color:color-mix(in oklab, var(--destructive) 50%, transparent)}}.tw\\:dark\\:aria-invalid\\:ring-destructive\\/40:is(.dark *)[aria-invalid=true]{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:aria-invalid\\:ring-destructive\\/40:is(.dark *)[aria-invalid=true]{--tw-ring-color:color-mix(in oklab, var(--destructive) 40%, transparent)}}.tw\\:dark\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-destructive\\/20:is(.dark *)[data-variant=destructive]:focus{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-destructive\\/20:is(.dark *)[data-variant=destructive]:focus{background-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:data-open\\:animate-in:where([data-state=open]),.tw\\:data-open\\:animate-in:where([data-open]:not([data-open=false])){animation:enter var(--tw-animation-duration,var(--tw-duration,.15s))var(--tw-ease,ease)var(--tw-animation-delay,0s)var(--tw-animation-iteration-count,1)var(--tw-animation-direction,normal)var(--tw-animation-fill-mode,none)}.tw\\:data-open\\:bg-accent:where([data-state=open]),.tw\\:data-open\\:bg-accent:where([data-open]:not([data-open=false])){background-color:var(--accent)}.tw\\:data-open\\:text-accent-foreground:where([data-state=open]),.tw\\:data-open\\:text-accent-foreground:where([data-open]:not([data-open=false])){color:var(--accent-foreground)}.tw\\:data-open\\:fade-in-0:where([data-state=open]),.tw\\:data-open\\:fade-in-0:where([data-open]:not([data-open=false])){--tw-enter-opacity:0}.tw\\:data-open\\:zoom-in-95:where([data-state=open]),.tw\\:data-open\\:zoom-in-95:where([data-open]:not([data-open=false])){--tw-enter-scale:.95}@media (hover:hover){:is(.tw\\:data-open\\:hover\\:bg-sidebar-accent:where([data-state=open]),.tw\\:data-open\\:hover\\:bg-sidebar-accent:where([data-open]:not([data-open=false]))):hover{background-color:var(--sidebar-accent)}:is(.tw\\:data-open\\:hover\\:text-sidebar-accent-foreground:where([data-state=open]),.tw\\:data-open\\:hover\\:text-sidebar-accent-foreground:where([data-open]:not([data-open=false]))):hover{color:var(--sidebar-accent-foreground)}}.tw\\:data-closed\\:animate-out:where([data-state=closed]),.tw\\:data-closed\\:animate-out:where([data-closed]:not([data-closed=false])){animation:exit var(--tw-animation-duration,var(--tw-duration,.15s))var(--tw-ease,ease)var(--tw-animation-delay,0s)var(--tw-animation-iteration-count,1)var(--tw-animation-direction,normal)var(--tw-animation-fill-mode,none)}.tw\\:data-closed\\:fade-out-0:where([data-state=closed]),.tw\\:data-closed\\:fade-out-0:where([data-closed]:not([data-closed=false])){--tw-exit-opacity:0}.tw\\:data-closed\\:zoom-out-95:where([data-state=closed]),.tw\\:data-closed\\:zoom-out-95:where([data-closed]:not([data-closed=false])){--tw-exit-scale:.95}.tw\\:data-checked\\:border-primary:where([data-state=checked]),.tw\\:data-checked\\:border-primary:where([data-checked]:not([data-checked=false])){border-color:var(--primary)}.tw\\:data-checked\\:bg-primary:where([data-state=checked]),.tw\\:data-checked\\:bg-primary:where([data-checked]:not([data-checked=false])){background-color:var(--primary)}.tw\\:data-checked\\:text-primary-foreground:where([data-state=checked]),.tw\\:data-checked\\:text-primary-foreground:where([data-checked]:not([data-checked=false])){color:var(--primary-foreground)}.tw\\:group-data-\\[size\\=default\\]\\/switch\\:data-checked\\:translate-x-\\[calc\\(100\\%-2px\\)\\]:is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-state=checked]),.tw\\:group-data-\\[size\\=default\\]\\/switch\\:data-checked\\:translate-x-\\[calc\\(100\\%-2px\\)\\]:is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-checked]:not([data-checked=false])),.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:data-checked\\:translate-x-\\[calc\\(100\\%-2px\\)\\]:is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-state=checked]),.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:data-checked\\:translate-x-\\[calc\\(100\\%-2px\\)\\]:is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-checked]:not([data-checked=false])){--tw-translate-x:calc(100% - 2px);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:group-data-\\[size\\=default\\]\\/switch\\:data-checked\\:-translate-x-\\[calc\\(100\\%-2px\\)\\]:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-state=checked]),.tw\\:rtl\\:group-data-\\[size\\=default\\]\\/switch\\:data-checked\\:-translate-x-\\[calc\\(100\\%-2px\\)\\]:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-checked]:not([data-checked=false])),.tw\\:rtl\\:group-data-\\[size\\=sm\\]\\/switch\\:data-checked\\:-translate-x-\\[calc\\(100\\%-2px\\)\\]:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-state=checked]),.tw\\:rtl\\:group-data-\\[size\\=sm\\]\\/switch\\:data-checked\\:-translate-x-\\[calc\\(100\\%-2px\\)\\]:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-checked]:not([data-checked=false])){--tw-translate-x:calc(calc(100% - 2px) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:dark\\:data-checked\\:bg-primary:is(.dark *):where([data-state=checked]),.tw\\:dark\\:data-checked\\:bg-primary:is(.dark *):where([data-checked]:not([data-checked=false])){background-color:var(--primary)}.tw\\:dark\\:data-checked\\:bg-primary-foreground:is(.dark *):where([data-state=checked]),.tw\\:dark\\:data-checked\\:bg-primary-foreground:is(.dark *):where([data-checked]:not([data-checked=false])){background-color:var(--primary-foreground)}.tw\\:data-unchecked\\:bg-input:where([data-state=unchecked]),.tw\\:data-unchecked\\:bg-input:where([data-unchecked]:not([data-unchecked=false])){background-color:var(--input)}.tw\\:group-data-\\[size\\=default\\]\\/switch\\:data-unchecked\\:translate-x-0:is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-state=unchecked]),.tw\\:group-data-\\[size\\=default\\]\\/switch\\:data-unchecked\\:translate-x-0:is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-unchecked]:not([data-unchecked=false])),.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:data-unchecked\\:translate-x-0:is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-state=unchecked]),.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:data-unchecked\\:translate-x-0:is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-unchecked]:not([data-unchecked=false])),.tw\\:rtl\\:group-data-\\[size\\=default\\]\\/switch\\:data-unchecked\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-state=unchecked]),.tw\\:rtl\\:group-data-\\[size\\=default\\]\\/switch\\:data-unchecked\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-unchecked]:not([data-unchecked=false])),.tw\\:rtl\\:group-data-\\[size\\=sm\\]\\/switch\\:data-unchecked\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-state=unchecked]),.tw\\:rtl\\:group-data-\\[size\\=sm\\]\\/switch\\:data-unchecked\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-unchecked]:not([data-unchecked=false])){--tw-translate-x:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:dark\\:data-unchecked\\:bg-foreground:is(.dark *):where([data-state=unchecked]),.tw\\:dark\\:data-unchecked\\:bg-foreground:is(.dark *):where([data-unchecked]:not([data-unchecked=false])){background-color:var(--foreground)}.tw\\:dark\\:data-unchecked\\:bg-input\\/80:is(.dark *):where([data-state=unchecked]),.tw\\:dark\\:data-unchecked\\:bg-input\\/80:is(.dark *):where([data-unchecked]:not([data-unchecked=false])){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:data-unchecked\\:bg-input\\/80:is(.dark *):where([data-state=unchecked]),.tw\\:dark\\:data-unchecked\\:bg-input\\/80:is(.dark *):where([data-unchecked]:not([data-unchecked=false])){background-color:color-mix(in oklab, var(--input) 80%, transparent)}}.tw\\:data-selected\\:bg-muted:where([data-selected=true]){background-color:var(--muted)}.tw\\:data-selected\\:text-foreground:where([data-selected=true]){color:var(--foreground)}.tw\\:data-disabled\\:pointer-events-none:where([data-disabled=true]),.tw\\:data-disabled\\:pointer-events-none:where([data-disabled]:not([data-disabled=false])){pointer-events:none}.tw\\:data-disabled\\:cursor-not-allowed:where([data-disabled=true]),.tw\\:data-disabled\\:cursor-not-allowed:where([data-disabled]:not([data-disabled=false])){cursor:not-allowed}.tw\\:data-disabled\\:opacity-50:where([data-disabled=true]),.tw\\:data-disabled\\:opacity-50:where([data-disabled]:not([data-disabled=false])){opacity:.5}.tw\\:data-active\\:bg-background:where([data-state=active]),.tw\\:data-active\\:bg-background:where([data-active]:not([data-active=false])){background-color:var(--background)}.tw\\:data-active\\:bg-sidebar-accent:where([data-state=active]),.tw\\:data-active\\:bg-sidebar-accent:where([data-active]:not([data-active=false])){background-color:var(--sidebar-accent)}.tw\\:data-active\\:font-medium:where([data-state=active]),.tw\\:data-active\\:font-medium:where([data-active]:not([data-active=false])){--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}.tw\\:data-active\\:text-foreground:where([data-state=active]),.tw\\:data-active\\:text-foreground:where([data-active]:not([data-active=false])){color:var(--foreground)}.tw\\:data-active\\:text-sidebar-accent-foreground:where([data-state=active]),.tw\\:data-active\\:text-sidebar-accent-foreground:where([data-active]:not([data-active=false])){color:var(--sidebar-accent-foreground)}.tw\\:group-data-\\[variant\\=default\\]\\/tabs-list\\:data-active\\:shadow-sm:is(:where(.tw\\:group\\/tabs-list)[data-variant=default] *):where([data-state=active]),.tw\\:group-data-\\[variant\\=default\\]\\/tabs-list\\:data-active\\:shadow-sm:is(:where(.tw\\:group\\/tabs-list)[data-variant=default] *):where([data-active]:not([data-active=false])){--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:bg-transparent:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:bg-transparent:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false])){background-color:#0000}.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:shadow-none:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:shadow-none:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false])){--tw-shadow:0 0 #0000;box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}:is(.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:after\\:opacity-100:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:after\\:opacity-100:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false]))):after{content:var(--tw-content);opacity:1}.tw\\:dark\\:data-active\\:border-input:is(.dark *):where([data-state=active]),.tw\\:dark\\:data-active\\:border-input:is(.dark *):where([data-active]:not([data-active=false])){border-color:var(--input)}.tw\\:dark\\:data-active\\:bg-input\\/30:is(.dark *):where([data-state=active]),.tw\\:dark\\:data-active\\:bg-input\\/30:is(.dark *):where([data-active]:not([data-active=false])){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:data-active\\:bg-input\\/30:is(.dark *):where([data-state=active]),.tw\\:dark\\:data-active\\:bg-input\\/30:is(.dark *):where([data-active]:not([data-active=false])){background-color:color-mix(in oklab, var(--input) 30%, transparent)}}.tw\\:dark\\:data-active\\:text-foreground:is(.dark *):where([data-state=active]),.tw\\:dark\\:data-active\\:text-foreground:is(.dark *):where([data-active]:not([data-active=false])){color:var(--foreground)}.tw\\:dark\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:border-transparent:is(.dark *):is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:dark\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:border-transparent:is(.dark *):is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false])){border-color:#0000}.tw\\:dark\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:bg-transparent:is(.dark *):is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:dark\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:bg-transparent:is(.dark *):is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false])){background-color:#0000}.tw\\:data-horizontal\\:mx-px:where([data-orientation=horizontal]){margin-inline:1px}.tw\\:data-horizontal\\:h-1:where([data-orientation=horizontal]){height:calc(calc(var(--spacing)) * 1)}.tw\\:data-horizontal\\:h-full:where([data-orientation=horizontal]){height:100%}.tw\\:data-horizontal\\:h-px:where([data-orientation=horizontal]){height:1px}.tw\\:data-horizontal\\:w-auto:where([data-orientation=horizontal]){width:auto}.tw\\:data-horizontal\\:w-full:where([data-orientation=horizontal]){width:100%}.tw\\:data-horizontal\\:flex-col:where([data-orientation=horizontal]){flex-direction:column}.tw\\:data-vertical\\:my-px:where([data-orientation=vertical]){margin-block:1px}.tw\\:data-vertical\\:h-auto:where([data-orientation=vertical]){height:auto}.tw\\:data-vertical\\:h-full:where([data-orientation=vertical]){height:100%}.tw\\:data-vertical\\:min-h-40:where([data-orientation=vertical]){min-height:calc(calc(var(--spacing)) * 40)}.tw\\:data-vertical\\:w-1:where([data-orientation=vertical]){width:calc(calc(var(--spacing)) * 1)}.tw\\:data-vertical\\:w-auto:where([data-orientation=vertical]){width:auto}.tw\\:data-vertical\\:w-full:where([data-orientation=vertical]){width:100%}.tw\\:data-vertical\\:w-px:where([data-orientation=vertical]){width:1px}.tw\\:data-vertical\\:flex-col:where([data-orientation=vertical]){flex-direction:column}.tw\\:data-vertical\\:items-stretch:where([data-orientation=vertical]){align-items:stretch}.tw\\:data-vertical\\:self-stretch:where([data-orientation=vertical]){align-self:stretch}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:mt-0 [data-lexical-editor=true]>blockquote{margin-top:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:border-s-0 [data-lexical-editor=true]>blockquote{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:ps-0 [data-lexical-editor=true]>blockquote{padding-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:font-normal [data-lexical-editor=true]>blockquote{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:text-foreground [data-lexical-editor=true]>blockquote{color:var(--foreground)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:not-italic [data-lexical-editor=true]>blockquote{font-style:normal}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:mt-0 [data-lexical-editor=\\"true\\"]>blockquote{margin-top:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:border-s-0 [data-lexical-editor=\\"true\\"]>blockquote{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:ps-0 [data-lexical-editor=\\"true\\"]>blockquote{padding-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:font-normal [data-lexical-editor=\\"true\\"]>blockquote{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:text-foreground [data-lexical-editor=\\"true\\"]>blockquote{color:var(--foreground)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:not-italic [data-lexical-editor=\\"true\\"]>blockquote{font-style:normal}.tw\\:\\[\\&_a\\]\\:underline a{text-decoration-line:underline}.tw\\:\\[\\&_a\\]\\:underline-offset-3 a{text-underline-offset:3px}@media (hover:hover){.tw\\:\\[\\&_a\\]\\:hover\\:text-foreground a:hover{color:var(--foreground)}}.tw\\:\\[\\&_p\\]\\:my-0 p{margin-block:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_p\\:not\\(\\:last-child\\)\\]\\:mb-4 p:not(:last-child){margin-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&_s\\]\\:text-destructive s{color:var(--destructive)}.tw\\:\\[\\&_s\\]\\:line-through s{text-decoration-line:line-through}.tw\\:\\[\\&_svg\\]\\:pointer-events-none svg{pointer-events:none}.tw\\:\\[\\&_svg\\]\\:size-4 svg{width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&_svg\\]\\:shrink-0 svg{flex-shrink:0}.tw\\:\\[\\&_svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-3 svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:\\[\\&_svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-3\\.5 svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 3.5);height:calc(calc(var(--spacing)) * 3.5)}.tw\\:\\[\\&_svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-4 svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&_tr\\]\\:border-b tr{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}.tw\\:\\[\\&_tr\\:last-child\\]\\:border-0 tr:last-child{border-style:var(--tw-border-style);border-width:0}.tw\\:\\[\\&_u\\]\\:font-semibold u{--tw-font-weight:var(--tw-font-weight-semibold);font-weight:var(--tw-font-weight-semibold)}.tw\\:\\[\\&_u\\]\\:text-success-foreground u{color:var(--success-foreground)}.tw\\:\\[\\&_u\\]\\:no-underline u{text-decoration-line:none}.tw\\:\\[\\&\\:has\\(\\[role\\=checkbox\\]\\)\\]\\:pe-0:has([role=checkbox]){padding-inline-end:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\.border-b\\]\\:pb-2.border-b{padding-bottom:calc(calc(var(--spacing)) * 2)}.tw\\:\\[\\.border-b\\]\\:pb-4.border-b{padding-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[size\\=sm\\]\\/card\\:\\[\\.border-b\\]\\:pb-3:is(:where(.tw\\:group\\/card)[data-size=sm] *).border-b{padding-bottom:calc(calc(var(--spacing)) * 3)}.tw\\:\\[\\.border-t\\]\\:pt-2.border-t{padding-top:calc(calc(var(--spacing)) * 2)}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:px-2 *)[cmdk-group-heading]{padding-inline:calc(calc(var(--spacing)) * 2)}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:py-1\\.5 *)[cmdk-group-heading]{padding-block:calc(calc(var(--spacing)) * 1.5)}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:text-xs *)[cmdk-group-heading]{font-size:var(--tw-text-xs);line-height:var(--tw-leading,var(--tw-text-xs--line-height))}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:font-medium *)[cmdk-group-heading]{--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:text-muted-foreground *)[cmdk-group-heading]{color:var(--muted-foreground)}:is(.tw\\:\\*\\:\\[a\\]\\:underline>*):is(a){text-decoration-line:underline}:is(.tw\\:\\*\\:\\[a\\]\\:underline-offset-3>*):is(a){text-underline-offset:3px}@media (hover:hover){.tw\\:\\[a\\]\\:hover\\:bg-destructive\\/20:is(a):hover{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:\\[a\\]\\:hover\\:bg-destructive\\/20:is(a):hover{background-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:\\[a\\]\\:hover\\:bg-muted:is(a):hover{background-color:var(--muted)}.tw\\:\\[a\\]\\:hover\\:bg-primary\\/80:is(a):hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:\\[a\\]\\:hover\\:bg-primary\\/80:is(a):hover{background-color:color-mix(in oklab, var(--primary) 80%, transparent)}}.tw\\:\\[a\\]\\:hover\\:bg-secondary\\/80:is(a):hover{background-color:var(--secondary)}@supports (color:color-mix(in lab, red, red)){.tw\\:\\[a\\]\\:hover\\:bg-secondary\\/80:is(a):hover{background-color:color-mix(in oklab, var(--secondary) 80%, transparent)}}.tw\\:\\[a\\]\\:hover\\:text-muted-foreground:is(a):hover{color:var(--muted-foreground)}:is(.tw\\:\\*\\:\\[a\\]\\:hover\\:text-foreground>*):is(a):hover{color:var(--foreground)}}:is(.tw\\:\\*\\:\\[img\\]\\:row-span-2>*):is(img){grid-row:span 2/span 2}:is(.tw\\:\\*\\:\\[img\\]\\:translate-y-0\\.5>*):is(img){--tw-translate-y:calc(calc(var(--spacing)) * .5);translate:var(--tw-translate-x) var(--tw-translate-y)}:is(.tw\\:\\*\\:\\[img\\]\\:text-current>*):is(img){color:currentColor}:is(.tw\\:\\*\\:\\[img\\:first-child\\]\\:rounded-t-xl>*):is(img:first-child){border-top-left-radius:calc(var(--radius) * 1.4);border-top-right-radius:calc(var(--radius) * 1.4)}:is(.tw\\:\\*\\:\\[img\\:last-child\\]\\:rounded-b-xl>*):is(img:last-child){border-bottom-right-radius:calc(var(--radius) * 1.4);border-bottom-left-radius:calc(var(--radius) * 1.4)}:is(.tw\\:\\*\\:\\[img\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-4>*):is(img:not([class*=size-])){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}:is(.tw\\:\\*\\:\\[span\\]\\:last\\:flex>*):is(span):last-child{display:flex}:is(.tw\\:\\*\\:\\[span\\]\\:last\\:items-center>*):is(span):last-child{align-items:center}:is(.tw\\:\\*\\:\\[span\\]\\:last\\:gap-2>*):is(span):last-child{gap:calc(calc(var(--spacing)) * 2)}:is(.tw\\:\\*\\:\\[svg\\]\\:row-span-2>*):is(svg){grid-row:span 2/span 2}:is(.tw\\:\\*\\:\\[svg\\]\\:translate-y-0\\.5>*):is(svg){--tw-translate-y:calc(calc(var(--spacing)) * .5);translate:var(--tw-translate-x) var(--tw-translate-y)}:is(.tw\\:\\*\\:\\[svg\\]\\:text-current>*):is(svg){color:currentColor}:is(.tw\\:focus\\:\\*\\:\\[svg\\]\\:text-accent-foreground:focus>*):is(svg){color:var(--accent-foreground)}:is(.tw\\:data-\\[variant\\=destructive\\]\\:\\*\\:\\[svg\\]\\:text-destructive[data-variant=destructive]>*):is(svg){color:var(--destructive)}:is(.tw\\:data-\\[variant\\=destructive\\]\\:\\*\\:\\[svg\\]\\:text-destructive\\![data-variant=destructive]>*):is(svg){color:var(--destructive)!important}:is(.tw\\:data-selected\\:\\*\\:\\[svg\\]\\:text-foreground:where([data-selected=true])>*):is(svg){color:var(--foreground)}:is(.tw\\:\\*\\:\\[svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-4>*):is(svg:not([class*=size-])){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:rounded-s-none>:not(:first-child){border-start-start-radius:0;border-end-start-radius:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:rounded-t-none>:not(:first-child){border-top-left-radius:0;border-top-right-radius:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:border-s-0>:not(:first-child){border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:border-t-0>:not(:first-child){border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:last-child\\)\\]\\:rounded-e-none>:not(:last-child){border-start-end-radius:0;border-end-end-radius:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:last-child\\)\\]\\:rounded-b-none>:not(:last-child){border-bottom-right-radius:0;border-bottom-left-radius:0}.tw\\:has-\\[select\\[aria-hidden\\=true\\]\\:last-child\\]\\:\\[\\&\\>\\[data-slot\\=select-trigger\\]\\:last-of-type\\]\\:rounded-e-lg:has(:is(select[aria-hidden=true]:last-child))>[data-slot=select-trigger]:last-of-type{border-start-end-radius:var(--radius);border-end-end-radius:var(--radius)}.tw\\:\\[\\&\\>\\[data-slot\\=select-trigger\\]\\:not\\(\\[class\\*\\=w-\\]\\)\\]\\:w-fit>[data-slot=select-trigger]:not([class*=w-]){width:fit-content}.tw\\:\\[\\&\\>\\[data-slot\\]\\:not\\(\\:has\\(\\~\\[data-slot\\]\\)\\)\\]\\:rounded-e-lg\\!>[data-slot]:not(:has(~[data-slot])){border-start-end-radius:var(--radius)!important;border-end-end-radius:var(--radius)!important}.tw\\:\\[\\&\\>\\[data-slot\\]\\:not\\(\\:has\\(\\~\\[data-slot\\]\\)\\)\\]\\:rounded-b-lg\\!>[data-slot]:not(:has(~[data-slot])){border-bottom-right-radius:var(--radius)!important;border-bottom-left-radius:var(--radius)!important}.tw\\:\\[\\&\\>a\\]\\:underline>a{text-decoration-line:underline}.tw\\:\\[\\&\\>a\\]\\:underline-offset-4>a{text-underline-offset:4px}.tw\\:\\[\\&\\>a\\:hover\\]\\:text-primary>a:hover{color:var(--primary)}.tw\\:\\[\\&\\>blockquote\\]\\:my-0>blockquote{margin-block:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&\\>blockquote\\]\\:border-s-0>blockquote{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&\\>blockquote\\]\\:p-0>blockquote{padding:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&\\>blockquote\\]\\:ps-0>blockquote{padding-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&\\>blockquote\\]\\:font-normal>blockquote{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:\\[\\&\\>blockquote\\]\\:text-foreground>blockquote{color:var(--foreground)}.tw\\:\\[\\&\\>blockquote\\]\\:not-italic>blockquote{font-style:normal}.tw\\:\\[\\&\\>input\\]\\:flex-1>input{flex:1}.tw\\:has-\\[\\>\\[data-align\\=block-end\\]\\]\\:\\[\\&\\>input\\]\\:pt-3:has(>[data-align=block-end])>input{padding-top:calc(calc(var(--spacing)) * 3)}.tw\\:has-\\[\\>\\[data-align\\=block-start\\]\\]\\:\\[\\&\\>input\\]\\:pb-3:has(>[data-align=block-start])>input{padding-bottom:calc(calc(var(--spacing)) * 3)}.tw\\:has-\\[\\>\\[data-align\\=inline-end\\]\\]\\:\\[\\&\\>input\\]\\:pe-1\\.5:has(>[data-align=inline-end])>input{padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-\\[\\>\\[data-align\\=inline-start\\]\\]\\:\\[\\&\\>input\\]\\:ps-1\\.5:has(>[data-align=inline-start])>input{padding-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:\\[\\&\\>kbd\\]\\:rounded-\\[calc\\(var\\(--radius\\)-5px\\)\\]>kbd{border-radius:calc(var(--radius) - 5px)}.tw\\:\\[\\&\\>li\\]\\:mt-2>li{margin-top:calc(calc(var(--spacing)) * 2)}.tw\\:\\[\\&\\>span\\:last-child\\]\\:truncate>span:last-child{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.tw\\:\\[\\&\\>svg\\]\\:pointer-events-none>svg{pointer-events:none}.tw\\:\\[\\&\\>svg\\]\\:size-3\\!>svg{width:calc(calc(var(--spacing)) * 3)!important;height:calc(calc(var(--spacing)) * 3)!important}.tw\\:\\[\\&\\>svg\\]\\:size-3\\.5>svg{width:calc(calc(var(--spacing)) * 3.5);height:calc(calc(var(--spacing)) * 3.5)}.tw\\:\\[\\&\\>svg\\]\\:size-4>svg{width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&\\>svg\\]\\:shrink-0>svg{flex-shrink:0}.tw\\:\\[\\&\\>svg\\]\\:text-sidebar-accent-foreground>svg{color:var(--sidebar-accent-foreground)}.tw\\:group-has-data-\\[size\\=lg\\]\\/avatar-group\\:\\[\\&\\>svg\\]\\:size-5:is(:where(.tw\\:group\\/avatar-group):has([data-size=lg]) *)>svg{width:calc(calc(var(--spacing)) * 5);height:calc(calc(var(--spacing)) * 5)}.tw\\:group-has-data-\\[size\\=sm\\]\\/avatar-group\\:\\[\\&\\>svg\\]\\:size-3:is(:where(.tw\\:group\\/avatar-group):has([data-size=sm]) *)>svg{width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[size\\=default\\]\\/avatar\\:\\[\\&\\>svg\\]\\:size-2:is(:where(.tw\\:group\\/avatar)[data-size=default] *)>svg,.tw\\:group-data-\\[size\\=lg\\]\\/avatar\\:\\[\\&\\>svg\\]\\:size-2:is(:where(.tw\\:group\\/avatar)[data-size=lg] *)>svg{width:calc(calc(var(--spacing)) * 2);height:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[size\\=sm\\]\\/avatar\\:\\[\\&\\>svg\\]\\:hidden:is(:where(.tw\\:group\\/avatar)[data-size=sm] *)>svg{display:none}.tw\\:\\[\\&\\>svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-3\\.5>svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 3.5);height:calc(calc(var(--spacing)) * 3.5)}.tw\\:\\[\\&\\>svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-4>svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&\\>tr\\]\\:last\\:border-b-0>tr:last-child{border-bottom-style:var(--tw-border-style);border-bottom-width:0}.tw\\:\\[\\&\\[align\\=center\\]\\]\\:text-center[align=center]{text-align:center}.tw\\:\\[\\&\\[align\\=right\\]\\]\\:text-right[align=right]{text-align:right}.tw\\:\\[\\&\\[aria-orientation\\=horizontal\\]\\>div\\]\\:rotate-90[aria-orientation=horizontal]>div{rotate:90deg}[data-side=primary][data-collapsible=offcanvas] .tw\\:\\[\\[data-side\\=primary\\]\\[data-collapsible\\=offcanvas\\]_\\&\\]\\:-end-2{inset-inline-end:calc(calc(var(--spacing)) * -2)}[data-side=primary][data-state=collapsed] .tw\\:\\[\\[data-side\\=primary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-e-resize{cursor:e-resize}[data-side=primary][data-state=collapsed] .tw\\:rtl\\:\\[\\[data-side\\=primary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-w-resize:where(:dir(rtl),[dir=rtl],[dir=rtl] *){cursor:w-resize}[data-side=secondary][data-collapsible=offcanvas] .tw\\:\\[\\[data-side\\=secondary\\]\\[data-collapsible\\=offcanvas\\]_\\&\\]\\:-start-2{inset-inline-start:calc(calc(var(--spacing)) * -2)}[data-side=secondary][data-state=collapsed] .tw\\:\\[\\[data-side\\=secondary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-w-resize{cursor:w-resize}[data-side=secondary][data-state=collapsed] .tw\\:rtl\\:\\[\\[data-side\\=secondary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-e-resize:where(:dir(rtl),[dir=rtl],[dir=rtl] *){cursor:e-resize}}@property --tw-animation-delay{syntax:"*";inherits:false;initial-value:0s}@property --tw-animation-direction{syntax:"*";inherits:false;initial-value:normal}@property --tw-animation-duration{syntax:"*";inherits:false}@property --tw-animation-fill-mode{syntax:"*";inherits:false;initial-value:none}@property --tw-animation-iteration-count{syntax:"*";inherits:false;initial-value:1}@property --tw-enter-blur{syntax:"*";inherits:false;initial-value:0}@property --tw-enter-opacity{syntax:"*";inherits:false;initial-value:1}@property --tw-enter-rotate{syntax:"*";inherits:false;initial-value:0}@property --tw-enter-scale{syntax:"*";inherits:false;initial-value:1}@property --tw-enter-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-enter-translate-y{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-blur{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-opacity{syntax:"*";inherits:false;initial-value:1}@property --tw-exit-rotate{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-scale{syntax:"*";inherits:false;initial-value:1}@property --tw-exit-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-translate-y{syntax:"*";inherits:false;initial-value:0}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-cyrillic-ext-wght-normal.woff2)format("woff2-variations");unicode-range:U+460-52F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-cyrillic-wght-normal.woff2)format("woff2-variations");unicode-range:U+301,U+400-45F,U+490-491,U+4B0-4B1,U+2116}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-greek-wght-normal.woff2)format("woff2-variations");unicode-range:U+370-377,U+37A-37F,U+384-38A,U+38C,U+38E-3A1,U+3A3-3FF}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-vietnamese-wght-normal.woff2)format("woff2-variations");unicode-range:U+102-103,U+110-111,U+128-129,U+168-169,U+1A0-1A1,U+1AF-1B0,U+300-301,U+303-304,U+308-309,U+323,U+329,U+1EA0-1EF9,U+20AB}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-latin-ext-wght-normal.woff2)format("woff2-variations");unicode-range:U+100-2BA,U+2BD-2C5,U+2C7-2CC,U+2CE-2D7,U+2DD-2FF,U+304,U+308,U+329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-latin-wght-normal.woff2)format("woff2-variations");unicode-range:U+??,U+131,U+152-153,U+2BB-2BC,U+2C6,U+2DA,U+2DC,U+304,U+308,U+329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}.light,:root{--radius:.625rem;--spacing:.25rem;--background:oklch(100% 0 0);--foreground:oklch(13.71% .036 258.53);--card:oklch(100% 0 0);--card-foreground:oklch(13.71% .036 258.53);--popover:oklch(98.43% .0018 248.56);--popover-foreground:oklch(13.71% .036 258.53);--primary:oklch(20.79% .0399 265.73);--primary-foreground:oklch(98.38% .0036 248.23);--secondary:oklch(95.89% .011 248.06);--secondary-foreground:oklch(20.79% .0399 265.73);--muted:oklch(95.89% .011 248.06);--muted-foreground:oklch(55.47% .0408 257.45);--accent:oklch(95.89% .011 248.06);--accent-foreground:oklch(20.79% .0399 265.73);--destructive:oklch(63.69% .2077 25.32);--destructive-foreground:oklch(98.38% .0036 248.23);--success-foreground:oklch(62.7% .194 149.214);--diff-deleted:oklch(57.7% .245 27.325);--warning:oklch(84% .16 84);--warning-foreground:oklch(28% .07 46);--border:oklch(92.9% .0127 255.58);--input:oklch(92.9% .0127 255.58);--ring:oklch(13.71% .036 258.53);--chart-1:oklch(64.6% .222 41.116);--chart-2:oklch(60% .118 184.704);--chart-3:oklch(39.8% .07 227.392);--chart-4:oklch(82.8% .189 84.429);--chart-5:oklch(76.9% .188 70.08);--sidebar:oklch(98.43% .0018 248.56);--sidebar-foreground:oklch(13.71% .036 258.53);--sidebar-primary:oklch(20.79% .0399 265.73);--sidebar-primary-foreground:oklch(98.38% .0036 248.23);--sidebar-accent:oklch(95.89% .011 248.06);--sidebar-accent-foreground:oklch(20.79% .0399 265.73);--sidebar-border:oklch(92.9% .0127 255.58);--sidebar-ring:oklch(13.71% .036 258.53)}.dark{--background:oklch(13.71% .036 258.53);--foreground:oklch(98.38% .0036 248.23);--card:oklch(13.71% .036 258.53);--card-foreground:oklch(98.38% .0036 248.23);--popover:oklch(13.71% .036 258.53);--popover-foreground:oklch(98.38% .0036 248.23);--primary:oklch(98.38% .0036 248.23);--primary-foreground:oklch(20.79% .0399 265.73);--secondary:oklch(28% .037 259.98);--secondary-foreground:oklch(98.38% .0036 248.23);--muted:oklch(28% .037 259.98);--muted-foreground:oklch(71.07% .0351 256.8);--accent:oklch(28% .037 259.98);--accent-foreground:oklch(98.38% .0036 248.23);--destructive:oklch(39.6% .1331 25.71);--destructive-foreground:oklch(98.38% .0036 248.23);--success-foreground:oklch(79.2% .209 151.711);--diff-deleted:oklch(70.4% .191 22.216);--warning:oklch(41% .11 46);--warning-foreground:oklch(99% .02 95);--border:oklch(44.54% .0374 257.3);--input:oklch(44.54% .0374 257.3);--ring:oklch(86.88% .0199 252.89);--chart-1:oklch(48.8% .243 264.376);--chart-2:oklch(69.6% .17 162.48);--chart-3:oklch(76.9% .188 70.08);--chart-4:oklch(62.7% .265 303.9);--chart-5:oklch(64.5% .246 16.439);--sidebar:oklch(13.71% .036 258.53);--sidebar-foreground:oklch(71.07% .0351 256.8);--sidebar-primary:oklch(98.38% .0036 248.23);--sidebar-primary-foreground:oklch(20.79% .0399 265.73);--sidebar-accent:oklch(28% .037 259.98);--sidebar-accent-foreground:oklch(71.07% .0351 256.8);--sidebar-border:oklch(28% .037 259.98);--sidebar-ring:oklch(86.88% .0199 252.89)}.paratext-light{--background:oklch(100% 0 0);--foreground:oklch(15.3% .006 107.1);--card:oklch(100% 0 0);--card-foreground:oklch(15.3% .006 107.1);--popover:oklch(100% 0 0);--popover-foreground:oklch(15.3% .006 107.1);--primary:oklch(55.5% .163 48.998);--primary-foreground:oklch(98.7% .022 95.277);--secondary:oklch(96.7% .001 286.375);--secondary-foreground:oklch(21% .006 285.885);--muted:oklch(96.6% .005 106.5);--muted-foreground:oklch(58% .031 107.3);--accent:oklch(96.6% .005 106.5);--accent-foreground:oklch(22.8% .013 107.4);--destructive:oklch(57.7% .245 27.325);--destructive-foreground:oklch(98.38% .0036 248.23);--success-foreground:oklch(62.7% .194 149.214);--diff-deleted:oklch(57.7% .245 27.325);--warning:oklch(84% .16 84);--warning-foreground:oklch(28% .07 46);--border:oklch(93% .007 106.5);--input:oklch(93% .007 106.5);--ring:oklch(73.7% .021 106.9);--chart-1:oklch(88% .011 106.6);--chart-2:oklch(58% .031 107.3);--chart-3:oklch(46.6% .025 107.3);--chart-4:oklch(39.4% .023 107.4);--chart-5:oklch(28.6% .016 107.4);--sidebar:oklch(98.8% .003 106.5);--sidebar-foreground:oklch(15.3% .006 107.1);--sidebar-primary:oklch(66.6% .179 58.318);--sidebar-primary-foreground:oklch(98.7% .022 95.277);--sidebar-accent:oklch(96.6% .005 106.5);--sidebar-accent-foreground:oklch(22.8% .013 107.4);--sidebar-border:oklch(93% .007 106.5);--sidebar-ring:oklch(73.7% .021 106.9)}.paratext-dark{--background:oklch(15.3% .006 107.1);--foreground:oklch(98.8% .003 106.5);--card:oklch(22.8% .013 107.4);--card-foreground:oklch(98.8% .003 106.5);--popover:oklch(22.8% .013 107.4);--popover-foreground:oklch(98.8% .003 106.5);--primary:oklch(47.3% .137 46.201);--primary-foreground:oklch(98.7% .022 95.277);--secondary:oklch(27.4% .006 286.033);--secondary-foreground:oklch(98.5% 0 0);--muted:oklch(28.6% .016 107.4);--muted-foreground:oklch(73.7% .021 106.9);--accent:oklch(28.6% .016 107.4);--accent-foreground:oklch(98.8% .003 106.5);--destructive:oklch(70.4% .191 22.216);--destructive-foreground:oklch(98.38% .0036 248.23);--success-foreground:oklch(79.2% .209 151.711);--diff-deleted:oklch(70.4% .191 22.216);--warning:oklch(41% .11 46);--warning-foreground:oklch(99% .02 95);--border:oklch(100% 0 0/.1);--input:oklch(100% 0 0/.15);--ring:oklch(58% .031 107.3);--chart-1:oklch(88% .011 106.6);--chart-2:oklch(58% .031 107.3);--chart-3:oklch(46.6% .025 107.3);--chart-4:oklch(39.4% .023 107.4);--chart-5:oklch(28.6% .016 107.4);--sidebar:oklch(22.8% .013 107.4);--sidebar-foreground:oklch(98.8% .003 106.5);--sidebar-primary:oklch(76.9% .188 70.08);--sidebar-primary-foreground:oklch(27.9% .077 45.635);--sidebar-accent:oklch(28.6% .016 107.4);--sidebar-accent-foreground:oklch(98.8% .003 106.5);--sidebar-border:oklch(100% 0 0/.1);--sidebar-ring:oklch(58% .031 107.3)}@property --tw-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-y{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-z{syntax:"*";inherits:false;initial-value:0}@property --tw-rotate-x{syntax:"*";inherits:false}@property --tw-rotate-y{syntax:"*";inherits:false}@property --tw-rotate-z{syntax:"*";inherits:false}@property --tw-skew-x{syntax:"*";inherits:false}@property --tw-skew-y{syntax:"*";inherits:false}@property --tw-space-y-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-space-x-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-divide-x-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-border-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-divide-y-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-leading{syntax:"*";inherits:false}@property --tw-font-weight{syntax:"*";inherits:false}@property --tw-tracking{syntax:"*";inherits:false}@property --tw-ordinal{syntax:"*";inherits:false}@property --tw-slashed-zero{syntax:"*";inherits:false}@property --tw-numeric-figure{syntax:"*";inherits:false}@property --tw-numeric-spacing{syntax:"*";inherits:false}@property --tw-numeric-fraction{syntax:"*";inherits:false}@property --tw-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-shadow-color{syntax:"*";inherits:false}@property --tw-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-inset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-shadow-color{syntax:"*";inherits:false}@property --tw-inset-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-ring-color{syntax:"*";inherits:false}@property --tw-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-ring-color{syntax:"*";inherits:false}@property --tw-inset-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-ring-inset{syntax:"*";inherits:false}@property --tw-ring-offset-width{syntax:"<length>";inherits:false;initial-value:0}@property --tw-ring-offset-color{syntax:"*";inherits:false;initial-value:#fff}@property --tw-ring-offset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-blur{syntax:"*";inherits:false}@property --tw-brightness{syntax:"*";inherits:false}@property --tw-contrast{syntax:"*";inherits:false}@property --tw-grayscale{syntax:"*";inherits:false}@property --tw-hue-rotate{syntax:"*";inherits:false}@property --tw-invert{syntax:"*";inherits:false}@property --tw-opacity{syntax:"*";inherits:false}@property --tw-saturate{syntax:"*";inherits:false}@property --tw-sepia{syntax:"*";inherits:false}@property --tw-drop-shadow{syntax:"*";inherits:false}@property --tw-drop-shadow-color{syntax:"*";inherits:false}@property --tw-drop-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-drop-shadow-size{syntax:"*";inherits:false}@property --tw-duration{syntax:"*";inherits:false}@property --tw-ease{syntax:"*";inherits:false}@property --tw-content{syntax:"*";inherits:false;initial-value:""}@property --tw-backdrop-blur{syntax:"*";inherits:false}@property --tw-backdrop-brightness{syntax:"*";inherits:false}@property --tw-backdrop-contrast{syntax:"*";inherits:false}@property --tw-backdrop-grayscale{syntax:"*";inherits:false}@property --tw-backdrop-hue-rotate{syntax:"*";inherits:false}@property --tw-backdrop-invert{syntax:"*";inherits:false}@property --tw-backdrop-opacity{syntax:"*";inherits:false}@property --tw-backdrop-saturate{syntax:"*";inherits:false}@property --tw-backdrop-sepia{syntax:"*";inherits:false}@property --tw-outline-style{syntax:"*";inherits:false;initial-value:solid}@keyframes spin{to{transform:rotate(360deg)}}@keyframes pulse{50%{opacity:.5}}@keyframes enter{0%{opacity:var(--tw-enter-opacity,1);transform:translate3d(var(--tw-enter-translate-x,0),var(--tw-enter-translate-y,0),0)scale3d(var(--tw-enter-scale,1),var(--tw-enter-scale,1),var(--tw-enter-scale,1))rotate(var(--tw-enter-rotate,0));filter:blur(var(--tw-enter-blur,0))}}@keyframes exit{to{opacity:var(--tw-exit-opacity,1);transform:translate3d(var(--tw-exit-translate-x,0),var(--tw-exit-translate-y,0),0)scale3d(var(--tw-exit-scale,1),var(--tw-exit-scale,1),var(--tw-exit-scale,1))rotate(var(--tw-exit-rotate,0));filter:blur(var(--tw-exit-blur,0))}}
`, "after-all");
export {
  Qg as Alert,
  tf as AlertDescription,
  ef as AlertTitle,
  fw as Avatar,
  mw as AvatarFallback,
  dh as AvatarImage,
  Zp as BOOK_CHAPTER_CONTROL_STRING_KEYS,
  Qp as BOOK_SELECTOR_STRING_KEYS,
  ze as Badge,
  za as BookChapterControl,
  co as BookSelectionMode,
  th as BookSelector,
  Z as Button,
  fo as ButtonGroup,
  Mn as ButtonGroupSeparator,
  rf as ButtonGroupText,
  Gi as CANCEL_ACCEPT_BUTTONS_STRING_KEYS,
  ah as COMMENT_EDITOR_STRING_KEYS,
  pw as COMMENT_LIST_ELEMENT_ID,
  oh as COMMENT_LIST_STRING_KEYS,
  eh as CONFLICT_NOTE_STRING_KEYS,
  Fi as CancelAcceptButtons,
  hw as Card,
  gw as CardContent,
  ch as CardDescription,
  lh as CardFooter,
  ih as CardHeader,
  sh as CardTitle,
  Xl as ChapterRangeSelector,
  Wi as Checkbox,
  sg as CheckboxGroup,
  mp as Checklist,
  nn as ComboBox,
  Ae as Command,
  $r as CommandEmpty,
  be as CommandGroup,
  Pr as CommandInput,
  ke as CommandItem,
  je as CommandList,
  rh as CommentEditor,
  wh as CommentList,
  xw as ConflictNoteCard,
  ug as ContextMenu,
  kg as ContextMenuCheckboxItem,
  vg as ContextMenuContent,
  hg as ContextMenuGroup,
  bg as ContextMenuItem,
  Ng as ContextMenuLabel,
  gg as ContextMenuPortal,
  mg as ContextMenuRadioGroup,
  _g as ContextMenuRadioItem,
  Cg as ContextMenuSeparator,
  Eg as ContextMenuShortcut,
  fg as ContextMenuSub,
  yg as ContextMenuSubContent,
  xg as ContextMenuSubTrigger,
  pg as ContextMenuTrigger,
  Dw as DataTable,
  cg as DestructiveKeyConfirmation,
  Ua as Dialog,
  af as DialogClose,
  Ha as DialogContent,
  of as DialogDescription,
  Bo as DialogFooter,
  Ka as DialogHeader,
  nf as DialogOverlay,
  sf as DialogPortal,
  qa as DialogTitle,
  cf as DialogTrigger,
  qu as DisabledActionTooltip,
  Ku as DisabledTooltipWrapper,
  Tg as Drawer,
  Ig as DrawerClose,
  Rg as DrawerContent,
  Mg as DrawerDescription,
  zg as DrawerFooter,
  Dg as DrawerHeader,
  xp as DrawerOverlay,
  bp as DrawerPortal,
  Og as DrawerTitle,
  Sg as DrawerTrigger,
  Le as DropdownMenu,
  Se as DropdownMenuCheckboxItem,
  Ve as DropdownMenuContent,
  Pn as DropdownMenuGroup,
  ar as DropdownMenuItem,
  Mw as DropdownMenuItemType,
  or as DropdownMenuLabel,
  Ts as DropdownMenuPortal,
  $n as DropdownMenuRadioGroup,
  Ya as DropdownMenuRadioItem,
  Ye as DropdownMenuSeparator,
  lf as DropdownMenuShortcut,
  Cs as DropdownMenuSub,
  Ss as DropdownMenuSubContent,
  Es as DropdownMenuSubTrigger,
  Be as DropdownMenuTrigger,
  zw as ERROR_DUMP_STRING_KEYS,
  gh as ERROR_POPOVER_STRING_KEYS,
  jw as EditorKeyboardShortcuts,
  df as Empty,
  wf as EmptyContent,
  uf as EmptyDescription,
  pf as EmptyHeader,
  hf as EmptyMedia,
  gf as EmptyState,
  ff as EmptyTitle,
  Ow as ErrorDump,
  fh as ErrorPopover,
  kh as FOOTNOTE_EDITOR_STRING_KEYS,
  xh as Filter,
  mh as FilterDropdown,
  bh as Footer,
  yh as FootnoteEditor,
  eu as FootnoteItem,
  _h as FootnoteList,
  ng as INTERFACE_LANGUAGE_PICKER_STRING_KEYS,
  Rh as INVENTORY_STRING_KEYS,
  pa as Input,
  ig as InterfaceLanguagePicker,
  Dh as Inventory,
  Wa as Kbd,
  mf as KbdGroup,
  Tt as Label,
  Uw as MARKER_MENU_STRING_KEYS,
  hh as MarkdownRenderer,
  qw as MarkerMenu,
  vh as MoreInfo,
  fs as MultiSelectComboBox,
  eg as NavigationContentSearch,
  Pe as Popover,
  ys as PopoverAnchor,
  $e as PopoverContent,
  vf as PopoverDescription,
  bf as PopoverHeader,
  Sa as PopoverPortalContainerProvider,
  xf as PopoverTitle,
  De as PopoverTrigger,
  Pg as Progress,
  Cu as ProjectSelector,
  go as RadioGroup,
  na as RadioGroupItem,
  Gl as RecentSearches,
  yf as ResizableHandle,
  kf as ResizablePanel,
  _f as ResizablePanelGroup,
  lg as ResultsCard,
  Nf as RetryableErrorView,
  qh as SCOPE_SELECTOR_STRING_KEYS,
  Xu as SELECT_BOOKS_STRING_KEYS,
  Ir as SHRINK_STEP,
  Yh as ScopeSelector,
  Kh as ScriptureResultsViewer,
  Wh as ScrollGroupSelector,
  jn as SearchBar,
  fr as Select,
  Wu as SelectBooks,
  Hu as SelectBooksPicker,
  br as SelectContent,
  Tw as SelectGroup,
  le as SelectItem,
  uh as SelectLabel,
  Iw as SelectScrollDownButton,
  Sw as SelectScrollUpButton,
  ph as SelectSeparator,
  vr as SelectTrigger,
  mr as SelectValue,
  Dr as Separator,
  Xh as SettingsList,
  Zh as SettingsListHeader,
  Jh as SettingsListItem,
  Au as SettingsSidebar,
  Hh as SettingsSidebarContentSearch,
  fa as ShrinkStepContext,
  Xg as ShrinkStepOverride,
  mi as ShrinkStepOverrideContext,
  Ru as Sidebar,
  zu as SidebarContent,
  $h as SidebarFooter,
  Tn as SidebarGroup,
  jh as SidebarGroupAction,
  In as SidebarGroupContent,
  Sn as SidebarGroupLabel,
  Ph as SidebarHeader,
  Mh as SidebarInput,
  Du as SidebarInset,
  Ou as SidebarMenu,
  Lh as SidebarMenuAction,
  Bh as SidebarMenuBadge,
  $u as SidebarMenuButton,
  Mu as SidebarMenuItem,
  Vh as SidebarMenuSkeleton,
  Gh as SidebarMenuSub,
  Uh as SidebarMenuSubButton,
  Fh as SidebarMenuSubItem,
  Iu as SidebarProvider,
  Oh as SidebarRail,
  Ah as SidebarSeparator,
  zh as SidebarTrigger,
  wr as Skeleton,
  Ag as Slider,
  $g as Sonner,
  Cf as Spinner,
  jg as Switch,
  po as TabDropdownMenu,
  tg as TabFloatingMenu,
  Qh as TabToolbar,
  vo as Table,
  xo as TableBody,
  Ef as TableCaption,
  ur as TableCell,
  Tf as TableFooter,
  ia as TableHead,
  bo as TableHeader,
  Ke as TableRow,
  Lg as Tabs,
  Gg as TabsContent,
  Bg as TabsList,
  Vg as TabsTrigger,
  dg as TextField,
  Xp as Textarea,
  On as ToggleGroup,
  Xr as ToggleGroupItem,
  ag as Toolbar,
  Vl as ToolbarCompoundLabel,
  It as Tooltip,
  Dt as TooltipContent,
  St as TooltipProvider,
  Rt as TooltipTrigger,
  $w as UNDO_REDO_BUTTONS_STRING_KEYS,
  og as UiLanguageSelector,
  Aw as UndoRedoButtons,
  os as VerticalTabs,
  is as VerticalTabsContent,
  ns as VerticalTabsList,
  ep as VerticalTabsTrigger,
  wg as WizardStepper,
  Xe as Z_INDEX_ABOVE_DOCK,
  An as Z_INDEX_ABOVE_POPOVER,
  Sf as Z_INDEX_FIRST_RUN,
  If as Z_INDEX_MODAL,
  Rf as Z_INDEX_MODAL_BACKDROP,
  Df as Z_INDEX_ONBOARDING_TOUR,
  _s as Z_INDEX_OVERLAY,
  zf as badgeVariants,
  Of as buttonGroupVariants,
  Mf as buttonVariants,
  m as cn,
  Ih as getBookIdFromUSFM,
  nh as getCommentThreadElementId,
  va as getInventoryHeader,
  Th as getLinesFromUSFM,
  Sh as getNumberFromUSFM,
  iu as getStatusForItem,
  rg as getToolbarOSReservedSpaceClassName,
  Ch as inventoryCountColumn,
  Nh as inventoryItemColumn,
  Eh as inventoryStatusColumn,
  mo as isMacOs,
  Pf as isWindows,
  Ww as markerMenuItemToPaletteItem,
  Cp as pickTabIconUrl,
  Af as sonner,
  Fg as useEvent,
  Ug as useEventAsync,
  qg as useExtraValidMarkers,
  gs as useListbox,
  _p as usePromise,
  Jp as useRecentSearches,
  Hg as useRetryablePromise,
  Yg as useRunWhenVisible,
  rs as useShrinkStep,
  vi as useShrinkStepOverride,
  Ll as useShrinkStepValue,
  ba as useSidebar,
  Kg as useStylesheet,
  Wg as useTabIconSelection,
  no as useTruncationTooltip,
  Np as useViewVisibility
};
//# sourceMappingURL=index.js.map
