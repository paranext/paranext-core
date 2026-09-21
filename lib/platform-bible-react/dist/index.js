var cn = Object.defineProperty;
var _s = (t, e, r) => e in t ? cn(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var n = (t, e) => cn(t, "name", { value: e, configurable: !0 });
var Wt = (t, e, r) => _s(t, typeof e != "symbol" ? e + "" : e, r);
import { c as x, g as De, a as Pr, C as Ye, L as Qn, u as ln, T as It, b as Et, d as Tt, e as St, A as ga, D as ze, f as _e, h as Pe, i as _r, j as je, B as Z, x as Ns, k as Cs, l as Es, I as Ts, m as Ro, n as He, r as Ee, o as Ss, p as ti, P as er, q as Nr, s as rr, t as ar, v as Sa, w as Ra, y as Do, z as or, E as Da, F as Ot, R as Mo, G as fa, H as io, J as so, K as co, M as lo, N as ei, O as ia, Q as Oo, S as Lr, U as Br, V as gr, W as Rs, X as Qe, Y as Ke, Z as Ae, _ as Fe, $ as fr, a0 as Io, a1 as zo, a2 as ma, a3 as Po, a4 as ri, a5 as Ds, a6 as Ms, a7 as Os, a8 as wo, a9 as ai, aa as Ma, ab as Is, ac as oi, ad as zs, ae as Ps, af as As, ag as dn, ah as $s, ai as Vs, aj as Ls, ak as ni, al as ii, am as Ao, an as Bs, ao as si, ap as Ka, aq as wn, ar as Ha, as as js, at as Fs, au as Us, av as Ks, aw as Hs, ax as Ur, ay as $o, az as qs, aA as Gs } from "./resizable-kbSmn7tx.js";
import { aB as df, aC as wf, aD as uf, aE as pf, aF as hf, aG as gf, aH as ff, aI as mf, aJ as vf, aK as bf, aL as xf, aM as yf, aN as kf, aO as _f, aP as Nf, aQ as Cf, aR as Ef, aS as Tf, aT as Sf, aU as Rf, aV as Df, aW as Mf, aX as Of, aY as If, aZ as zf, a_ as Pf, a$ as Af, b0 as $f, b1 as Vf, b2 as Lf, b3 as Bf, b4 as jf, b5 as Ff, b6 as Uf, b7 as Kf, b8 as Hf, b9 as qf, ba as Gf } from "./resizable-kbSmn7tx.js";
import { jsx as a, jsxs as p, Fragment as gt } from "react/jsx-runtime";
import { Canon as Ft } from "@sillsdev/scripture";
import { Check as qe, Clock as un, ChevronsLeft as pn, ChevronsRight as hn, ChevronUp as ci, ChevronDown as tr, ArrowLeft as Ys, ArrowRight as Ws, BoldIcon as Xs, ItalicIcon as Js, X as Vo, AtSign as li, Pencil as Zs, Trash2 as Qs, ArrowUp as di, MoreHorizontal as tc, MailOpen as ec, Mail as rc, FilterIcon as ac, ArrowLeftIcon as oc, ChevronLeftIcon as nc, ChevronRightIcon as ic, ArrowRightIcon as sc, Copy as wi, Filter as cc, User as lc, Link as dc, CircleHelp as wc, Undo as uc, Redo as pc, SquareX as ui, FunctionSquare as pi, SquareSigma as hi, Ban as hc, AlertCircle as uo, CircleCheckIcon as gc, CircleXIcon as fc, CircleHelpIcon as mc, ArrowUpIcon as vc, ArrowDownIcon as bc, ScrollText as xc, ChevronRight as yc, ChevronLeft as kc, ChevronsUpDown as _c, MenuIcon as Nc, Menu as Cc, EllipsisVertical as Ec, MoreVertical as Tc } from "lucide-react";
import { Section as Mt, compareScrRefs as va, getChaptersForBook as Sc, formatScrRef as Me, formatReplacementString as Ue, getSectionForBook as sa, formatRelativeDate as Rc, sanitizeHtml as Lo, NumberFormat as gi, formatBytes as Dc, getCurrentLocale as Mc, usfmMarkers as ca, isPlatformError as Oc, ABORTED as Ic, getErrorMessage as zc, getFormatCallerFunction as Pc, deepEqual as Ac, isString as gn, scrRefToBBBCCCVVV as qa, defaultScrRef as Ga, formatScrRefRange as $c, getLocalizeKeyForScrollGroupId as fn, formatReplacementStringToArray as mn, collectUsjMarkers as Vc } from "platform-bible-utils";
import Jt, { useRef as U, useMemo as L, createContext as Kr, useContext as Oa, useState as N, useEffect as X, useCallback as F, useId as po, useImperativeHandle as Lc, useLayoutEffect as Zt, Fragment as Hr, Component as Bc, createElement as vn, Suspense as jc, forwardRef as fi } from "react";
import { IconSelector as mi, IconCheck as Ia, IconChevronDown as Fc, IconChevronUp as Uc, IconLayoutSidebar as Kc, IconLayoutSidebarRight as Hc, IconChevronRight as vi, IconSearch as qc, IconLoader as Gc, IconAlertOctagon as Yc, IconAlertTriangle as Wc, IconInfoCircle as Xc, IconCircleCheck as Jc } from "@tabler/icons-react";
import { createEditor as bi, $getRoot as Ge, $createParagraphNode as qr, $getSelection as oe, HISTORY_MERGE_TAG as Bo, ParagraphNode as xi, TextNode as yi, $getPreviousSelection as Zc, $isRangeSelection as Ne, $caretFromPoint as Qc, $getSiblingCaret as ki, $getChildCaret as tl, $getAdjacentChildCaret as el, $isChildCaret as rl, $normalizeCaret as al, $setSelectionFromCaretRange as ol, $getCollapsedCaretRange as nl, $getCaretInDirection as bn, $splitAtPointCaretNext as il, $isTextPointCaret as sl, $findMatchingParent as _i, $isElementNode as jr, mergeRegister as Ie, getDOMTextNode as cl, isHTMLElement as ll, CLEAR_EDITOR_COMMAND as Ni, COMMAND_PRIORITY_EDITOR as jo, shallowMergeConfig as dl, defineExtension as pe, safeCast as nr, createState as wl, FORMAT_TEXT_COMMAND as Ci, $isNodeSelection as Ei, COMMAND_PRIORITY_LOW as Ti, RootNode as ul, LineBreakNode as pl, TabNode as hl, $isEditorState as gl, createCommand as fl, CLICK_COMMAND as ml, isDOMNode as vl, $getNodeFromDOMNode as bl, $createNodeSelection as xl, $setSelection as yl, $getEditor as kl, DecoratorNode as ho, $getState as _l, toggleTextFormatType as xn, TEXT_TYPE_TO_FORMAT as Nl, $setState as Cl, addClassNamesToElement as Si, $create as El, $getNodeByKey as Tl, removeClassNamesFromElement as Sl, KEY_TAB_COMMAND as Rl, $isBlockElementNode as Dl, $createRangeSelection as Ml, $normalizeSelection__EXPERIMENTAL as Ol, OUTDENT_CONTENT_COMMAND as Il, INDENT_CONTENT_COMMAND as yn, INSERT_TAB_COMMAND as zl, COMMAND_PRIORITY_CRITICAL as Fo, $isDecoratorNode as Pl, $isParagraphNode as Al, $isTextNode as go, SELECTION_CHANGE_COMMAND as Ri, $insertNodes as $l } from "lexical";
import { HeadingNode as Vl, QuoteNode as Ll, registerRichText as Bl } from "@lexical/rich-text";
import { flushSync as jl, createPortal as Fl } from "react-dom";
import { $isTableSelection as Ul } from "@lexical/table";
import { createHeadlessEditor as Di } from "@lexical/headless";
import { $generateHtmlFromNodes as Kl, $generateNodesFromDOM as Hl } from "@lexical/html";
import { Avatar as Uo, Select as Qt, Checkbox as kn, Slot as Gr, Tabs as me, Menubar as Te, ContextMenu as Ut, Progress as _n, Slider as ta, Switch as Nn } from "radix-ui";
import { useReactTable as Mi, getFilteredRowModel as ql, getSortedRowModel as Oi, getPaginationRowModel as Gl, getCoreRowModel as Ii, flexRender as Ar, getGroupedRowModel as Yl, getExpandedRowModel as Wl } from "@tanstack/react-table";
import Xl from "markdown-to-jsx";
import { GENERATOR_NOTE_CALLER as fo, HIDDEN_NOTE_CALLER as mo, getDefaultViewOptions as Jl, isInsertEmbedOpOfType as Mr, getMarkerMenuItems as Zl, defaultStyleInfo as Ql, Editorial as td } from "@eten-tech-foundation/platform-editor";
import { cva as zi } from "class-variance-authority";
import { useHotkeys as ed } from "react-hotkeys-hook";
import { Drawer as We } from "vaul";
import { useTheme as rd } from "next-themes";
import { Toaster as ad } from "sonner";
import { toast as Wf } from "sonner";
function nh({ className: t, ...e }) {
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
n(nh, "Textarea");
function Pi({
  ref: t,
  bookId: e,
  isSelected: r,
  onSelect: o,
  onMouseDown: i,
  section: c,
  className: s,
  showCheck: l = !1,
  localizedBookNames: d,
  commandValue: w,
  suppressKeyboardHighlight: u = !1,
  disabled: h = !1,
  dimmedReason: g,
  dimmedDescription: m
}) {
  const v = U(!1), y = /* @__PURE__ */ n(() => {
    h || (v.current || o == null || o(e), setTimeout(() => {
      v.current = !1;
    }, 100));
  }, "handleSelect"), f = /* @__PURE__ */ n((j) => {
    if (h) {
      j.preventDefault();
      return;
    }
    v.current = !0, i ? i(j) : o == null || o(e);
  }, "handleMouseDown"), R = L(
    () => De(e, d),
    [e, d]
  ), _ = L(
    () => Pr(e, d),
    [e, d]
  ), E = !!g && !h, T = `${R} (${_})`, A = E ? m || `${T}, ${g}` : T, S = /* @__PURE__ */ p(
    Ye,
    {
      ref: t,
      value: w || `${e} ${Ft.bookIdToEnglishName(e)}`,
      onSelect: y,
      onMouseDown: f,
      role: "option",
      "aria-selected": r,
      "aria-disabled": h || void 0,
      "aria-label": A,
      disabled: h,
      className: x(
        !u && Qn,
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
        h && "tw:cursor-not-allowed tw:opacity-50",
        // Mirrors NumberedItemGrid's dimmed-vs-disabled split — same tokens, so chapter/verse cells
        // and book rows grey identically inside one popover: dimmed is presentation only, so it
        // never sets aria-disabled or blocks onSelect, and it yields to disabled. Restated under
        // data-selected so a dimmed row keeps its dimming while the keyboard highlight is on it,
        // rather than losing it to the suppression rule above.
        E && "tw:bg-muted/50 tw:text-muted-foreground/50 tw:data-selected:bg-muted/50 tw:data-selected:text-muted-foreground/50"
      ),
      children: [
        l && /* @__PURE__ */ a(
          qe,
          {
            className: x(
              "tw:me-2 tw:h-4 tw:w-4 tw:shrink-0",
              r ? "tw:opacity-100" : "tw:opacity-0"
            )
          }
        ),
        /* @__PURE__ */ a("span", { className: "tw:min-w-0 tw:flex-1", children: R }),
        E && // Visible rather than hover-only: cmdk never moves DOM focus onto an item (the input keeps
        // it and highlights via data-selected), so a tooltip would never open for a keyboard user.
        // Rendered text also survives the highlight, which recolours the row.
        /* @__PURE__ */ a("span", { className: "tw:ms-2 tw:shrink-0 tw:text-xs tw:italic", children: g }),
        /* @__PURE__ */ a(
          "span",
          {
            className: x(
              "tw:ms-2 tw:shrink-0 tw:text-xs",
              // Inherits the row's dimmed colour instead of setting its own, so the whole row dims
              // evenly rather than leaving the id at full strength beside a dimmed name.
              !E && "tw:text-muted-foreground"
            ),
            children: _
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
          "tw:border-s-red-200": c === Mt.OT,
          "tw:border-s-purple-200": c === Mt.NT,
          "tw:border-s-indigo-200": c === Mt.DC,
          "tw:border-s-amber-200": c === Mt.Extra
        }
      ),
      children: S
    }
  );
}
n(Pi, "BookItem");
const od = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
function nd(t) {
  return od.some((e) => e === t);
}
n(nd, "isArrowKey");
function Cn(t) {
  const e = new RegExp("^\\p{L}$", "u").test(t), r = /^[0-9]$/.test(t);
  return { isLetter: e, isDigit: r };
}
n(Cn, "getKeyCharacterType");
const id = /^%[^%]*%$/;
function ae(t, e) {
  return !t || id.test(t) ? e : t;
}
n(ae, "resolveLocalizedString");
const $r = Object.freeze({
  /** Full labels. */
  WIDE: 0,
  /** Abbreviated primary label form. */
  TIGHT: 1,
  /** Secondary field clipped with an ellipsis — CSS does this on its own. */
  TIGHTER: 2,
  /** Secondary field dropped entirely; primary field alone. */
  MINIMUM: 3
}), za = Kr($r.WIDE);
function sd() {
  return Oa(za);
}
n(sd, "useShrinkStepValue");
const Ai = Kr(void 0);
function $i() {
  return Oa(Ai);
}
n($i, "useShrinkStepOverride");
let vo = "keyboard", En = !1;
function cd() {
  En || typeof document > "u" || (En = !0, document.addEventListener(
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
n(cd, "trackInteractionModality");
function ld({
  primary: t,
  secondary: e,
  separator: r = " ",
  secondaryFirst: o = !1,
  showSecondary: i = !0,
  isPartial: c,
  fullText: s,
  className: l
}) {
  const {
    ref: d,
    open: w,
    onPointerEnter: u,
    onPointerLeave: h
  } = ln(), {
    ref: g,
    open: m,
    onPointerEnter: v,
    onPointerLeave: y
  } = ln(), [f, R] = N(!1), [_, E] = N(!1), T = U(
    // React's ref API requires `null` as the initial value for DOM refs.
    // eslint-disable-next-line no-null/no-null
    null
  ), A = i && e !== void 0, S = c ?? (e !== void 0 && !i);
  X(() => {
    var z;
    cd();
    const et = (z = T.current) == null ? void 0 : z.closest('button, [role="combobox"], [tabindex]');
    if (!et) return;
    const C = /* @__PURE__ */ n((G) => !!G && G.scrollWidth > G.clientWidth, "isClipped"), at = /* @__PURE__ */ n(() => {
      vo !== "pointer" && (S || C(g.current) || C(d.current)) && E(!0);
    }, "reveal"), I = /* @__PURE__ */ n(() => E(!1), "hide");
    return et.addEventListener("focus", at), et.addEventListener("blur", I), () => {
      et.removeEventListener("focus", at), et.removeEventListener("blur", I);
    };
  }, [S, g, d]);
  const j = F(() => {
    S && R(!0), v(), A && u();
  }, [
    S,
    A,
    v,
    u
  ]), P = F(() => {
    R(!1), E(!1), y(), h();
  }, [y, h]);
  X(() => {
    S || R(!1);
  }, [S]);
  const M = /* @__PURE__ */ a("span", { ref: g, className: "tw:min-w-0 tw:shrink tw:truncate", children: t }, "primary"), O = A ? (
    // Weighted to absorb essentially all of the shrinking, so the primary field only starts losing
    // characters once this one has none left.
    /* @__PURE__ */ a("span", { ref: d, className: "tw:min-w-0 tw:shrink-[9999] tw:truncate", children: e }, "secondary")
  ) : void 0, [W, K] = o ? [O, M] : [M, O];
  return (
    // Nested TooltipProviders are harmless in Radix, so carrying our own means this works in any
    // host, including toolbars that never set one up.
    /* @__PURE__ */ a(It, { children: /* @__PURE__ */ p(
      Et,
      {
        open: m || w || f || _,
        onOpenChange: /* @__PURE__ */ n((et) => {
          et || P();
        }, "onOpenChange"),
        children: [
          /* @__PURE__ */ a(Tt, { asChild: !0, children: /* @__PURE__ */ p(
            "span",
            {
              ref: T,
              onPointerEnter: j,
              onPointerLeave: P,
              onPointerDown: P,
              className: x("tw:flex tw:min-w-0 tw:items-center", l),
              children: [
                W,
                W && K && /* @__PURE__ */ a("span", { className: "tw:shrink-0 tw:whitespace-pre", children: r }, "separator"),
                K
              ]
            }
          ) }),
          /* @__PURE__ */ a(St, { children: s })
        ]
      }
    ) })
  );
}
n(ld, "ToolbarCompoundLabel");
function bo(t, e) {
  return `${t} ${ga[t]}${e ? ` ${Pr(t, e)} ${De(t, e)}` : ""}`;
}
n(bo, "generateCommandValue");
function mr(t, e) {
  return `${t} ${ga[t] || ""} ${e}`;
}
n(mr, "chapterItemValue");
function la(t, e, r) {
  return `${mr(t, e)}:${r}`;
}
n(la, "verseItemValue");
function zr(t) {
  if (t.includes(":")) return;
  const e = /(\d+)$/.exec(t);
  if (!e) return;
  const r = parseInt(e[1], 10), o = t.indexOf(" ");
  if (o < 0) return;
  const i = t.slice(0, o);
  return t === mr(i, r) ? r : void 0;
}
n(zr, "parseChapterFromItemValue");
function ea(t) {
  const e = /:(\d+)$/.exec(t);
  if (!e) return;
  const r = t.slice(0, t.length - e[0].length);
  if (zr(r) !== void 0)
    return parseInt(e[1], 10);
}
n(ea, "parseVerseFromItemValue");
const dd = "top-match", wd = "Show recent searches", ud = "Recent";
function pd({
  recentSearches: t,
  onSearchItemSelect: e,
  renderItem: r = /* @__PURE__ */ n((g) => String(g), "renderItem"),
  getItemKey: o = /* @__PURE__ */ n((g) => String(g), "getItemKey"),
  ariaLabel: i,
  groupHeading: c,
  id: s,
  classNameForItems: l,
  buttonClassName: d = "tw:absolute tw:end-0 tw:top-0 tw:h-full tw:px-3 tw:py-2",
  buttonVariant: w = "ghost",
  open: u,
  onOpenChange: h
}) {
  const [g, m] = N(!1), [v, y] = N(!1), f = po(), R = U(!1), _ = u !== void 0, E = _ ? u : g, T = i === "" ? "" : ae(i, wd), A = ae(c, ud), S = /* @__PURE__ */ n((O) => {
    O || (R.current = !0, y(!1)), _ || m(O), h == null || h(O);
  }, "setIsOpen"), j = /* @__PURE__ */ n((O) => {
    if (O && R.current) {
      R.current = !1;
      return;
    }
    y(O);
  }, "handleTooltipOpenChange");
  if (t.length === 0)
    return;
  const P = /* @__PURE__ */ n((O) => {
    e(O);
  }, "handleSearchItemSelect"), M = /* @__PURE__ */ a(
    Z,
    {
      variant: w,
      size: "icon",
      className: d,
      "aria-label": T,
      onPointerEnter: /* @__PURE__ */ n(() => {
        R.current = !1;
      }, "onPointerEnter"),
      children: /* @__PURE__ */ a(un, { className: "tw:h-4 tw:w-4" })
    }
  );
  return /* @__PURE__ */ p(ze, { open: E, onOpenChange: S, modal: !1, children: [
    /* @__PURE__ */ a(It, { children: T ? /* @__PURE__ */ p(Et, { open: v, onOpenChange: j, children: [
      /* @__PURE__ */ a(Tt, { asChild: !0, children: /* @__PURE__ */ a(_e, { asChild: !0, children: M }) }),
      /* @__PURE__ */ a(St, { children: T })
    ] }) : /* @__PURE__ */ a(_e, { asChild: !0, children: M }) }),
    /* @__PURE__ */ p(
      Pe,
      {
        id: s,
        "aria-labelledby": f,
        className: "tw:w-[300px]",
        align: "start",
        onKeyDown: /* @__PURE__ */ n((O) => O.stopPropagation(), "onKeyDown"),
        children: [
          /* @__PURE__ */ a(_r, { id: f, children: A }),
          t.map((O) => /* @__PURE__ */ p(
            je,
            {
              onSelect: /* @__PURE__ */ n(() => P(O), "onSelect"),
              className: x("tw:flex tw:items-center", l),
              children: [
                /* @__PURE__ */ a(un, { className: "tw:me-2 tw:h-4 tw:w-4 tw:opacity-50" }),
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
n(pd, "RecentSearches");
function ih(t, e, r = (i, c) => i === c, o = 15) {
  return (i) => {
    const c = t.filter(
      (l) => !r(l, i)
    ), s = [i, ...c.slice(0, o - 1)];
    e(s);
  };
}
n(ih, "useRecentSearches");
function ra(t, e) {
  return !e || va(t, e) === 0;
}
n(ra, "isNoOpNavigation");
function hd(t, e, r, o, i) {
  const c = L(
    () => Ns(t, e),
    [t, e]
  ), s = L(
    () => Cs(t, e),
    [t, e]
  ), l = L(
    () => Es(t, e),
    [t, e]
  ), d = L(
    () => Ts(t, e),
    [t, e]
  ), w = F(
    (u) => {
      u && o(u);
    },
    [o]
  );
  return L(() => [
    {
      onClick: /* @__PURE__ */ n(() => w(c), "onClick"),
      disabled: ra(t, c),
      title: ae(
        i == null ? void 0 : i["%webView_bookChapterControl_previousChapter%"],
        "Previous chapter"
      ),
      icon: r === "ltr" ? pn : hn,
      group: "chapter"
    },
    {
      onClick: /* @__PURE__ */ n(() => w(s), "onClick"),
      disabled: ra(t, s),
      title: ae(
        i == null ? void 0 : i["%webView_bookChapterControl_nextChapter%"],
        "Next chapter"
      ),
      icon: r === "ltr" ? hn : pn,
      group: "chapter"
    },
    {
      onClick: /* @__PURE__ */ n(() => w(l), "onClick"),
      disabled: ra(t, l),
      title: ae(
        i == null ? void 0 : i["%webView_bookChapterControl_previousVerse%"],
        "Previous verse"
      ),
      icon: ci,
      group: "verse"
    },
    {
      onClick: /* @__PURE__ */ n(() => w(d), "onClick"),
      disabled: ra(t, d),
      title: ae(
        i == null ? void 0 : i["%webView_bookChapterControl_nextVerse%"],
        "Next verse"
      ),
      icon: tr,
      group: "verse"
    }
  ], [
    t,
    r,
    w,
    c,
    l,
    d,
    s,
    i
  ]);
}
n(hd, "useQuickNavButtons");
const da = {
  // Matches start of string (`^`), one or more non-colon/space words, optionally followed by space and more words (`([^:\s]+(?:\s+[^:\s]+)*)`), end of string (`$`), case-insensitive (`i`)
  BOOK_ONLY: /^([^:\s]+(?:\s+[^:\s]+)*)$/i,
  // Same as above, but followed by a space and a chapter number (`\s+(\d+)`)
  BOOK_CHAPTER: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,
  // Same as above, but followed by a colon and optionally a verse number (`:(\d*)`)
  BOOK_CHAPTER_VERSE: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i
}, gd = [
  da.BOOK_ONLY,
  da.BOOK_CHAPTER,
  da.BOOK_CHAPTER_VERSE
];
function fd(t) {
  return da.BOOK_CHAPTER_VERSE.test(t.trim());
}
n(fd, "hasChapterVerseSeparator");
function Tn(t, e) {
  return Ft.bookIdToNumber(t) < Ft.bookIdToNumber(e.book);
}
n(Tn, "isBookBefore");
function md(t, e, r) {
  const o = Ft.bookIdToNumber(t) - Ft.bookIdToNumber(r.book);
  return o < 0 ? !0 : o > 0 ? !1 : e < r.chapterNum;
}
n(md, "isChapterBefore");
function Ya(t, e, r, o) {
  const i = Ft.bookIdToNumber(t) - Ft.bookIdToNumber(o.book);
  return i < 0 ? !0 : i > 0 ? !1 : e < o.chapterNum ? !0 : e > o.chapterNum ? !1 : r < o.verseNum;
}
n(Ya, "isVerseBefore");
function Be(t) {
  return Sc(Ft.bookIdToNumber(t));
}
n(Be, "fetchEndChapter");
function vd(t, e, r) {
  if (!t.trim() || e.length === 0) return;
  const o = gd.reduce(
    (i, c) => {
      if (i) return i;
      const s = c.exec(t.trim());
      if (s) {
        const [l, d = void 0, w = void 0] = s.slice(1);
        let u;
        const h = e.filter((g) => Ro(g, l, r));
        if (h.length === 1 && ([u] = h), !u && d) {
          if (Ft.isBookIdValid(l)) {
            const g = l.toUpperCase();
            e.includes(g) && (u = g);
          }
          if (!u && r) {
            const g = Array.from(r.entries()).find(
              ([, m]) => m.localizedId.toLowerCase() === l.toLowerCase()
            );
            g && e.includes(g[0]) && ([u] = g);
          }
        }
        if (!u && d) {
          const m = (/* @__PURE__ */ n((v) => Object.keys(ga).find(
            (y) => ga[y].toLowerCase() === v.toLowerCase()
          ), "getBookIdFromEnglishName"))(l);
          if (m && e.includes(m) && (u = m), !u && r) {
            const v = Array.from(r.entries()).find(
              ([, y]) => y.localizedName.toLowerCase() === l.toLowerCase()
            );
            v && e.includes(v[0]) && ([u] = v);
          }
        }
        if (u) {
          let g = d ? parseInt(d, 10) : void 0;
          g && g > Be(u) && (g = Math.max(Be(u), 1));
          const m = w ? parseInt(w, 10) : void 0;
          return {
            book: u,
            chapterNum: g,
            verseNum: m
          };
        }
      }
    },
    void 0
  );
  if (o) return o;
}
n(vd, "calculateTopMatch");
function xo(t) {
  return {
    [Mt.OT]: t.filter((e) => Ft.isBookOT(e)),
    [Mt.NT]: t.filter((e) => Ft.isBookNT(e)),
    [Mt.DC]: t.filter((e) => Ft.isBookDC(e)),
    [Mt.Extra]: t.filter((e) => Ft.extraBooks().includes(e))
  };
}
n(xo, "groupBooksBySection");
function bd(t, e) {
  const r = new Set(t), o = e.filter((w) => !r.has(w)), i = new Set(o), c = i.size === 0 ? t : Ft.allBookIds.filter(
    (w) => r.has(w) || i.has(w)
  ), s = xo(c), l = Object.values(s).flat(), d = xo(t);
  return {
    projectBooksBySection: d,
    reachableBooksBySection: s,
    reachableBooks: l,
    // Grouped and flattened like `reachableBooks`, so it inherits the same peripheral-id exclusion.
    projectBooks: Object.values(d).flat(),
    // Derived from the grouped-and-flattened list, so a peripheral id that grouping dropped can
    // never be marked dimmed for a list it is not part of.
    booksOutsideProject: new Set(l.filter((w) => !r.has(w)))
  };
}
n(bd, "deriveBookChapterControlBookLists");
const yo = 6;
function xd(t) {
  return t === "ArrowLeft" ? "ArrowRight" : t === "ArrowRight" ? "ArrowLeft" : t;
}
n(xd, "mirrorHorizontalKey");
function yd({
  current: t,
  key: e,
  max: r,
  direction: o = "ltr"
}) {
  if (r <= 0) return t;
  if (t < 1 || t > r) return 1;
  switch (o === "rtl" ? xd(e) : e) {
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
n(yd, "computeTargetGridItem");
function Vi({
  count: t,
  valueBuilder: e,
  onSelect: r,
  itemRef: o,
  isDisabled: i,
  isDimmed: c,
  isSelected: s,
  suppressKeyboardHighlight: l = !1,
  className: d
}) {
  if (!(t <= 0))
    return /* @__PURE__ */ a(He, { children: /* @__PURE__ */ a(
      "div",
      {
        className: x("tw:grid tw:gap-1", d),
        style: { gridTemplateColumns: `repeat(${yo}, minmax(0, 1fr))` },
        children: Array.from({ length: t }, (w, u) => u + 1).map((w) => {
          const u = (i == null ? void 0 : i(w)) ?? !1;
          return /* @__PURE__ */ a(
            Ye,
            {
              value: e(w),
              onSelect: /* @__PURE__ */ n(() => {
                u || r(w);
              }, "onSelect"),
              ref: o(w),
              disabled: u,
              "aria-disabled": u || void 0,
              className: x(
                "tw:h-8 tw:w-8 tw:cursor-pointer tw:justify-center tw:rounded-md tw:text-center tw:text-sm",
                // Hide CommandItem's own trailing check icon (a multiselect affordance this grid
                // doesn't use) and give cells pointer feedback distinct from the keyboard focus ring.
                "tw:[&>svg]:hidden tw:hover:bg-muted",
                !l && Qn,
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
                  "tw:bg-primary tw:text-primary-foreground tw:hover:bg-primary/90 tw:data-selected:bg-primary tw:data-selected:text-primary-foreground tw:data-selected:ring-primary-foreground/70": (s == null ? void 0 : s(w)) ?? !1
                },
                {
                  // Same tokens as BookItem, so book rows and chapter/verse cells grey identically
                  // inside one popover. Restated under data-selected so a dimmed cell keeps its
                  // dimming while the keyboard highlight is on it, rather than losing it to the
                  // suppression rule above.
                  "tw:bg-muted/50 tw:text-muted-foreground/50 tw:data-selected:bg-muted/50 tw:data-selected:text-muted-foreground/50": ((c == null ? void 0 : c(w)) ?? !1) && !u
                },
                u && "tw:cursor-not-allowed tw:opacity-40"
              ),
              children: w
            },
            w
          );
        })
      }
    ) });
}
n(Vi, "NumberedItemGrid");
function Sn({
  bookId: t,
  scrRef: e,
  onChapterSelect: r,
  setChapterRef: o,
  isChapterDimmed: i,
  isChapterDisabled: c,
  suppressKeyboardHighlight: s,
  className: l
}) {
  if (t)
    return /* @__PURE__ */ a(
      Vi,
      {
        count: Be(t),
        valueBuilder: /* @__PURE__ */ n((d) => mr(t, d), "valueBuilder"),
        onSelect: r,
        itemRef: o,
        isDisabled: c,
        isDimmed: i,
        isSelected: /* @__PURE__ */ n((d) => t === e.book && d === e.chapterNum, "isSelected"),
        suppressKeyboardHighlight: s,
        className: l
      }
    );
}
n(Sn, "ChapterGrid");
function Rn({
  bookId: t,
  chapterNum: e,
  endVerse: r,
  scrRef: o,
  onVerseSelect: i,
  setVerseRef: c,
  isVerseDimmed: s,
  isVerseDisabled: l,
  suppressKeyboardHighlight: d,
  className: w
}) {
  if (!(!t || r <= 0))
    return /* @__PURE__ */ a(
      Vi,
      {
        count: r,
        valueBuilder: /* @__PURE__ */ n((u) => la(t, e, u), "valueBuilder"),
        onSelect: i,
        itemRef: c,
        isDisabled: l,
        isDimmed: s,
        isSelected: /* @__PURE__ */ n((u) => t === o.book && e === o.chapterNum && u === o.verseNum, "isSelected"),
        suppressKeyboardHighlight: d,
        className: w
      }
    );
}
n(Rn, "VerseGrid");
const kd = "a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]";
function _d(t) {
  return Array.from(t.querySelectorAll(kd)).filter(
    (e) => e.tabIndex >= 0
  );
}
n(_d, "getTabStops");
function Wa({
  scrRef: t,
  handleSubmit: e,
  className: r,
  getActiveBookIds: o,
  getAdditionalBookIds: i,
  localizedBookNames: c,
  localizedStrings: s,
  recentSearches: l,
  onAddRecentSearch: d,
  id: w,
  getEndVerse: u,
  disableReferencesUpTo: h,
  submitKeys: g,
  triggerContent: m,
  triggerVariant: v = "outline",
  showTriggerChevron: y = !1,
  onOpenChange: f,
  onCloseAutoFocus: R,
  modal: _ = !1,
  align: E = "center",
  ref: T,
  disabled: A
}) {
  const S = Ee(), j = sd(), [P, M] = N(!1), [O, W] = N(""), [K, et] = N(""), [C, at] = N("books"), [I, z] = N(void 0), [G, st] = N(
    void 0
  ), [nt, wt] = N(void 0), [Rt, Q] = N(!1), [dt, bt] = N(!1), [ht, zt] = N(!1), [qt, ut] = N(!1), ve = U(null), ne = U(!1), xt = U(void 0), ft = U(void 0), yt = U(void 0), Gt = U(void 0), Dt = U({}), Ct = U({}), mt = F(
    (b) => {
      e(b), d && d(b);
    },
    [e, d]
  ), ie = L(() => o ? o() : Ss, [o]), se = L(
    () => o && i ? i() : [],
    [o, i]
  ), {
    projectBooksBySection: ce,
    reachableBooksBySection: $e,
    reachableBooks: Kt,
    projectBooks: Ve,
    booksOutsideProject: Pt
  } = L(
    () => bd(ie, se),
    [ie, se]
  ), _t = Pt.has(t.book), be = L(() => K.trim() ? xo(
    Kt.filter((b) => Ro(b, K, c))
  ) : dt ? $e : ce, [
    ce,
    $e,
    Kt,
    dt,
    K,
    c
  ]), $ = L(
    () => vd(K, Kt, c),
    [K, Kt, c]
  ), vt = L(() => {
    if (!$) return;
    const b = O.startsWith(`${$.book} `) ? O : "", q = ea(b), ot = zr(b);
    return {
      book: $.book,
      chapterNum: ot ?? $.chapterNum ?? 1,
      verseNum: q ?? $.verseNum ?? 1
    };
  }, [$, O]), le = U(!1);
  X(() => {
    if (!le.current) {
      le.current = !0;
      return;
    }
    f == null || f(P);
  }, [P, f]);
  const te = F(() => {
    vt && (h && Ya(
      vt.book,
      vt.chapterNum,
      vt.verseNum,
      h
    ) || (mt(vt), M(!1), et(""), W("")));
  }, [mt, vt, h]), D = F(
    (b) => {
      const q = G ?? ($ == null ? void 0 : $.book), ot = nt ?? ($ == null ? void 0 : $.chapterNum);
      !q || !ot || (mt({
        book: q,
        chapterNum: ot,
        verseNum: b
      }), M(!1));
    },
    [mt, G, nt, $]
  ), H = F(
    (b) => {
      if (h && Tn(b, h)) return;
      if (Be(b) <= 1) {
        mt({
          book: b,
          chapterNum: 1,
          verseNum: 1
        }), M(!1), et("");
        return;
      }
      z(b), at("chapters");
    },
    [mt, h]
  ), J = F(
    (b) => {
      const q = C === "chapters" ? I : $ == null ? void 0 : $.book;
      if (q) {
        if (u && u(q, b) > 1) {
          st(q), wt(b), at("verses"), W("");
          return;
        }
        mt({
          book: q,
          chapterNum: b,
          verseNum: 1
        }), M(!1);
      }
    },
    [mt, C, I, $, u]
  ), k = F(
    (b) => {
      mt(b), M(!1), et("");
    },
    [mt]
  ), Y = hd(
    t,
    dt ? Kt : Ve,
    S,
    e,
    s
  ), V = F((b) => {
    et(b), ut(!1);
  }, []), rt = F(() => {
    at("books"), z(void 0), st(void 0), wt(void 0), ut(!1), setTimeout(() => {
      var b;
      (b = ft.current) == null || b.focus();
    }, 0);
  }, []), it = F(() => {
    const b = G;
    st(void 0), wt(void 0), b ? (z(b), at("chapters"), W("")) : rt();
  }, [G, rt]), lt = F(
    (b) => {
      M(b), b && (at("books"), z(void 0), st(void 0), wt(void 0), et(""), ut(!1), zt(!1), bt(_t));
    },
    [_t]
  );
  X(() => {
    A && lt(!1);
  }, [A, lt]);
  const [Nt, At] = N(0);
  X(() => {
    var b;
    Nt !== 0 && ((b = ft.current) == null || b.focus());
  }, [Nt]), Lc(
    T,
    () => ({
      open: /* @__PURE__ */ n(() => {
        A || (lt(!0), At((b) => b + 1));
      }, "open")
    }),
    [lt, A]
  );
  const { otLong: Lt, ntLong: ee, dcLong: Er, extraLong: Tr } = {
    otLong: s == null ? void 0 : s["%scripture_section_ot_long%"],
    ntLong: s == null ? void 0 : s["%scripture_section_nt_long%"],
    dcLong: s == null ? void 0 : s["%scripture_section_dc_long%"],
    extraLong: s == null ? void 0 : s["%scripture_section_extra_long%"]
  }, ir = F(
    (b) => ti(b, Lt, ee, Er, Tr),
    [Lt, ee, Er, Tr]
  ), Xe = F(
    (b) => $ ? !!$.chapterNum && !b.toString().includes($.chapterNum.toString()) : !1,
    [$]
  ), Va = L(
    () => Me(
      t,
      c ? De(t.book, c) : "English"
    ),
    [t, c]
  ), rn = L(
    () => j >= $r.TIGHT ? Pr(t.book, c) : De(t.book, c),
    [t.book, c, j]
  ), La = `${t.chapterNum}:${t.verseNum}`, Sr = F((b) => (q) => {
    Dt.current[b] = q;
  }, []), Rr = F((b) => (q) => {
    Ct.current[b] = q;
  }, []), sr = L(
    () => fd(K),
    [K]
  ), xe = L(() => !u || !$ || !$.chapterNum || !sr ? !1 : u($.book, $.chapterNum) > 0, [u, $, sr]), cr = C === "books" && !Rt && !K.trim() && Pt.size > 0, Ba = F(
    (b) => h ? Tn(b, h) : !1,
    [h]
  ), Re = F(
    (b) => (q) => h ? md(b, q, h) : !1,
    [h]
  ), lr = F(
    (b, q) => (ot) => h ? Ya(b, q, ot, h) : !1,
    [h]
  ), dr = ae(
    s == null ? void 0 : s["%webView_bookChapterControl_selectChapter%"],
    "Select chapter"
  ), ja = ae(
    s == null ? void 0 : s["%webView_bookChapterControl_selectVerse%"],
    "Select verse"
  ), Yr = C === "verses" ? ae(
    s == null ? void 0 : s["%webView_bookChapterControl_backToChapters%"],
    "Back to chapters"
  ) : ae(
    s == null ? void 0 : s["%webView_bookChapterControl_backToBooks%"],
    "Back to books"
  ), Fa = ae(
    s == null ? void 0 : s["%webView_bookChapterControl_bookNotInProject%"],
    "Not in project"
  ), Wr = ae(
    s == null ? void 0 : s["%webView_bookChapterControl_bookNotInProjectDescription%"],
    "{book} is not in this project"
  ), Xr = F(
    (b) => Ue(Wr, {
      book: `${De(b, c)} (${Pr(
        b,
        c
      )})`
    }),
    [Wr, c]
  ), Jr = ae(
    s == null ? void 0 : s["%webView_bookChapterControl_showMoreBooks%"],
    "Show more books"
  ), wr = ae(
    s == null ? void 0 : s["%webView_bookChapterControl_showProjectBooksOnly%"],
    "Show project books only"
  ), Zr = F(
    (b) => {
      (b.key === "Home" || b.key === "End") && b.stopPropagation(), g && g.includes(b.key) && $ && $.chapterNum !== void 0 && $.verseNum !== void 0 && (b.preventDefault(), b.stopPropagation(), te());
    },
    [g, $, te]
  ), Qr = F(
    (b) => {
      var on, nn;
      if (b.ctrlKey) return;
      const q = b.target instanceof HTMLElement ? b.target : void 0;
      if (!(!!q && !!((on = xt.current) != null && on.contains(q))) && (q != null && q.closest('[role="menu"], [role="menuitem"]')))
        return;
      if (b.key === "Tab") {
        const Vt = xt.current ? _d(xt.current) : [];
        if (Vt.length === 0) {
          b.preventDefault(), b.stopPropagation();
          return;
        }
        const we = Vt[Vt.length - 1], Yt = b.shiftKey ? Vt[0] : we;
        document.activeElement === Yt && (b.preventDefault(), b.stopPropagation(), (b.shiftKey ? we : Vt[0]).focus());
        return;
      }
      const { isLetter: Bt, isDigit: Ht } = Cn(b.key);
      if ((C === "chapters" || C === "verses") && (b.key === " " || b.key === "Enter")) {
        if (!!(q != null && q.closest(
          'button, a, input, select, textarea, [role="button"]'
        ))) {
          b.stopPropagation();
          return;
        }
        const we = (() => {
          if (C === "verses") {
            const Dr = G, sn = nt, Ua = ea(O);
            return !Dr || !sn || Ua === void 0 ? void 0 : {
              isDisabled: lr(Dr, sn)(Ua),
              activate: /* @__PURE__ */ n(() => D(Ua), "activate")
            };
          }
          const Yt = I, ge = zr(O);
          if (!(!Yt || ge === void 0))
            return {
              isDisabled: Re(Yt)(ge),
              activate: /* @__PURE__ */ n(() => J(ge), "activate")
            };
        })();
        if (we) {
          b.preventDefault(), b.stopPropagation(), we.isDisabled || we.activate();
          return;
        }
      }
      if (C === "books" && $ && !Rt && b.key === "Enter" && !(q !== ft.current && !!(q != null && q.closest('button, a, input, select, textarea, [role="button"]')))) {
        b.preventDefault(), b.stopPropagation(), te();
        return;
      }
      if ((C === "chapters" || C === "verses") && (Bt || Ht)) {
        b.preventDefault(), b.stopPropagation();
        return;
      }
      if (b.key === "Backspace" && (C === "chapters" || C === "verses")) {
        b.preventDefault(), b.stopPropagation(), C === "verses" ? it() : rt();
        return;
      }
      if (!nd(b.key) || Rt) return;
      if (C === "books" && !qt && (b.key === "ArrowLeft" || b.key === "ArrowRight")) {
        const Vt = q === ft.current ? ft.current : void 0, we = (Vt == null ? void 0 : Vt.selectionStart) ?? 0, Yt = (Vt == null ? void 0 : Vt.selectionEnd) ?? 0, ge = S === "rtl" ? b.key === "ArrowRight" : b.key === "ArrowLeft";
        if (!!Vt && (we !== Yt || (ge ? we > 0 : Yt < Vt.value.length))) return;
      }
      if (b.shiftKey || C === "books" && q !== ft.current && (q != null && q.closest('button, a, [role="button"]')))
        return;
      const kt = (() => {
        const Vt = C === "books" && $ && xe && $.chapterNum ? { bookId: $.book, chapterNum: $.chapterNum } : void 0, we = C === "verses" ? { bookId: G, chapterNum: nt } : Vt;
        if (we) {
          const { bookId: Yt, chapterNum: ge } = we;
          return !Yt || !ge || !u ? void 0 : {
            max: u(Yt, ge),
            current: ea(O) ?? 0,
            buildValue: /* @__PURE__ */ n((Dr) => la(Yt, ge, Dr), "buildValue"),
            refs: Ct,
            // In books view focus stays on the CommandInput so the user can keep typing; only
            // the dedicated grid views pull focus off the back button.
            takeFocus: C === "verses"
          };
        }
        if (C === "chapters" || C === "books" && $ && Be($.book) > 1) {
          const Yt = C === "chapters" ? I : $ == null ? void 0 : $.book;
          return Yt ? {
            max: Be(Yt),
            current: zr(O) ?? 0,
            buildValue: /* @__PURE__ */ n((ge) => mr(Yt, ge), "buildValue"),
            refs: Dt,
            takeFocus: C === "chapters"
          } : void 0;
        }
      })();
      if (!kt || kt.max <= 0) return;
      C === "books" && ut(!0), kt.takeFocus && ((nn = xt.current) == null || nn.focus());
      const re = yd({
        current: kt.current,
        key: b.key,
        max: kt.max,
        direction: S
      });
      if (b.preventDefault(), b.stopPropagation(), re === kt.current) return;
      W(kt.buildValue(re));
      const an = kt.refs.current[re];
      an && an.scrollIntoView({ block: "nearest", behavior: "smooth" });
    },
    [
      C,
      $,
      xe,
      Rt,
      qt,
      S,
      rt,
      it,
      J,
      te,
      D,
      Re,
      lr,
      I,
      G,
      nt,
      u,
      O
    ]
  ), B = F((b) => {
    var Bt, Ht;
    if (b.shiftKey || b.key === "Tab" || b.key === " ") return;
    if (b.key === "Enter") {
      b.stopPropagation();
      return;
    }
    if (b.key === "ArrowUp" || b.key === "ArrowDown") {
      (Bt = ft.current) == null || Bt.focus();
      return;
    }
    const { isLetter: q, isDigit: ot } = Cn(b.key);
    (q || ot) && (b.preventDefault(), et((kt) => kt + b.key), (Ht = ft.current) == null || Ht.focus(), Q(!1));
  }, []);
  Zt(() => {
    const b = setTimeout(() => {
      if (P && C === "books" && yt.current && Gt.current) {
        const q = yt.current, ot = Gt.current, Bt = ot.offsetTop, Ht = q.clientHeight, kt = ot.clientHeight, re = Bt - Ht / 2 + kt / 2;
        q.scrollTo({
          top: Math.max(0, re),
          behavior: "smooth"
        }), W(bo(t.book));
      }
    }, 0);
    return () => {
      clearTimeout(b);
    };
  }, [P, C, K, $, t.book]), Zt(() => {
    if (C === "chapters" && I) {
      const b = I === t.book, q = b ? t.chapterNum : 1;
      W(mr(I, q)), setTimeout(() => {
        if (yt.current)
          if (b) {
            const ot = Dt.current[t.chapterNum];
            ot && ot.scrollIntoView({ block: "center", behavior: "smooth" });
          } else
            yt.current.scrollTo({ top: 0 });
        xt.current && xt.current.focus();
      }, 0);
    }
  }, [C, I, $, t.book, t.chapterNum]), Zt(() => {
    if (C === "verses" && G && nt !== void 0) {
      const b = G === t.book && nt === t.chapterNum, q = b ? t.verseNum : 1;
      W(
        la(G, nt, q)
      ), setTimeout(() => {
        if (yt.current)
          if (b) {
            const ot = Ct.current[t.verseNum];
            ot && ot.scrollIntoView({ block: "center", behavior: "smooth" });
          } else
            yt.current.scrollTo({ top: 0 });
        xt.current && xt.current.focus();
      }, 0);
    }
  }, [
    C,
    G,
    nt,
    t.book,
    t.chapterNum,
    t.verseNum
  ]);
  const tt = $ ? `${$.book} ${$.chapterNum ?? ""} ${$.verseNum ?? ""} ${xe}` : "", $t = U(""), de = U(""), he = L(() => {
    if (C !== "books" || !$ || Rt) return;
    const { book: b, chapterNum: q, verseNum: ot } = $;
    if (xe && q && u)
      return {
        max: u(b, q),
        initial: ot ?? (b === t.book && q === t.chapterNum ? t.verseNum : 1),
        parse: ea,
        buildValue: /* @__PURE__ */ n((Ht) => la(b, q, Ht), "buildValue")
      };
    const Bt = Be(b);
    if (!(Bt <= 1))
      return {
        max: Bt,
        initial: q ?? (b === t.book ? t.chapterNum : 1),
        parse: zr,
        buildValue: /* @__PURE__ */ n((Ht) => mr(b, Ht), "buildValue")
      };
  }, [
    C,
    $,
    Rt,
    xe,
    u,
    t.book,
    t.chapterNum,
    t.verseNum
  ]);
  return Zt(() => {
    if (C !== "books" || !$ || !he || he.max <= 0) {
      $t.current = "";
      return;
    }
    const { max: b, initial: q, parse: ot, buildValue: Bt } = he, Ht = /* @__PURE__ */ n((kt) => {
      const re = ot(kt);
      return re !== void 0 && re >= 1 && re <= b && kt === Bt(re) ? re : void 0;
    }, "cellNamedBy");
    if ($t.current !== tt) {
      $t.current = tt;
      const kt = Bt(Math.min(Math.max(q, 1), b));
      de.current = kt, W(kt);
      return;
    }
    if (Ht(O) !== void 0) {
      de.current = O;
      return;
    }
    W(
      Ht(de.current) !== void 0 ? de.current : Bt(Math.min(Math.max(q, 1), b))
    );
  }, [C, $, he, tt, O]), /* @__PURE__ */ p(er, { open: P, onOpenChange: lt, modal: _, children: [
    /* @__PURE__ */ a(Nr, { asChild: !0, children: /* @__PURE__ */ p(
      Z,
      {
        ref: ve,
        "aria-label": "book-chapter-trigger",
        variant: v,
        role: "combobox",
        "aria-expanded": P,
        disabled: A,
        className: x(
          "tw:h-8 tw:w-full tw:min-w-16 tw:max-w-48 tw:shrink tw:overflow-hidden tw:px-1",
          r
        ),
        onClick: /* @__PURE__ */ n((b) => {
          ne.current && (ne.current = !1, b.preventDefault());
        }, "onClick"),
        children: [
          m ?? /* @__PURE__ */ a(
            ld,
            {
              primary: rn,
              secondary: La,
              showSecondary: j < $r.MINIMUM,
              isPartial: j >= $r.TIGHT,
              fullText: Va
            }
          ),
          y && /* @__PURE__ */ a(
            mi,
            {
              "data-testid": "book-chapter-control-chevron",
              className: "tw:ms-2 tw:size-4 tw:shrink-0 tw:opacity-50"
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ a(
      rr,
      {
        id: w,
        forceMount: !0,
        className: "tw:w-[280px] tw:p-0",
        align: E,
        onKeyDownCapture: Qr,
        onKeyDown: /* @__PURE__ */ n((b) => b.stopPropagation(), "onKeyDown"),
        onPointerDownOutside: /* @__PURE__ */ n((b) => {
          const { target: q } = b;
          P && ve.current && q instanceof Node && ve.current.contains(q) && (ne.current = !0, lt(!1));
        }, "onPointerDownOutside"),
        onCloseAutoFocus: R,
        children: /* @__PURE__ */ a(It, { children: /* @__PURE__ */ p(
          ar,
          {
            ref: xt,
            loop: !0,
            value: O,
            onValueChange: W,
            disablePointerSelection: !0,
            shouldFilter: !1,
            children: [
              C === "books" ? /* @__PURE__ */ p(
                "div",
                {
                  className: x("tw:flex tw:items-end", Rt && "tw:pb-1"),
                  onFocus: /* @__PURE__ */ n((b) => {
                    zt(b.target !== ft.current);
                  }, "onFocus"),
                  onBlur: /* @__PURE__ */ n((b) => {
                    b.currentTarget.contains(b.relatedTarget) || zt(!1);
                  }, "onBlur"),
                  children: [
                    /* @__PURE__ */ p("div", { className: "tw:relative tw:flex-1", children: [
                      /* @__PURE__ */ a(
                        Sa,
                        {
                          ref: ft,
                          value: K,
                          onValueChange: V,
                          onKeyDown: Zr,
                          onFocus: /* @__PURE__ */ n(() => Q(!1), "onFocus"),
                          className: l && l.length > 0 ? "tw:pe-8!" : "",
                          spaceSelectsHighlightedItem: !0
                        }
                      ),
                      l && l.length > 0 && /* @__PURE__ */ a(
                        pd,
                        {
                          recentSearches: l,
                          onSearchItemSelect: k,
                          renderItem: /* @__PURE__ */ n((b) => Me(b, "English"), "renderItem"),
                          getItemKey: /* @__PURE__ */ n((b) => `${b.book}-${b.chapterNum}-${b.verseNum}`, "getItemKey"),
                          ariaLabel: s == null ? void 0 : s["%history_recentSearches_ariaLabel%"],
                          groupHeading: s == null ? void 0 : s["%history_recent%"],
                          buttonClassName: "tw:absolute tw:end-1 tw:top-1"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ a(Ra, { className: "tw:translate-y-px tw:gap-1 tw:pe-2", children: Y.map(
                      ({ onClick: b, disabled: q, title: ot, icon: Bt, group: Ht }, kt) => {
                        const re = /* @__PURE__ */ a(
                          Z,
                          {
                            variant: "ghost",
                            size: "sm",
                            onClick: /* @__PURE__ */ n(() => {
                              Q(!0), b();
                            }, "onClick"),
                            disabled: q,
                            className: "tw:h-8.5 tw:w-6 tw:rounded-lg! tw:p-0",
                            "aria-label": ot,
                            onKeyDown: B,
                            children: /* @__PURE__ */ a(Bt, {})
                          }
                        );
                        return (
                          // Keyed by position, not by `title`: the titles are localized, so they all
                          // change together the moment the strings resolve or the UI language does.
                          // Keying on them would remount all four buttons at that instant, dropping
                          // focus off whichever one the user was on and destroying an open tooltip.
                          // The set is fixed in size and order, so the index is stable.
                          // eslint-disable-next-line react/no-array-index-key
                          /* @__PURE__ */ p(Hr, { children: [
                            kt > 0 && Ht !== Y[kt - 1].group && /* @__PURE__ */ a(Do, {}),
                            q ? (
                              // A disabled Button carries `pointer-events: none` from its own base
                              // variants, so it is not hit-tested: neither a Radix tooltip nor a
                              // `title` ON THE BUTTON can ever fire. These arrows come back disabled
                              // at the edges of the canon — Genesis 1:1 is the default state of a
                              // freshly opened project — which is exactly where a user asks what the
                              // button was for. The wrapper is still hit-tested, so the native
                              // tooltip it carries is the one hover explanation available here.
                              /* @__PURE__ */ a("span", { title: ot, className: "tw:inline-flex", children: re })
                            ) : /* @__PURE__ */ p(Et, { children: [
                              /* @__PURE__ */ a(Tt, { asChild: !0, children: re }),
                              /* @__PURE__ */ a(St, { children: ot })
                            ] })
                          ] }, `${Ht}-${kt}`)
                        );
                      }
                    ) })
                  ]
                }
              ) : /* @__PURE__ */ p("div", { className: "tw:flex tw:items-center tw:border-b tw:px-3 tw:py-1", children: [
                /* @__PURE__ */ p(Et, { children: [
                  /* @__PURE__ */ a(Tt, { asChild: !0, children: /* @__PURE__ */ a(
                    Z,
                    {
                      variant: "ghost",
                      size: "sm",
                      onClick: C === "verses" ? it : rt,
                      className: "tw:me-2 tw:h-6 tw:w-6 tw:p-0",
                      tabIndex: -1,
                      "aria-label": Yr,
                      children: S === "ltr" ? /* @__PURE__ */ a(Ys, { className: "tw:h-4 tw:w-4" }) : /* @__PURE__ */ a(Ws, { className: "tw:h-4 tw:w-4" })
                    }
                  ) }),
                  /* @__PURE__ */ a(St, { children: Yr })
                ] }),
                C === "chapters" && I && /* @__PURE__ */ a("span", { tabIndex: -1, className: "tw:text-sm tw:font-medium", children: De(I, c) }),
                C === "verses" && G && nt !== void 0 && /* @__PURE__ */ a("span", { tabIndex: -1, className: "tw:text-sm tw:font-medium", children: `${De(G, c)} ${nt}` }),
                /* @__PURE__ */ a(
                  "span",
                  {
                    tabIndex: -1,
                    className: "tw:ms-auto tw:text-sm tw:font-medium tw:text-muted-foreground",
                    children: C === "verses" ? ja : dr
                  }
                )
              ] }),
              !Rt && /* @__PURE__ */ p(or, { ref: yt, children: [
                C === "books" && /* @__PURE__ */ p(gt, { children: [
                  !$ && Object.entries(be).map(([b, q]) => {
                    if (q.length !== 0)
                      return (
                        // We are mapping over filteredBooksByType, which uses Section as key type
                        // eslint-disable-next-line no-type-assertion/no-type-assertion
                        /* @__PURE__ */ a(He, { heading: ir(b), children: q.map((ot) => /* @__PURE__ */ a(
                          Pi,
                          {
                            bookId: ot,
                            onSelect: /* @__PURE__ */ n((Bt) => H(Bt), "onSelect"),
                            section: sa(ot),
                            commandValue: bo(ot),
                            suppressKeyboardHighlight: ht,
                            ref: ot === t.book ? Gt : void 0,
                            localizedBookNames: c,
                            disabled: Ba(ot),
                            dimmedReason: Pt.has(ot) ? Fa : void 0,
                            dimmedDescription: Pt.has(ot) ? Xr(ot) : void 0
                          },
                          ot
                        )) }, b)
                      );
                  }),
                  $ && vt && /* @__PURE__ */ a(He, { children: /* @__PURE__ */ p(
                    Ye,
                    {
                      value: dd,
                      onSelect: te,
                      disabled: !!h && Ya(
                        vt.book,
                        vt.chapterNum,
                        vt.verseNum,
                        h
                      ),
                      className: "tw:font-semibold tw:text-primary tw:hover:bg-muted tw:[&>svg:last-child]:hidden",
                      children: [
                        /* @__PURE__ */ a("span", { className: "tw:min-w-0 tw:flex-1", children: Me(
                          vt,
                          De($.book, c)
                        ) }),
                        /* @__PURE__ */ a("span", { className: "tw:ms-2 tw:shrink-0 tw:text-xs tw:text-muted-foreground", children: Pr($.book, c) })
                      ]
                    },
                    "top-match"
                  ) }),
                  $ && xe && $.chapterNum && u && // No heading over this grid: the top-match row sits directly above it and
                  // already names the book and the reference the grid is refining, so a
                  // heading here only repeated the book back to the user one line later. The
                  // dedicated verses view still carries one, because there it is the only
                  // thing naming the book.
                  /* @__PURE__ */ a(
                    Rn,
                    {
                      bookId: $.book,
                      chapterNum: $.chapterNum,
                      endVerse: u($.book, $.chapterNum),
                      scrRef: t,
                      onVerseSelect: D,
                      setVerseRef: Rr,
                      isVerseDisabled: lr($.book, $.chapterNum),
                      suppressKeyboardHighlight: ht,
                      className: "tw:px-4 tw:pb-4"
                    }
                  ),
                  $ && !xe && Be($.book) > 1 && // No heading here either, for the same reason as the verse preview above:
                  // the top-match row directly above already names the book.
                  /* @__PURE__ */ a(
                    Sn,
                    {
                      bookId: $.book,
                      scrRef: t,
                      onChapterSelect: J,
                      setChapterRef: Sr,
                      isChapterDimmed: Xe,
                      isChapterDisabled: Re($.book),
                      suppressKeyboardHighlight: ht,
                      className: "tw:px-4 tw:pb-4"
                    }
                  )
                ] }),
                C === "chapters" && I && /* @__PURE__ */ a(
                  Sn,
                  {
                    bookId: I,
                    scrRef: t,
                    onChapterSelect: J,
                    setChapterRef: Sr,
                    isChapterDisabled: Re(I),
                    className: "tw:p-4"
                  }
                ),
                C === "verses" && G && nt !== void 0 && u && /* @__PURE__ */ a(
                  Rn,
                  {
                    bookId: G,
                    chapterNum: nt,
                    endVerse: u(
                      G,
                      nt
                    ),
                    scrRef: t,
                    onVerseSelect: D,
                    setVerseRef: Rr,
                    isVerseDisabled: lr(
                      G,
                      nt
                    ),
                    className: "tw:p-4"
                  }
                )
              ] }),
              cr && /* @__PURE__ */ a("div", { className: "tw:border-t tw:p-1", children: /* @__PURE__ */ a(
                Z,
                {
                  variant: "ghost",
                  size: "sm",
                  className: "tw:w-full tw:justify-start tw:font-normal",
                  onClick: /* @__PURE__ */ n(() => bt((b) => !b), "onClick"),
                  children: dt ? wr : Jr
                }
              ) })
            ]
          }
        ) })
      }
    )
  ] });
}
n(Wa, "BookChapterControl");
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
function Nd(t) {
  return typeof t == "string" ? t : typeof t == "number" ? t.toString() : t.label;
}
n(Nd, "getOptionLabelDefault");
function Dn({
  id: t,
  options: e = [],
  className: r,
  buttonClassName: o,
  popoverContentClassName: i,
  popoverContentStyle: c,
  value: s,
  onChange: l = /* @__PURE__ */ n(() => {
  }, "onChange"),
  getOptionLabel: d = Nd,
  getButtonLabel: w,
  icon: u = void 0,
  buttonPlaceholder: h = "",
  textPlaceholder: g = "",
  commandEmptyMessage: m = "No option found",
  buttonVariant: v = "outline",
  alignDropDown: y = "start",
  isDisabled: f = !1,
  ariaLabel: R,
  ..._
}) {
  const [E, T] = N(!1), A = w ?? d, S = /* @__PURE__ */ n((P) => P.length > 0 && typeof P[0] == "object" && "options" in P[0], "isGroupedOptions"), j = /* @__PURE__ */ n((P, M) => {
    const O = d(P), W = typeof P == "object" && "secondaryLabel" in P ? P.secondaryLabel : void 0, K = `${M ?? ""}${O}${W ?? ""}`;
    return /* @__PURE__ */ p(
      Ye,
      {
        value: O,
        onSelect: /* @__PURE__ */ n(() => {
          l(P), T(!1);
        }, "onSelect"),
        className: "tw:gap-1.5!",
        children: [
          /* @__PURE__ */ a(
            qe,
            {
              className: x("tw:h-4 tw:w-4 tw:shrink-0", {
                "tw:opacity-0": !s || d(s) !== O
              })
            }
          ),
          /* @__PURE__ */ p("span", { className: "tw:flex-1 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap", children: [
            O,
            W && /* @__PURE__ */ p("span", { className: "tw:text-muted-foreground", children: [
              " · ",
              W
            ] })
          ] })
        ]
      },
      K
    );
  }, "renderCommandItem");
  return /* @__PURE__ */ p(er, { open: E, onOpenChange: T, ..._, children: [
    /* @__PURE__ */ a(Nr, { asChild: !0, children: /* @__PURE__ */ p(
      Z,
      {
        variant: v,
        role: "combobox",
        "aria-expanded": E,
        "aria-label": R,
        id: t,
        className: x(
          "tw:flex tw:w-[200px] tw:items-center tw:justify-between tw:overflow-hidden",
          o ?? r
        ),
        disabled: f,
        children: [
          /* @__PURE__ */ p("div", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-center tw:overflow-hidden", children: [
            u && /* @__PURE__ */ a("div", { className: "tw:shrink-0 tw:pe-2", children: u }),
            /* @__PURE__ */ a(
              "span",
              {
                className: x(
                  "tw:min-w-0 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap tw:text-start"
                ),
                children: s ? A(s) : h
              }
            )
          ] }),
          /* @__PURE__ */ a(tr, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ a(
      rr,
      {
        align: y,
        className: x("tw:w-[200px] tw:p-0", i),
        style: c,
        children: /* @__PURE__ */ p(ar, { children: [
          /* @__PURE__ */ a(
            Sa,
            {
              placeholder: g,
              className: "tw:text-inherit",
              spaceSelectsHighlightedItem: !0
            }
          ),
          /* @__PURE__ */ a(Da, { children: m }),
          /* @__PURE__ */ a(or, { children: S(e) ? e.map((P) => /* @__PURE__ */ a(He, { heading: P.groupHeading, children: P.options.map((M) => j(M, P.groupHeading)) }, P.groupHeading)) : /* @__PURE__ */ a(He, { children: e.map((P) => j(P)) }) })
        ] })
      }
    )
  ] });
}
n(Dn, "ComboBox");
function Cd({
  startChapter: t,
  endChapter: e,
  handleSelectStartChapter: r,
  handleSelectEndChapter: o,
  isDisabled: i = !1,
  chapterCount: c
}) {
  const s = L(
    () => Array.from({ length: c }, (w, u) => u + 1),
    [c]
  );
  return /* @__PURE__ */ p(gt, { children: [
    /* @__PURE__ */ a(Ot, { htmlFor: "start-chapters-combobox", children: "Chapters" }),
    /* @__PURE__ */ a(
      Dn,
      {
        isDisabled: i,
        onChange: /* @__PURE__ */ n((w) => {
          r(w), w > e && o(w);
        }, "onChangeStartChapter"),
        buttonClassName: "tw:me-2 tw:ms-2 tw:w-20",
        options: s,
        getOptionLabel: /* @__PURE__ */ n((w) => w.toString(), "getOptionLabel"),
        value: t
      },
      "start chapter"
    ),
    /* @__PURE__ */ a(Ot, { htmlFor: "end-chapters-combobox", children: "to" }),
    /* @__PURE__ */ a(
      Dn,
      {
        isDisabled: i,
        onChange: /* @__PURE__ */ n((w) => {
          o(w), w < t && r(w);
        }, "onChangeEndChapter"),
        buttonClassName: "tw:ms-2 tw:w-20",
        options: s,
        getOptionLabel: /* @__PURE__ */ n((w) => w.toString(), "getOptionLabel"),
        value: e
      },
      "end chapter"
    )
  ] });
}
n(Cd, "ChapterRangeSelector");
var ko = /* @__PURE__ */ ((t) => (t.CurrentBook = "current book", t.ChooseBooks = "choose books", t))(ko || {});
((t) => {
  t.CURRENT_BOOK = "current book", t.CHOOSE_BOOKS = "choose books";
})(ko || (ko = {}));
const ch = Object.freeze([
  "%webView_bookSelector_currentBook%",
  "%webView_bookSelector_choose%",
  "%webView_bookSelector_chooseBooks%"
]), Xa = /* @__PURE__ */ n((t, e) => t[e] ?? e, "localizeString$6");
function lh({
  handleBookSelectionModeChange: t,
  currentBookName: e,
  onSelectBooks: r,
  selectedBookIds: o,
  chapterCount: i,
  endChapter: c,
  handleSelectEndChapter: s,
  startChapter: l,
  handleSelectStartChapter: d,
  localizedStrings: w
}) {
  const u = Xa(w, "%webView_bookSelector_currentBook%"), h = Xa(w, "%webView_bookSelector_choose%"), g = Xa(w, "%webView_bookSelector_chooseBooks%"), [m, v] = N(
    "current book"
    /* CurrentBook */
  ), y = /* @__PURE__ */ n((f) => {
    v(f), t(f);
  }, "onSelectionModeChange");
  return /* @__PURE__ */ a(
    Mo,
    {
      className: "pr-twp tw:flex",
      value: m,
      onValueChange: /* @__PURE__ */ n((f) => y(f), "onValueChange"),
      children: /* @__PURE__ */ p("div", { className: "tw:flex tw:w-full tw:flex-col tw:gap-4", children: [
        /* @__PURE__ */ p("div", { className: "tw:grid tw:grid-cols-[25%_25%_50%]", children: [
          /* @__PURE__ */ p("div", { className: "tw:flex tw:items-center", children: [
            /* @__PURE__ */ a(fa, {
              value: "current book"
              /* CurrentBook */
            }),
            /* @__PURE__ */ a(Ot, { className: "tw:ms-1", children: u })
          ] }),
          /* @__PURE__ */ a(Ot, { className: "tw:flex tw:items-center", children: e }),
          /* @__PURE__ */ a("div", { className: "tw:flex tw:items-center tw:justify-end", children: /* @__PURE__ */ a(
            Cd,
            {
              isDisabled: m === "choose books",
              handleSelectStartChapter: d,
              handleSelectEndChapter: s,
              chapterCount: i,
              startChapter: l,
              endChapter: c
            }
          ) })
        ] }),
        /* @__PURE__ */ p("div", { className: "tw:grid tw:grid-cols-[25%_50%_25%]", children: [
          /* @__PURE__ */ p("div", { className: "tw:flex tw:items-center", children: [
            /* @__PURE__ */ a(fa, {
              value: "choose books"
              /* ChooseBooks */
            }),
            /* @__PURE__ */ a(Ot, { className: "tw:ms-1", children: g })
          ] }),
          /* @__PURE__ */ a(Ot, { className: "tw:flex tw:items-center", children: o.map((f) => Ft.bookIdToEnglishName(f)).join(", ") }),
          /* @__PURE__ */ a(
            Z,
            {
              disabled: m === "current book",
              onClick: /* @__PURE__ */ n(() => r(), "onClick"),
              children: h
            }
          )
        ] })
      ] })
    }
  );
}
n(lh, "BookSelector");
const Li = Kr(null);
function Ed(t, e) {
  return { getTheme: /* @__PURE__ */ n(function() {
    return e ?? null;
  }, "getTheme") };
}
n(Ed, "t");
function Se() {
  const t = Oa(Li);
  return t == null && function(e, ...r) {
    const o = new URL("https://lexical.dev/docs/error"), i = new URLSearchParams();
    i.append("code", e);
    for (const c of r) i.append("v", c);
    throw o.search = i.toString(), Error(`Minified Lexical error #${e}; visit ${o.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
  }(8), t;
}
n(Se, "o$1");
const Bi = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, Td = Bi ? Zt : X, aa = { tag: Bo };
function Sd({ initialConfig: t, children: e }) {
  const r = L(() => {
    const { theme: o, namespace: i, nodes: c, onError: s, editorState: l, html: d } = t, w = Ed(null, o), u = bi({ editable: t.editable, html: d, namespace: i, nodes: c, onError: /* @__PURE__ */ n((h) => s(h, u), "onError"), theme: o });
    return function(h, g) {
      if (g !== null) {
        if (g === void 0) h.update(() => {
          const m = Ge();
          if (m.isEmpty()) {
            const v = qr();
            m.append(v);
            const y = Bi ? document.activeElement : null;
            (oe() !== null || y !== null && y === h.getRootElement()) && v.select();
          }
        }, aa);
        else if (g !== null) switch (typeof g) {
          case "string": {
            const m = h.parseEditorState(g);
            h.setEditorState(m, aa);
            break;
          }
          case "object":
            h.setEditorState(g, aa);
            break;
          case "function":
            h.update(() => {
              Ge().isEmpty() && g(h);
            }, aa);
        }
      }
    }(u, l), [u, w];
  }, []);
  return Td(() => {
    const o = t.editable, [i] = r;
    i.setEditable(o === void 0 || o);
  }, []), a(Li.Provider, { value: r, children: e });
}
n(Sd, "f$2");
const Rd = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Zt : X;
function Dd({ ignoreHistoryMergeTagChange: t = !0, ignoreSelectionChange: e = !1, onChange: r }) {
  const [o] = Se();
  return Rd(() => {
    if (r) return o.registerUpdateListener(({ editorState: i, dirtyElements: c, dirtyLeaves: s, prevEditorState: l, tags: d }) => {
      e && c.size === 0 && s.size === 0 || t && d.has(Bo) || l.isEmpty() || r(i, o, d);
    });
  }, [o, t, e, r]), null;
}
n(Dd, "n$1");
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
  Vl,
  xi,
  yi,
  Ll
], Md = Kr(null), Ja = {
  didCatch: !1,
  error: null
}, Qo = class Qo extends Bc {
  constructor(e) {
    super(e), this.resetErrorBoundary = this.resetErrorBoundary.bind(this), this.state = Ja;
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
      for (var r, o, i = arguments.length, c = new Array(i), s = 0; s < i; s++)
        c[s] = arguments[s];
      (r = (o = this.props).onReset) === null || r === void 0 || r.call(o, {
        args: c,
        reason: "imperative-api"
      }), this.setState(Ja);
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
    if (o && r.error !== null && Od(e.resetKeys, i)) {
      var c, s;
      (c = (s = this.props).onReset) === null || c === void 0 || c.call(s, {
        next: i,
        prev: e.resetKeys,
        reason: "keys"
      }), this.setState(Ja);
    }
  }
  render() {
    const {
      children: e,
      fallbackRender: r,
      FallbackComponent: o,
      fallback: i
    } = this.props, {
      didCatch: c,
      error: s
    } = this.state;
    let l = e;
    if (c) {
      const d = {
        error: s,
        resetErrorBoundary: this.resetErrorBoundary
      };
      if (typeof r == "function")
        l = r(d);
      else if (o)
        l = vn(o, d);
      else if (i !== void 0)
        l = i;
      else
        throw s;
    }
    return vn(Md.Provider, {
      value: {
        didCatch: c,
        error: s,
        resetErrorBoundary: this.resetErrorBoundary
      }
    }, l);
  }
};
n(Qo, "ErrorBoundary");
let _o = Qo;
function Od() {
  let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  return t.length !== e.length || t.some((r, o) => !Object.is(r, e[o]));
}
n(Od, "hasArrayChanged");
function Id({ children: t, onError: e }) {
  return a(_o, { fallback: a("div", { style: { border: "1px solid #f00", color: "#f00", padding: "8px" }, children: "An error was thrown." }), onError: e, children: t });
}
n(Id, "n");
const zd = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Zt : X;
function Pd(t) {
  return { initialValueFn: /* @__PURE__ */ n(() => t.isEditable(), "initialValueFn"), subscribe: /* @__PURE__ */ n((e) => t.registerEditableListener(e), "subscribe") };
}
n(Pd, "u");
function Ad() {
  return function(t) {
    const [e] = Se(), r = L(() => t(e), [e, t]), [o, i] = N(() => r.initialValueFn()), c = U(o);
    return zd(() => {
      const { initialValueFn: s, subscribe: l } = r, d = s();
      return c.current !== d && (c.current = d, i(d)), l((w) => {
        c.current = w, i(w);
      });
    }, [r, t]), o;
  }(Pd);
}
n(Ad, "a");
function $d(t, e) {
  const r = t.getRootElement();
  if (r === null) return [];
  const o = r.getBoundingClientRect(), i = getComputedStyle(r), c = parseFloat(i.paddingLeft) + parseFloat(i.paddingRight), s = Array.from(e.getClientRects());
  let l, d = s.length;
  s.sort((w, u) => {
    const h = w.top - u.top;
    return Math.abs(h) <= 3 ? w.left - u.left : h;
  });
  for (let w = 0; w < d; w++) {
    const u = s[w], h = l && l.top <= u.top && l.top + l.height > u.top && l.left + l.width > u.left, g = u.width + c === o.width;
    h || g ? (s.splice(w--, 1), d--) : l = u;
  }
  return s;
}
n($d, "B$1");
function ba(t, ...e) {
  const r = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const i of e) o.append("v", i);
  throw r.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
n(ba, "k");
const ji = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, Vd = ji && "documentMode" in document ? document.documentMode : null;
!(!ji || !("InputEvent" in window) || Vd) && "getTargetRanges" in new window.InputEvent("input");
function ke(t) {
  return `${t}px`;
}
n(ke, "G");
const Ld = { attributes: !0, characterData: !0, childList: !0, subtree: !0 };
function Bd(t, e, r) {
  let o = null, i = null, c = null, s = [];
  const l = document.createElement("div");
  function d() {
    o === null && ba(182), i === null && ba(183);
    const { left: h, top: g } = i.getBoundingClientRect(), m = $d(t, e);
    var v, y;
    l.isConnected || (y = l, (v = i).insertBefore(y, v.firstChild));
    let f = !1;
    for (let R = 0; R < m.length; R++) {
      const _ = m[R], E = s[R] || document.createElement("div"), T = E.style;
      T.position !== "absolute" && (T.position = "absolute", f = !0);
      const A = ke(_.left - h);
      T.left !== A && (T.left = A, f = !0);
      const S = ke(_.top - g);
      T.top !== S && (E.style.top = S, f = !0);
      const j = ke(_.width);
      T.width !== j && (E.style.width = j, f = !0);
      const P = ke(_.height);
      T.height !== P && (E.style.height = P, f = !0), E.parentNode !== l && (l.append(E), f = !0), s[R] = E;
    }
    for (; s.length > m.length; ) s.pop();
    f && r(s);
  }
  n(d, "c");
  function w() {
    i = null, o = null, c !== null && c.disconnect(), c = null, l.remove();
    for (const h of s) h.remove();
    s = [];
  }
  n(w, "a"), l.style.position = "relative";
  const u = t.registerRootListener(/* @__PURE__ */ n(function h() {
    const g = t.getRootElement();
    if (g === null) return w();
    const m = g.parentElement;
    if (!ll(m)) return w();
    w(), o = g, i = m, c = new MutationObserver((v) => {
      const y = t.getRootElement(), f = y && y.parentElement;
      if (y !== o || f !== i) return h();
      for (const R of v) if (!l.contains(R.target)) return d();
    }), c.observe(m, Ld), d();
  }, "n"));
  return () => {
    u(), w();
  };
}
n(Bd, "J");
function Mn(t, e, r) {
  if (t.type !== "text" && jr(e)) {
    const o = e.getDOMSlot(r);
    return [o.element, o.getFirstChildOffset() + t.offset];
  }
  return [cl(r) || r, t.offset];
}
n(Mn, "Q$1");
function jd(t) {
  for (const e of t) {
    const r = e.style;
    r.background !== "Highlight" && (r.background = "Highlight"), r.color !== "HighlightText" && (r.color = "HighlightText"), r.marginTop !== ke(-1.5) && (r.marginTop = ke(-1.5)), r.paddingTop !== ke(4) && (r.paddingTop = ke(4)), r.paddingBottom !== ke(0) && (r.paddingBottom = ke(0));
  }
}
n(jd, "X$1");
function Fd(t, e = jd) {
  let r = null, o = null, i = null, c = null, s = null, l = null, d = /* @__PURE__ */ n(() => {
  }, "f");
  function w(u) {
    u.read(() => {
      const h = oe();
      if (!Ne(h)) return r = null, i = null, c = null, l = null, d(), void (d = /* @__PURE__ */ n(() => {
      }, "f"));
      const [g, m] = function(P) {
        const M = P.getStartEndPoints();
        return P.isBackward() ? [M[1], M[0]] : M;
      }(h), v = g.getNode(), y = v.getKey(), f = g.offset, R = m.getNode(), _ = R.getKey(), E = m.offset, T = t.getElementByKey(y), A = t.getElementByKey(_), S = r === null || T !== o || f !== i || y !== r.getKey(), j = c === null || A !== s || E !== l || _ !== c.getKey();
      if ((S || j) && T !== null && A !== null) {
        const P = function(M, O, W, K, et, C, at) {
          const I = (M._window ? M._window.document : document).createRange();
          return I.setStart(...Mn(O, W, K)), I.setEnd(...Mn(et, C, at)), I;
        }(t, g, v, T, m, R, A);
        d(), d = Bd(t, P, e);
      }
      r = v, o = T, i = f, c = R, s = A, l = E;
    });
  }
  return n(w, "d"), w(t.getEditorState()), Ie(t.registerUpdateListener(({ editorState: u }) => w(u)), () => {
    d();
  });
}
n(Fd, "Y$1");
function Ud(t, e) {
  let r = null;
  const o = /* @__PURE__ */ n(() => {
    const i = getSelection(), c = i && i.anchorNode, s = t.getRootElement();
    c !== null && s !== null && s.contains(c) ? r !== null && (r(), r = null) : r === null && (r = Fd(t, e));
  }, "o");
  return t.registerRootListener((i) => {
    if (i) {
      const c = i.ownerDocument;
      return c.addEventListener("selectionchange", o), o(), () => {
        r !== null && r(), c.removeEventListener("selectionchange", o);
      };
    }
  });
}
n(Ud, "Z");
function Kd(t) {
  const e = _i(t, (r) => jr(r) && !r.isInline());
  return jr(e) || ba(4, t.__key), e;
}
n(Kd, "Ct$1");
function Hd(t) {
  const e = oe() || Zc();
  let r;
  if (Ne(e)) r = Qc(e.focus, "next");
  else {
    if (e != null) {
      const s = e.getNodes(), l = s[s.length - 1];
      l && (r = ki(l, "next"));
    }
    r = r || tl(Ge(), "previous").getFlipped().insert(qr());
  }
  const o = qd(t, r), i = el(o), c = rl(i) ? al(i) : o;
  return ol(nl(c)), t.getLatest();
}
n(Hd, "bt");
function qd(t, e, r) {
  let o = bn(e, "next");
  for (let i = o; i; i = il(i, r)) o = i;
  return sl(o) && ba(283), o.insert(t.isInline() ? qr().append(t) : t), bn(ki(t.getLatest(), "next"), e.direction);
}
n(qd, "Lt$1");
function Gd(t) {
  const e = oe();
  if (!Ne(e)) return !1;
  const r = /* @__PURE__ */ new Set(), o = e.getNodes();
  for (let i = 0; i < o.length; i++) {
    const c = o[i], s = c.getKey();
    if (r.has(s)) continue;
    const l = _i(c, (w) => jr(w) && !w.isInline());
    if (l === null) continue;
    const d = l.getKey();
    l.canIndent() && !r.has(d) && (r.add(d), t(l));
  }
  return r.size > 0;
}
n(Gd, "Bt$1");
const Yd = Symbol.for("preact-signals");
function Pa() {
  if (Oe > 1) return void Oe--;
  let t, e = !1;
  for (!function() {
    let r = xa;
    for (xa = void 0; r !== void 0; ) r.S.v === r.v && (r.S.i = r.i), r = r.o;
  }(); Vr !== void 0; ) {
    let r = Vr;
    for (Vr = void 0, ya++; r !== void 0; ) {
      const o = r.u;
      if (r.u = void 0, r.f &= -3, !(8 & r.f) && Fi(r)) try {
        r.c();
      } catch (i) {
        e || (t = i, e = !0);
      }
      r = o;
    }
  }
  if (ya = 0, Oe--, e) throw t;
}
n(Pa, "Q");
function Wd(t) {
  if (Oe > 0) return t();
  No = ++Xd, Oe++;
  try {
    return t();
  } finally {
    Pa();
  }
}
n(Wd, "X");
let ct, Vr;
function On(t) {
  const e = ct;
  ct = void 0;
  try {
    return t();
  } finally {
    ct = e;
  }
}
n(On, "et");
let xa, Oe = 0, ya = 0, Xd = 0, No = 0, wa = 0;
function In(t) {
  if (ct === void 0) return;
  let e = t.n;
  return e === void 0 || e.t !== ct ? (e = { i: 0, S: t, p: ct.s, n: void 0, t: ct, e: void 0, x: void 0, r: e }, ct.s !== void 0 && (ct.s.n = e), ct.s = e, t.n = e, 32 & ct.f && t.S(e), e) : e.i === -1 ? (e.i = 0, e.n !== void 0 && (e.n.p = e.p, e.p !== void 0 && (e.p.n = e.n), e.p = ct.s, e.n = void 0, ct.s.n = e, ct.s = e), e) : void 0;
}
n(In, "at");
function Xt(t, e) {
  this.v = t, this.i = 0, this.n = void 0, this.t = void 0, this.l = 0, this.W = e == null ? void 0 : e.watched, this.Z = e == null ? void 0 : e.unwatched, this.name = e == null ? void 0 : e.name;
}
n(Xt, "dt");
function Fr(t, e) {
  return new Xt(t, e);
}
n(Fr, "ut");
function Fi(t) {
  for (let e = t.s; e !== void 0; e = e.n) if (e.S.i !== e.i || !e.S.h() || e.S.i !== e.i) return !0;
  return !1;
}
n(Fi, "ft");
function zn(t) {
  for (let e = t.s; e !== void 0; e = e.n) {
    const r = e.S.n;
    if (r !== void 0 && (e.r = r), e.S.n = e, e.i = -1, e.n === void 0) {
      t.s = e;
      break;
    }
  }
}
n(zn, "lt");
function Ui(t) {
  let e, r = t.s;
  for (; r !== void 0; ) {
    const o = r.p;
    r.i === -1 ? (r.S.U(r), o !== void 0 && (o.n = r.n), r.n !== void 0 && (r.n.p = o)) : e = r, r.S.n = r.r, r.r !== void 0 && (r.r = void 0), r = o;
  }
  t.s = e;
}
n(Ui, "ht");
function Je(t, e) {
  Xt.call(this, void 0), this.x = t, this.s = void 0, this.g = wa - 1, this.f = 4, this.W = e == null ? void 0 : e.watched, this.Z = e == null ? void 0 : e.unwatched, this.name = e == null ? void 0 : e.name;
}
n(Je, "gt");
function Jd(t, e) {
  return new Je(t, e);
}
n(Jd, "pt");
function Ki(t) {
  const e = t.m;
  if (t.m = void 0, typeof e == "function") {
    Oe++;
    const r = ct;
    ct = void 0;
    try {
      e();
    } catch (o) {
      throw t.f &= -2, t.f |= 8, qo(t), o;
    } finally {
      ct = r, Pa();
    }
  }
}
n(Ki, "mt");
function qo(t) {
  for (let e = t.s; e !== void 0; e = e.n) e.S.U(e);
  t.x = void 0, t.s = void 0, Ki(t);
}
n(qo, "vt");
function Zd(t) {
  if (ct !== this) throw new Error("Out-of-order effect");
  Ui(this), ct = t, this.f &= -2, 8 & this.f && qo(this), Pa();
}
n(Zd, "xt");
function pr(t, e) {
  this.x = t, this.m = void 0, this.s = void 0, this.u = void 0, this.f = 32, this.name = e == null ? void 0 : e.name;
}
n(pr, "Et");
function Ce(t, e) {
  const r = new pr(t, e);
  try {
    r.c();
  } catch (i) {
    throw r.d(), i;
  }
  const o = r.d.bind(r);
  return o[Symbol.dispose] = o, o;
}
n(Ce, "yt");
function Cr(t, e = {}) {
  const r = {};
  for (const o in t) {
    const i = e[o], c = Fr(i === void 0 ? t[o] : i);
    r[o] = c;
  }
  return r;
}
n(Cr, "St");
Xt.prototype.brand = Yd, Xt.prototype.h = function() {
  return !0;
}, Xt.prototype.S = function(t) {
  const e = this.t;
  e !== t && t.e === void 0 && (t.x = e, this.t = t, e !== void 0 ? e.e = t : On(() => {
    var r;
    (r = this.W) == null || r.call(this);
  }));
}, Xt.prototype.U = function(t) {
  if (this.t !== void 0) {
    const e = t.e, r = t.x;
    e !== void 0 && (e.x = r, t.e = void 0), r !== void 0 && (r.e = e, t.x = void 0), t === this.t && (this.t = r, r === void 0 && On(() => {
      var o;
      (o = this.Z) == null || o.call(this);
    }));
  }
}, Xt.prototype.subscribe = function(t) {
  return Ce(() => {
    const e = this.value, r = ct;
    ct = void 0;
    try {
      t(e);
    } finally {
      ct = r;
    }
  }, { name: "sub" });
}, Xt.prototype.valueOf = function() {
  return this.value;
}, Xt.prototype.toString = function() {
  return this.value + "";
}, Xt.prototype.toJSON = function() {
  return this.value;
}, Xt.prototype.peek = function() {
  const t = ct;
  ct = void 0;
  try {
    return this.value;
  } finally {
    ct = t;
  }
}, Object.defineProperty(Xt.prototype, "value", { get() {
  const t = In(this);
  return t !== void 0 && (t.i = this.i), this.v;
}, set(t) {
  if (t !== this.v) {
    if (ya > 100) throw new Error("Cycle detected");
    (function(e) {
      Oe !== 0 && ya === 0 && e.l !== No && (e.l = No, xa = { S: e, v: e.v, i: e.i, o: xa });
    })(this), this.v = t, this.i++, wa++, Oe++;
    try {
      for (let e = this.t; e !== void 0; e = e.x) e.t.N();
    } finally {
      Pa();
    }
  }
} }), Je.prototype = new Xt(), Je.prototype.h = function() {
  if (this.f &= -3, 1 & this.f) return !1;
  if ((36 & this.f) == 32 || (this.f &= -5, this.g === wa)) return !0;
  if (this.g = wa, this.f |= 1, this.i > 0 && !Fi(this)) return this.f &= -2, !0;
  const t = ct;
  try {
    zn(this), ct = this;
    const e = this.x();
    (16 & this.f || this.v !== e || this.i === 0) && (this.v = e, this.f &= -17, this.i++);
  } catch (e) {
    this.v = e, this.f |= 16, this.i++;
  }
  return ct = t, Ui(this), this.f &= -2, !0;
}, Je.prototype.S = function(t) {
  if (this.t === void 0) {
    this.f |= 36;
    for (let e = this.s; e !== void 0; e = e.n) e.S.S(e);
  }
  Xt.prototype.S.call(this, t);
}, Je.prototype.U = function(t) {
  if (this.t !== void 0 && (Xt.prototype.U.call(this, t), this.t === void 0)) {
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
  const t = In(this);
  if (this.h(), t !== void 0 && (t.i = this.i), 16 & this.f) throw this.v;
  return this.v;
} }), pr.prototype.c = function() {
  const t = this.S();
  try {
    if (8 & this.f || this.x === void 0) return;
    const e = this.x();
    typeof e == "function" && (this.m = e);
  } finally {
    t();
  }
}, pr.prototype.S = function() {
  if (1 & this.f) throw new Error("Cycle detected");
  this.f |= 1, this.f &= -9, Ki(this), zn(this), Oe++;
  const t = ct;
  return ct = this, Zd.bind(this, t);
}, pr.prototype.N = function() {
  2 & this.f || (this.f |= 2, this.u = Vr, Vr = this);
}, pr.prototype.d = function() {
  this.f |= 8, 1 & this.f || qo(this);
}, pr.prototype.dispose = function() {
  this.d();
};
pe({ build: /* @__PURE__ */ n((t, e, r) => Cr(e), "build"), config: nr({ defaultSelection: "rootEnd", disabled: !1 }), name: "@lexical/extension/AutoFocus", register(t, e, r) {
  const o = r.getOutput();
  return Ce(() => o.disabled.value ? void 0 : t.registerRootListener((i) => {
    t.focus(() => {
      const c = document.activeElement;
      i === null || c !== null && i.contains(c) || i.focus({ preventScroll: !0 });
    }, { defaultSelection: o.defaultSelection.peek() });
  }));
} });
function Hi() {
  const t = Ge(), e = oe(), r = qr();
  t.clear(), t.append(r), e !== null && r.select(), Ne(e) && (e.format = 0);
}
n(Hi, "wt");
function qi(t, e = Hi) {
  return t.registerCommand(Ni, (r) => (t.update(e), !0), jo);
}
n(qi, "Nt");
pe({ build: /* @__PURE__ */ n((t, e, r) => Cr(e), "build"), config: nr({ $onClear: Hi }), name: "@lexical/extension/ClearEditor", register(t, e, r) {
  const { $onClear: o } = r.getOutput();
  return Ce(() => qi(t, o.value));
} });
function Qd(t) {
  return (typeof t.nodes == "function" ? t.nodes() : t.nodes) || [];
}
n(Qd, "Ct");
const Za = wl("format", { parse: /* @__PURE__ */ n((t) => typeof t == "number" ? t : 0, "parse") }), tn = class tn extends ho {
  $config() {
    return this.config("decorator-text", { extends: ho, stateConfigs: [{ flat: !0, stateConfig: Za }] });
  }
  getFormat() {
    return _l(this, Za);
  }
  getFormatFlags(e, r) {
    return xn(this.getFormat(), e, r);
  }
  hasFormat(e) {
    const r = Nl[e];
    return (this.getFormat() & r) !== 0;
  }
  setFormat(e) {
    return Cl(this, Za, e);
  }
  toggleFormat(e) {
    const r = this.getFormat(), o = xn(r, e, null);
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
n(tn, "Ft");
let ka = tn;
function tw(t) {
  return t instanceof ka;
}
n(tw, "Mt");
pe({ name: "@lexical/extension/DecoratorText", nodes: /* @__PURE__ */ n(() => [ka], "nodes"), register: /* @__PURE__ */ n((t, e, r) => t.registerCommand(Ci, (o) => {
  const i = oe();
  if (Ei(i) || Ne(i)) for (const c of i.getNodes()) tw(c) && c.toggleFormat(o);
  return !1;
}, Ti), "register") });
function Gi(t, e) {
  let r;
  return Fr(t(), { unwatched() {
    r && (r(), r = void 0);
  }, watched() {
    this.value = t(), r = e(this);
  } });
}
n(Gi, "kt");
const Co = pe({ build: /* @__PURE__ */ n((t) => Gi(() => t.getEditorState(), (e) => t.registerUpdateListener((r) => {
  e.value = r.editorState;
})), "build"), name: "@lexical/extension/EditorState" });
function pt(t, ...e) {
  const r = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const i of e) o.append("v", i);
  throw r.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
n(pt, "Kt");
function Yi(t, e) {
  if (t && e && !Array.isArray(e) && typeof t == "object" && typeof e == "object") {
    const r = t, o = e;
    for (const i in o) r[i] = Yi(r[i], o[i]);
    return t;
  }
  return e;
}
n(Yi, "zt");
const Go = 0, Eo = 1, Wi = 2, Qa = 3, oa = 4, ur = 5, to = 6, Or = 7;
function eo(t) {
  return t.id === Go;
}
n(eo, "Jt");
function Xi(t) {
  return t.id === Wi;
}
n(Xi, "Ht");
function ew(t) {
  return function(e) {
    return e.id === Eo;
  }(t) || pt(305, String(t.id), String(Eo)), Object.assign(t, { id: Wi });
}
n(ew, "qt");
const rw = /* @__PURE__ */ new Set(), en = class en {
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
    const r = this.extension.mergeConfig ? this.extension.mergeConfig.bind(this.extension) : dl;
    for (const o of this.configs) e = r(e, o);
    return e;
  }
  init(e) {
    const r = this.state;
    Xi(r) || pt(306, String(r.id));
    const o = { getDependency: this.getInitDependency.bind(this), getDirectDependentNames: this.getDirectDependentNames.bind(this), getPeer: this.getInitPeer.bind(this), getPeerNameSet: this.getPeerNameSet.bind(this) }, i = { ...o, getDependency: this.getDependency.bind(this), getInitResult: this.getInitResult.bind(this), getPeer: this.getPeer.bind(this) }, c = function(l, d, w) {
      return Object.assign(l, { config: d, id: Qa, registerState: w });
    }(r, this.mergeConfigs(), o);
    let s;
    this.state = c, this.extension.init && (s = this.extension.init(e, c.config, o)), this.state = function(l, d, w) {
      return Object.assign(l, { id: oa, initResult: d, registerState: w });
    }(c, s, i);
  }
  build(e) {
    const r = this.state;
    let o;
    r.id !== oa && pt(307, String(r.id), String(ur)), this.extension.build && (o = this.extension.build(e, r.config, r.registerState));
    const i = { ...r.registerState, getOutput: /* @__PURE__ */ n(() => o, "getOutput"), getSignal: this.getSignal.bind(this) };
    this.state = function(c, s, l) {
      return Object.assign(c, { id: ur, output: s, registerState: l });
    }(r, o, i);
  }
  register(e, r) {
    this._signal = r;
    const o = this.state;
    o.id !== ur && pt(308, String(o.id), String(ur));
    const i = this.extension.register && this.extension.register(e, o.config, o.registerState);
    return this.state = function(c) {
      return Object.assign(c, { id: to });
    }(o), () => {
      const c = this.state;
      c.id !== Or && pt(309, String(o.id), String(Or)), this.state = function(s) {
        return Object.assign(s, { id: ur });
      }(c), i && i();
    };
  }
  afterRegistration(e) {
    const r = this.state;
    let o;
    return r.id !== to && pt(310, String(r.id), String(to)), this.extension.afterRegistration && (o = this.extension.afterRegistration(e, r.config, r.registerState)), this.state = function(i) {
      return Object.assign(i, { id: Or });
    }(r), o;
  }
  getSignal() {
    return this._signal === void 0 && pt(311), this._signal;
  }
  getInitResult() {
    this.extension.init === void 0 && pt(312, this.extension.name);
    const e = this.state;
    return function(r) {
      return r.id >= oa;
    }(e) || pt(313, String(e.id), String(oa)), e.initResult;
  }
  getInitPeer(e) {
    const r = this.builder.extensionNameMap.get(e);
    return r ? r.getExtensionInitDependency() : void 0;
  }
  getExtensionInitDependency() {
    const e = this.state;
    return function(r) {
      return r.id >= Qa;
    }(e) || pt(314, String(e.id), String(Qa)), { config: e.config };
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
      return r.id >= Or;
    }(e) || pt(316, String(e.id), String(Or)), e;
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
        return r.id >= ur;
      })(e) || pt(317, this.extension.name), this._dependency = { config: e.config, init: e.initResult, output: e.output };
    }
    return this._dependency;
  }
};
n(en, "Xt");
let To = en;
const Pn = { tag: Bo };
function aw() {
  const t = Ge();
  t.isEmpty() && t.append(qr());
}
n(aw, "te");
const ow = pe({ config: nr({ setOptions: Pn, updateOptions: Pn }), init: /* @__PURE__ */ n(({ $initialEditorState: t = aw }) => ({ $initialEditorState: t, initialized: !1 }), "init"), afterRegistration(t, { updateOptions: e, setOptions: r }, o) {
  const i = o.getInitResult();
  if (!i.initialized) {
    i.initialized = !0;
    const { $initialEditorState: c } = i;
    if (gl(c)) t.setEditorState(c, r);
    else if (typeof c == "function") t.update(() => {
      c(t);
    }, e);
    else if (c && (typeof c == "string" || typeof c == "object")) {
      const s = t.parseEditorState(c);
      t.setEditorState(s, r);
    }
  }
  return () => {
  };
}, name: "@lexical/extension/InitialState", nodes: [ul, yi, pl, hl, xi] }), An = Symbol.for("@lexical/extension/LexicalBuilder");
function $n() {
}
n($n, "oe");
function nw(t) {
  throw t;
}
n(nw, "se");
function na(t) {
  return Array.isArray(t) ? t : [t];
}
n(na, "re");
const ro = "0.43.0+prod.esm", hr = class hr {
  constructor(e) {
    Wt(this, "roots");
    Wt(this, "extensionNameMap");
    Wt(this, "outgoingConfigEdges");
    Wt(this, "incomingEdges");
    Wt(this, "conflicts");
    Wt(this, "_sortedExtensionReps");
    Wt(this, "PACKAGE_VERSION");
    this.outgoingConfigEdges = /* @__PURE__ */ new Map(), this.incomingEdges = /* @__PURE__ */ new Map(), this.extensionNameMap = /* @__PURE__ */ new Map(), this.conflicts = /* @__PURE__ */ new Map(), this.PACKAGE_VERSION = ro, this.roots = e;
    for (const r of e) this.addExtension(r);
  }
  static fromExtensions(e) {
    const r = [na(ow)];
    for (const o of e) r.push(na(o));
    return new hr(r);
  }
  static maybeFromEditor(e) {
    const r = e[An];
    return r && (r.PACKAGE_VERSION !== ro && pt(292, r.PACKAGE_VERSION, ro), r instanceof hr || pt(293)), r;
  }
  static fromEditor(e) {
    const r = hr.maybeFromEditor(e);
    return r === void 0 && pt(294), r;
  }
  constructEditor() {
    const { $initialEditorState: e, onError: r, ...o } = this.buildCreateEditorArgs(), i = Object.assign(bi({ ...o, ...r ? { onError: /* @__PURE__ */ n((c) => {
      r(c, i);
    }, "onError") } : {} }), { [An]: this });
    for (const c of this.sortedExtensionReps()) c.build(i);
    return i;
  }
  buildEditor() {
    let e = $n;
    function r() {
      try {
        e();
      } finally {
        e = $n;
      }
    }
    n(r, "e");
    const o = Object.assign(this.constructEditor(), { dispose: r, [Symbol.dispose]: r });
    return e = Ie(this.registerEditor(o), () => o.setRootElement(null)), o;
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
    const c = this.incomingEdges.get(r);
    c ? c.add(e) : this.incomingEdges.set(r, /* @__PURE__ */ new Set([e]));
  }
  addExtension(e) {
    this._sortedExtensionReps !== void 0 && pt(296);
    const r = na(e), [o] = r;
    typeof o.name != "string" && pt(297, typeof o.name);
    let i = this.extensionNameMap.get(o.name);
    if (i !== void 0 && i.extension !== o && pt(298, o.name), !i) {
      i = new To(this, o), this.extensionNameMap.set(o.name, i);
      const c = this.conflicts.get(o.name);
      typeof c == "string" && pt(299, o.name, c);
      for (const s of o.conflictsWith || []) this.extensionNameMap.has(s) && pt(299, o.name, s), this.conflicts.set(s, o.name);
      for (const s of o.dependencies || []) {
        const l = na(s);
        this.addEdge(o.name, l[0].name, l.slice(1)), this.addExtension(l);
      }
      for (const [s, l] of o.peerDependencies || []) this.addEdge(o.name, s, l ? [l] : []);
    }
  }
  sortedExtensionReps() {
    if (this._sortedExtensionReps) return this._sortedExtensionReps;
    const e = [], r = /* @__PURE__ */ n((o, i) => {
      let c = o.state;
      if (Xi(c)) return;
      const s = o.extension.name;
      var l;
      eo(c) || pt(300, s, i || "[unknown]"), eo(l = c) || pt(304, String(l.id), String(Go)), c = Object.assign(l, { id: Eo }), o.state = c;
      const d = this.outgoingConfigEdges.get(s);
      if (d) for (const w of d.keys()) {
        const u = this.extensionNameMap.get(w);
        u && r(u, s);
      }
      c = ew(c), o.state = c, e.push(o);
    }, "e");
    for (const o of this.extensionNameMap.values()) eo(o.state) && r(o);
    for (const o of e) for (const [i, c] of this.outgoingConfigEdges.get(o.extension.name) || []) if (c.length > 0) {
      const s = this.extensionNameMap.get(i);
      if (s) for (const l of c) s.configs.add(l);
    }
    for (const [o, ...i] of this.roots) if (i.length > 0) {
      const c = this.extensionNameMap.get(o.name);
      c === void 0 && pt(301, o.name);
      for (const s of i) c.configs.add(s);
    }
    return this._sortedExtensionReps = e, this._sortedExtensionReps;
  }
  registerEditor(e) {
    const r = this.sortedExtensionReps(), o = new AbortController(), i = [() => o.abort()], c = o.signal;
    for (const s of r) {
      const l = s.register(e, c);
      l && i.push(l);
    }
    for (const s of r) {
      const l = s.afterRegistration(e);
      l && i.push(l);
    }
    return Ie(...i);
  }
  buildCreateEditorArgs() {
    const e = {}, r = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), c = {}, s = {}, l = this.sortedExtensionReps();
    for (const u of l) {
      const { extension: h } = u;
      if (h.onError !== void 0 && (e.onError = h.onError), h.disableEvents !== void 0 && (e.disableEvents = h.disableEvents), h.parentEditor !== void 0 && (e.parentEditor = h.parentEditor), h.editable !== void 0 && (e.editable = h.editable), h.namespace !== void 0 && (e.namespace = h.namespace), h.$initialEditorState !== void 0 && (e.$initialEditorState = h.$initialEditorState), h.nodes) for (const g of Qd(h)) {
        if (typeof g != "function") {
          const m = o.get(g.replace);
          m && pt(302, h.name, g.replace.name, m.extension.name), o.set(g.replace, u);
        }
        r.add(g);
      }
      if (h.html) {
        if (h.html.export) for (const [g, m] of h.html.export.entries()) i.set(g, m);
        h.html.import && Object.assign(c, h.html.import);
      }
      h.theme && Yi(s, h.theme);
    }
    Object.keys(s).length > 0 && (e.theme = s), r.size && (e.nodes = [...r]);
    const d = Object.keys(c).length > 0, w = i.size > 0;
    (d || w) && (e.html = {}, d && (e.html.import = c), w && (e.html.export = i));
    for (const u of l) u.init(e);
    return e.onError || (e.onError = nw), e;
  }
};
n(hr, "ae");
let _a = hr;
const iw = /* @__PURE__ */ new Set(), Vn = pe({ build(t, e, r) {
  const o = r.getDependency(Co).output, i = Fr({ watchedNodeKeys: /* @__PURE__ */ new Map() }), c = Gi(() => {
  }, () => Ce(() => {
    const s = c.peek(), { watchedNodeKeys: l } = i.value;
    let d, w = !1;
    o.value.read(() => {
      if (oe()) for (const [u, h] of l.entries()) {
        if (h.size === 0) {
          l.delete(u);
          continue;
        }
        const g = Tl(u), m = g && g.isSelected() || !1;
        w = w || m !== (!!s && s.has(u)), m && (d = d || /* @__PURE__ */ new Set(), d.add(u));
      }
    }), !w && d && s && d.size === s.size || (c.value = d);
  }));
  return { watchNodeKey: /* @__PURE__ */ n(function(s) {
    const l = Jd(() => (c.value || iw).has(s)), { watchedNodeKeys: d } = i.peek();
    let w = d.get(s);
    const u = w !== void 0;
    return w = w || /* @__PURE__ */ new Set(), w.add(l), u || (d.set(s, w), i.value = { watchedNodeKeys: d }), l;
  }, "watchNodeKey") };
}, dependencies: [Co], name: "@lexical/extension/NodeSelection" }), sw = fl("INSERT_HORIZONTAL_RULE_COMMAND"), Ta = class Ta extends ho {
  static getType() {
    return "horizontalrule";
  }
  static clone(e) {
    return new Ta(e.__key);
  }
  static importJSON(e) {
    return Yo().updateFromJSON(e);
  }
  static importDOM() {
    return { hr: /* @__PURE__ */ n(() => ({ conversion: cw, priority: 0 }), "hr") };
  }
  exportDOM() {
    return { element: document.createElement("hr") };
  }
  createDOM(e) {
    const r = document.createElement("hr");
    return Si(r, e.theme.hr), r;
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
n(Ta, "pe");
let vr = Ta;
function cw() {
  return { node: Yo() };
}
n(cw, "me");
function Yo() {
  return El(vr);
}
n(Yo, "ve");
function lw(t) {
  return t instanceof vr;
}
n(lw, "xe");
pe({ dependencies: [Co, Vn], name: "@lexical/extension/HorizontalRule", nodes: /* @__PURE__ */ n(() => [vr], "nodes"), register(t, e, r) {
  const { watchNodeKey: o } = r.getDependency(Vn).output, i = Fr({ nodeSelections: /* @__PURE__ */ new Map() }), c = t._config.theme.hrSelected ?? "selected";
  return Ie(t.registerCommand(sw, (s) => {
    const l = oe();
    if (!Ne(l)) return !1;
    if (l.focus.getNode() !== null) {
      const d = Yo();
      Hd(d);
    }
    return !0;
  }, jo), t.registerCommand(ml, (s) => {
    if (vl(s.target)) {
      const l = bl(s.target);
      if (lw(l)) return function(d, w = !1) {
        const u = oe(), h = d.isSelected(), g = d.getKey();
        let m;
        w && Ei(u) ? m = u : (m = xl(), yl(m)), h ? m.delete(g) : m.add(g);
      }(l, s.shiftKey), !0;
    }
    return !1;
  }, Ti), t.registerMutationListener(vr, (s, l) => {
    Wd(() => {
      let d = !1;
      const { nodeSelections: w } = i.peek();
      for (const [u, h] of s.entries()) if (h === "destroyed") w.delete(u), d = !0;
      else {
        const g = w.get(u), m = t.getElementByKey(u);
        g ? g.domNode.value = m : (d = !0, w.set(u, { domNode: Fr(m), selectedSignal: o(u) }));
      }
      d && (i.value = { nodeSelections: w });
    });
  }), Ce(() => {
    const s = [];
    for (const { domNode: l, selectedSignal: d } of i.value.nodeSelections.values()) s.push(Ce(() => {
      const w = l.value;
      w && (d.value ? Si(w, c) : Sl(w, c));
    }));
    return Ie(...s);
  }));
} });
pe({ build: /* @__PURE__ */ n((t, e) => Cr({ inheritEditableFromParent: e.inheritEditableFromParent }), "build"), config: nr({ $getParentEditor: /* @__PURE__ */ n(function() {
  const t = kl();
  return _a.fromEditor(t), t;
}, "$getParentEditor"), inheritEditableFromParent: !1 }), init: /* @__PURE__ */ n((t, e, r) => {
  const o = e.$getParentEditor();
  t.parentEditor = o, t.theme = t.theme || o._config.theme;
}, "init"), name: "@lexical/extension/NestedEditor", register: /* @__PURE__ */ n((t, e, r) => Ce(() => {
  const o = t._parentEditor;
  if (o && r.getOutput().inheritEditableFromParent.value) return t.setEditable(o.isEditable()), o.registerEditableListener(t.setEditable.bind(t));
}), "register") });
pe({ build: /* @__PURE__ */ n((t, e, r) => Cr(e), "build"), config: nr({ disabled: !1, onReposition: void 0 }), name: "@lexical/utils/SelectionAlwaysOnDisplay", register: /* @__PURE__ */ n((t, e, r) => {
  const o = r.getOutput();
  return Ce(() => {
    if (!o.disabled.value) return Ud(t, o.onReposition.value);
  });
}, "register") });
function Ji(t) {
  return t.canBeEmpty();
}
n(Ji, "be");
function dw(t, e, r = Ji) {
  return Ie(t.registerCommand(Rl, (o) => {
    const i = oe();
    if (!Ne(i)) return !1;
    o.preventDefault();
    const c = function(s) {
      if (s.getNodes().filter((g) => Dl(g) && g.canIndent()).length > 0) return !0;
      const l = s.anchor, d = s.focus, w = d.isBefore(l) ? d : l, u = w.getNode(), h = Kd(u);
      if (h.canIndent()) {
        const g = h.getKey();
        let m = Ml();
        if (m.anchor.set(g, 0, "element"), m.focus.set(g, 0, "element"), m = Ol(m), m.anchor.is(w)) return !0;
      }
      return !1;
    }(i) ? o.shiftKey ? Il : yn : zl;
    return t.dispatchCommand(c, void 0);
  }, jo), t.registerCommand(yn, () => {
    const o = typeof e == "number" ? e : e ? e.peek() : null, i = oe();
    if (!Ne(i)) return !1;
    const c = typeof r == "function" ? r : r.peek();
    return Gd((s) => {
      if (c(s)) {
        const l = s.getIndent() + 1;
        (!o || l < o) && s.setIndent(l);
      }
    });
  }, Fo));
}
n(dw, "we");
pe({ build: /* @__PURE__ */ n((t, e, r) => Cr(e), "build"), config: nr({ $canIndent: Ji, disabled: !1, maxIndent: null }), name: "@lexical/extension/TabIndentation", register(t, e, r) {
  const { disabled: o, maxIndent: i, $canIndent: c } = r.getOutput();
  return Ce(() => {
    if (!o.value) return dw(t, i, c);
  });
} });
const ww = pe({ name: "@lexical/react/ReactProvider" });
function uw() {
  return Ge().getTextContent();
}
n(uw, "s$1");
function pw(t, e = !0) {
  if (t) return !1;
  let r = uw();
  return e && (r = r.trim()), r === "";
}
n(pw, "f$1");
function hw(t) {
  if (!pw(t, !1)) return !1;
  const e = Ge().getChildren(), r = e.length;
  if (r > 1) return !1;
  for (let o = 0; o < r; o++) {
    const i = e[o];
    if (Pl(i)) return !1;
    if (jr(i)) {
      if (!Al(i) || i.__indent !== 0) return !1;
      const c = i.getChildren(), s = c.length;
      for (let l = 0; l < s; l++) {
        const d = c[o];
        if (!go(d)) return !1;
      }
    }
  }
  return !0;
}
n(hw, "c");
function Zi(t) {
  return () => hw(t);
}
n(Zi, "g$1");
function Qi(t) {
  const e = window.location.origin, r = /* @__PURE__ */ n((o) => {
    if (o.origin !== e) return;
    const i = t.getRootElement();
    if (document.activeElement !== i) return;
    const c = o.data;
    if (typeof c == "string") {
      let s;
      try {
        s = JSON.parse(c);
      } catch {
        return;
      }
      if (s && s.protocol === "nuanria_messaging" && s.type === "request") {
        const l = s.payload;
        if (l && l.functionId === "makeChanges") {
          const d = l.args;
          if (d) {
            const [w, u, h, g, m] = d;
            t.update(() => {
              const v = oe();
              if (Ne(v)) {
                const y = v.anchor;
                let f = y.getNode(), R = 0, _ = 0;
                if (go(f) && w >= 0 && u >= 0 && (R = w, _ = w + u, v.setTextNodeRange(f, R, f, _)), R === _ && h === "" || (v.insertRawText(h), f = y.getNode()), go(f)) {
                  R = g, _ = g + m;
                  const E = f.getTextContentSize();
                  R = R > E ? E : R, _ = _ > E ? E : _, v.setTextNodeRange(f, R, f, _);
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
n(Qi, "s");
pe({ build: /* @__PURE__ */ n((t, e, r) => Cr(e), "build"), config: nr({ disabled: typeof window > "u" }), name: "@lexical/dragon", register: /* @__PURE__ */ n((t, e, r) => Ce(() => r.getOutput().disabled.value ? void 0 : Qi(t)), "register") });
function gw(t, ...e) {
  const r = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const i of e) o.append("v", i);
  throw r.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
n(gw, "g");
const Wo = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Zt : X;
function fw({ editor: t, ErrorBoundary: e }) {
  return function(r, o) {
    const [i, c] = N(() => r.getDecorators());
    return Wo(() => r.registerDecoratorListener((s) => {
      jl(() => {
        c(s);
      });
    }), [r]), X(() => {
      c(r.getDecorators());
    }, [r]), L(() => {
      const s = [], l = Object.keys(i);
      for (let d = 0; d < l.length; d++) {
        const w = l[d], u = a(o, { onError: /* @__PURE__ */ n((g) => r._onError(g), "onError"), children: a(jc, { fallback: null, children: i[w] }) }), h = r.getElementByKey(w);
        h !== null && s.push(Fl(u, h, w));
      }
      return s;
    }, [o, i, r]);
  }(t, e);
}
n(fw, "w");
function mw({ editor: t, ErrorBoundary: e }) {
  return function(r) {
    const o = _a.maybeFromEditor(r);
    if (o && o.hasExtensionByName(ww.name)) {
      for (const i of ["@lexical/plain-text", "@lexical/rich-text"]) o.hasExtensionByName(i) && gw(320, i);
      return !0;
    }
    return !1;
  }(t) ? null : a(fw, { editor: t, ErrorBoundary: e });
}
n(mw, "v$1");
function Ln(t) {
  return t.getEditorState().read(Zi(t.isComposing()));
}
n(Ln, "B");
function vw({ contentEditable: t, placeholder: e = null, ErrorBoundary: r }) {
  const [o] = Se();
  return function(i) {
    Wo(() => Ie(Bl(i), Qi(i)), [i]);
  }(o), p(gt, { children: [t, a(bw, { content: e }), a(mw, { editor: o, ErrorBoundary: r })] });
}
n(vw, "L");
function bw({ content: t }) {
  const [e] = Se(), r = function(i) {
    const [c, s] = N(() => Ln(i));
    return Wo(() => {
      function l() {
        const d = Ln(i);
        s(d);
      }
      return n(l, "e"), l(), Ie(i.registerUpdateListener(() => {
        l();
      }), i.registerEditableListener(() => {
        l();
      }));
    }, [i]), c;
  }(e), o = Ad();
  return r ? typeof t == "function" ? t(o) : t : null;
}
n(bw, "b$1");
function xw({ defaultSelection: t }) {
  const [e] = Se();
  return X(() => {
    e.focus(() => {
      const r = document.activeElement, o = e.getRootElement();
      o === null || r !== null && o.contains(r) || o.focus({ preventScroll: !0 });
    }, { defaultSelection: t });
  }, [t, e]), null;
}
n(xw, "o");
const yw = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Zt : X;
function kw({ onClear: t }) {
  const [e] = Se();
  return yw(() => qi(e, t), [e, t]), null;
}
n(kw, "r");
const ts = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Zt : X;
function _w({ editor: t, ariaActiveDescendant: e, ariaAutoComplete: r, ariaControls: o, ariaDescribedBy: i, ariaErrorMessage: c, ariaExpanded: s, ariaInvalid: l, ariaLabel: d, ariaLabelledBy: w, ariaMultiline: u, ariaOwns: h, ariaRequired: g, autoCapitalize: m, className: v, id: y, role: f = "textbox", spellCheck: R = !0, style: _, tabIndex: E, "data-testid": T, ...A }, S) {
  const [j, P] = N(t.isEditable()), M = F((W) => {
    W && W.ownerDocument && W.ownerDocument.defaultView ? t.setRootElement(W) : t.setRootElement(null);
  }, [t]), O = L(() => /* @__PURE__ */ function(...W) {
    return (K) => {
      for (const et of W) typeof et == "function" ? et(K) : et != null && (et.current = K);
    };
  }(S, M), [M, S]);
  return ts(() => (P(t.isEditable()), t.registerEditableListener((W) => {
    P(W);
  })), [t]), a("div", { "aria-activedescendant": j ? e : void 0, "aria-autocomplete": j ? r : "none", "aria-controls": j ? o : void 0, "aria-describedby": i, ...c != null ? { "aria-errormessage": c } : {}, "aria-expanded": j && f === "combobox" ? !!s : void 0, ...l != null ? { "aria-invalid": l } : {}, "aria-label": d, "aria-labelledby": w, "aria-multiline": u, "aria-owns": j ? h : void 0, "aria-readonly": !j || void 0, "aria-required": g, autoCapitalize: m, className: v, contentEditable: j, "data-testid": T, id: y, ref: O, role: f, spellCheck: R, style: _, tabIndex: E, ...A });
}
n(_w, "f");
const Nw = fi(_w);
function Bn(t) {
  return t.getEditorState().read(Zi(t.isComposing()));
}
n(Bn, "p");
const Cw = fi(Ew);
function Ew(t, e) {
  const { placeholder: r, ...o } = t, [i] = Se();
  return p(gt, { children: [a(Nw, { editor: i, ...o, ref: e }), r != null && a(Tw, { editor: i, content: r })] });
}
n(Ew, "E");
function Tw({ content: t, editor: e }) {
  const r = function(s) {
    const [l, d] = N(() => Bn(s));
    return ts(() => {
      function w() {
        const u = Bn(s);
        d(u);
      }
      return n(w, "t"), w(), Ie(s.registerUpdateListener(() => {
        w();
      }), s.registerEditableListener(() => {
        w();
      }));
    }, [s]), l;
  }(e), [o, i] = N(e.isEditable());
  if (Zt(() => (i(e.isEditable()), e.registerEditableListener((s) => {
    i(s);
  })), [e]), !r) return null;
  let c = null;
  return typeof t == "function" ? c = t(o) : t !== null && (c = t), c === null ? null : a("div", { "aria-hidden": !0, children: c });
}
n(Tw, "v");
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
n(Sw, "ContentEditable");
const es = Kr(void 0);
function Rw({
  activeEditor: t,
  $updateToolbar: e,
  blockType: r,
  setBlockType: o,
  showModal: i,
  children: c
}) {
  const s = L(
    () => ({
      activeEditor: t,
      $updateToolbar: e,
      blockType: r,
      setBlockType: o,
      showModal: i
    }),
    [t, e, r, o, i]
  );
  return /* @__PURE__ */ a(es.Provider, { value: s, children: c });
}
n(Rw, "ToolbarContext");
function rs() {
  const t = Oa(es);
  if (!t)
    throw new Error("useToolbarContext must be used within a ToolbarContext provider");
  return t;
}
n(rs, "useToolbarContext");
function Dw() {
  const [t, e] = N(void 0), r = F(() => {
    e(void 0);
  }, []), o = L(() => {
    if (t === void 0)
      return;
    const { title: c, content: s } = t;
    return /* @__PURE__ */ a(io, { open: !0, onOpenChange: r, children: /* @__PURE__ */ p(so, { children: [
      /* @__PURE__ */ a(co, { children: /* @__PURE__ */ a(lo, { children: c }) }),
      s
    ] }) });
  }, [t, r]), i = F(
    (c, s, l = !1) => {
      e({
        closeOnClickOutside: l,
        content: s(r),
        title: c
      });
    },
    [r]
  );
  return [o, i];
}
n(Dw, "useEditorModal");
function Mw({
  children: t
}) {
  const [e] = Se(), [r, o] = N(e), [i, c] = N("paragraph"), [s, l] = Dw(), d = /* @__PURE__ */ n(() => {
  }, "$updateToolbar");
  return X(() => r.registerCommand(
    Ri,
    (w, u) => (o(u), !1),
    Fo
  ), [r]), /* @__PURE__ */ p(
    Rw,
    {
      activeEditor: r,
      $updateToolbar: d,
      blockType: i,
      setBlockType: c,
      showModal: l,
      children: [
        s,
        t({ blockType: i })
      ]
    }
  );
}
n(Mw, "ToolbarPlugin");
function Ow(t) {
  const [e] = Se(), { activeEditor: r } = rs();
  X(() => r.registerCommand(
    Ri,
    () => {
      const o = oe();
      return o && t(o), !1;
    },
    Fo
  ), [e, t]), X(() => {
    r.getEditorState().read(() => {
      const o = oe();
      o && t(o);
    });
  }, [r, t]);
}
n(Ow, "useUpdateToolbarHandler");
const jn = [
  { format: "bold", icon: Xs, label: "Bold" },
  { format: "italic", icon: Js, label: "Italic" }
  // CUSTOM: TJ removed underline and strikethrough as they are not supported by the current comment
  // data conversion and are not in P9 anyway. We can add these back if we ever get this supported.
  /* { format: 'underline', icon: UnderlineIcon, label: 'Underline' },
  { format: 'strikethrough', icon: StrikethroughIcon, label: 'Strikethrough' }, */
];
function Iw() {
  const { activeEditor: t } = rs(), [e, r] = N([]), o = F((i) => {
    if (Ne(i) || Ul(i)) {
      const c = [];
      jn.forEach(({ format: s }) => {
        i.hasFormat(s) && c.push(s);
      }), r((s) => s.length !== c.length || !c.every((l) => s.includes(l)) ? c : s);
    }
  }, []);
  return Ow(o), /* @__PURE__ */ a(
    ei,
    {
      type: "multiple",
      value: e,
      onValueChange: r,
      variant: "outline",
      size: "sm",
      children: jn.map(({ format: i, icon: c, label: s }) => /* @__PURE__ */ a(
        ia,
        {
          value: i,
          "aria-label": s,
          onClick: /* @__PURE__ */ n(() => {
            t.dispatchCommand(Ci, i);
          }, "onClick"),
          children: /* @__PURE__ */ a(c, { className: "tw:h-4 tw:w-4" })
        },
        i
      ))
    }
  );
}
n(Iw, "FontFormatToolbarPlugin");
function zw({ onClear: t }) {
  const [e] = Se();
  X(() => {
    t && t(() => {
      e.dispatchCommand(Ni, void 0);
    });
  }, [e, t]);
}
n(zw, "ClearEditorBridge");
function Pw({
  placeholder: t = "Start typing ...",
  autoFocus: e = !1,
  onClear: r
}) {
  const [, o] = N(void 0);
  return /* @__PURE__ */ p("div", { className: "tw:relative", children: [
    /* @__PURE__ */ a(Mw, { children: /* @__PURE__ */ n(() => /* @__PURE__ */ a("div", { className: "tw:sticky tw:top-0 tw:z-10 tw:flex tw:gap-2 tw:overflow-auto tw:border-b tw:p-1", children: /* @__PURE__ */ a(Iw, {}) }), "children") }),
    /* @__PURE__ */ p("div", { className: "tw:relative", children: [
      /* @__PURE__ */ a(
        vw,
        {
          contentEditable: /* @__PURE__ */ a("div", { ref: /* @__PURE__ */ n((c) => {
            c !== void 0 && o(c);
          }, "onRef"), children: /* @__PURE__ */ a(Sw, { placeholder: t }) }),
          ErrorBoundary: Id
        }
      ),
      e && /* @__PURE__ */ a(xw, { defaultSelection: "rootEnd" }),
      /* @__PURE__ */ a(zw, { onClear: r }),
      /* @__PURE__ */ a(kw, {})
    ] })
  ] });
}
n(Pw, "Plugins");
const Aw = {
  namespace: "commentEditor",
  theme: Ko,
  nodes: Ho,
  onError: /* @__PURE__ */ n((t) => {
    console.error(t);
  }, "onError")
};
function Na({
  editorState: t,
  editorSerializedState: e,
  onChange: r,
  onSerializedChange: o,
  placeholder: i = "Start typing…",
  autoFocus: c = !1,
  onClear: s,
  className: l
}) {
  return (
    // CUSTOM: Added `className` prop
    /* @__PURE__ */ a(
      "div",
      {
        className: x(
          "pr-twp tw:overflow-hidden tw:rounded-lg tw:border tw:bg-background tw:shadow",
          l
        ),
        children: /* @__PURE__ */ a(
          Sd,
          {
            initialConfig: {
              ...Aw,
              ...t ? { editorState: t } : {},
              ...e ? { editorState: JSON.stringify(e) } : {}
            },
            children: /* @__PURE__ */ p(It, { children: [
              /* @__PURE__ */ a(Pw, { placeholder: i, autoFocus: c, onClear: s }),
              /* @__PURE__ */ a(
                Dd,
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
n(Na, "Editor");
function as(t) {
  const e = t.querySelector('[contenteditable="true"]');
  if (!e) return !1;
  e.focus();
  const r = window.getSelection(), o = document.createRange();
  return o.selectNodeContents(e), o.collapse(!1), r == null || r.removeAllRanges(), r == null || r.addRange(o), !0;
}
n(as, "focusContentEditable");
function os(t) {
  return t ? t.some(
    (e) => e && "text" in e && e.text.trim().length > 0 ? !0 : !e || !("children" in e) ? !1 : os(e.children)
  ) : !1;
}
n(os, "doChildrenHaveEditorContent");
function ue(t) {
  var e;
  return (e = t == null ? void 0 : t.root) != null && e.children ? os(t.root.children) : !1;
}
n(ue, "hasEditorContent");
function $w(t) {
  if (!t || t.trim() === "")
    throw new Error("Input HTML is empty");
  const e = Di({
    namespace: "EditorUtils",
    theme: Ko,
    nodes: Ho,
    onError: /* @__PURE__ */ n((o) => {
      console.error(o);
    }, "onError")
  });
  let r;
  if (e.update(
    () => {
      const i = new DOMParser().parseFromString(t, "text/html"), c = Hl(e, i);
      Ge().clear(), $l(c);
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
n($w, "htmlToEditorState");
function Ca(t) {
  const e = Di({
    namespace: "EditorUtils",
    theme: Ko,
    nodes: Ho,
    onError: /* @__PURE__ */ n((i) => {
      console.error(i);
    }, "onError")
  }), r = e.parseEditorState(JSON.stringify(t));
  e.setEditorState(r);
  let o = "";
  return e.getEditorState().read(() => {
    o = Kl(e);
  }), o = o.replace(/\s+style="[^"]*"/g, "").replace(/\s+class="[^"]*"/g, "").replace(/<span>(.*?)<\/span>/g, "$1").replace(/<b><strong[^>]*>(.*?)<\/strong><\/b>/g, "<b>$1</b>").replace(/<strong><b[^>]*>(.*?)<\/b><\/strong>/g, "<b>$1</b>").replace(/<i><em[^>]*>(.*?)<\/em><\/i>/g, "<i>$1</i>").replace(/<em><i[^>]*>(.*?)<\/i><\/em>/g, "<i>$1</i>").replace(/<u><span[^>]*>(.*?)<\/span><\/u>/g, "<u>$1</u>").replace(/<s><span[^>]*>(.*?)<\/span><\/s>/g, "<s>$1</s>").replace(/<br\s*\/?>/gi, "<br/>"), o;
}
n(Ca, "editorStateToHtml");
function Xo(t) {
  return ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Home", "End"].includes(t.key) ? (t.stopPropagation(), !0) : !1;
}
n(Xo, "handleEditorKeyNavigation");
const ns = Object.freeze([
  "%cancelButton_tooltip%",
  "%acceptButton_tooltip%"
]), Fn = /* @__PURE__ */ n((t, e) => t[e] ?? e, "localizeString$5");
function is({
  onCancelClick: t,
  onAcceptClick: e,
  canAccept: r = !0,
  localizedStrings: o = {},
  className: i = "tw:h-6 tw:w-6",
  acceptLabel: c
}) {
  const s = Fn(o, "%cancelButton_tooltip%"), l = c ?? Fn(o, "%acceptButton_tooltip%");
  return /* @__PURE__ */ p(Ra, { children: [
    /* @__PURE__ */ a(It, { children: /* @__PURE__ */ p(Et, { children: [
      /* @__PURE__ */ a(Tt, { asChild: !0, children: /* @__PURE__ */ a(
        Z,
        {
          "aria-label": s,
          className: i,
          size: "icon",
          onClick: t,
          variant: "secondary",
          children: /* @__PURE__ */ a(Vo, {})
        }
      ) }),
      /* @__PURE__ */ a(St, { children: /* @__PURE__ */ a("p", { children: s }) })
    ] }) }),
    /* @__PURE__ */ a(Do, {}),
    /* @__PURE__ */ a(It, { children: /* @__PURE__ */ p(Et, { children: [
      /* @__PURE__ */ a(Tt, { asChild: !0, children: /* @__PURE__ */ a(
        Z,
        {
          "aria-label": l,
          className: i,
          size: "icon",
          onClick: e,
          disabled: !r,
          children: /* @__PURE__ */ a(qe, {})
        }
      ) }),
      /* @__PURE__ */ a(St, { children: /* @__PURE__ */ a("p", { children: l }) })
    ] }) })
  ] });
}
n(is, "CancelAcceptButtons");
const Vw = "verseText", dh = Object.freeze([
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
]), ss = [
  "tw:prose tw:max-w-none tw:break-words tw:text-sm tw:font-normal tw:text-foreground",
  "tw:[&>blockquote]:border-s-0 tw:[&>blockquote]:p-0 tw:[&>blockquote]:ps-0 tw:[&>blockquote]:font-normal tw:[&>blockquote]:not-italic tw:[&>blockquote]:text-foreground",
  "tw:prose-quoteless"
].join(" ");
function cs(t) {
  return (t == null ? void 0 : t.conflictType) === Vw;
}
n(cs, "isVerseTextConflictNote");
function ls(t) {
  return t === "replaced" ? "reject" : t === "merged" ? "merged" : "accept";
}
n(ls, "actionToOutcome");
function ua(t, e) {
  return t === "" ? e["%comment_assign_unassigned%"] ?? "Unassigned" : t === "Team" ? e["%comment_assign_team%"] ?? "Team" : t;
}
n(ua, "getAssignedUserDisplayName$1");
function Jo(t) {
  const e = Oo();
  return t.key === "Enter" && (e && t.metaKey || !e && t.ctrlKey);
}
n(Jo, "didPressCtrlOrCmdEnter");
const Lw = {
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
n(ao, "getAssignedUserDisplayName");
function wh({
  assignableUsers: t,
  onSave: e,
  onClose: r,
  localizedStrings: o,
  initialAssignedUser: i
}) {
  const [c, s] = N(Lw), [l, d] = N(i), [w, u] = N(!1), h = U(void 0), g = U(null);
  X(() => {
    let f = !0;
    const R = g.current;
    if (!R) return;
    const _ = setTimeout(() => {
      f && as(R);
    }, 300);
    return () => {
      f = !1, clearTimeout(_);
    };
  }, []);
  const m = F(() => {
    if (!ue(c)) return;
    const f = Ca(c);
    e(f, l);
  }, [c, e, l]), v = o["%commentEditor_placeholder%"] ?? "Type your comment here...", y = o["%commentEditor_assignTo_label%"] ?? "Assign to";
  return /* @__PURE__ */ p("div", { className: "pr-twp tw:grid tw:gap-3", children: [
    /* @__PURE__ */ p("div", { className: "tw:flex tw:items-center tw:justify-between", children: [
      /* @__PURE__ */ a("span", { className: "tw:text-sm tw:font-medium", children: y }),
      /* @__PURE__ */ a(
        is,
        {
          onCancelClick: r,
          onAcceptClick: m,
          canAccept: ue(c),
          localizedStrings: o,
          acceptLabel: o["%commentEditor_saveButton_tooltip%"]
        }
      )
    ] }),
    /* @__PURE__ */ a("div", { className: "tw:flex tw:items-center tw:gap-2", children: /* @__PURE__ */ p(er, { open: w, onOpenChange: u, children: [
      /* @__PURE__ */ a(Nr, { asChild: !0, children: /* @__PURE__ */ p(
        Z,
        {
          variant: "outline",
          className: "tw:flex tw:w-full tw:items-center tw:justify-start tw:gap-2",
          disabled: t.length === 0,
          children: [
            /* @__PURE__ */ a(li, { className: "tw:h-4 tw:w-4" }),
            /* @__PURE__ */ a("span", { children: ao(l !== void 0 ? l : "", o) })
          ]
        }
      ) }),
      /* @__PURE__ */ a(
        rr,
        {
          className: "tw:w-auto tw:p-0",
          align: "start",
          onKeyDown: /* @__PURE__ */ n((f) => {
            f.key === "Escape" && (f.stopPropagation(), u(!1));
          }, "onKeyDown"),
          children: /* @__PURE__ */ a(ar, { children: /* @__PURE__ */ a(or, { children: t.map((f) => /* @__PURE__ */ a(
            Ye,
            {
              onSelect: /* @__PURE__ */ n(() => {
                d(f || void 0), u(!1);
              }, "onSelect"),
              className: "tw:flex tw:items-center",
              children: /* @__PURE__ */ a("span", { children: ao(f, o) })
            },
            f || "unassigned"
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
        onKeyDownCapture: /* @__PURE__ */ n((f) => {
          f.key === "Escape" ? (f.preventDefault(), f.stopPropagation(), r()) : Jo(f) && (f.preventDefault(), f.stopPropagation(), ue(c) && m());
        }, "onKeyDownCapture"),
        onKeyDown: /* @__PURE__ */ n((f) => {
          Xo(f), (f.key === "Enter" || f.key === " ") && f.stopPropagation();
        }, "onKeyDown"),
        children: /* @__PURE__ */ a(
          Na,
          {
            editorSerializedState: c,
            onSerializedChange: /* @__PURE__ */ n((f) => s(f), "onSerializedChange"),
            placeholder: v,
            onClear: /* @__PURE__ */ n((f) => {
              h.current = f;
            }, "onClear")
          }
        )
      }
    )
  ] });
}
n(wh, "CommentEditor");
const uh = Object.freeze([
  "%commentEditor_placeholder%",
  "%commentEditor_assignTo_label%",
  "%commentEditor_saveButton_tooltip%",
  "%commentEditor_unassigned%",
  "%commentEditor_team%",
  ...ns
]), ph = Object.freeze([
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
]), Bw = "comment-list";
function hh(t) {
  return t;
}
n(hh, "getCommentThreadElementId");
function jw({
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
n(jw, "Card");
function gh({ className: t, ...e }) {
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
n(gh, "CardHeader");
function fh({ className: t, ...e }) {
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
n(fh, "CardTitle");
function mh({ className: t, ...e }) {
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
n(mh, "CardDescription");
function Fw({ className: t, ...e }) {
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
n(Fw, "CardContent");
function vh({ className: t, ...e }) {
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
n(vh, "CardFooter");
function Uw({
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
n(Uw, "Avatar");
function bh({ className: t, ...e }) {
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
n(bh, "AvatarImage");
function Kw({
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
n(Kw, "AvatarFallback");
function Un({
  comment: t,
  isReply: e = !1,
  localizedStrings: r,
  isThreadExpanded: o = !1,
  handleUpdateComment: i,
  handleDeleteComment: c,
  onEditingChange: s,
  canEditOrDelete: l = !1
}) {
  const [d, w] = N(!1), [u, h] = N(), g = U(null);
  X(() => {
    if (!d) return;
    let S = !0;
    const j = g.current;
    if (!j) return;
    const P = setTimeout(() => {
      S && as(j);
    }, 300);
    return () => {
      S = !1, clearTimeout(P);
    };
  }, [d]);
  const m = F(
    (S) => {
      S && S.stopPropagation(), w(!1), h(void 0), s == null || s(!1);
    },
    [s]
  ), v = F(
    async (S) => {
      if (S && S.stopPropagation(), !u || !i) return;
      await i(
        t.id,
        Ca(u)
      ) && (w(!1), h(void 0), s == null || s(!1));
    },
    [u, i, t.id, s]
  ), y = L(() => {
    const S = new Date(t.date), j = Rc(
      S,
      r["%comment_date_today%"],
      r["%comment_date_yesterday%"]
    ), P = S.toLocaleTimeString(void 0, {
      hour: "numeric",
      minute: "2-digit"
    });
    return Ue(r["%comment_dateAtTime%"], {
      date: j,
      time: P
    });
  }, [t.date, r]), f = L(() => t.user, [t.user]), R = L(
    () => t.user.split(" ").map((S) => S[0]).join("").toUpperCase().slice(0, 2),
    [t.user]
  ), _ = L(() => Lo(t.contents), [t.contents]), E = L(
    () => t.contents.replace(/<[^>]*>/g, "").trim().length > 0,
    [t.contents]
  ), T = !!t.conflictResolutionAction && !E, A = L(() => {
    if (o && l)
      return /* @__PURE__ */ p(gt, { children: [
        /* @__PURE__ */ p(
          je,
          {
            onClick: /* @__PURE__ */ n((S) => {
              S.stopPropagation(), w(!0), h($w(t.contents)), s == null || s(!0);
            }, "onClick"),
            children: [
              /* @__PURE__ */ a(Zs, { className: "tw:me-2 tw:h-4 tw:w-4" }),
              r["%comment_editComment%"]
            ]
          }
        ),
        /* @__PURE__ */ p(
          je,
          {
            onClick: /* @__PURE__ */ n(async (S) => {
              S.stopPropagation(), c && await c(t.id);
            }, "onClick"),
            children: [
              /* @__PURE__ */ a(Qs, { className: "tw:me-2 tw:h-4 tw:w-4" }),
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
    c,
    s
  ]);
  return /* @__PURE__ */ p(
    "div",
    {
      className: x("tw:flex tw:w-full tw:flex-row tw:items-baseline tw:gap-3 tw:space-y-3", {
        "tw:text-sm": e
      }),
      children: [
        /* @__PURE__ */ a(Uw, { className: "tw:h-8 tw:w-8", children: /* @__PURE__ */ a(Kw, { className: "tw:text-xs tw:font-medium", children: R }) }),
        /* @__PURE__ */ p("div", { className: "tw:flex tw:flex-1 tw:flex-col tw:gap-2", children: [
          /* @__PURE__ */ p("div", { className: "tw:flex tw:w-full tw:flex-row tw:flex-wrap tw:items-baseline tw:gap-x-2", children: [
            /* @__PURE__ */ a("p", { className: "tw:text-sm tw:font-medium", children: f }),
            /* @__PURE__ */ a("p", { className: "tw:text-xs tw:font-normal tw:text-muted-foreground", children: y }),
            /* @__PURE__ */ a("div", { className: "tw:flex-1" }),
            e && t.assignedUser !== void 0 && /* @__PURE__ */ p(Lr, { variant: "secondary", className: "tw:text-xs tw:font-normal", children: [
              "→ ",
              ua(t.assignedUser, r)
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
                S.key === "Escape" ? (S.preventDefault(), S.stopPropagation(), m()) : Jo(S) && (S.preventDefault(), S.stopPropagation(), ue(u) && v());
              }, "onKeyDownCapture"),
              onKeyDown: /* @__PURE__ */ n((S) => {
                Xo(S), (S.key === "Enter" || S.key === " ") && S.stopPropagation();
              }, "onKeyDown"),
              onClick: /* @__PURE__ */ n((S) => {
                S.stopPropagation();
              }, "onClick"),
              children: [
                /* @__PURE__ */ a(
                  Na,
                  {
                    className: x(
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
                    Z,
                    {
                      size: "icon",
                      onClick: m,
                      variant: "outline",
                      className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                      children: /* @__PURE__ */ a(Vo, {})
                    }
                  ),
                  /* @__PURE__ */ a(
                    Z,
                    {
                      size: "icon",
                      onClick: v,
                      className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                      disabled: !ue(u),
                      children: /* @__PURE__ */ a(di, {})
                    }
                  )
                ] })
              ]
            }
          ),
          !d && /* @__PURE__ */ p(gt, { children: [
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
              /* @__PURE__ */ a("div", { className: "tw:text-sm tw:italic", children: ls(t.conflictResolutionAction) === "merged" ? r["%conflict_note_outcome_combined%"] ?? "Combined both changes." : r["%conflict_note_outcome_used_other%"] ?? "Used the other change instead of the current text." })
            ) : /* @__PURE__ */ a(
              "div",
              {
                className: x(
                  // Shared note-body prose/blockquote treatment (also used by conflict-diff's
                  // DIFF_HTML_CLASSES). Layer this comment item's own extras on top: items-start +
                  // gap-2 for layout, and line-clamp while the thread is collapsed.
                  ss,
                  "tw:items-start tw:gap-2",
                  {
                    "tw:line-clamp-3": !o
                  }
                ),
                dangerouslySetInnerHTML: { __html: _ }
              }
            )
          ] })
        ] }),
        A && /* @__PURE__ */ p(ze, { children: [
          /* @__PURE__ */ a(_e, { asChild: !0, children: /* @__PURE__ */ a(Z, { variant: "ghost", size: "icon", children: /* @__PURE__ */ a(tc, {}) }) }),
          /* @__PURE__ */ a(Pe, { align: "end", children: A })
        ] })
      ]
    }
  );
}
n(Un, "CommentItem");
function ds({
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
        className: x(
          "tw:ms-auto",
          "tw:text-primary tw:transition-opacity tw:duration-200 tw:hover:bg-primary/10",
          "tw:opacity-0 tw:group-hover:opacity-100"
        ),
        onClick: /* @__PURE__ */ n((i) => {
          i.stopPropagation(), r();
        }, "onClick"),
        "aria-label": o,
        children: /* @__PURE__ */ a(qe, { className: "tw:h-4 tw:w-4" })
      }
    );
}
n(ds, "ResolveCheckButton");
const Kn = {
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
function ws({
  classNameForVerseText: t,
  comments: e,
  localizedStrings: r,
  isSelected: o = !1,
  verseRef: i,
  assignedUser: c,
  currentUser: s,
  handleSelectThread: l,
  threadId: d,
  thread: w,
  threadStatus: u,
  handleAddCommentToThread: h,
  handleUpdateComment: g,
  handleDeleteComment: m,
  handleReadStatusChange: v,
  assignableUsers: y,
  canUserAddCommentToThread: f,
  canUserAssignThreadCallback: R,
  canUserResolveThreadCallback: _,
  canUserEditOrDeleteCommentCallback: E,
  isRead: T = !1,
  autoReadDelay: A = 5,
  onVerseRefClick: S,
  initialAssignedUser: j,
  activeComments: P,
  rootContentSlot: M,
  resolveActionSlot: O,
  spaceRootContentFromReplies: W = !1
}) {
  const [K, et] = N(Kn), [C, at] = N(), [I, z] = N(), G = o, [st, nt] = N(!1), [wt, Rt] = N(!1), [Q, dt] = N(!1), [bt, ht] = N(!1), [zt, qt] = N(!1), [ut, ve] = N(T), [ne, xt] = N(!1), ft = U(void 0), [yt, Gt] = N(/* @__PURE__ */ new Map());
  X(() => {
    let k = !0;
    return (/* @__PURE__ */ n(async () => {
      const V = _ ? await _(d) : !1;
      k && qt(V);
    }, "checkResolvePermission"))(), () => {
      k = !1;
    };
  }, [d, _]), X(() => {
    let k = !0;
    if (!o) {
      ht(!1), Gt(/* @__PURE__ */ new Map());
      return;
    }
    return (/* @__PURE__ */ n(async () => {
      const V = R ? await R(d) : !1;
      k && ht(V);
    }, "checkPermissions"))(), () => {
      k = !1;
    };
  }, [o, d, R]);
  const Dt = U("idle");
  X(() => {
    if (!o) {
      Dt.current !== "idle" && (at(void 0), z(void 0), Dt.current = "idle");
      return;
    }
    Dt.current === "idle" && (Dt.current = "pending"), bt ? Dt.current === "pending" && j !== void 0 && // Skip pre-population if the thread is already assigned to this user — doing so
    // would show "Assigning to: Alice" and enable the submit button for a no-op call.
    j !== c && (at(j), Dt.current = "auto-populated") : Dt.current === "auto-populated" && (at(void 0), Dt.current = "pending");
  }, [o, j, bt, c]);
  const Ct = L(
    () => P ?? e.filter((k) => !k.deleted),
    [P, e]
  );
  X(() => {
    let k = !0;
    if (!o || !E) {
      Gt(/* @__PURE__ */ new Map());
      return;
    }
    return (/* @__PURE__ */ n(async () => {
      const V = /* @__PURE__ */ new Map();
      await Promise.all(
        Ct.map(async (rt) => {
          const it = await E(rt.id);
          k && V.set(rt.id, it);
        })
      ), k && Gt(V);
    }, "checkCommentPermissions"))(), () => {
      k = !1;
    };
  }, [o, Ct, E]);
  const mt = L(() => Ct[0], [Ct]), ie = U(null), se = U(void 0), ce = F(() => {
    var k;
    (k = se.current) == null || k.call(se), et(Kn);
  }, []), $e = F(() => {
    const k = !ut;
    ve(k), xt(!k), v == null || v(d, k);
  }, [ut, v, d]);
  X(() => {
    nt(!1);
  }, [o]), X(() => {
    if (o && !ut && !ne) {
      const k = setTimeout(() => {
        ve(!0), v == null || v(d, !0);
      }, A * 1e3);
      return ft.current = k, () => clearTimeout(k);
    }
    ft.current && (clearTimeout(ft.current), ft.current = void 0);
  }, [o, ut, ne, A, d, v]);
  const Kt = L(
    () => ({
      singleReply: r["%comment_thread_single_reply%"],
      multipleReplies: r["%comment_thread_multiple_replies%"]
    }),
    [r]
  ), Ve = L(() => {
    if (c === void 0)
      return;
    if (c === "")
      return r["%comment_assign_unassigned%"] ?? "Unassigned";
    const k = ua(c, r);
    return Ue(r["%comment_assigned_to%"], {
      assignedUser: k
    });
  }, [c, r]), Pt = L(() => Ct.slice(1), [Ct]), _t = L(() => Pt.length ?? 0, [Pt.length]), be = L(() => _t > 0, [_t]), $ = L(() => st || _t <= 2 ? Pt : Pt.slice(-2), [Pt, _t, st]), vt = L(() => st || _t <= 2 ? 0 : _t - 2, [_t, st]), le = L(
    () => _t === 1 ? Kt.singleReply : Ue(Kt.multipleReplies, { count: _t }),
    [_t, Kt]
  ), te = L(
    () => vt === 1 ? Kt.singleReply : Ue(Kt.multipleReplies, { count: vt }),
    [vt, Kt]
  );
  X(() => {
    !o && wt && be && Rt(!1);
  }, [o, wt, be]);
  const D = F(
    async (k) => {
      k && k.stopPropagation();
      const Y = ue(K) ? Ca(K) : void 0;
      if (C !== void 0) {
        await h({
          threadId: d,
          contents: Y,
          assignedUser: C
        }) && (z(C), Y && ce());
        return;
      }
      Y && await h({ threadId: d, contents: Y }) && ce();
    },
    [
      ce,
      K,
      h,
      C,
      d
    ]
  ), H = F(
    async (k) => {
      const Y = ue(K) ? Ca(K) : void 0, V = k.status ? k.assignedUser : C ?? k.assignedUser, rt = await h({
        ...k,
        contents: Y,
        assignedUser: V
      });
      return rt && (V !== void 0 && z(V), Y && ce()), rt;
    },
    [ce, K, h, C]
  );
  if (Ct.length === 0) return;
  const J = /* @__PURE__ */ a(
    Un,
    {
      comment: mt,
      localizedStrings: r,
      isThreadExpanded: o,
      threadStatus: u,
      handleAddCommentToThread: H,
      handleUpdateComment: g,
      handleDeleteComment: m,
      onEditingChange: Rt,
      canEditOrDelete: (!wt && yt.get(mt.id)) ?? !1,
      canUserResolveThread: zt
    }
  );
  return /* @__PURE__ */ a(
    jw,
    {
      role: "option",
      "aria-selected": o,
      id: d,
      className: x(
        "tw:group tw:w-full tw:rounded-none tw:border-none tw:p-4 tw:outline-hidden tw:transition-all tw:duration-200 tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-1 tw:focus:ring-offset-background",
        { "tw:cursor-pointer tw:hover:shadow-md": !o },
        {
          "tw:bg-primary-foreground": !o && u !== "Resolved" && ut,
          "tw:bg-background": o && u !== "Resolved" && ut,
          "tw:bg-muted": u === "Resolved",
          "tw:bg-accent": !ut && !o && u !== "Resolved"
        }
      ),
      onClick: /* @__PURE__ */ n(() => {
        l(d);
      }, "onClick"),
      tabIndex: -1,
      children: /* @__PURE__ */ p(Fw, { className: "tw:flex tw:flex-col tw:gap-2 tw:p-0", children: [
        /* @__PURE__ */ p("div", { className: "tw:flex tw:flex-col tw:content-center tw:items-start tw:gap-4", children: [
          /* @__PURE__ */ p("div", { className: "tw:flex tw:items-center tw:gap-2", children: [
            Ve && /* @__PURE__ */ a(Lr, { className: "tw:rounded-sm tw:bg-input tw:text-sm tw:font-normal tw:text-primary tw:hover:bg-input", children: Ve }),
            /* @__PURE__ */ a(
              Z,
              {
                variant: "ghost",
                size: "icon",
                onClick: /* @__PURE__ */ n((k) => {
                  k.stopPropagation(), $e();
                }, "onClick"),
                className: "tw:text-muted-foreground tw:transition tw:hover:text-foreground",
                "aria-label": ut ? r["%comment_aria_mark_as_unread%"] ?? "Mark as unread" : r["%comment_aria_mark_as_read%"] ?? "Mark as read",
                children: ut ? /* @__PURE__ */ a(ec, {}) : /* @__PURE__ */ a(rc, {})
              }
            ),
            O === void 0 ? (
              // Generic status-resolve check (used by non-conflict threads and, via ConflictThread
              // leaving this slot undefined, by non-verseText conflicts, which resolve through a
              // plain status change). ConflictThread overrides this slot for verseText conflicts.
              /* @__PURE__ */ a(
                ds,
                {
                  show: zt && u !== "Resolved",
                  onClick: /* @__PURE__ */ n(() => H({ threadId: d, status: "Resolved" }), "onClick"),
                  ariaLabel: r["%comment_aria_resolve_thread%"] ?? "Resolve thread"
                }
              )
            ) : O
          ] }),
          /* @__PURE__ */ a("div", { className: "tw:flex tw:max-w-full tw:flex-wrap tw:items-baseline tw:gap-2", children: /* @__PURE__ */ p(
            "p",
            {
              ref: ie,
              className: x(
                "tw:flex-1 tw:overflow-hidden tw:text-ellipsis tw:text-sm tw:font-normal tw:text-muted-foreground",
                {
                  "tw:overflow-visible tw:text-clip tw:whitespace-normal tw:break-words": G
                },
                { "tw:whitespace-nowrap": !G }
              ),
              children: [
                i && S ? /* @__PURE__ */ a(
                  Z,
                  {
                    variant: "ghost",
                    size: "sm",
                    className: "tw:h-auto tw:px-1 tw:py-0 tw:text-sm tw:font-normal tw:text-muted-foreground",
                    onClick: /* @__PURE__ */ n((k) => {
                      k.stopPropagation(), S(w);
                    }, "onClick"),
                    children: i
                  }
                ) : i,
                /* @__PURE__ */ p("span", { className: t, children: [
                  mt.contextBefore,
                  /* @__PURE__ */ a("span", { className: "tw:font-bold", children: mt.selectedText }),
                  mt.contextAfter
                ] })
              ]
            }
          ) }),
          M ?? J
        ] }),
        /* @__PURE__ */ p(gt, { children: [
          be && !o && /* @__PURE__ */ p("div", { className: "tw:flex tw:items-center tw:gap-5", children: [
            /* @__PURE__ */ a("div", { className: "tw:w-8", children: /* @__PURE__ */ a(Br, {}) }),
            /* @__PURE__ */ a("p", { className: "tw:text-sm tw:text-muted-foreground", children: le })
          ] }),
          !o && ue(K) && /* @__PURE__ */ a(
            Na,
            {
              editorSerializedState: K,
              onSerializedChange: /* @__PURE__ */ n((k) => et(k), "onSerializedChange"),
              placeholder: r["%comment_replyOrAssign%"]
            }
          ),
          o && /* @__PURE__ */ p(gt, { children: [
            W && $.length > 0 && /* @__PURE__ */ a("div", { className: "tw:h-2", "data-slot": "root-content-reply-gap", "aria-hidden": "true" }),
            vt > 0 && /* @__PURE__ */ p(
              "div",
              {
                className: "tw:flex tw:cursor-pointer tw:items-center tw:gap-5 tw:py-2",
                onClick: /* @__PURE__ */ n((k) => {
                  k.stopPropagation(), nt(!0);
                }, "onClick"),
                role: "button",
                tabIndex: 0,
                onKeyDown: /* @__PURE__ */ n((k) => {
                  (k.key === "Enter" || k.key === " ") && (k.preventDefault(), k.stopPropagation(), nt(!0));
                }, "onKeyDown"),
                children: [
                  /* @__PURE__ */ a("div", { className: "tw:w-8", children: /* @__PURE__ */ a(Br, {}) }),
                  /* @__PURE__ */ p("div", { className: "tw:flex tw:items-center tw:gap-2", children: [
                    /* @__PURE__ */ a("p", { className: "tw:text-sm tw:text-muted-foreground", children: te }),
                    st ? /* @__PURE__ */ a(ci, {}) : /* @__PURE__ */ a(tr, {})
                  ] })
                ]
              }
            ),
            $.map((k) => /* @__PURE__ */ a("div", { children: /* @__PURE__ */ a(
              Un,
              {
                comment: k,
                localizedStrings: r,
                isReply: !0,
                isThreadExpanded: o,
                handleUpdateComment: g,
                handleDeleteComment: m,
                onEditingChange: Rt,
                canEditOrDelete: (!wt && yt.get(k.id)) ?? !1
              }
            ) }, k.id)),
            f !== !1 && (!wt || ue(K)) && /* @__PURE__ */ p(
              "div",
              {
                role: "textbox",
                tabIndex: -1,
                className: "tw:w-full tw:space-y-2",
                onClick: /* @__PURE__ */ n((k) => k.stopPropagation(), "onClick"),
                onKeyDownCapture: /* @__PURE__ */ n((k) => {
                  Jo(k) && (k.preventDefault(), k.stopPropagation(), (ue(K) || C !== void 0 && C !== I) && D());
                }, "onKeyDownCapture"),
                onKeyDown: /* @__PURE__ */ n((k) => {
                  Xo(k), (k.key === "Enter" || k.key === " ") && k.stopPropagation();
                }, "onKeyDown"),
                children: [
                  /* @__PURE__ */ a(
                    Na,
                    {
                      editorSerializedState: K,
                      onSerializedChange: /* @__PURE__ */ n((k) => et(k), "onSerializedChange"),
                      placeholder: u === "Resolved" ? r["%comment_reopenResolved%"] : r["%comment_replyOrAssign%"],
                      autoFocus: !0,
                      onClear: /* @__PURE__ */ n((k) => {
                        se.current = k;
                      }, "onClear")
                    }
                  ),
                  /* @__PURE__ */ p("div", { className: "tw:flex tw:flex-row tw:items-center tw:justify-end tw:gap-2", children: [
                    C !== void 0 && (ue(K) || C !== I) && /* @__PURE__ */ a("span", { className: "tw:flex-1 tw:text-sm tw:text-muted-foreground", children: Ue(
                      r["%comment_assigning_to%"] ?? "Assigning to: {assignedUser}",
                      {
                        assignedUser: ua(
                          C,
                          r
                        )
                      }
                    ) }),
                    /* @__PURE__ */ p(er, { open: Q, onOpenChange: dt, children: [
                      /* @__PURE__ */ a(Nr, { asChild: !0, children: /* @__PURE__ */ a(
                        Z,
                        {
                          size: "icon",
                          variant: "outline",
                          className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                          disabled: !bt || !y || y.length === 0 || !y.includes(s),
                          "aria-label": r["%comment_aria_assign_user%"] ?? "Assign user",
                          children: /* @__PURE__ */ a(li, {})
                        }
                      ) }),
                      /* @__PURE__ */ a(
                        rr,
                        {
                          className: "tw:w-auto tw:p-0",
                          align: "end",
                          onKeyDown: /* @__PURE__ */ n((k) => {
                            k.key === "Escape" && (k.stopPropagation(), dt(!1));
                          }, "onKeyDown"),
                          children: /* @__PURE__ */ a(ar, { children: /* @__PURE__ */ a(or, { children: y == null ? void 0 : y.map((k) => /* @__PURE__ */ a(
                            Ye,
                            {
                              onSelect: /* @__PURE__ */ n(() => {
                                at(k !== c ? k : void 0), Dt.current = "user-selected", z(void 0), dt(!1);
                              }, "onSelect"),
                              className: "tw:flex tw:items-center",
                              children: /* @__PURE__ */ a("span", { children: ua(k, r) })
                            },
                            k || "unassigned"
                          )) }) })
                        }
                      )
                    ] }),
                    /* @__PURE__ */ a(
                      Z,
                      {
                        size: "icon",
                        onClick: D,
                        className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                        disabled: !ue(K) && (C === void 0 || C === I),
                        "aria-label": r["%comment_aria_submit_comment%"] ?? "Submit comment",
                        children: /* @__PURE__ */ a(di, {})
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
n(ws, "CommentThread");
const Hw = x(
  ss,
  // `prose` gives block children (the top-level blockquote wrapper, and any p — whether nested
  // inside that blockquote or, in the non-verseText fallback, a direct child) vertical margins that
  // make these already-compact cards feel bulky. Zero both so the diff sits flush inside the card.
  "tw:[&>blockquote]:my-0 tw:[&_p]:my-0",
  "tw:[&_u]:font-semibold tw:[&_u]:text-success-foreground tw:[&_u]:no-underline",
  "tw:[&_s]:text-destructive tw:[&_s]:line-through"
), qw = /* @__PURE__ */ n((t) => t.replace(/(\s+)(<\/[us]>)/g, "$2$1"), "trimDiffSpanWhitespace"), pa = /* @__PURE__ */ n((t) => qw(Lo(t)), "sanitizeDiffHtml");
function ha({ html: t }) {
  return /* @__PURE__ */ a(
    "div",
    {
      className: Hw,
      dangerouslySetInnerHTML: { __html: t }
    }
  );
}
n(ha, "DiffHtml");
function Gw({
  comment: t,
  localizedStrings: e,
  availableActions: r = "acceptOrReject",
  resolvedResolution: o,
  onResolve: i,
  isResolving: c = !1
}) {
  const [s, l] = N("accept"), d = po(), w = po(), u = r === "loading", h = r === "accept", g = r === "none", m = r === "acceptRejectOrMerge", v = h ? "accept" : s, y = L(
    () => pa(t.rejectedText ?? ""),
    [t.rejectedText]
  ), f = L(
    () => pa(t.acceptedText ?? ""),
    [t.acceptedText]
  ), R = L(
    () => pa(t.mergedText ?? ""),
    [t.mergedText]
  ), _ = L(() => Lo(t.contents), [t.contents]);
  if (!cs(t))
    return /* @__PURE__ */ a(ha, { html: _ });
  const E = /* @__PURE__ */ n((I) => {
    l(I === "reject" || I === "merge" ? I : "accept");
  }, "handleChange"), T = e["%conflict_note_stale_notice%"] ?? "The verse was edited after this conflict was recorded, so 'Use the other change' is no longer available. Keep the current text to resolve.", A = m ? [
    {
      value: "merge",
      label: e["%conflict_note_option_combine%"] ?? "Combine both changes",
      html: R
    }
  ] : [], S = [
    {
      value: "accept",
      label: e["%conflict_note_option_keep_current%"] ?? "Keep the current text",
      html: f
    },
    {
      value: "reject",
      label: e["%conflict_note_option_use_other%"] ?? "Use the other change",
      html: y
    },
    ...A
  ], j = v === "accept", P = c || j;
  let M;
  j ? M = e["%conflict_note_save_disabled_tooltip%"] ?? "Keeping the current text makes no change — resolve the thread with the ✓ to keep it." : c || (M = e["%conflict_note_save_warning%"] ?? "This can't be undone.");
  const O = e["%conflict_note_no_result%"] ?? "No result preview available.", W = /* @__PURE__ */ a("p", { className: "tw:text-muted-foreground", children: O }), K = /* @__PURE__ */ n((I) => I ? /* @__PURE__ */ a("p", { className: "tw:whitespace-pre-wrap tw:text-foreground", children: I }) : W, "renderResolvedText"), et = /* @__PURE__ */ n(() => {
    const I = o ?? "accept";
    return I === "merged" ? t.mergedText ? /* @__PURE__ */ a(ha, { html: R }) : W : K(I === "reject" ? t.rejectedResultText : t.resultText);
  }, "renderResolvedResult"), C = /* @__PURE__ */ n((I) => h && I.value === "reject", "isStaleRejectOption"), at = /* @__PURE__ */ n((I) => {
    const z = v === I.value, G = `${w}-${I.value}`, st = C(I);
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
          "data-value": I.value,
          className: x(
            "tw:flex tw:flex-col tw:gap-1 tw:rounded-md tw:border tw:p-2",
            "tw:focus-within:ring-2 tw:focus-within:ring-ring tw:focus-within:ring-offset-1",
            z ? "tw:border-border tw:bg-accent/50" : "tw:border-transparent tw:hover:bg-accent/30",
            st ? "tw:cursor-not-allowed tw:opacity-60" : "tw:cursor-pointer"
          ),
          children: [
            /* @__PURE__ */ p("div", { className: "tw:flex tw:items-center tw:gap-2", children: [
              /* @__PURE__ */ a(
                fa,
                {
                  id: G,
                  value: I.value,
                  "aria-label": I.label,
                  disabled: st,
                  "aria-describedby": st ? d : void 0
                }
              ),
              /* @__PURE__ */ a("span", { "aria-hidden": !0, className: "tw:font-medium", children: I.label })
            ] }),
            st && // aria-describedby links the option to this visually-hidden notice so assistive tech
            // announces why the choice is read-only.
            /* @__PURE__ */ a("span", { id: d, className: "tw:sr-only", children: T }),
            /* @__PURE__ */ a(ha, { html: I.html })
          ]
        },
        I.value
      )
    );
  }, "renderOptionCard");
  return (
    // Contain every click inside the card (selecting an option, pressing Save) so it never bubbles
    // up to toggle the enclosing CommentThread open/closed. The thread toggles on click only, so a
    // single onClick guard at the root is enough; this container is not itself an interactive control
    // and needs no keyboard handler (the thread has no keyboard toggle to intercept).
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
    /* @__PURE__ */ p("div", { className: "tw:flex tw:flex-col tw:gap-3 tw:text-sm", onClick: /* @__PURE__ */ n((I) => I.stopPropagation(), "onClick"), children: [
      /* @__PURE__ */ a("p", { children: e["%conflict_note_description_verseText%"] ?? "Conflicting changes were made to the verse text." }),
      u && /* @__PURE__ */ p("div", { className: "tw:flex tw:flex-col tw:gap-2", "data-slot": "conflict-loading", children: [
        /* @__PURE__ */ a(gr, { className: "tw:h-8 tw:w-full" }),
        /* @__PURE__ */ a(gr, { className: "tw:h-8 tw:w-full" }),
        /* @__PURE__ */ a(gr, { className: "tw:h-8 tw:w-24" })
      ] }),
      !u && g && et(),
      !u && !g && /* @__PURE__ */ p(gt, { children: [
        /* @__PURE__ */ a("p", { children: e["%conflict_note_choose_prompt%"] ?? "Select which change to keep:" }),
        /* @__PURE__ */ a(
          Mo,
          {
            value: v,
            onValueChange: E,
            disabled: c,
            "aria-label": e["%conflict_note_choose_aria_label%"] ?? "Choose resolution",
            children: S.map((I) => C(I) ? /* @__PURE__ */ a(It, { delayDuration: 0, children: /* @__PURE__ */ p(Et, { children: [
              /* @__PURE__ */ a(Tt, { asChild: !0, children: at(I) }),
              /* @__PURE__ */ a(St, { children: T })
            ] }) }, I.value) : at(I))
          }
        ),
        /* @__PURE__ */ a(It, { delayDuration: 0, children: /* @__PURE__ */ p(Et, { children: [
          /* @__PURE__ */ a(Tt, { asChild: !0, children: /* @__PURE__ */ a("span", { className: "tw:inline-flex tw:self-start", children: /* @__PURE__ */ a(
            Z,
            {
              size: "sm",
              disabled: P,
              onClick: /* @__PURE__ */ n(() => i == null ? void 0 : i(v), "onClick"),
              children: e["%conflict_note_save_and_resolve%"] ?? "Save and resolve"
            }
          ) }) }),
          M && /* @__PURE__ */ a(St, { children: M })
        ] }) })
      ] })
    ] })
  );
}
n(Gw, "ConflictNoteCard");
const Yw = {
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
function Ww({
  comment: t,
  localizedStrings: e,
  resolvedResolution: r
}) {
  const o = L(
    () => pa(t.rejectedText ?? ""),
    [t.rejectedText]
  );
  if (r) {
    const { key: c, fallback: s } = Yw[r];
    return /* @__PURE__ */ a("p", { className: "tw:text-sm tw:font-normal tw:text-muted-foreground", children: e[c] ?? s });
  }
  const i = e["%conflict_note_summary_unresolved%"] ?? "Conflicting edits. Choose which change to keep.";
  return /* @__PURE__ */ p("div", { className: "tw:flex tw:flex-col tw:gap-1", children: [
    /* @__PURE__ */ a("p", { className: "tw:text-sm tw:font-normal tw:text-muted-foreground", children: i }),
    o ? /* @__PURE__ */ a(ha, { html: o }) : void 0
  ] });
}
n(Ww, "ConflictThreadSummary");
function Xw(t) {
  return t === "reject" ? "reject" : t === "merge" ? "merged" : "accept";
}
n(Xw, "resolutionToOutcome");
function Jw({
  threadId: t,
  threadStatus: e,
  isSelected: r,
  activeComments: o,
  conflictResolution: i
}) {
  const [c, s] = N("loading"), [l, d] = N(!1), [w, u] = N(), h = i == null ? void 0 : i.getOptions, g = i == null ? void 0 : i.resolve;
  X(() => {
    let _ = !0;
    if (!r) {
      s("loading");
      return;
    }
    return (/* @__PURE__ */ n(async () => {
      let T;
      try {
        T = h ? await h(t) : "none";
      } catch {
        T = "none";
      }
      _ && (s(T), T !== "none" && u(void 0));
    }, "check"))(), () => {
      _ = !1;
    };
  }, [r, t, e, h]);
  const m = U(!1), v = F(
    async (_) => {
      if (!(!g || m.current)) {
        m.current = !0, d(!0);
        try {
          await g(t, _) && (u(Xw(_)), s("none"));
        } catch {
        } finally {
          m.current = !1, d(!1);
        }
      }
    },
    [g, t]
  ), f = L(() => {
    if (e === "Resolved") {
      for (let _ = o.length - 1; _ >= 0; _ -= 1)
        if (o[_].status === "Resolved")
          return ls(o[_].conflictResolutionAction);
      return "accept";
    }
  }, [e, o]) ?? w;
  return { conflictOptions: c, isResolving: l, resolve: v, resolvedResolution: f, showResolveCheck: c !== "loading" && c !== "none" };
}
n(Jw, "useConflictResolution");
function Zw(t) {
  const {
    comments: e,
    localizedStrings: r,
    isSelected: o = !1,
    threadId: i,
    threadStatus: c,
    conflictResolution: s
  } = t, l = L(() => e.filter((R) => !R.deleted), [e]), d = L(
    () => l.find((R) => R.conflictType) ?? l[0],
    [l]
  ), { conflictOptions: w, isResolving: u, resolve: h, resolvedResolution: g, showResolveCheck: m } = Jw({
    threadId: i,
    threadStatus: c,
    isSelected: o,
    activeComments: l,
    conflictResolution: s
  }), v = cs(d);
  let y;
  v && d && (y = o ? /* @__PURE__ */ a(
    Gw,
    {
      comment: d,
      localizedStrings: r,
      availableActions: w,
      resolvedResolution: g,
      onResolve: h,
      isResolving: u
    }
  ) : /* @__PURE__ */ a(
    Ww,
    {
      comment: d,
      localizedStrings: r,
      resolvedResolution: g
    }
  ));
  let f;
  return v && (f = /* @__PURE__ */ a(
    ds,
    {
      show: m,
      disabled: u,
      onClick: /* @__PURE__ */ n(() => h("accept"), "onClick"),
      ariaLabel: r["%comment_aria_resolve_thread%"] ?? "Resolve thread"
    }
  )), /* @__PURE__ */ a(
    ws,
    {
      ...t,
      activeComments: l,
      rootContentSlot: y,
      resolveActionSlot: f,
      spaceRootContentFromReplies: v && o
    }
  );
}
n(Zw, "ConflictThread");
function xh({
  className: t = "",
  classNameForVerseText: e,
  threads: r,
  currentUser: o,
  localizedStrings: i,
  handleAddCommentToThread: c,
  handleUpdateComment: s,
  handleDeleteComment: l,
  handleReadStatusChange: d,
  assignableUsers: w,
  canUserAddCommentToThread: u,
  canUserAssignThreadCallback: h,
  canUserResolveThreadCallback: g,
  canUserEditOrDeleteCommentCallback: m,
  selectedThreadId: v,
  onSelectedThreadChange: y,
  onVerseRefClick: f,
  conflictResolution: R
}) {
  const [_, E] = N(/* @__PURE__ */ new Set()), [T, A] = N(), [S, j] = N(), P = F(
    async (z) => {
      const G = await c(z);
      return G !== void 0 && z.assignedUser !== void 0 && z.assignedUser !== "" && j(z.assignedUser), G;
    },
    [c]
  );
  X(() => {
    v && (E((z) => new Set(z).add(v)), A(v));
  }, [v]);
  const M = r.filter(
    (z) => z.comments.some((G) => !G.deleted)
  ), O = M.map((z) => ({ id: z.id })), W = F(
    (z) => {
      E((G) => new Set(G).add(z.id)), A(z.id), y == null || y(z.id);
    },
    [y]
  ), K = F(
    (z) => {
      const G = _.has(z);
      E((st) => {
        const nt = new Set(st);
        return nt.has(z) ? nt.delete(z) : nt.add(z), nt;
      }), A(z), y == null || y(G ? void 0 : z);
    },
    [_, y]
  ), { listboxRef: et, activeId: C, handleKeyDown: at } = Rs({
    options: O,
    onOptionSelect: W
  }), I = F(
    (z) => {
      z.key === "Escape" ? (T && _.has(T) && (E((G) => {
        const st = new Set(G);
        return st.delete(T), st;
      }), A(void 0), y == null || y(void 0)), z.preventDefault(), z.stopPropagation()) : at(z);
    },
    [T, _, at, y]
  );
  return /* @__PURE__ */ a(
    "div",
    {
      id: Bw,
      role: "listbox",
      tabIndex: 0,
      ref: et,
      "aria-activedescendant": C ?? void 0,
      "aria-label": "Comments",
      className: x(
        "tw:flex tw:w-full tw:flex-col tw:space-y-3 tw:outline-hidden tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-1 tw:focus:ring-offset-background",
        t
      ),
      onKeyDown: I,
      children: M.map((z) => {
        const G = {
          classNameForVerseText: e,
          comments: z.comments,
          localizedStrings: i,
          verseRef: z.verseRef,
          handleSelectThread: K,
          threadId: z.id,
          thread: z,
          isRead: z.isRead,
          isSelected: _.has(z.id),
          currentUser: o,
          assignedUser: z.assignedUser,
          threadStatus: z.status,
          handleAddCommentToThread: P,
          handleUpdateComment: s,
          handleDeleteComment: l,
          handleReadStatusChange: d,
          assignableUsers: w,
          canUserAddCommentToThread: u,
          canUserAssignThreadCallback: h,
          canUserResolveThreadCallback: g,
          canUserEditOrDeleteCommentCallback: m,
          onVerseRefClick: f,
          initialAssignedUser: S
        };
        return /* @__PURE__ */ a(
          "div",
          {
            className: x({
              "tw:opacity-60": z.status === "Resolved"
            }),
            children: z.type === "Conflict" ? /* @__PURE__ */ a(Zw, { ...G, conflictResolution: R }) : /* @__PURE__ */ a(ws, { ...G })
          },
          z.id
        );
      })
    }
  );
}
n(xh, "CommentList");
function Qw({ table: t }) {
  return /* @__PURE__ */ p(ze, { children: [
    /* @__PURE__ */ a(_e, { asChild: !0, children: /* @__PURE__ */ p(Z, { variant: "outline", size: "sm", className: "tw:ml-auto tw:hidden tw:h-8 tw:lg:flex", children: [
      /* @__PURE__ */ a(ac, { className: "tw:mr-2 tw:h-4 tw:w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ p(Pe, { align: "end", className: "tw:w-[150px]", children: [
      /* @__PURE__ */ a(_r, { children: "Toggle columns" }),
      /* @__PURE__ */ a(Qe, {}),
      t.getAllColumns().filter((e) => e.getCanHide()).map((e) => /* @__PURE__ */ a(
        Ke,
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
n(Qw, "DataTableViewOptions");
function br({ ...t }) {
  return /* @__PURE__ */ a(Qt.Root, { "data-slot": "select", ...t });
}
n(br, "Select");
function tu({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    Qt.Group,
    {
      "data-slot": "select-group",
      className: x("tw:scroll-my-1 tw:p-1", t),
      ...e
    }
  );
}
n(tu, "SelectGroup");
function xr({ ...t }) {
  return /* @__PURE__ */ a(Qt.Value, { "data-slot": "select-value", ...t });
}
n(xr, "SelectValue");
function yr({ className: t, size: e = "default", children: r, ...o }) {
  const i = Ee();
  return /* @__PURE__ */ p(
    Qt.Trigger,
    {
      "data-slot": "select-trigger",
      "data-size": e,
      className: x(
        "pr-twp tw:flex tw:w-fit tw:items-center tw:gap-2 tw:rounded-lg tw:border tw:border-input tw:bg-transparent tw:py-2 tw:pe-2 tw:ps-2.5 tw:text-sm tw:whitespace-nowrap tw:transition-colors tw:outline-none tw:select-none tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:data-placeholder:text-muted-foreground tw:data-[size=default]:h-8 tw:data-[size=sm]:h-7 tw:data-[size=sm]:rounded-[min(var(--tw-radius-md),10px)] tw:*:data-[slot=select-value]:line-clamp-1 tw:*:data-[slot=select-value]:flex tw:*:data-[slot=select-value]:flex-1 tw:*:data-[slot=select-value]:items-center tw:*:data-[slot=select-value]:gap-1.5 tw:*:data-[slot=select-value]:text-start tw:dark:bg-input/30 tw:dark:hover:bg-input/50 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      dir: i,
      ...o,
      children: [
        r,
        /* @__PURE__ */ a(Qt.Icon, { asChild: !0, children: /* @__PURE__ */ a(mi, { className: "tw:pointer-events-none tw:size-4 tw:text-muted-foreground" }) })
      ]
    }
  );
}
n(yr, "SelectTrigger");
function kr({
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
  ...c
}) {
  const s = Ee();
  return /* @__PURE__ */ a(Qt.Portal, { children: /* @__PURE__ */ p(
    Qt.Content,
    {
      "data-slot": "select-content",
      "data-align-trigger": r === "item-aligned",
      className: x(
        "pr-twp tw:relative tw:max-h-(--radix-select-content-available-height) tw:data-[align-trigger=true]:min-w-(--radix-select-trigger-width) tw:data-[align-trigger=false]:min-w-36 tw:origin-(--radix-select-content-transform-origin) tw:overflow-x-hidden tw:overflow-y-auto tw:rounded-lg tw:bg-popover tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:data-[align-trigger=true]:animate-none tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95 tw:animate-none! tw:bg-popover/70 tw:before:-z-1 tw:**:data-[slot$=-item]:focus:bg-foreground/10 tw:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 tw:**:data-[slot$=-separator]:bg-foreground/5 tw:**:data-[slot$=-trigger]:focus:bg-foreground/10 tw:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! tw:**:data-[variant=destructive]:focus:bg-foreground/10! tw:**:data-[variant=destructive]:text-accent-foreground! tw:**:data-[variant=destructive]:**:text-accent-foreground! tw:relative tw:before:pointer-events-none tw:before:absolute tw:before:inset-0 tw:before:rounded-[inherit] tw:before:backdrop-blur-2xl tw:before:backdrop-saturate-150",
        r === "popper" && "tw:data-[side=bottom]:translate-y-1 tw:data-[side=left]:-translate-x-1 tw:rtl:data-[side=left]:translate-x-1 tw:data-[side=right]:translate-x-1 tw:rtl:data-[side=right]:-translate-x-1 tw:data-[side=top]:-translate-y-1",
        t
      ),
      style: { zIndex: Ae, ...i },
      position: r,
      align: o,
      ...c,
      children: [
        /* @__PURE__ */ a(eu, {}),
        /* @__PURE__ */ a(
          Qt.Viewport,
          {
            "data-position": r,
            className: x(
              "tw:data-[position=popper]:h-(--radix-select-trigger-height) tw:data-[position=popper]:w-full tw:data-[position=popper]:min-w-(--radix-select-trigger-width)",
              r === "popper" && "tw:"
            ),
            children: /* @__PURE__ */ a("div", { dir: s, children: e })
          }
        ),
        /* @__PURE__ */ a(ru, {})
      ]
    }
  ) });
}
n(kr, "SelectContent");
function yh({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    Qt.Label,
    {
      "data-slot": "select-label",
      className: x("pr-twp tw:px-1.5 tw:py-1 tw:text-xs tw:text-muted-foreground", t),
      ...e
    }
  );
}
n(yh, "SelectLabel");
function fe({
  className: t,
  children: e,
  ...r
}) {
  return /* @__PURE__ */ p(
    Qt.Item,
    {
      "data-slot": "select-item",
      className: x(
        "pr-twp tw:relative tw:flex tw:w-full tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:*:[span]:last:flex tw:*:[span]:last:items-center tw:*:[span]:last:gap-2",
        t
      ),
      ...r,
      children: [
        /* @__PURE__ */ a("span", { className: "tw:pointer-events-none tw:absolute tw:end-2 tw:flex tw:size-4 tw:items-center tw:justify-center", children: /* @__PURE__ */ a(Qt.ItemIndicator, { children: /* @__PURE__ */ a(Ia, { className: "tw:pointer-events-none" }) }) }),
        /* @__PURE__ */ a(Qt.ItemText, { children: e })
      ]
    }
  );
}
n(fe, "SelectItem");
function kh({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    Qt.Separator,
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
n(kh, "SelectSeparator");
function eu({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    Qt.ScrollUpButton,
    {
      "data-slot": "select-scroll-up-button",
      className: x(
        "pr-twp tw:z-10 tw:flex tw:cursor-default tw:items-center tw:justify-center tw:bg-popover tw:py-1 tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      ...e,
      children: /* @__PURE__ */ a(Uc, {})
    }
  );
}
n(eu, "SelectScrollUpButton");
function ru({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    Qt.ScrollDownButton,
    {
      "data-slot": "select-scroll-down-button",
      className: x(
        "pr-twp tw:z-10 tw:flex tw:cursor-default tw:items-center tw:justify-center tw:bg-popover tw:py-1 tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      ...e,
      children: /* @__PURE__ */ a(Fc, {})
    }
  );
}
n(ru, "SelectScrollDownButton");
function au({ table: t }) {
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
        br,
        {
          value: `${t.getState().pagination.pageSize}`,
          onValueChange: /* @__PURE__ */ n((e) => {
            t.setPageSize(Number(e));
          }, "onValueChange"),
          children: [
            /* @__PURE__ */ a(yr, { className: "tw:h-8 tw:w-[70px]", children: /* @__PURE__ */ a(xr, { placeholder: t.getState().pagination.pageSize }) }),
            /* @__PURE__ */ a(kr, { side: "top", children: [10, 20, 30, 40, 50].map((e) => /* @__PURE__ */ a(fe, { value: `${e}`, children: e }, e)) })
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
        Z,
        {
          variant: "outline",
          size: "icon",
          className: "tw:hidden tw:h-8 tw:w-8 tw:p-0 tw:lg:flex",
          onClick: /* @__PURE__ */ n(() => t.setPageIndex(0), "onClick"),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ a("span", { className: "tw:sr-only", children: "Go to first page" }),
            /* @__PURE__ */ a(oc, { className: "tw:h-4 tw:w-4" })
          ]
        }
      ),
      /* @__PURE__ */ p(
        Z,
        {
          variant: "outline",
          size: "icon",
          className: "tw:h-8 tw:w-8 tw:p-0",
          onClick: /* @__PURE__ */ n(() => t.previousPage(), "onClick"),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ a("span", { className: "tw:sr-only", children: "Go to previous page" }),
            /* @__PURE__ */ a(nc, { className: "tw:h-4 tw:w-4" })
          ]
        }
      ),
      /* @__PURE__ */ p(
        Z,
        {
          variant: "outline",
          size: "icon",
          className: "tw:h-8 tw:w-8 tw:p-0",
          onClick: /* @__PURE__ */ n(() => t.nextPage(), "onClick"),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ a("span", { className: "tw:sr-only", children: "Go to next page" }),
            /* @__PURE__ */ a(ic, { className: "tw:h-4 tw:w-4" })
          ]
        }
      ),
      /* @__PURE__ */ p(
        Z,
        {
          variant: "outline",
          size: "icon",
          className: "tw:hidden tw:h-8 tw:w-8 tw:p-0 tw:lg:flex",
          onClick: /* @__PURE__ */ n(() => t.setPageIndex(t.getPageCount() - 1), "onClick"),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ a("span", { className: "tw:sr-only", children: "Go to last page" }),
            /* @__PURE__ */ a(sc, { className: "tw:h-4 tw:w-4" })
          ]
        }
      )
    ] })
  ] }) });
}
n(au, "DataTablePagination");
function ou({
  columns: t,
  data: e,
  enablePagination: r = !1,
  showPaginationControls: o = !1,
  showColumnVisibilityControls: i = !1,
  stickyHeader: c = !1,
  onRowClickHandler: s = /* @__PURE__ */ n(() => {
  }, "onRowClickHandler"),
  id: l,
  isLoading: d = !1,
  noResultsMessage: w
}) {
  var S;
  const [u, h] = N([]), [g, m] = N([]), [v, y] = N({}), [f, R] = N({}), _ = L(() => e ?? [], [e]), E = Mi({
    data: _,
    columns: t,
    getCoreRowModel: Ii(),
    ...r && { getPaginationRowModel: Gl() },
    onSortingChange: h,
    getSortedRowModel: Oi(),
    onColumnFiltersChange: m,
    getFilteredRowModel: ql(),
    onColumnVisibilityChange: y,
    onRowSelectionChange: R,
    state: {
      sorting: u,
      columnFilters: g,
      columnVisibility: v,
      rowSelection: f
    }
  }), T = E.getVisibleFlatColumns();
  let A;
  return d ? A = Array.from({ length: 10 }).map((M, O) => `skeleton-row-${O}`).map((M) => /* @__PURE__ */ a(Fe, { className: "tw:hover:bg-transparent", children: /* @__PURE__ */ a(fr, { colSpan: T.length ?? t.length, className: "tw:border-0 tw:p-0", children: /* @__PURE__ */ a("div", { className: "tw:w-full tw:py-2", children: /* @__PURE__ */ a(gr, { className: "tw:h-14 tw:w-full tw:rounded-md" }) }) }) }, M)) : ((S = E.getRowModel().rows) == null ? void 0 : S.length) > 0 ? A = E.getRowModel().rows.map((j) => /* @__PURE__ */ a(
    Fe,
    {
      onClick: /* @__PURE__ */ n(() => s(j, E), "onClick"),
      "data-state": j.getIsSelected() && "selected",
      children: j.getVisibleCells().map((P) => /* @__PURE__ */ a(fr, { children: Ar(P.column.columnDef.cell, P.getContext()) }, P.id))
    },
    j.id
  )) : A = /* @__PURE__ */ a(Fe, { children: /* @__PURE__ */ a(fr, { colSpan: t.length, className: "tw:h-24 tw:text-center", children: w }) }), /* @__PURE__ */ p("div", { className: "pr-twp", id: l, children: [
    i && /* @__PURE__ */ a(Qw, { table: E }),
    /* @__PURE__ */ p(Io, { stickyHeader: c, children: [
      /* @__PURE__ */ a(zo, { stickyHeader: c, children: E.getHeaderGroups().map((j) => /* @__PURE__ */ a(Fe, { children: j.headers.map((P) => /* @__PURE__ */ a(ma, { className: "tw:p-0", children: P.isPlaceholder ? void 0 : Ar(P.column.columnDef.header, P.getContext()) }, P.id)) }, j.id)) }),
      /* @__PURE__ */ a(Po, { children: A })
    ] }),
    r && /* @__PURE__ */ p("div", { className: "tw:flex tw:items-center tw:justify-end tw:space-x-2 tw:py-4", children: [
      /* @__PURE__ */ a(
        Z,
        {
          variant: "outline",
          size: "sm",
          onClick: /* @__PURE__ */ n(() => E.previousPage(), "onClick"),
          disabled: !E.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ a(
        Z,
        {
          variant: "outline",
          size: "sm",
          onClick: /* @__PURE__ */ n(() => E.nextPage(), "onClick"),
          disabled: !E.getCanNextPage(),
          children: "Next"
        }
      )
    ] }),
    r && o && /* @__PURE__ */ a(au, { table: E })
  ] });
}
n(ou, "DataTable");
function _h({
  id: t,
  markdown: e,
  className: r,
  anchorTarget: o,
  truncate: i
}) {
  const c = L(
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
          "tw:line-clamp-3 tw:max-h-10 tw:overflow-hidden tw:text-ellipsis tw:break-words": i
        },
        r
      ),
      children: /* @__PURE__ */ a(Xl, { options: c, children: e })
    }
  );
}
n(_h, "MarkdownRenderer");
const nu = Object.freeze([
  "%webView_error_dump_header%",
  "%webView_error_dump_info_message%"
]), Hn = /* @__PURE__ */ n((t, e) => t[e] ?? e, "localizeString$4");
function iu({
  errorDetails: t,
  handleCopyNotify: e,
  localizedStrings: r,
  id: o
}) {
  const i = Hn(r, "%webView_error_dump_header%"), c = Hn(r, "%webView_error_dump_info_message%");
  function s() {
    navigator.clipboard.writeText(t), e && e();
  }
  return n(s, "handleCopy"), /* @__PURE__ */ p(
    "div",
    {
      id: o,
      className: "tw:inline-flex tw:w-full tw:flex-col tw:items-start tw:justify-start tw:gap-4",
      children: [
        /* @__PURE__ */ p("div", { className: "tw:inline-flex tw:items-start tw:justify-start tw:gap-4 tw:self-stretch", children: [
          /* @__PURE__ */ p("div", { className: "tw:inline-flex tw:flex-1 tw:flex-col tw:items-start tw:justify-start", children: [
            /* @__PURE__ */ a("div", { className: "tw:text-color-text tw:justify-center tw:text-center tw:text-lg tw:font-semibold tw:leading-loose", children: i }),
            /* @__PURE__ */ a("div", { className: "tw:justify-center tw:self-stretch tw:text-sm tw:font-normal tw:leading-tight tw:text-muted-foreground", children: c })
          ] }),
          /* @__PURE__ */ a(Z, { variant: "secondary", size: "icon", className: "size-8", onClick: /* @__PURE__ */ n(() => s(), "onClick"), children: /* @__PURE__ */ a(wi, {}) })
        ] }),
        /* @__PURE__ */ a("div", { className: "tw:prose tw:w-full", children: /* @__PURE__ */ a("pre", { className: "tw:text-xs", children: t }) })
      ]
    }
  );
}
n(iu, "ErrorDump");
const Nh = Object.freeze([
  ...nu,
  "%webView_error_dump_copied_message%"
]);
function Ch({
  errorDetails: t,
  handleCopyNotify: e,
  localizedStrings: r,
  children: o,
  className: i,
  id: c
}) {
  const [s, l] = N(!1), d = /* @__PURE__ */ n(() => {
    l(!0), e && e();
  }, "handleCopyWithNotification");
  return /* @__PURE__ */ p(er, { onOpenChange: /* @__PURE__ */ n((u) => {
    u || l(!1);
  }, "handleOpenChange"), children: [
    /* @__PURE__ */ a(Nr, { asChild: !0, children: o }),
    /* @__PURE__ */ p(rr, { id: c, className: x("tw:min-w-80 tw:max-w-96", i), children: [
      s && r["%webView_error_dump_copied_message%"] && /* @__PURE__ */ a(Ot, { children: r["%webView_error_dump_copied_message%"] }),
      /* @__PURE__ */ a(
        iu,
        {
          errorDetails: t,
          handleCopyNotify: d,
          localizedStrings: r
        }
      )
    ] })
  ] });
}
n(Ch, "ErrorPopover");
var su = /* @__PURE__ */ ((t) => (t[t.Check = 0] = "Check", t[t.Radio = 1] = "Radio", t))(su || {});
function Eh({ id: t, label: e, groups: r }) {
  const [o, i] = N(
    Object.fromEntries(
      r.map(
        (w, u) => w.itemType === 0 ? [u, []] : void 0
      ).filter((w) => !!w)
    )
  ), [c, s] = N({}), l = /* @__PURE__ */ n((w, u) => {
    const h = !o[w][u];
    i((m) => (m[w][u] = h, { ...m }));
    const g = r[w].items[u];
    g.onUpdate(g.id, h);
  }, "handleCheckboxUpdate"), d = /* @__PURE__ */ n((w, u) => {
    s((g) => (g[w] = u, { ...g }));
    const h = r[w].items.find((g) => g.id === u);
    h ? h.onUpdate(u) : console.error(`Could not find dropdown radio item with id '${u}'!`);
  }, "handleRadioUpdate");
  return /* @__PURE__ */ a("div", { id: t, children: /* @__PURE__ */ p(ze, { children: [
    /* @__PURE__ */ a(_e, { asChild: !0, children: /* @__PURE__ */ p(Z, { variant: "default", children: [
      /* @__PURE__ */ a(cc, { size: 16, className: "tw:mr-2 tw:h-4 tw:w-4" }),
      e,
      /* @__PURE__ */ a(tr, { size: 16, className: "tw:ml-2 tw:h-4 tw:w-4" })
    ] }) }),
    /* @__PURE__ */ a(Pe, { children: r.map((w, u) => /* @__PURE__ */ p("div", { children: [
      /* @__PURE__ */ a(_r, { children: w.label }),
      /* @__PURE__ */ a(ri, { children: w.itemType === 0 ? /* @__PURE__ */ a(gt, { children: w.items.map((h, g) => /* @__PURE__ */ a("div", { children: /* @__PURE__ */ a(
        Ke,
        {
          checked: o[u][g],
          onCheckedChange: /* @__PURE__ */ n(() => l(u, g), "onCheckedChange"),
          children: h.label
        }
      ) }, h.id)) }) : /* @__PURE__ */ a(
        Ds,
        {
          value: c[u],
          onValueChange: /* @__PURE__ */ n((h) => d(u, h), "onValueChange"),
          children: w.items.map((h) => /* @__PURE__ */ a("div", { children: /* @__PURE__ */ a(Ms, { value: h.id, children: h.label }) }, h.id))
        }
      ) }),
      /* @__PURE__ */ a(Qe, {})
    ] }, w.label)) })
  ] }) });
}
n(Eh, "FilterDropdown");
function Th({
  id: t,
  category: e,
  downloads: r,
  languages: o,
  moreInfoUrl: i,
  handleMoreInfoLinkClick: c,
  supportUrl: s,
  handleSupportLinkClick: l
}) {
  const d = new gi("en", {
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
            /* @__PURE__ */ a(lc, { className: "tw:h-4 tw:w-4" }),
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
        (i || s) && /* @__PURE__ */ p("div", { className: "tw:flex tw:flex-col tw:gap-1 tw:px-4", children: [
          i && /* @__PURE__ */ a("div", { className: "tw:flex tw:gap-1", children: /* @__PURE__ */ p(
            Z,
            {
              onClick: /* @__PURE__ */ n(() => c(), "onClick"),
              variant: "link",
              className: "tw:flex tw:h-auto tw:gap-1 tw:py-0 tw:text-xs tw:font-semibold tw:text-foreground",
              children: [
                "Website",
                /* @__PURE__ */ a(dc, { className: "tw:h-4 tw:w-4" })
              ]
            }
          ) }),
          s && /* @__PURE__ */ a("div", { className: "tw:flex tw:gap-1", children: /* @__PURE__ */ p(
            Z,
            {
              onClick: /* @__PURE__ */ n(() => l(), "onClick"),
              variant: "link",
              className: "tw:flex tw:h-auto tw:gap-1 tw:py-0 tw:text-xs tw:font-semibold tw:text-foreground",
              children: [
                "Support",
                /* @__PURE__ */ a(wc, { className: "tw:h-4 tw:w-4" })
              ]
            }
          ) })
        ] })
      ]
    }
  );
}
n(Th, "MoreInfo");
function cu({ id: t, versionHistory: e }) {
  const [r, o] = N(!1), i = /* @__PURE__ */ new Date();
  function c(l) {
    const d = new Date(l), w = new Date(i.getTime() - d.getTime()), u = w.getUTCFullYear() - 1970, h = w.getUTCMonth(), g = w.getUTCDate() - 1;
    let m = "";
    return u > 0 ? m = `${u.toString()} year${u === 1 ? "" : "s"} ago` : h > 0 ? m = `${h.toString()} month${h === 1 ? "" : "s"} ago` : g === 0 ? m = "today" : m = `${g.toString()} day${g === 1 ? "" : "s"} ago`, m;
  }
  n(c, "formatTimeString");
  const s = Object.entries(e).sort((l, d) => d[0].localeCompare(l[0]));
  return /* @__PURE__ */ p("div", { className: "pr-twp", id: t, children: [
    /* @__PURE__ */ a("h3", { className: "tw:text-md tw:font-semibold", children: "What`s New" }),
    /* @__PURE__ */ a("ul", { className: "tw:list-disc tw:pl-5 tw:pr-4 tw:text-xs tw:text-foreground", children: (r ? s : s.slice(0, 5)).map((l) => /* @__PURE__ */ p("div", { className: "tw:mt-3 tw:flex tw:justify-between", children: [
      /* @__PURE__ */ a("div", { className: "tw:text-foreground", children: /* @__PURE__ */ a("li", { className: "tw:prose tw:text-xs", children: /* @__PURE__ */ a("span", { children: l[1].description }) }) }),
      /* @__PURE__ */ p("div", { className: "tw:justify-end tw:text-right", children: [
        /* @__PURE__ */ p("div", { children: [
          "Version ",
          l[0]
        ] }),
        /* @__PURE__ */ a("div", { children: c(l[1].date) })
      ] })
    ] }, l[0])) }),
    s.length > 5 && /* @__PURE__ */ a(
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
n(cu, "VersionHistory");
function Sh({
  id: t,
  publisherDisplayName: e,
  fileSize: r,
  locales: o,
  versionHistory: i,
  currentVersion: c
}) {
  const s = L(() => Dc(r), [r]), d = (/* @__PURE__ */ n((w) => {
    const u = new Intl.DisplayNames(Mc(), { type: "language" });
    return w.map((h) => u.of(h));
  }, "getLanguageNames"))(o);
  return /* @__PURE__ */ a("div", { id: t, className: "pr-twp tw:border-t tw:py-2", children: /* @__PURE__ */ p("div", { className: "tw:flex tw:flex-col tw:gap-2 tw:divide-y", children: [
    Object.entries(i).length > 0 && /* @__PURE__ */ a(cu, { versionHistory: i }),
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
          /* @__PURE__ */ a("span", { className: "tw:font-semibold", children: c }),
          /* @__PURE__ */ a("span", { children: "Languages" }),
          /* @__PURE__ */ a("span", { className: "tw:font-semibold", children: d.join(", ") })
        ] }) })
      ] })
    ] })
  ] }) });
}
n(Sh, "Footer");
function Rh({
  entries: t,
  selected: e,
  onChange: r,
  placeholder: o,
  commandEmptyMessage: i,
  customSelectedText: c,
  isDisabled: s,
  sortSelected: l,
  icon: d,
  className: w,
  badgesPlaceholder: u,
  id: h
}) {
  return /* @__PURE__ */ p("div", { id: h, className: "tw:flex tw:items-center tw:gap-2", children: [
    /* @__PURE__ */ a(
      Os,
      {
        entries: t,
        selected: e,
        onChange: r,
        placeholder: o,
        commandEmptyMessage: i,
        customSelectedText: c,
        isDisabled: s,
        sortSelected: l,
        icon: d,
        className: w
      }
    ),
    e.length > 0 ? /* @__PURE__ */ a("div", { className: "tw:flex tw:flex-wrap tw:items-center tw:gap-2", children: e.map((g) => {
      var m;
      return /* @__PURE__ */ p(Lr, { variant: "muted", className: "tw:flex tw:items-center tw:gap-1", children: [
        /* @__PURE__ */ a(
          Z,
          {
            variant: "ghost",
            size: "icon",
            className: "tw:h-4 tw:w-4 tw:p-0 tw:hover:bg-transparent",
            onClick: /* @__PURE__ */ n(() => r(e.filter((v) => v !== g)), "onClick"),
            children: /* @__PURE__ */ a(Vo, { className: "tw:h-3 tw:w-3" })
          }
        ),
        (m = t.find((v) => v.value === g)) == null ? void 0 : m.label
      ] }, g);
    }) }) : /* @__PURE__ */ a(Ot, { children: u })
  ] });
}
n(Rh, "Filter");
const lu = Object.freeze([
  "%undoButton_tooltip%",
  "%redoButton_tooltip%"
]), qn = /* @__PURE__ */ n((t, e) => t[e] ?? e, "localizeString$3");
function du({
  onUndoClick: t,
  onRedoClick: e,
  canUndo: r = !0,
  canRedo: o = !0,
  localizedStrings: i = {},
  showKeyboardShortcuts: c = !0,
  className: s = "tw:h-6 tw:w-6",
  variant: l = "ghost"
}) {
  const d = Oo(), w = qn(i, "%undoButton_tooltip%"), u = qn(i, "%redoButton_tooltip%");
  return /* @__PURE__ */ p(Ra, { children: [
    /* @__PURE__ */ a(It, { children: /* @__PURE__ */ p(Et, { children: [
      /* @__PURE__ */ a(Tt, { asChild: !0, children: /* @__PURE__ */ a(
        Z,
        {
          "aria-label": w,
          className: s,
          size: "icon",
          onClick: t,
          disabled: !r,
          variant: l,
          children: /* @__PURE__ */ a(uc, {})
        }
      ) }),
      /* @__PURE__ */ a(St, { children: /* @__PURE__ */ p("p", { children: [
        w,
        c && /* @__PURE__ */ p(gt, { children: [
          " ",
          /* @__PURE__ */ a(wo, { children: d ? "⌘Z" : "Ctrl+Z" })
        ] })
      ] }) })
    ] }) }),
    e && (l === "secondary" || l === "default") && /* @__PURE__ */ a(Do, {}),
    e && /* @__PURE__ */ a(It, { children: /* @__PURE__ */ p(Et, { children: [
      /* @__PURE__ */ a(Tt, { asChild: !0, children: /* @__PURE__ */ a(
        Z,
        {
          "aria-label": u,
          className: s,
          size: "icon",
          onClick: e,
          disabled: !o,
          variant: l,
          children: /* @__PURE__ */ a(pc, {})
        }
      ) }),
      /* @__PURE__ */ a(St, { children: /* @__PURE__ */ p("p", { children: [
        u,
        c && /* @__PURE__ */ p(gt, { children: [
          " ",
          /* @__PURE__ */ a(wo, { children: d ? "⌘⇧Z" : "Ctrl+Y" })
        ] })
      ] }) })
    ] }) })
  ] });
}
n(du, "UndoRedoButtons");
function wu({
  children: t,
  editorRef: e,
  canUndo: r = !0,
  canRedo: o = !0
}) {
  const i = U(null);
  return X(() => {
    var d;
    const c = Oo(), s = ((d = i.current) == null ? void 0 : d.querySelector(".editor-input")) ?? void 0, l = /* @__PURE__ */ n((w) => {
      var h, g, m, v;
      if (!s || document.activeElement !== s) return;
      const u = w.key.toLowerCase();
      if (c) {
        if (!w.metaKey) return;
        !w.shiftKey && u === "z" ? (w.preventDefault(), r && ((h = e.current) == null || h.undo())) : w.shiftKey && u === "z" && (w.preventDefault(), o && ((g = e.current) == null || g.redo()));
      } else {
        if (!w.ctrlKey) return;
        !w.shiftKey && u === "z" ? (w.preventDefault(), r && ((m = e.current) == null || m.undo())) : (u === "y" || w.shiftKey && u === "z") && (w.preventDefault(), o && ((v = e.current) == null || v.redo()));
      }
    }, "handleKeyDown");
    return document.addEventListener("keydown", l), () => document.removeEventListener("keydown", l);
  }, [o, r, e]), /* @__PURE__ */ a("div", { ref: i, children: t });
}
n(wu, "EditorKeyboardShortcuts");
const uu = /* @__PURE__ */ n((t, e, r) => t === "generated" ? /* @__PURE__ */ p(gt, { children: [
  /* @__PURE__ */ a("p", { children: "+" }),
  " ",
  e["%footnoteEditor_callerDropdown_item_generated%"]
] }) : t === "hidden" ? /* @__PURE__ */ p(gt, { children: [
  /* @__PURE__ */ a("p", { children: "-" }),
  " ",
  e["%footnoteEditor_callerDropdown_item_hidden%"]
] }) : /* @__PURE__ */ p(gt, { children: [
  /* @__PURE__ */ a("p", { children: r }),
  " ",
  e["%footnoteEditor_callerDropdown_item_custom%"]
] }), "renderCallerButtonContent");
function pu({
  callerType: t,
  customCaller: e,
  updateCaller: r,
  localizedStrings: o
}) {
  const i = U(null), c = U(null), s = U(!1), [l, d] = N(t), [w, u] = N(e), [h, g] = N(!1), m = U(!1), v = U(l);
  v.current = l;
  const y = U(w);
  y.current = w, X(() => {
    d(t);
  }, [t]), X(() => {
    w !== e && u(e);
  }, [e]);
  const f = /* @__PURE__ */ n((_) => {
    if (s.current = !1, g(_), !_) {
      const E = v.current, T = y.current;
      E !== "custom" || T ? (E !== t || T !== e) && r(E, T) : (d(t), u(e));
    }
  }, "handleDropdownOpenChange"), R = /* @__PURE__ */ n((_) => {
    var E, T, A, S;
    _.stopPropagation(), document.activeElement === c.current && _.key === "ArrowDown" || _.key === "ArrowRight" ? ((E = i.current) == null || E.focus(), s.current = !0) : document.activeElement === i.current && _.key === "ArrowUp" ? ((T = c.current) == null || T.focus(), s.current = !1) : document.activeElement === i.current && _.key === "ArrowLeft" && ((A = i.current) == null ? void 0 : A.selectionStart) === 0 && ((S = c.current) == null || S.focus(), s.current = !1), l === "custom" && _.key === "Enter" && (document.activeElement === c.current || document.activeElement === i.current) && f(!1);
  }, "handleKeyDown");
  return /* @__PURE__ */ p(ze, { open: h, onOpenChange: f, children: [
    /* @__PURE__ */ a(It, { children: /* @__PURE__ */ p(Et, { children: [
      /* @__PURE__ */ a(Tt, { asChild: !0, children: /* @__PURE__ */ a(_e, { asChild: !0, children: /* @__PURE__ */ a(Z, { variant: "outline", className: "tw:h-6", children: uu(t, o, e) }) }) }),
      /* @__PURE__ */ a(St, { children: o["%footnoteEditor_callerDropdown_tooltip%"] })
    ] }) }),
    /* @__PURE__ */ p(
      Pe,
      {
        style: { zIndex: ai },
        onClick: /* @__PURE__ */ n(() => {
          s.current && (s.current = !1);
        }, "onClick"),
        onKeyDown: R,
        onMouseMove: /* @__PURE__ */ n(() => {
          var _;
          s.current && ((_ = i.current) == null || _.focus());
        }, "onMouseMove"),
        children: [
          /* @__PURE__ */ a(_r, { children: o["%footnoteEditor_callerDropdown_label%"] }),
          /* @__PURE__ */ a(Qe, {}),
          /* @__PURE__ */ a(
            Ke,
            {
              checked: l === "generated",
              onCheckedChange: /* @__PURE__ */ n(() => d("generated"), "onCheckedChange"),
              children: /* @__PURE__ */ p("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ a("span", { children: o["%footnoteEditor_callerDropdown_item_generated%"] }),
                /* @__PURE__ */ a("span", { className: "tw:w-10 tw:text-center", children: fo })
              ] })
            }
          ),
          /* @__PURE__ */ a(
            Ke,
            {
              checked: l === "hidden",
              onCheckedChange: /* @__PURE__ */ n(() => d("hidden"), "onCheckedChange"),
              children: /* @__PURE__ */ p("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ a("span", { children: o["%footnoteEditor_callerDropdown_item_hidden%"] }),
                /* @__PURE__ */ a("span", { className: "tw:w-10 tw:text-center", children: mo })
              ] })
            }
          ),
          /* @__PURE__ */ a(
            Ke,
            {
              ref: c,
              checked: l === "custom",
              onCheckedChange: /* @__PURE__ */ n(() => d("custom"), "onCheckedChange"),
              onPointerDown: /* @__PURE__ */ n(() => {
                m.current = l === "custom";
              }, "onPointerDown"),
              onClick: /* @__PURE__ */ n((_) => {
                var E;
                if (_.stopPropagation(), m.current && _.target !== i.current) {
                  f(!1);
                  return;
                }
                s.current = !0, (E = i.current) == null || E.focus();
              }, "onClick"),
              onSelect: /* @__PURE__ */ n((_) => _.preventDefault(), "onSelect"),
              children: /* @__PURE__ */ p("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ a("span", { children: o["%footnoteEditor_callerDropdown_item_custom%"] }),
                /* @__PURE__ */ a(
                  Ma,
                  {
                    tabIndex: 0,
                    onMouseDown: /* @__PURE__ */ n((_) => {
                      _.stopPropagation(), d("custom"), s.current = !0;
                    }, "onMouseDown"),
                    ref: i,
                    className: "tw:h-auto tw:w-10 tw:p-0 tw:text-center",
                    value: w,
                    onKeyDown: /* @__PURE__ */ n((_) => {
                      _.key === "Enter" || _.key === "ArrowUp" || _.key === "ArrowDown" || _.key === "ArrowLeft" || _.key === "ArrowRight" || _.stopPropagation();
                    }, "onKeyDown"),
                    maxLength: 1,
                    onChange: /* @__PURE__ */ n((_) => u(_.target.value), "onChange")
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
n(pu, "FootnoteCallerDropdown");
const hu = /* @__PURE__ */ n((t, e) => t === "f" ? /* @__PURE__ */ p(gt, { children: [
  /* @__PURE__ */ a(pi, {}),
  " ",
  e["%footnoteEditor_noteType_footnote_label%"]
] }) : t === "fe" ? /* @__PURE__ */ p(gt, { children: [
  /* @__PURE__ */ a(hi, {}),
  " ",
  e["%footnoteEditor_noteType_endNote_label%"]
] }) : /* @__PURE__ */ p(gt, { children: [
  /* @__PURE__ */ a(ui, {}),
  " ",
  e["%footnoteEditor_noteType_crossReference_label%"]
] }), "renderNoteTypeButtonContent"), gu = /* @__PURE__ */ n((t, e) => {
  if (t === "x")
    return e["%footnoteEditor_noteType_crossReference_label%"];
  let r = e["%footnoteEditor_noteType_endNote_label%"];
  return t === "f" && (r = e["%footnoteEditor_noteType_footnote_label%"]), Ue(e["%footnoteEditor_noteType_tooltip%"] ?? "", {
    noteType: r
  });
}, "formatNoteTypeTooltip");
function fu({
  noteType: t,
  handleNoteTypeChange: e,
  localizedStrings: r,
  isTypeSwitchable: o
}) {
  return /* @__PURE__ */ p(ze, { children: [
    /* @__PURE__ */ a(It, { children: /* @__PURE__ */ p(Et, { children: [
      /* @__PURE__ */ a(Tt, { asChild: !0, children: /* @__PURE__ */ a(_e, { asChild: !0, children: /* @__PURE__ */ a(Z, { variant: "outline", className: "tw:h-6", children: hu(t, r) }) }) }),
      /* @__PURE__ */ a(St, { children: /* @__PURE__ */ a("p", { children: gu(t, r) }) })
    ] }) }),
    /* @__PURE__ */ p(Pe, { style: { zIndex: ai }, children: [
      /* @__PURE__ */ a(_r, { children: r["%footnoteEditor_noteTypeDropdown_label%"] }),
      /* @__PURE__ */ a(Qe, {}),
      /* @__PURE__ */ p(
        Ke,
        {
          disabled: t !== "x" && !o,
          checked: t === "x",
          onCheckedChange: /* @__PURE__ */ n(() => e("x"), "onCheckedChange"),
          className: "tw:gap-2",
          children: [
            /* @__PURE__ */ a(ui, {}),
            /* @__PURE__ */ a("span", { children: r["%footnoteEditor_noteType_crossReference_label%"] })
          ]
        }
      ),
      /* @__PURE__ */ p(
        Ke,
        {
          disabled: t === "x" && !o,
          checked: t === "f",
          onCheckedChange: /* @__PURE__ */ n(() => e("f"), "onCheckedChange"),
          className: "tw:gap-2",
          children: [
            /* @__PURE__ */ a(pi, {}),
            /* @__PURE__ */ a("span", { children: r["%footnoteEditor_noteType_footnote_label%"] })
          ]
        }
      ),
      /* @__PURE__ */ p(
        Ke,
        {
          disabled: t === "x" && !o,
          checked: t === "fe",
          onCheckedChange: /* @__PURE__ */ n(() => e("fe"), "onCheckedChange"),
          className: "tw:gap-2",
          children: [
            /* @__PURE__ */ a(hi, {}),
            /* @__PURE__ */ a("span", { children: r["%footnoteEditor_noteType_endNote_label%"] })
          ]
        }
      )
    ] })
  ] });
}
n(fu, "FootnoteTypeDropdown");
const mu = Object.freeze([
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
function vu({ icon: t, className: e }) {
  return /* @__PURE__ */ a(t ?? hc, { className: e, size: 16 });
}
n(vu, "MenuMarkerIcon");
function bu({ state: t }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "marker-selection-state",
      className: "tw:flex tw:w-4 tw:min-w-4 tw:items-center tw:justify-center",
      children: t !== "none" && /* @__PURE__ */ a(qe, { size: 16 })
    }
  );
}
n(bu, "MarkerSelectionStateIndicator");
function Gn({
  item: t,
  localizedStrings: e
}) {
  return /* @__PURE__ */ p(
    Ye,
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
        t.selectionState !== void 0 && /* @__PURE__ */ a(bu, { state: t.selectionState }),
        /* @__PURE__ */ a("div", { className: "tw:w-8 tw:min-w-8", children: t.marker ? (
          // Monospace: a USFM marker is a code, not prose, and should read as one. Deliberately
          // inherits the row's own foreground rather than taking a marker-specific colour.
          /* @__PURE__ */ a("span", { className: "tw:font-mono tw:text-xs", children: t.marker })
        ) : /* @__PURE__ */ a("div", { children: /* @__PURE__ */ a(vu, { icon: t.icon }) }) }),
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
        (t.isDisallowed || t.isDeprecated) && /* @__PURE__ */ a(zs, { className: "tw:font-sans", children: t.isDisallowed ? e["%markerMenu_disallowed_label%"] : e["%markerMenu_deprecated_label%"] })
      ]
    }
  );
}
n(Gn, "MarkerMenuCommandItem");
function xu({
  localizedStrings: t,
  markerMenuItems: e,
  searchRef: r,
  searchPlaceholder: o
}) {
  const [i, c] = N(""), [s, l] = L(() => {
    const d = Is(i.trim().toLowerCase());
    if (!d) {
      const h = e.filter((g) => !g.isDisallowed);
      return [h.length > 0 ? h : e, []];
    }
    const w = e.filter((h) => {
      var m;
      const g = (m = h.marker) == null ? void 0 : m.toLowerCase();
      return h.isDisallowed ? g === d : g == null ? void 0 : g.includes(d);
    }), u = e.filter(
      (h) => h.title.toLowerCase().includes(d) && !w.includes(h)
    );
    return [w, u];
  }, [i, e]);
  return /* @__PURE__ */ p(ar, { className: "tw:p-1", shouldFilter: !1, loop: !0, children: [
    /* @__PURE__ */ a(
      Sa,
      {
        className: "marker-menu-search",
        ref: r,
        value: i,
        onValueChange: /* @__PURE__ */ n((d) => c(d), "onValueChange"),
        placeholder: o ?? t["%markerMenu_searchPlaceholder%"],
        spaceSelectsHighlightedItem: !0
      }
    ),
    /* @__PURE__ */ p(or, { children: [
      /* @__PURE__ */ a(Da, { children: t["%markerMenu_noResults%"] }),
      /* @__PURE__ */ a(He, { children: s.map((d) => {
        var w;
        return /* @__PURE__ */ a(
          Gn,
          {
            item: d,
            localizedStrings: t
          },
          `item-${d.marker ?? ((w = d.icon) == null ? void 0 : w.displayName)}-${d.title.replaceAll(" ", "")}`
        );
      }) }),
      l.length > 0 && /* @__PURE__ */ p(gt, { children: [
        s.length > 0 && /* @__PURE__ */ a(oi, { alwaysRender: !0 }),
        /* @__PURE__ */ a(He, { children: l.map((d) => {
          var w;
          return /* @__PURE__ */ a(
            Gn,
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
n(xu, "MarkerMenu");
function yu(t, e, r, o) {
  if (!o || o === "p") return [];
  const i = ca[o];
  if (!(i != null && i.children)) return [];
  const c = [];
  return Object.entries(i.children).forEach(([, s]) => {
    c.push(
      ...s.map((l) => ({
        marker: l,
        title: r[ca[l].description] ?? ca[l].description,
        action: /* @__PURE__ */ n(() => {
          var d;
          (d = t.current) == null || d.insertMarker(l), e();
        }, "action")
      }))
    );
  }), c.sort((s, l) => (s.marker ?? s.title).localeCompare(l.marker ?? l.title));
}
n(yu, "generateInlineMarkerMenuListItems");
function ku(t) {
  return {
    id: t.marker,
    label: t.marker,
    description: t.description,
    badge: t.kind === "closeTag" ? "%markerMenu_endTag_label%" : void 0,
    muted: !t.isBasic
  };
}
n(ku, "markerMenuItemToPaletteItem");
function _u(t) {
  var r;
  const e = (r = t.attributes) == null ? void 0 : r.char;
  e != null && e.style && (e.style === "ft" && (e.style = "xt"), e.style === "fr" && (e.style = "xo"), e.style === "fq" && (e.style = "xq"));
}
n(_u, "footnoteToCrossReferenceOp");
function Nu(t) {
  var r;
  const e = (r = t.attributes) == null ? void 0 : r.char;
  e != null && e.style && (e.style === "xt" && (e.style = "ft"), e.style === "xo" && (e.style = "fr"), e.style === "xq" && (e.style = "fq"));
}
n(Nu, "crossReferenceToFootnoteOp");
const Cu = {
  type: "USJ",
  version: "3.1",
  content: [
    {
      type: "para"
    }
  ]
};
function Dh({
  classNameForEditor: t,
  noteOps: e,
  onChange: r,
  onClose: o,
  scrRef: i,
  noteKey: c,
  editorOptions: s,
  defaultMarkerMenuTrigger: l,
  localizedStrings: d,
  parentEditorRef: w,
  markerPalette: u,
  onNoteEdit: h
}) {
  var te;
  const g = U(null), m = U(null), v = U(null), y = U(null);
  Zt(() => {
    if (!y.current) return;
    const { width: D } = y.current.getBoundingClientRect();
    D > 0 && (y.current.style.width = `${D}px`);
  }, []);
  const [f, R] = N("generated"), [_, E] = N("generated"), [T, A] = N("*"), [S, j] = N("*"), [P, M] = N("f"), [O, W] = N(!1), [K, et] = N(!0), [C, at] = N(!1), I = U(!1), z = U(""), [G, st] = N(!1), [nt, wt] = N(), [Rt, Q] = N(), [dt, bt] = N(), [ht, zt] = N(), qt = U(null), ut = U(
    void 0
  ), ve = U(0), ne = U(void 0), xt = L(
    () => ({
      ...s,
      // Drop any inherited context-menu extras (e.g. the main editor's "Insert footnote" /
      // "Insert cross-reference" / "Insert comment" items). Those items' onSelect closures are
      // bound to the OUTER main-document editorRef, so surfacing them inside this popover would
      // let a right-click here silently mutate the main document. The popover keeps only the
      // built-in Cut/Copy/Paste context-menu items.
      contextMenu: void 0,
      markerMenuTrigger: l,
      hasExternalUI: !0,
      view: {
        ...s.view ?? Jl(),
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
    [s, l]
  ), ft = L(
    () => yu(
      g,
      () => st(!1),
      d,
      ht
    ),
    [d, ht]
  );
  X(() => {
    var D;
    G || (D = g.current) == null || D.focus();
  }, [P, G]);
  const yt = F(() => {
    var k, Y, V;
    const D = (k = m.current) == null ? void 0 : k.querySelector(".editor-input"), H = D == null ? void 0 : D.querySelector("span.note"), J = (V = (Y = m.current) == null ? void 0 : Y.ownerDocument.getSelection()) == null ? void 0 : V.anchorNode;
    return !!H && !!J && H.contains(J);
  }, []);
  X(() => {
    var Y, V;
    let D, H, J;
    I.current = !1, ne.current = void 0, et(!0);
    const k = e == null ? void 0 : e.at(0);
    if (k && Mr("note", k)) {
      const rt = (Y = k.insert.note) == null ? void 0 : Y.caller;
      let it = "custom";
      rt === fo ? it = "generated" : rt === mo ? it = "hidden" : rt && (A(rt), j(rt)), R(it), E(it), M(((V = k.insert.note) == null ? void 0 : V.style) ?? "f"), D = setTimeout(() => {
        var lt, Nt, At;
        (lt = g.current) == null || lt.applyUpdate([k]), (Nt = g.current) == null || Nt.selectNote(0), (At = g.current) == null || At.focus(), H = requestAnimationFrame(() => {
          J = setTimeout(() => {
            var Lt, ee;
            yt() || ((Lt = g.current) == null || Lt.selectNote(0), (ee = g.current) == null || ee.focus());
          }, 0);
        });
      }, 0);
    }
    return () => {
      D && clearTimeout(D), H !== void 0 && cancelAnimationFrame(H), J !== void 0 && clearTimeout(J);
    };
  }, [e, c, yt]);
  const Gt = F(
    (D = !1) => {
      var J, k, Y;
      h == null || h();
      const H = (k = (J = g.current) == null ? void 0 : J.getNoteOps(0)) == null ? void 0 : k.at(0);
      H && Mr("note", H) && (r == null || r([H]), D && w && c && ((Y = w.current) == null || Y.replaceEmbedUpdate(c, [H])));
    },
    [c, r, h, w]
  ), Dt = F(
    (D, H) => {
      var Y, V, rt;
      const J = (V = (Y = g.current) == null ? void 0 : Y.getNoteOps(0)) == null ? void 0 : V.at(0);
      if (!J || !Mr("note", J) || !J.insert.note) return;
      let k;
      D === "custom" ? k = H : D === "generated" ? k = fo : k = mo, J.insert.note.caller !== k && (J.insert.note.caller = k, (rt = g.current) == null || rt.applyUpdate([J, { delete: 1 }]));
    },
    []
  ), Ct = F(() => {
    var D;
    ut.current || (D = g.current) == null || D.commitPendingMarkerEdits(), Gt(!0), o();
  }, [o, Gt]), mt = U(Ct);
  Zt(() => {
    mt.current = Ct;
  });
  const ie = U({ book: i.book, chapterNum: i.chapterNum });
  Zt(() => {
    (ie.current.book !== i.book || ie.current.chapterNum !== i.chapterNum) && (ie.current = { book: i.book, chapterNum: i.chapterNum }, mt.current());
  }, [i.book, i.chapterNum]);
  const se = /* @__PURE__ */ n(() => {
    var H;
    const D = (H = m.current) == null ? void 0 : H.getElementsByClassName("editor-input")[0];
    D != null && D.textContent && navigator.clipboard.writeText(D.textContent);
  }, "handleCopy"), ce = F(
    (D, H) => {
      h == null || h(), R(D), A(H), Dt(D, H);
    },
    [Dt, h]
  ), $e = /* @__PURE__ */ n((D) => {
    var J, k, Y, V, rt;
    M(D);
    const H = (k = (J = g.current) == null ? void 0 : J.getNoteOps(0)) == null ? void 0 : k.at(0);
    if (H && Mr("note", H)) {
      H.insert.note && (H.insert.note.style = D);
      const it = (V = (Y = H.insert.note) == null ? void 0 : Y.contents) == null ? void 0 : V.ops;
      P !== "x" && D === "x" ? it == null || it.forEach((lt) => _u(lt)) : P === "x" && D !== "x" && (it == null || it.forEach((lt) => Nu(lt))), (rt = g.current) == null || rt.applyUpdate([H, { delete: 1 }]);
    }
  }, "handleNoteTypeChange"), Kt = /* @__PURE__ */ n((D) => {
    zt(D.contextMarker), at(D.canRedo);
  }, "handleStateChange"), Ve = F(
    (D) => {
      var J, k, Y, V, rt;
      const H = (k = (J = g.current) == null ? void 0 : J.getNoteOps(0)) == null ? void 0 : k.at(0);
      if (H && Mr("note", H)) {
        D.content.length > 1 && setTimeout(() => {
          var Nt;
          (Nt = g.current) == null || Nt.applyUpdate([{ retain: 2 }, { delete: 1 }]);
        }, 0);
        const it = (Y = H.insert.note) == null ? void 0 : Y.style, lt = (rt = (V = H.insert.note) == null ? void 0 : V.contents) == null ? void 0 : rt.ops;
        if (it || W(!1), W(
          it === "x" ? !!(lt != null && lt.every((Nt) => {
            var Lt, ee;
            if (!((Lt = Nt.attributes) != null && Lt.char)) return !0;
            const At = ((ee = Nt.attributes) == null ? void 0 : ee.char).style;
            return At === "xt" || At === "xo" || At === "xq";
          })) : !!(lt != null && lt.every((Nt) => {
            var Lt, ee;
            if (!((Lt = Nt.attributes) != null && Lt.char)) return !0;
            const At = ((ee = Nt.attributes) == null ? void 0 : ee.char).style;
            return At === "ft" || At === "fr" || At === "fq";
          }))
        ), !I.current) {
          I.current = !0, z.current = JSON.stringify(H), et(!0);
          return;
        }
        et(JSON.stringify(H) === z.current), Gt();
      } else
        W(!1), et(!0);
    },
    [Gt]
  ), Pt = F(() => {
    const D = window.getSelection();
    if (v.current && ft.length && D && D.rangeCount > 0) {
      const H = D.getRangeAt(0).getBoundingClientRect(), J = v.current.getBoundingClientRect();
      wt(H.left - J.left), Q(H.top - J.top), bt(H.height), st(!0);
    }
  }, [ft, v]), _t = U(() => {
  }), be = F(
    (D, H, J) => {
      const { anchorRect: k } = D;
      if (!u || !k) return;
      const { passive: Y } = J;
      Ps({
        items: H,
        passive: Y,
        // No `shouldSpaceCommit`, deliberately: the Space note-marker exception exists for
        // Standard-view BODY text, where a materialized `\f ` literal absorbs the following word
        // as the new footnote's caller. This palette offers note-INTERNAL markers for content
        // already inside a note, so Space keeps its plain typed-literal commit here.
        sessionCounterRef: ve,
        setSession: /* @__PURE__ */ n((V) => {
          ut.current = V;
        }, "setSession"),
        clearSessionIfCurrent: /* @__PURE__ */ n((V) => dn(ut, V), "clearSessionIfCurrent"),
        // Through the ref so the palette always runs the CURRENT handler — the callback is
        // captured once, at show time, while the session it drives is replaced on every reopen.
        runSessionKey: /* @__PURE__ */ n((V) => _t.current(V), "runSessionKey"),
        show: /* @__PURE__ */ n((V) => u.show(
          H.map(ku),
          k,
          Y,
          V
        ), "show"),
        restoreSelectionIfLost: /* @__PURE__ */ n(() => {
          var V, rt, it;
          if (!((V = g.current) != null && V.getSelection())) {
            const lt = ne.current;
            lt ? (rt = g.current) == null || rt.setSelection(lt) : (it = g.current) == null || it.selectNote(0);
          }
        }, "restoreSelectionIfLost"),
        focusEditor: /* @__PURE__ */ n(() => {
          var V;
          return (V = g.current) == null ? void 0 : V.focus();
        }, "focusEditor"),
        applyItem: /* @__PURE__ */ n((V) => {
          var rt;
          return (rt = g.current) == null ? void 0 : rt.applyMarkerMenuSelection(V, {
            trigger: "backslash",
            // ACTIVE palette: the trigger was claimed and never landed, so there is never a
            // literal prefix for the apply to clean up.
            literalPrefixLanded: !1
          });
        }, "applyItem"),
        onShowError: /* @__PURE__ */ n((V) => {
          (!Oc(V) || V.code !== Ic) && console.warn(
            `FootnoteEditor: the marker palette did not open: ${zc(V)}`
          );
        }, "onShowError")
      });
    },
    [u]
  ), $ = F(() => {
    var J;
    const D = (J = g.current) == null ? void 0 : J.getMarkerMenuContext();
    if (!D) return !1;
    const H = Zl(xt.styleInfo ?? Ql, D);
    return H.length === 0 ? !1 : (be(D, H, { passive: !D.hasTextSelection }), !0);
  }, [be, xt.styleInfo]), vt = F(
    (D) => {
      const H = ut.current;
      if (!H || !u) return;
      As(D, H, {
        // Overlay ops delegate to the host-supplied driver; the commit ops are EDITOR-side
        // applies this popover owns (it holds the editor ref). The table calls `dismiss()` right
        // after each, resolving the show promise `undefined` — which the openMarkerPalette
        // `.then` treats as a dismissal, so nothing double-applies.
        update: /* @__PURE__ */ n((k) => u.update(k), "update"),
        commit: /* @__PURE__ */ n(() => u.commit(), "commit"),
        dismiss: /* @__PURE__ */ n(() => u.dismiss(), "dismiss"),
        commitTyped: /* @__PURE__ */ n((k) => {
          var Y;
          return (Y = g.current) == null ? void 0 : Y.commitTypedMarker(k);
        }, "commitTyped"),
        commitTypedAndReopen: /* @__PURE__ */ n((k) => {
          var Y;
          (Y = g.current) == null || Y.commitTypedMarker(k, { trailingSpace: !1 }), $();
        }, "commitTypedAndReopen"),
        commitTypedCloser: /* @__PURE__ */ n((k) => {
          var Y;
          return (Y = g.current) == null ? void 0 : Y.commitTypedCloser(k);
        }, "commitTypedCloser"),
        commitItem: /* @__PURE__ */ n((k) => {
          var V;
          const Y = H.items.find((rt) => rt.marker === k);
          Y && ((V = g.current) == null || V.applyMarkerMenuSelection(Y, {
            trigger: "backslash",
            literalPrefixLanded: !1
          }));
        }, "commitItem")
      }) === "ended" && dn(ut, H.token);
    },
    [u, $]
  );
  X(() => {
    _t.current = vt;
  }, [vt]), X(() => {
    const D = /* @__PURE__ */ n((H) => {
      var Y, V;
      const J = (Y = m.current) == null ? void 0 : Y.querySelector(".editor-input");
      if (!J || H.target !== J) return;
      const k = (V = g.current) == null ? void 0 : V.getSelection();
      k && (ne.current = k);
    }, "handleFocusOut");
    return document.addEventListener("focusout", D), () => document.removeEventListener("focusout", D);
  }, []), X(() => {
    const D = /* @__PURE__ */ n(() => {
      G && st(!1);
    }, "clickListener");
    return window.addEventListener("click", D), () => {
      window.removeEventListener("click", D);
    };
  }, [G]), X(() => {
    var D;
    G && ((D = qt.current) == null || D.focus());
  }, [G]), X(() => {
    var J;
    const D = /* @__PURE__ */ n(() => {
      var k;
      return ((k = m.current) == null ? void 0 : k.querySelector(".editor-input")) ?? void 0;
    }, "getEditorInput");
    if (((J = xt.view) == null ? void 0 : J.markerMode) === "editable") {
      const k = /* @__PURE__ */ n((V) => {
        var lt, Nt, At, Lt;
        if (Vs(V)) return;
        const rt = D();
        if (!rt || document.activeElement !== rt) return;
        if (ut.current && u) {
          _t.current(V);
          return;
        }
        if (V.key === "Enter" && !yt()) {
          V.preventDefault(), V.stopPropagation(), (lt = g.current) == null || lt.selectNote(0), (Nt = g.current) == null || Nt.focus();
          return;
        }
        if (u && V.key === l) {
          if (!yt()) {
            V.preventDefault(), V.stopPropagation(), (At = g.current) == null || At.selectNote(0), (Lt = g.current) == null || Lt.focus();
            return;
          }
          $() && (V.preventDefault(), V.stopPropagation());
        }
      }, "handleKeyDown2"), Y = /* @__PURE__ */ n(() => {
        var rt, it;
        const V = D();
        !V || document.activeElement !== V || yt() || ((rt = g.current) == null || rt.selectNote(0), (it = g.current) == null || it.focus());
      }, "handlePaste");
      return document.addEventListener("keydown", k, { capture: !0 }), document.addEventListener("paste", Y, { capture: !0 }), () => {
        document.removeEventListener("keydown", k, { capture: !0 }), document.removeEventListener("paste", Y, { capture: !0 });
      };
    }
    const H = /* @__PURE__ */ n((k) => {
      const Y = D();
      !G && Y && document.activeElement === Y && k.key === l ? (k.preventDefault(), Pt()) : G && k.key === "Escape" && (k.preventDefault(), st(!1));
    }, "handleKeyDown");
    return document.addEventListener("keydown", H), () => {
      document.removeEventListener("keydown", H);
    };
  }, [
    G,
    Pt,
    l,
    (te = xt.view) == null ? void 0 : te.markerMode,
    xt.styleInfo,
    u,
    $,
    yt
  ]), X(() => {
    const D = /* @__PURE__ */ n(() => {
      var k, Y, V;
      const H = ((k = m.current) == null ? void 0 : k.querySelector(".editor-input")) ?? void 0;
      if (!H || document.activeElement !== H) return;
      const J = document.getSelection();
      J && !J.isCollapsed || yt() || ((Y = g.current) == null || Y.selectNote(0), (V = g.current) == null || V.focus());
    }, "snapStrayCaretIntoNote");
    return document.addEventListener("pointerup", D), document.addEventListener("selectionchange", D), () => {
      document.removeEventListener("pointerup", D), document.removeEventListener("selectionchange", D);
    };
  }, [yt]);
  const le = d["%footnoteEditor_copyButton_tooltip%"];
  return /* @__PURE__ */ p(gt, { children: [
    /* @__PURE__ */ p("div", { ref: y, className: "footnote-editor tw:grid tw:gap-[12px]", children: [
      /* @__PURE__ */ p("div", { className: "tw:flex", children: [
        /* @__PURE__ */ p("div", { className: "tw:flex tw:gap-4", children: [
          /* @__PURE__ */ a(
            fu,
            {
              isTypeSwitchable: O,
              noteType: P,
              handleNoteTypeChange: $e,
              localizedStrings: d
            }
          ),
          /* @__PURE__ */ a(
            pu,
            {
              callerType: f,
              customCaller: T,
              updateCaller: ce,
              localizedStrings: d
            }
          )
        ] }),
        /* @__PURE__ */ a("div", { className: "tw:flex tw:w-full tw:justify-end", children: /* @__PURE__ */ p(Ra, { children: [
          /* @__PURE__ */ a(
            du,
            {
              onUndoClick: /* @__PURE__ */ n(() => {
                var D;
                return (D = g.current) == null ? void 0 : D.undo();
              }, "onUndoClick"),
              onRedoClick: /* @__PURE__ */ n(() => {
                var D;
                return (D = g.current) == null ? void 0 : D.redo();
              }, "onRedoClick"),
              canUndo: !K,
              canRedo: C,
              localizedStrings: d
            }
          ),
          /* @__PURE__ */ a(
            is,
            {
              onCancelClick: o,
              onAcceptClick: Ct,
              canAccept: !K || _ !== f || f === "custom" && T !== S,
              localizedStrings: d,
              acceptLabel: d["%footnoteEditor_saveButton_tooltip%"]
            }
          )
        ] }) })
      ] }),
      /* @__PURE__ */ p(
        "div",
        {
          ref: m,
          className: "tw:relative tw:rounded-[6px] tw:border-2 tw:border-ring",
          children: [
            /* @__PURE__ */ a("div", { className: t, children: /* @__PURE__ */ a(
              wu,
              {
                editorRef: g,
                canUndo: !K,
                canRedo: C,
                children: /* @__PURE__ */ a(
                  td,
                  {
                    options: xt,
                    onStateChange: Kt,
                    onUsjChange: Ve,
                    defaultUsj: Cu,
                    onScrRefChange: /* @__PURE__ */ n(() => {
                    }, "onScrRefChange"),
                    scrRef: i,
                    ref: g
                  }
                )
              }
            ) }),
            /* @__PURE__ */ a("div", { className: "tw:absolute tw:bottom-0 tw:right-0", children: /* @__PURE__ */ a(It, { children: /* @__PURE__ */ p(Et, { children: [
              /* @__PURE__ */ a(Tt, { asChild: !0, children: /* @__PURE__ */ a(
                Z,
                {
                  "aria-label": le,
                  onClick: se,
                  className: "tw:h-6 tw:w-6",
                  variant: "ghost",
                  size: "icon",
                  children: /* @__PURE__ */ a(wi, {})
                }
              ) }),
              /* @__PURE__ */ a(St, { children: /* @__PURE__ */ a("p", { children: le }) })
            ] }) }) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ a(
      "div",
      {
        className: "tw:absolute",
        ref: v,
        style: { top: 0, left: 0, height: 0, width: 0 }
      }
    ),
    /* @__PURE__ */ p(er, { open: G, children: [
      /* @__PURE__ */ a(
        $s,
        {
          className: "tw:absolute",
          style: {
            top: Rt,
            left: nt,
            height: dt,
            width: 0,
            pointerEvents: "none"
          }
        }
      ),
      /* @__PURE__ */ a(
        rr,
        {
          className: "tw:w-[500px] tw:p-0",
          onClick: /* @__PURE__ */ n((D) => {
            D.preventDefault(), D.stopPropagation();
          }, "onClick"),
          children: /* @__PURE__ */ a(
            xu,
            {
              markerMenuItems: ft,
              localizedStrings: d,
              searchRef: qt
            }
          )
        }
      )
    ] })
  ] });
}
n(Dh, "FootnoteEditor");
const Mh = Object.freeze([
  ...mu,
  ...Object.entries(ca).map(([, t]) => t.description).filter((t) => !!t),
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
  ...lu,
  ...ns
]);
function Eu(t, e, r = !0, o = void 0) {
  if (!e || e.length === 0) return;
  const i = [], c = [];
  let s = [];
  return e.forEach((l) => {
    typeof l != "string" && l.marker === "fp" ? (s.length > 0 && c.push(s), s = [l]) : s.push(l);
  }), s.length > 0 && c.push(s), c.map((l, d) => {
    const w = d === c.length - 1;
    return (
      // A footnote's paragraphs have no stable id, and keying on their CONTENT is what produced
      // duplicate keys (two `\fp` paragraphs collide). This list is a read-only projection
      // re-rendered wholesale and never reordered, so the identity the rule protects cannot be
      // lost here. See the note above.
      // eslint-disable-next-line react/no-array-index-key
      /* @__PURE__ */ p("p", { children: [
        Zo(t, l, r, !0, i),
        w && o
      ] }, `para-${d}`)
    );
  });
}
n(Eu, "renderParagraphs");
function Zo(t, e, r = !0, o = !0, i = []) {
  if (!(!e || e.length === 0))
    return e.map((c, s) => {
      const l = `part-${s}`;
      if (typeof c == "string") {
        if (o) {
          const d = x(`usfm_${t}`);
          return /* @__PURE__ */ a("span", { className: d, children: c }, l);
        }
        return /* @__PURE__ */ p(
          "span",
          {
            className: "tw:inline-flex tw:items-center tw:gap-1 tw:underline tw:decoration-destructive",
            children: [
              /* @__PURE__ */ a(uo, { className: "tw:h-4 tw:w-4 tw:fill-destructive" }),
              /* @__PURE__ */ a("span", { children: c }),
              /* @__PURE__ */ a(uo, { className: "tw:h-4 tw:w-4 tw:fill-destructive" })
            ]
          },
          l
        );
      }
      return Tu(c, l, r, [
        ...i,
        t ?? "unknown"
      ]);
    });
}
n(Zo, "renderContent");
function Tu(t, e, r, o = []) {
  const { marker: i } = t;
  return /* @__PURE__ */ p("span", { children: [
    i ? r && /* @__PURE__ */ a("span", { className: "marker", children: `\\${i} ` }) : /* @__PURE__ */ a(
      uo,
      {
        className: "tw:text-error tw:mr-1 tw:inline-block tw:h-4 tw:w-4",
        "aria-label": "Missing marker"
      }
    ),
    Zo(i, t.content, r, !0, [
      ...o,
      i ?? "unknown"
    ])
  ] }, e);
}
n(Tu, "renderMarkerObject");
function Su({
  footnote: t,
  layout: e = "horizontal",
  formatCaller: r,
  showMarkers: o = !0
}) {
  const i = r ? r(t.caller) : t.caller, c = i !== t.caller;
  let s, l = t.content;
  Array.isArray(t.content) && t.content.length > 0 && typeof t.content[0] != "string" && (t.content[0].marker === "fr" || t.content[0].marker === "xo") && ([s, ...l] = t.content);
  const d = o ? /* @__PURE__ */ a("span", { className: "marker", children: `\\${t.marker}` }) : void 0, w = o ? /* @__PURE__ */ a("span", { className: "marker", children: ` \\${t.marker}*` }) : void 0, u = i && // USFM does not specify a marker for caller, so instead of a usfm_* class, we use a
  // specific class name in case styling is needed.
  /* @__PURE__ */ a("span", { className: x("note-caller tw:inline-block", { formatted: c }), children: i }), h = t.category && /* @__PURE__ */ p("span", { className: "note-category tw:inline-block", children: [
    o && /* @__PURE__ */ a("span", { className: "marker", children: "\\cat " }),
    t.category,
    o && /* @__PURE__ */ a("span", { className: "marker", children: "\\cat*" })
  ] }), g = s && /* @__PURE__ */ p(gt, { children: [
    Zo(t.marker, [s], o, !1),
    " "
  ] }), m = !!d, v = !!u, y = !!h, f = e === "horizontal" ? "horizontal" : "vertical", R = o ? "marker-visible" : "", _ = e === "horizontal" ? "tw:col-span-1" : "tw:col-span-2 tw:col-start-1 tw:row-start-2", E = x(f, R);
  return /* @__PURE__ */ p(gt, { children: [
    /* @__PURE__ */ p("div", { className: x("textual-note-header tw:col-span-1 tw:w-fit tw:text-nowrap", E), children: [
      d,
      m && (v || y) && " ",
      u,
      v && y && " ",
      h
    ] }),
    /* @__PURE__ */ a("div", { className: x("textual-note-header tw:col-span-1 tw:w-fit tw:text-nowrap", E), children: g }),
    /* @__PURE__ */ a(
      "div",
      {
        className: x(
          "textual-note-body tw:flex tw:flex-col tw:gap-1",
          _,
          E
        ),
        children: l && l.length > 0 && /* @__PURE__ */ a(gt, { children: Eu(t.marker, l, o, w) })
      }
    )
  ] });
}
n(Su, "FootnoteItem");
function Oh({
  className: t,
  classNameForItems: e,
  footnotes: r,
  layout: o = "horizontal",
  listId: i,
  selectedFootnote: c,
  selectionRequest: s,
  showMarkers: l = !0,
  suppressFormatting: d = !1,
  formatCaller: w,
  onFootnoteSelected: u
}) {
  const h = w ?? Pc(r, void 0), g = /* @__PURE__ */ n((T, A) => {
    u == null || u(T, A, i);
  }, "handleFootnoteClick"), m = c ? r.findIndex((T) => T === c) : -1, [v, y] = N(m), f = /* @__PURE__ */ n((T, A, S) => {
    if (r.length)
      switch (T.key) {
        case "Enter":
        case " ":
          T.preventDefault(), u == null || u(A, S, i);
          break;
      }
  }, "handleFootnoteKeyDown"), R = /* @__PURE__ */ n((T) => {
    if (r.length)
      switch (T.key) {
        case "ArrowDown":
          T.preventDefault(), y((A) => Math.min(A + 1, r.length - 1));
          break;
        case "ArrowUp":
          T.preventDefault(), y((A) => Math.max(A - 1, 0));
          break;
      }
  }, "handleListKeyDown"), _ = U([]);
  X(() => {
    var T;
    v >= 0 && v < _.current.length && ((T = _.current[v]) == null || T.focus());
  }, [v]);
  const E = c ? r.findIndex((T) => T === c) : -1;
  return X(() => {
    var T;
    E < 0 || E >= _.current.length || (T = _.current[E]) == null || T.scrollIntoView({ block: "nearest" });
  }, [E, s]), /* @__PURE__ */ a(
    "div",
    {
      role: "listbox",
      "aria-label": "Footnotes",
      tabIndex: v < 0 ? 0 : -1,
      className: x("tw:h-full tw:overflow-y-auto", t),
      onKeyDown: R,
      children: /* @__PURE__ */ a(
        "ul",
        {
          className: x(
            "tw:p-0.5 tw:pt-1",
            "tw:grid",
            o === "horizontal" ? "tw:grid-cols-[min-content_min-content_1fr]" : "tw:grid-cols-[min-content_1fr]",
            !d && "formatted-font"
          ),
          children: r.map((T, A) => {
            const S = T === c, j = `${i}-${A}`;
            return (
              // The key belongs on the outermost node returned from the map — the Fragment — not on
              // the `<li>` nested inside it, which leaves the Fragment itself unkeyed.
              /* @__PURE__ */ p(Jt.Fragment, { children: [
                /* @__PURE__ */ a(
                  "li",
                  {
                    ref: /* @__PURE__ */ n((P) => {
                      _.current[A] = P;
                    }, "ref"),
                    role: "option",
                    "aria-selected": S,
                    "data-marker": T.marker,
                    "data-state": S ? "selected" : void 0,
                    tabIndex: A === v ? 0 : -1,
                    className: x(
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
                    onClick: /* @__PURE__ */ n(() => g(T, A), "onClick"),
                    onKeyDown: /* @__PURE__ */ n((P) => f(P, T, A), "onKeyDown"),
                    children: /* @__PURE__ */ a(
                      Su,
                      {
                        footnote: T,
                        layout: o,
                        formatCaller: /* @__PURE__ */ n(() => h(T.caller, A), "formatCaller"),
                        showMarkers: l
                      }
                    )
                  }
                ),
                A < r.length - 1 && o === "vertical" && /* @__PURE__ */ a(Br, { tabIndex: -1, className: "tw:col-span-2" })
              ] }, j)
            );
          })
        }
      )
    }
  );
}
n(Oh, "FootnoteList");
function Ru(t) {
  const e = [];
  let r = 0;
  const o = /\\\\(.+?)\\\\/g;
  let i;
  for (; (i = o.exec(t)) !== null; )
    i.index > r && e.push(t.substring(r, i.index)), e.push(/* @__PURE__ */ a("strong", { children: i[1] }, i.index)), r = o.lastIndex;
  return r < t.length && e.push(t.substring(r)), e.length > 0 ? e : [t];
}
n(Ru, "formatTextWithBold");
function Du({
  occurrenceData: t,
  setScriptureReference: e,
  localizedStrings: r,
  classNameForText: o
}) {
  const i = r["%webView_inventory_occurrences_table_header_reference%"], c = r["%webView_inventory_occurrences_table_header_occurrence%"], s = L(() => {
    const l = [], d = /* @__PURE__ */ new Set();
    return t.forEach((w) => {
      const u = `${w.reference.book}:${w.reference.chapterNum}:${w.reference.verseNum}:${w.text}`;
      d.has(u) || (d.add(u), l.push(w));
    }), l;
  }, [t]);
  return /* @__PURE__ */ p(Io, { stickyHeader: !0, children: [
    /* @__PURE__ */ a(zo, { stickyHeader: !0, children: /* @__PURE__ */ p(Fe, { children: [
      /* @__PURE__ */ a(ma, { children: i }),
      /* @__PURE__ */ a(ma, { children: c })
    ] }) }),
    /* @__PURE__ */ a(Po, { children: s.length > 0 && s.map((l) => /* @__PURE__ */ p(
      Fe,
      {
        onClick: /* @__PURE__ */ n(() => {
          e(l.reference);
        }, "onClick"),
        children: [
          /* @__PURE__ */ a(fr, { children: Me(l.reference, "English") }),
          /* @__PURE__ */ a(fr, { className: o, children: Ru(l.text) })
        ]
      },
      `${l.reference.book} ${l.reference.chapterNum}:${l.reference.verseNum}-${l.text}`
    )) })
  ] });
}
n(Du, "OccurrencesTable");
function us({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    kn.Root,
    {
      "data-slot": "checkbox",
      className: x(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:peer tw:relative tw:flex tw:size-4 tw:shrink-0 tw:items-center tw:justify-center tw:rounded-[4px] tw:border tw:border-input tw:transition-colors tw:outline-none tw:group-has-disabled/field:opacity-50 tw:after:absolute tw:after:-inset-x-3 tw:after:-inset-y-2 tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:aria-invalid:aria-checked:border-primary tw:dark:bg-input/30 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40 tw:data-checked:border-primary tw:data-checked:bg-primary tw:data-checked:text-primary-foreground tw:dark:data-checked:bg-primary",
        t
      ),
      ...e,
      children: /* @__PURE__ */ a(
        kn.Indicator,
        {
          "data-slot": "checkbox-indicator",
          className: "tw:grid tw:place-content-center tw:text-current tw:transition-none tw:[&>svg]:size-3.5",
          children: /* @__PURE__ */ a(Ia, {})
        }
      )
    }
  );
}
n(us, "Checkbox");
const Mu = /* @__PURE__ */ n((t) => {
  if (t === "asc")
    return /* @__PURE__ */ a(vc, { className: "tw:h-4 tw:w-4" });
  if (t === "desc")
    return /* @__PURE__ */ a(bc, { className: "tw:h-4 tw:w-4" });
}, "getSortingIcon"), Aa = /* @__PURE__ */ n((t, e, r) => /* @__PURE__ */ a(It, { children: /* @__PURE__ */ p(Et, { children: [
  /* @__PURE__ */ p(
    Tt,
    {
      className: x("tw:flex tw:w-full tw:justify-start", r),
      variant: "ghost",
      onClick: /* @__PURE__ */ n(() => t.toggleSorting(void 0), "onClick"),
      children: [
        /* @__PURE__ */ a("span", { className: "tw:w-6 tw:max-w-fit tw:flex-1 tw:overflow-hidden tw:text-ellipsis", children: e }),
        Mu(t.getIsSorted())
      ]
    }
  ),
  /* @__PURE__ */ a(St, { side: "bottom", children: e })
] }) }), "getInventoryHeader"), Ih = /* @__PURE__ */ n((t) => ({
  accessorKey: "item",
  accessorFn: /* @__PURE__ */ n((e) => e.items[0], "accessorFn"),
  header: /* @__PURE__ */ n(({ column: e }) => Aa(e, t), "header")
}), "inventoryItemColumn"), Ou = /* @__PURE__ */ n((t, e) => ({
  accessorKey: `item${e}`,
  accessorFn: /* @__PURE__ */ n((r) => r.items[e], "accessorFn"),
  header: /* @__PURE__ */ n(({ column: r }) => Aa(r, t), "header")
}), "inventoryAdditionalItemColumn"), zh = /* @__PURE__ */ n((t) => ({
  accessorKey: "count",
  header: /* @__PURE__ */ n(({ column: e }) => Aa(e, t, "tw:justify-end"), "header"),
  cell: /* @__PURE__ */ n(({ row: e }) => /* @__PURE__ */ a("div", { className: "tw:flex tw:justify-end tw:tabular-nums", children: e.getValue("count") }), "cell")
}), "inventoryCountColumn"), oo = /* @__PURE__ */ n((t, e, r, o, i, c) => {
  let s = [...r];
  t.forEach((d) => {
    e === "approved" ? s.includes(d) || s.push(d) : s = s.filter((w) => w !== d);
  }), o(s);
  let l = [...i];
  t.forEach((d) => {
    e === "unapproved" ? l.includes(d) || l.push(d) : l = l.filter((w) => w !== d);
  }), c(l);
}, "statusChangeHandler"), Ph = /* @__PURE__ */ n((t, e, r, o, i) => ({
  accessorKey: "status",
  header: /* @__PURE__ */ n(({ column: c }) => Aa(c, t, "tw:justify-center"), "header"),
  cell: /* @__PURE__ */ n(({ row: c }) => {
    const s = c.getValue("status"), l = c.getValue("item");
    return (
      // Center the status buttons in the cell to match the centered status column header (the
      // ToggleGroup would otherwise sit left-aligned).
      /* @__PURE__ */ a("div", { className: "tw:flex tw:justify-center", children: /* @__PURE__ */ p(ei, { value: s, variant: "outline", type: "single", className: "tw:gap-0", children: [
        /* @__PURE__ */ a(
          ia,
          {
            onClick: /* @__PURE__ */ n((d) => {
              d.stopPropagation(), oo(
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
            children: /* @__PURE__ */ a(gc, {})
          }
        ),
        /* @__PURE__ */ a(
          ia,
          {
            onClick: /* @__PURE__ */ n((d) => {
              d.stopPropagation(), oo(
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
            children: /* @__PURE__ */ a(fc, {})
          }
        ),
        /* @__PURE__ */ a(
          ia,
          {
            onClick: /* @__PURE__ */ n((d) => {
              d.stopPropagation(), oo(
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
            children: /* @__PURE__ */ a(mc, {})
          }
        )
      ] }) })
    );
  }, "cell")
}), "inventoryStatusColumn"), Ah = /* @__PURE__ */ n((t) => t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g), "getLinesFromUSFM"), $h = /* @__PURE__ */ n((t) => {
  const e = /^\\[vc]\s+(\d+)/, r = t.match(e);
  if (r)
    return +r[1];
}, "getNumberFromUSFM"), Vh = /* @__PURE__ */ n((t) => {
  const e = t.match(/^\\id\s+([A-Za-z]+)/);
  return e ? e[1] : "";
}, "getBookIdFromUSFM"), Iu = /* @__PURE__ */ n((t, e, r) => r.includes(t) ? "unapproved" : e.includes(t) ? "approved" : "unknown", "getStatusForItem"), Lh = Object.freeze([
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
]), zu = /* @__PURE__ */ n((t, e, r) => {
  let o = t;
  return e !== "all" && (o = o.filter(
    (i) => e === "approved" && i.status === "approved" || e === "unapproved" && i.status === "unapproved" || e === "unknown" && i.status === "unknown"
  )), r !== "" && (o = o.filter((i) => i.items[0].includes(r))), o;
}, "filterItemData"), Pu = /* @__PURE__ */ n((t, e, r) => t.map((o) => {
  const i = gn(o.key) ? o.key : o.key[0];
  return {
    items: gn(o.key) ? [o.key] : o.key,
    count: o.count,
    status: o.status || Iu(i, e, r),
    occurrences: o.occurrences || []
  };
}), "processSummaryItems"), ye = /* @__PURE__ */ n((t, e) => t[e] ?? e, "localizeString$2");
function Bh({
  inventoryItems: t,
  setVerseRef: e,
  localizedStrings: r,
  additionalItemsLabels: o,
  approvedItems: i,
  unapprovedItems: c,
  scope: s,
  onScopeChange: l,
  columns: d,
  id: w,
  areInventoryItemsLoading: u = !1,
  classNameForVerseText: h,
  onItemSelected: g
}) {
  const m = ye(r, "%webView_inventory_all%"), v = ye(r, "%webView_inventory_approved%"), y = ye(r, "%webView_inventory_unapproved%"), f = ye(r, "%webView_inventory_unknown%"), R = ye(r, "%webView_inventory_scope_currentBook%"), _ = ye(r, "%webView_inventory_scope_chapter%"), E = ye(r, "%webView_inventory_scope_verse%"), T = ye(r, "%webView_inventory_filter_text%"), A = ye(
    r,
    "%webView_inventory_show_additional_items%"
  ), S = ye(r, "%webView_inventory_no_results%"), [j, P] = N(!1), [M, O] = N("all"), [W, K] = N(""), [et, C] = N([]), at = L(() => {
    const Q = t ?? [];
    return Q.length === 0 ? [] : Pu(Q, i, c);
  }, [t, i, c]), I = L(() => {
    if (j) return at;
    const Q = [];
    return at.forEach((dt) => {
      const bt = dt.items[0], ht = Q.find(
        (zt) => zt.items[0] === bt
      );
      ht ? (ht.count += dt.count, ht.occurrences = ht.occurrences.concat(dt.occurrences)) : Q.push({
        items: [bt],
        count: dt.count,
        occurrences: dt.occurrences,
        status: dt.status
      });
    }), Q;
  }, [j, at]), z = L(() => I.length === 0 ? [] : zu(I, M, W), [I, M, W]), G = L(() => {
    var bt, ht;
    if (!j) return d;
    const Q = (bt = o == null ? void 0 : o.tableHeaders) == null ? void 0 : bt.length;
    if (!Q) return d;
    const dt = [];
    for (let zt = 0; zt < Q; zt++)
      dt.push(
        Ou(
          ((ht = o == null ? void 0 : o.tableHeaders) == null ? void 0 : ht[zt]) || "Additional Item",
          zt + 1
        )
      );
    return [...dt, ...d];
  }, [o == null ? void 0 : o.tableHeaders, d, j]);
  X(() => {
    z.length === 0 ? C([]) : z.length === 1 && C(z[0].items);
  }, [z]);
  const st = /* @__PURE__ */ n((Q, dt) => {
    dt.setRowSelection(() => {
      const ht = {};
      return ht[Q.index] = !0, ht;
    });
    const bt = Q.original.items;
    C(bt), g && bt.length > 0 && g(bt[0]);
  }, "rowClickHandler"), nt = /* @__PURE__ */ n((Q) => {
    if (Q === "book" || Q === "chapter" || Q === "verse")
      l(Q);
    else
      throw new Error(`Invalid scope value: ${Q}`);
  }, "handleScopeChange"), wt = /* @__PURE__ */ n((Q) => {
    if (Q === "all" || Q === "approved" || Q === "unapproved" || Q === "unknown")
      O(Q);
    else
      throw new Error(`Invalid status filter value: ${Q}`);
  }, "handleStatusFilterChange"), Rt = L(() => {
    if (I.length === 0 || et.length === 0) return [];
    const Q = I.filter((dt) => Ac(
      j ? dt.items : [dt.items[0]],
      et
    ));
    if (Q.length > 1) throw new Error("Selected item is not unique");
    return Q.length === 0 ? [] : Q[0].occurrences;
  }, [et, j, I]);
  return /* @__PURE__ */ a("div", { id: w, className: "pr-twp tw:h-full tw:overflow-auto", children: /* @__PURE__ */ p("div", { className: "tw:flex tw:h-full tw:w-full tw:min-w-min tw:flex-col", children: [
    /* @__PURE__ */ p("div", { className: "tw:flex tw:items-stretch", style: { contain: "inline-size" }, children: [
      /* @__PURE__ */ p(
        br,
        {
          onValueChange: /* @__PURE__ */ n((Q) => wt(Q), "onValueChange"),
          defaultValue: M,
          children: [
            /* @__PURE__ */ a(yr, { className: "tw:m-1 tw:w-auto tw:flex-1", children: /* @__PURE__ */ a(xr, { placeholder: "Select filter" }) }),
            /* @__PURE__ */ p(kr, { children: [
              /* @__PURE__ */ a(fe, { value: "all", children: m }),
              /* @__PURE__ */ a(fe, { value: "approved", children: v }),
              /* @__PURE__ */ a(fe, { value: "unapproved", children: y }),
              /* @__PURE__ */ a(fe, { value: "unknown", children: f })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ p(br, { onValueChange: /* @__PURE__ */ n((Q) => nt(Q), "onValueChange"), defaultValue: s, children: [
        /* @__PURE__ */ a(yr, { className: "tw:m-1 tw:w-auto tw:flex-1", children: /* @__PURE__ */ a(xr, { placeholder: "Select scope" }) }),
        /* @__PURE__ */ p(kr, { children: [
          /* @__PURE__ */ a(fe, { value: "book", children: R }),
          /* @__PURE__ */ a(fe, { value: "chapter", children: _ }),
          /* @__PURE__ */ a(fe, { value: "verse", children: E })
        ] })
      ] }),
      /* @__PURE__ */ a(
        Ma,
        {
          className: "tw:m-1 tw:flex-1 tw:rounded-md tw:border",
          placeholder: T,
          value: W,
          onChange: /* @__PURE__ */ n((Q) => {
            K(Q.target.value);
          }, "onChange")
        }
      ),
      o && /* @__PURE__ */ a(It, { children: /* @__PURE__ */ p(Et, { children: [
        /* @__PURE__ */ a(Tt, { asChild: !0, children: /* @__PURE__ */ p("div", { className: "tw:m-1 tw:flex tw:w-fit tw:min-w-[26px] tw:items-center tw:rounded-md tw:border", children: [
          /* @__PURE__ */ a(
            us,
            {
              className: "tw:m-1 tw:shrink-0",
              checked: j,
              onCheckedChange: /* @__PURE__ */ n((Q) => {
                P(Q);
              }, "onCheckedChange")
            }
          ),
          /* @__PURE__ */ a(Ot, { className: "tw:m-1 tw:truncate", children: (o == null ? void 0 : o.checkboxText) ?? A })
        ] }) }),
        /* @__PURE__ */ a(St, { children: (o == null ? void 0 : o.checkboxText) ?? A })
      ] }) })
    ] }),
    /* @__PURE__ */ a("div", { className: "tw:m-1 tw:flex-1 tw:overflow-auto tw:rounded-md tw:border", children: /* @__PURE__ */ a(
      ou,
      {
        columns: G,
        data: z,
        onRowClickHandler: st,
        stickyHeader: !0,
        isLoading: u,
        noResultsMessage: S
      }
    ) }),
    Rt.length > 0 && /* @__PURE__ */ a("div", { className: "tw:m-1 tw:flex-1 tw:overflow-auto tw:rounded-md tw:border", children: /* @__PURE__ */ a(
      Du,
      {
        classNameForText: h,
        occurrenceData: Rt,
        setScriptureReference: e,
        localizedStrings: r
      }
    ) })
  ] }) });
}
n(Bh, "Inventory");
const Au = "16rem", $u = "3rem", ps = Jt.createContext(void 0);
function $a() {
  const t = Jt.useContext(ps);
  if (!t)
    throw new Error("useSidebar must be used within a SidebarProvider.");
  return t;
}
n($a, "useSidebar");
function Vu({
  defaultOpen: t = !0,
  open: e,
  onOpenChange: r,
  className: o,
  style: i,
  children: c,
  // CUSTOM: Added 'side' prop at provider level so direction-aware side can be propagated via context
  side: s = "primary",
  ...l
}) {
  const [d, w] = Jt.useState(t), u = e ?? d, h = Jt.useCallback(
    (E) => {
      const T = typeof E == "function" ? E(u) : E;
      r ? r(T) : w(T);
    },
    [r, u]
  ), g = Jt.useCallback(() => h((E) => !E), [h]), m = u ? "expanded" : "collapsed", f = Ee() === "ltr" ? s : s === "primary" ? "secondary" : "primary", R = Jt.useMemo(
    () => ({
      state: m,
      open: u,
      setOpen: h,
      toggleSidebar: g,
      // CUSTOM: Passes direction-aware side into context so SidebarTrigger icon and Sidebar
      // positioning both respond correctly in RTL layouts
      side: f
    }),
    [m, u, h, g, f]
  ), _ = {
    "--sidebar-width": Au,
    "--sidebar-width-icon": $u,
    ...i
  };
  return /* @__PURE__ */ a(ps.Provider, { value: R, children: /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "sidebar-wrapper",
      style: _,
      className: x(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        // CUSTOM: Removed tw:min-h-svh - not appropriate in Platform.Bible's windowed layout
        "pr-twp tw:group/sidebar-wrapper tw:flex tw:w-full tw:has-data-[variant=inset]:bg-sidebar",
        o
      ),
      ...l,
      children: c
    }
  ) });
}
n(Vu, "SidebarProvider");
function Lu({
  // CUSTOM: Removed 'side' prop from Sidebar - it is now read from context (moved to SidebarProvider)
  variant: t = "sidebar",
  collapsible: e = "offcanvas",
  className: r,
  children: o,
  ...i
}) {
  const c = $a();
  return e === "none" ? /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "sidebar",
      className: x(
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
      "data-state": c.state,
      "data-collapsible": c.state === "collapsed" ? e : "",
      "data-variant": t,
      "data-side": c.side,
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
            "data-side": c.side,
            className: x(
              // CUSTOM: Switched tw:fixed to tw:absolute to scope the sidebar inside its container
              // rather than the viewport, matching Platform.Bible's layout model
              "tw:absolute tw:inset-y-0 tw:z-10 tw:hidden tw:h-svh tw:w-(--sidebar-width) tw:transition-[left,right,width] tw:duration-200 tw:ease-linear tw:md:flex",
              // CUSTOM: Use positional side values (primary/secondary) for left/right offset selectors
              c.side === "primary" ? "tw:left-0 tw:group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]" : "tw:right-0 tw:group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
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
n(Lu, "Sidebar");
function jh({ className: t, onClick: e, ...r }) {
  const { toggleSidebar: o, side: i } = $a();
  return /* @__PURE__ */ p(
    Z,
    {
      "data-sidebar": "trigger",
      "data-slot": "sidebar-trigger",
      variant: "ghost",
      size: "icon-sm",
      className: x(t),
      onClick: /* @__PURE__ */ n((c) => {
        e == null || e(c), o();
      }, "onClick"),
      ...r,
      children: [
        i === "primary" ? /* @__PURE__ */ a(Kc, {}) : /* @__PURE__ */ a(Hc, {}),
        /* @__PURE__ */ a("span", { className: "tw:sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
}
n(jh, "SidebarTrigger");
function Fh({ className: t, ...e }) {
  const { toggleSidebar: r } = $a();
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
n(Fh, "SidebarRail");
function Bu({ className: t, ...e }) {
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
n(Bu, "SidebarInset");
function Uh({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    Ma,
    {
      "data-slot": "sidebar-input",
      "data-sidebar": "input",
      className: x("tw:h-8 tw:w-full tw:bg-background tw:shadow-none", t),
      ...e
    }
  );
}
n(Uh, "SidebarInput");
function Kh({ className: t, ...e }) {
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
n(Kh, "SidebarHeader");
function Hh({ className: t, ...e }) {
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
n(Hh, "SidebarFooter");
function qh({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    Br,
    {
      "data-slot": "sidebar-separator",
      "data-sidebar": "separator",
      className: x("tw:mx-2 tw:w-auto tw:bg-sidebar-border", t),
      ...e
    }
  );
}
n(qh, "SidebarSeparator");
function ju({ className: t, ...e }) {
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
n(ju, "SidebarContent");
function Yn({ className: t, ...e }) {
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
n(Yn, "SidebarGroup");
function Wn({
  className: t,
  asChild: e = !1,
  ...r
}) {
  const o = e ? Gr.Root : "div";
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
n(Wn, "SidebarGroupLabel");
function Gh({
  className: t,
  asChild: e = !1,
  ...r
}) {
  const o = e ? Gr.Root : "button";
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
n(Gh, "SidebarGroupAction");
function Xn({ className: t, ...e }) {
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
n(Xn, "SidebarGroupContent");
function Fu({ className: t, ...e }) {
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
n(Fu, "SidebarMenu");
function Uu({ className: t, ...e }) {
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
n(Uu, "SidebarMenuItem");
const Ku = zi(
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
function Hu({
  asChild: t = !1,
  isActive: e = !1,
  variant: r = "default",
  size: o = "default",
  tooltip: i,
  className: c,
  ...s
}) {
  const l = t ? Gr.Root : "button", { state: d } = $a(), w = /* @__PURE__ */ a(
    l,
    {
      "data-slot": "sidebar-menu-button",
      "data-sidebar": "menu-button",
      "data-size": o,
      "data-active": e,
      className: x(Ku({ variant: r, size: o }), c),
      ...s
    }
  );
  return i ? /* @__PURE__ */ p(Et, { children: [
    /* @__PURE__ */ a(Tt, { asChild: !0, children: w }),
    /* @__PURE__ */ a(
      St,
      {
        side: "right",
        align: "center",
        hidden: d !== "collapsed",
        ...typeof i == "string" ? { children: i } : i
      }
    )
  ] }) : w;
}
n(Hu, "SidebarMenuButton");
function Yh({
  className: t,
  asChild: e = !1,
  showOnHover: r = !1,
  ...o
}) {
  const i = e ? Gr.Root : "button";
  return /* @__PURE__ */ a(
    i,
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
n(Yh, "SidebarMenuAction");
function Wh({ className: t, ...e }) {
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
n(Wh, "SidebarMenuBadge");
function Xh({
  className: t,
  showIcon: e = !1,
  ...r
}) {
  const [o] = Jt.useState(() => `${Math.floor(Math.random() * 40) + 50}%`), i = { "--skeleton-width": o };
  return /* @__PURE__ */ p(
    "div",
    {
      "data-slot": "sidebar-menu-skeleton",
      "data-sidebar": "menu-skeleton",
      className: x("tw:flex tw:h-8 tw:items-center tw:gap-2 tw:rounded-md tw:px-2", t),
      ...r,
      children: [
        e && /* @__PURE__ */ a(gr, { className: "tw:size-4 tw:rounded-md", "data-sidebar": "menu-skeleton-icon" }),
        /* @__PURE__ */ a(
          gr,
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
n(Xh, "SidebarMenuSkeleton");
function Jh({ className: t, ...e }) {
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
n(Jh, "SidebarMenuSub");
function Zh({ className: t, ...e }) {
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
n(Zh, "SidebarMenuSubItem");
function Qh({
  asChild: t = !1,
  size: e = "md",
  isActive: r = !1,
  className: o,
  ...i
}) {
  const c = t ? Gr.Root : "a";
  return /* @__PURE__ */ a(
    c,
    {
      "data-slot": "sidebar-menu-sub-button",
      "data-sidebar": "menu-sub-button",
      "data-size": e,
      "data-active": r,
      className: x(
        "tw:flex tw:h-7 tw:min-w-0 tw:-translate-x-px tw:rtl:translate-x-px tw:items-center tw:gap-2 tw:overflow-hidden tw:rounded-md tw:px-2 tw:text-sidebar-foreground tw:ring-sidebar-ring tw:outline-hidden tw:group-data-[collapsible=icon]:hidden tw:hover:bg-sidebar-accent tw:hover:text-sidebar-accent-foreground tw:focus-visible:ring-2 tw:active:bg-sidebar-accent tw:active:text-sidebar-accent-foreground tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:aria-disabled:pointer-events-none tw:aria-disabled:opacity-50 tw:data-[size=md]:text-sm tw:data-[size=sm]:text-xs tw:data-active:bg-sidebar-accent tw:data-active:text-sidebar-accent-foreground tw:[&>span:last-child]:truncate tw:[&>svg]:size-4 tw:[&>svg]:shrink-0 tw:[&>svg]:text-sidebar-accent-foreground",
        o
      ),
      ...i
    }
  );
}
n(Qh, "SidebarMenuSubButton");
function qu({
  id: t,
  extensionLabels: e,
  projectInfo: r,
  handleSelectSidebarItem: o,
  selectedSidebarItem: i,
  extensionsSidebarGroupLabel: c,
  projectsSidebarGroupLabel: s,
  buttonPlaceholderText: l,
  searchPlaceholderText: d,
  noResultsText: w,
  className: u
}) {
  const h = F(
    (f, R) => {
      o(f, R);
    },
    [o]
  ), g = F(
    (f) => {
      const R = r.find((_) => _.projectId === f);
      return R ? R.projectName : f;
    },
    [r]
  ), m = L(
    () => r.map((f) => ({
      id: f.projectId,
      shortName: f.projectName,
      fullName: f.projectName
    })),
    [r]
  ), v = L(() => {
    const f = {
      buttonPlaceholder: l,
      ariaLabel: s
    };
    return d && (f.searchPlaceholder = d), w && (f.commandEmptyMessage = w), f;
  }, [l, s, d, w]), y = F(
    (f) => !i.projectId && f === i.label,
    [i]
  );
  return /* @__PURE__ */ a(
    Lu,
    {
      id: t,
      collapsible: "none",
      variant: "inset",
      className: x("tw:w-96 tw:gap-2 tw:overflow-y-auto", u),
      children: /* @__PURE__ */ p(ju, { children: [
        /* @__PURE__ */ p(Yn, { children: [
          /* @__PURE__ */ a(Wn, { className: "tw:text-sm", children: c }),
          /* @__PURE__ */ a(Xn, { children: /* @__PURE__ */ a(Fu, { children: Object.entries(e).map(([f, R]) => /* @__PURE__ */ a(Uu, { children: /* @__PURE__ */ a(
            Hu,
            {
              onClick: /* @__PURE__ */ n(() => h(f), "onClick"),
              isActive: y(f),
              children: /* @__PURE__ */ a("span", { className: "tw:pl-3", children: R })
            }
          ) }, f)) }) })
        ] }),
        /* @__PURE__ */ p(Yn, { children: [
          /* @__PURE__ */ a(Wn, { className: "tw:text-sm", children: s }),
          /* @__PURE__ */ a(Xn, { className: "tw:pl-3", children: /* @__PURE__ */ p(
            "div",
            {
              className: x(
                "tw:flex tw:w-full tw:items-center tw:gap-2 tw:rounded-md tw:px-2 tw:py-1",
                {
                  "tw:bg-sidebar-accent tw:text-sidebar-accent-foreground": i == null ? void 0 : i.projectId
                }
              ),
              children: [
                /* @__PURE__ */ a(xc, { className: "tw:h-4 tw:w-4 tw:shrink-0" }),
                /* @__PURE__ */ a(
                  Ls,
                  {
                    mode: "project",
                    projects: m,
                    openTabs: [],
                    selection: { projectId: (i == null ? void 0 : i.projectId) ?? "" },
                    onChangeSelection: /* @__PURE__ */ n(({ projectId: f }) => {
                      if (!f) return;
                      const R = g(f);
                      h(R, f);
                    }, "onChangeSelection"),
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
n(qu, "SettingsSidebar");
function tg({
  id: t,
  children: e,
  searchValue: r,
  onSearch: o,
  className: i,
  // Everything else on this type comes from `SettingsSidebarProps`, so forward it wholesale: a
  // prop added to the sidebar reaches it without a matching edit here. `id` is destructured out
  // because it belongs to the SidebarProvider below, not to the sidebar.
  ...c
}) {
  return /* @__PURE__ */ p("div", { className: "tw:box-border tw:flex tw:h-full tw:flex-col", children: [
    /* @__PURE__ */ a("div", { className: "tw:box-border tw:flex tw:items-center tw:justify-center tw:py-4", children: /* @__PURE__ */ a(
      ni,
      {
        className: "tw:w-9/12",
        value: r,
        onSearch: o,
        placeholder: "Search app settings, extension settings, and project settings"
      }
    ) }),
    /* @__PURE__ */ p(
      Vu,
      {
        id: t,
        className: "tw:h-full tw:flex-1 tw:gap-4 tw:overflow-auto tw:border-t",
        children: [
          /* @__PURE__ */ a(
            qu,
            {
              className: x("tw:w-1/2 tw:min-w-[140px] tw:max-w-[220px] tw:border-e", i),
              ...c
            }
          ),
          /* @__PURE__ */ a(Bu, { className: "tw:min-w-[215px]", children: e })
        ]
      }
    )
  ] });
}
n(tg, "SettingsSidebarContentSearch");
const Le = "scrBook", Gu = "scrRef", Ze = "source", Yu = "details", Wu = "Scripture Reference", Xu = "Scripture Book", hs = "Type", Ju = "Details";
function Zu(t, e) {
  const r = e ?? !1;
  return [
    {
      accessorFn: /* @__PURE__ */ n((o) => `${o.start.book} ${o.start.chapterNum}:${o.start.verseNum}`, "accessorFn"),
      id: Le,
      header: (t == null ? void 0 : t.scriptureReferenceColumnName) ?? Wu,
      cell: /* @__PURE__ */ n((o) => {
        const i = o.row.original;
        return o.row.getIsGrouped() ? Ft.bookIdToEnglishName(i.start.book) : o.row.groupingColumnId === Le ? Me(i.start) : void 0;
      }, "cell"),
      getGroupingValue: /* @__PURE__ */ n((o) => Ft.bookIdToNumber(o.start.book), "getGroupingValue"),
      sortingFn: /* @__PURE__ */ n((o, i) => va(o.original.start, i.original.start), "sortingFn"),
      enableGrouping: !0
    },
    {
      accessorFn: /* @__PURE__ */ n((o) => Me(o.start), "accessorFn"),
      id: Gu,
      header: void 0,
      cell: /* @__PURE__ */ n((o) => {
        const i = o.row.original;
        return o.row.getIsGrouped() ? void 0 : Me(i.start);
      }, "cell"),
      sortingFn: /* @__PURE__ */ n((o, i) => va(o.original.start, i.original.start), "sortingFn"),
      enableGrouping: !1
    },
    {
      accessorFn: /* @__PURE__ */ n((o) => o.source.displayName, "accessorFn"),
      id: Ze,
      header: r ? (t == null ? void 0 : t.typeColumnName) ?? hs : void 0,
      cell: /* @__PURE__ */ n((o) => r || o.row.getIsGrouped() ? o.getValue() : void 0, "cell"),
      getGroupingValue: /* @__PURE__ */ n((o) => o.source.id, "getGroupingValue"),
      sortingFn: /* @__PURE__ */ n((o, i) => o.original.source.displayName.localeCompare(i.original.source.displayName), "sortingFn"),
      enableGrouping: !0
    },
    {
      accessorFn: /* @__PURE__ */ n((o) => o.detail, "accessorFn"),
      id: Yu,
      header: (t == null ? void 0 : t.detailsColumnName) ?? Ju,
      cell: /* @__PURE__ */ n((o) => o.getValue(), "cell"),
      enableGrouping: !1
    }
  ];
}
n(Zu, "getColumns");
const Qu = /* @__PURE__ */ n((t) => {
  if (!("offset" in t.start))
    throw new Error("No offset available in range start");
  if (t.end && !("offset" in t.end))
    throw new Error("No offset available in range end");
  const { offset: e } = t.start;
  let r = 0;
  return t.end && ({ offset: r } = t.end), !t.end || va(t.start, t.end) === 0 ? `${qa(t.start)}+${e}` : `${qa(t.start)}+${e}-${qa(t.end)}+${r}`;
}, "toRefOrRange"), Jn = /* @__PURE__ */ n((t) => `${Qu({ start: t.start, end: t.end })} ${t.source.displayName} ${t.detail}`, "getRowKey");
function eg({
  sources: t,
  showColumnHeaders: e = !1,
  showSourceColumn: r = !1,
  scriptureReferenceColumnName: o,
  scriptureBookGroupName: i,
  typeColumnName: c,
  detailsColumnName: s,
  onRowSelected: l,
  id: d
}) {
  const [w, u] = N([]), [h, g] = N([{ id: Le, desc: !1 }]), [m, v] = N({}), y = L(
    () => t.flatMap((M) => M.data.map((O) => ({
      ...O,
      source: M.source
    }))),
    [t]
  ), f = L(
    () => Zu(
      {
        scriptureReferenceColumnName: o,
        typeColumnName: c,
        detailsColumnName: s
      },
      r
    ),
    [o, c, s, r]
  );
  X(() => {
    w.includes(Ze) ? g([
      { id: Ze, desc: !1 },
      { id: Le, desc: !1 }
    ]) : g([{ id: Le, desc: !1 }]);
  }, [w]);
  const R = Mi({
    data: y,
    columns: f,
    state: {
      grouping: w,
      sorting: h,
      rowSelection: m
    },
    onGroupingChange: u,
    onSortingChange: g,
    onRowSelectionChange: v,
    getExpandedRowModel: Wl(),
    getGroupedRowModel: Yl(),
    getCoreRowModel: Ii(),
    getSortedRowModel: Oi(),
    getRowId: Jn,
    autoResetExpanded: !1,
    enableMultiRowSelection: !1,
    enableSubRowSelection: !1
  });
  X(() => {
    if (l) {
      const M = R.getSelectedRowModel().rowsById, O = Object.keys(M);
      if (O.length === 1) {
        const W = y.find((K) => Jn(K) === O[0]) || void 0;
        W && l(W);
      }
    }
  }, [m, y, l, R]);
  const _ = i ?? Xu, E = c ?? hs, T = [
    { label: "No Grouping", value: [] },
    { label: `Group by ${_}`, value: [Le] },
    { label: `Group by ${E}`, value: [Ze] },
    {
      label: `Group by ${_} and ${E}`,
      value: [Le, Ze]
    },
    {
      label: `Group by ${E} and ${_}`,
      value: [Ze, Le]
    }
  ], A = /* @__PURE__ */ n((M) => {
    u(JSON.parse(M));
  }, "handleSelectChange"), S = /* @__PURE__ */ n((M, O) => {
    !M.getIsGrouped() && !M.getIsSelected() && M.getToggleSelectedHandler()(O);
  }, "handleRowClick"), j = /* @__PURE__ */ n((M, O) => M.getIsGrouped() ? "" : x("banded-row", O % 2 === 0 ? "even" : "odd"), "getEvenOrOddBandingStyle"), P = /* @__PURE__ */ n((M, O, W) => {
    if (!((M == null ? void 0 : M.length) === 0 || O.depth < W.column.getGroupedIndex())) {
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
  }, "getIndent");
  return /* @__PURE__ */ p("div", { id: d, className: "pr-twp tw:flex tw:h-full tw:w-full tw:flex-col", children: [
    !e && /* @__PURE__ */ p(
      br,
      {
        value: JSON.stringify(w),
        onValueChange: /* @__PURE__ */ n((M) => {
          A(M);
        }, "onValueChange"),
        children: [
          /* @__PURE__ */ a(yr, { className: "tw:mb-1 tw:mt-2", children: /* @__PURE__ */ a(xr, {}) }),
          /* @__PURE__ */ a(kr, { position: "item-aligned", children: /* @__PURE__ */ a(tu, { children: T.map((M) => /* @__PURE__ */ a(fe, { value: JSON.stringify(M.value), children: M.label }, M.label)) }) })
        ]
      }
    ),
    /* @__PURE__ */ p(Io, { className: "tw:relative tw:flex tw:flex-col tw:overflow-y-auto tw:p-0", children: [
      e && /* @__PURE__ */ a(zo, { children: R.getHeaderGroups().map((M) => /* @__PURE__ */ a(Fe, { children: M.headers.filter((O) => O.column.columnDef.header).map((O) => (
        /* For sticky column headers to work, we probably need to change the default definition of the shadcn Table component. See https://github.com/shadcn-ui/ui/issues/1151 */
        /* @__PURE__ */ a(ma, { colSpan: O.colSpan, className: "tw:sticky top-0", children: O.isPlaceholder ? void 0 : /* @__PURE__ */ p("div", { children: [
          O.column.getCanGroup() ? /* @__PURE__ */ a(
            Z,
            {
              variant: "ghost",
              title: `Toggle grouping by ${O.column.columnDef.header}`,
              onClick: O.column.getToggleGroupingHandler(),
              type: "button",
              children: O.column.getIsGrouped() ? "🛑" : "👊 "
            }
          ) : void 0,
          " ",
          Ar(O.column.columnDef.header, O.getContext())
        ] }) }, O.id)
      )) }, M.id)) }),
      /* @__PURE__ */ a(Po, { children: R.getRowModel().rows.map((M, O) => {
        const W = Ee();
        return /* @__PURE__ */ a(
          Fe,
          {
            "data-state": M.getIsSelected() ? "selected" : "",
            className: x(j(M, O)),
            onClick: /* @__PURE__ */ n((K) => S(M, K), "onClick"),
            children: M.getVisibleCells().map((K) => {
              if (!(K.getIsPlaceholder() || K.column.columnDef.enableGrouping && !K.getIsGrouped() && (K.column.columnDef.id !== Ze || !r)))
                return /* @__PURE__ */ a(
                  fr,
                  {
                    className: x(
                      K.column.columnDef.id,
                      "tw:p-[1px]",
                      P(w, M, K)
                    ),
                    children: K.getIsGrouped() ? /* @__PURE__ */ p(
                      Z,
                      {
                        variant: "link",
                        onClick: M.getToggleExpandedHandler(),
                        type: "button",
                        children: [
                          M.getIsExpanded() && /* @__PURE__ */ a(tr, {}),
                          !M.getIsExpanded() && (W === "ltr" ? /* @__PURE__ */ a(yc, {}) : /* @__PURE__ */ a(kc, {})),
                          " ",
                          Ar(K.column.columnDef.cell, K.getContext()),
                          " (",
                          M.subRows.length,
                          ")"
                        ]
                      }
                    ) : Ar(K.column.columnDef.cell, K.getContext())
                  },
                  K.id
                );
            })
          },
          M.id
        );
      }) })
    ] })
  ] });
}
n(eg, "ScriptureResultsViewer");
function tp({
  availableBookInfo: t,
  selectedBookIds: e,
  onChangeSelectedBookIds: r,
  localizedStrings: o,
  localizedBookNames: i,
  disabledSectionExplanations: c
}) {
  const s = o["%webView_book_selector_books_selected%"], l = o["%webView_book_selector_select_books%"], d = o["%webView_book_selector_search_books%"], w = o["%webView_book_selector_select_all%"], u = o["%webView_book_selector_clear_all%"], h = o["%webView_book_selector_no_book_found%"], { otLong: g, ntLong: m, dcLong: v, extraLong: y } = {
    otLong: o == null ? void 0 : o["%scripture_section_ot_long%"],
    ntLong: o == null ? void 0 : o["%scripture_section_nt_long%"],
    dcLong: o == null ? void 0 : o["%scripture_section_dc_long%"],
    extraLong: o == null ? void 0 : o["%scripture_section_extra_long%"]
  }, [f, R] = N(!1), [_, E] = N(""), T = U(void 0), A = U(!1), S = L(
    () => ii(t),
    [t]
  ), j = L(() => {
    if (!_.trim()) {
      const I = {
        [Mt.OT]: [],
        [Mt.NT]: [],
        [Mt.DC]: [],
        [Mt.Extra]: []
      };
      return S.forEach((z) => {
        const G = sa(z);
        I[G].push(z);
      }), I;
    }
    const C = S.filter(
      (I) => Ro(I, _, i)
    ), at = {
      [Mt.OT]: [],
      [Mt.NT]: [],
      [Mt.DC]: [],
      [Mt.Extra]: []
    };
    return C.forEach((I) => {
      const z = sa(I);
      at[z].push(I);
    }), at;
  }, [S, _, i]), P = F(
    (C, at = !1) => {
      if (!at || !T.current) {
        r(
          e.includes(C) ? e.filter((wt) => wt !== C) : [...e, C]
        ), T.current = C;
        return;
      }
      const I = S.findIndex((wt) => wt === T.current), z = S.findIndex((wt) => wt === C);
      if (I === -1 || z === -1) return;
      const [G, st] = [
        Math.min(I, z),
        Math.max(I, z)
      ], nt = S.slice(G, st + 1).map((wt) => wt);
      r(
        e.includes(C) ? e.filter((wt) => !nt.includes(wt)) : [.../* @__PURE__ */ new Set([...e, ...nt])]
      );
    },
    [e, r, S]
  ), M = /* @__PURE__ */ n((C) => {
    P(C, A.current), A.current = !1;
  }, "handleKeyboardSelect"), O = /* @__PURE__ */ n((C, at) => {
    C.preventDefault(), P(at, C.shiftKey);
  }, "handleMouseDown"), W = /* @__PURE__ */ n(() => {
    r(S.map((C) => C));
  }, "handleSelectAll"), K = /* @__PURE__ */ n(() => {
    r([]);
  }, "handleClearAll"), et = L(
    () => Object.values(Mt).filter(
      (C) => (c == null ? void 0 : c[C]) !== void 0 && Ao(S, C).length === 0
    ).map((C) => ({ section: C, explanation: c == null ? void 0 : c[C] })),
    [c, S]
  );
  return /* @__PURE__ */ p(
    er,
    {
      open: f,
      onOpenChange: /* @__PURE__ */ n((C) => {
        R(C), C || E("");
      }, "onOpenChange"),
      children: [
        /* @__PURE__ */ a(Nr, { asChild: !0, children: /* @__PURE__ */ p(
          Z,
          {
            variant: "outline",
            role: "combobox",
            "aria-expanded": f,
            className: "tw:max-w-64 tw:justify-between",
            children: [
              e.length > 0 ? `${s}: ${e.length}` : l,
              /* @__PURE__ */ a(_c, { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
            ]
          }
        ) }),
        /* @__PURE__ */ a(
          rr,
          {
            className: "tw:max-h-(--radix-popover-content-available-height) tw:w-[500px] tw:max-w-[calc(100vw-2rem)] tw:p-0",
            align: "start",
            collisionPadding: 8,
            children: /* @__PURE__ */ p(
              ar,
              {
                className: "tw:min-h-0",
                shouldFilter: !1,
                onKeyDown: /* @__PURE__ */ n((C) => {
                  C.key === "Enter" && (A.current = C.shiftKey);
                }, "onKeyDown"),
                children: [
                  /* @__PURE__ */ a(
                    Sa,
                    {
                      className: "tw:shrink-0",
                      placeholder: d,
                      value: _,
                      onValueChange: E,
                      spaceSelectsHighlightedItem: !0
                    }
                  ),
                  /* @__PURE__ */ p("div", { className: "tw:flex tw:shrink-0 tw:justify-between tw:border-b tw:p-2", children: [
                    /* @__PURE__ */ a(
                      Z,
                      {
                        variant: "ghost",
                        size: "sm",
                        onClick: W,
                        disabled: S.length === 0,
                        children: w
                      }
                    ),
                    /* @__PURE__ */ a(Z, { variant: "ghost", size: "sm", onClick: K, children: u })
                  ] }),
                  /* @__PURE__ */ p(or, { className: "tw:max-h-72 tw:min-h-0 tw:flex-1", children: [
                    /* @__PURE__ */ a(Da, { children: h }),
                    Object.values(Mt).filter((C) => j[C].length > 0).map((C, at) => {
                      const I = j[C];
                      return /* @__PURE__ */ p(Hr, { children: [
                        at > 0 && /* @__PURE__ */ a(oi, { alwaysRender: !0 }),
                        /* @__PURE__ */ a(
                          He,
                          {
                            heading: ti(C, g, m, v, y),
                            children: I.map((z) => /* @__PURE__ */ a(
                              Pi,
                              {
                                bookId: z,
                                isSelected: e.includes(z),
                                onSelect: /* @__PURE__ */ n(() => M(z), "onSelect"),
                                onMouseDown: /* @__PURE__ */ n((G) => O(G, z), "onMouseDown"),
                                section: sa(z),
                                showCheck: !0,
                                localizedBookNames: i,
                                commandValue: bo(z, i),
                                className: "tw:flex tw:items-center"
                              },
                              z
                            ))
                          }
                        )
                      ] }, C);
                    })
                  ] }),
                  et.length > 0 && /* @__PURE__ */ a("div", { className: "tw:shrink-0 tw:border-t tw:p-2", children: et.map(({ section: C, explanation: at }) => /* @__PURE__ */ a("p", { className: "tw:text-xs tw:text-muted-foreground", children: at }, C)) })
                ]
              }
            )
          }
        )
      ]
    }
  );
}
n(tp, "SelectBooksPicker");
function ep({
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
n(ep, "DisabledTooltipWrapper");
function rp({
  disabled: t,
  tooltipText: e,
  children: r,
  className: o
}) {
  return /* @__PURE__ */ a(It, { children: /* @__PURE__ */ p(Et, { children: [
    /* @__PURE__ */ a(Tt, { asChild: !0, children: /* @__PURE__ */ a(
      ep,
      {
        className: o,
        isDisabled: t,
        disabledExplanation: e,
        children: r
      }
    ) }),
    t && /* @__PURE__ */ a(St, { children: /* @__PURE__ */ a("p", { className: "tw:max-w-xs tw:whitespace-pre-line", children: e }) })
  ] }) });
}
n(rp, "DisabledActionTooltip");
function ap({
  section: t,
  availableBookIds: e,
  selectedBookIds: r,
  onToggle: o,
  localizedStrings: i,
  disabledExplanation: c
}) {
  const s = Ao(e, t).length === 0, l = i["%scripture_section_ot_short%"], d = i["%scripture_section_nt_short%"], w = i["%scripture_section_dc_short%"], u = i["%scripture_section_extra_short%"], h = /* @__PURE__ */ a(
    Z,
    {
      variant: "outline",
      size: "sm",
      onClick: /* @__PURE__ */ n(() => o(t), "onClick"),
      className: x(
        si(e, t, r) && !s && "tw:bg-primary tw:text-primary-foreground tw:hover:bg-primary/70 tw:hover:text-primary-foreground"
      ),
      disabled: s,
      children: Bs(
        t,
        l,
        d,
        w,
        u
      )
    }
  );
  return c ? /* @__PURE__ */ a(
    rp,
    {
      className: "tw:flex",
      disabled: s,
      tooltipText: c,
      children: h
    }
  ) : h;
}
n(ap, "SectionButton");
const Zn = 5, no = 6;
function op({
  availableBookInfo: t,
  selectedBookIds: e,
  onChangeSelectedBookIds: r,
  localizedStrings: o,
  localizedBookNames: i,
  disabledSectionExplanations: c
}) {
  const s = o["%webView_book_selector_more%"], l = L(
    () => ii(t),
    [t]
  ), d = F(
    (w) => {
      const u = Ao(l, w).map((h) => h);
      r(
        si(l, w, e) ? e.filter((h) => !u.includes(h)) : [.../* @__PURE__ */ new Set([...e, ...u])]
      );
    },
    [e, r, l]
  );
  return /* @__PURE__ */ p("div", { className: "tw:space-y-2", children: [
    /* @__PURE__ */ a("div", { className: "tw:flex tw:flex-wrap tw:gap-2", children: Object.values(Mt).map((w) => /* @__PURE__ */ a(
      ap,
      {
        section: w,
        availableBookIds: l,
        selectedBookIds: e,
        onToggle: d,
        localizedStrings: o,
        disabledExplanation: c == null ? void 0 : c[w]
      },
      w
    )) }),
    /* @__PURE__ */ a(
      tp,
      {
        availableBookInfo: t,
        selectedBookIds: e,
        onChangeSelectedBookIds: r,
        localizedStrings: o,
        localizedBookNames: i,
        disabledSectionExplanations: c
      }
    ),
    e.length > 0 && /* @__PURE__ */ p("div", { className: "tw:mt-2 tw:flex tw:flex-wrap tw:gap-1", children: [
      e.slice(
        0,
        e.length === no ? no : Zn
      ).map((w) => /* @__PURE__ */ a(Lr, { className: "tw:hover:bg-secondary", variant: "secondary", children: De(w, i) }, w)),
      e.length > no && /* @__PURE__ */ a(
        Lr,
        {
          className: "tw:hover:bg-secondary",
          variant: "secondary",
          children: `+${e.length - Zn} ${s}`
        }
      )
    ] })
  ] });
}
n(op, "SelectBooks");
const np = Object.freeze([
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
]), rg = Object.freeze([
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
  ...np
]), jt = /* @__PURE__ */ n((t, e) => t[e] ?? e, "localizeString$1"), ip = Object.freeze([" ", "-"]);
function ag({
  scope: t,
  availableScopes: e,
  onScopeChange: r,
  availableBookInfo: o,
  selectedBookIds: i,
  onSelectedBookIdsChange: c,
  localizedStrings: s,
  localizedBookNames: l,
  disabledSectionExplanations: d,
  disabledScopeExplanations: w,
  id: u,
  variant: h = "radio",
  rangeStart: g,
  rangeEnd: m,
  onRangeStartChange: v,
  onRangeEndChange: y,
  currentScrRef: f,
  onCurrentScrRefChange: R,
  bookChapterControlLocalizedStrings: _,
  getEndVerse: E,
  hideLabel: T = !1,
  buttonClassName: A
}) {
  const S = jt(
    s,
    "%webView_scope_selector_selected_text%"
  ), j = jt(s, "%webView_scope_selector_verse%"), P = jt(s, "%webView_scope_selector_chapter%"), M = jt(s, "%webView_scope_selector_book%"), O = jt(
    s,
    "%webView_scope_selector_current_verse%"
  ), W = jt(
    s,
    "%webView_scope_selector_current_chapter%"
  ), K = jt(s, "%webView_scope_selector_current_book%"), et = jt(s, "%webView_scope_selector_choose_books%"), C = jt(s, "%webView_scope_selector_scope%"), at = jt(s, "%webView_scope_selector_select_books%"), I = jt(s, "%webView_scope_selector_range%"), z = jt(s, "%webView_scope_selector_select_range%"), G = jt(s, "%webView_scope_selector_range_start%"), st = jt(s, "%webView_scope_selector_range_end%"), nt = jt(s, "%webView_scope_selector_ok%"), wt = jt(s, "%webView_scope_selector_cancel%"), Rt = jt(s, "%webView_scope_selector_navigate%"), Q = /* @__PURE__ */ n((B) => {
    if (!f) return;
    const tt = f.book.toUpperCase();
    switch (B) {
      case "verse":
        return Me(f, "id");
      case "chapter":
        return `${tt} ${f.chapterNum}`;
      case "book":
        return tt;
      default:
        return;
    }
  }, "getScrRefSuffix"), dt = [
    { value: "selectedText", label: S, id: "scope-selected-text" },
    {
      value: "verse",
      label: j,
      dropdownLabel: O,
      scrRefSuffix: Q("verse"),
      id: "scope-verse"
    },
    {
      value: "chapter",
      label: P,
      dropdownLabel: W,
      scrRefSuffix: Q("chapter"),
      id: "scope-chapter"
    },
    {
      value: "book",
      label: M,
      dropdownLabel: K,
      scrRefSuffix: Q("book"),
      id: "scope-book"
    },
    { value: "selectedBooks", label: et, id: "scope-selected" },
    { value: "range", label: I, id: "scope-range" }
  ], bt = /* @__PURE__ */ n((B, tt, $t = !1) => /* @__PURE__ */ p(gt, { children: [
    B,
    tt && !$t && /* @__PURE__ */ p("span", { className: "tw:text-muted-foreground", children: [
      ": ",
      tt
    ] })
  ] }), "renderScopeLabel"), ht = e ? dt.filter((B) => e.includes(B.value)) : dt, zt = f ?? Ga, qt = g ?? zt, ut = m ?? zt, ve = /* @__PURE__ */ n(() => {
  }, "noopScrRefChange"), ne = U(null), xt = U(null), ft = U(!1), yt = U(null), Gt = U(!1), [Dt, Ct] = N(void 0), mt = U(!1), ie = U(!1), se = U(null), ce = F((B) => {
    if (B) {
      Ct("start"), mt.current = !1;
      return;
    }
    Ct((tt) => tt === "start" ? void 0 : tt), mt.current && (mt.current = !1, requestAnimationFrame(() => {
      var $t;
      const tt = ($t = ne.current) == null ? void 0 : $t.querySelector("button");
      tt == null || tt.click();
    }));
  }, []), $e = F((B) => {
    if (B) {
      Ct("end"), ie.current = !1;
      return;
    }
    Ct((tt) => tt === "end" ? void 0 : tt);
  }, []), Kt = F(
    (B) => {
      v == null || v(B), y == null || y(B), mt.current = !0;
    },
    [v, y]
  ), Ve = F(
    (B) => {
      y == null || y(B), ie.current = !0;
    },
    [y]
  ), Pt = F(
    (B) => {
      r(B), B === "selectedBooks" && i.length === 0 && (f != null && f.book) && c([f.book]);
    },
    [r, i, f, c]
  ), _t = ht.find((B) => B.value === t), be = /* @__PURE__ */ n(() => t === "selectedBooks" && i.length > 0 ? i.map((B) => B.toUpperCase()).join(", ") : t === "range" ? $c(qt, ut, {
    optionOrLocalizedBookName: "id",
    endRefOptionOrLocalizedBookName: "id",
    repeatBookName: !0
  }) : _t ? bt(_t.label, _t.scrRefSuffix) : t, "renderTriggerContent"), $ = ht.filter(
    (B) => B.value !== "selectedBooks" && B.value !== "range"
  ), vt = ht.find((B) => B.value === "selectedBooks"), le = ht.find((B) => B.value === "range"), [te, D] = N(!1), [H, J] = N(void 0), [k, Y] = N(void 0), [V, rt] = N(void 0), [it, lt] = N(void 0), [Nt, At] = N([]), Lt = h === "dropdown" && H === "selectedBooks", ee = /* @__PURE__ */ a(
    op,
    {
      availableBookInfo: o,
      selectedBookIds: Lt ? Nt : i,
      onChangeSelectedBookIds: Lt ? At : c,
      localizedStrings: s,
      localizedBookNames: l,
      disabledSectionExplanations: d
    }
  ), Er = Dt === "end", Tr = Dt === "start", ir = "tw:text-muted-foreground", Xe = h === "dropdown" && H === "range", Va = Xe ? rt : Kt, La = Xe ? lt : y ? Ve : ve, Sr = /* @__PURE__ */ p("div", { className: "tw:flex tw:flex-wrap tw:items-end tw:gap-4", children: [
    /* @__PURE__ */ p("div", { className: "tw:grid tw:gap-2", children: [
      /* @__PURE__ */ a(Ot, { htmlFor: "scope-range-start", className: x(Er && ir), children: G }),
      /* @__PURE__ */ a(
        Wa,
        {
          id: "scope-range-start",
          scrRef: Xe ? V ?? qt : qt,
          handleSubmit: Va,
          localizedBookNames: l,
          localizedStrings: _,
          getEndVerse: E,
          submitKeys: ip,
          onOpenChange: ce,
          className: x(Er && ir),
          modal: !0
        }
      )
    ] }),
    /* @__PURE__ */ p("div", { ref: ne, className: "tw:grid tw:gap-2", children: [
      /* @__PURE__ */ a(Ot, { htmlFor: "scope-range-end", className: x(Tr && ir), children: st }),
      /* @__PURE__ */ a(
        Wa,
        {
          id: "scope-range-end",
          scrRef: Xe ? it ?? ut : ut,
          handleSubmit: La,
          localizedBookNames: l,
          localizedStrings: _,
          getEndVerse: E,
          disableReferencesUpTo: Xe ? V ?? qt : qt,
          onOpenChange: $e,
          onCloseAutoFocus: /* @__PURE__ */ n((B) => {
            var tt;
            ie.current && (ie.current = !1, B.preventDefault(), (tt = se.current) == null || tt.focus());
          }, "onCloseAutoFocus"),
          className: x(Tr && ir),
          modal: !0,
          align: "start"
        }
      )
    ] })
  ] }), Rr = U({}), sr = F(
    (B) => (tt) => {
      Rr.current[B] = tt;
    },
    []
  ), xe = U(null);
  X(() => {
    if (!te) return;
    let B = 0;
    const tt = requestAnimationFrame(() => {
      B = requestAnimationFrame(() => {
        var $t;
        ($t = Rr.current[t]) == null || $t.focus();
      });
    });
    return () => {
      cancelAnimationFrame(tt), B && cancelAnimationFrame(B);
    };
  }, [te, t]);
  const [cr, Ba] = N(null), [Re, lr] = N(null), [dr, ja] = N(null), Yr = 200, [Fa, Wr] = N(!1);
  X(() => {
    if (!dr || typeof ResizeObserver > "u") return;
    const B = new ResizeObserver(([tt]) => {
      Wr(tt.contentRect.width < Yr);
    });
    return B.observe(dr), () => B.disconnect();
  }, [dr]);
  const Xr = F(
    (B) => {
      Y(B), rt(qt), lt(ut), At(i), D(!1), J(B);
    },
    [qt, ut, i]
  ), Jr = F(() => {
    k !== void 0 && (k === "range" ? (V && (v == null || v(V)), it && (y == null || y(it))) : k === "selectedBooks" && c(Nt), Pt(k), J(void 0), Y(void 0));
  }, [
    k,
    V,
    it,
    Nt,
    v,
    y,
    c,
    Pt
  ]), wr = F((B) => {
    B || (J(void 0), Y(void 0));
  }, []), Zr = F((B) => {
    var tt;
    B.preventDefault(), (tt = xe.current) == null || tt.focus();
  }, []), Qr = /* @__PURE__ */ n((B) => t === B ? /* @__PURE__ */ a("span", { className: "tw:absolute tw:flex tw:h-3.5 tw:w-3.5 tw:items-center tw:justify-center tw:ltr:left-2 tw:rtl:right-2", children: /* @__PURE__ */ a(qe, { className: "tw:h-4 tw:w-4" }) }) : void 0, "renderDialogLauncherCheck");
  return /* @__PURE__ */ p("div", { id: u, className: "tw:grid tw:gap-4", children: [
    /* @__PURE__ */ p("div", { className: "tw:grid tw:gap-2", children: [
      !T && /* @__PURE__ */ a(Ot, { children: C }),
      h === "dropdown" ? /* @__PURE__ */ p(ze, { open: te, onOpenChange: D, children: [
        /* @__PURE__ */ a(_e, { asChild: !0, children: /* @__PURE__ */ p(
          Z,
          {
            ref: xe,
            variant: "outline",
            role: "combobox",
            className: x(
              "tw:w-full tw:justify-between tw:overflow-hidden tw:font-normal",
              A
            ),
            children: [
              /* @__PURE__ */ a("span", { className: "tw:min-w-0 tw:flex-1 tw:truncate tw:text-start", children: be() }),
              /* @__PURE__ */ a(tr, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
            ]
          }
        ) }),
        /* @__PURE__ */ a(
          Pe,
          {
            ref: ja,
            className: "tw:w-[var(--radix-dropdown-menu-trigger-width)] tw:min-w-[12rem]",
            align: "start",
            children: /* @__PURE__ */ p(Ka, { container: dr, children: [
              $.map(({ value: B, label: tt, dropdownLabel: $t, scrRefSuffix: de, id: he }) => {
                const b = w == null ? void 0 : w[B];
                return /* @__PURE__ */ p(
                  je,
                  {
                    ref: sr(B),
                    disabled: !!b,
                    className: "tw:relative tw:ps-8 data-[highlighted]:tw:bg-accent data-[highlighted]:tw:text-accent-foreground",
                    onSelect: /* @__PURE__ */ n(() => Pt(B), "onSelect"),
                    "data-selected": t === B ? "true" : void 0,
                    children: [
                      t === B && /* @__PURE__ */ a("span", { className: "tw:absolute tw:flex tw:h-3.5 tw:w-3.5 tw:items-center tw:justify-center tw:ltr:left-2 tw:rtl:right-2", children: /* @__PURE__ */ a(qe, { className: "tw:h-4 tw:w-4" }) }),
                      /* @__PURE__ */ p("span", { className: "tw:flex tw:min-w-0 tw:flex-col tw:gap-0.5", children: [
                        /* @__PURE__ */ a("span", { className: "tw:flex tw:items-center tw:gap-1.5", children: bt($t ?? tt, de, Fa) }),
                        b && /* @__PURE__ */ a("span", { className: "tw:text-xs tw:whitespace-normal tw:text-foreground", children: b })
                      ] })
                    ]
                  },
                  he
                );
              }),
              (vt || le) && /* @__PURE__ */ a(Qe, {}),
              vt && /* @__PURE__ */ p(
                je,
                {
                  ref: sr("selectedBooks"),
                  className: x(
                    "tw:relative tw:ps-8",
                    "data-[highlighted]:tw:bg-accent data-[highlighted]:tw:text-accent-foreground"
                  ),
                  onSelect: /* @__PURE__ */ n(() => Xr("selectedBooks"), "onSelect"),
                  "data-selected": t === "selectedBooks" ? "true" : void 0,
                  children: [
                    Qr("selectedBooks"),
                    `${vt.label}…`
                  ]
                }
              ),
              le && /* @__PURE__ */ p(
                je,
                {
                  ref: sr("range"),
                  className: x(
                    "tw:relative tw:ps-8",
                    "data-[highlighted]:tw:bg-accent data-[highlighted]:tw:text-accent-foreground"
                  ),
                  onSelect: /* @__PURE__ */ n(() => Xr("range"), "onSelect"),
                  "data-selected": t === "range" ? "true" : void 0,
                  children: [
                    Qr("range"),
                    `${le.label}…`
                  ]
                }
              ),
              R && /* @__PURE__ */ p(gt, { children: [
                /* @__PURE__ */ a(Qe, {}),
                /* @__PURE__ */ a(_r, { className: "tw:px-2 tw:py-1.5 tw:text-xs tw:font-medium tw:text-muted-foreground", children: Rt }),
                /* @__PURE__ */ a(
                  je,
                  {
                    ref: yt,
                    className: "tw:p-0",
                    onSelect: /* @__PURE__ */ n((B) => {
                      var tt, $t;
                      if (B.preventDefault(), ft.current) {
                        ft.current = !1;
                        return;
                      }
                      Gt.current || ($t = (tt = xt.current) == null ? void 0 : tt.querySelector("button")) == null || $t.click();
                    }, "onSelect"),
                    children: /* @__PURE__ */ a(
                      "div",
                      {
                        ref: xt,
                        className: "tw:w-full tw:px-1 tw:pb-1",
                        onPointerDownCapture: /* @__PURE__ */ n((B) => {
                          const tt = B.target instanceof HTMLElement ? B.target : void 0;
                          tt != null && tt.closest("button") && (ft.current = !0, requestAnimationFrame(() => {
                            ft.current = !1;
                          }));
                        }, "onPointerDownCapture"),
                        children: /* @__PURE__ */ a(
                          Wa,
                          {
                            id: "scope-navigate",
                            scrRef: f ?? Ga,
                            handleSubmit: R,
                            localizedBookNames: l,
                            localizedStrings: _,
                            getEndVerse: E,
                            triggerVariant: "ghost",
                            onOpenChange: /* @__PURE__ */ n((B) => {
                              Gt.current = B;
                            }, "onOpenChange"),
                            onCloseAutoFocus: /* @__PURE__ */ n((B) => {
                              var tt;
                              B.preventDefault(), (tt = yt.current) == null || tt.focus();
                            }, "onCloseAutoFocus"),
                            modal: !0,
                            className: "tw:w-full tw:min-w-0 tw:max-w-none tw:justify-between tw:px-2 tw:font-normal",
                            triggerContent: /* @__PURE__ */ p(gt, { children: [
                              /* @__PURE__ */ a("span", { className: "tw:min-w-0 tw:flex-1 tw:truncate tw:text-start", children: Me(f ?? Ga, "id") }),
                              /* @__PURE__ */ a(tr, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
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
        Mo,
        {
          value: t,
          onValueChange: Pt,
          className: "tw:flex tw:flex-col tw:space-y-1",
          children: ht.map(({ value: B, label: tt, scrRefSuffix: $t, id: de }) => {
            const he = w == null ? void 0 : w[B];
            return /* @__PURE__ */ p("div", { className: "tw:flex tw:flex-col tw:gap-0.5", children: [
              /* @__PURE__ */ p("div", { className: "tw:flex tw:items-center", children: [
                /* @__PURE__ */ a(
                  fa,
                  {
                    className: "tw:me-2",
                    value: B,
                    id: de,
                    disabled: !!he,
                    "aria-describedby": he ? `${de}-explanation` : void 0
                  }
                ),
                /* @__PURE__ */ a(Ot, { htmlFor: de, children: bt(tt, $t) })
              ] }),
              he && // Indented to clear the radio so it reads as belonging to this row's label.
              /* @__PURE__ */ a(
                "span",
                {
                  id: `${de}-explanation`,
                  className: "tw:ms-6 tw:text-xs tw:whitespace-normal tw:text-muted-foreground",
                  children: he
                }
              )
            ] }, de);
          })
        }
      )
    ] }),
    h === "radio" && t === "selectedBooks" && /* @__PURE__ */ p("div", { className: "tw:grid tw:gap-2", children: [
      /* @__PURE__ */ a(Ot, { children: at }),
      ee
    ] }),
    h === "radio" && t === "range" && Sr,
    h === "dropdown" && vt && /* @__PURE__ */ a(io, { open: H === "selectedBooks", onOpenChange: wr, children: /* @__PURE__ */ a(
      so,
      {
        ref: lr,
        onCloseAutoFocus: Zr,
        onEscapeKeyDown: /* @__PURE__ */ n((B) => {
          Re != null && Re.querySelector('[data-state="open"]') && B.preventDefault();
        }, "onEscapeKeyDown"),
        children: /* @__PURE__ */ p(Ka, { container: Re, children: [
          /* @__PURE__ */ a(co, { className: "tw:pe-8", children: /* @__PURE__ */ a(lo, { children: et }) }),
          ee,
          /* @__PURE__ */ p(wn, { children: [
            /* @__PURE__ */ a(Z, { variant: "outline", onClick: /* @__PURE__ */ n(() => wr(!1), "onClick"), children: wt }),
            /* @__PURE__ */ a(Z, { onClick: Jr, children: nt })
          ] })
        ] })
      }
    ) }),
    h === "dropdown" && le && /* @__PURE__ */ a(io, { open: H === "range", onOpenChange: wr, children: /* @__PURE__ */ a(
      so,
      {
        ref: Ba,
        onCloseAutoFocus: Zr,
        onEscapeKeyDown: /* @__PURE__ */ n((B) => {
          cr != null && cr.querySelector('[data-state="open"]') && B.preventDefault();
        }, "onEscapeKeyDown"),
        children: /* @__PURE__ */ p(Ka, { container: cr, children: [
          /* @__PURE__ */ a(co, { className: "tw:pe-8", children: /* @__PURE__ */ a(lo, { children: z }) }),
          Sr,
          /* @__PURE__ */ p(wn, { children: [
            /* @__PURE__ */ a(Z, { variant: "outline", onClick: /* @__PURE__ */ n(() => wr(!1), "onClick"), children: wt }),
            /* @__PURE__ */ a(Z, { ref: se, onClick: Jr, children: nt })
          ] })
        ] })
      }
    ) })
  ] });
}
n(ag, "ScopeSelector");
function og({
  availableScrollGroupIds: t,
  scrollGroupId: e,
  onChangeScrollGroupId: r,
  localizedStrings: o = {},
  size: i = "sm",
  className: c,
  id: s,
  disabled: l
}) {
  const d = {
    ...Ha,
    ...Object.fromEntries(
      Object.entries(o).map(
        ([u, h]) => [
          u,
          u === h && u in Ha ? Ha[u] : h
        ]
      )
    )
  }, w = Ee();
  return /* @__PURE__ */ p(
    br,
    {
      value: `${e}`,
      onValueChange: /* @__PURE__ */ n((u) => r(
        u === "undefined" ? void 0 : parseInt(u, 10)
      ), "onValueChange"),
      disabled: l,
      children: [
        /* @__PURE__ */ a(yr, { size: i, className: x("pr-twp tw:w-auto", c), children: /* @__PURE__ */ a(
          xr,
          {
            placeholder: d[fn(e)] ?? e
          }
        ) }),
        /* @__PURE__ */ a(
          kr,
          {
            id: s,
            align: w === "rtl" ? "end" : "start",
            style: { zIndex: Ae },
            children: t.map((u) => /* @__PURE__ */ a(fe, { value: `${u}`, children: d[fn(u)] }, `${u}`))
          }
        )
      ]
    }
  );
}
n(og, "ScrollGroupSelector");
function ng({ children: t }) {
  return /* @__PURE__ */ a("div", { className: "pr-twp tw:grid", children: t });
}
n(ng, "SettingsList");
function ig({
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
n(ig, "SettingsListItem");
function sg({
  primary: t,
  secondary: e,
  includeSeparator: r = !1
}) {
  return /* @__PURE__ */ p("div", { className: "tw:space-y-4 tw:py-2", children: [
    /* @__PURE__ */ p("div", { children: [
      /* @__PURE__ */ a("h3", { className: "tw:text-lg tw:font-medium", children: t }),
      /* @__PURE__ */ a("p", { className: "tw:text-sm tw:text-muted-foreground", children: e })
    ] }),
    r ? /* @__PURE__ */ a(Br, {}) : ""
  ] });
}
n(sg, "SettingsListHeader");
function gs(t, e) {
  var r;
  return (r = Object.entries(t).find(
    ([, o]) => "menuItem" in o && o.menuItem === e
  )) == null ? void 0 : r[0];
}
n(gs, "getSubMenuGroupKeyForMenuItemId");
function Ea({ icon: t, menuLabel: e, leading: r }) {
  return t ? /* @__PURE__ */ a(
    "img",
    {
      className: x("tw:max-h-5 tw:max-w-5", r ? "tw:me-2" : "tw:ms-2"),
      src: t,
      alt: `${r ? "Leading" : "Trailing"} icon for ${e}`
    }
  ) : void 0;
}
n(Ea, "MenuItemIcon");
const fs = /* @__PURE__ */ n((t, e, r, o) => r ? Object.entries(t).filter(
  ([c, s]) => "column" in s && s.column === r || c === r
).sort(([, c], [, s]) => c.order - s.order).flatMap(([c]) => e.filter((l) => l.group === c).sort((l, d) => l.order - d.order).map((l) => /* @__PURE__ */ p(Et, { children: [
  /* @__PURE__ */ a(Tt, { asChild: !0, children: "command" in l ? /* @__PURE__ */ p(
    je,
    {
      onClick: /* @__PURE__ */ n(() => {
        o(l);
      }, "onClick"),
      children: [
        l.iconPathBefore && /* @__PURE__ */ a(Ea, { icon: l.iconPathBefore, menuLabel: l.label, leading: !0 }),
        l.label,
        l.iconPathAfter && /* @__PURE__ */ a(Ea, { icon: l.iconPathAfter, menuLabel: l.label })
      ]
    },
    `dropdown-menu-item-${l.label}-${l.command}`
  ) : /* @__PURE__ */ p(js, { children: [
    /* @__PURE__ */ a(Fs, { children: l.label }),
    /* @__PURE__ */ a(Us, { children: /* @__PURE__ */ a(Ks, { children: fs(
      t,
      e,
      gs(t, l.id),
      o
    ) }) })
  ] }, `dropdown-menu-sub-${l.label}-${l.id}`) }),
  l.tooltip && /* @__PURE__ */ a(St, { children: l.tooltip })
] }, `tooltip-${l.label}-${"command" in l ? l.command : l.id}`))) : void 0, "getGroupContent");
function So({
  onSelectMenuItem: t,
  menuData: e,
  tabLabel: r,
  icon: o,
  className: i,
  variant: c,
  buttonVariant: s = "ghost",
  id: l
}) {
  return /* @__PURE__ */ p(ze, { variant: c, children: [
    /* @__PURE__ */ a(_e, { "aria-label": r, className: i, asChild: !0, id: l, children: /* @__PURE__ */ a(Z, { variant: s, size: "icon", children: o ?? /* @__PURE__ */ a(Nc, {}) }) }),
    /* @__PURE__ */ a(Pe, { align: "start", style: { zIndex: Ae }, children: Object.entries(e.columns).filter(([, d]) => typeof d == "object").sort(([, d], [, w]) => typeof d == "boolean" || typeof w == "boolean" ? 0 : d.order - w.order).map(([d], w, u) => /* @__PURE__ */ p(Hr, { children: [
      /* @__PURE__ */ a(ri, { children: /* @__PURE__ */ a(It, { children: fs(e.groups, e.items, d, t) }) }),
      w < u.length - 1 && /* @__PURE__ */ a(Qe, {})
    ] }, d)) })
  ] });
}
n(So, "TabDropdownMenu");
const sp = 8;
function cp(t, e, r) {
  const o = e.findIndex((s) => t >= s), i = o === -1 ? e.length : o;
  if (r === void 0 || i >= r) return i;
  const c = e.findIndex(
    (s) => t >= s + sp
  );
  return c === -1 ? r : Math.min(r, c);
}
n(cp, "getShrinkStep");
function ms(t, e) {
  const [r, o] = N(0), i = U(void 0);
  return Zt(() => {
    if (!t || typeof ResizeObserver > "u") return;
    const c = /* @__PURE__ */ n(() => {
      const { width: l } = t.getBoundingClientRect(), d = i.current;
      i.current = l;
      const w = d === void 0 || d === 0;
      o(
        (u) => cp(l, e, w ? void 0 : u)
      );
    }, "measure");
    c();
    const s = new ResizeObserver(c);
    return s.observe(t), () => s.disconnect();
  }, [t, e]), r;
}
n(ms, "useShrinkStep");
const lp = Object.freeze([520, 420, 340]), vs = Jt.forwardRef(
  ({ id: t, className: e, children: r }, o) => {
    const [i, c] = N(void 0), s = U(o);
    s.current = o;
    const l = F((h) => {
      c(h ?? void 0);
      const g = s.current;
      typeof g == "function" ? g(h) : g && (g.current = h);
    }, []), d = ms(i, lp), w = $i() ?? d, u = w >= $r.MINIMUM;
    return /* @__PURE__ */ a(za.Provider, { value: w, children: /* @__PURE__ */ a(
      "div",
      {
        ref: l,
        className: x(
          "tw:sticky tw:top-0 tw:box-border tw:h-14 tw:items-center tw:justify-between tw:overflow-clip tw:py-2 tw:text-foreground tw:@container/toolbar",
          u ? "tw:gap-1 tw:px-2" : "tw:gap-2 tw:px-4",
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
function cg({
  onSelectProjectMenuItem: t,
  onSelectViewInfoMenuItem: e,
  projectMenuData: r,
  tabViewMenuData: o,
  id: i,
  className: c,
  startAreaChildren: s,
  centerAreaChildren: l,
  endAreaChildren: d,
  menuButtonIcon: w
}) {
  return /* @__PURE__ */ p(vs, { className: `tw:w-full tw:border-b ${c}`, id: i, children: [
    r && /* @__PURE__ */ a(
      So,
      {
        onSelectMenuItem: t,
        menuData: r,
        tabLabel: "Project",
        icon: w ?? /* @__PURE__ */ a(Cc, {}),
        buttonVariant: "ghost"
      }
    ),
    s && /* @__PURE__ */ a("div", { className: "tw:flex tw:min-w-0 tw:shrink tw:grow-[10] tw:flex-row tw:flex-nowrap tw:items-start tw:gap-x-1 tw:gap-y-2 tw:overflow-clip", children: s }),
    l && /* @__PURE__ */ a("div", { className: "tw:flex tw:shrink tw:grow-[1] tw:basis-0 tw:flex-row tw:flex-nowrap tw:items-start tw:justify-center tw:gap-x-1 tw:gap-y-2 tw:overflow-clip tw:@sm:basis-auto", children: l }),
    /* @__PURE__ */ p("div", { className: "tw:flex tw:shrink-0 tw:grow-[1] tw:flex-row-reverse tw:flex-nowrap tw:items-start tw:gap-x-1 tw:gap-y-2 tw:overflow-clip", children: [
      o && /* @__PURE__ */ a(
        So,
        {
          onSelectMenuItem: e,
          menuData: o,
          tabLabel: "View Info",
          icon: /* @__PURE__ */ a(Ec, {}),
          className: "tw:h-full"
        }
      ),
      d
    ] })
  ] });
}
n(cg, "TabToolbar");
function lg({
  onSelectProjectMenuItem: t,
  projectMenuData: e,
  id: r,
  className: o,
  menuButtonIcon: i
}) {
  return /* @__PURE__ */ a(vs, { className: "tw:pointer-events-none", id: r, children: e && /* @__PURE__ */ a(
    So,
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
n(lg, "TabFloatingMenu");
const bs = Jt.forwardRef(({ className: t, ...e }, r) => {
  const o = Ee();
  return /* @__PURE__ */ a(
    me.Root,
    {
      orientation: "vertical",
      ref: r,
      className: x("tw:flex tw:gap-1 tw:rounded-md tw:text-muted-foreground", t),
      ...e,
      dir: o
    }
  );
});
bs.displayName = me.List.displayName;
const xs = Jt.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ a(
  me.List,
  {
    ref: r,
    className: x(
      "tw:flex tw:items-center tw:w-[124px] tw:justify-center tw:rounded-md tw:bg-muted tw:p-1 tw:text-muted-foreground",
      t
    ),
    ...e
  }
));
xs.displayName = me.List.displayName;
const dp = Jt.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ a(
  me.Trigger,
  {
    ref: r,
    ...e,
    className: x(
      "tw:inline-flex tw:w-[116px] tw:cursor-pointer tw:items-center tw:justify-center tw:break-words tw:rounded-sm tw:border-0 tw:bg-muted tw:px-3 tw:py-1.5 tw:text-sm tw:font-medium tw:text-inherit tw:ring-offset-background tw:transition-all tw:hover:text-foreground tw:focus-visible:outline-hidden tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2 tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:data-[state=active]:bg-background tw:data-[state=active]:text-foreground tw:data-[state=active]:shadow-sm tw:overflow-clip",
      t
    )
  }
)), ys = Jt.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ a(
  me.Content,
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
ys.displayName = me.Content.displayName;
function dg({
  tabList: t,
  searchValue: e,
  onSearch: r,
  searchPlaceholder: o,
  headerTitle: i,
  searchClassName: c,
  id: s
}) {
  return /* @__PURE__ */ p("div", { id: s, className: "pr-twp", children: [
    /* @__PURE__ */ p("div", { className: "tw:sticky tw:top-0 tw:space-y-2 tw:pb-2", children: [
      i ? /* @__PURE__ */ a("h1", { children: i }) : "",
      /* @__PURE__ */ a(
        ni,
        {
          className: c,
          value: e,
          onSearch: r,
          placeholder: o
        }
      )
    ] }),
    /* @__PURE__ */ p(bs, { children: [
      /* @__PURE__ */ a(xs, { children: t.map((l) => /* @__PURE__ */ a(dp, { value: l.value, children: l.value }, l.key)) }),
      t.map((l) => /* @__PURE__ */ a(ys, { value: l.value, children: l.content }, l.key))
    ] })
  ] });
}
n(dg, "TabNavigationContentSearch");
function wp({
  className: t,
  // CUSTOM: Added variant prop to allow callers to apply visual style variants to all menu items
  variant: e = "default",
  ...r
}) {
  const o = Jt.useMemo(
    () => ({
      variant: e
    }),
    [e]
  );
  return /* @__PURE__ */ a(Hs.Provider, { value: o, children: /* @__PURE__ */ a(
    Te.Root,
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
n(wp, "Menubar");
function up({ ...t }) {
  return /* @__PURE__ */ a(Te.Menu, { "data-slot": "menubar-menu", ...t });
}
n(up, "MenubarMenu");
function pp({ ...t }) {
  return /* @__PURE__ */ a(Te.Portal, { "data-slot": "menubar-portal", ...t });
}
n(pp, "MenubarPortal");
function hp({
  className: t,
  ...e
}) {
  const r = Ur();
  return /* @__PURE__ */ a(
    Te.Trigger,
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
n(hp, "MenubarTrigger");
function gp({
  className: t,
  align: e = "start",
  alignOffset: r = -4,
  sideOffset: o = 8,
  // CUSTOM: Pull `style` out so the shared z-index can be applied under any caller-supplied style
  style: i,
  ...c
}) {
  const s = Ur();
  return /* @__PURE__ */ a(pp, { children: /* @__PURE__ */ a(
    Te.Content,
    {
      "data-slot": "menubar-content",
      align: e,
      alignOffset: r,
      sideOffset: o,
      className: x(
        // CUSTOM: Fixed tw: prefix not being on some classes and removed erroneous empty tw: tokens
        // CUSTOM: Removed tw:z-50 to use the shared z-index constant below (see style prop)
        "tw:min-w-36 tw:origin-(--radix-menubar-content-transform-origin) tw:overflow-hidden tw:rounded-lg tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:animate-none! tw:bg-popover/70 tw:before:-z-1 tw:**:data-[slot$=-item]:focus:bg-foreground/10 tw:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 tw:**:data-[slot$=-separator]:bg-foreground/5 tw:**:data-[slot$=-trigger]:focus:bg-foreground/10 tw:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! tw:**:data-[variant=destructive]:focus:bg-foreground/10! tw:**:data-[variant=destructive]:text-accent-foreground! tw:**:data-[variant=destructive]:**:text-accent-foreground! tw:relative tw:before:pointer-events-none tw:before:absolute tw:before:inset-0 tw:before:rounded-[inherit] tw:before:backdrop-blur-2xl tw:before:backdrop-saturate-150",
        // CUSTOM: Added pr-twp to reset styles so that only shadcn styles are applied (portal-rendered content needs this)
        "pr-twp",
        // CUSTOM: Apply muted background when variant is muted
        {
          "tw:bg-popover": s.variant === "muted"
        },
        t
      ),
      style: { zIndex: Ae, ...i },
      ...c
    }
  ) });
}
n(gp, "MenubarContent");
function fp({
  className: t,
  inset: e,
  variant: r = "default",
  ...o
}) {
  const i = Ur();
  return /* @__PURE__ */ a(
    Te.Item,
    {
      "data-slot": "menubar-item",
      "data-inset": e,
      "data-variant": r,
      className: x(
        "tw:group/menubar-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-[variant=destructive]:text-destructive tw:data-[variant=destructive]:focus:bg-destructive/10 tw:data-[variant=destructive]:focus:text-destructive tw:dark:data-[variant=destructive]:focus:bg-destructive/20 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:data-[variant=destructive]:*:[svg]:text-destructive!",
        // CUSTOM: Apply variant-driven styles from menu context
        $o({ variant: i.variant, className: t })
      ),
      ...o
    }
  );
}
n(fp, "MenubarItem");
function mp({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    Te.Separator,
    {
      "data-slot": "menubar-separator",
      className: x("tw:-mx-1 tw:my-1 tw:h-px tw:bg-border", t),
      ...e
    }
  );
}
n(mp, "MenubarSeparator");
function vp({ ...t }) {
  return /* @__PURE__ */ a(Te.Sub, { "data-slot": "menubar-sub", ...t });
}
n(vp, "MenubarSub");
function bp({
  className: t,
  inset: e,
  children: r,
  ...o
}) {
  const i = Ur();
  return /* @__PURE__ */ p(
    Te.SubTrigger,
    {
      "data-slot": "menubar-sub-trigger",
      "data-inset": e,
      className: x(
        "tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-none tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-inset:ps-7 tw:data-open:bg-accent tw:data-open:text-accent-foreground tw:[&_svg:not([class*=size-])]:size-4",
        // CUSTOM: Apply variant-driven styles from menu context
        $o({ variant: i.variant, className: t })
      ),
      ...o,
      children: [
        r,
        /* @__PURE__ */ a(vi, { className: "tw:ms-auto tw:size-4" })
      ]
    }
  );
}
n(bp, "MenubarSubTrigger");
function xp({
  className: t,
  // CUSTOM: Pull `style` out so the shared z-index can be applied under any caller-supplied style
  style: e,
  ...r
}) {
  const o = Ur();
  return /* @__PURE__ */ a(
    Te.SubContent,
    {
      "data-slot": "menubar-sub-content",
      className: x(
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
      style: { zIndex: Ae, ...e },
      ...r
    }
  );
}
n(xp, "MenubarSubContent");
const Ir = /* @__PURE__ */ n((t, e) => {
  setTimeout(() => {
    e.forEach((r) => {
      var o;
      (o = t.current) == null || o.dispatchEvent(new KeyboardEvent("keydown", r));
    });
  }, 0);
}, "simulateKeyPress"), ks = /* @__PURE__ */ n((t, e, r, o) => {
  if (!r) return;
  const i = Object.entries(t).filter(
    ([c, s]) => "column" in s && s.column === r || c === r
  ).sort(([, c], [, s]) => c.order - s.order);
  return i.flatMap(([c], s) => {
    const l = e.filter((w) => w.group === c).sort((w, u) => w.order - u.order).map((w) => /* @__PURE__ */ p(Et, { children: [
      /* @__PURE__ */ a(Tt, { asChild: !0, children: "command" in w ? /* @__PURE__ */ p(
        fp,
        {
          onClick: /* @__PURE__ */ n(() => {
            o(w);
          }, "onClick"),
          children: [
            w.iconPathBefore && /* @__PURE__ */ a(Ea, { icon: w.iconPathBefore, menuLabel: w.label, leading: !0 }),
            w.label,
            w.iconPathAfter && /* @__PURE__ */ a(Ea, { icon: w.iconPathAfter, menuLabel: w.label })
          ]
        },
        `menubar-item-${w.label}-${w.command}`
      ) : /* @__PURE__ */ p(vp, { children: [
        /* @__PURE__ */ a(bp, { children: w.label }),
        /* @__PURE__ */ a(xp, { children: ks(
          t,
          e,
          gs(t, w.id),
          o
        ) })
      ] }, `menubar-sub-${w.label}-${w.id}`) }),
      w.tooltip && /* @__PURE__ */ a(St, { children: w.tooltip })
    ] }, `tooltip-${w.label}-${"command" in w ? w.command : w.id}`)), d = [...l];
    return l.length > 0 && s < i.length - 1 && d.push(/* @__PURE__ */ a(mp, {}, `separator-${c}`)), d;
  });
}, "getMenubarContent");
function yp({
  menuData: t,
  onSelectMenuItem: e,
  onOpenChange: r,
  variant: o
}) {
  const i = U(void 0), c = U(void 0), s = U(void 0), l = U(void 0), d = U(void 0), w = /* @__PURE__ */ n((u) => {
    switch (u) {
      case "platform.app":
        return c;
      case "platform.window":
        return s;
      case "platform.layout":
        return l;
      case "platform.help":
        return d;
      default:
        return;
    }
  }, "getRefForColumn");
  if (ed(["alt", "alt+p", "alt+l", "alt+n", "alt+h"], (u, h) => {
    var v, y, f, R;
    u.preventDefault();
    const g = { key: "Escape", code: "Escape", keyCode: 27, bubbles: !0 }, m = { key: " ", code: "Space", keyCode: 32, bubbles: !0 };
    switch (h.hotkey) {
      case "alt":
        Ir(c, [g]);
        break;
      case "alt+p":
        (v = c.current) == null || v.focus(), Ir(c, [g, m]);
        break;
      case "alt+l":
        (y = s.current) == null || y.focus(), Ir(s, [g, m]);
        break;
      case "alt+n":
        (f = l.current) == null || f.focus(), Ir(l, [g, m]);
        break;
      case "alt+h":
        (R = d.current) == null || R.focus(), Ir(d, [g, m]);
        break;
    }
  }), X(() => {
    if (!r || !i.current) return;
    const u = new MutationObserver((m) => {
      m.forEach((v) => {
        if (v.attributeName === "data-state" && v.target instanceof HTMLElement) {
          const y = v.target.getAttribute("data-state");
          r(y === "open");
        }
      });
    });
    return i.current.querySelectorAll("[data-state]").forEach((m) => {
      u.observe(m, { attributes: !0 });
    }), () => u.disconnect();
  }, [r]), !!t)
    return /* @__PURE__ */ a(wp, { ref: i, className: "pr-twp tw:border-0 tw:bg-transparent", variant: o, children: Object.entries(t.columns).filter(([, u]) => typeof u == "object").sort(([, u], [, h]) => typeof u == "boolean" || typeof h == "boolean" ? 0 : u.order - h.order).map(([u, h]) => /* @__PURE__ */ p(up, { children: [
      /* @__PURE__ */ a(hp, { ref: w(u), children: typeof h == "object" && "label" in h && h.label }),
      /* @__PURE__ */ a(
        gp,
        {
          style: { zIndex: Ae },
          children: /* @__PURE__ */ a(It, { children: ks(t.groups, t.items, u, e) })
        }
      )
    ] }, u)) });
}
n(yp, "PlatformMenubar");
const kp = Object.freeze([950, 800, 700]);
function wg(t) {
  switch (t) {
    case void 0:
      return;
    case "darwin":
      return "tw:ps-[85px]";
    default:
      return "tw:pe-[calc(138px+1rem)]";
  }
}
n(wg, "getToolbarOSReservedSpaceClassName");
function ug({
  menuData: t,
  onOpenChange: e,
  onSelectMenuItem: r,
  className: o,
  id: i,
  children: c,
  appMenuAreaChildren: s,
  configAreaChildren: l,
  shouldUseAsAppDragArea: d,
  menubarVariant: w = "default"
}) {
  const [u, h] = N(void 0), g = F(
    (y) => h(y ?? void 0),
    []
  ), m = ms(u, kp), v = $i() ?? m;
  return /* @__PURE__ */ a(za.Provider, { value: v, children: /* @__PURE__ */ a(
    "div",
    {
      className: x("tw:border tw:px-4 tw:text-foreground", o),
      style: { position: "relative" },
      id: i,
      children: /* @__PURE__ */ p(
        "div",
        {
          "data-testid": "toolbar-content-row",
          className: "tw:flex tw:h-full tw:w-full tw:justify-between tw:overflow-hidden",
          ref: g,
          style: d ? { WebkitAppRegion: "drag" } : void 0,
          children: [
            /* @__PURE__ */ a("div", { className: "tw:flex tw:shrink-0 tw:grow tw:basis-0", children: /* @__PURE__ */ p(
              "div",
              {
                className: "tw:flex tw:items-center tw:gap-2",
                style: d ? { WebkitAppRegion: "no-drag" } : void 0,
                children: [
                  s,
                  t && /* @__PURE__ */ a(
                    yp,
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
                children: c
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
n(ug, "Toolbar");
const _p = /* @__PURE__ */ n((t, e) => t[e] ?? e, "localizeString");
function pg({
  knownUiLanguages: t,
  primaryLanguage: e = "en",
  fallbackLanguages: r = [],
  onLanguagesChange: o,
  onPrimaryLanguageChange: i,
  onFallbackLanguagesChange: c,
  localizedStrings: s,
  className: l,
  id: d
}) {
  const w = _p(
    s,
    "%settings_uiLanguageSelector_fallbackLanguages%"
  ), [u, h] = N(!1), g = /* @__PURE__ */ n((v) => {
    i && i(v), o && o([v, ...r.filter((y) => y !== v)]), c && r.find((y) => y === v) && c([...r.filter((y) => y !== v)]), h(!1);
  }, "handleLanguageChange"), m = /* @__PURE__ */ n((v, y) => {
    var R, _, E, T, A, S;
    const f = y !== v ? ((_ = (R = t[v]) == null ? void 0 : R.uiNames) == null ? void 0 : _[y]) ?? ((T = (E = t[v]) == null ? void 0 : E.uiNames) == null ? void 0 : T.en) : void 0;
    return f ? `${(A = t[v]) == null ? void 0 : A.autonym} (${f})` : (S = t[v]) == null ? void 0 : S.autonym;
  }, "getLanguageDisplayName");
  return /* @__PURE__ */ p("div", { id: d, className: x("pr-twp tw:max-w-sm", l), children: [
    /* @__PURE__ */ p(
      br,
      {
        name: "uiLanguage",
        value: e,
        onValueChange: g,
        open: u,
        onOpenChange: /* @__PURE__ */ n((v) => h(v), "onOpenChange"),
        children: [
          /* @__PURE__ */ a(yr, { children: /* @__PURE__ */ a(xr, {}) }),
          /* @__PURE__ */ a(
            kr,
            {
              style: { zIndex: Ae },
              children: Object.keys(t).map((v) => /* @__PURE__ */ a(fe, { value: v, children: m(v, e) }, v))
            }
          )
        ]
      }
    ),
    e !== "en" && /* @__PURE__ */ a("div", { className: "tw:pt-3", children: /* @__PURE__ */ a(Ot, { className: "tw:font-normal tw:text-muted-foreground", children: Ue(w, {
      fallbackLanguages: (r == null ? void 0 : r.length) > 0 ? r.map((v) => m(v, e)).join(", ") : t.en.autonym
    }) }) })
  ] });
}
n(pg, "UiLanguageSelector");
const hg = Object.freeze([
  "%firstRun_language_search_placeholder%",
  "%firstRun_language_noResults%",
  "%firstRun_language_selected%"
]);
function Np(t) {
  return [...t].sort(([e, r], [o, i]) => e === "en" && o !== "en" ? -1 : o === "en" && e !== "en" ? 1 : r.autonym.localeCompare(i.autonym));
}
n(Np, "sortLanguages");
function gg({
  languages: t,
  value: e,
  onChange: r,
  localizedStrings: o,
  className: i,
  id: c
}) {
  const [s, l] = N(""), d = L(
    () => Np(Object.entries(t)).map(([v, y]) => ({
      tag: v,
      info: y,
      keywords: [y.autonym, ...Object.values(y.uiNames ?? {}), ...y.otherNames ?? []]
    })),
    [t]
  ), w = L(() => {
    if (!s) return d;
    const v = s.toLowerCase();
    return d.filter(({ keywords: y }) => y.some((f) => f.toLowerCase().includes(v)));
  }, [d, s]), u = d.length > 1, h = o["%firstRun_language_search_placeholder%"] ?? "", g = o["%firstRun_language_noResults%"] ?? "", m = o["%firstRun_language_selected%"] ?? "";
  return /* @__PURE__ */ p(ar, { id: c, className: x("pr-twp", i), shouldFilter: !1, children: [
    u && // Plain <input> (not CommandPrimitive.Input) so cmdk cannot update this field after
    // item selection. Arrow-key and Enter events from here bubble to the Command root div
    // where cmdk's keydown handler picks them up for list navigation.
    /* @__PURE__ */ a("div", { "data-slot": "command-input-wrapper", className: "tw:p-1 tw:pb-0", children: /* @__PURE__ */ p(qs, { className: "tw:h-8! tw:rounded-lg! tw:border-input/30 tw:bg-input/30 tw:shadow-none! tw:*:data-[slot=input-group-addon]:ps-2!", children: [
      /* @__PURE__ */ a(
        "input",
        {
          "data-slot": "command-input",
          type: "text",
          placeholder: h,
          "aria-label": h,
          value: s,
          onChange: /* @__PURE__ */ n((v) => l(v.currentTarget.value), "onChange"),
          className: "tw:w-full tw:text-sm tw:outline-hidden tw:disabled:cursor-not-allowed tw:disabled:opacity-50"
        }
      ),
      /* @__PURE__ */ a(Gs, { children: /* @__PURE__ */ a(qc, { className: "tw:size-4 tw:shrink-0 tw:opacity-50" }) })
    ] }) }),
    /* @__PURE__ */ p(or, { children: [
      /* @__PURE__ */ a(Da, { children: g }),
      w.map(({ tag: v, info: y }) => {
        const f = v === e;
        return /* @__PURE__ */ p(
          Ye,
          {
            value: v,
            "aria-current": f ? "true" : void 0,
            "data-checked": f ? "true" : void 0,
            onSelect: /* @__PURE__ */ n(() => r(v), "onSelect"),
            children: [
              /* @__PURE__ */ a("span", { dir: "auto", children: y.autonym }),
              f && /* @__PURE__ */ a("span", { className: "tw:sr-only", children: m })
            ]
          },
          v
        );
      })
    ] })
  ] });
}
n(gg, "InterfaceLanguagePicker");
function Cp({ item: t, createLabel: e, createComplexLabel: r }) {
  return e ? /* @__PURE__ */ a(Ot, { children: e(t) }) : r ? /* @__PURE__ */ a(Ot, { children: r(t) }) : /* @__PURE__ */ a(Ot, { children: t });
}
n(Cp, "SmartLabel");
function Ep({
  id: t,
  className: e,
  listItems: r,
  selectedListItems: o,
  handleSelectListItem: i,
  createLabel: c,
  createComplexLabel: s
}) {
  return /* @__PURE__ */ a("div", { id: t, className: e, children: r.map((l) => /* @__PURE__ */ p("div", { className: "tw:m-2 tw:flex tw:items-center", children: [
    /* @__PURE__ */ a(
      us,
      {
        className: "tw:me-2 tw:align-middle",
        checked: o.includes(l),
        onCheckedChange: /* @__PURE__ */ n((d) => i(l, d), "onCheckedChange")
      }
    ),
    /* @__PURE__ */ a(
      Cp,
      {
        item: l,
        createLabel: c,
        createComplexLabel: s
      }
    )
  ] }, l)) });
}
n(Ep, "Checklist");
const fg = Ep;
function Tp(t, e) {
  const [r, o] = N(t), [i, c] = N(e);
  return t !== r && (o(t), t && c(e)), t ? e : i;
}
n(Tp, "useFrozenWhileClosed");
function mg({
  open: t,
  anchorRect: e,
  message: r,
  confirmingKeyLabel: o,
  side: i = "bottom",
  align: c = "start",
  showArrow: s = !0
}) {
  const l = t ? mn(r, { key: o }).join("") : "", {
    anchorRect: d,
    message: w,
    confirmingKeyLabel: u,
    showArrow: h
  } = Tp(t, { anchorRect: e, message: r, confirmingKeyLabel: o, showArrow: s });
  return /* @__PURE__ */ p(It, { children: [
    /* @__PURE__ */ a("span", { role: "status", className: "tw:sr-only", children: l }),
    /* @__PURE__ */ p(Et, { open: t, onOpenChange: /* @__PURE__ */ n(() => {
    }, "onOpenChange"), children: [
      /* @__PURE__ */ a(
        Tt,
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
        St,
        {
          side: i,
          align: c,
          showArrow: h,
          arrowPadding: 8,
          className: x(
            // Rely on TooltipContent's default tw:max-w-xs (320px) and normal wrapping: this hint's
            // text is short and usually fits on one line, but locale length varies (e.g. Spanish runs
            // longer than English), so allow it to wrap rather than force tw:whitespace-nowrap, which
            // could clip or overflow on a narrow webview.
            "tw:p-0 tw:has-data-[slot=kbd]:pe-0 tw:bg-background tw:text-destructive tw:border tw:border-destructive"
          ),
          arrowClassName: "tw:bg-[color-mix(in_oklab,var(--destructive)_10%,var(--background))] tw:fill-[color-mix(in_oklab,var(--destructive)_10%,var(--background))] tw:border tw:border-destructive",
          children: /* @__PURE__ */ a("div", { className: "tw:w-full tw:h-full tw:rounded-md tw:bg-destructive/10 tw:px-3 tw:py-1.5", children: mn(w, {
            key: /* @__PURE__ */ a(
              wo,
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
                children: u
              }
            )
          }).map((g, m) => (
            // The array is static per render (one fixed localized string + one kbd), so index is
            // a stable, safe key — same rationale as source-language-indexed-list.component.tsx's
            // disable.
            // eslint-disable-next-line react/no-array-index-key
            /* @__PURE__ */ a(Hr, { children: g }, `key-${m}`)
          )) })
        }
      )
    ] })
  ] });
}
n(mg, "DestructiveKeyConfirmation");
function vg({
  cardKey: t,
  isSelected: e,
  onSelect: r,
  isDenied: o,
  isHidden: i = !1,
  className: c,
  children: s,
  selectedButtons: l,
  hoverButtons: d,
  dropdownContent: w,
  additionalContent: u,
  accentColor: h,
  showDropdownOnHover: g = !1
}) {
  const m = /* @__PURE__ */ n((f) => {
    if (f.key === "Enter" || f.key === " ") {
      if (f.target !== f.currentTarget) return;
      f.preventDefault(), r();
    }
  }, "handleKeyDown"), [v, y] = N(!1);
  return /* @__PURE__ */ p(
    "div",
    {
      hidden: i,
      onClick: r,
      onKeyDown: m,
      onMouseEnter: /* @__PURE__ */ n(() => y(!0), "onMouseEnter"),
      onFocus: /* @__PURE__ */ n(() => y(!0), "onFocus"),
      role: "button",
      tabIndex: 0,
      "aria-pressed": e,
      className: x(
        "tw:group tw:relative tw:min-w-36 tw:rounded-xl tw:border tw:shadow-none tw:hover:bg-muted/50",
        { "tw:opacity-50 tw:hover:opacity-100": o && !e },
        { "tw:bg-accent": e },
        { "tw:bg-transparent": !e },
        c
      ),
      children: [
        /* @__PURE__ */ p("div", { className: "tw:flex tw:flex-col tw:gap-2 tw:p-4", children: [
          /* @__PURE__ */ p("div", { className: "tw:flex tw:justify-between tw:overflow-hidden", children: [
            /* @__PURE__ */ a("div", { className: "tw:min-w-0 tw:flex-1", children: s }),
            e && l,
            !e && d && /* @__PURE__ */ a("div", { className: "tw:invisible tw:group-hover:visible", children: d }),
            w && (e || g && v) && /* @__PURE__ */ a(
              "div",
              {
                className: x(
                  !e && g && "tw:invisible tw:group-hover:visible"
                ),
                children: /* @__PURE__ */ p(ze, { children: [
                  /* @__PURE__ */ a(_e, { className: x(h && "tw:me-1"), asChild: !0, children: /* @__PURE__ */ a(
                    Z,
                    {
                      className: "tw:m-1 tw:h-6 tw:w-6",
                      variant: "ghost",
                      size: "icon",
                      onClick: /* @__PURE__ */ n((f) => f.stopPropagation(), "onClick"),
                      onFocus: /* @__PURE__ */ n((f) => f.stopPropagation(), "onFocus"),
                      children: /* @__PURE__ */ a(Tc, {})
                    }
                  ) }),
                  /* @__PURE__ */ a(Pe, { align: "end", children: w })
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
n(vg, "ResultsCard");
function bg({
  id: t,
  isDisabled: e = !1,
  hasError: r = !1,
  isFullWidth: o = !1,
  helperText: i,
  label: c,
  placeholder: s,
  isRequired: l = !1,
  className: d,
  defaultValue: w,
  value: u,
  onChange: h,
  onFocus: g,
  onBlur: m
}) {
  return /* @__PURE__ */ p("div", { className: x("tw:inline-grid tw:items-center tw:gap-1.5", { "tw:w-full": o }), children: [
    /* @__PURE__ */ a(
      Ot,
      {
        htmlFor: t,
        className: x({
          "tw:text-red-600": r,
          "tw:hidden": !c
        }),
        children: `${c}${l ? "*" : ""}`
      }
    ),
    /* @__PURE__ */ a(
      Ma,
      {
        id: t,
        disabled: e,
        placeholder: s,
        required: l,
        className: x(d, { "tw:border-red-600": r }),
        defaultValue: w,
        value: u,
        onChange: h,
        onFocus: g,
        onBlur: m
      }
    ),
    /* @__PURE__ */ a("p", { className: x({ "tw:hidden": !i }), children: i })
  ] });
}
n(bg, "TextField");
function xg({ currentStep: t, totalSteps: e, locale: r }) {
  const o = r || "en", i = L(() => {
    const l = new gi(o);
    return (d) => l.format(d);
  }, [o]), c = Math.min(Math.max(t, 1), e), s = Array.from({ length: e }, (l, d) => d + 1);
  return /* @__PURE__ */ a("div", { className: "tw:flex tw:items-center", "aria-hidden": "true", children: s.map((l) => {
    let d = "upcoming";
    return l === c ? d = "active" : l < c && (d = "complete"), /* @__PURE__ */ p(Hr, { children: [
      l > 1 && /* @__PURE__ */ a("div", { className: "tw:h-px tw:flex-1 tw:bg-border" }),
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
          children: d === "complete" ? /* @__PURE__ */ a(qe, { className: "tw:h-4 tw:w-4" }) : i(l)
        }
      )
    ] }, l);
  }) });
}
n(xg, "WizardStepper");
function yg({ ...t }) {
  return /* @__PURE__ */ a(Ut.Root, { "data-slot": "context-menu", ...t });
}
n(yg, "ContextMenu");
function kg({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    Ut.Trigger,
    {
      "data-slot": "context-menu-trigger",
      className: x("tw:select-none", t),
      ...e
    }
  );
}
n(kg, "ContextMenuTrigger");
function _g({ ...t }) {
  return /* @__PURE__ */ a(Ut.Group, { "data-slot": "context-menu-group", ...t });
}
n(_g, "ContextMenuGroup");
function Ng({ ...t }) {
  return /* @__PURE__ */ a(Ut.Portal, { "data-slot": "context-menu-portal", ...t });
}
n(Ng, "ContextMenuPortal");
function Cg({ ...t }) {
  return /* @__PURE__ */ a(Ut.Sub, { "data-slot": "context-menu-sub", ...t });
}
n(Cg, "ContextMenuSub");
function Eg({
  ...t
}) {
  return /* @__PURE__ */ a(Ut.RadioGroup, { "data-slot": "context-menu-radio-group", ...t });
}
n(Eg, "ContextMenuRadioGroup");
function Tg({
  className: t,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: e,
  ...r
}) {
  return /* @__PURE__ */ a(Ut.Portal, { children: /* @__PURE__ */ a(
    Ut.Content,
    {
      "data-slot": "context-menu-content",
      className: x(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        // CUSTOM: Fixed tw: prefix not being on some classes and removed erroneous empty tw: tokens
        // CUSTOM: Removed tw:z-50 to use the shared z-index constant below (see style prop)
        "pr-twp tw:max-h-(--radix-context-menu-content-available-height) tw:min-w-36 tw:origin-(--radix-context-menu-content-transform-origin) tw:overflow-x-hidden tw:overflow-y-auto tw:rounded-lg tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95 tw:animate-none! tw:bg-popover/70 tw:before:-z-1 tw:**:data-[slot$=-item]:focus:bg-foreground/10 tw:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 tw:**:data-[slot$=-separator]:bg-foreground/5 tw:**:data-[slot$=-trigger]:focus:bg-foreground/10 tw:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! tw:**:data-[variant=destructive]:focus:bg-foreground/10! tw:**:data-[variant=destructive]:text-accent-foreground! tw:**:data-[variant=destructive]:**:text-accent-foreground! tw:relative tw:before:pointer-events-none tw:before:absolute tw:before:inset-0 tw:before:rounded-[inherit] tw:before:backdrop-blur-2xl tw:before:backdrop-saturate-150",
        t
      ),
      style: { zIndex: Ae, ...e },
      ...r
    }
  ) });
}
n(Tg, "ContextMenuContent");
function Sg({
  className: t,
  inset: e,
  variant: r = "default",
  ...o
}) {
  return /* @__PURE__ */ a(
    Ut.Item,
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
n(Sg, "ContextMenuItem");
function Rg({
  className: t,
  inset: e,
  children: r,
  ...o
}) {
  return /* @__PURE__ */ p(
    Ut.SubTrigger,
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
        /* @__PURE__ */ a(vi, { className: "tw:ms-auto" })
      ]
    }
  );
}
n(Rg, "ContextMenuSubTrigger");
function Dg({
  className: t,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: e,
  ...r
}) {
  return /* @__PURE__ */ a(
    Ut.SubContent,
    {
      "data-slot": "context-menu-sub-content",
      className: x(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        // CUSTOM: Fixed tw: prefix not being on some classes and removed erroneous empty tw: tokens
        // CUSTOM: Removed tw:z-50 to use the shared z-index constant below (see style prop), keeping
        // submenus on the same above-dock layer as their parent ContextMenuContent (PT-3877)
        "pr-twp tw:min-w-32 tw:origin-(--radix-context-menu-content-transform-origin) tw:overflow-hidden tw:rounded-lg tw:border tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-lg tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95 tw:animate-none! tw:bg-popover/70 tw:before:-z-1 tw:**:data-[slot$=-item]:focus:bg-foreground/10 tw:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 tw:**:data-[slot$=-separator]:bg-foreground/5 tw:**:data-[slot$=-trigger]:focus:bg-foreground/10 tw:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! tw:**:data-[variant=destructive]:focus:bg-foreground/10! tw:**:data-[variant=destructive]:text-accent-foreground! tw:**:data-[variant=destructive]:**:text-accent-foreground! tw:relative tw:before:pointer-events-none tw:before:absolute tw:before:inset-0 tw:before:rounded-[inherit] tw:before:backdrop-blur-2xl tw:before:backdrop-saturate-150",
        t
      ),
      style: { zIndex: Ae, ...e },
      ...r
    }
  );
}
n(Dg, "ContextMenuSubContent");
function Mg({
  className: t,
  children: e,
  checked: r,
  inset: o,
  ...i
}) {
  return /* @__PURE__ */ p(
    Ut.CheckboxItem,
    {
      "data-slot": "context-menu-checkbox-item",
      "data-inset": o,
      className: x(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      checked: r,
      ...i,
      children: [
        /* @__PURE__ */ a("span", { className: "tw:pointer-events-none tw:absolute tw:end-2", children: /* @__PURE__ */ a(Ut.ItemIndicator, { children: /* @__PURE__ */ a(Ia, {}) }) }),
        e
      ]
    }
  );
}
n(Mg, "ContextMenuCheckboxItem");
function Og({
  className: t,
  children: e,
  inset: r,
  ...o
}) {
  return /* @__PURE__ */ p(
    Ut.RadioItem,
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
        /* @__PURE__ */ a("span", { className: "tw:pointer-events-none tw:absolute tw:end-2", children: /* @__PURE__ */ a(Ut.ItemIndicator, { children: /* @__PURE__ */ a(Ia, {}) }) }),
        e
      ]
    }
  );
}
n(Og, "ContextMenuRadioItem");
function Ig({
  className: t,
  inset: e,
  ...r
}) {
  return /* @__PURE__ */ a(
    Ut.Label,
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
n(Ig, "ContextMenuLabel");
function zg({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    Ut.Separator,
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
n(zg, "ContextMenuSeparator");
function Pg({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "span",
    {
      "data-slot": "context-menu-shortcut",
      className: x(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; tw:ms-auto uses logical margin for RTL support
        "pr-twp tw:ms-auto tw:text-xs tw:tracking-widest tw:text-muted-foreground tw:group-focus/context-menu-item:text-accent-foreground",
        t
      ),
      ...e
    }
  );
}
n(Pg, "ContextMenuShortcut");
function Ag({ ...t }) {
  return /* @__PURE__ */ a(We.Root, { "data-slot": "drawer", ...t });
}
n(Ag, "Drawer");
function $g({ ...t }) {
  return /* @__PURE__ */ a(We.Trigger, { "data-slot": "drawer-trigger", ...t });
}
n($g, "DrawerTrigger");
function Sp({ ...t }) {
  return /* @__PURE__ */ a(We.Portal, { "data-slot": "drawer-portal", ...t });
}
n(Sp, "DrawerPortal");
function Vg({ ...t }) {
  return /* @__PURE__ */ a(We.Close, { "data-slot": "drawer-close", ...t });
}
n(Vg, "DrawerClose");
function Rp({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    We.Overlay,
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
n(Rp, "DrawerOverlay");
function Lg({
  className: t,
  children: e,
  // CUSTOM: Destructure hideDrawerHandle to conditionally render the drag handle
  hideDrawerHandle: r = !1,
  ...o
}) {
  const i = Ee();
  return /* @__PURE__ */ p(Sp, { "data-slot": "drawer-portal", children: [
    /* @__PURE__ */ a(Rp, {}),
    /* @__PURE__ */ p(
      We.Content,
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
          /* @__PURE__ */ a("div", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:flex-col", dir: i, children: e }),
          !r && /* @__PURE__ */ a("div", { className: "tw:hidden tw:shrink-0 tw:rounded-full tw:bg-muted tw:group-data-[vaul-drawer-direction=top]/drawer-content:mx-auto tw:group-data-[vaul-drawer-direction=top]/drawer-content:mb-4 tw:group-data-[vaul-drawer-direction=top]/drawer-content:h-1.5 tw:group-data-[vaul-drawer-direction=top]/drawer-content:w-[100px] tw:group-data-[vaul-drawer-direction=top]/drawer-content:block tw:group-data-[vaul-drawer-direction=left]/drawer-content:my-auto tw:group-data-[vaul-drawer-direction=left]/drawer-content:me-4 tw:group-data-[vaul-drawer-direction=left]/drawer-content:h-[100px] tw:group-data-[vaul-drawer-direction=left]/drawer-content:w-1.5 tw:group-data-[vaul-drawer-direction=left]/drawer-content:block" })
        ]
      }
    )
  ] });
}
n(Lg, "DrawerContent");
function Bg({ className: t, ...e }) {
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
n(Bg, "DrawerHeader");
function jg({ className: t, ...e }) {
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
n(jg, "DrawerFooter");
function Fg({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    We.Title,
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
n(Fg, "DrawerTitle");
function Ug({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    We.Description,
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
n(Ug, "DrawerDescription");
function Kg({
  className: t,
  value: e,
  ...r
}) {
  return /* @__PURE__ */ a(
    _n.Root,
    {
      "data-slot": "progress",
      className: x(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:relative tw:flex tw:h-1 tw:w-full tw:items-center tw:overflow-x-hidden tw:rounded-full tw:bg-muted",
        t
      ),
      ...r,
      children: /* @__PURE__ */ a(
        _n.Indicator,
        {
          "data-slot": "progress-indicator",
          className: "tw:size-full tw:flex-1 tw:bg-primary tw:transition-all",
          style: { transform: `translateX(-${100 - (e || 0)}%)` }
        }
      )
    }
  );
}
n(Kg, "Progress");
function Hg({ ...t }) {
  const { theme: e = "system" } = rd();
  return /* @__PURE__ */ a(
    ad,
    {
      theme: e === "light" || e === "dark" || e === "system" ? e : "system",
      className: "tw:toaster tw:group",
      icons: {
        success: /* @__PURE__ */ a(Jc, { className: "tw:size-4" }),
        info: /* @__PURE__ */ a(Xc, { className: "tw:size-4" }),
        warning: /* @__PURE__ */ a(Wc, { className: "tw:size-4" }),
        error: /* @__PURE__ */ a(Yc, { className: "tw:size-4" }),
        loading: /* @__PURE__ */ a(Gc, { className: "tw:size-4 tw:animate-spin" })
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
n(Hg, "Toaster");
function qg({
  className: t,
  defaultValue: e,
  value: r,
  min: o = 0,
  max: i = 100,
  ...c
}) {
  const s = Ee(), l = Jt.useMemo(
    () => Array.isArray(r) ? r : Array.isArray(e) ? e : [o, i],
    [r, e, o, i]
  );
  return /* @__PURE__ */ p(
    ta.Root,
    {
      "data-slot": "slider",
      defaultValue: e,
      value: r,
      min: o,
      max: i,
      className: x(
        "pr-twp tw:relative tw:flex tw:w-full tw:touch-none tw:items-center tw:select-none tw:data-disabled:opacity-50 tw:data-vertical:h-full tw:data-vertical:min-h-40 tw:data-vertical:w-auto tw:data-vertical:flex-col",
        t
      ),
      dir: s,
      ...c,
      children: [
        /* @__PURE__ */ a(
          ta.Track,
          {
            "data-slot": "slider-track",
            className: "tw:relative tw:grow tw:overflow-hidden tw:rounded-full tw:bg-muted tw:data-horizontal:h-1 tw:data-horizontal:w-full tw:data-vertical:h-full tw:data-vertical:w-1",
            children: /* @__PURE__ */ a(
              ta.Range,
              {
                "data-slot": "slider-range",
                className: "tw:absolute tw:bg-primary tw:select-none tw:data-horizontal:h-full tw:data-vertical:w-full"
              }
            )
          }
        ),
        Array.from({ length: l.length }, (d, w) => /* @__PURE__ */ a(
          ta.Thumb,
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
n(qg, "Slider");
function Gg({
  className: t,
  size: e = "default",
  ...r
}) {
  return /* @__PURE__ */ a(
    Nn.Root,
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
        Nn.Thumb,
        {
          "data-slot": "switch-thumb",
          className: "tw:pointer-events-none tw:block tw:rounded-full tw:bg-background tw:ring-0 tw:transition-transform tw:group-data-[size=default]/switch:size-4 tw:group-data-[size=sm]/switch:size-3 tw:group-data-[size=default]/switch:data-checked:translate-x-[calc(100%-2px)] tw:rtl:group-data-[size=default]/switch:data-checked:-translate-x-[calc(100%-2px)] tw:group-data-[size=sm]/switch:data-checked:translate-x-[calc(100%-2px)] tw:rtl:group-data-[size=sm]/switch:data-checked:-translate-x-[calc(100%-2px)] tw:dark:data-checked:bg-primary-foreground tw:group-data-[size=default]/switch:data-unchecked:translate-x-0 tw:rtl:group-data-[size=default]/switch:data-unchecked:-translate-x-0 tw:group-data-[size=sm]/switch:data-unchecked:translate-x-0 tw:rtl:group-data-[size=sm]/switch:data-unchecked:-translate-x-0 tw:dark:data-unchecked:bg-foreground"
        }
      )
    }
  );
}
n(Gg, "Switch");
function Yg({
  className: t,
  orientation: e = "horizontal",
  ...r
}) {
  return /* @__PURE__ */ a(
    me.Root,
    {
      "data-slot": "tabs",
      "data-orientation": e,
      className: x("tw:group/tabs tw:flex tw:gap-2 tw:data-horizontal:flex-col", t),
      ...r
    }
  );
}
n(Yg, "Tabs");
const Dp = zi(
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
function Wg({
  className: t,
  variant: e = "default",
  ...r
}) {
  const o = Ee();
  return /* @__PURE__ */ a(
    me.List,
    {
      "data-slot": "tabs-list",
      "data-variant": e,
      className: x("pr-twp", Dp({ variant: e }), t),
      dir: o,
      ...r
    }
  );
}
n(Wg, "TabsList");
function Xg({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    me.Trigger,
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
n(Xg, "TabsTrigger");
function Jg({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    me.Content,
    {
      "data-slot": "tabs-content",
      className: x("pr-twp tw:flex-1 tw:text-sm tw:outline-none", t),
      ...e
    }
  );
}
n(Jg, "TabsContent");
const Zg = /* @__PURE__ */ n((t, e) => {
  X(() => {
    if (!t) return;
    let r = !1;
    const i = t(/* @__PURE__ */ n((c) => {
      r || e(c);
    }, "guardedHandler"));
    return () => {
      r = !0;
      try {
        i();
      } catch (c) {
        console.error("useEvent: error while unsubscribing from event", c);
      }
    };
  }, [t, e]);
}, "useEvent"), Qg = /* @__PURE__ */ n((t, e) => {
  X(() => {
    if (!t) return;
    let r = !1, o, i = !1;
    const c = /* @__PURE__ */ n((l) => {
      r || e(l);
    }, "guardedHandler"), s = /* @__PURE__ */ n(() => {
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
        o = await Promise.resolve(t(c)), r && s();
      } catch (l) {
        console.error("useEventAsync: error while subscribing to event", l);
      }
    })(), () => {
      r = !0, s();
    };
  }, [t, e]);
}, "useEventAsync");
function Mp(t) {
  return {
    preserveValue: !0,
    ...t
  };
}
n(Mp, "getUsePromiseOptionsDefaults");
const Op = /* @__PURE__ */ n((t, e, r = {}) => {
  const o = U(e);
  o.current = e;
  const i = U(r);
  i.current = Mp(i.current);
  const [c, s] = N(() => o.current), [l, d] = N(!0);
  return X(() => {
    let w = !0;
    return d(!!t), (async () => {
      if (t)
        try {
          const u = await t();
          w && (s(() => u), d(!1));
        } catch (u) {
          w && d(!1), console.error(
            "usePromise: the promise factory rejected, so there is no new value",
            u
          );
        }
    })(), () => {
      w = !1, i.current.preserveValue || s(() => o.current);
    };
  }, [t]), [c, l];
}, "usePromise"), tf = /* @__PURE__ */ n((t) => {
  const [e, r] = N(!1), [o, i] = N(!1), [c, s] = N(0), l = U(void 0), d = L(() => {
    if (!t) return;
    const g = /* @__PURE__ */ n(async () => {
      try {
        const m = await t();
        return l.current === g && (r(!1), i(!0)), m;
      } catch (m) {
        throw l.current === g && (r(!0), i(!0)), m;
      }
    }, "wrapped");
    return g;
  }, [t, c]);
  X(() => {
    l.current = d, r(!1), i(!d);
  }, [d]);
  const [w, u] = Op(d, void 0), h = F(() => {
    l.current && (r(!1), i(!1), s((g) => g + 1));
  }, []);
  return L(
    () => ({ data: w, isLoading: u, hasError: e, hasSettled: o, refetch: h }),
    [w, u, e, o, h]
  );
}, "useRetryablePromise");
function ef(t) {
  X(() => {
    let e;
    return t && (e = document.createElement("style"), e.appendChild(document.createTextNode(t)), document.head.appendChild(e)), () => {
      e && document.head.removeChild(e);
    };
  }, [t]);
}
n(ef, "useStylesheet");
function rf(t) {
  const e = L(() => Vc(t).slice().sort().join(" "), [t]);
  return L(() => e ? e.split(" ") : [], [e]);
}
n(rf, "useExtraValidMarkers");
const Ip = /* @__PURE__ */ n(() => {
  const [t, e] = N(
    () => document.body.getBoundingClientRect().height > 0
  );
  return X(() => {
    const r = new IntersectionObserver((o) => {
      const i = o[o.length - 1];
      i && e(i.isIntersecting);
    });
    return r.observe(document.body), () => {
      r.disconnect();
    };
  }, []), t;
}, "useViewVisibility");
function af(t, e) {
  const [r, o] = N(!1), i = U(e);
  i.current = e;
  const c = U(t);
  c.current = t;
  const s = F(() => {
    c.current ? i.current() : o(!0);
  }, []);
  return X(() => {
    !t || !r || (o(!1), i.current());
  }, [t, r]), s;
}
n(af, "useRunWhenVisible");
function zp(t, e, r) {
  return t ? r.dark : e === void 0 ? r.lightDefault : r.lightUnselected;
}
n(zp, "pickTabIconUrl");
function of(t, e) {
  const r = Ip();
  return zp(t, r, e);
}
n(of, "useTabIconSelection");
function nf({ value: t, children: e }) {
  return /* @__PURE__ */ a(Ai.Provider, { value: t, children: /* @__PURE__ */ a(za.Provider, { value: t, children: e }) });
}
n(nf, "ShrinkStepOverride");
const sf = 300;
function Pp(t, e = "top") {
  if (!t || typeof document > "u") return;
  const r = document.head || document.querySelector("head"), o = r.querySelector(":first-child"), i = document.createElement("style");
  i.appendChild(document.createTextNode(t)), e === "top" && o ? r.insertBefore(i, o) : r.appendChild(i);
}
n(Pp, "injectStyle");
Pp(`/* By default the editor is too tall for the footnote editor, even while empty, so this makes it
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
@layer properties{@supports (((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))){*,:before,:after,::backdrop{--tw-translate-x:0;--tw-translate-y:0;--tw-translate-z:0;--tw-rotate-x:initial;--tw-rotate-y:initial;--tw-rotate-z:initial;--tw-skew-x:initial;--tw-skew-y:initial;--tw-space-y-reverse:0;--tw-space-x-reverse:0;--tw-divide-x-reverse:0;--tw-border-style:solid;--tw-divide-y-reverse:0;--tw-leading:initial;--tw-font-weight:initial;--tw-tracking:initial;--tw-ordinal:initial;--tw-slashed-zero:initial;--tw-numeric-figure:initial;--tw-numeric-spacing:initial;--tw-numeric-fraction:initial;--tw-shadow:0 0 #0000;--tw-shadow-color:initial;--tw-shadow-alpha:100%;--tw-inset-shadow:0 0 #0000;--tw-inset-shadow-color:initial;--tw-inset-shadow-alpha:100%;--tw-ring-color:initial;--tw-ring-shadow:0 0 #0000;--tw-inset-ring-color:initial;--tw-inset-ring-shadow:0 0 #0000;--tw-ring-inset:initial;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-offset-shadow:0 0 #0000;--tw-blur:initial;--tw-brightness:initial;--tw-contrast:initial;--tw-grayscale:initial;--tw-hue-rotate:initial;--tw-invert:initial;--tw-opacity:initial;--tw-saturate:initial;--tw-sepia:initial;--tw-drop-shadow:initial;--tw-drop-shadow-color:initial;--tw-drop-shadow-alpha:100%;--tw-drop-shadow-size:initial;--tw-duration:initial;--tw-ease:initial;--tw-content:"";--tw-backdrop-blur:initial;--tw-backdrop-brightness:initial;--tw-backdrop-contrast:initial;--tw-backdrop-grayscale:initial;--tw-backdrop-hue-rotate:initial;--tw-backdrop-invert:initial;--tw-backdrop-opacity:initial;--tw-backdrop-saturate:initial;--tw-backdrop-sepia:initial;--tw-outline-style:solid;--tw-animation-delay:0s;--tw-animation-direction:normal;--tw-animation-duration:initial;--tw-animation-fill-mode:none;--tw-animation-iteration-count:1;--tw-enter-blur:0;--tw-enter-opacity:1;--tw-enter-rotate:0;--tw-enter-scale:1;--tw-enter-translate-x:0;--tw-enter-translate-y:0;--tw-exit-blur:0;--tw-exit-opacity:1;--tw-exit-rotate:0;--tw-exit-scale:1;--tw-exit-translate-x:0;--tw-exit-translate-y:0}}}@layer theme{:root,:host{--tw-font-mono:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;--tw-color-red-100:oklch(93.6% .032 17.717);--tw-color-red-200:oklch(88.5% .062 18.334);--tw-color-red-300:oklch(80.8% .114 19.571);--tw-color-red-400:oklch(70.4% .191 22.216);--tw-color-red-500:oklch(63.7% .237 25.331);--tw-color-red-600:oklch(57.7% .245 27.325);--tw-color-red-700:oklch(50.5% .213 27.518);--tw-color-red-800:oklch(44.4% .177 26.899);--tw-color-orange-100:oklch(95.4% .038 75.164);--tw-color-orange-800:oklch(47% .157 37.304);--tw-color-amber-200:oklch(92.4% .12 95.746);--tw-color-amber-400:oklch(82.8% .189 84.429);--tw-color-amber-500:oklch(76.9% .188 70.08);--tw-color-amber-600:oklch(66.6% .179 58.318);--tw-color-yellow-50:oklch(98.7% .026 102.212);--tw-color-yellow-100:oklch(97.3% .071 103.193);--tw-color-yellow-400:oklch(85.2% .199 91.936);--tw-color-yellow-500:oklch(79.5% .184 86.047);--tw-color-yellow-600:oklch(68.1% .162 75.834);--tw-color-yellow-700:oklch(55.4% .135 66.442);--tw-color-green-50:oklch(98.2% .018 155.826);--tw-color-green-100:oklch(96.2% .044 156.743);--tw-color-green-500:oklch(72.3% .219 149.579);--tw-color-green-600:oklch(62.7% .194 149.214);--tw-color-green-700:oklch(52.7% .154 150.069);--tw-color-green-800:oklch(44.8% .119 151.328);--tw-color-teal-400:oklch(77.7% .152 181.912);--tw-color-teal-500:oklch(70.4% .14 182.503);--tw-color-teal-600:oklch(60% .118 184.704);--tw-color-sky-400:oklch(74.6% .16 232.661);--tw-color-sky-500:oklch(68.5% .169 237.323);--tw-color-sky-600:oklch(58.8% .158 241.966);--tw-color-blue-50:oklch(97% .014 254.604);--tw-color-blue-100:oklch(93.2% .032 255.585);--tw-color-blue-400:oklch(70.7% .165 254.624);--tw-color-blue-500:oklch(62.3% .214 259.815);--tw-color-blue-600:oklch(54.6% .245 262.881);--tw-color-blue-800:oklch(42.4% .199 265.638);--tw-color-indigo-200:oklch(87% .065 274.039);--tw-color-purple-50:oklch(97.7% .014 308.299);--tw-color-purple-200:oklch(90.2% .063 306.703);--tw-color-purple-900:oklch(38.1% .176 304.987);--tw-color-rose-400:oklch(71.2% .194 13.428);--tw-color-rose-500:oklch(64.5% .246 16.439);--tw-color-rose-600:oklch(58.6% .253 17.585);--tw-color-slate-300:oklch(86.9% .022 252.894);--tw-color-slate-400:oklch(70.4% .04 256.788);--tw-color-slate-900:oklch(20.8% .042 265.755);--tw-color-gray-50:oklch(98.5% .002 247.839);--tw-color-gray-100:oklch(96.7% .003 264.542);--tw-color-gray-300:oklch(87.2% .01 258.338);--tw-color-gray-500:oklch(55.1% .027 264.364);--tw-color-gray-600:oklch(44.6% .03 256.802);--tw-color-gray-700:oklch(37.3% .034 259.733);--tw-color-gray-800:oklch(27.8% .033 256.848);--tw-color-zinc-400:oklch(70.5% .015 286.067);--tw-color-neutral-300:oklch(87% 0 0);--tw-color-black:#000;--tw-color-white:#fff;--tw-container-xs:20rem;--tw-container-sm:24rem;--tw-container-md:28rem;--tw-container-lg:32rem;--tw-container-2xl:42rem;--tw-container-3xl:48rem;--tw-container-4xl:56rem;--tw-container-6xl:72rem;--tw-text-xs:.75rem;--tw-text-xs--line-height:calc(1 / .75);--tw-text-sm:.875rem;--tw-text-sm--line-height:calc(1.25 / .875);--tw-text-base:1rem;--tw-text-base--line-height:calc(1.5 / 1);--tw-text-lg:1.125rem;--tw-text-lg--line-height:calc(1.75 / 1.125);--tw-text-xl:1.25rem;--tw-text-xl--line-height:calc(1.75 / 1.25);--tw-text-2xl:1.5rem;--tw-text-2xl--line-height:calc(2 / 1.5);--tw-text-3xl:1.875rem;--tw-text-3xl--line-height:calc(2.25 / 1.875);--tw-text-4xl:2.25rem;--tw-text-4xl--line-height:calc(2.5 / 2.25);--tw-text-5xl:3rem;--tw-text-5xl--line-height:1;--tw-font-weight-normal:400;--tw-font-weight-medium:500;--tw-font-weight-semibold:600;--tw-font-weight-bold:700;--tw-font-weight-extrabold:800;--tw-tracking-tight:-.025em;--tw-tracking-wider:.05em;--tw-tracking-widest:.1em;--tw-leading-tight:1.25;--tw-leading-snug:1.375;--tw-leading-relaxed:1.625;--tw-leading-loose:2;--tw-radius-xs:.125rem;--tw-radius-md:calc(var(--radius) * .8);--tw-drop-shadow-sm:0 1px 2px #00000026;--tw-animate-spin:spin 1s linear infinite;--tw-animate-pulse:pulse 2s cubic-bezier(.4, 0, .6, 1) infinite;--tw-blur-xs:4px;--tw-blur-2xl:40px;--tw-default-transition-duration:.15s;--tw-default-transition-timing-function:cubic-bezier(.4, 0, .2, 1);--tw-default-font-family:"IBM Plex Sans Variable", sans-serif;--tw-default-mono-font-family:var(--tw-font-mono)}}@layer base{.pr-twp,.pr-twp *{border-color:var(--border);outline-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.pr-twp,.pr-twp *{outline-color:color-mix(in oklab, var(--ring) 50%, transparent)}}body.pr-twp{background-color:var(--background);color:var(--foreground)}html.pr-twp{font-family:IBM Plex Sans Variable,sans-serif}:where(.pr-twp,.pr-twp *),:where(.pr-twp,.pr-twp *):after,:where(.pr-twp,.pr-twp *):before,:where(.pr-twp,.pr-twp *) ::backdrop{box-sizing:border-box;border:0 solid;margin:0;padding:0}:where(.pr-twp,.pr-twp *) ::file-selector-button{box-sizing:border-box;border:0 solid;margin:0;padding:0}.pr-twp{-webkit-text-size-adjust:100%;tab-size:4;line-height:1.5;font-family:var(--tw-default-font-family,ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");font-feature-settings:var(--tw-default-font-feature-settings,normal);font-variation-settings:var(--tw-default-font-variation-settings,normal);-webkit-tap-highlight-color:transparent}hr:where(.pr-twp,.pr-twp *){height:0;color:inherit;border-top-width:1px}abbr:where([title]):where(.pr-twp,.pr-twp *){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1:where(.pr-twp,.pr-twp *),h2:where(.pr-twp,.pr-twp *),h3:where(.pr-twp,.pr-twp *),h4:where(.pr-twp,.pr-twp *),h5:where(.pr-twp,.pr-twp *),h6:where(.pr-twp,.pr-twp *){font-size:inherit;font-weight:inherit}a:where(.pr-twp,.pr-twp *){color:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b:where(.pr-twp,.pr-twp *),strong:where(.pr-twp,.pr-twp *){font-weight:bolder}code:where(.pr-twp,.pr-twp *),kbd:where(.pr-twp,.pr-twp *),samp:where(.pr-twp,.pr-twp *),pre:where(.pr-twp,.pr-twp *){font-family:var(--tw-default-mono-font-family,ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace);font-feature-settings:var(--tw-default-mono-font-feature-settings,normal);font-variation-settings:var(--tw-default-mono-font-variation-settings,normal);font-size:1em}small:where(.pr-twp,.pr-twp *){font-size:80%}sub:where(.pr-twp,.pr-twp *),sup:where(.pr-twp,.pr-twp *){vertical-align:baseline;font-size:75%;line-height:0;position:relative}sub:where(.pr-twp,.pr-twp *){bottom:-.25em}sup:where(.pr-twp,.pr-twp *){top:-.5em}table:where(.pr-twp,.pr-twp *){text-indent:0;border-color:inherit;border-collapse:collapse}:-moz-focusring:where(.pr-twp,.pr-twp *){outline:auto}progress:where(.pr-twp,.pr-twp *){vertical-align:baseline}summary:where(.pr-twp,.pr-twp *){display:list-item}ol:where(.pr-twp,.pr-twp *),ul:where(.pr-twp,.pr-twp *),menu:where(.pr-twp,.pr-twp *){list-style:none}img:where(.pr-twp,.pr-twp *),svg:where(.pr-twp,.pr-twp *),video:where(.pr-twp,.pr-twp *),canvas:where(.pr-twp,.pr-twp *),audio:where(.pr-twp,.pr-twp *),iframe:where(.pr-twp,.pr-twp *),embed:where(.pr-twp,.pr-twp *),object:where(.pr-twp,.pr-twp *){vertical-align:middle;display:block}img:where(.pr-twp,.pr-twp *),video:where(.pr-twp,.pr-twp *){max-width:100%;height:auto}button:where(.pr-twp,.pr-twp *),input:where(.pr-twp,.pr-twp *),select:where(.pr-twp,.pr-twp *),optgroup:where(.pr-twp,.pr-twp *),textarea:where(.pr-twp,.pr-twp *){font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(.pr-twp,.pr-twp *) ::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(select:is([multiple],[size])) optgroup:where(.pr-twp,.pr-twp *){font-weight:bolder}:where(select:is([multiple],[size])) optgroup option:where(.pr-twp,.pr-twp *){padding-inline-start:20px}:where(.pr-twp,.pr-twp *) ::file-selector-button{margin-inline-end:4px}:where(.pr-twp,.pr-twp *) ::placeholder{opacity:1}@supports (not ((-webkit-appearance:-apple-pay-button))) or (contain-intrinsic-size:1px){:where(.pr-twp,.pr-twp *) ::placeholder{color:currentColor}@supports (color:color-mix(in lab, red, red)){:where(.pr-twp,.pr-twp *) ::placeholder{color:color-mix(in oklab, currentcolor 50%, transparent)}}}textarea:where(.pr-twp,.pr-twp *){resize:vertical}:where(.pr-twp,.pr-twp *) ::-webkit-search-decoration{-webkit-appearance:none}:where(.pr-twp,.pr-twp *) ::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit{display:inline-flex}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-fields-wrapper{padding:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-year-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-month-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-day-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-hour-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-minute-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-second-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-millisecond-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-meridiem-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-calendar-picker-indicator{line-height:1}:-moz-ui-invalid:where(.pr-twp,.pr-twp *){box-shadow:none}button:where(.pr-twp,.pr-twp *),input:where([type=button],[type=reset],[type=submit]):where(.pr-twp,.pr-twp *){appearance:button}:where(.pr-twp,.pr-twp *) ::file-selector-button{appearance:button}:where(.pr-twp,.pr-twp *) ::-webkit-inner-spin-button{height:auto}:where(.pr-twp,.pr-twp *) ::-webkit-outer-spin-button{height:auto}[hidden]:where(:not([hidden=until-found])):where(.pr-twp,.pr-twp *){display:none!important}}@layer components;@layer utilities{.tw\\:\\@container\\/card-header{container:card-header/inline-size}.tw\\:\\@container\\/search{container:search/inline-size}.tw\\:\\@container\\/toolbar{container:toolbar/inline-size}.tw\\:pointer-events-auto{pointer-events:auto}.tw\\:pointer-events-none{pointer-events:none}.tw\\:invisible{visibility:hidden}.tw\\:sr-only{clip-path:inset(50%);white-space:nowrap;border-width:0;width:1px;height:1px;margin:-1px;padding:0;position:absolute;overflow:hidden}.tw\\:absolute{position:absolute}.tw\\:fixed{position:fixed}.tw\\:relative{position:relative}.tw\\:sticky{position:sticky}.tw\\:inset-0{inset:calc(calc(var(--spacing)) * 0)}.tw\\:inset-y-0{inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:inset-s-3{inset-inline-start:calc(calc(var(--spacing)) * 3)}.tw\\:start-1\\.5{inset-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:start-1\\/2{inset-inline-start:50%}.tw\\:end-0{inset-inline-end:calc(calc(var(--spacing)) * 0)}.tw\\:end-1{inset-inline-end:calc(calc(var(--spacing)) * 1)}.tw\\:end-2{inset-inline-end:calc(calc(var(--spacing)) * 2)}.tw\\:end-3{inset-inline-end:calc(calc(var(--spacing)) * 3)}.tw\\:inset-e-0{inset-inline-end:calc(calc(var(--spacing)) * 0)}.tw\\:-top-\\[1px\\]{top:-1px}.tw\\:top-0{top:calc(calc(var(--spacing)) * 0)}.tw\\:top-1{top:calc(calc(var(--spacing)) * 1)}.tw\\:top-1\\.5{top:calc(calc(var(--spacing)) * 1.5)}.tw\\:top-1\\/2{top:50%}.tw\\:top-1\\/3{top:33.3333%}.tw\\:top-2{top:calc(calc(var(--spacing)) * 2)}.tw\\:top-2\\.5{top:calc(calc(var(--spacing)) * 2.5)}.tw\\:top-3\\.5{top:calc(calc(var(--spacing)) * 3.5)}.tw\\:top-\\[-1px\\]{top:-1px}.tw\\:top-full{top:100%}.tw\\:-right-1{right:calc(calc(var(--spacing)) * -1)}.tw\\:right-0{right:calc(calc(var(--spacing)) * 0)}.tw\\:right-1{right:calc(calc(var(--spacing)) * 1)}.tw\\:right-3{right:calc(calc(var(--spacing)) * 3)}.tw\\:bottom-0{bottom:calc(calc(var(--spacing)) * 0)}.tw\\:-left-\\[1px\\]{left:-1px}.tw\\:left-0{left:calc(calc(var(--spacing)) * 0)}.tw\\:left-1\\/2{left:50%}.tw\\:left-2{left:calc(calc(var(--spacing)) * 2)}.tw\\:left-3{left:calc(calc(var(--spacing)) * 3)}.tw\\:isolate{isolation:isolate}.tw\\:z-10{z-index:10}.tw\\:z-20{z-index:20}.tw\\:z-50{z-index:50}.tw\\:order-first{order:-9999}.tw\\:order-last{order:9999}.tw\\:col-span-1{grid-column:span 1/span 1}.tw\\:col-span-2{grid-column:span 2/span 2}.tw\\:col-span-3{grid-column:span 3/span 3}.tw\\:col-start-1{grid-column-start:1}.tw\\:col-start-2{grid-column-start:2}.tw\\:row-span-2{grid-row:span 2/span 2}.tw\\:row-start-1{grid-row-start:1}.tw\\:row-start-2{grid-row-start:2}.tw\\:m-0{margin:calc(calc(var(--spacing)) * 0)}.tw\\:m-1{margin:calc(calc(var(--spacing)) * 1)}.tw\\:m-2{margin:calc(calc(var(--spacing)) * 2)}.tw\\:-mx-1{margin-inline:calc(calc(var(--spacing)) * -1)}.tw\\:-mx-4{margin-inline:calc(calc(var(--spacing)) * -4)}.tw\\:mx-0{margin-inline:calc(calc(var(--spacing)) * 0)}.tw\\:mx-1{margin-inline:calc(calc(var(--spacing)) * 1)}.tw\\:mx-2{margin-inline:calc(calc(var(--spacing)) * 2)}.tw\\:mx-3\\.5{margin-inline:calc(calc(var(--spacing)) * 3.5)}.tw\\:mx-4{margin-inline:calc(calc(var(--spacing)) * 4)}.tw\\:mx-8{margin-inline:calc(calc(var(--spacing)) * 8)}.tw\\:my-1{margin-block:calc(calc(var(--spacing)) * 1)}.tw\\:my-2\\.5{margin-block:calc(calc(var(--spacing)) * 2.5)}.tw\\:my-4{margin-block:calc(calc(var(--spacing)) * 4)}.tw\\:my-auto{margin-block:auto}.tw\\:ms-1{margin-inline-start:calc(calc(var(--spacing)) * 1)}.tw\\:ms-2{margin-inline-start:calc(calc(var(--spacing)) * 2)}.tw\\:ms-5{margin-inline-start:calc(calc(var(--spacing)) * 5)}.tw\\:ms-6{margin-inline-start:calc(calc(var(--spacing)) * 6)}.tw\\:ms-auto{margin-inline-start:auto}.tw\\:me-1{margin-inline-end:calc(calc(var(--spacing)) * 1)}.tw\\:me-2{margin-inline-end:calc(calc(var(--spacing)) * 2)}.tw\\:prose{color:var(--tw-prose-body);max-width:65ch}.tw\\:prose :where(p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em}.tw\\:prose :where([class~=lead]):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-lead);margin-top:1.2em;margin-bottom:1.2em;font-size:1.25em;line-height:1.6}.tw\\:prose :where(a):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-links);font-weight:500;text-decoration:underline}.tw\\:prose :where(strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-bold);font-weight:600}.tw\\:prose :where(a strong):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(blockquote strong):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(thead th strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.tw\\:prose :where(ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em;padding-inline-start:1.625em;list-style-type:decimal}.tw\\:prose :where(ol[type=A]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-alpha}.tw\\:prose :where(ol[type=a]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-alpha}.tw\\:prose :where(ol[type=A s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-alpha}.tw\\:prose :where(ol[type=a s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-alpha}.tw\\:prose :where(ol[type=I]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-roman}.tw\\:prose :where(ol[type=i]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-roman}.tw\\:prose :where(ol[type=I s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-roman}.tw\\:prose :where(ol[type=i s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-roman}.tw\\:prose :where(ol[type="1"]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:decimal}.tw\\:prose :where(ul):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em;padding-inline-start:1.625em;list-style-type:disc}.tw\\:prose :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *))::marker{color:var(--tw-prose-counters);font-weight:400}.tw\\:prose :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *))::marker{color:var(--tw-prose-bullets)}.tw\\:prose :where(dt):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:1.25em;font-weight:600}.tw\\:prose :where(hr):not(:where([class~=not-prose],[class~=not-prose] *)){border-color:var(--tw-prose-hr);border-top-width:1px;margin-top:3em;margin-bottom:3em}.tw\\:prose :where(blockquote):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-quotes);border-inline-start-width:.25rem;border-inline-start-color:var(--tw-prose-quote-borders);quotes:"“""”""‘""’";margin-top:1.6em;margin-bottom:1.6em;padding-inline-start:1em;font-style:italic;font-weight:500}.tw\\:prose :where(blockquote p:first-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):before{content:open-quote}.tw\\:prose :where(blockquote p:last-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:close-quote}.tw\\:prose :where(h1):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:0;margin-bottom:.888889em;font-size:2.25em;font-weight:800;line-height:1.11111}.tw\\:prose :where(h1 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:900}.tw\\:prose :where(h2):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:2em;margin-bottom:1em;font-size:1.5em;font-weight:700;line-height:1.33333}.tw\\:prose :where(h2 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:800}.tw\\:prose :where(h3):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:1.6em;margin-bottom:.6em;font-size:1.25em;font-weight:600;line-height:1.6}.tw\\:prose :where(h3 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:700}.tw\\:prose :where(h4):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:1.5em;margin-bottom:.5em;font-weight:600;line-height:1.5}.tw\\:prose :where(h4 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:700}.tw\\:prose :where(img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.tw\\:prose :where(picture):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em;display:block}.tw\\:prose :where(video):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.tw\\:prose :where(kbd):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-kbd);box-shadow:0 0 0 1px rgb(var(--tw-prose-kbd-shadows) / 10%), 0 3px 0 rgb(var(--tw-prose-kbd-shadows) / 10%);padding-top:.1875em;padding-inline-end:.375em;padding-bottom:.1875em;border-radius:.3125rem;padding-inline-start:.375em;font-family:inherit;font-size:.875em;font-weight:500}.tw\\:prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-code);font-size:.875em;font-weight:600}.tw\\:prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)):before,.tw\\:prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:"\`"}.tw\\:prose :where(a code):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h1 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.tw\\:prose :where(h2 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-size:.875em}.tw\\:prose :where(h3 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-size:.9em}.tw\\:prose :where(h4 code):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(blockquote code):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(thead th code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.tw\\:prose :where(pre):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-pre-code);background-color:var(--tw-prose-pre-bg);padding-top:.857143em;padding-inline-end:1.14286em;padding-bottom:.857143em;border-radius:.375rem;margin-top:1.71429em;margin-bottom:1.71429em;padding-inline-start:1.14286em;font-size:.875em;font-weight:400;line-height:1.71429;overflow-x:auto}.tw\\:prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)){font-weight:inherit;color:inherit;font-size:inherit;font-family:inherit;line-height:inherit;background-color:#0000;border-width:0;border-radius:0;padding:0}.tw\\:prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)):before,.tw\\:prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:none}.tw\\:prose :where(table):not(:where([class~=not-prose],[class~=not-prose] *)){table-layout:auto;width:100%;margin-top:2em;margin-bottom:2em;font-size:.875em;line-height:1.71429}.tw\\:prose :where(thead):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:1px;border-bottom-color:var(--tw-prose-th-borders)}.tw\\:prose :where(thead th):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);vertical-align:bottom;padding-inline-end:.571429em;padding-bottom:.571429em;padding-inline-start:.571429em;font-weight:600}.tw\\:prose :where(tbody tr):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:1px;border-bottom-color:var(--tw-prose-td-borders)}.tw\\:prose :where(tbody tr:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:0}.tw\\:prose :where(tbody td):not(:where([class~=not-prose],[class~=not-prose] *)){vertical-align:baseline}.tw\\:prose :where(tfoot):not(:where([class~=not-prose],[class~=not-prose] *)){border-top-width:1px;border-top-color:var(--tw-prose-th-borders)}.tw\\:prose :where(tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){vertical-align:top}.tw\\:prose :where(th,td):not(:where([class~=not-prose],[class~=not-prose] *)){text-align:start}.tw\\:prose :where(figure>*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose :where(figcaption):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-captions);margin-top:.857143em;font-size:.875em;line-height:1.42857}.tw\\:prose{--tw-prose-body:var(--foreground);--tw-prose-headings:var(--foreground);--tw-prose-lead:var(--muted-foreground);--tw-prose-links:var(--primary);--tw-prose-bold:var(--foreground);--tw-prose-counters:var(--muted-foreground);--tw-prose-bullets:var(--muted-foreground);--tw-prose-hr:var(--border);--tw-prose-quotes:var(--foreground);--tw-prose-quote-borders:var(--border);--tw-prose-captions:var(--muted-foreground);--tw-prose-kbd:oklch(21% .034 264.665);--tw-prose-kbd-shadows:NaN NaN NaN;--tw-prose-code:var(--foreground);--tw-prose-pre-code:var(--muted-foreground);--tw-prose-pre-bg:var(--muted);--tw-prose-th-borders:var(--border);--tw-prose-td-borders:var(--border);--tw-prose-invert-body:var(--foreground);--tw-prose-invert-headings:var(--foreground);--tw-prose-invert-lead:var(--muted-foreground);--tw-prose-invert-links:var(--primary);--tw-prose-invert-bold:var(--foreground);--tw-prose-invert-counters:var(--muted-foreground);--tw-prose-invert-bullets:var(--muted-foreground);--tw-prose-invert-hr:var(--border);--tw-prose-invert-quotes:var(--foreground);--tw-prose-invert-quote-borders:var(--border);--tw-prose-invert-captions:var(--muted-foreground);--tw-prose-invert-kbd:#fff;--tw-prose-invert-kbd-shadows:255 255 255;--tw-prose-invert-code:var(--foreground);--tw-prose-invert-pre-code:var(--muted-foreground);--tw-prose-invert-pre-bg:var(--muted);--tw-prose-invert-th-borders:var(--border);--tw-prose-invert-td-borders:var(--border);font-size:1rem;line-height:1.75}.tw\\:prose :where(picture>img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose :where(li):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.5em;margin-bottom:.5em}.tw\\:prose :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:.375em}.tw\\:prose :where(.tw\\:prose>ul>li p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.75em;margin-bottom:.75em}.tw\\:prose :where(.tw\\:prose>ul>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em}.tw\\:prose :where(.tw\\:prose>ul>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.25em}.tw\\:prose :where(.tw\\:prose>ol>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em}.tw\\:prose :where(.tw\\:prose>ol>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.25em}.tw\\:prose :where(ul ul,ul ol,ol ul,ol ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.75em;margin-bottom:.75em}.tw\\:prose :where(dl):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em}.tw\\:prose :where(dd):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.5em;padding-inline-start:1.625em}.tw\\:prose :where(hr+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h2+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h3+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h4+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose :where(thead th:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose :where(thead th:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose :where(tbody td,tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.571429em;padding-inline-end:.571429em;padding-bottom:.571429em;padding-inline-start:.571429em}.tw\\:prose :where(tbody td:first-child,tfoot td:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose :where(tbody td:last-child,tfoot td:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose :where(figure):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.tw\\:prose :where(.tw\\:prose>:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose :where(.tw\\:prose>:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:0}.tw\\:prose-sm{font-size:.875rem;line-height:1.71429}.tw\\:prose-sm :where(p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em;margin-bottom:1.14286em}.tw\\:prose-sm :where([class~=lead]):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.888889em;margin-bottom:.888889em;font-size:1.28571em;line-height:1.55556}.tw\\:prose-sm :where(blockquote):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.33333em;margin-bottom:1.33333em;padding-inline-start:1.11111em}.tw\\:prose-sm :where(h1):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:.8em;font-size:2.14286em;line-height:1.2}.tw\\:prose-sm :where(h2):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.6em;margin-bottom:.8em;font-size:1.42857em;line-height:1.4}.tw\\:prose-sm :where(h3):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.55556em;margin-bottom:.444444em;font-size:1.28571em;line-height:1.55556}.tw\\:prose-sm :where(h4):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.42857em;margin-bottom:.571429em;line-height:1.42857}.tw\\:prose-sm :where(img):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(picture):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.71429em;margin-bottom:1.71429em}.tw\\:prose-sm :where(picture>img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose-sm :where(video):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.71429em;margin-bottom:1.71429em}.tw\\:prose-sm :where(kbd):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.142857em;padding-inline-end:.357143em;padding-bottom:.142857em;border-radius:.3125rem;padding-inline-start:.357143em;font-size:.857143em}.tw\\:prose-sm :where(code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.857143em}.tw\\:prose-sm :where(h2 code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.9em}.tw\\:prose-sm :where(h3 code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.888889em}.tw\\:prose-sm :where(pre):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.666667em;padding-inline-end:1em;padding-bottom:.666667em;border-radius:.25rem;margin-top:1.66667em;margin-bottom:1.66667em;padding-inline-start:1em;font-size:.857143em;line-height:1.66667}.tw\\:prose-sm :where(ol):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(ul):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em;margin-bottom:1.14286em;padding-inline-start:1.57143em}.tw\\:prose-sm :where(li):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.285714em;margin-bottom:.285714em}.tw\\:prose-sm :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:.428571em}.tw\\:prose-sm :where(.tw\\:prose-sm>ul>li p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.571429em;margin-bottom:.571429em}.tw\\:prose-sm :where(.tw\\:prose-sm>ul>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em}.tw\\:prose-sm :where(.tw\\:prose-sm>ul>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.14286em}.tw\\:prose-sm :where(.tw\\:prose-sm>ol>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em}.tw\\:prose-sm :where(.tw\\:prose-sm>ol>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.14286em}.tw\\:prose-sm :where(ul ul,ul ol,ol ul,ol ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.571429em;margin-bottom:.571429em}.tw\\:prose-sm :where(dl):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em;margin-bottom:1.14286em}.tw\\:prose-sm :where(dt):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em}.tw\\:prose-sm :where(dd):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.285714em;padding-inline-start:1.57143em}.tw\\:prose-sm :where(hr):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2.85714em;margin-bottom:2.85714em}.tw\\:prose-sm :where(hr+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(h2+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(h3+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(h4+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose-sm :where(table):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.857143em;line-height:1.5}.tw\\:prose-sm :where(thead th):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:1em;padding-bottom:.666667em;padding-inline-start:1em}.tw\\:prose-sm :where(thead th:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose-sm :where(thead th:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose-sm :where(tbody td,tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.666667em;padding-inline-end:1em;padding-bottom:.666667em;padding-inline-start:1em}.tw\\:prose-sm :where(tbody td:first-child,tfoot td:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose-sm :where(tbody td:last-child,tfoot td:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose-sm :where(figure):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.71429em;margin-bottom:1.71429em}.tw\\:prose-sm :where(figure>*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose-sm :where(figcaption):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.666667em;font-size:.857143em;line-height:1.33333}.tw\\:prose-sm :where(.tw\\:prose-sm>:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose-sm :where(.tw\\:prose-sm>:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:0}.tw\\:-mt-4{margin-top:calc(calc(var(--spacing)) * -4)}.tw\\:mt-0\\.5{margin-top:calc(calc(var(--spacing)) * .5)}.tw\\:mt-1{margin-top:calc(calc(var(--spacing)) * 1)}.tw\\:mt-2{margin-top:calc(calc(var(--spacing)) * 2)}.tw\\:mt-3{margin-top:calc(calc(var(--spacing)) * 3)}.tw\\:mt-4{margin-top:calc(calc(var(--spacing)) * 4)}.tw\\:mt-6{margin-top:calc(calc(var(--spacing)) * 6)}.tw\\:mt-auto{margin-top:auto}.tw\\:mr-1{margin-right:calc(calc(var(--spacing)) * 1)}.tw\\:mr-2{margin-right:calc(calc(var(--spacing)) * 2)}.tw\\:mr-3{margin-right:calc(calc(var(--spacing)) * 3)}.tw\\:-mb-4{margin-bottom:calc(calc(var(--spacing)) * -4)}.tw\\:mb-1{margin-bottom:calc(calc(var(--spacing)) * 1)}.tw\\:mb-2{margin-bottom:calc(calc(var(--spacing)) * 2)}.tw\\:mb-3{margin-bottom:calc(calc(var(--spacing)) * 3)}.tw\\:mb-4{margin-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:ml-1{margin-left:calc(calc(var(--spacing)) * 1)}.tw\\:ml-2{margin-left:calc(calc(var(--spacing)) * 2)}.tw\\:ml-4{margin-left:calc(calc(var(--spacing)) * 4)}.tw\\:ml-auto{margin-left:auto}.tw\\:box-border{box-sizing:border-box}.tw\\:line-clamp-3{-webkit-line-clamp:3;-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden}.tw\\:no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}.tw\\:no-scrollbar::-webkit-scrollbar{display:none}.tw\\:block{display:block}.tw\\:flex{display:flex}.tw\\:grid{display:grid}.tw\\:hidden{display:none}.tw\\:inline-block{display:inline-block}.tw\\:inline-flex{display:inline-flex}.tw\\:inline-grid{display:inline-grid}.tw\\:field-sizing-content{field-sizing:content}.tw\\:aspect-square{aspect-ratio:1}.tw\\:size-2{width:calc(calc(var(--spacing)) * 2);height:calc(calc(var(--spacing)) * 2)}.tw\\:size-2\\.5{width:calc(calc(var(--spacing)) * 2.5);height:calc(calc(var(--spacing)) * 2.5)}.tw\\:size-3{width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:size-3\\.5{width:calc(calc(var(--spacing)) * 3.5);height:calc(calc(var(--spacing)) * 3.5)}.tw\\:size-4{width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:size-6{width:calc(calc(var(--spacing)) * 6);height:calc(calc(var(--spacing)) * 6)}.tw\\:size-7{width:calc(calc(var(--spacing)) * 7);height:calc(calc(var(--spacing)) * 7)}.tw\\:size-8{width:calc(calc(var(--spacing)) * 8);height:calc(calc(var(--spacing)) * 8)}.tw\\:size-9{width:calc(calc(var(--spacing)) * 9);height:calc(calc(var(--spacing)) * 9)}.tw\\:size-10{width:calc(calc(var(--spacing)) * 10);height:calc(calc(var(--spacing)) * 10)}.tw\\:size-full{width:100%;height:100%}.tw\\:h-1{height:calc(calc(var(--spacing)) * 1)}.tw\\:h-2{height:calc(calc(var(--spacing)) * 2)}.tw\\:h-3{height:calc(calc(var(--spacing)) * 3)}.tw\\:h-3\\.5{height:calc(calc(var(--spacing)) * 3.5)}.tw\\:h-4{height:calc(calc(var(--spacing)) * 4)}.tw\\:h-5{height:calc(calc(var(--spacing)) * 5)}.tw\\:h-6{height:calc(calc(var(--spacing)) * 6)}.tw\\:h-7{height:calc(calc(var(--spacing)) * 7)}.tw\\:h-8{height:calc(calc(var(--spacing)) * 8)}.tw\\:h-8\\!{height:calc(calc(var(--spacing)) * 8)!important}.tw\\:h-8\\.5{height:calc(calc(var(--spacing)) * 8.5)}.tw\\:h-9{height:calc(calc(var(--spacing)) * 9)}.tw\\:h-10{height:calc(calc(var(--spacing)) * 10)}.tw\\:h-12{height:calc(calc(var(--spacing)) * 12)}.tw\\:h-14{height:calc(calc(var(--spacing)) * 14)}.tw\\:h-20{height:calc(calc(var(--spacing)) * 20)}.tw\\:h-24{height:calc(calc(var(--spacing)) * 24)}.tw\\:h-32{height:calc(calc(var(--spacing)) * 32)}.tw\\:h-40{height:calc(calc(var(--spacing)) * 40)}.tw\\:h-64{height:calc(calc(var(--spacing)) * 64)}.tw\\:h-80{height:calc(calc(var(--spacing)) * 80)}.tw\\:h-96{height:calc(calc(var(--spacing)) * 96)}.tw\\:h-\\[5px\\]{height:5px}.tw\\:h-\\[260px\\]{height:260px}.tw\\:h-\\[300px\\]{height:300px}.tw\\:h-\\[400px\\]{height:400px}.tw\\:h-\\[600px\\]{height:600px}.tw\\:h-\\[calc\\(100\\%-1px\\)\\]{height:calc(100% - 1px)}.tw\\:h-\\[calc\\(100\\%-2px\\)\\]{height:calc(100% - 2px)}.tw\\:h-auto{height:auto}.tw\\:h-full{height:100%}.tw\\:h-px{height:1px}.tw\\:h-screen{height:100vh}.tw\\:h-svh{height:100svh}.tw\\:max-h-\\(--radix-context-menu-content-available-height\\){max-height:var(--radix-context-menu-content-available-height)}.tw\\:max-h-\\(--radix-dropdown-menu-content-available-height\\){max-height:var(--radix-dropdown-menu-content-available-height)}.tw\\:max-h-\\(--radix-popover-content-available-height\\){max-height:var(--radix-popover-content-available-height)}.tw\\:max-h-\\(--radix-select-content-available-height\\){max-height:var(--radix-select-content-available-height)}.tw\\:max-h-5{max-height:calc(calc(var(--spacing)) * 5)}.tw\\:max-h-10{max-height:calc(calc(var(--spacing)) * 10)}.tw\\:max-h-72{max-height:calc(calc(var(--spacing)) * 72)}.tw\\:max-h-80{max-height:calc(calc(var(--spacing)) * 80)}.tw\\:max-h-\\[96\\%\\]{max-height:96%}.tw\\:max-h-\\[300px\\]{max-height:300px}.tw\\:min-h-0{min-height:calc(calc(var(--spacing)) * 0)}.tw\\:min-h-11{min-height:calc(calc(var(--spacing)) * 11)}.tw\\:min-h-16{min-height:calc(calc(var(--spacing)) * 16)}.tw\\:min-h-\\[200px\\]{min-height:200px}.tw\\:min-h-full{min-height:100%}.tw\\:min-h-svh{min-height:100svh}.tw\\:w-\\(--radix-dropdown-menu-trigger-width\\){width:var(--radix-dropdown-menu-trigger-width)}.tw\\:w-\\(--sidebar-width\\){width:var(--sidebar-width)}.tw\\:w-1{width:calc(calc(var(--spacing)) * 1)}.tw\\:w-1\\/2{width:50%}.tw\\:w-2{width:calc(calc(var(--spacing)) * 2)}.tw\\:w-3{width:calc(calc(var(--spacing)) * 3)}.tw\\:w-3\\.5{width:calc(calc(var(--spacing)) * 3.5)}.tw\\:w-3\\/4{width:75%}.tw\\:w-4{width:calc(calc(var(--spacing)) * 4)}.tw\\:w-4\\/5{width:80%}.tw\\:w-4\\/6{width:66.6667%}.tw\\:w-5{width:calc(calc(var(--spacing)) * 5)}.tw\\:w-5\\/6{width:83.3333%}.tw\\:w-6{width:calc(calc(var(--spacing)) * 6)}.tw\\:w-8{width:calc(calc(var(--spacing)) * 8)}.tw\\:w-9{width:calc(calc(var(--spacing)) * 9)}.tw\\:w-9\\/12{width:75%}.tw\\:w-10{width:calc(calc(var(--spacing)) * 10)}.tw\\:w-12{width:calc(calc(var(--spacing)) * 12)}.tw\\:w-14{width:calc(calc(var(--spacing)) * 14)}.tw\\:w-20{width:calc(calc(var(--spacing)) * 20)}.tw\\:w-24{width:calc(calc(var(--spacing)) * 24)}.tw\\:w-32{width:calc(calc(var(--spacing)) * 32)}.tw\\:w-48{width:calc(calc(var(--spacing)) * 48)}.tw\\:w-56{width:calc(calc(var(--spacing)) * 56)}.tw\\:w-60{width:calc(calc(var(--spacing)) * 60)}.tw\\:w-64{width:calc(calc(var(--spacing)) * 64)}.tw\\:w-72{width:calc(calc(var(--spacing)) * 72)}.tw\\:w-80{width:calc(calc(var(--spacing)) * 80)}.tw\\:w-96{width:calc(calc(var(--spacing)) * 96)}.tw\\:w-\\[1px\\]{width:1px}.tw\\:w-\\[5px\\]{width:5px}.tw\\:w-\\[70px\\]{width:70px}.tw\\:w-\\[100px\\]{width:100px}.tw\\:w-\\[116px\\]{width:116px}.tw\\:w-\\[124px\\]{width:124px}.tw\\:w-\\[150px\\]{width:150px}.tw\\:w-\\[180px\\]{width:180px}.tw\\:w-\\[200px\\]{width:200px}.tw\\:w-\\[250px\\]{width:250px}.tw\\:w-\\[260px\\]{width:260px}.tw\\:w-\\[280px\\]{width:280px}.tw\\:w-\\[300px\\]{width:300px}.tw\\:w-\\[320px\\]{width:320px}.tw\\:w-\\[350px\\]{width:350px}.tw\\:w-\\[400px\\]{width:400px}.tw\\:w-\\[420px\\]{width:420px}.tw\\:w-\\[500px\\]{width:500px}.tw\\:w-\\[560px\\]{width:560px}.tw\\:w-\\[600px\\]{width:600px}.tw\\:w-\\[calc\\(100\\%-2px\\)\\]{width:calc(100% - 2px)}.tw\\:w-\\[var\\(--radix-dropdown-menu-trigger-width\\)\\]{width:var(--radix-dropdown-menu-trigger-width)}.tw\\:w-auto{width:auto}.tw\\:w-fit{width:fit-content}.tw\\:w-full{width:100%}.tw\\:w-max{width:max-content}.tw\\:w-px{width:1px}.tw\\:max-w-\\(--skeleton-width\\){max-width:var(--skeleton-width)}.tw\\:max-w-2xl{max-width:var(--tw-container-2xl)}.tw\\:max-w-3xl{max-width:var(--tw-container-3xl)}.tw\\:max-w-4xl{max-width:var(--tw-container-4xl)}.tw\\:max-w-5{max-width:calc(calc(var(--spacing)) * 5)}.tw\\:max-w-6xl{max-width:var(--tw-container-6xl)}.tw\\:max-w-40{max-width:calc(calc(var(--spacing)) * 40)}.tw\\:max-w-48{max-width:calc(calc(var(--spacing)) * 48)}.tw\\:max-w-64{max-width:calc(calc(var(--spacing)) * 64)}.tw\\:max-w-96{max-width:calc(calc(var(--spacing)) * 96)}.tw\\:max-w-\\[200px\\]{max-width:200px}.tw\\:max-w-\\[220px\\]{max-width:220px}.tw\\:max-w-\\[calc\\(100\\%-2rem\\)\\]{max-width:calc(100% - 2rem)}.tw\\:max-w-\\[calc\\(100vw-2rem\\)\\]{max-width:calc(100vw - 2rem)}.tw\\:max-w-fit{max-width:fit-content}.tw\\:max-w-full{max-width:100%}.tw\\:max-w-lg{max-width:var(--tw-container-lg)}.tw\\:max-w-md{max-width:var(--tw-container-md)}.tw\\:max-w-none{max-width:none}.tw\\:max-w-sm{max-width:var(--tw-container-sm)}.tw\\:max-w-xs{max-width:var(--tw-container-xs)}.tw\\:min-w-0{min-width:calc(calc(var(--spacing)) * 0)}.tw\\:min-w-4{min-width:calc(calc(var(--spacing)) * 4)}.tw\\:min-w-5{min-width:calc(calc(var(--spacing)) * 5)}.tw\\:min-w-7{min-width:calc(calc(var(--spacing)) * 7)}.tw\\:min-w-8{min-width:calc(calc(var(--spacing)) * 8)}.tw\\:min-w-9{min-width:calc(calc(var(--spacing)) * 9)}.tw\\:min-w-16{min-width:calc(calc(var(--spacing)) * 16)}.tw\\:min-w-32{min-width:calc(calc(var(--spacing)) * 32)}.tw\\:min-w-36{min-width:calc(calc(var(--spacing)) * 36)}.tw\\:min-w-80{min-width:calc(calc(var(--spacing)) * 80)}.tw\\:min-w-\\[12rem\\]{min-width:12rem}.tw\\:min-w-\\[26px\\]{min-width:26px}.tw\\:min-w-\\[96px\\]{min-width:96px}.tw\\:min-w-\\[140px\\]{min-width:140px}.tw\\:min-w-\\[215px\\]{min-width:215px}.tw\\:min-w-\\[500px\\]{min-width:500px}.tw\\:min-w-min{min-width:min-content}.tw\\:flex-1{flex:1}.tw\\:shrink{flex-shrink:1}.tw\\:shrink\\!{flex-shrink:1!important}.tw\\:shrink-0{flex-shrink:0}.tw\\:shrink-\\[9999\\]{flex-shrink:9999}.tw\\:flex-grow,.tw\\:grow,.tw\\:grow-\\[1\\]{flex-grow:1}.tw\\:grow-\\[10\\]{flex-grow:10}.tw\\:basis-0{flex-basis:calc(calc(var(--spacing)) * 0)}.tw\\:caption-bottom{caption-side:bottom}.tw\\:border-collapse{border-collapse:collapse}.tw\\:origin-\\(--radix-context-menu-content-transform-origin\\){transform-origin:var(--radix-context-menu-content-transform-origin)}.tw\\:origin-\\(--radix-dropdown-menu-content-transform-origin\\){transform-origin:var(--radix-dropdown-menu-content-transform-origin)}.tw\\:origin-\\(--radix-menubar-content-transform-origin\\){transform-origin:var(--radix-menubar-content-transform-origin)}.tw\\:origin-\\(--radix-popover-content-transform-origin\\){transform-origin:var(--radix-popover-content-transform-origin)}.tw\\:origin-\\(--radix-select-content-transform-origin\\){transform-origin:var(--radix-select-content-transform-origin)}.tw\\:origin-\\(--radix-tooltip-content-transform-origin\\){transform-origin:var(--radix-tooltip-content-transform-origin)}.tw\\:-translate-x-1\\/2{--tw-translate-x:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:-translate-x-px{--tw-translate-x:-1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:translate-x-px{--tw-translate-x:1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:-translate-y-1\\/2{--tw-translate-y:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:translate-y-0{--tw-translate-y:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:translate-y-px{--tw-translate-y:1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rotate-45{rotate:45deg}.tw\\:rotate-180{rotate:180deg}.tw\\:transform{transform:var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,)}.tw\\:animate-none\\!{animation:none!important}.tw\\:animate-pulse{animation:var(--tw-animate-pulse)}.tw\\:animate-spin{animation:var(--tw-animate-spin)}.tw\\:cursor-default{cursor:default}.tw\\:cursor-ew-resize{cursor:ew-resize}.tw\\:cursor-not-allowed{cursor:not-allowed}.tw\\:cursor-pointer{cursor:pointer}.tw\\:cursor-text{cursor:text}.tw\\:touch-none{touch-action:none}.tw\\:resize{resize:both}.tw\\:resize-none{resize:none}.tw\\:scroll-m-20{scroll-margin:calc(calc(var(--spacing)) * 20)}.tw\\:scroll-my-1{scroll-margin-block:calc(calc(var(--spacing)) * 1)}.tw\\:scroll-py-1{scroll-padding-block:calc(calc(var(--spacing)) * 1)}.tw\\:list-inside{list-style-position:inside}.tw\\:list-outside{list-style-position:outside}.tw\\:\\!list-\\[lower-alpha\\]{list-style-type:lower-alpha!important}.tw\\:\\!list-\\[lower-roman\\]{list-style-type:lower-roman!important}.tw\\:\\!list-\\[upper-alpha\\]{list-style-type:upper-alpha!important}.tw\\:\\!list-\\[upper-roman\\]{list-style-type:upper-roman!important}.tw\\:\\!list-decimal{list-style-type:decimal!important}.tw\\:\\!list-disc{list-style-type:disc!important}.tw\\:list-decimal{list-style-type:decimal}.tw\\:list-disc{list-style-type:disc}.tw\\:list-none{list-style-type:none}.tw\\:grid-flow-col{grid-auto-flow:column}.tw\\:grid-flow-row{grid-auto-flow:row}.tw\\:auto-rows-min{grid-auto-rows:min-content}.tw\\:grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}.tw\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.tw\\:grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.tw\\:grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}.tw\\:grid-cols-\\[25\\%_25\\%_50\\%\\]{grid-template-columns:25% 25% 50%}.tw\\:grid-cols-\\[25\\%_50\\%_25\\%\\]{grid-template-columns:25% 50% 25%}.tw\\:grid-cols-\\[auto_auto_auto_auto\\]{grid-template-columns:auto auto auto auto}.tw\\:grid-cols-\\[min-content_1fr\\]{grid-template-columns:min-content 1fr}.tw\\:grid-cols-\\[min-content_min-content_1fr\\]{grid-template-columns:min-content min-content 1fr}.tw\\:grid-cols-subgrid{grid-template-columns:subgrid}.tw\\:flex-col{flex-direction:column}.tw\\:flex-col-reverse{flex-direction:column-reverse}.tw\\:flex-row{flex-direction:row}.tw\\:flex-row-reverse{flex-direction:row-reverse}.tw\\:flex-nowrap{flex-wrap:nowrap}.tw\\:flex-wrap{flex-wrap:wrap}.tw\\:place-content-center{place-content:center}.tw\\:content-center{align-content:center}.tw\\:items-baseline{align-items:baseline}.tw\\:items-center{align-items:center}.tw\\:items-end{align-items:flex-end}.tw\\:items-start{align-items:flex-start}.tw\\:items-stretch{align-items:stretch}.tw\\:justify-between{justify-content:space-between}.tw\\:justify-center{justify-content:center}.tw\\:justify-end{justify-content:flex-end}.tw\\:justify-start{justify-content:flex-start}.tw\\:gap-0{gap:calc(calc(var(--spacing)) * 0)}.tw\\:gap-0\\.5{gap:calc(calc(var(--spacing)) * .5)}.tw\\:gap-1{gap:calc(calc(var(--spacing)) * 1)}.tw\\:gap-1\\.5{gap:calc(calc(var(--spacing)) * 1.5)}.tw\\:gap-1\\.5\\!{gap:calc(calc(var(--spacing)) * 1.5)!important}.tw\\:gap-2{gap:calc(calc(var(--spacing)) * 2)}.tw\\:gap-2\\.5{gap:calc(calc(var(--spacing)) * 2.5)}.tw\\:gap-3{gap:calc(calc(var(--spacing)) * 3)}.tw\\:gap-4{gap:calc(calc(var(--spacing)) * 4)}.tw\\:gap-5{gap:calc(calc(var(--spacing)) * 5)}.tw\\:gap-6{gap:calc(calc(var(--spacing)) * 6)}.tw\\:gap-16{gap:calc(calc(var(--spacing)) * 16)}.tw\\:gap-\\[--spacing\\(var\\(--gap\\)\\)\\]{gap:calc(calc(var(--spacing)) * var(--gap))}.tw\\:gap-\\[12px\\]{gap:12px}:where(.tw\\:space-y-1>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 1) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 1) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-1\\.5>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 1.5) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 1.5) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-2>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 2) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 2) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-3>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 3) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 3) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-4>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 4) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 4) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-6>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 6) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 6) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-8>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 8) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 8) * calc(1 - var(--tw-space-y-reverse)))}.tw\\:gap-x-1{column-gap:calc(calc(var(--spacing)) * 1)}.tw\\:gap-x-2{column-gap:calc(calc(var(--spacing)) * 2)}.tw\\:gap-x-3{column-gap:calc(calc(var(--spacing)) * 3)}.tw\\:gap-x-4{column-gap:calc(calc(var(--spacing)) * 4)}:where(.tw\\:-space-x-2>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * -2) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * -2) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-2>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 2) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 2) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-3>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 3) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 3) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-4>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 4) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 4) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-6>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 6) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 6) * calc(1 - var(--tw-space-x-reverse)))}.tw\\:gap-y-1{row-gap:calc(calc(var(--spacing)) * 1)}.tw\\:gap-y-2{row-gap:calc(calc(var(--spacing)) * 2)}:where(.tw\\:divide-x>:not(:last-child)){--tw-divide-x-reverse:0;border-inline-style:var(--tw-border-style);border-inline-start-width:calc(1px * var(--tw-divide-x-reverse));border-inline-end-width:calc(1px * calc(1 - var(--tw-divide-x-reverse)))}:where(.tw\\:divide-y>:not(:last-child)){--tw-divide-y-reverse:0;border-bottom-style:var(--tw-border-style);border-top-style:var(--tw-border-style);border-top-width:calc(1px * var(--tw-divide-y-reverse));border-bottom-width:calc(1px * calc(1 - var(--tw-divide-y-reverse)))}.tw\\:self-start{align-self:flex-start}.tw\\:self-stretch{align-self:stretch}.tw\\:justify-self-end{justify-self:flex-end}.tw\\:truncate{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.tw\\:overflow-auto{overflow:auto}.tw\\:overflow-clip{overflow:clip}.tw\\:overflow-hidden{overflow:hidden}.tw\\:overflow-scroll{overflow:scroll}.tw\\:overflow-visible{overflow:visible}.tw\\:overflow-x-auto{overflow-x:auto}.tw\\:overflow-x-hidden{overflow-x:hidden}.tw\\:overflow-y-auto{overflow-y:auto}.tw\\:overflow-y-hidden{overflow-y:hidden}.tw\\:rounded{border-radius:.25rem}.tw\\:rounded-2xl{border-radius:calc(var(--radius) * 1.8)}.tw\\:rounded-4xl{border-radius:calc(var(--radius) * 2.6)}.tw\\:rounded-\\[4px\\]{border-radius:4px}.tw\\:rounded-\\[6px\\]{border-radius:6px}.tw\\:rounded-\\[calc\\(var\\(--radius\\)-3px\\)\\]{border-radius:calc(var(--radius) - 3px)}.tw\\:rounded-\\[min\\(var\\(--tw-radius-md\\)\\,10px\\)\\]{border-radius:min(var(--tw-radius-md), 10px)}.tw\\:rounded-\\[min\\(var\\(--tw-radius-md\\)\\,12px\\)\\]{border-radius:min(var(--tw-radius-md), 12px)}.tw\\:rounded-full{border-radius:3.40282e38px}.tw\\:rounded-lg{border-radius:var(--radius)}.tw\\:rounded-lg\\!{border-radius:var(--radius)!important}.tw\\:rounded-md{border-radius:calc(var(--radius) * .8)}.tw\\:rounded-none{border-radius:0}.tw\\:rounded-sm{border-radius:calc(var(--radius) * .6)}.tw\\:rounded-xl{border-radius:calc(var(--radius) * 1.4)}.tw\\:rounded-xl\\!{border-radius:calc(var(--radius) * 1.4)!important}.tw\\:rounded-xs{border-radius:var(--tw-radius-xs)}.tw\\:rounded-s-none{border-start-start-radius:0;border-end-start-radius:0}.tw\\:rounded-e-none{border-start-end-radius:0;border-end-end-radius:0}.tw\\:rounded-t-xl{border-top-left-radius:calc(var(--radius) * 1.4);border-top-right-radius:calc(var(--radius) * 1.4)}.tw\\:rounded-l-lg{border-top-left-radius:var(--radius);border-bottom-left-radius:var(--radius)}.tw\\:rounded-r-xl{border-top-right-radius:calc(var(--radius) * 1.4);border-bottom-right-radius:calc(var(--radius) * 1.4)}.tw\\:rounded-b-xl{border-bottom-right-radius:calc(var(--radius) * 1.4);border-bottom-left-radius:calc(var(--radius) * 1.4)}.tw\\:border{border-style:var(--tw-border-style);border-width:1px}.tw\\:border-0{border-style:var(--tw-border-style);border-width:0}.tw\\:border-2{border-style:var(--tw-border-style);border-width:2px}.tw\\:border-s{border-inline-start-style:var(--tw-border-style);border-inline-start-width:1px}.tw\\:border-s-0{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:border-s-2{border-inline-start-style:var(--tw-border-style);border-inline-start-width:2px}.tw\\:border-e{border-inline-end-style:var(--tw-border-style);border-inline-end-width:1px}.tw\\:border-e-0{border-inline-end-style:var(--tw-border-style);border-inline-end-width:0}.tw\\:border-t{border-top-style:var(--tw-border-style);border-top-width:1px}.tw\\:border-t-0{border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:border-b{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}.tw\\:border-b-0{border-bottom-style:var(--tw-border-style);border-bottom-width:0}.tw\\:border-l-2{border-left-style:var(--tw-border-style);border-left-width:2px}.tw\\:border-l-4{border-left-style:var(--tw-border-style);border-left-width:4px}.tw\\:border-dashed{--tw-border-style:dashed;border-style:dashed}.tw\\:border-none{--tw-border-style:none;border-style:none}.tw\\:border-solid{--tw-border-style:solid;border-style:solid}.tw\\:border-black{border-color:var(--tw-color-black)}.tw\\:border-blue-400{border-color:var(--tw-color-blue-400)}.tw\\:border-blue-500{border-color:var(--tw-color-blue-500)}.tw\\:border-border,.tw\\:border-border\\/50{border-color:var(--border)}@supports (color:color-mix(in lab, red, red)){.tw\\:border-border\\/50{border-color:color-mix(in oklab, var(--border) 50%, transparent)}}.tw\\:border-destructive{border-color:var(--destructive)}.tw\\:border-gray-300{border-color:var(--tw-color-gray-300)}.tw\\:border-input,.tw\\:border-input\\/30{border-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:border-input\\/30{border-color:color-mix(in oklab, var(--input) 30%, transparent)}}.tw\\:border-muted-foreground,.tw\\:border-muted-foreground\\/40{border-color:var(--muted-foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:border-muted-foreground\\/40{border-color:color-mix(in oklab, var(--muted-foreground) 40%, transparent)}}.tw\\:border-primary{border-color:var(--primary)}.tw\\:border-red-300{border-color:var(--tw-color-red-300)}.tw\\:border-red-400{border-color:var(--tw-color-red-400)}.tw\\:border-red-500{border-color:var(--tw-color-red-500)}.tw\\:border-red-600{border-color:var(--tw-color-red-600)}.tw\\:border-ring{border-color:var(--ring)}.tw\\:border-sidebar-border{border-color:var(--sidebar-border)}.tw\\:border-slate-300{border-color:var(--tw-color-slate-300)}.tw\\:border-transparent{border-color:#0000}.tw\\:border-yellow-400{border-color:var(--tw-color-yellow-400)}.tw\\:border-yellow-500{border-color:var(--tw-color-yellow-500)}.tw\\:border-s-amber-200{border-inline-start-color:var(--tw-color-amber-200)}.tw\\:border-s-indigo-200{border-inline-start-color:var(--tw-color-indigo-200)}.tw\\:border-s-purple-200{border-inline-start-color:var(--tw-color-purple-200)}.tw\\:border-s-red-200{border-inline-start-color:var(--tw-color-red-200)}.tw\\:\\!bg-destructive\\/50{background-color:var(--destructive)!important}@supports (color:color-mix(in lab, red, red)){.tw\\:\\!bg-destructive\\/50{background-color:color-mix(in oklab, var(--destructive) 50%, transparent)!important}}.tw\\:bg-\\[color-mix\\(in_oklab\\,var\\(--destructive\\)_10\\%\\,var\\(--background\\)\\)\\]{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-\\[color-mix\\(in_oklab\\,var\\(--destructive\\)_10\\%\\,var\\(--background\\)\\)\\]{background-color:color-mix(in oklab,var(--destructive) 10%,var(--background))}}.tw\\:bg-accent,.tw\\:bg-accent\\/50{background-color:var(--accent)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-accent\\/50{background-color:color-mix(in oklab, var(--accent) 50%, transparent)}}.tw\\:bg-amber-500,.tw\\:bg-amber-500\\/5{background-color:var(--tw-color-amber-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-amber-500\\/5{background-color:color-mix(in oklab, var(--tw-color-amber-500) 5%, transparent)}}.tw\\:bg-amber-500\\/15{background-color:var(--tw-color-amber-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-amber-500\\/15{background-color:color-mix(in oklab, var(--tw-color-amber-500) 15%, transparent)}}.tw\\:bg-background,.tw\\:bg-background\\/50{background-color:var(--background)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-background\\/50{background-color:color-mix(in oklab, var(--background) 50%, transparent)}}.tw\\:bg-black\\/10{background-color:var(--tw-color-black)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-black\\/10{background-color:color-mix(in oklab, var(--tw-color-black) 10%, transparent)}}.tw\\:bg-blue-50{background-color:var(--tw-color-blue-50)}.tw\\:bg-blue-100{background-color:var(--tw-color-blue-100)}.tw\\:bg-blue-400{background-color:var(--tw-color-blue-400)}.tw\\:bg-blue-500{background-color:var(--tw-color-blue-500)}.tw\\:bg-border{background-color:var(--border)}.tw\\:bg-card{background-color:var(--card)}.tw\\:bg-destructive\\/10{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-destructive\\/10{background-color:color-mix(in oklab, var(--destructive) 10%, transparent)}}.tw\\:bg-foreground{background-color:var(--foreground)}.tw\\:bg-gray-50{background-color:var(--tw-color-gray-50)}.tw\\:bg-gray-100{background-color:var(--tw-color-gray-100)}.tw\\:bg-gray-500{background-color:var(--tw-color-gray-500)}.tw\\:bg-green-50{background-color:var(--tw-color-green-50)}.tw\\:bg-green-100{background-color:var(--tw-color-green-100)}.tw\\:bg-green-500{background-color:var(--tw-color-green-500)}.tw\\:bg-input,.tw\\:bg-input\\/30{background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-input\\/30{background-color:color-mix(in oklab, var(--input) 30%, transparent)}}.tw\\:bg-muted,.tw\\:bg-muted\\/50{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-muted\\/50{background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:bg-neutral-300{background-color:var(--tw-color-neutral-300)}.tw\\:bg-orange-100{background-color:var(--tw-color-orange-100)}.tw\\:bg-popover,.tw\\:bg-popover\\/70{background-color:var(--popover)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-popover\\/70{background-color:color-mix(in oklab, var(--popover) 70%, transparent)}}.tw\\:bg-primary{background-color:var(--primary)}.tw\\:bg-primary-foreground{background-color:var(--primary-foreground)}.tw\\:bg-primary\\/30{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-primary\\/30{background-color:color-mix(in oklab, var(--primary) 30%, transparent)}}.tw\\:bg-purple-50{background-color:var(--tw-color-purple-50)}.tw\\:bg-red-100{background-color:var(--tw-color-red-100)}.tw\\:bg-red-500{background-color:var(--tw-color-red-500)}.tw\\:bg-rose-500,.tw\\:bg-rose-500\\/5{background-color:var(--tw-color-rose-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-rose-500\\/5{background-color:color-mix(in oklab, var(--tw-color-rose-500) 5%, transparent)}}.tw\\:bg-rose-500\\/15{background-color:var(--tw-color-rose-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-rose-500\\/15{background-color:color-mix(in oklab, var(--tw-color-rose-500) 15%, transparent)}}.tw\\:bg-secondary{background-color:var(--secondary)}.tw\\:bg-sidebar{background-color:var(--sidebar)}.tw\\:bg-sidebar-accent{background-color:var(--sidebar-accent)}.tw\\:bg-sidebar-border{background-color:var(--sidebar-border)}.tw\\:bg-sky-500,.tw\\:bg-sky-500\\/5{background-color:var(--tw-color-sky-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-sky-500\\/5{background-color:color-mix(in oklab, var(--tw-color-sky-500) 5%, transparent)}}.tw\\:bg-sky-500\\/15{background-color:var(--tw-color-sky-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-sky-500\\/15{background-color:color-mix(in oklab, var(--tw-color-sky-500) 15%, transparent)}}.tw\\:bg-teal-500,.tw\\:bg-teal-500\\/5{background-color:var(--tw-color-teal-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-teal-500\\/5{background-color:color-mix(in oklab, var(--tw-color-teal-500) 5%, transparent)}}.tw\\:bg-teal-500\\/15{background-color:var(--tw-color-teal-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-teal-500\\/15{background-color:color-mix(in oklab, var(--tw-color-teal-500) 15%, transparent)}}.tw\\:bg-transparent{background-color:#0000}.tw\\:bg-white{background-color:var(--tw-color-white)}.tw\\:bg-yellow-50{background-color:var(--tw-color-yellow-50)}.tw\\:bg-yellow-100{background-color:var(--tw-color-yellow-100)}.tw\\:bg-yellow-500{background-color:var(--tw-color-yellow-500)}.tw\\:bg-zinc-400{background-color:var(--tw-color-zinc-400)}.tw\\:bg-clip-padding{background-clip:padding-box}.tw\\:fill-\\[color-mix\\(in_oklab\\,var\\(--destructive\\)_10\\%\\,var\\(--background\\)\\)\\]{fill:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:fill-\\[color-mix\\(in_oklab\\,var\\(--destructive\\)_10\\%\\,var\\(--background\\)\\)\\]{fill:color-mix(in oklab,var(--destructive) 10%,var(--background))}}.tw\\:fill-destructive{fill:var(--destructive)}.tw\\:fill-foreground{fill:var(--foreground)}.tw\\:fill-yellow-400,.tw\\:fill-yellow-400\\/50{fill:var(--tw-color-yellow-400)}@supports (color:color-mix(in lab, red, red)){.tw\\:fill-yellow-400\\/50{fill:color-mix(in oklab, var(--tw-color-yellow-400) 50%, transparent)}}.tw\\:object-cover{object-fit:cover}.tw\\:\\!p-4{padding:calc(calc(var(--spacing)) * 4)!important}.tw\\:p-0{padding:calc(calc(var(--spacing)) * 0)}.tw\\:p-0\\.5{padding:calc(calc(var(--spacing)) * .5)}.tw\\:p-1{padding:calc(calc(var(--spacing)) * 1)}.tw\\:p-2{padding:calc(calc(var(--spacing)) * 2)}.tw\\:p-2\\.5{padding:calc(calc(var(--spacing)) * 2.5)}.tw\\:p-3{padding:calc(calc(var(--spacing)) * 3)}.tw\\:p-4{padding:calc(calc(var(--spacing)) * 4)}.tw\\:p-6{padding:calc(calc(var(--spacing)) * 6)}.tw\\:p-8{padding:calc(calc(var(--spacing)) * 8)}.tw\\:p-\\[1px\\]{padding:1px}.tw\\:p-\\[3px\\]{padding:3px}.tw\\:p-\\[10px\\]{padding:10px}.tw\\:p-\\[16px\\]{padding:16px}.tw\\:px-0{padding-inline:calc(calc(var(--spacing)) * 0)}.tw\\:px-0\\.5{padding-inline:calc(calc(var(--spacing)) * .5)}.tw\\:px-1{padding-inline:calc(calc(var(--spacing)) * 1)}.tw\\:px-1\\.5{padding-inline:calc(calc(var(--spacing)) * 1.5)}.tw\\:px-2{padding-inline:calc(calc(var(--spacing)) * 2)}.tw\\:px-2\\.5{padding-inline:calc(calc(var(--spacing)) * 2.5)}.tw\\:px-3{padding-inline:calc(calc(var(--spacing)) * 3)}.tw\\:px-4{padding-inline:calc(calc(var(--spacing)) * 4)}.tw\\:px-6{padding-inline:calc(calc(var(--spacing)) * 6)}.tw\\:py-0{padding-block:calc(calc(var(--spacing)) * 0)}.tw\\:py-0\\.5{padding-block:calc(calc(var(--spacing)) * .5)}.tw\\:py-1{padding-block:calc(calc(var(--spacing)) * 1)}.tw\\:py-1\\.5{padding-block:calc(calc(var(--spacing)) * 1.5)}.tw\\:py-2{padding-block:calc(calc(var(--spacing)) * 2)}.tw\\:py-3{padding-block:calc(calc(var(--spacing)) * 3)}.tw\\:py-4{padding-block:calc(calc(var(--spacing)) * 4)}.tw\\:py-6{padding-block:calc(calc(var(--spacing)) * 6)}.tw\\:py-8{padding-block:calc(calc(var(--spacing)) * 8)}.tw\\:py-\\[2px\\]{padding-block:2px}.tw\\:ps-1\\.5{padding-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:ps-2{padding-inline-start:calc(calc(var(--spacing)) * 2)}.tw\\:ps-2\\.5{padding-inline-start:calc(calc(var(--spacing)) * 2.5)}.tw\\:ps-4{padding-inline-start:calc(calc(var(--spacing)) * 4)}.tw\\:ps-6{padding-inline-start:calc(calc(var(--spacing)) * 6)}.tw\\:ps-7{padding-inline-start:calc(calc(var(--spacing)) * 7)}.tw\\:ps-8{padding-inline-start:calc(calc(var(--spacing)) * 8)}.tw\\:ps-9{padding-inline-start:calc(calc(var(--spacing)) * 9)}.tw\\:ps-12{padding-inline-start:calc(calc(var(--spacing)) * 12)}.tw\\:ps-\\[85px\\]{padding-inline-start:85px}.tw\\:pe-1{padding-inline-end:calc(calc(var(--spacing)) * 1)}.tw\\:pe-1\\.5{padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:pe-2{padding-inline-end:calc(calc(var(--spacing)) * 2)}.tw\\:pe-4{padding-inline-end:calc(calc(var(--spacing)) * 4)}.tw\\:pe-8{padding-inline-end:calc(calc(var(--spacing)) * 8)}.tw\\:pe-8\\!{padding-inline-end:calc(calc(var(--spacing)) * 8)!important}.tw\\:pe-9{padding-inline-end:calc(calc(var(--spacing)) * 9)}.tw\\:pe-\\[calc\\(138px\\+1rem\\)\\]{padding-inline-end:calc(138px + 1rem)}.tw\\:pe-\\[…\\]{padding-inline-end:…}.tw\\:pt-1{padding-top:calc(calc(var(--spacing)) * 1)}.tw\\:pt-2{padding-top:calc(calc(var(--spacing)) * 2)}.tw\\:pt-3{padding-top:calc(calc(var(--spacing)) * 3)}.tw\\:pt-4{padding-top:calc(calc(var(--spacing)) * 4)}.tw\\:pt-6{padding-top:calc(calc(var(--spacing)) * 6)}.tw\\:pr-0{padding-right:calc(calc(var(--spacing)) * 0)}.tw\\:pr-1{padding-right:calc(calc(var(--spacing)) * 1)}.tw\\:pr-2{padding-right:calc(calc(var(--spacing)) * 2)}.tw\\:pr-3{padding-right:calc(calc(var(--spacing)) * 3)}.tw\\:pr-4{padding-right:calc(calc(var(--spacing)) * 4)}.tw\\:pb-0{padding-bottom:calc(calc(var(--spacing)) * 0)}.tw\\:pb-1{padding-bottom:calc(calc(var(--spacing)) * 1)}.tw\\:pb-2{padding-bottom:calc(calc(var(--spacing)) * 2)}.tw\\:pb-3{padding-bottom:calc(calc(var(--spacing)) * 3)}.tw\\:pb-4{padding-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:pb-8{padding-bottom:calc(calc(var(--spacing)) * 8)}.tw\\:pb-12{padding-bottom:calc(calc(var(--spacing)) * 12)}.tw\\:pb-16{padding-bottom:calc(calc(var(--spacing)) * 16)}.tw\\:pb-24{padding-bottom:calc(calc(var(--spacing)) * 24)}.tw\\:pl-2{padding-left:calc(calc(var(--spacing)) * 2)}.tw\\:pl-3{padding-left:calc(calc(var(--spacing)) * 3)}.tw\\:pl-4{padding-left:calc(calc(var(--spacing)) * 4)}.tw\\:pl-5{padding-left:calc(calc(var(--spacing)) * 5)}.tw\\:pl-6{padding-left:calc(calc(var(--spacing)) * 6)}.tw\\:pl-8{padding-left:calc(calc(var(--spacing)) * 8)}.tw\\:text-center{text-align:center}.tw\\:text-end{text-align:end}.tw\\:text-left{text-align:left}.tw\\:text-right{text-align:right}.tw\\:text-start{text-align:start}.tw\\:align-middle{vertical-align:middle}.tw\\:font-heading{font-family:var(--font-sans)}.tw\\:font-mono{font-family:var(--tw-font-mono)}.tw\\:font-sans{font-family:IBM Plex Sans Variable,sans-serif}.tw\\:text-2xl{font-size:var(--tw-text-2xl);line-height:var(--tw-leading,var(--tw-text-2xl--line-height))}.tw\\:text-3xl{font-size:var(--tw-text-3xl);line-height:var(--tw-leading,var(--tw-text-3xl--line-height))}.tw\\:text-4xl{font-size:var(--tw-text-4xl);line-height:var(--tw-leading,var(--tw-text-4xl--line-height))}.tw\\:text-base{font-size:var(--tw-text-base);line-height:var(--tw-leading,var(--tw-text-base--line-height))}.tw\\:text-lg{font-size:var(--tw-text-lg);line-height:var(--tw-leading,var(--tw-text-lg--line-height))}.tw\\:text-sm{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:text-sm\\/relaxed{font-size:var(--tw-text-sm);line-height:var(--tw-leading-relaxed)}.tw\\:text-xl{font-size:var(--tw-text-xl);line-height:var(--tw-leading,var(--tw-text-xl--line-height))}.tw\\:text-xs{font-size:var(--tw-text-xs);line-height:var(--tw-leading,var(--tw-text-xs--line-height))}.tw\\:text-\\[0\\.8rem\\]{font-size:.8rem}.tw\\:leading-6{--tw-leading:calc(calc(var(--spacing)) * 6);line-height:calc(calc(var(--spacing)) * 6)}.tw\\:leading-loose{--tw-leading:var(--tw-leading-loose);line-height:var(--tw-leading-loose)}.tw\\:leading-none{--tw-leading:1;line-height:1}.tw\\:leading-relaxed{--tw-leading:var(--tw-leading-relaxed);line-height:var(--tw-leading-relaxed)}.tw\\:leading-snug{--tw-leading:var(--tw-leading-snug);line-height:var(--tw-leading-snug)}.tw\\:leading-tight{--tw-leading:var(--tw-leading-tight);line-height:var(--tw-leading-tight)}.tw\\:font-bold{--tw-font-weight:var(--tw-font-weight-bold);font-weight:var(--tw-font-weight-bold)}.tw\\:font-extrabold{--tw-font-weight:var(--tw-font-weight-extrabold);font-weight:var(--tw-font-weight-extrabold)}.tw\\:font-medium{--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}.tw\\:font-normal{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:font-semibold{--tw-font-weight:var(--tw-font-weight-semibold);font-weight:var(--tw-font-weight-semibold)}.tw\\:tracking-tight{--tw-tracking:var(--tw-tracking-tight);letter-spacing:var(--tw-tracking-tight)}.tw\\:tracking-wider{--tw-tracking:var(--tw-tracking-wider);letter-spacing:var(--tw-tracking-wider)}.tw\\:tracking-widest{--tw-tracking:var(--tw-tracking-widest);letter-spacing:var(--tw-tracking-widest)}.tw\\:text-balance{text-wrap:balance}.tw\\:text-nowrap{text-wrap:nowrap}.tw\\:break-words{overflow-wrap:break-word}.tw\\:text-clip{text-overflow:clip}.tw\\:text-ellipsis{text-overflow:ellipsis}.tw\\:whitespace-normal{white-space:normal}.tw\\:whitespace-nowrap{white-space:nowrap}.tw\\:whitespace-pre{white-space:pre}.tw\\:whitespace-pre-line{white-space:pre-line}.tw\\:whitespace-pre-wrap{white-space:pre-wrap}.tw\\:\\[color\\:blue\\]{color:#00f}.tw\\:text-accent-foreground{color:var(--accent-foreground)}.tw\\:text-amber-600{color:var(--tw-color-amber-600)}.tw\\:text-background{color:var(--background)}.tw\\:text-blue-400{color:var(--tw-color-blue-400)}.tw\\:text-blue-500{color:var(--tw-color-blue-500)}.tw\\:text-blue-600{color:var(--tw-color-blue-600)}.tw\\:text-blue-800{color:var(--tw-color-blue-800)}.tw\\:text-card-foreground{color:var(--card-foreground)}.tw\\:text-current{color:currentColor}.tw\\:text-destructive{color:var(--destructive)}.tw\\:text-foreground{color:var(--foreground)}.tw\\:text-foreground\\!{color:var(--foreground)!important}.tw\\:text-foreground\\/30{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/30{color:color-mix(in oklab, var(--foreground) 30%, transparent)}}.tw\\:text-foreground\\/50{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/50{color:color-mix(in oklab, var(--foreground) 50%, transparent)}}.tw\\:text-foreground\\/60{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/60{color:color-mix(in oklab, var(--foreground) 60%, transparent)}}.tw\\:text-foreground\\/70{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/70{color:color-mix(in oklab, var(--foreground) 70%, transparent)}}.tw\\:text-gray-300{color:var(--tw-color-gray-300)}.tw\\:text-gray-500{color:var(--tw-color-gray-500)}.tw\\:text-gray-600{color:var(--tw-color-gray-600)}.tw\\:text-gray-700{color:var(--tw-color-gray-700)}.tw\\:text-gray-800{color:var(--tw-color-gray-800)}.tw\\:text-green-600{color:var(--tw-color-green-600)}.tw\\:text-green-700{color:var(--tw-color-green-700)}.tw\\:text-green-800{color:var(--tw-color-green-800)}.tw\\:text-inherit{color:inherit}.tw\\:text-muted-foreground,.tw\\:text-muted-foreground\\/50{color:var(--muted-foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-muted-foreground\\/50{color:color-mix(in oklab, var(--muted-foreground) 50%, transparent)}}.tw\\:text-orange-800{color:var(--tw-color-orange-800)}.tw\\:text-popover-foreground{color:var(--popover-foreground)}.tw\\:text-primary{color:var(--primary)}.tw\\:text-primary-foreground{color:var(--primary-foreground)}.tw\\:text-purple-900{color:var(--tw-color-purple-900)}.tw\\:text-red-500{color:var(--tw-color-red-500)}.tw\\:text-red-600{color:var(--tw-color-red-600)}.tw\\:text-red-700{color:var(--tw-color-red-700)}.tw\\:text-red-800{color:var(--tw-color-red-800)}.tw\\:text-rose-600{color:var(--tw-color-rose-600)}.tw\\:text-secondary-foreground{color:var(--secondary-foreground)}.tw\\:text-sidebar-accent-foreground{color:var(--sidebar-accent-foreground)}.tw\\:text-sidebar-foreground,.tw\\:text-sidebar-foreground\\/70{color:var(--sidebar-foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-sidebar-foreground\\/70{color:color-mix(in oklab, var(--sidebar-foreground) 70%, transparent)}}.tw\\:text-sky-600{color:var(--tw-color-sky-600)}.tw\\:text-slate-900{color:var(--tw-color-slate-900)}.tw\\:text-teal-600{color:var(--tw-color-teal-600)}.tw\\:text-white{color:var(--tw-color-white)}.tw\\:text-yellow-400{color:var(--tw-color-yellow-400)}.tw\\:text-yellow-600{color:var(--tw-color-yellow-600)}.tw\\:text-yellow-700{color:var(--tw-color-yellow-700)}.tw\\:capitalize{text-transform:capitalize}.tw\\:uppercase{text-transform:uppercase}.tw\\:italic{font-style:italic}.tw\\:tabular-nums{--tw-numeric-spacing:tabular-nums;font-variant-numeric:var(--tw-ordinal,) var(--tw-slashed-zero,) var(--tw-numeric-figure,) var(--tw-numeric-spacing,) var(--tw-numeric-fraction,)}.tw\\:line-through{text-decoration-line:line-through}.tw\\:underline{text-decoration-line:underline}.tw\\:decoration-destructive{-webkit-text-decoration-color:var(--destructive);-webkit-text-decoration-color:var(--destructive);text-decoration-color:var(--destructive)}.tw\\:underline-offset-4{text-underline-offset:4px}.tw\\:opacity-0{opacity:0}.tw\\:opacity-40{opacity:.4}.tw\\:opacity-50{opacity:.5}.tw\\:opacity-60{opacity:.6}.tw\\:opacity-100{opacity:1}.tw\\:bg-blend-color{background-blend-mode:color}.tw\\:shadow{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-\\[0_0_0_1px_var\\(--sidebar-border\\)\\]{--tw-shadow:0 0 0 1px var(--tw-shadow-color,var(--sidebar-border));box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-lg{--tw-shadow:0 10px 15px -3px var(--tw-shadow-color,#0000001a), 0 4px 6px -4px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-md{--tw-shadow:0 4px 6px -1px var(--tw-shadow-color,#0000001a), 0 2px 4px -2px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-none{--tw-shadow:0 0 #0000;box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-none\\!{--tw-shadow:0 0 #0000!important;box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)!important}.tw\\:shadow-sm{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-xl{--tw-shadow:0 20px 25px -5px var(--tw-shadow-color,#0000001a), 0 8px 10px -6px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-0{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-1{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-2{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-background{--tw-ring-color:var(--background)}.tw\\:ring-foreground\\/10{--tw-ring-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:ring-foreground\\/10{--tw-ring-color:color-mix(in oklab, var(--foreground) 10%, transparent)}}.tw\\:ring-primary{--tw-ring-color:var(--primary)}.tw\\:ring-ring\\/50{--tw-ring-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.tw\\:ring-ring\\/50{--tw-ring-color:color-mix(in oklab, var(--ring) 50%, transparent)}}.tw\\:ring-sidebar-ring{--tw-ring-color:var(--sidebar-ring)}.tw\\:ring-offset-2{--tw-ring-offset-width:2px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}.tw\\:ring-offset-background{--tw-ring-offset-color:var(--background)}.tw\\:ring-offset-white{--tw-ring-offset-color:var(--tw-color-white)}.tw\\:outline-hidden{--tw-outline-style:none;outline-style:none}@media (forced-colors:active){.tw\\:outline-hidden{outline-offset:2px;outline:2px solid #0000}}.tw\\:drop-shadow-sm{--tw-drop-shadow-size:drop-shadow(0 1px 2px var(--tw-drop-shadow-color,#00000026));--tw-drop-shadow:drop-shadow(var(--tw-drop-shadow-sm));filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.tw\\:transition{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to,opacity,box-shadow,transform,translate,scale,rotate,filter,-webkit-backdrop-filter,backdrop-filter,display,content-visibility,overlay,pointer-events;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[color\\,box-shadow\\]{transition-property:color,box-shadow;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[left\\,right\\,width\\]{transition-property:left,right,width;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[margin\\,opacity\\]{transition-property:margin,opacity;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[width\\,height\\,padding\\]{transition-property:width,height,padding;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[width\\]{transition-property:width;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-all{transition-property:all;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-colors{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-opacity{transition-property:opacity;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-transform{transition-property:transform,translate,scale,rotate;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-none{transition-property:none}.tw\\:duration-100{--tw-duration:.1s;transition-duration:.1s}.tw\\:duration-200{--tw-duration:.2s;transition-duration:.2s}.tw\\:ease-linear{--tw-ease:linear;transition-timing-function:linear}.tw\\:prose-quoteless :where(blockquote p:first-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):before,.tw\\:prose-quoteless :where(blockquote p:last-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:none}.tw\\:outline-none{--tw-outline-style:none;outline-style:none}.tw\\:select-none{-webkit-user-select:none;user-select:none}.tw\\:group-focus-within\\/menu-item\\:opacity-100:is(:where(.tw\\:group\\/menu-item):focus-within *){opacity:1}@media (hover:hover){.tw\\:group-hover\\:visible:is(:where(.tw\\:group):hover *){visibility:visible}.tw\\:group-hover\\:hidden:is(:where(.tw\\:group):hover *){display:none}.tw\\:group-hover\\:opacity-100:is(:where(.tw\\:group):hover *),.tw\\:group-hover\\/menu-item\\:opacity-100:is(:where(.tw\\:group\\/menu-item):hover *){opacity:1}}.tw\\:group-focus\\/context-menu-item\\:text-accent-foreground:is(:where(.tw\\:group\\/context-menu-item):focus *),.tw\\:group-focus\\/dropdown-menu-item\\:text-accent-foreground:is(:where(.tw\\:group\\/dropdown-menu-item):focus *),.tw\\:group-focus\\/menubar-item\\:text-accent-foreground:is(:where(.tw\\:group\\/menubar-item):focus *){color:var(--accent-foreground)}.tw\\:group-has-disabled\\/field\\:opacity-50:is(:where(.tw\\:group\\/field):has(:disabled) *){opacity:.5}.tw\\:group-has-data-\\[sidebar\\=menu-action\\]\\/menu-item\\:pe-8:is(:where(.tw\\:group\\/menu-item):has([data-sidebar=menu-action]) *){padding-inline-end:calc(calc(var(--spacing)) * 8)}.tw\\:group-has-data-\\[size\\=lg\\]\\/avatar-group\\:size-10:is(:where(.tw\\:group\\/avatar-group):has([data-size=lg]) *){width:calc(calc(var(--spacing)) * 10);height:calc(calc(var(--spacing)) * 10)}.tw\\:group-has-data-\\[size\\=sm\\]\\/avatar-group\\:size-6:is(:where(.tw\\:group\\/avatar-group):has([data-size=sm]) *){width:calc(calc(var(--spacing)) * 6);height:calc(calc(var(--spacing)) * 6)}.tw\\:group-has-data-\\[slot\\=command-shortcut\\]\\/command-item\\:hidden:is(:where(.tw\\:group\\/command-item):has([data-slot=command-shortcut]) *){display:none}.tw\\:group-has-\\[\\>input\\]\\/input-group\\:pt-2:is(:where(.tw\\:group\\/input-group):has(>input) *){padding-top:calc(calc(var(--spacing)) * 2)}.tw\\:group-has-\\[\\>input\\]\\/input-group\\:pb-2:is(:where(.tw\\:group\\/input-group):has(>input) *){padding-bottom:calc(calc(var(--spacing)) * 2)}.tw\\:group-has-\\[\\>svg\\]\\/alert\\:col-start-2:is(:where(.tw\\:group\\/alert):has(>svg) *){grid-column-start:2}.tw\\:group-data-\\[checked\\=true\\]\\/command-item\\:opacity-100:is(:where(.tw\\:group\\/command-item)[data-checked=true] *){opacity:1}.tw\\:group-data-\\[collapsible\\=icon\\]\\:-mt-8:is(:where(.tw\\:group)[data-collapsible=icon] *){margin-top:calc(calc(var(--spacing)) * -8)}.tw\\:group-data-\\[collapsible\\=icon\\]\\:hidden:is(:where(.tw\\:group)[data-collapsible=icon] *){display:none}.tw\\:group-data-\\[collapsible\\=icon\\]\\:size-8\\!:is(:where(.tw\\:group)[data-collapsible=icon] *){width:calc(calc(var(--spacing)) * 8)!important;height:calc(calc(var(--spacing)) * 8)!important}.tw\\:group-data-\\[collapsible\\=icon\\]\\:w-\\(--sidebar-width-icon\\):is(:where(.tw\\:group)[data-collapsible=icon] *){width:var(--sidebar-width-icon)}.tw\\:group-data-\\[collapsible\\=icon\\]\\:w-\\[calc\\(var\\(--sidebar-width-icon\\)\\+\\(--spacing\\(4\\)\\)\\)\\]:is(:where(.tw\\:group)[data-collapsible=icon] *){width:calc(var(--sidebar-width-icon) + (calc(calc(var(--spacing)) * 4)))}.tw\\:group-data-\\[collapsible\\=icon\\]\\:w-\\[calc\\(var\\(--sidebar-width-icon\\)\\+\\(--spacing\\(4\\)\\)\\+2px\\)\\]:is(:where(.tw\\:group)[data-collapsible=icon] *){width:calc(var(--sidebar-width-icon) + (calc(calc(var(--spacing)) * 4)) + 2px)}.tw\\:group-data-\\[collapsible\\=icon\\]\\:overflow-hidden:is(:where(.tw\\:group)[data-collapsible=icon] *){overflow:hidden}.tw\\:group-data-\\[collapsible\\=icon\\]\\:p-0\\!:is(:where(.tw\\:group)[data-collapsible=icon] *){padding:calc(calc(var(--spacing)) * 0)!important}.tw\\:group-data-\\[collapsible\\=icon\\]\\:p-2\\!:is(:where(.tw\\:group)[data-collapsible=icon] *){padding:calc(calc(var(--spacing)) * 2)!important}.tw\\:group-data-\\[collapsible\\=icon\\]\\:opacity-0:is(:where(.tw\\:group)[data-collapsible=icon] *){opacity:0}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:right-\\[calc\\(var\\(--sidebar-width\\)\\*-1\\)\\]:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){right:calc(var(--sidebar-width) * -1)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:left-\\[calc\\(var\\(--sidebar-width\\)\\*-1\\)\\]:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){left:calc(var(--sidebar-width) * -1)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:w-0:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){width:calc(calc(var(--spacing)) * 0)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:translate-x-0:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){--tw-translate-x:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:group-data-\\[disabled\\=true\\]\\:pointer-events-none:is(:where(.tw\\:group)[data-disabled=true] *){pointer-events:none}.tw\\:group-data-\\[disabled\\=true\\]\\:opacity-50:is(:where(.tw\\:group)[data-disabled=true] *),.tw\\:group-data-\\[disabled\\=true\\]\\/input-group\\:opacity-50:is(:where(.tw\\:group\\/input-group)[data-disabled=true] *){opacity:.5}.tw\\:group-data-\\[side\\=primary\\]\\:-right-4:is(:where(.tw\\:group)[data-side=primary] *){right:calc(calc(var(--spacing)) * -4)}.tw\\:group-data-\\[side\\=primary\\]\\:border-e:is(:where(.tw\\:group)[data-side=primary] *){border-inline-end-style:var(--tw-border-style);border-inline-end-width:1px}.tw\\:group-data-\\[side\\=secondary\\]\\:left-0:is(:where(.tw\\:group)[data-side=secondary] *){left:calc(calc(var(--spacing)) * 0)}.tw\\:group-data-\\[side\\=secondary\\]\\:rotate-180:is(:where(.tw\\:group)[data-side=secondary] *){rotate:180deg}.tw\\:group-data-\\[side\\=secondary\\]\\:border-s:is(:where(.tw\\:group)[data-side=secondary] *){border-inline-start-style:var(--tw-border-style);border-inline-start-width:1px}.tw\\:group-data-\\[size\\=default\\]\\/avatar\\:size-2\\.5:is(:where(.tw\\:group\\/avatar)[data-size=default] *){width:calc(calc(var(--spacing)) * 2.5);height:calc(calc(var(--spacing)) * 2.5)}.tw\\:group-data-\\[size\\=default\\]\\/switch\\:size-4:is(:where(.tw\\:group\\/switch)[data-size=default] *){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[size\\=lg\\]\\/avatar\\:size-3:is(:where(.tw\\:group\\/avatar)[data-size=lg] *){width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[size\\=sm\\]\\/avatar\\:size-2:is(:where(.tw\\:group\\/avatar)[data-size=sm] *){width:calc(calc(var(--spacing)) * 2);height:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[size\\=sm\\]\\/avatar\\:text-xs:is(:where(.tw\\:group\\/avatar)[data-size=sm] *){font-size:var(--tw-text-xs);line-height:var(--tw-leading,var(--tw-text-xs--line-height))}.tw\\:group-data-\\[size\\=sm\\]\\/card\\:p-3:is(:where(.tw\\:group\\/card)[data-size=sm] *){padding:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[size\\=sm\\]\\/card\\:px-3:is(:where(.tw\\:group\\/card)[data-size=sm] *){padding-inline:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[size\\=sm\\]\\/card\\:text-sm:is(:where(.tw\\:group\\/card)[data-size=sm] *){font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:size-3:is(:where(.tw\\:group\\/switch)[data-size=sm] *){width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[spacing\\=0\\]\\/toggle-group\\:rounded-none:is(:where(.tw\\:group\\/toggle-group)[data-spacing="0"] *){border-radius:0}.tw\\:group-data-\\[spacing\\=0\\]\\/toggle-group\\:px-2:is(:where(.tw\\:group\\/toggle-group)[data-spacing="0"] *){padding-inline:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[variant\\=floating\\]\\:rounded-lg:is(:where(.tw\\:group)[data-variant=floating] *){border-radius:var(--radius)}.tw\\:group-data-\\[variant\\=floating\\]\\:shadow-sm:is(:where(.tw\\:group)[data-variant=floating] *){--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:group-data-\\[variant\\=floating\\]\\:ring-1:is(:where(.tw\\:group)[data-variant=floating] *){--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:group-data-\\[variant\\=floating\\]\\:ring-sidebar-border:is(:where(.tw\\:group)[data-variant=floating] *){--tw-ring-color:var(--sidebar-border)}.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:bg-transparent:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *){background-color:#0000}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:mx-auto:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){margin-inline:auto}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:mt-4:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){margin-top:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:block:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){display:block}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:h-1\\.5:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){height:calc(calc(var(--spacing)) * 1.5)}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:w-\\[100px\\]:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){width:100px}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:text-center:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){text-align:center}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:my-auto:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){margin-block:auto}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:me-4:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){margin-inline-end:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:block:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){display:block}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:h-\\[100px\\]:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){height:100px}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:w-1\\.5:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){width:calc(calc(var(--spacing)) * 1.5)}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:my-auto:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){margin-block:auto}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:ms-4:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){margin-inline-start:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:block:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){display:block}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:h-\\[100px\\]:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){height:100px}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:w-1\\.5:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){width:calc(calc(var(--spacing)) * 1.5)}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:mx-auto:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){margin-inline:auto}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:mb-4:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){margin-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:block:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){display:block}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:h-1\\.5:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){height:calc(calc(var(--spacing)) * 1.5)}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:w-\\[100px\\]:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){width:100px}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:text-center:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){text-align:center}.tw\\:group-data-selected\\/command-item\\:text-foreground:is(:where(.tw\\:group\\/command-item):where([data-selected=true]) *){color:var(--foreground)}.tw\\:group-data-horizontal\\/tabs\\:h-8:is(:where(.tw\\:group\\/tabs):where([data-orientation=horizontal]) *){height:calc(calc(var(--spacing)) * 8)}.tw\\:group-data-vertical\\/tabs\\:h-fit:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *){height:fit-content}.tw\\:group-data-vertical\\/tabs\\:w-full:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *){width:100%}.tw\\:group-data-vertical\\/tabs\\:flex-col:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *){flex-direction:column}.tw\\:group-data-vertical\\/tabs\\:justify-start:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *){justify-content:flex-start}@media (hover:hover){.tw\\:peer-hover\\/menu-button\\:text-sidebar-accent-foreground:is(:where(.tw\\:peer\\/menu-button):hover~*){color:var(--sidebar-accent-foreground)}.tw\\:peer-focus\\:group-hover\\:text-blue-500:is(:where(.tw\\:peer):focus~*):is(:where(.tw\\:group):hover *){color:var(--tw-color-blue-500)}}.tw\\:peer-disabled\\:cursor-not-allowed:is(:where(.tw\\:peer):disabled~*){cursor:not-allowed}.tw\\:peer-disabled\\:opacity-50:is(:where(.tw\\:peer):disabled~*){opacity:.5}.tw\\:peer-data-\\[size\\=default\\]\\/menu-button\\:top-1\\.5:is(:where(.tw\\:peer\\/menu-button)[data-size=default]~*){top:calc(calc(var(--spacing)) * 1.5)}.tw\\:peer-data-\\[size\\=lg\\]\\/menu-button\\:top-2\\.5:is(:where(.tw\\:peer\\/menu-button)[data-size=lg]~*){top:calc(calc(var(--spacing)) * 2.5)}.tw\\:peer-data-\\[size\\=sm\\]\\/menu-button\\:top-1:is(:where(.tw\\:peer\\/menu-button)[data-size=sm]~*){top:calc(calc(var(--spacing)) * 1)}.tw\\:peer-data-active\\/menu-button\\:text-sidebar-accent-foreground:is(:is(:where(.tw\\:peer\\/menu-button):where([data-state=active]),:where(.tw\\:peer\\/menu-button):where([data-active]:not([data-active=false])))~*){color:var(--sidebar-accent-foreground)}.tw\\:file\\:inline-flex::file-selector-button{display:inline-flex}.tw\\:file\\:h-6::file-selector-button{height:calc(calc(var(--spacing)) * 6)}.tw\\:file\\:border-0::file-selector-button{border-style:var(--tw-border-style);border-width:0}.tw\\:file\\:bg-transparent::file-selector-button{background-color:#0000}.tw\\:file\\:text-sm::file-selector-button{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:file\\:font-medium::file-selector-button{--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}.tw\\:file\\:text-foreground::file-selector-button{color:var(--foreground)}.tw\\:placeholder\\:text-muted-foreground::placeholder{color:var(--muted-foreground)}.tw\\:placeholder\\:text-slate-400::placeholder{color:var(--tw-color-slate-400)}.tw\\:before\\:pointer-events-none:before{content:var(--tw-content);pointer-events:none}.tw\\:before\\:absolute:before{content:var(--tw-content);position:absolute}.tw\\:before\\:inset-0:before{content:var(--tw-content);inset:calc(calc(var(--spacing)) * 0)}.tw\\:before\\:top-0\\.5:before{content:var(--tw-content);top:calc(calc(var(--spacing)) * .5)}.tw\\:before\\:left-0:before{content:var(--tw-content);left:calc(calc(var(--spacing)) * 0)}.tw\\:before\\:-z-1:before{content:var(--tw-content);z-index:calc(1 * -1)}.tw\\:before\\:block:before{content:var(--tw-content);display:block}.tw\\:before\\:hidden:before{content:var(--tw-content);display:none}.tw\\:before\\:h-4:before{content:var(--tw-content);height:calc(calc(var(--spacing)) * 4)}.tw\\:before\\:w-4:before{content:var(--tw-content);width:calc(calc(var(--spacing)) * 4)}.tw\\:before\\:cursor-pointer:before{content:var(--tw-content);cursor:pointer}.tw\\:before\\:rounded:before{content:var(--tw-content);border-radius:.25rem}.tw\\:before\\:rounded-\\[inherit\\]:before{content:var(--tw-content);border-radius:inherit}.tw\\:before\\:border:before{content:var(--tw-content);border-style:var(--tw-border-style);border-width:1px}.tw\\:before\\:border-primary:before{content:var(--tw-content);border-color:var(--primary)}.tw\\:before\\:bg-primary:before{content:var(--tw-content);background-color:var(--primary)}.tw\\:before\\:bg-cover:before{content:var(--tw-content);background-size:cover}.tw\\:before\\:bg-no-repeat:before{content:var(--tw-content);background-repeat:no-repeat}.tw\\:before\\:backdrop-blur-2xl:before{content:var(--tw-content);--tw-backdrop-blur:blur(var(--tw-blur-2xl));-webkit-backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)}.tw\\:before\\:backdrop-saturate-150:before{content:var(--tw-content);--tw-backdrop-saturate:saturate(150%);-webkit-backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)}.tw\\:before\\:content-\\[\\"\\"\\]:before{--tw-content:"";content:var(--tw-content)}.tw\\:before\\:content-\\[\\\\\\"\\\\\\"\\]:before{--tw-content:\\"\\";content:var(--tw-content)}.tw\\:after\\:absolute:after{content:var(--tw-content);position:absolute}.tw\\:after\\:-inset-2:after{content:var(--tw-content);inset:calc(calc(var(--spacing)) * -2)}.tw\\:after\\:inset-0:after{content:var(--tw-content);inset:calc(calc(var(--spacing)) * 0)}.tw\\:after\\:-inset-x-3:after{content:var(--tw-content);inset-inline:calc(calc(var(--spacing)) * -3)}.tw\\:after\\:-inset-y-2:after{content:var(--tw-content);inset-block:calc(calc(var(--spacing)) * -2)}.tw\\:after\\:inset-y-0:after{content:var(--tw-content);inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:after\\:start-1\\/2:after{content:var(--tw-content);inset-inline-start:50%}.tw\\:after\\:top-\\[6px\\]:after{content:var(--tw-content);top:6px}.tw\\:after\\:right-\\[7px\\]:after{content:var(--tw-content);right:7px}.tw\\:after\\:left-\\[7px\\]:after{content:var(--tw-content);left:7px}.tw\\:after\\:block:after{content:var(--tw-content);display:block}.tw\\:after\\:hidden:after{content:var(--tw-content);display:none}.tw\\:after\\:h-0\\.5:after{content:var(--tw-content);height:calc(calc(var(--spacing)) * .5)}.tw\\:after\\:h-\\[6px\\]:after{content:var(--tw-content);height:6px}.tw\\:after\\:w-1:after{content:var(--tw-content);width:calc(calc(var(--spacing)) * 1)}.tw\\:after\\:w-\\[2px\\]:after{content:var(--tw-content);width:2px}.tw\\:after\\:w-\\[3px\\]:after{content:var(--tw-content);width:3px}.tw\\:after\\:-translate-x-1\\/2:after{content:var(--tw-content);--tw-translate-x:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:after\\:rotate-45:after{content:var(--tw-content);rotate:45deg}.tw\\:after\\:cursor-pointer:after{content:var(--tw-content);cursor:pointer}.tw\\:after\\:rounded-full:after{content:var(--tw-content);border-radius:3.40282e38px}.tw\\:after\\:border:after{content:var(--tw-content);border-style:var(--tw-border-style);border-width:1px}.tw\\:after\\:border-t-0:after{content:var(--tw-content);border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:after\\:border-r-2:after{content:var(--tw-content);border-right-style:var(--tw-border-style);border-right-width:2px}.tw\\:after\\:border-b-2:after{content:var(--tw-content);border-bottom-style:var(--tw-border-style);border-bottom-width:2px}.tw\\:after\\:border-l-0:after{content:var(--tw-content);border-left-style:var(--tw-border-style);border-left-width:0}.tw\\:after\\:border-solid:after{content:var(--tw-content);--tw-border-style:solid;border-style:solid}.tw\\:after\\:border-border:after{content:var(--tw-content);border-color:var(--border)}.tw\\:after\\:border-white:after{content:var(--tw-content);border-color:var(--tw-color-white)}.tw\\:after\\:bg-foreground:after{content:var(--tw-content);background-color:var(--foreground)}.tw\\:after\\:bg-muted:after{content:var(--tw-content);background-color:var(--muted)}.tw\\:after\\:opacity-0:after{content:var(--tw-content);opacity:0}.tw\\:after\\:mix-blend-darken:after{content:var(--tw-content);mix-blend-mode:darken}.tw\\:after\\:transition-opacity:after{content:var(--tw-content);transition-property:opacity;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:after\\:content-\\[\\"\\"\\]:after{--tw-content:"";content:var(--tw-content)}.tw\\:after\\:content-\\[\\\\\\"\\\\\\"\\]:after{--tw-content:\\"\\";content:var(--tw-content)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:after\\:start-full:is(:where(.tw\\:group)[data-collapsible=offcanvas] *):after{content:var(--tw-content);inset-inline-start:100%}.tw\\:group-data-horizontal\\/tabs\\:after\\:inset-x-0:is(:where(.tw\\:group\\/tabs):where([data-orientation=horizontal]) *):after{content:var(--tw-content);inset-inline:calc(calc(var(--spacing)) * 0)}.tw\\:group-data-horizontal\\/tabs\\:after\\:bottom-\\[-5px\\]:is(:where(.tw\\:group\\/tabs):where([data-orientation=horizontal]) *):after{content:var(--tw-content);bottom:-5px}.tw\\:group-data-horizontal\\/tabs\\:after\\:h-0\\.5:is(:where(.tw\\:group\\/tabs):where([data-orientation=horizontal]) *):after{content:var(--tw-content);height:calc(calc(var(--spacing)) * .5)}.tw\\:group-data-vertical\\/tabs\\:after\\:inset-y-0:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *):after{content:var(--tw-content);inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:group-data-vertical\\/tabs\\:after\\:-end-1:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *):after{content:var(--tw-content);inset-inline-end:calc(calc(var(--spacing)) * -1)}.tw\\:group-data-vertical\\/tabs\\:after\\:w-0\\.5:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *):after{content:var(--tw-content);width:calc(calc(var(--spacing)) * .5)}.tw\\:first\\:mt-0:first-child{margin-top:calc(calc(var(--spacing)) * 0)}.tw\\:even\\:bg-muted:nth-child(2n){background-color:var(--muted)}.tw\\:focus-within\\:ring-2:focus-within{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-within\\:ring-ring:focus-within{--tw-ring-color:var(--ring)}.tw\\:focus-within\\:ring-offset-1:focus-within{--tw-ring-offset-width:1px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}@media (hover:hover){.tw\\:hover\\:-mt-4:hover{margin-top:calc(calc(var(--spacing)) * -4)}.tw\\:hover\\:cursor-pointer:hover{cursor:pointer}.tw\\:hover\\:bg-accent:hover,.tw\\:hover\\:bg-accent\\/30:hover{background-color:var(--accent)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-accent\\/30:hover{background-color:color-mix(in oklab, var(--accent) 30%, transparent)}}.tw\\:hover\\:bg-accent\\/80:hover{background-color:var(--accent)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-accent\\/80:hover{background-color:color-mix(in oklab, var(--accent) 80%, transparent)}}.tw\\:hover\\:bg-blue-600:hover{background-color:var(--tw-color-blue-600)}.tw\\:hover\\:bg-destructive\\/20:hover{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-destructive\\/20:hover{background-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:hover\\:bg-gray-50:hover{background-color:var(--tw-color-gray-50)}.tw\\:hover\\:bg-input:hover{background-color:var(--input)}.tw\\:hover\\:bg-muted:hover,.tw\\:hover\\:bg-muted\\/50:hover{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-muted\\/50:hover{background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:hover\\:bg-muted\\/80:hover{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-muted\\/80:hover{background-color:color-mix(in oklab, var(--muted) 80%, transparent)}}.tw\\:hover\\:bg-primary\\/10:hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-primary\\/10:hover{background-color:color-mix(in oklab, var(--primary) 10%, transparent)}}.tw\\:hover\\:bg-primary\\/70:hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-primary\\/70:hover{background-color:color-mix(in oklab, var(--primary) 70%, transparent)}}.tw\\:hover\\:bg-primary\\/90:hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-primary\\/90:hover{background-color:color-mix(in oklab, var(--primary) 90%, transparent)}}.tw\\:hover\\:bg-red-500:hover{background-color:var(--tw-color-red-500)}.tw\\:hover\\:bg-secondary:hover,.tw\\:hover\\:bg-secondary\\/80:hover{background-color:var(--secondary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-secondary\\/80:hover{background-color:color-mix(in oklab, var(--secondary) 80%, transparent)}}.tw\\:hover\\:bg-sidebar-accent:hover{background-color:var(--sidebar-accent)}.tw\\:hover\\:bg-transparent:hover{background-color:#0000}.tw\\:hover\\:text-foreground:hover{color:var(--foreground)}.tw\\:hover\\:text-muted-foreground:hover{color:var(--muted-foreground)}.tw\\:hover\\:text-primary-foreground:hover{color:var(--primary-foreground)}.tw\\:hover\\:text-sidebar-accent-foreground:hover{color:var(--sidebar-accent-foreground)}.tw\\:hover\\:underline:hover{text-decoration-line:underline}.tw\\:hover\\:opacity-80:hover{opacity:.8}.tw\\:hover\\:opacity-100:hover{opacity:1}.tw\\:hover\\:shadow-\\[0_0_0_1px_var\\(--sidebar-accent\\)\\]:hover{--tw-shadow:0 0 0 1px var(--tw-shadow-color,var(--sidebar-accent));box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:hover\\:shadow-md:hover{--tw-shadow:0 4px 6px -1px var(--tw-shadow-color,#0000001a), 0 2px 4px -2px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:hover\\:ring-3:hover{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:hover\\:group-data-\\[collapsible\\=offcanvas\\]\\:bg-sidebar:hover:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){background-color:var(--sidebar)}.tw\\:hover\\:after\\:bg-sidebar-border:hover:after{content:var(--tw-content);background-color:var(--sidebar-border)}}.tw\\:focus\\:relative:focus{position:relative}.tw\\:focus\\:z-10:focus{z-index:10}.tw\\:focus\\:bg-accent:focus{background-color:var(--accent)}.tw\\:focus\\:bg-muted:focus{background-color:var(--muted)}.tw\\:focus\\:text-accent-foreground:focus{color:var(--accent-foreground)}.tw\\:focus\\:text-foreground:focus{color:var(--foreground)}.tw\\:focus\\:ring-2:focus{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus\\:ring-ring:focus{--tw-ring-color:var(--ring)}.tw\\:focus\\:ring-offset-1:focus{--tw-ring-offset-width:1px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}.tw\\:focus\\:ring-offset-background:focus{--tw-ring-offset-color:var(--background)}.tw\\:focus\\:outline-hidden:focus{--tw-outline-style:none;outline-style:none}@media (forced-colors:active){.tw\\:focus\\:outline-hidden:focus{outline-offset:2px;outline:2px solid #0000}}:is(.tw\\:focus\\:\\*\\*\\:text-accent-foreground:focus *),:is(.tw\\:not-data-\\[variant\\=destructive\\]\\:focus\\:\\*\\*\\:text-accent-foreground:not([data-variant=destructive]):focus *){color:var(--accent-foreground)}.tw\\:focus-visible\\:relative:focus-visible{position:relative}.tw\\:focus-visible\\:z-10:focus-visible{z-index:10}.tw\\:focus-visible\\:border-destructive\\/40:focus-visible{border-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:focus-visible\\:border-destructive\\/40:focus-visible{border-color:color-mix(in oklab, var(--destructive) 40%, transparent)}}.tw\\:focus-visible\\:border-ring:focus-visible{border-color:var(--ring)}.tw\\:focus-visible\\:ring-0:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-visible\\:ring-1:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-visible\\:ring-2:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-visible\\:ring-3:focus-visible,.tw\\:focus-visible\\:ring-\\[3px\\]:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-visible\\:ring-\\[color\\:hsl\\(240\\,5\\%\\,64\\.9\\%\\)\\]:focus-visible{--tw-ring-color:#a1a1aa}.tw\\:focus-visible\\:ring-destructive\\/20:focus-visible{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:focus-visible\\:ring-destructive\\/20:focus-visible{--tw-ring-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:focus-visible\\:ring-ring:focus-visible,.tw\\:focus-visible\\:ring-ring\\/50:focus-visible{--tw-ring-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.tw\\:focus-visible\\:ring-ring\\/50:focus-visible{--tw-ring-color:color-mix(in oklab, var(--ring) 50%, transparent)}}.tw\\:focus-visible\\:ring-slate-400:focus-visible{--tw-ring-color:var(--tw-color-slate-400)}.tw\\:focus-visible\\:ring-offset-2:focus-visible{--tw-ring-offset-width:2px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}.tw\\:focus-visible\\:outline-hidden:focus-visible{--tw-outline-style:none;outline-style:none}@media (forced-colors:active){.tw\\:focus-visible\\:outline-hidden:focus-visible{outline-offset:2px;outline:2px solid #0000}}.tw\\:focus-visible\\:outline-1:focus-visible{outline-style:var(--tw-outline-style);outline-width:1px}.tw\\:focus-visible\\:outline-ring:focus-visible{outline-color:var(--ring)}.tw\\:focus-visible\\:outline-none:focus-visible{--tw-outline-style:none;outline-style:none}:is(.tw\\:\\*\\:focus-visible\\:relative>*):focus-visible{position:relative}:is(.tw\\:\\*\\:focus-visible\\:z-10>*):focus-visible{z-index:10}.tw\\:active\\:bg-sidebar-accent:active{background-color:var(--sidebar-accent)}.tw\\:active\\:text-sidebar-accent-foreground:active{color:var(--sidebar-accent-foreground)}.tw\\:active\\:ring-3:active{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:active\\:not-aria-\\[haspopup\\]\\:translate-y-px:active:not([aria-haspopup]){--tw-translate-y:1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:active\\:not-aria-\\[haspopup\\]\\:transform-\\[translateY\\(1px\\)\\]:active:not([aria-haspopup]){transform:translateY(1px)}.tw\\:disabled\\:pointer-events-none:disabled{pointer-events:none}.tw\\:disabled\\:cursor-not-allowed:disabled{cursor:not-allowed}.tw\\:disabled\\:bg-input\\/50:disabled{background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:disabled\\:bg-input\\/50:disabled{background-color:color-mix(in oklab, var(--input) 50%, transparent)}}.tw\\:disabled\\:bg-transparent:disabled{background-color:#0000}.tw\\:disabled\\:opacity-50:disabled{opacity:.5}:where([data-side=bottom]) .tw\\:in-data-\\[side\\=bottom\\]\\:translate-y-\\[calc\\(-50\\%-1px\\)\\]{--tw-translate-y:calc(-50% - 1px);translate:var(--tw-translate-x) var(--tw-translate-y)}:where([data-side=bottom]) .tw\\:in-data-\\[side\\=bottom\\]\\:\\[clip-path\\:polygon\\(100\\%_0\\,100\\%_100\\%\\,0_100\\%\\)\\]{clip-path:polygon(100% 0,100% 100%,0 100%)}:where([data-side=primary]) .tw\\:in-data-\\[side\\=primary\\]\\:cursor-w-resize{cursor:w-resize}:where([data-side=secondary]) .tw\\:in-data-\\[side\\=secondary\\]\\:cursor-e-resize{cursor:e-resize}:where([data-side=top]) .tw\\:in-data-\\[side\\=top\\]\\:translate-y-\\[calc\\(-50\\%-1px\\)\\]{--tw-translate-y:calc(-50% - 1px);translate:var(--tw-translate-x) var(--tw-translate-y)}:where([data-side=top]) .tw\\:in-data-\\[side\\=top\\]\\:\\[clip-path\\:polygon\\(100\\%_0\\,100\\%_100\\%\\,0_100\\%\\)\\]{clip-path:polygon(100% 0,100% 100%,0 100%)}:where([data-slot=button-group]) .tw\\:in-data-\\[slot\\=button-group\\]\\:rounded-lg{border-radius:var(--radius)}:where([data-slot=combobox-content]) .tw\\:in-data-\\[slot\\=combobox-content\\]\\:focus-within\\:border-inherit:focus-within{border-color:inherit}:where([data-slot=combobox-content]) .tw\\:in-data-\\[slot\\=combobox-content\\]\\:focus-within\\:ring-0:focus-within{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}:where([data-slot=dialog-content]) .tw\\:in-data-\\[slot\\=dialog-content\\]\\:rounded-lg\\!{border-radius:var(--radius)!important}:where([data-slot=tooltip-content]) .tw\\:in-data-\\[slot\\=tooltip-content\\]\\:bg-background\\/20{background-color:var(--background)}@supports (color:color-mix(in lab, red, red)){:where([data-slot=tooltip-content]) .tw\\:in-data-\\[slot\\=tooltip-content\\]\\:bg-background\\/20{background-color:color-mix(in oklab, var(--background) 20%, transparent)}}:where([data-slot=tooltip-content]) .tw\\:in-data-\\[slot\\=tooltip-content\\]\\:text-background{color:var(--background)}:where([data-slot=tooltip-content]) .tw\\:in-data-\\[slot\\=tooltip-content\\]\\:text-destructive{color:var(--destructive)}.tw\\:has-disabled\\:bg-input\\/50:has(:disabled){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:has-disabled\\:bg-input\\/50:has(:disabled){background-color:color-mix(in oklab, var(--input) 50%, transparent)}}.tw\\:has-disabled\\:opacity-50:has(:disabled){opacity:.5}.tw\\:has-aria-expanded\\:bg-muted\\/50:has([aria-expanded=true]){background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:has-aria-expanded\\:bg-muted\\/50:has([aria-expanded=true]){background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:has-data-\\[icon\\=inline-end\\]\\:pe-1:has([data-icon=inline-end]){padding-inline-end:calc(calc(var(--spacing)) * 1)}.tw\\:has-data-\\[icon\\=inline-end\\]\\:pe-1\\.5:has([data-icon=inline-end]){padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[icon\\=inline-end\\]\\:pe-2:has([data-icon=inline-end]){padding-inline-end:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[spacing\\=0\\]\\/toggle-group\\:has-data-\\[icon\\=inline-end\\]\\:pe-1\\.5:is(:where(.tw\\:group\\/toggle-group)[data-spacing="0"] *):has([data-icon=inline-end]){padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[icon\\=inline-start\\]\\:ps-1:has([data-icon=inline-start]){padding-inline-start:calc(calc(var(--spacing)) * 1)}.tw\\:has-data-\\[icon\\=inline-start\\]\\:ps-1\\.5:has([data-icon=inline-start]){padding-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[icon\\=inline-start\\]\\:ps-2:has([data-icon=inline-start]){padding-inline-start:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[spacing\\=0\\]\\/toggle-group\\:has-data-\\[icon\\=inline-start\\]\\:ps-1\\.5:is(:where(.tw\\:group\\/toggle-group)[data-spacing="0"] *):has([data-icon=inline-start]){padding-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[slot\\=alert-action\\]\\:relative:has([data-slot=alert-action]){position:relative}.tw\\:has-data-\\[slot\\=alert-action\\]\\:pe-18:has([data-slot=alert-action]){padding-inline-end:calc(calc(var(--spacing)) * 18)}.tw\\:has-data-\\[slot\\=card-action\\]\\:grid-cols-\\[1fr_auto\\]:has([data-slot=card-action]){grid-template-columns:1fr auto}.tw\\:has-data-\\[slot\\=card-description\\]\\:grid-rows-\\[auto_auto\\]:has([data-slot=card-description]){grid-template-rows:auto auto}.tw\\:has-data-\\[slot\\=card-footer\\]\\:pb-0:has([data-slot=card-footer]){padding-bottom:calc(calc(var(--spacing)) * 0)}.tw\\:has-data-\\[slot\\=kbd\\]\\:pe-0:has([data-slot=kbd]){padding-inline-end:calc(calc(var(--spacing)) * 0)}.tw\\:has-data-\\[slot\\=kbd\\]\\:pe-1\\.5:has([data-slot=kbd]){padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[variant\\=inset\\]\\:bg-sidebar:has([data-variant=inset]){background-color:var(--sidebar)}.tw\\:has-\\[\\[data-slot\\=input-group-control\\]\\:focus-visible\\]\\:border-ring:has([data-slot=input-group-control]:focus-visible){border-color:var(--ring)}.tw\\:has-\\[\\[data-slot\\=input-group-control\\]\\:focus-visible\\]\\:ring-3:has([data-slot=input-group-control]:focus-visible){--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:has-\\[\\[data-slot\\=input-group-control\\]\\:focus-visible\\]\\:ring-ring\\/50:has([data-slot=input-group-control]:focus-visible){--tw-ring-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.tw\\:has-\\[\\[data-slot\\=input-group-control\\]\\:focus-visible\\]\\:ring-ring\\/50:has([data-slot=input-group-control]:focus-visible){--tw-ring-color:color-mix(in oklab, var(--ring) 50%, transparent)}}.tw\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:border-destructive:has([data-slot][aria-invalid=true]){border-color:var(--destructive)}.tw\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-3:has([data-slot][aria-invalid=true]){--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-destructive\\/20:has([data-slot][aria-invalid=true]){--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-destructive\\/20:has([data-slot][aria-invalid=true]){--tw-ring-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:has-\\[\\>\\[data-align\\=block-end\\]\\]\\:h-auto:has(>[data-align=block-end]){height:auto}.tw\\:has-\\[\\>\\[data-align\\=block-end\\]\\]\\:flex-col:has(>[data-align=block-end]){flex-direction:column}.tw\\:has-\\[\\>\\[data-align\\=block-start\\]\\]\\:h-auto:has(>[data-align=block-start]){height:auto}.tw\\:has-\\[\\>\\[data-align\\=block-start\\]\\]\\:flex-col:has(>[data-align=block-start]){flex-direction:column}.tw\\:has-\\[\\>\\[data-slot\\=button-group\\]\\]\\:gap-2:has(>[data-slot=button-group]){gap:calc(calc(var(--spacing)) * 2)}.tw\\:has-\\[\\>button\\]\\:ms-\\[-0\\.3rem\\]:has(>button){margin-inline-start:-.3rem}.tw\\:has-\\[\\>button\\]\\:me-\\[-0\\.3rem\\]:has(>button){margin-inline-end:-.3rem}.tw\\:has-\\[\\>img\\]\\:grid-cols-\\[auto_1fr\\]:has(>img){grid-template-columns:auto 1fr}.tw\\:has-\\[\\>img\\]\\:gap-x-2:has(>img){column-gap:calc(calc(var(--spacing)) * 2)}.tw\\:has-\\[\\>img\\:first-child\\]\\:pt-0:has(>img:first-child){padding-top:calc(calc(var(--spacing)) * 0)}.tw\\:has-\\[\\>kbd\\]\\:ms-\\[-0\\.15rem\\]:has(>kbd){margin-inline-start:-.15rem}.tw\\:has-\\[\\>kbd\\]\\:me-\\[-0\\.15rem\\]:has(>kbd){margin-inline-end:-.15rem}.tw\\:has-\\[\\>svg\\]\\:grid-cols-\\[auto_1fr\\]:has(>svg){grid-template-columns:auto 1fr}.tw\\:has-\\[\\>svg\\]\\:gap-x-2:has(>svg){column-gap:calc(calc(var(--spacing)) * 2)}.tw\\:has-\\[\\>svg\\]\\:p-0:has(>svg){padding:calc(calc(var(--spacing)) * 0)}.tw\\:has-\\[\\>textarea\\]\\:h-auto:has(>textarea){height:auto}.tw\\:aria-disabled\\:pointer-events-none[aria-disabled=true]{pointer-events:none}.tw\\:aria-disabled\\:opacity-50[aria-disabled=true]{opacity:.5}.tw\\:aria-expanded\\:bg-muted[aria-expanded=true]{background-color:var(--muted)}.tw\\:aria-expanded\\:bg-secondary[aria-expanded=true]{background-color:var(--secondary)}.tw\\:aria-expanded\\:text-foreground[aria-expanded=true]{color:var(--foreground)}.tw\\:aria-expanded\\:text-secondary-foreground[aria-expanded=true]{color:var(--secondary-foreground)}.tw\\:aria-expanded\\:opacity-100[aria-expanded=true]{opacity:1}.tw\\:aria-invalid\\:border-destructive[aria-invalid=true]{border-color:var(--destructive)}.tw\\:aria-invalid\\:ring-0[aria-invalid=true]{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:aria-invalid\\:ring-3[aria-invalid=true]{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:aria-invalid\\:ring-destructive\\/20[aria-invalid=true]{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:aria-invalid\\:ring-destructive\\/20[aria-invalid=true]{--tw-ring-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:aria-invalid\\:aria-checked\\:border-primary[aria-invalid=true][aria-checked=true]{border-color:var(--primary)}.tw\\:aria-pressed\\:bg-muted[aria-pressed=true]{background-color:var(--muted)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:h-px[aria-orientation=horizontal]{height:1px}.tw\\:aria-\\[orientation\\=horizontal\\]\\:w-full[aria-orientation=horizontal]{width:100%}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:start-0[aria-orientation=horizontal]:after{content:var(--tw-content);inset-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:h-1[aria-orientation=horizontal]:after{content:var(--tw-content);height:calc(calc(var(--spacing)) * 1)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:w-full[aria-orientation=horizontal]:after{content:var(--tw-content);width:100%}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:translate-x-0[aria-orientation=horizontal]:after{content:var(--tw-content);--tw-translate-x:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:-translate-y-1\\/2[aria-orientation=horizontal]:after{content:var(--tw-content);--tw-translate-y:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:aria-\\[orientation\\=vertical\\]\\:flex-col[aria-orientation=vertical]{flex-direction:column}.tw\\:data-inset\\:ps-7[data-inset]{padding-inline-start:calc(calc(var(--spacing)) * 7)}.tw\\:data-placeholder\\:text-muted-foreground[data-placeholder]{color:var(--muted-foreground)}.tw\\:data-\\[align-trigger\\=false\\]\\:min-w-36[data-align-trigger=false]{min-width:calc(calc(var(--spacing)) * 36)}.tw\\:data-\\[align-trigger\\=true\\]\\:min-w-\\(--radix-select-trigger-width\\)[data-align-trigger=true]{min-width:var(--radix-select-trigger-width)}.tw\\:data-\\[align-trigger\\=true\\]\\:animate-none[data-align-trigger=true]{animation:none}.tw\\:data-\\[disabled\\=true\\]\\:pointer-events-none[data-disabled=true]{pointer-events:none}.tw\\:data-\\[disabled\\=true\\]\\:opacity-50[data-disabled=true]{opacity:.5}.tw\\:data-\\[position\\=popper\\]\\:h-\\(--radix-select-trigger-height\\)[data-position=popper]{height:var(--radix-select-trigger-height)}.tw\\:data-\\[position\\=popper\\]\\:w-full[data-position=popper]{width:100%}.tw\\:data-\\[position\\=popper\\]\\:min-w-\\(--radix-select-trigger-width\\)[data-position=popper]{min-width:var(--radix-select-trigger-width)}.tw\\:data-\\[side\\=bottom\\]\\:translate-y-1[data-side=bottom]{--tw-translate-y:calc(calc(var(--spacing)) * 1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=bottom\\]\\:slide-in-from-top-2[data-side=bottom]{--tw-enter-translate-y:calc(2*var(--spacing)*-1)}.tw\\:data-\\[side\\=left\\]\\:-translate-x-1[data-side=left]{--tw-translate-x:calc(calc(var(--spacing)) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=left\\]\\:slide-in-from-right-2[data-side=left]{--tw-enter-translate-x:calc(2*var(--spacing))}.tw\\:data-\\[side\\=right\\]\\:translate-x-1[data-side=right]{--tw-translate-x:calc(calc(var(--spacing)) * 1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=right\\]\\:slide-in-from-left-2[data-side=right]{--tw-enter-translate-x:calc(2*var(--spacing)*-1)}.tw\\:data-\\[side\\=top\\]\\:-translate-y-1[data-side=top]{--tw-translate-y:calc(calc(var(--spacing)) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=top\\]\\:slide-in-from-bottom-2[data-side=top]{--tw-enter-translate-y:calc(2*var(--spacing))}.tw\\:data-\\[size\\=default\\]\\:h-8[data-size=default]{height:calc(calc(var(--spacing)) * 8)}.tw\\:data-\\[size\\=default\\]\\:h-\\[18\\.4px\\][data-size=default]{height:18.4px}.tw\\:data-\\[size\\=default\\]\\:w-\\[32px\\][data-size=default]{width:32px}.tw\\:data-\\[size\\=lg\\]\\:size-10[data-size=lg]{width:calc(calc(var(--spacing)) * 10);height:calc(calc(var(--spacing)) * 10)}.tw\\:data-\\[size\\=md\\]\\:text-sm[data-size=md]{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:data-\\[size\\=sm\\]\\:size-6[data-size=sm]{width:calc(calc(var(--spacing)) * 6);height:calc(calc(var(--spacing)) * 6)}.tw\\:data-\\[size\\=sm\\]\\:h-7[data-size=sm]{height:calc(calc(var(--spacing)) * 7)}.tw\\:data-\\[size\\=sm\\]\\:h-\\[14px\\][data-size=sm]{height:14px}.tw\\:data-\\[size\\=sm\\]\\:w-\\[24px\\][data-size=sm]{width:24px}.tw\\:data-\\[size\\=sm\\]\\:gap-3[data-size=sm]{gap:calc(calc(var(--spacing)) * 3)}.tw\\:data-\\[size\\=sm\\]\\:rounded-\\[min\\(var\\(--tw-radius-md\\)\\,10px\\)\\][data-size=sm]{border-radius:min(var(--tw-radius-md), 10px)}.tw\\:data-\\[size\\=sm\\]\\:py-3[data-size=sm]{padding-block:calc(calc(var(--spacing)) * 3)}.tw\\:data-\\[size\\=sm\\]\\:text-xs[data-size=sm]{font-size:var(--tw-text-xs);line-height:var(--tw-leading,var(--tw-text-xs--line-height))}.tw\\:data-\\[size\\=sm\\]\\:has-data-\\[slot\\=card-footer\\]\\:pb-0[data-size=sm]:has([data-slot=card-footer]){padding-bottom:calc(calc(var(--spacing)) * 0)}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-item\\]\\:focus\\:bg-foreground\\/10 *)[data-slot$=-item]:focus{background-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-item\\]\\:focus\\:bg-foreground\\/10 *)[data-slot$=-item]:focus{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)}}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-item\\]\\:data-highlighted\\:bg-foreground\\/10 *)[data-slot$=-item][data-highlighted]{background-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-item\\]\\:data-highlighted\\:bg-foreground\\/10 *)[data-slot$=-item][data-highlighted]{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)}}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-separator\\]\\:bg-foreground\\/5 *)[data-slot$=-separator]{background-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-separator\\]\\:bg-foreground\\/5 *)[data-slot$=-separator]{background-color:color-mix(in oklab, var(--foreground) 5%, transparent)}}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-trigger\\]\\:focus\\:bg-foreground\\/10 *)[data-slot$=-trigger]:focus{background-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-trigger\\]\\:focus\\:bg-foreground\\/10 *)[data-slot$=-trigger]:focus{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)}}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-trigger\\]\\:aria-expanded\\:bg-foreground\\/10\\! *)[data-slot$=-trigger][aria-expanded=true]{background-color:var(--foreground)!important}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-trigger\\]\\:aria-expanded\\:bg-foreground\\/10\\! *)[data-slot$=-trigger][aria-expanded=true]{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)!important}}:is(.tw\\:\\*\\:data-\\[slot\\=alert-description\\]\\:text-destructive\\/90>*)[data-slot=alert-description]{color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\:data-\\[slot\\=alert-description\\]\\:text-destructive\\/90>*)[data-slot=alert-description]{color:color-mix(in oklab, var(--destructive) 90%, transparent)}}:is(.tw\\:\\*\\:data-\\[slot\\=avatar\\]\\:ring-2>*)[data-slot=avatar]{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}:is(.tw\\:\\*\\:data-\\[slot\\=avatar\\]\\:ring-background>*)[data-slot=avatar]{--tw-ring-color:var(--background)}:is(.tw\\:\\*\\:data-\\[slot\\=input-group-addon\\]\\:ps-2\\!>*)[data-slot=input-group-addon]{padding-inline-start:calc(calc(var(--spacing)) * 2)!important}:is(.tw\\:\\*\\*\\:data-\\[slot\\=kbd\\]\\:relative *)[data-slot=kbd]{position:relative}:is(.tw\\:\\*\\*\\:data-\\[slot\\=kbd\\]\\:isolate *)[data-slot=kbd]{isolation:isolate}:is(.tw\\:\\*\\*\\:data-\\[slot\\=kbd\\]\\:z-50 *)[data-slot=kbd]{z-index:50}:is(.tw\\:\\*\\*\\:data-\\[slot\\=kbd\\]\\:rounded-sm *)[data-slot=kbd]{border-radius:calc(var(--radius) * .6)}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:line-clamp-1>*)[data-slot=select-value]{-webkit-line-clamp:1;-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:flex>*)[data-slot=select-value]{display:flex}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:flex-1>*)[data-slot=select-value]{flex:1}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:items-center>*)[data-slot=select-value]{align-items:center}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:gap-1\\.5>*)[data-slot=select-value]{gap:calc(calc(var(--spacing)) * 1.5)}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:text-start>*)[data-slot=select-value]{text-align:start}.tw\\:group-data-horizontal\\/toggle-group\\:data-\\[spacing\\=0\\]\\:first\\:rounded-s-lg:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=horizontal]) *)[data-spacing="0"]:first-child{border-start-start-radius:var(--radius);border-end-start-radius:var(--radius)}.tw\\:group-data-vertical\\/toggle-group\\:data-\\[spacing\\=0\\]\\:first\\:rounded-t-lg:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=vertical]) *)[data-spacing="0"]:first-child{border-top-left-radius:var(--radius);border-top-right-radius:var(--radius)}.tw\\:group-data-horizontal\\/toggle-group\\:data-\\[spacing\\=0\\]\\:last\\:rounded-e-lg:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=horizontal]) *)[data-spacing="0"]:last-child{border-start-end-radius:var(--radius);border-end-end-radius:var(--radius)}.tw\\:group-data-vertical\\/toggle-group\\:data-\\[spacing\\=0\\]\\:last\\:rounded-b-lg:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=vertical]) *)[data-spacing="0"]:last-child{border-bottom-right-radius:var(--radius);border-bottom-left-radius:var(--radius)}.tw\\:data-\\[state\\=active\\]\\:bg-background[data-state=active]{background-color:var(--background)}.tw\\:data-\\[state\\=active\\]\\:text-foreground[data-state=active]{color:var(--foreground)}.tw\\:data-\\[state\\=active\\]\\:shadow-sm[data-state=active]{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:data-\\[state\\=closed\\]\\:overflow-hidden[data-state=closed]{overflow:hidden}.tw\\:data-\\[state\\=delayed-open\\]\\:animate-in[data-state=delayed-open]{animation:enter var(--tw-animation-duration,var(--tw-duration,.15s))var(--tw-ease,ease)var(--tw-animation-delay,0s)var(--tw-animation-iteration-count,1)var(--tw-animation-direction,normal)var(--tw-animation-fill-mode,none)}.tw\\:data-\\[state\\=delayed-open\\]\\:fade-in-0[data-state=delayed-open]{--tw-enter-opacity:0}.tw\\:data-\\[state\\=delayed-open\\]\\:zoom-in-95[data-state=delayed-open]{--tw-enter-scale:.95}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-soft-approved\\)\\][data-state=on]{background-color:var(--inv-soft-approved)}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-soft-unapproved\\)\\][data-state=on]{background-color:var(--inv-soft-unapproved)}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-soft-unknown\\)\\][data-state=on]{background-color:var(--inv-soft-unknown)}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-vivid-approved\\)\\][data-state=on]{background-color:var(--inv-vivid-approved)}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-vivid-unapproved\\)\\][data-state=on]{background-color:var(--inv-vivid-unapproved)}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-vivid-unknown\\)\\][data-state=on]{background-color:var(--inv-vivid-unknown)}.tw\\:data-\\[state\\=on\\]\\:bg-muted[data-state=on]{background-color:var(--muted)}.tw\\:data-\\[state\\=on\\]\\:text-\\[var\\(--inv-icon-approved\\)\\][data-state=on]{color:var(--inv-icon-approved)}.tw\\:data-\\[state\\=on\\]\\:text-\\[var\\(--inv-icon-unapproved\\)\\][data-state=on]{color:var(--inv-icon-unapproved)}.tw\\:data-\\[state\\=on\\]\\:text-\\[var\\(--inv-icon-unknown\\)\\][data-state=on]{color:var(--inv-icon-unknown)}.tw\\:data-\\[state\\=on\\]\\:text-\\[var\\(--inv-on\\)\\][data-state=on]{color:var(--inv-on)}.tw\\:data-\\[state\\=on\\]\\:text-foreground[data-state=on]{color:var(--foreground)}.tw\\:data-\\[state\\=open\\]\\:bg-accent[data-state=open]{background-color:var(--accent)}.tw\\:data-\\[state\\=open\\]\\:bg-muted[data-state=open]{background-color:var(--muted)}.tw\\:data-\\[state\\=open\\]\\:text-foreground[data-state=open]{color:var(--foreground)}.tw\\:data-\\[state\\=selected\\]\\:bg-muted[data-state=selected]{background-color:var(--muted)}.tw\\:data-\\[variant\\=destructive\\]\\:text-destructive[data-variant=destructive]{color:var(--destructive)}:is(:is(.tw\\:\\*\\*\\:data-\\[variant\\=destructive\\]\\:\\*\\*\\:text-accent-foreground\\! *)[data-variant=destructive] *),:is(.tw\\:\\*\\*\\:data-\\[variant\\=destructive\\]\\:text-accent-foreground\\! *)[data-variant=destructive]{color:var(--accent-foreground)!important}.tw\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-destructive\\/10[data-variant=destructive]:focus{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-destructive\\/10[data-variant=destructive]:focus{background-color:color-mix(in oklab, var(--destructive) 10%, transparent)}}.tw\\:data-\\[variant\\=destructive\\]\\:focus\\:text-destructive[data-variant=destructive]:focus{color:var(--destructive)}:is(.tw\\:\\*\\*\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-foreground\\/10\\! *)[data-variant=destructive]:focus{background-color:var(--foreground)!important}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-foreground\\/10\\! *)[data-variant=destructive]:focus{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)!important}}.tw\\:data-\\[variant\\=line\\]\\:rounded-none[data-variant=line]{border-radius:0}.tw\\:group-data-horizontal\\/toggle-group\\:data-\\[spacing\\=0\\]\\:data-\\[variant\\=outline\\]\\:border-s-0:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=horizontal]) *)[data-spacing="0"][data-variant=outline]{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:group-data-vertical\\/toggle-group\\:data-\\[spacing\\=0\\]\\:data-\\[variant\\=outline\\]\\:border-t-0:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=vertical]) *)[data-spacing="0"][data-variant=outline]{border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:group-data-horizontal\\/toggle-group\\:data-\\[spacing\\=0\\]\\:data-\\[variant\\=outline\\]\\:first\\:border-s:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=horizontal]) *)[data-spacing="0"][data-variant=outline]:first-child{border-inline-start-style:var(--tw-border-style);border-inline-start-width:1px}.tw\\:group-data-vertical\\/toggle-group\\:data-\\[spacing\\=0\\]\\:data-\\[variant\\=outline\\]\\:first\\:border-t:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=vertical]) *)[data-spacing="0"][data-variant=outline]:first-child{border-top-style:var(--tw-border-style);border-top-width:1px}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:inset-x-0[data-vaul-drawer-direction=bottom]{inset-inline:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:bottom-0[data-vaul-drawer-direction=bottom]{bottom:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:mt-24[data-vaul-drawer-direction=bottom]{margin-top:calc(calc(var(--spacing)) * 24)}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:max-h-\\[80vh\\][data-vaul-drawer-direction=bottom]{max-height:80vh}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:rounded-t-xl[data-vaul-drawer-direction=bottom]{border-top-left-radius:calc(var(--radius) * 1.4);border-top-right-radius:calc(var(--radius) * 1.4)}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:border-t[data-vaul-drawer-direction=bottom]{border-top-style:var(--tw-border-style);border-top-width:1px}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:inset-y-0[data-vaul-drawer-direction=left]{inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:left-0[data-vaul-drawer-direction=left]{left:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:w-3\\/4[data-vaul-drawer-direction=left]{width:75%}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:flex-row[data-vaul-drawer-direction=left]{flex-direction:row}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:rounded-r-xl[data-vaul-drawer-direction=left]{border-top-right-radius:calc(var(--radius) * 1.4);border-bottom-right-radius:calc(var(--radius) * 1.4)}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:border-r[data-vaul-drawer-direction=left]{border-right-style:var(--tw-border-style);border-right-width:1px}.tw\\:data-\\[vaul-drawer-direction\\=left\\/right\\]\\:flex-row[data-vaul-drawer-direction=left\\/right]{flex-direction:row}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:inset-y-0[data-vaul-drawer-direction=right]{inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:right-0[data-vaul-drawer-direction=right]{right:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:w-3\\/4[data-vaul-drawer-direction=right]{width:75%}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:flex-row[data-vaul-drawer-direction=right]{flex-direction:row}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:rounded-l-xl[data-vaul-drawer-direction=right]{border-top-left-radius:calc(var(--radius) * 1.4);border-bottom-left-radius:calc(var(--radius) * 1.4)}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:border-l[data-vaul-drawer-direction=right]{border-left-style:var(--tw-border-style);border-left-width:1px}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:inset-x-0[data-vaul-drawer-direction=top]{inset-inline:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:top-0[data-vaul-drawer-direction=top]{top:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:mb-24[data-vaul-drawer-direction=top]{margin-bottom:calc(calc(var(--spacing)) * 24)}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:max-h-\\[80vh\\][data-vaul-drawer-direction=top]{max-height:80vh}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:rounded-b-xl[data-vaul-drawer-direction=top]{border-bottom-right-radius:calc(var(--radius) * 1.4);border-bottom-left-radius:calc(var(--radius) * 1.4)}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:border-b[data-vaul-drawer-direction=top]{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}@supports ((-webkit-backdrop-filter:var(--tw)) or (backdrop-filter:var(--tw))){.tw\\:supports-backdrop-filter\\:backdrop-blur-xs{--tw-backdrop-blur:blur(var(--tw-blur-xs));-webkit-backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)}}@media (min-width:40rem){.tw\\:sm\\:flex{display:flex}.tw\\:sm\\:max-w-sm{max-width:var(--tw-container-sm)}.tw\\:sm\\:flex-row{flex-direction:row}.tw\\:sm\\:justify-end{justify-content:flex-end}.tw\\:sm\\:p-8{padding:calc(calc(var(--spacing)) * 8)}.tw\\:sm\\:text-start{text-align:start}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:sm\\:max-w-sm[data-vaul-drawer-direction=left],.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:sm\\:max-w-sm[data-vaul-drawer-direction=right]{max-width:var(--tw-container-sm)}}@media (min-width:48rem){.tw\\:md\\:block{display:block}.tw\\:md\\:flex{display:flex}.tw\\:md\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.tw\\:md\\:gap-0\\.5{gap:calc(calc(var(--spacing)) * .5)}.tw\\:md\\:text-start{text-align:start}.tw\\:md\\:text-sm{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:md\\:text-pretty{text-wrap:pretty}.tw\\:md\\:opacity-0{opacity:0}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:m-2:is(:where(.tw\\:peer)[data-variant=inset]~*){margin:calc(calc(var(--spacing)) * 2)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:ms-0:is(:where(.tw\\:peer)[data-variant=inset]~*){margin-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:rounded-xl:is(:where(.tw\\:peer)[data-variant=inset]~*){border-radius:calc(var(--radius) * 1.4)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:shadow-sm:is(:where(.tw\\:peer)[data-variant=inset]~*){--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:peer-data-\\[state\\=collapsed\\]\\:ms-2:is(:where(.tw\\:peer)[data-variant=inset]~*):is(:where(.tw\\:peer)[data-state=collapsed]~*){margin-inline-start:calc(calc(var(--spacing)) * 2)}.tw\\:md\\:after\\:hidden:after{content:var(--tw-content);display:none}}@media (min-width:64rem){.tw\\:lg\\:flex{display:flex}.tw\\:lg\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}:where(.tw\\:lg\\:space-x-8>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 8) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 8) * calc(1 - var(--tw-space-x-reverse)))}.tw\\:lg\\:text-5xl{font-size:var(--tw-text-5xl);line-height:var(--tw-leading,var(--tw-text-5xl--line-height))}}@media (min-width:48rem){@media (min-width:64rem){.tw\\:md\\:lg\\:hidden{display:none}}}@media (min-width:80rem){.tw\\:xl\\:auto-cols-fr{grid-auto-columns:minmax(0,1fr)}.tw\\:xl\\:grid-flow-col{grid-auto-flow:column}.tw\\:xl\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.tw\\:xl\\:grid-cols-none{grid-template-columns:none}.tw\\:xl\\:grid-rows-2{grid-template-rows:repeat(2,minmax(0,1fr))}}@container search not (min-width:7rem){.tw\\:\\@max-\\[7rem\\]\\/search\\:hidden{display:none}.tw\\:\\@max-\\[7rem\\]\\/search\\:ps-3{padding-inline-start:calc(calc(var(--spacing)) * 3)}}@container search not (min-width:4rem){.tw\\:\\@max-\\[4rem\\]\\/search\\:hidden{display:none}.tw\\:\\@max-\\[4rem\\]\\/search\\:pe-3{padding-inline-end:calc(calc(var(--spacing)) * 3)}}@container search not (min-width:3rem){.tw\\:\\@max-\\[3rem\\]\\/search\\:ps-0{padding-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:\\@max-\\[3rem\\]\\/search\\:pe-0{padding-inline-end:calc(calc(var(--spacing)) * 0)}}@container (min-width:24rem){.tw\\:\\@sm\\:basis-auto{flex-basis:auto}}.tw\\:ltr\\:left-2:where(:dir(ltr),[dir=ltr],[dir=ltr] *){left:calc(calc(var(--spacing)) * 2)}.tw\\:ltr\\:-translate-x-1\\/2:where(:dir(ltr),[dir=ltr],[dir=ltr] *){--tw-translate-x:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:right-2:where(:dir(rtl),[dir=rtl],[dir=rtl] *){right:calc(calc(var(--spacing)) * 2)}.tw\\:rtl\\:flex:where(:dir(rtl),[dir=rtl],[dir=rtl] *){display:flex}.tw\\:rtl\\:-translate-x-px:where(:dir(rtl),[dir=rtl],[dir=rtl] *){--tw-translate-x:-1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:translate-x-1\\/2:where(:dir(rtl),[dir=rtl],[dir=rtl] *){--tw-translate-x:calc(1 / 2 * 100%);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:translate-x-px:where(:dir(rtl),[dir=rtl],[dir=rtl] *){--tw-translate-x:1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:after\\:translate-x-1\\/2:where(:dir(rtl),[dir=rtl],[dir=rtl] *):after{content:var(--tw-content);--tw-translate-x:calc(1 / 2 * 100%);translate:var(--tw-translate-x) var(--tw-translate-y)}:where([data-side=primary]) .tw\\:rtl\\:in-data-\\[side\\=primary\\]\\:cursor-e-resize:where(:dir(rtl),[dir=rtl],[dir=rtl] *){cursor:e-resize}:where([data-side=secondary]) .tw\\:rtl\\:in-data-\\[side\\=secondary\\]\\:cursor-w-resize:where(:dir(rtl),[dir=rtl],[dir=rtl] *){cursor:w-resize}.tw\\:rtl\\:aria-\\[orientation\\=horizontal\\]\\:after\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *)[aria-orientation=horizontal]:after{content:var(--tw-content);--tw-translate-x:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:data-\\[side\\=left\\]\\:translate-x-1:where(:dir(rtl),[dir=rtl],[dir=rtl] *)[data-side=left]{--tw-translate-x:calc(calc(var(--spacing)) * 1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:data-\\[side\\=right\\]\\:-translate-x-1:where(:dir(rtl),[dir=rtl],[dir=rtl] *)[data-side=right]{--tw-translate-x:calc(calc(var(--spacing)) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:dark\\:border-input:is(.dark *){border-color:var(--input)}.tw\\:dark\\:bg-destructive\\/20:is(.dark *){background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:bg-destructive\\/20:is(.dark *){background-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:dark\\:bg-input\\/30:is(.dark *){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:bg-input\\/30:is(.dark *){background-color:color-mix(in oklab, var(--input) 30%, transparent)}}.tw\\:dark\\:bg-transparent:is(.dark *){background-color:#0000}.tw\\:dark\\:text-amber-400:is(.dark *){color:var(--tw-color-amber-400)}.tw\\:dark\\:text-muted-foreground:is(.dark *){color:var(--muted-foreground)}.tw\\:dark\\:text-rose-400:is(.dark *){color:var(--tw-color-rose-400)}.tw\\:dark\\:text-sky-400:is(.dark *){color:var(--tw-color-sky-400)}.tw\\:dark\\:text-teal-400:is(.dark *){color:var(--tw-color-teal-400)}.tw\\:dark\\:after\\:mix-blend-lighten:is(.dark *):after{content:var(--tw-content);mix-blend-mode:lighten}@media (hover:hover){.tw\\:dark\\:hover\\:bg-blue-500:is(.dark *):hover{background-color:var(--tw-color-blue-500)}.tw\\:dark\\:hover\\:bg-destructive\\/30:is(.dark *):hover{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:hover\\:bg-destructive\\/30:is(.dark *):hover{background-color:color-mix(in oklab, var(--destructive) 30%, transparent)}}.tw\\:dark\\:hover\\:bg-input\\/50:is(.dark *):hover{background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:hover\\:bg-input\\/50:is(.dark *):hover{background-color:color-mix(in oklab, var(--input) 50%, transparent)}}.tw\\:dark\\:hover\\:bg-muted\\/50:is(.dark *):hover{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:hover\\:bg-muted\\/50:is(.dark *):hover{background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:dark\\:hover\\:text-foreground:is(.dark *):hover{color:var(--foreground)}}.tw\\:dark\\:focus-visible\\:ring-destructive\\/40:is(.dark *):focus-visible{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:focus-visible\\:ring-destructive\\/40:is(.dark *):focus-visible{--tw-ring-color:color-mix(in oklab, var(--destructive) 40%, transparent)}}.tw\\:dark\\:disabled\\:bg-input\\/80:is(.dark *):disabled{background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:disabled\\:bg-input\\/80:is(.dark *):disabled{background-color:color-mix(in oklab, var(--input) 80%, transparent)}}.tw\\:dark\\:disabled\\:bg-transparent:is(.dark *):disabled{background-color:#0000}:where([data-slot=tooltip-content]) .tw\\:dark\\:in-data-\\[slot\\=tooltip-content\\]\\:bg-background\\/10:is(.dark *){background-color:var(--background)}@supports (color:color-mix(in lab, red, red)){:where([data-slot=tooltip-content]) .tw\\:dark\\:in-data-\\[slot\\=tooltip-content\\]\\:bg-background\\/10:is(.dark *){background-color:color-mix(in oklab, var(--background) 10%, transparent)}}.tw\\:dark\\:has-disabled\\:bg-input\\/80:is(.dark *):has(:disabled){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:has-disabled\\:bg-input\\/80:is(.dark *):has(:disabled){background-color:color-mix(in oklab, var(--input) 80%, transparent)}}.tw\\:dark\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-destructive\\/40:is(.dark *):has([data-slot][aria-invalid=true]){--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-destructive\\/40:is(.dark *):has([data-slot][aria-invalid=true]){--tw-ring-color:color-mix(in oklab, var(--destructive) 40%, transparent)}}.tw\\:dark\\:aria-invalid\\:border-destructive\\/50:is(.dark *)[aria-invalid=true]{border-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:aria-invalid\\:border-destructive\\/50:is(.dark *)[aria-invalid=true]{border-color:color-mix(in oklab, var(--destructive) 50%, transparent)}}.tw\\:dark\\:aria-invalid\\:ring-destructive\\/40:is(.dark *)[aria-invalid=true]{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:aria-invalid\\:ring-destructive\\/40:is(.dark *)[aria-invalid=true]{--tw-ring-color:color-mix(in oklab, var(--destructive) 40%, transparent)}}.tw\\:dark\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-destructive\\/20:is(.dark *)[data-variant=destructive]:focus{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-destructive\\/20:is(.dark *)[data-variant=destructive]:focus{background-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:data-open\\:animate-in:where([data-state=open]),.tw\\:data-open\\:animate-in:where([data-open]:not([data-open=false])){animation:enter var(--tw-animation-duration,var(--tw-duration,.15s))var(--tw-ease,ease)var(--tw-animation-delay,0s)var(--tw-animation-iteration-count,1)var(--tw-animation-direction,normal)var(--tw-animation-fill-mode,none)}.tw\\:data-open\\:bg-accent:where([data-state=open]),.tw\\:data-open\\:bg-accent:where([data-open]:not([data-open=false])){background-color:var(--accent)}.tw\\:data-open\\:text-accent-foreground:where([data-state=open]),.tw\\:data-open\\:text-accent-foreground:where([data-open]:not([data-open=false])){color:var(--accent-foreground)}.tw\\:data-open\\:fade-in-0:where([data-state=open]),.tw\\:data-open\\:fade-in-0:where([data-open]:not([data-open=false])){--tw-enter-opacity:0}.tw\\:data-open\\:zoom-in-95:where([data-state=open]),.tw\\:data-open\\:zoom-in-95:where([data-open]:not([data-open=false])){--tw-enter-scale:.95}@media (hover:hover){:is(.tw\\:data-open\\:hover\\:bg-sidebar-accent:where([data-state=open]),.tw\\:data-open\\:hover\\:bg-sidebar-accent:where([data-open]:not([data-open=false]))):hover{background-color:var(--sidebar-accent)}:is(.tw\\:data-open\\:hover\\:text-sidebar-accent-foreground:where([data-state=open]),.tw\\:data-open\\:hover\\:text-sidebar-accent-foreground:where([data-open]:not([data-open=false]))):hover{color:var(--sidebar-accent-foreground)}}.tw\\:data-closed\\:animate-out:where([data-state=closed]),.tw\\:data-closed\\:animate-out:where([data-closed]:not([data-closed=false])){animation:exit var(--tw-animation-duration,var(--tw-duration,.15s))var(--tw-ease,ease)var(--tw-animation-delay,0s)var(--tw-animation-iteration-count,1)var(--tw-animation-direction,normal)var(--tw-animation-fill-mode,none)}.tw\\:data-closed\\:fade-out-0:where([data-state=closed]),.tw\\:data-closed\\:fade-out-0:where([data-closed]:not([data-closed=false])){--tw-exit-opacity:0}.tw\\:data-closed\\:zoom-out-95:where([data-state=closed]),.tw\\:data-closed\\:zoom-out-95:where([data-closed]:not([data-closed=false])){--tw-exit-scale:.95}.tw\\:data-checked\\:border-primary:where([data-state=checked]),.tw\\:data-checked\\:border-primary:where([data-checked]:not([data-checked=false])){border-color:var(--primary)}.tw\\:data-checked\\:bg-primary:where([data-state=checked]),.tw\\:data-checked\\:bg-primary:where([data-checked]:not([data-checked=false])){background-color:var(--primary)}.tw\\:data-checked\\:text-primary-foreground:where([data-state=checked]),.tw\\:data-checked\\:text-primary-foreground:where([data-checked]:not([data-checked=false])){color:var(--primary-foreground)}.tw\\:group-data-\\[size\\=default\\]\\/switch\\:data-checked\\:translate-x-\\[calc\\(100\\%-2px\\)\\]:is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-state=checked]),.tw\\:group-data-\\[size\\=default\\]\\/switch\\:data-checked\\:translate-x-\\[calc\\(100\\%-2px\\)\\]:is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-checked]:not([data-checked=false])),.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:data-checked\\:translate-x-\\[calc\\(100\\%-2px\\)\\]:is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-state=checked]),.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:data-checked\\:translate-x-\\[calc\\(100\\%-2px\\)\\]:is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-checked]:not([data-checked=false])){--tw-translate-x:calc(100% - 2px);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:group-data-\\[size\\=default\\]\\/switch\\:data-checked\\:-translate-x-\\[calc\\(100\\%-2px\\)\\]:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-state=checked]),.tw\\:rtl\\:group-data-\\[size\\=default\\]\\/switch\\:data-checked\\:-translate-x-\\[calc\\(100\\%-2px\\)\\]:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-checked]:not([data-checked=false])),.tw\\:rtl\\:group-data-\\[size\\=sm\\]\\/switch\\:data-checked\\:-translate-x-\\[calc\\(100\\%-2px\\)\\]:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-state=checked]),.tw\\:rtl\\:group-data-\\[size\\=sm\\]\\/switch\\:data-checked\\:-translate-x-\\[calc\\(100\\%-2px\\)\\]:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-checked]:not([data-checked=false])){--tw-translate-x:calc(calc(100% - 2px) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:dark\\:data-checked\\:bg-primary:is(.dark *):where([data-state=checked]),.tw\\:dark\\:data-checked\\:bg-primary:is(.dark *):where([data-checked]:not([data-checked=false])){background-color:var(--primary)}.tw\\:dark\\:data-checked\\:bg-primary-foreground:is(.dark *):where([data-state=checked]),.tw\\:dark\\:data-checked\\:bg-primary-foreground:is(.dark *):where([data-checked]:not([data-checked=false])){background-color:var(--primary-foreground)}.tw\\:data-unchecked\\:bg-input:where([data-state=unchecked]),.tw\\:data-unchecked\\:bg-input:where([data-unchecked]:not([data-unchecked=false])){background-color:var(--input)}.tw\\:group-data-\\[size\\=default\\]\\/switch\\:data-unchecked\\:translate-x-0:is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-state=unchecked]),.tw\\:group-data-\\[size\\=default\\]\\/switch\\:data-unchecked\\:translate-x-0:is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-unchecked]:not([data-unchecked=false])),.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:data-unchecked\\:translate-x-0:is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-state=unchecked]),.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:data-unchecked\\:translate-x-0:is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-unchecked]:not([data-unchecked=false])),.tw\\:rtl\\:group-data-\\[size\\=default\\]\\/switch\\:data-unchecked\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-state=unchecked]),.tw\\:rtl\\:group-data-\\[size\\=default\\]\\/switch\\:data-unchecked\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-unchecked]:not([data-unchecked=false])),.tw\\:rtl\\:group-data-\\[size\\=sm\\]\\/switch\\:data-unchecked\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-state=unchecked]),.tw\\:rtl\\:group-data-\\[size\\=sm\\]\\/switch\\:data-unchecked\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-unchecked]:not([data-unchecked=false])){--tw-translate-x:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:dark\\:data-unchecked\\:bg-foreground:is(.dark *):where([data-state=unchecked]),.tw\\:dark\\:data-unchecked\\:bg-foreground:is(.dark *):where([data-unchecked]:not([data-unchecked=false])){background-color:var(--foreground)}.tw\\:dark\\:data-unchecked\\:bg-input\\/80:is(.dark *):where([data-state=unchecked]),.tw\\:dark\\:data-unchecked\\:bg-input\\/80:is(.dark *):where([data-unchecked]:not([data-unchecked=false])){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:data-unchecked\\:bg-input\\/80:is(.dark *):where([data-state=unchecked]),.tw\\:dark\\:data-unchecked\\:bg-input\\/80:is(.dark *):where([data-unchecked]:not([data-unchecked=false])){background-color:color-mix(in oklab, var(--input) 80%, transparent)}}.tw\\:data-selected\\:bg-muted:where([data-selected=true]),.tw\\:data-selected\\:bg-muted\\/50:where([data-selected=true]){background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:data-selected\\:bg-muted\\/50:where([data-selected=true]){background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:data-selected\\:bg-primary:where([data-selected=true]){background-color:var(--primary)}.tw\\:data-selected\\:bg-transparent:where([data-selected=true]){background-color:#0000}.tw\\:data-selected\\:text-foreground:where([data-selected=true]){color:var(--foreground)}.tw\\:data-selected\\:text-inherit:where([data-selected=true]){color:inherit}.tw\\:data-selected\\:text-muted-foreground\\/50:where([data-selected=true]){color:var(--muted-foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:data-selected\\:text-muted-foreground\\/50:where([data-selected=true]){color:color-mix(in oklab, var(--muted-foreground) 50%, transparent)}}.tw\\:data-selected\\:text-primary-foreground:where([data-selected=true]){color:var(--primary-foreground)}.tw\\:data-selected\\:ring-2:where([data-selected=true]){--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:data-selected\\:ring-primary-foreground\\/70:where([data-selected=true]){--tw-ring-color:var(--primary-foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:data-selected\\:ring-primary-foreground\\/70:where([data-selected=true]){--tw-ring-color:color-mix(in oklab, var(--primary-foreground) 70%, transparent)}}.tw\\:data-selected\\:ring-ring\\/50:where([data-selected=true]){--tw-ring-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.tw\\:data-selected\\:ring-ring\\/50:where([data-selected=true]){--tw-ring-color:color-mix(in oklab, var(--ring) 50%, transparent)}}.tw\\:data-selected\\:ring-inset:where([data-selected=true]){--tw-ring-inset:inset}@media (forced-colors:active){.tw\\:forced-colors\\:data-selected\\:outline-2:where([data-selected=true]){outline-style:var(--tw-outline-style);outline-width:2px}.tw\\:forced-colors\\:data-selected\\:-outline-offset-2:where([data-selected=true]){outline-offset:calc(2px * -1)}.tw\\:forced-colors\\:data-selected\\:outline-\\[color\\:Highlight\\]:where([data-selected=true]){outline-color:highlight}}.tw\\:data-disabled\\:pointer-events-none:where([data-disabled=true]),.tw\\:data-disabled\\:pointer-events-none:where([data-disabled]:not([data-disabled=false])){pointer-events:none}.tw\\:data-disabled\\:cursor-not-allowed:where([data-disabled=true]),.tw\\:data-disabled\\:cursor-not-allowed:where([data-disabled]:not([data-disabled=false])){cursor:not-allowed}.tw\\:data-disabled\\:opacity-50:where([data-disabled=true]),.tw\\:data-disabled\\:opacity-50:where([data-disabled]:not([data-disabled=false])){opacity:.5}.tw\\:data-active\\:bg-background:where([data-state=active]),.tw\\:data-active\\:bg-background:where([data-active]:not([data-active=false])){background-color:var(--background)}.tw\\:data-active\\:bg-sidebar-accent:where([data-state=active]),.tw\\:data-active\\:bg-sidebar-accent:where([data-active]:not([data-active=false])){background-color:var(--sidebar-accent)}.tw\\:data-active\\:font-medium:where([data-state=active]),.tw\\:data-active\\:font-medium:where([data-active]:not([data-active=false])){--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}.tw\\:data-active\\:text-foreground:where([data-state=active]),.tw\\:data-active\\:text-foreground:where([data-active]:not([data-active=false])){color:var(--foreground)}.tw\\:data-active\\:text-sidebar-accent-foreground:where([data-state=active]),.tw\\:data-active\\:text-sidebar-accent-foreground:where([data-active]:not([data-active=false])){color:var(--sidebar-accent-foreground)}.tw\\:group-data-\\[variant\\=default\\]\\/tabs-list\\:data-active\\:shadow-sm:is(:where(.tw\\:group\\/tabs-list)[data-variant=default] *):where([data-state=active]),.tw\\:group-data-\\[variant\\=default\\]\\/tabs-list\\:data-active\\:shadow-sm:is(:where(.tw\\:group\\/tabs-list)[data-variant=default] *):where([data-active]:not([data-active=false])){--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:bg-transparent:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:bg-transparent:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false])){background-color:#0000}.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:shadow-none:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:shadow-none:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false])){--tw-shadow:0 0 #0000;box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}:is(.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:after\\:opacity-100:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:after\\:opacity-100:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false]))):after{content:var(--tw-content);opacity:1}.tw\\:dark\\:data-active\\:border-input:is(.dark *):where([data-state=active]),.tw\\:dark\\:data-active\\:border-input:is(.dark *):where([data-active]:not([data-active=false])){border-color:var(--input)}.tw\\:dark\\:data-active\\:bg-input\\/30:is(.dark *):where([data-state=active]),.tw\\:dark\\:data-active\\:bg-input\\/30:is(.dark *):where([data-active]:not([data-active=false])){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:data-active\\:bg-input\\/30:is(.dark *):where([data-state=active]),.tw\\:dark\\:data-active\\:bg-input\\/30:is(.dark *):where([data-active]:not([data-active=false])){background-color:color-mix(in oklab, var(--input) 30%, transparent)}}.tw\\:dark\\:data-active\\:text-foreground:is(.dark *):where([data-state=active]),.tw\\:dark\\:data-active\\:text-foreground:is(.dark *):where([data-active]:not([data-active=false])){color:var(--foreground)}.tw\\:dark\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:border-transparent:is(.dark *):is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:dark\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:border-transparent:is(.dark *):is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false])){border-color:#0000}.tw\\:dark\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:bg-transparent:is(.dark *):is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:dark\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:bg-transparent:is(.dark *):is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false])){background-color:#0000}.tw\\:data-horizontal\\:mx-px:where([data-orientation=horizontal]){margin-inline:1px}.tw\\:data-horizontal\\:h-1:where([data-orientation=horizontal]){height:calc(calc(var(--spacing)) * 1)}.tw\\:data-horizontal\\:h-full:where([data-orientation=horizontal]){height:100%}.tw\\:data-horizontal\\:h-px:where([data-orientation=horizontal]){height:1px}.tw\\:data-horizontal\\:w-auto:where([data-orientation=horizontal]){width:auto}.tw\\:data-horizontal\\:w-full:where([data-orientation=horizontal]){width:100%}.tw\\:data-horizontal\\:flex-col:where([data-orientation=horizontal]){flex-direction:column}.tw\\:data-vertical\\:my-px:where([data-orientation=vertical]){margin-block:1px}.tw\\:data-vertical\\:h-auto:where([data-orientation=vertical]){height:auto}.tw\\:data-vertical\\:h-full:where([data-orientation=vertical]){height:100%}.tw\\:data-vertical\\:min-h-40:where([data-orientation=vertical]){min-height:calc(calc(var(--spacing)) * 40)}.tw\\:data-vertical\\:w-1:where([data-orientation=vertical]){width:calc(calc(var(--spacing)) * 1)}.tw\\:data-vertical\\:w-auto:where([data-orientation=vertical]){width:auto}.tw\\:data-vertical\\:w-full:where([data-orientation=vertical]){width:100%}.tw\\:data-vertical\\:w-px:where([data-orientation=vertical]){width:1px}.tw\\:data-vertical\\:flex-col:where([data-orientation=vertical]){flex-direction:column}.tw\\:data-vertical\\:items-stretch:where([data-orientation=vertical]){align-items:stretch}.tw\\:data-vertical\\:self-stretch:where([data-orientation=vertical]){align-self:stretch}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:mt-0 [data-lexical-editor=true]>blockquote{margin-top:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:border-s-0 [data-lexical-editor=true]>blockquote{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:ps-0 [data-lexical-editor=true]>blockquote{padding-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:font-normal [data-lexical-editor=true]>blockquote{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:text-foreground [data-lexical-editor=true]>blockquote{color:var(--foreground)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:not-italic [data-lexical-editor=true]>blockquote{font-style:normal}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:mt-0 [data-lexical-editor=\\"true\\"]>blockquote{margin-top:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:border-s-0 [data-lexical-editor=\\"true\\"]>blockquote{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:ps-0 [data-lexical-editor=\\"true\\"]>blockquote{padding-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:font-normal [data-lexical-editor=\\"true\\"]>blockquote{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:text-foreground [data-lexical-editor=\\"true\\"]>blockquote{color:var(--foreground)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:not-italic [data-lexical-editor=\\"true\\"]>blockquote{font-style:normal}.tw\\:\\[\\&_a\\]\\:underline a{text-decoration-line:underline}.tw\\:\\[\\&_a\\]\\:underline-offset-3 a{text-underline-offset:3px}@media (hover:hover){.tw\\:\\[\\&_a\\]\\:hover\\:text-foreground a:hover{color:var(--foreground)}}.tw\\:\\[\\&_p\\]\\:my-0 p{margin-block:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_p\\:not\\(\\:last-child\\)\\]\\:mb-4 p:not(:last-child){margin-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&_s\\]\\:text-destructive s{color:var(--destructive)}.tw\\:\\[\\&_s\\]\\:line-through s{text-decoration-line:line-through}.tw\\:\\[\\&_svg\\]\\:pointer-events-none svg{pointer-events:none}.tw\\:\\[\\&_svg\\]\\:size-4 svg{width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&_svg\\]\\:shrink-0 svg{flex-shrink:0}.tw\\:\\[\\&_svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-3 svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:\\[\\&_svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-3\\.5 svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 3.5);height:calc(calc(var(--spacing)) * 3.5)}.tw\\:\\[\\&_svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-4 svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&_tr\\]\\:border-b tr{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}.tw\\:\\[\\&_tr\\:last-child\\]\\:border-0 tr:last-child{border-style:var(--tw-border-style);border-width:0}.tw\\:\\[\\&_u\\]\\:font-semibold u{--tw-font-weight:var(--tw-font-weight-semibold);font-weight:var(--tw-font-weight-semibold)}.tw\\:\\[\\&_u\\]\\:text-success-foreground u{color:var(--success-foreground)}.tw\\:\\[\\&_u\\]\\:no-underline u{text-decoration-line:none}.tw\\:\\[\\&\\:has\\(\\[role\\=checkbox\\]\\)\\]\\:pe-0:has([role=checkbox]){padding-inline-end:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\.border-b\\]\\:pb-2.border-b{padding-bottom:calc(calc(var(--spacing)) * 2)}.tw\\:\\[\\.border-b\\]\\:pb-4.border-b{padding-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[size\\=sm\\]\\/card\\:\\[\\.border-b\\]\\:pb-3:is(:where(.tw\\:group\\/card)[data-size=sm] *).border-b{padding-bottom:calc(calc(var(--spacing)) * 3)}.tw\\:\\[\\.border-t\\]\\:pt-2.border-t{padding-top:calc(calc(var(--spacing)) * 2)}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:px-2 *)[cmdk-group-heading]{padding-inline:calc(calc(var(--spacing)) * 2)}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:py-1\\.5 *)[cmdk-group-heading]{padding-block:calc(calc(var(--spacing)) * 1.5)}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:text-xs *)[cmdk-group-heading]{font-size:var(--tw-text-xs);line-height:var(--tw-leading,var(--tw-text-xs--line-height))}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:font-medium *)[cmdk-group-heading]{--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:text-muted-foreground *)[cmdk-group-heading]{color:var(--muted-foreground)}:is(.tw\\:\\*\\:\\[a\\]\\:underline>*):is(a){text-decoration-line:underline}:is(.tw\\:\\*\\:\\[a\\]\\:underline-offset-3>*):is(a){text-underline-offset:3px}@media (hover:hover){.tw\\:\\[a\\]\\:hover\\:bg-destructive\\/20:is(a):hover{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:\\[a\\]\\:hover\\:bg-destructive\\/20:is(a):hover{background-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:\\[a\\]\\:hover\\:bg-muted:is(a):hover{background-color:var(--muted)}.tw\\:\\[a\\]\\:hover\\:bg-primary\\/80:is(a):hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:\\[a\\]\\:hover\\:bg-primary\\/80:is(a):hover{background-color:color-mix(in oklab, var(--primary) 80%, transparent)}}.tw\\:\\[a\\]\\:hover\\:bg-secondary\\/80:is(a):hover{background-color:var(--secondary)}@supports (color:color-mix(in lab, red, red)){.tw\\:\\[a\\]\\:hover\\:bg-secondary\\/80:is(a):hover{background-color:color-mix(in oklab, var(--secondary) 80%, transparent)}}.tw\\:\\[a\\]\\:hover\\:text-muted-foreground:is(a):hover{color:var(--muted-foreground)}:is(.tw\\:\\*\\:\\[a\\]\\:hover\\:text-foreground>*):is(a):hover{color:var(--foreground)}}:is(.tw\\:\\*\\:\\[img\\]\\:row-span-2>*):is(img){grid-row:span 2/span 2}:is(.tw\\:\\*\\:\\[img\\]\\:translate-y-0\\.5>*):is(img){--tw-translate-y:calc(calc(var(--spacing)) * .5);translate:var(--tw-translate-x) var(--tw-translate-y)}:is(.tw\\:\\*\\:\\[img\\]\\:text-current>*):is(img){color:currentColor}:is(.tw\\:\\*\\:\\[img\\:first-child\\]\\:rounded-t-xl>*):is(img:first-child){border-top-left-radius:calc(var(--radius) * 1.4);border-top-right-radius:calc(var(--radius) * 1.4)}:is(.tw\\:\\*\\:\\[img\\:last-child\\]\\:rounded-b-xl>*):is(img:last-child){border-bottom-right-radius:calc(var(--radius) * 1.4);border-bottom-left-radius:calc(var(--radius) * 1.4)}:is(.tw\\:\\*\\:\\[img\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-4>*):is(img:not([class*=size-])){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}:is(.tw\\:\\*\\:\\[span\\]\\:last\\:flex>*):is(span):last-child{display:flex}:is(.tw\\:\\*\\:\\[span\\]\\:last\\:items-center>*):is(span):last-child{align-items:center}:is(.tw\\:\\*\\:\\[span\\]\\:last\\:gap-2>*):is(span):last-child{gap:calc(calc(var(--spacing)) * 2)}:is(.tw\\:\\*\\:\\[svg\\]\\:row-span-2>*):is(svg){grid-row:span 2/span 2}:is(.tw\\:\\*\\:\\[svg\\]\\:translate-y-0\\.5>*):is(svg){--tw-translate-y:calc(calc(var(--spacing)) * .5);translate:var(--tw-translate-x) var(--tw-translate-y)}:is(.tw\\:\\*\\:\\[svg\\]\\:text-current>*):is(svg){color:currentColor}:is(.tw\\:focus\\:\\*\\:\\[svg\\]\\:text-accent-foreground:focus>*):is(svg){color:var(--accent-foreground)}:is(.tw\\:data-\\[variant\\=destructive\\]\\:\\*\\:\\[svg\\]\\:text-destructive[data-variant=destructive]>*):is(svg){color:var(--destructive)}:is(.tw\\:data-\\[variant\\=destructive\\]\\:\\*\\:\\[svg\\]\\:text-destructive\\![data-variant=destructive]>*):is(svg){color:var(--destructive)!important}:is(.tw\\:data-selected\\:\\*\\:\\[svg\\]\\:text-foreground:where([data-selected=true])>*):is(svg){color:var(--foreground)}:is(.tw\\:\\*\\:\\[svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-4>*):is(svg:not([class*=size-])){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:rounded-s-none>:not(:first-child){border-start-start-radius:0;border-end-start-radius:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:rounded-t-none>:not(:first-child){border-top-left-radius:0;border-top-right-radius:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:border-s-0>:not(:first-child){border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:border-t-0>:not(:first-child){border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:last-child\\)\\]\\:rounded-e-none>:not(:last-child){border-start-end-radius:0;border-end-end-radius:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:last-child\\)\\]\\:rounded-b-none>:not(:last-child){border-bottom-right-radius:0;border-bottom-left-radius:0}.tw\\:has-\\[select\\[aria-hidden\\=true\\]\\:last-child\\]\\:\\[\\&\\>\\[data-slot\\=select-trigger\\]\\:last-of-type\\]\\:rounded-e-lg:has(:is(select[aria-hidden=true]:last-child))>[data-slot=select-trigger]:last-of-type{border-start-end-radius:var(--radius);border-end-end-radius:var(--radius)}.tw\\:\\[\\&\\>\\[data-slot\\=select-trigger\\]\\:not\\(\\[class\\*\\=w-\\]\\)\\]\\:w-fit>[data-slot=select-trigger]:not([class*=w-]){width:fit-content}.tw\\:\\[\\&\\>\\[data-slot\\]\\:not\\(\\:has\\(\\~\\[data-slot\\]\\)\\)\\]\\:rounded-e-lg\\!>[data-slot]:not(:has(~[data-slot])){border-start-end-radius:var(--radius)!important;border-end-end-radius:var(--radius)!important}.tw\\:\\[\\&\\>\\[data-slot\\]\\:not\\(\\:has\\(\\~\\[data-slot\\]\\)\\)\\]\\:rounded-b-lg\\!>[data-slot]:not(:has(~[data-slot])){border-bottom-right-radius:var(--radius)!important;border-bottom-left-radius:var(--radius)!important}.tw\\:\\[\\&\\>a\\]\\:underline>a{text-decoration-line:underline}.tw\\:\\[\\&\\>a\\]\\:underline-offset-4>a{text-underline-offset:4px}.tw\\:\\[\\&\\>a\\:hover\\]\\:text-primary>a:hover{color:var(--primary)}.tw\\:\\[\\&\\>blockquote\\]\\:my-0>blockquote{margin-block:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&\\>blockquote\\]\\:border-s-0>blockquote{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&\\>blockquote\\]\\:p-0>blockquote{padding:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&\\>blockquote\\]\\:ps-0>blockquote{padding-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&\\>blockquote\\]\\:font-normal>blockquote{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:\\[\\&\\>blockquote\\]\\:text-foreground>blockquote{color:var(--foreground)}.tw\\:\\[\\&\\>blockquote\\]\\:not-italic>blockquote{font-style:normal}.tw\\:\\[\\&\\>input\\]\\:flex-1>input{flex:1}.tw\\:has-\\[\\>\\[data-align\\=block-end\\]\\]\\:\\[\\&\\>input\\]\\:pt-3:has(>[data-align=block-end])>input{padding-top:calc(calc(var(--spacing)) * 3)}.tw\\:has-\\[\\>\\[data-align\\=block-start\\]\\]\\:\\[\\&\\>input\\]\\:pb-3:has(>[data-align=block-start])>input{padding-bottom:calc(calc(var(--spacing)) * 3)}.tw\\:has-\\[\\>\\[data-align\\=inline-end\\]\\]\\:\\[\\&\\>input\\]\\:pe-1\\.5:has(>[data-align=inline-end])>input{padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-\\[\\>\\[data-align\\=inline-start\\]\\]\\:\\[\\&\\>input\\]\\:ps-1\\.5:has(>[data-align=inline-start])>input{padding-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:\\[\\&\\>kbd\\]\\:rounded-\\[calc\\(var\\(--radius\\)-5px\\)\\]>kbd{border-radius:calc(var(--radius) - 5px)}.tw\\:\\[\\&\\>li\\]\\:mt-2>li{margin-top:calc(calc(var(--spacing)) * 2)}.tw\\:\\[\\&\\>span\\:last-child\\]\\:truncate>span:last-child{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.tw\\:\\[\\&\\>svg\\]\\:pointer-events-none>svg{pointer-events:none}.tw\\:\\[\\&\\>svg\\]\\:hidden>svg{display:none}.tw\\:\\[\\&\\>svg\\]\\:size-3\\!>svg{width:calc(calc(var(--spacing)) * 3)!important;height:calc(calc(var(--spacing)) * 3)!important}.tw\\:\\[\\&\\>svg\\]\\:size-3\\.5>svg{width:calc(calc(var(--spacing)) * 3.5);height:calc(calc(var(--spacing)) * 3.5)}.tw\\:\\[\\&\\>svg\\]\\:size-4>svg{width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&\\>svg\\]\\:shrink-0>svg{flex-shrink:0}.tw\\:\\[\\&\\>svg\\]\\:text-sidebar-accent-foreground>svg{color:var(--sidebar-accent-foreground)}.tw\\:group-has-data-\\[size\\=lg\\]\\/avatar-group\\:\\[\\&\\>svg\\]\\:size-5:is(:where(.tw\\:group\\/avatar-group):has([data-size=lg]) *)>svg{width:calc(calc(var(--spacing)) * 5);height:calc(calc(var(--spacing)) * 5)}.tw\\:group-has-data-\\[size\\=sm\\]\\/avatar-group\\:\\[\\&\\>svg\\]\\:size-3:is(:where(.tw\\:group\\/avatar-group):has([data-size=sm]) *)>svg{width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[size\\=default\\]\\/avatar\\:\\[\\&\\>svg\\]\\:size-2:is(:where(.tw\\:group\\/avatar)[data-size=default] *)>svg,.tw\\:group-data-\\[size\\=lg\\]\\/avatar\\:\\[\\&\\>svg\\]\\:size-2:is(:where(.tw\\:group\\/avatar)[data-size=lg] *)>svg{width:calc(calc(var(--spacing)) * 2);height:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[size\\=sm\\]\\/avatar\\:\\[\\&\\>svg\\]\\:hidden:is(:where(.tw\\:group\\/avatar)[data-size=sm] *)>svg,.tw\\:\\[\\&\\>svg\\:last-child\\]\\:hidden>svg:last-child{display:none}.tw\\:\\[\\&\\>svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-3\\.5>svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 3.5);height:calc(calc(var(--spacing)) * 3.5)}.tw\\:\\[\\&\\>svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-4>svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&\\>tr\\]\\:last\\:border-b-0>tr:last-child{border-bottom-style:var(--tw-border-style);border-bottom-width:0}.tw\\:\\[\\&\\[align\\=center\\]\\]\\:text-center[align=center]{text-align:center}.tw\\:\\[\\&\\[align\\=right\\]\\]\\:text-right[align=right]{text-align:right}.tw\\:\\[\\&\\[aria-orientation\\=horizontal\\]\\>div\\]\\:rotate-90[aria-orientation=horizontal]>div{rotate:90deg}[data-side=primary][data-collapsible=offcanvas] .tw\\:\\[\\[data-side\\=primary\\]\\[data-collapsible\\=offcanvas\\]_\\&\\]\\:-end-2{inset-inline-end:calc(calc(var(--spacing)) * -2)}[data-side=primary][data-state=collapsed] .tw\\:\\[\\[data-side\\=primary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-e-resize{cursor:e-resize}[data-side=primary][data-state=collapsed] .tw\\:rtl\\:\\[\\[data-side\\=primary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-w-resize:where(:dir(rtl),[dir=rtl],[dir=rtl] *){cursor:w-resize}[data-side=secondary][data-collapsible=offcanvas] .tw\\:\\[\\[data-side\\=secondary\\]\\[data-collapsible\\=offcanvas\\]_\\&\\]\\:-start-2{inset-inline-start:calc(calc(var(--spacing)) * -2)}[data-side=secondary][data-state=collapsed] .tw\\:\\[\\[data-side\\=secondary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-w-resize{cursor:w-resize}[data-side=secondary][data-state=collapsed] .tw\\:rtl\\:\\[\\[data-side\\=secondary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-e-resize:where(:dir(rtl),[dir=rtl],[dir=rtl] *){cursor:e-resize}}@property --tw-animation-delay{syntax:"*";inherits:false;initial-value:0s}@property --tw-animation-direction{syntax:"*";inherits:false;initial-value:normal}@property --tw-animation-duration{syntax:"*";inherits:false}@property --tw-animation-fill-mode{syntax:"*";inherits:false;initial-value:none}@property --tw-animation-iteration-count{syntax:"*";inherits:false;initial-value:1}@property --tw-enter-blur{syntax:"*";inherits:false;initial-value:0}@property --tw-enter-opacity{syntax:"*";inherits:false;initial-value:1}@property --tw-enter-rotate{syntax:"*";inherits:false;initial-value:0}@property --tw-enter-scale{syntax:"*";inherits:false;initial-value:1}@property --tw-enter-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-enter-translate-y{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-blur{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-opacity{syntax:"*";inherits:false;initial-value:1}@property --tw-exit-rotate{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-scale{syntax:"*";inherits:false;initial-value:1}@property --tw-exit-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-translate-y{syntax:"*";inherits:false;initial-value:0}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-cyrillic-ext-wght-normal.woff2)format("woff2-variations");unicode-range:U+460-52F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-cyrillic-wght-normal.woff2)format("woff2-variations");unicode-range:U+301,U+400-45F,U+490-491,U+4B0-4B1,U+2116}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-greek-wght-normal.woff2)format("woff2-variations");unicode-range:U+370-377,U+37A-37F,U+384-38A,U+38C,U+38E-3A1,U+3A3-3FF}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-vietnamese-wght-normal.woff2)format("woff2-variations");unicode-range:U+102-103,U+110-111,U+128-129,U+168-169,U+1A0-1A1,U+1AF-1B0,U+300-301,U+303-304,U+308-309,U+323,U+329,U+1EA0-1EF9,U+20AB}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-latin-ext-wght-normal.woff2)format("woff2-variations");unicode-range:U+100-2BA,U+2BD-2C5,U+2C7-2CC,U+2CE-2D7,U+2DD-2FF,U+304,U+308,U+329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-latin-wght-normal.woff2)format("woff2-variations");unicode-range:U+??,U+131,U+152-153,U+2BB-2BC,U+2C6,U+2DA,U+2DC,U+304,U+308,U+329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}.light,:root{--radius:.625rem;--spacing:.25rem;--background:oklch(100% 0 0);--foreground:oklch(13.71% .036 258.53);--card:oklch(100% 0 0);--card-foreground:oklch(13.71% .036 258.53);--popover:oklch(98.43% .0018 248.56);--popover-foreground:oklch(13.71% .036 258.53);--primary:oklch(20.79% .0399 265.73);--primary-foreground:oklch(98.38% .0036 248.23);--secondary:oklch(95.89% .011 248.06);--secondary-foreground:oklch(20.79% .0399 265.73);--muted:oklch(95.89% .011 248.06);--muted-foreground:oklch(55.47% .0408 257.45);--accent:oklch(95.89% .011 248.06);--accent-foreground:oklch(20.79% .0399 265.73);--destructive:oklch(63.69% .2077 25.32);--destructive-foreground:oklch(98.38% .0036 248.23);--success-foreground:oklch(62.7% .194 149.214);--diff-deleted:oklch(57.7% .245 27.325);--warning:oklch(84% .16 84);--warning-foreground:oklch(28% .07 46);--border:oklch(92.9% .0127 255.58);--input:oklch(92.9% .0127 255.58);--ring:oklch(13.71% .036 258.53);--chart-1:oklch(64.6% .222 41.116);--chart-2:oklch(60% .118 184.704);--chart-3:oklch(39.8% .07 227.392);--chart-4:oklch(82.8% .189 84.429);--chart-5:oklch(76.9% .188 70.08);--sidebar:oklch(98.43% .0018 248.56);--sidebar-foreground:oklch(13.71% .036 258.53);--sidebar-primary:oklch(20.79% .0399 265.73);--sidebar-primary-foreground:oklch(98.38% .0036 248.23);--sidebar-accent:oklch(95.89% .011 248.06);--sidebar-accent-foreground:oklch(20.79% .0399 265.73);--sidebar-border:oklch(92.9% .0127 255.58);--sidebar-ring:oklch(13.71% .036 258.53)}.dark{--background:oklch(13.71% .036 258.53);--foreground:oklch(98.38% .0036 248.23);--card:oklch(13.71% .036 258.53);--card-foreground:oklch(98.38% .0036 248.23);--popover:oklch(13.71% .036 258.53);--popover-foreground:oklch(98.38% .0036 248.23);--primary:oklch(98.38% .0036 248.23);--primary-foreground:oklch(20.79% .0399 265.73);--secondary:oklch(28% .037 259.98);--secondary-foreground:oklch(98.38% .0036 248.23);--muted:oklch(28% .037 259.98);--muted-foreground:oklch(71.07% .0351 256.8);--accent:oklch(28% .037 259.98);--accent-foreground:oklch(98.38% .0036 248.23);--destructive:oklch(39.6% .1331 25.71);--destructive-foreground:oklch(98.38% .0036 248.23);--success-foreground:oklch(79.2% .209 151.711);--diff-deleted:oklch(70.4% .191 22.216);--warning:oklch(41% .11 46);--warning-foreground:oklch(99% .02 95);--border:oklch(44.54% .0374 257.3);--input:oklch(44.54% .0374 257.3);--ring:oklch(86.88% .0199 252.89);--chart-1:oklch(48.8% .243 264.376);--chart-2:oklch(69.6% .17 162.48);--chart-3:oklch(76.9% .188 70.08);--chart-4:oklch(62.7% .265 303.9);--chart-5:oklch(64.5% .246 16.439);--sidebar:oklch(13.71% .036 258.53);--sidebar-foreground:oklch(71.07% .0351 256.8);--sidebar-primary:oklch(98.38% .0036 248.23);--sidebar-primary-foreground:oklch(20.79% .0399 265.73);--sidebar-accent:oklch(28% .037 259.98);--sidebar-accent-foreground:oklch(71.07% .0351 256.8);--sidebar-border:oklch(28% .037 259.98);--sidebar-ring:oklch(86.88% .0199 252.89)}.paratext-light{--background:oklch(100% 0 0);--foreground:oklch(15.3% .006 107.1);--card:oklch(100% 0 0);--card-foreground:oklch(15.3% .006 107.1);--popover:oklch(100% 0 0);--popover-foreground:oklch(15.3% .006 107.1);--primary:oklch(55.5% .163 48.998);--primary-foreground:oklch(98.7% .022 95.277);--secondary:oklch(96.7% .001 286.375);--secondary-foreground:oklch(21% .006 285.885);--muted:oklch(96.6% .005 106.5);--muted-foreground:oklch(58% .031 107.3);--accent:oklch(96.6% .005 106.5);--accent-foreground:oklch(22.8% .013 107.4);--destructive:oklch(57.7% .245 27.325);--destructive-foreground:oklch(98.38% .0036 248.23);--success-foreground:oklch(62.7% .194 149.214);--diff-deleted:oklch(57.7% .245 27.325);--warning:oklch(84% .16 84);--warning-foreground:oklch(28% .07 46);--border:oklch(93% .007 106.5);--input:oklch(93% .007 106.5);--ring:oklch(73.7% .021 106.9);--chart-1:oklch(88% .011 106.6);--chart-2:oklch(58% .031 107.3);--chart-3:oklch(46.6% .025 107.3);--chart-4:oklch(39.4% .023 107.4);--chart-5:oklch(28.6% .016 107.4);--sidebar:oklch(98.8% .003 106.5);--sidebar-foreground:oklch(15.3% .006 107.1);--sidebar-primary:oklch(66.6% .179 58.318);--sidebar-primary-foreground:oklch(98.7% .022 95.277);--sidebar-accent:oklch(96.6% .005 106.5);--sidebar-accent-foreground:oklch(22.8% .013 107.4);--sidebar-border:oklch(93% .007 106.5);--sidebar-ring:oklch(73.7% .021 106.9)}.paratext-dark{--background:oklch(15.3% .006 107.1);--foreground:oklch(98.8% .003 106.5);--card:oklch(22.8% .013 107.4);--card-foreground:oklch(98.8% .003 106.5);--popover:oklch(22.8% .013 107.4);--popover-foreground:oklch(98.8% .003 106.5);--primary:oklch(47.3% .137 46.201);--primary-foreground:oklch(98.7% .022 95.277);--secondary:oklch(27.4% .006 286.033);--secondary-foreground:oklch(98.5% 0 0);--muted:oklch(28.6% .016 107.4);--muted-foreground:oklch(73.7% .021 106.9);--accent:oklch(28.6% .016 107.4);--accent-foreground:oklch(98.8% .003 106.5);--destructive:oklch(70.4% .191 22.216);--destructive-foreground:oklch(98.38% .0036 248.23);--success-foreground:oklch(79.2% .209 151.711);--diff-deleted:oklch(70.4% .191 22.216);--warning:oklch(41% .11 46);--warning-foreground:oklch(99% .02 95);--border:oklch(100% 0 0/.1);--input:oklch(100% 0 0/.15);--ring:oklch(58% .031 107.3);--chart-1:oklch(88% .011 106.6);--chart-2:oklch(58% .031 107.3);--chart-3:oklch(46.6% .025 107.3);--chart-4:oklch(39.4% .023 107.4);--chart-5:oklch(28.6% .016 107.4);--sidebar:oklch(22.8% .013 107.4);--sidebar-foreground:oklch(98.8% .003 106.5);--sidebar-primary:oklch(76.9% .188 70.08);--sidebar-primary-foreground:oklch(27.9% .077 45.635);--sidebar-accent:oklch(28.6% .016 107.4);--sidebar-accent-foreground:oklch(98.8% .003 106.5);--sidebar-border:oklch(100% 0 0/.1);--sidebar-ring:oklch(58% .031 107.3)}@property --tw-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-y{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-z{syntax:"*";inherits:false;initial-value:0}@property --tw-rotate-x{syntax:"*";inherits:false}@property --tw-rotate-y{syntax:"*";inherits:false}@property --tw-rotate-z{syntax:"*";inherits:false}@property --tw-skew-x{syntax:"*";inherits:false}@property --tw-skew-y{syntax:"*";inherits:false}@property --tw-space-y-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-space-x-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-divide-x-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-border-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-divide-y-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-leading{syntax:"*";inherits:false}@property --tw-font-weight{syntax:"*";inherits:false}@property --tw-tracking{syntax:"*";inherits:false}@property --tw-ordinal{syntax:"*";inherits:false}@property --tw-slashed-zero{syntax:"*";inherits:false}@property --tw-numeric-figure{syntax:"*";inherits:false}@property --tw-numeric-spacing{syntax:"*";inherits:false}@property --tw-numeric-fraction{syntax:"*";inherits:false}@property --tw-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-shadow-color{syntax:"*";inherits:false}@property --tw-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-inset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-shadow-color{syntax:"*";inherits:false}@property --tw-inset-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-ring-color{syntax:"*";inherits:false}@property --tw-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-ring-color{syntax:"*";inherits:false}@property --tw-inset-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-ring-inset{syntax:"*";inherits:false}@property --tw-ring-offset-width{syntax:"<length>";inherits:false;initial-value:0}@property --tw-ring-offset-color{syntax:"*";inherits:false;initial-value:#fff}@property --tw-ring-offset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-blur{syntax:"*";inherits:false}@property --tw-brightness{syntax:"*";inherits:false}@property --tw-contrast{syntax:"*";inherits:false}@property --tw-grayscale{syntax:"*";inherits:false}@property --tw-hue-rotate{syntax:"*";inherits:false}@property --tw-invert{syntax:"*";inherits:false}@property --tw-opacity{syntax:"*";inherits:false}@property --tw-saturate{syntax:"*";inherits:false}@property --tw-sepia{syntax:"*";inherits:false}@property --tw-drop-shadow{syntax:"*";inherits:false}@property --tw-drop-shadow-color{syntax:"*";inherits:false}@property --tw-drop-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-drop-shadow-size{syntax:"*";inherits:false}@property --tw-duration{syntax:"*";inherits:false}@property --tw-ease{syntax:"*";inherits:false}@property --tw-content{syntax:"*";inherits:false;initial-value:""}@property --tw-backdrop-blur{syntax:"*";inherits:false}@property --tw-backdrop-brightness{syntax:"*";inherits:false}@property --tw-backdrop-contrast{syntax:"*";inherits:false}@property --tw-backdrop-grayscale{syntax:"*";inherits:false}@property --tw-backdrop-hue-rotate{syntax:"*";inherits:false}@property --tw-backdrop-invert{syntax:"*";inherits:false}@property --tw-backdrop-opacity{syntax:"*";inherits:false}@property --tw-backdrop-saturate{syntax:"*";inherits:false}@property --tw-backdrop-sepia{syntax:"*";inherits:false}@property --tw-outline-style{syntax:"*";inherits:false;initial-value:solid}@keyframes spin{to{transform:rotate(360deg)}}@keyframes pulse{50%{opacity:.5}}@keyframes enter{0%{opacity:var(--tw-enter-opacity,1);transform:translate3d(var(--tw-enter-translate-x,0),var(--tw-enter-translate-y,0),0)scale3d(var(--tw-enter-scale,1),var(--tw-enter-scale,1),var(--tw-enter-scale,1))rotate(var(--tw-enter-rotate,0));filter:blur(var(--tw-enter-blur,0))}}@keyframes exit{to{opacity:var(--tw-exit-opacity,1);transform:translate3d(var(--tw-exit-translate-x,0),var(--tw-exit-translate-y,0),0)scale3d(var(--tw-exit-scale,1),var(--tw-exit-scale,1),var(--tw-exit-scale,1))rotate(var(--tw-exit-rotate,0));filter:blur(var(--tw-exit-blur,0))}}
`, "after-all");
export {
  df as Alert,
  wf as AlertDescription,
  uf as AlertTitle,
  Uw as Avatar,
  Kw as AvatarFallback,
  bh as AvatarImage,
  sh as BOOK_CHAPTER_CONTROL_STRING_KEYS,
  ch as BOOK_SELECTOR_STRING_KEYS,
  Lr as Badge,
  Wa as BookChapterControl,
  ko as BookSelectionMode,
  lh as BookSelector,
  Z as Button,
  Ra as ButtonGroup,
  Do as ButtonGroupSeparator,
  pf as ButtonGroupText,
  ns as CANCEL_ACCEPT_BUTTONS_STRING_KEYS,
  uh as COMMENT_EDITOR_STRING_KEYS,
  Bw as COMMENT_LIST_ELEMENT_ID,
  ph as COMMENT_LIST_STRING_KEYS,
  dh as CONFLICT_NOTE_STRING_KEYS,
  is as CancelAcceptButtons,
  jw as Card,
  Fw as CardContent,
  mh as CardDescription,
  vh as CardFooter,
  gh as CardHeader,
  fh as CardTitle,
  Cd as ChapterRangeSelector,
  us as Checkbox,
  fg as CheckboxGroup,
  Ep as Checklist,
  Dn as ComboBox,
  ar as Command,
  Da as CommandEmpty,
  He as CommandGroup,
  Sa as CommandInput,
  Ye as CommandItem,
  or as CommandList,
  wh as CommentEditor,
  xh as CommentList,
  Gw as ConflictNoteCard,
  yg as ContextMenu,
  Mg as ContextMenuCheckboxItem,
  Tg as ContextMenuContent,
  _g as ContextMenuGroup,
  Sg as ContextMenuItem,
  Ig as ContextMenuLabel,
  Ng as ContextMenuPortal,
  Eg as ContextMenuRadioGroup,
  Og as ContextMenuRadioItem,
  zg as ContextMenuSeparator,
  Pg as ContextMenuShortcut,
  Cg as ContextMenuSub,
  Dg as ContextMenuSubContent,
  Rg as ContextMenuSubTrigger,
  kg as ContextMenuTrigger,
  ou as DataTable,
  mg as DestructiveKeyConfirmation,
  io as Dialog,
  hf as DialogClose,
  so as DialogContent,
  gf as DialogDescription,
  wn as DialogFooter,
  co as DialogHeader,
  ff as DialogOverlay,
  mf as DialogPortal,
  lo as DialogTitle,
  vf as DialogTrigger,
  rp as DisabledActionTooltip,
  ep as DisabledTooltipWrapper,
  Ag as Drawer,
  Vg as DrawerClose,
  Lg as DrawerContent,
  Ug as DrawerDescription,
  jg as DrawerFooter,
  Bg as DrawerHeader,
  Rp as DrawerOverlay,
  Sp as DrawerPortal,
  Fg as DrawerTitle,
  $g as DrawerTrigger,
  ze as DropdownMenu,
  Ke as DropdownMenuCheckboxItem,
  Pe as DropdownMenuContent,
  ri as DropdownMenuGroup,
  je as DropdownMenuItem,
  su as DropdownMenuItemType,
  _r as DropdownMenuLabel,
  Us as DropdownMenuPortal,
  Ds as DropdownMenuRadioGroup,
  Ms as DropdownMenuRadioItem,
  Qe as DropdownMenuSeparator,
  bf as DropdownMenuShortcut,
  js as DropdownMenuSub,
  Ks as DropdownMenuSubContent,
  Fs as DropdownMenuSubTrigger,
  _e as DropdownMenuTrigger,
  nu as ERROR_DUMP_STRING_KEYS,
  Nh as ERROR_POPOVER_STRING_KEYS,
  wu as EditorKeyboardShortcuts,
  xf as Empty,
  yf as EmptyContent,
  kf as EmptyDescription,
  _f as EmptyHeader,
  Nf as EmptyMedia,
  Cf as EmptyState,
  Ef as EmptyTitle,
  iu as ErrorDump,
  Ch as ErrorPopover,
  Mh as FOOTNOTE_EDITOR_STRING_KEYS,
  Rh as Filter,
  Eh as FilterDropdown,
  Sh as Footer,
  Dh as FootnoteEditor,
  Su as FootnoteItem,
  Oh as FootnoteList,
  hg as INTERFACE_LANGUAGE_PICKER_STRING_KEYS,
  Lh as INVENTORY_STRING_KEYS,
  Ma as Input,
  gg as InterfaceLanguagePicker,
  Bh as Inventory,
  wo as Kbd,
  Tf as KbdGroup,
  Ot as Label,
  mu as MARKER_MENU_STRING_KEYS,
  _h as MarkdownRenderer,
  xu as MarkerMenu,
  Th as MoreInfo,
  Os as MultiSelectComboBox,
  dg as NavigationContentSearch,
  er as Popover,
  $s as PopoverAnchor,
  rr as PopoverContent,
  Sf as PopoverDescription,
  Rf as PopoverHeader,
  Ka as PopoverPortalContainerProvider,
  Df as PopoverTitle,
  Nr as PopoverTrigger,
  Kg as Progress,
  Mo as RadioGroup,
  fa as RadioGroupItem,
  pd as RecentSearches,
  Mf as ResizableHandle,
  Of as ResizablePanel,
  If as ResizablePanelGroup,
  vg as ResultsCard,
  zf as RetryableErrorView,
  rg as SCOPE_SELECTOR_STRING_KEYS,
  np as SELECT_BOOKS_STRING_KEYS,
  $r as SHRINK_STEP,
  ag as ScopeSelector,
  eg as ScriptureResultsViewer,
  og as ScrollGroupSelector,
  ni as SearchBar,
  br as Select,
  op as SelectBooks,
  tp as SelectBooksPicker,
  kr as SelectContent,
  tu as SelectGroup,
  fe as SelectItem,
  yh as SelectLabel,
  ru as SelectScrollDownButton,
  eu as SelectScrollUpButton,
  kh as SelectSeparator,
  yr as SelectTrigger,
  xr as SelectValue,
  Br as Separator,
  ng as SettingsList,
  sg as SettingsListHeader,
  ig as SettingsListItem,
  qu as SettingsSidebar,
  tg as SettingsSidebarContentSearch,
  za as ShrinkStepContext,
  nf as ShrinkStepOverride,
  Ai as ShrinkStepOverrideContext,
  Lu as Sidebar,
  ju as SidebarContent,
  Hh as SidebarFooter,
  Yn as SidebarGroup,
  Gh as SidebarGroupAction,
  Xn as SidebarGroupContent,
  Wn as SidebarGroupLabel,
  Kh as SidebarHeader,
  Uh as SidebarInput,
  Bu as SidebarInset,
  Fu as SidebarMenu,
  Yh as SidebarMenuAction,
  Wh as SidebarMenuBadge,
  Hu as SidebarMenuButton,
  Uu as SidebarMenuItem,
  Xh as SidebarMenuSkeleton,
  Jh as SidebarMenuSub,
  Qh as SidebarMenuSubButton,
  Zh as SidebarMenuSubItem,
  Vu as SidebarProvider,
  Fh as SidebarRail,
  qh as SidebarSeparator,
  jh as SidebarTrigger,
  gr as Skeleton,
  qg as Slider,
  Hg as Sonner,
  Pf as Spinner,
  Gg as Switch,
  sf as TOOLTIP_DELAY_MS,
  So as TabDropdownMenu,
  lg as TabFloatingMenu,
  cg as TabToolbar,
  Io as Table,
  Po as TableBody,
  Af as TableCaption,
  fr as TableCell,
  $f as TableFooter,
  ma as TableHead,
  zo as TableHeader,
  Fe as TableRow,
  Yg as Tabs,
  Jg as TabsContent,
  Wg as TabsList,
  Xg as TabsTrigger,
  bg as TextField,
  nh as Textarea,
  ei as ToggleGroup,
  ia as ToggleGroupItem,
  ug as Toolbar,
  ld as ToolbarCompoundLabel,
  Et as Tooltip,
  St as TooltipContent,
  It as TooltipProvider,
  Tt as TooltipTrigger,
  lu as UNDO_REDO_BUTTONS_STRING_KEYS,
  pg as UiLanguageSelector,
  du as UndoRedoButtons,
  bs as VerticalTabs,
  ys as VerticalTabsContent,
  xs as VerticalTabsList,
  dp as VerticalTabsTrigger,
  xg as WizardStepper,
  Ae as Z_INDEX_ABOVE_DOCK,
  ai as Z_INDEX_ABOVE_POPOVER,
  Vf as Z_INDEX_CONNECTION_LOST,
  Lf as Z_INDEX_FIRST_RUN,
  Bf as Z_INDEX_MODAL,
  jf as Z_INDEX_MODAL_BACKDROP,
  Ff as Z_INDEX_ONBOARDING_TOUR,
  Uf as Z_INDEX_OVERLAY,
  Kf as badgeVariants,
  Hf as buttonGroupVariants,
  qf as buttonVariants,
  x as cn,
  Vh as getBookIdFromUSFM,
  hh as getCommentThreadElementId,
  Aa as getInventoryHeader,
  Ah as getLinesFromUSFM,
  $h as getNumberFromUSFM,
  Iu as getStatusForItem,
  wg as getToolbarOSReservedSpaceClassName,
  zh as inventoryCountColumn,
  Ih as inventoryItemColumn,
  Ph as inventoryStatusColumn,
  Oo as isMacOs,
  Gf as isWindows,
  ku as markerMenuItemToPaletteItem,
  zp as pickTabIconUrl,
  Wf as sonner,
  Zg as useEvent,
  Qg as useEventAsync,
  rf as useExtraValidMarkers,
  Rs as useListbox,
  Op as usePromise,
  ih as useRecentSearches,
  tf as useRetryablePromise,
  af as useRunWhenVisible,
  ms as useShrinkStep,
  $i as useShrinkStepOverride,
  sd as useShrinkStepValue,
  $a as useSidebar,
  ef as useStylesheet,
  of as useTabIconSelection,
  ln as useTruncationTooltip,
  Ip as useViewVisibility
};
//# sourceMappingURL=index.js.map
