var Uo = Object.defineProperty;
var as = (t, e, r) => e in t ? Uo(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var n = (t, e) => Uo(t, "name", { value: e, configurable: !0 });
var Wt = (t, e, r) => as(t, typeof e != "symbol" ? e + "" : e, r);
import { c as v, g as ve, a as Nr, C as Re, u as Ko, T as Mt, b as Ot, d as It, e as $t, A as we, P as Ae, f as tr, B as J, h as Ve, i as Le, j as je, k as Te, x as os, l as ns, m as is, I as ss, n as po, r as ke, o as cs, p as Pn, q as pa, s as ha, L as Tt, R as ho, t as ra, D as Ka, v as qa, w as Ha, y as Ga, z as An, E as Gr, F as go, G as Vn, H as fo, J as Ze, K as Tr, M as Be, N as Fe, O as Ue, S as Sr, Q as sr, U as ls, V as Dr, W as Qe, X as Ie, Z as er, Y as Me, _ as cr, $ as mo, a0 as vo, a1 as aa, a2 as bo, a3 as Ln, a4 as ds, a5 as ws, a6 as us, a7 as Wa, a8 as jn, a9 as ga, aa as ps, ab as Bn, ac as hs, ad as gs, ae as fs, af as qo, ag as ms, ah as vs, ai as bs, aj as xs, ak as Fn, al as Un, am as xo, an as ys, ao as Kn, ap as Sa, aq as Ho, ar as Ra, as as ks, at as _s, au as Ns, av as Cs, aw as Es, ax as Mr, ay as yo, az as Ts, aA as Ss } from "./resizable-CZmw5iPb.js";
import { aB as Vg, aC as Lg, aD as jg, aE as Bg, aF as Fg, aG as Ug, aH as Kg, aI as qg, aJ as Hg, aK as Gg, aL as Wg, aM as Yg, aN as Xg, aO as Jg, aP as Zg, aQ as Qg, aR as tf, aS as ef, aT as rf, aU as af, aV as of, aW as nf, aX as sf, aY as cf, aZ as lf, a_ as df, a$ as wf } from "./resizable-CZmw5iPb.js";
import { jsx as a, jsxs as p, Fragment as dt } from "react/jsx-runtime";
import { Canon as Dt } from "@sillsdev/scripture";
import { Check as $e, Clock as Go, ChevronsLeft as Wo, ChevronsRight as Yo, ChevronLeft as Ya, ChevronRight as Xa, ArrowLeft as Rs, ArrowRight as zs, ChevronDown as dr, BoldIcon as Ds, ItalicIcon as Ms, X as ko, AtSign as qn, Pencil as Os, Trash2 as Is, ArrowUp as Hn, MoreHorizontal as $s, MailOpen as Ps, Mail as As, ChevronUp as Vs, FilterIcon as Ls, ArrowLeftIcon as js, ChevronLeftIcon as Bs, ChevronRightIcon as Fs, ArrowRightIcon as Us, Copy as Gn, Filter as Ks, User as qs, Link as Hs, CircleHelp as Gs, Undo as Ws, Redo as Ys, SquareX as Wn, FunctionSquare as Yn, SquareSigma as Xn, Ban as Xs, AlertCircle as Ja, CircleCheckIcon as Js, CircleXIcon as Zs, CircleHelpIcon as Qs, ArrowUpIcon as tc, ArrowDownIcon as ec, ScrollText as rc, ChevronsUpDown as ac, MenuIcon as oc, Menu as nc, EllipsisVertical as ic, MoreVertical as sc } from "lucide-react";
import { Section as Et, getChaptersForBook as cc, formatScrRef as Ce, formatReplacementString as Oe, getSectionForBook as Wr, formatRelativeDate as lc, sanitizeHtml as _o, NumberFormat as Jn, formatBytes as dc, getCurrentLocale as wc, usfmMarkers as Yr, isPlatformError as uc, ABORTED as pc, getErrorMessage as hc, getFormatCallerFunction as gc, deepEqual as fc, isString as Xo, compareScrRefs as Za, scrRefToBBBCCCVVV as za, defaultScrRef as Da, formatScrRefRange as mc, getLocalizeKeyForScrollGroupId as Jo, formatReplacementStringToArray as Zo, collectUsjMarkers as vc } from "platform-bible-utils";
import Xt, { useRef as q, useMemo as L, createContext as fa, useContext as No, useState as N, useEffect as Y, useCallback as B, useImperativeHandle as bc, useLayoutEffect as ee, Component as xc, createElement as Qo, Suspense as yc, forwardRef as Zn, useId as tn, Fragment as ma } from "react";
import { IconSelector as Qn, IconCheck as va, IconChevronDown as kc, IconChevronUp as _c, IconLayoutSidebar as Nc, IconLayoutSidebarRight as Cc, IconChevronRight as ti, IconSearch as Ec, IconLoader as Tc, IconAlertOctagon as Sc, IconAlertTriangle as Rc, IconInfoCircle as zc, IconCircleCheck as Dc } from "@tabler/icons-react";
import { createEditor as ei, $getRoot as Pe, $createParagraphNode as Or, $getSelection as re, HISTORY_MERGE_TAG as Co, ParagraphNode as ri, TextNode as ai, $getPreviousSelection as Mc, $isRangeSelection as xe, $caretFromPoint as Oc, $getSiblingCaret as oi, $getChildCaret as Ic, $getAdjacentChildCaret as $c, $isChildCaret as Pc, $normalizeCaret as Ac, $setSelectionFromCaretRange as Vc, $getCollapsedCaretRange as Lc, $getCaretInDirection as en, $splitAtPointCaretNext as jc, $isTextPointCaret as Bc, $findMatchingParent as ni, $isElementNode as Rr, mergeRegister as Se, getDOMTextNode as Fc, isHTMLElement as Uc, CLEAR_EDITOR_COMMAND as ii, COMMAND_PRIORITY_EDITOR as Eo, shallowMergeConfig as Kc, defineExtension as ie, safeCast as rr, createState as qc, FORMAT_TEXT_COMMAND as si, $isNodeSelection as ci, COMMAND_PRIORITY_LOW as li, RootNode as Hc, LineBreakNode as Gc, TabNode as Wc, $isEditorState as Yc, createCommand as Xc, CLICK_COMMAND as Jc, isDOMNode as Zc, $getNodeFromDOMNode as Qc, $createNodeSelection as tl, $setSelection as el, $getEditor as rl, DecoratorNode as Qa, $getState as al, toggleTextFormatType as rn, TEXT_TYPE_TO_FORMAT as ol, $setState as nl, addClassNamesToElement as di, $create as il, $getNodeByKey as sl, removeClassNamesFromElement as cl, KEY_TAB_COMMAND as ll, $isBlockElementNode as dl, $createRangeSelection as wl, $normalizeSelection__EXPERIMENTAL as ul, OUTDENT_CONTENT_COMMAND as pl, INDENT_CONTENT_COMMAND as an, INSERT_TAB_COMMAND as hl, COMMAND_PRIORITY_CRITICAL as To, $isDecoratorNode as gl, $isParagraphNode as fl, $isTextNode as to, SELECTION_CHANGE_COMMAND as wi, $insertNodes as ml } from "lexical";
import { HeadingNode as vl, QuoteNode as bl, registerRichText as xl } from "@lexical/rich-text";
import { flushSync as yl, createPortal as kl } from "react-dom";
import { $isTableSelection as _l } from "@lexical/table";
import { createHeadlessEditor as ui } from "@lexical/headless";
import { $generateHtmlFromNodes as Nl, $generateNodesFromDOM as Cl } from "@lexical/html";
import { Avatar as So, Select as Jt, Checkbox as on, Slot as Ir, Tabs as ue, Menubar as _e, ContextMenu as Pt, Progress as nn, Slider as Fr, Switch as sn } from "radix-ui";
import { useReactTable as pi, getFilteredRowModel as El, getSortedRowModel as hi, getPaginationRowModel as Tl, getCoreRowModel as gi, flexRender as Cr, getGroupedRowModel as Sl, getExpandedRowModel as Rl } from "@tanstack/react-table";
import zl from "markdown-to-jsx";
import { GENERATOR_NOTE_CALLER as eo, HIDDEN_NOTE_CALLER as ro, getDefaultViewOptions as Dl, isInsertEmbedOpOfType as yr, getMarkerMenuItems as Ml, defaultStyleInfo as Ol, Editorial as Il } from "@eten-tech-foundation/platform-editor";
import { cva as Ro } from "class-variance-authority";
import { useHotkeys as $l } from "react-hotkeys-hook";
import { Drawer as Ke } from "vaul";
import { useTheme as Pl } from "next-themes";
import { Toaster as Al } from "sonner";
import { toast as pf } from "sonner";
function Rp({ className: t, ...e }) {
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
n(Rp, "Textarea");
function fi({
  ref: t,
  bookId: e,
  isSelected: r,
  onSelect: o,
  onMouseDown: i,
  section: s,
  className: c,
  showCheck: l = !1,
  localizedBookNames: d,
  commandValue: w,
  disabled: u = !1,
  dimmedReason: h,
  dimmedDescription: g
}) {
  const f = q(!1), m = /* @__PURE__ */ n(() => {
    u || (f.current || o == null || o(e), setTimeout(() => {
      f.current = !1;
    }, 100));
  }, "handleSelect"), y = /* @__PURE__ */ n((S) => {
    if (u) {
      S.preventDefault();
      return;
    }
    f.current = !0, i ? i(S) : o == null || o(e);
  }, "handleMouseDown"), b = L(
    () => ve(e, d),
    [e, d]
  ), z = L(
    () => Nr(e, d),
    [e, d]
  ), k = !!h && !u, E = `${b} (${z})`, T = k ? g || `${E}, ${h}` : E, P = /* @__PURE__ */ p(
    Re,
    {
      ref: t,
      value: w || `${e} ${Dt.bookIdToEnglishName(e)}`,
      onSelect: m,
      onMouseDown: y,
      role: "option",
      "aria-selected": r,
      "aria-disabled": u || void 0,
      "aria-label": T,
      disabled: u,
      className: v(
        c,
        u && "tw:cursor-not-allowed tw:opacity-50",
        // Mirrors NumberedItemGrid's dimmed-vs-disabled split — same tokens, so chapter/verse cells
        // and book rows grey identically inside one popover: dimmed is presentation only, so it
        // never sets aria-disabled or blocks onSelect, and it yields to disabled.
        k && "tw:bg-muted/50 tw:text-muted-foreground/50"
      ),
      children: [
        l && /* @__PURE__ */ a(
          $e,
          {
            className: v(
              "tw:me-2 tw:h-4 tw:w-4 tw:shrink-0",
              r ? "tw:opacity-100" : "tw:opacity-0"
            )
          }
        ),
        /* @__PURE__ */ a("span", { className: "tw:min-w-0 tw:flex-1", children: b }),
        k && // Visible rather than hover-only: cmdk never moves DOM focus onto an item (the input keeps
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
              !k && "tw:text-muted-foreground"
            ),
            children: z
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
          "tw:border-s-red-200": s === Et.OT,
          "tw:border-s-purple-200": s === Et.NT,
          "tw:border-s-indigo-200": s === Et.DC,
          "tw:border-s-amber-200": s === Et.Extra
        }
      ),
      children: P
    }
  );
}
n(fi, "BookItem");
const Xr = Object.freeze({
  /** Full labels. */
  WIDE: 0,
  /** Abbreviated primary label form. */
  TIGHT: 1,
  /** Secondary field clipped with an ellipsis — CSS does this on its own. */
  TIGHTER: 2,
  /** Secondary field dropped entirely; primary field alone. */
  MINIMUM: 3
}), zo = fa(Xr.WIDE);
function Vl() {
  return No(zo);
}
n(Vl, "useShrinkStepValue");
let ao = "keyboard", cn = !1;
function Ll() {
  cn || typeof document > "u" || (cn = !0, document.addEventListener(
    "pointerdown",
    () => {
      ao = "pointer";
    },
    !0
  ), document.addEventListener(
    "keydown",
    () => {
      ao = "keyboard";
    },
    !0
  ));
}
n(Ll, "trackInteractionModality");
function jl({
  primary: t,
  secondary: e,
  separator: r = " ",
  secondaryFirst: o = !1,
  showSecondary: i = !0,
  isPartial: s,
  fullText: c,
  className: l
}) {
  const {
    ref: d,
    open: w,
    onPointerEnter: u,
    onPointerLeave: h
  } = Ko(), {
    ref: g,
    open: f,
    onPointerEnter: m,
    onPointerLeave: y
  } = Ko(), [b, z] = N(!1), [k, E] = N(!1), T = q(
    // React's ref API requires `null` as the initial value for DOM refs.
    // eslint-disable-next-line no-null/no-null
    null
  ), P = i && e !== void 0, S = s ?? (e !== void 0 && !i);
  Y(() => {
    var D;
    Ll();
    const tt = (D = T.current) == null ? void 0 : D.closest('button, [role="combobox"], [tabindex]');
    if (!tt) return;
    const $ = /* @__PURE__ */ n((G) => !!G && G.scrollWidth > G.clientWidth, "isClipped"), et = /* @__PURE__ */ n(() => {
      ao !== "pointer" && (S || $(g.current) || $(d.current)) && E(!0);
    }, "reveal"), C = /* @__PURE__ */ n(() => E(!1), "hide");
    return tt.addEventListener("focus", et), tt.addEventListener("blur", C), () => {
      tt.removeEventListener("focus", et), tt.removeEventListener("blur", C);
    };
  }, [S, g, d]);
  const U = B(() => {
    S && z(!0), m(), P && u();
  }, [
    S,
    P,
    m,
    u
  ]), V = B(() => {
    z(!1), E(!1), y(), h();
  }, [y, h]);
  Y(() => {
    S || z(!1);
  }, [S]);
  const M = /* @__PURE__ */ a("span", { ref: g, className: "tw:min-w-0 tw:shrink tw:truncate", children: t }, "primary"), K = P ? (
    // Weighted to absorb essentially all of the shrinking, so the primary field only starts losing
    // characters once this one has none left.
    /* @__PURE__ */ a("span", { ref: d, className: "tw:min-w-0 tw:shrink-[9999] tw:truncate", children: e }, "secondary")
  ) : void 0, [X, H] = o ? [K, M] : [M, K];
  return (
    // Nested TooltipProviders are harmless in Radix, so carrying our own means this works in any
    // host, including toolbars that never set one up.
    /* @__PURE__ */ a(Mt, { children: /* @__PURE__ */ p(
      Ot,
      {
        open: f || w || b || k,
        onOpenChange: /* @__PURE__ */ n((tt) => {
          tt || V();
        }, "onOpenChange"),
        children: [
          /* @__PURE__ */ a(It, { asChild: !0, children: /* @__PURE__ */ p(
            "span",
            {
              ref: T,
              onPointerEnter: U,
              onPointerLeave: V,
              onPointerDown: V,
              className: v("tw:flex tw:min-w-0 tw:items-center", l),
              children: [
                X,
                X && H && /* @__PURE__ */ a("span", { className: "tw:shrink-0 tw:whitespace-pre", children: r }, "separator"),
                H
              ]
            }
          ) }),
          /* @__PURE__ */ a($t, { children: c })
        ]
      }
    ) })
  );
}
n(jl, "ToolbarCompoundLabel");
function mi(t, e, r) {
  return `${t} ${we[t]}${e ? ` ${Nr(t, e)} ${ve(t, e)}` : ""}`;
}
n(mi, "generateCommandValue");
function Bl({
  recentSearches: t,
  onSearchItemSelect: e,
  renderItem: r = /* @__PURE__ */ n((g) => String(g), "renderItem"),
  getItemKey: o = /* @__PURE__ */ n((g) => String(g), "getItemKey"),
  ariaLabel: i = "Show recent searches",
  groupHeading: s = "Recent",
  id: c,
  classNameForItems: l,
  buttonClassName: d = "tw:absolute tw:right-0 tw:top-0 tw:h-full tw:px-3 tw:py-2",
  buttonVariant: w = "ghost",
  open: u,
  onOpenChange: h
}) {
  const [g, f] = N(!1), m = u !== void 0, y = m ? u : g, b = /* @__PURE__ */ n((k) => {
    m || f(k), h == null || h(k);
  }, "setIsOpen");
  if (t.length === 0)
    return;
  const z = /* @__PURE__ */ n((k) => {
    e(k), b(!1);
  }, "handleSearchItemSelect");
  return /* @__PURE__ */ p(Ae, { open: y, onOpenChange: b, children: [
    /* @__PURE__ */ a(tr, { asChild: !0, children: /* @__PURE__ */ a(
      J,
      {
        variant: w,
        size: "icon",
        className: d,
        "aria-label": i,
        children: /* @__PURE__ */ a(Go, { className: "tw:h-4 tw:w-4" })
      }
    ) }),
    /* @__PURE__ */ a(Ve, { id: c, className: "tw:w-[300px] tw:p-0", align: "start", children: /* @__PURE__ */ a(Le, { children: /* @__PURE__ */ a(je, { children: /* @__PURE__ */ a(Te, { heading: s, children: t.map((k) => /* @__PURE__ */ p(
      Re,
      {
        onSelect: /* @__PURE__ */ n(() => z(k), "onSelect"),
        className: v("tw:flex tw:items-center", l),
        children: [
          /* @__PURE__ */ a(Go, { className: "tw:mr-2 tw:h-4 tw:w-4 tw:opacity-50" }),
          /* @__PURE__ */ a("span", { children: r(k) })
        ]
      },
      o(k)
    )) }) }) }) })
  ] });
}
n(Bl, "RecentSearches");
function zp(t, e, r = (i, s) => i === s, o = 15) {
  return (i) => {
    const s = t.filter(
      (l) => !r(l, i)
    ), c = [i, ...s.slice(0, o - 1)];
    e(c);
  };
}
n(zp, "useRecentSearches");
function Ur(t, e) {
  return !e || e.book === t.book && e.chapterNum === t.chapterNum && e.verseNum === t.verseNum;
}
n(Ur, "isNoOpNavigation");
function Fl(t, e, r, o) {
  const i = L(
    () => os(t, e),
    [t, e]
  ), s = L(
    () => ns(t, e),
    [t, e]
  ), c = L(
    () => is(t, e),
    [t, e]
  ), l = L(
    () => ss(t, e),
    [t, e]
  ), d = B(
    (w) => {
      w && o(w);
    },
    [o]
  );
  return L(() => [
    {
      onClick: /* @__PURE__ */ n(() => d(i), "onClick"),
      disabled: Ur(t, i),
      title: "Previous chapter",
      icon: r === "ltr" ? Wo : Yo
    },
    {
      onClick: /* @__PURE__ */ n(() => d(c), "onClick"),
      disabled: Ur(t, c),
      title: "Previous verse",
      icon: r === "ltr" ? Ya : Xa
    },
    {
      onClick: /* @__PURE__ */ n(() => d(l), "onClick"),
      disabled: Ur(t, l),
      title: "Next verse",
      icon: r === "ltr" ? Xa : Ya
    },
    {
      onClick: /* @__PURE__ */ n(() => d(s), "onClick"),
      disabled: Ur(t, s),
      title: "Next chapter",
      icon: r === "ltr" ? Yo : Wo
    }
  ], [
    t,
    r,
    d,
    i,
    c,
    l,
    s
  ]);
}
n(Fl, "useQuickNavButtons");
const Jr = {
  // Matches start of string (`^`), one or more non-colon/space words, optionally followed by space and more words (`([^:\s]+(?:\s+[^:\s]+)*)`), end of string (`$`), case-insensitive (`i`)
  BOOK_ONLY: /^([^:\s]+(?:\s+[^:\s]+)*)$/i,
  // Same as above, but followed by a space and a chapter number (`\s+(\d+)`)
  BOOK_CHAPTER: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,
  // Same as above, but followed by a colon and optionally a verse number (`:(\d*)`)
  BOOK_CHAPTER_VERSE: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i
}, Ul = [
  Jr.BOOK_ONLY,
  Jr.BOOK_CHAPTER,
  Jr.BOOK_CHAPTER_VERSE
];
function Kl(t) {
  return Jr.BOOK_CHAPTER_VERSE.test(t.trim());
}
n(Kl, "hasChapterVerseSeparator");
function ln(t, e) {
  return Dt.bookIdToNumber(t) < Dt.bookIdToNumber(e.book);
}
n(ln, "isBookBefore");
function ql(t, e, r) {
  const o = Dt.bookIdToNumber(t) - Dt.bookIdToNumber(r.book);
  return o < 0 ? !0 : o > 0 ? !1 : e < r.chapterNum;
}
n(ql, "isChapterBefore");
function Ma(t, e, r, o) {
  const i = Dt.bookIdToNumber(t) - Dt.bookIdToNumber(o.book);
  return i < 0 ? !0 : i > 0 ? !1 : e < o.chapterNum ? !0 : e > o.chapterNum ? !1 : r < o.verseNum;
}
n(Ma, "isVerseBefore");
function dn(t) {
  const e = /^[a-zA-Z]$/.test(t), r = /^[0-9]$/.test(t);
  return { isLetter: e, isDigit: r };
}
n(dn, "getKeyCharacterType");
function lr(t) {
  return cc(Dt.bookIdToNumber(t));
}
n(lr, "fetchEndChapter");
function Hl(t, e, r) {
  if (!t.trim() || e.length === 0) return;
  const o = Ul.reduce(
    (i, s) => {
      if (i) return i;
      const c = s.exec(t.trim());
      if (c) {
        const [l, d = void 0, w = void 0] = c.slice(1);
        let u;
        const h = e.filter((g) => po(g, l, r));
        if (h.length === 1 && ([u] = h), !u && d) {
          if (Dt.isBookIdValid(l)) {
            const g = l.toUpperCase();
            e.includes(g) && (u = g);
          }
          if (!u && r) {
            const g = Array.from(r.entries()).find(
              ([, f]) => f.localizedId.toLowerCase() === l.toLowerCase()
            );
            g && e.includes(g[0]) && ([u] = g);
          }
        }
        if (!u && d) {
          const f = (/* @__PURE__ */ n((m) => Object.keys(we).find(
            (y) => we[y].toLowerCase() === m.toLowerCase()
          ), "getBookIdFromEnglishName"))(l);
          if (f && e.includes(f) && (u = f), !u && r) {
            const m = Array.from(r.entries()).find(
              ([, y]) => y.localizedName.toLowerCase() === l.toLowerCase()
            );
            m && e.includes(m[0]) && ([u] = m);
          }
        }
        if (u) {
          let g = d ? parseInt(d, 10) : void 0;
          g && g > lr(u) && (g = Math.max(lr(u), 1));
          const f = w ? parseInt(w, 10) : void 0;
          return {
            book: u,
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
n(Hl, "calculateTopMatch");
function oo(t) {
  return {
    [Et.OT]: t.filter((e) => Dt.isBookOT(e)),
    [Et.NT]: t.filter((e) => Dt.isBookNT(e)),
    [Et.DC]: t.filter((e) => Dt.isBookDC(e)),
    [Et.Extra]: t.filter((e) => Dt.extraBooks().includes(e))
  };
}
n(oo, "groupBooksBySection");
function Gl(t, e) {
  const r = new Set(t), o = e.filter((w) => !r.has(w)), i = new Set(o), s = i.size === 0 ? t : Dt.allBookIds.filter(
    (w) => r.has(w) || i.has(w)
  ), c = oo(s), l = Object.values(c).flat(), d = oo(t);
  return {
    projectBooksBySection: d,
    reachableBooksBySection: c,
    reachableBooks: l,
    // Grouped and flattened like `reachableBooks`, so it inherits the same peripheral-id exclusion.
    projectBooks: Object.values(d).flat(),
    // Derived from the grouped-and-flattened list, so a peripheral id that grouping dropped can
    // never be marked dimmed for a list it is not part of.
    booksOutsideProject: new Set(l.filter((w) => !r.has(w)))
  };
}
n(Gl, "deriveBookChapterControlBookLists");
function vi({
  count: t,
  valueBuilder: e,
  onSelect: r,
  itemRef: o,
  isDisabled: i,
  isDimmed: s,
  isSelected: c,
  className: l
}) {
  if (!(t <= 0))
    return /* @__PURE__ */ a(Te, { children: /* @__PURE__ */ a("div", { className: v("tw:grid tw:grid-cols-6 tw:gap-1", l), children: Array.from({ length: t }, (d, w) => w + 1).map((d) => {
      const w = (i == null ? void 0 : i(d)) ?? !1;
      return /* @__PURE__ */ a(
        Re,
        {
          value: e(d),
          onSelect: /* @__PURE__ */ n(() => {
            w || r(d);
          }, "onSelect"),
          ref: o(d),
          disabled: w,
          "aria-disabled": w || void 0,
          className: v(
            "tw:h-8 tw:w-8 tw:cursor-pointer tw:justify-center tw:rounded-md tw:text-center tw:text-sm",
            {
              "tw:bg-primary tw:text-primary-foreground": (c == null ? void 0 : c(d)) ?? !1
            },
            {
              "tw:bg-muted/50 tw:text-muted-foreground/50": ((s == null ? void 0 : s(d)) ?? !1) && !w
            },
            w && "tw:cursor-not-allowed tw:opacity-40"
          ),
          children: d
        },
        d
      );
    }) }) });
}
n(vi, "NumberedItemGrid");
function wn({
  bookId: t,
  scrRef: e,
  onChapterSelect: r,
  setChapterRef: o,
  isChapterDimmed: i,
  isChapterDisabled: s,
  className: c
}) {
  if (t)
    return /* @__PURE__ */ a(
      vi,
      {
        count: lr(t),
        valueBuilder: /* @__PURE__ */ n((l) => `${t} ${we[t] || ""} ${l}`, "valueBuilder"),
        onSelect: r,
        itemRef: o,
        isDisabled: s,
        isDimmed: i,
        isSelected: /* @__PURE__ */ n((l) => t === e.book && l === e.chapterNum, "isSelected"),
        className: c
      }
    );
}
n(wn, "ChapterGrid");
function un({
  bookId: t,
  chapterNum: e,
  endVerse: r,
  scrRef: o,
  onVerseSelect: i,
  setVerseRef: s,
  isVerseDimmed: c,
  isVerseDisabled: l,
  className: d
}) {
  if (!(!t || r <= 0))
    return /* @__PURE__ */ a(
      vi,
      {
        count: r,
        valueBuilder: /* @__PURE__ */ n((w) => `${t} ${we[t] || ""} ${e}:${w}`, "valueBuilder"),
        onSelect: i,
        itemRef: s,
        isDisabled: l,
        isDimmed: c,
        isSelected: /* @__PURE__ */ n((w) => t === o.book && e === o.chapterNum && w === o.verseNum, "isSelected"),
        className: d
      }
    );
}
n(un, "VerseGrid");
function Oa({
  scrRef: t,
  handleSubmit: e,
  className: r,
  getActiveBookIds: o,
  getAdditionalBookIds: i,
  localizedBookNames: s,
  localizedStrings: c,
  recentSearches: l,
  onAddRecentSearch: d,
  id: w,
  getEndVerse: u,
  disableReferencesUpTo: h,
  submitKeys: g,
  triggerContent: f,
  triggerVariant: m = "outline",
  showTriggerChevron: y = !1,
  onOpenChange: b,
  onCloseAutoFocus: z,
  modal: k = !1,
  align: E = "center",
  ref: T,
  disabled: P,
  shrinkStep: S
}) {
  const U = ke(), V = Vl(), M = S ?? V, [K, X] = N(!1), [H, tt] = N(""), [$, et] = N(""), [C, D] = N("books"), [G, it] = N(void 0), [ot, ht] = N(
    void 0
  ), [wt, Z] = N(void 0), [ut, ft] = N(!1), [mt, vt] = N(!1), Zt = q(null), bt = q(!1), At = q(void 0), Vt = q(void 0), xt = q(void 0), Ft = q(void 0), St = q({}), Ut = q({}), lt = B(
    (_) => {
      e(_), d && d(_);
    },
    [e, d]
  ), _t = L(() => o ? o() : cs, [o]), Lt = L(
    () => o && i ? i() : [],
    [o, i]
  ), {
    projectBooksBySection: se,
    reachableBooksBySection: ce,
    reachableBooks: Kt,
    projectBooks: qe,
    booksOutsideProject: qt
  } = L(
    () => Gl(_t, Lt),
    [_t, Lt]
  ), oe = qt.has(t.book), Qt = L(() => $.trim() ? oo(
    Kt.filter((_) => po(_, $, s))
  ) : mt ? ce : se, [
    se,
    ce,
    Kt,
    mt,
    $,
    s
  ]), O = L(
    () => Hl($, Kt, s),
    [$, Kt, s]
  ), le = q(!1);
  Y(() => {
    if (!le.current) {
      le.current = !0;
      return;
    }
    b == null || b(K);
  }, [K, b]);
  const jt = B(() => {
    if (O) {
      const _ = O.chapterNum ?? 1, at = O.verseNum ?? 1;
      if (h && Ma(O.book, _, at, h))
        return;
      lt({
        book: O.book,
        chapterNum: _,
        verseNum: at
      }), X(!1), et(""), tt("");
    }
  }, [lt, O, h]), Ht = B(
    (_) => {
      const at = ot ?? (O == null ? void 0 : O.book), nt = wt ?? (O == null ? void 0 : O.chapterNum);
      !at || !nt || (lt({
        book: at,
        chapterNum: nt,
        verseNum: _
      }), X(!1));
    },
    [lt, ot, wt, O]
  ), pe = B(
    (_) => {
      if (h && ln(_, h)) return;
      if (lr(_) <= 1) {
        lt({
          book: _,
          chapterNum: 1,
          verseNum: 1
        }), X(!1), et("");
        return;
      }
      it(_), D("chapters");
    },
    [lt, h]
  ), he = B(
    (_) => {
      const at = C === "chapters" ? G : O == null ? void 0 : O.book;
      if (at) {
        if (u && u(at, _) > 1) {
          ht(at), Z(_), D("verses"), tt("");
          return;
        }
        lt({
          book: at,
          chapterNum: _,
          verseNum: 1
        }), X(!1);
      }
    },
    [lt, C, G, O, u]
  ), R = B(
    (_) => {
      lt(_), X(!1), et("");
    },
    [lt]
  ), F = Fl(
    t,
    mt ? Kt : qe,
    U,
    e
  ), W = B(() => {
    D("books"), it(void 0), ht(void 0), Z(void 0), setTimeout(() => {
      Vt.current && Vt.current.focus();
    }, 0);
  }, []), x = B(() => {
    const _ = ot;
    ht(void 0), Z(void 0), _ ? (it(_), D("chapters"), tt("")) : W();
  }, [ot, W]), j = B(
    (_) => {
      X(_), _ && (D("books"), it(void 0), ht(void 0), Z(void 0), et(""), vt(oe));
    },
    [oe]
  );
  Y(() => {
    P && j(!1);
  }, [P, j]);
  const [A, rt] = N(0);
  Y(() => {
    var _;
    A !== 0 && ((_ = Vt.current) == null || _.focus());
  }, [A]), bc(
    T,
    () => ({
      open: /* @__PURE__ */ n(() => {
        P || (j(!0), rt((_) => _ + 1));
      }, "open")
    }),
    [j, P]
  );
  const { otLong: ct, ntLong: gt, dcLong: yt, extraLong: Nt } = {
    otLong: c == null ? void 0 : c["%scripture_section_ot_long%"],
    ntLong: c == null ? void 0 : c["%scripture_section_nt_long%"],
    dcLong: c == null ? void 0 : c["%scripture_section_dc_long%"],
    extraLong: c == null ? void 0 : c["%scripture_section_extra_long%"]
  }, Bt = B(
    (_) => Pn(_, ct, gt, yt, Nt),
    [ct, gt, yt, Nt]
  ), ae = B(
    (_) => O ? !!O.chapterNum && !_.toString().includes(O.chapterNum.toString()) : !1,
    [O]
  ), $r = L(
    () => Ce(
      t,
      s ? ve(t.book, s) : "English"
    ),
    [t, s]
  ), ar = L(
    () => M >= Xr.TIGHT ? Nr(t.book, s) : ve(t.book, s),
    [t.book, s, M]
  ), He = `${t.chapterNum}:${t.verseNum}`, Pr = B((_) => (at) => {
    St.current[_] = at;
  }, []), ka = B((_) => (at) => {
    Ut.current[_] = at;
  }, []), Ar = L(
    () => Kl($),
    [$]
  ), mr = L(() => !u || !O || !O.chapterNum || !Ar ? !1 : u(O.book, O.chapterNum) > 0, [u, O, Ar]), Vr = C === "books" && !ut && !$.trim() && qt.size > 0, vr = B(
    (_) => h ? ln(_, h) : !1,
    [h]
  ), br = B(
    (_) => (at) => h ? ql(_, at, h) : !1,
    [h]
  ), Ge = B(
    (_, at) => (nt) => h ? Ma(_, at, nt, h) : !1,
    [h]
  ), Lr = (c == null ? void 0 : c["%webView_bookChapterControl_selectChapter%"]) || "Select chapter", We = (c == null ? void 0 : c["%webView_bookChapterControl_selectVerse%"]) || "Select verse", _a = (c == null ? void 0 : c["%webView_bookChapterControl_bookNotInProject%"]) || "Not in project", Ye = (c == null ? void 0 : c["%webView_bookChapterControl_bookNotInProjectDescription%"]) || "{book} is not in this project", Na = B(
    (_) => Oe(Ye, {
      book: `${ve(_, s)} (${Nr(
        _,
        s
      )})`
    }),
    [Ye, s]
  ), Ca = (c == null ? void 0 : c["%webView_bookChapterControl_showMoreBooks%"]) || "Show more books", Ea = (c == null ? void 0 : c["%webView_bookChapterControl_showProjectBooksOnly%"]) || "Show project books only", Ta = B(
    (_) => {
      (_.key === "Home" || _.key === "End") && _.stopPropagation(), g && g.includes(_.key) && O && O.chapterNum !== void 0 && O.verseNum !== void 0 && (_.preventDefault(), _.stopPropagation(), jt());
    },
    [g, O, jt]
  ), jr = B(
    (_) => {
      var Q, Ct, ge;
      if (_.ctrlKey) return;
      const { isLetter: at, isDigit: nt } = dn(_.key);
      if ((C === "chapters" || C === "verses") && (_.key === " " || _.key === "Enter")) {
        const Gt = _.target instanceof HTMLElement ? _.target : void 0;
        if (!!(Gt != null && Gt.closest(
          'button, a, input, select, textarea, [role="button"]'
        ))) {
          _.stopPropagation();
          return;
        }
        const te = (Q = At.current) == null ? void 0 : Q.querySelector(
          '[cmdk-item][data-selected="true"]:not([data-disabled="true"])'
        );
        if (te) {
          _.preventDefault(), _.stopPropagation(), te.click();
          return;
        }
      }
      if ((C === "chapters" || C === "verses") && (at || nt)) {
        _.preventDefault(), _.stopPropagation();
        return;
      }
      if (C === "chapters" && _.key === "Backspace") {
        _.preventDefault(), _.stopPropagation(), W();
        return;
      }
      if (C === "verses" && _.key === "Backspace") {
        _.preventDefault(), _.stopPropagation(), x();
        return;
      }
      const I = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(_.key);
      if (C === "verses" && I) {
        const Gt = ot, Rt = wt;
        if (!Gt || !Rt || !u) return;
        const te = u(Gt, Rt);
        if (!te) return;
        (Ct = At.current) == null || Ct.focus();
        const kt = (() => {
          if (!H) return 1;
          const xr = H.match(/:(\d+)$/);
          return xr ? parseInt(xr[1], 10) : 0;
        })();
        let fe = kt;
        const ze = 6;
        switch (_.key) {
          case "ArrowLeft":
            kt !== 0 && (fe = kt > 1 ? kt - 1 : te);
            break;
          case "ArrowRight":
            kt !== 0 && (fe = kt < te ? kt + 1 : 1);
            break;
          case "ArrowUp":
            fe = kt === 0 ? te : Math.max(1, kt - ze);
            break;
          case "ArrowDown":
            fe = kt === 0 ? 1 : Math.min(te, kt + ze);
            break;
          default:
            return;
        }
        fe !== kt && (_.preventDefault(), _.stopPropagation(), tt(
          `${Gt} ${we[Gt] || ""} ${Rt}:${fe}`
        ), setTimeout(() => {
          const xr = Ut.current[fe];
          xr && xr.scrollIntoView({ block: "nearest", behavior: "smooth" });
        }, 0));
        return;
      }
      if ((C === "chapters" || C === "books" && O) && I) {
        const Gt = C === "chapters" ? G : O == null ? void 0 : O.book;
        if (!Gt) return;
        C === "chapters" && ((ge = At.current) == null || ge.focus());
        const Rt = (() => {
          if (!H) return 1;
          const ze = H.match(/(\d+)$/);
          return ze ? parseInt(ze[1], 10) : 0;
        })(), te = lr(Gt);
        if (!te) return;
        let kt = Rt;
        const fe = 6;
        switch (_.key) {
          case "ArrowLeft":
            Rt !== 0 && (kt = Rt > 1 ? Rt - 1 : te);
            break;
          case "ArrowRight":
            Rt !== 0 && (kt = Rt < te ? Rt + 1 : 1);
            break;
          case "ArrowUp":
            kt = Rt === 0 ? te : Math.max(1, Rt - fe);
            break;
          case "ArrowDown":
            kt = Rt === 0 ? 1 : Math.min(te, Rt + fe);
            break;
          default:
            return;
        }
        kt !== Rt && (_.preventDefault(), _.stopPropagation(), tt(
          `${Gt} ${we[Gt] || ""} ${kt}`
        ), setTimeout(() => {
          const ze = St.current[kt];
          ze && ze.scrollIntoView({ block: "nearest", behavior: "smooth" });
        }, 0));
      }
    },
    [
      C,
      O,
      W,
      x,
      G,
      ot,
      wt,
      u,
      H
    ]
  ), Br = B((_) => {
    var I;
    if (_.shiftKey || _.key === "Tab" || _.key === " ") return;
    if (_.key === "Enter") {
      _.stopPropagation();
      return;
    }
    if (_.key === "ArrowUp" || _.key === "ArrowDown") {
      (I = Vt.current) == null || I.focus();
      return;
    }
    const { isLetter: at, isDigit: nt } = dn(_.key);
    (at || nt) && (_.preventDefault(), et((Q) => Q + _.key), Vt.current.focus(), ft(!1));
  }, []);
  return ee(() => {
    const _ = setTimeout(() => {
      if (K && C === "books" && xt.current && Ft.current) {
        const at = xt.current, nt = Ft.current, I = nt.offsetTop, Q = at.clientHeight, Ct = nt.clientHeight, ge = I - Q / 2 + Ct / 2;
        at.scrollTo({
          top: Math.max(0, ge),
          behavior: "smooth"
        }), tt(mi(t.book));
      }
    }, 0);
    return () => {
      clearTimeout(_);
    };
  }, [K, C, $, O, t.book]), ee(() => {
    if (C === "chapters" && G) {
      const _ = G === t.book, at = _ ? t.chapterNum : 1;
      tt(
        `${G} ${we[G] || ""} ${at}`
      ), setTimeout(() => {
        if (xt.current)
          if (_) {
            const nt = St.current[t.chapterNum];
            nt && nt.scrollIntoView({ block: "center", behavior: "smooth" });
          } else
            xt.current.scrollTo({ top: 0 });
        At.current && At.current.focus();
      }, 0);
    }
  }, [C, G, O, t.book, t.chapterNum]), ee(() => {
    if (C === "verses" && ot && wt !== void 0) {
      const _ = ot === t.book && wt === t.chapterNum, at = _ ? t.verseNum : 1;
      tt(
        `${ot} ${we[ot] || ""} ${wt}:${at}`
      ), setTimeout(() => {
        if (xt.current)
          if (_) {
            const nt = Ut.current[t.verseNum];
            nt && nt.scrollIntoView({ block: "center", behavior: "smooth" });
          } else
            xt.current.scrollTo({ top: 0 });
        At.current && At.current.focus();
      }, 0);
    }
  }, [
    C,
    ot,
    wt,
    t.book,
    t.chapterNum,
    t.verseNum
  ]), /* @__PURE__ */ p(Ae, { open: K, onOpenChange: j, modal: k, children: [
    /* @__PURE__ */ a(tr, { asChild: !0, children: /* @__PURE__ */ p(
      J,
      {
        ref: Zt,
        "aria-label": "book-chapter-trigger",
        variant: m,
        role: "combobox",
        "aria-expanded": K,
        disabled: P,
        className: v(
          "tw:h-8 tw:w-full tw:min-w-16 tw:max-w-48 tw:shrink tw:overflow-hidden tw:px-1",
          r
        ),
        onClick: /* @__PURE__ */ n((_) => {
          bt.current && (bt.current = !1, _.preventDefault());
        }, "onClick"),
        children: [
          f ?? /* @__PURE__ */ a(
            jl,
            {
              primary: ar,
              secondary: He,
              showSecondary: M < Xr.MINIMUM,
              isPartial: M >= Xr.TIGHT,
              fullText: $r
            }
          ),
          y && /* @__PURE__ */ a(
            Qn,
            {
              "data-testid": "book-chapter-control-chevron",
              className: "tw:ms-2 tw:size-4 tw:shrink-0 tw:opacity-50"
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ a(
      Ve,
      {
        id: w,
        forceMount: !0,
        className: "tw:w-[280px] tw:p-0",
        align: E,
        onKeyDownCapture: jr,
        onKeyDown: /* @__PURE__ */ n((_) => _.stopPropagation(), "onKeyDown"),
        onPointerDownOutside: /* @__PURE__ */ n((_) => {
          const { target: at } = _;
          K && Zt.current && at instanceof Node && Zt.current.contains(at) && (bt.current = !0, j(!1));
        }, "onPointerDownOutside"),
        onCloseAutoFocus: z,
        children: /* @__PURE__ */ p(
          Le,
          {
            ref: At,
            loop: !0,
            value: H,
            onValueChange: tt,
            shouldFilter: !1,
            children: [
              C === "books" ? /* @__PURE__ */ p("div", { className: "tw:flex tw:items-end", children: [
                /* @__PURE__ */ p("div", { className: "tw:relative tw:flex-1", children: [
                  /* @__PURE__ */ a(
                    pa,
                    {
                      ref: Vt,
                      value: $,
                      onValueChange: et,
                      onKeyDown: Ta,
                      onFocus: /* @__PURE__ */ n(() => ft(!1), "onFocus"),
                      className: l && l.length > 0 ? "tw:!pr-10" : "",
                      spaceSelectsHighlightedItem: !0
                    }
                  ),
                  l && l.length > 0 && /* @__PURE__ */ a(
                    Bl,
                    {
                      recentSearches: l,
                      onSearchItemSelect: R,
                      renderItem: /* @__PURE__ */ n((_) => Ce(_, "English"), "renderItem"),
                      getItemKey: /* @__PURE__ */ n((_) => `${_.book}-${_.chapterNum}-${_.verseNum}`, "getItemKey"),
                      ariaLabel: c == null ? void 0 : c["%history_recentSearches_ariaLabel%"],
                      groupHeading: c == null ? void 0 : c["%history_recent%"]
                    }
                  )
                ] }),
                /* @__PURE__ */ a("div", { className: "tw:flex tw:items-center tw:gap-1 tw:border-b tw:pe-2", children: F.map(
                  ({ onClick: _, disabled: at, title: nt, icon: I }) => /* @__PURE__ */ a(
                    J,
                    {
                      variant: "ghost",
                      size: "sm",
                      onClick: /* @__PURE__ */ n(() => {
                        ft(!0), _();
                      }, "onClick"),
                      disabled: at,
                      className: "tw:h-10 tw:w-4 tw:p-0",
                      title: nt,
                      onKeyDown: Br,
                      children: /* @__PURE__ */ a(I, {})
                    },
                    nt
                  )
                ) })
              ] }) : /* @__PURE__ */ p("div", { className: "tw:flex tw:items-center tw:border-b tw:px-3 tw:py-2", children: [
                /* @__PURE__ */ a(
                  J,
                  {
                    variant: "ghost",
                    size: "sm",
                    onClick: C === "verses" ? x : W,
                    className: "tw:mr-2 tw:h-6 tw:w-6 tw:p-0",
                    tabIndex: -1,
                    children: U === "ltr" ? /* @__PURE__ */ a(Rs, { className: "tw:h-4 tw:w-4" }) : /* @__PURE__ */ a(zs, { className: "tw:h-4 tw:w-4" })
                  }
                ),
                C === "chapters" && G && /* @__PURE__ */ a("span", { tabIndex: -1, className: "tw:text-sm tw:font-medium", children: ve(G, s) }),
                C === "verses" && ot && wt !== void 0 && /* @__PURE__ */ a("span", { tabIndex: -1, className: "tw:text-sm tw:font-medium", children: `${ve(ot, s)} ${wt}` }),
                /* @__PURE__ */ a(
                  "span",
                  {
                    tabIndex: -1,
                    className: "tw:ms-auto tw:text-sm tw:font-medium tw:text-muted-foreground",
                    children: C === "verses" ? We : Lr
                  }
                )
              ] }),
              !ut && /* @__PURE__ */ p(je, { ref: xt, children: [
                C === "books" && /* @__PURE__ */ p(dt, { children: [
                  !O && Object.entries(Qt).map(([_, at]) => {
                    if (at.length !== 0)
                      return (
                        // We are mapping over filteredBooksByType, which uses Section as key type
                        // eslint-disable-next-line no-type-assertion/no-type-assertion
                        /* @__PURE__ */ a(Te, { heading: Bt(_), children: at.map((nt) => /* @__PURE__ */ a(
                          fi,
                          {
                            bookId: nt,
                            onSelect: /* @__PURE__ */ n((I) => pe(I), "onSelect"),
                            section: Wr(nt),
                            commandValue: `${nt} ${we[nt]}`,
                            ref: nt === t.book ? Ft : void 0,
                            localizedBookNames: s,
                            disabled: vr(nt),
                            dimmedReason: qt.has(nt) ? _a : void 0,
                            dimmedDescription: qt.has(nt) ? Na(nt) : void 0
                          },
                          nt
                        )) }, _)
                      );
                  }),
                  O && /* @__PURE__ */ a(Te, { children: /* @__PURE__ */ a(
                    Re,
                    {
                      value: `${O.book} ${we[O.book]} ${O.chapterNum || ""}:${O.verseNum || ""})}`,
                      onSelect: jt,
                      disabled: !!h && Ma(
                        O.book,
                        O.chapterNum ?? 1,
                        O.verseNum ?? 1,
                        h
                      ),
                      className: "tw:font-semibold tw:text-primary",
                      children: Ce(
                        {
                          book: O.book,
                          chapterNum: O.chapterNum ?? 1,
                          verseNum: O.verseNum ?? 1
                        },
                        // 'English', matching the trigger formatter's fallback above: with no
                        // localizedBookNames prop (no app code passes one today), `undefined`
                        // made formatScrRef render the raw book CODE ("OBA 1:1") here while the
                        // trigger showed "Obadiah 1:1" — the same reference in two spellings in
                        // one control.
                        s ? Nr(O.book, s) : "English"
                      )
                    },
                    "top-match"
                  ) }),
                  O && mr && O.chapterNum && u && /* @__PURE__ */ p(dt, { children: [
                    /* @__PURE__ */ p("div", { className: "tw:mb-2 tw:flex tw:items-center tw:justify-between tw:px-3 tw:text-sm tw:font-medium tw:text-muted-foreground", children: [
                      /* @__PURE__ */ a("span", { children: `${ve(O.book, s)} ${O.chapterNum}` }),
                      /* @__PURE__ */ a("span", { children: We })
                    ] }),
                    /* @__PURE__ */ a(
                      un,
                      {
                        bookId: O.book,
                        chapterNum: O.chapterNum,
                        endVerse: u(O.book, O.chapterNum),
                        scrRef: t,
                        onVerseSelect: Ht,
                        setVerseRef: ka,
                        isVerseDisabled: Ge(O.book, O.chapterNum),
                        className: "tw:px-4 tw:pb-4"
                      }
                    )
                  ] }),
                  O && !mr && lr(O.book) > 1 && /* @__PURE__ */ p(dt, { children: [
                    /* @__PURE__ */ p("div", { className: "tw:mb-2 tw:flex tw:items-center tw:justify-between tw:px-3 tw:text-sm tw:font-medium tw:text-muted-foreground", children: [
                      /* @__PURE__ */ a("span", { children: ve(O.book, s) }),
                      /* @__PURE__ */ a("span", { children: Lr })
                    ] }),
                    /* @__PURE__ */ a(
                      wn,
                      {
                        bookId: O.book,
                        scrRef: t,
                        onChapterSelect: he,
                        setChapterRef: Pr,
                        isChapterDimmed: ae,
                        isChapterDisabled: br(O.book),
                        className: "tw:px-4 tw:pb-4"
                      }
                    )
                  ] })
                ] }),
                C === "chapters" && G && /* @__PURE__ */ a(
                  wn,
                  {
                    bookId: G,
                    scrRef: t,
                    onChapterSelect: he,
                    setChapterRef: Pr,
                    isChapterDisabled: br(G),
                    className: "tw:p-4"
                  }
                ),
                C === "verses" && ot && wt !== void 0 && u && /* @__PURE__ */ a(
                  un,
                  {
                    bookId: ot,
                    chapterNum: wt,
                    endVerse: u(ot, wt),
                    scrRef: t,
                    onVerseSelect: Ht,
                    setVerseRef: ka,
                    isVerseDisabled: Ge(
                      ot,
                      wt
                    ),
                    className: "tw:p-4"
                  }
                )
              ] }),
              Vr && /* @__PURE__ */ a("div", { className: "tw:border-t tw:p-1", children: /* @__PURE__ */ a(
                J,
                {
                  variant: "ghost",
                  size: "sm",
                  className: "tw:w-full tw:justify-start tw:font-normal",
                  onClick: /* @__PURE__ */ n(() => vt((_) => !_), "onClick"),
                  children: mt ? Ea : Ca
                }
              ) })
            ]
          }
        )
      }
    )
  ] });
}
n(Oa, "BookChapterControl");
const Dp = Object.freeze([
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
n(Wl, "getOptionLabelDefault");
function pn({
  id: t,
  options: e = [],
  className: r,
  buttonClassName: o,
  popoverContentClassName: i,
  popoverContentStyle: s,
  value: c,
  onChange: l = /* @__PURE__ */ n(() => {
  }, "onChange"),
  getOptionLabel: d = Wl,
  getButtonLabel: w,
  icon: u = void 0,
  buttonPlaceholder: h = "",
  textPlaceholder: g = "",
  commandEmptyMessage: f = "No option found",
  buttonVariant: m = "outline",
  alignDropDown: y = "start",
  isDisabled: b = !1,
  ariaLabel: z,
  ...k
}) {
  const [E, T] = N(!1), P = w ?? d, S = /* @__PURE__ */ n((V) => V.length > 0 && typeof V[0] == "object" && "options" in V[0], "isGroupedOptions"), U = /* @__PURE__ */ n((V, M) => {
    const K = d(V), X = typeof V == "object" && "secondaryLabel" in V ? V.secondaryLabel : void 0, H = `${M ?? ""}${K}${X ?? ""}`;
    return /* @__PURE__ */ p(
      Re,
      {
        value: K,
        onSelect: /* @__PURE__ */ n(() => {
          l(V), T(!1);
        }, "onSelect"),
        className: "tw:gap-1.5!",
        children: [
          /* @__PURE__ */ a(
            $e,
            {
              className: v("tw:h-4 tw:w-4 tw:shrink-0", {
                "tw:opacity-0": !c || d(c) !== K
              })
            }
          ),
          /* @__PURE__ */ p("span", { className: "tw:flex-1 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap", children: [
            K,
            X && /* @__PURE__ */ p("span", { className: "tw:text-muted-foreground", children: [
              " · ",
              X
            ] })
          ] })
        ]
      },
      H
    );
  }, "renderCommandItem");
  return /* @__PURE__ */ p(Ae, { open: E, onOpenChange: T, ...k, children: [
    /* @__PURE__ */ a(tr, { asChild: !0, children: /* @__PURE__ */ p(
      J,
      {
        variant: m,
        role: "combobox",
        "aria-expanded": E,
        "aria-label": z,
        id: t,
        className: v(
          "tw:flex tw:w-[200px] tw:items-center tw:justify-between tw:overflow-hidden",
          o ?? r
        ),
        disabled: b,
        children: [
          /* @__PURE__ */ p("div", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-center tw:overflow-hidden", children: [
            u && /* @__PURE__ */ a("div", { className: "tw:shrink-0 tw:pe-2", children: u }),
            /* @__PURE__ */ a(
              "span",
              {
                className: v(
                  "tw:min-w-0 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap tw:text-start"
                ),
                children: c ? P(c) : h
              }
            )
          ] }),
          /* @__PURE__ */ a(dr, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ a(
      Ve,
      {
        align: y,
        className: v("tw:w-[200px] tw:p-0", i),
        style: s,
        children: /* @__PURE__ */ p(Le, { children: [
          /* @__PURE__ */ a(
            pa,
            {
              placeholder: g,
              className: "tw:text-inherit",
              spaceSelectsHighlightedItem: !0
            }
          ),
          /* @__PURE__ */ a(ha, { children: f }),
          /* @__PURE__ */ a(je, { children: S(e) ? e.map((V) => /* @__PURE__ */ a(Te, { heading: V.groupHeading, children: V.options.map((M) => U(M, V.groupHeading)) }, V.groupHeading)) : /* @__PURE__ */ a(Te, { children: e.map((V) => U(V)) }) })
        ] })
      }
    )
  ] });
}
n(pn, "ComboBox");
function Yl({
  startChapter: t,
  endChapter: e,
  handleSelectStartChapter: r,
  handleSelectEndChapter: o,
  isDisabled: i = !1,
  chapterCount: s
}) {
  const c = L(
    () => Array.from({ length: s }, (w, u) => u + 1),
    [s]
  );
  return /* @__PURE__ */ p(dt, { children: [
    /* @__PURE__ */ a(Tt, { htmlFor: "start-chapters-combobox", children: "Chapters" }),
    /* @__PURE__ */ a(
      pn,
      {
        isDisabled: i,
        onChange: /* @__PURE__ */ n((w) => {
          r(w), w > e && o(w);
        }, "onChangeStartChapter"),
        buttonClassName: "tw:me-2 tw:ms-2 tw:w-20",
        options: c,
        getOptionLabel: /* @__PURE__ */ n((w) => w.toString(), "getOptionLabel"),
        value: t
      },
      "start chapter"
    ),
    /* @__PURE__ */ a(Tt, { htmlFor: "end-chapters-combobox", children: "to" }),
    /* @__PURE__ */ a(
      pn,
      {
        isDisabled: i,
        onChange: /* @__PURE__ */ n((w) => {
          o(w), w < t && r(w);
        }, "onChangeEndChapter"),
        buttonClassName: "tw:ms-2 tw:w-20",
        options: c,
        getOptionLabel: /* @__PURE__ */ n((w) => w.toString(), "getOptionLabel"),
        value: e
      },
      "end chapter"
    )
  ] });
}
n(Yl, "ChapterRangeSelector");
var no = /* @__PURE__ */ ((t) => (t.CurrentBook = "current book", t.ChooseBooks = "choose books", t))(no || {});
((t) => {
  t.CURRENT_BOOK = "current book", t.CHOOSE_BOOKS = "choose books";
})(no || (no = {}));
const Mp = Object.freeze([
  "%webView_bookSelector_currentBook%",
  "%webView_bookSelector_choose%",
  "%webView_bookSelector_chooseBooks%"
]), Ia = /* @__PURE__ */ n((t, e) => t[e] ?? e, "localizeString$6");
function Op({
  handleBookSelectionModeChange: t,
  currentBookName: e,
  onSelectBooks: r,
  selectedBookIds: o,
  chapterCount: i,
  endChapter: s,
  handleSelectEndChapter: c,
  startChapter: l,
  handleSelectStartChapter: d,
  localizedStrings: w
}) {
  const u = Ia(w, "%webView_bookSelector_currentBook%"), h = Ia(w, "%webView_bookSelector_choose%"), g = Ia(w, "%webView_bookSelector_chooseBooks%"), [f, m] = N(
    "current book"
    /* CurrentBook */
  ), y = /* @__PURE__ */ n((b) => {
    m(b), t(b);
  }, "onSelectionModeChange");
  return /* @__PURE__ */ a(
    ho,
    {
      className: "pr-twp tw:flex",
      value: f,
      onValueChange: /* @__PURE__ */ n((b) => y(b), "onValueChange"),
      children: /* @__PURE__ */ p("div", { className: "tw:flex tw:w-full tw:flex-col tw:gap-4", children: [
        /* @__PURE__ */ p("div", { className: "tw:grid tw:grid-cols-[25%_25%_50%]", children: [
          /* @__PURE__ */ p("div", { className: "tw:flex tw:items-center", children: [
            /* @__PURE__ */ a(ra, {
              value: "current book"
              /* CurrentBook */
            }),
            /* @__PURE__ */ a(Tt, { className: "tw:ms-1", children: u })
          ] }),
          /* @__PURE__ */ a(Tt, { className: "tw:flex tw:items-center", children: e }),
          /* @__PURE__ */ a("div", { className: "tw:flex tw:items-center tw:justify-end", children: /* @__PURE__ */ a(
            Yl,
            {
              isDisabled: f === "choose books",
              handleSelectStartChapter: d,
              handleSelectEndChapter: c,
              chapterCount: i,
              startChapter: l,
              endChapter: s
            }
          ) })
        ] }),
        /* @__PURE__ */ p("div", { className: "tw:grid tw:grid-cols-[25%_50%_25%]", children: [
          /* @__PURE__ */ p("div", { className: "tw:flex tw:items-center", children: [
            /* @__PURE__ */ a(ra, {
              value: "choose books"
              /* ChooseBooks */
            }),
            /* @__PURE__ */ a(Tt, { className: "tw:ms-1", children: g })
          ] }),
          /* @__PURE__ */ a(Tt, { className: "tw:flex tw:items-center", children: o.map((b) => Dt.bookIdToEnglishName(b)).join(", ") }),
          /* @__PURE__ */ a(
            J,
            {
              disabled: f === "current book",
              onClick: /* @__PURE__ */ n(() => r(), "onClick"),
              children: h
            }
          )
        ] })
      ] })
    }
  );
}
n(Op, "BookSelector");
const bi = fa(null);
function Xl(t, e) {
  return { getTheme: /* @__PURE__ */ n(function() {
    return e ?? null;
  }, "getTheme") };
}
n(Xl, "t");
function Ne() {
  const t = No(bi);
  return t == null && function(e, ...r) {
    const o = new URL("https://lexical.dev/docs/error"), i = new URLSearchParams();
    i.append("code", e);
    for (const s of r) i.append("v", s);
    throw o.search = i.toString(), Error(`Minified Lexical error #${e}; visit ${o.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
  }(8), t;
}
n(Ne, "o$1");
const xi = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, Jl = xi ? ee : Y, Kr = { tag: Co };
function Zl({ initialConfig: t, children: e }) {
  const r = L(() => {
    const { theme: o, namespace: i, nodes: s, onError: c, editorState: l, html: d } = t, w = Xl(null, o), u = ei({ editable: t.editable, html: d, namespace: i, nodes: s, onError: /* @__PURE__ */ n((h) => c(h, u), "onError"), theme: o });
    return function(h, g) {
      if (g !== null) {
        if (g === void 0) h.update(() => {
          const f = Pe();
          if (f.isEmpty()) {
            const m = Or();
            f.append(m);
            const y = xi ? document.activeElement : null;
            (re() !== null || y !== null && y === h.getRootElement()) && m.select();
          }
        }, Kr);
        else if (g !== null) switch (typeof g) {
          case "string": {
            const f = h.parseEditorState(g);
            h.setEditorState(f, Kr);
            break;
          }
          case "object":
            h.setEditorState(g, Kr);
            break;
          case "function":
            h.update(() => {
              Pe().isEmpty() && g(h);
            }, Kr);
        }
      }
    }(u, l), [u, w];
  }, []);
  return Jl(() => {
    const o = t.editable, [i] = r;
    i.setEditable(o === void 0 || o);
  }, []), a(bi.Provider, { value: r, children: e });
}
n(Zl, "f$2");
const Ql = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? ee : Y;
function td({ ignoreHistoryMergeTagChange: t = !0, ignoreSelectionChange: e = !1, onChange: r }) {
  const [o] = Ne();
  return Ql(() => {
    if (r) return o.registerUpdateListener(({ editorState: i, dirtyElements: s, dirtyLeaves: c, prevEditorState: l, tags: d }) => {
      e && s.size === 0 && c.size === 0 || t && d.has(Co) || l.isEmpty() || r(i, o, d);
    });
  }, [o, t, e, r]), null;
}
n(td, "n$1");
const Do = {
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
}, Mo = [
  vl,
  ri,
  ai,
  bl
], ed = fa(null), $a = {
  didCatch: !1,
  error: null
}, jo = class jo extends xc {
  constructor(e) {
    super(e), this.resetErrorBoundary = this.resetErrorBoundary.bind(this), this.state = $a;
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
      for (var r, o, i = arguments.length, s = new Array(i), c = 0; c < i; c++)
        s[c] = arguments[c];
      (r = (o = this.props).onReset) === null || r === void 0 || r.call(o, {
        args: s,
        reason: "imperative-api"
      }), this.setState($a);
    }
  }
  componentDidCatch(e, r) {
    var o, i;
    (o = (i = this.props).onError) === null || o === void 0 || o.call(i, e, r);
  }
  componentDidUpdate(e, r) {
    const {
      didCatch: o
    } = this.state, {
      resetKeys: i
    } = this.props;
    if (o && r.error !== null && rd(e.resetKeys, i)) {
      var s, c;
      (s = (c = this.props).onReset) === null || s === void 0 || s.call(c, {
        next: i,
        prev: e.resetKeys,
        reason: "keys"
      }), this.setState($a);
    }
  }
  render() {
    const {
      children: e,
      fallbackRender: r,
      FallbackComponent: o,
      fallback: i
    } = this.props, {
      didCatch: s,
      error: c
    } = this.state;
    let l = e;
    if (s) {
      const d = {
        error: c,
        resetErrorBoundary: this.resetErrorBoundary
      };
      if (typeof r == "function")
        l = r(d);
      else if (o)
        l = Qo(o, d);
      else if (i !== void 0)
        l = i;
      else
        throw c;
    }
    return Qo(ed.Provider, {
      value: {
        didCatch: s,
        error: c,
        resetErrorBoundary: this.resetErrorBoundary
      }
    }, l);
  }
};
n(jo, "ErrorBoundary");
let io = jo;
function rd() {
  let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  return t.length !== e.length || t.some((r, o) => !Object.is(r, e[o]));
}
n(rd, "hasArrayChanged");
function ad({ children: t, onError: e }) {
  return a(io, { fallback: a("div", { style: { border: "1px solid #f00", color: "#f00", padding: "8px" }, children: "An error was thrown." }), onError: e, children: t });
}
n(ad, "n");
const od = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? ee : Y;
function nd(t) {
  return { initialValueFn: /* @__PURE__ */ n(() => t.isEditable(), "initialValueFn"), subscribe: /* @__PURE__ */ n((e) => t.registerEditableListener(e), "subscribe") };
}
n(nd, "u");
function id() {
  return function(t) {
    const [e] = Ne(), r = L(() => t(e), [e, t]), [o, i] = N(() => r.initialValueFn()), s = q(o);
    return od(() => {
      const { initialValueFn: c, subscribe: l } = r, d = c();
      return s.current !== d && (s.current = d, i(d)), l((w) => {
        s.current = w, i(w);
      });
    }, [r, t]), o;
  }(nd);
}
n(id, "a");
function sd(t, e) {
  const r = t.getRootElement();
  if (r === null) return [];
  const o = r.getBoundingClientRect(), i = getComputedStyle(r), s = parseFloat(i.paddingLeft) + parseFloat(i.paddingRight), c = Array.from(e.getClientRects());
  let l, d = c.length;
  c.sort((w, u) => {
    const h = w.top - u.top;
    return Math.abs(h) <= 3 ? w.left - u.left : h;
  });
  for (let w = 0; w < d; w++) {
    const u = c[w], h = l && l.top <= u.top && l.top + l.height > u.top && l.left + l.width > u.left, g = u.width + s === o.width;
    h || g ? (c.splice(w--, 1), d--) : l = u;
  }
  return c;
}
n(sd, "B$1");
function oa(t, ...e) {
  const r = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const i of e) o.append("v", i);
  throw r.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
n(oa, "k");
const yi = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, cd = yi && "documentMode" in document ? document.documentMode : null;
!(!yi || !("InputEvent" in window) || cd) && "getTargetRanges" in new window.InputEvent("input");
function be(t) {
  return `${t}px`;
}
n(be, "G");
const ld = { attributes: !0, characterData: !0, childList: !0, subtree: !0 };
function dd(t, e, r) {
  let o = null, i = null, s = null, c = [];
  const l = document.createElement("div");
  function d() {
    o === null && oa(182), i === null && oa(183);
    const { left: h, top: g } = i.getBoundingClientRect(), f = sd(t, e);
    var m, y;
    l.isConnected || (y = l, (m = i).insertBefore(y, m.firstChild));
    let b = !1;
    for (let z = 0; z < f.length; z++) {
      const k = f[z], E = c[z] || document.createElement("div"), T = E.style;
      T.position !== "absolute" && (T.position = "absolute", b = !0);
      const P = be(k.left - h);
      T.left !== P && (T.left = P, b = !0);
      const S = be(k.top - g);
      T.top !== S && (E.style.top = S, b = !0);
      const U = be(k.width);
      T.width !== U && (E.style.width = U, b = !0);
      const V = be(k.height);
      T.height !== V && (E.style.height = V, b = !0), E.parentNode !== l && (l.append(E), b = !0), c[z] = E;
    }
    for (; c.length > f.length; ) c.pop();
    b && r(c);
  }
  n(d, "c");
  function w() {
    i = null, o = null, s !== null && s.disconnect(), s = null, l.remove();
    for (const h of c) h.remove();
    c = [];
  }
  n(w, "a"), l.style.position = "relative";
  const u = t.registerRootListener(/* @__PURE__ */ n(function h() {
    const g = t.getRootElement();
    if (g === null) return w();
    const f = g.parentElement;
    if (!Uc(f)) return w();
    w(), o = g, i = f, s = new MutationObserver((m) => {
      const y = t.getRootElement(), b = y && y.parentElement;
      if (y !== o || b !== i) return h();
      for (const z of m) if (!l.contains(z.target)) return d();
    }), s.observe(f, ld), d();
  }, "n"));
  return () => {
    u(), w();
  };
}
n(dd, "J");
function hn(t, e, r) {
  if (t.type !== "text" && Rr(e)) {
    const o = e.getDOMSlot(r);
    return [o.element, o.getFirstChildOffset() + t.offset];
  }
  return [Fc(r) || r, t.offset];
}
n(hn, "Q$1");
function wd(t) {
  for (const e of t) {
    const r = e.style;
    r.background !== "Highlight" && (r.background = "Highlight"), r.color !== "HighlightText" && (r.color = "HighlightText"), r.marginTop !== be(-1.5) && (r.marginTop = be(-1.5)), r.paddingTop !== be(4) && (r.paddingTop = be(4)), r.paddingBottom !== be(0) && (r.paddingBottom = be(0));
  }
}
n(wd, "X$1");
function ud(t, e = wd) {
  let r = null, o = null, i = null, s = null, c = null, l = null, d = /* @__PURE__ */ n(() => {
  }, "f");
  function w(u) {
    u.read(() => {
      const h = re();
      if (!xe(h)) return r = null, i = null, s = null, l = null, d(), void (d = /* @__PURE__ */ n(() => {
      }, "f"));
      const [g, f] = function(V) {
        const M = V.getStartEndPoints();
        return V.isBackward() ? [M[1], M[0]] : M;
      }(h), m = g.getNode(), y = m.getKey(), b = g.offset, z = f.getNode(), k = z.getKey(), E = f.offset, T = t.getElementByKey(y), P = t.getElementByKey(k), S = r === null || T !== o || b !== i || y !== r.getKey(), U = s === null || P !== c || E !== l || k !== s.getKey();
      if ((S || U) && T !== null && P !== null) {
        const V = function(M, K, X, H, tt, $, et) {
          const C = (M._window ? M._window.document : document).createRange();
          return C.setStart(...hn(K, X, H)), C.setEnd(...hn(tt, $, et)), C;
        }(t, g, m, T, f, z, P);
        d(), d = dd(t, V, e);
      }
      r = m, o = T, i = b, s = z, c = P, l = E;
    });
  }
  return n(w, "d"), w(t.getEditorState()), Se(t.registerUpdateListener(({ editorState: u }) => w(u)), () => {
    d();
  });
}
n(ud, "Y$1");
function pd(t, e) {
  let r = null;
  const o = /* @__PURE__ */ n(() => {
    const i = getSelection(), s = i && i.anchorNode, c = t.getRootElement();
    s !== null && c !== null && c.contains(s) ? r !== null && (r(), r = null) : r === null && (r = ud(t, e));
  }, "o");
  return t.registerRootListener((i) => {
    if (i) {
      const s = i.ownerDocument;
      return s.addEventListener("selectionchange", o), o(), () => {
        r !== null && r(), s.removeEventListener("selectionchange", o);
      };
    }
  });
}
n(pd, "Z");
function hd(t) {
  const e = ni(t, (r) => Rr(r) && !r.isInline());
  return Rr(e) || oa(4, t.__key), e;
}
n(hd, "Ct$1");
function gd(t) {
  const e = re() || Mc();
  let r;
  if (xe(e)) r = Oc(e.focus, "next");
  else {
    if (e != null) {
      const c = e.getNodes(), l = c[c.length - 1];
      l && (r = oi(l, "next"));
    }
    r = r || Ic(Pe(), "previous").getFlipped().insert(Or());
  }
  const o = fd(t, r), i = $c(o), s = Pc(i) ? Ac(i) : o;
  return Vc(Lc(s)), t.getLatest();
}
n(gd, "bt");
function fd(t, e, r) {
  let o = en(e, "next");
  for (let i = o; i; i = jc(i, r)) o = i;
  return Bc(o) && oa(283), o.insert(t.isInline() ? Or().append(t) : t), en(oi(t.getLatest(), "next"), e.direction);
}
n(fd, "Lt$1");
function md(t) {
  const e = re();
  if (!xe(e)) return !1;
  const r = /* @__PURE__ */ new Set(), o = e.getNodes();
  for (let i = 0; i < o.length; i++) {
    const s = o[i], c = s.getKey();
    if (r.has(c)) continue;
    const l = ni(s, (w) => Rr(w) && !w.isInline());
    if (l === null) continue;
    const d = l.getKey();
    l.canIndent() && !r.has(d) && (r.add(d), t(l));
  }
  return r.size > 0;
}
n(md, "Bt$1");
const vd = Symbol.for("preact-signals");
function ba() {
  if (Ee > 1) return void Ee--;
  let t, e = !1;
  for (!function() {
    let r = na;
    for (na = void 0; r !== void 0; ) r.S.v === r.v && (r.S.i = r.i), r = r.o;
  }(); Er !== void 0; ) {
    let r = Er;
    for (Er = void 0, ia++; r !== void 0; ) {
      const o = r.u;
      if (r.u = void 0, r.f &= -3, !(8 & r.f) && ki(r)) try {
        r.c();
      } catch (i) {
        e || (t = i, e = !0);
      }
      r = o;
    }
  }
  if (ia = 0, Ee--, e) throw t;
}
n(ba, "Q");
function bd(t) {
  if (Ee > 0) return t();
  so = ++xd, Ee++;
  try {
    return t();
  } finally {
    ba();
  }
}
n(bd, "X");
let st, Er;
function gn(t) {
  const e = st;
  st = void 0;
  try {
    return t();
  } finally {
    st = e;
  }
}
n(gn, "et");
let na, Ee = 0, ia = 0, xd = 0, so = 0, Zr = 0;
function fn(t) {
  if (st === void 0) return;
  let e = t.n;
  return e === void 0 || e.t !== st ? (e = { i: 0, S: t, p: st.s, n: void 0, t: st, e: void 0, x: void 0, r: e }, st.s !== void 0 && (st.s.n = e), st.s = e, t.n = e, 32 & st.f && t.S(e), e) : e.i === -1 ? (e.i = 0, e.n !== void 0 && (e.n.p = e.p, e.p !== void 0 && (e.p.n = e.n), e.p = st.s, e.n = void 0, st.s.n = e, st.s = e), e) : void 0;
}
n(fn, "at");
function Yt(t, e) {
  this.v = t, this.i = 0, this.n = void 0, this.t = void 0, this.l = 0, this.W = e == null ? void 0 : e.watched, this.Z = e == null ? void 0 : e.unwatched, this.name = e == null ? void 0 : e.name;
}
n(Yt, "dt");
function zr(t, e) {
  return new Yt(t, e);
}
n(zr, "ut");
function ki(t) {
  for (let e = t.s; e !== void 0; e = e.n) if (e.S.i !== e.i || !e.S.h() || e.S.i !== e.i) return !0;
  return !1;
}
n(ki, "ft");
function mn(t) {
  for (let e = t.s; e !== void 0; e = e.n) {
    const r = e.S.n;
    if (r !== void 0 && (e.r = r), e.S.n = e, e.i = -1, e.n === void 0) {
      t.s = e;
      break;
    }
  }
}
n(mn, "lt");
function _i(t) {
  let e, r = t.s;
  for (; r !== void 0; ) {
    const o = r.p;
    r.i === -1 ? (r.S.U(r), o !== void 0 && (o.n = r.n), r.n !== void 0 && (r.n.p = o)) : e = r, r.S.n = r.r, r.r !== void 0 && (r.r = void 0), r = o;
  }
  t.s = e;
}
n(_i, "ht");
function Xe(t, e) {
  Yt.call(this, void 0), this.x = t, this.s = void 0, this.g = Zr - 1, this.f = 4, this.W = e == null ? void 0 : e.watched, this.Z = e == null ? void 0 : e.unwatched, this.name = e == null ? void 0 : e.name;
}
n(Xe, "gt");
function yd(t, e) {
  return new Xe(t, e);
}
n(yd, "pt");
function Ni(t) {
  const e = t.m;
  if (t.m = void 0, typeof e == "function") {
    Ee++;
    const r = st;
    st = void 0;
    try {
      e();
    } catch (o) {
      throw t.f &= -2, t.f |= 8, Oo(t), o;
    } finally {
      st = r, ba();
    }
  }
}
n(Ni, "mt");
function Oo(t) {
  for (let e = t.s; e !== void 0; e = e.n) e.S.U(e);
  t.x = void 0, t.s = void 0, Ni(t);
}
n(Oo, "vt");
function kd(t) {
  if (st !== this) throw new Error("Out-of-order effect");
  _i(this), st = t, this.f &= -2, 8 & this.f && Oo(this), ba();
}
n(kd, "xt");
function nr(t, e) {
  this.x = t, this.m = void 0, this.s = void 0, this.u = void 0, this.f = 32, this.name = e == null ? void 0 : e.name;
}
n(nr, "Et");
function ye(t, e) {
  const r = new nr(t, e);
  try {
    r.c();
  } catch (i) {
    throw r.d(), i;
  }
  const o = r.d.bind(r);
  return o[Symbol.dispose] = o, o;
}
n(ye, "yt");
function fr(t, e = {}) {
  const r = {};
  for (const o in t) {
    const i = e[o], s = zr(i === void 0 ? t[o] : i);
    r[o] = s;
  }
  return r;
}
n(fr, "St");
Yt.prototype.brand = vd, Yt.prototype.h = function() {
  return !0;
}, Yt.prototype.S = function(t) {
  const e = this.t;
  e !== t && t.e === void 0 && (t.x = e, this.t = t, e !== void 0 ? e.e = t : gn(() => {
    var r;
    (r = this.W) == null || r.call(this);
  }));
}, Yt.prototype.U = function(t) {
  if (this.t !== void 0) {
    const e = t.e, r = t.x;
    e !== void 0 && (e.x = r, t.e = void 0), r !== void 0 && (r.e = e, t.x = void 0), t === this.t && (this.t = r, r === void 0 && gn(() => {
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
  const t = fn(this);
  return t !== void 0 && (t.i = this.i), this.v;
}, set(t) {
  if (t !== this.v) {
    if (ia > 100) throw new Error("Cycle detected");
    (function(e) {
      Ee !== 0 && ia === 0 && e.l !== so && (e.l = so, na = { S: e, v: e.v, i: e.i, o: na });
    })(this), this.v = t, this.i++, Zr++, Ee++;
    try {
      for (let e = this.t; e !== void 0; e = e.x) e.t.N();
    } finally {
      ba();
    }
  }
} }), Xe.prototype = new Yt(), Xe.prototype.h = function() {
  if (this.f &= -3, 1 & this.f) return !1;
  if ((36 & this.f) == 32 || (this.f &= -5, this.g === Zr)) return !0;
  if (this.g = Zr, this.f |= 1, this.i > 0 && !ki(this)) return this.f &= -2, !0;
  const t = st;
  try {
    mn(this), st = this;
    const e = this.x();
    (16 & this.f || this.v !== e || this.i === 0) && (this.v = e, this.f &= -17, this.i++);
  } catch (e) {
    this.v = e, this.f |= 16, this.i++;
  }
  return st = t, _i(this), this.f &= -2, !0;
}, Xe.prototype.S = function(t) {
  if (this.t === void 0) {
    this.f |= 36;
    for (let e = this.s; e !== void 0; e = e.n) e.S.S(e);
  }
  Yt.prototype.S.call(this, t);
}, Xe.prototype.U = function(t) {
  if (this.t !== void 0 && (Yt.prototype.U.call(this, t), this.t === void 0)) {
    this.f &= -33;
    for (let e = this.s; e !== void 0; e = e.n) e.S.U(e);
  }
}, Xe.prototype.N = function() {
  if (!(2 & this.f)) {
    this.f |= 6;
    for (let t = this.t; t !== void 0; t = t.x) t.t.N();
  }
}, Object.defineProperty(Xe.prototype, "value", { get() {
  if (1 & this.f) throw new Error("Cycle detected");
  const t = fn(this);
  if (this.h(), t !== void 0 && (t.i = this.i), 16 & this.f) throw this.v;
  return this.v;
} }), nr.prototype.c = function() {
  const t = this.S();
  try {
    if (8 & this.f || this.x === void 0) return;
    const e = this.x();
    typeof e == "function" && (this.m = e);
  } finally {
    t();
  }
}, nr.prototype.S = function() {
  if (1 & this.f) throw new Error("Cycle detected");
  this.f |= 1, this.f &= -9, Ni(this), mn(this), Ee++;
  const t = st;
  return st = this, kd.bind(this, t);
}, nr.prototype.N = function() {
  2 & this.f || (this.f |= 2, this.u = Er, Er = this);
}, nr.prototype.d = function() {
  this.f |= 8, 1 & this.f || Oo(this);
}, nr.prototype.dispose = function() {
  this.d();
};
ie({ build: /* @__PURE__ */ n((t, e, r) => fr(e), "build"), config: rr({ defaultSelection: "rootEnd", disabled: !1 }), name: "@lexical/extension/AutoFocus", register(t, e, r) {
  const o = r.getOutput();
  return ye(() => o.disabled.value ? void 0 : t.registerRootListener((i) => {
    t.focus(() => {
      const s = document.activeElement;
      i === null || s !== null && i.contains(s) || i.focus({ preventScroll: !0 });
    }, { defaultSelection: o.defaultSelection.peek() });
  }));
} });
function Ci() {
  const t = Pe(), e = re(), r = Or();
  t.clear(), t.append(r), e !== null && r.select(), xe(e) && (e.format = 0);
}
n(Ci, "wt");
function Ei(t, e = Ci) {
  return t.registerCommand(ii, (r) => (t.update(e), !0), Eo);
}
n(Ei, "Nt");
ie({ build: /* @__PURE__ */ n((t, e, r) => fr(e), "build"), config: rr({ $onClear: Ci }), name: "@lexical/extension/ClearEditor", register(t, e, r) {
  const { $onClear: o } = r.getOutput();
  return ye(() => Ei(t, o.value));
} });
function _d(t) {
  return (typeof t.nodes == "function" ? t.nodes() : t.nodes) || [];
}
n(_d, "Ct");
const Pa = qc("format", { parse: /* @__PURE__ */ n((t) => typeof t == "number" ? t : 0, "parse") }), Bo = class Bo extends Qa {
  $config() {
    return this.config("decorator-text", { extends: Qa, stateConfigs: [{ flat: !0, stateConfig: Pa }] });
  }
  getFormat() {
    return al(this, Pa);
  }
  getFormatFlags(e, r) {
    return rn(this.getFormat(), e, r);
  }
  hasFormat(e) {
    const r = ol[e];
    return (this.getFormat() & r) !== 0;
  }
  setFormat(e) {
    return nl(this, Pa, e);
  }
  toggleFormat(e) {
    const r = this.getFormat(), o = rn(r, e, null);
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
};
n(Bo, "Ft");
let sa = Bo;
function Nd(t) {
  return t instanceof sa;
}
n(Nd, "Mt");
ie({ name: "@lexical/extension/DecoratorText", nodes: /* @__PURE__ */ n(() => [sa], "nodes"), register: /* @__PURE__ */ n((t, e, r) => t.registerCommand(si, (o) => {
  const i = re();
  if (ci(i) || xe(i)) for (const s of i.getNodes()) Nd(s) && s.toggleFormat(o);
  return !1;
}, li), "register") });
function Ti(t, e) {
  let r;
  return zr(t(), { unwatched() {
    r && (r(), r = void 0);
  }, watched() {
    this.value = t(), r = e(this);
  } });
}
n(Ti, "kt");
const co = ie({ build: /* @__PURE__ */ n((t) => Ti(() => t.getEditorState(), (e) => t.registerUpdateListener((r) => {
  e.value = r.editorState;
})), "build"), name: "@lexical/extension/EditorState" });
function pt(t, ...e) {
  const r = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const i of e) o.append("v", i);
  throw r.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
n(pt, "Kt");
function Si(t, e) {
  if (t && e && !Array.isArray(e) && typeof t == "object" && typeof e == "object") {
    const r = t, o = e;
    for (const i in o) r[i] = Si(r[i], o[i]);
    return t;
  }
  return e;
}
n(Si, "zt");
const Io = 0, lo = 1, Ri = 2, Aa = 3, qr = 4, or = 5, Va = 6, kr = 7;
function La(t) {
  return t.id === Io;
}
n(La, "Jt");
function zi(t) {
  return t.id === Ri;
}
n(zi, "Ht");
function Cd(t) {
  return function(e) {
    return e.id === lo;
  }(t) || pt(305, String(t.id), String(lo)), Object.assign(t, { id: Ri });
}
n(Cd, "qt");
const Ed = /* @__PURE__ */ new Set(), Fo = class Fo {
  constructor(e, r) {
    Wt(this, "builder");
    Wt(this, "configs");
    Wt(this, "_dependency");
    Wt(this, "_peerNameSet");
    Wt(this, "extension");
    Wt(this, "state");
    Wt(this, "_signal");
    this.builder = e, this.extension = r, this.configs = /* @__PURE__ */ new Set(), this.state = { id: Io };
  }
  mergeConfigs() {
    let e = this.extension.config || {};
    const r = this.extension.mergeConfig ? this.extension.mergeConfig.bind(this.extension) : Kc;
    for (const o of this.configs) e = r(e, o);
    return e;
  }
  init(e) {
    const r = this.state;
    zi(r) || pt(306, String(r.id));
    const o = { getDependency: this.getInitDependency.bind(this), getDirectDependentNames: this.getDirectDependentNames.bind(this), getPeer: this.getInitPeer.bind(this), getPeerNameSet: this.getPeerNameSet.bind(this) }, i = { ...o, getDependency: this.getDependency.bind(this), getInitResult: this.getInitResult.bind(this), getPeer: this.getPeer.bind(this) }, s = function(l, d, w) {
      return Object.assign(l, { config: d, id: Aa, registerState: w });
    }(r, this.mergeConfigs(), o);
    let c;
    this.state = s, this.extension.init && (c = this.extension.init(e, s.config, o)), this.state = function(l, d, w) {
      return Object.assign(l, { id: qr, initResult: d, registerState: w });
    }(s, c, i);
  }
  build(e) {
    const r = this.state;
    let o;
    r.id !== qr && pt(307, String(r.id), String(or)), this.extension.build && (o = this.extension.build(e, r.config, r.registerState));
    const i = { ...r.registerState, getOutput: /* @__PURE__ */ n(() => o, "getOutput"), getSignal: this.getSignal.bind(this) };
    this.state = function(s, c, l) {
      return Object.assign(s, { id: or, output: c, registerState: l });
    }(r, o, i);
  }
  register(e, r) {
    this._signal = r;
    const o = this.state;
    o.id !== or && pt(308, String(o.id), String(or));
    const i = this.extension.register && this.extension.register(e, o.config, o.registerState);
    return this.state = function(s) {
      return Object.assign(s, { id: Va });
    }(o), () => {
      const s = this.state;
      s.id !== kr && pt(309, String(o.id), String(kr)), this.state = function(c) {
        return Object.assign(c, { id: or });
      }(s), i && i();
    };
  }
  afterRegistration(e) {
    const r = this.state;
    let o;
    return r.id !== Va && pt(310, String(r.id), String(Va)), this.extension.afterRegistration && (o = this.extension.afterRegistration(e, r.config, r.registerState)), this.state = function(i) {
      return Object.assign(i, { id: kr });
    }(r), o;
  }
  getSignal() {
    return this._signal === void 0 && pt(311), this._signal;
  }
  getInitResult() {
    this.extension.init === void 0 && pt(312, this.extension.name);
    const e = this.state;
    return function(r) {
      return r.id >= qr;
    }(e) || pt(313, String(e.id), String(qr)), e.initResult;
  }
  getInitPeer(e) {
    const r = this.builder.extensionNameMap.get(e);
    return r ? r.getExtensionInitDependency() : void 0;
  }
  getExtensionInitDependency() {
    const e = this.state;
    return function(r) {
      return r.id >= Aa;
    }(e) || pt(314, String(e.id), String(Aa)), { config: e.config };
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
      return r.id >= kr;
    }(e) || pt(316, String(e.id), String(kr)), e;
  }
  getDirectDependentNames() {
    return this.builder.incomingEdges.get(this.extension.name) || Ed;
  }
  getPeerNameSet() {
    let e = this._peerNameSet;
    return e || (e = new Set((this.extension.peerDependencies || []).map(([r]) => r)), this._peerNameSet = e), e;
  }
  getExtensionDependency() {
    if (!this._dependency) {
      const e = this.state;
      (function(r) {
        return r.id >= or;
      })(e) || pt(317, this.extension.name), this._dependency = { config: e.config, init: e.initResult, output: e.output };
    }
    return this._dependency;
  }
};
n(Fo, "Xt");
let wo = Fo;
const vn = { tag: Co };
function Td() {
  const t = Pe();
  t.isEmpty() && t.append(Or());
}
n(Td, "te");
const Sd = ie({ config: rr({ setOptions: vn, updateOptions: vn }), init: /* @__PURE__ */ n(({ $initialEditorState: t = Td }) => ({ $initialEditorState: t, initialized: !1 }), "init"), afterRegistration(t, { updateOptions: e, setOptions: r }, o) {
  const i = o.getInitResult();
  if (!i.initialized) {
    i.initialized = !0;
    const { $initialEditorState: s } = i;
    if (Yc(s)) t.setEditorState(s, r);
    else if (typeof s == "function") t.update(() => {
      s(t);
    }, e);
    else if (s && (typeof s == "string" || typeof s == "object")) {
      const c = t.parseEditorState(s);
      t.setEditorState(c, r);
    }
  }
  return () => {
  };
}, name: "@lexical/extension/InitialState", nodes: [Hc, ai, Gc, Wc, ri] }), bn = Symbol.for("@lexical/extension/LexicalBuilder");
function xn() {
}
n(xn, "oe");
function Rd(t) {
  throw t;
}
n(Rd, "se");
function Hr(t) {
  return Array.isArray(t) ? t : [t];
}
n(Hr, "re");
const ja = "0.43.0+prod.esm", ir = class ir {
  constructor(e) {
    Wt(this, "roots");
    Wt(this, "extensionNameMap");
    Wt(this, "outgoingConfigEdges");
    Wt(this, "incomingEdges");
    Wt(this, "conflicts");
    Wt(this, "_sortedExtensionReps");
    Wt(this, "PACKAGE_VERSION");
    this.outgoingConfigEdges = /* @__PURE__ */ new Map(), this.incomingEdges = /* @__PURE__ */ new Map(), this.extensionNameMap = /* @__PURE__ */ new Map(), this.conflicts = /* @__PURE__ */ new Map(), this.PACKAGE_VERSION = ja, this.roots = e;
    for (const r of e) this.addExtension(r);
  }
  static fromExtensions(e) {
    const r = [Hr(Sd)];
    for (const o of e) r.push(Hr(o));
    return new ir(r);
  }
  static maybeFromEditor(e) {
    const r = e[bn];
    return r && (r.PACKAGE_VERSION !== ja && pt(292, r.PACKAGE_VERSION, ja), r instanceof ir || pt(293)), r;
  }
  static fromEditor(e) {
    const r = ir.maybeFromEditor(e);
    return r === void 0 && pt(294), r;
  }
  constructEditor() {
    const { $initialEditorState: e, onError: r, ...o } = this.buildCreateEditorArgs(), i = Object.assign(ei({ ...o, ...r ? { onError: /* @__PURE__ */ n((s) => {
      r(s, i);
    }, "onError") } : {} }), { [bn]: this });
    for (const s of this.sortedExtensionReps()) s.build(i);
    return i;
  }
  buildEditor() {
    let e = xn;
    function r() {
      try {
        e();
      } finally {
        e = xn;
      }
    }
    n(r, "e");
    const o = Object.assign(this.constructEditor(), { dispose: r, [Symbol.dispose]: r });
    return e = Se(this.registerEditor(o), () => o.setRootElement(null)), o;
  }
  hasExtensionByName(e) {
    return this.extensionNameMap.has(e);
  }
  getExtensionRep(e) {
    const r = this.extensionNameMap.get(e.name);
    if (r) return r.extension !== e && pt(295, e.name), r;
  }
  addEdge(e, r, o) {
    const i = this.outgoingConfigEdges.get(e);
    i ? i.set(r, o) : this.outgoingConfigEdges.set(e, /* @__PURE__ */ new Map([[r, o]]));
    const s = this.incomingEdges.get(r);
    s ? s.add(e) : this.incomingEdges.set(r, /* @__PURE__ */ new Set([e]));
  }
  addExtension(e) {
    this._sortedExtensionReps !== void 0 && pt(296);
    const r = Hr(e), [o] = r;
    typeof o.name != "string" && pt(297, typeof o.name);
    let i = this.extensionNameMap.get(o.name);
    if (i !== void 0 && i.extension !== o && pt(298, o.name), !i) {
      i = new wo(this, o), this.extensionNameMap.set(o.name, i);
      const s = this.conflicts.get(o.name);
      typeof s == "string" && pt(299, o.name, s);
      for (const c of o.conflictsWith || []) this.extensionNameMap.has(c) && pt(299, o.name, c), this.conflicts.set(c, o.name);
      for (const c of o.dependencies || []) {
        const l = Hr(c);
        this.addEdge(o.name, l[0].name, l.slice(1)), this.addExtension(l);
      }
      for (const [c, l] of o.peerDependencies || []) this.addEdge(o.name, c, l ? [l] : []);
    }
  }
  sortedExtensionReps() {
    if (this._sortedExtensionReps) return this._sortedExtensionReps;
    const e = [], r = /* @__PURE__ */ n((o, i) => {
      let s = o.state;
      if (zi(s)) return;
      const c = o.extension.name;
      var l;
      La(s) || pt(300, c, i || "[unknown]"), La(l = s) || pt(304, String(l.id), String(Io)), s = Object.assign(l, { id: lo }), o.state = s;
      const d = this.outgoingConfigEdges.get(c);
      if (d) for (const w of d.keys()) {
        const u = this.extensionNameMap.get(w);
        u && r(u, c);
      }
      s = Cd(s), o.state = s, e.push(o);
    }, "e");
    for (const o of this.extensionNameMap.values()) La(o.state) && r(o);
    for (const o of e) for (const [i, s] of this.outgoingConfigEdges.get(o.extension.name) || []) if (s.length > 0) {
      const c = this.extensionNameMap.get(i);
      if (c) for (const l of s) c.configs.add(l);
    }
    for (const [o, ...i] of this.roots) if (i.length > 0) {
      const s = this.extensionNameMap.get(o.name);
      s === void 0 && pt(301, o.name);
      for (const c of i) s.configs.add(c);
    }
    return this._sortedExtensionReps = e, this._sortedExtensionReps;
  }
  registerEditor(e) {
    const r = this.sortedExtensionReps(), o = new AbortController(), i = [() => o.abort()], s = o.signal;
    for (const c of r) {
      const l = c.register(e, s);
      l && i.push(l);
    }
    for (const c of r) {
      const l = c.afterRegistration(e);
      l && i.push(l);
    }
    return Se(...i);
  }
  buildCreateEditorArgs() {
    const e = {}, r = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), s = {}, c = {}, l = this.sortedExtensionReps();
    for (const u of l) {
      const { extension: h } = u;
      if (h.onError !== void 0 && (e.onError = h.onError), h.disableEvents !== void 0 && (e.disableEvents = h.disableEvents), h.parentEditor !== void 0 && (e.parentEditor = h.parentEditor), h.editable !== void 0 && (e.editable = h.editable), h.namespace !== void 0 && (e.namespace = h.namespace), h.$initialEditorState !== void 0 && (e.$initialEditorState = h.$initialEditorState), h.nodes) for (const g of _d(h)) {
        if (typeof g != "function") {
          const f = o.get(g.replace);
          f && pt(302, h.name, g.replace.name, f.extension.name), o.set(g.replace, u);
        }
        r.add(g);
      }
      if (h.html) {
        if (h.html.export) for (const [g, f] of h.html.export.entries()) i.set(g, f);
        h.html.import && Object.assign(s, h.html.import);
      }
      h.theme && Si(c, h.theme);
    }
    Object.keys(c).length > 0 && (e.theme = c), r.size && (e.nodes = [...r]);
    const d = Object.keys(s).length > 0, w = i.size > 0;
    (d || w) && (e.html = {}, d && (e.html.import = s), w && (e.html.export = i));
    for (const u of l) u.init(e);
    return e.onError || (e.onError = Rd), e;
  }
};
n(ir, "ae");
let ca = ir;
const zd = /* @__PURE__ */ new Set(), yn = ie({ build(t, e, r) {
  const o = r.getDependency(co).output, i = zr({ watchedNodeKeys: /* @__PURE__ */ new Map() }), s = Ti(() => {
  }, () => ye(() => {
    const c = s.peek(), { watchedNodeKeys: l } = i.value;
    let d, w = !1;
    o.value.read(() => {
      if (re()) for (const [u, h] of l.entries()) {
        if (h.size === 0) {
          l.delete(u);
          continue;
        }
        const g = sl(u), f = g && g.isSelected() || !1;
        w = w || f !== (!!c && c.has(u)), f && (d = d || /* @__PURE__ */ new Set(), d.add(u));
      }
    }), !w && d && c && d.size === c.size || (s.value = d);
  }));
  return { watchNodeKey: /* @__PURE__ */ n(function(c) {
    const l = yd(() => (s.value || zd).has(c)), { watchedNodeKeys: d } = i.peek();
    let w = d.get(c);
    const u = w !== void 0;
    return w = w || /* @__PURE__ */ new Set(), w.add(l), u || (d.set(c, w), i.value = { watchedNodeKeys: d }), l;
  }, "watchNodeKey") };
}, dependencies: [co], name: "@lexical/extension/NodeSelection" }), Dd = Xc("INSERT_HORIZONTAL_RULE_COMMAND"), ua = class ua extends Qa {
  static getType() {
    return "horizontalrule";
  }
  static clone(e) {
    return new ua(e.__key);
  }
  static importJSON(e) {
    return $o().updateFromJSON(e);
  }
  static importDOM() {
    return { hr: /* @__PURE__ */ n(() => ({ conversion: Md, priority: 0 }), "hr") };
  }
  exportDOM() {
    return { element: document.createElement("hr") };
  }
  createDOM(e) {
    const r = document.createElement("hr");
    return di(r, e.theme.hr), r;
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
};
n(ua, "pe");
let wr = ua;
function Md() {
  return { node: $o() };
}
n(Md, "me");
function $o() {
  return il(wr);
}
n($o, "ve");
function Od(t) {
  return t instanceof wr;
}
n(Od, "xe");
ie({ dependencies: [co, yn], name: "@lexical/extension/HorizontalRule", nodes: /* @__PURE__ */ n(() => [wr], "nodes"), register(t, e, r) {
  const { watchNodeKey: o } = r.getDependency(yn).output, i = zr({ nodeSelections: /* @__PURE__ */ new Map() }), s = t._config.theme.hrSelected ?? "selected";
  return Se(t.registerCommand(Dd, (c) => {
    const l = re();
    if (!xe(l)) return !1;
    if (l.focus.getNode() !== null) {
      const d = $o();
      gd(d);
    }
    return !0;
  }, Eo), t.registerCommand(Jc, (c) => {
    if (Zc(c.target)) {
      const l = Qc(c.target);
      if (Od(l)) return function(d, w = !1) {
        const u = re(), h = d.isSelected(), g = d.getKey();
        let f;
        w && ci(u) ? f = u : (f = tl(), el(f)), h ? f.delete(g) : f.add(g);
      }(l, c.shiftKey), !0;
    }
    return !1;
  }, li), t.registerMutationListener(wr, (c, l) => {
    bd(() => {
      let d = !1;
      const { nodeSelections: w } = i.peek();
      for (const [u, h] of c.entries()) if (h === "destroyed") w.delete(u), d = !0;
      else {
        const g = w.get(u), f = t.getElementByKey(u);
        g ? g.domNode.value = f : (d = !0, w.set(u, { domNode: zr(f), selectedSignal: o(u) }));
      }
      d && (i.value = { nodeSelections: w });
    });
  }), ye(() => {
    const c = [];
    for (const { domNode: l, selectedSignal: d } of i.value.nodeSelections.values()) c.push(ye(() => {
      const w = l.value;
      w && (d.value ? di(w, s) : cl(w, s));
    }));
    return Se(...c);
  }));
} });
ie({ build: /* @__PURE__ */ n((t, e) => fr({ inheritEditableFromParent: e.inheritEditableFromParent }), "build"), config: rr({ $getParentEditor: /* @__PURE__ */ n(function() {
  const t = rl();
  return ca.fromEditor(t), t;
}, "$getParentEditor"), inheritEditableFromParent: !1 }), init: /* @__PURE__ */ n((t, e, r) => {
  const o = e.$getParentEditor();
  t.parentEditor = o, t.theme = t.theme || o._config.theme;
}, "init"), name: "@lexical/extension/NestedEditor", register: /* @__PURE__ */ n((t, e, r) => ye(() => {
  const o = t._parentEditor;
  if (o && r.getOutput().inheritEditableFromParent.value) return t.setEditable(o.isEditable()), o.registerEditableListener(t.setEditable.bind(t));
}), "register") });
ie({ build: /* @__PURE__ */ n((t, e, r) => fr(e), "build"), config: rr({ disabled: !1, onReposition: void 0 }), name: "@lexical/utils/SelectionAlwaysOnDisplay", register: /* @__PURE__ */ n((t, e, r) => {
  const o = r.getOutput();
  return ye(() => {
    if (!o.disabled.value) return pd(t, o.onReposition.value);
  });
}, "register") });
function Di(t) {
  return t.canBeEmpty();
}
n(Di, "be");
function Id(t, e, r = Di) {
  return Se(t.registerCommand(ll, (o) => {
    const i = re();
    if (!xe(i)) return !1;
    o.preventDefault();
    const s = function(c) {
      if (c.getNodes().filter((g) => dl(g) && g.canIndent()).length > 0) return !0;
      const l = c.anchor, d = c.focus, w = d.isBefore(l) ? d : l, u = w.getNode(), h = hd(u);
      if (h.canIndent()) {
        const g = h.getKey();
        let f = wl();
        if (f.anchor.set(g, 0, "element"), f.focus.set(g, 0, "element"), f = ul(f), f.anchor.is(w)) return !0;
      }
      return !1;
    }(i) ? o.shiftKey ? pl : an : hl;
    return t.dispatchCommand(s, void 0);
  }, Eo), t.registerCommand(an, () => {
    const o = typeof e == "number" ? e : e ? e.peek() : null, i = re();
    if (!xe(i)) return !1;
    const s = typeof r == "function" ? r : r.peek();
    return md((c) => {
      if (s(c)) {
        const l = c.getIndent() + 1;
        (!o || l < o) && c.setIndent(l);
      }
    });
  }, To));
}
n(Id, "we");
ie({ build: /* @__PURE__ */ n((t, e, r) => fr(e), "build"), config: rr({ $canIndent: Di, disabled: !1, maxIndent: null }), name: "@lexical/extension/TabIndentation", register(t, e, r) {
  const { disabled: o, maxIndent: i, $canIndent: s } = r.getOutput();
  return ye(() => {
    if (!o.value) return Id(t, i, s);
  });
} });
const $d = ie({ name: "@lexical/react/ReactProvider" });
function Pd() {
  return Pe().getTextContent();
}
n(Pd, "s$1");
function Ad(t, e = !0) {
  if (t) return !1;
  let r = Pd();
  return e && (r = r.trim()), r === "";
}
n(Ad, "f$1");
function Vd(t) {
  if (!Ad(t, !1)) return !1;
  const e = Pe().getChildren(), r = e.length;
  if (r > 1) return !1;
  for (let o = 0; o < r; o++) {
    const i = e[o];
    if (gl(i)) return !1;
    if (Rr(i)) {
      if (!fl(i) || i.__indent !== 0) return !1;
      const s = i.getChildren(), c = s.length;
      for (let l = 0; l < c; l++) {
        const d = s[o];
        if (!to(d)) return !1;
      }
    }
  }
  return !0;
}
n(Vd, "c");
function Mi(t) {
  return () => Vd(t);
}
n(Mi, "g$1");
function Oi(t) {
  const e = window.location.origin, r = /* @__PURE__ */ n((o) => {
    if (o.origin !== e) return;
    const i = t.getRootElement();
    if (document.activeElement !== i) return;
    const s = o.data;
    if (typeof s == "string") {
      let c;
      try {
        c = JSON.parse(s);
      } catch {
        return;
      }
      if (c && c.protocol === "nuanria_messaging" && c.type === "request") {
        const l = c.payload;
        if (l && l.functionId === "makeChanges") {
          const d = l.args;
          if (d) {
            const [w, u, h, g, f] = d;
            t.update(() => {
              const m = re();
              if (xe(m)) {
                const y = m.anchor;
                let b = y.getNode(), z = 0, k = 0;
                if (to(b) && w >= 0 && u >= 0 && (z = w, k = w + u, m.setTextNodeRange(b, z, b, k)), z === k && h === "" || (m.insertRawText(h), b = y.getNode()), to(b)) {
                  z = g, k = g + f;
                  const E = b.getTextContentSize();
                  z = z > E ? E : z, k = k > E ? E : k, m.setTextNodeRange(b, z, b, k);
                }
                o.stopImmediatePropagation();
              }
            });
          }
        }
      }
    }
  }, "n");
  return window.addEventListener("message", r, !0), () => {
    window.removeEventListener("message", r, !0);
  };
}
n(Oi, "s");
ie({ build: /* @__PURE__ */ n((t, e, r) => fr(e), "build"), config: rr({ disabled: typeof window > "u" }), name: "@lexical/dragon", register: /* @__PURE__ */ n((t, e, r) => ye(() => r.getOutput().disabled.value ? void 0 : Oi(t)), "register") });
function Ld(t, ...e) {
  const r = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const i of e) o.append("v", i);
  throw r.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
n(Ld, "g");
const Po = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? ee : Y;
function jd({ editor: t, ErrorBoundary: e }) {
  return function(r, o) {
    const [i, s] = N(() => r.getDecorators());
    return Po(() => r.registerDecoratorListener((c) => {
      yl(() => {
        s(c);
      });
    }), [r]), Y(() => {
      s(r.getDecorators());
    }, [r]), L(() => {
      const c = [], l = Object.keys(i);
      for (let d = 0; d < l.length; d++) {
        const w = l[d], u = a(o, { onError: /* @__PURE__ */ n((g) => r._onError(g), "onError"), children: a(yc, { fallback: null, children: i[w] }) }), h = r.getElementByKey(w);
        h !== null && c.push(kl(u, h, w));
      }
      return c;
    }, [o, i, r]);
  }(t, e);
}
n(jd, "w");
function Bd({ editor: t, ErrorBoundary: e }) {
  return function(r) {
    const o = ca.maybeFromEditor(r);
    if (o && o.hasExtensionByName($d.name)) {
      for (const i of ["@lexical/plain-text", "@lexical/rich-text"]) o.hasExtensionByName(i) && Ld(320, i);
      return !0;
    }
    return !1;
  }(t) ? null : a(jd, { editor: t, ErrorBoundary: e });
}
n(Bd, "v$1");
function kn(t) {
  return t.getEditorState().read(Mi(t.isComposing()));
}
n(kn, "B");
function Fd({ contentEditable: t, placeholder: e = null, ErrorBoundary: r }) {
  const [o] = Ne();
  return function(i) {
    Po(() => Se(xl(i), Oi(i)), [i]);
  }(o), p(dt, { children: [t, a(Ud, { content: e }), a(Bd, { editor: o, ErrorBoundary: r })] });
}
n(Fd, "L");
function Ud({ content: t }) {
  const [e] = Ne(), r = function(i) {
    const [s, c] = N(() => kn(i));
    return Po(() => {
      function l() {
        const d = kn(i);
        c(d);
      }
      return n(l, "e"), l(), Se(i.registerUpdateListener(() => {
        l();
      }), i.registerEditableListener(() => {
        l();
      }));
    }, [i]), s;
  }(e), o = id();
  return r ? typeof t == "function" ? t(o) : t : null;
}
n(Ud, "b$1");
function Kd({ defaultSelection: t }) {
  const [e] = Ne();
  return Y(() => {
    e.focus(() => {
      const r = document.activeElement, o = e.getRootElement();
      o === null || r !== null && o.contains(r) || o.focus({ preventScroll: !0 });
    }, { defaultSelection: t });
  }, [t, e]), null;
}
n(Kd, "o");
const qd = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? ee : Y;
function Hd({ onClear: t }) {
  const [e] = Ne();
  return qd(() => Ei(e, t), [e, t]), null;
}
n(Hd, "r");
const Ii = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? ee : Y;
function Gd({ editor: t, ariaActiveDescendant: e, ariaAutoComplete: r, ariaControls: o, ariaDescribedBy: i, ariaErrorMessage: s, ariaExpanded: c, ariaInvalid: l, ariaLabel: d, ariaLabelledBy: w, ariaMultiline: u, ariaOwns: h, ariaRequired: g, autoCapitalize: f, className: m, id: y, role: b = "textbox", spellCheck: z = !0, style: k, tabIndex: E, "data-testid": T, ...P }, S) {
  const [U, V] = N(t.isEditable()), M = B((X) => {
    X && X.ownerDocument && X.ownerDocument.defaultView ? t.setRootElement(X) : t.setRootElement(null);
  }, [t]), K = L(() => /* @__PURE__ */ function(...X) {
    return (H) => {
      for (const tt of X) typeof tt == "function" ? tt(H) : tt != null && (tt.current = H);
    };
  }(S, M), [M, S]);
  return Ii(() => (V(t.isEditable()), t.registerEditableListener((X) => {
    V(X);
  })), [t]), a("div", { "aria-activedescendant": U ? e : void 0, "aria-autocomplete": U ? r : "none", "aria-controls": U ? o : void 0, "aria-describedby": i, ...s != null ? { "aria-errormessage": s } : {}, "aria-expanded": U && b === "combobox" ? !!c : void 0, ...l != null ? { "aria-invalid": l } : {}, "aria-label": d, "aria-labelledby": w, "aria-multiline": u, "aria-owns": U ? h : void 0, "aria-readonly": !U || void 0, "aria-required": g, autoCapitalize: f, className: m, contentEditable: U, "data-testid": T, id: y, ref: K, role: b, spellCheck: z, style: k, tabIndex: E, ...P });
}
n(Gd, "f");
const Wd = Zn(Gd);
function _n(t) {
  return t.getEditorState().read(Mi(t.isComposing()));
}
n(_n, "p");
const Yd = Zn(Xd);
function Xd(t, e) {
  const { placeholder: r, ...o } = t, [i] = Ne();
  return p(dt, { children: [a(Wd, { editor: i, ...o, ref: e }), r != null && a(Jd, { editor: i, content: r })] });
}
n(Xd, "E");
function Jd({ content: t, editor: e }) {
  const r = function(c) {
    const [l, d] = N(() => _n(c));
    return Ii(() => {
      function w() {
        const u = _n(c);
        d(u);
      }
      return n(w, "t"), w(), Se(c.registerUpdateListener(() => {
        w();
      }), c.registerEditableListener(() => {
        w();
      }));
    }, [c]), l;
  }(e), [o, i] = N(e.isEditable());
  if (ee(() => (i(e.isEditable()), e.registerEditableListener((c) => {
    i(c);
  })), [e]), !r) return null;
  let s = null;
  return typeof t == "function" ? s = t(o) : t !== null && (s = t), s === null ? null : a("div", { "aria-hidden": !0, children: s });
}
n(Jd, "v");
function Zd({
  placeholder: t,
  className: e,
  placeholderClassName: r
}) {
  return /* @__PURE__ */ a(
    Yd,
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
n(Zd, "ContentEditable");
const $i = fa(void 0);
function Qd({
  activeEditor: t,
  $updateToolbar: e,
  blockType: r,
  setBlockType: o,
  showModal: i,
  children: s
}) {
  const c = L(
    () => ({
      activeEditor: t,
      $updateToolbar: e,
      blockType: r,
      setBlockType: o,
      showModal: i
    }),
    [t, e, r, o, i]
  );
  return /* @__PURE__ */ a($i.Provider, { value: c, children: s });
}
n(Qd, "ToolbarContext");
function Pi() {
  const t = No($i);
  if (!t)
    throw new Error("useToolbarContext must be used within a ToolbarContext provider");
  return t;
}
n(Pi, "useToolbarContext");
function tw() {
  const [t, e] = N(void 0), r = B(() => {
    e(void 0);
  }, []), o = L(() => {
    if (t === void 0)
      return;
    const { title: s, content: c } = t;
    return /* @__PURE__ */ a(Ka, { open: !0, onOpenChange: r, children: /* @__PURE__ */ p(qa, { children: [
      /* @__PURE__ */ a(Ha, { children: /* @__PURE__ */ a(Ga, { children: s }) }),
      c
    ] }) });
  }, [t, r]), i = B(
    (s, c, l = !1) => {
      e({
        closeOnClickOutside: l,
        content: c(r),
        title: s
      });
    },
    [r]
  );
  return [o, i];
}
n(tw, "useEditorModal");
function ew({
  children: t
}) {
  const [e] = Ne(), [r, o] = N(e), [i, s] = N("paragraph"), [c, l] = tw(), d = /* @__PURE__ */ n(() => {
  }, "$updateToolbar");
  return Y(() => r.registerCommand(
    wi,
    (w, u) => (o(u), !1),
    To
  ), [r]), /* @__PURE__ */ p(
    Qd,
    {
      activeEditor: r,
      $updateToolbar: d,
      blockType: i,
      setBlockType: s,
      showModal: l,
      children: [
        c,
        t({ blockType: i })
      ]
    }
  );
}
n(ew, "ToolbarPlugin");
function rw(t) {
  const [e] = Ne(), { activeEditor: r } = Pi();
  Y(() => r.registerCommand(
    wi,
    () => {
      const o = re();
      return o && t(o), !1;
    },
    To
  ), [e, t]), Y(() => {
    r.getEditorState().read(() => {
      const o = re();
      o && t(o);
    });
  }, [r, t]);
}
n(rw, "useUpdateToolbarHandler");
const Nn = [
  { format: "bold", icon: Ds, label: "Bold" },
  { format: "italic", icon: Ms, label: "Italic" }
  // CUSTOM: TJ removed underline and strikethrough as they are not supported by the current comment
  // data conversion and are not in P9 anyway. We can add these back if we ever get this supported.
  /* { format: 'underline', icon: UnderlineIcon, label: 'Underline' },
  { format: 'strikethrough', icon: StrikethroughIcon, label: 'Strikethrough' }, */
];
function aw() {
  const { activeEditor: t } = Pi(), [e, r] = N([]), o = B((i) => {
    if (xe(i) || _l(i)) {
      const s = [];
      Nn.forEach(({ format: c }) => {
        i.hasFormat(c) && s.push(c);
      }), r((c) => c.length !== s.length || !s.every((l) => c.includes(l)) ? s : c);
    }
  }, []);
  return rw(o), /* @__PURE__ */ a(
    An,
    {
      type: "multiple",
      value: e,
      onValueChange: r,
      variant: "outline",
      size: "sm",
      children: Nn.map(({ format: i, icon: s, label: c }) => /* @__PURE__ */ a(
        Gr,
        {
          value: i,
          "aria-label": c,
          onClick: /* @__PURE__ */ n(() => {
            t.dispatchCommand(si, i);
          }, "onClick"),
          children: /* @__PURE__ */ a(s, { className: "tw:h-4 tw:w-4" })
        },
        i
      ))
    }
  );
}
n(aw, "FontFormatToolbarPlugin");
function ow({ onClear: t }) {
  const [e] = Ne();
  Y(() => {
    t && t(() => {
      e.dispatchCommand(ii, void 0);
    });
  }, [e, t]);
}
n(ow, "ClearEditorBridge");
function nw({
  placeholder: t = "Start typing ...",
  autoFocus: e = !1,
  onClear: r
}) {
  const [, o] = N(void 0);
  return /* @__PURE__ */ p("div", { className: "tw:relative", children: [
    /* @__PURE__ */ a(ew, { children: /* @__PURE__ */ n(() => /* @__PURE__ */ a("div", { className: "tw:sticky tw:top-0 tw:z-10 tw:flex tw:gap-2 tw:overflow-auto tw:border-b tw:p-1", children: /* @__PURE__ */ a(aw, {}) }), "children") }),
    /* @__PURE__ */ p("div", { className: "tw:relative", children: [
      /* @__PURE__ */ a(
        Fd,
        {
          contentEditable: /* @__PURE__ */ a("div", { ref: /* @__PURE__ */ n((s) => {
            s !== void 0 && o(s);
          }, "onRef"), children: /* @__PURE__ */ a(Zd, { placeholder: t }) }),
          ErrorBoundary: ad
        }
      ),
      e && /* @__PURE__ */ a(Kd, { defaultSelection: "rootEnd" }),
      /* @__PURE__ */ a(ow, { onClear: r }),
      /* @__PURE__ */ a(Hd, {})
    ] })
  ] });
}
n(nw, "Plugins");
const iw = {
  namespace: "commentEditor",
  theme: Do,
  nodes: Mo,
  onError: /* @__PURE__ */ n((t) => {
    console.error(t);
  }, "onError")
};
function la({
  editorState: t,
  editorSerializedState: e,
  onChange: r,
  onSerializedChange: o,
  placeholder: i = "Start typing…",
  autoFocus: s = !1,
  onClear: c,
  className: l
}) {
  return (
    // CUSTOM: Added `className` prop
    /* @__PURE__ */ a(
      "div",
      {
        className: v(
          "pr-twp tw:overflow-hidden tw:rounded-lg tw:border tw:bg-background tw:shadow",
          l
        ),
        children: /* @__PURE__ */ a(
          Zl,
          {
            initialConfig: {
              ...iw,
              ...t ? { editorState: t } : {},
              ...e ? { editorState: JSON.stringify(e) } : {}
            },
            children: /* @__PURE__ */ p(Mt, { children: [
              /* @__PURE__ */ a(nw, { placeholder: i, autoFocus: s, onClear: c }),
              /* @__PURE__ */ a(
                td,
                {
                  ignoreSelectionChange: !0,
                  onChange: /* @__PURE__ */ n((d) => {
                    r == null || r(d), o == null || o(d.toJSON());
                  }, "onChange")
                }
              )
            ] })
          }
        )
      }
    )
  );
}
n(la, "Editor");
function Ai(t) {
  const e = t.querySelector('[contenteditable="true"]');
  if (!e) return !1;
  e.focus();
  const r = window.getSelection(), o = document.createRange();
  return o.selectNodeContents(e), o.collapse(!1), r == null || r.removeAllRanges(), r == null || r.addRange(o), !0;
}
n(Ai, "focusContentEditable");
function Vi(t) {
  return t ? t.some(
    (e) => e && "text" in e && e.text.trim().length > 0 ? !0 : !e || !("children" in e) ? !1 : Vi(e.children)
  ) : !1;
}
n(Vi, "doChildrenHaveEditorContent");
function ne(t) {
  var e;
  return (e = t == null ? void 0 : t.root) != null && e.children ? Vi(t.root.children) : !1;
}
n(ne, "hasEditorContent");
function sw(t) {
  if (!t || t.trim() === "")
    throw new Error("Input HTML is empty");
  const e = ui({
    namespace: "EditorUtils",
    theme: Do,
    nodes: Mo,
    onError: /* @__PURE__ */ n((o) => {
      console.error(o);
    }, "onError")
  });
  let r;
  if (e.update(
    () => {
      const i = new DOMParser().parseFromString(t, "text/html"), s = Cl(e, i);
      Pe().clear(), ml(s);
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
n(sw, "htmlToEditorState");
function da(t) {
  const e = ui({
    namespace: "EditorUtils",
    theme: Do,
    nodes: Mo,
    onError: /* @__PURE__ */ n((i) => {
      console.error(i);
    }, "onError")
  }), r = e.parseEditorState(JSON.stringify(t));
  e.setEditorState(r);
  let o = "";
  return e.getEditorState().read(() => {
    o = Nl(e);
  }), o = o.replace(/\s+style="[^"]*"/g, "").replace(/\s+class="[^"]*"/g, "").replace(/<span>(.*?)<\/span>/g, "$1").replace(/<b><strong[^>]*>(.*?)<\/strong><\/b>/g, "<b>$1</b>").replace(/<strong><b[^>]*>(.*?)<\/b><\/strong>/g, "<b>$1</b>").replace(/<i><em[^>]*>(.*?)<\/em><\/i>/g, "<i>$1</i>").replace(/<em><i[^>]*>(.*?)<\/i><\/em>/g, "<i>$1</i>").replace(/<u><span[^>]*>(.*?)<\/span><\/u>/g, "<u>$1</u>").replace(/<s><span[^>]*>(.*?)<\/span><\/s>/g, "<s>$1</s>").replace(/<br\s*\/?>/gi, "<br/>"), o;
}
n(da, "editorStateToHtml");
function Ao(t) {
  return ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Home", "End"].includes(t.key) ? (t.stopPropagation(), !0) : !1;
}
n(Ao, "handleEditorKeyNavigation");
const Li = Object.freeze([
  "%cancelButton_tooltip%",
  "%acceptButton_tooltip%"
]), Cn = /* @__PURE__ */ n((t, e) => t[e] ?? e, "localizeString$5");
function ji({
  onCancelClick: t,
  onAcceptClick: e,
  canAccept: r = !0,
  localizedStrings: o = {},
  className: i = "tw:h-6 tw:w-6",
  acceptLabel: s
}) {
  const c = Cn(o, "%cancelButton_tooltip%"), l = s ?? Cn(o, "%acceptButton_tooltip%");
  return /* @__PURE__ */ p(go, { children: [
    /* @__PURE__ */ a(Mt, { children: /* @__PURE__ */ p(Ot, { children: [
      /* @__PURE__ */ a(It, { asChild: !0, children: /* @__PURE__ */ a(
        J,
        {
          "aria-label": c,
          className: i,
          size: "icon",
          onClick: t,
          variant: "secondary",
          children: /* @__PURE__ */ a(ko, {})
        }
      ) }),
      /* @__PURE__ */ a($t, { children: /* @__PURE__ */ a("p", { children: c }) })
    ] }) }),
    /* @__PURE__ */ a(Vn, {}),
    /* @__PURE__ */ a(Mt, { children: /* @__PURE__ */ p(Ot, { children: [
      /* @__PURE__ */ a(It, { asChild: !0, children: /* @__PURE__ */ a(
        J,
        {
          "aria-label": l,
          className: i,
          size: "icon",
          onClick: e,
          disabled: !r,
          children: /* @__PURE__ */ a($e, {})
        }
      ) }),
      /* @__PURE__ */ a($t, { children: /* @__PURE__ */ a("p", { children: l }) })
    ] }) })
  ] });
}
n(ji, "CancelAcceptButtons");
const cw = "verseText", Ip = Object.freeze([
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
]), Bi = [
  "tw:prose tw:max-w-none tw:break-words tw:text-sm tw:font-normal tw:text-foreground",
  "tw:[&>blockquote]:border-s-0 tw:[&>blockquote]:p-0 tw:[&>blockquote]:ps-0 tw:[&>blockquote]:font-normal tw:[&>blockquote]:not-italic tw:[&>blockquote]:text-foreground",
  "tw:prose-quoteless"
].join(" ");
function Fi(t) {
  return (t == null ? void 0 : t.conflictType) === cw;
}
n(Fi, "isVerseTextConflictNote");
function Ui(t) {
  return t === "replaced" ? "reject" : t === "merged" ? "merged" : "accept";
}
n(Ui, "actionToOutcome");
function Qr(t, e) {
  return t === "" ? e["%comment_assign_unassigned%"] ?? "Unassigned" : t === "Team" ? e["%comment_assign_team%"] ?? "Team" : t;
}
n(Qr, "getAssignedUserDisplayName$1");
function Vo(t) {
  const e = fo();
  return t.key === "Enter" && (e && t.metaKey || !e && t.ctrlKey);
}
n(Vo, "didPressCtrlOrCmdEnter");
const lw = {
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
n(Ba, "getAssignedUserDisplayName");
function $p({
  assignableUsers: t,
  onSave: e,
  onClose: r,
  localizedStrings: o,
  initialAssignedUser: i
}) {
  const [s, c] = N(lw), [l, d] = N(i), [w, u] = N(!1), h = q(void 0), g = q(null);
  Y(() => {
    let b = !0;
    const z = g.current;
    if (!z) return;
    const k = setTimeout(() => {
      b && Ai(z);
    }, 300);
    return () => {
      b = !1, clearTimeout(k);
    };
  }, []);
  const f = B(() => {
    if (!ne(s)) return;
    const b = da(s);
    e(b, l);
  }, [s, e, l]), m = o["%commentEditor_placeholder%"] ?? "Type your comment here...", y = o["%commentEditor_assignTo_label%"] ?? "Assign to";
  return /* @__PURE__ */ p("div", { className: "pr-twp tw:grid tw:gap-3", children: [
    /* @__PURE__ */ p("div", { className: "tw:flex tw:items-center tw:justify-between", children: [
      /* @__PURE__ */ a("span", { className: "tw:text-sm tw:font-medium", children: y }),
      /* @__PURE__ */ a(
        ji,
        {
          onCancelClick: r,
          onAcceptClick: f,
          canAccept: ne(s),
          localizedStrings: o,
          acceptLabel: o["%commentEditor_saveButton_tooltip%"]
        }
      )
    ] }),
    /* @__PURE__ */ a("div", { className: "tw:flex tw:items-center tw:gap-2", children: /* @__PURE__ */ p(Ae, { open: w, onOpenChange: u, children: [
      /* @__PURE__ */ a(tr, { asChild: !0, children: /* @__PURE__ */ p(
        J,
        {
          variant: "outline",
          className: "tw:flex tw:w-full tw:items-center tw:justify-start tw:gap-2",
          disabled: t.length === 0,
          children: [
            /* @__PURE__ */ a(qn, { className: "tw:h-4 tw:w-4" }),
            /* @__PURE__ */ a("span", { children: Ba(l !== void 0 ? l : "", o) })
          ]
        }
      ) }),
      /* @__PURE__ */ a(
        Ve,
        {
          className: "tw:w-auto tw:p-0",
          align: "start",
          onKeyDown: /* @__PURE__ */ n((b) => {
            b.key === "Escape" && (b.stopPropagation(), u(!1));
          }, "onKeyDown"),
          children: /* @__PURE__ */ a(Le, { children: /* @__PURE__ */ a(je, { children: t.map((b) => /* @__PURE__ */ a(
            Re,
            {
              onSelect: /* @__PURE__ */ n(() => {
                d(b || void 0), u(!1);
              }, "onSelect"),
              className: "tw:flex tw:items-center",
              children: /* @__PURE__ */ a("span", { children: Ba(b, o) })
            },
            b || "unassigned"
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
        onKeyDownCapture: /* @__PURE__ */ n((b) => {
          b.key === "Escape" ? (b.preventDefault(), b.stopPropagation(), r()) : Vo(b) && (b.preventDefault(), b.stopPropagation(), ne(s) && f());
        }, "onKeyDownCapture"),
        onKeyDown: /* @__PURE__ */ n((b) => {
          Ao(b), (b.key === "Enter" || b.key === " ") && b.stopPropagation();
        }, "onKeyDown"),
        children: /* @__PURE__ */ a(
          la,
          {
            editorSerializedState: s,
            onSerializedChange: /* @__PURE__ */ n((b) => c(b), "onSerializedChange"),
            placeholder: m,
            onClear: /* @__PURE__ */ n((b) => {
              h.current = b;
            }, "onClear")
          }
        )
      }
    )
  ] });
}
n($p, "CommentEditor");
const Pp = Object.freeze([
  "%commentEditor_placeholder%",
  "%commentEditor_assignTo_label%",
  "%commentEditor_saveButton_tooltip%",
  "%commentEditor_unassigned%",
  "%commentEditor_team%",
  ...Li
]), Ap = Object.freeze([
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
]), dw = "comment-list";
function Vp(t) {
  return t;
}
n(Vp, "getCommentThreadElementId");
function ww({
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
n(ww, "Card");
function Lp({ className: t, ...e }) {
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
n(Lp, "CardHeader");
function jp({ className: t, ...e }) {
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
n(jp, "CardTitle");
function Bp({ className: t, ...e }) {
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
n(Bp, "CardDescription");
function uw({ className: t, ...e }) {
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
n(uw, "CardContent");
function Fp({ className: t, ...e }) {
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
n(Fp, "CardFooter");
function pw({
  className: t,
  size: e = "default",
  ...r
}) {
  return /* @__PURE__ */ a(
    So.Root,
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
n(pw, "Avatar");
function Up({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    So.Image,
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
n(Up, "AvatarImage");
function hw({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    So.Fallback,
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
n(hw, "AvatarFallback");
function En({
  comment: t,
  isReply: e = !1,
  localizedStrings: r,
  isThreadExpanded: o = !1,
  handleUpdateComment: i,
  handleDeleteComment: s,
  onEditingChange: c,
  canEditOrDelete: l = !1
}) {
  const [d, w] = N(!1), [u, h] = N(), g = q(null);
  Y(() => {
    if (!d) return;
    let S = !0;
    const U = g.current;
    if (!U) return;
    const V = setTimeout(() => {
      S && Ai(U);
    }, 300);
    return () => {
      S = !1, clearTimeout(V);
    };
  }, [d]);
  const f = B(
    (S) => {
      S && S.stopPropagation(), w(!1), h(void 0), c == null || c(!1);
    },
    [c]
  ), m = B(
    async (S) => {
      if (S && S.stopPropagation(), !u || !i) return;
      await i(
        t.id,
        da(u)
      ) && (w(!1), h(void 0), c == null || c(!1));
    },
    [u, i, t.id, c]
  ), y = L(() => {
    const S = new Date(t.date), U = lc(
      S,
      r["%comment_date_today%"],
      r["%comment_date_yesterday%"]
    ), V = S.toLocaleTimeString(void 0, {
      hour: "numeric",
      minute: "2-digit"
    });
    return Oe(r["%comment_dateAtTime%"], {
      date: U,
      time: V
    });
  }, [t.date, r]), b = L(() => t.user, [t.user]), z = L(
    () => t.user.split(" ").map((S) => S[0]).join("").toUpperCase().slice(0, 2),
    [t.user]
  ), k = L(() => _o(t.contents), [t.contents]), E = L(
    () => t.contents.replace(/<[^>]*>/g, "").trim().length > 0,
    [t.contents]
  ), T = !!t.conflictResolutionAction && !E, P = L(() => {
    if (o && l)
      return /* @__PURE__ */ p(dt, { children: [
        /* @__PURE__ */ p(
          Ze,
          {
            onClick: /* @__PURE__ */ n((S) => {
              S.stopPropagation(), w(!0), h(sw(t.contents)), c == null || c(!0);
            }, "onClick"),
            children: [
              /* @__PURE__ */ a(Os, { className: "tw:me-2 tw:h-4 tw:w-4" }),
              r["%comment_editComment%"]
            ]
          }
        ),
        /* @__PURE__ */ p(
          Ze,
          {
            onClick: /* @__PURE__ */ n(async (S) => {
              S.stopPropagation(), s && await s(t.id);
            }, "onClick"),
            children: [
              /* @__PURE__ */ a(Is, { className: "tw:me-2 tw:h-4 tw:w-4" }),
              r["%comment_deleteComment%"]
            ]
          }
        )
      ] });
  }, [
    l,
    o,
    r,
    t.contents,
    t.id,
    s,
    c
  ]);
  return /* @__PURE__ */ p(
    "div",
    {
      className: v("tw:flex tw:w-full tw:flex-row tw:items-baseline tw:gap-3 tw:space-y-3", {
        "tw:text-sm": e
      }),
      children: [
        /* @__PURE__ */ a(pw, { className: "tw:h-8 tw:w-8", children: /* @__PURE__ */ a(hw, { className: "tw:text-xs tw:font-medium", children: z }) }),
        /* @__PURE__ */ p("div", { className: "tw:flex tw:flex-1 tw:flex-col tw:gap-2", children: [
          /* @__PURE__ */ p("div", { className: "tw:flex tw:w-full tw:flex-row tw:flex-wrap tw:items-baseline tw:gap-x-2", children: [
            /* @__PURE__ */ a("p", { className: "tw:text-sm tw:font-medium", children: b }),
            /* @__PURE__ */ a("p", { className: "tw:text-xs tw:font-normal tw:text-muted-foreground", children: y }),
            /* @__PURE__ */ a("div", { className: "tw:flex-1" }),
            e && t.assignedUser !== void 0 && /* @__PURE__ */ p(Tr, { variant: "secondary", className: "tw:text-xs tw:font-normal", children: [
              "→ ",
              Qr(t.assignedUser, r)
            ] })
          ] }),
          d && /* @__PURE__ */ p(
            "div",
            {
              role: "textbox",
              tabIndex: -1,
              className: "tw:flex tw:flex-col tw:gap-2",
              ref: g,
              onKeyDownCapture: /* @__PURE__ */ n((S) => {
                S.key === "Escape" ? (S.preventDefault(), S.stopPropagation(), f()) : Vo(S) && (S.preventDefault(), S.stopPropagation(), ne(u) && m());
              }, "onKeyDownCapture"),
              onKeyDown: /* @__PURE__ */ n((S) => {
                Ao(S), (S.key === "Enter" || S.key === " ") && S.stopPropagation();
              }, "onKeyDown"),
              onClick: /* @__PURE__ */ n((S) => {
                S.stopPropagation();
              }, "onClick"),
              children: [
                /* @__PURE__ */ a(
                  la,
                  {
                    className: v(
                      // Don't render blockquote on the first child. All comments are wrapped in blockquote
                      // that has text-align corresponding to LTR or RTL, so the blockquote is important.
                      // But we don't want it to look like there's a blockquote there. Target the
                      // lowest-level Lexical editor element by attribute so Tailwind can apply styles to
                      // the blockquote directly inside the editor.
                      'tw:[&_[data-lexical-editor="true"]>blockquote]:mt-0 tw:[&_[data-lexical-editor="true"]>blockquote]:border-s-0 tw:[&_[data-lexical-editor="true"]>blockquote]:ps-0 tw:[&_[data-lexical-editor="true"]>blockquote]:font-normal tw:[&_[data-lexical-editor="true"]>blockquote]:not-italic tw:[&_[data-lexical-editor="true"]>blockquote]:text-foreground'
                    ),
                    editorSerializedState: u,
                    onSerializedChange: /* @__PURE__ */ n((S) => h(S), "onSerializedChange")
                  }
                ),
                /* @__PURE__ */ p("div", { className: "tw:flex tw:flex-row tw:items-start tw:justify-end tw:gap-2", children: [
                  /* @__PURE__ */ a(
                    J,
                    {
                      size: "icon",
                      onClick: f,
                      variant: "outline",
                      className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                      children: /* @__PURE__ */ a(ko, {})
                    }
                  ),
                  /* @__PURE__ */ a(
                    J,
                    {
                      size: "icon",
                      onClick: m,
                      className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                      disabled: !ne(u),
                      children: /* @__PURE__ */ a(Hn, {})
                    }
                  )
                ] })
              ]
            }
          ),
          !d && /* @__PURE__ */ p(dt, { children: [
            t.status === "Resolved" && !T && /* @__PURE__ */ a("div", { className: "tw:text-sm tw:italic", children: r["%comment_status_resolved%"] }),
            t.status === "Todo" && e && /* @__PURE__ */ a("div", { className: "tw:text-sm tw:italic", children: r["%comment_status_todo%"] }),
            T ? (
              // A platform-created conflict resolution comment carries an empty body — PT9 renders
              // its banner UI-side from conflictResolutionAction, it never stores text. So render the
              // localized, neutral outcome line here instead of the (empty) contents, styled like the
              // italic status lines above. These are the same neutral keys ConflictNoteCard's Result
              // region used to render inline. Only when the body IS empty: a resolution synced from
              // PT9 can carry the resolver's typed note alongside the action, and PT9 shows that text,
              // so the body branch below keeps it visible rather than discarding it for this banner.
              /* @__PURE__ */ a("div", { className: "tw:text-sm tw:italic", children: Ui(t.conflictResolutionAction) === "merged" ? r["%conflict_note_outcome_combined%"] ?? "Combined both changes." : r["%conflict_note_outcome_used_other%"] ?? "Used the other change instead of the current text." })
            ) : /* @__PURE__ */ a(
              "div",
              {
                className: v(
                  // Shared note-body prose/blockquote treatment (also used by conflict-diff's
                  // DIFF_HTML_CLASSES). Layer this comment item's own extras on top: items-start +
                  // gap-2 for layout, and line-clamp while the thread is collapsed.
                  Bi,
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
        P && /* @__PURE__ */ p(Be, { children: [
          /* @__PURE__ */ a(Fe, { asChild: !0, children: /* @__PURE__ */ a(J, { variant: "ghost", size: "icon", children: /* @__PURE__ */ a($s, {}) }) }),
          /* @__PURE__ */ a(Ue, { align: "end", children: P })
        ] })
      ]
    }
  );
}
n(En, "CommentItem");
function Ki({
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
        className: v(
          "tw:ms-auto",
          "tw:text-primary tw:transition-opacity tw:duration-200 tw:hover:bg-primary/10",
          "tw:opacity-0 tw:group-hover:opacity-100"
        ),
        onClick: /* @__PURE__ */ n((i) => {
          i.stopPropagation(), r();
        }, "onClick"),
        "aria-label": o,
        children: /* @__PURE__ */ a($e, { className: "tw:h-4 tw:w-4" })
      }
    );
}
n(Ki, "ResolveCheckButton");
const Tn = {
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
function qi({
  classNameForVerseText: t,
  comments: e,
  localizedStrings: r,
  isSelected: o = !1,
  verseRef: i,
  assignedUser: s,
  currentUser: c,
  handleSelectThread: l,
  threadId: d,
  thread: w,
  threadStatus: u,
  handleAddCommentToThread: h,
  handleUpdateComment: g,
  handleDeleteComment: f,
  handleReadStatusChange: m,
  assignableUsers: y,
  canUserAddCommentToThread: b,
  canUserAssignThreadCallback: z,
  canUserResolveThreadCallback: k,
  canUserEditOrDeleteCommentCallback: E,
  isRead: T = !1,
  autoReadDelay: P = 5,
  onVerseRefClick: S,
  initialAssignedUser: U,
  activeComments: V,
  rootContentSlot: M,
  resolveActionSlot: K,
  spaceRootContentFromReplies: X = !1
}) {
  const [H, tt] = N(Tn), [$, et] = N(), [C, D] = N(), G = o, [it, ot] = N(!1), [ht, wt] = N(!1), [Z, ut] = N(!1), [ft, mt] = N(!1), [vt, Zt] = N(!1), [bt, At] = N(T), [Vt, xt] = N(!1), Ft = q(void 0), [St, Ut] = N(/* @__PURE__ */ new Map());
  Y(() => {
    let x = !0;
    return (/* @__PURE__ */ n(async () => {
      const A = k ? await k(d) : !1;
      x && Zt(A);
    }, "checkResolvePermission"))(), () => {
      x = !1;
    };
  }, [d, k]), Y(() => {
    let x = !0;
    if (!o) {
      mt(!1), Ut(/* @__PURE__ */ new Map());
      return;
    }
    return (/* @__PURE__ */ n(async () => {
      const A = z ? await z(d) : !1;
      x && mt(A);
    }, "checkPermissions"))(), () => {
      x = !1;
    };
  }, [o, d, z]);
  const lt = q("idle");
  Y(() => {
    if (!o) {
      lt.current !== "idle" && (et(void 0), D(void 0), lt.current = "idle");
      return;
    }
    lt.current === "idle" && (lt.current = "pending"), ft ? lt.current === "pending" && U !== void 0 && // Skip pre-population if the thread is already assigned to this user — doing so
    // would show "Assigning to: Alice" and enable the submit button for a no-op call.
    U !== s && (et(U), lt.current = "auto-populated") : lt.current === "auto-populated" && (et(void 0), lt.current = "pending");
  }, [o, U, ft, s]);
  const _t = L(
    () => V ?? e.filter((x) => !x.deleted),
    [V, e]
  );
  Y(() => {
    let x = !0;
    if (!o || !E) {
      Ut(/* @__PURE__ */ new Map());
      return;
    }
    return (/* @__PURE__ */ n(async () => {
      const A = /* @__PURE__ */ new Map();
      await Promise.all(
        _t.map(async (rt) => {
          const ct = await E(rt.id);
          x && A.set(rt.id, ct);
        })
      ), x && Ut(A);
    }, "checkCommentPermissions"))(), () => {
      x = !1;
    };
  }, [o, _t, E]);
  const Lt = L(() => _t[0], [_t]), se = q(null), ce = q(void 0), Kt = B(() => {
    var x;
    (x = ce.current) == null || x.call(ce), tt(Tn);
  }, []), qe = B(() => {
    const x = !bt;
    At(x), xt(!x), m == null || m(d, x);
  }, [bt, m, d]);
  Y(() => {
    ot(!1);
  }, [o]), Y(() => {
    if (o && !bt && !Vt) {
      const x = setTimeout(() => {
        At(!0), m == null || m(d, !0);
      }, P * 1e3);
      return Ft.current = x, () => clearTimeout(x);
    }
    Ft.current && (clearTimeout(Ft.current), Ft.current = void 0);
  }, [o, bt, Vt, P, d, m]);
  const qt = L(
    () => ({
      singleReply: r["%comment_thread_single_reply%"],
      multipleReplies: r["%comment_thread_multiple_replies%"]
    }),
    [r]
  ), oe = L(() => {
    if (s === void 0)
      return;
    if (s === "")
      return r["%comment_assign_unassigned%"] ?? "Unassigned";
    const x = Qr(s, r);
    return Oe(r["%comment_assigned_to%"], {
      assignedUser: x
    });
  }, [s, r]), Qt = L(() => _t.slice(1), [_t]), O = L(() => Qt.length ?? 0, [Qt.length]), le = L(() => O > 0, [O]), jt = L(() => it || O <= 2 ? Qt : Qt.slice(-2), [Qt, O, it]), Ht = L(() => it || O <= 2 ? 0 : O - 2, [O, it]), pe = L(
    () => O === 1 ? qt.singleReply : Oe(qt.multipleReplies, { count: O }),
    [O, qt]
  ), he = L(
    () => Ht === 1 ? qt.singleReply : Oe(qt.multipleReplies, { count: Ht }),
    [Ht, qt]
  );
  Y(() => {
    !o && ht && le && wt(!1);
  }, [o, ht, le]);
  const R = B(
    async (x) => {
      x && x.stopPropagation();
      const j = ne(H) ? da(H) : void 0;
      if ($ !== void 0) {
        await h({
          threadId: d,
          contents: j,
          assignedUser: $
        }) && (D($), j && Kt());
        return;
      }
      j && await h({ threadId: d, contents: j }) && Kt();
    },
    [
      Kt,
      H,
      h,
      $,
      d
    ]
  ), F = B(
    async (x) => {
      const j = ne(H) ? da(H) : void 0, A = x.status ? x.assignedUser : $ ?? x.assignedUser, rt = await h({
        ...x,
        contents: j,
        assignedUser: A
      });
      return rt && (A !== void 0 && D(A), j && Kt()), rt;
    },
    [Kt, H, h, $]
  );
  if (_t.length === 0) return;
  const W = /* @__PURE__ */ a(
    En,
    {
      comment: Lt,
      localizedStrings: r,
      isThreadExpanded: o,
      threadStatus: u,
      handleAddCommentToThread: F,
      handleUpdateComment: g,
      handleDeleteComment: f,
      onEditingChange: wt,
      canEditOrDelete: (!ht && St.get(Lt.id)) ?? !1,
      canUserResolveThread: vt
    }
  );
  return /* @__PURE__ */ a(
    ww,
    {
      role: "option",
      "aria-selected": o,
      id: d,
      className: v(
        "tw:group tw:w-full tw:rounded-none tw:border-none tw:p-4 tw:outline-hidden tw:transition-all tw:duration-200 tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-1 tw:focus:ring-offset-background",
        { "tw:cursor-pointer tw:hover:shadow-md": !o },
        {
          "tw:bg-primary-foreground": !o && u !== "Resolved" && bt,
          "tw:bg-background": o && u !== "Resolved" && bt,
          "tw:bg-muted": u === "Resolved",
          "tw:bg-accent": !bt && !o && u !== "Resolved"
        }
      ),
      onClick: /* @__PURE__ */ n(() => {
        l(d);
      }, "onClick"),
      tabIndex: -1,
      children: /* @__PURE__ */ p(uw, { className: "tw:flex tw:flex-col tw:gap-2 tw:p-0", children: [
        /* @__PURE__ */ p("div", { className: "tw:flex tw:flex-col tw:content-center tw:items-start tw:gap-4", children: [
          /* @__PURE__ */ p("div", { className: "tw:flex tw:items-center tw:gap-2", children: [
            oe && /* @__PURE__ */ a(Tr, { className: "tw:rounded-sm tw:bg-input tw:text-sm tw:font-normal tw:text-primary tw:hover:bg-input", children: oe }),
            /* @__PURE__ */ a(
              J,
              {
                variant: "ghost",
                size: "icon",
                onClick: /* @__PURE__ */ n((x) => {
                  x.stopPropagation(), qe();
                }, "onClick"),
                className: "tw:text-muted-foreground tw:transition tw:hover:text-foreground",
                "aria-label": bt ? r["%comment_aria_mark_as_unread%"] ?? "Mark as unread" : r["%comment_aria_mark_as_read%"] ?? "Mark as read",
                children: bt ? /* @__PURE__ */ a(Ps, {}) : /* @__PURE__ */ a(As, {})
              }
            ),
            K === void 0 ? (
              // Generic status-resolve check (used by non-conflict threads and, via ConflictThread
              // leaving this slot undefined, by non-verseText conflicts, which resolve through a
              // plain status change). ConflictThread overrides this slot for verseText conflicts.
              /* @__PURE__ */ a(
                Ki,
                {
                  show: vt && u !== "Resolved",
                  onClick: /* @__PURE__ */ n(() => F({ threadId: d, status: "Resolved" }), "onClick"),
                  ariaLabel: r["%comment_aria_resolve_thread%"] ?? "Resolve thread"
                }
              )
            ) : K
          ] }),
          /* @__PURE__ */ a("div", { className: "tw:flex tw:max-w-full tw:flex-wrap tw:items-baseline tw:gap-2", children: /* @__PURE__ */ p(
            "p",
            {
              ref: se,
              className: v(
                "tw:flex-1 tw:overflow-hidden tw:text-ellipsis tw:text-sm tw:font-normal tw:text-muted-foreground",
                {
                  "tw:overflow-visible tw:text-clip tw:whitespace-normal tw:break-words": G
                },
                { "tw:whitespace-nowrap": !G }
              ),
              children: [
                i && S ? /* @__PURE__ */ a(
                  J,
                  {
                    variant: "ghost",
                    size: "sm",
                    className: "tw:h-auto tw:px-1 tw:py-0 tw:text-sm tw:font-normal tw:text-muted-foreground",
                    onClick: /* @__PURE__ */ n((x) => {
                      x.stopPropagation(), S(w);
                    }, "onClick"),
                    children: i
                  }
                ) : i,
                /* @__PURE__ */ p("span", { className: t, children: [
                  Lt.contextBefore,
                  /* @__PURE__ */ a("span", { className: "tw:font-bold", children: Lt.selectedText }),
                  Lt.contextAfter
                ] })
              ]
            }
          ) }),
          M ?? W
        ] }),
        /* @__PURE__ */ p(dt, { children: [
          le && !o && /* @__PURE__ */ p("div", { className: "tw:flex tw:items-center tw:gap-5", children: [
            /* @__PURE__ */ a("div", { className: "tw:w-8", children: /* @__PURE__ */ a(Sr, {}) }),
            /* @__PURE__ */ a("p", { className: "tw:text-sm tw:text-muted-foreground", children: pe })
          ] }),
          !o && ne(H) && /* @__PURE__ */ a(
            la,
            {
              editorSerializedState: H,
              onSerializedChange: /* @__PURE__ */ n((x) => tt(x), "onSerializedChange"),
              placeholder: r["%comment_replyOrAssign%"]
            }
          ),
          o && /* @__PURE__ */ p(dt, { children: [
            X && jt.length > 0 && /* @__PURE__ */ a("div", { className: "tw:h-2", "data-slot": "root-content-reply-gap", "aria-hidden": "true" }),
            Ht > 0 && /* @__PURE__ */ p(
              "div",
              {
                className: "tw:flex tw:cursor-pointer tw:items-center tw:gap-5 tw:py-2",
                onClick: /* @__PURE__ */ n((x) => {
                  x.stopPropagation(), ot(!0);
                }, "onClick"),
                role: "button",
                tabIndex: 0,
                onKeyDown: /* @__PURE__ */ n((x) => {
                  (x.key === "Enter" || x.key === " ") && (x.preventDefault(), x.stopPropagation(), ot(!0));
                }, "onKeyDown"),
                children: [
                  /* @__PURE__ */ a("div", { className: "tw:w-8", children: /* @__PURE__ */ a(Sr, {}) }),
                  /* @__PURE__ */ p("div", { className: "tw:flex tw:items-center tw:gap-2", children: [
                    /* @__PURE__ */ a("p", { className: "tw:text-sm tw:text-muted-foreground", children: he }),
                    it ? /* @__PURE__ */ a(Vs, {}) : /* @__PURE__ */ a(dr, {})
                  ] })
                ]
              }
            ),
            jt.map((x) => /* @__PURE__ */ a("div", { children: /* @__PURE__ */ a(
              En,
              {
                comment: x,
                localizedStrings: r,
                isReply: !0,
                isThreadExpanded: o,
                handleUpdateComment: g,
                handleDeleteComment: f,
                onEditingChange: wt,
                canEditOrDelete: (!ht && St.get(x.id)) ?? !1
              }
            ) }, x.id)),
            b !== !1 && (!ht || ne(H)) && /* @__PURE__ */ p(
              "div",
              {
                role: "textbox",
                tabIndex: -1,
                className: "tw:w-full tw:space-y-2",
                onClick: /* @__PURE__ */ n((x) => x.stopPropagation(), "onClick"),
                onKeyDownCapture: /* @__PURE__ */ n((x) => {
                  Vo(x) && (x.preventDefault(), x.stopPropagation(), (ne(H) || $ !== void 0 && $ !== C) && R());
                }, "onKeyDownCapture"),
                onKeyDown: /* @__PURE__ */ n((x) => {
                  Ao(x), (x.key === "Enter" || x.key === " ") && x.stopPropagation();
                }, "onKeyDown"),
                children: [
                  /* @__PURE__ */ a(
                    la,
                    {
                      editorSerializedState: H,
                      onSerializedChange: /* @__PURE__ */ n((x) => tt(x), "onSerializedChange"),
                      placeholder: u === "Resolved" ? r["%comment_reopenResolved%"] : r["%comment_replyOrAssign%"],
                      autoFocus: !0,
                      onClear: /* @__PURE__ */ n((x) => {
                        ce.current = x;
                      }, "onClear")
                    }
                  ),
                  /* @__PURE__ */ p("div", { className: "tw:flex tw:flex-row tw:items-center tw:justify-end tw:gap-2", children: [
                    $ !== void 0 && (ne(H) || $ !== C) && /* @__PURE__ */ a("span", { className: "tw:flex-1 tw:text-sm tw:text-muted-foreground", children: Oe(
                      r["%comment_assigning_to%"] ?? "Assigning to: {assignedUser}",
                      {
                        assignedUser: Qr(
                          $,
                          r
                        )
                      }
                    ) }),
                    /* @__PURE__ */ p(Ae, { open: Z, onOpenChange: ut, children: [
                      /* @__PURE__ */ a(tr, { asChild: !0, children: /* @__PURE__ */ a(
                        J,
                        {
                          size: "icon",
                          variant: "outline",
                          className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                          disabled: !ft || !y || y.length === 0 || !y.includes(c),
                          "aria-label": r["%comment_aria_assign_user%"] ?? "Assign user",
                          children: /* @__PURE__ */ a(qn, {})
                        }
                      ) }),
                      /* @__PURE__ */ a(
                        Ve,
                        {
                          className: "tw:w-auto tw:p-0",
                          align: "end",
                          onKeyDown: /* @__PURE__ */ n((x) => {
                            x.key === "Escape" && (x.stopPropagation(), ut(!1));
                          }, "onKeyDown"),
                          children: /* @__PURE__ */ a(Le, { children: /* @__PURE__ */ a(je, { children: y == null ? void 0 : y.map((x) => /* @__PURE__ */ a(
                            Re,
                            {
                              onSelect: /* @__PURE__ */ n(() => {
                                et(x !== s ? x : void 0), lt.current = "user-selected", D(void 0), ut(!1);
                              }, "onSelect"),
                              className: "tw:flex tw:items-center",
                              children: /* @__PURE__ */ a("span", { children: Qr(x, r) })
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
                        onClick: R,
                        className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                        disabled: !ne(H) && ($ === void 0 || $ === C),
                        "aria-label": r["%comment_aria_submit_comment%"] ?? "Submit comment",
                        children: /* @__PURE__ */ a(Hn, {})
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
n(qi, "CommentThread");
const gw = v(
  Bi,
  // `prose` gives block children (the top-level blockquote wrapper, and any p — whether nested
  // inside that blockquote or, in the non-verseText fallback, a direct child) vertical margins that
  // make these already-compact cards feel bulky. Zero both so the diff sits flush inside the card.
  "tw:[&>blockquote]:my-0 tw:[&_p]:my-0",
  "tw:[&_u]:font-semibold tw:[&_u]:text-success-foreground tw:[&_u]:no-underline",
  "tw:[&_s]:text-destructive tw:[&_s]:line-through"
), fw = /* @__PURE__ */ n((t) => t.replace(/(\s+)(<\/[us]>)/g, "$2$1"), "trimDiffSpanWhitespace"), ta = /* @__PURE__ */ n((t) => fw(_o(t)), "sanitizeDiffHtml");
function ea({ html: t }) {
  return /* @__PURE__ */ a(
    "div",
    {
      className: gw,
      dangerouslySetInnerHTML: { __html: t }
    }
  );
}
n(ea, "DiffHtml");
function mw({
  comment: t,
  localizedStrings: e,
  availableActions: r = "acceptOrReject",
  resolvedResolution: o,
  onResolve: i,
  isResolving: s = !1
}) {
  const [c, l] = N("accept"), d = tn(), w = tn(), u = r === "loading", h = r === "accept", g = r === "none", f = r === "acceptRejectOrMerge", m = h ? "accept" : c, y = L(
    () => ta(t.rejectedText ?? ""),
    [t.rejectedText]
  ), b = L(
    () => ta(t.acceptedText ?? ""),
    [t.acceptedText]
  ), z = L(
    () => ta(t.mergedText ?? ""),
    [t.mergedText]
  ), k = L(() => _o(t.contents), [t.contents]);
  if (!Fi(t))
    return /* @__PURE__ */ a(ea, { html: k });
  const E = /* @__PURE__ */ n((C) => {
    l(C === "reject" || C === "merge" ? C : "accept");
  }, "handleChange"), T = e["%conflict_note_stale_notice%"] ?? "The verse was edited after this conflict was recorded, so 'Use the other change' is no longer available. Keep the current text to resolve.", P = f ? [
    {
      value: "merge",
      label: e["%conflict_note_option_combine%"] ?? "Combine both changes",
      html: z
    }
  ] : [], S = [
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
    ...P
  ], U = m === "accept", V = s || U;
  let M;
  U ? M = e["%conflict_note_save_disabled_tooltip%"] ?? "Keeping the current text makes no change — resolve the thread with the ✓ to keep it." : s || (M = e["%conflict_note_save_warning%"] ?? "This can't be undone.");
  const K = e["%conflict_note_no_result%"] ?? "No result preview available.", X = /* @__PURE__ */ a("p", { className: "tw:text-muted-foreground", children: K }), H = /* @__PURE__ */ n((C) => C ? /* @__PURE__ */ a("p", { className: "tw:whitespace-pre-wrap tw:text-foreground", children: C }) : X, "renderResolvedText"), tt = /* @__PURE__ */ n(() => {
    const C = o ?? "accept";
    return C === "merged" ? t.mergedText ? /* @__PURE__ */ a(ea, { html: z }) : X : H(C === "reject" ? t.rejectedResultText : t.resultText);
  }, "renderResolvedResult"), $ = /* @__PURE__ */ n((C) => h && C.value === "reject", "isStaleRejectOption"), et = /* @__PURE__ */ n((C) => {
    const D = m === C.value, G = `${w}-${C.value}`, it = $(C);
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
          htmlFor: G,
          "data-slot": "conflict-resolution-option",
          "data-value": C.value,
          className: v(
            "tw:flex tw:flex-col tw:gap-1 tw:rounded-md tw:border tw:p-2",
            "tw:focus-within:ring-2 tw:focus-within:ring-ring tw:focus-within:ring-offset-1",
            D ? "tw:border-border tw:bg-accent/50" : "tw:border-transparent tw:hover:bg-accent/30",
            it ? "tw:cursor-not-allowed tw:opacity-60" : "tw:cursor-pointer"
          ),
          children: [
            /* @__PURE__ */ p("div", { className: "tw:flex tw:items-center tw:gap-2", children: [
              /* @__PURE__ */ a(
                ra,
                {
                  id: G,
                  value: C.value,
                  "aria-label": C.label,
                  disabled: it,
                  "aria-describedby": it ? d : void 0
                }
              ),
              /* @__PURE__ */ a("span", { "aria-hidden": !0, className: "tw:font-medium", children: C.label })
            ] }),
            it && // aria-describedby links the option to this visually-hidden notice so assistive tech
            // announces why the choice is read-only.
            /* @__PURE__ */ a("span", { id: d, className: "tw:sr-only", children: T }),
            /* @__PURE__ */ a(ea, { html: C.html })
          ]
        },
        C.value
      )
    );
  }, "renderOptionCard");
  return (
    // Contain every click inside the card (selecting an option, pressing Save) so it never bubbles
    // up to toggle the enclosing CommentThread open/closed. The thread toggles on click only, so a
    // single onClick guard at the root is enough; this container is not itself an interactive control
    // and needs no keyboard handler (the thread has no keyboard toggle to intercept).
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
    /* @__PURE__ */ p("div", { className: "tw:flex tw:flex-col tw:gap-3 tw:text-sm", onClick: /* @__PURE__ */ n((C) => C.stopPropagation(), "onClick"), children: [
      /* @__PURE__ */ a("p", { children: e["%conflict_note_description_verseText%"] ?? "Conflicting changes were made to the verse text." }),
      u && /* @__PURE__ */ p("div", { className: "tw:flex tw:flex-col tw:gap-2", "data-slot": "conflict-loading", children: [
        /* @__PURE__ */ a(sr, { className: "tw:h-8 tw:w-full" }),
        /* @__PURE__ */ a(sr, { className: "tw:h-8 tw:w-full" }),
        /* @__PURE__ */ a(sr, { className: "tw:h-8 tw:w-24" })
      ] }),
      !u && g && tt(),
      !u && !g && /* @__PURE__ */ p(dt, { children: [
        /* @__PURE__ */ a("p", { children: e["%conflict_note_choose_prompt%"] ?? "Select which change to keep:" }),
        /* @__PURE__ */ a(
          ho,
          {
            value: m,
            onValueChange: E,
            disabled: s,
            "aria-label": e["%conflict_note_choose_aria_label%"] ?? "Choose resolution",
            children: S.map((C) => $(C) ? /* @__PURE__ */ a(Mt, { delayDuration: 0, children: /* @__PURE__ */ p(Ot, { children: [
              /* @__PURE__ */ a(It, { asChild: !0, children: et(C) }),
              /* @__PURE__ */ a($t, { children: T })
            ] }) }, C.value) : et(C))
          }
        ),
        /* @__PURE__ */ a(Mt, { delayDuration: 0, children: /* @__PURE__ */ p(Ot, { children: [
          /* @__PURE__ */ a(It, { asChild: !0, children: /* @__PURE__ */ a("span", { className: "tw:inline-flex tw:self-start", children: /* @__PURE__ */ a(
            J,
            {
              size: "sm",
              disabled: V,
              onClick: /* @__PURE__ */ n(() => i == null ? void 0 : i(m), "onClick"),
              children: e["%conflict_note_save_and_resolve%"] ?? "Save and resolve"
            }
          ) }) }),
          M && /* @__PURE__ */ a($t, { children: M })
        ] }) })
      ] })
    ] })
  );
}
n(mw, "ConflictNoteCard");
const vw = {
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
function bw({
  comment: t,
  localizedStrings: e,
  resolvedResolution: r
}) {
  const o = L(
    () => ta(t.rejectedText ?? ""),
    [t.rejectedText]
  );
  if (r) {
    const { key: s, fallback: c } = vw[r];
    return /* @__PURE__ */ a("p", { className: "tw:text-sm tw:font-normal tw:text-muted-foreground", children: e[s] ?? c });
  }
  const i = e["%conflict_note_summary_unresolved%"] ?? "Conflicting edits. Choose which change to keep.";
  return /* @__PURE__ */ p("div", { className: "tw:flex tw:flex-col tw:gap-1", children: [
    /* @__PURE__ */ a("p", { className: "tw:text-sm tw:font-normal tw:text-muted-foreground", children: i }),
    o ? /* @__PURE__ */ a(ea, { html: o }) : void 0
  ] });
}
n(bw, "ConflictThreadSummary");
function xw(t) {
  return t === "reject" ? "reject" : t === "merge" ? "merged" : "accept";
}
n(xw, "resolutionToOutcome");
function yw({
  threadId: t,
  threadStatus: e,
  isSelected: r,
  activeComments: o,
  conflictResolution: i
}) {
  const [s, c] = N("loading"), [l, d] = N(!1), [w, u] = N(), h = i == null ? void 0 : i.getOptions, g = i == null ? void 0 : i.resolve;
  Y(() => {
    let k = !0;
    if (!r) {
      c("loading");
      return;
    }
    return (/* @__PURE__ */ n(async () => {
      let T;
      try {
        T = h ? await h(t) : "none";
      } catch {
        T = "none";
      }
      k && (c(T), T !== "none" && u(void 0));
    }, "check"))(), () => {
      k = !1;
    };
  }, [r, t, e, h]);
  const f = q(!1), m = B(
    async (k) => {
      if (!(!g || f.current)) {
        f.current = !0, d(!0);
        try {
          await g(t, k) && (u(xw(k)), c("none"));
        } catch {
        } finally {
          f.current = !1, d(!1);
        }
      }
    },
    [g, t]
  ), b = L(() => {
    if (e === "Resolved") {
      for (let k = o.length - 1; k >= 0; k -= 1)
        if (o[k].status === "Resolved")
          return Ui(o[k].conflictResolutionAction);
      return "accept";
    }
  }, [e, o]) ?? w;
  return { conflictOptions: s, isResolving: l, resolve: m, resolvedResolution: b, showResolveCheck: s !== "loading" && s !== "none" };
}
n(yw, "useConflictResolution");
function kw(t) {
  const {
    comments: e,
    localizedStrings: r,
    isSelected: o = !1,
    threadId: i,
    threadStatus: s,
    conflictResolution: c
  } = t, l = L(() => e.filter((z) => !z.deleted), [e]), d = L(
    () => l.find((z) => z.conflictType) ?? l[0],
    [l]
  ), { conflictOptions: w, isResolving: u, resolve: h, resolvedResolution: g, showResolveCheck: f } = yw({
    threadId: i,
    threadStatus: s,
    isSelected: o,
    activeComments: l,
    conflictResolution: c
  }), m = Fi(d);
  let y;
  m && d && (y = o ? /* @__PURE__ */ a(
    mw,
    {
      comment: d,
      localizedStrings: r,
      availableActions: w,
      resolvedResolution: g,
      onResolve: h,
      isResolving: u
    }
  ) : /* @__PURE__ */ a(
    bw,
    {
      comment: d,
      localizedStrings: r,
      resolvedResolution: g
    }
  ));
  let b;
  return m && (b = /* @__PURE__ */ a(
    Ki,
    {
      show: f,
      disabled: u,
      onClick: /* @__PURE__ */ n(() => h("accept"), "onClick"),
      ariaLabel: r["%comment_aria_resolve_thread%"] ?? "Resolve thread"
    }
  )), /* @__PURE__ */ a(
    qi,
    {
      ...t,
      activeComments: l,
      rootContentSlot: y,
      resolveActionSlot: b,
      spaceRootContentFromReplies: m && o
    }
  );
}
n(kw, "ConflictThread");
function Kp({
  className: t = "",
  classNameForVerseText: e,
  threads: r,
  currentUser: o,
  localizedStrings: i,
  handleAddCommentToThread: s,
  handleUpdateComment: c,
  handleDeleteComment: l,
  handleReadStatusChange: d,
  assignableUsers: w,
  canUserAddCommentToThread: u,
  canUserAssignThreadCallback: h,
  canUserResolveThreadCallback: g,
  canUserEditOrDeleteCommentCallback: f,
  selectedThreadId: m,
  onSelectedThreadChange: y,
  onVerseRefClick: b,
  conflictResolution: z
}) {
  const [k, E] = N(/* @__PURE__ */ new Set()), [T, P] = N(), [S, U] = N(), V = B(
    async (D) => {
      const G = await s(D);
      return G !== void 0 && D.assignedUser !== void 0 && D.assignedUser !== "" && U(D.assignedUser), G;
    },
    [s]
  );
  Y(() => {
    m && (E((D) => new Set(D).add(m)), P(m));
  }, [m]);
  const M = r.filter(
    (D) => D.comments.some((G) => !G.deleted)
  ), K = M.map((D) => ({ id: D.id })), X = B(
    (D) => {
      E((G) => new Set(G).add(D.id)), P(D.id), y == null || y(D.id);
    },
    [y]
  ), H = B(
    (D) => {
      const G = k.has(D);
      E((it) => {
        const ot = new Set(it);
        return ot.has(D) ? ot.delete(D) : ot.add(D), ot;
      }), P(D), y == null || y(G ? void 0 : D);
    },
    [k, y]
  ), { listboxRef: tt, activeId: $, handleKeyDown: et } = ls({
    options: K,
    onOptionSelect: X
  }), C = B(
    (D) => {
      D.key === "Escape" ? (T && k.has(T) && (E((G) => {
        const it = new Set(G);
        return it.delete(T), it;
      }), P(void 0), y == null || y(void 0)), D.preventDefault(), D.stopPropagation()) : et(D);
    },
    [T, k, et, y]
  );
  return /* @__PURE__ */ a(
    "div",
    {
      id: dw,
      role: "listbox",
      tabIndex: 0,
      ref: tt,
      "aria-activedescendant": $ ?? void 0,
      "aria-label": "Comments",
      className: v(
        "tw:flex tw:w-full tw:flex-col tw:space-y-3 tw:outline-hidden tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-1 tw:focus:ring-offset-background",
        t
      ),
      onKeyDown: C,
      children: M.map((D) => {
        const G = {
          classNameForVerseText: e,
          comments: D.comments,
          localizedStrings: i,
          verseRef: D.verseRef,
          handleSelectThread: H,
          threadId: D.id,
          thread: D,
          isRead: D.isRead,
          isSelected: k.has(D.id),
          currentUser: o,
          assignedUser: D.assignedUser,
          threadStatus: D.status,
          handleAddCommentToThread: V,
          handleUpdateComment: c,
          handleDeleteComment: l,
          handleReadStatusChange: d,
          assignableUsers: w,
          canUserAddCommentToThread: u,
          canUserAssignThreadCallback: h,
          canUserResolveThreadCallback: g,
          canUserEditOrDeleteCommentCallback: f,
          onVerseRefClick: b,
          initialAssignedUser: S
        };
        return /* @__PURE__ */ a(
          "div",
          {
            className: v({
              "tw:opacity-60": D.status === "Resolved"
            }),
            children: D.type === "Conflict" ? /* @__PURE__ */ a(kw, { ...G, conflictResolution: z }) : /* @__PURE__ */ a(qi, { ...G })
          },
          D.id
        );
      })
    }
  );
}
n(Kp, "CommentList");
function _w({ table: t }) {
  return /* @__PURE__ */ p(Be, { children: [
    /* @__PURE__ */ a(Fe, { asChild: !0, children: /* @__PURE__ */ p(J, { variant: "outline", size: "sm", className: "tw:ml-auto tw:hidden tw:h-8 tw:lg:flex", children: [
      /* @__PURE__ */ a(Ls, { className: "tw:mr-2 tw:h-4 tw:w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ p(Ue, { align: "end", className: "tw:w-[150px]", children: [
      /* @__PURE__ */ a(Dr, { children: "Toggle columns" }),
      /* @__PURE__ */ a(Qe, {}),
      t.getAllColumns().filter((e) => e.getCanHide()).map((e) => /* @__PURE__ */ a(
        Ie,
        {
          className: "tw:capitalize",
          checked: e.getIsVisible(),
          onCheckedChange: /* @__PURE__ */ n((r) => e.toggleVisibility(!!r), "onCheckedChange"),
          children: e.id
        },
        e.id
      ))
    ] })
  ] });
}
n(_w, "DataTableViewOptions");
function ur({ ...t }) {
  return /* @__PURE__ */ a(Jt.Root, { "data-slot": "select", ...t });
}
n(ur, "Select");
function Nw({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    Jt.Group,
    {
      "data-slot": "select-group",
      className: v("tw:scroll-my-1 tw:p-1", t),
      ...e
    }
  );
}
n(Nw, "SelectGroup");
function pr({ ...t }) {
  return /* @__PURE__ */ a(Jt.Value, { "data-slot": "select-value", ...t });
}
n(pr, "SelectValue");
function hr({ className: t, size: e = "default", children: r, ...o }) {
  const i = ke();
  return /* @__PURE__ */ p(
    Jt.Trigger,
    {
      "data-slot": "select-trigger",
      "data-size": e,
      className: v(
        "pr-twp tw:flex tw:w-fit tw:items-center tw:gap-2 tw:rounded-lg tw:border tw:border-input tw:bg-transparent tw:py-2 tw:pe-2 tw:ps-2.5 tw:text-sm tw:whitespace-nowrap tw:transition-colors tw:outline-none tw:select-none tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:data-placeholder:text-muted-foreground tw:data-[size=default]:h-8 tw:data-[size=sm]:h-7 tw:data-[size=sm]:rounded-[min(var(--tw-radius-md),10px)] tw:*:data-[slot=select-value]:line-clamp-1 tw:*:data-[slot=select-value]:flex tw:*:data-[slot=select-value]:flex-1 tw:*:data-[slot=select-value]:items-center tw:*:data-[slot=select-value]:gap-1.5 tw:*:data-[slot=select-value]:text-start tw:dark:bg-input/30 tw:dark:hover:bg-input/50 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      dir: i,
      ...o,
      children: [
        r,
        /* @__PURE__ */ a(Jt.Icon, { asChild: !0, children: /* @__PURE__ */ a(Qn, { className: "tw:pointer-events-none tw:size-4 tw:text-muted-foreground" }) })
      ]
    }
  );
}
n(hr, "SelectTrigger");
function gr({
  className: t,
  children: e,
  // CUSTOM: Restored 'popper' as the default position (was changed to 'item-aligned' by the shadcn
  // upgrade). In 'popper' mode Radix exposes --radix-select-trigger-width, which is required for
  // min-w-(--radix-select-trigger-width) to work. In 'item-aligned' mode that variable is not set,
  // making the popup width unconstrained. Existing callers all expected popper (dropdown) behavior.
  position: r = "popper",
  align: o = "center",
  // CUSTOM: Destructure style to merge with the shared z-index constant below
  style: i,
  ...s
}) {
  const c = ke();
  return /* @__PURE__ */ a(Jt.Portal, { children: /* @__PURE__ */ p(
    Jt.Content,
    {
      "data-slot": "select-content",
      "data-align-trigger": r === "item-aligned",
      className: v(
        "pr-twp tw:relative tw:max-h-(--radix-select-content-available-height) tw:data-[align-trigger=true]:min-w-(--radix-select-trigger-width) tw:data-[align-trigger=false]:min-w-36 tw:origin-(--radix-select-content-transform-origin) tw:overflow-x-hidden tw:overflow-y-auto tw:rounded-lg tw:bg-popover tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:data-[align-trigger=true]:animate-none tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95 tw:animate-none! tw:bg-popover/70 tw:before:-z-1 tw:**:data-[slot$=-item]:focus:bg-foreground/10 tw:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 tw:**:data-[slot$=-separator]:bg-foreground/5 tw:**:data-[slot$=-trigger]:focus:bg-foreground/10 tw:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! tw:**:data-[variant=destructive]:focus:bg-foreground/10! tw:**:data-[variant=destructive]:text-accent-foreground! tw:**:data-[variant=destructive]:**:text-accent-foreground! tw:relative tw:before:pointer-events-none tw:before:absolute tw:before:inset-0 tw:before:rounded-[inherit] tw:before:backdrop-blur-2xl tw:before:backdrop-saturate-150",
        r === "popper" && "tw:data-[side=bottom]:translate-y-1 tw:data-[side=left]:-translate-x-1 tw:rtl:data-[side=left]:translate-x-1 tw:data-[side=right]:translate-x-1 tw:rtl:data-[side=right]:-translate-x-1 tw:data-[side=top]:-translate-y-1",
        t
      ),
      style: { zIndex: er, ...i },
      position: r,
      align: o,
      ...s,
      children: [
        /* @__PURE__ */ a(Cw, {}),
        /* @__PURE__ */ a(
          Jt.Viewport,
          {
            "data-position": r,
            className: v(
              "tw:data-[position=popper]:h-(--radix-select-trigger-height) tw:data-[position=popper]:w-full tw:data-[position=popper]:min-w-(--radix-select-trigger-width)",
              r === "popper" && "tw:"
            ),
            children: /* @__PURE__ */ a("div", { dir: c, children: e })
          }
        ),
        /* @__PURE__ */ a(Ew, {})
      ]
    }
  ) });
}
n(gr, "SelectContent");
function qp({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    Jt.Label,
    {
      "data-slot": "select-label",
      className: v("pr-twp tw:px-1.5 tw:py-1 tw:text-xs tw:text-muted-foreground", t),
      ...e
    }
  );
}
n(qp, "SelectLabel");
function de({
  className: t,
  children: e,
  ...r
}) {
  return /* @__PURE__ */ p(
    Jt.Item,
    {
      "data-slot": "select-item",
      className: v(
        "pr-twp tw:relative tw:flex tw:w-full tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:*:[span]:last:flex tw:*:[span]:last:items-center tw:*:[span]:last:gap-2",
        t
      ),
      ...r,
      children: [
        /* @__PURE__ */ a("span", { className: "tw:pointer-events-none tw:absolute tw:end-2 tw:flex tw:size-4 tw:items-center tw:justify-center", children: /* @__PURE__ */ a(Jt.ItemIndicator, { children: /* @__PURE__ */ a(va, { className: "tw:pointer-events-none" }) }) }),
        /* @__PURE__ */ a(Jt.ItemText, { children: e })
      ]
    }
  );
}
n(de, "SelectItem");
function Hp({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    Jt.Separator,
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
n(Hp, "SelectSeparator");
function Cw({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    Jt.ScrollUpButton,
    {
      "data-slot": "select-scroll-up-button",
      className: v(
        "pr-twp tw:z-10 tw:flex tw:cursor-default tw:items-center tw:justify-center tw:bg-popover tw:py-1 tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      ...e,
      children: /* @__PURE__ */ a(_c, {})
    }
  );
}
n(Cw, "SelectScrollUpButton");
function Ew({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    Jt.ScrollDownButton,
    {
      "data-slot": "select-scroll-down-button",
      className: v(
        "pr-twp tw:z-10 tw:flex tw:cursor-default tw:items-center tw:justify-center tw:bg-popover tw:py-1 tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      ...e,
      children: /* @__PURE__ */ a(kc, {})
    }
  );
}
n(Ew, "SelectScrollDownButton");
function Tw({ table: t }) {
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
        ur,
        {
          value: `${t.getState().pagination.pageSize}`,
          onValueChange: /* @__PURE__ */ n((e) => {
            t.setPageSize(Number(e));
          }, "onValueChange"),
          children: [
            /* @__PURE__ */ a(hr, { className: "tw:h-8 tw:w-[70px]", children: /* @__PURE__ */ a(pr, { placeholder: t.getState().pagination.pageSize }) }),
            /* @__PURE__ */ a(gr, { side: "top", children: [10, 20, 30, 40, 50].map((e) => /* @__PURE__ */ a(de, { value: `${e}`, children: e }, e)) })
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
          onClick: /* @__PURE__ */ n(() => t.setPageIndex(0), "onClick"),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ a("span", { className: "tw:sr-only", children: "Go to first page" }),
            /* @__PURE__ */ a(js, { className: "tw:h-4 tw:w-4" })
          ]
        }
      ),
      /* @__PURE__ */ p(
        J,
        {
          variant: "outline",
          size: "icon",
          className: "tw:h-8 tw:w-8 tw:p-0",
          onClick: /* @__PURE__ */ n(() => t.previousPage(), "onClick"),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ a("span", { className: "tw:sr-only", children: "Go to previous page" }),
            /* @__PURE__ */ a(Bs, { className: "tw:h-4 tw:w-4" })
          ]
        }
      ),
      /* @__PURE__ */ p(
        J,
        {
          variant: "outline",
          size: "icon",
          className: "tw:h-8 tw:w-8 tw:p-0",
          onClick: /* @__PURE__ */ n(() => t.nextPage(), "onClick"),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ a("span", { className: "tw:sr-only", children: "Go to next page" }),
            /* @__PURE__ */ a(Fs, { className: "tw:h-4 tw:w-4" })
          ]
        }
      ),
      /* @__PURE__ */ p(
        J,
        {
          variant: "outline",
          size: "icon",
          className: "tw:hidden tw:h-8 tw:w-8 tw:p-0 tw:lg:flex",
          onClick: /* @__PURE__ */ n(() => t.setPageIndex(t.getPageCount() - 1), "onClick"),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ a("span", { className: "tw:sr-only", children: "Go to last page" }),
            /* @__PURE__ */ a(Us, { className: "tw:h-4 tw:w-4" })
          ]
        }
      )
    ] })
  ] }) });
}
n(Tw, "DataTablePagination");
function Sw({
  columns: t,
  data: e,
  enablePagination: r = !1,
  showPaginationControls: o = !1,
  showColumnVisibilityControls: i = !1,
  stickyHeader: s = !1,
  onRowClickHandler: c = /* @__PURE__ */ n(() => {
  }, "onRowClickHandler"),
  id: l,
  isLoading: d = !1,
  noResultsMessage: w
}) {
  var S;
  const [u, h] = N([]), [g, f] = N([]), [m, y] = N({}), [b, z] = N({}), k = L(() => e ?? [], [e]), E = pi({
    data: k,
    columns: t,
    getCoreRowModel: gi(),
    ...r && { getPaginationRowModel: Tl() },
    onSortingChange: h,
    getSortedRowModel: hi(),
    onColumnFiltersChange: f,
    getFilteredRowModel: El(),
    onColumnVisibilityChange: y,
    onRowSelectionChange: z,
    state: {
      sorting: u,
      columnFilters: g,
      columnVisibility: m,
      rowSelection: b
    }
  }), T = E.getVisibleFlatColumns();
  let P;
  return d ? P = Array.from({ length: 10 }).map((M, K) => `skeleton-row-${K}`).map((M) => /* @__PURE__ */ a(Me, { className: "tw:hover:bg-transparent", children: /* @__PURE__ */ a(cr, { colSpan: T.length ?? t.length, className: "tw:border-0 tw:p-0", children: /* @__PURE__ */ a("div", { className: "tw:w-full tw:py-2", children: /* @__PURE__ */ a(sr, { className: "tw:h-14 tw:w-full tw:rounded-md" }) }) }) }, M)) : ((S = E.getRowModel().rows) == null ? void 0 : S.length) > 0 ? P = E.getRowModel().rows.map((U) => /* @__PURE__ */ a(
    Me,
    {
      onClick: /* @__PURE__ */ n(() => c(U, E), "onClick"),
      "data-state": U.getIsSelected() && "selected",
      children: U.getVisibleCells().map((V) => /* @__PURE__ */ a(cr, { children: Cr(V.column.columnDef.cell, V.getContext()) }, V.id))
    },
    U.id
  )) : P = /* @__PURE__ */ a(Me, { children: /* @__PURE__ */ a(cr, { colSpan: t.length, className: "tw:h-24 tw:text-center", children: w }) }), /* @__PURE__ */ p("div", { className: "pr-twp", id: l, children: [
    i && /* @__PURE__ */ a(_w, { table: E }),
    /* @__PURE__ */ p(mo, { stickyHeader: s, children: [
      /* @__PURE__ */ a(vo, { stickyHeader: s, children: E.getHeaderGroups().map((U) => /* @__PURE__ */ a(Me, { children: U.headers.map((V) => /* @__PURE__ */ a(aa, { className: "tw:p-0", children: V.isPlaceholder ? void 0 : Cr(V.column.columnDef.header, V.getContext()) }, V.id)) }, U.id)) }),
      /* @__PURE__ */ a(bo, { children: P })
    ] }),
    r && /* @__PURE__ */ p("div", { className: "tw:flex tw:items-center tw:justify-end tw:space-x-2 tw:py-4", children: [
      /* @__PURE__ */ a(
        J,
        {
          variant: "outline",
          size: "sm",
          onClick: /* @__PURE__ */ n(() => E.previousPage(), "onClick"),
          disabled: !E.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ a(
        J,
        {
          variant: "outline",
          size: "sm",
          onClick: /* @__PURE__ */ n(() => E.nextPage(), "onClick"),
          disabled: !E.getCanNextPage(),
          children: "Next"
        }
      )
    ] }),
    r && o && /* @__PURE__ */ a(Tw, { table: E })
  ] });
}
n(Sw, "DataTable");
function Gp({
  id: t,
  markdown: e,
  className: r,
  anchorTarget: o,
  truncate: i
}) {
  const s = L(
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
          "tw:line-clamp-3 tw:max-h-10 tw:overflow-hidden tw:text-ellipsis tw:break-words": i
        },
        r
      ),
      children: /* @__PURE__ */ a(zl, { options: s, children: e })
    }
  );
}
n(Gp, "MarkdownRenderer");
const Rw = Object.freeze([
  "%webView_error_dump_header%",
  "%webView_error_dump_info_message%"
]), Sn = /* @__PURE__ */ n((t, e) => t[e] ?? e, "localizeString$4");
function zw({
  errorDetails: t,
  handleCopyNotify: e,
  localizedStrings: r,
  id: o
}) {
  const i = Sn(r, "%webView_error_dump_header%"), s = Sn(r, "%webView_error_dump_info_message%");
  function c() {
    navigator.clipboard.writeText(t), e && e();
  }
  return n(c, "handleCopy"), /* @__PURE__ */ p(
    "div",
    {
      id: o,
      className: "tw:inline-flex tw:w-full tw:flex-col tw:items-start tw:justify-start tw:gap-4",
      children: [
        /* @__PURE__ */ p("div", { className: "tw:inline-flex tw:items-start tw:justify-start tw:gap-4 tw:self-stretch", children: [
          /* @__PURE__ */ p("div", { className: "tw:inline-flex tw:flex-1 tw:flex-col tw:items-start tw:justify-start", children: [
            /* @__PURE__ */ a("div", { className: "tw:text-color-text tw:justify-center tw:text-center tw:text-lg tw:font-semibold tw:leading-loose", children: i }),
            /* @__PURE__ */ a("div", { className: "tw:justify-center tw:self-stretch tw:text-sm tw:font-normal tw:leading-tight tw:text-muted-foreground", children: s })
          ] }),
          /* @__PURE__ */ a(J, { variant: "secondary", size: "icon", className: "size-8", onClick: /* @__PURE__ */ n(() => c(), "onClick"), children: /* @__PURE__ */ a(Gn, {}) })
        ] }),
        /* @__PURE__ */ a("div", { className: "tw:prose tw:w-full", children: /* @__PURE__ */ a("pre", { className: "tw:text-xs", children: t }) })
      ]
    }
  );
}
n(zw, "ErrorDump");
const Wp = Object.freeze([
  ...Rw,
  "%webView_error_dump_copied_message%"
]);
function Yp({
  errorDetails: t,
  handleCopyNotify: e,
  localizedStrings: r,
  children: o,
  className: i,
  id: s
}) {
  const [c, l] = N(!1), d = /* @__PURE__ */ n(() => {
    l(!0), e && e();
  }, "handleCopyWithNotification");
  return /* @__PURE__ */ p(Ae, { onOpenChange: /* @__PURE__ */ n((u) => {
    u || l(!1);
  }, "handleOpenChange"), children: [
    /* @__PURE__ */ a(tr, { asChild: !0, children: o }),
    /* @__PURE__ */ p(Ve, { id: s, className: v("tw:min-w-80 tw:max-w-96", i), children: [
      c && r["%webView_error_dump_copied_message%"] && /* @__PURE__ */ a(Tt, { children: r["%webView_error_dump_copied_message%"] }),
      /* @__PURE__ */ a(
        zw,
        {
          errorDetails: t,
          handleCopyNotify: d,
          localizedStrings: r
        }
      )
    ] })
  ] });
}
n(Yp, "ErrorPopover");
var Dw = /* @__PURE__ */ ((t) => (t[t.Check = 0] = "Check", t[t.Radio = 1] = "Radio", t))(Dw || {});
function Xp({ id: t, label: e, groups: r }) {
  const [o, i] = N(
    Object.fromEntries(
      r.map(
        (w, u) => w.itemType === 0 ? [u, []] : void 0
      ).filter((w) => !!w)
    )
  ), [s, c] = N({}), l = /* @__PURE__ */ n((w, u) => {
    const h = !o[w][u];
    i((f) => (f[w][u] = h, { ...f }));
    const g = r[w].items[u];
    g.onUpdate(g.id, h);
  }, "handleCheckboxUpdate"), d = /* @__PURE__ */ n((w, u) => {
    c((g) => (g[w] = u, { ...g }));
    const h = r[w].items.find((g) => g.id === u);
    h ? h.onUpdate(u) : console.error(`Could not find dropdown radio item with id '${u}'!`);
  }, "handleRadioUpdate");
  return /* @__PURE__ */ a("div", { id: t, children: /* @__PURE__ */ p(Be, { children: [
    /* @__PURE__ */ a(Fe, { asChild: !0, children: /* @__PURE__ */ p(J, { variant: "default", children: [
      /* @__PURE__ */ a(Ks, { size: 16, className: "tw:mr-2 tw:h-4 tw:w-4" }),
      e,
      /* @__PURE__ */ a(dr, { size: 16, className: "tw:ml-2 tw:h-4 tw:w-4" })
    ] }) }),
    /* @__PURE__ */ a(Ue, { children: r.map((w, u) => /* @__PURE__ */ p("div", { children: [
      /* @__PURE__ */ a(Dr, { children: w.label }),
      /* @__PURE__ */ a(Ln, { children: w.itemType === 0 ? /* @__PURE__ */ a(dt, { children: w.items.map((h, g) => /* @__PURE__ */ a("div", { children: /* @__PURE__ */ a(
        Ie,
        {
          checked: o[u][g],
          onCheckedChange: /* @__PURE__ */ n(() => l(u, g), "onCheckedChange"),
          children: h.label
        }
      ) }, h.id)) }) : /* @__PURE__ */ a(
        ds,
        {
          value: s[u],
          onValueChange: /* @__PURE__ */ n((h) => d(u, h), "onValueChange"),
          children: w.items.map((h) => /* @__PURE__ */ a("div", { children: /* @__PURE__ */ a(ws, { value: h.id, children: h.label }) }, h.id))
        }
      ) }),
      /* @__PURE__ */ a(Qe, {})
    ] }, w.label)) })
  ] }) });
}
n(Xp, "FilterDropdown");
function Jp({
  id: t,
  category: e,
  downloads: r,
  languages: o,
  moreInfoUrl: i,
  handleMoreInfoLinkClick: s,
  supportUrl: c,
  handleSupportLinkClick: l
}) {
  const d = new Jn("en", {
    notation: "compact",
    compactDisplay: "short"
  }).format(Object.values(r).reduce((u, h) => u + h, 0)), w = /* @__PURE__ */ n(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, "handleScrollToBottom");
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
            /* @__PURE__ */ a(qs, { className: "tw:h-4 tw:w-4" }),
            /* @__PURE__ */ a("span", { className: "tw:text-xs tw:font-semibold tw:text-foreground", children: d })
          ] }),
          /* @__PURE__ */ a("span", { className: "tw:text-xs tw:text-foreground", children: "USERS" })
        ] }),
        /* @__PURE__ */ p("div", { className: "tw:flex tw:flex-col tw:items-center tw:gap-1 tw:px-4", children: [
          /* @__PURE__ */ a("div", { className: "tw:flex tw:gap-2", children: o.slice(0, 3).map((u) => /* @__PURE__ */ a("span", { className: "tw:text-xs tw:font-semibold tw:text-foreground", children: u.toUpperCase() }, u)) }),
          o.length > 3 && /* @__PURE__ */ p(
            "button",
            {
              type: "button",
              onClick: /* @__PURE__ */ n(() => w(), "onClick"),
              className: "tw:text-xs tw:text-foreground tw:underline",
              children: [
                "+",
                o.length - 3,
                " more languages"
              ]
            }
          )
        ] }),
        (i || c) && /* @__PURE__ */ p("div", { className: "tw:flex tw:flex-col tw:gap-1 tw:px-4", children: [
          i && /* @__PURE__ */ a("div", { className: "tw:flex tw:gap-1", children: /* @__PURE__ */ p(
            J,
            {
              onClick: /* @__PURE__ */ n(() => s(), "onClick"),
              variant: "link",
              className: "tw:flex tw:h-auto tw:gap-1 tw:py-0 tw:text-xs tw:font-semibold tw:text-foreground",
              children: [
                "Website",
                /* @__PURE__ */ a(Hs, { className: "tw:h-4 tw:w-4" })
              ]
            }
          ) }),
          c && /* @__PURE__ */ a("div", { className: "tw:flex tw:gap-1", children: /* @__PURE__ */ p(
            J,
            {
              onClick: /* @__PURE__ */ n(() => l(), "onClick"),
              variant: "link",
              className: "tw:flex tw:h-auto tw:gap-1 tw:py-0 tw:text-xs tw:font-semibold tw:text-foreground",
              children: [
                "Support",
                /* @__PURE__ */ a(Gs, { className: "tw:h-4 tw:w-4" })
              ]
            }
          ) })
        ] })
      ]
    }
  );
}
n(Jp, "MoreInfo");
function Mw({ id: t, versionHistory: e }) {
  const [r, o] = N(!1), i = /* @__PURE__ */ new Date();
  function s(l) {
    const d = new Date(l), w = new Date(i.getTime() - d.getTime()), u = w.getUTCFullYear() - 1970, h = w.getUTCMonth(), g = w.getUTCDate() - 1;
    let f = "";
    return u > 0 ? f = `${u.toString()} year${u === 1 ? "" : "s"} ago` : h > 0 ? f = `${h.toString()} month${h === 1 ? "" : "s"} ago` : g === 0 ? f = "today" : f = `${g.toString()} day${g === 1 ? "" : "s"} ago`, f;
  }
  n(s, "formatTimeString");
  const c = Object.entries(e).sort((l, d) => d[0].localeCompare(l[0]));
  return /* @__PURE__ */ p("div", { className: "pr-twp", id: t, children: [
    /* @__PURE__ */ a("h3", { className: "tw:text-md tw:font-semibold", children: "What`s New" }),
    /* @__PURE__ */ a("ul", { className: "tw:list-disc tw:pl-5 tw:pr-4 tw:text-xs tw:text-foreground", children: (r ? c : c.slice(0, 5)).map((l) => /* @__PURE__ */ p("div", { className: "tw:mt-3 tw:flex tw:justify-between", children: [
      /* @__PURE__ */ a("div", { className: "tw:text-foreground", children: /* @__PURE__ */ a("li", { className: "tw:prose tw:text-xs", children: /* @__PURE__ */ a("span", { children: l[1].description }) }) }),
      /* @__PURE__ */ p("div", { className: "tw:justify-end tw:text-right", children: [
        /* @__PURE__ */ p("div", { children: [
          "Version ",
          l[0]
        ] }),
        /* @__PURE__ */ a("div", { children: s(l[1].date) })
      ] })
    ] }, l[0])) }),
    c.length > 5 && /* @__PURE__ */ a(
      "button",
      {
        type: "button",
        onClick: /* @__PURE__ */ n(() => o(!r), "onClick"),
        className: "tw:text-xs tw:text-foreground tw:underline",
        children: r ? "Show Less Version History" : "Show All Version History"
      }
    )
  ] });
}
n(Mw, "VersionHistory");
function Zp({
  id: t,
  publisherDisplayName: e,
  fileSize: r,
  locales: o,
  versionHistory: i,
  currentVersion: s
}) {
  const c = L(() => dc(r), [r]), d = (/* @__PURE__ */ n((w) => {
    const u = new Intl.DisplayNames(wc(), { type: "language" });
    return w.map((h) => u.of(h));
  }, "getLanguageNames"))(o);
  return /* @__PURE__ */ a("div", { id: t, className: "pr-twp tw:border-t tw:py-2", children: /* @__PURE__ */ p("div", { className: "tw:flex tw:flex-col tw:gap-2 tw:divide-y", children: [
    Object.entries(i).length > 0 && /* @__PURE__ */ a(Mw, { versionHistory: i }),
    /* @__PURE__ */ p("div", { className: "tw:flex tw:flex-col tw:gap-2 tw:py-2", children: [
      /* @__PURE__ */ a("h2", { className: "tw:text-md tw:font-semibold", children: "Information" }),
      /* @__PURE__ */ p("div", { className: "tw:flex tw:items-start tw:justify-between tw:text-xs tw:text-foreground", children: [
        /* @__PURE__ */ p("p", { className: "tw:flex tw:flex-col tw:justify-start tw:gap-1", children: [
          /* @__PURE__ */ a("span", { children: "Publisher" }),
          /* @__PURE__ */ a("span", { className: "tw:font-semibold", children: e }),
          /* @__PURE__ */ a("span", { children: "Size" }),
          /* @__PURE__ */ a("span", { className: "tw:font-semibold", children: c })
        ] }),
        /* @__PURE__ */ a("div", { className: "tw:flex tw:w-3/4 tw:items-center tw:justify-between tw:text-xs tw:text-foreground", children: /* @__PURE__ */ p("p", { className: "tw:flex tw:flex-col tw:justify-start tw:gap-1", children: [
          /* @__PURE__ */ a("span", { children: "Version" }),
          /* @__PURE__ */ a("span", { className: "tw:font-semibold", children: s }),
          /* @__PURE__ */ a("span", { children: "Languages" }),
          /* @__PURE__ */ a("span", { className: "tw:font-semibold", children: d.join(", ") })
        ] }) })
      ] })
    ] })
  ] }) });
}
n(Zp, "Footer");
function Qp({
  entries: t,
  selected: e,
  onChange: r,
  placeholder: o,
  commandEmptyMessage: i,
  customSelectedText: s,
  isDisabled: c,
  sortSelected: l,
  icon: d,
  className: w,
  badgesPlaceholder: u,
  id: h
}) {
  return /* @__PURE__ */ p("div", { id: h, className: "tw:flex tw:items-center tw:gap-2", children: [
    /* @__PURE__ */ a(
      us,
      {
        entries: t,
        selected: e,
        onChange: r,
        placeholder: o,
        commandEmptyMessage: i,
        customSelectedText: s,
        isDisabled: c,
        sortSelected: l,
        icon: d,
        className: w
      }
    ),
    e.length > 0 ? /* @__PURE__ */ a("div", { className: "tw:flex tw:flex-wrap tw:items-center tw:gap-2", children: e.map((g) => {
      var f;
      return /* @__PURE__ */ p(Tr, { variant: "muted", className: "tw:flex tw:items-center tw:gap-1", children: [
        /* @__PURE__ */ a(
          J,
          {
            variant: "ghost",
            size: "icon",
            className: "tw:h-4 tw:w-4 tw:p-0 tw:hover:bg-transparent",
            onClick: /* @__PURE__ */ n(() => r(e.filter((m) => m !== g)), "onClick"),
            children: /* @__PURE__ */ a(ko, { className: "tw:h-3 tw:w-3" })
          }
        ),
        (f = t.find((m) => m.value === g)) == null ? void 0 : f.label
      ] }, g);
    }) }) : /* @__PURE__ */ a(Tt, { children: u })
  ] });
}
n(Qp, "Filter");
const Ow = Object.freeze([
  "%undoButton_tooltip%",
  "%redoButton_tooltip%"
]), Rn = /* @__PURE__ */ n((t, e) => t[e] ?? e, "localizeString$3");
function Iw({
  onUndoClick: t,
  onRedoClick: e,
  canUndo: r = !0,
  canRedo: o = !0,
  localizedStrings: i = {},
  showKeyboardShortcuts: s = !0,
  className: c = "tw:h-6 tw:w-6",
  variant: l = "ghost"
}) {
  const d = fo(), w = Rn(i, "%undoButton_tooltip%"), u = Rn(i, "%redoButton_tooltip%");
  return /* @__PURE__ */ p(go, { children: [
    /* @__PURE__ */ a(Mt, { children: /* @__PURE__ */ p(Ot, { children: [
      /* @__PURE__ */ a(It, { asChild: !0, children: /* @__PURE__ */ a(
        J,
        {
          "aria-label": w,
          className: c,
          size: "icon",
          onClick: t,
          disabled: !r,
          variant: l,
          children: /* @__PURE__ */ a(Ws, {})
        }
      ) }),
      /* @__PURE__ */ a($t, { children: /* @__PURE__ */ p("p", { children: [
        w,
        s && /* @__PURE__ */ p(dt, { children: [
          " ",
          /* @__PURE__ */ a(Wa, { children: d ? "⌘Z" : "Ctrl+Z" })
        ] })
      ] }) })
    ] }) }),
    e && (l === "secondary" || l === "default") && /* @__PURE__ */ a(Vn, {}),
    e && /* @__PURE__ */ a(Mt, { children: /* @__PURE__ */ p(Ot, { children: [
      /* @__PURE__ */ a(It, { asChild: !0, children: /* @__PURE__ */ a(
        J,
        {
          "aria-label": u,
          className: c,
          size: "icon",
          onClick: e,
          disabled: !o,
          variant: l,
          children: /* @__PURE__ */ a(Ys, {})
        }
      ) }),
      /* @__PURE__ */ a($t, { children: /* @__PURE__ */ p("p", { children: [
        u,
        s && /* @__PURE__ */ p(dt, { children: [
          " ",
          /* @__PURE__ */ a(Wa, { children: d ? "⌘⇧Z" : "Ctrl+Y" })
        ] })
      ] }) })
    ] }) })
  ] });
}
n(Iw, "UndoRedoButtons");
function $w({
  children: t,
  editorRef: e,
  canUndo: r = !0,
  canRedo: o = !0
}) {
  const i = q(null);
  return Y(() => {
    var d;
    const s = fo(), c = ((d = i.current) == null ? void 0 : d.querySelector(".editor-input")) ?? void 0, l = /* @__PURE__ */ n((w) => {
      var h, g, f, m;
      if (!c || document.activeElement !== c) return;
      const u = w.key.toLowerCase();
      if (s) {
        if (!w.metaKey) return;
        !w.shiftKey && u === "z" ? (w.preventDefault(), r && ((h = e.current) == null || h.undo())) : w.shiftKey && u === "z" && (w.preventDefault(), o && ((g = e.current) == null || g.redo()));
      } else {
        if (!w.ctrlKey) return;
        !w.shiftKey && u === "z" ? (w.preventDefault(), r && ((f = e.current) == null || f.undo())) : (u === "y" || w.shiftKey && u === "z") && (w.preventDefault(), o && ((m = e.current) == null || m.redo()));
      }
    }, "handleKeyDown");
    return document.addEventListener("keydown", l), () => document.removeEventListener("keydown", l);
  }, [o, r, e]), /* @__PURE__ */ a("div", { ref: i, children: t });
}
n($w, "EditorKeyboardShortcuts");
const Pw = /* @__PURE__ */ n((t, e, r) => t === "generated" ? /* @__PURE__ */ p(dt, { children: [
  /* @__PURE__ */ a("p", { children: "+" }),
  " ",
  e["%footnoteEditor_callerDropdown_item_generated%"]
] }) : t === "hidden" ? /* @__PURE__ */ p(dt, { children: [
  /* @__PURE__ */ a("p", { children: "-" }),
  " ",
  e["%footnoteEditor_callerDropdown_item_hidden%"]
] }) : /* @__PURE__ */ p(dt, { children: [
  /* @__PURE__ */ a("p", { children: r }),
  " ",
  e["%footnoteEditor_callerDropdown_item_custom%"]
] }), "renderCallerButtonContent");
function Aw({
  callerType: t,
  customCaller: e,
  updateCaller: r,
  localizedStrings: o
}) {
  const i = q(null), s = q(null), c = q(!1), [l, d] = N(t), [w, u] = N(e), [h, g] = N(!1), f = q(!1), m = q(l);
  m.current = l;
  const y = q(w);
  y.current = w, Y(() => {
    d(t);
  }, [t]), Y(() => {
    w !== e && u(e);
  }, [e]);
  const b = /* @__PURE__ */ n((k) => {
    if (c.current = !1, g(k), !k) {
      const E = m.current, T = y.current;
      E !== "custom" || T ? (E !== t || T !== e) && r(E, T) : (d(t), u(e));
    }
  }, "handleDropdownOpenChange"), z = /* @__PURE__ */ n((k) => {
    var E, T, P, S;
    k.stopPropagation(), document.activeElement === s.current && k.key === "ArrowDown" || k.key === "ArrowRight" ? ((E = i.current) == null || E.focus(), c.current = !0) : document.activeElement === i.current && k.key === "ArrowUp" ? ((T = s.current) == null || T.focus(), c.current = !1) : document.activeElement === i.current && k.key === "ArrowLeft" && ((P = i.current) == null ? void 0 : P.selectionStart) === 0 && ((S = s.current) == null || S.focus(), c.current = !1), l === "custom" && k.key === "Enter" && (document.activeElement === s.current || document.activeElement === i.current) && b(!1);
  }, "handleKeyDown");
  return /* @__PURE__ */ p(Be, { open: h, onOpenChange: b, children: [
    /* @__PURE__ */ a(Mt, { children: /* @__PURE__ */ p(Ot, { children: [
      /* @__PURE__ */ a(It, { asChild: !0, children: /* @__PURE__ */ a(Fe, { asChild: !0, children: /* @__PURE__ */ a(J, { variant: "outline", className: "tw:h-6", children: Pw(t, o, e) }) }) }),
      /* @__PURE__ */ a($t, { children: o["%footnoteEditor_callerDropdown_tooltip%"] })
    ] }) }),
    /* @__PURE__ */ p(
      Ue,
      {
        style: { zIndex: jn },
        onClick: /* @__PURE__ */ n(() => {
          c.current && (c.current = !1);
        }, "onClick"),
        onKeyDown: z,
        onMouseMove: /* @__PURE__ */ n(() => {
          var k;
          c.current && ((k = i.current) == null || k.focus());
        }, "onMouseMove"),
        children: [
          /* @__PURE__ */ a(Dr, { children: o["%footnoteEditor_callerDropdown_label%"] }),
          /* @__PURE__ */ a(Qe, {}),
          /* @__PURE__ */ a(
            Ie,
            {
              checked: l === "generated",
              onCheckedChange: /* @__PURE__ */ n(() => d("generated"), "onCheckedChange"),
              children: /* @__PURE__ */ p("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ a("span", { children: o["%footnoteEditor_callerDropdown_item_generated%"] }),
                /* @__PURE__ */ a("span", { className: "tw:w-10 tw:text-center", children: eo })
              ] })
            }
          ),
          /* @__PURE__ */ a(
            Ie,
            {
              checked: l === "hidden",
              onCheckedChange: /* @__PURE__ */ n(() => d("hidden"), "onCheckedChange"),
              children: /* @__PURE__ */ p("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ a("span", { children: o["%footnoteEditor_callerDropdown_item_hidden%"] }),
                /* @__PURE__ */ a("span", { className: "tw:w-10 tw:text-center", children: ro })
              ] })
            }
          ),
          /* @__PURE__ */ a(
            Ie,
            {
              ref: s,
              checked: l === "custom",
              onCheckedChange: /* @__PURE__ */ n(() => d("custom"), "onCheckedChange"),
              onPointerDown: /* @__PURE__ */ n(() => {
                f.current = l === "custom";
              }, "onPointerDown"),
              onClick: /* @__PURE__ */ n((k) => {
                var E;
                if (k.stopPropagation(), f.current && k.target !== i.current) {
                  b(!1);
                  return;
                }
                c.current = !0, (E = i.current) == null || E.focus();
              }, "onClick"),
              onSelect: /* @__PURE__ */ n((k) => k.preventDefault(), "onSelect"),
              children: /* @__PURE__ */ p("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ a("span", { children: o["%footnoteEditor_callerDropdown_item_custom%"] }),
                /* @__PURE__ */ a(
                  ga,
                  {
                    tabIndex: 0,
                    onMouseDown: /* @__PURE__ */ n((k) => {
                      k.stopPropagation(), d("custom"), c.current = !0;
                    }, "onMouseDown"),
                    ref: i,
                    className: "tw:h-auto tw:w-10 tw:p-0 tw:text-center",
                    value: w,
                    onKeyDown: /* @__PURE__ */ n((k) => {
                      k.key === "Enter" || k.key === "ArrowUp" || k.key === "ArrowDown" || k.key === "ArrowLeft" || k.key === "ArrowRight" || k.stopPropagation();
                    }, "onKeyDown"),
                    maxLength: 1,
                    onChange: /* @__PURE__ */ n((k) => u(k.target.value), "onChange")
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
n(Aw, "FootnoteCallerDropdown");
const Vw = /* @__PURE__ */ n((t, e) => t === "f" ? /* @__PURE__ */ p(dt, { children: [
  /* @__PURE__ */ a(Yn, {}),
  " ",
  e["%footnoteEditor_noteType_footnote_label%"]
] }) : t === "fe" ? /* @__PURE__ */ p(dt, { children: [
  /* @__PURE__ */ a(Xn, {}),
  " ",
  e["%footnoteEditor_noteType_endNote_label%"]
] }) : /* @__PURE__ */ p(dt, { children: [
  /* @__PURE__ */ a(Wn, {}),
  " ",
  e["%footnoteEditor_noteType_crossReference_label%"]
] }), "renderNoteTypeButtonContent"), Lw = /* @__PURE__ */ n((t, e) => {
  if (t === "x")
    return e["%footnoteEditor_noteType_crossReference_label%"];
  let r = e["%footnoteEditor_noteType_endNote_label%"];
  return t === "f" && (r = e["%footnoteEditor_noteType_footnote_label%"]), Oe(e["%footnoteEditor_noteType_tooltip%"] ?? "", {
    noteType: r
  });
}, "formatNoteTypeTooltip");
function jw({
  noteType: t,
  handleNoteTypeChange: e,
  localizedStrings: r,
  isTypeSwitchable: o
}) {
  return /* @__PURE__ */ p(Be, { children: [
    /* @__PURE__ */ a(Mt, { children: /* @__PURE__ */ p(Ot, { children: [
      /* @__PURE__ */ a(It, { asChild: !0, children: /* @__PURE__ */ a(Fe, { asChild: !0, children: /* @__PURE__ */ a(J, { variant: "outline", className: "tw:h-6", children: Vw(t, r) }) }) }),
      /* @__PURE__ */ a($t, { children: /* @__PURE__ */ a("p", { children: Lw(t, r) }) })
    ] }) }),
    /* @__PURE__ */ p(Ue, { style: { zIndex: jn }, children: [
      /* @__PURE__ */ a(Dr, { children: r["%footnoteEditor_noteTypeDropdown_label%"] }),
      /* @__PURE__ */ a(Qe, {}),
      /* @__PURE__ */ p(
        Ie,
        {
          disabled: t !== "x" && !o,
          checked: t === "x",
          onCheckedChange: /* @__PURE__ */ n(() => e("x"), "onCheckedChange"),
          className: "tw:gap-2",
          children: [
            /* @__PURE__ */ a(Wn, {}),
            /* @__PURE__ */ a("span", { children: r["%footnoteEditor_noteType_crossReference_label%"] })
          ]
        }
      ),
      /* @__PURE__ */ p(
        Ie,
        {
          disabled: t === "x" && !o,
          checked: t === "f",
          onCheckedChange: /* @__PURE__ */ n(() => e("f"), "onCheckedChange"),
          className: "tw:gap-2",
          children: [
            /* @__PURE__ */ a(Yn, {}),
            /* @__PURE__ */ a("span", { children: r["%footnoteEditor_noteType_footnote_label%"] })
          ]
        }
      ),
      /* @__PURE__ */ p(
        Ie,
        {
          disabled: t === "x" && !o,
          checked: t === "fe",
          onCheckedChange: /* @__PURE__ */ n(() => e("fe"), "onCheckedChange"),
          className: "tw:gap-2",
          children: [
            /* @__PURE__ */ a(Xn, {}),
            /* @__PURE__ */ a("span", { children: r["%footnoteEditor_noteType_endNote_label%"] })
          ]
        }
      )
    ] })
  ] });
}
n(jw, "FootnoteTypeDropdown");
const Bw = Object.freeze([
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
function Fw({ icon: t, className: e }) {
  return /* @__PURE__ */ a(t ?? Xs, { className: e, size: 16 });
}
n(Fw, "MenuMarkerIcon");
function Uw({ state: t }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "marker-selection-state",
      className: "tw:flex tw:w-4 tw:min-w-4 tw:items-center tw:justify-center",
      children: t !== "none" && /* @__PURE__ */ a($e, { size: 16 })
    }
  );
}
n(Uw, "MarkerSelectionStateIndicator");
function zn({
  item: t,
  localizedStrings: e
}) {
  return /* @__PURE__ */ p(
    Re,
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
        t.selectionState !== void 0 && /* @__PURE__ */ a(Uw, { state: t.selectionState }),
        /* @__PURE__ */ a("div", { className: "tw:w-8 tw:min-w-8", children: t.marker ? (
          // Monospace: a USFM marker is a code, not prose, and should read as one. Deliberately
          // inherits the row's own foreground rather than taking a marker-specific colour.
          /* @__PURE__ */ a("span", { className: "tw:font-mono tw:text-xs", children: t.marker })
        ) : /* @__PURE__ */ a("div", { children: /* @__PURE__ */ a(Fw, { icon: t.icon }) }) }),
        /* @__PURE__ */ p("div", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-baseline tw:gap-2", children: [
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
        (t.isDisallowed || t.isDeprecated) && /* @__PURE__ */ a(hs, { className: "tw:font-sans", children: t.isDisallowed ? e["%markerMenu_disallowed_label%"] : e["%markerMenu_deprecated_label%"] })
      ]
    }
  );
}
n(zn, "MarkerMenuCommandItem");
function Kw({
  localizedStrings: t,
  markerMenuItems: e,
  searchRef: r,
  searchPlaceholder: o
}) {
  const [i, s] = N(""), [c, l] = L(() => {
    const d = ps(i.trim().toLowerCase());
    if (!d) {
      const h = e.filter((g) => !g.isDisallowed);
      return [h.length > 0 ? h : e, []];
    }
    const w = e.filter((h) => {
      var f;
      const g = (f = h.marker) == null ? void 0 : f.toLowerCase();
      return h.isDisallowed ? g === d : g == null ? void 0 : g.includes(d);
    }), u = e.filter(
      (h) => h.title.toLowerCase().includes(d) && !w.includes(h)
    );
    return [w, u];
  }, [i, e]);
  return /* @__PURE__ */ p(Le, { className: "tw:p-1", shouldFilter: !1, loop: !0, children: [
    /* @__PURE__ */ a(
      pa,
      {
        className: "marker-menu-search",
        ref: r,
        value: i,
        onValueChange: /* @__PURE__ */ n((d) => s(d), "onValueChange"),
        placeholder: o ?? t["%markerMenu_searchPlaceholder%"],
        spaceSelectsHighlightedItem: !0
      }
    ),
    /* @__PURE__ */ p(je, { children: [
      /* @__PURE__ */ a(ha, { children: t["%markerMenu_noResults%"] }),
      /* @__PURE__ */ a(Te, { children: c.map((d) => {
        var w;
        return /* @__PURE__ */ a(
          zn,
          {
            item: d,
            localizedStrings: t
          },
          `item-${d.marker ?? ((w = d.icon) == null ? void 0 : w.displayName)}-${d.title.replaceAll(" ", "")}`
        );
      }) }),
      l.length > 0 && /* @__PURE__ */ p(dt, { children: [
        c.length > 0 && /* @__PURE__ */ a(Bn, { alwaysRender: !0 }),
        /* @__PURE__ */ a(Te, { children: l.map((d) => {
          var w;
          return /* @__PURE__ */ a(
            zn,
            {
              item: d,
              localizedStrings: t
            },
            `item-${d.marker ?? ((w = d.icon) == null ? void 0 : w.displayName)}-${d.title.replaceAll(" ", "")}`
          );
        }) })
      ] })
    ] })
  ] });
}
n(Kw, "MarkerMenu");
function qw(t, e, r, o) {
  if (!o || o === "p") return [];
  const i = Yr[o];
  if (!(i != null && i.children)) return [];
  const s = [];
  return Object.entries(i.children).forEach(([, c]) => {
    s.push(
      ...c.map((l) => ({
        marker: l,
        title: r[Yr[l].description] ?? Yr[l].description,
        action: /* @__PURE__ */ n(() => {
          var d;
          (d = t.current) == null || d.insertMarker(l), e();
        }, "action")
      }))
    );
  }), s.sort((c, l) => (c.marker ?? c.title).localeCompare(l.marker ?? l.title));
}
n(qw, "generateInlineMarkerMenuListItems");
function Hw(t) {
  return {
    id: t.marker,
    label: t.marker,
    description: t.description,
    badge: t.kind === "closeTag" ? "%markerMenu_endTag_label%" : void 0,
    muted: !t.isBasic
  };
}
n(Hw, "markerMenuItemToPaletteItem");
function Gw(t) {
  var r;
  const e = (r = t.attributes) == null ? void 0 : r.char;
  e != null && e.style && (e.style === "ft" && (e.style = "xt"), e.style === "fr" && (e.style = "xo"), e.style === "fq" && (e.style = "xq"));
}
n(Gw, "footnoteToCrossReferenceOp");
function Ww(t) {
  var r;
  const e = (r = t.attributes) == null ? void 0 : r.char;
  e != null && e.style && (e.style === "xt" && (e.style = "ft"), e.style === "xo" && (e.style = "fr"), e.style === "xq" && (e.style = "fq"));
}
n(Ww, "crossReferenceToFootnoteOp");
const Yw = {
  type: "USJ",
  version: "3.1",
  content: [
    {
      type: "para"
    }
  ]
};
function th({
  classNameForEditor: t,
  noteOps: e,
  onChange: r,
  onClose: o,
  scrRef: i,
  noteKey: s,
  editorOptions: c,
  defaultMarkerMenuTrigger: l,
  localizedStrings: d,
  parentEditorRef: w,
  markerPalette: u,
  onNoteEdit: h
}) {
  var he;
  const g = q(null), f = q(null), m = q(null), y = q(null);
  ee(() => {
    if (!y.current) return;
    const { width: R } = y.current.getBoundingClientRect();
    R > 0 && (y.current.style.width = `${R}px`);
  }, []);
  const [b, z] = N("generated"), [k, E] = N("generated"), [T, P] = N("*"), [S, U] = N("*"), [V, M] = N("f"), [K, X] = N(!1), [H, tt] = N(!0), [$, et] = N(!1), C = q(!1), D = q(""), [G, it] = N(!1), [ot, ht] = N(), [wt, Z] = N(), [ut, ft] = N(), [mt, vt] = N(), Zt = q(null), bt = q(
    void 0
  ), At = q(0), Vt = q(void 0), xt = L(
    () => ({
      ...c,
      // Drop any inherited context-menu extras (e.g. the main editor's "Insert footnote" /
      // "Insert cross-reference" / "Insert comment" items). Those items' onSelect closures are
      // bound to the OUTER main-document editorRef, so surfacing them inside this popover would
      // let a right-click here silently mutate the main document. The popover keeps only the
      // built-in Cut/Copy/Paste context-menu items.
      contextMenu: void 0,
      markerMenuTrigger: l,
      hasExternalUI: !0,
      view: {
        ...c.view ?? Dl(),
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
    [c, l]
  ), Ft = L(
    () => qw(
      g,
      () => it(!1),
      d,
      mt
    ),
    [d, mt]
  );
  Y(() => {
    var R;
    G || (R = g.current) == null || R.focus();
  }, [V, G]);
  const St = B(() => {
    var x, j, A;
    const R = (x = f.current) == null ? void 0 : x.querySelector(".editor-input"), F = R == null ? void 0 : R.querySelector("span.note"), W = (A = (j = f.current) == null ? void 0 : j.ownerDocument.getSelection()) == null ? void 0 : A.anchorNode;
    return !!F && !!W && F.contains(W);
  }, []);
  Y(() => {
    var j, A;
    let R, F, W;
    C.current = !1, Vt.current = void 0, tt(!0);
    const x = e == null ? void 0 : e.at(0);
    if (x && yr("note", x)) {
      const rt = (j = x.insert.note) == null ? void 0 : j.caller;
      let ct = "custom";
      rt === eo ? ct = "generated" : rt === ro ? ct = "hidden" : rt && (P(rt), U(rt)), z(ct), E(ct), M(((A = x.insert.note) == null ? void 0 : A.style) ?? "f"), R = setTimeout(() => {
        var gt, yt, Nt;
        (gt = g.current) == null || gt.applyUpdate([x]), (yt = g.current) == null || yt.selectNote(0), (Nt = g.current) == null || Nt.focus(), F = requestAnimationFrame(() => {
          W = setTimeout(() => {
            var Bt, ae;
            St() || ((Bt = g.current) == null || Bt.selectNote(0), (ae = g.current) == null || ae.focus());
          }, 0);
        });
      }, 0);
    }
    return () => {
      R && clearTimeout(R), F !== void 0 && cancelAnimationFrame(F), W !== void 0 && clearTimeout(W);
    };
  }, [e, s, St]);
  const Ut = B(
    (R = !1) => {
      var W, x, j;
      h == null || h();
      const F = (x = (W = g.current) == null ? void 0 : W.getNoteOps(0)) == null ? void 0 : x.at(0);
      F && yr("note", F) && (r == null || r([F]), R && w && s && ((j = w.current) == null || j.replaceEmbedUpdate(s, [F])));
    },
    [s, r, h, w]
  ), lt = B(
    (R, F) => {
      var j, A, rt;
      const W = (A = (j = g.current) == null ? void 0 : j.getNoteOps(0)) == null ? void 0 : A.at(0);
      if (!W || !yr("note", W) || !W.insert.note) return;
      let x;
      R === "custom" ? x = F : R === "generated" ? x = eo : x = ro, W.insert.note.caller !== x && (W.insert.note.caller = x, (rt = g.current) == null || rt.applyUpdate([W, { delete: 1 }]));
    },
    []
  ), _t = B(() => {
    var R;
    bt.current || (R = g.current) == null || R.commitPendingMarkerEdits(), Ut(!0), o();
  }, [o, Ut]), Lt = q(_t);
  ee(() => {
    Lt.current = _t;
  });
  const se = q({ book: i.book, chapterNum: i.chapterNum });
  ee(() => {
    (se.current.book !== i.book || se.current.chapterNum !== i.chapterNum) && (se.current = { book: i.book, chapterNum: i.chapterNum }, Lt.current());
  }, [i.book, i.chapterNum]);
  const ce = /* @__PURE__ */ n(() => {
    var F;
    const R = (F = f.current) == null ? void 0 : F.getElementsByClassName("editor-input")[0];
    R != null && R.textContent && navigator.clipboard.writeText(R.textContent);
  }, "handleCopy"), Kt = B(
    (R, F) => {
      h == null || h(), z(R), P(F), lt(R, F);
    },
    [lt, h]
  ), qe = /* @__PURE__ */ n((R) => {
    var W, x, j, A, rt;
    M(R);
    const F = (x = (W = g.current) == null ? void 0 : W.getNoteOps(0)) == null ? void 0 : x.at(0);
    if (F && yr("note", F)) {
      F.insert.note && (F.insert.note.style = R);
      const ct = (A = (j = F.insert.note) == null ? void 0 : j.contents) == null ? void 0 : A.ops;
      V !== "x" && R === "x" ? ct == null || ct.forEach((gt) => Gw(gt)) : V === "x" && R !== "x" && (ct == null || ct.forEach((gt) => Ww(gt))), (rt = g.current) == null || rt.applyUpdate([F, { delete: 1 }]);
    }
  }, "handleNoteTypeChange"), qt = /* @__PURE__ */ n((R) => {
    vt(R.contextMarker), et(R.canRedo);
  }, "handleStateChange"), oe = B(
    (R) => {
      var W, x, j, A, rt;
      const F = (x = (W = g.current) == null ? void 0 : W.getNoteOps(0)) == null ? void 0 : x.at(0);
      if (F && yr("note", F)) {
        R.content.length > 1 && setTimeout(() => {
          var yt;
          (yt = g.current) == null || yt.applyUpdate([{ retain: 2 }, { delete: 1 }]);
        }, 0);
        const ct = (j = F.insert.note) == null ? void 0 : j.style, gt = (rt = (A = F.insert.note) == null ? void 0 : A.contents) == null ? void 0 : rt.ops;
        if (ct || X(!1), X(
          ct === "x" ? !!(gt != null && gt.every((yt) => {
            var Bt, ae;
            if (!((Bt = yt.attributes) != null && Bt.char)) return !0;
            const Nt = ((ae = yt.attributes) == null ? void 0 : ae.char).style;
            return Nt === "xt" || Nt === "xo" || Nt === "xq";
          })) : !!(gt != null && gt.every((yt) => {
            var Bt, ae;
            if (!((Bt = yt.attributes) != null && Bt.char)) return !0;
            const Nt = ((ae = yt.attributes) == null ? void 0 : ae.char).style;
            return Nt === "ft" || Nt === "fr" || Nt === "fq";
          }))
        ), !C.current) {
          C.current = !0, D.current = JSON.stringify(F), tt(!0);
          return;
        }
        tt(JSON.stringify(F) === D.current), Ut();
      } else
        X(!1), tt(!0);
    },
    [Ut]
  ), Qt = B(() => {
    const R = window.getSelection();
    if (m.current && Ft.length && R && R.rangeCount > 0) {
      const F = R.getRangeAt(0).getBoundingClientRect(), W = m.current.getBoundingClientRect();
      ht(F.left - W.left), Z(F.top - W.top), ft(F.height), it(!0);
    }
  }, [Ft, m]), O = q(() => {
  }), le = B(
    (R, F, W) => {
      const { anchorRect: x } = R;
      if (!u || !x) return;
      const { passive: j } = W;
      gs({
        items: F,
        passive: j,
        // No `shouldSpaceCommit`, deliberately: the Space note-marker exception exists for
        // Standard-view BODY text, where a materialized `\f ` literal absorbs the following word
        // as the new footnote's caller. This palette offers note-INTERNAL markers for content
        // already inside a note, so Space keeps its plain typed-literal commit here.
        sessionCounterRef: At,
        setSession: /* @__PURE__ */ n((A) => {
          bt.current = A;
        }, "setSession"),
        clearSessionIfCurrent: /* @__PURE__ */ n((A) => qo(bt, A), "clearSessionIfCurrent"),
        // Through the ref so the palette always runs the CURRENT handler — the callback is
        // captured once, at show time, while the session it drives is replaced on every reopen.
        runSessionKey: /* @__PURE__ */ n((A) => O.current(A), "runSessionKey"),
        show: /* @__PURE__ */ n((A) => u.show(
          F.map(Hw),
          x,
          j,
          A
        ), "show"),
        restoreSelectionIfLost: /* @__PURE__ */ n(() => {
          var A, rt, ct;
          if (!((A = g.current) != null && A.getSelection())) {
            const gt = Vt.current;
            gt ? (rt = g.current) == null || rt.setSelection(gt) : (ct = g.current) == null || ct.selectNote(0);
          }
        }, "restoreSelectionIfLost"),
        focusEditor: /* @__PURE__ */ n(() => {
          var A;
          return (A = g.current) == null ? void 0 : A.focus();
        }, "focusEditor"),
        applyItem: /* @__PURE__ */ n((A) => {
          var rt;
          return (rt = g.current) == null ? void 0 : rt.applyMarkerMenuSelection(A, {
            trigger: "backslash",
            // ACTIVE palette: the trigger was claimed and never landed, so there is never a
            // literal prefix for the apply to clean up.
            literalPrefixLanded: !1
          });
        }, "applyItem"),
        onShowError: /* @__PURE__ */ n((A) => {
          (!uc(A) || A.code !== pc) && console.warn(
            `FootnoteEditor: the marker palette did not open: ${hc(A)}`
          );
        }, "onShowError")
      });
    },
    [u]
  ), jt = B(() => {
    var W;
    const R = (W = g.current) == null ? void 0 : W.getMarkerMenuContext();
    if (!R) return !1;
    const F = Ml(xt.styleInfo ?? Ol, R);
    return F.length === 0 ? !1 : (le(R, F, { passive: !R.hasTextSelection }), !0);
  }, [le, xt.styleInfo]), Ht = B(
    (R) => {
      const F = bt.current;
      if (!F || !u) return;
      fs(R, F, {
        // Overlay ops delegate to the host-supplied driver; the commit ops are EDITOR-side
        // applies this popover owns (it holds the editor ref). The table calls `dismiss()` right
        // after each, resolving the show promise `undefined` — which the openMarkerPalette
        // `.then` treats as a dismissal, so nothing double-applies.
        update: /* @__PURE__ */ n((x) => u.update(x), "update"),
        commit: /* @__PURE__ */ n(() => u.commit(), "commit"),
        dismiss: /* @__PURE__ */ n(() => u.dismiss(), "dismiss"),
        commitTyped: /* @__PURE__ */ n((x) => {
          var j;
          return (j = g.current) == null ? void 0 : j.commitTypedMarker(x);
        }, "commitTyped"),
        commitTypedAndReopen: /* @__PURE__ */ n((x) => {
          var j;
          (j = g.current) == null || j.commitTypedMarker(x, { trailingSpace: !1 }), jt();
        }, "commitTypedAndReopen"),
        commitTypedCloser: /* @__PURE__ */ n((x) => {
          var j;
          return (j = g.current) == null ? void 0 : j.commitTypedCloser(x);
        }, "commitTypedCloser"),
        commitItem: /* @__PURE__ */ n((x) => {
          var A;
          const j = F.items.find((rt) => rt.marker === x);
          j && ((A = g.current) == null || A.applyMarkerMenuSelection(j, {
            trigger: "backslash",
            literalPrefixLanded: !1
          }));
        }, "commitItem")
      }) === "ended" && qo(bt, F.token);
    },
    [u, jt]
  );
  Y(() => {
    O.current = Ht;
  }, [Ht]), Y(() => {
    const R = /* @__PURE__ */ n((F) => {
      var j, A;
      const W = (j = f.current) == null ? void 0 : j.querySelector(".editor-input");
      if (!W || F.target !== W) return;
      const x = (A = g.current) == null ? void 0 : A.getSelection();
      x && (Vt.current = x);
    }, "handleFocusOut");
    return document.addEventListener("focusout", R), () => document.removeEventListener("focusout", R);
  }, []), Y(() => {
    const R = /* @__PURE__ */ n(() => {
      G && it(!1);
    }, "clickListener");
    return window.addEventListener("click", R), () => {
      window.removeEventListener("click", R);
    };
  }, [G]), Y(() => {
    var R;
    G && ((R = Zt.current) == null || R.focus());
  }, [G]), Y(() => {
    var W;
    const R = /* @__PURE__ */ n(() => {
      var x;
      return ((x = f.current) == null ? void 0 : x.querySelector(".editor-input")) ?? void 0;
    }, "getEditorInput");
    if (((W = xt.view) == null ? void 0 : W.markerMode) === "editable") {
      const x = /* @__PURE__ */ n((A) => {
        var gt, yt, Nt, Bt;
        if (vs(A)) return;
        const rt = R();
        if (!rt || document.activeElement !== rt) return;
        if (bt.current && u) {
          O.current(A);
          return;
        }
        if (A.key === "Enter" && !St()) {
          A.preventDefault(), A.stopPropagation(), (gt = g.current) == null || gt.selectNote(0), (yt = g.current) == null || yt.focus();
          return;
        }
        if (u && A.key === l) {
          if (!St()) {
            A.preventDefault(), A.stopPropagation(), (Nt = g.current) == null || Nt.selectNote(0), (Bt = g.current) == null || Bt.focus();
            return;
          }
          jt() && (A.preventDefault(), A.stopPropagation());
        }
      }, "handleKeyDown2"), j = /* @__PURE__ */ n(() => {
        var rt, ct;
        const A = R();
        !A || document.activeElement !== A || St() || ((rt = g.current) == null || rt.selectNote(0), (ct = g.current) == null || ct.focus());
      }, "handlePaste");
      return document.addEventListener("keydown", x, { capture: !0 }), document.addEventListener("paste", j, { capture: !0 }), () => {
        document.removeEventListener("keydown", x, { capture: !0 }), document.removeEventListener("paste", j, { capture: !0 });
      };
    }
    const F = /* @__PURE__ */ n((x) => {
      const j = R();
      !G && j && document.activeElement === j && x.key === l ? (x.preventDefault(), Qt()) : G && x.key === "Escape" && (x.preventDefault(), it(!1));
    }, "handleKeyDown");
    return document.addEventListener("keydown", F), () => {
      document.removeEventListener("keydown", F);
    };
  }, [
    G,
    Qt,
    l,
    (he = xt.view) == null ? void 0 : he.markerMode,
    xt.styleInfo,
    u,
    jt,
    St
  ]), Y(() => {
    const R = /* @__PURE__ */ n(() => {
      var x, j, A;
      const F = ((x = f.current) == null ? void 0 : x.querySelector(".editor-input")) ?? void 0;
      if (!F || document.activeElement !== F) return;
      const W = document.getSelection();
      W && !W.isCollapsed || St() || ((j = g.current) == null || j.selectNote(0), (A = g.current) == null || A.focus());
    }, "snapStrayCaretIntoNote");
    return document.addEventListener("pointerup", R), document.addEventListener("selectionchange", R), () => {
      document.removeEventListener("pointerup", R), document.removeEventListener("selectionchange", R);
    };
  }, [St]);
  const pe = d["%footnoteEditor_copyButton_tooltip%"];
  return /* @__PURE__ */ p(dt, { children: [
    /* @__PURE__ */ p("div", { ref: y, className: "footnote-editor tw:grid tw:gap-[12px]", children: [
      /* @__PURE__ */ p("div", { className: "tw:flex", children: [
        /* @__PURE__ */ p("div", { className: "tw:flex tw:gap-4", children: [
          /* @__PURE__ */ a(
            jw,
            {
              isTypeSwitchable: K,
              noteType: V,
              handleNoteTypeChange: qe,
              localizedStrings: d
            }
          ),
          /* @__PURE__ */ a(
            Aw,
            {
              callerType: b,
              customCaller: T,
              updateCaller: Kt,
              localizedStrings: d
            }
          )
        ] }),
        /* @__PURE__ */ a("div", { className: "tw:flex tw:w-full tw:justify-end", children: /* @__PURE__ */ p(go, { children: [
          /* @__PURE__ */ a(
            Iw,
            {
              onUndoClick: /* @__PURE__ */ n(() => {
                var R;
                return (R = g.current) == null ? void 0 : R.undo();
              }, "onUndoClick"),
              onRedoClick: /* @__PURE__ */ n(() => {
                var R;
                return (R = g.current) == null ? void 0 : R.redo();
              }, "onRedoClick"),
              canUndo: !H,
              canRedo: $,
              localizedStrings: d
            }
          ),
          /* @__PURE__ */ a(
            ji,
            {
              onCancelClick: o,
              onAcceptClick: _t,
              canAccept: !H || k !== b || b === "custom" && T !== S,
              localizedStrings: d,
              acceptLabel: d["%footnoteEditor_saveButton_tooltip%"]
            }
          )
        ] }) })
      ] }),
      /* @__PURE__ */ p(
        "div",
        {
          ref: f,
          className: "tw:relative tw:rounded-[6px] tw:border-2 tw:border-ring",
          children: [
            /* @__PURE__ */ a("div", { className: t, children: /* @__PURE__ */ a(
              $w,
              {
                editorRef: g,
                canUndo: !H,
                canRedo: $,
                children: /* @__PURE__ */ a(
                  Il,
                  {
                    options: xt,
                    onStateChange: qt,
                    onUsjChange: oe,
                    defaultUsj: Yw,
                    onScrRefChange: /* @__PURE__ */ n(() => {
                    }, "onScrRefChange"),
                    scrRef: i,
                    ref: g
                  }
                )
              }
            ) }),
            /* @__PURE__ */ a("div", { className: "tw:absolute tw:bottom-0 tw:right-0", children: /* @__PURE__ */ a(Mt, { children: /* @__PURE__ */ p(Ot, { children: [
              /* @__PURE__ */ a(It, { asChild: !0, children: /* @__PURE__ */ a(
                J,
                {
                  "aria-label": pe,
                  onClick: ce,
                  className: "tw:h-6 tw:w-6",
                  variant: "ghost",
                  size: "icon",
                  children: /* @__PURE__ */ a(Gn, {})
                }
              ) }),
              /* @__PURE__ */ a($t, { children: /* @__PURE__ */ a("p", { children: pe }) })
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
    /* @__PURE__ */ p(Ae, { open: G, children: [
      /* @__PURE__ */ a(
        ms,
        {
          className: "tw:absolute",
          style: {
            top: wt,
            left: ot,
            height: ut,
            width: 0,
            pointerEvents: "none"
          }
        }
      ),
      /* @__PURE__ */ a(
        Ve,
        {
          className: "tw:w-[500px] tw:p-0",
          onClick: /* @__PURE__ */ n((R) => {
            R.preventDefault(), R.stopPropagation();
          }, "onClick"),
          children: /* @__PURE__ */ a(
            Kw,
            {
              markerMenuItems: Ft,
              localizedStrings: d,
              searchRef: Zt
            }
          )
        }
      )
    ] })
  ] });
}
n(th, "FootnoteEditor");
const eh = Object.freeze([
  ...Bw,
  ...Object.entries(Yr).map(([, t]) => t.description).filter((t) => !!t),
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
  ...Ow,
  ...Li
]);
function Xw(t, e, r = !0, o = void 0) {
  if (!e || e.length === 0) return;
  const i = [], s = [];
  let c = [];
  return e.forEach((l) => {
    typeof l != "string" && l.marker === "fp" ? (c.length > 0 && s.push(c), c = [l]) : c.push(l);
  }), c.length > 0 && s.push(c), s.map((l, d) => {
    const w = d === s.length - 1;
    return (
      // A footnote's paragraphs have no stable id, and keying on their CONTENT is what produced
      // duplicate keys (two `\fp` paragraphs collide). This list is a read-only projection
      // re-rendered wholesale and never reordered, so the identity the rule protects cannot be
      // lost here. See the note above.
      // eslint-disable-next-line react/no-array-index-key
      /* @__PURE__ */ p("p", { children: [
        Lo(t, l, r, !0, i),
        w && o
      ] }, `para-${d}`)
    );
  });
}
n(Xw, "renderParagraphs");
function Lo(t, e, r = !0, o = !0, i = []) {
  if (!(!e || e.length === 0))
    return e.map((s, c) => {
      const l = `part-${c}`;
      if (typeof s == "string") {
        if (o) {
          const d = v(`usfm_${t}`);
          return /* @__PURE__ */ a("span", { className: d, children: s }, l);
        }
        return /* @__PURE__ */ p(
          "span",
          {
            className: "tw:inline-flex tw:items-center tw:gap-1 tw:underline tw:decoration-destructive",
            children: [
              /* @__PURE__ */ a(Ja, { className: "tw:h-4 tw:w-4 tw:fill-destructive" }),
              /* @__PURE__ */ a("span", { children: s }),
              /* @__PURE__ */ a(Ja, { className: "tw:h-4 tw:w-4 tw:fill-destructive" })
            ]
          },
          l
        );
      }
      return Jw(s, l, r, [
        ...i,
        t ?? "unknown"
      ]);
    });
}
n(Lo, "renderContent");
function Jw(t, e, r, o = []) {
  const { marker: i } = t;
  return /* @__PURE__ */ p("span", { children: [
    i ? r && /* @__PURE__ */ a("span", { className: "marker", children: `\\${i} ` }) : /* @__PURE__ */ a(
      Ja,
      {
        className: "tw:text-error tw:mr-1 tw:inline-block tw:h-4 tw:w-4",
        "aria-label": "Missing marker"
      }
    ),
    Lo(i, t.content, r, !0, [
      ...o,
      i ?? "unknown"
    ])
  ] }, e);
}
n(Jw, "renderMarkerObject");
function Zw({
  footnote: t,
  layout: e = "horizontal",
  formatCaller: r,
  showMarkers: o = !0
}) {
  const i = r ? r(t.caller) : t.caller, s = i !== t.caller;
  let c, l = t.content;
  Array.isArray(t.content) && t.content.length > 0 && typeof t.content[0] != "string" && (t.content[0].marker === "fr" || t.content[0].marker === "xo") && ([c, ...l] = t.content);
  const d = o ? /* @__PURE__ */ a("span", { className: "marker", children: `\\${t.marker}` }) : void 0, w = o ? /* @__PURE__ */ a("span", { className: "marker", children: ` \\${t.marker}*` }) : void 0, u = i && // USFM does not specify a marker for caller, so instead of a usfm_* class, we use a
  // specific class name in case styling is needed.
  /* @__PURE__ */ a("span", { className: v("note-caller tw:inline-block", { formatted: s }), children: i }), h = t.category && /* @__PURE__ */ p("span", { className: "note-category tw:inline-block", children: [
    o && /* @__PURE__ */ a("span", { className: "marker", children: "\\cat " }),
    t.category,
    o && /* @__PURE__ */ a("span", { className: "marker", children: "\\cat*" })
  ] }), g = c && /* @__PURE__ */ p(dt, { children: [
    Lo(t.marker, [c], o, !1),
    " "
  ] }), f = !!d, m = !!u, y = !!h, b = e === "horizontal" ? "horizontal" : "vertical", z = o ? "marker-visible" : "", k = e === "horizontal" ? "tw:col-span-1" : "tw:col-span-2 tw:col-start-1 tw:row-start-2", E = v(b, z);
  return /* @__PURE__ */ p(dt, { children: [
    /* @__PURE__ */ p("div", { className: v("textual-note-header tw:col-span-1 tw:w-fit tw:text-nowrap", E), children: [
      d,
      f && (m || y) && " ",
      u,
      m && y && " ",
      h
    ] }),
    /* @__PURE__ */ a("div", { className: v("textual-note-header tw:col-span-1 tw:w-fit tw:text-nowrap", E), children: g }),
    /* @__PURE__ */ a(
      "div",
      {
        className: v(
          "textual-note-body tw:flex tw:flex-col tw:gap-1",
          k,
          E
        ),
        children: l && l.length > 0 && /* @__PURE__ */ a(dt, { children: Xw(t.marker, l, o, w) })
      }
    )
  ] });
}
n(Zw, "FootnoteItem");
function rh({
  className: t,
  classNameForItems: e,
  footnotes: r,
  layout: o = "horizontal",
  listId: i,
  selectedFootnote: s,
  selectionRequest: c,
  showMarkers: l = !0,
  suppressFormatting: d = !1,
  formatCaller: w,
  onFootnoteSelected: u
}) {
  const h = w ?? gc(r, void 0), g = /* @__PURE__ */ n((T, P) => {
    u == null || u(T, P, i);
  }, "handleFootnoteClick"), f = s ? r.findIndex((T) => T === s) : -1, [m, y] = N(f), b = /* @__PURE__ */ n((T, P, S) => {
    if (r.length)
      switch (T.key) {
        case "Enter":
        case " ":
          T.preventDefault(), u == null || u(P, S, i);
          break;
      }
  }, "handleFootnoteKeyDown"), z = /* @__PURE__ */ n((T) => {
    if (r.length)
      switch (T.key) {
        case "ArrowDown":
          T.preventDefault(), y((P) => Math.min(P + 1, r.length - 1));
          break;
        case "ArrowUp":
          T.preventDefault(), y((P) => Math.max(P - 1, 0));
          break;
      }
  }, "handleListKeyDown"), k = q([]);
  Y(() => {
    var T;
    m >= 0 && m < k.current.length && ((T = k.current[m]) == null || T.focus());
  }, [m]);
  const E = s ? r.findIndex((T) => T === s) : -1;
  return Y(() => {
    var T;
    E < 0 || E >= k.current.length || (T = k.current[E]) == null || T.scrollIntoView({ block: "nearest" });
  }, [E, c]), /* @__PURE__ */ a(
    "div",
    {
      role: "listbox",
      "aria-label": "Footnotes",
      tabIndex: m < 0 ? 0 : -1,
      className: v("tw:h-full tw:overflow-y-auto", t),
      onKeyDown: z,
      children: /* @__PURE__ */ a(
        "ul",
        {
          className: v(
            "tw:p-0.5 tw:pt-1",
            "tw:grid",
            o === "horizontal" ? "tw:grid-cols-[min-content_min-content_1fr]" : "tw:grid-cols-[min-content_1fr]",
            !d && "formatted-font"
          ),
          children: r.map((T, P) => {
            const S = T === s, U = `${i}-${P}`;
            return (
              // The key belongs on the outermost node returned from the map — the Fragment — not on
              // the `<li>` nested inside it, which leaves the Fragment itself unkeyed.
              /* @__PURE__ */ p(Xt.Fragment, { children: [
                /* @__PURE__ */ a(
                  "li",
                  {
                    ref: /* @__PURE__ */ n((V) => {
                      k.current[P] = V;
                    }, "ref"),
                    role: "option",
                    "aria-selected": S,
                    "data-marker": T.marker,
                    "data-state": S ? "selected" : void 0,
                    tabIndex: P === m ? 0 : -1,
                    className: v(
                      "tw:gap-x-3 tw:gap-y-1 tw:p-2 tw:data-[state=selected]:bg-muted",
                      u && "tw:hover:bg-muted/50",
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
                    onClick: /* @__PURE__ */ n(() => g(T, P), "onClick"),
                    onKeyDown: /* @__PURE__ */ n((V) => b(V, T, P), "onKeyDown"),
                    children: /* @__PURE__ */ a(
                      Zw,
                      {
                        footnote: T,
                        layout: o,
                        formatCaller: /* @__PURE__ */ n(() => h(T.caller, P), "formatCaller"),
                        showMarkers: l
                      }
                    )
                  }
                ),
                P < r.length - 1 && o === "vertical" && /* @__PURE__ */ a(Sr, { tabIndex: -1, className: "tw:col-span-2" })
              ] }, U)
            );
          })
        }
      )
    }
  );
}
n(rh, "FootnoteList");
function Qw(t) {
  const e = [];
  let r = 0;
  const o = /\\\\(.+?)\\\\/g;
  let i;
  for (; (i = o.exec(t)) !== null; )
    i.index > r && e.push(t.substring(r, i.index)), e.push(/* @__PURE__ */ a("strong", { children: i[1] }, i.index)), r = o.lastIndex;
  return r < t.length && e.push(t.substring(r)), e.length > 0 ? e : [t];
}
n(Qw, "formatTextWithBold");
function tu({
  occurrenceData: t,
  setScriptureReference: e,
  localizedStrings: r,
  classNameForText: o
}) {
  const i = r["%webView_inventory_occurrences_table_header_reference%"], s = r["%webView_inventory_occurrences_table_header_occurrence%"], c = L(() => {
    const l = [], d = /* @__PURE__ */ new Set();
    return t.forEach((w) => {
      const u = `${w.reference.book}:${w.reference.chapterNum}:${w.reference.verseNum}:${w.text}`;
      d.has(u) || (d.add(u), l.push(w));
    }), l;
  }, [t]);
  return /* @__PURE__ */ p(mo, { stickyHeader: !0, children: [
    /* @__PURE__ */ a(vo, { stickyHeader: !0, children: /* @__PURE__ */ p(Me, { children: [
      /* @__PURE__ */ a(aa, { children: i }),
      /* @__PURE__ */ a(aa, { children: s })
    ] }) }),
    /* @__PURE__ */ a(bo, { children: c.length > 0 && c.map((l) => /* @__PURE__ */ p(
      Me,
      {
        onClick: /* @__PURE__ */ n(() => {
          e(l.reference);
        }, "onClick"),
        children: [
          /* @__PURE__ */ a(cr, { children: Ce(l.reference, "English") }),
          /* @__PURE__ */ a(cr, { className: o, children: Qw(l.text) })
        ]
      },
      `${l.reference.book} ${l.reference.chapterNum}:${l.reference.verseNum}-${l.text}`
    )) })
  ] });
}
n(tu, "OccurrencesTable");
function Hi({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    on.Root,
    {
      "data-slot": "checkbox",
      className: v(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:peer tw:relative tw:flex tw:size-4 tw:shrink-0 tw:items-center tw:justify-center tw:rounded-[4px] tw:border tw:border-input tw:transition-colors tw:outline-none tw:group-has-disabled/field:opacity-50 tw:after:absolute tw:after:-inset-x-3 tw:after:-inset-y-2 tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:aria-invalid:aria-checked:border-primary tw:dark:bg-input/30 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40 tw:data-checked:border-primary tw:data-checked:bg-primary tw:data-checked:text-primary-foreground tw:dark:data-checked:bg-primary",
        t
      ),
      ...e,
      children: /* @__PURE__ */ a(
        on.Indicator,
        {
          "data-slot": "checkbox-indicator",
          className: "tw:grid tw:place-content-center tw:text-current tw:transition-none tw:[&>svg]:size-3.5",
          children: /* @__PURE__ */ a(va, {})
        }
      )
    }
  );
}
n(Hi, "Checkbox");
const eu = /* @__PURE__ */ n((t) => {
  if (t === "asc")
    return /* @__PURE__ */ a(tc, { className: "tw:h-4 tw:w-4" });
  if (t === "desc")
    return /* @__PURE__ */ a(ec, { className: "tw:h-4 tw:w-4" });
}, "getSortingIcon"), xa = /* @__PURE__ */ n((t, e, r) => /* @__PURE__ */ a(Mt, { children: /* @__PURE__ */ p(Ot, { children: [
  /* @__PURE__ */ p(
    It,
    {
      className: v("tw:flex tw:w-full tw:justify-start", r),
      variant: "ghost",
      onClick: /* @__PURE__ */ n(() => t.toggleSorting(void 0), "onClick"),
      children: [
        /* @__PURE__ */ a("span", { className: "tw:w-6 tw:max-w-fit tw:flex-1 tw:overflow-hidden tw:text-ellipsis", children: e }),
        eu(t.getIsSorted())
      ]
    }
  ),
  /* @__PURE__ */ a($t, { side: "bottom", children: e })
] }) }), "getInventoryHeader"), ah = /* @__PURE__ */ n((t) => ({
  accessorKey: "item",
  accessorFn: /* @__PURE__ */ n((e) => e.items[0], "accessorFn"),
  header: /* @__PURE__ */ n(({ column: e }) => xa(e, t), "header")
}), "inventoryItemColumn"), ru = /* @__PURE__ */ n((t, e) => ({
  accessorKey: `item${e}`,
  accessorFn: /* @__PURE__ */ n((r) => r.items[e], "accessorFn"),
  header: /* @__PURE__ */ n(({ column: r }) => xa(r, t), "header")
}), "inventoryAdditionalItemColumn"), oh = /* @__PURE__ */ n((t) => ({
  accessorKey: "count",
  header: /* @__PURE__ */ n(({ column: e }) => xa(e, t, "tw:justify-end"), "header"),
  cell: /* @__PURE__ */ n(({ row: e }) => /* @__PURE__ */ a("div", { className: "tw:flex tw:justify-end tw:tabular-nums", children: e.getValue("count") }), "cell")
}), "inventoryCountColumn"), Fa = /* @__PURE__ */ n((t, e, r, o, i, s) => {
  let c = [...r];
  t.forEach((d) => {
    e === "approved" ? c.includes(d) || c.push(d) : c = c.filter((w) => w !== d);
  }), o(c);
  let l = [...i];
  t.forEach((d) => {
    e === "unapproved" ? l.includes(d) || l.push(d) : l = l.filter((w) => w !== d);
  }), s(l);
}, "statusChangeHandler"), nh = /* @__PURE__ */ n((t, e, r, o, i) => ({
  accessorKey: "status",
  header: /* @__PURE__ */ n(({ column: s }) => xa(s, t, "tw:justify-center"), "header"),
  cell: /* @__PURE__ */ n(({ row: s }) => {
    const c = s.getValue("status"), l = s.getValue("item");
    return (
      // Center the status buttons in the cell to match the centered status column header (the
      // ToggleGroup would otherwise sit left-aligned).
      /* @__PURE__ */ a("div", { className: "tw:flex tw:justify-center", children: /* @__PURE__ */ p(An, { value: c, variant: "outline", type: "single", className: "tw:gap-0", children: [
        /* @__PURE__ */ a(
          Gr,
          {
            onClick: /* @__PURE__ */ n((d) => {
              d.stopPropagation(), Fa(
                [l],
                "approved",
                e,
                r,
                o,
                i
              );
            }, "onClick"),
            value: "approved",
            className: "tw:rounded-e-none tw:border-e-0",
            children: /* @__PURE__ */ a(Js, {})
          }
        ),
        /* @__PURE__ */ a(
          Gr,
          {
            onClick: /* @__PURE__ */ n((d) => {
              d.stopPropagation(), Fa(
                [l],
                "unapproved",
                e,
                r,
                o,
                i
              );
            }, "onClick"),
            value: "unapproved",
            className: "tw:rounded-none",
            children: /* @__PURE__ */ a(Zs, {})
          }
        ),
        /* @__PURE__ */ a(
          Gr,
          {
            onClick: /* @__PURE__ */ n((d) => {
              d.stopPropagation(), Fa(
                [l],
                "unknown",
                e,
                r,
                o,
                i
              );
            }, "onClick"),
            value: "unknown",
            className: "tw:rounded-s-none tw:border-s-0",
            children: /* @__PURE__ */ a(Qs, {})
          }
        )
      ] }) })
    );
  }, "cell")
}), "inventoryStatusColumn"), ih = /* @__PURE__ */ n((t) => t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g), "getLinesFromUSFM"), sh = /* @__PURE__ */ n((t) => {
  const e = /^\\[vc]\s+(\d+)/, r = t.match(e);
  if (r)
    return +r[1];
}, "getNumberFromUSFM"), ch = /* @__PURE__ */ n((t) => {
  const e = t.match(/^\\id\s+([A-Za-z]+)/);
  return e ? e[1] : "";
}, "getBookIdFromUSFM"), au = /* @__PURE__ */ n((t, e, r) => r.includes(t) ? "unapproved" : e.includes(t) ? "approved" : "unknown", "getStatusForItem"), lh = Object.freeze([
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
]), ou = /* @__PURE__ */ n((t, e, r) => {
  let o = t;
  return e !== "all" && (o = o.filter(
    (i) => e === "approved" && i.status === "approved" || e === "unapproved" && i.status === "unapproved" || e === "unknown" && i.status === "unknown"
  )), r !== "" && (o = o.filter((i) => i.items[0].includes(r))), o;
}, "filterItemData"), nu = /* @__PURE__ */ n((t, e, r) => t.map((o) => {
  const i = Xo(o.key) ? o.key : o.key[0];
  return {
    items: Xo(o.key) ? [o.key] : o.key,
    count: o.count,
    status: o.status || au(i, e, r),
    occurrences: o.occurrences || []
  };
}), "processSummaryItems"), me = /* @__PURE__ */ n((t, e) => t[e] ?? e, "localizeString$2");
function dh({
  inventoryItems: t,
  setVerseRef: e,
  localizedStrings: r,
  additionalItemsLabels: o,
  approvedItems: i,
  unapprovedItems: s,
  scope: c,
  onScopeChange: l,
  columns: d,
  id: w,
  areInventoryItemsLoading: u = !1,
  classNameForVerseText: h,
  onItemSelected: g
}) {
  const f = me(r, "%webView_inventory_all%"), m = me(r, "%webView_inventory_approved%"), y = me(r, "%webView_inventory_unapproved%"), b = me(r, "%webView_inventory_unknown%"), z = me(r, "%webView_inventory_scope_currentBook%"), k = me(r, "%webView_inventory_scope_chapter%"), E = me(r, "%webView_inventory_scope_verse%"), T = me(r, "%webView_inventory_filter_text%"), P = me(
    r,
    "%webView_inventory_show_additional_items%"
  ), S = me(r, "%webView_inventory_no_results%"), [U, V] = N(!1), [M, K] = N("all"), [X, H] = N(""), [tt, $] = N([]), et = L(() => {
    const Z = t ?? [];
    return Z.length === 0 ? [] : nu(Z, i, s);
  }, [t, i, s]), C = L(() => {
    if (U) return et;
    const Z = [];
    return et.forEach((ut) => {
      const ft = ut.items[0], mt = Z.find(
        (vt) => vt.items[0] === ft
      );
      mt ? (mt.count += ut.count, mt.occurrences = mt.occurrences.concat(ut.occurrences)) : Z.push({
        items: [ft],
        count: ut.count,
        occurrences: ut.occurrences,
        status: ut.status
      });
    }), Z;
  }, [U, et]), D = L(() => C.length === 0 ? [] : ou(C, M, X), [C, M, X]), G = L(() => {
    var ft, mt;
    if (!U) return d;
    const Z = (ft = o == null ? void 0 : o.tableHeaders) == null ? void 0 : ft.length;
    if (!Z) return d;
    const ut = [];
    for (let vt = 0; vt < Z; vt++)
      ut.push(
        ru(
          ((mt = o == null ? void 0 : o.tableHeaders) == null ? void 0 : mt[vt]) || "Additional Item",
          vt + 1
        )
      );
    return [...ut, ...d];
  }, [o == null ? void 0 : o.tableHeaders, d, U]);
  Y(() => {
    D.length === 0 ? $([]) : D.length === 1 && $(D[0].items);
  }, [D]);
  const it = /* @__PURE__ */ n((Z, ut) => {
    ut.setRowSelection(() => {
      const mt = {};
      return mt[Z.index] = !0, mt;
    });
    const ft = Z.original.items;
    $(ft), g && ft.length > 0 && g(ft[0]);
  }, "rowClickHandler"), ot = /* @__PURE__ */ n((Z) => {
    if (Z === "book" || Z === "chapter" || Z === "verse")
      l(Z);
    else
      throw new Error(`Invalid scope value: ${Z}`);
  }, "handleScopeChange"), ht = /* @__PURE__ */ n((Z) => {
    if (Z === "all" || Z === "approved" || Z === "unapproved" || Z === "unknown")
      K(Z);
    else
      throw new Error(`Invalid status filter value: ${Z}`);
  }, "handleStatusFilterChange"), wt = L(() => {
    if (C.length === 0 || tt.length === 0) return [];
    const Z = C.filter((ut) => fc(
      U ? ut.items : [ut.items[0]],
      tt
    ));
    if (Z.length > 1) throw new Error("Selected item is not unique");
    return Z.length === 0 ? [] : Z[0].occurrences;
  }, [tt, U, C]);
  return /* @__PURE__ */ a("div", { id: w, className: "pr-twp tw:h-full tw:overflow-auto", children: /* @__PURE__ */ p("div", { className: "tw:flex tw:h-full tw:w-full tw:min-w-min tw:flex-col", children: [
    /* @__PURE__ */ p("div", { className: "tw:flex tw:items-stretch", style: { contain: "inline-size" }, children: [
      /* @__PURE__ */ p(
        ur,
        {
          onValueChange: /* @__PURE__ */ n((Z) => ht(Z), "onValueChange"),
          defaultValue: M,
          children: [
            /* @__PURE__ */ a(hr, { className: "tw:m-1 tw:w-auto tw:flex-1", children: /* @__PURE__ */ a(pr, { placeholder: "Select filter" }) }),
            /* @__PURE__ */ p(gr, { children: [
              /* @__PURE__ */ a(de, { value: "all", children: f }),
              /* @__PURE__ */ a(de, { value: "approved", children: m }),
              /* @__PURE__ */ a(de, { value: "unapproved", children: y }),
              /* @__PURE__ */ a(de, { value: "unknown", children: b })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ p(ur, { onValueChange: /* @__PURE__ */ n((Z) => ot(Z), "onValueChange"), defaultValue: c, children: [
        /* @__PURE__ */ a(hr, { className: "tw:m-1 tw:w-auto tw:flex-1", children: /* @__PURE__ */ a(pr, { placeholder: "Select scope" }) }),
        /* @__PURE__ */ p(gr, { children: [
          /* @__PURE__ */ a(de, { value: "book", children: z }),
          /* @__PURE__ */ a(de, { value: "chapter", children: k }),
          /* @__PURE__ */ a(de, { value: "verse", children: E })
        ] })
      ] }),
      /* @__PURE__ */ a(
        ga,
        {
          className: "tw:m-1 tw:flex-1 tw:rounded-md tw:border",
          placeholder: T,
          value: X,
          onChange: /* @__PURE__ */ n((Z) => {
            H(Z.target.value);
          }, "onChange")
        }
      ),
      o && /* @__PURE__ */ a(Mt, { children: /* @__PURE__ */ p(Ot, { children: [
        /* @__PURE__ */ a(It, { asChild: !0, children: /* @__PURE__ */ p("div", { className: "tw:m-1 tw:flex tw:w-fit tw:min-w-[26px] tw:items-center tw:rounded-md tw:border", children: [
          /* @__PURE__ */ a(
            Hi,
            {
              className: "tw:m-1 tw:shrink-0",
              checked: U,
              onCheckedChange: /* @__PURE__ */ n((Z) => {
                V(Z);
              }, "onCheckedChange")
            }
          ),
          /* @__PURE__ */ a(Tt, { className: "tw:m-1 tw:truncate", children: (o == null ? void 0 : o.checkboxText) ?? P })
        ] }) }),
        /* @__PURE__ */ a($t, { children: (o == null ? void 0 : o.checkboxText) ?? P })
      ] }) })
    ] }),
    /* @__PURE__ */ a("div", { className: "tw:m-1 tw:flex-1 tw:overflow-auto tw:rounded-md tw:border", children: /* @__PURE__ */ a(
      Sw,
      {
        columns: G,
        data: D,
        onRowClickHandler: it,
        stickyHeader: !0,
        isLoading: u,
        noResultsMessage: S
      }
    ) }),
    wt.length > 0 && /* @__PURE__ */ a("div", { className: "tw:m-1 tw:flex-1 tw:overflow-auto tw:rounded-md tw:border", children: /* @__PURE__ */ a(
      tu,
      {
        classNameForText: h,
        occurrenceData: wt,
        setScriptureReference: e,
        localizedStrings: r
      }
    ) })
  ] }) });
}
n(dh, "Inventory");
const iu = "16rem", su = "3rem", Gi = Xt.createContext(void 0);
function ya() {
  const t = Xt.useContext(Gi);
  if (!t)
    throw new Error("useSidebar must be used within a SidebarProvider.");
  return t;
}
n(ya, "useSidebar");
function cu({
  defaultOpen: t = !0,
  open: e,
  onOpenChange: r,
  className: o,
  style: i,
  children: s,
  // CUSTOM: Added 'side' prop at provider level so direction-aware side can be propagated via context
  side: c = "primary",
  ...l
}) {
  const [d, w] = Xt.useState(t), u = e ?? d, h = Xt.useCallback(
    (E) => {
      const T = typeof E == "function" ? E(u) : E;
      r ? r(T) : w(T);
    },
    [r, u]
  ), g = Xt.useCallback(() => h((E) => !E), [h]), f = u ? "expanded" : "collapsed", b = ke() === "ltr" ? c : c === "primary" ? "secondary" : "primary", z = Xt.useMemo(
    () => ({
      state: f,
      open: u,
      setOpen: h,
      toggleSidebar: g,
      // CUSTOM: Passes direction-aware side into context so SidebarTrigger icon and Sidebar
      // positioning both respond correctly in RTL layouts
      side: b
    }),
    [f, u, h, g, b]
  ), k = {
    "--sidebar-width": iu,
    "--sidebar-width-icon": su,
    ...i
  };
  return /* @__PURE__ */ a(Gi.Provider, { value: z, children: /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "sidebar-wrapper",
      style: k,
      className: v(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        // CUSTOM: Removed tw:min-h-svh - not appropriate in Platform.Bible's windowed layout
        "pr-twp tw:group/sidebar-wrapper tw:flex tw:w-full tw:has-data-[variant=inset]:bg-sidebar",
        o
      ),
      ...l,
      children: s
    }
  ) });
}
n(cu, "SidebarProvider");
function lu({
  // CUSTOM: Removed 'side' prop from Sidebar - it is now read from context (moved to SidebarProvider)
  variant: t = "sidebar",
  collapsible: e = "offcanvas",
  className: r,
  children: o,
  ...i
}) {
  const s = ya();
  return e === "none" ? /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "sidebar",
      className: v(
        "tw:flex tw:h-full tw:w-(--sidebar-width) tw:flex-col tw:bg-sidebar tw:text-sidebar-foreground",
        r
      ),
      ...i,
      children: o
    }
  ) : /* @__PURE__ */ p(
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
            ...i,
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
n(lu, "Sidebar");
function wh({ className: t, onClick: e, ...r }) {
  const { toggleSidebar: o, side: i } = ya();
  return /* @__PURE__ */ p(
    J,
    {
      "data-sidebar": "trigger",
      "data-slot": "sidebar-trigger",
      variant: "ghost",
      size: "icon-sm",
      className: v(t),
      onClick: /* @__PURE__ */ n((s) => {
        e == null || e(s), o();
      }, "onClick"),
      ...r,
      children: [
        i === "primary" ? /* @__PURE__ */ a(Nc, {}) : /* @__PURE__ */ a(Cc, {}),
        /* @__PURE__ */ a("span", { className: "tw:sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
}
n(wh, "SidebarTrigger");
function uh({ className: t, ...e }) {
  const { toggleSidebar: r } = ya();
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
n(uh, "SidebarRail");
function du({ className: t, ...e }) {
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
n(du, "SidebarInset");
function ph({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    ga,
    {
      "data-slot": "sidebar-input",
      "data-sidebar": "input",
      className: v("tw:h-8 tw:w-full tw:bg-background tw:shadow-none", t),
      ...e
    }
  );
}
n(ph, "SidebarInput");
function hh({ className: t, ...e }) {
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
n(hh, "SidebarHeader");
function gh({ className: t, ...e }) {
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
n(gh, "SidebarFooter");
function fh({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    Sr,
    {
      "data-slot": "sidebar-separator",
      "data-sidebar": "separator",
      className: v("tw:mx-2 tw:w-auto tw:bg-sidebar-border", t),
      ...e
    }
  );
}
n(fh, "SidebarSeparator");
function wu({ className: t, ...e }) {
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
n(wu, "SidebarContent");
function Dn({ className: t, ...e }) {
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
n(Dn, "SidebarGroup");
function Mn({
  className: t,
  asChild: e = !1,
  ...r
}) {
  const o = e ? Ir.Root : "div";
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
n(Mn, "SidebarGroupLabel");
function mh({
  className: t,
  asChild: e = !1,
  ...r
}) {
  const o = e ? Ir.Root : "button";
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
n(mh, "SidebarGroupAction");
function On({ className: t, ...e }) {
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
n(On, "SidebarGroupContent");
function uu({ className: t, ...e }) {
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
n(uu, "SidebarMenu");
function pu({ className: t, ...e }) {
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
n(pu, "SidebarMenuItem");
const hu = Ro(
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
function gu({
  asChild: t = !1,
  isActive: e = !1,
  variant: r = "default",
  size: o = "default",
  tooltip: i,
  className: s,
  ...c
}) {
  const l = t ? Ir.Root : "button", { state: d } = ya(), w = /* @__PURE__ */ a(
    l,
    {
      "data-slot": "sidebar-menu-button",
      "data-sidebar": "menu-button",
      "data-size": o,
      "data-active": e,
      className: v(hu({ variant: r, size: o }), s),
      ...c
    }
  );
  return i ? /* @__PURE__ */ p(Ot, { children: [
    /* @__PURE__ */ a(It, { asChild: !0, children: w }),
    /* @__PURE__ */ a(
      $t,
      {
        side: "right",
        align: "center",
        hidden: d !== "collapsed",
        ...typeof i == "string" ? { children: i } : i
      }
    )
  ] }) : w;
}
n(gu, "SidebarMenuButton");
function vh({
  className: t,
  asChild: e = !1,
  showOnHover: r = !1,
  ...o
}) {
  const i = e ? Ir.Root : "button";
  return /* @__PURE__ */ a(
    i,
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
n(vh, "SidebarMenuAction");
function bh({ className: t, ...e }) {
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
n(bh, "SidebarMenuBadge");
function xh({
  className: t,
  showIcon: e = !1,
  ...r
}) {
  const [o] = Xt.useState(() => `${Math.floor(Math.random() * 40) + 50}%`), i = { "--skeleton-width": o };
  return /* @__PURE__ */ p(
    "div",
    {
      "data-slot": "sidebar-menu-skeleton",
      "data-sidebar": "menu-skeleton",
      className: v("tw:flex tw:h-8 tw:items-center tw:gap-2 tw:rounded-md tw:px-2", t),
      ...r,
      children: [
        e && /* @__PURE__ */ a(sr, { className: "tw:size-4 tw:rounded-md", "data-sidebar": "menu-skeleton-icon" }),
        /* @__PURE__ */ a(
          sr,
          {
            className: "tw:h-4 tw:max-w-(--skeleton-width) tw:flex-1",
            "data-sidebar": "menu-skeleton-text",
            style: i
          }
        )
      ]
    }
  );
}
n(xh, "SidebarMenuSkeleton");
function yh({ className: t, ...e }) {
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
n(yh, "SidebarMenuSub");
function kh({ className: t, ...e }) {
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
n(kh, "SidebarMenuSubItem");
function _h({
  asChild: t = !1,
  size: e = "md",
  isActive: r = !1,
  className: o,
  ...i
}) {
  const s = t ? Ir.Root : "a";
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
      ...i
    }
  );
}
n(_h, "SidebarMenuSubButton");
function fu({
  id: t,
  extensionLabels: e,
  projectInfo: r,
  handleSelectSidebarItem: o,
  selectedSidebarItem: i,
  extensionsSidebarGroupLabel: s,
  projectsSidebarGroupLabel: c,
  buttonPlaceholderText: l,
  className: d
}) {
  const w = B(
    (f, m) => {
      o(f, m);
    },
    [o]
  ), u = B(
    (f) => {
      const m = r.find((y) => y.projectId === f);
      return m ? m.projectName : f;
    },
    [r]
  ), h = L(
    () => r.map((f) => ({
      id: f.projectId,
      shortName: f.projectName,
      fullName: f.projectName
    })),
    [r]
  ), g = B(
    (f) => !i.projectId && f === i.label,
    [i]
  );
  return /* @__PURE__ */ a(
    lu,
    {
      id: t,
      collapsible: "none",
      variant: "inset",
      className: v("tw:w-96 tw:gap-2 tw:overflow-y-auto", d),
      children: /* @__PURE__ */ p(wu, { children: [
        /* @__PURE__ */ p(Dn, { children: [
          /* @__PURE__ */ a(Mn, { className: "tw:text-sm", children: s }),
          /* @__PURE__ */ a(On, { children: /* @__PURE__ */ a(uu, { children: Object.entries(e).map(([f, m]) => /* @__PURE__ */ a(pu, { children: /* @__PURE__ */ a(
            gu,
            {
              onClick: /* @__PURE__ */ n(() => w(f), "onClick"),
              isActive: g(f),
              children: /* @__PURE__ */ a("span", { className: "tw:pl-3", children: m })
            }
          ) }, f)) }) })
        ] }),
        /* @__PURE__ */ p(Dn, { children: [
          /* @__PURE__ */ a(Mn, { className: "tw:text-sm", children: c }),
          /* @__PURE__ */ a(On, { className: "tw:pl-3", children: /* @__PURE__ */ p(
            "div",
            {
              className: v(
                "tw:flex tw:w-full tw:items-center tw:gap-2 tw:rounded-md tw:px-2 tw:py-1",
                {
                  "tw:bg-sidebar-accent tw:text-sidebar-accent-foreground": i == null ? void 0 : i.projectId
                }
              ),
              children: [
                /* @__PURE__ */ a(rc, { className: "tw:h-4 tw:w-4 tw:shrink-0" }),
                /* @__PURE__ */ a(
                  bs,
                  {
                    mode: "project",
                    projects: h,
                    openTabs: [],
                    selection: { projectId: (i == null ? void 0 : i.projectId) ?? "" },
                    onChangeSelection: /* @__PURE__ */ n(({ projectId: f }) => {
                      if (!f) return;
                      const m = u(f);
                      w(m, f);
                    }, "onChangeSelection"),
                    buttonVariant: "ghost",
                    buttonClassName: "tw:h-8 tw:w-full tw:flex-1 tw:justify-start tw:font-normal",
                    buttonPlaceholder: l,
                    ariaLabel: c,
                    popoverContentStyle: { zIndex: xs }
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
n(fu, "SettingsSidebar");
function Nh({
  id: t,
  extensionLabels: e,
  projectInfo: r,
  children: o,
  handleSelectSidebarItem: i,
  selectedSidebarItem: s,
  searchValue: c,
  onSearch: l,
  extensionsSidebarGroupLabel: d,
  projectsSidebarGroupLabel: w,
  buttonPlaceholderText: u
}) {
  return /* @__PURE__ */ p("div", { className: "tw:box-border tw:flex tw:h-full tw:flex-col", children: [
    /* @__PURE__ */ a("div", { className: "tw:box-border tw:flex tw:items-center tw:justify-center tw:py-4", children: /* @__PURE__ */ a(
      Fn,
      {
        className: "tw:w-9/12",
        value: c,
        onSearch: l,
        placeholder: "Search app settings, extension settings, and project settings"
      }
    ) }),
    /* @__PURE__ */ p(
      cu,
      {
        id: t,
        className: "tw:h-full tw:flex-1 tw:gap-4 tw:overflow-auto tw:border-t",
        children: [
          /* @__PURE__ */ a(
            fu,
            {
              className: "tw:w-1/2 tw:min-w-[140px] tw:max-w-[220px] tw:border-e",
              extensionLabels: e,
              projectInfo: r,
              handleSelectSidebarItem: i,
              selectedSidebarItem: s,
              extensionsSidebarGroupLabel: d,
              projectsSidebarGroupLabel: w,
              buttonPlaceholderText: u
            }
          ),
          /* @__PURE__ */ a(du, { className: "tw:min-w-[215px]", children: o })
        ]
      }
    )
  ] });
}
n(Nh, "SettingsSidebarContentSearch");
const De = "scrBook", mu = "scrRef", Je = "source", vu = "details", bu = "Scripture Reference", xu = "Scripture Book", Wi = "Type", yu = "Details";
function ku(t, e) {
  const r = e ?? !1;
  return [
    {
      accessorFn: /* @__PURE__ */ n((o) => `${o.start.book} ${o.start.chapterNum}:${o.start.verseNum}`, "accessorFn"),
      id: De,
      header: (t == null ? void 0 : t.scriptureReferenceColumnName) ?? bu,
      cell: /* @__PURE__ */ n((o) => {
        const i = o.row.original;
        return o.row.getIsGrouped() ? Dt.bookIdToEnglishName(i.start.book) : o.row.groupingColumnId === De ? Ce(i.start) : void 0;
      }, "cell"),
      getGroupingValue: /* @__PURE__ */ n((o) => Dt.bookIdToNumber(o.start.book), "getGroupingValue"),
      sortingFn: /* @__PURE__ */ n((o, i) => Za(o.original.start, i.original.start), "sortingFn"),
      enableGrouping: !0
    },
    {
      accessorFn: /* @__PURE__ */ n((o) => Ce(o.start), "accessorFn"),
      id: mu,
      header: void 0,
      cell: /* @__PURE__ */ n((o) => {
        const i = o.row.original;
        return o.row.getIsGrouped() ? void 0 : Ce(i.start);
      }, "cell"),
      sortingFn: /* @__PURE__ */ n((o, i) => Za(o.original.start, i.original.start), "sortingFn"),
      enableGrouping: !1
    },
    {
      accessorFn: /* @__PURE__ */ n((o) => o.source.displayName, "accessorFn"),
      id: Je,
      header: r ? (t == null ? void 0 : t.typeColumnName) ?? Wi : void 0,
      cell: /* @__PURE__ */ n((o) => r || o.row.getIsGrouped() ? o.getValue() : void 0, "cell"),
      getGroupingValue: /* @__PURE__ */ n((o) => o.source.id, "getGroupingValue"),
      sortingFn: /* @__PURE__ */ n((o, i) => o.original.source.displayName.localeCompare(i.original.source.displayName), "sortingFn"),
      enableGrouping: !0
    },
    {
      accessorFn: /* @__PURE__ */ n((o) => o.detail, "accessorFn"),
      id: vu,
      header: (t == null ? void 0 : t.detailsColumnName) ?? yu,
      cell: /* @__PURE__ */ n((o) => o.getValue(), "cell"),
      enableGrouping: !1
    }
  ];
}
n(ku, "getColumns");
const _u = /* @__PURE__ */ n((t) => {
  if (!("offset" in t.start))
    throw new Error("No offset available in range start");
  if (t.end && !("offset" in t.end))
    throw new Error("No offset available in range end");
  const { offset: e } = t.start;
  let r = 0;
  return t.end && ({ offset: r } = t.end), !t.end || Za(t.start, t.end) === 0 ? `${za(t.start)}+${e}` : `${za(t.start)}+${e}-${za(t.end)}+${r}`;
}, "toRefOrRange"), In = /* @__PURE__ */ n((t) => `${_u({ start: t.start, end: t.end })} ${t.source.displayName} ${t.detail}`, "getRowKey");
function Ch({
  sources: t,
  showColumnHeaders: e = !1,
  showSourceColumn: r = !1,
  scriptureReferenceColumnName: o,
  scriptureBookGroupName: i,
  typeColumnName: s,
  detailsColumnName: c,
  onRowSelected: l,
  id: d
}) {
  const [w, u] = N([]), [h, g] = N([{ id: De, desc: !1 }]), [f, m] = N({}), y = L(
    () => t.flatMap((M) => M.data.map((K) => ({
      ...K,
      source: M.source
    }))),
    [t]
  ), b = L(
    () => ku(
      {
        scriptureReferenceColumnName: o,
        typeColumnName: s,
        detailsColumnName: c
      },
      r
    ),
    [o, s, c, r]
  );
  Y(() => {
    w.includes(Je) ? g([
      { id: Je, desc: !1 },
      { id: De, desc: !1 }
    ]) : g([{ id: De, desc: !1 }]);
  }, [w]);
  const z = pi({
    data: y,
    columns: b,
    state: {
      grouping: w,
      sorting: h,
      rowSelection: f
    },
    onGroupingChange: u,
    onSortingChange: g,
    onRowSelectionChange: m,
    getExpandedRowModel: Rl(),
    getGroupedRowModel: Sl(),
    getCoreRowModel: gi(),
    getSortedRowModel: hi(),
    getRowId: In,
    autoResetExpanded: !1,
    enableMultiRowSelection: !1,
    enableSubRowSelection: !1
  });
  Y(() => {
    if (l) {
      const M = z.getSelectedRowModel().rowsById, K = Object.keys(M);
      if (K.length === 1) {
        const X = y.find((H) => In(H) === K[0]) || void 0;
        X && l(X);
      }
    }
  }, [f, y, l, z]);
  const k = i ?? xu, E = s ?? Wi, T = [
    { label: "No Grouping", value: [] },
    { label: `Group by ${k}`, value: [De] },
    { label: `Group by ${E}`, value: [Je] },
    {
      label: `Group by ${k} and ${E}`,
      value: [De, Je]
    },
    {
      label: `Group by ${E} and ${k}`,
      value: [Je, De]
    }
  ], P = /* @__PURE__ */ n((M) => {
    u(JSON.parse(M));
  }, "handleSelectChange"), S = /* @__PURE__ */ n((M, K) => {
    !M.getIsGrouped() && !M.getIsSelected() && M.getToggleSelectedHandler()(K);
  }, "handleRowClick"), U = /* @__PURE__ */ n((M, K) => M.getIsGrouped() ? "" : v("banded-row", K % 2 === 0 ? "even" : "odd"), "getEvenOrOddBandingStyle"), V = /* @__PURE__ */ n((M, K, X) => {
    if (!((M == null ? void 0 : M.length) === 0 || K.depth < X.column.getGroupedIndex())) {
      if (K.getIsGrouped())
        switch (K.depth) {
          case 1:
            return "tw:ps-4";
          default:
            return;
        }
      switch (K.depth) {
        case 1:
          return "tw:ps-8";
        case 2:
          return "tw:ps-12";
        default:
          return;
      }
    }
  }, "getIndent");
  return /* @__PURE__ */ p("div", { id: d, className: "pr-twp tw:flex tw:h-full tw:w-full tw:flex-col", children: [
    !e && /* @__PURE__ */ p(
      ur,
      {
        value: JSON.stringify(w),
        onValueChange: /* @__PURE__ */ n((M) => {
          P(M);
        }, "onValueChange"),
        children: [
          /* @__PURE__ */ a(hr, { className: "tw:mb-1 tw:mt-2", children: /* @__PURE__ */ a(pr, {}) }),
          /* @__PURE__ */ a(gr, { position: "item-aligned", children: /* @__PURE__ */ a(Nw, { children: T.map((M) => /* @__PURE__ */ a(de, { value: JSON.stringify(M.value), children: M.label }, M.label)) }) })
        ]
      }
    ),
    /* @__PURE__ */ p(mo, { className: "tw:relative tw:flex tw:flex-col tw:overflow-y-auto tw:p-0", children: [
      e && /* @__PURE__ */ a(vo, { children: z.getHeaderGroups().map((M) => /* @__PURE__ */ a(Me, { children: M.headers.filter((K) => K.column.columnDef.header).map((K) => (
        /* For sticky column headers to work, we probably need to change the default definition of the shadcn Table component. See https://github.com/shadcn-ui/ui/issues/1151 */
        /* @__PURE__ */ a(aa, { colSpan: K.colSpan, className: "tw:sticky top-0", children: K.isPlaceholder ? void 0 : /* @__PURE__ */ p("div", { children: [
          K.column.getCanGroup() ? /* @__PURE__ */ a(
            J,
            {
              variant: "ghost",
              title: `Toggle grouping by ${K.column.columnDef.header}`,
              onClick: K.column.getToggleGroupingHandler(),
              type: "button",
              children: K.column.getIsGrouped() ? "🛑" : "👊 "
            }
          ) : void 0,
          " ",
          Cr(K.column.columnDef.header, K.getContext())
        ] }) }, K.id)
      )) }, M.id)) }),
      /* @__PURE__ */ a(bo, { children: z.getRowModel().rows.map((M, K) => {
        const X = ke();
        return /* @__PURE__ */ a(
          Me,
          {
            "data-state": M.getIsSelected() ? "selected" : "",
            className: v(U(M, K)),
            onClick: /* @__PURE__ */ n((H) => S(M, H), "onClick"),
            children: M.getVisibleCells().map((H) => {
              if (!(H.getIsPlaceholder() || H.column.columnDef.enableGrouping && !H.getIsGrouped() && (H.column.columnDef.id !== Je || !r)))
                return /* @__PURE__ */ a(
                  cr,
                  {
                    className: v(
                      H.column.columnDef.id,
                      "tw:p-[1px]",
                      V(w, M, H)
                    ),
                    children: H.getIsGrouped() ? /* @__PURE__ */ p(
                      J,
                      {
                        variant: "link",
                        onClick: M.getToggleExpandedHandler(),
                        type: "button",
                        children: [
                          M.getIsExpanded() && /* @__PURE__ */ a(dr, {}),
                          !M.getIsExpanded() && (X === "ltr" ? /* @__PURE__ */ a(Xa, {}) : /* @__PURE__ */ a(Ya, {})),
                          " ",
                          Cr(H.column.columnDef.cell, H.getContext()),
                          " (",
                          M.subRows.length,
                          ")"
                        ]
                      }
                    ) : Cr(H.column.columnDef.cell, H.getContext())
                  },
                  H.id
                );
            })
          },
          M.id
        );
      }) })
    ] })
  ] });
}
n(Ch, "ScriptureResultsViewer");
function Nu({
  availableBookInfo: t,
  selectedBookIds: e,
  onChangeSelectedBookIds: r,
  localizedStrings: o,
  localizedBookNames: i,
  disabledSectionExplanations: s
}) {
  const c = o["%webView_book_selector_books_selected%"], l = o["%webView_book_selector_select_books%"], d = o["%webView_book_selector_search_books%"], w = o["%webView_book_selector_select_all%"], u = o["%webView_book_selector_clear_all%"], h = o["%webView_book_selector_no_book_found%"], { otLong: g, ntLong: f, dcLong: m, extraLong: y } = {
    otLong: o == null ? void 0 : o["%scripture_section_ot_long%"],
    ntLong: o == null ? void 0 : o["%scripture_section_nt_long%"],
    dcLong: o == null ? void 0 : o["%scripture_section_dc_long%"],
    extraLong: o == null ? void 0 : o["%scripture_section_extra_long%"]
  }, [b, z] = N(!1), [k, E] = N(""), T = q(void 0), P = q(!1), S = L(
    () => Un(t),
    [t]
  ), U = L(() => {
    if (!k.trim()) {
      const C = {
        [Et.OT]: [],
        [Et.NT]: [],
        [Et.DC]: [],
        [Et.Extra]: []
      };
      return S.forEach((D) => {
        const G = Wr(D);
        C[G].push(D);
      }), C;
    }
    const $ = S.filter(
      (C) => po(C, k, i)
    ), et = {
      [Et.OT]: [],
      [Et.NT]: [],
      [Et.DC]: [],
      [Et.Extra]: []
    };
    return $.forEach((C) => {
      const D = Wr(C);
      et[D].push(C);
    }), et;
  }, [S, k, i]), V = B(
    ($, et = !1) => {
      if (!et || !T.current) {
        r(
          e.includes($) ? e.filter((ht) => ht !== $) : [...e, $]
        ), T.current = $;
        return;
      }
      const C = S.findIndex((ht) => ht === T.current), D = S.findIndex((ht) => ht === $);
      if (C === -1 || D === -1) return;
      const [G, it] = [
        Math.min(C, D),
        Math.max(C, D)
      ], ot = S.slice(G, it + 1).map((ht) => ht);
      r(
        e.includes($) ? e.filter((ht) => !ot.includes(ht)) : [.../* @__PURE__ */ new Set([...e, ...ot])]
      );
    },
    [e, r, S]
  ), M = /* @__PURE__ */ n(($) => {
    V($, P.current), P.current = !1;
  }, "handleKeyboardSelect"), K = /* @__PURE__ */ n(($, et) => {
    $.preventDefault(), V(et, $.shiftKey);
  }, "handleMouseDown"), X = /* @__PURE__ */ n(() => {
    r(S.map(($) => $));
  }, "handleSelectAll"), H = /* @__PURE__ */ n(() => {
    r([]);
  }, "handleClearAll"), tt = L(
    () => Object.values(Et).filter(
      ($) => (s == null ? void 0 : s[$]) !== void 0 && xo(S, $).length === 0
    ).map(($) => ({ section: $, explanation: s == null ? void 0 : s[$] })),
    [s, S]
  );
  return /* @__PURE__ */ p(
    Ae,
    {
      open: b,
      onOpenChange: /* @__PURE__ */ n(($) => {
        z($), $ || E("");
      }, "onOpenChange"),
      children: [
        /* @__PURE__ */ a(tr, { asChild: !0, children: /* @__PURE__ */ p(
          J,
          {
            variant: "outline",
            role: "combobox",
            "aria-expanded": b,
            className: "tw:max-w-64 tw:justify-between",
            children: [
              e.length > 0 ? `${c}: ${e.length}` : l,
              /* @__PURE__ */ a(ac, { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
            ]
          }
        ) }),
        /* @__PURE__ */ a(
          Ve,
          {
            className: "tw:max-h-(--radix-popover-content-available-height) tw:w-[500px] tw:max-w-[calc(100vw-2rem)] tw:p-0",
            align: "start",
            collisionPadding: 8,
            children: /* @__PURE__ */ p(
              Le,
              {
                className: "tw:min-h-0",
                shouldFilter: !1,
                onKeyDown: /* @__PURE__ */ n(($) => {
                  $.key === "Enter" && (P.current = $.shiftKey);
                }, "onKeyDown"),
                children: [
                  /* @__PURE__ */ a(
                    pa,
                    {
                      className: "tw:shrink-0",
                      placeholder: d,
                      value: k,
                      onValueChange: E,
                      spaceSelectsHighlightedItem: !0
                    }
                  ),
                  /* @__PURE__ */ p("div", { className: "tw:flex tw:shrink-0 tw:justify-between tw:border-b tw:p-2", children: [
                    /* @__PURE__ */ a(
                      J,
                      {
                        variant: "ghost",
                        size: "sm",
                        onClick: X,
                        disabled: S.length === 0,
                        children: w
                      }
                    ),
                    /* @__PURE__ */ a(J, { variant: "ghost", size: "sm", onClick: H, children: u })
                  ] }),
                  /* @__PURE__ */ p(je, { className: "tw:max-h-72 tw:min-h-0 tw:flex-1", children: [
                    /* @__PURE__ */ a(ha, { children: h }),
                    Object.values(Et).filter(($) => U[$].length > 0).map(($, et) => {
                      const C = U[$];
                      return /* @__PURE__ */ p(ma, { children: [
                        et > 0 && /* @__PURE__ */ a(Bn, { alwaysRender: !0 }),
                        /* @__PURE__ */ a(
                          Te,
                          {
                            heading: Pn($, g, f, m, y),
                            children: C.map((D) => /* @__PURE__ */ a(
                              fi,
                              {
                                bookId: D,
                                isSelected: e.includes(D),
                                onSelect: /* @__PURE__ */ n(() => M(D), "onSelect"),
                                onMouseDown: /* @__PURE__ */ n((G) => K(G, D), "onMouseDown"),
                                section: Wr(D),
                                showCheck: !0,
                                localizedBookNames: i,
                                commandValue: mi(D, i),
                                className: "tw:flex tw:items-center"
                              },
                              D
                            ))
                          }
                        )
                      ] }, $);
                    })
                  ] }),
                  tt.length > 0 && /* @__PURE__ */ a("div", { className: "tw:shrink-0 tw:border-t tw:p-2", children: tt.map(({ section: $, explanation: et }) => /* @__PURE__ */ a("p", { className: "tw:text-xs tw:text-muted-foreground", children: et }, $)) })
                ]
              }
            )
          }
        )
      ]
    }
  );
}
n(Nu, "SelectBooksPicker");
function Cu({
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
n(Cu, "DisabledTooltipWrapper");
function Eu({
  disabled: t,
  tooltipText: e,
  children: r,
  className: o
}) {
  return /* @__PURE__ */ a(Mt, { children: /* @__PURE__ */ p(Ot, { children: [
    /* @__PURE__ */ a(It, { asChild: !0, children: /* @__PURE__ */ a(
      Cu,
      {
        className: o,
        isDisabled: t,
        disabledExplanation: e,
        children: r
      }
    ) }),
    t && /* @__PURE__ */ a($t, { children: /* @__PURE__ */ a("p", { className: "tw:max-w-xs tw:whitespace-pre-line", children: e }) })
  ] }) });
}
n(Eu, "DisabledActionTooltip");
function Tu({
  section: t,
  availableBookIds: e,
  selectedBookIds: r,
  onToggle: o,
  localizedStrings: i,
  disabledExplanation: s
}) {
  const c = xo(e, t).length === 0, l = i["%scripture_section_ot_short%"], d = i["%scripture_section_nt_short%"], w = i["%scripture_section_dc_short%"], u = i["%scripture_section_extra_short%"], h = /* @__PURE__ */ a(
    J,
    {
      variant: "outline",
      size: "sm",
      onClick: /* @__PURE__ */ n(() => o(t), "onClick"),
      className: v(
        Kn(e, t, r) && !c && "tw:bg-primary tw:text-primary-foreground tw:hover:bg-primary/70 tw:hover:text-primary-foreground"
      ),
      disabled: c,
      children: ys(
        t,
        l,
        d,
        w,
        u
      )
    }
  );
  return s ? /* @__PURE__ */ a(
    Eu,
    {
      className: "tw:flex",
      disabled: c,
      tooltipText: s,
      children: h
    }
  ) : h;
}
n(Tu, "SectionButton");
const $n = 5, Ua = 6;
function Su({
  availableBookInfo: t,
  selectedBookIds: e,
  onChangeSelectedBookIds: r,
  localizedStrings: o,
  localizedBookNames: i,
  disabledSectionExplanations: s
}) {
  const c = o["%webView_book_selector_more%"], l = L(
    () => Un(t),
    [t]
  ), d = B(
    (w) => {
      const u = xo(l, w).map((h) => h);
      r(
        Kn(l, w, e) ? e.filter((h) => !u.includes(h)) : [.../* @__PURE__ */ new Set([...e, ...u])]
      );
    },
    [e, r, l]
  );
  return /* @__PURE__ */ p("div", { className: "tw:space-y-2", children: [
    /* @__PURE__ */ a("div", { className: "tw:flex tw:flex-wrap tw:gap-2", children: Object.values(Et).map((w) => /* @__PURE__ */ a(
      Tu,
      {
        section: w,
        availableBookIds: l,
        selectedBookIds: e,
        onToggle: d,
        localizedStrings: o,
        disabledExplanation: s == null ? void 0 : s[w]
      },
      w
    )) }),
    /* @__PURE__ */ a(
      Nu,
      {
        availableBookInfo: t,
        selectedBookIds: e,
        onChangeSelectedBookIds: r,
        localizedStrings: o,
        localizedBookNames: i,
        disabledSectionExplanations: s
      }
    ),
    e.length > 0 && /* @__PURE__ */ p("div", { className: "tw:mt-2 tw:flex tw:flex-wrap tw:gap-1", children: [
      e.slice(
        0,
        e.length === Ua ? Ua : $n
      ).map((w) => /* @__PURE__ */ a(Tr, { className: "tw:hover:bg-secondary", variant: "secondary", children: ve(w, i) }, w)),
      e.length > Ua && /* @__PURE__ */ a(
        Tr,
        {
          className: "tw:hover:bg-secondary",
          variant: "secondary",
          children: `+${e.length - $n} ${c}`
        }
      )
    ] })
  ] });
}
n(Su, "SelectBooks");
const Ru = Object.freeze([
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
]), Eh = Object.freeze([
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
  ...Ru
]), zt = /* @__PURE__ */ n((t, e) => t[e] ?? e, "localizeString$1"), zu = Object.freeze([" ", "-"]);
function Th({
  scope: t,
  availableScopes: e,
  onScopeChange: r,
  availableBookInfo: o,
  selectedBookIds: i,
  onSelectedBookIdsChange: s,
  localizedStrings: c,
  localizedBookNames: l,
  disabledSectionExplanations: d,
  id: w,
  variant: u = "radio",
  rangeStart: h,
  rangeEnd: g,
  onRangeStartChange: f,
  onRangeEndChange: m,
  currentScrRef: y,
  onCurrentScrRefChange: b,
  bookChapterControlLocalizedStrings: z,
  getEndVerse: k,
  hideLabel: E = !1,
  buttonClassName: T
}) {
  const P = zt(
    c,
    "%webView_scope_selector_selected_text%"
  ), S = zt(c, "%webView_scope_selector_verse%"), U = zt(c, "%webView_scope_selector_chapter%"), V = zt(c, "%webView_scope_selector_book%"), M = zt(
    c,
    "%webView_scope_selector_current_verse%"
  ), K = zt(
    c,
    "%webView_scope_selector_current_chapter%"
  ), X = zt(c, "%webView_scope_selector_current_book%"), H = zt(c, "%webView_scope_selector_choose_books%"), tt = zt(c, "%webView_scope_selector_scope%"), $ = zt(c, "%webView_scope_selector_select_books%"), et = zt(c, "%webView_scope_selector_range%"), C = zt(c, "%webView_scope_selector_select_range%"), D = zt(c, "%webView_scope_selector_range_start%"), G = zt(c, "%webView_scope_selector_range_end%"), it = zt(c, "%webView_scope_selector_ok%"), ot = zt(c, "%webView_scope_selector_cancel%"), ht = zt(c, "%webView_scope_selector_navigate%"), wt = /* @__PURE__ */ n((I) => {
    if (!y) return;
    const Q = y.book.toUpperCase();
    switch (I) {
      case "verse":
        return Ce(y, "id");
      case "chapter":
        return `${Q} ${y.chapterNum}`;
      case "book":
        return Q;
      default:
        return;
    }
  }, "getScrRefSuffix"), Z = [
    { value: "selectedText", label: P, id: "scope-selected-text" },
    {
      value: "verse",
      label: S,
      dropdownLabel: M,
      scrRefSuffix: wt("verse"),
      id: "scope-verse"
    },
    {
      value: "chapter",
      label: U,
      dropdownLabel: K,
      scrRefSuffix: wt("chapter"),
      id: "scope-chapter"
    },
    {
      value: "book",
      label: V,
      dropdownLabel: X,
      scrRefSuffix: wt("book"),
      id: "scope-book"
    },
    { value: "selectedBooks", label: H, id: "scope-selected" },
    { value: "range", label: et, id: "scope-range" }
  ], ut = /* @__PURE__ */ n((I, Q, Ct = !1) => /* @__PURE__ */ p(dt, { children: [
    I,
    Q && !Ct && /* @__PURE__ */ p("span", { className: "tw:text-muted-foreground", children: [
      ": ",
      Q
    ] })
  ] }), "renderScopeLabel"), ft = e ? Z.filter((I) => e.includes(I.value)) : Z, mt = y ?? Da, vt = h ?? mt, Zt = g ?? mt, bt = /* @__PURE__ */ n(() => {
  }, "noopScrRefChange"), At = q(null), Vt = q(null), xt = q(!1), Ft = q(null), St = q(!1), [Ut, lt] = N(void 0), _t = q(!1), Lt = q(!1), se = q(null), ce = B((I) => {
    if (I) {
      lt("start"), _t.current = !1;
      return;
    }
    lt((Q) => Q === "start" ? void 0 : Q), _t.current && (_t.current = !1, requestAnimationFrame(() => {
      var Ct;
      const Q = (Ct = At.current) == null ? void 0 : Ct.querySelector("button");
      Q == null || Q.click();
    }));
  }, []), Kt = B((I) => {
    if (I) {
      lt("end"), Lt.current = !1;
      return;
    }
    lt((Q) => Q === "end" ? void 0 : Q);
  }, []), qe = B(
    (I) => {
      f == null || f(I), m == null || m(I), _t.current = !0;
    },
    [f, m]
  ), qt = B(
    (I) => {
      m == null || m(I), Lt.current = !0;
    },
    [m]
  ), oe = B(
    (I) => {
      r(I), I === "selectedBooks" && i.length === 0 && (y != null && y.book) && s([y.book]);
    },
    [r, i, y, s]
  ), Qt = ft.find((I) => I.value === t), O = /* @__PURE__ */ n(() => t === "selectedBooks" && i.length > 0 ? i.map((I) => I.toUpperCase()).join(", ") : t === "range" ? mc(vt, Zt, {
    optionOrLocalizedBookName: "id",
    endRefOptionOrLocalizedBookName: "id",
    repeatBookName: !0
  }) : Qt ? ut(Qt.label, Qt.scrRefSuffix) : t, "renderTriggerContent"), le = ft.filter(
    (I) => I.value !== "selectedBooks" && I.value !== "range"
  ), jt = ft.find((I) => I.value === "selectedBooks"), Ht = ft.find((I) => I.value === "range"), [pe, he] = N(!1), [R, F] = N(void 0), [W, x] = N(void 0), [j, A] = N(void 0), [rt, ct] = N(void 0), [gt, yt] = N([]), Nt = u === "dropdown" && R === "selectedBooks", Bt = /* @__PURE__ */ a(
    Su,
    {
      availableBookInfo: o,
      selectedBookIds: Nt ? gt : i,
      onChangeSelectedBookIds: Nt ? yt : s,
      localizedStrings: c,
      localizedBookNames: l,
      disabledSectionExplanations: d
    }
  ), ae = Ut === "end", $r = Ut === "start", ar = "tw:text-muted-foreground", He = u === "dropdown" && R === "range", Pr = He ? A : qe, Ar = He ? ct : m ? qt : bt, mr = /* @__PURE__ */ p("div", { className: "tw:flex tw:flex-wrap tw:items-end tw:gap-4", children: [
    /* @__PURE__ */ p("div", { className: "tw:grid tw:gap-2", children: [
      /* @__PURE__ */ a(Tt, { htmlFor: "scope-range-start", className: v(ae && ar), children: D }),
      /* @__PURE__ */ a(
        Oa,
        {
          id: "scope-range-start",
          scrRef: He ? j ?? vt : vt,
          handleSubmit: Pr,
          localizedBookNames: l,
          localizedStrings: z,
          getEndVerse: k,
          submitKeys: zu,
          onOpenChange: ce,
          className: v(ae && ar),
          modal: !0
        }
      )
    ] }),
    /* @__PURE__ */ p("div", { ref: At, className: "tw:grid tw:gap-2", children: [
      /* @__PURE__ */ a(Tt, { htmlFor: "scope-range-end", className: v($r && ar), children: G }),
      /* @__PURE__ */ a(
        Oa,
        {
          id: "scope-range-end",
          scrRef: He ? rt ?? Zt : Zt,
          handleSubmit: Ar,
          localizedBookNames: l,
          localizedStrings: z,
          getEndVerse: k,
          disableReferencesUpTo: He ? j ?? vt : vt,
          onOpenChange: Kt,
          onCloseAutoFocus: /* @__PURE__ */ n((I) => {
            var Q;
            Lt.current && (Lt.current = !1, I.preventDefault(), (Q = se.current) == null || Q.focus());
          }, "onCloseAutoFocus"),
          className: v($r && ar),
          modal: !0,
          align: "start"
        }
      )
    ] })
  ] }), Vr = q({}), vr = B(
    (I) => (Q) => {
      Vr.current[I] = Q;
    },
    []
  ), br = q(null);
  Y(() => {
    if (!pe) return;
    let I = 0;
    const Q = requestAnimationFrame(() => {
      I = requestAnimationFrame(() => {
        var Ct;
        (Ct = Vr.current[t]) == null || Ct.focus();
      });
    });
    return () => {
      cancelAnimationFrame(Q), I && cancelAnimationFrame(I);
    };
  }, [pe, t]);
  const [Ge, Lr] = N(null), [We, _a] = N(null), [Ye, Na] = N(null), Ca = 200, [Ea, Ta] = N(!1);
  Y(() => {
    if (!Ye || typeof ResizeObserver > "u") return;
    const I = new ResizeObserver(([Q]) => {
      Ta(Q.contentRect.width < Ca);
    });
    return I.observe(Ye), () => I.disconnect();
  }, [Ye]);
  const jr = B(
    (I) => {
      x(I), A(vt), ct(Zt), yt(i), he(!1), F(I);
    },
    [vt, Zt, i]
  ), Br = B(() => {
    W !== void 0 && (W === "range" ? (j && (f == null || f(j)), rt && (m == null || m(rt))) : W === "selectedBooks" && s(gt), oe(W), F(void 0), x(void 0));
  }, [
    W,
    j,
    rt,
    gt,
    f,
    m,
    s,
    oe
  ]), _ = B((I) => {
    I || (F(void 0), x(void 0));
  }, []), at = B((I) => {
    var Q;
    I.preventDefault(), (Q = br.current) == null || Q.focus();
  }, []), nt = /* @__PURE__ */ n((I) => t === I ? /* @__PURE__ */ a("span", { className: "tw:absolute tw:flex tw:h-3.5 tw:w-3.5 tw:items-center tw:justify-center tw:ltr:left-2 tw:rtl:right-2", children: /* @__PURE__ */ a($e, { className: "tw:h-4 tw:w-4" }) }) : void 0, "renderDialogLauncherCheck");
  return /* @__PURE__ */ p("div", { id: w, className: "tw:grid tw:gap-4", children: [
    /* @__PURE__ */ p("div", { className: "tw:grid tw:gap-2", children: [
      !E && /* @__PURE__ */ a(Tt, { children: tt }),
      u === "dropdown" ? /* @__PURE__ */ p(Be, { open: pe, onOpenChange: he, children: [
        /* @__PURE__ */ a(Fe, { asChild: !0, children: /* @__PURE__ */ p(
          J,
          {
            ref: br,
            variant: "outline",
            role: "combobox",
            className: v(
              "tw:w-full tw:justify-between tw:overflow-hidden tw:font-normal",
              T
            ),
            children: [
              /* @__PURE__ */ a("span", { className: "tw:min-w-0 tw:flex-1 tw:truncate tw:text-start", children: O() }),
              /* @__PURE__ */ a(dr, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
            ]
          }
        ) }),
        /* @__PURE__ */ a(
          Ue,
          {
            ref: Na,
            className: "tw:w-[var(--radix-dropdown-menu-trigger-width)] tw:min-w-[12rem]",
            align: "start",
            children: /* @__PURE__ */ p(Sa, { container: Ye, children: [
              le.map(({ value: I, label: Q, dropdownLabel: Ct, scrRefSuffix: ge, id: Gt }) => /* @__PURE__ */ p(
                Ze,
                {
                  ref: vr(I),
                  className: "tw:relative tw:ps-8 data-[highlighted]:tw:bg-accent data-[highlighted]:tw:text-accent-foreground",
                  onSelect: /* @__PURE__ */ n(() => oe(I), "onSelect"),
                  "data-selected": t === I ? "true" : void 0,
                  children: [
                    t === I && /* @__PURE__ */ a("span", { className: "tw:absolute tw:flex tw:h-3.5 tw:w-3.5 tw:items-center tw:justify-center tw:ltr:left-2 tw:rtl:right-2", children: /* @__PURE__ */ a($e, { className: "tw:h-4 tw:w-4" }) }),
                    ut(Ct ?? Q, ge, Ea)
                  ]
                },
                Gt
              )),
              (jt || Ht) && /* @__PURE__ */ a(Qe, {}),
              jt && /* @__PURE__ */ p(
                Ze,
                {
                  ref: vr("selectedBooks"),
                  className: v(
                    "tw:relative tw:ps-8",
                    "data-[highlighted]:tw:bg-accent data-[highlighted]:tw:text-accent-foreground"
                  ),
                  onSelect: /* @__PURE__ */ n(() => jr("selectedBooks"), "onSelect"),
                  "data-selected": t === "selectedBooks" ? "true" : void 0,
                  children: [
                    nt("selectedBooks"),
                    `${jt.label}…`
                  ]
                }
              ),
              Ht && /* @__PURE__ */ p(
                Ze,
                {
                  ref: vr("range"),
                  className: v(
                    "tw:relative tw:ps-8",
                    "data-[highlighted]:tw:bg-accent data-[highlighted]:tw:text-accent-foreground"
                  ),
                  onSelect: /* @__PURE__ */ n(() => jr("range"), "onSelect"),
                  "data-selected": t === "range" ? "true" : void 0,
                  children: [
                    nt("range"),
                    `${Ht.label}…`
                  ]
                }
              ),
              b && /* @__PURE__ */ p(dt, { children: [
                /* @__PURE__ */ a(Qe, {}),
                /* @__PURE__ */ a(Dr, { className: "tw:px-2 tw:py-1.5 tw:text-xs tw:font-medium tw:text-muted-foreground", children: ht }),
                /* @__PURE__ */ a(
                  Ze,
                  {
                    ref: Ft,
                    className: "tw:p-0",
                    onSelect: /* @__PURE__ */ n((I) => {
                      var Q, Ct;
                      if (I.preventDefault(), xt.current) {
                        xt.current = !1;
                        return;
                      }
                      St.current || (Ct = (Q = Vt.current) == null ? void 0 : Q.querySelector("button")) == null || Ct.click();
                    }, "onSelect"),
                    children: /* @__PURE__ */ a(
                      "div",
                      {
                        ref: Vt,
                        className: "tw:w-full tw:px-1 tw:pb-1",
                        onPointerDownCapture: /* @__PURE__ */ n((I) => {
                          const Q = I.target instanceof HTMLElement ? I.target : void 0;
                          Q != null && Q.closest("button") && (xt.current = !0, requestAnimationFrame(() => {
                            xt.current = !1;
                          }));
                        }, "onPointerDownCapture"),
                        children: /* @__PURE__ */ a(
                          Oa,
                          {
                            id: "scope-navigate",
                            scrRef: y ?? Da,
                            handleSubmit: b,
                            localizedBookNames: l,
                            localizedStrings: z,
                            getEndVerse: k,
                            triggerVariant: "ghost",
                            onOpenChange: /* @__PURE__ */ n((I) => {
                              St.current = I;
                            }, "onOpenChange"),
                            onCloseAutoFocus: /* @__PURE__ */ n((I) => {
                              var Q;
                              I.preventDefault(), (Q = Ft.current) == null || Q.focus();
                            }, "onCloseAutoFocus"),
                            modal: !0,
                            className: "tw:w-full tw:min-w-0 tw:max-w-none tw:justify-between tw:px-2 tw:font-normal",
                            triggerContent: /* @__PURE__ */ p(dt, { children: [
                              /* @__PURE__ */ a("span", { className: "tw:min-w-0 tw:flex-1 tw:truncate tw:text-start", children: Ce(y ?? Da, "id") }),
                              /* @__PURE__ */ a(dr, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
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
        ho,
        {
          value: t,
          onValueChange: oe,
          className: "tw:flex tw:flex-col tw:space-y-1",
          children: ft.map(({ value: I, label: Q, scrRefSuffix: Ct, id: ge }) => /* @__PURE__ */ p("div", { className: "tw:flex tw:items-center", children: [
            /* @__PURE__ */ a(ra, { className: "tw:me-2", value: I, id: ge }),
            /* @__PURE__ */ a(Tt, { htmlFor: ge, children: ut(Q, Ct) })
          ] }, ge))
        }
      )
    ] }),
    u === "radio" && t === "selectedBooks" && /* @__PURE__ */ p("div", { className: "tw:grid tw:gap-2", children: [
      /* @__PURE__ */ a(Tt, { children: $ }),
      Bt
    ] }),
    u === "radio" && t === "range" && mr,
    u === "dropdown" && jt && /* @__PURE__ */ a(Ka, { open: R === "selectedBooks", onOpenChange: _, children: /* @__PURE__ */ a(
      qa,
      {
        ref: _a,
        onCloseAutoFocus: at,
        onEscapeKeyDown: /* @__PURE__ */ n((I) => {
          We != null && We.querySelector('[data-state="open"]') && I.preventDefault();
        }, "onEscapeKeyDown"),
        children: /* @__PURE__ */ p(Sa, { container: We, children: [
          /* @__PURE__ */ a(Ha, { className: "tw:pe-8", children: /* @__PURE__ */ a(Ga, { children: H }) }),
          Bt,
          /* @__PURE__ */ p(Ho, { children: [
            /* @__PURE__ */ a(J, { variant: "outline", onClick: /* @__PURE__ */ n(() => _(!1), "onClick"), children: ot }),
            /* @__PURE__ */ a(J, { onClick: Br, children: it })
          ] })
        ] })
      }
    ) }),
    u === "dropdown" && Ht && /* @__PURE__ */ a(Ka, { open: R === "range", onOpenChange: _, children: /* @__PURE__ */ a(
      qa,
      {
        ref: Lr,
        onCloseAutoFocus: at,
        onEscapeKeyDown: /* @__PURE__ */ n((I) => {
          Ge != null && Ge.querySelector('[data-state="open"]') && I.preventDefault();
        }, "onEscapeKeyDown"),
        children: /* @__PURE__ */ p(Sa, { container: Ge, children: [
          /* @__PURE__ */ a(Ha, { className: "tw:pe-8", children: /* @__PURE__ */ a(Ga, { children: C }) }),
          mr,
          /* @__PURE__ */ p(Ho, { children: [
            /* @__PURE__ */ a(J, { variant: "outline", onClick: /* @__PURE__ */ n(() => _(!1), "onClick"), children: ot }),
            /* @__PURE__ */ a(J, { ref: se, onClick: Br, children: it })
          ] })
        ] })
      }
    ) })
  ] });
}
n(Th, "ScopeSelector");
function Sh({
  availableScrollGroupIds: t,
  scrollGroupId: e,
  onChangeScrollGroupId: r,
  localizedStrings: o = {},
  size: i = "sm",
  className: s,
  id: c,
  disabled: l
}) {
  const d = {
    ...Ra,
    ...Object.fromEntries(
      Object.entries(o).map(
        ([u, h]) => [
          u,
          u === h && u in Ra ? Ra[u] : h
        ]
      )
    )
  }, w = ke();
  return /* @__PURE__ */ p(
    ur,
    {
      value: `${e}`,
      onValueChange: /* @__PURE__ */ n((u) => r(
        u === "undefined" ? void 0 : parseInt(u, 10)
      ), "onValueChange"),
      disabled: l,
      children: [
        /* @__PURE__ */ a(hr, { size: i, className: v("pr-twp tw:w-auto", s), children: /* @__PURE__ */ a(
          pr,
          {
            placeholder: d[Jo(e)] ?? e
          }
        ) }),
        /* @__PURE__ */ a(
          gr,
          {
            id: c,
            align: w === "rtl" ? "end" : "start",
            style: { zIndex: er },
            children: t.map((u) => /* @__PURE__ */ a(de, { value: `${u}`, children: d[Jo(u)] }, `${u}`))
          }
        )
      ]
    }
  );
}
n(Sh, "ScrollGroupSelector");
function Rh({ children: t }) {
  return /* @__PURE__ */ a("div", { className: "pr-twp tw:grid", children: t });
}
n(Rh, "SettingsList");
function zh({
  primary: t,
  secondary: e,
  children: r,
  isLoading: o = !1,
  loadingMessage: i
}) {
  return /* @__PURE__ */ p("div", { className: "tw:flex tw:items-center tw:justify-between tw:space-x-4 tw:py-2", children: [
    /* @__PURE__ */ p("div", { children: [
      /* @__PURE__ */ a("p", { className: "tw:text-sm tw:font-medium tw:leading-none", children: t }),
      /* @__PURE__ */ a("p", { className: "tw:whitespace-normal tw:break-words tw:text-sm tw:text-muted-foreground", children: e })
    ] }),
    o ? /* @__PURE__ */ a("p", { className: "tw:text-sm tw:text-muted-foreground", children: i }) : /* @__PURE__ */ a("div", { children: r })
  ] });
}
n(zh, "SettingsListItem");
function Dh({
  primary: t,
  secondary: e,
  includeSeparator: r = !1
}) {
  return /* @__PURE__ */ p("div", { className: "tw:space-y-4 tw:py-2", children: [
    /* @__PURE__ */ p("div", { children: [
      /* @__PURE__ */ a("h3", { className: "tw:text-lg tw:font-medium", children: t }),
      /* @__PURE__ */ a("p", { className: "tw:text-sm tw:text-muted-foreground", children: e })
    ] }),
    r ? /* @__PURE__ */ a(Sr, {}) : ""
  ] });
}
n(Dh, "SettingsListHeader");
function Yi(t, e) {
  var r;
  return (r = Object.entries(t).find(
    ([, o]) => "menuItem" in o && o.menuItem === e
  )) == null ? void 0 : r[0];
}
n(Yi, "getSubMenuGroupKeyForMenuItemId");
function wa({ icon: t, menuLabel: e, leading: r }) {
  return t ? /* @__PURE__ */ a(
    "img",
    {
      className: v("tw:max-h-5 tw:max-w-5", r ? "tw:me-2" : "tw:ms-2"),
      src: t,
      alt: `${r ? "Leading" : "Trailing"} icon for ${e}`
    }
  ) : void 0;
}
n(wa, "MenuItemIcon");
const Xi = /* @__PURE__ */ n((t, e, r, o) => r ? Object.entries(t).filter(
  ([s, c]) => "column" in c && c.column === r || s === r
).sort(([, s], [, c]) => s.order - c.order).flatMap(([s]) => e.filter((l) => l.group === s).sort((l, d) => l.order - d.order).map((l) => /* @__PURE__ */ p(Ot, { children: [
  /* @__PURE__ */ a(It, { asChild: !0, children: "command" in l ? /* @__PURE__ */ p(
    Ze,
    {
      onClick: /* @__PURE__ */ n(() => {
        o(l);
      }, "onClick"),
      children: [
        l.iconPathBefore && /* @__PURE__ */ a(wa, { icon: l.iconPathBefore, menuLabel: l.label, leading: !0 }),
        l.label,
        l.iconPathAfter && /* @__PURE__ */ a(wa, { icon: l.iconPathAfter, menuLabel: l.label })
      ]
    },
    `dropdown-menu-item-${l.label}-${l.command}`
  ) : /* @__PURE__ */ p(ks, { children: [
    /* @__PURE__ */ a(_s, { children: l.label }),
    /* @__PURE__ */ a(Ns, { children: /* @__PURE__ */ a(Cs, { children: Xi(
      t,
      e,
      Yi(t, l.id),
      o
    ) }) })
  ] }, `dropdown-menu-sub-${l.label}-${l.id}`) }),
  l.tooltip && /* @__PURE__ */ a($t, { children: l.tooltip })
] }, `tooltip-${l.label}-${"command" in l ? l.command : l.id}`))) : void 0, "getGroupContent");
function uo({
  onSelectMenuItem: t,
  menuData: e,
  tabLabel: r,
  icon: o,
  className: i,
  variant: s,
  buttonVariant: c = "ghost",
  id: l
}) {
  return /* @__PURE__ */ p(Be, { variant: s, children: [
    /* @__PURE__ */ a(Fe, { "aria-label": r, className: i, asChild: !0, id: l, children: /* @__PURE__ */ a(J, { variant: c, size: "icon", children: o ?? /* @__PURE__ */ a(oc, {}) }) }),
    /* @__PURE__ */ a(Ue, { align: "start", style: { zIndex: er }, children: Object.entries(e.columns).filter(([, d]) => typeof d == "object").sort(([, d], [, w]) => typeof d == "boolean" || typeof w == "boolean" ? 0 : d.order - w.order).map(([d], w, u) => /* @__PURE__ */ p(ma, { children: [
      /* @__PURE__ */ a(Ln, { children: /* @__PURE__ */ a(Mt, { children: Xi(e.groups, e.items, d, t) }) }),
      w < u.length - 1 && /* @__PURE__ */ a(Qe, {})
    ] }, d)) })
  ] });
}
n(uo, "TabDropdownMenu");
const Du = 8;
function Mu(t, e, r) {
  const o = e.findIndex((c) => t >= c), i = o === -1 ? e.length : o;
  if (r === void 0 || i >= r) return i;
  const s = e.findIndex(
    (c) => t >= c + Du
  );
  return s === -1 ? r : Math.min(r, s);
}
n(Mu, "getShrinkStep");
function Ji(t, e) {
  const [r, o] = N(0), i = q(void 0);
  return ee(() => {
    if (!t || typeof ResizeObserver > "u") return;
    const s = /* @__PURE__ */ n(() => {
      const { width: l } = t.getBoundingClientRect(), d = i.current;
      i.current = l;
      const w = d === void 0 || d === 0;
      o(
        (u) => Mu(l, e, w ? void 0 : u)
      );
    }, "measure");
    s();
    const c = new ResizeObserver(s);
    return c.observe(t), () => c.disconnect();
  }, [t, e]), r;
}
n(Ji, "useShrinkStep");
const Ou = Object.freeze([520, 420, 340]), Zi = Xt.forwardRef(
  ({ id: t, className: e, children: r, shrinkStep: o }, i) => {
    const [s, c] = N(void 0), l = q(i);
    l.current = i;
    const d = B((h) => {
      c(h ?? void 0);
      const g = l.current;
      typeof g == "function" ? g(h) : g && (g.current = h);
    }, []), w = Ji(s, Ou), u = o ?? w;
    return /* @__PURE__ */ a(zo.Provider, { value: u, children: /* @__PURE__ */ a(
      "div",
      {
        ref: d,
        className: `tw:sticky tw:top-0 tw:box-border tw:flex tw:h-14 tw:flex-row tw:items-center tw:justify-between tw:gap-2 tw:overflow-clip tw:px-4 tw:py-2 tw:text-foreground tw:@container/toolbar ${e}`,
        id: t,
        children: r
      }
    ) });
  }
);
function Mh({
  onSelectProjectMenuItem: t,
  onSelectViewInfoMenuItem: e,
  projectMenuData: r,
  tabViewMenuData: o,
  id: i,
  className: s,
  startAreaChildren: c,
  centerAreaChildren: l,
  endAreaChildren: d,
  menuButtonIcon: w,
  shrinkStep: u
}) {
  return /* @__PURE__ */ p(
    Zi,
    {
      className: `tw:w-full tw:border-b ${s}`,
      id: i,
      shrinkStep: u,
      children: [
        r && /* @__PURE__ */ a(
          uo,
          {
            onSelectMenuItem: t,
            menuData: r,
            tabLabel: "Project",
            icon: w ?? /* @__PURE__ */ a(nc, {}),
            buttonVariant: "ghost"
          }
        ),
        c && /* @__PURE__ */ a("div", { className: "tw:flex tw:min-w-0 tw:shrink tw:grow-[10] tw:flex-row tw:flex-nowrap tw:items-start tw:gap-x-1 tw:gap-y-2 tw:overflow-clip", children: c }),
        l && /* @__PURE__ */ a("div", { className: "tw:flex tw:shrink tw:grow-[1] tw:basis-0 tw:flex-row tw:flex-nowrap tw:items-start tw:justify-center tw:gap-x-1 tw:gap-y-2 tw:overflow-clip tw:@sm:basis-auto", children: l }),
        /* @__PURE__ */ p("div", { className: "tw:flex tw:shrink-0 tw:grow-[1] tw:flex-row-reverse tw:flex-nowrap tw:items-start tw:gap-x-1 tw:gap-y-2 tw:overflow-clip", children: [
          o && /* @__PURE__ */ a(
            uo,
            {
              onSelectMenuItem: e,
              menuData: o,
              tabLabel: "View Info",
              icon: /* @__PURE__ */ a(ic, {}),
              className: "tw:h-full"
            }
          ),
          d
        ] })
      ]
    }
  );
}
n(Mh, "TabToolbar");
function Oh({
  onSelectProjectMenuItem: t,
  projectMenuData: e,
  id: r,
  className: o,
  menuButtonIcon: i
}) {
  return /* @__PURE__ */ a(Zi, { className: "tw:pointer-events-none", id: r, children: e && /* @__PURE__ */ a(
    uo,
    {
      onSelectMenuItem: t,
      menuData: e,
      tabLabel: "Project",
      icon: i,
      className: `tw:pointer-events-auto tw:shadow-lg ${o}`,
      buttonVariant: "outline"
    }
  ) });
}
n(Oh, "TabFloatingMenu");
const Qi = Xt.forwardRef(({ className: t, ...e }, r) => {
  const o = ke();
  return /* @__PURE__ */ a(
    ue.Root,
    {
      orientation: "vertical",
      ref: r,
      className: v("tw:flex tw:gap-1 tw:rounded-md tw:text-muted-foreground", t),
      ...e,
      dir: o
    }
  );
});
Qi.displayName = ue.List.displayName;
const ts = Xt.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ a(
  ue.List,
  {
    ref: r,
    className: v(
      "tw:flex tw:items-center tw:w-[124px] tw:justify-center tw:rounded-md tw:bg-muted tw:p-1 tw:text-muted-foreground",
      t
    ),
    ...e
  }
));
ts.displayName = ue.List.displayName;
const Iu = Xt.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ a(
  ue.Trigger,
  {
    ref: r,
    ...e,
    className: v(
      "tw:inline-flex tw:w-[116px] tw:cursor-pointer tw:items-center tw:justify-center tw:break-words tw:rounded-sm tw:border-0 tw:bg-muted tw:px-3 tw:py-1.5 tw:text-sm tw:font-medium tw:text-inherit tw:ring-offset-background tw:transition-all tw:hover:text-foreground tw:focus-visible:outline-hidden tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2 tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:data-[state=active]:bg-background tw:data-[state=active]:text-foreground tw:data-[state=active]:shadow-sm tw:overflow-clip",
      t
    )
  }
)), es = Xt.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ a(
  ue.Content,
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
es.displayName = ue.Content.displayName;
function Ih({
  tabList: t,
  searchValue: e,
  onSearch: r,
  searchPlaceholder: o,
  headerTitle: i,
  searchClassName: s,
  id: c
}) {
  return /* @__PURE__ */ p("div", { id: c, className: "pr-twp", children: [
    /* @__PURE__ */ p("div", { className: "tw:sticky tw:top-0 tw:space-y-2 tw:pb-2", children: [
      i ? /* @__PURE__ */ a("h1", { children: i }) : "",
      /* @__PURE__ */ a(
        Fn,
        {
          className: s,
          value: e,
          onSearch: r,
          placeholder: o
        }
      )
    ] }),
    /* @__PURE__ */ p(Qi, { children: [
      /* @__PURE__ */ a(ts, { children: t.map((l) => /* @__PURE__ */ a(Iu, { value: l.value, children: l.value }, l.key)) }),
      t.map((l) => /* @__PURE__ */ a(es, { value: l.value, children: l.content }, l.key))
    ] })
  ] });
}
n(Ih, "TabNavigationContentSearch");
function $u({
  className: t,
  // CUSTOM: Added variant prop to allow callers to apply visual style variants to all menu items
  variant: e = "default",
  ...r
}) {
  const o = Xt.useMemo(
    () => ({
      variant: e
    }),
    [e]
  );
  return /* @__PURE__ */ a(Es.Provider, { value: o, children: /* @__PURE__ */ a(
    _e.Root,
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
n($u, "Menubar");
function Pu({ ...t }) {
  return /* @__PURE__ */ a(_e.Menu, { "data-slot": "menubar-menu", ...t });
}
n(Pu, "MenubarMenu");
function Au({ ...t }) {
  return /* @__PURE__ */ a(_e.Portal, { "data-slot": "menubar-portal", ...t });
}
n(Au, "MenubarPortal");
function Vu({
  className: t,
  ...e
}) {
  const r = Mr();
  return /* @__PURE__ */ a(
    _e.Trigger,
    {
      "data-slot": "menubar-trigger",
      className: v(
        "tw:flex tw:items-center tw:rounded-sm tw:px-1.5 tw:py-[2px] tw:text-sm tw:font-medium tw:outline-hidden tw:select-none tw:hover:bg-muted tw:aria-expanded:bg-muted",
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation (portal-rendered content needs this)
        "pr-twp",
        // CUSTOM: Apply variant-driven styles from menu context
        yo({ variant: r.variant, className: t })
      ),
      ...e
    }
  );
}
n(Vu, "MenubarTrigger");
function Lu({
  className: t,
  align: e = "start",
  alignOffset: r = -4,
  sideOffset: o = 8,
  ...i
}) {
  const s = Mr();
  return /* @__PURE__ */ a(Au, { children: /* @__PURE__ */ a(
    _e.Content,
    {
      "data-slot": "menubar-content",
      align: e,
      alignOffset: r,
      sideOffset: o,
      className: v(
        // CUSTOM: Fixed tw: prefix not being on some classes and removed erroneous empty tw: tokens
        "tw:z-50 tw:min-w-36 tw:origin-(--radix-menubar-content-transform-origin) tw:overflow-hidden tw:rounded-lg tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:animate-none! tw:bg-popover/70 tw:before:-z-1 tw:**:data-[slot$=-item]:focus:bg-foreground/10 tw:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 tw:**:data-[slot$=-separator]:bg-foreground/5 tw:**:data-[slot$=-trigger]:focus:bg-foreground/10 tw:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! tw:**:data-[variant=destructive]:focus:bg-foreground/10! tw:**:data-[variant=destructive]:text-accent-foreground! tw:**:data-[variant=destructive]:**:text-accent-foreground! tw:relative tw:before:pointer-events-none tw:before:absolute tw:before:inset-0 tw:before:rounded-[inherit] tw:before:backdrop-blur-2xl tw:before:backdrop-saturate-150",
        // CUSTOM: Added pr-twp to reset styles so that only shadcn styles are applied (portal-rendered content needs this)
        "pr-twp",
        // CUSTOM: Apply muted background when variant is muted
        {
          "tw:bg-popover": s.variant === "muted"
        },
        t
      ),
      ...i
    }
  ) });
}
n(Lu, "MenubarContent");
function ju({
  className: t,
  inset: e,
  variant: r = "default",
  ...o
}) {
  const i = Mr();
  return /* @__PURE__ */ a(
    _e.Item,
    {
      "data-slot": "menubar-item",
      "data-inset": e,
      "data-variant": r,
      className: v(
        "tw:group/menubar-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-[variant=destructive]:text-destructive tw:data-[variant=destructive]:focus:bg-destructive/10 tw:data-[variant=destructive]:focus:text-destructive tw:dark:data-[variant=destructive]:focus:bg-destructive/20 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:data-[variant=destructive]:*:[svg]:text-destructive!",
        // CUSTOM: Apply variant-driven styles from menu context
        yo({ variant: i.variant, className: t })
      ),
      ...o
    }
  );
}
n(ju, "MenubarItem");
function Bu({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    _e.Separator,
    {
      "data-slot": "menubar-separator",
      className: v("tw:-mx-1 tw:my-1 tw:h-px tw:bg-border", t),
      ...e
    }
  );
}
n(Bu, "MenubarSeparator");
function Fu({ ...t }) {
  return /* @__PURE__ */ a(_e.Sub, { "data-slot": "menubar-sub", ...t });
}
n(Fu, "MenubarSub");
function Uu({
  className: t,
  inset: e,
  children: r,
  ...o
}) {
  const i = Mr();
  return /* @__PURE__ */ p(
    _e.SubTrigger,
    {
      "data-slot": "menubar-sub-trigger",
      "data-inset": e,
      className: v(
        "tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-none tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-inset:ps-7 tw:data-open:bg-accent tw:data-open:text-accent-foreground tw:[&_svg:not([class*=size-])]:size-4",
        // CUSTOM: Apply variant-driven styles from menu context
        yo({ variant: i.variant, className: t })
      ),
      ...o,
      children: [
        r,
        /* @__PURE__ */ a(ti, { className: "tw:ms-auto tw:size-4" })
      ]
    }
  );
}
n(Uu, "MenubarSubTrigger");
function Ku({
  className: t,
  ...e
}) {
  const r = Mr();
  return /* @__PURE__ */ a(
    _e.SubContent,
    {
      "data-slot": "menubar-sub-content",
      className: v(
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
n(Ku, "MenubarSubContent");
const _r = /* @__PURE__ */ n((t, e) => {
  setTimeout(() => {
    e.forEach((r) => {
      var o;
      (o = t.current) == null || o.dispatchEvent(new KeyboardEvent("keydown", r));
    });
  }, 0);
}, "simulateKeyPress"), rs = /* @__PURE__ */ n((t, e, r, o) => {
  if (!r) return;
  const i = Object.entries(t).filter(
    ([s, c]) => "column" in c && c.column === r || s === r
  ).sort(([, s], [, c]) => s.order - c.order);
  return i.flatMap(([s], c) => {
    const l = e.filter((w) => w.group === s).sort((w, u) => w.order - u.order).map((w) => /* @__PURE__ */ p(Ot, { children: [
      /* @__PURE__ */ a(It, { asChild: !0, children: "command" in w ? /* @__PURE__ */ p(
        ju,
        {
          onClick: /* @__PURE__ */ n(() => {
            o(w);
          }, "onClick"),
          children: [
            w.iconPathBefore && /* @__PURE__ */ a(wa, { icon: w.iconPathBefore, menuLabel: w.label, leading: !0 }),
            w.label,
            w.iconPathAfter && /* @__PURE__ */ a(wa, { icon: w.iconPathAfter, menuLabel: w.label })
          ]
        },
        `menubar-item-${w.label}-${w.command}`
      ) : /* @__PURE__ */ p(Fu, { children: [
        /* @__PURE__ */ a(Uu, { children: w.label }),
        /* @__PURE__ */ a(Ku, { children: rs(
          t,
          e,
          Yi(t, w.id),
          o
        ) })
      ] }, `menubar-sub-${w.label}-${w.id}`) }),
      w.tooltip && /* @__PURE__ */ a($t, { children: w.tooltip })
    ] }, `tooltip-${w.label}-${"command" in w ? w.command : w.id}`)), d = [...l];
    return l.length > 0 && c < i.length - 1 && d.push(/* @__PURE__ */ a(Bu, {}, `separator-${s}`)), d;
  });
}, "getMenubarContent");
function qu({
  menuData: t,
  onSelectMenuItem: e,
  onOpenChange: r,
  variant: o
}) {
  const i = q(void 0), s = q(void 0), c = q(void 0), l = q(void 0), d = q(void 0), w = /* @__PURE__ */ n((u) => {
    switch (u) {
      case "platform.app":
        return s;
      case "platform.window":
        return c;
      case "platform.layout":
        return l;
      case "platform.help":
        return d;
      default:
        return;
    }
  }, "getRefForColumn");
  if ($l(["alt", "alt+p", "alt+l", "alt+n", "alt+h"], (u, h) => {
    var m, y, b, z;
    u.preventDefault();
    const g = { key: "Escape", code: "Escape", keyCode: 27, bubbles: !0 }, f = { key: " ", code: "Space", keyCode: 32, bubbles: !0 };
    switch (h.hotkey) {
      case "alt":
        _r(s, [g]);
        break;
      case "alt+p":
        (m = s.current) == null || m.focus(), _r(s, [g, f]);
        break;
      case "alt+l":
        (y = c.current) == null || y.focus(), _r(c, [g, f]);
        break;
      case "alt+n":
        (b = l.current) == null || b.focus(), _r(l, [g, f]);
        break;
      case "alt+h":
        (z = d.current) == null || z.focus(), _r(d, [g, f]);
        break;
    }
  }), Y(() => {
    if (!r || !i.current) return;
    const u = new MutationObserver((f) => {
      f.forEach((m) => {
        if (m.attributeName === "data-state" && m.target instanceof HTMLElement) {
          const y = m.target.getAttribute("data-state");
          r(y === "open");
        }
      });
    });
    return i.current.querySelectorAll("[data-state]").forEach((f) => {
      u.observe(f, { attributes: !0 });
    }), () => u.disconnect();
  }, [r]), !!t)
    return /* @__PURE__ */ a($u, { ref: i, className: "pr-twp tw:border-0 tw:bg-transparent", variant: o, children: Object.entries(t.columns).filter(([, u]) => typeof u == "object").sort(([, u], [, h]) => typeof u == "boolean" || typeof h == "boolean" ? 0 : u.order - h.order).map(([u, h]) => /* @__PURE__ */ p(Pu, { children: [
      /* @__PURE__ */ a(Vu, { ref: w(u), children: typeof h == "object" && "label" in h && h.label }),
      /* @__PURE__ */ a(
        Lu,
        {
          style: { zIndex: er },
          children: /* @__PURE__ */ a(Mt, { children: rs(t.groups, t.items, u, e) })
        }
      )
    ] }, u)) });
}
n(qu, "PlatformMenubar");
const Hu = Object.freeze([950, 800, 700]);
function $h(t) {
  switch (t) {
    case void 0:
      return;
    case "darwin":
      return "tw:ps-[85px]";
    default:
      return "tw:pe-[calc(138px+1rem)]";
  }
}
n($h, "getToolbarOSReservedSpaceClassName");
function Ph({
  menuData: t,
  onOpenChange: e,
  onSelectMenuItem: r,
  className: o,
  id: i,
  children: s,
  appMenuAreaChildren: c,
  configAreaChildren: l,
  shouldUseAsAppDragArea: d,
  menubarVariant: w = "default",
  shrinkStep: u
}) {
  const [h, g] = N(void 0), f = B(
    (b) => g(b ?? void 0),
    []
  ), m = Ji(h, Hu), y = u ?? m;
  return /* @__PURE__ */ a(zo.Provider, { value: y, children: /* @__PURE__ */ a(
    "div",
    {
      className: v("tw:border tw:px-4 tw:text-foreground", o),
      style: { position: "relative" },
      id: i,
      children: /* @__PURE__ */ p(
        "div",
        {
          "data-testid": "toolbar-content-row",
          className: "tw:flex tw:h-full tw:w-full tw:justify-between tw:overflow-hidden",
          ref: f,
          style: d ? { WebkitAppRegion: "drag" } : void 0,
          children: [
            /* @__PURE__ */ a("div", { className: "tw:flex tw:shrink-0 tw:grow tw:basis-0", children: /* @__PURE__ */ p(
              "div",
              {
                className: "tw:flex tw:items-center tw:gap-2",
                style: d ? { WebkitAppRegion: "no-drag" } : void 0,
                children: [
                  c,
                  t && /* @__PURE__ */ a(
                    qu,
                    {
                      menuData: t,
                      onOpenChange: e,
                      onSelectMenuItem: r,
                      variant: w
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
                children: l
              }
            ) })
          ]
        }
      )
    }
  ) });
}
n(Ph, "Toolbar");
const Gu = /* @__PURE__ */ n((t, e) => t[e] ?? e, "localizeString");
function Ah({
  knownUiLanguages: t,
  primaryLanguage: e = "en",
  fallbackLanguages: r = [],
  onLanguagesChange: o,
  onPrimaryLanguageChange: i,
  onFallbackLanguagesChange: s,
  localizedStrings: c,
  className: l,
  id: d
}) {
  const w = Gu(
    c,
    "%settings_uiLanguageSelector_fallbackLanguages%"
  ), [u, h] = N(!1), g = /* @__PURE__ */ n((m) => {
    i && i(m), o && o([m, ...r.filter((y) => y !== m)]), s && r.find((y) => y === m) && s([...r.filter((y) => y !== m)]), h(!1);
  }, "handleLanguageChange"), f = /* @__PURE__ */ n((m, y) => {
    var z, k, E, T, P, S;
    const b = y !== m ? ((k = (z = t[m]) == null ? void 0 : z.uiNames) == null ? void 0 : k[y]) ?? ((T = (E = t[m]) == null ? void 0 : E.uiNames) == null ? void 0 : T.en) : void 0;
    return b ? `${(P = t[m]) == null ? void 0 : P.autonym} (${b})` : (S = t[m]) == null ? void 0 : S.autonym;
  }, "getLanguageDisplayName");
  return /* @__PURE__ */ p("div", { id: d, className: v("pr-twp tw:max-w-sm", l), children: [
    /* @__PURE__ */ p(
      ur,
      {
        name: "uiLanguage",
        value: e,
        onValueChange: g,
        open: u,
        onOpenChange: /* @__PURE__ */ n((m) => h(m), "onOpenChange"),
        children: [
          /* @__PURE__ */ a(hr, { children: /* @__PURE__ */ a(pr, {}) }),
          /* @__PURE__ */ a(
            gr,
            {
              style: { zIndex: er },
              children: Object.keys(t).map((m) => /* @__PURE__ */ a(de, { value: m, children: f(m, e) }, m))
            }
          )
        ]
      }
    ),
    e !== "en" && /* @__PURE__ */ a("div", { className: "tw:pt-3", children: /* @__PURE__ */ a(Tt, { className: "tw:font-normal tw:text-muted-foreground", children: Oe(w, {
      fallbackLanguages: (r == null ? void 0 : r.length) > 0 ? r.map((m) => f(m, e)).join(", ") : t.en.autonym
    }) }) })
  ] });
}
n(Ah, "UiLanguageSelector");
const Vh = Object.freeze([
  "%firstRun_language_search_placeholder%",
  "%firstRun_language_noResults%",
  "%firstRun_language_selected%"
]);
function Wu(t) {
  return [...t].sort(([e, r], [o, i]) => e === "en" && o !== "en" ? -1 : o === "en" && e !== "en" ? 1 : r.autonym.localeCompare(i.autonym));
}
n(Wu, "sortLanguages");
function Lh({
  languages: t,
  value: e,
  onChange: r,
  localizedStrings: o,
  className: i,
  id: s
}) {
  const [c, l] = N(""), d = L(
    () => Wu(Object.entries(t)).map(([m, y]) => ({
      tag: m,
      info: y,
      keywords: [y.autonym, ...Object.values(y.uiNames ?? {}), ...y.otherNames ?? []]
    })),
    [t]
  ), w = L(() => {
    if (!c) return d;
    const m = c.toLowerCase();
    return d.filter(({ keywords: y }) => y.some((b) => b.toLowerCase().includes(m)));
  }, [d, c]), u = d.length > 1, h = o["%firstRun_language_search_placeholder%"] ?? "", g = o["%firstRun_language_noResults%"] ?? "", f = o["%firstRun_language_selected%"] ?? "";
  return /* @__PURE__ */ p(Le, { id: s, className: v("pr-twp", i), shouldFilter: !1, children: [
    u && // Plain <input> (not CommandPrimitive.Input) so cmdk cannot update this field after
    // item selection. Arrow-key and Enter events from here bubble to the Command root div
    // where cmdk's keydown handler picks them up for list navigation.
    /* @__PURE__ */ a("div", { "data-slot": "command-input-wrapper", className: "tw:p-1 tw:pb-0", children: /* @__PURE__ */ p(Ts, { className: "tw:h-8! tw:rounded-lg! tw:border-input/30 tw:bg-input/30 tw:shadow-none! tw:*:data-[slot=input-group-addon]:ps-2!", children: [
      /* @__PURE__ */ a(
        "input",
        {
          "data-slot": "command-input",
          type: "text",
          placeholder: h,
          "aria-label": h,
          value: c,
          onChange: /* @__PURE__ */ n((m) => l(m.currentTarget.value), "onChange"),
          className: "tw:w-full tw:text-sm tw:outline-hidden tw:disabled:cursor-not-allowed tw:disabled:opacity-50"
        }
      ),
      /* @__PURE__ */ a(Ss, { children: /* @__PURE__ */ a(Ec, { className: "tw:size-4 tw:shrink-0 tw:opacity-50" }) })
    ] }) }),
    /* @__PURE__ */ p(je, { children: [
      /* @__PURE__ */ a(ha, { children: g }),
      w.map(({ tag: m, info: y }) => {
        const b = m === e;
        return /* @__PURE__ */ p(
          Re,
          {
            value: m,
            "aria-current": b ? "true" : void 0,
            "data-checked": b ? "true" : void 0,
            onSelect: /* @__PURE__ */ n(() => r(m), "onSelect"),
            children: [
              /* @__PURE__ */ a("span", { dir: "auto", children: y.autonym }),
              b && /* @__PURE__ */ a("span", { className: "tw:sr-only", children: f })
            ]
          },
          m
        );
      })
    ] })
  ] });
}
n(Lh, "InterfaceLanguagePicker");
function Yu({ item: t, createLabel: e, createComplexLabel: r }) {
  return e ? /* @__PURE__ */ a(Tt, { children: e(t) }) : r ? /* @__PURE__ */ a(Tt, { children: r(t) }) : /* @__PURE__ */ a(Tt, { children: t });
}
n(Yu, "SmartLabel");
function Xu({
  id: t,
  className: e,
  listItems: r,
  selectedListItems: o,
  handleSelectListItem: i,
  createLabel: s,
  createComplexLabel: c
}) {
  return /* @__PURE__ */ a("div", { id: t, className: e, children: r.map((l) => /* @__PURE__ */ p("div", { className: "tw:m-2 tw:flex tw:items-center", children: [
    /* @__PURE__ */ a(
      Hi,
      {
        className: "tw:me-2 tw:align-middle",
        checked: o.includes(l),
        onCheckedChange: /* @__PURE__ */ n((d) => i(l, d), "onCheckedChange")
      }
    ),
    /* @__PURE__ */ a(
      Yu,
      {
        item: l,
        createLabel: s,
        createComplexLabel: c
      }
    )
  ] }, l)) });
}
n(Xu, "Checklist");
const jh = Xu;
function Ju(t, e) {
  const [r, o] = N(t), [i, s] = N(e);
  return t !== r && (o(t), t && s(e)), t ? e : i;
}
n(Ju, "useFrozenWhileClosed");
function Bh({
  open: t,
  anchorRect: e,
  message: r,
  confirmingKeyLabel: o,
  side: i = "bottom",
  align: s = "start",
  showArrow: c = !0
}) {
  const l = t ? Zo(r, { key: o }).join("") : "", {
    anchorRect: d,
    message: w,
    confirmingKeyLabel: u,
    showArrow: h
  } = Ju(t, { anchorRect: e, message: r, confirmingKeyLabel: o, showArrow: c });
  return /* @__PURE__ */ p(Mt, { children: [
    /* @__PURE__ */ a("span", { role: "status", className: "tw:sr-only", children: l }),
    /* @__PURE__ */ p(Ot, { open: t, onOpenChange: /* @__PURE__ */ n(() => {
    }, "onOpenChange"), children: [
      /* @__PURE__ */ a(
        It,
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
        $t,
        {
          side: i,
          align: s,
          showArrow: h,
          arrowPadding: 8,
          className: v(
            // Rely on TooltipContent's default tw:max-w-xs (320px) and normal wrapping: this hint's
            // text is short and usually fits on one line, but locale length varies (e.g. Spanish runs
            // longer than English), so allow it to wrap rather than force tw:whitespace-nowrap, which
            // could clip or overflow on a narrow webview.
            "tw:p-0 tw:has-data-[slot=kbd]:pe-0 tw:bg-background tw:text-destructive tw:border tw:border-destructive"
          ),
          arrowClassName: "tw:bg-[color-mix(in_oklab,var(--destructive)_10%,var(--background))] tw:fill-[color-mix(in_oklab,var(--destructive)_10%,var(--background))] tw:border tw:border-destructive",
          children: /* @__PURE__ */ a("div", { className: "tw:w-full tw:h-full tw:rounded-md tw:bg-destructive/10 tw:px-3 tw:py-1.5", children: Zo(w, {
            key: /* @__PURE__ */ a(
              Wa,
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
                children: u
              }
            )
          }).map((g, f) => (
            // The array is static per render (one fixed localized string + one kbd), so index is
            // a stable, safe key — same rationale as source-language-indexed-list.component.tsx's
            // disable.
            // eslint-disable-next-line react/no-array-index-key
            /* @__PURE__ */ a(ma, { children: g }, `key-${f}`)
          )) })
        }
      )
    ] })
  ] });
}
n(Bh, "DestructiveKeyConfirmation");
function Fh({
  cardKey: t,
  isSelected: e,
  onSelect: r,
  isDenied: o,
  isHidden: i = !1,
  className: s,
  children: c,
  selectedButtons: l,
  hoverButtons: d,
  dropdownContent: w,
  additionalContent: u,
  accentColor: h,
  showDropdownOnHover: g = !1
}) {
  const f = /* @__PURE__ */ n((b) => {
    if (b.key === "Enter" || b.key === " ") {
      if (b.target !== b.currentTarget) return;
      b.preventDefault(), r();
    }
  }, "handleKeyDown"), [m, y] = N(!1);
  return /* @__PURE__ */ p(
    "div",
    {
      hidden: i,
      onClick: r,
      onKeyDown: f,
      onMouseEnter: /* @__PURE__ */ n(() => y(!0), "onMouseEnter"),
      onFocus: /* @__PURE__ */ n(() => y(!0), "onFocus"),
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
        /* @__PURE__ */ p("div", { className: "tw:flex tw:flex-col tw:gap-2 tw:p-4", children: [
          /* @__PURE__ */ p("div", { className: "tw:flex tw:justify-between tw:overflow-hidden", children: [
            /* @__PURE__ */ a("div", { className: "tw:min-w-0 tw:flex-1", children: c }),
            e && l,
            !e && d && /* @__PURE__ */ a("div", { className: "tw:invisible tw:group-hover:visible", children: d }),
            w && (e || g && m) && /* @__PURE__ */ a(
              "div",
              {
                className: v(
                  !e && g && "tw:invisible tw:group-hover:visible"
                ),
                children: /* @__PURE__ */ p(Be, { children: [
                  /* @__PURE__ */ a(Fe, { className: v(h && "tw:me-1"), asChild: !0, children: /* @__PURE__ */ a(
                    J,
                    {
                      className: "tw:m-1 tw:h-6 tw:w-6",
                      variant: "ghost",
                      size: "icon",
                      onClick: /* @__PURE__ */ n((b) => b.stopPropagation(), "onClick"),
                      onFocus: /* @__PURE__ */ n((b) => b.stopPropagation(), "onFocus"),
                      children: /* @__PURE__ */ a(sc, {})
                    }
                  ) }),
                  /* @__PURE__ */ a(Ue, { align: "end", children: w })
                ] })
              }
            )
          ] }),
          u && /* @__PURE__ */ a("div", { className: "tw:w-fit tw:min-w-0 tw:max-w-full tw:overflow-hidden", children: u })
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
n(Fh, "ResultsCard");
function Uh({ message: t, id: e, className: r }) {
  return /* @__PURE__ */ a(
    "p",
    {
      role: "status",
      "data-testid": e,
      className: v("tw:text-sm tw:text-muted-foreground", r),
      children: t
    }
  );
}
n(Uh, "EmptyState");
function Kh({
  id: t,
  isDisabled: e = !1,
  hasError: r = !1,
  isFullWidth: o = !1,
  helperText: i,
  label: s,
  placeholder: c,
  isRequired: l = !1,
  className: d,
  defaultValue: w,
  value: u,
  onChange: h,
  onFocus: g,
  onBlur: f
}) {
  return /* @__PURE__ */ p("div", { className: v("tw:inline-grid tw:items-center tw:gap-1.5", { "tw:w-full": o }), children: [
    /* @__PURE__ */ a(
      Tt,
      {
        htmlFor: t,
        className: v({
          "tw:text-red-600": r,
          "tw:hidden": !s
        }),
        children: `${s}${l ? "*" : ""}`
      }
    ),
    /* @__PURE__ */ a(
      ga,
      {
        id: t,
        disabled: e,
        placeholder: c,
        required: l,
        className: v(d, { "tw:border-red-600": r }),
        defaultValue: w,
        value: u,
        onChange: h,
        onFocus: g,
        onBlur: f
      }
    ),
    /* @__PURE__ */ a("p", { className: v({ "tw:hidden": !i }), children: i })
  ] });
}
n(Kh, "TextField");
function qh({ currentStep: t, totalSteps: e, locale: r }) {
  const o = r || "en", i = L(() => {
    const l = new Jn(o);
    return (d) => l.format(d);
  }, [o]), s = Math.min(Math.max(t, 1), e), c = Array.from({ length: e }, (l, d) => d + 1);
  return /* @__PURE__ */ a("div", { className: "tw:flex tw:items-center", "aria-hidden": "true", children: c.map((l) => {
    let d = "upcoming";
    return l === s ? d = "active" : l < s && (d = "complete"), /* @__PURE__ */ p(ma, { children: [
      l > 1 && /* @__PURE__ */ a("div", { className: "tw:h-px tw:flex-1 tw:bg-border" }),
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
          children: d === "complete" ? /* @__PURE__ */ a($e, { className: "tw:h-4 tw:w-4" }) : i(l)
        }
      )
    ] }, l);
  }) });
}
n(qh, "WizardStepper");
function Hh({ ...t }) {
  return /* @__PURE__ */ a(Pt.Root, { "data-slot": "context-menu", ...t });
}
n(Hh, "ContextMenu");
function Gh({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    Pt.Trigger,
    {
      "data-slot": "context-menu-trigger",
      className: v("tw:select-none", t),
      ...e
    }
  );
}
n(Gh, "ContextMenuTrigger");
function Wh({ ...t }) {
  return /* @__PURE__ */ a(Pt.Group, { "data-slot": "context-menu-group", ...t });
}
n(Wh, "ContextMenuGroup");
function Yh({ ...t }) {
  return /* @__PURE__ */ a(Pt.Portal, { "data-slot": "context-menu-portal", ...t });
}
n(Yh, "ContextMenuPortal");
function Xh({ ...t }) {
  return /* @__PURE__ */ a(Pt.Sub, { "data-slot": "context-menu-sub", ...t });
}
n(Xh, "ContextMenuSub");
function Jh({
  ...t
}) {
  return /* @__PURE__ */ a(Pt.RadioGroup, { "data-slot": "context-menu-radio-group", ...t });
}
n(Jh, "ContextMenuRadioGroup");
function Zh({
  className: t,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: e,
  ...r
}) {
  return /* @__PURE__ */ a(Pt.Portal, { children: /* @__PURE__ */ a(
    Pt.Content,
    {
      "data-slot": "context-menu-content",
      className: v(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        // CUSTOM: Fixed tw: prefix not being on some classes and removed erroneous empty tw: tokens
        // CUSTOM: Removed tw:z-50 to use the shared z-index constant below (see style prop)
        "pr-twp tw:max-h-(--radix-context-menu-content-available-height) tw:min-w-36 tw:origin-(--radix-context-menu-content-transform-origin) tw:overflow-x-hidden tw:overflow-y-auto tw:rounded-lg tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95 tw:animate-none! tw:bg-popover/70 tw:before:-z-1 tw:**:data-[slot$=-item]:focus:bg-foreground/10 tw:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 tw:**:data-[slot$=-separator]:bg-foreground/5 tw:**:data-[slot$=-trigger]:focus:bg-foreground/10 tw:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! tw:**:data-[variant=destructive]:focus:bg-foreground/10! tw:**:data-[variant=destructive]:text-accent-foreground! tw:**:data-[variant=destructive]:**:text-accent-foreground! tw:relative tw:before:pointer-events-none tw:before:absolute tw:before:inset-0 tw:before:rounded-[inherit] tw:before:backdrop-blur-2xl tw:before:backdrop-saturate-150",
        t
      ),
      style: { zIndex: er, ...e },
      ...r
    }
  ) });
}
n(Zh, "ContextMenuContent");
function Qh({
  className: t,
  inset: e,
  variant: r = "default",
  ...o
}) {
  return /* @__PURE__ */ a(
    Pt.Item,
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
n(Qh, "ContextMenuItem");
function tg({
  className: t,
  inset: e,
  children: r,
  ...o
}) {
  return /* @__PURE__ */ p(
    Pt.SubTrigger,
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
        /* @__PURE__ */ a(ti, { className: "tw:ms-auto" })
      ]
    }
  );
}
n(tg, "ContextMenuSubTrigger");
function eg({
  className: t,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: e,
  ...r
}) {
  return /* @__PURE__ */ a(
    Pt.SubContent,
    {
      "data-slot": "context-menu-sub-content",
      className: v(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        // CUSTOM: Fixed tw: prefix not being on some classes and removed erroneous empty tw: tokens
        // CUSTOM: Removed tw:z-50 to use the shared z-index constant below (see style prop), keeping
        // submenus on the same above-dock layer as their parent ContextMenuContent (PT-3877)
        "pr-twp tw:min-w-32 tw:origin-(--radix-context-menu-content-transform-origin) tw:overflow-hidden tw:rounded-lg tw:border tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-lg tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95 tw:animate-none! tw:bg-popover/70 tw:before:-z-1 tw:**:data-[slot$=-item]:focus:bg-foreground/10 tw:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 tw:**:data-[slot$=-separator]:bg-foreground/5 tw:**:data-[slot$=-trigger]:focus:bg-foreground/10 tw:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! tw:**:data-[variant=destructive]:focus:bg-foreground/10! tw:**:data-[variant=destructive]:text-accent-foreground! tw:**:data-[variant=destructive]:**:text-accent-foreground! tw:relative tw:before:pointer-events-none tw:before:absolute tw:before:inset-0 tw:before:rounded-[inherit] tw:before:backdrop-blur-2xl tw:before:backdrop-saturate-150",
        t
      ),
      style: { zIndex: er, ...e },
      ...r
    }
  );
}
n(eg, "ContextMenuSubContent");
function rg({
  className: t,
  children: e,
  checked: r,
  inset: o,
  ...i
}) {
  return /* @__PURE__ */ p(
    Pt.CheckboxItem,
    {
      "data-slot": "context-menu-checkbox-item",
      "data-inset": o,
      className: v(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      checked: r,
      ...i,
      children: [
        /* @__PURE__ */ a("span", { className: "tw:pointer-events-none tw:absolute tw:end-2", children: /* @__PURE__ */ a(Pt.ItemIndicator, { children: /* @__PURE__ */ a(va, {}) }) }),
        e
      ]
    }
  );
}
n(rg, "ContextMenuCheckboxItem");
function ag({
  className: t,
  children: e,
  inset: r,
  ...o
}) {
  return /* @__PURE__ */ p(
    Pt.RadioItem,
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
        /* @__PURE__ */ a("span", { className: "tw:pointer-events-none tw:absolute tw:end-2", children: /* @__PURE__ */ a(Pt.ItemIndicator, { children: /* @__PURE__ */ a(va, {}) }) }),
        e
      ]
    }
  );
}
n(ag, "ContextMenuRadioItem");
function og({
  className: t,
  inset: e,
  ...r
}) {
  return /* @__PURE__ */ a(
    Pt.Label,
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
n(og, "ContextMenuLabel");
function ng({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    Pt.Separator,
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
n(ng, "ContextMenuSeparator");
function ig({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "span",
    {
      "data-slot": "context-menu-shortcut",
      className: v(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; tw:ms-auto uses logical margin for RTL support
        "pr-twp tw:ms-auto tw:text-xs tw:tracking-widest tw:text-muted-foreground tw:group-focus/context-menu-item:text-accent-foreground",
        t
      ),
      ...e
    }
  );
}
n(ig, "ContextMenuShortcut");
function sg({ ...t }) {
  return /* @__PURE__ */ a(Ke.Root, { "data-slot": "drawer", ...t });
}
n(sg, "Drawer");
function cg({ ...t }) {
  return /* @__PURE__ */ a(Ke.Trigger, { "data-slot": "drawer-trigger", ...t });
}
n(cg, "DrawerTrigger");
function Zu({ ...t }) {
  return /* @__PURE__ */ a(Ke.Portal, { "data-slot": "drawer-portal", ...t });
}
n(Zu, "DrawerPortal");
function lg({ ...t }) {
  return /* @__PURE__ */ a(Ke.Close, { "data-slot": "drawer-close", ...t });
}
n(lg, "DrawerClose");
function Qu({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    Ke.Overlay,
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
n(Qu, "DrawerOverlay");
function dg({
  className: t,
  children: e,
  // CUSTOM: Destructure hideDrawerHandle to conditionally render the drag handle
  hideDrawerHandle: r = !1,
  ...o
}) {
  const i = ke();
  return /* @__PURE__ */ p(Zu, { "data-slot": "drawer-portal", children: [
    /* @__PURE__ */ a(Qu, {}),
    /* @__PURE__ */ p(
      Ke.Content,
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
          /* @__PURE__ */ a("div", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:flex-col", dir: i, children: e }),
          !r && /* @__PURE__ */ a("div", { className: "tw:hidden tw:shrink-0 tw:rounded-full tw:bg-muted tw:group-data-[vaul-drawer-direction=top]/drawer-content:mx-auto tw:group-data-[vaul-drawer-direction=top]/drawer-content:mb-4 tw:group-data-[vaul-drawer-direction=top]/drawer-content:h-1.5 tw:group-data-[vaul-drawer-direction=top]/drawer-content:w-[100px] tw:group-data-[vaul-drawer-direction=top]/drawer-content:block tw:group-data-[vaul-drawer-direction=left]/drawer-content:my-auto tw:group-data-[vaul-drawer-direction=left]/drawer-content:me-4 tw:group-data-[vaul-drawer-direction=left]/drawer-content:h-[100px] tw:group-data-[vaul-drawer-direction=left]/drawer-content:w-1.5 tw:group-data-[vaul-drawer-direction=left]/drawer-content:block" })
        ]
      }
    )
  ] });
}
n(dg, "DrawerContent");
function wg({ className: t, ...e }) {
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
n(wg, "DrawerHeader");
function ug({ className: t, ...e }) {
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
n(ug, "DrawerFooter");
function pg({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    Ke.Title,
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
n(pg, "DrawerTitle");
function hg({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    Ke.Description,
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
n(hg, "DrawerDescription");
function gg({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "empty",
      className: v(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:flex tw:w-full tw:min-w-0 tw:flex-1 tw:flex-col tw:items-center tw:justify-center tw:gap-4 tw:rounded-xl tw:border-dashed tw:p-6 tw:text-center tw:text-balance",
        t
      ),
      ...e
    }
  );
}
n(gg, "Empty");
function fg({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "empty-header",
      className: v(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:flex tw:max-w-sm tw:flex-col tw:items-center tw:gap-2",
        t
      ),
      ...e
    }
  );
}
n(fg, "EmptyHeader");
const tp = Ro(
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
function mg({
  className: t,
  variant: e = "default",
  ...r
}) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "empty-icon",
      "data-variant": e,
      className: v(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp",
        tp({ variant: e }),
        t
      ),
      ...r
    }
  );
}
n(mg, "EmptyMedia");
function vg({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "empty-title",
      className: v(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:font-heading tw:text-sm tw:font-medium tw:tracking-tight",
        t
      ),
      ...e
    }
  );
}
n(vg, "EmptyTitle");
function bg({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "empty-description",
      className: v(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:text-sm/relaxed tw:text-muted-foreground tw:[&>a]:underline tw:[&>a]:underline-offset-4 tw:[&>a:hover]:text-primary",
        t
      ),
      ...e
    }
  );
}
n(bg, "EmptyDescription");
function xg({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "empty-content",
      className: v(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:flex tw:w-full tw:max-w-sm tw:min-w-0 tw:flex-col tw:items-center tw:gap-2.5 tw:text-sm tw:text-balance",
        t
      ),
      ...e
    }
  );
}
n(xg, "EmptyContent");
function yg({
  className: t,
  value: e,
  ...r
}) {
  return /* @__PURE__ */ a(
    nn.Root,
    {
      "data-slot": "progress",
      className: v(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:relative tw:flex tw:h-1 tw:w-full tw:items-center tw:overflow-x-hidden tw:rounded-full tw:bg-muted",
        t
      ),
      ...r,
      children: /* @__PURE__ */ a(
        nn.Indicator,
        {
          "data-slot": "progress-indicator",
          className: "tw:size-full tw:flex-1 tw:bg-primary tw:transition-all",
          style: { transform: `translateX(-${100 - (e || 0)}%)` }
        }
      )
    }
  );
}
n(yg, "Progress");
function kg({ ...t }) {
  const { theme: e = "system" } = Pl();
  return /* @__PURE__ */ a(
    Al,
    {
      theme: e === "light" || e === "dark" || e === "system" ? e : "system",
      className: "tw:toaster tw:group",
      icons: {
        success: /* @__PURE__ */ a(Dc, { className: "tw:size-4" }),
        info: /* @__PURE__ */ a(zc, { className: "tw:size-4" }),
        warning: /* @__PURE__ */ a(Rc, { className: "tw:size-4" }),
        error: /* @__PURE__ */ a(Sc, { className: "tw:size-4" }),
        loading: /* @__PURE__ */ a(Tc, { className: "tw:size-4 tw:animate-spin" })
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
n(kg, "Toaster");
function _g({
  className: t,
  defaultValue: e,
  value: r,
  min: o = 0,
  max: i = 100,
  ...s
}) {
  const c = ke(), l = Xt.useMemo(
    () => Array.isArray(r) ? r : Array.isArray(e) ? e : [o, i],
    [r, e, o, i]
  );
  return /* @__PURE__ */ p(
    Fr.Root,
    {
      "data-slot": "slider",
      defaultValue: e,
      value: r,
      min: o,
      max: i,
      className: v(
        "pr-twp tw:relative tw:flex tw:w-full tw:touch-none tw:items-center tw:select-none tw:data-disabled:opacity-50 tw:data-vertical:h-full tw:data-vertical:min-h-40 tw:data-vertical:w-auto tw:data-vertical:flex-col",
        t
      ),
      dir: c,
      ...s,
      children: [
        /* @__PURE__ */ a(
          Fr.Track,
          {
            "data-slot": "slider-track",
            className: "tw:relative tw:grow tw:overflow-hidden tw:rounded-full tw:bg-muted tw:data-horizontal:h-1 tw:data-horizontal:w-full tw:data-vertical:h-full tw:data-vertical:w-1",
            children: /* @__PURE__ */ a(
              Fr.Range,
              {
                "data-slot": "slider-range",
                className: "tw:absolute tw:bg-primary tw:select-none tw:data-horizontal:h-full tw:data-vertical:w-full"
              }
            )
          }
        ),
        Array.from({ length: l.length }, (d, w) => /* @__PURE__ */ a(
          Fr.Thumb,
          {
            "data-slot": "slider-thumb",
            className: "tw:relative tw:block tw:size-3 tw:shrink-0 tw:rounded-full tw:border tw:border-ring tw:bg-white tw:ring-ring/50 tw:transition-[color,box-shadow] tw:select-none tw:after:absolute tw:after:-inset-2 tw:hover:ring-3 tw:focus-visible:ring-3 tw:focus-visible:outline-hidden tw:active:ring-3 tw:disabled:pointer-events-none tw:disabled:opacity-50"
          },
          w
        ))
      ]
    }
  );
}
n(_g, "Slider");
function Ng({
  className: t,
  size: e = "default",
  ...r
}) {
  return /* @__PURE__ */ a(
    sn.Root,
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
        sn.Thumb,
        {
          "data-slot": "switch-thumb",
          className: "tw:pointer-events-none tw:block tw:rounded-full tw:bg-background tw:ring-0 tw:transition-transform tw:group-data-[size=default]/switch:size-4 tw:group-data-[size=sm]/switch:size-3 tw:group-data-[size=default]/switch:data-checked:translate-x-[calc(100%-2px)] tw:rtl:group-data-[size=default]/switch:data-checked:-translate-x-[calc(100%-2px)] tw:group-data-[size=sm]/switch:data-checked:translate-x-[calc(100%-2px)] tw:rtl:group-data-[size=sm]/switch:data-checked:-translate-x-[calc(100%-2px)] tw:dark:data-checked:bg-primary-foreground tw:group-data-[size=default]/switch:data-unchecked:translate-x-0 tw:rtl:group-data-[size=default]/switch:data-unchecked:-translate-x-0 tw:group-data-[size=sm]/switch:data-unchecked:translate-x-0 tw:rtl:group-data-[size=sm]/switch:data-unchecked:-translate-x-0 tw:dark:data-unchecked:bg-foreground"
        }
      )
    }
  );
}
n(Ng, "Switch");
function Cg({
  className: t,
  orientation: e = "horizontal",
  ...r
}) {
  return /* @__PURE__ */ a(
    ue.Root,
    {
      "data-slot": "tabs",
      "data-orientation": e,
      className: v("tw:group/tabs tw:flex tw:gap-2 tw:data-horizontal:flex-col", t),
      ...r
    }
  );
}
n(Cg, "Tabs");
const ep = Ro(
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
function Eg({
  className: t,
  variant: e = "default",
  ...r
}) {
  const o = ke();
  return /* @__PURE__ */ a(
    ue.List,
    {
      "data-slot": "tabs-list",
      "data-variant": e,
      className: v("pr-twp", ep({ variant: e }), t),
      dir: o,
      ...r
    }
  );
}
n(Eg, "TabsList");
function Tg({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    ue.Trigger,
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
n(Tg, "TabsTrigger");
function Sg({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    ue.Content,
    {
      "data-slot": "tabs-content",
      className: v("pr-twp tw:flex-1 tw:text-sm tw:outline-none", t),
      ...e
    }
  );
}
n(Sg, "TabsContent");
const Rg = /* @__PURE__ */ n((t, e) => {
  Y(() => {
    if (!t) return;
    let r = !1;
    const i = t(/* @__PURE__ */ n((s) => {
      r || e(s);
    }, "guardedHandler"));
    return () => {
      r = !0;
      try {
        i();
      } catch (s) {
        console.error("useEvent: error while unsubscribing from event", s);
      }
    };
  }, [t, e]);
}, "useEvent"), zg = /* @__PURE__ */ n((t, e) => {
  Y(() => {
    if (!t) return;
    let r = !1, o, i = !1;
    const s = /* @__PURE__ */ n((l) => {
      r || e(l);
    }, "guardedHandler"), c = /* @__PURE__ */ n(() => {
      if (i || !o) return;
      i = !0;
      const l = o;
      (async () => {
        try {
          await l();
        } catch (d) {
          console.error("useEventAsync: error while unsubscribing from event", d);
        }
      })();
    }, "unsubscribeOnce");
    return (async () => {
      try {
        o = await Promise.resolve(t(s)), r && c();
      } catch (l) {
        console.error("useEventAsync: error while subscribing to event", l);
      }
    })(), () => {
      r = !0, c();
    };
  }, [t, e]);
}, "useEventAsync");
function rp(t) {
  return {
    preserveValue: !0,
    ...t
  };
}
n(rp, "getUsePromiseOptionsDefaults");
const Dg = /* @__PURE__ */ n((t, e, r = {}) => {
  const o = q(e);
  o.current = e;
  const i = q(r);
  i.current = rp(i.current);
  const [s, c] = N(() => o.current), [l, d] = N(!0);
  return Y(() => {
    let w = !0;
    return d(!!t), (async () => {
      if (t)
        try {
          const u = await t();
          w && (c(() => u), d(!1));
        } catch (u) {
          w && d(!1), console.error(
            "usePromise: the promise factory rejected, so there is no new value",
            u
          );
        }
    })(), () => {
      w = !1, i.current.preserveValue || c(() => o.current);
    };
  }, [t]), [s, l];
}, "usePromise");
function Mg(t) {
  Y(() => {
    let e;
    return t && (e = document.createElement("style"), e.appendChild(document.createTextNode(t)), document.head.appendChild(e)), () => {
      e && document.head.removeChild(e);
    };
  }, [t]);
}
n(Mg, "useStylesheet");
function Og(t) {
  const e = L(() => vc(t).slice().sort().join(" "), [t]);
  return L(() => e ? e.split(" ") : [], [e]);
}
n(Og, "useExtraValidMarkers");
const ap = /* @__PURE__ */ n(() => {
  const [t, e] = N(
    () => document.body.getBoundingClientRect().height > 0
  );
  return Y(() => {
    const r = new IntersectionObserver((o) => {
      const i = o[o.length - 1];
      i && e(i.isIntersecting);
    });
    return r.observe(document.body), () => {
      r.disconnect();
    };
  }, []), t;
}, "useViewVisibility");
function Ig(t, e) {
  const [r, o] = N(!1), i = q(e);
  i.current = e;
  const s = q(t);
  s.current = t;
  const c = B(() => {
    s.current ? i.current() : o(!0);
  }, []);
  return Y(() => {
    !t || !r || (o(!1), i.current());
  }, [t, r]), c;
}
n(Ig, "useRunWhenVisible");
function op(t, e, r) {
  return t ? r.dark : e === void 0 ? r.lightDefault : r.lightUnselected;
}
n(op, "pickTabIconUrl");
function $g(t, e) {
  const r = ap();
  return op(t, r, e);
}
n($g, "useTabIconSelection");
function np(t, e = "top") {
  if (!t || typeof document > "u") return;
  const r = document.head || document.querySelector("head"), o = r.querySelector(":first-child"), i = document.createElement("style");
  i.appendChild(document.createTextNode(t)), e === "top" && o ? r.insertBefore(i, o) : r.appendChild(i);
}
n(np, "injectStyle");
np(`/* By default the editor is too tall for the footnote editor, even while empty, so this makes it
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
  Vg as Alert,
  Lg as AlertDescription,
  jg as AlertTitle,
  pw as Avatar,
  hw as AvatarFallback,
  Up as AvatarImage,
  Dp as BOOK_CHAPTER_CONTROL_STRING_KEYS,
  Mp as BOOK_SELECTOR_STRING_KEYS,
  Tr as Badge,
  Oa as BookChapterControl,
  no as BookSelectionMode,
  Op as BookSelector,
  J as Button,
  go as ButtonGroup,
  Vn as ButtonGroupSeparator,
  Bg as ButtonGroupText,
  Li as CANCEL_ACCEPT_BUTTONS_STRING_KEYS,
  Pp as COMMENT_EDITOR_STRING_KEYS,
  dw as COMMENT_LIST_ELEMENT_ID,
  Ap as COMMENT_LIST_STRING_KEYS,
  Ip as CONFLICT_NOTE_STRING_KEYS,
  ji as CancelAcceptButtons,
  ww as Card,
  uw as CardContent,
  Bp as CardDescription,
  Fp as CardFooter,
  Lp as CardHeader,
  jp as CardTitle,
  Yl as ChapterRangeSelector,
  Hi as Checkbox,
  jh as CheckboxGroup,
  Xu as Checklist,
  pn as ComboBox,
  Le as Command,
  ha as CommandEmpty,
  Te as CommandGroup,
  pa as CommandInput,
  Re as CommandItem,
  je as CommandList,
  $p as CommentEditor,
  Kp as CommentList,
  mw as ConflictNoteCard,
  Hh as ContextMenu,
  rg as ContextMenuCheckboxItem,
  Zh as ContextMenuContent,
  Wh as ContextMenuGroup,
  Qh as ContextMenuItem,
  og as ContextMenuLabel,
  Yh as ContextMenuPortal,
  Jh as ContextMenuRadioGroup,
  ag as ContextMenuRadioItem,
  ng as ContextMenuSeparator,
  ig as ContextMenuShortcut,
  Xh as ContextMenuSub,
  eg as ContextMenuSubContent,
  tg as ContextMenuSubTrigger,
  Gh as ContextMenuTrigger,
  Sw as DataTable,
  Bh as DestructiveKeyConfirmation,
  Ka as Dialog,
  Fg as DialogClose,
  qa as DialogContent,
  Ug as DialogDescription,
  Ho as DialogFooter,
  Ha as DialogHeader,
  Kg as DialogOverlay,
  qg as DialogPortal,
  Ga as DialogTitle,
  Hg as DialogTrigger,
  Eu as DisabledActionTooltip,
  Cu as DisabledTooltipWrapper,
  sg as Drawer,
  lg as DrawerClose,
  dg as DrawerContent,
  hg as DrawerDescription,
  ug as DrawerFooter,
  wg as DrawerHeader,
  Qu as DrawerOverlay,
  Zu as DrawerPortal,
  pg as DrawerTitle,
  cg as DrawerTrigger,
  Be as DropdownMenu,
  Ie as DropdownMenuCheckboxItem,
  Ue as DropdownMenuContent,
  Ln as DropdownMenuGroup,
  Ze as DropdownMenuItem,
  Dw as DropdownMenuItemType,
  Dr as DropdownMenuLabel,
  Ns as DropdownMenuPortal,
  ds as DropdownMenuRadioGroup,
  ws as DropdownMenuRadioItem,
  Qe as DropdownMenuSeparator,
  Gg as DropdownMenuShortcut,
  ks as DropdownMenuSub,
  Cs as DropdownMenuSubContent,
  _s as DropdownMenuSubTrigger,
  Fe as DropdownMenuTrigger,
  Rw as ERROR_DUMP_STRING_KEYS,
  Wp as ERROR_POPOVER_STRING_KEYS,
  $w as EditorKeyboardShortcuts,
  gg as Empty,
  xg as EmptyContent,
  bg as EmptyDescription,
  fg as EmptyHeader,
  mg as EmptyMedia,
  Uh as EmptyState,
  vg as EmptyTitle,
  zw as ErrorDump,
  Yp as ErrorPopover,
  eh as FOOTNOTE_EDITOR_STRING_KEYS,
  Qp as Filter,
  Xp as FilterDropdown,
  Zp as Footer,
  th as FootnoteEditor,
  Zw as FootnoteItem,
  rh as FootnoteList,
  Vh as INTERFACE_LANGUAGE_PICKER_STRING_KEYS,
  lh as INVENTORY_STRING_KEYS,
  ga as Input,
  Lh as InterfaceLanguagePicker,
  dh as Inventory,
  Wa as Kbd,
  Wg as KbdGroup,
  Tt as Label,
  Bw as MARKER_MENU_STRING_KEYS,
  Gp as MarkdownRenderer,
  Kw as MarkerMenu,
  Jp as MoreInfo,
  us as MultiSelectComboBox,
  Ih as NavigationContentSearch,
  Ae as Popover,
  ms as PopoverAnchor,
  Ve as PopoverContent,
  Yg as PopoverDescription,
  Xg as PopoverHeader,
  Sa as PopoverPortalContainerProvider,
  Jg as PopoverTitle,
  tr as PopoverTrigger,
  yg as Progress,
  ho as RadioGroup,
  ra as RadioGroupItem,
  Bl as RecentSearches,
  Zg as ResizableHandle,
  Qg as ResizablePanel,
  tf as ResizablePanelGroup,
  Fh as ResultsCard,
  Eh as SCOPE_SELECTOR_STRING_KEYS,
  Ru as SELECT_BOOKS_STRING_KEYS,
  Xr as SHRINK_STEP,
  Th as ScopeSelector,
  Ch as ScriptureResultsViewer,
  Sh as ScrollGroupSelector,
  Fn as SearchBar,
  ur as Select,
  Su as SelectBooks,
  Nu as SelectBooksPicker,
  gr as SelectContent,
  Nw as SelectGroup,
  de as SelectItem,
  qp as SelectLabel,
  Ew as SelectScrollDownButton,
  Cw as SelectScrollUpButton,
  Hp as SelectSeparator,
  hr as SelectTrigger,
  pr as SelectValue,
  Sr as Separator,
  Rh as SettingsList,
  Dh as SettingsListHeader,
  zh as SettingsListItem,
  fu as SettingsSidebar,
  Nh as SettingsSidebarContentSearch,
  zo as ShrinkStepContext,
  lu as Sidebar,
  wu as SidebarContent,
  gh as SidebarFooter,
  Dn as SidebarGroup,
  mh as SidebarGroupAction,
  On as SidebarGroupContent,
  Mn as SidebarGroupLabel,
  hh as SidebarHeader,
  ph as SidebarInput,
  du as SidebarInset,
  uu as SidebarMenu,
  vh as SidebarMenuAction,
  bh as SidebarMenuBadge,
  gu as SidebarMenuButton,
  pu as SidebarMenuItem,
  xh as SidebarMenuSkeleton,
  yh as SidebarMenuSub,
  _h as SidebarMenuSubButton,
  kh as SidebarMenuSubItem,
  cu as SidebarProvider,
  uh as SidebarRail,
  fh as SidebarSeparator,
  wh as SidebarTrigger,
  sr as Skeleton,
  _g as Slider,
  kg as Sonner,
  ef as Spinner,
  Ng as Switch,
  uo as TabDropdownMenu,
  Oh as TabFloatingMenu,
  Mh as TabToolbar,
  mo as Table,
  bo as TableBody,
  rf as TableCaption,
  cr as TableCell,
  af as TableFooter,
  aa as TableHead,
  vo as TableHeader,
  Me as TableRow,
  Cg as Tabs,
  Sg as TabsContent,
  Eg as TabsList,
  Tg as TabsTrigger,
  Kh as TextField,
  Rp as Textarea,
  An as ToggleGroup,
  Gr as ToggleGroupItem,
  Ph as Toolbar,
  jl as ToolbarCompoundLabel,
  Ot as Tooltip,
  $t as TooltipContent,
  Mt as TooltipProvider,
  It as TooltipTrigger,
  Ow as UNDO_REDO_BUTTONS_STRING_KEYS,
  Ah as UiLanguageSelector,
  Iw as UndoRedoButtons,
  Qi as VerticalTabs,
  es as VerticalTabsContent,
  ts as VerticalTabsList,
  Iu as VerticalTabsTrigger,
  qh as WizardStepper,
  er as Z_INDEX_ABOVE_DOCK,
  jn as Z_INDEX_ABOVE_POPOVER,
  of as Z_INDEX_FIRST_RUN,
  nf as Z_INDEX_MODAL,
  sf as Z_INDEX_MODAL_BACKDROP,
  xs as Z_INDEX_OVERLAY,
  cf as badgeVariants,
  lf as buttonGroupVariants,
  df as buttonVariants,
  v as cn,
  ch as getBookIdFromUSFM,
  Vp as getCommentThreadElementId,
  xa as getInventoryHeader,
  ih as getLinesFromUSFM,
  sh as getNumberFromUSFM,
  au as getStatusForItem,
  $h as getToolbarOSReservedSpaceClassName,
  oh as inventoryCountColumn,
  ah as inventoryItemColumn,
  nh as inventoryStatusColumn,
  fo as isMacOs,
  wf as isWindows,
  Hw as markerMenuItemToPaletteItem,
  op as pickTabIconUrl,
  pf as sonner,
  Rg as useEvent,
  zg as useEventAsync,
  Og as useExtraValidMarkers,
  ls as useListbox,
  Dg as usePromise,
  zp as useRecentSearches,
  Ig as useRunWhenVisible,
  Ji as useShrinkStep,
  Vl as useShrinkStepValue,
  ya as useSidebar,
  Mg as useStylesheet,
  $g as useTabIconSelection,
  Ko as useTruncationTooltip,
  ap as useViewVisibility
};
//# sourceMappingURL=index.js.map
